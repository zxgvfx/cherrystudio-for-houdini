const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./EmojiPickerContent-DdBUuO6v.js","./useCache-SsOQx-L2.js","./isEqual-DO7BtJs5.js","./react-BgPOU4At.js","./chunk-DiqNceaa.js","./with-selector-BMhODuKS.js","./LoggerService-oVV4iwe6.js","./clock-3-DzyPABqC.js","./createLucideIcon-_uCXKA5i.js","./Icon-C4T_C224.js","./flag-CaBlOuNi.js","./hash-4Ffen9Xw.js","./lightbulb-DhlHdQ31.js","./paw-print-CbvNsdsS.js","./plane-BTF84hyu.js","./smile-RNBLJ2IT.js","./trophy-DD0hxh7s.js","./utensils-Chk80J6W.js","./useTranslation-DnuRkr5k.js","./jsx-runtime-DCB_IiL2.js","./EmojiPickerContent-Cy9Fy0lt.css"])))=>i.map(i=>d[i]);
import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import { r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EmojiAvatar = ({ children, size = 31, fontSize, onClick, className, style }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.emoji-avatar",
	onClick,
	className: cn("flex items-center justify-center", "bg-background-soft border-border", "rounded-[20%] cursor-pointer", "transition-opacity hover:opacity-80", "border-[0.5px]", className),
	style: {
		width: size,
		height: size,
		fontSize: fontSize ?? size * .5,
		...style
	},
	children
});
EmojiAvatar.displayName = "EmojiAvatar";
var emoji_avatar_default = (0, import_react.memo)(EmojiAvatar);
var EmojiPickerContent = (0, import_react.lazy)(() => __vitePreload(() => import("./EmojiPickerContent-DdBUuO6v.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]), import.meta.url));
var PICKER_FRAME_CLASS = "h-88 max-h-[min(22rem,calc(100vh-6rem))] w-80 max-w-[calc(100vw-2rem)] rounded-lg bg-popover text-popover-foreground";
var EmojiPicker = (props) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "ui.emoji-picker.status",
			"aria-busy": "true",
			"aria-label": t("common.loading"),
			className: PICKER_FRAME_CLASS,
			role: "status"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiPickerContent, { ...props })
	});
};
var EmojiPicker_default = EmojiPicker;
export { emoji_avatar_default as n, EmojiPicker_default as t };
