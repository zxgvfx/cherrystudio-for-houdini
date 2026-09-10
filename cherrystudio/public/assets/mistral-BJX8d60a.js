import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MistralLight = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.mistral-light",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "0 0 120 120",
		...mergeUiProps(props, "ui.mistral-light"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
			id: `${iconId}-mistrallight__a`,
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			mask: `url(#${iconId}-mistrallight__a)`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#FA500F",
					d: "M82.7104 65.1193H73.4236V74.3788H82.7104V65.1193Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#E10500",
					d: "M92.0008 74.3755H64.1438V83.6354H92.0008V74.3755Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#FA500F",
					d: "M64.1431 65.1193H54.8562V74.3788H64.1431V65.1193ZM45.5683 65.1193H36.2815V74.3788H45.5683V65.1193Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#E10500",
					d: "M54.8544 74.3755H27V83.6354H54.8544V74.3755Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#FFAF00",
					d: "M82.7143 46.6038H64.1438V55.8632H82.7143V46.6038ZM54.8521 46.6038H36.2815V55.8632H54.8521V46.6038Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#FF8205",
					d: "M82.7065 55.8591H36.2815V65.1186H82.7065V55.8591Z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "#FFD800",
					d: "M82.7104 37.3437H73.4236V46.6032H82.7104V37.3437ZM45.5683 37.3437H36.2815V46.6032H45.5683V37.3437Z"
				})
			]
		})]
	});
};
function MistralAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MistralLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var Mistral = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MistralLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MistralLight, {
		...props,
		className
	});
};
const MistralIcon = /* @__PURE__ */ Object.assign(Mistral, {
	Avatar: MistralAvatar,
	colorPrimary: "#FA500F"
});
export { MistralIcon as t };
