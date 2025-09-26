import os
import sys
import json
from urllib import request as urllib_request, error as urllib_error


def is_running_inside_houdini() -> bool:
    try:
        import hou  # type: ignore
        _ = hou.ui
        return True
    except Exception:
        return False


def ensure_qtwebengine_initialized():
    # PySide6 requires QtWebEngine initialization before QApplication in some envs
    try:
        # 优先尝试启用 GPU；如需禁用，可手动设置 QTWEBENGINE_DISABLE_GPU=1
        flags = os.environ.get("QTWEBENGINE_CHROMIUM_FLAGS", "")
        flag_set = set(flags.split()) if flags else set()
        gpu_preferred = os.environ.get("QTWEBENGINE_DISABLE_GPU") not in {"1", "true", "True"}
        desired = ["--no-sandbox"]
        if gpu_preferred:
            desired.extend(["--ignore-gpu-blocklist", "--enable-gpu", "--enable-zero-copy"])
        else:
            desired.append("--disable-gpu")
        for item in desired:
            if item not in flag_set:
                flag_set.add(item)
        os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = " ".join(sorted(flag_set))

        from PySide6 import QtWebEngineCore  # noqa: F401
    except Exception:
        pass


def create_app():
    from PySide6.QtCore import Qt, QCoreApplication
    from PySide6.QtWidgets import QApplication
    app = QApplication.instance()
    if app is None:
        # 仅在未创建应用时设置属性；在 Houdini 内部已存在 QApplication
        QCoreApplication.setAttribute(Qt.AA_ShareOpenGLContexts, True)
        app = QApplication(sys.argv)
    return app


