import { g as __toESM } from "./chunk-st2fFX3F.js";
import { eA as useTranslation, eW as defaultLanguage, ex as require_jsx_runtime, ez as i18n_default, f4 as loggerService } from "./es-B_kyM-eZ.js";
import { e7 as useTimer, eA as logo_default, fj as avatar_default, gc as useSettings, kc as IpcChannel } from "./store-Cfq_ZiOM.js";
import { b as require_react } from "./react-nO8b1aHv.js";
import { bu as dt } from "./ImageViewer-DfnTJ57y.js";
import { b as ClipboardCheck } from "./clipboard-check-BUplhdP7.js";
import { b as ClipboardCopy } from "./clipboard-copy-CQHE7PRP.js";
import { b as ClipboardX } from "./clipboard-x-CPhjJ8GJ.js";
import { b as MessageSquareHeart } from "./message-square-heart-BoJ1h-pu.js";
import { b as DynamicIcon, d as useSelectionAssistant } from "./DynamicIcon-DVh9Ll9T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react = /* @__PURE__ */ __toESM(require_react());
const logger = loggerService.withContext("SelectionToolbar");
const updateWindowSize = () => {
	const rootElement = document.getElementById("root");
	if (!rootElement) {
		logger.error("Root element not found");
		return;
	}
	window.api?.selection.determineToolbarSize(rootElement.scrollWidth, rootElement.scrollHeight);
};
const ActionIcons = /* @__PURE__ */ (0, import_react.memo)(({ actionItems, isCompact, handleAction, copyIconStatus, copyIconAnimation }) => {
	const { t } = useTranslation();
	const renderCopyIcon = (0, import_react.useCallback)(() => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, { className: `btn-icon ${copyIconAnimation === "enter" ? "icon-scale-out" : copyIconAnimation === "exit" ? "icon-fade-in" : ""}` }),
			copyIconStatus === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: `btn-icon icon-success ${copyIconAnimation === "enter" ? "icon-scale-in" : copyIconAnimation === "exit" ? "icon-fade-out" : ""}` }),
			copyIconStatus === "fail" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardX, { className: `btn-icon icon-fail ${copyIconAnimation === "enter" ? "icon-scale-in" : copyIconAnimation === "exit" ? "icon-fade-out" : ""}` })
		] });
	}, [copyIconStatus, copyIconAnimation]);
	const renderActionButton = (0, import_react.useCallback)((action) => {
		const displayName = action.isBuiltIn ? t(action.name) : action.name;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionButton, {
			onClick: () => handleAction(action),
			title: isCompact ? displayName : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcon, { children: action.id === "copy" ? renderCopyIcon() : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
				name: action.icon,
				className: "btn-icon",
				fallback: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareHeart, { className: "btn-icon" })
			}, action.id) }), !isCompact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionTitle, {
				className: "btn-title",
				children: displayName
			})]
		}, action.id);
	}, [
		handleAction,
		isCompact,
		t,
		renderCopyIcon
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: actionItems?.map(renderActionButton) });
});
const SelectionToolbar = ({ demo = false }) => {
	const { language, customCss } = useSettings();
	const { isCompact, actionItems } = useSelectionAssistant();
	const [animateKey, setAnimateKey] = (0, import_react.useState)(0);
	const [copyIconStatus, setCopyIconStatus] = (0, import_react.useState)("normal");
	const [copyIconAnimation, setCopyIconAnimation] = (0, import_react.useState)("none");
	const { setTimeoutTimer, clearTimeoutTimer } = useTimer();
	const realActionItems = (0, import_react.useMemo)(() => {
		return actionItems?.filter((item) => item.enabled);
	}, [actionItems]);
	const selectedText = (0, import_react.useRef)("");
	const isFullScreen = (0, import_react.useRef)(false);
	const onHideCleanUp = (0, import_react.useCallback)(() => {
		setCopyIconStatus("normal");
		setCopyIconAnimation("none");
		clearTimeoutTimer("textSelection");
		clearTimeoutTimer("copyIcon");
	}, [clearTimeoutTimer]);
	(0, import_react.useEffect)(() => {
		const cleanups = [];
		const textSelectionListenRemover = window.electron?.ipcRenderer.on(IpcChannel.Selection_TextSelected, (_, selectionData) => {
			selectedText.current = selectionData.text;
			isFullScreen.current = selectionData.isFullscreen ?? false;
			const cleanup = setTimeoutTimer("textSelection", () => {
				setAnimateKey((prev) => prev + 1);
			}, 400);
			cleanups.push(cleanup);
		});
		const toolbarVisibilityChangeListenRemover = window.electron?.ipcRenderer.on(IpcChannel.Selection_ToolbarVisibilityChange, (_, isVisible) => {
			if (!isVisible) {
				if (!demo) updateWindowSize();
				onHideCleanUp();
			}
		});
		return () => {
			textSelectionListenRemover();
			toolbarVisibilityChangeListenRemover();
			cleanups.forEach((cleanup) => cleanup());
		};
	}, [
		demo,
		onHideCleanUp,
		setTimeoutTimer
	]);
	(0, import_react.useEffect)(() => {
		if (!demo) updateWindowSize();
	}, [
		demo,
		isCompact,
		actionItems
	]);
	(0, import_react.useEffect)(() => {
		!demo && i18n_default.changeLanguage(language || navigator.language || defaultLanguage);
	}, [language, demo]);
	(0, import_react.useEffect)(() => {
		if (demo) return;
		let customCssElement = document.getElementById("user-defined-custom-css");
		if (customCssElement) customCssElement.remove();
		if (customCss) {
			const newCustomCss = customCss.replace(/(^|\s)background(-image|-color)?\s*:[^;]+;/gi, "");
			customCssElement = document.createElement("style");
			customCssElement.id = "user-defined-custom-css";
			customCssElement.textContent = newCustomCss;
			document.head.appendChild(customCssElement);
		}
	}, [customCss, demo]);
	const handleCopy = (0, import_react.useCallback)(async () => {
		if (selectedText.current) {
			const result = await window.api?.selection.writeToClipboard(selectedText.current);
			setCopyIconStatus(result ? "success" : "fail");
			setCopyIconAnimation("enter");
			setTimeoutTimer("copyIcon", () => {
				setCopyIconAnimation("exit");
			}, 2e3);
		}
	}, [setTimeoutTimer]);
	const handleAction = (0, import_react.useCallback)((action) => {
		if (demo) return;
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
	}, [demo, handleCopy]);
	const handleSearch = (action) => {
		if (!action.searchEngine) return;
		const customUrl = action.searchEngine.split("|")[1];
		if (!customUrl) return;
		const searchUrl = customUrl.replace("{{queryString}}", encodeURIComponent(action.selectedText || ""));
		window.api?.openWebsite(searchUrl);
		window.api?.selection.hideToolbar();
	};
	const handleQuote = (action) => {
		if (action.selectedText) {
			window.api?.quoteToMainWindow(action.selectedText);
			window.api?.selection.hideToolbar();
		}
	};
	const handleDefaultAction = (action) => {
		window.api?.selection.processAction(action, isFullScreen.current);
		window.api?.selection.hideToolbar();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoWrapper, {
		$draggable: !demo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
			src: logo_default,
			className: "animate",
			draggable: false
		}, animateKey)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionIcons, {
		actionItems: realActionItems,
		isCompact,
		handleAction,
		copyIconStatus,
		copyIconAnimation
	}) })] });
};
const Container = /* @__PURE__ */ dt.div.withConfig({ displayName: "Container" })([`display:inline-flex;flex-direction:row;align-items:stretch;height:var(--selection-toolbar-height);border-radius:var(--selection-toolbar-border-radius);border:var(--selection-toolbar-border);box-shadow:var(--selection-toolbar-box-shadow);background:var(--selection-toolbar-background);padding:var(--selection-toolbar-padding) !important;margin:var(--selection-toolbar-margin) !important;user-select:none;box-sizing:border-box;overflow:hidden;`]);
const LogoWrapper = /* @__PURE__ */ dt.div.withConfig({ displayName: "LogoWrapper" })([`display:var(--selection-toolbar-logo-display);align-items:center;justify-content:center;margin:var(--selection-toolbar-logo-margin);padding:var(--selection-toolbar-logo-padding);background-color:var(--selection-toolbar-logo-background);border-width:var(--selection-toolbar-logo-border-width);border-style:var(--selection-toolbar-logo-border-style);border-color:var(--selection-toolbar-logo-border-color);border-radius:var(--selection-toolbar-border-radius) 0 0 var(--selection-toolbar-border-radius);`, `;`], ({ $draggable }) => $draggable && " -webkit-app-region: drag;");
const Logo = /* @__PURE__ */ dt(avatar_default).withConfig({ displayName: "Logo" })([`height:var(--selection-toolbar-logo-size);width:var(--selection-toolbar-logo-size);&.animate{animation:rotate 1s ease;}@keyframes rotate{0%{transform:rotate(0deg) scale(1);}25%{transform:rotate(-15deg) scale(1.05);}75%{transform:rotate(15deg) scale(1.05);}100%{transform:rotate(0deg) scale(1);}}`]);
const ActionWrapper = /* @__PURE__ */ dt.div.withConfig({ displayName: "ActionWrapper" })([`display:flex;flex-direction:row;align-items:center;justify-content:center;background-color:transparent;border-width:var(--selection-toolbar-buttons-border-width);border-style:var(--selection-toolbar-buttons-border-style);border-color:var(--selection-toolbar-buttons-border-color);border-radius:var(--selection-toolbar-buttons-border-radius);`]);
const ActionButton = /* @__PURE__ */ dt.div.withConfig({ displayName: "ActionButton" })([`height:100%;display:flex;flex-direction:row;align-items:center;justify-content:center;gap:2px;cursor:pointer !important;margin:var(--selection-toolbar-button-margin);padding:var(--selection-toolbar-button-padding);background-color:var(--selection-toolbar-button-bgcolor);border-radius:var(--selection-toolbar-button-border-radius);border:var(--selection-toolbar-button-border);box-shadow:var(--selection-toolbar-button-box-shadow);transition:all 0.1s ease-in-out;will-change:color,background-color;&:last-child{border-radius:0 var(--selection-toolbar-border-radius) var(--selection-toolbar-border-radius) 0;padding:var(--selection-toolbar-button-last-padding);}.btn-icon{width:var(--selection-toolbar-button-icon-size);height:var(--selection-toolbar-button-icon-size);color:var(--selection-toolbar-button-icon-color);background-color:transparent;transition:color 0.1s ease-in-out;will-change:color;}.btn-title{color:var(--selection-toolbar-button-text-color);transition:color 0.1s ease-in-out;will-change:color;line-height:1.1;}&:hover{.btn-icon{color:var(--color-primary);}.btn-title{color:var(--color-primary);}background-color:var(--selection-toolbar-button-bgcolor-hover);}`]);
const ActionIcon = /* @__PURE__ */ dt.div.withConfig({ displayName: "ActionIcon" })([`display:flex;align-items:center;justify-content:center;position:relative;height:var(--selection-toolbar-button-icon-size);width:var(--selection-toolbar-button-icon-size);background-color:transparent;.btn-icon{position:absolute;top:0;left:0;}.btn-icon:nth-child(2){top:0px;left:0px;}.icon-fail{color:var(--selection-toolbar-color-error);}.icon-success{color:var(--selection-toolbar-color-primary);}.icon-scale-in{animation:scaleIn 0.5s forwards;}.icon-scale-out{animation:scaleOut 0.5s forwards;}.icon-fade-in{animation:fadeIn 0.3s forwards;}.icon-fade-out{animation:fadeOut 0.3s forwards;}@keyframes scaleIn{from{transform:scale(0);opacity:0;}to{transform:scale(1);opacity:1;}}@keyframes scaleOut{from{transform:scale(1);opacity:1;}to{transform:scale(0);opacity:0;}}@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}@keyframes fadeOut{from{opacity:1;}to{opacity:0;}}`]);
const ActionTitle = /* @__PURE__ */ dt.span.withConfig({ displayName: "ActionTitle" })([`font-size:var(--selection-toolbar-font-size);max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:var(--selection-toolbar-button-text-margin);background-color:transparent;`]);
var SelectionToolbar_default = SelectionToolbar;
export { SelectionToolbar_default as b };
