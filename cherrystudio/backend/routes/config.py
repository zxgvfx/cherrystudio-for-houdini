"""
配置管理路由

对应原 CherryStudioAPI 中的 configGetMergedConfig / configReload 等方法。
"""

import hashlib
import os
from typing import Any

from ..server import route
from ...core.config_manager import config_manager
from ...utils.logger import network_logger

_log = network_logger


@route("/api/v1/config/merged", methods=["GET"])
def get_merged_config(ctx: dict) -> Any:
    """获取合并后的配置（中心化 + 用户配置）"""
    try:
        cfg = config_manager.load()
        if isinstance(cfg, dict):
            cfg.pop("developerPasswordHash", None)
            cfg.pop("developerUsers", None)
        return cfg
    except Exception as e:
        _log(f"[config/merged] {e}")
        return {"error": str(e)}


@route("/api/v1/config/verify-developer-password", methods=["POST"])
def verify_developer_password(ctx: dict) -> Any:
    """验证开发者身份：用户名白名单 + SHA-256 哈希密码"""
    body = ctx.get("body", {})
    password = body.get("password", "")
    try:
        cfg = config_manager.load() or {}

        allowed_users: list = cfg.get("developerUsers", [])
        current_user = os.environ.get("USERNAME") or os.environ.get("USER", "")
        if allowed_users and current_user.lower() not in [u.lower() for u in allowed_users]:
            return {"valid": False, "message": "user_not_allowed"}

        expected_hash = cfg.get("developerPasswordHash", "")
        if not expected_hash:
            return {"valid": False, "message": "Developer password not configured"}
        input_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
        return {"valid": input_hash == expected_hash}
    except Exception as e:
        _log(f"[config/verify-developer-password] {e}")
        return {"valid": False, "message": str(e)}


@route("/api/v1/config/check-developer-status", methods=["GET"])
def check_developer_status(ctx: dict) -> Any:
    """检查当前系统用户是否仍在开发者白名单中（无需密码）"""
    try:
        cfg = config_manager.load() or {}
        allowed_users: list = cfg.get("developerUsers", [])
        if not allowed_users:
            return {"allowed": False}
        current_user = os.environ.get("USERNAME") or os.environ.get("USER", "")
        allowed = current_user.lower() in [u.lower() for u in allowed_users]
        return {"allowed": allowed}
    except Exception as e:
        _log(f"[config/check-developer-status] {e}")
        return {"allowed": False}


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
