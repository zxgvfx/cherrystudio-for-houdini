import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as head } from "./head-D3xX9ybW.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-BMK8th-L.js";
import { n as cn } from "./style-qqUWb85F.js";
import { t as useIcon } from "./use-icon-BeENEiSO.js";
import { u as getModelLogoRef } from "./model-3irbiX6r.js";
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
