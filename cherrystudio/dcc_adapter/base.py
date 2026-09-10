# -*- coding: utf-8 -*-
"""
DCC 适配器接口。

这一层跑在 DCC 进程内（hython / mayapy / blender python …），因此有三条硬约束：

1. 只依赖标准库，不 import Qt/PySide，也不 import ``cherrystudio`` 其它子包
   （它们要求 Python 3.10+ 且可能拉起 Qt）。语法保持 3.9 兼容。
2. 所有触碰 DCC API 的代码都必须经 :meth:`DccAdapter.run_on_main_thread`
   封送到 DCC 主线程——工具调用来自 HTTP 线程，``hou`` / ``maya.cmds`` 都不是
   线程安全的。
3. 写操作包在 :meth:`DccAdapter.undo_group` 里，让用户一次 Ctrl+Z 就能撤销
   Agent 的整次操作。

具体 DCC 只需要继承 :class:`DccAdapter` 实现十来个方法，通用 MCP server
（``server.py``）会据此生成统一命名的工具集。
"""

from __future__ import annotations

import contextlib
import io
import os
import tempfile
import threading
import traceback
from typing import Any, Callable, Dict, Iterator, List, Optional


class ToolSpec:
    """一个可被 Agent 调用的工具。

    ``kind`` 为 ``"read"`` 或 ``"write"``：写工具会自动进 undo 组，且在
    Electron 侧默认需要用户审批。
    """

    __slots__ = ("name", "description", "input_schema", "handler", "kind", "undo_label")

    def __init__(
        self,
        name: str,
        description: str,
        handler: Callable[[Dict[str, Any]], Any],
        input_schema: Optional[Dict[str, Any]] = None,
        kind: str = "read",
        undo_label: Optional[str] = None,
    ) -> None:
        self.name = name
        self.description = description
        self.handler = handler
        self.input_schema = input_schema or {"type": "object", "properties": {}}
        self.kind = "write" if kind == "write" else "read"
        self.undo_label = undo_label or name

    def to_mcp(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "description": self.description,
            "inputSchema": self.input_schema,
            "annotations": {"readOnlyHint": self.kind == "read"},
        }


def _schema(properties: Dict[str, Any], required: Optional[List[str]] = None) -> Dict[str, Any]:
    schema: Dict[str, Any] = {"type": "object", "properties": properties}
    if required:
        schema["required"] = required
    return schema


