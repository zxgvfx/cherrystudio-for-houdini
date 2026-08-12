"""
Node.js Agent Runtime sidecar 进程管理器 (Phase 1 + Phase 2)

负责启动/健康检查/停止 ``cherrystudio/agent-runtime/`` 里的 Node.js sidecar
(真实的 ``@anthropic-ai/claude-agent-sdk``)。对外暴露与旧版纯 Python
``AgentServer`` (见 ``agent_server.py``) 完全相同的接口
(``start`` / ``stop`` / ``is_running`` / ``get_port``)，因此
``cherry_studio_api.py`` 只需替换实例化的类即可切换实现，无需改动
``apiServerStart/Stop/Restart/agentApiProxy`` 的业务逻辑。

Node.js 查找策略：
  1. ``CHERRY_STUDIO_AGENT_NODE`` 显式指定的解释器；
  2. 已安装的 LTS（偶数主版本）Node，优先较新的版本；
  3. ``~/.cherrystudio/bin/node(.exe)`` 或系统 PATH 中的任意 Node。

首次使用时，如果 ``agent-runtime/node_modules`` 不存在，会自动执行
``npm install --omit=dev`` 安装依赖（包含
``@anthropic-ai/claude-agent-sdk`` / ``better-sqlite3`` / ``express`` 等）。

npm 总是通过被选中的那个 ``node_path`` 解释器执行(``node npm-cli.js ...``)，
而不是直接跑系统里另一个版本的 ``npm``/``npm.cmd``。这是因为 ``better-sqlite3``
等原生模块的预编译二进制/node-gyp 编译目标由「实际运行 npm 的那个 Node 进程」
的 ABI (``process.versions.modules``) 决定 —— 如果机器上同时装了多个不同大版本
的 Node(例如 ``~/.cherrystudio/bin/node.exe`` 和系统 PATH 里的 ``node``),
用错误的 Node 版本装的依赖在用另一个版本启动时会报
``NODE_MODULE_VERSION`` 不匹配。``start()`` 在检测到这种情况时也会自动
``npm rebuild`` 一次并重试。
"""

import os
import re
import shutil
import subprocess
import threading
import time

from ..core.paths import get_app_data_dir, get_bin_dir

try:
    from ..backend.process_manager import pm as _pm
except Exception:  # pragma: no cover - defensive against alternate import contexts
    _pm = None

try:
    from ..utils.logger import network_logger as _log
except Exception:  # pragma: no cover
    _log = print

_CREATE_NO_WINDOW = subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
_READY_RE = re.compile(r"AGENT_RUNTIME_READY\s+port=(\d+)")
_ABI_MISMATCH_RE = re.compile(r"NODE_MODULE_VERSION")


def _agent_runtime_dir() -> str:
    """``cherrystudio/agent-runtime/`` — sibling of the ``api`` package."""
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "agent-runtime"))


def _node_major_version(node_path: str) -> int | None:
    """Returns a Node executable's major version without importing any addon."""
    try:
        result = subprocess.run(
            [node_path, "--version"],
            capture_output=True,
            text=True,
            timeout=5,
            creationflags=_CREATE_NO_WINDOW,
        )
        if result.returncode != 0:
            return None
        return int((result.stdout or "").strip().lstrip("v").split(".", 1)[0])
    except (OSError, ValueError, subprocess.SubprocessError):
        return None


