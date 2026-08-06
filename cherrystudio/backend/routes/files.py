"""
文件操作路由

对应原 CherryStudioAPI 中的文件读写相关 @Slot 方法。
所有操作限定在 ~/.cherrystudio/ 目录内（安全沙箱）。
"""

import os
import json
import mimetypes
import shutil
import urllib.request
import urllib.error
import zipfile
import base64
from pathlib import Path
from typing import Any

from ..server import route, STREAMING_HANDLED
from ...utils.logger import network_logger

_log = network_logger

_OCR_MODEL = "qwen3-vl-plus"

try:
    from pypdf import PdfReader as _PdfReader
except ImportError:
    _PdfReader = None

try:
    import fitz as _fitz  # pymupdf
except ImportError:
    _fitz = None


def _extract_pdf_text(file_path: str) -> str:
    """Extract text from a PDF file. Returns empty string on failure."""
    # pymupdf 优先（支持更多 PDF 格式）
    if _fitz is not None:
        try:
            doc = _fitz.open(file_path)
            pages = []
            for page in doc:
                text = page.get_text()
                if text and text.strip():
                    pages.append(text)
            doc.close()
            return "\n\n".join(pages)
        except Exception as e:
            _log(f"[files] pymupdf text extraction failed: {e}")

    if _PdfReader is not None:
        try:
            reader = _PdfReader(file_path)
            pages = []
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    pages.append(text)
            return "\n\n".join(pages)
        except Exception as e:
            _log(f"[files] pypdf text extraction failed: {e}")

    _log("[files] PDF text extraction skipped: install pymupdf or pypdf")
    return ""


def _pdf_has_text(file_path: str) -> bool:
    """Check if a PDF contains extractable text (vs scanned/image-only)."""
    text = _extract_pdf_text(file_path)
    return len(text.strip()) > 50


def _pdf_to_images_base64(file_path: str, dpi: int = 150, max_pages: int = 20) -> list:
    """
    Convert PDF pages to base64 PNG images using pymupdf.
    Returns list of {"data": base64_str, "mime": "image/png", "page": page_num}.
    """
    if _fitz is None:
        _log("[files] PDF→image skipped: install pymupdf (pip install pymupdf)")
        return []
    try:
        doc = _fitz.open(file_path)
        results = []
        zoom = dpi / 72.0
        mat = _fitz.Matrix(zoom, zoom)
        for i, page in enumerate(doc):
            if i >= max_pages:
                _log(f"[files] PDF→image: truncated at {max_pages} pages")
                break
            pix = page.get_pixmap(matrix=mat)
            img_bytes = pix.tobytes("png")
            b64 = base64.b64encode(img_bytes).decode("ascii")
            results.append({"data": b64, "mime": "image/png", "page": i + 1})
        doc.close()
        return results
    except Exception as e:
        _log(f"[files] PDF→image failed: {e}")
        return []


def _get_centralized_config():
    """Read Higress API host and key from centralized-config.json."""
    cfg_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        "resources", "centralized-config.json",
    )
    try:
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        for p in cfg.get("providers", []):
            if p.get("apiHost") and p.get("apiKey"):
                return p["apiHost"], p["apiKey"]
    except Exception as e:
        _log(f"[files] Failed to read centralized config: {e}")
    return None, None


def _compress_images_for_ocr(images: list, quality: int = 75) -> list:
    """Convert PNG images to JPEG for smaller payloads. Falls back to original if PIL unavailable."""
    try:
        from io import BytesIO
        from PIL import Image
    except ImportError:
        return images

    results = []
    for img in images:
        try:
            raw = base64.b64decode(img["data"])
            pil_img = Image.open(BytesIO(raw))
            if pil_img.mode in ("RGBA", "P"):
                pil_img = pil_img.convert("RGB")
            buf = BytesIO()
            pil_img.save(buf, format="JPEG", quality=quality, optimize=True)
            jpg_b64 = base64.b64encode(buf.getvalue()).decode("ascii")
            results.append({"data": jpg_b64, "mime": "image/jpeg", "page": img["page"]})
        except Exception:
            results.append(img)
    return results


_OCR_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
}

_OCR_FALLBACK_MODELS = [
    "qwen3-vl-plus",
    "gemini-3.1-flash-image-preview",
    "doubao-seed-1-8-251228",
    "claude-haiku-4-5-20251001",
]


