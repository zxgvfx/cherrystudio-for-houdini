# -*- coding: utf-8 -*-
"""
DCC 侧启动引导：在 DCC 启动脚本（Houdini pythonrc / Maya userSetup …）里调用
:func:`start`，之后 Agent 面板与共享 Cherry 运行时就接上了。

流程::

    发现共享 backend（CHERRY_BACKEND_URL → ~/.cherrystudio/ports/*.port → 默认端口）
      └─ 没有 → 用 COCO venv 的 python 拉起 cherry_backend_launcher.py（独立进程）
    启动本 DCC 的适配器 server（loopback HTTP）
    POST /api/v1/sessions/register（mcpPort / pid / 主窗句柄 / 工具列表）
    心跳线程（backend 重启后自动重新注册）
    可选：拉起面板进程，并把窗口嵌进 Houdini/Maya 的 Qt 停靠区
    atexit：注销 + 停 server（+ 若 backend 是我们拉起且已无其他 DCC 会话则收掉）

只用标准库，不 import Qt。
"""

from __future__ import annotations

import atexit
import json
import logging
import os
import socket
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.request
import uuid
from typing import Any, Dict, List, Optional

from .base import DccAdapter
from .server import DccAdapterServer

log = logging.getLogger("cherry.dcc_adapter")

ADAPTER_VERSION = "2.1.0"
DEFAULT_BACKEND_PORT = 9876
_CHERRY_HOME = os.path.join(os.path.expanduser("~"), ".cherrystudio")
_PORTS_DIR = os.path.join(_CHERRY_HOME, "ports")

# 拉起 backend / 面板时必须洗掉的 DCC 环境变量：hython/mayapy 会设置自己的
# PYTHONHOME、Qt 插件路径，泄漏给 PySide6 6.10 的面板进程会直接崩。
_STRIP_ENV_KEYS = (
    "PYTHONHOME",
    "PYTHONPATH",
    "QT_PLUGIN_PATH",
    "QT_QPA_PLATFORM_PLUGIN_PATH",
    "QML2_IMPORT_PATH",
    "QML_IMPORT_PATH",
    "QT_QPA_PLATFORM",
    "QT_SCALE_FACTOR",
    "QT_AUTO_SCREEN_SCALE_FACTOR",
    "HOUDINI_QT_PLUGIN_PATH",
)


# ── 日志 ───────────────────────────────────────────────────────────────────────

_logging_ready = False


def setup_logging(dcc_type: str) -> None:
    global _logging_ready
    if _logging_ready:
        return
    _logging_ready = True
    root = logging.getLogger("cherry.dcc_adapter")
    root.setLevel(logging.DEBUG)
    fmt = logging.Formatter("[%(asctime)s] [%(levelname)s] [%(threadName)s] %(name)s: %(message)s")
    try:
        log_dir = os.path.join(_CHERRY_HOME, dcc_type, "logs")
        os.makedirs(log_dir, exist_ok=True)
        fh = logging.FileHandler(os.path.join(log_dir, "dcc_adapter.log"), encoding="utf-8")
        fh.setFormatter(fmt)
        fh.setLevel(logging.DEBUG)
        root.addHandler(fh)
    except Exception:  # noqa: BLE001
        pass
    sh = logging.StreamHandler(sys.stderr)
    sh.setFormatter(fmt)
    sh.setLevel(logging.INFO)
    root.addHandler(sh)


# ── HTTP 小工具 ────────────────────────────────────────────────────────────────

def _http_json(method: str, url: str, body: Optional[Dict[str, Any]] = None, timeout: float = 5.0) -> Any:
    data = None
    headers = {"Accept": "application/json"}
    if body is not None:
        data = json.dumps(body, ensure_ascii=False, default=str).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        raw = resp.read()
    if not raw:
        return {}
    try:
        return json.loads(raw.decode("utf-8"))
    except ValueError:
        return {"_raw": raw.decode("utf-8", errors="replace")}


def probe_backend(url: str, timeout: float = 2.0) -> bool:
    """*url* 是否是活着的 Cherry backend。"""
    try:
        _http_json("GET", url.rstrip("/") + "/api/v1/config/merged", timeout=timeout)
        return True
    except Exception:  # noqa: BLE001
        return False


