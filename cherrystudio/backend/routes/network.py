"""
网络代理路由

提供 HTTP 代理能力，解决 file:// 协议下的 CORS 限制。
支持：
  - 同步 GET/POST 请求转发
  - SSE 流式请求（异步队列 + 轮询模型）
  - 代理设置
"""

import fnmatch
import gzip
import json
import os
import queue
import threading
import re
import html as _html
import urllib.parse
import urllib.request
import urllib.error
import ssl
from typing import Any, Dict

from ..server import route
from ...utils.logger import network_logger

_log = network_logger

# 全局忽略 SSL 证书验证（解决企业内网/代理自签证书问题）
_ssl_context = ssl._create_unverified_context()

def _patch_gemini3_tool_history(url: str, body_bytes: bytes) -> bytes:
    """
    Gemini 3 多轮 function calling 要求 assistant 消息中的 tool_calls 携带
    thought_signature 字段。通过 OpenAI 兼容代理网关（如 Higress）时该字段
    在格式转换中丢失，导致 400 错误。

    解决方案：将历史 tool_call + tool 消息对转为纯文本 assistant 消息，
    彻底绕过 thought_signature 要求。模型仍可在当前轮次发起新的 tool call。
    """
    if not body_bytes:
        return body_bytes
    if b"/chat/completions" not in url.encode("utf-8", errors="ignore"):
        return body_bytes
    try:
        body = json.loads(body_bytes)
    except (json.JSONDecodeError, TypeError, ValueError):
        return body_bytes

    model = str(body.get("model", "")).lower()
    if "gemini-3" not in model and "gemini3" not in model:
        return body_bytes

    messages = body.get("messages")
    if not isinstance(messages, list):
        return body_bytes

    has_tool_calls = any(
        isinstance(m, dict) and m.get("role") == "assistant" and m.get("tool_calls")
        for m in messages
    )
    if not has_tool_calls:
        return body_bytes

    # 收集 tool_call_id → tool response content 的映射
    tool_results = {}
    for msg in messages:
        if isinstance(msg, dict) and msg.get("role") == "tool":
            tid = msg.get("tool_call_id", "")
            if tid:
                tool_results[tid] = msg.get("content", "")

    new_messages = []
    for msg in messages:
        if not isinstance(msg, dict):
            new_messages.append(msg)
            continue

        role = msg.get("role")

        if role == "assistant" and msg.get("tool_calls"):
            tool_calls = msg["tool_calls"]
            text_content = msg.get("content") or ""

            call_descriptions = []
            for tc in tool_calls:
                fn = tc.get("function", {}) if isinstance(tc, dict) else {}
                name = fn.get("name", "unknown")
                args = fn.get("arguments", "")
                tc_id = tc.get("id", "") if isinstance(tc, dict) else ""
                call_descriptions.append(
                    f"[Called function `{name}` with arguments: {args}]"
                )
                result = tool_results.get(tc_id, "")
                if result:
                    call_descriptions.append(
                        f"[Function `{name}` returned: {result}]"
                    )

            combined = text_content
            if call_descriptions:
                if combined:
                    combined += "\n\n"
                combined += "\n".join(call_descriptions)

            new_messages.append({
                "role": "assistant",
                "content": combined,
            })

        elif role == "tool":
            # tool 消息已合并到上面的 assistant 消息中，跳过
            continue

        else:
            new_messages.append(msg)

    body["messages"] = new_messages
    return json.dumps(body, ensure_ascii=False).encode("utf-8")


def _patch_gpt_image_request(url: str, body_bytes: bytes) -> bytes:
    """Normalize OpenAI gpt-image request bodies before they hit upstream gateways."""
    if not body_bytes:
        return body_bytes

    lower_url = url.lower()
    if "/images/generations" not in lower_url and "/images/edits" not in lower_url:
        return body_bytes

    try:
        body = json.loads(body_bytes)
    except (json.JSONDecodeError, TypeError, ValueError):
        return body_bytes

    if not isinstance(body, dict):
        return body_bytes

    model = str(body.get("model", "")).lower().split("/")[-1]
    if not model.startswith("gpt-image"):
        return body_bytes

    changed = False

    # gpt-image models return b64_json by default and reject response_format.
    if "response_format" in body:
        body.pop("response_format", None)
        changed = True

    if model.startswith("gpt-image-2"):
        # gpt-image-2 currently accepts a single output per request through OpenAI-compatible
        # gateways; sending n > 1 commonly causes an opaque 400 response.
        n = body.get("n")
        if n is not None and n != 1:
            body.pop("n", None)
            changed = True

        if body.get("background") == "transparent":
            body.pop("background", None)
            changed = True

        if "input_fidelity" in body:
            body.pop("input_fidelity", None)
            changed = True

    if changed:
        _log(f"[network/fetch] normalized gpt-image request body for model={body.get('model')}")
        return json.dumps(body, ensure_ascii=False).encode("utf-8")

    return body_bytes


def _sanitize_url(url: str) -> str:
    """
    对 URL 中的非 ASCII 字符做 percent-encoding，
    防止 urllib 抛出 'ascii' codec 错误。
    如果 URL 明显不合法（如包含中文标点），直接返回空字符串。
    """
    try:
        url.encode("ascii")
        return url
    except UnicodeEncodeError:
        pass
    try:
        parsed = urllib.parse.urlsplit(url)
        if not parsed.scheme or not parsed.netloc:
            return ""
        encoded = urllib.parse.urlunsplit((
            parsed.scheme,
            parsed.netloc.encode("idna").decode("ascii"),
            urllib.parse.quote(parsed.path, safe="/:@!$&'()*+,;=-.~"),
            urllib.parse.quote(parsed.query, safe="/:@!$&'()*+,;=-._~?="),
            urllib.parse.quote(parsed.fragment, safe=""),
        ))
        return encoded
    except Exception:
        return ""


# ─── 流式请求缓冲区（全局，由 fetchProxy + streamRead 共享）─────────────────
_stream_buffers: Dict[str, queue.Queue] = {}
_stream_locks: Dict[str, threading.Lock] = {}
_stream_lock_global = threading.Lock()


def _get_or_create_stream(request_id: str) -> queue.Queue:
    with _stream_lock_global:
        if request_id not in _stream_buffers:
            _stream_buffers[request_id] = queue.Queue()
            _stream_locks[request_id] = threading.Lock()
        return _stream_buffers[request_id]


def _cleanup_stream(request_id: str):
    with _stream_lock_global:
        _stream_buffers.pop(request_id, None)
        _stream_locks.pop(request_id, None)


# ─── 代理设置（由 Qt 层通过 /api/v1/network/set-proxy 写入）────────────────────
_proxy_settings: Dict[str, str] = {
    "proxyUrl": "",
    "bypassRules": "",
}
_proxy_managed = False


