"""
Video Generation 路由

支持 text-to-video（如 MiniMax-Hailuo-2.3），通过 gpt.ge / new-api 网关代理调用 MiniMax 海螺视频接口。
生成 MP4 视频文件。

流程（异步任务）：
  1. POST /api/v1/generate-video/submit  → 提交任务获取 task_id
  2. POST /api/v1/generate-video/poll    → 轮询任务状态，成功时解析出 video_url
  3. POST /api/v1/generate-video/save    → 下载 MP4 到本地，返回可通过 /api/v1/files/serve 播放的文件信息

上游接口（参考 https://api-gpt-ge.apifox.cn/352441157e0）：
  - POST {apiHost}/task/minimax/v1/video_generation
      body: { model, prompt, duration, resolution, prompt_optimizer }
      resp: { task_id, base_resp: { status_code, status_msg } }
  - GET  {apiHost}/task/{task_id}
      resp: { status, file_id | video_url | download_url, ... }
  - GET  {apiHost}/task/minimax/v1/files/retrieve?file_id=...
      resp: { file: { download_url } }
"""

import json
import os
import re
import shutil
import subprocess
import time
import urllib.error
import urllib.request
import uuid
from typing import Any, Optional, Tuple

from ..server import route
from ...core.paths import get_app_data_dir
from ...utils.logger import network_logger

_log = network_logger

# 上游网关的 MiniMax 任务前缀（gpt.ge / new-api 兼容）
_TASK_PREFIX = "/task/minimax/v1"

# 默认参数（当模型名未编码分辨率/时长时使用）
_DEFAULT_RESOLUTION = "768P"
_DEFAULT_DURATION = 6


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
    """Build urllib opener with optional proxy support."""
    try:
        from .network import _should_bypass_proxy, _build_opener as _net_build_opener
        bypass = _should_bypass_proxy(url)
        return _net_build_opener(bypass)
    except Exception:
        return urllib.request.build_opener()


def _resolve_api(body: dict) -> Tuple[Optional[str], Optional[str]]:
    """Resolve apiHost/apiKey from request body or centralized config."""
    api_host = body.get("apiHost") or body.get("api_host")
    api_key = body.get("apiKey") or body.get("api_key")
    if not api_host or not api_key:
        cfg_host, cfg_key = _get_centralized_config()
        api_host = api_host or cfg_host
        api_key = api_key or cfg_key
    return api_host, api_key


def _resolve_download_proxy() -> Optional[str]:
    """Resolve the managed proxy used to download the public CDN video.

    生成的视频在公网 CDN（如 video-product.cdn.minimax.io）上，隔离网络需经
    后端托管代理访问。与图片等其它流程一致，统一从 secure_config 读取托管代理。
    """
    try:
        from ...core.secure_config import get_secure_proxy, is_hardcoded_proxy_enabled
        if is_hardcoded_proxy_enabled():
            return get_secure_proxy().get("proxyUrl") or None
    except Exception as e:
        _log(f"[generate-video] secure_config proxy unavailable: {e}")
    return None


def _parse_model_id(model_id: str) -> Tuple[str, str, int]:
    """Parse a model id like ``MiniMax-Hailuo-2.3_768P_6`` into (base, resolution, duration).

    The resolution token matches ``\\d+P`` (e.g. 768P / 1080P) and the duration token is a
    pure integer (seconds). The remaining tokens are joined back as the upstream model name.
    """
    resolution = ""
    duration = 0
    base_parts = []
    for token in (model_id or "").split("_"):
        if not token:
            continue
        if re.fullmatch(r"\d+[pP]", token):
            resolution = token.upper()
        elif re.fullmatch(r"\d+", token):
            duration = int(token)
        else:
            base_parts.append(token)
    base_model = "_".join(base_parts) if base_parts else (model_id or "")
    return base_model, resolution, duration


