import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MinTop3Light = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.min-top3-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.min-top3-light"),
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#FFF0A0",
		d: "M0 0H120V120H0z"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillOpacity: .9,
		stroke: "#222",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 5.513,
		d: "M63.5 27L31 66H60.2501L57 92L89.5001 53H60.2501L63.5 27Z"
	})]
});
function MinTop3Avatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinTop3Light, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var MinTop3 = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinTop3Light, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinTop3Light, {
		...props,
		className
	});
};
const MinTop3Icon = /* @__PURE__ */ Object.assign(MinTop3, {
	Avatar: MinTop3Avatar,
	colorPrimary: "#FFF0A0"
});
export { MinTop3Icon as t };
