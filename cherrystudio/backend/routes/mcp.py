"""
MCP Server 管理路由（后端进程侧）

第三方 MCP 服务器（filesystem、github、puppeteer 等）的子进程
由后端服务统一管理，运行在独立的 Python 环境中，与 Houdini 进程无关。

DCC 侧（HoudiniMCPServer）已在 dcc/houdini_mcp.py 中独立实现，
通过 session 注册到后端后，后端同样可以调用它。

支持的服务器类型:
  - stdio        : 标准 MCP stdio 传输（MCPStdioClient，子进程）
  - streamableHttp / sse / http : HTTP/SSE 传输（MCPHttpClient，直连 HTTP）
"""

import asyncio
import json
import os
import re
import subprocess
import threading
import queue
import time
import uuid
import urllib.request
import urllib.error
from collections import deque
from typing import Any, Dict, Optional, Tuple

from ..server import route
from ..process_manager import pm as _pm
from ...utils.logger import network_logger
from ...core.config_manager import config_manager

_log = network_logger


def _dbg(msg: str) -> None:
    """记录到日志文件（调试信息）"""
    _log(f"[MCP] {msg}")
    try:
        print(f"[MCP-CONSOLE] {msg}")
    except:
        pass


# ─── 运行中的 MCP 客户端注册表 ────────────────────────────────────────────────
_clients: Dict[str, Any] = {}
_clients_lock = threading.Lock()


# ─── 启动时自动预热活跃的 MCP 服务器 ────────────────────────────────────────

_warmup_done = False

def _load_active_server_configs() -> list:
    """
    从中心化配置和 localStorage（Redux persist）加载所有 isActive=True 的 MCP 服务器配置。
    跳过 hub / inMemory / builtin 等虚拟服务器。
    """
    _SKIP_TYPES = {"hub", "inmemory", "in-memory", "builtin", "memory", "thinking"}
    _SKIP_PREFIXES = ("in-memory", "builtin", "memory", "thinking", "hub")
    results: list = []

    # 1) 中心化配置
    try:
        cfg = config_manager.load() or {}
        all_central = cfg.get("centralizedMcpServers") or cfg.get("mcpServers") or []
        _dbg(f"[warmup] centralized MCP servers total: {len(all_central)}")
        for s in all_central:
            sid = s.get("id", "")
            stype = str(s.get("type", "stdio")).lower()
            is_active = s.get("isActive", False)
            skip = stype in _SKIP_TYPES or any(sid.lower().startswith(p) for p in _SKIP_PREFIXES)
            _dbg(f"[warmup]   central '{sid}' type={stype} active={is_active} skip={skip}")
            if skip:
                continue
            if is_active:
                results.append(s)
    except Exception as e:
        _dbg(f"[warmup] centralized config load error: {e}")
        import traceback
        _dbg(traceback.format_exc())

    seen_ids = {s.get("id") for s in results}

    # 2) 用户配置（localStorage.json → Redux persist）
    try:
        from ...core.paths import get_app_data_dir
        base_dir = get_app_data_dir()
        ls_path = os.path.join(base_dir, "localStorage.json")
        _dbg(f"[warmup] localStorage path: {ls_path}, exists={os.path.exists(ls_path)}")
        if os.path.exists(ls_path):
            with open(ls_path, "r", encoding="utf-8") as f:
                ls_data = json.load(f)

            root_str = ls_data.get("persist:cherry-studio")
            if root_str:
                root = json.loads(root_str) if isinstance(root_str, str) else root_str
                mcp_str = root.get("mcp")
                if mcp_str:
                    mcp_state = json.loads(mcp_str) if isinstance(mcp_str, str) else mcp_str
                    user_servers = mcp_state.get("servers") or []
                    _dbg(f"[warmup] localStorage MCP servers total: {len(user_servers)}")
                    for s in user_servers:
                        sid = s.get("id", "")
                        stype = str(s.get("type", "stdio")).lower()
                        is_active = s.get("isActive", False)
                        if sid in seen_ids:
                            continue
                        skip = stype in _SKIP_TYPES or any(sid.lower().startswith(p) for p in _SKIP_PREFIXES)
                        _dbg(f"[warmup]   user '{sid[:20]}' type={stype} active={is_active} skip={skip}")
                        if skip:
                            continue
                        if is_active:
                            results.append(s)
                            seen_ids.add(sid)
                else:
                    _dbg("[warmup] no 'mcp' key in persist:cherry-studio")
            else:
                _dbg("[warmup] no 'persist:cherry-studio' key in localStorage")
    except Exception as e:
        _dbg(f"[warmup] localStorage load error: {e}")
        import traceback
        _dbg(traceback.format_exc())

    _dbg(f"[warmup] total active servers to warm up: {len(results)}")
    return results


def _warmup_single_server(server_config: dict):
    """后台启动单个 MCP 服务器并缓存到 _clients"""
    sid = server_config.get("id", "?")
    try:
        client, err = _get_or_start_client(server_config)
        if err:
            _dbg(f"[warmup] '{sid}' failed: {err}")
        else:
            try:
                tools = client.list_tools()
                _dbg(f"[warmup] '{sid}' OK, {len(tools or [])} tools cached")
            except Exception as e:
                _dbg(f"[warmup] '{sid}' started but list_tools failed: {e}")
    except Exception as e:
        _dbg(f"[warmup] '{sid}' exception: {e}")


def _ensure_bin_sync():
    """
    确保 .cherrystudio/bin 下有 uv/bun 可执行文件，
    并将该目录加入 PATH（前端 isBinaryExist 会做同样的事，
    但 warmup 在前端初始化之前运行，所以必须在这里提前加入）。
    """
    import shutil
    from pathlib import Path

    from ...core.paths import get_bin_dir
    local_bin = Path(get_bin_dir())
    shared_bin = Path("J:/vfxtools/piplineTD/models/packages/bin")

    uv_name = "uv.exe" if os.name == "nt" else "uv"
    need_sync = (not local_bin.exists()) or (not (local_bin / uv_name).exists())

    if need_sync and shared_bin.exists():
        try:
            _dbg(f"[warmup] bin sync: {shared_bin} → {local_bin}")
            local_bin.parent.mkdir(parents=True, exist_ok=True)
            if local_bin.exists():
                shutil.rmtree(local_bin, ignore_errors=True)
            shutil.copytree(str(shared_bin), str(local_bin))
            _dbg(f"[warmup] bin sync complete")
        except Exception as e:
            _dbg(f"[warmup] bin sync failed: {e}")
    elif local_bin.exists():
        _dbg(f"[warmup] bin dir OK: {local_bin}")
    else:
        _dbg(f"[warmup] bin dir missing and shared path unavailable")

    # 将 .cherrystudio/bin 加入 PATH，使 shutil.which() 能找到 uvx/bun
    # 前端的 isBinaryExist() 会做同样的事，但 warmup 比前端早运行
    if local_bin.exists():
        bin_str = str(local_bin)
        current_path = os.environ.get("PATH", "")
        if bin_str not in current_path:
            os.environ["PATH"] = bin_str + os.pathsep + current_path
            _dbg(f"[warmup] added to PATH: {bin_str}")


def auto_start_active_servers():
    """
    在后台线程中预热所有活跃的 MCP 服务器。
    由 server.py 在 BackendHTTPServer.start() 后调用。
    先确保 bin 工具（uv/bun）已就绪，再启动 MCP 服务器。
    """
    global _warmup_done
    try:
        _dbg("[warmup] ========== auto_start_active_servers() called ==========")
        if _warmup_done:
            _dbg("[warmup] skipped (already done)")
            return
        _warmup_done = True

        # 1) 确保 uv/bun 可执行文件就绪
        try:
            _ensure_bin_sync()
        except Exception as e:
            _dbg(f"[warmup] bin sync error (non-fatal): {e}")

        # 2) 加载并启动活跃的 MCP 服务器
        try:
            servers = _load_active_server_configs()
        except Exception as e:
            _dbg(f"[warmup] _load_active_server_configs() EXCEPTION: {e}")
            import traceback
            _dbg(traceback.format_exc())
            return

        if not servers:
            _dbg("[warmup] no active MCP servers found — nothing to pre-start")
            return

        _dbg(f"[warmup] pre-starting {len(servers)} active MCP server(s): "
             f"{[s.get('id','?')[:20] for s in servers]}")

        threads = []
        for s in servers:
            t = threading.Thread(
                target=_warmup_single_server,
                args=(s,),
                name=f"mcp-warmup-{s.get('id', '?')[:20]}",
                daemon=True,
            )
            t.start()
            threads.append(t)

        # 等待所有预热线程完成（最多 60 秒）
        for t in threads:
            t.join(timeout=60)
        _dbg(f"[warmup] ========== warmup finished, _clients={list(_clients.keys())} ==========")
    except Exception as e:
        try:
            import traceback
            _dbg(f"[warmup] FATAL error in auto_start_active_servers: {e}\n{traceback.format_exc()}")
        except Exception:
            print(f"[MCP-WARMUP-FATAL] {e}")


# ─── 内置工具：Web Search ────────────────────────────────────────────────────

