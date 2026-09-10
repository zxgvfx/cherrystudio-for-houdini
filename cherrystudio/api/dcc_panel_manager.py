"""One external Qt panel process per DCC session.

The DCC process itself has no Qt. This manager lives in the shared Cherry
backend and spawns::

    <coco venv python> -m cherrystudio.panel_host --dcc-session <id> --backend-url <url>

The panel loads ``windows/dccPanel`` in QWebEngineView. DCC docks a native
Qt host and the panel process embeds its own HWND into that host.
"""

from __future__ import annotations

import os
import subprocess
import threading
from typing import Any, Dict, Optional

from ..utils.logger import network_logger as _log

_CREATE_NO_WINDOW = subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0


def _project_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def _find_runtime_python() -> str:
    for key in ("COCO_VENV_PYTHON", "CHERRY_RUNTIME_PYTHON", "CHERRY_PANEL_PYTHON"):
        value = os.environ.get(key, "").strip()
        if value and os.path.isfile(value):
            return value
    coco_root = (os.environ.get("COCO_ROOT") or os.environ.get("COCO") or "").strip()
    candidates = []
    if coco_root:
        candidates.append(os.path.join(coco_root, ".venv", "Scripts", "python.exe"))
        candidates.append(os.path.join(coco_root, ".venv", "bin", "python"))
    home = os.path.expanduser("~")
    candidates.append(os.path.join(home, "coco", ".venv", "Scripts", "python.exe"))
    candidates.append(os.path.join(home, "coco", ".venv", "bin", "python"))
    for candidate in candidates:
        if os.path.isfile(candidate):
            return candidate
    return os.environ.get("PYTHON", "") or ""


def _clean_env(extra: Optional[Dict[str, str]] = None) -> Dict[str, str]:
    env = dict(os.environ)
    for key in (
        "PYTHONHOME",
        "PYTHONPATH",
        "QT_PLUGIN_PATH",
        "QT_QPA_PLATFORM_PLUGIN_PATH",
        "QML2_IMPORT_PATH",
        "QML_IMPORT_PATH",
        "QT_QPA_PLATFORM",
        "HOUDINI_QT_PLUGIN_PATH",
    ):
        env.pop(key, None)
    env["CHERRY_STUDIO_SOURCE_ROOT"] = _project_root()
    env.setdefault("PYTHONUTF8", "1")
    if extra:
        env.update(extra)
    return env


def _pid_alive(pid: int) -> bool:
    if not pid:
        return False
    if os.name == "nt":
        import ctypes
        PROCESS_QUERY_LIMITED_INFORMATION = 0x1000
        handle = ctypes.windll.kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, False, int(pid))
        if handle:
            ctypes.windll.kernel32.CloseHandle(handle)
            return True
        return False
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False


