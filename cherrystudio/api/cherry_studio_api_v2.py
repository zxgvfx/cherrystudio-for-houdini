"""
Cherry Studio API (v2) - 薄代理层（DCC/Qt 侧）

职责边界（严格遵守）：
  ✅ 此层可以做：
     - Qt 窗口控制（minimize/maximize/drag）
     - 文件选择对话框（依赖 Qt）
     - 代理环境变量管理
     - 将其他所有请求转发给后端服务（HTTP 调用）

  ❌ 此层不做：
     - 启动 MCP 子进程（由后端 /api/v1/mcp/* 管理）
     - 直接执行 HTTP 网络请求（由后端 /api/v1/network/* 负责）
     - 文件系统读写（由后端 /api/v1/files/* 负责）
     - 知识库 / 配置 / Topic（全部转发给后端）

此层的唯一外部依赖：PySide6 + 标准库（可在 Houdini Python 中运行）
后端服务地址通过 set_backend_url() 注入（由 window_manager 在启动后调用）。
"""

import os
import sys
import json
import re
import socket
import threading
import uuid
import zipfile
import tarfile
import shutil
import tempfile
import subprocess
import time
from datetime import datetime, timezone
from typing import Optional
from pathlib import Path
from urllib import request as _urllib_request, error as _urllib_error
from urllib.parse import quote as _url_quote

from PySide6.QtCore import QObject, Slot

from ..version import APP_VERSION, APP_PLATFORM, APP_ARCH
from ..utils.logger import network_logger
from .agent_message_store import get_session_history, persist_exchange
from .agent_server import AgentServer
from .agent_runtime_manager import NodeAgentRuntime, is_node_available
from .agent_permission_bridge import PermissionBridge

_log = network_logger


# ─── 后端服务调用工具 ─────────────────────────────────────────────────────────

