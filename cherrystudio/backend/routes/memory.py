"""
记忆功能路由

对应原 CherryStudioAPI 中的 memory* 方法。
当前实现为存根（stub），返回空数据以保持前端兼容性。
未来可接入实际记忆存储服务。
"""

import os
import json
from typing import Any

from ..server import route
from ...utils.logger import network_logger

_log = network_logger

def _get_app_data_dir() -> str:
    from ...core.paths import get_app_data_dir
    return get_app_data_dir()


@route("/api/v1/memory/list", methods=["POST"])
def memory_list(ctx: dict) -> Any:
    return {"memories": [], "error": None}


@route("/api/v1/memory/add", methods=["POST"])
def memory_add(ctx: dict) -> Any:
    return {"memories": []}


@route("/api/v1/memory/search", methods=["POST"])
def memory_search(ctx: dict) -> Any:
    return {"memories": []}


@route("/api/v1/memory/delete", methods=["POST"])
def memory_delete(ctx: dict) -> Any:
    return True


@route("/api/v1/memory/update", methods=["POST"])
def memory_update(ctx: dict) -> Any:
    return False


@route("/api/v1/memory/get", methods=["POST"])
def memory_get(ctx: dict) -> Any:
    return None


@route("/api/v1/memory/delete-all-for-user", methods=["POST"])
def memory_delete_all_for_user(ctx: dict) -> Any:
    return True


@route("/api/v1/memory/delete-user", methods=["POST"])
def memory_delete_user(ctx: dict) -> Any:
    return True


@route("/api/v1/memory/get-users-list", methods=["GET", "POST"])
def memory_get_users_list(ctx: dict) -> Any:
    return []


@route("/api/v1/memory/set-config", methods=["POST"])
def memory_set_config(ctx: dict) -> Any:
    """保存全局记忆配置到 localStorage.json"""
    try:
        config_data = ctx["body"]
        data_dir = _get_app_data_dir()
        storage_path = os.path.join(data_dir, "localStorage.json")
        storage_data = {}
        if os.path.exists(storage_path):
            try:
                with open(storage_path, "r", encoding="utf-8") as f:
                    storage_data = json.load(f)
            except Exception:
                pass
        storage_data["memoryConfig"] = config_data
        os.makedirs(data_dir, exist_ok=True)
        with open(storage_path, "w", encoding="utf-8") as f:
            json.dump(storage_data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        _log(f"[memory/set-config] {e}")
        return False
