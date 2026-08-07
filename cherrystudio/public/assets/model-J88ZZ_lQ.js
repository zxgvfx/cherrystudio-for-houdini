import { t as preferenceService } from "./PreferenceService-Ba0ofBX2.js";
import { C as SERVER_TOOL_MODEL_SCOPE, S as SERVER_TOOL, _ as ENDPOINT_TYPE, a as isUniqueModelId, c as isWebSearchEffortUnsupported, l as supportsServerToolFunctionMixing, m as matchVendor, o as parseUniqueModelId, s as isServerToolModelEligible$1, x as REASONING_EFFORT_ORDER } from "./model-CfoN7z8F.js";
import { t as dataApiService } from "./DataApiService-DP44jQXR.js";
import { i as resolveModelIconRef, r as resolveIconRef } from "./registry-8iQY-Y1a.js";
import { C as isVideoModel$1, E as CHERRYAI_PROVIDER_ID, c as isFunctionCallingModel$1, d as isGeminiModel, g as isOpenAIModel, h as isNonChatModel, i as isAudioModel$1, l as isGPT5SeriesReasoningModel$1, n as getLowerBaseModelName$1, r as getRawModelId, v as isReasoningModel, w as isVisionModel$1 } from "./model-D4kd6G9w.js";
const getDefaultGroupName = (id, provider) => {
	const str = id.toLowerCase();
	let firstDelimiters = [
		"/",
		" ",
		":"
	];
	let secondDelimiters = ["-", "_"];
	if (provider && [
		"aihubmix",
		"silicon",
		"ocoolai",
		"o3",
		"dmxapi"
	].includes(provider.toLowerCase())) {
		firstDelimiters = [
			"/",
			" ",
			"-",
			"_",
			":"
		];
		secondDelimiters = [];
	}
	for (const delimiter of firstDelimiters) if (str.includes(delimiter)) return str.split(delimiter)[0];
	for (const delimiter of secondDelimiters) if (str.includes(delimiter)) {
		const parts = str.split(delimiter);
		return parts.length > 1 ? parts[0] + "-" + parts[1] : parts[0];
	}
	return str;
};
const getBaseModelName = (id, delimiter = "/") => {
	const parts = id.split(delimiter);
	return parts[parts.length - 1];
};
const getLowerBaseModelName = (id, delimiter = "/") => {
	let baseModelName = getBaseModelName(id.toLowerCase().startsWith("accounts/fireworks/models/") ? id.replace(/(\d)p(?=\d)/g, "$1.") : id, delimiter).toLowerCase();
	if (baseModelName.endsWith(":free")) baseModelName = baseModelName.replace(":free", "");
	if (baseModelName.endsWith("(free)")) baseModelName = baseModelName.replace("(free)", "");
	if (baseModelName.endsWith(":cloud")) baseModelName = baseModelName.replace(":cloud", "");
	return baseModelName;
};
var EMOJI_PART_PATTERN = String.raw`(?:\p{Emoji}\uFE0F|\p{Emoji_Presentation})(?:\p{Emoji_Modifier})?`;
var KEYCAP_EMOJI_PATTERN = String.raw`(?:[0-9#*]\uFE0F?\u20E3)`;
var REGIONAL_FLAG_EMOJI_PATTERN = String.raw`(?:\p{Regional_Indicator}{2})`;
var EMOJI_SEQUENCE_PATTERN = String.raw`(?:${EMOJI_PART_PATTERN}(?:\u200D${EMOJI_PART_PATTERN})*)`;
var EMOJI_CLUSTER_PATTERN = String.raw`(?:${KEYCAP_EMOJI_PATTERN}|${REGIONAL_FLAG_EMOJI_PATTERN}|${EMOJI_SEQUENCE_PATTERN})`;
var EMOJI_REGEX = new RegExp(`^(?:${EMOJI_CLUSTER_PATTERN})+$`, "u");
var EMOJI_LEADING_REGEX = new RegExp(`^(?:${EMOJI_CLUSTER_PATTERN})+`, "u");
var FIRST_LETTER_OR_EMOJI_REGEX = new RegExp(`${EMOJI_CLUSTER_PATTERN}|\\p{L}\\p{M}*`, "u");
function firstLetter(str) {
	const match = str?.match(FIRST_LETTER_OR_EMOJI_REGEX);
	return match ? match[0] : "";
}
function removeLeadingEmoji(str) {
	return str.replace(EMOJI_LEADING_REGEX, "").trim();
}
function getLeadingEmoji(str) {
	const match = str.match(EMOJI_LEADING_REGEX);
	return match ? match[0] : "";
}
function isEmoji(str) {
	if (str.startsWith("data:")) return false;
	if (str.startsWith("http")) return false;
	return EMOJI_REGEX.test(str);
}
function removeSpecialCharactersForTopicName(str) {
	return str.replace(/["'\r\n]+/g, " ").trim();
}
function getFirstCharacter(str) {
	for (const char of str) return char;
	return "";
}
var PRIMARY_CHAT_ENDPOINT_PRIORITY = [
	ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS,
	ENDPOINT_TYPE.OPENAI_RESPONSES,
	ENDPOINT_TYPE.ANTHROPIC_MESSAGES,
	ENDPOINT_TYPE.GOOGLE_GENERATE_CONTENT,
	ENDPOINT_TYPE.OLLAMA_CHAT
];
function hasEndpointConfig(provider, endpoint) {
	return Object.prototype.hasOwnProperty.call(provider?.endpointConfigs ?? {}, endpoint);
}
function resolvePrimaryEndpoint(provider) {
	if (provider?.defaultChatEndpoint) return provider.defaultChatEndpoint;
	for (const endpoint of PRIMARY_CHAT_ENDPOINT_PRIORITY) if (hasEndpointConfig(provider, endpoint)) return endpoint;
	return ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS;
}
function getProviderHostTopology(provider) {
	const primaryEndpoint = resolvePrimaryEndpoint(provider);
	return {
		primaryEndpoint,
		primaryBaseUrl: provider?.endpointConfigs?.[primaryEndpoint]?.baseUrl ?? "",
		anthropicBaseUrl: provider?.endpointConfigs?.[ENDPOINT_TYPE.ANTHROPIC_MESSAGES]?.baseUrl ?? "",
		hasAnthropicEndpoint: hasEndpointConfig(provider, ENDPOINT_TYPE.ANTHROPIC_MESSAGES)
	};
}
function isVertexProvider(provider) {
	return provider.authType === "iam-gcp";
}
function isAzureOpenAIProvider(provider) {
	return provider.authType === "iam-azure";
}
function isAwsBedrockProvider(provider) {
	return provider.authType === "iam-aws" || provider.authType === "api-key-aws";
}
function isOllamaProvider(provider) {
	return provider.id === "ollama" || provider.presetProviderId === "ollama" || provider.defaultChatEndpoint === ENDPOINT_TYPE.OLLAMA_CHAT;
}
const OLLAMA_PLACEHOLDER_AUTH_TOKEN = "ollama";
function isGeminiProvider(provider) {
	return (provider.id === "google" || provider.id === "gemini" || provider.presetProviderId === "gemini" || provider.defaultChatEndpoint === ENDPOINT_TYPE.GOOGLE_GENERATE_CONTENT) && provider.authType !== "iam-gcp";
}
function isAnthropicProvider(provider) {
	return provider.presetProviderId === "anthropic" || provider.id === "anthropic" || provider.defaultChatEndpoint === ENDPOINT_TYPE.ANTHROPIC_MESSAGES;
}
function isOpenAIProvider(provider) {
	return provider.defaultChatEndpoint === ENDPOINT_TYPE.OPENAI_RESPONSES;
}
function isOpenAIChatProvider(provider) {
	return provider.defaultChatEndpoint === ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS;
}
function isOpenAICompatibleProvider(provider) {
	return provider.defaultChatEndpoint === ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS || provider.defaultChatEndpoint === ENDPOINT_TYPE.OPENAI_RESPONSES || provider.presetProviderId === "new-api" || provider.presetProviderId === "mistral";
}
function isPerplexityProvider(provider) {
	return provider.id === "perplexity" || provider.presetProviderId === "perplexity";
}
function isCherryAIProvider(provider) {
	return provider.id === "cherryai" || provider.presetProviderId === "cherryai";
}
function isNewApiProvider(provider) {
	return matchesPreset(provider, "new-api") || matchesPreset(provider, "cherryin") || matchesPreset(provider, "aionly");
}
function isGeminiWebSearchProvider(provider) {
	return isGeminiProvider(provider) || isVertexProvider(provider);
}
function servesGeminiNativeWebTools(provider) {
	if (isGeminiWebSearchProvider(provider)) return true;
	return (provider.serverTools ?? []).some((tool) => tool.vendors?.includes("gemini"));
}
function isSystemProvider(provider) {
	return provider.presetProviderId != null;
}
function matchesPreset(provider, presetId) {
	return provider.id === presetId || provider.presetProviderId === presetId;
}
function canManageProvider(provider) {
	if (provider.settings?.isCentralized) return false;
	return provider.presetProviderId == null || provider.presetProviderId !== provider.id;
}
const API_KEY_OAUTH_PROVIDER_IDS = [
	"302ai",
	"silicon",
	"aihubmix",
	"ppio",
	"aionly"
];
function isProviderSupportAuth(provider) {
	return API_KEY_OAUTH_PROVIDER_IDS.includes(provider.id);
}
function isLoginBasedProvider(provider) {
	const methods = provider.authMethods;
	return methods !== void 0 && methods.length > 0 && !methods.includes("api-key");
}
function isExternalCliProvider(provider) {
	return provider.authMethods?.includes("external-cli") ?? false;
}
function isAnthropicSupportedProvider(provider) {
	return getProviderHostTopology(provider).hasAnthropicEndpoint;
}
function getServerTool(provider, id) {
	return provider.serverTools?.find((tool) => tool.id === id);
}
function serverToolServesModelVendor(tool, model) {
	if (!tool.vendors?.length) return true;
	const vendor = matchVendor(getLowerBaseModelName$1(getRawModelId(model)));
	return vendor !== void 0 && tool.vendors.includes(vendor);
}
function isServerToolModelEligible(model, tool) {
	if (isNonChatModel(model)) return false;
	return isServerToolModelEligible$1(getRawModelId(model), tool);
}
function isBuiltinWebSearchAvailable(model, provider) {
	const tool = getServerTool(provider, SERVER_TOOL.WEB_SEARCH);
	if (!tool || !serverToolServesModelVendor(tool, model)) return false;
	if (tool.modelScope === SERVER_TOOL_MODEL_SCOPE.ALL_CHAT_MODELS) return !isNonChatModel(model);
	return isServerToolModelEligible(model, SERVER_TOOL.WEB_SEARCH);
}
function isBuiltinWebFetchAvailable(model, provider) {
	const tool = getServerTool(provider, SERVER_TOOL.URL_CONTEXT);
	if (!tool || !serverToolServesModelVendor(tool, model)) return false;
	if (tool.modelScope === SERVER_TOOL_MODEL_SCOPE.ALL_CHAT_MODELS) return !isNonChatModel(model);
	return isServerToolModelEligible(model, SERVER_TOOL.URL_CONTEXT);
}
function resolveWebToolRoutes(model, provider, options) {
	const supportsClientTools = isFunctionCallingModel$1(model);
	const clientSearchAvailable = options.webSearchEnabled && supportsClientTools && options.clientSearchAvailable;
	const clientFetchAvailable = options.webSearchEnabled && supportsClientTools && options.clientFetchAvailable;
	const serverSearchEligible = options.webSearchEnabled && provider ? isBuiltinWebSearchAvailable(model, provider) : false;
	const serverFetchEligible = options.webSearchEnabled && provider ? isBuiltinWebFetchAvailable(model, provider) : false;
	const googleToolConflict = options.hasFunctionToolSignals === true && supportsClientTools && provider !== void 0 && servesGeminiNativeWebTools(provider) && isGeminiModel(model) && !supportsServerToolFunctionMixing(getRawModelId(model));
	const openaiMinimalConflict = options.reasoningEffort !== void 0 && provider !== void 0 && (isOpenAIProvider(provider) || isOpenAIChatProvider(provider) || isAzureOpenAIProvider(provider)) && isWebSearchEffortUnsupported(getRawModelId(model), options.reasoningEffort);
	const serverSearchAvailable = serverSearchEligible && !googleToolConflict && !openaiMinimalConflict;
	const serverFetchAvailable = serverFetchEligible && !googleToolConflict;
	const clientAvailable = clientSearchAvailable || clientFetchAvailable;
	const serverAvailable = serverSearchAvailable || serverFetchAvailable;
	const selectedSide = options.clientToolsPreferred ? clientAvailable ? "client" : serverAvailable ? "server" : void 0 : serverAvailable ? "server" : clientAvailable ? "client" : void 0;
	const webSearch = selectedSide === "client" && clientSearchAvailable ? "client" : selectedSide === "server" && serverSearchAvailable ? "server" : "none";
	const webFetch = selectedSide === "client" && clientFetchAvailable ? "client" : selectedSide === "server" && serverFetchAvailable ? "server" : "none";
	const reasons = {};
	if (webSearch === "none") reasons.webSearch = serverSearchEligible && googleToolConflict ? "gemini-function-tool-conflict" : serverSearchEligible && openaiMinimalConflict ? "openai-minimal-reasoning" : options.clientSearchAvailable && !supportsClientTools ? "model-unsupported" : "no-backend";
	if (webFetch === "none") reasons.webFetch = serverFetchEligible && googleToolConflict ? "gemini-function-tool-conflict" : options.clientFetchAvailable && !supportsClientTools ? "model-unsupported" : "no-backend";
	return {
		webSearch,
		webFetch,
		...Object.keys(reasons).length > 0 ? { reasons } : {}
	};
}
function hasApiKeys(provider) {
	return provider.apiKeys.length > 0 && provider.apiKeys.some((k) => k.isEnabled);
}
function sanitizeProviderName(name, fallback) {
	return name.replace(/[^a-zA-Z0-9_\s.-]/g, "").replace(/\s+/g, "-") || fallback;
}
const isGPT5SeriesReasoningModel = (model) => isGPT5SeriesReasoningModel$1(model);
function isVisionModel(model) {
	if (!model) return false;
	return isVisionModel$1(model);
}
const isAudioModel = (model) => isAudioModel$1(model);
const isVideoModel = (model) => isVideoModel$1(model);
const isAudioModels = (models) => models.every(isAudioModel);
const isVideoModels = (models) => models.every(isVideoModel);
function getModelLogoRef(model, providerId) {
	if (!model) return void 0;
	const id = getLowerBaseModelName(model.apiModelId ?? (isUniqueModelId(model.id) ? parseUniqueModelId(model.id).modelId : model.id) ?? "");
	const name = model.name ? getLowerBaseModelName(model.name) : "";
	const pid = providerId ?? model.providerId ?? model.provider;
	if (pid) return resolveIconRef(id, pid) ?? resolveIconRef(name, pid);
	return resolveModelIconRef(id) ?? resolveModelIconRef(name);
}
var EFFORT_ORDER_INDEX = new Map(REASONING_EFFORT_ORDER.map((effort, index) => [effort, index]));
function deriveThinkingOptions(model) {
	if (!isReasoningModel(model)) return void 0;
	const vocabulary = model.reasoning?.selectableEfforts;
	if (!vocabulary?.length) return void 0;
	const rest = vocabulary.filter((effort) => effort !== "none");
	return [
		"default",
		...vocabulary.includes("none") ? ["none"] : [],
		...rest
	];
}
function nearestThinkingOption(target, options) {
	const selectable = options.filter((option) => option !== "default");
	if (selectable.includes(target)) return target;
	const targetIndex = EFFORT_ORDER_INDEX.get(target);
	if (targetIndex === void 0) return selectable[0];
	let best;
	let bestIndex = -1;
	let bestDistance = Number.POSITIVE_INFINITY;
	for (const option of selectable) {
		const index = EFFORT_ORDER_INDEX.get(option);
		if (index === void 0) continue;
		const distance = Math.abs(index - targetIndex);
		if (distance < bestDistance || distance === bestDistance && index > bestIndex) {
			best = option;
			bestIndex = index;
			bestDistance = distance;
		}
	}
	return best ?? selectable[0];
}
function resolveReasoningEffortForModel(model, currentEffort) {
	const supportedOptions = deriveThinkingOptions(model);
	if (!supportedOptions?.some((option) => option !== "default")) return void 0;
	if (currentEffort && supportedOptions.includes(currentEffort)) return currentEffort;
	if (currentEffort !== void 0) return nearestThinkingOption(currentEffort, supportedOptions) ?? supportedOptions[0];
	return supportedOptions[0];
}
function isFunctionCallingModel(model) {
	if (!model) return false;
	return isFunctionCallingModel$1(model);
}
function hasModelBuiltinWebSearch(model, provider) {
	return !!provider && isBuiltinWebSearchAvailable(model, provider);
}
function canModelUseAssistantWebSearch(model, provider) {
	return hasModelBuiltinWebSearch(model, provider) || isFunctionCallingModel(model);
}
function reconcileReasoningEffortForModel(nextModel, currentEffort) {
	const nextEffort = resolveReasoningEffortForModel(nextModel, currentEffort);
	if (nextEffort === currentEffort) return null;
	return { reasoning_effort: nextEffort };
}
function reconcileWebSearchForModel(nextModel, current, provider) {
	if (!current.enableWebSearch) return null;
	if (canModelUseAssistantWebSearch(nextModel, provider)) return null;
	return { enableWebSearch: false };
}
async function readDefaultModel() {
	const id = await preferenceService.get("chat.default_model_id");
	if (!id) return void 0;
	return await dataApiService.get(`/models/${id}`) ?? void 0;
}
async function readQuickModel() {
	const id = await preferenceService.get("feature.quick_assistant.model_id") ?? await preferenceService.get("chat.default_model_id");
	if (!id) return void 0;
	return await dataApiService.get(`/models/${id}`) ?? void 0;
}
function normalizeSearchSegment(value) {
	return value.toLowerCase().replace(/[\s._:/\\-]+/g, "");
}
function getSearchTokens(value) {
	return value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^a-zA-Z0-9]+/).flatMap((segment) => segment.match(/[a-zA-Z]+|\d+/g) ?? []).map((segment) => segment.toLowerCase());
}
function getTokenInitials(value) {
	return getSearchTokens(value).map((token) => token[0]).join("");
}
function getOrderedCharacterMatchSpan(keyword, text) {
	if (!keyword) return null;
	let keywordIndex = 0;
	let startIndex = -1;
	for (let textIndex = 0; textIndex < text.length; textIndex += 1) {
		if (text[textIndex] === keyword[keywordIndex]) {
			if (startIndex === -1) startIndex = textIndex;
			keywordIndex += 1;
		}
		if (keywordIndex === keyword.length) return textIndex - startIndex + 1;
	}
	return null;
}
function getKeywordMatchScore(keyword, fields) {
	const normalizedKeyword = normalizeSearchSegment(keyword);
	if (!normalizedKeyword) return null;
	let bestScore = null;
	for (const field of fields) {
		if (!field.value) continue;
		const textIndex = field.value.toLowerCase().indexOf(keyword);
		if (textIndex !== -1) {
			const score = field.weight * 100 + textIndex;
			bestScore = bestScore === null ? score : Math.min(bestScore, score);
		}
		const normalizedText = normalizeSearchSegment(field.value);
		const normalizedIndex = normalizedText.indexOf(normalizedKeyword);
		if (normalizedIndex !== -1) {
			const score = 1e3 + field.weight * 100 + normalizedIndex;
			bestScore = bestScore === null ? score : Math.min(bestScore, score);
		}
		if (field.allowAbbreviation) {
			const tokenInitialsIndex = getTokenInitials(field.value).indexOf(normalizedKeyword);
			if (tokenInitialsIndex !== -1) {
				const score = 1500 + field.weight * 100 + tokenInitialsIndex;
				bestScore = bestScore === null ? score : Math.min(bestScore, score);
			}
			const abbreviationSpan = getOrderedCharacterMatchSpan(normalizedKeyword, normalizedText);
			if (abbreviationSpan !== null) {
				const score = 2e3 + field.weight * 100 + abbreviationSpan;
				bestScore = bestScore === null ? score : Math.min(bestScore, score);
			}
		}
	}
	return bestScore;
}
function getSearchMatchScore(keywords, fields) {
	const normalizedKeywords = keywords.toLowerCase().split(/\s+/).filter(Boolean);
	if (normalizedKeywords.length === 0) return 0;
	let totalScore = 0;
	for (const keyword of normalizedKeywords) {
		const keywordScore = getKeywordMatchScore(keyword, fields);
		if (keywordScore === null) return null;
		totalScore += keywordScore;
	}
	return totalScore;
}
const isOpenAIWebSearchModel = (model) => isOpenAIModel(model) && isServerToolModelEligible(model, SERVER_TOOL.WEB_SEARCH);
export { isOllamaProvider as A, getProviderHostTopology as B, isAzureOpenAIProvider as C, isGeminiProvider as D, isExternalCliProvider as E, isSystemProvider as F, isEmoji as G, getDefaultGroupName as H, isVertexProvider as I, removeLeadingEmoji as K, matchesPreset as L, isPerplexityProvider as M, isProviderSupportAuth as N, isLoginBasedProvider as O, isServerToolModelEligible as P, resolveWebToolRoutes as R, isAwsBedrockProvider as S, isCherryAIProvider as T, getFirstCharacter as U, firstLetter as V, getLeadingEmoji as W, OLLAMA_PLACEHOLDER_AUTH_TOKEN as _, reconcileReasoningEffortForModel as a, isAnthropicProvider as b, deriveThinkingOptions as c, isAudioModel as d, isAudioModels as f, isGPT5SeriesReasoningModel as g, isVisionModel as h, readQuickModel as i, isOpenAICompatibleProvider as j, isNewApiProvider as k, resolveReasoningEffortForModel as l, isVideoModels as m, getSearchMatchScore as n, reconcileWebSearchForModel as o, isVideoModel as p, removeSpecialCharactersForTopicName as q, readDefaultModel as r, isFunctionCallingModel as s, isOpenAIWebSearchModel as t, getModelLogoRef as u, canManageProvider as v, isBuiltinWebSearchAvailable as w, isAnthropicSupportedProvider as x, hasApiKeys as y, sanitizeProviderName as z };
