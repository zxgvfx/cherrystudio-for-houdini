function toCamelCase(str) {
	let result = str.trim().toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase()).replace(/[^a-zA-Z0-9]/g, "");
	if (result && !/^[a-zA-Z_]/.test(result)) result = "_" + result;
	return result;
}
function truncateToLength(str, maxLength) {
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength).replace(/_+$/, "");
}
var FUNCTION_CALL_TOOL_NAME_MAX_LENGTH = 63;
var SERVER_DISAMBIGUATOR_LENGTH = 7;
function hashServerName(serverName) {
	let h = 2166136261;
	for (let i = 0; i < serverName.length; i++) {
		h ^= serverName.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0).toString(36).padStart(SERVER_DISAMBIGUATOR_LENGTH, "0").slice(-SERVER_DISAMBIGUATOR_LENGTH);
}
function buildFunctionCallToolName(serverName, toolName) {
	const serverPart = serverName ? toCamelCase(serverName) : "";
	const toolPart = toCamelCase(toolName);
	const baseName = serverPart ? `mcp__${serverPart}__${toolPart}` : `mcp__${toolPart}`;
	if (baseName.length <= FUNCTION_CALL_TOOL_NAME_MAX_LENGTH) return baseName;
	const suffix = `_${hashServerName(serverName)}`;
	return `${truncateToLength(baseName, FUNCTION_CALL_TOOL_NAME_MAX_LENGTH - suffix.length)}${suffix}`;
}
function parseFunctionCallToolName(toolName) {
	if (!toolName?.startsWith("mcp__")) return null;
	const rest = toolName.slice(5);
	const delimiterIndex = rest.lastIndexOf("__");
	if (delimiterIndex <= 0 || delimiterIndex >= rest.length - 2) return null;
	return {
		serverPart: rest.slice(0, delimiterIndex),
		toolPart: rest.slice(delimiterIndex + 2)
	};
}
export { parseFunctionCallToolName as n, toCamelCase as r, buildFunctionCallToolName as t };
