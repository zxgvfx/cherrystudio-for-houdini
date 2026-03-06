"""
Agent API Server
提供 Agent 相关的 HTTP API 端点
"""

import json
import os
import threading
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse
from typing import Optional

# 导入统一日志模块
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.logger import agent_server_logger

_log = agent_server_logger


class AgentAPIHandler(BaseHTTPRequestHandler):
    """Agent API 请求处理器"""
    
    providers_loader = None  # 类变量，由服务器设置
    
    def log_message(self, format, *args):
        """重写日志方法，使用我们的日志函数"""
        _log(f"[AgentServer] {format % args}")
    
    def do_OPTIONS(self):
        """处理 CORS 预检请求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Content-Length', '0')
        self.end_headers()
    
    def _send_cors_headers(self):
        """发送 CORS 头"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Content-Type', 'application/json')
    
    def _check_auth(self) -> bool:
        """检查认证（Bearer token）"""
        auth_header = self.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return False
        # 简单验证：如果配置了 API key，则验证；否则允许通过
        # 这里可以添加更严格的验证逻辑
        return True
    
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
        if path == '/v1/agents' or path.startswith('/v1/agents/'):
            if not self._check_auth():
                self.send_response(401)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
            
            try:
                agents = AgentStorage.list_agents()
                
                # 如果是获取单个 agent
                if path != '/v1/agents':
                    agent_id = path.split('/v1/agents/')[-1].split('/')[0]
                    if agent_id:
                        agent = AgentStorage.get_agent(agent_id)
                        if agent:
                            self.send_response(200)
                            self._send_cors_headers()
                            self.end_headers()
                            response = {'data': agent}
                            self.wfile.write(json.dumps(response).encode('utf-8'))
                        else:
                            self.send_response(404)
                            self._send_cors_headers()
                            self.end_headers()
                            response = {'error': {'message': 'Agent not found', 'type': 'not_found_error'}}
                            self.wfile.write(json.dumps(response).encode('utf-8'))
                        return
                
                # 列出所有 agents
                self.send_response(200)
                self._send_cors_headers()
                self.end_headers()
                # 前端期望格式: {data, total, limit, offset}
                response = {
                    'data': agents,
                    'total': len(agents),
                    'limit': 100,
                    'offset': 0
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
                
            except Exception as e:
                _log(f"Error in /v1/agents GET: {e}")
                self.send_response(500)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': str(e), 'type': 'internal_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
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
        
        # /v1/agents 创建 agent
        if path == '/v1/agents':
            if not self._check_auth():
                self.send_response(401)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
            
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length).decode('utf-8')
                data = json.loads(body) if body else {}
                
                agent = AgentStorage.create_agent(data)
                
                self.send_response(201)
                self._send_cors_headers()
                self.end_headers()
                response = {'data': agent}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
                
            except Exception as e:
                _log(f"Error in /v1/agents POST: {e}")
                self.send_response(500)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': str(e), 'type': 'internal_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
        
        # 其他路径返回 404
        self.send_response(404)
        self._send_cors_headers()
        self.end_headers()
        response = {'error': {'message': 'Not found', 'type': 'not_found_error'}}
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def do_PUT(self):
        """处理 PUT 请求"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # /v1/agents/{id} 更新 agent
        if path.startswith('/v1/agents/'):
            if not self._check_auth():
                self.send_response(401)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
            
            try:
                agent_id = path.split('/v1/agents/')[-1].split('/')[0]
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length).decode('utf-8')
                data = json.loads(body) if body else {}
                
                agent = AgentStorage.update_agent(agent_id, data)
                if agent:
                    self.send_response(200)
                    self._send_cors_headers()
                    self.end_headers()
                    response = {'data': agent}
                    self.wfile.write(json.dumps(response).encode('utf-8'))
                else:
                    self.send_response(404)
                    self._send_cors_headers()
                    self.end_headers()
                    response = {'error': {'message': 'Agent not found', 'type': 'not_found_error'}}
                    self.wfile.write(json.dumps(response).encode('utf-8'))
                return
                
            except Exception as e:
                _log(f"Error in /v1/agents PUT: {e}")
                self.send_response(500)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': str(e), 'type': 'internal_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
        
        # 其他路径返回 404
        self.send_response(404)
        self._send_cors_headers()
        self.end_headers()
        response = {'error': {'message': 'Not found', 'type': 'not_found_error'}}
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def do_DELETE(self):
        """处理 DELETE 请求"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # /v1/agents/{id} 删除 agent
        if path.startswith('/v1/agents/'):
            if not self._check_auth():
                self.send_response(401)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': 'Unauthorized', 'type': 'authentication_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
            
            try:
                agent_id = path.split('/v1/agents/')[-1].split('/')[0]
                success = AgentStorage.delete_agent(agent_id)
                
                if success:
                    self.send_response(200)
                    self._send_cors_headers()
                    self.end_headers()
                    response = {'success': True}
                    self.wfile.write(json.dumps(response).encode('utf-8'))
                else:
                    self.send_response(404)
                    self._send_cors_headers()
                    self.end_headers()
                    response = {'error': {'message': 'Agent not found', 'type': 'not_found_error'}}
                    self.wfile.write(json.dumps(response).encode('utf-8'))
                return
                
            except Exception as e:
                _log(f"Error in /v1/agents DELETE: {e}")
                self.send_response(500)
                self._send_cors_headers()
                self.end_headers()
                response = {'error': {'message': str(e), 'type': 'internal_error'}}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return
        
        # 其他路径返回 404
        self.send_response(404)
        self._send_cors_headers()
        self.end_headers()
        response = {'error': {'message': 'Not found', 'type': 'not_found_error'}}
        self.wfile.write(json.dumps(response).encode('utf-8'))


