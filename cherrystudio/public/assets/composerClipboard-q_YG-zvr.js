import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as AbsoluteFilePathSchema } from "./file-KsLXrn8b.js";
import { t as fileUrlToPath, u as getFileTypeByExt } from "./file-DzPAqnYr.js";
import { i as readCherryMeta } from "./uiParts-CtZmiNbl.js";
import { d as FILE_TYPE } from "./file-AcqqP-OX.js";
import { f as getComposerFileTokenSourceId, g as withComposerFileTokenSourceId, h as readComposerFileTokenSourceIdFromTokenId, l as createComposerFileTokenSourceId, m as readComposerFileTokenIdSuffix, p as isComposerFileTokenPathLike, u as createComposerSecureRandomId } from "./tokenView-DU2XPw-v.js";
import { n as isComposerClipboardTokenKind, t as isComposerClipboardPromptTokenKind } from "./composerTokenPolicy-DQDP2b_I.js";
function toComposerAttachment(meta) {
	return {
		fileTokenSourceId: getComposerFileTokenSourceId(meta) ?? createComposerFileTokenSourceId(),
		path: AbsoluteFilePathSchema.parse(meta.path),
		name: meta.name,
		origin_name: meta.origin_name,
		ext: meta.ext,
		size: meta.size,
		type: meta.type,
		...meta.composerFileKind && { composerFileKind: meta.composerFileKind }
	};
}
function toComposerAttachments(metas) {
	return metas.map(toComposerAttachment);
}
var logger = loggerService.withContext("composerClipboard");
const COMPOSER_CLIPBOARD_FRAGMENT_MIME = "web application/x-cherry-composer-fragment+json";
var COMPOSER_CLIPBOARD_FRAGMENT_VERSION = 1;
var COMPOSER_CLIPBOARD_FRAGMENT_MAX_LENGTH = 25e4;
var COMPOSER_CLIPBOARD_FILE_HANDLE_TTL_MS = 1800 * 1e3;
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readString(value) {
	return typeof value === "string" ? value : void 0;
}
function getFileExtensionFromName(name) {
	return name?.match(/\.[^.]+$/)?.[0] ?? "";
}
function readNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function stripFileUrl(value) {
	if (!value) return void 0;
	if (!value.startsWith("file://")) return value;
	try {
		return fileUrlToPath(value);
	} catch {
		return value.replace(/^file:\/\//, "");
	}
}
function isFileType(value) {
	return typeof value === "string" && Object.values(FILE_TYPE).includes(value);
}
function readFileDisplayPayload(payload, options = {}) {
	if (!isRecord(payload)) return void 0;
	const result = {};
	const type = readString(payload.type);
	const ext = readString(payload.ext);
	const name = readString(payload.name);
	const originName = readString(payload.origin_name);
	const handle = readString(payload.handle);
	if (type) result.type = type;
	if (ext) result.ext = ext;
	if (name) result.name = name;
	if (originName) result.origin_name = originName;
	if (readNumber(payload.size) !== void 0) result.size = readNumber(payload.size);
	if (options.includeHandle && handle) result.handle = handle;
	return Object.keys(result).length > 0 ? result : void 0;
}
var fileRestorationRegistry = /* @__PURE__ */ new Map();
function createFileRestorationHandle() {
	return createComposerSecureRandomId("composer-file");
}
function pruneExpiredFileRestorationHandles(now = Date.now()) {
	for (const [handle, entry] of fileRestorationRegistry) if (entry.expiresAt <= now) fileRestorationRegistry.delete(handle);
}
function registerFileRestorationHandle(file) {
	pruneExpiredFileRestorationHandles();
	const restorableFile = withComposerFileTokenSourceId(file);
	const handle = createFileRestorationHandle();
	fileRestorationRegistry.set(handle, {
		sourceId: restorableFile.fileTokenSourceId,
		file: restorableFile,
		expiresAt: Date.now() + COMPOSER_CLIPBOARD_FILE_HANDLE_TTL_MS
	});
	return handle;
}
function resolveFileRestorationHandle(handle, sourceId) {
	pruneExpiredFileRestorationHandles();
	const entry = fileRestorationRegistry.get(handle);
	if (!entry || entry.sourceId !== sourceId) return null;
	return { ...entry.file };
}
function createFileMetadataFromWritePayload(token, payload) {
	if (!isRecord(payload)) return null;
	const sourceId = readComposerFileTokenSourceIdFromTokenId(token.id);
	const payloadSourceId = readString(payload.fileTokenSourceId);
	const path = stripFileUrl(readString(payload.path));
	if (!sourceId || payloadSourceId !== sourceId || !path) return null;
	const name = readString(payload.name) || readString(payload.origin_name) || token.label;
	const ext = readString(payload.ext) || getFileExtensionFromName(name);
	const type = isFileType(payload.type) ? payload.type : getFileTypeByExt(ext);
	const rawId = readString(payload.id);
	return {
		id: rawId && !hasUnsafeComposerClipboardFileTokenId({
			id: rawId,
			kind: "file"
		}) ? rawId : sourceId,
		fileTokenSourceId: sourceId,
		name,
		origin_name: readString(payload.origin_name) || name,
		path,
		size: readNumber(payload.size) ?? 0,
		ext,
		type,
		created_at: readString(payload.created_at) ?? "",
		count: readNumber(payload.count) ?? 1
	};
}
function createFilePayloadForWrite(token) {
	const payload = readFileDisplayPayload(token.payload);
	const file = createFileMetadataFromWritePayload(token, token.payload);
	const handle = file ? registerFileRestorationHandle(file) : null;
	if (!handle) return payload;
	return {
		...payload,
		handle
	};
}
var COMPOSER_CLIPBOARD_PROMPT_NONCE_TTL_MS = 1800 * 1e3;
var trustedPromptFragmentNonces = /* @__PURE__ */ new Map();
function pruneExpiredPromptFragmentNonces(now = Date.now()) {
	for (const [nonce, expiresAt] of trustedPromptFragmentNonces) if (expiresAt <= now) trustedPromptFragmentNonces.delete(nonce);
}
function registerTrustedPromptFragmentNonce() {
	pruneExpiredPromptFragmentNonces();
	const nonce = createComposerSecureRandomId("composer-prompt");
	trustedPromptFragmentNonces.set(nonce, Date.now() + COMPOSER_CLIPBOARD_PROMPT_NONCE_TTL_MS);
	return nonce;
}
function isTrustedPromptFragmentNonce(nonce) {
	const value = readString(nonce);
	if (!value) return false;
	pruneExpiredPromptFragmentNonces();
	return trustedPromptFragmentNonces.has(value);
}
function hasUnsafeComposerClipboardFileTokenId(token) {
	if (token.kind !== "file") return false;
	return isComposerFileTokenPathLike(readComposerFileTokenIdSuffix(token.id) ?? token.id);
}
function isUnsafeComposerClipboardFileToken(token) {
	if (!isRecord(token)) return false;
	const id = readString(token.id);
	return Boolean(id && token.kind === "file" && hasUnsafeComposerClipboardFileTokenId({
		id,
		kind: "file"
	}));
}
function isComposerClipboardToken(token) {
	return isComposerClipboardTokenKind(token.kind) && !hasUnsafeComposerClipboardFileTokenId(token);
}
function escapeComposerClipboardHtmlText(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function createComposerClipboardTextHtml(text) {
	return `<p>${escapeComposerClipboardHtmlText(text).replace(/\r\n?|\n/g, "<br>") || "<br>"}</p>`;
}
function sanitizeComposerClipboardToken(token, mode) {
	if (!isRecord(token)) return null;
	const id = readString(token.id);
	const kind = token.kind;
	const label = readString(token.label);
	if (!id || !isComposerClipboardTokenKind(kind) || !label) return null;
	if (hasUnsafeComposerClipboardFileTokenId({
		id,
		kind
	})) return null;
	const description = readString(token.description);
	const promptText = readString(token.promptText);
	const payload = kind === "file" ? mode === "write" ? createFilePayloadForWrite({
		id,
		label,
		payload: token.payload
	}) : readFileDisplayPayload(token.payload, { includeHandle: true }) : void 0;
	return {
		id,
		kind,
		label,
		...description && { description },
		...promptText && { promptText },
		...payload && { payload }
	};
}
function sanitizeComposerClipboardSegment(segment, trustedPromptText) {
	if (!isRecord(segment)) return null;
	if (segment.type === "text") {
		const text = readString(segment.text);
		return text ? {
			type: "text",
			text
		} : null;
	}
	if (segment.type !== "token") return null;
	const fallbackText = readString(segment.fallbackText);
	if (!fallbackText) return null;
	const token = sanitizeComposerClipboardToken(segment.token, "read");
	if (!token) return isUnsafeComposerClipboardFileToken(segment.token) ? {
		type: "text",
		text: fallbackText
	} : null;
	if (!trustedPromptText && isComposerClipboardPromptTokenKind(token.kind) && token.promptText) return {
		type: "text",
		text: fallbackText
	};
	return {
		type: "token",
		token,
		fallbackText
	};
}
function createComposerClipboardFragment(segments) {
	const safeSegments = segments.flatMap((segment) => {
		if (segment.type === "text") return segment.text ? [{
			type: "text",
			text: segment.text
		}] : [];
		const token = sanitizeComposerClipboardToken(segment.token, "write");
		if (!token) return segment.fallbackText ? [{
			type: "text",
			text: segment.fallbackText
		}] : [];
		return [{
			type: "token",
			token,
			fallbackText: segment.fallbackText
		}];
	});
	const requiresPromptNonce = safeSegments.some((segment) => segment.type === "token" && isComposerClipboardPromptTokenKind(segment.token.kind) && segment.token.promptText);
	return JSON.stringify({
		version: COMPOSER_CLIPBOARD_FRAGMENT_VERSION,
		segments: safeSegments,
		...requiresPromptNonce && { nonce: registerTrustedPromptFragmentNonce() }
	});
}
function getTokenFallbackText(token) {
	if (token.kind === "quote") return token.promptText ?? token.description ?? token.label;
	if (token.kind === "promptVariable") return token.promptText ?? token.description ?? token.label;
	if (token.kind === "skill") return `/${token.id.startsWith("skill:") ? token.id.slice(6) : token.label}/`;
	if (token.kind === "knowledge") return `#${token.id.startsWith("knowledge:") ? token.id.slice(10) : token.label}#`;
	return token.promptText ?? token.label;
}
function readMessageFilePayload(part) {
	if (part.type !== "file") return void 0;
	const filePart = part;
	const cherry = readCherryMeta(part);
	const fileTokenSourceId = cherry?.fileTokenSourceId;
	if (!fileTokenSourceId) return void 0;
	const path = stripFileUrl(filePart.url);
	if (!path) return void 0;
	const name = filePart.filename || path.split(/[\\/]/).pop() || "";
	const ext = getFileExtensionFromName(name);
	return {
		id: cherry.fileEntryId ?? fileTokenSourceId,
		fileTokenSourceId,
		type: filePart.mediaType?.startsWith("image/") ? FILE_TYPE.IMAGE : getFileTypeByExt(ext),
		...ext && { ext },
		...name && {
			name,
			origin_name: name
		},
		path
	};
}
function collectFilePayloadsBySourceId(parts) {
	const payloads = /* @__PURE__ */ new Map();
	for (const part of parts) {
		const payload = readMessageFilePayload(part);
		if (!payload) continue;
		payloads.set(payload.fileTokenSourceId, payload);
	}
	return payloads;
}
function mergeFileTokenPayload(token, filePayloadsBySourceId) {
	if (token.kind !== "file") return token;
	const tokenPayload = readFileDisplayPayload(token.payload) ?? void 0;
	const sourceId = readComposerFileTokenSourceIdFromTokenId(token.id);
	const matchingFilePayload = sourceId ? filePayloadsBySourceId.get(sourceId) : void 0;
	if (!matchingFilePayload) return tokenPayload ? {
		...token,
		payload: tokenPayload
	} : token;
	return {
		...token,
		payload: {
			...matchingFilePayload,
			...tokenPayload,
			path: matchingFilePayload.path,
			fileTokenSourceId: sourceId
		}
	};
}
function appendTextSegment(segments, text) {
	if (!text) return;
	const last = segments[segments.length - 1];
	if (last?.type === "text") {
		last.text += text;
		return;
	}
	segments.push({
		type: "text",
		text
	});
}
function appendTokenSegment(segments, token, fallbackText) {
	if (!token.id || !token.label || !isComposerClipboardToken(token)) {
		appendTextSegment(segments, fallbackText);
		return Boolean(fallbackText);
	}
	if (!fallbackText) return false;
	segments.push({
		type: "token",
		token,
		fallbackText
	});
	return true;
}
function projectTokensOverText(text, tokens) {
	const segments = [];
	let plainText = "";
	let cursor = 0;
	let hasToken = false;
	for (const token of tokens) {
		const offset = Math.max(cursor, Math.min(text.length, token.textOffset));
		if (offset > cursor) {
			const chunk = text.slice(cursor, offset);
			plainText += chunk;
			appendTextSegment(segments, chunk);
			cursor = offset;
		}
		const fallbackText = getTokenFallbackText(token);
		plainText += fallbackText;
		hasToken = appendTokenSegment(segments, token, fallbackText) || hasToken;
		if (token.promptText && text.slice(offset, offset + token.promptText.length) === token.promptText) cursor = Math.max(cursor, offset + token.promptText.length);
	}
	if (cursor < text.length) {
		const chunk = text.slice(cursor);
		plainText += chunk;
		appendTextSegment(segments, chunk);
	}
	return {
		plainText,
		segments,
		hasToken
	};
}
function projectTextPartToClipboardSegments(part, filePayloadsBySourceId) {
	const composer = readCherryMeta(part)?.composer;
	if (!composer?.tokens.length) return {
		plainText: part.text,
		segments: part.text ? [{
			type: "text",
			text: part.text
		}] : [],
		hasToken: false
	};
	const tokens = composer.tokens.filter((token) => isComposerClipboardTokenKind(token.kind) && token.label).toSorted((a, b) => a.textOffset - b.textOffset || a.index - b.index).map((token) => mergeFileTokenPayload(token, filePayloadsBySourceId));
	return projectTokensOverText(part.text, tokens);
}
function projectComposerClipboardPartGroup(parts) {
	const filePayloadsBySourceId = collectFilePayloadsBySourceId(parts);
	const projections = parts.filter((part) => part.type === "text").map((part) => projectTextPartToClipboardSegments(part, filePayloadsBySourceId)).filter((projection) => projection.plainText.trim().length > 0);
	const segments = [];
	projections.forEach((projection, index) => {
		if (index > 0) appendTextSegment(segments, "\n\n");
		projection.segments.forEach((segment) => {
			if (segment.type === "text") appendTextSegment(segments, segment.text);
			else segments.push(segment);
		});
	});
	return {
		plainText: projections.map((projection) => projection.plainText).join("\n\n"),
		segments,
		hasToken: projections.some((projection) => projection.hasToken)
	};
}
function projectComposerClipboardDraft(draft) {
	const tokens = draft.tokens.filter((token) => token.label || token.promptText).toSorted((a, b) => a.textOffset - b.textOffset || a.index - b.index);
	return projectTokensOverText(draft.text, tokens);
}
function createComposerRichClipboardContentFromProjection(projection) {
	if (!projection.hasToken || !projection.plainText) return null;
	return {
		plainText: projection.plainText,
		html: createComposerClipboardTextHtml(projection.plainText),
		customFormats: { [COMPOSER_CLIPBOARD_FRAGMENT_MIME]: createComposerClipboardFragment(projection.segments) }
	};
}
function createComposerRichClipboardContentFromParts(parts) {
	return createComposerRichClipboardContentFromProjection(projectComposerClipboardPartGroup(parts));
}
function createComposerRichClipboardContentFromDraft(draft) {
	return createComposerRichClipboardContentFromProjection(projectComposerClipboardDraft(draft));
}
function createComposerRichClipboardContentFromPartGroups(partGroups, separator) {
	const projections = partGroups.map(projectComposerClipboardPartGroup).filter((projection) => projection.plainText);
	const segments = [];
	projections.forEach((projection, index) => {
		if (index > 0) appendTextSegment(segments, separator);
		projection.segments.forEach((segment) => {
			if (segment.type === "text") appendTextSegment(segments, segment.text);
			else segments.push(segment);
		});
	});
	return createComposerRichClipboardContentFromProjection({
		plainText: projections.map((projection) => projection.plainText).join(separator),
		segments,
		hasToken: projections.some((projection) => projection.hasToken)
	});
}
function createComposerAttachmentFromComposerClipboardToken(token) {
	if (token.kind !== "file" || !token.payload?.handle) return null;
	const sourceId = readComposerFileTokenSourceIdFromTokenId(token.id);
	if (!sourceId) return null;
	const file = resolveFileRestorationHandle(token.payload.handle, sourceId);
	return file ? toComposerAttachment(file) : null;
}
function readComposerClipboardFragment(value) {
	if (!value || value.length > COMPOSER_CLIPBOARD_FRAGMENT_MAX_LENGTH) return null;
	try {
		const parsed = JSON.parse(value);
		if (!isRecord(parsed) || parsed.version !== COMPOSER_CLIPBOARD_FRAGMENT_VERSION || !Array.isArray(parsed.segments)) return null;
		const trustedPromptText = isTrustedPromptFragmentNonce(parsed.nonce);
		const segments = parsed.segments.map((segment) => sanitizeComposerClipboardSegment(segment, trustedPromptText));
		if (segments.some((segment) => segment === null)) return null;
		return {
			version: COMPOSER_CLIPBOARD_FRAGMENT_VERSION,
			segments
		};
	} catch {
		return null;
	}
}
function readComposerClipboardFragmentFromDataTransfer(clipboardData) {
	return readComposerClipboardFragment(clipboardData?.getData("web application/x-cherry-composer-fragment+json") || "");
}
var sessionCachedRichClipboardWrite = null;
function normalizeClipboardLineEndings(text) {
	return text.replace(/\r\n/g, "\n");
}
function readComposerClipboardFragmentFromSessionCache(pastedText) {
	const cached = sessionCachedRichClipboardWrite;
	if (!cached || !pastedText) return null;
	return normalizeClipboardLineEndings(pastedText) === cached.plainText ? cached.fragment : null;
}
function writeComposerClipboardData(clipboardData, content) {
	clipboardData.setData("text/plain", content.plainText);
	clipboardData.setData("text/html", content.html);
	for (const [type, value] of Object.entries(content.customFormats ?? {})) clipboardData.setData(type, value);
}
async function writeComposerRichClipboardContent(content) {
	sessionCachedRichClipboardWrite = null;
	const clipboardItemConstructor = window.ClipboardItem;
	if (navigator.clipboard && clipboardItemConstructor) {
		const baseItems = {
			"text/plain": new Blob([content.plainText], { type: "text/plain" }),
			"text/html": new Blob([content.html], { type: "text/html" })
		};
		const customItems = Object.fromEntries(Object.entries(content.customFormats ?? {}).flatMap(([type, value]) => {
			const supports = clipboardItemConstructor.supports?.bind(clipboardItemConstructor);
			if (supports && !supports(type)) return [];
			return [[type, new Blob([value], { type })]];
		}));
		if (Object.keys(customItems).length > 0) try {
			await navigator.clipboard.write([new clipboardItemConstructor({
				...baseItems,
				...customItems
			})]);
			const fragment = customItems["web application/x-cherry-composer-fragment+json"] ? readComposerClipboardFragment(content.customFormats?.["web application/x-cherry-composer-fragment+json"] ?? "") : null;
			if (fragment) sessionCachedRichClipboardWrite = {
				plainText: normalizeClipboardLineEndings(content.plainText),
				fragment
			};
			return;
		} catch (error) {
			logger.warn("Failed to write composer clipboard custom formats, falling back to text-only data", error);
			await navigator.clipboard.write([new clipboardItemConstructor(baseItems)]);
			return;
		}
		await navigator.clipboard.write([new clipboardItemConstructor(baseItems)]);
		return;
	}
	await navigator.clipboard.writeText(content.plainText);
}
export { readComposerClipboardFragmentFromDataTransfer as a, writeComposerRichClipboardContent as c, createComposerRichClipboardContentFromParts as i, toComposerAttachment as l, createComposerRichClipboardContentFromDraft as n, readComposerClipboardFragmentFromSessionCache as o, createComposerRichClipboardContentFromPartGroups as r, writeComposerClipboardData as s, createComposerAttachmentFromComposerClipboardToken as t, toComposerAttachments as u };