def _load_websearch_config() -> Optional[dict]:
    """
    加载网络搜索提供者配置。
    优先级：
      1) 当前 assistant 的 webSearchProviderId（用户在对话框底部快捷面板选的）
      2) websearch slice 的 defaultProvider（设置页全局默认）
      3) 中心化配置 centralizedWebSearchProviders
    """
    try:
        from ...core.paths import get_app_data_dir as _get_data_dir
        ls_path = os.path.join(_get_data_dir(), "localStorage.json")

        providers_list: list = []
        assistant_provider_id: str = ""
        default_id: str = ""

        if os.path.exists(ls_path):
            with open(ls_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            root_str = data.get("persist:cherry-studio")
            root = json.loads(root_str) if isinstance(root_str, str) else (root_str or {})

            # ── 1a) 尝试从 assistant 的 webSearchProviderId 获取 ──
            assistants_str = root.get("assistants")
            if assistants_str:
                ast_state = json.loads(assistants_str) if isinstance(assistants_str, str) else assistants_str
                da = ast_state.get("defaultAssistant") or {}
                if isinstance(da, str):
                    try:
                        da = json.loads(da)
                    except Exception:
                        da = {}
                assistant_provider_id = da.get("webSearchProviderId") or ""

            # ── 1b) websearch slice ──
            ws_str = root.get("websearch") or data.get("persist:websearch") or data.get("websearch")
            if ws_str:
                ws_state = json.loads(ws_str) if isinstance(ws_str, str) else ws_str
                default_id = ws_state.get("defaultProvider", "")
                if isinstance(default_id, str) and default_id.startswith('"'):
                    try:
                        default_id = json.loads(default_id)
                    except Exception:
                        pass
                providers_raw = ws_state.get("providers", "[]")
                providers_list = json.loads(providers_raw) if isinstance(providers_raw, str) else providers_raw

        # ── 构建 provider 查找函数 ──
        def _find_provider(pid: str) -> Optional[dict]:
            for p in providers_list:
                if p.get("id") == pid:
                    return {
                        "id": p.get("id", ""),
                        "type": p.get("id", ""),
                        "apiHost": p.get("apiHost", ""),
                        "apiKey": p.get("apiKey", ""),
                        "url": p.get("url", ""),
                    }
            return None

        # ── 优先级 1: assistant.webSearchProviderId ──
        if assistant_provider_id:
            cfg = _find_provider(assistant_provider_id)
            if cfg:
                _dbg(f"[websearch] loaded from assistant.webSearchProviderId: {cfg['id']}")
                return cfg

        # ── 优先级 2: websearch.defaultProvider ──
        if default_id:
            cfg = _find_provider(default_id)
            if cfg:
                _dbg(f"[websearch] loaded from websearch.defaultProvider: {cfg['id']}")
                return cfg

        # ── 优先级 2b: fallback local-* provider from user list ──
        for p in providers_list:
            pid = p.get("id", "")
            if pid.startswith("local-") or p.get("apiHost") or p.get("url"):
                config = {
                    "id": pid, "type": pid,
                    "apiHost": p.get("apiHost", ""),
                    "apiKey": p.get("apiKey", ""),
                    "url": p.get("url", ""),
                }
                _dbg(f"[websearch] loaded fallback from providers list: {config['id']}")
                return config

        # ── 优先级 3: 中心化配置 ──
        cfg_data = config_manager.load() or {}
        providers = cfg_data.get("centralizedWebSearchProviders") or []
        if providers:
            p = providers[0]
            config = {
                "id": p.get("id", ""),
                "type": p.get("id", ""),
                "apiHost": p.get("apiHost", ""),
                "apiKey": p.get("apiKey", ""),
                "url": p.get("url", ""),
            }
            _dbg(f"[websearch] loaded from centralized config: {config['id']}")
            return config

        return None
    except Exception as e:
        _dbg(f"[websearch] config load error: {e}")
        return None


def _exec_web_search(query: str, provider_id: str = "") -> dict:
    """执行网络搜索，返回 MCP call-tool 兼容格式的 dict。
    使用 network 模块的代理设置访问外网。"""
    import urllib.parse as _up
    from .network import _build_opener, _proxy_settings, _should_bypass_proxy

    config = None
    if provider_id:
        cfg = config_manager.load() or {}
        for p in (cfg.get("centralizedWebSearchProviders") or []):
            if p.get("id") == provider_id:
                config = {"id": p["id"], "type": p["id"],
                          "apiHost": p.get("apiHost", ""), "apiKey": p.get("apiKey", ""),
                          "url": p.get("url", "")}
                break

    if not config:
        config = _load_websearch_config()
    if not config:
        config = {"id": "local-bing", "type": "local-bing",
                  "apiHost": "", "apiKey": "",
                  "url": "https://cn.bing.com/search?q=%s&ensearch=1"}

    ptype = config.get("type", "").lower()
    api_host = config.get("apiHost", "")
    _dbg(f"[websearch] exec: provider={ptype}, query={query[:80]}")

    def _open_url(req: urllib.request.Request, url: str, timeout: int = 30):
        """使用代理打开 URL，代理失败时自动回退直连"""
        bypass = _should_bypass_proxy(url)
        proxy_url = _proxy_settings.get("proxyUrl", "")
        _dbg(f"[websearch] _open_url: proxy={proxy_url or '(none)'}, bypass={bypass}")
        opener = _build_opener(bypass=bypass)
        try:
            return opener.open(req, timeout=timeout)
        except Exception as e:
            if not bypass and proxy_url:
                _dbg(f"[websearch] proxy failed ({e}), fallback to direct")
                direct = _build_opener(bypass=True)
                return direct.open(req, timeout=timeout)
            raise

    try:
        # ── SearXNG ──
        if ptype == "searxng" and api_host:
            api_base = api_host.rstrip("/")
            params = _up.urlencode({
                "q": query, "format": "json",
                "categories": "general", "language": "zh-CN",
            })
            url = f"{api_base}/search?{params}"
            req = urllib.request.Request(url)
            req.add_header("User-Agent", "CherryStudio/1.0")
            with _open_url(req, url) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            results = data.get("results", [])
            if not results:
                return {"isError": False,
                        "content": [{"type": "text", "text": "No results found."}]}
            lines = []
            for i, r in enumerate(results[:8]):
                title = r.get("title", "No Title")
                link = r.get("url", "")
                snippet = r.get("content", "") or r.get("snippet", "")
                lines.append(f"[{i+1}] {title}\nURL: {link}\nContent: {snippet}")
            return {"isError": False,
                    "content": [{"type": "text", "text": "Search Results:\n\n" + "\n\n".join(lines)}]}

        # ── local search engines (Google / Bing / Baidu) ──
        if ptype in ("local-google", "local-bing", "local-baidu"):
            default_urls = {
                "local-google": "https://www.google.com/search?q=%s",
                "local-bing": "https://cn.bing.com/search?q=%s&ensearch=1",
                "local-baidu": "https://www.baidu.com/s?wd=%s",
            }
            search_url = config.get("url") or default_urls.get(ptype, "")
            if not search_url:
                return {"isError": True,
                        "content": [{"type": "text", "text": f"No URL configured for {ptype}"}]}
            full_url = search_url.replace("%s", _up.quote(query))
            req = urllib.request.Request(full_url)
            req.add_header("User-Agent",
                           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                           "AppleWebKit/537.36 (KHTML, like Gecko) "
                           "Chrome/120.0.0.0 Safari/537.36")
            req.add_header("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.8")
            with _open_url(req, full_url) as resp:
                html = resp.read().decode("utf-8", errors="ignore")
            from . import network as _net
            results = _net._extract_search_results(ptype, html)
            if not results:
                return {"isError": False,
                        "content": [{"type": "text", "text": f"No results found via {ptype}."}]}
            lines = []
            for i, r in enumerate(results[:8]):
                if isinstance(r, dict):
                    title = r.get("title", "No Title")
                    link = r.get("url", "")
                    snippet = r.get("content", "") or r.get("snippet", "")
                    lines.append(f"[{i+1}] {title}\nURL: {link}" + (f"\nContent: {snippet}" if snippet else ""))
                else:
                    lines.append(f"[{i+1}] {r}")
            return {"isError": False,
                    "content": [{"type": "text", "text": "Search Results:\n\n" + "\n\n".join(lines)}]}

        return {"isError": True,
                "content": [{"type": "text", "text": f"Unsupported search provider: {ptype}"}]}

    except Exception as e:
        _dbg(f"[websearch] exec error: {e}")
        return {"isError": True,
                "content": [{"type": "text", "text": f"Web search failed: {e}"}]}


# ─── @cherry/hub 内置虚拟服务器实现 ──────────────────────────────────────────
# Cherry Studio 的"自动"模式依赖 @cherry/hub 提供 search 和 exec 两个元工具，
# 模型先用 search 发现可用工具，再用 exec 调用它们。
# 原实现在单进程 cherry_studio_api.py 中，重构后后端需独立实现相同逻辑。
#
# 三层工具访问架构：
#   Tier 0 - 直接调用：预处理器检测到的工具，完整 schema 注入 params.tools
#   Tier 1 - 按名调用：LLM 知道工具名 → call_tool(name, args)
#   Tier 2 - 发现+调用：LLM 不确定 → search(query) → get_tool_schema → call_tool
#
# Hub 默认只暴露 4 个核心元工具（~1,200 tokens），不暴露 30+ 个完整工具定义

_HUB_TOOL_DEFINITIONS = [
    {
        "name": "discover_tools",
        "description": (
            "Discover available MCP tools by keyword (NOT for web search). "
            "Returns tool names with brief descriptions. "
            "Use get_tool_schema to see full parameters, then call_tool to execute. "
            "Use '*' to list all available tools. "
            "Do NOT use this for searching the web — use the dedicated web search tool instead."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Keywords to find MCP tools (comma-separated). Use '*' to list all."
                }
            },
            "required": ["query"]
        }
    },
    {
        "name": "get_tool_schema",
        "description": (
            "Get the full parameter schema for a specific tool. "
            "Call this before call_tool if you need to know exact parameter names and types."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "tool_name": {
                    "type": "string",
                    "description": "The exact tool name (as returned by search)"
                }
            },
            "required": ["tool_name"]
        }
    },
    {
        "name": "call_tool",
        "description": (
            "Execute any available tool by name. Pass the tool name and its arguments as JSON. "
            "If unsure about parameters, use get_tool_schema first. "
            "For multi-step workflows, call this tool multiple times — each result is returned "
            "to you automatically so you can decide the next step."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "tool_name": {
                    "type": "string",
                    "description": "The tool to execute"
                },
                "arguments": {
                    "type": "object",
                    "description": "Tool arguments as key-value pairs"
                }
            },
            "required": ["tool_name"]
        }
    }
]

# exec 保留处理器供向后兼容，但不再暴露给 LLM（避免诱导写复杂代码）


def _is_hub_server(server_id: str) -> bool:
    """判断 server_id 是否是 @cherry/hub 虚拟服务器"""
    sl = server_id.lower().strip()
    return sl in ("hub", "@cherry/hub", "cherry-hub") or sl.startswith("@cherry/")


def _make_hub_func_name(server_id: str, tool_name: str) -> str:
    """
    生成 hub exec 代码中使用的函数名（与原版 _generate_function_name 逻辑一致）。
    例：server_id="mcpAtlassian", tool_name="confluence_search" → "mcpatlassian_confluenceSearch"
    """
    def _to_camel(s: str) -> str:
        s = s.strip().lower()
        s = re.sub(r'[^a-z0-9]+(.)', lambda m: m.group(1).upper(), s)
        return re.sub(r'[^a-zA-Z0-9]', '', s)

    server_part = _to_camel(server_id) if server_id else ''
    tool_part   = _to_camel(tool_name)
    if server_part:
        return f"{server_part}_{tool_part}"
    return tool_part


def _parse_hub_args(args_str: str) -> dict:
    """
    解析 hub exec 代码中的参数字符串（JSON 或 JS 对象字面量）。
    支持：标准 JSON、unquoted keys、单引号值（含内嵌双引号）、模板字面量。
    """
    if not args_str or not args_str.strip():
        return {}
    s = args_str.strip()
    # 1. 标准 JSON
    try:
        return json.loads(s)
    except Exception:
        pass
    # 2. JS 对象字面量 → JSON：逐字符状态机解析，处理单引号/双引号/反引号
    try:
        result = _js_obj_to_json(s)
        return json.loads(result)
    except Exception:
        pass
    # 3. 简单正则尝试（无嵌套引号的简单情况）
    try:
        fixed = re.sub(r'(?<!["\w])([a-zA-Z_]\w*)\s*:', r'"\1":', s)
        fixed = re.sub(r"'([^']*)'", lambda m: '"' + m.group(1).replace('"', r'\"') + '"', fixed)
        return json.loads(fixed)
    except Exception:
        pass
    # 4. fallback：把整体当作 query 字符串
    return {"query": s.strip("'\"")}


def _js_obj_to_json(s: str) -> str:
    """
    将 JS 对象字面量转换为合法 JSON 字符串。
    处理：unquoted keys、单引号值（内含双引号）、反引号模板字符串。
    """
    out: list[str] = []
    i = 0
    n = len(s)

    while i < n:
        ch = s[i]

        # 跳过空白
        if ch in ' \t\r\n':
            out.append(ch)
            i += 1
            continue

        # 双引号字符串：原样保留
        if ch == '"':
            j = i + 1
            while j < n:
                if s[j] == '\\':
                    j += 2
                    continue
                if s[j] == '"':
                    break
                j += 1
            out.append(s[i:j + 1])
            i = j + 1
            continue

        # 单引号字符串 → 双引号，内部双引号需要转义
        if ch == "'":
            j = i + 1
            chars: list[str] = []
            while j < n and s[j] != "'":
                if s[j] == '\\':
                    if j + 1 < n:
                        chars.append(s[j:j + 2])
                        j += 2
                    else:
                        chars.append(s[j])
                        j += 1
                else:
                    if s[j] == '"':
                        chars.append('\\"')
                    else:
                        chars.append(s[j])
                    j += 1
            out.append('"' + ''.join(chars) + '"')
            i = j + 1
            continue

        # 反引号模板字符串 → 双引号
        if ch == '`':
            j = i + 1
            chars = []
            while j < n and s[j] != '`':
                if s[j] == '"':
                    chars.append('\\"')
                else:
                    chars.append(s[j])
                j += 1
            out.append('"' + ''.join(chars) + '"')
            i = j + 1
            continue

        # Unquoted key：在 { 或 , 后面出现的标识符后跟 :
        if ch.isalpha() or ch == '_':
            j = i
            while j < n and (s[j].isalnum() or s[j] == '_'):
                j += 1
            word = s[i:j]
            # 跳过 word 后的空白
            k = j
            while k < n and s[k] in ' \t':
                k += 1
            if k < n and s[k] == ':':
                out.append('"' + word + '"')
                i = j
                continue
            # 不是 key：可能是 true/false/null
            if word in ('true', 'false', 'null'):
                out.append(word)
            else:
                out.append('"' + word + '"')
            i = j
            continue

        # 数字
        if ch in '-0123456789':
            j = i + 1
            while j < n and (s[j].isdigit() or s[j] in '.eE+-'):
                j += 1
            out.append(s[i:j])
            i = j
            continue

        # 其他字符（{, }, [, ], :, ,）原样输出
        out.append(ch)
        i += 1

    return ''.join(out)


