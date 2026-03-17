function WorkerWrapper(options) {
	return new Worker("" + new URL("shiki-stream.worker-Z_S1cHJT.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
export { WorkerWrapper as default };
