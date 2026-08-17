import { t as v4_default } from "./v4-B6Ihluzs.js";
var FILE_COMPOSER_TOKEN_ID_PREFIX = "file:";
function createComposerSecureRandomId(prefix) {
	return `${prefix}-${v4_default()}`;
}
function isComposerFileTokenPathLike(value) {
	return value.toLowerCase().startsWith("file://") || value.startsWith("/") || value.startsWith("\\") || value.startsWith("~") || /^[A-Za-z]:[\\/]/.test(value);
}
function isComposerFileTokenSourceId(value) {
	return typeof value === "string" && value.length > 0 && !isComposerFileTokenPathLike(value);
}
function createComposerFileTokenSourceId() {
	return createComposerSecureRandomId("file-token");
}
function withComposerFileTokenSourceId(file) {
	if (getComposerFileTokenSourceId(file)) return file;
	return {
		...file,
		fileTokenSourceId: createComposerFileTokenSourceId()
	};
}
function ensureComposerFileTokenSourceIds(files) {
	let changed = false;
	const nextFiles = files.map((file) => {
		if (getComposerFileTokenSourceId(file)) return file;
		changed = true;
		return {
			...file,
			fileTokenSourceId: createComposerFileTokenSourceId()
		};
	});
	return changed ? nextFiles : files;
}
function composerFileTokenIdFromSourceId(sourceId) {
	return `${FILE_COMPOSER_TOKEN_ID_PREFIX}${sourceId}`;
}
function readComposerFileTokenIdSuffix(tokenId) {
	if (!tokenId.startsWith(FILE_COMPOSER_TOKEN_ID_PREFIX)) return void 0;
	return tokenId.slice(5) || void 0;
}
function readComposerFileTokenSourceIdFromTokenId(tokenId) {
	const sourceId = readComposerFileTokenIdSuffix(tokenId);
	return isComposerFileTokenSourceId(sourceId) ? sourceId : void 0;
}
function getComposerFileTokenSourceId(file) {
	if (isComposerFileTokenSourceId(file.fileTokenSourceId)) return file.fileTokenSourceId;
}
export { getComposerFileTokenSourceId as a, readComposerFileTokenSourceIdFromTokenId as c, ensureComposerFileTokenSourceIds as i, withComposerFileTokenSourceId as l, createComposerFileTokenSourceId as n, isComposerFileTokenPathLike as o, createComposerSecureRandomId as r, readComposerFileTokenIdSuffix as s, composerFileTokenIdFromSourceId as t };
