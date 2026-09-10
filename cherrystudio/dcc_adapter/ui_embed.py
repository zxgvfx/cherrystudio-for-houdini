# -*- coding: utf-8 -*-
"""把 Cherry Agent 面板以浮动窗口挂进 Houdini / Maya。

点击「启动 Agent」弹出独立浮动面板，不要拆主界面、也不要打开 Python Panel。
DCC 进程只创建原生 QWidget 宿主（Houdini=PySide2 / Maya 2025=PySide6），
WebEngine 仍在 COCO venv 的 panel_host 进程里。DCC **不**对面板 HWND
做 SetParent（跨进程改 Qt6 窗口，Qt 不知道自己被重挂，客户区会白屏）。
宿主只公布 HWND，由面板进程 ``QWindow.fromWinId`` + ``setParent`` 自己嵌进去。

禁止在本模块 import ``cherrystudio.core`` / PySide6 6.10：那会把错误的
Qt 绑进 hython。
"""

from __future__ import annotations

import logging
import os
import sys
import time
from typing import Any, Dict

from . import panel_hwnd
from . import win32_embed

log = logging.getLogger("cherry.dcc_adapter.ui_embed")

DOCK_OBJECT_NAME = "CherryAgentEmbedDock"
HOST_OBJECT_NAME = "CherryAgentEmbedHost"
MAYA_WIDGET_NAME = "CherryAgentMayaDock"
MAYA_WORKSPACE = "CherryAgentMayaDockWorkspaceControl"
TITLE = "Cherry Agent"
FLOAT_WIDTH = 440
FLOAT_HEIGHT = 760
PYPANEL_NAME = "cherry_agent_embed"
_PYPANEL_XML = """<?xml version="1.0" encoding="UTF-8"?>
<pythonPanelDocument>
  <interface name="cherry_agent_embed" label="Cherry Agent" icon="MISC_python">
    <script><![CDATA[
def onCreateInterface():
    try:
        import cherry_dcc
        cherry_dcc.ensure_importable()
    except Exception:
        pass
    from cherrystudio.dcc_adapter import ui_embed
    return ui_embed.create_houdini_panel_widget()
]]></script>
    <includeInPaneTabMenu menu_position="50" create_separator="false"/>
  </interface>
</pythonPanelDocument>
"""

_state: Dict[str, Any] = {
    "dock": None,
    "host": None,
    "status": None,
    "hwnd": 0,
    "dcc_type": "",
    "timer": None,
}


def _import_qt():
    if "hou" in sys.modules:
        try:
            from hutil.Qt import QtCore, QtGui, QtWidgets  # type: ignore
            return QtWidgets, QtCore, QtGui
        except ImportError:
            pass
        try:
            from PySide2 import QtCore, QtGui, QtWidgets  # type: ignore
            return QtWidgets, QtCore, QtGui
        except ImportError:
            pass
    try:
        from PySide6 import QtCore, QtGui, QtWidgets  # type: ignore
        return QtWidgets, QtCore, QtGui
    except ImportError:
        from PySide2 import QtCore, QtGui, QtWidgets  # type: ignore
        return QtWidgets, QtCore, QtGui


def _is_winid_change(event) -> bool:
    try:
        value = int(event.type())
    except Exception:  # noqa: BLE001
        return False
    if value == 208:
        return True
    try:
        _QtWidgets, QtCore, _QtGui = _import_qt()
        expected = getattr(QtCore.QEvent, "WinIdChange", None)
        if expected is None:
            expected = getattr(getattr(QtCore.QEvent, "Type", object), "WinIdChange", None)
        return expected is not None and event.type() == expected
    except Exception:  # noqa: BLE001
        return False


def _on_host_hwnd_changed() -> None:
    hwnd = _publish_host()
    if not hwnd:
        return
    if is_visible():
        _notify_panel("embed-into")
        _start_embed_watch()


def _on_houdini_toplevel(_floating: bool) -> None:
    _on_host_hwnd_changed()


