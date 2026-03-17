"""
OpenClaw Route — Node.js / Git 环境检测 + OpenClaw 安装/卸载 + Gateway 管理

Node.js 查找顺序：
  1. ~/.cherrystudio/bin/node(.exe)
  2. 系统 PATH 中的 node

Git 从系统 PATH 中查找。

npm 损坏时自动修复：用 Python 下载 npm tarball 并覆盖安装。
Gateway 管理：启动/停止/重启 openclaw gateway 子进程。
"""

import io
import json
import os
import re
import secrets
import shutil
import socket
import subprocess
import tarfile
import tempfile
import threading
import time
import urllib.error
import urllib.parse
import urllib.request

from ..server import route, prefix_route, STREAMING_HANDLED
from ..process_manager import pm as _pm
from ...utils.logger import network_logger
from ...core.config_manager import config_manager as _cfg_mgr

_log = network_logger

_CHERRYSTUDIO_BIN = os.path.join(
    os.path.expanduser("~"), ".cherrystudio", "bin"
)
_MINIMUM_NODE_VERSION = "22.0.0"

_CREATE_NO_WINDOW = subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0

_NPM_REGISTRY = "https://registry.npmmirror.com"


def _parse_version(version_str: str) -> tuple:
    """'v22.14.0' -> (22, 14, 0)"""
    m = re.search(r"(\d+)\.(\d+)\.(\d+)", version_str)
    if m:
        return tuple(int(x) for x in m.groups())
    return (0, 0, 0)


def _find_node() -> str | None:
    ext = ".exe" if os.name == "nt" else ""
    cs_node = os.path.join(_CHERRYSTUDIO_BIN, f"node{ext}")
    if os.path.isfile(cs_node):
        return cs_node
    return shutil.which("node")


def _find_git() -> str | None:
    return shutil.which("git")


def _get_proxy_config() -> dict:
    """从 secure_config 获取代理配置（含 bypass 规则）"""
    try:
        from ...core.secure_config import get_secure_proxy
        return get_secure_proxy()
    except Exception:
        return {"proxyUrl": "", "bypassRules": ""}


def _normalize_no_proxy(raw: str) -> str:
    """将 bypass 规则转换为 NO_PROXY 标准格式。

    Node.js HTTP 库（axios/undici 等）支持的格式：
      - 精确域名/IP：example.com, 192.168.1.1
      - 前缀点（子域匹配）：.example.com
      - * 全部跳过

    不支持的格式（需要展开）：
      - 192.168.*.*  → 展开为 192.168.0.0/16 风格不通用，
        改为前缀匹配 → 无法用 NO_PROXY 精确表达，
        用最接近的等价写法。
    """
    parts = [p.strip() for p in raw.replace(";", ",").split(",") if p.strip()]
    result = []
    for p in parts:
        if "*" not in p:
            result.append(p)
            continue

        # *.domain → .domain（NO_PROXY 标准子域匹配）
        if p.startswith("*."):
            result.append(p[1:])  # *.ccc.net → .ccc.net
            continue

        # 单个 * → 全部跳过
        if p == "*":
            result.append("*")
            continue

        # IP 通配符：192.168.*.* → 逐个展开 /16 段不现实，
        # 用前缀匹配：去掉 *.* 后缀作为前缀写入
        # 大多数 Node.js 库会做 startsWith 检查
        prefix = p.split("*")[0].rstrip(".")
        if prefix:
            result.append(prefix)

    return ",".join(result)


def _build_env(with_proxy: bool = False, with_venv: bool = False) -> dict:
    """构建干净的子进程环境变量

    Args:
        with_proxy: True 时将 Cherry Studio 配置的代理注入环境变量
        with_venv: True 时将中心化配置中的 Python 虚拟环境加入 PATH
    """
    env = os.environ.copy()
    for k in ("PYTHONPATH", "PYTHONHOME",
              "HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy",
              "ALL_PROXY", "all_proxy", "NO_PROXY", "no_proxy",
              "NODE_OPTIONS"):
        env.pop(k, None)
    if os.path.isdir(_CHERRYSTUDIO_BIN):
        env["PATH"] = _CHERRYSTUDIO_BIN + os.pathsep + env.get("PATH", "")

    if with_venv:
        venv_scripts = _get_venv_scripts_dir()
        if venv_scripts:
            env["PATH"] = venv_scripts + os.pathsep + env.get("PATH", "")
            env["VIRTUAL_ENV"] = os.path.dirname(venv_scripts)

    if with_proxy:
        cfg = _get_proxy_config()
        proxy_url = cfg.get("proxyUrl", "")
        bypass = cfg.get("bypassRules", "")
        if proxy_url:
            env["HTTP_PROXY"] = proxy_url
            env["HTTPS_PROXY"] = proxy_url
            env["http_proxy"] = proxy_url
            env["https_proxy"] = proxy_url
            _log("[OpenClaw] Proxy configured")
        if bypass:
            no_proxy = _normalize_no_proxy(bypass)
            env["NO_PROXY"] = no_proxy
            env["no_proxy"] = no_proxy

    return env


def _run_cmd(exe: str, args: list[str], timeout: int = 5) -> str | None:
    try:
        r = subprocess.run(
            [exe] + args,
            capture_output=True, text=True, timeout=timeout,
            env=_build_env(),
            creationflags=_CREATE_NO_WINDOW,
        )
        return r.stdout.strip() if r.returncode == 0 else None
    except Exception:
        return None


# ─── npm 查找与自动修复 ──────────────────────────────────────────────────────

def _which_excluding(name: str, exclude_dir: str) -> str | None:
    """在 PATH 中查找可执行文件，跳过 exclude_dir"""
    path_dirs = os.environ.get("PATH", "").split(os.pathsep)
    exclude_norm = os.path.normcase(os.path.normpath(exclude_dir))
    exts = os.environ.get("PATHEXT", ".COM;.EXE;.BAT;.CMD").split(";") if os.name == "nt" else [""]
    for d in path_dirs:
        if os.path.normcase(os.path.normpath(d)) == exclude_norm:
            continue
        for ext in exts:
            candidate = os.path.join(d, name + ext)
            if os.path.isfile(candidate):
                return candidate
    return None


def _npm_is_healthy(npm_path: str) -> bool:
    """测试 npm 是否能正常工作"""
    try:
        r = subprocess.run(
            [npm_path, "help"],
            capture_output=True, text=True, timeout=15,
            env=_build_env(),
            creationflags=_CREATE_NO_WINDOW,
        )
        if "Class extends value" in r.stderr:
            return False
        return r.returncode == 0
    except Exception:
        return False


