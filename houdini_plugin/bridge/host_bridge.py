"""主机桥接模块 - 处理Houdini特定的交互"""

import json
from PySide6.QtCore import QObject, Signal, Slot
from PySide6.QtWidgets import QWidget, QVBoxLayout

from api.base import BaseAPI


class HostBridge(BaseAPI):
    """主机桥接类 - 处理Houdini特定的交互"""
    
    # 信号定义
    dropped = Signal(str)  # 文件拖放信号
    log = Signal(str)      # 日志信号
    
    def __init__(self, parent=None):
        super().__init__(parent)
    
    @Slot(str, result=str)
    def echo(self, message: str) -> str:
        """回显消息"""
        self.log.emit(f"Echo: {message}")
        return f"Echo: {message}"
    
    @Slot(result=str)
    def houdiniSelection(self) -> str:
        """获取Houdini选择"""
        try:
            import hou
            selected = hou.selectedNodes()
            paths = [node.path() for node in selected]
            self.log.emit(f"Selected {len(paths)} nodes")
            return json.dumps(paths)
        except Exception as e:
            self.log.emit(f"Error getting selection: {e}")
            return json.dumps([])
    
    @Slot(str, result=str)
    def parmValue(self, parm_path: str) -> str:
        """获取参数值"""
        try:
            import hou
            parm = hou.parm(parm_path)
            if parm:
                value = parm.eval()
                self.log.emit(f"Parm {parm_path} = {value}")
                return str(value)
            else:
                self.log.emit(f"Parm not found: {parm_path}")
                return ""
        except Exception as e:
            self.log.emit(f"Error getting parm value: {e}")
            return ""
    
    @Slot(str, str, result=str)
    def setParm(self, parm_path: str, value: str) -> str:
        """设置参数值"""
        try:
            import hou
            parm = hou.parm(parm_path)
            if parm:
                # 尝试转换值类型
                try:
                    if value.lower() in ('true', 'false'):
                        parm.set(bool(value.lower() == 'true'))
                    elif value.isdigit():
                        parm.set(int(value))
                    elif '.' in value and value.replace('.', '').isdigit():
                        parm.set(float(value))
                    else:
                        parm.set(value)
                    self.log.emit(f"Set parm {parm_path} = {value}")
                    return "success"
                except Exception as e:
                    self.log.emit(f"Error setting parm value: {e}")
                    return "error"
            else:
                self.log.emit(f"Parm not found: {parm_path}")
                return "not_found"
        except Exception as e:
            self.log.emit(f"Error setting parm: {e}")
            return "error"


class WebContainer(QWidget):
    """Web容器类 - 支持拖放功能"""
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setAcceptDrops(True)
        self._web_view = None
    
    def setWebView(self, web_view):
        """设置Web视图"""
        self._web_view = web_view
        layout = QVBoxLayout()
        layout.setContentsMargins(0, 0, 0, 0)
        layout.addWidget(web_view)
        self.setLayout(layout)
    
    def dragEnterEvent(self, event):
        """拖拽进入事件"""
        if event.mimeData().hasUrls():
            event.acceptProposedAction()
    
    def dropEvent(self, event):
        """拖放事件"""
        if event.mimeData().hasUrls():
            urls = event.mimeData().urls()
            for url in urls:
                file_path = url.toLocalFile()
                if file_path:
                    # 发送文件路径到Web页面
                    if self._web_view:
                        script = f"""
                        if (window.onFileDropped) {{
                            window.onFileDropped('{file_path}');
                        }}
                        """
                        self._web_view.page().runJavaScript(script)
            event.acceptProposedAction()
