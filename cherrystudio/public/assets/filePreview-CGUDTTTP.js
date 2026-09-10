import { d as createFilePathHandle, x as canonicalizeFilePath } from "./file-CkrjUGO_.js";
const FILE_PREVIEW_REFRESH_KEY = "filePreviewRefreshKey";
function getFilePreviewRefreshKey(metadata) {
	const value = metadata?.[FILE_PREVIEW_REFRESH_KEY];
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : 0;
}
function normalizeFilePreviewPath(filePath) {
	return createFilePathHandle(canonicalizeFilePath(filePath)).path;
}
function getFilePreviewFileName(filePath) {
	return filePath.split(/[/\\]/).filter(Boolean).at(-1) ?? filePath;
}
function getFilePreviewExtension(filePath) {
	const fileName = getFilePreviewFileName(filePath);
	const dotIndex = fileName.lastIndexOf(".");
	if (dotIndex <= 0 || dotIndex === fileName.length - 1) return null;
	return fileName.slice(dotIndex + 1).toLowerCase();
}
function parseFilePreviewRouteSearch(search) {
	if (typeof search.path !== "string") return { path: void 0 };
	try {
		return { path: normalizeFilePreviewPath(search.path) };
	} catch {
		return { path: void 0 };
	}
}
export { parseFilePreviewRouteSearch as a, normalizeFilePreviewPath as i, getFilePreviewFileName as n, getFilePreviewRefreshKey as r, getFilePreviewExtension as t };
