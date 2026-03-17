"""
Windows 系统级文本选中监听钩子。

通过 pynput 监听全局鼠标事件，检测拖拽选中文本后模拟 Ctrl+C 获取选中内容，
通过 Qt Signal 将结果发送到主线程。
"""

import ctypes
import ctypes.wintypes as wintypes
import threading
import time
import logging
from typing import Optional, List, Set

from PySide6.QtCore import QObject, Signal, QTimer

logger = logging.getLogger(__name__)

# ─── Win32 常量 ───────────────────────────────────────────────────────────────

CF_UNICODETEXT = 13
GMEM_MOVEABLE = 0x0002
KEYEVENTF_KEYUP = 0x0002
VK_CONTROL = 0x11
VK_C = 0x43

# ─── Win32 函数声明 ───────────────────────────────────────────────────────────

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32

GetForegroundWindow = user32.GetForegroundWindow
GetForegroundWindow.restype = wintypes.HWND

GetWindowTextW = user32.GetWindowTextW
GetWindowTextW.argtypes = [wintypes.HWND, wintypes.LPWSTR, ctypes.c_int]
GetWindowTextW.restype = ctypes.c_int

GetWindowTextLengthW = user32.GetWindowTextLengthW
GetWindowTextLengthW.argtypes = [wintypes.HWND]
GetWindowTextLengthW.restype = ctypes.c_int

GetWindowThreadProcessId = user32.GetWindowThreadProcessId
GetWindowThreadProcessId.argtypes = [wintypes.HWND, ctypes.POINTER(wintypes.DWORD)]
GetWindowThreadProcessId.restype = wintypes.DWORD

OpenClipboard = user32.OpenClipboard
OpenClipboard.argtypes = [wintypes.HWND]
OpenClipboard.restype = wintypes.BOOL

CloseClipboard = user32.CloseClipboard
CloseClipboard.restype = wintypes.BOOL

EmptyClipboard = user32.EmptyClipboard
EmptyClipboard.restype = wintypes.BOOL

GetClipboardData = user32.GetClipboardData
GetClipboardData.argtypes = [wintypes.UINT]
GetClipboardData.restype = wintypes.HANDLE

SetClipboardData = user32.SetClipboardData
SetClipboardData.argtypes = [wintypes.UINT, wintypes.HANDLE]
SetClipboardData.restype = wintypes.HANDLE

GlobalAlloc = kernel32.GlobalAlloc
GlobalAlloc.argtypes = [wintypes.UINT, ctypes.c_size_t]
GlobalAlloc.restype = wintypes.HGLOBAL

GlobalLock = kernel32.GlobalLock
GlobalLock.argtypes = [wintypes.HGLOBAL]
GlobalLock.restype = wintypes.LPVOID

GlobalUnlock = kernel32.GlobalUnlock
GlobalUnlock.argtypes = [wintypes.HGLOBAL]
GlobalUnlock.restype = wintypes.BOOL

GlobalSize = kernel32.GlobalSize
GlobalSize.argtypes = [wintypes.HGLOBAL]
GlobalSize.restype = ctypes.c_size_t

keybd_event = user32.keybd_event
keybd_event.argtypes = [wintypes.BYTE, wintypes.BYTE, wintypes.DWORD, ctypes.POINTER(ctypes.c_ulong)]
keybd_event.restype = None

GetCursorPos = user32.GetCursorPos
GetCursorPos.argtypes = [ctypes.POINTER(wintypes.POINT)]
GetCursorPos.restype = wintypes.BOOL

# ─── 光标类型检测（区分文本选区拖拽与窗口拖拽） ──────────────────────────

IDC_IBEAM = 32513  # 文本 I 形光标资源 ID

class CURSORINFO(ctypes.Structure):
    _fields_ = [
        ("cbSize", wintypes.DWORD),
        ("flags", wintypes.DWORD),
        ("hCursor", wintypes.HANDLE),
        ("ptScreenPos", wintypes.POINT),
    ]

_GetCursorInfo = user32.GetCursorInfo
_GetCursorInfo.argtypes = [ctypes.POINTER(CURSORINFO)]
_GetCursorInfo.restype = wintypes.BOOL

_LoadCursorW = user32.LoadCursorW
_LoadCursorW.argtypes = [wintypes.HINSTANCE, ctypes.c_void_p]
_LoadCursorW.restype = wintypes.HANDLE

# 预加载系统 I-beam 光标句柄（进程生命周期内不变）
try:
    _IBEAM_HANDLE = _LoadCursorW(None, IDC_IBEAM)
except Exception:
    _IBEAM_HANDLE = None


