import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./react-DXAbXv4a.js";
import "./react-dom-D-tOyCJ4.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./es2015-CF8XujIC.js";
import { o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import "./esm-CEkDmnO2.js";
import "./dist-DErY0e6o.js";
import "./w3c-keyname-d7Yk5myI.js";
import "./diff-BkIMdlj4.js";
import { t as code_editor_default } from "./code-editor-OcWG1V1n.js";
import { n as useCodeStyle } from "./useCodeStyle-zD0Sb1Ey.js";
import { n as createPopup } from "./popup-BLG-Gue5.js";
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
