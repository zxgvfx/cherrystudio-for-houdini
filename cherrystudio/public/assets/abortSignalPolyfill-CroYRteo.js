function installAbortSignalAny() {
	if (typeof AbortSignal.any === "function") return;
	try {
		Object.defineProperty(AbortSignal, "any", {
			value(signals) {
				const list = [...signals];
				if (list.length === 0) return new AbortController().signal;
				const controller = new AbortController();
				for (const signal of list) {
					if (signal.aborted) {
						controller.abort(signal.reason);
						return controller.signal;
					}
					signal.addEventListener("abort", () => controller.abort(signal.reason), {
						once: true,
						signal: controller.signal
					});
				}
				return controller.signal;
			},
			configurable: true,
			writable: true
		});
	} catch {}
}
function installAbortSignalTimeout() {
	if (typeof AbortSignal.timeout === "function") return;
	try {
		Object.defineProperty(AbortSignal, "timeout", {
			value(ms) {
				const controller = new AbortController();
				const id = setTimeout(() => {
					controller.abort();
				}, ms);
				controller.signal.addEventListener("abort", () => clearTimeout(id), { once: true });
				return controller.signal;
			},
			configurable: true,
			writable: true
		});
	} catch {}
}
installAbortSignalAny();
installAbortSignalTimeout();