def _is_text_cursor() -> bool:
    """当前系统光标是否为 I-beam（文本编辑光标），用于过滤非文本区域的拖拽。"""
    try:
        if _IBEAM_HANDLE is None:
            return True  # 无法判断时放行
        ci = CURSORINFO()
        ci.cbSize = ctypes.sizeof(CURSORINFO)
        if _GetCursorInfo(ctypes.byref(ci)):
            return ci.hCursor == _IBEAM_HANDLE
    except Exception:
        pass
    return True  # 出错时默认放行

# 用于获取进程可执行文件名
try:
    from ctypes import wintypes as _wt
    _psapi = ctypes.windll.psapi
    _k32 = ctypes.windll.kernel32

    OpenProcess = _k32.OpenProcess
    OpenProcess.argtypes = [wintypes.DWORD, wintypes.BOOL, wintypes.DWORD]
    OpenProcess.restype = wintypes.HANDLE

    CloseHandle = _k32.CloseHandle
    CloseHandle.argtypes = [wintypes.HANDLE]
    CloseHandle.restype = wintypes.BOOL

    GetModuleBaseNameW = _psapi.GetModuleBaseNameW
    GetModuleBaseNameW.argtypes = [wintypes.HANDLE, wintypes.HMODULE, wintypes.LPWSTR, wintypes.DWORD]
    GetModuleBaseNameW.restype = wintypes.DWORD

    PROCESS_QUERY_INFORMATION = 0x0400
    PROCESS_VM_READ = 0x0010
    _HAS_PSAPI = True
except Exception:
    _HAS_PSAPI = False

# ─── 默认黑名单 ──────────────────────────────────────────────────────────────

DEFAULT_BLACKLIST: Set[str] = {
    "taskmgr.exe",
    "explorer.exe",
    "searchapp.exe",
    "searchhost.exe",
    "startmenuexperiencehost.exe",
    "shellexperiencehost.exe",
    "textinputhost.exe",
    "lockapp.exe",
    "systemsettings.exe",
    "applicationframehost.exe",
    "gamebar.exe",
    "gamebarftserver.exe",
    "snippingtool.exe",
    "screenclippinghost.exe",
    "widgets.exe",
    "video.ui.exe",
    "photos.exe",
    "calculator.exe",
    "mspaint.exe",
    "winver.exe",
}

# ─── 工具函数 ─────────────────────────────────────────────────────────────────


def _get_foreground_window_title() -> str:
    """获取当前前台窗口标题"""
    try:
        hwnd = GetForegroundWindow()
        if not hwnd:
            return ""
        length = GetWindowTextLengthW(hwnd)
        if length <= 0:
            return ""
        buf = ctypes.create_unicode_buffer(length + 1)
        GetWindowTextW(hwnd, buf, length + 1)
        return buf.value
    except Exception:
        return ""


def _get_foreground_process_name() -> str:
    """获取当前前台窗口所属进程的可执行文件名（小写）"""
    if not _HAS_PSAPI:
        return ""
    try:
        hwnd = GetForegroundWindow()
        if not hwnd:
            return ""
        pid = wintypes.DWORD()
        GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        if pid.value == 0:
            return ""
        h_process = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, False, pid.value)
        if not h_process:
            return ""
        try:
            buf = ctypes.create_unicode_buffer(260)
            result = GetModuleBaseNameW(h_process, None, buf, 260)
            if result:
                return buf.value.lower()
            return ""
        finally:
            CloseHandle(h_process)
    except Exception:
        return ""


def _read_clipboard() -> Optional[str]:
    """读取剪贴板中的 Unicode 文本，失败返回 None"""
    try:
        if not OpenClipboard(None):
            return None
        try:
            h_data = GetClipboardData(CF_UNICODETEXT)
            if not h_data:
                return None
            p_data = GlobalLock(h_data)
            if not p_data:
                return None
            try:
                return ctypes.wstring_at(p_data)
            finally:
                GlobalUnlock(h_data)
        finally:
            CloseClipboard()
    except Exception:
        try:
            CloseClipboard()
        except Exception:
            pass
        return None


def _write_clipboard(text: Optional[str]) -> bool:
    """将文本写入剪贴板。若 text 为 None 则清空剪贴板。"""
    try:
        if not OpenClipboard(None):
            return False
        try:
            EmptyClipboard()
            if text is None:
                return True
            encoded = text.encode("utf-16-le") + b"\x00\x00"
            h_mem = GlobalAlloc(GMEM_MOVEABLE, len(encoded))
            if not h_mem:
                return False
            p_mem = GlobalLock(h_mem)
            if not p_mem:
                return False
            try:
                ctypes.memmove(p_mem, encoded, len(encoded))
            finally:
                GlobalUnlock(h_mem)
            SetClipboardData(CF_UNICODETEXT, h_mem)
            return True
        finally:
            CloseClipboard()
    except Exception:
        try:
            CloseClipboard()
        except Exception:
            pass
        return False


