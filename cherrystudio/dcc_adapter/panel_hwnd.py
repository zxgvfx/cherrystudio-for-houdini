# -*- coding: utf-8 -*-
"""面板 HWND / DCC 宿主 HWND 落盘。

面板进程读取 host.hwnd 后，由自己 ``QWindow.setParent`` 嵌进 DCC，
而不是让 Houdini/Maya 去 SetParent 一块它不拥有的 Qt6 窗口。
"""

from __future__ import annotations

import os
import time

_PORTS_DIR = os.path.join(os.path.expanduser("~"), ".cherrystudio", "ports")


def hwnd_path(session_id: str) -> str:
    return os.path.join(_PORTS_DIR, "panel-%s.hwnd" % session_id)


def port_path(session_id: str) -> str:
    return os.path.join(_PORTS_DIR, "panel-%s.port" % session_id)


def read_bridge_url(session_id: str) -> str:
    path = port_path(session_id)
    if not os.path.isfile(path):
        return ""
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return (fh.read() or "").strip()
    except OSError:
        return ""


def write_hwnd(session_id: str, hwnd: int) -> str:
    os.makedirs(_PORTS_DIR, exist_ok=True)
    path = hwnd_path(session_id)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(str(int(hwnd or 0)))
    return path


def read_hwnd(session_id: str) -> int:
    path = hwnd_path(session_id)
    if not os.path.isfile(path):
        return 0
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return int((fh.read() or "0").strip() or "0")
    except (OSError, ValueError):
        return 0


def remove_hwnd(session_id: str) -> None:
    path = hwnd_path(session_id)
    try:
        if os.path.isfile(path):
            os.remove(path)
    except OSError:
        pass


def wait_hwnd(session_id: str, timeout: float = 30.0, poll: float = 0.2, require_live: bool = False) -> int:
    deadline = time.time() + max(timeout, 0.1)
    while time.time() < deadline:
        hwnd = read_hwnd(session_id)
        if hwnd and (not require_live or _hwnd_is_live(hwnd)):
            return hwnd
        time.sleep(poll)
    hwnd = read_hwnd(session_id)
    if require_live and hwnd and not _hwnd_is_live(hwnd):
        return 0
    return hwnd


def _hwnd_is_live(hwnd: int) -> bool:
    if not hwnd:
        return False
    try:
        from . import win32_embed
        return bool(win32_embed.is_window(int(hwnd)))
    except Exception:  # noqa: BLE001
        return True


def host_hwnd_path(session_id: str) -> str:
    return os.path.join(_PORTS_DIR, "panel-%s.host.hwnd" % session_id)


def write_host_hwnd(session_id: str, hwnd: int) -> str:
    os.makedirs(_PORTS_DIR, exist_ok=True)
    path = host_hwnd_path(session_id)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(str(int(hwnd or 0)))
    return path


def read_host_hwnd(session_id: str) -> int:
    path = host_hwnd_path(session_id)
    if not os.path.isfile(path):
        return 0
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return int((fh.read() or "0").strip() or "0")
    except (OSError, ValueError):
        return 0


def remove_host_hwnd(session_id: str) -> None:
    path = host_hwnd_path(session_id)
    try:
        if os.path.isfile(path):
            os.remove(path)
    except OSError:
        pass


def live_host_hwnd(session_id: str) -> int:
    """DCC 公布了宿主 HWND 且窗口还在，就表示面板应该嵌进去。"""
    hwnd = read_host_hwnd(session_id)
    if hwnd and _hwnd_is_live(hwnd):
        return hwnd
    return 0