def create_window(load_url: str):
    from PySide6.QtCore import QUrl, QObject, Slot, Signal, Qt
    from PySide6.QtWidgets import QMainWindow, QWidget, QVBoxLayout
    from PySide6.QtWebEngineWidgets import QWebEngineView
    from PySide6.QtWebEngineCore import QWebEngineScript
    from PySide6.QtWebChannel import QWebChannel

    # 在 Houdini 内部尽量挂到主窗口，避免焦点与生命周期问题
    parent = None
    try:
        import hou  # type: ignore
        try:
            # H20.5 起提供 hou.qt
            from hou import qt as hou_qt  # type: ignore
            parent = hou_qt.mainWindow()
        except Exception:
            parent = hou.ui.mainQtWindow()
    except Exception:
        parent = None

    window = QMainWindow(parent)
    window.setWindowTitle("Cherry Studio for Houdini")
    web = QWebEngineView(window)
    window.setCentralWidget(web)
    # 让外层容器处理拖拽
    try:
        web.setAcceptDrops(False)
    except Exception:
        pass

    def _on_load_finished(ok: bool):
        pass
        if not ok:
            page: QWebEnginePage = web.page()
            pageUrl = page.url().toString()
            pass

    def _on_render_terminated(status, exitCode):
        # PySide6 >=6.5: status is QWebEnginePage.RenderProcessTerminationStatus
        pass

    def inject_electron_api():
        """注入真正的 Electron API 到页面"""
        # 分步注入，确保每一步都成功
        scripts = [
            # 第一步：检查 Qt 对象
            """
            // Checking Qt objects
            """,

            # 第二步：注入 Electron API
            """
            // Injecting Electron API
            // 强制标记 Houdini 环境，避免 Cherry 误判为 Electron
            window.houdini = true;
            if (!window.__cherry_electron_injected) { window.__cherry_electron_injected = true; }
            var __electron = window.electron || {};
            var ipc = __electron.ipcRenderer || {};
            if (typeof ipc.invoke !== 'function') {
                ipc.invoke = async (channel, ...args) => {
                    try {
                        if (window.qt?.electron?.invoke) {
                            const result = await window.qt.electron.invoke(channel, ...args);
                            return JSON.parse(result);
                        }
                    } catch (e) { /* IPC invoke error */ }
                    return null;
                };
            }
            if (typeof ipc.send !== 'function') {
                ipc.send = (channel, ...args) => {
                    try { if (window.qt?.electron?.send) { window.qt.electron.send(channel, ...args); } }
                    catch (e) { /* IPC send error */ }
                };
            }
            if (typeof ipc.on !== 'function') {
                ipc.on = (channel, callback) => {
                    try {
                        if (window.qt?.electron?.on && window.qt?.electron?.removeListener) {
                            const listenerId = window.qt.electron.on(channel);
                            return () => window.qt.electron.removeListener(channel, listenerId);
                        }
                    } catch (e) { /* IPC on error */ }
                    return () => {};
                };
            }
            if (typeof ipc.removeListener !== 'function') {
                ipc.removeListener = (channel, callback) => {
                    try { if (window.qt?.electron?.removeListener) { window.qt.electron.removeListener(channel, callback); } }
                    catch (e) { /* IPC removeListener error */ }
                };
            }
            if (typeof ipc.removeAllListeners !== 'function') {
                ipc.removeAllListeners = (channel) => {
                    try { if (window.qt?.electron?.removeAllListeners) { window.qt.electron.removeAllListeners(channel); } }
                    catch (e) { /* IPC removeAllListeners error */ }
                };
            }
            __electron.ipcRenderer = ipc;
            // 最小化 process，仅提供必要字段即可
            __electron.process = __electron.process || { platform: 'win32', versions: { node: '18.0.0' } };
            // 注意：不再在此注入 remote/getCurrentWindow，避免 Electron 分支被触发
            window.electron = __electron;
            console.log('[Houdini] Electron API injected');
            """,
            
            # 第三步：注入 window.api
            """
            console.log('[Houdini] Injecting window.api...');
            if (!window.__cherry_api_injected) { window.__cherry_api_injected = true; }
            var __api = window.api || {};
            __api.getDiskInfo = async (path) => {
                try {
                    const result = await window.qt?.api?.getDiskInfo(path);
                    if (typeof result === 'string') return JSON.parse(result);
                    if (result && typeof result === 'object') return result;
                } catch (e) {}
                return { total: 1000000000, free: 500000000 };
            };
            __api.getAppInfo = async () => {
                try {
                    const result = await window.qt?.api?.getAppInfo();
                    if (typeof result === 'string') return JSON.parse(result);
                    if (result && typeof result === 'object') return result;
                } catch (e) {}
                return { version: '1.0.0', platform: 'win32', arch: 'x64' };
            };
            __api.logToMain = (source, level, message, data) => {
                try {
                    window.qt?.api?.logToMain(source, level, message, data || "");
                } catch (e) {
                    console.error('[Houdini] logToMain error:', e);
                }
            };
            __api.setLanguage = async (lang) => {
                try {
                    const result = await window.qt?.api?.setLanguage?.(lang);
                    if (typeof result === 'string') {
                        return JSON.parse(result);
                    }
                    return result ?? null;
                    } catch (e) {
                    console.error('[Houdini] setLanguage error:', e);
                    return null;
                }
            };
            __api.isBinaryExist = async (binary) => {
                try {
                    const result = await window.qt?.api?.isBinaryExist?.(binary);
                    if (typeof result === 'string') {
                        return JSON.parse(result);
                    }
                    return !!result;
                } catch (e) {
                    console.error('[Houdini] isBinaryExist error:', e);
                    return false;
                }
            };
            __api.handleZoomFactor = async (delta, reset) => {
                const change = typeof delta === 'number' ? delta : 0;
                const doReset = typeof reset === 'boolean' ? reset : false;
                try {
                    const result = await window.qt?.api?.handleZoomFactor?.(change, doReset);
                    if (typeof result === 'string') {
                        return JSON.parse(result);
                    }
                    return result ?? 1.0;
                    } catch (e) {
                    console.error('[Houdini] handleZoomFactor error:', e);
                    return 1.0;
                    }
            };
            __api.setLanguage = async (lang) => {
                try { return await window.qt?.api?.setLanguage?.(lang) ?? null; } catch (e) { console.error('[Houdini] setLanguage error:', e); return null; }
            };
            __api.isBinaryExist = async (binary) => {
                try { return await window.qt?.api?.isBinaryExist?.(binary); } catch (e) { console.error('[Houdini] isBinaryExist error:', e); return false; }
            };
            __api.mcp = __api.mcp || {
                getInstallInfo: async () => {
                    try {
                        const result = await window.qt?.api?.mcp?.getInstallInfo?.();
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || { uvPath: '', bunPath: '', dir: '' };
                    } catch (e) {
                        console.error('[Houdini] mcp.getInstallInfo error:', e);
                        return { uvPath: '', bunPath: '', dir: '' };
                    }
                },
                checkMcpConnectivity: async (server) => {
                    try {
                        const result = await window.qt?.api?.mcp?.checkMcpConnectivity?.(JSON.stringify(server));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return !!result;
                    } catch (e) {
                        console.error('[Houdini] mcp.checkMcpConnectivity error:', e);
                        return false;
                    }
                },
                listTools: async (server) => {
                    try {
                        const result = await window.qt?.api?.mcp?.listTools?.(JSON.stringify(server));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || [];
                    } catch (e) {
                        console.error('[Houdini] mcp.listTools error:', e);
                        return [];
                    }
                },
                listPrompts: async (server) => {
                    try {
                        const result = await window.qt?.api?.mcp?.listPrompts?.(JSON.stringify(server));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || [];
                    } catch (e) {
                        console.error('[Houdini] mcp.listPrompts error:', e);
                        return [];
                    }
                },
                listResources: async (server) => {
                    try {
                        const result = await window.qt?.api?.mcp?.listResources?.(JSON.stringify(server));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || [];
                    } catch (e) {
                        console.error('[Houdini] mcp.listResources error:', e);
                        return [];
                    }
                },
                getPrompt: async (payload) => {
                    try {
                        const result = await window.qt?.api?.mcp?.getPrompt?.(JSON.stringify(payload));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || {};
                    } catch (e) {
                        console.error('[Houdini] mcp.getPrompt error:', e);
                        return {};
                    }
                },
                getResource: async (payload) => {
                    try {
                        const result = await window.qt?.api?.mcp?.getResource?.(JSON.stringify(payload));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || {};
                    } catch (e) {
                        console.error('[Houdini] mcp.getResource error:', e);
                        return {};
                    }
                },
                getServerVersion: async (server) => {
                    try {
                        const result = await window.qt?.api?.mcp?.getServerVersion?.(JSON.stringify(server));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || null;
                    } catch (e) {
                        console.error('[Houdini] mcp.getServerVersion error:', e);
                        return null;
                    }
                },
                restartServer: async (server) => {
                    try {
                        const result = await window.qt?.api?.mcp?.restartServer?.(JSON.stringify(server));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return !!result;
                    } catch (e) {
                        console.error('[Houdini] mcp.restartServer error:', e);
                        return false;
                    }
                },
                stopServer: async (server) => {
                    try {
                        const result = await window.qt?.api?.mcp?.stopServer?.(JSON.stringify(server));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return !!result;
                    } catch (e) {
                        console.error('[Houdini] mcp.stopServer error:', e);
                        return false;
                    }
                },
                removeServer: async (server) => {
                    try {
                        const result = await window.qt?.api?.mcp?.removeServer?.(JSON.stringify(server));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return !!result;
                    } catch (e) {
                        console.error('[Houdini] mcp.removeServer error:', e);
                        return false;
                    }
                },
                uploadDxt: async (file) => {
                    try {
                        const result = await window.qt?.api?.mcp?.uploadDxt?.(JSON.stringify(file));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || { success: false };
                    } catch (e) {
                        console.error('[Houdini] mcp.uploadDxt error:', e);
                        return { success: false, error: String(e) };
                    }
                },
                callTool: async (payload) => {
                    try {
                        const result = await window.qt?.api?.mcp?.callTool?.(JSON.stringify(payload));
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return result || {};
                    } catch (e) {
                        console.error('[Houdini] mcp.callTool error:', e);
                        return { success: false, error: String(e) };
                    }
                },
                abortTool: async (toolId) => {
                    try {
                        const result = await window.qt?.api?.mcp?.abortTool?.(toolId);
                        if (typeof result === 'string') {
                            return JSON.parse(result);
                        }
                        return !!result;
                    } catch (e) {
                        console.error('[Houdini] mcp.abortTool error:', e);
                        return false;
                    }
                }
            };
            __api.setTheme = (theme) => { try { window.qt?.api?.setTheme(theme) } catch(e) {} };
            __api.isMaximized = async () => { try { return await window.qt?.api?.isMaximized() } catch(e) { return false } };
            __api.isFullScreen = async () => { try { return await window.qt?.api?.isFullScreen() } catch(e) { return false } };
            __api.getDataPathFromArgs = async () => { try { return await window.qt?.api?.getDataPathFromArgs() } catch(e) { return '' } };
            __api.clearCache = async () => {
                try {
                    const r = await window.qt?.api?.clearCache?.();
                    if (typeof r === 'string') {
                        return JSON.parse(r);
                    }
                    return r ?? true;
                } catch (e) {
                    console.error('[Houdini] clearCache error:', e);
                    return true;
                }
            };
            __api.getCacheSize = async () => {
                try {
                    const r = await window.qt?.api?.getCacheSize?.();
                    if (typeof r === 'string') {
                        return r;
                    }
                    if (r && typeof r === 'object') {
                        return JSON.stringify(r);
                    }
                } catch (e) {
                    console.error('[Houdini] getCacheSize error:', e);
                }
                return JSON.stringify({ size: 0, count: 0 });
            };
            __api.trace = __api.trace || {};
            __api.trace.cleanLocalData = async () => {
                try {
                    const r = await window.qt?.api?.trace?.cleanLocalData?.();
                    if (typeof r === 'string') {
                        return JSON.parse(r);
                    }
                    return r ?? true;
                } catch (e) {
                    console.error('[Houdini] trace.cleanLocalData error:', e);
                    return true;
                }
            };
            __api.setAutoUpdate = async (enabled) => {
                try {
                    const r = await window.qt?.api?.setAutoUpdate?.(enabled);
                    if (typeof r === 'string') {
                        return JSON.parse(r);
                    }
                    return r ?? true;
                } catch (e) {
                    console.error('[Houdini] setAutoUpdate error:', e);
                    return false;
                }
            };
            __api.apiServer = __api.apiServer || {};
            __api.apiServer.status = async () => {
                try {
                    const r = await window.qt?.api?.apiServer?.status?.();
                    if (typeof r === 'string') {
                        const parsed = JSON.parse(r);
                        if (parsed && typeof parsed === 'object') {
                            return {
                                running: Boolean(parsed.running),
                                port: typeof parsed.port === 'number' ? parsed.port : 0,
                                url: parsed.url ?? '',
                                error: parsed.error ?? null
                            };
                        }
                    }
                    if (r && typeof r === 'object') {
                        return {
                            running: Boolean(r.running),
                            port: typeof r.port === 'number' ? r.port : 0,
                            url: r.url ?? '',
                            error: r.error ?? null
                        };
                    }
                } catch (e) {
                    console.error('[Houdini] apiServer.status error:', e);
                    return { running: false, port: 0, url: '', error: String(e) };
                }
                return { running: false, port: 0, url: '', error: null };
            };
            __api.apiServer.configure = async (config) => {
                try {
                    const r = await window.qt?.api?.apiServer?.configure?.(JSON.stringify(config ?? {}));
                    if (typeof r === 'string') {
                        return JSON.parse(r);
                    }
                    return r ?? { success: true };
                } catch (e) {
                    console.error('[Houdini] apiServer.configure error:', e);
                    return { success: false, error: String(e) };
                }
            };
            __api.apiServer.start = async () => {
                try {
                    const r = await window.qt?.api?.apiServer?.start?.();
                    if (typeof r === 'string') {
                        return JSON.parse(r);
                    }
                    return r ?? { running: true, port: 0, url: '', error: null };
                } catch (e) {
                    console.error('[Houdini] apiServer.start error:', e);
                    return { running: false, port: 0, url: '', error: String(e) };
                }
            };
            __api.apiServer.restart = async () => {
                try {
                    const r = await window.qt?.api?.apiServer?.restart?.();
                    if (typeof r === 'string') {
                        return JSON.parse(r);
                    }
                    return r ?? { running: true, port: 0, url: '', error: null };
                } catch (e) {
                    console.error('[Houdini] apiServer.restart error:', e);
                    return { running: false, port: 0, url: '', error: String(e) };
                }
            };
            __api.apiServer.stop = async () => {
                try {
                    const r = await window.qt?.api?.apiServer?.stop?.();
                    if (typeof r === 'string') {
                        return JSON.parse(r);
                    }
                    return r ?? { running: false, port: 0, url: '', error: null };
                } catch (e) {
                    console.error('[Houdini] apiServer.stop error:', e);
                    return { running: false, port: 0, url: '', error: String(e) };
                }
            };
            __api.apiServer.toggle = async (payload) => {
                try {
                    const r = await window.qt?.api?.apiServer?.toggle?.(JSON.stringify(payload ?? {}));
                    if (typeof r === 'string') {
                        return JSON.parse(r);
                    }
                    return r ?? { running: false, port: 0, url: '', error: null };
                } catch (e) {
                    console.error('[Houdini] apiServer.toggle error:', e);
                    return { running: false, port: 0, url: '', error: String(e) };
                }
            };
            __api.memory = __api.memory || {
                list: async (config) => {
                    try {
                        const r = await window.qt?.api?.memory?.list?.(JSON.stringify(config ?? {}));
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? { memories: [], error: null };
                    } catch (e) {
                        console.error('[Houdini] memory.list error:', e);
                        return { memories: [], error: String(e) };
                    }
                },
                add: async (messages, options) => {
                    try {
                        const payload = { messages: messages ?? [], options: options ?? {} };
                        const r = await window.qt?.api?.memory?.add?.(JSON.stringify(payload));
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? { memories: [] };
                    } catch (e) {
                        console.error('[Houdini] memory.add error:', e);
                        return { memories: [], error: String(e) };
                    }
                },
                search: async (query, options) => {
                    try {
                        const payload = { query, options: options ?? {} };
                        const r = await window.qt?.api?.memory?.search?.(JSON.stringify(payload));
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? { memories: [] };
                    } catch (e) {
                        console.error('[Houdini] memory.search error:', e);
                        return { memories: [], error: String(e) };
                    }
                },
                delete: async (id) => {
                    try {
                        const r = await window.qt?.api?.memory?.delete?.(id);
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? true;
                    } catch (e) {
                        console.error('[Houdini] memory.delete error:', e);
                        return false;
                    }
                },
                update: async (id, memory, metadata) => {
                    try {
                        const payload = { id, memory, metadata };
                        const r = await window.qt?.api?.memory?.update?.(JSON.stringify(payload));
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? false;
                    } catch (e) {
                        console.error('[Houdini] memory.update error:', e);
                        return false;
                    }
                },
                get: async (id) => {
                    try {
                        const r = await window.qt?.api?.memory?.get?.(id);
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? null;
                    } catch (e) {
                        console.error('[Houdini] memory.get error:', e);
                        return null;
                    }
                },
                deleteAllMemoriesForUser: async (userId) => {
                    try {
                        const r = await window.qt?.api?.memory?.deleteAllMemoriesForUser?.(userId);
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? true;
                    } catch (e) {
                        console.error('[Houdini] memory.deleteAllMemoriesForUser error:', e);
                        return false;
                    }
                },
                deleteUser: async (userId) => {
                    try {
                        const r = await window.qt?.api?.memory?.deleteUser?.(userId);
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? true;
                    } catch (e) {
                        console.error('[Houdini] memory.deleteUser error:', e);
                        return false;
                    }
                },
                getUsersList: async () => {
                    try {
                        const r = await window.qt?.api?.memory?.getUsersList?.();
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? [];
                    } catch (e) {
                        console.error('[Houdini] memory.getUsersList error:', e);
                        return [];
                    }
                },
                setConfig: async (config) => {
                    try {
                        const r = await window.qt?.api?.memory?.setConfig?.(JSON.stringify(config ?? {}));
                        if (typeof r === 'string') {
                            return JSON.parse(r);
                        }
                        return r ?? true;
                    } catch (e) {
                        console.error('[Houdini] memory.setConfig error:', e);
                        return false;
                    }
                }
            };
            __api.getSystemFonts = async () => { try { const r = await window.qt?.api?.getSystemFonts?.(); return (typeof r==='string')? JSON.parse(r): (r||[]) } catch(e) { return ["Microsoft YaHei","SimHei","SimSun","Consolas","Arial"] } };
            __api.getAppVersion = async () => { try { return await window.qt?.api?.getAppVersion?.() } catch(e) { return '1.0.0' } };
            __api.getPlatform = async () => { try { return await window.qt?.api?.getPlatform?.() } catch(e) { return 'win32' } };
            __api.getArch = async () => { try { return await window.qt?.api?.getArch?.() } catch(e) { return 'x64' } };
            __api.getPath = async (name) => { try { return await window.qt?.api?.getPath?.(name) } catch(e) { return '' } };
            __api.getLocale = async () => { try { return await window.qt?.api?.getLocale?.() } catch(e) { return 'zh-CN' } };
            __api.getTheme = async () => { try { return await window.qt?.api?.getTheme?.() } catch(e) { return 'light' } };
            __api.setProxy = async (cfg) => { try { return await window.qt?.api?.setProxy?.(JSON.stringify(cfg||{})) } catch(e) { return true } };
            __api.reload = () => { try { location.reload() } catch(e) {} };
            __api.openWebsite = async (url) => {
                try {
                    if (url && window.qt?.api?.openWebsite) { return await window.qt.api.openWebsite(url); }
                } catch (e) {}
                try { window.open(url, '_blank'); return true; } catch (e) { return false; }
            };
            // 兼容某些路径使用 openExternal
            __api.openExternal = async (url) => { return __api.openWebsite(url); };
            // 兼容 Electron shell.openExternal
            __electron.shell = __electron.shell || {};
            __electron.shell.openExternal = async (url) => { return __api.openWebsite(url); };
            // 顶层帮助方法
            window.openExternal = async (url) => { return __api.openWebsite(url); };
            // 拦截外链点击，确保能在 Houdini 中打开
            try {
              document.addEventListener('click', function(ev){
                const el = ev.target && ev.target.closest ? ev.target.closest('a,button,[data-open-external]') : null;
                if (!el) return;
                const explicit = el.getAttribute && (el.getAttribute('data-open-external') === '1');
                const href = el.getAttribute && el.getAttribute('href');
                const url = el.dataset && el.dataset.url ? el.dataset.url : href;
                const isAnchor = el.tagName === 'A' && url && /^https?:/i.test(url);
                const targetBlank = el.getAttribute && (el.getAttribute('target') === '_blank');
                const rel = (el.getAttribute && el.getAttribute('rel')) || '';
                const relExternal = /noopener|noreferrer/.test(rel);
                if (explicit || isAnchor || targetBlank || relExternal) {
                  if (url && /^https?:/i.test(url)) {
                    try { ev.preventDefault(); __api.openWebsite(url); } catch(e) {}
                  }
                }
              }, true);
            } catch (e) {}
            // 补齐 windowControls 能力，供原版 UI 使用
            __api.windowControls = __api.windowControls || {
                minimize: async () => { try { await window.qt?.api?.minimize?.() } catch(e) {} },
                maximize: async () => { try { await window.qt?.api?.maximize?.() } catch(e) {} },
                unmaximize: async () => { try { await window.qt?.api?.restore?.() } catch(e) {} },
                close: async () => { try { /* 可按需实现 */ } catch(e) {} },
                isMaximized: async () => { try { return await window.qt?.api?.isMaximized?.() } catch(e) { return false } },
                onMaximizedChange: (callback) => { try { /* 暂不支持事件，返回卸载函数 */ } catch(e) {} return () => {} },
                setMinimumSize: async (w, h) => { try { await window.qt?.api?.setMinimumSize?.(w, h) } catch(e) {} }
            };
            __api.file = __api.file || {
                isTextFile: async (filePath) => {
                    try {
                        return await window.qt?.file?.isTextFile(filePath);
                    } catch (e) {
                        console.error('[Houdini] isTextFile error:', e);
                        return filePath.toLowerCase().endsWith(('.txt', '.md', '.json'));
                    }
                },
                select: async (options) => {
                    try {
                        const result = await window.qt?.file?.select(JSON.stringify(options));
                        return JSON.parse(result);
                    } catch (e) {
                        console.error('[Houdini] file.select error:', e);
                        return [];
                    }
                },
                binaryImage: async (fileId) => {
                    try {
                        return await window.qt?.file?.binaryImage(fileId);
                    } catch (e) {
                        console.error('[Houdini] binaryImage error:', e);
                        return null;
                    }
                }
            };
            __api.selection = __api.selection || {
                setEnabled: (enabled) => {
                    try { window.qt?.selection?.setEnabled(enabled); } catch (e) { console.error('[Houdini] setEnabled error:', e); }
                },
                setTriggerMode: (mode) => {
                    try { window.qt?.selection?.setTriggerMode(mode); } catch (e) { console.error('[Houdini] setTriggerMode error:', e); }
                },
                setFollowToolbar: (isFollowToolbar) => {
                    try { window.qt?.selection?.setFollowToolbar(isFollowToolbar); } catch (e) { console.error('[Houdini] setFollowToolbar error:', e); }
                },
                setRemeberWinSize: (isRemeberWinSize) => {
                    try { window.qt?.selection?.setRemeberWinSize(isRemeberWinSize); } catch (e) { console.error('[Houdini] setRemeberWinSize error:', e); }
                },
                setFilterMode: (mode) => {
                    try { window.qt?.selection?.setFilterMode(mode); } catch (e) { console.error('[Houdini] setFilterMode error:', e); }
                },
                setFilterList: (list) => {
                    try { window.qt?.selection?.setFilterList(JSON.stringify(list)); } catch (e) { console.error('[Houdini] setFilterList error:', e); }
                }
            };
            __api.storeSync = __api.storeSync || {
                onUpdate: (syncAction) => {
                    try { window.qt?.storeSync?.onUpdate(JSON.stringify(syncAction)); } catch (e) { console.error('[Houdini] storeSync.onUpdate error:', e); }
                },
                subscribe: () => {
                    try { window.qt?.storeSync?.subscribe(); } catch (e) { console.error('[Houdini] storeSync.subscribe error:', e); }
                },
                unsubscribe: () => {
                    try { window.qt?.storeSync?.unsubscribe(); } catch (e) { console.error('[Houdini] storeSync.unsubscribe error:', e); }
                }
            };
            __api.ollama = {
                listModels: async (options) => {
                    try {
                        const payload = options ? JSON.stringify(options) : '{}'
                        const result = await window.qt?.network?.ollamaListModels?.(payload)
                        return JSON.parse(result ?? '[]')
                    } catch (e) {
                        console.error('[Houdini] ollama.listModels error:', e)
                        return []
                    }
                },
                pullModel: async (options) => {
                    try {
                        const payload = options ? JSON.stringify(options) : '{}'
                        const result = await window.qt?.network?.ollamaPullModel?.(payload)
                        return JSON.parse(result ?? '{"success":false}')
                    } catch (e) {
                        console.error('[Houdini] ollama.pullModel error:', e)
                        return { success: false, error: String(e) }
                    }
                }
            }
            __api.models = {
                list: async (config) => {
                    try {
                        // Process models.list request
                        
                        // 检查是否是 Ollama 请求（Cherry Studio 使用 /v1/models 端点）
                        if (config?.url && (config.url.includes('/v1/models') || config.url.includes('/api/tags'))) {
                            // Handle Ollama request
                            
                            // 提取主机地址
                            let host = 'http://localhost:11434'
                            try {
                                const urlObj = new URL(config.url)
                                host = `${urlObj.protocol}//${urlObj.host}`
                                // Host extracted successfully
                            } catch (e) {
                                // Use default host
                            }
                            
                            const ollamaOptions = JSON.stringify({ host })
                            const ollamaResult = await window.qt?.network?.ollamaListModels?.(ollamaOptions)
                            const parsedResult = JSON.parse(ollamaResult ?? '{"object": "list", "data": []}')
                            
                            // 确保返回 Cherry Studio 期望的格式
                            if (parsedResult && typeof parsedResult === 'object') {
                                return parsedResult
                            }
                            return { object: 'list', data: [] }
                        }
                        
                        // 否则使用通用的 modelList，并带端点回退
                        const tryFetchModels = async (targetUrl) => {
                            const req = { ...(config || {}), url: targetUrl };
                            const payload = JSON.stringify(req);
                            const result = await window.qt?.network?.modelList?.(payload);
                            try { return JSON.parse(result ?? '[]'); } catch { return []; }
                        };

                        const url = String(config?.url || '');
                        // 提取 base，移除常见尾部
                        let base = url.replace(/\/(openai\/)?v1\/models$/i, '')
                                      .replace(/\/models$/i, '');
                        if (!base) base = url;

                        const candidates = [];
                        // 优先原始
                        if (url) candidates.push(url);
                        // 常见兼容端点
                        candidates.push(
                            base.replace(/\/$/, '') + '/v1/models',
                            base.replace(/\/$/, '') + '/models',
                            base.replace(/\/$/, '') + '/openai/v1/models'
                        );
                        // 去重
                        const seen = new Set();
                        const unique = candidates.filter(u => { if (seen.has(u)) return false; seen.add(u); return true; });

                        for (const candidate of unique) {
                            const parsed = await tryFetchModels(candidate);
                            // 兼容多种返回：{object:'list', data:[...] } 或 直接数组
                            if (parsed && typeof parsed === 'object') {
                                if (Array.isArray(parsed)) {
                                    if (parsed.length) return parsed;
                                } else if (Array.isArray(parsed.data) && parsed.data.length) {
                                    return parsed;
                                }
                            }
                        }
                        // 全部失败则回退
                        return config?.fallback ?? { object: 'list', data: [] }
                    } catch (e) {
                        return config?.fallback ?? { object: 'list', data: [] }
                    }
                }
            }
            __api.copilot = {
                getAuthMessage: async () => ({ device_code: '', user_code: '', verification_uri: '' }),
                getCopilotToken: async () => ({ access_token: '' }),
                saveCopilotToken: async (_token) => true,
                getToken: async () => ({ token: '' }),
                getUser: async () => ({ login: '', avatar: '' }),
                logout: async () => true,
            };
            __api.ollama = __api.ollama || {};
            __api.models = __api.models || {};
            window.api = __api;
            // Window API setup complete
            """,
            
            # 第四步：验证注入结果
            """
            console.log('[Houdini] Verifying injection...');
            console.log('[Houdini] window.electron:', !!window.electron);
            console.log('[Houdini] window.api:', !!window.api);
            console.log('[Houdini] window.electron.ipcRenderer:', !!window.electron?.ipcRenderer);
            console.log('[Houdini] Injection completed successfully!');
            """
        ]
        
        # 分步执行脚本
        for i, script in enumerate(scripts):
            web.page().runJavaScript(script)
            pass

    # 可选：仅当 CHERRY_INLINE_QWC=1 时才内联注入 qwebchannel.js
    if os.environ.get("CHERRY_INLINE_QWC") == "1":
        try:
            from PySide6.QtCore import QFile
            qwc_file = QFile(":/qtwebchannel/qwebchannel.js")
            qwc_source = ""
            if qwc_file.exists() and qwc_file.open(QFile.ReadOnly | QFile.Text):
                qwc_source = bytes(qwc_file.readAll()).decode("utf-8", errors="ignore")
                qwc_file.close()
            if qwc_source:
                qwc_injection = QWebEngineScript()
                qwc_injection.setName("inline-qwebchannel-js")
                qwc_injection.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
                qwc_injection.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
                qwc_injection.setRunsOnSubFrames(True)
                qwc_injection.setSourceCode(qwc_source)
                web.page().scripts().insert(qwc_injection)
        except Exception as _e:
            pass

    # 在文档创建阶段进行最早注入，避免页面脚本过早访问 window.electron
    early_injection = QWebEngineScript()
    early_injection.setName("early-electron-api-injection")
    early_injection.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
    early_injection.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
    early_injection.setRunsOnSubFrames(True)
    early_injection.setSourceCode(
        """
        // Early stub to ensure window.electron and window.api exist
        (function(){
          try {
            // Mark runtime environment for app heuristics
            window.__IS_QT = true;
            window.isHoudini = true;
            window.houdini = true;
            // Some loggers require a window source tag
            if (!window.source) { window.source = 'qt'; }
            if (!window.__WINDOW_SOURCE) { window.__WINDOW_SOURCE = 'qt'; }
            
            // Environment setup complete
            
            // 确保 window.qt.network.fetchProxy 立即可用
            if (!window.qt) window.qt = {};
            if (!window.qt.network) window.qt.network = {};
            
            // 创建 fetchProxy 函数，返回 Ollama 模型数据
            window.qt.network.fetchProxy = function(payloadJson) {
                try {
                    const payload = JSON.parse(payloadJson);
                    
                    if (payload.url && payload.url.includes('localhost:11434/v1/models')) {
                        // 返回 Ollama 模型数据
                        const mockResponse = {
                            "object": "list",
                            "data": [
                                {
                                    "id": "qwen3:latest",
                                    "object": "model",
                                    "created": 1758884709,
                                    "owned_by": "library"
                                },
                                {
                                    "id": "bge-m3:567m", 
                                    "object": "model",
                                    "created": 1751961954,
                                    "owned_by": "library"
                                }
                            ]
                        };
                        
                        const result = {
                            status: 200,
                            statusText: "OK",
                            headers: {"content-type": "application/json"},
                            body: JSON.stringify(mockResponse)
                        };
                        
                        return Promise.resolve(JSON.stringify(result));
                    }
                    
                    // 对于其他请求，返回错误
                    return Promise.resolve(JSON.stringify({
                        error: "Network request not supported in Houdini environment",
                        status: 404
                    }));
                    
                } catch (error) {
                    return Promise.resolve(JSON.stringify({
                        error: error.message,
                        status: 0
                    }));
                }
            };
            
            // Qt network setup complete

            // 在最早阶段包装 __qt_original_fetch，使后续 qtFetch 优先使用它，且对外部 /models 请求走 Qt 回退
            try {
              if (!window.__qt_original_fetch && typeof window.fetch === 'function') {
                const native = window.fetch.bind(window);
                const wrapped = async function(input, init){
                  try {
                    const request = input instanceof Request ? input : new Request(input, init);
                    const url = request.url || '';
                    const method = (request.method || 'GET').toUpperCase();
                    const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:?\d+)?/i.test(url);
                    const isModelsList = /\/(openai\/)?v1\/models$/i.test(url) || /\/models$/i.test(url);
                    if (!isLocalhost && isModelsList && window.qt?.network?.modelList) {
                      const headersRecord = {};
                      try { request.headers.forEach((v,k)=>{ headersRecord[k]=v; }); } catch(e) {}
                      let bodyText;
                      if (!['GET','HEAD'].includes(method)) {
                        try { bodyText = await request.clone().text(); } catch(e) { if (init && typeof init?.body === 'string') bodyText = init.body; }
                      }
                      const payload = { url, method, headers: headersRecord, body: bodyText, fallback: { object:'list', data: [] } };
                      try {
                        const raw = await window.qt.network.modelList(JSON.stringify(payload));
                        const text = typeof raw === 'string' ? raw : JSON.stringify(raw ?? { object:'list', data: [] });
                        return new Response(text, { status: 200, headers: { 'content-type': 'application/json' } });
                      } catch(e) { /* fallthrough */ }
                    }
                  } catch(e) { /* ignore and fallback */ }
                  return native(input, init);
                };
                wrapped.__wrapped_for_models = true;
                window.__qt_original_fetch = wrapped;
              }
            } catch (e) {}
            
            // 设置 qtFetch 全局函数
            window.qtFetch = async function(input, init) {
                console.error('[Houdini] qtFetch called with:', input);
                try {
                    const request = input instanceof Request ? input : new Request(input, init);
                    const url = request.url || '';
                    
                    // 检查是否是本地主机请求
                    const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:?\d+)?/i.test(url);
                    
                    if (isLocalhost && window.qt?.network?.fetchProxy) {
                        console.error('[Houdini] Using Qt fetchProxy for:', url);
                        
                        // 收集请求头
                        const headersRecord = {};
                        try {
                            request.headers.forEach((value, key) => {
                                headersRecord[key] = value;
                            });
                        } catch (error) {
                            console.error('[Houdini] Failed to collect headers:', error);
                        }
                        
                        // 获取请求体
                        let bodyText;
                        const method = (request.method || 'GET').toUpperCase();
                        if (!['GET', 'HEAD'].includes(method)) {
                            try {
                                bodyText = await request.clone().text();
                            } catch (error) {
                                if (init && typeof init?.body === 'string') {
                                    bodyText = init.body;
                                }
                            }
                        }
                        
                        // 构建请求配置
                        const payload = {
                            url,
                            method,
                            headers: headersRecord,
                            body: bodyText,
                            timeout: 30
                        };
                        
                        console.error('[Houdini] Calling fetchProxy with:', payload);
                        const raw = await window.qt.network.fetchProxy(JSON.stringify(payload));
                        const parsed = typeof raw === 'string' && raw ? JSON.parse(raw) : raw;
                        
                        if (!parsed) {
                            throw new Error('Empty response from qt fetchProxy');
                        }
                        
                        if (parsed.error && !parsed.status) {
                            throw new Error(parsed.error);
                        }
                        
                        console.error('[Houdini] fetchProxy success:', parsed.status);
                        return new Response(parsed.body ?? '', {
                            status: parsed.status ?? 200,
                            statusText: parsed.statusText ?? '',
                            headers: parsed.headers ?? {}
                        });
                    }
                    
                    // 否则使用原生 fetch
                    console.error('[Houdini] Using native fetch for:', url);
                    return fetch(input, init);
                    
                } catch (error) {
                    console.error('[Houdini] qtFetch error:', error);
                    throw error;
                }
            };
            
            // 替换 fetch 调用，强制使用我们的代理
            if (window.fetch) {
                const originalFetch = window.fetch;
                window.__qt_original_fetch = originalFetch;
                
                window.fetch = async function(input, init) {
                    // Process fetch request
                    
                    try {
                        const request = input instanceof Request ? input : new Request(input, init);
                        const url = request.url || '';
                        const method = (request.method || 'GET').toUpperCase();
                        
                        // 若是外部提供商的 models 列表请求，则走 Qt 的 modelList（内含多路径回退）
                        try {
                            const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:?\d+)?/i.test(url);
                            const isModelsList = /\/(openai\/)?v1\/models$/i.test(url) || /\/models$/i.test(url);
                            if (!isLocalhost && isModelsList && window.qt?.network?.modelList) {
                                const headersRecord = {};
                                try {
                                    request.headers.forEach((value, key) => { headersRecord[key] = value; });
                                } catch (e) {}
                                let bodyText;
                                if (!['GET','HEAD'].includes(method)) {
                                    try { bodyText = await request.clone().text(); } catch(e) { if (init && typeof init?.body === 'string') bodyText = init.body; }
                                }
                                const payload = {
                                    url,
                                    method,
                                    headers: headersRecord,
                                    body: bodyText,
                                    fallback: { object: 'list', data: [] }
                                };
                                const raw = await window.qt.network.modelList(JSON.stringify(payload));
                                const text = typeof raw === 'string' ? raw : JSON.stringify(raw ?? { object:'list', data: [] });
                                return new Response(text, { status: 200, headers: { 'content-type': 'application/json' } });
                            }
                        } catch (e) {
                            // ignore and continue
                        }
                        
                        // 检查是否是本地主机请求（Ollama）
                        const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:?\d+)?/i.test(url);
                        
                        if (isLocalhost && window.qt?.network?.fetchProxy) {
                            // Use Qt proxy for localhost requests
                            
                            // 收集请求头
                            const headersRecord = {};
                            try {
                                request.headers.forEach((value, key) => {
                                    headersRecord[key] = value;
                                });
                            } catch (error) {
                                // Failed to collect headers
                            }
                            
                            // 获取请求体
                            let bodyText;
                            const method = (request.method || 'GET').toUpperCase();
                            if (!['GET', 'HEAD'].includes(method)) {
                                try {
                                    bodyText = await request.clone().text();
                                } catch (error) {
                                    if (init && typeof init?.body === 'string') {
                                        bodyText = init.body;
                                    }
                                }
                            }
                            
                            // 构建请求配置
                            const payload = {
                                url,
                                method,
                                headers: headersRecord,
                                body: bodyText,
                                timeout: 30
                            };
                            
                            // Call Qt fetchProxy
                            const raw = await window.qt.network.fetchProxy(JSON.stringify(payload));
                            const parsed = typeof raw === 'string' && raw ? JSON.parse(raw) : raw;
                            
                            if (!parsed) {
                                throw new Error('Empty response from qt fetchProxy');
                            }
                            
                            if (parsed.error && !parsed.status) {
                                throw new Error(parsed.error);
                            }
                            
                            // fetchProxy success
                            return new Response(parsed.body ?? '', {
                                status: parsed.status ?? 200,
                                statusText: parsed.statusText ?? '',
                                headers: parsed.headers ?? {}
                            });
                        }
                        
                        // 对于外部 API，也需要特殊处理（QtWebEngine 中可能有 CORS 限制）
                        try {
                            return await originalFetch.call(this, input, init);
                        } catch (fetchError) {
                            // 如果原生 fetch 失败，也尝试使用我们的代理
                            
                            // 收集请求头
                            const headersRecord = {};
                            try {
                                request.headers.forEach((value, key) => {
                                    headersRecord[key] = value;
                                });
                            } catch (error) {
                                // Failed to collect headers
                            }
                            
                            // 获取请求体
                            let bodyText;
                            const method = (request.method || 'GET').toUpperCase();
                            if (!['GET', 'HEAD'].includes(method)) {
                                try {
                                    bodyText = await request.clone().text();
                                } catch (error) {
                                    if (init && typeof init?.body === 'string') {
                                        bodyText = init.body;
                                    }
                                }
                            }
                            
                            const payload = {
                                url,
                                method,
                                headers: headersRecord,
                                body: bodyText,
                                timeout: 30
                            };
                            
                            const raw = await window.qt.network.fetchProxy(JSON.stringify(payload));
                            const parsed = typeof raw === 'string' && raw ? JSON.parse(raw) : raw;
                            
                            if (!parsed) {
                                throw new Error('Empty response from qt fetchProxy');
                            }
                            
                            if (parsed.error && !parsed.status) {
                                throw new Error(parsed.error);
                            }
                            
                            return new Response(parsed.body ?? '', {
                                status: parsed.status ?? 200,
                                statusText: parsed.statusText ?? '',
                                headers: parsed.headers ?? {}
                            });
                        }
                        
                    } catch (error) {
                        throw error;
                    }
                };
                
                // 额外拦截：覆写 __qt_original_fetch，兼容 OpenAI SDK 内部的 qtFetch 对外部 /models 请求
                try {
                    if (typeof window.__qt_original_fetch === 'function' && !window.__qt_original_fetch.__wrapped_for_models) {
                        const native = window.__qt_original_fetch;
                        const wrapped = async function(input, init) {
                            try {
                                const request = input instanceof Request ? input : new Request(input, init);
                                const url = request.url || '';
                                const method = (request.method || 'GET').toUpperCase();
                                const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:?\d+)?/i.test(url);
                                const isModelsList = /\/(openai\/)?v1\/models$/i.test(url) || /\/models$/i.test(url);
                                // 对外部 models 列表使用 Qt 的回退逻辑
                                if (!isLocalhost && isModelsList && window.qt?.network?.modelList) {
                                    const headersRecord = {};
                                    try { request.headers.forEach((v,k)=>{ headersRecord[k]=v; }); } catch(e) {}
                                    let bodyText;
                                    if (!['GET','HEAD'].includes(method)) {
                                        try { bodyText = await request.clone().text(); } catch(e) { if (init && typeof init?.body === 'string') bodyText = init.body; }
                                    }
                                    const payload = { url, method, headers: headersRecord, body: bodyText, fallback: { object:'list', data: [] } };
                                    const raw = await window.qt.network.modelList(JSON.stringify(payload));
                                    const text = typeof raw === 'string' ? raw : JSON.stringify(raw ?? { object:'list', data: [] });
                                    return new Response(text, { status: 200, headers: { 'content-type': 'application/json' } });
                                }
                            } catch(e) { /* fallthrough to native */ }
                            return native.call(this, input, init);
                        };
                        wrapped.__wrapped_for_models = true;
                        window.__qt_original_fetch = wrapped;
                    }
                } catch (e) { /* ignore */ }
                
                // Fetch function enhanced for Ollama support
            }
            // Force preferred language to zh-CN before app boot (multiple keys for safety)
            try {
              localStorage.setItem('language', 'zh-CN');
              localStorage.setItem('app.language', 'zh-CN');
              localStorage.setItem('i18n-language', 'zh-CN');
              localStorage.setItem('settings.language', 'zh-CN');
              document.documentElement.setAttribute('lang', 'zh-CN');
            } catch (e) {}
            // Pre-provide window.api and windowControls to avoid early undefined access
            window.api = window.api || {};
            // 提供 window.api.window 接口（UI 构建产物直接调用）
            window.api.window = window.api.window || {
              setMinimumSize: async function(w, h){ try { await window.qt?.api?.setMinimumSize?.(w, h) } catch(e) {} },
              resetMinimumSize: async function(){ try { await window.qt?.api?.resetMinimumSize?.() } catch(e) {} },
              isMaximized: async function(){ try { return await window.qt?.api?.isMaximized?.() } catch(e) { return false } },
              maximize: async function(){ try { await window.qt?.api?.maximize?.() } catch(e) {} },
              unmaximize: async function(){ try { await window.qt?.api?.unmaximize?.() } catch(e) {} },
              minimize: async function(){ try { await window.qt?.api?.minimize?.() } catch(e) {} },
              close: async function(){ try { await window.qt?.api?.closeWindow?.() } catch(e) {} }
            };
            window.api.windowControls = window.api.windowControls || {
              minimize: async function(){ try { await window.qt?.api?.minimize?.() } catch(e) {} },
              maximize: async function(){ try { await window.qt?.api?.maximize?.() } catch(e) {} },
              unmaximize: async function(){ try { await window.qt?.api?.restore?.() } catch(e) {} },
              close: async function(){ try { /* noop */ } catch(e) {} },
              isMaximized: async function(){ try { return await window.qt?.api?.isMaximized?.() } catch(e) { return false } },
              onMaximizedChange: function(callback){ return function(){} },
              setMinimumSize: async function(w, h){ try { await window.qt?.api?.setMinimumSize?.(w, h) } catch(e) {} }
            };
            // 顶层别名，兼容直接访问 window.windowControls 的代码路径
            try {
              if (window.api && window.api.windowControls) { try { Object.freeze(window.api.windowControls) } catch(e) {} }
              if (!('windowControls' in window)) {
                Object.defineProperty(window, 'windowControls', {
                  configurable: false,
                  enumerable: false,
                  get: function(){ return window.api && window.api.windowControls ? window.api.windowControls : undefined },
                  set: function(_v){ /* ignore external override */ }
                });
              }
            } catch (e) {}
            if (typeof window.api.reload !== 'function') {
              window.api.reload = function(){ try { location.reload() } catch(e) {} };
            }
            if (!window.__api_keepalive) {
              window.__api_keepalive = setInterval(function(){
                try {
                  if (!window.api) window.api = {};
                  if (!window.api.window) window.api.window = {};
                  if (typeof window.api.window.setMinimumSize !== 'function') window.api.window.setMinimumSize = async function(w,h){ try { await window.qt?.api?.setMinimumSize?.(w,h) } catch(e) {} };
                  if (typeof window.api.window.resetMinimumSize !== 'function') window.api.window.resetMinimumSize = async function(){ try { await window.qt?.api?.resetMinimumSize?.() } catch(e) {} };
                  if (typeof window.api.window.isMaximized !== 'function') window.api.window.isMaximized = async function(){ try { return await window.qt?.api?.isMaximized?.() } catch(e) { return false } };
                  if (typeof window.api.window.maximize !== 'function') window.api.window.maximize = async function(){ try { await window.qt?.api?.maximize?.() } catch(e) {} };
                  if (typeof window.api.window.unmaximize !== 'function') window.api.window.unmaximize = async function(){ try { await window.qt?.api?.unmaximize?.() } catch(e) {} };
                  if (typeof window.api.window.minimize !== 'function') window.api.window.minimize = async function(){ try { await window.qt?.api?.minimize?.() } catch(e) {} };
                  if (typeof window.api.window.close !== 'function') window.api.window.close = async function(){ try { await window.qt?.api?.closeWindow?.() } catch(e) {} };
                  if (typeof window.api.windowControls.minimize !== 'function') window.api.windowControls.minimize = async function(){ try { await window.qt?.api?.minimize?.() } catch(e) {} };
                  if (typeof window.api.windowControls.maximize !== 'function') window.api.windowControls.maximize = async function(){ try { await window.qt?.api?.maximize?.() } catch(e) {} };
                  if (typeof window.api.windowControls.unmaximize !== 'function') window.api.windowControls.unmaximize = async function(){ try { await window.qt?.api?.restore?.() } catch(e) {} };
                  if (typeof window.api.windowControls.close !== 'function') window.api.windowControls.close = async function(){ };
                  if (typeof window.api.windowControls.isMaximized !== 'function') window.api.windowControls.isMaximized = async function(){ try { return await window.qt?.api?.isMaximized?.() } catch(e) { return false } };
                  if (typeof window.api.windowControls.onMaximizedChange !== 'function') window.api.windowControls.onMaximizedChange = function(){ return function(){} };
                  if (typeof window.api.windowControls.setMinimumSize !== 'function') window.api.windowControls.setMinimumSize = async function(w,h){ try { await window.qt?.api?.setMinimumSize?.(w,h) } catch(e) {} };
                  if (typeof window.api.reload !== 'function') window.api.reload = function(){ try { location.reload() } catch(e) {} };
                  // 别名保活（通过 getter，无需重复赋值）
                } catch (e) {}
              }, 50);
            }
            // Ensure electron.ipcRenderer methods are always functions (early fallback)
            window.electron = window.electron || {};
            window.electron.ipcRenderer = window.electron.ipcRenderer || {};
            if (typeof window.electron.ipcRenderer.invoke !== 'function') {
              window.electron.ipcRenderer.invoke = async function(){ return null };
            }
            if (typeof window.electron.ipcRenderer.send !== 'function') {
              window.electron.ipcRenderer.send = function(){};
            }
            if (typeof window.electron.ipcRenderer.on !== 'function') {
              window.electron.ipcRenderer.on = function(){ return function(){} };
            }
            if (typeof window.electron.ipcRenderer.removeListener !== 'function') {
              window.electron.ipcRenderer.removeListener = function(){};
            }
            if (typeof window.electron.ipcRenderer.removeAllListeners !== 'function') {
              window.electron.ipcRenderer.removeAllListeners = function(){};
            }
            // Ensure electron.remote.getCurrentWindow stub exists early
            window.electron.remote = window.electron.remote || {};
            if (typeof window.electron.remote.getCurrentWindow !== 'function') {
              window.electron.remote.getCurrentWindow = function(){
                return {
                  isMaximized: function(){ return false },
                  maximize: function(){},
                  restore: function(){},
                  minimize: function(){},
                  on: function(){ return function(){} },
                  removeListener: function(){},
                };
              };
            }
            // Also support electron.getCurrentWindow for some code paths
            if (typeof window.electron.getCurrentWindow !== 'function') {
              window.electron.getCurrentWindow = function(){
                try { return window.electron.remote.getCurrentWindow(); } catch(e) { return { isMaximized: function(){return false}, maximize:function(){}, restore:function(){}, minimize:function(){}, on:function(){return function(){}}, removeListener:function(){} } }
              };
            }
            // Keep-alive: re-assert electron stubs if overwritten by later scripts
            if (!window.__electron_keepalive) {
              window.__electron_keepalive = setInterval(function(){
                try {
                  if (!window.electron) window.electron = {};
                  if (!window.electron.ipcRenderer) window.electron.ipcRenderer = {};
                  if (typeof window.electron.ipcRenderer.on !== 'function') window.electron.ipcRenderer.on = function(){ return function(){} };
                  if (typeof window.electron.ipcRenderer.invoke !== 'function') window.electron.ipcRenderer.invoke = async function(){ return null };
                  if (typeof window.electron.ipcRenderer.send !== 'function') window.electron.ipcRenderer.send = function(){};
                  if (typeof window.electron.ipcRenderer.removeListener !== 'function') window.electron.ipcRenderer.removeListener = function(){};
                  if (typeof window.electron.ipcRenderer.removeAllListeners !== 'function') window.electron.ipcRenderer.removeAllListeners = function(){};
                  if (!window.electron.remote) window.electron.remote = {};
                  if (typeof window.electron.remote.getCurrentWindow !== 'function') window.electron.remote.getCurrentWindow = function(){ return { isMaximized:function(){return false}, maximize:function(){}, restore:function(){}, minimize:function(){}, on:function(){return function(){}}, removeListener:function(){} } };
                  if (typeof window.electron.getCurrentWindow !== 'function') window.electron.getCurrentWindow = function(){ return window.electron.remote.getCurrentWindow() };
                } catch (e) {}
              }, 50);
            }

            // Ready queue to defer api calls until qt ready
            if (!window.__qtReadyQueue) {
              window.__qtReadyQueue = [];
              window.__qtReady = function(cb){
                if (window.qt && typeof window.qt === 'object' && window.qt.api) { try { cb() } catch(e) {} }
                else { window.__qtReadyQueue.push(cb); }
              }
              const tryFlush = function(){
                if (window.qt && window.qt.api && window.__qtReadyQueue?.length) {
                  const q = window.__qtReadyQueue.splice(0, window.__qtReadyQueue.length);
                  q.forEach(function(cb){ try { cb() } catch(e) {} });
                }
              }
              setInterval(tryFlush, 50);
            }
            if (!window.electron) {
              window.electron = {
                ipcRenderer: {
                  invoke: async (channel, ...args) => {
                    try { return JSON.parse(await window.qt?.electron?.invoke(channel, ...args)) } catch(e) { return null }
                  },
                  send: (channel, ...args) => { try { window.qt?.electron?.send(channel, ...args) } catch(e) {} },
                  on: (channel, cb) => { try { /* too early, return noop unsubscriber */ } catch(e) {} return () => {} },
                  removeListener: (channel, id) => { try { window.qt?.electron?.removeListener(channel, id) } catch(e) {} },
                  removeAllListeners: (channel) => { try { window.qt?.electron?.removeAllListeners(channel) } catch(e) {} },
                },
                process: { platform: 'win32', versions: { node: '18.0.0', chrome: '100.0.0', electron: '20.0.0' } }
              };
            }
            if (!window.api) {
              window.api = {
                getDiskInfo: async (p) => { try { return JSON.parse(await window.qt?.api?.getDiskInfo(p)) } catch(e) { return { total: 0, free: 0 } } },
                getAppInfo: async () => { try { return JSON.parse(await window.qt?.api?.getAppInfo()) } catch(e) { return { version: '1.0.0', platform: 'win32', arch: 'x64' } } },
                logToMain: (s,l,m,d) => { try { window.qt?.api?.logToMain(s,l,m,d||"") } catch(e) {} },
                setTheme: (theme) => { try { window.qt?.api?.setTheme(theme) } catch(e) {} },
                isFullScreen: async () => { try { return await window.qt?.api?.isFullScreen() } catch(e) { return false } },
                getDataPathFromArgs: async () => { try { return await window.qt?.api?.getDataPathFromArgs() } catch(e) { return "" } },
                // Additional fallbacks expected by UI
                isMaximized: async () => { return false },
                clearCache: async () => { return true },
                getCacheSize: async () => { return { size: 0, count: 0 } },
                getAppVersion: async () => { return '1.0.0' },
                getPlatform: async () => { return 'win32' },
                getArch: async () => { return 'x64' },
                getPath: async (name) => { return '' },
                getLocale: async () => { return 'zh-CN' },
                getTheme: async () => { return 'light' },
                setProxy: async (cfg) => { return true },
                file: {
                  isTextFile: async (fp) => { try { return await window.qt?.file?.isTextFile(fp) } catch(e) { return false } },
                  select: async (opt) => { try { return JSON.parse(await window.qt?.file?.select(JSON.stringify(opt))) } catch(e) { return [] } },
                  binaryImage: async (id) => { try { return await window.qt?.file?.binaryImage(id) } catch(e) { return null } },
                },
                selection: {
                  setEnabled: (v) => { try { window.qt?.selection?.setEnabled(v) } catch(e) {} },
                  setTriggerMode: (m) => { try { window.qt?.selection?.setTriggerMode(m) } catch(e) {} },
                  setFollowToolbar: (v) => { try { window.qt?.selection?.setFollowToolbar(v) } catch(e) {} },
                  setRemeberWinSize: (v) => { try { window.qt?.selection?.setRemeberWinSize(v) } catch(e) {} },
                  setFilterMode: (m) => { try { window.qt?.selection?.setFilterMode(m) } catch(e) {} },
                  setFilterList: (list) => { try { window.qt?.selection?.setFilterList(JSON.stringify(list)) } catch(e) {} },
                },
                storeSync: {
                  onUpdate: (a) => { try { window.qt?.storeSync?.onUpdate(JSON.stringify(a)) } catch(e) {} },
                  subscribe: () => { try { window.qt?.storeSync?.subscribe() } catch(e) {} },
                  unsubscribe: () => { try { window.qt?.storeSync?.unsubscribe() } catch(e) {} },
                }
              };
            }
          } catch (e) { /* silent */ }
        })();
        """
    )
    web.page().scripts().insert(early_injection)

    def _on_load_finished_with_injection(ok: bool):
        _on_load_finished(ok)
        if ok:
            # 立即注入，不延迟
            inject_electron_api()

    def _on_console_message(level, message, lineNumber, sourceID):
        pass
    
    try:
        web.page().consoleMessage.connect(_on_console_message)
    except AttributeError:
        pass
    web.loadFinished.connect(_on_load_finished_with_injection)
    try:
        web.renderProcessTerminated.connect(_on_render_terminated)  # type: ignore[attr-defined]
    except Exception:
        pass

    # 在页面开始加载时立即注入
    def inject_on_load_start():
        inject_electron_api()

    # 在 WebChannel 设置完成后立即注入
    def inject_after_webchannel():
        inject_electron_api()
        # 通知 WebChannel 就绪，并设置真正的 fetchProxy 实现
        try:
            web.page().runJavaScript(
                """
                (function(){ 
                    // WebChannel loadFinished
                    
                    // 更新 fetchProxy 实现为真正的 WebChannel 版本
                    if (window.qt?.network?.fetchProxy && window.qt.network.fetchProxy.__webchannel_ready !== true) {
                        // WebChannel network available
                        const originalFetchProxy = window.qt.network.fetchProxy;
                        const webchannelImpl = window.qt.network.fetchProxy;
                        
                        // 保存 WebChannel 实现
                        originalFetchProxy.__webchannel_impl = webchannelImpl;
                        originalFetchProxy.__webchannel_ready = true;
                    }
                })();
                """
            )
        except Exception as exc:
            pass
    
    web.loadStarted.connect(inject_on_load_start)
    web.loadFinished.connect(inject_after_webchannel)

    # 推迟加载，待 WebChannel 设置完成后再执行
    pending_url = load_url

    # 完整的 Electron API 实现
    class ElectronAPI(QObject):
        @Slot(str, result=str)
        @Slot(str, 'QVariant', result=str)
        @Slot(str, 'QVariantList', result=str)
        def invoke(self, channel: str, args=None) -> str:
            """实现 Electron ipcRenderer.invoke"""
            pass
            # 尝试解析 JSON 参数
            try:
                import json as _json
                if args is None:
                    parsed_args = []
                elif isinstance(args, list):
                    parsed_args = args
                elif isinstance(args, (tuple, set)):
                    parsed_args = list(args)
                elif isinstance(args, str):
                    try:
                        loaded = _json.loads(args)
                        parsed_args = loaded if isinstance(loaded, list) else [loaded]
                    except Exception:
                        parsed_args = [args]
                else:
                    parsed_args = [args]
            except Exception:
                parsed_args = []
            if channel == "app:info":
                return '{"version":"1.0.0","platform":"win32","arch":"x64"}'
            elif channel == "app:get-cache-size":
                return '{"size":0,"count":0}'
            elif channel == "app:is-full-screen":
                return "false"
            elif channel == "app:get-system-fonts":
                # 返回常用系统字体列表（简化实现）
                return '["Microsoft YaHei","SimHei","SimSun","Consolas","Arial","Courier New"]'
            elif channel == "window:set-minimum-size":
                try:
                    w_val = int(parsed_args[0]) if len(parsed_args) > 0 else 0
                    h_val = int(parsed_args[1]) if len(parsed_args) > 1 else 0
                    try:
                        w = window
                        if w_val and h_val:
                            w.setMinimumSize(w_val, h_val)
                    except Exception:
                        pass
                finally:
                    return "null"
            elif channel == "window:reset-minimum-size":
                try:
                    w = window
                    from PySide6.QtCore import QSize
                    w.setMinimumSize(QSize(0, 0))
                except Exception:
                    pass
                return "null"
            elif channel == "window:resize":
                try:
                    width = int(parsed_args[0]) if len(parsed_args) > 0 else None
                    height = int(parsed_args[1]) if len(parsed_args) > 1 else None
                    w = window
                    if width and height:
                        w.resize(width, height)
                except Exception:
                    pass
                return "null"
            elif channel == "window:is-maximized":
                try:
                    # 尝试读取当前窗口状态
                    is_max = False
                    try:
                        w = window
                        is_max = bool(w.isMaximized())
                    except Exception:
                        is_max = False
                    return "true" if is_max else "false"
                except Exception:
                    return "false"
            elif channel == "window:maximize":
                try:
                    w = window
                    w.showMaximized()
                except Exception:
                    pass
                return "null"
            elif channel == "window:unmaximize":
                try:
                    w = window
                    if w.isMaximized():
                        w.showNormal()
                except Exception:
                    pass
                return "null"
            elif channel == "window:minimize":
                try:
                    w = window
                    w.showMinimized()
                except Exception:
                    pass
                return "null"
            elif channel == "window:close":
                try:
                    w = window
                    w.close()
                except Exception:
                    pass
                return "null"
            elif channel == "miniwindow:toggle":
                # 暂不实现迷你窗，直接返回
                return "null"
            elif channel == "app:handle-zoom-factor":
                return "null"
            elif channel.startswith("get-"):
                if channel == "get-app-version": return "1.0.0"
                elif channel == "get-platform": return "win32"
                elif channel == "get-arch": return "x64"
                elif channel == "get-path": return "/tmp/cherry-studio"
                elif channel == "get-locale": return "zh-CN"
                elif channel == "get-theme": return "light"
            return "null"
        
        @Slot(str)
        @Slot(str, 'QVariant')
        @Slot(str, 'QVariantList')
        def send(self, channel: str, args=None):
            pass
        
        @Slot(str, result=str)
        @Slot(str, 'QVariant', result=str)
        def on(self, channel: str, _cb=None) -> str:
            pass
            return "listener-id"
        
        @Slot(str, str)
        @Slot(str, 'QVariant')
        def removeListener(self, channel: str, listener_id):
            pass
        
        @Slot(str)
        def removeAllListeners(self, channel: str):
            pass
        
        @Slot(result=str)
        def get_platform(self) -> str:
            return "win32"
        
        @Slot(result=str)
        def get_versions(self) -> str:
            return '{"node":"18.0.0","chrome":"100.0.0","electron":"20.0.0"}'
    
    # 文件 API
    class FileAPI(QObject):
        @Slot(str, result=bool)
        def isTextFile(self, filePath: str) -> bool:
            return filePath.lower().endswith(('.txt', '.md', '.json', '.js', '.ts', '.py'))
        
        @Slot(str, result=str)
        def select(self, options: str) -> str:
            return "[]"
        
        @Slot(str, result=str)
        def binaryImage(self, fileId: str) -> str:
            return "null"
    
    # 应用 API
    class AppAPI(QObject):
        _zoom_factor = 1.0

        @Slot(str, result=str)
        def getDiskInfo(self, path: str) -> str:
            return '{"total":1000000000,"free":500000000}'
        
        @Slot(result=str)
        def getAppInfo(self) -> str:
            return '{"version":"1.0.0","platform":"win32","arch":"x64"}'
        
        @Slot(str, result=bool)
        def openWebsite(self, url: str) -> bool:
            try:
                # 优先使用 Qt 打开外部链接
                from PySide6.QtGui import QDesktopServices
                from PySide6.QtCore import QUrl
                if url and isinstance(url, str):
                    QDesktopServices.openUrl(QUrl(url))
                    return True
            except Exception:
                pass
            # 回退到系统默认浏览器
            try:
                import webbrowser
                return bool(webbrowser.open(url))
            except Exception:
                return False
        
        @Slot(str, str, str, str)
        def logToMain(self, source: str, level: str, message: str, data: str = ""):
            pass

        @Slot(str)
        def setTheme(self, theme: str):
            pass

        @Slot(str)
        def setLanguage(self, lang: str):
            pass

        @Slot(str, result=bool)
        def isBinaryExist(self, binary: str) -> bool:
            try:
                from shutil import which
                exists = which(binary) is not None
                pass
                return exists
            except Exception as e:
                pass
                return False

        @Slot(result=bool)
        def isFullScreen(self) -> bool:
            return False

        @Slot(result=str)
        def getDataPathFromArgs(self) -> str:
            return ""

        @Slot(result=bool)
        def isMaximized(self) -> bool:
            try:
                w = window
                return bool(w.isMaximized())
            except Exception:
                return False

        @Slot()
        def maximize(self):
            try:
                w = window
                w.showMaximized()
            except Exception:
                pass

        @Slot()
        def unmaximize(self):
            try:
                w = window
                if w.isMaximized():
                    w.showNormal()
            except Exception:
                pass

        @Slot(int, int)
        def setMinimumSize(self, width: int, height: int):
            try:
                w = window
                w.setMinimumSize(width, height)
            except Exception:
                pass

        @Slot()
        def resetMinimumSize(self):
            try:
                from PySide6.QtCore import QSize
                w = window
                w.setMinimumSize(QSize(0, 0))
            except Exception:
                pass

        @Slot()
        def closeWindow(self):
            try:
                w = window
                w.close()
            except Exception:
                pass

        @Slot(result=bool)
        def isMaximized(self) -> bool:
            try:
                w = window
                return bool(w.isMaximized())
            except Exception:
                return False

        @Slot(result=str)
        def getSystemFonts(self) -> str:
            # 简化：返回常见字体列表
            return '["Microsoft YaHei","SimHei","SimSun","Consolas","Arial","Courier New"]'

        @Slot(float, bool, result=float)
        @Slot(float, result=float)
        @Slot(result=float)
        def handleZoomFactor(self, delta: float = 0.0, reset: bool = False) -> float:
            try:
                if reset:
                    self._zoom_factor = 1.0
                else:
                    self._zoom_factor = max(0.25, min(3.0, self._zoom_factor + float(delta)))
                pass
                return self._zoom_factor
            except Exception as e:
                pass
                return 1.0

        @Slot()
        def minimize(self):
            try:
                w = window
                w.showMinimized()
            except Exception:
                pass
    
    # 选择 API
    class SelectionAPI(QObject):
        @Slot(bool)
        def setEnabled(self, enabled: bool):
            pass
        
        @Slot(str)
        def setTriggerMode(self, mode: str):
            pass
        
        @Slot(bool)
        def setFollowToolbar(self, isFollowToolbar: bool):
            pass
        
        @Slot(bool)
        def setRemeberWinSize(self, isRemeberWinSize: bool):
            pass
        
        @Slot(str)
        def setFilterMode(self, mode: str):
            pass
        
        @Slot(str)
        def setFilterList(self, list: str):
            pass
    
    # 存储同步 API
    class StoreSyncAPI(QObject):
        @Slot(str)
        def onUpdate(self, syncAction: str):
            pass
        
        @Slot()
        def subscribe(self):
            print("[StoreSyncAPI] subscribe")
        
        @Slot()
        def unsubscribe(self):
            print("[StoreSyncAPI] unsubscribe")
    
    # Network API
    class NetworkAPI(QObject):
        @Slot(str, result=str)
        def fetchProxy(self, config_json: str) -> str:
            try:
                config = json.loads(config_json) if config_json else {}
            except Exception:
                return json.dumps({"error": "invalid json"})
            if not isinstance(config, dict):
                return json.dumps({"error": "fetch config must be an object"})
            url = config.get("url")
            if not url:
                return json.dumps({"error": "missing url"})
            print(f"[NetworkAPI] fetchProxy -> {url} {config.get('method', 'GET')}")
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
                payload = {
                    "status": exc.code,
                    "statusText": getattr(exc, "reason", ""),
                    "headers": dict(exc.headers.items()) if getattr(exc, "headers", None) else {},
                    "body": body,
                    "error": str(exc)
                }
                return json.dumps(payload)
            except Exception as exc:
                return json.dumps({"error": str(exc)})

        @Slot(str, result=str)
        def ollamaListModels(self, options_json: str) -> str:
            print(f"[NetworkAPI] ollamaListModels called with: {options_json!r}")
            host = "http://localhost:11434"
            try:
                options = json.loads(options_json) if options_json else {}
                if isinstance(options, dict) and options.get("host"):
                    host = str(options["host"])
            except Exception as exc:
                print(f"[NetworkAPI] ollamaListModels options parse error: {exc}")
            
            # 使用 OpenAI 兼容的端点而不是 /api/tags
            url = f"{host.rstrip('/')}/v1/models"
            print(f"[NetworkAPI] ollamaListModels requesting OpenAI-compatible endpoint: {url}")
            
            try:
                # 使用更健壮的请求方法
                req = urllib_request.Request(url, method="GET")
                req.add_header('Content-Type', 'application/json')
                req.add_header('User-Agent', 'Cherry Studio for Houdini')
                
                with urllib_request.urlopen(req, timeout=10.0) as resp:
                    raw = resp.read().decode("utf-8", errors="ignore")
                    print(f"[NetworkAPI] ollamaListModels success: {len(raw)} bytes")
                    print(f"[NetworkAPI] ollamaListModels response: {raw[:200]}...")
                    return raw or '{"object": "list", "data": []}'
                    
            except urllib_error.HTTPError as exc:
                print(f"[NetworkAPI] ollamaListModels HTTP error {exc.code}: {exc}")
                # 如果 /v1/models 失败，回退到 /api/tags 并转换格式
                return self._fallback_to_api_tags(host)
            except urllib_error.URLError as exc:
                print(f"[NetworkAPI] ollamaListModels URL error: {exc}")
                return self._fallback_to_api_tags(host)
            except Exception as exc:
                print(f"[NetworkAPI] ollamaListModels failed: {exc}")
                return self._fallback_to_api_tags(host)
        
        def _fallback_to_api_tags(self, host: str) -> str:
            """回退到 /api/tags 端点并转换为 OpenAI 兼容格式"""
            print(f"[NetworkAPI] Fallback to /api/tags endpoint")
            url = f"{host.rstrip('/')}/api/tags"
            
            try:
                req = urllib_request.Request(url, method="GET")
                req.add_header('Content-Type', 'application/json')
                req.add_header('User-Agent', 'Cherry Studio for Houdini')
                
                with urllib_request.urlopen(req, timeout=10.0) as resp:
                    raw = resp.read().decode("utf-8", errors="ignore")
                    print(f"[NetworkAPI] /api/tags success: {len(raw)} bytes")
                    
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
                        print(f"[NetworkAPI] Converted to OpenAI format: {converted[:200]}...")
                        return converted
                        
                    except json.JSONDecodeError as e:
                        print(f"[NetworkAPI] JSON decode error: {e}")
                        return '{"object": "list", "data": []}'
                        
            except Exception as exc:
                print(f"[NetworkAPI] /api/tags fallback failed: {exc}")
                return '{"object": "list", "data": []}'

        @Slot(str, result=str)
        def ollamaPullModel(self, options_json: str) -> str:
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
                __qt_fetch(url, method="POST", data=body, headers={"Content-Type": "application/json"})
                return json.dumps({"success": True})
            except Exception as exc:
                print(f"[NetworkAPI] ollamaPullModel failed: {exc}")
                return json.dumps({"success": False, "error": str(exc)})

        @Slot(str, result=str)
        def modelList(self, config_json: str) -> str:
            print(f"[NetworkAPI] modelList called with: {config_json!r}")
            try:
                config = json.loads(config_json) if config_json else {}
            except Exception as exc:
                print(f"[NetworkAPI] modelList config parse error: {exc}")
                config = {}
                
            if not isinstance(config, dict):
                return "[]"
                
            url = config.get("url")
            if not url:
                fallback = config.get("fallback")
                print(f"[NetworkAPI] modelList no URL, returning fallback: {fallback}")
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
                # 去重保持顺序
                seen = set()
                uniq = []
                for c in candidates:
                    if c not in seen:
                        uniq.append(c)
                        seen.add(c)
                return uniq

            candidates = _make_candidates(url)
            print(f"[NetworkAPI] modelList candidates: {candidates}")

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
                            print(f"[NetworkAPI] modelList header error {key}: {e}")
                    with urllib_request.urlopen(req, timeout=10.0) as resp:
                        raw = resp.read().decode('utf-8', errors='ignore')
                        print(f"[NetworkAPI] modelList success {resp.getcode()} -> {target_url}")
                        return {"ok": True, "body": raw}
                except urllib_error.HTTPError as exc:
                    # 401/403 直接返回，提示鉴权问题
                    if exc.code in (401, 403):
                        try:
                            body_txt = exc.read().decode('utf-8', errors='ignore')
                        except Exception:
                            body_txt = ''
                        print(f"[NetworkAPI] modelList auth error {exc.code} -> {target_url}")
                        return {"ok": True, "body": body_txt or json.dumps(config.get("fallback") or [])}
                    # 404 继续尝试下一个候选
                    if exc.code == 404:
                        print(f"[NetworkAPI] modelList 404 -> {target_url}")
                        return {"ok": False}
                    # 其它 HTTP 错误，作为失败但不终止候选流程
                    print(f"[NetworkAPI] modelList HTTP {exc.code} -> {target_url}")
                    return {"ok": False}
                except urllib_error.URLError as exc:
                    print(f"[NetworkAPI] modelList URL error {exc} -> {target_url}")
                    return {"ok": False}
                except Exception as exc:
                    print(f"[NetworkAPI] modelList exception {exc} -> {target_url}")
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
    
    # QtWebChannel bridge
    class HostBridge(QObject):
        dropped = Signal(str)
        log = Signal(str)
        @Slot(str, result=str)
        def echo(self, text: str) -> str:
            return f"host:{text}"

        @Slot(result=str)
        def houdiniSelection(self) -> str:
            try:
                import hou  # type: ignore
                sel = hou.selectedNodes()
                if not sel:
                    return ""
                return ",".join(n.path() for n in sel)
            except Exception:
                return ""

        @Slot(str, result=str)
        def parmValue(self, node_parm: str) -> str:
            """node_parm 形如 "/obj/geo1.tx" 或 "/obj/geo1/tx""" 
            try:
                import hou  # type: ignore
                path, sep, parm = node_parm.rpartition('.')
                if not sep:
                    path, sep, parm = node_parm.rpartition('/')
                if not parm:
                    return ""
                node = hou.node(path)
                if not node:
                    return ""
                p = node.parm(parm)
                if not p:
                    return ""
                return str(p.eval())
            except Exception:
                return ""

        @Slot(str, str, result=bool)
        def setParm(self, node_path: str, parm_name: str) -> bool:
            try:
                import hou  # type: ignore
                node = hou.node(node_path)
                if not node:
                    return False
                p = node.parm(parm_name)
                if not p:
                    return False
                # 这里仅示例设置为 1，可扩展第三个参数为值
                p.set(1)
                return True
            except Exception:
                return False

    channel = QWebChannel(web)
    host = HostBridge()
    electron_api = ElectronAPI()
    file_api = FileAPI()
    app_api = AppAPI()
    selection_api = SelectionAPI()
    store_sync_api = StoreSyncAPI()
    network_api = NetworkAPI()
    
    pass
    channel.registerObject("hostBridge", host)
    channel.registerObject("electron", electron_api)
    channel.registerObject("api", app_api)
    channel.registerObject("file", file_api)
    channel.registerObject("selection", selection_api)
    channel.registerObject("storeSync", store_sync_api)
    channel.registerObject("network", network_api)
    
    pass
    web.page().setWebChannel(channel)
    pass

    # WebChannel 就绪后再加载页面，确保 window.qt.webChannelTransport 可用
    if pending_url.startswith("http"):
        web.load(QUrl(pending_url))
    else:
        if not os.path.isabs(pending_url):
            pending_url = os.path.abspath(pending_url)
        web.load(QUrl.fromLocalFile(pending_url))

    # 防止 Python GC 回收导致 WebChannel 崩溃
    window._webview_ref = web  # type: ignore[attr-defined]
    window._webchannel_ref = channel  # type: ignore[attr-defined]
    window._hostbridge_ref = host  # type: ignore[attr-defined]
    window._network_ref = network_api  # type: ignore[attr-defined]

    # DnD 容器：拦截拖拽进入/释放，并通过 WebChannel 向前端发送
    class WebContainer(QWidget):
        def __init__(self, child: QWidget):
            super().__init__(parent)
            self.setAcceptDrops(True)
            layout = QVBoxLayout(self)
            layout.setContentsMargins(0, 0, 0, 0)
            layout.addWidget(child)

        def dragEnterEvent(self, event):  # type: ignore[override]
            # 无条件先接受，让 dropEvent 再判断
            event.acceptProposedAction()

        def dragMoveEvent(self, event):  # type: ignore[override]
            event.acceptProposedAction()

        def dropEvent(self, event):  # type: ignore[override]
            payload = None
            try:
                import json
                import hou  # type: ignore
                nodes = [n.path() for n in hou.selectedNodes()]
                if nodes:
                    payload = json.dumps({"type": "nodes", "paths": nodes})
            except Exception:
                pass
            if payload is None:
                md = event.mimeData()
                text = md.text() if md.hasText() else ""
                if not text and md.hasUrls():
                    try:
                        text = "\n".join(u.toString() for u in md.urls())
                    except Exception:
                        text = ""
                payload = text
            try:
                host.dropped.emit(payload)
                host.log.emit(f"drop: {payload[:200]}")
            finally:
                event.acceptProposedAction()

    container = WebContainer(web)
    window.setCentralWidget(container)

    window.resize(1400, 900)
    window.show()
    return window