def _init_proxy_from_config():
    """从 centralized-config.json 读取代理配置作为默认值，
    确保桌面端（无 Qt API 推送代理配置）也能正确 bypass 内网地址。"""
    global _proxy_managed
    try:
        from ...core.secure_config import get_secure_proxy, is_hardcoded_proxy_enabled

        if is_hardcoded_proxy_enabled():
            secure_proxy = get_secure_proxy()
            if secure_proxy.get("proxyUrl"):
                _proxy_settings["proxyUrl"] = secure_proxy["proxyUrl"]
                _proxy_settings["bypassRules"] = secure_proxy.get("bypassRules", "")
                _proxy_managed = True
                return
    except Exception:
        pass

    try:
        cfg_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
            "resources", "centralized-config.json"
        )
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        proxy_cfg = cfg.get("proxy", {})
        if proxy_cfg.get("bypassRules") and not _proxy_settings["bypassRules"]:
            _proxy_settings["bypassRules"] = proxy_cfg["bypassRules"]
        if proxy_cfg.get("proxyUrl") and not _proxy_settings["proxyUrl"]:
            _proxy_settings["proxyUrl"] = proxy_cfg["proxyUrl"]
    except Exception:
        pass


_init_proxy_from_config()


def _should_bypass_proxy(url: str) -> bool:
    bypass = _proxy_settings.get("bypassRules", "")
    if not bypass:
        return False
    rules = [r.strip() for r in bypass.replace(",", ";").split(";") if r.strip()]
    try:
        host = url.split("//")[-1].split("/")[0].split(":")[0].lower()
    except Exception:
        host = ""
    for rule in rules:
        if not rule:
            continue
        if rule == "<local>":
            if host in ("localhost", "127.0.0.1", "::1") or host.startswith("127."):
                return True
        elif "*" in rule:
            # 通配符匹配：支持 *.ccc.net（子域名）和 192.168.*.* （IP 段）
            if rule.startswith("*."):
                # *.ccc.net → 匹配 sub.ccc.net 和 ccc.net 本身
                domain = rule[2:].lower()
                if host == domain or host.endswith("." + domain):
                    return True
            else:
                # 通用 fnmatch 风格（192.168.*.* 等）
                if fnmatch.fnmatch(host, rule.lower()):
                    return True
        else:
            # 精确主机名匹配，或字符串包含匹配（兼容旧行为）
            if rule.lower() == host or rule in url:
                return True
    return False


def _build_opener(bypass: bool):
    handlers = [urllib.request.HTTPSHandler(context=_ssl_context)]
    
    if bypass:
        handlers.append(urllib.request.ProxyHandler({}))
    else:
        proxy_url = _proxy_settings.get("proxyUrl", "")
        if proxy_url:
            proxies = {"http": proxy_url, "https": proxy_url}
            handlers.append(urllib.request.ProxyHandler(proxies))
            
    return urllib.request.build_opener(*handlers)


# ─── 响应头清理辅助 ─────────────────────────────────────────────────────────────

# 这些头部在代理层已处理（解压/组装），传给前端会引起二次处理错误
_STRIP_RESP_HEADERS = {
    "transfer-encoding", "content-encoding", "content-length",
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "upgrade",
}


def _clean_resp_headers(headers: dict) -> dict:
    """过滤掉会干扰浏览器 Response 解析的代理头部，并统一为 Title-Case 键名。"""
    result = {}
    for k, v in headers.items():
        if k.lower() not in _STRIP_RESP_HEADERS:
            # 统一为 Title-Case，让前端 headers.get('Content-Type') 可靠工作
            result[k.title()] = v
    return result


def _detect_charset(headers: dict) -> str:
    """从 Content-Type 头解析字符集，如 'text/html; charset=gb2312' → 'gb2312'"""
    ct = headers.get("Content-Type") or headers.get("content-type") or ""
    for part in ct.split(";"):
        part = part.strip()
        if part.lower().startswith("charset="):
            return part[8:].strip().strip('"')
    return ""


def _process_response(resp) -> dict:
    """将 urllib HTTP 响应对象转换为标准结果字典（解压 + 解码 + 清理头部）。"""
    status = resp.getcode()
    raw_headers = dict(resp.headers)
    raw = resp.read()

    ce = raw_headers.get("Content-Encoding", "") or raw_headers.get("content-encoding", "")
    if "gzip" in ce.lower():
        try:
            raw = gzip.decompress(raw)
        except Exception:
            pass

    charset = _detect_charset(raw_headers) or "utf-8"
    try:
        body = raw.decode(charset, errors="replace")
    except (LookupError, Exception):
        body = raw.decode("utf-8", errors="replace")

    return {
        "status": status,
        "statusText": "OK",
        "headers": _clean_resp_headers(raw_headers),
        "body": body,
    }


def _http_error_dict(e: urllib.error.HTTPError) -> dict:
    """将 HTTPError 转换为标准结果字典。"""
    err_body = e.read().decode("utf-8", errors="replace")
    return {
        "status": e.code,
        "statusText": str(e.reason),
        "headers": _clean_resp_headers(dict(e.headers)) if e.headers else {},
        "body": err_body,
        "error": f"HTTP {e.code}",
    }


# ─── 图片代理（下载外部图片 → base64，供前端无外网环境使用）──────────────────

import hashlib
import base64 as _b64

_IMAGE_CACHE_MAX_AGE = 7 * 24 * 3600  # 7 days


def _image_cache_dir() -> str:
    from ...core.paths import get_app_data_dir
    d = os.path.join(get_app_data_dir(), "image-cache")
    os.makedirs(d, exist_ok=True)
    return d


def _image_cache_path(url: str) -> str:
    url_hash = hashlib.sha256(url.encode("utf-8")).hexdigest()[:32]
    return os.path.join(_image_cache_dir(), url_hash)


def _read_image_cache(url: str):
    """Read cached image. Returns (data_bytes, mime) or (None, None)."""
    import time
    cache_file = _image_cache_path(url)
    meta_file = cache_file + ".meta"
    if not os.path.exists(cache_file) or not os.path.exists(meta_file):
        return None, None
    try:
        age = time.time() - os.path.getmtime(cache_file)
        if age > _IMAGE_CACHE_MAX_AGE:
            os.remove(cache_file)
            os.remove(meta_file)
            return None, None
        with open(meta_file, "r", encoding="utf-8") as f:
            meta = json.load(f)
        with open(cache_file, "rb") as f:
            data = f.read()
        return data, meta.get("mime", "image/png")
    except Exception:
        return None, None


def _write_image_cache(url: str, data: bytes, mime: str):
    try:
        cache_file = _image_cache_path(url)
        meta_file = cache_file + ".meta"
        with open(cache_file, "wb") as f:
            f.write(data)
        with open(meta_file, "w", encoding="utf-8") as f:
            json.dump({"url": url, "mime": mime}, f)
    except Exception:
        pass


