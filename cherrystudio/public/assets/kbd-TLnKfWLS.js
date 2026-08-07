import { s as __toESM } from "./chunk-DiqNceaa.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Kbd({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
		"data-ui": "ui.kbd part:kbd",
		"data-slot": "kbd",
		className: cn("bg-primary/10 text-primary pointer-events-none inline-flex w-fit min-w-5 items-center justify-center gap-1 rounded-md p-1 font-sans text-xs font-medium select-none", "[&_svg:not([class*='size-'])]:size-3", "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10", className),
		...mergeUiProps(props, "ui.kbd part:kbd")
	});
}
function KbdGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
		"data-ui": "ui.kbd-group part:kbd-group",
		"data-slot": "kbd-group",
		className: cn("inline-flex items-center gap-1", className),
		...mergeUiProps(props, "ui.kbd-group part:kbd-group")
	});
}
export { KbdGroup as n, Kbd as t };
