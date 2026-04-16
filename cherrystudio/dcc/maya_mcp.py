"""
Maya MCP Server

在 Maya 进程内部运行一个轻量级 MCP (Model Context Protocol) Server，
对外暴露 Maya 特有的工具（导入场景文件、执行 MEL/Python、读取场景信息等）。

后端服务通过 session 注册表找到该 Server 的端口，
在 AI 需要操作 DCC 时，将工具调用请求转发给它。
"""

import json
import os
import tempfile
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import Optional, Callable, Any

from ..utils.logger import network_logger

_log = network_logger


# ─── 工具注册 ─────────────────────────────────────────────────────────────────

_tools: dict[str, dict] = {}


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


def _convert_gltf_to_obj(file_path: str) -> dict[str, str]:
    """
    Convert GLB/GLTF to OBJ through trimesh.

    This path is geometry-first: it prioritizes getting meshes into Maya
    without requiring Blender or an external USD converter.
    """
    try:
        import trimesh  # type: ignore[import-not-found]
    except ImportError:
        return {"error": "trimesh not installed; cannot convert GLB/GLTF to OBJ"}

    temp_dir = tempfile.mkdtemp(prefix="cherry_maya_gltf_")
    output_path = os.path.join(
        temp_dir,
        f"{os.path.splitext(os.path.basename(file_path))[0]}.obj",
    )

    try:
        scene_or_mesh = trimesh.load(file_path, force="scene")
        if scene_or_mesh is None:
            return {"error": "trimesh returned no scene for the input file"}

        geometry = getattr(scene_or_mesh, "geometry", None)
        if isinstance(geometry, dict) and not geometry:
            return {"error": "GLB/GLTF scene contains no geometry"}

        scene_or_mesh.export(output_path, file_type="obj")
        if not os.path.isfile(output_path):
            return {"error": "trimesh did not produce an OBJ file"}
        return {"ok": "1", "outputPath": output_path}
    except Exception as e:
        return {"error": f"trimesh conversion failed: {e}"}


def _run_in_maya_main_thread(fn: Callable[[], Any]) -> Any:
    """
    Marshal Maya API work back to the main thread.

    MCP HTTP requests run on a background thread, but `maya.cmds`/MEL calls
    are not safe there and can crash Maya 2025 outright.
    """
    try:
        import maya.utils as maya_utils  # type: ignore
    except ImportError:
        return fn()

    return maya_utils.executeInMainThreadWithResult(fn)


# ─── 内置 Maya 工具 ───────────────────────────────────────────────────────────

@tool(
    name="maya_exec_python",
    description="在 Maya 当前场景中执行 Python 代码片段，返回执行结果或错误信息",
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
        def _do_exec() -> Any:
            local_ns: dict = {}
            exec(code, {"__builtins__": __builtins__}, local_ns)  # noqa: S102
            result = local_ns.get("result", None)
            return {"ok": True, "result": str(result) if result is not None else ""}

        return _run_in_maya_main_thread(_do_exec)
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}


@tool(
    name="maya_exec_mel",
    description="在 Maya 中执行 MEL 命令，返回执行结果",
    schema={
        "type": "object",
        "properties": {
            "command": {"type": "string", "description": "要执行的 MEL 命令"},
        },
        "required": ["command"],
    },
)
def _exec_mel(args: dict) -> Any:
    command = args.get("command", "")
    if not command:
        return {"error": "empty command"}
    try:
        def _do_eval() -> Any:
            import maya.mel as mel  # type: ignore
            result = mel.eval(command)
            return {"ok": True, "result": str(result) if result is not None else ""}

        return _run_in_maya_main_thread(_do_eval)
    except ImportError:
        return {"error": "Not running inside Maya"}
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}


@tool(
    name="maya_get_scene_info",
    description="获取当前 Maya 场景的基本信息：场景文件路径、帧范围、选中对象等",
    schema={"type": "object", "properties": {}},
)
def _get_scene_info(_args: dict) -> Any:
    try:
        def _query() -> Any:
            import maya.cmds as cmds  # type: ignore
            return {
                "scenePath": cmds.file(q=True, sceneName=True) or "(untitled)",
                "fps": cmds.currentUnit(q=True, time=True),
                "frameRange": [
                    cmds.playbackOptions(q=True, minTime=True),
                    cmds.playbackOptions(q=True, maxTime=True),
                ],
                "currentFrame": cmds.currentTime(q=True),
                "selectedObjects": cmds.ls(selection=True) or [],
            }

        return _run_in_maya_main_thread(_query)
    except ImportError:
        return {"error": "Not running inside Maya"}
    except Exception as e:
        return {"error": str(e)}


