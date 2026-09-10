import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./react-C1DTAr29.js";
import "./react-dom-D5lMhlFn.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./es2015-wfS3L7va.js";
import { o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DwmxJH-S.js";
import "./esm-BG45amY4.js";
import "./dist-DAWIImZF.js";
import "./w3c-keyname-DKIRohbk.js";
import "./diff-KPuWBc9d.js";
import { t as code_editor_default } from "./code-editor-BKKD5rxw.js";
import { n as useCodeStyle } from "./useCodeStyle-hWHmowmT.js";
import { n as createPopup } from "./popup-fJcKiA2S.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var PopupContainer = ({ text, title, extension, open, resolve }) => {
	const [fontSize] = usePreference("chat.message.font_size");
	const { activeCmTheme } = useCodeStyle();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (nextOpen) => !nextOpen && resolve(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "h-[80vh] max-h-[calc(100vh-2rem)] max-w-[700px] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[20px] p-0 sm:max-w-[700px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "px-6 pt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 overflow-hidden",
				children: extension !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(code_editor_default, {
					className: "[&_.cm-line]:cursor-text",
					theme: activeCmTheme,
					fontSize: fontSize - 1,
					readOnly: true,
					expanded: false,
					height: "100%",
					style: { height: "100%" },
					value: text,
					language: extension,
					options: { keymap: true }
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full cursor-text overflow-auto whitespace-pre p-4 text-foreground text-sm",
					children: text
				})
			})]
		})
	});
};
var TextFilePreviewPopupHandle = createPopup(PopupContainer);
var TextFilePreviewPopup_default = {
	show: (text, title, extension) => TextFilePreviewPopupHandle.show({
		text,
		title,
		extension
	}),
	hide: () => TextFilePreviewPopupHandle.hide()
};
export { TextFilePreviewPopup_default as default };
