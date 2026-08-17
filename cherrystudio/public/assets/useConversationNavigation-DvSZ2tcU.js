import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { d as useOptionalTabsContext, g as getSidebarApp } from "./tab-BIOOjV6R.js";
import { t as v4_default } from "./v4-B6Ihluzs.js";
import { n as useWindowFrame } from "./useWindowFrame-B3nDfm6s.js";
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