@tool(
    name="maya_list_nodes",
    description="列出场景中的节点（可按类型过滤）",
    schema={
        "type": "object",
        "properties": {
            "nodeType": {"type": "string", "description": "节点类型过滤（如 mesh、transform、camera），为空则列出所有 transform"},
            "long": {"type": "boolean", "description": "是否返回完整路径（默认 true）"},
        },
    },
)
def _list_nodes(args: dict) -> Any:
    try:
        def _query() -> Any:
            import maya.cmds as cmds  # type: ignore
            node_type = args.get("nodeType", "transform")
            use_long = args.get("long", True)
            nodes = cmds.ls(type=node_type, long=use_long) or []
            return {"nodes": nodes}

        return _run_in_maya_main_thread(_query)
    except ImportError:
        return {"error": "Not running inside Maya"}
    except Exception as e:
        return {"error": str(e)}


@tool(
    name="import_scene_file",
    description="将 3D 场景文件（USD/FBX/OBJ/GLB/Alembic 等）导入到 Maya 当前场景中",
    schema={
        "type": "object",
        "properties": {
            "filePath": {"type": "string", "description": "要导入的文件绝对路径"},
            "format":   {"type": "string", "description": "文件格式（usd/fbx/obj/glb/gltf/ply/abc）"},
            "namespace": {"type": "string", "description": "导入命名空间（可选）"},
        },
        "required": ["filePath"],
    },
)
def _import_scene_file(args: dict) -> Any:
    file_path = args.get("filePath", "")
    if not file_path:
        return {"error": "filePath is required"}

    if not os.path.isfile(file_path):
        return {"error": f"File not found: {file_path}"}

    fmt = args.get("format", "").lower()
    if not fmt:
        fmt = os.path.splitext(file_path)[1].lstrip(".").lower()

    file_path_posix = file_path.replace("\\", "/")
    namespace = args.get("namespace", "")
    converted: dict[str, str] = {}

    if fmt in ("glb", "gltf"):
        converted = _convert_gltf_to_obj(file_path)
        if converted.get("error"):
            _log(
                "[MayaMCP] GLTF->OBJ conversion unavailable, "
                f"fallback to direct import: {converted.get('error', 'unknown error')}"
            )

    try:
        def _do_import() -> Any:
            import maya.cmds as cmds  # type: ignore

            ns_opts = {"namespace": namespace} if namespace else {"mergeNamespacesOnClash": True}

            def _list_top_level_nodes() -> list[str]:
                # `assemblies=True` 在部分 Maya 版本/环境里会抛出
                # "flag 'assemblies' must be passed a boolean argument"。
                # 这里改用 `|*` 直接取根层 DAG 节点，兼容性更稳定。
                return cmds.ls("|*", long=True) or []

            if fmt == "fbx":
                cmds.loadPlugin("fbxmaya", quiet=True)
                before = set(_list_top_level_nodes())
                cmds.file(file_path_posix, i=True, type="FBX", ignoreVersion=True,
                          returnNewNodes=False, **ns_opts)
                after = set(_list_top_level_nodes())
                return {"ok": True, "method": "fbx_import", "newTopNodes": list(after - before)}

            if fmt in ("obj",):
                cmds.loadPlugin("objExport", quiet=True)
                before = set(_list_top_level_nodes())
                cmds.file(file_path_posix, i=True, type="OBJ", ignoreVersion=True,
                          returnNewNodes=False, **ns_opts)
                after = set(_list_top_level_nodes())
                return {"ok": True, "method": "obj_import", "newTopNodes": list(after - before)}

            if fmt in ("abc", "alembic"):
                cmds.loadPlugin("AbcImport", quiet=True)
                before = set(_list_top_level_nodes())
                cmds.AbcImport(file_path_posix, mode="import")
                after = set(_list_top_level_nodes())
                return {"ok": True, "method": "abc_import", "newTopNodes": list(after - before)}

            if fmt in ("usd", "usda", "usdc", "usdz"):
                cmds.loadPlugin("mayaUsdPlugin", quiet=True)
                before = set(_list_top_level_nodes())
                cmds.file(file_path_posix, i=True, type="USD Import",
                          ignoreVersion=True, returnNewNodes=False, **ns_opts)
                after = set(_list_top_level_nodes())
                return {"ok": True, "method": "usd_import", "newTopNodes": list(after - before)}

            if fmt in ("glb", "gltf") and converted.get("outputPath"):
                converted_path_posix = converted["outputPath"].replace("\\", "/")
                cmds.loadPlugin("objExport", quiet=True)
                before = set(_list_top_level_nodes())
                cmds.file(converted_path_posix, i=True, type="OBJ",
                          ignoreVersion=True, returnNewNodes=False, **ns_opts)
                after = set(_list_top_level_nodes())
                return {
                    "ok": True,
                    "method": "gltf_to_obj_import",
                    "convertedFrom": file_path_posix,
                    "convertedObjPath": converted_path_posix,
                    "newTopNodes": list(after - before),
                }

            if fmt in ("glb", "gltf"):
                try:
                    cmds.loadPlugin("glTFTranslator", quiet=True)
                except Exception:
                    pass
                before = set(_list_top_level_nodes())
                try:
                    cmds.file(file_path_posix, i=True, type="glTF Import",
                              ignoreVersion=True, returnNewNodes=False, **ns_opts)
                except RuntimeError:
                    cmds.file(file_path_posix, i=True, ignoreVersion=True,
                              returnNewNodes=False, **ns_opts)
                after = set(_list_top_level_nodes())
                return {
                    "ok": True,
                    "method": "gltf_import",
                    "newTopNodes": list(after - before),
                    "conversionError": converted.get("error", ""),
                }

            before = set(_list_top_level_nodes())
            cmds.file(file_path_posix, i=True, ignoreVersion=True,
                      returnNewNodes=False, **ns_opts)
            after = set(_list_top_level_nodes())
            return {"ok": True, "method": "auto_import", "newTopNodes": list(after - before)}

        return _run_in_maya_main_thread(_do_import)

    except ImportError:
        return {"error": "Not running inside Maya"}
    except Exception as e:
        import traceback
        return {"error": str(e), "traceback": traceback.format_exc()}


