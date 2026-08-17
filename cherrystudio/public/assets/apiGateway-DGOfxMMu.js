import { J as isManagedCherryAiDefaultModel } from "./provider-B43PumwQ.js";
function formatGatewayModelId(providerId, apiModelId) {
	if (providerId.includes(":")) throw new Error(`Provider id "${providerId}" contains ":" and cannot be addressed through the API gateway`);
	if (isManagedCherryAiDefaultModel(providerId, apiModelId)) throw new Error("CherryAI managed default model is not available through the API gateway");
	return `${providerId}:${apiModelId}`;
}
const GEMINI_GATEWAY_MODEL_SUFFIX = "@cherry";
function stripGeminiGatewayModelSuffix(model) {
	return model.endsWith("@cherry") ? model.slice(0, -7) : model;
}
export { formatGatewayModelId as n, stripGeminiGatewayModelSuffix as r, GEMINI_GATEWAY_MODEL_SUFFIX as t };
