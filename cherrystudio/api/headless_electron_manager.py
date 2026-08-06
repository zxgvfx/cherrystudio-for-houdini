"""Lifecycle and transport client for the official v2 Electron main process.

The Qt renderer cannot use Electron's ``ipcRenderer``.  This manager launches
the normal Cherry Studio main process in windowless mode and talks to the
small HTTP bridge in ``web/src/main/headless/httpBridge.ts``.  Business logic
therefore stays in upstream's real ``IpcRouter`` / ``ApiServer`` /
``AiStreamManager`` implementations; Python only owns process lifecycle and
transport adaptation.
"""

from __future__ import annotations

import json
import os
import queue
import shutil
import socket
import subprocess
import threading
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from typing import Any, Callable, Optional

from ..backend.process_manager import pm
from ..utils.logger import network_logger as _log

_CREATE_NO_WINDOW = subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
_START_TIMEOUT = 75.0


def _project_root() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def _web_dir() -> str:
    return os.path.join(_project_root(), "web")


def _headless_log_path() -> str:
    """Where the headless Electron process's own stdout/stderr get captured.

    Previously piped to DEVNULL, which made every bug inside the Node/Electron
    process (AI SDK request failures, uncaught exceptions, etc.) invisible —
    the Python side only ever saw "the request never came back". Uses the same
    `<app_data_dir>/logs` convention as `utils/logger.py` so it sits next to
    the other Houdini-side logs the user already knows how to find.
    """
    try:
        from ..utils.logger import _get_user_log_dir

        log_dir = _get_user_log_dir()
    except Exception:
        import tempfile

        log_dir = None
        try:
            from pathlib import Path

            log_dir = Path(tempfile.gettempdir())
        except Exception:
            pass
    if log_dir is None:
        return os.path.join(_project_root(), "headless-electron.log")
    return str(log_dir / "headless-electron.log")


def _free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def _find_electron() -> Optional[str]:
    override = os.environ.get("CHERRY_ELECTRON_PATH", "").strip()
    candidates = [
        override,
        os.path.join(_web_dir(), "node_modules", "electron", "dist", "electron.exe"),
        os.path.join(_web_dir(), "node_modules", "electron", "dist", "electron"),
        shutil.which("electron") or "",
    ]
    return next((path for path in candidates if path and os.path.isfile(path)), None)


