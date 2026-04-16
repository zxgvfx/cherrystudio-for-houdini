"""
SAM3 MCP Tool definitions and in-memory client.

Registers sam3_auto_segment and sam3_generate_3d as MCP-compatible tools
discoverable by the hub's search/exec mechanism.
"""

import base64
import io
import json
import os
import uuid
from typing import Any, Dict, List, Optional

from cherrystudio.core.paths import get_app_data_dir
from cherrystudio.utils.logger import network_logger

_log = network_logger

SAM3_TOOL_DEFINITIONS = [
    {
        "name": "sam3_auto_segment",
        "description": (
            "[Trigger: /sam3-auto] Automatically segment a target object in an image using SAM3. "
            "ONLY use this tool when the user explicitly says /sam3-auto or requests automatic segmentation. "
            "Do NOT use this for /sam3 (manual mode). "
            "Requires a vision model to identify the target location first, "
            "then uses SAM3 to create a precise segmentation mask. "
            "Returns mask image path and preview for user confirmation."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "image_path": {
                    "type": "string",
                    "description": "Absolute path to the source image file"
                },
                "target": {
                    "type": "string",
                    "description": "Natural language description of the object to segment (e.g. 'the red sofa')"
                },
                "points": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "x": {"type": "number"},
                            "y": {"type": "number"}
                        }
                    },
                    "description": "Optional pre-computed click points. If not provided, a vision model will auto-detect."
                }
            },
            "required": ["image_path", "target"]
        }
    },
    {
        "name": "sam3_generate_3d",
        "description": (
            "Generate a 3D model (GLB format) from an image and segmentation mask. "
            "Uses the SAM3D server for reconstruction. "
            "Returns the path to the generated 3D model file."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "image_path": {
                    "type": "string",
                    "description": "Absolute path to the source image"
                },
                "mask_path": {
                    "type": "string",
                    "description": "Absolute path to the mask image (white = foreground)"
                },
                "format": {
                    "type": "string",
                    "enum": ["glb", "ply", "usd"],
                    "description": "Output 3D model format (default: glb)"
                }
            },
            "required": ["image_path", "mask_path"]
        }
    },
    {
        "name": "sam3_launch_manual",
        "description": (
            "[Trigger: /sam3] Launch the SAM3 web annotation interface for the user "
            "to interactively select and annotate target objects in an image. "
            "You MUST use this tool when the user says /sam3 or asks for manual annotation. "
            "Do NOT use sam3_auto_segment when the user says /sam3. "
            "Returns a session_id; the web UI opens automatically on the frontend."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "image_path": {
                    "type": "string",
                    "description": "Absolute path to the image file to annotate"
                }
            },
            "required": ["image_path"]
        }
    },
    {
        "name": "sam3_check_status",
        "description": "Check if the SAM3 inference server and 3D generation server are running and available.",
        "inputSchema": {
            "type": "object",
            "properties": {}
        }
    }
]


class SAM3MCPClient:
    """In-memory MCP client for SAM3 plugin tools."""

    def __init__(self, server_id: str = "sam3-segmentation"):
        self.server_id = server_id
        self._alive = True

    def is_alive(self) -> bool:
        return self._alive

    def list_tools(self) -> List[Dict]:
        return SAM3_TOOL_DEFINITIONS

    def call_tool(self, tool_name: str, arguments: dict, timeout: float = 60.0) -> dict:
        handler = _TOOL_HANDLERS.get(tool_name)
        if not handler:
            return {
                "isError": True,
                "content": [{"type": "text", "text": f"Unknown SAM3 tool: {tool_name}"}]
            }
        try:
            result = handler(arguments)
            return result
        except Exception as e:
            _log(f"[SAM3 MCP] Tool '{tool_name}' error: {e}")
            return {
                "isError": True,
                "content": [{"type": "text", "text": f"SAM3 tool error: {e}"}]
            }

    def stop(self):
        self._alive = False


def _handle_check_status(args: dict) -> dict:
    import urllib.request
    results = {}
    for name, url in [("sam3_inference", "http://192.168.21.225:9999"), ("3d_generation", "http://192.168.21.225:8000")]:
        try:
            resp = urllib.request.urlopen(f"{url}/status", timeout=3)
            results[name] = {"available": resp.status == 200, "url": url}
        except Exception:
            results[name] = {"available": False, "url": url}

    text = json.dumps(results, indent=2)
    return {"isError": False, "content": [{"type": "text", "text": text}]}


