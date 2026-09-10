import { o as parseUniqueModelId } from "./model-BOGgSmTN.js";
import { E as isAudioModel, G as isVisionModel, P as isGenerateImageModel, W as isVideoModel, j as isGPT5SeriesReasoningModel } from "./provider-bQl8RVRp.js";
const isGPT5SeriesReasoningModel$1 = (model) => isGPT5SeriesReasoningModel(model);
const isGenerateImageModel$1 = (model) => !!model && isGenerateImageModel(model);
function isVisionModel$1(model) {
	if (!model) return false;
	return isVisionModel(model);
}
const getRawModelId = (model) => model.apiModelId ?? parseUniqueModelId(model.id).modelId;
const isAudioModel$1 = (model) => isAudioModel(model);
const isVideoModel$1 = (model) => isVideoModel(model);
const isAudioModels = (models) => models.every(isAudioModel$1);
const isVideoModels = (models) => models.every(isVideoModel$1);
export { isVideoModels as a, isGPT5SeriesReasoningModel$1 as c, isVideoModel$1 as i, isAudioModel$1 as n, isGenerateImageModel$1 as o, isAudioModels as r, isVisionModel$1 as s, getRawModelId as t };