def _strip_html_tags(text: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", text, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = _html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def _normalize_search_url(provider: str, url: str, language: str = "") -> str:
    """Normalize search URL. For Google: add hl/gl/gbv params. For Bing: add setlang."""
    try:
        parsed = urllib.parse.urlsplit(url)
        query = urllib.parse.parse_qs(parsed.query, keep_blank_values=True)

        # Clean up query text: strip residual lang:xx and leading/trailing spaces
        q = query.get("q", [""])[0]
        q = re.sub(r'\s+lang:\w+', '', q).strip()
        query["q"] = [q]

        lang = language or ""

        if provider == "local-google":
            if lang:
                query["hl"] = [lang]
                query["gl"] = [lang]
            query["nfpr"] = ["1"]
            query["num"] = [query.get("num", ["10"])[0] or "10"]
            # gbv=1 forces Google to return basic HTML (no JavaScript required)
            # without this, Google returns a JS-heavy page that urllib cannot parse
            query["gbv"] = ["1"]

        elif provider == "local-bing":
            if lang:
                query["setlang"] = [lang]

        new_query = urllib.parse.urlencode(query, doseq=True)
        return urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path, new_query, parsed.fragment))
    except Exception:
        return url


_GOOGLE_BLOCKED_DOMAINS = (
    "google.com/search", "accounts.google.com", "support.google.com",
    "policies.google.com", "maps.google.com/maps", "play.google.com",
    "chrome.google.com", "www.google.com/preferences",
    "www.google.com/webhp", "www.google.com/intl",
    "google.com/sorry", "consent.google.com",
    "google.com/js/", "google.com/images/", "google.com/xjs/",
    "google.com/gen_204", "google.com/complete/",
    "googleapis.com", "gstatic.com", "googleusercontent.com",
    "google.com/setprefs", "google.com/tools/feedback",
)

_BING_BLOCKED_DOMAINS = (
    "bing.com/search", "login.microsoftonline",
    "bing.com/rewards", "bing.com/maps", "bing.com/news/search",
    "microsoft.com/en-us/servicesagreement", "go.microsoft.com",
)

def _search_debug_dir() -> str:
    from ...core.paths import get_app_data_dir
    return os.path.join(get_app_data_dir(), "debug")


