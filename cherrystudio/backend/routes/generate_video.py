"""
Video Generation 路由（经 NewAPI → Higress video-adapter → Atlas）

NewAPI 不接受 Atlas 原生 `/api/v1/model/*`（会 404 Invalid URL），
因此走 OpenAI Videos 兼容路径（与 NewAPI Sora/OpenAI TaskAdaptor 一致）：

  POST {apiHost}/v1/videos
  GET  {apiHost}/v1/videos/{id}

Cherry 本地仍暴露：
  1. POST /api/v1/generate-video/submit  → 提交，返回 task_id
  2. POST /api/v1/generate-video/poll    → 轮询，完成后给出 video_url
  3. POST /api/v1/generate-video/save    → 下载 MP4，可选转 WebM 供 Qt 预览
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from typing import Any, Optional, Tuple

from ..server import route
from ...core.paths import get_app_data_dir
from ...utils.logger import network_logger

_log = network_logger

# NewAPI-recognized paths (NOT Atlas native /api/v1/model/*)
_GENERATE_PATH = "/v1/videos"
_POLL_PREFIX = "/v1/videos"

_DEFAULT_MODEL = "seedance-2.0-mini@atl"
_DEFAULT_DURATION = 5
_DEFAULT_RESOLUTION = "720p"
_DEFAULT_RATIO = "adaptive"

# Atlas 官网实测（Seedance Mini T2V，10s）：480p=$0.564805，720p=$1.121464
# → $/s。NewAPI「按次」单价请设为 _RATE_480P；billing_seconds 相对 480p 缩放。
# bitrate_mode / watermark / return_last_frame：官网与文档均不影响单价。
_RATE_480P = 0.564805 / 10.0  # 0.0564805
_RATE_720P = 1.121464 / 10.0  # 0.1121464
_REF_RATE = _RATE_480P


def _resolution_rate(resolution: str) -> float:
    res = (resolution or "").strip().lower()
    if res == "480p":
        return _RATE_480P
    if res == "720p":
        return _RATE_720P
    return _REF_RATE


def _billing_seconds(duration: int, resolution: str) -> int:
    """NewAPI OtherRatios.seconds — 按次=480p 单价时，费用≈单价×billing_seconds×分组。"""
    if duration <= 0:
        duration = _DEFAULT_DURATION
    factor = _resolution_rate(resolution) / _REF_RATE
    return max(1, int(round(duration * factor)))


def _estimate_usage_tokens(duration: int, resolution: str) -> int:
    """Synthetic completion_tokens：480p 基线 duration*1000，720p ≈×2。"""
    if duration <= 0:
        duration = _DEFAULT_DURATION
    factor = _resolution_rate(resolution) / _REF_RATE
    return max(1, int(round(duration * 1000 * factor)))


def _get_centralized_config() -> Tuple[Optional[str], Optional[str]]:
    """Read API host and key from centralized-config.json."""
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
        _log(f"[generate-video] Failed to read centralized config: {e}")
    return None, None


def _build_opener(url: str):
    try:
        from .network import _should_bypass_proxy, _build_opener as _net_build_opener

        bypass = _should_bypass_proxy(url)
        return _net_build_opener(bypass)
    except Exception:
        return urllib.request.build_opener()


def _resolve_api(body: dict) -> Tuple[Optional[str], Optional[str]]:
    api_host = body.get("apiHost") or body.get("api_host")
    api_key = body.get("apiKey") or body.get("api_key")
    if not api_host or not api_key:
        cfg_host, cfg_key = _get_centralized_config()
        api_host = api_host or cfg_host
        api_key = api_key or cfg_key
    return api_host, api_key


def _resolve_download_proxy() -> Optional[str]:
    try:
        from ...core.secure_config import get_secure_proxy, is_hardcoded_proxy_enabled

        if is_hardcoded_proxy_enabled():
            return get_secure_proxy().get("proxyUrl") or None
    except Exception as e:
        _log(f"[generate-video] secure_config proxy unavailable: {e}")
    return None


def _build_download_opener(proxy_url: Optional[str]):
    if not proxy_url:
        return None
    import ssl as _ssl

    try:
        ctx = _ssl._create_unverified_context()
        handlers = [
            urllib.request.HTTPSHandler(context=ctx),
            urllib.request.ProxyHandler({"http": proxy_url, "https": proxy_url}),
        ]
        return urllib.request.build_opener(*handlers)
    except Exception as e:
        _log(f"[generate-video] build download opener failed: {e}")
        return None


def _download_file(
    url: str,
    dest_path: str,
    timeout: float = 300.0,
    proxy_url: Optional[str] = None,
) -> Tuple[bool, str]:
    try:
        opener = _build_download_opener(proxy_url) or _build_opener(url)
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "Cherry Studio")
        with opener.open(req, timeout=timeout) as resp:
            with open(dest_path, "wb") as f:
                shutil.copyfileobj(resp, f)
        return True, ""
    except Exception as e:
        host = ""
        try:
            host = url.split("//")[-1].split("/")[0]
        except Exception:
            pass
        msg = f"download failed from {host or url[:80]}: {e}"
        _log(f"[generate-video] {msg}")
        return False, msg


def _http_get_json(url: str, api_key: str, timeout: float = 60.0) -> dict:
    opener = _build_opener(url)
    req = urllib.request.Request(url, method="GET")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("User-Agent", "Cherry Studio")
    req.add_header("Accept", "application/json")
    resp = opener.open(req, timeout=timeout)
    return json.loads(resp.read().decode("utf-8"))


def _extract_data(envelope: dict) -> dict:
    if not isinstance(envelope, dict):
        return {}
    data = envelope.get("data")
    if isinstance(data, dict):
        return data
    return envelope


def _extract_prediction_id(envelope: dict) -> str:
    data = _extract_data(envelope)
    for key in ("id", "prediction_id", "predictionId", "task_id", "taskId"):
        val = data.get(key) or envelope.get(key)
        if val:
            return str(val)
    return ""


def _extract_video_url(envelope: dict) -> str:
    data = _extract_data(envelope)
    outputs = data.get("outputs") or envelope.get("outputs")
    if isinstance(outputs, list) and outputs:
        first = outputs[0]
        if isinstance(first, str) and first.startswith("http"):
            return first
        if isinstance(first, dict):
            for key in ("url", "video_url", "download_url", "output"):
                val = first.get(key)
                if isinstance(val, str) and val.startswith("http"):
                    return val
    for key in ("video_url", "download_url", "url", "output"):
        val = data.get(key) or envelope.get(key)
        if isinstance(val, str) and val.startswith("http"):
            return val
    return ""


def _extract_error_message(envelope: dict) -> str:
    data = _extract_data(envelope)
    err = data.get("error") or envelope.get("error")
    if isinstance(err, dict):
        msg = err.get("message") or err.get("msg")
        if msg:
            return str(msg)
    if isinstance(err, str) and err.strip():
        return err
    for key in ("error_message", "message", "msg"):
        val = data.get(key) or envelope.get(key)
        if isinstance(val, str) and val.strip():
            return val
    return "Video generation failed"


@route("/api/v1/generate-video/submit", methods=["POST"])
def generate_video_submit(ctx: dict) -> Any:
    """Submit an Atlas generateVideo task (async).

    Request body (JSON):
        {
            "prompt": "...",
            "model": "seedance-2.0-mini@atl",
            "duration": 5,
            "resolution": "720p",
            "ratio": "adaptive",
            "generate_audio": true,
            "watermark": false,
            "apiHost": "...", "apiKey": "..."
        }
    """
    body = ctx["body"] or {}
    prompt = (body.get("prompt") or "").strip()
    if not prompt:
        return {"error": "missing prompt"}

    model_id = (body.get("model") or _DEFAULT_MODEL).strip() or _DEFAULT_MODEL
    try:
        duration = int(body.get("duration") if body.get("duration") is not None else _DEFAULT_DURATION)
    except (TypeError, ValueError):
        duration = _DEFAULT_DURATION
    if duration != -1 and (duration < 4 or duration > 15):
        duration = _DEFAULT_DURATION

    resolution = (body.get("resolution") or _DEFAULT_RESOLUTION).strip() or _DEFAULT_RESOLUTION
    ratio = (body.get("ratio") or _DEFAULT_RATIO).strip() or _DEFAULT_RATIO
    generate_audio = body.get("generate_audio", True)
    watermark = body.get("watermark", False)
    return_last_frame = body.get("return_last_frame", False)
    bitrate_mode = (body.get("bitrate_mode") or "standard").strip().lower()
    if bitrate_mode not in ("standard", "high"):
        bitrate_mode = "standard"

    api_host, api_key = _resolve_api(body)
    if not api_host or not api_key:
        return {"error": "No API configuration found for video generation"}

    url = f"{api_host.rstrip('/')}{_GENERATE_PATH}"
    # NewAPI Task 计费读 seconds；Atlas 真实时长用 duration（适配器优先 duration）。
    billing_seconds = _billing_seconds(duration, resolution)
    usage_tokens = _estimate_usage_tokens(duration, resolution)
    payload = {
        "model": model_id,
        "prompt": prompt,
        # OpenAI Videos / NewAPI Sora fields
        "seconds": str(billing_seconds),
        "duration": duration,
        "resolution": resolution,
        "ratio": ratio,
        "generate_audio": bool(generate_audio),
        "watermark": bool(watermark),
        "return_last_frame": bool(return_last_frame),
        "bitrate_mode": bitrate_mode,
        "metadata": {
            "resolution": resolution,
            "ratio": ratio,
            "generate_audio": bool(generate_audio),
            "watermark": bool(watermark),
            "return_last_frame": bool(return_last_frame),
            "bitrate_mode": bitrate_mode,
            "atlas_duration": duration,
            "billing_seconds": billing_seconds,
        },
    }
    if body.get("seed") is not None:
        try:
            payload["seed"] = int(body.get("seed"))
            payload["metadata"]["seed"] = payload["seed"]
        except (TypeError, ValueError):
            pass

    _log(
        f"[generate-video] Submitting NewAPI /v1/videos to {url}, "
        f"model={model_id}, duration={duration}, billing_seconds={billing_seconds}, "
        f"resolution={resolution}, ratio={ratio}, bitrate={bitrate_mode}"
    )

    payload_bytes = json.dumps(payload).encode("utf-8")
    opener = _build_opener(url)
    req = urllib.request.Request(url, data=payload_bytes, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/json")
    req.add_header("User-Agent", "Cherry Studio")

    try:
        resp = opener.open(req, timeout=120)
        resp_body = resp.read().decode("utf-8")
        data = json.loads(resp_body)
        _log(f"[generate-video] Submit response: {resp_body[:500]}")

        prediction_id = _extract_prediction_id(data)
        if not prediction_id:
            return {"error": f"No prediction id in response: {resp_body[:300]}"}

        # FE still expects task_id；附带 usage 供右下角费用展示 / last-cost 匹配
        return {
            "ok": True,
            "task_id": prediction_id,
            "prediction_id": prediction_id,
            "duration": duration,
            "resolution": resolution,
            "billing_seconds": billing_seconds,
            "usage": {
                "prompt_tokens": 0,
                "completion_tokens": usage_tokens,
                "total_tokens": usage_tokens,
            },
        }

    except urllib.error.HTTPError as e:
        err_body = ""
        try:
            err_body = e.read().decode("utf-8", errors="replace")[:500]
        except Exception:
            pass
        _log(f"[generate-video] Submit HTTP {e.code}: {err_body}")
        return {"error": f"Submit failed ({e.code}): {err_body}"}
    except Exception as e:
        _log(f"[generate-video] Submit failed: {e}")
        return {"error": str(e)}


@route("/api/v1/generate-video/poll", methods=["POST"])
def generate_video_poll(ctx: dict) -> Any:
    """Poll NewAPI /v1/videos/{id} (OpenAI Videos / Sora shape).

    Request body (JSON):
        { "task_id": "<id>", "apiHost": "...", "apiKey": "..." }

    Returns:
        { "status": "pending"|"processing"|"completed"|"failed",
          "video_url": "https://...",
          "error_message": "..." }
    """
    body = ctx["body"] or {}
    task_id = (body.get("task_id") or body.get("prediction_id") or "").strip()
    if not task_id:
        return {"error": "missing task_id"}

    api_host, api_key = _resolve_api(body)
    if not api_host or not api_key:
        return {"error": "No API configuration found"}

    poll_url = f"{api_host.rstrip('/')}/{_POLL_PREFIX.strip('/')}/{urllib.parse.quote(task_id, safe='')}"

    try:
        envelope = _http_get_json(poll_url, api_key)
        data = _extract_data(envelope)
        status = str(data.get("status") or envelope.get("status") or "").lower()
        _log(f"[generate-video] Poll {task_id}: status={status or '(empty)'}")

        result: dict = {"status": "processing"}

        if status in ("completed", "succeeded", "success", "done", "finished"):
            video_url = _extract_video_url(envelope)
            if not video_url:
                # NewAPI may expose download via content proxy when url is omitted
                content_proxy = f"{api_host.rstrip('/')}/v1/videos/{urllib.parse.quote(task_id, safe='')}/content"
                video_url = content_proxy
            result["status"] = "completed"
            result["video_url"] = video_url

        elif status in ("failed", "fail", "failure", "error", "cancelled", "canceled"):
            result["status"] = "failed"
            result["error_message"] = _extract_error_message(envelope)
        else:
            # queued / pending / in_progress / processing
            result["status"] = "processing"

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


def _find_ffmpeg() -> str:
    try:
        import imageio_ffmpeg  # type: ignore

        exe = imageio_ffmpeg.get_ffmpeg_exe()
        if exe and os.path.isfile(exe):
            return exe
    except Exception:
        pass
    return shutil.which("ffmpeg") or ""


def _transcode_to_webm(src_path: str, dst_path: str) -> Tuple[bool, str]:
    ffmpeg = _find_ffmpeg()
    if not ffmpeg:
        return False, "ffmpeg not found"

    cmd = [
        ffmpeg,
        "-y",
        "-i",
        src_path,
        "-c:v",
        "libvpx-vp9",
        "-b:v",
        "0",
        "-crf",
        "32",
        "-row-mt",
        "1",
        "-deadline",
        "good",
        "-cpu-used",
        "4",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "libopus",
        "-b:a",
        "96k",
        dst_path,
    ]
    creationflags = 0
    if os.name == "nt":
        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
    try:
        proc = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=300,
            creationflags=creationflags,
        )
        if proc.returncode != 0:
            tail = (proc.stderr or b"").decode("utf-8", errors="replace")[-300:]
            return False, f"ffmpeg exited {proc.returncode}: {tail}"
        if not (os.path.isfile(dst_path) and os.path.getsize(dst_path) > 0):
            return False, "ffmpeg produced empty output"
        return True, ""
    except subprocess.TimeoutExpired:
        return False, "ffmpeg transcode timed out"
    except Exception as e:
        return False, f"ffmpeg transcode error: {e}"


@route("/api/v1/generate-video/save", methods=["POST"])
def generate_video_save(ctx: dict) -> Any:
    """Download generated MP4 and optionally transcode to WebM for Qt preview."""
    body = ctx["body"] or {}
    video_url = (body.get("video_url") or "").strip()
    if not video_url:
        return {"error": "missing video_url"}

    download_proxy = _resolve_download_proxy()
    if download_proxy:
        _log("[generate-video] Using managed download proxy")

    file_id = str(uuid.uuid4())
    ext = ".mp4"
    app_data = get_app_data_dir()
    os.makedirs(app_data, exist_ok=True)
    file_path = os.path.join(app_data, f"{file_id}{ext}")

    _log(f"[generate-video] Downloading {video_url[:120]} -> {file_path}")
    ok, dl_error = _download_file(video_url, file_path, proxy_url=download_proxy)
    if not ok:
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception:
            pass
        return {"error": f"Failed to download generated video: {dl_error}", "video_url": video_url}

    file_size = os.path.getsize(file_path) if os.path.exists(file_path) else 0
    _log(f"[generate-video] Saved: {file_path} ({file_size} bytes)")

    if file_size <= 0:
        try:
            os.remove(file_path)
        except Exception:
            pass
        return {"error": "Downloaded video is empty (0 bytes)", "video_url": video_url}

    mp4_name = f"{file_id}{ext}"
    preview_name = mp4_name
    webm_path = os.path.join(app_data, f"{file_id}.webm")
    ok_webm, webm_error = _transcode_to_webm(file_path, webm_path)
    if ok_webm:
        preview_name = f"{file_id}.webm"
        _log(f"[generate-video] Transcoded preview: {webm_path} ({os.path.getsize(webm_path)} bytes)")
    else:
        _log(f"[generate-video] WebM transcode skipped/failed, serving mp4: {webm_error}")

    return {
        "ok": True,
        "file": {
            "id": file_id,
            "name": preview_name,
            "origin_name": mp4_name,
            "download_name": mp4_name,
            "path": file_path.replace("\\", "/"),
            "ext": ext,
            "size": file_size,
            "type": "video",
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        },
    }
