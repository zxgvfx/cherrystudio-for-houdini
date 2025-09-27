"""修复版本的Cherry Studio for Houdini启动脚本 - 基于原始main.py的初始化逻辑"""

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
    # PySide6 requires QtWebEngine initialization before QApplication in some envs
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
    """修复版本的主函数"""
    print("🚀 Starting Cherry Studio for Houdini (Fixed Version)...")
    
    try:
        # 检查是否在Houdini环境中
        houdini_env = is_running_inside_houdini()
        if houdini_env:
            print("✅ Running inside Houdini")
        else:
            print("⚠️  Not running inside Houdini")
        
        # 关键：确保QtWebEngine初始化（这是原始main.py的关键逻辑）
        ensure_qtwebengine_initialized()
        
        # 检查QtWebEngine
        try:
            from PySide6.QtWidgets import QApplication
            from PySide6.QtWebEngineWidgets import QWebEngineView
            from PySide6.QtWebChannel import QWebChannel
            from PySide6.QtCore import QUrl, Qt, QTimer
            print("✅ QtWebEngine imports successful")
        except ImportError as e:
            print(f"❌ QtWebEngine not available: {e}")
            return
        
        # 创建应用（使用原始逻辑）
        app = create_app()
        
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
        
        # 尝试创建API对象
        try:
            print("🔧 Creating API objects...")
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
            print("✅ WebChannel configured with all APIs")
            
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
                    .success { color: #2e7d32; background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🍒 Cherry Studio for Houdini</h1>
                    <div class="success">
                        <strong>✅ Status:</strong> Fixed version running with proper QtWebEngine initialization!
                    </div>
                    <p>This version uses the same initialization logic as the original main.py</p>
                    <p>If you see this message, the window is stable with proper Chromium flags.</p>
                </div>
            </body>
            </html>
            """)
        
        # 延迟注入JavaScript
        def try_inject_scripts():
            try:
                print("🔧 Attempting JavaScript injection...")
                from injection import get_injection_scripts
                scripts = get_injection_scripts()
                print(f"✅ Got {len(scripts)} injection scripts")
                
                # 注入所有脚本
                for i, script in enumerate(scripts):
                    page.runJavaScript(script)
                    print(f"✅ Injected script {i+1}")
                
                print("✅ All JavaScript injection completed")
                
            except Exception as e:
                print(f"⚠️  JavaScript injection failed: {e}")
        
        # 延迟5秒注入JavaScript（给页面更多时间加载）
        QTimer.singleShot(5000, try_inject_scripts)
        
        # 显示窗口
        web.show()
        print("✅ Window displayed")
        
        if houdini_env:
            print("🎯 Running in Houdini environment - fixed version should be visible")
            print("📝 Using original main.py initialization logic")
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