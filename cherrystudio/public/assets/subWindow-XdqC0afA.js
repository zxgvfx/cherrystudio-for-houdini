import { s as __toESM } from "./chunk-DiqNceaa.js";
/* empty css                */
import { t as require_client } from "./client-TaGHv70X.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import "./error-3V5V4Mev.js";
import "./PreferenceService-uLlqCRc6.js";
import "./useCache-SsOQx-L2.js";
import { r as isMac } from "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { a as prepareWindow, i as ThemeProvider, r as WindowFatalFallback } from "./useLanguageSync-BKR-zfcH.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-yBX61WcV.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import "./react-error-boundary-B3KJNPcX.js";
import "./es2015-DmjbZU9-.js";
import "./diff-HM2C_nqz.js";
import "./with-selector-BMhODuKS.js";
import "./dist-Cu7DuZHc.js";
import "./useCodeStyle-ZK5esKOR.js";
import "./useTheme-C0NcZaKl.js";
import "./useMermaid-CRrUmNsD.js";
import "./shiki-408EkuKH.js";
import { n as CodeStyleProvider, t as PopupHost } from "./PopupHost-_axdx3Fv.js";
import "./command-DAltNKKn.js";
import { o as CommandContextKeyProvider, t as CommandProvider } from "./command-Dkd9__0y.js";
import "./useCloseBeforeAction-OyC3zPmq.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-BQINHMNg.js";
import { D as resolveSidebarAppTabEntryUrl, i as useTabs, j as clearTabInstanceMetadata } from "./tab-BoJ166Ld.js";
import { t as useWindowInitData } from "./useWindowInitData-C8-CHwDP.js";
import "./mainWindowNavigation-m8-JFOdz.js";
import { n as isPageTitledRoute, t as getDefaultRouteTitle } from "./routeTitle-BAQAVa2r.js";
import "./useMacTransparentWindow-8k6aQbko.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./model-CfoN7z8F.js";
import "./message-By01RpZa.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./useReorder-CHjMnht2.js";
import "./toast-DsSiWKrR.js";
import "./useMiniApps-Cw2wO8m-.js";
import { t as Pin } from "./pin-BrGtHzQa.js";
import "./popup-C0FVl5N5.js";
import "./miniAppsLogo-8mrhSRfF.js";
import { c as MiniAppTabsPool_default, l as WindowControls_default, n as TabsProvider, o as TabIcon, r as TabRouter, s as ResourceViewSourceProvider, t as useWindowRuntime, u as useHasWindowControls } from "./useWindowRuntime-kuEajajH.js";
import "./resourceViewSources-CAJsHceC.js";
import "./EventService-DaL7yYFd.js";
import "./uiParts-CtZmiNbl.js";
import "./useTopic-Ry_b31lB.js";
import "./EmojiIcon-zehzZHuL.js";
import "./file-preview-BwTierXI.js";
import "./with-selector-C8NQ8H_Y.js";
import "./filePreview-HCbM3Csa.js";
import "./customCssMigration-kFDGIria.js";
import { t as ToastHost } from "./ToastHost-DtMy4OYe.js";
import "./filePath-CFBpohO3.js";
import { t as WindowFrameContext } from "./useWindowFrame-QfY572Zv.js";
import { t as BackToMainWindowIcon } from "./WindowIcons-CKDFnL0U.js";
import { t as NavbarIcon_default } from "./NavbarIcon-Wc_wXzKf.js";
var import_client = require_client();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function WindowFrameProvider({ value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFrameContext, {
		value,
		children
	});
}
const TITLE_BAR_HEIGHT_CLASS = "h-[37.5px]";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("SubWindowControls");
const SubWindowControls = () => {
	const { t } = useTranslation();
	const { tabs, activeTabId } = useTabs();
	const [pinned, setPinned] = (0, import_react.useState)(false);
	const handleTogglePin = async () => {
		const next = !pinned;
		if (await ipcApi.request("window.sub.set_always_on_top", next)) setPinned(next);
	};
	const handleBackToMain = () => {
		const tab = tabs.find((tabItem) => tabItem.id === activeTabId) ?? tabs[0];
		if (!tab) return;
		const payload = {
			...tab,
			url: resolveSidebarAppTabEntryUrl(tab)
		};
		ipcApi.request("tab.attach", payload).catch((err) => {
			logger.error("Back to main window failed", err);
		});
	};
	const pinLabel = pinned ? t("subWindow.unpin") : t("subWindow.pin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		placement: "bottom",
		content: pinLabel,
		delay: 400,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavbarIcon_default, {
			"aria-label": pinLabel,
			"aria-pressed": pinned,
			onClick: handleTogglePin,
			className: cn(pinned && "text-primary! hover:text-primary!"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: pinned ? "fill-current" : void 0 })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		placement: "bottom",
		content: t("subWindow.back_to_main"),
		delay: 400,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavbarIcon_default, {
			"aria-label": t("subWindow.back_to_main"),
			onClick: handleBackToMain,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToMainWindowIcon, {})
		})
	})] });
};
const SubWindowTitle = ({ className }) => {
	const { tabs, activeTabId } = useTabs();
	const tab = tabs.find((tabItem) => tabItem.id === activeTabId) ?? tabs[0];
	if (!tab) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "app.sub-window-title",
		"data-navbar-left-occupant": true,
		className: cn("flex min-w-0 items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabIcon, {
			tab,
			size: 16,
			className: "shrink-0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 truncate font-medium text-[13px] text-foreground",
			children: tab.title
		})]
	});
};
const SubWindowTitleBar = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
	"data-ui": "sub-window.title-bar",
	className: cn("relative flex w-full shrink-0 select-none items-center gap-2 border-border-subtle border-b bg-background [-webkit-app-region:drag]", TITLE_BAR_HEIGHT_CLASS, "pr-[calc(0.5rem+var(--window-controls-width,0px))]", isMac ? "pl-[env(titlebar-area-x)]" : "pl-2"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubWindowTitle, { className: "min-w-0 flex-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex shrink-0 items-center gap-0.5 [-webkit-app-region:no-drag]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubWindowControls, {})
	})]
});
var WINDOW_FRAME = { mode: "window" };
var WebviewContainer = ({ url, isActive }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Activity, {
	mode: isActive ? "visible" : "hidden",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full w-full flex-col items-center justify-center bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-2 font-bold text-lg",
			children: "Webview App"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded bg-muted p-2",
			children: url
		})]
	})
});
const SubWindowAppShell = () => {
	const { tabs, activeTabId, updateTab, openTab } = useTabs();
	const initialized = (0, import_react.useRef)(false);
	const init = useWindowInitData();
	(0, import_react.useEffect)(() => {
		if (!init || initialized.current) return;
		initialized.current = true;
		openTab(init.url, {
			id: init.tabId,
			title: init.title,
			icon: init.icon,
			type: init.type || "route",
			metadata: init.metadata,
			isPinned: init.isPinned,
			forceNew: true
		});
	}, [init, openTab]);
	const handleUrlChange = (tabId, url) => {
		const tab = tabs.find((candidate) => candidate.id === tabId);
		if (isPageTitledRoute(url)) {
			updateTab(tabId, { url });
			return;
		}
		updateTab(tabId, {
			url,
			title: getDefaultRouteTitle(url),
			icon: void 0,
			metadata: clearTabInstanceMetadata(tab?.metadata)
		});
	};
	const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];
	(0, import_react.useEffect)(() => {
		if (!activeTab || !isPageTitledRoute(activeTab.url)) return;
		const url = resolveSidebarAppTabEntryUrl(activeTab);
		if (url === activeTab.url) return;
		updateTab(activeTab.id, { url });
	}, [activeTab, updateTab]);
	const hasWindowControls = useHasWindowControls();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFrameProvider, {
		value: WINDOW_FRAME,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "app.detached-window",
			className: "relative flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground",
			style: { "--window-controls-width": hasWindowControls ? "138px" : "0px" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubWindowTitleBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "relative flex-1 overflow-hidden bg-background",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceViewSourceProvider, { children: tabs.filter((t) => t.type === "route" && !t.isDormant).map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabRouter, {
							tab,
							isActive: tab.id === activeTabId,
							onUrlChange: (url) => handleUrlChange(tab.id, url)
						}, tab.id)) }),
						tabs.filter((t) => t.type === "webview" && !t.isDormant).map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebviewContainer, {
							url: tab.url,
							isActive: tab.id === activeTabId
						}, tab.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniAppTabsPool_default, {})
					]
				}),
				hasWindowControls && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("absolute top-0 right-0 z-[9999] flex [-webkit-app-region:no-drag]", "h-[37.5px]"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowControls_default, {})
				})
			]
		})
	});
};
function SubWindowRuntime() {
	useWindowRuntime();
	return null;
}
function SubWindowApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryCustomized, {
		fallbackComponent: WindowFatalFallback,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeStyleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextKeyProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsProvider, {
			initialDefaultTab: null,
			includePinnedTabs: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubWindowAppShell, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubWindowRuntime, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopupHost, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastHost, {})
			]
		}) }) }) }) })
	});
}
var SubWindowApp_default = SubWindowApp;
await prepareWindow({ preference: "all" });
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubWindowApp_default, {}));
