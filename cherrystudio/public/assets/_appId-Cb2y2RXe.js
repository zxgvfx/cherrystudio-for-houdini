import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import { a as useSharedCacheValue, o as cacheService } from "./useCache-SsOQx-L2.js";
import { t as isDev } from "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-78czMD_R.js";
import { r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as Input } from "./input-dvr72LyA.js";
import "./with-selector-BMhODuKS.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BDTAufGC.js";
import { c as useIsActiveTab, d as useOptionalTabsContext, o as useCurrentTab, s as useCurrentTabId } from "./tab-CbOwJVjs.js";
import "./useWindowInitData-C8-CHwDP.js";
import "./mainWindowNavigation-m8-JFOdz.js";
import "./routeTitle-DwBoGlJ5.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import { a as isDataApiError, i as ErrorCode, n as DataApiError, s as toDataApiError } from "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./useReorder-CHjMnht2.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { a as setWebviewLoaded, i as onWebviewStateChange, r as getWebviewLoaded, t as useMiniApps } from "./useMiniApps-BL2SCXxq.js";
import { t as ArrowLeft } from "./arrow-left-BVyI-xLf.js";
import { t as ArrowRight } from "./arrow-right-10DRsfJt.js";
import { t as ChevronDown } from "./chevron-down-BVtofl6V.js";
import { t as ChevronUp } from "./chevron-up-C-an45UL.js";
import { t as Code } from "./code-DRRuSDEM.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { t as LayoutGrid } from "./layout-grid-C_hSLL1S.js";
import { t as Link } from "./link-BO4yT8hH.js";
import { t as RotateCw } from "./rotate-cw-CApoTFn2.js";
import { t as X } from "./x-DelRxIMm.js";
import "./miniAppsLogo-DhM5E0jZ.js";
import "./with-selector-DxfGCgh1.js";
import { t as useParams } from "./useParams-pfqbNhL2.js";
import { t as require_BeatLoader } from "./BeatLoader-BBwCpno2.js";
import { n as useMiniAppPopup, t as toTransientMiniApp } from "./useMiniAppPopup-V4ijG85a.js";
import "./LogoAvatar-95Rc8hiz.js";
import { t as MiniAppLogoAvatar_default } from "./MiniAppLogoAvatar-Dp6lYuBo.js";
var import_BeatLoader = /* @__PURE__ */ __toESM(require_BeatLoader());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger$2 = loggerService.withContext("MinimalToolbar");
var WEBVIEW_CHECK_INITIAL_MS = 100;
var WEBVIEW_CHECK_MAX_MS = 1e3;
var WEBVIEW_CHECK_MULTIPLIER = 2;
var WEBVIEW_CHECK_MAX_ATTEMPTS = 30;
var NAVIGATION_UPDATE_DELAY_MS = 50;
var NAVIGATION_COMPLETE_DELAY_MS = 100;
var MinimalToolbar = ({ app, webviewRef, currentUrl, onReload, onOpenDevTools }) => {
	const { t } = useTranslation();
	const { pinned, updateAppStatus, allApps } = useMiniApps();
	const [openLinkExternal, setOpenLinkExternal] = usePreference("feature.mini_app.open_link_external");
	const [canGoBack, setCanGoBack] = (0, import_react.useState)(false);
	const [canGoForward, setCanGoForward] = (0, import_react.useState)(false);
	const canPinned = allApps.some((item) => item.appId === app.appId);
	const isPinned = pinned.some((item) => item.appId === app.appId);
	const canOpenExternalLink = app.url.startsWith("http://") || app.url.startsWith("https://");
	const navigationUpdateTimeoutRef = (0, import_react.useRef)(null);
	const updateNavigationState = (0, import_react.useCallback)(() => {
		if (webviewRef.current) try {
			setCanGoBack(webviewRef.current.canGoBack());
			setCanGoForward(webviewRef.current.canGoForward());
		} catch (error) {
			logger$2.debug("WebView not ready for navigation state update", { appId: app.appId });
			setCanGoBack(false);
			setCanGoForward(false);
		}
		else {
			setCanGoBack(false);
			setCanGoForward(false);
		}
	}, [app.appId, webviewRef]);
	const scheduleNavigationUpdate = (0, import_react.useCallback)((delay) => {
		if (navigationUpdateTimeoutRef.current) clearTimeout(navigationUpdateTimeoutRef.current);
		navigationUpdateTimeoutRef.current = setTimeout(() => {
			updateNavigationState();
			navigationUpdateTimeoutRef.current = null;
		}, delay);
	}, [updateNavigationState]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (navigationUpdateTimeoutRef.current) clearTimeout(navigationUpdateTimeoutRef.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let checkTimeout = null;
		let navigationListener = null;
		let listenersAttached = false;
		let currentInterval = WEBVIEW_CHECK_INITIAL_MS;
		let attemptCount = 0;
		const attachListeners = () => {
			if (webviewRef.current && !listenersAttached) {
				updateNavigationState();
				const handleNavigation = () => {
					scheduleNavigationUpdate(NAVIGATION_UPDATE_DELAY_MS);
				};
				webviewRef.current.addEventListener("did-navigate", handleNavigation);
				webviewRef.current.addEventListener("did-navigate-in-page", handleNavigation);
				listenersAttached = true;
				navigationListener = () => {
					if (webviewRef.current) {
						webviewRef.current.removeEventListener("did-navigate", handleNavigation);
						webviewRef.current.removeEventListener("did-navigate-in-page", handleNavigation);
					}
					listenersAttached = false;
				};
				if (checkTimeout) {
					clearTimeout(checkTimeout);
					checkTimeout = null;
				}
				logger$2.debug("Navigation listeners attached", {
					appId: app.appId,
					attempts: attemptCount
				});
				return true;
			}
			return false;
		};
		const scheduleCheck = () => {
			checkTimeout = setTimeout(() => {
				requestAnimationFrame(() => {
					attemptCount++;
					if (!attachListeners()) {
						if (attemptCount >= WEBVIEW_CHECK_MAX_ATTEMPTS) {
							logger$2.warn("WebView attachment timeout", {
								appId: app.appId,
								attempts: attemptCount,
								totalTimeMs: currentInterval * attemptCount
							});
							return;
						}
						currentInterval = Math.min(currentInterval * WEBVIEW_CHECK_MULTIPLIER, WEBVIEW_CHECK_MAX_MS);
						if (attemptCount <= 3 || attemptCount % 10 === 0) logger$2.debug("WebView not ready, scheduling next check", {
							appId: app.appId,
							nextCheckMs: currentInterval,
							attempt: attemptCount
						});
						scheduleCheck();
					}
				});
			}, currentInterval);
		};
		if (!webviewRef.current) scheduleCheck();
		else attachListeners();
		return () => {
			if (checkTimeout) clearTimeout(checkTimeout);
			if (navigationListener) navigationListener();
		};
	}, [
		app.appId,
		updateNavigationState,
		scheduleNavigationUpdate
	]);
	const handleGoBack = (0, import_react.useCallback)(() => {
		if (webviewRef.current) try {
			if (webviewRef.current.canGoBack()) {
				webviewRef.current.goBack();
				scheduleNavigationUpdate(NAVIGATION_COMPLETE_DELAY_MS);
			}
		} catch (error) {
			logger$2.debug("WebView not ready for navigation", {
				appId: app.appId,
				action: "goBack"
			});
		}
	}, [
		app.appId,
		webviewRef,
		scheduleNavigationUpdate
	]);
	const handleGoForward = (0, import_react.useCallback)(() => {
		if (webviewRef.current) try {
			if (webviewRef.current.canGoForward()) {
				webviewRef.current.goForward();
				scheduleNavigationUpdate(NAVIGATION_COMPLETE_DELAY_MS);
			}
		} catch (error) {
			logger$2.debug("WebView not ready for navigation", {
				appId: app.appId,
				action: "goForward"
			});
		}
	}, [
		app.appId,
		webviewRef,
		scheduleNavigationUpdate
	]);
	const handleTogglePin = (0, import_react.useCallback)(() => {
		const fallbackKey = isPinned ? "miniApp.unpin_failed" : "miniApp.pin_failed";
		updateAppStatus(app.appId, isPinned ? "enabled" : "pinned").catch((err) => {
			const e = toDataApiError(err);
			if (isDataApiError(e)) {
				logger$2.error("togglePin failed", {
					code: e.code,
					message: e.message
				});
				toast.error(e.message || t(fallbackKey));
			} else {
				logger$2.error("togglePin failed", err);
				toast.error(t(fallbackKey));
			}
		});
	}, [
		app.appId,
		isPinned,
		updateAppStatus,
		t
	]);
	const handleToggleOpenExternal = (0, import_react.useCallback)(() => {
		setOpenLinkExternal(!openLinkExternal);
	}, [setOpenLinkExternal, openLinkExternal]);
	const handleOpenLink = (0, import_react.useCallback)(() => {
		const urlToOpen = currentUrl || app.url;
		ipcApi.request("system.shell.open_website", urlToOpen);
	}, [currentUrl, app.url]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "mini-apps.minimal-toolbar",
		className: "flex h-8.75 shrink-0 items-center justify-between bg-background px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-0.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("miniApp.popup.goBack"),
						placement: "bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							onClick: handleGoBack,
							className: toolbarButtonClassName({ disabled: !canGoBack }),
							"aria-label": t("miniApp.popup.goBack"),
							"aria-disabled": !canGoBack,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("miniApp.popup.goForward"),
						placement: "bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							onClick: handleGoForward,
							className: toolbarButtonClassName({ disabled: !canGoForward }),
							"aria-label": t("miniApp.popup.goForward"),
							"aria-disabled": !canGoForward,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("miniApp.popup.refresh"),
						placement: "bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							onClick: onReload,
							className: toolbarButtonClassName(),
							"aria-label": t("miniApp.popup.refresh"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { size: 14 })
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-0.5",
				children: [
					canOpenExternalLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("miniApp.popup.openExternal"),
						placement: "bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							onClick: handleOpenLink,
							className: toolbarButtonClassName(),
							"aria-label": t("miniApp.popup.openExternal"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })
						})
					}),
					canPinned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: isPinned ? t("miniApp.remove_from_launchpad") : t("miniApp.add_to_launchpad"),
						placement: "bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							onClick: handleTogglePin,
							className: toolbarButtonClassName({ active: isPinned }),
							"aria-label": isPinned ? t("miniApp.remove_from_launchpad") : t("miniApp.add_to_launchpad"),
							"aria-pressed": isPinned,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { size: 14 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: openLinkExternal ? t("miniApp.popup.open_link_external_on") : t("miniApp.popup.open_link_external_off"),
						placement: "bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							onClick: handleToggleOpenExternal,
							className: toolbarButtonClassName({ active: openLinkExternal }),
							"aria-label": openLinkExternal ? t("miniApp.popup.open_link_external_on") : t("miniApp.popup.open_link_external_off"),
							"aria-pressed": openLinkExternal,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { size: 14 })
						})
					}),
					isDev && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: t("miniApp.popup.devtools"),
						placement: "bottom",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							onClick: onOpenDevTools,
							className: toolbarButtonClassName(),
							"aria-label": t("miniApp.popup.devtools"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { size: 14 })
						})
					})
				]
			})
		})]
	});
};
var toolbarButtonClassName = ({ disabled = false, active = false } = {}) => cn("rounded shadow-none active:scale-95", disabled ? "cursor-default text-foreground-disabled hover:bg-transparent hover:text-foreground-disabled active:scale-100" : active ? "text-primary hover:text-primary" : "text-muted-foreground hover:text-foreground");
var MinimalToolbar_default = MinimalToolbar;
var logger$1 = loggerService.withContext("WebviewSearch");
var WebviewSearch = ({ webviewRef, isWebviewReady, appId }) => {
	const { t } = useTranslation();
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [matchCount, setMatchCount] = (0, import_react.useState)(0);
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const inputRef = (0, import_react.useRef)(null);
	const focusFrameRef = (0, import_react.useRef)(null);
	const lastAppIdRef = (0, import_react.useRef)(appId);
	const attachedWebviewRef = (0, import_react.useRef)(null);
	const activeWebview = webviewRef.current ?? null;
	const focusInput = (0, import_react.useCallback)(() => {
		if (focusFrameRef.current !== null) {
			window.cancelAnimationFrame(focusFrameRef.current);
			focusFrameRef.current = null;
		}
		focusFrameRef.current = window.requestAnimationFrame(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
	}, []);
	const resetSearchState = (0, import_react.useCallback)((options) => {
		if (!options?.keepQuery) setQuery("");
		setMatchCount(0);
		setActiveIndex(0);
	}, []);
	const ensureWebviewReady = (0, import_react.useCallback)((candidate) => {
		if (!candidate) return null;
		try {
			if (!candidate.getWebContentsId?.()) {
				logger$1.debug("WebviewSearch: missing webContentsId before action", { appId });
				return null;
			}
		} catch (error) {
			logger$1.debug("WebviewSearch: getWebContentsId failed before action", {
				appId,
				error
			});
			return null;
		}
		return candidate;
	}, [appId]);
	const stopFindOnWebview = (0, import_react.useCallback)((webview) => {
		const usable = ensureWebviewReady(webview);
		if (!usable) return false;
		try {
			usable.stopFindInPage("clearSelection");
			return true;
		} catch (error) {
			logger$1.debug("stopFindInPage failed", {
				appId,
				error
			});
			return false;
		}
	}, [appId, ensureWebviewReady]);
	const getUsableWebview = (0, import_react.useCallback)(() => {
		const candidates = [webviewRef.current, attachedWebviewRef.current];
		for (const candidate of candidates) {
			const usable = ensureWebviewReady(candidate);
			if (usable) return usable;
		}
		return null;
	}, [ensureWebviewReady, webviewRef]);
	const stopSearch = (0, import_react.useCallback)(() => {
		const target = getUsableWebview();
		if (!target) return;
		stopFindOnWebview(target);
	}, [getUsableWebview, stopFindOnWebview]);
	const closeSearch = (0, import_react.useCallback)(() => {
		setIsVisible(false);
		stopSearch();
		resetSearchState({ keepQuery: true });
	}, [resetSearchState, stopSearch]);
	const performSearch = (0, import_react.useCallback)((text, options) => {
		const target = getUsableWebview();
		if (!target) {
			logger$1.debug("Skip performSearch: webview not attached");
			return;
		}
		if (!text) {
			stopSearch();
			resetSearchState({ keepQuery: true });
			return;
		}
		try {
			target.findInPage(text, options);
		} catch (error) {
			logger$1.error("findInPage failed", { error });
			toast.error(t("common.error"));
		}
	}, [
		getUsableWebview,
		resetSearchState,
		stopSearch,
		t
	]);
	const handleFoundInPage = (0, import_react.useCallback)((event) => {
		if (!event.result) return;
		const { activeMatchOrdinal, matches } = event.result;
		if (matches !== void 0) setMatchCount(matches);
		if (activeMatchOrdinal !== void 0) setActiveIndex(activeMatchOrdinal);
	}, []);
	const openSearch = (0, import_react.useCallback)(() => {
		if (!isWebviewReady) {
			logger$1.debug("Skip openSearch: webview not ready");
			return;
		}
		setIsVisible(true);
		focusInput();
	}, [focusInput, isWebviewReady]);
	const goToNext = (0, import_react.useCallback)(() => {
		if (!query) return;
		performSearch(query, {
			forward: true,
			findNext: true
		});
	}, [performSearch, query]);
	const goToPrevious = (0, import_react.useCallback)(() => {
		if (!query) return;
		performSearch(query, {
			forward: false,
			findNext: true
		});
	}, [performSearch, query]);
	(0, import_react.useEffect)(() => {
		attachedWebviewRef.current = activeWebview;
		if (!activeWebview) return;
		const handle = handleFoundInPage;
		activeWebview.addEventListener("found-in-page", handle);
		return () => {
			activeWebview.removeEventListener("found-in-page", handle);
			if (attachedWebviewRef.current === activeWebview) {
				stopFindOnWebview(activeWebview);
				attachedWebviewRef.current = null;
			}
		};
	}, [
		activeWebview,
		handleFoundInPage,
		stopFindOnWebview
	]);
	useIpcOn("webview.search_hotkey_pressed", ({ webviewId, key, control, meta, shift }) => {
		let webContentsId;
		try {
			webContentsId = activeWebview?.getWebContentsId?.();
		} catch (error) {
			logger$1.debug("WebviewSearch: getWebContentsId failed", {
				appId,
				error
			});
			return;
		}
		if (!webContentsId || webviewId !== webContentsId) return;
		if ((control || meta) && key === "f") {
			openSearch();
			return;
		}
		if (!isVisible) return;
		if (key === "escape") {
			closeSearch();
			return;
		}
		if (key === "enter") if (shift) goToPrevious();
		else goToNext();
	});
	(0, import_react.useEffect)(() => {
		if (!isVisible) return;
		focusInput();
	}, [focusInput, isVisible]);
	(0, import_react.useEffect)(() => {
		if (!isVisible) return;
		if (!query) {
			performSearch("");
			return;
		}
		performSearch(query);
	}, [
		activeWebview,
		isVisible,
		performSearch,
		query
	]);
	(0, import_react.useEffect)(() => {
		const handleKeydown = (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
				event.preventDefault();
				openSearch();
				return;
			}
			if (!isVisible) return;
			if (event.key === "Escape") {
				event.preventDefault();
				closeSearch();
				return;
			}
			if (event.key === "Enter") {
				event.preventDefault();
				if (event.shiftKey) goToPrevious();
				else goToNext();
			}
		};
		window.addEventListener("keydown", handleKeydown, true);
		return () => {
			window.removeEventListener("keydown", handleKeydown, true);
		};
	}, [
		closeSearch,
		goToNext,
		goToPrevious,
		isVisible,
		openSearch
	]);
	(0, import_react.useEffect)(() => {
		if (!isWebviewReady) {
			setIsVisible(false);
			resetSearchState();
			stopSearch();
			return;
		}
	}, [
		isWebviewReady,
		resetSearchState,
		stopSearch
	]);
	(0, import_react.useEffect)(() => {
		if (!appId) return;
		if (lastAppIdRef.current === appId) return;
		lastAppIdRef.current = appId;
		setIsVisible(false);
		resetSearchState();
		stopSearch();
	}, [
		appId,
		resetSearchState,
		stopSearch
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			stopSearch();
			if (focusFrameRef.current !== null) {
				window.cancelAnimationFrame(focusFrameRef.current);
				focusFrameRef.current = null;
			}
		};
	}, [stopSearch]);
	if (!isVisible) return null;
	const matchLabel = `${matchCount > 0 ? Math.max(activeIndex, 1) : 0}/${matchCount}`;
	const noResultTitle = matchCount === 0 && query ? t("common.no_results") : void 0;
	const disableNavigation = !query || matchCount === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "mini-apps.webview-search",
		className: "pointer-events-auto absolute top-3 right-3 z-50 flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1 shadow-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				ref: inputRef,
				autoFocus: true,
				value: query,
				onChange: (e) => setQuery(e.target.value),
				spellCheck: false,
				placeholder: t("common.search"),
				className: "h-8 w-60 border-0 bg-transparent px-2 py-0 shadow-none focus-visible:border-transparent focus-visible:ring-0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "mini-apps.webview-search.status",
				className: "min-w-11 text-center text-muted-foreground text-sm tabular-nums",
				title: noResultTitle,
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "true",
				children: matchLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				onClick: goToPrevious,
				disabled: disableNavigation,
				"aria-label": t("common.previous_match"),
				className: "text-muted-foreground shadow-none hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 16 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				onClick: goToNext,
				disabled: disableNavigation,
				"aria-label": t("common.next_match"),
				className: "text-muted-foreground shadow-none hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 16 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				onClick: closeSearch,
				"aria-label": t("common.close"),
				className: "text-muted-foreground shadow-none hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
			})
		]
	});
};
var WebviewSearch_default = WebviewSearch;
var logger = loggerService.withContext("MiniAppPage");
var MINI_APP_LOADING_COLOR = "var(--muted-foreground)";
function isMiniAppTabUrl(url, appId) {
	return url === `/app/mini-app/${appId}`;
}
var MiniAppPage = () => {
	const { t } = useTranslation();
	const { appId } = useParams({ strict: false });
	const currentTabId = useCurrentTabId();
	const currentTab = useCurrentTab();
	const isActiveTab = useIsActiveTab();
	const updateTab = useOptionalTabsContext()?.updateTab;
	const { openMiniAppKeepAlive } = useMiniAppPopup();
	const { allApps, openedKeepAliveMiniApps, isLoading, error } = useMiniApps();
	const transientDescriptor = useSharedCacheValue(`mini_app.transient_descriptor.${appId ?? ""}`);
	const app = (0, import_react.useMemo)(() => {
		if (!appId) return null;
		const found = allApps.find((a) => a.appId === appId);
		if (found) return found;
		const cached = openedKeepAliveMiniApps.find((a) => a.appId === appId);
		if (cached) return cached;
		return transientDescriptor ? toTransientMiniApp(transientDescriptor) : null;
	}, [
		appId,
		allApps,
		openedKeepAliveMiniApps,
		transientDescriptor
	]);
	const displayName = (0, import_react.useMemo)(() => {
		if (!app) return null;
		return app.nameKey ? t(app.nameKey) : app.name;
	}, [app, t]);
	(0, import_react.useEffect)(() => {
		if (!app || !displayName || !currentTabId || !currentTab || !updateTab) return;
		if (!isMiniAppTabUrl(currentTab.url, app.appId)) return;
		const tabIcon = app.logoSrc ?? app.logo;
		if (currentTab.title === displayName && currentTab.icon === tabIcon) return;
		updateTab(currentTabId, {
			title: displayName,
			icon: tabIcon
		});
	}, [
		app,
		currentTab,
		currentTabId,
		displayName,
		updateTab
	]);
	(0, import_react.useEffect)(() => {
		if (!isActiveTab) return;
		if (isLoading) return;
		if (error) {
			logger.error("Failed to load mini apps", error instanceof Error ? error : new Error(String(error)));
			return;
		}
		if (!app) return;
		openMiniAppKeepAlive(app);
	}, [
		isActiveTab,
		app,
		openMiniAppKeepAlive,
		isLoading,
		error
	]);
	const webviewRef = (0, import_react.useRef)(null);
	const [isReady, setIsReady] = (0, import_react.useState)(() => appId ? getWebviewLoaded(appId) : false);
	const [sharedCacheReady, setSharedCacheReady] = (0, import_react.useState)(() => cacheService.isSharedCacheReady());
	(0, import_react.useEffect)(() => {
		if (sharedCacheReady) return;
		return cacheService.onSharedCacheReady(() => setSharedCacheReady(true));
	}, [sharedCacheReady]);
	const [currentUrl, setCurrentUrl] = (0, import_react.useState)(app?.url ?? null);
	const webviewCleanupRef = (0, import_react.useRef)(null);
	const detachWebview = (0, import_react.useCallback)(() => {
		webviewCleanupRef.current?.();
		webviewCleanupRef.current = null;
		webviewRef.current = null;
	}, []);
	const attachWebview = (0, import_react.useCallback)(() => {
		if (!app) return true;
		const selector = `webview[data-mini-app-id="${CSS.escape(app.appId)}"]`;
		const el = document.querySelector(selector);
		if (!el) return false;
		if (webviewRef.current === el) return true;
		detachWebview();
		webviewRef.current = el;
		const handleInPageNav = (e) => setCurrentUrl(e.url);
		el.addEventListener("did-navigate-in-page", handleInPageNav);
		webviewCleanupRef.current = () => {
			el.removeEventListener("did-navigate-in-page", handleInPageNav);
		};
		return true;
	}, [app, detachWebview]);
	(0, import_react.useEffect)(() => {
		if (!app || !isReady) {
			detachWebview();
			return;
		}
		if (attachWebview()) return detachWebview;
		const observer = new MutationObserver(() => {
			if (attachWebview()) observer.disconnect();
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		return () => {
			observer.disconnect();
			detachWebview();
		};
	}, [
		app,
		attachWebview,
		detachWebview,
		isReady
	]);
	(0, import_react.useEffect)(() => {
		if (!app) {
			setIsReady(false);
			return;
		}
		const unsubscribe = onWebviewStateChange(app.appId, setIsReady);
		setIsReady(getWebviewLoaded(app.appId));
		return unsubscribe;
	}, [app]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "mini-apps.app-page",
		className: "pointer-events-none relative z-3 flex h-full w-full flex-col *:pointer-events-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-x-0 top-8.75 bottom-0 z-4 flex flex-col items-center justify-center gap-3 bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_BeatLoader.default, {
				color: MINI_APP_LOADING_COLOR,
				size: 8
			})
		})
	});
	if (error) {
		const isNotFound = error instanceof DataApiError && error.code === ErrorCode.NOT_FOUND;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "mini-apps.app-page",
			className: "pointer-events-none relative z-3 flex h-full w-full flex-col *:pointer-events-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-8.75 bottom-0 z-4 flex flex-col items-center justify-center gap-3 bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[14px] text-muted-foreground",
					children: t(isNotFound ? "miniApp.error.not_found" : "miniApp.error.load_failed")
				})
			})
		});
	}
	if (!app) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "mini-apps.app-page",
		className: "pointer-events-none relative z-3 flex h-full w-full flex-col *:pointer-events-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-x-0 top-8.75 bottom-0 z-4 flex flex-col items-center justify-center gap-3 bg-card",
			children: sharedCacheReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[14px] text-muted-foreground",
				children: t("miniApp.error.not_found")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_BeatLoader.default, {
				color: MINI_APP_LOADING_COLOR,
				size: 8
			})
		})
	});
	const handleReload = () => {
		if (!app || !isReady || !getWebviewLoaded(app.appId)) return;
		const webview = webviewRef.current;
		if (!webview?.isConnected) return;
		setWebviewLoaded(app.appId, false);
		setIsReady(false);
		webview.reload();
	};
	const handleOpenDevTools = () => {
		webviewRef.current?.openDevTools();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "mini-apps.app-page",
		className: "pointer-events-none relative z-3 flex h-full w-full flex-col *:pointer-events-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinimalToolbar_default, {
					app,
					webviewRef,
					currentUrl,
					onReload: handleReload,
					onOpenDevTools: handleOpenDevTools
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebviewSearch_default, {
				webviewRef,
				isWebviewReady: isReady,
				appId: app.appId
			}),
			!isReady && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-8.75 bottom-0 z-4 flex flex-col items-center justify-center gap-3 bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppLogoAvatar_default, {
					logo: app.logoSrc ?? app.logo,
					size: 60
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_BeatLoader.default, {
					color: MINI_APP_LOADING_COLOR,
					size: 8,
					style: { marginTop: 12 }
				})]
			})
		]
	});
};
var SplitComponent = MiniAppPage;
export { SplitComponent as component };
