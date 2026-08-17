function trimEnd(str, chars) {
	if (chars === void 0) return str.trimEnd();
	let endIndex = str.length;
	switch (typeof chars) {
		case "string":
			if (chars.length !== 1) throw new Error(`The 'chars' parameter should be a single character string.`);
			while (endIndex > 0 && str[endIndex - 1] === chars) endIndex--;
			break;
		case "object": while (endIndex > 0 && chars.includes(str[endIndex - 1])) endIndex--;
	}
	return str.substring(0, endIndex);
}
function trimStart(str, chars) {
	if (chars === void 0) return str.trimStart();
	let startIndex = 0;
	switch (typeof chars) {
		case "string":
			if (chars.length !== 1) throw new Error(`The 'chars' parameter should be a single character string.`);
			while (startIndex < str.length && str[startIndex] === chars) startIndex++;
			break;
		case "object": while (startIndex < str.length && chars.includes(str[startIndex])) startIndex++;
	}
	return str.substring(startIndex);
}
function trim$1(str, chars) {
	if (chars === void 0) return str.trim();
	return trimStart(trimEnd(str, chars), chars);
}
function trim(str, chars, guard) {
	if (str == null) return "";
	if (guard != null || chars == null) return str.toString().trim();
	switch (typeof chars) {
		case "object": if (Array.isArray(chars)) return trim$1(str, chars.flatMap((x) => x.toString().split("")));
		else return trim$1(str, chars.toString().split(""));
		default: return trim$1(str, chars.toString().split(""));
	}
}
var TRAILING_VERSION_REGEX = /\/v\d+(?:alpha|beta)?\/?$/i;
var VERSION_REGEX = /\/v\d+(?:alpha|beta)?(?:\/|$)/i;
function formatApiKeys(value) {
	return value.replaceAll("，", ",").replaceAll("\n", ",");
}
function splitApiKeyString(keyStr) {
	return keyStr.split(/(?<!\\),/).map((key) => key.trim()).map((key) => key.replace(/\\,/g, ",")).filter(Boolean);
}
function maskApiKey(key) {
	if (!key) return "";
	if (key.length > 24) return `${key.slice(0, 8)}****${key.slice(-8)}`;
	else if (key.length > 16) return `${key.slice(0, 4)}****${key.slice(-4)}`;
	else if (key.length > 8) return `${key.slice(0, 2)}****${key.slice(-2)}`;
	else return key;
}
function joinApiKeyString(apiKeys) {
	return apiKeys.map((key) => key.replaceAll(",", "\\,")).join(", ");
}
function hasApiVersion(host) {
	if (!host) return false;
	try {
		const url = new URL(host);
		return VERSION_REGEX.test(url.pathname);
	} catch {
		return VERSION_REGEX.test(host);
	}
}
function withoutTrailingApiVersion(url) {
	return url.replace(TRAILING_VERSION_REGEX, "");
}
function withoutTrailingSlash(url) {
	return url.replace(/\/$/, "");
}
function isWithTrailingSharp(url) {
	return url.endsWith("#");
}
function withoutTrailingSharp(url) {
	return url.replace(/#$/, "");
}
function formatApiHost(host, supportApiVersion = true, apiVersion = "v1") {
	const normalizedHost = withoutTrailingSlash(trim(host));
	if (!normalizedHost) return "";
	if (!(normalizedHost.endsWith("#") || !supportApiVersion || hasApiVersion(normalizedHost))) return `${normalizedHost}/${apiVersion}`;
	else return withoutTrailingSharp(normalizedHost);
}
function isBareVertexApiHost(host) {
	try {
		const url = new URL(trim(host));
		return url.hostname.endsWith("aiplatform.googleapis.com") && url.pathname === "/" && !url.port && !url.search && !url.hash;
	} catch {
		return false;
	}
}
export { joinApiKeyString as a, withoutTrailingApiVersion as c, isWithTrailingSharp as i, withoutTrailingSlash as l, formatApiKeys as n, maskApiKey as o, isBareVertexApiHost as r, splitApiKeyString as s, formatApiHost as t, trim as u };
