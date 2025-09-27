"""Cherry Studio for Houdini - 重构后的主入口文件"""

import os
import sys

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

from utils import is_running_inside_houdini, ensure_qtwebengine_initialized, create_app
from window.main_window import create_window


def main():
    """主函数"""
    print("🚀 Starting Cherry Studio for Houdini...")
    
    # 检查运行环境
    if not is_running_inside_houdini():
        print("⚠️  Warning: Not running inside Houdini")
    
    # 确保QtWebEngine可用
    if not ensure_qtwebengine_initialized():
        print("❌ QtWebEngine not available, exiting...")
        return
    
    # 创建应用
    app = create_app()
    
    # 创建主窗口
    print("📱 Creating main window...")
    web = create_window()
    web.show()
    
    print("✅ Cherry Studio for Houdini started successfully!")
    
    # 运行应用
    if is_running_inside_houdini():
        # 在Houdini中运行时，不调用exec()
        print("🎯 Running in Houdini environment")
    else:
        # 独立运行时调用exec()
        print("🖥️  Running as standalone application")
        sys.exit(app.exec())


if __name__ == "__main__":
    main()
