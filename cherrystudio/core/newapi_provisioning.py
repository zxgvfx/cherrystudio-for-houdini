import json
import logging
import os
import urllib.request
from typing import Any

from .paths import get_base_dir

_log = logging.getLogger("NewApiProvisioning")

KEYRING_SERVICE = "cherrystudio.newapi"


class NewApiProvisioningService:
    def provision_provider(self, provider: dict[str, Any]) -> dict[str, Any]:
        if provider.get("apiKeyMode") != "per-user-provisioned":
            return provider

        provisioning = provider.get("provisioning") or {}
        if (provisioning.get("provider") or "newapi") != "newapi":
            _log.warning("Unsupported provisioning provider for %s", provider.get("id"))
            return {**provider, "apiKey": ""}

        username = self._resolve_username(provisioning.get("usernameSource") or "local-config")
        _log.info("Provisioning NewAPI provider=%s username=%s", provider.get("id"), username)
        print(f"[NewAPI Provisioning] start provider={provider.get('id')} username={username}")
        cached = self._load_secret(provider.get("id", "newapi"), username)
        if cached and cached.get("apiKey") and self._is_api_key_usable(provider["apiHost"], cached["apiKey"]):
            _log.info("Using cached NewAPI key for provider=%s username=%s", provider.get("id"), username)
            print(f"[NewAPI Provisioning] using cached key provider={provider.get('id')} username={username}")
            return {**provider, "apiKey": cached["apiKey"]}

        try:
            provisioned = self._provision_newapi_key(provider, username, provisioning)
            self._save_secret(provider.get("id", "newapi"), username, provisioned)
            _log.info(
                "Provisioned NewAPI key for provider=%s username=%s userId=%s tokenId=%s",
                provider.get("id"),
                username,
                provisioned.get("userId"),
                provisioned.get("tokenId"),
            )
            print(
                "[NewAPI Provisioning] success "
                f"provider={provider.get('id')} username={username} "
                f"userId={provisioned.get('userId')} tokenId={provisioned.get('tokenId')}"
            )
            return {**provider, "apiKey": provisioned["apiKey"]}
        except Exception as exc:
            _log.error("Failed to provision NewAPI key for %s: %s", provider.get("id"), exc)
            print(f"[NewAPI Provisioning] failed provider={provider.get('id')} username={username}: {exc}")
            return {**provider, "apiKey": ""}

    def _resolve_username(self, username_source: str) -> str:
        if username_source == "local-config":
            config_path = os.path.join(get_base_dir(), "config", "newapi-user.json")
            if os.path.exists(config_path):
                try:
                    with open(config_path, "r", encoding="utf-8") as fh:
                        username = (json.load(fh).get("username") or "").strip()
                        if username:
                            return username
                except Exception as exc:
                    _log.warning("Failed to read NewAPI user config: %s", exc)

        if username_source == "ldap":
            _log.warning("LDAP username resolution is not implemented yet, falling back to system username")

        username = os.environ.get("USERNAME") or os.environ.get("USER")
        if not username:
            raise RuntimeError("Unable to resolve NewAPI username")
        return username

    def _load_secret(self, provider_id: str, username: str) -> dict[str, Any] | None:
        metadata_path = self._metadata_path(provider_id, username)
        if not os.path.exists(metadata_path):
            return None

        try:
            with open(metadata_path, "r", encoding="utf-8") as fh:
                metadata = json.load(fh)
            api_key = self._get_keyring_password(provider_id, username)
            if not api_key:
                return None
            return {**metadata, "apiKey": api_key}
        except Exception as exc:
            _log.warning("Failed to read NewAPI secret metadata: %s", exc)
            return None

    def _save_secret(self, provider_id: str, username: str, secret: dict[str, Any]) -> None:
        metadata_path = self._metadata_path(provider_id, username)
        os.makedirs(os.path.dirname(metadata_path), exist_ok=True)
        metadata = {k: v for k, v in secret.items() if k != "apiKey"}
        with open(metadata_path, "w", encoding="utf-8") as fh:
            json.dump(metadata, fh, indent=2)
        self._set_keyring_password(provider_id, username, secret["apiKey"])

    def _metadata_path(self, provider_id: str, username: str) -> str:
        safe_provider = self._sanitize(provider_id)
        safe_username = self._sanitize(username)
        return os.path.join(get_base_dir(), "config", "secrets", "newapi", f"{safe_provider}-{safe_username}.json")

    def _sanitize(self, value: str) -> str:
        return "".join(ch if ch.isalnum() or ch in "_.-" else "_" for ch in value)

    def _get_keyring_password(self, provider_id: str, username: str) -> str | None:
        try:
            import keyring

            return keyring.get_password(KEYRING_SERVICE, f"{provider_id}:{username}:apiKey")
        except Exception as exc:
            _log.warning("Python keyring is unavailable for NewAPI secret reads: %s", exc)
            return None

    def _set_keyring_password(self, provider_id: str, username: str, api_key: str) -> None:
        try:
            import keyring

            keyring.set_password(KEYRING_SERVICE, f"{provider_id}:{username}:apiKey", api_key)
        except Exception as exc:
            _log.warning("Python keyring is unavailable for NewAPI secret writes: %s", exc)

    def _provision_newapi_key(
        self,
        provider: dict[str, Any],
        username: str,
        provisioning: dict[str, Any],
    ) -> dict[str, Any]:
        if not provisioning.get("endpoint"):
            raise RuntimeError("NewAPI provisioning endpoint is not configured")
        return self._provision_via_endpoint(provider, username, provisioning)

    def _provision_via_endpoint(
        self,
        provider: dict[str, Any],
        username: str,
        provisioning: dict[str, Any],
    ) -> dict[str, Any]:
        payload = {
            "providerId": provider.get("id"),
            "apiHost": provider.get("apiHost"),
            "username": username,
            "tokenName": provisioning.get("tokenName") or "cherrystudio-default",
            "group": provisioning.get("group") or "default",
        }
        headers = {"Content-Type": "application/json"}
        secret = self._clean_env_secret(provisioning.get("secret")) or self._clean_env_secret(
            os.environ.get("PROVISION_SHARED_SECRET")
        )
        if secret:
            headers["X-Provision-Secret"] = secret
        req = urllib.request.Request(
            provisioning["endpoint"],
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = json.loads(resp.read().decode("utf-8"))

        if isinstance(body, dict) and body.get("success") is False:
            raise RuntimeError(body.get("message") or "NewAPI provisioning endpoint failed")

        data = body.get("data") if isinstance(body, dict) and "data" in body else body
        if not isinstance(data, dict) or not data.get("apiKey"):
            raise RuntimeError("NewAPI provisioning endpoint response is missing apiKey")

        return {
            "providerId": provider.get("id"),
            "username": username,
            "userId": data.get("userId"),
            "tokenId": data.get("tokenId"),
            "tokenName": data.get("tokenName") or provisioning.get("tokenName") or "cherrystudio-default",
            "apiKey": data["apiKey"],
        }

    def _is_api_key_usable(self, api_host: str, api_key: str) -> bool:
        req = urllib.request.Request(
            f"{api_host.rstrip('/')}/v1/models",
            headers={"Authorization": f"Bearer {api_key}"},
            method="GET",
        )
        try:
            with urllib.request.urlopen(req, timeout=5) as resp:
                return 200 <= resp.status < 300
        except Exception:
            return False

    def _clean_env_secret(self, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        if len(cleaned) >= 2 and cleaned[0] == cleaned[-1] and cleaned[0] in {'"', "'"}:
            return cleaned[1:-1]
        return cleaned


newapi_provisioning_service = NewApiProvisioningService()
