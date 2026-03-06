"""
Cherry Studio Backend Service

独立的后端服务层，负责处理所有与DCC/Qt无关的重逻辑。
通过 HTTP/WebSocket 与前端通信，DCC侧只需维护一个极简的Qt桥接层。
"""

from .service_runner import BackendService

__all__ = ["BackendService"]
