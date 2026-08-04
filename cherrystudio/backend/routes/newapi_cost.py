"""
NewAPI 每次请求费用查询路由

前端在一次对话完成后调用本接口，后端用存储在本机 keyring 的“访问令牌”查询
NewAPI 消费日志（/api/log/self），把内部 quota 换算成金额后返回。访问令牌只在
后端进程内使用，不会下发到渲染进程。
"""

from typing import Any

from ..server import route
from ...core.config_manager import config_manager
from ...core.newapi_provisioning import newapi_provisioning_service
from ...utils.logger import network_logger

_log = network_logger


@route("/api/v1/newapi/last-cost", methods=["POST"])
def newapi_last_cost(ctx: dict) -> Any:
    """查询最近一次匹配请求的费用。

    请求体：
      - providerId (必填)：集中式 provider 的 id
      - modelName / promptTokens / completionTokens / sinceTs（可选，用于精确匹配）
    """
    body = ctx.get("body", {}) or {}
    provider_id = body.get("providerId")
    # Entry log: proves the route is reachable and the frontend actually called it.
    _log(f"[newapi/last-cost] request provider={provider_id} model={body.get('modelName')}")
    if not provider_id:
        return {"ok": False, "reason": "providerId required"}

    try:
        cfg = config_manager.load() or {}
        providers = cfg.get("centralizedProviders", []) or []
        provider = next((p for p in providers if p.get("id") == provider_id), None)
        if not provider:
            return {"ok": False, "reason": "provider not found"}

        result = newapi_provisioning_service.get_last_request_cost(
            provider,
            model_name=body.get("modelName"),
            prompt_tokens=body.get("promptTokens"),
            completion_tokens=body.get("completionTokens"),
            since_ts=body.get("sinceTs"),
        )
        if not result.get("ok"):
            _log(f"[newapi/last-cost] miss provider={provider_id} model={body.get('modelName')} reason={result.get('reason')}")
        else:
            _log(f"[newapi/last-cost] hit provider={provider_id} quota={result.get('quota')} cost={result.get('cost')}")
        return result
    except Exception as e:  # noqa: BLE001 - never break the caller over billing lookup
        _log(f"[newapi/last-cost] {e}")
        return {"ok": False, "reason": str(e)}


@route("/api/v1/newapi/account-summary", methods=["GET", "POST"])
def newapi_account_summary(ctx: dict) -> Any:
    """Return per-user NewAPI wallet summary (balance, spent, masked API key)."""
    body = ctx.get("body", {}) or {}
    query = ctx.get("query", {}) or {}
    provider_id = body.get("providerId") or query.get("providerId")
    if not provider_id:
        return {"ok": False, "reason": "providerId required"}

    try:
        cfg = config_manager.load() or {}
        providers = cfg.get("centralizedProviders", []) or []
        provider = next((p for p in providers if p.get("id") == provider_id), None)
        if not provider:
            return {"ok": False, "reason": "provider not found"}

        return newapi_provisioning_service.get_account_summary(provider)
    except Exception as e:
        _log(f"[newapi/account-summary] {e}")
        return {"ok": False, "reason": str(e)}
