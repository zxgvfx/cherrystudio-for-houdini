"""
3D Model Generation 路由

支持 image-to-3D，通过 v-api (api.gpt.ge) 的 Higress 代理调用。
支持模型：Hunyuan3D-2, Hi3DGen, Step1X-3D

流程：
  1. POST /task/gi/image-to-3d  (multipart/form-data) → 获取 task_id
  2. GET  /task/{task_id}        → 轮询任务状态
  3. 解码 binary_data_base64 或下载 URL → 保存为 GLB 文件
"""

import base64
import json
import os
import shutil
import time
import urllib.error
import urllib.request
import uuid
from typing import Any, Tuple

from ..server import route
from ...utils.logger import network_logger

_log = network_logger
_APP_DATA_DIR = os.path.join(os.path.expanduser("~"), ".cherrystudio")


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
        _log(f"[generate-3d] Failed to read centralized config: {e}")
    return None, None


def _build_opener(url: str):
    """Build urllib opener with optional proxy support."""
    try:
        from .network import _should_bypass_proxy, _build_opener as _net_build_opener

        bypass = _should_bypass_proxy(url)
        return _net_build_opener(bypass)
    except Exception:
        return urllib.request.build_opener()


def _build_multipart_body(fields: dict, files: dict) -> tuple:
    """Build multipart/form-data body.

    fields: {name: string_value}
    files:  {name: (filename, data_bytes, content_type)}
    Returns: (body_bytes, content_type_header)
    """
    boundary = uuid.uuid4().hex
    lines: list[bytes] = []

    for name, value in fields.items():
        lines.append(f"--{boundary}".encode())
        lines.append(f'Content-Disposition: form-data; name="{name}"'.encode())
        lines.append(b"")
        lines.append(str(value).encode("utf-8"))

    for name, (filename, data, ct) in files.items():
        lines.append(f"--{boundary}".encode())
        lines.append(f'Content-Disposition: form-data; name="{name}"; filename="{filename}"'.encode())
        lines.append(f"Content-Type: {ct}".encode())
        lines.append(b"")
        lines.append(data)

    lines.append(f"--{boundary}--".encode())
    lines.append(b"")
    body = b"\r\n".join(lines)
    return body, f"multipart/form-data; boundary={boundary}"


def _submit_image_to_3d(
    api_host: str,
    api_key: str,
    model: str,
    image_bytes: bytes,
    image_mime: str = "image/png",
    generate_type: str = "Normal",
    enable_pbr: bool = True,
    face_count: int = 500000,
    output_format: str = "glb",
    seed: int = 1234,
) -> dict:
    """Submit image-to-3D task to v-api via Higress (multipart/form-data)."""
    url = f"{api_host.rstrip('/')}/task/gi/image-to-3d"
    _log(f"[generate-3d] Submitting to {url}, model={model}, "
         f"generate_type={generate_type}, enable_pbr={enable_pbr}, image_size={len(image_bytes)}")

    ext_map = {"image/png": "png", "image/jpeg": "jpg", "image/webp": "webp"}
    filename = f"input.{ext_map.get(image_mime, 'png')}"

    fields = {
        "model": model,
        "generate_type": generate_type,
        "enable_pbr": str(enable_pbr).lower(),
        "face_count": str(face_count),
        "type": output_format,
        "seed": str(seed),
    }

    files = {"image": (filename, image_bytes, image_mime)}
    body, content_type = _build_multipart_body(fields, files)

    opener = _build_opener(url)
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", content_type)
    req.add_header("User-Agent", "Cherry Studio")

    try:
        resp = opener.open(req, timeout=60)
        resp_body = resp.read().decode("utf-8")
        data = json.loads(resp_body)
        _log(f"[generate-3d] Submit response: {resp_body[:500]}")

        task_id = data.get("task_id")
        if not task_id:
            return {"error": f"No task_id in response: {resp_body[:300]}"}

        return {"ok": True, "task_id": task_id, "status": data.get("status", "waiting")}

    except urllib.error.HTTPError as e:
        err_body = ""
        try:
            err_body = e.read().decode("utf-8", errors="replace")[:500]
        except Exception:
            pass
        _log(f"[generate-3d] Submit HTTP {e.code}: {err_body}")
        return {"error": f"Submit failed ({e.code}): {err_body}"}
    except Exception as e:
        _log(f"[generate-3d] Submit failed: {e}")
        return {"error": str(e)}


