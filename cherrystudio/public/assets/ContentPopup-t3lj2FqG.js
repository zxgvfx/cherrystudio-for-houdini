import { s as __toESM } from "./chunk-DiqNceaa.js";
import { r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { n as createPopup } from "./popup-BqV2ZD7D.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var VIEWPORT_WIDTH_CAP = "calc(100vw - 2rem)";
function clampWidthToViewport(value) {
	if (typeof value === "number") return `min(${value}px, ${VIEWPORT_WIDTH_CAP})`;
	if (typeof value === "string") return `min(${value}, ${VIEWPORT_WIDTH_CAP})`;
	return value;
}
var PopupContainer = ({ content, title, width, styles, maskClosable = true, closable = true, open, resolve }) => {
	const contentStyle = { ...styles?.content };
	if (width !== void 0) contentStyle.width = width;
	for (const key of [
		"width",
		"minWidth",
		"maxWidth"
	]) if (contentStyle[key] !== void 0) contentStyle[key] = clampWidthToViewport(contentStyle[key]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && resolve(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			showCloseButton: closable,
			closeOnOverlayClick: maskClosable,
			className: cn((width !== void 0 || styles?.content?.maxWidth !== void 0) && "sm:max-w-none"),
			style: Object.keys(contentStyle).length > 0 ? contentStyle : void 0,
			onPointerDownOutside: (event) => {
				if (!maskClosable) event.preventDefault();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: title ? void 0 : "sr-only",
				style: styles?.header,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title ?? "Dialog" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: styles?.body,
				children: content
			})]
		})
	});
};
var ContentPopup_default = createPopup(PopupContainer);
export { ContentPopup_default as t };
