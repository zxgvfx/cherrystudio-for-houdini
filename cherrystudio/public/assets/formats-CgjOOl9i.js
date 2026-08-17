function cleanMarkdownContent(text) {
	if (!text) return "";
	let cleaned = text.replace(/!\[.*?]\(.*?\)/g, "");
	cleaned = cleaned.replace(/\[(.*?)]\(.*?\)/g, "$1");
	cleaned = cleaned.replace(/https?:\/\/\S+/g, "");
	cleaned = cleaned.replace(/[-—–_=+]{3,}/g, " ");
	cleaned = cleaned.replace(/[￥$€£¥%@#&*^()[\]{}<>~`'"\\|/_.]+/g, "");
	cleaned = cleaned.replace(/\s+/g, " ").trim();
	return cleaned;
}
function extractHtmlTitle(html) {
	if (!html) return "";
	const match = html.match(/<title>(.*?)<\/title>/i);
	if (match) return match[1] ? match[1].trim() : "";
	const malformedMatch = html.match(/<title>(.*?)($|<(?!\/title))/i);
	if (malformedMatch) return malformedMatch[1] ? malformedMatch[1].trim() : "";
	return "";
}
function getFileNameFromHtmlTitle(title) {
	if (!title) return "";
	return title.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, "-");
}
function removeSvgEmptyLines(text) {
	return text.replace(/(<svg[\s\S]*?<\/svg>)/g, (svgMatch) => {
		return svgMatch.split("\n").filter((line) => line.trim() !== "").join("\n");
	});
}
function formatQuotedText(text) {
	return "<blockquote>\n\n" + text + "\n</blockquote>\n";
}
export { removeSvgEmptyLines as a, getFileNameFromHtmlTitle as i, extractHtmlTitle as n, formatQuotedText as r, cleanMarkdownContent as t };
