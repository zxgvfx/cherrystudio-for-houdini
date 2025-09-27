"""Electron API模拟模块"""

from PySide6.QtCore import QObject, Slot

from api.base import BaseAPI


class ElectronAPI(BaseAPI):
    """模拟Electron API"""
    
    @Slot(str, result=str)
    def ipcRenderer_invoke(self, channel: str, *args) -> str:
        """模拟Electron的ipcRenderer.invoke"""
        return self._handle_ipc_request(channel, list(args))
    
    @Slot(str, result=str)
    def ipcRenderer_send(self, channel: str, *args) -> str:
        """模拟Electron的ipcRenderer.send"""
        return self._handle_ipc_request(channel, list(args))
    
    def _handle_ipc_request(self, channel: str, args: list) -> str:
        """处理IPC请求"""
        self.log(f"🔌 Electron IPC: {channel} with {len(args)} args")
        
        # 根据channel路由到不同的处理方法
        if channel == "get-app-version":
            return "1.0.0"
        elif channel == "get-platform":
            import platform
            return platform.system().lower()
        elif channel == "show-message-box":
            return "{}"
        else:
            self.log(f"⚠️ Unknown IPC channel: {channel}")
            return "{}"
