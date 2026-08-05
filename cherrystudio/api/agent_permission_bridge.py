"""
Phase 3：工具权限审批桥接

订阅 Node agent-runtime sidecar 的 ``GET /v1/agent-permission-events`` SSE 流。
当 Claude Agent SDK 执行工具(Bash/Write/Edit/...)前触发 ``canUseTool`` 回调、
且该会话未设置 ``autoApprove`` 时,sidecar 会通过该 SSE 广播一个
``permission_request`` 事件并阻塞等待。这里在收到事件后弹出 PySide6 原生
对话框让用户选择：

  - 允许一次
  - 总是允许该工具（当前会话内该工具后续调用直接放行，不再弹窗）
  - 拒绝

用户的选择通过 ``POST /v1/agent-permission-events/:id/respond`` 回传给
sidecar，解除 SDK 侧的阻塞。

用法（在 ``cherry_studio_api_v2.py`` / 遗留的 ``cherry_studio_api.py`` 里）::

    from .agent_permission_bridge import PermissionBridge
    PermissionBridge.instance().start(get_port=..., get_api_key=...)
    ...
    PermissionBridge.instance().stop()
"""

import json
import threading
import urllib.error
import urllib.request
from typing import Callable, Optional

from PySide6.QtCore import QObject, Qt, QThread, Signal, Slot
from PySide6.QtWidgets import (
    QApplication,
    QDialog,
    QDialogButtonBox,
    QLabel,
    QPlainTextEdit,
    QPushButton,
    QVBoxLayout,
)

try:
    from ..utils.logger import network_logger as _log
except Exception:  # pragma: no cover
    _log = print

_RECONNECT_DELAY_S = 3.0
_SSE_READ_TIMEOUT_S = 65  # sidecar sends a `: ping` comment every 20s


class _PermissionDialog(QDialog):
    """工具执行权限审批弹窗（允许一次 / 总是允许 / 拒绝）。"""

    def __init__(self, event: dict, parent=None):
        super().__init__(parent)
        self.decision: str = "deny"
        self.always_allow: bool = False

        tool_name = event.get("toolName", "?")
        description = event.get("description") or ""
        input_data = event.get("input") or {}

        self.setWindowTitle("Agent 工具执行请求")
        self.setModal(True)
        self.setMinimumWidth(480)

        layout = QVBoxLayout(self)

        title = QLabel(f"<b>Agent 请求执行工具：{tool_name}</b>")
        title.setWordWrap(True)
        layout.addWidget(title)

        if description:
            desc_label = QLabel(description)
            desc_label.setWordWrap(True)
            layout.addWidget(desc_label)

        detail = QPlainTextEdit()
        detail.setReadOnly(True)
        try:
            detail.setPlainText(json.dumps(input_data, ensure_ascii=False, indent=2))
        except Exception:
            detail.setPlainText(str(input_data))
        detail.setMaximumHeight(180)
        layout.addWidget(detail)

        buttons = QDialogButtonBox(Qt.Orientation.Horizontal)
        allow_once_btn = QPushButton("允许一次")
        always_allow_btn = QPushButton(f"总是允许「{tool_name}」")
        deny_btn = QPushButton("拒绝")
        buttons.addButton(allow_once_btn, QDialogButtonBox.ButtonRole.AcceptRole)
        buttons.addButton(always_allow_btn, QDialogButtonBox.ButtonRole.AcceptRole)
        buttons.addButton(deny_btn, QDialogButtonBox.ButtonRole.RejectRole)
        layout.addWidget(buttons)

        allow_once_btn.clicked.connect(lambda: self._finish("allow", False))
        always_allow_btn.clicked.connect(lambda: self._finish("allow", True))
        deny_btn.clicked.connect(lambda: self._finish("deny", False))
        deny_btn.setDefault(True)

    def _finish(self, decision: str, always_allow: bool):
        self.decision = decision
        self.always_allow = always_allow
        self.accept()


