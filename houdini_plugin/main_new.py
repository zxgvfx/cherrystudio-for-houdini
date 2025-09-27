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
    
    try:
        # 检查运行环境
        houdini_env = is_running_inside_houdini()
        if houdini_env:
            print("✅ Running inside Houdini environment")
        else:
            print("⚠️  Warning: Not running inside Houdini")
        
        # 确保QtWebEngine可用
        if not ensure_qtwebengine_initialized():
            print("❌ QtWebEngine not available, exiting...")
            return
        
        # 创建应用
        app = create_app()
        print("✅ Qt application created")
        
        # 创建主窗口
        print("📱 Creating main window...")
        try:
            web = create_window()
            print("✅ Main window created")
            
            # 显示窗口
            web.show()
            print("✅ Window displayed")
            
            print("✅ Cherry Studio for Houdini started successfully!")
            
            # 运行应用
            if houdini_env:
                # 在Houdini中运行时，不调用exec()
                print("🎯 Running in Houdini environment - window should be visible now")
                # 保持窗口存活
                return web
            else:
                # 独立运行时调用exec()
                print("🖥️  Running as standalone application")
                sys.exit(app.exec())
                
        except Exception as e:
            print(f"❌ Error creating window: {e}")
            import traceback
            traceback.print_exc()
            return None
            
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        return None


if __name__ == "__main__":
    main()
