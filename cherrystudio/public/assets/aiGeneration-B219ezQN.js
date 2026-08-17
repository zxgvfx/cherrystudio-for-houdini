import { t as loggerService } from "./LoggerService-CbighP69.js";
import { s as getErrorMessage } from "./error-B2Op57SY.js";
import { t as preferenceService } from "./PreferenceService-ay5pWhVK.js";
import { t as isArrayLike } from "./isArrayLike-qCM8LrC4.js";
import { t as toArray } from "./toArray-DryE-6I0.js";
import { t as toInteger } from "./toInteger-DIjY6RxA.js";
import { a as defaultLanguage, r as resolver_default } from "./resolver-CZPudlzl.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { c as removeSpecialCharactersForTopicName } from "./naming-C7JIUN29.js";
import { a as isFileUIPart } from "./dist-DmJhY6Jt.js";
import { i as readQuickModel, r as readDefaultModel } from "./model-BGDvQJb9.js";
import { a as purifyMarkdownImages } from "./markdownLight-CPb9cwdQ.js";
import { r as getNamingTextContent } from "./find-C9LAhrgt.js";
function takeRight$1(arr, count) {
	if (count <= 0 || arr.length === 0) return [];
	return arr.slice(-count);
}
function takeRight(arr, count = 1, guard) {
	count = guard ? 1 : toInteger(count);
	if (count <= 0 || !isArrayLike(arr)) return [];
	return takeRight$1(toArray(arr), count);
}
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
export { replacePromptVariables as a, containsSupportedVariables as i, fetchMessagesSummary as n, fetchNoteSummary as r, fetchGenerate as t };
