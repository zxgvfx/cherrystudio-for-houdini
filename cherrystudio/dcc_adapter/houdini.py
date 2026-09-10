# -*- coding: utf-8 -*-
"""Houdini DCC 适配器。跑在 hython / houdinifx 进程内，只依赖标准库 + hou。"""

from __future__ import annotations

import contextlib
import os
import threading
import traceback
from typing import Any, Callable, Dict, Iterator, List, Optional

from .base import DccAdapter, is_main_thread


class _Timeout(Exception):
    pass


class HoudiniAdapter(DccAdapter):
    dcc_type = "houdini"
    display_name = "Houdini"

    def version(self) -> str:
        try:
            import hou  # type: ignore
            return str(hou.applicationVersionString())
        except Exception:  # noqa: BLE001
            return "unknown"

    def run_on_main_thread(self, fn: Callable[[], Any], timeout: float = 30.0) -> Any:
        if is_main_thread():
            return fn()
        try:
            import hou  # type: ignore
        except Exception:  # noqa: BLE001
            return fn()
        try:
            if not hou.isUIAvailable():
                return fn()
        except Exception:  # noqa: BLE001
            return fn()

        box: List[Any] = []
        err: List[BaseException] = []
        done = threading.Event()

        def _cb() -> None:
            try:
                box.append(fn())
            except BaseException as exc:  # noqa: BLE001
                err.append(exc)
            finally:
                done.set()

        try:
            import hdefereval  # type: ignore
            hdefereval.executeDeferred(_cb)
        except Exception:
            # 无 UI / 无 hdefereval 时退回直接调用
            return fn()

        if not done.wait(timeout):
            raise _Timeout("Houdini main-thread call timed out after %.1fs" % timeout)
        if err:
            raise err[0]
        return box[0] if box else None

    @contextlib.contextmanager
    def undo_group(self, label: str) -> Iterator[None]:
        import hou  # type: ignore
        with hou.undos.group(label or "Cherry Agent"):
            yield

    def main_window_handle(self) -> int:
        try:
            import hou  # type: ignore
            win = hou.qt.mainWindow()
            if win is None:
                return 0
            return int(win.winId())
        except Exception:  # noqa: BLE001
            return 0

    def exec_globals(self) -> Dict[str, Any]:
        try:
            import hou  # type: ignore
            g: Dict[str, Any] = {"hou": hou}
            try:
                pwd = hou.pwd()
                if pwd is not None:
                    g["pwd"] = pwd
                    g["hou_pwd"] = pwd
            except Exception:  # noqa: BLE001
                pass
            return g
        except Exception:  # noqa: BLE001
            return {}

    # ── 场景 ───────────────────────────────────────────────────────────────────

    def scene_info(self) -> Dict[str, Any]:
        import hou  # type: ignore
        current = self._current_network()
        selected = []
        try:
            selected = [_node_info(n) for n in hou.selectedNodes()]
        except Exception:  # noqa: BLE001
            selected = []
        info: Dict[str, Any] = {
            "dcc": "houdini",
            "hipFile": hou.hipFile.path(),
            "fps": hou.fps(),
            "currentFrame": hou.frame(),
            "selectedNodes": selected,
            "currentNetwork": current.path() if current is not None else "/obj",
        }
        try:
            start, end = hou.playbar.playbackRange()
            info["frameRange"] = [start, end]
        except Exception:  # noqa: BLE001
            pass
        return info

    def context_snapshot(self) -> Dict[str, Any]:
        info = self.scene_info()
        info["version"] = self.version()
        # 选中节点只给 path/type，避免把整棵树塞进 prompt
        selected = info.get("selectedNodes") or []
        info["selectedNodes"] = [
            {"path": n.get("path"), "type": n.get("type"), "name": n.get("name")}
            for n in selected[:12]
        ]
        if len(selected) > 12:
            info["selectedNodesTruncated"] = len(selected) - 12
        return info

    def list_nodes(self, parent: str, recursive: bool = False) -> List[Dict[str, Any]]:
        import hou  # type: ignore
        path = parent or "/obj"
        node = hou.node(path)
        if node is None:
            raise RuntimeError("Node not found: %s" % path)
        children = node.allSubChildren() if recursive else node.children()
        return [_node_info(n) for n in children]

    def get_parm(self, node: str, parm: str) -> Any:
        import hou  # type: ignore
        hou_node = hou.node(node)
        if hou_node is None:
            raise RuntimeError("Node not found: %s" % node)
        p = hou_node.parm(parm)
        if p is not None:
            return p.eval()
        pt = hou_node.parmTuple(parm)
        if pt is None:
            raise RuntimeError("Parm not found: %s.%s" % (node, parm))
        return list(pt.eval())

    def set_parm(self, node: str, parm: str, value: Any) -> None:
        import hou  # type: ignore
        hou_node = hou.node(node)
        if hou_node is None:
            raise RuntimeError("Node not found: %s" % node)
        p = hou_node.parm(parm)
        if p is not None:
            p.set(value)
            return
        pt = hou_node.parmTuple(parm)
        if pt is None:
            raise RuntimeError("Parm not found: %s.%s" % (node, parm))
        pt.set(value)

    def create_node(self, parent: str, node_type: str, name: Optional[str] = None) -> Dict[str, Any]:
        import hou  # type: ignore
        parent_path = parent or (self._current_network().path() if self._current_network() else "/obj")
        hou_parent = hou.node(parent_path)
        if hou_parent is None:
            raise RuntimeError("Parent node not found: %s" % parent_path)
        node = hou_parent.createNode(node_type, name or node_type)
        try:
            node.moveToGoodPosition()
        except Exception:  # noqa: BLE001
            pass
        return {"ok": True, "path": node.path(), "type": node.type().name()}

    def import_file(self, path: str, fmt: str = "", parent: str = "") -> Dict[str, Any]:
        import hou  # type: ignore
        fmt = (fmt or os.path.splitext(path)[1].lstrip(".")).lower()
        file_path = path.replace("\\", "/")
        base_name = os.path.splitext(os.path.basename(path))[0]
        parent_node = hou.node(parent) if parent else self._current_network()
        if parent_node is None:
            parent_node = hou.node("/obj")
        if parent_node is None:
            raise RuntimeError("Parent node not found")

        category = ""
        try:
            category = parent_node.childTypeCategory().name()
        except Exception:  # noqa: BLE001
            category = ""

        if fmt in ("usd", "usda", "usdc", "usdz"):
            return self._import_usd(parent_node, category, file_path, base_name)
        if fmt == "fbx":
            return self._import_fbx(parent_node, category, file_path, base_name)
        if fmt in ("abc", "alembic"):
            return self._import_alembic(parent_node, category, file_path, base_name)
        return self._import_file_sop(parent_node, category, file_path, base_name, fmt)

    def export_selected(self, fmt: str = "obj", directory: str = "") -> Dict[str, Any]:
        import hou  # type: ignore
        fmt = (fmt or "obj").lower().lstrip(".")
        selected = list(hou.selectedNodes())
        if not selected:
            raise RuntimeError("No nodes selected")
        out_dir = self.make_output_dir(directory, "cherry_houdini_export_")
        exported: List[str] = []
        errors: List[str] = []
        for node in selected:
            geo = _geometry_of(node)
            if geo is None:
                errors.append("%s has no geometry" % node.path())
                continue
            out_path = os.path.join(out_dir, "%s.%s" % (node.name(), fmt)).replace("\\", "/")
            try:
                geo.saveToFile(out_path)
                exported.append(out_path)
            except Exception as exc:  # noqa: BLE001
                errors.append("%s: %s" % (node.path(), exc))
        if not exported:
            raise RuntimeError("Export failed: %s" % "; ".join(errors) or "no geometry")
        return {"ok": True, "files": exported, "errors": errors}

    def snapshot(self, directory: str = "", width: int = 1280, height: int = 720) -> Dict[str, Any]:
        import hou  # type: ignore
        out_dir = self.make_output_dir(directory, "cherry_houdini_snap_")
        out_path = os.path.join(out_dir, "viewport.png").replace("\\", "/")
        try:
            viewer = hou.ui.paneTabOfType(hou.paneTabType.SceneViewer)
            if viewer is None:
                raise RuntimeError("No SceneViewer pane")
            viewport = viewer.curViewport()
            viewport.saveViewToFile(out_path, width, height)
        except Exception as exc:  # noqa: BLE001
            return {"error": str(exc), "traceback": traceback.format_exc()}
        return {"ok": True, "path": out_path}

    # ── 内部 ───────────────────────────────────────────────────────────────────

    def _current_network(self):  # type: ignore[no-untyped-def]
        try:
            import hou  # type: ignore
            if not hou.isUIAvailable():
                return hou.node("/obj")
            tab = hou.ui.paneTabOfType(hou.paneTabType.NetworkEditor)
            if tab is not None:
                pwd = tab.pwd()
                if pwd is not None:
                    return pwd
        except Exception:  # noqa: BLE001
            pass
        try:
            import hou  # type: ignore
            return hou.node("/obj")
        except Exception:  # noqa: BLE001
            return None

    def _import_usd(self, parent, category, file_path, base_name) -> Dict[str, Any]:  # type: ignore[no-untyped-def]
        import hou  # type: ignore
        target = parent
        if category != "Lop":
            stage = hou.node("/stage")
            if stage is None:
                obj = hou.node("/obj")
                stage = obj.createNode("lopnet", "stage") if obj is not None else None
            target = stage or parent
        node = target.createNode("sublayer", base_name)
        try:
            node.parm("filepath1").set(file_path)
        except Exception:  # noqa: BLE001
            if node.parm("file") is not None:
                node.parm("file").set(file_path)
        _layout(node)
        return {"ok": True, "method": "sublayer", "nodePath": node.path()}

    def _import_fbx(self, parent, category, file_path, base_name) -> Dict[str, Any]:  # type: ignore[no-untyped-def]
        geo = parent if category == "Sop" else parent.createNode("geo", base_name)
        try:
            node = geo.createNode("kinefx::fbxcharacterimport", "import")
            parm = node.parm("fbxfile") or node.parm("file")
            if parm is not None:
                parm.set(file_path)
            _display(node)
            _layout(geo if category != "Sop" else node)
            return {"ok": True, "method": "kinefx_fbxcharacterimport", "nodePath": node.path()}
        except Exception:  # noqa: BLE001
            return self._import_file_sop(parent, category, file_path, base_name, "fbx")

    def _import_alembic(self, parent, category, file_path, base_name) -> Dict[str, Any]:  # type: ignore[no-untyped-def]
        geo = parent if category == "Sop" else parent.createNode("geo", base_name)
        try:
            node = geo.createNode("alembic", "import")
            parm = node.parm("fileName") or node.parm("file")
            if parm is not None:
                parm.set(file_path)
            _display(node)
            _layout(geo if category != "Sop" else node)
            return {"ok": True, "method": "alembic", "nodePath": node.path()}
        except Exception:  # noqa: BLE001
            return self._import_file_sop(parent, category, file_path, base_name, "abc")

    def _import_file_sop(self, parent, category, file_path, base_name, fmt) -> Dict[str, Any]:  # type: ignore[no-untyped-def]
        geo = parent if category == "Sop" else parent.createNode("geo", base_name)
        node = geo.createNode("file", "import")
        node.parm("file").set(file_path)
        _display(node)
        _layout(geo if category != "Sop" else node)
        return {"ok": True, "method": "file_sop", "format": fmt, "nodePath": node.path()}


def _node_info(n) -> Dict[str, Any]:  # type: ignore[no-untyped-def]
    info: Dict[str, Any] = {"path": n.path(), "name": n.name()}
    try:
        info["type"] = n.type().name()
    except Exception:  # noqa: BLE001
        info["type"] = ""
    try:
        comment = n.comment()
        if comment:
            info["comment"] = comment
    except Exception:  # noqa: BLE001
        pass
    return info


def _geometry_of(node):  # type: ignore[no-untyped-def]
    try:
        geo = node.geometry()
        if geo is not None:
            return geo
    except Exception:  # noqa: BLE001
        pass
    try:
        display = node.displayNode() if hasattr(node, "displayNode") else None
        if display is not None:
            return display.geometry()
    except Exception:  # noqa: BLE001
        pass
    return None


def _display(node) -> None:  # type: ignore[no-untyped-def]
    try:
        node.setDisplayFlag(True)
        node.setRenderFlag(True)
    except Exception:  # noqa: BLE001
        pass


def _layout(node) -> None:  # type: ignore[no-untyped-def]
    try:
        node.moveToGoodPosition()
    except Exception:  # noqa: BLE001
        pass
