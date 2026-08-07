var PATH_SEGMENT_PATTERN = String.raw`[^/\n\r\`"'<>|]+`;
var ABSOLUTE_FILE_PATH_PATTERN = new RegExp(String.raw`^/(?!/)(?:${PATH_SEGMENT_PATTERN}/)+${PATH_SEGMENT_PATTERN}/?$`);
var RELATIVE_EXPLICIT_PATH_PATTERN = new RegExp(String.raw`^\.{1,2}/(?:${PATH_SEGMENT_PATTERN}/)*${PATH_SEGMENT_PATTERN}/?$`);
var HOME_RELATIVE_FILE_PATH_PATTERN = new RegExp(String.raw`^~[/\\](?:${PATH_SEGMENT_PATTERN}[/\\])*${PATH_SEGMENT_PATTERN}/?$`);
var WORKSPACE_RELATIVE_FILE_PATH_PATTERN = new RegExp(String.raw`^(?:${PATH_SEGMENT_PATTERN}/)+${PATH_SEGMENT_PATTERN}\.[^/\`"'<>|.]+$`);
var INLINE_FILE_PATH_LOCATION_PATTERN = /(?::\d+){1,2}$/;
var inlineFilePathHomePath = "";
function setInlineFilePathHomePath(homePath) {
	inlineFilePathHomePath = homePath?.trim().replace(/[\\/]+$/g, "") ?? "";
}
function expandHomeRelativePath(value) {
	if (!value.startsWith("~/") && !value.startsWith("~\\")) return value;
	if (!inlineFilePathHomePath) return value;
	return `${inlineFilePathHomePath}${value.slice(1)}`;
}
const normalizeInlineFilePath = (value) => value.trim().replace(/^[`("'[]+|[`)"'\],.;:!?]+$/g, "").replace(INLINE_FILE_PATH_LOCATION_PATTERN, "");
const resolveInlineFilePath = (value) => expandHomeRelativePath(normalizeInlineFilePath(value));
function isInlineFilePath(value) {
	const normalizedPath = normalizeInlineFilePath(value);
	const resolvedPath = resolveInlineFilePath(value);
	return ABSOLUTE_FILE_PATH_PATTERN.test(resolvedPath) || HOME_RELATIVE_FILE_PATH_PATTERN.test(normalizedPath) || RELATIVE_EXPLICIT_PATH_PATTERN.test(normalizedPath) || WORKSPACE_RELATIVE_FILE_PATH_PATTERN.test(normalizedPath);
}
export { setInlineFilePathHomePath as i, normalizeInlineFilePath as n, resolveInlineFilePath as r, isInlineFilePath as t };
