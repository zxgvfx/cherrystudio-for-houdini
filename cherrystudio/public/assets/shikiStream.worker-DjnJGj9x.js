function WorkerWrapper(options) {
	return new Worker("" + new URL("shikiStream.worker-BOIg7eNQ.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
export { WorkerWrapper as default };