def _find_node() -> str | None:
    override = os.environ.get("CHERRY_STUDIO_AGENT_NODE", "").strip()
    if override and os.path.isfile(override):
        return override

    ext = ".exe" if os.name == "nt" else ""
    candidates = [
        os.path.join(get_bin_dir(), f"node{ext}"),
        shutil.which("node") or "",
    ]
    if os.name == "nt":
        for root in (os.environ.get("ProgramW6432"), os.environ.get("ProgramFiles"), r"C:\Program Files"):
            if root:
                candidates.append(os.path.join(root, "nodejs", "node.exe"))

    unique_candidates = []
    seen = set()
    for candidate in candidates:
        if not candidate or not os.path.isfile(candidate):
            continue
        normalized = os.path.normcase(os.path.abspath(candidate))
        if normalized not in seen:
            seen.add(normalized)
            unique_candidates.append(candidate)

    # Native dependencies such as better-sqlite3 are distributed and tested
    # against supported LTS releases. Prefer an even-major Node (22 over the
    # bundled v25 in this installation) rather than starting with an ABI that
    # cannot load the existing native addon.
    lts_candidates = [
        (major, candidate)
        for candidate in unique_candidates
        if (major := _node_major_version(candidate)) is not None and major >= 18 and major % 2 == 0
    ]
    if lts_candidates:
        return max(lts_candidates, key=lambda item: item[0])[1]
    return unique_candidates[0] if unique_candidates else None


def _find_npm_cli_js(node_path: str | None) -> str | None:
    """Locate npm's ``npm-cli.js`` entry script.

    Always invoked as ``<node_path> <npm_cli_js> ...`` (see module docstring)
    so npm's own Node.js process — and therefore any native module build it
    triggers — matches the exact ``node_path`` binary that will run the
    sidecar, regardless of which npm happens to be discovered.
    """
    override = os.environ.get("CHERRY_STUDIO_AGENT_NPM_CLI", "").strip()
    if override and os.path.isfile(override):
        return override

    candidates = []
    if node_path:
        node_dir = os.path.dirname(node_path)
        candidates.append(os.path.join(node_dir, "node_modules", "npm", "bin", "npm-cli.js"))

    system_npm = shutil.which("npm")
    if system_npm:
        npm_dir = os.path.dirname(os.path.realpath(system_npm))
        candidates.append(os.path.join(npm_dir, "node_modules", "npm", "bin", "npm-cli.js"))
        candidates.append(os.path.join(npm_dir, "npm-cli.js"))
        # Global npm installs on Windows often live one level up from the shim.
        candidates.append(os.path.join(os.path.dirname(npm_dir), "npm", "bin", "npm-cli.js"))

    for c in candidates:
        if os.path.isfile(c):
            return c
    return None


def _npm_env(node_path: str) -> dict:
    """Builds the environment for npm/node-gyp child processes.

    Root cause of a very persistent ABI mismatch bug: passing ``node_path``
    as argv[0] only controls which binary runs the *top-level* ``npm-cli.js``
    process. npm's install/rebuild lifecycle re-spawns further subprocesses
    (most importantly ``node-gyp``, invoked via a shebang/shim script) that
    resolve the ``node`` executable via ``PATH`` rather than reusing
    ``process.execPath``. If the machine also has a *different* Node.js
    installed system-wide (e.g. ``C:\\Program Files\\nodejs``) and it sits
    earlier on ``PATH`` than ``node_path``'s directory, node-gyp silently
    downloads/targets *that* Node version's headers/import-lib — producing a
    native binary whose baked-in ``NODE_MODULE_VERSION`` matches the wrong
    Node, even though we explicitly ran npm with the *correct* ``node_path``.
    Prepending ``node_path``'s directory to ``PATH`` makes every such
    PATH-based lookup resolve back to the same interpreter that will
    eventually load the built module.
    """
    env = os.environ.copy()
    env.pop("NODE_OPTIONS", None)
    node_dir = os.path.dirname(node_path)
    if node_dir:
        env["PATH"] = node_dir + os.pathsep + env.get("PATH", "")
    return env


def _run_npm(node_path: str, npm_cli_js: str, args: list[str], cwd: str, timeout: int = 600) -> subprocess.CompletedProcess:
    return subprocess.run(
        [node_path, npm_cli_js, *args],
        cwd=cwd,
        capture_output=True,
        text=True,
        timeout=timeout,
        creationflags=_CREATE_NO_WINDOW,
        env=_npm_env(node_path),
    )