def _find_packaged_app() -> Optional[str]:
    """Locate a self-contained `electron-builder --dir` output (preferred for deploy).

    A raw dev ``web/node_modules`` tree (pnpm store, multi-arch native binaries,
    build-only tooling) is fine for local development but is not something we
    can reasonably ship to a headless deployment (COCO/Houdini) — it is
    several GB and mixes in dev-only deps. ``pnpm run build:unpack``
    (electron-builder
    ``--dir`` target) instead produces a pruned, self-contained app folder
    (``web/dist/win-unpacked`` on Windows) that already embeds Electron itself
    plus only the production-relevant native modules. When present, this is
    launched directly (the app's own executable, no need to pass ``web_dir`` as
    an arg — the packaged app already knows how to find its own ``app.asar``).
    """
    override = os.environ.get("CHERRY_ELECTRON_APP_PATH", "").strip()
    if override and os.path.isfile(override):
        return override

    if os.name == "nt":
        exe_names = ("Cherry Studio.exe",)
    elif os.uname().sysname == "Darwin":  # type: ignore[attr-defined]
        exe_names = ()
    else:
        exe_names = ("cherry-studio", "Cherry Studio")
    unpacked_suffix = "-unpacked"

    web_dir = _web_dir()
    try:
        top_level_entries = sorted(os.listdir(web_dir))
    except OSError:
        return None

    # Normally just "dist" (electron-builder's default `directories.output`),
    # but also accept e.g. "dist_v2" — an alternate output dir used when a
    # stale `dist/` from a previous build is held locked by AV/indexing and a
    # rebuild had to target a fresh directory instead.
    dist_dirs = [
        os.path.join(web_dir, entry)
        for entry in top_level_entries
        if entry == "dist" or entry.startswith("dist_")
    ]
    dist_dirs = [d for d in dist_dirs if os.path.isdir(d)]
    # Most-recently-modified first, so a fresh "dist_v2" rebuild wins over a
    # stale "dist" left behind by a previous build that got stuck locked.
    dist_dirs.sort(key=lambda d: -os.path.getmtime(d))

    for dist_dir in dist_dirs:
        try:
            entries = sorted(os.listdir(dist_dir))
        except OSError:
            continue
        for entry in entries:
            if not entry.endswith(unpacked_suffix):
                continue
            unpacked_dir = os.path.join(dist_dir, entry)
            if not os.path.isdir(unpacked_dir):
                continue
            if os.name == "nt":
                for exe_name in exe_names:
                    candidate = os.path.join(unpacked_dir, exe_name)
                    if os.path.isfile(candidate):
                        return candidate
            else:
                # macOS: <name>.app/Contents/MacOS/<name>; Linux: bare executable.
                for name in os.listdir(unpacked_dir):
                    if name.endswith(".app"):
                        mac_exe_dir = os.path.join(unpacked_dir, name, "Contents", "MacOS")
                        if os.path.isdir(mac_exe_dir):
                            for exe_name in os.listdir(mac_exe_dir):
                                candidate = os.path.join(mac_exe_dir, exe_name)
                                if os.path.isfile(candidate) and os.access(candidate, os.X_OK):
                                    return candidate
                for exe_name in exe_names:
                    candidate = os.path.join(unpacked_dir, exe_name)
                    if os.path.isfile(candidate) and os.access(candidate, os.X_OK):
                        return candidate
    return None


class HeadlessEventBroker:
    """Fan-out queue used by the Python backend's browser-facing SSE route."""

    _instance: Optional["HeadlessEventBroker"] = None
    _instance_lock = threading.Lock()

    @classmethod
    def instance(cls) -> "HeadlessEventBroker":
        with cls._instance_lock:
            if cls._instance is None:
                cls._instance = cls()
            return cls._instance

    def __init__(self) -> None:
        self._subscribers: set[queue.Queue] = set()
        self._lock = threading.Lock()

    def subscribe(self) -> queue.Queue:
        subscriber: queue.Queue = queue.Queue(maxsize=2048)
        with self._lock:
            self._subscribers.add(subscriber)
        return subscriber

    def unsubscribe(self, subscriber: queue.Queue) -> None:
        with self._lock:
            self._subscribers.discard(subscriber)

    def publish(self, event: str, payload: Any) -> None:
        item = {"event": event, "payload": payload}
        with self._lock:
            subscribers = list(self._subscribers)
        for subscriber in subscribers:
            try:
                subscriber.put_nowait(item)
            except queue.Full:
                try:
                    subscriber.get_nowait()
                    subscriber.put_nowait(item)
                except (queue.Empty, queue.Full):
                    pass


@dataclass
class _StreamConnection:
    topic_id: str
    listener_id: str = ""
    response: Any = None
    stopped: bool = False

    def close(self) -> None:
        self.stopped = True
        if self.response is not None:
            try:
                self.response.close()
            except Exception:
                pass


