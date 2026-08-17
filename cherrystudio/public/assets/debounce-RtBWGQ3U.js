function debounce(func, debounceMs, { signal, edges } = {}) {
	let pendingThis = void 0;
	let pendingArgs = null;
	const leading = edges != null && edges.includes("leading");
	const trailing = edges == null || edges.includes("trailing");
	const invoke = () => {
		if (pendingArgs !== null) {
			func.apply(pendingThis, pendingArgs);
			pendingThis = void 0;
			pendingArgs = null;
		}
	};
	const onTimerEnd = () => {
		if (trailing) invoke();
		cancel();
	};
	let timeoutId = null;
	const schedule = () => {
		if (timeoutId != null) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			timeoutId = null;
			onTimerEnd();
		}, debounceMs);
	};
	const cancelTimer = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};
	const cancel = () => {
		cancelTimer();
		pendingThis = void 0;
		pendingArgs = null;
	};
	const flush = () => {
		invoke();
	};
	const debounced = function(...args) {
		if (signal?.aborted) return;
		pendingThis = this;
		pendingArgs = args;
		const isFirstCall = timeoutId == null;
		schedule();
		if (leading && isFirstCall) invoke();
	};
	debounced.schedule = schedule;
	debounced.cancel = cancel;
	debounced.flush = flush;
	signal?.addEventListener("abort", cancel, { once: true });
	return debounced;
}
function debounce$1(func, debounceMs = 0, options = {}) {
	if (typeof options !== "object") options = {};
	const { leading = false, trailing = true, maxWait } = options;
	const edges = Array(2);
	if (leading) edges[0] = "leading";
	if (trailing) edges[1] = "trailing";
	let result = void 0;
	let pendingAt = null;
	const _debounced = debounce(function(...args) {
		result = func.apply(this, args);
		pendingAt = null;
	}, debounceMs, { edges });
	const debounced = function(...args) {
		if (maxWait != null) {
			if (pendingAt === null) pendingAt = Date.now();
			if (Date.now() - pendingAt >= maxWait) {
				result = func.apply(this, args);
				pendingAt = Date.now();
				_debounced.cancel();
				_debounced.schedule();
				return result;
			}
		}
		_debounced.apply(this, args);
		return result;
	};
	const flush = () => {
		_debounced.flush();
		return result;
	};
	debounced.cancel = _debounced.cancel;
	debounced.flush = flush;
	return debounced;
}
export { debounce$1 as t };
