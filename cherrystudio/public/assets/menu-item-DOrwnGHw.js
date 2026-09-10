import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Slot } from "./dist-CHDMmyuS.js";
import { t as cva } from "./dist-D9lByzdX.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var menuItemVariants = cva(cn("group relative flex w-full items-center gap-2.5 rounded-lg font-normal", "border border-transparent", "transition-all duration-150", "outline-none select-none", "focus-visible:bg-accent", "disabled:pointer-events-none disabled:opacity-40", "[&_svg]:pointer-events-none [&_svg]:shrink-0"), {
	variants: {
		variant: {
			default: cn("text-foreground", "hover:bg-accent", "data-[active=true]:bg-accent", "data-[active=true]:border-transparent"),
			ghost: cn("text-foreground", "hover:bg-accent", "data-[active=true]:bg-accent")
		},
		size: {
			default: "px-2.5 py-1.5 text-sm",
			sm: "px-2.5 py-1 text-xs"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function MenuItem({ className, variant, size, icon, label, labelClassName, description, descriptionLines, descriptionClassName, active, disabled, suffix, asChild, ref, ...props }) {
	const Comp = asChild ? Slot : "button";
	const descriptionStyle = descriptionLines && descriptionLines > 0 ? {
		display: "-webkit-box",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: descriptionLines
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Comp, {
		"data-ui": "part:menu-item",
		ref,
		type: asChild ? void 0 : "button",
		"data-active": active || void 0,
		"data-slot": "menu-item",
		disabled: disabled || void 0,
		className: cn(menuItemVariants({
			variant,
			size
		}), className),
		...mergeUiProps(props, "part:menu-item"),
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex shrink-0 items-center justify-center",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("min-w-0 text-left", suffix && "flex-1"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("block truncate", labelClassName),
					children: label
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 block text-[10px] text-muted-foreground", descriptionLines ? "overflow-hidden" : "", descriptionClassName),
					style: descriptionStyle,
					children: description
				})]
			}),
			suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-auto flex shrink-0 items-center",
				children: suffix
			})
		]
	});
}
MenuItem.displayName = "MenuItem";
function MenuList({ className, ref, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.menu-list part:menu-list",
		ref,
		"data-slot": "menu-list",
		className: cn("flex flex-col gap-1", className),
		...mergeUiProps(props, "ui.menu-list part:menu-list")
	});
}
MenuList.displayName = "MenuList";
function MenuDivider({ className, ref, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.menu-divider part:menu-divider",
		ref,
		"data-slot": "menu-divider",
		role: "separator",
		className: cn("my-1 h-px bg-border", className),
		...mergeUiProps(props, "ui.menu-divider part:menu-divider")
	});
}
MenuDivider.displayName = "MenuDivider";
export { MenuItem as n, MenuList as r, MenuDivider as t };