def _hub_search(query: str, limit: int = 10) -> dict:
    """
    @cherry/hub search 工具实现：
    在所有已注册的活跃 MCP 客户端中搜索工具，返回函数签名供模型调用。
    """
    limit = min(max(1, int(limit)), 50)
    with _clients_lock:
        all_client_ids = list(_clients.keys())
        active = {sid: c for sid, c in _clients.items() if c.is_alive()}
    _dbg(f"[hub_search] query={query!r}, registered_clients={all_client_ids}, alive={list(active.keys())}")

    all_tools: list = []
    for server_id, client in active.items():
        try:
            raw_tools = client.list_tools()
            _dbg(f"[hub_search] client '{server_id}' returned {len(raw_tools or [])} tools")
            for t in (raw_tools or []):
                all_tools.append({
                    "name":       t.get("name", ""),
                    "description": t.get("description", ""),
                    "inputSchema": t.get("inputSchema", {}),
                    "serverId":   server_id,
                    "funcName":   _make_hub_func_name(server_id, t.get("name", "")),
                })
        except Exception as _e:
            _dbg(f"[hub_search] client '{server_id}' list_tools error: {_e}")

    # 也把 Hub 自身的元工具加入搜索池，让 LLM 能通过 search 发现 ask_model 等
    for meta_tool in list(_HUB_TOOL_DEFINITIONS) + [_ASK_MODEL_TOOL]:
        all_tools.append({
            "name":        meta_tool["name"],
            "description": meta_tool.get("description", ""),
            "inputSchema": meta_tool.get("inputSchema", {}),
            "serverId":    "@cherry/hub",
            "funcName":    meta_tool["name"],
        })

    _dbg(f"[hub_search] total tools (MCP + meta): {len(all_tools)}")

    # 支持 '*' 或 'all' 查询全部工具
    if query.strip() in ("*", "all", "list", ""):
        keywords = []
        matched = all_tools[:limit]
    else:
        keywords = [k.strip().lower() for k in re.split(r'[,\s]+', query) if k.strip()]
        matched = []
        for t in all_tools:
            text = f"{t['funcName']} {t['name']} {t['description']} {t['serverId']}".lower()
            if any(kw in text for kw in keywords):
                matched.append(t)
                if len(matched) >= limit:
                    break

    _dbg(f"[hub_search] keywords={keywords}, matched={len(matched)} out of {len(all_tools)}")

    if not matched:
        return {
            "isError": False,
            "content": [{"type": "text", "text":
                          "No matching tools found. Try a broader query like '*' to list all."}]
        }

    # 紧凑摘要：只返回工具名 + 第一句描述，不含参数 schema（节约 ~90% tokens）
    lines = []
    for t in matched:
        name = t["name"]
        desc = (t["description"] or "")
        # 严格截取第一句话，去掉 Args/参数说明等
        first_sentence = re.split(r'\.\s|\.\n|\n\n|。', desc)[0][:80]
        if first_sentence and not first_sentence.endswith("."):
            first_sentence += "."
        lines.append(f"- {name}: {first_sentence}")

    result_text = (
        f"Found {len(matched)} tool(s).\n\n"
        + "\n".join(lines)
        + "\n\n## Next steps:\n"
        "1. get_tool_schema({\"tool_name\": \"<name>\"}) — see parameters\n"
        "2. call_tool({\"tool_name\": \"<name>\", \"arguments\": {...}}) — execute\n"
        "For multi-step: call call_tool multiple times, results come back to you each time."
    )

    return {
        "isError": False,
        "content": [{"type": "text", "text": result_text}]
    }


def _hub_exec(code: str) -> dict:
    """
    @cherry/hub exec 工具实现：
    从代码字符串中解析 `await FuncName({...})` 调用并执行对应的 MCP 工具。
    """
    if not code or not code.strip():
        return {
            "isError": True,
            "content": [{"type": "text", "text": "code is required. Example: await confluenceSearch({query: 'hello'})"}]
        }

    # 解析代码中所有 await FuncName({...}) 调用
    calls: list = []
    pos = 0
    while pos < len(code):
        m = re.search(r'await\s+(\w+)\s*\(', code[pos:])
        if not m:
            break
        func_name  = m.group(1)
        args_start = pos + m.end()
        depth = 1
        cur   = args_start
        while depth > 0 and cur < len(code):
            ch = code[cur]
            if ch == '(':
                depth += 1
            elif ch == ')':
                depth -= 1
            cur += 1
        args_str = code[args_start:cur - 1].strip()
        calls.append((func_name, args_str))
        pos = cur

    if not calls:
        return {
            "isError": True,
            "content": [{"type": "text", "text": (
                "No valid tool calls found in code.\n\n"
                "IMPORTANT: For most cases, use call_tool instead of exec:\n"
                "  call_tool({\"tool_name\": \"confluence_search\", \"arguments\": {\"query\": \"...\"}})\n\n"
                "Only use exec for simple await calls:\n"
                "  exec({\"code\": \"await confluenceSearch({query: 'hello'})\"}) \n\n"
                "Do NOT use mcp.callTool(), variables, or complex logic in exec."
            )}]
        }

    # 构建 funcName → (client, raw_tool_name) 映射
    with _clients_lock:
        active = {sid: c for sid, c in _clients.items() if c.is_alive()}

    tool_map: Dict[str, tuple] = {}
    for server_id, client in active.items():
        try:
            raw_tools = client.list_tools()
            for t in (raw_tools or []):
                raw_name = t.get("name", "")
                fn = _make_hub_func_name(server_id, raw_name)
                tool_map[fn]       = (client, raw_name)
                tool_map[raw_name] = (client, raw_name)   # 也按原始名查找
        except Exception:
            pass

    # web_search 不再由 hub exec 处理 — 前端搜索工具由前端 searchOrchestrationPlugin
    # 的 builtin_web_search 独立执行，不经过 MCP hub 通道。

    # 依次执行每个工具调用
    results = []
    for func_name, args_str in calls:
        entry = tool_map.get(func_name)
        if not entry and "_" in func_name:
            # fallback：去掉服务器前缀后按工具名查找
            short = func_name.split("_", 1)[1]
            entry = tool_map.get(short)

        if not entry:
            results.append({
                "tool":  func_name,
                "error": f"Tool not found: '{func_name}'. Use search to discover available tools."
            })
            continue

        client, raw_tool_name = entry
        args = _parse_hub_args(args_str)

        try:
            result = client.call_tool(raw_tool_name, args, timeout=60.0)
            results.append({"tool": func_name, "result": result})
        except Exception as e:
            results.append({"tool": func_name, "error": str(e)})

    # 单次调用直接返回其结果
    if len(results) == 1:
        r = results[0]
        if "error" in r:
            return {"isError": True, "content": [{"type": "text", "text": r["error"]}]}
        result = r.get("result", {})
        if isinstance(result, dict):
            return result
        return {"isError": False, "content": [{"type": "text", "text": str(result)}]}

    # 多次调用：合并输出
    out_parts = []
    for r in results:
        if "error" in r:
            out_parts.append(f"[{r['tool']}] Error: {r['error']}")
        else:
            result = r.get("result", {})
            content = result.get("content", []) if isinstance(result, dict) else []
            text = content[0].get("text", str(result)) if content else str(result)
            out_parts.append(f"[{r['tool']}]\n{text}")

    return {
        "isError": False,
        "content": [{"type": "text", "text": "\n\n---\n\n".join(out_parts)}]
    }


def _hub_exec_from_args(arguments: dict) -> dict:
    """
    当模型使用 invoke/call/use 等别名调用 exec 时，arguments 可能不是 code 字符串，
    而是直接的工具参数。尝试从 arguments 中提取工具名和参数，然后执行。

    支持的格式：
    - {"name": "web_search", "query": "..."} / {"tool": "web_search", ...}
    - {"query": "..."} (仅当只有一个可用工具时猜测为 web_search)
    """
    _dbg(f"[hub_exec_from_args] arguments={json.dumps(arguments, ensure_ascii=False)[:200]}")

    # 尝试提取工具名
    func_name = (arguments.get("name") or arguments.get("tool")
                 or arguments.get("function") or arguments.get("tool_name") or "")
    tool_args = (arguments.get("arguments") or arguments.get("args")
                 or arguments.get("input") or arguments.get("params") or {})

    # 如果提取到工具名，把其余参数当作工具参数
    if func_name:
        if not tool_args:
            tool_args = {k: v for k, v in arguments.items()
                         if k not in ("name", "tool", "function", "tool_name",
                                      "arguments", "args", "input", "params", "code")}
        # 模型有时会双重嵌套: {"params": {"query": "..."}} → 直接展开
        if isinstance(tool_args, dict) and len(tool_args) == 1 and "params" in tool_args:
            tool_args = tool_args["params"]
        code = f"await {func_name}({json.dumps(tool_args, ensure_ascii=False)})"
        _dbg(f"[hub_exec_from_args] reconstructed code: {code[:200]}")
        return _hub_exec(code)

    # 没有工具名但有 query → 默认当作 web_search
    if "query" in arguments:
        query = arguments["query"]
        code = f'await web_search({json.dumps({"query": query}, ensure_ascii=False)})'
        _dbg(f"[hub_exec_from_args] inferred web_search: {code[:200]}")
        return _hub_exec(code)

    return {
        "isError": True,
        "content": [{"type": "text", "text":
                      "Could not determine tool to execute. "
                      "Use format: {\"code\": \"await toolName({param: value})\"} "
                      "or {\"name\": \"tool_name\", \"query\": \"...\"}"}]
    }


# ─── get_tool_schema / call_tool：按需加载 + 按名调用 ─────────────────────────

def _get_tool_schema(tool_name: str) -> dict:
    """返回指定工具的完整参数 schema，供 LLM 在调用前了解参数细节。"""
    # 先检查 Hub 内建元工具（search/call_tool/get_tool_schema/ask_model）
    for meta_tool in list(_HUB_TOOL_DEFINITIONS) + [_ASK_MODEL_TOOL]:
        if meta_tool.get("name") == tool_name:
            return {
                "isError": False,
                "content": [{"type": "text", "text": json.dumps({
                    "tool_name": tool_name,
                    "server": "@cherry/hub",
                    "description": meta_tool.get("description", ""),
                    "inputSchema": meta_tool.get("inputSchema", {})
                }, indent=2, ensure_ascii=False)}]
            }

    with _clients_lock:
        active = {sid: c for sid, c in _clients.items() if c.is_alive()}
    for server_id, client in active.items():
        try:
            for t in (client.list_tools() or []):
                if t.get("name") == tool_name:
                    schema = t.get("inputSchema", {})
                    desc = t.get("description", "")
                    return {
                        "isError": False,
                        "content": [{"type": "text", "text": json.dumps({
                            "tool_name": tool_name,
                            "server": server_id,
                            "description": desc,
                            "inputSchema": schema
                        }, indent=2, ensure_ascii=False)}]
                    }
        except Exception:
            pass
    return {
        "isError": True,
        "content": [{"type": "text", "text":
                      f"Tool '{tool_name}' not found. Use search to discover available tools."}]
    }


def _call_tool(tool_name: str, arguments: dict) -> dict:
    """按名称直接调用任意已注册的 MCP 工具。"""
    if not tool_name:
        return {"isError": True,
                "content": [{"type": "text", "text": "tool_name is required"}]}
    _dbg(f"[call_tool] name={tool_name!r} args={json.dumps(arguments, ensure_ascii=False)[:200]}")

    with _clients_lock:
        active = {sid: c for sid, c in _clients.items() if c.is_alive()}
    for server_id, client in active.items():
        try:
            for t in (client.list_tools() or []):
                if t.get("name") == tool_name:
                    _dbg(f"[call_tool] Found on '{server_id}', executing...")
                    result = client.call_tool(tool_name, arguments, timeout=60.0)
                    if isinstance(result, dict):
                        return result
                    return {"isError": False,
                            "content": [{"type": "text", "text": str(result)}]}
        except Exception as e:
            _dbg(f"[call_tool] Error on '{server_id}': {e}")
            return {"isError": True,
                    "content": [{"type": "text", "text": f"Tool '{tool_name}' failed: {e}"}]}
    return {
        "isError": True,
        "content": [{"type": "text", "text":
                      f"Tool '{tool_name}' not found. Use search to discover available tools."}]
    }


