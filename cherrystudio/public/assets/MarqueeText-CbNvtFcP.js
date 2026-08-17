import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as cn } from "./style-C-RkFX_x.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MarqueeText = ({ children, speed = 30, pauseDuration = .8, className }) => {
	const containerRef = (0, import_react.useRef)(null);
	const contentRef = (0, import_react.useRef)(null);
	const [isOverflowing, setIsOverflowing] = (0, import_react.useState)(false);
	const [isHovered, setIsHovered] = (0, import_react.useState)(false);
	const [overflowAmount, setOverflowAmount] = (0, import_react.useState)(0);
	const checkOverflow = (0, import_react.useCallback)(() => {
		const container = containerRef.current;
		const content = contentRef.current;
		if (container && content) {
			const overflow = content.scrollWidth > container.clientWidth;
			setIsOverflowing(overflow);
			setOverflowAmount(overflow ? content.scrollWidth - container.clientWidth : 0);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		checkOverflow();
		const observer = new ResizeObserver(checkOverflow);
		if (containerRef.current) observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [checkOverflow, children]);
	const shouldAnimate = isOverflowing && isHovered;
	(0, import_react.useEffect)(() => {
		const el = contentRef.current;
		if (!shouldAnimate || !el || overflowAmount <= 0) return;
		const scrollTime = overflowAmount / speed;
		const total = 2 * scrollTime + 3 * pauseDuration;
		const p1 = pauseDuration / total;
		const p2 = (pauseDuration + scrollTime) / total;
		const p3 = (2 * pauseDuration + scrollTime) / total;
		const p4 = (2 * pauseDuration + 2 * scrollTime) / total;
		el.style.willChange = "transform";
		const animation = el.animate([
			{
				transform: "translateX(0)",
				offset: 0
			},
			{
				transform: "translateX(0)",
				offset: p1
			},
			{
				transform: `translateX(-${overflowAmount}px)`,
				offset: p2
			},
			{
				transform: `translateX(-${overflowAmount}px)`,
				offset: p3
			},
			{
				transform: "translateX(0)",
				offset: p4
			},
			{
				transform: "translateX(0)",
				offset: 1
			}
		], {
			duration: total * 1e3,
			iterations: Infinity,
			easing: "linear"
		});
		return () => {
			const currentTransform = getComputedStyle(el).transform;
			animation.cancel();
			el.style.willChange = "";
			if (currentTransform && currentTransform !== "none" && currentTransform !== "matrix(1, 0, 0, 1, 0, 0)") {
				el.style.transform = currentTransform;
				el.getBoundingClientRect();
				el.style.transition = "transform 0.3s ease-out";
				el.style.transform = "translateX(0)";
				const onEnd = () => {
					el.style.transition = "";
					el.style.transform = "";
					el.removeEventListener("transitionend", onEnd);
				};
				el.addEventListener("transitionend", onEnd);
			}
		};
	}, [
		shouldAnimate,
		overflowAmount,
		speed,
		pauseDuration
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.marquee-text",
		ref: containerRef,
		className: cn("overflow-hidden whitespace-nowrap", className),
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: contentRef,
			className: "inline-block whitespace-nowrap",
			children
		})
	});
};
var MarqueeText_default = (0, import_react.memo)(MarqueeText);
export { MarqueeText_default as t };
