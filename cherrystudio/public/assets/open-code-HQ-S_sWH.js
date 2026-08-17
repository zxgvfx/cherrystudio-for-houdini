import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { r as mergeUiProps } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var OpenCode = (props) => {
	const iconId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "ui.open-code",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		fill: "none",
		viewBox: "-8 -8 136 136",
		...mergeUiProps(props, "ui.open-code"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			clipPath: `url(#${iconId}-opencode__a)`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				fillRule: "evenodd",
				d: "M77.2 34.2H42.8V85.8H77.2V34.2ZM94.4 103H25.6V17H94.4V103Z",
				clipRule: "evenodd"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
			id: `${iconId}-opencode__a`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#fff",
				d: "M0 0H86V86H0z",
				transform: "translate(17 17)"
			})
		}) })]
	});
};
export { OpenCode as t };
