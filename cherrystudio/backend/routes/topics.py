"""
Topic 持久化路由

对应原 CherryStudioAPI 中的 topicSave/Load/Delete/List 方法。
Topic 数据存储在 ~/.cherrystudio/topics/ 目录下。
"""

import os
import json
from typing import Any

from ..server import route
from ...utils.logger import network_logger

_log = network_logger

_TOPICS_DIR = os.path.join(os.path.expanduser("~"), ".cherrystudio", "topics")


def _topic_path(topic_id: str) -> str:
    os.makedirs(_TOPICS_DIR, exist_ok=True)
    # 防止目录穿越
    safe_id = os.path.basename(topic_id)
    return os.path.join(_TOPICS_DIR, f"{safe_id}.json")


@route("/api/v1/topics/save", methods=["POST"])
def topic_save(ctx: dict) -> Any:
    body = ctx["body"]
    topic_id = body.get("topicId", "")
    data = body.get("data", "")
    if not topic_id:
        return {"error": "missing topicId"}
    try:
        path = _topic_path(topic_id)
        with open(path, "w", encoding="utf-8") as f:
            if isinstance(data, (dict, list)):
                json.dump(data, f, ensure_ascii=False)
            else:
                f.write(str(data))
        return {"ok": True}
    except Exception as e:
        _log(f"[topics/save] {e}")
        return {"error": str(e)}


@route("/api/v1/topics/load", methods=["POST"])
def topic_load(ctx: dict) -> Any:
    body = ctx["body"]
    topic_id = body.get("topicId", "")
    if not topic_id:
        return {"error": "missing topicId"}
    try:
        path = _topic_path(topic_id)
        if not os.path.exists(path):
            return {"data": None}
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        try:
            return {"data": json.loads(content)}
        except Exception:
            return {"data": content}
    except Exception as e:
        _log(f"[topics/load] {e}")
        return {"error": str(e)}


@route("/api/v1/topics/delete", methods=["POST"])
def topic_delete(ctx: dict) -> Any:
    body = ctx["body"]
    topic_id = body.get("topicId", "")
    if not topic_id:
        return {"error": "missing topicId"}
    try:
        path = _topic_path(topic_id)
        if os.path.exists(path):
            os.remove(path)
        return {"ok": True}
    except Exception as e:
        _log(f"[topics/delete] {e}")
        return {"error": str(e)}


@route("/api/v1/topics/list", methods=["GET"])
def topic_list(ctx: dict) -> Any:
    try:
        if not os.path.isdir(_TOPICS_DIR):
            return {"topics": []}
        topics = [
            f[:-5]
            for f in os.listdir(_TOPICS_DIR)
            if f.endswith(".json")
        ]
        return {"topics": topics}
    except Exception as e:
        _log(f"[topics/list] {e}")
        return {"error": str(e)}
