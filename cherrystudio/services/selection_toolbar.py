"""
选区工具栏窗口 —— 无边框透明置顶悬浮条。

加载 toolbar.html，通过 QWebChannel 暴露 ToolbarBridge 给 JS，
HTML 中的按钮点击会触发 action_triggered 信号。
"""

import os
import logging

from PySide6.QtCore import Qt, QObject, Signal, Slot, QUrl
from PySide6.QtWidgets import QMainWindow, QApplication
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWebEngineCore import (
    QWebEnginePage,
    QWebEngineProfile,
    QWebEngineScript,
)
from PySide6.QtWebChannel import QWebChannel

logger = logging.getLogger(__name__)

_RESOURCES_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "resources",
    "selection",
)
_TOOLBAR_HTML = os.path.join(_RESOURCES_DIR, "toolbar.html")

_QWEBCHANNEL_JS_SETUP = """
(function() {
    var script = document.createElement('script');
    script.src = 'qrc:///qtwebchannel/qwebchannel.js';
    script.onload = function() {
        new QWebChannel(qt.webChannelTransport, function(channel) {
            window.qtBridge = channel.objects.bridge;
            // toolbar.html 在 window.load 里调用 reportSize，此时 bridge 可能还没就绪，
            // 所以手动再触发一次。
            if (window.qtBridge && window.qtBridge.onReady) {
                var tb = document.getElementById('toolbar');
                if (tb) {
                    var r = tb.getBoundingClientRect();
                    // Add margin buffer (left 3 + right 3 + extra 10)
                    window.qtBridge.onReady(Math.ceil(r.width) + 16, Math.ceil(r.height) + 17);
                }
            }
        });
    };
    document.head.appendChild(script);
})();
"""


class ToolbarBridge(QObject):
    """JS ↔ Python 桥接对象，通过 QWebChannel 暴露给页面。"""

    action_triggered = Signal(str)
    size_reported = Signal(int, int)
    drag_started = Signal(int, int)
    drag_moved = Signal(int, int)

    @Slot(str)
    def onAction(self, action_id: str):
        self.action_triggered.emit(action_id)

    @Slot(int, int)
    def onReady(self, width: int, height: int):
        self.size_reported.emit(width, height)

    @Slot(int, int)
    def onDragStart(self, screen_x: int, screen_y: int):
        self.drag_started.emit(screen_x, screen_y)

    @Slot(int, int)
    def onDragMove(self, screen_x: int, screen_y: int):
        self.drag_moved.emit(screen_x, screen_y)


class SelectionToolbarWindow(QMainWindow):
    """无边框透明置顶工具栏，加载 toolbar.html。"""

    action_triggered = Signal(str)

    _INITIAL_W = 350
    _INITIAL_H = 43

    def __init__(self, parent=None):
        super().__init__(parent)

        self.setWindowFlags(
            Qt.WindowType.FramelessWindowHint
            | Qt.WindowType.WindowStaysOnTopHint
            | Qt.WindowType.Tool
            | Qt.WindowType.WindowDoesNotAcceptFocus
        )
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self.resize(self._INITIAL_W, self._INITIAL_H)

        # ── Drag state ──
        self._drag_origin_x = 0
        self._drag_origin_y = 0
        self._drag_win_x = 0
        self._drag_win_y = 0

        # ── Bridge & Channel ──
        self._bridge = ToolbarBridge(self)
        self._bridge.action_triggered.connect(self.action_triggered)
        self._bridge.size_reported.connect(self._on_size_reported)
        self._bridge.drag_started.connect(self._on_drag_start)
        self._bridge.drag_moved.connect(self._on_drag_move)

        self._channel = QWebChannel(self)
        self._channel.registerObject("bridge", self._bridge)

        # ── WebEngineView ──
        self._view = QWebEngineView(self)
        self._view.setStyleSheet("background: transparent;")
        self.setCentralWidget(self._view)

        page = self._view.page()
        page.setBackgroundColor(Qt.GlobalColor.transparent)
        page.setWebChannel(self._channel)

        self._inject_webchannel_script(page)
        page.load(QUrl.fromLocalFile(_TOOLBAR_HTML))

        # 点击外部隐藏由 SelectionService 通过全局鼠标钩子处理

    # ── 脚本注入 ──────────────────────────────────────────────────────────

    def _inject_webchannel_script(self, page: QWebEnginePage):
        script = QWebEngineScript()
        script.setName("qwebchannel-setup")
        script.setSourceCode(_QWEBCHANNEL_JS_SETUP)
        script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentReady)
        script.setRunsOnSubFrames(False)
        page.scripts().insert(script)

    # ── 公开方法 ──────────────────────────────────────────────────────────

    def show_at(self, x: int, y: int):
        """将工具栏定位到 (x, y) 并显示，自动修正使其不超出屏幕。"""
        screen = QApplication.screenAt(self.pos())
        if screen is None:
            screen = QApplication.primaryScreen()
        if screen is not None:
            geo = screen.availableGeometry()
            if x + self.width() > geo.right():
                x = geo.right() - self.width()
            if y + self.height() > geo.bottom():
                y = geo.bottom() - self.height()
            if x < geo.left():
                x = geo.left()
            if y < geo.top():
                y = geo.top()

        self.move(x, y)
        self.show()
        self.raise_()

    def hide_toolbar(self):
        self.hide()

    def set_theme(self, theme: str):
        self._view.page().runJavaScript(
            f"if(window.setTheme) window.setTheme('{theme}');"
        )

    def set_compact(self, is_compact: bool):
        val = "true" if is_compact else "false"
        self._view.page().runJavaScript(
            f"if(window.setCompact) window.setCompact({val});"
        )

    # ── 内部回调 ──────────────────────────────────────────────────────────

    def _on_size_reported(self, width: int, height: int):
        if width > 0 and height > 0:
            self.resize(width, height)

    def _on_drag_start(self, screen_x: int, screen_y: int):
        self._drag_origin_x = screen_x
        self._drag_origin_y = screen_y
        pos = self.pos()
        self._drag_win_x = pos.x()
        self._drag_win_y = pos.y()

    def _on_drag_move(self, screen_x: int, screen_y: int):
        dx = screen_x - self._drag_origin_x
        dy = screen_y - self._drag_origin_y
        self.move(self._drag_win_x + dx, self._drag_win_y + dy)

    def is_point_inside(self, screen_x: int, screen_y: int) -> bool:
        """检查屏幕坐标是否在工具栏窗口范围内。"""
        if not self.isVisible():
            return False
        return self.frameGeometry().contains(screen_x, screen_y)
