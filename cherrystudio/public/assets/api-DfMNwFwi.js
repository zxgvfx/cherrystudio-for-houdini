import { l as withoutTrailingSlash, r as isBareVertexApiHost, t as formatApiHost, u as trim } from "./format-CY6PeQcw.js";
function formatOllamaApiHost(host) {
	const normalizedHost = withoutTrailingSlash(host)?.replace(/\/v1$/, "")?.replace(/\/api$/, "")?.replace(/\/chat$/, "");
	return formatApiHost(normalizedHost + "/api", false);
}
function formatVertexApiHost(input) {
	const { apiHost, project, location } = input;
	const trimmedHost = withoutTrailingSlash(trim(apiHost ?? ""));
	if (!trimmedHost || isBareVertexApiHost(trimmedHost)) return `${formatApiHost(location === "global" ? "https://aiplatform.googleapis.com" : `https://${location}-aiplatform.googleapis.com`)}/projects/${project}/locations/${location}`;
	return formatApiHost(trimmedHost);
}
function validateApiHost(apiHost) {
	if (!apiHost || !trim(apiHost)) return true;
	try {
		const url = new URL(trim(apiHost));
		if (url.protocol !== "http:" && url.protocol !== "https:") return false;
		return true;
	} catch {
		return false;
	}
}
export { formatVertexApiHost as n, validateApiHost as r, formatOllamaApiHost as t };