def _get_backend_url() -> str:
    """Discovers the already-running in-process backend HTTP service URL.

    Centralized gateway providers (``coco-vapi`` and friends, ``apiKeyMode:
    "per-user-provisioned"``) don't carry a usable API key in
    ``centralized-config.json`` or ``localStorage.json`` — the *real*,
    per-user key only exists in the OS keyring (see
    ``core/newapi_provisioning.py``), which only Python can read. Rather than
    reimplementing keyring access in Node, the sidecar calls back into this
    same-machine backend's ``GET /api/v1/config/merged`` (already used by the
    frontend to get provisioned providers) to resolve those. Returns ``""``
    if the backend isn't discoverable yet (sidecar falls back to the raw,
    unprovisioned centralized config in that case).
    """
    try:
        from ..backend.service_runner import read_backend_url
        return read_backend_url() or ""
    except Exception as e:
        _log(f"[AgentRuntime] read_backend_url() failed: {e}")
        return ""


def _normalize_no_proxy(raw: str) -> str:
    """Same normalization as ``backend/routes/openclaw.py``'s helper of the
    same name (kept as a small local copy to avoid import-time coupling to
    a route module) — converts Cherry Studio's bypass-rule syntax (``*.foo``,
    ``192.168.*.*``) into the ``NO_PROXY``-standard forms that Node's HTTP
    libraries understand (exact host, or a leading-dot subdomain match).
    """
    parts = [p.strip() for p in raw.replace(";", ",").split(",") if p.strip()]
    result = []
    for p in parts:
        if "*" not in p:
            result.append(p)
            continue
        if p.startswith("*."):
            result.append(p[1:])
            continue
        if p == "*":
            result.append("*")
            continue
        prefix = p.split("*")[0].rstrip(".")
        if prefix:
            result.append(prefix)
    return ",".join(result)


def _get_proxy_env() -> dict:
    """Reads Cherry Studio's configured proxy (``core.secure_config``) and
    returns it as standard ``HTTP_PROXY``/``HTTPS_PROXY``/``NO_PROXY`` env
    vars, mirroring ``backend/routes/openclaw.py``'s ``_build_env(with_proxy=True)``.

    Needed because the Houdini host machine may have no direct internet
    access at all (offline/sandboxed network) and relies entirely on this
    app-configured proxy — unlike the official Electron app, nothing here
    guarantees ``HTTP_PROXY``/``HTTPS_PROXY`` are already present in the
    Houdini process's OS environment, so without this the Claude Agent SDK
    subprocess (and any tool it runs) has no route to the internet at all.
    """
    env = {}
    try:
        from ..core.secure_config import get_secure_proxy
        cfg = get_secure_proxy()
    except Exception as e:
        _log(f"[AgentRuntime] get_secure_proxy() failed: {e}")
        return env

    proxy_url = (cfg or {}).get("proxyUrl", "")
    bypass = (cfg or {}).get("bypassRules", "")
    if bypass:
        env["CHERRY_PROXY_BYPASS_RULES"] = bypass
    if proxy_url:
        env["HTTP_PROXY"] = proxy_url
        env["HTTPS_PROXY"] = proxy_url
        env["http_proxy"] = proxy_url
        env["https_proxy"] = proxy_url
    if bypass:
        no_proxy = _normalize_no_proxy(bypass)
        env["NO_PROXY"] = no_proxy
        env["no_proxy"] = no_proxy
    return env


def _proxy_bootstrap_path() -> str:
    return os.path.join(_agent_runtime_dir(), "lib", "proxyBootstrap.js")


def _append_node_proxy_bootstrap(env: dict) -> None:
    """Node / Claude CLI ignore NO_PROXY on Windows — preload proxyBootstrap.js."""
    if not env.get("HTTP_PROXY") and not env.get("HTTPS_PROXY"):
        return
    bootstrap = _proxy_bootstrap_path()
    if not os.path.isfile(bootstrap):
        _log(f"[AgentRuntime] proxy bootstrap missing: {bootstrap}")
        return
    bp = bootstrap.replace("\\", "/")
    flag = f'--require "{bp}"'
    existing = (env.get("NODE_OPTIONS") or "").strip()
    if flag in existing:
        return
    env["NODE_OPTIONS"] = f"{existing} {flag}".strip() if existing else flag


