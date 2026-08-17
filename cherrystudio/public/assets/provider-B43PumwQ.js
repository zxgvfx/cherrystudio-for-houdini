import { C as SERVER_TOOL_MODEL_SCOPE, S as SERVER_TOOL, _ as ENDPOINT_TYPE, c as isWebSearchEffortUnsupported, i as createUniqueModelId, l as supportsServerToolFunctionMixing, m as matchVendor, o as parseUniqueModelId, p as VENDOR_PATTERNS, s as isServerToolModelEligible, u as endpointImpliedCapability, v as MODALITY, y as MODEL_CAPABILITY } from "./model-DbPSoCMM.js";
const CHERRYAI_PROVIDER_ID = "cherryai";
const CHERRYAI_DEFAULT_UNIQUE_MODEL_ID = createUniqueModelId(CHERRYAI_PROVIDER_ID, "qwen");
function isManagedCherryAiDefaultModel(providerId, modelId) {
	return providerId === "cherryai" && modelId === "qwen";
}
const isReasoningModel = (model) => model.capabilities.includes(MODEL_CAPABILITY.REASONING) || model.reasoning != null;
const isVisionModel = (model) => !!(model.capabilities.includes(MODEL_CAPABILITY.IMAGE_RECOGNITION) || model.inputModalities?.includes(MODALITY.IMAGE));
const isVideoModel = (model) => !!(model.capabilities.includes(MODEL_CAPABILITY.VIDEO_RECOGNITION) || model.inputModalities?.includes(MODALITY.VIDEO));
const isAudioModel = (model) => !!(model.capabilities.includes(MODEL_CAPABILITY.AUDIO_RECOGNITION) || model.inputModalities?.includes(MODALITY.AUDIO));
const isEmbeddingModel = (model) => model.capabilities.includes(MODEL_CAPABILITY.EMBEDDING);
const isRerankModel = (model) => model.capabilities?.includes(MODEL_CAPABILITY.RERANK) ?? false;
const isFunctionCallingModel = (model) => model.capabilities.includes(MODEL_CAPABILITY.FUNCTION_CALL);
const isGenerateImageModel = (model) => model.capabilities.includes(MODEL_CAPABILITY.IMAGE_GENERATION);
const isFreeModel = (model) => {
	if (model.providerId === "cherryai") return true;
	return (model.id + model.name).toLowerCase().includes("free");
};
const isGenerateVideoModel = (model) => !!model.capabilities.includes(MODEL_CAPABILITY.VIDEO_GENERATION);
const isGenerateAudioModel = (model) => !!model.capabilities.includes(MODEL_CAPABILITY.AUDIO_GENERATION);
const isEditImageModel = (model) => !!(model.capabilities.includes(MODEL_CAPABILITY.IMAGE_GENERATION) && model.inputModalities?.includes(MODALITY.IMAGE));
const isSpeechToTextModel = (model) => model.capabilities.includes(MODEL_CAPABILITY.AUDIO_TRANSCRIPT) || model.capabilities.includes(MODEL_CAPABILITY.AUDIO_RECOGNITION) && model.inputModalities?.includes(MODALITY.AUDIO) === true && !model.inputModalities.includes(MODALITY.TEXT) && model.outputModalities?.includes(MODALITY.TEXT) === true;
const isTextToSpeechModel = (model) => model.capabilities.includes(MODEL_CAPABILITY.AUDIO_GENERATION);
const isTextToImageModel = (model) => model.capabilities.includes(MODEL_CAPABILITY.IMAGE_GENERATION) && !model.capabilities.includes(MODEL_CAPABILITY.REASONING);
const isNonChatModel = (model) => endpointImpliedCapability(model.endpointTypes?.[0]) != null || isEmbeddingModel(model) || isRerankModel(model) || isGenerateImageModel(model) || isGenerateVideoModel(model) || isGenerateAudioModel(model) || isTextToSpeechModel(model) || isSpeechToTextModel(model);
const isGatewayRoutableModel = (model) => {
	if (model.providerId.includes(":") || isNonChatModel(model)) return false;
	return !isManagedCherryAiDefaultModel(model.providerId, getRawModelId(model));
};
const isGeminiModel = (model) => VENDOR_PATTERNS.gemini.test(getLowerBaseModelName(getRawModelId(model)));
const isOpenAIModel = (model) => VENDOR_PATTERNS.openai.test(getLowerBaseModelName(getRawModelId(model)));
const isGPT5SeriesModel = (model) => /gpt-5(?!\.\d)/.test(getLowerBaseModelName(getRawModelId(model)));
const isQwenMTModel = (model) => getLowerBaseModelName(getRawModelId(model)).includes("qwen-mt");
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
function deriveModelGroupName(modelId) {
	const normalizedId = modelId.trim();
	const pathParts = normalizedId.split("/");
	if (pathParts.length > 1) return pathParts[0]?.trim() || void 0;
	const familyName = normalizedId.split("-")[0]?.trim();
	return familyName && familyName !== normalizedId ? familyName : void 0;
}
function getRawModelId(model) {
	return model.apiModelId ?? parseUniqueModelId(model.id).modelId;
}
const isGPT5SeriesReasoningModel = (model) => isGPT5SeriesModel(model) && isReasoningModel(model);
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
	const vendor = matchVendor(getLowerBaseModelName(getRawModelId(model)));
	return vendor !== void 0 && tool.vendors.includes(vendor);
}
function serverToolServesEndpoint(tool, endpointType) {
	if (!tool.endpointTypes?.length) return true;
	return endpointType !== void 0 && tool.endpointTypes.includes(endpointType);
}
function resolveServerToolEndpoint(model, provider, endpointType) {
	return endpointType ?? model.endpointTypes?.[0] ?? provider.defaultChatEndpoint;
}
function isServerToolModelEligible$1(model, provider, tool) {
	if (isNonChatModel(model)) return false;
	return isServerToolModelEligible(getRawModelId(model), provider.presetProviderId ?? provider.id, tool);
}
function isBuiltinWebSearchAvailable(model, provider, endpointType) {
	const tool = getServerTool(provider, SERVER_TOOL.WEB_SEARCH);
	if (!tool || !serverToolServesModelVendor(tool, model) || !serverToolServesEndpoint(tool, resolveServerToolEndpoint(model, provider, endpointType))) return false;
	if (tool.modelScope === SERVER_TOOL_MODEL_SCOPE.ALL_CHAT_MODELS) return !isNonChatModel(model);
	return isServerToolModelEligible$1(model, provider, SERVER_TOOL.WEB_SEARCH);
}
function isBuiltinWebFetchAvailable(model, provider, endpointType) {
	const tool = getServerTool(provider, SERVER_TOOL.URL_CONTEXT);
	if (!tool || !serverToolServesModelVendor(tool, model) || !serverToolServesEndpoint(tool, resolveServerToolEndpoint(model, provider, endpointType))) return false;
	if (tool.modelScope === SERVER_TOOL_MODEL_SCOPE.ALL_CHAT_MODELS) return !isNonChatModel(model);
	return isServerToolModelEligible$1(model, provider, SERVER_TOOL.URL_CONTEXT);
}
function resolveWebToolRoutes(model, provider, options) {
	const supportsClientTools = isFunctionCallingModel(model);
	const clientSearchAvailable = options.webSearchEnabled && supportsClientTools && options.clientSearchAvailable;
	const clientFetchAvailable = options.webSearchEnabled && supportsClientTools && options.clientFetchAvailable;
	const serverSearchEligible = options.webSearchEnabled && provider ? isBuiltinWebSearchAvailable(model, provider, options.endpointType) : false;
	const serverFetchEligible = options.webSearchEnabled && provider ? isBuiltinWebFetchAvailable(model, provider, options.endpointType) : false;
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
export { isFunctionCallingModel as A, isRerankModel as B, sanitizeProviderName as C, isEditImageModel as D, isAudioModel as E, isGenerateVideoModel as F, isVisionModel as G, isTextToImageModel as H, isNonChatModel as I, isManagedCherryAiDefaultModel as J, CHERRYAI_DEFAULT_UNIQUE_MODEL_ID as K, isOpenAIModel as L, isGatewayRoutableModel as M, isGenerateAudioModel as N, isEmbeddingModel as O, isGenerateImageModel as P, isQwenMTModel as R, resolveWebToolRoutes as S, deriveModelGroupName as T, isTextToSpeechModel as U, isSpeechToTextModel as V, isVideoModel as W, isProviderSupportAuth as _, isAnthropicSupportedProvider as a, isVertexProvider as b, isBuiltinWebSearchAvailable as c, isGeminiProvider as d, isLoginBasedProvider as f, isPerplexityProvider as g, isOpenAICompatibleProvider as h, isAnthropicProvider as i, isGPT5SeriesReasoningModel as j, isFreeModel as k, isCherryAIProvider as l, isOllamaProvider as m, canManageProvider as n, isAwsBedrockProvider as o, isNewApiProvider as p, CHERRYAI_PROVIDER_ID as q, hasApiKeys as r, isAzureOpenAIProvider as s, OLLAMA_PLACEHOLDER_AUTH_TOKEN as t, isExternalCliProvider as u, isServerToolModelEligible$1 as v, getProviderHostTopology as w, matchesPreset as x, isSystemProvider as y, isReasoningModel as z };
