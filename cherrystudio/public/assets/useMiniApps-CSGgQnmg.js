import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { E as setSidebarAppPinned, O as toggleSidebarMiniApp, S as removeSidebarMiniApp, d as useOptionalTabsContext, h as getOrderedVisibleSidebarFavorites, m as getOrderedVisibleSidebarFavoriteItems, w as reorderSidebarFavorites, y as getSidebarMiniAppFavoriteIds } from "./tab-BIOOjV6R.js";
import { t as useCache } from "./useCache-DNNSH80c.js";
import { a as isDataApiError, c as toDataApiError, r as DataApiErrorFactory, t as dataApiService } from "./DataApiService-De4qIOPj.js";
import { a as useInvalidateCache, c as useQuery, o as useMutation } from "./useDataApi-DxcxHgaT.js";
import { n as computeMinimalMoves, t as useReorder } from "./useReorder-BgG0nfey.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function useSidebarFavorites() {
	const { t } = useTranslation();
	const [favorites, setFavorites] = usePreference("ui.sidebar.favorites");
	const favoriteItems = (0, import_react.useMemo)(() => getOrderedVisibleSidebarFavoriteItems(favorites), [favorites]);
	const appFavorites = (0, import_react.useMemo)(() => getOrderedVisibleSidebarFavorites(favorites), [favorites]);
	const miniAppFavoriteIds = (0, import_react.useMemo)(() => getSidebarMiniAppFavoriteIds(favorites), [favorites]);
	const persist = (0, import_react.useCallback)((next) => {
		setFavorites(next).catch(() => {
			toast.error(t("common.error"));
		});
	}, [setFavorites, t]);
	const setAppPinned = (0, import_react.useCallback)((id, pinned) => persist(setSidebarAppPinned(favorites, id, pinned)), [favorites, persist]);
	const toggleMiniApp = (0, import_react.useCallback)((id) => persist(toggleSidebarMiniApp(favorites, id)), [favorites, persist]);
	const removeMiniApp = (0, import_react.useCallback)((id) => {
		if (!miniAppFavoriteIds.includes(id)) return;
		persist(removeSidebarMiniApp(favorites, id));
	}, [
		favorites,
		miniAppFavoriteIds,
		persist
	]);
	return {
		favorites: favoriteItems,
		appFavorites,
		miniAppFavoriteIds,
		setAppPinned,
		reorderFavorites: (0, import_react.useCallback)((orderedItems) => persist(reorderSidebarFavorites(favorites, orderedItems)), [favorites, persist]),
		toggleMiniApp,
		removeMiniApp
	};
}
var logger$1 = loggerService.withContext("WebviewStateManager");
var globalWebviewStates = /* @__PURE__ */ new Map();
var appListeners = /* @__PURE__ */ new Map();
var emitState = (appId, loaded) => {
	const listeners = appListeners.get(appId);
	if (listeners && listeners.size) listeners.forEach((cb) => {
		try {
			cb(loaded);
		} catch (e) {
			logger$1.debug(`Listener error for ${appId}: ${e.message}`);
		}
	});
};
const setWebviewLoaded = (appId, loaded) => {
	globalWebviewStates.set(appId, loaded);
	logger$1.debug(`WebView state set for ${appId}: ${loaded}`);
	emitState(appId, loaded);
};
const getWebviewLoaded = (appId) => {
	return globalWebviewStates.get(appId) || false;
};
const clearWebviewState = (appId) => {
	if (globalWebviewStates.delete(appId)) logger$1.debug(`WebView state cleared for ${appId}`);
	emitState(appId, false);
};
const onWebviewStateChange = (appId, listener) => {
	let listeners = appListeners.get(appId);
	if (!listeners) {
		listeners = /* @__PURE__ */ new Set();
		appListeners.set(appId, listeners);
	}
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
		if (listeners.size === 0) appListeners.delete(appId);
	};
};
var isVisibleForRegion = (app, region) => {
	if (region === "CN") return true;
	if (!app.supportedRegions || app.supportedRegions.length === 0) return app.presetMiniAppId === null;
	return app.supportedRegions.includes("Global");
};
function isVisibleStatus(status) {
	return status === "enabled" || status === "pinned";
}
function compareOrderKey(a, b) {
	return a.orderKey < b.orderKey ? -1 : a.orderKey > b.orderKey ? 1 : 0;
}
var filterByRegion = (apps, region) => {
	return apps.filter((app) => isVisibleForRegion(app, region));
};
var regionDetectionPromise = null;
var detectUserRegion = async () => {
	if (regionDetectionPromise) return regionDetectionPromise;
	regionDetectionPromise = (async () => {
		try {
			return (await ipcApi.request("system.get_ip_country")).toUpperCase() === "CN" ? "CN" : "Global";
		} catch (err) {
			const error = err;
			loggerService.withContext("detectUserRegion").error("Region detection failed, falling back to CN", {
				error: error.message,
				stack: error.stack,
				fallback: "CN"
			});
			return "CN";
		}
	})();
	return regionDetectionPromise;
};
var logger = loggerService.withContext("useMiniApps");
var MINI_APP_ROUTE_PREFIX = "/app/mini-app/";
function miniAppIdFromTabUrl(url) {
	if (!url.startsWith(MINI_APP_ROUTE_PREFIX)) return null;
	const id = url.slice(14).split("/")[0];
	return id ? id : null;
}
async function settleAndInvalidate(results, invalidate, label) {
	const fulfilled = results.filter((r) => r.status === "fulfilled");
	const rejected = results.filter((r) => r.status === "rejected");
	if (rejected.length > 0) {
		const failures = rejected.map((f) => {
			const err = toDataApiError(f.reason);
			return isDataApiError(err) ? {
				code: err.code,
				message: err.message
			} : {
				code: "UNKNOWN",
				message: String(f.reason)
			};
		});
		logger.error(`${label}: ${rejected.length} of ${results.length} updates failed`, { failures });
		await invalidate("/mini-apps");
		throw DataApiErrorFactory.invalidOperation(`${label}: ${rejected.length} of ${results.length} updates failed`, resolver_default.t("miniApp.update_partial_failure", {
			failed: rejected.length,
			total: results.length
		}));
	}
	return fulfilled.map((r) => r.value);
}
const useMiniApps = (options = {}) => {
	const queryEnabled = options.enabled ?? true;
	const { data, isLoading, error, mutate: refetch } = useQuery("/mini-apps", { enabled: queryEnabled });
	const rawApps = (0, import_react.useMemo)(() => data ?? [], [data]);
	const { allApps, enabled, disabled, pinned } = (0, import_react.useMemo)(() => {
		const all = [];
		const ena = [];
		const dis = [];
		const pin = [];
		for (const app of rawApps) {
			all.push(app);
			if (app.status === "enabled") ena.push(app);
			else if (app.status === "disabled") dis.push(app);
			else if (app.status === "pinned") pin.push(app);
		}
		return {
			allApps: all,
			enabled: ena,
			disabled: dis,
			pinned: pin
		};
	}, [rawApps]);
	const [miniAppRegionSetting] = usePreference("feature.mini_app.region");
	const [detectedRegion, setDetectedRegion] = useCache("mini_app.detected_region");
	const effectiveRegion = miniAppRegionSetting === "auto" ? detectedRegion ?? "CN" : miniAppRegionSetting === "CN" || miniAppRegionSetting === "Global" ? miniAppRegionSetting : "CN";
	(0, import_react.useEffect)(() => {
		if (!queryEnabled || miniAppRegionSetting !== "auto" || detectedRegion) return;
		let cancelled = false;
		detectUserRegion().then((region) => {
			if (!cancelled) setDetectedRegion(region);
		}).catch((err) => {
			const error$1 = err;
			loggerService.withContext("useMiniApps").error("Region detection failed in effect, falling back to CN", {
				error: error$1.message,
				stack: error$1.stack,
				fallback: "CN"
			});
			if (!cancelled) setDetectedRegion("CN");
		});
		return () => {
			cancelled = true;
		};
	}, [
		detectedRegion,
		miniAppRegionSetting,
		queryEnabled,
		setDetectedRegion
	]);
	const miniApps = (0, import_react.useMemo)(() => {
		return filterByRegion([...enabled, ...pinned], effectiveRegion).sort((a, b) => a.orderKey < b.orderKey ? -1 : a.orderKey > b.orderKey ? 1 : 0);
	}, [
		enabled,
		effectiveRegion,
		pinned
	]);
	const disabledApps = (0, import_react.useMemo)(() => filterByRegion(disabled, effectiveRegion), [disabled, effectiveRegion]);
	const pinnedApps = pinned;
	const [openedKeepAliveMiniApps, setOpenedKeepAliveMiniApps] = useCache("mini_app.opened_keep_alive");
	const openedKeepAliveRef = (0, import_react.useRef)(openedKeepAliveMiniApps);
	openedKeepAliveRef.current = openedKeepAliveMiniApps;
	const [currentMiniAppId, setCurrentMiniAppId] = useCache("mini_app.current_id");
	const [miniAppShow, setMiniAppShow] = useCache("mini_app.show");
	const [openedOneOffMiniApp, setOpenedOneOffMiniApp] = useCache("mini_app.opened_oneoff");
	const { removeMiniApp: removeSidebarFavoriteMiniApp } = useSidebarFavorites();
	const tabsContext = useOptionalTabsContext();
	const invalidate = useInvalidateCache();
	const patchApp = (0, import_react.useCallback)(async (appId, body) => {
		try {
			const result = await dataApiService.patch(`/mini-apps/${encodeURIComponent(appId)}`, { body });
			await invalidate("/mini-apps");
			return result;
		} catch (error$1) {
			logger.error("Failed to patch mini app", {
				appId,
				error: toDataApiError(error$1)
			});
			throw toDataApiError(error$1);
		}
	}, [invalidate]);
	const { trigger: postMiniApp } = useMutation("POST", "/mini-apps", { refresh: ["/mini-apps"] });
	const { applyReorderedList: applyMiniAppOrder } = useReorder("/mini-apps", { idKey: "appId" });
	const { trigger: patchAppTrigger } = useMutation("PATCH", "/mini-apps/:appId", { refresh: ["/mini-apps"] });
	const { trigger: patchMiniAppOrderTrigger } = useMutation("PATCH", "/mini-apps/:id/order", { refresh: ["/mini-apps"] });
	const { trigger: patchMiniAppOrderBatchTrigger } = useMutation("PATCH", "/mini-apps/order:batch", { refresh: ["/mini-apps"] });
	const { trigger: deleteAppTrigger } = useMutation("DELETE", "/mini-apps/:appId", { refresh: ["/mini-apps"] });
	const updateAppStatus = (0, import_react.useCallback)(async (appId, status) => {
		try {
			return await patchAppTrigger({
				params: { appId },
				body: { status }
			});
		} catch (error$1) {
			logger.error("Failed to update app status", {
				appId,
				error: toDataApiError(error$1)
			});
			throw toDataApiError(error$1);
		}
	}, [patchAppTrigger]);
	const setAppStatusBulk = (0, import_react.useCallback)(async (updates) => {
		if (updates.length === 0) return Promise.resolve([]);
		return Promise.allSettled(updates.map((u) => patchApp(u.appId, { status: u.status }))).then((results) => settleAndInvalidate(results, invalidate, "setAppStatusBulk"));
	}, [patchApp, invalidate]);
	const createCustomMiniApp = (0, import_react.useCallback)(async (dto) => {
		try {
			return await postMiniApp({ body: dto });
		} catch (error$1) {
			logger.error("Failed to create custom mini app", { error: toDataApiError(error$1) });
			throw toDataApiError(error$1);
		}
	}, [postMiniApp]);
	const syncOpenedCustomMiniApp = (0, import_react.useCallback)((updated) => {
		const openedKeepAliveApp = openedKeepAliveRef.current.find((app) => app.appId === updated.appId);
		const openedOneOffApp = openedOneOffMiniApp?.appId === updated.appId ? openedOneOffMiniApp : null;
		const urlChanged = openedKeepAliveApp !== void 0 && openedKeepAliveApp.url !== updated.url || openedOneOffApp !== null && openedOneOffApp.url !== updated.url;
		if (openedKeepAliveApp) setOpenedKeepAliveMiniApps((prev) => prev.map((app) => app.appId === updated.appId ? updated : app));
		if (openedOneOffApp) setOpenedOneOffMiniApp(updated);
		if (urlChanged) setWebviewLoaded(updated.appId, false);
		const title = updated.nameKey ? resolver_default.t(updated.nameKey) : updated.name;
		const icon = updated.logoSrc ?? updated.logo;
		for (const tab of tabsContext?.tabs ?? []) if (miniAppIdFromTabUrl(tab.url) === updated.appId) tabsContext?.updateTab(tab.id, {
			title,
			icon
		});
	}, [
		openedOneOffMiniApp,
		setOpenedKeepAliveMiniApps,
		setOpenedOneOffMiniApp,
		tabsContext
	]);
	const cleanupOpenedCustomMiniApp = (0, import_react.useCallback)((appId) => {
		setOpenedKeepAliveMiniApps((prev) => prev.filter((app) => app.appId !== appId));
		if (openedOneOffMiniApp?.appId === appId) setOpenedOneOffMiniApp(null);
		if (currentMiniAppId === appId) {
			setCurrentMiniAppId("");
			setMiniAppShow(false);
		}
		clearWebviewState(appId);
		for (const tab of tabsContext?.tabs ?? []) if (miniAppIdFromTabUrl(tab.url) === appId) tabsContext?.closeTab(tab.id);
		removeSidebarFavoriteMiniApp(appId);
	}, [
		currentMiniAppId,
		openedOneOffMiniApp,
		setCurrentMiniAppId,
		setMiniAppShow,
		setOpenedKeepAliveMiniApps,
		setOpenedOneOffMiniApp,
		removeSidebarFavoriteMiniApp,
		tabsContext
	]);
	return {
		allApps,
		miniApps,
		disabled: disabledApps,
		pinned: pinnedApps,
		openedKeepAliveMiniApps,
		currentMiniAppId,
		miniAppShow,
		openedOneOffMiniApp,
		setOpenedKeepAliveMiniApps,
		setCurrentMiniAppId,
		setMiniAppShow,
		setOpenedOneOffMiniApp,
		isLoading,
		error,
		refetch,
		updateAppStatus,
		setAppStatusBulk,
		createCustomMiniApp,
		updateCustomMiniApp: (0, import_react.useCallback)(async (appId, dto) => {
			try {
				const updated = await patchAppTrigger({
					params: { appId },
					body: dto
				});
				try {
					syncOpenedCustomMiniApp(updated);
				} catch (syncError) {
					logger.error("Failed to sync opened custom mini app after update", {
						appId,
						error: syncError
					});
				}
				return updated;
			} catch (error$1) {
				logger.error("Failed to update custom mini app", {
					appId,
					error: toDataApiError(error$1)
				});
				throw toDataApiError(error$1);
			}
		}, [patchAppTrigger, syncOpenedCustomMiniApp]),
		refreshCustomMiniApp: (0, import_react.useCallback)(async (appId) => {
			try {
				syncOpenedCustomMiniApp(await dataApiService.get(`/mini-apps/${encodeURIComponent(appId)}`));
			} catch (syncError) {
				logger.error("Failed to sync custom mini app after logo update", {
					appId,
					error: syncError
				});
			}
			try {
				await invalidate("/mini-apps");
			} catch (refreshError) {
				logger.error("Failed to refresh mini apps after logo update", {
					appId,
					error: refreshError
				});
			}
		}, [invalidate, syncOpenedCustomMiniApp]),
		removeCustomMiniApp: (0, import_react.useCallback)(async (appId) => {
			try {
				const result = await deleteAppTrigger({ params: { appId } });
				try {
					cleanupOpenedCustomMiniApp(appId);
				} catch (syncError) {
					logger.error("Failed to cleanup opened custom mini app after delete", {
						appId,
						error: syncError
					});
				}
				return result;
			} catch (error$1) {
				logger.error("Failed to remove custom mini app", {
					appId,
					error: toDataApiError(error$1)
				});
				throw toDataApiError(error$1);
			}
		}, [cleanupOpenedCustomMiniApp, deleteAppTrigger]),
		reorderMiniApps: (0, import_react.useCallback)(async (orderedApps) => {
			try {
				await applyMiniAppOrder(orderedApps);
			} catch (error$1) {
				logger.error("Failed to reorder mini apps", { error: toDataApiError(error$1) });
				throw toDataApiError(error$1);
			}
		}, [applyMiniAppOrder]),
		reorderMiniAppsByStatus: (0, import_react.useCallback)(async (status, orderedPartition) => {
			const inScope = (app) => status === "visible" ? isVisibleStatus(app.status) : app.status === status;
			const orderedIds = new Set(orderedPartition.map((app) => app.appId));
			const moves = computeMinimalMoves(allApps.filter((app) => orderedIds.has(app.appId) && inScope(app)).sort(compareOrderKey), orderedPartition, "appId");
			if (moves.length === 0) return;
			try {
				if (moves.length === 1) {
					const [move] = moves;
					await patchMiniAppOrderTrigger({
						params: { id: move.id },
						body: move.anchor
					});
				} else await patchMiniAppOrderBatchTrigger({ body: { moves } });
			} catch (error$1) {
				await invalidate("/mini-apps");
				logger.error("Failed to reorder mini apps within status", {
					status,
					error: toDataApiError(error$1)
				});
				throw toDataApiError(error$1);
			}
		}, [
			allApps,
			invalidate,
			patchMiniAppOrderBatchTrigger,
			patchMiniAppOrderTrigger
		])
	};
};
export { setWebviewLoaded as a, onWebviewStateChange as i, clearWebviewState as n, useSidebarFavorites as o, getWebviewLoaded as r, useMiniApps as t };
