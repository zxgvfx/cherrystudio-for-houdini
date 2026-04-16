"""
知识库路由

对应原 CherryStudioAPI 中的 knowledgeBase* 方法。
"""

import os
from typing import Any

from ..server import route
from ...utils.logger import network_logger

_log = network_logger

_kb_service = None
_kb_lock_obj = None


def _get_kb_service():
    global _kb_service, _kb_lock_obj
    import threading
    if _kb_lock_obj is None:
        _kb_lock_obj = threading.Lock()
    with _kb_lock_obj:
        if _kb_service is None:
            from ...core.paths import get_app_data_dir
            from ...services.knowledge_base import KnowledgeBaseService
            storage_path = os.path.join(get_app_data_dir(), "knowledge_base")
            os.makedirs(storage_path, exist_ok=True)
            _kb_service = KnowledgeBaseService(storage_path)
        return _kb_service


@route("/api/v1/kb/create", methods=["POST"])
def kb_create(ctx: dict) -> Any:
    try:
        result = _get_kb_service().create(ctx["body"])
        return result
    except Exception as e:
        _log(f"[kb/create] {e}")
        return {"error": str(e)}


@route("/api/v1/kb/add", methods=["POST"])
def kb_add(ctx: dict) -> Any:
    try:
        return _get_kb_service().add_item(ctx["body"])
    except Exception as e:
        _log(f"[kb/add] {e}")
        return {"status": "failed", "message": str(e)}


@route("/api/v1/kb/search", methods=["POST"])
def kb_search(ctx: dict) -> Any:
    try:
        return _get_kb_service().search(ctx["body"])
    except Exception as e:
        _log(f"[kb/search] {e}")
        return []


@route("/api/v1/kb/list", methods=["GET"])
def kb_list(ctx: dict) -> Any:
    try:
        return _get_kb_service().list_bases()
    except Exception as e:
        _log(f"[kb/list] {e}")
        return []


@route("/api/v1/kb/delete", methods=["POST"])
def kb_delete(ctx: dict) -> Any:
    kb_id = ctx["body"].get("kbId", "")
    try:
        return {"ok": _get_kb_service().delete(kb_id)}
    except Exception as e:
        _log(f"[kb/delete] {e}")
        return {"error": str(e)}


@route("/api/v1/kb/remove", methods=["POST"])
def kb_remove(ctx: dict) -> Any:
    try:
        return _get_kb_service().remove_item(ctx["body"])
    except Exception as e:
        _log(f"[kb/remove] {e}")
        return {"success": False, "message": str(e)}


@route("/api/v1/kb/rerank", methods=["POST"])
def kb_rerank(ctx: dict) -> Any:
    try:
        return _get_kb_service().search(ctx["body"])
    except Exception as e:
        _log(f"[kb/rerank] {e}")
        return []


@route("/api/v1/kb/reset", methods=["POST"])
def kb_reset(ctx: dict) -> Any:
    try:
        return _get_kb_service().reset(ctx["body"])
    except Exception as e:
        _log(f"[kb/reset] {e}")
        return {"success": False, "message": str(e)}


@route("/api/v1/kb/check-quota", methods=["POST"])
def kb_check_quota(ctx: dict) -> Any:
    try:
        kb_id = ctx["body"].get("kbId", "")
        return {"hasQuota": True, "kbId": kb_id}
    except Exception as e:
        return {"hasQuota": False, "error": str(e)}


@route("/api/v1/kb/scan", methods=["GET", "POST"])
def kb_scan(ctx: dict) -> Any:
    """扫描本地知识库元数据（自动发现）"""
    try:
        kbs = _get_kb_service().scan_knowledge_bases()
        return kbs
    except Exception as e:
        _log(f"[kb/scan] {e}")
        return []


@route("/api/v1/kb/save-metadata", methods=["POST"])
def kb_save_metadata(ctx: dict) -> Any:
    """保存知识库元数据"""
    body = ctx["body"]
    if not body.get("id"):
        return {"error": "missing kb id"}
    try:
        _get_kb_service().save_kb_metadata(body)
        return {"ok": True}
    except Exception as e:
        _log(f"[kb/save-metadata] {e}")
        return {"error": str(e)}


@route("/api/v1/kb/sync-from-central", methods=["POST", "GET"])
def kb_sync_from_central(ctx: dict) -> Any:
    """从中心化配置同步知识库"""
    try:
        from ...core.config_manager import config_manager
        source_path = os.environ.get("CHERRY_STUDIO_KB_SOURCE", "")
        if not source_path:
            try:
                cfg_path = getattr(config_manager, "_centralized_config_path", "")
                if cfg_path and os.path.exists(cfg_path):
                    import json as _j
                    with open(cfg_path, "r", encoding="utf-8") as f:
                        source_path = _j.load(f).get("knowledgeBaseSource", "")
            except Exception:
                pass
        if not source_path:
            return {"synced": 0, "updated": 0, "failed": 0, "needsRefresh": False}
        result = _get_kb_service().sync_from_central_source(source_path)
        return result
    except Exception as e:
        _log(f"[kb/sync-from-central] {e}")
        return {"synced": 0, "updated": 0, "failed": 0, "needsRefresh": False, "error": str(e)}
