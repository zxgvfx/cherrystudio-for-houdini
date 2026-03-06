"""
模型管理路由

对应原 CherryStudioAPI 中的 model* / ollama* 方法。
"""

import json
import urllib.request
import urllib.error
from typing import Any

from ..server import route
from ...utils.logger import network_logger

_log = network_logger


@route("/api/v1/models/list", methods=["POST"])
def model_list(ctx: dict) -> Any:
    """
    获取外部模型列表（通用 HTTP 请求）。
    接收: { url, method, headers, apiKey, apiHeader, apiScheme, body, fallback }
    """
    config = ctx["body"]
    url = config.get("url")
    if not url:
        return config.get("fallback", {"object": "list", "data": []})

    method = str(config.get("method", "GET")).upper()
    headers = dict(config.get("headers") or {})
    api_key = config.get("apiKey") or config.get("api_key")
    header_name = config.get("apiHeader") or config.get("api_header") or "Authorization"
    scheme = config.get("apiScheme") or config.get("api_scheme") or "Bearer"
    if api_key and header_name and header_name not in headers:
        if header_name.lower() == "authorization":
            headers["Authorization"] = f"{scheme} {api_key}".strip()
        else:
            headers[header_name] = api_key

    body = config.get("body")
    body_bytes = None
    if body:
        if isinstance(body, dict):
            body = json.dumps(body)
        if isinstance(body, str):
            body_bytes = body.encode("utf-8")

    req = urllib.request.Request(url, data=body_bytes, method=method)
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    if body_bytes:
        req.add_header("Content-Type", "application/json")
    for k, v in headers.items():
        try:
            req.add_header(str(k), str(v))
        except Exception:
            continue

    try:
        with urllib.request.urlopen(req, timeout=15.0) as resp:
            raw = resp.read().decode("utf-8", errors="ignore")
            try:
                return json.loads(raw)
            except json.JSONDecodeError:
                return raw
    except urllib.error.HTTPError as e:
        _log(f"[models/list] HTTP {e.code}: {url}")
        if e.code == 401:
            return {"object": "list", "data": [], "error": "API key required"}
        return config.get("fallback", {"object": "list", "data": []})
    except Exception as e:
        _log(f"[models/list] {e}")
        return config.get("fallback", {"object": "list", "data": []})


@route("/api/v1/models/ollama-list", methods=["POST"])
def ollama_list_models(ctx: dict) -> Any:
    """列出本地 Ollama 模型"""
    body = ctx["body"]
    host = body.get("host", "http://localhost:11434")
    url = f"{host.rstrip('/')}/api/tags"
    try:
        req = urllib.request.Request(url, method="GET")
        req.add_header("User-Agent", "Cherry Studio")
        with urllib.request.urlopen(req, timeout=5.0) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        _log(f"[models/ollama-list] {e}")
        return {"models": [], "error": str(e)}


@route("/api/v1/models/ollama-pull", methods=["POST"])
def ollama_pull_model(ctx: dict) -> Any:
    """拉取 Ollama 模型"""
    body = ctx["body"]
    host = body.get("host", "http://localhost:11434")
    model_name = body.get("name", "")
    if not model_name:
        return {"success": False, "error": "model name required"}

    url = f"{host.rstrip('/')}/api/pull"
    req = urllib.request.Request(url, method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "Cherry Studio")
    req.data = json.dumps({"name": model_name}).encode("utf-8")
    try:
        with urllib.request.urlopen(req, timeout=1800.0) as resp:
            raw = resp.read().decode("utf-8", errors="ignore")
            try:
                return {"success": True, "data": json.loads(raw)}
            except json.JSONDecodeError:
                return {"success": True, "data": raw}
    except Exception as e:
        _log(f"[models/ollama-pull] {e}")
        return {"success": False, "error": str(e)}
