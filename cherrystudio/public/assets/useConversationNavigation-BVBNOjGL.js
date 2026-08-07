import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { _ as getSidebarApp, d as useOptionalTabsContext, p as buildSidebarAppOpenMetadata } from "./tab-CbOwJVjs.js";
import { t as v4_default } from "./v4-BSqPk4tJ.js";
import { n as useWindowFrame } from "./useWindowFrame-fMmvacK8.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function openConversationTabImpl(tabs, appId, key, title) {
	const app = getSidebarApp(appId);
	if (!tabs || !app?.instanceKey) return;
	const metadata = buildSidebarAppOpenMetadata(app, key);
	return tabs.openTab(app.routePrefix, {
		forceNew: true,
		title,
		...metadata && { metadata }
	});
}
function openConversationWindowImpl(appId, key, title) {
	const app = getSidebarApp(appId);
	if (!app?.instanceKey) return;
	const metadata = buildSidebarAppOpenMetadata(app, key);
	ipcApi.request("tab.detach", {
		id: v4_default(),
		url: app.instanceKey.urlForKey(key),
		title,
		type: "route",
		...metadata && { metadata }
	});
}
function useConversationNavigation(appId) {
	const tabs = useOptionalTabsContext();
	const isDetachedWindowFrame = useWindowFrame().mode === "window";
	return (0, import_react.useMemo)(() => ({
		openConversationTab: (key, title) => isDetachedWindowFrame ? void 0 : openConversationTabImpl(tabs, appId, key, title),
		openConversation: (key, title) => {
			if (tabs && !isDetachedWindowFrame) return openConversationTabImpl(tabs, appId, key, title);
			openConversationWindowImpl(appId, key, title);
		},
		openConversationWindow: (key, title) => openConversationWindowImpl(appId, key, title)
	}), [
		appId,
		isDetachedWindowFrame,
		tabs
	]);
}
export { useConversationNavigation as t };
