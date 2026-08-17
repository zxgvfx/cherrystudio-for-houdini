import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as head } from "./head-Cem_9hKR.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as useIcon } from "./use-icon-u7Wb-l1f.js";
import { u as getModelLogoRef } from "./model-BGDvQJb9.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ModelAvatar = ({ model, size, className }) => {
	const Icon = useIcon(getModelLogoRef(model));
	if (Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon.Avatar, {
		size,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("flex items-center justify-center rounded-lg", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "rounded-lg",
			children: head(model?.name)
		})
	});
};
var ModelAvatar_default = ModelAvatar;
export { ModelAvatar_default as t };
