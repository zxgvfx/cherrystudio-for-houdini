"""
Cherry Studio API 类
提供 JavaScript 调用的 Python 方法
"""

import os
import sys
import json
import threading
import queue
import zipfile
import tarfile
import shutil
import tempfile
import subprocess
import time
from pathlib import Path
from urllib import request as urllib_request, error as urllib_error
from PySide6.QtCore import QObject, Slot, Signal

from ..version import APP_VERSION, APP_PLATFORM, APP_ARCH
from .agent_server import AgentServer
from ..utils.logger import network_logger
from ..core.config_manager import config_manager

# 使用统一的日志模块
_log = network_logger


class MCPStdioClient:
    """MCP stdio transport 客户端
    
    通过 subprocess 启动 MCP 服务器进程，并通过 stdin/stdout 使用 JSON-RPC 协议通信
    """
    
    def __init__(self, command: str, args: list = None, env: dict = None, cwd: str = None):
        """初始化 MCP stdio 客户端
        
        Args:
            command: 要执行的命令（如 'npx', 'python', 'node' 等）
            args: 命令参数列表
            env: 环境变量字典
            cwd: 工作目录
        """
        self.command = command
        self.args = args or []
        self.env = env or {}
        self.cwd = cwd
        self.process = None
        self.request_id_counter = 0
        self.pending_requests = {}  # request_id -> (event, result_queue)
        self.lock = threading.Lock()
        self.reader_thread = None
        self._closed = False
        
    def _get_next_request_id(self) -> int:
        """获取下一个请求 ID"""
        with self.lock:
            self.request_id_counter += 1
            return self.request_id_counter
    
    def start(self):
        """启动 MCP 服务器进程"""
        if self.process is not None:
            return
        
        try:
            # 准备环境变量
            process_env = os.environ.copy()
            
            # 清理可能导致污染的环境变量
            keys_to_remove = ['PYTHONPATH', 'PYTHONHOME']
            for key in keys_to_remove:
                if key in process_env:
                    _log(f"[MCP Stdio] Removing potentially polluting env var: {key}={process_env[key]}")
                    del process_env[key]

            process_env.update(self.env)
            
            # 打印关键调试信息
            _log(f"[MCP Stdio] Starting process: {self.command} {self.args}")
            _log(f"[MCP Stdio] CWD: {self.cwd}")
            _log(f"[MCP Stdio] PATH: {process_env.get('PATH', 'Not Set')}")
            _log(f"[MCP Stdio] NPM_CONFIG_REGISTRY: {process_env.get('NPM_CONFIG_REGISTRY', 'Not Set')}")
            _log(f"[MCP Stdio] HTTP_PROXY: {process_env.get('HTTP_PROXY', process_env.get('http_proxy', 'Not Set'))}")
            _log(f"[MCP Stdio] HTTPS_PROXY: {process_env.get('HTTPS_PROXY', process_env.get('https_proxy', 'Not Set'))}")
            
            # 启动进程
            use_shell = False
            if os.name == 'nt' and self.command.lower().endswith(('.cmd', '.bat')):
                 use_shell = True
            
            self.process = subprocess.Popen(
                [self.command] + self.args,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env=process_env,
                cwd=self.cwd,
                bufsize=0,  # 无缓冲
                text=False,  # 使用二进制模式
                shell=use_shell if use_shell else False
            )
            
            # 启动读取线程
            self.reader_thread = threading.Thread(target=self._read_loop, daemon=True)
            self.reader_thread.start()

            # 启动 stderr 读取线程
            self.stderr_thread = threading.Thread(target=self._read_stderr_loop, daemon=True)
            self.stderr_thread.start()
            
            # 发送初始化请求
            self._initialize()
            
            _log(f"[MCP Stdio] Process started with PID: {self.process.pid}")
            
        except Exception as e:
            _log(f"[MCP Stdio] Failed to start process: {e}")
            raise
    
    def _initialize(self):
        """发送初始化请求"""
        init_request = {
            "jsonrpc": "2.0",
            "id": self._get_next_request_id(),
            "method": "initialize",
            "params": {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {
                    "name": "Cherry Studio",
                    "version": APP_VERSION
                }
            }
        }
        
        # 发送初始化请求并等待响应
        try:
            _log("[MCP Stdio] Sending initialize request...")
            # 初始化可能需要下载依赖，增加超时时间
            response = self._send_request(init_request, timeout=60.0)
            _log(f"[MCP Stdio] Initialized: {response}")
            
            # 发送 initialized 通知
            initialized_notification = {
                "jsonrpc": "2.0",
                "method": "notifications/initialized"
            }
            self._send_notification(initialized_notification)
            
        except Exception as e:
            _log(f"[MCP Stdio] Initialization failed: {e}")
            raise
    
    def _read_loop(self):
        """读取进程输出的循环"""
        buffer = b''
        try:
            while not self._closed and self.process and self.process.poll() is None:
                # 读取数据（可能不是完整行）
                chunk = self.process.stdout.read(4096)
                if not chunk:
                    if self.process.poll() is not None:
                        break
                    time.sleep(0.01)  # 短暂休眠避免 CPU 占用过高
                    continue
                
                buffer += chunk
                
                # 处理缓冲区中的完整行
                while b'\n' in buffer:
                    line, buffer = buffer.split(b'\n', 1)
                    if not line.strip():
                        continue
                    
                    try:
                        # 解码并解析 JSON
                        line_str = line.decode('utf-8').strip()
                        if not line_str:
                            continue
                        
                        message = json.loads(line_str)
                        self._handle_message(message)
                        
                    except json.JSONDecodeError as e:
                        _log(f"[MCP Stdio] Failed to parse JSON: {line_str[:200] if 'line_str' in locals() else line[:200]}, error: {e}")
                    except UnicodeDecodeError as e:
                        _log(f"[MCP Stdio] Failed to decode UTF-8: {e}")
                    except Exception as e:
                        _log(f"[MCP Stdio] Error handling message: {e}")
                        
        except Exception as e:
            _log(f"[MCP Stdio] Read loop error: {e}")
        finally:
            _log(f"[MCP Stdio] Read loop ended")
            # 进程结束时，取消所有挂起的请求，避免无限等待超时
            self._cancel_all_requests("Process terminated unexpectedly")
    
    def _read_stderr_loop(self):
        """读取进程 stderr 的循环"""
        try:
            while not self._closed and self.process and self.process.poll() is None:
                # 读取一行错误输出
                line = self.process.stderr.readline()
                if not line:
                    if self.process.poll() is not None:
                        break
                    continue
                
                try:
                    error_msg = line.decode('utf-8', errors='replace').strip()
                    if error_msg:
                        _log(f"[MCP Stdio] STDERR: {error_msg}")
                except Exception:
                    pass
                    
        except Exception as e:
            _log(f"[MCP Stdio] Stderr read loop error: {e}")
        finally:
            _log(f"[MCP Stdio] Stderr read loop ended")

    def _handle_message(self, message: dict):
        """处理收到的消息"""
        if 'id' in message:
            # 这是一个响应
            request_id = message['id']
            with self.lock:
                if request_id in self.pending_requests:
                    event, result_queue = self.pending_requests.pop(request_id)
                    result_queue.put(message)
                    event.set()
        else:
            # 这是一个通知（如日志、进度等）
            method = message.get('method', '')
            if method.startswith('notifications/'):
                _log(f"[MCP Stdio] Notification: {method}")
            else:
                _log(f"[MCP Stdio] Unknown notification: {message}")
    
    def _send_notification(self, notification: dict):
        """发送通知（不需要响应）"""
        if not self.process or self.process.poll() is not None:
            raise RuntimeError("Process is not running")
        
        try:
            message = json.dumps(notification) + '\n'
            self.process.stdin.write(message.encode('utf-8'))
            self.process.stdin.flush()
        except Exception as e:
            _log(f"[MCP Stdio] Failed to send notification: {e}")
            raise
    
    def _send_request(self, request: dict, timeout: float = 30.0) -> dict:
        """发送请求并等待响应"""
        if not self.process or self.process.poll() is not None:
            raise RuntimeError("Process is not running")
        
        request_id = request.get('id')
        if request_id is None:
            request_id = self._get_next_request_id()
            request['id'] = request_id
        
        # 创建等待事件和结果队列
        event = threading.Event()
        result_queue = queue.Queue()
        
        with self.lock:
            self.pending_requests[request_id] = (event, result_queue)
        
        try:
            # 发送请求
            message = json.dumps(request) + '\n'
            self.process.stdin.write(message.encode('utf-8'))
            self.process.stdin.flush()
            
            # 等待响应
            if event.wait(timeout):
                response = result_queue.get(timeout=1.0)
                
                # 检查错误
                if 'error' in response:
                    error = response['error']
                    raise RuntimeError(f"MCP error: {error.get('message', 'Unknown error')} (code: {error.get('code', 'unknown')})")
                
                return response.get('result', {})
            else:
                raise TimeoutError(f"Request timeout after {timeout}s")
                
        finally:
            with self.lock:
                self.pending_requests.pop(request_id, None)
    
    def _cancel_all_requests(self, reason: str):
        """取消所有挂起的请求"""
        with self.lock:
            for request_id, (event, result_queue) in self.pending_requests.items():
                # 发送错误信息到队列
                result_queue.put({'error': {'code': -32000, 'message': reason}})
                event.set()
            self.pending_requests.clear()

    def list_tools(self) -> list:
        """列出可用工具"""
        request = {
            "jsonrpc": "2.0",
            "id": self._get_next_request_id(),
            "method": "tools/list"
        }
        
        try:
            # 内网环境或者初次加载可能较慢，增加超时时间到 120 秒
            _log("[MCP Stdio] Requesting tools/list...")
            response = self._send_request(request, timeout=120.0)
            tools = response.get('tools', [])
            _log(f"[MCP Stdio] Listed {len(tools)} tools")
            return tools
        except TimeoutError:
            _log("[MCP Stdio] Timeout waiting for tools/list response (120s)")
            raise
        except Exception as e:
            _log(f"[MCP Stdio] Error listing tools: {e}")
            raise
    
    def call_tool(self, name: str, arguments: dict) -> dict:
        """调用工具"""
        request = {
            "jsonrpc": "2.0",
            "id": self._get_next_request_id(),
            "method": "tools/call",
            "params": {
                "name": name,
                "arguments": arguments
            }
        }
        
        response = self._send_request(request, timeout=60.0)
        _log(f"[MCP Stdio] Tool call result: {response.get('content', [])[:100]}")
        return response
    
    def close(self):
        """关闭连接"""
        self._closed = True
        
        if self.process:
            try:
                self.process.terminate()
                try:
                    self.process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    self.process.kill()
                    self.process.wait()
            except Exception as e:
                _log(f"[MCP Stdio] Error closing process: {e}")
            finally:
                self.process = None
    
    def __enter__(self):
        self.start()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()


