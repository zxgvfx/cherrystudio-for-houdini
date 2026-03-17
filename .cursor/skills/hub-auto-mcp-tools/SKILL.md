---
name: hub-auto-mcp-tools
description: >-
  Diagnose and fix issues with @cherry/hub auto MCP tool mode — tool discovery,
  web_search injection, hub exec routing, and prompt-based tool name aliasing.
  Use when auto MCP tools return 0 tools, web search is missing from hub results,
  or the model hallucinates tool names like "list".
---

# Hub Auto MCP Tools — Known Fragile Area

This area breaks frequently during refactoring. Check **every item** below when
touching hub/auto MCP tool logic.

## Architecture Overview

```
┌─ Frontend (auto mode) ─────────────────────────────────────────────┐
│  getMcpServersForAssistant() → [hubMCPServer] only                 │
│  fetchMcpTools() → listTools(hub) → gets {search, exec}           │
│  convertMcpToolsToAiSdkTools() → tools with execute() callbacks   │
│                                                                     │
│  Model calls search → hub finds tools → model calls exec           │
└────────────────────────────────────────────────────────────────────┘
         │                             │
         ▼                             ▼
┌─ Backend (mcp.py) ─────────────────────────────────────────────────┐
│  /mcp/list-tools (hub) → _HUB_TOOL_DEFINITIONS (search + exec)    │
│  /mcp/call (hub, search) → _hub_search() → scans _clients + builtins│
│  /mcp/call (hub, exec)   → _hub_exec()  → executes tool calls     │
└────────────────────────────────────────────────────────────────────┘
```

## Critical Checklist

### 1. `_hub_search` — MCP tools ONLY, no web_search

**File:** `cherrystudio/backend/routes/mcp.py` → `_hub_search()`

The hub search iterates `_clients` (registered MCP servers) and returns
their tools. **web_search is NOT injected here** — it is handled by
the frontend's `searchOrchestrationPlugin` as `builtin_web_search`.

**CRITICAL:** Do NOT add web_search back into `_hub_search`. The frontend
search tool (`builtin_web_search`) goes through `WebSearchService` which
has proper Google/Bing implementations, proxy support, and result extraction.

### 2. `_hub_exec` — MCP tools ONLY, no web_search interception

**File:** `cherrystudio/backend/routes/mcp.py` → `_hub_exec()`

Hub exec only handles MCP tool calls. **web_search is NOT intercepted here.**
The frontend's `builtin_web_search` tool is executed directly by the AI SDK
through `searchOrchestrationPlugin`, not through hub exec.

### 3. Frontend prompt plugin tool name aliases

**File:** `web/packages/aiCore/src/core/plugins/built-in/toolUsePlugin/promptToolUsePlugin.ts`

The `defaultParseToolUse` function maps model-generated tool names to
internal IDs. Models frequently hallucinate aliases.

**What to check — the switch statement:**
```typescript
switch (toolName.toLowerCase()) {
  case 'search':
  case 'list':          // models hallucinate this
  case 'list_tools':
  case 'list-tools':
    toolName = 'mcp__CherryHub__search'
    break
  case 'exec':
  case 'execute':       // common alias
  case 'call':
  case 'run':
  case 'invoke':        // very common hallucination
  case 'use':
  case 'use_tool':
  case 'call_tool':
  case 'tool_call':
    toolName = 'mcp__CherryHub__exec'
    break
}
```

If a new alias appears in logs (`Tool "X" not found in available tools`),
add it to this switch.

**Web search aliases:** `web_search`, `websearch`, `google_search`, `bing_search`
are mapped to `builtin_web_search` (only when that tool exists in the tool set).

### 3c. Auto mode system prompt — Direct Tools section

**File:** `web/packages/aiCore/src/core/plugins/built-in/toolUsePlugin/promptToolUsePlugin.ts`
→ `defaultBuildSystemPrompt()`

When auto MCP mode is active AND non-Hub tools exist (e.g. `builtin_web_search`
from `searchOrchestrationPlugin`), the system prompt includes a "Direct Tools"
section describing these tools. Without this, the model only knows about Hub
`search`/`exec` and will never call `builtin_web_search`.

