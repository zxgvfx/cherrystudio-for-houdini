import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var LiquidDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.liquid-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.liquid-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M61.038 50.1454L61.0165 50.159L69.1862 64.3777C70.3198 66.1181 70.9224 68.1533 70.9199 70.2331C70.9199 72.2752 70.3483 74.1873 69.356 75.8177L86 70.4254L59.965 27L53.6934 37.4867L61.038 50.1454ZM47.0418 92L60.1186 81.0232H60.0836C54.1006 81.0232 49.2527 76.1915 49.2527 70.2331C49.2527 68.0827 49.8864 66.0785 50.9783 64.394L58.7031 50.9173L52.2833 39.8483L34 70.4254L47.0229 92H47.0418ZM65.646 79.4929H65.6433L50.7761 92H72.8369L84.021 73.6673L65.646 79.4929Z",
		clipRule: "evenodd"
	})
});
var LiquidLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.liquid-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.liquid-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M61.038 50.1454L61.0165 50.159L69.1862 64.3777C70.3198 66.1181 70.9224 68.1533 70.9199 70.2331C70.9199 72.2752 70.3483 74.1873 69.356 75.8177L86 70.4254L59.965 27L53.6934 37.4867L61.038 50.1454ZM47.0418 92L60.1186 81.0232H60.0836C54.1006 81.0232 49.2527 76.1915 49.2527 70.2331C49.2527 68.0827 49.8864 66.0785 50.9783 64.394L58.7031 50.9173L52.2833 39.8483L34 70.4254L47.0229 92H47.0418ZM65.646 79.4929H65.6433L50.7761 92H72.8369L84.021 73.6673L65.646 79.4929Z",
		clipRule: "evenodd"
	})
});
function LiquidAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Liquid = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const LiquidIcon = /* @__PURE__ */ Object.assign(Liquid, {
	Avatar: LiquidAvatar,
	colorPrimary: "#000000"
});
export { LiquidIcon as t };
