"""
Qt Bridge Route — 前端通过 HTTP 调用 Qt 侧 API

将 QWebChannel 完全替换为 HTTP 调用：
  前端 JS → POST /api/v1/qt/invoke → 本模块 → CherryStudioAPI 方法

线程安全：
  CherryStudioAPI 的窗口控制/文件对话框方法必须在 Qt 主线程执行。
  其他方法（HTTP 代理、文件 I/O 等）可在任意线程执行。

  从 HTTP 处理线程投递到主线程使用 QApplication.postEvent()，
  这是 Qt 官方推荐的跨线程调用方式，不依赖调用线程拥有事件循环。

  关键：_InvokerReceiver 必须在主线程上创建（set_qt_api 由主线程调用），
  否则 Qt 会拒绝跨线程 parent 赋值，导致事件无法投递到主线程。
"""

import threading
from typing import Any, Set

from ..server import route
from ...utils.logger import network_logger

_log = network_logger

_qt_api: Any = None

_MAIN_THREAD_METHODS: Set[str] = {
    "startDrag", "minimize", "maximize", "unmaximize", "closeWindow",
    "isMaximized", "isFullScreen",
    "setMinimumSize", "resetMinimumSize",
    "fileSelect", "selectFolder", "saveImage",
    "handleZoomFactor",
}

_LONG_TIMEOUT_METHODS: Set[str] = {
    "fileSelect", "selectFolder", "saveImage",
}


# ── 跨线程主线程调用基础设施 ──────────────────────────────────────────────────

_invoker_receiver = None   # 主线程上的 QObject，接收自定义事件
_InvokerEventClass = None  # 自定义事件类引用


def set_qt_api(api):
    """
    由 window_manager 在主线程调用，注册 CherryStudioAPI 实例，
    同时在主线程上创建事件接收器（QObject 必须在目标线程上创建）。
    """
    global _qt_api, _invoker_receiver, _InvokerEventClass
    _qt_api = api

    try:
        from PySide6.QtCore import QObject, QEvent, QCoreApplication

        class _InvokerEvent(QEvent):
            """携带一个可调用对象的自定义事件"""
            TYPE = QEvent.Type(QEvent.registerEventType())

            def __init__(self, callback):
                super().__init__(self.TYPE)
                self.callback = callback

        class _InvokerReceiver(QObject):
            """挂在主线程上，处理 _InvokerEvent"""
            def event(self, event):
                if isinstance(event, _InvokerEvent):
                    event.callback()
                    return True
                return super().event(event)

        app = QCoreApplication.instance()
        if app is not None:
            _invoker_receiver = _InvokerReceiver(app)
            _InvokerEventClass = _InvokerEvent
            _log("[qt_bridge] Qt API + main-thread invoker registered")
        else:
            _log("[qt_bridge] Qt API registered (no QApplication, invoker skipped)")
    except Exception as e:
        _log(f"[qt_bridge] Qt API registered (invoker creation failed: {e})")


def _invoke_on_main_thread(fn, args, timeout: float = 30.0):
    """
    在 Qt 主线程执行函数并等待结果。

    使用 QApplication.postEvent() 将任务投递到主线程事件队列，
    这种方式从任意线程调用都安全，不要求调用线程有 Qt 事件循环。
    """
    result_holder = [None]
    error_holder = [None]
    done = threading.Event()

    def _run():
        try:
            result_holder[0] = fn(*args)
        except Exception as e:
            error_holder[0] = str(e)
        finally:
            done.set()

    if _invoker_receiver is not None and _InvokerEventClass is not None:
        try:
            from PySide6.QtCore import QCoreApplication
            event = _InvokerEventClass(_run)
            QCoreApplication.postEvent(_invoker_receiver, event)
        except Exception as e:
            return None, f"Cannot post to main thread: {e}"
    else:
        _log("[qt_bridge] WARNING: no invoker, running on caller thread")
        _run()

    if not done.wait(timeout=timeout):
        return None, "Qt main thread invocation timeout"

    return result_holder[0], error_holder[0]


# ── HTTP 路由 ─────────────────────────────────────────────────────────────────

@route("/api/v1/qt/invoke", methods=["POST"])
def qt_invoke(ctx):
    """
    通用 Qt API 调度器。

    请求体: { "method": "methodName", "args": ["arg1", "arg2", ...] }
    响应:   { "value": <返回值> } 或 { "error": "..." }
    """
    body = ctx.get("body", {})
    method_name = body.get("method", "")
    args = body.get("args", [])

    if not _qt_api:
        return {"error": "Qt API not available"}

    if not method_name:
        return {"error": "method name required"}

    fn = getattr(_qt_api, method_name, None)
    if fn is None or not callable(fn):
        return {"error": f"Unknown method: {method_name}"}

    try:
        if method_name in _MAIN_THREAD_METHODS:
            timeout = 120.0 if method_name in _LONG_TIMEOUT_METHODS else 30.0
            result, err = _invoke_on_main_thread(fn, args, timeout=timeout)
            if err:
                return {"error": err}
            return {"value": result}
        else:
            result = fn(*args)
            return {"value": result}
    except Exception as e:
        _log(f"[qt_bridge] Error invoking {method_name}: {e}")
        return {"error": str(e)}
