function getErrorDetails(err, seen = /* @__PURE__ */ new WeakSet()) {
	if (err === null || typeof err !== "object" || seen.has(err)) return err;
	seen.add(err);
	const result = {};
	const allProps = new Set([...Object.getOwnPropertyNames(err), ...Object.keys(err)]);
	for (const prop of allProps) try {
		const value = err[prop];
		if (typeof value === "function") continue;
		result[prop] = getErrorDetails(value, seen);
	} catch (e) {
		result[prop] = "<Unable to access property>";
	}
	return result;
}
function formatErrorDetails(error) {
	const detailedError = getErrorDetails(error);
	delete detailedError?.headers;
	delete detailedError?.stack;
	delete detailedError?.request_id;
	if (!detailedError) return "";
	const formattedJson = JSON.stringify(detailedError, null, 2).split("\n").map((line) => `  ${line}`).join("\n");
	return detailedError.message ? detailedError.message : `Error Details:\n${formattedJson}`;
}
export { formatErrorDetails as t };