def _simulate_ctrl_c():
    """通过 keybd_event 模拟一次 Ctrl+C 按键"""
    try:
        keybd_event(VK_CONTROL, 0, 0, None)
        keybd_event(VK_C, 0, 0, None)
        time.sleep(0.02)
        keybd_event(VK_C, 0, KEYEVENTF_KEYUP, None)
        keybd_event(VK_CONTROL, 0, KEYEVENTF_KEYUP, None)
    except Exception:
        logger.debug("模拟 Ctrl+C 失败", exc_info=True)


def _get_cursor_position() -> tuple:
    """返回当前鼠标坐标 (x, y)"""
    try:
        pt = wintypes.POINT()
        GetCursorPos(ctypes.byref(pt))
        return (pt.x, pt.y)
    except Exception:
        return (0, 0)


# ─── SelectionHook 主类 ──────────────────────────────────────────────────────


class SelectionHook(QObject):
    """
    Windows 系统级文本选中监听。

    信号:
        text_selected(dict) - 当检测到文本选中时触发，payload 包含:
            text (str): 选中的文本
            programName (str): 来源窗口标题
            mouseX (int): 鼠标释放时的 X 坐标
            mouseY (int): 鼠标释放时的 Y 坐标

    触发模式 (trigger_mode):
        'selected'  - 选中文本即触发（默认）
        'ctrlkey'   - 需同时按住 Ctrl 或 Alt 键
        'shortcut'  - 通过快捷键触发（不监听拖拽）

    过滤模式 (filter_mode):
        'default'   - 使用预定义黑名单
        'whitelist' - 仅允许列表中的程序
        'blacklist' - 排除列表中的程序
    """

    text_selected = Signal(dict)
    mouse_clicked = Signal(int, int)

    # 拖拽判定的最小像素距离
    _DRAG_THRESHOLD = 5
    # 模拟 Ctrl+C 后等待剪贴板更新的毫秒数
    _CLIPBOARD_WAIT_MS = 100

    def __init__(self, parent=None):
        super().__init__(parent)

        self._trigger_mode: str = "selected"
        self._filter_mode: str = "default"
        self._filter_list: Set[str] = set()

        self._running = False
        self._listener = None
        self._listener_thread: Optional[threading.Thread] = None

        self._mouse_pressed = False
        self._press_x = 0
        self._press_y = 0
        self._is_dragging = False
        self._press_was_ibeam = False

        self._ctrl_held = False
        self._alt_held = False

        self._lock = threading.Lock()

    # ─── 公开 API ────────────────────────────────────────────────────────

    def start(self):
        """启动监听"""
        if self._running:
            return
        self._running = True
        self._listener_thread = threading.Thread(target=self._run_listener, daemon=True)
        self._listener_thread.start()
        logger.info("SelectionHook 已启动 (trigger=%s, filter=%s)", self._trigger_mode, self._filter_mode)

    def stop(self):
        """停止监听"""
        self._running = False
        try:
            if self._listener is not None:
                self._listener.stop()
        except Exception:
            pass
        self._listener = None
        self._listener_thread = None
        logger.info("SelectionHook 已停止")

    def set_trigger_mode(self, mode: str):
        """设置触发模式: 'selected' | 'ctrlkey' | 'shortcut'"""
        if mode not in ("selected", "ctrlkey", "shortcut"):
            raise ValueError(f"未知触发模式: {mode}")
        self._trigger_mode = mode
        logger.info("触发模式已设置为: %s", mode)

    def set_filter_mode(self, mode: str):
        """设置过滤模式: 'default' | 'whitelist' | 'blacklist'"""
        if mode not in ("default", "whitelist", "blacklist"):
            raise ValueError(f"未知过滤模式: {mode}")
        self._filter_mode = mode
        logger.info("过滤模式已设置为: %s", mode)

    def set_filter_list(self, programs: List[str]):
        """设置过滤程序列表（可执行文件名，如 ['notepad.exe', 'code.exe']）"""
        self._filter_list = {p.lower().strip() for p in programs if p.strip()}
        logger.info("过滤列表已更新: %s", self._filter_list)

    # ─── 触发快捷键（供外部快捷键系统调用） ──────────────────────────────

    def trigger_shortcut(self):
        """
        外部快捷键触发入口，用于 'shortcut' 模式。
        调用方应在快捷键被按下时调用此方法。
        """
        if self._trigger_mode != "shortcut":
            return
        if not self._running:
            return
        threading.Thread(target=self._do_capture, daemon=True).start()

    # ─── 内部实现 ────────────────────────────────────────────────────────

    def _run_listener(self):
        """在后台线程中启动 pynput 监听器"""
        try:
            from pynput import mouse, keyboard

            mouse_listener = mouse.Listener(
                on_click=self._on_click,
                on_move=self._on_move,
            )
            kb_listener = keyboard.Listener(
                on_press=self._on_key_press,
                on_release=self._on_key_release,
            )

            mouse_listener.daemon = True
            kb_listener.daemon = True

            mouse_listener.start()
            kb_listener.start()

            self._listener = mouse_listener

            while self._running:
                time.sleep(0.5)

            mouse_listener.stop()
            kb_listener.stop()
        except ImportError:
            logger.error("pynput 未安装，SelectionHook 无法启动。请执行 pip install pynput")
        except Exception:
            logger.error("SelectionHook 监听线程异常退出", exc_info=True)

    def _on_click(self, x, y, button, pressed):
        """鼠标点击回调"""
        try:
            from pynput.mouse import Button
            if button != Button.left:
                return

            if pressed:
                self._mouse_pressed = True
                self._press_x = x
                self._press_y = y
                self._is_dragging = False
                self._press_was_ibeam = _is_text_cursor()

                # Special fix for Houdini: its help window might use custom cursors
                if not self._press_was_ibeam:
                    try:
                        proc_name = _get_foreground_process_name()
                        if proc_name and ("houdini" in proc_name or "hhelp" in proc_name):
                            self._press_was_ibeam = True
                    except Exception:
                        pass

                self.mouse_clicked.emit(x, y)
            else:
                if self._mouse_pressed and self._is_dragging and self._press_was_ibeam:
                    self._on_drag_release(x, y)
                self._mouse_pressed = False
                self._is_dragging = False
        except Exception:
            logger.debug("鼠标点击处理异常", exc_info=True)

    def _on_move(self, x, y):
        """鼠标移动回调，判定是否构成拖拽"""
        try:
            if not self._mouse_pressed:
                return
            dx = abs(x - self._press_x)
            dy = abs(y - self._press_y)
            if dx > self._DRAG_THRESHOLD or dy > self._DRAG_THRESHOLD:
                self._is_dragging = True
        except Exception:
            pass

    def _on_key_press(self, key):
        """键盘按下回调"""
        try:
            from pynput.keyboard import Key
            if key == Key.ctrl_l or key == Key.ctrl_r:
                self._ctrl_held = True
            elif key == Key.alt_l or key == Key.alt_r or key == Key.alt_gr:
                self._alt_held = True
        except Exception:
            pass

    def _on_key_release(self, key):
        """键盘释放回调"""
        try:
            from pynput.keyboard import Key
            if key == Key.ctrl_l or key == Key.ctrl_r:
                self._ctrl_held = False
            elif key == Key.alt_l or key == Key.alt_r or key == Key.alt_gr:
                self._alt_held = False
        except Exception:
            pass

    def _on_drag_release(self, x: int, y: int):
        """拖拽释放后的处理入口"""
        if self._trigger_mode == "shortcut":
            return

        if self._trigger_mode == "ctrlkey":
            if not (self._ctrl_held or self._alt_held):
                return

        if not self._should_capture():
            return

        threading.Thread(target=self._do_capture, daemon=True).start()

    def _should_capture(self) -> bool:
        """根据过滤模式判断当前前台程序是否应该捕获"""
        try:
            process_name = _get_foreground_process_name()
            if not process_name:
                return self._filter_mode != "whitelist"

            if self._filter_mode == "default":
                return process_name not in DEFAULT_BLACKLIST
            elif self._filter_mode == "blacklist":
                return process_name not in self._filter_list
            elif self._filter_mode == "whitelist":
                return process_name in self._filter_list
            return True
        except Exception:
            logger.debug("过滤检查异常", exc_info=True)
            return True

    def _do_capture(self):
        """
        核心捕获流程:
        1. 保存剪贴板
        2. 模拟 Ctrl+C
        3. 等待剪贴板更新
        4. 读取新内容
        5. 恢复剪贴板
        6. 发射信号
        """
        with self._lock:
            try:
                old_clipboard = _read_clipboard()

                _simulate_ctrl_c()
                time.sleep(self._CLIPBOARD_WAIT_MS / 1000.0)

                new_clipboard = _read_clipboard()

                if new_clipboard and new_clipboard != old_clipboard:
                    text = new_clipboard.strip()
                    if text:
                        window_title = _get_foreground_window_title()
                        mx, my = _get_cursor_position()
                        payload = {
                            "text": text,
                            "programName": window_title,
                            "mouseX": mx,
                            "mouseY": my,
                        }
                        self.text_selected.emit(payload)
                        logger.debug("文本选中事件: program=%s, len=%d", window_title, len(text))

                _write_clipboard(old_clipboard)
            except Exception:
                logger.error("文本捕获流程异常", exc_info=True)
                try:
                    _write_clipboard(old_clipboard)
                except Exception:
                    pass