@tool(
    name="maya_set_attr",
    description="设置 Maya 节点的属性值",
    schema={
        "type": "object",
        "properties": {
            "node": {"type": "string", "description": "节点名称或完整路径"},
            "attr": {"type": "string", "description": "属性名称"},
            "value": {"description": "属性值（数值/字符串/列表）"},
        },
        "required": ["node", "attr", "value"],
    },
)
def _set_attr(args: dict) -> Any:
    try:
        def _set() -> Any:
            import maya.cmds as cmds  # type: ignore
            node = args["node"]
            attr = args["attr"]
            value = args["value"]
            full_attr = f"{node}.{attr}"
            if not cmds.objExists(full_attr):
                return {"error": f"Attribute not found: {full_attr}"}
            if isinstance(value, (list, tuple)):
                cmds.setAttr(full_attr, *value)
            elif isinstance(value, str):
                cmds.setAttr(full_attr, value, type="string")
            else:
                cmds.setAttr(full_attr, value)
            return {"ok": True}

        return _run_in_maya_main_thread(_set)
    except ImportError:
        return {"error": "Not running inside Maya"}
    except Exception as e:
        return {"error": str(e)}


@tool(
    name="maya_get_attr",
    description="读取 Maya 节点的属性值",
    schema={
        "type": "object",
        "properties": {
            "node": {"type": "string", "description": "节点名称或完整路径"},
            "attr": {"type": "string", "description": "属性名称"},
        },
        "required": ["node", "attr"],
    },
)
def _get_attr(args: dict) -> Any:
    try:
        def _get() -> Any:
            import maya.cmds as cmds  # type: ignore
            full_attr = f"{args['node']}.{args['attr']}"
            if not cmds.objExists(full_attr):
                return {"error": f"Attribute not found: {full_attr}"}
            value = cmds.getAttr(full_attr)
            return {"value": value}

        return _run_in_maya_main_thread(_get)
    except ImportError:
        return {"error": "Not running inside Maya"}
    except Exception as e:
        return {"error": str(e)}


# ─── MCP JSON-RPC 处理器 ──────────────────────────────────────────────────────

class _MCPHandler(BaseHTTPRequestHandler):
    """简单 JSON-RPC over HTTP 处理 MCP 协议请求"""

    def log_message(self, fmt, *args):
        _log(f"[MayaMCP] {fmt % args}")

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
                "serverInfo": {"name": "maya-mcp", "version": "1.0.0"},
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

class MayaMCPServer:
    """运行在 Maya 进程内的 MCP HTTP Server"""

    def __init__(self, host: str = "127.0.0.1", port: int = 0):
        self.host = host
        self.port = port
        self._server: Optional[HTTPServer] = None
        self._thread: Optional[threading.Thread] = None
        self._started = threading.Event()

    def register_tool(self, name: str, description: str, schema: dict, handler: Callable):
        """动态注册额外的 Maya 工具"""
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
            name="MayaMCPServer",
            daemon=True,
        )
        self._thread.start()
        self._started.wait(timeout=5)
        _log(f"[MayaMCP] Server started on {self.host}:{self.port}")
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