# ─── ask_model 工具：模型委派（多模态路由） ──────────────────────────────────

_ASK_MODEL_TOOL = {
    "name": "ask_model",
    "description": (
        "Delegate a task to another AI model and return its response. "
        "Automatically routes to the correct API based on model type: "
        "text/multimodal models use chat completions, "
        "image generation models (nano-banana-pro, doubao-seedream-4-5-251128, gpt-image-1.5) "
        "use the images API to create images from text prompts, "
        "embedding models produce vector embeddings. "
        "When the user says @model_name, use this tool to delegate to that model."
    ),
    "inputSchema": {
        "type": "object",
        "properties": {
            "model_id": {
                "type": "string",
                "description": (
                    "Target model ID. Available models: "
                    "qwen3-vl-plus (vision), doubao-seed-1-8-251228 (multimodal), "
                    "gpt-5.3-codex (coding), deepseek-v3.2-thinking (reasoning), "
                    "claude-haiku-4-5-20251001 (multimodal), gemini-3.1-pro-preview-thinking (multimodal), "
                    "nano-banana-pro (image gen), doubao-seedream-4-5-251128 (image gen), "
                    "gpt-image-1.5 (image gen), bge-m3:567m (embedding)"
                )
            },
            "prompt": {
                "type": "string",
                "description": "The prompt/task to send to the target model"
            },
            "images": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Optional list of images for vision/multimodal models. Accepts: HTTP/HTTPS URLs, local file paths, or data URIs (data:image/...;base64,...)"
            },
            "system_prompt": {
                "type": "string",
                "description": "Optional system prompt for the target model (text/multimodal only)"
            },
            "size": {
                "type": "string",
                "description": "Image size for image generation models, e.g. '1024x1024', '512x512' (default: 1024x1024)"
            },
            "n": {
                "type": "number",
                "description": "Number of images to generate (default: 1, image gen only)"
            },
            "negative_prompt": {
                "type": "string",
                "description": "Negative prompt for image generation (things to avoid in the image)"
            }
        },
        "required": ["model_id", "prompt"]
    }
}


def _get_api_config():
    """Read Higress API host, key, and full model list from centralized-config.json."""
    cfg_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        "resources", "centralized-config.json",
    )
    try:
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        for p in cfg.get("providers", []):
            if p.get("apiHost") and p.get("apiKey"):
                return p["apiHost"], p["apiKey"], p.get("models", [])
    except Exception as e:
        _dbg(f"[ask_model] Failed to read config: {e}")
    return None, None, []


def _get_model_info(model_id: str) -> dict:
    """Look up a model's config (primaryModality, endpoint_type, etc.) from centralized-config.json."""
    _, _, models = _get_api_config()
    for m in models:
        if m.get("id") == model_id or m.get("modelId") == model_id:
            return m
    return {"primaryModality": "text"}


def _ask_model_http(url: str, body: dict, api_key: str, timeout: int = 120) -> dict:
    """Shared HTTP POST helper for ask_model sub-handlers."""
    payload = json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, data=payload, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/json")
    req.add_header("User-Agent",
                   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                   "AppleWebKit/537.36 (KHTML, like Gecko) "
                   "Chrome/124.0.0.0 Safari/537.36")
    from .network import _should_bypass_proxy, _build_opener
    bypass = _should_bypass_proxy(url)
    opener = _build_opener(bypass)
    try:
        resp = opener.open(req, timeout=timeout)
        return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err_body = ""
        try:
            err_body = e.read().decode("utf-8", errors="replace")[:500]
        except Exception:
            pass
        _dbg(f"[ask_model_http] HTTP {e.code} from {url}: {err_body}")
        raise Exception(f"HTTP Error {e.code}: {e.reason}\n{err_body}") from e


def _get_image_save_dir() -> str:
    """Return the directory for saving generated images (%TEMP%/cherrystudio/generated_images)."""
    import tempfile
    d = os.path.join(tempfile.gettempdir(), "cherrystudio", "generated_images")
    os.makedirs(d, exist_ok=True)
    return d


def _extract_images_from_text(text: str, model_id: str) -> list:
    """Parse markdown image syntax from text, download images, return MCP content items."""
    import base64 as _b64
    md_img_re = re.compile(r'!\[([^\]]*)\]\((https?://[^)\s]+)\)')
    matches = list(md_img_re.finditer(text))

    if not matches:
        return [{"type": "text", "text": text}]

    content_items: list = []
    last_end = 0
    save_dir = _get_image_save_dir()

    for m in matches:
        before = text[last_end:m.start()].strip()
        if before:
            content_items.append({"type": "text", "text": before})

        img_url = m.group(2)
        try:
            from .network import _should_bypass_proxy, _build_opener
            req = urllib.request.Request(img_url)
            bypass = _should_bypass_proxy(img_url)
            opener = _build_opener(bypass)
            resp = opener.open(req, timeout=30)
            img_bytes = resp.read()
            img_b64 = _b64.b64encode(img_bytes).decode("utf-8")
            ct = resp.headers.get("Content-Type", "image/png").split(";")[0].strip()

            import time as _time
            ts = int(_time.time() * 1000)
            filename = f"{model_id}_{ts}.png"
            filepath = os.path.join(save_dir, filename)
            with open(filepath, "wb") as f:
                f.write(img_bytes)

            content_items.append({"type": "image", "data": img_b64, "mimeType": ct})
            content_items.append({"type": "text", "text": f"Saved to: {filepath}"})
            _dbg(f"[extract_images] Downloaded {img_url[:80]} → {filepath} ({len(img_bytes)} bytes)")
        except Exception as e:
            content_items.append({"type": "text", "text": f"![{m.group(1)}]({img_url})"})
            _dbg(f"[extract_images] Failed to download {img_url[:80]}: {e}")

        last_end = m.end()

    after = text[last_end:].strip()
    if after:
        content_items.append({"type": "text", "text": after})

    return content_items


def _ask_model_chat(model_id: str, prompt: str, images: list,
                    system_prompt: str, api_host: str, api_key: str,
                    timeout: int = 120) -> dict:
    """Handle text/multimodal models via /v1/chat/completions."""
    import base64 as _b64

    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})

    if images:
        user_content = []
        for img_src in images:
            if img_src.startswith(("http://", "https://")):
                user_content.append({
                    "type": "image_url",
                    "image_url": {"url": img_src}
                })
                _dbg(f"[ask_model:chat] Image from URL: {img_src[:80]}")
            elif img_src.startswith("data:"):
                user_content.append({
                    "type": "image_url",
                    "image_url": {"url": img_src}
                })
                _dbg(f"[ask_model:chat] Image from data URI ({len(img_src)} chars)")
            else:
                try:
                    with open(img_src, "rb") as f:
                        img_data = _b64.b64encode(f.read()).decode("utf-8")
                    ext = os.path.splitext(img_src)[1].lower().lstrip(".")
                    media_types = {"jpg": "image/jpeg", "jpeg": "image/jpeg",
                                   "png": "image/png", "gif": "image/gif", "webp": "image/webp"}
                    media_type = media_types.get(ext, "image/jpeg")
                    user_content.append({
                        "type": "image_url",
                        "image_url": {"url": f"data:{media_type};base64,{img_data}"}
                    })
                    _dbg(f"[ask_model:chat] Image from file: {img_src}")
                except Exception as e:
                    user_content.append({"type": "text", "text": f"[Failed to load image {img_src}: {e}]"})
                    _dbg(f"[ask_model:chat] Failed to load image file: {img_src}: {e}")
        user_content.append({"type": "text", "text": prompt})
        messages.append({"role": "user", "content": user_content})
    else:
        messages.append({"role": "user", "content": prompt})

    url = f"{api_host.rstrip('/')}/v1/chat/completions"
    body = {"model": model_id, "messages": messages, "stream": False}
    _dbg(f"[ask_model:chat] Calling {model_id}, prompt={prompt[:80]}...")

    try:
        resp_body = _ask_model_http(url, body, api_key, timeout=timeout)
    except Exception as e:
        _dbg(f"[ask_model:chat] API call failed: {e}")
        return {"isError": True,
                "content": [{"type": "text", "text": f"Failed to call model {model_id}: {e}"}]}

    choices = resp_body.get("choices", [])
    if choices:
        msg = choices[0].get("message", {})
        msg_content = msg.get("content", "")
        content_items: list = []

        # Some image models return images inline in message content (multipart)
        if isinstance(msg_content, list):
            for part in msg_content:
                if isinstance(part, dict):
                    if part.get("type") == "image_url":
                        url_data = part.get("image_url", {})
                        img_url = url_data.get("url", "") if isinstance(url_data, dict) else str(url_data)
                        if img_url.startswith("data:"):
                            # data:image/png;base64,XXXX
                            try:
                                header, b64 = img_url.split(",", 1)
                                mime = header.split(":")[1].split(";")[0] if ":" in header else "image/png"
                                content_items.append({"type": "image", "data": b64, "mimeType": mime})
                            except Exception:
                                content_items.append({"type": "text", "text": img_url[:200]})
                        else:
                            content_items.append({"type": "text", "text": f"[Image URL]: {img_url}"})
                    elif part.get("type") == "text":
                        content_items.append({"type": "text", "text": part.get("text", "")})
                    else:
                        content_items.append({"type": "text", "text": str(part)})
        elif isinstance(msg_content, str) and msg_content:
            content_items.extend(_extract_images_from_text(msg_content, model_id))

        if not content_items:
            content_items.append({"type": "text", "text": f"No content from {model_id}"})

        _dbg(f"[ask_model:chat] {model_id} responded with {len(content_items)} content items")
        return {"isError": False,
                "content": [{"type": "text", "text": f"[Response from {model_id}]:"}] + content_items}
    return {"isError": True,
            "content": [{"type": "text", "text": f"No response from model {model_id}"}]}


def _ask_model_image(model_id: str, prompt: str, api_host: str, api_key: str,
                     size: str = "1024x1024", n: int = 1,
                     negative_prompt: str = "") -> dict:
    """Handle image generation models via /v1/images/generations."""
    import base64 as _b64

    url = f"{api_host.rstrip('/')}/v1/images/generations"
    body: dict = {"model": model_id, "prompt": prompt, "n": n, "size": size}
    if negative_prompt:
        body["negative_prompt"] = negative_prompt
    _dbg(f"[ask_model:image] Calling {model_id}, prompt={prompt[:80]}, size={size}, n={n}")

    try:
        resp_body = _ask_model_http(url, body, api_key, timeout=180)
    except Exception as e:
        _dbg(f"[ask_model:image] API call failed: {e}")
        return {"isError": True,
                "content": [{"type": "text", "text": f"Failed to generate image with {model_id}: {e}"}]}

    data_list = resp_body.get("data", [])
    if not data_list:
        return {"isError": True,
                "content": [{"type": "text", "text": f"No image data returned from {model_id}"}]}

    save_dir = _get_image_save_dir()

    import time as _time
    content_items: list = [{"type": "text", "text": f"[Image generated by {model_id}]"}]

    for idx, item in enumerate(data_list):
        img_url = item.get("url", "")
        b64_data = item.get("b64_json", "") or item.get("base64", "")

        if b64_data:
            ts = int(_time.time() * 1000)
            filename = f"{model_id}_{ts}_{idx}.png"
            filepath = os.path.join(save_dir, filename)
            try:
                raw = _b64.b64decode(b64_data)
                with open(filepath, "wb") as f:
                    f.write(raw)
                _dbg(f"[ask_model:image] Saved image to {filepath} ({len(raw)} bytes)")
                content_items.append({"type": "image", "data": b64_data, "mimeType": "image/png"})
                content_items.append({"type": "text", "text": f"Saved to: {filepath}"})
            except Exception as e:
                content_items.append({"type": "text", "text": f"[Failed to save image {idx}]: {e}"})
        elif img_url:
            # Download URL to get base64 for inline display
            try:
                from .network import _should_bypass_proxy, _build_opener
                img_req = urllib.request.Request(img_url)
                bypass = _should_bypass_proxy(img_url)
                opener = _build_opener(bypass)
                img_resp = opener.open(img_req, timeout=30)
                img_bytes = img_resp.read()
                img_b64 = _b64.b64encode(img_bytes).decode("utf-8")
                ct = img_resp.headers.get("Content-Type", "image/png").split(";")[0].strip()
                ts = int(_time.time() * 1000)
                filename = f"{model_id}_{ts}_{idx}.png"
                filepath = os.path.join(save_dir, filename)
                with open(filepath, "wb") as f:
                    f.write(img_bytes)
                _dbg(f"[ask_model:image] Downloaded {img_url[:80]} → {filepath} ({len(img_bytes)} bytes)")
                content_items.append({"type": "image", "data": img_b64, "mimeType": ct})
                content_items.append({"type": "text", "text": f"Saved to: {filepath}"})
            except Exception as e:
                _dbg(f"[ask_model:image] Failed to download {img_url[:80]}: {e}")
                content_items.append({"type": "text", "text": f"[Image URL]: {img_url}"})
        else:
            content_items.append({"type": "text", "text": f"[Image {idx}]: no url or b64_json in response"})

    return {"isError": False, "content": content_items}


