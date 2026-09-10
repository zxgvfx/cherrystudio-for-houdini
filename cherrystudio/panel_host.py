"""DCC Agent panel process (PySide6 6.10 + QWebEngineView).

Spawned by the shared Cherry backend. The window is frameless and meant to
embed itself into a Houdini/Maya Qt dock host via QWindow.fromWinId +
setParent (the panel process owns the HWND; DCC must not SetParent it).

    python -m cherrystudio.panel_host --dcc-session <id> --backend-url <url> \\
        --dcc-type houdini --embed
"""

from __future__ import annotations

import argparse
import atexit
import os
import sys

# 保证 `import cherrystudio.*` 在 `python -m` 与直接跑脚本两种方式下都能用。
_here = os.path.dirname(os.path.abspath(__file__))
_project_root = os.path.dirname(_here)
_source_root = os.path.abspath(os.environ.get("CHERRY_STUDIO_SOURCE_ROOT", "").strip() or _project_root)
if _source_root not in sys.path:
    sys.path.insert(0, _source_root)


def _resolve_window_index(window_name: str) -> str:
    web_renderer = os.path.join(_source_root, "web", "out", "renderer")
    public_dir = os.path.join(_here, "public")
    candidates = (
        os.path.join(web_renderer, "windows", window_name, "index.html"),
        os.path.join(public_dir, "windows", window_name, "index.html"),
        os.path.join(web_renderer, "windows", "main", "index.html"),
        os.path.join(public_dir, "windows", "main", "index.html"),
    )
    for candidate in candidates:
        if os.path.isfile(candidate):
            return candidate
    return candidates[-1]


def _static_root_for(index_path: str) -> tuple[str, str]:
    abs_url = os.path.abspath(index_path)
    current_dir = os.path.dirname(abs_url)
    search_dir = current_dir
    static_dir = current_dir
    for _ in range(4):
        if os.path.isdir(os.path.join(search_dir, "assets")):
            static_dir = search_dir
            break
        parent_dir = os.path.dirname(search_dir)
        if parent_dir == search_dir:
            break
        search_dir = parent_dir
    rel = os.path.relpath(abs_url, static_dir).replace(os.sep, "/")
    return static_dir, rel


def _write_port_file(session_id: str, url: str) -> str:
    ports = os.path.join(os.path.expanduser("~"), ".cherrystudio", "ports")
    os.makedirs(ports, exist_ok=True)
    path = os.path.join(ports, "panel-%s.port" % session_id)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(url)
    return path