def _read_port_files() -> List[str]:
    if not os.path.isdir(_PORTS_DIR):
        return []
    entries = []
    for name in os.listdir(_PORTS_DIR):
        if not name.endswith(".port"):
            continue
        path = os.path.join(_PORTS_DIR, name)
        try:
            entries.append((os.path.getmtime(path), path))
        except OSError:
            continue
    # 最新的 port 文件优先：COCO 客户端刚拉起的那个最可能活着。
    return [p for _m, p in sorted(entries, reverse=True)]


def discover_backend_url(timeout: float = 2.0) -> str:
    """按优先级发现共享 backend；找不到返回 ''。"""
    env_url = os.environ.get("CHERRY_BACKEND_URL", "").strip()
    if env_url and probe_backend(env_url, timeout):
        return env_url.rstrip("/")

    for port_file in _read_port_files():
        try:
            with open(port_file, "r", encoding="utf-8") as fh:
                content = fh.read().strip()
        except OSError:
            continue
        if not content:
            continue
        url = content if content.startswith("http") else "http://%s" % content
        if probe_backend(url, timeout):
            return url.rstrip("/")
        try:
            os.remove(port_file)
        except OSError:
            pass

    legacy = os.path.join(_CHERRY_HOME, "backend.port")
    if os.path.isfile(legacy):
        try:
            with open(legacy, "r", encoding="utf-8") as fh:
                content = fh.read().strip()
            if content:
                url = content if content.startswith("http") else "http://%s" % content
                if probe_backend(url, timeout):
                    return url.rstrip("/")
        except OSError:
            pass

    default = "http://127.0.0.1:%d" % DEFAULT_BACKEND_PORT
    if probe_backend(default, timeout):
        return default
    return ""


# ── backend 拉起 ───────────────────────────────────────────────────────────────

def find_runtime_python() -> str:
    """找到能跑 Cherry backend / 面板宿主的 Python（COCO venv 的 PySide6 6.10）。"""
    for key in ("COCO_VENV_PYTHON", "CHERRY_RUNTIME_PYTHON", "CHERRY_PANEL_PYTHON"):
        value = os.environ.get(key, "").strip()
        if value and os.path.isfile(value):
            return value
    candidates = []
    coco_root = (os.environ.get("COCO_ROOT") or os.environ.get("COCO") or "").strip()
    if coco_root:
        candidates.append(os.path.join(coco_root, ".venv", "Scripts", "python.exe"))
        candidates.append(os.path.join(coco_root, ".venv", "bin", "python"))
    home = os.path.expanduser("~")
    candidates.append(os.path.join(home, "coco", ".venv", "Scripts", "python.exe"))
    candidates.append(os.path.join(home, "coco", ".venv", "bin", "python"))
    for candidate in candidates:
        if os.path.isfile(candidate):
            return candidate
    return ""


def _project_root() -> str:
    # <root>/cherrystudio/dcc_adapter/bootstrap.py → <root>
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.dirname(os.path.dirname(here))


def clean_child_env(extra: Optional[Dict[str, str]] = None) -> Dict[str, str]:
    env = dict(os.environ)
    for key in _STRIP_ENV_KEYS:
        env.pop(key, None)
    env["CHERRY_STUDIO_SOURCE_ROOT"] = _project_root()
    env.setdefault("PYTHONUTF8", "1")
    env.setdefault("PYTHONIOENCODING", "utf-8")
    if extra:
        env.update(extra)
    return env