def _ask_model_embedding(model_id: str, prompt: str,
                         api_host: str, api_key: str) -> dict:
    """Handle embedding models via /v1/embeddings."""
    url = f"{api_host.rstrip('/')}/v1/embeddings"
    body = {"model": model_id, "input": prompt}
    _dbg(f"[ask_model:embedding] Calling {model_id}, input={prompt[:80]}...")

    try:
        resp_body = _ask_model_http(url, body, api_key, timeout=60)
    except Exception as e:
        _dbg(f"[ask_model:embedding] API call failed: {e}")
        return {"isError": True,
                "content": [{"type": "text", "text": f"Failed to get embedding from {model_id}: {e}"}]}

    data_list = resp_body.get("data", [])
    if data_list:
        embedding = data_list[0].get("embedding", [])
        dim = len(embedding)
        preview = str(embedding[:5]) + "..." if dim > 5 else str(embedding)
        _dbg(f"[ask_model:embedding] {model_id} returned {dim}-dim vector")
        return {"isError": False,
                "content": [{"type": "text",
                             "text": f"[Embedding from {model_id}]: {dim} dimensions\n{preview}"}]}
    return {"isError": True,
            "content": [{"type": "text", "text": f"No embedding data from {model_id}"}]}


def _ask_model(arguments: dict) -> dict:
    """Route ask_model to the correct handler based on model modality."""
    model_id = arguments.get("model_id", "")
    prompt = arguments.get("prompt", "")

    if not model_id or not prompt:
        return {"isError": True,
                "content": [{"type": "text", "text": "model_id and prompt are required"}]}

    api_host, api_key, _ = _get_api_config()
    if not api_host:
        return {"isError": True,
                "content": [{"type": "text", "text": "No API configuration found in centralized-config.json"}]}

    model_info = _get_model_info(model_id)
    modality = model_info.get("primaryModality", "text")
    endpoint_type = model_info.get("endpoint_type", "")
    _dbg(f"[ask_model] model={model_id}, modality={modality}, endpoint_type={endpoint_type}")

    # endpoint_type == "openai" means the model uses chat completions API,
    # even if primaryModality is "image" (e.g. nano-banana-pro, gpt-image-1.5)
    use_images_api = (modality == "image" and endpoint_type != "openai")

    if use_images_api:
        return _ask_model_image(
            model_id, prompt, api_host, api_key,
            size=arguments.get("size", "1024x1024"),
            n=int(arguments.get("n", 1)),
            negative_prompt=arguments.get("negative_prompt", ""),
        )
    elif modality == "embedding":
        return _ask_model_embedding(model_id, prompt, api_host, api_key)
    else:
        # Image models via chat completions (endpoint_type=openai) need longer timeout
        chat_timeout = 180 if modality == "image" else 120
        return _ask_model_chat(
            model_id, prompt,
            images=arguments.get("images", []),
            system_prompt=arguments.get("system_prompt", ""),
            api_host=api_host, api_key=api_key,
            timeout=chat_timeout,
        )


# ─── Hub 直接工具调用：绕过 search/exec，LLM 一步直接调用 ────────────────────

def _collect_direct_tools() -> list:
    """
    收集所有已注册活跃客户端的工具，供 Hub 直接暴露给 LLM。
    返回原始工具定义列表（不含 Hub 自身的 search/exec）。
    """
    tools = []
    with _clients_lock:
        active = {sid: c for sid, c in _clients.items() if c.is_alive()}
    for server_id, client in active.items():
        try:
            raw_tools = client.list_tools()
            for t in (raw_tools or []):
                tools.append(dict(t))
        except Exception as e:
            _dbg(f"[collect_direct_tools] client '{server_id}' error: {e}")
    return tools


def _hub_direct_call(tool_name: str, arguments: dict) -> Optional[dict]:
    """
    尝试在所有注册客户端中查找并直接调用指定工具。
    返回 None 表示未找到。
    """
    with _clients_lock:
        active = {sid: c for sid, c in _clients.items() if c.is_alive()}
    for server_id, client in active.items():
        try:
            raw_tools = client.list_tools()
            for t in (raw_tools or []):
                if t.get("name") == tool_name:
                    _dbg(f"[hub_direct_call] Found '{tool_name}' on client '{server_id}', calling...")
                    result = client.call_tool(tool_name, arguments, timeout=60.0)
                    if isinstance(result, dict):
                        return result
                    return {"isError": False,
                            "content": [{"type": "text", "text": str(result)}]}
        except Exception as e:
            _dbg(f"[hub_direct_call] client '{server_id}' error: {e}")
    return None


# ─── Stdio 客户端 ─────────────────────────────────────────────────────────────

class MCPStdioClient:
    """
    MCP stdio 传输客户端。
    在后端进程中启动并管理第三方 MCP 服务器子进程。
    """

    def __init__(self, server_id: str, command: str, args: list,
                 env: dict, cwd: Optional[str]):
        self.server_id = server_id
        self.command = command
        self.args = args or []
        self.env = env or {}
        self.cwd = cwd
        self.process: Optional[subprocess.Popen] = None
        self._req_counter = 0
        self._pending: Dict[int, tuple] = {}
        self._lock = threading.Lock()
        self._closed = False
        self._initialized = False      # MCP 握手是否已完成
        self._tools_cache: Optional[list] = None
        self._stderr_tail = deque(maxlen=20)

    # ── 生命周期 ──────────────────────────────────────────────────────────────

    def start(self):
        import shutil as _shutil

        env = os.environ.copy()
        # 清理可能干扰子进程的变量
        for k in ("PYTHONPATH", "PYTHONHOME",
                  "HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy",
                  "ALL_PROXY", "all_proxy"):
            env.pop(k, None)
        env.update(self.env)

        command = self.command
        args = list(self.args)

        # ── Windows 命令解析 ────────────────────────────────────────────────────
        # Windows 上 npx/bun 通常以 npx.cmd/bun.cmd 形式存在（Node.js 安装的脚本）。
        # subprocess(shell=False) 不会自动查找 .cmd 扩展名，必须手动解析。
        # 解析步骤：
        #   1. 用 shutil.which() 在 env[PATH] 中查找完整路径（如 C:\...\npx.cmd）
        #   2. 若是 .cmd/.bat，改写为 cmd /c <full_path> [args...]，保证可靠执行
        if os.name == "nt" and not os.path.isabs(command):
            resolved = _shutil.which(command, path=env.get("PATH", os.environ.get("PATH", "")))
            if resolved:
                _dbg(f"[stdio:{self.server_id[:12]}] Resolved: {command!r} → {resolved!r}")
                command = resolved
            else:
                _dbg(f"[stdio:{self.server_id[:12]}] WARNING: {command!r} not found in PATH")

        if os.name == "nt" and command.lower().endswith((".cmd", ".bat")):
            # .cmd 文件需要通过 cmd /c 执行，否则 subprocess(shell=False) 无法找到
            args = ["/c", command] + args
            command = "cmd"
            _dbg(f"[stdio:{self.server_id[:12]}] Wrapped as cmd /c: {[command] + args}")

        use_shell = False  # 始终使用 shell=False（.cmd 已通过 cmd /c 包装）
        popen_kwargs = {}
        if os.name == "nt":
            popen_kwargs["creationflags"] = subprocess.CREATE_NO_WINDOW
        _dbg(f"[stdio:{self.server_id[:12]}] Starting subprocess: {command} {args}")
        self.process = subprocess.Popen(
            [command] + args,
            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
            env=env, cwd=self.cwd, bufsize=0, text=False, shell=use_shell,
            **popen_kwargs,
        )
        _pm.register(self.process, f"mcp:{self.server_id[:16]}")
        threading.Thread(target=self._read_loop,   daemon=True, name=f"mcp-r-{self.server_id[:8]}").start()
        threading.Thread(target=self._stderr_loop, daemon=True, name=f"mcp-e-{self.server_id[:8]}").start()
        _dbg(f"[stdio:{self.server_id[:12]}] Subprocess PID={self.process.pid}, performing MCP handshake...")
        self._initialize()
        if not self._initialized and not self.is_alive():
            raise RuntimeError(
                f"MCP server '{self.server_id}' exited during startup. "
                f"{self._build_exit_detail()}"
            )
        _dbg(f"[stdio:{self.server_id[:12]}] start() complete: initialized={self._initialized}")

    def stop(self):
        self._closed = True
        if self.process:
            _pm.unregister(self.process)
            try:
                self.process.stdin.close()
                self.process.terminate()
            except Exception:
                pass

    def is_alive(self) -> bool:
        return self.process is not None and self.process.poll() is None

    # ── I/O 循环 ──────────────────────────────────────────────────────────────

    def _read_loop(self):
        while not self._closed:
            try:
                line = self.process.stdout.readline()
                if not line:
                    break
                msg = json.loads(line.decode("utf-8").strip())
                req_id = msg.get("id")
                if req_id is not None:
                    with self._lock:
                        entry = self._pending.pop(req_id, None)
                    if entry:
                        event, q = entry
                        q.put(msg)
                        event.set()
            except Exception:
                break

    def _stderr_loop(self):
        while not self._closed:
            try:
                line = self.process.stderr.readline()
                if not line:
                    break
                text = line.decode('utf-8', errors='replace').rstrip()
                self._stderr_tail.append(text)
                _log(f"[MCP:{self.server_id[:8]} stderr] {text}")
            except Exception:
                break

    def _build_exit_detail(self) -> str:
        code = None
        try:
            if self.process is not None:
                code = self.process.poll()
        except Exception:
            code = None
        detail = f"exit_code={code}" if code is not None else "exit_code=unknown"
        if self._stderr_tail:
            detail += f", stderr_tail={' | '.join(self._stderr_tail)}"
        return detail

    # ── JSON-RPC ──────────────────────────────────────────────────────────────

    def _next_id(self) -> int:
        with self._lock:
            self._req_counter += 1
            return self._req_counter

    def _request(self, method: str, params: dict, timeout: float = 30.0) -> dict:
        # 写 stdin 前先确认进程存活，避免向已退出进程写数据引发 OSError
        if not self.is_alive():
            raise RuntimeError(
                f"MCP server '{self.server_id}' process has exited. "
                f"Please restart the server. {self._build_exit_detail()}"
            )
        req_id = self._next_id()
        payload = {"jsonrpc": "2.0", "id": req_id, "method": method, "params": params}
        event = threading.Event()
        q: queue.Queue = queue.Queue()
        with self._lock:
            self._pending[req_id] = (event, q)
        raw = (json.dumps(payload) + "\n").encode("utf-8")
        try:
            self.process.stdin.write(raw)
            self.process.stdin.flush()
        except OSError as e:
            with self._lock:
                self._pending.pop(req_id, None)
            raise RuntimeError(
                f"MCP server '{self.server_id}' stdin write failed ({e}). "
                "The process may have exited. Please restart the server."
            ) from e
        if not event.wait(timeout=timeout):
            with self._lock:
                self._pending.pop(req_id, None)
            raise TimeoutError(f"MCP request timed out: {method}")
        return q.get_nowait()

    def _notify(self, method: str, params: dict):
        payload = {"jsonrpc": "2.0", "method": method, "params": params}
        try:
            self.process.stdin.write((json.dumps(payload) + "\n").encode("utf-8"))
            self.process.stdin.flush()
        except Exception:
            pass

    def _initialize(self, timeout: float = 90.0):
        """
        执行 MCP 初始化握手。
        timeout 默认 90 秒，以容纳 uvx/npx 首次运行时下载包的时间。
        """
        if self._initialized:
            return
        try:
            _dbg(f"[stdio:{self.server_id[:12]}] Sending initialize (timeout={timeout}s)...")
            self._request("initialize", {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "cherry-studio-backend", "version": "2.0"},
            }, timeout=timeout)
            self._notify("notifications/initialized", {})
            self._initialized = True
            _dbg(f"[stdio:{self.server_id[:12]}] Initialize OK")
        except Exception as e:
            _dbg(f"[stdio:{self.server_id[:12]}] Initialize FAILED: {type(e).__name__}: {e}")

    # ── 工具操作 ──────────────────────────────────────────────────────────────

    def _remove_from_registry(self):
        """将自身从全局客户端注册表中移除（进程已死时调用）"""
        with _clients_lock:
            if _clients.get(self.server_id) is self:
                _clients.pop(self.server_id, None)
                _dbg(f"[stdio:{self.server_id[:12]}] removed dead client from registry")

    def list_tools(self) -> list:
        if self._tools_cache is not None:
            return self._tools_cache

        # 进程已退出：从注册表清除，让下次调用重新启动
        if not self.is_alive():
            self._remove_from_registry()
            raise RuntimeError(
                f"MCP server '{self.server_id}' process has exited unexpectedly. "
                f"Please restart the server. {self._build_exit_detail()}"
            )

        # 如果握手未完成（uvx/npx 首次下载可能超过了 start() 中的等待），再给一次机会
        if not self._initialized:
            _dbg(f"[stdio:{self.server_id[:12]}] list_tools: not initialized yet, retrying handshake...")
            self._initialize(timeout=60.0)

        if not self._initialized:
            # 仍未完成：检查进程是否还活着
            if not self.is_alive():
                self._remove_from_registry()
                raise RuntimeError(
                    f"MCP server '{self.server_id}' process exited during initialization. "
                    f"{self._build_exit_detail()}"
                )
            raise RuntimeError(
                f"MCP server '{self.server_id}' failed to initialize. "
                "The process may still be starting (e.g. uvx/npx downloading packages). "
                "Please wait a moment and try again."
            )

        resp = self._request("tools/list", {}, timeout=30.0)
        if "error" in resp:
            raise RuntimeError(f"tools/list error: {resp['error']}")
        tools = resp.get("result", {}).get("tools", [])
        self._tools_cache = tools
        _dbg(f"[stdio:{self.server_id[:12]}] list_tools OK → {len(tools)} tools")
        return tools

    def call_tool(self, tool_name: str, arguments: dict, timeout: float = 60.0) -> dict:
        if not self._initialized:
            _dbg(f"[stdio:{self.server_id[:12]}] call_tool: not initialized, retrying handshake...")
            self._initialize(timeout=30.0)
        resp = self._request("tools/call", {"name": tool_name, "arguments": arguments}, timeout)
        if "error" in resp:
            return {"isError": True, "content": [{"type": "text", "text": str(resp["error"])}]}
        return _format_tool_result(resp.get("result", {}))


