import { o as readCherryMeta } from "./uiParts-ClY38h-2.js";
function getTextFromParts(parts) {
	return parts.filter((p) => p.type === "text").map((p) => p.text).filter((t) => t.trim().length > 0).join("\n\n");
}
function hasTextParts(parts) {
	return parts.some((p) => p.type === "text" && p.text.trim().length > 0);
}
function hasTranslationParts(parts) {
	return parts.some((p) => p.type === "data-translation");
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasUnroundtrippableTextMetadata(part, textPartCount) {
	const providerMetadata = part.providerMetadata;
	if (providerMetadata === void 0) return false;
	if (!isRecord(providerMetadata)) return true;
	if (Object.keys(providerMetadata).length === 0) return false;
	if (Object.keys(providerMetadata).some((provider) => provider !== "cherry")) return true;
	const cherry = providerMetadata.cherry;
	if (!isRecord(cherry)) return cherry !== void 0;
	for (const [key, value] of Object.entries(cherry)) {
		if (key === "references") {
			if (!Array.isArray(value) || value.length > 0) return true;
			continue;
		}
		if (key === "composer") {
			if (value !== void 0 && (textPartCount !== 1 || !readCherryMeta(part)?.composer)) return true;
			continue;
		}
		return true;
	}
	return false;
}
function canEditAssistantMessageParts(parts) {
	let hasText = false;
	let hasEditablePart = false;
	let hasFile = false;
	let editableRunEnded = false;
	const textPartCount = parts.reduce((count, part) => count + (part.type === "text" ? 1 : 0), 0);
	for (const part of parts) {
		if (part.type === "data-translation") continue;
		if (part.type === "text") {
			if (editableRunEnded || hasFile || hasUnroundtrippableTextMetadata(part, textPartCount)) return false;
			hasText ||= part.text.trim().length > 0;
			hasEditablePart = true;
			continue;
		}
		if (part.type === "file") {
			if (editableRunEnded) return false;
			hasEditablePart = true;
			hasFile = true;
			continue;
		}
		if (hasEditablePart) editableRunEnded = true;
	}
	return hasText;
}
function getTranslationFromParts(parts) {
	return parts.filter((p) => p.type === "data-translation").map((p) => p.data);
}
export { hasTranslationParts as a, hasTextParts as i, getTextFromParts as n, getTranslationFromParts as r, canEditAssistantMessageParts as t };
