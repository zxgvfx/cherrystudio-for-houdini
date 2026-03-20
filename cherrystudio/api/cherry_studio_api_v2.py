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
import threading
import uuid
import zipfile
import tarfile
import shutil
import tempfile
import subprocess
import time
from typing import Optional
from pathlib import Path
from urllib import request as _urllib_request, error as _urllib_error

from PySide6.QtCore import QObject, Slot

from ..version import APP_VERSION, APP_PLATFORM, APP_ARCH
from ..utils.logger import network_logger
from .agent_server import AgentServer

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

            local_bin_dir = Path(os.path.expanduser("~")) / ".cherrystudio" / "bin"
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

        bin_dir = Path.home() / ".cherrystudio" / "bin"
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

            cherry_dir = Path.home() / ".cherrystudio"
            bin_dir = cherry_dir / "bin"
            bin_dir.mkdir(parents=True, exist_ok=True)
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
                CherryStudioAPI._agent_server = AgentServer(
                    providers_loader=self._load_providers_from_localstorage)
                success, port = CherryStudioAPI._agent_server.start(host="127.0.0.1", port=0)
                if success:
                    # 同步设置后端路由的全局引用，供 agentApiProxy 使用
                    from ..backend.routes.agent import set_agent_server
                    set_agent_server(CherryStudioAPI._agent_server)
                    _log(f"[apiServerStart] AgentServer started on port {port}, set_agent_server called")
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
                if CherryStudioAPI._agent_server:
                    CherryStudioAPI._agent_server.stop()
                    CherryStudioAPI._agent_server = None
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
        return "[]"

    @Slot(str, result=bool)
    def agentMessagePersistExchange(self, payload: str) -> bool:
        return True

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
    # 辅助方法
    # =========================================================================

    def _get_app_data_dir(self) -> str:
        return os.path.join(os.path.expanduser("~"), ".cherrystudio")

    _IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}
    _VIDEO_EXTS = {'.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'}
    _AUDIO_EXTS = {'.mp3', '.wav', '.ogg', '.flac', '.aac'}
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