def _handle_auto_segment(args: dict) -> dict:
    image_path = args.get("image_path", "")
    target = args.get("target", "")
    points = args.get("points")

    if not image_path or not os.path.isfile(image_path):
        return {"isError": True, "content": [{"type": "text", "text": f"Image not found: {image_path}"}]}
    if not target:
        return {"isError": True, "content": [{"type": "text", "text": "Missing 'target' description"}]}

    if not points:
        points = _vision_model_locate(image_path, target)
        if not points:
            return {
                "isError": True,
                "content": [{"type": "text", "text": f"Vision model could not locate '{target}' in the image. Please provide manual click points."}]
            }

    try:
        from sam3_core import SAM3Predictor
        import numpy as np
        from PIL import Image

        predictor = SAM3Predictor()
        predictor.load_model()

        img = Image.open(image_path).convert("RGB")
        image_np = np.array(img, dtype=np.uint8)
        predictor.set_image(image_np)

        pt_coords = [[p["x"], p["y"]] for p in points]
        labels = [1] * len(pt_coords)
        mask_np, iou, stats = predictor.predict(pt_coords, labels)

        os.makedirs(get_app_data_dir(), exist_ok=True)
        mask_id = str(uuid.uuid4())
        mask_path = os.path.join(get_app_data_dir(), f"{mask_id}.png")
        mask_img = Image.fromarray((mask_np.astype(np.uint8) * 255), mode="L")
        mask_img.save(mask_path)

        preview_id = str(uuid.uuid4())
        preview_path = os.path.join(get_app_data_dir(), f"{preview_id}.png")
        overlay = image_np.copy()
        overlay[mask_np] = (overlay[mask_np] * 0.5 + np.array([0, 255, 180]) * 0.5).astype(np.uint8)
        Image.fromarray(overlay).save(preview_path)

        result = {
            "mask_path": mask_path.replace("\\", "/"),
            "mask_id": mask_id,
            "preview_path": preview_path.replace("\\", "/"),
            "preview_id": preview_id,
            "iou": float(iou),
            "target": target,
            "points_used": points,
            "stats": stats,
        }

        text = (
            f"Successfully segmented '{target}' in the image.\n"
            f"IoU score: {iou:.3f}\n"
            f"Mask saved: {mask_path}\n"
            f"Preview saved: {preview_path}\n\n"
            f"Please show the preview image to the user for confirmation before proceeding with 3D generation."
        )

        return {
            "isError": False,
            "content": [
                {"type": "text", "text": text},
                {"type": "image", "data": _file_to_base64(preview_path), "mimeType": "image/png"},
            ],
            "_metadata": result,
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"isError": True, "content": [{"type": "text", "text": f"Segmentation failed: {e}"}]}


def _handle_generate_3d(args: dict) -> dict:
    image_path = args.get("image_path", "")
    mask_path = args.get("mask_path", "")
    fmt = args.get("format", "glb")

    if not image_path or not os.path.isfile(image_path):
        return {"isError": True, "content": [{"type": "text", "text": f"Image not found: {image_path}"}]}
    if not mask_path or not os.path.isfile(mask_path):
        return {"isError": True, "content": [{"type": "text", "text": f"Mask not found: {mask_path}"}]}

    try:
        import requests

        server_url = "http://192.168.21.225:8000"
        files = {
            "image": ("image.jpg", open(image_path, "rb"), "image/jpeg"),
            "mask": ("mask.png", open(mask_path, "rb"), "image/png"),
        }
        data = {"seed": 42, "format": "ply"}
        resp = requests.post(f"{server_url}/generate-3d", files=files, data=data, timeout=600)

        if resp.status_code != 200:
            return {"isError": True, "content": [{"type": "text", "text": f"3D generation failed: {resp.status_code}"}]}

        os.makedirs(get_app_data_dir(), exist_ok=True)
        model_id = str(uuid.uuid4())
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
        text = (
            f"3D model generated successfully!\n"
            f"Format: {final_ext.lstrip('.')}\n"
            f"Size: {file_size} bytes\n"
            f"Path: {final_path}\n"
            f"File ID: {model_id}"
        )

        return {
            "isError": False,
            "content": [{"type": "text", "text": text}],
            "_metadata": {
                "file": {
                    "id": model_id,
                    "name": f"{model_id}{final_ext}",
                    "path": final_path.replace("\\", "/"),
                    "ext": final_ext,
                    "size": file_size,
                    "type": "model_3d",
                }
            }
        }

    except Exception as e:
        return {"isError": True, "content": [{"type": "text", "text": f"3D generation error: {e}"}]}


