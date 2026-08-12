import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { n as useMiniAppLogo, t as getMiniAppsLogoRef } from "./miniAppsLogo-8mrhSRfF.js";
import { n as miniAppContainedIcon, t as getIconDisplayConfig } from "./iconDisplayConfig-Cg20Y17C.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MiniAppIcon = ({ app, appearance = "avatar", size = 48, style }) => {
	const logoRef = getMiniAppsLogoRef(app.logo || void 0);
	const Icon = useMiniAppLogo(app.logo || void 0);
	const src = app.logoSrc ?? app.logo;
	if (logoRef) {
		if (!Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "icons.mini-app-icon",
			className: "flex shrink-0 items-center justify-center",
			style: {
				width: `${size}px`,
				height: `${size}px`,
				userSelect: "none",
				...style
			}
		});
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