def launch_backend(python_exe: str = "", wait_seconds: float = 45.0, dcc_type: str = "dcc") -> "tuple[str, Optional[subprocess.Popen]]":
    """拉起独立 backend 进程并等待它可用。返回 (backend_url, Popen)。"""
    python_exe = python_exe or find_runtime_python()
    if not python_exe:
        raise RuntimeError(
            "找不到 COCO 运行时 Python：请设置 COCO_VENV_PYTHON 或 COCO_ROOT，"
            "或先启动 COCO 客户端。"
        )
    launcher = os.path.join(_project_root(), "cherrystudio", "backend", "cherry_backend_launcher.py")
    if not os.path.isfile(launcher):
        raise RuntimeError("cherry_backend_launcher.py 不存在: %s" % launcher)

    log_dir = os.path.join(_CHERRY_HOME, dcc_type, "logs")
    os.makedirs(log_dir, exist_ok=True)
    log_path = os.path.join(log_dir, "backend-launched-by-dcc.log")
    log_file = open(log_path, "a", encoding="utf-8")  # noqa: SIM115 — 子进程持有

    before = set(_read_port_files())
    creationflags = 0
    if os.name == "nt":
        creationflags = subprocess.CREATE_NEW_PROCESS_GROUP | getattr(subprocess, "CREATE_NO_WINDOW", 0)
    proc = subprocess.Popen(
        [python_exe, launcher, "--host", "127.0.0.1", "--port", "0"],
        cwd=_project_root(),
        env=clean_child_env({"CHERRY_LAUNCHED_BY": "dcc-adapter:%s" % dcc_type}),
        stdout=log_file,
        stderr=subprocess.STDOUT,
        stdin=subprocess.DEVNULL,
        creationflags=creationflags,
        close_fds=True,
    )
    log.info("backend launched pid=%s (log: %s)", proc.pid, log_path)

    deadline = time.time() + wait_seconds
    while time.time() < deadline:
        if proc.poll() is not None:
            raise RuntimeError("backend 进程提前退出（exit=%s），详见 %s" % (proc.returncode, log_path))
        for port_file in _read_port_files():
            if port_file in before:
                continue
            try:
                with open(port_file, "r", encoding="utf-8") as fh:
                    content = fh.read().strip()
            except OSError:
                continue
            if not content:
                continue
            url = content if content.startswith("http") else "http://%s" % content
            if probe_backend(url, 1.5):
                return url.rstrip("/"), proc
        time.sleep(0.5)
    raise RuntimeError("backend 在 %.0fs 内未就绪，详见 %s" % (wait_seconds, log_path))


# ── 适配器工厂 ─────────────────────────────────────────────────────────────────

def detect_dcc_type() -> str:
    forced = os.environ.get("CHERRY_DCC_TYPE", "").strip().lower()
    if forced:
        return forced
    try:
        import hou  # type: ignore  # noqa: F401
        return "houdini"
    except Exception:  # noqa: BLE001
        pass
    try:
        import maya.cmds  # type: ignore  # noqa: F401
        return "maya"
    except Exception:  # noqa: BLE001
        pass
    try:
        import nuke  # type: ignore  # noqa: F401
        return "nuke"
    except Exception:  # noqa: BLE001
        pass
    try:
        import bpy  # type: ignore  # noqa: F401
        return "blender"
    except Exception:  # noqa: BLE001
        pass
    return "unknown"


def create_adapter(dcc_type: Optional[str] = None) -> DccAdapter:
    dcc_type = (dcc_type or detect_dcc_type()).lower()
    if dcc_type == "houdini":
        from .houdini import HoudiniAdapter
        return HoudiniAdapter()
    if dcc_type == "maya":
        from .maya import MayaAdapter
        return MayaAdapter()
    raise RuntimeError("暂不支持的 DCC: %s（第一期只有 houdini / maya）" % dcc_type)


# ── 引导器 ─────────────────────────────────────────────────────────────────────

