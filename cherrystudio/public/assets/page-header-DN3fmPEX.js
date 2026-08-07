import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function PageHeader({ title, titleClassName, action, bordered, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.page-header part:page-header",
		"data-slot": "page-header",
		className: cn("mt-2 mb-2 flex h-8 shrink-0 items-center justify-between gap-2 pr-3 pl-5", bordered && "border-border border-b", className),
		...mergeUiProps(props, "ui.page-header part:page-header"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: cn("min-w-0 flex-1 truncate font-medium text-foreground text-sm leading-4", titleClassName),
			children: title
		}), action]
	});
}
PageHeader.displayName = "PageHeader";
export { PageHeader as t };
