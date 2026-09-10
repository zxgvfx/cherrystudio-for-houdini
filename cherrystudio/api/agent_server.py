"""
Agent API Server
提供 Agent 相关的 HTTP API 端点
"""

import json
import os
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
from typing import Optional

from ..utils.client_disconnect import DisconnectQuietHandlerMixIn, DisconnectQuietMixIn

# 导入统一日志模块
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.logger import agent_server_logger

_log = agent_server_logger


def _exec_web_search(query: str, provider_id: str = '') -> dict:
    """Delegate to the existing backend web search implementation when available."""
    mcp = AgentAPIHandler._get_mcp_module() if 'AgentAPIHandler' in globals() else None
    if mcp is None or not hasattr(mcp, '_exec_web_search'):
        return {'isError': True, 'content': [{'type': 'text', 'text': 'Web search backend is not available'}]}
    return mcp._exec_web_search(query, provider_id=provider_id)

import re

# URL pattern matchers for agent routes
_RE_AGENTS_BASE = re.compile(r'^/v1/agents/?$')
_RE_AGENTS_REORDER = re.compile(r'^/v1/agents/reorder/?$')
_RE_AGENT_BY_ID = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/?$')
_RE_SESSIONS_BASE = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/sessions/?$')
_RE_SESSIONS_REORDER = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/sessions/reorder/?$')
_RE_SESSION_BY_ID = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/sessions/(?P<session_id>[^/]+)/?$')
_RE_MESSAGES_BASE = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/sessions/(?P<session_id>[^/]+)/messages/?$')
_RE_MESSAGE_BY_ID = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/sessions/(?P<session_id>[^/]+)/messages/(?P<message_id>[^/]+)/?$')
_RE_COCO_APPLY = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/sessions/(?P<session_id>[^/]+)/coco/apply/?$')
_RE_COCO_REJECT = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/sessions/(?P<session_id>[^/]+)/coco/reject/?$')
_RE_COCO_CANVAS = re.compile(r'^/v1/agents/(?P<agent_id>[^/]+)/sessions/(?P<session_id>[^/]+)/coco/canvas/?$')


