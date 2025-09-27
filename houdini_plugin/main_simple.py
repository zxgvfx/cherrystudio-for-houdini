"""简化的Cherry Studio for Houdini启动脚本"""

import os
import sys

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

def main():
    """简化的主函数"""
    print("🚀 Starting Cherry Studio for Houdini (Simplified)...")
    
    try:
        # 检查是否在Houdini环境中
        try:
            import hou
            print("✅ Running inside Houdini")
            houdini_env = True
        except ImportError:
            print("⚠️  Not running inside Houdini")
            houdini_env = False
        
        # 检查QtWebEngine
        try:
            from PySide6.QtWidgets import QApplication
            from PySide6.QtWebEngineWidgets import QWebEngineView
            from PySide6.QtCore import QUrl
            print("✅ QtWebEngine available")
        except ImportError as e:
            print(f"❌ QtWebEngine not available: {e}")
            return
        
        # 创建应用
        if QApplication.instance() is None:
            app = QApplication(sys.argv)
            # 在PySide6中，这个属性在QtCore.Qt中
            from PySide6.QtCore import Qt
            app.setAttribute(Qt.AA_ShareOpenGLContexts)
            print("✅ Qt application created")
        else:
            app = QApplication.instance()
            print("✅ Using existing Qt application")
        
        # 创建简单的Web视图
        web = QWebEngineView()
        web.resize(1200, 800)
        web.setWindowTitle("Cherry Studio for Houdini")
        print("✅ Web view created")
        
        # 加载页面
        # current_dir 是 houdini_plugin/ 目录，向上一级到项目根目录
        project_root = os.path.dirname(current_dir)
        web_dir = os.path.join(project_root, "web", "out", "renderer")
        index_path = os.path.join(web_dir, "index.html")
        print(f"🔍 Current dir: {current_dir}")
        print(f"🔍 Project root: {project_root}")
        print(f"🔍 Web dir: {web_dir}")
        print(f"🔍 Index path: {index_path}")
        print(f"🔍 Index exists: {os.path.exists(index_path)}")
        
        if os.path.exists(index_path):
            print(f"✅ Loading: {index_path}")
            web.load(QUrl.fromLocalFile(os.path.abspath(index_path)))
        else:
            print(f"❌ Index file not found: {index_path}")
            web.setHtml("""
            <html>
            <head><title>Cherry Studio for Houdini</title></head>
            <body style="font-family: Arial; margin: 50px;">
                <h1>Cherry Studio for Houdini</h1>
                <p>Web files not found at: """ + index_path + """</p>
            </body>
            </html>
            """)
        
        # 显示窗口
        web.show()
        print("✅ Window displayed")
        
        if houdini_env:
            print("🎯 Running in Houdini environment - window should be visible")
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
