# -*- coding: utf-8 -*-
"""
运行在 DCC 进程内的通用 MCP server（JSON-RPC over HTTP，loopback only）。

* 工具集来自 :meth:`DccAdapter.tools`，任何 DCC 都是同一套协议。
* 每个 ``tools/call`` 都经 :meth:`DccAdapter.run_on_main_thread` 封送到 DCC 主线程；
  写工具再包一层 :meth:`DccAdapter.undo_group`。
* 与 Cherry backend 的 ``/api/v1/mcp/call-dcc`` / ``/list-dcc-tools`` 兼容：
  ``POST /`` 收 ``{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{...}}``。
"""

from __future__ import annotations

import json
import logging
import threading
import traceback
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
from typing import Any, Dict, List, Optional

from .base import DccAdapter, ToolSpec
from ..utils.client_disconnect import DisconnectQuietHandlerMixIn, DisconnectQuietMixIn

log = logging.getLogger("cherry.dcc_adapter.server")

PROTOCOL_VERSION = "2024-11-05"


class DccAdapterServer:
    """把一个 :class:`DccAdapter` 暴露成 MCP HTTP server。"""

    def __init__(self, adapter: DccAdapter, host: str = "127.0.0.1", port: int = 0) -> None:
        self.adapter = adapter
        self.host = host
        self.port = port
        self._tools: Dict[str, ToolSpec] = {}
        self._server: Optional[HTTPServer] = None
        self._thread: Optional[threading.Thread] = None
        self._started = threading.Event()
        for spec in adapter.tools():
            self.register_tool(spec)

    # ── 工具注册 ───────────────────────────────────────────────────────────────

    def register_tool(self, spec: ToolSpec) -> None:
        self._tools[spec.name] = spec

    def list_tools(self) -> List[Dict[str, Any]]:
        return [spec.to_mcp() for spec in self._tools.values()]

    def tool_names(self) -> List[str]:
        return list(self._tools.keys())

    def call_tool(self, name: str, arguments: Optional[Dict[str, Any]] = None, timeout: float = 30.0) -> Any:
        spec = self._tools.get(name)
        if spec is None:
            return {"error": "Unknown tool: %s" % name}
        args = dict(arguments or {})

        def _run() -> Any:
            if spec.kind == "write":
                with self.adapter.undo_group(spec.undo_label):
                    return spec.handler(args)
            return spec.handler(args)

        try:
            return self.adapter.run_on_main_thread(_run, timeout=timeout)
        except Exception as exc:  # noqa: BLE001
            log.warning("tool %s failed: %s", name, exc)
            return {"error": "%s: %s" % (type(exc).__name__, exc), "traceback": traceback.format_exc()}

    # ── JSON-RPC ───────────────────────────────────────────────────────────────

    def handle_rpc(self, rpc: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """处理一条 JSON-RPC 请求。notification（无 id）返回 None。"""
        method = str(rpc.get("method") or "")
        req_id = rpc.get("id")
        params = rpc.get("params") or {}
        if not isinstance(params, dict):
            params = {}
        is_notification = "id" not in rpc

        if method.startswith("notifications/"):
            return None

        if method == "initialize":
            result: Any = {
                "protocolVersion": PROTOCOL_VERSION,
                "capabilities": {"tools": {}},
                "serverInfo": {
                    "name": "%s-dcc-adapter" % self.adapter.dcc_type,
                    "version": "2.0.0",
                    "dccType": self.adapter.dcc_type,
                    "dccVersion": self.adapter.version(),
                },
            }
        elif method == "ping":
            result = {}
        elif method == "tools/list":
            result = {"tools": self.list_tools()}
        elif method == "tools/call":
            name = str(params.get("name") or "")
            timeout = float(params.get("timeout") or 30.0)
            payload = self.call_tool(name, params.get("arguments") or {}, timeout=timeout)
            is_error = isinstance(payload, dict) and bool(payload.get("error")) and payload.get("ok") is not True
            result = {
                "content": [{"type": "text", "text": json.dumps(payload, ensure_ascii=False, default=str)}],
                "isError": is_error,
            }
        else:
            if is_notification:
                return None
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32601, "message": "Method not found: %s" % method},
            }

        if is_notification:
            return None
        return {"jsonrpc": "2.0", "id": req_id, "result": result}

    # ── 生命周期 ───────────────────────────────────────────────────────────────

    def start(self) -> int:
        if self._server is not None:
            return self.port
        server = _ThreadingServer((self.host, self.port), _make_handler(self))
        self._server = server
        self.port = server.server_address[1]
        self._thread = threading.Thread(target=self._serve, name="CherryDccAdapterServer", daemon=True)
        self._thread.start()
        self._started.wait(timeout=5)
        log.info("%s adapter server listening on %s:%s", self.adapter.dcc_type, self.host, self.port)
        return self.port

    def _serve(self) -> None:
        self._started.set()
        try:
            self._server.serve_forever(poll_interval=0.5)  # type: ignore[union-attr]
        except Exception:  # noqa: BLE001
            pass

    def stop(self) -> None:
        server = self._server
        self._server = None
        if server is not None:
            try:
                server.shutdown()
                server.server_close()
            except Exception:  # noqa: BLE001
                pass

    def is_running(self) -> bool:
        return self._thread is not None and self._thread.is_alive()

    def get_port(self) -> int:
        return self.port

    def base_url(self) -> str:
        return "http://%s:%s" % (self.host, self.port)


