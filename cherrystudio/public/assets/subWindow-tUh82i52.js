import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
/* empty css                */
import { t as require_client } from "./client-Dri0ImSL.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import { r as isMac } from "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { a as prepareWindow, i as ThemeProvider, r as WindowFatalFallback } from "./useLanguageSync-C9ExgPoX.js";
import "./react-dom-D5lMhlFn.js";
import "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import "./react-error-boundary-CnvE_Ln4.js";
import "./es2015-wfS3L7va.js";
import "./diff-KPuWBc9d.js";
import "./with-selector-DlsRhNV6.js";
import "./dist-oTn6Mzbo.js";
import "./useCodeStyle-hWHmowmT.js";
import "./useTheme-mM6gKAcD.js";
import "./shiki-g8Tr0-KC.js";
import { n as CodeStyleProvider, t as PopupHost } from "./PopupHost-ORVBzrBR.js";
import "./command-CyHQabGE.js";
import { o as CommandContextKeyProvider, t as CommandProvider } from "./command-B9oiyMDG.js";
import "./useCloseBeforeAction-DvYaYpLC.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-CrY8yFbh.js";
import { i as useTabs } from "./tab-CVOgL8bf.js";
import { t as useWindowInitData } from "./useWindowInitData-BzKs7Qq9.js";
import "./mainWindowNavigation-Dpzd_Ttr.js";
import "./useMacTransparentWindow-61LUyAnK.js";
import { n as isPageTitledRoute, t as getDefaultRouteTitle } from "./routeTitle--4OTq6gp.js";
import { n as cn } from "./style-BQVh98fR.js";
import "./CacheService-IyXh62g9.js";
import "./useCache-lF6Sw_ck.js";
import "./file-OKCzlHoD.js";
import "./file-CkrjUGO_.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import "./message-CtGMR9KJ.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import "./useReorder-Cmki1Ln4.js";
import "./toast-D2efAzAF.js";
import "./useMiniApps-w5WTSbIS.js";
import { t as Pin } from "./pin-8UnKjfdt.js";
import "./popup-fJcKiA2S.js";
import "./miniAppsLogo-Gym76iTp.js";
import "./systemProviderId-B4QvwwvR.js";
import { i as useHasWindowControls, r as WindowControls_default } from "./RouterProvider-C8_kLL3F.js";
import { a as ResourceViewSourceProvider, i as TabIcon, n as TabsProvider, o as MiniAppTabsPool_default, r as TabRouter, t as useWindowRuntime } from "./useWindowRuntime-1qkvsWm5.js";
import "./useSession-CwZkOUrY.js";
import "./conversationEntry-CTSSFR4L.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import "./EventService-CMzpRLnw.js";
import "./uiParts-ClY38h-2.js";
import "./useTopic-DcX9oNzM.js";
import { t as BackToMainWindowIcon } from "./WindowIcons-deSlwIsf.js";
import "./EmojiIcon-oUJ-cQSb.js";
import "./with-selector-DFVq3c2Y.js";
import "./file-preview-weVlIB04.js";
import "./filePreview-CGUDTTTP.js";
import "./customCssMigration-CzAWBFG-.js";
import { t as ToastHost } from "./ToastHost-IGq0t1_z.js";
import "./filePath-SVkx1Fle.js";
import { t as WindowFrameContext } from "./useWindowFrame-BNKTfWS3.js";
import { t as NavbarIcon_default } from "./NavbarIcon-CfyOvekf.js";
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
