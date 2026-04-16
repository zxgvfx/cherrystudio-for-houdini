"""
Agent API 路由

代理 AgentServer 的请求，并提供会话管理接口。
DCC 侧通过此路由注册自身的 MCP 服务端口。
"""

import json
import urllib.request
import urllib.error
from typing import Any

from ..server import route
from ...utils.logger import network_logger

_log = network_logger

# Agent Server 引用（由 service_runner 或 Qt 层注入）
_agent_server = None


def set_agent_server(server):
    global _agent_server
    _agent_server = server


@route("/api/v1/agent/proxy", methods=["POST"])
def agent_proxy(ctx: dict) -> Any:
    """代理到 AgentServer（OpenAI 兼容接口）"""
    global _agent_server
    if _agent_server is None or not _agent_server.is_running():
        return {"error": "Agent server not running", "status": 503}

    body = ctx["body"]
    method = body.get("method", "GET").upper()
    path = body.get("path", "")
    req_body = body.get("body")

    port = _agent_server.get_port()
    url = f"http://127.0.0.1:{port}{path}"

    try:
        data = json.dumps(req_body).encode("utf-8") if req_body else None
        req = urllib.request.Request(url, data=data, method=method)
        req.add_header("Content-Type", "application/json")
        req.add_header("Authorization", "Bearer internal")
        dcc_session_id = ctx.get("session_id", "")
        if dcc_session_id:
            req.add_header("X-DCC-Session-Id", dcc_session_id)

        with urllib.request.urlopen(req, timeout=30) as resp:
            resp_data = resp.read().decode("utf-8")
            try:
                return json.loads(resp_data)
            except Exception:
                return {"data": resp_data}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        try:
            return json.loads(err_body)
        except Exception:
            return {"error": err_body, "status": e.code}
    except Exception as e:
        _log(f"[agent/proxy] {e}")
        return {"error": str(e)}


@route("/api/v1/agent/start", methods=["POST"])
def agent_start(ctx: dict) -> Any:
    """启动 Agent Server（如果尚未启动）"""
    global _agent_server
    if _agent_server and _agent_server.is_running():
        return {"ok": True, "port": _agent_server.get_port()}
    try:
        from ...api.agent_server import AgentServer
        _agent_server = AgentServer()
        _agent_server.start()
        return {"ok": True, "port": _agent_server.get_port()}
    except Exception as e:
        _log(f"[agent/start] {e}")
        return {"error": str(e)}


@route("/api/v1/agent/status", methods=["GET"])
def agent_status(ctx: dict) -> Any:
    global _agent_server
    running = _agent_server is not None and _agent_server.is_running()
    return {
        "running": running,
        "port": _agent_server.get_port() if running else 0,
    }


# ─── DCC 会话注册 ──────────────────────────────────────────────────────────────

@route("/api/v1/sessions/register", methods=["POST"])
def register_session(ctx: dict) -> Any:
    """
    DCC 实例启动后调用，将自身的 session_id 和 MCP 服务端口注册到后端。

    sessionId 来源优先级：X-Session-Id 头 > body.sessionId

    请求体:
        {
            "sessionId": "uuid",
            "mcpPort": 12345,
            "dccType": "houdini",
            "dccVersion": "20.5"
        }
    """
    body = ctx["body"]
    session_id = ctx.get("session_id", "") or body.get("sessionId", "")
    mcp_port = body.get("mcpPort", 0)
    dcc_type = body.get("dccType", "unknown")

    if not session_id:
        return {"error": "missing sessionId"}

    server = ctx.get("server")
    if server:
        server.register_session(session_id, {
            "mcp_port": mcp_port,
            "dcc_type": dcc_type,
            "dcc_version": body.get("dccVersion", ""),
        })

    _log(f"[sessions/register] {dcc_type} session registered: {session_id}, mcp_port={mcp_port}")
    return {"ok": True, "sessionId": session_id}


@route("/api/v1/sessions/list", methods=["GET"])
def list_sessions(ctx: dict) -> Any:
    """列出所有已注册的 DCC 会话"""
    server = ctx.get("server")
    if server:
        return {"sessions": server.get_all_sessions()}
    return {"sessions": {}}


@route("/api/v1/sessions/unregister", methods=["POST"])
def unregister_session(ctx: dict) -> Any:
    body = ctx["body"]
    session_id = ctx.get("session_id", "") or body.get("sessionId", "")
    server = ctx.get("server")
    if server and session_id in server._session_registry:
        del server._session_registry[session_id]
        _log(f"[sessions/unregister] Session removed: {session_id}")
    return {"ok": True}


@route("/api/v1/agent/stop", methods=["POST"])
def agent_stop(ctx: dict) -> Any:
    """停止 Agent Server"""
    global _agent_server
    if _agent_server:
        try:
            _agent_server.stop()
        except Exception as e:
            _log(f"[agent/stop] {e}")
        _agent_server = None
    return {"running": False, "port": 0}


@route("/api/v1/agent/restart", methods=["POST"])
def agent_restart(ctx: dict) -> Any:
    """重启 Agent Server"""
    global _agent_server
    if _agent_server:
        try:
            _agent_server.stop()
        except Exception:
            pass
        _agent_server = None
    try:
        from ...api.agent_server import AgentServer
        _agent_server = AgentServer()
        success, port = _agent_server.start(host="127.0.0.1", port=0)
        if success:
            return {"running": True, "port": port, "url": f"http://127.0.0.1:{port}"}
        return {"running": False, "port": 0, "error": "restart failed"}
    except Exception as e:
        _log(f"[agent/restart] {e}")
        return {"running": False, "port": 0, "error": str(e)}


@route("/api/v1/agent/toggle", methods=["POST"])
def agent_toggle(ctx: dict) -> Any:
    """切换 Agent Server 运行状态"""
    global _agent_server
    if _agent_server and _agent_server.is_running():
        return agent_stop(ctx)
    return agent_start(ctx)


@route("/api/v1/agent/configure", methods=["POST"])
def agent_configure(ctx: dict) -> Any:
    """配置 Agent Server（占位）"""
    return {"success": True}


@route("/api/v1/sessions/resolve-dcc", methods=["GET", "POST"])
def resolve_dcc_context(ctx: dict) -> Any:
    """
    Resolve the DCC context for the current request.

    When an Agent session needs to invoke DCC tools, it can call this
    endpoint to discover which DCC instance is associated with the
    current X-Session-Id header.

    Returns:
        dccSessionId, dccType, mcpPort, available (bool)
    """
    body = ctx.get("body") or {}
    query = ctx.get("query") or {}
    session_id = (
        ctx.get("session_id", "")
        or (query.get("sessionId", [""])[0] if isinstance(query.get("sessionId"), list) else query.get("sessionId", ""))
        or body.get("sessionId", "")
    )

    server = ctx.get("server")
    if not server or not session_id:
        return {
            "dccSessionId": "",
            "dccType": "",
            "mcpPort": 0,
            "available": False,
        }

    session_info = server.get_session(session_id)
    if not session_info:
        return {
            "dccSessionId": session_id,
            "dccType": "",
            "mcpPort": 0,
            "available": False,
        }

    return {
        "dccSessionId": session_id,
        "dccType": session_info.get("dcc_type", "unknown"),
        "dccVersion": session_info.get("dcc_version", ""),
        "mcpPort": session_info.get("mcp_port", 0),
        "available": bool(session_info.get("mcp_port", 0)),
    }
