import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-C5PG5f8T.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DatabricksLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"data-ui": "ui.databricks-light",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "none",
	viewBox: "0 0 120 120",
	...mergeUiProps(props, "ui.databricks-light"),
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		fill: "#FF3621",
		d: "M86.8382 53.7951L60.5283 68.9503L32.355 52.7581L31 53.5071V65.2624L60.5283 82.2038L86.8382 67.1064V73.3299L60.5283 88.4849L32.355 72.2926L31 73.0416V75.0586L60.5283 92L90 75.0586V63.3032L88.6449 62.554L60.5283 78.6888L34.1617 63.5913V57.3679L60.5283 72.4655L90 55.524V43.9415L88.5321 43.0771L60.5283 59.1542L35.5167 44.8634L60.5283 30.5151L81.0794 42.3281L82.8861 41.2908V39.8502L60.5283 27L31 43.9415V45.7855L60.5283 62.727L86.8382 47.5718V53.7951Z"
	})
});
function DatabricksAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabricksLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var Databricks = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabricksLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabricksLight, {
		...props,
		className
	});
};
const DatabricksIcon = /* @__PURE__ */ Object.assign(Databricks, {
	Avatar: DatabricksAvatar,
	colorPrimary: "#FF3621"
});
export { DatabricksIcon as t };
