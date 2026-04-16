"""
Centralized path resolution for Cherry Studio.

All paths under ~/.cherrystudio/ are routed through this module so that
multiple DCC types (standalone / maya / houdini / blender) and multiple
instances of the same DCC can coexist without conflicts.

Directory layout:
    ~/.cherrystudio/
        bin/                         # shared: uv, bun executables
        standalone/                  # standalone app data (localStorage, files …)
        maya/                        # maya app data
        houdini/                     # houdini app data
        profiles/<session-uuid>/     # per-instance Chromium profile
        ports/<session-uuid>.port    # per-instance backend port file
"""

import os
from functools import lru_cache

_BASE = os.path.join(os.path.expanduser("~"), ".cherrystudio")


def get_base_dir() -> str:
    """Root directory (~/.cherrystudio/).  Contains shared ``bin/`` etc."""
    return _BASE


@lru_cache(maxsize=1)
def _detect_dcc_type_cached() -> str:
    from .app_lifecycle import detect_dcc_type
    return detect_dcc_type()


def get_app_data_dir(dcc_type: str | None = None, session_id: str | None = None) -> str:
    """Per-DCC-type (optionally per-session) data directory.

    When *session_id* is provided, files are stored under a session-specific
    subdirectory so that multiple instances of the same DCC type don't share
    the same file pool.

    Examples:
        ``~/.cherrystudio/standalone/``
        ``~/.cherrystudio/houdini/``
        ``~/.cherrystudio/houdini/sessions/<session-uuid>/``
    """
    dcc = dcc_type or _detect_dcc_type_cached()
    if session_id:
        d = os.path.join(_BASE, dcc, "sessions", session_id)
    else:
        d = os.path.join(_BASE, dcc)
    os.makedirs(d, exist_ok=True)
    return d


def get_profile_dir(session_id: str) -> str:
    """Per-instance Chromium profile directory.

    Each process gets its own profile dir so that two instances of the
    same DCC (or different DCCs) never fight over Chromium lock files.

    Example: ``~/.cherrystudio/profiles/<session-uuid>/``
    """
    d = os.path.join(_BASE, "profiles", session_id)
    os.makedirs(d, exist_ok=True)
    return d


def get_port_file(session_id: str) -> str:
    """Per-instance backend port file path.

    Example: ``~/.cherrystudio/ports/<session-uuid>.port``
    """
    ports_dir = os.path.join(_BASE, "ports")
    os.makedirs(ports_dir, exist_ok=True)
    return os.path.join(ports_dir, f"{session_id}.port")


def get_bin_dir() -> str:
    """Shared binary directory for uv, bun, etc.

    Always ``~/.cherrystudio/bin/`` regardless of DCC type.
    """
    d = os.path.join(_BASE, "bin")
    os.makedirs(d, exist_ok=True)
    return d


def list_port_files() -> list[str]:
    """Return all existing port files under ``~/.cherrystudio/ports/``."""
    ports_dir = os.path.join(_BASE, "ports")
    if not os.path.isdir(ports_dir):
        return []
    return [
        os.path.join(ports_dir, f)
        for f in os.listdir(ports_dir)
        if f.endswith(".port")
    ]


def cleanup_stale_profiles(max_age_hours: int = 72):
    """Remove profile directories older than *max_age_hours* that have no
    matching live port file (i.e. the owning process is gone).

    Call this periodically or at startup to prevent unbounded growth of
    ``~/.cherrystudio/profiles/``.
    """
    import shutil
    import time

    profiles_root = os.path.join(_BASE, "profiles")
    if not os.path.isdir(profiles_root):
        return

    live_sessions = set()
    for pf in list_port_files():
        name = os.path.basename(pf)
        if name.endswith(".port"):
            live_sessions.add(name[:-5])

    cutoff = time.time() - max_age_hours * 3600
    for entry in os.listdir(profiles_root):
        entry_path = os.path.join(profiles_root, entry)
        if not os.path.isdir(entry_path):
            continue
        if entry in live_sessions:
            continue
        try:
            mtime = os.path.getmtime(entry_path)
            if mtime < cutoff:
                shutil.rmtree(entry_path, ignore_errors=True)
        except Exception:
            pass
