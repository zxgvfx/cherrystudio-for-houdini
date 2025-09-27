"""JavaScript注入脚本模块"""


def get_injection_scripts() -> list:
    """获取所有需要注入的JavaScript脚本"""
    return [
        _get_qwebchannel_script(),
        _get_early_injection_script(),
        _get_inject_after_webchannel_script(),
        _get_electron_api_script(),
        _get_fetch_interception_script(),
        _get_open_website_interception_script()
    ]


def _get_qwebchannel_script() -> str:
    """获取qwebchannel.js脚本"""
    return """
    (function() {
        // 强制注入qwebchannel.js
        if (typeof QWebChannel === 'undefined') {
            const script = document.createElement('script');
            script.src = 'qrc:///qtwebchannel/qwebchannel.js';
            script.onload = function() {
                console.log('[Houdini] QWebChannel loaded');
            };
            script.onerror = function() {
                console.error('[Houdini] Failed to load QWebChannel');
            };
            document.head.appendChild(script);
        }
    })();
    """


def _get_early_injection_script() -> str:
    """获取早期注入脚本"""
    return """
    (function() {
        console.error('[Houdini] Early injection starting...');
        
        // 保存原始fetch
        if (!window.__qt_original_fetch) {
            window.__qt_original_fetch = window.fetch;
        }
        
        // 临时modelList实现
        if (!window.qt) {
            window.qt = {};
        }
        if (!window.qt.network) {
            window.qt.network = {};
        }
        if (!window.qt.network.modelList) {
            window.qt.network.modelList = function(configJson) {
                // 这是一个临时的实现，真正的实现会在WebChannel设置后覆盖
                return Promise.resolve('{"object": "list", "data": []}');
            };
        }
        
        // 创建API对象
        const __api = {};
        
        // 模型列表API
        __api.models = {};
        __api.models.list = async function(config) {
            console.error('[Houdini] 🔍 __api.models.list called:', config?.url || 'no URL');
            
            // 检查是否是Ollama请求
            if (config?.url && (config.url.includes('localhost:11434') || config.url.includes('127.0.0.1:11434'))) {
                console.error('[Houdini] 🦙 Ollama request detected:', config.url);
                const options = {
                    host: config.url.includes('localhost:11434') ? 'http://localhost:11434' : 'http://127.0.0.1:11434'
                };
                const result = await window.qt?.network?.ollamaListModels?.(JSON.stringify(options));
                const parsed = JSON.parse(result ?? '{"object": "list", "data": []}');
                console.error('[Houdini] 🦙 Ollama models:', parsed?.data?.length || 0);
                return parsed;
            }
            
            // 外部模型请求处理
            if (config?.url && !config.url.includes('localhost') && !config.url.includes('127.0.0.1')) {
                console.error('[Houdini] 🔍 External OpenAI service detected:', config.url);
                const modelListConfig = {
                    url: config.url,
                    method: config.method || 'GET',
                    headers: config.headers || {},
                    body: config.body,
                    fallback: { object: 'list', data: [] }
                };
                const modelListResult = await window.qt?.network?.modelList?.(JSON.stringify(modelListConfig));
                const parsedResult = JSON.parse(modelListResult ?? '{"object": "list", "data": []}');
                return parsedResult;
            }
            
            // 默认处理
            return { object: 'list', data: [] };
        };
        
        // 设置window.api
        window.api = __api;
        console.error('[Houdini] ✅ window.api.models.list injected');
        
        // 拦截fetch请求
        window.fetch = async function(url, options = {}) {
            const payload = {
                url: typeof url === 'string' ? url : url.toString(),
                method: options.method || 'GET',
                headers: options.headers || {},
                body: options.body || null
            };
            
            const isLocalhost = payload.url.includes('localhost') || payload.url.includes('127.0.0.1');
            const isModelsList = /\\/(v1\\/models|models|api\\/models)(\\?.*)?$/.test(payload.url);
            
            // 处理外部模型列表请求
            if (!isLocalhost && isModelsList && window.qt?.network?.modelList) {
                console.error('[Houdini] 🔍 Fetch intercepted external models request:', url);
                
                // 检查WebChannel是否就绪
                let raw;
                if (!window.qt?.network?.modelList || window.qt.network.modelList.toString().includes('临时的实现')) {
                    console.error('[Houdini] ⚠️ WebChannel not ready, trying externalModelList method...');
                    
                    // 尝试使用专门的externalModelList方法
                    if (window.qt?.network?.externalModelList) {
                        console.error('[Houdini] 🐍 Using externalModelList method...');
                        try {
                            const externalResult = await window.qt.network.externalModelList(JSON.stringify(payload));
                            console.error('[Houdini] 🐍 externalModelList result:', externalResult);
                            const externalData = JSON.parse(externalResult);
                            console.error('[Houdini] 🐍 externalModelList models count:', externalData?.data?.length || 0);
                            
                            if (externalData?.data?.length > 0) {
                                console.error('[Houdini] ✅ externalModelList success, using result');
                                raw = externalResult;
                            } else {
                                console.error('[Houdini] ⚠️ externalModelList returned empty, trying JavaScript fetch...');
                                throw new Error('externalModelList returned empty list');
                            }
                        } catch (e) {
                            console.error('[Houdini] ⚠️ externalModelList failed:', e.message || e);
                            console.error('[Houdini] 🔄 Falling back to JavaScript fetch...');
                            // 继续到JavaScript fetch逻辑
                        }
                    }
                    
                    // 如果externalModelList不可用或失败，使用JavaScript fetch
                    if (!raw) {
                        console.error('[Houdini] 🛠️ Using direct network request for external models...');
                        try {
                            // Use original fetch to avoid recursion
                            console.error('[Houdini] 🌐 Making direct fetch request to:', payload.url);
                            console.error('[Houdini] 📋 Request headers:', JSON.stringify(payload.headers || {}));
                            console.error('[Houdini] 📋 Request method:', payload.method || 'GET');
                            console.error('[Houdini] 📋 Request body:', payload.body || 'none');
                            
                            const originalFetch = window.__qt_original_fetch || window.fetch; // Use original fetch
                            const directResponse = await originalFetch(payload.url, {
                                method: payload.method || 'GET',
                                headers: payload.headers || {},
                                body: payload.body
                            });
                            
                            if (directResponse.ok) {
                                const directData = await directResponse.json();
                                console.error('[Houdini] ✅ Direct fetch success:', directResponse.status, 'status,', directData?.data?.length || 0, 'models');
                                console.error('[Houdini] 📋 Response headers:', JSON.stringify(Object.fromEntries(directResponse.headers)));
                                console.error('[Houdini] 📄 Response data:', JSON.stringify(directData));
                                raw = JSON.stringify(directData);
                            } else {
                                console.error('[Houdini] ❌ Direct fetch failed:', directResponse.status, directResponse.statusText);
                                const responseText = await directResponse.text();
                                console.error('[Houdini] 📄 Error response:', responseText);
                                const fallbackResponse = { "object": "list", "data": [] };
                                raw = JSON.stringify(fallbackResponse);
                            }
                        } catch (error) {
                            console.error('[Houdini] ❌ Direct fetch error:', error.message || error);
                            const fallbackResponse = { "object": "list", "data": [] };
                            raw = JSON.stringify(fallbackResponse);
                        }
                    }
                } else {
                    console.error('[Houdini] ✅ WebChannel available, calling real modelList...');
                    raw = await window.qt.network.modelList(JSON.stringify(payload));
                    console.error('[Houdini] 📞 window.qt.network.modelList result:', raw);
                }
                
                if (raw) {
                    const text = typeof raw === 'string' ? raw : JSON.stringify(raw ?? { object:'list', data: [] });
                    const parsed = JSON.parse(text);
                    console.error('[Houdini] ✅ Fetch external models success:', parsed?.data?.length || 0, 'models');
                    return new Response(text, { status: 200, headers: { 'content-type': 'application/json' } });
                } else {
                    console.error('[Houdini] ❌ No result from modelList');
                    return new Response('{"object": "list", "data": []}', { status: 200, headers: { 'content-type': 'application/json' } });
                }
            } catch (e) {
                console.error('[Houdini] ❌ Fetch external models error:', e.message || e);
                // ignore and continue
            }
            
            // 默认使用原始fetch
            return window.__qt_original_fetch(url, options);
        };
        
        console.error('[Houdini] ✅ Fetch interception active');
    })();
    """


