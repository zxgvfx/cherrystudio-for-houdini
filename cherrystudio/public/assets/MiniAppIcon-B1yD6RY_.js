import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as useMiniAppLogo, t as getMiniAppsLogoRef } from "./miniAppsLogo-Gym76iTp.js";
import { n as miniAppContainedIcon, t as getIconDisplayConfig } from "./iconDisplayConfig-CBD1yQwA.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MiniAppIcon = ({ app, appearance = "avatar", size = 48, style }) => {
	const logoRef = getMiniAppsLogoRef(app.logo || void 0);
	const Icon = useMiniAppLogo(app.logo || void 0);
	const src = app.logoSrc ?? app.logo;
	if (logoRef) {
		if (!Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "icons.mini-app-icon",
			className: `flex shrink-0 items-center justify-center ${appearance === "sidebar" ? "overflow-hidden rounded-full border border-transparent bg-white/90 dark:border-border dark:bg-transparent" : ""}`,
			style: {
				width: `${size}px`,
				height: `${size}px`,
				userSelect: "none",
				...style
			}
		});
		if (appearance === "sidebar") {
			const displayConfig = getIconDisplayConfig("mini-app", app.logo);
			if (displayConfig?.scale && displayConfig.scale < 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon.Avatar, {
				size,
				className: "select-none",
				shape: "circle"
			});
			const iconSize = size * (app.logo?.toLowerCase() === "bolt" ? 1.3 : displayConfig?.scale ?? 1);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "icons.mini-app-icon",
				className: "flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent bg-white/90 dark:border-border dark:bg-transparent",
				style: {
					width: `${size}px`,
					height: `${size}px`,
					userSelect: "none",
					...style
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"aria-label": app.name || "MiniApp Icon",
					className: "select-none",
					style: {
						width: `${iconSize}px`,
						height: `${iconSize}px`,
						flexShrink: 0
					}
				})
			});
		}
		if (appearance === "plain" || appearance === "bare") {
			const displayConfig = appearance === "plain" ? getIconDisplayConfig("mini-app", app.logo) : void 0;
			const iconSize = size * (displayConfig?.scale ?? 1);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "icons.mini-app-icon",
				className: "flex shrink-0 items-center justify-center",
				style: {
					width: `${size}px`,
					height: `${size}px`,
					userSelect: "none",
					...style
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					"aria-label": app.name || "MiniApp Icon",
					className: "select-none",
					style: {
						width: `${iconSize}px`,
						height: `${iconSize}px`,
						flexShrink: 0,
						borderRadius: displayConfig?.borderRadius === void 0 ? void 0 : `${displayConfig.borderRadius}px`,
						overflow: displayConfig?.borderRadius === void 0 ? void 0 : "hidden"
					}
				})
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon.Avatar, {
			size,
			className: "select-none border border-border",
			shape: "rounded"
		});
	}
	if (src) {
		if (appearance === "bare") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			"data-ui": "icons.mini-app-icon",
			src,
			className: "shrink-0 select-none object-contain",
			style: {
				width: `${size}px`,
				height: `${size}px`,
				userSelect: "none",
				...style
			},
			draggable: false,
			alt: app.name || "MiniApp Icon"
		});
		if (appearance === "sidebar") {
			const imageSize$1 = size * .8;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-ui": "icons.mini-app-icon",
				className: "flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent bg-white/90 dark:border-border dark:bg-transparent",
				style: {
					width: `${size}px`,
					height: `${size}px`,
					backgroundColor: app.background,
					userSelect: "none",
					...style
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					className: "shrink-0 select-none object-contain",
					style: {
						width: `${imageSize$1}px`,
						height: `${imageSize$1}px`
					},
					draggable: false,
					alt: app.name || "MiniApp Icon"
				})
			});
		}
		const imageDisplayConfig = appearance === "plain" ? miniAppContainedIcon : void 0;
		const imageSize = size * (imageDisplayConfig?.scale ?? 1);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			"data-ui": "icons.mini-app-icon",
			src,
			className: appearance === "plain" ? "select-none" : "select-none rounded-2xl border border-border",
			style: {
				width: `${imageSize}px`,
				height: `${imageSize}px`,
				borderRadius: imageDisplayConfig?.borderRadius === void 0 ? void 0 : `${imageDisplayConfig.borderRadius}px`,
				backgroundColor: app.background,
				userSelect: "none",
				...style
			},
			draggable: false,
			alt: app.name || "MiniApp Icon"
		});
	}
	return null;
};
var MiniAppIcon_default = MiniAppIcon;
export { MiniAppIcon_default as t };
