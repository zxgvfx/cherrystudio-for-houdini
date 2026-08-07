import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { s as getErrorMessage } from "./error-DgGhUgCT.js";
import { t as preferenceService } from "./PreferenceService-Ba0ofBX2.js";
import { t as isArrayLike } from "./isArrayLike-qCM8LrC4.js";
import { t as toArray } from "./toArray-DryE-6I0.js";
import { i as toInteger } from "./getSymbolsIn-BtmoyFWl.js";
import { a as defaultLanguage, r as resolver_default } from "./resolver-DYDQGqns.js";
import { E as convertReferencesToCitations, M as purifyMarkdownImages, i as toExportableCitations } from "./citations-B-nR2KVB.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { i as readQuickModel, q as removeSpecialCharactersForTopicName, r as readDefaultModel } from "./model-J88ZZ_lQ.js";
import { i as isFileUIPart } from "./dist-Zc546Plu.js";
import { i as readCherryMeta } from "./uiParts-B-0xzcKJ.js";
function takeRight$1(arr, count) {
	if (count <= 0 || arr.length === 0) return [];
	return arr.slice(-count);
}
function takeRight(arr, count = 1, guard) {
	count = guard ? 1 : toInteger(count);
	if (count <= 0 || !isArrayLike(arr)) return [];
	return takeRight$1(toArray(arr), count);
}
function getParts(message) {
	return message.parts ?? [];
}
function getDataPart(part) {
	if ("data" in part && part.data && typeof part.data === "object") return part.data;
}
function formatCodePart(data) {
	const content = data?.content ?? "";
	if (!content.trim()) return "";
	return `\`\`\`${data?.language ?? ""}\n${content}\n\`\`\``;
}
function formatErrorPart(data) {
	if (!data) return "";
	return [
		data.name,
		data.code,
		data.message
	].filter(Boolean).join("\n");
}
function getRenderableTextContent(part) {
	switch (part.type) {
		case "text": return part.text ?? "";
		case "data-code": return formatCodePart(getDataPart(part));
		case "data-translation": return getDataPart(part)?.content ?? "";
		case "data-error": return formatErrorPart(getDataPart(part));
		default: return "";
	}
}
var NAMING_EXCLUDED_PART_TYPES = new Set(["data-error", "data-translation"]);
function collectText(message, excludedTypes) {
	return getParts(message).filter((part) => !excludedTypes?.has(part.type)).map(getRenderableTextContent).filter((t) => t.trim().length > 0).join("\n\n");
}
const getMainTextContent = (message) => collectText(message);
const getNamingTextContent = (message) => collectText(message, NAMING_EXCLUDED_PART_TYPES);
const getThinkingContent = (message) => {
	return getParts(message).filter((p) => p.type === "reasoning").map((p) => p.text ?? "").filter((t) => t.trim().length > 0).join("\n\n");
};
const getCitationContent = (message) => {
	const lines = [];
	for (const part of getParts(message)) {
		if (part.type !== "text") continue;
		const refs = readCherryMeta(part)?.references ?? [];
		for (const ref of refs) {
			if (ref.category !== "citation") continue;
			if (!ref.url) continue;
			const number = ref.number ?? lines.length + 1;
			const title = ref.title || ref.url.slice(0, 1999);
			lines.push(`[${number}] [${title}](${ref.url.slice(0, 1999)})`);
		}
	}
	return lines.join("\n\n");
};
var formatCitationLines = (citations) => citations.map((citation) => {
	const title = citation.title || citation.url || "";
	return citation.url ? `[${citation.number}] [${title}](${citation.url.slice(0, 1999)})` : `[${citation.number}] ${title}`;
}).join("\n\n");
const getToolCitationExport = (message, content) => {
	if (getParts(message).some((part) => {
		if (part.type !== "text") return false;
		const references = readCherryMeta(part)?.references;
		return !!references?.length && convertReferencesToCitations(references).length > 0;
	})) return {
		content,
		citation: ""
	};
	const { content: exported, cited } = toExportableCitations(content, getParts(message));
	return {
		content: exported,
		citation: formatCitationLines(cited)
	};
};
var logger$1 = loggerService.withContext("Utils:Prompt");
var supportedVariables = [
	"{{username}}",
	"{{date}}",
	"{{time}}",
	"{{datetime}}",
	"{{system}}",
	"{{language}}",
	"{{arch}}",
	"{{model_name}}"
];
const containsSupportedVariables = (userSystemPrompt) => {
	return supportedVariables.some((variable) => userSystemPrompt.includes(variable));
};
const replacePromptVariables = async (userSystemPrompt, modelName) => {
	if (typeof userSystemPrompt !== "string") {
		logger$1.warn("User system prompt is not a string:", userSystemPrompt);
		return userSystemPrompt;
	}
	const now = /* @__PURE__ */ new Date();
	if (userSystemPrompt.includes("{{date}}")) {
		const date = now.toLocaleDateString(void 0, {
			weekday: "short",
			year: "numeric",
			month: "numeric",
			day: "numeric"
		});
		userSystemPrompt = userSystemPrompt.replace(/{{date}}/g, date);
	}
	if (userSystemPrompt.includes("{{time}}")) {
		const time = now.toLocaleTimeString();
		userSystemPrompt = userSystemPrompt.replace(/{{time}}/g, time);
	}
	if (userSystemPrompt.includes("{{datetime}}")) {
		const datetime = now.toLocaleString(void 0, {
			weekday: "short",
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric"
		});
		userSystemPrompt = userSystemPrompt.replace(/{{datetime}}/g, datetime);
	}
	if (userSystemPrompt.includes("{{username}}")) try {
		const userName = await preferenceService.get("app.user.name") || "Unknown Username";
		userSystemPrompt = userSystemPrompt.replace(/{{username}}/g, userName);
	} catch (error) {
		logger$1.error("Failed to get username:", error);
		userSystemPrompt = userSystemPrompt.replace(/{{username}}/g, "Unknown Username");
	}
	if (userSystemPrompt.includes("{{system}}")) try {
		const systemType = await ipcApi.request("system.get_device_type");
		userSystemPrompt = userSystemPrompt.replace(/{{system}}/g, systemType);
	} catch (error) {
		logger$1.error("Failed to get system type:", error);
		userSystemPrompt = userSystemPrompt.replace(/{{system}}/g, "Unknown System");
	}
	if (userSystemPrompt.includes("{{language}}")) try {
		const language = await preferenceService.get("app.language");
		userSystemPrompt = userSystemPrompt.replace(/{{language}}/g, language || navigator.language || "en-US");
	} catch (error) {
		logger$1.error("Failed to get language:", error);
		userSystemPrompt = userSystemPrompt.replace(/{{language}}/g, "Unknown System Language");
	}
	if (userSystemPrompt.includes("{{arch}}")) try {
		const appInfo = await ipcApi.request("app.get_info");
		userSystemPrompt = userSystemPrompt.replace(/{{arch}}/g, appInfo.arch);
	} catch (error) {
		logger$1.error("Failed to get architecture:", error);
		userSystemPrompt = userSystemPrompt.replace(/{{arch}}/g, "Unknown Architecture");
	}
	if (modelName && userSystemPrompt.includes("{{model_name}}")) userSystemPrompt = userSystemPrompt.replace(/{{model_name}}/g, modelName);
	return userSystemPrompt;
};
var logger = loggerService.withContext("aiGeneration");
async function fetchMessagesSummary({ messages }) {
	let prompt = await preferenceService.get("topic.naming_prompt") || resolver_default.t("prompts.title");
	const model = await readQuickModel();
	if (!model) return {
		text: null,
		error: resolver_default.t("error.model.not_exists")
	};
	if (prompt && containsSupportedVariables(prompt)) prompt = await replacePromptVariables(prompt, model.name);
	const structuredMessages = takeRight(messages, 5).map((message) => {
		const fileList = (message.parts ?? []).filter(isFileUIPart).filter((p) => !p.mediaType?.startsWith("image/")).map((p) => p.filename).filter((name) => Boolean(name));
		return {
			role: message.role,
			mainText: purifyMarkdownImages(getNamingTextContent(message)),
			files: fileList.length > 0 ? fileList : void 0
		};
	});
	const conversation = JSON.stringify(structuredMessages);
	try {
		const { text } = await ipcApi.request("ai.text.generate", {
			uniqueModelId: model.id,
			system: prompt,
			prompt: conversation
		});
		const result = removeSpecialCharactersForTopicName(text);
		return result ? { text: result } : {
			text: null,
			error: resolver_default.t("error.no_response")
		};
	} catch (error) {
		return {
			text: null,
			error: getErrorMessage(error)
		};
	}
}
async function fetchNoteSummary({ content }) {
	let prompt = await preferenceService.get("topic.naming_prompt") || resolver_default.t("prompts.title");
	const model = await readQuickModel() ?? await readDefaultModel();
	if (!model) return null;
	if (prompt && containsSupportedVariables(prompt)) prompt = await replacePromptVariables(prompt, model.name);
	const purifiedContent = purifyMarkdownImages(content.substring(0, 2e3));
	try {
		const { text } = await ipcApi.request("ai.text.generate", {
			uniqueModelId: model.id,
			system: prompt,
			prompt: purifiedContent
		});
		return removeSpecialCharactersForTopicName(text) || null;
	} catch (error) {
		return null;
	}
}
async function fetchGenerate({ prompt, content, model, throwOnError = false }) {
	try {
		const resolvedModel = model ?? await readDefaultModel();
		if (!resolvedModel) {
			logger.error("fetchGenerate: no model available");
			if (throwOnError) throw new Error(resolver_default.t("error.model.not_exists"));
			return "";
		}
		const { text } = await ipcApi.request("ai.text.generate", {
			uniqueModelId: resolvedModel.id,
			system: prompt,
			prompt: content
		});
		return text || "";
	} catch (error) {
		logger.error("fetchGenerate failed", error);
		if (throwOnError) throw error;
		return "";
	}
}
export { replacePromptVariables as a, getNamingTextContent as c, containsSupportedVariables as i, getThinkingContent as l, fetchMessagesSummary as n, getCitationContent as o, fetchNoteSummary as r, getMainTextContent as s, fetchGenerate as t, getToolCitationExport as u };