class AgentAPIHandler(DisconnectQuietHandlerMixIn, BaseHTTPRequestHandler):
    """Agent API 请求处理器"""
    
    providers_loader = None  # 类变量，由服务器设置
    
    def log_message(self, format, *args):
        """重写日志方法，使用我们的日志函数"""
        _log(f"[AgentServer] {format % args}")
    
    _CORS_METHODS = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    _CORS_HEADERS = 'Content-Type, Authorization, Cache-Control, X-Requested-With, Accept'

    def do_OPTIONS(self):
        """处理 CORS 预检请求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', self._CORS_METHODS)
        self.send_header('Access-Control-Allow-Headers', self._CORS_HEADERS)
        self.send_header('Content-Length', '0')
        self.end_headers()

    def _send_cors_headers(self):
        """发送 CORS 头"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', self._CORS_METHODS)
        self.send_header('Access-Control-Allow-Headers', self._CORS_HEADERS)
        self.send_header('Content-Type', 'application/json')
    
    def _check_auth(self) -> bool:
        """检查认证（Bearer token）"""
        auth_header = self.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return False
        return True

    def _json_response(self, status: int, body):
        """Send a JSON response with CORS headers."""
        self.send_response(status)
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(body).encode('utf-8'))

    def _read_json_body(self) -> dict:
        length = int(self.headers.get('Content-Length', 0))
        raw = self.rfile.read(length).decode('utf-8')
        return json.loads(raw) if raw else {}
    
    # ── Streaming messages endpoint helpers ──

    @staticmethod
    def _resolve_provider(model_string: str):
        """Resolve provider API details from agent model string like 'centralized-openai:qwen3.5-397b-a17b'.
        Returns (base_url, api_key, model_id) or raises."""
        if ':' not in model_string:
            raise ValueError(f"Invalid model format: {model_string}")
        provider_id, model_id = model_string.split(':', 1)

        # Read OpenClaw config for provider details
        openclaw_cfg_path = os.path.join(os.path.expanduser("~"), ".openclaw", "openclaw.cherry.json")
        if os.path.isfile(openclaw_cfg_path):
            with open(openclaw_cfg_path, 'r', encoding='utf-8') as f:
                oc_cfg = json.load(f)
            providers = oc_cfg.get('models', {}).get('providers', {})
            # Provider key in openclaw config: "central-{cp_id}"
            for key, prov in providers.items():
                for m in prov.get('models', []):
                    if m.get('id') == model_id:
                        base_url = prov.get('baseUrl', '')
                        api_key = prov.get('apiKey', '')
                        if base_url:
                            return base_url, api_key, model_id
            _log(f"Model {model_id} not found in OpenClaw providers, trying centralized config")

        # Fallback: read centralized config directly
        from core.paths import get_base_dir
        centralized_cfg_dir = get_base_dir()
        for candidate in ["centralized-config.json", "config/centralized-config.json"]:
            p = os.path.join(centralized_cfg_dir, candidate)
            if os.path.isfile(p):
                with open(p, 'r', encoding='utf-8') as f:
                    ccfg = json.load(f)
                for cp in ccfg.get('centralizedProviders', ccfg.get('providers', [])):
                    if cp.get('id') == provider_id or f"centralized-{cp.get('id')}" == provider_id:
                        base_url = (cp.get('apiHost') or '').rstrip('/')
                        if base_url and not re.search(r'/v\d+', base_url):
                            base_url += '/v1'
                        api_key = (cp.get('apiKey') or '').split(',')[0].strip()
                        if base_url:
                            return base_url, api_key, model_id

        raise ValueError(f"Cannot resolve provider for model: {model_string}")

    # ── MCP tool helpers ──

    @staticmethod
    def _get_mcp_module():
        """Locate the loaded MCP routes module via sys.modules.

        The module uses relative imports (``from ..server import route``) and is
        loaded by the main application as part of the ``cherrystudio`` package
        hierarchy.  A plain ``import`` from agent_server.py cannot resolve it
        because the sys.path only contains ``cherrystudio/``.  Searching
        ``sys.modules`` is the most robust way to find it at runtime.
        """
        for name, mod in sys.modules.items():
            if name.endswith('.mcp') and hasattr(mod, '_clients') and hasattr(mod, '_clients_lock'):
                return mod
        return None

    @staticmethod
    def _resolve_session_mcp_servers(session: dict) -> list:
        """Resolve MCP server configs for the current session.

        Unlike the previous implementation that scanned all warmed-up clients,
        this mirrors the original Agent behavior more closely: only MCP servers
        explicitly listed in ``session.mcps`` are visible to the agent.
        """
        server_ids = list(session.get('mcps') or [])
        if not server_ids:
            return []

        mcp = AgentAPIHandler._get_mcp_module()
        if mcp is None:
            _log("WARNING: MCP module not found in sys.modules — no tools will be available")
            return []

        try:
            all_servers = mcp._load_active_server_configs()
        except Exception as e:
            _log(f"WARNING: Failed loading MCP server configs: {e}")
            return []

        by_id = {str(server.get('id', '')): server for server in all_servers}
        resolved = [by_id[sid] for sid in server_ids if sid in by_id]
        missing = [sid for sid in server_ids if sid not in by_id]
        if missing:
            _log(f"WARNING: Session MCP servers not found or inactive: {missing}")
        return resolved

    @staticmethod
    def _list_session_mcp_tools(session: dict):
        """List raw MCP tools for running servers configured on the session."""
        server_configs = AgentAPIHandler._resolve_session_mcp_servers(session)
        if not server_configs:
            return []

        mcp = AgentAPIHandler._get_mcp_module()
        if mcp is None:
            return []

        tools = []
        seen_names = set()
        for server_config in server_configs:
            server_id = str(server_config.get('id', ''))
            try:
                client = None
                with mcp._clients_lock:
                    existing = mcp._clients.get(server_id)
                    if existing and existing.is_alive():
                        client = existing
                if client is None:
                    _log(f"MCP client '{server_id}' is not running; skipping tool exposure for this session")
                    continue
                raw_tools = client.list_tools()
                for t in (raw_tools or []):
                    name = t.get('name', '')
                    if not name or name in seen_names:
                        continue
                    seen_names.add(name)
                    tools.append({
                        'server_id': server_id,
                        'name': name,
                        'description': t.get('description', '') or name,
                        'inputSchema': t.get('inputSchema', {'type': 'object', 'properties': {}})
                    })
            except Exception as e:
                _log(f"Error listing tools from MCP client '{server_id}': {e}")

        return tools

    @staticmethod
    def _collect_session_mcp_tools_openai(session: dict):
        """Backward-compatible full-schema tool collection."""
        return [
            {
                'type': 'function',
                'function': {
                    'name': tool['name'],
                    'description': tool['description'],
                    'parameters': tool['inputSchema']
                }
            }
            for tool in AgentAPIHandler._list_session_mcp_tools(session)
        ]

    @staticmethod
    def _list_runtime_builtin_tools() -> list:
        """Built-in runtime tools matching the frontend AgentToolsType enum.

        Tool names use PascalCase to align with the frontend renderer:
        Bash, Read, Write, Edit, MultiEdit, Grep, Glob, WebSearch, WebFetch, TodoWrite.
        """
        return [
            # ── Bash (shell execution) ──
            {
                'server_id': 'runtime', 'name': 'Bash',
                'description': 'Execute a shell command on the local system. Use for installing packages, running scripts, compilation, etc.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'command': {'type': 'string', 'description': 'The shell command to execute.'},
                        'timeout': {'type': 'integer', 'description': 'Timeout in milliseconds (max 600000). Default 60000.'},
                        'description': {'type': 'string', 'description': 'Short description of what the command does (5-10 words).'}
                    },
                    'required': ['command']
                }
            },
            # ── Read (file reading) ──
            {
                'server_id': 'runtime', 'name': 'Read',
                'description': 'Read the contents of a file from the local filesystem.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'file_path': {'type': 'string', 'description': 'Absolute path to the file to read.'},
                        'offset': {'type': 'integer', 'description': 'Line number to start reading from (1-based).'},
                        'limit': {'type': 'integer', 'description': 'Maximum number of lines to read.'}
                    },
                    'required': ['file_path']
                }
            },
            # ── Write (file writing / creation) ──
            {
                'server_id': 'runtime', 'name': 'Write',
                'description': 'Create or overwrite a file with the given content.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'file_path': {'type': 'string', 'description': 'Absolute path to the file to write.'},
                        'content': {'type': 'string', 'description': 'The full content to write to the file.'}
                    },
                    'required': ['file_path', 'content']
                }
            },
            # ── Edit (string replacement) ──
            {
                'server_id': 'runtime', 'name': 'Edit',
                'description': 'Replace a specific string in a file with another string.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'file_path': {'type': 'string', 'description': 'Absolute path to the file to modify.'},
                        'old_string': {'type': 'string', 'description': 'The exact text to find and replace.'},
                        'new_string': {'type': 'string', 'description': 'The replacement text.'},
                        'replace_all': {'type': 'boolean', 'description': 'Replace all occurrences (default false).'}
                    },
                    'required': ['file_path', 'old_string', 'new_string']
                }
            },
            # ── MultiEdit (batch string replacements) ──
            {
                'server_id': 'runtime', 'name': 'MultiEdit',
                'description': 'Perform multiple string replacements in a single file.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'file_path': {'type': 'string', 'description': 'Absolute path to the file to modify.'},
                        'edits': {
                            'type': 'array',
                            'description': 'Array of edit operations.',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'old_string': {'type': 'string'},
                                    'new_string': {'type': 'string'},
                                    'replace_all': {'type': 'boolean'}
                                },
                                'required': ['old_string', 'new_string']
                            }
                        }
                    },
                    'required': ['file_path', 'edits']
                }
            },
            # ── Grep (regex search) ──
            {
                'server_id': 'runtime', 'name': 'Grep',
                'description': 'Search for a regex pattern in files. Returns matching lines with context.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'pattern': {'type': 'string', 'description': 'Regular expression pattern to search for.'},
                        'path': {'type': 'string', 'description': 'File or directory to search in.'},
                        'glob': {'type': 'string', 'description': 'Glob pattern to filter files (e.g. "*.py").'},
                        '-i': {'type': 'boolean', 'description': 'Case insensitive search.'},
                        '-C': {'type': 'integer', 'description': 'Lines of context around each match.'},
                        'head_limit': {'type': 'integer', 'description': 'Max matches to return.'}
                    },
                    'required': ['pattern']
                }
            },
            # ── Glob (file finder) ──
            {
                'server_id': 'runtime', 'name': 'Glob',
                'description': 'Find files matching a glob pattern (e.g. "**/*.py", "src/**/*.ts").',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'pattern': {'type': 'string', 'description': 'Glob pattern to match files against.'},
                        'path': {'type': 'string', 'description': 'Directory to search in (defaults to working directory).'}
                    },
                    'required': ['pattern']
                }
            },
            # ── WebSearch (web search) ──
            {
                'server_id': 'runtime', 'name': 'WebSearch',
                'description': 'Search the web for current information, news, weather, facts, etc.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'query': {'type': 'string', 'description': 'The search query.'},
                        'allowed_domains': {'type': 'array', 'items': {'type': 'string'}, 'description': 'Only include results from these domains.'},
                        'blocked_domains': {'type': 'array', 'items': {'type': 'string'}, 'description': 'Exclude results from these domains.'}
                    },
                    'required': ['query']
                }
            },
            # ── WebFetch (URL fetcher) ──
            {
                'server_id': 'runtime', 'name': 'WebFetch',
                'description': 'Fetch content from a URL and return it as readable text.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'url': {'type': 'string', 'description': 'The URL to fetch.'},
                        'prompt': {'type': 'string', 'description': 'Optional instruction for processing the fetched content.'}
                    },
                    'required': ['url']
                }
            },
            # ── TodoWrite (task management) ──
            {
                'server_id': 'runtime', 'name': 'TodoWrite',
                'description': 'Create or update a task list for tracking progress on the current work.',
                'inputSchema': {
                    'type': 'object',
                    'properties': {
                        'todos': {
                            'type': 'array',
                            'description': 'Array of task items.',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'content': {'type': 'string', 'description': 'Task description.'},
                                    'status': {'type': 'string', 'enum': ['pending', 'in_progress', 'completed'], 'description': 'Task status.'},
                                    'activeForm': {'type': 'string', 'description': 'Active form of the task (e.g. "Implementing feature X").'}
                                },
                                'required': ['content', 'status']
                            }
                        }
                    },
                    'required': ['todos']
                }
            }
        ]

    @staticmethod
    def _list_runtime_available_tools(session: dict) -> list:
        """All runtime-visible tools: built-ins plus running session MCP tools."""
        return AgentAPIHandler._list_runtime_builtin_tools() + AgentAPIHandler._list_session_mcp_tools(session)

    @staticmethod
    def _build_runtime_direct_tools(session: dict, max_desc_len: int = 200) -> list:
        """Build standard OpenAI function definitions for ALL runtime tools.

        This is the default mode: every tool (builtins + MCP) gets its full
        schema sent directly to the LLM.  Descriptions are truncated to
        *max_desc_len* chars to control token usage.
        """
        tools = AgentAPIHandler._list_runtime_available_tools(session)
        openai_tools = []
        for t in tools:
            desc = (t.get('description') or '')[:max_desc_len]
            schema = t.get('inputSchema') or {'type': 'object', 'properties': {}}
            openai_tools.append({
                'type': 'function',
                'function': {
                    'name': t['name'],
                    'description': desc,
                    'parameters': schema
                }
            })
        return openai_tools

    @staticmethod
    def _build_runtime_meta_tools():
        """Expose only small runtime meta-tools to reduce prompt tokens."""
        return [
            {
                'type': 'function',
                'function': {
                    'name': 'discover_tools',
                    'description': (
                        'Discover available MCP tools by keyword and get only tool names with brief descriptions. '
                        'Use this first when you are not sure which tool to use.'
                    ),
                    'parameters': {
                        'type': 'object',
                        'properties': {
                            'query': {'type': 'string', 'description': 'Keyword to search tool names and descriptions. Use "*" to list all tools.'},
                            'limit': {'type': 'integer', 'description': 'Maximum number of tools to return.', 'default': 10}
                        },
                        'required': ['query']
                    }
                }
            },
            {
                'type': 'function',
                'function': {
                    'name': 'get_tool_schema',
                    'description': 'Get the full parameter schema for one specific tool before calling it.',
                    'parameters': {
                        'type': 'object',
                        'properties': {
                            'tool_name': {'type': 'string', 'description': 'Exact tool name.'}
                        },
                        'required': ['tool_name']
                    }
                }
            },
            {
                'type': 'function',
                'function': {
                    'name': 'call_tool',
                    'description': 'Execute a tool by name after you know its parameters.',
                    'parameters': {
                        'type': 'object',
                        'properties': {
                            'tool_name': {'type': 'string', 'description': 'Exact tool name to execute.'},
                            'arguments': {'type': 'object', 'description': 'Arguments object for the target tool.', 'default': {}}
                        },
                        'required': ['tool_name']
                    }
                }
            }
        ]

    @staticmethod
    def _discover_session_tools_text(session: dict, query: str, limit: int = 10) -> str:
        tools = AgentAPIHandler._list_runtime_available_tools(session)
        if not tools:
            return 'No runtime tools are currently available in this session.'

        normalized_query = (query or '').strip().lower()
        if not normalized_query or normalized_query == '*':
            matched = tools
        else:
            matched = [
                tool for tool in tools
                if normalized_query in tool['name'].lower()
                or normalized_query in tool['description'].lower()
                or normalized_query in tool['server_id'].lower()
            ]

        matched = matched[:max(1, int(limit or 10))]
        if not matched:
            return f'No tools matched query: {query}'

        lines = [f"Found {len(matched)} tool(s):"]
        for tool in matched:
            lines.append(f"- {tool['name']}: {tool['description']}")
        lines.append('')
        lines.append('Next step: call get_tool_schema with the exact tool name before using call_tool.')
        return '\n'.join(lines)

    @staticmethod
    def _get_session_tool_schema_text(session: dict, tool_name: str) -> str:
        wanted = (tool_name or '').strip()
        for tool in AgentAPIHandler._list_runtime_available_tools(session):
            if tool['name'] != wanted:
                continue
            return json.dumps({
                'tool_name': tool['name'],
                'description': tool['description'],
                'server': tool['server_id'],
                'inputSchema': tool['inputSchema']
            }, ensure_ascii=False)

        return json.dumps({
            'error': f"Tool '{wanted}' not found in runtime tools for this session"
        }, ensure_ascii=False)

    @staticmethod
    def _execute_builtin_web_search(arguments: dict) -> dict:
        """Run web search.  Accepts both old (queries[]) and new (query) formats."""
        args = arguments if isinstance(arguments, dict) else {}
        query = str(args.get('query', '') or '').strip()
        queries = args.get('queries', [])
        if query:
            queries = [query]
        elif isinstance(queries, str):
            queries = [queries]
        if not isinstance(queries, list):
            queries = []
        queries = [str(q).strip() for q in queries if str(q).strip()][:3]
        if not queries:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'WebSearch requires a non-empty query'}]}
        if len(queries) == 1:
            return _exec_web_search(queries[0])
        parts, any_err = [], False
        for i, q in enumerate(queries, 1):
            r = _exec_web_search(q)
            parts.append(f"## Query {i}: {q}\n{AgentAPIHandler._mcp_result_to_text(r)}")
            any_err = any_err or bool(r.get('isError'))
        return {'isError': any_err, 'content': [{'type': 'text', 'text': '\n\n'.join(parts)}]}

    @staticmethod
    def _execute_builtin_web_fetch(session: dict, arguments: dict) -> dict:
        """Fetch a URL and return its text content."""
        import urllib.request
        args = arguments if isinstance(arguments, dict) else {}
        url = str(args.get('url', '') or '').strip()
        if not url:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'WebFetch requires a "url" string'}]}
        _log(f"[runtime-tool] WebFetch: {url}")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 CherryStudio-Agent/1.0'})
            no_proxy_handler = urllib.request.ProxyHandler({})
            opener = urllib.request.build_opener(no_proxy_handler)
            with opener.open(req, timeout=15) as resp:
                raw = resp.read()
                encoding = resp.headers.get_content_charset() or 'utf-8'
                text = raw.decode(encoding, errors='replace')[:50000]
            return {'isError': False, 'content': [{'type': 'text', 'text': text}]}
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'WebFetch error: {e}'}]}

    # ── Path security helpers ──

    @staticmethod
    def _get_accessible_paths(session: dict) -> list:
        agent_id = session.get('agent_id', '')
        agent = AgentStorage.get_agent(agent_id) if agent_id else None
        paths = []
        if agent:
            paths = agent.get('accessible_paths') or agent.get('accessible_directories') or []
        if not paths:
            import tempfile
            paths = [tempfile.gettempdir()]
        return [os.path.normpath(os.path.abspath(p)) for p in paths]

    @staticmethod
    def _is_path_allowed(target: str, session: dict) -> bool:
        norm = os.path.normpath(os.path.abspath(target))
        for allowed in AgentAPIHandler._get_accessible_paths(session):
            if norm == allowed or norm.startswith(allowed + os.sep):
                return True
        return False

    # ── Built-in tool implementations ──

    @staticmethod
    def _execute_tool_Bash(session: dict, args: dict) -> dict:
        import subprocess
        command = str(args.get('command', '') or '').strip()
        if not command:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'Bash requires a non-empty "command"'}]}
        timeout_ms = min(int(args.get('timeout', 60000) or 60000), 600000)
        timeout_s = max(timeout_ms // 1000, 5)
        accessible = AgentAPIHandler._get_accessible_paths(session)
        cwd = accessible[0] if accessible else None
        _log(f"[runtime-tool] Bash: {command!r}  cwd={cwd}  timeout={timeout_s}s")
        try:
            result = subprocess.run(
                command, shell=True, capture_output=True, text=True,
                timeout=timeout_s, cwd=cwd,
                env={**os.environ, 'PYTHONIOENCODING': 'utf-8'}
            )
            out = ''
            if result.stdout:
                out += result.stdout[-8000:]
            if result.stderr:
                out += ('\n' if out else '') + result.stderr[-4000:]
            if not out:
                out = '(no output)'
            out += f'\n\nExit code: {result.returncode}'
            return {'isError': result.returncode != 0, 'content': [{'type': 'text', 'text': out}]}
        except subprocess.TimeoutExpired:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Command timed out after {timeout_s}s'}]}
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Bash error: {e}'}]}

    @staticmethod
    def _execute_tool_Read(session: dict, args: dict) -> dict:
        path = str(args.get('file_path', '') or args.get('path', '') or '').strip()
        if not path:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'Read requires "file_path"'}]}
        if not AgentAPIHandler._is_path_allowed(path, session):
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Path "{path}" outside accessible paths'}]}
        try:
            with open(path, 'r', encoding='utf-8', errors='replace') as f:
                lines = f.readlines()
            offset = max(int(args.get('offset', 0) or 0), 0)
            if offset > 0:
                offset -= 1  # frontend uses 1-based
            limit = min(int(args.get('limit', 2000) or 2000), 2000)
            selected = lines[offset:offset + limit]
            numbered = [f"{offset + i + 1:>6}|{ln.rstrip()}" for i, ln in enumerate(selected)]
            header = f"File: {path} ({len(lines)} lines total)"
            if offset > 0 or len(selected) < len(lines):
                header += f"  [lines {offset + 1}-{offset + len(selected)}]"
            return {'isError': False, 'content': [{'type': 'text', 'text': header + '\n' + '\n'.join(numbered)}]}
        except FileNotFoundError:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'File not found: {path}'}]}
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Read error: {e}'}]}

    @staticmethod
    def _execute_tool_Write(session: dict, args: dict) -> dict:
        path = str(args.get('file_path', '') or args.get('path', '') or '').strip()
        content = str(args.get('content', '') or '')
        if not path:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'Write requires "file_path"'}]}
        if not AgentAPIHandler._is_path_allowed(path, session):
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Path "{path}" outside accessible paths'}]}
        try:
            os.makedirs(os.path.dirname(path) or '.', exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            return {'isError': False, 'content': [{'type': 'text', 'text': f'Wrote {os.path.getsize(path)} bytes to {path}'}]}
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Write error: {e}'}]}

    @staticmethod
    def _execute_tool_Edit(session: dict, args: dict) -> dict:
        path = str(args.get('file_path', '') or '').strip()
        old = str(args.get('old_string', '') or '')
        new = str(args.get('new_string', '') or '')
        replace_all = bool(args.get('replace_all', False))
        if not path or not old:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'Edit requires "file_path" and "old_string"'}]}
        if not AgentAPIHandler._is_path_allowed(path, session):
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Path "{path}" outside accessible paths'}]}
        try:
            with open(path, 'r', encoding='utf-8', errors='replace') as f:
                text = f.read()
            count = text.count(old)
            if count == 0:
                return {'isError': True, 'content': [{'type': 'text', 'text': f'old_string not found in {path}'}]}
            if not replace_all and count > 1:
                return {'isError': True, 'content': [{'type': 'text', 'text':
                    f'old_string found {count} times in {path}. Use replace_all=true or provide a more unique string.'}]}
            text = text.replace(old, new) if replace_all else text.replace(old, new, 1)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(text)
            return {'isError': False, 'content': [{'type': 'text', 'text':
                f'Replaced {"all " + str(count) if replace_all else "1"} occurrence(s) in {path}'}]}
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Edit error: {e}'}]}

    @staticmethod
    def _execute_tool_MultiEdit(session: dict, args: dict) -> dict:
        path = str(args.get('file_path', '') or '').strip()
        edits = args.get('edits', [])
        if not path or not isinstance(edits, list) or not edits:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'MultiEdit requires "file_path" and non-empty "edits"'}]}
        if not AgentAPIHandler._is_path_allowed(path, session):
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Path "{path}" outside accessible paths'}]}
        try:
            with open(path, 'r', encoding='utf-8', errors='replace') as f:
                text = f.read()
            results = []
            for i, edit in enumerate(edits):
                old = str(edit.get('old_string', '') or '')
                new = str(edit.get('new_string', '') or '')
                repl_all = bool(edit.get('replace_all', False))
                if not old:
                    results.append(f"Edit {i + 1}: skipped (empty old_string)")
                    continue
                cnt = text.count(old)
                if cnt == 0:
                    results.append(f"Edit {i + 1}: old_string not found")
                    continue
                text = text.replace(old, new) if repl_all else text.replace(old, new, 1)
                results.append(f"Edit {i + 1}: replaced {cnt if repl_all else 1} occurrence(s)")
            with open(path, 'w', encoding='utf-8') as f:
                f.write(text)
            return {'isError': False, 'content': [{'type': 'text', 'text': '\n'.join(results)}]}
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'MultiEdit error: {e}'}]}

    @staticmethod
    def _execute_tool_Grep(session: dict, args: dict) -> dict:
        import re as _re
        pattern = str(args.get('pattern', '') or '')
        path = str(args.get('path', '') or '').strip()
        if not pattern:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'Grep requires "pattern"'}]}
        accessible = AgentAPIHandler._get_accessible_paths(session)
        if not path:
            path = accessible[0] if accessible else '.'
        if not AgentAPIHandler._is_path_allowed(path, session):
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Path "{path}" outside accessible paths'}]}
        case_insensitive = bool(args.get('-i', False))
        context = int(args.get('-C', 0) or 0)
        head_limit = int(args.get('head_limit', 100) or 100)
        glob_filter = str(args.get('glob', '') or '')
        flags = _re.IGNORECASE if case_insensitive else 0
        try:
            compiled = _re.compile(pattern, flags)
        except _re.error as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Invalid regex: {e}'}]}
        import fnmatch
        results, count = [], 0
        try:
            if os.path.isfile(path):
                files = [path]
            else:
                files = []
                for root, _, fnames in os.walk(path):
                    depth = root.replace(path, '').count(os.sep)
                    if depth > 5:
                        continue
                    for fn in fnames:
                        if glob_filter and not fnmatch.fnmatch(fn, glob_filter):
                            continue
                        files.append(os.path.join(root, fn))
                        if len(files) > 5000:
                            break
            for fpath in files:
                try:
                    with open(fpath, 'r', encoding='utf-8', errors='replace') as f:
                        lines = f.readlines()
                except (PermissionError, OSError):
                    continue
                file_matches = []
                for i, line in enumerate(lines):
                    if compiled.search(line):
                        start = max(0, i - context)
                        end = min(len(lines), i + context + 1)
                        for j in range(start, end):
                            prefix = ':' if j == i else '-'
                            file_matches.append(f"{j + 1}{prefix}{lines[j].rstrip()}")
                        count += 1
                        if count >= head_limit:
                            break
                if file_matches:
                    results.append(f"\n{fpath}:\n" + '\n'.join(file_matches))
                if count >= head_limit:
                    break
            if not results:
                return {'isError': False, 'content': [{'type': 'text', 'text': f'No matches found for pattern: {pattern}'}]}
            return {'isError': False, 'content': [{'type': 'text', 'text':
                f'{count} match(es) found:\n' + '\n'.join(results)}]}
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Grep error: {e}'}]}

    @staticmethod
    def _execute_tool_Glob(session: dict, args: dict) -> dict:
        import fnmatch
        pattern = str(args.get('pattern', '') or '')
        path = str(args.get('path', '') or '').strip()
        if not pattern:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'Glob requires "pattern"'}]}
        accessible = AgentAPIHandler._get_accessible_paths(session)
        if not path:
            path = accessible[0] if accessible else '.'
        if not AgentAPIHandler._is_path_allowed(path, session):
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Path "{path}" outside accessible paths'}]}
        try:
            matches = []
            for root, dirs, files in os.walk(path):
                depth = root.replace(path, '').count(os.sep)
                if depth > 8:
                    dirs.clear()
                    continue
                for fn in files:
                    rel = os.path.relpath(os.path.join(root, fn), path)
                    if fnmatch.fnmatch(rel, pattern) or fnmatch.fnmatch(fn, pattern):
                        matches.append(rel)
                        if len(matches) >= 500:
                            break
                if len(matches) >= 500:
                    break
            if not matches:
                return {'isError': False, 'content': [{'type': 'text', 'text': f'No files matched pattern: {pattern}'}]}
            return {'isError': False, 'content': [{'type': 'text', 'text':
                f'{len(matches)} file(s) matched:\n' + '\n'.join(matches)}]}
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Glob error: {e}'}]}

    _session_todos: dict = {}  # session_id → list of todo items

    @staticmethod
    def _execute_tool_TodoWrite(session: dict, args: dict) -> dict:
        todos = args.get('todos', [])
        if not isinstance(todos, list):
            return {'isError': True, 'content': [{'type': 'text', 'text': 'TodoWrite requires "todos" array'}]}
        sid = session.get('id', 'default')
        AgentAPIHandler._session_todos[sid] = todos
        lines = []
        for t in todos:
            status = t.get('status', 'pending')
            icon = {'pending': '○', 'in_progress': '◉', 'completed': '✓'}.get(status, '?')
            lines.append(f"  {icon} [{status}] {t.get('content', '')}")
        return {'isError': False, 'content': [{'type': 'text', 'text':
            f'Updated {len(todos)} task(s):\n' + '\n'.join(lines)}]}

    # ── Tool dispatch ──

    # Canonical name → method mapping; includes snake_case aliases for backward compat
    _TOOL_DISPATCH = {
        'Bash': '_execute_tool_Bash', 'execute_command': '_execute_tool_Bash',
        'Read': '_execute_tool_Read', 'read_file': '_execute_tool_Read',
        'Write': '_execute_tool_Write', 'write_file': '_execute_tool_Write',
        'Edit': '_execute_tool_Edit',
        'MultiEdit': '_execute_tool_MultiEdit',
        'Grep': '_execute_tool_Grep',
        'Glob': '_execute_tool_Glob',
        'TodoWrite': '_execute_tool_TodoWrite',
    }

    @staticmethod
    def _execute_runtime_tool_call(session: dict, tool_name: str, arguments: dict) -> dict:
        """Execute built-in tools, meta-tools, or fall back to MCP execution."""
        _log(f"[runtime-tool] Executing: {tool_name}")
        args = arguments if isinstance(arguments, dict) else {}

        # Meta-tools (for the 'meta' tool_mode)
        if tool_name == 'discover_tools':
            q = str(args.get('query', '') or '*')
            lim = int(args.get('limit', 10) or 10)
            text = AgentAPIHandler._discover_session_tools_text(session, q, lim)
            return {'isError': False, 'content': [{'type': 'text', 'text': text}]}
        if tool_name == 'get_tool_schema':
            text = AgentAPIHandler._get_session_tool_schema_text(session, str(args.get('tool_name', '') or ''))
            return {'isError': False, 'content': [{'type': 'text', 'text': text}]}
        if tool_name == 'call_tool':
            inner_name = str(args.get('tool_name', '') or '')
            inner_args = args.get('arguments', {})
            if not isinstance(inner_args, dict):
                inner_args = {}
            return AgentAPIHandler._execute_runtime_tool_call(session, inner_name, inner_args)

        # WebSearch / web_search (special — uses backend search engine)
        if tool_name in ('WebSearch', 'web_search'):
            return AgentAPIHandler._execute_builtin_web_search(args)

        # WebFetch
        if tool_name == 'WebFetch':
            return AgentAPIHandler._execute_builtin_web_fetch(session, args)

        # Dispatch table for file / shell / code tools
        method_name = AgentAPIHandler._TOOL_DISPATCH.get(tool_name)
        if method_name:
            method = getattr(AgentAPIHandler, method_name)
            return method(session, args)

        # Fallback: MCP tools
        _log(f"[runtime-tool] Falling back to MCP execution for: {tool_name}")
        return AgentAPIHandler._execute_session_mcp_tool(session, tool_name, args)

    @staticmethod
    def _execute_session_mcp_tool(session: dict, tool_name: str, arguments: dict) -> dict:
        """Execute an MCP tool limited to already-running session MCP servers."""
        server_configs = AgentAPIHandler._resolve_session_mcp_servers(session)
        if not server_configs:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'No MCP servers configured for this session'}]}

        mcp = AgentAPIHandler._get_mcp_module()
        if mcp is None:
            return {'isError': True, 'content': [{'type': 'text', 'text': 'MCP system not available'}]}
        try:
            for server_config in server_configs:
                server_id = str(server_config.get('id', ''))
                client = None
                with mcp._clients_lock:
                    existing = mcp._clients.get(server_id)
                    if existing and existing.is_alive():
                        client = existing
                if client is None:
                    continue

                try:
                    for t in (client.list_tools() or []):
                        if t.get('name') == tool_name:
                            return client.call_tool(tool_name, arguments, timeout=60.0)
                except Exception as inner_e:
                    _log(f"Tool probe failed on MCP client '{server_id}': {inner_e}")

            return {
                'isError': True,
                'content': [{
                    'type': 'text',
                    'text': f"Tool '{tool_name}' is not available because its MCP server is not currently running in this session"
                }]
            }
        except Exception as e:
            return {'isError': True, 'content': [{'type': 'text', 'text': f'Tool execution error: {e}'}]}

    @staticmethod
    def _mcp_result_to_text(result: dict) -> str:
        """Convert MCP tool result to a plain-text string for the LLM tool message."""
        parts = []
        for item in result.get('content', []):
            if isinstance(item, dict) and item.get('type') == 'text':
                parts.append(item.get('text', ''))
            elif isinstance(item, str):
                parts.append(item)
        return '\n'.join(parts) if parts else json.dumps(result, ensure_ascii=False)

    @staticmethod
    def _normalize_model_id(model_id: str) -> str:
        return (model_id or '').strip().lower()

    @staticmethod
    def _supports_builtin_web_search(provider_id: str, model_id: str) -> bool:
        """Best-effort port of CherryStudio built-in web search detection."""
        pid = (provider_id or '').strip().lower()
        mid = AgentAPIHandler._normalize_model_id(model_id)

        if not mid:
            return False

        if pid == 'hunyuan':
            return mid != 'hunyuan-lite'

        if pid == 'openrouter':
            return True

        if pid == 'poe':
            return True

        if pid in ('dashscope', 'aliyun') or mid.startswith(('qwen-', 'qwen3-', 'qwq', 'qvq')):
            qwen_search_prefixes = ('qwen-turbo', 'qwen-max', 'qwen-plus', 'qwq', 'qwen-flash', 'qwen3-max')
            return mid.startswith(qwen_search_prefixes) or mid.startswith(('qwen-', 'qwen3-', 'qwq', 'qvq'))

        if (
            'gpt-4o-search-preview' in mid or
            'gpt-4o-mini-search-preview' in mid or
            ('gpt-4.1' in mid and 'gpt-4.1-nano' not in mid) or
            ('gpt-4o' in mid and 'gpt-4o-image' not in mid) or
            'o3' in mid or
            'o4' in mid or
            ('gpt-5' in mid and 'chat' not in mid)
        ):
            return True

        return False

    @staticmethod
    def _get_builtin_web_search_params(provider_id: str, model_id: str) -> dict:
        """Return provider-specific request params for built-in web search."""
        pid = (provider_id or '').strip().lower()
        mid = AgentAPIHandler._normalize_model_id(model_id)

        if not AgentAPIHandler._supports_builtin_web_search(pid, mid):
            return {}

        if pid == 'hunyuan':
            return {
                'enable_enhancement': True,
                'citation': True,
                'search_info': True
            }

        if pid == 'poe':
            return {
                'extra_body': {
                    'web_search': True
                }
            }

        if pid == 'openrouter':
            return {
                'plugins': [
                    {
                        'id': 'web',
                        'max_results': 5
                    }
                ]
            }

        if pid in ('dashscope', 'aliyun') or mid.startswith(('qwen-', 'qwen3-', 'qwq', 'qvq')):
            return {
                'enable_search': True,
                'search_options': {
                    'forced_search': True
                }
            }

        return {
            'web_search_options': {}
        }

    def _make_llm_connection(self, url: str, api_key: str):
        """Create an http.client connection to the LLM endpoint."""
        import http.client
        from urllib.parse import urlparse as _urlparse
        parsed = _urlparse(url)
        if parsed.scheme == 'https':
            import ssl
            conn = http.client.HTTPSConnection(parsed.hostname, parsed.port or 443,
                                               context=ssl._create_unverified_context(), timeout=120)
        else:
            conn = http.client.HTTPConnection(parsed.hostname, parsed.port or 80, timeout=120)
        return conn, parsed

    @staticmethod
    def _extract_tool_calls_from_text(text: str) -> list:
        """Parse tool calls embedded in text for models that don't use the
        standard tool_calls delta channel.

        Supported formats:
          1. Qwen-style: <tool_call>{"name":"...", "arguments":{...}}</tool_call>
          2. Generic JSON block: ```json\n{"name":"...", "arguments":{...}}\n```
          3. Function call markers: ✿FUNCTION✿: name\n✿ARGS✿: {...}\n✿RESULT✿
        """
        import re as _re
        import uuid as _uuid
        results = []

        # Format 1: <tool_call>...</tool_call>
        for m in _re.finditer(r'<tool_call>\s*(\{.*?\})\s*</tool_call>', text, _re.DOTALL):
            try:
                obj = json.loads(m.group(1))
                name = obj.get('name') or obj.get('function', {}).get('name', '')
                args = obj.get('arguments') or obj.get('parameters') or {}
                if isinstance(args, str):
                    args = json.loads(args)
                if name:
                    results.append({'id': f'call_{_uuid.uuid4().hex[:12]}', 'name': name, 'arguments': args})
            except (json.JSONDecodeError, AttributeError):
                pass

        if results:
            return results

        # Format 2: ```json\n{"name": "...", "arguments": {...}}\n```
        for m in _re.finditer(r'```(?:json)?\s*\n(\{[^`]*?"name"\s*:\s*"[^"]+?".*?\})\s*\n```', text, _re.DOTALL):
            try:
                obj = json.loads(m.group(1))
                name = obj.get('name', '')
                args = obj.get('arguments') or obj.get('parameters') or {}
                if isinstance(args, str):
                    args = json.loads(args)
                if name and ('arguments' in obj or 'parameters' in obj):
                    results.append({'id': f'call_{_uuid.uuid4().hex[:12]}', 'name': name, 'arguments': args})
            except (json.JSONDecodeError, AttributeError):
                pass

        if results:
            return results

        # Format 3: Qwen ✿FUNCTION✿ markers
        for m in _re.finditer(r'✿FUNCTION✿:\s*(\S+)\s*\n✿ARGS✿:\s*(\{.*?\})\s*(?:\n✿RESULT✿)?', text, _re.DOTALL):
            try:
                name = m.group(1)
                args = json.loads(m.group(2))
                results.append({'id': f'call_{_uuid.uuid4().hex[:12]}', 'name': name, 'arguments': args})
            except (json.JSONDecodeError, AttributeError):
                pass

        return results

    def _stream_llm_turn(self, conn, parsed_url, api_key, model_id, messages, tools_openai, extra_params=None):
        """Execute one LLM streaming turn.

        Returns (text, chunk_count, tool_calls, finish_reason).
        tool_calls is a list of dicts: [{'id', 'name', 'arguments'(dict)}]
        """
        headers = {'Content-Type': 'application/json', 'Accept': 'text/event-stream'}
        if api_key:
            headers['Authorization'] = f'Bearer {api_key}'

        self._write_sse_chunk({
            'type': 'start-step',
            'request': {'body': ''},
            'warnings': []
        })

        body = {'model': model_id, 'messages': messages, 'stream': True}
        if tools_openai:
            body['tools'] = tools_openai
            body['tool_choice'] = 'auto'
        if extra_params:
            body.update(extra_params)

        _log(f"[v3-runtime] LLM request: model={model_id}, tools={len(tools_openai) if tools_openai else 0}, "
             f"messages={len(messages)}, tool_choice={body.get('tool_choice')}")

        body_bytes = json.dumps(body, ensure_ascii=False).encode('utf-8')
        conn.request('POST', parsed_url.path, body=body_bytes, headers=headers)
        resp = conn.getresponse()

        if resp.status != 200:
            err_body = resp.read().decode('utf-8', errors='replace')[:500]
            conn.close()
            return None, 0, None, f'LLM API error {resp.status}: {err_body}'

        full_text = ''
        chunk_count = 0
        text_started = False
        reasoning_started = False
        pending_tool_calls = {}  # index -> {'id': str, 'name': str, 'arguments': str, 'input_started': bool}
        finish_reason = None
        buf = b''

        while True:
            data_chunk = resp.read(4096)
            if not data_chunk:
                break
            buf += data_chunk
            while b'\n' in buf:
                raw_line, buf = buf.split(b'\n', 1)
                line = raw_line.decode('utf-8', errors='replace').rstrip('\r')
                if not line.startswith('data: '):
                    continue
                payload_str = line[6:]
                if payload_str == '[DONE]':
                    break
                try:
                    chunk_obj = json.loads(payload_str)
                    choice = chunk_obj.get('choices', [{}])[0]
                    delta = choice.get('delta', {})
                    fr = choice.get('finish_reason')
                    if fr:
                        finish_reason = fr

                    # Log the first chunk to see what the LLM is sending back
                    if chunk_count == 0 and not pending_tool_calls:
                        _log(f"[v3-runtime] First LLM chunk delta keys: {list(delta.keys())}, "
                             f"has_tool_calls={'tool_calls' in delta}, finish={fr}")

                    # Reasoning / thinking content (DeepSeek, Qwen, etc.)
                    reasoning = delta.get('reasoning_content') or delta.get('thinking') or ''
                    if reasoning:
                        if not reasoning_started:
                            self._write_sse_chunk({'type': 'reasoning-start', 'id': 'reasoning_0'})
                            reasoning_started = True
                        self._write_sse_chunk({'type': 'reasoning-delta', 'text': reasoning})

                    # Text content
                    text = delta.get('content')
                    if text:
                        if reasoning_started:
                            self._write_sse_chunk({'type': 'reasoning-end'})
                            reasoning_started = False
                        if not text_started:
                            self._write_sse_chunk({'type': 'text-start'})
                            text_started = True
                        self._write_sse_chunk({'type': 'text-delta', 'text': text})
                        full_text += text
                        chunk_count += 1

                    # Tool calls (streamed as deltas)
                    # Some models put tool_calls in 'message' instead of 'delta'
                    tc_source = delta.get('tool_calls') or choice.get('message', {}).get('tool_calls') or []
                    for tc_delta in tc_source:
                        idx = tc_delta.get('index', 0)
                        if idx not in pending_tool_calls:
                            pending_tool_calls[idx] = {'id': '', 'name': '', 'arguments': '', 'input_started': False}
                        if tc_delta.get('id'):
                            pending_tool_calls[idx]['id'] = tc_delta['id']
                        func = tc_delta.get('function', {})
                        if func.get('name'):
                            pending_tool_calls[idx]['name'] = func['name']
                            _log(f"[v3-runtime] Tool call detected: name={func['name']}, id={tc_delta.get('id')}")
                        # Auto-generate id if model didn't provide one
                        if pending_tool_calls[idx]['name'] and not pending_tool_calls[idx]['id']:
                            import uuid as _uuid
                            pending_tool_calls[idx]['id'] = f"call_{_uuid.uuid4().hex[:12]}"
                        if (
                            pending_tool_calls[idx]['id'] and
                            pending_tool_calls[idx]['name'] and
                            not pending_tool_calls[idx]['input_started']
                        ):
                            self._write_sse_chunk({
                                'type': 'tool-input-start',
                                'id': pending_tool_calls[idx]['id'],
                                'toolName': pending_tool_calls[idx]['name']
                            })
                            pending_tool_calls[idx]['input_started'] = True
                        if 'arguments' in func:
                            arg_delta = func['arguments']
                            pending_tool_calls[idx]['arguments'] += arg_delta
                            if pending_tool_calls[idx]['input_started'] and arg_delta:
                                self._write_sse_chunk({
                                    'type': 'tool-input-delta',
                                    'id': pending_tool_calls[idx]['id'],
                                    'delta': arg_delta
                                })
                except (json.JSONDecodeError, IndexError, KeyError):
                    pass

        conn.close()

        _log(f"[v3-runtime] Turn complete: text_len={len(full_text)}, "
             f"pending_tool_calls={len(pending_tool_calls)}, finish={finish_reason}")

        if reasoning_started:
            self._write_sse_chunk({'type': 'reasoning-end'})
        if text_started:
            self._write_sse_chunk({'type': 'text-end'})

        # Parse accumulated tool call argument strings
        tool_calls = []
        for idx in sorted(pending_tool_calls):
            tc = pending_tool_calls[idx]
            if tc['id'] and tc['name']:
                if tc.get('input_started'):
                    self._write_sse_chunk({
                        'type': 'tool-input-end',
                        'id': tc['id']
                    })
                try:
                    parsed_args = json.loads(tc['arguments']) if tc['arguments'] else {}
                except json.JSONDecodeError:
                    parsed_args = {}
                tool_calls.append({'id': tc['id'], 'name': tc['name'], 'arguments': parsed_args})

        # Fallback: extract tool calls embedded in text output.
        # Some models (e.g. Qwen) emit tool calls as special text blocks
        # instead of using the standard tool_calls delta channel.
        if not tool_calls and full_text:
            tool_calls = self._extract_tool_calls_from_text(full_text)
            if tool_calls:
                _log(f"[v3-runtime] Extracted {len(tool_calls)} tool call(s) from text output (fallback)")

        return full_text, chunk_count, tool_calls, finish_reason

    def _handle_post_messages(self, agent_id: str, session_id: str):
        """Handle POST /v1/agents/{id}/sessions/{sid}/messages.

        Mirrors the original CherryStudio agent flow:
        1. Load session conversation history (multi-turn context)
        2. Build messages: system prompt + history + current user message
        3. Collect MCP tools from active clients
        4. Multi-turn LLM loop: call LLM → if tool_calls, execute & loop
        5. Stream AI-SDK-compatible SSE events to the frontend
        6. Persist the full exchange (user + assistant + tools) in session history
        """
        _log("===== [v3-runtime] _handle_post_messages ENTERED =====")
        try:
            data = self._read_json_body()
            content = data.get('content', '')
            effort = data.get('effort', '')       # reasoning effort: 'low'|'medium'|'high'
            thinking = data.get('thinking', False) # enable extended thinking

            agent = AgentStorage.get_agent(agent_id)
            if not agent:
                self._sse_error('Agent not found', 'not_found')
                return
            if agent.get('type') == 'coco':
                session = SessionStorage.get_session(agent_id, session_id)
                if not session:
                    self._sse_error('Session not found', 'not_found')
                    return
                self.send_response(200)
                self._send_cors_headers()
                self.send_header('Content-Type', 'text/event-stream')
                self.send_header('Cache-Control', 'no-cache')
                self.send_header('Connection', 'keep-alive')
                self.end_headers()
                from coco_agent_adapter import handle_coco_messages
                handle_coco_messages(self, agent, session, content)
                return
            session = SessionStorage.get_session(agent_id, session_id)
            if not session:
                self._sse_error('Session not found', 'not_found')
                return

            model_str = agent.get('model', '')
            if not model_str:
                self._sse_error('Agent has no model configured', 'configuration_error')
                return

            base_url, api_key, model_id = self._resolve_provider(model_str)
            provider_id = model_str.split(':', 1)[0] if ':' in model_str else ''

            # ── 1. Build runtime tool view ──
            agent_mcps = agent.get('mcps') or []
            session_mcps = session.get('mcps') or []
            _log(f"[v3-runtime] agent.mcps={agent_mcps}, session.mcps={session_mcps}")

            # Merge agent-level mcps into session if session has none
            if not session_mcps and agent_mcps:
                session = dict(session, mcps=agent_mcps)
                _log(f"Session has no mcps configured; inherited {len(agent_mcps)} from agent")

            runtime_available_tools = self._list_runtime_available_tools(session)
            builtin_count = len(self._list_runtime_builtin_tools())
            mcp_count = len(runtime_available_tools) - builtin_count

            # Decide tool exposure mode:
            #   "direct" (default) — full schemas sent to LLM; works with all models
            #   "meta"             — 3 meta-tools only; saves tokens but needs smart models
            tool_mode = (agent.get('configuration') or {}).get('tool_mode', 'direct')
            if tool_mode == 'meta' and runtime_available_tools:
                runtime_tools_openai = self._build_runtime_meta_tools()
                _log(f"[v3-runtime] Tool mode: META — 3 meta-tools for {len(runtime_available_tools)} underlying tools")
            elif runtime_available_tools:
                runtime_tools_openai = self._build_runtime_direct_tools(session)
                tool_mode = 'direct'
                _log(f"[v3-runtime] Tool mode: DIRECT — {len(runtime_tools_openai)} function schemas sent to LLM")
            else:
                runtime_tools_openai = []
                _log("[v3-runtime] No runtime tools available")

            tool_names = [t['function']['name'] for t in runtime_tools_openai]
            _log(f"[v3-runtime] Tools: {len(runtime_available_tools)} total ({builtin_count} builtin, {mcp_count} MCP)")
            _log(f"[v3-runtime] Tool names sent to LLM: {tool_names[:30]}")
            builtin_web_search_params = self._get_builtin_web_search_params(provider_id, model_id)
            builtin_web_search_enabled = bool(builtin_web_search_params)
            if builtin_web_search_enabled:
                _log(
                    f"Built-in web search enabled for provider={provider_id} model={model_id}: "
                    f"{json.dumps(builtin_web_search_params, ensure_ascii=False)}"
                )

            # Build extra LLM params from effort/thinking settings
            extra_llm_params = dict(builtin_web_search_params) if builtin_web_search_params else {}
            if effort:
                extra_llm_params['reasoning_effort'] = effort
            if thinking:
                extra_llm_params['thinking'] = {'type': 'enabled', 'budget_tokens': 10000}

            # ── 2. Build the system prompt ──
            system_parts = []
            instructions = agent.get('instructions', '')
            if instructions:
                system_parts.append(instructions)

            system_parts.append(
                'You are an intelligent agent assistant with access to tools. '
                'When the user asks you to perform a task, you MUST proactively use the available tools '
                'to accomplish it. Do NOT refuse or say you cannot do something if a relevant tool exists. '
                'Always try to use tools first before falling back to text-only responses.'
            )

            if runtime_available_tools:
                if tool_mode == 'meta':
                    tool_summary_lines = [f'  - {t["name"]}: {t["description"][:80]}' for t in runtime_available_tools[:20]]
                    tool_summary = '\n'.join(tool_summary_lines)
                    system_parts.append(
                        f'You have access to {len(runtime_available_tools)} tool(s) via a two-stage runtime:\n'
                        f'{tool_summary}\n\n'
                        'IMPORTANT: You must use the three meta-functions (discover_tools, get_tool_schema, call_tool) '
                        'to interact with these tools. Do NOT call tool names directly — they are not in your function list.\n'
                        'Workflow: discover_tools → get_tool_schema → call_tool.\n'
                        'Before saying no tool is available, you MUST call discover_tools first.'
                    )
                else:
                    system_parts.append(
                        f'You have access to {len(runtime_tools_openai)} tool(s). '
                        'When the user asks you to do something, you MUST call the appropriate tool function. '
                        'For example, if the user asks about weather or current information, call the web_search tool. '
                        'Do NOT describe what you would do — actually call the tool.'
                    )
            else:
                system_parts.append('There are currently no running MCP tools available in this session.')

            if builtin_web_search_enabled:
                system_parts.append(
                    'You also have built-in web search enabled through the model provider. '
                    'For questions about current events, weather, recent facts, live websites, or anything '
                    'that benefits from up-to-date information, proactively use built-in web search instead '
                    'of claiming you cannot access the internet.'
                )

            system_parts.append(
                'IMPORTANT: You MUST respond in the same language as the user. '
                'If the user writes in Chinese, respond in Chinese. '
                'If the user writes in English, respond in English. '
                'Never switch language unless explicitly asked.'
            )
            system_msg = {'role': 'system', 'content': '\n\n'.join(system_parts)}

            # ── 3. Load conversation history & append current user message ──
            history = SessionMessageHistory.load(session_id)
            messages = [system_msg] + history + [{'role': 'user', 'content': content}]
            _log(f"Session {session_id}: {len(history)} history msgs, user content={content[:80]!r}")

            new_exchange_msgs = [{'role': 'user', 'content': content}]

            url = f"{base_url}/chat/completions"
            _log(f"Proxying agent message to {url} model={model_id}")

            # ── 4. Start SSE response ──
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.end_headers()

            # Send raw event with session_id so the frontend can track it
            self._write_sse_chunk({
                'type': 'raw',
                'rawValue': {
                    'type': 'init',
                    'session_id': session_id
                }
            })

            total_text_chunks = 0
            total_text = ''
            max_turns = int((agent.get('configuration') or {}).get('max_turns', 10) or 10)
            max_turns = min(max(max_turns, 1), 25)

            # ── 5. Multi-turn LLM loop ──
            for turn in range(max_turns):
                conn, parsed = self._make_llm_connection(url, api_key)
                _log(f"LLM turn {turn + 1}/{max_turns}")

                text, chunk_count, tool_calls, finish_reason = self._stream_llm_turn(
                    conn, parsed, api_key, model_id, messages, runtime_tools_openai, extra_llm_params or None
                )

                if isinstance(finish_reason, str) and finish_reason.startswith('LLM API error'):
                    self._write_sse_chunk({'type': 'error', 'error': {'message': finish_reason, 'type': 'upstream_error'}})
                    break

                total_text_chunks += chunk_count
                if text:
                    total_text += text

                if tool_calls:
                    _log(f"LLM requested {len(tool_calls)} tool call(s): {[tc['name'] for tc in tool_calls]}")

                    for tc in tool_calls:
                        self._write_sse_chunk({
                            'type': 'tool-call',
                            'toolCallId': tc['id'],
                            'toolName': tc['name'],
                            'input': tc['arguments']
                        })

                    assistant_msg = {
                        'role': 'assistant',
                        'content': text or None,
                        'tool_calls': [
                            {
                                'id': tc['id'],
                                'type': 'function',
                                'function': {
                                    'name': tc['name'],
                                    'arguments': json.dumps(tc['arguments'], ensure_ascii=False)
                                }
                            }
                            for tc in tool_calls
                        ]
                    }
                    messages.append(assistant_msg)
                    new_exchange_msgs.append(assistant_msg)

                    for tc in tool_calls:
                        _log(f"Executing runtime tool: {tc['name']} args={json.dumps(tc['arguments'], ensure_ascii=False)[:200]}")
                        result = self._execute_runtime_tool_call(session, tc['name'], tc['arguments'])
                        result_text = self._mcp_result_to_text(result)
                        _log(f"Tool '{tc['name']}' result (err={result.get('isError')}): {result_text[:200]}")

                        if result.get('isError'):
                            self._write_sse_chunk({
                                'type': 'tool-error',
                                'toolCallId': tc['id'],
                                'error': result_text,
                                'input': tc['arguments']
                            })
                        self._write_sse_chunk({
                            'type': 'tool-result',
                            'toolCallId': tc['id'],
                            'toolName': tc['name'],
                            'input': tc['arguments'],
                            'output': result_text
                        })

                        tool_msg = {'role': 'tool', 'tool_call_id': tc['id'], 'content': result_text}
                        messages.append(tool_msg)
                        new_exchange_msgs.append(tool_msg)

                    self._write_sse_chunk({'type': 'finish-step', 'finishReason': 'tool-calls'})
                    continue
                else:
                    # Final text response — record assistant message
                    if text:
                        final_assistant = {'role': 'assistant', 'content': text}
                        new_exchange_msgs.append(final_assistant)
                    self._write_sse_chunk({'type': 'finish-step', 'finishReason': finish_reason or 'stop'})
                    break

            # ── 6. Final SSE events ──
            self._write_sse_chunk({
                'type': 'finish',
                'finishReason': 'end_turn',
                'totalUsage': {'inputTokens': 0, 'outputTokens': 0, 'totalTokens': 0}
            })
            self.wfile.write(b"data: [DONE]\n\n")
            self.wfile.flush()
            _log(f"LLM streaming complete: {total_text_chunks} text chunks, {len(total_text)} chars")

            # ── 7. Persist the exchange into session history ──
            SessionMessageHistory.append_exchange(session_id, new_exchange_msgs)
            _log(f"Persisted {len(new_exchange_msgs)} messages to session {session_id} history")

        except ValueError as e:
            _log(f"Provider resolution error: {e}")
            self._sse_error(str(e), 'configuration_error')
        except Exception as e:
            _log(f"Error in messages endpoint: {e}")
            import traceback
            _log(traceback.format_exc())
            self._sse_error(str(e), 'internal_error')

    def _write_sse_chunk(self, obj):
        """Write a single SSE data line and flush immediately."""
        self.wfile.write(f"data: {json.dumps(obj)}\n\n".encode('utf-8'))
        self.wfile.flush()

    def _sse_error(self, message: str, error_type: str):
        """Send an error as SSE and end the response."""
        if not self._headers_buffer:
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
        err = json.dumps({'type': 'error', 'error': {'message': message, 'type': error_type}})
        self.wfile.write(f"data: {err}\n\n".encode('utf-8'))
        self.wfile.write(b"data: [DONE]\n\n")
        self.wfile.flush()

    def _get_models_from_providers(self) -> list:
        """从 providers 配置获取模型列表"""
        try:
            if not AgentAPIHandler.providers_loader:
                return []
            
            # 获取 providers 配置
            providers = AgentAPIHandler.providers_loader()
            if not providers:
                return []
            
            all_models = []
            
            # 遍历每个 provider 获取模型
            for provider in providers:
                try:
                    provider_type = provider.get('type', '')
                    api_key = provider.get('apiKey', '')
                    base_url = provider.get('baseURL', '')
                    
                    if not api_key:
                        continue
                    
                    # 根据 provider 类型调用相应的 API
                    if provider_type == 'openai' or provider_type == 'openai-response':
                        models = self._get_openai_models(base_url, api_key)
                    elif provider_type == 'anthropic':
                        models = self._get_anthropic_models(base_url, api_key)
                    elif provider_type == 'gemini':
                        models = self._get_gemini_models(base_url, api_key)
                    else:
                        continue
                    
                    # 为每个模型添加 provider 前缀
                    for model in models:
                        model_id = model.get('id', '')
                        if model_id and ':' not in model_id:
                            model['id'] = f"{provider.get('id', provider_type)}:{model_id}"
                        model['provider'] = provider.get('id', provider_type)
                    
                    all_models.extend(models)
                    
                except Exception as e:
                    _log(f"Error getting models from provider {provider.get('id', 'unknown')}: {e}")
                    continue
            
            return all_models
            
        except Exception as e:
            _log(f"Error in _get_models_from_providers: {e}")
            return []
    
    def _get_openai_models(self, base_url: str, api_key: str) -> list:
        """获取 OpenAI 格式的模型列表"""
        try:
            from urllib import request as urllib_request
            import urllib.error
            
            url = f"{base_url.rstrip('/')}/v1/models" if base_url else "https://api.openai.com/v1/models"
            
            req = urllib_request.Request(url, method="GET")
            req.add_header('Authorization', f'Bearer {api_key}')
            req.add_header('User-Agent', 'Cherry Studio')
            
            with urllib_request.urlopen(req, timeout=10.0) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                return data.get('data', [])
        except Exception as e:
            _log(f"Error fetching OpenAI models: {e}")
            return []
    
    def _get_anthropic_models(self, base_url: str, api_key: str) -> list:
        """获取 Anthropic 模型列表"""
        try:
            # Anthropic 的模型列表是固定的
            models = [
                {'id': 'claude-3-5-sonnet-20241022', 'object': 'model', 'created': 0, 'owned_by': 'anthropic'},
                {'id': 'claude-3-5-sonnet-20240620', 'object': 'model', 'created': 0, 'owned_by': 'anthropic'},
                {'id': 'claude-3-opus-20240229', 'object': 'model', 'created': 0, 'owned_by': 'anthropic'},
                {'id': 'claude-3-sonnet-20240229', 'object': 'model', 'created': 0, 'owned_by': 'anthropic'},
                {'id': 'claude-3-haiku-20240307', 'object': 'model', 'created': 0, 'owned_by': 'anthropic'},
            ]
            return models
        except Exception as e:
            _log(f"Error getting Anthropic models: {e}")
            return []
    
    def _get_gemini_models(self, base_url: str, api_key: str) -> list:
        """获取 Gemini 模型列表"""
        try:
            # Gemini 的模型列表
            models = [
                {'id': 'gemini-1.5-pro', 'object': 'model', 'created': 0, 'owned_by': 'google'},
                {'id': 'gemini-1.5-flash', 'object': 'model', 'created': 0, 'owned_by': 'google'},
                {'id': 'gemini-pro', 'object': 'model', 'created': 0, 'owned_by': 'google'},
            ]
            return models
        except Exception as e:
            _log(f"Error getting Gemini models: {e}")
            return []
    
    def do_GET(self):
        """处理 GET 请求"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # 健康检查
        if path == '/health':
            self.send_response(200)
            self._send_cors_headers()
            self.end_headers()
            response = {'status': 'ok', 'timestamp': time.strftime('%Y-%m-%dT%H:%M:%S'), 'version': '1.0.0'}
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return
        
        # API 信息
        if path == '/':
            self.send_response(200)
            self._send_cors_headers()
            self.end_headers()
            response = {
                'name': 'Cherry Studio API',
                'version': '1.0.0',
                'endpoints': {'health': 'GET /health'}
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return
        
        # /v1/models 端点
        if path == '/v1/models':
            if not self._check_auth():
                self.send_response(401)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
            
            try:
                # 解析查询参数
                query_params = parse_qs(parsed_path.query)
                offset = int(query_params.get('offset', [0])[0]) if 'offset' in query_params else 0
                limit = int(query_params.get('limit', [100])[0]) if 'limit' in query_params else None
                provider_type = query_params.get('providerType', [None])[0]
                
                # 获取所有模型
                all_models = self._get_models_from_providers()
                
                # 过滤 provider 类型
                if provider_type:
                    all_models = [m for m in all_models if m.get('provider', '').startswith(provider_type)]
                
                total = len(all_models)
                
                # 应用分页
                if limit is not None:
                    models = all_models[offset:offset + limit]
                else:
                    models = all_models[offset:]
                
                response = {
                    'object': 'list',
                    'data': models,
                    'total': total,
                    'offset': offset
                }
                if limit is not None:
                    response['limit'] = limit
                
                self.send_response(200)
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
                
            except Exception as e:
                _log(f"Error in /v1/models: {e}")
                self.send_response(500)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': str(e), 'type': 'internal_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
        
        # /v1/agents 端点
        if path.startswith('/v1/agents'):
            if not self._check_auth():
                self._json_response(401, {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}})
                return

            try:
                m = _RE_SESSIONS_BASE.match(path)
                if m:
                    sessions = SessionStorage.list_sessions(m.group('agent_id'))
                    self._json_response(200, {'data': sessions, 'total': len(sessions), 'limit': 100, 'offset': 0})
                    return

                m = _RE_COCO_CANVAS.match(path)
                if m:
                    agent = AgentStorage.get_agent(m.group('agent_id'))
                    session = SessionStorage.get_session(m.group('agent_id'), m.group('session_id'))
                    if not agent or not session:
                        self._json_response(404, {'error': {'message': 'Not found', 'type': 'not_found_error'}})
                        return
                    if agent.get('type') != 'coco':
                        self._json_response(400, {'error': {'message': 'Not a COCO agent', 'type': 'validation_error'}})
                        return
                    from coco_agent_adapter import get_coco_canvas
                    self._json_response(200, get_coco_canvas(agent, session))
                    return

                m = _RE_SESSION_BY_ID.match(path)
                if m:
                    s = SessionStorage.get_session(m.group('agent_id'), m.group('session_id'))
                    if s:
                        self._json_response(200, s)
                    else:
                        self._json_response(404, {'error': {'message': 'Session not found', 'type': 'not_found_error'}})
                    return

                m = _RE_AGENT_BY_ID.match(path)
                if m:
                    agent = AgentStorage.get_agent(m.group('agent_id'))
                    if agent:
                        self._json_response(200, agent)
                    else:
                        self._json_response(404, {'error': {'message': 'Agent not found', 'type': 'not_found_error'}})
                    return

                if _RE_AGENTS_BASE.match(path):
                    agents = AgentStorage.list_agents()
                    self._json_response(200, {'data': agents, 'total': len(agents), 'limit': 100, 'offset': 0})
                    return

            except Exception as e:
                _log(f"Error in GET {path}: {e}")
                self._json_response(500, {'error': {'message': str(e), 'type': 'internal_error'}})
                return
        
        # 其他路径返回 404
        self.send_response(404)
        self._send_cors_headers()
        self.end_headers()
        response = {'error': {'message': 'Not found', 'type': 'not_found_error'}}
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def do_POST(self):
        """处理 POST 请求"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        if path.startswith('/v1/agents'):
            if not self._check_auth():
                self._json_response(401, {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}})
                return

            try:
                m = _RE_MESSAGES_BASE.match(path)
                if m:
                    self._handle_post_messages(m.group('agent_id'), m.group('session_id'))
                    return

                data = self._read_json_body()

                m = _RE_COCO_APPLY.match(path)
                if m:
                    agent = AgentStorage.get_agent(m.group('agent_id'))
                    session = SessionStorage.get_session(m.group('agent_id'), m.group('session_id'))
                    if not agent or not session:
                        self._json_response(404, {'error': {'message': 'Not found', 'type': 'not_found_error'}})
                        return
                    if agent.get('type') != 'coco':
                        self._json_response(400, {'error': {'message': 'Not a COCO agent', 'type': 'validation_error'}})
                        return
                    from coco_agent_adapter import apply_coco_proposal
                    result = apply_coco_proposal(agent, session, data or {})
                    self._json_response(200, result)
                    return

                m = _RE_COCO_CANVAS.match(path)
                if m:
                    agent = AgentStorage.get_agent(m.group('agent_id'))
                    session = SessionStorage.get_session(m.group('agent_id'), m.group('session_id'))
                    if not agent or not session:
                        self._json_response(404, {'error': {'message': 'Not found', 'type': 'not_found_error'}})
                        return
                    if agent.get('type') != 'coco':
                        self._json_response(400, {'error': {'message': 'Not a COCO agent', 'type': 'validation_error'}})
                        return
                    from coco_agent_adapter import apply_coco_proposal, canvas_from_pipeline_snapshot
                    result = apply_coco_proposal(agent, session, data or {})
                    pipeline_id = (session.get('configuration') or {}).get('coco_pipeline_session_id')
                    if isinstance(result, dict) and pipeline_id:
                        result = canvas_from_pipeline_snapshot(result, str(pipeline_id))
                    self._json_response(200, result)
                    return

                m = _RE_COCO_REJECT.match(path)
                if m:
                    agent = AgentStorage.get_agent(m.group('agent_id'))
                    if not agent:
                        self._json_response(404, {'error': {'message': 'Agent not found', 'type': 'not_found_error'}})
                        return
                    if agent.get('type') != 'coco':
                        self._json_response(400, {'error': {'message': 'Not a COCO agent', 'type': 'validation_error'}})
                        return
                    from coco_agent_adapter import reject_coco_proposal
                    self._json_response(200, reject_coco_proposal())
                    return

                m = _RE_SESSIONS_BASE.match(path)
                if m:
                    session = SessionStorage.create_session(m.group('agent_id'), data)
                    self._json_response(201, session)
                    return

                if _RE_AGENTS_BASE.match(path):
                    agent = AgentStorage.create_agent(data)
                    self._json_response(201, agent)
                    return

            except Exception as e:
                _log(f"Error in POST {path}: {e}")
                self._json_response(500, {'error': {'message': str(e), 'type': 'internal_error'}})
                return

        self._json_response(404, {'error': {'message': 'Not found', 'type': 'not_found_error'}})
    
    def do_PUT(self):
        """处理 PUT 请求"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        if path.startswith('/v1/agents'):
            if not self._check_auth():
                self._json_response(401, {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}})
                return

            try:
                data = self._read_json_body()

                m = _RE_SESSIONS_REORDER.match(path)
                if m:
                    SessionStorage.reorder_sessions(m.group('agent_id'), data.get('ordered_ids', []))
                    self._json_response(200, {'success': True})
                    return

                m = _RE_AGENTS_REORDER.match(path)
                if m:
                    self._json_response(200, {'success': True})
                    return

                m = _RE_SESSION_BY_ID.match(path)
                if m:
                    result = SessionStorage.update_session(m.group('agent_id'), m.group('session_id'), data)
                    if result:
                        agent = AgentStorage.get_agent(m.group('agent_id'))
                        if agent and agent.get('type') == 'coco' and 'name' in (data or {}):
                            try:
                                from coco_agent_adapter import refresh_coco_title
                                refresh_coco_title(agent, result)
                            except Exception as exc:  # noqa: BLE001
                                _log(f"[coco] title refresh failed: {exc}")
                        self._json_response(200, result)
                    else:
                        self._json_response(404, {'error': {'message': 'Session not found', 'type': 'not_found_error'}})
                    return

                m = _RE_AGENT_BY_ID.match(path)
                if m:
                    agent = AgentStorage.update_agent(m.group('agent_id'), data)
                    if agent:
                        self._json_response(200, agent)
                    else:
                        self._json_response(404, {'error': {'message': 'Agent not found', 'type': 'not_found_error'}})
                    return

            except Exception as e:
                _log(f"Error in PUT {path}: {e}")
                self._json_response(500, {'error': {'message': str(e), 'type': 'internal_error'}})
                return

        self._json_response(404, {'error': {'message': 'Not found', 'type': 'not_found_error'}})

    def do_PATCH(self):
        """PATCH 复用 PUT 逻辑"""
        self.do_PUT()

    def do_DELETE(self):
        """处理 DELETE 请求"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        if path.startswith('/v1/agents'):
            if not self._check_auth():
                self._json_response(401, {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}})
                return

            try:
                m = _RE_MESSAGE_BY_ID.match(path)
                if m:
                    self._json_response(200, {'success': True})
                    return

                m = _RE_SESSION_BY_ID.match(path)
                if m:
                    ok = SessionStorage.delete_session(m.group('agent_id'), m.group('session_id'))
                    if ok:
                        self._json_response(200, {'success': True})
                    else:
                        self._json_response(404, {'error': {'message': 'Session not found', 'type': 'not_found_error'}})
                    return

                m = _RE_AGENT_BY_ID.match(path)
                if m:
                    ok = AgentStorage.delete_agent(m.group('agent_id'))
                    if ok:
                        self._json_response(200, {'success': True})
                    else:
                        self._json_response(404, {'error': {'message': 'Agent not found', 'type': 'not_found_error'}})
                    return

            except Exception as e:
                _log(f"Error in DELETE {path}: {e}")
                self._json_response(500, {'error': {'message': str(e), 'type': 'internal_error'}})
                return

        self._json_response(404, {'error': {'message': 'Not found', 'type': 'not_found_error'}})


