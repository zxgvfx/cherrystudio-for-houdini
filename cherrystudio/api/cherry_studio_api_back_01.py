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
import uuid
from pathlib import Path
from urllib import request as urllib_request, error as urllib_error
from PySide6.QtCore import QObject, Slot, Signal

from ..version import APP_VERSION, APP_PLATFORM, APP_ARCH
from .agent_server import AgentServer
from ..utils.logger import network_logger
from ..core.config_manager import config_manager
from ..services.knowledge_base import KnowledgeBaseService

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
        self._kb_service = None
        self._kb_service_lock = threading.Lock()

    def _get_kb_service(self):
        with self._kb_service_lock:
            if self._kb_service is None:
                storage_path = os.path.join(os.path.expanduser("~"), ".cherrystudio", "knowledge_base")
                os.makedirs(storage_path, exist_ok=True)
                self._kb_service = KnowledgeBaseService(storage_path)
            return self._kb_service

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
        # 修改为指向 cherrystudio 包内部的 resources 目录，而不是项目根目录
        # 适配 cocoApplication/bin/cherrystudio/resources/data/agents-zh.json 的结构
        resources_path = os.path.join(cherrystudio_dir, "resources")

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
        优先检查用户目录 .cherrystudio/bin，如果没找到再检查系统 PATH
        这样既能识别应用安装的版本，也能识别系统已有的版本
        如果找到 uv.exe 或 uv，会将其目录添加到 PATH，以便后续可以调用 npx 或 uvx
        如果找到 node.exe 或 node，会将其目录添加到 PATH，以便后续可以调用 npm 或 npx
        """
        try:
            from shutil import which
            from pathlib import Path

            # 优先检查 .cherrystudio/bin 目录
            home_dir = Path.home()
            bin_dir = home_dir / '.cherrystudio' / 'bin'

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

    # ========== HTTP Proxy API (for CORS bypass in Qt WebEngine) ==========

    # 线程池用于非阻塞 HTTP 请求
    _http_executor = None
    _request_lock = threading.Lock()  # 防止并发请求时的重入问题

    @classmethod
    def _get_http_executor(cls):
        """获取或创建 HTTP 请求线程池"""
        if cls._http_executor is None:
            import concurrent.futures
            cls._http_executor = concurrent.futures.ThreadPoolExecutor(max_workers=2)
        return cls._http_executor

    def _wait_for_future_safely(self, future, timeout_ms=60000):
        """安全地等待 Future 完成，使用 QTimer 避免阻塞主线程"""
        from PySide6.QtCore import QTimer, QEventLoop

        if future.done():
            return future.result()

        loop = QEventLoop()
        result_holder = [None, None]  # [result, exception]

        def check_done():
            if future.done():
                try:
                    result_holder[0] = future.result()
                except Exception as e:
                    result_holder[1] = e
                loop.quit()

        # 使用 QTimer 定期检查，避免阻塞
        timer = QTimer()
        timer.timeout.connect(check_done)
        timer.start(50)  # 每 50ms 检查一次

        # 超时定时器
        timeout_timer = QTimer()
        timeout_timer.setSingleShot(True)
        timeout_timer.timeout.connect(loop.quit)
        timeout_timer.start(timeout_ms)

        # 立即检查一次
        check_done()

        if not future.done():
            loop.exec()

        timer.stop()
        timeout_timer.stop()

        if result_holder[1]:
            raise result_holder[1]
        if result_holder[0] is None and not future.done():
            raise TimeoutError(f"Operation timed out after {timeout_ms}ms")

        return result_holder[0] if result_holder[0] is not None else future.result()

    def _do_http_get(self, url: str, headers: dict, timeout: int, auth: dict) -> dict:
        """在后台线程中执行 HTTP GET 请求"""
        import urllib.request
        import urllib.error
        import base64

        try:
            _log(f"[httpProxyGet] Background thread requesting: {url}")

            # 创建请求
            req = urllib.request.Request(url)

            # 添加 headers
            for key, value in headers.items():
                req.add_header(key, value)

            # 添加基本认证
            if auth and auth.get('username'):
                credentials = f"{auth['username']}:{auth.get('password', '')}"
                encoded = base64.b64encode(credentials.encode()).decode()
                req.add_header('Authorization', f'Basic {encoded}')

            # 发送请求
            with urllib.request.urlopen(req, timeout=timeout) as response:
                data = response.read().decode('utf-8')
                status = response.status

                # 尝试解析 JSON
                try:
                    parsed_data = json.loads(data)
                    return {
                        'success': True,
                        'data': parsed_data,
                        'status': status
                    }
                except json.JSONDecodeError:
                    return {
                        'success': True,
                        'data': data,
                        'status': status
                    }

        except urllib.error.HTTPError as e:
            return {
                'success': False,
                'error': f'HTTP Error {e.code}: {e.reason}',
                'status': e.code
            }
        except urllib.error.URLError as e:
            return {
                'success': False,
                'error': f'URL Error: {str(e.reason)}'
            }
        except Exception as e:
            _log(f"[httpProxyGet] Background thread error: {e}")
            return {'success': False, 'error': str(e)}

    @Slot(str, result=str)
    def httpProxyGet(self, request_json: str) -> str:
        """
        HTTP GET 代理 - 用于绕过 Qt WebEngine 的 CORS 限制
        在后台线程执行网络请求，避免阻塞 UI

        Args:
            request_json: JSON 字符串，包含 {url, headers?, timeout?, auth?}

        Returns:
            JSON 字符串，包含 {success, data?, error?, status?}
        """
        try:
            from PySide6.QtWidgets import QApplication

            request_data = json.loads(request_json) if isinstance(request_json, str) else request_json
            url = request_data.get('url', '')
            headers = request_data.get('headers', {})
            timeout = request_data.get('timeout', 10)
            auth = request_data.get('auth')  # {username, password}

            if not url:
                return json.dumps({'success': False, 'error': 'URL is required'})

            _log(f"[httpProxyGet] Submitting request to thread pool: {url}")

            # 提交到线程池执行
            executor = self._get_http_executor()
            future = executor.submit(self._do_http_get, url, headers, timeout, auth)

            # 安全地等待结果
            result = self._wait_for_future_safely(future, timeout_ms=max(timeout * 1000 + 5000, 30000))
            _log(f"[httpProxyGet] Request completed: success={result.get('success')}")
            return json.dumps(result)

        except Exception as e:
            _log(f"[httpProxyGet] Error: {e}")
            return json.dumps({'success': False, 'error': str(e)})

    def _do_http_post(self, url: str, body: any, headers: dict, timeout: int, auth: dict) -> dict:
        """在后台线程中执行 HTTP POST 请求"""
        import urllib.request
        import urllib.error
        import base64

        try:
            _log(f"[httpProxyPost] Background thread requesting: {url}")

            # 准备请求体
            if isinstance(body, dict):
                body_data = json.dumps(body).encode('utf-8')
                if 'Content-Type' not in headers:
                    headers['Content-Type'] = 'application/json'
            else:
                body_data = str(body).encode('utf-8')

            # 创建请求
            req = urllib.request.Request(url, data=body_data)

            # 添加 headers
            for key, value in headers.items():
                req.add_header(key, value)

            # 添加基本认证
            if auth and auth.get('username'):
                credentials = f"{auth['username']}:{auth.get('password', '')}"
                encoded = base64.b64encode(credentials.encode()).decode()
                req.add_header('Authorization', f'Basic {encoded}')

            # 发送请求
            with urllib.request.urlopen(req, timeout=timeout) as response:
                data = response.read().decode('utf-8')
                status = response.status

                try:
                    parsed_data = json.loads(data)
                    return {
                        'success': True,
                        'data': parsed_data,
                        'status': status
                    }
                except json.JSONDecodeError:
                    return {
                        'success': True,
                        'data': data,
                        'status': status
                    }

        except urllib.error.HTTPError as e:
            return {
                'success': False,
                'error': f'HTTP Error {e.code}: {e.reason}',
                'status': e.code
            }
        except urllib.error.URLError as e:
            return {
                'success': False,
                'error': f'URL Error: {str(e.reason)}'
            }
        except Exception as e:
            _log(f"[httpProxyPost] Background thread error: {e}")
            return {'success': False, 'error': str(e)}

    @Slot(str, result=str)
    def httpProxyPost(self, request_json: str) -> str:
        """
        HTTP POST 代理 - 用于绕过 Qt WebEngine 的 CORS 限制
        在后台线程执行网络请求，避免阻塞 UI

        Args:
            request_json: JSON 字符串，包含 {url, data?, headers?, timeout?, auth?}

        Returns:
            JSON 字符串，包含 {success, data?, error?, status?}
        """
        try:
            from PySide6.QtWidgets import QApplication

            request_data = json.loads(request_json) if isinstance(request_json, str) else request_json
            url = request_data.get('url', '')
            body = request_data.get('data', {})
            headers = request_data.get('headers', {})
            timeout = request_data.get('timeout', 10)
            auth = request_data.get('auth')

            if not url:
                return json.dumps({'success': False, 'error': 'URL is required'})

            _log(f"[httpProxyPost] Submitting request to thread pool: {url}")

            # 提交到线程池执行
            executor = self._get_http_executor()
            future = executor.submit(self._do_http_post, url, body, headers, timeout, auth)

            # 安全地等待结果
            result = self._wait_for_future_safely(future, timeout_ms=max(timeout * 1000 + 5000, 30000))
            _log(f"[httpProxyPost] Request completed: success={result.get('success')}")
            return json.dumps(result)

        except Exception as e:
            _log(f"[httpProxyPost] Error: {e}")
            return json.dumps({'success': False, 'error': str(e)})

    # ========== CodeTools API ==========

    @Slot(result=str)
    def codeToolsGetAvailableTerminals(self) -> str:
        """获取可用终端列表"""
        terminals = []
        import sys
        platform = sys.platform

        if platform == 'win32':
            # Windows 终端
            terminals.append({"id": "cmd", "name": "Command Prompt"})
            terminals.append({"id": "powershell", "name": "PowerShell"})

            # 检查 Windows Terminal
            try:
                subprocess.run(['where', 'wt'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
                terminals.append({"id": "windows-terminal", "name": "Windows Terminal"})
            except:
                pass

        elif platform == 'darwin':
            # macOS 终端
            terminals.append({"id": "terminal", "name": "Terminal", "bundleId": "com.apple.Terminal"})
            terminals.append({"id": "iterm2", "name": "iTerm2", "bundleId": "com.googlecode.iterm2"})
            terminals.append({"id": "warp", "name": "Warp", "bundleId": "dev.warp.Warp-Stable"})

        return json.dumps(terminals)

    @Slot(str, str, str, str, str, result=str)
    def codeToolsRun(self, tool: str, model: str, directory: str, env_json: str, options_json: str) -> str:
        """
        运行代码工具
        返回 JSON: { success: bool, message: str, command: str }
        """
        try:
            env = json.loads(env_json) if env_json else {}
            options = json.loads(options_json) if options_json else {}

            terminal_id = options.get('terminal', 'cmd')
            auto_update = options.get('autoUpdateToLatest', False)

            home_dir = Path.home()
            cherry_dir = home_dir / '.cherrystudio'
            bin_dir = cherry_dir / 'bin'

            # 确保 bin 目录存在
            bin_dir.mkdir(parents=True, exist_ok=True)

            # 获取 bun 路径
            bun_path = bin_dir / 'bun.exe' if sys.platform == 'win32' else bin_dir / 'bun'

            # 工具包名映射
            tool_packages = {
                'claude-code': '@anthropic-ai/claude-code',
                'gemini-cli': '@google/gemini-cli',
                'openai-codex': '@openai/codex',
                'qwen-code': '@qwen-code/qwen-code',
                'iflow-cli': '@iflow-ai/iflow-cli',
                'github-copilot-cli': '@github/copilot',
                'kimi-cli': 'kimi-cli'
            }

            # 工具可执行文件名映射
            tool_executables = {
                'claude-code': 'claude',
                'gemini-cli': 'gemini',
                'openai-codex': 'codex',
                'qwen-code': 'qwen',
                'iflow-cli': 'iflow',
                'github-copilot-cli': 'copilot',
                'kimi-cli': 'kimi'
            }

            package_name = tool_packages.get(tool, tool)
            executable_name = tool_executables.get(tool, tool)
            executable_path = bin_dir / (executable_name + ('.exe' if sys.platform == 'win32' else ''))

            # 检查是否安装
            is_installed = executable_path.exists()

            # 构建基础命令
            base_command = ""

            if tool == 'kimi-cli':
                # Kimi CLI 特殊处理 (使用 uvx)
                uv_path = bin_dir / ('uv.exe' if sys.platform == 'win32' else 'uv')
                base_command = f'"{uv_path}" tool run {package_name}'
            else:
                if not is_installed:
                    # 安装命令
                    # 优先使用环境变量中的 registry
                    custom_registry = env.get('NPM_CONFIG_REGISTRY') or env.get('npm_config_registry')
                    registry_url = custom_registry if custom_registry else "https://registry.npmmirror.com"
                    # 确保 URL 有尾部斜杠
                    if not registry_url.endswith('/'):
                        registry_url = registry_url + '/'
                    _log(f"Installing {package_name} using registry: {registry_url}")

                    # 使用 bun install -g 并通过 --registry= 参数指定源（等号连接，无空格）
                    if sys.platform == 'win32':
                        install_env = f'set BUN_INSTALL={cherry_dir} &&'
                    else:
                        install_env = f'export BUN_INSTALL="{cherry_dir}" &&'

                    # 完全匹配手动成功的命令格式
                    install_command = f'{install_env} "{bun_path}" install -g {package_name} --registry={registry_url}'
                    base_command = f'echo "Installing {package_name} from {registry_url}..." && {install_command} && echo "Installation complete." && "{executable_path}"'
                else:
                    # 直接运行
                    update_cmd = ""
                    if auto_update:
                        custom_registry = env.get('NPM_CONFIG_REGISTRY') or env.get('npm_config_registry')
                        registry_url = custom_registry if custom_registry else "https://registry.npmmirror.com"
                        # 确保 URL 有尾部斜杠
                        if not registry_url.endswith('/'):
                            registry_url = registry_url + '/'

                        # 使用 bun install -g 并通过 --registry= 参数指定源（等号连接，无空格）
                        if sys.platform == 'win32':
                            update_env = f'set BUN_INSTALL={cherry_dir} &&'
                        else:
                            update_env = f'export BUN_INSTALL="{cherry_dir}" &&'

                        update_cmd = f'echo "Updating {package_name} from {registry_url}..." && {update_env} "{bun_path}" install -g {package_name} --registry={registry_url} && '

                    if sys.platform == 'win32':
                        base_command = f'{update_cmd}"{executable_path}"'
                    else:
                        base_command = f'{update_cmd}"{bun_path}" "{executable_path}"'

            # 构建脚本文件 (Windows)
            if sys.platform == 'win32':
                temp_dir = Path(tempfile.gettempdir()) / 'cherrystudio'
                temp_dir.mkdir(parents=True, exist_ok=True)
                timestamp = int(time.time() * 1000)

                # 判断是否使用 PowerShell
                is_powershell = terminal_id in ('powershell', 'windows-terminal')

                if is_powershell:
                    # 生成 PowerShell 脚本 (.ps1)
                    script_file = temp_dir / f"launch_{tool}_{timestamp}.ps1"

                    # PowerShell 环境变量设置语法
                    env_commands = []
                    for k, v in env.items():
                        v_escaped = str(v).replace('"', '`"').replace("'", "''")
                        env_commands.append(f'$env:{k} = "{v_escaped}"')

                    env_block = '\n'.join(env_commands)

                    # PowerShell 版本的 base_command
                    if tool == 'kimi-cli':
                        ps_base_command = f'& "{uv_path}" tool run {package_name}'
                    elif not is_installed:
                        custom_registry = env.get('NPM_CONFIG_REGISTRY') or env.get('npm_config_registry')
                        registry_url = custom_registry if custom_registry else "https://registry.npmmirror.com"
                        if not registry_url.endswith('/'):
                            registry_url = registry_url + '/'
                        ps_base_command = f'''Write-Host "Installing {package_name} from {registry_url}..."
$env:BUN_INSTALL = "{cherry_dir}"
& "{bun_path}" install -g {package_name} --registry={registry_url}
Write-Host "Installation complete."
& "{executable_path}"'''
                    else:
                        update_part = ""
                        if auto_update:
                            custom_registry = env.get('NPM_CONFIG_REGISTRY') or env.get('npm_config_registry')
                            registry_url = custom_registry if custom_registry else "https://registry.npmmirror.com"
                            if not registry_url.endswith('/'):
                                registry_url = registry_url + '/'
                            update_part = f'''Write-Host "Updating {package_name} from {registry_url}..."
$env:BUN_INSTALL = "{cherry_dir}"
& "{bun_path}" install -g {package_name} --registry={registry_url}
'''
                        ps_base_command = f'{update_part}& "{executable_path}"'

                    script_content = f'''# Cherry Studio CLI Tool Launcher (PowerShell)
$OutputEncoding = [Console]::OutputEncoding = [Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "{tool} - Cherry Studio"

Write-Host "================================================"
Write-Host "Cherry Studio CLI Tool Launcher"
Write-Host "Tool: {tool}"
Write-Host "Directory: {directory}"
Write-Host "================================================"

Set-Location -Path "{directory}" -ErrorAction Stop

Clear-Host

# Set environment variables
{env_block}

# Execute command
{ps_base_command}

Write-Host ""
Write-Host "Command execution completed."
Write-Host "Press any key to close this window..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
'''
                    with open(script_file, 'w', encoding='utf-8') as f:
                        f.write(script_content)

                    # 启动 PowerShell 终端
                    if terminal_id == 'powershell':
                        terminal_cmd = ['start', 'powershell', '-ExecutionPolicy', 'Bypass', '-File', str(script_file)]
                    else:  # windows-terminal
                        terminal_cmd = ['wt', '-d', directory, 'powershell', '-ExecutionPolicy', 'Bypass', '-File', str(script_file)]
                else:
                    # 生成 CMD 批处理脚本 (.bat)
                    script_file = temp_dir / f"launch_{tool}_{timestamp}.bat"

                    # CMD 环境变量设置语法
                    env_commands = []
                    for k, v in env.items():
                        v_escaped = str(v).replace('"', '\\"')
                        env_commands.append(f'set "{k}={v_escaped}"')

                    env_block = '\n'.join(env_commands)

                    script_content = f"""@echo off
