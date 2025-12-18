#!/usr/bin/env python3
"""
Cherry Studio for Houdini 启动脚本
支持从非 Houdini 环境独立启动
"""

import sys
import os

# 将项目根目录添加到 Python 路径，以便正确导入 cherrystudio 包
project_root = os.path.dirname(os.path.abspath(__file__))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# 使用包导入方式，这样可以正确处理相对导入
from cherrystudio.main import main

if __name__ == "__main__":
    # 调用主函数（它会自动处理命令行参数）
    sys.exit(main())