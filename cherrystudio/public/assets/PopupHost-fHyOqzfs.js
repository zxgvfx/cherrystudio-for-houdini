import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { c as ThemeMode } from "./PreferenceService-ay5pWhVK.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { n as UiDataSlot, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { n as getCmThemeNames, t as getCmThemeByName } from "./utils-C6Jr7YN7.js";
import { t as CodeStyleContext } from "./useCodeStyle-zD0Sb1Ey.js";
import { n as useTheme } from "./useTheme-CkJQYl0u.js";
import { c as loadThemeIfNeeded, i as getMarkdownIt, n as DEFAULT_THEMES, o as getShiki, r as getHighlighter, s as loadLanguageIfNeeded, t as DEFAULT_LANGUAGES } from "./shiki-5X_PGXXr.js";
import { t as LRUCache } from "./esm-Chwibzcl.js";
import { t as CircleAlert } from "./circle-alert-Czy1VQQo.js";
import { t as CircleX } from "./circle-x-BOCKIMYB.js";
import { t as Info } from "./info-C47BhUEU.js";
import { t as TriangleAlert } from "./triangle-alert-LSsyKFOW.js";
import { r as popupService } from "./popup-BLG-Gue5.js";
var ShikiStreamTokenizer = class {
	options;
	linesUnstable = [];
	lastUnstableCodeChunk = "";
	lastStableGrammarState;
	constructor(options) {
		this.options = options;
	}
	async enqueue(chunk) {
		const subTrunks = splitToSubTrunks(this.lastUnstableCodeChunk + chunk);
		const stable = [];
		const unstable = [];
		const recall = this.linesUnstable.length;
		subTrunks.forEach((subTrunck, i) => {
			const isLastChunk = i === subTrunks.length - 1;
			const result = this.options.highlighter.codeToTokens(subTrunck, {
				...this.options,
				grammarState: this.lastStableGrammarState
			});
			if (!isLastChunk) {
				this.lastStableGrammarState = result.grammarState;
				result.tokens.forEach((tokenLine) => {
					stable.push(tokenLine);
				});
			} else {
				unstable.push(result.tokens[0]);
				this.lastUnstableCodeChunk = subTrunck;
			}
		});
		this.linesUnstable = unstable;
		return {
			recall,
			stable,
			unstable
		};
	}
	close() {
		const stable = this.linesUnstable;
		this.linesUnstable = [];
		this.lastUnstableCodeChunk = "";
		this.lastStableGrammarState = void 0;
		return { stable };
	}
	clear() {
		this.linesUnstable = [];
		this.lastUnstableCodeChunk = "";
		this.lastStableGrammarState = void 0;
	}
};
function splitToSubTrunks(chunk) {
	const lastNewlineIndex = chunk.lastIndexOf("\n");
	if (lastNewlineIndex === -1) return [chunk];
	return [chunk.substring(0, lastNewlineIndex), chunk.substring(lastNewlineIndex + 1)];
}
var logger = loggerService.withContext("ShikiStreamService");
var SERVICE_CONFIG = {
	TOKENIZER_CACHE: {
		MAX_SIZE: 100,
		TTL: 1e3 * 60 * 30
	},
	DEGRADATION_CACHE: {
		MAX_SIZE: 500,
		TTL: 1e3 * 60 * 60 * 12
	},
	WORKER: {
		MAX_INIT_RETRY: 2,
		REQUEST_TIMEOUT: {
			INIT: 5e3,
			HIGHLIGHT: 3e4,
			DEFAULT: 1e4
		}
	}
};
var ShikiStreamService = class {
	highlighter = null;
	tokenizerCache = new LRUCache({
		max: SERVICE_CONFIG.TOKENIZER_CACHE.MAX_SIZE,
		ttl: SERVICE_CONFIG.TOKENIZER_CACHE.TTL,
		updateAgeOnGet: true,
		dispose: (value) => {
			if (value) value.clear();
		}
	});
	codeCache = new LRUCache({
		max: SERVICE_CONFIG.TOKENIZER_CACHE.MAX_SIZE,
		ttl: SERVICE_CONFIG.TOKENIZER_CACHE.TTL,
		updateAgeOnGet: true
	});
	worker = null;
	workerInitPromise = null;
	workerInitRetryCount = 0;
	pendingRequests = /* @__PURE__ */ new Map();
	requestId = 0;
	workerDegradationCache = new LRUCache({
		max: SERVICE_CONFIG.DEGRADATION_CACHE.MAX_SIZE,
		ttl: SERVICE_CONFIG.DEGRADATION_CACHE.TTL
	});
	constructor() {}
	hasWorkerHighlighter() {
		return !!this.worker && !this.workerInitPromise;
	}
	hasMainHighlighter() {
		return !!this.highlighter;
	}
	async initWorker() {
		if (typeof Worker === "undefined") return;
		if (this.workerInitPromise) return this.workerInitPromise;
		if (this.worker) return;
		if (this.workerInitRetryCount >= SERVICE_CONFIG.WORKER.MAX_INIT_RETRY) {
			logger.debug("ShikiStream worker initialization failed too many times, stop trying");
			return;
		}
		this.workerInitPromise = (async () => {
			try {
				this.worker = new (await (__vitePreload(() => import("./shikiStream.worker-DjnJGj9x.js"), [], import.meta.url))).default();
				this.worker.onmessage = (event) => {
					const { id, type, result, error } = event.data;
					const pendingRequest = this.pendingRequests.get(id);
					if (!pendingRequest) return;
					this.pendingRequests.delete(id);
					if (type === "error") pendingRequest.reject(new Error(error));
					else if (type === "init-result") {
						pendingRequest.resolve({ success: true });
						this.workerInitRetryCount = 0;
					} else pendingRequest.resolve(result);
				};
				await this.sendWorkerMessage({
					type: "init",
					languages: DEFAULT_LANGUAGES,
					themes: DEFAULT_THEMES
				});
				this.workerInitRetryCount = 0;
			} catch (error) {
				this.worker?.terminate();
				this.worker = null;
				this.workerInitRetryCount++;
				throw error;
			} finally {
				this.workerInitPromise = null;
			}
		})();
		return this.workerInitPromise;
	}
	sendWorkerMessage(message) {
		if (!this.worker) return Promise.reject(/* @__PURE__ */ new Error("Worker not available"));
		const id = this.requestId++;
		let timerId;
		let settled = false;
		const promise = new Promise((resolve, reject) => {
			const safeResolve = (value) => {
				if (!settled) {
					settled = true;
					clearTimeout(timerId);
					this.pendingRequests.delete(id);
					resolve(value);
				}
			};
			const safeReject = (reason) => {
				if (!settled) {
					settled = true;
					clearTimeout(timerId);
					this.pendingRequests.delete(id);
					reject(reason);
				}
			};
			this.pendingRequests.set(id, {
				resolve: safeResolve,
				reject: safeReject
			});
			const getTimeoutForMessageType = (type) => {
				switch (type) {
					case "init": return SERVICE_CONFIG.WORKER.REQUEST_TIMEOUT.INIT;
					case "highlight": return SERVICE_CONFIG.WORKER.REQUEST_TIMEOUT.HIGHLIGHT;
					case "cleanup":
					case "dispose":
					default: return SERVICE_CONFIG.WORKER.REQUEST_TIMEOUT.DEFAULT;
				}
			};
			const timeout = getTimeoutForMessageType(message.type);
			timerId = setTimeout(() => {
				if (message.type === "highlight" && message.callerId) {
					this.workerDegradationCache.set(message.callerId, true);
					safeReject(/* @__PURE__ */ new Error(`Worker ${message.type} request timeout for callerId ${message.callerId}`));
				} else safeReject(/* @__PURE__ */ new Error(`Worker ${message.type} request timeout`));
			}, timeout);
		});
		try {
			this.worker.postMessage({
				id,
				...message
			});
		} catch (error) {
			const pendingRequest = this.pendingRequests.get(id);
			if (pendingRequest) pendingRequest.reject(error instanceof Error ? error : new Error(String(error)));
		}
		return promise;
	}
	async ensureHighlighterConfigured(language, theme) {
		if (!this.highlighter) this.highlighter = await getHighlighter();
		return {
			loadedLanguage: await loadLanguageIfNeeded(this.highlighter, language),
			loadedTheme: await loadThemeIfNeeded(this.highlighter, theme)
		};
	}
	async getShikiPreProperties(language, theme) {
		const { loadedLanguage, loadedTheme } = await this.ensureHighlighterConfigured(language, theme);
		if (!this.highlighter) throw new Error("Highlighter not initialized");
		return this.highlighter.codeToHast("1", {
			lang: loadedLanguage,
			theme: loadedTheme
		}).children[0].properties;
	}
	async highlightStreamingCode(code, language, theme, callerId) {
		const cacheKey = `${callerId}-${language}-${theme}`;
		const lastContent = this.codeCache.get(cacheKey) || "";
		let isAppend = false;
		if (code.length === lastContent.length) {
			if (code === lastContent) return {
				lines: [],
				recall: 0
			};
		} else if (code.length > lastContent.length) isAppend = code.startsWith(lastContent);
		try {
			let result;
			if (isAppend) {
				const chunk = code.slice(lastContent.length);
				result = await this.highlightCodeChunk(chunk, language, theme, callerId);
			} else {
				this.cleanupTokenizers(callerId);
				this.codeCache.delete(cacheKey);
				result = await this.highlightCodeChunk(code, language, theme, callerId);
				result = {
					...result,
					recall: -1
				};
			}
			this.codeCache.set(cacheKey, code);
			return result;
		} catch (error) {
			logger.error("Failed to highlight streaming code:", error);
			throw error;
		}
	}
	async highlightCodeChunk(chunk, language, theme, callerId) {
		if (this.workerDegradationCache.has(callerId)) return this.highlightWithMainThread(chunk, language, theme, callerId);
		if (!this.worker) try {
			await this.initWorker();
		} catch (error) {
			logger.warn("Failed to initialize worker, falling back to main thread:", error);
		}
		if (this.hasWorkerHighlighter()) try {
			return await this.sendWorkerMessage({
				type: "highlight",
				callerId,
				chunk,
				language,
				theme
			});
		} catch (error) {
			this.workerDegradationCache.set(callerId, true);
			logger.error(`Worker highlight failed for callerId ${callerId}, permanently falling back to main thread:`, error);
		}
		return this.highlightWithMainThread(chunk, language, theme, callerId);
	}
	async highlightWithMainThread(chunk, language, theme, callerId) {
		try {
			const result = await (await this.getStreamTokenizer(callerId, language, theme)).enqueue(chunk);
			return {
				lines: [...result.stable, ...result.unstable],
				recall: result.recall
			};
		} catch (error) {
			logger.error("Failed to highlight code chunk:", error);
			return {
				lines: [[{
					content: chunk || "",
					color: "#000000",
					offset: 0
				}]],
				recall: 0
			};
		}
	}
	async getStreamTokenizer(callerId, language, theme) {
		const cacheKey = `${callerId}-${language}-${theme}`;
		if (this.tokenizerCache.has(cacheKey)) return this.tokenizerCache.get(cacheKey);
		const { loadedLanguage, loadedTheme } = await this.ensureHighlighterConfigured(language, theme);
		if (!this.highlighter) throw new Error("Highlighter not initialized");
		const tokenizer = new ShikiStreamTokenizer({
			highlighter: this.highlighter,
			lang: loadedLanguage,
			theme: loadedTheme
		});
		this.tokenizerCache.set(cacheKey, tokenizer);
		return tokenizer;
	}
	cleanupTokenizers(callerId) {
		if (this.hasWorkerHighlighter()) this.sendWorkerMessage({
			type: "cleanup",
			callerId
		}).catch((error) => {
			logger.error("Failed to cleanup worker tokenizer:", error);
		});
		for (const key of this.codeCache.keys()) if (key.startsWith(`${callerId}-`)) this.codeCache.delete(key);
		for (const key of this.tokenizerCache.keys()) if (key.startsWith(`${callerId}-`)) this.tokenizerCache.delete(key);
	}
	dispose() {
		if (this.worker) {
			this.sendWorkerMessage({ type: "dispose" }).catch((error) => {
				logger.warn("Failed to dispose worker:", error);
			});
			this.worker.terminate();
			this.worker = null;
			this.pendingRequests.clear();
			this.requestId = 0;
		}
		this.workerDegradationCache.clear();
		this.tokenizerCache.clear();
		this.codeCache.clear();
		this.highlighter = null;
		this.workerInitPromise = null;
		this.workerInitRetryCount = 0;
	}
};
const shikiStreamService = new ShikiStreamService();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const CodeStyleProvider = ({ children }) => {
	const [codeEditorEnabled] = usePreference("chat.code.editor.enabled");
	const [codeEditorThemeLight] = usePreference("chat.code.editor.theme_light");
	const [codeEditorThemeDark] = usePreference("chat.code.editor.theme_dark");
	const [codeViewerThemeLight] = usePreference("chat.code.viewer.theme_light");
	const [codeViewerThemeDark] = usePreference("chat.code.viewer.theme_dark");
	const { theme } = useTheme();
	const [shikiThemesInfo, setShikiThemesInfo] = (0, import_react.useState)([]);
	const [cmThemeNames, setCmThemeNames] = (0, import_react.useState)([]);
	const loadShikiThemesInfo = (0, import_react.useCallback)(async () => {
		const { bundledThemesInfo } = await getShiki();
		setShikiThemesInfo(bundledThemesInfo);
		return bundledThemesInfo;
	}, []);
	const loadThemeNames = (0, import_react.useCallback)(async () => {
		if (codeEditorEnabled) {
			const names = await getCmThemeNames();
			setCmThemeNames(names);
			return names;
		}
		return ["auto", ...(await loadShikiThemesInfo()).map((info) => info.id)];
	}, [codeEditorEnabled, loadShikiThemesInfo]);
	const themeNames = (0, import_react.useMemo)(() => {
		if (codeEditorEnabled) return cmThemeNames;
		return ["auto", ...shikiThemesInfo.map((info) => info.id)];
	}, [
		codeEditorEnabled,
		cmThemeNames,
		shikiThemesInfo
	]);
	const storedShikiTheme = theme === ThemeMode.light ? codeViewerThemeLight : codeViewerThemeDark;
	(0, import_react.useEffect)(() => {
		if (storedShikiTheme && storedShikiTheme !== "auto") loadShikiThemesInfo();
	}, [storedShikiTheme, loadShikiThemesInfo]);
	const activeShikiTheme = (0, import_react.useMemo)(() => {
		const fallback = theme === ThemeMode.light ? "one-light" : "material-theme-darker";
		if (!storedShikiTheme || storedShikiTheme === "auto") return fallback;
		return shikiThemesInfo.some((info) => info.id === storedShikiTheme) ? storedShikiTheme : fallback;
	}, [
		theme,
		storedShikiTheme,
		shikiThemesInfo
	]);
	const isShikiThemeDark = (0, import_react.useMemo)(() => {
		const themeInfo = shikiThemesInfo.find((info) => info.id === activeShikiTheme);
		return themeInfo ? themeInfo.type === "dark" : theme !== ThemeMode.light;
	}, [
		activeShikiTheme,
		shikiThemesInfo,
		theme
	]);
	const [activeCmTheme, setActiveCmTheme] = (0, import_react.useState)(() => theme === ThemeMode.light ? "light" : "dark");
	(0, import_react.useEffect)(() => {
		let themeName = theme === ThemeMode.light ? codeEditorThemeLight : codeEditorThemeDark;
		if (!themeName || themeName === "auto") themeName = theme === ThemeMode.light ? "materialLight" : "dark";
		let cancelled = false;
		getCmThemeByName(themeName).then((cmTheme) => {
			if (!cancelled) setActiveCmTheme(cmTheme);
		});
		return () => {
			cancelled = true;
		};
	}, [
		theme,
		codeEditorThemeLight,
		codeEditorThemeDark
	]);
	const languageAliases = (0, import_react.useMemo)(() => {
		return {
			bash: "shell",
			"objective-c++": "objective-cpp",
			svg: "xml",
			vab: "vb",
			graphviz: "dot"
		};
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			shikiStreamService.dispose();
		};
	}, []);
	const highlightCodeChunk = (0, import_react.useCallback)(async (trunk, language, callerId) => {
		await loadShikiThemesInfo();
		const normalizedLang = languageAliases[language] || language.toLowerCase();
		return shikiStreamService.highlightCodeChunk(trunk, normalizedLang, activeShikiTheme, callerId);
	}, [
		activeShikiTheme,
		languageAliases,
		loadShikiThemesInfo
	]);
	const cleanupTokenizers = (0, import_react.useCallback)((callerId) => {
		shikiStreamService.cleanupTokenizers(callerId);
	}, []);
	const highlightStreamingCode = (0, import_react.useCallback)(async (fullContent, language, callerId) => {
		await loadShikiThemesInfo();
		const normalizedLang = languageAliases[language] || language.toLowerCase();
		return shikiStreamService.highlightStreamingCode(fullContent, normalizedLang, activeShikiTheme, callerId);
	}, [
		activeShikiTheme,
		languageAliases,
		loadShikiThemesInfo
	]);
	const getShikiPreProperties = (0, import_react.useCallback)(async (language) => {
		await loadShikiThemesInfo();
		const normalizedLang = languageAliases[language] || language.toLowerCase();
		return shikiStreamService.getShikiPreProperties(normalizedLang, activeShikiTheme);
	}, [
		activeShikiTheme,
		languageAliases,
		loadShikiThemesInfo
	]);
	const highlightCode = (0, import_react.useCallback)(async (code, language) => {
		await loadShikiThemesInfo();
		const highlighter = await getHighlighter();
		await loadLanguageIfNeeded(highlighter, language);
		const loadedTheme = await loadThemeIfNeeded(highlighter, activeShikiTheme);
		return highlighter.codeToHtml(code, {
			lang: language,
			theme: loadedTheme
		});
	}, [activeShikiTheme, loadShikiThemesInfo]);
	const shikiMarkdownIt = (0, import_react.useCallback)(async (code) => {
		await loadShikiThemesInfo();
		const renderer = await getMarkdownIt(activeShikiTheme, code);
		if (!renderer) return code;
		return renderer.render(code);
	}, [activeShikiTheme, loadShikiThemesInfo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeStyleContext, {
		value: (0, import_react.useMemo)(() => ({
			highlightCodeChunk,
			highlightStreamingCode,
			cleanupTokenizers,
			getShikiPreProperties,
			highlightCode,
			shikiMarkdownIt,
			loadThemeNames,
			themeNames,
			activeShikiTheme,
			isShikiThemeDark,
			activeCmTheme
		}), [
			highlightCodeChunk,
			highlightStreamingCode,
			cleanupTokenizers,
			getShikiPreProperties,
			highlightCode,
			shikiMarkdownIt,
			loadThemeNames,
			themeNames,
			activeShikiTheme,
			isShikiThemeDark,
			activeCmTheme
		]),
		children
	});
};
function getIcon(type, icon) {
	if (icon === null) return null;
	if (icon !== void 0) return icon;
	const className = "mt-0.5 size-5 shrink-0";
	switch (type) {
		case "error": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: cn(className, "text-destructive") });
		case "warning": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: cn(className, "text-warning") });
		case "info": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: cn(className, "text-info") });
		case "confirm": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: cn(className, "text-warning") });
	}
}
function getContentStyle(props) {
	const style = { ...props.style };
	if (props.width !== void 0) {
		style.width = props.width;
		style.maxWidth = "calc(100vw - 2rem)";
	}
	return Object.keys(style).length > 0 ? style : void 0;
}
function shouldShowOkButton(props) {
	return props.okButtonProps?.style?.display !== "none";
}
function shouldShowCancelButton(type, props) {
	if (props.okCancel === false) return false;
	if (type !== "confirm") return false;
	return props.cancelButtonProps?.style?.display !== "none";
}
function getOkText(type, props) {
	if (props.okText !== void 0) return props.okText;
	if (type === "confirm" && props.okButtonProps?.danger) return resolver_default.t("common.delete");
	return resolver_default.t("common.confirm");
}
function getCancelText(props) {
	return props.cancelText ?? resolver_default.t("common.cancel");
}
function ConfirmPopupItem({ entry }) {
	const { props, confirmType: type, instanceId, open } = entry;
	const icon = getIcon(type, props.icon);
	const showOkButton = shouldShowOkButton(props);
	const showCancelButton = shouldShowCancelButton(type, props);
	const handleCancel = (0, import_react.useCallback)(() => {
		popupService.settle(instanceId, false);
	}, [instanceId]);
	const handleConfirm = (0, import_react.useCallback)(() => {
		popupService.settle(instanceId, true);
	}, [instanceId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (0, import_react.useCallback)((next) => {
			if (!next) handleCancel();
		}, [handleCancel]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-confirm-popup": "true",
			motion: "fade-scale",
			showCloseButton: props.closable === true,
			closeOnOverlayClick: props.maskClosable !== false,
			overlayClassName: "z-[90]",
			className: cn("confirm-popup z-[90] gap-5 sm:max-w-lg", props.rootClassName, props.className),
			style: getContentStyle(props),
			onCloseAutoFocus: props.focusOnClose ? (event) => {
				event.preventDefault();
				props.focusOnClose?.();
			} : void 0,
			onInteractOutside: (event) => {
				if (props.maskClosable === false) event.preventDefault();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [props.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-base leading-6",
							children: props.title
						}) : null, props.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("wrap-anywhere mt-2 min-w-0 max-w-full text-muted-foreground text-sm leading-5", props.title ? "" : "mt-0"),
								children: props.content
							}) })
						}) : null]
					})]
				})
			}), (showOkButton || showCancelButton) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [showCancelButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: handleCancel,
				disabled: props.cancelButtonProps?.disabled,
				className: props.cancelButtonProps?.className,
				style: props.cancelButtonProps?.style,
				children: getCancelText(props)
			}), showOkButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: props.okButtonProps?.danger ? "destructive" : "default",
				onClick: handleConfirm,
				disabled: props.okButtonProps?.disabled,
				className: props.okButtonProps?.className,
				style: props.okButtonProps?.style,
				children: getOkText(type, props)
			})] })]
		})
	});
}
function PopupHost() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: (0, import_react.useSyncExternalStore)(popupService.subscribe, popupService.getSnapshot, popupService.getSnapshot).map((entry) => {
		if (entry.kind === "confirm") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmPopupItem, { entry }, entry.instanceId);
		const { Component, props, instanceId, open } = entry;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
			...props,
			open,
			resolve: (result) => popupService.settle(instanceId, result)
		}, instanceId);
	}) });
}
export { CodeStyleProvider as n, PopupHost as t };
