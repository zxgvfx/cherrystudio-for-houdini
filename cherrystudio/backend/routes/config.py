"""
配置管理路由

对应原 CherryStudioAPI 中的 configGetMergedConfig / configReload 等方法。
"""

from typing import Any

from ..server import route
from ...core.config_manager import config_manager
from ...utils.logger import network_logger

_log = network_logger


@route("/api/v1/config/merged", methods=["GET"])
def get_merged_config(ctx: dict) -> Any:
    """获取合并后的配置（中心化 + 用户配置）"""
    try:
        return config_manager.load()
    except Exception as e:
        _log(f"[config/merged] {e}")
        return {"error": str(e)}


@route("/api/v1/config/reload", methods=["POST"])
def reload_config(ctx: dict) -> Any:
    """重新加载配置文件"""
    try:
        return config_manager.reload()
    except Exception as e:
        _log(f"[config/reload] {e}")
        return {"error": str(e)}


@route("/api/v1/config/update-models", methods=["POST"])
def update_user_models(ctx: dict) -> Any:
    body = ctx["body"]
    models = body.get("models", [])
    try:
        return config_manager.update_user_models(models)
    except Exception as e:
        _log(f"[config/update-models] {e}")
        return {"error": str(e)}


@route("/api/v1/config/update-mcp-servers", methods=["POST"])
def update_mcp_servers(ctx: dict) -> Any:
    body = ctx["body"]
    servers = body.get("servers", [])
    try:
        return config_manager.update_user_mcp_servers(servers)
    except Exception as e:
        _log(f"[config/update-mcp-servers] {e}")
        return {"error": str(e)}