class DccAdapter:
    """DCC 适配器基类。子类覆盖 ``dcc_type`` 与下面标注为 *override* 的方法。"""

    #: 'houdini' | 'maya' | 'nuke' | 'katana' | 'blender' …
    dcc_type: str = "unknown"
    display_name: str = "DCC"

    # ── 生命周期 / 线程 ──────────────────────────────────────────────────────

    def version(self) -> str:  # override
        return "unknown"

    def run_on_main_thread(self, fn: Callable[[], Any], timeout: float = 30.0) -> Any:  # override
        """在 DCC 主线程执行 *fn* 并返回结果。默认实现直接调用（用于测试/无 UI）。"""
        return fn()

    @contextlib.contextmanager
    def undo_group(self, label: str) -> Iterator[None]:  # override
        yield

    def main_window_handle(self) -> int:  # override
        """DCC 主窗口的原生句柄（Windows HWND），面板进程用它做 owner 置顶/跟随。"""
        return 0

    # ── 场景查询 ───────────────────────────────────────────────────────────────

    def scene_info(self) -> Dict[str, Any]:  # override
        return {}

    def context_snapshot(self) -> Dict[str, Any]:
        """给 Agent prompt 用的精简上下文。默认就是 scene_info 加上 dcc 标识。

        子类应控制体积（几百 token 以内）：选中节点只给 path/type，参数细节让
        Agent 用工具按需读取。
        """
        info = dict(self.scene_info())
        info.setdefault("dcc", self.dcc_type)
        info.setdefault("version", self.version())
        return info

    def list_nodes(self, parent: str, recursive: bool = False) -> List[Dict[str, Any]]:  # override
        raise NotImplementedError

    def get_parm(self, node: str, parm: str) -> Any:  # override
        raise NotImplementedError

    def set_parm(self, node: str, parm: str, value: Any) -> None:  # override
        raise NotImplementedError

    def create_node(self, parent: str, node_type: str, name: Optional[str] = None) -> Dict[str, Any]:  # override
        raise NotImplementedError

    def import_file(self, path: str, fmt: str = "", parent: str = "") -> Dict[str, Any]:  # override
        raise NotImplementedError

    def export_selected(self, fmt: str = "obj", directory: str = "") -> Dict[str, Any]:  # override
        raise NotImplementedError

    def snapshot(self, directory: str = "", width: int = 1280, height: int = 720) -> Dict[str, Any]:  # override
        raise NotImplementedError

    # ── exec_python ────────────────────────────────────────────────────────────

    def exec_globals(self) -> Dict[str, Any]:  # override
        """``exec_python`` 预置的全局名字（例如 ``hou`` / ``cmds``）。"""
        return {}

    def exec_python(self, code: str) -> Dict[str, Any]:
        if not code or not code.strip():
            return {"error": "empty code"}
        namespace: Dict[str, Any] = {"__builtins__": __builtins__, "__name__": "__cherry_agent__"}
        namespace.update(self.exec_globals())
        stdout = io.StringIO()
        try:
            with contextlib.redirect_stdout(stdout):
                exec(compile(code, "<cherry-agent>", "exec"), namespace)  # noqa: S102
        except Exception as exc:  # noqa: BLE001
            return {
                "ok": False,
                "error": "%s: %s" % (type(exc).__name__, exc),
                "traceback": traceback.format_exc(),
                "stdout": stdout.getvalue()[-8000:],
            }
        result = namespace.get("result", None)
        return {
            "ok": True,
            "result": "" if result is None else _stringify(result),
            "stdout": stdout.getvalue()[-8000:],
        }

    # ── 工具集 ─────────────────────────────────────────────────────────────────

    def extra_tools(self) -> List[ToolSpec]:  # override
        """DCC 特有或用于兼容旧名字的额外工具。"""
        return []

    def tools(self) -> List[ToolSpec]:
        p = self.dcc_type
        label = self.display_name
        specs = [
            ToolSpec(
                "dcc_get_context",
                "获取当前 %s 会话的精简上下文（文件、帧范围、选中节点、当前网络）。" % label,
                lambda _a: self.context_snapshot(),
            ),
            ToolSpec(
                "%s_get_scene_info" % p,
                "获取当前 %s 场景的基本信息：文件路径、帧范围、选中节点等。" % label,
                lambda _a: self.scene_info(),
            ),
            ToolSpec(
                "%s_list_nodes" % p,
                "列出 %s 中指定父路径下的节点。" % label,
                lambda a: {"nodes": self.list_nodes(str(a.get("parentPath") or a.get("parent") or ""), bool(a.get("recursive", False)))},
                _schema(
                    {
                        "parentPath": {"type": "string", "description": "父节点路径（Houdini 如 /obj；Maya 留空表示场景根）"},
                        "recursive": {"type": "boolean", "description": "是否递归（默认 false）"},
                    }
                ),
            ),
            ToolSpec(
                "%s_get_parm" % p,
                "读取 %s 节点的参数/属性值。" % label,
                lambda a: {"value": self.get_parm(str(a.get("nodePath") or a.get("node") or ""), str(a.get("parmName") or a.get("parm") or a.get("attr") or ""))},
                _schema(
                    {
                        "nodePath": {"type": "string", "description": "节点路径/名称"},
                        "parmName": {"type": "string", "description": "参数/属性名"},
                    },
                    ["nodePath", "parmName"],
                ),
            ),
            ToolSpec(
                "%s_set_parm" % p,
                "设置 %s 节点的参数/属性值。会进入一个 undo 组，用户可一次撤销。" % label,
                lambda a: self._set_parm_tool(a),
                _schema(
                    {
                        "nodePath": {"type": "string", "description": "节点路径/名称"},
                        "parmName": {"type": "string", "description": "参数/属性名"},
                        "value": {"description": "参数值（数值/字符串/列表）"},
                    },
                    ["nodePath", "parmName", "value"],
                ),
                kind="write",
                undo_label="Cherry Agent: set parm",
            ),
            ToolSpec(
                "%s_create_node" % p,
                "在 %s 中创建节点。" % label,
                lambda a: self.create_node(str(a.get("parentPath") or a.get("parent") or ""), str(a.get("nodeType") or a.get("type") or ""), a.get("name")),
                _schema(
                    {
                        "parentPath": {"type": "string", "description": "父节点路径（Houdini 必填，如 /obj 或 /obj/geo1）"},
                        "nodeType": {"type": "string", "description": "节点类型，如 geo、box、attribwrangle / transform、polyCube"},
                        "name": {"type": "string", "description": "节点名称（可选）"},
                    },
                    ["nodeType"],
                ),
                kind="write",
                undo_label="Cherry Agent: create node",
            ),
            ToolSpec(
                "%s_exec_python" % p,
                "在 %s 进程内执行 Python 代码；把要返回的值赋给变量 result。危险操作，需要用户确认。" % label,
                lambda a: self.exec_python(str(a.get("code") or "")),
                _schema({"code": {"type": "string", "description": "要执行的 Python 代码"}}, ["code"]),
                kind="write",
                undo_label="Cherry Agent: exec python",
            ),
            ToolSpec(
                "import_scene_file",
                "把 3D 文件（GLB/GLTF/FBX/OBJ/USD/Alembic 等）导入 %s 当前场景；默认导入到当前网络/选中处。" % label,
                lambda a: self._import_tool(a),
                _schema(
                    {
                        "filePath": {"type": "string", "description": "要导入的文件绝对路径"},
                        "format": {"type": "string", "description": "文件格式（可选，默认按扩展名）"},
                        "parentPath": {"type": "string", "description": "导入到的父节点/网络路径（可选）"},
                    },
                    ["filePath"],
                ),
                kind="write",
                undo_label="Cherry Agent: import file",
            ),
            ToolSpec(
                "%s_export_selected" % p,
                "把 %s 中当前选中的几何导出为文件（obj/fbx/abc/usd 等），返回文件路径，可作为 Pipeline 节点的输入。" % label,
                lambda a: self.export_selected(str(a.get("format") or "obj"), str(a.get("directory") or "")),
                _schema(
                    {
                        "format": {"type": "string", "description": "导出格式（默认 obj）"},
                        "directory": {"type": "string", "description": "输出目录（可选，默认临时目录）"},
                    }
                ),
            ),
            ToolSpec(
                "%s_snapshot" % p,
                "抓取 %s 当前视口的一帧截图（PNG），返回文件路径。" % label,
                lambda a: self.snapshot(str(a.get("directory") or ""), int(a.get("width") or 1280), int(a.get("height") or 720)),
                _schema(
                    {
                        "directory": {"type": "string", "description": "输出目录（可选）"},
                        "width": {"type": "integer"},
                        "height": {"type": "integer"},
                    }
                ),
            ),
        ]
        specs.extend(self.extra_tools())
        return specs

    # ── 工具参数归一化 ─────────────────────────────────────────────────────────

    def _set_parm_tool(self, args: Dict[str, Any]) -> Dict[str, Any]:
        node = str(args.get("nodePath") or args.get("node") or "")
        parm = str(args.get("parmName") or args.get("parm") or args.get("attr") or "")
        if "value" not in args:
            return {"error": "value is required"}
        self.set_parm(node, parm, args["value"])
        return {"ok": True, "nodePath": node, "parmName": parm}

    def _import_tool(self, args: Dict[str, Any]) -> Dict[str, Any]:
        path = str(args.get("filePath") or args.get("path") or "")
        if not path:
            return {"error": "filePath is required"}
        if not os.path.isfile(path):
            return {"error": "File not found: %s" % path}
        fmt = str(args.get("format") or "").lower().lstrip(".")
        if not fmt:
            fmt = os.path.splitext(path)[1].lstrip(".").lower()
        return self.import_file(path, fmt, str(args.get("parentPath") or args.get("parent") or ""))

    # ── 工具方法 ───────────────────────────────────────────────────────────────

    @staticmethod
    def make_output_dir(directory: str, prefix: str) -> str:
        if directory:
            os.makedirs(directory, exist_ok=True)
            return directory
        return tempfile.mkdtemp(prefix=prefix)


def _stringify(value: Any) -> Any:
    if isinstance(value, (str, int, float, bool)) or value is None:
        return value
    if isinstance(value, (list, tuple)):
        return [_stringify(v) for v in value]
    if isinstance(value, dict):
        return {str(k): _stringify(v) for k, v in value.items()}
    return str(value)


def is_main_thread() -> bool:
    return threading.current_thread() is threading.main_thread()
