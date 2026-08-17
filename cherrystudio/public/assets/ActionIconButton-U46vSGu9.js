import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { n as cn } from "./style-C-RkFX_x.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ActionIconButton = ({ icon, active = false, className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "icon-sm",
		variant: "ghost",
		className: cn("flex cursor-pointer flex-row items-center justify-center rounded-full border-none p-0 text-base transition-all duration-300 ease-in-out [&_.icon-a-addchat]:mb-[-2px] [&_.icon-a-addchat]:text-lg [&_.icon]:text-muted-foreground [&_.iconfont]:text-muted-foreground [&_.lucide]:text-muted-foreground", active && "[&_.icon]:text-primary! [&_.iconfont]:text-primary! [&_.lucide]:text-primary!", className),
		...props,
		children: icon
	});
};
ActionIconButton.displayName = "ActionIconButton";
var ActionIconButton_default = (0, import_react.memo)(ActionIconButton);
export { ActionIconButton_default as t };
