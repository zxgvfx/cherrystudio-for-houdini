"""
SAM3 Segmentation plugin routes.

Provides endpoints for the embedded web UI,
auto segmentation (LLM-orchestrated), and 3D generation.
"""

import base64
import importlib
import io
import json
import mimetypes
import os
import uuid
from typing import Any

from cherrystudio.backend.server import prefix_route, route, STREAMING_HANDLED
from cherrystudio.core.paths import get_app_data_dir
from cherrystudio.utils.logger import network_logger

_log = network_logger
_PLUGIN_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_FRONTEND_DIR = os.path.join(_PLUGIN_DIR, "frontend")
_WEB_PREFIX = "/plugins-ui/sam3-segmentation"
_APP_ROUTE = "/plugins/sam3-segmentation"

_active_sessions: dict = {}

SAM3_SERVER_URL = "http://192.168.21.225:9999"
GEN3D_SERVER_URL = "http://192.168.21.225:8000"

try:
    from mcp_tools import register_sam3_mcp_client
    register_sam3_mcp_client()
except Exception as _mcp_err:
    _log(f"[SAM3] MCP client registration deferred: {_mcp_err}")


def _check_server(url: str, timeout: int = 3) -> bool:
    try:
        import urllib.request
        resp = urllib.request.urlopen(f"{url}/status", timeout=timeout)
        return resp.status == 200
    except Exception:
        return False


def _get_missing_runtime_packages(*requirements: tuple[str, str]) -> list[str]:
    missing: list[str] = []
    for import_name, package_name in requirements:
        try:
            importlib.import_module(import_name)
        except Exception:
            missing.append(package_name)
    return missing


def _runtime_dependency_error(*requirements: tuple[str, str]) -> dict[str, str] | None:
    missing = _get_missing_runtime_packages(*requirements)
    if not missing:
        return None
    packages = ", ".join(missing)
    return {
        "error": f"Missing dependencies: {packages}",
        "hint": f"Install into the Maya Python environment: pip install {packages}",
    }


def _serve_static_file(handler, file_path: str) -> Any:
    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        mime_type = "application/octet-stream"

    with open(file_path, "rb") as f:
        data = f.read()

    handler.send_response(200)
    handler.send_header("Content-Type", mime_type)
    handler.send_header("Content-Length", str(len(data)))
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.end_headers()
    handler.wfile.write(data)
    handler.wfile.flush()
    return STREAMING_HANDLED


@prefix_route(_WEB_PREFIX, methods=["GET"])
def sam3_frontend(ctx: dict) -> Any:
    handler = ctx["_handler"]
    sub_path = (ctx.get("sub_path") or "").lstrip("/")
    rel_path = sub_path or "index.html"
    target_path = os.path.normpath(os.path.join(_FRONTEND_DIR, rel_path))
    frontend_root = os.path.normpath(_FRONTEND_DIR)

    if not target_path.startswith(frontend_root):
        handler.send_response(403)
        handler.send_header("Content-Type", "text/plain")
        handler.end_headers()
        handler.wfile.write(b"forbidden")
        return STREAMING_HANDLED

    if not os.path.isfile(target_path):
        handler.send_response(404)
        handler.send_header("Content-Type", "text/plain")
        handler.end_headers()
        handler.wfile.write(f"frontend file not found: {rel_path}".encode("utf-8"))
        return STREAMING_HANDLED

    return _serve_static_file(handler, target_path)


@route("/api/v1/plugins/sam3-segmentation/status", methods=["GET"])
def sam3_status(ctx: dict) -> Any:
    sam3_ok = _check_server(SAM3_SERVER_URL)
    gen3d_ok = _check_server(GEN3D_SERVER_URL)
    return {
        "plugin_id": "sam3-segmentation",
        "sam3_server": {"url": SAM3_SERVER_URL, "available": sam3_ok},
        "gen3d_server": {"url": GEN3D_SERVER_URL, "available": gen3d_ok},
    }


@route("/api/v1/plugins/sam3-segmentation/launch-manual", methods=["POST"])
def sam3_launch_manual(ctx: dict) -> Any:
    """Compatibility endpoint that now routes users to the embedded web UI."""
    return {"ok": True, "status": "ready", "plugin_id": "sam3-segmentation", "open_url": _APP_ROUTE, "mode": "web"}