class SessionMessageHistory:
    """Per-session conversation history for multi-turn LLM context.

    Stores messages in OpenAI chat format so they can be directly included
    in the next LLM request.  File per session: ``<data_dir>/agent_messages/<session_id>.json``
    """

    _base_dir = None

    @classmethod
    def _get_base_dir(cls):
        if cls._base_dir is None:
            from pathlib import Path
            from core.paths import get_app_data_dir
            raw = os.environ.get('CHERRYSTUDIO_DATA_DIR')
            user_data_dir = Path(raw) if raw else Path(get_app_data_dir())
            cls._base_dir = user_data_dir / 'agent_messages'
            cls._base_dir.mkdir(parents=True, exist_ok=True)
        return cls._base_dir

    @classmethod
    def _session_file(cls, session_id: str):
        return cls._get_base_dir() / f'{session_id}.json'

    @classmethod
    def load(cls, session_id: str) -> list:
        """Load conversation history for a session (list of OpenAI message dicts)."""
        f = cls._session_file(session_id)
        if f.exists():
            try:
                with open(f, 'r', encoding='utf-8') as fh:
                    return json.load(fh)
            except (json.JSONDecodeError, OSError):
                return []
        return []

    @classmethod
    def save(cls, session_id: str, messages: list):
        """Persist conversation history for a session."""
        f = cls._session_file(session_id)
        try:
            with open(f, 'w', encoding='utf-8') as fh:
                json.dump(messages, fh, ensure_ascii=False, indent=2)
        except OSError as e:
            _log(f"Failed to save message history for session {session_id}: {e}")

    @classmethod
    def append_exchange(cls, session_id: str, new_messages: list):
        """Append one or more messages to the session history and save."""
        history = cls.load(session_id)
        history.extend(new_messages)
        cls.save(session_id, history)

    @classmethod
    def clear(cls, session_id: str):
        """Clear the history for a session."""
        f = cls._session_file(session_id)
        if f.exists():
            try:
                f.unlink()
            except OSError:
                pass

    @classmethod
    def delete_for_session(cls, session_id: str):
        cls.clear(session_id)


