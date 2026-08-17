import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./abortSignalPolyfill-KatcZ07J.js";
import { t as require_client } from "./client-CL1qLRYW.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { a as prepareWindow, i as ThemeProvider, n as useCustomCss, r as WindowFatalFallback, t as useLanguageSync } from "./useLanguageSync-Al9p-zPL.js";
import "./react-dom-D-tOyCJ4.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./react-error-boundary-1QFJEaxP.js";
import "./useTheme-CkJQYl0u.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BuGMWdaI.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-Bijb9tIO.js";
import "./customCssMigration-CpKKPCjP.js";
import { t as useTimer } from "./useTimer-BCHMb2QP.js";
import "./SelectionActionIcon-DaNe9Ev1.js";
import { t as SelectionToolbarView_default } from "./SelectionToolbarView-D_Np_5vH.js";
var import_client = require_client();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("SelectionToolbar");
var getCssPixelValue = (value) => Number.parseFloat(value) || 0;
var getElementOuterSize = (element) => {
	const rect = element.getBoundingClientRect();
	const style = window.getComputedStyle(element);
	return {
		width: rect.width + getCssPixelValue(style.marginLeft) + getCssPixelValue(style.marginRight),
		height: rect.height + getCssPixelValue(style.marginTop) + getCssPixelValue(style.marginBottom)
	};
};
var updateWindowSize = (contentElement) => {
	const rootElement = document.getElementById("root");
	const targetElement = contentElement ?? (rootElement?.firstElementChild instanceof HTMLElement ? rootElement.firstElementChild : rootElement);
	if (!targetElement) {
		logger.error("Toolbar content element not found");
		return;
	}
	const { width, height } = getElementOuterSize(targetElement);
	ipcApi.request("selection.determine_toolbar_size", {
		width: Math.ceil(width),
		height: Math.ceil(height)
	});
};
var SelectionToolbar = () => {
	const [isCompact] = usePreference("feature.selection.compact");
	const [actionItems] = usePreference("feature.selection.action_items");
	const [copyIconStatus, setCopyIconStatus] = (0, import_react.useState)("normal");
	const [copyIconAnimation, setCopyIconAnimation] = (0, import_react.useState)("none");
	const { setTimeoutTimer, clearTimeoutTimer } = useTimer();
	const toolbarRef = (0, import_react.useRef)(null);
	const realActionItems = (0, import_react.useMemo)(() => {
		return actionItems?.filter((item) => item.enabled);
	}, [actionItems]);
	const selectedText = (0, import_react.useRef)("");
	const isFullScreen = (0, import_react.useRef)(false);
	const onHideCleanUp = (0, import_react.useCallback)(() => {
		setCopyIconStatus("normal");
		setCopyIconAnimation("none");
		clearTimeoutTimer("copyIcon");
	}, [clearTimeoutTimer]);
	useIpcOn("selection.text_selected", (selectionData) => {
		selectedText.current = selectionData.text;
		isFullScreen.current = selectionData.isFullscreen ?? false;
	});
	useIpcOn("selection.toolbar_visibility_change", (isVisible) => {
		if (!isVisible) {
			updateWindowSize(toolbarRef.current);
			onHideCleanUp();
		}
	});
	(0, import_react.useEffect)(() => {
		updateWindowSize(toolbarRef.current);
	}, [isCompact, actionItems]);
	const isUriOrFilePath = (text) => {
		const trimmed = text.trim();
		if (/\s/.test(trimmed)) return false;
		if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)) return true;
		if (/^[a-zA-Z]:[/\\]/.test(trimmed)) return true;
		if (/^\/[^/]/.test(trimmed)) return true;
		return false;
	};
	const handleCopy = (0, import_react.useCallback)(async () => {
		if (selectedText.current) {
			setCopyIconStatus(await ipcApi.request("selection.write_to_clipboard", selectedText.current) ? "success" : "fail");
			setCopyIconAnimation("enter");
			setTimeoutTimer("copyIcon", () => {
				setCopyIconAnimation("exit");
			}, 2e3);
		}
	}, [setTimeoutTimer]);
	const handleSearch = (0, import_react.useCallback)((action) => {
		if (!action.selectedText) return;
		const selectedText$1 = action.selectedText.trim();
		let actionString = "";
		if (isUriOrFilePath(selectedText$1)) actionString = selectedText$1;
		else {
			if (!action.searchEngine) return;
			const customUrl = action.searchEngine.split("|")[1];
			if (!customUrl) return;
			actionString = customUrl.replace("{{queryString}}", encodeURIComponent(selectedText$1));
		}
		ipcApi.request("system.shell.open_website", actionString);
		ipcApi.request("selection.hide_toolbar");
	}, []);
	const handleQuote = (action) => {
		if (action.selectedText) {
			window.api?.quoteToMainWindow(action.selectedText);
			ipcApi.request("selection.hide_toolbar");
		}
	};
	const handleDefaultAction = (action) => {
		ipcApi.request("selection.process_action", {
			actionItem: action,
			isFullScreen: isFullScreen.current
		});
		ipcApi.request("selection.hide_toolbar");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionToolbarView_default, {
		ref: toolbarRef,
		actionItems: realActionItems,
		isCompact,
		handleAction: (0, import_react.useCallback)((action) => {
			const newAction = {
				...action,
				selectedText: selectedText.current
			};
			switch (action.id) {
				case "copy":
					handleCopy();
					break;
				case "search":
					handleSearch(newAction);
					break;
				case "quote":
					handleQuote(newAction);
					break;
				default:
					handleDefaultAction(newAction);
					break;
			}
		}, [handleCopy, handleSearch]),
		copyIconStatus,
		copyIconAnimation,
		draggable: true
	});
};
var SelectionToolbar_default = SelectionToolbar;
function SelectionToolbarRuntime() {
	useLanguageSync();
	useCustomCss();
	return null;
}
var SelectionToolbarApp = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryCustomized, {
		fallbackComponent: WindowFatalFallback,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionToolbarRuntime, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionToolbar_default, {})] })
	});
};
var SelectionToolbarApp_default = SelectionToolbarApp;
await prepareWindow({ preference: [
	"app.language",
	"ui.custom_css",
	"ui.theme_mode",
	"ui.theme_user.color_primary",
	"feature.selection.compact",
	"feature.selection.action_items"
] });
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionToolbarApp_default, {}));
