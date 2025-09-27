"""应用API模块"""

import webbrowser
from PySide6.QtCore import QObject, Slot
from PySide6.QtGui import QDesktopServices
from PySide6.QtCore import QUrl

from api.base import BaseAPI


class AppAPI(BaseAPI):
    """应用相关API类"""
    
    @Slot(str, result=str)
    def openWebsite(self, url: str) -> str:
        """打开网站"""
        self.log(f"🌐 openWebsite: {url}")
        try:
            # 尝试使用Qt的方式
            success = QDesktopServices.openUrl(QUrl(url))
            if success:
                self.log(f"✅ openWebsite success via Qt")
                return "success"
            else:
                # 回退到webbrowser
                webbrowser.open(url)
                self.log(f"✅ openWebsite success via webbrowser")
                return "success"
        except Exception as e:
            self.log(f"❌ openWebsite error: {e}")
            return "error"
    
    @Slot(result=str)
    def getVersion(self) -> str:
        """获取应用版本"""
        return "1.0.0"
    
    @Slot(result=str)
    def getPlatform(self) -> str:
        """获取平台信息"""
        import platform
        return platform.system().lower()
