import { s as __toESM } from "./chunk-DiqNceaa.js";
import { r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EmojiIcon = ({ emoji, className, size = 26, fontSize = 15 }) => {
	const containerStyle = {
		width: size,
		height: size,
		fontSize
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.emoji-icon",
		className: cn("relative mr-[3px] flex shrink-0 items-center justify-center overflow-hidden rounded-full", className),
		style: containerStyle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex h-full w-full scale-150 items-center justify-center text-[200%] opacity-40 blur-[5px]",
			children: emoji || "⭐️"
		}), emoji]
	});
};
var EmojiIcon_default = EmojiIcon;
export { EmojiIcon_default as t };