# MCP stdio 客户端连接池
_mcp_stdio_clients = {}
_mcp_stdio_clients_lock = threading.Lock()


def _get_mcp_stdio_client_key(server_config: dict) -> str:
    """生成服务器配置的唯一键"""
    import hashlib
    key_data = json.dumps({
        'command': server_config.get('command'),
        'args': server_config.get('args', []),
        'cwd': server_config.get('dxtPath')
    }, sort_keys=True)
    return hashlib.md5(key_data.encode()).hexdigest()


def _find_command_path(command: str) -> str:
    """查找命令的完整路径"""
    if os.path.sep in command or (os.name == 'nt' and ':' in command):
        # 已经是完整路径
        return command
    
    # 尝试在 PATH 中查找
    import shutil
    path = shutil.which(command)
    if path:
        # 如果找到的是 uv.exe 或 uv，将其目录添加到 PATH
        # 这样后续就可以调用 npx 或 uvx 了
        if command.lower() in ('uv', 'uv.exe'):
            uv_dir = os.path.dirname(path)
            current_path = os.environ.get('PATH', '')
            if uv_dir not in current_path:
                # 将 uv 目录添加到 PATH 的最前面，优先使用
                os.environ['PATH'] = uv_dir + os.pathsep + current_path
                _log(f"[_find_command_path] Added uv directory to PATH: {uv_dir}")
        # 如果找到的是 node.exe、node、npm 或 npx，将其目录添加到 PATH
        # 这样后续就可以调用 npm 或 npx 了
        elif command.lower() in ('node', 'node.exe', 'npm', 'npm.cmd', 'npx', 'npx.cmd'):
            node_dir = os.path.dirname(path)
            current_path = os.environ.get('PATH', '')
            if node_dir not in current_path:
                # 将 node/npm/npx 目录添加到 PATH 的最前面，优先使用
                os.environ['PATH'] = node_dir + os.pathsep + current_path
                _log(f"[_find_command_path] Added {command} directory to PATH: {node_dir}")
        # 如果找到的是 bun.exe、bun 或 bunx，将其目录添加到 PATH
        # 这样后续就可以调用 bunx 了
        elif command.lower() in ('bun', 'bun.exe', 'bunx', 'bunx.cmd'):
            bun_dir = os.path.dirname(path)
            current_path = os.environ.get('PATH', '')
            if bun_dir not in current_path:
                # 将 bun 目录添加到 PATH 的最前面，优先使用
                os.environ['PATH'] = bun_dir + os.pathsep + current_path
                _log(f"[_find_command_path] Added bun directory to PATH: {bun_dir}")
        return path
    
    # 如果找不到，返回原命令（让系统处理）
    return command


def _get_or_create_mcp_stdio_client(server_config: dict) -> MCPStdioClient:
    """获取或创建 MCP stdio 客户端"""
    key = _get_mcp_stdio_client_key(server_config)
    
    with _mcp_stdio_clients_lock:
        if key not in _mcp_stdio_clients:
            command = server_config.get('command', '')
            args = server_config.get('args', [])
            env = server_config.get('env', {})
            cwd = server_config.get('dxtPath')
            
            # 处理 npx 命令
            if command == 'npx':
                # 尝试查找 npx，如果找不到则尝试使用 node
                npx_path = _find_command_path('npx')
                if npx_path and npx_path != 'npx':
                    command = npx_path
                else:
                    # 如果找不到 npx，尝试使用 node 直接执行
                    # 对于 @mcpmarket/mcp-auto-install，可能需要调整参数
                    node_path = _find_command_path('node')
                    if node_path and node_path != 'node':
                        # 使用 node 执行 npx 脚本
                        # 注意：这可能需要调整，取决于具体的 MCP 服务器
                        command = node_path
                        # 如果第一个参数是包名，可能需要特殊处理
                        if args and args[0].startswith('@'):
                            # 对于 npm 包，可能需要使用不同的方式
                            _log(f"[MCP Stdio] Warning: npx not found, using node. This may not work for all packages.")
            
            # 查找命令路径
            command = _find_command_path(command)
            
            # Windows 下处理 .cmd/.bat 文件
            if os.name == 'nt' and command.lower().endswith(('.cmd', '.bat')):
                # 如果是批处理文件，必须通过 cmd /c 执行，否则 subprocess 可能无法启动
                args = ['/c', command] + args
                command = 'cmd.exe'
                _log(f"[MCP Stdio] Wrapped command with cmd.exe /c for batch file")
            
            print(f"[MCP Stdio] Found command path: {command}")
            client = MCPStdioClient(command, args, env, cwd)
            client.start()
            _mcp_stdio_clients[key] = client
            _log(f"[MCP Stdio] Created new client for key: {key}, command: {command}")
        
        return _mcp_stdio_clients[key]


