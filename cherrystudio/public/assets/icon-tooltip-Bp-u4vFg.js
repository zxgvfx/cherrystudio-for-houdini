import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const IconTooltip = ({ icon: Icon, iconProps, ariaLabel = "Icon", defaultColor, ...tooltipProps }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		...tooltipProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: iconProps?.size ?? 14,
			color: iconProps?.color ?? defaultColor,
			role: "img",
			"aria-label": ariaLabel,
			...iconProps
		})
	});
};
export { IconTooltip as t };