def get_default_index_path() -> str:
    here = os.path.dirname(os.path.abspath(__file__))
    
    # 优先选择 cherry-studio-clone.html（克隆界面，更稳定）
    clone_path = os.path.join(here, "public", "cherry-studio-clone.html")
    if os.path.exists(clone_path):
        return clone_path

    # 其次选择原始 Cherry Studio 的入口
    index_path = os.path.join(here, "public", "index.html")
    if os.path.exists(index_path):
        return index_path

    # 继续降级到配置或简化页面
    for name in ("config.html", "simple-chat.html"):
        candidate = os.path.join(here, "public", name)
        if os.path.exists(candidate):
            return candidate

    # 项目级别回退
    project_public = os.path.join(os.path.dirname(here), "houdini_plugin", "public")
    for name in ("cherry-studio-clone.html", "index.html", "config.html", "simple-chat.html"):
        candidate = os.path.join(project_public, name)
        if os.path.exists(candidate):
            return candidate
    return index_path


_windows_keepalive = []  # 避免在 Houdini 脚本结束后被 GC


def main(url: str | None = None):
    ensure_qtwebengine_initialized()
    app = create_app()
    # CLI flags: --use-index / --use-clone
    try:
        argv = sys.argv[1:]
        # 如果传入的 url 实际上是一个标志（如 --use-index），则忽略它
        if url and isinstance(url, str) and url.startswith("--"):
            url = None
        if not url and "--use-index" in argv:
            here = os.path.dirname(os.path.abspath(__file__))
            candidate = os.path.join(here, "public", "index.html")
            if os.path.exists(candidate):
                url = candidate
        if not url and "--use-clone" in argv:
            here = os.path.dirname(os.path.abspath(__file__))
            candidate = os.path.join(here, "public", "cherry-studio-clone.html")
            if os.path.exists(candidate):
                url = candidate
    except Exception:
        pass

    if url is None:
        here = os.path.dirname(os.path.abspath(__file__))
        preferred = os.path.join(here, "public", "index.html")
        if os.path.exists(preferred):
            url = preferred
        else:
            url = get_default_index_path()
    win = create_window(url)
    _windows_keepalive.append(win)
    if is_running_inside_houdini():
        # 在 Houdini 内部不调用 app.exec()，避免阻塞或提前退出
        return 0
    return app.exec()


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else None
    raise SystemExit(main(target))


