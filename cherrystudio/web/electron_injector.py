"""
JavaScript 注入脚本生成器
用于在 WebEngine 中注入 Electron API 桥接代码
"""

from ..version import APP_VERSION, APP_PLATFORM, APP_ARCH

def get_electron_api_script(theme: str = 'light') -> str:
    """
    生成主要的 Electron API 注入脚本
    
    Args:
        theme: 主题设置 ('light' 或 'dark')
    
    Returns:
        完整的 JavaScript 代码字符串
    """
    # 前端通过 HTTP 直连后端，window.qt.api 使用 Proxy 自动路由到 /api/v1/qt/invoke

    script = f"""
    //  使用 console.error 因为在 hython 中只有它会输出到终端
    
    // 立即设置环境标记，防止 LoggerService 错误
    window.__IS_QT = true;
    window.isQtRuntime = true;
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

                // Filter out centralized config data from Redux state before saving
                if (data['persist:cherry-studio']) {{
                    try {{
                        const reduxState = JSON.parse(data['persist:cherry-studio']);
                        
                        // Filter centralized models from llm state
                        if (reduxState.llm) {{
                            const llmState = JSON.parse(reduxState.llm);
                            if (llmState.providers) {{
                                // Filter out models and servers marked as isCentralized or in Centralized group
                                llmState.providers = llmState.providers.map(provider => {{
                                    if (provider.isSystem && (provider.id === 'centralized' || provider.isCentralized || provider.name === 'Centralized' || provider.name === 'Managed')) {{
                                       // This is a centralized provider (old or new), remove its models (or empty it)
                                       return {{ ...provider, models: [] }}; 
                                    }}
                                    
                                    if (provider.models) {{
                                        provider.models = provider.models.filter(m => !m.isCentralized);
                                    }}
                                    return provider;
                                }}).filter(p => {{
                                    // Remove the centralized provider itself if it was added by us
                                    if (p.id === 'centralized' || p.isCentralized) return false;
                                    return true;
                                }});
                            }}
                            reduxState.llm = JSON.stringify(llmState);
                        }}
                        
                        // Filter centralized MCP servers from mcp state
                        if (reduxState.mcp) {{
                            const mcpState = JSON.parse(reduxState.mcp);
                            if (mcpState.servers) {{
                                mcpState.servers = mcpState.servers.filter(server => !server.isCentralized);
                            }}
                            reduxState.mcp = JSON.stringify(mcpState);
                        }}
                        
                        data['persist:cherry-studio'] = JSON.stringify(reduxState);
                    }} catch (e) {{
                        console.error('[Qt] Error filtering centralized config:', e);
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
                            console.error('[Qt] ✅ localStorage saved');
                        }});
                    }}
                }}
            }} catch(e) {{
                console.error('[Qt] ❌ Save localStorage error:', e.message || e);
            }}
        }}
        
        function loadLocalStorage() {{
            try {{
                if (window.qt && window.qt.api && window.qt.api.fileRead) {{
                    console.error('[Qt] 📥 Loading localStorage from file...');
                    window.qt.api.fileRead('localStorage.json').then(function(content) {{
                        if (content) {{
                            try {{
                                const data = JSON.parse(content);
                                let count = 0;
                                for (const key in data) {{
                                    localStorage.setItem(key, data[key]);
                                    count++;
                                }}
                                console.error('[Qt] ✅ localStorage restored:', count, 'items');
                            }} catch(parseError) {{
                                console.error('[Qt] ❌ Parse error:', parseError.message);
                            }}
                        }} else {{
                            console.error('[Qt] ⚠️ localStorage.json is empty');
                        }}
                    }}).catch(function(e) {{
                        console.error('[Qt] ❌ Load error:', e.message || e);
                    }});
                }} else {{
                    console.error('[Qt] ⚠️ Qt API not ready for loading localStorage');
                }}
            }} catch(e) {{
                console.error('[Qt] ❌ Load localStorage error:', e.message || e);
            }}
        }}
        
        // localStorage 已在早期脚本中恢复，这里不再需要加载
        
        // 定期保存（每2秒检查一次，减少延迟）
        setInterval(saveLocalStorage, 2000);
        
        // 页面卸载时保存
        window.addEventListener('beforeunload', saveLocalStorage);
        
        // 覆盖 localStorage.setItem 以检测重要配置变化并立即保存
        const originalSetItem = localStorage.setItem.bind(localStorage);
        let saveTimeout = null;
        localStorage.setItem = function(key, value) {{
            originalSetItem(key, value);
            // 对于 persist: 键的修改，延迟 500ms 后保存（合并多次快速修改）
            if (key && key.includes('persist:')) {{
                console.error('[Qt] 📝 localStorage.setItem called for key:', key, 'value length:', value?.length || 0);
                if (saveTimeout) clearTimeout(saveTimeout);
                saveTimeout = setTimeout(function() {{
                    console.error('[Qt] 🔄 Config changed, saving immediately...');
                    saveLocalStorage();
                }}, 300);  // 减少到 300ms
            }}
        }};
        
        // 保留 localStorage.getItem 包装仅用于可能的扩展，不再每次读取都打日志（避免循环打印）
        const originalGetItem = localStorage.getItem.bind(localStorage);
        localStorage.getItem = function(key) {{
            return originalGetItem(key);
        }};
        
        // 提供全局函数供手动调用
        window.__saveLocalStorage = saveLocalStorage;
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
    
    
    // Knowledge Base Sync Logic
    async function syncKnowledgeBases() {{
        let needsRefresh = false;
        
        try {{
            if (!window.qt || !window.qt.api) return;
            
            // Sync from central source (if configured)
            if (window.qt.api.kbSyncFromCentral) {{
                const syncResultStr = await window.qt.api.kbSyncFromCentral();
                const syncResult = JSON.parse(syncResultStr || '{{}}');
                if (syncResult.synced > 0 || syncResult.updated > 0) {{
                    needsRefresh = syncResult.needsRefresh;
                }}
            }}
            
            // Scan local KBs
            if (!window.qt.api.kbScan) return;
            
            const kbsStr = await window.qt.api.kbScan();
            if (!kbsStr || kbsStr === '[]') return;
            
            const localKBs = JSON.parse(kbsStr);
            
            // Import to Redux if needed
            const persistKey = 'persist:cherry-studio';
            const rawState = localStorage.getItem(persistKey);
            if (!rawState) return;
            
            let state = JSON.parse(rawState);
            
            if (state.knowledge) {{
                const knowledgeState = JSON.parse(state.knowledge);
                const existingKBs = knowledgeState.bases || [];
                const existingMap = new Map(existingKBs.map(kb => [kb.id, kb]));
                
                let changed = false;
                
                for (const kb of localKBs) {{
                    const existingKB = existingMap.get(kb.id);
                    
                    if (!existingKB) {{
                        existingKBs.push(kb);
                        changed = true;
                        needsRefresh = true;
                    }} else if (kb.isCentralized && kb.version > (existingKB.version || 0)) {{
                        const idx = existingKBs.findIndex(k => k.id === kb.id);
                        if (idx !== -1) {{
                            existingKBs[idx] = kb;
                            changed = true;
                            needsRefresh = true;
                        }}
                    }}
                }}
                
                if (changed) {{
                    knowledgeState.bases = existingKBs;
                    state.knowledge = JSON.stringify(knowledgeState);
                    localStorage.setItem(persistKey, JSON.stringify(state));
                }}
            }}
            
            // Refresh page if needed
            if (needsRefresh) {{
                setTimeout(() => location.reload(), 500);
            }}
            
        }} catch (e) {{
            // Silent
        }}
    }}
    
    // Save KB metadata periodically
    function setupKnowledgeBaseMetadataSaver() {{
        let lastKnowledgeState = null;
        let initialSaveDone = false;
        
        async function saveAllKBMetadata() {{
            try {{
                if (!window.qt || !window.qt.api || !window.qt.api.kbSaveMetadata) return;
                
                const persistKey = 'persist:cherry-studio';
                const rawState = localStorage.getItem(persistKey);
                if (!rawState) return;
                
                const state = JSON.parse(rawState);
                if (!state.knowledge) return;
                
                const knowledgeState = JSON.parse(state.knowledge);
                const currentBases = knowledgeState.bases || [];
                
                if (currentBases.length === 0) return;
                
                const currentHash = JSON.stringify(currentBases.map(b => b.id + ':' + (b.updated_at || 0)));
                if (currentHash === lastKnowledgeState && initialSaveDone) return;
                lastKnowledgeState = currentHash;
                
                for (const kb of currentBases) {{
                    if (kb && kb.id && kb.name && !kb.isCentralized) {{
                        await window.qt.api.kbSaveMetadata(JSON.stringify(kb));
                    }}
                }}
                
                initialSaveDone = true;
            }} catch (e) {{
                // Silent
            }}
        }}
        
        setTimeout(saveAllKBMetadata, 1000);
        setInterval(saveAllKBMetadata, 10000);
    }}

    // ─────────────────────────────────────────────────────────────────────────
    // Cherry Backend Client
    // 提供与后端服务的直连 REST 客户端（window.__cherryBackend）。
    // 后端 URL 由 Python 通过 window.__CHERRY_BACKEND_URL 注入。
    // ─────────────────────────────────────────────────────────────────────────
    (function() {{
        var _backendUrl = window.__CHERRY_BACKEND_URL || '';
        var _sessionId  = window.__CHERRY_SESSION_ID  || '';

        /**
         * 调用后端 REST API。
         * @param {{string}} endpoint  如 '/api/v1/network/fetch'
         * @param {{object}} body      POST 请求体（null 则用 GET）
         * @returns {{Promise<any>}}   解析后的 JSON 响应
         */
        async function callBackend(endpoint, body) {{
            if (!_backendUrl) {{
                return {{ error: 'backend url not available' }};
            }}
            try {{
                const url = _backendUrl + endpoint;
                const isGet = body === null || body === undefined;
                const opts = isGet
                    ? {{ method: 'GET', headers: {{ 'X-Session-Id': _sessionId }} }}
                    : {{
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/json',
                            'X-Session-Id': _sessionId
                        }},
                        body: JSON.stringify(body)
                    }};
                const resp = await fetch(url, opts);
                return await resp.json();
            }} catch (e) {{
                return {{ error: String(e) }};
            }}
        }}

        // ── 流式请求辅助（SSE 轮询） ───────────────────────────────────────
        /**
         * 以流式方式调用后端，通过轮询 /api/v1/network/stream-read 获取数据块。
         * @param {{object}} fetchConfig  传给 /api/v1/network/fetch 的参数
         * @param {{function}} onChunk    每个数据块的回调 (chunk: string) => void
         * @param {{function}} onDone     流结束回调
         * @param {{function}} onError    错误回调
         */
        async function streamFromBackend(fetchConfig, onChunk, onDone, onError) {{
            const requestId = fetchConfig.requestId || ('r-' + Math.random().toString(36).slice(2));
            fetchConfig = {{ ...fetchConfig, stream: true, requestId }};

            // 发起流式请求
            const startResp = await callBackend('/api/v1/network/fetch', fetchConfig);
            if (startResp.error || !startResp.streaming) {{
                if (onError) onError(startResp.error || 'Stream start failed');
                return;
            }}

            // 轮询读取
            let done = false;
            while (!done) {{
                const chunk = await callBackend('/api/v1/network/stream-read', {{ requestId }});
                switch (chunk.type) {{
                    case 'data':
                        if (onChunk) onChunk(chunk.data);
                        break;
                    case 'end':
                        done = true;
                        if (onDone) onDone();
                        break;
                    case 'error':
                        done = true;
                        if (onError) onError(chunk.error);
                        break;
                    case 'empty':
                        await new Promise(r => setTimeout(r, 30));
                        break;
                    default:
                        break;
                }}
            }}
        }}

        // ── 公开 API 对象 ─────────────────────────────────────────────────
        window.__cherryBackend = {{
            // 基础调用
            call: callBackend,
            stream: streamFromBackend,
            backendUrl: _backendUrl,
            sessionId: _sessionId,

            // 快捷方法（与 window.qt.api 保持接口对应）
            fileRead:   (path) => callBackend('/api/v1/files/read',  {{ path }}).then(r => r.content || ''),
            fileWrite:  (path, content) => callBackend('/api/v1/files/write', {{ path, content }}).then(r => !r.error),
            fileExists: (path) => callBackend('/api/v1/files/exists', {{ path }}).then(r => !!r.exists),

            topicSave:   (topicId, data) => callBackend('/api/v1/topics/save',   {{ topicId, data }}).then(r => !r.error),
            topicLoad:   (topicId)       => callBackend('/api/v1/topics/load',   {{ topicId }}).then(r => r.data),
            topicDelete: (topicId)       => callBackend('/api/v1/topics/delete', {{ topicId }}).then(r => !r.error),
            topicList:   ()              => callBackend('/api/v1/topics/list',   null).then(r => r.topics || []),

            configGet:    ()      => callBackend('/api/v1/config/merged', null),
            configReload: ()      => callBackend('/api/v1/config/reload', {{}}),

            kbCreate: (p)  => callBackend('/api/v1/kb/create', p),
            kbAdd:    (p)  => callBackend('/api/v1/kb/add',    p),
            kbSearch: (p)  => callBackend('/api/v1/kb/search', p),
            kbList:   ()   => callBackend('/api/v1/kb/list',   null),
            kbDelete: (id) => callBackend('/api/v1/kb/delete', {{ kbId: id }}),

            // DCC 会话信息
            getSessions: () => callBackend('/api/v1/sessions/list', null).then(r => r.sessions || {{}}),
            getSession:  () => {{ return {{ sessionId: _sessionId, backendUrl: _backendUrl }}; }},

            // DCC MCP 工具调用
            callDccTool: (toolName, args, timeout) => callBackend('/api/v1/mcp/call-dcc', {{
                sessionId: _sessionId, toolName, arguments: args || {{}}, timeout: timeout || 30
            }}),
            listDccTools: () => callBackend('/api/v1/mcp/list-dcc-tools', {{ sessionId: _sessionId }}),
            resolveDcc:   () => callBackend('/api/v1/sessions/resolve-dcc', {{ sessionId: _sessionId }}),
        }};

        if (_backendUrl) {{
            console.error('[Cherry] Backend client ready:', _backendUrl, '| Session:', _sessionId || 'none');
        }} else {{
            console.error('[Cherry] Backend URL not injected — API calls will fail');
        }}
    }})();

    // ─────────────────────────────────────────────────────────────────────────
    // HTTP-based window.qt.api（替代 QWebChannel，所有调用走后端 HTTP）
    // ─────────────────────────────────────────────────────────────────────────
    (function(){{
        var _backendUrl = window.__CHERRY_BACKEND_URL || '';
        var _sessionId  = window.__CHERRY_SESSION_ID  || '';

        window.qt = window.qt || {{}};
        window.qt.electron = window.qt.electron || {{}};

        // 创建 Proxy：任何对 window.qt.api.someMethod(args) 的调用
        // 都会自动转为 POST /api/v1/qt/invoke {{ method, args }} 请求
        window.qt.api = new Proxy({{}}, {{
            get: function(_target, method) {{
                // 防止 Promise resolve、JSON 序列化等探测陷阱
                if (method === 'then' || method === 'toJSON' || typeof method === 'symbol') {{
                    return undefined;
                }}
                return function() {{
                    var args = Array.prototype.slice.call(arguments);
                    if (!_backendUrl) {{
                        console.warn('[Qt] qt.api.' + method + ': no backend URL');
                        return Promise.resolve(null);
                    }}
                    return fetch(_backendUrl + '/api/v1/qt/invoke', {{
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/json',
                            'X-Session-Id': _sessionId
                        }},
                        body: JSON.stringify({{ method: method, args: args }})
                    }}).then(function(resp) {{
                        return resp.json();
                    }}).then(function(data) {{
                        if (data.error) {{
                            console.error('[Qt] qt.api.' + method + ' error:', data.error);
                            return null;
                        }}
                        return data.value;
                    }}).catch(function(e) {{
                        console.error('[Qt] qt.api.' + method + ' failed:', e);
                        return null;
                    }});
                }};
            }}
        }});

        console.error('[Qt] HTTP-based qt.api proxy ready (backend:', _backendUrl || 'none', ')');

        // Trigger KB Sync and metadata saver after init
        setTimeout(syncKnowledgeBases, 2000);
        setTimeout(setupKnowledgeBaseMetadataSaver, 3000);
    }})();
    
    // 注入基础 window.api
    // ==========================================================================
    // window.api — 完整对齐 Cherry Studio v2.0 的 window.api 形状
    // (对应 web/src/preload/preload.ts 里 `const api = {{...}}`)
    // 每个方法都通过 window.qt.api.<method>() 转发到 Python 侧
    // (cherrystudio/api/cherry_studio_api_v2.py)，Proxy 会自动路由到后端 /api/v1/qt/invoke。
    // ==========================================================================
    if (!window.api) {{
        async function __qtCallJson(method, fallback, ...args) {{
            try {{
                const r = await window.qt?.api?.[method]?.(...args);
                if (r === undefined || r === null) return fallback;
                return (typeof r === 'string') ? JSON.parse(r) : r;
            }} catch (e) {{
                console.error('[Qt] window.qt.api.' + method + ' error:', e);
                return fallback;
            }}
        }}

        window.api = {{
            setSpellCheckLanguages: async (languages) => {{ try {{ await window.qt?.api?.setSpellCheckLanguages?.(JSON.stringify(languages || [])); }} catch(e) {{}} }},
            setLaunchOnBoot: async (isActive) => {{ try {{ await window.qt?.api?.setLaunchOnBoot?.(!!isActive); }} catch(e) {{}} }},
            select: async (options) => {{ return await __qtCallJson('fileSelect', null, JSON.stringify(options || {{}})); }},
            hasWritePermission: async (path) => {{ try {{ return !!(await window.qt?.api?.hasWritePermission?.(path)); }} catch(e) {{ return true; }} }},
            resolvePath: async (path) => {{ try {{ return (await window.qt?.api?.resolvePathV2?.(path)) || path; }} catch(e) {{ return path; }} }},
            isPathInside: async (childPath, parentPath) => {{ try {{ return !!(await window.qt?.api?.isPathInside?.(childPath, parentPath)); }} catch(e) {{ return false; }} }},
            application: {{
                preventQuit: async (reason) => {{ try {{ return await window.qt?.api?.applicationPreventQuit?.(reason || ''); }} catch(e) {{ return 'houdini-noop'; }} }},
                allowQuit: async (holdId) => {{ try {{ await window.qt?.api?.applicationAllowQuit?.(holdId); }} catch(e) {{}} }},
                relaunch: async (options) => {{ try {{ await window.qt?.api?.applicationRelaunch?.(JSON.stringify(options || {{}})); }} catch(e) {{}} }}
            }},
            getCacheSize: async () => {{ return await __qtCallJson('getCacheSizeV2', {{ size: 0, count: 0 }}); }},
            clearCache: async () => {{ try {{ return !!(await window.qt?.api?.clearCacheV2?.()); }} catch(e) {{ return true; }} }},
            system: {{
                getHostname: async () => {{ try {{ return (await window.qt?.api?.getHostname?.()) || 'houdini'; }} catch(e) {{ return 'houdini'; }} }}
            }},
            zip: {{
                decompress: async (text) => {{ try {{ return await window.qt?.api?.zipDecompress?.(String(text || '')); }} catch(e) {{ return ''; }} }}
            }},
            backup: {{
                restore: async (path) => {{ try {{ return !!(await window.qt?.api?.backupRestore?.(path)); }} catch(e) {{ return false; }} }},
                backup: async (fileName, destinationPath, skipBackupFile) => {{ try {{ return !!(await window.qt?.api?.backupBackup?.(fileName || '', destinationPath || '', !!skipBackupFile)); }} catch(e) {{ return false; }} }},
                backupToWebdav: async (webdavConfig) => {{ return await __qtCallJson('backupBackupToWebdav', {{ success: false, error: 'webdav backup failed' }}, JSON.stringify(webdavConfig || {{}})); }},
                restoreFromWebdav: async (webdavConfig) => {{ try {{ await window.qt?.api?.backupRestoreFromWebdav?.(JSON.stringify(webdavConfig || {{}})); }} catch(e) {{}} }},
                listWebdavFiles: async (webdavConfig) => {{ return await __qtCallJson('backupListWebdavFiles', [], JSON.stringify(webdavConfig || {{}})); }},
                checkConnection: async (webdavConfig) => {{ try {{ return !!(await window.qt?.api?.backupCheckWebdavConnection?.(JSON.stringify(webdavConfig || {{}}))); }} catch(e) {{ return false; }} }},
                createDirectory: async (webdavConfig, path, options) => {{ try {{ await window.qt?.api?.backupCreateWebdavDirectory?.(JSON.stringify(webdavConfig || {{}}), path, JSON.stringify(options || {{}})); }} catch(e) {{}} }},
                deleteWebdavFile: async (fileName, webdavConfig) => {{ try {{ await window.qt?.api?.backupDeleteWebdavFile?.(fileName, JSON.stringify(webdavConfig || {{}})); }} catch(e) {{}} }},
                backupToLocalDir: async (fileName, localConfig) => {{ return await __qtCallJson('backupBackupToLocalDir', '', fileName || '', JSON.stringify(localConfig || {{}})); }},
                restoreFromLocalBackup: async (fileName, localBackupDir) => {{ try {{ await window.qt?.api?.backupRestoreFromLocalBackup?.(fileName, localBackupDir || ''); }} catch(e) {{}} }},
                listLocalBackupFiles: async (localBackupDir) => {{ return await __qtCallJson('backupListLocalBackupFiles', [], localBackupDir || ''); }},
                deleteLocalBackupFile: async (fileName, localBackupDir) => {{ try {{ await window.qt?.api?.backupDeleteLocalBackupFile?.(fileName, localBackupDir || ''); }} catch(e) {{}} }},
                checkWebdavConnection: async (webdavConfig) => {{ try {{ return !!(await window.qt?.api?.backupCheckWebdavConnection?.(JSON.stringify(webdavConfig || {{}}))); }} catch(e) {{ return false; }} }},
                backupToS3: async (s3Config) => {{ return await __qtCallJson('backupBackupToS3', {{ success: false, error: 's3 backup failed' }}, JSON.stringify(s3Config || {{}})); }},
                restoreFromS3: async (s3Config) => {{ try {{ await window.qt?.api?.backupRestoreFromS3?.(JSON.stringify(s3Config || {{}})); }} catch(e) {{}} }},
                listS3Files: async (s3Config) => {{ return await __qtCallJson('backupListS3Files', [], JSON.stringify(s3Config || {{}})); }},
                deleteS3File: async (fileName, s3Config) => {{ try {{ await window.qt?.api?.backupDeleteS3File?.(fileName, JSON.stringify(s3Config || {{}})); }} catch(e) {{}} }},
                createLanTransferBackup: async (data, destinationPath) => {{ return await __qtCallJson('backupCreateLanTransferBackup', '', data, destinationPath || ''); }},
                deleteLanTransferBackup: async (filePath) => {{ try {{ await window.qt?.api?.backupDeleteLanTransferBackup?.(filePath); }} catch(e) {{}} }}
            }},
            file: {{
                select: async (options) => {{ return await __qtCallJson('fileSelect', null, JSON.stringify(options || {{}})); }},
                createInternalEntry: async (params) => {{
                    const r = await __qtCallJson('fileCreateInternalEntry', null, JSON.stringify(params || {{}}));
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }},
                ensureExternalEntry: async (params) => {{
                    const r = await __qtCallJson('fileEnsureExternalEntry', null, JSON.stringify(params || {{}}));
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }},
                getPhysicalPath: async (params) => {{ return await __qtCallJson('fileGetPhysicalPath', null, JSON.stringify(params || {{}})); }},
                permanentDelete: async (handle) => {{ try {{ await window.qt?.api?.filePermanentDelete?.(JSON.stringify(handle || {{}})); }} catch(e) {{}} }},
                runSweep: async () => {{ try {{ await window.qt?.api?.fileRunSweep?.(); }} catch(e) {{}} }},
                deleteExternalFile: async (filePath) => {{ try {{ await window.qt?.api?.fileDeleteExternalFile?.(filePath); }} catch(e) {{}} }},
                deleteExternalDir: async (dirPath) => {{ try {{ await window.qt?.api?.fileDeleteExternalDir?.(dirPath); }} catch(e) {{}} }},
                move: async (path, newPath) => {{ try {{ await window.qt?.api?.fileMove?.(path, newPath); }} catch(e) {{}} }},
                moveDir: async (dirPath, newDirPath) => {{ try {{ await window.qt?.api?.fileMoveDir?.(dirPath, newDirPath); }} catch(e) {{}} }},
                rename: async (path, newName) => {{ try {{ await window.qt?.api?.fileRename?.(path, newName); }} catch(e) {{}} }},
                renameDir: async (dirPath, newName) => {{ try {{ await window.qt?.api?.fileRenameDir?.(dirPath, newName); }} catch(e) {{}} }},
                readExternal: async (filePath, detectEncoding) => {{ try {{ return await window.qt?.api?.fileRead?.(filePath); }} catch(e) {{ return ''; }} }},
                get: async (filePath) => {{ return await __qtCallJson('fileGetV2', null, filePath); }},
                createTempFile: async (fileName) => {{ try {{ return (await window.qt?.api?.fileCreateTempFile?.(fileName)) || fileName; }} catch(e) {{ return fileName; }} }},
                mkdir: async (dirPath) => {{ try {{ await window.qt?.api?.fileMkdir?.(dirPath); }} catch(e) {{}} }},
                write: async (filePath, data) => {{
                    try {{
                        const content = typeof data === 'string' ? data : new TextDecoder().decode(data);
                        await window.qt?.api?.fileWrite?.(filePath, content);
                    }} catch(e) {{ console.error('[Qt] file.write error:', e); }}
                }},
                open: async (options) => {{ return await __qtCallJson('fileSelect', null, JSON.stringify(options || {{}})); }},
                openPath: async (path) => {{ try {{ await window.qt?.api?.openPath?.(path); }} catch(e) {{}} }},
                save: async (path, content, options) => {{
                    try {{
                        const text = typeof content === 'string' ? content : new TextDecoder().decode(content);
                        await window.qt?.api?.fileWrite?.(path, text);
                        return path;
                    }} catch(e) {{ console.error('[Qt] file.save error:', e); return null; }}
                }},
                selectFolder: async (options) => {{ try {{ return await window.qt?.api?.selectFolder?.(); }} catch(e) {{ return null; }} }},
                saveImage: async (name, data) => {{ return await __qtCallJson('saveImage', false, name || 'image', data || ''); }},
                binaryImage: async (fileId) => {{
                    try {{
                        const result = await window.qt?.api?.binaryImage?.(fileId);
                        if (!result || result === 'null') return null;
                        return JSON.parse(result);
                    }} catch(e) {{ console.error('[Qt] file.binaryImage error:', e); return null; }}
                }},
                getPathForFile: (file) => {{ try {{ return file.path || ''; }} catch(e) {{ return ''; }} }},
                listDirectory: async (dirPath, options) => {{ return await __qtCallJson('fileListDirectory', [], dirPath, JSON.stringify(options || {{}})); }},
                listDirectoryEntries: async (dirPath, options) => {{ return await __qtCallJson('fileListDirectoryEntries', [], dirPath, JSON.stringify(options || {{}})); }},
                checkFileName: async (dirPath, fileName, isFile) => {{ try {{ return !!(await window.qt?.api?.fileCheckFileName?.(dirPath, fileName, !!isFile)); }} catch(e) {{ return true; }} }},
                validateNotesDirectory: async (dirPath) => {{ try {{ return !!(await window.qt?.api?.fileValidateNotesDirectory?.(dirPath)); }} catch(e) {{ return false; }} }},
                batchUploadMarkdown: async (filePaths, targetPath) => {{ try {{ await window.qt?.api?.fileBatchUploadMarkdown?.(JSON.stringify(filePaths || []), targetPath || ''); }} catch(e) {{}} }},
                showInFolder: async (path) => {{ try {{ await window.qt?.api?.fileShowInFolder?.(path); }} catch(e) {{}} }}
            }},
            fs: {{
                read: async (pathOrUrl, encoding) => {{ try {{ return (await window.qt?.api?.fileRead?.(pathOrUrl)) || ''; }} catch(e) {{ return ''; }} }},
                readText: async (pathOrUrl) => {{ try {{ return (await window.qt?.api?.fileRead?.(pathOrUrl)) || ''; }} catch(e) {{ return ''; }} }}
            }},
            tree: {{
                create: async (rootPath, options) => {{
                    const r = await __qtCallJson('fileTreeCreate', null, rootPath, JSON.stringify(options || {{}}));
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }},
                dispose: async (treeId) => {{ try {{ await window.qt?.api?.fileTreeDispose?.(treeId); }} catch(e) {{}} }},
                rename: async (treeId, oldPath, newPath) => {{ try {{ return !!(await window.qt?.api?.fileTreeRename?.(treeId, oldPath, newPath)); }} catch(e) {{ return false; }} }}
            }},
            command: {{
                showNativePopupMenu: async (model, anchor) => {{ try {{ await window.qt?.api?.commandShowNativePopupMenu?.(JSON.stringify(model || {{}}), JSON.stringify(anchor || {{}})); }} catch(e) {{}} }}
            }},
            aes: {{
                decrypt: async (encryptedData, iv, secretKey) => {{ try {{ return (await window.qt?.api?.aesDecrypt?.(encryptedData, iv, secretKey)) || ''; }} catch(e) {{ return ''; }} }}
            }},
            shell: {{
                openExternal: async (url, options) => {{ try {{ await window.qt?.api?.openExternal?.(url); }} catch(e) {{ console.error('[Qt] shell.openExternal error:', e); }} }}
            }},
            copilot: {{
                getAuthMessage: async (headers) => {{
                    const r = await __qtCallJson('copilotGetAuthMessage', null, JSON.stringify(headers || {{}}));
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }},
                getCopilotToken: async (device_code, headers) => {{
                    const r = await __qtCallJson('copilotGetCopilotToken', null, device_code, JSON.stringify(headers || {{}}));
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }},
                saveCopilotToken: async (access_token) => {{ try {{ await window.qt?.api?.copilotSaveCopilotToken?.(access_token); }} catch(e) {{}} }},
                getToken: async (headers) => {{
                    const r = await __qtCallJson('copilotGetToken', null, JSON.stringify(headers || {{}}));
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }},
                logout: async () => {{ try {{ await window.qt?.api?.copilotLogout?.(); }} catch(e) {{}} }},
                getUser: async (token) => {{
                    const r = await __qtCallJson('copilotGetUser', null, token);
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }}
            }},
            externalApps: {{
                detectInstalled: async () => {{ return await __qtCallJson('externalAppsDetectInstalled', []); }}
            }},
            nutstore: {{
                getSSOUrl: async () => {{ try {{ return (await window.qt?.api?.nutstoreGetSsoUrl?.()) || ''; }} catch(e) {{ return ''; }} }},
                decryptToken: async (token) => {{ try {{ return (await window.qt?.api?.nutstoreDecryptToken?.(token)) || ''; }} catch(e) {{ return ''; }} }},
                getDirectoryContents: async (token, path) => {{ return await __qtCallJson('nutstoreGetDirectoryContents', [], token, path); }}
            }},
            quoteToMainWindow: async (text) => {{ try {{ await window.qt?.api?.quoteToMainWindow?.(text); }} catch(e) {{}} }},
            trace: {{
                getData: async (topicId, traceId) => {{ return null; }},
                cleanLocalData: async () => {{}}
            }},
            shortcut: {{
                onRegistrationConflict: (callback) => {{ return function() {{}}; }}
            }},
            cache: {{
                broadcastSync: (message) => {{ /* Houdini 场景通常单窗口，暂不支持跨窗口广播 */ }},
                onSync: (callback) => {{ return function() {{}}; }},
                getAllShared: async () => {{ return await __qtCallJson('cacheGetAllShared', {{}}); }}
            }},
            storageMonitor: {{
                getHealth: async () => {{ return await __qtCallJson('storageMonitorGetHealth', {{ level: 'ok', freeBytes: 0, totalBytes: 0, checkedAt: Date.now() }}); }},
                onHealthChange: (callback) => {{ return function() {{}}; }}
            }},
            preference: {{
                get: async (key) => {{ return await __qtCallJson('preferenceGet', undefined, key); }},
                set: async (key, value) => {{ try {{ await window.qt?.api?.preferenceSet?.(key, JSON.stringify(value === undefined ? null : value)); }} catch(e) {{ console.error('[Qt] preference.set error:', e); }} }},
                getMultipleRaw: async (keys) => {{ return await __qtCallJson('preferenceGetMultipleRaw', {{}}, JSON.stringify(keys || [])); }},
                setMultiple: async (updates) => {{ try {{ await window.qt?.api?.preferenceSetMultiple?.(JSON.stringify(updates || {{}})); }} catch(e) {{ console.error('[Qt] preference.setMultiple error:', e); }} }},
                getAll: async () => {{ return await __qtCallJson('preferenceGetAll', {{}}); }},
                subscribe: async (keys) => {{ /* 无跨进程 push 机制，前端读取仍走 get/getAll */ }},
                onChanged: (callback) => {{ return function() {{}}; }}
            }},
            dataApi: {{
                request: async (req) => {{
                    try {{
                        const r = await window.qt?.api?.dataApiRequest?.(JSON.stringify(req || {{}}));
                        return r ? JSON.parse(r) : {{ id: req?.id || '', status: 500, error: {{ code: 'INTERNAL', message: 'no response' }}, metadata: {{ duration: 0, timestamp: Date.now() }} }};
                    }} catch(e) {{
                        return {{ id: req?.id || '', status: 500, error: {{ code: 'INTERNAL', message: String(e) }}, metadata: {{ duration: 0, timestamp: Date.now() }} }};
                    }}
                }},
                onDataChanged: (callback) => {{ return function() {{}}; }}
            }},
            ipcApi: {{
                request: async (route, input, meta) => {{
                    try {{
                        const r = await window.qt?.api?.ipcApiRequest?.(route, JSON.stringify(input === undefined ? null : input));
                        return r ? JSON.parse(r) : {{ ok: false, error: {{ code: 'INTERNAL', message: 'no response' }} }};
                    }} catch(e) {{
                        return {{ ok: false, error: {{ code: 'INTERNAL', message: String(e) }} }};
                    }}
                }},
                on: (event, callback) => {{ return function() {{}}; }}
            }},
            skill: {{
                readSkillFile: async (skillId, filename) => {{ return await __qtCallJson('skillReadFile', {{ success: false, error: 'skill read failed' }}, skillId, filename); }},
                listFiles: async (skillId) => {{ return await __qtCallJson('skillListFiles', {{ success: false, error: 'skill list failed' }}, skillId); }}
            }},
            lanTransfer: {{
                startScan: async () => {{ return await __qtCallJson('lanTransferStartScan', {{ services: [], isScanning: false, lastUpdatedAt: Date.now() }}); }},
                stopScan: async () => {{ return await __qtCallJson('lanTransferStopScan', {{ services: [], isScanning: false, lastUpdatedAt: Date.now() }}); }},
                connect: async (payload) => {{
                    const r = await __qtCallJson('lanTransferConnect', null, JSON.stringify(payload || {{}}));
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }},
                disconnect: async () => {{ try {{ await window.qt?.api?.lanTransferDisconnect?.(); }} catch(e) {{}} }},
                onServicesUpdated: (callback) => {{ return function() {{}}; }},
                onClientEvent: (callback) => {{ return function() {{}}; }},
                sendFile: async (filePath) => {{
                    const r = await __qtCallJson('lanTransferSendFile', null, filePath);
                    if (r && r.error) throw new Error(r.error);
                    return r;
                }},
                cancelTransfer: async () => {{ try {{ await window.qt?.api?.lanTransferCancelTransfer?.(); }} catch(e) {{}} }}
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
        unmaximize: async () => {{ try {{ await window.qt?.api?.unmaximize?.() }} catch(e) {{}} }},
        close: async () => {{ try {{ await window.qt?.api?.closeWindow?.() }} catch(e) {{}} }},
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
    
    // ========== DEBUG: 全局错误捕获 ==========
    window.addEventListener('error', function(e) {{
        let errorDetails = e.message;
        try {{
            if (e.error) {{
                if (e.error.stack) {{
                    errorDetails += '\\nStack: ' + e.error.stack;
                }} else if (typeof e.error === 'object') {{
                    errorDetails += ' ' + JSON.stringify(e.error);
                }} else {{
                    errorDetails += ' ' + String(e.error);
                }}
            }}
        }} catch (err) {{
            errorDetails += ' [Error serializing details]';
        }}
        console.error('[Qt] Global error:', errorDetails, e.filename, e.lineno);
    }});
    
    // ========== DEBUG: 检查 Qt Bridge 状态 ==========
    console.log('[Qt] ============ INJECTION LOADED ============');
    if (window.qt && window.qt.api) {{
        // console.log('[Qt] Available API methods:', Object.keys(window.qt.api));
    }}

    // 提供 window.api.file 接口
    window.api.file = window.api.file || {{}};
    
    if (!window.api.file.isTextFile) {{
        window.api.file.isTextFile = async function(filePath) {{ 
            try {{ 
                return await window.qt?.api?.isTextFile?.(filePath) 
            }} catch(e) {{ 
                return false 
            }} 
        }};
    }}

    if (!window.api.file.select) {{
        window.api.file.select = async function(options) {{ 
            try {{ 
                const result = await window.qt?.api?.fileSelect?.(JSON.stringify(options||{{}}));
                return (typeof result==='string')? JSON.parse(result): (result||[]);
            }} catch(e) {{ 
                console.error('[Qt] file.select error:', e);
                return [];
            }} 
        }};
    }}

    if (!window.api.file.selectFolder) {{
        window.api.file.selectFolder = async function() {{ 
            try {{ 
                const result = await window.qt?.api?.selectFolder?.()
                return (typeof result==='string' && result) ? result : null
            }} catch(e) {{ 
                console.error('[Qt] selectFolder error:', e);
                return null 
            }} 
        }};
    }}

    if (!window.api.file.binaryImage) {{
        window.api.file.binaryImage = async function(fileId) {{ 
            try {{ 
                const r = await window.qt?.api?.binaryImage?.(fileId)
                return (typeof r==='string')? JSON.parse(r): (r||null)
            }} catch(e) {{ 
                return null 
            }} 
        }};
    }}

    // 图片代理：下载外部 URL 图片 → base64 data URL（前端无外网时使用）
    if (!window.api.proxyImage) {{
        window.api.proxyImage = async function(url) {{
            try {{
                const backendUrl = window.__CHERRY_BACKEND_URL || '';
                if (!backendUrl) return null;
                const resp = await fetch(backendUrl + '/api/v1/proxy/image', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{ url }})
                }});
                const data = await resp.json();
                if (data.error) {{
                    console.error('[proxyImage] backend error:', data.error);
                    return null;
                }}
                return data.dataUrl || null;
            }} catch(e) {{
                console.error('[proxyImage] error:', e);
                return null;
            }}
        }};
    }}

    if (!window.api.file.openPath) {{
        window.api.file.openPath = async function(path) {{
            try {{
                return await window.qt?.api?.openPath?.(path)
            }} catch(e) {{
                console.error('[Qt] file.openPath error:', e);
                return false;
            }} 
        }};
    }}

    if (!window.api.file.openFileWithRelativePath) {{
        window.api.file.openFileWithRelativePath = async function(relativePath, basePath) {{ 
            try {{ 
                // 如果提供了 basePath，则拼接路径
                let fullPath = relativePath;
                if (basePath) {{
                    fullPath = basePath + '/' + relativePath;
                }}
                return await window.qt?.api?.openPath?.(fullPath) 
            }} catch(e) {{ 
                console.error('[Qt] file.openFileWithRelativePath error:', e);
                return false;
            }} 
        }};
    }}

    if (!window.api.file.upload) {{
        window.api.file.upload = async function(fileMetadata) {{ 
            try {{ 
                const result = await window.qt?.api?.fileUpload?.(JSON.stringify(fileMetadata||{{}}));
                if (typeof result === 'string') {{
                    const parsed = JSON.parse(result);
                    if (parsed.error) {{
                        console.error('[Qt] file.upload error:', parsed.error);
                        throw new Error(parsed.error);
                    }}
                    return parsed;
                }}
                return result || fileMetadata;
            }} catch(e) {{ 
                console.error('[Qt] file.upload error:', e);
                throw e;
            }} 
        }};
    }}

    if (!window.api.file.delete) {{
        window.api.file.delete = async function(filename) {{ 
            try {{ 
                return await window.qt?.api?.fileDelete?.(filename);
            }} catch(e) {{ 
                console.error('[Qt] file.delete error:', e);
                return false;
            }} 
        }};
    }}

    if (!window.api.file.saveImage) {{
        window.api.file.saveImage = async function(name, data) {{
            try {{
                const result = await window.qt?.api?.saveImage?.(name || 'image', data || '');
                return result ? JSON.parse(result) : null;
            }} catch(e) {{
                console.error('[Qt] file.saveImage error:', e);
                return null;
            }}
        }};
    }}

    if (!window.api.file.saveBase64Image) {{
        window.api.file.saveBase64Image = async function(base64Data) {{
            try {{
                const result = await window.qt?.api?.saveBase64Image?.(base64Data || '');
                if (!result || result === 'null') return null;
                const parsed = JSON.parse(result);
                if (parsed.error) {{
                    console.error('[Qt] file.saveBase64Image error:', parsed.error);
                    return null;
                }}
                return parsed;
            }} catch(e) {{
                console.error('[Qt] file.saveBase64Image error:', e);
                return null;
            }}
        }};
    }}

    if (!window.api.file.savePastedImage) {{
        window.api.file.savePastedImage = async function(imageData, extension) {{
            try {{
                let base64Str = '';
                if (imageData instanceof Uint8Array || imageData instanceof ArrayBuffer) {{
                    const bytes = new Uint8Array(imageData);
                    let binary = '';
                    for (let i = 0; i < bytes.length; i++) {{
                        binary += String.fromCharCode(bytes[i]);
                    }}
                    base64Str = btoa(binary);
                }} else if (typeof imageData === 'string') {{
                    base64Str = imageData;
                }}
                const result = await window.qt?.api?.savePastedImage?.(base64Str, extension || '.png');
                if (!result || result === 'null') return null;
                const parsed = JSON.parse(result);
                if (parsed.error) {{
                    console.error('[Qt] file.savePastedImage error:', parsed.error);
                    return null;
                }}
                return parsed;
            }} catch(e) {{
                console.error('[Qt] file.savePastedImage error:', e);
                return null;
            }}
        }};
    }}

    // 提供 window.api.knowledgeBase 知识库 API
    window.api.knowledgeBase = window.api.knowledgeBase || {{
        create: async function(params) {{
            try {{
                const r = await window.qt?.api?.knowledgeBaseCreate?.(JSON.stringify(params||{{}}));
                return (typeof r === 'string') ? JSON.parse(r) : r;
            }} catch(e) {{
                console.error('[Qt] knowledgeBase.create error:', e);
                throw e;
            }}
        }},
        add: async function(payload) {{
            try {{
                const r = await window.qt?.api?.knowledgeBaseAdd?.(JSON.stringify(payload||{{}}));
                return (typeof r === 'string') ? JSON.parse(r) : r;
            }} catch(e) {{
                console.error('[Qt] knowledgeBase.add error:', e);
                throw e;
            }}
        }},
        remove: async function(params) {{
            try {{
                const r = await window.qt?.api?.knowledgeBaseRemove?.(JSON.stringify(params||{{}}));
                return (typeof r === 'string') ? JSON.parse(r) : r;
            }} catch(e) {{
                console.error('[Qt] knowledgeBase.remove error:', e);
                return {{ success: false }};
            }}
        }},
        search: async function(params) {{
            try {{
                const r = await window.qt?.api?.knowledgeBaseSearch?.(JSON.stringify(params||{{}}));
                return (typeof r === 'string') ? JSON.parse(r) : (r || []);
            }} catch(e) {{
                console.error('[Qt] knowledgeBase.search error:', e);
                return [];
            }}
        }},
        rerank: async function(params) {{
            try {{
                const r = await window.qt?.api?.knowledgeBaseRerank?.(JSON.stringify(params||{{}}));
                return (typeof r === 'string') ? JSON.parse(r) : (r || []);
            }} catch(e) {{
                console.error('[Qt] knowledgeBase.rerank error:', e);
                return [];
            }}
        }},
        delete: async function(kbId) {{
            try {{
                return await window.qt?.api?.knowledgeBaseDelete?.(kbId);
            }} catch(e) {{
                console.error('[Qt] knowledgeBase.delete error:', e);
                return false;
            }}
        }},
        reset: async function(params) {{
            try {{
                const r = await window.qt?.api?.knowledgeBaseReset?.(JSON.stringify(params||{{}}));
                return (typeof r === 'string') ? JSON.parse(r) : r;
            }} catch(e) {{
                console.error('[Qt] knowledgeBase.reset error:', e);
                return {{ success: false }};
            }}
        }},
        checkQuota: async function(params) {{
            try {{
                const r = await window.qt?.api?.knowledgeBaseCheckQuota?.(JSON.stringify(params||{{}}));
                return (typeof r === 'string') ? JSON.parse(r) : (r || {{ withinQuota: true }});
            }} catch(e) {{
                console.error('[Qt] knowledgeBase.checkQuota error:', e);
                return {{ withinQuota: true }};
            }}
        }}
    }};
    
    // 提供 window.api.ollama 快捷接口（兼容 Cherry Studio）
    window.api.ollama = window.api.ollama || {{
        list: async function(options) {{
            console.log('[Qt] window.api.ollama.list called');
            try {{
                const r = await window.qt?.api?.ollamaListModels?.(JSON.stringify(options||{{}}));
                return (typeof r==='string')? JSON.parse(r): (r||{{object: 'list', data: []}});
            }} catch(e) {{
                console.error('[Qt] ollama.list error:', e);
                return {{ object: 'list', data: [] }};
            }}
        }},
        listModels: async function(options) {{
            console.log('[Qt] window.api.ollama.listModels called');
            return window.api.ollama.list(options);
        }}
    }};
    
    // 提供 window.api.config
    window.api.config = window.api.config || {{
        get: async (key) => {{ return null; }},
        set: async (key, value) => {{ return true; }},
        setConfig: async (config) => {{
            try {{
                return await window.qt?.api?.setConfig?.(JSON.stringify(config||{{}}));
            }} catch(e) {{ return false; }}
        }}
    }};

    // 提供 window.api.models
    window.api.models = window.api.models || {{
        list: async (config) => {{
            try {{
                const r = await window.qt?.api?.modelsList?.(JSON.stringify(config||{{}}));
                return (typeof r==='string')? JSON.parse(r): (r||{{data: [], total: 0}});
            }} catch(e) {{ return {{data: [], total: 0}}; }}
        }},
        setConfig: async (config) => {{
            try {{
                return await window.qt?.api?.modelsSetConfig?.(JSON.stringify(config||{{}}));
            }} catch(e) {{ return false; }}
        }}
    }};
    
    // ========== 关键修复：使用 Proxy 拦截 window.api.memory ==========
    console.log('[Qt] Setting up memory API with Proxy...');
    
    // 创建 memory API 的实现
    const __qtMemoryImpl = {{
        list: async (config) => {{
            console.log('[Qt Proxy] memory.list called');
            try {{
                const r = await window.qt?.api?.memoryList?.(JSON.stringify(config||{{}}));
                return (typeof r==='string')? JSON.parse(r): (r||{{memories: []}});
            }} catch(e) {{ 
                console.error('[Qt Proxy] memory.list error:', e);
                return {{memories: []}}; 
            }}
        }},
        add: async (messages, options) => {{
            console.log('[Qt Proxy] memory.add called');
            try {{
                const payload = {{ messages, options }};
                const r = await window.qt?.api?.memoryAdd?.(JSON.stringify(payload||{{}}));
                return (typeof r==='string')? JSON.parse(r): (r||{{memories: []}});
            }} catch(e) {{ 
                console.error('[Qt Proxy] memory.add error:', e);
                return {{memories: []}}; 
            }}
        }},
        search: async (query, options) => {{
            console.log('[Qt Proxy] memory.search called');
            try {{
                const payload = {{ query, options }};
                const r = await window.qt?.api?.memorySearch?.(JSON.stringify(payload||{{}}));
                return (typeof r==='string')? JSON.parse(r): (r||{{memories: []}});
            }} catch(e) {{ 
                console.error('[Qt Proxy] memory.search error:', e);
                return {{memories: []}}; 
            }}
        }},
        delete: async (id) => {{
            console.log('[Qt Proxy] memory.delete called');
            return true;
        }},
        update: async (id, memory, metadata) => {{
            console.log('[Qt Proxy] memory.update called');
            return true;
        }},
        get: async (id) => {{
            console.log('[Qt Proxy] memory.get called');
            return null;
        }},
        setConfig: (config) => {{
            // 关键：完全同步，立即返回
            console.log('[Qt Proxy] memory.setConfig called - IMMEDIATE RETURN');
            // 异步保存但不等待
            setTimeout(() => {{
                try {{
                    if (window.qt?.api?.memorySetConfig) {{
                        window.qt.api.memorySetConfig(JSON.stringify(config || {{}}));
                    }}
                }} catch(e) {{}}
            }}, 0);
            return Promise.resolve(true);
        }},
        deleteUser: async (userId) => {{
            console.log('[Qt Proxy] memory.deleteUser called');
            return true;
        }},
        deleteAllMemoriesForUser: async (userId) => {{
            console.log('[Qt Proxy] memory.deleteAllMemoriesForUser called');
            return true;
        }},
        getUsersList: async () => {{
            console.log('[Qt Proxy] memory.getUsersList called');
            return [];
        }}
    }};
    
    // 使用 Proxy 拦截对 memory 属性的访问
    const memoryProxy = new Proxy(__qtMemoryImpl, {{
        get(target, prop) {{
            console.log('[Qt Proxy] memory.' + String(prop) + ' accessed');
            return target[prop];
        }},
        set(target, prop, value) {{
            console.log('[Qt Proxy] Attempted to set memory.' + String(prop) + ' - BLOCKED');
            return true; // 阻止设置，返回 true 表示成功（但实际没有设置）
        }}
    }});
    
    // 直接设置 window.api.memory
    window.api.memory = memoryProxy;
    
    // 尝试用 Object.defineProperty 锁定
    try {{
        Object.defineProperty(window.api, 'memory', {{
            value: memoryProxy,
            writable: false,
            configurable: false
        }});
        console.log('[Qt] window.api.memory locked with Proxy');
    }} catch(e) {{
        console.warn('[Qt] Could not lock window.api.memory:', e);
    }}
    
    console.log('[Qt] Memory API Proxy installed');
    
    // 添加可见的调试标记
    document.title = '[Qt] ' + (document.title || 'Cherry Studio');
    
    // 定期重新应用 Proxy，防止被覆盖
    const __reapplyMemoryProxy = () => {{
        if (!window.api) window.api = {{}};
        if (window.api.memory !== memoryProxy) {{
            console.warn('[Qt] window.api.memory was replaced, reapplying Proxy...');
            try {{
                Object.defineProperty(window.api, 'memory', {{
                    value: memoryProxy,
                    writable: false,
                    configurable: true
                }});
            }} catch(e) {{
                window.api.memory = memoryProxy;
            }}
        }}
    }};
    setInterval(__reapplyMemoryProxy, 50);
    
    // 页面加载完成后再次应用
    if (document.readyState === 'complete') {{
        __reapplyMemoryProxy();
    }} else {{
        window.addEventListener('load', __reapplyMemoryProxy);
    }}
    
    // 提供 window.api.network 接口（全部直连后端 HTTP）
    window.api.network = window.api.network || {{}};
    window.api.network.fetchProxy = window.api.network.fetchProxy || async function(config) {{
        try {{
            const _bu = window.__CHERRY_BACKEND_URL || '';
            if (!_bu) return {{ error: 'No backend URL' }};
            const resp = await fetch(_bu + '/api/v1/network/fetch', {{
                method: 'POST',
                headers: {{ 'Content-Type': 'application/json', 'X-Session-Id': window.__CHERRY_SESSION_ID || '' }},
                body: JSON.stringify(config || {{}})
            }});
            return await resp.json();
        }} catch(e) {{
            return {{ error: String(e) }}
        }}
    }};
    window.api.network.search = async function(config) {{
        try {{
            const _bu = window.__CHERRY_BACKEND_URL || '';
            if (!_bu) return {{ success: false, error: 'No backend URL' }};
            const resp = await fetch(_bu + '/api/v1/network/search', {{
                method: 'POST',
                headers: {{ 'Content-Type': 'application/json', 'X-Session-Id': window.__CHERRY_SESSION_ID || '' }},
                body: JSON.stringify(config || {{}})
            }});
            return await resp.json();
        }} catch(e) {{
            return {{ success: false, error: String(e) }}
        }}
    }};
    window.api.network.ollamaListModels = window.api.network.ollamaListModels || async function(options) {{ 
            try {{ 
                const _bu = window.__CHERRY_BACKEND_URL || '';
                if (!_bu) return {{ object: 'list', data: [] }};
                const resp = await fetch(_bu + '/api/v1/models/ollama-list', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json', 'X-Session-Id': window.__CHERRY_SESSION_ID || '' }},
                    body: JSON.stringify(options || {{}})
                }});
                return await resp.json();
        }} catch(e) {{ 
            console.error('[Qt] ollamaListModels error:', e);
            return {{ object: 'list', data: [] }} 
        }} 
    }};
    window.api.network.ollamaPullModel = window.api.network.ollamaPullModel || async function(options) {{ 
            try {{ 
                const _bu = window.__CHERRY_BACKEND_URL || '';
                if (!_bu) return {{ success: false, error: 'No backend URL' }};
                const resp = await fetch(_bu + '/api/v1/models/ollama-pull', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json', 'X-Session-Id': window.__CHERRY_SESSION_ID || '' }},
                    body: JSON.stringify(options || {{}})
                }});
                return await resp.json();
        }} catch(e) {{ 
            return {{ success: false, error: String(e) }} 
        }} 
    }};
    window.api.network.modelList = window.api.network.modelList || async function(config) {{ 
            try {{ 
                const _bu = window.__CHERRY_BACKEND_URL || '';
                if (!_bu) return {{ object: 'list', data: [] }};
                const resp = await fetch(_bu + '/api/v1/models/list', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json', 'X-Session-Id': window.__CHERRY_SESSION_ID || '' }},
                    body: JSON.stringify(config || {{}})
                }});
                return await resp.json();
        }} catch(e) {{ 
            return {{ object: 'list', data: [] }} 
        }} 
    }};
    
    // ── window.qt.network.fetchProxy ───────────────────────────────────────────
    // 使用直连后端的 fetch()（非阻塞）。
    // 流式请求：发起后通过轮询 /api/v1/network/stream-read 收集分片，汇总后返回。
    window.qt = window.qt || {{}};
    window.qt.network = window.qt.network || {{}};
    window.qt.network.fetchProxy = async function(configJson) {{
        const backendUrl = window.__CHERRY_BACKEND_URL || '';
        const sessionId  = window.__CHERRY_SESSION_ID  || '';
        const _headers   = {{ 'Content-Type': 'application/json', 'X-Session-Id': sessionId }};

        if (!backendUrl) {{
            return JSON.stringify({{ error: 'No backend URL available' }});
        }}

        // ── 解析配置 ──────────────────────────────────────────────────────────
        let config;
        try {{
            config = typeof configJson === 'string' ? JSON.parse(configJson) : configJson;
        }} catch(e) {{
            return JSON.stringify({{ error: 'invalid config json: ' + e }});
        }}

        // 检测是否流式（config.stream 或 body.stream）
        let isStream = config.stream === true;
        if (!isStream && config.body) {{
            try {{
                const b = typeof config.body === 'string' ? JSON.parse(config.body) : config.body;
                isStream = b.stream === true;
            }} catch(_) {{}}
        }}

        try {{
            if (isStream) {{
                // ── 流式：启动 + 轮询 stream-read ─────────────────────────────
                const requestId = config.requestId
                    || ('r' + Date.now() + '_' + Math.random().toString(36).slice(2));
                const streamCfg = {{ ...config, stream: true, requestId }};

                // 启动流（立即返回 {{streaming: true, requestId}}）
                const startResp = await fetch(backendUrl + '/api/v1/network/fetch', {{
                    method: 'POST', headers: _headers, body: JSON.stringify(streamCfg)
                }});
                const startData = await startResp.json();

                if (!startData.streaming) {{
                    // 后端直接同步返回（无需轮询）
                    return JSON.stringify(startData);
                }}

                // 轮询收集分片
                const chunks  = [];
                let respHeaders = {{}};
                let status      = 200;
                let done        = false;

                while (!done) {{
                    const pollResp = await fetch(backendUrl + '/api/v1/network/stream-read', {{
                        method: 'POST', headers: _headers,
                        body: JSON.stringify({{ requestId }})
                    }});
                    const chunk = await pollResp.json();

                    switch (chunk.type) {{
                        case 'headers':
                            respHeaders = chunk.headers || {{}};
                            status      = chunk.status  || 200;
                            break;
                        case 'data':
                            chunks.push(chunk.data);
                            break;
                        case 'end':
                            done = true;
                            break;
                        case 'error':
                            return JSON.stringify({{
                                status: chunk.status || 500, statusText: 'Error',
                                headers: {{}}, body: chunk.error || '', error: chunk.error
                            }});
                        case 'empty':
                        default:
                            await new Promise(r => setTimeout(r, 30));
                    }}
                }}

                return JSON.stringify({{
                    status: status, statusText: 'OK',
                    headers: respHeaders, body: chunks.join('')
                }});

            }} else {{
                // ── 非流式：单次 fetch 直连后端 ───────────────────────────────
                const resp = await fetch(backendUrl + '/api/v1/network/fetch', {{
                    method: 'POST', headers: _headers,
                    body: typeof configJson === 'string' ? configJson : JSON.stringify(config)
                }});
                return JSON.stringify(await resp.json());
            }}

        }} catch(e) {{
            console.error('[Qt] ❌ fetchProxy error:', e);
            return JSON.stringify({{ error: String(e) }});
        }}
    }};
    
    // 确保 window.electron.ipcRenderer 存在（防止前端报错）
    window.electron = window.electron || {{}};

    // 模拟 window.electron.process
    window.electron.process = window.electron.process || {{
        platform: '{APP_PLATFORM}',
        type: 'renderer',
        env: {{ NODE_ENV: 'production' }},
        versions: {{ node: '18.0.0', electron: '25.0.0', chrome: '114.0.0' }}
    }};

    window.electron.ipcRenderer = window.electron.ipcRenderer || {{}};
    if (typeof window.electron.ipcRenderer.invoke !== 'function') {{
        window.electron.ipcRenderer.invoke = async function(channel, ...args) {{
            console.log('[Qt] 📡 ipcRenderer.invoke:', channel, args);
            
            if (channel === 'agent-message:get-history') {{
                try {{
                    const payload = args[0] || {{}};
                    const result = await window.qt.api.agentMessageGetHistory(JSON.stringify(payload));
                    return (typeof result === 'string') ? JSON.parse(result) : (result || []);
                }} catch (e) {{
                    console.error('[Qt] agentMessageGetHistory error:', e);
                    return [];
                }}
            }}
            
            if (channel === 'agent-message:persist-exchange') {{
                try {{
                    const payload = args[0] || {{}};
                    return await window.qt.api.agentMessagePersistExchange(JSON.stringify(payload));
                }} catch (e) {{
                    console.error('[Qt] agentMessagePersistExchange error:', e);
                    return false;
                }}
            }}
            
            if (channel.startsWith('mcp:')) {{
                // ── MCP IPC 辅助：直连后端 HTTP ──
                async function _mcpIpcCall(endpoint, body, qtMethod, defaultVal) {{
                    if (!window.__CHERRY_BACKEND_URL || !window.__cherryBackend) {{
                        console.warn('[Qt] MCP IPC: no backend URL for:', endpoint);
                        return defaultVal;
                    }}
                    try {{
                        const result = await window.__cherryBackend.call(endpoint, body || {{}});
                        return result;
                    }} catch (e) {{
                        console.error('[Qt] MCP IPC failed (' + endpoint + '):', e.message);
                        return defaultVal;
                    }}
                }}

                if (channel === 'mcp:list-tools') {{
                    try {{
                        const server = args[0] || {{}};
                        const data = await _mcpIpcCall('/api/v1/mcp/list-tools', server, 'mcpListTools', []);
                        return Array.isArray(data) ? data : (data.tools || []);
                    }} catch (e) {{ return []; }}
                }}
                if (channel === 'mcp:call-tool') {{
                    try {{
                        const payload = args[0] || {{}};
                        return await _mcpIpcCall('/api/v1/mcp/call', payload, 'mcpCallTool',
                            {{ isError: true, content: [] }});
                    }} catch (e) {{ return {{ isError: true, content: [] }}; }}
                }}
                if (channel === 'mcp:start-server') {{
                    try {{
                        const server = args[0] || {{}};
                        return await _mcpIpcCall('/api/v1/mcp/start', server, 'mcpStartServer', {{ ok: false }});
                    }} catch (e) {{ return {{ ok: false, error: String(e) }}; }}
                }}
                if (channel === 'mcp:stop-server') {{
                    try {{
                        const server = args[0] || {{}};
                        return await _mcpIpcCall('/api/v1/mcp/stop', server, 'mcpStopServer', false);
                    }} catch (e) {{ return false; }}
                }}
                if (channel === 'mcp:remove-server') {{
                    try {{
                        const server = args[0] || {{}};
                        return await _mcpIpcCall('/api/v1/mcp/remove', server, 'mcpRemoveServer', true);
                    }} catch (e) {{ return false; }}
                }}
                if (channel === 'mcp:restart-server') {{
                    try {{
                        const server = args[0] || {{}};
                        return await _mcpIpcCall('/api/v1/mcp/restart', server, 'mcpRestartServer', {{ ok: false }});
                    }} catch (e) {{ return {{ ok: false, error: String(e) }}; }}
                }}
                if (channel === 'mcp:check-connectivity') {{
                    try {{
                        const server = args[0] || {{}};
                        const r = await _mcpIpcCall('/api/v1/mcp/check-connectivity', server,
                            'mcpCheckMcpConnectivity', {{ ok: false }});
                        return !!(r && r.ok);
                    }} catch (e) {{ return false; }}
                }}
            }}

            return null;
        }};
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
    console.log('[Qt] 🔍 Monitoring all window.api calls...');
    setTimeout(function() {{
        if (window.api) {{
            ['fetch', 'fetchProxy', 'post', 'get', 'request'].forEach(function(method) {{
                if (window.api[method]) {{
                    const original = window.api[method];
                    window.api[method] = function(...args) {{
                        console.log('[Qt] 🔍 window.api.' + method + ' called:', args[0]);
                        return original.apply(this, args);
                    }};
                }}
            }});
            console.log('[Qt] 🔍 window.api monitor installed');
        }}
        
        // fetchProxy monitor 已移除（调试用途，生产环境无需打印完整请求 payload）
    }}, 100);
    
    // 强制隐藏代理设置 UI（代理完全由代码配置）
    (function hideProxySettings() {{
        try {{
                
                // 注入 CSS 隐藏代理设置相关的 UI 元素
                const style = document.createElement('style');
                style.id = 'cherry-hide-proxy-settings';
                style.textContent = `
                    /* 隐藏代理设置区域 - 通过多种选择器确保覆盖 */
                    /* 设置页面中的代理设置部分 */
                    [class*="proxy" i],
                    [data-testid*="proxy" i],
                    div:has(> [class*="proxy" i]),
                    /* 包含代理模式选择的容器 */
                    .ant-form-item:has([name*="proxy" i]),
                    .ant-form-item:has([id*="proxy" i]),
                    /* 直接匹配代理相关的表单项 */
                    .ant-form-item:has(label:contains("代理")),
                    .ant-form-item:has(label:contains("Proxy")),
                    .ant-form-item:has(label:contains("proxy")),
                    /* 隐藏代理绕过规则 */
                    [class*="bypass" i],
                    [data-testid*="bypass" i] {{
                        display: none !important;
                        visibility: hidden !important;
                        height: 0 !important;
                        overflow: hidden !important;
                        opacity: 0 !important;
                        pointer-events: none !important;
                    }}
                `;
                
                // 等待 DOM 加载完成后注入
                if (document.head) {{
                    document.head.appendChild(style);
                }} else {{
                    document.addEventListener('DOMContentLoaded', () => {{
                        document.head.appendChild(style);
                    }});
                }}
                
                // 使用 MutationObserver 动态隐藏新添加的代理设置元素
                const observer = new MutationObserver((mutations) => {{
                    mutations.forEach((mutation) => {{
                        mutation.addedNodes.forEach((node) => {{
                            if (node.nodeType === Node.ELEMENT_NODE) {{
                                // 检查是否包含代理相关的文本或属性
                                const html = node.outerHTML || '';
                                const text = node.textContent || '';
                                if (
                                    (html.toLowerCase().includes('proxy') || 
                                     html.toLowerCase().includes('代理') ||
                                     html.toLowerCase().includes('bypass') ||
                                     html.toLowerCase().includes('绕过')) &&
                                    !html.includes('cherry-hide-proxy-settings')
                                ) {{
                                    // 检查是否是设置面板中的代理设置
                                    if (node.classList && (
                                        node.className.toLowerCase().includes('proxy') ||
                                        node.className.toLowerCase().includes('bypass') ||
                                        node.className.toLowerCase().includes('settings')
                                    )) {{
                                        node.style.display = 'none';
                                        node.style.visibility = 'hidden';
                                    }}
                                }}
                            }}
                        }});
                    }});
                }});
                
                function startObserving() {{
                    const target = document.body || document.documentElement;
                    if (target) {{
                        observer.observe(target, {{ childList: true, subtree: true }});
                    }} else {{
                        document.addEventListener('DOMContentLoaded', () => {{
                            observer.observe(document.body, {{ childList: true, subtree: true }});
                        }});
                    }}
                }}
                startObserving();
                
                // 定期检查并隐藏代理设置（作为备用方案）
                setInterval(() => {{
                    // 隐藏包含"代理"或"proxy"文本的设置项
                    document.querySelectorAll('label, span, div').forEach(el => {{
                        const text = el.textContent || '';
                        if (
                            (text.includes('代理') || text.toLowerCase().includes('proxy') ||
                             text.includes('绕过') || text.toLowerCase().includes('bypass')) &&
                            !el.closest('#cherry-hide-proxy-settings')
                        ) {{
                            // 找到最近的表单项容器
                            const formItem = el.closest('.ant-form-item, .setting-item, .form-group, [class*="setting"]');
                            if (formItem) {{
                                formItem.style.display = 'none';
                            }}
                        }}
                    }});
                }}, 2000);
                
                console.log('[Qt] Proxy settings UI hidden');
        }} catch(e) {{
            console.warn('[Qt] Error hiding proxy settings:', e);
        }}
    }})();
    
    // ─── 划词助手（Selection Assistant）─── 后端 API 代理，实际 UI 由 Qt 窗口实现 ───
    (function initSelectionProxy() {{
        const _backendUrl = window.__CHERRY_BACKEND_URL || '';

        function _post(path, body) {{
            if (!_backendUrl) return Promise.resolve({{}});
            return fetch(_backendUrl + path, {{
                method: 'POST',
                headers: {{ 'Content-Type': 'application/json' }},
                body: JSON.stringify(body || {{}})
            }}).then(r => r.json()).catch(() => ({{}}));
        }}

        if (!window.api) window.api = {{}};
        window.api.selection = {{
            setEnabled: (enabled) => _post('/api/v1/selection/set-enabled', {{ enabled: !!enabled }}),
            setTriggerMode: (mode) => _post('/api/v1/selection/set-trigger-mode', {{ mode }}),
            hideToolbar: () => Promise.resolve(),
            writeToClipboard: (text) => {{ navigator.clipboard.writeText(text); return Promise.resolve(); }},
            determineToolbarSize: () => Promise.resolve(),
            setFollowToolbar: () => Promise.resolve(),
            setRemeberWinSize: () => Promise.resolve(),
            setFilterMode: (mode) => _post('/api/v1/selection/set-filter-mode', {{ mode }}),
            setFilterList: (list) => _post('/api/v1/selection/set-filter-mode', {{ filterList: list }}),
            processAction: () => Promise.resolve(),
            closeActionWindow: () => Promise.resolve(),
            minimizeActionWindow: () => Promise.resolve(),
            pinActionWindow: () => Promise.resolve(),
            resizeActionWindow: () => Promise.resolve()
        }};

        // Sync enabled/triggerMode/defaultModel from Redux to backend when settings change
        let _lastEnabled = null;
        let _lastTriggerMode = null;
        let _lastModelId = null;
        function syncToBackend() {{
            try {{
                const store = window.store;
                if (!store) return;
                const state = store.getState();
                const ss = state && state.selectionStore;
                if (!ss) return;
                const enabled = !!ss.selectionEnabled;
                const mode = ss.triggerMode || 'selected';
                if (_lastEnabled !== enabled) {{
                    _lastEnabled = enabled;
                    _post('/api/v1/selection/set-enabled', {{ enabled }});
                }}
                if (_lastTriggerMode !== mode) {{
                    _lastTriggerMode = mode;
                    _post('/api/v1/selection/set-trigger-mode', {{ mode }});
                }}
                // Sync default model
                const llm = state && state.llm;
                const modelId = (llm && llm.defaultModel && llm.defaultModel.id) || '';
                if (modelId && _lastModelId !== modelId) {{
                    _lastModelId = modelId;
                    _post('/api/v1/selection/set-model', {{ model: modelId }});
                }}
            }} catch(e) {{}}
        }}
        setInterval(syncToBackend, 3000);
        setTimeout(syncToBackend, 2000);

        console.log('[Qt] Selection assistant proxy initialized (backend API)');
    }})();

    console.log('[Qt] Electron API 注入完成');
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
            console.error('[Qt] Polyfill injection failed:', e);
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
                    console.warn('[Qt] window.api.' + path + ' is not available in Qt runtime, returning default value.');
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
                console.error('[Qt] normalizePayload error:', err);
                return '{}';
            }
        }

        function qtInvokeJson(methodName, payload, fallback, timeoutMs) {
            try {
                var fn = window.qt && window.qt.api && window.qt.api[methodName];
                if (!fn) {
                    return resolved(fallback);
                }
                var arg = normalizePayload(payload);
                var _timeout = (typeof timeoutMs === 'number' && timeoutMs > 0) ? timeoutMs : 30000;

                var callPromise = (arg === undefined) ? fn() : fn(arg);
                if (!callPromise || typeof callPromise.then !== 'function') {
                    callPromise = resolved(callPromise);
                }

                return Promise.race([
                    callPromise.then(function(r) {
                        if (r === undefined || r === null || r === '') return fallback;
                        if (typeof r === 'string') {
                            if (r === 'true') return true;
                            if (r === 'false') return false;
                            try { return JSON.parse(r); } catch(e) { return r; }
                        }
                        return r;
                    }).catch(function(e) {
                        console.error('[Qt] ' + methodName + ' call error:', e.message || e);
                        return fallback;
                    }),
                    new Promise(function(resolve) {
                        setTimeout(function() {
                            console.warn('[Qt] qtInvokeJson timeout:', methodName);
                            resolve(fallback);
                        }, _timeout);
                    })
                ]);
            } catch (err) {
                console.error('[Qt] ' + methodName + ' invoke failed:', err);
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
            console.warn('[Qt] window.api.quit is ignored in Qt runtime.');
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
        systemApi.getGitBashPathInfo = systemApi.getGitBashPathInfo || function () {
            return qtInvokeJson('getGitBashPathInfo', undefined, { path: null, source: null });
        };
        systemApi.setGitBashPath = systemApi.setGitBashPath || function (path) {
            return qtInvokeJson('setGitBashPath', path, false);
        };
        
        var devToolsApi = ensureNamespace('devTools');
        devToolsApi.toggle = devToolsApi.toggle || function () {
            try {
                console.info('[Qt] DevTools toggle requested from UI');
                if (typeof alert === 'function') {
                    alert('当前嵌入的是 Qt WebEngine，暂不支持原版浏览器 DevTools（F12）窗口。\\n\\n请改用终端日志进行调试。');
                } else {
                    console.warn('[Qt] DevTools not available in Qt runtime. Please use console logs instead.');
                }
            } catch (e) {
                console.error('[Qt] DevTools toggle handler error:', e);
            }
            return resolved(false);
        };
        
        var zipApi = ensureNamespace('zip');
        zipApi.compress = zipApi.compress || function (text) {
            try {
                return resolved(window.btoa(unescape(encodeURIComponent(String(text || '')))));
            } catch (e) {
                console.error('[Qt] zip.compress fallback failed:', e);
                return resolved(String(text || ''));
            }
        };
        zipApi.decompress = zipApi.decompress || function (payload) {
            try {
                return resolved(decodeURIComponent(escape(window.atob(String(payload || '')))));
            } catch (e) {
                console.error('[Qt] zip.decompress fallback failed:', e);
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
                console.error('[Qt] fs.read fallback error:', e);
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
                console.error('[Qt] shortcuts.update error:', e);
            }
            return resolved(true);
        };
        
        var knowledgeApi = ensureNamespace('knowledgeBase');
        knowledgeApi.create = function(params) {
            return qtInvokeJson('knowledgeBaseCreate', params, {});
        };
        knowledgeApi.reset = asyncTrue;
        knowledgeApi.delete = function(kbId) {
             return qtInvokeJson('knowledgeBaseDelete', kbId, false);
        };
        knowledgeApi.add = function(payload) {
             return qtInvokeJson('knowledgeBaseAdd', payload, {status: 'failed', message: 'Unknown error'});
        };
        knowledgeApi.remove = asyncTrue;
        knowledgeApi.search = function(params, spanContext) {
             return qtInvokeJson('knowledgeBaseSearch', params, []);
        };
        knowledgeApi.rerank = asyncList;
        knowledgeApi.checkQuota = asyncTrue;
        
        // OpenClaw API — 通过后端 HTTP 检测 Node.js / Git 环境
        var openclawApi = ensureNamespace('openclaw');
        var _bu = function () { return window.__CHERRY_BACKEND_URL || ''; };
        
        openclawApi.checkInstalled = openclawApi.checkInstalled || function () {
            return fetch(_bu() + '/api/v1/openclaw/check-installed')
                .then(function (r) { return r.json(); })
                .catch(function () { return { installed: false, path: null }; });
        };
        openclawApi.checkNodeVersion = openclawApi.checkNodeVersion || function () {
            return fetch(_bu() + '/api/v1/openclaw/check-node')
                .then(function (r) { return r.json(); })
                .catch(function () { return { status: 'not_found' }; });
        };
        openclawApi.checkGitAvailable = openclawApi.checkGitAvailable || function () {
            return fetch(_bu() + '/api/v1/openclaw/check-git')
                .then(function (r) { return r.json(); })
                .catch(function () { return { available: false, path: null }; });
        };
        openclawApi.getNodeDownloadUrl = openclawApi.getNodeDownloadUrl || function () {
            return resolved('https://nodejs.org/en/download');
        };
        openclawApi.getGitDownloadUrl = openclawApi.getGitDownloadUrl || function () {
            return resolved('https://git-scm.com/downloads');
        };
        openclawApi.install = openclawApi.install || function () {
            return fetch(_bu() + '/api/v1/openclaw/install', { method: 'POST' })
                .then(function (r) { return r.json(); })
                .catch(function (e) { return { success: false, message: String(e) }; });
        };
        openclawApi.uninstall = openclawApi.uninstall || function () {
            return fetch(_bu() + '/api/v1/openclaw/uninstall', { method: 'POST' })
                .then(function (r) { return r.json(); })
                .catch(function (e) { return { success: false, message: String(e) }; });
        };
        openclawApi.startGateway = openclawApi.startGateway || function (port) {
            return fetch(_bu() + '/api/v1/openclaw/start-gateway', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ port: port })
            }).then(function (r) { return r.json(); })
              .catch(function (e) { return { success: false, message: String(e) }; });
        };
        openclawApi.stopGateway = openclawApi.stopGateway || function () {
            return fetch(_bu() + '/api/v1/openclaw/stop-gateway', { method: 'POST' })
                .then(function (r) { return r.json(); })
                .catch(function (e) { return { success: false, message: String(e) }; });
        };
        openclawApi.restartGateway = openclawApi.restartGateway || function () {
            return fetch(_bu() + '/api/v1/openclaw/restart-gateway', { method: 'POST' })
                .then(function (r) { return r.json(); })
                .catch(function (e) { return { success: false, message: String(e) }; });
        };
        openclawApi.getStatus = openclawApi.getStatus || function () {
            return fetch(_bu() + '/api/v1/openclaw/get-status')
                .then(function (r) { return r.json(); })
                .catch(function () { return { status: 'stopped', port: 0 }; });
        };
        openclawApi.checkHealth = openclawApi.checkHealth || function () {
            return fetch(_bu() + '/api/v1/openclaw/check-health')
                .then(function (r) { return r.json(); })
                .catch(function () { return { status: 'unhealthy', gatewayPort: 0 }; });
        };
        openclawApi.getDashboardUrl = openclawApi.getDashboardUrl || function () {
            return fetch(_bu() + '/api/v1/openclaw/get-dashboard-url')
                .then(function (r) { return r.json(); })
                .then(function (d) { return d.url || ''; })
                .catch(function () { return ''; });
        };
        openclawApi.syncConfig = openclawApi.syncConfig || function (provider, model) {
            return fetch(_bu() + '/api/v1/openclaw/sync-config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ provider: provider, model: model })
            }).then(function (r) { return r.json(); })
              .catch(function (e) { return { success: false, message: String(e) }; });
        };
        openclawApi.getChannels = openclawApi.getChannels || function () {
            return fetch(_bu() + '/api/v1/openclaw/get-channels')
                .then(function (r) { return r.json(); })
                .then(function (d) { return d.channels || []; })
                .catch(function () { return []; });
        };
        
        // Analytics API (Qt 环境中静默忽略)
        var analyticsApi = ensureNamespace('analytics');
        analyticsApi.trackTokenUsage = analyticsApi.trackTokenUsage || function () {
            return resolved(undefined);
        };
        
        // StoreSync API (Qt 单窗口模式，无需跨窗口同步)
        var storeSyncApi = ensureNamespace('storeSync');
        storeSyncApi.subscribe = storeSyncApi.subscribe || function () { return resolved(undefined); };
        storeSyncApi.unsubscribe = storeSyncApi.unsubscribe || function () { return resolved(undefined); };
        storeSyncApi.onUpdate = storeSyncApi.onUpdate || function () { return resolved(undefined); };
        
        // AgentTools API
        // Phase 3: 权限审批的主流程是 Python 后台线程订阅 sidecar 的
        // `/v1/agent-permission-events` SSE 并弹出 PySide6 原生对话框直接回传
        // sidecar，完全绕开前端；这里保留 respondToPermission 只是为了兼容前端
        // 万一自行触发的审批 UI（例如未来接入 IPC 推送 pending 权限到
        // toolPermissions store 的场景），通过 agentApiProxy 转发到 sidecar 的
        // 审批接口。
        var agentToolsApi = ensureNamespace('agentTools');
        agentToolsApi.respondToPermission = function (payload) {
            try {
                var requestId = payload && payload.requestId;
                if (!requestId) {
                    console.warn('[Qt] agentTools.respondToPermission: missing requestId');
                    return resolved({ success: false, message: 'missing requestId' });
                }
                if (!(window.qt && window.qt.api && window.qt.api.agentApiProxy)) {
                    console.warn('[Qt] agentTools.respondToPermission: agentApiProxy bridge unavailable');
                    return resolved({ success: false, message: 'agentApiProxy unavailable' });
                }
                var request = {
                    method: 'POST',
                    path: '/v1/agent-permission-events/' + encodeURIComponent(requestId) + '/respond',
                    body: {
                        behavior: payload.behavior,
                        updatedInput: payload.updatedInput,
                        message: payload.message
                    }
                };
                return window.qt.api.agentApiProxy(JSON.stringify(request)).then(function (raw) {
                    try {
                        var data = (typeof raw === 'string' && raw) ? JSON.parse(raw) : null;
                        if (data && data.error) {
                            return { success: false, message: data.error };
                        }
                    } catch (parseErr) {
                        // 204 No Content -> agentApiProxy 返回空字符串，不是错误
                    }
                    return { success: true };
                }).catch(function (e) {
                    console.error('[Qt] agentTools.respondToPermission failed:', e);
                    return { success: false, message: String(e) };
                });
            } catch (e) {
                console.error('[Qt] agentTools.respondToPermission error:', e);
                return resolved({ success: false, message: String(e) });
            }
        };

        // AgentSessionStream API
        // 桌面版通过 Electron 主进程广播 AgentSessionStream_Chunk /
        // AgentSession_Changed IPC 事件，让"未打开该会话窗口时在后台跑完的
        // headless 任务"（例如 Scheduler 定时任务/心跳）也能通知渲染进程刷新
        // UI。Houdini 单窗口架构没有等价的主进程广播——真正的对话流式数据是
        // 渲染进程直接 fetch() sidecar 的 SSE 拿到的（见 messageThunk.ts），
        // 这里只需要提供安全的空实现，避免 useSessionChanged/useSessionStream
        // 等 Hook 里 `window.api.agentSessionStream.onXxx(...)` 因为该命名空间
        // 整体缺失而抛出 TypeError，导致整个智能体页面崩溃。
        var agentSessionStreamApi = ensureNamespace('agentSessionStream');
        agentSessionStreamApi.subscribe = agentSessionStreamApi.subscribe || function (sessionId) {
            return resolved(undefined);
        };
        agentSessionStreamApi.unsubscribe = agentSessionStreamApi.unsubscribe || function (sessionId) {
            return resolved(undefined);
        };
        agentSessionStreamApi.abort = agentSessionStreamApi.abort || function (sessionId) {
            return resolved(undefined);
        };
        agentSessionStreamApi.onChunk = agentSessionStreamApi.onChunk || function (callback) {
            return function () {};
        };
        agentSessionStreamApi.onSessionChanged = agentSessionStreamApi.onSessionChanged || function (callback) {
            return function () {};
        };

        // Phase 4: Skills 商店 —— 直连 sidecar 的 /v1/skills REST，
        // 通过 agentApiProxy 转发（沿用与 AgentApiClient houdiniRequest 相同的桥接方式）。
        function _skillApiCall(method, path, body) {
            if (!(window.qt && window.qt.api && window.qt.api.agentApiProxy)) {
                return Promise.reject(new Error('agentApiProxy bridge unavailable'));
            }
            var request = { method: method, path: path, body: body !== undefined ? body : null };
            return window.qt.api.agentApiProxy(JSON.stringify(request)).then(function (raw) {
                var data;
                try {
                    data = (typeof raw === 'string' && raw) ? JSON.parse(raw) : raw;
                } catch (e) {
                    data = raw; // 非 JSON 响应（例如 skill 文件的 text/plain 内容），原样返回
                }
                if (data && typeof data === 'object' && data.error) {
                    var msg = typeof data.error === 'string' ? data.error : (data.error.message || JSON.stringify(data.error));
                    throw new Error(msg);
                }
                return data;
            });
        }

        function _toInstalledSkill(raw) {
            if (!raw) return raw;
            return {
                id: raw.id,
                name: raw.name || raw.folder || raw.id,
                description: raw.description ?? null,
                folderName: raw.folder || raw.id,
                source: 'local',
                sourceUrl: null,
                namespace: null,
                author: null,
                tags: [],
                contentHash: raw.id,
                isEnabled: raw.enabled !== false,
                createdAt: raw.installedAt ? new Date(raw.installedAt).getTime() : Date.now(),
                updatedAt: raw.installedAt ? new Date(raw.installedAt).getTime() : Date.now()
            };
        }

        var skillApi = ensureNamespace('skill');
        skillApi.list = function (agentId) {
            return _skillApiCall('GET', '/v1/skills').then(function (result) {
                var skills = (result && result.data) || [];
                if (!agentId) {
                    return { success: true, data: skills.map(_toInstalledSkill) };
                }
                // 按 agent 维度覆盖 isEnabled（对应官方 per-agent Skill_Toggle 语义）。
                return _skillApiCall('GET', '/v1/agents/' + encodeURIComponent(agentId)).then(function (agent) {
                    var enabledIds = (agent && agent.configuration && agent.configuration.enabled_skills) || [];
                    var enabledSet = {};
                    enabledIds.forEach(function (id) { enabledSet[id] = true; });
                    var data = skills.map(function (s) {
                        var mapped = _toInstalledSkill(s);
                        mapped.isEnabled = !!enabledSet[s.id];
                        return mapped;
                    });
                    return { success: true, data: data };
                }).catch(function () {
                    return { success: true, data: skills.map(_toInstalledSkill) };
                });
            }).catch(function (e) {
                console.error('[Qt] skill.list error:', e);
                return { success: false, error: String(e) };
            });
        };
        skillApi.install = function (_options) {
            // 官方在线技能市场（claude-plugins.dev / skills.sh / clawhub.ai）搜索安装
            // 未在 Houdini sidecar 中实现，仅支持本地目录/zip 安装。
            console.warn('[Qt] skill.install (marketplace installSource) not supported in Qt runtime; use installFromDirectory/installFromZip instead.');
            return resolved({ success: false, error: 'Marketplace skill install is not supported in the Houdini runtime.' });
        };
        skillApi.uninstall = function (skillId) {
            return _skillApiCall('DELETE', '/v1/skills/' + encodeURIComponent(skillId)).then(function () {
                return { success: true, data: undefined };
            }).catch(function (e) {
                console.error('[Qt] skill.uninstall error:', e);
                return { success: false, error: String(e) };
            });
        };
        skillApi.toggle = function (options) {
            var skillId = options && options.skillId;
            var agentId = options && options.agentId;
            var isEnabled = !!(options && options.isEnabled);
            if (!skillId || !agentId) {
                return resolved({ success: false, error: 'skillId and agentId are required' });
            }
            return _skillApiCall('PATCH', '/v1/agents/' + encodeURIComponent(agentId) + '/skills/' + encodeURIComponent(skillId), { enabled: isEnabled })
                .then(function () {
                    return _skillApiCall('GET', '/v1/skills').then(function (result) {
                        var skills = (result && result.data) || [];
                        var found = skills.filter(function (s) { return s.id === skillId; })[0];
                        var mapped = found ? _toInstalledSkill(found) : null;
                        if (mapped) mapped.isEnabled = isEnabled;
                        return { success: true, data: mapped };
                    });
                })
                .catch(function (e) {
                    console.error('[Qt] skill.toggle error:', e);
                    return { success: false, error: String(e) };
                });
        };
        skillApi.installFromDirectory = function (options) {
            var directoryPath = options && options.directoryPath;
            if (!directoryPath) return resolved({ success: false, error: 'directoryPath is required' });
            return _skillApiCall('POST', '/v1/skills/install-from-directory', { path: directoryPath })
                .then(function (skill) { return { success: true, data: _toInstalledSkill(skill) }; })
                .catch(function (e) {
                    console.error('[Qt] skill.installFromDirectory error:', e);
                    return { success: false, error: String(e) };
                });
        };
        skillApi.installFromZip = function (options) {
            var zipFilePath = options && options.zipFilePath;
            if (!zipFilePath) return resolved({ success: false, error: 'zipFilePath is required' });
            if (!(window.qt && window.qt.api && window.qt.api.readFileAsBase64)) {
                return resolved({ success: false, error: 'readFileAsBase64 bridge unavailable' });
            }
            return window.qt.api.readFileAsBase64(zipFilePath).then(function (raw) {
                var parsed = (typeof raw === 'string') ? JSON.parse(raw) : raw;
                if (parsed && parsed.error) {
                    throw new Error(parsed.error);
                }
                return _skillApiCall('POST', '/v1/skills/install-from-zip-base64', { dataBase64: parsed.base64 });
            }).then(function (skill) {
                return { success: true, data: _toInstalledSkill(skill) };
            }).catch(function (e) {
                console.error('[Qt] skill.installFromZip error:', e);
                return { success: false, error: String(e) };
            });
        };
        skillApi.readSkillFile = function (skillId, filename) {
            return _skillApiCall('GET', '/v1/skills/' + encodeURIComponent(skillId) + '/files/' + filename.split('/').map(encodeURIComponent).join('/'))
                .then(function (text) {
                    return { success: true, data: typeof text === 'string' ? text : JSON.stringify(text) };
                })
                .catch(function (e) {
                    console.error('[Qt] skill.readSkillFile error:', e);
                    return { success: false, error: String(e) };
                });
        };
        skillApi.listFiles = function (skillId) {
            return _skillApiCall('GET', '/v1/skills/' + encodeURIComponent(skillId) + '/files')
                .then(function (result) {
                    var files = (result && result.data) || [];
                    var nodes = files.map(function (relPath) {
                        return { name: relPath.split('/').pop(), path: relPath, type: 'file' };
                    });
                    return { success: true, data: nodes };
                })
                .catch(function (e) {
                    console.error('[Qt] skill.listFiles error:', e);
                    return { success: false, error: String(e) };
                });
        };
        skillApi.listLocal = function (workdir) {
            if (!workdir) return resolved({ success: false, error: 'Invalid workdir' });
            return _skillApiCall('GET', '/v1/skills/list-local?workdir=' + encodeURIComponent(workdir))
                .then(function (result) {
                    return { success: true, data: (result && result.data) || [] };
                })
                .catch(function (e) {
                    console.error('[Qt] skill.listLocal error:', e);
                    return { success: false, error: String(e) };
                });
        };
        
        // 强制覆盖 memory API - 确保在 post-load 阶段也正确设置
        var memoryApi = ensureNamespace('memory');
        console.log('[Qt postLoad] Setting up memory API...');
        
        // 强制覆盖所有方法 - 不使用 ||
        memoryApi.add = async function (messages, options) {
            console.log('[Qt postLoad] memory.add called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memoryAdd) {
                    var payload = { messages: messages, options: options };
                    var r = await window.qt.api.memoryAdd(JSON.stringify(payload));
                    return (typeof r === 'string') ? JSON.parse(r) : (r || { memories: [] });
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.add error:', e);
            }
            memoryStore.entries.push({ id: 'local-' + Date.now() + '-' + Math.random(), messages: messages, ts: Date.now() });
            return { memories: memoryStore.entries };
        };
        
        memoryApi.search = async function (query, options) {
            console.log('[Qt postLoad] memory.search called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memorySearch) {
                    var payload = { query: query, options: options };
                    var r = await window.qt.api.memorySearch(JSON.stringify(payload));
                    return (typeof r === 'string') ? JSON.parse(r) : (r || { memories: [] });
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.search error:', e);
            }
            return { memories: memoryStore.entries.slice() };
        };
        
        memoryApi.list = async function (options) {
            console.log('[Qt postLoad] memory.list called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memoryList) {
                    var r = await window.qt.api.memoryList(JSON.stringify(options || {}));
                    return (typeof r === 'string') ? JSON.parse(r) : (r || { memories: [] });
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.list error:', e);
            }
            return { memories: memoryStore.entries.slice() };
        };
        
        memoryApi.delete = async function (id) {
            console.log('[Qt postLoad] memory.delete called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memoryDelete) {
                    return await window.qt.api.memoryDelete(id);
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.delete error:', e);
            }
            return true;
        };
        
        memoryApi.update = async function (id, memory, metadata) {
            console.log('[Qt postLoad] memory.update called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memoryUpdate) {
                    var payload = { id: id, memory: memory, metadata: metadata };
                    return await window.qt.api.memoryUpdate(JSON.stringify(payload));
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.update error:', e);
            }
            return true;
        };
        
        memoryApi.get = async function (id) {
            console.log('[Qt postLoad] memory.get called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memoryGet) {
                    var r = await window.qt.api.memoryGet(id);
                    return (typeof r === 'string') ? JSON.parse(r) : r;
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.get error:', e);
            }
            return null;
        };
        
        memoryApi.setConfig = function (config) {
            // 完全同步版本 - 立即返回 Promise.resolve(true)，避免任何阻塞
            console.log('[Qt postLoad] memory.setConfig called - returning immediately');
            // 保存到本地存储
            memoryStore.config = config || memoryStore.config || {};
            // 异步保存到后端，但不等待结果
            setTimeout(function() {
                try {
                    if (window.qt && window.qt.api && window.qt.api.memorySetConfig) {
                        var configStr = JSON.stringify(config || {});
                        console.log('[Qt postLoad] Async saving memoryConfig...');
                        window.qt.api.memorySetConfig(configStr).then(function(r) {
                            console.log('[Qt postLoad] memorySetConfig completed:', r);
                        }).catch(function(err) {
                            console.error('[Qt postLoad] memorySetConfig async error:', err);
                        });
                    }
                } catch(e) {
                    console.error('[Qt postLoad] memorySetConfig setTimeout error:', e);
                }
            }, 0);
            return Promise.resolve(true);
        };
        
        memoryApi.deleteUser = async function (userId) {
            console.log('[Qt postLoad] memory.deleteUser called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memoryDeleteUser) {
                    return await window.qt.api.memoryDeleteUser(userId);
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.deleteUser error:', e);
            }
            return true;
        };
        
        memoryApi.deleteAllMemoriesForUser = async function (userId) {
            console.log('[Qt postLoad] memory.deleteAllMemoriesForUser called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memoryDeleteAllMemoriesForUser) {
                    return await window.qt.api.memoryDeleteAllMemoriesForUser(userId);
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.deleteAllMemoriesForUser error:', e);
            }
            return true;
        };
        
        memoryApi.getUsersList = async function () {
            console.log('[Qt postLoad] memory.getUsersList called');
            try {
                if (window.qt && window.qt.api && window.qt.api.memoryGetUsersList) {
                    var r = await window.qt.api.memoryGetUsersList();
                    return (typeof r === 'string') ? JSON.parse(r) : (r || []);
                }
            } catch(e) {
                console.error('[Qt postLoad] memory.getUsersList error:', e);
            }
            return [];
        };
        
        console.log('[Qt postLoad] memory API setup complete');
        
        // 创建一个简单的 setConfig 备用实现
        var __simpleSetConfig = function(config) {
            console.log('[Qt postLoad FALLBACK] memory.setConfig called');
            return Promise.resolve(true);
        };
        
        // 定期检查并确保 setConfig 能快速返回
        setInterval(function() {
            try {
                if (window.api && window.api.memory) {
                    // 直接替换 setConfig
                    window.api.memory.setConfig = __simpleSetConfig;
                }
            } catch(e) {}
        }, 100);
        
        // 添加调试标记到标题
        if (document.title.indexOf('[Qt]') === -1) {
            document.title = '[Qt] ' + document.title;
        }
        
        var fileServiceApi = ensureNamespace('fileService');
        fileServiceApi.upload = fileServiceApi.upload || asyncStub('fileService.upload', { success: false });
        fileServiceApi.list = fileServiceApi.list || asyncList;
        fileServiceApi.delete = fileServiceApi.delete || asyncTrue;
        fileServiceApi.retrieve = fileServiceApi.retrieve || asyncNull;

        var mcpApi = ensureNamespace('mcp');

        // ── MCP 辅助函数（直连后端 HTTP） ─────────────────────────────────────
        function _mcpBackendCall(endpoint, body, qtMethod, defaultValue) {
            if (window.__CHERRY_BACKEND_URL && window.__cherryBackend) {
                return window.__cherryBackend.call(endpoint, body || {})
                    .catch(function(e) {
                        console.error('[Qt] MCP backend call failed (' + endpoint + '):', e.message);
                        return defaultValue;
                    });
            }
            console.warn('[Qt] MCP: no backend URL for:', endpoint);
            return resolved(defaultValue);
        }

        // ── Cherry Studio 内置虚拟服务器判断 ──────────────────────────────────
        // @cherry/hub 是 Cherry Studio "自动" 模式的核心：提供 search / exec 工具。
        // 后端已实现完整的 hub 逻辑，因此 listTools / callTool 需要走后端。
        // start/stop/remove/restart 仍为无操作，直接返回成功。

        // hub 服务器 ID / type 列表（后端会处理这些）
        var _CHERRY_HUB_IDS   = ['hub', '@cherry/hub', 'cherry-hub'];
        // 其他纯虚拟内置（不支持工具调用，直接返回空 / 错误）
        var _CHERRY_OTHER_BUILTIN_IDS = ['in-memory', 'memory', 'thinking'];
        var _CHERRY_BUILTIN_IDS = _CHERRY_HUB_IDS.concat(_CHERRY_OTHER_BUILTIN_IDS);

        function _isHubServer(server) {
            if (!server) return false;
            var id   = (typeof server === 'string') ? server : (server.id || server.serverId || '');
            var type = (typeof server === 'object') ? (server.type || '') : '';
            var idLower = String(id).toLowerCase();
            if (_CHERRY_HUB_IDS.indexOf(idLower) !== -1) return true;
            if (idLower.indexOf('@cherry/') === 0) return true;
            if (['hub', 'inmemory'].indexOf(type.toLowerCase().replace('-','')) !== -1) return true;
            return false;
        }

        function _isCherryBuiltin(server) {
            if (!server) return false;
            var id   = (typeof server === 'string') ? server : (server.id || server.serverId || '');
            var type = (typeof server === 'object') ? (server.type || '') : '';
            var idLower = String(id).toLowerCase();
            if (_CHERRY_BUILTIN_IDS.indexOf(idLower) !== -1) return true;
            if (idLower.indexOf('@cherry/') === 0) return true;
            if (['builtin', 'in-memory', 'memory'].indexOf(type.toLowerCase()) !== -1) return true;
            return false;
        }

        mcpApi.startServer = mcpApi.startServer || function (server) {
            // hub 和其他内置服务器：无操作，直接返回成功
            if (_isCherryBuiltin(server)) return resolved({ ok: true, tools: [] });
            return _mcpBackendCall('/api/v1/mcp/start', server, 'mcpStartServer', { ok: false });
        };
        mcpApi.stopServer = mcpApi.stopServer || function (server) {
            if (_isCherryBuiltin(server)) return resolved(true);
            return _mcpBackendCall('/api/v1/mcp/stop', server, 'mcpStopServer', false);
        };
        mcpApi.removeServer = mcpApi.removeServer || function (server) {
            if (_isCherryBuiltin(server)) return resolved(true);
            return _mcpBackendCall('/api/v1/mcp/remove', server, 'mcpRemoveServer', true);
        };
        mcpApi.restartServer = mcpApi.restartServer || function (server) {
            if (_isCherryBuiltin(server)) return resolved({ ok: true, tools: [] });
            return _mcpBackendCall('/api/v1/mcp/restart', server, 'mcpRestartServer', { ok: false });
        };
        // 强制覆盖 listTools（不用 || 保护），确保始终使用我们的后端实现
        mcpApi.listTools = function (server) {
            var body = (server && typeof server === 'object') ? server : { id: server };

            // hub 服务器：走后端，后端会返回 search / exec 工具定义
            // 其他内置虚拟服务器：直接返回空列表
            if (!_isHubServer(server) && _isCherryBuiltin(server)) {
                return resolved([]);
            }

            return _mcpBackendCall('/api/v1/mcp/list-tools', body, 'mcpListTools', [])
                .then(function(data) {
                    if (data && typeof data === 'object' && !Array.isArray(data) && data.error) {
                        throw new Error(data.error);
                    }
                    return Array.isArray(data) ? data : (data && data.tools) ? data.tools : [];
                });
        };
        mcpApi.listPrompts = mcpApi.listPrompts || function () { return resolved([]); };
        mcpApi.listResources = mcpApi.listResources || function () { return resolved([]); };
        mcpApi.getServerVersion = mcpApi.getServerVersion || function (server) {
            // Cherry Studio 直接把返回值渲染为 React child（<VersionBadge count={version}>），
            // 必须是字符串或 null，不能是对象。
            // 实际版本号未知时返回 null（React 会跳过渲染），避免 "Objects are not valid as a React child" 错误。
            return resolved(null);
        };
        mcpApi.checkMcpConnectivity = mcpApi.checkMcpConnectivity || function (server) {
            var body = (server && typeof server === 'object') ? server : { id: server };
            return _mcpBackendCall('/api/v1/mcp/check-connectivity', body, 'mcpCheckMcpConnectivity', false)
                .then(function(r) { return !!(r && r.ok); });
        };
        mcpApi.getInstallInfo = mcpApi.getInstallInfo || function () {
            return qtInvokeJson('mcpGetInstallInfo', undefined, { dir: '', uvPath: '', bunPath: '' });
        };
        mcpApi.getPrompt = mcpApi.getPrompt || asyncStub('mcp.getPrompt', null);
        mcpApi.getResource = mcpApi.getResource || asyncStub('mcp.getResource', null);
        mcpApi.callTool = mcpApi.callTool || function (payload) {
            // Cherry Studio 传入格式：{ server: {...}, name: "tool", args: {...}, callId }
            // 后端 /api/v1/mcp/call 已同时支持该格式和旧格式
            var body = (typeof payload === 'string') ? JSON.parse(payload) : payload;
            var _callServer = body && (body.server || {});

            // hub 服务器（@cherry/hub）：走后端执行 search / exec
            // 其他内置虚拟服务器：直接返回错误（不支持工具调用）
            if (!_isHubServer(_callServer) && _isCherryBuiltin(_callServer)) {
                var _toolName = body && body.name || 'unknown';
                var _sid = (typeof _callServer === 'string') ? _callServer : (_callServer.id || '');
                return resolved({
                    isError: true,
                    content: [{ type: 'text', text: (
                        'Tool "' + _toolName + '" on server "' + _sid + '" is not available ' +
                        'in the Qt runtime (built-in virtual server).'
                    )}]
                });
            }

            return _mcpBackendCall('/api/v1/mcp/call', body, 'mcpCallTool',
                { isError: true, content: [{ type: 'text', text: 'MCP callTool not available' }] })
                .catch(function(e) {
                    console.error('[Qt] mcpApi.callTool error:', e);
                    return { isError: true, content: [{ type: 'text', text: String(e) }] };
                });
        };
        mcpApi.uploadDxt = mcpApi.uploadDxt || asyncStub('mcp.uploadDxt', { success: false, error: 'Not supported in Qt runtime' });
        mcpApi.abortTool = mcpApi.abortTool || asyncStub('mcp.abortTool', false);
        mcpApi.onServerLog = mcpApi.onServerLog || function () {
            return function() {};
        };
        mcpApi.getServerLogs = mcpApi.getServerLogs || asyncList;

        // ========== HTTP Proxy API (for CORS bypass in Qt WebEngine) ==========
        var httpProxyApi = ensureNamespace('httpProxy');

        // 将毫秒超时统一转换为秒（Cherry Studio 传入 ms，后端使用 s）
        function _normalizeTimeoutToSec(config) {
            var cfg = Object.assign({}, config);
            if (cfg.timeout && cfg.timeout > 300) {
                // 大于 300 视为毫秒，转为秒（最小 5s，最大 300s）
                cfg.timeout = Math.min(300, Math.max(5, Math.ceil(cfg.timeout / 1000)));
            }
            return cfg;
        }

        httpProxyApi.get = async function(config) {
            var _bu = window.__CHERRY_BACKEND_URL || '';
            if (!_bu) return { success: false, error: 'No backend URL' };
            try {
                var normalizedConfig = _normalizeTimeoutToSec(config || {});
                var resp = await fetch(_bu + '/api/v1/network/http-get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Session-Id': window.__CHERRY_SESSION_ID || ''
                    },
                    body: JSON.stringify(normalizedConfig)
                });
                return await resp.json();
            } catch (e) {
                console.error('[Qt] httpProxy.get error:', e);
                return { success: false, error: String(e) };
            }
        };

        httpProxyApi.post = async function(config) {
            var _bu = window.__CHERRY_BACKEND_URL || '';
            if (!_bu) return { success: false, error: 'No backend URL' };
            try {
                var normalizedConfig = _normalizeTimeoutToSec(config || {});
                var resp = await fetch(_bu + '/api/v1/network/http-post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Session-Id': window.__CHERRY_SESSION_ID || ''
                    },
                    body: JSON.stringify(normalizedConfig)
                });
                return await resp.json();
            } catch (e) {
                console.error('[Qt] httpProxy.post error:', e);
                return { success: false, error: String(e) };
            }
        };

        // ========== Search Service API (for Local Search Providers) ==========
        var searchServiceApi = ensureNamespace('searchService');
        
        // In Qt environment, we simulate the search window by using HTTP proxy
        var _searchWindowStates = {};
        
        searchServiceApi.openSearchWindow = async function(uid, show) {
            // In Qt, we don't actually create a window, just track state
            _searchWindowStates[uid] = { opened: true, show: show || false };
            return true;
        };
        
        searchServiceApi.closeSearchWindow = async function(uid) {
            delete _searchWindowStates[uid];
            return true;
        };
        
        searchServiceApi.openUrlInSearchWindow = async function(uid, url) {
            // Use HTTP proxy to fetch the URL content instead of creating a window
            console.log('[Qt] searchService.openUrlInSearchWindow:', url);
            try {
                var response = await httpProxyApi.get({
                    url: url,
                    timeout: 30000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.5'
                    }
                });
                
                if (response.success && response.data) {
                    // Return HTML content like Electron does
                    if (typeof response.data === 'string') {
                        return response.data;
                    }
                    return JSON.stringify(response.data);
                }
                
                console.error('[Qt] searchService.openUrlInSearchWindow failed:', response.error);
                return '<html><body>Error: ' + (response.error || 'Failed to fetch URL') + '</body></html>';
            } catch (e) {
                console.error('[Qt] searchService.openUrlInSearchWindow error:', e);
                return '<html><body>Error: ' + String(e) + '</body></html>';
            }
        };

        var apiServerApi = ensureNamespace('apiServer');
        
        // 强制覆盖 apiServer 方法 - Qt 环境中使用 Python 后端
        console.log('[Qt] Overriding apiServer methods with Python backend...');
        
        apiServerApi.getStatus = async function () {
            try {
                var statusStr = await window.qt?.api?.apiServerStatus?.();
                
                if (typeof statusStr === 'string' && statusStr) {
                    var status = JSON.parse(statusStr);
                    console.log('[Qt] apiServer.getStatus result:', status);
                    // 直接返回后端格式 { running: boolean, config: ApiServerConfig | null }
                    return {
                        running: status.running || false,
                        config: status.config || null
                    };
                } else {
                    console.error('[Qt] apiServerStatus returned invalid result:', statusStr);
                }
            } catch (e) {
                console.error('[Qt] apiServer.getStatus error:', e);
            }
            return { running: false, config: null };
        };
        apiServerApi.start = async function () {
            try {
                var resultStr = await window.qt?.api?.apiServerStart?.();
                
                if (typeof resultStr === 'string' && resultStr) {
                    var result = JSON.parse(resultStr);
                    console.log('[Qt] Parsed result:', result);
                    // 转换为前端期望的格式 { success: boolean, error?: string, port?: number }
                    return {
                        success: result.running || false,
                        error: result.error || null,
                        port: result.port || null,
                        url: result.url || null
                    };
                } else {
                    console.error('[Qt] apiServerStart returned invalid result:', resultStr);
                }
            } catch (e) {
                console.error('[Qt] apiServer.start error:', e);
                return { success: false, error: String(e), port: null };
            }
            return { success: false, error: 'Backend API not available or returned empty result', port: null };
        };
        apiServerApi.restart = async function () {
            try {
                var resultStr = await window.qt?.api?.apiServerRestart?.();
                
                if (typeof resultStr === 'string' && resultStr) {
                    var result = JSON.parse(resultStr);
                    return {
                        success: result.running || false,
                        error: result.error || null
                    };
                }
            } catch (e) {
                console.error('[Qt] apiServer.restart error:', e);
                return { success: false, error: String(e) };
            }
            return { success: false, error: 'Backend API not available or returned empty result' };
        };
        apiServerApi.stop = async function () {
            try {
                var resultStr = await window.qt?.api?.apiServerStop?.();
                
                if (typeof resultStr === 'string' && resultStr) {
                    var result = JSON.parse(resultStr);
                    return {
                        success: !result.running,
                        error: result.error || null
                    };
                }
            } catch (e) {
                console.error('[Qt] apiServer.stop error:', e);
                return { success: false, error: String(e) };
            }
            return { success: false, error: 'Backend API not available or returned empty result' };
        };
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

        var localTransferApi = ensureNamespace('localTransfer');
        localTransferApi.getState = localTransferApi.getState || function () {
            return resolved({ services: [], scanning: false, connected: false });
        };
        localTransferApi.startScan = localTransferApi.startScan || function () {
            return resolved({ services: [], scanning: false, connected: false });
        };
        localTransferApi.stopScan = localTransferApi.stopScan || function () {
            return resolved({ services: [], scanning: false, connected: false });
        };
        localTransferApi.connect = localTransferApi.connect || function () {
            return resolved({ success: false });
        };
        localTransferApi.disconnect = localTransferApi.disconnect || function () {
            return resolved(undefined);
        };
        localTransferApi.onServicesUpdated = localTransferApi.onServicesUpdated || function () {
            return function () {};
        };
        localTransferApi.onClientEvent = localTransferApi.onClientEvent || function () {
            return function () {};
        };
        localTransferApi.sendFile = localTransferApi.sendFile || function () {
            return resolved({ success: false });
        };
        localTransferApi.cancelTransfer = localTransferApi.cancelTransfer || function () {
            return resolved(undefined);
        };

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
        ovmsApi.isSupported = ovmsApi.isSupported || asyncFalse;
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
                console.error('[Qt] config.set error:', e);
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
            // 优先通过 Qt Slot 打开（直接调用 webbrowser.open，不阻塞主线程）
            // 次选：直连后端；兜底：window.open
            try {
                if (window.qt && window.qt.api && typeof window.qt.api.openExternal === 'function') {
                    window.qt.api.openExternal(url);
                    return resolved(true);
                }
            } catch (e) {
                console.warn('[Qt] shell.openExternal qt slot error:', e);
            }
            // 后端直连（后端调用 os.startfile / subprocess）
            const backendUrl = window.__CHERRY_BACKEND_URL || '';
            if (backendUrl) {
                fetch(backendUrl + '/api/v1/files/open-external', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url })
                }).catch(function(e) {
                    console.warn('[Qt] shell.openExternal backend error:', e);
                });
                return resolved(true);
            }
            // 最终降级：在当前标签页打开
            try { window.open(url, '_blank'); } catch(_) {}
            return resolved(true);
        };
        
        var copilotApi = ensureNamespace('copilot');
        copilotApi.getAuthMessage = copilotApi.getAuthMessage || asyncStub('copilot.getAuthMessage', null);
        copilotApi.getCopilotToken = copilotApi.getCopilotToken || asyncStub('copilot.getCopilotToken', null);
        copilotApi.refreshCopilotToken = copilotApi.refreshCopilotToken || asyncStub('copilot.refreshCopilotToken', null);

        // 拦截 LoggerService 的 initWindowSource 方法，自动初始化
        (function interceptLoggerServiceInit() {
            // 方法1: 拦截全局的 LoggerService 类
            if (typeof window !== 'undefined') {
                // 尝试拦截 LoggerService.getInstance
                var originalGetInstance = null;
                try {
                    // 等待 LoggerService 类加载
                    var checkLoggerService = function() {
                        try {
                            // 尝试从各种可能的模块位置获取
                            var LoggerServiceClass = null;
                            
                            // 检查 window 上的 LoggerService
                            if (window.LoggerService && typeof window.LoggerService.getInstance === 'function') {
                                LoggerServiceClass = window.LoggerService;
                            }
                            
                            // 如果找到了 LoggerService 类，拦截 getInstance
                            if (LoggerServiceClass && !LoggerServiceClass.__houdiniIntercepted) {
                                originalGetInstance = LoggerServiceClass.getInstance;
                                LoggerServiceClass.getInstance = function() {
                                    var instance = originalGetInstance.call(this);
                                    // 自动初始化 window source
                                    if (instance && typeof instance.initWindowSource === 'function') {
                                        try {
                                            // 尝试检查 window 属性（可能是私有的）
                                            var currentWindow = instance.window;
                                            if (!currentWindow || currentWindow === '') {
                                                instance.initWindowSource('mainWindow');
                                                console.info('[Qt] LoggerService auto-initialized via getInstance interceptor');
                                            }
                                        } catch(e) {
                                            // 如果无法访问 window 属性，直接尝试初始化
                                            try {
                                                instance.initWindowSource('mainWindow');
                                                console.info('[Qt] LoggerService auto-initialized via getInstance interceptor (fallback)');
                                            } catch(e2) {
                                                // 初始化失败，忽略
                                            }
                                        }
                                    }
                                    return instance;
                                };
                                LoggerServiceClass.__houdiniIntercepted = true;
                                console.info('[Qt] LoggerService.getInstance intercepted');
                            }
                        } catch(e) {
                            // 忽略错误，继续尝试
                        }
                    };
                    
                    // 多次尝试拦截
                    checkLoggerService();
                    setTimeout(checkLoggerService, 100);
                    setTimeout(checkLoggerService, 500);
                    setTimeout(checkLoggerService, 1000);
                    setTimeout(checkLoggerService, 2000);
                } catch(e) {
                    console.error('[Qt] LoggerService interception setup error:', e);
                }
            }
            
            // 方法1.5: 拦截 console.error，在 LoggerService 报错时自动初始化
            if (typeof console !== 'undefined' && console.error) {
                var originalConsoleError = console.error;
                var errorInterceptCount = 0;
                var lastInterceptTime = 0;
                console.error = function() {
                    var args = Array.prototype.slice.call(arguments);
                    var message = args.join(' ');
                    
                    // 检测 LoggerService 的初始化错误
                    if (message && message.indexOf('window source not initialized') >= 0) {
                        var now = Date.now();
                        // 限制拦截频率，避免重复处理
                        if (now - lastInterceptTime > 1000 && errorInterceptCount < 5) {
                            errorInterceptCount++;
                            lastInterceptTime = now;
                            
                            // 尝试找到并初始化 LoggerService
                            setTimeout(function() {
                                try {
                                    var candidates = [];
                                    if (window.loggerService) candidates.push(window.loggerService);
                                    if (window.__loggerService) candidates.push(window.__loggerService);
                                    if (window.__cherryLoggerService) candidates.push(window.__cherryLoggerService);
                                    
                                    // 尝试通过 LoggerService 类获取实例
                                    if (window.LoggerService && typeof window.LoggerService.getInstance === 'function') {
                                        try {
                                            var instance = window.LoggerService.getInstance();
                                            if (instance) candidates.push(instance);
                                        } catch(e) {}
                                    }
                                    
                                    // 尝试查找所有可能的 logger 实例
                                    try {
                                        var props = Object.getOwnPropertyNames(window);
                                        for (var i = 0; i < props.length; i++) {
                                            var prop = props[i];
                                            var obj = window[prop];
                                            if (obj && typeof obj === 'object' && typeof obj.initWindowSource === 'function' && typeof obj.processLog === 'function') {
                                                candidates.push(obj);
                                            }
                                        }
                                    } catch(e) {}
                                    
                                    var initialized = false;
                                    for (var i = 0; i < candidates.length; i++) {
                                        var logger = candidates[i];
                                        if (logger && typeof logger.initWindowSource === 'function') {
                                            try {
                                                // 检查是否已初始化
                                                if (!logger.window || logger.window === '') {
                                                    logger.initWindowSource('mainWindow');
                                                    logger.__houdiniWindowInitialized = true;
                                                    initialized = true;
                                                    console.info('[Qt] LoggerService auto-initialized via error interceptor');
                                                }
                                            } catch(e) {
                                                // 如果无法访问 window 属性，直接尝试初始化
                                                try {
                                                    logger.initWindowSource('mainWindow');
                                                    logger.__houdiniWindowInitialized = true;
                                                    initialized = true;
                                                    console.info('[Qt] LoggerService auto-initialized via error interceptor (fallback)');
                                                } catch(e2) {}
                                            }
                                        }
                                    }
                                    
                                    // 如果还是没找到，尝试拦截 processLog 方法
                                    if (!initialized) {
                                        try {
                                            // 尝试拦截所有可能的 LoggerService 实例的 processLog 方法
                                            for (var i = 0; i < candidates.length; i++) {
                                                var logger = candidates[i];
                                                if (logger && typeof logger.processLog === 'function' && !logger.__processLogIntercepted) {
                                                    var originalProcessLog = logger.processLog;
                                                    logger.processLog = function() {
                                                        // 在调用 processLog 时检查并初始化
                                                        if (!this.window || this.window === '') {
                                                            try {
                                                                this.initWindowSource('mainWindow');
                                                                this.__houdiniWindowInitialized = true;
                                                                console.info('[Qt] LoggerService auto-initialized via processLog interceptor');
                                                            } catch(e) {}
                                                        }
                                                        return originalProcessLog.apply(this, arguments);
                                                    };
                                                    logger.__processLogIntercepted = true;
                                                }
                                            }
                                        } catch(e) {}
                                    }
                                } catch(e) {}
                            }, 10);
                        }
                    }
                    
                    // 调用原始 console.error
                    return originalConsoleError.apply(console, args);
                };
            }
            
            // 方法2: 持续尝试查找并初始化 LoggerService 实例
            var tries = 0;
            var maxTries = 200; // 增加重试次数
            function attempt() {
                tries++;
                try {
                    var candidates = [];
                    // 尝试多种可能的 LoggerService 实例位置
                    if (window.loggerService) { candidates.push(window.loggerService); }
                    if (window.__loggerService) { candidates.push(window.__loggerService); }
                    if (window.__cherryLoggerService) { candidates.push(window.__cherryLoggerService); }
                    
                    // 尝试通过 LoggerService 类获取实例
                    if (window.LoggerService && typeof window.LoggerService.getInstance === 'function') {
                        try {
                            var instance = window.LoggerService.getInstance();
                            if (instance) { candidates.push(instance); }
                        } catch(e) {}
                    }
                    
                    // 尝试通过 Object.getOwnPropertyNames 查找
                    try {
                        var props = Object.getOwnPropertyNames(window);
                        for (var i = 0; i < props.length; i++) {
                            var prop = props[i];
                            if (prop.toLowerCase().includes('logger') && window[prop] && typeof window[prop].initWindowSource === 'function') {
                                candidates.push(window[prop]);
                            }
                        }
                    } catch(e) {}
                    
                    for (var i = 0; i < candidates.length; i++) {
                        var logger = candidates[i];
                        if (logger && typeof logger.initWindowSource === 'function') {
                            // 检查是否已初始化（通过检查 window 属性）
                            var needsInit = false;
                            try {
                                // 尝试访问私有属性（可能失败，但不影响）
                                if (!logger.window || logger.window === '') {
                                    needsInit = true;
                                }
                            } catch(e) {
                                // 如果无法访问，尝试初始化（initWindowSource 会检查）
                                needsInit = true;
                            }
                            
                            if (needsInit && !logger.__houdiniWindowInitialized) {
                                try {
                                    logger.initWindowSource('mainWindow');
                                    logger.__houdiniWindowInitialized = true;
                                    console.info('[Qt] LoggerService window source initialized via bridge');
                                    return; // 成功初始化，退出
                                } catch(e) {
                                    // 初始化失败，继续尝试其他候选
                                }
                            }
                        }
                    }
                    
                    // 如果还没找到，继续尝试
                    if (tries < maxTries) {
                        setTimeout(attempt, 50); // 缩短重试间隔
                    } else if (tries === maxTries) {
                        // 只在最后一次尝试时输出一次警告，避免刷屏
                        if (!window.__houdiniLoggerServiceWarningShown) {
                            window.__houdiniLoggerServiceWarningShown = true;
                            console.warn('[Qt] LoggerService not found after ' + maxTries + ' attempts. This warning is harmless and does not affect functionality.');
                        }
                    }
                } catch (e) {
                    if (tries < maxTries) {
                        setTimeout(attempt, 50);
                    }
                }
            }
            // 立即尝试，也延迟尝试（以防 LoggerService 还没加载）
            attempt();
            setTimeout(attempt, 50);
            setTimeout(attempt, 200);
            setTimeout(attempt, 500);
            setTimeout(attempt, 1000);
            setTimeout(attempt, 2000);
        })();
        
        console.info('[Qt] Extra Cherry Studio APIs initialized for Qt runtime');
    } catch (err) {
        console.error('[Qt] Failed to initialize extra APIs:', err);
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
        if (window.self !== window.top) return;
        // 立即输出调试信息，确认脚本已执行
        console.error('[Qt] 🚀 早期脚本开始执行 - readyState:', document.readyState);
        
        // 立即设置，防止任何早期代码访问时未定义
        if (!window.source) { window.source = 'qt'; }
        if (!window.__WINDOW_SOURCE) { window.__WINDOW_SOURCE = 'qt'; }
        if (!window.__LOGGER_SOURCE) { window.__LOGGER_SOURCE = 'qt'; }
        if (!window.__WINDOW_SOURCE_INITIALIZED) { window.__WINDOW_SOURCE_INITIALIZED = true; }
        
        window.__IS_QT = true;
        window.isQtRuntime = true;
        window.__IS_QT = true;
        
        // 提前尝试初始化 LoggerService（如果已加载）
        (function tryInitLoggerServiceEarly() {
            try {
                var candidates = [];
                if (window.loggerService) { candidates.push(window.loggerService); }
                if (window.__loggerService) { candidates.push(window.__loggerService); }
                if (window.__cherryLoggerService) { candidates.push(window.__cherryLoggerService); }
                
                for (var i = 0; i < candidates.length; i++) {
                    var logger = candidates[i];
                    if (logger && typeof logger.initWindowSource === 'function') {
                        if (!logger.window || logger.window === '') {
                            logger.initWindowSource('mainWindow');
                            console.log('[Qt] LoggerService initialized early');
                        }
                    }
                }
            } catch(e) {
                // 忽略错误，LoggerService 可能还没加载
            }
        })();
        
        // 立即设置 localStorageReady 为 true，避免阻塞应用初始化
        // localStorage 恢复将在后台异步进行，不影响应用启动
        window.__localStorageReady = true;
        window.__pendingScripts = [];
        
        console.error('[Qt] ✅ 早期脚本执行 - __localStorageReady 已设置为 true');
        
        // ========== 关键：在最早期拦截 window.api.memory.setConfig ==========
        // 创建一个立即返回的 setConfig 函数
        window.__qtFastSetConfig = function(config) {
            console.log('[Qt EARLY] memory.setConfig called - FAST RETURN');
            return Promise.resolve(true);
        };
        
        // 拦截对 window.api 的定义
        var __originalApi = null;
        try {
            Object.defineProperty(window, 'api', {
                get: function() {
                    return __originalApi;
                },
                set: function(newApi) {
                    console.log('[Qt EARLY] window.api being set');
                    __originalApi = newApi;
                    // 每当 api 被设置，立即覆盖 memory.setConfig
                    if (newApi && newApi.memory) {
                        console.log('[Qt EARLY] Overriding memory.setConfig');
                        newApi.memory.setConfig = window.__qtFastSetConfig;
                    }
                },
                configurable: true
            });
            console.log('[Qt EARLY] window.api interceptor installed');
        } catch(e) {
            console.error('[Qt EARLY] Could not install window.api interceptor:', e);
        }
        
        // 定期检查并覆盖 setConfig
        setInterval(function() {
            try {
                if (window.api && window.api.memory && window.api.memory.setConfig !== window.__qtFastSetConfig) {
                    window.api.memory.setConfig = window.__qtFastSetConfig;
                }
            } catch(e) {}
        }, 10);
        
        console.error('[Qt] ✅ memory.setConfig 拦截器已安装');
        
        // 异步恢复 localStorage（不阻塞应用启动）
        (function() {
            var startTime = Date.now();
            var maxWaitTime = 5000; // 最多等待 5 秒
            var retryCount = 0;
            var maxRetries = 50; // 最多重试 50 次（5 秒）
            
            function restoreLocalStorage() {
                // 检查超时
                if (Date.now() - startTime > maxWaitTime || retryCount >= maxRetries) {
                    console.error('[Qt] ⚠️ localStorage restore timeout - continuing without restore');
                    return;
                }
                
                if (window.qt && window.qt.api && window.qt.api.fileRead) {
                    window.qt.api.fileRead('localStorage.json').then(function(content) {
                        if (content) {
                            try {
                                const data = JSON.parse(content);
                                for (const key in data) {
                                    localStorage.setItem(key, data[key]);
                                }
                                console.error('[Qt] 🎯 localStorage restored (async):', Object.keys(data).length, 'items');
                            } catch(e) {
                                console.error('[Qt] Restore error:', e.message);
                            }
                        } else {
                            console.error('[Qt] No localStorage file found');
                        }
                    }).catch(function(e) {
                        console.error('[Qt] FileRead error:', e.message || e);
                    });
                } else {
                    // qt.api 还没准备好，100ms 后重试
                    retryCount++;
                    setTimeout(restoreLocalStorage, 100);
                }
            }
            
            // 延迟 100ms 后开始尝试恢复，确保不阻塞主线程
            setTimeout(restoreLocalStorage, 100);
        })();
        
        // 确保 DOMContentLoaded 事件已触发（如果还没触发）
        if (document.readyState === 'loading') {
            // 使用 setTimeout 确保在下一个事件循环中触发
            setTimeout(function() {
                if (document.readyState === 'loading') {
                    document.dispatchEvent(new Event('DOMContentLoaded'));
                    console.error('[Qt] ✅ DOMContentLoaded 事件已手动触发');
                }
            }, 0);
        }
        
        // IndexedDB 手动持久化机制
        setTimeout(function() {
            if ('indexedDB' in window) {
                if (!window.indexedDB) {
                    return;
                }
                
                // 导出 IndexedDB 到文件
                window.__exportIndexedDB = function() {
                    try {
                        const openRequest = window.indexedDB.open('CherryStudio');
                        openRequest.onsuccess = function(event) {
                            try {
                                const db = event.target.result;
                                const storeNames = Array.from(db.objectStoreNames);
                                
                                // 如果数据库还没有任何 objectStore（Dexie schema 尚未初始化完成），
                                // 直接关闭并跳过导出，否则 transaction() 会抛出
                                // "The storeNames parameter was empty" 的 InvalidAccessError。
                                if (!storeNames || storeNames.length === 0) {
                                    db.close();
                                    return;
                                }
                                
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
                            } catch (e) {
                                console.error('[Qt] __exportIndexedDB inner error:', e && e.message);
                            }
                        };
                        openRequest.onerror = function(event) {
                            console.error('[Qt] __exportIndexedDB open error:', event.target.error);
                        };
                    } catch (e) {
                        console.error('[Qt] __exportIndexedDB outer error:', e && e.message);
                    }
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
        
        console.error('[Qt] ✅ 早期LoggerService修复完成 - source:', window.source, '__WINDOW_SOURCE:', window.__WINDOW_SOURCE);
        console.error('[Qt] ✅ __localStorageReady:', window.__localStorageReady);
        console.error('[Qt] ✅ document.readyState:', document.readyState);
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
    if (window.self !== window.top) { /* skip iframe */ } else {
    console.log('[Cherry Studio] 🚀 POST-LOAD SCRIPT EXECUTING!');
    
    // 强制修复 LoggerService
    window.source = 'qt';
    window.__WINDOW_SOURCE = 'qt';
    window.__LOGGER_SOURCE = 'qt';
    window.__WINDOW_SOURCE_INITIALIZED = true;
    window.__IS_QT = true;
    window.isQtRuntime = true;
    window.__IS_QT = true;
    
    console.log('[Cherry Studio] LoggerService修复完成');
    
    // 强制覆盖 apiServer 方法 - 确保使用 Python 后端
    (function() {
        console.error('[Qt] Overriding apiServer methods with Python backend...');
        
        // 确保 window.api.apiServer 存在
        window.api = window.api || {};
        window.api.apiServer = window.api.apiServer || {};
        
        // 强制覆盖 start 方法
        window.api.apiServer.start = async function() {
            console.error('[Qt] apiServer.start called - using Python backend');
            try {
                if (!window.qt || !window.qt.api || !window.qt.api.apiServerStart) {
                    console.error('[Qt] window.qt.api.apiServerStart not available');
                    return { success: false, error: 'Python backend not available' };
                }
                console.error('[Qt] Calling window.qt.api.apiServerStart()...');
                var resultStr = await window.qt.api.apiServerStart();
                console.error('[Qt] apiServerStart returned:', resultStr);
                
                if (typeof resultStr === 'string' && resultStr) {
                    var result = JSON.parse(resultStr);
                    
                    // 如果启动成功且有端口，更新 Redux store
                    if (result.running && result.port && window.store) {
                        console.error('[Qt] Updating Redux store with port:', result.port);
                        try {
                            // 直接 dispatch action 更新端口
                            window.store.dispatch({
                                type: 'settings/setApiServerPort',
                                payload: result.port
                            });
                            // 同时更新 host
                            window.store.dispatch({
                                type: 'settings/setApiServerHost',
                                payload: '127.0.0.1'
                            });
                            // 标记为已启用
                            window.store.dispatch({
                                type: 'settings/setApiServerEnabled',
                                payload: true
                            });
                            console.error('[Qt] Redux store updated successfully!');
                            
                            // 验证更新
                            var state = window.store.getState();
                            console.error('[Qt] Current apiServer config:', JSON.stringify(state.settings.apiServer));
                        } catch (storeErr) {
                            console.error('[Qt] Failed to update Redux store:', storeErr);
                        }
                    }
                    
                    return {
                        success: result.running || false,
                        error: result.error || null,
                        port: result.port || null,
                        url: result.url || null
                    };
                }
            } catch (e) {
                console.error('[Qt] apiServer.start error:', e);
                return { success: false, error: String(e), port: null };
            }
            return { success: false, error: 'Backend API not available or returned empty result', port: null };
        };
        
        // 强制覆盖 stop 方法
        window.api.apiServer.stop = async function() {
            console.error('[Qt] apiServer.stop called - using Python backend');
            try {
                if (!window.qt || !window.qt.api || !window.qt.api.apiServerStop) {
                    return { success: false, error: 'Python backend not available' };
                }
                var resultStr = await window.qt.api.apiServerStop();
                if (typeof resultStr === 'string' && resultStr) {
                    var result = JSON.parse(resultStr);
                    return {
                        success: !result.running,
                        error: result.error || null
                    };
                }
            } catch (e) {
                console.error('[Qt] apiServer.stop error:', e);
                return { success: false, error: String(e) };
            }
            return { success: false, error: 'Backend API not available' };
        };
        
        // 强制覆盖 restart 方法
        window.api.apiServer.restart = async function() {
            console.error('[Qt] apiServer.restart called - using Python backend');
            try {
                if (!window.qt || !window.qt.api || !window.qt.api.apiServerRestart) {
                    return { success: false, error: 'Python backend not available' };
                }
                var resultStr = await window.qt.api.apiServerRestart();
                if (typeof resultStr === 'string' && resultStr) {
                    var result = JSON.parse(resultStr);
                    return {
                        success: result.running || false,
                        error: result.error || null
                    };
                }
            } catch (e) {
                console.error('[Qt] apiServer.restart error:', e);
                return { success: false, error: String(e) };
            }
            return { success: false, error: 'Backend API not available' };
        };
        
        // 强制覆盖 getStatus 方法
        window.api.apiServer.getStatus = async function() {
            console.error('[Qt] apiServer.getStatus called - using Python backend');
            try {
                if (!window.qt || !window.qt.api || !window.qt.api.apiServerStatus) {
                    return { running: false, config: null };
                }
                var statusStr = await window.qt.api.apiServerStatus();
                if (typeof statusStr === 'string' && statusStr) {
                    var status = JSON.parse(statusStr);
                    return {
                        running: status.running || false,
                        config: status.config || null
                    };
                }
            } catch (e) {
                console.error('[Qt] apiServer.getStatus error:', e);
            }
            return { running: false, config: null };
        };
        
        console.error('[Qt] apiServer methods overridden successfully!');
        
        // 添加全局变量来跟踪实际的 API 服务器端口
        window.__houdiniApiServerPort = null;
    })();
    
    // 拦截 Axios 请求，通过后端 HTTP 代理 Agent API
    (function() {
        console.error('[Qt] Installing Agent API proxy...');
        
        // 创建代理版本的 XMLHttpRequest
        const OriginalXHR = window.XMLHttpRequest;
        
        window.XMLHttpRequest = function() {
            const xhr = new OriginalXHR();
            const originalOpen = xhr.open.bind(xhr);
            const originalSend = xhr.send.bind(xhr);
            
            let isAgentApiRequest = false;
            let requestMethod = 'GET';
            let requestUrl = '';
            
            xhr.open = function(method, url, async, user, password) {
                requestMethod = method;
                requestUrl = url;
                
                // 仅代理 Agent 相关请求；模型列表走正常前端链路，
                // 由前端自身的回退逻辑处理，避免调试注入覆盖真实数据。
                if (typeof url === 'string' && url.includes('/v1/agents')) {
                    isAgentApiRequest = true;
                    console.error('[XHR]', method, url);
                }
                
                return originalOpen(method, url, async, user, password);
            };
            
            xhr.send = function(body) {
                if (isAgentApiRequest) {
                    let urlObj;
                    try {
                        urlObj = new URL(requestUrl, window.location.origin);
                    } catch(e) {
                        console.error('[XHR] Invalid URL:', requestUrl, e);
                        return originalSend.call(this, body);
                    }

                    const path = urlObj.pathname + urlObj.search;
                    
                    // 对 /v1/models 请求，直接从 Redux store 获取模型
                    if (path.includes('/v1/models')) {
                        console.error('[XHR] Getting models from Redux store');
                        
                        const state = window.store?.getState?.();
                        const providers = state?.llm?.providers || [];
                        const params = new URLSearchParams(urlObj.search);
                        const providerType = params.get('providerType');
                        
                        console.error('[XHR] Filter providerType:', providerType, '(will be ignored, returning all models)');
                        console.error('[XHR] Total providers:', providers.length);
                        
                        // 从 providers 获取模型
                        let allModels = [];
                        for (const provider of providers) {
                            console.error('[XHR] Checking provider:', provider.id, 'type:', provider.type, 'hasKey:', !!provider.apiKey, 'models:', provider.models?.length);
                            
                            // 跳过没有 API key 的 provider（ollama 除外）
                            if (!provider.apiKey && provider.type !== 'ollama') {
                                console.error('[XHR] Skipping provider (no key):', provider.id);
                                continue;
                            }
                            
                            // 忽略 providerType 过滤，返回所有模型
                            console.error('[XHR] Including provider:', provider.id);
                            
                            const models = provider.models || [];
                            for (const model of models) {
                                allModels.push({
                                    id: model.id,
                                    name: model.name || model.id,
                                    provider: provider.id,
                                    provider_id: provider.id,
                                    provider_name: provider.name,
                                    provider_type: provider.type,
                                    created: Math.floor(Date.now() / 1000),
                                    object: 'model',
                                    owned_by: 'system'
                                });
                            }
                        }
                        
                        // DEBUG: Force modify first two models to test provider filtering
                        if (allModels.length >= 2) {
                            console.error('[Debug] Modifying first model to provider=openai');
                            allModels[0].provider = 'openai';
                            allModels[0].provider_name = 'OpenAI Test';
                            allModels[0].name = 'TEST: OpenAI Provider';
                            
                            console.error('[Debug] Modifying second model to provider=cherryin');
                            allModels[1].provider = 'cherryin';
                            allModels[1].provider_name = 'CherryIN Test';
                            allModels[1].name = 'TEST: CherryIN Provider';
                        }
                        
                        // SUPER DEBUG: Inject a fake Anthropic model with TAGS
                        allModels.unshift({
                            id: "claude-3-opus-debug-vision-reasoning",
                            name: "SUPER DEBUG CLAUDE (Vision Reasoning Free)",
                            provider: "anthropic",
                            provider_name: "Anthropic Debug",
                            provider_type: "anthropic",
                            created: 1234567890,
                            object: "model",
                            owned_by: "system",
                            provider_model_id: "claude-3-opus-debug-vision-reasoning"
                        });
                        
                        console.error('[XHR] Total models collected:', allModels.length);
                        if (allModels.length > 0) {
                            console.error('[XHR] First model sample:', JSON.stringify(allModels[0]));
                        }
                        
                        const responseData = {
                            object: 'list',
                            data: allModels,
                            total: allModels.length,
                            offset: 0,
                            limit: 100
                        };
                        
                        const responseStr = JSON.stringify(responseData);
                        console.error('[XHR] Models from Redux:', allModels.length, 'models');
                        
                        // Clear any localStorage tag filter cache that might be filtering models
                        try {
                            const storageKeys = Object.keys(localStorage);
                            const tagFilterKeys = storageKeys.filter(k => k.includes('tag') || k.includes('filter') || k.includes('model'));
                            console.error('[Debug] Found localStorage keys related to filters:', tagFilterKeys);
                            tagFilterKeys.forEach(key => {
                                const oldValue = localStorage.getItem(key);
                                console.error('[Debug] Clearing localStorage key:', key, 'old value:', oldValue);
                                localStorage.removeItem(key);
                            });
                        } catch (e) {
                            console.error('[Debug] Failed to clear localStorage:', e);
                        }
                        
                        // CRITICAL: Clear SWR cache! This is likely the culprit!
                        try {
                            console.error('[Debug] Attempting to clear SWR cache...');
                            // SWR stores cache in a Map, we need to clear it
                            // The cache key is the path returned by getModelsPath()
                            // We'll clear ALL SWR caches to be safe
                            if (window.localStorage) {
                                // Clear any SWR-related keys
                                const allKeys = Object.keys(localStorage);
                                const swrKeys = allKeys.filter(k => k.includes('swr') || k.includes('$swr$'));
                                console.error('[Debug] Found SWR cache keys:', swrKeys.length);
                                swrKeys.forEach(key => {
                                    console.error('[Debug] Clearing SWR key:', key);
                                    localStorage.removeItem(key);
                                });
                            }
                            // Also try to mutate SWR cache programmatically if possible
                            if (window.useSWRConfig) {
                                console.error('[Debug] Found useSWRConfig, attempting to clear...');
                                const { mutate } = window.useSWRConfig();
                                // Clear all SWR caches
                                mutate(() => true, undefined, { revalidate: false });
                            }
                        } catch (e) {
                            console.error('[Debug] Failed to clear SWR cache:', e);
                        }
                        
                        // CRITICAL: Hook Zod schema validation to catch parsing errors
                        setTimeout(() => {
                            try {
                                console.error('[Debug] Attempting to hook Zod parse...');
                                // This is a hack to intercept schema validation errors
                                const originalConsoleError = console.error;
                                const errorBuffer = [];
                                console.error = function(...args) {
                                    const msg = args.join(' ');
                                    if (msg.includes('ZodError') || msg.includes('ApiModelsResponse') || msg.includes('Invalid') || msg.includes('validation')) {
                                        errorBuffer.push(args);
                                        console.error('[Debug] 🚨 Zod validation error detected!', ...args);
                                    }
                                    originalConsoleError.apply(console, args);
                                };
                                
                                // Also hook window.onerror
                                const originalOnError = window.onerror;
                                window.onerror = function(message, source, lineno, colno, error) {
                                    if (message && (message.includes('ApiModelsResponse') || message.includes('validation') || message.includes('Zod'))) {
                                        console.error('[Debug] 🚨 Global error related to model validation:', message, error);
                                    }
                                    if (originalOnError) return originalOnError(message, source, lineno, colno, error);
                                };
                            } catch (e) {
                                console.error('[Debug] Failed to hook error handlers:', e);
                            }
                        }, 0);
                        
                        // DIAGNOSTIC: Check DOM rendering after response
                        setTimeout(() => {
                            console.error('[Diag] Checking UI after 500ms...');
                            const modalElement = document.querySelector('.ant-modal');
                            const emptyElement = document.querySelector('.ant-empty');
                            const modelItemElements = document.querySelectorAll('[class*="ModelItem"]');
                            console.error('[Diag] Modal exists:', !!modalElement);
                            console.error('[Diag] Empty state shown:', !!emptyElement);
                            console.error('[Diag] Model items in DOM:', modelItemElements.length);
                            if (emptyElement) {
                                console.error('[Diag] ⚠️ EMPTY STATE DETECTED - Models were filtered out by frontend!');
                                console.error('[Diag] This means frontend filtering is too strict.');
                                console.error('[Diag] Check: 1) Tag filters 2) modelFilter 3) apiFilter');
                                
                                // Try to diagnose the filtering issue
                                try {
                                    const store = window.store;
                                    if (store) {
                                        const state = store.getState();
                                        const providers = state?.llm?.providers || [];
                                        console.error('[Diag] Redux providers count:', providers.length);
                                        
                                        // Check if our debug model exists in providers
                                        const hasDebugModel = providers.some(p => 
                                            p.models && p.models.some(m => m.id && m.id.includes('debug'))
                                        );
                                        console.error('[Diag] Debug model in Redux:', hasDebugModel);
                                        
                                        // CRITICAL: Try to directly inspect what data the component received
                                        // This is a hack: try to find React fiber and inspect props/state
                                        try {
                                            const reactFiberKey = Object.keys(modalElement || {}).find(k => k.startsWith('__reactFiber'));
                                            if (reactFiberKey && modalElement) {
                                                console.error('[Diag] Found React fiber, attempting to inspect...');
                                                const fiber = modalElement[reactFiberKey];
                                                // Navigate up to find the PopupContainer
                                                let currentFiber = fiber;
                                                let depth = 0;
                                                while (currentFiber && depth < 20) {
                                                    if (currentFiber.pendingProps?.models || currentFiber.memoizedProps?.models) {
                                                        const models = currentFiber.pendingProps?.models || currentFiber.memoizedProps?.models;
                                                        console.error('[Diag] 🔍 Found models prop in React component!', {
                                                            modelsCount: models?.length || 0,
                                                            isArray: Array.isArray(models),
                                                            firstModel: models?.[0]?.id
                                                        });
                                                        break;
                                                    }
                                                    currentFiber = currentFiber.return;
                                                    depth++;
                                                }
                                            }
                                        } catch (e) {
                                            console.error('[Diag] Failed to inspect React fiber:', e);
                                        }
                                    }
                                } catch (e) {
                                    console.error('[Diag] Failed to check Redux:', e);
                                }
                            }
                        }, 500);
                        
                        // 模拟 XHR 响应
                        setTimeout(() => {
                            Object.defineProperty(xhr, 'status', { value: 200, writable: false });
                            Object.defineProperty(xhr, 'statusText', { value: 'OK', writable: false });
                            Object.defineProperty(xhr, 'responseURL', { value: urlObj.href, writable: false });
                            
                            // 模拟 headers 方法
                            xhr.getAllResponseHeaders = function() {
                                return 'Content-Type: application/json\\r\\n';
                            };
                            xhr.getResponseHeader = function(name) {
                                if (name && name.toLowerCase() === 'content-type') return 'application/json';
                                return null;
                            };
                            
                            // 根据 responseType 正确设置响应
                            console.error('[Debug] XHR responseType:', xhr.responseType);
                            
                            // 强制使用 JSON 对象返回，规避前端解析问题
                            console.error('[Debug] Forcing responseType to json');
                            Object.defineProperty(xhr, 'responseType', { value: 'json', writable: false });
                            Object.defineProperty(xhr, 'response', { value: responseData, writable: false });
                            
                            /*
                            if (xhr.responseType === 'json') {
                                // ...
                            } else {
                                // ...
                            }
                            */
                            
                            Object.defineProperty(xhr, 'readyState', { value: 4, writable: false });
                            
                            // Wrap handlers for diagnostic logging
                            const originalOnload = xhr.onload;
                            xhr.onload = function(e) {
                                console.error('[Debug] ✅ XHR onload fired for /v1/models');
                                console.error('[Debug] Response data count:', xhr.response?.data?.length || 0);
                                console.error('[Debug] Response structure:', JSON.stringify({
                                    object: xhr.response?.object,
                                    dataLength: xhr.response?.data?.length,
                                    total: xhr.response?.total,
                                    firstModelId: xhr.response?.data?.[0]?.id,
                                    firstModelProvider: xhr.response?.data?.[0]?.provider
                                }));
                                
                                // CRITICAL: Also add Axios response interceptor logging
                                setTimeout(() => {
                                    try {
                                        // Check if models actually made it to the component
                                        console.error('[Debug] Checking if Axios interceptors exist...');
                                        // We can't directly access Axios instance, but we can check the result after a delay
                                    } catch (e) {
                                        console.error('[Debug] Failed to check Axios:', e);
                                    }
                                }, 100);
                                
                                if (originalOnload) originalOnload.call(xhr, e || new Event('load'));
                            };
                            
                            const originalOnerror = xhr.onerror;
                            xhr.onerror = function(e) {
                                console.error('[Debug] ⚠️ XHR onerror fired for /v1/models!', e);
                                if (originalOnerror) originalOnerror.call(xhr, e || new Event('error'));
                            };
                            
                            if (xhr.onreadystatechange) xhr.onreadystatechange();
                            if (xhr.onload) xhr.onload();
                            xhr.dispatchEvent(new Event('load'));
                            xhr.dispatchEvent(new Event('readystatechange'));
                        }, 0);
                        
                        return;
                    }
                    
                    // 其他 Agent API 请求通过后端 HTTP 代理
                    if (window.qt?.api?.agentApiProxy) {
                        console.error('[XHR] Proxying via backend:', requestMethod, path);
                        
                        const request = {
                            method: requestMethod,
                            path: path,
                            body: body ? JSON.parse(body) : null
                        };
                        
                        // 异步调用 Python 代理
                        window.qt.api.agentApiProxy(JSON.stringify(request)).then(responseStr => {
                            console.error('[XHR] Response:', responseStr?.substring?.(0, 200) || responseStr);
                            
                            // 模拟 XHR 响应
                            Object.defineProperty(xhr, 'status', { value: 200, writable: false });
                            Object.defineProperty(xhr, 'statusText', { value: 'OK', writable: false });
                            
                            const fullUrl = path.startsWith('http') ? path : window.location.origin + path;
                            Object.defineProperty(xhr, 'responseURL', { value: fullUrl, writable: false });

                            // 模拟 headers 方法
                            xhr.getAllResponseHeaders = function() {
                                return 'Content-Type: application/json\\r\\n';
                            };
                            xhr.getResponseHeader = function(name) {
                                if (name && name.toLowerCase() === 'content-type') return 'application/json';
                                return null;
                            };
                            
                            // Axios reads responseText when responseType is '' or 'json',
                            // so we must provide both responseText (string) and response (parsed).
                            const responseString = typeof responseStr === 'string' ? responseStr : JSON.stringify(responseStr);
                            let responseParsed;
                            try {
                                responseParsed = typeof responseStr === 'string' ? JSON.parse(responseStr) : responseStr;
                            } catch (e) {
                                responseParsed = responseStr;
                            }
                            Object.defineProperty(xhr, 'responseText', { value: responseString, writable: false });
                            Object.defineProperty(xhr, 'response', { value: responseParsed, writable: false });

                            Object.defineProperty(xhr, 'readyState', { value: 4, writable: false });
                            
                            // 触发事件
                            if (xhr.onreadystatechange) xhr.onreadystatechange();
                            if (xhr.onload) xhr.onload();
                            
                            const loadEvent = new Event('load');
                            xhr.dispatchEvent(loadEvent);
                            
                            const readyStateEvent = new Event('readystatechange');
                            xhr.dispatchEvent(readyStateEvent);
                        }).catch(err => {
                            console.error('[XHR] Error:', err);
                            if (xhr.onerror) xhr.onerror(err);
                            xhr.dispatchEvent(new Event('error'));
                        });
                        
                        return;  // 不调用原始 send
                    }
                }
                
                return originalSend(body);
            };
            
            return xhr;
        };
        
        // 复制静态属性
        window.XMLHttpRequest.UNSENT = 0;
        window.XMLHttpRequest.OPENED = 1;
        window.XMLHttpRequest.HEADERS_RECEIVED = 2;
        window.XMLHttpRequest.LOADING = 3;
        window.XMLHttpRequest.DONE = 4;
        
        console.error('[Qt] Agent API proxy installed!');
    })();
    
    // 延迟安装 fetch 拦截器，确保后端连接已就绪
    setTimeout(function() {
        if (window.__fetchInterceptorInstalled) {
            console.log('[Cherry Studio] fetch interceptor already installed');
            return;
        }
        
        console.log('[Cherry Studio] 🚀 Installing network interceptors...');
        
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
                console.log('[Cherry Studio] 📡 XHR intercepted:', method, url);
                return originalOpen.apply(this, [method, url, ...args]);
            };
            
            xhr.send = function(body) {
                requestBody = body;
                console.log('[Cherry Studio] 📡 XHR send, body:', body ? body.substring(0, 200) : 'empty');
                return originalSend.apply(this, arguments);
            };
            
            return xhr;
        };
        console.log('[Cherry Studio] ✅ XMLHttpRequest interceptor installed');
        
        // 注入 JSON.parse 钩子用于调试
        const originalJSONParse = JSON.parse;
        JSON.parse = function(text, reviver) {
            try {
                const result = originalJSONParse(text, reviver);
                if (result && typeof result === 'object' && result.object === 'list' && Array.isArray(result.data)) {
                     console.error('[Debug] JSON.parse parsed a list:', result.data.length, 'items');
                     if (result.data.length > 0 && result.data[0].id === 'deepseek-chat-corp') {
                         console.error('[Debug] TARGET MODEL FOUND in JSON.parse!');
                     }
                }
                return result;
            } catch (e) {
                throw e;
            }
        };
        
        const originalFetch = window.fetch;
        window.fetch = async function(input, init) {
            try {
                const url = typeof input === 'string' ? input : input.url;
                const request = input instanceof Request ? input : new Request(input, init);
                
                // 检测是否是 HTTP/HTTPS 请求（需要代理）
                if (url && (url.startsWith('http://') || url.startsWith('https://'))) {

                    // 对本地服务（localhost, 127.0.0.1）直接使用原始 fetch，不走 Python 代理
                    // 这些服务不需要认证，也不应该通过 Python 代理
                    var shouldBypass = false;
                    var bypassReason = '';
                    
                    try {
                        var lower = String(url).toLowerCase();
                        
                        // 方法1: 简单的字符串匹配（最快，最可靠，优先使用）
                        // 检查 URL 中是否包含本地地址标识
                        if (lower.indexOf('localhost') !== -1 || 
                            lower.indexOf('127.0.0.1') !== -1 ||
                            lower.indexOf('[::1]') !== -1 ||
                            lower.indexOf('0.0.0.0') !== -1) {
                            shouldBypass = true;
                            bypassReason = 'localhost string match';
                        }
                        
                        // 方法2: URL 对象解析（作为备用检查）
                        if (!shouldBypass) {
                            try {
                                var urlObj = new URL(url);
                                var hostname = urlObj.hostname.toLowerCase();
                                
                                // 检查是否是本地地址
                                if (hostname === 'localhost' || 
                                    hostname === '127.0.0.1' || 
                                    hostname === '[::1]' ||
                                    (hostname.startsWith('127.') && hostname.split('.').length === 4) ||
                                    hostname === '0.0.0.0') {
                                    shouldBypass = true;
                                    bypassReason = 'localhost hostname: ' + hostname;
                                }
                            } catch (urlError) {
                                // URL 解析失败，继续使用字符串匹配的结果
                                // 如果字符串匹配也没找到，说明可能不是本地服务
                            }
                        }

                        // 对 Ollama 的 chat/completions 接口特殊处理
                        // 如果是 localhost 请求但 failed to fetch，尝试强制走 Python 代理
                        // 这是一个可选的 fallback 策略
                        
                        // 特殊处理：fastmcp2 服务
                        if (!shouldBypass && lower.indexOf('http://localhost:9000/mcp') === 0) {
                            shouldBypass = true;
                            bypassReason = 'fastmcp2 service';
                        }
                        
                        // 强制 Ollama 走 Python 代理（如果本地 fetch 失败）
                        // 注意：WebEngine 可能会阻止对 localhost 的请求（CORS 或 Mixed Content）
                        // 如果我们在 file:// 协议下，访问 http://localhost 可能会有问题
                        // 暂时强制 Ollama 走 Python 代理来规避这个问题
                        if (shouldBypass && (lower.includes('/api/chat') || lower.includes('/v1/chat/completions'))) {
                             console.log('[Cherry Studio] ⚠️ Forcing Python proxy for Ollama chat to avoid WebEngine restrictions:', url);
                             shouldBypass = false;
                        }
                        
                        if (shouldBypass) {
                            console.log('[Cherry Studio] 🏠 Bypass fetchProxy for local service (' + bypassReason + '):', url);
                            return originalFetch.call(this, input, init);
                        }
                    } catch (e) {
                        console.error('[Cherry Studio] Local service bypass check error:', e, 'URL:', url);
                        // 如果检查出错，为了安全起见，不 bypass（让请求走代理）
                    }
                    
                    // ── 直连后端 HTTP ──────────────────────────────────────────────────
                    const _backendUrl = window.__CHERRY_BACKEND_URL || '';
                    const _sessionId  = window.__CHERRY_SESSION_ID  || '';
                    const _apiHdrs    = { 'Content-Type': 'application/json', 'X-Session-Id': _sessionId };

                    if (_backendUrl) {
                        try {
                            
                            // 收集请求头
                            const headers = {};
                            
                            // 首先从 init 参数中收集 headers（优先级更高）
                            if (init && init.headers) {
                                if (init.headers instanceof Headers) {
                                    init.headers.forEach((value, key) => {
                                        headers[key] = value;
                                    });
                                } else if (typeof init.headers === 'object') {
                                    Object.assign(headers, init.headers);
                                }
                            }
                            
                            // 然后从 Request 对象中收集 headers（会覆盖 init 中的同名 header）
                            try {
                                request.headers.forEach((value, key) => {
                                    headers[key] = value;
                                });
                            } catch(e) {
                                console.warn('[Cherry Studio] Failed to collect headers from Request:', e);
                            }
                            
                            // 调试：记录认证相关的 headers（隐藏敏感信息）
                            if (headers['Authorization'] || headers['authorization']) {
                                const authHeader = headers['Authorization'] || headers['authorization'];
                                const safeAuth = authHeader.length > 20 ? authHeader.substring(0, 20) + '...' : '***';
                                console.log('[Cherry Studio] 🔐 Found Authorization header:', safeAuth);
                            }
                            if (headers['X-API-Key'] || headers['x-api-key']) {
                                console.log('[Cherry Studio] 🔐 Found X-API-Key header');
                            }
                            
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

                            // 如果是 chat/completions 请求，尝试注入 webSearchProviderId
                            if (url.includes('/chat/completions') || url.includes('/v1/chat') || url.includes('/messages')) {
                                
                                try {
                                    // 尝试从 Redux store 获取当前 assistant 的 webSearchProviderId
                                    let webSearchProviderId = null;
                                    
                                    // 方法1: 从 window.__CHERRY_CURRENT_ASSISTANT__ 获取（如果前端设置了）
                                    if (window.__CHERRY_CURRENT_ASSISTANT__?.webSearchProviderId) {
                                        webSearchProviderId = window.__CHERRY_CURRENT_ASSISTANT__.webSearchProviderId;
                                    }
                                    
                                    // 方法2: 从 localStorage 的 Redux persist 状态获取当前 assistant
                                    if (!webSearchProviderId) {
                                        try {
                                            const persistRoot = localStorage.getItem('persist:cherry-studio');
                                            if (persistRoot) {
                                                const rootState = JSON.parse(persistRoot);
                                                if (rootState.assistants) {
                                                    const assistantsState = JSON.parse(rootState.assistants);
                                                    const defaultAssistant = assistantsState.defaultAssistant;
                                                    if (defaultAssistant?.webSearchProviderId) {
                                                        webSearchProviderId = defaultAssistant.webSearchProviderId;
                                                    }
                                                }
                                                if (!webSearchProviderId && rootState.websearch) {
                                                    const websearchState = JSON.parse(rootState.websearch);
                                                    if (websearchState.defaultProvider) {
                                                        webSearchProviderId = websearchState.defaultProvider;
                                                    }
                                                }
                                            }
                                        } catch(e) {
                                            // ignore
                                        }
                                    }
                                    
                                    if (webSearchProviderId && !requestBody.webSearchProviderId) {
                                        requestBody.webSearchProviderId = webSearchProviderId;
                                        body = JSON.stringify(requestBody);
                                    }
                                } catch(e) {
                                    console.warn('[Cherry Studio] Failed to inject webSearchProviderId:', e);
                                }
                            }

                            // 如果是 Ollama 的 generate 接口，处理可能的 JSONL 响应（虽然 Ollama API 默认是非 stream 的）
                            // 但通常我们这里收到的是 standard OpenAI format
                            
                            // 构建请求配置
                            const requestId = isStream ? 'stream_' + Date.now() + '_' + Math.random() : '';
                            // 超时策略：流式=300s；AI API=60s；网页内容抓取=30s（与 Cherry Studio 自身 25s 超时匹配）
                            const _isAiApi = url.includes('/v1/chat') || url.includes('/api/chat') ||
                                             url.includes('/v1/messages') || url.includes('/v1/completions') ||
                                             url.includes('/chat/completions') || url.includes('/images/');
                            const _reqTimeout = isStream ? 300 : (_isAiApi ? 120 : 30);
                            const payload = {
                                url: url,
                                method: method,
                                headers: headers,
                                body: body,
                                timeout: _reqTimeout,
                                stream: isStream,
                                requestId: requestId
                            };
                            
                            // 如果是流式请求，返回 ReadableStream
                            if (isStream) {
                                
                                let streamController;
                                let responseHeaders = { 'Content-Type': 'text/event-stream' };
                                let responseStatus = 200;
                                
                                // 创建 ReadableStream
                                const stream = new ReadableStream({
                                    start(controller) {
                                        streamController = controller;
                                        
                                        // 流式请求：仅使用后端 HTTP 直连
                                        const _doStream = async () => {
                                            // 第一级：JS fetch 直连后端 HTTP
                                            if (_backendUrl) {
                                                try {
                                                    const startResp = await originalFetch(_backendUrl + '/api/v1/network/fetch', {
                                                        method: 'POST', headers: _apiHdrs, body: JSON.stringify(payload),
                                                        signal: AbortSignal.timeout(320000)
                                                    });
                                                    const startData = await startResp.json();
                                                    if (!startData.streaming) {
                                                        streamController.error(new Error('Stream not started: ' + (startData.error || '')));
                                                        return;
                                                    }
                                                    
                                                    // 轮询读取流数据
                                                    const poll = async () => {
                                                        try {
                                                            let data;
                                                            const pollResp = await originalFetch(_backendUrl + '/api/v1/network/stream-read', {
                                                                method: 'POST', headers: _apiHdrs,
                                                                body: JSON.stringify({ requestId })
                                                            });
                                                            data = await pollResp.json();
                                                            
                                                            if (data.type === 'headers') {
                                                                responseStatus = data.status || 200;
                                                                responseHeaders = new Headers(data.headers || {});
                                                                setTimeout(poll, 10);
                                                            } else if (data.type === 'data') {
                                                                streamController.enqueue(new TextEncoder().encode(data.data));
                                                                setTimeout(poll, 10);
                                                            } else if (data.type === 'end') {
                                                                streamController.close();
                                                                if (window.__saveIndexedDB) window.__saveIndexedDB();
                                                            } else if (data.type === 'error') {
                                                                streamController.error(new Error(data.error));
                                                            } else {
                                                                setTimeout(poll, 50);
                                                            }
                                                        } catch(e) {
                                                            streamController.error(e);
                                                        }
                                                    };
                                                    poll();

                                                } catch(_backendStreamErr) {
                                                    console.error('[Cherry Studio] ⚠️ Backend stream unavailable (' + _backendStreamErr.message + ')');
                                                    streamController.error(_backendStreamErr);
                                                }
                                            } else {
                                                const err = new Error('No backend URL available for streaming');
                                                console.error('[Cherry Studio]', err);
                                                streamController.error(err);
                                            }
                                        };
                                        _doStream().catch(e => streamController.error(e));
                                    },
                                    cancel() {}
                                });
                                
                                // 立即返回 Response 对象
                                return new Response(stream, {
                                    status: responseStatus,
                                    statusText: 'OK',
                                    headers: responseHeaders
                                });
                            }
                            
                            // 非流式请求：仅使用后端 HTTP 直连
                            let parsed;

                            // 第一级：JS fetch 直连后端 HTTP
                            if (_backendUrl) {
                                try {
                                    const fetchResp = await originalFetch(_backendUrl + '/api/v1/network/fetch', {
                                        method: 'POST', headers: _apiHdrs, body: JSON.stringify(payload),
                                        signal: AbortSignal.timeout(65000)
                                    });
                                    parsed = await fetchResp.json();
                                } catch(_backendErr) {
                                    console.error('[Cherry Studio] ⚠️ Backend HTTP unavailable (' + _backendErr.message + ')');
                                    throw _backendErr;
                                }
                            } else {
                                const err = new Error('No backend URL available');
                                console.error('[Cherry Studio]', err);
                                throw err;
                            }

                            // 处理错误响应（包括 401）
                            if (parsed.status && parsed.status >= 400) {
                                console.error('[Cherry Studio] fetchProxy HTTP error:', parsed.status, parsed.statusText);
                                
                                // 构建标准错误响应体
                                let errorBodyStr = '';
                                if (parsed.body) {
                                     errorBodyStr = parsed.body;
                                } else if (parsed.error) {
                                     errorBodyStr = JSON.stringify({ error: { message: parsed.error, type: 'proxy_error', code: parsed.status } });
                                }
                                
                                if (parsed.status === 401) {
                                    console.error('[Cherry Studio] 🔐 401 Unauthorized - Check API key or authentication settings');
                                    // 尝试从错误响应中提取更多信息
                                    let errorMessage = 'Unauthorized';
                                    try {
                                        if (parsed.body) {
                                            const errorBody = typeof parsed.body === 'string' ? JSON.parse(parsed.body) : parsed.body;
                                            if (errorBody.error && errorBody.error.message) {
                                                errorMessage = errorBody.error.message;
                                            } else if (errorBody.message) {
                                                errorMessage = errorBody.message;
                                            }
                                        }
                                    } catch(e) {
                                        // 忽略解析错误
                                    }
                                    return new Response(parsed.body || JSON.stringify({ error: { message: errorMessage, type: 'auth_error' } }), {
                                        status: 401,
                                        statusText: parsed.statusText || 'Unauthorized',
                                        headers: parsed.headers || { 'Content-Type': 'application/json' }
                                    });
                                }
                                // 其他 4xx/5xx 错误
                                return new Response(errorBodyStr || '', {
                                    status: parsed.status,
                                    statusText: parsed.statusText || 'Error',
                                    headers: parsed.headers || { 'Content-Type': 'application/json' }
                                });
                            }
                            
                            if (parsed.error && !parsed.status) {
                                console.error('[Cherry Studio] fetchProxy error (non-fatal):', parsed.error);
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
                            console.error('[Cherry Studio] fetchProxy call failed:', e);
                            throw e;
                        }
                    } else {
                        console.error('[Cherry Studio] No backend URL available for fetch proxy');
                    }
                }
            } catch(e) {
                console.error('[Cherry Studio] fetch interceptor error:', e);
                throw e;
            }
            
            // 如果不是 HTTP 请求或拦截失败，使用原始 fetch
            return originalFetch.call(this, input, init);
        };
        
        // 监听前端的拖拽区域
        document.addEventListener('mousedown', function(e) {
            // 检查点击的元素是否在标题栏区域（通常高度为30-40px）
            // 并且不是按钮、输入框等交互元素
            if (e.clientY <= 40) {
                var target = e.target;
                var tagName = target.tagName.toLowerCase();
                
                // 更健壮的交互元素检测
                var computedStyle = window.getComputedStyle(target);
                var isPointer = computedStyle.cursor === 'pointer';
                
                var isInteractive = 
                    tagName === 'button' || 
                    tagName === 'input' || 
                    tagName === 'select' || 
                    tagName === 'a' || 
                    target.closest('button') || 
                    target.closest('.window-controls') || 
                    target.closest('.no-drag') ||
                    target.closest('[role="button"]') || // 增加 role="button" 检测
                    target.closest('.clickable') ||      // 增加常见的 clickable 类检测
                    isPointer;                           // 使用 computedStyle 检测 cursor: pointer
                
                // 如果点击的是 svg 或 path，且其父级是 interactive，也算 interactive
                if (!isInteractive && (tagName === 'svg' || tagName === 'path')) {
                    var parent = target.parentElement;
                    while (parent && parent !== document.body) {
                        var pStyle = window.getComputedStyle(parent);
                        if (pStyle.cursor === 'pointer' || parent.tagName.toLowerCase() === 'button') {
                            isInteractive = true;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                }
                
                if (!isInteractive) {
                    // 调用后端开始拖拽
                    if (window.qt && window.qt.api && window.qt.api.startDrag) {
                        window.qt.api.startDrag();
                        // 阻止默认行为可能会导致问题，视情况而定
                        // e.preventDefault();
                    }
                }
            }
        });

        window.__fetchInterceptorInstalled = true;
        console.log('[Cherry Studio] fetch interceptor installed');
    }, 2000);
    
    // 调试信息：延迟 3 秒输出
    setTimeout(function() {
        console.log('[DEBUG] ========== 系统诊断开始 ==========');
        console.log('[DEBUG] === Qt API 状态 ===');
        console.log('[DEBUG] 1. window.qt:', typeof window.qt);
        console.log('[DEBUG] 2. window.qt.api:', typeof (window.qt && window.qt.api));
        console.log('[DEBUG] 3. __CHERRY_BACKEND_URL:', window.__CHERRY_BACKEND_URL || 'not set');
        
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
    } // end iframe guard
    """