chcp 65001 >nul 2>&1
title {tool} - Cherry Studio
echo ================================================
echo Cherry Studio CLI Tool Launcher
echo Tool: {tool}
echo Directory: {directory}
echo ================================================

cd /d "{directory}" || (
  echo ERROR: Failed to change directory
  echo Target directory: {directory}
  pause
  exit /b 1
)

cls

:: Set environment variables
{env_block}

:: Execute command
{base_command}

echo.
echo Command execution completed.
echo Press any key to close this window...
pause >nul
"""
                    with open(script_file, 'w', encoding='utf-8') as f:
                        f.write(script_content)

                    # 启动 CMD 终端
                    terminal_cmd = ['start', 'cmd', '/c', str(script_file)]

                subprocess.Popen(terminal_cmd, shell=True)

                return json.dumps({
                    "success": True,
                    "message": f"Launched {tool}",
                    "command": str(script_file)
                })

            else:
                # macOS / Linux (简化实现，暂不支持)
                return json.dumps({
                    "success": False,
                    "message": "macOS/Linux support not implemented in Python backend yet",
                    "command": ""
                })

        except Exception as e:
            _log(f"codeToolsRun error: {e}")
            import traceback
            _log(traceback.format_exc())
            return json.dumps({
                "success": False,
                "message": str(e),
                "command": ""
            })

    @Slot(str, str, result=bool)
    def codeToolsSetCustomTerminalPath(self, terminal_id: str, path: str) -> bool:
        # 暂不持久化，仅占位
        return True

    @Slot(str, result=str)
    def codeToolsGetCustomTerminalPath(self, terminal_id: str) -> str:
        return ""

    @Slot(str, result=bool)
    def codeToolsRemoveCustomTerminalPath(self, terminal_id: str) -> bool:
        return True

    # ========== 文件操作 API ==========

    @Slot(str)
    def consoleLog(self, message: str) -> None:
        """接收前端日志并打印到 Python 控制台"""
        print(message)

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
        """显示文件选择对话框，返回 FileMetadata 对象数组"""
        try:
            from PySide6.QtWidgets import QFileDialog, QApplication
            import mimetypes
            import datetime

            print("[DEBUG] ========== FILE SELECT START (Backend) ==========")
            print(f"[DEBUG] fileSelect called with options: {options[:200] if options else 'None'}...")
            _log(f"[File] fileSelect called")
            opts = json.loads(options) if options else {}
            print(f"[DEBUG] Parsed options: {opts}")
            _log(f"[File] fileSelect options: {opts}")
            app = QApplication.instance()
            print(f"[DEBUG] QApplication instance: {app}")
            if not app:
                print("[DEBUG] ERROR: No QApplication instance!")
                _log("[File] No QApplication instance")
                return "[]"
            caption = opts.get('title', '选择文件')
            directory = opts.get('defaultPath', '')
            filters = opts.get('filters', [])
            properties = opts.get('properties', [])
            multiple = 'multiSelections' in properties
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

            file_paths = []
            if mode == 'save':
                file_path, _ = QFileDialog.getSaveFileName(None, caption, directory, filter_str)
                file_paths = [file_path] if file_path else []
            else:
                if multiple:
                    paths, _ = QFileDialog.getOpenFileNames(None, caption, directory, filter_str)
                    file_paths = paths if paths else []
                else:
                    file_path, _ = QFileDialog.getOpenFileName(None, caption, directory, filter_str)
                    file_paths = [file_path] if file_path else []

            # Convert paths to FileMetadata objects
            result = []
            for i, file_path in enumerate(file_paths):
                if not file_path:
                    continue
                try:
                    file_name = os.path.basename(file_path)
                    _, ext = os.path.splitext(file_name)
                    ext = ext.lower()

                    # Get file size
                    try:
                        file_size = os.path.getsize(file_path)
                    except Exception:
                        file_size = 0

                    # Get MIME type
                    mime_type, _ = mimetypes.guess_type(file_path)
                    if not mime_type:
                        mime_type = 'application/octet-stream'

                    file_id = str(uuid.uuid4())

                    file_metadata = {
                        'id': file_id,
                        'name': file_name,
                        'path': file_path,
                        'size': file_size,
                        'ext': ext,
                        'type': mime_type,
                        'origin_name': file_name,
                        'count': 1,
                        'created_at': datetime.datetime.now().isoformat()
                    }
                    result.append(file_metadata)
                except Exception as e:
                    _log(f"Error processing file {file_path}: {e}")
                    continue

            return json.dumps(result)
        except Exception as e:
            _log(f"[File] fileSelect error: {e}")
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
    def fileUpload(self, file_metadata_json: str) -> str:
        """上传文件到应用数据目录
        接收 FileMetadata JSON，复制文件到 filesPath 目录，返回更新后的 FileMetadata
        """
        try:
            import shutil
            import datetime

            _log(f"[File] fileUpload called")
            file_meta = json.loads(file_metadata_json) if file_metadata_json else {}
            _log(f"[File] Uploading file: {file_meta.get('name', 'unknown')}, path: {file_meta.get('path', 'N/A')}")

            if not file_meta:
                return json.dumps({"error": "Empty file metadata"})

            source_path = file_meta.get('path', '')
            file_id = file_meta.get('id', str(uuid.uuid4()))
            file_ext = file_meta.get('ext', '')

            if not source_path or not os.path.exists(source_path):
                return json.dumps({"error": f"Source file not found: {source_path}"})

            # 获取应用数据目录作为 filesPath
            files_path = self._get_app_data_dir()

            # 创建目标文件名: id + ext
            dest_filename = file_id + file_ext
            dest_path = os.path.join(files_path, dest_filename)

            # 复制文件
            shutil.copy2(source_path, dest_path)

            # 更新 file_meta 中的 path 为新路径
            file_meta['path'] = dest_path
            file_meta['name'] = dest_filename

            # 确保有 created_at
            if 'created_at' not in file_meta:
                file_meta['created_at'] = datetime.datetime.now().isoformat()

            _log(f"File uploaded: {source_path} -> {dest_path}")

            return json.dumps(file_meta)
        except Exception as e:
            _log(f"Error in fileUpload: {e}")
            return json.dumps({"error": str(e)})

    @Slot(str, result=bool)
    def fileDelete(self, filename: str) -> bool:
        """删除应用数据目录中的文件
        filename: 文件名（通常是 id + ext）
        """
        try:
            if not filename:
                return False

            files_path = self._get_app_data_dir()
            file_path = os.path.join(files_path, filename)

            if os.path.exists(file_path):
                os.remove(file_path)
                _log(f"File deleted: {file_path}")
                return True
            else:
                _log(f"File not found for deletion: {file_path}")
                return False
        except Exception as e:
            _log(f"Error in fileDelete: {e}")
            return False

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

    @Slot(result=str)
    def kbScan(self) -> str:
        """扫描本地知识库元数据（用于自动发现）"""
        try:
            kb_service = self._get_kb_service()
            kbs = kb_service.scan_knowledge_bases()
            return json.dumps(kbs)
        except Exception as e:
            _log(f"kbScan error: {e}")
            return "[]"

    @Slot(str, result=bool)
    def kbSaveMetadata(self, kb_json: str) -> bool:
        """保存知识库完整元数据"""
        try:
            kb_info = json.loads(kb_json) if kb_json else {}
            if not kb_info.get("id"):
                return False
            kb_service = self._get_kb_service()
            kb_service.save_kb_metadata(kb_info)
            return True
        except Exception as e:
            _log(f"kbSaveMetadata error: {e}")
            return False

    @Slot(result=str)
    def kbSyncFromCentral(self) -> str:
        """从中心化配置同步知识库"""
        try:
            from ..core.config_manager import config_manager

            import os
            source_path = os.environ.get("CHERRY_STUDIO_KB_SOURCE")

            if not source_path:
                centralized_config_path = config_manager._centralized_config_path
                if centralized_config_path and os.path.exists(centralized_config_path):
                    with open(centralized_config_path, 'r', encoding='utf-8') as f:
                        centralized_config = json.load(f)
                    source_path = centralized_config.get("knowledgeBaseSource", "")

            if not source_path:
                return json.dumps({"synced": 0, "updated": 0, "failed": 0, "needsRefresh": False})

            kb_service = self._get_kb_service()
            result = kb_service.sync_from_central_source(source_path)
            return json.dumps(result)
        except Exception as e:
            _log(f"kbSyncFromCentral error: {e}")
            return json.dumps({"synced": 0, "updated": 0, "failed": 0, "needsRefresh": False, "error": str(e)})

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

            # 记录所有请求的 URL（用于诊断）- 输出到控制台
            print(f"[fetchProxy] Request URL: {url[:200]}...")

            # 跳过所有 favicon 请求
            favicon_patterns = [
                'icon.horse/icon/',
                'favicon.splitbee.io/',
                'favicon.im/',
                '/favicon',
            ]
            is_favicon_request = url.lower().endswith('.ico') or any(p in url.lower() for p in favicon_patterns)

            if is_favicon_request:
                print(f"[fetchProxy] Skip favicon request: {url}")
                return json.dumps({"error": "favicon skipped in Qt environment"})

            # 拦截普通网页请求（防止内网卡死）
            # 只有当 URL 不是指向你的 LLM 代理，也不是 localhost 时才拦截
            is_llm_request = "higress.ccc.net" in url or "localhost" in url or "127.0.0.1" in url
            if not is_llm_request:
                print(f"[fetchProxy] Blocking external web request in restricted env: {url}")
                # 返回一个模拟的 HTML 响应，提示用户
                mock_html = """
                <!DOCTYPE html>
                <html>
                <head><meta charset="utf-8"><title>无法访问</title></head>
                <body style="font-family: system-ui; padding: 20px; color: #666; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🌐</div>
                    <h3>无法预览外部网页</h3>
                    <p>当前网络环境限制，无法直接访问外部链接：</p>
                    <p style="color: #000; background: #f0f0f0; padding: 10px; border-radius: 4px; word-break: break-all;">
                        {url}
                    </p>
                    <p>请尝试在外部浏览器中打开。</p>
                </body>
                </html>
                """.replace("{url}", url)

                return json.dumps({
                    "data": mock_html,
                    "status": 200,
                    "statusText": "OK",
                    "headers": {"content-type": "text/html"}
                })
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
                        # 解析原始请求，用于后续的工具调用循环
                        original_body = None
                        try:
                            if body_bytes:
                                original_body = json.loads(body_bytes.decode('utf-8'))
                        except:
                            pass

                        def process_stream(current_req, is_continuation=False):
                            """处理单次流式请求，返回 (full_response_text, tool_calls)"""
                            full_response_text = ""   # 完整的响应文本，用于保持上下文
                            forwarding_buffer = ""    # 待发送到前端的缓冲区
                            tool_calls = []

                            # 状态标志
                            in_tool_use_block = False
                            in_tool_result_block = False
                            tool_use_sent_hint = False
                            tool_result_sent_hint = False

                            def send_content(content):
                                """构造并发送 SSE data"""
                                if content:
                                    sse_data = {"choices": [{"delta": {"content": content}}]}
                                    sse_line_out = f'data: {json.dumps(sse_data)}\n\n'
                                    stream_queue.put({"type": "data", "data": sse_line_out})

                            print(f"[Stream] Opening connection to LLM (is_continuation={is_continuation})...")
                            import time as _time
                            _start_time = _time.time()

                            try:
                                with urllib_request.urlopen(current_req, timeout=60.0) as resp:
                                    print(f"[Stream] Connection opened in {_time.time() - _start_time:.2f}s")
                                    if not is_continuation:
                                        status = resp.getcode()
                                        reason = getattr(resp, "reason", "")
                                        resp_headers = dict(resp.getheaders())
                                        stream_queue.put({
                                            "type": "headers",
                                            "status": status,
                                            "statusText": reason,
                                            "headers": resp_headers
                                        })

                                    _chunk_count = 0
                                    _last_log_time = _time.time()
                                    line_buffer = ""

                                    while True:
                                        chunk = resp.read(1024)
                                        if not chunk:
                                            break
                                        _chunk_count += 1
                                        if _time.time() - _last_log_time > 5:
                                            print(f"[Stream] Receiving... chunks={_chunk_count}, full_len={len(full_response_text)}")
                                            _last_log_time = _time.time()

                                        chunk_str = chunk.decode("utf-8", errors="ignore")
                                        line_buffer += chunk_str

                                        while '\n' in line_buffer:
                                            line, line_buffer = line_buffer.split('\n', 1)
                                            stripped_line = line.strip()

                                            if stripped_line.startswith('data:'):
                                                data_str = stripped_line[5:].strip()
                                                if data_str and data_str != '[DONE]':
                                                    try:
                                                        data_obj = json.loads(data_str)
                                                        choices = data_obj.get('choices', [])
                                                        if choices:
                                                            delta = choices[0].get('delta', {})
                                                            content = delta.get('content', '')
                                                            if content:
                                                                full_response_text += content
                                                                forwarding_buffer += content
                                                    except json.JSONDecodeError:
                                                        pass

                                            # --- 核心缓冲处理逻辑 ---

                                            # 1. 处理 <tool_use> 块
                                            if in_tool_use_block:
                                                # 发送提示 (一次性)
                                                if not tool_use_sent_hint and "<name>" in forwarding_buffer and "</name>" in forwarding_buffer:
                                                    import re
                                                    name_match = re.search(r'<name>\s*(.*?)\s*</name>', forwarding_buffer, re.DOTALL)
                                                    tool_name = name_match.group(1).strip() if name_match else "unknown"
                                                    send_content(f"\n\n> 🤖 **正在调用工具: `{tool_name}`...**\n\n")
                                                    tool_use_sent_hint = True

                                                # 检查结束标签
                                                if "</tool_use>" in forwarding_buffer:
                                                    end_idx = forwarding_buffer.find("</tool_use>") + len("</tool_use>")
                                                    tool_xml = forwarding_buffer[:end_idx]

                                                    print(f"[Stream] Detected tool_use: {tool_xml[:50]}...")
                                                    try:
                                                        tool_result = self._parse_and_execute_tool_use(tool_xml)
                                                        tool_calls.append((tool_xml, tool_result or "No result"))
                                                    except Exception as e:
                                                        tool_calls.append((tool_xml, f"Error: {str(e)}"))

                                                    # 移除已处理的工具 XML，保留剩余部分
                                                    forwarding_buffer = forwarding_buffer[end_idx:]
                                                    in_tool_use_block = False
                                                    tool_use_sent_hint = False
                                                else:
                                                    # 还在工具块内，继续累积，不发送任何内容
                                                    pass

                                            # 2. 处理 <tool_use_result> 块 (类似逻辑)
                                            elif in_tool_result_block:
                                                if not tool_result_sent_hint and "<name>" in forwarding_buffer and "</name>" in forwarding_buffer:
                                                    import re
                                                    name_match = re.search(r'<name>\s*(.*?)\s*</name>', forwarding_buffer, re.DOTALL)
                                                    tool_name = name_match.group(1).strip() if name_match else "tool"
                                                    send_content(f"\n\n> ✅ **工具 `{tool_name}` 返回结果**\n\n")
                                                    tool_result_sent_hint = True

                                                if "</tool_use_result>" in forwarding_buffer:
                                                    end_idx = forwarding_buffer.find("</tool_use_result>") + len("</tool_use_result>")
                                                    tool_result_xml = forwarding_buffer[:end_idx]

                                                    # 提取结果并显示
                                                    import re
                                                    result_match = re.search(r'<result>\s*(.*?)\s*</result>', tool_result_xml, re.DOTALL)
                                                    if result_match:
                                                        result_content = result_match.group(1).strip()
                                                        try:
                                                            result_obj = json.loads(result_content)
                                                            formatted = f"```json\n{json.dumps(result_obj, indent=2, ensure_ascii=False)}\n```\n\n"
                                                        except:
                                                            formatted = f"```\n{result_content}\n```\n\n"
                                                        send_content(formatted)

                                                    forwarding_buffer = forwarding_buffer[end_idx:]
                                                    in_tool_result_block = False
                                                    tool_result_sent_hint = False
                                                else:
                                                    pass

                                            # 3. 正常文本模式 (检测标签开始)
                                            else:
                                                # 检测 <tool_use>
                                                tool_use_start = forwarding_buffer.find("<tool_use>")
                                                if tool_use_start != -1:
                                                    # 发送标签前的内容
                                                    if tool_use_start > 0:
                                                        send_content(forwarding_buffer[:tool_use_start])
                                                    # 切换状态，保留标签后的内容在 buffer 中
                                                    forwarding_buffer = forwarding_buffer[tool_use_start:]
                                                    in_tool_use_block = True
                                                    continue # 重新进入循环处理 buffer

                                                # 检测 <tool_use_result>
                                                tool_result_start = forwarding_buffer.find("<tool_use_result>")
                                                if tool_result_start != -1:
                                                    if tool_result_start > 0:
                                                        send_content(forwarding_buffer[:tool_result_start])
                                                    forwarding_buffer = forwarding_buffer[tool_result_start:]
                                                    in_tool_result_block = True
                                                    continue

                                                # 检测潜在的半个标签 (防止标签被切断发送)
                                                # 如果 buffer 结尾包含 '<'，可能是标签的开始
                                                last_open = forwarding_buffer.rfind('<')
                                                if last_open != -1:
                                                    # 检查是否看起来像我们关心的标签的前缀
                                                    potential_tag = forwarding_buffer[last_open:]
                                                    if any(tag.startswith(potential_tag) for tag in ["<tool_use>", "<tool_use_result>"]):
                                                        # 确实像，发送 '<' 之前的部分，保留 potential_tag
                                                        if last_open > 0:
                                                            send_content(forwarding_buffer[:last_open])
                                                            forwarding_buffer = forwarding_buffer[last_open:]
                                                        # buffer 现在只包含潜在的标签前缀，等待更多数据
                                                        continue

                                                # 没有标签，发送所有内容
                                                if forwarding_buffer:
                                                    send_content(forwarding_buffer)
                                                    forwarding_buffer = ""

                                    # 循环结束后，处理残留 buffer
                                    if forwarding_buffer:
                                        if in_tool_use_block:
                                            # 不完整的工具调用 - 流被截断
                                            print(f"[Stream] Incomplete tool_use detected at stream end, buffer: {forwarding_buffer[:100]}...")
                                            # 发送错误提示
                                            send_content(f"\n\n> ⚠️ **工具调用被截断** (可能是输出长度限制)\n\n")
                                            # 不要把不完整的 XML 作为工具调用
                                        elif in_tool_result_block:
                                            # 不完整的工具结果
                                            print(f"[Stream] Incomplete tool_use_result at stream end")
                                            send_content(f"\n\n> ⚠️ **工具结果被截断**\n\n")
                                        else:
                                            # 正常的残留内容
                                            send_content(forwarding_buffer)

                                    # 成功完成，返回结果
                                    return full_response_text, tool_calls

                            except Exception as e:
                                import traceback
                                print(f"[Stream] Error in process_stream: {e}\n{traceback.format_exc()}")
                                # 如果出错，发送错误提示并返回已收集的内容
                                try:
                                    send_content(f"\n\n> ❌ **流处理错误**: {str(e)}\n\n")
                                except:
                                    pass
                                return full_response_text, tool_calls

                        # 第一次请求
                        print(f"[Stream] Starting first request...")
                        full_content, tool_calls = process_stream(req, is_continuation=False)
                        print(f"[Stream] First request completed. tool_calls={len(tool_calls)}, content_len={len(full_content)}")

                        # 工具调用循环（默认最多 15 轮，防止死循环）
                        # TODO: 将来可以从配置文件或请求参数中读取
                        max_iterations = 15
                        iteration = 0
                        failed_tools = set()  # 跟踪失败的工具名称，避免重复调用
                        consecutive_all_errors = 0  # 跟踪连续全部失败的轮次

                        while tool_calls and iteration < max_iterations and original_body:
                            iteration += 1
                            print(f"[Stream] Tool call iteration {iteration}, {len(tool_calls)} tools executed")

                            # 构造工具结果消息 - 使用友好的 Markdown 格式
                            tool_results_text = ""
                            tool_results_for_llm = ""  # 发送给 LLM 的原始格式
                            not_found_count = 0  # 统计 "Tool not found" 错误数量
                            current_failed_tools = []  # 本轮失败的工具

                            for tool_xml, tool_result in tool_calls:
                                # 提取工具名称
                                import re
                                name_match = re.search(r'<name>\s*(.*?)\s*</name>', tool_xml, re.DOTALL)
                                tool_name = name_match.group(1).strip() if name_match else "unknown"

                                # 检查是否是 "Tool not found" 错误
                                if 'Tool not found' in str(tool_result) or 'not found' in str(tool_result).lower():
                                    not_found_count += 1
                                    failed_tools.add(tool_name)
                                    current_failed_tools.append(tool_name)

                                # 格式化为友好的 Markdown（给用户显示）
                                formatted_result = f"\n\n---\n\n**🔧 工具调用: `{tool_name}`**\n\n"
                                # 尝试解析 JSON 并格式化
                                try:
                                    result_obj = json.loads(tool_result)
                                    formatted_result += f"```json\n{json.dumps(result_obj, indent=2, ensure_ascii=False)}\n```\n\n"
                                except:
                                    # 不是 JSON，直接显示
                                    formatted_result += f"```\n{tool_result}\n```\n\n"

                                tool_results_text += formatted_result
                                # 保留原始格式给 LLM
                                tool_results_for_llm += f"\n\n<tool_result>\n{tool_result}\n</tool_result>\n\n"

                            # 检查是否所有工具调用都是 "Tool not found" 错误
                            all_tools_not_found = (not_found_count == len(tool_calls) and len(tool_calls) > 0)
                            if all_tools_not_found:
                                consecutive_all_errors += 1
                                print(f"[Stream] All {len(tool_calls)} tool(s) not found. Consecutive all-error rounds: {consecutive_all_errors}")
                            else:
                                consecutive_all_errors = 0  # 重置计数器

                            # 如果连续 2 轮所有工具都失败，强制终止循环
                            if consecutive_all_errors >= 2:
                                print(f"[Stream] Stopping loop: {consecutive_all_errors} consecutive rounds with all tools not found")
                                stop_msg = f"\n\n> ⚠️ **工具调用失败**: 连续 {consecutive_all_errors} 轮所有工具都未找到，已停止循环。失败的工具: {', '.join(current_failed_tools)}\n\n"
                                sse_stop = {"choices": [{"delta": {"content": stop_msg}}]}
                                stream_queue.put({"type": "data", "data": f'data: {json.dumps(sse_stop)}\n\n'})
                                break

                            # 发送工具结果给用户显示（友好格式）
                            sse_data = {"choices": [{"delta": {"content": tool_results_text}}]}
                            sse_line = f'data: {json.dumps(sse_data)}\n\n'
                            stream_queue.put({"type": "data", "data": sse_line})

                            # 构造新请求，将工具结果发送给 LLM
                            new_body = original_body.copy()
                            messages = list(new_body.get('messages', []))  # 创建副本避免修改原始列表

                            # 添加助手消息（包含 tool_use）和工具结果
                            # 注意：full_content 可能非常长（包含思考过程），需要适当截断以避免超过上下文限制
                            assistant_content = full_content
                            if len(assistant_content) > 8000:
                                # 截断过长的内容，但保留开头（思考）和结尾（工具调用）
                                print(f"[Stream] Truncating long assistant content: {len(assistant_content)} chars")
                                assistant_content = assistant_content[:3000] + "\n\n[... 内容已截断 ...]\n\n" + assistant_content[-3000:]

                            messages.append({
                                "role": "assistant",
                                "content": assistant_content
                            })
                            # 检查是否有工具执行失败
                            has_errors = any('Error' in str(result) or 'error' in str(result).lower() for _, result in tool_calls)

                            continuation_prompt = f"Tool execution results:{tool_results_for_llm}\n\n"
                            if has_errors:
                                continuation_prompt += "IMPORTANT: Some tool calls failed. Please carefully read the error messages above. If a tool is 'not found', do NOT retry it - use the 'search' tool to discover available tools first. If you have enough information to answer the user's question, provide the final answer instead of calling more tools.\n\n"
                                # 如果有失败的工具，明确告知 LLM 不要再调用这些工具
                                if failed_tools:
                                    continuation_prompt += f"CRITICAL: The following tools do NOT exist and must NOT be called again: {', '.join(failed_tools)}. These tools are NOT available in this system.\n\n"
                            continuation_prompt += "Please continue based on the tool results above. If you need to call more tools, use <tool_use> format. If you have enough information, provide the final answer."

                            messages.append({
                                "role": "user",
                                "content": continuation_prompt
                            })

                            new_body['messages'] = messages
                            new_body_bytes = json.dumps(new_body).encode('utf-8')

                            # 创建新请求
                            new_req = urllib_request.Request(url, data=new_body_bytes, method=method)
                            for key, value in headers.items():
                                try:
                                    new_req.add_header(str(key), str(value))
                                except:
                                    pass
                            if not any(k.lower() == 'content-type' for k in headers.keys()):
                                new_req.add_header('Content-Type', 'application/json')

                            # 发送分隔符
                            separator = "\n\n---\n\n"
                            sse_sep = {"choices": [{"delta": {"content": separator}}]}
                            stream_queue.put({"type": "data", "data": f'data: {json.dumps(sse_sep)}\n\n'})

                            # 处理新的流式响应
                            print(f"[Stream] Starting continuation request (iteration {iteration})...")
                            try:
                                full_content, tool_calls = process_stream(new_req, is_continuation=True)
                                print(f"[Stream] Continuation completed. tool_calls={len(tool_calls)}, content_len={len(full_content)}")
                            except Exception as e:
                                import traceback
                                print(f"[Stream] Continuation failed: {e}\n{traceback.format_exc()}")
                                # 发送错误提示并退出循环
                                error_msg = f"\n\n> ❌ **继续请求失败**: {str(e)}\n\n"
                                sse_err = {"choices": [{"delta": {"content": error_msg}}]}
                                stream_queue.put({"type": "data", "data": f'data: {json.dumps(sse_err)}\n\n'})
                                tool_calls = []  # 清空以退出循环

                        if iteration >= max_iterations and tool_calls:
                            print(f"[Stream] Max iterations reached, stopping tool loop")
                            # 通知用户
                            max_iter_msg = f"\n\n> ⚠️ **已达到最大工具调用次数 ({max_iterations})，停止继续调用**\n\n"
                            sse_max = {"choices": [{"delta": {"content": max_iter_msg}}]}
                            stream_queue.put({"type": "data", "data": f'data: {json.dumps(sse_max)}\n\n'})

                        stream_queue.put({"type": "end"})
                    except Exception as e:
                        import traceback
                        print(f"[Stream] Error: {e}\n{traceback.format_exc()}")
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
            error_msg = str(e)
            # 快速识别连接拒绝错误 - 输出到控制台
            if "10061" in error_msg or "Connection refused" in error_msg.lower():
                print(f"[fetchProxy] Connection refused for URL: {url}")
            else:
                print(f"[fetchProxy] Error for URL {url[:100]}: {error_msg}")
            return json.dumps({"error": error_msg})

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
        """保存全局记忆配置"""
        try:
            _log(f"memorySetConfig called with length: {len(config)}")
            config_data = json.loads(config)
            storage_path = os.path.join(self._get_app_data_dir(), 'localStorage.json')

            storage_data = {}
            if os.path.exists(storage_path):
                try:
                    with open(storage_path, 'r', encoding='utf-8') as f:
                        storage_data = json.load(f)
                except Exception as e:
                    _log(f"Error reading localStorage.json: {e}")

            # 保存 memoryConfig
            storage_data['memoryConfig'] = config_data

            with open(storage_path, 'w', encoding='utf-8') as f:
                json.dump(storage_data, f, ensure_ascii=False, indent=2)

            return 'true'
        except Exception as e:
            _log(f"memorySetConfig error: {e}")
            return 'false'

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
                    # 使用 stdio transport 客户端，在后台线程执行以避免阻塞 UI
                    def do_list_tools():
                        client = _get_or_create_mcp_stdio_client(server_config)
                        return client.list_tools()

                    executor = self._get_http_executor()
                    future = executor.submit(do_list_tools)

                    # 安全地等待结果
                    tools = self._wait_for_future_safely(future, timeout_ms=130000)

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

                            # 确保工具描述不为空，帮助大模型理解工具用途
                            tool_description = tool_dict.get('description', '')
                            if not tool_description or tool_description.strip() == '':
                                tool_description = f"Tool '{tool_name}' from MCP server '{server_name}'"

                            tools_data.append({
                                "id": tool_id,
                                "name": tool_dict.get('name', tool_name),
                                "description": tool_description,
                                "inputSchema": tool_dict.get('inputSchema', {}),
                                "serverId": server_id,
                                "serverName": server_name,
                                "type": "mcp"
                            })

                        # 记录每个工具的信息，便于调试
                        _log(f"[MCP] Tool {len(tools_data)}: id={tool_id}, name={tool_name}, description={tool_description[:50]}...")

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

            # 运行异步函数 - 使用线程池执行，安全地等待结果
            executor = self._get_http_executor()
            future = executor.submit(asyncio.run, get_tools())

            # 安全地等待结果
            tools = self._wait_for_future_safely(future, timeout_ms=60000)

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

                    # 确保工具描述不为空，帮助大模型理解工具用途
                    tool_description = ''
                    if hasattr(tool, 'description'):
                        tool_description = getattr(tool, 'description', '')
                    if not tool_description or (isinstance(tool_description, str) and tool_description.strip() == ''):
                        tool_description = f"Tool '{tool_name}' from MCP server '{server_name}'"

                    tools_data.append({
                        "id": tool_id,
                        "name": tool_name,
                        "description": tool_description,
                        "inputSchema": tool.inputSchema if hasattr(tool, 'inputSchema') else {},
                        "serverId": server_id,
                        "serverName": server_name,
                        "type": "mcp"
                    })

                    # 记录每个工具的信息，便于调试
                    _log(f"[MCP] Tool {len(tools_data)}: id={tool_id}, name={tool_name}, description={tool_description[:50]}...")

                _log(f"[MCP] Returning {len(tools_data)} tools with IDs: {[t['id'] for t in tools_data[:3]]}")
                return json.dumps(tools_data)
            else:
                _log(f"[MCP] No tools returned from server, returning empty list")
                return '[]'

        except ImportError:
            return '[]'
        except Exception:
            return '[]'

    def _parse_and_execute_tool_use(self, tool_use_xml: str) -> str:
        """解析并执行 <tool_use> XML 标签中的工具调用

        Args:
            tool_use_xml: 完整的 <tool_use>...</tool_use> XML 字符串

        Returns:
            工具执行结果的字符串
        """
        import re
        import json

        _log(f"[Tool] Parsing tool_use XML: {tool_use_xml[:300]}...")

        try:
            # 解析 <name> 标签
            name_match = re.search(r'<name>\s*(.*?)\s*</name>', tool_use_xml, re.DOTALL)
            if not name_match:
                return "Error: No <name> tag found in tool_use"
            tool_name = name_match.group(1).strip()

            # 解析 <arguments> 标签
            args_match = re.search(r'<arguments>\s*(.*?)\s*</arguments>', tool_use_xml, re.DOTALL)
            tool_args = {}
            if args_match:
                args_str = args_match.group(1).strip()
                try:
                    tool_args = json.loads(args_str)
                except json.JSONDecodeError as e:
                    _log(f"[Tool] Failed to parse arguments JSON: {e}, args_str: {args_str}")
                    # 尝试修复常见的 JSON 格式问题
                    try:
                        # 处理没有引号的键
                        fixed_args = re.sub(r'(\w+):', r'"\1":', args_str)
                        fixed_args = fixed_args.replace("'", '"')
                        tool_args = json.loads(fixed_args)
                    except:
                        return f"Error: Failed to parse arguments: {args_str}"

            _log(f"[Tool] Parsed tool: {tool_name}, raw args: {tool_args}")

            # 检查是否是 Hub 服务器的工具 (search/exec/parallel/settle)
            if tool_name.lower() in ('search', 'exec', 'parallel', 'settle'):
                # Hub 工具使用简单的参数规范化（没有特定的 schema）
                if tool_args:
                    tool_args = self._normalize_tool_args(tool_args)
                _log(f"[Tool] Executing hub tool: {tool_name} with args: {tool_args}")
                result = self._handle_hub_tool(tool_name.lower(), tool_args)
                result_obj = json.loads(result)
                if result_obj.get('isError'):
                    content = result_obj.get('content', [])
                    if content and len(content) > 0:
                        return f"Error: {content[0].get('text', 'Unknown error')}"
                    return "Error: Unknown error"
                else:
                    content = result_obj.get('content', [])
                    text_parts = []
                    for item in content:
                        if item.get('type') == 'text':
                            text_parts.append(item.get('text', ''))
                    return '\n'.join(text_parts) if text_parts else json.dumps(content)

            # 尝试找到对应的 MCP 工具并调用
            # 首先刷新工具缓存
            all_tools = self._get_all_active_tools()

            # 构建工具名称到工具的映射
            tool_map = {}
            for t in all_tools:
                # 使用多种名称格式进行匹配
                tool_map[t.get('name', '')] = t
                tool_map[t.get('functionName', '')] = t
                # 也尝试 serverName_toolName 格式
                full_name = f"{t.get('serverName', '')}_{t.get('name', '')}"
                tool_map[full_name] = t

            # 查找工具
            tool = tool_map.get(tool_name)
            if not tool:
                # 尝试模糊匹配
                for name, t in tool_map.items():
                    if tool_name.lower() in name.lower() or name.lower() in tool_name.lower():
                        tool = t
                        break

            if not tool:
                return f"Error: Tool not found: {tool_name}. Available tools: {', '.join(list(tool_map.keys())[:10])}"

            # 获取工具的 input_schema，用于智能参数映射
            input_schema = tool.get('inputSchema', {})

            # 将 camelCase 参数名转换为 snake_case，并根据 input_schema 智能映射
            if tool_args:
                tool_args = self._normalize_tool_args(tool_args, input_schema)

            _log(f"[Tool] Executing tool: {tool_name} with args (normalized): {tool_args}")

            # 获取服务器配置
            server_key = tool.get('serverId', '')
            server_config = self._get_server_config_by_id(server_key)

            if not server_config:
                return f"Error: Server config not found for tool: {tool_name}"

            # 调用工具
            call_payload = json.dumps({
                'server': server_config,
                'name': tool.get('name', ''),
                'args': tool_args,
                'callId': f"stream_tool_{tool_name}"
            })

            result_str = self.mcpCallTool(call_payload)
            result_obj = json.loads(result_str)

            if result_obj.get('isError'):
                content = result_obj.get('content', [])
                if content and len(content) > 0:
                    return f"Error: {content[0].get('text', 'Unknown error')}"
                return "Error: Unknown error"
            else:
                content = result_obj.get('content', [])
                text_parts = []
                for item in content:
                    if item.get('type') == 'text':
                        text_parts.append(item.get('text', ''))
                return '\n'.join(text_parts) if text_parts else json.dumps(content)

        except Exception as e:
            import traceback
            _log(f"[Tool] Error executing tool: {e}\n{traceback.format_exc()}")
            return f"Error: {str(e)}"

    def _handle_hub_tool(self, tool_name: str, tool_args: dict) -> str:
        """处理 Hub 服务器的 search/exec/parallel/settle 工具调用

        Args:
            tool_name: 工具名称 ('search', 'exec', 'parallel', 'settle')
            tool_args: 工具参数

        Returns:
            JSON 字符串，包含工具调用结果
        """
        import json

        _log(f"[MCP Hub] Handling tool: {tool_name} with args: {tool_args}")

        if tool_name == 'search':
            return self._hub_search(tool_args)
        elif tool_name == 'exec':
            return self._hub_exec(tool_args)
        elif tool_name in ('parallel', 'settle'):
            return self._hub_parallel_settle(tool_name, tool_args)
        else:
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': f'Unknown hub tool: {tool_name}'}]
            })

    def _hub_parallel_settle(self, mode: str, args: dict) -> str:
        """处理 parallel 和 settle 工具的直接调用

        Args:
            mode: 'parallel' 或 'settle'
            args: 工具参数，可能包含:
                  - calls: 工具调用代码列表 ["await toolA(...)", "await toolB(...)"]
                  - code: 包含多个调用的代码字符串

        Returns:
            JSON 字符串，包含执行结果
        """
        import json
        import re
        from concurrent.futures import ThreadPoolExecutor, as_completed

        _log(f"[MCP Hub] {mode} called with args: {args}")

        # 获取调用列表
        calls_list = args.get('calls', [])
        code = args.get('code', '')

        # 如果提供了 code，解析其中的调用
        if code and not calls_list:
            # 将 code 作为一个包含多个调用的字符串处理
            calls_list = [code]

        if not calls_list:
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': f'{mode} requires either "calls" (array) or "code" (string) parameter'}]
            })

        # 获取所有工具和映射
        all_tools = self._get_all_active_tools()
        searxng_url = self._load_searxng_url()

        tool_map = {}
        for t in all_tools:
            func_name_gen = self._generate_function_name(t.get('serverName', ''), t.get('name', ''))
            tool_map[func_name_gen] = t
            tool_map[t.get('name', '')] = t
            full_name = f"{t.get('serverName', '')}_{t.get('name', '')}"
            tool_map[full_name] = t

        # 解析所有调用
        parsed_calls = []
        for call_code in calls_list:
            # 解析 await xxx(...) 格式
            pos = 0
            while True:
                match = re.search(r'await\s+(\w+)\s*\(', call_code[pos:])
                if not match:
                    break

                func_name = match.group(1)
                start_args = pos + match.end()

                # 扫描参数，匹配括号
                balance = 1
                current = start_args
                in_string = False
                string_char = None

                while balance > 0 and current < len(call_code):
                    char = call_code[current]
                    if in_string:
                        if char == string_char and (current == 0 or call_code[current-1] != '\\'):
                            in_string = False
                    else:
                        if char in ('"', "'", "`"):
                            in_string = True
                            string_char = char
                        elif char == '(':
                            balance += 1
                        elif char == ')':
                            balance -= 1
                    current += 1

                if balance == 0:
                    args_str = call_code[start_args:current-1].strip()
                    parsed_calls.append((func_name, args_str))
                    pos = current
                else:
                    pos = start_args

        if not parsed_calls:
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': f'No valid tool calls found. Expected format: await ToolName({{...}})'}]
            })

        _log(f"[MCP Hub] {mode}: Found {len(parsed_calls)} calls: {[c[0] for c in parsed_calls]}")

        # 定义执行单个工具的函数
        def execute_tool(func_name: str, args_str: str) -> dict:
            """执行单个工具调用"""
            # 检查 web_search
            if func_name in ['web_search', 'builtin_web_search'] and searxng_url:
                try:
                    tool_args = {}
                    if args_str and args_str.startswith('{'):
                        try:
                            tool_args = json.loads(args_str)
                        except:
                            fixed_json = re.sub(r'(\w+):', r'"\1":', args_str)
                            try:
                                tool_args = json.loads(fixed_json)
                            except:
                                tool_args = {'query': args_str}

                    result_json = self._exec_searxng_search(searxng_url, tool_args)
                    result_obj = json.loads(result_json)
                    if not result_obj.get('isError'):
                        content_list = result_obj.get('content', [])
                        if content_list:
                            return {'tool': func_name, 'result': content_list[0].get('text', '')}
                    return {'tool': func_name, 'error': 'Web search failed'}
                except Exception as e:
                    return {'tool': func_name, 'error': str(e)}

            # 查找工具
            tool = tool_map.get(func_name)
            if not tool and '_' in func_name:
                simple_name = func_name.split('_', 1)[1]
                tool = tool_map.get(simple_name)

            if not tool:
                return {'tool': func_name, 'error': f'Tool not found: {func_name}'}

            # 解析和规范化参数
            try:
                tool_args = self._parse_tool_args(args_str, func_name)
                input_schema = tool.get('inputSchema', {})
                if tool_args:
                    tool_args = self._normalize_tool_args(tool_args, input_schema)
            except Exception as e:
                return {'tool': func_name, 'error': f'Failed to parse arguments: {str(e)}'}

            # 调用工具
            try:
                server_key = tool.get('serverId', '')
                server_config = self._get_server_config_by_id(server_key)

                if not server_config:
                    return {'tool': func_name, 'error': f'Server config not found'}

                call_payload = json.dumps({
                    'server': server_config,
                    'name': tool.get('name', ''),
                    'args': tool_args,
                    'callId': f"parallel_{func_name}"
                })

                result_str = self.mcpCallTool(call_payload)
                result_obj = json.loads(result_str)

                if result_obj.get('isError'):
                    content = result_obj.get('content', [])
                    error_text = content[0].get('text', 'Unknown error') if content else 'Unknown error'
                    return {'tool': func_name, 'error': error_text}
                else:
                    content = result_obj.get('content', [])
                    text_content = ''.join(item.get('text', '') for item in content if item.get('type') == 'text')
                    return {'tool': func_name, 'result': text_content or json.dumps(content)}

            except Exception as e:
                return {'tool': func_name, 'error': str(e)}

        # 并行执行所有调用
        results = []
        has_error = False

        with ThreadPoolExecutor(max_workers=min(len(parsed_calls), 5)) as executor:
            future_to_call = {
                executor.submit(execute_tool, func_name, args_str): (func_name, args_str)
                for func_name, args_str in parsed_calls
            }

            for future in as_completed(future_to_call):
                try:
                    result = future.result()
                    results.append(result)
                    if 'error' in result:
                        has_error = True
                except Exception as e:
                    func_name, _ = future_to_call[future]
                    results.append({'tool': func_name, 'error': str(e)})
                    has_error = True

        # 根据 mode 返回结果
        if mode == 'parallel':
            if has_error:
                return json.dumps({
                    'isError': True,
                    'content': [{'type': 'text', 'text': json.dumps({
                        'error': 'One or more parallel calls failed',
                        'results': results
                    }, ensure_ascii=False)}]
                })
            else:
                return json.dumps({
                    'isError': False,
                    'content': [{'type': 'text', 'text': json.dumps(results, ensure_ascii=False)}]
                })
        else:  # settle
            settled = []
            for r in results:
                if 'error' in r:
                    settled.append({'status': 'rejected', 'tool': r['tool'], 'reason': r['error']})
                else:
                    settled.append({'status': 'fulfilled', 'tool': r['tool'], 'value': r.get('result', '')})
            return json.dumps({
                'isError': False,
                'content': [{'type': 'text', 'text': json.dumps(settled, ensure_ascii=False)}]
            })

    def _load_searxng_url(self):
        """从 localStorage.json 加载 SearXNG 配置"""
        try:
            config_path = os.path.join(os.path.expanduser("~"), ".cherrystudio", "localStorage.json")
            if not os.path.exists(config_path):
                return None

            with open(config_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Redux persist key
            websearch_str = data.get('persist:websearch')
            if not websearch_str:
                return None

            websearch_state = json.loads(websearch_str)
            providers = websearch_state.get('providers', [])

            for p in providers:
                # 查找 searxng 类型的提供商
                # 注意：这里假设 id 或 engine 字段标识了 searxng，或者用户配置的那个
                # 通常 id 是 'searxng' 或者用户自定义的
                if p.get('engine') == 'searxng' or p.get('id') == 'searxng':
                     if p.get('apiBase'):
                         return p.get('apiBase')

            return None
        except Exception as e:
            print(f"[Config] Error loading searxng config: {e}")
            return None

    def _exec_searxng_search(self, api_base, args):
        """执行 SearXNG 搜索"""
        import urllib.request
        import urllib.parse
        import json

        query = args.get('query')
        if not query:
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': 'Query is required'}]
            })

        # 移除可能的末尾斜杠
        api_base = api_base.rstrip('/')

        params = {
            'q': query,
            'format': 'json',
            'categories': args.get('categories', 'general'),
            'language': 'zh-CN' # 默认中文，或者应该从 args 获取？
        }

        url = f"{api_base}/search?{urllib.parse.urlencode(params)}"
        print(f"[Builtin] Executing SearXNG search: {url}")

        try:
            req = urllib.request.Request(url)
            # 添加 User-Agent 以避免被拒绝
            req.add_header('User-Agent', 'CherryStudio/1.0')

            with urllib.request.urlopen(req, timeout=30) as response:
                data = json.loads(response.read().decode('utf-8'))

                results = data.get('results', [])
                if not results:
                     return json.dumps({
                        'isError': False,
                        'content': [{'type': 'text', 'text': 'No results found.'}]
                    })

                # 格式化结果
                formatted_results = []
                for i, r in enumerate(results[:8]): # 取前8个结果
                    title = r.get('title', 'No Title')
                    link = r.get('url', '')
                    content = r.get('content', '') or r.get('snippet', '')
                    formatted_results.append(f"[{i+1}] {title}\nURL: {link}\nContent: {content}")

                result_text = "Search Results:\n\n" + "\n\n".join(formatted_results)

                return json.dumps({
                    'isError': False,
                    'content': [{'type': 'text', 'text': result_text}]
                })

        except Exception as e:
            print(f"[Builtin] SearXNG search error: {e}")
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': f'Search failed: {str(e)}'}]
            })

    def _hub_search(self, args: dict) -> str:
        """Hub 服务器的 search 工具：搜索可用的 MCP 工具

        Args:
            args: 包含 query (搜索关键词) 和可选的 limit (结果数量限制)

        Returns:
            JSON 字符串，包含匹配的工具列表
        """
        import json

        query = args.get('query', '')
        limit = min(args.get('limit', 10), 50)  # 最多返回50个结果

        _log(f"[MCP Hub] search called with query: {query}, limit: {limit}")

        try:
            # 获取所有激活的 MCP 服务器的工具
            all_tools = self._get_all_active_tools()

            # [Builtin] 注入 Web Search 工具 (如果配置了 SearXNG)
            searxng_url = self._load_searxng_url()
            if searxng_url:
                all_tools.append({
                    'name': 'web_search',
                    'description': 'Search the internet for real-time information, news, and facts.',
                    'serverName': 'builtin',
                    'inputSchema': {
                        'type': 'object',
                        'properties': {
                            'query': {'type': 'string', 'description': 'The search query'},
                            'categories': {'type': 'string', 'description': 'Comma separated categories (e.g. general, news, science)', 'default': 'general'}
                        },
                        'required': ['query']
                    }
                })

            if not all_tools:
                return json.dumps({
                    'isError': False,
                    'content': [{'type': 'text', 'text': json.dumps({
                        'total': 0,
                        'tools': 'No active MCP servers or tools found. Please ensure MCP servers are configured and active.'
                    }, indent=2)}]
                })

            # 搜索匹配的工具
            keywords = [k.strip().lower() for k in query.split(',') if k.strip()]

            if not keywords:
                # 没有关键词，返回所有工具
                matched_tools = all_tools[:limit]
            else:
                # 按关键词筛选
                matched_tools = []
                for tool in all_tools:
                    search_text = f"{tool.get('name', '')} {tool.get('description', '')} {tool.get('serverName', '')}".lower()
                    if any(keyword in search_text for keyword in keywords):
                        matched_tools.append(tool)
                        if len(matched_tools) >= limit:
                            break

            # 生成工具签名
            tool_signatures = []
            for tool in matched_tools:
                func_name = self._generate_function_name(tool.get('serverName', ''), tool.get('name', ''))
                desc = tool.get('description', '')[:100] or f"Tool from {tool.get('serverName', 'unknown')}"
                input_schema = tool.get('inputSchema', {})

                # 生成参数签名
                params = []
                properties = input_schema.get('properties', {})
                required = input_schema.get('required', [])
                for param_name, param_info in properties.items():
                    param_type = param_info.get('type', 'any')
                    is_required = param_name in required
                    param_desc = param_info.get('description', '')
                    params.append(f"{param_name}: {param_type}{'?' if not is_required else ''}")

                params_str = ', '.join(params) if params else ''
                signature = f"/**\n * {desc}\n */\nasync function {func_name}({{{params_str}}}): Promise<any>"
                tool_signatures.append(signature)

            result = {
                'total': len(matched_tools),
                'tools': '\n\n'.join(tool_signatures) if tool_signatures else 'No matching tools found.'
            }

            return json.dumps({
                'isError': False,
                'content': [{'type': 'text', 'text': json.dumps(result, indent=2)}]
            })

        except Exception as e:
            import traceback
            _log(f"[MCP Hub] search error: {e}\n{traceback.format_exc()}")
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': f'Error searching tools: {str(e)}'}]
            })

    def _camel_to_snake(self, name: str) -> str:
        """将 camelCase 转换为 snake_case"""
        import re
        # 处理连续的大写字母（如 HTTPError -> http_error）
        s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
        return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

    # 常见的参数别名映射（LLM可能使用的名称 -> 工具实际期望的名称）
    # 这些是语义上等价的参数名
    PARAM_ALIASES = {
        # Confluence/Atlassian 相关
        'content_id': 'page_id',
        'contentId': 'page_id',
        'pageId': 'page_id',
        'id': 'page_id',  # 通用的 id 参数，可能需要根据工具上下文决定
        'space_id': 'space_key',
        'spaceId': 'space_key',
        # Jira 相关
        'issueId': 'issue_id_or_key',
        'issue_id': 'issue_id_or_key',
        'issueKey': 'issue_id_or_key',
        'issue_key': 'issue_id_or_key',
        # 通用搜索相关
        'q': 'query',
        'search': 'query',
        'keyword': 'query',
        'keywords': 'query',
        # 分页相关
        'count': 'limit',
        'max': 'limit',
        'maxResults': 'limit',
        'max_results': 'limit',
        'size': 'limit',
        'page': 'start',
        'offset': 'start',
        'skip': 'start',
    }

    def _normalize_tool_args(self, args: dict, input_schema: dict = None) -> dict:
        """将工具参数的 key 从 camelCase 转换为 snake_case，并应用参数别名映射

        MCP 工具通常使用 snake_case 参数名，但 LLM 可能输出 camelCase 或语义等价的不同名称

        Args:
            args: 原始参数字典
            input_schema: 工具的 input schema，用于智能匹配参数名
        """
        if not isinstance(args, dict):
            return args

        # 从 input_schema 提取期望的参数名
        expected_params = set()
        if input_schema and isinstance(input_schema, dict):
            properties = input_schema.get('properties', {})
            expected_params = set(properties.keys())

        normalized = {}
        for key, value in args.items():
            # 1. 首先将 camelCase 转换为 snake_case
            if '_' in key:
                # 已经是 snake_case
                snake_key = key
            else:
                snake_key = self._camel_to_snake(key)

            # 2. 检查是否需要应用别名映射
            final_key = snake_key

            # 如果有 input_schema，优先根据 schema 匹配
            if expected_params:
                if snake_key in expected_params:
                    # 已经匹配，直接使用
                    final_key = snake_key
                elif key in expected_params:
                    # 原始 key 匹配
                    final_key = key
                else:
                    # 尝试使用别名映射
                    alias = self.PARAM_ALIASES.get(snake_key) or self.PARAM_ALIASES.get(key)
                    if alias and alias in expected_params:
                        final_key = alias
                        _log(f"[Tool Args] Mapped '{key}' -> '{final_key}' (via alias)")
            else:
                # 没有 schema，只应用别名映射
                alias = self.PARAM_ALIASES.get(snake_key) or self.PARAM_ALIASES.get(key)
                if alias:
                    final_key = alias
                    _log(f"[Tool Args] Mapped '{key}' -> '{final_key}' (via alias, no schema)")

            normalized[final_key] = value

        return normalized

    def _parse_tool_args(self, args_str: str, tool_name: str = "") -> dict:
        """解析工具参数，支持多种格式"""
        import re
        import json

        if not args_str or not args_str.strip():
            return {}

        args_str = args_str.strip()

        result = None

        # 1. 尝试直接解析标准 JSON
        try:
            result = json.loads(args_str)
        except:
            pass

        # 2. 处理 JS 对象字面量格式 { key: value }
        if result is None and args_str.startswith('{'):
            json_str = args_str

            # 2a. 给没有引号的 key 加上双引号
            json_str = re.sub(r'([{,]\s*)(\w+)(\s*:)', r'\1"\2"\3', json_str)

            # 2b. 将单引号的值替换为双引号
            # 这个正则尝试匹配 : '...' 并替换为 : "..."
            json_str = re.sub(r":\s*'([^']*)'", r': "\1"', json_str)

            # 2c. 处理 undefined/null
            json_str = json_str.replace(': undefined', ': null')

            # 2d. 移除尾部逗号
            json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)

            try:
                result = json.loads(json_str)
            except:
                pass

            if result is None:
                # 2e. 更激进的修复：双引号替换所有单引号
                json_str = args_str.replace("'", '"')
                json_str = re.sub(r'([{,]\s*)(\w+)(\s*:)', r'\1"\2"\3', json_str)
                json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)

                try:
                    result = json.loads(json_str)
                except:
                    pass

        # 3. 处理简单的 key=value 格式
        if result is None and '=' in args_str and not args_str.startswith('{'):
            result = {}
            pairs = args_str.split(',')
            for pair in pairs:
                if '=' in pair:
                    k, v = pair.split('=', 1)
                    result[k.strip()] = v.strip().strip('"').strip("'")
            if not result:
                result = None

        # 4. 如果是单个字符串，尝试作为主参数
        # 对于某些工具，如果只有一个参数，可以直接使用
        if result is None and not args_str.startswith('{') and not args_str.startswith('['):
            # 移除可能的引号
            clean_str = args_str.strip('"').strip("'")
            # 对于常见的单参数工具，返回合适的格式
            if tool_name and ('search' in tool_name.lower() or 'query' in tool_name.lower()):
                result = {'query': clean_str}
            elif tool_name and 'page' in tool_name.lower():
                result = {'page_id': clean_str}  # 使用 snake_case
            else:
                # 默认作为 input 参数
                result = {'input': clean_str}

        # 5. 最后的尝试：如果看起来像 JSON 数组
        if result is None and args_str.startswith('['):
            try:
                result = {'items': json.loads(args_str)}
            except:
                pass

        # 6. 如果成功解析，将 camelCase 参数转换为 snake_case（基本转换）
        # 注意：调用者可以再次调用 _normalize_tool_args 并传入 input_schema 进行智能映射
        if result and isinstance(result, dict):
            result = self._normalize_tool_args(result)

        return result if result else {}

    def _hub_exec(self, args: dict) -> str:
        """Hub 服务器的 exec 工具：执行代码调用 MCP 工具

        Args:
            args: 包含 code (要执行的代码)

        Returns:
            JSON 字符串，包含执行结果
        """
        import json
        import re

        code = args.get('code', '')

        _log(f"[MCP Hub] exec called with code: {code[:500]}")

        if not code:
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': 'Code is required for exec tool'}]
            })

        try:
            # [Builtin] 处理 web_search 调用 (不在 code 中，而是在参数解析前拦截？不，code 包含调用)
            # 我们需要在解析出 calls 之后检查

            # 解析代码中的工具调用
            # 手动解析以支持嵌套括号和多重调用
            calls = []
            pos = 0
            while True:
                # 查找下一个 await
                match = re.search(r'await\s+(\w+)\s*\(', code[pos:])
                if not match:
                    break

                func_name = match.group(1)
                start_args = pos + match.end()

                # 扫描参数，匹配括号
                balance = 1
                current = start_args
                in_string = False
                string_char = None

                while balance > 0 and current < len(code):
                    char = code[current]

                    if in_string:
                        if char == string_char:
                            # 简单的转义检查
                            if current > 0 and code[current-1] != '\\':
                                in_string = False
                    else:
                        if char in ('"', "'", "`"):
                            in_string = True
                            string_char = char
                        elif char == '(':
                            balance += 1
                        elif char == ')':
                            balance -= 1

                    current += 1

                if balance == 0:
                    # 提取参数字符串（去掉最后的括号）
                    args_str = code[start_args:current-1].strip()
                    calls.append((func_name, args_str))
                    pos = current
                else:
                    # 解析失败或未闭合，跳过当前匹配继续寻找
                    pos = start_args

            if not calls:
                return json.dumps({
                    'isError': True,
                    'content': [{'type': 'text', 'text': 'No valid tool calls found. Use format: await ToolName({ ... })'}]
                })

            results = []
            all_tools = self._get_all_active_tools()

            # [Builtin] 加载 SearXNG URL 用于执行
            searxng_url = self._load_searxng_url()

            # 构建更健壮的工具映射
            tool_map = {}
            for t in all_tools:
                # 映射函数名
                func_name_gen = self._generate_function_name(t.get('serverName', ''), t.get('name', ''))
                tool_map[func_name_gen] = t
                # 映射原始名称
                tool_map[t.get('name', '')] = t
                # 映射全名
                full_name = f"{t.get('serverName', '')}_{t.get('name', '')}"
                tool_map[full_name] = t

            # 辅助函数：执行单个工具调用
            def execute_single_tool(func_name: str, args_str: str, tool_map: dict, searxng_url: str) -> dict:
                """执行单个工具调用，返回结果字典"""
                _log(f"[MCP Hub] Executing tool: {func_name} with args: {args_str}")

                # [Builtin] 检查是否是 web_search
                if func_name in ['web_search', 'builtin_web_search'] and searxng_url:
                    try:
                        tool_args = {}
                        if args_str:
                            if args_str.startswith('{'):
                                try:
                                    tool_args = json.loads(args_str)
                                except:
                                    fixed_json = re.sub(r'(\w+):', r'"\1":', args_str)
                                    try:
                                        tool_args = json.loads(fixed_json)
                                    except:
                                        tool_args = {'query': args_str}

                        searx_result_json = self._exec_searxng_search(searxng_url, tool_args)
                        searx_result = json.loads(searx_result_json)
                        content_text = ""
                        if not searx_result.get('isError'):
                            content_list = searx_result.get('content', [])
                            if content_list:
                                content_text = content_list[0].get('text', '')
                        else:
                            content_text = f"Error: {searx_result.get('content', [{'text':'unknown error'}])[0].get('text')}"
                        return {'tool': func_name, 'result': content_text}
                    except Exception as e:
                        return {'tool': func_name, 'error': f'Web search execution failed: {str(e)}'}

                # 查找对应的工具
                tool = tool_map.get(func_name)
                if not tool and '_' in func_name:
                    simple_name = func_name.split('_', 1)[1]
                    tool = tool_map.get(simple_name)

                if not tool:
                    return {'tool': func_name, 'error': f'Tool not found: {func_name}. Use search tool to discover available tools.'}

                # 解析参数
                try:
                    tool_args = self._parse_tool_args(args_str, func_name)
                except Exception as e:
                    return {'tool': func_name, 'error': f'Failed to parse arguments: {str(e)}. Raw args: {args_str[:100]}...'}

                # 规范化参数
                input_schema = tool.get('inputSchema', {})
                if tool_args:
                    tool_args = self._normalize_tool_args(tool_args, input_schema)

                # 调用工具
                try:
                    server_key = tool.get('serverId', '')
                    server_config = self._get_server_config_by_id(server_key)

                    if not server_config:
                        return {'tool': func_name, 'error': f'Server config not found for: {server_key}'}

                    call_payload = json.dumps({
                        'server': server_config,
                        'name': tool.get('name', ''),
                        'args': tool_args,
                        'callId': f"hub_exec_{func_name}"
                    })

                    result_str = self.mcpCallTool(call_payload)
                    result_obj = json.loads(result_str)

                    if result_obj.get('isError'):
                        error_text = 'Unknown error'
                        content = result_obj.get('content', [])
                        if content and len(content) > 0:
                            error_text = content[0].get('text', error_text)
                        return {'tool': func_name, 'error': error_text}
                    else:
                        content = result_obj.get('content', [])
                        text_content = ''
                        for item in content:
                            if item.get('type') == 'text':
                                text_content += item.get('text', '')
                        return {'tool': func_name, 'result': text_content or json.dumps(content)}

                except Exception as e:
                    import traceback
                    _log(f"[MCP Hub] Error calling tool {func_name}: {e}\n{traceback.format_exc()}")
                    return {'tool': func_name, 'error': str(e)}

            # 辅助函数：解析 parallel/settle 参数中的嵌套调用
            def parse_nested_calls(args_str: str) -> list:
                """解析 parallel([...]) 或 settle([...]) 参数中的嵌套工具调用"""
                nested_calls = []
                # 去掉外层的 [ ]
                args_str = args_str.strip()
                if args_str.startswith('['):
                    args_str = args_str[1:]
                if args_str.endswith(']'):
                    args_str = args_str[:-1]

                # 解析嵌套的 await 调用
                pos = 0
                while True:
                    match = re.search(r'await\s+(\w+)\s*\(', args_str[pos:])
                    if not match:
                        break

                    inner_func_name = match.group(1)
                    inner_start_args = pos + match.end()

                    # 扫描参数，匹配括号
                    balance = 1
                    current = inner_start_args
                    in_string = False
                    string_char = None

                    while balance > 0 and current < len(args_str):
                        char = args_str[current]
                        if in_string:
                            if char == string_char and (current == 0 or args_str[current-1] != '\\'):
                                in_string = False
                        else:
                            if char in ('"', "'", "`"):
                                in_string = True
                                string_char = char
                            elif char == '(':
                                balance += 1
                            elif char == ')':
                                balance -= 1
                        current += 1

                    if balance == 0:
                        inner_args_str = args_str[inner_start_args:current-1].strip()
                        nested_calls.append((inner_func_name, inner_args_str))
                        pos = current
                    else:
                        pos = inner_start_args

                return nested_calls

            for func_name, args_str in calls:
                # ================ 处理 parallel 和 settle ================
                if func_name in ('parallel', 'settle'):
                    _log(f"[MCP Hub] Processing {func_name} with args: {args_str[:200]}...")

                    # 解析嵌套的工具调用
                    nested_calls = parse_nested_calls(args_str)

                    if not nested_calls:
                        results.append({
                            'tool': func_name,
                            'error': f'No nested tool calls found in {func_name}(). Expected format: {func_name}([await tool1(...), await tool2(...)])'
                        })
                        continue

                    _log(f"[MCP Hub] {func_name}: Found {len(nested_calls)} nested calls: {[c[0] for c in nested_calls]}")

                    # 使用线程池并行执行
                    from concurrent.futures import ThreadPoolExecutor, as_completed
                    parallel_results = []
                    has_error = False

                    with ThreadPoolExecutor(max_workers=min(len(nested_calls), 5)) as executor:
                        # 提交所有任务
                        future_to_call = {
                            executor.submit(execute_single_tool, nc_func, nc_args, tool_map, searxng_url): (nc_func, nc_args)
                            for nc_func, nc_args in nested_calls
                        }

                        # 收集结果
                        for future in as_completed(future_to_call):
                            nc_func, nc_args = future_to_call[future]
                            try:
                                result = future.result()
                                parallel_results.append(result)
                                if 'error' in result:
                                    has_error = True
                            except Exception as e:
                                parallel_results.append({'tool': nc_func, 'error': str(e)})
                                has_error = True

                    # 根据 parallel 或 settle 的语义返回结果
                    if func_name == 'parallel':
                        # parallel: 如果任何一个失败，整体报告错误（但仍返回所有结果）
                        if has_error:
                            results.append({
                                'tool': 'parallel',
                                'error': 'One or more parallel calls failed',
                                'results': parallel_results
                            })
                        else:
                            results.append({
                                'tool': 'parallel',
                                'result': json.dumps(parallel_results, ensure_ascii=False)
                            })
                    else:  # settle
                        # settle: 返回所有结果，无论成功或失败（类似 Promise.allSettled）
                        settled_results = []
                        for pr in parallel_results:
                            if 'error' in pr:
                                settled_results.append({
                                    'status': 'rejected',
                                    'tool': pr['tool'],
                                    'reason': pr['error']
                                })
                            else:
                                settled_results.append({
                                    'status': 'fulfilled',
                                    'tool': pr['tool'],
                                    'value': pr.get('result', '')
                                })
                        results.append({
                            'tool': 'settle',
                            'result': json.dumps(settled_results, ensure_ascii=False)
                        })

                    continue
                # ================ END parallel/settle ================

                _log(f"[MCP Hub] Executing tool: {func_name} with args: {args_str}")

                # [Builtin] 检查是否是 web_search
                if func_name in ['web_search', 'builtin_web_search'] and searxng_url:
                    # 解析参数
                    try:
                        tool_args = {}
                        if args_str:
                            # 尝试解析 JSON 参数
                            # 处理简单的 key: value 转换，如果是 JSON 字符串
                            # 这里为了简单，假设 args_str 是合法的 JSON 对象字符串
                            # 如果不是，可能需要更复杂的解析，或者让 LLM 严格输出 JSON
                             if args_str.startswith('{'):
                                 import json5 # 如果有
                                 try:
                                     tool_args = json.loads(args_str)
                                 except:
                                     # 简单的 fallback parser for JS object-like string
                                     # { query: "foo" } -> {"query": "foo"}
                                     # 这比较复杂，暂且假设 LLM 输出标准 JSON
                                     # 或者使用 eval (不安全但有效?) -> 不，安全第一
                                     # 尝试修复 key 的引号
                                     fixed_json = re.sub(r'(\w+):', r'"\1":', args_str)
                                     try:
                                         tool_args = json.loads(fixed_json)
                                     except:
                                         _log(f"[MCP Hub] Failed to parse args for web_search: {args_str}")
                                         tool_args = {'query': args_str} # Fallback: treat as query string?

                        searx_result_json = self._exec_searxng_search(searxng_url, tool_args)
                        searx_result = json.loads(searx_result_json)
                        # 提取 content
                        content_text = ""
                        if not searx_result.get('isError'):
                            content_list = searx_result.get('content', [])
                            if content_list:
                                content_text = content_list[0].get('text', '')
                        else:
                             content_text = f"Error: {searx_result.get('content', [{'text':'unknown error'}])[0].get('text')}"

                        results.append({
                            'tool': func_name,
                            'result': content_text
                        })
                        continue
                    except Exception as e:
                        results.append({
                            'tool': func_name,
                            'error': f'Web search execution failed: {str(e)}'
                        })
                        continue

                # 查找对应的工具
                tool = tool_map.get(func_name)
                # 尝试模糊匹配
                if not tool:
                    # 尝试去掉 server 前缀
                    if '_' in func_name:
                        simple_name = func_name.split('_', 1)[1]
                        tool = tool_map.get(simple_name)

                if not tool:
                    results.append({
                        'tool': func_name,
                        'error': f'Tool not found: {func_name}. Use search tool to discover available tools.'
                    })
                    continue

                # 解析参数
                try:
                    tool_args = self._parse_tool_args(args_str, func_name)
                except Exception as e:
                    _log(f"[MCP Hub] Failed to parse args for {func_name}: {args_str[:200]}... Error: {e}")
                    results.append({
                        'tool': func_name,
                        'error': f'Failed to parse arguments: {str(e)}. Raw args: {args_str[:100]}...'
                    })
                    continue

                # 获取工具的 input_schema，用于智能参数映射
                input_schema = tool.get('inputSchema', {})

                # 规范化参数（camelCase -> snake_case + 别名映射）
                if tool_args:
                    tool_args = self._normalize_tool_args(tool_args, input_schema)

                _log(f"[MCP Hub] Executing {func_name} with normalized args: {tool_args}")

                # 调用工具
                try:
                    # 获取服务器配置
                    server_key = tool.get('serverId', '')
                    server_config = self._get_server_config_by_id(server_key)

                    if not server_config:
                        results.append({
                            'tool': func_name,
                            'error': f'Server config not found for: {server_key}'
                        })
                        continue

                    # 构造调用 payload
                    call_payload = json.dumps({
                        'server': server_config,
                        'name': tool.get('name', ''),
                        'args': tool_args,
                        'callId': f"hub_exec_{func_name}"
                    })

                    result_str = self.mcpCallTool(call_payload)
                    result_obj = json.loads(result_str)

                    if result_obj.get('isError'):
                        error_text = 'Unknown error'
                        content = result_obj.get('content', [])
                        if content and len(content) > 0:
                            error_text = content[0].get('text', error_text)
                        results.append({
                            'tool': func_name,
                            'error': error_text
                        })
                    else:
                        content = result_obj.get('content', [])
                        text_content = ''
                        for item in content:
                            if item.get('type') == 'text':
                                text_content += item.get('text', '')
                        results.append({
                            'tool': func_name,
                            'result': text_content or json.dumps(content)
                        })

                except Exception as e:
                    import traceback
                    _log(f"[MCP Hub] Error calling tool {func_name}: {e}\n{traceback.format_exc()}")
                    results.append({
                        'tool': func_name,
                        'error': f'Error calling tool: {str(e)}'
                    })

            # 返回结果
            output = {
                'result': results if len(results) > 1 else (results[0] if results else None),
                'logs': []
            }

            return json.dumps({
                'isError': False,
                'content': [{'type': 'text', 'text': json.dumps(output, indent=2)}]
            })

        except Exception as e:
            import traceback
            _log(f"[MCP Hub] exec error: {e}\n{traceback.format_exc()}")
            return json.dumps({
                'isError': True,
                'content': [{'type': 'text', 'text': f'Error executing code: {str(e)}'}]
            })

    def _get_all_active_tools(self) -> list:
        """获取所有激活的 MCP 服务器的工具列表"""
        import json

        all_tools = []

        # 初始化服务器配置缓存
        if not hasattr(self, '_server_configs'):
            self._server_configs = {}
        if not hasattr(self, '_tool_to_server_key'):
            self._tool_to_server_key = {}

        # 从已连接的 stdio 客户端获取工具
        global _mcp_stdio_clients
        if _mcp_stdio_clients:
            for server_key, client in list(_mcp_stdio_clients.items()):
                try:
                    if client and client.process and client.process.poll() is None:
                        tools = client.list_tools()
                        if tools:
                            # 从客户端获取服务器信息
                            server_name = getattr(client, 'command', 'unknown')
                            # 尝试从命令中提取更友好的名称
                            if hasattr(client, 'args') and client.args:
                                for arg in client.args:
                                    if '@' in arg or 'mcp' in arg.lower():
                                        server_name = arg
                                        break

                            # 缓存服务器配置
                            self._server_configs[server_key] = {
                                'id': server_key,
                                'name': server_name,
                                'command': getattr(client, 'command', ''),
                                'args': getattr(client, 'args', []),
                                'env': getattr(client, 'env', {}),
                                'cwd': getattr(client, 'cwd', None),
                                'type': 'stdio'
                            }

                            for tool in tools:
                                tool_name = tool.get('name', '') if isinstance(tool, dict) else getattr(tool, 'name', str(tool))
                                tool_desc = tool.get('description', '') if isinstance(tool, dict) else getattr(tool, 'description', '')
                                input_schema = tool.get('inputSchema', {}) if isinstance(tool, dict) else getattr(tool, 'inputSchema', {})

                                func_name = self._generate_function_name(server_name, tool_name)

                                all_tools.append({
                                    'name': tool_name,
                                    'description': tool_desc or f"Tool from {server_name}",
                                    'inputSchema': input_schema,
                                    'serverId': server_key,
                                    'serverName': server_name,
                                    'type': 'mcp',
                                    'functionName': func_name
                                })

                                # 缓存函数名到服务器 key 的映射
                                self._tool_to_server_key[func_name] = {
                                    'serverKey': server_key,
                                    'toolName': tool_name
                                }

                            _log(f"[MCP Hub] Got {len(tools)} tools from server: {server_name}")
                except Exception as e:
                    _log(f"[MCP Hub] Error getting tools from {server_key}: {e}")
                    continue

        _log(f"[MCP Hub] Total tools found: {len(all_tools)}")
        return all_tools

    def _generate_function_name(self, server_name: str, tool_name: str) -> str:
        """生成工具的函数名（与前端保持一致）"""
        import re

        def to_camel_case(s: str) -> str:
            s = s.strip().lower()
            # 将非字母数字字符后的字符转为大写
            result = re.sub(r'[^a-z0-9]+(.)', lambda m: m.group(1).upper(), s)
            # 移除剩余的非字母数字字符
            result = re.sub(r'[^a-zA-Z0-9]', '', result)
            return result

        server_part = to_camel_case(server_name) if server_name else ''
        tool_part = to_camel_case(tool_name)

        if server_part:
            return f"{server_part}_{tool_part}"
        return tool_part

    def _get_server_config_by_id(self, server_id: str) -> dict:
        """根据服务器 ID（key）获取服务器配置"""
        # 首先尝试从缓存获取
        if hasattr(self, '_server_configs') and server_id in self._server_configs:
            return self._server_configs[server_id]

        # 如果缓存中没有，尝试刷新缓存
        self._get_all_active_tools()

        # 再次尝试从缓存获取
        if hasattr(self, '_server_configs') and server_id in self._server_configs:
            return self._server_configs[server_id]

        _log(f"[MCP Hub] Server config not found for id: {server_id}")
        return {}

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
                    # 在后台线程执行工具调用以避免阻塞 UI
                    def do_call_tool():
                        client = _get_or_create_mcp_stdio_client(server_config)
                        return client.call_tool(tool_name, tool_args)

                    executor = self._get_http_executor()
                    future = executor.submit(do_call_tool)

                    # 安全地等待结果
                    result = self._wait_for_future_safely(future, timeout_ms=70000)

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
            # 检查是否是 Hub 服务器 (inMemory 类型)
            server_type = server_config.get('type', '')
            server_name = server_config.get('name', '')
            if server_type == 'inMemory' and server_name == '@cherry/hub':
                _log(f"[MCP] Hub server detected, handling tool: {tool_name}")
                return self._handle_hub_tool(tool_name, tool_args)

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

            # 运行异步函数 - 使用线程池执行，安全地等待结果
            executor = self._get_http_executor()
            future = executor.submit(asyncio.run, call_tool())

            # 安全地等待结果
            result = self._wait_for_future_safely(future, timeout_ms=70000)

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
        优先检查 CHERRY_STUDIO_BIN_DIR 环境变量，否则检查用户目录 .cherrystudio/bin，如果不存在则从 J 盘复制
        """
        try:
            import shutil
            from pathlib import Path
            import os

            # 定义路径
            local_bin_dir = Path(os.path.expanduser('~')) / '.cherrystudio' / 'bin'
            j_bin_dir = Path('J:/vfxtools/piplineTD/models/packages/bin')

            # 检查本地是否存在，如果不存在则尝试从 J 盘复制
            # 只在本地目录完全不存在时才复制，避免每次启动都复制导致卡顿
            # 如果需要强制更新，用户可以删除 .cherrystudio/bin 目录
            if not local_bin_dir.exists() and j_bin_dir.exists():
                try:
                    _log(f"[mcpGetInstallInfo] Local bin dir not found. Copying from {j_bin_dir} to {local_bin_dir}...")
                    # 创建父目录
                    local_bin_dir.parent.mkdir(parents=True, exist_ok=True)
                    # 复制目录
                    # Python 3.8+ 支持 dirs_exist_ok，但在旧版本可能不支持。
                    # 为了兼容性，如果目录不存在直接 copytree 即可。
                    shutil.copytree(j_bin_dir, local_bin_dir)
                    _log(f"[mcpGetInstallInfo] Copy complete.")
                except Exception as e:
                    _log(f"[mcpGetInstallInfo] Copy failed: {e}")

            # 获取 Cherry Studio bin 目录
            # 优先使用环境变量
            env_bin_dir = os.environ.get('CHERRY_STUDIO_BIN_DIR')
            if env_bin_dir:
                bin_dir = Path(env_bin_dir)
            else:
                # 优先使用本地目录
                if local_bin_dir.exists():
                    bin_dir = local_bin_dir
                else:
                    # 如果本地复制失败，回退到 J 盘
                    bin_dir = j_bin_dir

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
        下载并解压到用户目录 .cherrystudio/bin
        """
        try:
            home_dir = Path.home()
            bin_dir = home_dir / '.cherrystudio' / 'bin'
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
        下载并解压到用户目录 .cherrystudio/bin
        """
        try:
            home_dir = Path.home()
            bin_dir = home_dir / '.cherrystudio' / 'bin'
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

    # ========== Knowledge Base API ==========

    @Slot(str, result=str)
    def knowledgeBaseCreate(self, payload_json: str) -> str:
        try:
            params = json.loads(payload_json)
            kb = self._get_kb_service().create(params)
            return json.dumps(kb)
        except Exception as e:
            _log(f"knowledgeBaseCreate error: {e}")
            return json.dumps({"error": str(e)})

    @Slot(str, result=str)
    def knowledgeBaseAdd(self, payload_json: str) -> str:
        try:
            _log(f"[KB] knowledgeBaseAdd called with payload length: {len(payload_json) if payload_json else 0}")
            payload = json.loads(payload_json)
            _log(f"[KB] Processing item type: {payload.get('item', {}).get('type', 'unknown')}")
            result = self._get_kb_service().add_item(payload)
            _log(f"[KB] add_item result: {result}")
            return json.dumps(result)
        except Exception as e:
            _log(f"knowledgeBaseAdd error: {e}")
            import traceback
            _log(f"knowledgeBaseAdd traceback: {traceback.format_exc()}")
            return json.dumps({"status": "failed", "message": str(e)})

    @Slot(str, result=str)
    def knowledgeBaseSearch(self, payload_json: str) -> str:
        try:
            params = json.loads(payload_json)
            results = self._get_kb_service().search(params)
            return json.dumps(results)
        except Exception as e:
            _log(f"knowledgeBaseSearch error: {e}")
            return "[]"

    @Slot(result=str)
    def knowledgeBaseList(self) -> str:
        try:
            results = self._get_kb_service().list_bases()
            return json.dumps(results)
        except Exception as e:
             _log(f"knowledgeBaseList error: {e}")
             return "[]"

    @Slot(str, result=bool)
    def knowledgeBaseDelete(self, kb_id: str) -> bool:
        try:
            return self._get_kb_service().delete(kb_id)
        except Exception as e:
            _log(f"knowledgeBaseDelete error: {e}")
            return False

    @Slot(str, result=str)
    def knowledgeBaseRemove(self, payload_json: str) -> str:
        """从知识库中移除向量"""
        try:
            payload = json.loads(payload_json)
            result = self._get_kb_service().remove_item(payload)
            return json.dumps(result)
        except Exception as e:
            _log(f"knowledgeBaseRemove error: {e}")
            return json.dumps({"success": False, "message": str(e)})

    @Slot(str, result=str)
    def knowledgeBaseRerank(self, payload_json: str) -> str:
        """重排序搜索结果（简单实现，返回原结果）"""
        try:
            payload = json.loads(payload_json)
            # 简单实现：直接返回搜索结果，不做额外重排序
            results = self._get_kb_service().search(payload)
            return json.dumps(results)
        except Exception as e:
            _log(f"knowledgeBaseRerank error: {e}")
            return "[]"

    @Slot(str, result=str)
    def knowledgeBaseReset(self, payload_json: str) -> str:
        """重置知识库（清空所有向量）"""
        try:
            payload = json.loads(payload_json)
            result = self._get_kb_service().reset(payload)
            return json.dumps(result)
        except Exception as e:
            _log(f"knowledgeBaseReset error: {e}")
            return json.dumps({"success": False, "message": str(e)})

    @Slot(str, result=str)
    def knowledgeBaseCheckQuota(self, payload_json: str) -> str:
        """检查知识库配额（本地实现，始终返回允许）"""
        try:
            # 本地实现不需要配额检查，始终返回允许
            return json.dumps({"withinQuota": True})
        except Exception as e:
            _log(f"knowledgeBaseCheckQuota error: {e}")
            return json.dumps({"withinQuota": True})

