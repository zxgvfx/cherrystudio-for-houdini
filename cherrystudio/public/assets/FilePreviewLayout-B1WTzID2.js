import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as scrollbar_default } from "./scrollbar-u8WAeDey.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function FilePreviewFrame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "file-preview.view",
		className: "flex h-full min-h-0 w-full flex-col overflow-hidden bg-transparent text-foreground",
		children
	});
}
function FilePreviewContent({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
		"data-testid": "file-preview-content",
		className: "min-h-0 flex-1 [scrollbar-gutter:auto]",
		children
	});
}
const FilePreviewLayout = {
	Frame: FilePreviewFrame,
	Content: FilePreviewContent
};
export { FilePreviewLayout as t };
