import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var Ai21Dark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.ai21-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.ai21-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		d: "M56.9752 90C63.2902 90 69.0141 87.9723 73.3935 84.1698L73.8982 83.7471V89.5772H92V78.4229H86.6113V41.5771H92V30.4229H73.8982V36.0833L73.3935 35.6602C68.9277 32.0278 63.2867 30 56.9752 30C40.4701 30 27 43.435 27 60.0001C27 76.5651 40.4701 90 56.9752 90ZM56.9752 78.0831C47.0412 78.0831 38.9561 69.8856 38.9561 59.9134C38.9561 49.9409 47.0375 41.8301 56.9752 41.8301C61.6899 41.8301 66.2352 43.7747 69.6052 47.1544C72.9719 50.6206 74.8246 55.0988 74.8246 59.9134C74.8246 69.8856 66.8263 78.0831 56.9752 78.0831Z"
	})
});
var Ai21Light = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.ai21-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.ai21-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		d: "M56.9752 90C63.2902 90 69.0141 87.9723 73.3935 84.1698L73.8982 83.7471V89.5772H92V78.4229H86.6113V41.5771H92V30.4229H73.8982V36.0833L73.3935 35.6602C68.9277 32.0278 63.2867 30 56.9752 30C40.4701 30 27 43.435 27 60.0001C27 76.5651 40.4701 90 56.9752 90ZM56.9752 78.0831C47.0412 78.0831 38.9561 69.8856 38.9561 59.9134C38.9561 49.9409 47.0375 41.8301 56.9752 41.8301C61.6899 41.8301 66.2352 43.7747 69.6052 47.1544C72.9719 50.6206 74.8246 55.0988 74.8246 59.9134C74.8246 69.8856 66.8263 78.0831 56.9752 78.0831Z"
	})
});
function Ai21Avatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Light, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Dark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Ai21 = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Light, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Dark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Light, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ai21Dark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const Ai21Icon = /* @__PURE__ */ Object.assign(Ai21, {
	Avatar: Ai21Avatar,
	colorPrimary: "#000000"
});
export { Ai21Icon as t };
