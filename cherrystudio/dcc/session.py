"""
DCC Session Manager

为每个 DCC 实例生成唯一的会话标识，并将以下信息注册到后端服务：
- session_id:  本次 DCC 实例的唯一 ID（UUID）
- mcp_port:    本地 MCP Server 端口（用于后端调用 DCC 工具）
- dcc_type:    DCC 类型（houdini / maya / blender ...）
- dcc_version: DCC 版本号

Session 信息会通过 URL query 参数传递给前端，前端用它作为身份标识。
"""

import uuid
import threading
import urllib.request
import json
import os
from typing import Optional

from ..utils.logger import network_logger

_log = network_logger


def _detect_dcc_version(dcc_type: str) -> str:
    if dcc_type == "houdini":
        try:
            import hou  # type: ignore
            return hou.applicationVersionString()
        except Exception:
            return "unknown"
    if dcc_type == "maya":
        try:
            import maya.cmds as cmds  # type: ignore
            return cmds.about(version=True)
        except Exception:
            return "unknown"
    if dcc_type == "blender":
        try:
            import bpy  # type: ignore
            return bpy.app.version_string
        except Exception:
            return "unknown"
    return "unknown"


class DCCSession:
    """单例，管理当前 DCC 实例的会话信息"""

    _instance: Optional["DCCSession"] = None
    _lock = threading.Lock()

    def __init__(self):
        self.session_id: str = str(uuid.uuid4())
        self.dcc_type: str = self._detect_dcc_type()
        self.dcc_version: str = _detect_dcc_version(self.dcc_type)
        self.mcp_port: int = 0
        self.backend_url: str = ""
        self._registered: bool = False

    @classmethod
    def instance(cls) -> "DCCSession":
        with cls._lock:
            if cls._instance is None:
                cls._instance = cls()
        return cls._instance

    @staticmethod
    def _detect_dcc_type() -> str:
        from ..core.app_lifecycle import detect_dcc_type
        return detect_dcc_type()

    def set_mcp_port(self, port: int):
        self.mcp_port = port

    def set_backend_url(self, url: str):
        self.backend_url = url

    @classmethod
    def discover_backend_url(cls) -> str:
        """
        自动发现后端服务地址。优先级：
          1. 环境变量 CHERRY_BACKEND_URL
          2. ~/.cherrystudio/backend.port 文件（独立进程模式写入）
          3. 默认地址 http://127.0.0.1:9876（约定端口）
        """
        # 1. 环境变量
        env_url = os.environ.get("CHERRY_BACKEND_URL", "")
        if env_url:
            return env_url

        # 2. 端口发现文件
        try:
            from ..backend.service_runner import read_backend_url
            url = read_backend_url()
            if url:
                return url
        except Exception:
            pass

        # 3. 尝试约定默认端口
        try:
            import urllib.request
            default = "http://127.0.0.1:9876"
            urllib.request.urlopen(f"{default}/api/v1/config/merged", timeout=1)
            return default
        except Exception:
            pass

        return ""

    def register_to_backend(self) -> bool:
        """
        将本 DCC 会话信息注册到后端服务。
        在 MCP Server 启动且后端服务可用后调用。
        """
        if not self.backend_url:
            _log("[DCCSession] Backend URL not set, skipping registration")
            return False

        payload = {
            "sessionId": self.session_id,
            "mcpPort": self.mcp_port,
            "dccType": self.dcc_type,
            "dccVersion": self.dcc_version,
        }
        try:
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(
                f"{self.backend_url}/api/v1/sessions/register",
                data=data,
                method="POST",
            )
            req.add_header("Content-Type", "application/json")
            with urllib.request.urlopen(req, timeout=5) as resp:
                resp.read()
                self._registered = True
                _log(f"[DCCSession] Registered: session={self.session_id}, mcp_port={self.mcp_port}")
                return True
        except Exception as e:
            _log(f"[DCCSession] Registration failed: {e}")
            return False

    def unregister_from_backend(self):
        """DCC 关闭时注销会话"""
        if not self.backend_url or not self._registered:
            return
        try:
            payload = json.dumps({"sessionId": self.session_id}).encode("utf-8")
            req = urllib.request.Request(
                f"{self.backend_url}/api/v1/sessions/unregister",
                data=payload,
                method="POST",
            )
            req.add_header("Content-Type", "application/json")
            urllib.request.urlopen(req, timeout=3)
        except Exception:
            pass

    def get_url_params(self) -> str:
        """
        生成前端 URL 的查询参数字符串。
        前端通过这些参数识别当前 DCC 会话。
        
        例如: ?sessionId=abc123&backendUrl=http://127.0.0.1:9876&dccType=houdini
        """
        from urllib.parse import urlencode
        params = {
            "sessionId": self.session_id,
            "backendUrl": self.backend_url,
            "dccType": self.dcc_type,
            "dccVersion": self.dcc_version,
        }
        if self.mcp_port:
            params["mcpPort"] = str(self.mcp_port)
        return urlencode(params)
