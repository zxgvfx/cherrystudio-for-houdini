"""
崩溃诊断：把 Qt 的 warning/critical/fatal 消息和原生崩溃时的 Python 线程栈落盘。

背景
----
CocoClient（python.exe）的崩溃在 Windows 事件查看器里只能看到故障模块和偏移：

* ``Qt6Core.dll`` 0xc0000409 —— ``qFatal()`` → ``qAbort()`` 的 ``__fastfail``。
  真正有用的信息（例如 ``QThread: Destroyed while thread '...' is still running``）
  只会打到 stderr，而 stderr 在 COCO 里通常被丢弃。
* ``Qt6Gui.dll`` / ``Qt6WebEngineCore.dll`` 0xc0000005 —— 访问违例，没有任何
  Python 层面的记录，无法知道当时正在执行什么。

这里做两件事：

1. ``qInstallMessageHandler``：所有 Qt 消息（含 ``qFatal`` 文本）追加写入
   ``<app-data>/logs/qt_messages.log``，fatal 时额外附带全部 Python 线程栈。
2. ``faulthandler.enable``：访问违例 / 非法指令 / 栈溢出等原生异常发生时，
   把所有 Python 线程栈写入 ``<app-data>/logs/faulthandler.log``。

只在 Cherry 自己拥有进程（standalone）时默认启用；嵌入 Houdini/Maya 时宿主
有自己的崩溃处理与 Qt 消息处理，不去覆盖，除非显式设置
``CHERRY_CRASH_DIAGNOSTICS=1``。
"""

from __future__ import annotations

import datetime as _dt
import faulthandler
import io
import os
import sys
import threading
from pathlib import Path

_installed = False
_qt_log_file: io.TextIOBase | None = None
_fault_log_file: io.TextIOBase | None = None

# 高频且无诊断价值的 Qt 噪音，不落盘。
_SUPPRESS_SUBSTRINGS = (
    "QWindowsWindow::setGeometry",
    "Unable to set geometry",
    "QFont::setPointSize",
    "libpng warning",
)

_MAX_LOG_BYTES = 8 * 1024 * 1024


def _log_dir() -> Path:
    try:
        from ..core.paths import get_app_data_dir
        log_dir = Path(get_app_data_dir()) / "logs"
    except Exception:
        log_dir = Path.home() / ".cherrystudio" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    return log_dir


def _open_log(path: Path) -> io.TextIOBase:
    # 单文件超过上限就滚动一次，避免长期运行后日志无限膨胀。
    try:
        if path.exists() and path.stat().st_size > _MAX_LOG_BYTES:
            backup = path.with_suffix(path.suffix + ".1")
            if backup.exists():
                backup.unlink()
            path.rename(backup)
    except OSError:
        pass
    return open(path, "a", encoding="utf-8", buffering=1)


def _now() -> str:
    return _dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]


def _write_qt(line: str) -> None:
    f = _qt_log_file
    if f is None:
        return
    try:
        f.write(line)
        if not line.endswith("\n"):
            f.write("\n")
        f.flush()
    except Exception:
        pass


def dump_all_threads(file: io.TextIOBase | None = None, header: str = "") -> None:
    """把所有 Python 线程栈写入 *file*（默认 Qt 消息日志）。"""
    f = file or _qt_log_file
    if f is None:
        return
    try:
        if header:
            f.write(f"{header}\n")
        f.write(f"--- python threads @ {_now()} pid={os.getpid()} ---\n")
        f.flush()
        faulthandler.dump_traceback(file=f, all_threads=True)
        f.write("--- end python threads ---\n")
        f.flush()
    except Exception:
        pass