class _ThreadingServer(DisconnectQuietMixIn, ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def _make_handler(owner: DccAdapterServer):
    class _Handler(DisconnectQuietHandlerMixIn, BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def log_message(self, fmt, *args):  # noqa: D401
            log.debug("[http] " + fmt, *args)

        def _write(self, status: int, body: Optional[bytes]) -> None:
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body) if body else 0))
            self.end_headers()
            if body:
                self.wfile.write(body)

        def do_OPTIONS(self):  # noqa: N802
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, Accept, Mcp-Session-Id")
            self.send_header("Content-Length", "0")
            self.end_headers()

        def do_GET(self):  # noqa: N802
            if self.path.rstrip("/") in ("", "/tools"):
                self._write(200, json.dumps({
                    "dccType": owner.adapter.dcc_type,
                    "dccVersion": owner.adapter.version(),
                    "tools": owner.list_tools(),
                }, ensure_ascii=False).encode("utf-8"))
                return
            if self.path.startswith("/healthz"):
                self._write(200, b'{"ok": true}')
                return
            self._write(404, b'{"error": "not found"}')

        def do_POST(self):  # noqa: N802
            try:
                length = int(self.headers.get("Content-Length") or 0)
                raw = self.rfile.read(length) if length > 0 else b""
                rpc = json.loads(raw.decode("utf-8")) if raw else {}
            except Exception:  # noqa: BLE001
                self._write(400, json.dumps({
                    "jsonrpc": "2.0", "id": None,
                    "error": {"code": -32700, "message": "Parse error"},
                }).encode("utf-8"))
                return
            try:
                if isinstance(rpc, list):
                    responses = [r for r in (owner.handle_rpc(item) for item in rpc if isinstance(item, dict)) if r is not None]
                    if not responses:
                        self._write(202, None)
                        return
                    self._write(200, json.dumps(responses, ensure_ascii=False, default=str).encode("utf-8"))
                    return
                if not isinstance(rpc, dict):
                    self._write(400, b'{"error": "invalid request"}')
                    return
                response = owner.handle_rpc(rpc)
            except Exception as exc:  # noqa: BLE001
                log.error("rpc failed: %s\n%s", exc, traceback.format_exc())
                self._write(200, json.dumps({
                    "jsonrpc": "2.0", "id": rpc.get("id") if isinstance(rpc, dict) else None,
                    "error": {"code": -32603, "message": str(exc)},
                }, ensure_ascii=False).encode("utf-8"))
                return
            if response is None:
                self._write(202, None)
                return
            self._write(200, json.dumps(response, ensure_ascii=False, default=str).encode("utf-8"))

    return _Handler
