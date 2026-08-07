import { s as __toESM } from "./chunk-DiqNceaa.js";
import { a as mergeUiProps } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var textStyle = {
	fontStyle: "italic",
	fontSize: "7.70985px",
	lineHeight: .8,
	fontFamily: "'Times New Roman'",
	textAlign: "center",
	writingMode: "horizontal-tb",
	direction: "ltr",
	textAnchor: "middle",
	fill: "none",
	stroke: "#000000",
	strokeWidth: "0.289119",
	strokeLinejoin: "round",
	strokeDasharray: "none"
};
var tspanStyle = {
	fontStyle: "normal",
	fontVariant: "normal",
	fontWeight: "normal",
	fontStretch: "condensed",
	fontSize: "7.70985px",
	lineHeight: .8,
	fontFamily: "Arial",
	fill: "#000000",
	fillOpacity: 1,
	strokeWidth: "0.289119",
	strokeDasharray: "none"
};
var BaseFileIcon = ({ size = "1.1em", text = "SVG", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	"data-ui": "icons.base-file-icon.svg4",
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	version: "1.1",
	id: "svg4",
	xmlns: "http://www.w3.org/2000/svg",
	...mergeUiProps(props, "icons.base-file-icon.svg4"),
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { id: "defs4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "m 14,2 v 4 a 2,2 0 0 0 2,2 h 4",
			id: "path3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 15,2 H 6 A 2,2 0 0 0 4,4 v 16 a 2,2 0 0 0 2,2 h 12 a 2,2 0 0 0 2,-2 V 7 Z",
			id: "path4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			xmlSpace: "preserve",
			style: textStyle,
			x: "12.478625",
			y: "17.170216",
			id: "text4",
			transform: "scale(0.96196394,1.03954)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tspan", {
				id: "tspan4",
				x: "12.478625",
				y: "17.170216",
				style: tspanStyle,
				children: text
			})
		})
	]
});
const FileSvgIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseFileIcon, {
	text: "SVG",
	...props
});
const FilePngIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseFileIcon, {
	text: "PNG",
	...props
});
export { FileSvgIcon as n, FilePngIcon as t };
