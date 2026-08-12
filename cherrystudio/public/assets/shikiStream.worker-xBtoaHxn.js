function WorkerWrapper(options) {
	return new Worker("" + new URL("shikiStream.worker-DJBXPm4F.js", import.meta.url).href, {
		type: "module",
		name: options?.name
	});
}
export { WorkerWrapper as default };
