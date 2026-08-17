import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var BoltNewDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.bolt-new-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.bolt-new-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M64.1839 84.0252C59.4785 84.0252 54.8585 82.3455 52.2064 78.7341L51.271 82.993L34 92L35.8645 82.993L48.4421 27H63.8417L59.3929 46.7362C62.9862 42.8729 66.3227 41.4452 70.6004 41.4452C79.8399 41.4452 86 47.4081 86 58.3259C86 69.5799 78.8994 84.0252 64.1839 84.0252ZM70.0871 61.5174C70.0871 66.7244 66.3227 70.6716 61.4462 70.6716C58.7084 70.6716 56.2274 69.6638 54.6019 67.9002L56.9974 57.5701C58.7941 55.8065 60.8473 54.7986 63.2428 54.7986C66.9216 54.7986 70.0871 57.4862 70.0871 61.5174Z",
		clipRule: "evenodd"
	})
});
var BoltNewLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.bolt-new-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.bolt-new-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M64.1839 84.0252C59.4785 84.0252 54.8585 82.3455 52.2064 78.7341L51.271 82.993L34 92L35.8645 82.993L48.4421 27H63.8417L59.3929 46.7362C62.9862 42.8729 66.3227 41.4452 70.6004 41.4452C79.8399 41.4452 86 47.4081 86 58.3259C86 69.5799 78.8994 84.0252 64.1839 84.0252ZM70.0871 61.5174C70.0871 66.7244 66.3227 70.6716 61.4462 70.6716C58.7084 70.6716 56.2274 69.6638 54.6019 67.9002L56.9974 57.5701C58.7941 55.8065 60.8473 54.7986 63.2428 54.7986C66.9216 54.7986 70.0871 57.4862 70.0871 61.5174Z",
		clipRule: "evenodd"
	})
});
function BoltNewAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoltNewLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoltNewDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var BoltNew = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoltNewLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoltNewDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoltNewLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoltNewDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const BoltNewIcon = /* @__PURE__ */ Object.assign(BoltNew, {
	Avatar: BoltNewAvatar,
	colorPrimary: "#000000"
});
export { BoltNewIcon as t };