class AgentStorage:
    """Agent 数据存储"""
    
    _agents_file = None
    
    @classmethod
    def _get_agents_file(cls):
        if cls._agents_file is None:
            from pathlib import Path
            import os
            user_data_dir = Path(os.environ.get('CHERRYSTUDIO_DATA_DIR', Path.home() / '.cherrystudio'))
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
    
    @classmethod
    def list_agents(cls) -> list:
        """列出所有 agents"""
        return cls._load_agents()
    
    @classmethod
    def get_agent(cls, agent_id: str) -> Optional[dict]:
        """获取单个 agent"""
        agents = cls._load_agents()
        for agent in agents:
            if agent.get('id') == agent_id:
                return agent
        return None
    
    @classmethod
    def create_agent(cls, data: dict) -> dict:
        """创建新 agent"""
        import uuid
        from datetime import datetime
        
        agents = cls._load_agents()
        
        now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.000Z')
        
        # 前端期望的 Agent 格式 (AgentEntitySchema)
        agent = {
            'id': data.get('id') or str(uuid.uuid4()),
            'type': data.get('type', 'claude-code'),  # 必须是 'claude-code'
            'name': data.get('name', 'Unnamed Agent'),
            'description': data.get('description', ''),
            'model': data.get('model', ''),  # 必填
            'accessible_paths': data.get('accessible_paths') or data.get('accessible_directories') or ['.'],  # 必填非空
            'instructions': data.get('instructions', ''),
            'plan_model': data.get('plan_model'),
            'small_model': data.get('small_model'),
            'mcps': data.get('mcps', []),
            'allowed_tools': data.get('allowed_tools', []),
            'slash_commands': data.get('slash_commands', []),
            'configuration': data.get('configuration', {}),
            'tools': data.get('tools', []),
            'created_at': now,
            'updated_at': now
        }
        
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
                # 更新字段
                for key in ['name', 'description', 'model', 'instructions', 'tools', 'accessible_directories', 'metadata']:
                    if key in data:
                        agent[key] = data[key]
                agent['updated_at'] = datetime.now().isoformat()
                agents[i] = agent
                cls._save_agents(agents)
                _log(f"Updated agent: {agent_id}")
                return agent
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


class AgentServer:
    """Agent API 服务器"""
    
    def __init__(self, providers_loader=None):
        self.server: Optional[HTTPServer] = None
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
            self.server = HTTPServer((host, port), AgentAPIHandler)
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

