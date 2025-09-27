"""主窗口管理模块"""

import os
from PySide6.QtCore import QUrl, QTimer
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWebChannel import QWebChannel
from PySide6.QtWebEngineCore import QWebEnginePage, QWebEngineProfile, QWebEngineScript
from PySide6.QtWebEngineCore import QWebEngineSettings
from PySide6.QtCore import QObject, Signal, Slot
from PySide6.QtWidgets import QWidget, QVBoxLayout

from api import ElectronAPI, FileAPI, AppAPI, SelectionAPI, StoreSyncAPI, NetworkAPI
from bridge.host_bridge import HostBridge
from injection.scripts import get_injection_scripts


# 全局变量用于保持窗口存活
_windows_keepalive = []


def get_default_index_path() -> str:
    """获取默认的index.html路径"""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # current_dir 是 houdini_plugin/window/ 目录，向上两级到项目根目录
    project_root = os.path.dirname(os.path.dirname(current_dir))
    web_dir = os.path.join(project_root, "web", "out", "renderer")
    index_path = os.path.join(web_dir, "index.html")
    return index_path


def create_window() -> QWebEngineView:
    """创建主窗口"""
    try:
        print("🔧 Creating QWebEngineView...")
        web = QWebEngineView()
        _windows_keepalive.append(web)
        
        # 设置窗口大小
        web.resize(1200, 800)
        web.setWindowTitle("Cherry Studio for Houdini")
        print("✅ QWebEngineView created and configured")
    except Exception as e:
        print(f"❌ Error creating QWebEngineView: {e}")
        raise
    
    # 设置页面
    page = QWebEnginePage()
    web.setPage(page)
    
    # 启用JavaScript
    settings = page.settings()
    settings.setAttribute(QWebEngineSettings.JavascriptEnabled, True)
    settings.setAttribute(QWebEngineSettings.LocalContentCanAccessRemoteUrls, True)
    settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)
    
    # 设置WebChannel
    channel = QWebChannel()
    
    # 创建API对象
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
    
    # 设置控制台消息处理
    def _on_console_message(level, message, line_num, source_id):
        print(f"js: {message}")
    
    # 注意：PySide6的语法可能不同，暂时注释掉
    # page.javaScriptConsoleMessage.connect(_on_console_message)
    
    # 加载页面
    index_path = get_default_index_path()
    print(f"🔍 Index path: {index_path}")
    print(f"🔍 Path exists: {os.path.exists(index_path)}")
    
    if os.path.exists(index_path):
        full_path = os.path.abspath(index_path)
        print(f"🔍 Loading from: {full_path}")
        web.load(QUrl.fromLocalFile(full_path))
    else:
        print(f"❌ Index file not found, using fallback HTML")
        web.setHtml("""
        <html>
        <head>
            <title>Cherry Studio for Houdini</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 50px; }
                h1 { color: #333; }
                p { color: #666; }
            </style>
        </head>
        <body>
            <h1>Cherry Studio for Houdini</h1>
            <p>Web files not found. Please ensure the web directory exists.</p>
            <p>Expected path: """ + index_path + """</p>
        </body>
        </html>
        """)
    
    # 注入JavaScript
    def inject_scripts():
        scripts = get_injection_scripts()
        for i, script in enumerate(scripts):
            page.runJavaScript(script)
    
    # 延迟注入，确保页面加载完成
    QTimer.singleShot(1000, inject_scripts)
    
    return web
