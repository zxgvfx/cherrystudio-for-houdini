"""文件API模块"""

import os
from PySide6.QtCore import QObject, Slot

from api.base import BaseAPI


class FileAPI(BaseAPI):
    """文件操作API类"""
    
    @Slot(str, result=str)
    def readFile(self, filePath: str) -> str:
        """读取文件内容"""
        self.log(f"📁 readFile: {filePath}")
        try:
            with open(filePath, 'r', encoding='utf-8') as f:
                content = f.read()
                self.log(f"✅ readFile success: {len(content)} chars")
                return content
        except Exception as e:
            self.log(f"❌ readFile error: {e}")
            return ""
    
    @Slot(str, str, result=str)
    def writeFile(self, filePath: str, content: str) -> str:
        """写入文件内容"""
        self.log(f"📁 writeFile: {filePath}")
        try:
            os.makedirs(os.path.dirname(filePath), exist_ok=True)
            with open(filePath, 'w', encoding='utf-8') as f:
                f.write(content)
                self.log(f"✅ writeFile success: {len(content)} chars")
                return "success"
        except Exception as e:
            self.log(f"❌ writeFile error: {e}")
            return "error"
    
    @Slot(str, result=str)
    def exists(self, filePath: str) -> str:
        """检查文件是否存在"""
        exists = os.path.exists(filePath)
        self.log(f"📁 exists: {filePath} -> {exists}")
        return "true" if exists else "false"
    
    @Slot(str, result=str)
    def mkdir(self, dirPath: str) -> str:
        """创建目录"""
        self.log(f"📁 mkdir: {dirPath}")
        try:
            os.makedirs(dirPath, exist_ok=True)
            self.log(f"✅ mkdir success")
            return "success"
        except Exception as e:
            self.log(f"❌ mkdir error: {e}")
            return "error"