def _build_download_opener(proxy_url: Optional[str]):
    """Build an opener that forces the given proxy for public-CDN downloads."""
    if not proxy_url:
        # 无显式代理时沿用默认逻辑（含 bypass/env 代理）
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
    api_key: str = None,
    timeout: float = 300.0,
    proxy_url: Optional[str] = None,
) -> Tuple[bool, str]:
    """Download a file from URL to dest_path. Returns (ok, error_message)."""
    try:
        opener = _build_download_opener(proxy_url) or _build_opener(url)
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "Cherry Studio")
        # 仅当下载地址指向上游网关时才附带鉴权头（公网 OSS 直链通常不需要）
        if api_key and "/task/minimax" in url:
            req.add_header("Authorization", f"Bearer {api_key}")
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


def _http_get_json(url: str, api_key: str, timeout: float = 30.0) -> dict:
    """GET a URL and parse JSON, raising on HTTP error."""
    opener = _build_opener(url)
    req = urllib.request.Request(url, method="GET")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("User-Agent", "Cherry Studio")
    resp = opener.open(req, timeout=timeout)
    return json.loads(resp.read().decode("utf-8"))


def _extract_video_url(data: dict) -> str:
    """Best-effort extraction of a playable video URL from a poll/query response."""
    if not isinstance(data, dict):
        return ""
    # 常见直链字段
    for key in ("video_url", "download_url", "url", "videoUrl", "downloadUrl"):
        val = data.get(key)
        if isinstance(val, str) and val.startswith("http"):
            return val
    # 嵌套字段
    for parent in ("result", "data", "file", "video"):
        inner = data.get(parent)
        if isinstance(inner, dict):
            url = _extract_video_url(inner)
            if url:
                return url
        if isinstance(inner, list):
            for item in inner:
                if isinstance(item, dict):
                    url = _extract_video_url(item)
                    if url:
                        return url
    # Some V-API task query responses put the provider response into resp_data as JSON string.
    resp_data = data.get("resp_data")
    if isinstance(resp_data, str) and resp_data.strip():
        try:
            parsed = json.loads(resp_data)
            url = _extract_video_url(parsed)
            if url:
                return url
        except Exception:
            pass
    return ""


def _extract_file_id(data: dict) -> str:
    """Best-effort extraction of MiniMax file_id from V-API task query response."""
    if not isinstance(data, dict):
        return ""
    file_id = data.get("file_id") or data.get("fileId")
    if file_id:
        return str(file_id)
    for parent in ("result", "data", "file", "video"):
        inner = data.get(parent)
        if isinstance(inner, dict):
            file_id = _extract_file_id(inner)
            if file_id:
                return file_id
    resp_data = data.get("resp_data")
    if isinstance(resp_data, str) and resp_data.strip():
        try:
            parsed = json.loads(resp_data)
            file_id = _extract_file_id(parsed)
            if file_id:
                return file_id
        except Exception:
            pass
    return ""


def _retrieve_file_url(api_host: str, api_key: str, file_id: str) -> Tuple[str, str]:
    """Resolve a file_id into a download URL via the files/retrieve endpoint."""
    encoded_file_id = urllib.request.quote(str(file_id), safe="")
    # V-API documents this MiniMax/Hailuo retrieval path. Do not fall back to
    # /v1/files/retrieve here because the current Higress route only proxies /task/*,
    # and that 404 would hide the real upstream error from the documented endpoint.
    path = f"{_TASK_PREFIX}/files/retrieve?file_id={encoded_file_id}"
    retrieve_url = f"{api_host.rstrip('/')}{path}"
    try:
        data = _http_get_json(retrieve_url, api_key)
        url = _extract_video_url(data)
        if url:
            return url, ""
        error = f"files/retrieve returned no url: {json.dumps(data, ensure_ascii=False)[:300]}"
        _log(f"[generate-video] {error}")
        return "", error
    except urllib.error.HTTPError as e:
        err = ""
        try:
            err = e.read().decode("utf-8", errors="replace")[:500]
        except Exception:
            pass
        error = f"files/retrieve HTTP {e.code} at {path}: {err}"
        _log(f"[generate-video] {error}")
        return "", error
    except Exception as e:
        error = f"files/retrieve failed at {path}: {e}"
        _log(f"[generate-video] {error}")
        return "", error


