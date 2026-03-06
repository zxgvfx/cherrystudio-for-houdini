"""
Cherry Studio Backend HTTP Server

基于标准库实现，无需 FastAPI/uvicorn 等额外依赖。
提供 RESTful API 供 QWebChannel 薄代理层调用，也支持前端直连。

关键设计：
  - ThreadingHTTPServer：每个请求在独立线程处理，避免慢请求阻塞后续请求
  - ConnectionAbortedError / BrokenPipeError 静默忽略（客户端主动断开是正常行为）
"""

import json
import threading
import traceback
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
from urllib.parse import urlparse, parse_qs
from typing import Callable, Dict, Any

from ..utils.logger import network_logger

_log = network_logger

# 客户端断开连接时会抛出这些异常，属于正常现象，不打印 traceback
_CONNECTION_ERRORS = (
    ConnectionAbortedError,   # WinError 10053 / 10054
    ConnectionResetError,     # 对端重置连接
    BrokenPipeError,          # Linux/macOS 对端断开
    OSError,                  # 兜底（某些平台用 OSError 包装）
)


# ─── 路由注册表 ────────────────────────────────────────────────────────────────

_routes: Dict[str, Dict[str, Callable]] = {}  # {path: {method: handler}}


def route(path: str, methods=("GET", "POST")):
    """路由装饰器，将函数注册为指定路径的处理器"""
    def decorator(fn):
        for method in methods:
            _routes.setdefault(path, {})[method.upper()] = fn
        return fn
    return decorator


def _import_routes():
    """延迟导入所有路由模块（避免循环导入）"""
    from . import routes  # noqa: F401
    from .routes import (  # noqa: F401
        network,
        files,
        topics,
        config as config_route,
        knowledge_base,
        agent,
        mcp,
        memory,
        models,
        qt_bridge,
    )


# ─── 请求处理器 ────────────────────────────────────────────────────────────────

class _Handler(BaseHTTPRequestHandler):
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

        # 读取请求体
        body = {}
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length > 0:
                raw = self.rfile.read(content_length)
                try:
                    body = json.loads(raw.decode("utf-8"))
                except Exception:
                    body = {"_raw": raw.decode("utf-8", errors="replace")}
        except _CONNECTION_ERRORS:
            return  # 读请求体时断开，直接放弃

        ctx = {
            "method": method,
            "path": path,
            "query": query,
            "body": body,
            "headers": dict(self.headers),
            "session_id": self.headers.get("X-Session-Id", ""),
            "server": self.server_instance,
        }

        handler = _routes.get(path, {}).get(method)
        if handler is None:
            self._safe_json_response(404, {"error": f"Not found: {method} {path}"})
            return

        try:
            result = handler(ctx)
            if result is None:
                result = {"ok": True}
            self._safe_json_response(200, result)
        except _CONNECTION_ERRORS:
            # 处理中客户端断开，静默忽略
            pass
        except Exception as e:
            _log(f"[BackendServer] Handler error [{method} {path}]: {e}\n{traceback.format_exc()}")
            self._safe_json_response(500, {"error": str(e)})

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

class _ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
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
        self._server: _ThreadingHTTPServer | None = None
        self._thread: threading.Thread | None = None
        self._started = threading.Event()
        self._session_registry: Dict[str, Dict] = {}

    def register_session(self, session_id: str, info: Dict):
        self._session_registry[session_id] = info
        _log(f"[BackendServer] Session registered: {session_id} -> {info}")

    def get_session(self, session_id: str) -> Dict:
        return self._session_registry.get(session_id, {})

    def get_all_sessions(self) -> Dict:
        return dict(self._session_registry)

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
