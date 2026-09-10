"""Panel-process local HTTP: Qt invoke + static ``public/`` / renderer files.

The shared Cherry backend cannot hold this process's ``CherryStudioAPI``, so
``window.qt.api`` must POST here (``window.__CHERRY_QT_BRIDGE_URL``), not to
the backend.
"""

from __future__ import annotations

import json
import mimetypes
import os
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
from typing import Any, Callable, Optional
from urllib.parse import unquote, urlparse

from ..utils.logger import network_logger as _log
from ..utils.client_disconnect import DisconnectQuietHandlerMixIn, DisconnectQuietMixIn

_CONNECTION_ERRORS = (ConnectionAbortedError, ConnectionResetError, BrokenPipeError, OSError)


class _ThreadingHTTPServer(DisconnectQuietMixIn, ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


class QtBridgeServer:
    def __init__(self, static_dir: str = "", host: str = "127.0.0.1", port: int = 0) -> None:
        self.host = host
        self.port = port
        self.static_dir = static_dir
        self._server: Optional[_ThreadingHTTPServer] = None
        self._thread: Optional[threading.Thread] = None
        self._control: dict[str, Callable[[], Any]] = {}

    def set_control(self, name: str, fn: Callable[[], Any]) -> None:
        self._control[name] = fn

    def start(self) -> str:
        handler_self = self

        class _H(DisconnectQuietHandlerMixIn, BaseHTTPRequestHandler):
            def log_message(self, fmt, *args):  # noqa: ARG002
                return

            def _cors(self) -> None:
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
                self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Session-Id")

            def _json(self, status: int, data: Any) -> None:
                try:
                    body = json.dumps(data, ensure_ascii=False).encode("utf-8")
                    self.send_response(status)
                    self._cors()
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.send_header("Content-Length", str(len(body)))
                    self.end_headers()
                    self.wfile.write(body)
                except _CONNECTION_ERRORS:
                    pass

            def do_OPTIONS(self) -> None:  # noqa: N802
                self.send_response(204)
                self._cors()
                self.end_headers()

            def do_POST(self) -> None:  # noqa: N802
                parsed = urlparse(self.path)
                length = int(self.headers.get("Content-Length", 0) or 0)
                raw = self.rfile.read(length) if length else b""
                try:
                    body = json.loads(raw.decode("utf-8") or "{}") if raw else {}
                except Exception:  # noqa: BLE001
                    body = {}
                if parsed.path == "/api/v1/qt/invoke":
                    from .routes.qt_bridge import qt_invoke
                    ctx = {
                        "body": body,
                        "session_id": self.headers.get("X-Session-Id", ""),
                        "headers": dict(self.headers),
                    }
                    self._json(200, qt_invoke(ctx))
                    return
                if parsed.path.startswith("/control/"):
                    self._dispatch_control(parsed.path)
                    return
                self._json(404, {"error": "Not found"})

            def do_GET(self) -> None:  # noqa: N802
                parsed = urlparse(self.path)
                if parsed.path in ("/health", "/api/v1/health"):
                    self._json(200, {"ok": True})
                    return
                if parsed.path.startswith("/control/"):
                    self._dispatch_control(parsed.path)
                    return
                static_dir = handler_self.static_dir
                if static_dir and self._try_static(static_dir, parsed.path):
                    return
                self._json(404, {"error": "Not found: %s" % parsed.path})

            def _dispatch_control(self, path: str) -> None:
                action = path.rsplit("/", 1)[-1]
                fn = handler_self._control.get(action)
                if fn is None:
                    self._json(404, {"error": "unknown control action"})
                    return
                try:
                    self._json(200, fn() or {"ok": True})
                except Exception as exc:  # noqa: BLE001
                    self._json(500, {"error": str(exc)})

            def _try_static(self, static_dir: str, url_path: str) -> bool:
                if url_path in ("/", ""):
                    url_path = "/index.html"
                rel = unquote(url_path).lstrip("/")
                file_path = os.path.normpath(os.path.join(static_dir, rel))
                if not file_path.startswith(os.path.normpath(static_dir)):
                    return False
                if not os.path.isfile(file_path):
                    return False
                mime_type, _ = mimetypes.guess_type(file_path)
                try:
                    with open(file_path, "rb") as fh:
                        data = fh.read()
                    self.send_response(200)
                    self._cors()
                    self.send_header("Content-Type", mime_type or "application/octet-stream")
                    self.send_header("Content-Length", str(len(data)))
                    self.send_header("Cache-Control", "no-store")
                    self.end_headers()
                    self.wfile.write(data)
                    return True
                except _CONNECTION_ERRORS:
                    return True
                except Exception as exc:  # noqa: BLE001
                    _log("[qt-bridge-server] static error: %s" % exc)
                    return False

        self._server = _ThreadingHTTPServer((self.host, self.port), _H)
        self.port = int(self._server.server_address[1])
        self._thread = threading.Thread(target=self._server.serve_forever, name="CherryQtBridge", daemon=True)
        self._thread.start()
        return self.base_url

    @property
    def base_url(self) -> str:
        return "http://%s:%d" % (self.host, self.port)

    def stop(self) -> None:
        if self._server is not None:
            try:
                self._server.shutdown()
            except Exception:  # noqa: BLE001
                pass
            self._server = None