def _call_service(base_url: str, endpoint: str, body: dict = None,
                  method: str = None, timeout: float = 10) -> dict:
    """
    调用后端服务的 REST API。

    - GET 请求: method=None 且 body=None
    - POST 请求: body 不为 None 或 method="POST"
    - timeout: 等待后端响应的超时（秒）。
      注意：后端的同步 http-get/http-post 路由需要等待外部请求返回，
      因此 timeout 必须大于等于 body 中传递给后端的 timeout。
      默认 10s 仅适用于纯本地操作（如 set-proxy、health check）。

    使用无代理 opener 确保 localhost 请求不会被系统代理拦截。
    """
    if not base_url:
        return {"error": "backend service not available"}

    url = f"{base_url}{endpoint}"
    if body is not None or method == "POST":
        data = json.dumps(body or {}).encode("utf-8")
        req = _urllib_request.Request(url, data=data, method="POST")
        req.add_header("Content-Type", "application/json")
    else:
        req = _urllib_request.Request(url, method="GET")

    # 使用无代理 opener，确保 localhost 请求不经过系统代理
    _opener = _urllib_request.build_opener(_urllib_request.ProxyHandler({}))
    try:
        with _opener.open(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except _urllib_error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        try:
            return json.loads(err)
        except Exception:
            return {"error": err, "status": e.code}
    except Exception as e:
        return {"error": str(e)}


# ─── 注意 ────────────────────────────────────────────────────────────────────
# MCP 子进程管理已移至后端服务 (backend/routes/mcp.py)
# 此层通过 /api/v1/mcp/* 转发所有 MCP 操作，不在 Houdini 进程中启动任何子进程。
# ─────────────────────────────────────────────────────────────────────────────


# ─── 主 API 类 ─────────────────────────────────────────────────────────────────

class CherryStudioAPI(QObject):
    """
    Cherry Studio API v2 - 薄代理层

    Qt/DCC 特定操作（窗口控制、文件对话框等）在本类中处理。
    所有业务逻辑请求转发到后端服务。
    """

    _zoom_factor = 1.0
    _agent_server = None
    _agent_server_lock = threading.Lock()

    def __init__(self, parent=None):
        super().__init__(parent)
        self._backend_url: str = ""
        self._proxy_url: str = ""
        self._proxy_bypass_rules: str = ""
        self._hardcoded_proxy: bool = False
        self._apply_secure_proxy()
        self._IPC_API_ROUTES: dict = self._build_ipc_api_routes()

    # ── 后端服务注入 ─────────────────────────────────────────────────────────

    def set_backend_url(self, url: str):
        """由 window_manager 在后端服务启动后调用，注入服务地址"""
        self._backend_url = url
        _log(f"[CherryStudioAPI] Backend URL set: {url}")
        # _apply_secure_proxy() 在 __init__ 时 backend_url 还为空，未能发送到后端
        # 此处后端已就绪，补发代理配置
        if self._proxy_url or self._hardcoded_proxy:
            try:
                self._svc("/api/v1/network/set-proxy", {
                    "proxyUrl": self._proxy_url,
                    "bypassRules": self._proxy_bypass_rules,
                })
            except Exception as e:
                _log(f"[CherryStudioAPI] Failed to push proxy to backend: {e}")

    def _svc(self, endpoint: str, body: dict = None, method: str = None,
             timeout: float = 10) -> dict:
        """转发请求到后端服务的便捷方法"""
        return _call_service(self._backend_url, endpoint, body, method, timeout=timeout)

    def _svc_str(self, endpoint: str, body: dict = None, timeout: float = 10) -> str:
        """转发并将结果序列化为 JSON 字符串（与旧接口保持兼容）"""
        return json.dumps(self._svc(endpoint, body, timeout=timeout))

    # ── 安全代理初始化（仅同步给后端服务，不写 os.environ）─────────────────────

    def _apply_secure_proxy(self):
        try:
            try:
                from ..core.secure_config import get_secure_proxy, is_hardcoded_proxy_enabled
            except (ImportError, ValueError):
                return
            if is_hardcoded_proxy_enabled():
                config = get_secure_proxy()
                proxy_url = config.get("proxyUrl", "")
                if proxy_url:
                    self._hardcoded_proxy = True
                    self.setProxy(json.dumps({
                        "proxyUrl": proxy_url,
                        "bypassRules": config.get("bypassRules", ""),
                    }))
        except Exception:
            pass

    # =========================================================================
    # Qt 窗口控制（必须在 Qt 主线程处理，不能转发到服务）
    # =========================================================================

    @Slot(result=bool)
    def startDrag(self) -> bool:
        try:
            p = self._get_window()
            if p:
                handle = p.windowHandle()
                if handle:
                    return handle.startSystemMove()
        except Exception as e:
            _log(f"startDrag: {e}")
        return False

    @Slot(result=bool)
    def minimize(self) -> bool:
        try:
            p = self._get_window()
            if p:
                p.showMinimized()
                return True
        except Exception as e:
            _log(f"minimize: {e}")
        return False

    @Slot(result=bool)
    def maximize(self) -> bool:
        try:
            p = self._get_window()
            if p:
                if p.isMaximized():
                    p.showNormal()
                else:
                    p.showMaximized()
                return True
        except Exception as e:
            _log(f"maximize: {e}")
        return False

    @Slot(result=bool)
    def unmaximize(self) -> bool:
        try:
            p = self._get_window()
            if p:
                p.showNormal()
                return True
        except Exception as e:
            _log(f"unmaximize: {e}")
        return False

    @Slot(result=bool)
    def closeWindow(self) -> bool:
        try:
            p = self._get_window()
            if p:
                p.close()
                return True
        except Exception as e:
            _log(f"closeWindow: {e}")
        return False

    @Slot(int, int)
    def setMinimumSize(self, width: int, height: int):
        try:
            w = self._get_window()
            if w:
                w.setMinimumSize(int(width), int(height))
        except Exception as e:
            _log(f"setMinimumSize: {e}")

    @Slot()
    def resetMinimumSize(self):
        try:
            from PySide6.QtCore import QSize
            w = self._get_window()
            if w:
                w.setMinimumSize(QSize(0, 0))
        except Exception as e:
            _log(f"resetMinimumSize: {e}")

    def _get_window(self):
        """获取顶层窗口，兼容 QMainWindow 和 WebContainer"""
        p = self.parent()
        if p and hasattr(p, "metaObject") and p.metaObject().className() == "WebContainer":
            p = p.parent()
        return p

    # =========================================================================
    # 系统信息（轻量，本地处理）
    # =========================================================================

    @Slot(result=str)
    def getAppVersion(self) -> str:
        return APP_VERSION

    @Slot(result=str)
    def getPlatform(self) -> str:
        return APP_PLATFORM

    @Slot(result=str)
    def getArch(self) -> str:
        return APP_ARCH

    @Slot(result=str)
    def getLocale(self) -> str:
        return "zh-CN"

    @Slot(str, result=str)
    def getPath(self, name: str) -> str:
        return ""

    @Slot(result=str)
    def getAppInfo(self) -> str:
        current_file = os.path.abspath(__file__)
        cherrystudio_dir = os.path.dirname(os.path.dirname(current_file))
        resources_path = os.path.join(cherrystudio_dir, "resources").replace("\\", "/")
        files_path = self._get_app_data_dir().replace("\\", "/")
        return json.dumps({
            "version": APP_VERSION,
            "platform": APP_PLATFORM,
            "arch": APP_ARCH,
            "resourcesPath": resources_path,
            "filesPath": files_path,
            "isPackaged": False,
            "backendUrl": self._backend_url,  # 新增：前端可直接知道服务地址
        })

    @Slot(str, result=str)
    def getDiskInfo(self, path: str) -> str:
        try:
            import shutil
            total, used, free = shutil.disk_usage(path or os.path.expanduser("~"))
            return json.dumps({"total": total, "free": free, "used": used})
        except Exception:
            return json.dumps({"total": 1_000_000_000, "free": 500_000_000})

    @Slot(result=str)
    def getBackendUrl(self) -> str:
        """前端可调用此方法获取后端服务地址"""
        return self._backend_url

    # =========================================================================
    # 代理设置
    # 新架构下，DCC/Qt 进程自身不发起任何业务 HTTP 请求，
    # 代理配置只需同步给后端服务即可，绝对不能污染进程全局 os.environ，
    # 否则会影响同进程内的其他工具（ftrack、DaVinci 等）。
    # =========================================================================

    @Slot(str, result=bool)
    def setProxy(self, config_json: str) -> bool:
        try:
            # 硬编码代理模式下，拒绝前端覆盖（仅允许 _apply_secure_proxy 内部调用）
            if self._hardcoded_proxy:
                import inspect
                caller = inspect.stack()[1]
                if caller.function != "_apply_secure_proxy":
                    return True

            cfg = json.loads(config_json) if config_json else {}
            proxy_url = cfg.get("proxyUrl", "")
            bypass_rules = cfg.get("bypassRules", "")

            self._proxy_url = proxy_url
            self._proxy_bypass_rules = bypass_rules

            if self._backend_url:
                self._svc("/api/v1/network/set-proxy", {
                    "proxyUrl": proxy_url,
                    "bypassRules": bypass_rules,
                })
            return True
        except Exception as e:
            _log(f"setProxy: {e}")
            return False

    @Slot(result=str)
    def getProxy(self) -> str:
        if self._hardcoded_proxy:
            return json.dumps({"proxyUrl": "", "bypassRules": "", "_managed": True})
        return json.dumps({"proxyUrl": self._proxy_url, "bypassRules": self._proxy_bypass_rules})

    # =========================================================================
    # 日志（本地处理）
    # =========================================================================

    @Slot(str, result=bool)
    def logToMain(self, payload: str) -> bool:
        try:
            data = json.loads(payload) if payload else {}
            level = data.get("level", "info").upper()
            msg = data.get("message", "")
            _log(f"[Frontend/{level}] {msg}")
        except Exception:
            _log(f"[Frontend] {payload}")
        return True

    @Slot(str)
    def consoleLog(self, message: str) -> None:
        print(message)

    # =========================================================================
    # 缩放/主题/语言（轻量存根，本地处理）
    # =========================================================================

    @Slot(float, result=bool)
    def handleZoomFactor(self, factor: float) -> bool:
        self._zoom_factor = max(0.25, min(3.0, factor))
        return True

    @Slot(bool, result=bool)
    def setAutoUpdate(self, enabled: bool) -> bool:
        return True

    @Slot(str, result=str)
    def setLanguage(self, lang: str) -> str:
        return lang

    # =========================================================================
    # 文件 I/O（转发到后端服务）
    # =========================================================================

    @Slot(str, result=str)
    def fileRead(self, path: str) -> str:
        r = self._svc("/api/v1/files/read", {"path": path})
        return r.get("content") or ""

    @Slot(str, str, result=bool)
    def fileWrite(self, path: str, content: str) -> bool:
        r = self._svc("/api/v1/files/write", {"path": path, "content": content})
        return not r.get("error")

    @Slot(str, result=bool)
    def fileExists(self, path: str) -> bool:
        r = self._svc("/api/v1/files/exists", {"path": path})
        return bool(r.get("exists", False))

    @Slot(str, result=bool)
    def fileDelete(self, path: str) -> bool:
        r = self._svc("/api/v1/files/delete", {"path": path})
        return not r.get("error")

    @Slot(str, result=str)
    def fileList(self, path: str) -> str:
        r = self._svc("/api/v1/files/list", {"path": path})
        return json.dumps(r.get("files", []))

    @Slot(str, result=str)
    def getAppDataDir(self) -> str:
        return self._get_app_data_dir()

    @Slot(str, result=bool)
    def openPath(self, path: str) -> bool:
        """用系统默认程序打开文件/目录，直接调用 OS API，不走后端（避免阻塞主线程）"""
        try:
            import subprocess
            if sys.platform == "win32":
                os.startfile(path)  # noqa: S606
            elif sys.platform == "darwin":
                subprocess.Popen(["open", path])
            else:
                subprocess.Popen(["xdg-open", path])
            return True
        except Exception as e:
            _log(f"openPath: {e}")
            return False

    @Slot(str, result=bool)
    def openExternal(self, url: str) -> bool:
        """用系统默认浏览器打开 URL，直接调用 OS API，不走后端（避免阻塞主线程）"""
        try:
            import webbrowser
            webbrowser.open(url)
            return True
        except Exception as e:
            _log(f"openExternal: {e}")
            return False

    @Slot(str, result=bool)
    def openWebsite(self, url: str) -> bool:
        """openExternal 的别名，兼容前端 electron_injector 中 shell/api 的调用"""
        return self.openExternal(url)

    # ── 本地保留：需要 Qt 文件对话框 ──────────────────────────────────────────

    @Slot(str, result=str)
    def fileSelect(self, options: str) -> str:
        try:
            import uuid
            from datetime import datetime, timezone
            from PySide6.QtWidgets import QFileDialog, QApplication

            opts = json.loads(options) if options else {}
            app = QApplication.instance()
            if not app:
                return json.dumps([])
            parent = self.parent() or app.activeWindow()

            properties = opts.get("properties", [])
            is_directory = "openDirectory" in properties

            dialog = QFileDialog(parent, opts.get("title", "选择文件"))
            if is_directory:
                dialog.setFileMode(QFileDialog.FileMode.Directory)
            elif "multiSelections" in properties:
                dialog.setFileMode(QFileDialog.FileMode.ExistingFiles)
            else:
                dialog.setFileMode(QFileDialog.FileMode.ExistingFile)

            filters = opts.get("filters", [])
            if filters:
                qt_filters = []
                for f in filters:
                    name = f.get("name", "Files")
                    exts = f.get("extensions", ["*"])
                    patterns = " ".join(
                        f"*.{e}" if e != "*" else "*.*" for e in exts
                    )
                    qt_filters.append(f"{name} ({patterns})")
                dialog.setNameFilters(qt_filters)

            if not dialog.exec():
                return json.dumps(None)

            selected = dialog.selectedFiles()
            result = []
            for fp in selected:
                basename = os.path.basename(fp)
                _, ext = os.path.splitext(fp)
                try:
                    stat = os.stat(fp)
                    size = stat.st_size
                    created = datetime.fromtimestamp(
                        stat.st_ctime, tz=timezone.utc
                    ).isoformat()
                except OSError:
                    size = 0
                    created = datetime.now(tz=timezone.utc).isoformat()

                result.append({
                    "id": str(uuid.uuid4()),
                    "name": basename,
                    "origin_name": basename,
                    "path": fp,
                    "size": size,
                    "ext": ext.lower(),
                    "type": self._get_file_type(ext),
                    "created_at": created,
                    "count": 1,
                })
            return json.dumps(result)
        except Exception as e:
            _log(f"fileSelect: {e}")
            return json.dumps([])

    @Slot(str, result=bool)
    def isTextFile(self, file_path: str) -> bool:
        try:
            if not file_path:
                return False
            _, ext = os.path.splitext(file_path.lower())
            text_exts = {
                ".txt", ".md", ".json", ".js", ".ts", ".py", ".html", ".css",
                ".xml", ".yaml", ".yml", ".ini", ".cfg", ".log", ".csv", ".sh",
                ".bat", ".cpp", ".c", ".h", ".java", ".go", ".rs",
            }
            return ext in text_exts
        except Exception:
            return False

    # =========================================================================
    # 网络代理（转发到后端服务）
    # =========================================================================

    @Slot(str, result=str)
    def fetchProxy(self, config_json: str) -> str:
        """HTTP 请求代理，转发到后端服务处理。
        流式请求后端立即返回 requestId（无需长超时）；
        非流式请求后端同步等待外部响应，_call_service timeout = 请求 timeout + 5s 缓冲。"""
        try:
            config = json.loads(config_json) if config_json else {}
        except Exception:
            return json.dumps({"error": "invalid json"})
        is_stream = bool(config.get("stream", False))
        if is_stream:
            # 流式：后端仅启动后台线程并立即返回 requestId，10s 绰绰有余
            call_timeout = 10
        else:
            # 非流式：后端同步等待外部 HTTP 完成，需要更长超时
            raw = config.get("timeout", 30)
            try:
                body_timeout = int(raw) if int(raw) <= 300 else int(raw) // 1000
            except Exception:
                body_timeout = 30
            body_timeout = max(5, min(300, body_timeout))
            call_timeout = body_timeout + 5
        r = self._svc("/api/v1/network/fetch", config, timeout=call_timeout)
        return json.dumps(r)

    @Slot(str, result=str)
    def streamRead(self, request_id: str) -> str:
        """轮询流式响应数据块，从后端服务读取"""
        r = self._svc("/api/v1/network/stream-read", {"requestId": request_id})
        return json.dumps(r)

    @Slot(str, result=str)
    def httpProxyGet(self, request_json: str) -> str:
        """QWebChannel fallback，仅当直接后端路径不可用时使用。
        _call_service timeout = 后端自身的请求 timeout + 5s 缓冲，
        避免 Python 层比后端先超时而返回误导性的 'timed out' 错误。"""
        try:
            body = json.loads(request_json) if request_json else {}
        except Exception:
            return json.dumps({"success": False, "error": "invalid json"})
        # 确保 timeout 已统一为秒（前端可能传毫秒）
        raw = body.get("timeout", 30)
        svc_body_timeout = max(5, min(120, int(raw) if int(raw) <= 300 else int(raw) // 1000))
        body["timeout"] = svc_body_timeout
        # _call_service timeout 要略大于后端自己的请求 timeout，留 5s 缓冲
        call_timeout = svc_body_timeout + 5
        try:
            return json.dumps(_call_service(self._backend_url, "/api/v1/network/http-get",
                                            body, timeout=call_timeout))
        except Exception as e:
            return json.dumps({"success": False, "error": str(e)})

    @Slot(str, result=str)
    def httpProxyPost(self, request_json: str) -> str:
        """QWebChannel fallback，仅当直接后端路径不可用时使用。"""
        try:
            body = json.loads(request_json) if request_json else {}
        except Exception:
            return json.dumps({"success": False, "error": "invalid json"})
        raw = body.get("timeout", 30)
        svc_body_timeout = max(5, min(120, int(raw) if int(raw) <= 300 else int(raw) // 1000))
        body["timeout"] = svc_body_timeout
        call_timeout = svc_body_timeout + 5
        try:
            return json.dumps(_call_service(self._backend_url, "/api/v1/network/http-post",
                                            body, timeout=call_timeout))
        except Exception as e:
            return json.dumps({"success": False, "error": str(e)})

    # =========================================================================
    # Topic 持久化（转发到后端服务）
    # =========================================================================

    @Slot(str, str, result=bool)
    def topicSave(self, topic_id: str, data: str) -> bool:
        try:
            payload = json.loads(data) if data else data
        except Exception:
            payload = data
        r = self._svc("/api/v1/topics/save", {"topicId": topic_id, "data": payload})
        return not r.get("error")

    @Slot(str, result=str)
    def topicLoad(self, topic_id: str) -> str:
        r = self._svc("/api/v1/topics/load", {"topicId": topic_id})
        d = r.get("data")
        if d is None:
            return ""
        return d if isinstance(d, str) else json.dumps(d)

    @Slot(str, result=bool)
    def topicDelete(self, topic_id: str) -> bool:
        r = self._svc("/api/v1/topics/delete", {"topicId": topic_id})
        return not r.get("error")

    @Slot(result=str)
    def topicList(self) -> str:
        r = self._svc("/api/v1/topics/list", method="GET")
        return json.dumps(r.get("topics", []))

    # =========================================================================
    # 知识库（转发到后端服务）
    # =========================================================================

    @Slot(str, result=str)
    def knowledgeBaseCreate(self, payload_json: str) -> str:
        return self._svc_str("/api/v1/kb/create", json.loads(payload_json))

    @Slot(str, result=str)
    def knowledgeBaseAdd(self, payload_json: str) -> str:
        return self._svc_str("/api/v1/kb/add", json.loads(payload_json))

    @Slot(str, result=str)
    def knowledgeBaseSearch(self, payload_json: str) -> str:
        return self._svc_str("/api/v1/kb/search", json.loads(payload_json))

    @Slot(result=str)
    def knowledgeBaseList(self) -> str:
        return json.dumps(self._svc("/api/v1/kb/list", method="GET"))

    @Slot(str, result=bool)
    def knowledgeBaseDelete(self, kb_id: str) -> bool:
        r = self._svc("/api/v1/kb/delete", {"kbId": kb_id})
        return bool(r.get("ok", False))

    @Slot(str, result=str)
    def knowledgeBaseRemove(self, payload_json: str) -> str:
        return self._svc_str("/api/v1/kb/remove", json.loads(payload_json))

    @Slot(str, result=str)
    def knowledgeBaseRerank(self, payload_json: str) -> str:
        return self._svc_str("/api/v1/kb/rerank", json.loads(payload_json))

    @Slot(str, result=str)
    def knowledgeBaseReset(self, payload_json: str) -> str:
        return self._svc_str("/api/v1/kb/reset", json.loads(payload_json))

    @Slot(str, result=str)
    def knowledgeBaseCheckQuota(self, payload_json: str) -> str:
        return self._svc_str("/api/v1/kb/check-quota", json.loads(payload_json))

    # =========================================================================
    # 配置管理（转发到后端服务）
    # =========================================================================

    @Slot(result=str)
    def configGetMergedConfig(self) -> str:
        return json.dumps(self._svc("/api/v1/config/merged", method="GET"))

    @Slot(result=str)
    def configReload(self) -> str:
        return json.dumps(self._svc("/api/v1/config/reload", method="POST"))

    @Slot(str, result=str)
    def configUpdateUserModels(self, models_json: str) -> str:
        models = json.loads(models_json) if models_json else []
        return json.dumps(self._svc("/api/v1/config/update-models", {"models": models}))

    @Slot(str, result=str)
    def configUpdateUserMcpServers(self, servers_json: str) -> str:
        servers = json.loads(servers_json) if servers_json else []
        return json.dumps(self._svc("/api/v1/config/update-mcp-servers", {"servers": servers}))

    # =========================================================================
    # Agent API Proxy（转发到后端服务）
    # =========================================================================

    @Slot(str, result=str)
    def agentApiProxy(self, request_json: str) -> str:
        try:
            req = json.loads(request_json) if request_json else {}
        except Exception:
            return json.dumps({"error": "invalid json"})
        return json.dumps(self._svc("/api/v1/agent/proxy", req))

    @Slot(result=bool)
    def startAgentServer(self) -> bool:
        r = self._svc("/api/v1/agent/start", method="POST")
        return bool(r.get("ok", False))

    @Slot(result=str)
    def getAgentServerPort(self) -> str:
        r = self._svc("/api/v1/agent/status", method="GET")
        return json.dumps(r)

    @Slot(str, result=str)
    def readFileAsBase64(self, file_path: str) -> str:
        """读取任意本地文件并以 base64 返回（用于 Phase 4 Skills 的
        ``installFromZip``：浏览器端只有一个本地路径，没有 ``File`` 对象，
        需要 Python 直接读盘再转发给 sidecar）。

        返回 JSON：``{"base64": "..."}`` 或 ``{"error": "..."}"``。
        """
        try:
            if not file_path or not os.path.isfile(file_path):
                return json.dumps({"error": f"File not found: {file_path}"})
            import base64
            with open(file_path, 'rb') as f:
                raw_data = f.read()
            return json.dumps({"base64": base64.b64encode(raw_data).decode('utf-8')})
        except Exception as e:
            _log(f"[readFileAsBase64] Error reading {file_path}: {e}")
            return json.dumps({"error": str(e)})

    # =========================================================================
    # MCP 管理（全部转发给后端服务）
    # 第三方 MCP 子进程在后端 Python 环境中运行，与 Houdini 进程隔离。
    # =========================================================================

    @Slot(str, result=str)
    def mcpStartServer(self, config_json: str) -> str:
        """启动第三方 MCP 服务器（委托给后端进程）"""
        try:
            config = json.loads(config_json) if config_json else {}
        except Exception:
            return json.dumps({"error": "invalid json"})
        _log(f"[CherryStudioAPI] mcpStartServer: {config.get('id', '?')} type={config.get('type', '?')}")
        return self._svc_str("/api/v1/mcp/start", config, timeout=120)

    @Slot(str, result=str)
    def mcpStopServer(self, config_json: str) -> str:
        """停止 MCP 服务器，接受 server config JSON 或 server id 字符串"""
        try:
            data = json.loads(config_json) if config_json else {}
            if not isinstance(data, dict):
                data = {"id": str(data)}
        except Exception:
            data = {"id": config_json}
        r = self._svc("/api/v1/mcp/stop", data, timeout=10)
        return json.dumps(r)

    @Slot(str, result=str)
    def mcpRemoveServer(self, config_json: str) -> str:
        """移除 MCP 服务器（停止 + 注销），等同于 stop"""
        try:
            data = json.loads(config_json) if config_json else {}
            if not isinstance(data, dict):
                data = {"id": str(data)}
        except Exception:
            data = {"id": config_json}
        r = self._svc("/api/v1/mcp/remove", data, timeout=10)
        return json.dumps(r)

    @Slot(str, result=str)
    def mcpRestartServer(self, config_json: str) -> str:
        """重启 MCP 服务器，需要完整 server config"""
        try:
            config = json.loads(config_json) if config_json else {}
        except Exception:
            return json.dumps({"error": "invalid json"})
        _log(f"[CherryStudioAPI] mcpRestartServer: {config.get('id', '?')}")
        return self._svc_str("/api/v1/mcp/restart", config, timeout=60)

    # MCP list-tools 工具列表缓存（server_id → result_json）
    # 只缓存成功的列表结果，不缓存错误，保证重试时可以刷新
    _mcp_list_cache: dict = {}
    _mcp_list_cache_lock = threading.Lock()

    @Slot(str, result=str)
    def mcpListTools(self, server_json: str) -> str:
        """
        列出 MCP 服务器的工具（非阻塞版）。

        策略：
         1. 若缓存中已有成功结果，立即返回缓存（通常 < 1ms）
         2. 否则，在后台线程执行实际请求（后端可能需要初始化子进程）
         3. 主线程最多等待 _MCP_LIST_MAX_WAIT 秒（默认 8s）
         4. 超时则返回"正在初始化"错误，让 Cherry Studio 显示提示而非卡死
         5. 后台线程继续运行并缓存结果，用户重试时立即返回
        """
        _MCP_LIST_MAX_WAIT = 8.0  # 主线程最长等待秒数，超过此值返回"初始化中"错误

        try:
            data = json.loads(server_json) if server_json else {}
            if not isinstance(data, dict):
                data = {"id": str(data)}
        except Exception:
            data = {"id": server_json}

        server_id = data.get("id") or data.get("serverId") or "?"
        _log(f"[CherryStudioAPI] mcpListTools: {server_id} type={data.get('type', '?')}")

        # ── 命中缓存直接返回 ───────────────────────────────────────────────────
        with self._mcp_list_cache_lock:
            cached = self._mcp_list_cache.get(server_id)
        if cached:
            return cached

        # ── 后台线程执行后端调用 ───────────────────────────────────────────────
        result_holder: list = [None]
        done_event = threading.Event()

        def _worker():
            try:
                r = self._svc_str("/api/v1/mcp/list-tools", data, timeout=120)
                result_holder[0] = r
                # 只缓存成功的工具列表（JSON array）
                try:
                    parsed = json.loads(r)
                    if isinstance(parsed, list) and parsed:
                        with self._mcp_list_cache_lock:
                            self._mcp_list_cache[server_id] = r
                except Exception:
                    pass
            except Exception as e:
                result_holder[0] = json.dumps({"error": str(e)})
            finally:
                done_event.set()

        t = threading.Thread(target=_worker, daemon=True, name=f"mcp-list-{server_id[:10]}")
        t.start()

        # ── 等待结果，超时则返回"初始化中"提示 ──────────────────────────────────
        if done_event.wait(timeout=_MCP_LIST_MAX_WAIT):
            return result_holder[0] or json.dumps({"error": "no result"})

        return json.dumps({
            "error": (
                f"MCP 服务器 '{server_id}' 仍在初始化中。"
                "首次运行 uvx/npx 需要下载软件包，可能需要 1-2 分钟。"
                "请稍等后在 MCP 设置页面重新启用该服务器。"
            )
        })

    @Slot(str, result=str)
    def mcpCallTool(self, call_json: str) -> str:
        """调用 MCP 工具，支持 Cherry Studio 格式 { server, name, args } 和旧格式"""
        try:
            call = json.loads(call_json) if call_json else {}
        except Exception:
            return json.dumps({"error": "invalid json"})
        _log(f"[CherryStudioAPI] mcpCallTool: {call.get('name', '?')}")
        return self._svc_str("/api/v1/mcp/call", call, timeout=90)

    @Slot(str, result=str)
    def mcpCheckMcpConnectivity(self, config_json: str) -> str:
        """检查 MCP 服务器的连通性"""
        try:
            data = json.loads(config_json) if config_json else {}
            if not isinstance(data, dict):
                data = {"id": str(data)}
        except Exception:
            data = {"id": config_json}
        _log(f"[CherryStudioAPI] mcpCheckConnectivity: {data.get('id', '?')}")
        r = self._svc("/api/v1/mcp/check-connectivity", data, timeout=30)
        return json.dumps(r)

    @Slot(str, result=str)
    def mcpGetServerVersion(self, config_json: str) -> str:
        """获取 MCP 服务器版本（通过 list-tools 探测连通性后返回固定格式）"""
        try:
            data = json.loads(config_json) if config_json else {}
        except Exception:
            return json.dumps({"version": "unknown"})
        r = self._svc("/api/v1/mcp/check-connectivity", data)
        if r.get("ok"):
            return json.dumps({"version": "1.0.0", "status": r.get("status", "running")})
        return json.dumps({"version": "unknown", "error": r.get("error", "")})

    @Slot(result=str)
    def mcpListServers(self) -> str:
        r = self._svc("/api/v1/mcp/list", method="GET")
        return json.dumps(list(r.get("servers", {}).keys()))

    @Slot(str, result=str)
    def mcpCallDCC(self, call_json: str) -> str:
        """调用 DCC 侧（Houdini 内部）的 MCP 工具，经由后端路由转发"""
        try:
            call = json.loads(call_json) if call_json else {}
        except Exception:
            return json.dumps({"error": "invalid json"})
        return self._svc_str("/api/v1/mcp/call-dcc", call)

    @staticmethod
    def _sync_dir_impl(src: "Path", dst: "Path"):
        """增量同步：将 src 下缺失或更新的文件/子目录复制到 dst"""
        dst.mkdir(parents=True, exist_ok=True)
        for item in src.iterdir():
            target = dst / item.name
            if item.is_dir():
                CherryStudioAPI._sync_dir_impl(item, target)
            elif item.is_file():
                if not target.exists() or item.stat().st_mtime > target.stat().st_mtime:
                    import shutil as _shutil
                    _shutil.copy2(str(item), str(target))

    @Slot(result=str)
    def mcpGetInstallInfo(self) -> str:
        """
        获取 MCP 安装信息，返回 uv、bun 的路径和安装目录。
        - 优先检查 CHERRY_STUDIO_BIN_DIR 环境变量
        - 其次使用 ~/.cherrystudio/bin
        - 若本地目录不存在，尝试从 J 盘公共目录复制（仅复制一次，避免重复卡顿）
        返回格式（与原版保持兼容）：{ "dir": str, "uvPath": str, "bunPath": str }
        """
        try:
            import shutil as _shutil
            from pathlib import Path

            from ..core.paths import get_bin_dir
            local_bin_dir = Path(get_bin_dir())
            j_bin_dir = Path("J:/vfxtools/piplineTD/models/packages/bin")

            # 从 J 盘同步到本地（增量：只复制缺失或更新的文件/子目录）
            if j_bin_dir.exists():
                try:
                    local_bin_dir.parent.mkdir(parents=True, exist_ok=True)
                    self._sync_dir_impl(j_bin_dir, local_bin_dir)
                    _log(f"[mcpGetInstallInfo] 同步完成: {j_bin_dir} -> {local_bin_dir}")
                except Exception as _ce:
                    _log(f"[mcpGetInstallInfo] 同步失败: {_ce}")

            # 确定实际 bin 目录
            env_bin = os.environ.get("CHERRY_STUDIO_BIN_DIR")
            if env_bin:
                bin_dir = Path(env_bin)
            elif local_bin_dir.exists():
                bin_dir = local_bin_dir
            else:
                bin_dir = j_bin_dir

            _ext = ".exe" if os.name == "nt" else ""

            def _find(name: str) -> str:
                # 优先 bin_dir
                p = bin_dir / f"{name}{_ext}"
                if p.exists() and p.is_file():
                    return str(p)
                # 其次 PATH
                found = _shutil.which(name)
                return found or ""

            uv_path = _find("uv")
            bun_path = _find("bun")

            result = {
                "dir": str(bin_dir),
                "uvPath": uv_path,
                "bunPath": bun_path,
            }
            _log(f"[mcpGetInstallInfo] {result}")
            return json.dumps(result)
        except Exception as e:
            _log(f"[mcpGetInstallInfo] error: {e}")
            return json.dumps({"dir": "", "uvPath": "", "bunPath": ""})

    @Slot(str, result=bool)
    def isBinaryExist(self, binary: str) -> bool:
        """
        检查二进制是否存在，优先检查 ~/.cherrystudio/bin，
        找到后将其目录注入 os.environ["PATH"]（供 MCP 子进程继承）。
        """
        from shutil import which

        from ..core.paths import get_bin_dir
        bin_dir = Path(get_bin_dir())
        ext = ".exe" if os.name == "nt" else ""
        local = bin_dir / f"{binary}{ext}"
        if local.exists() and local.is_file():
            if os.name != "nt" and not os.access(str(local), os.X_OK):
                pass  # 不可执行，跳过
            else:
                bin_str = str(bin_dir)
                if bin_str not in os.environ.get("PATH", ""):
                    os.environ["PATH"] = bin_str + os.pathsep + os.environ.get("PATH", "")
                return True

        found = which(binary)
        if found:
            found_dir = os.path.dirname(found)
            if found_dir not in os.environ.get("PATH", ""):
                os.environ["PATH"] = found_dir + os.pathsep + os.environ.get("PATH", "")
            return True
        return False

    # =========================================================================
    # Qt 特定操作（依赖 PySide6，不能放入后端进程）
    # =========================================================================

    @Slot(result=bool)
    def isFullScreen(self) -> bool:
        return False

    @Slot(result=str)
    def getDataPathFromArgs(self) -> str:
        return ""

    @Slot(result=str)
    def selectFolder(self) -> str:
        """显示文件夹选择对话框（需要 Qt 主线程）"""
        try:
            from PySide6.QtWidgets import QFileDialog, QApplication
            app = QApplication.instance()
            if not app:
                return ""
            parent = self.parent() or app.activeWindow()
            folder = QFileDialog.getExistingDirectory(
                parent, "选择文件夹", "",
                QFileDialog.Option.ShowDirsOnly | QFileDialog.Option.DontResolveSymlinks,
            )
            return folder or ""
        except Exception as e:
            _log(f"[selectFolder] {e}")
            return ""

    @Slot(str, str, result=str)
    def saveImage(self, name: str, data: str) -> str:
        """另存为图片（需要 Qt 文件对话框）"""
        try:
            import base64
            from PySide6.QtWidgets import QFileDialog, QApplication
            parent = self.parent() or (QApplication.instance() and QApplication.instance().activeWindow())
            file_path, _ = QFileDialog.getSaveFileName(
                parent, "保存图片", f"{name}.png", "PNG 图片 (*.png)"
            )
            if not file_path:
                return json.dumps({"success": False, "reason": "cancelled"})
            b64 = data.split(",", 1)[1] if data.startswith("data:") else data
            with open(file_path, "wb") as f:
                f.write(base64.b64decode(b64))
            return json.dumps({"success": True, "path": file_path})
        except Exception as e:
            _log(f"[saveImage] {e}")
            return json.dumps({"error": str(e)})

    # ── CodeTools ──────────────────────────────────────────────────────────────

    @Slot(result=str)
    def codeToolsGetAvailableTerminals(self) -> str:
        """获取可用终端列表"""
        terminals = []
        if sys.platform == "win32":
            terminals.append({"id": "cmd", "name": "Command Prompt"})
            terminals.append({"id": "powershell", "name": "PowerShell"})
            try:
                subprocess.run(["where", "wt"], stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE, check=True)
                terminals.append({"id": "windows-terminal", "name": "Windows Terminal"})
            except Exception:
                pass
        elif sys.platform == "darwin":
            terminals.append({"id": "terminal", "name": "Terminal",
                               "bundleId": "com.apple.Terminal"})
            terminals.append({"id": "iterm2", "name": "iTerm2",
                               "bundleId": "com.googlecode.iterm2"})
            terminals.append({"id": "warp", "name": "Warp",
                               "bundleId": "dev.warp.Warp-Stable"})
        return json.dumps(terminals)

    @Slot(str, str, str, str, str, result=str)
    def codeToolsRun(self, tool: str, model: str, directory: str,
                     env_json: str, options_json: str) -> str:
        """在新终端窗口中运行代码工具（claude-code/gemini-cli 等）"""
        try:
            env = json.loads(env_json) if env_json else {}
            options = json.loads(options_json) if options_json else {}
            terminal_id = options.get("terminal", "cmd")
            auto_update = options.get("autoUpdateToLatest", False)

            from ..core.paths import get_bin_dir
            bin_dir = Path(get_bin_dir())
            bun_path = bin_dir / ("bun.exe" if sys.platform == "win32" else "bun")

            tool_packages = {
                "claude-code": "@anthropic-ai/claude-code",
                "gemini-cli": "@google/gemini-cli",
                "openai-codex": "@openai/codex",
                "qwen-code": "@qwen-code/qwen-code",
                "kimi-cli": "kimi-cli",
            }
            tool_executables = {
                "claude-code": "claude", "gemini-cli": "gemini",
                "openai-codex": "codex", "qwen-code": "qwen", "kimi-cli": "kimi",
            }
            package_name = tool_packages.get(tool, tool)
            executable_name = tool_executables.get(tool, tool)
            executable_path = bin_dir / (executable_name + (".exe" if sys.platform == "win32" else ""))
            is_installed = executable_path.exists()

            if tool == "kimi-cli":
                uv_path = bin_dir / ("uv.exe" if sys.platform == "win32" else "uv")
                base_command = f'"{uv_path}" tool run {package_name}'
            elif not is_installed:
                registry_url = (env.get("NPM_CONFIG_REGISTRY") or
                                "https://registry.npmmirror.com").rstrip("/") + "/"
                base_command = (
                    f'echo "Installing {package_name}..." && '
                    f'set "BUN_INSTALL={cherry_dir}" && '
                    f'"{bun_path}" install -g {package_name} --registry={registry_url} && '
                    f'"{executable_path}"'
                )
            else:
                update_cmd = ""
                if auto_update:
                    registry_url = (env.get("NPM_CONFIG_REGISTRY") or
                                    "https://registry.npmmirror.com").rstrip("/") + "/"
                    update_cmd = (
                        f'set "BUN_INSTALL={cherry_dir}" && '
                        f'"{bun_path}" install -g {package_name} --registry={registry_url} && '
                    )
                base_command = f'{update_cmd}"{executable_path}"'

            if sys.platform == "win32":
                temp_dir = Path(tempfile.gettempdir()) / "cherrystudio"
                temp_dir.mkdir(parents=True, exist_ok=True)
                ts = int(time.time() * 1000)
                is_ps = terminal_id in ("powershell", "windows-terminal")
                if is_ps:
                    script_file = temp_dir / f"launch_{tool}_{ts}.ps1"
                    env_block = "\n".join(
                        f'$env:{k} = "{str(v).replace(chr(34), "`" + chr(34))}"'
                        for k, v in env.items()
                    )
                    ps_cmd = base_command.replace('"', '& "').lstrip("& ")
                    content = (
                        f'$OutputEncoding=[Console]::OutputEncoding=[Text.Encoding]::UTF8\n'
                        f'$Host.UI.RawUI.WindowTitle="{tool} - Cherry Studio"\n'
                        f'Set-Location -Path "{directory}" -ErrorAction Stop\n'
                        f'Clear-Host\n{env_block}\n{ps_cmd}\n'
                        f'Write-Host ""\nWrite-Host "完成，按任意键关闭..."\n'
                        f'$null=$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")\n'
                    )
                    script_file.write_text(content, encoding="utf-8")
                    cmd = (["wt", "-d", directory, "powershell", "-ExecutionPolicy", "Bypass",
                             "-File", str(script_file)]
                           if terminal_id == "windows-terminal"
                           else ["start", "powershell", "-ExecutionPolicy", "Bypass",
                                 "-File", str(script_file)])
                else:
                    script_file = temp_dir / f"launch_{tool}_{ts}.bat"
                    env_block = "\n".join(f'set "{k}={v}"' for k, v in env.items())
                    content = (
                        f'@echo off\nchcp 65001 >nul\ntitle {tool} - Cherry Studio\n'
                        f'cd /d "{directory}" || (echo ERROR & pause & exit /b 1)\n'
                        f'cls\n{env_block}\n{base_command}\n'
                        f'echo.\necho 完成，按任意键关闭...\npause >nul\n'
                    )
                    script_file.write_text(content, encoding="utf-8")
                    cmd = ["start", "cmd", "/c", str(script_file)]
                subprocess.Popen(cmd, shell=True)
                return json.dumps({"success": True, "message": f"Launched {tool}",
                                   "command": str(script_file)})
            return json.dumps({"success": False,
                                "message": "macOS/Linux not yet implemented", "command": ""})
        except Exception as e:
            _log(f"[codeToolsRun] {e}")
            return json.dumps({"success": False, "message": str(e), "command": ""})

    @Slot(str, str, result=bool)
    def codeToolsSetCustomTerminalPath(self, terminal_id: str, path: str) -> bool:
        return True

    @Slot(str, result=str)
    def codeToolsGetCustomTerminalPath(self, terminal_id: str) -> str:
        return ""

    @Slot(str, result=bool)
    def codeToolsRemoveCustomTerminalPath(self, terminal_id: str) -> bool:
        return True

    # ── GitBash ────────────────────────────────────────────────────────────────

    def _get_git_bash_config_path(self) -> str:
        return os.path.join(self._get_app_data_dir(), "git_bash_config.json")

    def _find_executable(self, name: str) -> Optional[str]:
        from shutil import which
        found = which(f"{name}.exe" if os.name == "nt" else name)
        return found if found and os.path.exists(found) else None

    def _validate_git_bash_path(self, bash_path: Optional[str]) -> Optional[str]:
        if not bash_path:
            return None
        resolved = os.path.abspath(bash_path)
        if not os.path.exists(resolved):
            return None
        if os.name == "nt" and not resolved.lower().endswith("bash.exe"):
            return None
        return resolved

    def _find_git_bash(self) -> Optional[str]:
        if os.name != "nt":
            return None
        env_path = os.environ.get("CLAUDE_CODE_GIT_BASH_PATH")
        if env_path:
            v = self._validate_git_bash_path(env_path)
            if v:
                return v
        git = self._find_executable("git")
        if git:
            git_dir = os.path.dirname(git)
            for rel in (r"..\..\bin\bash.exe", r"..\bash.exe", r"..\..\usr\bin\bash.exe"):
                p = os.path.abspath(os.path.join(git_dir, rel))
                if os.path.exists(p):
                    return p
        for base_env in ("ProgramFiles", "ProgramFiles(x86)", "LOCALAPPDATA"):
            base = os.environ.get(base_env, "")
            if base:
                p = os.path.join(base, "Git", "bin", "bash.exe")
                if os.path.exists(p):
                    return p
        return None

    @Slot(result=str)
    def getGitBashPathInfo(self) -> str:
        try:
            if os.name != "nt":
                return json.dumps({"path": None, "source": None})
            cfg = self._get_git_bash_config_path()
            if os.path.exists(cfg):
                with open(cfg, "r", encoding="utf-8") as f:
                    manual = json.load(f).get("path")
                if manual and os.path.exists(manual):
                    return json.dumps({"path": manual, "source": "manual"})
            path = self._find_git_bash()
            return json.dumps({"path": path, "source": "auto" if path else None})
        except Exception as e:
            _log(f"[getGitBashPathInfo] {e}")
            return json.dumps({"path": None, "source": None})

    @Slot(str, result=bool)
    def setGitBashPath(self, path: str) -> bool:
        try:
            cfg = self._get_git_bash_config_path()
            if not path:
                if os.path.exists(cfg):
                    os.remove(cfg)
                return True
            if not os.path.exists(path):
                return False
            os.makedirs(os.path.dirname(cfg), exist_ok=True)
            with open(cfg, "w", encoding="utf-8") as f:
                json.dump({"path": path}, f)
            return True
        except Exception as e:
            _log(f"[setGitBashPath] {e}")
            return False

    # ── API Server 管理（进程内 AgentServer，Qt 层管理）─────────────────────────

    def _get_api_server_config(self) -> dict:
        try:
            storage = os.path.join(self._get_app_data_dir(), "localStorage.json")
            if not os.path.exists(storage):
                return {"host": "127.0.0.1", "port": 0, "apiKey": "default-key", "enabled": False}
            with open(storage, "r", encoding="utf-8") as f:
                data = json.load(f)
            cfg = data.get("apiServer", {})
            if isinstance(cfg, str):
                cfg = json.loads(cfg)
            return {
                "host": cfg.get("host", "127.0.0.1"),
                "port": cfg.get("port", 0),
                "apiKey": cfg.get("apiKey", "default-key"),
                "enabled": cfg.get("enabled", False),
            }
        except Exception:
            return {"host": "127.0.0.1", "port": 0, "apiKey": "default-key", "enabled": False}

    def _load_providers_from_localstorage(self) -> list:
        try:
            storage = os.path.join(self._get_app_data_dir(), "localStorage.json")
            if not os.path.exists(storage):
                return []
            with open(storage, "r", encoding="utf-8") as f:
                data = json.load(f)
            providers = data.get("providers", "[]")
            if isinstance(providers, str):
                providers = json.loads(providers)
            return [p for p in providers if isinstance(p, dict) and p.get("apiKey")]
        except Exception:
            return []

    def _create_agent_backend(self):
        """创建 Agent 后端实例。

        优先使用真实的 ``@anthropic-ai/claude-agent-sdk`` Node.js sidecar
        (``agent_runtime_manager.NodeAgentRuntime``)，在工具执行/权限/Skills
        发现等方面与桌面版官方 Agent 行为对齐；如果当前环境没有可用的
        Node.js(``is_node_available()`` 为 False)，则回退到纯 Python 重新
        实现的 ``AgentServer``，保证在没有 Node 环境时 Agent 功能依然可用。

        两者都实现相同的 ``start/stop/is_running/get_port`` 接口，因此
        ``apiServerStart/Restart/agentApiProxy`` 等调用方无需关心具体实现。
        """
        config = self._get_api_server_config()
        api_key = config.get("apiKey") or ""
        if is_node_available():
            _log("[AgentBackend] Using Node.js agent-runtime sidecar (real claude-agent-sdk)")
            return NodeAgentRuntime(providers_loader=self._load_providers_from_localstorage, api_key=api_key)
        _log("[AgentBackend] Node.js not found, falling back to legacy Python AgentServer")
        return AgentServer(providers_loader=self._load_providers_from_localstorage)

    def _start_permission_bridge_if_needed(self):
        """Phase 3：仅 Node sidecar 暴露 `/v1/agent-permission-events`，
        因此只在当前后端是 ``NodeAgentRuntime`` 时启动权限审批桥接。
        """
        if not isinstance(CherryStudioAPI._agent_server, NodeAgentRuntime):
            return
        try:
            PermissionBridge.instance().start(
                get_port=lambda: (CherryStudioAPI._agent_server.get_port() if CherryStudioAPI._agent_server else 0),
                get_api_key=lambda: (self._get_api_server_config().get('apiKey') or ''),
            )
        except Exception as e:
            _log(f"[AgentBackend] Failed to start PermissionBridge: {e}")

    def _stop_permission_bridge(self):
        try:
            PermissionBridge.instance().stop()
        except Exception as e:
            _log(f"[AgentBackend] Failed to stop PermissionBridge: {e}")

    @Slot(result=str)
    def apiServerStatus(self) -> str:
        try:
            config = self._get_api_server_config()
            with CherryStudioAPI._agent_server_lock:
                srv = CherryStudioAPI._agent_server
                if srv and srv.is_running():
                    config["port"] = srv.get_port()
                    return json.dumps({"running": True, "config": config})
            return json.dumps({"running": False, "config": None})
        except Exception as e:
            _log(f"[apiServerStatus] {e}")
            return json.dumps({"running": False, "config": None})

    @Slot(str, result=str)
    def apiServerConfigure(self, config: str) -> str:
        return '{"success": true}'

    @Slot(result=str)
    def apiServerStart(self) -> str:
        try:
            with CherryStudioAPI._agent_server_lock:
                srv = CherryStudioAPI._agent_server
                if srv and srv.is_running():
                    return json.dumps({"running": True, "port": srv.get_port(),
                                       "url": f"http://127.0.0.1:{srv.get_port()}", "error": None})
                # 创建并启动服务器（优先 Node sidecar，否则回退纯 Python 实现）
                CherryStudioAPI._agent_server = self._create_agent_backend()
                success, port = CherryStudioAPI._agent_server.start(host="127.0.0.1", port=0)
                if success:
                    # 同步设置后端路由的全局引用，供 agentApiProxy 使用
                    from ..backend.routes.agent import set_agent_server
                    api_key = self._get_api_server_config().get('apiKey') or ''
                    set_agent_server(CherryStudioAPI._agent_server, api_key=api_key)
                    _log(f"[apiServerStart] AgentServer started on port {port}, set_agent_server called")
                    self._start_permission_bridge_if_needed()
                    return json.dumps({"running": True, "port": port,
                                       "url": f"http://127.0.0.1:{port}", "error": None})
                return json.dumps({"running": False, "port": 0, "url": "",
                                   "error": "start returned False"})
        except Exception as e:
            _log(f"[apiServerStart] {e}")
            return json.dumps({"running": False, "port": 0, "url": "", "error": str(e)})

    @Slot(result=str)
    def apiServerStop(self) -> str:
        try:
            with CherryStudioAPI._agent_server_lock:
                self._stop_permission_bridge()
                if CherryStudioAPI._agent_server:
                    CherryStudioAPI._agent_server.stop()
                    CherryStudioAPI._agent_server = None
                    try:
                        from ..backend.routes.agent import set_agent_server
                        set_agent_server(None)
                    except Exception:
                        pass
            return json.dumps({"running": False, "port": 0, "url": "", "error": None})
        except Exception as e:
            _log(f"[apiServerStop] {e}")
            return json.dumps({"running": False, "error": str(e)})

    @Slot(result=str)
    def apiServerRestart(self) -> str:
        self.apiServerStop()
        return self.apiServerStart()

    @Slot(str, result=str)
    def apiServerToggle(self, payload: str) -> str:
        with CherryStudioAPI._agent_server_lock:
            srv = CherryStudioAPI._agent_server
        if srv and srv.is_running():
            return self.apiServerStop()
        return self.apiServerStart()

    # ── 简单存根（必须返回兼容格式）────────────────────────────────────────────

    @Slot(str, result=str)
    def agentMessageGetHistory(self, payload: str) -> str:
        try:
            body = json.loads(payload) if payload else {}
            return json.dumps(get_session_history(str(body.get("sessionId", "") or "")), ensure_ascii=False)
        except Exception as e:
            _log(f"[agentMessageGetHistory] {e}")
            return "[]"

    @Slot(str, result=bool)
    def agentMessagePersistExchange(self, payload: str) -> bool:
        try:
            body = json.loads(payload) if payload else {}
            return persist_exchange(body)
        except Exception as e:
            _log(f"[agentMessagePersistExchange] {e}")
            return False

    @Slot(result=str)
    def getInstallInfo(self) -> str:
        return json.dumps({"installed": True, "version": APP_VERSION})

    @Slot(result=str)
    def getUsersList(self) -> str:
        return "[]"

    @Slot(result=str)
    def list(self) -> str:
        return "[]"

    @Slot(str, result=bool)
    def setConfig(self, config: str) -> bool:
        return True

    @Slot(str, result=bool)
    def modelsSetConfig(self, config: str) -> bool:
        return True

    @Slot(result=str)
    def getVaults(self) -> str:
        return "[]"

    @Slot(str, result=str)
    def openWindow(self, config: str) -> str:
        return "false"

    @Slot(str, result=str)
    def generateSignature(self, data: str) -> str:
        return "null"

    @Slot(str, result=str)
    def saveData(self, data: str) -> str:
        return "false"

    # =========================================================================
    # 代理到后端的方法（业务逻辑在 backend/routes/ 中）
    # =========================================================================

    # ── 文件操作代理 ───────────────────────────────────────────────────────────

    @Slot(str, result=str)
    def fileUpload(self, file_metadata_json: str) -> str:
        try:
            body = json.loads(file_metadata_json) if file_metadata_json else {}
        except Exception:
            body = {}
        return self._svc_str("/api/v1/files/upload", body)

    @Slot(str, result=str)
    def binaryImage(self, fileId: str) -> str:
        result = self._svc("/api/v1/files/binary-image", {"fileId": fileId})
        if result and not result.get("error"):
            return json.dumps(result)
        return "null"

    @Slot(str, result=str)
    def saveBase64Image(self, base64_data: str) -> str:
        return self._svc_str("/api/v1/files/save-base64-image", {"data": base64_data})

    @Slot(str, str, result=str)
    def savePastedImage(self, image_data: str, extension: str = ".png") -> str:
        return self._svc_str("/api/v1/files/save-pasted-image",
                             {"data": image_data, "ext": extension})

    @Slot(str, str, result=bool)
    def fileWriteWithId(self, file_id: str, content: str) -> bool:
        result = self._svc("/api/v1/files/write-with-id",
                           {"fileId": file_id, "content": content})
        return not result.get("error")

    # ── 知识库代理 ─────────────────────────────────────────────────────────────

    @Slot(result=str)
    def kbScan(self) -> str:
        return self._svc_str("/api/v1/kb/scan", {})

    @Slot(str, result=bool)
    def kbSaveMetadata(self, kb_json: str) -> bool:
        try:
            body = json.loads(kb_json) if kb_json else {}
        except Exception:
            body = {}
        result = self._svc("/api/v1/kb/save-metadata", body)
        return not result.get("error")

    @Slot(result=str)
    def kbSyncFromCentral(self) -> str:
        return self._svc_str("/api/v1/kb/sync-from-central", {})

    # ── MCP 补充存根代理 ───────────────────────────────────────────────────────

    @Slot(str, result=str)
    def mcpServerStatus(self, server: str) -> str:
        try:
            body = json.loads(server) if server else {}
        except Exception:
            body = {"id": server}
        return self._svc_str("/api/v1/mcp/status", body)

    @Slot(str, result=str)
    def mcpListPrompts(self, server: str) -> str:
        try:
            body = json.loads(server) if server else {}
        except Exception:
            body = {"id": server}
        return self._svc_str("/api/v1/mcp/list-prompts", body)

    @Slot(str, result=str)
    def mcpListResources(self, server: str) -> str:
        try:
            body = json.loads(server) if server else {}
        except Exception:
            body = {"id": server}
        return self._svc_str("/api/v1/mcp/list-resources", body)

    # ── 二进制安装代理 ─────────────────────────────────────────────────────────

    @Slot(result=bool)
    def installBunBinary(self) -> bool:
        result = self._svc("/api/v1/files/install-bun", {}, timeout=120)
        return bool(result.get("ok"))

    @Slot(result=bool)
    def installUVBinary(self) -> bool:
        result = self._svc("/api/v1/files/install-uv", {}, timeout=120)
        return bool(result.get("ok"))

    # ── 模型代理 ───────────────────────────────────────────────────────────────

    @Slot(str, result=str)
    def modelsList(self, config: str) -> str:
        try:
            cfg = json.loads(config) if config else {}
        except Exception:
            cfg = {}
        if cfg.get("provider") == "ollama" or "ollama" in str(cfg).lower():
            return self._svc_str("/api/v1/models/ollama-list",
                                 {"host": cfg.get("host", "http://localhost:11434")})
        if cfg.get("url"):
            return self._svc_str("/api/v1/models/list", cfg)
        return '{"data": [], "total": 0}'

    @Slot(str, result=str)
    def ollamaListModels(self, options_json: str) -> str:
        try:
            opts = json.loads(options_json) if options_json else {}
        except Exception:
            opts = {}
        return self._svc_str("/api/v1/models/ollama-list", opts)

    @Slot(str, result=str)
    def ollamaPullModel(self, options_json: str) -> str:
        try:
            opts = json.loads(options_json) if options_json else {}
        except Exception:
            opts = {}
        return self._svc_str("/api/v1/models/ollama-pull", opts, timeout=1860)

    @Slot(str, result=str)
    def modelList(self, config_json: str) -> str:
        try:
            cfg = json.loads(config_json) if config_json else {}
        except Exception:
            cfg = {}
        return self._svc_str("/api/v1/models/list", cfg)

    # ── 记忆代理 ───────────────────────────────────────────────────────────────

    @Slot(str, result=str)
    def memoryList(self, config: str) -> str:
        return self._svc_str("/api/v1/memory/list", {})

    @Slot(str, result=str)
    def memoryAdd(self, payload: str) -> str:
        try:
            body = json.loads(payload) if payload else {}
        except Exception:
            body = {}
        return self._svc_str("/api/v1/memory/add", body)

    @Slot(str, result=str)
    def memorySearch(self, payload: str) -> str:
        try:
            body = json.loads(payload) if payload else {}
        except Exception:
            body = {}
        return self._svc_str("/api/v1/memory/search", body)

    @Slot(str, result=str)
    def memoryDelete(self, id: str) -> str:
        return self._svc_str("/api/v1/memory/delete", {"id": id})

    @Slot(str, result=str)
    def memoryUpdate(self, payload: str) -> str:
        try:
            body = json.loads(payload) if payload else {}
        except Exception:
            body = {}
        return self._svc_str("/api/v1/memory/update", body)

    @Slot(str, result=str)
    def memoryGet(self, id: str) -> str:
        return self._svc_str("/api/v1/memory/get", {"id": id})

    @Slot(str, result=str)
    def memoryDeleteAllMemoriesForUser(self, userId: str) -> str:
        return self._svc_str("/api/v1/memory/delete-all-for-user", {"userId": userId})

    @Slot(str, result=str)
    def memoryDeleteUser(self, userId: str) -> str:
        return self._svc_str("/api/v1/memory/delete-user", {"userId": userId})

    @Slot(result=str)
    def memoryGetUsersList(self) -> str:
        return self._svc_str("/api/v1/memory/get-users-list", {})

    @Slot(str, result=str)
    def memorySetConfig(self, config: str) -> str:
        try:
            body = json.loads(config) if config else {}
        except Exception:
            body = {}
        result = self._svc("/api/v1/memory/set-config", body)
        return "true" if result is True or result.get("ok") else "false"

    # ── Agent Server 代理（同时更新进程内实例）────────────────────────────────

    @Slot(result=str)
    def startAgentServer(self) -> str:
        return self.apiServerStart()

    @Slot(result=str)
    def getAgentServerPort(self) -> str:
        return self._svc_str("/api/v1/agent/status")

    # =========================================================================
    # 存根方法
    # =========================================================================

    @Slot(result=str)
    def getTheme(self) -> str:
        return "dark"

    @Slot(str, result=bool)
    def setTheme(self, theme: str) -> bool:
        return True

    @Slot(result=str)
    def getSystemInfo(self) -> str:
        return json.dumps({"os": sys.platform, "version": APP_VERSION})

    @Slot(str, result=str)
    def shellExec(self, cmd_json: str) -> str:
        return json.dumps({"error": "not implemented in thin client"})

    # =========================================================================
    # Cherry Studio v2.0 window.api 桥接层
    #
    # v2.0 把渲染进程能力面收敛到一个稳定的 `window.api` 形状（见
    # web/src/preload/preload.ts）。以下方法都是它们在 Houdini/Qt 侧的
    # Python 实现，通过 electron_injector.py 里重写的 window.api 转发到这里。
    # 尚未移植的复杂领域功能（webdav/S3 备份、Copilot、Nutstore、局域网传输等）
    # 先返回明确的"不支持"结果，而不是让渲染进程挂起等待一个永远不会到来的响应。
    # =========================================================================

    # ── Preference Store（对应 v2.0 PreferenceService）──────────────────────
    # 持久化到 <app_data_dir>/preferences.json，进程内用一份内存缓存 + 锁。

    _preference_lock = threading.Lock()
    _preference_cache: Optional[dict] = None

    def _preference_file_path(self) -> str:
        return os.path.join(self._get_app_data_dir(), "preferences.json")

    def _load_preferences(self) -> dict:
        if CherryStudioAPI._preference_cache is not None:
            return CherryStudioAPI._preference_cache
        data = {}
        try:
            path = self._preference_file_path()
            if os.path.isfile(path):
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f) or {}
        except Exception as e:
            _log(f"[preference] load error: {e}")
            data = {}
        CherryStudioAPI._preference_cache = data
        return data

    def _save_preferences(self, data: dict):
        try:
            path = self._preference_file_path()
            tmp = path + ".tmp"
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False)
            os.replace(tmp, path)
        except Exception as e:
            _log(f"[preference] save error: {e}")

    @Slot(str, result=str)
    def preferenceGet(self, key: str) -> str:
        with CherryStudioAPI._preference_lock:
            return json.dumps(self._load_preferences().get(key))

    @Slot(str, str, result=bool)
    def preferenceSet(self, key: str, value_json: str) -> bool:
        try:
            value = json.loads(value_json) if value_json is not None else None
        except Exception:
            value = value_json
        with CherryStudioAPI._preference_lock:
            data = self._load_preferences()
            data[key] = value
            self._save_preferences(data)
            CherryStudioAPI._preference_cache = data
        return True

    @Slot(str, result=str)
    def preferenceGetMultipleRaw(self, keys_json: str) -> str:
        try:
            keys = json.loads(keys_json) if keys_json else []
        except Exception:
            keys = []
        with CherryStudioAPI._preference_lock:
            data = self._load_preferences()
            return json.dumps({k: data.get(k) for k in keys})

    @Slot(str, result=bool)
    def preferenceSetMultiple(self, updates_json: str) -> bool:
        try:
            updates = json.loads(updates_json) if updates_json else {}
        except Exception:
            updates = {}
        with CherryStudioAPI._preference_lock:
            data = self._load_preferences()
            data.update(updates)
            self._save_preferences(data)
            CherryStudioAPI._preference_cache = data
        return True

    @Slot(result=str)
    def preferenceGetAll(self) -> str:
        with CherryStudioAPI._preference_lock:
            return json.dumps(self._load_preferences())

    # ── Skills 市场（复用 agent-runtime sidecar 的 /v1/skills REST 接口）──────

    @Slot(str, str, result=str)
    def skillReadFile(self, skill_id: str, filename: str) -> str:
        try:
            encoded_path = "/".join(_url_quote(part, safe="") for part in str(filename).split("/"))
            resp_json = self.agentApiProxy(json.dumps({
                "method": "GET",
                "path": f"/v1/skills/{_url_quote(str(skill_id), safe='')}/files/{encoded_path}",
            }))
            resp = json.loads(resp_json) if resp_json else {}
            if isinstance(resp, dict) and resp.get("error"):
                return json.dumps({"success": False, "error": resp.get("error")})
            text = resp.get("data") if isinstance(resp, dict) else resp
            if not isinstance(text, str):
                text = json.dumps(text, ensure_ascii=False)
            return json.dumps({"success": True, "data": text})
        except Exception as e:
            return json.dumps({"success": False, "error": str(e)})

    @Slot(str, result=str)
    def skillListFiles(self, skill_id: str) -> str:
        try:
            resp_json = self.agentApiProxy(json.dumps({
                "method": "GET",
                "path": f"/v1/skills/{_url_quote(str(skill_id), safe='')}/files",
            }))
            resp = json.loads(resp_json) if resp_json else {}
            if isinstance(resp, dict) and resp.get("error"):
                return json.dumps({"success": False, "error": resp.get("error")})
            rel_paths = resp.get("data", []) if isinstance(resp, dict) else []
            nodes = [{"name": p.rsplit("/", 1)[-1], "path": p, "type": "file"} for p in rel_paths]
            return json.dumps({"success": True, "data": nodes})
        except Exception as e:
            return json.dumps({"success": False, "error": str(e)})

    # ── IpcApi / DataApi 通用路由分发（v2.0 统一 RPC 通道）───────────────────
    #
    # `ipcApiRequest`/`dataApiRequest` 是 v2.0 渲染进程与主进程之间的两条通用 RPC
    # 通道（详见 web/src/preload/ipc.ts、web/src/shared/data/api/types.ts）。
    # Houdini 版没有真正的 Electron 主进程，这里用一张 route -> 处理函数 的表
    # 在 Python 侧模拟同样的契约。已接入的域：
    #   - config.*        中心化配置 / NewAPI 计费查询（转发到既有 backend 路由）
    #   - ai.agent.*       Agent CRUD + 定时任务命令（适配到 agent-runtime sidecar）
    # 尚未接入的域（text/embedding/image/stream/tool/translate 等）仍走结构化
    # "未实现" 错误，等待后续阶段。

    def _build_ipc_api_routes(self) -> dict:
        """route -> callable(input) -> Any。返回值会被包成 {"ok": true, "data": ...}；
        抛异常会被包成 {"ok": false, "error": {code: "INTERNAL", message}}。
        """
        return {
            # ── 中心化配置 / NewAPI（fork 独有能力，v2.0 官方没有对应路由，
            #    这里沿用 v1.9.12 fork 自己的 window.api.config.* 命名）──────────
            "config.getMergedConfig": lambda _input: self._svc("/api/v1/config/merged", method="GET"),
            "config.reload": lambda _input: self._svc("/api/v1/config/reload", method="POST"),
            "config.updateUserModels": lambda input_data: self._svc(
                "/api/v1/config/update-models", {"models": (input_data or {}).get("models", []) if isinstance(input_data, dict) else (input_data or [])}
            ),
            "config.updateUserMcpServers": lambda input_data: self._svc(
                "/api/v1/config/update-mcp-servers",
                {"servers": (input_data or {}).get("servers", []) if isinstance(input_data, dict) else (input_data or [])},
            ),
            "config.getLastRequestCost": lambda input_data: self._svc("/api/v1/newapi/last-cost", input_data or {}),
            "config.getAccountSummary": lambda input_data: self._svc("/api/v1/newapi/account-summary", input_data or {}),
            # ── Agent CRUD（创建是 mixed-effect 命令，落在 IpcApi 上）───────────
            "ai.agent.create": self._ipc_agent_create,
            # ── Agent 定时任务命令（AgentJobsService 的对应物）──────────────────
            "ai.agent.task.create": self._ipc_agent_task_create,
            "ai.agent.task.update": self._ipc_agent_task_update,
            "ai.agent.task.pause": self._ipc_agent_task_pause,
            "ai.agent.task.resume": self._ipc_agent_task_resume,
            "ai.agent.task.delete": self._ipc_agent_task_delete,
            "ai.agent.task.run": self._ipc_agent_task_run,
        }

    @Slot(str, str, result=str)
    def ipcApiRequest(self, route: str, input_json: str) -> str:
        try:
            input_data = json.loads(input_json) if input_json else None
        except Exception:
            input_data = None
        handler = self._IPC_API_ROUTES.get(route)
        if handler is None:
            return json.dumps({
                "ok": False,
                "error": {
                    "code": "ROUTE_NOT_FOUND",
                    "message": f"Unknown IpcApi route (not yet ported to Houdini runtime): {route}",
                },
            })
        try:
            return json.dumps({"ok": True, "data": handler(input_data)})
        except Exception as e:
            return json.dumps({"ok": False, "error": {"code": "INTERNAL", "message": str(e)}})

    #: (HTTP method, path 正则, 处理函数名, 传给处理函数的参数种类列表)。
    #: 参数种类："params" = 从正则命名分组提取的路径参数字典；
    #: "query" = DataRequest.params（v2.0 里这个字段名指的是查询参数，不是路径参数）；
    #: "body" = DataRequest.body。
    _DATA_API_PATTERNS = [
        ("GET", re.compile(r"^/agents$"), "_data_agents_list", ["query"]),
        ("GET", re.compile(r"^/agents/(?P<agentId>[^/]+)$"), "_data_agent_get", ["params"]),
        ("PATCH", re.compile(r"^/agents/(?P<agentId>[^/]+)$"), "_data_agent_patch", ["params", "body"]),
        ("DELETE", re.compile(r"^/agents/(?P<agentId>[^/]+)$"), "_data_agent_delete", ["params", "query"]),
        ("GET", re.compile(r"^/agent-tasks$"), "_data_agent_tasks_list_all", ["query"]),
        ("GET", re.compile(r"^/agent-tasks/(?P<taskId>[^/]+)$"), "_data_agent_task_get_by_id", ["params"]),
        ("GET", re.compile(r"^/agents/(?P<agentId>[^/]+)/tasks$"), "_data_agent_tasks_list_for_agent", ["params", "query"]),
        ("GET", re.compile(r"^/agents/(?P<agentId>[^/]+)/tasks/(?P<taskId>[^/]+)$"), "_data_agent_task_get_by_id", ["params"]),
        (
            "GET",
            re.compile(r"^/agents/(?P<agentId>[^/]+)/tasks/(?P<taskId>[^/]+)/logs$"),
            "_data_agent_task_logs",
            ["params", "query"],
        ),
    ]

    @Slot(str, result=str)
    def dataApiRequest(self, request_json: str) -> str:
        try:
            req = json.loads(request_json) if request_json else {}
        except Exception:
            req = {}
        method = (req.get("method") or "GET").upper()
        path = req.get("path", "") or ""
        # DataRequest.params 在 v2.0 里表示查询参数（见 DataApiService.ts），不是路径参数；
        # 路径参数是从 path 本身用正则解析出来的。
        query = req.get("params") or {}
        body = req.get("body")
        req_id = req.get("id", "")

        for pat_method, pattern, handler_name, arg_kinds in self._DATA_API_PATTERNS:
            if pat_method != method:
                continue
            m = pattern.match(path)
            if not m:
                continue
            try:
                path_params = m.groupdict()
                args = []
                for kind in arg_kinds:
                    if kind == "params":
                        args.append(path_params)
                    elif kind == "query":
                        args.append(query)
                    elif kind == "body":
                        args.append(body)
                data = getattr(self, handler_name)(*args)
                return json.dumps({
                    "id": req_id,
                    "status": 200,
                    "data": data,
                    "metadata": {"duration": 0, "timestamp": int(time.time() * 1000)},
                })
            except Exception as e:
                return json.dumps({
                    "id": req_id,
                    "status": 500,
                    "error": {"code": "INTERNAL", "message": str(e), "status": 500},
                    "metadata": {"duration": 0, "timestamp": int(time.time() * 1000)},
                })

        return json.dumps({
            "id": req_id,
            "status": 404,
            "error": {
                "code": "NOT_FOUND",
                "message": f"DataApi route not yet ported to Houdini runtime: {method} {path}",
                "status": 404,
            },
            "metadata": {"duration": 0, "timestamp": int(time.time() * 1000)},
        })

    # ── Agent / Task 适配层：把 v2.0 的 ai.agent.* / dataApi(/agents, /agent-tasks)
    # 契约翻译成 agent-runtime sidecar 的 REST 形状（snake_case、扁平 schedule_type/
    # schedule_value），反之亦然。已知的有损/简化点：
    #   - `disabledTools`（v2.0 的工具黑名单）与 sidecar 的 `allowed_tools`（白名单）
    #     语义相反，暂不接入运行时鉴权，只是原样存进 configuration._disabledTools
    #     里保证往返不丢数据；`knowledgeBaseIds` 同理存进 _knowledgeBaseIds。
    #   - Task 的 `workspace` 字段 sidecar 没有对应列，统一固定为 {"type": "system"}
    #     （sidecar 任务始终跑在 agent.accessible_paths[0] 下）。
    #   - Cron trigger 的 `timezone`/`limit` sidecar 的 5 段 cron 解析器不支持，写入时丢弃。

    def _agent_call(self, method: str, path: str, body: dict = None) -> dict:
        """通过 agentApiProxy 转发到 agent-runtime sidecar，并把 sendError() 的
        错误体统一转换成异常抛出（成功时直接返回解析后的 JSON dict）。
        """
        resp_json = self.agentApiProxy(json.dumps({"method": method, "path": path, "body": body}))
        try:
            resp = json.loads(resp_json) if resp_json else {}
        except Exception:
            resp = {}
        if isinstance(resp, dict) and resp.get("error") is not None:
            err = resp["error"]
            msg = err.get("message") if isinstance(err, dict) else str(err)
            raise RuntimeError(msg or "agent-runtime 请求失败")
        return resp if isinstance(resp, dict) else {}

    @staticmethod
    def _trigger_to_schedule(trigger: dict) -> tuple:
        trigger = trigger or {}
        kind = trigger.get("kind")
        if kind == "interval":
            ms = trigger.get("ms") or 60000
            minutes = max(1, round(ms / 60000))
            return "interval", str(minutes)
        if kind == "cron":
            return "cron", trigger.get("expr") or "* * * * *"
        if kind == "once":
            at_ms = trigger.get("at") or 0
            iso = datetime.fromtimestamp(at_ms / 1000, tz=timezone.utc).isoformat()
            return "once", iso
        raise ValueError(f"unsupported trigger kind: {kind!r}")

    @staticmethod
    def _schedule_to_trigger(schedule_type: str, schedule_value: str) -> dict:
        if schedule_type == "interval":
            try:
                minutes = float(schedule_value)
            except (TypeError, ValueError):
                minutes = 30
            return {"kind": "interval", "ms": int(minutes * 60000)}
        if schedule_type == "cron":
            return {"kind": "cron", "expr": schedule_value or "* * * * *"}
        if schedule_type == "once":
            at_ms = 0
            try:
                dt = datetime.fromisoformat(str(schedule_value or "").replace("Z", "+00:00"))
                at_ms = int(dt.timestamp() * 1000)
            except ValueError:
                pass
            return {"kind": "once", "at": at_ms}
        return {"kind": "interval", "ms": 30 * 60000}

    @staticmethod
    def _agent_row_to_entity(row: dict) -> dict:
        row = row or {}
        config = dict(row.get("configuration") or {})
        disabled_tools = config.pop("_disabledTools", None) or []
        knowledge_base_ids = config.pop("_knowledgeBaseIds", None) or []
        slash_commands = row.get("slash_commands") or []
        if slash_commands and "slash_commands" not in config:
            config["slash_commands"] = slash_commands
        created_at = row.get("created_at") or ""
        entity = {
            "id": row.get("id", ""),
            "type": "claude-code",
            "name": row.get("name") or "",
            "model": row.get("model"),
            "modelName": None,
            "mcps": row.get("mcps") or [],
            "knowledgeBaseIds": knowledge_base_ids,
            "disabledTools": disabled_tools,
            "configuration": config,
            "createdAt": created_at,
            "updatedAt": row.get("updated_at") or created_at,
            "orderKey": str(row.get("sort_order", 0)),
        }
        if row.get("description"):
            entity["description"] = row["description"]
        if row.get("instructions"):
            entity["instructions"] = row["instructions"]
        if row.get("plan_model"):
            entity["planModel"] = row["plan_model"]
        if row.get("small_model"):
            entity["smallModel"] = row["small_model"]
        return entity

    @staticmethod
    def _agent_form_to_sidecar_body(form: dict) -> dict:
        """`ai.agent.create` 的 CreateAgentCommand -> sidecar POST /v1/agents body。"""
        form = form or {}
        config = dict(form.get("configuration") or {})
        disabled_tools = form.get("disabledTools") or []
        knowledge_base_ids = form.get("knowledgeBaseIds") or []
        if disabled_tools:
            config["_disabledTools"] = disabled_tools
        if knowledge_base_ids:
            config["_knowledgeBaseIds"] = knowledge_base_ids
        slash_commands = config.pop("slash_commands", None) or []
        return {
            "type": "claude-code",
            "name": form.get("name"),
            "description": form.get("description"),
            "instructions": form.get("instructions"),
            "model": form.get("model"),
            "plan_model": form.get("planModel"),
            "small_model": form.get("smallModel"),
            "mcps": form.get("mcps") or [],
            "slash_commands": slash_commands,
            "configuration": config,
        }

    @staticmethod
    def _agent_patch_to_sidecar_body(patch: dict) -> dict:
        """`UpdateAgentDto`（全字段可选）-> sidecar PATCH /v1/agents/:id body。
        只放入 patch 里真正出现过的字段，未出现的字段保持 sidecar 原值不变。
        """
        patch = patch or {}
        body = {}
        if "name" in patch:
            body["name"] = patch["name"]
        if "description" in patch:
            body["description"] = patch["description"]
        if "instructions" in patch:
            body["instructions"] = patch["instructions"]
        if "model" in patch:
            body["model"] = patch["model"]
        if "planModel" in patch:
            body["plan_model"] = patch["planModel"]
        if "smallModel" in patch:
            body["small_model"] = patch["smallModel"]
        if "mcps" in patch:
            body["mcps"] = patch.get("mcps") or []
        if "configuration" in patch or "disabledTools" in patch or "knowledgeBaseIds" in patch:
            config_patch = dict(patch.get("configuration") or {})
            if "disabledTools" in patch:
                config_patch["_disabledTools"] = patch.get("disabledTools") or []
            if "knowledgeBaseIds" in patch:
                config_patch["_knowledgeBaseIds"] = patch.get("knowledgeBaseIds") or []
            if "slash_commands" in config_patch:
                body["slash_commands"] = config_patch.pop("slash_commands") or []
            body["configuration"] = config_patch
        return body

    @staticmethod
    def _task_row_to_entity(row: dict) -> dict:
        row = row or {}
        trigger = CherryStudioAPI._schedule_to_trigger(row.get("schedule_type"), row.get("schedule_value"))
        reuse = bool(row.get("reuse_session"))
        status = row.get("status") or "active"
        if status not in ("active", "paused", "completed"):
            status = "active"
        created_at = row.get("created_at") or ""
        return {
            "id": row.get("id", ""),
            "agentId": row.get("agent_id", ""),
            "name": row.get("name") or "",
            "prompt": row.get("prompt") or "",
            "trigger": trigger,
            "timeoutMinutes": row.get("timeout_minutes") if row.get("timeout_minutes") is not None else 2,
            # sidecar 任务没有独立的 workspace 选择，始终跑在 agent 的 accessible_paths 下。
            "workspace": {"type": "system"},
            "reuseSession": reuse,
            "reuseSessionId": row.get("session_id") if reuse else None,
            "channelIds": row.get("channel_ids") or [],
            "nextRun": row.get("next_run"),
            "lastRun": row.get("last_run"),
            "enabled": status == "active",
            "status": status,
            "createdAt": created_at,
            "updatedAt": row.get("updated_at") or created_at,
        }

    @staticmethod
    def _tasklog_row_to_entity(row: dict) -> dict:
        row = row or {}
        status_map = {"success": "completed", "error": "failed"}
        return {
            "id": str(row.get("id", "")),
            "scheduleId": str(row.get("task_id", "")),
            "sessionId": row.get("session_id"),
            "startedAt": row.get("run_at") or "",
            "durationMs": row.get("duration_ms") or 0,
            "status": status_map.get(row.get("status"), "completed"),
            "result": row.get("result"),
            "error": row.get("error"),
        }

    @staticmethod
    def _task_form_to_sidecar_body(form: dict, agent_id: str = None) -> dict:
        """`AgentTaskForm`/`AgentTaskPatch` -> sidecar task body。只写入表单里
        真正出现的字段，patch 场景下未出现的字段保持 sidecar 原值不变。
        """
        form = form or {}
        body = {}
        if agent_id:
            body["agent_id"] = agent_id
        if "name" in form:
            body["name"] = form.get("name")
        if "prompt" in form:
            body["prompt"] = form.get("prompt")
        if form.get("trigger"):
            schedule_type, schedule_value = CherryStudioAPI._trigger_to_schedule(form["trigger"])
            body["schedule_type"] = schedule_type
            body["schedule_value"] = schedule_value
        if "timeoutMinutes" in form:
            body["timeout_minutes"] = form.get("timeoutMinutes") or 2
        if "reuseSession" in form:
            body["reuse_session"] = bool(form.get("reuseSession"))
        if "channelIds" in form:
            body["channel_ids"] = form.get("channelIds") or []
        return body

    # ── ai.agent.* IpcApi 命令处理函数 ───────────────────────────────────────

    def _ipc_agent_create(self, input_data):
        body = self._agent_form_to_sidecar_body(input_data or {})
        if not body.get("name") or not body.get("model"):
            raise ValueError("name and model are required")
        resp = self._agent_call("POST", "/v1/agents", body)
        return self._agent_row_to_entity(resp)

    def _ipc_agent_task_create(self, input_data):
        input_data = input_data or {}
        agent_id = input_data.get("agentId")
        if not agent_id:
            raise ValueError("agentId is required")
        body = self._task_form_to_sidecar_body(input_data, agent_id=agent_id)
        if not body.get("name") or not body.get("prompt") or not body.get("schedule_type"):
            raise ValueError("name, prompt and trigger are required")
        resp = self._agent_call("POST", "/v1/tasks", body)
        return self._task_row_to_entity(resp)

    def _ipc_agent_task_update(self, input_data):
        input_data = input_data or {}
        task_id = input_data.get("taskId")
        if not task_id:
            raise ValueError("taskId is required")
        body = self._task_form_to_sidecar_body(input_data.get("patch") or {})
        resp = self._agent_call("PATCH", f"/v1/tasks/{_url_quote(str(task_id), safe='')}", body)
        return self._task_row_to_entity(resp)

    def _ipc_agent_task_pause(self, input_data):
        task_id = (input_data or {}).get("taskId")
        resp = self._agent_call("PATCH", f"/v1/tasks/{_url_quote(str(task_id), safe='')}", {"status": "paused"})
        return self._task_row_to_entity(resp)

    def _ipc_agent_task_resume(self, input_data):
        task_id = (input_data or {}).get("taskId")
        resp = self._agent_call("PATCH", f"/v1/tasks/{_url_quote(str(task_id), safe='')}", {"status": "active"})
        return self._task_row_to_entity(resp)

    def _ipc_agent_task_delete(self, input_data):
        task_id = (input_data or {}).get("taskId")
        self._agent_call("DELETE", f"/v1/tasks/{_url_quote(str(task_id), safe='')}")
        return None

    def _ipc_agent_task_run(self, input_data):
        task_id = (input_data or {}).get("taskId")
        self._agent_call("POST", f"/v1/tasks/{_url_quote(str(task_id), safe='')}/run")
        return None

    # ── DataApi(/agents, /agent-tasks) 读处理函数 ────────────────────────────

    def _data_agents_list(self, query: dict) -> dict:
        query = query or {}
        page = max(int(query.get("page") or 1), 1)
        limit = min(max(int(query.get("limit") or 100), 1), 500)
        offset = (page - 1) * limit
        resp = self._agent_call("GET", f"/v1/agents?limit={limit}&offset={offset}")
        items = [self._agent_row_to_entity(r) for r in (resp.get("data") or [])]
        return {"items": items, "total": resp.get("total", len(items)), "page": page}

    def _data_agent_get(self, params: dict) -> dict:
        agent_id = (params or {}).get("agentId")
        resp = self._agent_call("GET", f"/v1/agents/{_url_quote(str(agent_id), safe='')}")
        return self._agent_row_to_entity(resp)

    def _data_agent_patch(self, params: dict, body: dict) -> dict:
        agent_id = (params or {}).get("agentId")
        sidecar_body = self._agent_patch_to_sidecar_body(body or {})
        resp = self._agent_call("PATCH", f"/v1/agents/{_url_quote(str(agent_id), safe='')}", sidecar_body)
        return self._agent_row_to_entity(resp)

    def _data_agent_delete(self, params: dict, _query: dict) -> dict:
        agent_id = (params or {}).get("agentId")
        self._agent_call("DELETE", f"/v1/agents/{_url_quote(str(agent_id), safe='')}")
        return {"deleted": True}

    def _data_agent_tasks_list_all(self, query: dict) -> dict:
        query = query or {}
        page = max(int(query.get("page") or 1), 1)
        limit = min(max(int(query.get("limit") or 20), 1), 500)
        offset = (page - 1) * limit
        resp = self._agent_call("GET", f"/v1/tasks?limit={limit}&offset={offset}")
        items = [self._task_row_to_entity(r) for r in (resp.get("data") or [])]
        return {"items": items, "total": resp.get("total", len(items)), "page": page}

    def _data_agent_task_get_by_id(self, params: dict) -> dict:
        task_id = (params or {}).get("taskId")
        resp = self._agent_call("GET", f"/v1/tasks/{_url_quote(str(task_id), safe='')}")
        return self._task_row_to_entity(resp)

    def _data_agent_tasks_list_for_agent(self, params: dict, query: dict) -> dict:
        # sidecar 没有按 agent 过滤的任务列表端点，取全量后本地过滤/分页。
        agent_id = (params or {}).get("agentId")
        query = query or {}
        page = max(int(query.get("page") or 1), 1)
        limit = min(max(int(query.get("limit") or 20), 1), 500)
        resp = self._agent_call("GET", "/v1/tasks?limit=500&offset=0")
        all_items = [
            self._task_row_to_entity(r) for r in (resp.get("data") or []) if r.get("agent_id") == agent_id
        ]
        start = (page - 1) * limit
        return {"items": all_items[start:start + limit], "total": len(all_items), "page": page}

    def _data_agent_task_logs(self, params: dict, query: dict) -> dict:
        task_id = (params or {}).get("taskId")
        query = query or {}
        page = max(int(query.get("page") or 1), 1)
        limit = min(max(int(query.get("limit") or 20), 1), 500)
        offset = (page - 1) * limit
        resp = self._agent_call("GET", f"/v1/tasks/{_url_quote(str(task_id), safe='')}/logs?limit={limit}&offset={offset}")
        items = [self._tasklog_row_to_entity(r) for r in (resp.get("data") or [])]
        return {"items": items, "total": resp.get("total", len(items)), "page": page}

    # ── App / System 基础能力 ─────────────────────────────────────────────────

    @Slot(result=str)
    def getCacheSizeV2(self) -> str:
        try:
            total = 0
            root = self._get_app_data_dir()
            for dirpath, _dirnames, filenames in os.walk(root):
                for name in filenames:
                    try:
                        total += os.path.getsize(os.path.join(dirpath, name))
                    except OSError:
                        pass
            return json.dumps({"size": total, "count": 0})
        except Exception as e:
            _log(f"[getCacheSizeV2] {e}")
            return json.dumps({"size": 0, "count": 0})

    @Slot(result=bool)
    def clearCacheV2(self) -> bool:
        # 应用数据目录里存放的是聊天/知识库数据，不是可安全清空的缓存，
        # 这里刻意不做真正的删除，避免误删用户数据。
        return True

    @Slot(result=bool)
    def isMaximizedV2(self) -> bool:
        try:
            w = self._get_window()
            return bool(w and w.isMaximized())
        except Exception:
            return False

    @Slot(result=str)
    def getSystemFontsV2(self) -> str:
        try:
            from PySide6.QtGui import QFontDatabase
            families = list(QFontDatabase.families())[:200]
            return json.dumps(families or ["Microsoft YaHei", "SimHei", "SimSun", "Consolas", "Arial"])
        except Exception:
            return json.dumps(["Microsoft YaHei", "SimHei", "SimSun", "Consolas", "Arial"])

    @Slot(str, result=bool)
    def hasWritePermission(self, path: str) -> bool:
        try:
            target = path if os.path.exists(path) else os.path.dirname(path) or "."
            return os.access(target, os.W_OK)
        except Exception:
            return False

    @Slot(str, result=str)
    def resolvePathV2(self, path: str) -> str:
        try:
            return os.path.abspath(os.path.expanduser(path))
        except Exception:
            return path

    @Slot(str, str, result=bool)
    def isPathInside(self, child_path: str, parent_path: str) -> bool:
        try:
            child = os.path.realpath(child_path)
            parent = os.path.realpath(parent_path)
            return os.path.commonpath([child, parent]) == parent
        except Exception:
            return False

    @Slot(result=str)
    def getHostname(self) -> str:
        try:
            return socket.gethostname()
        except Exception:
            return "houdini"

    @Slot(str, result=str)
    def zipDecompress(self, _text: str) -> str:
        return ""

    @Slot(str, str, str, result=str)
    def aesDecrypt(self, _encrypted_data: str, _iv: str, _secret_key: str) -> str:
        return ""

    @Slot(str, result=bool)
    def setSpellCheckLanguages(self, _languages_json: str) -> bool:
        return True

    @Slot(bool, result=bool)
    def setLaunchOnBoot(self, _is_active: bool) -> bool:
        # Houdini 插件跟随宿主启动，没有独立的"开机启动"概念。
        return False

    @Slot(str, result=str)
    def applicationPreventQuit(self, _reason: str) -> str:
        return f"houdini-hold-{uuid.uuid4().hex[:8]}"

    @Slot(str, result=bool)
    def applicationAllowQuit(self, _hold_id: str) -> bool:
        return True

    @Slot(str, result=bool)
    def applicationRelaunch(self, _options_json: str) -> bool:
        # Houdini 插件里没有"重启整个应用"的安全语义，交由用户手动重开面板。
        return False

    @Slot(str, result=bool)
    def quoteToMainWindow(self, _text: str) -> bool:
        return False

    # ── 文件系统扩展（tree/backup/command/aes/copilot/nutstore/lanTransfer 等）──

    @Slot(str, str, result=bool)
    def fileMove(self, path: str, new_path: str) -> bool:
        try:
            os.makedirs(os.path.dirname(new_path) or ".", exist_ok=True)
            shutil.move(path, new_path)
            return True
        except Exception as e:
            _log(f"[fileMove] {e}")
            return False

    @Slot(str, str, result=bool)
    def fileMoveDir(self, dir_path: str, new_dir_path: str) -> bool:
        return self.fileMove(dir_path, new_dir_path)

    @Slot(str, str, result=bool)
    def fileRename(self, path: str, new_name: str) -> bool:
        try:
            target = os.path.join(os.path.dirname(path), new_name)
            os.rename(path, target)
            return True
        except Exception as e:
            _log(f"[fileRename] {e}")
            return False

    @Slot(str, str, result=bool)
    def fileRenameDir(self, dir_path: str, new_name: str) -> bool:
        return self.fileRename(dir_path, new_name)

    @Slot(str, result=bool)
    def fileMkdir(self, dir_path: str) -> bool:
        try:
            os.makedirs(dir_path, exist_ok=True)
            return True
        except Exception as e:
            _log(f"[fileMkdir] {e}")
            return False

    @Slot(str, result=bool)
    def fileDeleteExternalFile(self, file_path: str) -> bool:
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
            return True
        except Exception as e:
            _log(f"[fileDeleteExternalFile] {e}")
            return False

    @Slot(str, result=bool)
    def fileDeleteExternalDir(self, dir_path: str) -> bool:
        try:
            if os.path.isdir(dir_path):
                shutil.rmtree(dir_path, ignore_errors=True)
            return True
        except Exception as e:
            _log(f"[fileDeleteExternalDir] {e}")
            return False

    @Slot(str, result=bool)
    def filePermanentDelete(self, handle_json: str) -> bool:
        try:
            handle = json.loads(handle_json) if handle_json else {}
            path = handle.get("path") if isinstance(handle, dict) else str(handle)
            if path and os.path.exists(path):
                if os.path.isdir(path):
                    shutil.rmtree(path, ignore_errors=True)
                else:
                    os.remove(path)
            return True
        except Exception as e:
            _log(f"[filePermanentDelete] {e}")
            return False

    @Slot(result=bool)
    def fileRunSweep(self) -> bool:
        return True

    @Slot(str, result=str)
    def fileGetV2(self, file_path: str) -> str:
        try:
            if not os.path.exists(file_path):
                return "null"
            stat = os.stat(file_path)
            name = os.path.basename(file_path)
            ext = os.path.splitext(name)[1]
            return json.dumps({
                "id": file_path,
                "name": name,
                "path": file_path,
                "size": stat.st_size,
                "ext": ext,
                "type": self._get_file_type(ext),
                "created_at": stat.st_ctime,
                "count": 1,
            })
        except Exception as e:
            _log(f"[fileGetV2] {e}")
            return "null"

    @Slot(str, result=str)
    def fileCreateTempFile(self, file_name: str) -> str:
        try:
            temp_dir = os.path.join(tempfile.gettempdir(), "cherrystudio")
            os.makedirs(temp_dir, exist_ok=True)
            return os.path.join(temp_dir, file_name)
        except Exception:
            return file_name

    @Slot(str, str, result=str)
    def fileListDirectory(self, dir_path: str, options_json: str) -> str:
        try:
            entries = []
            if os.path.isdir(dir_path):
                for name in sorted(os.listdir(dir_path)):
                    full = os.path.join(dir_path, name)
                    entries.append({
                        "name": name,
                        "path": full,
                        "isDirectory": os.path.isdir(full),
                    })
            return json.dumps(entries)
        except Exception as e:
            _log(f"[fileListDirectory] {e}")
            return "[]"

    @Slot(str, str, result=str)
    def fileListDirectoryEntries(self, dir_path: str, options_json: str) -> str:
        return self.fileListDirectory(dir_path, options_json)

    @Slot(str, str, bool, result=bool)
    def fileCheckFileName(self, dir_path: str, file_name: str, _is_file: bool) -> bool:
        try:
            return not os.path.exists(os.path.join(dir_path, file_name))
        except Exception:
            return True

    @Slot(str, result=bool)
    def fileValidateNotesDirectory(self, dir_path: str) -> bool:
        try:
            return os.path.isdir(dir_path) and os.access(dir_path, os.W_OK)
        except Exception:
            return False

    @Slot(str, result=bool)
    def fileShowInFolder(self, path: str) -> bool:
        try:
            if sys.platform == "win32":
                subprocess.run(["explorer", "/select,", os.path.normpath(path)], check=False)
            elif sys.platform == "darwin":
                subprocess.run(["open", "-R", path], check=False)
            else:
                subprocess.run(["xdg-open", os.path.dirname(path) or "."], check=False)
            return True
        except Exception as e:
            _log(f"[fileShowInFolder] {e}")
            return False

    # File Storage Entry 抽象（v2.0 新增的内部/外部文件引用系统）尚未移植，
    # 先返回明确错误，避免渲染进程按 undefined 处理导致后续 crash。
    @Slot(str, result=str)
    def fileCreateInternalEntry(self, _params_json: str) -> str:
        return json.dumps({"error": "File storage entries are not supported in Houdini runtime yet"})

    @Slot(str, result=str)
    def fileEnsureExternalEntry(self, _params_json: str) -> str:
        return json.dumps({"error": "File storage entries are not supported in Houdini runtime yet"})

    @Slot(str, result=str)
    def fileGetPhysicalPath(self, params_json: str) -> str:
        try:
            params = json.loads(params_json) if params_json else {}
            path = params.get("path") if isinstance(params, dict) else None
            return json.dumps(path) if path else json.dumps(None)
        except Exception:
            return json.dumps(None)

    @Slot(str, str, result=str)
    def fileBatchUploadMarkdown(self, _file_paths_json: str, _target_path: str) -> str:
        return json.dumps({"error": "Not supported in Houdini runtime"})

    # ── 目录树（Notes 功能用）── 暂未移植，先返回明确错误 ─────────────────────

    @Slot(str, str, result=str)
    def fileTreeCreate(self, _root_path: str, _options_json: str) -> str:
        return json.dumps({"error": "Directory tree watching is not supported in Houdini runtime yet"})

    @Slot(str, result=bool)
    def fileTreeDispose(self, _tree_id: str) -> bool:
        return True

    @Slot(str, str, str, result=bool)
    def fileTreeRename(self, _tree_id: str, _old_path: str, _new_path: str) -> bool:
        return False

    # ── 原生弹出菜单 / AES / Copilot / 第三方应用检测 / Nutstore ──────────────

    @Slot(str, str, result=bool)
    def commandShowNativePopupMenu(self, _model_json: str, _anchor_json: str) -> bool:
        return False

    @Slot(str, result=str)
    def copilotGetAuthMessage(self, _headers_json: str) -> str:
        return json.dumps({"error": "GitHub Copilot login is not supported in Houdini runtime"})

    @Slot(str, str, result=str)
    def copilotGetCopilotToken(self, _device_code: str, _headers_json: str) -> str:
        return json.dumps({"error": "GitHub Copilot login is not supported in Houdini runtime"})

    @Slot(str, result=bool)
    def copilotSaveCopilotToken(self, _access_token: str) -> bool:
        return False

    @Slot(str, result=str)
    def copilotGetToken(self, _headers_json: str) -> str:
        return json.dumps({"error": "GitHub Copilot login is not supported in Houdini runtime"})

    @Slot(result=bool)
    def copilotLogout(self) -> bool:
        return True

    @Slot(str, result=str)
    def copilotGetUser(self, _token: str) -> str:
        return json.dumps({"error": "GitHub Copilot login is not supported in Houdini runtime"})

    @Slot(result=str)
    def externalAppsDetectInstalled(self) -> str:
        return "[]"

    @Slot(result=str)
    def nutstoreGetSsoUrl(self) -> str:
        return json.dumps("")

    @Slot(str, result=str)
    def nutstoreDecryptToken(self, _token: str) -> str:
        return json.dumps("")

    @Slot(str, str, result=str)
    def nutstoreGetDirectoryContents(self, _token: str, _path: str) -> str:
        return json.dumps([])

    # ── 备份（仅实现本地备份，webdav/S3 先明确不支持）────────────────────────

    @Slot(str, str, bool, result=bool)
    def backupBackup(self, _file_name: str, _destination_path: str, _skip_backup_file: bool) -> bool:
        return False

    @Slot(str, result=bool)
    def backupRestore(self, _path: str) -> bool:
        return False

    @Slot(str, str, result=str)
    def backupBackupToLocalDir(self, file_name: str, local_config_json: str) -> str:
        try:
            config = json.loads(local_config_json) if local_config_json else {}
            backup_dir = (config or {}).get("backupDir") or os.path.join(self._get_app_data_dir(), "backups")
            os.makedirs(backup_dir, exist_ok=True)
            name = file_name or f"cherry-studio-backup-{int(time.time())}.zip"
            dest = os.path.join(backup_dir, name)
            src_dir = self._get_app_data_dir()
            with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as zf:
                for dirpath, _dirnames, filenames in os.walk(src_dir):
                    if os.path.abspath(dirpath).startswith(os.path.abspath(backup_dir)):
                        continue
                    for fname in filenames:
                        full = os.path.join(dirpath, fname)
                        zf.write(full, os.path.relpath(full, src_dir))
            return json.dumps(dest)
        except Exception as e:
            _log(f"[backupBackupToLocalDir] {e}")
            return json.dumps("")

    @Slot(str, str, result=bool)
    def backupRestoreFromLocalBackup(self, file_name: str, local_backup_dir: str) -> bool:
        try:
            backup_dir = local_backup_dir or os.path.join(self._get_app_data_dir(), "backups")
            src = os.path.join(backup_dir, file_name)
            if not os.path.isfile(src):
                return False
            dest_dir = self._get_app_data_dir()
            with zipfile.ZipFile(src, "r") as zf:
                zf.extractall(dest_dir)
            return True
        except Exception as e:
            _log(f"[backupRestoreFromLocalBackup] {e}")
            return False

    @Slot(str, result=str)
    def backupListLocalBackupFiles(self, local_backup_dir: str) -> str:
        try:
            backup_dir = local_backup_dir or os.path.join(self._get_app_data_dir(), "backups")
            if not os.path.isdir(backup_dir):
                return "[]"
            files = [f for f in os.listdir(backup_dir) if f.lower().endswith(".zip")]
            return json.dumps(files)
        except Exception as e:
            _log(f"[backupListLocalBackupFiles] {e}")
            return "[]"

    @Slot(str, str, result=bool)
    def backupDeleteLocalBackupFile(self, file_name: str, local_backup_dir: str) -> bool:
        try:
            backup_dir = local_backup_dir or os.path.join(self._get_app_data_dir(), "backups")
            path = os.path.join(backup_dir, file_name)
            if os.path.isfile(path):
                os.remove(path)
            return True
        except Exception as e:
            _log(f"[backupDeleteLocalBackupFile] {e}")
            return False

    @Slot(str, result=str)
    def backupBackupToWebdav(self, _config_json: str) -> str:
        return json.dumps({"success": False, "error": "WebDAV backup is not supported in Houdini runtime"})

    @Slot(str, result=bool)
    def backupRestoreFromWebdav(self, _config_json: str) -> bool:
        return False

    @Slot(str, result=str)
    def backupListWebdavFiles(self, _config_json: str) -> str:
        return json.dumps([])

    @Slot(str, result=bool)
    def backupCheckWebdavConnection(self, _config_json: str) -> bool:
        return False

    @Slot(str, str, str, result=bool)
    def backupCreateWebdavDirectory(self, _config_json: str, _path: str, _options_json: str) -> bool:
        return False

    @Slot(str, str, result=bool)
    def backupDeleteWebdavFile(self, _file_name: str, _config_json: str) -> bool:
        return False

    @Slot(str, result=str)
    def backupBackupToS3(self, _config_json: str) -> str:
        return json.dumps({"success": False, "error": "S3 backup is not supported in Houdini runtime"})

    @Slot(str, result=bool)
    def backupRestoreFromS3(self, _config_json: str) -> bool:
        return False

    @Slot(str, result=str)
    def backupListS3Files(self, _config_json: str) -> str:
        return json.dumps([])

    @Slot(str, str, result=bool)
    def backupDeleteS3File(self, _file_name: str, _config_json: str) -> bool:
        return False

    @Slot(str, str, result=str)
    def backupCreateLanTransferBackup(self, _data: str, _destination_path: str) -> str:
        return json.dumps("")

    @Slot(str, result=bool)
    def backupDeleteLanTransferBackup(self, _file_path: str) -> bool:
        return False

    # ── 局域网传输（多实例互传，Houdini 单实例场景下先明确不支持）───────────

    @Slot(result=str)
    def lanTransferStartScan(self) -> str:
        return json.dumps({"services": [], "isScanning": False, "lastUpdatedAt": int(time.time() * 1000)})

    @Slot(result=str)
    def lanTransferStopScan(self) -> str:
        return json.dumps({"services": [], "isScanning": False, "lastUpdatedAt": int(time.time() * 1000)})

    @Slot(str, result=str)
    def lanTransferConnect(self, _payload_json: str) -> str:
        return json.dumps({"error": "LAN transfer is not supported in Houdini runtime"})

    @Slot(result=bool)
    def lanTransferDisconnect(self) -> bool:
        return True

    @Slot(str, result=str)
    def lanTransferSendFile(self, _file_path: str) -> str:
        return json.dumps({"error": "LAN transfer is not supported in Houdini runtime"})

    @Slot(result=bool)
    def lanTransferCancelTransfer(self) -> bool:
        return True

    # ── Cache / StorageMonitor ────────────────────────────────────────────────

    @Slot(result=str)
    def cacheGetAllShared(self) -> str:
        return json.dumps({})

    @Slot(result=str)
    def storageMonitorGetHealth(self) -> str:
        try:
            usage = shutil.disk_usage(self._get_app_data_dir())
            level = "low" if usage.free < 1024 * 1024 * 1024 else "ok"
            return json.dumps({
                "level": level,
                "freeBytes": usage.free,
                "totalBytes": usage.total,
                "checkedAt": int(time.time() * 1000),
            })
        except Exception as e:
            _log(f"[storageMonitorGetHealth] {e}")
            return json.dumps({"level": "ok", "freeBytes": 0, "totalBytes": 0, "checkedAt": int(time.time() * 1000)})

    # =========================================================================
    # 辅助方法
    # =========================================================================

    def _get_app_data_dir(self) -> str:
        from ..core.paths import get_app_data_dir
        return get_app_data_dir()

    _IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}
    _VIDEO_EXTS = {'.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'}
    _AUDIO_EXTS = {'.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a'}
    _DOCUMENT_EXTS = {'.pdf', '.doc', '.docx', '.pptx', '.xlsx', '.odt', '.odp', '.ods'}
    _TEXT_EXTS = {
        '.txt', '.md', '.json', '.js', '.ts', '.tsx', '.jsx', '.py', '.html',
        '.css', '.xml', '.yaml', '.yml', '.ini', '.cfg', '.log', '.csv', '.sh',
        '.bat', '.cpp', '.c', '.h', '.java', '.go', '.rs', '.rb', '.php',
        '.swift', '.kt', '.scala', '.r', '.lua', '.sql', '.toml', '.env',
        '.gitignore', '.dockerfile', '.makefile', '.cmake',
    }

    @classmethod
    def _get_file_type(cls, ext: str) -> str:
        """Map extension to Cherry Studio FileTypes enum value."""
        ext = ext.lower()
        if ext in cls._IMAGE_EXTS:
            return 'image'
        if ext in cls._VIDEO_EXTS:
            return 'video'
        if ext in cls._AUDIO_EXTS:
            return 'audio'
        if ext in cls._DOCUMENT_EXTS:
            return 'document'
        if ext in cls._TEXT_EXTS:
            return 'text'
        return 'other'
