import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var KwaipilotLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.kwaipilot-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 120 120",
		...mergeUiProps(props, "ui.kwaipilot-light"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: `url(#${iconId}-kwaipilotlight__a)`,
				d: "M59.5003 27.0054C41.5524 27.0054 27 41.5575 27 59.5052C27 69.3037 31.3388 78.0888 38.1945 84.0498L54.2723 51.081H72.2579L52.6554 91.2775C54.8652 91.7518 57.1503 92 59.5003 92C77.4483 92 92.0006 77.4474 92.0006 59.4998C92.0006 41.5521 77.4483 27 59.5003 27V27.0054Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: `url(#${iconId}-kwaipilotlight__b)`,
				d: "M38.1945 84.0444L55.9323 47.6748C55.9808 47.5724 56.0294 47.4701 56.0832 47.3676L56.3258 46.8664H56.3365C59.4787 40.9755 65.6825 36.9655 72.8238 36.9655C80.5853 36.9655 87.2417 41.7031 90.0659 48.4402C85.5438 35.9361 73.5623 27 59.5003 27C41.5524 27 27 41.5521 27 59.4998C27 69.2983 31.3388 78.0835 38.1945 84.0444Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `${iconId}-kwaipilotlight__a`,
				x1: 64.249,
				x2: 61.71,
				y1: 40.367,
				y2: 86.314,
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: .313,
					stopColor: "#9EC0E0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: 1,
					stopColor: "#fff"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `${iconId}-kwaipilotlight__b`,
				x1: 65.003,
				x2: 42.444,
				y1: 38.712,
				y2: 75.396,
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#fff" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: 1,
					stopColor: "#BCD5EC"
				})]
			})] })
		]
	});
};
function KwaipilotAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KwaipilotLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var Kwaipilot = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KwaipilotLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KwaipilotLight, {
		...props,
		className
	});
};
const KwaipilotIcon = /* @__PURE__ */ Object.assign(Kwaipilot, {
	Avatar: KwaipilotAvatar,
	colorPrimary: "#000000"
});
export { KwaipilotIcon as t };
