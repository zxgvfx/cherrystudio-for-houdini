import { s as __toESM } from "./chunk-DiqNceaa.js";
import { i as formatErrorMessageWithPrefix, s as getErrorMessage } from "./error-DgGhUgCT.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as useIpcOn } from "./ipc-BDTAufGC.js";
import { l as useCloseConversationTabs } from "./tab-CbOwJVjs.js";
import { a as useInvalidateCache, c as useQuery, i as useInfiniteQuery, o as useMutation, r as useInfiniteFlatItems } from "./useDataApi-DhDD9bgI.js";
import { t as useReorder } from "./useReorder-CHjMnht2.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { u as useTopics } from "./useTopic-ThwH_aKa.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var DEFAULT_SESSION_PAGE_SIZE = 20;
const useSession = (sessionId) => {
	const { data: session, error, isLoading, mutate } = useQuery("/agent-sessions/:sessionId", {
		params: { sessionId },
		enabled: !!sessionId,
		swrOptions: { keepPreviousData: false }
	});
	return {
		session,
		error,
		isLoading,
		mutate
	};
};
function useLatestSession(opts) {
	const { data, isLoading, isRefreshing, refetch, mutate } = useQuery("/agent-sessions/latest", { enabled: opts?.enabled });
	return {
		latestSession: data?.session ?? void 0,
		isLoading: isLoading || isRefreshing,
		refetch,
		mutate
	};
}
const useActiveSession = ({ activeSessionId, setActiveSessionId, initialSession }) => {
	const result = useSession(activeSessionId);
	const [pendingSession, setPendingSession] = (0, import_react.useState)(() => initialSession ?? null);
	const querySession = activeSessionId && result.session?.id === activeSessionId ? result.session : void 0;
	const resolvedPendingSession = activeSessionId && pendingSession?.id === activeSessionId ? pendingSession : void 0;
	const session = querySession ?? resolvedPendingSession;
	const sessionSource = querySession ? "query" : resolvedPendingSession ? "pending" : "none";
	const selectSession = (0, import_react.useCallback)((sessionId, entity) => {
		setPendingSession(entity ?? null);
		setActiveSessionId(sessionId);
	}, [setActiveSessionId]);
	const setActiveSession = (0, import_react.useCallback)((entity) => selectSession(entity.id, entity), [selectSession]);
	const clearActiveSession = (0, import_react.useCallback)(() => selectSession(null, null), [selectSession]);
	return {
		...result,
		session,
		sessionSource,
		isLoading: !session && result.isLoading,
		activeSessionId,
		setActiveSessionId,
		setActiveSession,
		selectSession,
		clearActiveSession,
		pendingSession,
		setPendingSession
	};
};
const useSessions = (agentId, options = DEFAULT_SESSION_PAGE_SIZE) => {
	const { t } = useTranslation();
	const closeConversationTabs = useCloseConversationTabs();
	const pageSize = typeof options === "number" ? options : options.pageSize ?? DEFAULT_SESSION_PAGE_SIZE;
	const loadAll = typeof options === "number" ? false : options.loadAll ?? false;
	const enabled = typeof options === "number" ? void 0 : options.enabled;
	const [revalidateAllPages, setRevalidateAllPages] = (0, import_react.useState)(false);
	const { pages, isLoading, isRefreshing, error, hasNext, loadNext, refresh } = useInfiniteQuery("/agent-sessions", {
		query: agentId ? { agentId } : void 0,
		limit: pageSize,
		enabled,
		swrOptions: { revalidateAll: revalidateAllPages }
	});
	const { applyReorderedList } = useReorder("/agent-sessions");
	const sessions = useInfiniteFlatItems(pages);
	const { data: pinList, isLoading: isPinsLoading, isRefreshing: isPinsRefreshing } = useQuery("/pins", {
		query: { entityType: "session" },
		enabled
	});
	const pinIdBySessionId = (0, import_react.useMemo)(() => new Map(Array.isArray(pinList) ? pinList.map((p) => [p.entityId, p.id]) : []), [pinList]);
	const total = sessions.length;
	const hasMore = hasNext;
	const isFullyLoaded = !loadAll || !isLoading && !hasMore;
	const isLoadingAll = isLoading || loadAll && hasMore;
	const isLoadingMore = isRefreshing && pages.length > 1;
	(0, import_react.useEffect)(() => {
		setRevalidateAllPages(loadAll && isFullyLoaded);
	}, [loadAll, isFullyLoaded]);
	(0, import_react.useEffect)(() => {
		if (loadAll && hasMore && !isLoading && !isRefreshing) loadNext();
	}, [
		loadAll,
		hasMore,
		isLoading,
		isRefreshing,
		loadNext
	]);
	const reload = (0, import_react.useCallback)(() => refresh(), [refresh]);
	const loadMore = (0, import_react.useCallback)(() => {
		if (!isLoadingMore && hasMore) loadNext();
	}, [
		hasMore,
		isLoadingMore,
		loadNext
	]);
	const { trigger: createTrigger } = useMutation("POST", "/agent-sessions", { refresh: ["/agent-sessions", "/agent-workspaces"] });
	const createSession = (0, import_react.useCallback)(async (form) => {
		if (!agentId) {
			toast.error(t("agent.session.create.error.failed"));
			return null;
		}
		let result;
		try {
			result = await createTrigger({ body: {
				agentId,
				name: form.name,
				description: form.description,
				workspace: form.workspace
			} });
		} catch (error$1) {
			toast.error(formatErrorMessageWithPrefix(error$1, t("agent.session.create.error.failed")));
			return null;
		}
		await refresh().catch((error$1) => {
			toast.error(formatErrorMessageWithPrefix(error$1, t("agent.session.get.error.failed")));
		});
		return result;
	}, [
		agentId,
		createTrigger,
		refresh,
		t
	]);
	const { trigger: deleteTrigger } = useMutation("DELETE", "/agent-sessions/:sessionId", { refresh: ["/agent-sessions"] });
	const { trigger: deleteManyTrigger } = useMutation("DELETE", "/agent-sessions", { refresh: [
		"/agent-sessions",
		"/agent-workspaces",
		"/pins",
		"/agent-channels"
	] });
	const deleteSession = (0, import_react.useCallback)(async (id) => {
		try {
			await deleteTrigger({ params: { sessionId: id } });
			closeConversationTabs("agents", [id]);
			return true;
		} catch (error$1) {
			toast.error(formatErrorMessageWithPrefix(error$1, t("agent.session.delete.error.failed")));
			return false;
		}
	}, [
		closeConversationTabs,
		deleteTrigger,
		t
	]);
	const deleteSessions = (0, import_react.useCallback)(async (ids) => {
		try {
			const result = await deleteManyTrigger({ query: { ids: ids.join(",") } });
			closeConversationTabs("agents", result.deletedIds);
			return result;
		} catch (error$1) {
			toast.error(formatErrorMessageWithPrefix(error$1, t("agent.session.delete.error.failed")));
			return null;
		}
	}, [
		closeConversationTabs,
		deleteManyTrigger,
		t
	]);
	const reorderSessions = (0, import_react.useCallback)(async (reorderedList) => {
		try {
			await applyReorderedList(reorderedList);
		} catch (error$1) {
			toast.error(formatErrorMessageWithPrefix(error$1, t("agent.session.reorder.error.failed")));
		}
	}, [applyReorderedList, t]);
	const { trigger: reorderTrigger } = useMutation("PATCH", "/agent-sessions/:id/order", { refresh: ["/agent-sessions"] });
	const reorderSession = (0, import_react.useCallback)(async (id, anchor) => {
		try {
			await reorderTrigger({
				params: { id },
				body: anchor
			});
			return true;
		} catch (error$1) {
			toast.error(formatErrorMessageWithPrefix(error$1, t("agent.session.reorder.error.failed")));
			return false;
		}
	}, [reorderTrigger, t]);
	const { trigger: pinTrigger } = useMutation("POST", "/pins", { refresh: ["/pins", "/agent-sessions"] });
	const { trigger: unpinTrigger } = useMutation("DELETE", "/pins/:id", { refresh: ["/pins", "/agent-sessions"] });
	return {
		sessions,
		pinIdBySessionId,
		total,
		hasMore,
		error,
		isLoading,
		isLoadingMore,
		isValidating: isRefreshing,
		reload,
		loadMore,
		createSession,
		deleteSession,
		deleteSessions,
		reorderSession,
		reorderSessions,
		togglePin: (0, import_react.useCallback)(async (sessionId) => {
			const pinId = pinIdBySessionId.get(sessionId);
			try {
				if (pinId) await unpinTrigger({ params: { id: pinId } });
				else await pinTrigger({ body: {
					entityType: "session",
					entityId: sessionId
				} });
				return true;
			} catch (error$1) {
				toast.error(formatErrorMessageWithPrefix(error$1, t("agent.session.pin.error.failed")));
				return false;
			}
		}, [
			pinIdBySessionId,
			pinTrigger,
			unpinTrigger,
			t
		]),
		isFullyLoaded,
		isLoadingAll,
		isPinsLoading,
		isPinsRefreshing
	};
};
const useUpdateSession = () => {
	const { t } = useTranslation();
	const { trigger: updateTrigger } = useMutation("PATCH", "/agent-sessions/:sessionId", { refresh: ({ args }) => ["/agent-sessions", `/agent-sessions/${args.params.sessionId}`] });
	const { trigger: setWorkspaceTrigger } = useMutation("PUT", "/agent-sessions/:sessionId/workspace", { refresh: ({ args }) => [
		"/agent-sessions",
		`/agent-sessions/${args.params.sessionId}`,
		"/agent-workspaces"
	] });
	return {
		updateSession: (0, import_react.useCallback)(async (form, options) => {
			try {
				const { id, ...patch } = form;
				const result = await updateTrigger({
					params: { sessionId: id },
					body: patch
				});
				if (options?.showSuccessToast ?? true) toast.success(t("common.update_success"));
				return result;
			} catch (error) {
				toast.error({
					title: t("agent.session.update.error.failed"),
					description: getErrorMessage(error)
				});
				return;
			}
		}, [updateTrigger, t]),
		setSessionWorkspace: (0, import_react.useCallback)(async (id, workspace) => {
			try {
				return await setWorkspaceTrigger({
					params: { sessionId: id },
					body: workspace
				});
			} catch (error) {
				toast.error({
					title: t("agent.session.update.error.failed"),
					description: getErrorMessage(error)
				});
				return;
			}
		}, [setWorkspaceTrigger, t])
	};
};
function useAgentSessionAutoRenameSync() {
	const invalidate = useInvalidateCache();
	useIpcOn("ai.agent.session.auto_renamed", ({ sessionId }) => void invalidate(["/agent-sessions", `/agent-sessions/${sessionId}`]));
}
var AGENT_SESSIONS_LOAD_ALL_PAGE_SIZE = 200;
function useRawAssistantTopicsSource({ enabled } = {}) {
	return useTopics({
		loadAll: true,
		enabled
	});
}
function useRawAgentSessionsSource({ enabled } = {}) {
	return useSessions(void 0, {
		loadAll: true,
		pageSize: AGENT_SESSIONS_LOAD_ALL_PAGE_SIZE,
		enabled
	});
}
const AssistantTopicsSourceContext = (0, import_react.createContext)(null);
const AgentSessionsSourceContext = (0, import_react.createContext)(null);
function useAssistantTopicsSource() {
	const source = (0, import_react.use)(AssistantTopicsSourceContext);
	if (!source) throw new Error("useAssistantTopicsSource must be used within ResourceViewSourceProvider");
	return source;
}
function useAgentSessionsSource() {
	const source = (0, import_react.use)(AgentSessionsSourceContext);
	if (!source) throw new Error("useAgentSessionsSource must be used within ResourceViewSourceProvider");
	return source;
}
export { useRawAgentSessionsSource as a, useAgentSessionAutoRenameSync as c, useUpdateSession as d, useAssistantTopicsSource as i, useLatestSession as l, AssistantTopicsSourceContext as n, useRawAssistantTopicsSource as o, useAgentSessionsSource as r, useActiveSession as s, AgentSessionsSourceContext as t, useSession as u };
