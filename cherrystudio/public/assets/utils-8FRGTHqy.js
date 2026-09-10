import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
var logger = loggerService.withContext("McpSettings/utils");
var stripReadonlyMcpServerFields = (server) => {
	const dto = { ...server };
	delete dto.id;
	delete dto.createdAt;
	delete dto.updatedAt;
	delete dto.url;
	return dto;
};
const toCreateMcpServerDto = (server) => {
	const dto = {
		...stripReadonlyMcpServerFields(server),
		name: server.name
	};
	if (dto.baseUrl === void 0 && server.url !== void 0) dto.baseUrl = server.url;
	return dto;
};
const toUpdateMcpServerDto = (server) => {
	return stripReadonlyMcpServerFields(server);
};
const isSameMcpServerCandidate = (existing, candidate) => {
	if (candidate.baseUrl && existing.baseUrl === candidate.baseUrl) return true;
	if (candidate.provider && existing.provider === candidate.provider) return candidate.providerUrl !== void 0 && existing.providerUrl === candidate.providerUrl || existing.name === candidate.name;
	if (candidate.installSource === "builtin") return existing.name === candidate.name;
	return false;
};
var TRUSTED_SERVER_WHITELIST = ["http://127.0.0.1:18930/mcp"];
function isServerInWhitelist(server) {
	if (!(server.type === "sse" || server.type === "streamableHttp") || !server.baseUrl) return false;
	return TRUSTED_SERVER_WHITELIST.includes(server.baseUrl);
}
const getCommandPreview = (server) => {
	return [server.command, ...server.args ?? []].filter((value) => typeof value === "string" && value.trim().length > 0).join(" ");
};
async function ensureServerTrusted(currentServer, requestConfirm, updateServer) {
	const isProtocolInstall = currentServer.installSource === "protocol";
	logger.silly("ensureServerTrusted", {
		serverId: currentServer.id,
		installSource: currentServer.installSource,
		isTrusted: currentServer.isTrusted
	});
	if (!isProtocolInstall || currentServer.isTrusted) return currentServer;
	if (isServerInWhitelist(currentServer)) {
		logger.info("Auto-trusting whitelisted server", {
			serverId: currentServer.id,
			baseUrl: currentServer.baseUrl
		});
		const trustFields$1 = {
			installSource: "protocol",
			isTrusted: true,
			trustedAt: Date.now()
		};
		updateServer(trustFields$1);
		return {
			...currentServer,
			...trustFields$1
		};
	}
	if (!await requestConfirm(currentServer)) return null;
	const trustFields = {
		installSource: "protocol",
		isTrusted: true,
		trustedAt: Date.now()
	};
	updateServer(trustFields);
	return {
		...currentServer,
		...trustFields
	};
}
const formatMcpLogData = (data) => typeof data === "string" ? data : JSON.stringify(data, null, 2);
var formatMcpLog = (log) => {
	const data = log.data ? `\n${formatMcpLogData(log.data)}` : "";
	return `[${new Date(log.timestamp).toLocaleTimeString()}] [${log.level.toUpperCase()}] ${log.message}${data}`;
};
const formatMcpLogs = (logs) => logs.map(formatMcpLog).join("\n");
export { isSameMcpServerCandidate as a, getCommandPreview as i, formatMcpLogData as n, toCreateMcpServerDto as o, formatMcpLogs as r, toUpdateMcpServerDto as s, ensureServerTrusted as t };
