import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
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
