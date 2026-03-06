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
import urllib.parse
import urllib.request
import urllib.error
from typing import Any, Dict

from ..server import route
from ...utils.logger import network_logger

_log = network_logger


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
    if bypass:
        return urllib.request.build_opener(urllib.request.ProxyHandler({}))
    proxy_url = _proxy_settings.get("proxyUrl", "")
    if proxy_url:
        proxies = {"http": proxy_url, "https": proxy_url}
        return urllib.request.build_opener(urllib.request.ProxyHandler(proxies))
    return urllib.request.build_opener()


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

_IMAGE_CACHE_DIR = os.path.join(os.path.expanduser("~"), ".cherrystudio", "image-cache")
os.makedirs(_IMAGE_CACHE_DIR, exist_ok=True)

_IMAGE_CACHE_MAX_AGE = 7 * 24 * 3600  # 7 days


def _image_cache_path(url: str) -> str:
    url_hash = hashlib.sha256(url.encode("utf-8")).hexdigest()[:32]
    return os.path.join(_IMAGE_CACHE_DIR, url_hash)


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
        req.add_header("User-Agent", "CherryStudio-ImageProxy/1.0")
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
    timeout = float(config.get("timeout", 30))
    is_stream = bool(config.get("stream", False))
    request_id = config.get("requestId", "")

    # 序列化请求体
    body_bytes = None
    if body_data is not None:
        if isinstance(body_data, (dict, list)):
            body_data = json.dumps(body_data)
        if isinstance(body_data, str):
            body_bytes = body_data.encode("utf-8")
        elif isinstance(body_data, bytes):
            body_bytes = body_data

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
            direct_opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
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
    body = ctx["body"]
    _proxy_settings["proxyUrl"] = body.get("proxyUrl", "")
    _proxy_settings["bypassRules"] = body.get("bypassRules", "")
    return {"ok": True}


@route("/api/v1/network/get-proxy", methods=["GET"])
def get_proxy(ctx: dict) -> Any:
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
            direct_opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
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