def _make_host_class(QtWidgets, QtCore, QtGui):
    class EmbedHost(QtWidgets.QWidget):
        def __init__(self, parent=None):
            super(EmbedHost, self).__init__(parent)
            self.setObjectName(HOST_OBJECT_NAME)
            self.setAttribute(QtCore.Qt.WA_NativeWindow, True)
            self.setAttribute(QtCore.Qt.WA_OpaquePaintEvent, True)
            self.setAutoFillBackground(False)
            self.setMinimumSize(280, 200)
            self._child_hwnd = 0
            self._status_text = "正在启动 Cherry Agent…"

        def paintEvent(self, event):
            # 面板还没嵌进来时刷深色，避免 Houdini 白底当成「白屏」。
            # 有跨进程子 HWND 时不要再画：CLIPCHILDREN 会留出子窗口，文字也不能盖上去。
            if self._child_hwnd:
                return
            painter = QtGui.QPainter(self)
            painter.fillRect(event.rect(), QtGui.QColor(26, 26, 26))
            text = str(getattr(self, "_status_text", "") or "正在加载 Cherry Agent…")
            painter.setPen(QtGui.QColor(180, 180, 180))
            painter.drawText(
                event.rect().adjusted(20, 20, -20, -20),
                int(QtCore.Qt.AlignCenter) | int(QtCore.Qt.TextWordWrap),
                text,
            )

        def child_hwnd(self):
            return self._child_hwnd

        def set_child_hwnd(self, hwnd):
            self._child_hwnd = int(hwnd or 0)
            self.setAttribute(QtCore.Qt.WA_OpaquePaintEvent, not bool(self._child_hwnd))
            self.setAttribute(QtCore.Qt.WA_NoSystemBackground, bool(self._child_hwnd))
            self.winId()
            try:
                win32_embed.prepare_host(int(self.winId()))
            except Exception as exc:  # noqa: BLE001
                log.warning("prepare_host failed: %s", exc)
            self.update()

        def native_hwnd(self):
            return int(self.winId())

        def resizeEvent(self, event):
            super(EmbedHost, self).resizeEvent(event)
            label = _state.get("status")
            if label is not None:
                try:
                    label.setGeometry(self.rect())
                except Exception:  # noqa: BLE001
                    pass

        def mousePressEvent(self, event):
            super(EmbedHost, self).mousePressEvent(event)
            hwnd = int(self._child_hwnd or 0)
            if hwnd:
                try:
                    win32_embed.focus(hwnd, int(self.winId()))
                except Exception:  # noqa: BLE001
                    pass

        def event(self, event):
            result = super(EmbedHost, self).event(event)
            try:
                if _is_winid_change(event):
                    _on_host_hwnd_changed()
            except Exception:  # noqa: BLE001
                pass
            return result

        def showEvent(self, event):
            super(EmbedHost, self).showEvent(event)
            try:
                win32_embed.prepare_host(int(self.winId()))
            except Exception:  # noqa: BLE001
                pass
            _publish_host()

        def closeEvent(self, event):
            super(EmbedHost, self).closeEvent(event)

    return EmbedHost


def _publish_host() -> int:
    host = _state.get("host")
    session_id = str(_state.get("session_id") or "")
    if host is None:
        return 0
    try:
        hwnd = int(host.winId())
    except Exception:  # noqa: BLE001
        return 0
    if not hwnd:
        return 0
    try:
        win32_embed.prepare_host(hwnd)
    except Exception:  # noqa: BLE001
        pass
    if session_id:
        panel_hwnd.write_host_hwnd(session_id, hwnd)
    log.info("published host hwnd=%s session=%s", hwnd, session_id[:8] if session_id else "")
    return hwnd


def _notify_panel(action: str) -> None:
    session_id = str(_state.get("session_id") or "")
    if not session_id:
        return
    url = panel_hwnd.read_bridge_url(session_id)
    if not url:
        return
    try:
        import urllib.request
        req = urllib.request.Request(
            url.rstrip("/") + "/control/" + action,
            data=b"{}",
            method="POST",
            headers={"Content-Type": "application/json"},
        )
        urllib.request.urlopen(req, timeout=2).read()
    except Exception as exc:  # noqa: BLE001
        log.debug("notify panel %s failed: %s", action, exc)


def _release_host() -> None:
    """关掉停靠时清掉宿主 HWND，面板 250ms 同步才会真正停住，而不是误嵌进隐藏窗。"""
    _stop_embed_watch()
    session_id = str(_state.get("session_id") or "")
    if session_id:
        panel_hwnd.remove_host_hwnd(session_id)
    host = _state.get("host")
    if host is not None:
        try:
            host.set_child_hwnd(0)
        except Exception:  # noqa: BLE001
            pass


