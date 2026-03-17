"""
Chat Completions 代理路由

为独立 QWebEngineView（如划词助手 Action 窗口）提供 SSE 流式聊天接口。
前端直接 fetch('/api/v1/chat/completions') 即可，后端负责转发到 Higress。
"""

import json
import os
import urllib.request
import urllib.error
from typing import Any

from ..server import route, STREAMING_HANDLED
from ...utils.logger import network_logger

_log = network_logger

_OCR_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json",
}


def _get_centralized_config():
    """Read Higress API host and key from centralized-config.json."""
    cfg_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        "resources", "centralized-config.json",
    )
    try:
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        for p in cfg.get("providers", []):
            if p.get("apiHost") and p.get("apiKey"):
                return p["apiHost"], p["apiKey"]
    except Exception as e:
        _log(f"[chat] Failed to read centralized config: {e}")
    return None, None


def _resolve_model(body_model: str) -> str:
    """
    Resolve the actual model ID to use.
    Priority:
      1. Explicit model from request body (if valid)
      2. SelectionService.model (synced from frontend's default model setting)
      3. centralized-config.json defaultModels.defaultModel.id
    """
    if body_model and body_model != "default":
        return body_model

    # Try SelectionService
    try:
        from ...services.selection_service import SelectionService
        svc = SelectionService.instance()
        if svc.model:
            return svc.model
    except Exception:
        pass

    # Fallback: centralized config
    cfg_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        "resources", "centralized-config.json",
    )
    try:
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        dm = cfg.get("defaultModels", {})
        model_id = dm.get("defaultModel", {}).get("id", "")
        if model_id:
            return model_id
    except Exception:
        pass

    return body_model or "default"


@route("/api/v1/chat/completions", methods=["POST"])
def chat_completions_proxy(ctx: dict) -> Any:
    """
    SSE streaming proxy for /v1/chat/completions.
    Forwards the request body to Higress and streams the response back.
    """
    handler = ctx["_handler"]
    body = ctx["body"]

    body["model"] = _resolve_model(body.get("model", ""))
    _log(f"[chat] model resolved to: {body['model']}")

    api_host, api_key = _get_centralized_config()
    if not api_host or not api_key:
        handler.send_response(500)
        handler._send_cors()
        handler.send_header("Content-Type", "application/json")
        err = json.dumps({"error": "No API configuration found"}).encode("utf-8")
        handler.send_header("Content-Length", str(len(err)))
        handler.end_headers()
        handler.wfile.write(err)
        return STREAMING_HANDLED

    upstream_url = f"{api_host.rstrip('/')}/v1/chat/completions"
    payload = json.dumps(body, ensure_ascii=False).encode("utf-8")

    req = urllib.request.Request(upstream_url, data=payload, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    for k, v in _OCR_HEADERS.items():
        req.add_header(k, v)

    from .network import _should_bypass_proxy, _build_opener
    bypass = _should_bypass_proxy(upstream_url)
    opener = _build_opener(bypass)

    try:
        resp = opener.open(req, timeout=120)
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")[:2000]
        handler.send_response(e.code)
        handler._send_cors()
        handler.send_header("Content-Type", "application/json")
        err_bytes = err_body.encode("utf-8")
        handler.send_header("Content-Length", str(len(err_bytes)))
        handler.end_headers()
        handler.wfile.write(err_bytes)
        return STREAMING_HANDLED
    except Exception as e:
        handler.send_response(502)
        handler._send_cors()
        handler.send_header("Content-Type", "application/json")
        err = json.dumps({"error": str(e)}).encode("utf-8")
        handler.send_header("Content-Length", str(len(err)))
        handler.end_headers()
        handler.wfile.write(err)
        return STREAMING_HANDLED

    is_stream = body.get("stream", False)

    if is_stream:
        handler.send_response(200)
        handler._send_cors()
        handler.send_header("Content-Type", "text/event-stream; charset=utf-8")
        handler.send_header("Cache-Control", "no-cache")
        handler.send_header("Connection", "keep-alive")
        handler.send_header("Transfer-Encoding", "chunked")
        handler.end_headers()

        try:
            for raw_line in resp:
                chunk = raw_line
                if isinstance(chunk, str):
                    chunk = chunk.encode("utf-8")
                chunk_size = f"{len(chunk):x}\r\n".encode("ascii")
                handler.wfile.write(chunk_size + chunk + b"\r\n")
                handler.wfile.flush()
            handler.wfile.write(b"0\r\n\r\n")
            handler.wfile.flush()
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError, OSError):
            pass
        finally:
            resp.close()
    else:
        resp_body = resp.read()
        resp.close()
        handler.send_response(200)
        handler._send_cors()
        handler.send_header("Content-Type", "application/json; charset=utf-8")
        handler.send_header("Content-Length", str(len(resp_body)))
        handler.end_headers()
        handler.wfile.write(resp_body)

    return STREAMING_HANDLED
