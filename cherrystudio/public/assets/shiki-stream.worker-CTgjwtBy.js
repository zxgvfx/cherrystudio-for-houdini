function WorkerWrapper(options) {
	return new Worker("" + new URL("shiki-stream.worker-BaVa-IL5.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
export { WorkerWrapper as default };
