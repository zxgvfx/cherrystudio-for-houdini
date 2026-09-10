"""
Cherry Studio Backend HTTP Server

基于标准库实现，无需 FastAPI/uvicorn 等额外依赖。
提供 RESTful API 供 QWebChannel 薄代理层调用，也支持前端直连。

关键设计：
  - ThreadingHTTPServer：每个请求在独立线程处理，避免慢请求阻塞后续请求
  - ConnectionAbortedError / BrokenPipeError 静默忽略（客户端主动断开是正常行为）
"""

import json
import mimetypes
import os
import threading
import traceback
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
from urllib.parse import urlparse, parse_qs, unquote
from typing import Callable, Dict, Any, Optional

from ..utils.client_disconnect import DisconnectQuietHandlerMixIn, DisconnectQuietMixIn
from ..utils.logger import network_logger

_log = network_logger

# 客户端断开连接时会抛出这些异常，属于正常现象，不打印 traceback
_CONNECTION_ERRORS = (
    ConnectionAbortedError,   # WinError 10053 / 10054
    ConnectionResetError,     # 对端重置连接
    BrokenPipeError,          # Linux/macOS 对端断开
    OSError,                  # 兜底（某些平台用 OSError 包装）
)


def _pid_alive(pid: int) -> bool:
    if not pid:
        return False
    if os.name == "nt":
        try:
            import ctypes
            PROCESS_QUERY_LIMITED_INFORMATION = 0x1000
            handle = ctypes.windll.kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, False, int(pid))
            if handle:
                ctypes.windll.kernel32.CloseHandle(handle)
                return True
            return False
        except Exception:
            return True
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False


# ─── 路由注册表 ────────────────────────────────────────────────────────────────

_routes: Dict[str, Dict[str, Callable]] = {}  # {path: {method: handler}}
_prefix_routes: Dict[str, Dict[str, Callable]] = {}  # {prefix: {method: handler}}

STREAMING_HANDLED = object()


def route(path: str, methods=("GET", "POST")):
    """路由装饰器，将函数注册为指定路径的处理器"""
    def decorator(fn):
        for method in methods:
            _routes.setdefault(path, {})[method.upper()] = fn
        return fn
    return decorator


def prefix_route(prefix: str, methods=("GET", "POST")):
    """前缀路由装饰器，匹配以 prefix 开头的所有路径"""
    def decorator(fn):
        for method in methods:
            _prefix_routes.setdefault(prefix, {})[method.upper()] = fn
        return fn
    return decorator


def _import_routes():
    """延迟导入所有路由模块（避免循环导入）"""
    import importlib

    from . import routes  # noqa: F401
    from .routes import (  # noqa: F401
        network,
        files,
        topics,
        config as config_route,
        newapi_cost,
        knowledge_base,
        agent,
        mcp,
        dcc,
        memory,
        models,
        qt_bridge,
        selection,
        chat,
        openclaw,
        plugins,
        generate_3d,
        generate_motion,
        generate_video,
        headless_events,
    )

    # Houdini keeps sys.modules across Cherry window restarts. Reload files.py
    # so paste-sandbox fixes apply without a full DCC relaunch.
    importlib.reload(files)

    from ..plugins import load_all_plugins
    load_all_plugins()


# ─── 请求处理器 ────────────────────────────────────────────────────────────────

