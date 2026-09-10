import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Slot } from "./dist-CHDMmyuS.js";
import { t as createLucideIcon } from "./createLucideIcon-Du0e9oPs.js";
import { t as cva } from "./dist-D9lByzdX.js";
var Loader = createLucideIcon("loader", [
	["path", {
		d: "M12 2v4",
		key: "3427ic"
	}],
	["path", {
		d: "m16.2 7.8 2.9-2.9",
		key: "r700ao"
	}],
	["path", {
		d: "M18 12h4",
		key: "wj9ykh"
	}],
	["path", {
		d: "m16.2 16.2 2.9 2.9",
		key: "1bxg5t"
	}],
	["path", {
		d: "M12 18v4",
		key: "jadmvz"
	}],
	["path", {
		d: "m4.9 19.1 2.9-2.9",
		key: "bwix9q"
	}],
	["path", {
		d: "M2 12h4",
		key: "j09sii"
	}],
	["path", {
		d: "m4.9 4.9 2.9 2.9",
		key: "giyufr"
	}]
]);
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var buttonVariants = cva(cn("inline-flex items-center justify-center gap-2 whitespace-nowrap", "rounded-md font-normal transition-all", "disabled:pointer-events-none disabled:opacity-40", "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 [&_.lucide:not(.lucide-custom)]:text-current outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", "data-[busy=true]:cursor-progress data-[busy=true]:opacity-40", "shadow-xs"), {
	variants: {
		variant: {
			default: "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:bg-neutral-200",
			destructive: "bg-destructive text-white hover:bg-destructive-hover focus-visible:bg-destructive-hover",
			outline: "border border-border bg-transparent text-foreground shadow-none hover:bg-accent focus-visible:border-primary focus-visible:bg-accent",
			secondary: "rounded-lg bg-secondary text-secondary-foreground shadow-none hover:bg-secondary-hover focus-visible:bg-secondary-hover",
			emphasis: "rounded-lg bg-neutral-900 text-white shadow-none hover:bg-neutral-800 focus-visible:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:bg-neutral-200",
			ghost: "text-neutral-900 shadow-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground dark:text-neutral-100",
			link: "text-neutral-900 underline-offset-4 hover:text-neutral-700 hover:underline focus-visible:text-neutral-700 focus-visible:underline dark:text-neutral-100 dark:hover:text-neutral-300 dark:focus-visible:text-neutral-300"
		},
		size: {
			default: "min-h-7.5 gap-1.5 px-2.5 text-[13px]",
			sm: "min-h-7 gap-1.5 px-2.5 text-xs",
			lg: "min-h-9 px-4 text-sm",
			icon: "size-9",
			"icon-sm": "size-7",
			"icon-lg": "size-10",
			"icon-navbar": "size-[30px] [&_svg]:!size-[18px]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, loading = false, loadingIcon, loadingIconClassName, disabled, children, ...props }) {
	const Comp = asChild ? Slot : "button";
	const getSpinnerSize = () => {
		if (size === "icon-sm") return 13;
		if (size === "sm") return 14;
		if (size === "icon-navbar") return 18;
		if (size === "lg" || size === "icon-lg") return 18;
		return 16;
	};
	const defaultLoadingIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {
		className: cn("animate-spin", loadingIconClassName),
		size: getSpinnerSize()
	});
	const spinnerElement = loadingIcon ?? defaultLoadingIcon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
		"data-ui": "part:button",
		"data-slot": "button",
		"data-variant": variant ?? "default",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		disabled: disabled || loading,
		"aria-busy": loading || void 0,
		"data-busy": loading || void 0,
		...mergeUiProps(props, "part:button"),
		children: asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [loading && spinnerElement, children] })
	});
}
export { buttonVariants as n, Button as t };
