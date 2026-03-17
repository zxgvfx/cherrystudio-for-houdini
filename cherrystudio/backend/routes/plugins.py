"""
Plugin system API routes.

Provides endpoints for listing, querying, installing, and uninstalling plugins.
"""

import json
import os
import shutil
import zipfile
import tempfile
from typing import Any

from ..server import route
from ...plugins import get_installed_plugins, get_plugin, _BASE_DIR as PLUGINS_DIR, load_all_plugins
from ...utils.logger import network_logger

_log = network_logger


@route("/api/v1/plugins/list", methods=["GET"])
def plugins_list(ctx: dict) -> Any:
    plugins = get_installed_plugins()
    safe_plugins = []
    for p in plugins:
        safe = {k: v for k, v in p.items() if not k.startswith("_")}
        safe["status"] = p.get("_status", "unknown")
        safe_plugins.append(safe)
    return {"plugins": safe_plugins}


@route("/api/v1/plugins/status", methods=["GET"])
def plugin_status(ctx: dict) -> Any:
    query = ctx.get("query", {})
    plugin_id = query.get("id", [""])[0] if isinstance(query.get("id"), list) else query.get("id", "")
    if not plugin_id:
        return {"error": "missing 'id' query parameter"}
    info = get_plugin(plugin_id)
    if not info:
        return {"error": f"plugin not found: {plugin_id}"}
    safe = {k: v for k, v in info.items() if not k.startswith("_")}
    safe["status"] = info.get("_status", "unknown")
    return safe


@route("/api/v1/plugins/install", methods=["POST"])
def plugin_install(ctx: dict) -> Any:
    """
    Install a plugin from a zip file URL or local path.
    Body: { "source": "https://..." or "/path/to/plugin.zip" }
    The zip must contain a directory with a manifest.json at the top level.
    """
    body = ctx["body"]
    source = body.get("source", "")
    if not source:
        return {"error": "missing 'source' (URL or local path)"}

    try:
        if source.startswith("http://") or source.startswith("https://"):
            import urllib.request
            tmp_fd, tmp_path = tempfile.mkstemp(suffix=".zip")
            os.close(tmp_fd)
            try:
                urllib.request.urlretrieve(source, tmp_path)
                return _install_from_zip(tmp_path)
            finally:
                try:
                    os.unlink(tmp_path)
                except Exception:
                    pass
        elif os.path.isfile(source) and source.endswith(".zip"):
            return _install_from_zip(source)
        elif os.path.isdir(source):
            manifest_path = os.path.join(source, "manifest.json")
            if not os.path.isfile(manifest_path):
                return {"error": "Directory does not contain manifest.json"}
            with open(manifest_path, "r", encoding="utf-8") as f:
                manifest = json.load(f)
            plugin_id = manifest.get("id", os.path.basename(source))
            dest = os.path.join(PLUGINS_DIR, plugin_id)
            if os.path.exists(dest):
                shutil.rmtree(dest)
            shutil.copytree(source, dest)
            _log(f"[Plugins] Installed plugin '{plugin_id}' from directory")
            return {"ok": True, "plugin_id": plugin_id}
        else:
            return {"error": f"Invalid source: {source}"}
    except Exception as e:
        _log(f"[Plugins] Install error: {e}")
        return {"error": str(e)}


@route("/api/v1/plugins/uninstall", methods=["POST"])
def plugin_uninstall(ctx: dict) -> Any:
    """
    Uninstall a plugin by ID.
    Body: { "plugin_id": "sam3-segmentation" }
    """
    body = ctx["body"]
    plugin_id = body.get("plugin_id", "")
    if not plugin_id:
        return {"error": "missing 'plugin_id'"}

    plugin_dir = os.path.join(PLUGINS_DIR, plugin_id)
    if not os.path.isdir(plugin_dir):
        return {"error": f"Plugin not found: {plugin_id}"}

    try:
        shutil.rmtree(plugin_dir)
        _log(f"[Plugins] Uninstalled plugin '{plugin_id}'")
        return {"ok": True}
    except Exception as e:
        _log(f"[Plugins] Uninstall error: {e}")
        return {"error": str(e)}


def _install_from_zip(zip_path: str) -> dict:
    """Extract plugin zip and install to plugins directory."""
    with tempfile.TemporaryDirectory() as tmp_dir:
        with zipfile.ZipFile(zip_path, "r") as z:
            z.extractall(tmp_dir)

        manifest_path = None
        for root, dirs, files in os.walk(tmp_dir):
            if "manifest.json" in files:
                manifest_path = os.path.join(root, "manifest.json")
                break

        if not manifest_path:
            return {"error": "Zip does not contain manifest.json"}

        plugin_root = os.path.dirname(manifest_path)
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)

        plugin_id = manifest.get("id", os.path.basename(plugin_root))
        dest = os.path.join(PLUGINS_DIR, plugin_id)

        if os.path.exists(dest):
            shutil.rmtree(dest)
        shutil.copytree(plugin_root, dest)

        _log(f"[Plugins] Installed plugin '{plugin_id}' from zip")
        return {"ok": True, "plugin_id": plugin_id}
