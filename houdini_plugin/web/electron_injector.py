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
    
    polyfill_js = """
    // Polyfill 现代 Array/TypedArray 新增方法，避免 Qt 老版本 JS 引擎报错
    (function() {
        try {
            var arrProto = Array.prototype;
            var typedArrayCtors = typeof ArrayBuffer !== 'undefined'
                ? [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array]
                : [];

            function defineMethod(proto, name, fn) {
                if (!proto[name]) {
                    Object.defineProperty(proto, name, {
                        value: fn,
                        configurable: true,
                        writable: true
                    });
                }
            }

            defineMethod(arrProto, 'toReversed', function() {
                return this.slice().reverse();
            });

            defineMethod(arrProto, 'toSorted', function(compareFn) {
                return this.slice().sort(compareFn);
            });

            defineMethod(arrProto, 'toSpliced', function(start, deleteCount) {
                var copy = this.slice();
                copy.splice.apply(copy, [start, deleteCount].concat([].slice.call(arguments, 2)));
                return copy;
            });

            defineMethod(arrProto, 'with', function(index, value) {
                var copy = this.slice();
                var len = copy.length;
                var idx = index < 0 ? len + index : index;
                if (idx >= 0 && idx < len) {
                    copy[idx] = value;
                }
                return copy;
            });

            for (var i = 0; i < typedArrayCtors.length; i++) {
                var ctor = typedArrayCtors[i];
                if (typeof ctor === 'function') {
                    defineMethod(ctor.prototype, 'toReversed', function() {
                        return new this.constructor(Array.prototype.slice.call(this).reverse());
                    });
                    defineMethod(ctor.prototype, 'toSorted', function(compareFn) {
                        return new this.constructor(Array.prototype.slice.call(this).sort(compareFn));
                    });
                    defineMethod(ctor.prototype, 'toSpliced', function(start, deleteCount) {
                        var arr = Array.prototype.slice.call(this);
                        arr.splice.apply(arr, [start, deleteCount].concat([].slice.call(arguments, 2)));
                        return new this.constructor(arr);
                    });
                    defineMethod(ctor.prototype, 'with', function(index, value) {
                        var arr = Array.prototype.slice.call(this);
                        var len = arr.length;
                        var idx = index < 0 ? len + index : index;
                        if (idx >= 0 && idx < len) {
                            arr[idx] = value;
                        }
                        return new this.constructor(arr);
                    });
                }
            }
        } catch(e) {
            console.error('[Houdini] Polyfill injection failed:', e);
        }
    })();
    """.strip("\n")
    
    script = script.replace("    // 在 hython 环境中手动持久化 localStorage", polyfill_js + "\n\n    // 在 hython 环境中手动持久化 localStorage", 1)
    
    extra_runtime_patch = """
(function () {
    try {
        if (window.__houdiniExtraApisInitialized) {
            return;
        }
        window.__houdiniExtraApisInitialized = true;

        var baseApi = window.api = window.api || {};
        var memoryStore = window.__houdiniMemoryStore || { entries: [], config: {} };
        window.__houdiniMemoryStore = memoryStore;
        
        function resolved(value) {
            return Promise.resolve(value);
        }
        
        function asyncTrue() { return resolved(true); }
        function asyncFalse() { return resolved(false); }
        
        function asyncStub(path, defaultValue) {
            var warned = false;
            return function () {
                if (!warned) {
                    console.warn('[Houdini] window.api.' + path + ' is not available in Qt runtime, returning default value.');
                    warned = true;
                }
                return resolved(defaultValue);
            };
        }
        
        function ensureNamespace(name) {
            if (!baseApi[name] || typeof baseApi[name] !== 'object') {
                baseApi[name] = {};
            }
            return baseApi[name];
        }

        function normalizePayload(payload) {
            if (payload === undefined) {
                return undefined;
            }
            if (typeof payload === 'string') {
                return payload;
            }
            try {
                return JSON.stringify(payload || {});
            } catch (err) {
                console.error('[Houdini] normalizePayload error:', err);
                return '{}';
            }
        }

        function qtInvokeJson(methodName, payload, fallback) {
            try {
                var fn = window.qt && window.qt.api && window.qt.api[methodName];
                if (!fn) {
                    return resolved(fallback);
                }
                var arg = normalizePayload(payload);
                var result = arg === undefined ? fn() : fn(arg);
                return Promise.resolve(result).then(function (value) {
                    if (value === undefined || value === null || value === '') {
                        return fallback;
                    }
                    if (typeof value === 'string') {
                        if (value === 'true') {
                            return true;
                        }
                        if (value === 'false') {
                            return false;
                        }
                        try {
                            var parsed = JSON.parse(value);
                            if (parsed === undefined || parsed === null) {
                                return fallback;
                            }
                            return parsed;
                        } catch (e) {
                            return value;
                        }
                    }
                    return value;
                }).catch(function (err) {
                    console.error('[Houdini] ' + methodName + ' error:', err);
                    return fallback;
                });
            } catch (err) {
                console.error('[Houdini] ' + methodName + ' invoke failed:', err);
                return resolved(fallback);
            }
        }
        
        baseApi.setEnableSpellCheck = baseApi.setEnableSpellCheck || asyncTrue;
        baseApi.setSpellCheckLanguages = baseApi.setSpellCheckLanguages || asyncTrue;
        baseApi.setLaunchOnBoot = baseApi.setLaunchOnBoot || asyncTrue;
        baseApi.setLaunchToTray = baseApi.setLaunchToTray || asyncTrue;
        baseApi.setTray = baseApi.setTray || asyncTrue;
        baseApi.setTrayOnClose = baseApi.setTrayOnClose || asyncTrue;
        baseApi.setTestPlan = baseApi.setTestPlan || asyncFalse;
        baseApi.setTestChannel = baseApi.setTestChannel || function (channel) { return resolved(channel || 'stable'); };
        baseApi.setAutoUpdate = baseApi.setAutoUpdate || asyncTrue;
        baseApi.setStopQuitApp = baseApi.setStopQuitApp || asyncTrue;
        baseApi.flushAppData = baseApi.flushAppData || asyncTrue;
        baseApi.isNotEmptyDir = baseApi.isNotEmptyDir || asyncFalse;
        baseApi.relaunchApp = baseApi.relaunchApp || asyncFalse;
        baseApi.quit = baseApi.quit || function () {
            console.warn('[Houdini] window.api.quit is ignored in Qt runtime.');
        };
        baseApi.quitAndInstall = baseApi.quitAndInstall || asyncFalse;
        baseApi.select = baseApi.select || function (options) {
            if (baseApi.file && typeof baseApi.file.select === 'function') {
                return baseApi.file.select(options);
            }
            return resolved([]);
        };
        baseApi.hasWritePermission = baseApi.hasWritePermission || asyncTrue;
        baseApi.resolvePath = baseApi.resolvePath || function (path) { return resolved(path || ''); };
        baseApi.isPathInside = baseApi.isPathInside || asyncTrue;
        baseApi.setAppDataPath = baseApi.setAppDataPath || asyncTrue;
        baseApi.copy = baseApi.copy || asyncTrue;
        
        baseApi.mac = baseApi.mac || {};
        baseApi.mac.isProcessTrusted = baseApi.mac.isProcessTrusted || asyncTrue;
        baseApi.mac.requestProcessTrust = baseApi.mac.requestProcessTrust || asyncTrue;
        
        baseApi.notification = baseApi.notification || {};
        baseApi.notification.send = baseApi.notification.send || asyncStub('notification.send', false);
        
        var systemApi = ensureNamespace('system');
        systemApi.getDeviceType = systemApi.getDeviceType || function () {
            var ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent.toLowerCase() : '';
            if (ua.indexOf('houdini') >= 0) {
                return resolved('houdini');
            }
            return resolved('houdini-desktop');
        };
        systemApi.getHostname = systemApi.getHostname || function () {
            try {
                if (window.qt && window.qt.api && typeof window.qt.api.getHostname === 'function') {
                    return resolved(window.qt.api.getHostname() || 'localhost');
                }
            } catch (e) {}
            return resolved('localhost');
        };
        systemApi.getCpuName = systemApi.getCpuName || function () {
            try {
                if (window.qt && window.qt.api && typeof window.qt.api.getCpuName === 'function') {
                    return resolved(window.qt.api.getCpuName() || 'QtWebEngine');
                }
            } catch (e) {}
            return resolved('QtWebEngine');
        };
        systemApi.checkGitBash = systemApi.checkGitBash || asyncFalse;
        
        var devToolsApi = ensureNamespace('devTools');
        devToolsApi.toggle = devToolsApi.toggle || function () {
            try {
                console.info('[Houdini] DevTools toggle requested from UI');
                if (typeof alert === 'function') {
                    alert('Houdini 版本当前嵌入的是 Qt WebEngine，暂不支持原版浏览器 DevTools（F12）窗口。\\n\\n请改用 Houdini Python 控制台 / 终端日志进行调试。');
                } else {
                    console.warn('[Houdini] DevTools not available in Qt runtime. Please use Houdini console logs instead.');
                }
            } catch (e) {
                console.error('[Houdini] DevTools toggle handler error:', e);
            }
            return resolved(false);
        };
        
        var zipApi = ensureNamespace('zip');
        zipApi.compress = zipApi.compress || function (text) {
            try {
                return resolved(window.btoa(unescape(encodeURIComponent(String(text || '')))));
            } catch (e) {
                console.error('[Houdini] zip.compress fallback failed:', e);
                return resolved(String(text || ''));
            }
        };
        zipApi.decompress = zipApi.decompress || function (payload) {
            try {
                return resolved(decodeURIComponent(escape(window.atob(String(payload || '')))));
            } catch (e) {
                console.error('[Houdini] zip.decompress fallback failed:', e);
                return resolved(String(payload || ''));
            }
        };
        
        var backupApi = ensureNamespace('backup');
        var asyncNull = function () { return resolved(null); };
        var asyncList = function () { return resolved([]); };
        backupApi.backup = backupApi.backup || asyncTrue;
        backupApi.restore = backupApi.restore || asyncNull;
        backupApi.backupToWebdav = backupApi.backupToWebdav || asyncTrue;
        backupApi.restoreFromWebdav = backupApi.restoreFromWebdav || asyncNull;
        backupApi.listWebdavFiles = backupApi.listWebdavFiles || asyncList;
        backupApi.checkConnection = backupApi.checkConnection || asyncTrue;
        backupApi.createDirectory = backupApi.createDirectory || asyncTrue;
        backupApi.deleteWebdavFile = backupApi.deleteWebdavFile || asyncTrue;
        backupApi.backupToLocalDir = backupApi.backupToLocalDir || asyncTrue;
        backupApi.restoreFromLocalBackup = backupApi.restoreFromLocalBackup || asyncNull;
        backupApi.listLocalBackupFiles = backupApi.listLocalBackupFiles || asyncList;
        backupApi.deleteLocalBackupFile = backupApi.deleteLocalBackupFile || asyncTrue;
        backupApi.checkWebdavConnection = backupApi.checkWebdavConnection || asyncTrue;
        backupApi.backupToS3 = backupApi.backupToS3 || asyncTrue;
        backupApi.restoreFromS3 = backupApi.restoreFromS3 || asyncNull;
        backupApi.listS3Files = backupApi.listS3Files || asyncList;
        backupApi.deleteS3File = backupApi.deleteS3File || asyncTrue;
        backupApi.checkS3Connection = backupApi.checkS3Connection || asyncTrue;
        
        var fsApi = ensureNamespace('fs');
        fsApi.read = fsApi.read || function (pathOrUrl) {
            try {
                if (typeof pathOrUrl === 'string' && pathOrUrl.indexOf('http') === 0) {
                    return fetch(pathOrUrl).then(function (resp) { return resp.text(); }).catch(function () { return ''; });
                }
            } catch (e) {
                console.error('[Houdini] fs.read fallback error:', e);
            }
            return resolved('');
        };
        fsApi.readText = fsApi.readText || fsApi.read;
        
        ensureNamespace('export').toWord = ensureNamespace('export').toWord || asyncStub('export.toWord', true);
        
        var obsidianApi = ensureNamespace('obsidian');
        obsidianApi.getVaults = obsidianApi.getVaults || asyncList;
        obsidianApi.getFolders = obsidianApi.getFolders || asyncList;
        obsidianApi.getFiles = obsidianApi.getFiles || asyncList;
        
        ensureNamespace('shortcuts').update = ensureNamespace('shortcuts').update || function (payload) {
            try {
                localStorage.setItem('houdini.shortcuts', JSON.stringify(payload || []));
            } catch (e) {
                console.error('[Houdini] shortcuts.update error:', e);
            }
            return resolved(true);
        };
        
        var knowledgeApi = ensureNamespace('knowledgeBase');
        knowledgeApi.create = knowledgeApi.create || asyncTrue;
        knowledgeApi.reset = knowledgeApi.reset || asyncTrue;
        knowledgeApi.delete = knowledgeApi.delete || asyncTrue;
        knowledgeApi.add = knowledgeApi.add || asyncTrue;
        knowledgeApi.remove = knowledgeApi.remove || asyncTrue;
        knowledgeApi.search = knowledgeApi.search || asyncList;
        knowledgeApi.rerank = knowledgeApi.rerank || asyncList;
        knowledgeApi.checkQuota = knowledgeApi.checkQuota || asyncTrue;
        
        var memoryApi = ensureNamespace('memory');
        memoryApi.add = memoryApi.add || function (messages) {
            memoryStore.entries.push({ id: 'local-' + Date.now() + '-' + Math.random(), messages: messages, ts: Date.now() });
            return resolved(true);
        };
        memoryApi.search = memoryApi.search || function () { return resolved(memoryStore.entries.slice()); };
        memoryApi.list = memoryApi.list || function () { return resolved(memoryStore.entries.slice()); };
        memoryApi.delete = memoryApi.delete || asyncTrue;
        memoryApi.update = memoryApi.update || asyncTrue;
        memoryApi.get = memoryApi.get || asyncNull;
        memoryApi.setConfig = memoryApi.setConfig || function (config) {
            memoryStore.config = config || memoryStore.config || {};
            return resolved(true);
        };
        memoryApi.deleteUser = memoryApi.deleteUser || asyncTrue;
        memoryApi.deleteAllMemoriesForUser = memoryApi.deleteAllMemoriesForUser || asyncTrue;
        memoryApi.getUsersList = memoryApi.getUsersList || asyncList;
        
        var fileServiceApi = ensureNamespace('fileService');
        fileServiceApi.upload = fileServiceApi.upload || asyncStub('fileService.upload', { success: false });
        fileServiceApi.list = fileServiceApi.list || asyncList;
        fileServiceApi.delete = fileServiceApi.delete || asyncTrue;
        fileServiceApi.retrieve = fileServiceApi.retrieve || asyncNull;

        var mcpApi = ensureNamespace('mcp');
        mcpApi.removeServer = mcpApi.removeServer || function (server) {
            return qtInvokeJson('mcpRemoveServer', server, true);
        };
        mcpApi.restartServer = mcpApi.restartServer || function (server) {
            return qtInvokeJson('mcpRestartServer', server, true);
        };
        mcpApi.stopServer = mcpApi.stopServer || function (server) {
            return qtInvokeJson('mcpStopServer', server, true);
        };
        mcpApi.startServer = mcpApi.startServer || function (server) {
            return qtInvokeJson('mcpStartServer', server, true);
        };
        mcpApi.listTools = mcpApi.listTools || function (server) {
            return qtInvokeJson('mcpListTools', server, []);
        };
        mcpApi.listPrompts = mcpApi.listPrompts || function (server) {
            return qtInvokeJson('mcpListPrompts', server, []);
        };
        mcpApi.listResources = mcpApi.listResources || function (server) {
            return qtInvokeJson('mcpListResources', server, []);
        };
        mcpApi.getServerVersion = mcpApi.getServerVersion || function (server) {
            return qtInvokeJson('mcpGetServerVersion', server, null);
        };
        mcpApi.checkMcpConnectivity = mcpApi.checkMcpConnectivity || function (server) {
            return qtInvokeJson('mcpCheckMcpConnectivity', server, false);
        };
        mcpApi.getInstallInfo = mcpApi.getInstallInfo || asyncStub('mcp.getInstallInfo', null);
        mcpApi.getPrompt = mcpApi.getPrompt || asyncStub('mcp.getPrompt', null);
        mcpApi.getResource = mcpApi.getResource || asyncStub('mcp.getResource', null);
        mcpApi.callTool = mcpApi.callTool || function (payload) {
            console.log('[Houdini] mcpApi.callTool called with payload:', payload);
            try {
                var result = qtInvokeJson('mcpCallTool', payload, { isError: true, content: [{ type: 'text', text: 'MCP callTool not available' }] });
                console.log('[Houdini] mcpApi.callTool result:', result);
                return result;
            } catch (e) {
                console.error('[Houdini] mcpApi.callTool error:', e);
                return Promise.resolve({ isError: true, content: [{ type: 'text', text: 'MCP callTool error: ' + String(e) }] });
            }
        };
        mcpApi.uploadDxt = mcpApi.uploadDxt || asyncStub('mcp.uploadDxt', { success: false, error: 'Not supported in Qt runtime' });
        mcpApi.abortTool = mcpApi.abortTool || asyncStub('mcp.abortTool', false);

        var apiServerApi = ensureNamespace('apiServer');
        apiServerApi.getStatus = apiServerApi.getStatus || function () { return resolved({ running: false }); };
        apiServerApi.start = apiServerApi.start || function () { return resolved({ success: true }); };
        apiServerApi.restart = apiServerApi.restart || function () { return resolved({ success: true }); };
        apiServerApi.stop = apiServerApi.stop || function () { return resolved({ success: true }); };
        apiServerApi.onReady = apiServerApi.onReady || function (callback) {
            var cancelled = false;
            var timer = setTimeout(function () {
                if (!cancelled && typeof callback === 'function') {
                    try { callback(); } catch (e) {}
                }
            }, 0);
            return function () {
                cancelled = true;
                clearTimeout(timer);
            };
        };

        var codeToolsApi = ensureNamespace('codeTools');
        codeToolsApi.run = codeToolsApi.run || asyncStub('codeTools.run', { success: false });
        codeToolsApi.getAvailableTerminals = codeToolsApi.getAvailableTerminals || asyncList;
        codeToolsApi.setCustomTerminalPath = codeToolsApi.setCustomTerminalPath || asyncTrue;
        codeToolsApi.getCustomTerminalPath = codeToolsApi.getCustomTerminalPath || asyncNull;
        codeToolsApi.removeCustomTerminalPath = codeToolsApi.removeCustomTerminalPath || asyncTrue;

        var ocrApi = ensureNamespace('ocr');
        ocrApi.ocr = ocrApi.ocr || asyncStub('ocr.ocr', { text: '' });
        ocrApi.listProviders = ocrApi.listProviders || asyncList;

        var cherryaiApi = ensureNamespace('cherryai');
        cherryaiApi.generateSignature = cherryaiApi.generateSignature || function () { return resolved(''); };

        var claudeCodePluginApi = ensureNamespace('claudeCodePlugin');
        claudeCodePluginApi.listAvailable = claudeCodePluginApi.listAvailable || asyncStub('claudeCodePlugin.listAvailable', { success: true, data: [] });
        claudeCodePluginApi.install = claudeCodePluginApi.install || asyncStub('claudeCodePlugin.install', { success: true });
        claudeCodePluginApi.uninstall = claudeCodePluginApi.uninstall || asyncStub('claudeCodePlugin.uninstall', { success: true });
        claudeCodePluginApi.listInstalled = claudeCodePluginApi.listInstalled || asyncStub('claudeCodePlugin.listInstalled', { success: true, data: [] });
        claudeCodePluginApi.invalidateCache = claudeCodePluginApi.invalidateCache || asyncTrue;
        claudeCodePluginApi.readContent = claudeCodePluginApi.readContent || asyncStub('claudeCodePlugin.readContent', { success: true, data: '' });
        claudeCodePluginApi.writeContent = claudeCodePluginApi.writeContent || asyncTrue;

        var webSocketApi = ensureNamespace('webSocket');
        webSocketApi.start = webSocketApi.start || asyncTrue;
        webSocketApi.stop = webSocketApi.stop || asyncTrue;
        webSocketApi.status = webSocketApi.status || function () { return resolved({ running: false }); };
        webSocketApi.sendFile = webSocketApi.sendFile || asyncTrue;
        webSocketApi.getAllCandidates = webSocketApi.getAllCandidates || asyncList;
        
        var vertexApi = ensureNamespace('vertexAI');
        vertexApi.getAuthHeaders = vertexApi.getAuthHeaders || function () { return resolved({}); };
        vertexApi.getAccessToken = vertexApi.getAccessToken || function () { return resolved(''); };
        vertexApi.clearAuthCache = vertexApi.clearAuthCache || asyncTrue;
        
        var ovmsApi = ensureNamespace('ovms');
        ovmsApi.addModel = ovmsApi.addModel || asyncTrue;
        ovmsApi.stopAddModel = ovmsApi.stopAddModel || asyncTrue;
        ovmsApi.getModels = ovmsApi.getModels || asyncList;
        ovmsApi.isRunning = ovmsApi.isRunning || asyncFalse;
        ovmsApi.getStatus = ovmsApi.getStatus || function () { return resolved({ status: 'stopped' }); };
        ovmsApi.runOvms = ovmsApi.runOvms || asyncFalse;
        ovmsApi.stopOvms = ovmsApi.stopOvms || asyncFalse;
        
        var configApi = ensureNamespace('config');
        configApi.set = configApi.set || function (key, value, notify) {
            try {
                localStorage.setItem('houdini.config.' + key, JSON.stringify({ value: value, notify: notify }));
            } catch (e) {
                console.error('[Houdini] config.set error:', e);
            }
            return resolved(true);
        };
        configApi.get = configApi.get || function (key) {
            try {
                var raw = localStorage.getItem('houdini.config.' + key);
                if (raw) {
                    var parsed = JSON.parse(raw);
                    return resolved(parsed && parsed.value);
                }
            } catch (e) {}
            return resolved(null);
        };
        
        var miniWindowApi = ensureNamespace('miniWindow');
        miniWindowApi.show = miniWindowApi.show || asyncFalse;
        miniWindowApi.hide = miniWindowApi.hide || asyncFalse;
        miniWindowApi.close = miniWindowApi.close || asyncFalse;
        miniWindowApi.toggle = miniWindowApi.toggle || asyncFalse;
        miniWindowApi.setPin = miniWindowApi.setPin || asyncFalse;
        
        var aesApi = ensureNamespace('aes');
        aesApi.encrypt = aesApi.encrypt || function (text) { return resolved(String(text || '')); };
        aesApi.decrypt = aesApi.decrypt || function (text) { return resolved(String(text || '')); };
        
        ensureNamespace('python').execute = ensureNamespace('python').execute || asyncStub('python.execute', { success: false });
        
        var shellApi = ensureNamespace('shell');
        shellApi.openExternal = shellApi.openExternal || function (url) {
            try {
                if (window.qt && window.qt.api && typeof window.qt.api.openWebsite === 'function') {
                    window.qt.api.openWebsite(url);
                }
            } catch (e) {
                console.warn('[Houdini] shell.openExternal fallback error:', e);
            }
            return resolved(true);
        };
        
        var copilotApi = ensureNamespace('copilot');
        copilotApi.getAuthMessage = copilotApi.getAuthMessage || asyncStub('copilot.getAuthMessage', null);
        copilotApi.getCopilotToken = copilotApi.getCopilotToken || asyncStub('copilot.getCopilotToken', null);
        copilotApi.refreshCopilotToken = copilotApi.refreshCopilotToken || asyncStub('copilot.refreshCopilotToken', null);

        (function ensureLoggerServiceInit() {
            var tries = 0;
            function attempt() {
                tries++;
                try {
                    var candidates = [];
                    if (window.loggerService) { candidates.push(window.loggerService); }
                    if (window.__loggerService) { candidates.push(window.__loggerService); }
                    if (window.__cherryLoggerService) { candidates.push(window.__cherryLoggerService); }
                    for (var i = 0; i < candidates.length; i++) {
                        var logger = candidates[i];
                        if (logger && typeof logger.initWindowSource === 'function' && typeof logger.withContext === 'function') {
                            if (!logger.__houdiniWindowInitialized) {
                                logger.initWindowSource('mainWindow');
                                logger.__houdiniWindowInitialized = true;
                                console.info('[Houdini] LoggerService window source initialized via bridge');
                            }
                            return;
                        }
                    }
                } catch (e) {}
                if (tries < 50) {
                    setTimeout(attempt, 200);
                }
            }
            setTimeout(attempt, 0);
        })();
        
        console.info('[Houdini] Extra Cherry Studio APIs initialized for Qt runtime');
    } catch (err) {
        console.error('[Houdini] Failed to initialize extra APIs:', err);
    }
})();
"""
    
    script += extra_runtime_patch
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

                    // 对 fastmcp2 服务保持与原生 Cherry 一致，直接使用原始 fetch，不走 Python 代理
                    try {
                        var lower = String(url).toLowerCase();
                        if (lower.indexOf('http://localhost:9000/mcp') === 0) {
                            console.log('[Houdini] Bypass fetchProxy for fastmcp2:', url);
                            return originalFetch.call(this, input, init);
                        }
                    } catch (e) {
                        console.error('[Houdini] fastmcp2 bypass check error:', e);
                    }
                    
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
                                console.error('[Houdini] fetchProxy error (non-fatal):', parsed.error);
                                // 将错误包装为 400 响应，让前端自己处理，而不是抛出异常导致面板报错
                                return new Response(String(parsed.error || 'Bad Request'), {
                                    status: 400,
                                    statusText: 'Bad Request',
                                    headers: { 'Content-Type': 'text/plain' }
                                });
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

