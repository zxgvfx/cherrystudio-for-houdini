"""
Web 集成层模块
处理前端集成和脚本注入
"""

from .electron_injector import (
    get_electron_api_script,
    get_early_logger_fix_script,
    get_post_load_fix_script
)

__all__ = [
    'get_electron_api_script',
    'get_early_logger_fix_script',
    'get_post_load_fix_script'
]

