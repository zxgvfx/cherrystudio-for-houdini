import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ZAiDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.z-ai-dark",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.z-ai-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#fff",
		fillRule: "evenodd",
		d: "M60.7843 33L54.8857 40.9731H29.7685L35.6646 33H60.7871H60.7843ZM90.9797 79.0296L85.0863 87H60.0558L65.9437 79.0296H90.9797ZM93 33L53.09 87H28L67.91 33H93Z",
		clipRule: "evenodd"
	})
});
var ZAiLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.z-ai-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.z-ai-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#000",
		fillRule: "evenodd",
		d: "M60.7843 33L54.8857 40.9731H29.7685L35.6646 33H60.7871H60.7843ZM90.9797 79.0296L85.0863 87H60.0558L65.9437 79.0296H90.9797ZM93 33L53.09 87H28L67.91 33H93Z",
		clipRule: "evenodd"
	})
});
function ZAiAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAiLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAiDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var ZAi = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAiLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAiDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAiLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAiDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const ZAiIcon = /* @__PURE__ */ Object.assign(ZAi, {
	Avatar: ZAiAvatar,
	colorPrimary: "#000000"
});
export { ZAiIcon as t };
