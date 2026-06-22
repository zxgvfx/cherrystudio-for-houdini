"""ai-pipeline-bridge 插件后端路由。

定位：CherryStudio 里的"ai-pipeline 启动器 + 同源透传层"。
设计参考：ai-pipeline ADR-005（Workflow 一等公民）。

这个插件**不做任何业务编排**，只是个触发器 + HTTP 透传层：

  1. 用户在 CherryStudio 点插件图标 → POST /open-gui
  2. 弹 QFileDialog（子进程隔离，避免阻塞 HTTP 线程）
  3. 子进程把图上传成 ai-pipeline asset，再调
     ``POST /api/workflows/{workflow_id}/runs`` 启动 workflow run
  4. 拿到 interactive_url（长期形态下通常指向 ai-pipeline 的 ``/review/``）
  5. 把 url 通过 {open_url:...} 返回给 CherryStudio 前端，前端 iframe 嵌入

bridge 不再硬编码任何 ``node_id``——要跑哪个工作流由 ``workflow_id`` 参数决定，
默认 ``sam3-image-segment-only``。要换工作流（如做"分割→3D"全链路），传不同的
``workflow_id`` 即可，bridge 完全不知道工作流内部有几个节点。

长期形态下，新插件入口跳转到 ai-pipeline ``/launch/``，由 ai-pipeline 自己完成
上传、启动、审阅和 delivery。这里保留的 /run /resume /deliver* 等端点仅用于旧入口
兼容和本地 DCC adapter 实验。
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from typing import Any

from cherrystudio.backend.pipeline_bridge_static import register_plugins_ui_static
from cherrystudio.backend.server import STREAMING_HANDLED, route
from cherrystudio.utils.logger import network_logger

_log = network_logger
_PLUGIN_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_GUI_HELPER = os.path.join(_PLUGIN_DIR, "pipeline_open_gui.py")
_FRONTEND_DIR = os.path.join(_PLUGIN_DIR, "frontend")
# 前端 webview：默认静态页见 ``/plugins-ui/ai-pipeline-bridge``；
# 它会列出 server 上所有 workflow。各工作流薄插件仅作为旧入口兼容保留。
_WEB_PREFIX = "/plugins-ui/ai-pipeline-bridge"

_log(f"[ai-pipeline-bridge] routes.py loaded; PLUGIN_DIR={_PLUGIN_DIR}; FRONTEND_DIR={_FRONTEND_DIR}; index.html exists={os.path.isfile(os.path.join(_FRONTEND_DIR, 'index.html'))}; helper exists={os.path.isfile(_GUI_HELPER)}")

register_plugins_ui_static(_WEB_PREFIX, _FRONTEND_DIR)


# ─────────────────────────────────────────────
# 配置加载（按优先级）
#   1. 环境变量 PIPELINE_API_BASE
#   2. ~/.cherrystudio/ai-pipeline-bridge.json 里的 api_base
#   3. 兜底默认值
# ─────────────────────────────────────────────

_DEFAULT_API_BASE = "http://192.168.21.225:9331"


def _config_path() -> str:
    return os.path.join(
        os.path.expanduser("~"), ".cherrystudio", "ai-pipeline-bridge.json"
    )


def _load_config() -> dict:
    p = _config_path()
    if os.path.isfile(p):
        try:
            with open(p, "r", encoding="utf-8") as f:
                return json.load(f) or {}
        except Exception as exc:
            _log(f"[ai-pipeline-bridge] 配置文件读取失败 {p}: {exc}")
    return {}


def _api_base() -> str:
    env = os.environ.get("PIPELINE_API_BASE")
    if env:
        return env.rstrip("/")
    cfg = _load_config().get("api_base")
    if cfg:
        return str(cfg).rstrip("/")
    return _DEFAULT_API_BASE


# ─────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────

@route("/api/v1/plugins/ai-pipeline-bridge/health", methods=["GET"])
def health(ctx: dict) -> Any:
    """检查 ai-pipeline API 可达性，给前端启动诊断用。"""
    api_base = _api_base()
    ok = False
    detail = ""
    try:
        with urllib.request.urlopen(f"{api_base}/api/nodes", timeout=3) as resp:
            ok = resp.status == 200
            detail = f"HTTP {resp.status}"
    except Exception as exc:
        detail = f"{type(exc).__name__}: {exc}"
    return {
        "plugin_id": "ai-pipeline-bridge",
        "api_base": api_base,
        "available": ok,
        "detail": detail,
    }


@route("/api/v1/plugins/ai-pipeline-bridge/open-gui", methods=["POST"])
def open_gui(ctx: dict) -> Any:
    """插件图标点击的入口。

    流程：
      子进程弹 QFileDialog → 用户选图 → 子进程 stdout 输出 JSON：
        {"path": "...", "interactive_url": "..."} 或 {"error": "..."}
      路由解析 → 同时 webbrowser.open（兜底）→ 返回 {open_url} 给 CherryStudio 前端
    """
    api_base = _api_base()
    body = ctx.get("body") or {}

    if not os.path.isfile(_GUI_HELPER):
        return {"error": f"GUI helper missing: {_GUI_HELPER}"}

    args = [
        sys.executable, _GUI_HELPER,
        "--api-base", api_base,
    ]
    # workflow_id：调用方可指定要起哪个工作流（默认 sam3-image-segment-only）；
    # 后续要做"分割→3D"全链路，调用 /open-gui 时传 workflow_id="sam3-image-to-3d" 即可。
    workflow_id = body.get("workflow_id")
    if workflow_id:
        args += ["--workflow-id", str(workflow_id)]
    # 透传 cherrystudio 当前用户名，让 mask asset 的 audit 字段能写出"谁操作的"
    operator = body.get("operator") or os.environ.get("USER") or os.environ.get("USERNAME")
    if operator:
        args += ["--operator", str(operator)]

    # 让子进程的 stdout/stderr 也强制走 utf-8（Houdini Python on Windows 默认 cp936，
    # 子进程内部已 reconfigure，这里再加 PYTHONIOENCODING 双保险，防止有些子流程拿不到 reconfigure）
    env = dict(os.environ)
    env.setdefault("PYTHONIOENCODING", "utf-8")
    try:
        proc = subprocess.run(
            args, capture_output=True, text=True, timeout=300,
            encoding="utf-8", errors="replace", env=env,
        )
    except subprocess.TimeoutExpired:
        return {"error": "用户在 5 分钟内没有完成文件选择，已取消"}
    except Exception as exc:
        _log(f"[ai-pipeline-bridge] subprocess 启动失败: {exc}")
        return {"error": f"GUI helper 启动失败: {exc}"}

    if proc.returncode != 0:
        # helper 自己捕获不到的崩溃（QApplication 初始化失败之类）
        _log(f"[ai-pipeline-bridge] GUI helper 退出码={proc.returncode}\nSTDOUT:\n{proc.stdout}\nSTDERR:\n{proc.stderr}")
        return {
            "error": "GUI helper 异常退出",
            "stderr": (proc.stderr or "").strip()[-2000:],
        }

    # helper 成功的话最后一行是 JSON
    last_line = (proc.stdout or "").strip().splitlines()[-1] if proc.stdout else ""
    try:
        data = json.loads(last_line)
    except Exception:
        _log(f"[ai-pipeline-bridge] helper 输出不是 JSON:\n{proc.stdout}")
        return {"error": "GUI helper 输出格式错误", "raw": proc.stdout[-1000:]}

    if "error" in data:
        return {"error": data["error"]}

    interactive_url = data.get("interactive_url")

    # 是否用系统浏览器兜底打开？
    # body.open_in_browser=True 显式要求系统浏览器（命令行 / 测试场景），
    # 默认 False —— 由前端 webview iframe 嵌入展示（Cherry 管），避免双开。
    if interactive_url and bool(body.get("open_in_browser", False)):
        try:
            webbrowser.open(interactive_url, new=2)
        except Exception as exc:
            _log(f"[ai-pipeline-bridge] webbrowser.open 失败（已忽略）: {exc}")

    return {
        "ok": True,
        "plugin_id": "ai-pipeline-bridge",
        # open_url 长期形态下通常是 ai-pipeline /review/ 壳 URL；
        # Cherry 不再复刻「完成审阅 / 重试 / before approve hook」逻辑。
        "open_url": interactive_url,
        "run_id": data.get("run_id"),
        # 工作流元数据：前端用 workflow_id 显示当前在跑哪个工作流；trace_id 用于
        # 多 run 接力时按业务族谱拉所有相关 run（GET /api/workflows/runs?trace_id=）
        "workflow_id": data.get("workflow_id"),
        "workflow_version": data.get("workflow_version"),
        "trace_id": data.get("trace_id"),
        "image_path": data.get("path"),
        "api_base": api_base,
        # mode 标识只是提示，不影响后续逻辑：
        #   - webview_iframe（默认）：前端会把 open_url 嵌 iframe
        #   - external_browser：调用方自己 open(open_url)
        "mode": "external_browser" if body.get("open_in_browser") else "webview_iframe",
    }


@route("/api/v1/plugins/ai-pipeline-bridge/workflows", methods=["GET"])
def list_workflows(ctx: dict) -> Any:
    """列出 ai-pipeline 所有可用工作流，前端用于"接力下一工作流"选择面板。

    透传到 ai-pipeline ``GET /api/workflows``。可选 ``?tag=`` 过滤。

    取代了上一版按节点推荐的 ``/next-suggestions``——现在编排是工作流级的，
    bridge 不预设"哪些工作流可以接力哪些"，由用户从全部工作流里选。
    """
    query = ctx.get("query") or {}
    tag = query.get("tag")
    if isinstance(tag, list):
        tag = tag[0] if tag else None
    api_base = _api_base()
    url = f"{api_base}/api/workflows"
    if tag:
        url += f"?tag={urllib.parse.quote(str(tag))}"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
        return {"ok": True, "workflows": payload}
    except Exception as exc:
        return {"error": f"调用 ai-pipeline 失败: {exc}", "url": url}


# 注：/continue 路由（接力下一工作流）已下线 —— cherry 不做后处理。
# 接力 / 产物预览 / delivery ACK 这些都收口到 ai-pipeline 主控台 (web)。
# bridge 只负责：列工作流（/workflows）+ 启动（/open-gui）+ 显示工具页（webview）+
# 转发 HITL 续跑（/resume）+ 轮询 run 状态拿到终态后退出（/run）。


@route("/api/v1/plugins/ai-pipeline-bridge/run", methods=["GET"])
def get_run(ctx: dict) -> Any:
    """前端轮询 run 状态用，透传到 ai-pipeline ``GET /api/workflows/runs/{run_id}``。

    走插件后端转发的好处：所有 HTTP 都同源，绕开 CherryStudio webview 对跨源
    fetch 偶发的拦截（CORS 在某些 BrowserView 实现里即使响应头允许 * 也会被预检
    阶段拦掉，比标准浏览器更严）。
    """
    query = ctx.get("query") or {}
    run_id = query.get("run_id")
    if isinstance(run_id, list):
        run_id = run_id[0] if run_id else ""
    if not run_id:
        return {"error": "missing run_id"}
    api_base = _api_base()
    url = f"{api_base}/api/workflows/runs/{run_id}"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            run = json.loads(resp.read().decode("utf-8"))
        return {"ok": True, "run": run}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        return {"error": f"HTTP {exc.code}: {detail}", "url": url}
    except Exception as exc:
        return {"error": f"调用 ai-pipeline 失败: {exc}", "url": url}


@route("/api/v1/plugins/ai-pipeline-bridge/resume", methods=["POST"])
def resume(ctx: dict) -> Any:
    """兼容旧 Cherry 审阅壳：透传到 ai-pipeline 的 resume 端点。

    走插件后端转发的好处：所有 HTTP 都同源，绕开 CherryStudio webview 对跨源
    fetch 偶发的拦截（CORS preflight 在某些 BrowserView 实现里会 abort）。

    Body::

        {
          "run_id": "<uuid>",
          "payload": {"action": "approve", "mask_asset_id": "...", ...}
        }

    返回：透传 ai-pipeline ``POST /api/workflows/runs/{run_id}/resume`` 的响应
    （含新 status / interactive_url 等），加 ``ok``、``error`` 包装。
    """
    body = ctx.get("body") or {}
    run_id = body.get("run_id")
    payload = body.get("payload") or {}
    if not run_id:
        return {"error": "missing run_id"}
    api_base = _api_base()
    url = f"{api_base}/api/workflows/runs/{run_id}/resume"
    req = urllib.request.Request(
        url=url,
        data=json.dumps({"payload": payload}).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            run = json.loads(resp.read().decode("utf-8"))
        return {"ok": True, "run": run}
    except urllib.error.HTTPError as exc:  # type: ignore[attr-defined]
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        return {"error": f"HTTP {exc.code}: {detail}", "url": url}
    except Exception as exc:
        return {"error": f"调用 ai-pipeline resume 失败: {exc}", "url": url}


# ─────────────────────────────────────────────
# Delivery：把 ai-pipeline 的产物（usd / image / mask…）落到客户机本地，
# 让前端能渲染"可拖入 DCC"的卡片。
#
# 为什么落盘？
#   HTML5 拖拽要求 dataTransfer 里挂的是真实可访问的 file:// URI 或者
#   带 DownloadURL MIME 的 lazy 下载源。我们走 file:// 路线（简单、Maya 受用），
#   所以必须先把 asset 拉到客户机磁盘上再交给前端。
#
# 缓存目录：~/.cherrystudio/ai-pipeline-bridge/cache/<run_id>/<asset_id>__<safe_name>
#   - run_id 分目录，方便清理
#   - asset_id 前缀避免同名覆盖（不同 run 跑出同名 person_0.usd）
# ─────────────────────────────────────────────

_CACHE_DIR = os.path.join(
    os.path.expanduser("~"), ".cherrystudio", "ai-pipeline-bridge", "cache"
)


def _safe_filename(name: str) -> str:
    keep = "._- "
    return "".join(c if c.isalnum() or c in keep else "_" for c in (name or "asset")).strip() or "asset"


@route("/api/v1/plugins/ai-pipeline-bridge/deliverables", methods=["GET"])
def get_deliverables(ctx: dict) -> Any:
    """透传 ai-pipeline ``GET /api/runs/{run_id}/deliverables``。

    返回 DeliveryTaskSchema（含 deliverables 列表，每个有 download_url / name /
    asset_type / size_bytes）。前端拿到后，对每个产物再调 /cache-deliverable
    把文件落到客户机本地，然后渲染可拖拽卡。
    """
    query = ctx.get("query") or {}
    run_id = query.get("run_id")
    if isinstance(run_id, list):
        run_id = run_id[0] if run_id else ""
    if not run_id:
        return {"error": "missing run_id"}
    api_base = _api_base()
    url = f"{api_base}/api/runs/{run_id}/deliverables"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            task = json.loads(resp.read().decode("utf-8"))
        return {"ok": True, "task": task}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        return {"error": f"HTTP {exc.code}: {detail}", "url": url}
    except Exception as exc:
        return {"error": f"调用 ai-pipeline 失败: {exc}", "url": url}


@route("/api/v1/plugins/ai-pipeline-bridge/cache-deliverable", methods=["POST"])
def cache_deliverable(ctx: dict) -> Any:
    """把单个 deliverable 下载到客户机本地，返回本地绝对路径。

    Body::

        {
          "run_id": "...",
          "asset_id": "...",
          "name": "person_0.usd",
          "download_url": "http://192.168.21.225:9331/api/assets/<asset_id>/raw"
        }

    返回::

        {
          "ok": true,
          "local_path": "C:\\Users\\xx\\.cherrystudio\\ai-pipeline-bridge\\cache\\<run>\\<aid>__person_0.usd",
          "size_bytes": 12345,
          "cached": true | false
        }

    cached=true 表示这次是命中缓存（同 asset_id 已下载过）；用大小一致做幂等校验。
    """
    body = ctx.get("body") or {}
    run_id = str(body.get("run_id") or "").strip()
    asset_id = str(body.get("asset_id") or "").strip()
    name = str(body.get("name") or "").strip() or "asset.bin"
    dl_url = str(body.get("download_url") or "").strip()
    if not run_id or not asset_id or not dl_url:
        return {"error": "missing run_id / asset_id / download_url"}

    # download_url 可能是相对路径，拼一下 api_base
    if dl_url.startswith("/"):
        dl_url = _api_base() + dl_url

    target_dir = os.path.join(_CACHE_DIR, _safe_filename(run_id))
    try:
        os.makedirs(target_dir, exist_ok=True)
    except Exception as exc:
        return {"error": f"创建缓存目录失败: {exc}", "target_dir": target_dir}

    local_path = os.path.join(target_dir, f"{_safe_filename(asset_id)}__{_safe_filename(name)}")

    if os.path.isfile(local_path) and os.path.getsize(local_path) > 0:
        return {
            "ok": True,
            "local_path": local_path,
            "size_bytes": os.path.getsize(local_path),
            "cached": True,
        }

    try:
        req = urllib.request.Request(dl_url, headers={"Accept": "*/*"})
        with urllib.request.urlopen(req, timeout=120) as resp, open(local_path, "wb") as f:
            while True:
                chunk = resp.read(64 * 1024)
                if not chunk:
                    break
                f.write(chunk)
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:300]
        return {"error": f"下载失败 HTTP {exc.code}: {detail}", "url": dl_url}
    except Exception as exc:
        return {"error": f"下载失败: {exc}", "url": dl_url}

    return {
        "ok": True,
        "local_path": local_path,
        "size_bytes": os.path.getsize(local_path),
        "cached": False,
    }


@route("/api/v1/plugins/ai-pipeline-bridge/deliver-ack", methods=["POST"])
def deliver_ack(ctx: dict) -> Any:
    """用户成功把卡片拖进 DCC 后，前端调本路由 → 转发 ai-pipeline 的
    ``POST /api/runs/{run_id}/deliver`` (target=download) 然后 ``/deliver/ack``，
    把 DeliveryTask 状态推到 delivered，run.status 变成 delivered。

    Body: {"run_id": "...", "target": "download" | "maya" | "houdini" | ...}
    """
    body = ctx.get("body") or {}
    run_id = str(body.get("run_id") or "").strip()
    target = str(body.get("target") or "download").strip() or "download"
    if not run_id:
        return {"error": "missing run_id"}
    api_base = _api_base()

    def _post(path: str, payload: dict) -> tuple[int, str]:
        req = urllib.request.Request(
            url=f"{api_base}{path}",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")

    try:
        # 1) 先 choose_target
        try:
            _post(f"/api/runs/{run_id}/deliver", {"target": target, "options": {}})
        except urllib.error.HTTPError as exc:
            # 409 = 已 chosen / 已 delivered，可以接着调 ack；其它真错误
            if exc.code != 409:
                raise
        # 2) 再 ack
        status, body_text = _post(
            f"/api/runs/{run_id}/deliver/ack",
            {"success": True, "result": {"via": "cherry-bridge", "target": target}},
        )
        return {"ok": True, "task": json.loads(body_text)}
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")[:500]
        return {"error": f"HTTP {exc.code}: {detail}"}
    except Exception as exc:
        return {"error": f"deliver-ack 失败: {exc}"}


_log(
    f"[ai-pipeline-bridge] all routes registered: prefix={_WEB_PREFIX}, "
    "api=/api/v1/plugins/ai-pipeline-bridge/{health,open-gui,workflows,run,resume,"
    "deliverables,cache-deliverable,deliver-ack}"
)
