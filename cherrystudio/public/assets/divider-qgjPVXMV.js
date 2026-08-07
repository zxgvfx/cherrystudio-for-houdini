import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var Divider = ({ className, orientation = "horizontal", ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.divider.separator",
		role: "separator",
		"aria-orientation": orientation,
		className: cn("shrink-0 border-0", orientation === "horizontal" ? "h-px w-full my-2.5 border-t-[0.5px] border-solid border-(--color-border)" : "w-px h-full mx-2.5 border-l-[0.5px] border-solid border-(--color-border)", className),
		...mergeUiProps(props, "ui.divider.separator")
	});
};
export { Divider as t };
