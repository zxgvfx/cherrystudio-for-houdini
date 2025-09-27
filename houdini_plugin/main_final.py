"""最终版本的Cherry Studio for Houdini启动脚本"""

import os
import sys
import json

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

def main():
    """最终版本的主函数"""
    print("🚀 Starting Cherry Studio for Houdini (Final Version)...")
    
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
            from PySide6.QtWebChannel import QWebChannel
            from PySide6.QtCore import QUrl, QTimer, Qt
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
        
        # 设置页面
        page = web.page()
        settings = page.settings()
        from PySide6.QtWebEngineCore import QWebEngineSettings
        settings.setAttribute(QWebEngineSettings.JavascriptEnabled, True)
        settings.setAttribute(QWebEngineSettings.LocalContentCanAccessRemoteUrls, True)
        
        # 创建WebChannel和API对象
        channel = QWebChannel()
        
        # 导入并创建API对象
        try:
            from api import ElectronAPI, FileAPI, AppAPI, SelectionAPI, StoreSyncAPI, NetworkAPI
            from bridge import HostBridge
            
            electron_api = ElectronAPI()
            file_api = FileAPI()
            app_api = AppAPI()
            selection_api = SelectionAPI()
            store_sync_api = StoreSyncAPI()
            network_api = NetworkAPI()
            host_bridge = HostBridge()
            
            # 注册到WebChannel
            channel.registerObject("electron", electron_api)
            channel.registerObject("file", file_api)
            channel.registerObject("api", app_api)
            channel.registerObject("selection", selection_api)
            channel.registerObject("storeSync", store_sync_api)
            channel.registerObject("network", network_api)
            channel.registerObject("bridge", host_bridge)
            
            page.setWebChannel(channel)
            print("✅ WebChannel and APIs configured")
            
        except Exception as e:
            print(f"⚠️  API setup failed: {e}")
            page.setWebChannel(channel)
        
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
                    .error { color: #d32f2f; background: #ffebee; padding: 10px; border-radius: 5px; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🍒 Cherry Studio for Houdini</h1>
                    <p>Welcome to Cherry Studio for Houdini! This is the Houdini-integrated version of Cherry Studio.</p>
                    
                    <div class="error">
                        <strong>Notice:</strong> Web interface files not found at:<br>
                        <code>""" + index_path + """</code><br><br>
                        Please ensure the Cherry Studio web files are built and available.
                    </div>
                    
                    <p>This version includes all the functionality for:</p>
                    <ul>
                        <li>🦙 Ollama model integration</li>
                        <li>🌐 External model sources</li>
                        <li>🔑 API key management</li>
                        <li>📁 File operations</li>
                        <li>🎯 Houdini selection integration</li>
                    </ul>
                </div>
            </body>
            </html>
            """)
        
        # 注入基本的JavaScript
        def inject_basic_scripts():
            try:
                from injection import get_injection_scripts
                scripts = get_injection_scripts()
                for script in scripts:
                    page.runJavaScript(script)
                print("✅ JavaScript injection completed")
            except Exception as e:
                print(f"⚠️  JavaScript injection failed: {e}")
        
        # 延迟注入JavaScript
        QTimer.singleShot(1000, inject_basic_scripts)
        
        # 显示窗口
        web.show()
        print("✅ Window displayed")
        
        if houdini_env:
            print("🎯 Running in Houdini environment - Cherry Studio interface should be visible")
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