**Architecture:**
- MCP tools → discovered via Hub `search`, called via Hub `exec`
- Frontend tools (web search) → described in "Direct Tools" prompt, called directly by name

### 3b. Backend exec fallback for non-code arguments

**File:** `cherrystudio/backend/routes/mcp.py` → `_hub_exec_from_args()`

When models use aliases like `invoke`, they often pass direct arguments
(`{"name": "web_search", "params": {"query": "..."}}`) instead of a `code` string
(`"await web_search({query: '...'})")`). The `_hub_exec_from_args()`
function handles this by reconstructing the code from structured arguments.

**What to check:**
- `/mcp/call` hub exec handler falls back to `_hub_exec_from_args()` when `code` is empty
- The function extracts tool name from `name`/`tool`/`function`/`tool_name` keys
- Tool args extracted from `arguments`/`args`/`input`/`params` keys
- **Nested `params` unwrapping**: if `tool_args == {"params": {"query": "..."}}`, unwrap to `{"query": "..."}`
- If only `query` is present (no tool name), defaults to `web_search`

### 4. Config loading chain — PRIORITY MATTERS!

Web search config is loaded from THREE sources in **strict priority order**:

1. **Assistant webSearchProviderId** (per-conversation, highest priority)
   - `localStorage.json` → `persist:cherry-studio` → `assistants` → `defaultAssistant.webSearchProviderId`
   - Set when user selects provider in the input bar quick panel
   - NOTE: may only be in Redux memory (not persisted) if just changed
2. **websearch.defaultProvider** (global default, medium priority)
   - `localStorage.json` → `persist:cherry-studio` → `websearch` → `defaultProvider`
3. **Centralized config** (fallback, lowest priority)
   - `centralized-config.json` → `webSearchProviders` → first entry
   - Loaded via `config_manager.load()` → `centralizedWebSearchProviders`

**CRITICAL BUG HISTORY:** Centralized config used to have HIGHER priority than
user config, causing SearXNG to always override the user's Google/Bing choice.
This was fixed by reversing the priority order.

**What to check:**
- `_load_websearch_config()` checks assistant → defaultProvider → centralized (IN THIS ORDER!)
- NEVER put centralized config before user config
- Provider types: `searxng`, `local-google`, `local-bing`, `local-baidu`
- SearXNG uses `apiHost`, local engines use `url` with `%s` placeholder

### 4b. Web search architecture (frontend, NOT backend hub)

Web search is handled by the **frontend** `WebSearchService`, not the backend MCP hub.

**Flow:** User selects Google → `searchOrchestrationPlugin` adds `builtin_web_search`
to tools → model calls it → frontend `WebSearchService.processWebsearch()` executes
→ connects to backend network proxy for HTTP requests → returns results to model.

**Backend role:** Only provides network proxy via `/api/v1/network/fetch` and
`/api/v1/network/http-get`. The backend does NOT execute web searches directly
for the MCP hub.

### 5. `_clients` registration timing & auto-warmup

`_clients` dict is populated ONLY when:
- `POST /mcp/start` is called (explicit server start)
- `POST /mcp/list-tools` triggers `_get_or_start_client()` for non-hub servers
- `POST /mcp/call` triggers `_get_or_start_client()` for unknown servers
- **Warmup** (`auto_start_active_servers()`) pre-starts active servers on boot

In auto mode, the frontend only calls `listTools(hubMCPServer)`, which
returns static definitions WITHOUT starting any real MCP servers.
This means `_clients` stays empty unless servers are warmed up or started elsewhere.

**Implication:** Built-in tools (web_search) MUST be injected directly
into `_hub_search`, not depend on `_clients`. External MCP servers
(e.g. Atlassian) rely on warmup to populate `_clients` on startup.

### 6. MCP server warmup on startup

**Files:**
- `cherrystudio/backend/routes/mcp.py` → `auto_start_active_servers()`, `_load_active_server_configs()`
- `cherrystudio/backend/server.py` → `BackendHTTPServer.start()`

On first launch, active MCP servers have NOT been started, so `_clients`
is empty and hub search returns only built-in tools. The warmup system
fixes this by auto-starting all `isActive: true` servers in background
threads after the backend HTTP server starts.

