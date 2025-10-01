"""
Cherry Studio for Houdini - 主入口文件
"""

import sys
import os
import argparse

from core.app_lifecycle import (
    ensure_qtwebengine_initialized,
    create_app
)
from core.window_manager import create_window


def main():
    """主函数：应用入口"""
    
    # 1. 解析命令行参数
    parser = argparse.ArgumentParser(description='Cherry Studio for Houdini')
    parser.add_argument('--url', type=str, help='要加载的URL')
    parser.add_argument('--theme', type=str, default='light', choices=['light', 'dark'], 
                        help='界面主题 (light/dark)')
    args = parser.parse_args()
    
    # 2. 确定加载的 URL
    if args.url:
        load_url = args.url
    else:
        # 默认加载本地 index.html
        script_dir = os.path.dirname(os.path.abspath(__file__))
        index_path = os.path.join(script_dir, 'public', 'index.html')
        if not os.path.exists(index_path):
            print(f"错误：找不到 index.html 在 {index_path}")
            sys.exit(1)
        load_url = index_path
    
    # 3. 初始化 QtWebEngine 环境
    ensure_qtwebengine_initialized()
    
    # 4. 创建或获取 QApplication
    app = create_app()
    
    # 5. 创建主窗口
    window = create_window(load_url, args.theme)
    window.show()
    
    # 6. 运行事件循环
    # 注意：在 Houdini 环境中（包括 hython），不应调用 app.exec()
    # 因为可能导致崩溃或阻塞
    try:
        import hou  # type: ignore
        _ = hou.ui
        # 在 Houdini 内部不调用 app.exec()，避免阻塞或提前退出
        print("在 Houdini 环境中运行，窗口已显示")
        return
    except Exception:
        # 独立运行
        sys.exit(app.exec())


if __name__ == '__main__':
    main()

