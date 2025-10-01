#!/usr/bin/env python3
"""
Cherry Studio for Houdini 启动脚本
"""

import sys
import os

# 添加houdini_plugin目录到Python路径
plugin_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'houdini_plugin')
if plugin_dir not in sys.path:
    sys.path.insert(0, plugin_dir)

# 现在可以正常导入模块
from main import main

if __name__ == "__main__":
    # 获取命令行参数
    url = sys.argv[1] if len(sys.argv) > 1 else None
    sys.exit(main(url))
