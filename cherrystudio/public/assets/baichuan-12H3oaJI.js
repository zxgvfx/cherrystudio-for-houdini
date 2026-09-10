import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var BaichuanLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.baichuan-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 120 120",
		...mergeUiProps(props, "ui.baichuan-light"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: `url(#${iconId}-baichuanlight__a)`,
			d: "M48.6657 30H39.2111L33.302 42.7824V76.61L27 89H42.3636L48.3554 76.61L48.6657 30ZM70.3343 30H54.9707V89H70.3343V30ZM76.6364 46.9124H92V89H76.6364V46.9124ZM92 30H76.6364V42.1923H92V30Z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
			id: `${iconId}-baichuanlight__a`,
			x1: 38.547,
			x2: 86.816,
			y1: 35.12,
			y2: 88.562,
			gradientUnits: "userSpaceOnUse",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#FEC13E" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
				offset: 1,
				stopColor: "#FF6933"
			})]
		}) })]
	});
};
function BaichuanAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaichuanLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var Baichuan = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaichuanLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaichuanLight, {
		...props,
		className
	});
};
const BaichuanIcon = /* @__PURE__ */ Object.assign(Baichuan, {
	Avatar: BaichuanAvatar,
	colorPrimary: "#000000"
});
export { BaichuanIcon as t };
