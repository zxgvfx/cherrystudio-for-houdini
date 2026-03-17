"""
SAM3 GUI Launcher - spawned as a subprocess from the plugin route.

Launches the PySide6 SAM3 annotation window, loads the specified image,
and on completion posts mask results back to the callback URL.
"""

import argparse
import base64
import io
import json
import os
import sys

import numpy as np
from PIL import Image


def main():
    parser = argparse.ArgumentParser(description="SAM3 GUI Launcher")
    parser.add_argument("--image", required=True, help="Path to the image file")
    parser.add_argument("--session-id", required=True, help="Session ID for result callback")
    parser.add_argument("--callback-url", required=True, help="URL to POST mask results")
    args = parser.parse_args()

    from PySide6.QtWidgets import QApplication

    plugin_dir = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, os.path.join(plugin_dir, "backend"))

    from backend.sam3_core import SAM3Predictor  # noqa: E402

    app = QApplication.instance() or QApplication(sys.argv)

    gui_module_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(plugin_dir))),
        "__import_project", "sam-3d-objects-main", "integration", "sam3",
        "sam3_gui_module_pyside6.py",
    )

    if os.path.isfile(gui_module_path):
        import importlib.util
        spec = importlib.util.spec_from_file_location("sam3_gui_module_pyside6", gui_module_path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        SAM3Window = mod.SAM3Window
    else:
        print(f"[SAM3 Launcher] GUI module not found: {gui_module_path}")
        sys.exit(1)

    window = SAM3Window()

    img = Image.open(args.image).convert("RGB")
    image_np = np.array(img, dtype=np.uint8)
    window.load_external_image(image_np)
    window.image_path = args.image

    original_on_finished = getattr(window, "on_3d_gen_finished", None)

    def patched_finish(*a, **kw):
        _post_masks_callback(window, args.session_id, args.callback_url)
        if original_on_finished:
            original_on_finished(*a, **kw)

    window._session_id = args.session_id
    window._callback_url = args.callback_url

    window.show()
    app.exec()


def _post_masks_callback(window, session_id: str, callback_url: str):
    try:
        import requests

        masks_data = []
        for layer in window.layers:
            if layer.get("mask") is not None and layer.get("isVisible", True):
                mask_np = (layer["mask"].astype(np.uint8) * 255)
                mask_img = Image.fromarray(mask_np, mode="L")
                buf = io.BytesIO()
                mask_img.save(buf, format="PNG")
                mask_b64 = base64.b64encode(buf.getvalue()).decode("ascii")
                masks_data.append({
                    "name": layer.get("name", "mask"),
                    "mask_b64": mask_b64,
                })

        payload = {
            "session_id": session_id,
            "masks": masks_data,
        }
        requests.post(callback_url, json=payload, timeout=10)
    except Exception as e:
        print(f"[SAM3 Launcher] Callback failed: {e}")


if __name__ == "__main__":
    main()