def _vision_model_locate(image_path: str, target: str) -> Optional[List[Dict[str, float]]]:
    """Use a vision model to locate the target object center in the image."""
    try:
        from cherrystudio.backend.routes.files import _get_centralized_config
        from cherrystudio.backend.routes.network import _should_bypass_proxy, _build_opener
        from PIL import Image

        api_host, api_key = _get_centralized_config()
        if not api_host or not api_key:
            _log("[SAM3 MCP] No API config for vision model")
            return None

        with open(image_path, "rb") as f:
            img_bytes = f.read()
        img_b64 = base64.b64encode(img_bytes).decode("ascii")

        img = Image.open(image_path)
        w, h = img.size

        prompt = (
            f"I need to find the center point of '{target}' in this image. "
            f"The image is {w}x{h} pixels. "
            f"Please return ONLY a JSON object with the x,y pixel coordinates of the center of the target object. "
            f"Format: {{\"x\": number, \"y\": number}}"
        )

        payload = json.dumps({
            "model": "qwen3-vl-plus",
            "messages": [{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_b64}"}}
                ]
            }],
            "max_tokens": 256,
            "temperature": 0,
        }).encode("utf-8")

        url = f"{api_host.rstrip('/')}/v1/chat/completions"
        bypass = _should_bypass_proxy(url)
        opener = _build_opener(bypass)

        import urllib.request
        req = urllib.request.Request(url, data=payload, method="POST")
        req.add_header("Authorization", f"Bearer {api_key}")
        req.add_header("Content-Type", "application/json")

        resp = opener.open(req, timeout=30)
        body = resp.read().decode("utf-8")
        data = json.loads(body)

        text = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        _log(f"[SAM3 MCP] Vision model response: {text[:200]}")

        import re
        match = re.search(r'\{[^}]*"x"\s*:\s*(\d+(?:\.\d+)?)[^}]*"y"\s*:\s*(\d+(?:\.\d+)?)[^}]*\}', text)
        if match:
            x = float(match.group(1))
            y = float(match.group(2))
            if 0 <= x <= w and 0 <= y <= h:
                return [{"x": x, "y": y}]

        _log(f"[SAM3 MCP] Could not parse coordinates from vision response")
        return None

    except Exception as e:
        _log(f"[SAM3 MCP] Vision model error: {e}")
        return None


def _convert_to_glb(input_path: str, output_path: str) -> bool:
    try:
        import trimesh
        mesh = trimesh.load(input_path)
        mesh.export(output_path, file_type="glb")
        return True
    except ImportError:
        _log("[SAM3 MCP] trimesh not installed, skipping GLB conversion")
        return False
    except Exception as e:
        _log(f"[SAM3 MCP] GLB conversion failed: {e}")
        return False


def _file_to_base64(path: str) -> str:
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("ascii")


def _handle_launch_manual(args: dict) -> dict:
    """Create SAM3 web annotation session. The frontend opens the popup automatically."""
    image_path = args.get("image_path", "")
    if not image_path or not os.path.isfile(image_path):
        return {"isError": True, "content": [{"type": "text", "text": f"Image not found: {image_path}"}]}

    try:
        session_id = str(uuid.uuid4())
        return {
            "isError": False,
            "content": [{"type": "text", "text": json.dumps({
                "status": "launched",
                "session_id": session_id,
                "mode": "web",
                "image_path": image_path,
                "message": (
                    "SAM3 web annotation interface opened. "
                    "The user is now annotating objects interactively. "
                    "Wait for the user to finish before proceeding."
                )
            }, ensure_ascii=False, indent=2)}]
        }
    except Exception as e:
        _log(f"[SAM3 MCP] launch_manual error: {e}")
        return {"isError": True, "content": [{"type": "text", "text": f"Failed to launch SAM3: {e}"}]}


_TOOL_HANDLERS = {
    "sam3_check_status": _handle_check_status,
    "sam3_auto_segment": _handle_auto_segment,
    "sam3_generate_3d": _handle_generate_3d,
    "sam3_launch_manual": _handle_launch_manual,
}


def register_sam3_mcp_client():
    """Register SAM3 as an in-memory MCP client in the global registry."""
    try:
        from cherrystudio.backend.routes.mcp import _clients, _clients_lock
        client = SAM3MCPClient("sam3-segmentation")
        with _clients_lock:
            _clients["sam3-segmentation"] = client
        _log("[SAM3 MCP] Registered in-memory MCP client")
    except Exception as e:
        _log(f"[SAM3 MCP] Failed to register MCP client: {e}")
