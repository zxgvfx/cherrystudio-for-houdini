import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as isEqual } from "./isEqual-DO7BtJs5.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { d as useOptionalTabsContext } from "./tab-BIOOjV6R.js";
import { t as cacheService } from "./CacheService-BxZWLQeF.js";
import { t as fileUrlToPath } from "./file-C52KaMrN.js";
import { r as DataApiErrorFactory } from "./DataApiService-De4qIOPj.js";
import { a as setWebviewLoaded, n as clearWebviewState, t as useMiniApps } from "./useMiniApps-CSGgQnmg.js";
import { i as trimMiniAppKeepAlive, r as miniAppIdFromTabUrl, t as DEFAULT_MAX_KEEP_ALIVE_MINI_APPS } from "./miniAppKeepAlive-BQxbqr-4.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useMiniAppPopup");
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
	const cap = maxKeepAliveMiniApps ?? 10;
	const keepAliveRef = (0, import_react.useRef)(openedKeepAliveMiniApps);
	keepAliveRef.current = openedKeepAliveMiniApps;
	const tabsContext = useOptionalTabsContext();
	const tabs = tabsContext?.tabs;
	const openTab = tabsContext?.openTab;
	const pinnedMiniAppIds = (0, import_react.useMemo)(() => {
		if (!tabs) return null;
		const ids = /* @__PURE__ */ new Set();
		for (const tab of tabs) {
			if (!tab.isPinned) continue;
			const id = miniAppIdFromTabUrl(tab.url);
			if (id) ids.add(id);
		}
		return ids;
	}, [tabs]);
	const pinnedMiniAppIdsRef = (0, import_react.useRef)(pinnedMiniAppIds);
	pinnedMiniAppIdsRef.current = pinnedMiniAppIds;
	const openMiniApp = (0, import_react.useCallback)((app, keepAlive = false) => {
		if (keepAlive) {
			const list = keepAliveRef.current;
			const cachedIndex = list.findIndex((item) => item.appId === app.appId);
			if (cachedIndex !== -1) {
				const cached = list[cachedIndex];
				const isTail = cachedIndex === list.length - 1;
				const changed = !isEqual(cached, app);
				if (!isTail || changed) {
					if (changed && cached.url !== app.url) setWebviewLoaded(app.appId, false);
					setOpenedKeepAliveMiniApps([...list.filter((item) => item.appId !== app.appId), app]);
				}
				setCurrentMiniAppId(app.appId);
				setMiniAppShow(true);
				return;
			}
			const { keep, evicted } = trimMiniAppKeepAlive(list, Math.max(cap - 1, 0), pinnedMiniAppIdsRef.current);
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
			const cachedIndex = list.findIndex((item) => item.appId === app.appId);
			if (!(cachedIndex !== -1)) {
				const { keep, evicted } = trimMiniAppKeepAlive(list, Math.max(cap - 1, 0), pinnedMiniAppIdsRef.current);
				setOpenedKeepAliveMiniApps([...keep, app]);
				for (const evictedApp of evicted) evictMiniApp(evictedApp.appId);
			} else if (list[cachedIndex].url !== app.url) {
				setWebviewLoaded(app.appId, false);
				const next = [...list];
				next[cachedIndex] = app;
				setOpenedKeepAliveMiniApps(next);
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
