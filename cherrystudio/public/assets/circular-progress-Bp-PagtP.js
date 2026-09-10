import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
var CircularProgress = ({ value, renderLabel, className, progressClassName, labelClassName, showLabel = false, shape = "round", size = 100, strokeWidth, circleStrokeWidth = 10, progressStrokeWidth = 10 }) => {
	const normalizedValue = clamp(value, 0, 100);
	const resolvedCircleWidth = strokeWidth ?? circleStrokeWidth;
	const resolvedProgressWidth = strokeWidth ?? progressStrokeWidth;
	const maxStrokeWidth = Math.max(resolvedCircleWidth, resolvedProgressWidth);
	const radius = size / 2 - maxStrokeWidth / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - normalizedValue / 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.circular-progress",
		className: "relative inline-flex items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			viewBox: `0 0 ${size} ${size}`,
			version: "1.1",
			xmlns: "http://www.w3.org/2000/svg",
			style: {
				transform: "rotate(-90deg)",
				transformOrigin: "50% 50%"
			},
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: radius,
				cx: size / 2,
				cy: size / 2,
				fill: "transparent",
				strokeWidth: resolvedCircleWidth,
				strokeDasharray: circumference,
				strokeDashoffset: "0",
				className: cn("stroke-primary/25", className)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: radius,
				cx: size / 2,
				cy: size / 2,
				strokeWidth: resolvedProgressWidth,
				strokeLinecap: shape,
				strokeDashoffset: offset,
				fill: "transparent",
				strokeDasharray: circumference,
				className: cn("stroke-primary", progressClassName)
			})]
		}), showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("absolute inset-0 flex items-center justify-center text-sm", labelClassName),
			children: renderLabel ? renderLabel(normalizedValue) : normalizedValue
		})]
	});
};
var circular_progress_default = CircularProgress;
export { circular_progress_default as t };
