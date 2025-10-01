"""
JavaScript 注入脚本生成器
用于在 WebEngine 中注入 Electron API 桥接代码
"""

def get_electron_api_script(theme: str = 'light') -> str:
    """
    生成主要的 Electron API 注入脚本
    
    Args:
        theme: 主题设置 ('light' 或 'dark')
    
    Returns:
        完整的 JavaScript 代码字符串
    """
    # 注意：这是简化版本，完整版本见 main_old_backup.py 1055-1834 行
    # 包含核心的 QWebChannel 绑定和基础 API 初始化
    
    script = f"""
    //  使用 console.error 因为在 hython 中只有它会输出到终端
    
    // 立即设置环境标记，防止 LoggerService 错误
    window.houdini = true;
    window.isHoudini = true;
    window.__IS_QT = true;
    window.source = 'qt';
    window.__WINDOW_SOURCE = 'qt';
    window.__LOGGER_SOURCE = 'qt';
    window.__WINDOW_SOURCE_INITIALIZED = true;
    
    // 在 hython 环境中手动持久化 localStorage
    (function() {{
        // 定期保存 localStorage 到文件系统
        let lastSaved = {{}};
        
        function saveLocalStorage() {{
            try {{
                const data = {{}};
                for (let i = 0; i < localStorage.length; i++) {{
                    const key = localStorage.key(i);
                    if (key) {{
                        data[key] = localStorage.getItem(key);
                    }}
                }}
                
                const dataStr = JSON.stringify(data);
                // 使用简单的字符串长度作为哈希，避免 btoa 的编码问题
                const currentHash = dataStr.length + '_' + (dataStr.charCodeAt(0) || 0);
                
                // 只有数据变化时才保存
                if (lastSaved.hash !== currentHash) {{
                    lastSaved.hash = currentHash;
                    lastSaved.time = Date.now();
                    
                    // 保存到文件
                    if (window.qt && window.qt.api && window.qt.api.fileWrite) {{
                        window.qt.api.fileWrite('localStorage.json', dataStr).then(function() {{
                            console.error('[Houdini] ✅ localStorage saved');
                        }});
                    }}
                }}
            }} catch(e) {{
                console.error('[Houdini] ❌ Save localStorage error:', e.message || e);
            }}
        }}
        
        function loadLocalStorage() {{
            try {{
                if (window.qt && window.qt.api && window.qt.api.fileRead) {{
                    console.error('[Houdini] 📥 Loading localStorage from file...');
                    window.qt.api.fileRead('localStorage.json').then(function(content) {{
                        if (content) {{
                            try {{
                                const data = JSON.parse(content);
                                let count = 0;
                                for (const key in data) {{
                                    localStorage.setItem(key, data[key]);
                                    count++;
                                }}
                                console.error('[Houdini] ✅ localStorage restored:', count, 'items');
                            }} catch(parseError) {{
                                console.error('[Houdini] ❌ Parse error:', parseError.message);
                            }}
                        }} else {{
                            console.error('[Houdini] ⚠️ localStorage.json is empty');
                        }}
                    }}).catch(function(e) {{
                        console.error('[Houdini] ❌ Load error:', e.message || e);
                    }});
                }} else {{
                    console.error('[Houdini] ⚠️ Qt API not ready for loading localStorage');
                }}
            }} catch(e) {{
                console.error('[Houdini] ❌ Load localStorage error:', e.message || e);
            }}
        }}
        
        // localStorage 已在早期脚本中恢复，这里不再需要加载
        
        // 定期保存（每5秒检查一次）
        setInterval(saveLocalStorage, 5000);
        
        // 页面卸载时保存
        window.addEventListener('beforeunload', saveLocalStorage);
    }})();
    
    
    // 设置主题
    try {{
        var theme = '{theme}';
        localStorage.setItem('settings.theme', theme);
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('theme-mode', theme);
        if (document.body) {{
            document.body.setAttribute('theme-mode', theme);
        }}
    }} catch (e) {{}}
    
    
    // 确保 QWebChannel 可用并绑定到 window.qt.api
    (function(){{
        try {{
            // 若页面中未加载 qwebchannel.js，则从 Qt 资源加载
            if (typeof QWebChannel === 'undefined') {{
                var s = document.createElement('script');
                s.src = 'qrc:///qtwebchannel/qwebchannel.js';
                if (document.head) {{
                    document.head.appendChild(s);
                }}
            }}
            
            // 轮询等待 QWebChannel 与 qt.webChannelTransport
            var tries = 0;
            var bindChannel = function(){{
                tries++;
                if (typeof QWebChannel === 'function' && window.qt && window.qt.webChannelTransport) {{
                    try {{
                        new QWebChannel(window.qt.webChannelTransport, function(channel){{
                            window.qt = window.qt || {{}};
                            window.qt.api = channel.objects.api || window.qt.api || {{}};
                            window.qt.network = channel.objects.network || window.qt.network || channel.objects.api || {{}};
                            window.qt.electron = channel.objects.electron || window.qt.electron || {{}};
                        }});
                        return;
                    }} catch(e) {{ }}
                }}
                if (tries < 200) {{ setTimeout(bindChannel, 50); }}
            }};
            
            // 若 qt 未定义，创建空对象占位
            window.qt = window.qt || {{}};
            bindChannel();
        }} catch(e) {{ }}
    }})();
    
    // 注入基础 window.api
    if (!window.api) {{
        window.api = {{
            getDiskInfo: async (p) => {{ 
                try {{ 
                    return JSON.parse(await window.qt?.api?.getDiskInfo(p)) 
                }} catch(e) {{ 
                    return {{ total: 0, free: 0 }} 
                }} 
            }},
            getAppInfo: async () => {{ 
                try {{ 
                    return JSON.parse(await window.qt?.api?.getAppInfo()) 
                }} catch(e) {{ 
                    return {{ version: '1.0.0', platform: 'win32', arch: 'x64' }} 
                }} 
            }},
            setLanguage: (lang) => {{
                try {{
                    localStorage.setItem('language', lang);
                }} catch(e) {{}}
            }},
            trace: {{
                saveData: async (topicId) => {{ return true; }},
                getData: async (topicId, traceId, modelName) => {{ return null; }},
                saveEntity: async (entity) => {{ return true; }},
                updateTokenUsage: async (traceId, tokenUsage) => {{}},
                tokenUsage: async (spanId, tokenUsage) => {{}},
                addStreamMessage: async (spanId, modelName, context, chunk) => {{}},
                endSpan: async (spanId, output, context) => {{}},
                cleanHistory: async (topicId, traceId, modelName) => {{}},
                cleanTopic: async (topicId, traceId) => {{}},
                openWindow: async (topicId, traceId, autoOpen, modelName) => {{}},
                setTraceWindowTitle: async (title) => {{}},
                addEndMessage: async (spanId, modelName, context) => {{}},
                bindTopic: async (topicId, traceId) => {{}}
            }},
            cherryai: {{
                generateSignature: async (params) => {{
                    // CherryAI 签名功能占位
                    return '';
                }}
            }},
            file: {{
                read: async (fileId, detectEncoding) => {{
                    try {{
                        const content = await window.qt?.api?.fileRead?.(fileId);
                        return content || '';
                    }} catch(e) {{
                        return '';
                    }}
                }},
                write: async (filePath, data) => {{
                    try {{
                        const content = typeof data === 'string' ? data : new TextDecoder().decode(data);
                        return await window.qt?.api?.fileWrite?.(filePath, content);
                    }} catch(e) {{
                        return false;
                    }}
                }},
                writeWithId: async (id, content) => {{
                    try {{
                        return await window.qt?.api?.fileWriteWithId?.(id, content);
                    }} catch(e) {{
                        return false;
                    }}
                }},
                base64Image: async (fileId) => {{
                    try {{
                        const result = await window.qt?.api?.binaryImage?.(fileId);
                        const parsed = JSON.parse(result || '{{}}');
                        return {{
                            mime: parsed.mime || 'image/png',
                            base64: parsed.base64 || '',
                            data: parsed.data || ''
                        }};
                    }} catch(e) {{
                        return {{ mime: 'image/png', base64: '', data: '' }};
                    }}
                }},
                getPathForFile: (file) => {{
                    try {{
                        return file.path || '';
                    }} catch(e) {{
                        return '';
                    }}
                }},
                get: async (filePath) => {{
                    // 简化实现：返回基本文件元数据
                    try {{
                        return {{
                            id: filePath,
                            name: filePath.split(/[\\/]/).pop() || '',
                            path: filePath,
                            size: 0,
                            type: 'file'
                        }};
                    }} catch(e) {{
                        return null;
                    }}
                }}
            }},
            logToMain: (s,l,m,d) => {{ 
                try {{ 
                    window.qt?.api?.logToMain(s,l,m,d||"") 
                }} catch(e) {{}} 
            }},
            setTheme: (theme) => {{ 
                try {{ 
                    window.qt?.api?.setTheme(theme) 
                }} catch(e) {{}} 
            }},
            isFullScreen: async () => {{ 
                try {{ 
                    return await window.qt?.api?.isFullScreen() 
                }} catch(e) {{ 
                    return false 
                }} 
            }},
            getPath: async (name) => {{ 
                try {{ 
                    return await window.qt?.api?.getPath?.(name) 
                }} catch(e) {{ 
                    return '' 
                }} 
            }},
            getLocale: async () => {{ 
                try {{ 
                    return await window.qt?.api?.getLocale?.() 
                }} catch(e) {{ 
                    return 'zh-CN' 
                }} 
            }},
            getTheme: async () => {{ 
                try {{ 
                    return await window.qt?.api?.getTheme?.() 
                }} catch(e) {{ 
                    return 'light' 
                }} 
            }},
            getSystemFonts: async () => {{ 
                try {{ 
                    const r = await window.qt?.api?.getSystemFonts?.(); 
                    return (typeof r==='string')? JSON.parse(r): (r||[]) 
                }} catch(e) {{ 
                    return ["Microsoft YaHei","SimHei","SimSun","Consolas","Arial"] 
                }} 
            }},
            openWebsite: async (url) => {{ 
                try {{ 
                    await window.qt?.api?.openWebsite?.(url) 
                }} catch(e) {{}} 
            }},
            isBinaryExist: async (binary) => {{ 
                try {{ 
                    return await window.qt?.api?.isBinaryExist?.(binary) 
                }} catch(e) {{ 
                    return false 
                }} 
            }},
            getDataPathFromArgs: async () => {{ 
                try {{ 
                    return await window.qt?.api?.getDataPathFromArgs?.() 
                }} catch(e) {{ 
                    return '' 
                }} 
            }},
            isMaximized: async () => {{ 
                try {{ 
                    return await window.qt?.api?.isMaximized?.() 
                }} catch(e) {{ 
                    return false 
                }} 
            }},
            clearCache: async () => {{ 
                try {{ 
                    return await window.qt?.api?.clearCache?.() 
                }} catch(e) {{ 
                    return true 
                }} 
            }},
            getCacheSize: async () => {{ 
                try {{ 
                    const r = await window.qt?.api?.getCacheSize?.();
                    return (typeof r==='string')? JSON.parse(r): (r||{{ size: 0, count: 0 }})
                }} catch(e) {{ 
                    return {{ size: 0, count: 0 }} 
                }} 
            }},
            getAppVersion: async () => {{ 
                try {{ 
                    return await window.qt?.api?.getAppVersion?.() 
                }} catch(e) {{ 
                    return '1.0.0' 
                }} 
            }},
            setProxy: async (config) => {{ 
                try {{ 
                    return await window.qt?.api?.setProxy?.(config) 
                }} catch(e) {{ 
                    return true 
                }} 
            }},
            getPlatform: async () => {{ 
                try {{ 
                    return await window.qt?.api?.getPlatform?.() 
                }} catch(e) {{ 
                    return 'win32' 
                }} 
            }},
            getArch: async () => {{ 
                try {{ 
                    return await window.qt?.api?.getArch?.() 
                }} catch(e) {{ 
                    return 'x64' 
                }} 
            }},
            reload: () => {{ 
                try {{ 
                    location.reload() 
                }} catch(e) {{}} 
            }},
            handleZoomFactor: async (delta, reset) => {{
                const change = typeof delta === 'number' ? delta : 0;
                const doReset = typeof reset === 'boolean' ? reset : false;
                try {{
                    const result = await window.qt?.api?.handleZoomFactor?.(change, doReset);
                    if (typeof result === 'string') {{
                        return JSON.parse(result);
                    }}
                    return result ?? 1.0;
                }} catch (e) {{
                    console.error('[Houdini] handleZoomFactor error:', e);
                    return 1.0;
                }}
            }}
        }};
    }}
    
    // 提供 window.api.window 和 windowControls
    window.api.window = window.api.window || {{
        setMinimumSize: async (w, h) => {{ try {{ await window.qt?.api?.setMinimumSize?.(w, h) }} catch(e) {{}} }},
        resetMinimumSize: async () => {{ try {{ await window.qt?.api?.resetMinimumSize?.() }} catch(e) {{}} }},
        isMaximized: async () => {{ try {{ return await window.qt?.api?.isMaximized?.() }} catch(e) {{ return false }} }},
        maximize: async () => {{ try {{ await window.qt?.api?.maximize?.() }} catch(e) {{}} }},
        unmaximize: async () => {{ try {{ await window.qt?.api?.unmaximize?.() }} catch(e) {{}} }},
        minimize: async () => {{ try {{ await window.qt?.api?.minimize?.() }} catch(e) {{}} }},
        close: async () => {{ try {{ await window.qt?.api?.closeWindow?.() }} catch(e) {{}} }}
    }};
    
    window.api.windowControls = window.api.windowControls || {{
        minimize: async () => {{ try {{ await window.qt?.api?.minimize?.() }} catch(e) {{}} }},
        maximize: async () => {{ try {{ await window.qt?.api?.maximize?.() }} catch(e) {{}} }},
        unmaximize: async () => {{ try {{ await window.qt?.api?.restore?.() }} catch(e) {{}} }},
        close: async () => {{ try {{}} catch(e) {{}} }},
        isMaximized: async () => {{ try {{ return await window.qt?.api?.isMaximized?.() }} catch(e) {{ return false }} }},
        onMaximizedChange: (callback) => {{ return function(){{}} }},
        setMinimumSize: async (w, h) => {{ try {{ await window.qt?.api?.setMinimumSize?.(w, h) }} catch(e) {{}} }}
    }};
    
    // 顶层别名 windowControls
    if (!('windowControls' in window)) {{
        Object.defineProperty(window, 'windowControls', {{
            configurable: false,
            enumerable: false,
            get: function() {{ return window.api && window.api.windowControls ? window.api.windowControls : undefined }},
            set: function(_v) {{ /* ignore */ }}
        }});
    }}
    
    // 提供 window.api.file 接口
    window.api.file = window.api.file || {{
        isTextFile: async function(filePath) {{ 
            try {{ 
                return await window.qt?.api?.isTextFile?.(filePath) 
            }} catch(e) {{ 
                return false 
            }} 
        }},
        select: async function(options) {{ 
            try {{ 
                const result = await window.qt?.api?.fileSelect?.(JSON.stringify(options||{{}}))
                return (typeof result==='string')? JSON.parse(result): (result||[])
            }} catch(e) {{ 
                return [] 
            }} 
        }},
        binaryImage: async function(fileId) {{ 
            try {{ 
                const r = await window.qt?.api?.binaryImage?.(fileId)
                return (typeof r==='string')? JSON.parse(r): (r||null)
            }} catch(e) {{ 
                return null 
            }} 
        }}
    }};
    
    // 提供 window.api.ollama 快捷接口（兼容 Cherry Studio）
    window.api.ollama = window.api.ollama || {{
        list: async function(options) {{
            console.log('[Houdini] window.api.ollama.list called');
            try {{
                const r = await window.qt?.api?.ollamaListModels?.(JSON.stringify(options||{{}}));
                return (typeof r==='string')? JSON.parse(r): (r||{{object: 'list', data: []}});
            }} catch(e) {{
                console.error('[Houdini] ollama.list error:', e);
                return {{ object: 'list', data: [] }};
            }}
        }},
        listModels: async function(options) {{
            console.log('[Houdini] window.api.ollama.listModels called');
            return window.api.ollama.list(options);
        }}
    }};
    
    // 提供 window.api.network 接口
    window.api.network = window.api.network || {{
        fetchProxy: async function(config) {{ 
            try {{ 
                const r = await window.qt?.api?.fetchProxy?.(JSON.stringify(config||{{}}))
                return (typeof r==='string')? JSON.parse(r): (r||{{error: 'Network error'}})
            }} catch(e) {{ 
                return {{ error: String(e) }} 
            }} 
        }},
        ollamaListModels: async function(options) {{ 
            try {{ 
                console.log('[Houdini] ollamaListModels called with:', options);
                if (!window.qt?.api?.ollamaListModels) {{
                    console.error('[Houdini] window.qt.api.ollamaListModels not available');
                    return {{object: 'list', data: []}};
                }}
                const r = await window.qt.api.ollamaListModels(JSON.stringify(options||{{}}));
                console.log('[Houdini] ollamaListModels raw response:', r);
                const parsed = (typeof r==='string')? JSON.parse(r): (r||{{object: 'list', data: []}});
                console.log('[Houdini] ollamaListModels parsed:', parsed);
                return parsed;
            }} catch(e) {{ 
                console.error('[Houdini] ollamaListModels error:', e);
                return {{ object: 'list', data: [] }} 
            }} 
        }},
        ollamaPullModel: async function(options) {{ 
            try {{ 
                const r = await window.qt?.api?.ollamaPullModel?.(JSON.stringify(options||{{}}))
                return (typeof r==='string')? JSON.parse(r): (r||{{success: false, error: 'Pull failed'}})
            }} catch(e) {{ 
                return {{ success: false, error: String(e) }} 
            }} 
        }},
        modelList: async function(config) {{ 
            try {{ 
                const r = await window.qt?.api?.modelList?.(JSON.stringify(config||{{}}))
                return (typeof r==='string')? JSON.parse(r): (r||{{object: 'list', data: []}})
            }} catch(e) {{ 
                return {{ object: 'list', data: [] }} 
            }} 
        }}
    }};
    
    // 兼容 window.qt.network.fetchProxy - 支持流式响应
    window.qt = window.qt || {{}};
    window.qt.network = window.qt.network || {{}};
    if (!window.qt.network.fetchProxy) {{
        window.qt.network.fetchProxy = async function(configJson){{
            try {{
                console.log('[Houdini] 🔵 qt.network.fetchProxy called');
                const config = typeof configJson === 'string' ? JSON.parse(configJson) : configJson;
                console.log('[Houdini] 🔵 Config:', config);
                
                // 检测是否需要流式响应
                let requestBody;
                try {{
                    requestBody = config.body ? (typeof config.body === 'string' ? JSON.parse(config.body) : config.body) : {{}};
                }} catch(e) {{
                    requestBody = {{}};
                }}
                const isStream = requestBody.stream === true;
                console.log('[Houdini] 🔵 isStream:', isStream, 'requestBody.stream:', requestBody.stream);
                
                if (isStream) {{
                    // 返回流式响应（模拟 SSE 格式）
                    const requestId = 'stream_' + Date.now() + '_' + Math.random();
                    config.stream = true;
                    config.requestId = requestId;
                    
                    console.log('[Houdini] 🔵 Creating stream response for:', requestId);
                    
                    // 等待 qt.api 就绪
                    let retries = 0;
                    while (!window.qt?.api?.fetchProxy && retries < 100) {{
                        await new Promise(r => setTimeout(r, 50));
                        retries++;
                    }}
                    
                    if (!window.qt?.api?.fetchProxy) {{
                        console.error('[Houdini] ❌ qt.api.fetchProxy not available');
                        return JSON.stringify({{error: 'QWebChannel not ready'}});
                    }}
                    
                    // 创建一个 Promise，它会在流完成时 resolve
                    return new Promise((resolve, reject) => {{
                        let chunks = [];
                        let headers = {{}};
                        let status = 200;
                        
                        // 注册流处理器
                        window.__streamHandlers = window.__streamHandlers || {{}};
                        window.__streamHandlers[requestId] = {{
                            onChunk: (chunk) => {{
                                console.log('[Houdini] 🔵 Received chunk:', chunk.length, 'bytes');
                                if (chunk.startsWith('__HEADERS__:')) {{
                                    const headerInfo = JSON.parse(chunk.substring(12));
                                    headers = headerInfo.headers || {{}};
                                    status = headerInfo.status || 200;
                                }} else {{
                                    chunks.push(chunk);
                                }}
                            }},
                            onEnd: () => {{
                                console.log('[Houdini] 🔵 Stream ended, total chunks:', chunks.length);
                                const fullBody = chunks.join('');
                                resolve(JSON.stringify({{
                                    status: status,
                                    statusText: 'OK',
                                    headers: headers,
                                    body: fullBody
                                }}));
                            }},
                            onError: (error) => {{
                                console.error('[Houdini] 🔵 Stream error:', error);
                                reject(new Error(error));
                            }}
                        }};
                        
                        // 启动流式请求
                        window.qt.api.fetchProxy(JSON.stringify(config)).then(result => {{
                            console.log('[Houdini] 🔵 Stream started:', result);
                        }}).catch(reject);
                    }});
                }}
                
                // 非流式请求
                return await window.qt?.api?.fetchProxy?.(configJson) 
            }} catch(e){{ 
                console.error('[Houdini] ❌ qt.network.fetchProxy error:', e);
                return JSON.stringify({{ error: String(e) }}) 
            }}
        }};
    }}
    
    // 确保 window.electron.ipcRenderer 存在（防止前端报错）
    window.electron = window.electron || {{}};
    window.electron.ipcRenderer = window.electron.ipcRenderer || {{}};
    if (typeof window.electron.ipcRenderer.invoke !== 'function') {{
        window.electron.ipcRenderer.invoke = async function() {{ return null }};
    }}
    if (typeof window.electron.ipcRenderer.send !== 'function') {{
        window.electron.ipcRenderer.send = function(){{}};
    }}
    if (typeof window.electron.ipcRenderer.on !== 'function') {{
        window.electron.ipcRenderer.on = function() {{ return function(){{}} }};
    }}
    if (typeof window.electron.ipcRenderer.removeListener !== 'function') {{
        window.electron.ipcRenderer.removeListener = function(){{}};
    }}
    if (typeof window.electron.ipcRenderer.removeAllListeners !== 'function') {{
        window.electron.ipcRenderer.removeAllListeners = function(){{}};
    }}
    
    // 确保 window.electron.remote.getCurrentWindow 存在
    window.electron.remote = window.electron.remote || {{}};
    if (typeof window.electron.remote.getCurrentWindow !== 'function') {{
        window.electron.remote.getCurrentWindow = function() {{
            return {{
                isMaximized: function() {{ return false }},
                maximize: function() {{}},
                restore: function() {{}},
                minimize: function() {{}},
                on: function() {{ return function(){{}} }},
                removeListener: function() {{}}
            }};
        }};
    }}
    if (typeof window.electron.getCurrentWindow !== 'function') {{
        window.electron.getCurrentWindow = function() {{
            return window.electron.remote.getCurrentWindow();
        }};
    }}
    
    // 全局监控：拦截所有可能的 API 调用
    console.log('[Houdini] 🔍 Monitoring all window.api calls...');
    setTimeout(function() {{
        if (window.api) {{
            ['fetch', 'fetchProxy', 'post', 'get', 'request'].forEach(function(method) {{
                if (window.api[method]) {{
                    const original = window.api[method];
                    window.api[method] = function(...args) {{
                        console.log('[Houdini] 🔍 window.api.' + method + ' called:', args[0]);
                        return original.apply(this, args);
                    }};
                }}
            }});
            console.log('[Houdini] 🔍 window.api monitor installed');
        }}
        
        if (window.qt && window.qt.api) {{
            const originalFetchProxy = window.qt.api.fetchProxy;
            if (originalFetchProxy) {{
                window.qt.api.fetchProxy = function(...args) {{
                    console.log('[Houdini] 🔍 window.qt.api.fetchProxy called:', args[0]);
                    return originalFetchProxy.apply(this, args);
                }};
                console.log('[Houdini] 🔍 window.qt.api.fetchProxy monitor installed');
            }}
        }}
        
        if (window.qt && window.qt.network) {{
            const originalNetworkProxy = window.qt.network.fetchProxy;
            if (originalNetworkProxy) {{
                window.qt.network.fetchProxy = function(...args) {{
                    console.log('[Houdini] 🔍 window.qt.network.fetchProxy called:', args[0]);
                    return originalNetworkProxy.apply(this, args);
                }};
                console.log('[Houdini] 🔍 window.qt.network.fetchProxy monitor installed');
            }}
        }}
    }}, 100);
    
    console.log('[Houdini] Electron API 注入完成');
    """
    
    return script