def _prepare_embed_qt_env() -> None:
    """Must run before any PySide6 / QtWebEngine import.

    Qt 6.10 widgets default to DirectComposition (WS_EX_NOREDIRECTIONBITMAP).
    SetParent into Houdini Qt5 then composites to a blank white client area.

    The panel is a separate process from CocoClient, so Chromium can use ANGLE
    D3D11. SwiftShader + disable-gpu-compositing is what made first paint take
    a minute. DirectComposition itself must stay off for the HWND embed.
    """
    os.environ["QT_WIDGETS_RHI"] = "0"
    os.environ["QTWEBENGINE_DISABLE_GPU"] = os.environ.get("QTWEBENGINE_DISABLE_GPU") or "0"
    extra = (
        "--disable-direct-composition",
        "--disable-features=DirectComposition,CalculateNativeWinOcclusion",
    )
    flags = os.environ.get("QTWEBENGINE_CHROMIUM_FLAGS", "")
    tokens = [tok for tok in flags.split() if tok]
    drop = {
        "--disable-gpu",
        "--disable-gpu-compositing",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
    }
    tokens = [tok for tok in tokens if tok not in drop]
    for item in extra:
        if item not in tokens:
            tokens.append(item)
    os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = " ".join(tokens)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Cherry DCC Agent panel")
    parser.add_argument("--dcc-session", required=True)
    parser.add_argument("--backend-url", required=True)
    parser.add_argument("--dcc-type", default="unknown")
    parser.add_argument("--dcc-hwnd", type=int, default=0)
    parser.add_argument("--embed", action="store_true", default=True)
    parser.add_argument("--no-embed", action="store_true")
    args = parser.parse_args(argv)
    embed = bool(args.embed) and not bool(args.no_embed)

    os.environ["CHERRY_PANEL_ATTACH"] = "1"
    os.environ["CHERRY_STUDIO_BACKEND_URL"] = args.backend_url
    if embed:
        _prepare_embed_qt_env()
    try:
        from cherrystudio.api.headless_electron_manager import get_headless_electron_manager

        get_headless_electron_manager().set_python_backend_url(args.backend_url)
        get_headless_electron_manager().begin_attach_in_background()
    except Exception as exc:  # noqa: BLE001
        print("[panel_host] headless pre-attach failed: %s" % exc)

    from cherrystudio.core.app_lifecycle import create_app, ensure_qtwebengine_initialized
    from cherrystudio.core.window_manager import create_window
    from cherrystudio.backend.qt_bridge_server import QtBridgeServer

    ensure_qtwebengine_initialized()
    app = create_app()

    index_path = _resolve_window_index("dccPanel")
    static_dir, rel = _static_root_for(index_path)
    bridge = QtBridgeServer(static_dir=static_dir)
    qt_bridge_url = bridge.start()
    port_file = _write_port_file(args.dcc_session, qt_bridge_url)
    atexit.register(lambda: os.path.exists(port_file) and os.remove(port_file))

    load_url = "%s/%s" % (qt_bridge_url.rstrip("/"), rel)
    try:
        load_url = "%s?v=%s" % (load_url, int(os.path.getmtime(index_path)))
    except OSError:
        pass
    window = create_window(
        load_url,
        theme="dark",
        attach=True,
        backend_url=args.backend_url,
        session_id=args.dcc_session,
        qt_bridge_url=qt_bridge_url,
        dcc_type=args.dcc_type,
        dcc_hwnd=args.dcc_hwnd,
        embed=embed,
    )
    if window is None:
        print("[panel_host] create_window returned None")
        return 1

    window.setWindowTitle("Cherry Agent")
    try:
        app.setQuitOnLastWindowClosed(False)
    except Exception:  # noqa: BLE001
        pass

    from cherrystudio.dcc_adapter.panel_hwnd import live_host_hwnd, read_host_hwnd, remove_hwnd, write_hwnd
    from cherrystudio.dcc_adapter import win32_embed
    from PySide6.QtCore import QEvent, QObject, QTimer
    from PySide6.QtGui import QWindow
    from PySide6.QtWebEngineWidgets import QWebEngineView

    atexit.register(lambda: remove_hwnd(args.dcc_session))
    window._embed_wanted = False
    window._embed_adopted = False
    window._embed_host_hwnd = 0

    def _web_view():
        view = getattr(window, "_cherry_web_view", None)
        if view is not None:
            return view
        views = window.findChildren(QWebEngineView)
        return views[0] if views else None

    def _publish_hwnd() -> dict:
        hwnd = int(window.winId())
        write_hwnd(args.dcc_session, hwnd)
        if int(getattr(window, "_last_published_hwnd", 0) or 0) != hwnd:
            print("[panel_host] embed hwnd=%s" % hwnd)
            window._last_published_hwnd = hwnd
        return {"ok": True, "hwnd": hwnd}

    def _park_window() -> None:
        hwnd = int(window.winId())
        try:
            handle = window.windowHandle()
            if handle is not None:
                handle.setParent(None)
        except Exception:  # noqa: BLE001
            pass
        try:
            win32_embed.detach(hwnd)
        except Exception:  # noqa: BLE001
            pass
        window._embed_adopted = False
        window._embed_host_hwnd = 0
        window._embed_host_window = None
        if window.isVisible():
            window.hide()

    def _fit_to_host(host_hwnd: int) -> dict:
        hwnd = int(window.winId())
        width, height = win32_embed.client_size(host_hwnd)
        if width < 8 or height < 8:
            return {"ok": True, "parented": True, "size": [width, height]}
        if window.width() != width or window.height() != height:
            window.resize(width, height)
        central = window.centralWidget()
        if central is not None:
            central.resize(width, height)
        view = _web_view()
        if view is not None:
            view.resize(width, height)
            view.update()
        try:
            win32_embed.move(hwnd, host_hwnd, activate=False)
            win32_embed.strip_dcomp_tree(hwnd)
        except Exception:  # noqa: BLE001
            pass
        window.update()
        return {"ok": True, "parented": True, "size": [width, height], "host": host_hwnd}

    def _focus_web(host_hwnd: int) -> None:
        hwnd = int(window.winId())
        view = _web_view()
        try:
            if view is not None:
                view.setFocus()
        except Exception:  # noqa: BLE001
            pass
        try:
            win32_embed.focus(hwnd, host_hwnd)
        except Exception:  # noqa: BLE001
            pass

    def _adopt_host() -> dict:
        host_hwnd = int(live_host_hwnd(args.dcc_session) or 0)
        # 宿主 HWND 文件才是是否显示的依据。不要再要求单独的 embed-into：
        # 浮动 dock 会先发 visibilityChanged(False)，把 _embed_wanted 清掉，
        # 面板就停在隐藏状态，Houdini 里只剩一块灰色宿主。
        if not host_hwnd:
            if getattr(window, "_embed_adopted", False) or window.isVisible():
                _park_window()
            return {"ok": True, "parented": False, "wanted": False}
        if int(getattr(window, "_embed_host_hwnd", 0) or 0) == host_hwnd and getattr(
            window, "_embed_adopted", False
        ):
            return _fit_to_host(host_hwnd)

        window.winId()
        handle = window.windowHandle()
        via = "setparent"
        foreign = None
        try:
            foreign = QWindow.fromWinId(host_hwnd)
        except Exception as exc:  # noqa: BLE001
            print("[panel_host] QWindow.fromWinId failed: %s" % exc)
        # 必须保住 fromWinId 的 QWindow，否则 GC 会拆掉外挂宿主包装。
        window._embed_host_window = foreign
        if handle is None:
            handle = window.windowHandle()
        if handle is not None and foreign is not None:
            try:
                handle.setParent(foreign)
                via = "qwindow"
            except Exception as exc:  # noqa: BLE001
                print("[panel_host] QWindow.setParent failed: %s" % exc)
                via = "setparent"
        hwnd = int(window.winId())
        if via == "qwindow":
            try:
                win32_embed.restyle_child(hwnd, host_hwnd)
            except Exception as exc:  # noqa: BLE001
                print("[panel_host] restyle_child failed: %s" % exc)
        if win32_embed.get_parent(hwnd) != host_hwnd:
            try:
                win32_embed.embed(hwnd, host_hwnd)
                via = "qwindow+setparent" if via == "qwindow" else "setparent"
            except Exception as exc:  # noqa: BLE001
                print("[panel_host] owner SetParent failed: %s" % exc)
                if via != "qwindow":
                    _park_window()
                    return {"ok": False, "error": str(exc), "host": host_hwnd}
        window._embed_host_hwnd = host_hwnd
        window._embed_adopted = True
        window._embed_wanted = True
        window.show()
        try:
            win32_embed.show(int(window.winId()), True)
        except Exception:  # noqa: BLE001
            pass
        result = _fit_to_host(host_hwnd)
        _focus_web(host_hwnd)
        result["via"] = via
        print("[panel_host] adopted into host=%s via=%s %s" % (host_hwnd, via, result))
        return result

    def _request_embed() -> dict:
        window._embed_wanted = True

        def _go() -> None:
            _adopt_host()
            host = int(live_host_hwnd(args.dcc_session) or 0)
            if host and getattr(window, "_embed_adopted", False):
                _focus_web(host)

        QTimer.singleShot(0, _go)
        return {"ok": True, "queued": True, "host": int(read_host_hwnd(args.dcc_session) or 0)}

    def _hide() -> dict:
        window._embed_wanted = False
        QTimer.singleShot(0, _park_window)
        return {"ok": True}

    def _on_sync_tick() -> None:
        _adopt_host()

    class _CloseFilter(QObject):
        def eventFilter(self, obj, event):
            if obj is window and int(event.type()) == int(QEvent.Type.Close):
                event.ignore()
                window._embed_wanted = False
                _park_window()
                return True
            return False

    close_filter = _CloseFilter(window)
    window.installEventFilter(close_filter)
    window._embed_close_filter = close_filter

    bridge.set_control("focus", _request_embed)
    bridge.set_control("hide", _hide)
    bridge.set_control("close", _hide)
    bridge.set_control("hwnd", _publish_hwnd)
    bridge.set_control("embedded", _request_embed)
    bridge.set_control("embed-into", _request_embed)

    from PySide6.QtCore import Qt as _QtFlags

    window.setAttribute(_QtFlags.WA_DontShowOnScreen, True)
    window.show()
    window.winId()
    _publish_hwnd()
    window.hide()
    window.setAttribute(_QtFlags.WA_DontShowOnScreen, False)
    QTimer.singleShot(0, _on_sync_tick)
    QTimer.singleShot(400, _on_sync_tick)
    sync_timer = QTimer()
    sync_timer.setInterval(250)
    sync_timer.timeout.connect(_on_sync_tick)
    sync_timer.start()
    window._embed_sync_timer = sync_timer
    return int(app.exec())


if __name__ == "__main__":
    raise SystemExit(main())