def _ocr_single_call(url: str, api_key: str, model: str,
                      images_b64: list, opener, max_retries: int = 2) -> str:
    """Single OCR API call with retry. Returns extracted text or empty string."""
    content_parts = [
        {"type": "text", "text": "请提取以下图片中的所有文字内容，保持原始排版结构。只输出提取到的文字，不要添加任何解释。"}
    ]
    for img in images_b64:
        content_parts.append({
            "type": "image_url",
            "image_url": {"url": f"data:{img['mime']};base64,{img['data']}"}
        })

    payload = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": content_parts}],
        "max_tokens": 16384,
        "temperature": 0,
    }).encode("utf-8")

    print(f"[files/ocr] calling model={model}, payload={len(payload) // 1024}KB, images={len(images_b64)}")

    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, data=payload, method="POST")
            req.add_header("Authorization", f"Bearer {api_key}")
            for k, v in _OCR_HEADERS.items():
                req.add_header(k, v)

            resp = opener.open(req, timeout=180)
            body = resp.read().decode("utf-8")
            data = json.loads(body)
            choices = data.get("choices", [])
            if choices:
                text = choices[0].get("message", {}).get("content", "")
                if text:
                    return text
            return ""
        except urllib.error.HTTPError as e:
            err_body = ""
            try:
                err_body = e.read().decode("utf-8", errors="replace")
            except Exception:
                pass
            print(f"[files/ocr] HTTP {e.code} (attempt {attempt + 1}/{max_retries}): {err_body[:300]}")
            if e.code < 500 and e.code != 429:
                break
            import time
            time.sleep(2 * (attempt + 1))
        except Exception as e:
            print(f"[files/ocr] call failed (attempt {attempt + 1}/{max_retries}): {e}")
            if attempt < max_retries - 1:
                import time
                time.sleep(2)
    return ""


def _ocr_images_via_vision_model(images_b64: list, model: str = None) -> str:
    """
    Call a vision model via Higress to OCR a list of base64 images.
    On failure, tries fallback models automatically.
    """
    api_host, api_key = _get_centralized_config()
    if not api_host or not api_key:
        _log("[files/ocr] No API config found")
        return ""

    url = f"{api_host.rstrip('/')}/v1/chat/completions"

    from .network import _should_bypass_proxy, _build_opener
    bypass = _should_bypass_proxy(url)
    opener = _build_opener(bypass)

    models_to_try = []
    primary = model or _OCR_MODEL
    models_to_try.append(primary)
    for fb in _OCR_FALLBACK_MODELS:
        if fb != primary:
            models_to_try.append(fb)

    for m in models_to_try:
        text = _ocr_single_call(url, api_key, m, images_b64, opener)
        if text:
            return text
        print(f"[files/ocr] model {m} failed, trying next...")

    print("[files/ocr] all models failed")
    return ""


def _get_app_data_dir(session_id: str = "") -> str:
    from ...core.paths import get_app_data_dir
    return get_app_data_dir(session_id=session_id or None)


def _find_file_in_app_data(filename: str, session_id: str = "") -> str:
    """Locate a file by name, searching session-specific dir first then base dir.

    Returns the absolute path if found, empty string otherwise.
    """
    if session_id:
        session_path = os.path.join(_get_app_data_dir(session_id), filename)
        if os.path.isfile(session_path):
            return session_path
    base_path = os.path.join(_get_app_data_dir(), filename)
    if os.path.isfile(base_path):
        return base_path
    # Fallback: scan session subdirs
    base_dir = _get_app_data_dir()
    sessions_dir = os.path.join(base_dir, "sessions")
    if os.path.isdir(sessions_dir):
        for sid in os.listdir(sessions_dir):
            candidate = os.path.join(sessions_dir, sid, filename)
            if os.path.isfile(candidate):
                return candidate
    # Cross-DCC fallback for historical files. A video may have been generated
    # in standalone mode and later viewed from Houdini (or the reverse). Preview
    # URLs only store the filename, so search the known app-data roots.
    try:
        from ...core.paths import get_base_dir

        for dcc in ("standalone", "houdini", "maya", "blender"):
            root = os.path.join(get_base_dir(), dcc)
            candidate = os.path.join(root, filename)
            if os.path.isfile(candidate):
                return candidate
            dcc_sessions = os.path.join(root, "sessions")
            if os.path.isdir(dcc_sessions):
                for sid in os.listdir(dcc_sessions):
                    candidate = os.path.join(dcc_sessions, sid, filename)
                    if os.path.isfile(candidate):
                        return candidate
    except Exception:
        pass
    return ""

# 应用资源目录（只读白名单）
_RESOURCES_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "resources",
)


def _safe_path(relative_path: str) -> str:
    """将相对路径限定在 APP_DATA_DIR 内，防止路径穿越"""
    base = Path(_get_app_data_dir()).resolve()
    target = (base / relative_path).resolve()
    if not str(target).startswith(str(base)):
        raise PermissionError(f"Access denied: {relative_path}")
    return str(target)


def _safe_read_path(path_str: str) -> str:
    """
    解析只读路径：允许 APP_DATA_DIR 和应用 resources 目录。
    支持绝对路径和相对路径。
    """
    p = Path(path_str)
    if p.is_absolute():
        resolved = p.resolve()
        for allowed in (_get_app_data_dir(), _RESOURCES_DIR):
            allowed_resolved = Path(allowed).resolve()
            try:
                resolved.relative_to(allowed_resolved)
                return str(resolved)
            except ValueError:
                continue
        raise PermissionError(f"Read access denied: {path_str}")
    return _safe_path(path_str)


