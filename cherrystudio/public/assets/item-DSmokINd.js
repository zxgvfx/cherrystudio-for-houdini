import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Slot } from "./dist-CIFumK1O.js";
import { t as cva } from "./dist-CilunzGD.js";
import { t as Separator } from "./separator-PvLtEom0.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ItemGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.item-group part:item-group",
		role: "list",
		"data-slot": "item-group",
		className: cn("group/item-group flex flex-col", className),
		...mergeUiProps(props, "ui.item-group part:item-group")
	});
}
function ItemSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		"data-ui": "part:item-separator",
		"data-slot": "item-separator",
		orientation: "horizontal",
		className: cn("my-0", className),
		...mergeUiProps(props, "part:item-separator")
	});
}
var itemVariants = cva("group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-primary [a]:transition-colors [a]:hover:bg-accent/50 [a]:focus-visible:bg-accent/50", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border-border",
			muted: "bg-muted/50"
		},
		size: {
			default: "gap-4 p-4",
			sm: "gap-2.5 px-4 py-3"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Item({ className, variant = "default", size = "default", asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "div", {
		"data-ui": "part:item",
		"data-slot": "item",
		"data-variant": variant,
		"data-size": size,
		className: cn(itemVariants({
			variant,
			size,
			className
		})),
		...mergeUiProps(props, "part:item")
	});
}
var itemMediaVariants = cva("flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none", {
	variants: { variant: {
		default: "bg-transparent",
		icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
		image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover"
	} },
	defaultVariants: { variant: "default" }
});
function ItemMedia({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.item-media part:item-media",
		"data-slot": "item-media",
		"data-variant": variant,
		className: cn(itemMediaVariants({
			variant,
			className
		})),
		...mergeUiProps(props, "ui.item-media part:item-media")
	});
}
function ItemContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.item-content part:item-content",
		"data-slot": "item-content",
		className: cn("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", className),
		...mergeUiProps(props, "ui.item-content part:item-content")
	});
}
function ItemTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.item-title part:item-title",
		"data-slot": "item-title",
		className: cn("flex w-fit items-center gap-2 text-sm leading-snug font-medium", className),
		...mergeUiProps(props, "ui.item-title part:item-title")
	});
}
function ItemDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-ui": "ui.item-description part:item-description",
		"data-slot": "item-description",
		className: cn("line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground", "[&>a]:text-link [&>a]:underline [&>a]:underline-offset-4", className),
		...mergeUiProps(props, "ui.item-description part:item-description")
	});
}
function ItemActions({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.item-actions part:item-actions",
		"data-slot": "item-actions",
		className: cn("flex items-center gap-2", className),
		...mergeUiProps(props, "ui.item-actions part:item-actions")
	});
}
export { ItemGroup as a, ItemTitle as c, ItemDescription as i, ItemActions as n, ItemMedia as o, ItemContent as r, ItemSeparator as s, Item as t };
