import { s as __toESM } from "./chunk-DiqNceaa.js";
import { r as resolver_default } from "./resolver-eUld2ti5.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BDTAufGC.js";
import { t as useWindowInitData } from "./useWindowInitData-C8-CHwDP.js";
import { a as normalizeSettingsPath, i as isSettingsPath, t as OPEN_MAIN_ROUTE_EVENT } from "./mainWindowNavigation-m8-JFOdz.js";
import { n as isPageTitledRoute } from "./routeTitle-BAQAVa2r.js";
const TAB_INSTANCE_METADATA_APP_ID = "instanceAppId";
const TAB_INSTANCE_METADATA_KEY = "instanceKey";
function isTabInstanceAppId(value) {
	return value === "assistants" || value === "agents";
}
function normalizeTabInstanceMetadata(value) {
	if (!value || typeof value !== "object") return void 0;
	const metadata = value;
	const appId = metadata[TAB_INSTANCE_METADATA_APP_ID];
	if (!isTabInstanceAppId(appId)) return void 0;
	const key = metadata[TAB_INSTANCE_METADATA_KEY];
	if (key !== void 0 && (typeof key !== "string" || !key)) return void 0;
	return {
		[TAB_INSTANCE_METADATA_APP_ID]: appId,
		...key ? { [TAB_INSTANCE_METADATA_KEY]: key } : {}
	};
}
function buildTabInstanceMetadata(currentMetadata, instance) {
	const metadata = { ...currentMetadata };
	if (instance.appId) {
		metadata[TAB_INSTANCE_METADATA_APP_ID] = instance.appId;
		if (instance.key) metadata[TAB_INSTANCE_METADATA_KEY] = instance.key;
		else delete metadata[TAB_INSTANCE_METADATA_KEY];
		return metadata;
	}
	delete metadata[TAB_INSTANCE_METADATA_APP_ID];
	delete metadata[TAB_INSTANCE_METADATA_KEY];
	return metadata;
}
function clearTabInstanceMetadata(currentMetadata) {
	if (!currentMetadata) return void 0;
	const metadata = { ...currentMetadata };
	delete metadata[TAB_INSTANCE_METADATA_APP_ID];
	delete metadata[TAB_INSTANCE_METADATA_KEY];
	return Object.keys(metadata).length ? metadata : void 0;
}
function getTabInstanceAppId(tab) {
	return normalizeTabInstanceMetadata(tab.metadata)?.[TAB_INSTANCE_METADATA_APP_ID];
}
function hasTabInstanceMetadataForApp(tab, appId) {
	return getTabInstanceAppId(tab) === appId;
}
function getTabInstanceKey(tab, appId) {
	const metadata = normalizeTabInstanceMetadata(tab.metadata);
	if (!metadata) return void 0;
	const metadataKey = metadata[TAB_INSTANCE_METADATA_KEY];
	if (metadata["instanceAppId"] !== appId || !metadataKey) return void 0;
	return metadataKey;
}
function getNormalConversationSearchParamFromUrl(url, name) {
	try {
		const params = new URL(url, "app://x").searchParams;
		if (params.get("view") === "message") return void 0;
		return params.get(name) ?? void 0;
	} catch {
		return;
	}
}
function isMessageOnlyConversationUrl(url) {
	try {
		return new URL(url, "app://x").searchParams.get("view") === "message";
	} catch {
		return false;
	}
}
const SIDEBAR_APPS = [
	{
		id: "assistants",
		routePrefix: "/app/chat",
		instanceKey: {
			keyFromUrl: (url) => getNormalConversationSearchParamFromUrl(url, "topicId"),
			defaultKey: ({ lastUsedTopicId }) => lastUsedTopicId ?? void 0,
			urlForKey: (key) => `/app/chat?topicId=${encodeURIComponent(key)}`
		}
	},
	{
		id: "agents",
		routePrefix: "/app/agents",
		instanceKey: {
			keyFromUrl: (url) => getNormalConversationSearchParamFromUrl(url, "sessionId"),
			defaultKey: ({ lastUsedSessionId }) => lastUsedSessionId ?? void 0,
			urlForKey: (key) => `/app/agents?sessionId=${encodeURIComponent(key)}`
		}
	},
	{
		id: "ai_pipeline",
		routePrefix: "/app/ai-pipeline"
	},
	{
		id: "paintings",
		routePrefix: "/app/paintings",
		resolveUrl: ({ defaultPaintingProvider }) => `/app/paintings/${defaultPaintingProvider}`
	},
	{
		id: "translate",
		routePrefix: "/app/translate"
	},
	{
		id: "mini_app",
		routePrefix: "/app/mini-app",
		exactRouteFocus: true
	},
	{
		id: "knowledge",
		routePrefix: "/app/knowledge"
	},
	{
		id: "files",
		routePrefix: "/app/files"
	},
	{
		id: "code_tools",
		routePrefix: "/app/code"
	},
	{
		id: "notes",
		routePrefix: "/app/notes"
	}
];
var SIDEBAR_APP_BY_ID = SIDEBAR_APPS.reduce((acc, app) => {
	acc[app.id] = app;
	return acc;
}, {});
function getSidebarApp(id) {
	return SIDEBAR_APP_BY_ID[id];
}
function tabBelongsToApp(app, url) {
	return url === app.routePrefix || url.startsWith(`${app.routePrefix}/`) || url.startsWith(`${app.routePrefix}?`);
}
function getSidebarAppTabInstanceKey(app, tab) {
	if (!app.instanceKey) return void 0;
	if (isMessageOnlyConversationUrl(tab.url)) return void 0;
	const metadataKey = getTabInstanceKey(tab, app.id);
	if (metadataKey) return metadataKey;
	if (hasTabInstanceMetadataForApp(tab, app.id)) return void 0;
	return app.instanceKey.keyFromUrl(tab.url);
}
function resolveSidebarAppTabEntryUrl(tab) {
	if (isMessageOnlyConversationUrl(tab.url)) return tab.url;
	const appId = getTabInstanceAppId(tab);
	const app = appId ? getSidebarApp(appId) : void 0;
	if (!app?.instanceKey || !tabBelongsToApp(app, tab.url)) return tab.url;
	const key = getSidebarAppTabInstanceKey(app, tab);
	if (key) return app.instanceKey.urlForKey(key);
	if (hasTabInstanceMetadataForApp(tab, app.id)) return app.routePrefix;
	return tab.url;
}
function buildSidebarAppOpenMetadata(app, key) {
	if (!app.instanceKey || !key) return void 0;
	if (app.id !== "assistants" && app.id !== "agents") return void 0;
	return buildTabInstanceMetadata(void 0, {
		appId: app.id,
		key
	});
}
const SIDEBAR_FAVORITE_ORDER = SIDEBAR_APPS.map((app) => app.id);
const REQUIRED_SIDEBAR_FAVORITES = ["assistants", "ai_pipeline"];
var sidebarFavoriteSet = new Set(SIDEBAR_FAVORITE_ORDER);
function getSidebarMenuPath(favorite, defaultPaintingProvider) {
	const app = getSidebarApp(favorite);
	if (!app) return "";
	return app.resolveUrl?.({ defaultPaintingProvider }) ?? app.routePrefix;
}
function resolveSidebarActiveItem(url) {
	return SIDEBAR_APPS.find((app) => app.exactRouteFocus ? url === app.routePrefix : tabBelongsToApp(app, url))?.id ?? "";
}
function isSidebarAppId(value) {
	return sidebarFavoriteSet.has(value);
}
function createSidebarAppFavorite(id) {
	return {
		type: "app",
		id
	};
}
function createSidebarMiniAppFavorite(id) {
	return {
		type: "mini_app",
		id
	};
}
function getSidebarFavoriteKey(favorite) {
	return `${favorite.type}:${favorite.id}`;
}
function isForwardCompatibleSidebarFavoriteItem(favorite) {
	const item = favorite;
	return typeof item.type === "string" && item.type !== "app" && item.type !== "mini_app" && typeof item.id === "string" && item.id.length > 0;
}
function getForwardCompatibleSidebarFavoriteItems(favorites) {
	const seen = /* @__PURE__ */ new Set();
	const items = [];
	for (const favorite of favorites ?? []) {
		if (!isForwardCompatibleSidebarFavoriteItem(favorite)) continue;
		const item = favorite;
		const key = `${item.type}:${item.id}`;
		if (seen.has(key)) continue;
		seen.add(key);
		items.push(favorite);
	}
	return items;
}
function preserveForwardCompatibleSidebarFavoriteItems(favorites, nextItems) {
	const futureItems = getForwardCompatibleSidebarFavoriteItems(favorites);
	return futureItems.length ? [...nextItems, ...futureItems] : nextItems;
}
function normalizeSidebarFavoriteItem(favorite) {
	switch (favorite.type) {
		case "app": return isSidebarAppId(favorite.id) ? { ...favorite } : void 0;
		case "mini_app": return favorite.id ? { ...favorite } : void 0;
		default: return;
	}
}
function getSidebarFavoriteItems(favorites) {
	const seen = /* @__PURE__ */ new Set();
	const items = [];
	for (const favorite of favorites ?? []) {
		const item = normalizeSidebarFavoriteItem(favorite);
		if (!item) continue;
		const key = getSidebarFavoriteKey(item);
		if (seen.has(key)) continue;
		seen.add(key);
		items.push(item);
	}
	return items;
}
function getSidebarMiniAppFavoriteIds(favorites) {
	return getSidebarFavoriteItems(favorites).flatMap((favorite) => favorite.type === "mini_app" ? [favorite.id] : []);
}
function getOrderedVisibleSidebarFavoriteItems(favorites) {
	const items = getSidebarFavoriteItems(favorites);
	return [...REQUIRED_SIDEBAR_FAVORITES.filter((id) => !items.some((item) => item.type === "app" && item.id === id)).map(createSidebarAppFavorite), ...items];
}
function getOrderedVisibleSidebarFavorites(favorites) {
	return getOrderedVisibleSidebarFavoriteItems(favorites).flatMap((favorite) => favorite.type === "app" && isSidebarAppId(favorite.id) ? [favorite.id] : []);
}
function reorderSidebarFavorites(favorites, orderedItems) {
	const items = getOrderedVisibleSidebarFavoriteItems(favorites);
	const byKey = new Map(items.map((item) => [getSidebarFavoriteKey(item), item]));
	const seen = /* @__PURE__ */ new Set();
	const reordered = [];
	for (const requested of orderedItems) {
		const key = getSidebarFavoriteKey(requested);
		const item = byKey.get(key);
		if (item && !seen.has(key)) {
			seen.add(key);
			reordered.push(item);
		}
	}
	for (const item of items) if (!seen.has(getSidebarFavoriteKey(item))) reordered.push(item);
	return preserveForwardCompatibleSidebarFavoriteItems(favorites, reordered);
}
function setSidebarAppPinned(favorites, id, pinned) {
	const items = getOrderedVisibleSidebarFavoriteItems(favorites);
	const isTarget = (item) => item.type === "app" && item.id === id;
	if (!pinned) {
		if (REQUIRED_SIDEBAR_FAVORITES.includes(id)) return preserveForwardCompatibleSidebarFavoriteItems(favorites, items);
		return preserveForwardCompatibleSidebarFavoriteItems(favorites, items.filter((item) => !isTarget(item)));
	}
	if (items.some(isTarget)) return preserveForwardCompatibleSidebarFavoriteItems(favorites, items);
	return preserveForwardCompatibleSidebarFavoriteItems(favorites, [...items, createSidebarAppFavorite(id)]);
}
function toggleSidebarMiniApp(favorites, id) {
	const items = getOrderedVisibleSidebarFavoriteItems(favorites);
	const isTarget = (item) => item.type === "mini_app" && item.id === id;
	if (items.some(isTarget)) return preserveForwardCompatibleSidebarFavoriteItems(favorites, items.filter((item) => !isTarget(item)));
	return preserveForwardCompatibleSidebarFavoriteItems(favorites, [...items, createSidebarMiniAppFavorite(id)]);
}
function removeSidebarMiniApp(favorites, id) {
	return preserveForwardCompatibleSidebarFavoriteItems(favorites, getOrderedVisibleSidebarFavoriteItems(favorites).filter((item) => !(item.type === "mini_app" && item.id === id)));
}
function getOrderedLaunchpadApps(stored) {
	const seen = /* @__PURE__ */ new Set();
	const ordered = [];
	for (const id of stored ?? []) if (isSidebarAppId(id) && !seen.has(id)) {
		seen.add(id);
		ordered.push(id);
	}
	for (const id of SIDEBAR_FAVORITE_ORDER) if (!seen.has(id)) {
		seen.add(id);
		ordered.push(id);
	}
	return ordered;
}
function reorderLaunchpadApps(stored, orderedIds) {
	const current = getOrderedLaunchpadApps(stored);
	const currentSet = new Set(current);
	const seen = /* @__PURE__ */ new Set();
	const next = [];
	for (const id of orderedIds) if (isSidebarAppId(id) && currentSet.has(id) && !seen.has(id)) {
		seen.add(id);
		next.push(id);
	}
	for (const id of current) if (!seen.has(id)) next.push(id);
	return next;
}
var import_react = /* @__PURE__ */ __toESM(require_react());
const TabsContext = (0, import_react.createContext)(null);
function useTabsContext() {
	const context = (0, import_react.use)(TabsContext);
	if (!context) throw new Error("useTabsContext must be used within a TabsProvider");
	return context;
}
function useOptionalTabsContext() {
	return (0, import_react.use)(TabsContext);
}
function useCloseConversationTabs() {
	const tabsContext = useOptionalTabsContext();
	return (0, import_react.useCallback)((appId, keys) => {
		if (!tabsContext || keys.length === 0) return;
		const app = getSidebarApp(appId);
		if (!app?.instanceKey) return;
		const keySet = new Set(keys);
		const tabIds = [];
		for (const tab of tabsContext.tabs) {
			if (tab.id === tabsContext.activeTabId) continue;
			if (tab.type !== "route" || !tabBelongsToApp(app, tab.url)) continue;
			const key = getSidebarAppTabInstanceKey(app, tab);
			if (key && keySet.has(key)) tabIds.push(tab.id);
		}
		tabsContext.closeTabs(tabIds);
	}, [tabsContext]);
}
const TabIdContext = (0, import_react.createContext)(null);
function useCurrentTabId() {
	return (0, import_react.use)(TabIdContext);
}
function useCurrentTab() {
	const currentTabId = useCurrentTabId();
	return useOptionalTabsContext()?.tabs.find((tab) => tab.id === currentTabId);
}
function useIsActiveTab() {
	const currentTabId = useCurrentTabId();
	const activeTabId = useOptionalTabsContext()?.activeTabId;
	return !!currentTabId && currentTabId === activeTabId;
}
function useTabs() {
	return useTabsContext();
}
function isSettingsTabUrl(url) {
	return url === "/settings" || url.startsWith("/settings/") || url.startsWith("/settings?");
}
function useOpenSettingsRoute() {
	const { tabs, openTab, setActiveTab, updateTab } = useTabs();
	const settingsTabIdRef = (0, import_react.useRef)(null);
	const pendingSettingsPathRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const settingsTab = tabs.find((tab) => tab.type === "route" && isSettingsTabUrl(tab.url));
		if (!settingsTab) {
			settingsTabIdRef.current = null;
			return;
		}
		settingsTabIdRef.current = settingsTab.id;
		const pendingPath = pendingSettingsPathRef.current;
		if (!pendingPath) return;
		pendingSettingsPathRef.current = null;
		updateTab(settingsTab.id, {
			url: pendingPath,
			title: resolver_default.t("settings.title"),
			lastAccessTime: Date.now()
		});
		setActiveTab(settingsTab.id);
	}, [
		tabs,
		setActiveTab,
		updateTab
	]);
	return (0, import_react.useCallback)((path) => {
		const targetPath = normalizeSettingsPath(path);
		const title = resolver_default.t("settings.title");
		const settingsTab = tabs.find((tab) => tab.type === "route" && isSettingsTabUrl(tab.url));
		if (settingsTab) {
			updateTab(settingsTab.id, {
				url: targetPath,
				title,
				lastAccessTime: Date.now()
			});
			setActiveTab(settingsTab.id);
			return;
		}
		if (settingsTabIdRef.current) {
			pendingSettingsPathRef.current = targetPath;
			return;
		}
		settingsTabIdRef.current = openTab(targetPath, { title });
	}, [
		tabs,
		openTab,
		setActiveTab,
		updateTab
	]);
}
function useMainRouteEventBridge(handleRoute) {
	(0, import_react.useEffect)(() => {
		const handleOpenMainRoute = (event) => {
			event.preventDefault();
			handleRoute(event.detail.path);
		};
		window.addEventListener(OPEN_MAIN_ROUTE_EVENT, handleOpenMainRoute);
		return () => {
			window.removeEventListener(OPEN_MAIN_ROUTE_EVENT, handleOpenMainRoute);
		};
	}, [handleRoute]);
}
function useMainWindowNavigation() {
	const openSettingsRoute = useOpenSettingsRoute();
	const { openTab } = useTabs();
	const initData = useWindowInitData();
	const handledNavigationRequestIdRef = (0, import_react.useRef)(null);
	const handleRoute = (0, import_react.useCallback)((to) => {
		if (isSettingsPath(to)) openSettingsRoute(to);
		else openTab(to);
	}, [openSettingsRoute, openTab]);
	useIpcOn("navigation.open_route_requested", ({ to }) => handleRoute(to));
	(0, import_react.useEffect)(() => {
		if (initData?.kind !== "navigation") return;
		if (handledNavigationRequestIdRef.current === initData.requestId) return;
		handledNavigationRequestIdRef.current = initData.requestId;
		handleRoute(initData.to);
		ipcApi.request("navigation.ack_open_route", { requestId: initData.requestId });
	}, [initData, handleRoute]);
	useMainRouteEventBridge(handleRoute);
	(0, import_react.useEffect)(() => {
		ipcApi.request("navigation.protocol_dispatch_ready");
	}, []);
}
const TAB_ICON_EMOJI_PREFIX = "emoji:";
function emojiTabIcon(emoji) {
	const glyph = emoji?.trim();
	return glyph ? `${TAB_ICON_EMOJI_PREFIX}${glyph}` : void 0;
}
var TAB_INSTANCE_ROUTE_PREFIX = {
	assistants: "/app/chat",
	agents: "/app/agents"
};
function tabBelongsToInstanceApp(tab, appId) {
	const routePrefix = TAB_INSTANCE_ROUTE_PREFIX[appId];
	return tab.url === routePrefix || tab.url.startsWith(`${routePrefix}?`) || tab.url.startsWith(`${routePrefix}/`);
}
function isMetadataEqual(left, right) {
	if (left === right) return true;
	if (!left || !right) return false;
	const leftKeys = Object.keys(left);
	const rightKeys = Object.keys(right);
	if (leftKeys.length !== rightKeys.length) return false;
	return leftKeys.every((key) => Object.is(left[key], right[key]));
}
function useTabSelfMetadata({ title, emoji, instanceAppId, instanceKey }) {
	const currentTabId = useCurrentTabId();
	const tabsContext = useOptionalTabsContext();
	const updateTab = tabsContext?.updateTab;
	const currentTab = tabsContext?.tabs.find((tab) => tab.id === currentTabId);
	(0, import_react.useEffect)(() => {
		if (!currentTabId || !updateTab || !currentTab) return;
		if (instanceAppId && !tabBelongsToInstanceApp(currentTab, instanceAppId)) return;
		const icon = emojiTabIcon(emoji);
		const metadata = buildTabInstanceMetadata(currentTab.metadata, {
			appId: instanceAppId,
			key: instanceKey
		});
		if (currentTab.id === "home" && !isPageTitledRoute(currentTab.url)) {
			if (isMetadataEqual(currentTab.metadata, metadata)) return;
			updateTab(currentTabId, { metadata });
			return;
		}
		if (currentTab.title === title && currentTab.icon === icon && isMetadataEqual(currentTab.metadata, metadata)) return;
		updateTab(currentTabId, {
			title,
			icon,
			metadata
		});
	}, [
		currentTabId,
		currentTab,
		updateTab,
		title,
		emoji,
		instanceAppId,
		instanceKey
	]);
}
export { toggleSidebarMiniApp as A, removeSidebarMiniApp as C, resolveSidebarAppTabEntryUrl as D, resolveSidebarActiveItem as E, getTabInstanceKey as M, setSidebarAppPinned as O, isSidebarAppId as S, reorderSidebarFavorites as T, getSidebarApp as _, TabIdContext as a, getSidebarMiniAppFavoriteIds as b, useIsActiveTab as c, useOptionalTabsContext as d, REQUIRED_SIDEBAR_FAVORITES as f, getOrderedVisibleSidebarFavorites as g, getOrderedVisibleSidebarFavoriteItems as h, useTabs as i, clearTabInstanceMetadata as j, tabBelongsToApp as k, useCloseConversationTabs as l, getOrderedLaunchpadApps as m, TAB_ICON_EMOJI_PREFIX as n, useCurrentTab as o, buildSidebarAppOpenMetadata as p, useMainWindowNavigation as r, useCurrentTabId as s, useTabSelfMetadata as t, TabsContext as u, getSidebarFavoriteKey as v, reorderLaunchpadApps as w, isMessageOnlyConversationUrl as x, getSidebarMenuPath as y };