def _download_file(url: str, dest_path: str, timeout: float = 120.0) -> bool:
    """Download a file from URL to dest_path."""
    try:
        opener = _build_opener(url)
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "Cherry Studio")
        with opener.open(req, timeout=timeout) as resp:
            with open(dest_path, "wb") as f:
                shutil.copyfileobj(resp, f)
        return True
    except Exception as e:
        _log(f"[generate-3d] Download failed: {e}")
        return False


@route("/api/v1/generate-3d/submit", methods=["POST"])
def generate_3d_submit(ctx: dict) -> Any:
    """Submit image-to-3D task. Returns task_id for frontend polling.

    Request body (JSON):
        {
            "image_data": "data:image/png;base64,..." or "<raw base64 string>",
            "model": "Hunyuan3D-2",
            "output_format": "glb",
            ...
            "apiHost": "...", "apiKey": "..."
        }
    """
    body = ctx["body"]

    image_data = body.get("image_data", "").strip()
    if not image_data:
        return {"error": "missing image_data (base64 encoded image)"}

    image_mime = "image/png"
    try:
        if image_data.startswith("data:"):
            header, b64_part = image_data.split(",", 1)
            if "image/jpeg" in header:
                image_mime = "image/jpeg"
            elif "image/webp" in header:
                image_mime = "image/webp"
            else:
                image_mime = "image/png"
            image_bytes = base64.b64decode(b64_part)
        else:
            image_bytes = base64.b64decode(image_data)
    except Exception as e:
        return {"error": f"Invalid image_data: {e}"}

    model = body.get("model", "Hunyuan3D-2")
    generate_type = body.get("generate_type", "Normal")
    enable_pbr = body.get("enable_pbr", True)
    face_count = int(body.get("face_count", 500000))
    output_format = body.get("output_format", "glb")
    seed = int(body.get("seed", 1234))

    api_host = body.get("apiHost") or body.get("api_host")
    api_key = body.get("apiKey") or body.get("api_key")

    if not api_host or not api_key:
        cfg_host, cfg_key = _get_centralized_config()
        api_host = api_host or cfg_host
        api_key = api_key or cfg_key

    if not api_host or not api_key:
        return {"error": "No API configuration found for 3D generation"}

    _log(
        f"[generate-3d] model={model}, host={api_host[:40]}, "
        f"generate_type={generate_type}, enable_pbr={enable_pbr}, "
        f"image_bytes={len(image_bytes)}, mime={image_mime}, format={output_format}"
    )

    submit_result = _submit_image_to_3d(
        api_host, api_key, model, image_bytes, image_mime,
        generate_type, enable_pbr, face_count,
        output_format, seed,
    )

    if submit_result.get("error"):
        return submit_result

    _log(f"[generate-3d] Task submitted: {submit_result['task_id']}")
    return {
        "ok": True,
        "task_id": submit_result["task_id"],
        "status": submit_result.get("status", "waiting"),
    }


