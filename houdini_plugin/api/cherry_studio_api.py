"""
Cherry Studio API 类
提供 JavaScript 调用的 Python 方法
"""

import os
import json
import threading
import queue
from urllib import request as urllib_request, error as urllib_error
from PySide6.QtCore import QObject, Slot, Signal

# 简单文件日志
_LOG_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'houdini_network.log')

def _log(msg: str) -> None:
    try:
        with open(_LOG_FILE, 'a', encoding='utf-8') as f:
            from datetime import datetime
            f.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {msg}\n")
    except Exception:
        pass


class CherryStudioAPI(QObject):
    """Cherry Studio API 类，提供 JavaScript 调用的 Python 方法"""
    
    _zoom_factor = 1.0
    
    # 流式响应缓冲区 (request_id -> queue)
    _stream_buffers = {}
    _stream_locks = {}
    
    # ========== 基础系统 API ==========
    
    @Slot(result=str)
    def getSystemFonts(self) -> str:
        """获取系统字体列表"""
        return '["Microsoft YaHei","SimHei","SimSun","Consolas","Arial","Courier New"]'
    
    @Slot(result=str)
    def getAppVersion(self) -> str:
        """获取应用版本"""
        return '1.0.0'
    
    @Slot(result=str)
    def getPlatform(self) -> str:
        """获取平台信息"""
        return 'win32'
    
    @Slot(result=str)
    def getArch(self) -> str:
        """获取架构信息"""
        return 'x64'
    
    @Slot(result=str)
    def getTheme(self) -> str:
        """获取当前主题"""
        return 'light'
    
    @Slot(str, result=bool)
    def setTheme(self, theme: str) -> bool:
        """设置主题"""
        return True
    
    @Slot(result=str)
    def getLocale(self) -> str:
        """获取语言设置"""
        return 'zh-CN'
    
    @Slot(str, result=str)
    def getPath(self, name: str) -> str:
        """获取路径"""
        return ''
    
    @Slot(result=str)
    def getAppInfo(self) -> str:
        """获取应用信息"""
        return '{"version":"1.0.0","platform":"win32","arch":"x64"}'
    
    @Slot(str, result=str)
    def getDiskInfo(self, path: str) -> str:
        """获取磁盘信息"""
        return '{"total":1000000000,"free":500000000}'
    
    @Slot(str, int, str, str, result=bool)
    def logToMain(self, source: str, level: int, message: str, data: str = "") -> bool:
        """日志记录（静默到文件）"""
        _log(f"[{source}] {message}")
        return True
    
    @Slot(result=bool)
    def isFullScreen(self) -> bool:
        """检查是否全屏"""
        return False
    
    @Slot(result=str)
    def getDataPathFromArgs(self) -> str:
        """从参数获取数据路径"""
        return ''
    
    @Slot(str, result=bool)
    def setProxy(self, config: str) -> bool:
        """设置代理"""
        return True
    
    @Slot(float, result=bool)
    def handleZoomFactor(self, factor: float) -> bool:
        """处理缩放因子"""
        try:
            self._zoom_factor = max(0.25, min(3.0, factor))
            return True
        except Exception:
            return False
    
    @Slot(bool, result=bool)
    def setAutoUpdate(self, enabled: bool) -> bool:
        """设置自动更新"""
        return True
    
    @Slot(str, result=str)
    def setLanguage(self, lang: str) -> str:
        """设置语言"""
        return lang
    
    @Slot(str, result=bool)
    def isBinaryExist(self, binary: str) -> bool:
        """检查二进制文件是否存在"""
        try:
            from shutil import which
            return which(binary) is not None
        except Exception:
            return False
    
    @Slot(str, result=bool)
    def openWebsite(self, url: str) -> bool:
        """打开网站"""
        try:
            from PySide6.QtGui import QDesktopServices
            from PySide6.QtCore import QUrl
            if url and isinstance(url, str):
                QDesktopServices.openUrl(QUrl(url))
                return True
        except Exception:
            pass
        try:
            import webbrowser
            return bool(webbrowser.open(url))
        except Exception:
            return False
    
    # ========== 文件操作 API ==========
    
    @Slot(str, result=bool)
    def isTextFile(self, filePath: str) -> bool:
        """检测文件是否为文本文件"""
        try:
            if not filePath:
                return False
            _, ext = os.path.splitext(filePath.lower())
            supported_text_extensions = {
                '.txt', '.md', '.json', '.js', '.ts', '.py', '.html', '.css', 
                '.xml', '.yaml', '.yml', '.ini', '.cfg', '.conf', '.log',
                '.csv', '.sql', '.sh', '.bat', '.ps1', '.r', '.m', '.cpp', 
                '.c', '.h', '.hpp', '.java', '.php', '.rb', '.go', '.rs'
            }
            if ext in supported_text_extensions:
                return True
            import mimetypes
            mime_type, _ = mimetypes.guess_type(filePath)
            if mime_type and mime_type.startswith('text/'):
                return True
            try:
                with open(filePath, 'rb') as f:
                    chunk = f.read(1024)
                    if b'\x00' in chunk:
                        return False
                    try:
                        chunk.decode('utf-8')
                        return True
                    except UnicodeDecodeError:
                        return False
            except (IOError, OSError):
                return False
        except Exception as e:
            print(f"Error checking text file: {e}")
            return False
    
    @Slot(str, result=str)
    def fileSelect(self, options: str) -> str:
        """显示文件选择对话框"""
        try:
            from PySide6.QtWidgets import QFileDialog, QApplication
            opts = json.loads(options) if options else {}
            app = QApplication.instance()
            if not app:
                return "[]"
            caption = opts.get('title', '选择文件')
            directory = opts.get('defaultPath', '')
            filters = opts.get('filters', [])
            multiple = opts.get('multiple', False)
            mode = opts.get('mode', 'open')
            filter_str = ""
            if filters:
                filter_parts = []
                for filter_item in filters:
                    if isinstance(filter_item, dict):
                        name = filter_item.get('name', '')
                        extensions = filter_item.get('extensions', [])
                        if name and extensions:
                            ext_str = " ".join(f"*.{ext}" for ext in extensions)
                            filter_parts.append(f"{name} ({ext_str})")
                    elif isinstance(filter_item, str):
                        filter_parts.append(filter_item)
                filter_str = ";;".join(filter_parts)
            if mode == 'save':
                file_path, _ = QFileDialog.getSaveFileName(None, caption, directory, filter_str)
                result = [file_path] if file_path else []
            else:
                if multiple:
                    file_paths, _ = QFileDialog.getOpenFileNames(None, caption, directory, filter_str)
                    result = file_paths if file_paths else []
                else:
                    file_path, _ = QFileDialog.getOpenFileName(None, caption, directory, filter_str)
                    result = [file_path] if file_path else []
            return json.dumps(result)
        except Exception as e:
            print(f"Error in file select: {e}")
            return "[]"
    
    @Slot(str, result=str)
    def binaryImage(self, fileId: str) -> str:
        """处理二进制图像文件"""
        try:
            if not fileId or not os.path.exists(fileId):
                return "null"
            _, ext = os.path.splitext(fileId.lower())
            supported_image_extensions = {
                '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif',
                '.webp', '.svg', '.ico', '.psd', '.ai', '.eps'
            }
            if ext not in supported_image_extensions:
                return "null"
            from PySide6.QtGui import QPixmap, QImage
            from PySide6.QtCore import QBuffer, QIODevice
            import base64
            pixmap = QPixmap(fileId)
            if pixmap.isNull():
                return "null"
            image = pixmap.toImage()
            if image.isNull():
                return "null"
            buffer = QBuffer()
            buffer.open(QIODevice.WriteOnly)
            image.save(buffer, "PNG")
            image_data = buffer.data()
            base64_data = base64.b64encode(image_data).decode('utf-8')
            return json.dumps({
                "data": base64_data,
                "format": "png",
                "width": image.width(),
                "height": image.height()
            })
        except Exception as e:
            print(f"Error processing binary image: {e}")
            return "null"
    
    # ========== 文件 API ==========
    
    @Slot(str, result=str)
    def fileRead(self, file_id: str) -> str:
        """读取文件内容"""
        try:
            # file_id 可能包含路径，需要安全处理
            file_path = os.path.join(self._get_app_data_dir(), file_id)
            # quiet: reading file
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # quiet: read bytes
                    return content
            # quiet: file not found
            return ""
        except Exception as e:
            # quiet: read error
            return ""
    
    @Slot(str, str, result=bool)
    def fileWrite(self, file_path: str, content: str) -> bool:
        """写入文件内容"""
        try:
            full_path = os.path.join(self._get_app_data_dir(), file_path)
            # quiet: writing file
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            # quiet: write ok
            return True
        except Exception as e:
            # quiet: write error
            return False
    
    @Slot(str, str, result=bool)
    def fileWriteWithId(self, file_id: str, content: str) -> bool:
        """使用文件ID写入内容"""
        try:
            file_path = os.path.join(self._get_app_data_dir(), file_id)
            # quiet: write with id
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            # quiet: write with id ok
            return True
        except Exception as e:
            # quiet: write with id error
            return False
    
    def _get_app_data_dir(self) -> str:
        """获取应用数据目录"""
        if hasattr(self, '_app_data_dir'):
            return self._app_data_dir
        
        # 使用与 QWebEngineProfile 相同的路径
        from PySide6.QtCore import QStandardPaths
        app_data_path = QStandardPaths.writableLocation(QStandardPaths.AppDataLocation)
        self._app_data_dir = os.path.join(app_data_path, "CherryStudio")
        os.makedirs(self._app_data_dir, exist_ok=True)
        return self._app_data_dir
    
    # ========== 网络功能 API ==========
    
    @Slot(str, result=str)
    def streamRead(self, request_id: str) -> str:
        """读取流式响应的下一个块（非阻塞）
        返回: {"type": "data"|"headers"|"end"|"error"|"empty", ...}
        """
        if request_id not in self._stream_buffers:
            return json.dumps({"type": "error", "error": "Stream not found"})
        
        stream_queue = self._stream_buffers[request_id]
        
        try:
            # 非阻塞读取
            item = stream_queue.get_nowait()
            
            # 如果是结束或错误，清理缓冲区
            if item["type"] in ("end", "error"):
                with self._stream_locks.get(request_id, threading.Lock()):
                    self._stream_buffers.pop(request_id, None)
                    self._stream_locks.pop(request_id, None)
            
            return json.dumps(item)
        except queue.Empty:
            # 队列空，返回 empty 标记
            return json.dumps({"type": "empty"})
    
    @Slot(str, result=str)
    def fetchProxy(self, config_json: str) -> str:
        """执行HTTP请求"""
        try:
            config = json.loads(config_json) if config_json else {}
            if not isinstance(config, dict):
                return json.dumps({"error": "fetch config must be an object"})
            url = config.get("url")
            if not url:
                return json.dumps({"error": "missing url"})
            method = str(config.get("method", "GET")).upper()
            headers = config.get("headers", {})
            data = config.get("body")
            timeout = config.get("timeout", 15.0)
            body_bytes = None
            if data is not None:
                if isinstance(data, dict):
                    data = json.dumps(data)
                if isinstance(data, str):
                    body_bytes = data.encode("utf-8")
                elif isinstance(data, bytes):
                    body_bytes = data
            req = urllib_request.Request(url, data=body_bytes, method=method)
            req.add_header('User-Agent', 'Cherry Studio for Houdini/1.0')
            if body_bytes:
                req.add_header('Content-Type', 'application/json')
            for key, value in headers.items():
                try:
                    req.add_header(str(key), str(value))
                except Exception:
                    continue
            # 检查是否是流式请求
            is_stream = config.get("stream", False)
            request_id = config.get("requestId", "")
            
            # 如果是流式请求且有 request_id，使用队列缓冲
            if is_stream and request_id:
                # 创建队列
                stream_queue = queue.Queue()
                self._stream_buffers[request_id] = stream_queue
                self._stream_locks[request_id] = threading.Lock()
                
                def stream_worker():
                    try:
                        with urllib_request.urlopen(req, timeout=60.0) as resp:
                            status = resp.getcode()
                            reason = getattr(resp, "reason", "")
                            resp_headers = dict(resp.getheaders())
                            
                            # 放入初始响应头
                            header_info = {
                                "type": "headers",
                                "status": status,
                                "statusText": reason,
                                "headers": resp_headers
                            }
                            stream_queue.put(header_info)
                            
                            # 逐块读取并放入队列
                            while True:
                                chunk = resp.read(1024)  # 每次读取 1KB
                                if not chunk:
                                    break
                                chunk_str = chunk.decode("utf-8", errors="ignore")
                                stream_queue.put({"type": "data", "data": chunk_str})
                            
                            # 放入结束标记
                            stream_queue.put({"type": "end"})
                    except Exception as e:
                        stream_queue.put({"type": "error", "error": str(e)})
                
                # 启动后台线程处理流式响应
                thread = threading.Thread(target=stream_worker, daemon=True)
                thread.start()
                
                # 立即返回，表示流已开始
                return json.dumps({"streaming": True, "requestId": request_id})
            
            # 非流式请求，一次性返回
            with urllib_request.urlopen(req, timeout=timeout) as resp:
                status = resp.getcode()
                reason = getattr(resp, "reason", "")
                resp_headers = dict(resp.getheaders())
                body = resp.read().decode("utf-8", errors="ignore")
                result = {
                    "status": status,
                    "statusText": reason,
                    "headers": resp_headers,
                    "body": body
                }
                return json.dumps(result)
        except urllib_error.HTTPError as e:
            try:
                error_body = e.read().decode("utf-8", errors="ignore")
            except Exception:
                error_body = ""
            result = {
                "status": e.code,
                "statusText": getattr(e, "reason", ""),
                "headers": dict(e.headers.items()) if getattr(e, "headers", None) else {},
                "body": error_body,
                "error": str(e)
            }
            if e.code == 401:
                result["error"] = "API key required or invalid"
            return json.dumps(result)
        except Exception as e:
            return json.dumps({"error": str(e)})
    
    @Slot(str, result=str)
    def ollamaListModels(self, options_json: str) -> str:
        """获取Ollama模型列表"""
        # quiet network logs
        try:
            options = json.loads(options_json) if options_json else {}
            host = options.get("host", "http://localhost:11434")
            _log(f"ollamaListModels requesting: {host}")
            _log(f"ollamaListModels requesting: {host}")
            url = f"{host.rstrip('/')}/v1/models"
            try:
                req = urllib_request.Request(url, method="GET")
                req.add_header('Content-Type', 'application/json')
                req.add_header('User-Agent', 'Cherry Studio for Houdini')
                with urllib_request.urlopen(req, timeout=10.0) as resp:
                    raw = resp.read().decode("utf-8", errors="ignore")
                    _log(f"ollamaListModels success bytes={len(raw)}")
                    _log(f"ollamaListModels /v1/models success bytes={len(raw)}")
                    try:
                        parsed = json.loads(raw) if raw else {}
                        if isinstance(parsed, dict):
                            if 'data' in parsed and isinstance(parsed['data'], list):
                                if not parsed['data']:
                                    _log('ollamaListModels empty data, fallback to /api/tags')
                                    return self._fallback_to_api_tags(host)
                                return raw
                            if 'models' in parsed and isinstance(parsed['models'], list):
                                models = []
                                for m in parsed['models']:
                                    if isinstance(m, dict) and 'name' in m:
                                        models.append({
                                            "id": m.get("name"),
                                            "object": "model",
                                            "created": m.get("modified_at", 0),
                                            "owned_by": "ollama"
                                        })
                                return json.dumps({"object": "list", "data": models})
                        return '{"object": "list", "data": []}'
                    except Exception:
                        return '{"object": "list", "data": []}'
            except urllib_error.HTTPError as e:
                _log(f"ollamaListModels HTTP error {e.code}")
                return self._fallback_to_api_tags(host)
            except Exception as e:
                _log(f"ollamaListModels error: {e}")
                return self._fallback_to_api_tags(host)
        except Exception as e:
            _log(f"ollamaListModels error: {e}")
            return '{"object": "list", "data": []}'
    
    def _fallback_to_api_tags(self, host: str) -> str:
        """回退到Ollama的/api/tags端点"""
        try:
            url = f"{host.rstrip('/')}/api/tags"
            req = urllib_request.Request(url, method="GET")
            req.add_header('User-Agent', 'Cherry Studio for Houdini')
            with urllib_request.urlopen(req, timeout=10.0) as resp:
                raw = resp.read().decode("utf-8", errors="ignore")
                data = json.loads(raw)
                _log(f"_fallback_to_api_tags success bytes={len(raw)}")
                models = []
                if isinstance(data, dict) and "models" in data:
                    for model in data["models"]:
                        if isinstance(model, dict) and "name" in model:
                            models.append({
                                "id": model["name"],
                                "object": "model",
                                "created": model.get("modified_at", 0),
                                "owned_by": "ollama"
                            })
                result = {"object": "list", "data": models}
                return json.dumps(result)
        except Exception as e:
            print(f"[NetworkAPI] fallback to api/tags failed: {e}")
            _log(f"_fallback_to_api_tags failed: {e}")
            return '{"object": "list", "data": []}'
    
    @Slot(str, result=str)
    def ollamaPullModel(self, options_json: str) -> str:
        """拉取Ollama模型"""
        try:
            options = json.loads(options_json) if options_json else {}
            host = options.get("host", "http://localhost:11434")
            model_name = options.get("name", "")
            if not model_name:
                return json.dumps({"success": False, "error": "model name required"})
            _log(f"ollamaPullModel: {model_name} from {host}")
            _log(f"ollamaPullModel start name={model_name} host={host}")
            url = f"{host.rstrip('/')}/api/pull"
            data = {"name": model_name}
            req = urllib_request.Request(url, method="POST")
            req.add_header('Content-Type', 'application/json')
            req.add_header('User-Agent', 'Cherry Studio for Houdini')
            body = json.dumps(data).encode("utf-8")
            req.data = body
            with urllib_request.urlopen(req, timeout=1800.0) as resp:
                raw = resp.read().decode("utf-8", errors="ignore")
                _log(f"ollamaPullModel success bytes={len(raw)}")
                _log(f"ollamaPullModel success bytes={len(raw)}")
                try:
                    response_data = json.loads(raw)
                    return json.dumps({"success": True, "data": response_data})
                except json.JSONDecodeError:
                    return json.dumps({"success": True, "data": raw})
        except Exception as e:
            _log(f"ollamaPullModel error: {e}")
            _log(f"ollamaPullModel error: {e}")
            return json.dumps({"success": False, "error": str(e)})
    
    @Slot(str, result=str)
    def modelList(self, config_json: str) -> str:
        """获取外部模型列表"""
        try:
            config = json.loads(config_json) if config_json else {}
            url = config.get("url")
            if not url:
                fallback = config.get("fallback", {"object": "list", "data": []})
                return json.dumps(fallback)
            _log(f"modelList requesting: {url}")
            method = str(config.get("method", "GET")).upper()
            headers = dict(config.get("headers", {}) or {})
            api_key = config.get("apiKey") or config.get("api_key")
            header_name = config.get("apiHeader") or config.get("api_header") or "Authorization"
            scheme = config.get("apiScheme") or config.get("api_scheme") or "Bearer"
            if api_key and header_name and header_name not in headers:
                if header_name.lower() == "authorization":
                    headers["Authorization"] = f"{scheme} {api_key}".strip()
                else:
                    headers[header_name] = api_key
            body = config.get("body")
            body_bytes = None
            if body:
                if isinstance(body, dict):
                    body = json.dumps(body)
                if isinstance(body, str):
                    body_bytes = body.encode("utf-8")
            req = urllib_request.Request(url, data=body_bytes, method=method)
            req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
            if body_bytes:
                req.add_header('Content-Type', 'application/json')
            for key, value in headers.items():
                try:
                    req.add_header(str(key), str(value))
                except Exception:
                    continue
            with urllib_request.urlopen(req, timeout=15.0) as resp:
                raw = resp.read().decode('utf-8', errors='ignore')
                _log(f"modelList success {resp.getcode()}: {len(raw)} bytes")
                try:
                    data = json.loads(raw)
                    if isinstance(data, dict) and 'data' in data:
                        _log(f"modelList parsed {len(data.get('data', []))} models")
                    return raw
                except json.JSONDecodeError:
                    return raw
        except urllib_error.HTTPError as e:
            _log(f"modelList HTTP error {e.code}")
            if e.code == 401:
                return json.dumps({"object": "list", "data": [], "error": "API key required"})
            return json.dumps(config.get("fallback", {"object": "list", "data": []}))
        except Exception as e:
            _log(f"modelList error: {e}")
            return json.dumps(config.get("fallback", {"object": "list", "data": []}))
    
    # ========== 存根 API 方法 (暂未实现完整逻辑) ==========
    
    @Slot(result=str)
    def getInstallInfo(self) -> str:
        return '{"installed": true, "version": "1.0.0"}'
    
    @Slot(result=str)
    def getUsersList(self) -> str:
        return '[]'
    
    @Slot(result=str)
    def list(self) -> str:
        return '[]'
    
    @Slot(str, result=bool)
    def setConfig(self, config: str) -> bool:
        return True
    
    @Slot(str, result=str)
    def modelsList(self, config: str) -> str:
        try:
            config_data = json.loads(config) if config else {}
            if config_data.get("provider") == "ollama" or "ollama" in str(config_data).lower():
                options = {"host": config_data.get("host", "http://localhost:11434")}
                return self.ollamaListModels(json.dumps(options))
            if "url" in config_data:
                return self.modelList(config)
            return '{"data": [], "total": 0}'
        except Exception as e:
            print(f"[ModelsAPI] modelsList error: {e}")
            return '{"data": [], "total": 0}'
    
    @Slot(str, result=bool)
    def modelsSetConfig(self, config: str) -> bool:
        return True
    
    @Slot(str, result=str)
    def memoryList(self, config: str) -> str:
        return '{"memories": [], "error": null}'
    
    @Slot(str, result=str)
    def memoryAdd(self, payload: str) -> str:
        return '{"memories": []}'
    
    @Slot(str, result=str)
    def memorySearch(self, payload: str) -> str:
        return '{"memories": []}'
    
    @Slot(str, result=str)
    def memoryDelete(self, id: str) -> str:
        return 'true'
    
    @Slot(str, result=str)
    def memoryUpdate(self, payload: str) -> str:
        return 'false'
    
    @Slot(str, result=str)
    def memoryGet(self, id: str) -> str:
        return 'null'
    
    @Slot(str, result=str)
    def memoryDeleteAllMemoriesForUser(self, userId: str) -> str:
        return 'true'
    
    @Slot(str, result=str)
    def memoryDeleteUser(self, userId: str) -> str:
        return 'true'
    
    @Slot(result=str)
    def memoryGetUsersList(self) -> str:
        return '[]'
    
    @Slot(str, result=str)
    def memorySetConfig(self, config: str) -> str:
        return 'true'
    
    @Slot(result=str)
    def apiServerStatus(self) -> str:
        return '{"running": false, "port": 0, "url": "", "error": null}'
    
    @Slot(str, result=str)
    def apiServerConfigure(self, config: str) -> str:
        return '{"success": true}'
    
    @Slot(result=str)
    def apiServerStart(self) -> str:
        return '{"running": true, "port": 0, "url": "", "error": null}'
    
    @Slot(result=str)
    def apiServerRestart(self) -> str:
        return '{"running": true, "port": 0, "url": "", "error": null}'
    
    @Slot(result=str)
    def apiServerStop(self) -> str:
        return '{"running": false, "port": 0, "url": "", "error": null}'
    
    @Slot(str, result=str)
    def apiServerToggle(self, payload: str) -> str:
        return '{"running": false, "port": 0, "url": "", "error": null}'
    
    @Slot(str, result=str)
    def mcpCheckMcpConnectivity(self, server: str) -> str:
        return 'false'
    
    @Slot(str, result=str)
    def mcpStartServer(self, server: str) -> str:
        return 'false'
    
    @Slot(str, result=str)
    def mcpServerStatus(self, server: str) -> str:
        return '{"running": false, "pid": null}'
    
    @Slot(str, result=str)
    def mcpListTools(self, server: str) -> str:
        try:
            import json
            import asyncio
            import re
            from fastmcp import Client
            
            _log(f"[MCP] mcpListTools called with server: {str(server)[:200]}")
            server_config = json.loads(server) if isinstance(server, str) else server
            base_url = server_config.get('baseUrl', server_config.get('url', ''))
            
            _log(f"[MCP] Server baseUrl: {base_url}")
            if not base_url:
                _log(f"[MCP] No baseUrl found, returning empty list")
                return '[]'
            
            # 异步获取工具列表
            async def get_tools():
                try:
                    _log(f"[MCP] Creating FastMCP client for {base_url}")
                    # 使用 FastMCP 客户端
                    client = Client(base_url)
                    
                    async with client:
                        _log(f"[MCP] Calling client.list_tools()")
                        tools = await client.list_tools()
                        _log(f"[MCP] Got {len(tools) if tools else 0} tools from server")
                        if tools:
                            for i, tool in enumerate(tools[:3]):  # 只记录前3个工具
                                tool_name = getattr(tool, 'name', str(tool))
                                _log(f"[MCP] Tool {i+1}: {tool_name}")
                        return tools
                        
                except Exception as e:
                    import traceback
                    _log(f"[MCP] Error in get_tools: {str(e)}\n{traceback.format_exc()}")
                    return []
            
            # 运行异步函数 - 在已有事件循环中运行
            try:
                # 尝试获取当前事件循环
                loop = asyncio.get_running_loop()
                # 如果事件循环正在运行，使用线程池
                import concurrent.futures
                with concurrent.futures.ThreadPoolExecutor() as executor:
                    future = executor.submit(asyncio.run, get_tools())
                    tools = future.result()
            except RuntimeError:
                # 如果没有运行的事件循环，创建新的
                tools = asyncio.run(get_tools())
            
            if tools:
                # 转换为可序列化的格式
                # Cherry Studio 期望的工具格式需要包含 id, serverId, serverName, type 等字段
                server_id = server_config.get('id', '')
                server_name = server_config.get('name', server_config.get('baseUrl', 'unknown'))
                
                tools_data = []
                for tool in tools:
                    # 生成工具 ID（Cherry Studio 格式：serverName-toolName_serverIdSuffix）
                    tool_name = tool.name if hasattr(tool, 'name') else str(tool)
                    sanitized_server = server_name.strip().replace('-', '_')[:7]
                    sanitized_tool = tool_name.strip().replace('-', '_')
                    
                    # 生成 serverId 后缀（取最后6个字符）
                    server_id_suffix = ''
                    if server_id:
                        # 取最后6个字符，只保留字母数字
                        server_id_suffix = re.sub(r'[^a-zA-Z0-9]', '', server_id[-6:])
                        if not server_id_suffix:
                            # 如果都是非字母数字，使用简单哈希
                            hash_val = sum(ord(c) for c in server_id)
                            server_id_suffix = format(hash_val, 'x')[-6:] or 'x'
                    
                    # 组合工具 ID
                    if sanitized_server and not sanitized_tool.startswith(sanitized_server[:7]):
                        base_name = f"{sanitized_server[:7]}-{sanitized_tool}"
                    else:
                        base_name = sanitized_tool
                    
                    # 清理无效字符
                    base_name = ''.join(c if c.isalnum() or c in '_-' else '_' for c in base_name)
                    
                    # 确保以字母或下划线开头
                    if base_name and not base_name[0].isalpha():
                        base_name = f"tool_{base_name}"
                    
                    # 截断到合适长度（保留后缀空间）
                    max_base_len = 63 - (len(server_id_suffix) + 1 if server_id_suffix else 0)
                    if len(base_name) > max_base_len:
                        base_name = base_name[:max_base_len]
                    
                    # 添加后缀
                    if server_id_suffix:
                        tool_id = f"{base_name}_{server_id_suffix}"
                    else:
                        tool_id = base_name
                    
                    tools_data.append({
                        "id": tool_id,
                        "name": tool_name,
                        "description": getattr(tool, 'description', '') if hasattr(tool, 'description') else '',
                        "inputSchema": tool.inputSchema if hasattr(tool, 'inputSchema') else {},
                        "serverId": server_id,
                        "serverName": server_name,
                        "type": "mcp"
                    })
                _log(f"[MCP] Returning {len(tools_data)} tools with IDs: {[t['id'] for t in tools_data[:3]]}")
                return json.dumps(tools_data)
            else:
                _log(f"[MCP] No tools returned from server, returning empty list")
                return '[]'
            
        except ImportError:
            return '[]'
        except Exception:
            return '[]'
    
    @Slot(str, result=str)
    def mcpCallTool(self, payload: str) -> str:
        """调用 MCP 工具
        
        Args:
            payload: JSON 字符串，包含 {server, name, args, callId}
            
        Returns:
            JSON 字符串，包含工具调用结果
        """
        _log(f"[MCP] mcpCallTool called with payload: {str(payload)[:300]}")
        try:
            import json
            import asyncio
            from fastmcp import Client
            
            payload_obj = json.loads(payload) if isinstance(payload, str) else payload
            server_config = payload_obj.get('server', {})
            tool_name = payload_obj.get('name', '')
            tool_args = payload_obj.get('args', {})
            call_id = payload_obj.get('callId', '')
            
            _log(f"[MCP] Parsed - tool_name: {tool_name}, server: {server_config.get('name', 'unknown')}, args: {str(tool_args)[:200]}")
            
            if not tool_name:
                return json.dumps({
                    'isError': True,
                    'content': [{'type': 'text', 'text': 'Tool name is required'}]
                })
            
            base_url = server_config.get('baseUrl', server_config.get('url', ''))
            if not base_url:
                return json.dumps({
                    'isError': True,
                    'content': [{'type': 'text', 'text': 'Server baseUrl is required'}]
                })
            
            # 异步调用工具
            async def call_tool():
                try:
                    _log(f"[MCP] Calling tool: {tool_name} on {base_url} with args: {json.dumps(tool_args)}")
                    client = Client(base_url)
                    async with client:
                        result = await client.call_tool(tool_name, tool_args)
                        _log(f"[MCP] Tool call result type: {type(result)}, content: {str(result)[:200]}")
                        return result
                except Exception as e:
                    import traceback
                    error_detail = f"{str(e)}\n{traceback.format_exc()}"
                    _log(f"[MCP] Error calling tool {tool_name}: {error_detail}")
                    return {
                        'isError': True,
                        'content': [{'type': 'text', 'text': f'Error calling tool: {str(e)}'}]
                    }
            
            # 运行异步函数
            try:
                loop = asyncio.get_running_loop()
                import concurrent.futures
                with concurrent.futures.ThreadPoolExecutor() as executor:
                    future = executor.submit(asyncio.run, call_tool())
                    result = future.result()
            except RuntimeError:
                result = asyncio.run(call_tool())
            
            # 转换结果为标准格式
            if isinstance(result, dict) and 'isError' in result:
                _log(f"[MCP] Returning error result: {json.dumps(result)}")
                return json.dumps(result)
            
            # fastmcp 返回的结果格式可能是 content 数组或其他格式
            # 转换为 Cherry Studio 期望的格式
            if isinstance(result, dict):
                # 如果已经有 content 字段，直接返回
                if 'content' in result:
                    response = {
                        'isError': False,
                        'content': result.get('content', [])
                    }
                    _log(f"[MCP] Returning content dict result: {json.dumps(response)[:500]}")
                    return json.dumps(response)
                # 检查是否是 fastmcp 的标准响应格式
                # fastmcp 可能返回 {content: [...]} 格式
                if hasattr(result, 'content') or 'content' in result:
                    content = getattr(result, 'content', result.get('content', []))
                    response = {
                        'isError': False,
                        'content': content if isinstance(content, list) else [{'type': 'text', 'text': str(content)}]
                    }
                    _log(f"[MCP] Returning fastmcp content result: {json.dumps(response)[:500]}")
                    return json.dumps(response)
                # 否则尝试转换整个字典
                response = {
                    'isError': False,
                    'content': [{'type': 'text', 'text': json.dumps(result, ensure_ascii=False)}]
                }
                _log(f"[MCP] Returning converted dict result: {json.dumps(response)[:500]}")
                return json.dumps(response)
            elif isinstance(result, list):
                # 如果直接返回列表，假设是 content 数组
                response = {
                    'isError': False,
                    'content': result
                }
                _log(f"[MCP] Returning list result: {json.dumps(response)[:500]}")
                return json.dumps(response)
            else:
                # 其他类型，转换为文本
                response = {
                    'isError': False,
                    'content': [{'type': 'text', 'text': str(result)}]
                }
                _log(f"[MCP] Returning string result: {json.dumps(response)[:500]}")
                return json.dumps(response)
            
        except ImportError:
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': 'fastmcp is not installed'}]
            })
        except Exception as e:
            import traceback
            error_msg = f'Error in mcpCallTool: {str(e)}\n{traceback.format_exc()}'
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': error_msg}]
            })
    
    @Slot(str, result=str)
    def mcpListPrompts(self, server: str) -> str:
        return '[]'
    
    @Slot(str, result=str)
    def mcpListResources(self, server: str) -> str:
        return '[]'
    
    @Slot(str, result=str)
    def mcpGetServerVersion(self, server: str) -> str:
        return 'null'
    
    @Slot(str, result=str)
    def mcpRestartServer(self, server: str) -> str:
        return 'false'
    
    @Slot(str, result=str)
    def mcpStopServer(self, server: str) -> str:
        return 'false'
    
    @Slot(str, result=str)
    def mcpRemoveServer(self, server: str) -> str:
        return 'false'
    
    @Slot(result=str)
    def getVaults(self) -> str:
        return '[]'
    
    @Slot(str, result=str)
    def openWindow(self, config: str) -> str:
        return 'false'
    
    @Slot(str, result=str)
    def generateSignature(self, data: str) -> str:
        return 'null'
    
    @Slot(str, result=str)
    def saveData(self, data: str) -> str:
        return 'false'