# ─── HTTP/SSE 客户端（基于 fastmcp） ─────────────────────────────────────────

def _run_async(coro):
    """在当前线程的新事件循环中运行异步协程（后端请求线程中无既有事件循环）"""
    return asyncio.run(coro)


class MCPHttpClient:
    """
    MCP streamableHttp / SSE / HTTP 传输客户端。
    使用 fastmcp.Client 处理 MCP 协议细节（SSE、streamableHttp 等），
    比直接发 JSON-RPC HTTP 请求更可靠。
    """

    def __init__(self, server_id: str, url: str, headers: Optional[Dict] = None):
        self.server_id = server_id
        self.url = url
        self.headers = headers or {}
        self._tools_cache: Optional[list] = None
        self._tools_cache_time: float = 0.0   # 成功缓存的时间戳
        self._failure_cache_time: float = 0.0 # 失败缓存的时间戳（避免反复超时等待）
        self._failure_cache_err: str = ""
        _FAILURE_CACHE_TTL = 60.0  # 失败后 60 秒内不重试

    def start(self):
        """HTTP 类型无子进程，连通性测试在 list_tools 时自然发生"""
        pass

    def stop(self):
        pass

    def is_alive(self) -> bool:
        return True  # 外部 HTTP 服务器视为始终可用

    # ── 工具操作 ──────────────────────────────────────────────────────────────

    _FAILURE_CACHE_TTL = 60.0   # 失败后 60 秒内不重试（避免每次打开设置都等 30 秒超时）
    _TOOLS_CACHE_TTL  = 300.0  # 成功缓存 5 分钟

    def list_tools(self) -> list:
        import time as _time
        now = _time.monotonic()

        if self._tools_cache is not None and (now - self._tools_cache_time) < self._TOOLS_CACHE_TTL:
            _dbg(f"[http:{self.server_id[:12]}] list_tools (cached, {len(self._tools_cache)} tools)")
            return self._tools_cache

        # 失败缓存：最近 60s 内已失败，直接抛出缓存的错误，不再重试
        if self._failure_cache_time and (now - self._failure_cache_time) < self._FAILURE_CACHE_TTL:
            _dbg(f"[http:{self.server_id[:12]}] list_tools (failure cached): {self._failure_cache_err}")
            raise RuntimeError(self._failure_cache_err)

        _dbg(f"[http:{self.server_id[:12]}] list_tools → fastmcp.Client({self.url})")

        async def _do():
            from fastmcp import Client
            try:
                _http_client = self._build_httpx_client(60.0)
                async with Client(self.url, httpx_client=_http_client) as client:
                    return await client.list_tools()
            except (TypeError, Exception) as _e:
                # fastmcp 版本不支持 httpx_client 参数时降级
                if "httpx_client" in str(_e) or "unexpected keyword" in str(_e):
                    async with Client(self.url) as client:
                        return await client.list_tools()
                raise

        try:
            tools = _run_async(_do())
        except Exception as e:
            _dbg(f"[http:{self.server_id[:12]}] list_tools FAILED: {type(e).__name__}: {e}")
            # 缓存失败结果，避免重复等待超时
            self._failure_cache_time = _time.monotonic()
            self._failure_cache_err  = str(e)
            raise

        result = []
        for t in tools:
            result.append({
                "name": getattr(t, "name", "") if not isinstance(t, dict) else t.get("name", ""),
                "description": (getattr(t, "description", "") or "") if not isinstance(t, dict) else (t.get("description", "") or ""),
                "inputSchema": (getattr(t, "inputSchema", {}) or {}) if not isinstance(t, dict) else (t.get("inputSchema", {}) or {}),
            })
        self._tools_cache = result
        self._tools_cache_time = _time.monotonic()
        self._failure_cache_time = 0.0  # 成功后清除失败缓存
        _dbg(f"[http:{self.server_id[:12]}] list_tools OK → {len(result)} tools: {[r['name'] for r in result[:5]]}")
        return result

    def _build_httpx_client(self, timeout: float = 60.0):
        """构建 httpx 异步客户端，根据代理配置决定是否使用代理"""
        try:
            import httpx
            from .network import _proxy_settings, _should_bypass_proxy
            proxy_url = _proxy_settings.get("proxyUrl", "")
            bypass = _should_bypass_proxy(self.url)
            if proxy_url and not bypass:
                return httpx.AsyncClient(
                    trust_env=False, timeout=timeout,
                    proxies={"http://": proxy_url, "https://": proxy_url},
                    verify=False  # 忽略 SSL 证书验证
                )
            return httpx.AsyncClient(trust_env=False, timeout=timeout, verify=False)
        except Exception:
            import httpx
            return httpx.AsyncClient(trust_env=False, timeout=timeout, verify=False)

    def call_tool(self, tool_name: str, arguments: dict, timeout: float = 60.0) -> dict:
        _dbg(f"[http:{self.server_id[:12]}] call_tool '{tool_name}' args={json.dumps(arguments)[:100]}")

        async def _do():
            from fastmcp import Client
            try:
                _http_client = self._build_httpx_client(timeout)
                async with Client(self.url, httpx_client=_http_client) as client:
                    try:
                        return await client.call_tool(tool_name, arguments=arguments)
                    except TypeError:
                        return await client.call_tool(tool_name, **arguments)
            except (TypeError, Exception) as _init_err:
                if "httpx_client" in str(_init_err) or "unexpected keyword" in str(_init_err):
                    async with Client(self.url) as client:
                        try:
                            return await client.call_tool(tool_name, arguments=arguments)
                        except TypeError:
                            return await client.call_tool(tool_name, **arguments)
                raise

        try:
            result = _run_async(_do())
        except Exception as e:
            _dbg(f"[http:{self.server_id[:12]}] call_tool '{tool_name}' FAILED: {type(e).__name__}: {e}")
            raise

        _dbg(f"[http:{self.server_id[:12]}] call_tool '{tool_name}' OK")
        return _format_tool_result(result)


# 单个工具结果的最大文本字符数。超过此限制会被截断并附上说明。
# 防止大型工具结果（如 confluence_get_page 返回完整页面）撑爆 LLM 上下文，
# 导致模型推理时间超过 Cloudflare 100s 超时上限（HTTP 524 错误）。
_MAX_TOOL_RESULT_CHARS = 60_000


def _truncate_text(text: str) -> str:
    """截断单个文本项，超过限制时附上截断说明"""
    if len(text) <= _MAX_TOOL_RESULT_CHARS:
        return text
    notice = (
        f"\n\n[内容已截断：原始长度 {len(text):,} 字符，"
        f"仅保留前 {_MAX_TOOL_RESULT_CHARS:,} 字符。"
        f"如需完整内容，请缩小查询范围或分段获取。]"
    )
    return text[:_MAX_TOOL_RESULT_CHARS] + notice


def _truncate_content(content_list: list) -> list:
    """对工具结果内容列表中所有文本项进行截断"""
    result = []
    for item in content_list:
        if isinstance(item, dict) and item.get("type") == "text":
            truncated = _truncate_text(item.get("text", ""))
            result.append({**item, "text": truncated})
        else:
            result.append(item)
    return result


def _format_tool_result(result) -> dict:
    """将 fastmcp / MCP 工具调用结果转换为 Cherry Studio 格式 {isError, content}"""
    if isinstance(result, dict):
        if "isError" in result:
            if "content" in result:
                result = dict(result)
                result["content"] = _truncate_content(result["content"])
            return result
        if "error" in result:
            return {"isError": True, "content": [{"type": "text", "text": str(result["error"])}]}
        if "content" in result:
            return {"isError": False, "content": _truncate_content(result["content"])}
        return {"isError": False, "content": [{"type": "text", "text": _truncate_text(json.dumps(result, ensure_ascii=False))}]}
    elif isinstance(result, list):
        return {"isError": False, "content": _truncate_content(result)}
    elif hasattr(result, "content"):
        raw_content = result.content
        if isinstance(raw_content, list):
            content_list = []
            for item in raw_content:
                if isinstance(item, dict):
                    content_list.append(item)
                elif hasattr(item, "type") and hasattr(item, "text"):
                    content_list.append({"type": item.type, "text": item.text})
                else:
                    content_list.append({"type": "text", "text": str(item)})
            return {"isError": False, "content": _truncate_content(content_list)}
        return {"isError": False, "content": [{"type": "text", "text": _truncate_text(str(raw_content))}]}
    return {"isError": False, "content": [{"type": "text", "text": _truncate_text(str(result))}]}


def _to_camel_case(s: str) -> str:
    """
    Python 版 toCamelCase — 与前端 @shared/mcp.ts 的 toCamelCase 保持一致。
    非字母数字字符作为单词分隔符，输出纯 ASCII camelCase。
    """
    s = s.strip().lower()
    s = re.sub(r'[^a-z0-9]+(.)', lambda m: m.group(1).upper(), s)
    s = re.sub(r'[^a-zA-Z0-9]', '', s)
    if s and not (s[0].isalpha() or s[0] == '_'):
        s = '_' + s
    return s