def _build_env(port: int, app_data_dir: str, agent_runtime_home: str, api_key: str = "") -> dict:
    env = os.environ.copy()
    for k in ("PYTHONPATH", "PYTHONHOME", "NODE_OPTIONS",
              "HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy",
              "ALL_PROXY", "all_proxy", "NO_PROXY", "no_proxy"):
        env.pop(k, None)
    if os.path.isdir(get_bin_dir()):
        env["PATH"] = get_bin_dir() + os.pathsep + env.get("PATH", "")
    env["PORT"] = str(port)
    env["APP_DATA_DIR"] = app_data_dir
    env["AGENT_RUNTIME_HOME"] = agent_runtime_home
    env["API_KEY"] = api_key or ""
    env["CHERRY_STUDIO_BACKEND_URL"] = _get_backend_url()
    env.update(_get_proxy_env())
    _append_node_proxy_bootstrap(env)
    return env


def is_node_available() -> bool:
    return _find_node() is not None


def ensure_dependencies_installed(log_fn=None, node_path: str | None = None) -> tuple[bool, str]:
    """Runs ``npm install`` in ``agent-runtime/`` if ``node_modules`` is missing,
    then proactively verifies native addons (better-sqlite3) actually load
    under ``node_path`` — rebuilding once if there's an ABI mismatch.

    Checking (and, if needed, fixing) the native module *before* spawning
    ``server.js`` avoids wasting a full 30s boot-timeout on a binary we
    already know is broken.

    Returns ``(success, message)``.
    """
    log_fn = log_fn or _log
    runtime_dir = _agent_runtime_dir()
    node_modules = os.path.join(runtime_dir, "node_modules")
    marker = os.path.join(node_modules, "@anthropic-ai", "claude-agent-sdk")

    node_path = node_path or _find_node()
    if not node_path:
        return False, "Node.js not found (install it first, e.g. via the OpenClaw setup flow)"

    if not os.path.isdir(marker):
        npm_cli_js = _find_npm_cli_js(node_path)
        if not npm_cli_js:
            return False, "npm not found (no bundled or system npm-cli.js available)"

        log_fn(f"[AgentRuntime] Installing sidecar dependencies via {node_path} (this may take a minute)...")
        try:
            result = _run_npm(node_path, npm_cli_js, ["install", "--omit=dev", "--no-audit", "--no-fund"], runtime_dir)
        except Exception as e:
            return False, f"npm install failed to run: {e}"

        if result.returncode != 0:
            tail = "\n".join((result.stderr or result.stdout or "").splitlines()[-40:])
            return False, f"npm install exited with code {result.returncode}:\n{tail}"

        log_fn("[AgentRuntime] Dependencies installed successfully")

    if not _verify_native_modules(node_path, runtime_dir):
        log_fn(f"[AgentRuntime] Native module ABI mismatch detected for {node_path}, rebuilding...")
        ok, msg = _rebuild_native_modules(node_path, log_fn)
        if not ok:
            return False, msg

    return True, "ready"


def _remove_stale_native_builds(runtime_dir: str, log_fn) -> None:
    """Deletes prebuilt ``.node`` binaries under ``node_modules/*/build/Release``.

    ``npm rebuild`` treats an existing ``build/Release/*.node`` as "already
    built" and silently no-ops instead of re-running ``prebuild-install`` /
    ``node-gyp``, even with ``--build-from-source``. Removing the stale
    binary first forces a real rebuild/redownload targeting the current
    Node ABI.
    """
    node_modules = os.path.join(runtime_dir, "node_modules")
    if not os.path.isdir(node_modules):
        return

    pkg_dirs = []
    for entry in os.listdir(node_modules):
        full = os.path.join(node_modules, entry)
        if entry.startswith("@") and os.path.isdir(full):
            pkg_dirs.extend(os.path.join(full, sub) for sub in os.listdir(full))
        else:
            pkg_dirs.append(full)

    for pkg_dir in pkg_dirs:
        release_dir = os.path.join(pkg_dir, "build", "Release")
        if not os.path.isdir(release_dir):
            continue
        for fname in os.listdir(release_dir):
            if fname.endswith(".node"):
                target = os.path.join(release_dir, fname)
                try:
                    os.remove(target)
                    log_fn(f"[AgentRuntime] Removed stale native binary: {target}")
                except Exception:
                    pass


