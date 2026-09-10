import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as isEqual } from "./isEqual-C7zEE0RK.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as ipcApi, t as useIpcOn } from "./ipc-DpcwPFwy.js";
import { l as useCloseConversationTabs } from "./tab-CVOgL8bf.js";
import { t as cacheService } from "./CacheService-IyXh62g9.js";
import { d as toContentRole } from "./message-CtGMR9KJ.js";
import { i as ErrorCode, t as dataApiService } from "./DataApiService-Csr1w5Kb.js";
import { a as useInvalidateCache, c as useQuery, i as useInfiniteQuery, n as useDataChange, o as useMutation, r as useInfiniteFlatItems, u as useWriteCache } from "./useDataApi-H7ZhyZ_J.js";
import { n as forgetLastUsedChatTopic } from "./conversationEntry-CTSSFR4L.js";
import { n as EventEmitter, t as EVENT_NAMES } from "./EventService-CMzpRLnw.js";
import { a as isBlankUserTurn, i as hasClearContextPart } from "./uiParts-ClY38h-2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useTopic");
var EMPTY_TOPICS = Object.freeze([]);
var DEFAULT_TOPIC_PAGE_SIZE = 50;
var LOAD_ALL_TOPIC_PAGE_SIZE = 200;
function useStructurallySharedTopics(topics) {
	const previousTopicsRef = (0, import_react.useRef)([]);
	return (0, import_react.useMemo)(() => {
		const previousTopics = previousTopicsRef.current;
		const previousById = new Map(previousTopics.map((topic) => [topic.id, topic]));
		let arrayChanged = previousTopics.length !== topics.length;
		const nextTopics = topics.map((topic, index) => {
			const previous = previousById.get(topic.id);
			const next = previous && isEqual(previous, topic) ? previous : topic;
			if (next !== previousTopics[index]) arrayChanged = true;
			return next;
		});
		const sharedTopics = arrayChanged ? nextTopics : previousTopics;
		previousTopicsRef.current = sharedTopics;
		return sharedTopics;
	}, [topics]);
}
function mapApiTopicToRendererTopic(t) {
	return {
		id: t.id,
		assistantId: t.assistantId,
		name: t.name ?? "",
		lastActivityAt: t.lastActivityAt,
		createdAt: t.createdAt,
		updatedAt: t.updatedAt,
		activeNodeId: t.activeNodeId,
		orderKey: t.orderKey,
		traceId: t.traceId,
		messages: [],
		pinned: false,
		isNameManuallyEdited: t.isNameManuallyEdited
	};
}
const startTopicRenaming = (topicId) => {
	const currentIds = cacheService.get("topic.renaming") ?? [];
	if (!currentIds.includes(topicId)) cacheService.set("topic.renaming", [...currentIds, topicId]);
};
const finishTopicRenaming = (topicId) => {
	const renamingTopics = cacheService.get("topic.renaming");
	if (renamingTopics && renamingTopics.includes(topicId)) cacheService.set("topic.renaming", renamingTopics.filter((id) => id !== topicId));
	const currentNewlyRenamed = cacheService.get("topic.newly_renamed") ?? [];
	cacheService.set("topic.newly_renamed", [...currentNewlyRenamed, topicId]);
	setTimeout(() => {
		const current = cacheService.get("topic.newly_renamed") ?? [];
		cacheService.set("topic.newly_renamed", current.filter((id) => id !== topicId));
	}, 700);
};
var MESSAGES_PAGE_SIZE = 200;
function isRenderableTopicMessage(message) {
	const parts = message.data.parts ?? [];
	return !hasClearContextPart(parts) && !isBlankUserTurn({
		role: message.role,
		status: message.status,
		parts
	});
}
async function getTopicMessages(id, options = {}) {
	try {
		const pages = [];
		let assistantId = "";
		let cursor;
		let collected = 0;
		do {
			const response = await dataApiService.get(`/topics/${id}/messages`, { query: {
				limit: MESSAGES_PAGE_SIZE,
				includeSiblings: true,
				cursor
			} });
			if (!cursor) assistantId = response.assistantId ?? "";
			const pageMessages = [];
			for (const item of response.items) {
				if (isRenderableTopicMessage(item.message)) pageMessages.push(convertSharedMessage(item.message, assistantId));
				if (item.siblingsGroup) {
					for (const sibling of item.siblingsGroup) if (isRenderableTopicMessage(sibling)) pageMessages.push(convertSharedMessage(sibling, assistantId));
				}
			}
			pages.push(pageMessages);
			collected += pageMessages.length;
			cursor = response.nextCursor;
		} while (cursor && (!options.maxMessages || collected < options.maxMessages));
		return pages.reverse().flat();
	} catch (error) {
		if (error instanceof Object && "code" in error && error.code === ErrorCode.NOT_FOUND) {
			logger.debug(`Topic ${id} not found in Data API, returning empty`);
			return [];
		}
		logger.error(`Failed to fetch messages from Data API for topic ${id}:`, error);
		throw error;
	}
}
function convertSharedMessage(shared, assistantId) {
	return {
		id: shared.id,
		assistantId,
		topicId: shared.topicId,
		role: toContentRole(shared.role),
		status: shared.status,
		parts: shared.data?.parts ?? [],
		createdAt: shared.createdAt,
		updatedAt: shared.updatedAt,
		parentId: shared.parentId ?? void 0,
		modelId: shared.modelId ?? void 0,
		...shared.messageSnapshot && { messageSnapshot: shared.messageSnapshot },
		...shared.stats && { stats: shared.stats }
	};
}
function useTopics(opts) {
	const query = opts?.q?.trim() ? { q: opts.q.trim() } : void 0;
	const loadAll = opts?.loadAll === true;
	const pageSize = opts?.pageSize ?? (loadAll ? LOAD_ALL_TOPIC_PAGE_SIZE : DEFAULT_TOPIC_PAGE_SIZE);
	const [revalidateAllPages, setRevalidateAllPages] = (0, import_react.useState)(false);
	const { pages, isLoading, isRefreshing, error, hasNext, loadNext, refresh, mutate } = useInfiniteQuery("/topics", {
		query,
		limit: pageSize,
		enabled: opts?.enabled,
		swrOptions: {
			revalidateAll: revalidateAllPages,
			revalidateFirstPage: !loadAll
		}
	});
	const topics = useStructurallySharedTopics(useInfiniteFlatItems(pages));
	const isFullyLoaded = !loadAll || !isLoading && !hasNext;
	const isLoadingAll = isLoading || loadAll && hasNext;
	(0, import_react.useEffect)(() => {
		setRevalidateAllPages(loadAll && isFullyLoaded);
	}, [loadAll, isFullyLoaded]);
	(0, import_react.useEffect)(() => {
		if (loadAll && hasNext && !isLoading && !isRefreshing) loadNext();
	}, [
		loadAll,
		hasNext,
		isLoading,
		isRefreshing,
		loadNext
	]);
	useDataChange("/topics", () => {
		if (opts?.enabled !== false) mutate();
	});
	return {
		topics: topics.length > 0 ? topics : EMPTY_TOPICS,
		pages,
		hasNext,
		loadNext,
		isLoading,
		isLoadingAll,
		isFullyLoaded,
		isRefreshing,
		error,
		refetch: refresh,
		mutate
	};
}
function useTopicById(topicId) {
	const { data, isLoading, error, refetch, mutate } = useQuery(`/topics/${topicId}`, { enabled: !!topicId });
	useDataChange("/topics/:id", (effects) => {
		if (topicId && effects.some((effect) => !effect.entityIds || effect.entityIds.includes(topicId))) mutate();
	}, { routeParams: topicId ? { id: topicId } : void 0 });
	return {
		topic: data,
		isLoading,
		error,
		refetch,
		mutate
	};
}
function useTopicMutations() {
	const invalidate = useInvalidateCache();
	const writeCache = useWriteCache();
	const closeConversationTabs = useCloseConversationTabs();
	const { trigger: createTrigger, isLoading: isCreating } = useMutation("POST", "/topics", { refresh: ["/topics"] });
	const { trigger: updateTrigger, isLoading: isUpdating } = useMutation("PATCH", "/topics/:id", { refresh: ({ args }) => ["/topics", `/topics/${args.params.id}`] });
	const { trigger: moveTrigger } = useMutation("POST", "/topics/:id/move");
	const { trigger: deleteTrigger, isLoading: isDeleting } = useMutation("DELETE", "/topics/:id", { refresh: ["/topics"] });
	const { trigger: deleteManyTrigger, isLoading: isDeletingMany } = useMutation("DELETE", "/topics", { refresh: ["/topics", "/pins"] });
	const { trigger: deleteByAssistantTrigger } = useMutation("DELETE", "/assistants/:assistantId/topics", { refresh: ["/topics", "/pins"] });
	const refreshTopics = (0, import_react.useCallback)(() => invalidate("/topics"), [invalidate]);
	return {
		createTopic: (0, import_react.useCallback)(async (dto) => {
			const topic = await createTrigger({ body: dto });
			logger.info("Created topic", { id: topic.id });
			return topic;
		}, [createTrigger]),
		updateTopic: (0, import_react.useCallback)(async (topicId, dto) => {
			const topic = await updateTrigger({
				params: { id: topicId },
				body: dto
			});
			logger.info("Updated topic", { id: topicId });
			return topic;
		}, [updateTrigger]),
		deleteTopic: (0, import_react.useCallback)(async (topicId) => {
			ipcApi.request("ai.stream.abort", { topicId }).catch(() => void 0);
			await deleteTrigger({ params: { id: topicId } });
			forgetLastUsedChatTopic([topicId]);
			closeConversationTabs("assistants", [topicId]);
			logger.info("Deleted topic", { id: topicId });
		}, [closeConversationTabs, deleteTrigger]),
		deleteTopics: (0, import_react.useCallback)(async (ids) => {
			for (const topicId of ids) ipcApi.request("ai.stream.abort", { topicId }).catch(() => void 0);
			const result = await deleteManyTrigger({ query: { ids: ids.join(",") } });
			forgetLastUsedChatTopic(result.deletedIds);
			closeConversationTabs("assistants", result.deletedIds);
			logger.info("Deleted topics", { count: result.deletedCount });
			return result;
		}, [closeConversationTabs, deleteManyTrigger]),
		deleteTopicsByAssistantId: (0, import_react.useCallback)(async (assistantId) => {
			const result = await deleteByAssistantTrigger({ params: { assistantId } });
			forgetLastUsedChatTopic(result.deletedIds);
			closeConversationTabs("assistants", result.deletedIds);
			logger.info("Deleted assistant topics", {
				assistantId,
				count: result.deletedCount
			});
			return result;
		}, [closeConversationTabs, deleteByAssistantTrigger]),
		moveTopic: (0, import_react.useCallback)(async (topicId, { assistantId, anchor }) => {
			const assistantChanged = assistantId !== void 0;
			const refreshKeys = assistantChanged ? ["/topics", `/topics/${topicId}`] : "/topics";
			try {
				if (assistantChanged && assistantId) {
					const topic = await moveTrigger({
						params: { id: topicId },
						body: {
							assistantId,
							order: anchor
						}
					});
					await writeCache(`/topics/${topicId}`, topic);
				} else {
					if (assistantChanged) {
						const topic = await dataApiService.patch(`/topics/${topicId}`, { body: { assistantId } });
						await writeCache(`/topics/${topicId}`, topic);
					}
					await dataApiService.patch(`/topics/${topicId}/order`, { body: anchor });
				}
				await invalidate(refreshKeys);
			} catch (err) {
				if (assistantChanged) try {
					await invalidate(refreshKeys);
				} catch (refreshErr) {
					logger.error("Failed to refresh topics after topic move error", {
						refreshErr,
						topicId
					});
				}
				throw err;
			}
		}, [
			invalidate,
			moveTrigger,
			writeCache
		]),
		batchUpdateTopics: (0, import_react.useCallback)(async (topics) => {
			const results = await Promise.allSettled(topics.map(({ id, dto }) => dataApiService.patch(`/topics/${id}`, { body: dto })));
			await refreshTopics();
			return results;
		}, [refreshTopics]),
		refreshTopics,
		isCreating,
		isUpdating,
		isDeleting: isDeleting || isDeletingMany
	};
}
function useTopicAutoRenameSync() {
	const invalidate = useInvalidateCache();
	useIpcOn("ai.topic.auto_renamed", ({ topicId }) => void invalidate(["/topics", `/topics/${topicId}`]));
}
function useActiveTopic({ initialTopic, activeTopicId, setActiveTopicId, passive = false }) {
	const { topic: apiActiveTopic, isLoading: isActiveTopicQueryLoading, error } = useTopicById(passive || !activeTopicId ? void 0 : activeTopicId);
	const queryTopic = (0, import_react.useMemo)(() => activeTopicId && apiActiveTopic?.id === activeTopicId ? mapApiTopicToRendererTopic(apiActiveTopic) : void 0, [activeTopicId, apiActiveTopic]);
	const [pendingTopic, setPendingTopic] = (0, import_react.useState)(() => initialTopic ?? void 0);
	const hasAppliedInitialTopicRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (passive) return;
		if (!initialTopic) return;
		setPendingTopic((prev) => prev ?? initialTopic);
		if (hasAppliedInitialTopicRef.current) return;
		hasAppliedInitialTopicRef.current = true;
		if (activeTopicId !== initialTopic.id) setActiveTopicId(initialTopic.id);
	}, [
		activeTopicId,
		initialTopic,
		passive,
		setActiveTopicId
	]);
	const activeTopic = (0, import_react.useMemo)(() => {
		if (passive) return void 0;
		if (!activeTopicId) return pendingTopic;
		if (queryTopic) return queryTopic;
		if (pendingTopic?.id === activeTopicId) return pendingTopic;
	}, [
		activeTopicId,
		passive,
		pendingTopic,
		queryTopic
	]);
	const topicSource = (0, import_react.useMemo)(() => {
		if (!activeTopic) return "none";
		if (queryTopic?.id === activeTopic.id) return "query";
		if (pendingTopic?.id === activeTopic.id) return "pending";
		return "none";
	}, [
		activeTopic,
		pendingTopic,
		queryTopic
	]);
	const setActiveTopic = (0, import_react.useCallback)((next) => {
		if (passive) {
			setPendingTopic(next);
			return;
		}
		setActiveTopicId(next.id);
		setPendingTopic(next);
	}, [passive, setActiveTopicId]);
	const clearActiveTopic = (0, import_react.useCallback)(() => {
		setPendingTopic(void 0);
		if (!passive) setActiveTopicId(null);
	}, [passive, setActiveTopicId]);
	(0, import_react.useEffect)(() => {
		if (passive) return;
		if (activeTopic) EventEmitter.emit(EVENT_NAMES.CHANGE_TOPIC, activeTopic);
	}, [activeTopic, passive]);
	return {
		activeTopic,
		setActiveTopic,
		clearActiveTopic,
		isLoading: !activeTopic && isActiveTopicQueryLoading,
		error,
		topicSource
	};
}
export { useActiveTopic as a, useTopicMutations as c, startTopicRenaming as i, useTopics as l, getTopicMessages as n, useTopicAutoRenameSync as o, mapApiTopicToRendererTopic as r, useTopicById as s, finishTopicRenaming as t };
