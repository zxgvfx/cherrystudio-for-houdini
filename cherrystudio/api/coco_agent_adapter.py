"""Thin adapter: Cherry `type=coco` sessions proxy to ai-pipeline `/api/agents`.

Native `claude-code` / `pi` paths must not import or call this module.
"""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from typing import Any

from utils.logger import agent_server_logger

_log = agent_server_logger

_DEFAULT_API_BASE = "http://192.168.21.225:9331"


def _first_int(*values: Any) -> int:
    for value in values:
        if value is None or value == "":
            continue
        try:
            parsed = int(value)
        except (TypeError, ValueError):
            continue
        if parsed >= 0:
            return parsed
    return 0


def _cherry_usage(data: Any) -> dict[str, Any] | None:
    if not isinstance(data, dict):
        return None
    nested = data.get("usage") if isinstance(data.get("usage"), dict) else data
    if not isinstance(nested, dict):
        return None
    input_tokens = _first_int(
        nested.get("inputTokens"),
        nested.get("input_tokens"),
        nested.get("prompt_tokens"),
        nested.get("promptTokens"),
    )
    output_tokens = _first_int(
        nested.get("outputTokens"),
        nested.get("output_tokens"),
        nested.get("completion_tokens"),
        nested.get("completionTokens"),
    )
    cache_read = _first_int(
        nested.get("cacheReadTokens"),
        nested.get("cache_read_input_tokens"),
        nested.get("cache_read_tokens"),
    )
    cache_write = _first_int(
        nested.get("cacheWriteTokens"),
        nested.get("cache_creation_input_tokens"),
        nested.get("cache_write_tokens"),
    )
    reasoning = _first_int(nested.get("reasoningTokens"), nested.get("reasoning_tokens"))
    total = _first_int(nested.get("totalTokens"), nested.get("total_tokens"), input_tokens + output_tokens)
    if input_tokens == 0 and output_tokens == 0 and cache_read == 0 and cache_write == 0:
        return None
    return {
        "inputTokens": input_tokens,
        "outputTokens": output_tokens,
        "totalTokens": total or (input_tokens + output_tokens),
        "inputTokenDetails": {
            "cacheReadTokens": cache_read,
            "cacheWriteTokens": cache_write,
            "noCacheTokens": max(0, input_tokens - cache_read - cache_write),
        },
        "outputTokenDetails": {"textTokens": output_tokens, "reasoningTokens": reasoning},
    }


def _api_base() -> str:
    env = os.environ.get("PIPELINE_API_BASE")
    if env:
        return env.rstrip("/")
    cfg_path = os.path.join(os.path.expanduser("~"), ".cherrystudio", "ai-pipeline-bridge.json")
    if os.path.isfile(cfg_path):
        try:
            with open(cfg_path, "r", encoding="utf-8") as handle:
                cfg = json.load(handle) or {}
            base = cfg.get("api_base")
            if base:
                return str(base).rstrip("/")
        except Exception as exc:  # noqa: BLE001
            _log(f"[coco] bridge config read failed: {exc}")
    return _DEFAULT_API_BASE


def _username() -> str:
    return os.environ.get("USERNAME") or os.environ.get("USER") or os.environ.get("LOGNAME") or "unknown"


def _split_model(model: str) -> tuple[str | None, str | None]:
    raw = (model or "").strip()
    if not raw:
        return None, None
    if "::" in raw:
        provider, model_id = raw.split("::", 1)
        return provider or None, model_id or None
    if ":" in raw:
        provider, model_id = raw.split(":", 1)
        return provider or None, model_id or None
    return None, raw


def _coco_mode(configuration: dict) -> str:
    value = configuration.get("coco_mode")
    return value if value in {"agent", "plan", "ask", "debug", "multitask"} else "agent"


def _coco_permission(configuration: dict) -> str:
    value = configuration.get("coco_permission")
    return value if value in {"ask", "auto", "read_only"} else "ask"


def _request(pathname: str, *, method: str = "GET", body: dict | None = None, stream: bool = False):
    url = f"{_api_base()}{pathname}"
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    req.add_header("X-User-Key", _username())
    if stream:
        req.add_header("Accept", "application/x-ndjson")
    try:
        return urllib.request.urlopen(req, timeout=600)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(detail or f"pipeline {method} {pathname} failed: {exc.code}") from exc


def ensure_pipeline_session(agent: dict, session: dict) -> str:
    cfg = dict(session.get("configuration") or {})
    existing = cfg.get("coco_pipeline_session_id")
    if existing:
        return str(existing)
    provider_id, model_id = _split_model(session.get("model") or agent.get("model") or "")
    created = json.load(
        _request(
            "/api/agents/sessions",
            method="POST",
            body={
                "context": {
                    "actor_id": _username(),
                    "provider_id": provider_id,
                    "model": model_id,
                    "mode": _coco_mode(cfg),
                    "permission_mode": _coco_permission(cfg),
                    "allow_write": _coco_permission(cfg) == "auto",
                    "metadata": {
                        "coco_owned_canvas": True,
                        "cherry_agent_id": agent.get("id"),
                        "cherry_agent_name": agent.get("name") or "",
                        "cherry_session_id": session.get("id"),
                        "title": session.get("name") or "",
                        "provenance": {
                            "username": _username(),
                            "agent_name": agent.get("name") or "-",
                            "agent_id": agent.get("id"),
                            "title": session.get("name") or "-",
                        },
                    },
                }
            },
        )
    )
    pipeline_id = created["id"]
    cfg["coco_pipeline_session_id"] = pipeline_id
    cfg["coco_pipeline_revision"] = created.get("revision") or 0
    from agent_server import SessionStorage

    SessionStorage.update_session(agent["id"], session["id"], {"configuration": cfg})
    session["configuration"] = cfg
    return pipeline_id