def _stop_embed_watch() -> None:
    timer = _state.get("embed_timer")
    if timer is None:
        return
    try:
        timer.stop()
    except Exception:  # noqa: BLE001
        pass


def _start_embed_watch() -> None:
    """浮动过程中 HWND 会重建；在可见期间反复公布宿主，让面板自己嵌进来。"""
    _state["embed_watch_until"] = time.time() + 45.0
    timer = _state.get("embed_timer")
    if timer is None:
        QtWidgets, QtCore, _QtGui = _import_qt()
        timer = QtCore.QTimer()
        timer.setInterval(400)
        timer.timeout.connect(_on_embed_watch)
        _state["embed_timer"] = timer
    try:
        if not timer.isActive():
            timer.start()
    except Exception:  # noqa: BLE001
        try:
            timer.start()
        except Exception:  # noqa: BLE001
            pass
    _on_embed_watch()


def _on_embed_watch() -> None:
    until = float(_state.get("embed_watch_until") or 0)
    if time.time() > until:
        _stop_embed_watch()
        return
    if not is_visible():
        return
    host_hwnd = _publish_host()
    _notify_panel("embed-into")
    hwnd = int(_state.get("hwnd") or 0)
    host = _state.get("host")
    if host is not None and hwnd:
        try:
            host.set_child_hwnd(hwnd)
        except Exception:  # noqa: BLE001
            pass
    log.debug("embed watch host=%s panel=%s", host_hwnd, hwnd)


def _cancel_hide_timer() -> None:
    timer = _state.get("hide_timer")
    if timer is None:
        return
    try:
        timer.stop()
    except Exception:  # noqa: BLE001
        pass


def _schedule_hide_if_invisible() -> None:
    QtWidgets, QtCore, _QtGui = _import_qt()
    timer = _state.get("hide_timer")
    if timer is None:
        timer = QtCore.QTimer()
        timer.setSingleShot(True)
        timer.timeout.connect(_hide_if_still_invisible)
        _state["hide_timer"] = timer
    timer.start(450)


def _hide_if_still_invisible() -> None:
    if is_visible():
        _publish_host()
        _notify_panel("embed-into")
        _start_embed_watch()
        return
    _release_host()
    _notify_panel("hide")


def create_houdini_panel_widget():
    """Houdini Python Panel ``onCreateInterface`` 入口。"""
    host = _host_class()()
    _state["host"] = host
    _state["dock"] = host
    hwnd = int(_state.get("hwnd") or 0)
    if hwnd:
        host.set_child_hwnd(hwnd)
    else:
        set_status("正在启动 Cherry Agent…")
    _publish_host()
    return host


def _host_class():
    QtWidgets, QtCore, _QtGui = _import_qt()
    cached = _state.get("host_cls")
    if cached is None:
        cached = _make_host_class(QtWidgets, QtCore, _QtGui)
        _state["host_cls"] = cached
    return cached


def set_status(message: str) -> Dict[str, Any]:
    # 不要在宿主上盖 QLabel：那会变成盖住外进程 WebEngine 的白/灰遮罩。
    # 只把文字画在 paintEvent 里，且仅在还没有子 HWND 时绘制。
    log.info("status: %s", message)
    _state["status_text"] = message
    host = _state.get("host")
    if host is not None:
        try:
            host._status_text = message
            host.update()
        except Exception:  # noqa: BLE001
            pass
    label = _state.get("status")
    if label is not None:
        try:
            label.hide()
        except Exception:  # noqa: BLE001
            pass
    return {"ok": True, "status": message}


def attach_hwnd(hwnd: int, session_id: str = "") -> Dict[str, Any]:
    hwnd = int(hwnd or 0)
    _state["hwnd"] = hwnd
    if session_id:
        _state["session_id"] = session_id
    host = _state.get("host")
    if host is None:
        log.info("host not ready, cached hwnd=%s", hwnd)
        return {"ok": True, "pending": True, "hwnd": hwnd}
    label = _state.get("status")
    if label is not None:
        label.hide()
    try:
        host.set_child_hwnd(hwnd)
    except Exception:  # noqa: BLE001
        pass
    host_hwnd = _publish_host()
    _notify_panel("embed-into")
    log.info("asked panel QWindow.setParent into host=%s (panel hwnd=%s)", host_hwnd, hwnd)
    return {"ok": True, "hwnd": hwnd, "host": host_hwnd, "mode": "qwindow"}


