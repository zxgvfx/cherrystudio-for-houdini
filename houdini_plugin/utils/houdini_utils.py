"""Houdini工具函数"""


def is_running_inside_houdini() -> bool:
    """检查是否在Houdini环境中运行"""
    try:
        import hou
        return True
    except ImportError:
        return False
