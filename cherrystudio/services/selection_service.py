"""
划词助手主服务，负责协调 SelectionHook、SelectionToolbarWindow、SelectionActionWindow。

单例模式，通过 SelectionService.instance() 获取全局实例。
所有修改 Qt 对象的操作必须在主线程执行，通过 _invoke_on_owner_thread 自动转发。
"""

import logging
from typing import Optional, List

from PySide6.QtCore import QObject, Signal, Slot, QThread, Qt
from PySide6.QtWidgets import QApplication
from PySide6.QtGui import QScreen

from .selection_hook import SelectionHook

logger = logging.getLogger(__name__)

# ─── 内置动作提示词 ─────────────────────────────────────────────────────────────

_BUILTIN_PROMPTS = {
    "translate": "请将以下文本翻译成中文，如果已经是中文则翻译成英文。只输出翻译结果：\n\n",
    "explain": "请解释以下内容的含义：\n\n",
    "summary": "请用简洁的语言总结以下内容的要点：\n\n",
}


class SelectionService(QObject):
    """划词助手主服务（单例）。"""

    quote_to_main = Signal(str)
    _deferred_call = Signal(object)

    _instance: Optional["SelectionService"] = None

    # ─── 单例 ────────────────────────────────────────────────────────────

    @classmethod
    def instance(cls) -> "SelectionService":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    # ─── 初始化 ──────────────────────────────────────────────────────────

    def __init__(self, parent=None):
        super().__init__(parent)

        self._deferred_call.connect(self._exec_deferred, Qt.ConnectionType.QueuedConnection)

        # 配置状态
        self.enabled: bool = False
        self.trigger_mode: str = "selected"
        self.is_follow_toolbar: bool = True
        self.is_compact: bool = False
        self.filter_mode: str = "default"
        self.filter_list: list = []
        self.theme: str = "dark"
        self.backend_url: str = ""
        self.model: str = ""

        # 子组件
        self._selection_hook: Optional[SelectionHook] = None
        self._toolbar_window = None  # SelectionToolbarWindow (延迟导入)
        self._action_window = None   # SelectionActionWindow  (延迟导入)

        # 当前选中文本，供动作使用
        self._current_text: str = ""

    # ─── 线程安全辅助 ─────────────────────────────────────────────────────

    @Slot(object)
    def _exec_deferred(self, func):
        """在拥有此 QObject 的线程（主线程）上执行 func。"""
        try:
            func()
        except Exception as exc:
            logger.error("_exec_deferred 异常", exc_info=True)

    def _on_owner_thread(self) -> bool:
        """当前线程是否是此 QObject 所属的线程。"""
        return QThread.currentThread() == self.thread()

    def _invoke_on_owner_thread(self, func):
        """
        确保 func 在主线程执行。
        若当前已在主线程则直接执行，否则通过 QueuedConnection 信号转发。
        """
        if self._on_owner_thread():
            func()
        else:
            self._deferred_call.emit(func)

    # ─── 启动 / 停止 ─────────────────────────────────────────────────────

    def start(self):
        """创建 hook 并启动监听。"""
        try:
            if self._selection_hook is not None:
                # print("[SelectionService] hook 已存在，先停止旧实例")
                self.stop()

            self._selection_hook = SelectionHook(parent=self)
            self._selection_hook.text_selected.connect(self._on_text_selected)
            self._selection_hook.mouse_clicked.connect(self._on_mouse_clicked)

            self._selection_hook.set_trigger_mode(self.trigger_mode)
            self._selection_hook.set_filter_mode(self.filter_mode)
            if self.filter_list:
                self._selection_hook.set_filter_list(self.filter_list)

            self._selection_hook.start()
            # print("[SelectionService] 已启动")
        except Exception as exc:
            # print(f"[SelectionService] start 异常: {exc}")
            logger.error("SelectionService.start 异常", exc_info=True)

    def stop(self):
        """停止 hook，隐藏/销毁窗口。"""
        try:
            if self._selection_hook is not None:
                self._selection_hook.stop()
                self._selection_hook = None
                # print("[SelectionService] hook 已停止")
        except Exception as exc:
            # print(f"[SelectionService] 停止 hook 异常: {exc}")
            pass

        try:
            if self._toolbar_window is not None:
                self._toolbar_window.hide()
                self._toolbar_window.deleteLater()
                self._toolbar_window = None
                # print("[SelectionService] toolbar 已销毁")
        except Exception as exc:
            # print(f"[SelectionService] 销毁 toolbar 异常: {exc}")
            pass

        try:
            if self._action_window is not None:
                self._action_window.hide()
                self._action_window.deleteLater()
                self._action_window = None
                # print("[SelectionService] action window 已销毁")
        except Exception as exc:
            # print(f"[SelectionService] 销毁 action window 异常: {exc}")
            pass

        # print("[SelectionService] 已停止")

    # ─── 信号处理 ─────────────────────────────────────────────────────────

    def _on_text_selected(self, data: dict):
        """hook 的 text_selected 信号回调。"""
        try:
            text = data.get("text", "")
            mouse_x = data.get("mouseX", 0)
            mouse_y = data.get("mouseY", 0)
            program_name = data.get("programName", "")

            if not text:
                return

            self._current_text = text
            # print(f"[SelectionService] 文本选中: len={len(text)}, program={program_name}, "
            #       f"pos=({mouse_x}, {mouse_y})")

            self._show_toolbar(mouse_x, mouse_y)
        except Exception as exc:
            # print(f"[SelectionService] _on_text_selected 异常: {exc}")
            logger.error("_on_text_selected 异常", exc_info=True)

    def _on_mouse_clicked(self, x: int, y: int):
        """hook 的 mouse_clicked 信号回调 — 点击窗口外部时隐藏 toolbar / action 窗口。"""
        try:
            if self._toolbar_window is not None and self._toolbar_window.isVisible():
                geo = self._toolbar_window.frameGeometry()
                if not geo.contains(x, y):
                    self._toolbar_window.hide_toolbar()
        except Exception as exc:
            # print(f"[SelectionService] _on_mouse_clicked toolbar 异常: {exc}")
            pass

        try:
            if (self._action_window is not None
                    and self._action_window.isVisible()
                    and not self._action_window.is_pinned):
                geo = self._action_window.frameGeometry()
                if not geo.contains(x, y):
                    self._action_window.hide()
                    # print("[SelectionService] action 窗口已隐藏（点击外部）")
        except Exception as exc:
            # print(f"[SelectionService] _on_mouse_clicked action 异常: {exc}")
            pass

    def _on_action_triggered(self, action_id: str):
        """toolbar 的 action_triggered 信号回调。"""
        try:
            # print(f"[SelectionService] 动作触发: {action_id}")

            if action_id == "copy":
                self._do_copy()
            elif action_id == "quote":
                self._do_quote()
            elif action_id in _BUILTIN_PROMPTS:
                prompt = _BUILTIN_PROMPTS[action_id]
                self._show_action_window(action_id, prompt, self._current_text)
            else:
                prompt = ""
                self._show_action_window(action_id, prompt, self._current_text)
        except Exception as exc:
            # print(f"[SelectionService] _on_action_triggered 异常: {exc}")
            logger.error("_on_action_triggered 异常", exc_info=True)

    # ─── 内置动作 ─────────────────────────────────────────────────────────

    def _do_copy(self):
        """将当前选中文本复制到剪贴板。"""
        try:
            clipboard = QApplication.clipboard()
            if clipboard and self._current_text:
                clipboard.setText(self._current_text)
                # print(f"[SelectionService] 已复制 {len(self._current_text)} 字符到剪贴板")
        except Exception as exc:
            # print(f"[SelectionService] 复制到剪贴板异常: {exc}")
            pass

    def _do_quote(self):
        """以 blockquote 格式发射 quote_to_main 信号。"""
        try:
            if not self._current_text:
                return
            lines = self._current_text.splitlines()
            quoted = "\n".join(f"> {line}" for line in lines)
            self.quote_to_main.emit(quoted)
            # print(f"[SelectionService] 已发射 quote_to_main 信号")
        except Exception as exc:
            # print(f"[SelectionService] _do_quote 异常: {exc}")
            pass

    # ─── 窗口管理 ─────────────────────────────────────────────────────────

    def _ensure_toolbar(self):
        """延迟导入并创建 toolbar 窗口。"""
        if self._toolbar_window is not None:
            return
        try:
            from .selection_toolbar import SelectionToolbarWindow
            self._toolbar_window = SelectionToolbarWindow()
            self._toolbar_window.action_triggered.connect(self._on_action_triggered)
            if self.theme:
                try:
                    self._toolbar_window.set_theme(self.theme)
                except Exception:
                    pass
            # print("[SelectionService] toolbar 窗口已创建")
        except Exception as exc:
            # print(f"[SelectionService] 创建 toolbar 窗口异常: {exc}")
            logger.error("创建 toolbar 窗口异常", exc_info=True)

    def _show_toolbar(self, x: int, y: int):
        """在指定位置显示 toolbar。"""
        try:
            self._ensure_toolbar()
            if self._toolbar_window is None:
                return
            self._toolbar_window.show_at(x, y)
            # print(f"[SelectionService] toolbar 显示于 ({x}, {y})")
        except Exception as exc:
            # print(f"[SelectionService] _show_toolbar 异常: {exc}")
            logger.error("_show_toolbar 异常", exc_info=True)

    def _show_action_window(self, action_id: str, prompt: str, text: str):
        """创建或复用 action 窗口并显示。"""
        try:
            if self._action_window is None:
                try:
                    from .selection_action import SelectionActionWindow
                    self._action_window = SelectionActionWindow()
                    if self.theme:
                        try:
                            self._action_window.set_theme(self.theme)
                        except Exception:
                            pass
                    # print("[SelectionService] action 窗口已创建")
                except Exception as exc:
                    # print(f"[SelectionService] 创建 action 窗口异常: {exc}")
                    logger.error("创建 action 窗口异常", exc_info=True)
                    return

            if self.is_follow_toolbar and self._toolbar_window is not None:
                try:
                    tb_geo = self._toolbar_window.geometry()
                    ax = tb_geo.x()
                    ay = tb_geo.y() + tb_geo.height() + 8
                    self._action_window.move(ax, ay)
                except Exception:
                    self._center_action_window()
            else:
                self._center_action_window()

            action_data = {
                "id": action_id,
                "name": action_id,
                "prompt": prompt,
                "selectedText": text,
            }
            self._action_window.show_action(
                action_data=action_data,
                backend_url=self.backend_url,
                model=self.model,
            )
            # print(f"[SelectionService] action 窗口已显示: action={action_id}")
        except Exception as exc:
            # print(f"[SelectionService] _show_action_window 异常: {exc}")
            logger.error("_show_action_window 异常", exc_info=True)

    def _center_action_window(self):
        """将 action 窗口移到屏幕中央。"""
        try:
            if self._action_window is None:
                return
            screen: Optional[QScreen] = QApplication.primaryScreen()
            if screen is None:
                return
            geo = screen.availableGeometry()
            win_geo = self._action_window.geometry()
            x = geo.x() + (geo.width() - win_geo.width()) // 2
            y = geo.y() + (geo.height() - win_geo.height()) // 2
            self._action_window.move(x, y)
        except Exception as exc:
            # print(f"[SelectionService] _center_action_window 异常: {exc}")
            pass

    # ─── 配置方法 ─────────────────────────────────────────────────────────

    def set_enabled(self, enabled: bool):
        """启用或禁用划词助手（线程安全）。"""
        if not self._on_owner_thread():
            self._invoke_on_owner_thread(lambda: self.set_enabled(enabled))
            return
        try:
            self.enabled = enabled
            if enabled:
                self.start()
            else:
                self.stop()
        except Exception:
            pass

    def set_trigger_mode(self, mode: str):
        """设置触发模式，同步到 hook。"""
        self.trigger_mode = mode
        if self._selection_hook is not None:
            self._selection_hook.set_trigger_mode(mode)

    def set_theme(self, theme: str):
        """设置主题，同步到 toolbar 和 action 窗口（线程安全）。"""
        if not self._on_owner_thread():
            self._invoke_on_owner_thread(lambda: self.set_theme(theme))
            return
        try:
            self.theme = theme
            if self._toolbar_window is not None:
                try:
                    self._toolbar_window.set_theme(theme)
                except Exception:
                    pass
            if self._action_window is not None:
                try:
                    self._action_window.set_theme(theme)
                except Exception:
                    pass
        except Exception:
            pass

    def set_filter_mode(self, mode: str):
        """设置过滤模式，同步到 hook。"""
        self.filter_mode = mode
        if self._selection_hook is not None:
            self._selection_hook.set_filter_mode(mode)

    def set_filter_list(self, list_: List[str]):
        """设置过滤列表，同步到 hook。"""
        self.filter_list = list(list_)
        if self._selection_hook is not None:
            self._selection_hook.set_filter_list(self.filter_list)

    def set_backend_url(self, url: str):
        """设置后端 URL，供 action 窗口调用 AI 时使用。"""
        self.backend_url = url

    def set_model(self, model: str):
        """设置默认 AI 模型。"""
        self.model = model