class HeadlessElectronManager:
    """Singleton subprocess manager plus HTTP/SSE transport."""

    _instance: Optional["HeadlessElectronManager"] = None
    _instance_lock = threading.Lock()

    @classmethod
    def instance(cls) -> "HeadlessElectronManager":
        with cls._instance_lock:
            if cls._instance is None:
                cls._instance = cls()
            return cls._instance

    def __init__(self) -> None:
        self._proc: Optional[subprocess.Popen] = None
        self._log_file = None
        self._port = 0
        self._lock = threading.RLock()
        self._desired_running = False
        self._event_stop = threading.Event()
        self._event_ready = threading.Event()
        self._event_thread: Optional[threading.Thread] = None
        self._streams: dict[str, _StreamConnection] = {}
        self._python_backend_url = ""

    @property
    def base_url(self) -> str:
        return f"http://127.0.0.1:{self._port}" if self._port else ""

    def is_running(self) -> bool:
        return bool(self._proc and self._proc.poll() is None and self._port)

    def set_python_backend_url(self, url: str) -> None:
        """Pin the exact embedded backend for this DCC instance.

        Port-file discovery is only a fallback: several Houdini/Maya instances
        may be alive simultaneously and scanning could select a sibling.
        """
        self._python_backend_url = (url or "").rstrip("/")

    def start(self) -> tuple[bool, str]:
        with self._lock:
            self._desired_running = True
            if self.is_running() and self._healthcheck():
                self._ensure_event_subscription()
                return True, self.base_url

            web_dir = _web_dir()
            packaged_app = _find_packaged_app()
            if packaged_app:
                launch_cmd = [packaged_app]
                launch_cwd = os.path.dirname(packaged_app)
            else:
                electron = _find_electron()
                main_js = os.path.join(web_dir, "out", "main", "main.js")
                if not electron:
                    return False, (
                        "Electron executable not found; either run "
                        "`pnpm run build:unpack` in web/ and deploy web/dist/*-unpacked, "
                        "or run pnpm install in web/ for a dev checkout"
                    )
                if not os.path.isfile(main_js):
                    return False, "Electron main bundle not found; run pnpm build in web/"
                launch_cmd = [electron, web_dir]
                launch_cwd = web_dir

            self._stop_process_locked()
            self._port = _free_port()
            env = os.environ.copy()
            for key in ("PYTHONHOME", "PYTHONPATH", "ELECTRON_RUN_AS_NODE", "NODE_OPTIONS"):
                env.pop(key, None)
            env.update(
                {
                    "CHERRY_HEADLESS": "1",
                    "CHERRY_HEADLESS_PORT": str(self._port),
                    # Persistent and isolated from a concurrently running desktop app.
                    "CS_DEV_USER_DATA_SUFFIX": env.get(
                        "CHERRY_HEADLESS_USER_DATA_SUFFIX", "HoudiniHeadless"
                    ),
                }
            )
            try:
                from ..backend.service_runner import read_backend_url

                env["CHERRY_STUDIO_BACKEND_URL"] = (
                    self._python_backend_url or read_backend_url() or ""
                )
            except Exception:
                env["CHERRY_STUDIO_BACKEND_URL"] = self._python_backend_url

            # Centralized config (NewApi provisioning, shared providers/MCP
            # servers) — same env var / default resource path convention as
            # cherrystudio/core/config_manager.py, so the headless Electron
            # process can seed the identical provider/model set into its own
            # DB. See web/src/main/data/centralizedConfig/centralizedConfigSync.ts.
            if not env.get("CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH"):
                default_config_path = os.path.abspath(
                    os.path.join(
                        os.path.dirname(__file__), "..", "resources", "centralized-config.json"
                    )
                )
                if os.path.isfile(default_config_path):
                    env["CHERRY_STUDIO_CENTRALIZED_CONFIG_PATH"] = default_config_path
            log_path = _headless_log_path()
            try:
                # Truncated per-start (not appended): this is a live debugging
                # aid for "what did the Electron process actually do just now",
                # not a persistent audit log. Keep the handle open for the
                # process's lifetime; closed in `_stop_process_locked`.
                log_file = open(log_path, "w", encoding="utf-8", errors="replace")
                log_file.write(f"=== headless electron started {time.strftime('%Y-%m-%d %H:%M:%S')} ===\n")
                log_file.flush()
            except Exception as exc:
                _log(f"[HeadlessElectron] failed to open log file {log_path}: {exc}")
                log_file = None
            self._log_file = log_file
            try:
                self._proc = subprocess.Popen(
                    launch_cmd,
                    cwd=launch_cwd,
                    env=env,
                    stdout=(log_file or subprocess.DEVNULL),
                    stderr=(log_file or subprocess.DEVNULL),
                    creationflags=_CREATE_NO_WINDOW,
                )
                pm.register(self._proc, "headless-electron-v2")
            except Exception as exc:
                self._proc = None
                self._port = 0
                if log_file:
                    try:
                        log_file.close()
                    except Exception:
                        pass
                    self._log_file = None
                return False, f"Failed to launch Electron: {exc}"
            else:
                _log(f"[HeadlessElectron] stdout/stderr captured to {log_path}")

        deadline = time.monotonic() + _START_TIMEOUT
        while time.monotonic() < deadline:
            if self._proc and self._proc.poll() is not None:
                code = self._proc.returncode
                self.stop()
                return False, f"Headless Electron exited during startup (code {code})"
            if self._healthcheck():
                self._ensure_event_subscription()
                self._event_ready.wait(timeout=5)
                _log(f"[HeadlessElectron] Ready at {self.base_url}")
                return True, self.base_url
            time.sleep(0.25)

        self.stop()
        return False, "Headless Electron startup timed out"

    def ensure_running(self) -> None:
        if self.is_running() and self._healthcheck():
            return
        ok, message = self.start()
        if not ok:
            raise RuntimeError(message)

    def restart(self) -> tuple[bool, str]:
        self.stop()
        return self.start()

    def stop(self) -> None:
        with self._lock:
            self._desired_running = False
            self._event_stop.set()
            for stream in list(self._streams.values()):
                stream.close()
            self._streams.clear()
            self._stop_process_locked()

    def _stop_process_locked(self) -> None:
        proc, self._proc = self._proc, None
        self._port = 0
        log_file, self._log_file = self._log_file, None
        if log_file:
            try:
                log_file.close()
            except Exception:
                pass
        if not proc:
            return
        try:
            if proc.poll() is None:
                proc.terminate()
                try:
                    proc.wait(timeout=8)
                except subprocess.TimeoutExpired:
                    proc.kill()
        except Exception as exc:
            _log(f"[HeadlessElectron] stop error: {exc}")
        finally:
            pm.unregister(proc)

    def _healthcheck(self) -> bool:
        if not self.base_url:
            return False
        try:
            result = self._request_once("/healthz", None, method="GET", timeout=2)
            return result.get("ok") is True
        except Exception:
            return False

    def request(self, endpoint: str, body: Optional[dict], timeout: float = 60) -> dict:
        self.ensure_running()
        try:
            return self._request_once(endpoint, body, timeout=timeout)
        except (OSError, urllib.error.URLError):
            ok, message = self.restart()
            if not ok:
                raise RuntimeError(message)
            return self._request_once(endpoint, body, timeout=timeout)

    def _request_once(
        self,
        endpoint: str,
        body: Optional[dict],
        method: str = "POST",
        timeout: float = 60,
    ) -> dict:
        data = None if body is None else json.dumps(body).encode("utf-8")
        request = urllib.request.Request(
            f"{self.base_url}{endpoint}", data=data, method=method
        )
        if data is not None:
            request.add_header("Content-Type", "application/json")
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        with opener.open(request, timeout=timeout) as response:
            raw = response.read().decode("utf-8")
        return json.loads(raw) if raw else {}

    # ── Global event relay: Electron /events -> Python broker -> browser SSE ──

    def _ensure_event_subscription(self) -> None:
        if self._event_thread and self._event_thread.is_alive():
            return
        self._event_stop.clear()
        self._event_ready.clear()
        self._event_thread = threading.Thread(
            target=self._event_loop, name="HeadlessElectronEvents", daemon=True
        )
        self._event_thread.start()

    def _event_loop(self) -> None:
        while not self._event_stop.is_set():
            try:
                request = urllib.request.Request(f"{self.base_url}/events", method="GET")
                opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
                with opener.open(request, timeout=90) as response:
                    self._event_ready.set()
                    for raw_line in iter(response.readline, b""):
                        if self._event_stop.is_set():
                            return
                        line = raw_line.decode("utf-8", errors="replace").strip()
                        if not line.startswith("data:"):
                            continue
                        item = json.loads(line[5:].strip())
                        if isinstance(item, dict) and item.get("event"):
                            HeadlessEventBroker.instance().publish(
                                str(item["event"]), item.get("payload")
                            )
            except Exception as exc:
                self._event_ready.clear()
                if not self._event_stop.is_set():
                    _log(f"[HeadlessElectron] event SSE reconnecting: {exc}")
                    if self._desired_running and (
                        self._proc is None or self._proc.poll() is not None
                    ):
                        ok, message = self.start()
                        if not ok:
                            _log(f"[HeadlessElectron] automatic restart failed: {message}")
                    self._event_stop.wait(1.0)

    # ── ai.stream.* control connections ─────────────────────────────

    def open_ai_stream(self, request: dict) -> Any:
        return self._start_stream("/ai-stream/open", request, "open-result")

    def attach_ai_stream(self, request: dict) -> Any:
        return self._start_stream("/ai-stream/attach", request, "attach-result")

    def detach_ai_stream(self, topic_id: str) -> None:
        with self._lock:
            connection = self._streams.pop(topic_id, None)
        if not connection:
            return
        if connection.listener_id:
            try:
                self.request(
                    "/ai-stream/detach",
                    {"topicId": topic_id, "listenerId": connection.listener_id},
                )
            finally:
                connection.close()
        else:
            connection.close()

    def abort_ai_stream(self, topic_id: str) -> None:
        self.request("/ai-stream/abort", {"topicId": topic_id})

    def _start_stream(self, endpoint: str, body: dict, control_type: str) -> Any:
        self.ensure_running()
        topic_id = str(body.get("topicId") or "")
        if not topic_id:
            raise ValueError("Missing topicId")
        self.detach_ai_stream(topic_id)

        ready = threading.Event()
        outcome: dict[str, Any] = {}
        connection = _StreamConnection(topic_id=topic_id)
        with self._lock:
            self._streams[topic_id] = connection

        def run() -> None:
            try:
                data = json.dumps(body).encode("utf-8")
                request = urllib.request.Request(
                    f"{self.base_url}{endpoint}", data=data, method="POST"
                )
                request.add_header("Content-Type", "application/json")
                opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
                with opener.open(request, timeout=3600) as response:
                    connection.response = response
                    for raw_line in iter(response.readline, b""):
                        if connection.stopped:
                            break
                        line = raw_line.decode("utf-8", errors="replace").strip()
                        if not line.startswith("data:"):
                            continue
                        item = json.loads(line[5:].strip())
                        if item.get("type") == control_type:
                            connection.listener_id = str(item.get("listenerId") or "")
                            outcome["result"] = item.get("result")
                            ready.set()
                        elif item.get("type") == "error":
                            outcome["error"] = str(item.get("result") or "stream error")
                            ready.set()
            except Exception as exc:
                outcome["error"] = str(exc)
                ready.set()
            finally:
                with self._lock:
                    if self._streams.get(topic_id) is connection:
                        self._streams.pop(topic_id, None)

        threading.Thread(
            target=run, name=f"HeadlessAiStream:{topic_id}", daemon=True
        ).start()
        if not ready.wait(timeout=60):
            connection.close()
            raise TimeoutError(f"{control_type} timed out")
        if "error" in outcome:
            connection.close()
            raise RuntimeError(outcome["error"])
        return outcome.get("result")


def get_headless_electron_manager() -> HeadlessElectronManager:
    return HeadlessElectronManager.instance()
