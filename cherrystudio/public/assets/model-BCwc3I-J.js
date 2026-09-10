import { t as preferenceService } from "./PreferenceService-CvpJqJd7.js";
import { S as SERVER_TOOL, a as isUniqueModelId, o as parseUniqueModelId, x as REASONING_EFFORT_ORDER } from "./model-BOGgSmTN.js";
import { t as dataApiService } from "./DataApiService-Csr1w5Kb.js";
import { i as resolveModelIconRef, r as resolveIconRef } from "./registry-DpmvB1li.js";
import { a as getLowerBaseModelName } from "./naming-BVJSQooI.js";
import { A as isFunctionCallingModel$1, L as isOpenAIModel, c as isBuiltinWebSearchAvailable, v as isServerToolModelEligible, z as isReasoningModel } from "./provider-bQl8RVRp.js";
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
const isOpenAIWebSearchModel = (model) => isOpenAIModel(model) && isServerToolModelEligible(model, { id: "openai" }, SERVER_TOOL.WEB_SEARCH);
export { reconcileReasoningEffortForModel as a, deriveThinkingOptions as c, readQuickModel as i, resolveReasoningEffortForModel as l, getSearchMatchScore as n, reconcileWebSearchForModel as o, readDefaultModel as r, isFunctionCallingModel as s, isOpenAIWebSearchModel as t, getModelLogoRef as u };
