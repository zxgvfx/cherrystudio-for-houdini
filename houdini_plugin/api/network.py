"""网络API模块 - 处理网络请求和模型列表"""

import json
from urllib import request as urllib_request, error as urllib_error
from PySide6.QtCore import QObject, Slot

from api.base import BaseAPI


class NetworkAPI(BaseAPI):
    """网络请求API类"""
    
    @Slot(str, result=str)
    def fetchProxy(self, config_json: str) -> str:
        """通用网络请求代理"""
        try:
            config = json.loads(config_json) if config_json else {}
        except Exception:
            return json.dumps({"error": "invalid json"})
        if not isinstance(config, dict):
            return json.dumps({"error": "fetch config must be an object"})
        url = config.get("url")
        if not url:
            return json.dumps({"error": "missing url"})
        self.log(f"🌐 Request: {config.get('method', 'GET')} {url}")
        method = str(config.get("method", "GET")).upper()
        headers = config.get("headers") if isinstance(config.get("headers"), dict) else {}
        data = config.get("body")
        timeout = config.get("timeout")
        if data is not None and not isinstance(data, (str, bytes)):
            data = json.dumps(data)
        if isinstance(data, bytes):
            body_bytes = data
        else:
            body_bytes = data.encode("utf-8") if data is not None else None
        req = urllib_request.Request(url, data=body_bytes, method=method)
        for key, value in headers.items():
            try:
                req.add_header(str(key), str(value))
            except Exception:
                continue
        try:
            with urllib_request.urlopen(req, timeout=float(timeout) if timeout else 15.0) as resp:
                status = getattr(resp, "status", None)
                if status is None:
                    status = resp.getcode()
                reason = getattr(resp, "reason", "")
                resp_headers = {}
                try:
                    resp_headers = dict(resp.getheaders())
                except Exception:
                    pass
                body = resp.read().decode("utf-8", errors="ignore")
                self.log(f"✅ Success {status}: {len(body)} bytes from {url}")
                payload = {
                    "status": status,
                    "statusText": reason or "",
                    "headers": resp_headers,
                    "body": body
                }
                return json.dumps(payload)
        except urllib_error.HTTPError as exc:
            try:
                body = exc.read().decode("utf-8", errors="ignore")
            except Exception:
                body = ""
            self.log(f"❌ HTTP {exc.code} from {url}")
            payload = {
                "status": exc.code,
                "statusText": getattr(exc, "reason", ""),
                "headers": dict(exc.headers.items()) if getattr(exc, "headers", None) else {},
                "body": body,
                "error": str(exc)
            }
            return json.dumps(payload)
        except Exception as exc:
            self.log(f"❌ Error from {url}: {exc}")
            return json.dumps({"error": str(exc)})

    @Slot(str, result=str)
    def externalModelList(self, config_json: str) -> str:
        """专门用于外部模型列表请求的方法，绕过QtWebEngine限制"""
        self.log(f"🌐 externalModelList called with: {config_json!r}")
        try:
            config = json.loads(config_json) if config_json else {}
        except Exception as exc:
            self.log(f"externalModelList config parse error: {exc}")
            config = {}
            
        if not isinstance(config, dict):
            return '{"object": "list", "data": []}'
            
        url = config.get("url")
        if not url:
            fallback = config.get("fallback", {"object": "list", "data": []})
            self.log(f"externalModelList no URL, returning fallback: {fallback}")
            return json.dumps(fallback)

        method = str(config.get("method", "GET")).upper()
        headers = config.get("headers") if isinstance(config.get("headers"), dict) else {}
        body = config.get("body")

        # 规范化 body
        if isinstance(body, dict):
            try:
                body = json.dumps(body)
            except Exception:
                body = None
        body_bytes = body.encode("utf-8") if isinstance(body, str) and body else None

        try:
            self.log(f"externalModelList making request to: {url}")
            self.log(f"externalModelList headers: {headers}")
            
            req = urllib_request.Request(url, data=body_bytes, method=method)
            # 默认头
            req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
            if body_bytes:
                req.add_header('Content-Type', 'application/json')
            # 自定义头
            for key, value in headers.items():
                try:
                    req.add_header(str(key), str(value))
                except Exception as e:
                    self.log(f"externalModelList header error {key}: {e}")
            
            with urllib_request.urlopen(req, timeout=15.0) as resp:
                raw = resp.read().decode('utf-8', errors='ignore')
                self.log(f"externalModelList success {resp.getcode()} -> {url}")
                self.log(f"externalModelList response length: {len(raw)} bytes")
                self.log(f"externalModelList response preview: {raw[:200]}...")
                
                # 尝试解析JSON以验证格式
                try:
                    data = json.loads(raw)
                    if isinstance(data, dict) and 'data' in data:
                        self.log(f"externalModelList parsed {len(data.get('data', []))} models")
                    return raw
                except json.JSONDecodeError as e:
                    self.log(f"externalModelList JSON parse error: {e}")
                    return raw  # 返回原始响应
                    
        except urllib_error.HTTPError as exc:
            try:
                body_txt = exc.read().decode('utf-8', errors='ignore')
            except Exception:
                body_txt = ''
            self.log(f"externalModelList HTTP error {exc.code} -> {url}")
            self.log(f"externalModelList error body: {body_txt}")
            return json.dumps(config.get("fallback", {"object": "list", "data": []}))
        except urllib_error.URLError as exc:
            self.log(f"externalModelList URL error: {exc}")
            return json.dumps(config.get("fallback", {"object": "list", "data": []}))
        except Exception as exc:
            self.log(f"externalModelList failed: {exc}")
            return json.dumps(config.get("fallback", {"object": "list", "data": []}))

    @Slot(str, result=str)
    def ollamaListModels(self, options_json: str) -> str:
        """获取Ollama模型列表"""
        self.log(f"ollamaListModels called with: {options_json!r}")
        host = "http://localhost:11434"
        try:
            options = json.loads(options_json) if options_json else {}
            if isinstance(options, dict) and options.get("host"):
                host = str(options["host"])
        except Exception as exc:
            self.log(f"ollamaListModels options parse error: {exc}")
        
        # 使用 OpenAI 兼容的端点而不是 /api/tags
        url = f"{host.rstrip('/')}/v1/models"
        self.log(f"ollamaListModels requesting OpenAI-compatible endpoint: {url}")
        
        try:
            # 使用更健壮的请求方法
            req = urllib_request.Request(url, method="GET")
            req.add_header('Content-Type', 'application/json')
            req.add_header('User-Agent', 'Cherry Studio for Houdini')
            
            with urllib_request.urlopen(req, timeout=10.0) as resp:
                raw = resp.read().decode("utf-8", errors="ignore")
                self.log(f"ollamaListModels success: {len(raw)} bytes")
                self.log(f"ollamaListModels response: {raw[:200]}...")
                return raw or '{"object": "list", "data": []}'
                
        except urllib_error.HTTPError as exc:
            self.log(f"ollamaListModels HTTP error {exc.code}: {exc}")
            # 如果 /v1/models 失败，回退到 /api/tags 并转换格式
            return self._fallback_to_api_tags(host)
        except urllib_error.URLError as exc:
            self.log(f"ollamaListModels URL error: {exc}")
            return self._fallback_to_api_tags(host)
        except Exception as exc:
            self.log(f"ollamaListModels failed: {exc}")
            return self._fallback_to_api_tags(host)
    
    def _fallback_to_api_tags(self, host: str) -> str:
        """回退到 /api/tags 端点并转换为 OpenAI 兼容格式"""
        self.log(f"Fallback to /api/tags endpoint")
        url = f"{host.rstrip('/')}/api/tags"
        
        try:
            req = urllib_request.Request(url, method="GET")
            req.add_header('Content-Type', 'application/json')
            req.add_header('User-Agent', 'Cherry Studio for Houdini')
            
            with urllib_request.urlopen(req, timeout=10.0) as resp:
                raw = resp.read().decode("utf-8", errors="ignore")
                self.log(f"/api/tags success: {len(raw)} bytes")
                
                # 转换 Ollama /api/tags 格式到 OpenAI /v1/models 格式
                try:
                    ollama_data = json.loads(raw)
                    models = ollama_data.get('models', [])
                    
                    # 转换为 OpenAI 格式
                    openai_models = []
                    for model in models:
                        openai_models.append({
                            "id": model.get("name", "unknown"),
                            "object": "model", 
                            "owned_by": "ollama",
                            "description": model.get("name", "")
                        })
                    
                    result = {
                        "object": "list",
                        "data": openai_models
                    }
                    
                    converted = json.dumps(result)
                    self.log(f"Converted to OpenAI format: {converted[:200]}...")
                    return converted
                    
                except json.JSONDecodeError as e:
                    self.log(f"JSON decode error: {e}")
                    return '{"object": "list", "data": []}'
                    
        except Exception as exc:
            self.log(f"/api/tags fallback failed: {exc}")
            return '{"object": "list", "data": []}'

    @Slot(str, result=str)
    def ollamaPullModel(self, options_json: str) -> str:
        """拉取Ollama模型"""
        host = "http://localhost:11434"
        name = None
        try:
            options = json.loads(options_json) if options_json else {}
            if isinstance(options, dict):
                if options.get("host"):
                    host = str(options["host"])
                if options.get("name"):
                    name = str(options["name"])
        except Exception:
            pass
        if not name:
            return json.dumps({"success": False, "error": "name required"})
        url = f"{host.rstrip('/')}/api/pull"
        body = json.dumps({"name": name})
        try:
            # 这里需要调用简化的fetch方法
            from utils import simple_fetch
            simple_fetch(url, method="POST", data=body, headers={"Content-Type": "application/json"})
            return json.dumps({"success": True})
        except Exception as exc:
            self.log(f"ollamaPullModel failed: {exc}")
            return json.dumps({"success": False, "error": str(exc)})

    @Slot(str, result=str)
    def modelList(self, config_json: str) -> str:
        """获取模型列表，支持多路径回退"""
        self.log(f"🎯 modelList called with: {config_json!r}")
        try:
            config = json.loads(config_json) if config_json else {}
        except Exception as exc:
            self.log(f"modelList config parse error: {exc}")
            config = {}
            
        if not isinstance(config, dict):
            return "[]"
            
        url = config.get("url")
        if not url:
            fallback = config.get("fallback")
            self.log(f"modelList no URL, returning fallback: {fallback}")
            return json.dumps(fallback if fallback is not None else [])

        method = str(config.get("method", "GET")).upper()
        headers = config.get("headers") if isinstance(config.get("headers"), dict) else {}
        body = config.get("body")

        # 规范化 body
        if isinstance(body, dict):
            try:
                body = json.dumps(body)
            except Exception:
                body = None
        body_bytes = body.encode("utf-8") if isinstance(body, str) and body else None

        # 生成候选 URL 列表，自动多路径回退
        def _make_candidates(original_url: str) -> list:
            u = original_url.strip()
            if not u:
                return []
            lowered = u.lower()
            bases = []
            if lowered.endswith("/v1/models"):
                bases.append(u[:-len("/v1/models")])
            elif lowered.endswith("/models"):
                bases.append(u[:-len("/models")])
            elif lowered.endswith("/openai/v1/models"):
                bases.append(u[:-len("/openai/v1/models")])
            else:
                # 不是标准结尾，则直接把整段当作 base
                bases.append(u.rstrip('/'))
            candidates = []
            for base in bases:
                base = base.rstrip('/')
                candidates.append(base + "/v1/models")
                candidates.append(base + "/models")
                candidates.append(base + "/openai/v1/models")
                candidates.append(base + "/api/models")
                candidates.append(base + "/api/v1/models")
                candidates.append(base + "/api/openai/v1/models")
            # 去重保持顺序
            seen = set()
            uniq = []
            for c in candidates:
                if c not in seen:
                    uniq.append(c)
                    seen.add(c)
            return uniq

        candidates = _make_candidates(url)
        self.log(f"modelList original URL: {url}")
        self.log(f"modelList candidates: {candidates}")

        def _try_request(target_url: str):
            try:
                req = urllib_request.Request(target_url, data=body_bytes, method=method)
                # 默认头
                req.add_header('User-Agent', 'Cherry Studio for Houdini')
                if body_bytes:
                    req.add_header('Content-Type', 'application/json')
                # 自定义头
                for key, value in headers.items():
                    try:
                        req.add_header(str(key), str(value))
                    except Exception as e:
                        self.log(f"modelList header error {key}: {e}")
                with urllib_request.urlopen(req, timeout=10.0) as resp:
                    raw = resp.read().decode('utf-8', errors='ignore')
                    self.log(f"modelList success {resp.getcode()} -> {target_url}")
                    return {"ok": True, "body": raw}
            except urllib_error.HTTPError as exc:
                # 401/403 直接返回，提示鉴权问题
                if exc.code in (401, 403):
                    try:
                        body_txt = exc.read().decode('utf-8', errors='ignore')
                    except Exception:
                        body_txt = ''
                    self.log(f"modelList auth error {exc.code} -> {target_url}")
                    return {"ok": True, "body": body_txt or json.dumps(config.get("fallback") or [])}
                # 404 继续尝试下一个候选
                if exc.code == 404:
                    self.log(f"modelList 404 -> {target_url}")
                    return {"ok": False}
                # 其它 HTTP 错误，作为失败但不终止候选流程
                self.log(f"modelList HTTP {exc.code} -> {target_url}")
                return {"ok": False}
            except urllib_error.URLError as exc:
                self.log(f"modelList URL error {exc} -> {target_url}")
                return {"ok": False}

        for candidate in candidates:
            res = _try_request(candidate)
            if res and res.get("ok"):
                body_txt = res.get("body") or ""
                if body_txt:
                    return body_txt
                break

        # 全部候选失败，返回 fallback
        fallback = config.get("fallback")
        return json.dumps(fallback if fallback is not None else [])