def _verify_native_modules(node_path: str, runtime_dir: str) -> bool:
    """Actually loads better-sqlite3 under ``node_path`` to confirm the ABI
    matches. ``npm rebuild`` can report success (exit code 0) via
    ``prebuild-install`` slightly before the downloaded binary is fully
    flushed/visible on disk (seen in practice behind slow/proxied
    registries), so callers should verify rather than trust the exit code
    alone.
    """
    try:
        result = subprocess.run(
            [node_path, "-e", "require('better-sqlite3')"],
            cwd=runtime_dir,
            capture_output=True,
            text=True,
            timeout=15,
            creationflags=_CREATE_NO_WINDOW,
        )
        return result.returncode == 0
    except Exception:
        return False


def _rebuild_native_modules(node_path: str, log_fn=None) -> tuple[bool, str]:
    """Recompiles/re-downloads native addons (e.g. better-sqlite3) targeting
    ``node_path``'s ABI. Used as a self-heal when ``start()`` detects a
    ``NODE_MODULE_VERSION`` mismatch at boot.
    """
    log_fn = log_fn or _log
    runtime_dir = _agent_runtime_dir()
    npm_cli_js = _find_npm_cli_js(node_path)
    if not npm_cli_js:
        return False, "npm not found for rebuild"

    log_fn(f"[AgentRuntime] Rebuilding native modules for {node_path} ...")
    _remove_stale_native_builds(runtime_dir, log_fn)
    try:
        result = _run_npm(node_path, npm_cli_js, ["rebuild", "--build-from-source"], runtime_dir, timeout=300)
    except Exception as e:
        return False, f"npm rebuild failed to run: {e}"

    if result.returncode != 0:
        tail = "\n".join((result.stderr or result.stdout or "").splitlines()[-40:])
        return False, f"npm rebuild exited with code {result.returncode}:\n{tail}"

    for attempt, delay in enumerate((0.5, 1.5, 3.0), start=1):
        if _verify_native_modules(node_path, runtime_dir):
            return True, "rebuilt"
        log_fn(f"[AgentRuntime] Native module verification failed after rebuild (attempt {attempt}), retrying...")
        time.sleep(delay)

    return False, "npm rebuild reported success but native module still fails to load"