def is_visible() -> bool:
    dcc = _state.get("dcc_type") or ""
    if dcc == "maya":
        try:
            import maya.cmds as cmds  # type: ignore
            if cmds.workspaceControl(MAYA_WORKSPACE, q=True, exists=True):
                return bool(cmds.workspaceControl(MAYA_WORKSPACE, q=True, visible=True))
        except Exception:  # noqa: BLE001
            pass
    dock = _state.get("dock")
    if dock is None:
        return False
    try:
        return bool(dock.isVisible())
    except Exception:  # noqa: BLE001
        return False


def hide() -> Dict[str, Any]:
    _cancel_hide_timer()
    _release_host()
    _notify_panel("hide")
    dcc = _state.get("dcc_type") or ""
    if dcc == "maya":
        try:
            import maya.cmds as cmds  # type: ignore
            if cmds.workspaceControl(MAYA_WORKSPACE, q=True, exists=True):
                cmds.workspaceControl(MAYA_WORKSPACE, e=True, visible=False)
                return {"ok": True, "visible": False, "host": "maya"}
        except Exception as exc:  # noqa: BLE001
            log.warning("maya hide failed: %s", exc)
    _close_leftover_houdini_python_panel()
    dock = _state.get("dock")
    if dock is not None:
        try:
            dock.hide()
        except Exception:  # noqa: BLE001
            pass
    return {"ok": True, "visible": False}


def show(hwnd: int, dcc_type: str, session_id: str = "") -> Dict[str, Any]:
    dcc_type = (dcc_type or "").lower()
    _state["dcc_type"] = dcc_type
    if session_id:
        _state["session_id"] = session_id
    if dcc_type == "maya":
        result = _show_maya(int(hwnd or 0))
    else:
        result = _show_houdini(int(hwnd or 0))
    _publish_host()
    _notify_panel("embed-into")
    _start_embed_watch()
    set_status("正在加载 Cherry Agent…")
    if hwnd:
        attach_hwnd(hwnd, session_id=str(_state.get("session_id") or ""))
    result["visible"] = True
    return result


def _close_leftover_houdini_python_panel() -> None:
    """旧版本会拆出 Python Panel；启动浮动窗时清掉，避免桌面上留一块 Python 页。"""
    tab = _houdini_python_panel_tab()
    if tab is None:
        return
    try:
        tab.close()
        log.info("closed leftover Cherry Agent python panel")
    except Exception as exc:  # noqa: BLE001
        log.warning("close leftover python panel failed: %s", exc)


def _houdini_python_panel_tab():
    try:
        import hou  # type: ignore
        desktop = hou.ui.curDesktop()
        if desktop is None:
            return None
        for tab in desktop.paneTabs():
            if tab.type() != hou.paneTabType.PythonPanel:
                continue
            try:
                iface = tab.activeInterface()
            except Exception:  # noqa: BLE001
                continue
            if iface is not None and iface.name() == PYPANEL_NAME:
                return tab
    except Exception:  # noqa: BLE001
        return None
    return None


def _install_houdini_pypanel():
    import hou  # type: ignore
    directory = os.path.join(os.path.expanduser("~"), ".cherrystudio", "houdini")
    os.makedirs(directory, exist_ok=True)
    path = os.path.join(directory, "cherry_agent.pypanel")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(_PYPANEL_XML)
    hou.pypanel.installFile(path)
    try:
        names = list(hou.pypanel.menuInterfaces() or ())
        if PYPANEL_NAME not in names:
            hou.pypanel.setMenuInterfaces(tuple(names + [PYPANEL_NAME]))
    except Exception:  # noqa: BLE001
        pass
    iface = hou.pypanel.interfaceByName(PYPANEL_NAME)
    if iface is not None:
        return iface
    interfaces = hou.pypanel.interfaces()
    if isinstance(interfaces, dict):
        return interfaces.get(PYPANEL_NAME)
    for item in interfaces or ():
        if getattr(item, "name", lambda: "")() == PYPANEL_NAME:
            return item
    return None


