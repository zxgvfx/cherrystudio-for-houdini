const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./src-CSKMrPoK.js","./src-7h0QbDsK.js","./rolldown-runtime-BeJLVFtF.js","./src-CwaP5BFC.js","./extend-CpT6M6LO.js","./__vite-browser-external-B6Ia6fcU.js"])))=>i.map(i=>d[i]);
import { c as __toESM, s as __toDynamicImportESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as preferenceService } from "./PreferenceService-ay5pWhVK.js";
import { n as fetchMessagesSummary } from "./aiGeneration-B219ezQN.js";
import { t as require_dayjs_min } from "./dayjs.min-EuyAzn7r.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as markdownToPlainText } from "./markdown-C2h8O9JC.js";
import { t as purify } from "./purify.es-BrXIkv5K.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { o as getProviderLabelKey } from "./label-Grg6QUtw.js";
import { i as captureScrollableAsDataUrl, r as captureScrollableAsBlob } from "./image-BfuhOMOH.js";
import { r as stripCitationMarkers } from "./citations-B3he2I9w.js";
import { n as getTopicMessages } from "./useTopic-DqjHWqZM.js";
import { t as convertMathFormula } from "./markdownLight-CPb9cwdQ.js";
import { a as getToolCitationExport, i as getThinkingContent, n as getMainTextContent, r as getNamingTextContent, t as getCitationContent } from "./find-C9LAhrgt.js";
import { l as removeSpecialCharactersForFileName } from "./file-CVv-vzb2.js";
import { t as getComposerTextFromMessage } from "./composerTokens-BZ0N0VX2.js";
import { n as addNote } from "./NotesService-C7QTzXPg.js";
import { i as processCitations, r as messagesToPlainText, t as getTitleFromString } from "./export-B9YDnkyC.js";
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var logger = loggerService.withContext("ExportService");
var notionDependenciesPromise = null;
var loadNotionDependencies = () => {
	notionDependenciesPromise ??= Promise.all([
		__vitePreload(() => import("./src-CSKMrPoK.js").then(__toDynamicImportESM()), __vite__mapDeps([0,1,2]), import.meta.url),
		__vitePreload(() => import("./src-CwaP5BFC.js").then(__toDynamicImportESM()), __vite__mapDeps([3,4,2,5]), import.meta.url),
		__vitePreload(() => import("./browser-BDIx6uiE.js"), [], import.meta.url)
	]).then(([{ Client }, { markdownToBlocks }, { appendBlocks }]) => ({
		Client,
		markdownToBlocks,
		appendBlocks
	})).catch((error) => {
		notionDependenciesPromise = null;
		throw error;
	});
	return notionDependenciesPromise;
};
var runNotionExport = async (build) => {
	try {
		return await build();
	} catch (error) {
		logger.error("Notion export failed:", error);
		toast.error(resolver_default.t("message.error.notion.export"));
		return false;
	}
};
var exportState = false;
var getExportState = () => exportState;
var setExportingState = (isExporting) => {
	exportState = isExporting;
};
var sanitizeReasoningContent = (content) => {
	const contentWithBr = content.replace(/\n/g, "<br>");
	return purify.sanitize(contentWithBr, {
		ALLOWED_TAGS: [
			"br",
			"p",
			"div",
			"span",
			"strong",
			"b",
			"em",
			"i",
			"u",
			"s",
			"del",
			"mark",
			"small",
			"sup",
			"sub",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"blockquote",
			"ul",
			"ol",
			"li",
			"code",
			"pre",
			"kbd",
			"var",
			"samp",
			"table",
			"thead",
			"tbody",
			"tfoot",
			"tr",
			"td",
			"th",
			"hr"
		],
		ALLOWED_ATTR: [
			"class",
			"title",
			"lang",
			"dir",
			"data-language",
			"colspan",
			"rowspan",
			"start",
			"type"
		],
		KEEP_CONTENT: true,
		RETURN_DOM: false,
		SANITIZE_DOM: true,
		ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i
	});
};
var getRoleText = async (role, modelName, providerId, author) => {
	const { showModelNameInMarkdown, showModelProviderInMarkdown } = await preferenceService.getMultiple({
		showModelNameInMarkdown: "data.export.markdown.show_model_name",
		showModelProviderInMarkdown: "data.export.markdown.show_model_provider"
	});
	if (role === "user") return "🧑‍💻 User";
	else if (role === "system") return "🤖 System";
	else {
		const emoji = author?.emoji || "🤖";
		const authorLabel = author?.name || "Assistant";
		let assistantText = `${emoji} `;
		if (showModelNameInMarkdown && modelName) {
			assistantText += author?.name ? `${authorLabel} | ${modelName}` : modelName;
			if (showModelProviderInMarkdown && providerId) {
				const providerDisplayName = resolver_default.t(getProviderLabelKey(providerId), { defaultValue: providerId });
				assistantText += ` | ${providerDisplayName}`;
				return assistantText;
			}
			return assistantText;
		} else if (showModelProviderInMarkdown && providerId) {
			const providerDisplayName = resolver_default.t(getProviderLabelKey(providerId), { defaultValue: providerId });
			assistantText += `${authorLabel} | ${providerDisplayName}`;
			return assistantText;
		}
		return assistantText + authorLabel;
	}
};
var formatCitationsAsFootnotes = (citations) => {
	if (!citations.trim()) return "";
	return citations.split("\n\n").map((line) => {
		const match = line.match(/^\[(\d+)\]\s*(.+)/);
		if (match) {
			const [, num, content] = match;
			return `[^${num}]: ${content}`;
		}
		return line;
	}).join("\n\n");
};
var createBaseMarkdown = async (message, includeReasoning = false, excludeCitations = false, normalizeCitations = true) => {
	const forceDollarMathInMarkdown = await preferenceService.get("data.export.markdown.force_dollar_math");
	const author = "messageSnapshot" in message ? message.messageSnapshot : void 0;
	const model = message.model ?? author?.model;
	const titleSection = `## ${await getRoleText(message.role, model?.name, model?.provider, author)}`;
	let reasoningSection = "";
	if (includeReasoning) {
		let reasoningContent = getThinkingContent(message);
		if (reasoningContent) {
			if (reasoningContent.startsWith("<think>\n")) reasoningContent = reasoningContent.substring(8);
			else if (reasoningContent.startsWith("<think>")) reasoningContent = reasoningContent.substring(7);
			reasoningContent = sanitizeReasoningContent(reasoningContent);
			reasoningContent = stripCitationMarkers(reasoningContent);
			if (forceDollarMathInMarkdown) reasoningContent = convertMathFormula(reasoningContent);
			reasoningSection = `<div style="border: 2px solid #dddddd; border-radius: 10px;">
  <details style="padding: 5px;">
    <summary>${resolver_default.t("common.reasoning_content")}</summary>
    ${reasoningContent}
  </details>
</div>
`;
		}
	}
	const { content, citation: toolCitation } = getToolCitationExport(message, getComposerTextFromMessage(message, getMainTextContent(message)));
	let citation = excludeCitations ? "" : getCitationContent(message) || toolCitation;
	let processedContent = forceDollarMathInMarkdown ? convertMathFormula(content) : content;
	if (excludeCitations) processedContent = processCitations(processedContent, "remove");
	else if (normalizeCitations) {
		processedContent = processCitations(processedContent, "normalize");
		citation = formatCitationsAsFootnotes(citation);
	}
	return {
		titleSection,
		reasoningSection,
		contentSection: processedContent,
		citation
	};
};
async function getMessageTitle(message, length = 30) {
	const content = getNamingTextContent(message);
	if (await preferenceService.get("data.export.markdown.use_topic_naming_for_message_title")) try {
		const titlePromise = fetchMessagesSummary({ messages: [message] });
		toast.loading({
			title: resolver_default.t("chat.topics.export.wait_for_title_naming"),
			promise: titlePromise
		});
		const { text: title$1 } = await titlePromise;
		if (title$1) {
			toast.success(resolver_default.t("chat.topics.export.title_naming_success"));
			return title$1;
		}
	} catch (e) {
		toast.error(resolver_default.t("chat.topics.export.title_naming_failed"));
		logger.error("Failed to generate title using topic naming, downgraded to default logic", e);
	}
	let title = getTitleFromString(content, length);
	if (!title) title = (0, import_dayjs_min.default)(message.createdAt).format("YYYYMMDDHHmm");
	return title;
}
const messageToMarkdown = async (message, excludeCitations) => {
	const { excludeCitationsInExport, standardizeCitationsInExport } = await preferenceService.getMultiple({
		excludeCitationsInExport: "data.export.markdown.exclude_citations",
		standardizeCitationsInExport: "data.export.markdown.standardize_citations"
	});
	const { titleSection, contentSection, citation } = await createBaseMarkdown(message, false, excludeCitations ?? excludeCitationsInExport, standardizeCitationsInExport);
	return [
		titleSection,
		"",
		contentSection,
		citation
	].join("\n");
};
const messageToMarkdownWithReasoning = async (message, excludeCitations) => {
	const { excludeCitationsInExport, standardizeCitationsInExport } = await preferenceService.getMultiple({
		excludeCitationsInExport: "data.export.markdown.exclude_citations",
		standardizeCitationsInExport: "data.export.markdown.standardize_citations"
	});
	const { titleSection, reasoningSection, contentSection, citation } = await createBaseMarkdown(message, true, excludeCitations ?? excludeCitationsInExport, standardizeCitationsInExport);
	return [
		titleSection,
		"",
		reasoningSection,
		contentSection,
		citation
	].join("\n");
};
const messagesToMarkdown = async (messages, exportReasoning, excludeCitations) => {
	const converter = exportReasoning ? messageToMarkdownWithReasoning : messageToMarkdown;
	return (await Promise.all(messages.map((message) => converter(message, excludeCitations)))).join("\n---\n");
};
const topicToMarkdown = async (topic, exportReasoning, excludeCitations) => {
	const topicName = `# ${topic.name}`;
	const messages = await getTopicMessages(topic.id);
	if (messages && messages.length > 0) return topicName + "\n\n" + await messagesToMarkdown(messages, exportReasoning, excludeCitations);
	return topicName;
};
const topicToPlainText = async (topic) => {
	const topicName = markdownToPlainText(topic.name).trim();
	const topicMessages = await getTopicMessages(topic.id);
	if (topicMessages && topicMessages.length > 0) return topicName + "\n\n" + messagesToPlainText(topicMessages);
	return topicName;
};
const exportMarkdownContentAsFile = async (title, markdown) => {
	if (getExportState()) {
		toast.warning(resolver_default.t("message.warn.export.exporting"));
		return;
	}
	setExportingState(true);
	const markdownExportPath = await preferenceService.get("data.export.markdown.path");
	if (!markdownExportPath) try {
		const fileName = removeSpecialCharactersForFileName(title) + ".md";
		if (await window.api.file.save(fileName, markdown)) toast.success(resolver_default.t("message.success.markdown.export.specified"));
	} catch (error) {
		toast.error(resolver_default.t("message.error.markdown.export.specified"));
		logger.error("Failed to export markdown content:", error);
	} finally {
		setExportingState(false);
	}
	else try {
		const timestamp = (0, import_dayjs_min.default)().format("YYYY-MM-DD-HH-mm-ss");
		const fileName = removeSpecialCharactersForFileName(title) + ` ${timestamp}.md`;
		await window.api.file.write(markdownExportPath + "/" + fileName, markdown);
		toast.success(resolver_default.t("message.success.markdown.export.preconf"));
	} catch (error) {
		toast.error(resolver_default.t("message.error.markdown.export.preconf"));
		logger.error("Failed to export markdown content:", error);
	} finally {
		setExportingState(false);
	}
};
const exportTopicAsMarkdown = async (topic, exportReasoning, excludeCitations) => {
	if (getExportState()) {
		toast.warning(resolver_default.t("message.warn.export.exporting"));
		return;
	}
	setExportingState(true);
	const markdownExportPath = await preferenceService.get("data.export.markdown.path");
	if (!markdownExportPath) try {
		const fileName = removeSpecialCharactersForFileName(topic.name) + ".md";
		const markdown = await topicToMarkdown(topic, exportReasoning, excludeCitations);
		if (await window.api.file.save(fileName, markdown)) toast.success(resolver_default.t("message.success.markdown.export.specified"));
	} catch (error) {
		toast.error(resolver_default.t("message.error.markdown.export.specified"));
		logger.error("Failed to export topic as markdown:", error);
	} finally {
		setExportingState(false);
	}
	else try {
		const timestamp = (0, import_dayjs_min.default)().format("YYYY-MM-DD-HH-mm-ss");
		const fileName = removeSpecialCharactersForFileName(topic.name) + ` ${timestamp}.md`;
		const markdown = await topicToMarkdown(topic, exportReasoning, excludeCitations);
		await window.api.file.write(markdownExportPath + "/" + fileName, markdown);
		toast.success(resolver_default.t("message.success.markdown.export.preconf"));
	} catch (error) {
		toast.error(resolver_default.t("message.error.markdown.export.preconf"));
		logger.error("Failed to export topic as markdown:", error);
	} finally {
		setExportingState(false);
	}
};
const exportMessageAsMarkdown = async (message, exportReasoning, excludeCitations) => {
	if (getExportState()) {
		toast.warning(resolver_default.t("message.warn.export.exporting"));
		return;
	}
	setExportingState(true);
	const markdownExportPath = await preferenceService.get("data.export.markdown.path");
	if (!markdownExportPath) try {
		const fileName = removeSpecialCharactersForFileName(await getMessageTitle(message)) + ".md";
		const markdown = exportReasoning ? await messageToMarkdownWithReasoning(message, excludeCitations) : await messageToMarkdown(message, excludeCitations);
		if (await window.api.file.save(fileName, markdown)) toast.success(resolver_default.t("message.success.markdown.export.specified"));
	} catch (error) {
		toast.error(resolver_default.t("message.error.markdown.export.specified"));
		logger.error("Failed to export message as markdown:", error);
	} finally {
		setExportingState(false);
	}
	else try {
		const timestamp = (0, import_dayjs_min.default)().format("YYYY-MM-DD-HH-mm-ss");
		const fileName = removeSpecialCharactersForFileName(await getMessageTitle(message)) + ` ${timestamp}.md`;
		const markdown = exportReasoning ? await messageToMarkdownWithReasoning(message, excludeCitations) : await messageToMarkdown(message, excludeCitations);
		await window.api.file.write(markdownExportPath + "/" + fileName, markdown);
		toast.success(resolver_default.t("message.success.markdown.export.preconf"));
	} catch (error) {
		toast.error(resolver_default.t("message.error.markdown.export.preconf"));
		logger.error("Failed to export message as markdown:", error);
	} finally {
		setExportingState(false);
	}
};
var convertMarkdownToNotionBlocks = async (markdown) => {
	const { markdownToBlocks } = await loadNotionDependencies();
	return markdownToBlocks(markdown);
};
var convertThinkingToNotionBlocks = async (thinkingContent) => {
	if (!thinkingContent.trim()) return [];
	try {
		const { markdownToBlocks } = await loadNotionDependencies();
		const childrenBlocks = markdownToBlocks(thinkingContent.replace(/<br\s*\/?>/g, "\n"));
		return [{
			object: "block",
			type: "toggle",
			toggle: {
				rich_text: [{
					type: "text",
					text: { content: "🤔 " + resolver_default.t("common.reasoning_content") },
					annotations: { bold: true }
				}],
				children: childrenBlocks
			}
		}];
	} catch (error) {
		logger.error("failed to process reasoning content:", error);
		return [{
			object: "block",
			type: "toggle",
			toggle: {
				rich_text: [{
					type: "text",
					text: { content: "🤔 " + resolver_default.t("common.reasoning_content") },
					annotations: { bold: true }
				}],
				children: [{
					object: "block",
					type: "paragraph",
					paragraph: { rich_text: [{
						type: "text",
						text: { content: thinkingContent.length > 1800 ? thinkingContent.substring(0, 1800) + "...\n" + resolver_default.t("export.notion.reasoning_truncated") : thinkingContent }
					}] }
				}]
			}
		}];
	}
};
var executeNotionExport = async (title, allBlocks) => {
	if (getExportState()) {
		toast.warning(resolver_default.t("message.warn.export.exporting"));
		return false;
	}
	const { notionDatabaseID, notionApiKey, notionPageNameKey } = await preferenceService.getMultiple({
		notionDatabaseID: "data.integration.notion.database_id",
		notionPageNameKey: "data.integration.notion.page_name_key",
		notionApiKey: "data.integration.notion.api_key"
	});
	if (!notionApiKey || !notionDatabaseID) {
		toast.error(resolver_default.t("message.error.notion.no_api_key"));
		return false;
	}
	if (allBlocks.length === 0) {
		toast.error(resolver_default.t("message.error.notion.export"));
		return false;
	}
	setExportingState(true);
	if (title.length > 32) title = title.slice(0, 29) + "...";
	try {
		const { Client, appendBlocks } = await loadNotionDependencies();
		const notion = new Client({ auth: notionApiKey });
		const responsePromise = notion.pages.create({
			parent: { database_id: notionDatabaseID },
			properties: { [notionPageNameKey || "Name"]: { title: [{ text: { content: title } }] } }
		});
		toast.loading({
			title: resolver_default.t("message.loading.notion.preparing"),
			promise: responsePromise
		});
		const exportPromise = appendBlocks({
			block_id: (await responsePromise).id,
			children: allBlocks,
			client: notion
		});
		toast.loading({
			title: resolver_default.t("message.loading.notion.exporting_progress"),
			promise: exportPromise
		});
		toast.success(resolver_default.t("message.success.notion.export"));
		return true;
	} catch (error) {
		logger.error("Notion export failed:", error);
		toast.error(resolver_default.t("message.error.notion.export"));
		return false;
	} finally {
		setExportingState(false);
	}
};
const exportMessageToNotion = async (title, content, message) => runNotionExport(async () => {
	const notionExportReasoning = await preferenceService.get("data.integration.notion.export_reasoning");
	const notionBlocks = await convertMarkdownToNotionBlocks(content);
	if (notionExportReasoning && message) {
		const thinkingContent = stripCitationMarkers(getThinkingContent(message));
		if (thinkingContent) {
			const thinkingBlocks = await convertThinkingToNotionBlocks(thinkingContent);
			if (notionBlocks.length > 0) notionBlocks.splice(1, 0, ...thinkingBlocks);
			else notionBlocks.push(...thinkingBlocks);
		}
	}
	return executeNotionExport(title, notionBlocks);
});
const exportMessagesToNotion = async (title, messages) => runNotionExport(async () => {
	const { notionExportReasoning, excludeCitationsInExport } = await preferenceService.getMultiple({
		notionExportReasoning: "data.integration.notion.export_reasoning",
		excludeCitationsInExport: "data.export.markdown.exclude_citations"
	});
	const allBlocks = [...await convertMarkdownToNotionBlocks(`# ${title}`)];
	for (const message of messages) {
		const messageBlocks = await convertMarkdownToNotionBlocks(await messageToMarkdown(message, excludeCitationsInExport));
		if (notionExportReasoning) {
			const thinkingContent = stripCitationMarkers(getThinkingContent(message));
			if (thinkingContent) {
				const thinkingBlocks = await convertThinkingToNotionBlocks(thinkingContent);
				if (messageBlocks.length > 0) messageBlocks.splice(1, 0, ...thinkingBlocks);
				else messageBlocks.push(...thinkingBlocks);
			}
		}
		allBlocks.push(...messageBlocks);
	}
	return executeNotionExport(title, allBlocks);
});
const exportTopicToNotion = async (topic) => {
	const topicMessages = await getTopicMessages(topic.id);
	return exportMessagesToNotion(topic.name, topicMessages);
};
const exportMarkdownToYuque = async (title, content) => {
	const { yuqueToken, yuqueRepoId } = await preferenceService.getMultiple({
		yuqueToken: "data.integration.yuque.token",
		yuqueRepoId: "data.integration.yuque.repo_id"
	});
	if (getExportState()) {
		toast.warning(resolver_default.t("message.warn.export.exporting"));
		return;
	}
	if (!yuqueToken || !yuqueRepoId) {
		toast.error(resolver_default.t("message.error.yuque.no_config"));
		return;
	}
	setExportingState(true);
	try {
		const response = await fetch(`https://www.yuque.com/api/v2/repos/${yuqueRepoId}/docs`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Auth-Token": yuqueToken,
				"User-Agent": "CherryAI"
			},
			body: JSON.stringify({
				title,
				slug: Date.now().toString(),
				format: "markdown",
				body: content
			})
		});
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		const data = await response.json();
		const doc_id = data.data.id;
		const tocResponse = await fetch(`https://www.yuque.com/api/v2/repos/${yuqueRepoId}/toc`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-Auth-Token": yuqueToken,
				"User-Agent": "CherryAI"
			},
			body: JSON.stringify({
				action: "appendNode",
				action_mode: "sibling",
				doc_ids: [doc_id]
			})
		});
		if (!tocResponse.ok) throw new Error(`HTTP error! status: ${tocResponse.status}`);
		toast.success(resolver_default.t("message.success.yuque.export"));
		return data;
	} catch (error) {
		logger.debug(error);
		toast.error(resolver_default.t("message.error.yuque.export"));
		return null;
	} finally {
		setExportingState(false);
	}
};
const exportMarkdownToObsidian = async (attributes) => {
	if (getExportState()) {
		toast.warning(resolver_default.t("message.warn.export.exporting"));
		return false;
	}
	setExportingState(true);
	try {
		const obsidianVault = attributes.vault;
		let obsidianFolder = attributes.folder || "";
		let isMarkdownFile = false;
		if (!obsidianVault) {
			toast.error(resolver_default.t("chat.topics.export.obsidian_no_vault_selected"));
			return false;
		}
		if (!attributes.title) {
			toast.error(resolver_default.t("chat.topics.export.obsidian_title_required"));
			return false;
		}
		if (obsidianFolder && obsidianFolder.endsWith(".md")) isMarkdownFile = true;
		let filePath = "";
		if (isMarkdownFile) filePath = obsidianFolder;
		else {
			if (obsidianFolder && !obsidianFolder.endsWith("/")) obsidianFolder = obsidianFolder + "/";
			const fileName = transformObsidianFileName(attributes.title);
			filePath = obsidianFolder + fileName + ".md";
		}
		let obsidianUrl = `obsidian://new?file=${encodeURIComponent(filePath)}&vault=${encodeURIComponent(obsidianVault)}&clipboard`;
		if (attributes.processingMethod === "3") obsidianUrl += "&overwrite=true";
		else if (attributes.processingMethod === "2") obsidianUrl += "&prepend=true";
		else if (attributes.processingMethod === "1") obsidianUrl += "&append=true";
		window.open(obsidianUrl);
		toast.success(resolver_default.t("chat.topics.export.obsidian_export_success"));
		return true;
	} catch (error) {
		logger.error("Failed to export to Obsidian:", error);
		toast.error(resolver_default.t("chat.topics.export.obsidian_export_failed"));
		return false;
	} finally {
		setExportingState(false);
	}
};
function transformObsidianFileName(fileName) {
	const platform = window.navigator.userAgent;
	const isWin = /win/i.test(platform);
	const isMac = /mac/i.test(platform);
	let sanitized = fileName.replace(/[#|\\^\\[\]]/g, "");
	if (isWin) sanitized = sanitized.replace(/[<>:"\\/\\|?*]/g, "").replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i, "_$1$2").replace(/[\s.]+$/, "");
	else if (isMac) sanitized = sanitized.replace(/[<>:"\\/\\|?*]/g, "").replace(/^\./, "_");
	else sanitized = sanitized.replace(/[<>:"\\/\\|?*]/g, "").replace(/^\./, "_");
	sanitized = sanitized.replace(/^\.+/, "").trim().slice(0, 245);
	if (sanitized.length === 0) sanitized = "Untitled";
	return sanitized;
}
const exportMarkdownToJoplin = async (title, contentOrMessages) => {
	const { joplinUrl, joplinToken, joplinExportReasoning, excludeCitationsInExport } = await preferenceService.getMultiple({
		joplinUrl: "data.integration.joplin.url",
		joplinToken: "data.integration.joplin.token",
		joplinExportReasoning: "data.integration.joplin.export_reasoning",
		excludeCitationsInExport: "data.export.markdown.exclude_citations"
	});
	if (getExportState()) {
		toast.warning(resolver_default.t("message.warn.export.exporting"));
		return;
	}
	if (!joplinUrl || !joplinToken) {
		toast.error(resolver_default.t("message.error.joplin.no_config"));
		return;
	}
	setExportingState(true);
	let content;
	if (typeof contentOrMessages === "string") content = contentOrMessages;
	else if (Array.isArray(contentOrMessages)) content = await messagesToMarkdown(contentOrMessages, joplinExportReasoning, excludeCitationsInExport);
	else content = joplinExportReasoning ? await messageToMarkdownWithReasoning(contentOrMessages, excludeCitationsInExport) : await messageToMarkdown(contentOrMessages, excludeCitationsInExport);
	try {
		const baseUrl = joplinUrl.endsWith("/") ? joplinUrl : `${joplinUrl}/`;
		const response = await fetch(`${baseUrl}notes?token=${joplinToken}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title,
				body: content,
				source: "Cherry Studio"
			})
		});
		if (!response.ok) throw new Error("service not available");
		const data = await response.json();
		if (data?.error) throw new Error("response error");
		toast.success(resolver_default.t("message.success.joplin.export"));
		return data;
	} catch (error) {
		logger.error("Failed to export to Joplin:", error);
		toast.error(resolver_default.t("message.error.joplin.export"));
		return null;
	} finally {
		setExportingState(false);
	}
};
const exportMarkdownToSiyuan = async (title, content) => {
	const { siyuanApiUrl, siyuanToken, siyuanBoxId, siyuanRootPath } = await preferenceService.getMultiple({
		siyuanApiUrl: "data.integration.siyuan.api_url",
		siyuanToken: "data.integration.siyuan.token",
		siyuanBoxId: "data.integration.siyuan.box_id",
		siyuanRootPath: "data.integration.siyuan.root_path"
	});
	if (getExportState()) {
		toast.warning(resolver_default.t("message.warn.export.exporting"));
		return;
	}
	if (!siyuanApiUrl || !siyuanToken || !siyuanBoxId) {
		toast.error(resolver_default.t("message.error.siyuan.no_config"));
		return;
	}
	setExportingState(true);
	try {
		const testResponse = await fetch(`${siyuanApiUrl}/api/notebook/lsNotebooks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${siyuanToken}`
			}
		});
		if (!testResponse.ok) throw new Error("API请求失败");
		const testData = await testResponse.json();
		if (testData.code !== 0) throw new Error(`${testData.msg || resolver_default.t("message.error.unknown")}`);
		await createSiyuanDoc(siyuanApiUrl, siyuanToken, siyuanBoxId, `${await renderSprigTemplate(siyuanApiUrl, siyuanToken, siyuanRootPath?.startsWith("/") ? siyuanRootPath : `/${siyuanRootPath || "CherryStudio"}`)}/${`${title.replace(/[#|\\^\\[\]]/g, "")}`}`, content);
		toast.success(resolver_default.t("message.success.siyuan.export"));
	} catch (error) {
		logger.error("Failed to export to Siyuan:", error);
		toast.error(resolver_default.t("message.error.siyuan.export") + (error instanceof Error ? `: ${error.message}` : ""));
	} finally {
		setExportingState(false);
	}
};
async function renderSprigTemplate(apiUrl, token, template) {
	const data = await (await fetch(`${apiUrl}/api/template/renderSprig`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`
		},
		body: JSON.stringify({ template })
	})).json();
	if (data.code !== 0) throw new Error(`${data.msg || resolver_default.t("message.error.unknown")}`);
	return data.data;
}
async function createSiyuanDoc(apiUrl, token, boxId, path, markdown) {
	const data = await (await fetch(`${apiUrl}/api/filetree/createDocWithMd`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${token}`
		},
		body: JSON.stringify({
			notebook: boxId,
			path,
			markdown
		})
	})).json();
	if (data.code !== 0) throw new Error(`${data.msg || resolver_default.t("message.error.unknown")}`);
	return data.data;
}
var saveContentToNotes = async (title, content, folderPath) => {
	await addNote(title, content, folderPath);
	toast.success(resolver_default.t("message.success.notes.export"));
};
var handleNotesExportError = (error) => {
	logger.error("导出到笔记失败:", error);
	toast.error(resolver_default.t("message.error.notes.export"));
};
const exportContentToNotes = async (title, content, folderPath) => {
	try {
		await saveContentToNotes(title, content, folderPath);
	} catch (error) {
		handleNotesExportError(error);
		throw error;
	}
};
const exportMessageToNotes = async (title, content, folderPath) => {
	await exportContentToNotes(title, content.replace(/^## 🤖 Assistant(\n|$)/m, ""), folderPath);
};
const exportTopicToNotes = async (topic, folderPath) => {
	try {
		const content = await topicToMarkdown(topic);
		await saveContentToNotes(topic.name, content, folderPath);
	} catch (error) {
		handleNotesExportError(error);
		throw error;
	}
};
var exportNoteAsMarkdown = async (noteName, content) => {
	const markdown = `# ${noteName}\n\n${content}`;
	const fileName = removeSpecialCharactersForFileName(noteName) + ".md";
	if (await window.api.file.save(fileName, markdown)) toast.success(resolver_default.t("message.success.markdown.export.specified"));
};
var getScrollableElement = () => {
	const notesPage = document.querySelector("#notes-page");
	if (!notesPage) return null;
	const allDivs = notesPage.querySelectorAll("div");
	for (const div of Array.from(allDivs)) {
		const style = window.getComputedStyle(div);
		if (style.overflowY === "auto" || style.overflowY === "scroll") {
			if (div.querySelector(".ProseMirror")) return div;
		}
	}
	return null;
};
var getScrollableRef = () => {
	const element = getScrollableElement();
	if (!element) {
		toast.warning(resolver_default.t("notes.no_content_to_copy"));
		return null;
	}
	return { current: element };
};
var exportNoteAsImageToClipboard = async () => {
	const scrollableRef = getScrollableRef();
	if (!scrollableRef) return;
	await captureScrollableAsBlob(scrollableRef, async (blob) => {
		if (blob) {
			await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
			toast.success(resolver_default.t("common.copied"));
		}
	});
};
var exportNoteAsImageFile = async (noteName) => {
	const scrollableRef = getScrollableRef();
	if (!scrollableRef) return;
	const dataUrl = await captureScrollableAsDataUrl(scrollableRef);
	if (dataUrl) {
		const fileName = removeSpecialCharactersForFileName(noteName);
		await window.api.file.saveImage(fileName, dataUrl);
	}
};
const exportNote = async ({ node, platform }) => {
	try {
		const content = await window.api.file.readExternal(node.externalPath);
		switch (platform) {
			case "copyImage": return await exportNoteAsImageToClipboard();
			case "exportImage": return await exportNoteAsImageFile(node.name);
			case "markdown": return await exportNoteAsMarkdown(node.name, content);
			case "docx":
				ipcApi.request("export.word.from_markdown", {
					markdown: `# ${node.name}\n\n${content}`,
					fileName: removeSpecialCharactersForFileName(node.name)
				});
				return;
			case "notion":
				await exportMessageToNotion(node.name, content);
				return;
			case "yuque":
				await exportMarkdownToYuque(node.name, `# ${node.name}\n\n${content}`);
				return;
			case "joplin":
				await exportMarkdownToJoplin(node.name, content);
				return;
			case "siyuan":
				await exportMarkdownToSiyuan(node.name, `# ${node.name}\n\n${content}`);
				return;
		}
	} catch (error) {
		logger.error(`Failed to export note to ${platform}:`, error);
		throw error;
	}
};
export { messageToMarkdownWithReasoning as _, exportMarkdownToSiyuan as a, topicToPlainText as b, exportMessageToNotes as c, exportNote as d, exportTopicAsMarkdown as f, messageToMarkdown as g, getMessageTitle as h, exportMarkdownToObsidian as i, exportMessageToNotion as l, exportTopicToNotion as m, exportMarkdownContentAsFile as n, exportMarkdownToYuque as o, exportTopicToNotes as p, exportMarkdownToJoplin as r, exportMessageAsMarkdown as s, exportContentToNotes as t, exportMessagesToNotion as u, messagesToMarkdown as v, topicToMarkdown as y };
