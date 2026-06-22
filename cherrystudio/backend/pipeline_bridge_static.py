"""Mount ``/plugins-ui/<id>/`` static trees for thin ai-pipeline shell plugins."""

from __future__ import annotations

import mimetypes
import os
from typing import Any

from cherrystudio.backend.server import STREAMING_HANDLED, prefix_route
from cherrystudio.utils.logger import network_logger

_log = network_logger


def _serve_static_file(handler, file_path: str) -> Any:
    mime, _ = mimetypes.guess_type(file_path)
    if not mime:
        mime = "application/octet-stream"
    with open(file_path, "rb") as f:
        data = f.read()
    handler.send_response(200)
    handler.send_header("Content-Type", mime)
    handler.send_header("Content-Length", str(len(data)))
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.end_headers()
    handler.wfile.write(data)
    handler.wfile.flush()
    return STREAMING_HANDLED


def register_plugins_ui_static(web_prefix: str, frontend_dir: str) -> None:
    """Register GET handler: ``web_prefix`` + optional sub-path → files under ``frontend_dir``."""
    root = os.path.normpath(os.path.abspath(frontend_dir))
    prefix = web_prefix.rstrip("/") or "/plugins-ui"
    if not prefix.startswith("/"):
        prefix = "/" + prefix

    def webview_static(ctx: dict) -> Any:
        handler = ctx["_handler"]
        sub = (ctx.get("sub_path") or "").lstrip("/")
        rel = sub or "index.html"
        target = os.path.normpath(os.path.join(root, rel))
        norm_root = os.path.normpath(root)
        if not target.startswith(norm_root):
            handler.send_response(403)
            handler.end_headers()
            handler.wfile.write(b"forbidden")
            return STREAMING_HANDLED
        if not os.path.isfile(target):
            handler.send_response(404)
            handler.end_headers()
            handler.wfile.write(f"not found: {rel}".encode())
            return STREAMING_HANDLED
        return _serve_static_file(handler, target)

    prefix_route(prefix, methods=["GET"])(webview_static)
    _log(f"[pipeline_bridge_static] GET {prefix}/ → {root}")