@route("/api/v1/generate-video/submit", methods=["POST"])
def generate_video_submit(ctx: dict) -> Any:
    """Submit a text-to-video task.

    Request body (JSON):
        {
            "prompt": "a cat playing piano",
            "model": "MiniMax-Hailuo-2.3_768P_6",
            "resolution": "768P",   # optional, overrides parsed value
            "duration": 6,           # optional, overrides parsed value
            "prompt_optimizer": true,
            "apiHost": "...", "apiKey": "..."
        }
    """
    body = ctx["body"]

    # 图生视频：首帧图片，支持公网 URL 或 base64 data URL（data:image/...;base64,xxx）
    first_frame_image = (
        body.get("first_frame_image")
        or body.get("firstFrameImage")
        or body.get("image_data")
        or ""
    ).strip()
    is_image_to_video = bool(first_frame_image)

    prompt = (body.get("prompt") or "").strip()
    # 文生视频必须有 prompt；图生视频可仅凭图片生成，prompt 可选
    if not prompt and not is_image_to_video:
        return {"error": "missing prompt"}

    model_id = body.get("model", "MiniMax-Hailuo-2.3")
    base_model, parsed_resolution, parsed_duration = _parse_model_id(model_id)

    resolution = body.get("resolution") or parsed_resolution or _DEFAULT_RESOLUTION
    duration = int(body.get("duration") or parsed_duration or _DEFAULT_DURATION)
    prompt_optimizer = body.get("prompt_optimizer", True)

    api_host, api_key = _resolve_api(body)
    if not api_host or not api_key:
        return {"error": "No API configuration found for video generation"}

    url = f"{api_host.rstrip('/')}{_TASK_PREFIX}/video_generation"
    _log(
        f"[generate-video] Submitting to {url}, model={base_model}, "
        f"resolution={resolution}, duration={duration}, "
        f"mode={'image-to-video' if is_image_to_video else 'text-to-video'}"
    )

    payload = {
        "model": base_model,
        "duration": duration,
        "resolution": resolution,
        "prompt_optimizer": bool(prompt_optimizer),
    }
    if prompt:
        payload["prompt"] = prompt
    if first_frame_image:
        payload["first_frame_image"] = first_frame_image
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
        _log(f"[generate-video] Submit response: {resp_body[:500]}")

        task_id = data.get("task_id") or data.get("taskId")
        if not task_id:
            base_resp = data.get("base_resp") or {}
            msg = base_resp.get("status_msg") or resp_body[:300]
            return {"error": f"No task_id in response: {msg}"}

        return {"ok": True, "task_id": str(task_id)}

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
    """Poll task status for a video generation task.

    Request body (JSON):
        { "task_id": "...", "apiHost": "...", "apiKey": "..." }

    Returns:
        { "status": "pending"|"processing"|"completed"|"failed",
          "video_url": "https://...",
          "error_message": "..." }
    """
    body = ctx["body"]
    task_id = (body.get("task_id") or "").strip()
    if not task_id:
        return {"error": "missing task_id"}

    api_host, api_key = _resolve_api(body)
    if not api_host or not api_key:
        return {"error": "No API configuration found"}

    # V-API uses a site-wide task query endpoint for MiniMax/Hailuo jobs.
    # The official MiniMax path (/v1/query/video_generation) is not exposed under
    # the V-API /task/minimax/v1 prefix and returns 404 via upstream.
    poll_url = f"{api_host.rstrip('/')}/task/{urllib.request.quote(task_id, safe='')}"

    try:
        data = _http_get_json(poll_url, api_key)
        status = str(data.get("status", "")).lower()
        _log(f"[generate-video] Poll {task_id}: status={status or '(empty)'}")

        result: dict = {"status": "processing"}

        if status in ("success", "succeeded", "completed", "done", "finished"):
            result["status"] = "completed"
            video_url = _extract_video_url(data)
            retrieve_error = ""
            if not video_url:
                file_id = _extract_file_id(data)
                if file_id:
                    video_url, retrieve_error = _retrieve_file_url(api_host, api_key, file_id)
            if not video_url:
                result["status"] = "failed"
                result["error_message"] = retrieve_error or "Task succeeded but no video url found"
            else:
                result["video_url"] = video_url

        elif status in ("fail", "failed", "failure", "error", "cancelled", "canceled"):
            result["status"] = "failed"
            base_resp = data.get("base_resp") or {}
            result["error_message"] = (
                data.get("error_message")
                or data.get("error")
                or data.get("message")
                or base_resp.get("status_msg")
                or "Video generation failed"
            )
        else:
            # Queueing / Preparing / Processing / 空 → 继续等待
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
    """Locate an ffmpeg executable.

    QtWebEngine (PySide6 的开源 Chromium) 不带 H.264 专有编解码器，生成的
    MiniMax mp4（H.264）能渲染但放不了（0:00）。WebEngine 支持 WebM(VP8/VP9)，
    所以下载完后把 mp4 转成 webm 供 webview 预览。优先用 imageio_ffmpeg 自带的
    二进制（最便携），其次找 PATH 上的 ffmpeg。
    """
    try:
        import imageio_ffmpeg  # type: ignore

        exe = imageio_ffmpeg.get_ffmpeg_exe()
        if exe and os.path.isfile(exe):
            return exe
    except Exception:
        pass
    exe = shutil.which("ffmpeg")
    return exe or ""