def _make_tool_id(tool_name: str, server_name: str, server_id: str) -> str:
    """
    生成 Cherry Studio 兼容的工具 ID — 与前端 buildFunctionCallToolName 一致。
    格式：mcp__{serverName}__{toolName}（camelCase），最长 63 字符。
    """
    server_part = _to_camel_case(server_name) if server_name else ''
    tool_part = _to_camel_case(tool_name)
    if server_part:
        base = f"mcp__{server_part}__{tool_part}"
    else:
        base = f"mcp__{tool_part}"
    if len(base) > 63:
        base = base[:63].rstrip('_')
    return base


def _format_tools_for_cherry(raw_tools: list, server_config: dict) -> list:
    """
    将原始 MCP 工具列表转换为 Cherry Studio 期望的格式：
    [{id, name, description, inputSchema, serverId, serverName, type}]
    """
    server_id   = server_config.get("id") or server_config.get("serverId") or ""
    server_name = server_config.get("name") or server_id or "unknown"
    result = []
    for t in raw_tools:
        if isinstance(t, dict):
            name        = t.get("name", "")
            description = t.get("description", "") or f"Tool '{name}' from MCP server '{server_name}'"
            schema      = t.get("inputSchema", {}) or {}
        else:
            name        = getattr(t, "name", str(t))
            description = getattr(t, "description", "") or f"Tool '{name}' from MCP server '{server_name}'"
            schema      = getattr(t, "inputSchema", {}) or {}

        result.append({
            "id":          _make_tool_id(name, server_name, server_id),
            "name":        name,
            "description": description,
            "inputSchema": schema,
            "serverId":    server_id,
            "serverName":  server_name,
            "type":        "mcp",
        })
    return result


# ─── 工具函数 ─────────────────────────────────────────────────────────────────

def _get_or_start_client(server_config: dict) -> Tuple[Any, Optional[str]]:
    """
    从注册表获取存活的客户端，或根据 server_config 创建并启动新客户端。

    接受 Cherry Studio 的完整 server config 格式：
        { id, type, command, args, env, cwd, url, baseUrl, ... }
    也接受旧格式：
        { serverId }

    返回 (client, error_str)，成功时 error_str=None。
    """
    server_id = (server_config.get("id")
                 or server_config.get("serverId")
                 or "")
    if not server_id:
        return None, "missing server id"

    with _clients_lock:
        existing = _clients.get(server_id)
        if existing and existing.is_alive():
            _dbg(f"_get_or_start_client '{server_id[:16]}' → reuse existing client")
            return existing, None

    server_type = str(server_config.get("type", "stdio")).lower()
    _dbg(f"_get_or_start_client '{server_id[:16]}' type={server_type} → creating new client")
    try:
        if server_type in ("streamablehttp", "sse", "http"):
            url = (server_config.get("url")
                   or server_config.get("baseUrl")
                   or "")
            if not url:
                return None, f"missing url for HTTP server '{server_id}'"
            _dbg(f"  MCPHttpClient url={url}")
            client: Any = MCPHttpClient(server_id, url)
        else:
            command = server_config.get("command", "")
            if not command:
                return None, f"missing command for stdio server '{server_id}'"
            args = server_config.get("args", [])
            env = server_config.get("env", {})
            cwd = server_config.get("cwd")
            _dbg(f"  MCPStdioClient command={command} args={args}")
            client = MCPStdioClient(server_id, command, args, env, cwd)

        client.start()
        with _clients_lock:
            _clients[server_id] = client
        _dbg(f"_get_or_start_client '{server_id[:16]}' → started OK")
        return client, None
    except Exception as e:
        import traceback
        _dbg(f"_get_or_start_client '{server_id[:16]}' FAILED: {type(e).__name__}: {e}\n{traceback.format_exc()}")
        return None, str(e)


# ─── 路由 ──────────────────────────────────────────────────────────────────────

@route("/api/v1/mcp/warmup", methods=["POST"])
def mcp_warmup(ctx: dict) -> Any:
    """手动触发 MCP 服务器预热（前端可在设置变更后调用）"""
    global _warmup_done
    _warmup_done = False
    t = threading.Thread(target=auto_start_active_servers, name="mcp-warmup-manual", daemon=True)
    t.start()
    return {"ok": True, "message": "warmup started in background"}


@route("/api/v1/mcp/start", methods=["POST"])
def mcp_start(ctx: dict) -> Any:
    """
    启动一个 MCP 服务器。

    请求体（stdio 类型）：
        { "id": "my-server", "type": "stdio", "command": "npx",
          "args": ["-y", "@..."], "env": {}, "cwd": null }

    请求体（HTTP 类型）：
        { "id": "my-server", "type": "streamableHttp", "url": "http://..." }
    """
    body = ctx["body"]
    server_id = (body.get("id")
                 or body.get("serverId")
                 or f"mcp-{uuid.uuid4().hex[:8]}")
    body.setdefault("id", server_id)

    client, err = _get_or_start_client(body)
    if err:
        return {"error": err}
    try:
        tools = _format_tools_for_cherry(client.list_tools(), body)
        return {"ok": True, "serverId": server_id, "tools": tools}
    except Exception as e:
        return {"ok": True, "serverId": server_id, "tools": [], "warning": str(e)}


@route("/api/v1/mcp/stop", methods=["POST"])
def mcp_stop(ctx: dict) -> Any:
    server_id = (ctx["body"].get("id")
                 or ctx["body"].get("serverId")
                 or "")
    with _clients_lock:
        client = _clients.pop(server_id, None)
    if client:
        client.stop()
        return {"ok": True}
    return {"error": "server not found"}


@route("/api/v1/mcp/remove", methods=["POST"])
def mcp_remove(ctx: dict) -> Any:
    """停止并从注册表中移除 MCP 服务器（与 stop 相同，兼容前端 removeServer）"""
    return mcp_stop(ctx)


@route("/api/v1/mcp/restart", methods=["POST"])
def mcp_restart(ctx: dict) -> Any:
    """重启 MCP 服务器：先停止，再根据配置重新启动"""
    body = ctx["body"]
    # 先停止
    server_id = body.get("id") or body.get("serverId", "")
    with _clients_lock:
        old = _clients.pop(server_id, None)
    if old:
        old.stop()
    # 重新启动（需要完整 config）
    if "command" not in body and "url" not in body and "baseUrl" not in body:
        return {"error": "restart requires full server config (command/url missing)"}
    client, err = _get_or_start_client(body)
    if err:
        return {"error": err}
    try:
        tools = _format_tools_for_cherry(client.list_tools(), body)
        return {"ok": True, "serverId": server_id, "tools": tools}
    except Exception as e:
        return {"ok": True, "serverId": server_id, "tools": [], "warning": str(e)}


@route("/api/v1/mcp/list", methods=["GET"])
def mcp_list(ctx: dict) -> Any:
    """列出所有运行中的第三方 MCP 服务器"""
    with _clients_lock:
        result = {
            sid: {
                "alive": c.is_alive(),
                "type": "http" if isinstance(c, MCPHttpClient) else "stdio",
                "url": getattr(c, "url", None),
                "command": getattr(c, "command", None),
                "args": getattr(c, "args", None),
            }
            for sid, c in _clients.items()
        }
    return {"servers": result}


@route("/api/v1/mcp/list-tools", methods=["POST"])
def mcp_list_tools(ctx: dict) -> Any:
    """
    列出 MCP 服务器的工具，并格式化为 Cherry Studio 期望的格式。

    接受两种格式：
    1. Cherry Studio 完整 server config：
       { id, type, command/url, args, env, cwd, ... }
    2. 旧格式（仅查找已运行服务器）：
       { serverId }
    """
    body = ctx["body"]
    server_id = body.get("id") or body.get("serverId", "")
    server_name = body.get("name", server_id)
    server_type = body.get("type", "stdio")
    _dbg(f"/mcp/list-tools called: id={server_id!r} name={server_name!r} type={server_type!r}")

    # @cherry/hub：返回核心元工具 + 所有已注册客户端的工具
    # 元工具（discover_tools/call_tool/get_tool_schema/ask_model）用于发现/调用 MCP 工具
    # 直接工具一并返回给前端，但前端仅在用户输入 /工具名 时才将匹配的工具 schema 注入提示词
    # 这样实现"经典模式省 token + 斜杠命令精准注入"的混合策略
    if _is_hub_server(server_id) or server_type in ("hub", "inMemory"):
        hub_config = {"id": server_id or "@cherry/hub", "name": "@cherry/hub"}
        core_tools = list(_HUB_TOOL_DEFINITIONS)
        core_tools.append(_ASK_MODEL_TOOL)
        result = _format_tools_for_cherry(core_tools, hub_config)

        with _clients_lock:
            active_clients = {sid: c for sid, c in _clients.items() if c.is_alive()}
        direct_tool_count = 0
        for client_id, client in active_clients.items():
            try:
                raw_tools = client.list_tools()
                if raw_tools:
                    client_config = {"id": hub_config["id"], "name": client_id}
                    formatted = _format_tools_for_cherry(raw_tools, client_config)
                    result.extend(formatted)
                    direct_tool_count += len(formatted)
            except Exception as e:
                _dbg(f"/mcp/list-tools hub: error collecting from '{client_id}': {e}")

        _dbg(f"/mcp/list-tools '{server_id[:16]}' → hub: "
             f"{len(core_tools)} meta-tools + {direct_tool_count} direct tools")
        return result

    # 其他内置虚拟服务器（in-memory/memory/thinking 等）——返回 []
    _BUILTIN_PREFIXES = ("in-memory", "builtin", "memory", "thinking")
    _sid_lower = server_id.lower()
    if any(_sid_lower.startswith(p) for p in _BUILTIN_PREFIXES) or \
            server_type in ("builtin", "in-memory", "memory"):
        _dbg(f"/mcp/list-tools '{server_id[:16]}' → built-in virtual server, returning []")
        return []

    # 先检查注册表中是否有存活的客户端
    with _clients_lock:
        client = _clients.get(server_id) if server_id else None

    if client and client.is_alive():
        try:
            raw = client.list_tools()
            result = _format_tools_for_cherry(raw, body)
            _dbg(f"/mcp/list-tools '{server_id[:16]}' → {len(result)} tools (from registry)")
            return result
        except Exception as e:
            _dbg(f"/mcp/list-tools '{server_id[:16]}' registry client error: {e}")
            # 进程异常退出时，尝试按当前配置重启并重试一次
            if "process has exited unexpectedly" in str(e):
                client, err = _get_or_start_client(body)
                if err:
                    return {"error": err}
                try:
                    raw = client.list_tools()
                    result = _format_tools_for_cherry(raw, body)
                    _dbg(f"/mcp/list-tools '{server_id[:16]}' → {len(result)} tools (registry restart)")
                    return result
                except Exception as retry_e:
                    _dbg(f"/mcp/list-tools '{server_id[:16]}' retry after restart failed: {retry_e}")
                    return {"error": str(retry_e)}
            return {"error": str(e)}

    # 尝试用完整配置启动（支持 HTTP 和 stdio 类型）
    has_config = ("command" in body or "url" in body or "baseUrl" in body)
    _dbg(f"/mcp/list-tools '{server_id[:16]}' not in registry, has_config={has_config}")
    if has_config:
        client, err = _get_or_start_client(body)
        if err:
            _dbg(f"/mcp/list-tools '{server_id[:16]}' start error: {err}")
            return {"error": err}
        try:
            raw = client.list_tools()
            result = _format_tools_for_cherry(raw, body)
            _dbg(f"/mcp/list-tools '{server_id[:16]}' → {len(result)} tools (just started)")
            return result
        except Exception as e:
            import traceback
            _dbg(f"/mcp/list-tools '{server_id[:16]}' list error: {type(e).__name__}: {e}\n{traceback.format_exc()}")
            # 刚启动后若进程立刻退出，重启一次再试，减少偶发失败
            if "process has exited unexpectedly" in str(e):
                client, err = _get_or_start_client(body)
                if err:
                    return {"error": err}
                try:
                    raw = client.list_tools()
                    result = _format_tools_for_cherry(raw, body)
                    _dbg(f"/mcp/list-tools '{server_id[:16]}' → {len(result)} tools (restarted once)")
                    return result
                except Exception as retry_e:
                    _dbg(f"/mcp/list-tools '{server_id[:16]}' second attempt failed: {retry_e}")
                    return {"error": str(retry_e)}
            return {"error": str(e)}

    _dbg(f"/mcp/list-tools '{server_id[:16]}' → error: server not found / no config")
    return {"error": f"MCP server not found: {server_id}"}


