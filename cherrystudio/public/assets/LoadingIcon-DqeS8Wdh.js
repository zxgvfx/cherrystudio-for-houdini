import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as mergeUiProps } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function LoadingIcon(props) {
	const { size = "1em", ...svgProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"data-ui": "icons.loading-icon",
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		...mergeUiProps(svgProps, "icons.loading-icon"),
		className: `animation-rotate ${svgProps.className || ""}`.trim(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
		})
	});
}
var LoadingIcon_default = LoadingIcon;
export { LoadingIcon_default as t };
