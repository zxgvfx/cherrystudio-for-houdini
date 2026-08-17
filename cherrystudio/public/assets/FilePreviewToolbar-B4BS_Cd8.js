import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_react_dom } from "./react-dom-D-tOyCJ4.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_react_dom = require_react_dom();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var FilePreviewToolbarPortalContext = (0, import_react.createContext)(void 0);
function FilePreviewToolbarPortalProvider({ children }) {
	const [target, setTarget] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbarPortalContext, {
		value: (0, import_react.useMemo)(() => ({
			setTarget,
			target
		}), [target]),
		children
	});
}
function FilePreviewToolbarPortalHost() {
	const context = (0, import_react.use)(FilePreviewToolbarPortalContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.file-preview-toolbar-portal.file-preview-toolbar-host",
		ref: context?.setTarget,
		"data-testid": "file-preview-toolbar-host",
		className: "ml-3 flex min-w-0 max-w-[70%] items-center justify-end overflow-x-auto"
	});
}
function FilePreviewToolbar({ "aria-label": ariaLabel, children }) {
	const context = (0, import_react.use)(FilePreviewToolbarPortalContext);
	if (context && !context.target) return null;
	const toolbar = context ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.file-preview-toolbar",
		role: "toolbar",
		"aria-label": ariaLabel,
		className: "flex min-w-max shrink-0 items-center justify-end gap-1",
		children
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.file-preview-toolbar",
		role: "toolbar",
		"aria-label": ariaLabel,
		className: "relative flex h-11 min-h-11 shrink-0 items-center overflow-x-auto px-3 after:pointer-events-none after:absolute after:right-3 after:bottom-0 after:left-3 after:border-border after:border-b after:content-['']",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-w-max shrink-0 items-center justify-center gap-1",
			children
		})
	});
	return context?.target ? (0, import_react_dom.createPortal)(toolbar, context.target) : toolbar;
}
export { FilePreviewToolbarPortalHost as n, FilePreviewToolbarPortalProvider as r, FilePreviewToolbar as t };
