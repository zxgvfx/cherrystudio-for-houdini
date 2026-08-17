import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Info } from "./info-Ce_zTX1O.js";
import { t as IconTooltip } from "./icon-tooltip-Bp-u4vFg.js";
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
