import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var OpenrouterDark = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.openrouter-dark",
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "-80.28 -134.13 561.96 561.96",
	width: "1em",
	height: "1em",
	...mergeUiProps(props, "ui.openrouter-dark"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M303.9475,17.19926c42.79734,0,77.48933,34.69327,77.48933,77.48933s-34.69199,77.48933-77.48933,77.48933l76.86166,76.86244c9.76367,9.76313,2.84903,26.45667-10.95697,26.45667h-220.88335c-71.32686,0-129.14889-57.82202-129.14889-129.14889S77.64197,17.19926,148.96884,17.19926h154.97866ZM148.96884,68.85881c-42.79607,0-77.48933,34.69327-77.48933,77.48933s34.69327,77.48933,77.48933,77.48933,77.48933-34.69327,77.48933-77.48933-34.69327-77.48933-77.48933-77.48933Z",
		style: { fill: "#c8ff00" }
	})
});
var OpenrouterLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.openrouter-light",
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "-80.28 -134.13 561.96 561.96",
	width: "1em",
	height: "1em",
	...mergeUiProps(props, "ui.openrouter-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M303.9475,17.19926c42.79734,0,77.48933,34.69327,77.48933,77.48933s-34.69199,77.48933-77.48933,77.48933l76.86166,76.86244c9.76367,9.76313,2.84903,26.45667-10.95697,26.45667h-220.88335c-71.32686,0-129.14889-57.82202-129.14889-129.14889S77.64197,17.19926,148.96884,17.19926h154.97866ZM148.96884,68.85881c-42.79607,0-77.48933,34.69327-77.48933,77.48933s34.69327,77.48933,77.48933,77.48933,77.48933-34.69327,77.48933-77.48933-34.69327-77.48933-77.48933-77.48933Z",
		style: { fill: "#7624f4" }
	})
});
function OpenrouterAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenrouterLight, {
				className: "dark:hidden",
				style: {
					width: size,
					height: size
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenrouterDark, {
				className: "hidden dark:block",
				style: {
					width: size,
					height: size
				}
			})]
		})
	});
}
var Openrouter = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenrouterLight, {
		...props,
		className
	});
	if (variant === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenrouterDark, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenrouterLight, {
		className: cn("dark:hidden", className),
		...props
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenrouterDark, {
		className: cn("hidden dark:block", className),
		...props
	})] });
};
const OpenrouterIcon = /* @__PURE__ */ Object.assign(Openrouter, {
	Avatar: OpenrouterAvatar,
	colorPrimary: "#000000"
});
export { OpenrouterIcon as t };
