const DEFAULT_MAX_KEEP_ALIVE_MINI_APPS = 10;
const MINI_APP_ROUTE_PREFIX = "/app/mini-app/";
function miniAppIdFromTabUrl(url) {
	if (!url?.startsWith("/app/mini-app/")) return null;
	return url.slice(14).split(/[/?#]/, 1)[0] || null;
}
function trimMiniAppKeepAlive(list, targetSize, protectedAppIds) {
	let toDrop = list.length - targetSize;
	if (toDrop <= 0 || protectedAppIds === null) return {
		keep: list,
		evicted: []
	};
	const keep = [];
	const evicted = [];
	for (const app of list) if (toDrop > 0 && !protectedAppIds.has(app.appId)) {
		evicted.push(app);
		toDrop--;
	} else keep.push(app);
	return {
		keep,
		evicted
	};
}
export { trimMiniAppKeepAlive as i, MINI_APP_ROUTE_PREFIX as n, miniAppIdFromTabUrl as r, DEFAULT_MAX_KEEP_ALIVE_MINI_APPS as t };
