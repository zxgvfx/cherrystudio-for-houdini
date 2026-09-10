function WorkerWrapper(options) {
	return new Worker("" + new URL("shikiStream.worker-8Pi7zyZy.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
export { WorkerWrapper as default };