class NodeAgentRuntime:
    """Manages the Node.js agent-runtime sidecar subprocess.

    Duck-type compatible with the legacy ``AgentServer`` (``start`` /
    ``stop`` / ``is_running`` / ``get_port``) so callers can swap
    implementations without touching call sites.
    """

    def __init__(self, providers_loader=None, api_key: str = ""):
        # providers_loader kept only for interface compatibility with the
        # legacy AgentServer — the sidecar reads providers directly from
        # `localStorage.json` (see lib/providerResolver.js) since it can't
        # call back into the Python providers_loader callback.
        self._providers_loader = providers_loader
        self._api_key = api_key
        self._proc: subprocess.Popen | None = None
        self._port = 0
        self._lock = threading.Lock()

    def start(self, host: str = "127.0.0.1", port: int = 0) -> tuple[bool, int]:
        with self._lock:
            if self._proc and self._proc.poll() is None:
                return True, self._port

            node_path = _find_node()
            if not node_path:
                _log("[AgentRuntime] Node.js not found; cannot start sidecar")
                return False, 0

            ok, msg = ensure_dependencies_installed(node_path=node_path)
            if not ok:
                _log(f"[AgentRuntime] Dependency install failed: {msg}")
                return False, 0

            # Retry a few times on ABI mismatch: some environments (seen with
            # AV/EDR file filtering + mixed Node installs) can serve a stale
            # native binary to the *first* child process spawned right after
            # a rebuild even though a standalone verification passes, but
            # settle down on a subsequent attempt.
            max_attempts = 3
            for attempt in range(1, max_attempts + 1):
                ok, result = self._spawn_and_wait(node_path, port)
                if ok:
                    return True, result

                if result != "abi_mismatch" or attempt == max_attempts:
                    break

                _log(f"[AgentRuntime] ABI mismatch on attempt {attempt}/{max_attempts}, rebuilding and retrying...")
                rebuilt, rebuild_msg = _rebuild_native_modules(node_path)
                if not rebuilt:
                    _log(f"[AgentRuntime] Native module rebuild failed: {rebuild_msg}")
                    break
                time.sleep(1.5)

            return False, 0

    def _spawn_and_wait(self, node_path: str, port: int):
        """Spawns the sidecar and waits for readiness.

        Returns ``(True, actual_port)`` on success, or ``(False, reason)``
        where ``reason`` is ``"abi_mismatch"``, ``"early_exit"``, or
        ``"timeout"``.
        """
        runtime_dir = _agent_runtime_dir()
        app_data_dir = get_app_data_dir()
        agent_runtime_home = os.path.join(app_data_dir, "agent-runtime")
        os.makedirs(agent_runtime_home, exist_ok=True)

        env = _build_env(port, app_data_dir, agent_runtime_home, self._api_key)
        server_js = os.path.join(runtime_dir, "server.js")

        try:
            proc = subprocess.Popen(
                [node_path, server_js],
                cwd=runtime_dir,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env=env,
                creationflags=_CREATE_NO_WINDOW,
            )
        except Exception as e:
            _log(f"[AgentRuntime] Failed to spawn sidecar: {e}")
            return False, "early_exit"

        self._proc = proc
        if _pm:
            _pm.register(proc, "agent-runtime-sidecar")

        ready_event = threading.Event()
        captured_port = {"value": 0}
        stderr_tail: list[str] = []

        def _drain(stream, label):
            try:
                for raw_line in iter(stream.readline, b""):
                    line = raw_line.decode(errors="replace").rstrip()
                    if line:
                        _log(f"[AgentRuntime {label}] {line}")
                        if label == "err":
                            stderr_tail.append(line)
                    m = _READY_RE.search(line)
                    if m:
                        captured_port["value"] = int(m.group(1))
                        ready_event.set()
            except Exception:
                pass

        threading.Thread(target=_drain, args=(proc.stdout, "out"), daemon=True).start()
        threading.Thread(target=_drain, args=(proc.stderr, "err"), daemon=True).start()

        ready = ready_event.wait(timeout=30)
        if proc.poll() is not None:
            self._proc = None
            reason = "abi_mismatch" if any(_ABI_MISMATCH_RE.search(l) for l in stderr_tail) else "early_exit"
            _log(f"[AgentRuntime] Sidecar exited early with code {proc.returncode} ({reason})")
            return False, reason
        if not ready:
            _log("[AgentRuntime] Sidecar start timed out (30s)")
            self.stop()
            return False, "timeout"

        self._port = captured_port["value"]
        _log(f"[AgentRuntime] Sidecar running on port {self._port}")
        return True, self._port

    def is_running(self) -> bool:
        return bool(self._proc and self._proc.poll() is None)

    def get_port(self) -> int:
        return self._port

    def stop(self):
        with self._lock:
            proc, self._proc = self._proc, None
            self._port = 0
        if not proc:
            return
        try:
            if proc.poll() is None:
                proc.terminate()
                try:
                    proc.wait(timeout=5)
                except Exception:
                    proc.kill()
        except Exception as e:
            _log(f"[AgentRuntime] stop() error: {e}")
        if _pm:
            _pm.unregister(proc)
