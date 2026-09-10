import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ArceeAiLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.arcee-ai-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.arcee-ai-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#008C8C",
		d: "M64.8895 34.5394L31.7064 92H23L60.5443 27L64.8895 34.5394ZM76.1373 54.0651L45.7361 92H36.0707L72.0895 47.0459L76.1373 54.0619V54.0651ZM98 92H67.4657L94.0691 85.1774L98 92ZM87.1762 73.2164L62.3546 91.9936H49.844L83.3815 66.6287L87.1762 73.2164Z"
	})
});
function ArceeAiAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArceeAiLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var ArceeAi = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArceeAiLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArceeAiLight, {
		...props,
		className
	});
};
const ArceeAiIcon = /* @__PURE__ */ Object.assign(ArceeAi, {
	Avatar: ArceeAiAvatar,
	colorPrimary: "#008C8C"
});
export { ArceeAiIcon as t };
