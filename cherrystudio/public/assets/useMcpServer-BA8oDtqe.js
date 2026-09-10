import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { c as useQuery, o as useMutation } from "./useDataApi-H7ZhyZ_J.js";
import { r as toCamelCase, t as buildFunctionCallToolName } from "./mcpToolName-BzyshraJ.js";
function buildMcpWireToolId(serverName, toolName) {
	return buildFunctionCallToolName(serverName, toolName);
}
function buildMcpWireWildcard(serverName) {
	return `mcp__${toCamelCase(serverName)}__*`;
}
function matchesMcpSourceToolRule(value, server, tool) {
	return value === tool.name || value === tool.id || value === buildMcpWireToolId(server.name, tool.name) || value === buildMcpWireWildcard(server.name);
}
function isMcpToolDisabledBySource(server, tool) {
	return server.disabledTools?.some((value) => matchesMcpSourceToolRule(value, server, tool)) ?? false;
}
function isMcpToolForcePromptBySource(server, tool) {
	return server.disabledAutoApproveTools?.some((value) => matchesMcpSourceToolRule(value, server, tool)) ?? false;
}
function resolveMcpSourceToolAccess(server, tool) {
	if (isMcpToolDisabledBySource(server, tool)) return {
		enabled: false,
		approval: "prompt"
	};
	if (isMcpToolForcePromptBySource(server, tool)) return {
		enabled: true,
		approval: "prompt"
	};
	return {
		enabled: true,
		approval: "auto"
	};
}
var import_react = /* @__PURE__ */ __toESM(require_react());
const useMcpServers = (query, options = {}) => {
	const { data, isLoading, mutate } = useQuery("/mcp-servers", {
		query,
		enabled: options.enabled
	});
	const mcpServers = (0, import_react.useMemo)(() => data?.items ?? [], [data]);
	const { trigger: createMcpServer } = useMutation("POST", "/mcp-servers", { refresh: ["/mcp-servers"] });
	const addMcpServer = (0, import_react.useCallback)((dto) => createMcpServer({ body: dto }), [createMcpServer]);
	const { trigger: reorderTrigger } = useMutation("PATCH", "/mcp-servers", { refresh: ["/mcp-servers"] });
	return {
		mcpServers,
		isLoading,
		addMcpServer,
		reorderMcpServers: (0, import_react.useCallback)((reorderedList) => {
			mutate(data ? {
				...data,
				items: reorderedList
			} : void 0, false);
			reorderTrigger({ body: { orderedIds: reorderedList.map((s) => s.id) } }).catch((error) => {
				loggerService.withContext("useMcpServer").warn("Failed to reorder MCP servers, reverting", error);
				mutate();
			});
		}, [
			data,
			mutate,
			reorderTrigger
		]),
		refetch: mutate
	};
};
const useMcpServer = (id) => {
	const { data, isLoading } = useQuery("/mcp-servers", {
		query: { id },
		enabled: !!id
	});
	const { updateMcpServer, deleteMcpServer } = useMcpServerMutations(id);
	return {
		server: (0, import_react.useMemo)(() => data?.items?.[0], [data]),
		isLoading,
		updateMcpServer,
		deleteMcpServer
	};
};
const useIsToolAutoApproved = (tool) => {
	const { mcpServers } = useMcpServers();
	return (0, import_react.useMemo)(() => {
		const server = mcpServers.find((s) => s.id === tool.serverId);
		return server ? resolveMcpSourceToolAccess(server, tool).approval === "auto" : false;
	}, [mcpServers, tool]);
};
const useMcpServerMutations = (id) => {
	const path = `/mcp-servers/${id}`;
	const { trigger: updateMcpServer } = useMutation("PATCH", path, { refresh: ["/mcp-servers"] });
	const { trigger: deleteMcpServer } = useMutation("DELETE", path, { refresh: ["/mcp-servers"] });
	return {
		updateMcpServer,
		deleteMcpServer
	};
};
export { useMcpServers as i, useMcpServer as n, useMcpServerMutations as r, useIsToolAutoApproved as t };
