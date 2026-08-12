import { s as __toESM } from "./chunk-DiqNceaa.js";
import { a as mergeUiProps } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { n as cn } from "./style-qqUWb85F.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const Navbar = () => null;
const NavbarCenter = ({ children, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavbarCenterContainer, {
		...props,
		children
	});
};
const NavbarRight = ({ children, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavbarRightContainer, {
		...props,
		children
	});
};
const NavbarHeader = ({ children, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavbarHeaderContent, {
		...props,
		children
	});
};
var NavbarCenterContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.navbar-center",
	className: cn("relative flex flex-1 items-center pl-2.5 font-bold text-foreground", className),
	...mergeUiProps(props, "ui.navbar-center")
});
var NavbarRightContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.navbar-right",
	className: cn("flex min-w-(--topic-list-width) flex-1 items-center justify-end px-3", className),
	...mergeUiProps(props, "ui.navbar-right")
});
var NavbarHeaderContent = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.navbar-header-content",
	className: cn("flex max-h-(--navbar-height) min-h-(--navbar-height) flex-1 flex-row items-center justify-between px-3", className),
	...mergeUiProps(props, "ui.navbar-header-content")
});
export { NavbarRight as i, NavbarCenter as n, NavbarHeader as r, Navbar as t };
