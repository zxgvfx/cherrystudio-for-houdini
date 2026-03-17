"""
划词助手路由

接收前端设置页面的配置变更并转发给 SelectionService。
"""

from typing import Any

from ..server import route


def _get_service():
    """Lazy-import SelectionService singleton to avoid circular imports."""
    try:
        from ...services.selection_service import SelectionService
        return SelectionService.instance()
    except Exception as e:
        print(f"[selection] Failed to get SelectionService: {e}")
        return None


@route("/api/v1/selection/set-enabled", methods=["POST"])
def set_enabled(ctx: dict) -> Any:
    body = ctx.get("body", {})
    enabled = body.get("enabled", False)
    svc = _get_service()
    if svc is None:
        return {"error": "SelectionService not available"}
    try:
        svc.set_enabled(enabled)
        return {"ok": True, "enabled": enabled}
    except Exception as e:
        return {"error": str(e)}


@route("/api/v1/selection/set-trigger-mode", methods=["POST"])
def set_trigger_mode(ctx: dict) -> Any:
    body = ctx.get("body", {})
    mode = body.get("mode", "selected")
    svc = _get_service()
    if svc is None:
        return {"error": "SelectionService not available"}
    try:
        svc.set_trigger_mode(mode)
        return {"ok": True, "mode": mode}
    except Exception as e:
        return {"error": str(e)}


@route("/api/v1/selection/set-filter-mode", methods=["POST"])
def set_filter_mode(ctx: dict) -> Any:
    body = ctx.get("body", {})
    mode = body.get("mode", "default")
    filter_list = body.get("filterList", [])
    svc = _get_service()
    if svc is None:
        return {"error": "SelectionService not available"}
    try:
        svc.set_filter_mode(mode)
        svc.set_filter_list(filter_list)
        return {"ok": True, "mode": mode}
    except Exception as e:
        return {"error": str(e)}


@route("/api/v1/selection/set-model", methods=["POST"])
def set_model(ctx: dict) -> Any:
    body = ctx.get("body", {})
    model = body.get("model", "")
    svc = _get_service()
    if svc is None:
        return {"error": "SelectionService not available"}
    try:
        svc.set_model(model)
        return {"ok": True, "model": model}
    except Exception as e:
        return {"error": str(e)}


@route("/api/v1/selection/set-theme", methods=["POST"])
def set_theme(ctx: dict) -> Any:
    body = ctx.get("body", {})
    theme = body.get("theme", "light")
    svc = _get_service()
    if svc is None:
        return {"error": "SelectionService not available"}
    try:
        svc.set_theme(theme)
        return {"ok": True, "theme": theme}
    except Exception as e:
        return {"error": str(e)}


@route("/api/v1/selection/status", methods=["GET"])
def get_status(ctx: dict) -> Any:
    svc = _get_service()
    if svc is None:
        return {"enabled": False, "available": False}
    try:
        return {
            "available": True,
            "enabled": svc.enabled,
            "triggerMode": svc.trigger_mode,
            "filterMode": svc.filter_mode,
            "model": svc.model,
        }
    except Exception as e:
        return {"error": str(e)}