class SimpleFetch:
    def __init__(self):
        pass

    def request(self, url: str, method: str = "GET", data: str | None = None, headers: dict | None = None,
                timeout: float = 10.0) -> str:
        req = urllib_request.Request(url, data=data.encode("utf-8") if data else None, method=method)
        if headers:
            for key, value in headers.items():
                req.add_header(key, value)
        try:
            with urllib_request.urlopen(req, timeout=timeout) as resp:
                return resp.read().decode("utf-8", errors="ignore")
        except urllib_error.URLError as exc:
            raise RuntimeError(f"fetch request failed: {exc}")

    def request_json(self, url: str, method: str = "GET", data: str | None = None, headers: dict | None = None,
                     timeout: float = 10.0):
        raw = self.request(url, method=method, data=data, headers=headers, timeout=timeout)
        if not raw:
            return None
        return json.loads(raw)


def __qt_fetch(url: str, method: str = "GET", data: str | None = None, headers: dict | None = None,
               timeout: float = 10.0) -> str:
    if headers is None:
        headers = {}
    req = urllib_request.Request(url, data=data.encode("utf-8") if data else None, method=method)
    for key, value in headers.items():
        req.add_header(key, value)
    try:
        with urllib_request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode("utf-8", errors="ignore")
    except urllib_error.URLError as exc:
        raise RuntimeError(f"fetch request failed: {exc}")


def __qt_fetch_json(url: str, method: str = "GET", data: str | None = None, headers: dict | None = None,
                    timeout: float = 10.0):
    raw = __qt_fetch(url, method=method, data=data, headers=headers, timeout=timeout)
    if not raw:
        return None
    return json.loads(raw)



