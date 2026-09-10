const COMPOSER_TOKEN_CAPABILITIES = {
	skill: {
		input: true,
		message: true,
		messageText: true,
		clipboard: true,
		clipboardPromptText: false
	},
	link: {
		input: true,
		message: true,
		messageText: true,
		clipboard: true,
		clipboardPromptText: true
	},
	file: {
		input: true,
		message: true,
		messageText: true,
		clipboard: true,
		clipboardPromptText: false
	},
	folder: {
		input: true,
		message: true,
		messageText: true,
		clipboard: true,
		clipboardPromptText: true
	},
	command: {
		input: false,
		message: true,
		messageText: true,
		clipboard: false,
		clipboardPromptText: false
	},
	knowledge: {
		input: true,
		message: true,
		messageText: true,
		clipboard: true,
		clipboardPromptText: false
	},
	reference: {
		input: true,
		message: true,
		messageText: true,
		clipboard: true,
		clipboardPromptText: true
	},
	quote: {
		input: true,
		message: true,
		messageText: false,
		clipboard: true,
		clipboardPromptText: true
	},
	pipelineNode: {
		input: true,
		message: true,
		messageText: true,
		clipboard: true,
		clipboardPromptText: true
	},
	promptVariable: {
		input: true,
		message: false,
		messageText: false,
		clipboard: true,
		clipboardPromptText: true
	}
};
const COMPOSER_TOKEN_KINDS = Object.freeze(Object.keys(COMPOSER_TOKEN_CAPABILITIES));
function getComposerTokenKinds(capability) {
	return COMPOSER_TOKEN_KINDS.filter((kind) => COMPOSER_TOKEN_CAPABILITIES[kind][capability]);
}
const COMPOSER_INPUT_TOKEN_KINDS = getComposerTokenKinds("input");
const COMPOSER_MESSAGE_TOKEN_KINDS = getComposerTokenKinds("message");
const COMPOSER_MESSAGE_TEXT_TOKEN_KINDS = getComposerTokenKinds("messageText");
const COMPOSER_CLIPBOARD_TOKEN_KINDS = getComposerTokenKinds("clipboard");
const COMPOSER_CLIPBOARD_PROMPT_TOKEN_KINDS = getComposerTokenKinds("clipboardPromptText");
var composerTokenKindSet = new Set(COMPOSER_TOKEN_KINDS);
var composerInputTokenKindSet = new Set(COMPOSER_INPUT_TOKEN_KINDS);
var composerMessageTokenKindSet = new Set(COMPOSER_MESSAGE_TOKEN_KINDS);
var composerMessageTextTokenKindSet = new Set(COMPOSER_MESSAGE_TEXT_TOKEN_KINDS);
var composerClipboardTokenKindSet = new Set(COMPOSER_CLIPBOARD_TOKEN_KINDS);
var composerClipboardPromptTokenKindSet = new Set(COMPOSER_CLIPBOARD_PROMPT_TOKEN_KINDS);
function isComposerTokenKind(value) {
	return typeof value === "string" && composerTokenKindSet.has(value);
}
function isComposerInputTokenKind(value) {
	return typeof value === "string" && composerInputTokenKindSet.has(value);
}
function isComposerMessageTokenKind(value) {
	return typeof value === "string" && composerMessageTokenKindSet.has(value);
}
function isComposerMessageTextTokenKind(value) {
	return typeof value === "string" && composerMessageTextTokenKindSet.has(value);
}
function isComposerClipboardTokenKind(value) {
	return typeof value === "string" && composerClipboardTokenKindSet.has(value);
}
function isComposerClipboardPromptTokenKind(value) {
	return typeof value === "string" && composerClipboardPromptTokenKindSet.has(value);
}
export { isComposerMessageTokenKind as a, isComposerMessageTextTokenKind as i, isComposerClipboardTokenKind as n, isComposerTokenKind as o, isComposerInputTokenKind as r, isComposerClipboardPromptTokenKind as t };
