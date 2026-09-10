import { o as readCherryMeta } from "./uiParts-ClY38h-2.js";
import { i as toExportableCitations, s as convertReferencesToCitations } from "./citations-B4d_KMap.js";
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
export { getToolCitationExport as a, getThinkingContent as i, getMainTextContent as n, getNamingTextContent as r, getCitationContent as t };