def _transcode_to_webm(src_path: str, dst_path: str) -> Tuple[bool, str]:
    """Transcode an mp4 (H.264) to WebM(VP9/Opus) so QtWebEngine can play it.

    Returns (ok, error). 失败时不影响主流程，调用方回退到原始 mp4。
    """
    ffmpeg = _find_ffmpeg()
    if not ffmpeg:
        return False, "ffmpeg not found"

    cmd = [
        ffmpeg,
        "-y",
        "-i", src_path,
        "-c:v", "libvpx-vp9",
        "-b:v", "0",
        "-crf", "32",
        "-row-mt", "1",
        "-deadline", "good",
        "-cpu-used", "4",
        "-pix_fmt", "yuv420p",
        "-c:a", "libopus",
        "-b:a", "96k",
        dst_path,
    ]
    # Windows 下隐藏控制台窗口
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
    """Download and save the generated MP4 from a completed video task.

    Request body (JSON):
        { "video_url": "https://...", "apiHost": "...", "apiKey": "..." }
    """
    body = ctx["body"]
    video_url = (body.get("video_url") or "").strip()
    if not video_url:
        return {"error": "missing video_url"}

    api_host, api_key = _resolve_api(body)

    # 生成的视频在公网 CDN 上，隔离网络需经后端托管代理下载（与图片流程一致）。
    download_proxy = _resolve_download_proxy()
    if download_proxy:
        _log("[generate-video] Using managed download proxy")

    file_id = str(uuid.uuid4())
    ext = ".mp4"
    # Generated videos are conversation artifacts and must survive app restarts.
    # Do not store them under the per-run session directory, because X-Session-Id
    # changes on every launch and old preview URLs only carry the filename.
    app_data = get_app_data_dir()
    os.makedirs(app_data, exist_ok=True)
    file_path = os.path.join(app_data, f"{file_id}{ext}")

    _log(f"[generate-video] Downloading {video_url[:120]} -> {file_path}")
    ok, dl_error = _download_file(video_url, file_path, api_key=api_key, proxy_url=download_proxy)
    if not ok:
        # 清理可能产生的空文件
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

    # 转码成 WebM 供 webview 预览（QtWebEngine 不支持 H.264 mp4）。
    # 失败则回退用 mp4：至少下载按钮可用，且远端环境若带 H.264 仍可播。
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
            # name 用于预览：优先 webm（webview 可解码），失败回退 mp4
            "name": preview_name,
            "origin_name": mp4_name,
            # download_name 始终指向原始 mp4，下载按钮用它（兼容性更好、可外部分享）
            "download_name": mp4_name,
            "path": file_path.replace("\\", "/"),
            "ext": ext,
            "size": file_size,
            "type": "video",
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        },
    }
