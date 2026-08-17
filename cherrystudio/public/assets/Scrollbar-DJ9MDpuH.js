import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as throttle } from "./throttle-CxpDA6MQ.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var Scrollbar = ({ ref: passedRef, children, className, onScroll: externalOnScroll, style, ...htmlProps }) => {
	const [isScrolling, setIsScrolling] = (0, import_react.useState)(false);
	const timeoutRef = (0, import_react.useRef)(null);
	const clearScrollingTimeout = (0, import_react.useCallback)(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);
	const handleScroll = (0, import_react.useCallback)(() => {
		setIsScrolling(true);
		clearScrollingTimeout();
		timeoutRef.current = setTimeout(() => {
			setIsScrolling(false);
			timeoutRef.current = null;
		}, 1500);
	}, [clearScrollingTimeout]);
	const throttledInternalScrollHandler = (0, import_react.useCallback)(throttle(handleScroll, 100, {
		leading: true,
		trailing: true
	}), [handleScroll]);
	const combinedOnScroll = (0, import_react.useCallback)(() => {
		throttledInternalScrollHandler();
		if (externalOnScroll) externalOnScroll();
	}, [throttledInternalScrollHandler, externalOnScroll]);
	(0, import_react.useEffect)(() => {
		return () => {
			clearScrollingTimeout();
			throttledInternalScrollHandler.cancel();
		};
	}, [throttledInternalScrollHandler, clearScrollingTimeout]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.scrollbar",
		...mergeUiProps(htmlProps, "ui.scrollbar"),
		className: cn("overflow-y-auto [scrollbar-gutter:stable] [&::-webkit-scrollbar-thumb:hover]:bg-[var(--scrollbar-thumb-hover)] [&::-webkit-scrollbar-thumb]:transition-[background] [&::-webkit-scrollbar-thumb]:duration-[2000ms]", isScrolling ? "[&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)]" : "[&::-webkit-scrollbar-thumb]:bg-transparent", className),
		"data-scrolling": isScrolling ? "true" : "false",
		onScroll: combinedOnScroll,
		ref: passedRef,
		style: {
			...style,
			scrollbarColor: isScrolling ? "var(--scrollbar-thumb) transparent" : "transparent transparent"
		},
		children
	});
};
Scrollbar.displayName = "Scrollbar";
var Scrollbar_default = Scrollbar;
export { Scrollbar_default as t };
