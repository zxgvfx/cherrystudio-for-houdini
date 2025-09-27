"""存储同步API模块"""

import json
from PySide6.QtCore import QObject, Slot

from api.base import BaseAPI


class StoreSyncAPI(BaseAPI):
    """存储同步API类"""
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self._store_data = {}
    
    @Slot(str, result=str)
    def get(self, key: str) -> str:
        """获取存储值"""
        self.log(f"💾 StoreSync get: {key}")
        value = self._store_data.get(key, "")
        return value
    
    @Slot(str, str)
    def set(self, key: str, value: str):
        """设置存储值"""
        self.log(f"💾 StoreSync set: {key}")
        self._store_data[key] = value
    
    @Slot(str, result=str)
    def remove(self, key: str) -> str:
        """删除存储值"""
        self.log(f"💾 StoreSync remove: {key}")
        if key in self._store_data:
            del self._store_data[key]
            return "success"
        return "not_found"
    
    @Slot(result=str)
    def getAll(self) -> str:
        """获取所有存储数据"""
        self.log(f"💾 StoreSync getAll: {len(self._store_data)} keys")
        return json.dumps(self._store_data)
    
    @Slot(str)
    def setAll(self, data_json: str):
        """设置所有存储数据"""
        self.log(f"💾 StoreSync setAll")
        try:
            data = json.loads(data_json)
            if isinstance(data, dict):
                self._store_data = data.copy()
                self.log(f"✅ StoreSync setAll: {len(data)} keys")
        except Exception as e:
            self.log(f"❌ StoreSync setAll error: {e}")
