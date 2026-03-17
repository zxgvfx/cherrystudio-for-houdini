"""
选区动作响应窗口 —— 无边框半透明窗口，展示 AI 流式回复。

所有网络请求通过 QWebChannel 桥接到 Python 后端执行，
action.html 不直接发起任何 HTTP 请求。
"""

import json
import os
import logging
import threading
import urllib.request
import urllib.error

from PySide6.QtCore import Qt, QObject, Signal, Slot, QUrl, QMetaObject, Q_ARG
from PySide6.QtGui import QGuiApplication
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
_ACTION_HTML = os.path.join(_RESOURCES_DIR, "action.html")

_QWEBCHANNEL_JS_SETUP = """
(function() {
    var script = document.createElement('script');
    script.src = 'qrc:///qtwebchannel/qwebchannel.js';
    script.onload = function() {
        new QWebChannel(qt.webChannelTransport, function(channel) {
            window.qtBridge = channel.objects.bridge;
            if (window.__onBridgeReady) window.__onBridgeReady();
        });
    };
    document.head.appendChild(script);
})();
"""

_REQUEST_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json",
}


def _get_centralized_config():
    cfg_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "resources", "centralized-config.json",
    )
    try:
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        for p in cfg.get("providers", []):
            if p.get("apiHost") and p.get("apiKey"):
                return p["apiHost"], p["apiKey"]
    except Exception as e:
        logger.error(f"[action] Failed to read centralized config: {e}")
    return None, None


def _resolve_model(model: str) -> str:
    if model and model != "default":
        return model
    try:
        from .selection_service import SelectionService
        svc = SelectionService.instance()
        if svc.model:
            return svc.model
    except Exception:
        pass
    cfg_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "resources", "centralized-config.json",
    )
    try:
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        dm = cfg.get("defaultModels", {})
        mid = dm.get("defaultModel", {}).get("id", "")
        if mid:
            return mid
    except Exception:
        pass
    return model or "default"


class ActionBridge(QObject):
    """JS ↔ Python 桥接对象，通过 QWebChannel 暴露给页面。"""

    close_requested = Signal()
    regenerate_requested = Signal()
    pin_toggled = Signal(bool)
    copy_requested = Signal(str)
    drag_started = Signal(int, int)
    drag_moved = Signal(int, int)
    chat_requested = Signal(str)

    @Slot()
    def onClose(self):
        self.close_requested.emit()

    @Slot()
    def onMinimize(self):
        parent = self.parent()
        if parent is not None:
            parent.showMinimized()

    @Slot(bool)
    def onPin(self, is_pinned: bool):
        self.pin_toggled.emit(is_pinned)
        parent = self.parent()
        if parent is not None:
            parent._on_pin_changed(is_pinned)

    @Slot(str)
    def onCopy(self, text: str):
        clipboard = QGuiApplication.clipboard()
        if clipboard is not None:
            clipboard.setText(text)
        self.copy_requested.emit(text)

    @Slot()
    def onRegenerate(self):
        self.regenerate_requested.emit()

    @Slot(int, int)
    def onDragStart(self, screen_x: int, screen_y: int):
        self.drag_started.emit(screen_x, screen_y)

    @Slot(int, int)
    def onDragMove(self, screen_x: int, screen_y: int):
        self.drag_moved.emit(screen_x, screen_y)

    @Slot(str)
    def requestChat(self, body_json: str):
        """JS calls this to initiate an AI chat. Python handles the network."""
        self.chat_requested.emit(body_json)


