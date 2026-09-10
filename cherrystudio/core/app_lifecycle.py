"""
应用生命周期管理模块
处理 Qt 应用初始化和 Houdini 环境检测
"""

import os
import sys


def detect_dcc_type() -> str:
    """
    检测当前运行的 DCC 宿主类型。

    Returns:
        str: 'houdini' | 'maya' | 'blender' | 'standalone'
    """
    try:
        import hou  # type: ignore
        _ = hou.applicationVersionString()
        return "houdini"
    except Exception:
        pass
    try:
        import maya.cmds  # type: ignore
        return "maya"
    except Exception:
        pass
    try:
        import bpy  # type: ignore
        return "blender"
    except Exception:
        pass
    return "standalone"


def is_running_inside_houdini() -> bool:
    """
    检查是否在 Houdini 环境中运行
    
    Returns:
        bool: 如果在 Houdini 环境中返回 True
    """
    try:
        import hou  # type: ignore
        _ = hou.ui
        return True
    except Exception:
        return False


def is_houdini_ui_available() -> bool:
    """
    更精确地检测 Houdini UI 是否可用
    在嵌入 Houdini UI 的 Python 环境下返回 True；纯 hython CLI 返回 False
    
    Returns:
        bool: 如果 Houdini UI 可用返回 True
    """
    try:
        import hou  # type: ignore
        if hasattr(hou, 'isUIAvailable'):
            return bool(hou.isUIAvailable())
    except Exception:
        pass
    return False


def ensure_qtwebengine_initialized():
    """
    初始化 QtWebEngine 环境
    设置必要的环境变量和 Chromium 标志
    """
    try:
        # 获取现有的 Chromium 标志
        flags = os.environ.get("QTWEBENGINE_CHROMIUM_FLAGS", "")
        flag_set = set(flags.split()) if flags else set()
        
        # 无 UI（hython CLI）以及 CocoClient 独立进程：默认禁用硬件 GPU。
        # 后者 python.exe 会在 Qt6Gui/D3D11 合成 WebEngine 帧时 AV。
        default_disable_gpu = detect_dcc_type() == "standalone"
        try:
            if 'hou' in sys.modules:
                import hou  # type: ignore
                if hasattr(hou, 'isUIAvailable') and not hou.isUIAvailable():
                    default_disable_gpu = True
        except Exception:
            pass
        
        if default_disable_gpu and os.environ.get("QTWEBENGINE_DISABLE_GPU") not in {"0", "false", "False"}:
            os.environ["QTWEBENGINE_DISABLE_GPU"] = "1"

        # 根据 GPU 偏好设置标志。GUI 模式统一通过 ANGLE/D3D11 使用 GPU：
        # Qt WebEngine 的原生 OpenGL 会与 DCC 宿主冲突，而 zero-copy 在部分
        # Windows 驱动/嵌入窗口中会产生棋盘状纹理损坏。D3D11 仍是完整的
        # GPU 加速，只禁用不稳定的零拷贝上传路径。
        gpu_disabled = os.environ.get("QTWEBENGINE_DISABLE_GPU") in {"1", "true", "True"}
        # --disable-renderer-accessibility：QtWebEngine 6.10.1 的无障碍桥接存在
        # 空指针崩溃（QTBUG-142320，QAccessible::uniqueId(nullptr) ← 
        # BrowserAccessibilityManagerQt）。Windows 11 中文输入法通过 UIA 查询
        # 文本时会激活 Chromium 的无障碍树，用户一开始打字就可能把 python.exe
        # 打崩（Qt6Gui.dll 0xc0000005）。关闭渲染进程无障碍树是上游推荐的
        # 通用 workaround，不影响输入法与正常交互。
        desired = ["--no-sandbox", "--disable-renderer-accessibility"]

        # Remove stale/conflicting switches inherited from launchers or an older
        # initialization pass before selecting one deterministic render path.
        flag_set.discard("--enable-zero-copy")
        if not gpu_disabled:
            flag_set.discard("--disable-gpu")
            flag_set.discard("--disable-gpu-compositing")
            flag_set.discard("--disable-software-rasterizer")
            desired.extend([
                "--ignore-gpu-blocklist",
                "--enable-gpu",
                "--use-gl=angle",
                "--use-angle=d3d11",
            ])
        else:
            flag_set.discard("--enable-gpu")
            flag_set.discard("--disable-gpu")
            flag_set.discard("--use-angle=d3d11")
            desired.extend([
                "--disable-gpu-sandbox",
                "--disable-gpu-compositing",
                "--use-gl=angle",
                "--use-angle=swiftshader",
                "--enable-unsafe-swiftshader",
            ])
            # Chromium's hardware path remains disabled by forcing ANGLE to the
            # CPU SwiftShader backend. Unlike `--disable-gpu`, this preserves
            # WebGL for GLB previews while Qt itself stays on software rendering.
        
        # 添加所需标志
        for item in desired:
            if item not in flag_set:
                flag_set.add(item)
        
        os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = " ".join(sorted(flag_set))

        # 导入 QtWebEngineCore 以完成初始化
        from PySide6 import QtWebEngineCore  # noqa: F401
    except Exception:
        pass


def create_app():
    """
    创建或获取 QApplication 实例
    
    Returns:
        QApplication: Qt 应用实例
    """
    from PySide6.QtCore import Qt, QCoreApplication
    from PySide6.QtWidgets import QApplication

    # 尽早安装：qFatal 文本与原生崩溃时的 Python 线程栈需要在任何 Qt 对象
    # 创建之前就开始记录，否则启动阶段的崩溃无从追溯。
    try:
        from ..utils.crash_diagnostics import install_crash_diagnostics
        install_crash_diagnostics()
    except Exception:
        pass
    
    app = QApplication.instance()
    if app is None:
        # 仅在未创建应用时设置属性；在 Houdini 内部已存在 QApplication
        QCoreApplication.setAttribute(Qt.AA_ShareOpenGLContexts, True)
        app = QApplication(sys.argv)
    
    return app

