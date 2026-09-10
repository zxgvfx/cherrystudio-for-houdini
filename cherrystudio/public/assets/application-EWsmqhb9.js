import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ApplicationLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "ui.application-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.application-light"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#2BA471",
			d: "M48.8929 27H34.9643C31.118 27 28 30.118 28 33.9643V47.8929C28 51.7391 31.118 54.8571 34.9643 54.8571H48.8929C52.7391 54.8571 55.8571 51.7391 55.8571 47.8929V33.9643C55.8571 30.118 52.7391 27 48.8929 27Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#1B8A5A",
			d: "M86.0357 27H72.1072C68.2609 27 65.1429 30.118 65.1429 33.9643V47.8929C65.1429 51.7391 68.2609 54.8571 72.1072 54.8571H86.0357C89.882 54.8571 93 51.7391 93 47.8929V33.9643C93 30.118 89.882 27 86.0357 27Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#2BA471",
			d: "M48.8929 64.1429H34.9643C31.118 64.1429 28 67.2609 28 71.1072V85.0357C28 88.882 31.118 92 34.9643 92H48.8929C52.7391 92 55.8571 88.882 55.8571 85.0357V71.1072C55.8571 67.2609 52.7391 64.1429 48.8929 64.1429Z"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#0E5C3A",
			d: "M79.0715 92C86.764 92 93 85.764 93 78.0715C93 70.3789 86.764 64.1429 79.0715 64.1429C71.3789 64.1429 65.1429 70.3789 65.1429 78.0715C65.1429 85.764 71.3789 92 79.0715 92Z"
		})
	]
});
function ApplicationAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var Application = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationLight, {
		...props,
		className
	});
};
const ApplicationIcon = /* @__PURE__ */ Object.assign(Application, {
	Avatar: ApplicationAvatar,
	colorPrimary: "#2BA471"
});
export { ApplicationIcon as t };
