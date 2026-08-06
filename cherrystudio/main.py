"""
Cherry Studio for Houdini - 主入口文件
"""

import sys
import os
import argparse

from .core.app_lifecycle import (
    ensure_qtwebengine_initialized,
    create_app
)
from .core.window_manager import create_window
from .utils.package_manager_config import ensure_package_manager_configs


def _resolve_index_path() -> str:
    """优先使用 web/out/renderer 产物，其次使用内置 public。

    v2.0 起 electron-vite 把渲染进程改成了多窗口构建（见
    electron.vite.config.ts 的 rollupOptions.input），主窗口的产物落在
    <root>/windows/main/index.html，而不再是旧版（v1.9.12）单文件的
    <root>/index.html。这个 <root> 既可能是 web/out/renderer（随包分发完整
    web/ 构建产物的场景），也可能是 cherrystudio/public（独立部署场景，例如
    COCO——把 web/out/renderer 下的内容整个复制进 public/ 里）。这里按
    「web/out/renderer 新版 -> web/out/renderer 旧版 -> public 新版 -> public
    旧版」的顺序依次探测。
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    web_renderer = os.path.join(project_root, 'web', 'out', 'renderer')
    public_dir = os.path.join(script_dir, 'public')
    candidates = (
        os.path.join(web_renderer, 'windows', 'main', 'index.html'),
        os.path.join(web_renderer, 'index.html'),
        os.path.join(public_dir, 'windows', 'main', 'index.html'),
        os.path.join(public_dir, 'index.html'),
    )
    for candidate in candidates:
        if os.path.exists(candidate):
            return candidate
    return candidates[-1]


def main():
    """主函数：应用入口"""
    
    # 0. 检查并配置包管理器环境 (npm/uv)
    ensure_package_manager_configs()
    
    # 1. 解析命令行参数
    parser = argparse.ArgumentParser(description='Cherry Studio for Houdini')
    parser.add_argument('--url', type=str, help='要加载的URL')
    parser.add_argument('--theme', type=str, default='dark', choices=['light', 'dark'], 
                        help='界面主题 (light/dark)')
    args = parser.parse_args()
    
    # 2. 确定加载的 URL
    if args.url:
        load_url = args.url
    else:
        # 默认加载本地 index.html
        index_path = _resolve_index_path()
        if not os.path.exists(index_path):
            print(f"错误：找不到 index.html 在 {index_path}")
            sys.exit(1)
        load_url = index_path
    
    # 3. 初始化 QtWebEngine 环境
    ensure_qtwebengine_initialized()
    
    # 4. 创建或获取 QApplication
    app = create_app()
    
    # 5. 创建主窗口
    window = create_window(load_url, args.theme, as_widget=False)
    window.show()
    
    # 6. 运行事件循环
    # 注意：在 Houdini 环境中（包括 hython），不应调用 app.exec()
    # 因为可能导致崩溃或阻塞
    try:
        import hou  # type: ignore
        _ = hou.ui
        # 在 Houdini 内部不调用 app.exec()，避免阻塞或提前退出
        print("[Cherry Studio] 窗口已显示")
        return
    except Exception:
        # 独立运行
        sys.exit(app.exec())


if __name__ == '__main__':
    main()


def create_widget_for_pane(url: str | None = None, theme: str = 'dark', parent=None, **_ignored_kwargs):
    """返回可嵌入 Houdini/COCO 面板的 QWidget。

    Args:
        url: 指定加载的 URL（不传则使用默认 index.html）
        theme: 主题（'light' 或 'dark'）
        parent: 宿主（如 COCO/Houdini）传入的父 QWidget，用于正确挂载/托管
                生命周期。可选，不传则由 create_window 自行探测（例如尝试挂到
                Houdini 主窗口）。
        **_ignored_kwargs: 兼容宿主未来新增的调用参数，避免因为
                TypeError: unexpected keyword argument 而崩溃。

    Returns:
        QWidget: 可直接作为 pane 的内容 widget 使用
    """
    import os

    if url:
        load_url = url
    else:
        index_path = _resolve_index_path()
        if not os.path.exists(index_path):
            raise FileNotFoundError(f"找不到 index.html 在 {index_path}")
        load_url = index_path

    # 初始化 QtWebEngine & 应用
    ensure_qtwebengine_initialized()
    app = create_app()

    # 返回 QWidget 而不是窗口
    widget = create_window(load_url, theme, as_widget=True, parent=parent)
    return widget

