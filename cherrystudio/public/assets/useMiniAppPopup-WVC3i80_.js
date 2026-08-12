import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { o as cacheService } from "./useCache-SsOQx-L2.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { d as useOptionalTabsContext } from "./tab-BoJ166Ld.js";
import { t as fileUrlToPath } from "./file-DzPAqnYr.js";
import { r as DataApiErrorFactory } from "./DataApiService-DP44jQXR.js";
import { n as clearWebviewState, t as useMiniApps } from "./useMiniApps-Cw2wO8m-.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useMiniAppPopup");
var DEFAULT_MAX_KEEP_ALIVE = 10;
function brandId(raw) {
	return raw;
}
function toTransientMiniApp(input) {
	return {
		...input,
		appId: brandId(input.appId),
		presetMiniAppId: null,
		status: "enabled",
		orderKey: ""
	};
}
function evictMiniApp(appId) {
	try {
		clearWebviewState(appId);
	} catch (error) {
		logger.error("Error during miniapp eviction", error);
	}
}
function evictWithPinExemption(list, cap, pinnedAppIds) {
	let toDrop = list.length - cap;
	if (toDrop <= 0 || pinnedAppIds === null) return {
		keep: list,
		evicted: []
	};
	const keep = [];
	const evicted = [];
	for (const app of list) if (toDrop > 0 && !pinnedAppIds.has(app.appId)) {
		evicted.push(app);
		toDrop--;
	} else keep.push(app);
	return {
		keep,
		evicted
	};
}
var MINI_APP_ROUTE_PREFIX = "/app/mini-app/";
function miniAppIdFromTabUrl(url) {
	if (!url.startsWith(MINI_APP_ROUTE_PREFIX)) return null;
	const id = url.slice(14).split("/")[0];
	return id ? id : null;
}
function openExternalMiniAppUrl(url) {
	try {
		const parsed = new URL(url);
		if (parsed.protocol === "file:") {
			ipcApi.request("system.shell.open_path", fileUrlToPath(parsed));
			return;
		}
	} catch {}
	ipcApi.request("system.shell.open_website", url);
}
const useMiniAppPopup = () => {
	const { allApps, openedKeepAliveMiniApps, openedOneOffMiniApp, miniAppShow, setOpenedKeepAliveMiniApps, setOpenedOneOffMiniApp, setCurrentMiniAppId, setMiniAppShow } = useMiniApps();
	const [maxKeepAliveMiniApps] = usePreference("feature.mini_app.max_keep_alive");
	const cap = maxKeepAliveMiniApps ?? DEFAULT_MAX_KEEP_ALIVE;
	const keepAliveRef = (0, import_react.useRef)(openedKeepAliveMiniApps);
	keepAliveRef.current = openedKeepAliveMiniApps;
	const tabsContext = useOptionalTabsContext();
	const tabs = tabsContext?.tabs ?? [];
	const openTab = tabsContext?.openTab;
	const pinnedMiniAppIds = (0, import_react.useMemo)(() => {
		if (!tabsContext) return null;
		const ids = /* @__PURE__ */ new Set();
		for (const tab of tabs) {
			if (!tab.isPinned) continue;
			const id = miniAppIdFromTabUrl(tab.url);
			if (id) ids.add(id);
		}
		return ids;
	}, [tabs, tabsContext]);
	const pinnedMiniAppIdsRef = (0, import_react.useRef)(pinnedMiniAppIds);
	pinnedMiniAppIdsRef.current = pinnedMiniAppIds;
	(0, import_react.useEffect)(() => {
		const list = keepAliveRef.current;
		if (list.length <= cap) return;
		const { keep, evicted } = evictWithPinExemption(list, cap, pinnedMiniAppIdsRef.current);
		if (evicted.length === 0) return;
		setOpenedKeepAliveMiniApps(keep);
		for (const app of evicted) evictMiniApp(app.appId);
	}, [cap, setOpenedKeepAliveMiniApps]);
	const openMiniApp = (0, import_react.useCallback)((app, keepAlive = false) => {
		if (keepAlive) {
			const list = keepAliveRef.current;
			if (list.some((item) => item.appId === app.appId)) {
				if (list[list.length - 1]?.appId !== app.appId) setOpenedKeepAliveMiniApps([...list.filter((item) => item.appId !== app.appId), app]);
				setCurrentMiniAppId(app.appId);
				setMiniAppShow(true);
				return;
			}
			const { keep, evicted } = evictWithPinExemption(list, Math.max(cap - 1, 0), pinnedMiniAppIdsRef.current);
			setOpenedKeepAliveMiniApps([...keep, app]);
			for (const evictedApp of evicted) evictMiniApp(evictedApp.appId);
			setOpenedOneOffMiniApp(null);
			setCurrentMiniAppId(app.appId);
			setMiniAppShow(true);
			return;
		}
		setOpenedOneOffMiniApp(app);
		setCurrentMiniAppId(app.appId);
		setMiniAppShow(true);
	}, [
		cap,
		setOpenedKeepAliveMiniApps,
		setOpenedOneOffMiniApp,
		setCurrentMiniAppId,
		setMiniAppShow
	]);
	const openMiniAppKeepAlive = (0, import_react.useCallback)((app) => {
		openMiniApp(app, true);
	}, [openMiniApp]);
	const openMiniAppById = (0, import_react.useCallback)((id, keepAlive = false) => {
		const appDef = allApps.find((app) => app.appId === id);
		if (!appDef) {
			logger.warn(`MiniApp not found: ${id}`);
			throw DataApiErrorFactory.notFound("MiniApp", id);
		}
		openMiniApp(appDef, keepAlive);
	}, [allApps, openMiniApp]);
	const closeMiniApp = (0, import_react.useCallback)((appid) => {
		const list = keepAliveRef.current;
		if (list.some((item) => item.appId === appid)) {
			setOpenedKeepAliveMiniApps(list.filter((item) => item.appId !== appid));
			evictMiniApp(appid);
		} else if (openedOneOffMiniApp?.appId === appid) setOpenedOneOffMiniApp(null);
		setCurrentMiniAppId("");
		setMiniAppShow(false);
	}, [
		openedOneOffMiniApp,
		setOpenedKeepAliveMiniApps,
		setOpenedOneOffMiniApp,
		setCurrentMiniAppId,
		setMiniAppShow
	]);
	const closeAllMiniApps = (0, import_react.useCallback)(() => {
		const list = keepAliveRef.current;
		setOpenedKeepAliveMiniApps([]);
		setOpenedOneOffMiniApp(null);
		setCurrentMiniAppId("");
		setMiniAppShow(false);
		for (const app of list) evictMiniApp(app.appId);
	}, [
		setOpenedKeepAliveMiniApps,
		setOpenedOneOffMiniApp,
		setCurrentMiniAppId,
		setMiniAppShow
	]);
	return {
		openMiniApp,
		openMiniAppKeepAlive,
		openMiniAppById,
		closeMiniApp,
		hideMiniAppPopup: (0, import_react.useCallback)(() => {
			if (!miniAppShow) return;
			if (openedOneOffMiniApp) {
				setOpenedOneOffMiniApp(null);
				setCurrentMiniAppId("");
			}
			setMiniAppShow(false);
		}, [
			miniAppShow,
			openedOneOffMiniApp,
			setOpenedOneOffMiniApp,
			setCurrentMiniAppId,
			setMiniAppShow
		]),
		closeAllMiniApps,
		openSmartMiniApp: (0, import_react.useCallback)((config) => {
			if (!openTab) {
				openExternalMiniAppUrl(config.url);
				return;
			}
			const app = toTransientMiniApp(config);
			cacheService.setShared(`mini_app.transient_descriptor.${app.appId}`, {
				appId: app.appId,
				name: app.name,
				url: app.url,
				...app.logo !== void 0 && { logo: app.logo },
				...app.logoSrc !== void 0 && { logoSrc: app.logoSrc }
			});
			const list = keepAliveRef.current;
			if (!list.some((item) => item.appId === app.appId)) {
				const { keep, evicted } = evictWithPinExemption(list, Math.max(cap - 1, 0), pinnedMiniAppIdsRef.current);
				setOpenedKeepAliveMiniApps([...keep, app]);
				for (const evictedApp of evicted) evictMiniApp(evictedApp.appId);
			}
			setCurrentMiniAppId(app.appId);
			setMiniAppShow(true);
			openTab(`/app/mini-app/${app.appId}`, {
				title: app.name,
				icon: app.logoSrc ?? app.logo
			});
		}, [
			cap,
			openTab,
			setOpenedKeepAliveMiniApps,
			setCurrentMiniAppId,
			setMiniAppShow
		])
	};
};
export { useMiniAppPopup as n, toTransientMiniApp as t };
