"""
窗口管理器模块
负责创建和配置主窗口
"""

import os
import json
from PySide6.QtCore import QUrl, QFile, QStandardPaths
from PySide6.QtWidgets import QMainWindow, QWidget, QVBoxLayout
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWebEngineCore import QWebEngineScript, QWebEngineProfile, QWebEngineSettings
from PySide6.QtWebChannel import QWebChannel
from PySide6.QtGui import QDragEnterEvent, QDragMoveEvent, QDropEvent

from api.cherry_studio_api import CherryStudioAPI
from web.electron_injector import (
    get_electron_api_script,
    get_early_logger_fix_script,
    get_post_load_fix_script
)


def create_window(load_url: str, theme: str = 'light'):
    """
    创建主窗口
    
    Args:
        load_url: 要加载的 URL（本地文件路径或 HTTP URL）
        theme: 主题设置（'light' 或 'dark'）
        
    Returns:
        QMainWindow: 创建的主窗口实例
    """
    try:
        # 在 Houdini 内部尽量挂到主窗口，避免焦点与生命周期问题
        parent = None
        try:
            import hou  # type: ignore
            try:
                # H20.5 起提供 hou.qt
                from hou import qt as hou_qt  # type: ignore
                parent = hou_qt.mainWindow()
            except Exception:
                parent = hou.ui.mainQtWindow()
        except Exception:
            parent = None
        
        # 创建主窗口
        window = QMainWindow(parent)
        window.setWindowTitle("Cherry Studio for Houdini")
        window.resize(1400, 900)
        
        # 配置持久化存储（确保配置不会丢失）
        # 重要：必须在任何 WebEngine 相关对象创建之前设置
        app_data_path = QStandardPaths.writableLocation(QStandardPaths.AppDataLocation)
        storage_path = os.path.join(app_data_path, "CherryStudio")
        os.makedirs(storage_path, exist_ok=True)
        
        # 使用默认 profile（hython 环境不支持命名 Profile，会崩溃）
        # 虽然 defaultProfile 是 off-the-record 模式，但我们会在 JavaScript 层面手动持久化 IndexedDB
        profile = QWebEngineProfile.defaultProfile()
        profile.setPersistentStoragePath(storage_path)
        cache_path = os.path.join(storage_path, "cache")
        os.makedirs(cache_path, exist_ok=True)
        profile.setCachePath(cache_path)
        profile.setPersistentCookiesPolicy(QWebEngineProfile.PersistentCookiesPolicy.ForcePersistentCookies)
        profile.setHttpCacheType(QWebEngineProfile.HttpCacheType.DiskHttpCache)
        
        print(f"持久化存储路径: {storage_path}")
        print(f"实际存储路径: {profile.persistentStoragePath()}")
        print(f"缓存路径: {profile.cachePath()}")
        
        # 创建 WebEngine 视图（使用默认 profile）
        web_view = QWebEngineView()
        
        # 启用 IndexedDB 和本地存储的持久化
        settings = web_view.settings()
        settings.setAttribute(QWebEngineSettings.WebAttribute.LocalStorageEnabled, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.AllowRunningInsecureContent, True)
        
        # 打印配置信息用于调试
        print(f"LocalStorageEnabled: {settings.testAttribute(QWebEngineSettings.WebAttribute.LocalStorageEnabled)}")
        print(f"LocalContentCanAccessFileUrls: {settings.testAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls)}")
        
        # 创建支持拖拽的容器
        class WebContainer(QWidget):
            """支持拖拽的 Web 容器"""
            def __init__(self, child: QWidget):
                super().__init__(parent)
                self.setAcceptDrops(True)
                layout = QVBoxLayout(self)
                layout.setContentsMargins(0, 0, 0, 0)
                layout.addWidget(child)
            
            def dragEnterEvent(self, event: QDragEnterEvent):
                """拖拽进入事件"""
                try:
                    mime_data = event.mimeData()
                    if (mime_data.hasUrls() or mime_data.hasText() or 
                        mime_data.hasFormat("text/uri-list") or 
                        mime_data.hasFormat("text/plain")):
                        event.acceptProposedAction()
                    else:
                        event.ignore()
                except Exception as e:
                    print(f"Error in dragEnterEvent: {e}")
                    event.ignore()
            
            def dragMoveEvent(self, event: QDragMoveEvent):
                """拖拽移动事件"""
                try:
                    mime_data = event.mimeData()
                    if (mime_data.hasUrls() or mime_data.hasText() or 
                        mime_data.hasFormat("text/uri-list") or 
                        mime_data.hasFormat("text/plain")):
                        event.acceptProposedAction()
                    else:
                        event.ignore()
                except Exception as e:
                    print(f"Error in dragMoveEvent: {e}")
                    event.ignore()
            
            def dropEvent(self, event: QDropEvent):
                """拖拽释放事件"""
                try:
                    mime_data = event.mimeData()
                    
                    # 处理 Houdini 节点拖拽
                    try:
                        import hou
                        selected_nodes = hou.selectedNodes()
                        if selected_nodes:
                            nodes_data = {
                                "type": "nodes",
                                "paths": [node.path() for node in selected_nodes]
                            }
                            self._sendDropData(json.dumps(nodes_data))
                            event.acceptProposedAction()
                            return
                    except ImportError:
                        pass
                    except Exception:
                        pass
                    
                    # 处理文件拖拽
                    files = []
                    if mime_data.hasUrls():
                        for url in mime_data.urls():
                            if url.isLocalFile():
                                file_path = url.toLocalFile()
                                if os.path.exists(file_path):
                                    files.append(file_path)
                    
                    if files:
                        self._sendDropData(json.dumps(files))
                        event.acceptProposedAction()
                        return
                    
                    # 处理文本拖拽
                    if mime_data.hasText():
                        text = mime_data.text()
                        if text:
                            self._sendDropData(text)
                            event.acceptProposedAction()
                            return
                    
                    event.ignore()
                    
                except Exception as e:
                    print(f"Error in dropEvent: {e}")
                    event.ignore()
            
            def _sendDropData(self, data: str):
                """发送拖拽数据到前端"""
                try:
                    web_view.page().runJavaScript(f"""
                        if (window.onFileDrop) {{
                            window.onFileDrop({json.dumps(data)});
                        }} else {{
                            console.log('File dropped:', {json.dumps(data)});
                        }}
                    """)
                except Exception as e:
                    print(f"Error sending drop data: {e}")
        
        # 设置容器
        container = WebContainer(web_view)
        window.setCentralWidget(container)
        
        # 创建并注册 API 对象
        # 注意：使用 window 作为父对象，确保与窗口生命周期绑定
        api = CherryStudioAPI(window)
        page = web_view.page()
        
        # 使用 QWebChannel 连接 Python API 和 JavaScript
        # 注意：传入 window 作为父对象，确保生命周期正确
        channel = QWebChannel(window)
        channel.registerObject("api", api)
        # 兼容旧逻辑：直接暴露 network 名称
        try:
            channel.registerObject("network", api)
        except Exception:
            pass
        page.setWebChannel(channel)
        
        # 注入脚本
        # 0. 内联注入 qwebchannel.js（确保 QWebChannel 可用）
        try:
            qwc_file = QFile(":/qtwebchannel/qwebchannel.js")
            qwc_source = ""
            if qwc_file.exists() and qwc_file.open(QFile.ReadOnly | QFile.Text):
                qwc_source = bytes(qwc_file.readAll()).decode("utf-8", errors="ignore")
                qwc_file.close()
            if qwc_source:
                qwc_injection = QWebEngineScript()
                qwc_injection.setName("inline-qwebchannel-js")
                qwc_injection.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
                qwc_injection.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
                qwc_injection.setRunsOnSubFrames(True)
                qwc_injection.setSourceCode(qwc_source)
                page.scripts().insert(qwc_injection)
                print("QWebChannel.js 已内联注入")
        except Exception as e:
            print(f"QWebChannel.js 注入失败: {e}")
        
        # 1. 早期修复脚本
        early_fix_script = QWebEngineScript()
        early_fix_script.setName("early-logger-fix")
        early_fix_script.setSourceCode(get_early_logger_fix_script())
        early_fix_script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        early_fix_script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
        early_fix_script.setRunsOnSubFrames(True)
        
        # 2. 主 Electron API 脚本
        electron_api_script = QWebEngineScript()
        electron_api_script.setName("electron-api")
        electron_api_script.setSourceCode(get_electron_api_script(theme))
        electron_api_script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        electron_api_script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
        electron_api_script.setRunsOnSubFrames(True)
        
        # 3. Post-load 脚本（使用 DocumentReady 注入）
        post_load_script = QWebEngineScript()
        post_load_script.setName("post-load-fix")
        post_load_script.setSourceCode(get_post_load_fix_script())
        post_load_script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        post_load_script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentReady)
        post_load_script.setRunsOnSubFrames(True)
        
        if page:
            page.scripts().insert(early_fix_script)
            print("早期LoggerService修复脚本已注入")
            page.scripts().insert(electron_api_script)
            print("Electron API脚本已注入")
            page.scripts().insert(post_load_script)
            print("Post-load脚本已注入 (DocumentReady)")
            
            # 调试：列出所有已注入的脚本
            all_scripts = page.scripts().toList()
            print(f"总共注入了 {len(all_scripts)} 个脚本")
        
        # 监听窗口标题变化
        def on_title_changed(title):
            print(f"窗口标题变化: {title}")
        
        window.windowTitleChanged.connect(on_title_changed)
        
        # 设置页面加载回调
        def on_load_finished(ok):
            if ok:
                print("页面加载完成")
                print(f"当前窗口标题: {window.windowTitle()}")
                # 注意：page.runJavaScript() 在 hython 环境中不工作
                # 所有脚本都通过 QWebEngineScript.insert() 注入
            else:
                print("页面加载失败")
        
        if page:
            page.loadFinished.connect(on_load_finished)
        
        # 加载 URL
        if load_url.startswith("http"):
            web_view.load(QUrl(load_url))
        else:
            if not os.path.isabs(load_url):
                load_url = os.path.abspath(load_url)
            web_view.load(QUrl.fromLocalFile(load_url))
        
        # 防止 Python GC 回收
        window._webview_ref = web_view
        window._api_ref = api
        window._channel_ref = channel
        
        print("窗口创建成功")
        return window
        
    except Exception as e:
        print(f"创建窗口失败: {e}")
        raise

