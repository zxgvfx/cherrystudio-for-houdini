"""
Cherry Studio DCC Integration Layer

极简的 DCC 侧接入层，仅负责：
1. 生成唯一 session ID，注册到后端服务
2. 启动 MCP Server 暴露 DCC 特有操作
3. 将 session 信息注入到前端（通过 URL 参数）
"""

from .session import DCCSession
from .houdini_mcp import HoudiniMCPServer
from .maya_mcp import MayaMCPServer

__all__ = ["DCCSession", "HoudiniMCPServer", "MayaMCPServer"]