# ─── 路由实现 ──────────────────────────────────────────────────────────────────

@route("/api/v1/files/read", methods=["POST"])
def file_read(ctx: dict) -> Any:
    """读取文件内容（文本）。PDF 自动提取文本。"""
    body = ctx["body"]
    path = body.get("path", "")
    if not path:
        return {"error": "missing path"}
    try:
        full_path = _safe_read_path(path)
        if not os.path.exists(full_path):
            print(f"[files/read] file not found: {full_path}")
            return {"content": None}

        if full_path.lower().endswith(".pdf"):
            print(f"[files/read] PDF detected: {full_path}")
            text = _extract_pdf_text(full_path)
            print(f"[files/read] PDF text extracted: {len(text)} chars")
            return {"content": text}

        with open(full_path, "r", encoding="utf-8") as f:
            return {"content": f.read()}
    except Exception as e:
        _log(f"[files/read] {e}")
        return {"error": str(e)}


@route("/api/v1/files/pdf-to-images", methods=["POST"])
def pdf_to_images(ctx: dict) -> Any:
    """
    将 PDF 页面渲染为图片（base64 PNG）。
    请求: {"path": "...", "dpi": 150, "maxPages": 20}
    返回: {"images": [{"data": "base64...", "mime": "image/png", "page": 1}, ...], "hasText": bool}
    """
    body = ctx["body"]
    path = body.get("path", "")
    dpi = body.get("dpi", 150)
    max_pages = body.get("maxPages", 20)
    if not path:
        return {"error": "missing path"}
    try:
        full_path = _safe_read_path(path)
        print(f"[files/pdf-to-images] path={full_path}, dpi={dpi}, maxPages={max_pages}")
        if not os.path.exists(full_path):
            return {"error": "file not found"}
        if not full_path.lower().endswith(".pdf"):
            return {"error": "not a PDF file"}

        has_text = _pdf_has_text(full_path)
        images = _pdf_to_images_base64(full_path, dpi=dpi, max_pages=max_pages)
        print(f"[files/pdf-to-images] rendered {len(images)} pages, hasText={has_text}")
        return {"images": images, "hasText": has_text}
    except Exception as e:
        print(f"[files/pdf-to-images] ERROR: {e}")
        _log(f"[files/pdf-to-images] {e}")
        return {"error": str(e)}


@route("/api/v1/files/pdf-ocr", methods=["POST"])
def pdf_ocr(ctx: dict) -> Any:
    """
    OCR 扫描版 PDF：渲染为图片 → 调用视觉模型提取文字。
    请求: {"path": "...", "model": "(可选)", "dpi": 100, "maxPages": 10, "batchSize": 1}
    返回: {"content": "提取的文字", "pages": 页数, "method": "vision-ocr"}
    """
    body = ctx["body"]
    path = body.get("path", "")
    model = body.get("model") or _OCR_MODEL
    dpi = body.get("dpi", 100)
    max_pages = body.get("maxPages", 10)
    batch_size = body.get("batchSize", 1)
    if not path:
        return {"error": "missing path"}
    try:
        full_path = _safe_read_path(path)
        if not os.path.exists(full_path):
            return {"error": "file not found"}

        # 先尝试文本提取，按页均字符密度判断是否为扫描版
        page_count = 1
        if full_path.lower().endswith(".pdf") and _fitz is not None:
            try:
                doc = _fitz.open(full_path)
                page_count = max(doc.page_count, 1)
                doc.close()
            except Exception:
                pass

        text = ""
        if full_path.lower().endswith(".pdf"):
            text = _extract_pdf_text(full_path)
            chars_per_page = len(text.strip()) / page_count
            print(f"[files/pdf-ocr] text extraction: {len(text.strip())} chars, "
                  f"{page_count} pages, {chars_per_page:.0f} chars/page")
            if chars_per_page >= 200:
                return {"content": text, "pages": page_count, "method": "text-extraction"}
            print(f"[files/pdf-ocr] text density too low ({chars_per_page:.0f} < 200 chars/page), "
                  f"falling through to vision OCR")

        # 渲染为图片
        print(f"[files/pdf-ocr] rendering PDF pages as images ...")
        images = _pdf_to_images_base64(full_path, dpi=dpi, max_pages=max_pages)
        if not images:
            print("[files/pdf-ocr] ERROR: no images rendered (pymupdf not installed?)")
            return {"error": "Failed to render PDF pages (pymupdf not installed?)"}

        orig_size = sum(len(img["data"]) for img in images)
        images = _compress_images_for_ocr(images, quality=75)
        new_size = sum(len(img["data"]) for img in images)
        print(f"[files/pdf-ocr] rendered {len(images)} pages, "
              f"compressed {orig_size // 1024}KB → {new_size // 1024}KB, "
              f"calling OCR model: {model}")

        all_text = []
        for i in range(0, len(images), batch_size):
            batch = images[i:i + batch_size]
            print(f"[files/pdf-ocr] OCR batch {i // batch_size + 1}: pages {i + 1}-{i + len(batch)}")
            text = _ocr_images_via_vision_model(batch, model=model)
            if text:
                all_text.append(text)
                print(f"[files/pdf-ocr] batch returned {len(text)} chars")
            else:
                print(f"[files/pdf-ocr] batch returned empty")

        return {
            "content": "\n\n".join(all_text),
            "pages": len(images),
            "method": "vision-ocr",
        }
    except Exception as e:
        _log(f"[files/pdf-ocr] {e}")
        return {"error": str(e)}


