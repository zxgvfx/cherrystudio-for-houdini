import { t as markdownToPlainText } from "./markdown-6Z4S4-65.js";
import { a as getToolCitationExport, r as getNamingTextContent } from "./find-Bek5EVkJ.js";
import { t as getComposerTextFromMessage } from "./composerTokens-Dtpcx_hI.js";
function getTitleFromString(str, length = 80) {
	let title = str.trimStart().split("\n")[0];
	if (title.includes("。")) title = title.split("。")[0];
	else if (title.includes("，")) title = title.split("，")[0];
	else if (title.includes(".")) title = title.split(".")[0];
	else if (title.includes(",")) title = title.split(",")[0];
	if (title.length > length) title = title.slice(0, length);
	if (!title) title = str.slice(0, length);
	return title;
}
const processCitations = (content, mode = "remove") => {
	return content.split(/(```[a-zA-Z]*\n[\s\S]*?\n```)/g).map((part, index) => {
		if (index % 2 === 1) return part;
		let result = part;
		if (mode === "remove") result = result.replace(/\[<sup[^>]*data-citation[^>]*>\d+<\/sup>\]\([^)]*\)/g, "").replace(/\[<sup[^>]*>\d+<\/sup>\]\([^)]*\)/g, "").replace(/<sup[^>]*data-citation[^>]*>\d+<\/sup>/g, "").replace(/\[(\d+)\](?!\()/g, "");
		else if (mode === "normalize") result = result.replace(/\[<sup[^>]*data-citation[^>]*>(\d+)<\/sup>\]\([^)]*\)/g, "[^$1]").replace(/\[<sup[^>]*>(\d+)<\/sup>\]\([^)]*\)/g, "[^$1]").replace(/<sup[^>]*data-citation[^>]*>(\d+)<\/sup>/g, "[^$1]").replace(/\[(\d+)\](?!\()/g, "[^$1]");
		return result.split("\n").map((line) => {
			if (line.match(/^>|^#{1,6}\s|^\s*[-*+]\s|^\s*\d+\.\s|^\s{4,}/)) return line.replace(/[ ]+/g, " ").replace(/[ ]+$/g, "");
			return line.replace(/[ ]+/g, " ").trim();
		}).join("\n");
	}).join("").trim();
};
var formatMessageAsPlainText = (message) => {
	const author = "messageSnapshot" in message ? message.messageSnapshot : void 0;
	return `${message.role === "user" ? "User:" : `${author?.name ?? "Assistant"}:`}\n${markdownToPlainText(copyableTextContent(message)).trim()}`;
};
var copyableTextContent = (message) => {
	return getToolCitationExport(message, getComposerTextFromMessage(message, getNamingTextContent(message))).content;
};
const messageToPlainText = (message) => {
	return markdownToPlainText(copyableTextContent(message)).trim();
};
const messagesToPlainText = (messages) => {
	return messages.map(formatMessageAsPlainText).join("\n\n");
};
export { processCitations as i, messageToPlainText as n, messagesToPlainText as r, getTitleFromString as t };
