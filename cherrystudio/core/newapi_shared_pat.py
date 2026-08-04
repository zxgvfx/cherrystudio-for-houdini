"""Shared NewAPI system access token (PAT) per apiHost + username.

NewAPI invalidates the previous PAT on every ``GET /api/user/token``. With multiple
provider entries (coco-vapi, coco-openrouter, …) each provisioning call would
rotate the PAT and break cost tracking for the others. Store one PAT per gateway
user instead of one per provider.
"""

from __future__ import annotations

import json
import logging
import os
from typing import Any

_log = logging.getLogger("NewApiSharedPat")

KEYRING_SERVICE = "cherrystudio.newapi"


class AccessTokenInvalidError(Exception):
    """Raised when /api/log/self rejects the stored management PAT."""


def normalize_api_host(api_host: str) -> str:
    return (api_host or "").strip().rstrip("/").lower()


def _sanitize(value: str) -> str:
    return "".join(ch if ch.isalnum() or ch in "_.-" else "_" for ch in value)


def shared_pat_keyring_user(api_host: str, username: str) -> str:
    host = _sanitize(normalize_api_host(api_host).replace("://", "_"))
    user = _sanitize(username)
    return f"__shared_pat__:{host}:{user}"


def shared_pat_metadata_path(secrets_dir: str, api_host: str, username: str) -> str:
    host = _sanitize(normalize_api_host(api_host).replace("://", "_"))
    user = _sanitize(username)
    return os.path.join(secrets_dir, f"_shared-pat_{host}_{user}.json")


def load_shared_access_token(secrets_dir: str, api_host: str, username: str) -> str | None:
    account = shared_pat_keyring_user(api_host, username)
    try:
        import keyring

        token = keyring.get_password(KEYRING_SERVICE, account)
        if token:
            return token
    except Exception as exc:
        _log.warning("Shared PAT keyring read failed: %s", exc)

    pat_path = shared_pat_metadata_path(secrets_dir, api_host, username).replace(".json", ".pat")
    if os.path.exists(pat_path):
        try:
            with open(pat_path, encoding="utf-8") as fh:
                token = fh.read().strip()
                return token or None
        except Exception as exc:
            _log.warning("Shared PAT file read failed: %s", exc)
    return None


def save_shared_access_token(
    secrets_dir: str,
    api_host: str,
    username: str,
    access_token: str,
    *,
    user_id: int | None = None,
) -> None:
    os.makedirs(secrets_dir, exist_ok=True)
    account = shared_pat_keyring_user(api_host, username)
    try:
        import keyring

        keyring.set_password(KEYRING_SERVICE, account, access_token)
    except Exception as exc:
        _log.warning("Shared PAT keyring write failed: %s", exc)

    meta_path = shared_pat_metadata_path(secrets_dir, api_host, username)
    metadata: dict[str, Any] = {"username": username, "apiHost": normalize_api_host(api_host)}
    if user_id is not None:
        metadata["userId"] = user_id
    with open(meta_path, "w", encoding="utf-8") as fh:
        json.dump(metadata, fh, indent=2)

    pat_path = meta_path.replace(".json", ".pat")
    try:
        with open(pat_path, "w", encoding="utf-8") as fh:
            fh.write(access_token)
    except Exception as exc:
        _log.warning("Shared PAT file write failed: %s", exc)
