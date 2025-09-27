"""Qt工具函数"""

import os
import sys
from PySide6.QtWidgets import QApplication
from PySide6.QtCore import QCoreApplication
from PySide6.QtCore import Qt
# from PySide6.QtWebEngineCore import QtWebEngineCore  # 这个导入有问题


def ensure_qtwebengine_initialized():
    """确保QtWebEngine已初始化"""
    try:
        from PySide6.QtWebEngineWidgets import QWebEngineView
        # 在Houdini环境中，需要特别小心初始化QtWebEngine
        try:
            # 尝试创建一个临时的QWebEngineView来测试
            import sys
            from PySide6.QtCore import QCoreApplication
            if not QCoreApplication.instance():
                app = QCoreApplication(sys.argv)
            return True
        except Exception as e:
            print(f"QtWebEngine initialization failed: {e}")
            return False
    except ImportError as e:
        print(f"QtWebEngine not available: {e}")
        return False


def create_app():
    """创建Qt应用"""
    if QCoreApplication.instance() is None:
        app = QApplication(sys.argv)
        try:
            app.setAttribute(Qt.AA_ShareOpenGLContexts)
        except AttributeError:
            # 在PySide6中，这个属性可能在QtCore.Qt中
            pass
        return app
    return QCoreApplication.instance()