def _repair_npm() -> bool:
    """
    用 Python 下载 npm tarball 并覆盖 ~/.cherrystudio/bin 下损坏的 npm。
    返回 True 表示修复成功。
    """
    npm_dir = os.path.join(_CHERRYSTUDIO_BIN, "node_modules", "npm")
    if not os.path.isdir(npm_dir):
        _log("[OpenClaw] npm directory not found, cannot repair")
        return False

    _log("[OpenClaw] Repairing npm: downloading fresh copy...")
    try:
        # 1. 获取 npm 最新版本 tarball URL
        meta_url = f"{_NPM_REGISTRY}/npm/latest"
        req = urllib.request.Request(meta_url, headers={"Accept": "application/json"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            meta = json.loads(resp.read().decode("utf-8"))
        tarball_url = meta.get("dist", {}).get("tarball", "")
        version = meta.get("version", "unknown")
        if not tarball_url:
            _log("[OpenClaw] Could not find npm tarball URL")
            return False

        # npmmirror 可能返回 npmjs.org 的 URL，替换为镜像
        if "registry.npmjs.org" in tarball_url:
            tarball_url = tarball_url.replace(
                "https://registry.npmjs.org", _NPM_REGISTRY
            )

        _log(f"[OpenClaw] Downloading npm v{version}: {tarball_url}")

        # 2. 下载 tarball
        req = urllib.request.Request(tarball_url)
        with urllib.request.urlopen(req, timeout=120) as resp:
            tarball_data = resp.read()

        _log(f"[OpenClaw] Downloaded {len(tarball_data)} bytes, extracting...")

        # 3. 解压到临时目录
        with tempfile.TemporaryDirectory() as tmp_dir:
            tar_io = io.BytesIO(tarball_data)
            with tarfile.open(fileobj=tar_io, mode="r:gz") as tar:
                tar.extractall(tmp_dir)

            # npm tarball 解压后目录名是 "package"
            extracted = os.path.join(tmp_dir, "package")
            if not os.path.isdir(extracted):
                entries = os.listdir(tmp_dir)
                if entries:
                    extracted = os.path.join(tmp_dir, entries[0])
            if not os.path.isdir(extracted):
                _log("[OpenClaw] Unexpected tarball structure")
                return False

            # 4. 删除旧 npm，复制新的
            _log(f"[OpenClaw] Replacing {npm_dir}")
            shutil.rmtree(npm_dir, ignore_errors=True)
            shutil.copytree(extracted, npm_dir)

        _log(f"[OpenClaw] npm v{version} installed successfully")
        return True

    except Exception as e:
        _log(f"[OpenClaw] npm repair failed: {e}")
        return False


def _find_npm() -> str | None:
    """查找可用的 npm，如果全部损坏则自动修复"""
    ext = ".cmd" if os.name == "nt" else ""
    candidates = []

    # 系统 npm（排除 cherrystudio/bin）
    sys_npm = _which_excluding("npm", _CHERRYSTUDIO_BIN)
    if sys_npm:
        candidates.append(sys_npm)

    # cherrystudio/bin 的 npm
    cs_npm = os.path.join(_CHERRYSTUDIO_BIN, f"npm{ext}")
    if os.path.isfile(cs_npm):
        candidates.append(cs_npm)

    # 先找一个能用的
    broken_cs = False
    for npm in candidates:
        if _npm_is_healthy(npm):
            _log(f"[OpenClaw] Using npm: {npm}")
            return npm
        _log(f"[OpenClaw] Broken npm: {npm}")
        if os.path.normcase(os.path.dirname(npm)) == os.path.normcase(_CHERRYSTUDIO_BIN):
            broken_cs = True

    # 全部 npm 都坏了，先尝试自动修复
    if broken_cs:
        _log("[OpenClaw] All npm broken, attempting auto-repair...")
        try:
            if _repair_npm():
                if os.path.isfile(cs_npm) and _npm_is_healthy(cs_npm):
                    _log(f"[OpenClaw] Repaired! Using npm: {cs_npm}")
                    return cs_npm
        except Exception as e:
            _log(f"[OpenClaw] Auto-repair failed (likely no internet): {e}")

    return None


# ─── Routes ──────────────────────────────────────────────────────────────────

@route("/api/v1/openclaw/check-node", methods=["GET"])
def check_node_version(ctx):
    node_path = _find_node()
    if not node_path:
        return {"status": "not_found"}

    version_out = _run_cmd(node_path, ["--version"])
    if not version_out:
        return {"status": "not_found"}

    ver_tuple = _parse_version(version_out)
    min_tuple = _parse_version(_MINIMUM_NODE_VERSION)
    version_clean = ".".join(str(x) for x in ver_tuple)

    if ver_tuple < min_tuple:
        return {"status": "version_low", "version": version_clean, "path": node_path}
    return {"status": "ok", "version": version_clean, "path": node_path}


@route("/api/v1/openclaw/check-git", methods=["GET"])
def check_git_available(ctx):
    git_path = _find_git()
    if not git_path:
        return {"available": False, "path": None}
    version_out = _run_cmd(git_path, ["--version"])
    return {"available": True, "path": git_path, "version": version_out or "unknown"}


@route("/api/v1/openclaw/check-installed", methods=["GET"])
def check_openclaw_installed(ctx):
    openclaw_path = shutil.which("openclaw")
    if not openclaw_path and os.path.isdir(_CHERRYSTUDIO_BIN):
        ext = ".cmd" if os.name == "nt" else ""
        cs_oc = os.path.join(_CHERRYSTUDIO_BIN, f"openclaw{ext}")
        if os.path.isfile(cs_oc):
            openclaw_path = cs_oc
    return {"installed": openclaw_path is not None, "path": openclaw_path}


_OPENCLAW_BUNDLE_NAME = "openclaw-bundle.tar.gz"

def _find_openclaw_bundle() -> str | None:
    """按优先级搜索离线安装包 openclaw-bundle.tar.gz"""
    candidates = [
        # %APPDATA%\npm\  (Windows npm 全局目录)
        os.path.join(os.environ.get("APPDATA", ""), "npm", _OPENCLAW_BUNDLE_NAME),
        # ~/.cherrystudio/
        os.path.join(os.path.expanduser("~"), ".cherrystudio", _OPENCLAW_BUNDLE_NAME),
        # J 盘公共目录
        os.path.join("J:/vfxtools/piplineTD/models/packages/bin", _OPENCLAW_BUNDLE_NAME),
    ]
    for p in candidates:
        if os.path.isfile(p):
            return p
    return None


def _install_from_bundle(bundle_path: str) -> dict:
    """从离线 tar.gz 安装 openclaw 到 ~/.cherrystudio/bin"""
    _log(f"[OpenClaw] Installing from offline bundle: {bundle_path}")
    try:
        os.makedirs(_CHERRYSTUDIO_BIN, exist_ok=True)

        with tarfile.open(bundle_path, "r:gz") as tar:
            # 安全检查：防止路径穿越
            for member in tar.getmembers():
                if member.name.startswith("/") or ".." in member.name:
                    return {"success": False, "message": f"Unsafe path in bundle: {member.name}"}
            tar.extractall(_CHERRYSTUDIO_BIN)

        # 验证安装结果
        ext = ".cmd" if os.name == "nt" else ""
        openclaw_bin = os.path.join(_CHERRYSTUDIO_BIN, f"openclaw{ext}")
        if os.path.isfile(openclaw_bin):
            _log(f"[OpenClaw] Offline install OK: {openclaw_bin}")
            return {"success": True, "message": "OpenClaw installed from offline bundle"}

        openclaw_dir = os.path.join(_CHERRYSTUDIO_BIN, "node_modules", "openclaw")
        if os.path.isdir(openclaw_dir):
            _log(f"[OpenClaw] Offline install OK (node_modules found, cmd missing)")
            return {"success": True, "message": "OpenClaw installed from offline bundle (node_modules)"}

        _log("[OpenClaw] Bundle extracted but openclaw not found in expected location")
        return {"success": False, "message": "Bundle extracted but openclaw binary not found"}

    except Exception as e:
        _log(f"[OpenClaw] Offline install error: {e}")
        return {"success": False, "message": f"Bundle install failed: {e}"}


@route("/api/v1/openclaw/install", methods=["POST"])
def install_openclaw(ctx):
    """安装 OpenClaw：优先离线包，回退 npm 在线安装"""

    # 1. 优先从离线 bundle 安装
    bundle = _find_openclaw_bundle()
    if bundle:
        return _install_from_bundle(bundle)

    # 2. 回退到 npm 在线安装
    npm_path = _find_npm()
    if not npm_path:
        search_paths = [
            os.path.join(os.environ.get("APPDATA", ""), "npm"),
            os.path.join(os.path.expanduser("~"), ".cherrystudio"),
        ]
        return {
            "success": False,
            "message": (
                f"No offline bundle ({_OPENCLAW_BUNDLE_NAME}) found and npm is unavailable. "
                f"Please place {_OPENCLAW_BUNDLE_NAME} in one of: {', '.join(search_paths)}"
            ),
        }

    package_name = "openclaw@latest"
    args = ["install", "-g", package_name]
    _log(f"[OpenClaw] Installing via npm: {npm_path} {' '.join(args)}")

    try:
        r = subprocess.run(
            [npm_path] + args,
            capture_output=True, text=True, timeout=300,
            env=_build_env(),
            creationflags=_CREATE_NO_WINDOW,
        )
        if r.returncode == 0:
            _log(f"[OpenClaw] Installed successfully: {r.stdout.strip()}")
            return {"success": True, "message": "OpenClaw installed successfully"}

        stderr = r.stderr.strip()
        _log(f"[OpenClaw] Install failed (code {r.returncode}): {stderr}")
        return {"success": False, "message": stderr or f"Installation failed (code {r.returncode})"}
    except subprocess.TimeoutExpired:
        return {"success": False, "message": "Installation timed out (5 min)"}
    except Exception as e:
        _log(f"[OpenClaw] Install error: {e}")
        return {"success": False, "message": str(e)}


@route("/api/v1/openclaw/uninstall", methods=["POST"])
def uninstall_openclaw(ctx):
    """卸载 openclaw"""
    # 先停止 gateway
    if _gw_state["status"] == "running":
        _do_stop_gateway()

    npm_path = _find_npm()
    if not npm_path:
        return {"success": False, "message": "npm not found"}

    args = ["uninstall", "-g", "openclaw", "@qingchencloud/openclaw-zh"]
    _log(f"[OpenClaw] Uninstalling: {npm_path} {' '.join(args)}")

    try:
        r = subprocess.run(
            [npm_path] + args,
            capture_output=True, text=True, timeout=120,
            env=_build_env(),
            creationflags=_CREATE_NO_WINDOW,
        )
        if r.returncode == 0:
            _log("[OpenClaw] Uninstalled successfully")
            return {"success": True, "message": "OpenClaw uninstalled successfully"}

        stderr = r.stderr.strip()
        _log(f"[OpenClaw] Uninstall failed: {stderr}")
        return {"success": False, "message": stderr or f"Exit code {r.returncode}"}
    except Exception as e:
        _log(f"[OpenClaw] Uninstall error: {e}")
        return {"success": False, "message": str(e)}


# ─── Gateway 管理 ────────────────────────────────────────────────────────────

_OPENCLAW_CONFIG_DIR = os.path.join(os.path.expanduser("~"), ".openclaw")
_OPENCLAW_CONFIG_PATH = os.path.join(_OPENCLAW_CONFIG_DIR, "openclaw.cherry.json")
_OPENCLAW_ORIGINAL_CONFIG_PATH = os.path.join(_OPENCLAW_CONFIG_DIR, "openclaw.json")
_DEFAULT_GATEWAY_PORT = 18790


def _ensure_pip_in_venv(venv_path: str) -> None:
    """确保 uv 管理的虚拟环境中安装了 pip 模块。

    uv 创建的 venv 默认不包含 pip。OpenClaw agent 使用
    ``python -m pip install ...`` 安装库时会因缺少 pip 模块而失败。
    此函数检测 pip 是否可用，若不可用则通过 ``uv pip install pip``
    将 pip 安装到虚拟环境中。
    """
    scripts_dir = os.path.join(venv_path, "Scripts" if os.name == "nt" else "bin")
    python_exe = os.path.join(scripts_dir, "python.exe" if os.name == "nt" else "python")
    if not os.path.isfile(python_exe):
        return

    # 快速检查：pip 模块是否已经可用
    try:
        r = subprocess.run(
            [python_exe, "-m", "pip", "--version"],
            capture_output=True, timeout=10,
            creationflags=_CREATE_NO_WINDOW,
        )
        if r.returncode == 0:
            return
    except Exception:
        pass

    uv_path = shutil.which("uv")
    if not uv_path:
        _log("[OpenClaw] uv not found in PATH, cannot install pip into venv")
        return

    _log(f"[OpenClaw] Installing pip into venv {venv_path} via uv ...")
    try:
        r = subprocess.run(
            [uv_path, "pip", "install", "pip", "--python", python_exe],
            capture_output=True, text=True, timeout=120,
            creationflags=_CREATE_NO_WINDOW,
        )
        if r.returncode == 0:
            _log(f"[OpenClaw] pip installed into venv: {venv_path}")
        else:
            _log(f"[OpenClaw] uv pip install pip failed: {r.stderr.strip()}")
    except Exception as e:
        _log(f"[OpenClaw] Error installing pip: {e}")


def _get_venv_scripts_dir() -> str | None:
    """从中心化配置获取 Python 虚拟环境的 Scripts 目录。"""
    cfg = _cfg_mgr.load() or {}
    venv_path = cfg.get("pythonVenv")
    if not venv_path or not os.path.isdir(venv_path):
        return None
    scripts_dir = os.path.join(venv_path, "Scripts" if os.name == "nt" else "bin")
    return scripts_dir if os.path.isdir(scripts_dir) else None


def _sync_centralized_to_openclaw(config: dict) -> dict:
    """将中心化配置中的 providers 写入 OpenClaw 配置。

    遍历 centralized-config.json 中所有 provider，转换为 OpenClaw
    ``models.providers`` 格式，同时自动选择第一个多模态模型作为
    ``agents.defaults.imageModel``。还将 Python 虚拟环境路径写入
    ``env`` 以便 agent exec 工具能使用正确的 Python/pip。
    """
    cfg = _cfg_mgr.load() or {}
    centralized_providers = cfg.get("centralizedProviders", [])

    # 写入 Python 虚拟环境到 env（即使没有 provider 也要处理）
    venv_path = cfg.get("pythonVenv")
    if venv_path and os.path.isdir(venv_path):
        scripts_dir = os.path.join(venv_path, "Scripts" if os.name == "nt" else "bin")
        if os.path.isdir(scripts_dir):
            config.setdefault("env", {})
            config["env"]["VIRTUAL_ENV"] = venv_path
            _ensure_pip_in_venv(venv_path)

    if not centralized_providers:
        return config

    config.setdefault("models", {"mode": "merge", "providers": {}})
    config["models"].setdefault("providers", {})

    first_multimodal_ref = None

    for cp in centralized_providers:
        provider_key = f"central-{cp.get('id', 'default')}"

        # 判断 API 类型
        cp_type = cp.get("type", "openai")
        if cp_type in ("anthropic", "vertex-anthropic"):
            api_type = "anthropic-messages"
        else:
            api_type = "openai-completions"

        base_url = (cp.get("apiHost") or "").rstrip("/")
        if api_type != "anthropic-messages" and not re.search(r"/v\d+", base_url):
            base_url += "/v1"

        api_key = (cp.get("apiKey") or "").split(",")[0].strip()

        models_list = []
        for m in cp.get("models", []):
            mid = m.get("id", "")
            modality = m.get("primaryModality", "text")
            entry: dict = {
                "id": mid,
                "name": m.get("name", mid),
                "contextWindow": 128000,
            }
            if modality == "multimodal":
                entry["input"] = ["text", "image"]
            else:
                entry["input"] = ["text"]
            models_list.append(entry)
            if not first_multimodal_ref and modality == "multimodal":
                first_multimodal_ref = f"{provider_key}/{mid}"

        config["models"]["providers"][provider_key] = {
            "baseUrl": base_url,
            "apiKey": api_key,
            "api": api_type,
            "models": models_list,
        }

    # 如果找到了多模态模型，设置为 imageModel
    if first_multimodal_ref:
        config.setdefault("agents", {"defaults": {}})
        config["agents"].setdefault("defaults", {})
        config["agents"]["defaults"].setdefault("imageModel", {
            "primary": first_multimodal_ref,
        })
        config["agents"]["defaults"].setdefault("mediaMaxMb", 10)

    _log(f"[OpenClaw] Synced {len(centralized_providers)} centralized provider(s)")
    return config


_gw_state = {
    "process": None,       # subprocess.Popen
    "status": "stopped",   # stopped | starting | running | error
    "port": _DEFAULT_GATEWAY_PORT,
    "auth_token": "",
}
_gw_lock = threading.Lock()


def _find_openclaw() -> str | None:
    """查找 openclaw 可执行文件"""
    ext = ".cmd" if os.name == "nt" else ""
    cs = os.path.join(_CHERRYSTUDIO_BIN, f"openclaw{ext}")
    if os.path.isfile(cs):
        return cs
    return shutil.which("openclaw")


def _check_port_open(port: int, timeout: float = 2.0) -> bool:
    """检测端口是否在监听"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(timeout)
        s.connect(("127.0.0.1", port))
        s.close()
        return True
    except (ConnectionRefusedError, socket.timeout, OSError):
        return False


def _check_gateway_cli(openclaw_path: str) -> bool:
    """通过 openclaw gateway status 检查是否正在运行"""
    url = f"ws://127.0.0.1:{_gw_state['port']}"
    env = _build_env()
    env["OPENCLAW_CONFIG_PATH"] = _OPENCLAW_CONFIG_PATH
    try:
        r = subprocess.run(
            [openclaw_path, "gateway", "status", "--url", url],
            capture_output=True, text=True, timeout=10,
            env=env, creationflags=_CREATE_NO_WINDOW,
        )
        return r.returncode == 0 and "listening" in r.stdout.lower()
    except Exception:
        return False


def _do_stop_gateway():
    """内部停止 gateway 逻辑"""
    with _gw_lock:
        openclaw_path = _find_openclaw()
        if openclaw_path:
            url = f"ws://127.0.0.1:{_gw_state['port']}"
            env = _build_env()
            env["OPENCLAW_CONFIG_PATH"] = _OPENCLAW_CONFIG_PATH
            try:
                subprocess.run(
                    [openclaw_path, "gateway", "stop", "--url", url],
                    capture_output=True, text=True, timeout=10,
                    env=env, creationflags=_CREATE_NO_WINDOW,
                )
            except Exception as e:
                _log(f"[OpenClaw] gateway stop cmd error: {e}")

        proc = _gw_state["process"]
        if proc:
            _pm.unregister(proc)
            if proc.poll() is None:
                try:
                    proc.terminate()
                    proc.wait(timeout=5)
                except Exception:
                    try:
                        proc.kill()
                    except Exception:
                        pass

        _gw_state["process"] = None
        _gw_state["status"] = "stopped"
        _log("[OpenClaw] Gateway stopped")


_PROXY_BOOTSTRAP_JS = os.path.join(_CHERRYSTUDIO_BIN, "_proxy_bootstrap.js")

# 自包含代理引导脚本，不依赖任何第三方 npm 包
_PROXY_BOOTSTRAP_CODE = r"""
'use strict';
(function () {
  var proxyUrl = process.env.HTTP_PROXY || process.env.HTTPS_PROXY || '';
  if (!proxyUrl) return;

  var noProxy = (process.env.NO_PROXY || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  var log = function (msg) { try { process.stderr.write('[proxy-bootstrap] ' + msg + '\n'); } catch(e) {} };

  function shouldBypass(hostname) {
    if (!hostname) return false;
    for (var i = 0; i < noProxy.length; i++) {
      var rule = noProxy[i];
      if (rule === '*') return true;
      if (rule.charAt(0) === '.') {
        if (hostname.endsWith(rule) || hostname === rule.slice(1)) return true;
      } else if (hostname === rule || hostname.endsWith('.' + rule) || hostname.startsWith(rule + '.') || hostname.startsWith(rule)) {
        return true;
      }
    }
    return false;
  }

  var urlMod = require('url');
  var parsed = new (urlMod.URL || URL)(proxyUrl);
  var pHost = parsed.hostname;
  var pPort = parseInt(parsed.port) || 80;
  var patched = [];

  // 1. Patch fetch() — Node.js 18+ 内置 undici
  try {
    var undici;
    try { undici = require('undici'); } catch(e) { undici = require('node:undici'); }
    if (undici.EnvHttpProxyAgent && undici.setGlobalDispatcher) {
      undici.setGlobalDispatcher(new undici.EnvHttpProxyAgent());
      patched.push('fetch(EnvHttpProxyAgent)');
    } else if (undici.ProxyAgent && undici.setGlobalDispatcher) {
      undici.setGlobalDispatcher(new undici.ProxyAgent(proxyUrl));
      patched.push('fetch(ProxyAgent)');
    }
  } catch (e) { log('undici patch skipped: ' + e.message); }

  // 2. Patch http/https globalAgent
  try {
    var http = require('http');
    var https = require('https');
    var net = require('net');
    var tls = require('tls');

    // --- HTTP: 连接到代理，发送绝对 URL ---
    var origHttpRequest = http.request;
    http.request = function (urlOrOpts, optionsOrCb, cb) {
      var options = typeof urlOrOpts === 'string' ? Object.assign(new (urlMod.URL || URL)(urlOrOpts)) : urlOrOpts;
      if (urlOrOpts && typeof urlOrOpts === 'object' && urlOrOpts.href) {
        options = Object.assign({}, urlOrOpts);
      }
      var targetHost = options.hostname || options.host || 'localhost';
      if (options.method === 'CONNECT' || shouldBypass(targetHost)) {
        return origHttpRequest.apply(http, arguments);
      }
      var fullPath = 'http://' + targetHost + ':' + (options.port || 80) + (options.path || '/');
      var proxyOpts = Object.assign({}, options, {
        hostname: pHost, host: pHost, port: pPort, path: fullPath,
      });
      delete proxyOpts.agent;
      if (typeof optionsOrCb === 'function') {
        return origHttpRequest.call(http, proxyOpts, optionsOrCb);
      }
      return origHttpRequest.call(http, proxyOpts, optionsOrCb, cb);
    };
    patched.push('http.request');

    // --- HTTPS: CONNECT 隧道 ---
    var OrigHttpsAgent = https.Agent;
    function TunnelAgent(opts) { OrigHttpsAgent.call(this, opts); }
    TunnelAgent.prototype = Object.create(OrigHttpsAgent.prototype);
    TunnelAgent.prototype.constructor = TunnelAgent;
    TunnelAgent.prototype.createConnection = function (options, cb) {
      var targetHost = options.host || options.hostname || 'localhost';
      var targetPort = options.port || 443;
      if (shouldBypass(targetHost)) {
        return tls.connect({ host: targetHost, port: targetPort, servername: targetHost }, function () { cb(null, this); });
      }
      var connectReq = origHttpRequest({
        host: pHost, port: pPort, method: 'CONNECT',
        path: targetHost + ':' + targetPort,
      });
      connectReq.on('connect', function (res, socket) {
        if (res.statusCode !== 200) {
          cb(new Error('CONNECT ' + res.statusCode));
          socket.destroy();
          return;
        }
        var tlsSocket = tls.connect({ socket: socket, servername: targetHost });
        cb(null, tlsSocket);
      });
      connectReq.on('error', cb);
      connectReq.end();
    };
    https.globalAgent = new TunnelAgent({ keepAlive: true });
    patched.push('https.globalAgent');

    // 3. Patch globalThis.fetch — 内部 undici 绕过 http/https 模块，必须单独处理
    if (typeof globalThis.fetch === 'function') {
      var origFetch = globalThis.fetch;
      globalThis.fetch = function (input, init) {
        var urlStr;
        if (typeof input === 'string') urlStr = input;
        else if (input && typeof input === 'object' && input.url) urlStr = input.url;
        else return origFetch.call(globalThis, input, init);

        var purl;
        try { purl = new URL(urlStr); } catch (e) { return origFetch.call(globalThis, input, init); }

        if (shouldBypass(purl.hostname)) {
          return origFetch.call(globalThis, input, init);
        }

        // 通过已打补丁的 http/https.request 发起请求
        var isHttps = purl.protocol === 'https:';
        var mod = isHttps ? https : http;
        var method = (init && init.method) || 'GET';
        var reqHeaders = {};
        if (init && init.headers) {
          if (typeof init.headers.forEach === 'function') {
            init.headers.forEach(function (v, k) { reqHeaders[k] = v; });
          } else if (typeof init.headers === 'object') {
            var hk = Object.keys(init.headers);
            for (var hi = 0; hi < hk.length; hi++) reqHeaders[hk[hi]] = init.headers[hk[hi]];
          }
        }

        return new Promise(function (resolve, reject) {
          var reqOpts = {
            hostname: purl.hostname,
            port: purl.port || (isHttps ? 443 : 80),
            path: purl.pathname + purl.search,
            method: method,
            headers: reqHeaders,
          };

          var req = mod.request(reqOpts, function (res) {
            var chunks = [];
            res.on('data', function (c) { chunks.push(c); });
            res.on('end', function () {
              var body = Buffer.concat(chunks);
              var respHeaders = {};
              var rawH = res.rawHeaders || [];
              for (var ri = 0; ri < rawH.length; ri += 2) {
                respHeaders[rawH[ri]] = rawH[ri + 1];
              }
              resolve(new Response(body, {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: respHeaders,
              }));
            });
            res.on('error', reject);
          });

          req.on('error', reject);
          req.setTimeout(30000, function () { req.destroy(new Error('proxy fetch timeout')); });

          if (init && init.body) {
            if (typeof init.body === 'string' || Buffer.isBuffer(init.body)) {
              req.write(init.body);
            }
          }
          req.end();
        });
      };
      patched.push('globalThis.fetch');
    }

  } catch (e) { log('http/https patch error: ' + e.message); }

  // 4. Patch child_process.exec/execSync — PowerShell 中 curl 是 Invoke-WebRequest 别名
  //    替换 curl 为 curl.exe 让它走真正的 curl（支持 HTTP_PROXY 环境变量）
  try {
    var cp = require('child_process');
    function fixCurlCmd(cmd) {
      if (typeof cmd !== 'string') return cmd;
      // curl "url" → curl.exe "url"  (只替换命令开头的 curl，不替换 curl.exe)
      return cmd.replace(/^curl(?=\s|$)(?!\.exe)/i, 'curl.exe')
               .replace(/(?<=[\s|&;])curl(?=\s|$)(?!\.exe)/gi, 'curl.exe');
    }
    var origExec = cp.exec;
    cp.exec = function (cmd, opts, cb) {
      return origExec.call(cp, fixCurlCmd(cmd), opts, cb);
    };
    var origExecSync = cp.execSync;
    cp.execSync = function (cmd, opts) {
      return origExecSync.call(cp, fixCurlCmd(cmd), opts);
    };
    patched.push('child_process(curl→curl.exe)');
  } catch (e) { log('child_process patch error: ' + e.message); }

  log('OK patched=[' + patched.join(', ') + ']');
})();
""".strip()


_PROXY_WRAPPER_JS = os.path.join(_CHERRYSTUDIO_BIN, "_openclaw_proxy_wrapper.js")


def _ensure_proxy_bootstrap() -> str:
    """生成代理引导脚本 + wrapper 启动脚本，返回 wrapper 路径"""
    try:
        os.makedirs(os.path.dirname(_PROXY_BOOTSTRAP_JS), exist_ok=True)
        with open(_PROXY_BOOTSTRAP_JS, "w", encoding="utf-8") as f:
            f.write(_PROXY_BOOTSTRAP_CODE)
        return _PROXY_BOOTSTRAP_JS
    except Exception as e:
        _log(f"[OpenClaw] Failed to write proxy bootstrap: {e}")
        return ""


def _build_proxy_wrapper(openclaw_path: str) -> str:
    """生成一个 wrapper JS，先加载 proxy bootstrap 再启动 openclaw"""
    bootstrap_path = _PROXY_BOOTSTRAP_JS.replace("\\", "/")

    # 找到 openclaw 的真实 JS 入口
    # openclaw.cmd -> node node_modules/openclaw/bin/openclaw.js
    openclaw_js = ""
    node_modules = os.path.join(_CHERRYSTUDIO_BIN, "node_modules", "openclaw")
    for candidate in ["bin/openclaw.js", "bin/cli.js", "dist/cli.js", "dist/index.js"]:
        p = os.path.join(node_modules, candidate)
        if os.path.isfile(p):
            openclaw_js = p.replace("\\", "/")
            break

    if not openclaw_js:
        # 尝试从 .cmd 文件解析入口
        if openclaw_path.lower().endswith(".cmd") and os.path.isfile(openclaw_path):
            try:
                content = open(openclaw_path, "r", encoding="utf-8", errors="replace").read()
                import re as _re
                m = _re.search(r'node_modules[\\/]openclaw[\\/][^\s"]+\.js', content)
                if m:
                    openclaw_js = os.path.join(_CHERRYSTUDIO_BIN, m.group(0)).replace("\\", "/")
            except Exception:
                pass

    if not openclaw_js:
        _log("[OpenClaw] Cannot find openclaw JS entry point for wrapper")
        return ""

    wrapper_code = f"""'use strict';
// Proxy bootstrap + OpenClaw launcher
require('{bootstrap_path}');
// Forward argv: node wrapper.js gateway --port 18790
// -> openclaw.js gateway --port 18790
process.argv = [process.argv[0], '{openclaw_js}'].concat(process.argv.slice(2));
require('{openclaw_js}');
"""
    try:
        with open(_PROXY_WRAPPER_JS, "w", encoding="utf-8") as f:
            f.write(wrapper_code)
        _log(f"[OpenClaw] Proxy wrapper created: {_PROXY_WRAPPER_JS}")
        return _PROXY_WRAPPER_JS
    except Exception as e:
        _log(f"[OpenClaw] Failed to write proxy wrapper: {e}")
        return ""


def _ensure_curl_wrapper(proxy_url: str):
    """在 _CHERRYSTUDIO_BIN 创建 curl.cmd 包装脚本。

    Windows PowerShell 中 `curl` 是 `Invoke-WebRequest` 的别名，
    不读 HTTP_PROXY 环境变量。OpenClaw exec 工具通过 PowerShell 执行命令，
    所以 skill 中的 `curl` 调用无法走代理。

    解决方案：创建 curl.cmd，OpenClaw exec 检测到 .cmd 后会用 cmd.exe 执行，
    绕过 PowerShell 别名，并自动加上 --proxy 参数。
    """
    if os.name != "nt":
        return
    curl_wrapper = os.path.join(_CHERRYSTUDIO_BIN, "curl.cmd")
    try:
        # 找到真实的 curl.exe（跳过自己）
        real_curl = shutil.which("curl.exe")
        if not real_curl:
            real_curl = r"C:\Windows\System32\curl.exe"
        real_curl_escaped = real_curl.replace("/", "\\")

        content = f'''@echo off
REM Auto-generated proxy wrapper for curl
"{real_curl_escaped}" --proxy {proxy_url} --noproxy "%NO_PROXY%" %*
'''
        with open(curl_wrapper, "w", encoding="utf-8") as f:
            f.write(content)
        _log("[OpenClaw] curl.cmd proxy wrapper created")
    except Exception as e:
        _log(f"[OpenClaw] Failed to create curl wrapper: {e}")


def _spawn_gateway(openclaw_path: str, port: int):
    """后台线程中启动 gateway 并等待就绪"""
    _gw_state["status"] = "starting"
    _gw_state["port"] = port

    # 启动前确保中心化 providers 已写入配置
    try:
        os.makedirs(_OPENCLAW_CONFIG_DIR, exist_ok=True)
        config = {}
        if os.path.isfile(_OPENCLAW_CONFIG_PATH):
            with open(_OPENCLAW_CONFIG_PATH, "r", encoding="utf-8") as f:
                config = json.load(f)
        config = _sync_centralized_to_openclaw(config)
        if config.get("models", {}).get("providers"):
            with open(_OPENCLAW_CONFIG_PATH, "w", encoding="utf-8") as f:
                json.dump(config, f, indent=2, ensure_ascii=False)
    except Exception as e:
        _log(f"[OpenClaw] Pre-start centralized sync warning: {e}")

    env = _build_env(with_proxy=True, with_venv=True)
    env["OPENCLAW_CONFIG_PATH"] = _OPENCLAW_CONFIG_PATH

    # Node.js 不自动使用 HTTP_PROXY，需要自包含引导脚本接管
    proxy_url = env.get("HTTP_PROXY", "")
    use_wrapper = False
    if proxy_url:
        bootstrap = _ensure_proxy_bootstrap()
        if bootstrap:
            wrapper = _build_proxy_wrapper(openclaw_path)
            if wrapper:
                use_wrapper = True
            else:
                bp = bootstrap.replace("\\", "/")
                env["NODE_OPTIONS"] = f'--require "{bp}"'
                _log("[OpenClaw] Proxy: fallback to NODE_OPTIONS")
        # 为 exec 工具中的 curl 命令创建代理包装
        _ensure_curl_wrapper(proxy_url)

    # 确定启动命令
    if use_wrapper:
        node_exe = os.path.join(_CHERRYSTUDIO_BIN, "node.exe" if os.name == "nt" else "node")
        if not os.path.isfile(node_exe):
            node_exe = shutil.which("node") or "node"
        cmd = [node_exe, _PROXY_WRAPPER_JS, "gateway", "--port", str(port)]
        _log(f"[OpenClaw] Spawning via proxy wrapper: {node_exe} {_PROXY_WRAPPER_JS}")
    else:
        cmd = [openclaw_path, "gateway", "--port", str(port)]
        _log(f"[OpenClaw] Spawning: {openclaw_path} gateway --port {port}")

    kwargs = {}
    if os.name == "nt":
        kwargs["creationflags"] = subprocess.CREATE_NO_WINDOW

    try:
        proc = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE, stderr=subprocess.PIPE,
            env=env, **kwargs,
        )
        _gw_state["process"] = proc
        _pm.register(proc, "openclaw-gateway")

        # 后台读取 stdout/stderr 防止管道堵塞
        def _drain(stream, label):
            try:
                for line in iter(stream.readline, b""):
                    _log(f"[OpenClaw GW {label}] {line.decode(errors='replace').rstrip()}")
            except Exception:
                pass

        threading.Thread(target=_drain, args=(proc.stdout, "out"), daemon=True).start()
        threading.Thread(target=_drain, args=(proc.stderr, "err"), daemon=True).start()

        # 等待就绪（最多 30 秒）
        for i in range(30):
            if proc.poll() is not None:
                _gw_state["status"] = "error"
                _log(f"[OpenClaw] Gateway exited early with code {proc.returncode}")
                return
            time.sleep(1)
            if _check_port_open(port):
                _gw_state["status"] = "running"
                _log(f"[OpenClaw] Gateway running on port {port}")
                return
            if _check_gateway_cli(openclaw_path):
                _gw_state["status"] = "running"
                _log(f"[OpenClaw] Gateway running (CLI confirmed) on port {port}")
                return

        _gw_state["status"] = "error"
        _log("[OpenClaw] Gateway start timed out (30s)")

    except Exception as e:
        _gw_state["status"] = "error"
        _log(f"[OpenClaw] Gateway spawn error: {e}")


@route("/api/v1/openclaw/sync-config", methods=["POST"])
def sync_config(ctx):
    """将 Cherry Studio 的 Provider 配置写入 openclaw.cherry.json"""
    body = ctx.get("body", {})
    provider = body.get("provider", {})
    model = body.get("model", {})

    if not provider or not model:
        return {"success": False, "message": "Missing provider or model data"}

    try:
        os.makedirs(_OPENCLAW_CONFIG_DIR, exist_ok=True)

        # 读取已有配置或使用原始配置作为模板
        config = {}
        if os.path.isfile(_OPENCLAW_CONFIG_PATH):
            try:
                with open(_OPENCLAW_CONFIG_PATH, "r", encoding="utf-8") as f:
                    config = json.load(f)
            except Exception:
                pass
        elif os.path.isfile(_OPENCLAW_ORIGINAL_CONFIG_PATH):
            try:
                with open(_OPENCLAW_ORIGINAL_CONFIG_PATH, "r", encoding="utf-8") as f:
                    config = json.load(f)
            except Exception:
                pass

        provider_key = f"cherry-{provider.get('id', 'default')}"

        # 判断 API 类型
        anthropic_types = ["anthropic", "vertex-anthropic"]
        api_type = "openai-completions"
        if provider.get("type") in anthropic_types:
            api_type = "anthropic-messages"
        elif model.get("endpoint_type") == "anthropic":
            api_type = "anthropic-messages"
        elif provider.get("anthropicApiHost"):
            api_type = "anthropic-messages"
        elif provider.get("type") == "openai-response":
            api_type = "openai-responses"

        # 计算 baseUrl
        api_host = provider.get("apiHost", "")
        if api_type == "anthropic-messages":
            base_url = (provider.get("anthropicApiHost") or api_host).rstrip("/")
        else:
            base_url = api_host.rstrip("/")
            if not re.search(r"/v\d+", base_url):
                base_url += "/v1"

        # API key（取第一个）
        api_key = (provider.get("apiKey") or "").split(",")[0].strip()

        # 模型列表（声明 input 让 gateway 知道模型支持哪些输入类型）
        models_list = []
        for m in provider.get("models", []):
            m_entry: dict = {
                "id": m.get("id", ""),
                "name": m.get("name", m.get("id", "")),
                "contextWindow": 128000,
            }
            if m.get("primaryModality") == "multimodal":
                m_entry["input"] = ["text", "image"]
            else:
                m_entry["input"] = ["text"]
            models_list.append(m_entry)

        openclaw_provider = {
            "baseUrl": base_url,
            "apiKey": api_key,
            "api": api_type,
            "models": models_list,
        }

        # Gateway 配置
        port = _gw_state["port"]
        if not _gw_state["auth_token"]:
            _gw_state["auth_token"] = secrets.token_urlsafe(24)
        token = _gw_state["auth_token"]

        config.setdefault("gateway", {})
        config["gateway"]["mode"] = "local"
        config["gateway"]["port"] = port
        config["gateway"]["auth"] = {"token": token}

        config.setdefault("models", {"mode": "merge", "providers": {}})
        config["models"].setdefault("providers", {})
        config["models"]["providers"][provider_key] = openclaw_provider

        config.setdefault("agents", {"defaults": {}})
        config["agents"].setdefault("defaults", {})
        model_ref = f"{provider_key}/{model.get('id', '')}"
        config["agents"]["defaults"]["model"] = {
            "primary": model_ref
        }
        # imageModel: 告诉 gateway 用同一个模型处理图片输入，
        # 同时作为 "不确定主模型是否支持视觉" 时的后备路由
        config["agents"]["defaults"]["imageModel"] = {
            "primary": model_ref
        }
        config["agents"]["defaults"]["mediaMaxMb"] = 10

        # 同步中心化配置中的 providers（公司统一管理的模型）
        config = _sync_centralized_to_openclaw(config)

        with open(_OPENCLAW_CONFIG_PATH, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2, ensure_ascii=False)

        _log(f"[OpenClaw] Config synced: provider={provider_key}, model={model.get('id')}")
        return {"success": True, "message": f"Provider {provider.get('name', '')} synced to OpenClaw"}

    except Exception as e:
        _log(f"[OpenClaw] syncConfig error: {e}")
        return {"success": False, "message": str(e)}


@route("/api/v1/openclaw/start-gateway", methods=["POST"])
def start_gateway(ctx):
    """启动 OpenClaw Gateway"""
    body = ctx.get("body", {})
    port = body.get("port", _gw_state["port"]) or _DEFAULT_GATEWAY_PORT

    if _gw_state["status"] == "starting":
        return {"success": False, "message": "Gateway is already starting"}

    openclaw_path = _find_openclaw()
    if not openclaw_path:
        return {"success": False, "message": "OpenClaw binary not found. Please install OpenClaw first."}

    # 检查是否已经在运行（可能是外部进程）
    if _check_port_open(port) or _check_gateway_cli(openclaw_path):
        _gw_state["status"] = "running"
        _gw_state["port"] = port
        _log(f"[OpenClaw] Reusing existing gateway on port {port}")
        return {"success": True, "message": f"Gateway is already running on port {port}"}

    # 在后台线程启动并等待
    t = threading.Thread(target=_spawn_gateway, args=(openclaw_path, port), daemon=True)
    t.start()
    t.join(timeout=35)

    if _gw_state["status"] == "running":
        return {"success": True, "message": f"Gateway started on port {port}"}
    else:
        return {"success": False, "message": f"Gateway failed to start (status: {_gw_state['status']})"}


@route("/api/v1/openclaw/stop-gateway", methods=["POST"])
def stop_gateway(ctx):
    """停止 OpenClaw Gateway"""
    try:
        _do_stop_gateway()
        return {"success": True, "message": "Gateway stopped successfully"}
    except Exception as e:
        _log(f"[OpenClaw] stop error: {e}")
        return {"success": False, "message": str(e)}


@route("/api/v1/openclaw/restart-gateway", methods=["POST"])
def restart_gateway(ctx):
    """重启 OpenClaw Gateway"""
    _do_stop_gateway()
    time.sleep(0.5)
    return start_gateway(ctx)


@route("/api/v1/openclaw/get-status", methods=["GET"])
def get_status(ctx):
    """获取 Gateway 状态"""
    # 检查进程是否意外退出
    proc = _gw_state["process"]
    if proc and proc.poll() is not None:
        _gw_state["process"] = None
        _gw_state["status"] = "stopped"
    return {"status": _gw_state["status"], "port": _gw_state["port"]}


@route("/api/v1/openclaw/check-health", methods=["GET"])
def check_health(ctx):
    """检查 Gateway 健康状况"""
    port = _gw_state["port"]
    if _gw_state["status"] != "running":
        return {"status": "unhealthy", "gatewayPort": port}

    if _check_port_open(port):
        return {"status": "healthy", "gatewayPort": port}
    return {"status": "unhealthy", "gatewayPort": port}


@route("/api/v1/openclaw/get-dashboard-url", methods=["GET"])
def get_dashboard_url(ctx):
    """获取 Dashboard URL（返回代理 URL 以绕过 CSP frame-ancestors 和 CORS）"""
    server = ctx.get("server")
    base = server.get_base_url() if server else ""
    proxy_url = f"{base}/openclaw-dashboard/"
    if _gw_state["auth_token"]:
        proxy_url += f"?token={_gw_state['auth_token']}"
    return {"url": proxy_url}


# ─── Dashboard 全量反向代理 ──────────────────────────────────────────────────

_PROXY_PREFIX = "/openclaw-dashboard"

# 不转发的 hop-by-hop 头
_HOP_HEADERS = frozenset(h.lower() for h in [
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade",
    "content-security-policy", "x-frame-options",
    "content-length", "content-encoding",
])


def _inject_ws_redirect(html_bytes: bytes, gw_port: int) -> bytes:
    """在 HTML 中注入 WebSocket 重写脚本，将 WS 连接从代理地址重定向到真实 Gateway。"""
    html = html_bytes.decode("utf-8", errors="replace")

    ws_script = f"""<script>
(function(){{
  var _WS=window.WebSocket;
  var gwHost='127.0.0.1:{gw_port}';
  window.WebSocket=function(u,p){{
    if(typeof u==='string'){{
      try{{
        var o=new URL(u);
        o.host=gwHost;
        o.protocol='ws:';
        o.pathname=o.pathname.replace('/openclaw-dashboard/','/')
                             .replace('/openclaw-dashboard','');
        u=o.toString();
      }}catch(e){{}}
    }}
    return p!==undefined?new _WS(u,p):new _WS(u);
  }};
  window.WebSocket.prototype=_WS.prototype;
  window.WebSocket.CONNECTING=_WS.CONNECTING;
  window.WebSocket.OPEN=_WS.OPEN;
  window.WebSocket.CLOSING=_WS.CLOSING;
  window.WebSocket.CLOSED=_WS.CLOSED;
}})();
</script>"""

    if "<head>" in html:
        html = html.replace("<head>", "<head>" + ws_script, 1)
    elif "<HEAD>" in html:
        html = html.replace("<HEAD>", "<HEAD>" + ws_script, 1)
    else:
        html = ws_script + html

    return html.encode("utf-8")


@prefix_route(_PROXY_PREFIX, methods=["GET", "POST"])
def proxy_dashboard(ctx):
    """
    全量反向代理 OpenClaw Dashboard。
    将 /openclaw-dashboard/... 映射到 http://localhost:{gw_port}/...
    剥离 CSP/X-Frame-Options 头，使其可以在 iframe 中加载。
    """
    handler = ctx["_handler"]
    port = _gw_state["port"]
    sub_path = ctx.get("sub_path", "")
    query = ctx.get("query", {})
    method = ctx.get("method", "GET")

    # 构建目标 URL
    target_path = sub_path if sub_path else "/"
    if not target_path.startswith("/"):
        target_path = "/" + target_path

    qs_parts = []
    for k, vs in query.items():
        for v in vs:
            qs_parts.append(f"{urllib.parse.quote(k)}={urllib.parse.quote(v)}")
    qs = "&".join(qs_parts)
    target_url = f"http://localhost:{port}{target_path}"
    if qs:
        target_url += f"?{qs}"

    try:
        # 构建请求（不转发 Accept-Encoding 以避免压缩问题）
        req_headers = {}
        for h in ("Accept", "Accept-Language", "Cookie",
                   "Authorization", "Content-Type"):
            val = ctx.get("headers", {}).get(h)
            if val:
                req_headers[h] = val

        # 读取请求体（POST）— 优先使用原始字节，避免 UTF-8 round-trip 损坏二进制数据
        body_data = None
        if method == "POST":
            raw_bytes = ctx.get("_raw_bytes")
            if raw_bytes is not None:
                body_data = raw_bytes
            else:
                raw_body = ctx.get("body", {})
                if isinstance(raw_body, dict) and "_raw" in raw_body:
                    body_data = raw_body["_raw"].encode("utf-8")
                elif raw_body:
                    body_data = json.dumps(raw_body).encode("utf-8")

        req = urllib.request.Request(target_url, data=body_data, headers=req_headers, method=method)
        with urllib.request.urlopen(req, timeout=30) as resp:
            resp_body = resp.read()
            resp_status = resp.status
            resp_headers = resp.headers

        # HTML 响应：注入 WebSocket 重写脚本（代理无法转发 WS）
        ct = (resp_headers.get("Content-Type") or "").lower()
        if "text/html" in ct:
            resp_body = _inject_ws_redirect(resp_body, port)

        # 发送响应，剥离安全限制头
        handler.send_response(resp_status)
        handler._send_cors()

        for key in resp_headers:
            if key.lower() not in _HOP_HEADERS:
                handler.send_header(key, resp_headers[key])

        handler.send_header("Content-Length", str(len(resp_body)))
        handler.end_headers()
        handler.wfile.write(resp_body)
        handler.wfile.flush()
        return STREAMING_HANDLED

    except urllib.error.HTTPError as e:
        body = e.read() if hasattr(e, "read") else b""
        handler.send_response(e.code)
        handler._send_cors()
        handler.send_header("Content-Type", "text/plain")
        handler.send_header("Content-Length", str(len(body)))
        handler.end_headers()
        handler.wfile.write(body)
        handler.wfile.flush()
        return STREAMING_HANDLED
    except Exception as e:
        _log(f"[OpenClaw] Proxy error: {e}")
        err = f"Proxy error: {e}".encode("utf-8")
        handler.send_response(502)
        handler._send_cors()
        handler.send_header("Content-Type", "text/plain")
        handler.send_header("Content-Length", str(len(err)))
        handler.end_headers()
        handler.wfile.write(err)
        handler.wfile.flush()
        return STREAMING_HANDLED


@route("/api/v1/openclaw/get-channels", methods=["GET"])
def get_channels(ctx):
    """获取已连接的 channels"""
    port = _gw_state["port"]
    if _gw_state["status"] != "running":
        return {"channels": []}
    try:
        req = urllib.request.Request(f"http://localhost:{port}/api/channels")
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return {"channels": data.get("channels", [])}
    except Exception:
        return {"channels": []}
