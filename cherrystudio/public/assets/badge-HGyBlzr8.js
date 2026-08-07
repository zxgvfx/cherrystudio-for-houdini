import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Slot } from "./dist-C0L0ClnX.js";
import { t as cva } from "./dist-5QAtVvkT.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var badgeVariants = cva("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
	variants: { variant: {
		default: "border-transparent bg-background-subtle text-secondary-foreground [a&]:hover:bg-primary/90",
		secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
		destructive: "border-transparent text-destructive bg-[red]/10 [a&]:hover:bg-destructive/90 focus-visible:border-destructive dark:bg-destructive/60",
		outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "span", {
		"data-ui": "part:badge",
		"data-slot": "badge",
		className: cn(badgeVariants({ variant }), className),
		...mergeUiProps(props, "part:badge")
	});
}
export { Badge as t };
