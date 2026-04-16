import json
import os
from pathlib import Path
from typing import Any


def _data_dir() -> Path:
    raw = os.environ.get("CHERRYSTUDIO_DATA_DIR")
    if raw:
        root = Path(raw)
    else:
        from ..core.paths import get_app_data_dir
        root = Path(get_app_data_dir())
    base_dir = root / "agent_session_messages"
    base_dir.mkdir(parents=True, exist_ok=True)
    return base_dir


def _session_file(session_id: str) -> Path:
    return _data_dir() / f"{session_id}.json"


def _load_session_file(session_id: str) -> list[dict[str, Any]]:
    path = _session_file(session_id)
    if not path.exists():
        return []
    try:
        with open(path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        return data if isinstance(data, list) else []
    except (OSError, json.JSONDecodeError):
        return []


def _save_session_file(session_id: str, messages: list[dict[str, Any]]) -> None:
    path = _session_file(session_id)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(messages, fh, ensure_ascii=False, indent=2)


def _normalize_entry(raw_payload: Any) -> dict[str, Any] | None:
    if not isinstance(raw_payload, dict):
        return None

    message = raw_payload.get("message")
    if not isinstance(message, dict):
        return None

    message_id = str(message.get("id", "") or "").strip()
    if not message_id:
        return None

    blocks = raw_payload.get("blocks", [])
    if not isinstance(blocks, list):
        blocks = []

    return {"message": message, "blocks": blocks}


def get_session_history(session_id: str) -> list[dict[str, Any]]:
    session_key = str(session_id or "").strip()
    if not session_key:
        return []
    return _load_session_file(session_key)


def persist_exchange(payload: dict[str, Any]) -> bool:
    if not isinstance(payload, dict):
        return False

    session_id = str(payload.get("sessionId", "") or "").strip()
    if not session_id:
        return False

    history = _load_session_file(session_id)
    index_by_message_id = {
        str(item.get("message", {}).get("id", "")): idx
        for idx, item in enumerate(history)
        if isinstance(item, dict)
    }

    changed = False
    for role_key in ("user", "assistant"):
        role_wrapper = payload.get(role_key, {})
        entry = _normalize_entry(role_wrapper.get("payload") if isinstance(role_wrapper, dict) else None)
        if not entry:
            continue

        message_id = str(entry["message"]["id"])
        existing_idx = index_by_message_id.get(message_id)
        if existing_idx is None:
            history.append(entry)
            index_by_message_id[message_id] = len(history) - 1
        else:
            history[existing_idx] = entry
        changed = True

    if not changed:
        return False

    try:
        _save_session_file(session_id, history)
        return True
    except OSError:
        return False
