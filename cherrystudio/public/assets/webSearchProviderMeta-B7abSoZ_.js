import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { C as string, _ as object, a as array, c as discriminatedUnion, n as _enum, o as boolean, p as literal, y as partialRecord } from "./schemas-CV_EtlSZ.js";
import { d as WEB_SEARCH_PROVIDER_IDS, f as WEB_SEARCH_PROVIDER_TYPES, u as WEB_SEARCH_CAPABILITIES } from "./PreferenceService-uLlqCRc6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as usePreference, t as useMultiplePreferences } from "./usePreference-yBX61WcV.js";
import { a as FirecrawlIcon, i as JinaIcon, n as SearxngIcon, o as ExaIcon, r as QueritIcon, s as BochaIcon, t as TavilyIcon } from "./tavily-D_vAToMR.js";
import { t as CherryinIcon } from "./cherryin-71veRWFJ.js";
import { t as ZhipuIcon } from "./zhipu-Dv2udDow.js";
const WebSearchProviderTypeSchema = _enum(WEB_SEARCH_PROVIDER_TYPES);
const WebSearchProviderIdSchema = _enum(WEB_SEARCH_PROVIDER_IDS);
_enum(WEB_SEARCH_CAPABILITIES);
const WebSearchProviderFeatureCapabilitySchema = discriminatedUnion("feature", [object({
	feature: literal("searchKeywords"),
	requiresApiHost: boolean(),
	requiresApiKey: boolean(),
	apiHost: string().optional()
}).strict(), object({
	feature: literal("fetchUrls"),
	requiresApiHost: boolean(),
	requiresApiKey: boolean(),
	apiHost: string().optional()
}).strict()]);
object({
	id: WebSearchProviderIdSchema,
	name: string(),
	type: WebSearchProviderTypeSchema,
	capabilities: array(WebSearchProviderFeatureCapabilitySchema).min(1)
});
partialRecord(WebSearchProviderIdSchema, object({
	apiKeys: array(string()).optional(),
	capabilities: object({
		searchKeywords: object({ apiHost: string().optional() }).strict().optional(),
		fetchUrls: object({ apiHost: string().optional() }).strict().optional()
	}).strict().optional(),
	engines: array(string()).optional(),
	basicAuthUsername: string().optional(),
	basicAuthPassword: string().optional()
}));
const WebSearchProviderCapabilityOverrideSchema = object({ apiHost: string().optional() }).strict();
object({
	searchKeywords: WebSearchProviderCapabilityOverrideSchema.optional(),
	fetchUrls: WebSearchProviderCapabilityOverrideSchema.optional()
}).strict();
const WEB_SEARCH_PROVIDER_PRESET_MAP = {
	zhipu: {
		name: "Zhipu",
		type: "api",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: true,
			apiHost: "https://open.bigmodel.cn/api/paas/v4/web_search"
		}]
	},
	tavily: {
		name: "Tavily",
		type: "api",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: true,
			apiHost: "https://api.tavily.com"
		}]
	},
	searxng: {
		name: "Searxng",
		type: "api",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: false,
			apiHost: "http://localhost:8080"
		}]
	},
	exa: {
		name: "Exa",
		type: "api",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: true,
			apiHost: "https://api.exa.ai"
		}]
	},
	"exa-mcp": {
		name: "ExaMCP",
		type: "mcp",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: false,
			apiHost: "https://mcp.exa.ai/mcp"
		}]
	},
	bocha: {
		name: "Bocha",
		type: "api",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: true,
			apiHost: "https://api.bochaai.com"
		}]
	},
	querit: {
		name: "Querit",
		type: "api",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: true,
			apiHost: "https://api.querit.ai"
		}]
	},
	fetch: {
		name: "fetch",
		type: "api",
		capabilities: [{
			feature: "fetchUrls",
			requiresApiHost: false,
			requiresApiKey: false
		}]
	},
	jina: {
		name: "Jina",
		type: "api",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: true,
			apiHost: "https://s.jina.ai"
		}, {
			feature: "fetchUrls",
			requiresApiHost: true,
			requiresApiKey: false,
			apiHost: "https://r.jina.ai"
		}]
	},
	firecrawl: {
		name: "Firecrawl",
		type: "api",
		capabilities: [{
			feature: "searchKeywords",
			requiresApiHost: true,
			requiresApiKey: false,
			apiHost: "https://api.firecrawl.dev"
		}]
	}
};
const PRESETS_WEB_SEARCH_PROVIDERS = WEB_SEARCH_PROVIDER_IDS.map((id) => ({
	id,
	...WEB_SEARCH_PROVIDER_PRESET_MAP[id]
}));
function isWebSearchProviderReady(provider, feature) {
	if (!provider) return false;
	const capability = provider.capabilities.find((candidate) => candidate.feature === feature);
	if (!capability) return false;
	if (capability.requiresApiHost) {
		const apiHost = capability.apiHost?.trim();
		if (!apiHost) return false;
		try {
			const protocol = new URL(apiHost).protocol;
			if (protocol !== "http:" && protocol !== "https:") return false;
		} catch {
			return false;
		}
	}
	return !capability.requiresApiKey || provider.apiKeys.some((apiKey) => apiKey.trim().length > 0);
}
const DEFAULT_WEB_SEARCH_CUTOFF_LIMIT = 2e3;
function normalizeWebSearchCutoffLimit(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : DEFAULT_WEB_SEARCH_CUTOFF_LIMIT;
}
var import_react = /* @__PURE__ */ __toESM(require_react());
loggerService.withContext("useWebSearch");
var WEB_SEARCH_SETTINGS_PREFERENCE_KEYS = {
	clientToolsPreferred: "chat.web_search.client_tools_preferred",
	excludeDomains: "chat.web_search.exclude_domains",
	maxResults: "chat.web_search.max_results",
	compressionMethod: "chat.web_search.compression.method",
	cutoffLimit: "chat.web_search.compression.cutoff_limit"
};
function buildWebSearchSettingsState(preferences) {
	return {
		clientToolsPreferred: preferences.clientToolsPreferred,
		maxResults: Math.max(1, preferences.maxResults),
		excludeDomains: preferences.excludeDomains,
		compressionConfig: {
			method: preferences.compressionMethod,
			cutoffLimit: normalizeWebSearchCutoffLimit(preferences.cutoffLimit)
		}
	};
}
function trimString(value) {
	return value.trim();
}
function trimStringList(values) {
	return values.map(trimString).filter(Boolean);
}
const useWebSearchProviders = () => {
	const [providerOverrides, setProviderOverrides] = usePreference("chat.web_search.provider_overrides", { optimistic: false });
	const [defaultSearchKeywordsProviderId, setDefaultSearchKeywordsProviderId] = usePreference("chat.web_search.default_search_keywords_provider");
	const [defaultFetchUrlsProviderId, setDefaultFetchUrlsProviderId] = usePreference("chat.web_search.default_fetch_urls_provider");
	const providers = (0, import_react.useMemo)(() => {
		return PRESETS_WEB_SEARCH_PROVIDERS.map((preset) => {
			const override = providerOverrides[preset.id];
			return {
				...preset,
				apiKeys: trimStringList(override?.apiKeys ?? []),
				capabilities: preset.capabilities.map((capability) => {
					const capabilityOverride = override?.capabilities?.[capability.feature];
					return {
						...capability,
						..."apiHost" in capability && capabilityOverride?.apiHost !== void 0 ? { apiHost: trimString(capabilityOverride.apiHost) } : {}
					};
				}),
				engines: trimStringList(override?.engines ?? []),
				basicAuthUsername: trimString(override?.basicAuthUsername ?? ""),
				basicAuthPassword: trimString(override?.basicAuthPassword ?? "")
			};
		});
	}, [providerOverrides]);
	const defaultSearchKeywordsProvider = (0, import_react.useMemo)(() => providers.find((item) => item.id === defaultSearchKeywordsProviderId), [defaultSearchKeywordsProviderId, providers]);
	const defaultFetchUrlsProvider = (0, import_react.useMemo)(() => providers.find((item) => item.id === defaultFetchUrlsProviderId), [defaultFetchUrlsProviderId, providers]);
	const updateProvider = (0, import_react.useCallback)(async (providerId, patch) => {
		await setProviderOverrides({
			...providerOverrides,
			[providerId]: {
				...providerOverrides[providerId],
				...patch
			}
		});
	}, [providerOverrides, setProviderOverrides]);
	return {
		providerOverrides,
		providers,
		defaultSearchKeywordsProvider,
		defaultFetchUrlsProvider,
		getProvider: (0, import_react.useCallback)((providerId) => providers.find((provider) => provider.id === providerId), [providers]),
		updateProvider,
		setApiKeys: (0, import_react.useCallback)((providerId, apiKeys) => {
			return updateProvider(providerId, { apiKeys: trimStringList(apiKeys) });
		}, [updateProvider]),
		setCapabilityApiHost: (0, import_react.useCallback)((providerId, capability, apiHost) => {
			return updateProvider(providerId, { capabilities: {
				...providerOverrides[providerId]?.capabilities,
				[capability]: {
					...providerOverrides[providerId]?.capabilities?.[capability],
					apiHost: trimString(apiHost)
				}
			} });
		}, [providerOverrides, updateProvider]),
		setEngines: (0, import_react.useCallback)((providerId, engines) => {
			return updateProvider(providerId, { engines: trimStringList(engines) });
		}, [updateProvider]),
		setBasicAuth: (0, import_react.useCallback)((providerId, patch) => {
			const currentOverride = providerOverrides[providerId];
			const basicAuthUsername = patch.username !== void 0 ? trimString(patch.username) : trimString(currentOverride?.basicAuthUsername ?? "");
			const basicAuthPassword = patch.password !== void 0 ? trimString(patch.password) : trimString(currentOverride?.basicAuthPassword ?? "");
			return updateProvider(providerId, {
				basicAuthUsername,
				basicAuthPassword: basicAuthUsername ? basicAuthPassword : ""
			});
		}, [providerOverrides, updateProvider]),
		setDefaultSearchKeywordsProvider: (provider) => {
			return setDefaultSearchKeywordsProviderId(provider.id);
		},
		setDefaultFetchUrlsProvider: (provider) => {
			return setDefaultFetchUrlsProviderId(provider.id);
		}
	};
};
const useWebSearchSettings = () => {
	const [preferences, setPreferences] = useMultiplePreferences(WEB_SEARCH_SETTINGS_PREFERENCE_KEYS);
	const state = buildWebSearchSettingsState(preferences);
	return {
		...state,
		setClientToolsPreferred: (value) => {
			return setPreferences({ clientToolsPreferred: value });
		},
		setExcludeDomains: (value) => {
			return setPreferences({ excludeDomains: value });
		},
		setMaxResults: (value) => {
			return setPreferences({ maxResults: value });
		},
		setCompressionConfig: (config) => {
			return setPreferences({
				compressionMethod: config.method,
				cutoffLimit: normalizeWebSearchCutoffLimit(config.cutoffLimit)
			});
		},
		updateCompressionConfig: (config) => {
			const nextConfig = {
				...state.compressionConfig,
				...config,
				cutoffLimit: config.cutoffLimit !== void 0 ? config.cutoffLimit : state.compressionConfig.cutoffLimit
			};
			return setPreferences({
				compressionMethod: nextConfig.method,
				cutoffLimit: normalizeWebSearchCutoffLimit(nextConfig.cutoffLimit)
			});
		}
	};
};
var WEB_SEARCH_CAPABILITY_ORDER = ["searchKeywords", "fetchUrls"];
var WEB_SEARCH_PROVIDER_DISPLAY_META = {
	bocha: {
		descriptionKey: "settings.tool.websearch.provider_description.bocha",
		logo: BochaIcon,
		officialWebsite: "https://bochaai.com",
		apiKeyWebsite: "https://open.bochaai.com/overview"
	},
	exa: {
		descriptionKey: "settings.tool.websearch.provider_description.exa",
		logo: ExaIcon,
		officialWebsite: "https://exa.ai",
		apiKeyWebsite: "https://dashboard.exa.ai/api-keys"
	},
	"exa-mcp": {
		descriptionKey: "settings.tool.websearch.provider_description.exa_mcp",
		logo: ExaIcon,
		officialWebsite: "https://exa.ai"
	},
	fetch: {
		descriptionKey: "settings.tool.websearch.provider_description.fetch",
		logo: CherryinIcon
	},
	jina: {
		descriptionKey: "settings.tool.websearch.provider_description.jina",
		logo: JinaIcon,
		officialWebsite: "https://jina.ai/reader",
		apiKeyWebsite: "https://jina.ai"
	},
	querit: {
		descriptionKey: "settings.tool.websearch.provider_description.querit",
		logo: QueritIcon,
		officialWebsite: "https://querit.ai",
		apiKeyWebsite: "https://www.querit.ai/en/dashboard/api-keys"
	},
	searxng: {
		descriptionKey: "settings.tool.websearch.provider_description.searxng",
		logo: SearxngIcon,
		officialWebsite: "https://docs.searxng.org"
	},
	tavily: {
		descriptionKey: "settings.tool.websearch.provider_description.tavily",
		logo: TavilyIcon,
		officialWebsite: "https://tavily.com",
		apiKeyWebsite: "https://app.tavily.com/home"
	},
	zhipu: {
		descriptionKey: "settings.tool.websearch.provider_description.zhipu",
		logo: ZhipuIcon,
		officialWebsite: "https://docs.bigmodel.cn/cn/guide/tools/web-search",
		apiKeyWebsite: "https://zhipuaishengchan.datasink.sensorsdata.cn/t/yv"
	},
	firecrawl: {
		descriptionKey: "settings.tool.websearch.provider_description.firecrawl",
		logo: FirecrawlIcon,
		officialWebsite: "https://firecrawl.dev",
		apiKeyWebsite: "https://firecrawl.dev/app/api-keys"
	}
};
function getWebSearchProviderDescriptionKey(providerId) {
	return WEB_SEARCH_PROVIDER_DISPLAY_META[providerId].descriptionKey;
}
function getWebSearchProviderLogo(providerId) {
	return WEB_SEARCH_PROVIDER_DISPLAY_META[providerId].logo;
}
function getWebSearchProviderOfficialWebsite(providerId) {
	return WEB_SEARCH_PROVIDER_DISPLAY_META[providerId].officialWebsite;
}
function getWebSearchProviderApiKeyWebsite(providerId) {
	return WEB_SEARCH_PROVIDER_DISPLAY_META[providerId].apiKeyWebsite;
}
function getWebSearchCapabilityTitleKey(capability) {
	return capability === "fetchUrls" ? "settings.tool.websearch.fetch_urls_provider" : "settings.tool.websearch.search_provider";
}
function createWebSearchMenuEntry(provider, capability) {
	const providerCapability = provider.capabilities.find((item) => item.feature === capability);
	if (!providerCapability) return null;
	return {
		key: `${capability}:${provider.id}`,
		capability,
		provider,
		providerCapability
	};
}
function getWebSearchFeatureSections(providers) {
	return WEB_SEARCH_CAPABILITY_ORDER.map((capability) => {
		return {
			capability,
			entries: providers.map((provider) => createWebSearchMenuEntry(provider, capability)).filter((entry) => Boolean(entry))
		};
	}).filter((section) => section.entries.length > 0);
}
export { getWebSearchProviderLogo as a, useWebSearchSettings as c, getWebSearchProviderDescriptionKey as i, DEFAULT_WEB_SEARCH_CUTOFF_LIMIT as l, getWebSearchFeatureSections as n, getWebSearchProviderOfficialWebsite as o, getWebSearchProviderApiKeyWebsite as r, useWebSearchProviders as s, getWebSearchCapabilityTitleKey as t, isWebSearchProviderReady as u };
