"""DCC 面板与上下文 API。

面板进程由 :mod:`cherrystudio.api.dcc_panel_manager` 拉起；DCC 适配器通过
``/api/v1/dcc/panel/*`` 开关窗口。对话/画布前端走 ``GET /api/v1/dcc/context``
和 ``POST /api/v1/dcc/import``。
"""

from __future__ import annotations

from typing import Any

from ..server import route
from ...utils.logger import network_logger
from . import mcp as mcp_routes

_log = network_logger


def _session_id(ctx: dict) -> str:
    body = ctx.get("body") or {}
    query = ctx.get("query") or {}
    q = query.get("sessionId")
    if isinstance(q, list):
        q = q[0] if q else ""
    return (
        ctx.get("session_id", "")
        or str(q or "")
        or str(body.get("sessionId") or "")
    )


def _call_dcc(ctx: dict, tool_name: str, arguments: dict, timeout: float = 30.0) -> Any:
    return mcp_routes.mcp_call_dcc(
        {
            "server": ctx.get("server"),
            "session_id": _session_id(ctx),
            "body": {
                "sessionId": _session_id(ctx),
                "toolName": tool_name,
                "arguments": arguments,
                "timeout": timeout,
            },
        }
    )


@route("/api/v1/dcc/context", methods=["GET", "POST"])
def dcc_context(ctx: dict) -> Any:
    session_id = _session_id(ctx)
    server = ctx.get("server")
    if not server or not session_id:
        return {"error": "missing sessionId", "available": False}
    info = server.get_session(session_id)
    if not info:
        return {"error": "DCC session not found: %s" % session_id, "available": False}

    result = _call_dcc(ctx, "dcc_get_context", {}, timeout=8.0)
    if isinstance(result, dict) and result.get("error"):
        # 旧适配器没有 dcc_get_context 时退回 scene_info
        dcc_type = info.get("dcc_type") or "houdini"
        result = _call_dcc(ctx, "%s_get_scene_info" % dcc_type, {}, timeout=8.0)

    payload = result if isinstance(result, dict) else {"raw": result}
    payload.setdefault("dcc", info.get("dcc_type", "unknown"))
    payload.setdefault("dccType", info.get("dcc_type", "unknown"))
    payload.setdefault("dccVersion", info.get("dcc_version", ""))
    payload.setdefault("sessionId", session_id)
    payload["available"] = "error" not in payload
    return payload


@route("/api/v1/dcc/import", methods=["POST"])
def dcc_import(ctx: dict) -> Any:
    body = ctx.get("body") or {}
    local_path = body.get("localPath") or body.get("filePath") or body.get("path") or ""
    if not local_path:
        return {"error": "localPath is required"}
    arguments = {
        "filePath": local_path,
        "format": body.get("format") or "",
        "parentPath": body.get("parentPath") or "",
    }
    return _call_dcc(ctx, "import_scene_file", arguments, timeout=float(body.get("timeout") or 60.0))


def _panel_action(ctx: dict, action: str) -> Any:
    session_id = _session_id(ctx)
    if not session_id:
        return {"error": "missing sessionId"}
    try:
        from ...api.dcc_panel_manager import get_dcc_panel_manager
        manager = get_dcc_panel_manager()
        fn = getattr(manager, action)
        return fn(session_id, ctx.get("server"), ctx.get("body") or {})
    except Exception as exc:  # noqa: BLE001
        _log("[dcc/panel/%s] %s" % (action, exc))
        return {"error": str(exc)}


@route("/api/v1/dcc/panel/open", methods=["POST"])
def panel_open(ctx: dict) -> Any:
    return _panel_action(ctx, "open")


@route("/api/v1/dcc/panel/focus", methods=["POST"])
def panel_focus(ctx: dict) -> Any:
    return _panel_action(ctx, "focus")


@route("/api/v1/dcc/panel/close", methods=["POST"])
def panel_close(ctx: dict) -> Any:
    return _panel_action(ctx, "close")


@route("/api/v1/dcc/panel/toggle", methods=["POST"])
def panel_toggle(ctx: dict) -> Any:
    return _panel_action(ctx, "toggle")
