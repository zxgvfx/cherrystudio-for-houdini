"""
窗口管理器模块
负责创建和配置主窗口，并整合后端服务的启动与会话注册。
"""

import os
import json
from PySide6.QtCore import QUrl, Qt, QObject

# 在 Chromium 引擎初始化之前设置标志（必须在所有 PySide6 Qt 类 import 之前）。
#
# 目的：
#   1. --proxy-bypass-list：防止系统代理拦截 localhost 请求
#      （代理宕机时 JS fetch('127.0.0.1:9876') 会报 "Failed to fetch"）
#   2. --disable-web-security：允许 file:// 页面通过 fetch() 访问 http://localhost
#      （Chromium 默认禁止 file:// → http:// 的跨源请求，即使设置了
#       LocalContentCanAccessRemoteUrls 也可能不生效）
#   3. --allow-file-access-from-files：允许 file:// 读取其他 file:// 资源
_chrome_flags = os.environ.get("QTWEBENGINE_CHROMIUM_FLAGS", "")
_flags_to_add = []
if "--proxy-bypass-list" not in _chrome_flags:
    _flags_to_add.append("--proxy-bypass-list=127.0.0.1;localhost;::1;<-loopback>")
    if "--disable-web-security" not in _chrome_flags:
        _flags_to_add.append("--disable-web-security")
    if "--allow-file-access-from-files" not in _chrome_flags:
        _flags_to_add.append("--allow-file-access-from-files")
    if "--allow-file-access" not in _chrome_flags:
        _flags_to_add.append("--allow-file-access")
if _flags_to_add:
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = (
        _chrome_flags + " " + " ".join(_flags_to_add)
    ).strip()
from PySide6.QtWidgets import QMainWindow, QWidget, QVBoxLayout
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWebEngineCore import (
    QWebEngineScript, QWebEngineProfile, QWebEngineSettings,
    QWebEnginePage,
)
from PySide6.QtGui import QDragEnterEvent, QDragMoveEvent, QDropEvent

# 支持两种 API：v2（薄代理）和 v1（原单体），通过环境变量切换
_USE_V2_API = os.environ.get("CHERRY_API_V2", "1") == "1"
if _USE_V2_API:
    from ..api.cherry_studio_api_v2 import CherryStudioAPI
else:
    from ..api.cherry_studio_api import CherryStudioAPI

from ..web.electron_injector import (
    get_electron_api_script,
    get_early_logger_fix_script,
    get_post_load_fix_script
)


def _ensure_backend_service(static_dir: str = "") -> str:
    """
    确保后端服务可用，返回服务的 base URL。

    必须在当前进程内嵌入启动后端，因为 Qt Bridge（qt_bridge.py）需要
    直接访问 CherryStudioAPI 实例（同进程内的 Python 对象），外部后端
    进程无法持有 Qt API 引用。

    Args:
        static_dir: 前端静态文件目录，设置后后端将托管该目录，
                    使页面可通过 http:// 加载（解决 file:// + UNC 路径下
                    blob URL 被 Chromium 拦截的问题）。
    """
    try:
        from ..backend.service_runner import BackendService
        svc = BackendService.instance()
        if not svc.is_running():
            port = svc.start()
            print(f"[WindowManager] Backend service started (embedded) on port {port}")
        # 注册静态文件目录
        server = svc.get_server()
        if server and static_dir and os.path.isdir(static_dir):
            server.static_dir = static_dir
            print(f"[WindowManager] Static files served from: {static_dir}")
        return svc.get_base_url()
    except Exception as e:
        import traceback
        print(f"[WindowManager] Failed to start backend service: {e}")
        print(f"[WindowManager] Full traceback:\n{traceback.format_exc()}")
        return ""


def _register_dcc_session(backend_url: str) -> str:
    """
    启动 Houdini MCP Server 并向后端服务注册当前 DCC 会话。
    返回 session_id（用于注入到前端 URL）。
    """
    if not backend_url:
        return ""
    try:
        from ..dcc.session import DCCSession
        from ..dcc.houdini_mcp import HoudiniMCPServer

        session = DCCSession.instance()
        session.set_backend_url(backend_url)

        # 启动 Houdini MCP Server（如果尚未启动）
        if session.mcp_port == 0:
            mcp_server = HoudiniMCPServer()
            mcp_port = mcp_server.start()
            session.set_mcp_port(mcp_port)
            print(f"[WindowManager] Houdini MCP Server started on port {mcp_port}")

        # 注册到后端
        session.register_to_backend()
        return session.session_id
    except Exception as e:
        print(f"[WindowManager] DCC session registration failed: {e}")
        return ""


