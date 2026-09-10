import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { n as cn } from "./style-BQVh98fR.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function FilePreviewToolbarButton({ children, disabled, label, onClick, pressed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: label,
		delay: 300,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "icon-sm",
			"aria-label": label,
			"aria-pressed": pressed,
			disabled,
			onClick,
			className: cn("text-muted-foreground hover:text-foreground", pressed && "bg-ghost-active text-foreground"),
			children
		})
	});
}
export { FilePreviewToolbarButton as t };