@route("/api/v1/files/write", methods=["POST"])
def file_write(ctx: dict) -> Any:
    """写入文件内容（文本）"""
    body = ctx["body"]
    path = body.get("path", "")
    content = body.get("content", "")
    if not path:
        return {"error": "missing path"}
    try:
        full_path = _safe_path(path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        return {"ok": True}
    except Exception as e:
        _log(f"[files/write] {e}")
        return {"error": str(e)}


@route("/api/v1/files/exists", methods=["POST"])
def file_exists(ctx: dict) -> Any:
    body = ctx["body"]
    path = body.get("path", "")
    try:
        full_path = _safe_read_path(path)
        return {"exists": os.path.exists(full_path)}
    except Exception as e:
        return {"exists": False, "error": str(e)}


@route("/api/v1/files/delete", methods=["POST"])
def file_delete(ctx: dict) -> Any:
    body = ctx["body"]
    path = body.get("path", "")
    try:
        full_path = _safe_path(path)
        if os.path.isfile(full_path):
            os.remove(full_path)
        elif os.path.isdir(full_path):
            shutil.rmtree(full_path)
        return {"ok": True}
    except Exception as e:
        _log(f"[files/delete] {e}")
        return {"error": str(e)}


@route("/api/v1/files/list", methods=["POST"])
def file_list(ctx: dict) -> Any:
    body = ctx["body"]
    path = body.get("path", "")
    try:
        full_path = _safe_path(path) if path else _get_app_data_dir()
        if not os.path.isdir(full_path):
            return {"files": []}
        entries = []
        for name in os.listdir(full_path):
            abs_p = os.path.join(full_path, name)
            entries.append({
                "name": name,
                "isDirectory": os.path.isdir(abs_p),
                "size": os.path.getsize(abs_p) if os.path.isfile(abs_p) else 0,
            })
        return {"files": entries}
    except Exception as e:
        _log(f"[files/list] {e}")
        return {"error": str(e)}


@route("/api/v1/files/read-base64", methods=["POST"])
def file_read_base64(ctx: dict) -> Any:
    """读取文件内容（Base64 编码，用于二进制文件）"""
    body = ctx["body"]
    path = body.get("path", "")
    try:
        full_path = _safe_read_path(path)
        if not os.path.exists(full_path):
            return {"content": None}
        with open(full_path, "rb") as f:
            data = base64.b64encode(f.read()).decode("ascii")
        return {"content": data}
    except Exception as e:
        _log(f"[files/read-base64] {e}")
        return {"error": str(e)}


@route("/api/v1/files/base64-file", methods=["POST"])
def file_base64_with_mime(ctx: dict) -> Any:
    """读取文件并返回 base64 数据和 MIME 类型（用于原生文件上传给模型）"""
    body = ctx["body"]
    path = body.get("path", "")
    if not path:
        return {"error": "missing path"}
    try:
        full_path = _safe_read_path(path)
        if not os.path.exists(full_path):
            return {"error": "file not found"}
        mime, _ = mimetypes.guess_type(full_path)
        if not mime:
            mime = "application/octet-stream"
        with open(full_path, "rb") as f:
            data = base64.b64encode(f.read()).decode("ascii")
        return {"data": data, "mime": mime}
    except Exception as e:
        _log(f"[files/base64-file] {e}")
        return {"error": str(e)}


@route("/api/v1/files/mkdir", methods=["POST"])
def file_mkdir(ctx: dict) -> Any:
    body = ctx["body"]
    path = body.get("path", "")
    try:
        full_path = _safe_path(path)
        os.makedirs(full_path, exist_ok=True)
        return {"ok": True}
    except Exception as e:
        _log(f"[files/mkdir] {e}")
        return {"error": str(e)}


@route("/api/v1/files/unzip", methods=["POST"])
def file_unzip(ctx: dict) -> Any:
    """解压 ZIP 文件"""
    body = ctx["body"]
    zip_path = body.get("zipPath", "")
    dest_path = body.get("destPath", "")
    try:
        full_zip = _safe_path(zip_path)
        full_dest = _safe_path(dest_path)
        os.makedirs(full_dest, exist_ok=True)
        with zipfile.ZipFile(full_zip, "r") as z:
            z.extractall(full_dest)
        return {"ok": True}
    except Exception as e:
        _log(f"[files/unzip] {e}")
        return {"error": str(e)}


@route("/api/v1/files/app-data-dir", methods=["GET"])
def get_app_data_dir(ctx: dict) -> Any:
    """返回应用数据目录路径"""
    return {"path": _get_app_data_dir()}


@route("/api/v1/files/open-external", methods=["POST"])
def open_external(ctx: dict) -> Any:
    """用系统默认程序打开文件或 URL"""
    import subprocess
    body = ctx["body"]
    target = body.get("path", body.get("url", ""))
    if not target:
        return {"error": "missing path or url"}
    try:
        if os.name == "nt":
            os.startfile(target)
        else:
            subprocess.Popen(["xdg-open", target])
        return {"ok": True}
    except Exception as e:
        _log(f"[files/open-external] {e}")
        return {"error": str(e)}


@route("/api/v1/files/upload", methods=["POST"])
def file_upload(ctx: dict) -> Any:
    """
    复制源文件到应用数据目录，返回更新后的 FileMetadata。
    接收 FileMetadata JSON: { id, path, ext, name, ... }
    """
    import uuid as _uuid
    import datetime
    body = ctx["body"]
    file_meta = body if isinstance(body, dict) else {}
    source_path = file_meta.get("path", "")
    if not source_path or not os.path.exists(source_path):
        return {"error": f"Source file not found: {source_path}"}
    file_id = file_meta.get("id") or str(_uuid.uuid4())
    file_ext = file_meta.get("ext", "")
    os.makedirs(_get_app_data_dir(), exist_ok=True)
    dest_filename = file_id + file_ext
    dest_path = os.path.join(_get_app_data_dir(), dest_filename)
    try:
        if os.path.normpath(os.path.abspath(source_path)) != os.path.normpath(os.path.abspath(dest_path)):
            shutil.copy2(source_path, dest_path)
    except shutil.SameFileError:
        pass
    file_meta["path"] = dest_path.replace("\\", "/")
    file_meta["name"] = dest_filename
    if "created_at" not in file_meta:
        file_meta["created_at"] = datetime.datetime.now().isoformat()
    return file_meta


@route("/api/v1/files/binary-image", methods=["POST"])
def binary_image(ctx: dict) -> Any:
    """
    读取图片文件并返回 base64 编码。
    返回: { mime, base64, data }
    """
    body = ctx["body"]
    file_id = body.get("fileId", body.get("path", ""))
    if not file_id:
        return None
    file_path = file_id
    if not os.path.isabs(file_id) or not os.path.exists(file_id):
        file_path = os.path.join(_get_app_data_dir(), file_id)
    if not os.path.exists(file_path):
        _log(f"[files/binary-image] not found: {file_path}")
        return None
    _, ext = os.path.splitext(file_path.lower())
    _SUPPORTED = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif",
                  ".webp", ".svg", ".ico"}
    if ext not in _SUPPORTED:
        return None
    with open(file_path, "rb") as f:
        raw = f.read()
    b64 = base64.b64encode(raw).decode("utf-8")
    ext_c = ext.lstrip(".").lower()
    if ext_c == "jpg":
        ext_c = "jpeg"
    elif ext_c == "svg":
        ext_c = "svg+xml"
    mime = f"image/{ext_c}"
    return {"mime": mime, "base64": b64, "data": f"data:{mime};base64,{b64}"}


