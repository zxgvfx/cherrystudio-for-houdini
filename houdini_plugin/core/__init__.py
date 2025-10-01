"""
核心功能层模块
处理应用生命周期和窗口管理
"""

from .app_lifecycle import (
    is_running_inside_houdini,
    is_houdini_ui_available,
    ensure_qtwebengine_initialized,
    create_app
)
from .window_manager import create_window

__all__ = [
    'is_running_inside_houdini',
    'is_houdini_ui_available',
    'ensure_qtwebengine_initialized',
    'create_app',
    'create_window'
]

