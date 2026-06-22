"""
Motion Generation 路由

支持 text-to-motion (hy-motion-1.0)，通过 Higress 代理调用。
生成 FBX 骨骼动画文件。

流程：
  1. POST /v1/tasks/submit         → 提交任务获取 task_id
  2. GET  /v1/tasks/{task_id}      → 轮询任务状态
  3. GET  /v1/tasks/{task_id}/download/{filename} → 下载 FBX 文件
"""

import json
import os
import shutil
import time
import urllib.error
import urllib.request
import uuid
from typing import Any, Tuple

from ..server import route
from ...core.paths import get_app_data_dir
from ...utils.logger import network_logger

_log = network_logger


def _get_centralized_config() -> Tuple[str, str]:
    """Read Higress API host and key from centralized-config.json."""
    cfg_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        "resources",
        "centralized-config.json",
    )
    try:
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        for p in cfg.get("providers", []):
            if p.get("apiHost") and p.get("apiKey"):
                return p["apiHost"], p["apiKey"]
    except Exception as e:
        _log(f"[generate-motion] Failed to read centralized config: {e}")
    return None, None


def _build_opener(url: str):
    """Build urllib opener with optional proxy support."""
    try:
        from .network import _should_bypass_proxy, _build_opener as _net_build_opener
        bypass = _should_bypass_proxy(url)
        return _net_build_opener(bypass)
    except Exception:
        return urllib.request.build_opener()


def _download_file(url: str, dest_path: str, api_key: str = None, timeout: float = 120.0) -> bool:
    """Download a file from URL to dest_path."""
    try:
        opener = _build_opener(url)
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "Cherry Studio")
        if api_key:
            req.add_header("Authorization", f"Bearer {api_key}")
        with opener.open(req, timeout=timeout) as resp:
            with open(dest_path, "wb") as f:
                shutil.copyfileobj(resp, f)
        return True
    except Exception as e:
        _log(f"[generate-motion] Download failed: {e}")
        return False


def _resolve_api(body: dict) -> Tuple[str, str]:
    """Resolve apiHost/apiKey from request body or centralized config."""
    api_host = body.get("apiHost") or body.get("api_host")
    api_key = body.get("apiKey") or body.get("api_key")
    if not api_host or not api_key:
        cfg_host, cfg_key = _get_centralized_config()
        api_host = api_host or cfg_host
        api_key = api_key or cfg_key
    return api_host, api_key


def _ensure_video_data_url(video_data: str) -> str:
    """Normalize a base64 video payload into a `data:video/<x>;base64,<data>` URL.

    The promptHMR upstream validates `video_base64` with a strict data-URL regex,
    so a raw base64 string must be wrapped with a supported video MIME prefix.
    """
    if video_data.startswith("data:"):
        return video_data
    return f"data:video/mp4;base64,{video_data}"


def _submit_motion_video_json(api_host: str, api_key: str, model: str, prompt: str,
                              n: int, duration: float, seeds: Any,
                              video_data_url: str) -> dict:
    """Submit a video-to-motion task (e.g. promptHMR) via JSON `video_base64`.

    Matches the upstream contract: POST /v1/tasks/submit with a JSON body whose
    `video_base64` is a data URL and `prompt` is non-empty.
    """
    url = f"{api_host.rstrip('/')}/v1/tasks/submit"

    payload: dict = {
        "model": model,
        "prompt": prompt or "generate motion from the input video",
        "video_base64": video_data_url,
        "n": n,
        "duration": duration,
    }
    if seeds:
        payload["seeds"] = seeds

    payload_bytes = json.dumps(payload).encode("utf-8")
    _log(f"[generate-motion] Submitting (video JSON) to {url}, model={model}, "
         f"payload_size={len(payload_bytes)}")

    opener = _build_opener(url)
    req = urllib.request.Request(url, data=payload_bytes, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "Cherry Studio")

    resp = opener.open(req, timeout=120)
    resp_body = resp.read().decode("utf-8")
    data = json.loads(resp_body)
    _log(f"[generate-motion] Submit (video JSON) response: {resp_body[:500]}")
    task_id = data.get("task_id")
    if not task_id:
        return {"error": f"No task_id in response: {resp_body[:300]}"}
    return {"ok": True, "task_id": task_id, "status": data.get("status", "pending")}


