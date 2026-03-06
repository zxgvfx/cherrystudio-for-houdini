"""
核心功能层模块

注意：此 __init__.py 故意不导入 window_manager，
因为 window_manager 依赖 PySide6，而后端服务不需要也不应该引入 Qt。
需要 create_window 时请直接从 cherrystudio.core.window_manager 导入。
"""

from .app_lifecycle import (
    is_running_inside_houdini,
    is_houdini_ui_available,
    ensure_qtwebengine_initialized,
    create_app
)

__all__ = [
    'is_running_inside_houdini',
    'is_houdini_ui_available',
    'ensure_qtwebengine_initialized',
    'create_app',
]