class CherryStudioAPI(QObject):
    """Cherry Studio API 类，提供 JavaScript 调用的 Python 方法"""
    
    _zoom_factor = 1.0
    
    # 流式响应缓冲区 (request_id -> queue)
    _stream_buffers = {}
    _stream_locks = {}
    
    # Agent 服务器实例
    _agent_server: AgentServer = None
    _agent_server_lock = threading.Lock()
    
    def __init__(self, parent=None):
        super().__init__(parent)
        # 移除自动启动线程
    
    def _auto_start_agent_server(self):
        """自动启动 Agent Server"""
        pass
            
    # ========== 基础系统 API ==========
    
    @Slot(result=bool)
    def startDrag(self) -> bool:
        """开始拖拽窗口（由前端调用）"""
        try:
            if self.parent():
                parent_widget = self.parent()
                if parent_widget.metaObject().className() == "WebContainer":
                     parent_widget = parent_widget.parent()
                
                if parent_widget:
                    # 获取当前鼠标位置
                    from PySide6.QtGui import QCursor
                    # 发送非客户区鼠标按下消息（Windows特定的）
                    # 或者使用 Qt 的 window().windowHandle().startSystemMove()
                    window_handle = parent_widget.windowHandle()
                    if window_handle:
                        return window_handle.startSystemMove()
            return False
        except Exception as e:
            _log(f"startDrag error: {e}")
            return False

    @Slot(result=bool)
    def minimize(self) -> bool:
        """最小化窗口"""
        try:
            if self.parent():
                parent_widget = self.parent()
                # 检查是否是 WebContainer，如果是则获取其父级（主窗口）
                if parent_widget.metaObject().className() == "WebContainer":
                     parent_widget = parent_widget.parent()
                
                # 兼容 QWidget 和 QMainWindow
                if parent_widget:
                    parent_widget.showMinimized()
                    return True
            return False
        except Exception as e:
            _log(f"minimize error: {e}")
            return False

    @Slot(result=bool)
    def maximize(self) -> bool:
        """最大化窗口"""
        try:
            if self.parent():
                parent_widget = self.parent()
                if parent_widget.metaObject().className() == "WebContainer":
                     parent_widget = parent_widget.parent()
                
                if parent_widget:
                    if parent_widget.isMaximized():
                        parent_widget.showNormal()
                    else:
                        parent_widget.showMaximized()
                    return True
            return False
        except Exception as e:
            _log(f"maximize error: {e}")
            return False

    @Slot(result=bool)
    def unmaximize(self) -> bool:
        """还原窗口"""
        try:
            if self.parent():
                parent_widget = self.parent()
                if parent_widget.metaObject().className() == "WebContainer":
                     parent_widget = parent_widget.parent()
                
                if parent_widget:
                    parent_widget.showNormal()
                    return True
            return False
        except Exception as e:
            _log(f"unmaximize error: {e}")
            return False

    @Slot(result=bool)
    def closeWindow(self) -> bool:
        """关闭窗口"""
        try:
            if self.parent():
                parent_widget = self.parent()
                if parent_widget.metaObject().className() == "WebContainer":
                     parent_widget = parent_widget.parent()
                
                if parent_widget:
                    parent_widget.close()
                    return True
            return False
        except Exception as e:
            _log(f"closeWindow error: {e}")
            return False
    
    @Slot(result=str)
    def getAppVersion(self) -> str:
        """获取应用版本"""
        return APP_VERSION
    
    @Slot(result=str)
    def getPlatform(self) -> str:
        """获取平台信息"""
        return APP_PLATFORM
    
    @Slot(result=str)
    def getArch(self) -> str:
        """获取架构信息"""
        return APP_ARCH
    
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
        # 获取项目根目录（cherrystudio 目录的父目录）
        current_file = os.path.abspath(__file__)
        cherrystudio_dir = os.path.dirname(os.path.dirname(current_file))  # cherrystudio 目录
        project_root = os.path.dirname(cherrystudio_dir)  # 项目根目录
        
        # resources 目录路径
        resources_path = os.path.join(project_root, "resources")
        
        # files 目录路径（用户数据目录）
        files_path = self._get_app_data_dir()
        
        return json.dumps({
            "version": APP_VERSION,
            "platform": APP_PLATFORM,
            "arch": APP_ARCH,
            "resourcesPath": resources_path,
            "filesPath": files_path,
            "isPackaged": False  # 对于 Houdini 版本，通常不是打包版本
        })
    
    @Slot(str, result=str)
    def getDiskInfo(self, path: str) -> str:
        """获取磁盘信息"""
        return '{"total":1000000000,"free":500000000}'
    
    @Slot(str, result=bool)
    def logToMain(self, payload: str) -> bool:
        """
        日志记录（静默到文件）
        接受 JSON 字符串，包含 source, level, message, data
        """
        try:
            payload_obj = json.loads(payload) if isinstance(payload, str) else payload
            
            # 兼容两种调用方式：
            # 1. 新方式：单个 JSON 对象 {source, level, message, data}
            # 2. 旧方式：四个独立参数 (source, level, message, data)
            if isinstance(payload_obj, dict):
                source_obj = payload_obj.get('source', {})
                level = payload_obj.get('level', 0)
                message = payload_obj.get('message', '')
                data = payload_obj.get('data', [])
            else:
                # 旧方式：尝试解析为数组
                if isinstance(payload_obj, list) and len(payload_obj) >= 3:
                    source_obj = payload_obj[0] if isinstance(payload_obj[0], dict) else {'module': str(payload_obj[0])}
                    level = payload_obj[1] if len(payload_obj) > 1 else 0
                    message = payload_obj[2] if len(payload_obj) > 2 else ''
                    data = payload_obj[3] if len(payload_obj) > 3 else []
                else:
                    # 无法解析，直接记录
                    _log(f"[Unknown] {str(payload)[:200]}")
                    return True
            
            # 提取 source 信息
            if isinstance(source_obj, dict):
                module = source_obj.get('module', '')
                window = source_obj.get('window', '')
                process = source_obj.get('process', 'renderer')
                source_str = f"{process}:{window}:{module}" if module else f"{process}:{window}"
            else:
                source_str = str(source_obj)
            
            # 格式化日志消息
            log_msg = f"[{source_str}] [{level}] {message}"
            if data:
                try:
                    data_str = json.dumps(data, ensure_ascii=False)[:200]
                    log_msg += f" | Data: {data_str}"
                except:
                    log_msg += f" | Data: {str(data)[:200]}"
            
            _log(log_msg)
            return True
        except Exception as e:
            # 如果解析失败，直接记录原始内容
            _log(f"[LogToMain] Error parsing log: {str(e)} | Raw: {str(payload)[:200]}")
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
        """
        检查二进制文件是否存在
        优先检查 'J:/vfxtools/piplineTD/models/packages/bin' 目录，如果没找到再检查系统 PATH
        这样既能识别应用安装的版本，也能识别系统已有的版本
        如果找到 uv.exe 或 uv，会将其目录添加到 PATH，以便后续可以调用 npx 或 uvx
        如果找到 node.exe 或 node，会将其目录添加到 PATH，以便后续可以调用 npm 或 npx
        """
        try:
            from shutil import which
            from pathlib import Path
            
            # 优先检查 'J:/vfxtools/piplineTD/models/packages/bin' 目录
            home_dir = Path.home()
            bin_dir = Path('J:/vfxtools/piplineTD/models/packages/bin')
            
            if bin_dir.exists():
                # Windows 使用 .exe 扩展名
                if os.name == 'nt':
                    binary_exe = bin_dir / f'{binary}.exe'
                    if binary_exe.exists() and binary_exe.is_file():
                        # 如果找到的是 uv.exe，将其目录添加到 PATH
                        if binary.lower() == 'uv':
                            uv_dir = str(bin_dir)
                            current_path = os.environ.get('PATH', '')
                            if uv_dir not in current_path:
                                os.environ['PATH'] = uv_dir + os.pathsep + current_path
                                _log(f"[isBinaryExist] Added uv directory to PATH: {uv_dir}")
                        # 如果找到的是 node.exe、npm 或 npx，将其目录添加到 PATH
                        # 这样后续就可以调用 npm 或 npx 了
                        elif binary.lower() in ('node', 'npm', 'npx'):
                            node_dir = str(bin_dir)
                            current_path = os.environ.get('PATH', '')
                            if node_dir not in current_path:
                                os.environ['PATH'] = node_dir + os.pathsep + current_path
                                _log(f"[isBinaryExist] Added {binary} directory to PATH: {node_dir}")
                        # 如果找到的是 bun.exe、bun 或 bunx，将其目录添加到 PATH
                        # 这样后续就可以调用 bunx 了
                        elif binary.lower() in ('bun', 'bunx'):
                            bun_dir = str(bin_dir)
                            current_path = os.environ.get('PATH', '')
                            if bun_dir not in current_path:
                                os.environ['PATH'] = bun_dir + os.pathsep + current_path
                                _log(f"[isBinaryExist] Added {binary} directory to PATH: {bun_dir}")
                        return True
                else:
                    binary_path = bin_dir / binary
                    if binary_path.exists() and binary_path.is_file():
                        # 检查是否有执行权限
                        if os.access(binary_path, os.X_OK):
                            # 如果找到的是 uv，将其目录添加到 PATH
                            if binary.lower() == 'uv':
                                uv_dir = str(bin_dir)
                                current_path = os.environ.get('PATH', '')
                                if uv_dir not in current_path:
                                    os.environ['PATH'] = uv_dir + os.pathsep + current_path
                                    _log(f"[isBinaryExist] Added uv directory to PATH: {uv_dir}")
                            # 如果找到的是 node、npm 或 npx，将其目录添加到 PATH
                            # 这样后续就可以调用 npm 或 npx 了
                            elif binary.lower() in ('node', 'npm', 'npx'):
                                node_dir = str(bin_dir)
                                current_path = os.environ.get('PATH', '')
                                if node_dir not in current_path:
                                    os.environ['PATH'] = node_dir + os.pathsep + current_path
                                    _log(f"[isBinaryExist] Added {binary} directory to PATH: {node_dir}")
                            # 如果找到的是 bun 或 bunx，将其目录添加到 PATH
                            elif binary.lower() in ('bun', 'bunx'):
                                bun_dir = str(bin_dir)
                                current_path = os.environ.get('PATH', '')
                                if bun_dir not in current_path:
                                    os.environ['PATH'] = bun_dir + os.pathsep + current_path
                                    _log(f"[isBinaryExist] Added {binary} directory to PATH: {bun_dir}")
                            return True
            
            # 如果 bin 目录中没有，检查系统 PATH
            path = which(binary)
            if path:
                # 如果找到的是 uv.exe 或 uv，将其目录添加到 PATH
                if binary.lower() in ('uv', 'uv.exe'):
                    uv_dir = os.path.dirname(path)
                    current_path = os.environ.get('PATH', '')
                    if uv_dir not in current_path:
                        os.environ['PATH'] = uv_dir + os.pathsep + current_path
                        _log(f"[isBinaryExist] Added uv directory to PATH: {uv_dir}")
                # 如果找到的是 node.exe、node、npm 或 npx，将其目录添加到 PATH
                # 这样后续就可以调用 npm 或 npx 了
                elif binary.lower() in ('node', 'node.exe', 'npm', 'npm.cmd', 'npx', 'npx.cmd'):
                    node_dir = os.path.dirname(path)
                    current_path = os.environ.get('PATH', '')
                    if node_dir not in current_path:
                        os.environ['PATH'] = node_dir + os.pathsep + current_path
                        _log(f"[isBinaryExist] Added {binary} directory to PATH: {node_dir}")
                # 如果找到的是 bun.exe、bun 或 bunx，将其目录添加到 PATH
                elif binary.lower() in ('bun', 'bun.exe', 'bunx', 'bunx.cmd'):
                    bun_dir = os.path.dirname(path)
                    current_path = os.environ.get('PATH', '')
                    if bun_dir not in current_path:
                        os.environ['PATH'] = bun_dir + os.pathsep + current_path
                        _log(f"[isBinaryExist] Added {binary} directory to PATH: {bun_dir}")
                return True
            
            return False
        except Exception as e:
            _log(f"isBinaryExist error for {binary}: {e}")
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
    
    @Slot(str, result=bool)
    def openPath(self, path: str) -> bool:
        """
        打开文件或文件夹路径
        类似于 Electron 的 shell.openPath
        """
        try:
            if not path or not isinstance(path, str):
                return False
            
            # 规范化路径
            path = os.path.abspath(os.path.expanduser(path))
            
            # 检查路径是否存在
            if not os.path.exists(path):
                _log(f"openPath: Path does not exist: {path}")
                return False
            
            # 使用平台特定的方式打开
            if os.name == 'nt':  # Windows
                os.startfile(path)
            elif sys.platform == 'darwin':  # macOS
                import subprocess
                subprocess.run(['open', path], check=False)
            else:  # Linux
                import subprocess
                subprocess.run(['xdg-open', path], check=False)
            
            return True
        except Exception as e:
            _log(f"openPath error: {e}")
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
    
    @Slot(result=str)
    def selectFolder(self) -> str:
        """显示文件夹选择对话框"""
        try:
            from PySide6.QtWidgets import QFileDialog, QApplication
            app = QApplication.instance()
            if not app:
                return ""
            
            folder_path = QFileDialog.getExistingDirectory(
                None,
                "选择文件夹",
                "",
                QFileDialog.ShowDirsOnly | QFileDialog.DontResolveSymlinks
            )
            return folder_path if folder_path else ""
        except Exception as e:
            _log(f"Error in selectFolder: {e}")
            return ""
    
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
        
        # 使用用户主目录下的 .cherrystudio 目录
        self._app_data_dir = os.path.join(os.path.expanduser("~"), ".cherrystudio")
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
            req.add_header('User-Agent', 'Cherry Studio/1.0')
            
            # 先添加所有传入的 headers（包括认证信息）
            for key, value in headers.items():
                try:
                    # 跳过空值
                    if value is None or value == '':
                        continue
                    req.add_header(str(key), str(value))
                except Exception as e:
                    _log(f"[fetchProxy] Failed to add header {key}: {e}")
                    continue
            
            # 只有在没有 Content-Type 且有 body 时才添加默认的 Content-Type
            has_content_type = any(k.lower() == 'content-type' for k in headers.keys())
            if body_bytes and not has_content_type:
                req.add_header('Content-Type', 'application/json')
            
            # 调试：记录认证相关的 headers（隐藏敏感信息）
            auth_headers = {k: v for k, v in headers.items() 
                          if 'auth' in k.lower() or 'key' in k.lower() or 'token' in k.lower()}
            if auth_headers:
                safe_auth = {k: (v[:20] + '...' if len(str(v)) > 20 else '***') 
                           for k, v in auth_headers.items()}
                _log(f"[fetchProxy] Request headers (auth): {json.dumps(safe_auth)}")
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
            
            # 特殊处理 401 错误，提供更详细的错误信息
            if e.code == 401:
                _log(f"[fetchProxy] 401 Unauthorized for {url}")
                # 记录请求 headers（隐藏敏感信息）
                safe_headers = {k: '***' if any(x in k.lower() for x in ['auth', 'key', 'token', 'secret']) else v 
                              for k, v in headers.items()}
                _log(f"[fetchProxy] Request headers: {json.dumps(safe_headers)}")
                _log(f"[fetchProxy] Error response: {error_body[:500]}")
            
            result = {
                "status": e.code,
                "statusText": getattr(e, "reason", ""),
                "headers": dict(e.headers.items()) if getattr(e, "headers", None) else {},
                "body": error_body,
                "error": f"HTTP {e.code}: {getattr(e, 'reason', 'Unknown error')}"
            }
            if e.code == 401:
                result["error"] = "Authentication failed. Please check your API key or authentication settings."
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
                req.add_header('User-Agent', 'Cherry Studio')
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
            req.add_header('User-Agent', 'Cherry Studio')
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
            req.add_header('User-Agent', 'Cherry Studio')
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
    
    @Slot(str, result=str)
    def agentMessageGetHistory(self, payload: str) -> str:
        """获取 Agent 消息历史"""
        return '[]'

    @Slot(str, result=bool)
    def agentMessagePersistExchange(self, payload: str) -> bool:
        """持久化 Agent 消息"""
        return True

    @Slot(result=str)
    def getInstallInfo(self) -> str:
        return json.dumps({
            "installed": True,
            "version": APP_VERSION,
        })
    
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
    
    def _load_providers_from_localstorage(self) -> list:
        """从 localStorage.json 加载 providers 配置"""
        try:
            storage_path = os.path.join(self._get_app_data_dir(), 'localStorage.json')
            if not os.path.exists(storage_path):
                return []
            
            with open(storage_path, 'r', encoding='utf-8') as f:
                storage_data = json.load(f)
            
            # 查找 providers 配置
            providers_str = storage_data.get('providers', '[]')
            if isinstance(providers_str, str):
                providers = json.loads(providers_str)
            else:
                providers = providers_str
            
            if not isinstance(providers, list):
                return []
            
            # 过滤有效的 providers（需要有 apiKey）
            valid_providers = []
            for provider in providers:
                if isinstance(provider, dict) and provider.get('apiKey'):
                    valid_providers.append(provider)
            
            return valid_providers
            
        except Exception as e:
            _log(f"Error loading providers from localStorage: {e}")
            return []
    
    def _get_api_server_config(self) -> dict:
        """从 localStorage 获取 API Server 配置"""
        try:
            storage_path = os.path.join(self._get_app_data_dir(), 'localStorage.json')
            if not os.path.exists(storage_path):
                return {"host": "127.0.0.1", "port": 0, "apiKey": "default-key", "enabled": False}
            
            with open(storage_path, 'r', encoding='utf-8') as f:
                storage_data = json.load(f)
            
            # 查找 apiServer 配置
            api_server_str = storage_data.get('apiServer', '{}')
            if isinstance(api_server_str, str):
                api_server = json.loads(api_server_str)
            else:
                api_server = api_server_str
            
            if not isinstance(api_server, dict):
                api_server = {}
            
            # 返回默认值或配置值
            return {
                "host": api_server.get("host", "127.0.0.1"),
                "port": api_server.get("port", 0),
                "apiKey": api_server.get("apiKey", "default-key"),
                "enabled": api_server.get("enabled", False)
            }
        except Exception as e:
            _log(f"Error loading apiServer config: {e}")
            return {"host": "127.0.0.1", "port": 0, "apiKey": "default-key", "enabled": False}
    
    @Slot(result=str)
    def apiServerStatus(self) -> str:
        """获取 API 服务器状态"""
        try:
            config = self._get_api_server_config()
            with CherryStudioAPI._agent_server_lock:
                if CherryStudioAPI._agent_server and CherryStudioAPI._agent_server.is_running():
                    port = CherryStudioAPI._agent_server.get_port()
                    # 更新配置中的实际端口
                    config["port"] = port
                    return json.dumps({
                        "running": True,
                        "config": config
                    })
                else:
                    return json.dumps({
                        "running": False,
                        "config": None
                    })
        except Exception as e:
            _log(f"apiServerStatus error: {e}")
            return json.dumps({
                "running": False,
                "config": None
            })
    
    @Slot(str, result=str)
    def apiServerConfigure(self, config: str) -> str:
        """配置 API 服务器（暂不实现）"""
        return '{"success": true}'
    
    @Slot(result=str)
    def apiServerStart(self) -> str:
        """启动 API 服务器"""
        print("[apiServerStart] Called")  # 直接输出到终端
        _log("[apiServerStart] Called")
        try:
            with CherryStudioAPI._agent_server_lock:
                # 如果已经运行，返回当前状态
                if CherryStudioAPI._agent_server and CherryStudioAPI._agent_server.is_running():
                    port = CherryStudioAPI._agent_server.get_port()
                    print(f"[apiServerStart] Server already running on port {port}")
                    _log(f"[apiServerStart] Server already running on port {port}")
                    return json.dumps({
                        "running": True,
                        "port": port,
                        "url": f"http://127.0.0.1:{port}",
                        "error": None
                    })
                
                print("[apiServerStart] Attempting to start Agent Server...")
                _log("[apiServerStart] Attempting to start Agent Server...")
                # 创建并启动服务器
                providers_loader = self._load_providers_from_localstorage
                CherryStudioAPI._agent_server = AgentServer(providers_loader=providers_loader)
                
                # 尝试启动 - 使用动态端口
                try:
                    print("[apiServerStart] Calling AgentServer.start()...")
                    _log("[apiServerStart] Calling AgentServer.start()...")
                    success, port = CherryStudioAPI._agent_server.start(host='127.0.0.1', port=0)  # 使用动态端口
                    print(f"[apiServerStart] AgentServer.start() returned: success={success}, port={port}")
                    _log(f"[apiServerStart] AgentServer.start() returned: success={success}, port={port}")
                except Exception as start_err:
                    import traceback
                    err_msg = f"[apiServerStart] AgentServer.start exception: {str(start_err)}\n{traceback.format_exc()}"
                    _log(err_msg)
                    return json.dumps({
                        "running": False,
                        "port": 0,
                        "url": "",
                        "error": str(start_err)
                    })
                
                if success:
                    _log(f"[apiServerStart] ✓ Agent server started successfully on port {port}")
                    return json.dumps({
                        "running": True,
                        "port": port,
                        "url": f"http://127.0.0.1:{port}",
                        "error": None
                    })
                else:
                    _log("[apiServerStart] ✗ AgentServer.start returned False")
                    return json.dumps({
                        "running": False,
                        "port": 0,
                        "url": "",
                        "error": "Failed to start server (unknown reason)"
                    })
                    
        except Exception as e:
            import traceback
            err_msg = f"apiServerStart outer exception: {str(e)}\n{traceback.format_exc()}"
            _log(err_msg)
            return json.dumps({
                "running": False,
                "port": 0,
                "url": "",
                "error": str(e)
            })
    
    @Slot(result=str)
    def apiServerRestart(self) -> str:
        """重启 API 服务器"""
        try:
            with CherryStudioAPI._agent_server_lock:
                # 先停止
                if CherryStudioAPI._agent_server:
                    CherryStudioAPI._agent_server.stop()
                    CherryStudioAPI._agent_server = None
                
                # 再启动
                providers_loader = self._load_providers_from_localstorage
                CherryStudioAPI._agent_server = AgentServer(providers_loader=providers_loader)
                success, port = CherryStudioAPI._agent_server.start(host='127.0.0.1', port=0)
                
                if success:
                    return json.dumps({
                        "running": True,
                        "port": port,
                        "url": f"http://127.0.0.1:{port}",
                        "error": None
                    })
                else:
                    return json.dumps({
                        "running": False,
                        "port": 0,
                        "url": "",
                        "error": "Failed to restart server"
                    })
                    
        except Exception as e:
            _log(f"apiServerRestart error: {e}")
            return json.dumps({
                "running": False,
                "port": 0,
                "url": "",
                "error": str(e)
            })
    
    @Slot(result=str)
    def apiServerStop(self) -> str:
        """停止 API 服务器"""
        try:
            with CherryStudioAPI._agent_server_lock:
                if CherryStudioAPI._agent_server:
                    CherryStudioAPI._agent_server.stop()
                    CherryStudioAPI._agent_server = None
                
                return json.dumps({
                    "running": False,
                    "port": 0,
                    "url": "",
                    "error": None
                })
        except Exception as e:
            _log(f"apiServerStop error: {e}")
            return json.dumps({
                "running": False,
                "port": 0,
                "url": "",
                "error": str(e)
            })
    
    # ==================== Agent API Proxy ====================
    # 通过 QWebChannel 代理 Agent API 请求，避免 file:// 协议的 CORS 限制
    
    @Slot(str, result=str)
    def agentApiProxy(self, request_json: str) -> str:
        """代理 Agent API 请求
        
        Args:
            request_json: JSON 字符串，包含 {method, path, body, headers}
            
        Returns:
            JSON 字符串，包含 API 响应
        """
        try:
            request = json.loads(request_json)
            method = request.get('method', 'GET').upper()
            path = request.get('path', '')
            body = request.get('body')
            
            print(f"[agentApiProxy] {method} {path}")
            
            with CherryStudioAPI._agent_server_lock:
                if not CherryStudioAPI._agent_server or not CherryStudioAPI._agent_server.is_running():
                    return json.dumps({'error': 'Agent server not running', 'status': 503})
            
            # 获取服务器端口
            port = CherryStudioAPI._agent_server.get_port()
            url = f"http://127.0.0.1:{port}{path}"
            
            import urllib.request
            import urllib.error
            
            # 创建请求
            req_data = json.dumps(body).encode('utf-8') if body else None
            req = urllib.request.Request(url, data=req_data, method=method)
            req.add_header('Content-Type', 'application/json')
            req.add_header('Authorization', 'Bearer internal')
            
            try:
                with urllib.request.urlopen(req, timeout=30.0) as resp:
                    response_data = resp.read().decode('utf-8')
                    return response_data
            except urllib.error.HTTPError as e:
                error_body = e.read().decode('utf-8') if e.fp else ''
                return json.dumps({'error': error_body or str(e), 'status': e.code})
            except urllib.error.URLError as e:
                return json.dumps({'error': str(e.reason), 'status': 503})
                
        except Exception as e:
            import traceback
            print(f"[agentApiProxy] Error: {e}\n{traceback.format_exc()}")
            return json.dumps({'error': str(e), 'status': 500})
    
    @Slot(str, result=str)
    def apiServerToggle(self, payload: str) -> str:
        """切换 API 服务器状态"""
        try:
            with CherryStudioAPI._agent_server_lock:
                if CherryStudioAPI._agent_server and CherryStudioAPI._agent_server.is_running():
                    return self.apiServerStop()
                else:
                    return self.apiServerStart()
        except Exception as e:
            _log(f"apiServerToggle error: {e}")
            return json.dumps({
                "running": False,
                "port": 0,
                "url": "",
                "error": str(e)
            })
    
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
            server_name = server_config.get('name', '')
            command = server_config.get('command', '')
            
            _log(f"[MCP] Server name: {server_name}, baseUrl: {base_url}, command: {command}")
            
            # 检查是否是使用 stdio transport 的服务器（通过 command 启动）
            if not base_url and command:
                _log(f"[MCP] Server uses stdio transport (command: {command}), attempting to connect...")
                try:
                    # 使用 stdio transport 客户端
                    client = _get_or_create_mcp_stdio_client(server_config)
                    tools = client.list_tools()
                    
                    if tools:
                        # 转换为可序列化的格式
                        server_id = server_config.get('id', '')
                        server_name = server_config.get('name', 'unknown')
                        
                        tools_data = []
                        for tool in tools:
                            tool_name = tool.get('name', '') if isinstance(tool, dict) else getattr(tool, 'name', str(tool))
                            sanitized_server = server_name.strip().replace('-', '_')[:7]
                            sanitized_tool = tool_name.strip().replace('-', '_')
                            
                            # 生成 serverId 后缀
                            server_id_suffix = ''
                            if server_id:
                                server_id_suffix = re.sub(r'[^a-zA-Z0-9]', '', server_id[-6:])
                                if not server_id_suffix:
                                    hash_val = sum(ord(c) for c in server_id)
                                    server_id_suffix = format(hash_val, 'x')[-6:] or 'x'
                            
                            # 组合工具 ID
                            if sanitized_server and not sanitized_tool.startswith(sanitized_server[:7]):
                                base_name = f"{sanitized_server[:7]}-{sanitized_tool}"
                            else:
                                base_name = sanitized_tool
                            
                            base_name = ''.join(c if c.isalnum() or c in '_-' else '_' for c in base_name)
                            if base_name and not base_name[0].isalpha():
                                base_name = f"tool_{base_name}"
                            
                            max_base_len = 63 - (len(server_id_suffix) + 1 if server_id_suffix else 0)
                            if len(base_name) > max_base_len:
                                base_name = base_name[:max_base_len]
                            
                            tool_id = f"{base_name}_{server_id_suffix}" if server_id_suffix else base_name
                            
                            # 处理工具数据
                            tool_dict = tool if isinstance(tool, dict) else {
                                'name': getattr(tool, 'name', ''),
                                'description': getattr(tool, 'description', ''),
                                'inputSchema': getattr(tool, 'inputSchema', {})
                            }
                            
                            tools_data.append({
                                "id": tool_id,
                                "name": tool_dict.get('name', tool_name),
                                "description": tool_dict.get('description', ''),
                                "inputSchema": tool_dict.get('inputSchema', {}),
                                "serverId": server_id,
                                "serverName": server_name,
                                "type": "mcp"
                            })
                        
                        _log(f"[MCP] Returning {len(tools_data)} tools from stdio transport")
                        return json.dumps(tools_data)
                    else:
                        _log(f"[MCP] No tools returned from stdio transport server")
                        return '[]'
                        
                except Exception as e:
                    import traceback
                    _log(f"[MCP] Error with stdio transport: {str(e)}\n{traceback.format_exc()}")
                    return '[]'
            
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
            command = server_config.get('command', '')
            
            # 检查是否是使用 stdio transport 的服务器
            if not base_url and command:
                _log(f"[MCP] Server uses stdio transport (command: {command}), attempting to call tool...")
                try:
                    # 使用 stdio transport 客户端
                    client = _get_or_create_mcp_stdio_client(server_config)
                    result = client.call_tool(tool_name, tool_args)
                    
                    # 转换结果为 Cherry Studio 格式
                    content = result.get('content', [])
                    if isinstance(content, list):
                        # 已经是内容列表格式
                        return json.dumps({
                            'isError': False,
                            'content': content
                        })
                    elif isinstance(content, str):
                        # 单个文本内容
                        return json.dumps({
                            'isError': False,
                            'content': [{'type': 'text', 'text': content}]
                        })
                    else:
                        # 其他格式，转换为文本
                        return json.dumps({
                            'isError': False,
                            'content': [{'type': 'text', 'text': json.dumps(result)}]
                        })
                        
                except Exception as e:
                    import traceback
                    error_detail = f"{str(e)}\n{traceback.format_exc()}"
                    _log(f"[MCP] Error calling tool via stdio transport: {error_detail}")
                    return json.dumps({
                        'isError': True,
                        'content': [{'type': 'text', 'text': f'Error calling tool via stdio transport: {str(e)}'}]
                    })
            if not base_url:
                return json.dumps({
                    'isError': True,
                    'content': [{'type': 'text', 'text': 'Server baseUrl is required'}]
                })
            
            # 准备认证信息
            headers = server_config.get('headers', {}) or {}
            api_key = server_config.get('apiKey') or server_config.get('api_key')
            
            # 如果有 API key，添加到 headers
            if api_key:
                # 检查是否已经有 Authorization header
                has_auth = any(k.lower() == 'authorization' for k in headers.keys())
                if not has_auth:
                    # 默认使用 Bearer token
                    headers['Authorization'] = f'Bearer {api_key}'
                # 如果没有 Authorization，尝试使用 X-API-Key
                has_api_key = any(k.lower() == 'x-api-key' for k in headers.keys())
                if not has_auth and not has_api_key:
                    headers['X-API-Key'] = api_key
            
            # 异步调用工具
            async def call_tool():
                try:
                    _log(f"[MCP] Creating FastMCP client for {base_url}")
                    # 使用 FastMCP 客户端，它会自动处理 SSE/Stdio 等协议细节
                    client = Client(base_url)
                    
                    # 注意：FastMCP Client 目前可能不直接支持在构造时传入 headers
                    # 如果需要认证，可能需要查看 FastMCP 文档或源码支持
                    # 但对于本地 Houdini MCP 服务，通常不需要额外认证
                    
                    async with client:
                        _log(f"[MCP] Calling tool: {tool_name} on {base_url} with args: {json.dumps(tool_args)}")
                        # 注意：fastmcp 0.4.x+ 的 client.call_tool 签名可能是 call_tool(name: str, arguments: dict = None)
                        # 某些版本可能不支持 **kwargs 展开参数，而是需要传入 arguments 字典
                        try:
                            # 尝试方式 1: 传入 arguments 字典（标准 MCP 协议方式）
                            result = await client.call_tool(tool_name, arguments=tool_args)
                        except TypeError:
                            # 尝试方式 2: 展开参数（旧版 fastmcp 行为）
                            result = await client.call_tool(tool_name, **tool_args)
                            
                        _log(f"[MCP] Tool call result type: {type(result)}")
                        return result

                except Exception as e:
                    import traceback
                    error_detail = f"{str(e)}\n{traceback.format_exc()}"
                    _log(f"[MCP] Error calling tool {tool_name}: {error_detail}")
                    
                    # 检查是否是 401 错误
                    error_str = str(e)
                    if '401' in error_str or 'Unauthorized' in error_str or 'HTTP Error 401' in error_str:
                        auth_hint = ""
                        if not headers and not api_key:
                            auth_hint = " Please configure API key or authentication headers in MCP server settings."
                        return {
                            'isError': True,
                            'content': [{'type': 'text', 'text': f'Authentication failed (401 Unauthorized).{auth_hint} Error: {str(e)}'}]
                        }
                    
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
    
    # ========== 配置管理 API ==========
    
    @Slot(result=str)
    def configGetMergedConfig(self) -> str:
        """获取合并后的配置"""
        try:
            # 确保加载最新配置（包括中心化配置）
            # 注意：load() 方法现在只负责加载中心化配置，用户配置由前端 localStorage 管理
            # 但这里返回的结构包含了 centralizedModels 等字段，前端会用到
            config = config_manager.load()
            return json.dumps(config)
        except Exception as e:
            _log(f"configGetMergedConfig error: {e}")
            return "{}"

    @Slot(result=str)
    def configReload(self) -> str:
        """重新加载配置"""
        try:
            config = config_manager.reload()
            return json.dumps(config)
        except Exception as e:
            _log(f"configReload error: {e}")
            return "{}"

    @Slot(str, result=str)
    def configUpdateUserModels(self, models_json: str) -> str:
        """更新用户模型配置"""
        try:
            models = json.loads(models_json) if models_json else []
            config = config_manager.update_user_models(models)
            return json.dumps(config)
        except Exception as e:
            _log(f"configUpdateUserModels error: {e}")
            return "{}"

    @Slot(str, result=str)
    def configUpdateUserMcpServers(self, servers_json: str) -> str:
        """更新用户 MCP 服务器配置"""
        try:
            servers = json.loads(servers_json) if servers_json else []
            config = config_manager.update_user_mcp_servers(servers)
            return json.dumps(config)
        except Exception as e:
            _log(f"configUpdateUserMcpServers error: {e}")
            return "{}"

    @Slot(result=str)
    def mcpGetInstallInfo(self) -> str:
        """
        获取 MCP 安装信息
        返回 uv、bun 的路径和安装目录
        优先检查 CHERRY_STUDIO_BIN_DIR 环境变量，否则检查 J:/vfxtools/piplineTD/models/packages/bin 目录，再检查 PATH
        """
        try:
            import shutil
            from pathlib import Path
            import os
            
            # 获取 Cherry Studio bin 目录
            # 优先使用环境变量
            env_bin_dir = os.environ.get('CHERRY_STUDIO_BIN_DIR')
            if env_bin_dir:
                bin_dir = Path(env_bin_dir)
            else:
                bin_dir = Path('J:/vfxtools/piplineTD/models/packages/bin')
            
            # 查找 uv 和 bun 可执行文件
            uv_path = ''
            bun_path = ''
            
            _log(f"[mcpGetInstallInfo] Checking bin_dir: {bin_dir}")
            _log(f"[mcpGetInstallInfo] bin_dir exists: {bin_dir.exists()}")
            
            # 列出目录内容以便调试
            if bin_dir.exists():
                try:
                    files = list(bin_dir.iterdir())
                    _log(f"[mcpGetInstallInfo] Files in bin_dir: {[f.name for f in files]}")
                except Exception as e:
                    _log(f"[mcpGetInstallInfo] Error listing bin_dir: {e}")
            
            # 优先检查 bin 目录
            if bin_dir.exists():
                uv_exe = bin_dir / ('uv.exe' if os.name == 'nt' else 'uv')
                bun_exe = bin_dir / ('bun.exe' if os.name == 'nt' else 'bun')
                
                _log(f"[mcpGetInstallInfo] Looking for uv at: {uv_exe}")
                _log(f"[mcpGetInstallInfo] uv exists: {uv_exe.exists()}, is_file: {uv_exe.is_file() if uv_exe.exists() else 'N/A'}")
                
                # 检查 uv
                if uv_exe.exists() and uv_exe.is_file():
                    # 在 Unix 系统上检查可执行权限
                    if os.name == 'nt' or os.access(uv_exe, os.X_OK):
                        uv_path = str(uv_exe)
                        _log(f"[mcpGetInstallInfo] Found uv: {uv_path}")
                    else:
                        _log(f"[mcpGetInstallInfo] uv exists but not executable")
                
                _log(f"[mcpGetInstallInfo] Looking for bun at: {bun_exe}")
                
                # 检查 bun
                if bun_exe.exists() and bun_exe.is_file():
                    # 在 Unix 系统上检查可执行权限
                    if os.name == 'nt' or os.access(bun_exe, os.X_OK):
                        bun_path = str(bun_exe)
                        _log(f"[mcpGetInstallInfo] Found bun: {bun_path}")
            else:
                _log(f"[mcpGetInstallInfo] bin_dir does not exist: {bin_dir}")
            
            # 如果 bin 目录中没有找到，尝试在 PATH 中查找
            if not uv_path:
                _log(f"[mcpGetInstallInfo] uv not found in bin_dir, searching in PATH")
                uv_cmd = shutil.which('uv')
                if uv_cmd:
                    uv_path = uv_cmd
                    _log(f"[mcpGetInstallInfo] Found uv in PATH: {uv_path}")
                else:
                    _log(f"[mcpGetInstallInfo] uv not found in PATH")
            
            if not bun_path:
                _log(f"[mcpGetInstallInfo] bun not found in bin_dir, searching in PATH")
                bun_cmd = shutil.which('bun')
                if bun_cmd:
                    bun_path = bun_cmd
                    _log(f"[mcpGetInstallInfo] Found bun in PATH: {bun_path}")
                else:
                    _log(f"[mcpGetInstallInfo] bun not found in PATH")
            
            result = {
                'dir': str(bin_dir),
                'uvPath': uv_path,
                'bunPath': bun_path
            }
            
            _log(f"[mcpGetInstallInfo] Final result: {result}")
            return json.dumps(result)
        except Exception as e:
            _log(f"mcpGetInstallInfo error: {e}")
            # 返回空路径的默认值，避免前端解构错误
            return json.dumps({
                'dir': '',
                'uvPath': '',
                'bunPath': ''
            })
    
    @Slot(result=bool)
    def installBunBinary(self) -> bool:
        """
        安装 Bun 二进制文件
        下载并解压到'J:/vfxtools/piplineTD/models/packages/bin'目录
        """
        try:
            home_dir = Path.home()
            bin_dir = Path('J:/vfxtools/piplineTD/models/packages/bin')
            bin_dir.mkdir(parents=True, exist_ok=True)
            
            # 确定平台和架构
            platform = sys.platform
            arch = APP_ARCH if hasattr(APP_ARCH, '__str__') else ('x64' if sys.maxsize > 2**32 else 'x86')
            
            # Bun 下载 URL 映射
            BUN_RELEASE_BASE_URL = 'https://gitcode.com/CherryHQ/bun/releases/download'
            DEFAULT_BUN_VERSION = '1.3.1'
            
            BUN_PACKAGES = {
                'darwin-arm64': 'bun-darwin-aarch64.zip',
                'darwin-x64': 'bun-darwin-x64.zip',
                'win32-x64': 'bun-windows-x64.zip',
                'win32-arm64': 'bun-windows-x64.zip',
                'linux-x64': 'bun-linux-x64.zip',
                'linux-arm64': 'bun-linux-aarch64.zip',
            }
            
            # 确定平台键
            if platform == 'darwin':
                platform_key = f'darwin-{arch}'
            elif platform == 'win32':
                platform_key = f'win32-{arch}'
            elif platform.startswith('linux'):
                platform_key = f'linux-{arch}'
            else:
                _log(f"installBunBinary: Unsupported platform: {platform}")
                return False
            
            package_name = BUN_PACKAGES.get(platform_key)
            if not package_name:
                _log(f"installBunBinary: No binary available for {platform_key}")
                return False
            
            # 下载 URL
            download_url = f"{BUN_RELEASE_BASE_URL}/bun-v{DEFAULT_BUN_VERSION}/{package_name}"
            
            # 下载文件
            with tempfile.NamedTemporaryFile(delete=False, suffix='.zip') as tmp_file:
                temp_path = tmp_file.name
            
            try:
                _log(f"installBunBinary: Downloading from {download_url}")
                urllib_request.urlretrieve(download_url, temp_path)
                
                # 解压 ZIP 文件
                _log(f"installBunBinary: Extracting to {bin_dir}")
                with zipfile.ZipFile(temp_path, 'r') as zip_ref:
                    for member in zip_ref.namelist():
                        if not member.endswith('/'):  # 跳过目录
                            filename = os.path.basename(member)
                            if filename:  # 确保有文件名
                                output_path = bin_dir / filename
                                with zip_ref.open(member) as source, open(output_path, 'wb') as target:
                                    shutil.copyfileobj(source, target)
                                
                                # 设置可执行权限（Unix 系统）
                                if platform != 'win32':
                                    os.chmod(output_path, 0o755)
                
                _log(f"installBunBinary: Successfully installed bun")
                return True
            finally:
                # 清理临时文件
                try:
                    os.unlink(temp_path)
                except Exception:
                    pass
                    
        except Exception as e:
            _log(f"installBunBinary error: {e}")
            return False
    
    @Slot(result=bool)
    def installUVBinary(self) -> bool:
        """
        安装 UV 二进制文件
        下载并解压到 'J:/vfxtools/piplineTD/models/packages/bin' 目录
        """
        try:
            home_dir = Path.home()
            bin_dir = Path('J:/vfxtools/piplineTD/models/packages/bin')
            bin_dir.mkdir(parents=True, exist_ok=True)
            
            # 确定平台和架构
            platform = sys.platform
            arch = APP_ARCH if hasattr(APP_ARCH, '__str__') else ('x64' if sys.maxsize > 2**32 else 'x86')
            
            # UV 下载 URL 映射
            UV_RELEASE_BASE_URL = 'https://github.com/astral-sh/uv/releases/download'
            DEFAULT_UV_VERSION = '0.5.8'
            
            UV_PACKAGES = {
                'darwin-arm64': 'uv-aarch64-apple-darwin.tar.gz',
                'darwin-x64': 'uv-x86_64-apple-darwin.tar.gz',
                'win32-x64': 'uv-x86_64-pc-windows-msvc.zip',
                'win32-arm64': 'uv-aarch64-pc-windows-msvc.zip',
                'linux-x64': 'uv-x86_64-unknown-linux-gnu.tar.gz',
                'linux-arm64': 'uv-aarch64-unknown-linux-gnu.tar.gz',
            }
            
            # 确定平台键
            if platform == 'darwin':
                platform_key = f'darwin-{arch}'
            elif platform == 'win32':
                platform_key = f'win32-{arch}'
            elif platform.startswith('linux'):
                platform_key = f'linux-{arch}'
            else:
                _log(f"installUVBinary: Unsupported platform: {platform}")
                return False
            
            package_name = UV_PACKAGES.get(platform_key)
            if not package_name:
                _log(f"installUVBinary: No binary available for {platform_key}")
                return False
            
            # 下载 URL
            download_url = f"{UV_RELEASE_BASE_URL}/{DEFAULT_UV_VERSION}/{package_name}"
            
            # 下载文件
            is_zip = package_name.endswith('.zip')
            suffix = '.zip' if is_zip else '.tar.gz'
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
                temp_path = tmp_file.name
            
            try:
                _log(f"installUVBinary: Downloading from {download_url}")
                urllib_request.urlretrieve(download_url, temp_path)
                
                # 解压文件
                _log(f"installUVBinary: Extracting to {bin_dir}")
                if is_zip:
                    with zipfile.ZipFile(temp_path, 'r') as zip_ref:
                        for member in zip_ref.namelist():
                            if not member.endswith('/'):
                                filename = os.path.basename(member)
                                if filename:
                                    output_path = bin_dir / filename
                                    with zip_ref.open(member) as source, open(output_path, 'wb') as target:
                                        shutil.copyfileobj(source, target)
                                    if platform != 'win32':
                                        os.chmod(output_path, 0o755)
                else:
                    with tarfile.open(temp_path, 'r:gz') as tar_ref:
                        for member in tar_ref.getmembers():
                            if member.isfile():
                                filename = os.path.basename(member.name)
                                if filename:
                                    output_path = bin_dir / filename
                                    with tar_ref.extractfile(member) as source, open(output_path, 'wb') as target:
                                        shutil.copyfileobj(source, target)
                                    if platform != 'win32':
                                        os.chmod(output_path, 0o755)
                
                _log(f"installUVBinary: Successfully installed uv")
                return True
            finally:
                # 清理临时文件
                try:
                    os.unlink(temp_path)
                except Exception:
                    pass
                    
        except Exception as e:
            _log(f"installUVBinary error: {e}")
            return False
    
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
    
    def _find_executable(self, name: str) -> str | None:
        """查找可执行文件（Windows 使用 where.exe）"""
        if os.name != 'nt':  # 非 Windows 系统
            return None
        
        try:
            import shutil
            # 使用 shutil.which 查找可执行文件（跨平台）
            exe_path = shutil.which(f"{name}.exe")
            if exe_path and os.path.exists(exe_path):
                return exe_path
            return None
        except Exception as e:
            _log(f"_find_executable({name}) error: {e}")
            return None
    
    def _validate_git_bash_path(self, bash_path: str | None) -> str | None:
        """验证 Git Bash 路径是否有效"""
        if not bash_path:
            return None
        
        try:
            resolved = os.path.abspath(bash_path)
            if not os.path.exists(resolved):
                _log(f"Git Bash path does not exist: {resolved}")
                return None
            
            # 检查是否是 bash.exe
            if not resolved.lower().endswith('bash.exe'):
                _log(f"Git Bash path is not bash.exe: {resolved}")
                return None
            
            _log(f"Validated Git Bash path: {resolved}")
            return resolved
        except Exception as e:
            _log(f"_validate_git_bash_path error: {e}")
            return None
    
    def _find_git_bash(self, custom_path: str | None = None) -> str | None:
        """查找 Git Bash 可执行文件"""
        if os.name != 'nt':  # 非 Windows 系统
            return None
        
        # 1. 检查自定义路径
        if custom_path:
            validated = self._validate_git_bash_path(custom_path)
            if validated:
                _log(f"Using custom Git Bash path: {validated}")
                return validated
        
        # 2. 检查环境变量覆盖
        env_override = os.environ.get('CLAUDE_CODE_GIT_BASH_PATH')
        if env_override:
            validated = self._validate_git_bash_path(env_override)
            if validated:
                _log(f"Using CLAUDE_CODE_GIT_BASH_PATH override: {validated}")
                return validated
        
        # 3. 查找 git.exe 并推导 bash.exe 路径
        git_path = self._find_executable('git')
        if git_path:
            git_dir = os.path.dirname(git_path)
            # 尝试多个可能的 bash.exe 位置
            possible_bash_paths = [
                os.path.join(git_dir, '..', '..', 'bin', 'bash.exe'),  # 标准 Git: Git/cmd/git.exe -> Git/bin/bash.exe
                os.path.join(git_dir, '..', 'bash.exe'),  # Portable Git: Git/bin/git.exe -> Git/bin/bash.exe
                os.path.join(git_dir, '..', '..', 'usr', 'bin', 'bash.exe')  # MSYS2: msys64/usr/bin/git.exe -> msys64/usr/bin/bash.exe
            ]
            
            for bash_path in possible_bash_paths:
                resolved = os.path.abspath(bash_path)
                if os.path.exists(resolved):
                    _log(f"Found bash.exe via git.exe path derivation: {resolved}")
                    return resolved
        
        # 4. 检查常见的 Git Bash 安装路径
        common_paths = []
        if 'ProgramFiles' in os.environ:
            common_paths.append(os.path.join(os.environ['ProgramFiles'], 'Git', 'bin', 'bash.exe'))
        if 'ProgramFiles(x86)' in os.environ:
            common_paths.append(os.path.join(os.environ['ProgramFiles(x86)'], 'Git', 'bin', 'bash.exe'))
        if 'LOCALAPPDATA' in os.environ:
            common_paths.append(os.path.join(os.environ['LOCALAPPDATA'], 'Programs', 'Git', 'bin', 'bash.exe'))
        
        for bash_path in common_paths:
            if os.path.exists(bash_path):
                _log(f"Found bash.exe at common path: {bash_path}")
                return bash_path
        
        _log("Git Bash not found - checked git derivation and common paths")
        return None
    
    def _auto_discover_git_bash(self) -> str | None:
        """自动发现 Git Bash 路径"""
        if os.name != 'nt':
            return None
        
        # 1. 检查环境变量覆盖（最高优先级）
        env_override = os.environ.get('CLAUDE_CODE_GIT_BASH_PATH')
        if env_override:
            validated = self._validate_git_bash_path(env_override)
            if validated:
                _log(f"Using CLAUDE_CODE_GIT_BASH_PATH override: {validated}")
                return validated
        
        # 2. 尝试自动发现
        discovered_path = self._find_git_bash()
        if discovered_path:
            _log(f"Auto-discovered Git Bash path: {discovered_path}")
            return discovered_path
        
        return None
    
    def _get_git_bash_config_path(self) -> str:
        """获取 Git Bash 配置文件路径"""
        return os.path.join(self._get_app_data_dir(), "git_bash_config.json")

    @Slot(result=str)
    def getGitBashPathInfo(self) -> str:
        """获取 Git Bash 路径信息"""
        try:
            if os.name != 'nt':  # 非 Windows 系统
                return json.dumps({"path": None, "source": None})
            
            # 1. 尝试读取手动配置
            config_path = self._get_git_bash_config_path()
            if os.path.exists(config_path):
                try:
                    with open(config_path, 'r', encoding='utf-8') as f:
                        config = json.load(f)
                        manual_path = config.get('path')
                        if manual_path and os.path.exists(manual_path):
                            return json.dumps({"path": manual_path, "source": "manual"})
                except Exception as e:
                    _log(f"Error reading git bash config: {e}")

            # 2. 尝试自动发现
            path = self._auto_discover_git_bash()
            source = 'auto' if path else None
            
            result = {
                "path": path,
                "source": source
            }
            _log(f"getGitBashPathInfo result: {result}")
            return json.dumps(result)
        except Exception as e:
            _log(f"getGitBashPathInfo error: {e}")
            return json.dumps({"path": None, "source": None})

    @Slot(str, result=bool)
    def setGitBashPath(self, path: str) -> bool:
        """设置 Git Bash 路径"""
        try:
            config_path = self._get_git_bash_config_path()
            
            # 如果 path 为空，表示重置/清除
            if not path:
                if os.path.exists(config_path):
                    os.remove(config_path)
                return True
                
            # 验证路径
            if not os.path.exists(path):
                return False
                
            # 保存配置
            with open(config_path, 'w', encoding='utf-8') as f:
                json.dump({"path": path}, f)
            
            return True
        except Exception as e:
            _log(f"setGitBashPath error: {e}")
            return False

    # ========== Topic 持久化 API ==========

    @Slot(str, str, result=bool)
    def topicSave(self, topic_id: str, data: str) -> bool:
        """保存 Topic 数据"""
        try:
            topics_dir = os.path.join(self._get_app_data_dir(), "topics")
            os.makedirs(topics_dir, exist_ok=True)
            file_path = os.path.join(topics_dir, f"{topic_id}.json")
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(data)
            return True
        except Exception as e:
            _log(f"topicSave error: {e}")
            return False

    @Slot(str, result=str)
    def topicLoad(self, topic_id: str) -> str:
        """加载 Topic 数据"""
        try:
            topics_dir = os.path.join(self._get_app_data_dir(), "topics")
            file_path = os.path.join(topics_dir, f"{topic_id}.json")
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    return f.read()
            return ""
        except Exception as e:
            _log(f"topicLoad error: {e}")
            return ""

    @Slot(str, result=bool)
    def topicDelete(self, topic_id: str) -> bool:
        """删除 Topic 数据"""
        try:
            topics_dir = os.path.join(self._get_app_data_dir(), "topics")
            file_path = os.path.join(topics_dir, f"{topic_id}.json")
            if os.path.exists(file_path):
                os.remove(file_path)
            return True
        except Exception as e:
            _log(f"topicDelete error: {e}")
            return False
            
    @Slot(result=str)
    def topicList(self) -> str:
        """列出所有保存的 Topic ID"""
        try:
            topics_dir = os.path.join(self._get_app_data_dir(), "topics")
            if not os.path.exists(topics_dir):
                return "[]"
            
            topics = []
            for filename in os.listdir(topics_dir):
                if filename.endswith(".json"):
                    topics.append(filename[:-5])  # 移除 .json 后缀
            return json.dumps(topics)
        except Exception as e:
            _log(f"topicList error: {e}")
            return "[]"