@route("/api/v1/plugins/sam3-segmentation/open-gui", methods=["POST"])
def sam3_open_gui(ctx: dict) -> Any:
    """Return the embedded plugin route instead of spawning a native window."""
    return {"ok": True, "status": "ready", "plugin_id": "sam3-segmentation", "open_url": _APP_ROUTE, "mode": "web"}


@route("/api/v1/plugins/sam3-segmentation/upload-image", methods=["POST"])
def sam3_upload_image(ctx: dict) -> Any:
    body = ctx["body"]
    data_url = body.get("data_url", "")
    filename = os.path.basename(body.get("filename", "image.png"))

    if not data_url or "," not in data_url:
        return {"error": "Invalid image payload"}

    header, b64_data = data_url.split(",", 1)
    if not header.startswith("data:image/"):
        return {"error": "Only image uploads are supported"}

    ext = os.path.splitext(filename)[1].lower()
    if not ext:
        mime = header.split(";")[0].split("/")[-1].lower()
        ext = f".{mime or 'png'}"

    os.makedirs(get_app_data_dir(), exist_ok=True)
    image_id = str(uuid.uuid4())
    image_path = os.path.join(get_app_data_dir(), f"{image_id}{ext}")

    try:
        with open(image_path, "wb") as f:
            f.write(base64.b64decode(b64_data))
        return {
            "ok": True,
            "image_id": image_id,
            "image_path": image_path.replace("\\", "/"),
            "name": filename,
        }
    except Exception as e:
        return {"error": str(e)}


@route("/api/v1/plugins/sam3-segmentation/mask-result", methods=["POST"])
def sam3_mask_result(ctx: dict) -> Any:
    """Receive mask results from the embedded web annotator."""
    body = ctx["body"]
    session_id = body.get("session_id", "")
    if session_id not in _active_sessions:
        return {"error": f"Unknown session: {session_id}"}

    masks_data = body.get("masks", [])
    os.makedirs(get_app_data_dir(), exist_ok=True)

    saved_masks = []
    for i, mask_info in enumerate(masks_data):
        mask_b64 = mask_info.get("mask_b64", "")
        name = mask_info.get("name", f"mask_{i}")
        if not mask_b64:
            continue

        mask_id = str(uuid.uuid4())
        mask_path = os.path.join(get_app_data_dir(), f"{mask_id}.png")

        mask_bytes = base64.b64decode(mask_b64)
        with open(mask_path, "wb") as f:
            f.write(mask_bytes)

        saved_masks.append({
            "id": mask_id,
            "name": name,
            "path": mask_path.replace("\\", "/"),
            "ext": ".png",
        })

    _active_sessions[session_id]["masks"] = saved_masks
    _active_sessions[session_id]["status"] = "masks_received"

    preview_b64 = body.get("preview_b64")
    if preview_b64:
        preview_id = str(uuid.uuid4())
        preview_path = os.path.join(get_app_data_dir(), f"{preview_id}.png")
        with open(preview_path, "wb") as f:
            f.write(base64.b64decode(preview_b64))
        _active_sessions[session_id]["preview_path"] = preview_path.replace("\\", "/")
        _active_sessions[session_id]["preview_id"] = preview_id

    return {"ok": True, "masks_saved": len(saved_masks)}


@route("/api/v1/plugins/sam3-segmentation/session-status", methods=["GET"])
def sam3_session_status(ctx: dict) -> Any:
    """Poll session status (for frontend to know when masks are ready)."""
    query = ctx.get("query", {})
    session_id = query.get("session_id", [""])[0] if isinstance(query.get("session_id"), list) else query.get("session_id", "")
    if session_id not in _active_sessions:
        return {"error": f"Unknown session: {session_id}"}
    session = _active_sessions[session_id]
    return {
        "session_id": session_id,
        "status": session["status"],
        "masks": session.get("masks", []),
        "preview_path": session.get("preview_path"),
        "preview_id": session.get("preview_id"),
        "camera_info": session.get("camera_info"),
        "generated_objects": session.get("generated_objects", []),
    }


