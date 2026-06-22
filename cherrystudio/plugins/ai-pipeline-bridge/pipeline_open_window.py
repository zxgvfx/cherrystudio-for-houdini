"""ai-pipeline-bridge —— 独立 Qt 窗口 + QWebEngineView 加载工具页。

为什么不用 Cherry 的内置 webview iframe？
  - CherryStudio 的 BrowserView/iframe 在某些机器上加载本插件 frontend 时
    会出现"白屏"——iframe 拉到了 HTML，但内部脚本 fetch /api/... 时被
    BrowserView 的私有网络/CORS 策略拦截，整个页面没法初始化。
  - 直接系统浏览器又脱离了 Houdini/CherryStudio 桌面流，体验差。
  - 用 PySide6 QWebEngineView 起一个独立窗口加载同一个前端 URL，得到的是
    完整的 Chromium 上下文（无跨源限制 / 无 BrowserView preflight 拦截），
    既能跑前端 JS，又能保留"嵌在桌面应用里"的体感。

子进程隔离的原因和 pipeline_open_gui.py 一样：QApplication 必须在主线程跑，
HTTP route handler 在后台线程，必须 fork 出去。

约定：
  - 成功最后一行 stdout: {"ok": true, "url": "..."}
  - 失败最后一行: {"error": "..."}
"""

from __future__ import annotations

import argparse
import json
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
    sys.stderr.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
except Exception:
    pass


def _eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def _emit(payload: dict) -> None:
    print(json.dumps(payload, ensure_ascii=False))


def _run_window(url: str, title: str, width: int, height: int) -> int:
    """阻塞跑一个 Qt 主循环，关闭窗口后返回 0。"""
    try:
        from PySide6.QtCore import QUrl, Qt
        from PySide6.QtGui import QIcon
        from PySide6.QtWidgets import QApplication, QMainWindow
        from PySide6.QtWebEngineWidgets import QWebEngineView
        from PySide6.QtWebEngineCore import QWebEngineProfile, QWebEngineSettings
    except Exception as exc:
        _emit({"error": f"PySide6 / QtWebEngine 导入失败: {exc}"})
        return 1

    app = QApplication.instance() or QApplication(sys.argv)

    win = QMainWindow()
    win.setWindowTitle(title)
    win.resize(width, height)
    win.setWindowFlag(Qt.Window, True)

    # 用独立 profile：和系统其它 QtWebEngine 进程共用 cookies / cache 没意义，
    # bridge 自己 session 自己管。
    profile = QWebEngineProfile("ai-pipeline-bridge", win)
    profile.setHttpUserAgent(
        (profile.httpUserAgent() or "") + " CherryStudio-AIPipelineBridge"
    )

    view = QWebEngineView(win)
    settings = view.settings()
    # 允许 iframe 嵌入 SAM3 工具页 + 弹文件框 / 复制 / 全屏等常见交互
    settings.setAttribute(QWebEngineSettings.JavascriptEnabled, True)
    settings.setAttribute(QWebEngineSettings.LocalContentCanAccessRemoteUrls, True)
    settings.setAttribute(QWebEngineSettings.LocalContentCanAccessFileUrls, True)
    settings.setAttribute(QWebEngineSettings.AllowRunningInsecureContent, True)
    settings.setAttribute(QWebEngineSettings.JavascriptCanOpenWindows, True)
    settings.setAttribute(QWebEngineSettings.JavascriptCanAccessClipboard, True)
    settings.setAttribute(QWebEngineSettings.PluginsEnabled, True)
    settings.setAttribute(QWebEngineSettings.FullScreenSupportEnabled, True)
    try:
        # Qt 6.4+：允许第三方 cookies（SAM3 工具的 iframe 也要 session）
        settings.setAttribute(QWebEngineSettings.ErrorPageEnabled, True)
    except Exception:
        pass

    # window.open / target=_blank → 弹新窗口而不是在主 view 里覆盖
    def _create_new_window(_type):
        sub = QMainWindow(win)
        sub.setWindowTitle(f"{title} – popup")
        sub.resize(900, 700)
        sub_view = QWebEngineView(sub)
        sub.setCentralWidget(sub_view)
        sub.show()
        return sub_view

    try:
        view.page().newWindowRequested.connect(  # Qt 6.5+
            lambda req: req.openIn(_create_new_window(req.destination()))
        )
    except Exception:
        pass

    win.setCentralWidget(view)
    view.load(QUrl(url))
    win.show()
    win.raise_()
    win.activateWindow()

    _eprint(f"[window] loaded {url}")
    code = app.exec()
    return int(code or 0)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True, help="QWebEngineView 加载的 URL")
    parser.add_argument("--title", default="AI Pipeline Bridge")
    parser.add_argument("--width", type=int, default=1280)
    parser.add_argument("--height", type=int, default=860)
    args = parser.parse_args()

    _emit({"ok": True, "url": args.url})
    sys.stdout.flush()

    return _run_window(args.url, args.title, args.width, args.height)


if __name__ == "__main__":
    sys.exit(main())
