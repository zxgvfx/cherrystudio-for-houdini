import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
import { t as OpenCode } from "./open-code-HQ-S_sWH.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var OpenCodeGoLight = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenCode, { ...props });
function OpenCodeGoAvatar({ size = 32, shape = "circle", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		className: cn("overflow-hidden", shape === "circle" ? "rounded-full" : "rounded-[20%]", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
			className: "text-foreground bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenCodeGoLight, { style: {
				width: size,
				height: size
			} })
		})
	});
}
var OpenCodeGo = ({ variant, className, ...props }) => {
	if (variant === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenCodeGoLight, {
		...props,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenCodeGoLight, {
		...props,
		className
	});
};
const OpenCodeGoIcon = /* @__PURE__ */ Object.assign(OpenCodeGo, {
	Avatar: OpenCodeGoAvatar,
	colorPrimary: "#131010"
});
export { OpenCodeGoIcon as t };
