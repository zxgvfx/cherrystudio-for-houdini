import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var RunwayDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.runway-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.runway-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M77.8136 92.9598C69.928 93.6834 63.3748 84.4648 58.3225 79.8038C55.7668 98.1792 28 96.4599 28 77.8012V43.2127C28 40.4923 28.721 37.7157 30.1657 35.3852C32.8307 30.8866 37.9953 27.9418 43.2159 28.0009H77.8136C96.4743 28.0009 98.253 55.7602 79.8139 58.2562L88.5889 66.9727C98.1974 76.0229 90.9762 93.3468 77.8166 92.9569L77.8136 92.9598ZM73.5945 81.9689C79.0369 87.5751 87.6996 78.9147 82.0918 73.4739L66.9291 58.3152H58.4319V66.8102L71.5382 79.9131L73.5945 81.9689ZM37.2182 77.7479C37.1089 85.5222 49.3821 85.5222 49.2137 77.7479V43.1595C49.326 39.2724 45.2161 36.2181 41.4964 37.3849C41.328 37.441 41.1625 37.4942 41.0532 37.5503C38.7191 38.4394 37.1089 40.7699 37.1621 43.2688V77.7479H37.2182ZM77.8136 49.1556C85.5901 49.2649 85.5901 37.0511 77.8136 37.1634H57.2116C58.7657 40.4391 58.3787 45.6023 58.4319 49.1556H77.8136Z",
		clipRule: "evenodd"
	})
});
var RunwayLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.runway-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.runway-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M77.8136 92.9598C69.928 93.6834 63.3748 84.4648 58.3225 79.8038C55.7668 98.1792 28 96.4599 28 77.8012V43.2127C28 40.4923 28.721 37.7157 30.1657 35.3852C32.8307 30.8866 37.9953 27.9418 43.2159 28.0009H77.8136C96.4743 28.0009 98.253 55.7602 79.8139 58.2562L88.5889 66.9727C98.1974 76.0229 90.9762 93.3468 77.8166 92.9569L77.8136 92.9598ZM73.5945 81.9689C79.0369 87.5751 87.6996 78.9147 82.0918 73.4739L66.9291 58.3152H58.4319V66.8102L71.5382 79.9131L73.5945 81.9689ZM37.2182 77.7479C37.1089 85.5222 49.3821 85.5222 49.2137 77.7479V43.1595C49.326 39.2724 45.2161 36.2181 41.4964 37.3849C41.328 37.441 41.1625 37.4942 41.0532 37.5503C38.7191 38.4394 37.1089 40.7699 37.1621 43.2688V77.7479H37.2182ZM77.8136 49.1556C85.5901 49.2649 85.5901 37.0511 77.8136 37.1634H57.2116C58.7657 40.4391 58.3787 45.6023 58.4319 49.1556H77.8136Z",
		clipRule: "evenodd"
	})
});
function RunwayAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunwayLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunwayDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Runway = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunwayLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunwayDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunwayLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunwayDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const RunwayIcon = /* @__PURE__ */ Object.assign(Runway, {
	Avatar: RunwayAvatar,
	colorPrimary: "#000000"
});
export { RunwayIcon as t };
