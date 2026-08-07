import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as throttle } from "./throttle-B4IzJa_Q.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var Scrollbar = ({ ref, children, className, onScroll: externalOnScroll, style, ...htmlProps }) => {
	const [isScrolling, setIsScrolling] = import_react.useState(false);
	const timeoutRef = import_react.useRef(null);
	const clearScrollingTimeout = import_react.useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);
	const handleScroll = import_react.useCallback(() => {
		setIsScrolling(true);
		clearScrollingTimeout();
		timeoutRef.current = setTimeout(() => {
			setIsScrolling(false);
			timeoutRef.current = null;
		}, 1500);
	}, [clearScrollingTimeout]);
	const throttledInternalScrollHandler = import_react.useMemo(() => throttle(handleScroll, 100, {
		leading: true,
		trailing: true
	}), [handleScroll]);
	const combinedOnScroll = import_react.useCallback(() => {
		throttledInternalScrollHandler();
		externalOnScroll?.();
	}, [externalOnScroll, throttledInternalScrollHandler]);
	import_react.useEffect(() => {
		return () => {
			clearScrollingTimeout();
			throttledInternalScrollHandler.cancel();
		};
	}, [clearScrollingTimeout, throttledInternalScrollHandler]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.scrollbar",
		...mergeUiProps(htmlProps, "ui.scrollbar"),
		ref,
		className: cn("overflow-y-auto [scrollbar-gutter:stable]", className),
		"data-scrolling": isScrolling ? "true" : "false",
		onScroll: combinedOnScroll,
		style: {
			...style,
			scrollbarColor: isScrolling ? "var(--scrollbar-thumb) transparent" : "transparent transparent"
		},
		children
	});
};
Scrollbar.displayName = "Scrollbar";
var scrollbar_default = Scrollbar;
export { scrollbar_default as t };
