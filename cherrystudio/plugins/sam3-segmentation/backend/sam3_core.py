"""
SAM3 客户端 - 与外部推理服务器通信
"""

import base64
import io

try:
    import requests
    import numpy as np
    from PIL import Image
    HAS_DEPENDENCIES = True
except ImportError:
    HAS_DEPENDENCIES = False
    print("[Warning] Missing dependencies (requests, numpy, PIL). Client will not work.")


class SAM3Predictor:
    def __init__(self, server_url="http://192.168.21.225:9999", checkpoint_path=None, device=None):
        self.server_url = server_url
        self.is_loaded = False
        self.checkpoint_path = checkpoint_path
        self.device = device

    def load_model(self):
        if not HAS_DEPENDENCIES:
            raise RuntimeError("Missing dependencies: requests, numpy, PIL")

        try:
            resp = requests.get(f"{self.server_url}/status", timeout=5)
            if resp.status_code == 200:
                data = resp.json()
                if data.get("status") == "ready":
                    self.is_loaded = True
                    return
                self.is_loaded = True
                return
            raise RuntimeError(f"Server returned status {resp.status_code}")
        except requests.exceptions.ConnectionError:
            raise RuntimeError(
                f"无法连接到 SAM3 推理服务器 ({self.server_url})\n"
                "请确保服务器正在运行."
            )
        except Exception as e:
            raise RuntimeError(f"连接失败: {e}")

    def set_image(self, image_np):
        if not HAS_DEPENDENCIES:
            raise RuntimeError("Missing dependencies")

        if not self.is_loaded:
            raise RuntimeError("Server not connected. Call load_model() first.")

        pil_img = Image.fromarray(image_np)
        buf = io.BytesIO()
        pil_img.save(buf, format="JPEG", quality=95)
        buf.seek(0)

        files = {'file': ('image.jpg', buf, 'image/jpeg')}

        try:
            resp = requests.post(f"{self.server_url}/set_image", files=files, timeout=60)
            if resp.status_code != 200:
                raise RuntimeError(f"Server error: {resp.text}")
        except Exception as e:
            raise RuntimeError(f"Failed to send image: {e}")

    def predict(self, points, labels):
        if not HAS_DEPENDENCIES:
            raise RuntimeError("Missing dependencies")

        if not self.is_loaded:
            raise RuntimeError("Server not connected.")

        if isinstance(points, np.ndarray):
            points = points.tolist()
        else:
            points = [list(p) for p in points]

        payload = {
            "points": points,
            "labels": list(labels)
        }

        try:
            resp = requests.post(f"{self.server_url}/predict", json=payload, timeout=30)
            if resp.status_code != 200:
                raise RuntimeError(f"Prediction failed: {resp.text}")

            data = resp.json()
            if data.get("status") != "ok":
                raise RuntimeError(data.get("message", "Unknown error"))

            mask_b64 = data["mask_b64"]
            mask_bytes = base64.b64decode(mask_b64)
            mask_pil = Image.open(io.BytesIO(mask_bytes))
            mask_np = np.array(mask_pil) > 127

            iou = data["iou"]
            stats = {
                "pixels": data["pixels"],
                "ratio": data["ratio"]
            }

            return mask_np, iou, stats

        except requests.exceptions.Timeout:
            raise RuntimeError("Prediction request timed out")
        except Exception as e:
            raise RuntimeError(f"Prediction request failed: {e}")


_global_predictor = None


def get_predictor(server_url="http://192.168.21.225:9999"):
    global _global_predictor
    if _global_predictor is None:
        _global_predictor = SAM3Predictor(server_url=server_url)
    return _global_predictor
