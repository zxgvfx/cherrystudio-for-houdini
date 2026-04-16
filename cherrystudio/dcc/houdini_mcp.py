"""
Houdini MCP Server

在 Houdini 进程内部运行一个轻量级 MCP (Model Context Protocol) Server，
对外暴露 Houdini 特有的工具（创建节点、执行 Python、读取场景信息等）。

后端服务通过 session 注册表找到该 Server 的端口，
在 AI 需要操作 DCC 时，将工具调用请求转发给它。
"""

import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import Optional, Callable, Any
from urllib.parse import urlparse

from ..utils.logger import network_logger

_log = network_logger


# ─── 工具注册 ─────────────────────────────────────────────────────────────────

_tools: dict[str, dict] = {}       # tool_name -> {description, schema, handler}


def tool(name: str, description: str, schema: dict = None):
    """装饰器：注册一个 MCP 工具"""
    def decorator(fn: Callable) -> Callable:
        _tools[name] = {
            "name": name,
            "description": description,
            "inputSchema": schema or {"type": "object", "properties": {}},
            "handler": fn,
        }
        return fn
    return decorator


# ─── 内置 Houdini 工具 ────────────────────────────────────────────────────────

@tool(
    name="houdini_exec_python",
    description="在 Houdini 当前场景中执行 Python 代码片段，返回执行结果或错误信息",
    schema={
        "type": "object",
        "properties": {
            "code": {"type": "string", "description": "要执行的 Python 代码"},
        },
        "required": ["code"],
    },
)
def _exec_python(args: dict) -> Any:
    code = args.get("code", "")
    if not code:
        return {"error": "empty code"}
    try:
        local_ns: dict = {}
        exec(code, {"__builtins__": __builtins__}, local_ns)  # noqa: S102
        result = local_ns.get("result", None)
        return {"ok": True, "result": str(result) if result is not None else ""}
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}


@tool(
    name="houdini_get_scene_info",
    description="获取当前 Houdini 场景的基本信息：节点数量、hip 文件路径、帧范围等",
    schema={"type": "object", "properties": {}},
)
def _get_scene_info(_args: dict) -> Any:
    try:
        import hou  # type: ignore
        return {
            "hipFile": hou.hipFile.path(),
            "fps": hou.fps(),
            "frameRange": [hou.playbar.playbackRange()[0], hou.playbar.playbackRange()[1]],
            "currentFrame": hou.frame(),
            "selectedNodes": [n.path() for n in hou.selectedNodes()],
        }
    except ImportError:
        return {"error": "Not running inside Houdini"}
    except Exception as e:
        return {"error": str(e)}


@tool(
    name="houdini_create_node",
    description="在指定路径创建一个 Houdini 节点",
    schema={
        "type": "object",
        "properties": {
            "parentPath": {"type": "string", "description": "父节点路径，如 /obj"},
            "nodeType":   {"type": "string", "description": "节点类型，如 geo、box、attribwrangle"},
            "name":       {"type": "string", "description": "节点名称（可选）"},
        },
        "required": ["parentPath", "nodeType"],
    },
)
def _create_node(args: dict) -> Any:
    try:
        import hou  # type: ignore
        parent = hou.node(args["parentPath"])
        if parent is None:
            return {"error": f"Parent node not found: {args['parentPath']}"}
        name = args.get("name", args["nodeType"])
        node = parent.createNode(args["nodeType"], name)
        node.moveToGoodPosition()
        return {"ok": True, "path": node.path(), "type": node.type().name()}
    except ImportError:
        return {"error": "Not running inside Houdini"}
    except Exception as e:
        return {"error": str(e)}


@tool(
    name="houdini_list_nodes",
    description="列出指定父路径下的所有子节点",
    schema={
        "type": "object",
        "properties": {
            "parentPath": {"type": "string", "description": "父节点路径，如 /obj"},
            "recursive":  {"type": "boolean", "description": "是否递归列出（默认 false）"},
        },
        "required": ["parentPath"],
    },
)
def _list_nodes(args: dict) -> Any:
    try:
        import hou  # type: ignore
        parent = hou.node(args["parentPath"])
        if parent is None:
            return {"error": f"Node not found: {args['parentPath']}"}

        def _node_info(n):
            return {
                "path": n.path(),
                "type": n.type().name(),
                "name": n.name(),
                "comment": n.comment(),
            }

        if args.get("recursive", False):
            nodes = [_node_info(n) for n in parent.allSubChildren()]
        else:
            nodes = [_node_info(n) for n in parent.children()]
        return {"nodes": nodes}
    except ImportError:
        return {"error": "Not running inside Houdini"}
    except Exception as e:
        return {"error": str(e)}


