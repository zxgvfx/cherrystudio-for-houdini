import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Search } from "./search-B8hviRfM.js";
import { n as motion } from "./react-DvbaRg8q.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var spinnerVariants = {
	defaultColor: { color: "#2a2a2a" },
	dimmed: { color: "#8C9296" }
};
function Spinner({ text, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		"data-ui": "ui.spinner",
		className: `flex items-center gap-1 p-0 ${className}`,
		variants: spinnerVariants,
		initial: "defaultColor",
		animate: ["defaultColor", "dimmed"],
		transition: {
			duration: .8,
			repeat: Infinity,
			repeatType: "reverse",
			ease: "easeInOut"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
			size: 16,
			style: { color: "unset" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })]
	});
}
export { Spinner as t };
