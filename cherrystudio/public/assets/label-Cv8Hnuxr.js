import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Primitive } from "./dist-Jcn_RT_f.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var NAME = "Label";
var Label$1 = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.label, {
		...props,
		ref: forwardedRef,
		onMouseDown: (event) => {
			if (event.target.closest("button, input, select, textarea")) return;
			props.onMouseDown?.(event);
			if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
		}
	});
});
Label$1.displayName = NAME;
var Root = Label$1;
function RequiredMark({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "ui.required-mark",
		"aria-hidden": "true",
		className: cn("text-destructive", className),
		...mergeUiProps(props, "ui.required-mark"),
		children: "*"
	});
}
function Label({ className, required, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		"data-ui": "part:label",
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...mergeUiProps(props, "part:label"),
		children: [children, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequiredMark, {
			"aria-hidden": "true",
			className: "-ms-1"
		})]
	});
}
export { RequiredMark as n, Label as t };