@route("/api/v1/files/save-base64-image", methods=["POST"])
def save_base64_image(ctx: dict) -> Any:
    """解码 base64/data-URL 图片并保存，返回 FileMetadata"""
    import uuid as _uuid
    import datetime
    body = ctx["body"]
    b64_str = body.get("data", body.get("base64", ""))
    if not b64_str:
        return {"error": "missing base64 data"}
    if b64_str.startswith("data:"):
        parts = b64_str.split(",", 1)
        if len(parts) == 2:
            b64_str = parts[1]
    image_bytes = base64.b64decode(b64_str)
    file_uuid = str(_uuid.uuid4())
    ext = ".png"
    os.makedirs(_get_app_data_dir(), exist_ok=True)
    dest = os.path.join(_get_app_data_dir(), file_uuid + ext)
    with open(dest, "wb") as f:
        f.write(image_bytes)
    return {
        "id": file_uuid,
        "origin_name": file_uuid + ext,
        "name": file_uuid + ext,
        "path": dest.replace("\\", "/"),
        "created_at": datetime.datetime.now().isoformat(),
        "size": len(image_bytes),
        "ext": ext,
        "type": "image",
        "count": 1,
    }


@route("/api/v1/files/save-pasted-image", methods=["POST"])
def save_pasted_image(ctx: dict) -> Any:
    """解码粘贴图片（base64 编码的二进制）并保存，返回 FileMetadata"""
    import uuid as _uuid
    import datetime
    body = ctx["body"]
    b64_data = body.get("data", "")
    ext = body.get("ext", ".png")
    if not b64_data:
        return {"error": "missing image data"}
    image_bytes = base64.b64decode(b64_data)
    file_uuid = str(_uuid.uuid4())
    if not ext.startswith("."):
        ext = "." + ext
    os.makedirs(_get_app_data_dir(), exist_ok=True)
    dest = os.path.join(_get_app_data_dir(), file_uuid + ext)
    with open(dest, "wb") as f:
        f.write(image_bytes)
    return {
        "id": file_uuid,
        "origin_name": f"pasted_image_{file_uuid}{ext}",
        "name": file_uuid + ext,
        "path": dest.replace("\\", "/"),
        "created_at": datetime.datetime.now().isoformat(),
        "size": os.path.getsize(dest),
        "ext": ext,
        "type": "image",
        "count": 1,
    }


