import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { d as useOptionalTabsContext, g as getSidebarApp } from "./tab-CVOgL8bf.js";
import { t as v4_default } from "./v4-D_N0UQip.js";
import { n as useWindowFrame } from "./useWindowFrame-BNKTfWS3.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function openConversationTabImpl(tabs, appId, key, title) {
	const app = getSidebarApp(appId);
	if (!tabs || !app?.conversationRoute) return;
	return tabs.openTab(app.conversationRoute.urlForKey(key), {
		forceNew: true,
		title
	});
}
function openConversationWindowImpl(appId, key, title) {
	const app = getSidebarApp(appId);
	if (!app?.conversationRoute) return;
	ipcApi.request("tab.detach", {
		id: v4_default(),
		url: app.conversationRoute.urlForKey(key),
		title,
		type: "route"
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
