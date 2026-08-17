const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./EmojiPickerContent-BXB6DaJG.js","./clock-3-BU_0sRYg.js","./createLucideIcon-B9V3xxkc.js","./Icon-C_BHijq2.js","./react-DXAbXv4a.js","./rolldown-runtime-BeJLVFtF.js","./flag-t57nERNM.js","./hash-BQnIc4aZ.js","./lightbulb-B3H6XJ_t.js","./paw-print-CoIKv-Xz.js","./plane-_nbq9Uad.js","./smile-BudUiYx_.js","./trophy-RohfwB6k.js","./utensils-Cq7PDpR5.js","./useTranslation-DXBMLNgN.js","./initReactI18next-BmJnUitX.js","./jsx-runtime-DZOd5Dcc.js","./with-selector-YZwnb76j.js","./CacheService-BxZWLQeF.js","./isEqual-DO7BtJs5.js","./LoggerService-CbighP69.js","./useCache-DNNSH80c.js","./isPlainObject-JookvmCI.js","./EmojiPickerContent-Cy9Fy0lt.css"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
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
var EmojiPickerContent = (0, import_react.lazy)(() => __vitePreload(() => import("./EmojiPickerContent-BXB6DaJG.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]), import.meta.url));
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
