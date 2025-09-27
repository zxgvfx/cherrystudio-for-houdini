"""工作版本的Cherry Studio for Houdini - 结合重构结构和原始稳定性"""

import os
import sys

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

def is_running_inside_houdini() -> bool:
    """检查是否在Houdini环境中运行"""
    try:
        import hou  # type: ignore
        _ = hou.ui
        return True
    except Exception:
        return False

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
        print("✅ QtWebEngine initialized with Chromium flags")
    except Exception as e:
        print(f"⚠️  QtWebEngine initialization warning: {e}")

def create_app():
    """创建Qt应用 - 使用原始main.py的逻辑"""
    from PySide6.QtCore import Qt, QCoreApplication
    from PySide6.QtWidgets import QApplication
    
    app = QApplication.instance()
    if app is None:
        # 仅在未创建应用时设置属性；在 Houdini 内部已存在 QApplication
        QCoreApplication.setAttribute(Qt.AA_ShareOpenGLContexts, True)
        app = QApplication(sys.argv)
        print("✅ QApplication created with proper attributes")
    else:
        print("✅ Using existing QApplication")
    return app

def main():
    """工作版本的主函数"""
    print("🚀 Starting Cherry Studio for Houdini (Working Version)...")
    print("📋 This version combines refactored modular structure with original stability")
    
    try:
        # 检查是否在Houdini环境中
        houdini_env = is_running_inside_houdini()
        if houdini_env:
            print("✅ Running inside Houdini")
        else:
            print("⚠️  Not running inside Houdini")
        
        # 关键：确保QtWebEngine初始化
        ensure_qtwebengine_initialized()
        
        # 导入模块
        from PySide6.QtWidgets import QApplication
        from PySide6.QtWebEngineWidgets import QWebEngineView
        from PySide6.QtWebChannel import QWebChannel
        from PySide6.QtCore import QUrl, Qt, QTimer
        
        # 创建应用
        app = create_app()
        
        # 使用重构后的窗口创建函数
        from window.main_window import create_window
        
        print("📱 Creating main window using refactored modules...")
        web = create_window()
        
        # 显示窗口
        web.show()
        print("✅ Window displayed")
        
        if houdini_env:
            print("🎯 Running in Houdini environment - working version should be visible")
            print("📝 Using refactored modules with original stability")
            return web
        else:
            print("🖥️  Running as standalone application")
            sys.exit(app.exec())
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    main()