def _sse(handler: Any, chunk: dict) -> None:
    handler.wfile.write(f"data: {json.dumps(chunk, ensure_ascii=False)}\n\n".encode("utf-8"))
    handler.wfile.flush()


def handle_coco_messages(handler: Any, agent: dict, session: dict, content: str) -> None:
    """Stream a coco turn as Cherry AI-SDK SSE. Caller already sent SSE headers."""
    pipeline_id = ensure_pipeline_session(agent, session)
    snapshot = json.load(_request(f"/api/agents/sessions/{pipeline_id}"))
    cfg = dict(session.get("configuration") or {})
    provider_id, model_id = _split_model(session.get("model") or agent.get("model") or "")
    resp = _request(
        f"/api/agents/sessions/{pipeline_id}/messages",
        method="POST",
        body={
            "content": content,
            "expected_revision": snapshot.get("revision") or 0,
            "provider_id": provider_id,
            "model": model_id,
            "mode": _coco_mode(cfg),
            "permission_mode": _coco_permission(cfg),
        },
        stream=True,
    )
    message_id = f"msg_{os.urandom(8).hex()}"
    _sse(handler, {"type": "start", "messageId": message_id})
    _sse(handler, {"type": "start-step"})
    text_id = None
    assistant_text = []
    last_call_by_name: dict[str, str] = {}
    try:
        while True:
            line = resp.readline()
            if not line:
                break
            raw = line.decode("utf-8", errors="replace").strip()
            if not raw:
                continue
            try:
                event = json.loads(raw)
            except json.JSONDecodeError:
                continue
            event_type = event.get("type")
            data = event.get("data") or {}
            if event_type == "delta":
                text = str(data.get("text") or data.get("delta") or data.get("content") or "")
                if not text:
                    continue
                if text_id is None:
                    text_id = f"txt_{os.urandom(4).hex()}"
                    _sse(handler, {"type": "text-start", "id": text_id})
                assistant_text.append(text)
                _sse(handler, {"type": "text-delta", "id": text_id, "text": text})
            elif event_type == "message" and data.get("role") == "assistant":
                text = str(data.get("content") or "")
                # Deltas already streamed the body; the final message is a snapshot.
                if text_id is None and text:
                    text_id = f"txt_{os.urandom(4).hex()}"
                    _sse(handler, {"type": "text-start", "id": text_id})
                    assistant_text.append(text)
                    _sse(handler, {"type": "text-delta", "id": text_id, "text": text})
                if text_id is not None:
                    _sse(handler, {"type": "text-end", "id": text_id})
                    text_id = None
            elif event_type == "tool_started":
                if text_id is not None:
                    _sse(handler, {"type": "text-end", "id": text_id})
                    text_id = None
                tool_name = str(data.get("name") or data.get("tool_name") or "tool")
                call_id = str(data.get("tool_call_id") or data.get("id") or os.urandom(4).hex())
                last_call_by_name[tool_name] = call_id
                _sse(
                    handler,
                    {
                        "type": "tool-call",
                        "toolCallId": call_id,
                        "toolName": tool_name,
                        "input": data.get("arguments") or data.get("args") or {},
                    },
                )
            elif event_type == "tool_result":
                tool_name = str(data.get("name") or data.get("tool_name") or "tool")
                call_id = str(data.get("tool_call_id") or data.get("id") or "")
                if not call_id:
                    call_id = last_call_by_name.get(tool_name) or os.urandom(4).hex()
                last_call_by_name.pop(tool_name, None)
                _sse(
                    handler,
                    {
                        "type": "tool-result",
                        "toolCallId": call_id,
                        "toolName": tool_name,
                        "output": data.get("result") if data.get("result") is not None else data,
                    },
                )
            elif event_type == "graph_proposal":
                call_id = os.urandom(4).hex()
                _sse(
                    handler,
                    {
                        "type": "tool-call",
                        "toolCallId": call_id,
                        "toolName": "script.propose",
                        "input": {"description": data.get("description") or "pipeline script proposal"},
                    },
                )
                _sse(
                    handler,
                    {
                        "type": "tool-result",
                        "toolCallId": call_id,
                        "toolName": "script.propose",
                        "output": data,
                    },
                )
            elif event_type == "error":
                _sse(
                    handler,
                    {
                        "type": "error",
                        "error": {
                            "message": str(data.get("message") or data.get("error") or "COCO agent error"),
                            "type": "stream_error",
                            "code": "coco_pipeline_error",
                        },
                    },
                )
            elif event_type in {"completed", "cancelled"}:
                if text_id is not None:
                    _sse(handler, {"type": "text-end", "id": text_id})
                    text_id = None
                _sse(handler, {"type": "finish-step"})
                finish: dict[str, Any] = {"type": "finish", "finishReason": "end_turn"}
                usage = _cherry_usage(data)
                if usage:
                    finish["totalUsage"] = usage
                _sse(handler, finish)
    finally:
        resp.close()

    text = "".join(assistant_text).strip()
    if text:
        from agent_server import SessionMessageHistory

        SessionMessageHistory.append_exchange(session["id"], [{"role": "assistant", "content": text}])
    handler.wfile.write(b"data: [DONE]\n\n")
    handler.wfile.flush()


