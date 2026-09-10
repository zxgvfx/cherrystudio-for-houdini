import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const Box = ({ children, className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.box",
		className: cn("box-border", className),
		...mergeUiProps(props, "ui.box"),
		children
	});
};
const Flex = ({ children, className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
		className: cn("flex", className),
		...props,
		children
	});
};
const RowFlex = ({ children, className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
		className: cn("flex-row", className),
		...props,
		children
	});
};
const SpaceBetweenRowFlex = ({ children, className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowFlex, {
		className: cn("justify-between", className),
		...props,
		children
	});
};
const ColFlex = ({ children, className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
		className: cn("flex-col", className),
		...props,
		children
	});
};
const Center = ({ children, className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flex, {
		className: cn("items-center justify-center", className),
		...props,
		children
	});
};
export { RowFlex as a, Flex as i, Center as n, SpaceBetweenRowFlex as o, ColFlex as r, Box as t };
