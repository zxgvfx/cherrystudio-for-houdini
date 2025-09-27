"""选择API模块 - 处理Houdini选择操作"""

import json
from PySide6.QtCore import QObject, Slot

from api.base import BaseAPI


class SelectionAPI(BaseAPI):
    """Houdini选择操作API类"""
    
    @Slot(str, result=str)
    def getSelection(self, type_filter: str) -> str:
        """获取选择的对象"""
        self.log(f"🎯 getSelection: {type_filter}")
        try:
            import hou
            # 根据类型过滤获取选择
            if type_filter == "nodes":
                nodes = hou.selectedNodes()
                result = [node.path() for node in nodes]
            elif type_filter == "objects":
                objects = hou.selectedNodes()
                result = [obj.path() for obj in objects]
            else:
                result = []
            
            self.log(f"✅ getSelection: {len(result)} items")
            return json.dumps(result)
        except Exception as e:
            self.log(f"❌ getSelection error: {e}")
            return json.dumps([])
    
    @Slot(str, str, result=str)
    def setSelection(self, type_filter: str, paths_json: str) -> str:
        """设置选择的对象"""
        self.log(f"🎯 setSelection: {type_filter}")
        try:
            import hou
            paths = json.loads(paths_json)
            if not isinstance(paths, list):
                return "error"
            
            # 根据路径设置选择
            nodes = []
            for path in paths:
                try:
                    node = hou.node(path)
                    if node:
                        nodes.append(node)
                except:
                    continue
            
            # 清除当前选择并设置新选择
            hou.clearAllSelected()
            for node in nodes:
                node.setSelected(True)
            
            self.log(f"✅ setSelection: {len(nodes)} items")
            return "success"
        except Exception as e:
            self.log(f"❌ setSelection error: {e}")
            return "error"
