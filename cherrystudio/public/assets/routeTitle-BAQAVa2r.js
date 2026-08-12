import { r as resolver_default } from "./resolver-eUld2ti5.js";
var BASE_URL = "https://www.cherry-ai.com/";
var routeTitleKeys = {
	"/app/chat": "agent.session.group.conversation",
	"/app/agents": "title.work",
	"/app/ai-pipeline": "title.ai_pipeline",
	"/app/paintings": "title.paintings",
	"/app/translate": "title.translate",
	"/app/launchpad": "title.launchpad",
	"/app/mini-app": "title.apps",
	"/app/knowledge": "title.knowledge",
	"/app/files": "title.files",
	"/app/code": "title.code",
	"/app/notes": "title.notes",
	"/settings": "title.settings"
};
function getBasePath(pathname) {
	const segments = pathname.split("/").filter(Boolean);
	if (segments[0] === "app" && segments.length >= 2) return "/" + segments.slice(0, 2).join("/");
	return "/" + (segments[0] || "");
}
function getDefaultRouteTitle(url) {
	const sanitizedUrl = new URL(url, BASE_URL).pathname;
	const exactKey = routeTitleKeys[sanitizedUrl];
	if (exactKey) return resolver_default.t(exactKey);
	const baseKey = routeTitleKeys[getBasePath(sanitizedUrl)];
	if (baseKey) return resolver_default.t(baseKey);
	return sanitizedUrl.split("/").filter(Boolean).pop() || sanitizedUrl;
}
function isTopLevelRoute(url) {
	const parsedUrl = new URL(url, BASE_URL);
	return !parsedUrl.search && !parsedUrl.hash && routeTitleKeys[parsedUrl.pathname] !== void 0;
}
var PAGE_TITLED_ROUTE_BASE_PATHS = new Set(["/app/chat", "/app/agents"]);
function isPageTitledRoute(url) {
	const pathname = new URL(url, BASE_URL).pathname;
	return PAGE_TITLED_ROUTE_BASE_PATHS.has(getBasePath(pathname));
}
export { isPageTitledRoute as n, isTopLevelRoute as r, getDefaultRouteTitle as t };