@route("/api/v1/mcp/call", methods=["POST"])
def mcp_call(ctx: dict) -> Any:
    """
    调用 MCP 工具。

    支持两种格式：

    1. Cherry Studio 格式（推荐）：
       { server: { id, type, command/url, ... }, name: "tool_name", args: {...}, callId: "..." }

    2. 旧格式：
       { serverId: "my-server", toolName: "read_file", arguments: {...}, timeout: 60.0 }
    """
    body = ctx["body"]

    if "server" in body and isinstance(body["server"], dict):
        # Cherry Studio 格式
        server_config = body["server"]
        tool_name = body.get("name", "")
        arguments = body.get("args") or {}
        timeout = float(body.get("timeout", 60.0))
    else:
        # 旧格式
        server_id = body.get("serverId", "")
        server_config = {"id": server_id}
        tool_name = body.get("toolName", "") or body.get("name", "")
        arguments = body.get("arguments") or body.get("args") or {}
        timeout = float(body.get("timeout", 60.0))

    if not tool_name:
        return {"error": "missing tool name"}

    # 获取或启动客户端
    server_id = server_config.get("id") or server_config.get("serverId", "")
    _dbg(f"/mcp/call tool={tool_name!r} server={server_id[:16]!r}")

    # @cherry/hub：执行 hub 内置工具（search / exec）
    if _is_hub_server(server_id) or server_config.get("type") in ("hub", "inMemory"):
        _dbg(f"/mcp/call hub tool={tool_name!r} args={json.dumps(arguments)[:80]}")
        if tool_name in ("discover_tools", "search"):
            q     = arguments.get("query", "")
            limit = int(arguments.get("limit", 10))
            return _hub_search(q, limit)
        elif tool_name == "exec":
            code = arguments.get("code", "")
            if code:
                return _hub_exec(code)
            # 模型可能直接传入工具参数而非 code 字符串（如 invoke/call 别名场景）
            return _hub_exec_from_args(arguments)
        elif tool_name in ("parallel", "settle"):
            # parallel/settle：把 calls 列表依次 exec 并汇总结果
            calls_list = arguments.get("calls", [])
            if not calls_list:
                return {"isError": True, "content": [{"type": "text", "text": f"'{tool_name}' requires a non-empty 'calls' list"}]}
            parts = []
            for call_code in calls_list:
                r = _hub_exec(str(call_code))
                content = r.get("content", [])
                parts.append(content[0].get("text", str(r)) if content else str(r))
            return {"isError": False, "content": [{"type": "text", "text": "\n\n---\n\n".join(parts)}]}
        elif tool_name == "get_tool_schema":
            return _get_tool_schema(arguments.get("tool_name", ""))
        elif tool_name == "call_tool":
            inner_name = arguments.get("tool_name", "")
            inner_args = arguments.get("arguments", {})
            if inner_name == "ask_model":
                return _ask_model(inner_args)
            return _call_tool(inner_name, inner_args)
        elif tool_name == "ask_model":
            return _ask_model(arguments)
        elif tool_name in ("inspect", "inspect_tool", "tool_info", "describe",
                           "get_schema", "tool_schema", "tool_details"):
            # 常见的幻觉工具名 → 自动纠正为 get_tool_schema
            actual_name = arguments.get("tool_name") or arguments.get("name") or ""
            if actual_name:
                return _get_tool_schema(actual_name)
            return {
                "isError": False,
                "content": [{"type": "text", "text":
                    "You called '" + tool_name + "' — the correct tool is get_tool_schema.\n"
                    "Usage: get_tool_schema({\"tool_name\": \"<name>\"})\n\n"
                    "Available meta-tools: search, get_tool_schema, call_tool, ask_model"}]
            }
        else:
            direct_result = _hub_direct_call(tool_name, arguments)
            if direct_result is not None:
                return direct_result
            result = _call_tool(tool_name, arguments)
            if result.get("isError"):
                result["content"] = [{"type": "text", "text":
                    f"Tool '{tool_name}' not found.\n\n"
                    "Available meta-tools you CAN call directly:\n"
                    "• search({query}) — discover tools\n"
                    "• get_tool_schema({tool_name}) — see tool parameters\n"
                    "• call_tool({tool_name, arguments}) — execute any tool\n"
                    "• ask_model({model_id, prompt}) — delegate to another AI model\n\n"
                    "Use search to find the tool you need, then call_tool to execute it."}]
            return result

    # 其他内置虚拟服务器（in-memory/memory/thinking 等）——不支持，返回错误
    _sid_lower = server_id.lower()
    _BUILTIN_PREFIXES_CALL = ("in-memory", "builtin", "memory", "thinking")
    if any(_sid_lower.startswith(p) for p in _BUILTIN_PREFIXES_CALL) or \
            _sid_lower in ("in-memory", "memory", "thinking"):
        return {
            "isError": True,
            "content": [{"type": "text", "text": (
                f"Tool '{tool_name}' is not available: '{server_id}' is a "
                "Cherry Studio built-in server that cannot be executed in the Qt runtime."
            )}]
        }
    with _clients_lock:
        client = _clients.get(server_id) if server_id else None

    if not client or not client.is_alive():
        client, err = _get_or_start_client(server_config)
        if err:
            _dbg(f"/mcp/call '{server_id[:16]}' start error: {err}")
            return {"error": err}

    try:
        result = client.call_tool(tool_name, arguments, timeout)
        # 确保结果已经是 {isError, content} 格式（stdio 客户端已处理，HTTP 也已处理）
        if isinstance(result, dict) and "isError" not in result and "error" not in result:
            return _format_tool_result(result)
        return result
    except Exception as e:
        import traceback
        _dbg(f"/mcp/call tool={tool_name!r} FAILED: {type(e).__name__}: {e}\n{traceback.format_exc()}")
        return {"isError": True, "content": [{"type": "text", "text": str(e)}]}


@route("/api/v1/mcp/check-connectivity", methods=["POST"])
def mcp_check_connectivity(ctx: dict) -> Any:
    """
    检查 MCP 服务器的连通性。
    对于 HTTP 类型，尝试建立连接；对于 stdio 类型，检查进程是否存活。
    """
    body = ctx["body"]
    server_id = body.get("id") or body.get("serverId", "")
    _dbg(f"/mcp/check-connectivity id={server_id!r} type={body.get('type','?')!r}")

    with _clients_lock:
        client = _clients.get(server_id) if server_id else None

    if client and client.is_alive():
        return {"ok": True, "status": "running"}

    # 尝试启动（快速连接测试）
    has_config = ("command" in body or "url" in body or "baseUrl" in body)
    if has_config:
        client, err = _get_or_start_client(body)
        if err:
            return {"ok": False, "error": err}
        return {"ok": True, "status": "started"}

    return {"ok": False, "error": f"server not found: {server_id}"}


@route("/api/v1/mcp/call-dcc", methods=["POST"])
def mcp_call_dcc(ctx: dict) -> Any:
    """
    通过 session 注册表，调用特定 DCC 实例的 MCP 工具。

    sessionId 来源优先级：
        1. HTTP 头 X-Session-Id（ctx["session_id"]）
        2. 请求体 body.sessionId（向后兼容）

    请求体:
        {
            "sessionId": "uuid-xxx",   // 目标 DCC 实例（可选，优先用 HTTP 头）
            "toolName":  "houdini_create_node",
            "arguments": { "parentPath": "/obj", "nodeType": "geo" }
        }
    """
    body = ctx["body"]
    session_id = ctx.get("session_id", "") or body.get("sessionId", "")
    tool_name = body.get("toolName", "") or body.get("name", "")
    arguments = body.get("arguments") or body.get("args") or {}
    timeout = float(body.get("timeout", 30.0))

    # 从后端的 session 注册表中找到对应的 DCC MCP 端口
    server = ctx.get("server")
    if not server:
        return {"error": "server context unavailable"}

    session_info = server.get_session(session_id)
    if not session_info:
        return {"error": f"DCC session not found: {session_id}"}

    mcp_port = session_info.get("mcp_port", 0)
    if not mcp_port:
        return {"error": f"DCC session has no MCP port: {session_id}"}

    # 向 DCC 的 HoudiniMCPServer 发送工具调用请求
    payload = json.dumps({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {"name": tool_name, "arguments": arguments},
    }).encode("utf-8")

    try:
        req = urllib.request.Request(
            f"http://127.0.0.1:{mcp_port}",
            data=payload,
            method="POST",
        )
        req.add_header("Content-Type", "application/json")
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            return result.get("result", result)
    except urllib.error.URLError as e:
        _log(f"[mcp/call-dcc] Cannot reach DCC MCP on port {mcp_port}: {e}")
        return {"error": f"Cannot reach DCC: {e}"}
    except Exception as e:
        _log(f"[mcp/call-dcc] {e}")
        return {"error": str(e)}


@route("/api/v1/mcp/list-dcc-tools", methods=["GET", "POST"])
def mcp_list_dcc_tools(ctx: dict) -> Any:
    """
    列出指定 DCC 实例上可用的 MCP 工具。

    sessionId 来源优先级：
        1. HTTP 头 X-Session-Id
        2. query 参数 ?sessionId=xxx
        3. 请求体 body.sessionId
    """
    body = ctx.get("body") or {}
    query = ctx.get("query") or {}
    session_id = (
        ctx.get("session_id", "")
        or (query.get("sessionId", [""])[0] if isinstance(query.get("sessionId"), list) else query.get("sessionId", ""))
        or body.get("sessionId", "")
    )
    timeout = float(body.get("timeout", 10.0))

    server = ctx.get("server")
    if not server:
        return {"error": "server context unavailable"}

    if not session_id:
        return {"error": "missing sessionId (use X-Session-Id header or ?sessionId= query)"}

    session_info = server.get_session(session_id)
    if not session_info:
        return {"error": f"DCC session not found: {session_id}"}

    mcp_port = session_info.get("mcp_port", 0)
    if not mcp_port:
        return {"error": f"DCC session has no MCP port: {session_id}"}

    payload = json.dumps({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/list",
        "params": {},
    }).encode("utf-8")

    try:
        req = urllib.request.Request(
            f"http://127.0.0.1:{mcp_port}",
            data=payload,
            method="POST",
        )
        req.add_header("Content-Type", "application/json")
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            tools = result.get("result", result).get("tools", [])
            return {
                "ok": True,
                "sessionId": session_id,
                "dccType": session_info.get("dcc_type", "unknown"),
                "tools": tools,
            }
    except urllib.error.URLError as e:
        _log(f"[mcp/list-dcc-tools] Cannot reach DCC MCP on port {mcp_port}: {e}")
        return {"error": f"Cannot reach DCC: {e}"}
    except Exception as e:
        _log(f"[mcp/list-dcc-tools] {e}")
        return {"error": str(e)}


# ─── 补充存根路由 ──────────────────────────────────────────────────────────────

@route("/api/v1/mcp/status", methods=["POST"])
def mcp_server_status(ctx: dict) -> Any:
    """查询 MCP 服务器运行状态"""
    body = ctx["body"]
    server_id = body.get("id") or body.get("serverId", "")
    with _clients_lock:
        client = _clients.get(server_id)
    if client and client.is_alive():
        pid = getattr(getattr(client, "process", None), "pid", None)
        return {"running": True, "pid": pid}
    return {"running": False, "pid": None}


@route("/api/v1/mcp/list-prompts", methods=["POST"])
def mcp_list_prompts(ctx: dict) -> Any:
    """列出 MCP 服务器的 prompts（当前返回空列表）"""
    return []


@route("/api/v1/mcp/list-resources", methods=["POST"])
def mcp_list_resources(ctx: dict) -> Any:
    """列出 MCP 服务器的 resources（当前返回空列表）"""
    return []
