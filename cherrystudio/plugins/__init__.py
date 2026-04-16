"""
Plugin system loader.

Scans cherrystudio/plugins/ for subdirectories containing manifest.json,
parses manifests, and dynamically imports their backend route modules.
"""

import importlib
import importlib.util
import json
import os
import sys
from typing import Any, Dict, List, Optional

from ..utils.logger import network_logger

_log = network_logger

_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
_CHERRYSTUDIO_PARENT = os.path.dirname(os.path.dirname(_BASE_DIR))
_loaded_plugins: Dict[str, Dict[str, Any]] = {}


def _load_manifest(plugin_dir: str) -> Optional[Dict[str, Any]]:
    manifest_path = os.path.join(plugin_dir, "manifest.json")
    if not os.path.isfile(manifest_path):
        return None
    try:
        with open(manifest_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        _log(f"[PluginLoader] Failed to parse manifest at {manifest_path}: {e}")
        return None


def _merge_after_plugin_load():
    """
    Plugin modules use absolute imports (e.g. `from cherrystudio.backend.server import route`)
    which may load a FRESH copy of server.py with separate route registries.
    This function merges any new routes and MCP clients back into the real registries.
    """
    from ..backend.server import _routes as main_routes, _prefix_routes as main_prefix_routes

    # Merge routes from re-imported server module
    srv_mod = sys.modules.get("cherrystudio.backend.server")
    if srv_mod:
        other_routes = getattr(srv_mod, "_routes", {})
        if other_routes is not main_routes:
            for path, methods in other_routes.items():
                if path not in main_routes:
                    main_routes[path] = methods
                    _log(f"[PluginLoader]   Merged route: {path}")

        other_prefix_routes = getattr(srv_mod, "_prefix_routes", {})
        if other_prefix_routes is not main_prefix_routes:
            for prefix, methods in other_prefix_routes.items():
                if prefix not in main_prefix_routes:
                    main_prefix_routes[prefix] = methods
                    _log(f"[PluginLoader]   Merged prefix route: {prefix}")

    # Merge MCP clients from re-imported mcp module
    try:
        from ..backend.routes.mcp import _clients as main_clients, _clients_lock as main_lock
        mcp_mod = sys.modules.get("cherrystudio.backend.routes.mcp")
        if mcp_mod:
            other_clients = getattr(mcp_mod, "_clients", {})
            if other_clients is not main_clients:
                with main_lock:
                    for sid, client in other_clients.items():
                        if sid not in main_clients:
                            main_clients[sid] = client
                            _log(f"[PluginLoader]   Merged MCP client: {sid}")
    except Exception as e:
        _log(f"[PluginLoader] MCP client merge skipped: {e}")


def _import_plugin_routes(plugin_id: str, plugin_dir: str, routes_rel: str):
    routes_path = os.path.join(plugin_dir, routes_rel)
    if not os.path.isfile(routes_path):
        _log(f"[PluginLoader] Routes file not found: {routes_path}")
        return

    routes_dir = os.path.dirname(os.path.abspath(routes_path))

    if _CHERRYSTUDIO_PARENT not in sys.path:
        sys.path.insert(0, _CHERRYSTUDIO_PARENT)
        _log(f"[PluginLoader] Added to sys.path: {_CHERRYSTUDIO_PARENT}")

    if routes_dir not in sys.path:
        sys.path.insert(0, routes_dir)
        _log(f"[PluginLoader] Added to sys.path: {routes_dir}")

    module_name = f"cherrystudio_plugin_{plugin_id}_routes"
    _log(f"[PluginLoader] Loading module '{module_name}' from {routes_path}")

    try:
        spec = importlib.util.spec_from_file_location(module_name, routes_path)
        if spec and spec.loader:
            module = importlib.util.module_from_spec(spec)
            sys.modules[module_name] = module
            spec.loader.exec_module(module)
            _log(f"[PluginLoader] Loaded routes for plugin '{plugin_id}' OK")
            _merge_after_plugin_load()
        else:
            _log(f"[PluginLoader] spec_from_file_location returned None for '{routes_path}'")
    except Exception as e:
        _log(f"[PluginLoader] FAILED to load routes for '{plugin_id}': {type(e).__name__}: {e}")
        import traceback
        _log(traceback.format_exc())


def load_all_plugins():
    """Scan plugins directory, load manifests, and import backend routes."""
    if _loaded_plugins:
        _log(f"[PluginLoader] Already loaded, skipping. plugins={list(_loaded_plugins.keys())}")
        return

    _log(f"[PluginLoader] Scanning plugins dir: {_BASE_DIR}")
    if not os.path.isdir(_BASE_DIR):
        _log("[PluginLoader] Plugins dir not found, skipping")
        return

    entries = os.listdir(_BASE_DIR)
    for entry in entries:
        plugin_dir = os.path.join(_BASE_DIR, entry)
        if not os.path.isdir(plugin_dir):
            continue
        if entry.startswith("_") or entry.startswith("."):
            continue

        manifest = _load_manifest(plugin_dir)
        if manifest is None:
            continue

        plugin_id = manifest.get("id", entry)
        _loaded_plugins[plugin_id] = {
            "manifest": manifest,
            "directory": plugin_dir,
            "status": "loaded",
        }
        _log(f"[PluginLoader] Discovered plugin: {plugin_id} v{manifest.get('version', '?')}")

        routes_rel = manifest.get("backend_routes")
        if routes_rel:
            _import_plugin_routes(plugin_id, plugin_dir, routes_rel)

    from ..backend.server import _routes
    sam3_routes = [k for k in _routes.keys() if 'sam3' in k]
    _log(f"[PluginLoader] SAM3 routes: {sam3_routes}")
    _log(f"[PluginLoader] Total routes: {len(_routes)}")


def get_installed_plugins() -> List[Dict[str, Any]]:
    """Return list of all loaded plugin manifests with status info."""
    results = []
    for plugin_id, info in _loaded_plugins.items():
        entry = dict(info["manifest"])
        entry["_status"] = info["status"]
        entry["_directory"] = info["directory"]
        results.append(entry)
    return results


def get_plugin(plugin_id: str) -> Optional[Dict[str, Any]]:
    info = _loaded_plugins.get(plugin_id)
    if info:
        entry = dict(info["manifest"])
        entry["_status"] = info["status"]
        entry["_directory"] = info["directory"]
        return entry
    return None
