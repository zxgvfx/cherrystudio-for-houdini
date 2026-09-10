import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as createLucideIcon } from "./createLucideIcon-Du0e9oPs.js";
import { n as CircleCheck, t as TriangleAlert } from "./triangle-alert-eafrks-C.js";
import { t as Info } from "./info-RPr70zgf.js";
import { t as cva } from "./dist-D9lByzdX.js";
var CircleX = createLucideIcon("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var alertVariants = cva(cn("relative flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-sm leading-5 shadow-xs", "[&_svg]:pointer-events-none [&_svg]:shrink-0"), {
	variants: { type: {
		info: "border-info-border bg-info-subtle text-info-subtle-foreground",
		success: "border-success-border bg-success-subtle text-success-subtle-foreground",
		warning: "border-warning-border bg-warning-subtle text-warning-subtle-foreground",
		error: "border-error-border bg-error-subtle text-error-subtle-foreground"
	} },
	defaultVariants: { type: "info" }
});
var alertIconVariants = cva("", {
	variants: { type: {
		info: "text-info",
		success: "text-success",
		warning: "text-warning",
		error: "text-error"
	} },
	defaultVariants: { type: "info" }
});
var alertIconContainerVariants = cva("mt-0.5 flex shrink-0 items-center", {
	variants: { type: {
		info: "text-info [&_.lucide:not(.lucide-custom)]:!text-info",
		success: "text-success [&_.lucide:not(.lucide-custom)]:!text-success",
		warning: "text-warning [&_.lucide:not(.lucide-custom)]:!text-warning",
		error: "text-error [&_.lucide:not(.lucide-custom)]:!text-error"
	} },
	defaultVariants: { type: "info" }
});
var alertIcons = {
	info: Info,
	success: CircleCheck,
	warning: TriangleAlert,
	error: CircleX
};
function Alert({ className, type = "info", message, description, action, icon, showIcon = false, children, role, ref, ...props }) {
	const Icon = alertIcons[type ?? "info"];
	const alertRole = role ?? (type === "error" ? "alert" : "status");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.alert part:alert",
		ref,
		role: alertRole,
		"data-slot": "alert",
		"data-type": type,
		className: cn(alertVariants({ type }), className),
		...mergeUiProps(props, "ui.alert part:alert"),
		children: [
			showIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "ui.alert.alert-icon part:alert-icon",
				"data-slot": "alert-icon",
				"data-type": type,
				className: alertIconContainerVariants({ type }),
				children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					size: 16,
					className: cn("lucide-custom", alertIconVariants({ type }))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "ui.alert.alert-content part:alert-content",
				"data-slot": "alert-content",
				className: "min-w-0 flex-1",
				children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "ui.alert.alert-message part:alert-message",
					"data-slot": "alert-message",
					className: "font-medium",
					children: message
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-ui": "ui.alert.alert-description part:alert-description",
					"data-slot": "alert-description",
					className: "mt-1 text-xs leading-5 opacity-90",
					children: description
				})] })
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "ui.alert.alert-action part:alert-action",
				"data-slot": "alert-action",
				className: "ml-2 flex shrink-0 items-center",
				children: action
			})
		]
	});
}
Alert.displayName = "Alert";
export { Alert as t };