def _show_houdini(hwnd: int) -> Dict[str, Any]:
    _close_leftover_houdini_python_panel()
    try:
        result = _show_houdini_dock(hwnd)
        if result.get("ok"):
            result["floating"] = True
            return result
        log.warning("houdini floating dock failed: %s", result.get("error"))
        return result
    except Exception as exc:  # noqa: BLE001
        log.warning("houdini floating dock failed: %s", exc)
        return {"ok": False, "error": str(exc)}


def _place_floating_dock(dock, main) -> None:  # type: ignore[no-untyped-def]
    try:
        dock.setFloating(True)
    except Exception:  # noqa: BLE001
        pass
    try:
        dock.resize(FLOAT_WIDTH, FLOAT_HEIGHT)
    except Exception:  # noqa: BLE001
        pass
    try:
        frame = main.frameGeometry() if hasattr(main, "frameGeometry") else main.geometry()
        x = int(frame.x() + max(24, frame.width() - FLOAT_WIDTH - 32))
        y = int(frame.y() + 64)
        dock.move(x, y)
    except Exception:  # noqa: BLE001
        pass
    dock.show()
    dock.raise_()


def _show_houdini_python_panel(hwnd: int) -> Dict[str, Any]:
    import hou  # type: ignore
    iface = _install_houdini_pypanel()
    if iface is None:
        return {"ok": False, "error": "pypanel interface missing"}
    tab = _houdini_python_panel_tab()
    if tab is None:
        desktop = hou.ui.curDesktop()
        if desktop is None:
            return {"ok": False, "error": "no desktop"}
        panes = list(desktop.panes())
        pane = panes[-1] if panes else None
        if pane is None:
            floating = desktop.createFloatingPanel(hou.paneTabType.PythonPanel)
            tab = floating.paneTabs()[0]
        else:
            try:
                if not _state.get("houdini_did_split"):
                    pane = pane.splitVertically()
                    _state["houdini_did_split"] = True
            except Exception:  # noqa: BLE001
                pass
            tab = pane.createTab(hou.paneTabType.PythonPanel)
        tab.setActiveInterface(iface)
    tab.setIsCurrentTab()
    _publish_host()
    return {"ok": True, "host": "houdini-pypanel"}


def _show_houdini_dock(hwnd: int) -> Dict[str, Any]:
    QtWidgets, QtCore, _QtGui = _import_qt()
    import hou  # type: ignore

    main = hou.qt.mainWindow()
    if main is None:
        raise RuntimeError("hou.qt.mainWindow() 不可用")

    dock = main.findChild(QtWidgets.QDockWidget, DOCK_OBJECT_NAME)
    if dock is None:
        host = _host_class()(main)
        dock = QtWidgets.QDockWidget(TITLE, main)
        dock.setObjectName(DOCK_OBJECT_NAME)
        dock.setAllowedAreas(
            QtCore.Qt.LeftDockWidgetArea | QtCore.Qt.RightDockWidgetArea
        )
        dock.setFeatures(
            QtWidgets.QDockWidget.DockWidgetClosable
            | QtWidgets.QDockWidget.DockWidgetMovable
            | QtWidgets.QDockWidget.DockWidgetFloatable
        )
        dock.setWidget(host)
        try:
            dock.setAttribute(QtCore.Qt.WA_DeleteOnClose, False)
        except Exception:  # noqa: BLE001
            pass
        if hasattr(main, "addDockWidget"):
            main.addDockWidget(QtCore.Qt.RightDockWidgetArea, dock)
        else:
            dock.setParent(main)
        try:
            dock.setFloating(True)
        except Exception:  # noqa: BLE001
            pass
        dock.visibilityChanged.connect(_on_houdini_visibility)
        if hasattr(dock, "topLevelChanged"):
            dock.topLevelChanged.connect(_on_houdini_toplevel)
        _state["dock"] = dock
        _state["host"] = host
    else:
        host = dock.findChild(QtWidgets.QWidget, HOST_OBJECT_NAME) or _state.get("host")
        _state["dock"] = dock
        _state["host"] = host

    try:
        dock.setVisible(True)
    except Exception:  # noqa: BLE001
        pass
    _place_floating_dock(dock, main)
    _publish_host()
    _notify_panel("embed-into")
    _start_embed_watch()
    return {"ok": True, "host": "houdini-dock", "floating": True}


