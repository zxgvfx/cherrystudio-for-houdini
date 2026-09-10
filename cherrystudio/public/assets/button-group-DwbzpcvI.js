import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as cva } from "./dist-D9lByzdX.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var buttonGroupVariants = cva("flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 *:focus-visible:relative *:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 [&>[data-slot=button-group-item]>[data-slot=button][data-variant=default]]:relative [&>[data-slot=button-group-item]>[data-slot=button][data-variant=default]]:z-1 [&>[data-slot=button-group-item]>[data-slot=button][data-variant=default]]:bg-primary/10 [&>[data-slot=button-group-item]>[data-slot=button][data-variant=default]]:text-primary [&>[data-slot=button-group-item]>[data-slot=button][data-variant=default]]:shadow-[inset_0_0_0_1px_var(--primary)]/20 [&>[data-slot=button-group-item]>[data-slot=button][data-variant=default]]:hover:bg-primary/15 [&>[data-slot=button][data-variant=default]]:relative [&>[data-slot=button][data-variant=default]]:z-1 [&>[data-slot=button][data-variant=default]]:bg-primary/10 [&>[data-slot=button][data-variant=default]]:text-primary [&>[data-slot=button][data-variant=default]]:shadow-[inset_0_0_0_1px_var(--primary)]/20 [&>[data-slot=button][data-variant=default]]:hover:bg-primary/15", {
	variants: {
		orientation: {
			horizontal: "",
			vertical: "flex-col"
		},
		attached: {
			true: "",
			false: "gap-2"
		}
	},
	compoundVariants: [{
		orientation: "horizontal",
		attached: true,
		className: "[&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>[data-slot=button-group-item]:not(:first-child)>:is([data-slot=button],[data-slot=input],[data-slot=select-trigger])]:rounded-l-none [&>[data-slot=button-group-item]:not(:first-child)>:is([data-slot=button],[data-slot=input],[data-slot=select-trigger])]:border-l-0 [&>[data-slot=button-group-item]:not(:last-child)>:is([data-slot=button],[data-slot=input],[data-slot=select-trigger])]:rounded-r-none"
	}, {
		orientation: "vertical",
		attached: true,
		className: "flex-col [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot=button-group-item]:not(:first-child)>:is([data-slot=button],[data-slot=input],[data-slot=select-trigger])]:rounded-t-none [&>[data-slot=button-group-item]:not(:first-child)>:is([data-slot=button],[data-slot=input],[data-slot=select-trigger])]:border-t-0 [&>[data-slot=button-group-item]:not(:last-child)>:is([data-slot=button],[data-slot=input],[data-slot=select-trigger])]:rounded-b-none"
	}],
	defaultVariants: {
		orientation: "horizontal",
		attached: true
	}
});
function ButtonGroup({ className, orientation, attached, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.button-group part:button-group",
		role: "group",
		"data-slot": "button-group",
		"data-orientation": orientation,
		"data-attached": attached,
		className: cn(buttonGroupVariants({
			orientation,
			attached
		}), className),
		...mergeUiProps(props, "ui.button-group part:button-group")
	});
}
function ButtonGroupItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.button-group-item part:button-group-item",
		"data-slot": "button-group-item",
		className: cn("relative flex min-w-0", className),
		...mergeUiProps(props, "ui.button-group-item part:button-group-item")
	});
}
export { ButtonGroupItem as n, ButtonGroup as t };
