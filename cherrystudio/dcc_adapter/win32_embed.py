# -*- coding: utf-8 -*-
"""Win32 HWND 嵌入：把面板进程窗口变成 DCC Qt 宿主的子窗口。

只依赖标准库。Houdini Qt5 与面板 PySide6 不能同进程混用，但 OS 级
``SetParent`` 可以把另一个进程的 HWND 挂进 DCC 的 native widget。
"""

from __future__ import annotations

import ctypes
import sys
from typing import Tuple

GWL_STYLE = -16
GWL_EXSTYLE = -20

WS_CHILD = 0x40000000
WS_VISIBLE = 0x10000000
WS_CLIPSIBLINGS = 0x04000000
WS_CLIPCHILDREN = 0x02000000
WS_POPUP = 0x80000000
WS_CAPTION = 0x00C00000
WS_THICKFRAME = 0x00040000
WS_SYSMENU = 0x00080000
WS_MINIMIZEBOX = 0x00020000
WS_MAXIMIZEBOX = 0x00010000
WS_BORDER = 0x00800000
WS_DLGFRAME = 0x00400000

WS_EX_APPWINDOW = 0x00040000
WS_EX_TOOLWINDOW = 0x00000080
WS_EX_CONTROLPARENT = 0x00010000
WS_EX_DLGMODALFRAME = 0x00000001
WS_EX_LAYERED = 0x00080000
WS_EX_NOREDIRECTIONBITMAP = 0x00200000
WS_EX_COMPOSITED = 0x02000000

SW_HIDE = 0
SW_SHOW = 5

SWP_NOSIZE = 0x0001
SWP_NOMOVE = 0x0002
SWP_NOZORDER = 0x0004
SWP_NOACTIVATE = 0x0010
SWP_FRAMECHANGED = 0x0020
SWP_SHOWWINDOW = 0x0040

HWND_TOP = 0


def compose_child_style(old_style: int) -> int:
    style = int(old_style or 0)
    style |= WS_CHILD | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_VISIBLE
    style &= ~(
        WS_POPUP
        | WS_CAPTION
        | WS_THICKFRAME
        | WS_SYSMENU
        | WS_MINIMIZEBOX
        | WS_MAXIMIZEBOX
        | WS_BORDER
        | WS_DLGFRAME
    )
    return style & 0xFFFFFFFF


def compose_child_exstyle(old_exstyle: int) -> int:
    exstyle = int(old_exstyle or 0)
    exstyle |= WS_EX_TOOLWINDOW
    exstyle &= ~(
        WS_EX_APPWINDOW
        | WS_EX_DLGMODALFRAME
        | WS_EX_LAYERED
        | WS_EX_NOREDIRECTIONBITMAP
        | WS_EX_COMPOSITED
    )
    return exstyle & 0xFFFFFFFF


def compose_parent_style(old_style: int) -> int:
    """宿主 HWND 必须 CLIPCHILDREN，否则 Qt paint 会把外进程子窗口刷成白屏。"""
    style = int(old_style or 0)
    style |= WS_CLIPCHILDREN | WS_CLIPSIBLINGS
    return style & 0xFFFFFFFF


def compose_parent_exstyle(old_exstyle: int) -> int:
    """让 Tab/键盘能进到跨进程子窗口。"""
    exstyle = int(old_exstyle or 0)
    exstyle |= WS_EX_CONTROLPARENT
    return exstyle & 0xFFFFFFFF


def _user32():
    if sys.platform != "win32":
        raise RuntimeError("HWND embed is Windows-only")
    return ctypes.windll.user32


def _hwnd(value: int):
    return ctypes.c_void_p(int(value))


def _style_get_set():
    user32 = _user32()
    getter = user32.GetWindowLongPtrW
    setter = user32.SetWindowLongPtrW
    getter.argtypes = [ctypes.c_void_p, ctypes.c_int]
    getter.restype = ctypes.c_void_p
    setter.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_void_p]
    setter.restype = ctypes.c_void_p
    return getter, setter


def is_window(hwnd: int) -> bool:
    if not hwnd or sys.platform != "win32":
        return False
    fn = _user32().IsWindow
    fn.argtypes = [ctypes.c_void_p]
    fn.restype = ctypes.c_int
    try:
        return bool(fn(_hwnd(hwnd)))
    except Exception:  # noqa: BLE001
        return False


