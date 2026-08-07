import { s as __toESM } from "./chunk-DiqNceaa.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.skeleton part:skeleton",
		"data-slot": "skeleton",
		className: cn("animate-pulse rounded-md bg-accent", className),
		...mergeUiProps(props, "ui.skeleton part:skeleton")
	});
}
export { Skeleton as t };