@route("/api/v1/plugins/sam3-segmentation/generate-3d", methods=["POST"])
def sam3_generate_3d(ctx: dict) -> Any:
    """Send image + mask to 3D generation server, return GLB file."""
    body = ctx["body"]
    image_path = body.get("image_path", "")
    mask_path = body.get("mask_path", "")
    output_format = body.get("format", "glb")
    server_url = body.get("server_url", GEN3D_SERVER_URL)
    camera_info = body.get("camera_info")
    object_name = body.get("name", "object")
    session_id = body.get("session_id", "")

    if not image_path or not os.path.isfile(image_path):
        return {"error": f"Image not found: {image_path}"}
    if not mask_path or not os.path.isfile(mask_path):
        return {"error": f"Mask not found: {mask_path}"}

    dep_error = _runtime_dependency_error(("requests", "requests"))
    if dep_error:
        return dep_error

    import requests as req

    try:
        files = {
            "image": ("image.jpg", open(image_path, "rb"), "image/jpeg"),
            "mask": ("mask.png", open(mask_path, "rb"), "image/png"),
        }
        data = {"seed": 42, "format": "ply"}
        if camera_info:
            data["camera_info"] = json.dumps(camera_info)
            pointmap_path = camera_info.get("pointmap_path")
            if pointmap_path and os.path.isfile(pointmap_path):
                files["pointmap"] = ("pointmap.exr", open(pointmap_path, "rb"), "image/x-exr")
        resp = req.post(f"{server_url}/generate-3d", files=files, data=data, timeout=600)

        if resp.status_code != 200:
            return {"error": f"3D generation failed: {resp.status_code} {resp.text[:500]}"}

        os.makedirs(get_app_data_dir(), exist_ok=True)
        model_id = str(uuid.uuid4())

        content_type = resp.headers.get("Content-Type", "")
        raw_path = os.path.join(get_app_data_dir(), f"{model_id}_raw.ply")
        with open(raw_path, "wb") as f:
            f.write(resp.content)

        final_ext = ".glb"
        final_path = os.path.join(get_app_data_dir(), f"{model_id}{final_ext}")

        converted = _convert_to_glb(raw_path, final_path)
        if not converted:
            final_path = raw_path
            final_ext = ".ply"

        file_size = os.path.getsize(final_path)
        generated_object = {
            "name": object_name,
            "file": final_path.replace("\\", "/"),
        }
        if session_id and session_id in _active_sessions:
            _active_sessions[session_id].setdefault("generated_objects", []).append(generated_object)

        return {
            "ok": True,
            "file": {
                "id": model_id,
                "name": f"{model_id}{final_ext}",
                "path": final_path.replace("\\", "/"),
                "ext": final_ext,
                "size": file_size,
                "type": "model_3d",
            },
            "format": final_ext.lstrip("."),
            "generated_object": generated_object,
        }
    except Exception as e:
        _log(f"[SAM3] 3D generation error: {e}")
        return {"error": str(e)}


def _convert_to_glb(input_path: str, output_path: str) -> bool:
    """Convert PLY/USD to GLB using trimesh."""
    try:
        import trimesh
        mesh = trimesh.load(input_path)
        mesh.export(output_path, file_type="glb")
        return True
    except ImportError:
        _log("[SAM3] trimesh not installed, skipping GLB conversion")
        return False
    except Exception as e:
        _log(f"[SAM3] GLB conversion failed: {e}")
        return False


@route("/api/v1/plugins/sam3-segmentation/set-image", methods=["POST"])
def sam3_set_image(ctx: dict) -> Any:
    """Upload image to SAM3 inference server for embedding computation."""
    body = ctx["body"]
    image_path = body.get("image_path", "")
    camera_info = body.get("camera_info")
    if not image_path or not os.path.isfile(image_path):
        return {"error": f"Image not found: {image_path}"}

    session_id = body.get("session_id") or str(uuid.uuid4())
    dep_error = _runtime_dependency_error(("requests", "requests"), ("numpy", "numpy"), ("PIL", "Pillow"))
    if dep_error:
        return dep_error

    try:
        from sam3_core import get_predictor
        predictor = get_predictor(SAM3_SERVER_URL)
        if not predictor.is_loaded:
            predictor.load_model()

        import numpy as np
        from PIL import Image as PILImage
        img = PILImage.open(image_path).convert("RGB")
        image_np = np.array(img, dtype=np.uint8)
        predictor.set_image(image_np)

        _active_sessions[session_id] = {
            "image_path": image_path,
            "status": "image_set",
            "masks": [],
            "camera_info": camera_info,
            "generated_objects": [],
        }

        return {"ok": True, "session_id": session_id}
    except Exception as e:
        _log(f"[SAM3] set-image error: {e}")
        return {"error": str(e)}


@route("/api/v1/plugins/sam3-segmentation/set-camera-info", methods=["POST"])
def sam3_set_camera_info(ctx: dict) -> Any:
    body = ctx["body"]
    session_id = body.get("session_id", "")
    if not session_id:
        return {"error": "missing session_id"}
    if session_id not in _active_sessions:
        return {"error": f"Unknown session: {session_id}"}

    _active_sessions[session_id]["camera_info"] = body.get("camera_info")
    return {"ok": True}


