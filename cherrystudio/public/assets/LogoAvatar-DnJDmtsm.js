import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { r as AvatarImage, t as Avatar } from "./avatar-DSfDf9Q4.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var LogoAvatar = ({ logo, size = 32, shape = "rounded", className }) => {
	if (!logo) return null;
	const borderClass = "border border-border";
	if (typeof logo !== "string") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(logo.Avatar, {
		size,
		shape,
		className: `${borderClass} ${className ?? ""}`.trim()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: `${borderClass} ${shape === "circle" ? "rounded-full" : "rounded-[20%]"} ${className ?? ""}`.trim(),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: logo })
	});
};
var LogoAvatar_default = LogoAvatar;
export { LogoAvatar_default as t };