def _install_qt_message_handler() -> bool:
    try:
        from PySide6.QtCore import QtMsgType, qInstallMessageHandler
    except Exception:
        return False

    level_names = {
        QtMsgType.QtDebugMsg: "DEBUG",
        QtMsgType.QtInfoMsg: "INFO",
        QtMsgType.QtWarningMsg: "WARN",
        QtMsgType.QtCriticalMsg: "CRIT",
        QtMsgType.QtFatalMsg: "FATAL",
    }

    def handler(mode, context, message):
        try:
            text = str(message)
            if mode in (QtMsgType.QtDebugMsg, QtMsgType.QtInfoMsg):
                return
            if any(s in text for s in _SUPPRESS_SUBSTRINGS):
                return
            level = level_names.get(mode, str(mode))
            thread = threading.current_thread().name
            category = ""
            try:
                category = context.category or ""
            except Exception:
                pass
            line = f"[{_now()}] [{level}] [{thread}] {category} {text}".rstrip()
            _write_qt(line)
            try:
                sys.stderr.write(line + "\n")
                sys.stderr.flush()
            except Exception:
                pass
            if mode == QtMsgType.QtFatalMsg:
                # qFatal 返回后 Qt 会立刻 abort（0xc0000409），这是最后的机会。
                dump_all_threads(header="!!! Qt FATAL - process will abort after this !!!")
                if _fault_log_file is not None:
                    dump_all_threads(
                        file=_fault_log_file,
                        header=f"!!! Qt FATAL: {text}",
                    )
        except Exception:
            pass

    try:
        qInstallMessageHandler(handler)
    except Exception:
        return False
    # 防止回调被 GC（PySide 会持有引用，但保险起见挂到模块上）。
    globals()["_qt_message_handler_ref"] = handler
    return True


def _should_install() -> bool:
    flag = os.environ.get("CHERRY_CRASH_DIAGNOSTICS", "").strip().lower()
    if flag in {"0", "false", "off", "no"}:
        return False
    if flag in {"1", "true", "on", "yes"}:
        return True
    try:
        from ..core.app_lifecycle import detect_dcc_type
        return detect_dcc_type() == "standalone"
    except Exception:
        return True


def install_crash_diagnostics(force: bool = False) -> dict:
    """安装 Qt 消息处理器与 faulthandler。重复调用安全。

    Returns:
        dict: ``{"installed": bool, "qt_log": str, "fault_log": str}``
    """
    global _installed, _qt_log_file, _fault_log_file
    if _installed:
        return {
            "installed": True,
            "qt_log": getattr(_qt_log_file, "name", ""),
            "fault_log": getattr(_fault_log_file, "name", ""),
        }
    if not force and not _should_install():
        return {"installed": False, "qt_log": "", "fault_log": ""}

    log_dir = _log_dir()
    qt_path = log_dir / "qt_messages.log"
    fault_path = log_dir / "faulthandler.log"

    try:
        _qt_log_file = _open_log(qt_path)
    except OSError:
        _qt_log_file = None
    try:
        _fault_log_file = _open_log(fault_path)
    except OSError:
        _fault_log_file = None

    banner = (
        f"===== crash diagnostics installed {_now()} pid={os.getpid()} "
        f"exe={sys.executable} argv={' '.join(sys.argv[:3])} ====="
    )
    _write_qt(banner)

    if _fault_log_file is not None:
        try:
            _fault_log_file.write(banner + "\n")
            _fault_log_file.flush()
            # 访问违例等原生异常发生时 dump 全部线程栈；Windows 上 faulthandler
            # 通过向量化异常处理器捕获，能覆盖 Qt6Gui/Qt6WebEngineCore 的 AV。
            faulthandler.enable(file=_fault_log_file, all_threads=True)
        except Exception:
            pass

    qt_ok = _install_qt_message_handler()
    _write_qt(f"qt message handler: {'installed' if qt_ok else 'unavailable'}")
    _installed = True
    return {
        "installed": True,
        "qt_log": str(qt_path),
        "fault_log": str(fault_path),
    }


def note(message: str) -> None:
    """向 Qt 消息日志追加一条应用级标记（例如"开始退出"），方便与崩溃时间对齐。"""
    _write_qt(f"[{_now()}] [NOTE] [{threading.current_thread().name}] {message}")