class DccPanelManager:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._panels: Dict[str, subprocess.Popen] = {}

    def open(self, session_id: str, server: Any, body: Optional[dict] = None) -> dict:
        body = body or {}
        threading.Thread(
            target=self._ensure_headless,
            name="CherryHeadlessForPanel",
            daemon=True,
        ).start()
        with self._lock:
            existing = self._panels.get(session_id)
            if existing is not None and existing.poll() is None:
                return {"ok": True, "pid": existing.pid, "already": True}
            info = server.get_session(session_id) if server else {}
            python_exe = _find_runtime_python()
            if not python_exe or not os.path.isfile(python_exe):
                return {"error": "找不到面板 Python（设置 COCO_VENV_PYTHON）"}
            backend_url = body.get("backendUrl") or ""
            if not backend_url:
                try:
                    backend_url = server.get_base_url()
                except Exception:  # noqa: BLE001
                    backend_url = "http://127.0.0.1:9876"
            hwnd = int(body.get("mainWindowHandle") or info.get("main_window_handle") or info.get("mainWindowHandle") or 0)
            dcc_type = str(body.get("dccType") or info.get("dcc_type") or "unknown")
            log_dir = os.path.join(os.path.expanduser("~"), ".cherrystudio", dcc_type, "logs")
            os.makedirs(log_dir, exist_ok=True)
            log_path = os.path.join(log_dir, "panel-%s.log" % session_id[:8])
            try:
                from ..dcc_adapter import panel_hwnd as _panel_hwnd
                _panel_hwnd.remove_hwnd(session_id)
            except Exception:  # noqa: BLE001
                pass
            log_file = open(log_path, "a", encoding="utf-8")  # noqa: SIM115
            cmd = [
                python_exe,
                "-m",
                "cherrystudio.panel_host",
                "--dcc-session",
                session_id,
                "--backend-url",
                backend_url,
                "--dcc-type",
                dcc_type,
                "--dcc-hwnd",
                str(hwnd),
                "--embed",
            ]
            creationflags = 0
            if os.name == "nt":
                creationflags = subprocess.CREATE_NEW_PROCESS_GROUP | _CREATE_NO_WINDOW
            proc = subprocess.Popen(
                cmd,
                cwd=_project_root(),
                env=_clean_env({"CHERRY_PANEL_SESSION": session_id}),
                stdout=log_file,
                stderr=subprocess.STDOUT,
                creationflags=creationflags,
            )
            self._panels[session_id] = proc
            _log("[dcc-panel] spawned pid=%s session=%s log=%s" % (proc.pid, session_id, log_path))
            return {"ok": True, "pid": proc.pid, "log": log_path}

    def _ensure_headless(self) -> None:
        try:
            from .headless_electron_manager import get_headless_electron_manager
            ok, message = get_headless_electron_manager().start()
            _log("[dcc-panel] headless ready=%s %s" % (ok, message))
        except Exception as exc:  # noqa: BLE001
            _log("[dcc-panel] headless start failed: %s" % exc)

    def focus(self, session_id: str, server: Any, body: Optional[dict] = None) -> dict:
        with self._lock:
            proc = self._panels.get(session_id)
            if proc is None or proc.poll() is not None:
                return self.open(session_id, server, body)
        return self._signal(session_id, "embed-into")

    def close(self, session_id: str, server: Any, body: Optional[dict] = None) -> dict:
        with self._lock:
            proc = self._panels.pop(session_id, None)
        if proc is None:
            return {"ok": True}
        if proc.poll() is None:
            try:
                proc.terminate()
                proc.wait(timeout=5)
            except Exception:  # noqa: BLE001
                try:
                    proc.kill()
                except Exception:  # noqa: BLE001
                    pass
        return {"ok": True}

    def toggle(self, session_id: str, server: Any, body: Optional[dict] = None) -> dict:
        # 显示/隐藏由 DCC 停靠区负责；HTTP toggle 只保证进程活着。
        with self._lock:
            proc = self._panels.get(session_id)
            running = proc is not None and proc.poll() is None
        if running:
            return self._signal(session_id, "embed-into")
        return self.open(session_id, server, body)

    def _signal(self, session_id: str, action: str) -> dict:
        # 面板进程通过 loopback 控制口收 focus；拿不到就当已在前台。
        port_file = os.path.join(
            os.path.expanduser("~"), ".cherrystudio", "ports", "panel-%s.port" % session_id
        )
        if not os.path.isfile(port_file):
            return {"ok": True, "action": action}
        try:
            with open(port_file, "r", encoding="utf-8") as fh:
                url = fh.read().strip()
            import urllib.request
            req = urllib.request.Request(
                url.rstrip("/") + "/control/" + action,
                data=b"{}",
                method="POST",
                headers={"Content-Type": "application/json"},
            )
            urllib.request.urlopen(req, timeout=2).read()
        except Exception as exc:  # noqa: BLE001
            return {"ok": True, "action": action, "warning": str(exc)}
        return {"ok": True, "action": action}

    def prune(self) -> None:
        with self._lock:
            dead = [sid for sid, proc in self._panels.items() if proc.poll() is not None]
            for sid in dead:
                self._panels.pop(sid, None)


_manager: Optional[DccPanelManager] = None
_manager_lock = threading.Lock()


def get_dcc_panel_manager() -> DccPanelManager:
    global _manager
    with _manager_lock:
        if _manager is None:
            _manager = DccPanelManager()
        return _manager
