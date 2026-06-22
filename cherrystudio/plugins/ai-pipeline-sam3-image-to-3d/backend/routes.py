"""挂载本插件 webview 静态目录；前端会跳转到 ai-pipeline /launch/。"""

from __future__ import annotations

import os

from cherrystudio.backend.pipeline_bridge_static import register_plugins_ui_static

_PLUGIN_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_FRONTEND_DIR = os.path.join(_PLUGIN_DIR, "frontend")

register_plugins_ui_static("/plugins-ui/ai-pipeline-sam3-image-to-3d", _FRONTEND_DIR)
