import { i as readCherryMeta } from "./uiParts-B-0xzcKJ.js";
import { a as isComposerMessageTokenKind, i as isComposerMessageTextTokenKind } from "./composerTokenPolicy-DjR5UGdr.js";
var SKILL_TOKEN_ID_PREFIX = "skill:";
var KNOWLEDGE_TOKEN_ID_PREFIX = "knowledge:";
function isTextPart(part) {
	return part.type === "text";
}
function getMessageParts(message) {
	const parts = message.parts;
	return Array.isArray(parts) ? parts : [];
}
function getSortedComposerTokens(composer, isAllowedKind) {
	return composer.tokens.filter((token) => isAllowedKind(token.kind) && token.label).sort((a, b) => a.textOffset - b.textOffset || a.index - b.index);
}
function getRenderableComposerTokens(composer) {
	return getSortedComposerTokens(composer, isComposerMessageTextTokenKind);
}
function getDisplayComposerTokens(composer) {
	return getSortedComposerTokens(composer, isComposerMessageTokenKind);
}
function getComposerTokenClipboardText(token) {
	if (token.kind === "skill") return `/${token.id.startsWith(SKILL_TOKEN_ID_PREFIX) ? token.id.slice(6) : token.label}/`;
	if (token.kind === "knowledge") return `#${token.id.startsWith(KNOWLEDGE_TOKEN_ID_PREFIX) ? token.id.slice(10) : token.label}#`;
	if (token.kind === "folder") return token.promptText ?? token.label;
	if (token.kind === "link") return token.promptText ?? token.label;
	return token.label;
}
function replaceComposerTokenPromptText(content, composer, getTokenText = getComposerTokenClipboardText) {
	const tokens = getRenderableComposerTokens(composer);
	let text = "";
	let cursor = 0;
	tokens.forEach((token, index) => {
		const offset = Math.max(0, Math.min(content.length, token.textOffset));
		if (offset > cursor) {
			text += content.slice(cursor, offset);
			cursor = offset;
		}
		text += getTokenText(token, index);
		if (token.promptText && content.slice(offset, offset + token.promptText.length) === token.promptText) cursor = Math.max(cursor, offset + token.promptText.length);
	});
	if (cursor < content.length) text += content.slice(cursor);
	return text;
}
function getComposerTextFromParts(parts, getTokenText) {
	return parts.filter(isTextPart).map((part) => {
		const composer = readCherryMeta(part)?.composer;
		return composer ? replaceComposerTokenPromptText(part.text, composer, getTokenText) : part.text;
	}).filter((text) => text.trim().length > 0).join("\n\n");
}
function getComposerTextFromMessage(message, fallbackContent, getTokenText) {
	if (message.role !== "user") return fallbackContent;
	const parts = getMessageParts(message);
	if (parts.length === 0) return fallbackContent;
	return getComposerTextFromParts(parts, getTokenText) || fallbackContent;
}
export { getComposerTextFromParts as n, getDisplayComposerTokens as r, getComposerTextFromMessage as t };