def _on_houdini_visibility(visible: bool) -> None:
    # setFloating(True) 会先发 False 再发 True。立刻 hide 会把面板停掉，留下灰窗。
    if visible:
        _cancel_hide_timer()
        _publish_host()
        _notify_panel("embed-into")
        _start_embed_watch()
        return
    _schedule_hide_if_invisible()


def _wrap_maya_widget(ptr, cls):
    try:
        from shiboken6 import wrapInstance  # type: ignore
    except ImportError:
        from shiboken2 import wrapInstance  # type: ignore
    return wrapInstance(int(ptr), cls)


def _show_maya(hwnd: int) -> Dict[str, Any]:
    QtWidgets, QtCore, _QtGui = _import_qt()
    import maya.cmds as cmds  # type: ignore
    import maya.OpenMayaUI as omui  # type: ignore

    existing = _state.get("dock")
    if existing is not None:
        try:
            if cmds.workspaceControl(MAYA_WORKSPACE, q=True, exists=True):
                cmds.workspaceControl(MAYA_WORKSPACE, e=True, restore=True)
                cmds.workspaceControl(MAYA_WORKSPACE, e=True, visible=True, floating=True)
                if hwnd:
                    host = _state.get("host")
                    if host is not None:
                        host.set_child_hwnd(hwnd)
                _publish_host()
                return {"ok": True, "host": "maya-workspace"}
        except Exception:  # noqa: BLE001
            pass

    main_ptr = omui.MQtUtil.mainWindow()
    main = _wrap_maya_widget(main_ptr, QtWidgets.QMainWindow) if main_ptr else None

    mixin_cls = None
    try:
        from maya.app.general.mayaMixin import MayaQWidgetDockableMixin  # type: ignore

        class _MayaDock(MayaQWidgetDockableMixin, QtWidgets.QWidget):
            def __init__(self, parent=None):
                super(_MayaDock, self).__init__(parent=parent)
                self.setObjectName(MAYA_WIDGET_NAME)
                self.setWindowTitle(TITLE)
                layout = QtWidgets.QVBoxLayout(self)
                layout.setContentsMargins(0, 0, 0, 0)
                self.host = _host_class()(self)
                layout.addWidget(self.host)

        mixin_cls = _MayaDock
    except Exception as exc:  # noqa: BLE001
        log.warning("MayaQWidgetDockableMixin unavailable: %s", exc)

    if mixin_cls is not None:
        if cmds.workspaceControl(MAYA_WORKSPACE, q=True, exists=True):
            try:
                cmds.deleteUI(MAYA_WORKSPACE)
            except Exception:  # noqa: BLE001
                pass
        dock = mixin_cls(parent=main)
        try:
            dock.show(dockable=True, floating=True, area="right", width=FLOAT_WIDTH, height=FLOAT_HEIGHT)
        except TypeError:
            try:
                dock.show(dockable=True, floating=True, area="right", width=FLOAT_WIDTH)
            except TypeError:
                dock.show(dockable=True, floating=True)
        _state["dock"] = dock
        _state["host"] = dock.host
        _publish_host()
        return {"ok": True, "host": "maya-mixin"}

    host = _host_class()(main)
    host.setParent(main)
    if cmds.workspaceControl(MAYA_WORKSPACE, q=True, exists=True):
        cmds.deleteUI(MAYA_WORKSPACE)
    kwargs = {
        "label": TITLE,
        "retain": True,
        "loadImmediately": True,
        "initialWidth": FLOAT_WIDTH,
        "r": True,
        "vis": True,
        "floating": True,
    }
    cmds.workspaceControl(MAYA_WORKSPACE, **kwargs)
    ctrl_ptr = omui.MQtUtil.findControl(MAYA_WORKSPACE)
    if ctrl_ptr:
        parent_w = _wrap_maya_widget(ctrl_ptr, QtWidgets.QWidget)
        host.setParent(parent_w)
        layout = parent_w.layout()
        if layout is None:
            layout = QtWidgets.QVBoxLayout(parent_w)
            layout.setContentsMargins(0, 0, 0, 0)
        layout.addWidget(host)
    _state["dock"] = host
    _state["host"] = host
    _publish_host()
    return {"ok": True, "host": "maya-workspace"}