class DccBootstrap:
    HEARTBEAT_INTERVAL = 15.0

    def __init__(self, adapter: Optional[DccAdapter] = None, session_id: Optional[str] = None) -> None:
        self.adapter = adapter or create_adapter()
        self.session_id = session_id or os.environ.get("CHERRY_DCC_SESSION_ID", "").strip() or str(uuid.uuid4())
        self.server: Optional[DccAdapterServer] = None
        self.backend_url = ""
        self.backend_process: Optional[subprocess.Popen] = None
        self._registered = False
        self._stop = threading.Event()
        self._heartbeat: Optional[threading.Thread] = None
        self._lock = threading.Lock()
        self._started = False
        self._main_window_handle = 0

    # ── 对外 API ───────────────────────────────────────────────────────────────

    def start(self, open_panel: bool = True, launch_backend_if_missing: bool = True) -> Dict[str, Any]:
        setup_logging(self.adapter.dcc_type)
        with self._lock:
            if self._started:
                return self.status()
            self._started = True

        log.info("bootstrap start dcc=%s version=%s session=%s pid=%s",
                 self.adapter.dcc_type, self.adapter.version(), self.session_id, os.getpid())

        self.server = DccAdapterServer(self.adapter)
        self.server.start()

        try:
            self._main_window_handle = int(self.adapter.run_on_main_thread(self.adapter.main_window_handle, timeout=10) or 0)
        except Exception as exc:  # noqa: BLE001
            log.warning("main_window_handle unavailable: %s", exc)

        self.backend_url = discover_backend_url()
        if not self.backend_url and launch_backend_if_missing:
            try:
                self.backend_url, self.backend_process = launch_backend(dcc_type=self.adapter.dcc_type)
            except Exception as exc:  # noqa: BLE001
                log.error("launch backend failed: %s", exc)
        if self.backend_url:
            self.register()
        else:
            log.warning("no Cherry backend available; will keep retrying in heartbeat")

        self._heartbeat = threading.Thread(target=self._heartbeat_loop, name="CherryDccHeartbeat", daemon=True)
        self._heartbeat.start()
        atexit.register(self.stop)

        if self._registered:
            # Chromium 冷启动和停靠区显示并行，避免用户点开面板才开始拉进程。
            self._prewarm_panel()
        if open_panel and self._registered:
            self.open_panel()
        return self.status()

    def stop(self) -> None:
        if self._stop.is_set():
            return
        self._stop.set()
        log.info("bootstrap stop session=%s", self.session_id)
        if self.backend_url and self._registered:
            try:
                _http_json("POST", self.backend_url + "/api/v1/dcc/panel/close", {"sessionId": self.session_id}, timeout=3)
            except Exception:  # noqa: BLE001
                pass
            try:
                _http_json("POST", self.backend_url + "/api/v1/sessions/unregister", {"sessionId": self.session_id}, timeout=3)
            except Exception:  # noqa: BLE001
                pass
            self._registered = False
        if self.server is not None:
            self.server.stop()
        self._maybe_stop_launched_backend()

    def status(self) -> Dict[str, Any]:
        return {
            "sessionId": self.session_id,
            "dccType": self.adapter.dcc_type,
            "dccVersion": self.adapter.version(),
            "mcpPort": self.server.get_port() if self.server else 0,
            "backendUrl": self.backend_url,
            "registered": self._registered,
            "backendLaunchedByUs": self.backend_process is not None,
            "mainWindowHandle": self._main_window_handle,
        }

    def _prewarm_panel(self) -> None:
        def _run() -> None:
            try:
                result = self._panel_action("open")
                if isinstance(result, dict) and result.get("error"):
                    log.warning("prewarm panel failed: %s", result.get("error"))
            except Exception as exc:  # noqa: BLE001
                log.warning("prewarm panel failed: %s", exc)

        thread = threading.Thread(target=_run, name="CherryPanelPrewarm", daemon=True)
        thread.start()

    def open_panel(self) -> Dict[str, Any]:
        return self._show_dock()

    def focus_panel(self) -> Dict[str, Any]:
        return self._show_dock()

    def close_panel(self) -> Dict[str, Any]:
        return self._hide_dock()

    def toggle_panel(self) -> Dict[str, Any]:
        try:
            from . import ui_embed
            visible = bool(self.adapter.run_on_main_thread(ui_embed.is_visible, timeout=8))
        except Exception as exc:  # noqa: BLE001
            log.warning("dock is_visible failed: %s", exc)
            visible = False
        if visible:
            return self._hide_dock()
        return self._show_dock()

    def _hide_dock(self) -> Dict[str, Any]:
        try:
            from . import ui_embed
            return self.adapter.run_on_main_thread(ui_embed.hide, timeout=8) or {"ok": True, "visible": False}
        except Exception as exc:  # noqa: BLE001
            log.warning("hide dock failed: %s", exc)
            return {"ok": True, "visible": False, "warning": str(exc)}

    def _show_dock(self) -> Dict[str, Any]:
        try:
            from . import ui_embed
            result = self.adapter.run_on_main_thread(
                lambda: ui_embed.show(0, self.adapter.dcc_type, session_id=self.session_id),
                timeout=15,
            )
        except Exception as exc:  # noqa: BLE001
            log.warning("show dock failed: %s", exc)
            return {"error": str(exc)}
        thread = threading.Thread(
            target=self._embed_panel_async,
            name="CherryEmbedPanel",
            daemon=True,
        )
        thread.start()
        payload = result if isinstance(result, dict) else {"ok": True}
        payload["embedding"] = True
        return payload

    def _embed_panel_async(self) -> None:
        from . import panel_hwnd
        from . import ui_embed

        try:
            self.adapter.run_on_main_thread(
                lambda: ui_embed.set_status("正在启动 Cherry Agent 面板…"),
                timeout=8,
            )
        except Exception:  # noqa: BLE001
            pass
        spawned = self._panel_action("open")
        if isinstance(spawned, dict) and spawned.get("error"):
            message = str(spawned.get("error"))
            log.error("spawn panel failed: %s", message)
            try:
                self.adapter.run_on_main_thread(lambda: ui_embed.set_status("面板启动失败：%s" % message), timeout=8)
            except Exception:  # noqa: BLE001
                pass
            return
        hwnd = panel_hwnd.wait_hwnd(self.session_id, timeout=40.0, require_live=True)
        if not hwnd:
            try:
                self.adapter.run_on_main_thread(
                    lambda: ui_embed.set_status("面板已启动，但未拿到窗口句柄。请看 ~/.cherrystudio/houdini/logs/panel-*.log"),
                    timeout=8,
                )
            except Exception:  # noqa: BLE001
                pass
            return
        attached = None
        for _ in range(80):
            try:
                attached = self.adapter.run_on_main_thread(
                    lambda: ui_embed.attach_hwnd(hwnd, session_id=self.session_id),
                    timeout=15,
                )
            except Exception as exc:  # noqa: BLE001
                log.warning("notify embed-into failed: %s", exc)
                attached = {"error": str(exc)}
            if isinstance(attached, dict) and attached.get("host") and not attached.get("pending"):
                log.info("asked panel to QWindow.setParent host=%s", attached.get("host"))
                return
            time.sleep(0.5)
        log.warning("embed-into gave up: %s", attached)
        try:
            self.adapter.run_on_main_thread(
                lambda: ui_embed.set_status("嵌入超时：宿主窗口已打开，但 Web 面板没挂上。请关掉再开一次 Agent"),
                timeout=8,
            )
        except Exception:  # noqa: BLE001
            pass

    # ── 注册 / 心跳 ────────────────────────────────────────────────────────────

    def _registration_payload(self) -> Dict[str, Any]:
        return {
            "sessionId": self.session_id,
            "mcpPort": self.server.get_port() if self.server else 0,
            "dccType": self.adapter.dcc_type,
            "dccVersion": self.adapter.version(),
            "dccDisplayName": self.adapter.display_name,
            "pid": os.getpid(),
            "mainWindowHandle": self._main_window_handle,
            "capabilities": self.server.tool_names() if self.server else [],
            "hostname": socket.gethostname(),
            "adapterVersion": ADAPTER_VERSION,
            "startedAt": time.time(),
        }

    def register(self) -> bool:
        if not self.backend_url:
            return False
        try:
            result = _http_json("POST", self.backend_url + "/api/v1/sessions/register", self._registration_payload(), timeout=5)
        except Exception as exc:  # noqa: BLE001
            log.warning("register failed: %s", exc)
            self._registered = False
            return False
        if isinstance(result, dict) and result.get("error"):
            log.warning("register rejected: %s", result.get("error"))
            self._registered = False
            return False
        self._registered = True
        log.info("registered to %s (mcpPort=%s)", self.backend_url, self.server.get_port() if self.server else 0)
        return True

    def _heartbeat_loop(self) -> None:
        failures = 0
        while not self._stop.wait(self.HEARTBEAT_INTERVAL):
            if not self.backend_url:
                self.backend_url = discover_backend_url()
                if self.backend_url:
                    self.register()
                continue
            try:
                result = _http_json(
                    "POST",
                    self.backend_url + "/api/v1/sessions/heartbeat",
                    {"sessionId": self.session_id, "pid": os.getpid()},
                    timeout=5,
                )
                failures = 0
                if isinstance(result, dict) and result.get("registered") is False:
                    log.info("backend forgot us (restart?), re-registering")
                    self.register()
            except urllib.error.HTTPError as exc:
                if exc.code == 404:
                    # 旧版 backend 没有 heartbeat 路由：退回 register 做保活。
                    self.register()
                else:
                    failures += 1
            except Exception:  # noqa: BLE001
                failures += 1
            if failures >= 2:
                log.warning("backend unreachable (%d), rediscovering", failures)
                self._registered = False
                self.backend_url = discover_backend_url()
                failures = 0
                if self.backend_url:
                    self.register()

    def _panel_action(self, action: str) -> Dict[str, Any]:
        if not self.backend_url:
            self.backend_url = discover_backend_url()
            if self.backend_url:
                self.register()
        if not self.backend_url:
            return {"error": "Cherry backend 不可用，请先启动 COCO 客户端"}
        if not self._registered:
            self.register()
        try:
            return _http_json(
                "POST",
                self.backend_url + "/api/v1/dcc/panel/%s" % action,
                {"sessionId": self.session_id, "mainWindowHandle": self._main_window_handle},
                timeout=15,
            )
        except Exception as exc:  # noqa: BLE001
            log.warning("panel %s failed: %s", action, exc)
            return {"error": str(exc)}

    def _maybe_stop_launched_backend(self) -> None:
        proc = self.backend_process
        if proc is None or proc.poll() is not None:
            return
        try:
            sessions = _http_json("GET", self.backend_url + "/api/v1/sessions/list", timeout=3)
            others = [
                sid for sid in (sessions.get("sessions") or {})
                if sid != self.session_id
            ] if isinstance(sessions, dict) else []
        except Exception:  # noqa: BLE001
            others = []
        if others:
            log.info("backend launched by us still serves %d session(s); leaving it running", len(others))
            return
        log.info("terminating backend we launched (pid=%s)", proc.pid)
        try:
            proc.terminate()
            proc.wait(timeout=5)
        except Exception:  # noqa: BLE001
            try:
                proc.kill()
            except Exception:  # noqa: BLE001
                pass


