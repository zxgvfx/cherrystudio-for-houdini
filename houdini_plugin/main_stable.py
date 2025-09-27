"""稳定版本的Cherry Studio for Houdini启动脚本"""

import os
import sys

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

def main():
    """稳定版本的主函数"""
    print("🚀 Starting Cherry Studio for Houdini (Stable Version)...")
    
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
            from PySide6.QtCore import QUrl, Qt
            print("✅ QtWebEngine available")
        except ImportError as e:
            print(f"❌ QtWebEngine not available: {e}")
            return
        
        # 创建应用
        if QApplication.instance() is None:
            app = QApplication(sys.argv)
            app.setAttribute(Qt.AA_ShareOpenGLContexts)
            print("✅ Qt application created")
        else:
            app = QApplication.instance()
            print("✅ Using existing Qt application")
        
        # 创建Web视图
        web = QWebEngineView()
        web.resize(1200, 800)
        web.setWindowTitle("Cherry Studio for Houdini")
        print("✅ Web view created")
        
        # 基本页面设置
        page = web.page()
        settings = page.settings()
        from PySide6.QtWebEngineCore import QWebEngineSettings
        settings.setAttribute(QWebEngineSettings.JavascriptEnabled, True)
        settings.setAttribute(QWebEngineSettings.LocalContentCanAccessRemoteUrls, True)
        print("✅ Page settings configured")
        
        # 加载页面
        project_root = os.path.dirname(current_dir)
        web_dir = os.path.join(project_root, "web", "out", "renderer")
        index_path = os.path.join(web_dir, "index.html")
        
        print(f"🔍 Loading from: {index_path}")
        
        if os.path.exists(index_path):
            print("✅ Loading Cherry Studio interface")
            web.load(QUrl.fromLocalFile(os.path.abspath(index_path)))
        else:
            print("❌ Using fallback HTML")
            web.setHtml("""
            <html>
            <head>
                <title>Cherry Studio for Houdini</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 50px; background: #f0f0f0; }
                    .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    h1 { color: #333; text-align: center; }
                    p { color: #666; line-height: 1.6; }
                    .status { color: #2e7d32; background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0; }
                    .warning { color: #f57c00; background: #fff3e0; padding: 10px; border-radius: 5px; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🍒 Cherry Studio for Houdini</h1>
                    <div class="status">
                        <strong>✅ Status:</strong> Stable version running successfully!
                    </div>
                    <p>Welcome to Cherry Studio for Houdini! This is the stable version without complex JavaScript injection.</p>
                    
                    <div class="warning">
                        <strong>Notice:</strong> Web interface files not found at:<br>
                        <code>""" + index_path + """</code><br><br>
                        This version runs without the full Cherry Studio interface to avoid crashes.
                    </div>
                    
                    <p>Features available in this stable version:</p>
                    <ul>
                        <li>🦙 Basic Ollama integration (when web interface loads)</li>
                        <li>🌐 External model sources (when web interface loads)</li>
                        <li>🔑 API key management (when web interface loads)</li>
                        <li>📁 File operations (when web interface loads)</li>
                        <li>🎯 Houdini selection integration (when web interface loads)</li>
                    </ul>
                    
                    <p><strong>Next steps:</strong> If you see this message, the window is stable. You can try loading the full interface by ensuring the web files are built correctly.</p>
                </div>
            </body>
            </html>
            """)
        
        # 显示窗口
        web.show()
        print("✅ Window displayed")
        
        if houdini_env:
            print("🎯 Running in Houdini environment - stable window should be visible")
            print("📝 Note: This version runs without complex JavaScript injection to avoid crashes")
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