@route("/api/v1/files/write-with-id", methods=["POST"])
def write_with_id(ctx: dict) -> Any:
    """使用文件 ID 写入内容到应用数据目录"""
    body = ctx["body"]
    file_id = body.get("fileId", body.get("id", ""))
    content = body.get("content", "")
    if not file_id:
        return {"error": "missing fileId"}
    dest = os.path.join(_get_app_data_dir(), file_id)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "w", encoding="utf-8") as f:
        f.write(content)
    return {"ok": True}


def _stream_file_with_range(handler, ctx: dict, file_path: str, safe_name: str) -> Any:
    """以二进制流式返回文件，支持 Range 请求（<video>/<audio> 拖动播放必需）。"""
    _EXTRA_MIME = {
        ".glb": "model/gltf-binary",
        ".gltf": "model/gltf+json",
        ".usdz": "model/vnd.usdz+zip",
        ".obj": "text/plain",
        ".ply": "application/octet-stream",
        # 显式指定视频 MIME：Windows 上 mimetypes 依赖注册表，可能把 webm 猜成
        # octet-stream 导致 <video> 不播放。
        ".webm": "video/webm",
        ".mp4": "video/mp4",
    }
    ext = os.path.splitext(file_path)[1].lower()
    mime_type = _EXTRA_MIME.get(ext)
    if not mime_type:
        mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        mime_type = "application/octet-stream"

    # 大小写无关地读取 Range 请求头（<video> 等会发 Range 以支持拖动/边下边播）
    req_headers = ctx.get("headers", {}) or {}
    range_header = ""
    for k, v in req_headers.items():
        if k.lower() == "range":
            range_header = v or ""
            break

    try:
        file_size = os.path.getsize(file_path)

        # 处理 Range 请求：返回 206 Partial Content，<video> 才能稳定播放/拖动
        if range_header.startswith("bytes="):
            rng = range_header.split("=", 1)[1].split(",")[0].strip()
            start_s, _, end_s = rng.partition("-")
            try:
                start = int(start_s) if start_s else 0
            except ValueError:
                start = 0
            try:
                end = int(end_s) if end_s else file_size - 1
            except ValueError:
                end = file_size - 1

            # 后缀范围 bytes=-N（请求最后 N 字节）
            if not start_s and end_s:
                length = min(int(end_s), file_size)
                start = file_size - length
                end = file_size - 1

            if start >= file_size or start > end:
                handler.send_response(416)
                handler.send_header("Content-Range", f"bytes */{file_size}")
                handler.send_header("Access-Control-Allow-Origin", "*")
                handler.end_headers()
                return STREAMING_HANDLED

            end = min(end, file_size - 1)
            length = end - start + 1
            with open(file_path, "rb") as f:
                f.seek(start)
                data = f.read(length)

            handler.send_response(206)
            handler.send_header("Content-Type", mime_type)
            handler.send_header("Content-Length", str(length))
            handler.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
            handler.send_header("Accept-Ranges", "bytes")
            handler.send_header("Content-Disposition", f'inline; filename="{safe_name}"')
            handler.send_header("Access-Control-Allow-Origin", "*")
            handler.end_headers()
            handler.wfile.write(data)
            handler.wfile.flush()
            return STREAMING_HANDLED

        # 无 Range：整文件 200，并声明支持 Range（让播放器后续可发 Range）
        with open(file_path, "rb") as f:
            data = f.read()
        handler.send_response(200)
        handler.send_header("Content-Type", mime_type)
        handler.send_header("Content-Length", str(len(data)))
        handler.send_header("Accept-Ranges", "bytes")
        handler.send_header("Content-Disposition", f'inline; filename="{safe_name}"')
        handler.send_header("Access-Control-Allow-Origin", "*")
        handler.end_headers()
        handler.wfile.write(data)
        handler.wfile.flush()
    except Exception as e:
        _log(f"[files/serve] error: {e}")
        handler.send_response(500)
        handler.send_header("Content-Type", "text/plain")
        handler.end_headers()
        handler.wfile.write(str(e).encode("utf-8"))
    return STREAMING_HANDLED