def _dump_search_debug(provider: str, html: str):
    """Save HTML to debug file when extraction returns 0 results."""
    try:
        dbg = _search_debug_dir()
        os.makedirs(dbg, exist_ok=True)
        import time as _t
        ts = _t.strftime("%Y%m%d_%H%M%S")
        path = os.path.join(dbg, f"search_{provider}_{ts}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        _log(f"[network/search] DEBUG: saved HTML ({len(html)} chars) -> {path}")
        _log(f"[network/search] DEBUG: first 1500 chars:\n{html[:1500]}")
    except Exception as e:
        _log(f"[network/search] DEBUG dump failed: {e}")


def _is_google_blocked_page(html: str) -> str:
    """Detect Google captcha, consent, JS-only, or redirect pages. Returns reason or empty."""
    sample = html[:10000].lower()

    captcha_indicators = [
        "support.google.com/websearch", "unusual traffic",
        "detected unusual traffic", "/sorry/index",
        "recaptcha", "g-recaptcha", "请完成验证",
    ]
    if sum(1 for ind in captcha_indicators if ind in sample) >= 1:
        return "captcha"

    consent_indicators = [
        "consent.google.com", "before you continue",
        "consent-bump", "consent_page",
    ]
    if sum(1 for ind in consent_indicators if ind in sample) >= 1:
        return "consent"

    js_only_indicators = [
        "/httpservice/retry/enablejs",
        "如果您在几秒钟内没有被重定向",
        "if you are not redirected within a few seconds",
    ]
    if sum(1 for ind in js_only_indicators if ind in sample) >= 1:
        return "js-only"

    return ""


# Flexible href extraction: handles href="...", href='...', href=...
_RE_HREF = re.compile(
    r'''<a\s[^>]*?href\s*=\s*(?:"([^"]*?)"|'([^']*?)'|([^\s>]+))''',
    re.I
)
_RE_A_TAG = re.compile(r"<a\s[^>]*?>([\s\S]*?)</a>", re.I)


def _extract_all_links(html: str):
    """Extract all (href, inner_html) pairs from <a> tags with flexible quote matching."""
    links = []
    for m in _RE_HREF.finditer(html):
        href = m.group(1) or m.group(2) or m.group(3) or ""
        href = _html.unescape(href.strip())
        if not href:
            continue
        start = m.start()
        a_end = _RE_A_TAG.search(html, start)
        inner = ""
        if a_end and a_end.start() == start:
            inner = a_end.group(1)
        else:
            close_idx = html.find("</a>", start)
            if close_idx > start:
                tag_end = html.find(">", start)
                if tag_end > start:
                    inner = html[tag_end + 1:close_idx]
        links.append((href, inner))
    return links


def _is_google_url_blocked(url: str) -> bool:
    return any(bd in url for bd in _GOOGLE_BLOCKED_DOMAINS)


def _google_extract_from_html(html: str):
    """Strategy A: extract from <a> tags in rendered HTML."""
    results = []
    seen = set()
    for href, inner in _extract_all_links(html):
        title = _strip_html_tags(inner)
        if href.startswith("/url?"):
            try:
                target = urllib.parse.parse_qs(
                    urllib.parse.urlsplit(href).query
                ).get("q", [""])[0]
            except Exception:
                target = ""
        elif href.startswith("http"):
            target = href
        else:
            continue
        if not target.startswith("http") or _is_google_url_blocked(target):
            continue
        if not title or len(title) < 4 or target in seen:
            continue
        seen.add(target)
        results.append({"title": title, "url": target})
    return results


def _google_extract_from_js(html: str):
    """Strategy B: extract URLs from Google's JS-rendered page data.

    Modern Google embeds search results in JavaScript data structures.
    We look for URL patterns in the full page content.
    """
    results = []
    seen = set()

    # Pattern 1: /url?q=URL — Google redirect links in JS data
    for m in re.finditer(r"/url\?q=(https?://[^&\"'\\>\s,\]]+)", html):
        url = urllib.parse.unquote(m.group(1))
        if not url.startswith("http") or _is_google_url_blocked(url):
            continue
        if url in seen:
            continue
        seen.add(url)
        # Try to find a title near this URL (within ±300 chars)
        title = _find_nearby_title(html, m.start(), url)
        results.append({"title": title, "url": url})

    if results:
        _log(f"[network/search] Google JS strategy: /url?q= found {len(results)}")
        return results

    # Pattern 2: ["URL","Title",...] or ["URL",null,...,"Title"]
    for m in re.finditer(r'\["(https?://[^"]{10,})"[,\]]', html):
        url = m.group(1).replace("\\/", "/").replace("\\u0026", "&")
        if _is_google_url_blocked(url) or url in seen:
            continue
        seen.add(url)
        title = _find_nearby_title(html, m.start(), url)
        results.append({"title": title, "url": url})

    if results:
        _log(f"[network/search] Google JS strategy: [URL,...] found {len(results)}")
        return results

    # Pattern 3: Escaped URLs https:\/\/... in JS strings
    for m in re.finditer(r'"(https?:\\/\\/[^"]{10,})"', html):
        url = m.group(1).replace("\\/", "/").replace("\\u0026", "&")
        if _is_google_url_blocked(url) or url in seen:
            continue
        seen.add(url)
        title = _find_nearby_title(html, m.start(), url)
        results.append({"title": title, "url": url})

    if results:
        _log(f"[network/search] Google JS strategy: escaped URLs found {len(results)}")
        return results

    # Pattern 4: Any quoted external https URL as last resort
    for m in re.finditer(
        r'"(https?://(?!www\.google\.com|google\.com|accounts\.google'
        r"|googleapis\.com|gstatic\.com|googleusercontent\.com"
        r"|schema\.org|w3\.org|fonts\.g"
        r'|translate\.google)[^\s"\\]{12,})"',
        html,
    ):
        url = m.group(1).replace("\\/", "/").replace("\\u0026", "&")
        if _is_google_url_blocked(url) or url in seen:
            continue
        if re.search(r"\.(js|css|png|jpg|gif|svg|ico|woff)(\?|$)", url, re.I):
            continue
        seen.add(url)
        title = _find_nearby_title(html, m.start(), url)
        results.append({"title": title, "url": url})

    if results:
        _log(f"[network/search] Google JS strategy: generic URLs found {len(results)}")

    return results


def _find_nearby_title(html: str, pos: int, url: str) -> str:
    """Try to find a title string near a URL position in Google JS data."""
    window = html[max(0, pos - 500):pos + 500]

    # Look for quoted strings ≥4 chars that aren't URLs
    candidates = re.findall(r'"([^"]{4,80})"', window)
    best = ""
    for c in candidates:
        text = c.replace("\\/", "/").replace("\\u0026", "&")
        if text.startswith("http") or text.startswith("/"):
            continue
        if re.match(r"^[\w\s.\-,;:!?()（）。，、；：！？\u4e00-\u9fff\u3000-\u303f]+$", text):
            if len(text) > len(best):
                best = text

    if best:
        return _html.unescape(best)

    # Fallback: use domain + path
    try:
        parsed = urllib.parse.urlsplit(url)
        path_part = parsed.path.rstrip("/").split("/")[-1] if parsed.path else ""
        if path_part:
            return f"{parsed.netloc} - {urllib.parse.unquote(path_part)}"
        return parsed.netloc
    except Exception:
        return url[:60]


def _google_extract_results(html: str):
    blocked = _is_google_blocked_page(html)
    if blocked in ("captcha", "consent"):
        _log(f"[network/search] Google blocked page detected: {blocked}")
        return []

    if blocked:
        _log(f"[network/search] Google page flagged as '{blocked}', still attempting extraction")

    # Try JS data extraction first (modern Google embeds results in <script>)
    results = _google_extract_from_js(html)
    if results:
        return results

    # Fall back to HTML extraction (basic HTML mode)
    results = _google_extract_from_html(html)
    return results


def _decode_bing_redirect(href: str) -> str:
    """Decode Bing click-tracking URL (bing.com/ck/a?...&u=a1ENCODED...) to actual URL.

    Bing uses u=a1<base64_encoded_url> or u=a1<url_encoded_url> depending on region.
    """
    if "bing.com/ck/a" not in href:
        return href
    try:
        parsed = urllib.parse.urlparse(href if href.startswith("http") else "https:" + href)
        qs = urllib.parse.parse_qs(parsed.query)
        u_val = qs.get("u", [""])[0]
        if not u_val.startswith("a1"):
            return ""
        encoded = u_val[2:]

        # Try URL-decode first (some regions use percent-encoding)
        url_decoded = urllib.parse.unquote(encoded)
        if url_decoded.startswith("http"):
            return url_decoded

        # Try Base64 decode (international Bing uses base64)
        import base64 as _b64
        padding = 4 - len(encoded) % 4
        if padding != 4:
            encoded += "=" * padding
        b64_decoded = _b64.urlsafe_b64decode(encoded).decode("utf-8", errors="replace")
        if b64_decoded.startswith("http"):
            return b64_decoded
    except Exception:
        pass
    return ""


def _bing_extract_results(html: str):
    results = []
    seen = set()

    def _resolve_href(href: str) -> str:
        """Resolve Bing href: decode ck/a redirects, filter blocked domains."""
        url = _decode_bing_redirect(href) if "bing.com/ck/a" in href else href
        if not url or not url.startswith("http"):
            return ""
        if any(bd in url for bd in _BING_BLOCKED_DOMAINS):
            return ""
        if "bing.com" in url or "microsoft.com" in url:
            return ""
        return url

    # Strategy 1: find <li class="b_algo"> blocks and extract h2 > a
    algo_pattern = re.compile(
        r'<li[^>]*class\s*=\s*["\'][^"\']*\bb_algo\b[^"\']*["\'][^>]*>([\s\S]*?)</li>',
        re.I,
    )
    for block_m in algo_pattern.finditer(html):
        block = block_m.group(1)
        for href, inner in _extract_all_links(block):
            url = _resolve_href(href)
            if not url:
                continue
            title = _strip_html_tags(inner)
            if not title or len(title) < 4:
                continue
            if url in seen:
                continue
            seen.add(url)
            results.append({"title": title, "url": url})
            break

    # Strategy 2: <h2> containing <a href="https://...">
    if not results:
        h2_pattern = re.compile(r"<h2[^>]*>([\s\S]*?)</h2>", re.I)
        for h2_m in h2_pattern.finditer(html):
            h2_html = h2_m.group(1)
            for href, inner in _extract_all_links(h2_html):
                url = _resolve_href(href)
                if not url:
                    continue
                title = _strip_html_tags(inner)
                if not title or len(title) < 4:
                    continue
                if url in seen:
                    continue
                seen.add(url)
                results.append({"title": title, "url": url})

    # Strategy 3: fallback — any external link with substantial title
    if not results:
        for href, inner in _extract_all_links(html):
            url = _resolve_href(href)
            if not url:
                continue
            title = _strip_html_tags(inner)
            if not title or len(title) < 10:
                continue
            if url in seen:
                continue
            seen.add(url)
            results.append({"title": title, "url": url})

    return results


def _baidu_extract_results(html: str):
    results = []
    seen = set()

    h3_pattern = re.compile(r"<h3[^>]*>([\s\S]*?)</h3>", re.I)
    for h3_m in h3_pattern.finditer(html):
        h3_html = h3_m.group(1)
        for href, inner in _extract_all_links(h3_html):
            if not href.startswith("http"):
                continue
            title = _strip_html_tags(inner)
            if not title:
                continue
            if href in seen:
                continue
            seen.add(href)
            results.append({"title": title, "url": href})

    return results


def _decode_ddg_redirect(href: str) -> str:
    """Decode DuckDuckGo redirect URL to get the actual target URL.

    DDG HTML uses: //duckduckgo.com/l/?uddg=ENCODED_URL&rut=...
    """
    href = _html.unescape(href.strip())

    if "duckduckgo.com/l/?" in href or "duckduckgo.com/l/?" in href.replace("//", "/"):
        try:
            if href.startswith("//"):
                href = "https:" + href
            parsed = urllib.parse.urlsplit(href)
            params = urllib.parse.parse_qs(parsed.query)
            uddg = params.get("uddg", [""])[0]
            if uddg and uddg.startswith("http"):
                return uddg
        except Exception:
            pass

    if href.startswith("http"):
        return href

    return ""


def _duckduckgo_extract_results(html: str):
    """Extract results from DuckDuckGo HTML version (html.duckduckgo.com/html/)."""
    results = []
    seen = set()

    # Strategy 1: Find <a> tags with class="result__a" (href and class in any order)
    result_a_pattern = re.compile(
        r'<a\s[^>]*?class\s*=\s*["\']result__a["\'][^>]*>',
        re.I,
    )
    for m in result_a_pattern.finditer(html):
        tag = m.group(0)
        # Extract href from this <a> tag
        href_m = re.search(r'href\s*=\s*["\']([^"\']+)["\']', tag, re.I)
        if not href_m:
            href_m = re.search(r'href\s*=\s*([^\s>]+)', tag, re.I)
        if not href_m:
            continue

        raw_href = href_m.group(1)
        url = _decode_ddg_redirect(raw_href)
        if not url or not url.startswith("http"):
            continue

        # Extract title (text content of this <a>)
        a_end = html.find("</a>", m.end())
        if a_end > m.end():
            inner = html[m.end():a_end]
            title = _strip_html_tags(inner)
        else:
            title = ""

        if not title or len(title) < 3:
            continue
        if "duckduckgo.com" in url:
            continue
        if url in seen:
            continue
        seen.add(url)
        results.append({"title": title, "url": url})

    if results:
        return results

    # Strategy 2: Find result blocks and extract any links with uddg= parameter
    for m in re.finditer(r'uddg=(https?[^&"\'>\s]+)', html, re.I):
        url = urllib.parse.unquote(m.group(1))
        if not url.startswith("http") or "duckduckgo.com" in url:
            continue
        if url in seen:
            continue
        seen.add(url)
        title = _find_nearby_title(html, m.start(), url)
        results.append({"title": title, "url": url})

    if results:
        return results

    # Strategy 3: Any external link with substantial title (last resort)
    for href, inner in _extract_all_links(html):
        url = _decode_ddg_redirect(href) if "duckduckgo.com" in href else href
        if not url or not url.startswith("http") or "duckduckgo.com" in url:
            continue
        title = _strip_html_tags(inner)
        if not title or len(title) < 4:
            continue
        if url in seen:
            continue
        seen.add(url)
        results.append({"title": title, "url": url})

    return results


def _fetch_bing_fallback(query: str, timeout: float) -> list:
    """Fetch search results from Bing as fallback.

    Tries cn.bing.com first (server-side rendered, reliable extraction in China),
    then www.bing.com (may require JS rendering, extraction less reliable).
    """
    for domain in ("cn.bing.com", "www.bing.com"):
        bing_url = f"https://{domain}/search?" + urllib.parse.urlencode({
            "q": query, "count": "10"
        })
        _log(f"[network/search] Bing fallback ({domain}): q={query[:60]!r}")

        bypass = _should_bypass_proxy(bing_url)
        opener = _build_opener(bypass)

        req = urllib.request.Request(bing_url)
        req.add_header("User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
        req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
        req.add_header("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.7")
        req.add_header("Accept-Encoding", "identity")
        req.add_header("Referer", f"https://{domain}/")

        try:
            with opener.open(req, timeout=timeout) as resp:
                raw = resp.read().decode("utf-8", errors="replace")
                results = _bing_extract_results(raw)
                _log(f"[network/search] Bing fallback ({domain}) extracted {len(results)} results")
                if results:
                    return results
                _dump_search_debug(f"bing-fallback-{domain.replace('.', '_')}", raw)
        except Exception as e:
            _log(f"[network/search] Bing fallback ({domain}) failed: {e}")
    return []


def _fetch_baidu_fallback(query: str, timeout: float) -> list:
    """Fetch search results from Baidu as last-resort fallback (most reliable in China)."""
    baidu_url = "https://www.baidu.com/s?" + urllib.parse.urlencode({
        "wd": query, "rn": "10"
    })
    _log(f"[network/search] Baidu fallback: q={query[:60]!r}")

    bypass = _should_bypass_proxy(baidu_url)
    opener = _build_opener(bypass)

    req = urllib.request.Request(baidu_url)
    req.add_header("User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
    req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    req.add_header("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.7")
    req.add_header("Accept-Encoding", "identity")
    req.add_header("Referer", "https://www.baidu.com/")

    try:
        with opener.open(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
            results = _baidu_extract_results(raw)
            _log(f"[network/search] Baidu fallback extracted {len(results)} results")
            if not results:
                _dump_search_debug("baidu-fallback", raw)
            return results
    except Exception as e:
        _log(f"[network/search] Baidu fallback failed: {e}")
        return []


def _fetch_duckduckgo_fallback(query: str, timeout: float) -> list:
    """Fetch search results from DuckDuckGo HTML as fallback for Google.

    Uses POST (native form submission method) to avoid proxy/firewall stripping
    query parameters from GET requests, which causes DDG to return its homepage.
    """
    ddg_url = "https://html.duckduckgo.com/html/"
    form_data = urllib.parse.urlencode({"q": query}).encode("utf-8")
    _log(f"[network/search] Google→DuckDuckGo fallback (POST): q={query[:60]!r}")

    bypass = _should_bypass_proxy(ddg_url)
    opener = _build_opener(bypass)

    req = urllib.request.Request(ddg_url, data=form_data, method="POST")
    req.add_header("User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    req.add_header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    req.add_header("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.7")
    req.add_header("Accept-Encoding", "identity")
    req.add_header("Referer", "https://html.duckduckgo.com/html/")
    req.add_header("Origin", "https://html.duckduckgo.com")

    try:
        with opener.open(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
            results = _duckduckgo_extract_results(raw)
            _log(f"[network/search] DuckDuckGo extracted {len(results)} results")
            if not results:
                _dump_search_debug("duckduckgo-fallback", raw)
            return results
    except Exception as e:
        _log(f"[network/search] DuckDuckGo fallback failed: {e}")
        return []


def _extract_search_results(provider: str, html: str):
    if provider == "local-google":
        results = _google_extract_results(html)
    elif provider == "local-bing":
        results = _bing_extract_results(html)
    elif provider == "local-baidu":
        results = _baidu_extract_results(html)
    else:
        results = []

    if not results:
        _dump_search_debug(provider, html)

    return results


@route("/api/v1/proxy/image", methods=["POST"])
def proxy_image(ctx: dict) -> Any:
    """
    下载外部图片并返回 base64 data URL。
    前端在无外网环境中通过此接口获取外部图片。
    结果缓存在 ~/.cherrystudio/image-cache/ 中（7 天过期）。

    请求体: { "url": "https://...", "skipCache": false }
    返回:   { "dataUrl": "data:image/png;base64,...", "mime": "image/png", "cached": bool }
    """
    body = ctx.get("body", {})
    url = body.get("url", "")
    if not url:
        return {"error": "missing url"}
    url = _sanitize_url(url)
    if not url:
        return {"error": "invalid url"}

    skip_cache = body.get("skipCache", False)

    if not skip_cache:
        cached_data, cached_mime = _read_image_cache(url)
        if cached_data is not None:
            b64 = _b64.b64encode(cached_data).decode("utf-8")
            return {"dataUrl": f"data:{cached_mime};base64,{b64}", "mime": cached_mime, "cached": True}

    try:
        timeout = int(body.get("timeout", 30))
    except (TypeError, ValueError):
        timeout = 30

    try:
        req = urllib.request.Request(url, method="GET")
        req.add_header(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36",
        )
        parsed = urllib.parse.urlparse(url)
        referer_origin = f"{parsed.scheme}://{parsed.netloc}/"
        req.add_header("Referer", referer_origin)
        req.add_header("Accept", "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8")
        opener = _build_opener(bypass=False)
        resp = opener.open(req, timeout=timeout)
        data = resp.read()
        content_type = resp.headers.get("Content-Type", "image/png")
        mime = content_type.split(";")[0].strip()

        _write_image_cache(url, data, mime)

        b64 = _b64.b64encode(data).decode("utf-8")
        return {"dataUrl": f"data:{mime};base64,{b64}", "mime": mime, "cached": False}
    except urllib.error.HTTPError as e:
        return {"error": f"HTTP {e.code}: {e.reason}"}
    except Exception as e:
        return {"error": str(e)}


# ─── 路由 ──────────────────────────────────────────────────────────────────────

@route("/api/v1/network/fetch", methods=["POST"])
def fetch_proxy(ctx: dict) -> Any:
    """
    通用 HTTP 代理请求。
    
    请求体:
        {
            "url": "https://...",
            "method": "GET|POST|...",
            "headers": {},
            "body": "...",
            "timeout": 30,
            "stream": false,
            "requestId": ""   // stream=true 时必填
        }
    返回:
        同步: { "status", "statusText", "headers", "body" }
        流式: { "streaming": true, "requestId": "..." }
    """
    config = ctx["body"]
    url = config.get("url", "")
    if not url:
        return {"error": "missing url"}

    url = _sanitize_url(url)
    if not url:
        return {"error": "invalid url (non-ASCII or malformed)"}

    # 跳过 favicon 请求
    _FAVICON_PATTERNS = ["icon.horse/icon/", "favicon.splitbee.io/", "favicon.im/", "/favicon"]
    if url.lower().endswith(".ico") or any(p in url.lower() for p in _FAVICON_PATTERNS):
        return {"error": "favicon request skipped"}

    method = str(config.get("method", "GET")).upper()
    headers = config.get("headers") or {}
    body_data = config.get("body")
    body_bytes_base64 = config.get("bodyBytesBase64")
    timeout = float(config.get("timeout", 30))
    is_stream = bool(config.get("stream", False))
    request_id = config.get("requestId", "")

    # 序列化请求体
    body_bytes = None
    if body_bytes_base64:
        import base64
        body_bytes = base64.b64decode(body_bytes_base64)
    elif body_data is not None:
        if isinstance(body_data, (dict, list)):
            body_data = json.dumps(body_data)
        if isinstance(body_data, str):
            body_bytes = body_data.encode("utf-8")
        elif isinstance(body_data, bytes):
            body_bytes = body_data

    # Gemini 3: 将历史 tool_call 消息转为文本以绕过 thought_signature 400 错误
    if body_bytes and method == "POST":
        try:
            body_bytes = _patch_gemini3_tool_history(url, body_bytes)
        except Exception:
            pass

    # gpt-image: strip fields that OpenAI-compatible image gateways reject.
    if body_bytes and method == "POST":
        try:
            body_bytes = _patch_gpt_image_request(url, body_bytes)
        except Exception:
            pass

    # ── 构建请求 ──────────────────────────────────────────────────────────────
    req = urllib.request.Request(url, data=body_bytes, method=method)

    # 使用真实浏览器 UA，避免被网站拦截
    _caller_ua = headers.get("User-Agent") or headers.get("user-agent") or ""
    if not _caller_ua:
        req.add_header(
            "User-Agent",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0.0.0 Safari/537.36",
        )

    # 对 GET 网页抓取自动加入 Accept / Accept-Language
    if method == "GET" and not any(k.lower() == "accept" for k in headers):
        req.add_header(
            "Accept",
            "text/html,application/xhtml+xml,application/xml;q=0.9,"
            "image/webp,*/*;q=0.8",
        )
    if method == "GET" and not any(k.lower() == "accept-language" for k in headers):
        req.add_header("Accept-Language", "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7")

    # 明确禁用压缩编码，确保能直接读取响应体（无需解压）
    # 注意：AI API 等调用者已在 headers 里明确指定 Accept-Encoding 时优先使用调用者的值
    if not any(k.lower() == "accept-encoding" for k in headers):
        req.add_header("Accept-Encoding", "identity")

    # 透传调用者的其他请求头
    for k, v in (headers or {}).items():
        if v:
            try:
                req.add_header(str(k), str(v))
            except Exception:
                pass

    if body_bytes and not any(k.lower() == "content-type" for k in headers):
        req.add_header("Content-Type", "application/json")

    bypass = _should_bypass_proxy(url)
    opener = _build_opener(bypass)

    # ── 流式请求 ──────────────────────────────────────────────────────────────
    if is_stream and request_id:
        buf = _get_or_create_stream(request_id)

        def _worker():
            try:
                resp = opener.open(req, timeout=timeout)
                buf.put({"type": "headers", "status": resp.getcode(),
                         "headers": _clean_resp_headers(dict(resp.headers))})
                for raw_line in resp:
                    try:
                        line = raw_line.decode("utf-8", errors="replace")
                        buf.put({"type": "data", "data": line})
                    except Exception:
                        break
                buf.put({"type": "end"})
            except urllib.error.HTTPError as e:
                if e.code == 524:
                    # Cloudflare 524: 源站在 100 秒内未响应。
                    # 常见原因：LLM 上下文过大导致模型推理超时。
                    buf.put({"type": "error", "status": 524,
                             "error": (
                                 "error code: 524\n"
                                 "请求超时（Cloudflare 524）：AI 服务端响应超过 100 秒。\n"
                                 "可能原因：对话上下文过大（如 MCP 工具返回了大量内容），"
                                 "请尝试新建对话或减少工具调用数量。"
                             )})
                else:
                    err = e.read().decode("utf-8", errors="replace")
                    buf.put({"type": "error", "status": e.code, "error": f"error code: {e.code}\n{err[:500]}"})
            except Exception as e:
                err_msg = str(e)
                # DNS 解析失败：无法解析模型 API 的域名
                if "getaddrinfo failed" in err_msg or "11001" in err_msg or "11002" in err_msg:
                    err_msg = (
                        "网络连接失败：无法解析服务器地址（DNS 解析失败）。\n"
                        "请检查：1) 网络是否已连接；2) 是否需要配置代理；3) 防火墙/DNS 是否拦截。\n"
                        f"原始错误: {err_msg}"
                    )
                buf.put({"type": "error", "error": err_msg})

        threading.Thread(target=_worker, daemon=True, name=f"stream-{request_id[:8]}").start()
        return {"streaming": True, "requestId": request_id}

    # ── 同步请求 ──────────────────────────────────────────────────────────────
    def _do_request(the_opener):
        with the_opener.open(req, timeout=timeout) as resp:
            return _process_response(resp)

    def _format_conn_error(e: Exception) -> str:
        err = str(e)
        if "getaddrinfo failed" in err or "11001" in err or "11002" in err:
            return (
                "网络连接失败：无法解析服务器地址（DNS 解析失败）。\n"
                "请检查：1) 网络是否已连接；2) 是否需要配置代理；3) 防火墙/DNS 是否拦截。\n"
                f"原始错误: {err}"
            )
        return err

    try:
        return _do_request(opener)
    except urllib.error.HTTPError as e:
        return _http_error_dict(e)
    except Exception as e:
        # 代理连接失败时（如 WinError 10061），自动回退直连
        if not bypass and _proxy_settings.get("proxyUrl"):
            _log(f"[network/fetch] 代理失败 ({e})，回退直连: {url[:80]}")
            # direct_opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
            direct_opener = _build_opener(bypass=True)
            try:
                return _do_request(direct_opener)
            except urllib.error.HTTPError as e2:
                return _http_error_dict(e2)
            except Exception as e2:
                _log(f"[network/fetch] 直连也失败: {e2}")
                return {"error": _format_conn_error(e2)}
        _log(f"[network/fetch] {url[:100]} -> {e}")
        return {"error": _format_conn_error(e)}


@route("/api/v1/network/stream-read", methods=["POST"])
def stream_read(ctx: dict) -> Any:
    """
    轮询读取流式响应的下一个数据块。
    
    返回类型:
        {"type": "data",    "data": "..."}   — SSE 数据行
        {"type": "headers", "status": 200, "headers": {...}}
        {"type": "end"}                      — 流结束
        {"type": "error",   "error": "..."}  — 出错
        {"type": "empty"}                    — 暂无数据（继续轮询）
    """
    request_id = ctx["body"].get("requestId", "")
    if not request_id or request_id not in _stream_buffers:
        return {"type": "error", "error": "stream not found"}

    buf = _stream_buffers[request_id]
    try:
        item = buf.get_nowait()
        if item["type"] in ("end", "error"):
            _cleanup_stream(request_id)
        return item
    except queue.Empty:
        return {"type": "empty"}


@route("/api/v1/network/set-proxy", methods=["POST"])
def set_proxy(ctx: dict) -> Any:
    """更新代理设置（由 Qt 层在用户配置变更时调用）"""
    if _proxy_managed:
        return {"ok": True, "managed": True}
    body = ctx["body"]
    _proxy_settings["proxyUrl"] = body.get("proxyUrl", "")
    _proxy_settings["bypassRules"] = body.get("bypassRules", "")
    return {"ok": True}


@route("/api/v1/network/get-proxy", methods=["GET"])
def get_proxy(ctx: dict) -> Any:
    if _proxy_managed:
        return {"proxyUrl": "", "bypassRules": "", "managed": True}
    return dict(_proxy_settings)


@route("/api/v1/network/http-get", methods=["POST"])
def http_get(ctx: dict) -> Any:
    """简单 GET 请求（用于 SearXNG 搜索、模型列表等查询）"""
    import base64
    body = ctx["body"]
    url = body.get("url", "")
    headers = body.get("headers") or {}
    auth = body.get("auth")

    # 超时处理：JS 端已统一转为秒（_normalizeTimeoutToSec），此处兜底：
    # 若值 > 300 则认为仍是毫秒（Python 直接调用路径），自动除以 1000
    _raw_timeout = body.get("timeout", 30)
    if isinstance(_raw_timeout, (int, float)) and _raw_timeout > 300:
        timeout = float(_raw_timeout) / 1000.0
    else:
        timeout = float(_raw_timeout) if _raw_timeout else 30.0
    # 超时范围钳制：最低 5s，最高 300s
    timeout = max(5.0, min(300.0, timeout))

    if not url:
        return {"success": False, "error": "missing url"}
    url = _sanitize_url(url)
    if not url:
        return {"success": False, "error": "invalid url (non-ASCII or malformed)"}

    bypass = _should_bypass_proxy(url)
    opener = _build_opener(bypass)

    try:
        req = urllib.request.Request(url)

        # 默认 User-Agent，避免被拦截（SearXNG 等服务需要）
        if not any(k.lower() == "user-agent" for k in headers):
            req.add_header(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36",
            )

        # Basic Auth 支持
        if auth and auth.get("username"):
            credentials = base64.b64encode(
                f"{auth['username']}:{auth.get('password', '')}".encode()
            ).decode()
            req.add_header("Authorization", f"Basic {credentials}")

        for k, v in headers.items():
            if v:
                req.add_header(str(k), str(v))

        def _do_get(the_opener):
            with the_opener.open(req, timeout=timeout) as resp:
                data = resp.read().decode("utf-8", errors="replace")
                try:
                    return {"success": True, "data": json.loads(data), "status": resp.getcode()}
                except Exception:
                    return {"success": True, "data": data, "status": resp.getcode()}

        return _do_get(opener)
    except urllib.error.HTTPError as e:
        return {"success": False, "error": f"HTTP {e.code}", "status": e.code}
    except Exception as e:
        # 代理连接失败时，回退直连
        if not bypass and _proxy_settings.get("proxyUrl"):
            _log(f"[network/http-get] 代理失败 ({e})，回退直连: {url[:80]}")
            # direct_opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
            direct_opener = _build_opener(bypass=True)
            try:
                with direct_opener.open(req, timeout=timeout) as resp:
                    data = resp.read().decode("utf-8", errors="replace")
                    try:
                        return {"success": True, "data": json.loads(data), "status": resp.getcode()}
                    except Exception:
                        return {"success": True, "data": data, "status": resp.getcode()}
            except urllib.error.HTTPError as e2:
                return {"success": False, "error": f"HTTP {e2.code}", "status": e2.code}
            except Exception as e2:
                return {"success": False, "error": str(e2)}
        _log(f"[network/http-get] {url[:80]} -> {e}")
        return {"success": False, "error": str(e)}


@route("/api/v1/network/http-post", methods=["POST"])
def http_post(ctx: dict) -> Any:
    """简单 POST 请求"""
    import base64
    body = ctx["body"]
    url = body.get("url", "")
    payload = body.get("body")
    headers = body.get("headers") or {}
    auth = body.get("auth")
    _raw_timeout = body.get("timeout", 30)
    if isinstance(_raw_timeout, (int, float)) and _raw_timeout > 300:
        timeout = float(_raw_timeout) / 1000.0
    else:
        timeout = float(_raw_timeout) if _raw_timeout else 30.0
    timeout = max(5.0, min(300.0, timeout))

    if not url:
        return {"success": False, "error": "missing url"}
    url = _sanitize_url(url)
    if not url:
        return {"success": False, "error": "invalid url (non-ASCII or malformed)"}

    bypass = _should_bypass_proxy(url)
    opener = _build_opener(bypass)

    try:
        if isinstance(payload, (dict, list)):
            data_bytes = json.dumps(payload).encode("utf-8")
        elif isinstance(payload, str):
            data_bytes = payload.encode("utf-8")
        else:
            data_bytes = b""

        req = urllib.request.Request(url, data=data_bytes, method="POST")
        if not any(k.lower() == "content-type" for k in headers):
            req.add_header("Content-Type", "application/json")
        if auth and auth.get("username"):
            import base64 as _b64
            cred = _b64.b64encode(
                f"{auth['username']}:{auth.get('password', '')}".encode()
            ).decode()
            req.add_header("Authorization", f"Basic {cred}")
        for k, v in headers.items():
            if v:
                req.add_header(str(k), str(v))

        with opener.open(req, timeout=timeout) as resp:
            data = resp.read().decode("utf-8", errors="replace")
            try:
                return {"success": True, "data": json.loads(data), "status": resp.getcode()}
            except Exception:
                return {"success": True, "data": data, "status": resp.getcode()}
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        return {"success": False, "error": f"HTTP {e.code}: {err[:200]}", "status": e.code}
    except Exception as e:
        _log(f"[network/http-post] {e}")
        return {"success": False, "error": str(e)}


_GOOGLE_USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
]


def _do_search_request(normalized_url: str, provider: str, headers: dict, timeout: float, ua_index: int = 0):
    """Execute a single search request. Returns (html_str, status_code) or raises."""
    bypass = _should_bypass_proxy(normalized_url)
    proxy_url = _proxy_settings.get("proxyUrl", "")
    opener = _build_opener(bypass)

    ua_list = _GOOGLE_USER_AGENTS if provider == "local-google" else _GOOGLE_USER_AGENTS[:1]
    ua = ua_list[ua_index % len(ua_list)]

    default_headers = {
        "User-Agent": ua,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "identity",
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
    }
    if provider == "local-google":
        default_headers["Referer"] = "https://www.google.com/"
    elif provider == "local-bing":
        default_headers["Referer"] = "https://www.bing.com/"

    merged = {**default_headers, **headers}
    req = urllib.request.Request(normalized_url)
    for k, v in merged.items():
        if v:
            req.add_header(str(k), str(v))

    with opener.open(req, timeout=timeout) as resp:
        raw = resp.read().decode("utf-8", errors="replace")
        return raw, resp.getcode()


def _extract_query_from_search_url(url: str) -> str:
    """Extract the q= parameter from a search engine URL."""
    try:
        parsed = urllib.parse.urlsplit(url)
        q = urllib.parse.parse_qs(parsed.query).get("q", [""])[0]
        return q.strip()
    except Exception:
        return ""


@route("/api/v1/network/search", methods=["POST"])
def search_engine(ctx: dict) -> Any:
    body = ctx["body"]
    provider = body.get("provider", "")
    url = body.get("url", "")
    language = body.get("language", "")
    headers = body.get("headers") or {}
    _raw_timeout = body.get("timeout", 30)

    if isinstance(_raw_timeout, (int, float)) and _raw_timeout > 300:
        timeout = float(_raw_timeout) / 1000.0
    else:
        timeout = float(_raw_timeout) if _raw_timeout else 30.0
    timeout = max(5.0, min(300.0, timeout))

    if provider not in ("local-google", "local-bing", "local-baidu"):
        return {"success": False, "error": f"unsupported provider: {provider}"}
    if not url:
        return {"success": False, "error": "missing url"}

    normalized_url = _normalize_search_url(provider, url, language)
    normalized_url = _sanitize_url(normalized_url)
    if not normalized_url:
        return {"success": False, "error": "invalid url (non-ASCII or malformed)"}

    # --- Google: try direct fetch, then fallback chain ---
    if provider == "local-google":
        try:
            raw_html, status = _do_search_request(
                normalized_url, provider, headers, timeout, ua_index=0
            )
            blocked = _is_google_blocked_page(raw_html)

            if blocked in ("captcha", "consent"):
                _log(f"[network/search] Google blocked: {blocked}, skipping extraction")
                _dump_search_debug("google-blocked", raw_html)
            else:
                # For "js-only" or unblocked pages, still try extraction.
                # Modern Google embeds results in <script> JSON data even on
                # "js-only" redirect pages — _google_extract_from_js handles this.
                results = _google_extract_from_js(raw_html)
                if not results:
                    results = _google_extract_from_html(raw_html)
                if results:
                    _log(f"[network/search] Google direct: {len(results)} results"
                         f"{' (from js-only page)' if blocked else ''}")
                    return {"success": True, "status": status,
                            "results": results, "count": len(results)}
                _dump_search_debug("google-no-results", raw_html)

            _log(f"[network/search] Google direct failed (blocked={blocked or 'no-results'}), "
                 f"falling back to Bing")
        except Exception as e:
            _log(f"[network/search] Google direct error: {e}")

        # Fallback chain: Bing → Baidu → DuckDuckGo
        query = _extract_query_from_search_url(normalized_url)
        if query:
            for fallback_fn, fallback_name in [
                (_fetch_bing_fallback, "bing"),
                (_fetch_baidu_fallback, "baidu"),
                (_fetch_duckduckgo_fallback, "duckduckgo"),
            ]:
                results = fallback_fn(query, timeout)
                if results:
                    return {"success": True, "status": 200,
                            "results": results, "count": len(results),
                            "fallback": fallback_name}

        return {"success": True, "status": 200, "results": [], "count": 0,
                "warning": "Google blocked; all fallbacks (Bing/Baidu/DuckDuckGo) also failed"}

    # --- Bing / Baidu: direct fetch ---
    try:
        raw_html, status = _do_search_request(
            normalized_url, provider, headers, timeout, ua_index=0
        )
        results = _extract_search_results(provider, raw_html)
        _log(f"[network/search] {provider} extracted {len(results)} results")

        if not results and provider == "local-bing":
            query = _extract_query_from_search_url(normalized_url)
            if query:
                _log("[network/search] Bing returned 0, trying Baidu fallback")
                results = _fetch_baidu_fallback(query, timeout)
                if results:
                    return {"success": True, "status": 200,
                            "results": results, "count": len(results),
                            "fallback": "baidu"}

        return {"success": True, "status": status,
                "results": results, "count": len(results)}
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        return {"success": False, "error": f"HTTP {e.code}: {err[:200]}", "status": e.code}
    except Exception as e:
        _log(f"[network/search] {provider} error: {e}")
        return {"success": False, "error": str(e)}
