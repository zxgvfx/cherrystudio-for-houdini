"""Shared version and platform metadata for Cherry Studio for Houdini.

This keeps Python-side APIs and injected JavaScript in sync with the
embedded Cherry Studio web app version.
"""

APP_VERSION = "1.7.1"
# For now we target Windows Houdini; if cross‑platform support is added
# later these can be expanded to detect the runtime platform/arch.
APP_PLATFORM = "win32"
APP_ARCH = "x64"
