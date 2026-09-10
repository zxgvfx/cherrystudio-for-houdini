import { t as debounce } from "./debounce-fOdNUTaO.js";
function throttle(func, throttleMs = 0, options = {}) {
	const { leading = true, trailing = true } = options;
	return debounce(func, throttleMs, {
		leading,
		maxWait: throttleMs,
		trailing
	});
}
export { throttle as t };