def get_early_logger_fix_script() -> str:
    """
    获取早期 LoggerService 修复脚本
    在页面最早阶段注入，确保 window.source 等变量正确设置
    
    Returns:
        JavaScript 代码字符串
    """
    return """
    // 最早期的 LoggerService 修复 - 必须在页面加载的最早期执行
    (function() {
        // 立即设置，防止任何早期代码访问时未定义
        if (!window.source) { window.source = 'qt'; }
        if (!window.__WINDOW_SOURCE) { window.__WINDOW_SOURCE = 'qt'; }
        if (!window.__LOGGER_SOURCE) { window.__LOGGER_SOURCE = 'qt'; }
        if (!window.__WINDOW_SOURCE_INITIALIZED) { window.__WINDOW_SOURCE_INITIALIZED = true; }
        
        window.houdini = true;
        window.isHoudini = true;
        window.__IS_QT = true;
        
        // 延迟所有脚本执行，直到 localStorage 恢复完成
        // 通过劫持 document.readyState 来阻止 React 初始化
        window.__localStorageReady = false;
        window.__pendingScripts = [];
        
        // 立即开始加载 localStorage
        function restoreLocalStorage() {
            if (window.qt && window.qt.api && window.qt.api.fileRead) {
                window.qt.api.fileRead('localStorage.json').then(function(content) {
                    if (content) {
                        try {
                            const data = JSON.parse(content);
                            for (const key in data) {
                                localStorage.setItem(key, data[key]);
                            }
                            console.error('[Houdini] 🎯 localStorage restored BEFORE app init:', Object.keys(data).length, 'items');
                            window.__localStorageReady = true;
                            // 触发 DOMContentLoaded 让应用继续初始化
                            document.dispatchEvent(new Event('DOMContentLoaded'));
                        } catch(e) {
                            console.error('[Houdini] Restore error:', e.message);
                            window.__localStorageReady = true;
                        }
                    } else {
                        console.error('[Houdini] No localStorage file found');
                        window.__localStorageReady = true;
                    }
                }).catch(function(e) {
                    console.error('[Houdini] FileRead error:', e.message || e);
                    window.__localStorageReady = true;
                });
            } else {
                // QWebChannel 还没准备好，100ms 后重试
                setTimeout(restoreLocalStorage, 100);
            }
        }
        
        // 立即开始尝试恢复
        restoreLocalStorage();
        
        // IndexedDB 手动持久化机制
        setTimeout(function() {
            if ('indexedDB' in window) {
                if (!window.indexedDB) {
                    return;
                }
                
                // 导出 IndexedDB 到文件
                window.__exportIndexedDB = function() {
                    const openRequest = window.indexedDB.open('CherryStudio');
                    openRequest.onsuccess = function(event) {
                        const db = event.target.result;
                        const storeNames = Array.from(db.objectStoreNames);
                        
                        const exportData = { version: db.version, stores: {} };
                        const tx = db.transaction(storeNames, 'readonly');
                        let completed = 0;
                        
                        storeNames.forEach(function(storeName) {
                            const store = tx.objectStore(storeName);
                            const getAllRequest = store.getAll();
                            
                            getAllRequest.onsuccess = function() {
                                exportData.stores[storeName] = getAllRequest.result;
                                completed++;
                                
                                if (completed === storeNames.length) {
                                    const jsonData = JSON.stringify(exportData);
                                    if (window.qt && window.qt.api && window.qt.api.fileWrite) {
                                        window.qt.api.fileWrite('indexedDB.json', jsonData);
                                    }
                                }
                            };
                        });
                        
                        db.close();
                    };
                };
                
                // 导入 IndexedDB 从文件
                window.__importIndexedDB = function() {
                    if (!window.qt || !window.qt.api || !window.qt.api.fileRead) {
                        return;
                    }
                    
                    window.qt.api.fileRead('indexedDB.json').then(function(content) {
                        if (!content) {
                            return;
                        }
                        
                        try {
                            const exportData = JSON.parse(content);
                            
                            const openRequest = window.indexedDB.open('CherryStudio', exportData.version);
                            openRequest.onsuccess = function(event) {
                                const db = event.target.result;
                                const storeNames = Object.keys(exportData.stores);
                                
                                if (storeNames.length === 0) {
                                    db.close();
                                    return;
                                }
                                
                                const tx = db.transaction(storeNames, 'readwrite');
                                
                                storeNames.forEach(function(storeName) {
                                    const store = tx.objectStore(storeName);
                                    const data = exportData.stores[storeName];
                                    
                                    store.clear();
                                    
                                    data.forEach(function(item) {
                                        store.add(item);
                                    });
                                });
                                
                                tx.oncomplete = function() {
                                    db.close();
                                };
                            };
                        } catch(e) {
                            // Silently fail
                        }
                    });
                };
                
                // 延迟导入,等待 Dexie 初始化完成
                setTimeout(function() {
                    window.__importIndexedDB();
                }, 5000);
                
                // 每30秒自动导出
                setInterval(window.__exportIndexedDB, 30000);
                
                // 页面关闭前导出
                window.addEventListener('beforeunload', window.__exportIndexedDB);
                
                // 监听 IndexedDB 变化,立即导出
                let exportTimeout = null;
                const scheduleExport = function() {
                    if (exportTimeout) clearTimeout(exportTimeout);
                    exportTimeout = setTimeout(window.__exportIndexedDB, 2000);
                };
                
                // 监听可能触发数据变化的事件
                document.addEventListener('visibilitychange', function() {
                    if (document.hidden) {
                        if (exportTimeout) clearTimeout(exportTimeout);
                        window.__exportIndexedDB();
                    }
                });
                
                // 拦截 IndexedDB 写入操作
                if (window.IDBObjectStore) {
                    const originalAdd = IDBObjectStore.prototype.add;
                    const originalPut = IDBObjectStore.prototype.put;
                    const originalDelete = IDBObjectStore.prototype.delete;
                    
                    IDBObjectStore.prototype.add = function() {
                        scheduleExport();
                        return originalAdd.apply(this, arguments);
                    };
                    
                    IDBObjectStore.prototype.put = function() {
                        scheduleExport();
                        return originalPut.apply(this, arguments);
                    };
                    
                    IDBObjectStore.prototype.delete = function() {
                        scheduleExport();
                        return originalDelete.apply(this, arguments);
                    };
                }
            }
        }, 3000);
        
        // Keepalive interval
        
        // 持续保活这些值，防止被其他代码覆盖
        if (!window.__source_keepalive) {
            window.__source_keepalive = setInterval(function() {
                try {
                    if (!window.source || window.source !== 'qt') window.source = 'qt';
                    if (!window.__WINDOW_SOURCE || window.__WINDOW_SOURCE !== 'qt') window.__WINDOW_SOURCE = 'qt';
                    if (!window.__LOGGER_SOURCE || window.__LOGGER_SOURCE !== 'qt') window.__LOGGER_SOURCE = 'qt';
                    if (!window.__WINDOW_SOURCE_INITIALIZED) window.__WINDOW_SOURCE_INITIALIZED = true;
                } catch(e) {}
            }, 100);
        }
        
        console.log('[Houdini] 早期LoggerService修复完成 - source:', window.source, '__WINDOW_SOURCE:', window.__WINDOW_SOURCE);
    })();
    """