def _resolve_query_file(ctx: dict):
    """从 ?name=xxx 解析出 (handler, safe_name, file_path)。出错时直接写响应并返回 None。"""
    handler = ctx["_handler"]
    query = ctx.get("query", {})
    name = query.get("name", [""])[0] if isinstance(query.get("name"), list) else query.get("name", "")
    if not name:
        handler.send_response(400)
        handler.send_header("Content-Type", "text/plain")
        handler.end_headers()
        handler.wfile.write(b"missing 'name' query parameter")
        return None

    safe_name = os.path.basename(name)
    session_id = ctx.get("session_id", "")
    file_path = _find_file_in_app_data(safe_name, session_id)

    if not file_path:
        handler.send_response(404)
        handler.send_header("Content-Type", "text/plain")
        handler.end_headers()
        handler.wfile.write(b"file not found")
        return None

    return handler, safe_name, file_path


def _resolve_query_file_by_path(ctx: dict):
    """
    从 ?path=<absolute-path> 解析出 (handler, safe_name, file_path)。
    路径必须落在 APP_DATA_DIR 或 resources 目录内（见 _safe_read_path），
    用于 Houdini WebEngineView 里 file:// 资源重定向（见
    core/window_manager.py 的 _FileUrlRedirectInterceptor）。出错时直接
    写响应并返回 None。
    """
    handler = ctx["_handler"]
    query = ctx.get("query", {})
    raw_path = query.get("path", [""])[0] if isinstance(query.get("path"), list) else query.get("path", "")
    if not raw_path:
        return None
    try:
        file_path = _safe_read_path(raw_path)
    except PermissionError:
        handler.send_response(403)
        handler.send_header("Content-Type", "text/plain")
        handler.end_headers()
        handler.wfile.write(b"access denied")
        return None
    if not os.path.isfile(file_path):
        handler.send_response(404)
        handler.send_header("Content-Type", "text/plain")
        handler.end_headers()
        handler.wfile.write(b"file not found")
        return None
    return handler, os.path.basename(file_path), file_path


@route("/api/v1/files/serve", methods=["GET"])
def file_serve(ctx: dict) -> Any:
    """
    直接以原始二进制格式提供文件（用于 PDF 预览、图片/头像/3D模型等场景）。

    支持两种查询方式：
    - GET /api/v1/files/serve?name=<filename>
      filename 是 APP_DATA_DIR 下的文件名（如 uuid.pdf），按名称搜索，
      兼容跨 DCC 历史文件（见 _find_file_in_app_data）。
    - GET /api/v1/files/serve?path=<absolute-path>
      绝对路径，限定在 APP_DATA_DIR 或 resources 目录内（见 _safe_read_path）。
      用于 Houdini WebEngineView 里把 v2.0 前端生成的 file:// URL 重定向到
      这里（见 core/window_manager.py 的 _FileUrlRedirectInterceptor）。
    """
    query = ctx.get("query", {})
    raw_path = query.get("path", [""])[0] if isinstance(query.get("path"), list) else query.get("path", "")
    if raw_path:
        resolved = _resolve_query_file_by_path(ctx)
    else:
        resolved = _resolve_query_file(ctx)
    if resolved is None:
        return STREAMING_HANDLED
    handler, safe_name, file_path = resolved
    return _stream_file_with_range(handler, ctx, file_path, safe_name)


# 视频预览转码缓存后缀。QtWebEngine（开源 Chromium）不带 H.264 专有解码器，
# 用户上传的 mp4/mov 等大多是 H.264，直接 serve 在 Houdini webview 里放不了，
# 这里按需转成 WebM(VP9) 并缓存在源文件旁边。
_PREVIEW_SUFFIX = ".preview.webm"

# 浏览器/webview 可直接解码的容器，无需转码
_DIRECT_PLAY_EXTS = {".webm", ".ogg", ".ogv"}


@route("/api/v1/files/preview-video", methods=["GET"])
def file_preview_video(ctx: dict) -> Any:
    """
    视频预览：按需把本地视频转码成 WebM 后以 Range 流式返回。
    GET /api/v1/files/preview-video?name=<filename>

    - name 指向 APP_DATA_DIR 下的视频文件（如 uuid.mp4）
    - 已是 webm/ogg 时直接返回原文件
    - 转码结果缓存为 <原文件>.preview.webm，二次播放零开销
    - ffmpeg 不可用或转码失败时回退返回原文件（带 H.264 解码器的环境仍可播）
    """
    resolved = _resolve_query_file(ctx)
    if resolved is None:
        return STREAMING_HANDLED
    handler, safe_name, file_path = resolved

    ext = os.path.splitext(file_path)[1].lower()
    if ext in _DIRECT_PLAY_EXTS:
        return _stream_file_with_range(handler, ctx, file_path, safe_name)

    cache_path = file_path + _PREVIEW_SUFFIX
    if not (os.path.isfile(cache_path) and os.path.getsize(cache_path) > 0):
        try:
            from .generate_video import _transcode_to_webm

            _log(f"[files/preview-video] transcoding {file_path} -> {cache_path}")
            ok, err = _transcode_to_webm(file_path, cache_path)
            if not ok:
                _log(f"[files/preview-video] transcode failed, fallback to original: {err}")
                try:
                    if os.path.exists(cache_path):
                        os.remove(cache_path)
                except Exception:
                    pass
                return _stream_file_with_range(handler, ctx, file_path, safe_name)
        except Exception as e:
            _log(f"[files/preview-video] transcode error, fallback to original: {e}")
            return _stream_file_with_range(handler, ctx, file_path, safe_name)

    preview_name = os.path.splitext(safe_name)[0] + ".webm"
    return _stream_file_with_range(handler, ctx, cache_path, preview_name)


