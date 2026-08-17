import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var IndicatorLight = ({ color, size = 8, shadow = true, style, animation = true }) => {
	const actualColor = color === "green" ? "#22c55e" : color;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.indicator-light",
		className: "rounded-full",
		style: {
			width: size,
			height: size,
			backgroundColor: actualColor,
			boxShadow: shadow ? `0 0 6px ${actualColor}` : "none",
			animation: animation ? "pulse 2s infinite" : "none",
			...style
		}
	});
};
var IndicatorLight_default = IndicatorLight;
export { IndicatorLight_default as t };