def canvas_from_pipeline_snapshot(snapshot: dict, pipeline_id: str) -> dict:
    """Extract the editable DAG + script from a Pipeline AgentSession payload."""
    context = snapshot.get("context") if isinstance(snapshot.get("context"), dict) else {}
    metadata = context.get("metadata") if isinstance(context.get("metadata"), dict) else {}
    graph_obj = context.get("graph") if isinstance(context.get("graph"), dict) else {}
    baseline = metadata.get("graph_baseline") if isinstance(metadata.get("graph_baseline"), dict) else {}
    # script.propose can persist a complete workflow document while direct
    # canvas edits persist the bare DAG. Both represent the same editable graph.
    if isinstance(baseline.get("dag"), dict):
        baseline = baseline["dag"]
    raw_nodes = baseline.get("nodes") if isinstance(baseline.get("nodes"), dict) else {}
    nodes: dict[str, Any] = {}
    for step_id, raw in raw_nodes.items():
        if not isinstance(raw, dict):
            continue
        config = raw.get("config") if isinstance(raw.get("config"), dict) else {}
        nodes[str(step_id)] = {
            "step_id": str(raw.get("step_id") or step_id),
            "node_id": str(raw.get("node_id") or ""),
            "config": dict(config),
        }
    edges: list[dict[str, Any]] = []
    for item in baseline.get("edges") or []:
        if not isinstance(item, dict):
            continue
        source_step = str(item.get("source_step") or "")
        target_step = str(item.get("target_step") or "")
        if not source_step or not target_step:
            continue
        edges.append(
            {
                "source_step": source_step,
                "source_port": str(item.get("source_port") or ""),
                "target_step": target_step,
                "target_port": str(item.get("target_port") or ""),
            }
        )
    script = ""
    if graph_obj.get("representation") == "pipeline_script":
        script = str(graph_obj.get("script") or "")
    elif isinstance(metadata.get("pipeline_script"), str):
        script = metadata["pipeline_script"]
    return {
        "pipeline_session_id": pipeline_id,
        "revision": snapshot.get("revision") or 0,
        "script": script,
        "graph": {"nodes": nodes, "edges": edges},
    }


def get_coco_canvas(agent: dict, session: dict) -> dict:
    pipeline_id = ensure_pipeline_session(agent, session)
    snapshot = json.load(_request(f"/api/agents/sessions/{pipeline_id}"))
    if not isinstance(snapshot, dict):
        return {
            "pipeline_session_id": pipeline_id,
            "revision": 0,
            "script": "",
            "graph": {"nodes": {}, "edges": []},
        }
    return canvas_from_pipeline_snapshot(snapshot, pipeline_id)


def apply_coco_proposal(agent: dict, session: dict, body: dict) -> dict:
    pipeline_id = ensure_pipeline_session(agent, session)
    snapshot = json.load(_request(f"/api/agents/sessions/{pipeline_id}"))
    result = json.load(
        _request(
            f"/api/agents/sessions/{pipeline_id}/canvas",
            method="PATCH",
            body={
                "graph": body.get("graph"),
                "after_script": body.get("after_script"),
                "expected_revision": snapshot.get("revision") or 0,
            },
        )
    )
    if isinstance(result, dict):
        cfg = dict(session.get("configuration") or {})
        cfg["coco_pipeline_revision"] = result.get("revision") or cfg.get("coco_pipeline_revision")
        from agent_server import SessionStorage

        SessionStorage.update_session(agent["id"], session["id"], {"configuration": cfg})
        session["configuration"] = cfg
        return result
    return {"ok": True}


def reject_coco_proposal() -> dict:
    return {"ok": True}


def refresh_coco_title(agent: dict, session: dict) -> None:
    pipeline_id = (session.get("configuration") or {}).get("coco_pipeline_session_id")
    if not pipeline_id:
        return
    title = session.get("name") or ""
    json.load(
        _request(
            f"/api/agents/sessions/{pipeline_id}/metadata",
            method="PATCH",
            body={
                "title": title,
                "provenance": {
                    "username": _username(),
                    "agent_name": agent.get("name") or "-",
                    "agent_id": agent.get("id"),
                    "title": title or "-",
                },
            },
        )
    )
