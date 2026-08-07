import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as instance } from "./i18next-DBAWv9hQ.js";
import { t as BailianIcon } from "./bailian-BKFfktHW.js";
import { t as ModelscopeIcon } from "./modelscope-DGp3_E8L.js";
import { t as nanoid } from "./index.browser-BQKr_dOz.js";
import { t as getMcpServerType } from "./mcp-dqgJbJP2.js";
var logger$1 = loggerService.withContext("BailianSyncUtils");
const BAILIAN_HOST = "https://dashscope.aliyuncs.com";
var TOKEN_STORAGE_KEY$1 = "bailian_token";
const saveBailianToken = (token) => {
	localStorage.setItem(TOKEN_STORAGE_KEY$1, token);
};
const getBailianToken = () => {
	return localStorage.getItem(TOKEN_STORAGE_KEY$1);
};
const clearBailianToken = () => {
	localStorage.removeItem(TOKEN_STORAGE_KEY$1);
};
var PAGE_SIZE = 20;
async function fetchAllMcpServers(token) {
	const allServers = [];
	let pageNum = 1;
	let total = 0;
	let length = 0;
	do {
		const url = `${BAILIAN_HOST}/api/v1/mcps/user/list?pageNo=${pageNum}&pageSize=${PAGE_SIZE}`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		if (response.status === 401 || response.status === 403) throw new Error("unauthorized");
		if (response.status === 500) throw new Error("server_error");
		if (!response.ok) throw new Error(`Status: ${response.status}`);
		const result = await response.json();
		if (!result.success) throw new Error(result.message || "Fetch failed");
		allServers.push(...result.data || []);
		length = result.data.length;
		total = result.total || 0;
		pageNum++;
	} while ((pageNum - 1) * PAGE_SIZE < total && length > 0);
	return allServers;
}
const syncBailianServers = async (token) => {
	const t = instance.t;
	try {
		const servers = await fetchAllMcpServers(token);
		const allServers = [];
		for (const server of servers) try {
			if (!server.operationalUrl) continue;
			const mcpServer = {
				id: `@bailian/${server.id}`,
				name: server.name || `Bailian Server ${nanoid()}`,
				description: server.description || "",
				type: server.type,
				baseUrl: server.operationalUrl,
				command: "",
				args: [],
				env: {},
				isActive: server.active,
				provider: server.provider,
				providerUrl: server.providerUrl,
				logoUrl: server.logoUrl || "",
				tags: server.tags || [],
				headers: { Authorization: `Bearer ${token}` }
			};
			allServers.push(mcpServer);
		} catch (err) {
			logger$1.error(`Error processing Bailian server ${server.id}:`, err);
		}
		return {
			success: true,
			message: t("settings.mcp.sync.success", { count: allServers.length }),
			allServers
		};
	} catch (error) {
		let message = "";
		let errorDetails = void 0;
		if (error instanceof Error && error.message === "unauthorized") {
			clearBailianToken();
			message = t("settings.mcp.sync.unauthorized", "Sync Unauthorized");
			logger$1.error("Unauthorized access during sync");
			return {
				success: false,
				message,
				allServers: []
			};
		}
		if (error instanceof Error && error.message === "server_error") {
			message = t("settings.mcp.sync.error");
			errorDetails = "Status: 500";
			logger$1.error("Server error during sync");
			return {
				success: false,
				message,
				allServers: [],
				errorDetails
			};
		}
		logger$1.error("Bailian sync error:", error);
		message = t("settings.mcp.sync.error");
		errorDetails = String(error);
		return {
			success: false,
			message,
			allServers: [],
			errorDetails
		};
	}
};
var logger = loggerService.withContext("ModelScopeSyncUtils");
var TOKEN_STORAGE_KEY = "modelscope_token";
const MODELSCOPE_HOST = "https://www.modelscope.cn";
const saveModelScopeToken = (token) => {
	localStorage.setItem(TOKEN_STORAGE_KEY, token);
};
const getModelScopeToken = () => {
	return localStorage.getItem(TOKEN_STORAGE_KEY);
};
const clearModelScopeToken = () => {
	localStorage.removeItem(TOKEN_STORAGE_KEY);
};
const syncModelScopeServers = async (token) => {
	const t = instance.t;
	try {
		const response = await fetch(`${MODELSCOPE_HOST}/api/v1/mcp/services/operational`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		});
		if (response.status === 401 || response.status === 403) {
			clearModelScopeToken();
			return {
				success: false,
				message: t("settings.mcp.sync.unauthorized", "Sync Unauthorized"),
				allServers: []
			};
		}
		if (response.status === 500 || !response.ok) return {
			success: false,
			message: t("settings.mcp.sync.error"),
			allServers: [],
			errorDetails: `Status: ${response.status}`
		};
		const servers = (await response.json()).Data?.Result || [];
		if (servers.length === 0) return {
			success: true,
			message: t("settings.mcp.sync.noServersAvailable", "No MCP servers available"),
			allServers: []
		};
		const allServers = [];
		logger.debug("ModelScope servers:", servers);
		for (const server of servers) try {
			if (!server.operational_urls?.[0]?.url) continue;
			const url = server.operational_urls[0].url;
			const mcpServer = {
				id: `@modelscope/${server.id}`,
				name: server.chinese_name || server.name || `ModelScope Server ${nanoid()}`,
				description: server.description || "",
				type: getMcpServerType(url),
				baseUrl: url,
				command: "",
				args: [],
				env: {},
				isActive: true,
				provider: "ModelScope",
				providerUrl: `${MODELSCOPE_HOST}/mcp/servers/${server.id}`,
				logoUrl: server.logo_url || "",
				tags: server.tags || []
			};
			allServers.push(mcpServer);
		} catch (err) {
			logger.error("Error processing ModelScope server:", err);
		}
		return {
			success: true,
			message: t("settings.mcp.sync.success", { count: allServers.length }),
			allServers
		};
	} catch (error) {
		logger.error("ModelScope sync error:", error);
		return {
			success: false,
			message: t("settings.mcp.sync.error"),
			allServers: [],
			errorDetails: String(error)
		};
	}
};
const providers = [{
	key: "bailian",
	nameKey: "provider.dashscope",
	discoverUrl: `https://bailian.console.aliyun.com/?tab=mcp#/mcp-market`,
	apiKeyUrl: `https://bailian.console.aliyun.com/?tab=app#/api-key`,
	tokenFieldName: "bailianToken",
	getToken: getBailianToken,
	saveToken: saveBailianToken,
	syncServers: syncBailianServers
}, {
	key: "modelscope",
	nameKey: "ModelScope",
	discoverUrl: `${MODELSCOPE_HOST}/mcp?hosted=1&page=1`,
	apiKeyUrl: `${MODELSCOPE_HOST}/my/myaccesstoken`,
	tokenFieldName: "modelScopeToken",
	getToken: getModelScopeToken,
	saveToken: saveModelScopeToken,
	syncServers: syncModelScopeServers
}];
const getProviderDisplayName = (provider, t) => {
	return provider.nameKey.startsWith("provider.") ? t(provider.nameKey) : provider.nameKey;
};
var MCP_PROVIDER_ICONS = {
	modelscope: ModelscopeIcon,
	bailian: BailianIcon
};
function getMcpProviderLogo(providerKey) {
	return MCP_PROVIDER_ICONS[providerKey];
}
export { getProviderDisplayName as n, providers as r, getMcpProviderLogo as t };
