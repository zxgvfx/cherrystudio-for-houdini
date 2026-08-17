import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var SunoDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.suno-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.suno-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		d: "M78.3175 29.4856C85.8 33.739 89.4633 41.138 91.718 49.244C92.6756 53.1356 92.581 56.398 92.581 60.5234C84.5028 60.5234 76.4135 60.5234 68.0847 60.5234C68.0847 62.9118 68.0847 65.3001 68.0847 67.7609C66.9601 76.4125 63.2467 84.5854 56.5158 90.2195C53.142 92.7471 49.9297 93.365 45.8154 92.8139C39.658 91.127 36.2229 87.6028 33.0106 82.2359C29.4531 75.3046 28 68.2731 28 60.5234C36.0893 60.5234 44.1731 60.5234 52.4962 60.5234C52.4962 57.9513 52.4962 55.3792 52.4962 52.7291C53.6876 44.3782 57.2563 36.6507 63.6309 31.0166C68.2573 27.704 73.1343 27.0081 78.3175 29.4856Z"
	})
});
var SunoLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.suno-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.suno-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#020202",
		d: "M78.3175 29.4856C85.8 33.739 89.4633 41.138 91.718 49.244C92.6756 53.1356 92.581 56.398 92.581 60.5234C84.5028 60.5234 76.4135 60.5234 68.0847 60.5234C68.0847 62.9118 68.0847 65.3001 68.0847 67.7609C66.9601 76.4125 63.2467 84.5854 56.5158 90.2195C53.142 92.7471 49.9297 93.365 45.8154 92.8139C39.658 91.127 36.2229 87.6028 33.0106 82.2359C29.4531 75.3046 28 68.2731 28 60.5234C36.0893 60.5234 44.1731 60.5234 52.4962 60.5234C52.4962 57.9513 52.4962 55.3792 52.4962 52.7291C53.6876 44.3782 57.2563 36.6507 63.6309 31.0166C68.2573 27.704 73.1343 27.0081 78.3175 29.4856Z"
	})
});
function SunoAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Suno = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunoDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const SunoIcon = /* @__PURE__ */ Object.assign(Suno, {
	Avatar: SunoAvatar,
	colorPrimary: "#020202"
});
export { SunoIcon as t };