**What to check:**
- `_load_active_server_configs()` loads from BOTH centralized config AND localStorage
- Virtual/builtin servers (hub, inMemory, memory, thinking) are skipped
- `auto_start_active_servers()` is called from `server.py` after startup
- Each server starts in its own daemon thread (non-blocking)
- `_warmup_done` flag prevents duplicate warmup runs
- `POST /api/v1/mcp/warmup` allows manual re-trigger after config changes

**Config sources for active servers:**
1. `config_manager.load()` → `centralizedMcpServers` (from centralized-config.json)
2. `localStorage.json` → `persist:cherry-studio` → `mcp` → `servers` (Redux persist, double-serialized)

```python
# Warmup flow (server.py → mcp.py):
# server.start() → _import_routes() → start HTTP → background thread:
auto_start_active_servers()
  → _ensure_bin_sync()                  # copy uv/bun from shared drive if needed
  → _load_active_server_configs()       # centralized + localStorage
  → for each server: threading.Thread(target=_warmup_single_server)
      → _get_or_start_client(config)    # starts process, adds to _clients
      → client.list_tools()             # verify connection
```

**Bin sync & PATH:** `_ensure_bin_sync()` copies `uv`/`bun` binaries from the shared
network path (`J:/vfxtools/piplineTD/models/packages/bin`) to the local
`~/.cherrystudio/bin/` if they're missing. It also **adds the bin dir to
`os.environ["PATH"]`** so that `shutil.which()` can find `uvx`/`bun`.

**CRITICAL:** The frontend's `isBinaryExist()` normally adds `.cherrystudio/bin` to
PATH, but warmup runs BEFORE the frontend loads. Without the PATH addition in
`_ensure_bin_sync()`, `MCPStdioClient.start()` cannot find `uvx` and all
stdio-based MCP servers will fail to start silently.

## Common Failure Modes

| Symptom | Root Cause | Fix Location |
|---------|-----------|--------------|
| `registered_clients=[], total tools: 0` | No built-in injection in `_hub_search` | `mcp.py` → `_hub_search()` |
| `Tool "list" not found` | Missing alias in prompt plugin switch | `promptToolUsePlugin.ts` |
| `Tool not found: 'web_search'` in exec | `_hub_exec` doesn't intercept builtins | `mcp.py` → `_hub_exec()` |
| Web search config not loaded | Config path or Redux key changed | `mcp.py` → `_load_websearch_config()` |
| Model uses hub exec for web search | web_search injected into hub (WRONG) | Remove from `_hub_search`/`_hub_exec` |
| Model doesn't call builtin_web_search | Not described in auto mode prompt | `promptToolUsePlugin.ts` Direct Tools section |
| `Unknown hub tool: 'web_search'` | Direct call via `/mcp/call` not handled | `mcp.py` → `mcp_call()` hub dispatch |
| First search after boot finds 0 MCP tools | Warmup not running or not finished yet | `mcp.py` → `auto_start_active_servers()` |
| Warmup fails silently | Server config missing command/url | Check `_load_active_server_configs()` and centralized-config.json |
| New servers not discovered after activation | Need to call `/api/v1/mcp/warmup` | Frontend should trigger warmup on MCP config change |

## Files to Inspect

- `cherrystudio/backend/routes/mcp.py` — `_hub_search`, `_hub_exec`, `_load_websearch_config`, `_exec_web_search`, `auto_start_active_servers`, `_load_active_server_configs`
- `cherrystudio/backend/server.py` — `BackendHTTPServer.start()` warmup thread launch
- `web/packages/aiCore/src/core/plugins/built-in/toolUsePlugin/promptToolUsePlugin.ts` — `defaultParseToolUse` switch
- `web/src/renderer/src/services/ApiService.ts` — `getMcpServersForAssistant` (auto returns only hub)
- `cherrystudio/core/config_manager.py` — `centralizedWebSearchProviders`, `centralizedMcpServers`
- `cherrystudio/resources/centralized-config.json` — `webSearchProviders`, `mcpServers` arrays
