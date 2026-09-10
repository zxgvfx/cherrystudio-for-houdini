import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ExaLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.exa-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.exa-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#1F40ED",
		fillRule: "evenodd",
		d: "M35 27H86V31.8506L64.2365 59.5L86 87.1492V92H35V27ZM60.8222 55.0259L78.5084 31.8506H43.1331L60.8222 55.0259ZM40.7389 37.6573V57.0761H55.5557L40.7389 37.6573ZM55.5557 61.9239H40.7389V81.3427L55.5557 61.9239ZM43.1331 87.1522L60.8222 63.977L78.5084 87.1522H43.1331Z",
		clipRule: "evenodd"
	})
});
function ExaAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExaLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var Exa = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExaLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExaLight, {
		...props,
		className
	});
};
const ExaIcon = /* @__PURE__ */ Object.assign(Exa, {
	Avatar: ExaAvatar,
	colorPrimary: "#1F40ED"
});
export { ExaIcon as t };
