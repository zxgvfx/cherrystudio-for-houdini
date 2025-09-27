"""Qt工具函数"""

import os
import sys
from PySide6.QtWidgets import QApplication
from PySide6.QtCore import QCoreApplication
from PySide6.QtCore import Qt
# from PySide6.QtWebEngineCore import QtWebEngineCore  # 这个导入有问题


def ensure_qtwebengine_initialized():
    """确保QtWebEngine已初始化 - 使用原始main.py的逻辑"""
    try:
        # 优先尝试启用 GPU；如需禁用，可手动设置 QTWEBENGINE_DISABLE_GPU=1
        flags = os.environ.get("QTWEBENGINE_CHROMIUM_FLAGS", "")
        flag_set = set(flags.split()) if flags else set()
        gpu_preferred = os.environ.get("QTWEBENGINE_DISABLE_GPU") not in {"1", "true", "True"}
        desired = ["--no-sandbox"]
        if gpu_preferred:
            desired.extend(["--ignore-gpu-blocklist", "--enable-gpu", "--enable-zero-copy"])
        else:
            desired.append("--disable-gpu")
        for item in desired:
            if item not in flag_set:
                flag_set.add(item)
        os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = " ".join(sorted(flag_set))

        from PySide6 import QtWebEngineCore  # noqa: F401
        return True
    except Exception as e:
        print(f"QtWebEngine initialization warning: {e}")
        return False


def create_app():
    """创建Qt应用 - 使用原始main.py的逻辑"""
    app = QApplication.instance()
    if app is None:
        # 仅在未创建应用时设置属性；在 Houdini 内部已存在 QApplication
        QCoreApplication.setAttribute(Qt.AA_ShareOpenGLContexts, True)
        app = QApplication(sys.argv)
    return app