def create_window(load_url: str, theme: str = 'light', as_widget: bool = False, parent=None):
    """
    创建主窗口。

    架构步骤：
    1. 启动后端服务（如未运行）
    2. 注册 DCC 会话（启动 Houdini MCP Server）
    3. 将 session_id 和 backend_url 注入到前端加载 URL
    4. 创建 QWebEngineView，前端通过 HTTP 直连后端（无 QWebChannel）

    Args:
        load_url: 要加载的 URL（本地文件路径或 HTTP URL）
        theme: 主题设置（'light' 或 'dark'）

    Returns:
        QMainWindow: 创建的主窗口实例
    """
    try:
        # ── Step 1: 启动后端服务（同时注册静态文件目录） ─────────────────────
        # 如果 load_url 指向本地 index.html，将其所在目录作为静态文件根目录，
        # 这样前端通过 http://127.0.0.1:PORT/ 加载，避免 file:// + UNC 路径
        # 导致 blob: URL 被 Chromium 安全策略拦截。
        static_dir = ""
        if not load_url.startswith("http"):
            abs_url = os.path.abspath(load_url) if not os.path.isabs(load_url) else load_url
            if os.path.isfile(abs_url):
                static_dir = os.path.dirname(abs_url)

        backend_url = _ensure_backend_service(static_dir)

        # 如果后端可用且有静态目录，改为通过 HTTP 加载
        if backend_url and static_dir and not load_url.startswith("http"):
            load_url = backend_url + "/"
            print(f"[WindowManager] Loading frontend via HTTP: {load_url}")

        # ── Step 2: 注册 DCC 会话 ────────────────────────────────────────────
        session_id = _register_dcc_session(backend_url)

        # ── Step 3: 将会话信息注入到 URL ─────────────────────────────────────
        if session_id and backend_url and "?" not in load_url:
            from ..dcc.session import DCCSession
            query = DCCSession.instance().get_url_params()
            load_url_with_params = load_url
        else:
            load_url_with_params = load_url

    except Exception as _setup_err:
        print(f"[WindowManager] Setup error (non-fatal): {_setup_err}")
        backend_url = ""
        session_id = ""
        load_url_with_params = load_url

    try:
        # 在 Houdini 内部尽量挂到主窗口，避免焦点与生命周期问题（可被调用方覆盖）
        if parent is None and not as_widget:
            try:
                import hou  # type: ignore
                try:
                    from hou import qt as hou_qt  # type: ignore
                    parent = hou_qt.mainWindow()
                except Exception:
                    parent = hou.ui.mainQtWindow()
            except Exception:
                parent = None

        # 如果需要 QWidget 模式，则不创建 QMainWindow
        window = None
        if not as_widget:
            # 定义支持拖拽的 QMainWindow
            class FramelessWindow(QMainWindow):
                def __init__(self, parent=None):
                    super().__init__(parent)
                    self._is_dragging = False
                    self._drag_position = None

                def mousePressEvent(self, event):
                    if event.button() == Qt.LeftButton:
                        self._is_dragging = True
                        self._drag_position = event.globalPosition().toPoint() - self.frameGeometry().topLeft()
                        event.accept()
                    else:
                        super().mousePressEvent(event)

                def mouseMoveEvent(self, event):
                    if self._is_dragging and event.buttons() & Qt.LeftButton:
                        self.move(event.globalPosition().toPoint() - self._drag_position)
                        event.accept()
                    else:
                        super().mouseMoveEvent(event)

                def mouseReleaseEvent(self, event):
                    self._is_dragging = False
                    super().mouseReleaseEvent(event)

            window = FramelessWindow(parent)
            # 设置无边框模式，因为 Cherry Studio 自带了窗口控制按钮
            window.setWindowFlags(window.windowFlags() | Qt.FramelessWindowHint)
            window.setAttribute(Qt.WA_TranslucentBackground)  # 允许透明背景，配合圆角
            window.setWindowTitle("Cherry Studio")
            window.resize(1400, 900)

        # 配置持久化存储（确保配置不会丢失）
        # 重要：必须在任何 WebEngine 相关对象创建之前设置
        # 使用用户主目录下的 .cherrystudio 目录，确保跨宿主应用路径一致
        storage_path = os.path.join(os.path.expanduser("~"), ".cherrystudio")
        os.makedirs(storage_path, exist_ok=True)

        # 使用默认 profile（hython 环境不支持命名 Profile，会崩溃）
        # 虽然 defaultProfile 是 off-the-record 模式，但我们会在 JavaScript 层面手动持久化 IndexedDB
        profile = QWebEngineProfile("CherryStudio")
        profile.setPersistentStoragePath(storage_path)
        cache_path = os.path.join(storage_path, "cache")
        os.makedirs(cache_path, exist_ok=True)
        profile.setCachePath(cache_path)
        profile.setPersistentCookiesPolicy(QWebEngineProfile.PersistentCookiesPolicy.ForcePersistentCookies)
        profile.setHttpCacheType(QWebEngineProfile.HttpCacheType.DiskHttpCache)

        print(f"持久化存储路径: {storage_path}")
        print(f"实际存储路径: {profile.persistentStoragePath()}")
        print(f"缓存路径: {profile.cachePath()}")

        # ─── Download Handler ─────────────────────────────────────────────────
        def _on_download_requested(download):
            try:
                from PySide6.QtWidgets import QFileDialog
                print(f"[Download] Requested: {download.downloadFileName()}")

                # Determine parent
                parent_widget = window if window else None

                suggested = download.downloadFileName()
                default_dir = os.path.join(os.path.expanduser("~"), "Downloads")
                default_path = os.path.join(default_dir, suggested)

                path, _ = QFileDialog.getSaveFileName(parent_widget, "Save File", default_path, "CSV Files (*.csv)")

                if path:
                    download.setDownloadDirectory(os.path.dirname(path))
                    download.setDownloadFileName(os.path.basename(path))
                    download.accept()
                    print(f"[Download] Saving to {path}")
                else:
                    download.cancel()
                    print("[Download] Cancelled")
            except Exception as e:
                print(f"[Download] Error: {e}")
                try:
                    download.cancel()
                except:
                    pass

        profile.downloadRequested.connect(_on_download_requested)

        # 创建 WebEngine 视图（使用默认 profile）
        try:
            web_view = QWebEngineView(profile)
        except TypeError:
            # Fallback for PySide6 versions that don't accept profile in constructor
            web_view = QWebEngineView()
            page = QWebEnginePage(profile, web_view)
            web_view.setPage(page)

        # 创建支持拖拽的容器
        class WebContainer(QWidget):
            """支持拖拽的 Web 容器"""
            def __init__(self, child: QWidget, main_window=None):
                super().__init__(parent)
                self.setAcceptDrops(True)
                layout = QVBoxLayout(self)
                layout.setContentsMargins(0, 0, 0, 0)
                layout.addWidget(child)
                self._main_window = main_window
                self._is_dragging = False
                self._drag_position = None

            def mousePressEvent(self, event):
                # 如果有主窗口且是无边框模式，允许通过面板空白处拖拽
                if self._main_window and event.button() == Qt.LeftButton:
                    self._is_dragging = True
                    self._drag_position = event.globalPosition().toPoint() - self._main_window.frameGeometry().topLeft()
                    # 不 consume 事件，允许 webview 处理点击（如果它没处理，事件会冒泡）
                    # 但在这里我们是在 container 层，webview 是子控件
                    # 如果点击发生在 webview 上，web engine 会截获。
                    # 如果 web engine 也是透明的或穿透的，可能需要在这里处理。
                    # 通常 webview 会吃掉所有鼠标事件。
                    # 为了支持顶部标题栏拖拽，通常需要在 JS 端捕获 mousedown 并通知 Python，或者在 Python 端安装事件过滤器。
                    # 这里先尝试简单的事件处理，如果不行再用事件过滤器。
                    super().mousePressEvent(event)
                else:
                    super().mousePressEvent(event)

            def mouseMoveEvent(self, event):
                if self._is_dragging and event.buttons() & Qt.LeftButton:
                    if self._main_window:
                        self._main_window.move(event.globalPosition().toPoint() - self._drag_position)
                    event.accept()
                else:
                    super().mouseMoveEvent(event)

            def mouseReleaseEvent(self, event):
                self._is_dragging = False
                super().mouseReleaseEvent(event)

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
        container = WebContainer(web_view, window)
        container._profile = profile  # 生命周期
        if window is not None:
            window.setCentralWidget(container)

        # 创建并注册 API 对象
        api_parent = window if window is not None else container
        api = CherryStudioAPI(api_parent)

        # 注入后端服务地址（仅 v2 API 支持）
        if backend_url and hasattr(api, 'set_backend_url'):
            api.set_backend_url(backend_url)

        # ── 自定义 Page：过滤 JS console 噪音，只保留有意义的输出 ──────────────
        class _FilteredPage(QWebEnginePage):
            # 只要消息包含以下任意子串，就完全过滤（无论日志级别）
            _SUPPRESS_SUBSTRINGS = (
                # localStorage / 配置保存
                "localStorage.setItem called",
                "localStorage restored",
                "localStorage saved",
                "Config changed, saving",
                # [Qt Proxy] 内存 API 拦截（高频，无用）
                "[Qt Proxy]",
                # apiServer 心跳
                "apiServer.getStatus called",
                # ipcRenderer 日志转发（覆盖太广，已由后端记录）
                "ipcRenderer.invoke: app:log-to-main",
                # 初始化成功通知（只需看到一次）
                "fetchProxy monitor installed",
                "apiServer methods overridden successfully",
                "Agent API proxy installed",
                "Backend client ready",
                "早期脚本",
                "早期LoggerService修复",
                "memory.setConfig 拦截器",
                "DOMContentLoaded 事件已手动触发",
                "qt_bridge",
                # ProviderConfig / Config 覆盖
                "ProviderConfig",
                "[Config:",
                "[LoggerService]",
                # fetchProxy 响应详情（调试用，平时不需要）
                "fetchProxy response",
                # 重复的 MemoryService 配置警告（models 未定义，非致命）
                "Failed to update memory config: TypeError: Cannot use 'in' operator",
            )
            # 遇到以下关键词则强制输出（即使匹配了上面的过滤规则也不过滤）
            _FORCE_SHOW_KEYWORDS = (
                "WinError", "timed out", "Traceback", "Exception",
            )
            # info 级别额外要求包含以下关键词才输出
            _ALWAYS_SHOW_KEYWORDS = (
                "error", "Error", "failed", "Failed",
                "Backend", "backend", "MCP",
                "WinError", "timed out",
            )

            def javaScriptConsoleMessage(self, level, message, line_number, source_id):
                # 强制显示关键词（优先级最高）
                force = any(kw in message for kw in self._FORCE_SHOW_KEYWORDS)
                if not force:
                    # 子串过滤
                    for sub in self._SUPPRESS_SUBSTRINGS:
                        if sub in message:
                            return
                    # info 级别只在包含关键词时打印
                    if level == QWebEnginePage.JavaScriptConsoleMessageLevel.InfoMessageLevel:
                        if not any(kw in message for kw in self._ALWAYS_SHOW_KEYWORDS):
                            return
                print(f"js: {message}")

        page_parent = window if window is not None else container
        page = _FilteredPage(profile, page_parent)
        web_view.setPage(page)

        # ── WebEngine Settings（必须在 setPage 之后设置，否则会被替换掉）──────
        # setPage() 切换到 _FilteredPage 后，web_view.settings() 返回新 page 的 settings。
        # LocalContentCanAccessRemoteUrls=True 是关键：允许 file:// 页面通过
        # fetch() 访问 http://127.0.0.1:9876（后端服务），否则 Chromium 会拒绝请求。
        _settings = web_view.settings()
        _settings.setAttribute(QWebEngineSettings.WebAttribute.LocalStorageEnabled, True)
        _settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessFileUrls, True)
        _settings.setAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls, True)
        _settings.setAttribute(QWebEngineSettings.WebAttribute.AllowRunningInsecureContent, True)
        _settings.setAttribute(QWebEngineSettings.WebAttribute.JavascriptCanAccessClipboard, True)
        # 禁用 WebSecurity 以允许 file:// 加载 blob:file:// 等资源
        # 即使有 --disable-web-security 标志，Qt 内部设置也可能需要显式禁用
        try:
            # WebSecurityEnabled 属性可能在旧版本 PySide6 中不可用或名称不同，加 try-except
            _settings.setAttribute(QWebEngineSettings.WebAttribute.WebSecurityEnabled, False)
        except AttributeError:
            pass
        print(f"LocalStorageEnabled: {_settings.testAttribute(QWebEngineSettings.WebAttribute.LocalStorageEnabled)}")
        print(f"LocalContentCanAccessRemoteUrls: {_settings.testAttribute(QWebEngineSettings.WebAttribute.LocalContentCanAccessRemoteUrls)}")

        # ── 注册 CherryStudioAPI 到后端 Qt Bridge（替代 QWebChannel） ──────
        try:
            from ..backend.routes.qt_bridge import set_qt_api
            set_qt_api(api)
            print("[WindowManager] Qt API registered to backend qt_bridge")
        except Exception as e:
            print(f"[WindowManager] Failed to register Qt API to qt_bridge: {e}")

        # ─── Selection Service (划词助手) ─────────────────────────────────────
        try:
            from ..services.selection_service import SelectionService
            _sel_svc = SelectionService.instance()
            _sel_svc.set_backend_url(backend_url or "")
            _sel_svc.set_theme(theme)
            print("[WindowManager] SelectionService initialized (will start when enabled by user)")
        except Exception as _sel_err:
            print(f"[WindowManager] SelectionService init failed (non-fatal): {_sel_err}")

        # 安装事件过滤器以处理拖拽
        if window:
            class DragFilter(QObject):
                def __init__(self, target_window):
                    super().__init__()
                    self.window = target_window
                    self.dragging = False
                    self.drag_pos = None

                def eventFilter(self, obj, event):
                    # 拦截 WebEngineView 的鼠标事件
                    if obj == web_view: # or obj == web_view.focusProxy()
                        if event.type() == event.Type.MouseButtonPress:
                            if event.button() == Qt.LeftButton:
                                # 这里可以添加区域判断，例如只在顶部 30px 允许拖拽
                                # 但为了简单，假设前端会处理非拖拽区域的点击（例如按钮）
                                # 如果前端阻止了冒泡，这里可能收不到。
                                # 实际上，WebEngineView 作为一个胖客户端，通常会吃掉所有事件。
                                # 更可靠的方法是在 JS 端捕获 mousedown，如果是标题栏区域且不是交互元素，
                                # 则通过 channel 通知 Python 开始拖拽。
                                # 但为了快速实现，我们先试着在 Python 端做。
                                # 注意：如果点击了网页内的按钮，这里的拖拽逻辑可能会干扰。
                                # 因此，通常建议：
                                # 1. 前端实现拖拽区域（-webkit-app-region: drag）- 这在 Electron 中有效，但在 Qt WebEngine 中无效。
                                # 2. 前端 JS 监听 mousedown，判断是否在标题栏，调用 window.qt.api.startDrag()。
                                pass

                    return False

            # 使用 JS 通信方式实现拖拽（更可靠）
            # 我们需要在 API 中添加 startDrag 方法，并在前端标题栏 mousedown 时调用
            pass

        # 0.5 注入会话信息（backend_url、session_id），供前端直接使用
        _backend_url_escaped = (backend_url or "").replace("\\", "\\\\").replace('"', '\\"')
        _session_id_escaped = (session_id or "").replace('"', '\\"')
        session_inject_script = QWebEngineScript()
        session_inject_script.setName("cherry-session-info")
        session_inject_script.setSourceCode(f"""
// Cherry Studio 后端服务信息（由 Python 注入）
window.__CHERRY_BACKEND_URL = "{_backend_url_escaped}";
window.__CHERRY_SESSION_ID = "{_session_id_escaped}";
window.__CHERRY_API_V2 = true;
console.error('[Cherry] Backend URL:', window.__CHERRY_BACKEND_URL, 'Session:', window.__CHERRY_SESSION_ID);
""")
        session_inject_script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        session_inject_script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
        session_inject_script.setRunsOnSubFrames(False)

        # 1. 早期修复脚本
        early_fix_script = QWebEngineScript()
        early_fix_script.setName("early-logger-fix")
        early_fix_script.setSourceCode(get_early_logger_fix_script())
        early_fix_script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        early_fix_script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
        early_fix_script.setRunsOnSubFrames(False)

        # 2. 主 Electron API 脚本
        electron_api_script = QWebEngineScript()
        electron_api_script.setName("electron-api")
        electron_api_script.setSourceCode(get_electron_api_script(theme))
        electron_api_script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        electron_api_script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
        electron_api_script.setRunsOnSubFrames(False)

        # 3. Post-load 脚本（使用 DocumentReady 注入）
        post_load_script = QWebEngineScript()
        post_load_script.setName("post-load-fix")
        post_load_script.setSourceCode(get_post_load_fix_script())
        post_load_script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        post_load_script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentReady)
        post_load_script.setRunsOnSubFrames(False)

        if page:
            page.scripts().insert(session_inject_script)
            print(f"会话信息脚本已注入 (backend={backend_url}, session={session_id[:8] if session_id else 'none'}...)")
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

        if window is not None:
            window.windowTitleChanged.connect(on_title_changed)

        # 设置页面加载回调
        def on_load_finished(ok):
            if ok:
                print("页面加载完成")
                # print(f"当前窗口标题: {window.windowTitle()}")
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
        holder = window if window is not None else container
        holder._webview_ref = web_view
        holder._api_ref = api
        
        print("窗口创建成功" if window is not None else "组件创建成功")
        return window if window is not None else container
        
    except Exception as e:
        print(f"创建窗口失败: {e}")
        raise
