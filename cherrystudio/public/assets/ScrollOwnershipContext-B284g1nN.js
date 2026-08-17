import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ScrollOwnershipContext = (0, import_react.createContext)(null);
var NOOP = () => {};
const VERTICAL_SCROLL_OVERFLOW_TOLERANCE_PX = 1;
const VERTICAL_SCROLLABLE_OVERFLOW_PATTERN_SOURCE = "auto|scroll|overlay";
var VERTICAL_SCROLLABLE_OVERFLOW_PATTERN = /* @__PURE__ */ new RegExp(`^(?:${VERTICAL_SCROLLABLE_OVERFLOW_PATTERN_SOURCE})$`);
function clampForwardedWheelDelta(deltaY) {
	return Math.max(-200, Math.min(200, deltaY));
}
const ScrollOwnershipProvider = ({ children, scrollContainerRef, requestReadingControl = NOOP, scrollToElement = NOOP, notifyWheelIntent, scrollByWheel }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollOwnershipContext, {
		value: (0, import_react.useMemo)(() => ({
			notifyWheelIntent,
			requestReadingControl,
			scrollByWheel,
			scrollContainerRef,
			scrollToElement
		}), [
			notifyWheelIntent,
			requestReadingControl,
			scrollByWheel,
			scrollContainerRef,
			scrollToElement
		]),
		children
	});
};
function isVerticalScrollContainer(element, isRoot = false) {
	if (!element || element.scrollHeight <= element.clientHeight + 1) return false;
	if (isRoot) return true;
	const view = element.ownerDocument.defaultView;
	return view ? VERTICAL_SCROLLABLE_OVERFLOW_PATTERN.test(view.getComputedStyle(element).overflowY) : false;
}
function canConsumeVerticalWheel(element, deltaY, isRoot = false) {
	if (!isVerticalScrollContainer(element, isRoot) || !element) return false;
	const view = element.ownerDocument.defaultView;
	if (!view) return false;
	const overscrollBehaviorY = view.getComputedStyle(element).overscrollBehaviorY;
	if (overscrollBehaviorY === "contain" || overscrollBehaviorY === "none") return true;
	if (deltaY < 0) return element.scrollTop > 0;
	return deltaY > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1;
}
function findNearestVerticalScrollContainer(element, boundary = null) {
	for (let node = element; node && node !== boundary; node = node.parentElement) if (isVerticalScrollContainer(node)) return node;
	return null;
}
function findVerticalWheelConsumer(element, deltaY, boundary = null) {
	for (let node = element; node && node !== boundary; node = node.parentElement) if (canConsumeVerticalWheel(node, deltaY)) return node;
	return null;
}
function findOutermostVerticalScrollContainer(element, boundary) {
	let outermost = null;
	for (let node = element.parentElement; node && node !== boundary; node = node.parentElement) if (isVerticalScrollContainer(node)) outermost = node;
	return outermost;
}
function findScrollParent(element) {
	return findNearestVerticalScrollContainer(element?.parentElement ?? null);
}
function useScrollRuntimeBoundary() {
	const ownership = (0, import_react.use)(ScrollOwnershipContext);
	const getScrollContainer = (0, import_react.useCallback)(() => ownership?.scrollContainerRef.current ?? null, [ownership]);
	const notifyWheelIntent = (0, import_react.useCallback)((deltaY) => {
		if (!ownership?.notifyWheelIntent) return false;
		ownership.notifyWheelIntent(deltaY);
		return true;
	}, [ownership]);
	const scrollByWheel = (0, import_react.useCallback)((deltaY) => ownership?.scrollByWheel?.(deltaY) ?? false, [ownership]);
	return (0, import_react.useMemo)(() => ({
		getScrollContainer,
		notifyWheelIntent,
		scrollByWheel
	}), [
		getScrollContainer,
		notifyWheelIntent,
		scrollByWheel
	]);
}
function useIsScrollRuntimeManaged() {
	const ownership = (0, import_react.use)(ScrollOwnershipContext);
	return (0, import_react.useCallback)((scrollContainer) => scrollContainer !== null && scrollContainer === ownership?.scrollContainerRef.current, [ownership]);
}
function useRequestScrollReadingControl(anchorRef) {
	const ownership = (0, import_react.use)(ScrollOwnershipContext);
	return (0, import_react.useCallback)(() => {
		if (!ownership) return;
		const anchor = anchorRef.current;
		const scrollContainer = ownership.scrollContainerRef.current;
		if (!anchor || !scrollContainer?.contains(anchor)) return;
		ownership.requestReadingControl(anchor);
	}, [anchorRef, ownership]);
}
function useScrollRuntimeNavigation() {
	const ownership = (0, import_react.use)(ScrollOwnershipContext);
	return (0, import_react.useCallback)((element, align) => {
		if (!ownership) return false;
		const scrollContainer = ownership.scrollContainerRef.current;
		if (!scrollContainer?.contains(element) || findScrollParent(element) !== scrollContainer) return false;
		ownership.scrollToElement(element, align);
		return true;
	}, [ownership]);
}
export { clampForwardedWheelDelta as a, findScrollParent as c, useRequestScrollReadingControl as d, useScrollRuntimeBoundary as f, canConsumeVerticalWheel as i, findVerticalWheelConsumer as l, VERTICAL_SCROLLABLE_OVERFLOW_PATTERN_SOURCE as n, findNearestVerticalScrollContainer as o, useScrollRuntimeNavigation as p, VERTICAL_SCROLL_OVERFLOW_TOLERANCE_PX as r, findOutermostVerticalScrollContainer as s, ScrollOwnershipProvider as t, useIsScrollRuntimeManaged as u };