# ── 模块级单例，方便 DCC 菜单直接调用 ───────────────────────────────────────────

_bootstrap: Optional[DccBootstrap] = None
_bootstrap_lock = threading.Lock()


def get_bootstrap() -> Optional[DccBootstrap]:
    return _bootstrap


def start(open_panel: bool = True, launch_backend_if_missing: bool = True, dcc_type: Optional[str] = None) -> Dict[str, Any]:
    """DCC 启动脚本入口。重复调用安全。"""
    global _bootstrap
    with _bootstrap_lock:
        if _bootstrap is None:
            _bootstrap = DccBootstrap(create_adapter(dcc_type))
    return _bootstrap.start(open_panel=open_panel, launch_backend_if_missing=launch_backend_if_missing)


def stop() -> None:
    global _bootstrap
    with _bootstrap_lock:
        boot = _bootstrap
        _bootstrap = None
    if boot is not None:
        boot.stop()


def open_panel() -> Dict[str, Any]:
    if _bootstrap is None:
        start(open_panel=True)
        return _bootstrap.status() if _bootstrap else {"error": "bootstrap failed"}
    return _bootstrap.open_panel()


def toggle_panel() -> Dict[str, Any]:
    if _bootstrap is None:
        return open_panel()
    return _bootstrap.toggle_panel()


def close_panel() -> Dict[str, Any]:
    if _bootstrap is None:
        return {"ok": True}
    return _bootstrap.close_panel()


def status() -> Dict[str, Any]:
    return _bootstrap.status() if _bootstrap is not None else {"started": False}