def _get_inject_after_webchannel_script() -> str:
    """获取WebChannel设置后的注入脚本"""
    return """
    (function() {
        console.error('[Houdini] WebChannel injection starting...');
        
        // 检查modelList状态
        if (window.qt?.network?.modelList) {
            const isTemporary = window.qt.network.modelList.toString().includes('临时的实现');
            if (isTemporary) {
                console.error('[Houdini] ⚠️ modelList is still temporary, WebChannel not ready yet');
            } else {
                console.error('[Houdini] ✅ WebChannel modelList available and ready');
            }
        } else {
            console.error('[Houdini] ❌ WebChannel modelList not available');
        }
        
        // 设置全局qtFetch函数
        window.qtFetch = async function(url, options = {}) {
            if (url.includes('localhost') && window.qt?.network?.fetchProxy) {
                const payload = {
                    url: url,
                    method: options.method || 'GET',
                    headers: options.headers || {},
                    body: options.body || null,
                    timeout: options.timeout || 15000
                };
                
                try {
                    const result = await window.qt.network.fetchProxy(JSON.stringify(payload));
                    const data = JSON.parse(result);
                    return new Response(data.body, {
                        status: data.status,
                        statusText: data.statusText,
                        headers: data.headers
                    });
                } catch (e) {
                    console.error('[Houdini] qtFetch error:', e);
                    return window.__qt_original_fetch(url, options);
                }
            }
            return window.__qt_original_fetch(url, options);
        };
        
        console.error('[Houdini] ✅ qtFetch function set');
    })();
    """


