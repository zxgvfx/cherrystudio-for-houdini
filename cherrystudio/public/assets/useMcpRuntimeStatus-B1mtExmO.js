import { s as __toESM } from "./chunk-DiqNceaa.js";
import { a as useSharedCacheValue, i as useSharedCacheSelector } from "./useCache-SsOQx-L2.js";
import { t as require_react } from "./react-BgPOU4At.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
const mcpStatusCacheKey = (serverId) => `mcp.status.${serverId}`;
var CONNECTING_MCP_RUNTIME_STATUS = {
	state: "connecting",
	lastCheckedAt: 0
};
var DISABLED_MCP_RUNTIME_STATUS = {
	state: "disabled",
	lastCheckedAt: 0
};
function getDefaultMcpRuntimeStatus(isActive) {
	return isActive ? CONNECTING_MCP_RUNTIME_STATUS : DISABLED_MCP_RUNTIME_STATUS;
}
function useMcpRuntimeStatus(serverId, isActive) {
	return useSharedCacheValue(serverId ? mcpStatusCacheKey(serverId) : mcpStatusCacheKey("__draft__")) ?? getDefaultMcpRuntimeStatus(isActive);
}
function useMcpRuntimeStatusMap(servers) {
	const sortedServers = (0, import_react.useMemo)(() => [...servers].sort((a, b) => a.id.localeCompare(b.id)), [servers]);
	const selector = (0, import_react.useCallback)((values) => Object.fromEntries(sortedServers.map((server, index) => [server.id, values[index] ?? getDefaultMcpRuntimeStatus(server.isActive)])), [sortedServers]);
	return useSharedCacheSelector(sortedServers.map((server) => mcpStatusCacheKey(server.id)), selector);
}
export { useMcpRuntimeStatusMap as n, useMcpRuntimeStatus as t };