@tool(
    name="houdini_get_parm",
    description="读取节点的参数值",
    schema={
        "type": "object",
        "properties": {
            "nodePath": {"type": "string", "description": "节点路径"},
            "parmName":  {"type": "string", "description": "参数名称"},
        },
        "required": ["nodePath", "parmName"],
    },
)
def _get_parm(args: dict) -> Any:
    try:
        import hou  # type: ignore
        node = hou.node(args["nodePath"])
        if node is None:
            return {"error": f"Node not found: {args['nodePath']}"}
        parm = node.parm(args["parmName"])
        if parm is None:
            # 尝试 parmTuple
            pt = node.parmTuple(args["parmName"])
            if pt is None:
                return {"error": f"Parm not found: {args['parmName']}"}
            return {"value": list(pt.eval())}
        return {"value": parm.eval()}
    except ImportError:
        return {"error": "Not running inside Houdini"}
    except Exception as e:
        return {"error": str(e)}


@tool(
    name="import_scene_file",
    description="将 3D 场景文件（USD/FBX/OBJ/GLB 等）导入到 Houdini 当前场景中",
    schema={
        "type": "object",
        "properties": {
            "filePath": {"type": "string", "description": "要导入的文件绝对路径"},
            "format":   {"type": "string", "description": "文件格式（usd/fbx/obj/glb/gltf/ply）"},
            "parentPath": {"type": "string", "description": "导入到的父节点路径（默认 /obj）"},
        },
        "required": ["filePath"],
    },
)
def _import_scene_file(args: dict) -> Any:
    file_path = args.get("filePath", "")
    if not file_path:
        return {"error": "filePath is required"}

    import os
    if not os.path.isfile(file_path):
        return {"error": f"File not found: {file_path}"}

    fmt = args.get("format", "").lower()
    if not fmt:
        fmt = os.path.splitext(file_path)[1].lstrip(".").lower()

    parent_path = args.get("parentPath", "/obj")

    try:
        import hou  # type: ignore
        parent = hou.node(parent_path)
        if parent is None:
            return {"error": f"Parent node not found: {parent_path}"}

        file_path_posix = file_path.replace("\\", "/")
        base_name = os.path.splitext(os.path.basename(file_path))[0]

        if fmt in ("usd", "usda", "usdc", "usdz"):
            node = parent.createNode("sublayer", base_name)
            node.parm("filepath1").set(file_path_posix)
        elif fmt == "fbx":
            # Houdini 内置 FBX 导入
            hou.hipFile.importFBX(file_path_posix)
            return {"ok": True, "method": "importFBX", "path": file_path_posix}
        elif fmt in ("obj", "glb", "gltf", "ply"):
            geo_node = parent.createNode("geo", base_name)
            file_node = geo_node.createNode("file", "import")
            file_node.parm("file").set(file_path_posix)
            file_node.setDisplayFlag(True)
            file_node.setRenderFlag(True)
            return {"ok": True, "method": "file_sop", "nodePath": file_node.path()}
        else:
            geo_node = parent.createNode("geo", base_name)
            file_node = geo_node.createNode("file", "import")
            file_node.parm("file").set(file_path_posix)
            file_node.setDisplayFlag(True)
            file_node.setRenderFlag(True)
            return {"ok": True, "method": "file_sop_fallback", "nodePath": file_node.path()}

        node.moveToGoodPosition()
        return {"ok": True, "method": "sublayer" if fmt.startswith("usd") else "file_sop", "nodePath": node.path()}
    except ImportError:
        return {"error": "Not running inside Houdini"}
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}