def get_parent(hwnd: int) -> int:
    if not hwnd:
        return 0
    fn = _user32().GetParent
    fn.argtypes = [ctypes.c_void_p]
    fn.restype = ctypes.c_void_p
    result = fn(_hwnd(hwnd))
    return int(result) if result else 0


def client_size(hwnd: int) -> Tuple[int, int]:
    if not hwnd:
        return (0, 0)
    class RECT(ctypes.Structure):
        _fields_ = [
            ("left", ctypes.c_long),
            ("top", ctypes.c_long),
            ("right", ctypes.c_long),
            ("bottom", ctypes.c_long),
        ]

    rect = RECT()
    fn = _user32().GetClientRect
    fn.argtypes = [ctypes.c_void_p, ctypes.POINTER(RECT)]
    fn.restype = ctypes.c_int
    if not fn(_hwnd(hwnd), ctypes.byref(rect)):
        return (0, 0)
    return (int(rect.right - rect.left), int(rect.bottom - rect.top))


def show(hwnd: int, visible: bool = True) -> None:
    if not hwnd:
        return
    fn = _user32().ShowWindow
    fn.argtypes = [ctypes.c_void_p, ctypes.c_int]
    fn.restype = ctypes.c_int
    fn(_hwnd(hwnd), SW_SHOW if visible else SW_HIDE)


def move(child_hwnd: int, parent_hwnd: int, activate: bool = False) -> None:
    if not child_hwnd or not parent_hwnd:
        return
    width, height = client_size(parent_hwnd)
    if width < 1 or height < 1:
        return
    flags = SWP_NOZORDER | SWP_FRAMECHANGED
    if not activate:
        flags |= SWP_NOACTIVATE
    fn = _user32().SetWindowPos
    fn.argtypes = [
        ctypes.c_void_p,
        ctypes.c_void_p,
        ctypes.c_int,
        ctypes.c_int,
        ctypes.c_int,
        ctypes.c_int,
        ctypes.c_uint,
    ]
    fn.restype = ctypes.c_int
    fn(_hwnd(child_hwnd), ctypes.c_void_p(HWND_TOP), 0, 0, width, height, flags)


def restyle_child(child_hwnd: int, parent_hwnd: int) -> bool:
    """把子窗口改成无边框 WS_CHILD 外观，并贴齐宿主客户区。不调用 SetParent。"""
    if not child_hwnd or sys.platform != "win32":
        return False
    getter, setter = _style_get_set()
    child = _hwnd(child_hwnd)
    old_style = int(getter(child, GWL_STYLE) or 0)
    setter(child, GWL_STYLE, ctypes.c_void_p(compose_child_style(old_style)))
    old_ex = int(getter(child, GWL_EXSTYLE) or 0)
    setter(child, GWL_EXSTYLE, ctypes.c_void_p(compose_child_exstyle(old_ex)))
    if parent_hwnd:
        prepare_host(parent_hwnd)
        strip_dcomp_tree(child_hwnd)
        move(child_hwnd, parent_hwnd, activate=False)
    show(child_hwnd, True)
    try:
        redraw = _user32().RedrawWindow
        redraw.argtypes = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_uint]
        redraw.restype = ctypes.c_int
        redraw(child, None, None, 0x0001 | 0x0080 | 0x0100 | 0x0400)
    except Exception:  # noqa: BLE001
        pass
    return True


def embed(child_hwnd: int, parent_hwnd: int) -> bool:
    """由窗口所属进程调用：SetParent 后再 restyle。"""
    if not child_hwnd or not parent_hwnd:
        return False
    if sys.platform != "win32":
        return False
    user32 = _user32()
    set_parent = user32.SetParent
    set_parent.argtypes = [ctypes.c_void_p, ctypes.c_void_p]
    set_parent.restype = ctypes.c_void_p
    set_parent(_hwnd(child_hwnd), _hwnd(parent_hwnd))
    return restyle_child(child_hwnd, parent_hwnd)