class AgentStorage:
    """Agent 数据存储"""
    
    _agents_file = None
    
    @classmethod
    def _get_agents_file(cls):
        if cls._agents_file is None:
            from pathlib import Path
            from core.paths import get_app_data_dir
            raw = os.environ.get('CHERRYSTUDIO_DATA_DIR')
            user_data_dir = Path(raw) if raw else Path(get_app_data_dir())
            cls._agents_file = user_data_dir / 'agents.json'
        return cls._agents_file
    
    @classmethod
    def _load_agents(cls) -> list:
        """加载所有 agents"""
        try:
            agents_file = cls._get_agents_file()
            if agents_file.exists():
                with open(agents_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            _log(f"Error loading agents: {e}")
        return []
    
    @classmethod
    def _save_agents(cls, agents: list) -> bool:
        """保存所有 agents"""
        try:
            agents_file = cls._get_agents_file()
            agents_file.parent.mkdir(parents=True, exist_ok=True)
            with open(agents_file, 'w', encoding='utf-8') as f:
                json.dump(agents, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            _log(f"Error saving agents: {e}")
            return False
    
    @staticmethod
    def _strip_none(agent: dict) -> dict:
        """Remove keys with None values so Zod .optional() doesn't see null."""
        return {k: v for k, v in agent.items() if v is not None}

    @classmethod
    def list_agents(cls) -> list:
        """列出所有 agents"""
        return [cls._strip_none(a) for a in cls._load_agents()]
    
    @classmethod
    def get_agent(cls, agent_id: str) -> Optional[dict]:
        """获取单个 agent"""
        agents = cls._load_agents()
        for agent in agents:
            if agent.get('id') == agent_id:
                return cls._strip_none(agent)
        return None
    
    @classmethod
    def create_agent(cls, data: dict) -> dict:
        """创建新 agent"""
        import uuid
        from datetime import datetime
        
        agents = cls._load_agents()
        
        now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
        
        # AgentEntitySchema: Zod .optional() accepts undefined/missing but NOT null.
        # Only include optional fields when they have a real value.
        agent: dict = {
            'id': data.get('id') or str(uuid.uuid4()),
            'type': data.get('type', 'claude-code'),
            'name': data.get('name', 'Unnamed Agent'),
            'description': data.get('description', ''),
            'model': data.get('model', ''),
            'accessible_paths': data.get('accessible_paths') or data.get('accessible_directories') or ['.'],
            'instructions': data.get('instructions', ''),
            'mcps': data.get('mcps', []),
            'allowed_tools': data.get('allowed_tools', []),
            'slash_commands': data.get('slash_commands', []),
            'configuration': data.get('configuration', {}),
            'tools': data.get('tools', []),
            'created_at': now,
            'updated_at': now
        }
        for optional_key in ('plan_model', 'small_model'):
            val = data.get(optional_key)
            if val is not None:
                agent[optional_key] = val
        
        agents.append(agent)
        cls._save_agents(agents)
        
        _log(f"Created agent: {agent['id']} - {agent['name']}")
        return agent
    
    @classmethod
    def update_agent(cls, agent_id: str, data: dict) -> Optional[dict]:
        """更新 agent"""
        from datetime import datetime
        
        agents = cls._load_agents()
        for i, agent in enumerate(agents):
            if agent.get('id') == agent_id:
                # Keep update behavior aligned with create_agent so edited agent
                # configuration is persisted locally across app restarts.
                alias_updates = {
                    'accessible_directories': 'accessible_paths',
                }
                mutable_keys = [
                    'name',
                    'description',
                    'model',
                    'instructions',
                    'tools',
                    'accessible_paths',
                    'mcps',
                    'allowed_tools',
                    'slash_commands',
                    'configuration',
                    'metadata',
                    'plan_model',
                    'small_model',
                ]

                for old_key, new_key in alias_updates.items():
                    if old_key in data and new_key not in data:
                        data[new_key] = data[old_key]

                for key in mutable_keys:
                    if key in data:
                        agent[key] = data[key]
                agent['updated_at'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
                agents[i] = agent
                cls._save_agents(agents)
                _log(f"Updated agent: {agent_id}")
                return cls._strip_none(agent)
        return None
    
    @classmethod
    def delete_agent(cls, agent_id: str) -> bool:
        """删除 agent"""
        agents = cls._load_agents()
        for i, agent in enumerate(agents):
            if agent.get('id') == agent_id:
                agents.pop(i)
                cls._save_agents(agents)
                _log(f"Deleted agent: {agent_id}")
                return True
        return False


class SessionStorage:
    """Agent Session 数据存储"""

    _sessions_file = None

    @classmethod
    def _get_sessions_file(cls):
        if cls._sessions_file is None:
            from core.paths import get_app_data_dir
            raw = os.environ.get('CHERRYSTUDIO_DATA_DIR')
            user_data_dir = Path(raw) if raw else Path(get_app_data_dir())
            cls._sessions_file = user_data_dir / 'agent_sessions.json'
        return cls._sessions_file

    @classmethod
    def _load_sessions(cls) -> list:
        try:
            f = cls._get_sessions_file()
            if f.exists():
                with open(f, 'r', encoding='utf-8') as fh:
                    return json.load(fh)
        except Exception as e:
            _log(f"Error loading sessions: {e}")
        return []

    @classmethod
    def _save_sessions(cls, sessions: list) -> bool:
        try:
            f = cls._get_sessions_file()
            f.parent.mkdir(parents=True, exist_ok=True)
            with open(f, 'w', encoding='utf-8') as fh:
                json.dump(sessions, fh, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            _log(f"Error saving sessions: {e}")
            return False

    @staticmethod
    def _strip_none(d: dict) -> dict:
        return {k: v for k, v in d.items() if v is not None}

    @classmethod
    def list_sessions(cls, agent_id: str) -> list:
        return [cls._strip_none(s) for s in cls._load_sessions() if s.get('agent_id') == agent_id]

    @classmethod
    def get_session(cls, agent_id: str, session_id: str) -> Optional[dict]:
        for s in cls._load_sessions():
            if s.get('agent_id') == agent_id and s.get('id') == session_id:
                return cls._strip_none(s)
        return None

    @classmethod
    def create_session(cls, agent_id: str, data: dict) -> dict:
        import uuid
        from datetime import datetime

        sessions = cls._load_sessions()
        agent = AgentStorage.get_agent(agent_id)
        agent_type = agent.get('type', 'claude-code') if agent else 'claude-code'

        now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
        session: dict = {
            'id': data.get('id') or str(uuid.uuid4()),
            'agent_id': agent_id,
            'agent_type': agent_type,
            'name': data.get('name', 'New Session'),
            'description': data.get('description', ''),
            'accessible_paths': data.get('accessible_paths', agent.get('accessible_paths', ['.']) if agent else ['.']),
            'model': data.get('model', agent.get('model', '') if agent else ''),
            'instructions': data.get('instructions', ''),
            'mcps': data.get('mcps', []),
            'allowed_tools': data.get('allowed_tools', []),
            'slash_commands': data.get('slash_commands', []),
            'configuration': data.get('configuration', {}),
            'created_at': now,
            'updated_at': now
        }
        for optional_key in ('plan_model', 'small_model'):
            val = data.get(optional_key)
            if val is not None:
                session[optional_key] = val

        sessions.append(session)
        cls._save_sessions(sessions)
        _log(f"Created session: {session['id']} for agent {agent_id}")
        return cls._strip_none(session)

    @classmethod
    def update_session(cls, agent_id: str, session_id: str, data: dict) -> Optional[dict]:
        from datetime import datetime
        sessions = cls._load_sessions()
        for i, s in enumerate(sessions):
            if s.get('agent_id') == agent_id and s.get('id') == session_id:
                for key, val in data.items():
                    if key not in ('id', 'agent_id', 'agent_type', 'created_at'):
                        s[key] = val
                s['updated_at'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
                sessions[i] = s
                cls._save_sessions(sessions)
                _log(f"Updated session: {session_id}")
                return cls._strip_none(s)
        return None

    @classmethod
    def delete_session(cls, agent_id: str, session_id: str) -> bool:
        sessions = cls._load_sessions()
        for i, s in enumerate(sessions):
            if s.get('agent_id') == agent_id and s.get('id') == session_id:
                sessions.pop(i)
                cls._save_sessions(sessions)
                SessionMessageHistory.delete_for_session(session_id)
                _log(f"Deleted session: {session_id}")
                return True
        return False

    @classmethod
    def reorder_sessions(cls, agent_id: str, ordered_ids: list) -> bool:
        sessions = cls._load_sessions()
        agent_sessions = [s for s in sessions if s.get('agent_id') == agent_id]
        other_sessions = [s for s in sessions if s.get('agent_id') != agent_id]
        id_map = {s['id']: s for s in agent_sessions}
        reordered = [id_map[sid] for sid in ordered_ids if sid in id_map]
        remaining = [s for s in agent_sessions if s['id'] not in set(ordered_ids)]
        cls._save_sessions(other_sessions + reordered + remaining)
        return True


class _AgentHTTPServer(DisconnectQuietMixIn, ThreadingHTTPServer):
    daemon_threads = True


class AgentServer:
    """Agent API 服务器"""
    
    def __init__(self, providers_loader=None):
        self.server: Optional[_AgentHTTPServer] = None
        self.thread: Optional[threading.Thread] = None
        self.port = 0
        self.host = '127.0.0.1'
        self.providers_loader = providers_loader
        self.running = False
    
    def start(self, host: str = '127.0.0.1', port: int = 0) -> tuple[bool, int]:
        """启动服务器
        
        Args:
            host: 监听地址
            port: 监听端口（0 表示自动分配）
            
        Returns:
            (success, actual_port)
        """
        if self.running and self.server:
            _log(f"Agent server already running on port {self.port}")
            return True, self.port
        
        try:
            self.host = host
            
            # 设置 providers_loader 到 Handler 类
            AgentAPIHandler.providers_loader = self.providers_loader
            
            # 创建服务器
            self.server = _AgentHTTPServer((host, port), AgentAPIHandler)
            self.server.daemon_threads = True
            self.port = self.server.server_port
            self.running = True
            
            # 在后台线程中运行服务器
            def run_server():
                try:
                    _log(f"Starting Agent server on {host}:{self.port}")
                    self.server.serve_forever()
                except Exception as e:
                    _log(f"Agent server error: {e}")
                    self.running = False
            
            self.thread = threading.Thread(target=run_server, daemon=True)
            self.thread.start()
            
            # 等待服务器启动
            time.sleep(0.1)
            
            _log(f"Agent server started on {host}:{self.port}")
            return True, self.port
            
        except Exception as e:
            _log(f"Failed to start Agent server: {e}")
            self.running = False
            return False, 0
    
    def stop(self):
        """停止服务器"""
        if self.server:
            try:
                self.server.shutdown()
                self.server.server_close()
                _log(f"Agent server stopped on port {self.port}")
            except Exception as e:
                _log(f"Error stopping Agent server: {e}")
            finally:
                self.server = None
                self.running = False
                self.port = 0
    
    def is_running(self) -> bool:
        """检查服务器是否运行中"""
        return self.running and self.server is not None
    
    def get_port(self) -> int:
        """获取服务器端口"""
        return self.port