class SelectionActionWindow(QMainWindow):
    """无边框半透明窗口，展示 AI 动作回复（流式）。"""

    close_requested = Signal()
    regenerate_requested = Signal()

    _push_chunk = Signal(str)
    _push_error = Signal(str)
    _push_done = Signal()

    _DEFAULT_W = 500
    _DEFAULT_H = 400
    _MIN_W = 300
    _MIN_H = 200

    def __init__(self, parent=None):
        super().__init__(parent)

        self.setWindowFlags(
            Qt.WindowType.FramelessWindowHint
            | Qt.WindowType.WindowStaysOnTopHint
        )
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self.resize(self._DEFAULT_W, self._DEFAULT_H)
        self.setMinimumSize(self._MIN_W, self._MIN_H)

        self._is_pinned = False
        self._stream_thread = None

        # ── Drag state ──
        self._drag_origin_x = 0
        self._drag_origin_y = 0
        self._drag_win_x = 0
        self._drag_win_y = 0

        # ── Bridge & Channel ──
        self._bridge = ActionBridge(self)
        self._bridge.close_requested.connect(self._handle_close)
        self._bridge.regenerate_requested.connect(self.regenerate_requested)
        self._bridge.drag_started.connect(self._on_drag_start)
        self._bridge.drag_moved.connect(self._on_drag_move)
        self._bridge.chat_requested.connect(self._on_chat_requested)

        self._channel = QWebChannel(self)
        self._channel.registerObject("bridge", self._bridge)

        # ── 跨线程信号 → JS 调用 ──
        self._push_chunk.connect(self._js_append_chunk)
        self._push_error.connect(self._js_show_error)
        self._push_done.connect(self._js_stream_done)

        # ── WebEngineView ──
        self._view = QWebEngineView(self)
        self._view.setStyleSheet("background: transparent;")
        self.setCentralWidget(self._view)

        page = self._view.page()
        page.setBackgroundColor(Qt.GlobalColor.transparent)
        page.setWebChannel(self._channel)

        self._page_ready = False
        self._pending_js: list[str] = []

        self._inject_webchannel_script(page)
        page.loadFinished.connect(self._on_page_loaded)
        page.load(QUrl.fromLocalFile(_ACTION_HTML))

    # ── 页面加载 ─────────────────────────────────────────────────────────

    def _on_page_loaded(self, ok: bool):
        self._page_ready = True
        # print(f"[ActionWindow] page loaded ok={ok}, pending={len(self._pending_js)}")
        for js in self._pending_js:
            self._view.page().runJavaScript(js)
        self._pending_js.clear()

    def _run_js(self, js: str):
        if self._page_ready:
            self._view.page().runJavaScript(js)
        else:
            self._pending_js.append(js)

    # ── JS 回调（主线程） ────────────────────────────────────────────────

    def _js_append_chunk(self, text: str):
        escaped = json.dumps(text, ensure_ascii=False)
        self._run_js(f"if(window.appendChunk) window.appendChunk({escaped});")

    def _js_show_error(self, msg: str):
        escaped = json.dumps(msg, ensure_ascii=False)
        self._run_js(f"if(window.showError) window.showError({escaped});")

    def _js_stream_done(self):
        self._run_js("if(window.onStreamDone) window.onStreamDone();")

    # ── 脚本注入 ──────────────────────────────────────────────────────────

    def _inject_webchannel_script(self, page: QWebEnginePage):
        script = QWebEngineScript()
        script.setName("qwebchannel-setup")
        script.setSourceCode(_QWEBCHANNEL_JS_SETUP)
        script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentReady)
        script.setRunsOnSubFrames(False)
        page.scripts().insert(script)

    # ── Chat 请求处理（后台线程） ─────────────────────────────────────────

    def _on_chat_requested(self, body_json: str):
        """Bridge 收到 JS 的 requestChat 后，在后台线程执行 HTTP 请求。"""
        try:
            body = json.loads(body_json)
        except Exception as e:
            self._push_error.emit(f"JSON 解析失败: {e}")
            return

        body["model"] = _resolve_model(body.get("model", ""))
        body["stream"] = True
        # print(f"[ActionWindow] chat requested, model={body['model']}")

        api_host, api_key = _get_centralized_config()
        if not api_host or not api_key:
            self._push_error.emit("未找到 API 配置（centralized-config.json）")
            return

        t = threading.Thread(
            target=self._stream_worker,
            args=(api_host, api_key, body),
            daemon=True,
            name="action-chat-stream",
        )
        self._stream_thread = t
        t.start()

    def _stream_worker(self, api_host: str, api_key: str, body: dict):
        """后台线程：向 Higress 发送流式请求，通过信号推送 chunk 到主线程。"""
        url = f"{api_host.rstrip('/')}/v1/chat/completions"
        payload = json.dumps(body, ensure_ascii=False).encode("utf-8")

        req = urllib.request.Request(url, data=payload, method="POST")
        req.add_header("Authorization", f"Bearer {api_key}")
        req.add_header("Content-Type", "application/json")
        for k, v in _REQUEST_HEADERS.items():
            req.add_header(k, v)

        try:
            from ..backend.routes.network import _should_bypass_proxy, _build_opener
            bypass = _should_bypass_proxy(url)
            opener = _build_opener(bypass)
        except Exception:
            opener = urllib.request.build_opener()

        try:
            resp = opener.open(req, timeout=120)
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="replace")[:1000]
            self._push_error.emit(f"API 错误 {e.code}: {err_body}")
            self._push_done.emit()
            return
        except Exception as e:
            self._push_error.emit(f"网络错误: {e}")
            self._push_done.emit()
            return

        try:
            for raw_line in resp:
                line = raw_line.decode("utf-8", errors="replace").strip()
                if not line or not line.startswith("data:"):
                    continue
                data_str = line[5:].strip()
                if data_str == "[DONE]":
                    break
                try:
                    chunk = json.loads(data_str)
                    delta = (chunk.get("choices") or [{}])[0].get("delta", {})
                    content = delta.get("content", "")
                    if content:
                        self._push_chunk.emit(content)
                except (json.JSONDecodeError, IndexError, KeyError):
                    pass
        except Exception as e:
            self._push_error.emit(f"流读取错误: {e}")
        finally:
            resp.close()
            self._push_done.emit()

    # ── 公开方法 ──────────────────────────────────────────────────────────

    def show_action(self, action_data: dict, backend_url: str, model: str):
        """显示窗口并通过 QWebChannel 触发 AI 请求。"""
        data_json = json.dumps(action_data, ensure_ascii=False)
        js = f"if(window.setAction) window.setAction({data_json});"
        self._run_js(js)
        self.show()
        self.raise_()

    def show_at(self, x: int, y: int):
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

    def set_theme(self, theme: str):
        self._run_js(f"if(window.setTheme) window.setTheme('{theme}');")

    # ── 内部方法 ──────────────────────────────────────────────────────────

    @property
    def is_pinned(self) -> bool:
        return self._is_pinned

    def _on_pin_changed(self, pinned: bool):
        self._is_pinned = pinned

    # ── Drag ──────────────────────────────────────────────────────────────

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

    def _handle_close(self):
        self.close_requested.emit()
        self.hide()
