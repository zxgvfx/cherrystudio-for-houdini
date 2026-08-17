import { t as loggerService } from "./LoggerService-CbighP69.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
const DEFAULT_SETTINGS_PATH = "/settings/provider";
function isSettingsPath(value) {
	return typeof value === "string" && (value === "/settings" || value.startsWith("/settings?") || value.startsWith("/settings/"));
}
function normalizeSettingsPath(value) {
	return isSettingsPath(value) ? value : DEFAULT_SETTINGS_PATH;
}
var logger = loggerService.withContext("mainWindowNavigation");
const OPEN_MAIN_ROUTE_EVENT = "cherry:open-main-route";
function openRoute(path, query) {
	const search = query ? new URLSearchParams(query).toString() : "";
	const targetPath = search ? `${path}?${search}` : path;
	const event = new CustomEvent(OPEN_MAIN_ROUTE_EVENT, {
		cancelable: true,
		detail: { path: targetPath }
	});
	window.dispatchEvent(event);
	if (!event.defaultPrevented) ipcApi.request("navigation.open_route_in_main", { path: targetPath }).catch((error) => {
		logger.error("Failed to request main-window navigation", error);
	});
}
function openSettingsTab(path = DEFAULT_SETTINGS_PATH) {
	openRoute(normalizeSettingsPath(path));
}
export { normalizeSettingsPath as a, isSettingsPath as i, openRoute as n, openSettingsTab as r, OPEN_MAIN_ROUTE_EVENT as t };
