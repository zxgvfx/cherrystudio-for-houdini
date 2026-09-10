import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { i as formatErrorMessageWithPrefix, s as getErrorMessage } from "./error-CskkREu_.js";
import { t as isEqual } from "./isEqual-C7zEE0RK.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-DpcwPFwy.js";
import { l as useCloseConversationTabs } from "./tab-CVOgL8bf.js";
import { t as cacheService } from "./CacheService-IyXh62g9.js";
import { o as isDataApiNotFoundError } from "./DataApiService-Csr1w5Kb.js";
import { a as useInvalidateCache, c as useQuery, i as useInfiniteQuery, n as useDataChange, o as useMutation, r as useInfiniteFlatItems } from "./useDataApi-H7ZhyZ_J.js";
import { t as useReorder } from "./useReorder-Cmki1Ln4.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { n as buildAgentSessionTopicId } from "./agentSession-DEX9ehkG.js";
import { t as forgetLastUsedAgentSession } from "./conversationEntry-CTSSFR4L.js";
var CACHE_KEY = "ui.agent.last_used_branch_by_session";
function resolveRememberedAgentSessionBranch(sessionId, memory = cacheService.getPersist(CACHE_KEY)) {
	let current = sessionId;
	const visited = /* @__PURE__ */ new Set();
	while (!visited.has(current)) {
		visited.add(current);
		const next = memory[current];
		if (!next || next === current) break;
		current = next;
	}
	return current;
}
function rememberAgentSessionBranch(parentOrRootSessionId, activeSessionId) {
	const current = cacheService.getPersist(CACHE_KEY);
	cacheService.setPersist(CACHE_KEY, {
		...current,
		[parentOrRootSessionId]: activeSessionId
	});
}
function forgetAgentSessionBranch(sessionId) {
	const current = cacheService.getPersist(CACHE_KEY);
	const next = Object.fromEntries(Object.entries(current).filter(([parentId, activeId]) => parentId !== sessionId && activeId !== sessionId));
	cacheService.setPersist(CACHE_KEY, next);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var DEFAULT_SESSION_PAGE_SIZE = 20;
function useStructurallySharedSessions(sessions) {
	const previousSessionsRef = (0, import_react.useRef)([]);
	return (0, import_react.useMemo)(() => {
		const previousSessions = previousSessionsRef.current;
		const previousById = new Map(previousSessions.map((session) => [session.id, session]));
		let arrayChanged = previousSessions.length !== sessions.length;
		const nextSessions = sessions.map((session, index) => {
			const previous = previousById.get(session.id);
			const next = previous && isEqual(previous, session) ? previous : session;
			if (next !== previousSessions[index]) arrayChanged = true;
			return next;
		});
		const sharedSessions = arrayChanged ? nextSessions : previousSessions;
		previousSessionsRef.current = sharedSessions;
		return sharedSessions;
	}, [sessions]);
}
const useSession = (sessionId) => {
	const { data: session, error, isLoading, mutate } = useQuery("/agent-sessions/:sessionId", {
		params: { sessionId },
		enabled: !!sessionId,
		swrOptions: { keepPreviousData: false }
	});
	useDataChange("/agent-sessions/:sessionId", (effects) => {
		if (sessionId && effects.some((effect) => !effect.entityIds || effect.entityIds.includes(sessionId))) mutate();
	});
	return {
		session,
		error,
		isLoading,
		mutate
	};
};
const useActiveSession = ({ activeSessionId, setActiveSessionId, initialSession }) => {
	const result = useSession(activeSessionId);
	const [pendingSession, setPendingSession] = (0, import_react.useState)(null);
	const isNotFound = isDataApiNotFoundError(result.error);
	const querySession = !isNotFound && activeSessionId && result.session?.id === activeSessionId ? result.session : void 0;
	const resolvedPendingSession = !isNotFound && activeSessionId && pendingSession?.id === activeSessionId ? pendingSession : void 0;
	const resolvedInitialSession = !isNotFound && activeSessionId && initialSession?.id === activeSessionId ? initialSession : void 0;
	const fallbackSession = resolvedPendingSession ?? resolvedInitialSession;
	const session = querySession ?? fallbackSession;
	const sessionSource = querySession ? "query" : fallbackSession ? "pending" : "none";
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
		swrOptions: {
			revalidateAll: revalidateAllPages,
			revalidateFirstPage: !loadAll
		}
	});
	useDataChange("/agent-sessions", () => {
		refresh();
	});
	const { applyReorderedList } = useReorder("/agent-sessions");
	const sessions = useStructurallySharedSessions(useInfiniteFlatItems(pages));
	const { data: pinList, isLoading: isPinsLoading, isRefreshing: isPinsRefreshing } = useQuery("/pins", {
		query: { entityType: "session" },
		enabled
	});
	const pinIdBySessionId = (0, import_react.useMemo)(() => new Map(Array.isArray(pinList) ? pinList.map((p) => [p.entityId, p.id]) : []), [pinList]);
	const pinIdBySessionIdRef = (0, import_react.useRef)(pinIdBySessionId);
	pinIdBySessionIdRef.current = pinIdBySessionId;
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
			ipcApi.request("ai.stream.abort", { topicId: buildAgentSessionTopicId(id) }).catch(() => void 0);
			await deleteTrigger({ params: { sessionId: id } });
			forgetLastUsedAgentSession([id]);
			forgetAgentSessionBranch(id);
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
			for (const id of ids) ipcApi.request("ai.stream.abort", { topicId: buildAgentSessionTopicId(id) }).catch(() => void 0);
			const result = await deleteManyTrigger({ query: { ids: ids.join(",") } });
			forgetLastUsedAgentSession(result.deletedIds);
			for (const id of result.deletedIds) forgetAgentSessionBranch(id);
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
			const pinId = pinIdBySessionIdRef.current.get(sessionId);
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
export { useUpdateSession as a, resolveRememberedAgentSessionBranch as c, useSessions as i, useAgentSessionAutoRenameSync as n, forgetAgentSessionBranch as o, useSession as r, rememberAgentSessionBranch as s, useActiveSession as t };
