import json
import logging
import os
import time
import urllib.request
from typing import Any

from .paths import get_base_dir
from .newapi_shared_pat import (
    AccessTokenInvalidError,
    load_shared_access_token,
    save_shared_access_token,
)
from .newapi_status import fetch_display_rates

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
            api_host = provider["apiHost"]
            ct = provisioning.get("costTracking") or {}
            shared_pat = load_shared_access_token(self._secrets_dir(), api_host, username)
            if shared_pat:
                cached["accessToken"] = shared_pat
            elif ct.get("enabled") and not cached.get("accessToken"):
                try:
                    _log.info(
                        "Cached NewAPI key missing accessToken for provider=%s username=%s; re-provisioning",
                        provider.get("id"),
                        username,
                    )
                    print(
                        f"[NewAPI Provisioning] refreshing accessToken "
                        f"provider={provider.get('id')} username={username}"
                    )
                    provisioned = self._provision_newapi_key(provider, username, provisioning)
                    if provisioned.get("accessToken"):
                        cached = {
                            **cached,
                            "userId": provisioned.get("userId") or cached.get("userId"),
                            "tokenId": provisioned.get("tokenId") or cached.get("tokenId"),
                            "tokenName": provisioned.get("tokenName") or cached.get("tokenName"),
                            "accessToken": provisioned["accessToken"],
                        }
                        save_shared_access_token(
                            self._secrets_dir(),
                            api_host,
                            username,
                            provisioned["accessToken"],
                            user_id=cached.get("userId"),
                        )
                        self._save_secret(provider.get("id", "newapi"), username, cached, api_host=api_host)
                except Exception as exc:
                    _log.warning("Failed to refresh NewAPI accessToken for %s: %s", provider.get("id"), exc)

            _log.info("Using cached NewAPI key for provider=%s username=%s", provider.get("id"), username)
            print(f"[NewAPI Provisioning] using cached key provider={provider.get('id')} username={username}")
            return {
                **provider,
                "apiKey": cached["apiKey"],
                "costTracking": self._public_cost_tracking(provisioning, bool(cached.get("accessToken"))),
            }

        try:
            provisioned = self._provision_newapi_key(provider, username, provisioning)
            if provisioned.get("accessToken"):
                save_shared_access_token(
                    self._secrets_dir(),
                    provider["apiHost"],
                    username,
                    provisioned["accessToken"],
                    user_id=provisioned.get("userId"),
                )
            self._save_secret(provider.get("id", "newapi"), username, provisioned, api_host=provider["apiHost"])
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
            return {
                **provider,
                "apiKey": provisioned["apiKey"],
                "costTracking": self._public_cost_tracking(provisioning, bool(provisioned.get("accessToken"))),
            }
        except Exception as exc:
            _log.error("Failed to provision NewAPI key for %s: %s", provider.get("id"), exc)
            print(f"[NewAPI Provisioning] failed provider={provider.get('id')} username={username}: {exc}")
            return {**provider, "apiKey": ""}

    def _public_cost_tracking(self, provisioning: dict[str, Any], has_access_token: bool) -> dict[str, Any]:
        """Frontend-visible cost-tracking hint (never includes the access token).

        Returned to the renderer so it knows whether to query per-request cost and
        which currency symbol to render. The heavy lifting (calling /api/log/self,
        quota->money conversion) happens in the local backend, keeping the PAT off
        the renderer entirely.
        """
        ct = provisioning.get("costTracking") or {}
        enabled = has_access_token and ct.get("enabled") is not False
        return {
            "enabled": bool(enabled),
            "currency": ct.get("currency") or "$",
        }

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
            # accessToken is optional: older secrets (provisioned before cost
            # tracking) won't have one, and cost lookups degrade gracefully.
            access_token = self._get_keyring_password(provider_id, username, field="accessToken")
            if not access_token:
                access_token = self._read_access_token_file(metadata_path)
            return {**metadata, "apiKey": api_key, "accessToken": access_token}
        except Exception as exc:
            _log.warning("Failed to read NewAPI secret metadata: %s", exc)
            return None

    def _save_secret(
        self,
        provider_id: str,
        username: str,
        secret: dict[str, Any],
        *,
        api_host: str | None = None,
    ) -> None:
        metadata_path = self._metadata_path(provider_id, username)
        os.makedirs(os.path.dirname(metadata_path), exist_ok=True)
        host = api_host or secret.get("apiHost")
        # Keep secrets (apiKey/accessToken) out of the plaintext metadata file.
        metadata = {k: v for k, v in secret.items() if k not in ("apiKey", "accessToken")}
        if host:
            metadata["apiHost"] = host
        metadata["hasAccessToken"] = bool(secret.get("accessToken"))
        with open(metadata_path, "w", encoding="utf-8") as fh:
            json.dump(metadata, fh, indent=2)
        self._set_keyring_password(provider_id, username, secret["apiKey"])
        access_token = secret.get("accessToken")
        if access_token:
            if host:
                save_shared_access_token(
                    self._secrets_dir(),
                    host,
                    username,
                    access_token,
                    user_id=secret.get("userId"),
                )
            self._set_keyring_password(provider_id, username, access_token, field="accessToken")
            # File fallback when keyring write silently fails on some Windows hosts.
            self._write_access_token_file(metadata_path, access_token)
            _log.info("Saved accessToken for %s/%s (len=%d)", provider_id, username, len(access_token))
            print(f"[NewAPI Provisioning] accessToken saved provider={provider_id} username={username}")

    def _secrets_dir(self) -> str:
        return os.path.join(get_base_dir(), "config", "secrets", "newapi")

    def _metadata_path(self, provider_id: str, username: str) -> str:
        safe_provider = self._sanitize(provider_id)
        safe_username = self._sanitize(username)
        return os.path.join(self._secrets_dir(), f"{safe_provider}-{safe_username}.json")

    def _sanitize(self, value: str) -> str:
        return "".join(ch if ch.isalnum() or ch in "_.-" else "_" for ch in value)

    def _get_keyring_password(self, provider_id: str, username: str, field: str = "apiKey") -> str | None:
        try:
            import keyring

            return keyring.get_password(KEYRING_SERVICE, f"{provider_id}:{username}:{field}")
        except Exception as exc:
            _log.warning("Python keyring is unavailable for NewAPI secret reads: %s", exc)
            return None

    def _set_keyring_password(self, provider_id: str, username: str, value: str, field: str = "apiKey") -> None:
        try:
            import keyring

            keyring.set_password(KEYRING_SERVICE, f"{provider_id}:{username}:{field}", value)
        except Exception as exc:
            _log.warning("Python keyring is unavailable for NewAPI secret writes: %s", exc)

    def _access_token_file_path(self, metadata_path: str) -> str:
        return metadata_path.replace(".json", ".pat")

    def _write_access_token_file(self, metadata_path: str, access_token: str) -> None:
        try:
            pat_path = self._access_token_file_path(metadata_path)
            with open(pat_path, "w", encoding="utf-8") as fh:
                fh.write(access_token)
        except Exception as exc:
            _log.warning("Failed to write accessToken file fallback: %s", exc)

    def _read_access_token_file(self, metadata_path: str) -> str | None:
        pat_path = self._access_token_file_path(metadata_path)
        if not os.path.exists(pat_path):
            return None
        try:
            with open(pat_path, encoding="utf-8") as fh:
                token = fh.read().strip()
                return token or None
        except Exception as exc:
            _log.warning("Failed to read accessToken file fallback: %s", exc)
            return None

    def _resolve_access_credentials(
        self,
        provider: dict[str, Any],
        username: str,
    ) -> tuple[dict[str, Any] | None, str | None, int | None]:
        provider_id = provider.get("id", "newapi")
        api_host = provider.get("apiHost")
        secret = self._load_secret(provider_id, username)
        if not secret or not api_host:
            return secret, None, None

        shared_pat = load_shared_access_token(self._secrets_dir(), api_host, username)
        if shared_pat:
            secret["accessToken"] = shared_pat
        elif secret.get("accessToken"):
            save_shared_access_token(
                self._secrets_dir(),
                api_host,
                username,
                secret["accessToken"],
                user_id=secret.get("userId"),
            )

        user_id = secret.get("userId")
        return secret, secret.get("accessToken"), int(user_id) if user_id is not None else None

    def _refresh_access_token(
        self,
        provider: dict[str, Any],
        username: str,
        provisioning: dict[str, Any],
        *,
        secret: dict[str, Any] | None = None,
    ) -> str | None:
        provisioned = self._provision_newapi_key(provider, username, provisioning)
        access_token = provisioned.get("accessToken")
        if not access_token:
            return None

        api_host = provider.get("apiHost")
        if not api_host:
            return access_token

        save_shared_access_token(
            self._secrets_dir(),
            api_host,
            username,
            access_token,
            user_id=provisioned.get("userId") or (secret or {}).get("userId"),
        )

        if secret is not None:
            updated = {
                **secret,
                "accessToken": access_token,
                "userId": provisioned.get("userId") or secret.get("userId"),
            }
            self._save_secret(provider.get("id", "newapi"), username, updated, api_host=api_host)

        _log.info("Refreshed shared NewAPI access token for %s/%s", provider.get("id"), username)
        print(f"[NewAPI Provisioning] refreshed shared accessToken username={username}")
        return access_token

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
            # Optional: management-API access token (PAT) used to read per-request
            # billing from /api/log/self. May be absent on older services.
            "accessToken": data.get("accessToken"),
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

    # ── Per-request cost lookup (NewAPI /api/log/self) ──────────────────────────

    def get_last_request_cost(
        self,
        provider: dict[str, Any],
        *,
        model_name: str | None = None,
        prompt_tokens: int | None = None,
        completion_tokens: int | None = None,
        since_ts: int | None = None,
        retries: int = 6,
        retry_delay: float = 0.6,
    ) -> dict[str, Any]:
        """Look up the exact money cost of the most recent matching request.

        Reads NewAPI consumption logs (``/api/log/self``) with the stored access
        token, matches the log entry for the request (by model + token counts +
        timestamp), and converts the internal ``quota`` to money. The access token
        never leaves this process.

        Returns ``{"ok": True, "cost": <number>, "currency": ..., "quota": ...}``
        or ``{"ok": False, "reason": ...}``.
        """
        provisioning = provider.get("provisioning") or {}
        api_host = provider.get("apiHost")
        if not api_host:
            return {"ok": False, "reason": "no-api-host"}

        username = self._resolve_username(provisioning.get("usernameSource") or "local-config")
        secret, access_token, user_id = self._resolve_access_credentials(provider, username)
        if not secret:
            return {"ok": False, "reason": "no-secret"}

        if not access_token or user_id is None:
            access_token = self._refresh_access_token(provider, username, provisioning, secret=secret)
            if secret.get("userId") is not None:
                user_id = secret.get("userId")
            if not access_token or user_id is None:
                return {"ok": False, "reason": "no-access-token"}

        cfg = self._get_cost_tracking(provisioning, api_host)
        currency = cfg["currency"]
        if currency in ("¥", "CNY", "cny", "rmb", "RMB"):
            currency = "¥"

        last_error: str | None = None
        refreshed_pat = False
        for attempt in range(max(1, retries)):
            try:
                item = self._find_matching_log(
                    api_host,
                    access_token,
                    int(user_id),
                    model_name=model_name,
                    prompt_tokens=prompt_tokens,
                    completion_tokens=completion_tokens,
                    since_ts=since_ts,
                )
            except AccessTokenInvalidError as exc:
                last_error = str(exc)
                if refreshed_pat:
                    item = None
                else:
                    new_pat = self._refresh_access_token(
                        provider, username, provisioning, secret=secret
                    )
                    refreshed_pat = True
                    if new_pat:
                        access_token = new_pat
                        item = None
                        continue
                    item = None
            except Exception as exc:  # noqa: BLE001 - network/parse issues are non-fatal
                last_error = str(exc)
                item = None

            if item is not None:
                quota = item.get("quota") or 0
                cost = self._quota_to_money(int(quota), provisioning, api_host)
                usd = (quota or 0) / cfg["quotaPerUnit"]
                return {
                    "ok": True,
                    "quota": quota,
                    "usd": round(usd, 6),
                    "cost": cost,
                    "currency": currency,
                    "modelName": item.get("model_name"),
                    "createdAt": item.get("created_at"),
                    "promptTokens": item.get("prompt_tokens"),
                    "completionTokens": item.get("completion_tokens"),
                }

            if attempt < retries - 1:
                time.sleep(retry_delay)

        return {"ok": False, "reason": last_error or "not-found"}

    # ── Account summary (/api/user/self) ────────────────────────────────────────

    def _get_cost_tracking(self, provisioning: dict[str, Any], api_host: str | None = None) -> dict[str, Any]:
        ct = provisioning.get("costTracking") or {}
        currency = ct.get("currency") or "¥"

        rates = fetch_display_rates(api_host or "")
        quota_per_unit = rates["quotaPerUnit"]
        display_rate = rates["usdExchangeRate"]

        # Optional legacy overrides in centralized-config (normally omitted).
        try:
            if ct.get("quotaPerUnit"):
                quota_per_unit = int(ct["quotaPerUnit"]) or quota_per_unit
        except (TypeError, ValueError):
            pass
        try:
            if ct.get("cnyPerUsd"):
                display_rate = float(ct["cnyPerUsd"]) or display_rate
        except (TypeError, ValueError):
            pass

        return {
            "quotaPerUnit": quota_per_unit,
            "usdExchangeRate": display_rate,
            "cnyPerUsd": display_rate,
            "currency": currency,
        }

    def _quota_to_money(self, quota: int, provisioning: dict[str, Any], api_host: str) -> float:
        """Convert internal NewAPI quota units to display money.

        ``group_ratio`` is already included in ``quota`` when the log was written.
        Only multiply by the site ``usd_exchange_rate`` from ``GET /api/status``.
        """
        cfg = self._get_cost_tracking(provisioning, api_host)
        usd = (quota or 0) / cfg["quotaPerUnit"]
        if cfg["currency"] in ("¥", "CNY", "cny", "rmb", "RMB"):
            return round(usd * cfg["usdExchangeRate"], 4)
        return round(usd, 4)

    def _mask_api_key(self, api_key: str | None) -> str:
        if not api_key:
            return ""
        if len(api_key) <= 8:
            return "••••"
        return f"{api_key[:7]}…{api_key[-4:]}"

    def get_account_summary(self, provider: dict[str, Any]) -> dict[str, Any]:
        """Return per-user NewAPI wallet summary for the top-bar UI.

        Data source: ``GET /api/user/self`` — **account-level** ``used_quota`` /
        ``quota``, NOT per API key / token. Display rates come from ``GET /api/status``
        (``usd_exchange_rate`` + ``quota_per_unit``); group ratios are already in quota.
        """
        provisioning = provider.get("provisioning") or {}
        api_host = provider.get("apiHost")
        if not api_host:
            return {"ok": False, "reason": "no-api-host"}

        username = self._resolve_username(provisioning.get("usernameSource") or "local-config")
        secret, access_token, user_id = self._resolve_access_credentials(provider, username)
        if not secret:
            return {"ok": False, "reason": "no-secret"}

        if not access_token or user_id is None:
            access_token = self._refresh_access_token(provider, username, provisioning, secret=secret)
            user_id = secret.get("userId") if user_id is None else user_id
            if not access_token or user_id is None:
                return {"ok": False, "reason": "no-access-token"}

        cfg = self._get_cost_tracking(provisioning, api_host)
        currency = cfg["currency"]
        if currency in ("¥", "CNY", "cny", "rmb", "RMB"):
            currency = "¥"
        unlimited = bool(provisioning.get("unlimitedQuota"))

        url = f"{api_host.rstrip('/')}/api/user/self"

        def fetch_self(token: str) -> dict[str, Any]:
            request = urllib.request.Request(
                url,
                headers={
                    "Authorization": f"Bearer {token}",
                    "New-API-User": str(user_id),
                },
                method="GET",
            )
            with opener.open(request, timeout=10) as resp:
                return json.loads(resp.read().decode("utf-8"))

        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        try:
            body = fetch_self(access_token)
        except Exception as exc:
            return {"ok": False, "reason": str(exc)}

        if isinstance(body, dict) and body.get("success") is False:
            msg = str(body.get("message") or "")
            if "invalid access token" in msg.lower() or "unauthorized" in msg.lower():
                new_pat = self._refresh_access_token(provider, username, provisioning, secret=secret)
                if new_pat:
                    access_token = new_pat
                    if secret.get("userId") is not None:
                        user_id = secret.get("userId")
                    try:
                        body = fetch_self(access_token)
                    except Exception as exc:
                        return {"ok": False, "reason": str(exc)}
                else:
                    return {"ok": False, "reason": msg}

        data = body.get("data") if isinstance(body, dict) and "data" in body else body
        if not isinstance(data, dict):
            return {"ok": False, "reason": "invalid-user-self-response"}

        quota = int(data.get("quota") or 0)
        used_quota = int(data.get("used_quota") or 0)
        return {
            "ok": True,
            "spendingScope": "account",
            "username": data.get("username") or username,
            "userId": user_id,
            "quota": quota,
            "usedQuota": used_quota,
            "balance": None if unlimited else self._quota_to_money(quota, provisioning, api_host),
            "spent": self._quota_to_money(used_quota, provisioning, api_host),
            "currency": currency,
            "unlimitedQuota": unlimited,
            "requestCount": int(data.get("request_count") or 0),
            "quotaPerUnit": cfg["quotaPerUnit"],
            "cnyPerUsd": cfg["usdExchangeRate"],
        }

    def _find_matching_log(
        self,
        api_host: str,
        access_token: str,
        user_id: int,
        *,
        model_name: str | None,
        prompt_tokens: int | None,
        completion_tokens: int | None,
        since_ts: int | None,
    ) -> dict[str, Any] | None:
        url = f"{api_host.rstrip('/')}/api/log/self?p=1&page_size=20&type=2"
        req = urllib.request.Request(
            url,
            headers={
                "Authorization": f"Bearer {access_token}",
                # Match NewAPI docs / working curl spelling.
                "New-API-User": str(user_id),
            },
            method="GET",
        )
        # Bypass any system proxy for the gateway management API, mirroring how the
        # Qt proxy layer isolates localhost calls. Some hosts route new-api through
        # a SOCKS proxy that mangles these management requests.
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        try:
            with opener.open(req, timeout=10) as resp:
                status = getattr(resp, "status", 200)
                raw = resp.read().decode("utf-8")
        except Exception as exc:
            print(f"[newapi/last-cost] log query error user_id={user_id} tok=…{access_token[-4:]} err={exc}")
            raise

        body = json.loads(raw)
        if isinstance(body, dict) and body.get("success") is False:
            msg = str(body.get("message") or "")
            print(
                f"[newapi/last-cost] log query user_id={user_id} tok=…{access_token[-4:]} "
                f"status={status} success=False msg={msg!r} items=0"
            )
            if "invalid access token" in msg.lower() or "unauthorized" in msg.lower():
                raise AccessTokenInvalidError(msg)
            return None

        data = body.get("data") if isinstance(body, dict) else None
        items = (data or {}).get("items") if isinstance(data, dict) else None
        count = len(items) if isinstance(items, list) else 0
        print(
            f"[newapi/last-cost] log query user_id={user_id} tok=…{access_token[-4:]} "
            f"status={status} success={body.get('success') if isinstance(body, dict) else '?'} "
            f"msg={body.get('message') if isinstance(body, dict) else '?'!r} items={count}"
        )
        if not isinstance(items, list) or not items:
            return None

        def recent_enough(it: dict[str, Any]) -> bool:
            if since_ts is None:
                return True
            # 30s slack: client clock vs gateway clock can drift on some hosts.
            return (it.get("created_at") or 0) >= since_ts - 30

        # Strictest match first (model + both token counts), then progressively
        # looser fallbacks. Items are returned newest-first by NewAPI.
        for it in items:
            if not recent_enough(it):
                continue
            if model_name and it.get("model_name") != model_name:
                continue
            if prompt_tokens is not None and it.get("prompt_tokens") != prompt_tokens:
                continue
            if completion_tokens is not None and it.get("completion_tokens") != completion_tokens:
                continue
            return it

        for it in items:
            if not recent_enough(it):
                continue
            if model_name and it.get("model_name") != model_name:
                continue
            return it

        # Last resort: newest consumption log (ignore timestamp) when gateway
        # clocks are far apart from the client.
        if items:
            if model_name:
                for it in items:
                    if it.get("model_name") == model_name:
                        return it
            return items[0]

        return None


newapi_provisioning_service = NewApiProvisioningService()
