import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-C5PG5f8T.js";
import { i as getForegroundColor, r as generateColorFromChar } from "./style-BQVh98fR.js";
import { t as useIcon } from "./use-icon-rC3ylCON.js";
import { a as resolveProviderIconRef } from "./registry-DpmvB1li.js";
import { r as getFirstCharacter } from "./naming-BVJSQooI.js";
require_react();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const ProviderAvatarPrimitive = ({ providerName, logo, logoSrc, size, className, style, iconStyle }) => {
	const backgroundColor = generateColorFromChar(providerName);
	const color = providerName ? getForegroundColor(backgroundColor) : "white";
	const fallbackContent = getFirstCharacter(providerName);
	const resolvedLogo = logo ?? logoSrc;
	const effectiveLogo = useIcon(typeof resolvedLogo === "string" && resolvedLogo.startsWith("icon:") ? resolveProviderIconRef(resolvedLogo.slice(5)) : void 0) ?? resolvedLogo;
	if (effectiveLogo && typeof effectiveLogo !== "string") {
		const Icon = effectiveLogo;
		const resolvedSize = size ?? 32;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
			className,
			style: {
				width: resolvedSize,
				height: resolvedSize,
				...style
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				className: "bg-background text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { style: {
					width: "100%",
					height: "100%",
					...iconStyle
				} })
			})
		});
	}
	if (typeof effectiveLogo === "string" && !effectiveLogo.startsWith("icon:")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
		className,
		style: {
			width: size,
			height: size,
			...style
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
			src: effectiveLogo,
			className: "object-cover",
			draggable: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			style: {
				backgroundColor,
				color
			},
			children: fallbackContent
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className,
		style: {
			width: size,
			height: size,
			...style
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			style: {
				backgroundColor,
				color
			},
			children: fallbackContent
		})
	});
};
export { ProviderAvatarPrimitive as t };