@route("/api/v1/generate-motion/submit", methods=["POST"])
def generate_motion_submit(ctx: dict) -> Any:
    """Submit a motion task.

    Two input modes (auto-detected by the presence of `video_data`):
      - text-to-motion (hy-motion): JSON body with `prompt`
      - video-to-motion (promptHMR): `video_data` (base64, raw or data URL) is
        forwarded upstream as JSON `video_base64` (a data URL). Works for both a
        direct connection and through the Higress gateway.

    Request body (JSON):
        {
            "prompt": "a person walking forward",   # optional when video_data given
            "video_data": "data:video/mp4;base64,...",  # optional
            "n": 4,
            "duration": 2.0,
            "seeds": [42, 123, 456, 789],
            "model": "hy-motion-1.0",
            "apiHost": "...", "apiKey": "..."
        }
    """
    body = ctx["body"]

    prompt = (body.get("prompt") or "").strip()
    video_data = (body.get("video_data") or body.get("video") or "").strip()
    if not prompt and not video_data:
        return {"error": "missing prompt or video_data"}

    n = int(body.get("n", 4))
    duration = float(body.get("duration", 2.0))
    seeds = body.get("seeds")
    model = body.get("model", "hy-motion-1.0")

    api_host, api_key = _resolve_api(body)
    if not api_host or not api_key:
        return {"error": "No API configuration found for motion generation"}

    # video-to-motion → JSON with `video_base64` (data URL)
    if video_data:
        try:
            video_data_url = _ensure_video_data_url(video_data)
        except Exception as e:
            return {"error": f"Invalid video_data: {e}"}
        try:
            return _submit_motion_video_json(
                api_host, api_key, model, prompt, n, duration, seeds, video_data_url
            )
        except urllib.error.HTTPError as e:
            err_body = ""
            try:
                err_body = e.read().decode("utf-8", errors="replace")[:500]
            except Exception:
                pass
            _log(f"[generate-motion] Submit (video JSON) HTTP {e.code}: {err_body}")
            return {"error": f"Submit failed ({e.code}): {err_body}"}
        except Exception as e:
            _log(f"[generate-motion] Submit (video JSON) failed: {e}")
            return {"error": str(e)}

    # text-to-motion → JSON
    url = f"{api_host.rstrip('/')}/v1/tasks/submit"
    _log(f"[generate-motion] Submitting to {url}, model={model}, n={n}, duration={duration}")

    payload = {
        "model": model,
        "prompt": prompt,
        "n": n,
        "duration": duration,
    }
    if seeds:
        payload["seeds"] = seeds

    payload_bytes = json.dumps(payload).encode("utf-8")

    opener = _build_opener(url)
    req = urllib.request.Request(url, data=payload_bytes, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "Cherry Studio")

    try:
        resp = opener.open(req, timeout=60)
        resp_body = resp.read().decode("utf-8")
        data = json.loads(resp_body)
        _log(f"[generate-motion] Submit response: {resp_body[:500]}")

        task_id = data.get("task_id")
        if not task_id:
            return {"error": f"No task_id in response: {resp_body[:300]}"}

        return {
            "ok": True,
            "task_id": task_id,
            "status": data.get("status", "pending"),
        }

    except urllib.error.HTTPError as e:
        err_body = ""
        try:
            err_body = e.read().decode("utf-8", errors="replace")[:500]
        except Exception:
            pass
        _log(f"[generate-motion] Submit HTTP {e.code}: {err_body}")
        return {"error": f"Submit failed ({e.code}): {err_body}"}
    except Exception as e:
        _log(f"[generate-motion] Submit failed: {e}")
        return {"error": str(e)}


