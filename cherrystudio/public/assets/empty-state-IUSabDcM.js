import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EMPTY_ILLUSTRATION_RATIO = 41 / 64;
function EmptyIllustration({ variant = "inbox", width, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"data-ui": "ui.empty-illustration",
		width,
		height: Math.round(width * EMPTY_ILLUSTRATION_RATIO),
		viewBox: "0 0 64 41",
		className,
		"aria-hidden": "true",
		children: variant === "book" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: "translate(0 1)",
			fill: "none",
			fillRule: "evenodd",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					fill: "currentColor",
					fillOpacity: .08,
					cx: "32",
					cy: "33",
					rx: "28",
					ry: "6.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					stroke: "currentColor",
					strokeOpacity: .4,
					strokeLinejoin: "round",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "currentColor",
							fillOpacity: .05,
							d: "M32 10.5 11 6.5v18.2L32 30.5Z"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "currentColor",
							fillOpacity: .05,
							d: "M32 10.5 53 6.5v18.2L32 30.5Z"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M32 10.5v20" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					fillOpacity: .35,
					d: "m55.5 0 1.3 2.8 2.8 1.3-2.8 1.3-1.3 2.8-1.3-2.8-2.8-1.3 2.8-1.3Z"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: "translate(0 1)",
			fill: "none",
			fillRule: "evenodd",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				fill: "currentColor",
				fillOpacity: .08,
				cx: "32",
				cy: "33",
				rx: "32",
				ry: "7"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fillRule: "nonzero",
				stroke: "currentColor",
				strokeOpacity: .4,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M55 12.76 44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					fillOpacity: .05,
					d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
				})]
			})]
		})
	});
}
function EmptyState({ illustration = "inbox", icon: IconOverride, title, description, actionLabel, onAction, secondaryLabel, onSecondary, compact = false, className }) {
	const Icon = IconOverride;
	const buttonSize = compact ? "sm" : "default";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.empty-state",
		className: cn("flex flex-col items-center justify-center text-center", compact ? "px-4 py-8" : "flex-1 px-6 py-12", className),
		children: [
			Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				size: compact ? 28 : 40,
				strokeWidth: 1.5,
				className: cn("text-muted-foreground", compact ? "mb-3" : "mb-4")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyIllustration, {
				variant: illustration,
				width: compact ? 48 : 64,
				className: cn("text-muted-foreground", compact ? "mb-3" : "mb-4")
			}),
			title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: cn("font-normal text-muted-foreground", compact ? "text-xs" : "text-sm", description ? "mb-1.5" : actionLabel || secondaryLabel ? compact ? "mb-3" : "mb-5" : ""),
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-muted-foreground", compact ? "mb-3 max-w-xs text-xs" : "mb-5 max-w-md text-xs leading-relaxed"),
				children: description
			}),
			(actionLabel || secondaryLabel) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [actionLabel && onAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: buttonSize,
					onClick: onAction,
					children: actionLabel
				}), secondaryLabel && onSecondary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: buttonSize,
					onClick: onSecondary,
					children: secondaryLabel
				})]
			})
		]
	});
}
export { EmptyState as t };
