import { i as createUniqueModelId, o as parseUniqueModelId, p as VENDOR_PATTERNS, u as endpointImpliedCapability, v as MODALITY, y as MODEL_CAPABILITY } from "./model-CfoN7z8F.js";
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
export { isVideoModel as C, isManagedCherryAiDefaultModel as D, CHERRYAI_PROVIDER_ID as E, isTextToSpeechModel as S, CHERRYAI_DEFAULT_UNIQUE_MODEL_ID as T, isQwenMTModel as _, isEditImageModel as a, isSpeechToTextModel as b, isFunctionCallingModel as c, isGeminiModel as d, isGenerateAudioModel as f, isOpenAIModel as g, isNonChatModel as h, isAudioModel as i, isGPT5SeriesReasoningModel as l, isGenerateVideoModel as m, getLowerBaseModelName as n, isEmbeddingModel as o, isGenerateImageModel as p, getRawModelId as r, isFreeModel as s, deriveModelGroupName as t, isGatewayRoutableModel as u, isReasoningModel as v, isVisionModel as w, isTextToImageModel as x, isRerankModel as y };
