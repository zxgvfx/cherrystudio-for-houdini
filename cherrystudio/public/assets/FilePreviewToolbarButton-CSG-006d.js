import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { n as cn } from "./style-qqUWb85F.js";
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
