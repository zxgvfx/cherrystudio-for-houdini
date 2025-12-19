function WorkerWrapper(options) {
	return new Worker("" + new URL("pyodide.worker-CnEph7yP.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
export { WorkerWrapper as default };
