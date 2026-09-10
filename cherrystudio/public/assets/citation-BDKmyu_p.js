import { n as _enum } from "./schemas-1oAyIgyK.js";
import { n as objectValues } from "./object-DzZVuFUl.js";
import { t as cleanMarkdownContent } from "./formats-BV-MUlSZ.js";
const WEB_SEARCH_SOURCE = {
	WEBSEARCH: "websearch",
	OPENAI: "openai",
	OPENAI_RESPONSE: "openai-response",
	OPENROUTER: "openrouter",
	ANTHROPIC: "anthropic",
	GEMINI: "gemini",
	PERPLEXITY: "perplexity",
	QWEN: "qwen",
	HUNYUAN: "hunyuan",
	ZHIPU: "zhipu",
	GROK: "grok",
	AISDK: "ai-sdk"
};
_enum(objectValues(WEB_SEARCH_SOURCE));
var MARKDOWN_CODE_PATTERN = /```[\s\S]*?```|`[^`\n]*`/gm;
function mapMarkdownOutsideCode(content, transform) {
	MARKDOWN_CODE_PATTERN.lastIndex = 0;
	let cursor = 0;
	let result = "";
	let match;
	while ((match = MARKDOWN_CODE_PATTERN.exec(content)) !== null) {
		result += transform(content.slice(cursor, match.index));
		result += match[0];
		cursor = match.index + match[0].length;
	}
	return result + transform(content.slice(cursor));
}
function toTooltipCitation(citation) {
	return citation.content ? {
		...citation,
		content: cleanMarkdownContent(citation.content).substring(0, 200)
	} : citation;
}
function determineCitationSource(citationReferences) {
	if (citationReferences?.length) return citationReferences.find((ref) => ref.citationBlockSource)?.citationBlockSource;
}
function withCitationTags(content, citations, sourceType) {
	if (!content || citations.length === 0) return content;
	const cleaned = citations.map(toTooltipCitation);
	return mapCitationMarksToTags(normalizeCitationMarks(content, new Map(cleaned.map((c) => [c.number, c])), sourceType), new Map(cleaned.map((c) => [String(c.number), c])));
}
function normalizeCitationMarks(content, citationMap, sourceType) {
	const codeBlockRegex = MARKDOWN_CODE_PATTERN;
	const getSkipRanges = () => {
		const skipRanges = [];
		codeBlockRegex.lastIndex = 0;
		let match;
		while ((match = codeBlockRegex.exec(content)) !== null) skipRanges.push({
			start: match.index,
			end: match.index + match[0].length
		});
		return skipRanges;
	};
	const shouldSkip = (pos, skipRanges = getSkipRanges()) => {
		for (const range of skipRanges) {
			if (pos >= range.start && pos < range.end) return true;
			if (range.start > pos) break;
		}
		return false;
	};
	const applyReplacements = (regex, getReplacementFn) => {
		const replacements = [];
		const skipRanges = getSkipRanges();
		regex.lastIndex = 0;
		let m;
		while ((m = regex.exec(content)) !== null) if (!shouldSkip(m.index, skipRanges)) {
			const replacement = getReplacementFn(m);
			if (replacement !== null) replacements.push({
				start: m.index,
				end: m.index + m[0].length,
				replacement
			});
		}
		replacements.reverse().forEach(({ start, end, replacement }) => {
			content = content.slice(0, start) + replacement + content.slice(end);
		});
	};
	const normalizePlainBracketMarks = () => {
		applyReplacements(/\[(\d+)\]/g, (match) => {
			const citationNum = parseInt(match[1], 10);
			return citationMap.has(citationNum) ? `[cite:${citationNum}]` : null;
		});
	};
	switch (sourceType) {
		case WEB_SEARCH_SOURCE.OPENAI:
		case WEB_SEARCH_SOURCE.OPENAI_RESPONSE:
		case WEB_SEARCH_SOURCE.AISDK:
		case WEB_SEARCH_SOURCE.PERPLEXITY:
			applyReplacements(/\[<sup>(\d+)<\/sup>\]\([^)]*\)/g, (m) => {
				const citationNum = parseInt(m[1], 10);
				return citationMap.has(citationNum) ? `[cite:${citationNum}]` : null;
			});
			normalizePlainBracketMarks();
			break;
		case WEB_SEARCH_SOURCE.GEMINI: {
			const metadata = Array.from(citationMap.values())[0]?.metadata;
			if (metadata?.length) {
				const contentBytes = new TextEncoder().encode(content);
				const byteOffsetToCharOffset = (byteOffset) => {
					return new TextDecoder().decode(contentBytes.slice(0, byteOffset)).length;
				};
				const insertions = [];
				metadata.forEach((support) => {
					if (!support.groundingChunkIndices || !support.segment) return;
					const { endIndex } = support.segment;
					if (endIndex == null) return;
					const tag = support.groundingChunkIndices.map((citationNum) => {
						return citationMap.get(citationNum + 1) ? `[cite:${citationNum + 1}]` : "";
					}).filter(Boolean).join("");
					if (tag) insertions.push({
						position: byteOffsetToCharOffset(endIndex),
						tag
					});
				});
				insertions.sort((a, b) => b.position - a.position);
				for (const { position, tag } of insertions) if (!shouldSkip(position)) content = content.slice(0, position) + tag + content.slice(position);
			}
			break;
		}
		case WEB_SEARCH_SOURCE.GROK:
			applyReplacements(/\[\[(\d+)\]\]\([^)]*\)/g, (m) => {
				const citationNum = parseInt(m[1], 10);
				return citationMap.has(citationNum) ? `[cite:${citationNum}]` : null;
			});
			break;
		default: normalizePlainBracketMarks();
	}
	return content;
}
function mapCitationMarksToTags(content, citationMap) {
	return mapMarkdownOutsideCode(content, (text) => text.replace(/\[cite:([\w-]+)\]/g, (match, id) => {
		const citation = citationMap.get(id);
		return citation ? generateCitationTag(citation) : match;
	}));
}
const isLinkableCitationUrl = (url) => !!url && url.startsWith("http");
function generateCitationTag(citation) {
	const supTag = `<sup data-citation='${citation.number}'>${citation.number}</sup>`;
	if (!isLinkableCitationUrl(citation.url)) return supTag;
	return `[${supTag}](${citation.url.replace(/\|/g, "%7C")})`;
}
export { normalizeCitationMarks as a, WEB_SEARCH_SOURCE as c, mapMarkdownOutsideCode as i, isLinkableCitationUrl as n, toTooltipCitation as o, mapCitationMarksToTags as r, withCitationTags as s, determineCitationSource as t };
