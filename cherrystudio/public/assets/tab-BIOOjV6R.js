import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-BuGMWdaI.js";
import { t as useWindowInitData } from "./useWindowInitData-nzW1IbOc.js";
import { a as normalizeSettingsPath, i as isSettingsPath, t as OPEN_MAIN_ROUTE_EVENT } from "./mainWindowNavigation-BoKv8CTA.js";
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
		const parsedUrl = new URL(url, "app://x");
		if (parsedUrl.searchParams.get("view") !== "message") return false;
		if (parsedUrl.pathname === "/app/chat") return Boolean(parsedUrl.searchParams.get("topicId"));
		if (parsedUrl.pathname === "/app/agents") return Boolean(parsedUrl.searchParams.get("sessionId"));
		return false;
	} catch {
		return false;
	}
}
const SIDEBAR_APPS = [
	{
		id: "assistants",
		routePrefix: "/app/chat",
		conversationRoute: {
			keyFromUrl: (url) => getNormalConversationSearchParamFromUrl(url, "topicId"),
			urlForKey: (key) => `/app/chat?topicId=${encodeURIComponent(key)}`
		}
	},
	{
		id: "agents",
		routePrefix: "/app/agents",
		conversationRoute: {
			keyFromUrl: (url) => getNormalConversationSearchParamFromUrl(url, "sessionId"),
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
function tabBelongsToApp$1(app, url) {
	return url === app.routePrefix || url.startsWith(`${app.routePrefix}/`) || url.startsWith(`${app.routePrefix}?`);
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
	return SIDEBAR_APPS.find((app) => app.exactRouteFocus ? url === app.routePrefix : tabBelongsToApp$1(app, url))?.id ?? "";
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
		if (!app?.conversationRoute) return;
		const keySet = new Set(keys);
		const tabIds = [];
		for (const tab of tabsContext.tabs) {
			if (tab.id === tabsContext.activeTabId) continue;
			if (tab.type !== "route" || !tabBelongsToApp$1(app, tab.url)) continue;
			const key = app.conversationRoute.keyFromUrl(tab.url);
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
function useOpenSettingsRoute() {
	const { tabs, openTab, setActiveTab, updateTab } = useTabs();
	const settingsTabIdRef = (0, import_react.useRef)(null);
	const pendingSettingsPathRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const settingsTab = tabs.find((tab) => tab.type === "route" && isSettingsPath(tab.url));
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
		const settingsTab = tabs.find((tab) => tab.type === "route" && isSettingsPath(tab.url));
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
var TAB_APP_ROUTE_PREFIX = {
	assistants: "/app/chat",
	agents: "/app/agents"
};
function tabBelongsToApp(tab, appId) {
	const routePrefix = TAB_APP_ROUTE_PREFIX[appId];
	return tab.url === routePrefix || tab.url.startsWith(`${routePrefix}?`) || tab.url.startsWith(`${routePrefix}/`);
}
function useTabSelfVisuals({ title, emoji, appId, preserveVisuals = false }) {
	const currentTabId = useCurrentTabId();
	const tabsContext = useOptionalTabsContext();
	const updateTab = tabsContext?.updateTab;
	const currentTab = tabsContext?.tabs.find((tab) => tab.id === currentTabId);
	(0, import_react.useEffect)(() => {
		if (!currentTabId || !updateTab || !currentTab) return;
		if (preserveVisuals) return;
		if (appId && !tabBelongsToApp(currentTab, appId)) return;
		const icon = emojiTabIcon(emoji);
		if (currentTab.title === title && currentTab.icon === icon) return;
		updateTab(currentTabId, {
			title,
			icon
		});
	}, [
		currentTabId,
		currentTab,
		updateTab,
		title,
		emoji,
		appId,
		preserveVisuals
	]);
}
export { reorderLaunchpadApps as C, tabBelongsToApp$1 as D, setSidebarAppPinned as E, toggleSidebarMiniApp as O, removeSidebarMiniApp as S, resolveSidebarActiveItem as T, getSidebarFavoriteKey as _, TabIdContext as a, isMessageOnlyConversationUrl as b, useIsActiveTab as c, useOptionalTabsContext as d, REQUIRED_SIDEBAR_FAVORITES as f, getSidebarApp as g, getOrderedVisibleSidebarFavorites as h, useTabs as i, useCloseConversationTabs as l, getOrderedVisibleSidebarFavoriteItems as m, TAB_ICON_EMOJI_PREFIX as n, useCurrentTab as o, getOrderedLaunchpadApps as p, useMainWindowNavigation as r, useCurrentTabId as s, useTabSelfVisuals as t, TabsContext as u, getSidebarMenuPath as v, reorderSidebarFavorites as w, isSidebarAppId as x, getSidebarMiniAppFavoriteIds as y };