def prepare_host(parent_hwnd: int) -> bool:
    """只给 DCC 宿主加 CLIPCHILDREN / CONTROLPARENT，不跨进程 SetParent。"""
    if not parent_hwnd or sys.platform != "win32":
        return False
    getter, setter = _style_get_set()
    parent = _hwnd(parent_hwnd)
    parent_style = int(getter(parent, GWL_STYLE) or 0)
    setter(parent, GWL_STYLE, ctypes.c_void_p(compose_parent_style(parent_style)))
    parent_ex = int(getter(parent, GWL_EXSTYLE) or 0)
    setter(parent, GWL_EXSTYLE, ctypes.c_void_p(compose_parent_exstyle(parent_ex)))
    return True


def focus(child_hwnd: int, host_hwnd: int = 0) -> bool:
    """把键盘焦点给到面板 HWND。Houdini 前台时需要 AttachThreadInput。"""
    if not child_hwnd or sys.platform != "win32":
        return False
    user32 = _user32()
    kernel32 = ctypes.windll.kernel32
    user32.GetWindowThreadProcessId.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_uint)]
    user32.GetWindowThreadProcessId.restype = ctypes.c_uint
    user32.AttachThreadInput.argtypes = [ctypes.c_uint, ctypes.c_uint, ctypes.c_int]
    user32.AttachThreadInput.restype = ctypes.c_int
    user32.SetFocus.argtypes = [ctypes.c_void_p]
    user32.SetFocus.restype = ctypes.c_void_p
    kernel32.GetCurrentThreadId.restype = ctypes.c_uint
    target = int(host_hwnd or child_hwnd)
    pid = ctypes.c_uint(0)
    other_tid = int(user32.GetWindowThreadProcessId(_hwnd(target), ctypes.byref(pid)) or 0)
    self_tid = int(kernel32.GetCurrentThreadId() or 0)
    attached = False
    try:
        if other_tid and self_tid and other_tid != self_tid:
            attached = bool(user32.AttachThreadInput(other_tid, self_tid, True))
        user32.SetFocus(_hwnd(child_hwnd))
        return True
    except Exception:  # noqa: BLE001
        return False
    finally:
        if attached:
            try:
                user32.AttachThreadInput(other_tid, self_tid, False)
            except Exception:  # noqa: BLE001
                pass


def _enum_child_hwnds(root_hwnd: int) -> list:
    children = []
    if not root_hwnd:
        return children
    WNDENUMPROC = ctypes.WINFUNCTYPE(ctypes.c_int, ctypes.c_void_p, ctypes.c_void_p)

    def _cb(handle, _lparam):
        children.append(int(handle))
        return 1

    cb = WNDENUMPROC(_cb)
    fn = _user32().EnumChildWindows
    fn.argtypes = [ctypes.c_void_p, WNDENUMPROC, ctypes.c_void_p]
    fn.restype = ctypes.c_int
    fn(_hwnd(root_hwnd), cb, None)
    return children


def strip_dcomp_tree(root_hwnd: int) -> int:
    """去掉 DirectComposition / layered 扩展样式，否则 SetParent 进 Qt5 会白屏。"""
    if not root_hwnd:
        return 0
    getter, setter = _style_get_set()
    hwnds = [int(root_hwnd)] + _enum_child_hwnds(root_hwnd)
    stripped = 0
    for handle in hwnds:
        try:
            old_ex = int(getter(_hwnd(handle), GWL_EXSTYLE) or 0)
            new_ex = compose_child_exstyle(old_ex)
            if new_ex != (old_ex & 0xFFFFFFFF):
                setter(_hwnd(handle), GWL_EXSTYLE, ctypes.c_void_p(new_ex))
                stripped += 1
        except Exception:  # noqa: BLE001
            continue
    return stripped


def detach(child_hwnd: int) -> None:
    """解开父子关系并隐藏，避免关停靠时把面板闪成独立顶层窗。"""
    if not child_hwnd:
        return
    show(child_hwnd, False)
    try:
        set_parent = _user32().SetParent
        set_parent.argtypes = [ctypes.c_void_p, ctypes.c_void_p]
        set_parent.restype = ctypes.c_void_p
        set_parent(_hwnd(child_hwnd), None)
    except Exception:  # noqa: BLE001
        pass
