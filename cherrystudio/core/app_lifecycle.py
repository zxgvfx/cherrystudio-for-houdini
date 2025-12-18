"""
应用生命周期管理模块
处理 Qt 应用初始化和 Houdini 环境检测
"""

import os
import sys


def is_running_inside_houdini() -> bool:
    """
    检查是否在 Houdini 环境中运行
    
    Returns:
        bool: 如果在 Houdini 环境中返回 True
    """
    try:
        import hou  # type: ignore
        _ = hou.ui
        return True
    except Exception:
        return False


def is_houdini_ui_available() -> bool:
    """
    更精确地检测 Houdini UI 是否可用
    在嵌入 Houdini UI 的 Python 环境下返回 True；纯 hython CLI 返回 False
    
    Returns:
        bool: 如果 Houdini UI 可用返回 True
    """
    try:
        import hou  # type: ignore
        if hasattr(hou, 'isUIAvailable'):
            return bool(hou.isUIAvailable())
    except Exception:
        pass
    return False


def ensure_qtwebengine_initialized():
    """
    初始化 QtWebEngine 环境
    设置必要的环境变量和 Chromium 标志
    """
    try:
        # 获取现有的 Chromium 标志
        flags = os.environ.get("QTWEBENGINE_CHROMIUM_FLAGS", "")
        flag_set = set(flags.split()) if flags else set()
        
        # 对于无 UI 场景（如 hython CLI），默认禁用 GPU 以避免崩溃
        default_disable_gpu = False
        try:
            if 'hou' in sys.modules:
                import hou  # type: ignore
                if hasattr(hou, 'isUIAvailable') and not hou.isUIAvailable():
                    default_disable_gpu = True
        except Exception:
            pass
        
        if default_disable_gpu and os.environ.get("QTWEBENGINE_DISABLE_GPU") not in {"1", "true", "True"}:
            os.environ["QTWEBENGINE_DISABLE_GPU"] = "1"

        # 根据 GPU 偏好设置标志
        gpu_preferred = os.environ.get("QTWEBENGINE_DISABLE_GPU") not in {"1", "true", "True"}
        desired = ["--no-sandbox"]
        
        if gpu_preferred:
            desired.extend(["--ignore-gpu-blocklist", "--enable-gpu", "--enable-zero-copy"])
        else:
            desired.append("--disable-gpu")
            desired.extend(["--disable-software-rasterizer", "--disable-gpu-compositing"])
        
        # 添加所需标志
        for item in desired:
            if item not in flag_set:
                flag_set.add(item)
        
        os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = " ".join(sorted(flag_set))

        # 导入 QtWebEngineCore 以完成初始化
        from PySide6 import QtWebEngineCore  # noqa: F401
    except Exception:
        pass


def create_app():
    """
    创建或获取 QApplication 实例
    
    Returns:
        QApplication: Qt 应用实例
    """
    from PySide6.QtCore import Qt, QCoreApplication
    from PySide6.QtWidgets import QApplication
    
    app = QApplication.instance()
    if app is None:
        # 仅在未创建应用时设置属性；在 Houdini 内部已存在 QApplication
        QCoreApplication.setAttribute(Qt.AA_ShareOpenGLContexts, True)
        app = QApplication(sys.argv)
    
    return app

