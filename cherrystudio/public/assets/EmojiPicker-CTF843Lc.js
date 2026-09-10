const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./EmojiPickerContent-BTc2sTL5.js","./clock-3-DYbzXsQ9.js","./createLucideIcon-iAH3Or8b.js","./Icon-ChXzzEWu.js","./react-C1DTAr29.js","./rolldown-runtime-D8OvLAZx.js","./flag-BSRZ_PK2.js","./hash-IERpHycR.js","./lightbulb-CGGEqCJc.js","./paw-print-CfP6OUk_.js","./plane-HpjfWI0Q.js","./smile-Ccl7SO51.js","./trophy-BAWphnTL.js","./utensils-DcFKTURp.js","./useTranslation-DRFkwCLq.js","./initReactI18next-BofyZ-Nu.js","./jsx-runtime-Cc0-uZGc.js","./with-selector-DlsRhNV6.js","./CacheService-IyXh62g9.js","./isEqual-C7zEE0RK.js","./LoggerService-ChVOAPl8.js","./useCache-lF6Sw_ck.js","./isPlainObject-Bke-3U07.js","./EmojiPickerContent-Cy9Fy0lt.css"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
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
var EmojiPickerContent = (0, import_react.lazy)(() => __vitePreload(() => import("./EmojiPickerContent-BTc2sTL5.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]), import.meta.url));
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
