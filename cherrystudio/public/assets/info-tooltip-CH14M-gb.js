import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Info } from "./info-RPr70zgf.js";
import { t as IconTooltip } from "./icon-tooltip-BKAMjASo.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const InfoTooltip = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTooltip, {
		icon: Info,
		ariaLabel: "Information",
		defaultColor: "var(--muted-foreground)",
		...props
	});
};
export { InfoTooltip as t };
