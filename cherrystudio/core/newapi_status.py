"""Fetch public display rates from NewAPI ``GET /api/status``.

Group ratios are applied server-side when quota is written to logs; clients only
need the site ``usd_exchange_rate`` (and ``quota_per_unit``) to convert stored
quota into display currency — never multiply by group_ratio again.
"""

from __future__ import annotations

import json
import logging
import time
import urllib.request
from typing import Any

_log = logging.getLogger("NewApiStatus")

_DEFAULT_QUOTA_PER_UNIT = 500_000.0
_DEFAULT_USD_EXCHANGE_RATE = 1.0
_CACHE_TTL_SECONDS = 300.0

_cache: dict[str, tuple[float, dict[str, float]]] = {}


def _parse_status_payload(body: Any) -> dict[str, float]:
    if not isinstance(body, dict):
        raise ValueError("invalid status response")

    data = body.get("data") if "data" in body else body
    if not isinstance(data, dict):
        raise ValueError("status response missing data object")

    quota_raw = data.get("quota_per_unit", _DEFAULT_QUOTA_PER_UNIT)
    rate_raw = data.get("usd_exchange_rate", _DEFAULT_USD_EXCHANGE_RATE)

    quota_per_unit = float(quota_raw)
    usd_exchange_rate = float(rate_raw)
    if quota_per_unit <= 0:
        quota_per_unit = _DEFAULT_QUOTA_PER_UNIT
    if usd_exchange_rate <= 0:
        usd_exchange_rate = _DEFAULT_USD_EXCHANGE_RATE

    return {
        "quotaPerUnit": quota_per_unit,
        "usdExchangeRate": usd_exchange_rate,
    }


def fetch_display_rates(api_host: str, *, timeout: float = 5.0, force_refresh: bool = False) -> dict[str, float]:
    """Return ``quotaPerUnit`` and ``usdExchangeRate`` from NewAPI status (cached)."""
    base = (api_host or "").rstrip("/")
    if not base:
        return {
            "quotaPerUnit": _DEFAULT_QUOTA_PER_UNIT,
            "usdExchangeRate": _DEFAULT_USD_EXCHANGE_RATE,
        }

    now = time.time()
    if not force_refresh:
        cached = _cache.get(base)
        if cached and cached[0] > now:
            return cached[1]

    url = f"{base}/api/status"
    req = urllib.request.Request(url, method="GET")
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    try:
        with opener.open(req, timeout=timeout) as resp:
            body = json.loads(resp.read().decode("utf-8"))
        rates = _parse_status_payload(body)
        _cache[base] = (now + _CACHE_TTL_SECONDS, rates)
        return rates
    except Exception as exc:
        _log.warning("Failed to fetch NewAPI status from %s: %s", base, exc)
        stale = _cache.get(base)
        if stale:
            return stale[1]
        return {
            "quotaPerUnit": _DEFAULT_QUOTA_PER_UNIT,
            "usdExchangeRate": _DEFAULT_USD_EXCHANGE_RATE,
        }
