import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as createLucideIcon } from "./createLucideIcon-e8mQLP44.js";
import { t as IconTooltip } from "./icon-tooltip-DsoxZJ2V.js";
var CircleQuestionMark = createLucideIcon("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const HelpTooltip = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTooltip, {
		icon: CircleQuestionMark,
		ariaLabel: "Help",
		defaultColor: "var(--muted-foreground)",
		...props
	});
};
export { HelpTooltip as t };