@tool(
    name="houdini_set_parm",
    description="设置节点的参数值",
    schema={
        "type": "object",
        "properties": {
            "nodePath": {"type": "string", "description": "节点路径"},
            "parmName":  {"type": "string", "description": "参数名称"},
            "value":     {"description": "参数值（数值/字符串/列表）"},
        },
        "required": ["nodePath", "parmName", "value"],
    },
)
def _set_parm(args: dict) -> Any:
    try:
        import hou  # type: ignore
        node = hou.node(args["nodePath"])
        if node is None:
            return {"error": f"Node not found: {args['nodePath']}"}
        parm = node.parm(args["parmName"])
        if parm is None:
            pt = node.parmTuple(args["parmName"])
            if pt is None:
                return {"error": f"Parm not found: {args['parmName']}"}
            pt.set(args["value"])
        else:
            parm.set(args["value"])
        return {"ok": True}
    except ImportError:
        return {"error": "Not running inside Houdini"}
    except Exception as e:
        return {"error": str(e)}


# ─── MCP JSON-RPC 处理器 ──────────────────────────────────────────────────────

class _MCPHandler(BaseHTTPRequestHandler):
    """简单 JSON-RPC over HTTP 处理 MCP 协议请求"""

    def log_message(self, fmt, *args):
        _log(f"[HoudiniMCP] {fmt % args}")

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(content_length)
        try:
            rpc = json.loads(raw.decode("utf-8"))
        except Exception:
            self._respond({"jsonrpc": "2.0", "id": None,
                           "error": {"code": -32700, "message": "Parse error"}})
            return

        method = rpc.get("method", "")
        req_id = rpc.get("id")
        params = rpc.get("params", {})

        result = self._dispatch(method, params)
        self._respond({"jsonrpc": "2.0", "id": req_id, "result": result})

    def do_GET(self):
        # 提供工具列表（用于 MCP 初始化）
        tools_list = [
            {k: v for k, v in t.items() if k != "handler"}
            for t in _tools.values()
        ]
        self._respond({"tools": tools_list})

    def _dispatch(self, method: str, params: dict) -> Any:
        if method == "tools/list":
            return {
                "tools": [
                    {k: v for k, v in t.items() if k != "handler"}
                    for t in _tools.values()
                ]
            }
        if method == "tools/call":
            tool_name = params.get("name", "")
            tool_args = params.get("arguments", {})
            tool_def = _tools.get(tool_name)
            if tool_def is None:
                return {"error": f"Unknown tool: {tool_name}"}
            try:
                return {"content": [{"type": "text", "text": json.dumps(tool_def["handler"](tool_args))}]}
            except Exception as e:
                return {"content": [{"type": "text", "text": json.dumps({"error": str(e)})}]}
        if method == "initialize":
            return {
                "protocolVersion": "2024-11-05",
                "capabilities": {"tools": {}},
                "serverInfo": {"name": "houdini-mcp", "version": "1.0.0"},
            }
        return {"error": f"Unknown method: {method}"}

    def _respond(self, data: Any):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


# ─── MCP Server ───────────────────────────────────────────────────────────────

class HoudiniMCPServer:
    """运行在 Houdini 进程内的 MCP HTTP Server"""

    def __init__(self, host: str = "127.0.0.1", port: int = 0):
        self.host = host
        self.port = port
        self._server: Optional[HTTPServer] = None
        self._thread: Optional[threading.Thread] = None
        self._started = threading.Event()

    def register_tool(self, name: str, description: str, schema: dict, handler: Callable):
        """动态注册额外的 Houdini 工具"""
        _tools[name] = {
            "name": name,
            "description": description,
            "inputSchema": schema or {"type": "object", "properties": {}},
            "handler": handler,
        }

    def start(self) -> int:
        """启动 MCP Server，返回实际端口"""
        self._server = HTTPServer((self.host, self.port), _MCPHandler)
        self.port = self._server.server_address[1]
        self._thread = threading.Thread(
            target=self._serve,
            name="HoudiniMCPServer",
            daemon=True,
        )
        self._thread.start()
        self._started.wait(timeout=5)
        _log(f"[HoudiniMCP] Server started on {self.host}:{self.port}")
        return self.port

    def _serve(self):
        self._started.set()
        self._server.serve_forever()

    def stop(self):
        if self._server:
            self._server.shutdown()

    def is_running(self) -> bool:
        return self._thread is not None and self._thread.is_alive()

    def get_port(self) -> int:
        return self.port
