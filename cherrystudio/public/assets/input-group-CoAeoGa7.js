import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { t as cva } from "./dist-CilunzGD.js";
import { t as Input } from "./input-BdTU3c_O.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var inputGroupVariants = cva([
	"group/input-group border-input bg-background relative flex w-full items-center rounded-md border transition-[color,box-shadow] outline-none",
	"min-w-0 has-[>textarea]:h-auto",
	"has-[>[data-align=inline-start]]:[&>input]:pl-2",
	"has-[>[data-align=inline-end]]:[&>input]:pr-2",
	"has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
	"has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
	"has-[[data-slot=input-group-control]:focus-visible]:border-primary",
	"has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40"
], {
	variants: { size: {
		default: "h-9",
		sm: "h-7 text-sm"
	} },
	defaultVariants: { size: "default" }
});
function InputGroup({ className, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.input-group part:input-group",
		"data-slot": "input-group",
		role: "group",
		className: cn(inputGroupVariants({ size }), className),
		...mergeUiProps(props, "ui.input-group part:input-group")
	});
}
var inputGroupAddonVariants = cva("text-muted-foreground flex h-auto items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 group-data-[disabled=true]/input-group:opacity-50", {
	variants: { align: {
		"inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
		"inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
		"block-start": "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
		"block-end": "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.input-group-addon part:input-group-addon",
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...mergeUiProps(props, "ui.input-group-addon part:input-group-addon")
	});
}
var inputGroupButtonVariants = cva("text-sm shadow-none flex gap-2 items-center", {
	variants: { size: {
		xs: "h-6 gap-1 px-2 [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
		sm: "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
		"icon-xs": "size-6 min-h-0 p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 min-h-0 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupText({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "ui.input-group-text",
		className: cn("text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4", className),
		...mergeUiProps(props, "ui.input-group-text")
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		"data-ui": "part:input-group-control",
		"data-slot": "input-group-control",
		className: cn("flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent", className),
		...mergeUiProps(props, "part:input-group-control")
	});
}
export { InputGroupText as a, InputGroupInput as i, InputGroupAddon as n, InputGroupButton as r, InputGroup as t };
