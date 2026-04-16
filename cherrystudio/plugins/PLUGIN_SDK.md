# Cherry Studio Plugin SDK

## Overview

Cherry Studio supports a plugin system for extending functionality with custom tools, UI components, and backend routes. Plugins are self-contained directories placed in `cherrystudio/plugins/`.

## Plugin Structure

```
cherrystudio/plugins/
  my-plugin/
    manifest.json          # Required: Plugin descriptor
    backend/
      __init__.py
      routes.py            # HTTP route definitions
    frontend/
      myTool.tsx           # Frontend tool definition (optional)
    README.md              # Plugin documentation (optional)
```

## manifest.json

Every plugin must have a `manifest.json` at its root:

```json
{
  "id": "my-plugin",
  "name": "My Plugin Display Name",
  "version": "1.0.0",
  "description": "What the plugin does",
  "icon": "cube",
  "launcher": {
    "enabled": true,
    "type": "native_window",
    "label": "My Plugin",
    "category": "tools",
    "pinnable": true,
    "entry": {
      "action": "api",
      "endpoint": "/api/v1/plugins/my-plugin/open-gui"
    }
  },
  "modes": {
    "default": {
      "label": "Default Mode",
      "description": "Description shown in slash menu",
      "trigger": "/my-plugin"
    },
    "auto": {
      "label": "Auto Mode",
      "description": "LLM-orchestrated mode",
      "trigger": "/my-plugin-auto",
      "requires_llm": true,
      "requires_image": true
    }
  },
  "backend_routes": "backend/routes.py",
  "output_types": ["model_3d", "image", "text"],
  "dependencies": {
    "servers": ["my_server:8000"]
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique plugin identifier (kebab-case) |
| `name` | string | Yes | Display name |
| `version` | string | Yes | SemVer version |
| `description` | string | Yes | Brief description |
| `icon` | string | No | Icon name (cube, image, code, tool) |
| `launcher` | object | No | GUI launcher metadata for click-to-open plugins |
| `modes` | object | No | Available interaction modes |
| `backend_routes` | string | No | Path to backend routes module |
| `output_types` | string[] | No | Types of output the plugin produces |
| `dependencies` | object | No | External dependencies |

## Backend Routes

Routes are defined using the same decorator pattern as core routes:

```python
from cherrystudio.backend.server import route, STREAMING_HANDLED

@route("/api/v1/plugins/my-plugin/my-action", methods=["POST"])
def my_action(ctx: dict):
    body = ctx["body"]
    # Process request...
    return {"ok": True, "result": "..."}
```

The `ctx` dict contains:
- `method`: HTTP method
- `path`: Request path
- `query`: Query parameters
- `body`: Parsed JSON body
- `headers`: Request headers
- `_handler`: Raw HTTP handler (for streaming responses)
- `server`: BackendHTTPServer instance

## MCP Tool Integration

To make your plugin's tools available to the LLM via MCP tool calling:

```python
from cherrystudio.backend.routes.mcp import _clients, _clients_lock

class MyMCPClient:
    def __init__(self, server_id):
        self.server_id = server_id
        self._alive = True

    def is_alive(self):
        return self._alive

    def list_tools(self):
        return [
            {
                "name": "my_tool",
                "description": "What this tool does",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "param1": {"type": "string", "description": "..."}
                    },
                    "required": ["param1"]
                }
            }
        ]

    def call_tool(self, tool_name, arguments, timeout=60.0):
        if tool_name == "my_tool":
            result = do_something(arguments["param1"])
            return {
                "isError": False,
                "content": [{"type": "text", "text": str(result)}]
            }
        return {"isError": True, "content": [{"type": "text", "text": "Unknown tool"}]}

# Register during plugin load
with _clients_lock:
    _clients["my-plugin"] = MyMCPClient("my-plugin")
```

## Frontend Integration

Plugins are automatically registered in the `/` quick panel menu based on their `modes` in the manifest. The frontend tool system fetches the plugin list from `GET /api/v1/plugins/list` at startup.

Plugins with a `launcher.enabled: true` entry can also be surfaced in GUI launch areas such as the launchpad. This is intended for standalone plugin UIs that should open directly when clicked and do not need LLM orchestration.

## Installation

### From directory
```
POST /api/v1/plugins/install
{"source": "/path/to/my-plugin/"}
```

### From ZIP URL
```
POST /api/v1/plugins/install
{"source": "https://example.com/my-plugin-v1.0.zip"}
```

### Uninstall
```
POST /api/v1/plugins/uninstall
{"plugin_id": "my-plugin"}
```

## Output Types

Plugins can produce these output types for chat display:

- `text` - Plain text content
- `image` - Image file (displayed inline)
- `model_3d` - 3D model file (rendered with model-viewer)
- `code` - Code content

## Example: SAM3 Segmentation Plugin

See `cherrystudio/plugins/sam3-segmentation/` for a complete reference implementation including:
- Manual mode with PySide6 GUI
- Auto mode with LLM orchestration
- MCP tool registration
- 3D model generation
- Vision model integration