@route("/api/v1/plugins/sam3-segmentation/predict", methods=["POST"])
def sam3_predict(ctx: dict) -> Any:
    """Run SAM3 prediction with click points, return mask as base64 PNG."""
    body = ctx["body"]
    points = body.get("points", [])
    labels = body.get("labels", [])

    if not points or not labels:
        return {"error": "No points or labels provided"}

    dep_error = _runtime_dependency_error(("requests", "requests"), ("numpy", "numpy"), ("PIL", "Pillow"))
    if dep_error:
        return dep_error

    try:
        from sam3_core import get_predictor
        predictor = get_predictor(SAM3_SERVER_URL)

        mask_np, iou, stats = predictor.predict(points, labels)

        from PIL import Image as PILImage
        mask_uint8 = (mask_np.astype("uint8") * 255)
        mask_img = PILImage.fromarray(mask_uint8, mode="L")
        buf = io.BytesIO()
        mask_img.save(buf, format="PNG")
        mask_b64 = base64.b64encode(buf.getvalue()).decode("ascii")

        return {
            "ok": True,
            "mask_b64": mask_b64,
            "iou": float(iou) if iou is not None else 0,
            "pixels": stats.get("pixels", 0),
            "ratio": stats.get("ratio", 0),
        }
    except Exception as e:
        _log(f"[SAM3] predict error: {e}")
        return {"error": str(e)}


@route("/api/v1/plugins/sam3-segmentation/serve-image", methods=["GET"])
def sam3_serve_image(ctx: dict) -> Any:
    """Serve a local image file as base64 data URL."""
    query = ctx.get("query", {})
    path = query.get("path", [""])[0] if isinstance(query.get("path"), list) else query.get("path", "")

    if not path or not os.path.isfile(path):
        return {"error": f"File not found: {path}"}

    dep_error = _runtime_dependency_error(("PIL", "Pillow"))
    if dep_error:
        return dep_error

    ext = os.path.splitext(path)[1].lower()
    mime_map = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".bmp": "image/bmp"}
    mime = mime_map.get(ext, "image/png")

    with open(path, "rb") as f:
        raw = f.read()

    b64 = base64.b64encode(raw).decode("ascii")
    from PIL import Image as PILImage
    img = PILImage.open(path)
    w, h = img.size

    return {"ok": True, "data_url": f"data:{mime};base64,{b64}", "width": w, "height": h}


@route("/api/v1/plugins/sam3-segmentation/save-masks", methods=["POST"])
def sam3_save_masks(ctx: dict) -> Any:
    """Save masks from web annotator (replaces PySide6 callback)."""
    body = ctx["body"]
    session_id = body.get("session_id", str(uuid.uuid4()))
    masks_data = body.get("masks", [])

    os.makedirs(get_app_data_dir(), exist_ok=True)
    saved_masks = []

    for i, mask_info in enumerate(masks_data):
        mask_b64 = mask_info.get("mask_b64", "")
        name = mask_info.get("name", f"mask_{i}")
        if not mask_b64:
            continue

        mask_id = str(uuid.uuid4())
        mask_path = os.path.join(get_app_data_dir(), f"{mask_id}.png")
        mask_bytes = base64.b64decode(mask_b64)
        with open(mask_path, "wb") as f:
            f.write(mask_bytes)

        saved_masks.append({
            "id": mask_id,
            "name": name,
            "path": mask_path.replace("\\", "/"),
            "ext": ".png",
        })

    if session_id in _active_sessions:
        _active_sessions[session_id]["masks"] = saved_masks
        _active_sessions[session_id]["status"] = "masks_received"

    return {"ok": True, "masks": saved_masks}


@route("/api/v1/plugins/sam3-segmentation/auto-segment", methods=["POST"])
def sam3_auto_segment(ctx: dict) -> Any:
    """
    Auto segmentation: vision model locates target, SAM3 generates mask.
    Callable directly via HTTP or through MCP tool calling.
    """
    body = ctx["body"]
    try:
        from mcp_tools import _handle_auto_segment
        result = _handle_auto_segment(body)
        if result.get("isError"):
            return {"error": result["content"][0]["text"]}
        metadata = result.get("_metadata", {})
        return {"ok": True, **metadata}
    except Exception as e:
        return {"error": str(e)}
