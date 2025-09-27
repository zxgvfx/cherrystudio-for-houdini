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
        return True
    except ImportError:
        print("QtWebEngine not available")
        return False


def create_app():
    """创建Qt应用"""
    if QCoreApplication.instance() is None:
        app = QApplication(sys.argv)
        app.setAttribute(Qt.AA_ShareOpenGLContexts)
        return app
    return QCoreApplication.instance()
