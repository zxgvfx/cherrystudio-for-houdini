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
            headers = config.get("headers", {})
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
    def mcpListTools(self, server: str) -> str:
        return '[]'
    
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