def get_post_load_fix_script() -> str:
    """
    获取页面加载完成后的修复脚本
    在页面加载完成后再次确保环境变量正确，并安装 fetch 拦截器
    
    Returns:
        JavaScript 代码字符串
    """
    return """
    console.log('[Houdini] 🚀 POST-LOAD SCRIPT EXECUTING!');
    
    // 强制修复 LoggerService
    window.source = 'qt';
    window.__WINDOW_SOURCE = 'qt';
    window.__LOGGER_SOURCE = 'qt';
    window.__WINDOW_SOURCE_INITIALIZED = true;
    window.houdini = true;
    window.isHoudini = true;
    window.__IS_QT = true;
    
    console.log('[Houdini] LoggerService修复完成');
    
    // 延迟安装 fetch 拦截器，确保 QWebChannel 已完全就绪
    setTimeout(function() {
        if (window.__fetchInterceptorInstalled) {
            console.log('[Houdini] fetch interceptor already installed');
            return;
        }
        
        console.log('[Houdini] 🚀 Installing network interceptors...');
        
        // 拦截 XMLHttpRequest
        const OriginalXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            const xhr = new OriginalXHR();
            const originalOpen = xhr.open;
            const originalSend = xhr.send;
            
            let requestUrl = '';
            let requestMethod = '';
            let requestBody = null;
            
            xhr.open = function(method, url, ...args) {
                requestUrl = url;
                requestMethod = method;
                console.log('[Houdini] 📡 XHR intercepted:', method, url);
                return originalOpen.apply(this, [method, url, ...args]);
            };
            
            xhr.send = function(body) {
                requestBody = body;
                console.log('[Houdini] 📡 XHR send, body:', body ? body.substring(0, 200) : 'empty');
                return originalSend.apply(this, arguments);
            };
            
            return xhr;
        };
        console.log('[Houdini] ✅ XMLHttpRequest interceptor installed');
        
        const originalFetch = window.fetch;
        window.fetch = async function(input, init) {
            try {
                const url = typeof input === 'string' ? input : input.url;
                const request = input instanceof Request ? input : new Request(input, init);
                
                // 检测是否是 HTTP/HTTPS 请求（需要代理）
                if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                    console.log('[Houdini] Intercepted HTTP request:', url);
                    
                    // 等待 QWebChannel 就绪
                    let retries = 0;
                    while (!window.qt?.api?.fetchProxy && retries < 100) {
                        await new Promise(r => setTimeout(r, 50));
                        retries++;
                    }
                    
                    if (window.qt?.api?.fetchProxy) {
                        try {
                            console.log('[Houdini] Using Python fetchProxy for:', url);
                            
                            // 收集请求头
                            const headers = {};
                            try {
                                request.headers.forEach((value, key) => {
                                    headers[key] = value;
                                });
                            } catch(e) {}
                            
                            // 获取请求体
                            let body;
                            const method = request.method || 'GET';
                            if (!['GET', 'HEAD'].includes(method.toUpperCase())) {
                                try {
                                    body = await request.clone().text();
                                } catch(e) {
                                    if (init && typeof init.body === 'string') {
                                        body = init.body;
                                    }
                                }
                            }
                            
                            // 检测是否需要流式响应
                            let requestBody;
                            try {
                                requestBody = body ? JSON.parse(body) : {};
                            } catch(e) {
                                requestBody = {};
                            }
                            const isStream = requestBody.stream === true;
                            
                            console.log('[Houdini] 🔍 Request body:', body ? body.substring(0, 200) : 'empty');
                            console.log('[Houdini] 🔍 Parsed requestBody.stream:', requestBody.stream);
                            console.log('[Houdini] 🔍 isStream:', isStream);
                            
                            // 构建请求配置
                            const requestId = isStream ? 'stream_' + Date.now() + '_' + Math.random() : '';
                            const payload = {
                                url: url,
                                method: method,
                                headers: headers,
                                body: body,
                                timeout: isStream ? 60 : 30,
                                stream: isStream,
                                requestId: requestId
                            };
                            
                            console.log('[Houdini] 🔍 payload.stream:', payload.stream);
                            console.log('[Houdini] 🔍 payload.requestId:', payload.requestId);
                            
                            // 如果是流式请求，返回 ReadableStream
                            if (isStream) {
                                console.log('[Houdini] 🌊 Creating stream for request:', requestId);
                                
                                let streamController;
                                let responseHeaders = { 'Content-Type': 'text/event-stream' };
                                let responseStatus = 200;
                                
                                // 创建 ReadableStream
                                const stream = new ReadableStream({
                                    start(controller) {
                                        streamController = controller;
                                        
                                        // 在这里注册处理器，确保在 Python 发送数据前就准备好
                                        // 启动 Python 流式请求并轮询读取数据
                                        window.qt.api.fetchProxy(JSON.stringify(payload)).then(result => {
                                            const parsed = JSON.parse(result);
                                            if (!parsed.streaming) {
                                                streamController.error(new Error('Stream not started'));
                                                return;
                                            }
                                            
                                            // 轮询读取流数据
                                            const poll = () => {
                                                window.qt.api.streamRead(requestId).then(chunk => {
                                                    const data = JSON.parse(chunk);
                                                    
                                                    if (data.type === 'headers') {
                                                        responseStatus = data.status || 200;
                                                        responseHeaders = new Headers(data.headers || {});
                                                        setTimeout(poll, 10);
                                                    } else if (data.type === 'data') {
                                                        streamController.enqueue(new TextEncoder().encode(data.data));
                                                        setTimeout(poll, 10);
                                                    } else if (data.type === 'end') {
                                                        streamController.close();
                                                    } else if (data.type === 'error') {
                                                        streamController.error(new Error(data.error));
                                                    } else if (data.type === 'empty') {
                                                        setTimeout(poll, 50);
                                                    }
                                                }).catch(e => {
                                                    streamController.error(e);
                                                });
                                            };
                                            poll();
                                        }).catch(e => {
                                            streamController.error(e);
                                        });
                                    },
                                    cancel() {}
                                });
                                
                                // 立即返回 Response 对象
                                console.log('[Houdini] 🌊 Returning Response with stream');
                                return new Response(stream, {
                                    status: responseStatus,
                                    statusText: 'OK',
                                    headers: responseHeaders
                                });
                            }
                            
                            // 非流式请求
                            const result = await window.qt.api.fetchProxy(JSON.stringify(payload));
                            console.log('[Houdini] fetchProxy response received');
                            
                            const parsed = typeof result === 'string' ? JSON.parse(result) : result;
                            
                            if (parsed.error && !parsed.status) {
                                console.error('[Houdini] fetchProxy error:', parsed.error);
                                throw new Error(parsed.error);
                            }
                            
                            // 返回模拟的 Response 对象
                            return new Response(parsed.body || '', {
                                status: parsed.status || 200,
                                statusText: parsed.statusText || 'OK',
                                headers: parsed.headers || { 'Content-Type': 'application/json' }
                            });
                        } catch(e) {
                            console.error('[Houdini] fetchProxy call failed:', e);
                            throw e;
                        }
                    } else {
                        console.error('[Houdini] QWebChannel fetchProxy not available');
                    }
                }
            } catch(e) {
                console.error('[Houdini] fetch interceptor error:', e);
                throw e;
            }
            
            // 如果不是 HTTP 请求或拦截失败，使用原始 fetch
            return originalFetch.call(this, input, init);
        };
        
        window.__fetchInterceptorInstalled = true;
        console.log('[Houdini] fetch interceptor installed');
    }, 2000);
    
    // 调试信息：延迟 3 秒输出
    setTimeout(function() {
        console.log('[DEBUG] ========== 系统诊断开始 ==========');
        console.log('[DEBUG] === QWebChannel 状态 ===');
        console.log('[DEBUG] 1. window.qt:', typeof window.qt);
        console.log('[DEBUG] 2. window.qt.api:', typeof (window.qt && window.qt.api));
        console.log('[DEBUG] 3. streamChunk:', typeof (window.qt && window.qt.api && window.qt.api.streamChunk));
        console.log('[DEBUG] 4. streamChunk.connect:', typeof (window.qt && window.qt.api && window.qt.api.streamChunk && window.qt.api.streamChunk.connect));
        
        console.log('[DEBUG] === localStorage 状态 ===');
        try {
            var testKey = 'test_persist_' + Date.now();
            localStorage.setItem(testKey, 'hello');
            var retrieved = localStorage.getItem(testKey);
            console.log('[DEBUG] localStorage 读写测试:', retrieved === 'hello' ? '✓ 成功' : '✗ 失败');
            console.log('[DEBUG] localStorage 总项数:', localStorage.length);
            
            var configKeys = [];
            for(var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if(key && (key.includes('provider') || key.includes('setting') || key.includes('config') || key.includes('model'))) {
                    configKeys.push(key);
                }
            }
            console.log('[DEBUG] 配置相关 keys 数量:', configKeys.length);
            console.log('[DEBUG] 配置相关 keys:', JSON.stringify(configKeys.slice(0, 10)));
        } catch(e) {
            console.error('[DEBUG] localStorage 错误:', e);
        }
        
        console.log('[DEBUG] ========== 系统诊断结束 ==========');
    }, 3000);
    """

