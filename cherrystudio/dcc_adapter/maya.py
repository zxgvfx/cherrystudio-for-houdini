# -*- coding: utf-8 -*-
"""Maya DCC 适配器。跑在 mayapy / Maya 进程内，只依赖标准库 + cmds。"""

from __future__ import annotations

import contextlib
import os
import tempfile
import threading
import traceback
from typing import Any, Callable, Dict, Iterator, List, Optional

from .base import DccAdapter, ToolSpec, _schema, is_main_thread


class _Timeout(Exception):
    pass


class MayaAdapter(DccAdapter):
    dcc_type = "maya"
    display_name = "Maya"

    def version(self) -> str:
        try:
            import maya.cmds as cmds  # type: ignore
            return str(cmds.about(version=True))
        except Exception:  # noqa: BLE001
            return "unknown"

    def run_on_main_thread(self, fn: Callable[[], Any], timeout: float = 30.0) -> Any:
        if is_main_thread():
            return fn()
        try:
            import maya.utils as maya_utils  # type: ignore
        except Exception:  # noqa: BLE001
            return fn()

        box: List[Any] = []
        err: List[BaseException] = []

        def _run() -> None:
            try:
                box.append(maya_utils.executeInMainThreadWithResult(fn))
            except BaseException as exc:  # noqa: BLE001
                err.append(exc)

        worker = threading.Thread(target=_run, name="CherryMayaMainCall", daemon=True)
        worker.start()
        worker.join(timeout)
        if worker.is_alive():
            raise _Timeout("Maya main-thread call timed out after %.1fs" % timeout)
        if err:
            raise err[0]
        return box[0] if box else None

    @contextlib.contextmanager
    def undo_group(self, label: str) -> Iterator[None]:
        import maya.cmds as cmds  # type: ignore
        cmds.undoInfo(openChunk=True, chunkName=label or "Cherry Agent")
        try:
            yield
        finally:
            cmds.undoInfo(closeChunk=True)

    def main_window_handle(self) -> int:
        try:
            import maya.OpenMayaUI as omui  # type: ignore
            ptr = omui.MQtUtil.mainWindow()
            if ptr is None:
                return 0
            return int(ptr)
        except Exception:  # noqa: BLE001
            return 0

    def exec_globals(self) -> Dict[str, Any]:
        g: Dict[str, Any] = {}
        try:
            import maya.cmds as cmds  # type: ignore
            g["cmds"] = cmds
            g["maya_cmds"] = cmds
        except Exception:  # noqa: BLE001
            pass
        try:
            import maya.mel as mel  # type: ignore
            g["mel"] = mel
        except Exception:  # noqa: BLE001
            pass
        return g

    def extra_tools(self) -> List[ToolSpec]:
        return [
            ToolSpec(
                "maya_exec_mel",
                "在 Maya 中执行 MEL 语句，把要返回的值用 print 或赋给 result。需要用户确认。",
                lambda a: self._exec_mel(str(a.get("code") or a.get("mel") or "")),
                _schema({"code": {"type": "string", "description": "MEL 代码"}}, ["code"]),
                kind="write",
                undo_label="Cherry Agent: exec MEL",
            ),
            ToolSpec(
                "maya_get_attr",
                "读取 Maya 节点属性（兼容旧工具名，等价于 maya_get_parm）。",
                lambda a: {"value": self.get_parm(str(a.get("node") or a.get("nodePath") or ""), str(a.get("attr") or a.get("parmName") or ""))},
                _schema(
                    {
                        "node": {"type": "string"},
                        "attr": {"type": "string"},
                    },
                    ["node", "attr"],
                ),
            ),
            ToolSpec(
                "maya_set_attr",
                "设置 Maya 节点属性（兼容旧工具名，等价于 maya_set_parm）。会进入 undo 组。",
                lambda a: self._set_parm_tool({"nodePath": a.get("node"), "parmName": a.get("attr"), "value": a.get("value")}),
                _schema(
                    {
                        "node": {"type": "string"},
                        "attr": {"type": "string"},
                        "value": {},
                    },
                    ["node", "attr", "value"],
                ),
                kind="write",
                undo_label="Cherry Agent: set attr",
            ),
        ]

    def scene_info(self) -> Dict[str, Any]:
        import maya.cmds as cmds  # type: ignore
        selected = cmds.ls(selection=True, long=True) or []
        return {
            "dcc": "maya",
            "scenePath": cmds.file(q=True, sceneName=True) or "(untitled)",
            "fps": cmds.currentUnit(q=True, time=True),
            "frameRange": [
                cmds.playbackOptions(q=True, minTime=True),
                cmds.playbackOptions(q=True, maxTime=True),
            ],
            "currentFrame": cmds.currentTime(q=True),
            "selectedNodes": selected[:24],
            "currentNetwork": (selected[0] if selected else ""),
        }

    def context_snapshot(self) -> Dict[str, Any]:
        info = self.scene_info()
        info["version"] = self.version()
        selected = info.get("selectedNodes") or []
        if len(selected) > 12:
            info["selectedNodes"] = selected[:12]
            info["selectedNodesTruncated"] = len(selected) - 12
        return info

    def list_nodes(self, parent: str, recursive: bool = False) -> List[Dict[str, Any]]:
        import maya.cmds as cmds  # type: ignore
        if not parent:
            names = cmds.ls("|*", long=True) or []
            if recursive:
                names = cmds.ls(long=True, dag=True) or names
            return [_maya_node_info(n) for n in names]
        if not cmds.objExists(parent):
            raise RuntimeError("Node not found: %s" % parent)
        names = cmds.listRelatives(parent, children=True, fullPath=True, allDescendents=bool(recursive)) or []
        return [_maya_node_info(n) for n in names]

    def get_parm(self, node: str, parm: str) -> Any:
        import maya.cmds as cmds  # type: ignore
        full = _attr(node, parm)
        if not cmds.objExists(full):
            raise RuntimeError("Attribute not found: %s" % full)
        return cmds.getAttr(full)

    def set_parm(self, node: str, parm: str, value: Any) -> None:
        import maya.cmds as cmds  # type: ignore
        full = _attr(node, parm)
        if not cmds.objExists(full):
            raise RuntimeError("Attribute not found: %s" % full)
        if isinstance(value, (list, tuple)):
            cmds.setAttr(full, *value)
        elif isinstance(value, str):
            cmds.setAttr(full, value, type="string")
        else:
            cmds.setAttr(full, value)

    def create_node(self, parent: str, node_type: str, name: Optional[str] = None) -> Dict[str, Any]:
        import maya.cmds as cmds  # type: ignore
        kwargs: Dict[str, Any] = {"name": name} if name else {}
        if parent:
            if not cmds.objExists(parent):
                raise RuntimeError("Parent node not found: %s" % parent)
            created = cmds.createNode(node_type, parent=parent, **kwargs)
        else:
            created = cmds.createNode(node_type, **kwargs)
        path = cmds.ls(created, long=True)[0]
        return {"ok": True, "path": path, "type": node_type}

    def import_file(self, path: str, fmt: str = "", parent: str = "") -> Dict[str, Any]:
        import maya.cmds as cmds  # type: ignore
        fmt = (fmt or os.path.splitext(path)[1].lstrip(".")).lower()
        file_path = path.replace("\\", "/")
        converted: Dict[str, str] = {}
        if fmt in ("glb", "gltf"):
            converted = _convert_gltf_to_obj(path)
            if converted.get("error"):
                # 没有 trimesh 时仍尝试原生 glTF translator
                converted = {"error": converted["error"]}

        def _top() -> List[str]:
            return cmds.ls("|*", long=True) or []

        ns_opts: Dict[str, Any] = {"mergeNamespacesOnClash": True}
        before = set(_top())

        if fmt == "fbx":
            cmds.loadPlugin("fbxmaya", quiet=True)
            cmds.file(file_path, i=True, type="FBX", ignoreVersion=True, returnNewNodes=False, **ns_opts)
            method = "fbx_import"
        elif fmt in ("obj",):
            cmds.loadPlugin("objExport", quiet=True)
            cmds.file(file_path, i=True, type="OBJ", ignoreVersion=True, returnNewNodes=False, **ns_opts)
            method = "obj_import"
        elif fmt in ("abc", "alembic"):
            cmds.loadPlugin("AbcImport", quiet=True)
            cmds.AbcImport(file_path, mode="import")
            method = "abc_import"
        elif fmt in ("usd", "usda", "usdc", "usdz"):
            cmds.loadPlugin("mayaUsdPlugin", quiet=True)
            cmds.file(file_path, i=True, type="USD Import", ignoreVersion=True, returnNewNodes=False, **ns_opts)
            method = "usd_import"
        elif fmt in ("glb", "gltf") and converted.get("outputPath"):
            cmds.loadPlugin("objExport", quiet=True)
            cmds.file(converted["outputPath"].replace("\\", "/"), i=True, type="OBJ", ignoreVersion=True, returnNewNodes=False, **ns_opts)
            method = "gltf_to_obj_import"
        elif fmt in ("glb", "gltf"):
            try:
                cmds.loadPlugin("glTFTranslator", quiet=True)
            except Exception:  # noqa: BLE001
                pass
            try:
                cmds.file(file_path, i=True, type="glTF Import", ignoreVersion=True, returnNewNodes=False, **ns_opts)
            except RuntimeError:
                cmds.file(file_path, i=True, ignoreVersion=True, returnNewNodes=False, **ns_opts)
            method = "gltf_import"
        else:
            cmds.file(file_path, i=True, ignoreVersion=True, returnNewNodes=False, **ns_opts)
            method = "auto_import"

        after = set(_top())
        new_nodes = list(after - before)
        if parent and new_nodes:
            try:
                cmds.parent(new_nodes, parent)
            except Exception:  # noqa: BLE001
                pass
        result: Dict[str, Any] = {"ok": True, "method": method, "newTopNodes": new_nodes}
        if converted.get("error"):
            result["conversionError"] = converted["error"]
        if converted.get("outputPath"):
            result["convertedObjPath"] = converted["outputPath"]
        return result

    def export_selected(self, fmt: str = "obj", directory: str = "") -> Dict[str, Any]:
        import maya.cmds as cmds  # type: ignore
        fmt = (fmt or "obj").lower().lstrip(".")
        selected = cmds.ls(selection=True, long=True) or []
        if not selected:
            raise RuntimeError("No objects selected")
        out_dir = self.make_output_dir(directory, "cherry_maya_export_")
        stem = (selected[0].rsplit("|", 1)[-1] or "export").replace(":", "_")
        out_path = os.path.join(out_dir, "%s.%s" % (stem, fmt)).replace("\\", "/")
        if fmt == "obj":
            cmds.loadPlugin("objExport", quiet=True)
            cmds.file(out_path, force=True, options="groups=1;ptgroups=1;materials=0;smoothing=1;normals=1", typ="OBJexport", pr=True, es=True)
        elif fmt == "fbx":
            cmds.loadPlugin("fbxmaya", quiet=True)
            cmds.file(out_path, force=True, typ="FBX export", pr=True, es=True)
        elif fmt in ("abc", "alembic"):
            cmds.loadPlugin("AbcExport", quiet=True)
            roots = " ".join("-root %s" % n for n in selected)
            cmds.AbcExport(j="-frameRange 1 1 %s -file %s" % (roots, out_path))
        else:
            cmds.file(out_path, force=True, typ=fmt, pr=True, es=True)
        return {"ok": True, "files": [out_path]}

    def snapshot(self, directory: str = "", width: int = 1280, height: int = 720) -> Dict[str, Any]:
        import maya.cmds as cmds  # type: ignore
        out_dir = self.make_output_dir(directory, "cherry_maya_snap_")
        out_path = os.path.join(out_dir, "viewport.png").replace("\\", "/")
        try:
            cmds.playblast(
                completeFilename=out_path,
                format="image",
                compression="png",
                width=width,
                height=height,
                percent=100,
                quality=100,
                viewer=False,
                showOrnaments=False,
                frame=cmds.currentTime(q=True),
                offScreen=True,
                forceOverwrite=True,
            )
        except Exception as exc:  # noqa: BLE001
            return {"error": str(exc), "traceback": traceback.format_exc()}
        return {"ok": True, "path": out_path}

    def _exec_mel(self, code: str) -> Dict[str, Any]:
        if not code.strip():
            return {"error": "empty code"}
        import maya.mel as mel  # type: ignore
        try:
            result = mel.eval(code)
            return {"ok": True, "result": "" if result is None else str(result)}
        except Exception as exc:  # noqa: BLE001
            return {"ok": False, "error": str(exc), "traceback": traceback.format_exc()}


def _attr(node: str, parm: str) -> str:
    if "." in parm and (not node or parm.startswith(node)):
        return parm
    return "%s.%s" % (node, parm)


def _maya_node_info(name: str) -> Dict[str, Any]:
    info: Dict[str, Any] = {"path": name, "name": name.rsplit("|", 1)[-1]}
    try:
        import maya.cmds as cmds  # type: ignore
        types = cmds.nodeType(name, inherited=True) or []
        info["type"] = types[-1] if types else cmds.nodeType(name)
    except Exception:  # noqa: BLE001
        info["type"] = ""
    return info


def _convert_gltf_to_obj(file_path: str) -> Dict[str, str]:
    try:
        import trimesh  # type: ignore[import-not-found]
    except ImportError:
        return {"error": "trimesh not installed; cannot convert GLB/GLTF to OBJ"}
    temp_dir = tempfile.mkdtemp(prefix="cherry_maya_gltf_")
    output_path = os.path.join(temp_dir, os.path.splitext(os.path.basename(file_path))[0] + ".obj")
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
    except Exception as exc:  # noqa: BLE001
        return {"error": "trimesh conversion failed: %s" % exc}
