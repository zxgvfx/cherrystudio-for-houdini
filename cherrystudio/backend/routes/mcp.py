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
from ...utils.logger import network_logger

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


# ─── @cherry/hub 内置虚拟服务器实现 ──────────────────────────────────────────
# Cherry Studio 的"自动"模式依赖 @cherry/hub 提供 search 和 exec 两个元工具，
# 模型先用 search 发现可用工具，再用 exec 调用它们。
# 原实现在单进程 cherry_studio_api.py 中，重构后后端需独立实现相同逻辑。

_HUB_TOOL_DEFINITIONS = [
    {
        "name": "search",
        "description": (
            "Search all available MCP tools by keyword. "
            "Use this to discover what functions/tools are available before calling them via exec. "
            "Returns JavaScript function signatures you can call with exec."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Keywords to find relevant tools (comma-separated for multiple terms)"
                },
                "limit": {
                    "type": "number",
                    "description": "Maximum number of results to return (default: 10, max: 50)"
                }
            },
            "required": ["query"]
        }
    },
    {
        "name": "exec",
        "description": (
            "Execute one or more MCP tool calls. "
            "Use search first to discover tool function names, then call them with: "
            "await ToolFunctionName({param: value})"
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "string",
                    "description": (
                        "JavaScript-like code containing await calls. "
                        "Example: await confluenceSearch({query: 'hello', limit: 5})"
                    )
                }
            },
            "required": ["code"]
        }
    }
]


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
        active = {sid: c for sid, c in _clients.items() if c.is_alive()}

    all_tools: list = []
    for server_id, client in active.items():
        try:
            raw_tools = client.list_tools()   # 使用缓存，非阻塞
            for t in (raw_tools or []):
                all_tools.append({
                    "name":       t.get("name", ""),
                    "description": t.get("description", ""),
                    "inputSchema": t.get("inputSchema", {}),
                    "serverId":   server_id,
                    "funcName":   _make_hub_func_name(server_id, t.get("name", "")),
                })
        except Exception:
            pass  # 不影响其他服务器的结果

    # 按关键词过滤
    keywords = [k.strip().lower() for k in re.split(r'[,\s]+', query) if k.strip()]
    if keywords:
        matched = []
        for t in all_tools:
            text = f"{t['funcName']} {t['name']} {t['description']} {t['serverId']}".lower()
            if any(kw in text for kw in keywords):
                matched.append(t)
                if len(matched) >= limit:
                    break
    else:
        matched = all_tools[:limit]

    if not matched:
        return {
            "isError": False,
            "content": [{"type": "text", "text": json.dumps({
                "total": 0,
                "tools": (
                    "No matching tools found. "
                    "Try a broader query, or ensure MCP servers are configured and active."
                )
            }, indent=2)}]
        }

    # 生成函数签名（供模型在 exec 中调用）
    sigs = []
    for t in matched:
        schema = t["inputSchema"] or {}
        props  = schema.get("properties", {})
        req    = schema.get("required", [])
        params = [
            f"{p}{'?' if p not in req else ''}: {info.get('type', 'any')}"
            for p, info in props.items()
        ]
        desc = (t["description"] or f"Tool from {t['serverId']}")[:150]
        sig = (
            f"/**\n * {desc}\n"
            f" * @server {t['serverId']}\n"
            f" */\n"
            f"async function {t['funcName']}({{{', '.join(params)}}}): Promise<any>"
        )
        sigs.append(sig)

    return {
        "isError": False,
        "content": [{"type": "text", "text": json.dumps({
            "total": len(matched),
            "tools": "\n\n".join(sigs)
        }, indent=2)}]
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
                "No valid tool calls found in code. "
                "Use format: await ToolFunctionName({param: value})"
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
        _dbg(f"[stdio:{self.server_id[:12]}] Starting subprocess: {command} {args}")
        self.process = subprocess.Popen(
            [command] + args,
            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
            env=env, cwd=self.cwd, bufsize=0, text=False, shell=use_shell,
        )
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
                    proxies={"http://": proxy_url, "https://": proxy_url}
                )
            return httpx.AsyncClient(trust_env=False, timeout=timeout)
        except Exception:
            import httpx
            return httpx.AsyncClient(trust_env=False, timeout=timeout)

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

    # @cherry/hub：返回真实的 hub 工具定义（search + exec），供模型发现并调用
    if _is_hub_server(server_id) or server_type in ("hub", "inMemory"):
        _dbg(f"/mcp/list-tools '{server_id[:16]}' → hub server, returning hub tool definitions")
        hub_config = {"id": server_id or "@cherry/hub", "name": "@cherry/hub"}
        return _format_tools_for_cherry(_HUB_TOOL_DEFINITIONS, hub_config)

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
        if tool_name == "search":
            q     = arguments.get("query", "")
            limit = int(arguments.get("limit", 10))
            return _hub_search(q, limit)
        elif tool_name == "exec":
            return _hub_exec(arguments.get("code", ""))
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
        else:
            return {"isError": True, "content": [{"type": "text", "text": f"Unknown hub tool: '{tool_name}'"}]}

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

    请求体:
        {
            "sessionId": "uuid-xxx",   // 目标 DCC 实例
            "toolName":  "houdini_create_node",
            "arguments": { "parentPath": "/obj", "nodeType": "geo" }
        }
    """
    body = ctx["body"]
    session_id = body.get("sessionId", "")
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
