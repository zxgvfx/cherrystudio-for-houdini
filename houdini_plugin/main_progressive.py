"""渐进式版本的Cherry Studio for Houdini启动脚本"""

import os
import sys

# 添加当前目录到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

def main():
    """渐进式版本的主函数"""
    print("🚀 Starting Cherry Studio for Houdini (Progressive Version)...")
    
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
            from PySide6.QtCore import QUrl, Qt, QTimer
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
        
        # 创建WebChannel
        channel = QWebChannel()
        print("✅ WebChannel created")
        
        # 尝试创建API对象（逐步测试）
        try:
            print("🔧 Testing API imports...")
            from api import ElectronAPI, FileAPI, AppAPI, SelectionAPI, StoreSyncAPI, NetworkAPI
            from bridge import HostBridge
            print("✅ API imports successful")
            
            # 创建API对象
            print("🔧 Creating API objects...")
            electron_api = ElectronAPI()
            print("✅ ElectronAPI created")
            
            file_api = FileAPI()
            print("✅ FileAPI created")
            
            app_api = AppAPI()
            print("✅ AppAPI created")
            
            selection_api = SelectionAPI()
            print("✅ SelectionAPI created")
            
            store_sync_api = StoreSyncAPI()
            print("✅ StoreSyncAPI created")
            
            network_api = NetworkAPI()
            print("✅ NetworkAPI created")
            
            host_bridge = HostBridge()
            print("✅ HostBridge created")
            
            # 注册到WebChannel
            print("🔧 Registering APIs to WebChannel...")
            channel.registerObject("electron", electron_api)
            channel.registerObject("file", file_api)
            channel.registerObject("api", app_api)
            channel.registerObject("selection", selection_api)
            channel.registerObject("storeSync", store_sync_api)
            channel.registerObject("network", network_api)
            channel.registerObject("bridge", host_bridge)
            
            page.setWebChannel(channel)
            print("✅ WebChannel configured with all APIs")
            
        except Exception as e:
            print(f"⚠️  API setup failed: {e}")
            import traceback
            traceback.print_exc()
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
                    .success { color: #2e7d32; background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🍒 Cherry Studio for Houdini</h1>
                    <div class="success">
                        <strong>✅ Status:</strong> Progressive version running with APIs!
                    </div>
                    <p>This version includes all API objects and WebChannel configuration.</p>
                    <p>If you see this message, the APIs are working correctly.</p>
                </div>
            </body>
            </html>
            """)
        
        # 延迟注入JavaScript（如果页面加载成功）
        def try_inject_scripts():
            try:
                print("🔧 Attempting JavaScript injection...")
                from injection import get_injection_scripts
                scripts = get_injection_scripts()
                print(f"✅ Got {len(scripts)} injection scripts")
                
                # 只注入前两个简单的脚本
                for i, script in enumerate(scripts[:2]):
                    page.runJavaScript(script)
                    print(f"✅ Injected script {i+1}")
                
                print("✅ Basic JavaScript injection completed")
                
            except Exception as e:
                print(f"⚠️  JavaScript injection failed: {e}")
        
        # 延迟3秒注入JavaScript
        QTimer.singleShot(3000, try_inject_scripts)
        
        # 显示窗口
        web.show()
        print("✅ Window displayed")
        
        if houdini_env:
            print("🎯 Running in Houdini environment - progressive version should be visible")
            print("📝 APIs loaded, JavaScript injection will happen in 3 seconds")
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