@route("/api/v1/generate-motion/poll", methods=["POST"])
def generate_motion_poll(ctx: dict) -> Any:
    """Poll task status for a motion generation task.

    Request body (JSON):
        { "task_id": "...", "apiHost": "...", "apiKey": "..." }

    Returns:
        { "status": "pending"|"processing"|"completed"|"failed",
          "files": ["xxx.fbx", ...],
          "progress": 0.5,
          "error_message": "..." }
    """
    body = ctx["body"]
    task_id = body.get("task_id", "").strip()
    if not task_id:
        return {"error": "missing task_id"}

    api_host, api_key = _resolve_api(body)
    if not api_host or not api_key:
        return {"error": "No API configuration found"}

    poll_url = f"{api_host.rstrip('/')}/v1/tasks/{task_id}"

    try:
        opener = _build_opener(poll_url)
        req = urllib.request.Request(poll_url, method="GET")
        req.add_header("Authorization", f"Bearer {api_key}")
        req.add_header("User-Agent", "Cherry Studio")
        resp = opener.open(req, timeout=30)
        resp_body = resp.read().decode("utf-8")
        data = json.loads(resp_body)

        status = str(data.get("status", "pending")).lower()
        _log(f"[generate-motion] Poll {task_id}: status={status}")

        result = {"status": status}

        if status in ("completed", "success", "succeeded", "done"):
            result["status"] = "completed"
            # files can be at top level or nested in "result"
            inner = data.get("result", {}) if isinstance(data.get("result"), dict) else {}
            files = (
                data.get("files")
                or inner.get("files")
                or inner.get("fbx_files")
                or data.get("fbx_files")
                or []
            )
            # Keep only web-previewable 3D outputs: FBX (hy-motion) and GLB (promptHMR).
            motion_files = [
                f for f in files if f.lower().endswith((".fbx", ".glb"))
            ]
            result["files"] = motion_files
            _log(f"[generate-motion] Task {task_id} completed, files: {motion_files}")

        elif status in ("failed", "failure", "error", "cancelled"):
            result["status"] = "failed"
            result["error_message"] = (
                data.get("error") or data.get("message") or "Unknown error"
            )

        progress = data.get("progress")
        if progress is not None:
            result["progress"] = progress

        return result

    except urllib.error.HTTPError as e:
        err_body = ""
        try:
            err_body = e.read().decode("utf-8", errors="replace")[:500]
        except Exception:
            pass
        return {"error": f"Poll HTTP {e.code}: {err_body}"}
    except Exception as e:
        return {"error": f"Poll failed: {e}"}


@route("/api/v1/generate-motion/save", methods=["POST"])
def generate_motion_save(ctx: dict) -> Any:
    """Download and save a single motion/3D file from a completed task.

    Supports FBX (hy-motion) and GLB (promptHMR); the output extension/format is
    derived from the upstream filename.

    Request body (JSON):
        { "task_id": "...", "filename": "xxx.glb", "apiHost": "...", "apiKey": "..." }
    """
    body = ctx["body"]
    task_id = body.get("task_id", "").strip()
    filename = body.get("filename", "").strip()

    if not task_id:
        return {"error": "missing task_id"}
    if not filename:
        return {"error": "missing filename"}

    api_host, api_key = _resolve_api(body)
    if not api_host or not api_key:
        return {"error": "No API configuration found"}

    download_url = (
        f"{api_host.rstrip('/')}/v1/tasks/{task_id}/download/"
        f"{urllib.request.quote(filename, safe='')}"
    )
    _log(f"[generate-motion] Downloading {download_url}")

    # Derive extension/format from the upstream filename (default to .fbx).
    ext = os.path.splitext(filename)[1].lower() or ".fbx"
    fmt = ext.lstrip(".")

    file_id = str(uuid.uuid4())
    session_id = ctx.get("session_id", "") or None
    app_data = get_app_data_dir(session_id=session_id)
    os.makedirs(app_data, exist_ok=True)
    file_path = os.path.join(app_data, f"{file_id}{ext}")

    if not _download_file(download_url, file_path, api_key=api_key):
        return {"error": f"Failed to download motion file: {filename}"}

    file_size = os.path.getsize(file_path) if os.path.exists(file_path) else 0
    _log(f"[generate-motion] Saved: {file_path} ({file_size} bytes)")

    origin_name = filename if filename.lower().endswith(ext) else f"{filename}{ext}"

    return {
        "ok": True,
        "file": {
            "id": file_id,
            "name": f"{file_id}{ext}",
            "origin_name": origin_name,
            "path": file_path.replace("\\", "/"),
            "ext": ext,
            "size": file_size,
            "type": "model_3d",
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        },
        "format": fmt,
    }
