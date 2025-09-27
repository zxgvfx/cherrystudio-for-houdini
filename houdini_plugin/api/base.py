"""基础API类"""

from PySide6.QtCore import QObject


class BaseAPI(QObject):
    """所有API类的基础类"""
    
    def __init__(self, parent=None):
        super().__init__(parent)
    
    def log(self, message: str):
        """统一的日志方法"""
        print(f"[{self.__class__.__name__}] {message}")
