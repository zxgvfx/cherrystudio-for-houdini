import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var StepLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.step-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 120 120",
		...mergeUiProps(props, "ui.step-light"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
				id: `${iconId}-steplight__a`,
				width: 65,
				height: 65,
				x: 27,
				y: 28,
				maskUnits: "userSpaceOnUse",
				style: { maskType: "luminance" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#fff",
					d: "M92 28H27V93H92V28Z"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				mask: `url(#${iconId}-steplight__a)`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
					id: `${iconId}-steplight__b`,
					width: 65,
					height: 65,
					x: 27,
					y: 28,
					maskUnits: "userSpaceOnUse",
					style: { maskType: "luminance" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						fill: "#fff",
						d: "M92 28H27V93H92V28Z"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					mask: `url(#${iconId}-steplight__b)`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						fill: `url(#${iconId}-steplight__c)`,
						fillRule: "evenodd",
						d: "M86.6158 28H89.4108V30.5107H92V33.1323H89.4108V38.2375H86.6158V33.135H81.5296V30.5079H86.6158V28ZM34.0417 61.5048V33.0646H36.666V61.5075H34.039L34.0417 61.5048ZM62.2706 63.2923H91.9267V65.7785H75.1135V91.7219H62.2706V63.2896V63.2923ZM42.2452 37.0269V70.491H27V82.7057H55.1287V49.6667H83.4931L83.485 37.0242L42.2452 37.0269Z",
						clipRule: "evenodd"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `${iconId}-steplight__c`,
				x1: 31.458,
				x2: 76.676,
				y1: 33.189,
				y2: 87.83,
				gradientUnits: "userSpaceOnUse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#01A9FF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: 1,
					stopColor: "#0160FF"
				})]
			}) })
		]
	});
};
function StepAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var Step = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepLight, {
		...props,
		className
	});
};
const StepIcon = /* @__PURE__ */ Object.assign(Step, {
	Avatar: StepAvatar,
	colorPrimary: "#000000"
});
export { StepIcon as t };