class PermissionBridge(QObject):
    """单例：后台线程订阅 sidecar 的权限审批 SSE，主线程弹窗询问用户。"""

    _deferred_call = Signal(object)

    _instance: Optional["PermissionBridge"] = None

    @classmethod
    def instance(cls) -> "PermissionBridge":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self, parent=None):
        super().__init__(parent)
        self._deferred_call.connect(self._exec_deferred, Qt.ConnectionType.QueuedConnection)
        self._thread: Optional[threading.Thread] = None
        self._stop_event = threading.Event()
        self._get_port: Optional[Callable[[], int]] = None
        self._get_api_key: Optional[Callable[[], str]] = None

    # ─── 线程安全辅助（参照 SelectionService 模式） ──────────────────────

    @Slot(object)
    def _exec_deferred(self, func):
        try:
            func()
        except Exception as exc:
            _log(f"[PermissionBridge] _exec_deferred 异常: {exc}")

    def _on_owner_thread(self) -> bool:
        return QThread.currentThread() == self.thread()

    def _invoke_on_owner_thread(self, func):
        if self._on_owner_thread():
            func()
        else:
            self._deferred_call.emit(func)

    # ─── 启动 / 停止 ─────────────────────────────────────────────────────

    def start(self, get_port: Callable[[], int], get_api_key: Callable[[], str]):
        """开始后台订阅。``get_port``/``get_api_key`` 每次连接时调用一次，取最新值。"""
        self._get_port = get_port
        self._get_api_key = get_api_key
        if self._thread and self._thread.is_alive():
            return
        self._stop_event.clear()
        self._thread = threading.Thread(target=self._run_loop, name="AgentPermissionBridge", daemon=True)
        self._thread.start()
        _log("[PermissionBridge] Started")

    def stop(self):
        self._stop_event.set()
        _log("[PermissionBridge] Stopped")

    # ─── SSE 订阅循环 ────────────────────────────────────────────────────

    def _run_loop(self):
        while not self._stop_event.is_set():
            try:
                port = self._get_port() if self._get_port else 0
                if not port:
                    self._stop_event.wait(_RECONNECT_DELAY_S)
                    continue
                self._subscribe_once(port)
            except Exception as e:
                _log(f"[PermissionBridge] SSE loop error: {e}")
            if not self._stop_event.is_set():
                self._stop_event.wait(_RECONNECT_DELAY_S)

    def _subscribe_once(self, port: int):
        api_key = (self._get_api_key() if self._get_api_key else "") or ""
        url = f"http://127.0.0.1:{port}/v1/agent-permission-events"
        req = urllib.request.Request(url)
        if api_key:
            req.add_header("Authorization", f"Bearer {api_key}")

        with urllib.request.urlopen(req, timeout=_SSE_READ_TIMEOUT_S) as resp:
            _log(f"[PermissionBridge] Connected to {url}")
            buffer = b""
            while not self._stop_event.is_set():
                line = resp.readline()
                if not line:
                    break  # connection closed by server
                if line.strip() == b"":
                    # Blank line = end of one SSE event.
                    if buffer.strip():
                        self._handle_sse_block(buffer)
                    buffer = b""
                else:
                    buffer += line

    def _handle_sse_block(self, block: bytes):
        for raw_line in block.splitlines():
            line = raw_line.decode("utf-8", errors="replace").strip()
            if not line or line.startswith(":"):
                continue
            if not line.startswith("data:"):
                continue
            payload = line[len("data:"):].strip()
            try:
                event = json.loads(payload)
            except Exception:
                continue
            self._handle_event(event)

    def _handle_event(self, event: dict):
        if event.get("type") != "permission_request":
            return
        port = self._get_port() if self._get_port else 0
        api_key = (self._get_api_key() if self._get_api_key else "") or ""
        self._invoke_on_owner_thread(lambda: self._show_dialog_and_respond(event, port, api_key))

    # ─── 主线程：弹窗 + 回传结果 ──────────────────────────────────────────

    def _show_dialog_and_respond(self, event: dict, port: int, api_key: str):
        request_id = event.get("id")
        try:
            app = QApplication.instance()
            parent = app.activeWindow() if app else None
            dialog = _PermissionDialog(event, parent=parent)
            dialog.exec()
            decision = dialog.decision
            always_allow = dialog.always_allow
        except Exception as e:
            _log(f"[PermissionBridge] Dialog error: {e}")
            decision, always_allow = "deny", False

        threading.Thread(
            target=self._post_decision,
            args=(request_id, decision, always_allow, port, api_key),
            daemon=True,
        ).start()

    def _post_decision(self, request_id: str, decision: str, always_allow: bool, port: int, api_key: str):
        if not request_id or not port:
            return
        url = f"http://127.0.0.1:{port}/v1/agent-permission-events/{request_id}/respond"
        body = json.dumps({
            "behavior": decision,
            "alwaysAllow": always_allow,
            "message": "Denied by user" if decision == "deny" else None,
        }).encode("utf-8")
        req = urllib.request.Request(url, data=body, method="POST")
        req.add_header("Content-Type", "application/json")
        if api_key:
            req.add_header("Authorization", f"Bearer {api_key}")
        try:
            urllib.request.urlopen(req, timeout=10)
        except urllib.error.HTTPError as e:
            _log(f"[PermissionBridge] respond HTTPError: {e.code}")
        except Exception as e:
            _log(f"[PermissionBridge] respond error: {e}")
