import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { i as useSharedCacheSelector } from "./useCache-lF6Sw_ck.js";
import { n as useDataChange, o as useMutation, r as useInfiniteFlatItems } from "./useDataApi-H7ZhyZ_J.js";
import { t as useConversationHistoryQuery } from "./useConversationHistoryQuery-C8JSfBsH.js";
const AGENT_SESSION_FLOW_PARTS_CACHE_KEY = (sessionId, messageId) => `agent.session.flow_parts.${sessionId}.${messageId}`;
var import_react = /* @__PURE__ */ __toESM(require_react());
var PAGE_SIZE = 50;
function toAgentSessionUIMessage(row) {
	const metadata = {};
	if (row.createdAt) metadata.createdAt = row.createdAt;
	if (row.updatedAt) metadata.updatedAt = row.updatedAt;
	metadata.status = row.status;
	if (row.modelId) metadata.modelId = row.modelId;
	if (row.messageSnapshot) metadata.messageSnapshot = row.messageSnapshot;
	if (row.stats) metadata.stats = row.stats;
	return {
		id: row.id,
		role: row.role,
		parts: row.data.parts ?? [],
		metadata: Object.keys(metadata).length > 0 ? metadata : void 0
	};
}
function reservedUIMessageToAgentSessionMessage(sessionId, message) {
	const metadata = message.metadata ?? {};
	const createdAt = metadata.createdAt ?? (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: message.id,
		sessionId,
		role: message.role,
		data: { parts: message.parts ?? [] },
		searchableText: "",
		status: metadata.status ?? (message.role === "assistant" && (message.parts?.length ?? 0) === 0 ? "pending" : "success"),
		modelId: metadata.modelId ?? null,
		messageSnapshot: metadata.messageSnapshot ?? null,
		stats: metadata.stats ?? null,
		runtimeResumeToken: null,
		createdAt,
		updatedAt: createdAt
	};
}
function useAgentSessionParts(sessionId, options = {}) {
	const enabled = !!sessionId && options.enabled !== false;
	const fetchOnMount = options.fetchOnMount ?? enabled;
	const sessionMessagesCachePath = `/agent-sessions/${sessionId}/messages`;
	const { pages, isLoading, hasNext, loadNext, mutate } = useConversationHistoryQuery("/agent-sessions/:sessionId/messages", {
		params: { sessionId },
		query: { deferToolOutputs: true },
		limit: PAGE_SIZE,
		enabled,
		swrOptions: {
			keepPreviousData: false,
			...!fetchOnMount && {
				revalidateIfStale: false,
				revalidateOnMount: false
			}
		}
	});
	const { trigger: deleteMessageTrigger } = useMutation("DELETE", "/agent-sessions/:sessionId/messages/:messageId", { refresh: [sessionMessagesCachePath] });
	useDataChange("/agent-sessions/:sessionId/messages", () => {
		if (enabled) mutate();
	}, { routeParams: { sessionId } });
	const rows = useInfiniteFlatItems(pages, {
		reversePages: true,
		reverseItems: true
	});
	const loadedMessageIds = (0, import_react.useMemo)(() => enabled ? rows.map((row) => row.id) : [], [enabled, rows]);
	const flowParts = useSharedCacheSelector((0, import_react.useMemo)(() => loadedMessageIds.map((messageId) => AGENT_SESSION_FLOW_PARTS_CACHE_KEY(sessionId, messageId)), [loadedMessageIds, sessionId]), (0, import_react.useCallback)((values) => Object.fromEntries(loadedMessageIds.map((messageId, index) => [messageId, values[index]])), [loadedMessageIds]));
	const messageProjectionRef = (0, import_react.useRef)(void 0);
	const projectionOwnerToken = (0, import_react.useMemo)(() => Symbol(sessionId), [sessionId]);
	const currentProjectionOwnerTokenRef = (0, import_react.useRef)(projectionOwnerToken);
	currentProjectionOwnerTokenRef.current = projectionOwnerToken;
	const projectMessages = (0, import_react.useCallback)((sourceRows) => {
		const previousProjection = messageProjectionRef.current;
		const previousById = previousProjection?.ownerToken === projectionOwnerToken ? previousProjection.byId : void 0;
		const nextById = /* @__PURE__ */ new Map();
		const nextMessages = sourceRows.map((row) => {
			const liveParts = flowParts[row.id];
			const cached = previousById?.get(row.id);
			if (cached?.sessionId === row.sessionId && cached.updatedAt === row.updatedAt && cached.role === row.role && cached.status === row.status && cached.modelId === row.modelId && cached.liveParts === liveParts) {
				nextById.set(row.id, cached);
				return cached.message;
			}
			const message = toAgentSessionUIMessage(row);
			const projectedMessage = liveParts ? {
				...message,
				parts: liveParts
			} : message;
			nextById.set(row.id, {
				liveParts,
				message: projectedMessage,
				modelId: row.modelId,
				role: row.role,
				sessionId: row.sessionId,
				status: row.status,
				updatedAt: row.updatedAt
			});
			return projectedMessage;
		});
		const previousMessages = previousProjection?.ownerToken === projectionOwnerToken ? previousProjection.messages : void 0;
		const stableMessages = previousMessages !== void 0 && previousMessages.length === nextMessages.length && nextMessages.every((message, index) => message === previousMessages[index]) ? previousMessages : nextMessages;
		if (currentProjectionOwnerTokenRef.current === projectionOwnerToken) messageProjectionRef.current = {
			byId: nextById,
			messages: stableMessages,
			ownerToken: projectionOwnerToken
		};
		return stableMessages;
	}, [flowParts, projectionOwnerToken]);
	const messages = (0, import_react.useMemo)(() => {
		return projectMessages(rows);
	}, [projectMessages, rows]);
	const refreshMessages = (0, import_react.useCallback)(async () => {
		if (!enabled) return [];
		const fallbackMessages = messageProjectionRef.current?.ownerToken === projectionOwnerToken ? messageProjectionRef.current.messages : [];
		const refreshedPages = await mutate();
		if (!refreshedPages) return fallbackMessages;
		const flat = [];
		for (let i = refreshedPages.length - 1; i >= 0; i--) {
			const page = refreshedPages[i];
			for (let j = page.items.length - 1; j >= 0; j--) flat.push(page.items[j]);
		}
		return projectMessages(flat);
	}, [
		enabled,
		mutate,
		projectMessages,
		projectionOwnerToken
	]);
	const seedReservedMessages = (0, import_react.useCallback)(async (messages$1) => {
		const reservedRows = messages$1.map((message) => reservedUIMessageToAgentSessionMessage(sessionId, message));
		if (reservedRows.length === 0) return;
		await mutate((pages$1) => {
			const currentPages = pages$1?.length ? pages$1 : [{
				items: [],
				nextCursor: void 0
			}];
			const existingIds = new Set(currentPages.flatMap((page) => page.items.map((item) => item.id)));
			const newRows = reservedRows.filter((row) => !existingIds.has(row.id));
			if (newRows.length === 0) return pages$1;
			const newestFirst = newRows.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));
			const nextPages = currentPages.slice();
			const firstPage = nextPages[0];
			nextPages[0] = {
				...firstPage,
				items: [...newestFirst, ...firstPage.items]
			};
			return nextPages;
		}, { revalidate: false });
	}, [mutate, sessionId]);
	const deleteMessage = (0, import_react.useCallback)(async (messageId) => {
		await deleteMessageTrigger({ params: {
			sessionId,
			messageId
		} });
	}, [deleteMessageTrigger, sessionId]);
	return {
		messages,
		isLoading: enabled && isLoading,
		hasOlder: hasNext,
		loadOlder: loadNext,
		refresh: refreshMessages,
		seedReservedMessages,
		deleteMessage
	};
}
export { useAgentSessionParts as n, toAgentSessionUIMessage as t };