class _Handler(DisconnectQuietHandlerMixIn, BaseHTTPRequestHandler):
    """通用请求处理器，将所有请求分发到已注册的路由"""

    server_instance: "BackendHTTPServer" = None

    # 屏蔽每次请求的访问日志（减少噪音），保留错误日志
    def log_message(self, fmt, *args):
        pass

    def log_error(self, fmt, *args):
        msg = fmt % args
        # 屏蔽客户端断开连接的噪音日志
        if any(kw in msg for kw in ("10053", "10054", "Broken pipe", "ConnectionAborted",
                                     "ConnectionReset", "forcibly closed")):
            return
        _log(f"[BackendServer] {msg}")

    def _send_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Session-Id")

    def do_OPTIONS(self):
        try:
            self.send_response(200)
            self._send_cors()
            self.send_header("Content-Length", "0")
            self.end_headers()
        except _CONNECTION_ERRORS:
            pass

    def _dispatch(self, method: str):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        # 调试：打印 MCP 相关请求
        if "/api/v1/mcp" in path:
            _log(f"[BackendServer] Dispatching MCP request: {method} {path}")

        # 静态文件：非 /api/ 且非前缀路由路径的 GET 请求尝试从 static_dir 提供
        is_prefix_route = any(
            path == pfx or path.startswith(pfx + "/")
            for pfx in _prefix_routes
        )
        if method == "GET" and not path.startswith("/api/") and not is_prefix_route and self.server_instance:
            static_dir = self.server_instance.static_dir
            if static_dir:
                if self._try_serve_static(static_dir, path):
                    return

        # 读取请求体
        body = {}
        raw_bytes = None
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length > 0:
                raw_bytes = self.rfile.read(content_length)
                # 二进制上传（如 /files/write-binary）只从 _raw_bytes 取值。跳过
                # 解码，否则一个视频体积的 errors="replace" 字符串会白占几倍内存。
                content_type = (self.headers.get("Content-Type") or "").split(";")[0].strip().lower()
                if content_type != "application/octet-stream":
                    try:
                        body = json.loads(raw_bytes.decode("utf-8"))
                    except Exception:
                        body = {"_raw": raw_bytes.decode("utf-8", errors="replace")}
        except _CONNECTION_ERRORS:
            return  # 读请求体时断开，直接放弃

        ctx = {
            "method": method,
            "path": path,
            "query": query,
            "body": body,
            "_raw_bytes": raw_bytes,
            "headers": dict(self.headers),
            "session_id": self.headers.get("X-Session-Id", ""),
            "server": self.server_instance,
            "_handler": self,
        }

        handler = _routes.get(path, {}).get(method)

        # 前缀路由匹配（用于反向代理等场景）
        if handler is None:
            for pfx, methods_map in _prefix_routes.items():
                if path == pfx or path.startswith(pfx + "/") or path.startswith(pfx + "?"):
                    handler = methods_map.get(method)
                    if handler:
                        ctx["prefix"] = pfx
                        ctx["sub_path"] = path[len(pfx):]
                        break

        if handler is None:
            self._safe_json_response(404, {"error": f"Not found: {method} {path}"})
            return

        try:
            result = handler(ctx)
            if result is STREAMING_HANDLED:
                return
            if result is None:
                result = {"ok": True}
            self._safe_json_response(200, result)
        except _CONNECTION_ERRORS:
            # 处理中客户端断开，静默忽略
            pass
        except Exception as e:
            _log(f"[BackendServer] Handler error [{method} {path}]: {e}\n{traceback.format_exc()}")
            self._safe_json_response(500, {"error": str(e)})

    def _try_serve_static(self, static_dir: str, url_path: str) -> bool:
        """尝试从 static_dir 提供静态文件。返回 True 表示已处理。"""
        try:
            # "/" -> "/index.html"
            if url_path == "/" or url_path == "":
                url_path = "/index.html"

            rel = unquote(url_path).lstrip("/")
            file_path = os.path.normpath(os.path.join(static_dir, rel))

            # 安全检查：防止路径穿越
            if not file_path.startswith(os.path.normpath(static_dir)):
                return False

            if not os.path.isfile(file_path):
                return False

            mime_type, _ = mimetypes.guess_type(file_path)
            if mime_type is None:
                mime_type = "application/octet-stream"

            with open(file_path, "rb") as f:
                data = f.read()

            self.send_response(200)
            self._send_cors()
            self.send_header("Content-Type", mime_type)
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "public, max-age=3600")
            self.end_headers()
            self.wfile.write(data)
            self.wfile.flush()
            return True

        except _CONNECTION_ERRORS:
            return True  # 客户端断开，视为已处理
        except Exception as e:
            _log(f"[BackendServer] Static file error: {e}")
            return False

    def do_GET(self):
        self._dispatch("GET")

    def do_POST(self):
        self._dispatch("POST")

    def do_PUT(self):
        self._dispatch("PUT")

    def do_DELETE(self):
        self._dispatch("DELETE")

    def _safe_json_response(self, status: int, data: Any):
        """发送 JSON 响应，客户端已断开时静默忽略"""
        try:
            body = json.dumps(data, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self._send_cors()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            self.wfile.flush()
        except _CONNECTION_ERRORS:
            pass  # 客户端已断开，正常现象
        except Exception as e:
            _log(f"[BackendServer] Response write error: {e}")


# ─── 多线程 HTTP Server ─────────────────────────────────────────────────────────

class _ThreadingHTTPServer(DisconnectQuietMixIn, ThreadingMixIn, HTTPServer):
    """
    多线程 HTTP Server。
    每个请求在独立线程中处理：
      - 慢请求（搜索、AI 推理）不会阻塞其他请求
      - 客户端超时断开后线程自动清理
    """
    daemon_threads = True          # 主进程退出时自动结束所有请求线程
    allow_reuse_address = True     # 快速重启时不等待 TIME_WAIT


class BackendHTTPServer:
    """后端 HTTP 服务器，运行在独立线程中"""

    def __init__(self, host: str = "127.0.0.1", port: int = 0):
        self.host = host
        self.port = port
        self.static_dir: Optional[str] = None
        self._server: _ThreadingHTTPServer | None = None
        self._thread: threading.Thread | None = None
        self._started = threading.Event()
        self._session_registry: Dict[str, Dict] = {}

    def register_session(self, session_id: str, info: Dict):
        import time as _time
        payload = dict(info or {})
        payload.setdefault("registered_at", _time.time())
        payload["last_heartbeat"] = _time.time()
        self._session_registry[session_id] = payload
        _log(f"[BackendServer] Session registered: {session_id} -> {payload}")

    def unregister_session(self, session_id: str) -> bool:
        existed = session_id in self._session_registry
        self._session_registry.pop(session_id, None)
        if existed:
            _log(f"[BackendServer] Session unregistered: {session_id}")
        return existed

    def heartbeat_session(self, session_id: str, extra: Optional[Dict] = None) -> bool:
        import time as _time
        info = self._session_registry.get(session_id)
        if not info:
            return False
        info["last_heartbeat"] = _time.time()
        if extra:
            info.update(extra)
        return True

    def get_session(self, session_id: str) -> Dict:
        self.prune_dead_sessions()
        return self._session_registry.get(session_id, {})

    def get_all_sessions(self) -> Dict:
        self.prune_dead_sessions()
        return dict(self._session_registry)

    def prune_dead_sessions(self) -> None:
        dead = []
        for sid, info in list(self._session_registry.items()):
            pid = info.get("pid")
            if pid and not _pid_alive(int(pid)):
                dead.append(sid)
        for sid in dead:
            self._session_registry.pop(sid, None)
            _log(f"[BackendServer] Pruned dead DCC session {sid}")

    def start(self) -> int:
        """启动服务器（非阻塞），返回实际监听的端口号"""
        _import_routes()

        class _H(_Handler):
            pass
        _H.server_instance = self

        self._server = _ThreadingHTTPServer((self.host, self.port), _H)
        self.port = self._server.server_address[1]

        self._thread = threading.Thread(
            target=self._serve,
            name="CherryBackendServer",
            daemon=True,
        )
        self._thread.start()
        self._started.wait(timeout=5)
        _log(f"[BackendServer] Listening on http://{self.host}:{self.port} (threaded)")

        # 后台预热活跃的 MCP 服务器，使 hub search 首次调用时已有缓存
        try:
            _log("[BackendServer] Importing auto_start_active_servers...")
            from .routes.mcp import auto_start_active_servers
            _log("[BackendServer] Launching MCP warmup thread...")
            warmup_thread = threading.Thread(
                target=auto_start_active_servers,
                name="mcp-warmup",
                daemon=True,
            )
            warmup_thread.start()
            _log(f"[BackendServer] MCP warmup thread started (tid={warmup_thread.ident})")
        except Exception as e:
            import traceback
            _log(f"[BackendServer] MCP warmup failed to start: {e}\n{traceback.format_exc()}")

        return self.port

    def _serve(self):
        self._started.set()
        self._server.serve_forever()

    def stop(self):
        if self._server:
            self._server.shutdown()
            _log("[BackendServer] Stopped")

    def is_running(self) -> bool:
        return self._thread is not None and self._thread.is_alive()

    def get_base_url(self) -> str:
        return f"http://{self.host}:{self.port}"
