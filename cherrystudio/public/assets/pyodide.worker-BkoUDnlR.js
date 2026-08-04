function WorkerWrapper(options) {
	return new Worker("" + new URL("pyodide.worker-S0rQzXEK.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
export { WorkerWrapper as default };