# ─── 二进制工具安装（uv / bun）──────────────────────────────────────────────────

def _install_binary(url: str, dest_dir: str, is_zip: bool) -> bool:
    """下载并解压二进制工具到 dest_dir"""
    import urllib.request as _req
    import tempfile
    suffix = ".zip" if is_zip else ".tar.gz"
    tmp_fd, tmp_path = tempfile.mkstemp(suffix=suffix)
    os.close(tmp_fd)
    try:
        _log(f"[install-binary] Downloading {url}")
        _req.urlretrieve(url, tmp_path)
        _log(f"[install-binary] Extracting to {dest_dir}")
        os.makedirs(dest_dir, exist_ok=True)
        if is_zip:
            with zipfile.ZipFile(tmp_path, "r") as z:
                for member in z.namelist():
                    if not member.endswith("/"):
                        fname = os.path.basename(member)
                        if fname:
                            out = os.path.join(dest_dir, fname)
                            with z.open(member) as src, open(out, "wb") as dst:
                                shutil.copyfileobj(src, dst)
                            if os.name != "nt":
                                os.chmod(out, 0o755)
        else:
            import tarfile
            with tarfile.open(tmp_path, "r:gz") as t:
                for member in t.getmembers():
                    if member.isfile():
                        fname = os.path.basename(member.name)
                        if fname:
                            out = os.path.join(dest_dir, fname)
                            with t.extractfile(member) as src, open(out, "wb") as dst:
                                shutil.copyfileobj(src, dst)
                            if os.name != "nt":
                                os.chmod(out, 0o755)
        return True
    finally:
        try:
            os.unlink(tmp_path)
        except Exception:
            pass


@route("/api/v1/files/install-bun", methods=["POST"])
def install_bun(ctx: dict) -> Any:
    """下载并安装 Bun 到 ~/.cherrystudio/bin"""
    import sys as _sys
    try:
        from ...core.paths import get_bin_dir
        bin_dir = get_bin_dir()
        plat = _sys.platform
        arch = "x64" if _sys.maxsize > 2**32 else "x86"
        _PKGS = {
            "darwin-arm64": "bun-darwin-aarch64.zip",
            "darwin-x64": "bun-darwin-x64.zip",
            "win32-x64": "bun-windows-x64.zip",
            "win32-arm64": "bun-windows-x64.zip",
            "linux-x64": "bun-linux-x64.zip",
            "linux-arm64": "bun-linux-aarch64.zip",
        }
        key = f"{'darwin' if plat == 'darwin' else 'win32' if plat == 'win32' else 'linux'}-{arch}"
        pkg = _PKGS.get(key)
        if not pkg:
            return {"ok": False, "error": f"Unsupported platform: {key}"}
        url = f"https://gitcode.com/CherryHQ/bun/releases/download/bun-v1.3.1/{pkg}"
        ok = _install_binary(url, bin_dir, is_zip=True)
        return {"ok": ok}
    except Exception as e:
        _log(f"[install-bun] {e}")
        return {"ok": False, "error": str(e)}


@route("/api/v1/files/install-uv", methods=["POST"])
def install_uv(ctx: dict) -> Any:
    """下载并安装 UV 到 ~/.cherrystudio/bin"""
    import sys as _sys
    try:
        from ...core.paths import get_bin_dir
        bin_dir = get_bin_dir()
        plat = _sys.platform
        arch = "x64" if _sys.maxsize > 2**32 else "x86"
        _PKGS = {
            "darwin-arm64": ("uv-aarch64-apple-darwin.tar.gz", False),
            "darwin-x64": ("uv-x86_64-apple-darwin.tar.gz", False),
            "win32-x64": ("uv-x86_64-pc-windows-msvc.zip", True),
            "win32-arm64": ("uv-aarch64-pc-windows-msvc.zip", True),
            "linux-x64": ("uv-x86_64-unknown-linux-gnu.tar.gz", False),
            "linux-arm64": ("uv-aarch64-unknown-linux-gnu.tar.gz", False),
        }
        key = f"{'darwin' if plat == 'darwin' else 'win32' if plat == 'win32' else 'linux'}-{arch}"
        entry = _PKGS.get(key)
        if not entry:
            return {"ok": False, "error": f"Unsupported platform: {key}"}
        pkg, is_zip = entry
        url = f"https://github.com/astral-sh/uv/releases/download/0.5.8/{pkg}"
        ok = _install_binary(url, bin_dir, is_zip=is_zip)
        return {"ok": ok}
    except Exception as e:
        _log(f"[install-uv] {e}")
        return {"ok": False, "error": str(e)}
