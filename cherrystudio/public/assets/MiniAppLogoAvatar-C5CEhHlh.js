import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as useMiniAppLogo, t as getMiniAppsLogoRef } from "./miniAppsLogo-BmkS6kHN.js";
import { t as LogoAvatar_default } from "./LogoAvatar-DnJDmtsm.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MiniAppLogoAvatar = ({ logo, size = 32, className }) => {
	const logoRef = getMiniAppsLogoRef(logo);
	const Icon = useMiniAppLogo(logo);
	if (logoRef && !Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "icons.mini-app-logo-avatar",
		className: "inline-block shrink-0",
		style: {
			width: size,
			height: size
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoAvatar_default, {
		logo: Icon ?? logo,
		size,
		className
	});
};
var MiniAppLogoAvatar_default = MiniAppLogoAvatar;
export { MiniAppLogoAvatar_default as t };