@route("/api/v1/generate-3d/poll", methods=["POST"])
def generate_3d_poll(ctx: dict) -> Any:
    """Poll a single task status. Frontend calls this repeatedly.

    Request body (JSON):
        { "task_id": "...", "apiHost": "...", "apiKey": "..." }

    Returns:
        { "status": "waiting"|"in_progress"|"success"|"failure",
          "download_url": "..." (only on success),
          "format": "glb",
          "error_message": "..." (only on failure) }
    """
    body = ctx["body"]
    task_id = body.get("task_id", "").strip()
    if not task_id:
        return {"error": "missing task_id"}

    api_host = body.get("apiHost") or body.get("api_host")
    api_key = body.get("apiKey") or body.get("api_key")

    if not api_host or not api_key:
        cfg_host, cfg_key = _get_centralized_config()
        api_host = api_host or cfg_host
        api_key = api_key or cfg_key

    if not api_host or not api_key:
        return {"error": "No API configuration found"}

    poll_url = f"{api_host.rstrip('/')}/task/{task_id}"

    try:
        opener = _build_opener(poll_url)
        req = urllib.request.Request(poll_url, method="GET")
        req.add_header("Authorization", f"Bearer {api_key}")
        req.add_header("User-Agent", "Cherry Studio")
        resp = opener.open(req, timeout=30)
        resp_body = resp.read().decode("utf-8")
        data = json.loads(resp_body)

        result_data = data
        status = ""

        if "data" in data and isinstance(data["data"], dict):
            result_data = data["data"]
            status = result_data.get("status", "").lower()
        elif "status" in data:
            status = str(data["status"]).lower()

        _log(f"[generate-3d] Poll {task_id}: status={status}")

        if status in ("success", "succeeded", "completed", "done"):
            output = result_data.get("output", {})
            download_url = None
            fmt = "glb"
            if isinstance(output, dict):
                download_url = output.get("file_url") or output.get("model_url") or output.get("url")
            if download_url:
                if download_url.lower().split("?")[0].endswith(".ply"):
                    fmt = "ply"
                elif download_url.lower().split("?")[0].endswith(".obj"):
                    fmt = "obj"
            return {"status": "success", "download_url": download_url, "format": fmt}

        if status in ("failed", "failure", "error", "cancelled"):
            output = data.get("output", {})
            msg = (
                (output.get("error") if isinstance(output, dict) else None)
                or data.get("message")
                or result_data.get("resp_data")
                or data.get("error")
                or "Unknown error"
            )
            return {"status": "failure", "error_message": str(msg)}

        return {"status": status or "waiting"}

    except urllib.error.HTTPError as e:
        err_body = ""
        try:
            err_body = e.read().decode("utf-8", errors="replace")[:500]
        except Exception:
            pass
        return {"error": f"Poll HTTP {e.code}: {err_body}"}
    except Exception as e:
        return {"error": f"Poll failed: {e}"}


@route("/api/v1/generate-3d/save", methods=["POST"])
def generate_3d_save(ctx: dict) -> Any:
    """Download and save a completed 3D model file.

    Request body (JSON):
        { "download_url": "...", "format": "glb", "task_id": "..." }
    """
    body = ctx["body"]
    download_url = body.get("download_url", "").strip()
    fmt = body.get("format", "glb")
    task_id = body.get("task_id", "unknown")

    if not download_url:
        return {"error": "missing download_url"}

    file_id = str(uuid.uuid4())
    ext = f".{fmt}"
    os.makedirs(_APP_DATA_DIR, exist_ok=True)
    file_path = os.path.join(_APP_DATA_DIR, f"{file_id}{ext}")

    if not _download_file(download_url, file_path):
        return {"error": "Failed to download 3D model file"}

    file_size = os.path.getsize(file_path) if os.path.exists(file_path) else 0
    _log(f"[generate-3d] Saved: {file_path} ({file_size} bytes)")

    return {
        "ok": True,
        "file": {
            "id": file_id,
            "name": f"{file_id}{ext}",
            "origin_name": f"model_{task_id}{ext}",
            "path": file_path.replace("\\", "/"),
            "ext": ext,
            "size": file_size,
            "type": "model_3d",
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        },
        "format": fmt,
    }


@route("/api/v1/generate-3d/status", methods=["GET"])
def generate_3d_status(ctx: dict) -> Any:
    """Health check for 3D generation capability."""
    cfg_host, cfg_key = _get_centralized_config()
    return {
        "available": bool(cfg_host and cfg_key),
        "has_config": bool(cfg_host),
    }
