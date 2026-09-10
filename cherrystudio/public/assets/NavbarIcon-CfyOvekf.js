import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var NavbarIcon = ({ active, className, tone = "default", type = "button", ...props }) => {
	const conversation = tone === "conversation";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type,
		variant: conversation && active ? "secondary" : "ghost",
		size: "icon-navbar",
		"data-active": active || void 0,
		className: cn(conversation ? "text-muted-foreground! duration-150 ease-in-out [-webkit-app-region:none] hover:bg-accent/60 hover:text-foreground! data-[active=true]:bg-secondary data-[state=open]:bg-secondary data-[active=true]:text-secondary-foreground! data-[state=open]:text-secondary-foreground! [&_.lucide:not(.lucide-custom)]:text-current!" : "text-muted-foreground! duration-200 ease-in-out [-webkit-app-region:none] hover:bg-muted hover:text-foreground", conversation && active && "bg-secondary text-secondary-foreground!", className),
		...props
	});
};
var NavbarIcon_default = NavbarIcon;
export { NavbarIcon_default as t };
