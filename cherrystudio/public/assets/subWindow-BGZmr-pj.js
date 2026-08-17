import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
/* empty css                */
import { t as require_client } from "./client-CL1qLRYW.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import { r as isMac } from "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { a as prepareWindow, i as ThemeProvider, r as WindowFatalFallback } from "./useLanguageSync-Al9p-zPL.js";
import "./react-dom-D-tOyCJ4.js";
import "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import "./react-error-boundary-1QFJEaxP.js";
import "./es2015-CF8XujIC.js";
import "./diff-BkIMdlj4.js";
import "./with-selector-YZwnb76j.js";
import "./dist-CbafgI8N.js";
import "./useCodeStyle-zD0Sb1Ey.js";
import "./useTheme-CkJQYl0u.js";
import "./shiki-5X_PGXXr.js";
import { n as CodeStyleProvider, t as PopupHost } from "./PopupHost-fHyOqzfs.js";
import "./command-DJ8bdie_.js";
import { o as CommandContextKeyProvider, t as CommandProvider } from "./command-CtEyUhIg.js";
import "./useCloseBeforeAction-COmv5C7_.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-Bijb9tIO.js";
import { i as useTabs } from "./tab-BIOOjV6R.js";
import { t as useWindowInitData } from "./useWindowInitData-nzW1IbOc.js";
import "./mainWindowNavigation-BoKv8CTA.js";
import "./useMacTransparentWindow-DaKruLym.js";
import { n as isPageTitledRoute, t as getDefaultRouteTitle } from "./routeTitle-cKI7p46Z.js";
import { n as cn } from "./style-C-RkFX_x.js";
import "./CacheService-BxZWLQeF.js";
import "./useCache-DNNSH80c.js";
import "./file-BaEpIJyZ.js";
import "./file-C52KaMrN.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./message-B_yl0O_K.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import "./useReorder-BgG0nfey.js";
import "./toast-C6NqKFoQ.js";
import "./useMiniApps-CSGgQnmg.js";
import { t as Pin } from "./pin-CryR5xyJ.js";
import "./popup-BLG-Gue5.js";
import "./miniAppsLogo-BmkS6kHN.js";
import "./systemProviderId-BF_COOhE.js";
import { i as useHasWindowControls, r as WindowControls_default } from "./RouterProvider-DuN8zbef.js";
import { a as ResourceViewSourceProvider, i as TabIcon, n as TabsProvider, o as MiniAppTabsPool_default, r as TabRouter, t as useWindowRuntime } from "./useWindowRuntime-CSLebllS.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import "./provider-B43PumwQ.js";
import { t as BackToMainWindowIcon } from "./WindowIcons-CiINgt8k.js";
import "./EventService-B0N3Z50N.js";
import "./uiParts-D7jaMraw.js";
import "./useTopic-DqjHWqZM.js";
import "./EmojiIcon-_0GJskRg.js";
import "./with-selector-DOSXj2wE.js";
import "./file-preview-ZToTfrn2.js";
import "./filePreview-Bzjo3HcD.js";
import "./customCssMigration-CpKKPCjP.js";
import { t as ToastHost } from "./ToastHost-36bSxswo.js";
import "./filePath-CS1ffRfs.js";
import { t as WindowFrameContext } from "./useWindowFrame-B3nDfm6s.js";
import { t as NavbarIcon_default } from "./NavbarIcon-BGnLYDSV.js";
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
		ipcApi.request("tab.attach", tab).catch((err) => {
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
			isPinned: init.isPinned,
			forceNew: true
		});
	}, [init, openTab]);
	const handleUrlChange = (tabId, url) => {
		if (isPageTitledRoute(url)) {
			updateTab(tabId, { url });
			return;
		}
		updateTab(tabId, {
			url,
			title: getDefaultRouteTitle(url),
			icon: void 0,
			metadata: void 0
		});
	};
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
