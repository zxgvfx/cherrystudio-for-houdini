# -*- coding: utf-8 -*-
"""
Cherry DCC 适配器（跑在 DCC 进程内，纯标准库，Python 3.9+）。

用法（Houdini pythonrc / Maya userSetup / 菜单）::

    from cherrystudio.dcc_adapter import bootstrap
    bootstrap.start()            # 发现/拉起共享 backend、注册会话、打开面板
    bootstrap.toggle_panel()     # 菜单：显示/隐藏面板

对话与画布 UI 跑在外挂面板进程里，再嵌进 Houdini/Maya 弹出的浮动窗口。
DCC 进程内只有这里的适配器（工具 + 上下文 + 原生 dock 宿主）。
"""

from .base import DccAdapter, ToolSpec
from .server import DccAdapterServer

__all__ = ["DccAdapter", "ToolSpec", "DccAdapterServer", "bootstrap"]

from . import bootstrap  # noqa: E402  (导出模块本身，方便 `bootstrap.start()`)