def _get_electron_api_script() -> str:
    """获取Electron API模拟脚本"""
    return """
    (function() {
        console.error('[Houdini] Electron API injection starting...');
        
        // 模拟Electron的ipcRenderer
        window.ipcRenderer = {
            invoke: async function(channel, ...args) {
                console.error('[Houdini] 🔌 ipcRenderer.invoke:', channel);
                try {
                    const result = await window.qt?.electron?.ipcRenderer_invoke?.(channel, ...args);
                    return JSON.parse(result || '{}');
                } catch (e) {
                    console.error('[Houdini] ipcRenderer.invoke error:', e);
                    return {};
                }
            },
            send: function(channel, ...args) {
                console.error('[Houdini] 🔌 ipcRenderer.send:', channel);
                try {
                    window.qt?.electron?.ipcRenderer_send?.(channel, ...args);
                } catch (e) {
                    console.error('[Houdini] ipcRenderer.send error:', e);
                }
            }
        };
        
        // 模拟Electron的app
        window.electronAPI = {
            getVersion: function() {
                return window.qt?.api?.getVersion?.() || "1.0.0";
            },
            getPlatform: function() {
                return window.qt?.api?.getPlatform?.() || "unknown";
            }
        };
        
        console.error('[Houdini] ✅ Electron API injected');
    })();
    """


def _get_fetch_interception_script() -> str:
    """获取fetch拦截脚本"""
    return """
    (function() {
        console.error('[Houdini] Fetch interception setup starting...');
        
        // 设置fetchModels拦截
        if (!window.__houdini_fetchmodels_setup) {
            window.__houdini_fetchmodels_setup = true;
            
            // 拦截fetchModels函数
            const originalFetchModels = window.fetchModels;
            if (originalFetchModels) {
                window.fetchModels = async function(provider) {
                    console.error('[Houdini] 🎯 fetchModels intercepted for provider:', provider);
                    const result = await originalFetchModels.call(this, provider);
                    console.error('[Houdini] 🎯 fetchModels result:', result);
                    return result;
                };
                console.error('[Houdini] ✅ fetchModels interception active');
            }
            
            // 拦截AI.models()函数
            if (window.AI && window.AI.models) {
                const originalModels = window.AI.models;
                window.AI.models = async function() {
                    console.error('[Houdini] 🤖 AI.models() intercepted');
                    const result = await originalModels.call(this);
                    console.error('[Houdini] 🤖 AI.models() result:', result);
                    return result;
                };
                console.error('[Houdini] ✅ AI.models() interception active');
            }
        }
        
        console.error('[Houdini] ✅ Fetch interception setup complete');
    })();
    """


def _get_open_website_interception_script() -> str:
    """获取网站打开拦截脚本"""
    return """
    (function() {
        console.error('[Houdini] Website opening interception starting...');
        
        // 拦截__api.openWebsite
        if (window.__api && !window.__api.openWebsite) {
            window.__api.openWebsite = function(url) {
                console.error('[Houdini] 🌐 __api.openWebsite called:', url);
                if (window.qt?.api?.openWebsite) {
                    window.qt.api.openWebsite(url);
                } else {
                    window.open(url, '_blank');
                }
            };
        }
        
        // 全局点击事件监听器
        document.addEventListener('click', function(event) {
            const target = event.target;
            const isExternalLink = target.tagName === 'A' && (
                target.hasAttribute('data-open-external') ||
                target.getAttribute('target') === '_blank' ||
                target.href.startsWith('http')
            );
            
            const isExternalButton = target.tagName === 'BUTTON' && (
                target.hasAttribute('data-open-external') ||
                target.textContent.includes('API Key') ||
                target.textContent.includes('Get API Key')
            );
            
            if (isExternalLink || isExternalButton) {
                event.preventDefault();
                const url = target.href || target.getAttribute('data-url');
                if (url) {
                    console.error('[Houdini] 🌐 External link clicked:', url);
                    if (window.qt?.api?.openWebsite) {
                        window.qt.api.openWebsite(url);
                    } else {
                        window.open(url, '_blank');
                    }
                }
            }
        });
        
        console.error('[Houdini] ✅ Website opening interception active');
    })();
    """
