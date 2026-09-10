import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { o as useMutation } from "./useDataApi-H7ZhyZ_J.js";
import { n as EventEmitter, t as EVENT_NAMES } from "./EventService-CMzpRLnw.js";
import { i as useTopicStreamStatus } from "./useTopicStreamStatus-Be-jC8fI.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function branchWithoutIds(items, removedIds) {
	return items.filter((item) => !removedIds.has(item.message.id)).map((item) => item.siblingsGroup ? {
		...item,
		siblingsGroup: item.siblingsGroup.filter((s) => !removedIds.has(s.id))
	} : item);
}
function reservedUIMessageToBranchMessage(topicId, message) {
	const metadata = message.metadata ?? {};
	const createdAt = metadata.createdAt ?? (/* @__PURE__ */ new Date()).toISOString();
	return { message: {
		id: message.id,
		topicId,
		parentId: metadata.parentId ?? null,
		role: message.role,
		data: { parts: message.parts ?? [] },
		searchableText: "",
		status: metadata.status ?? (message.role === "assistant" && (message.parts?.length ?? 0) === 0 ? "pending" : "success"),
		siblingsGroupId: metadata.siblingsGroupId ?? 0,
		modelId: metadata.modelId ?? null,
		messageSnapshot: metadata.messageSnapshot ?? null,
		stats: metadata.stats ?? null,
		createdAt,
		updatedAt: createdAt
	} };
}
function getTopicBranchCachePaths(topicId) {
	return [`/topics/${topicId}/messages`, `/topics/${topicId}/tree`];
}
function useTopicMessagesCache({ topicId, mutate }) {
	const [messagesCachePath, treeCachePath] = getTopicBranchCachePaths(topicId);
	const branchCachePaths = [messagesCachePath, treeCachePath];
	const seedOptimisticBranch = (0, import_react.useCallback)(async (transform) => {
		await mutate((pages) => {
			if (!pages) return pages;
			return pages.map((page) => ({
				...page,
				items: transform(page.items)
			}));
		}, { revalidate: false });
	}, [mutate]);
	const patchMessageInBranch = (0, import_react.useCallback)(async (messageId, patch) => {
		await mutate((pages) => {
			if (!pages) return pages;
			let mutated = false;
			const next = pages.map((page) => {
				const idx = page.items.findIndex((item) => item.message.id === messageId);
				if (idx === -1) return page;
				mutated = true;
				const items = page.items.slice();
				items[idx] = {
					...items[idx],
					message: {
						...items[idx].message,
						...patch
					}
				};
				return {
					...page,
					items
				};
			});
			return mutated ? next : pages;
		}, { revalidate: false });
	}, [mutate]);
	const rollbackBranch = (0, import_react.useCallback)(async () => {
		await mutate();
	}, [mutate]);
	const seedReservedMessages = (0, import_react.useCallback)(async (messages, options = {}) => {
		const reservedItems = messages.map((message) => reservedUIMessageToBranchMessage(topicId, message));
		if (reservedItems.length === 0) return;
		await mutate((pages) => {
			const currentPages = pages?.length ? pages : [{
				items: [],
				nextCursor: void 0,
				activeNodeId: null,
				assistantId: null,
				rootId: null
			}];
			const reservedById = new Map(reservedItems.map((item) => [item.message.id, item.message]));
			const consumedIds = /* @__PURE__ */ new Set();
			let replaced = false;
			const nextPages = currentPages.map((page) => ({
				...page,
				items: page.items.map((item) => {
					const replacement = reservedById.get(item.message.id);
					let siblingsChanged = false;
					const siblingsGroup = item.siblingsGroup?.map((sibling) => {
						const siblingReplacement = reservedById.get(sibling.id);
						if (!siblingReplacement) return sibling;
						consumedIds.add(sibling.id);
						replaced = true;
						siblingsChanged = true;
						return siblingReplacement;
					});
					if (replacement) {
						consumedIds.add(item.message.id);
						replaced = true;
					}
					if (!replacement && !siblingsChanged) return item;
					return {
						...item,
						message: replacement ?? item.message,
						...siblingsGroup ? { siblingsGroup } : {}
					};
				})
			}));
			const newItems = reservedItems.filter((item) => !consumedIds.has(item.message.id));
			if (!replaced && newItems.length === 0) return pages;
			const firstPage = nextPages[0];
			nextPages[0] = {
				...firstPage,
				items: [...firstPage.items, ...newItems],
				activeNodeId: newItems.length > 0 && !options.preserveActiveNode ? newItems.at(-1)?.message.id ?? firstPage.activeNodeId : firstPage.activeNodeId
			};
			return nextPages;
		}, { revalidate: false });
	}, [mutate, topicId]);
	const clearBranchCache = (0, import_react.useCallback)(async () => {
		await mutate([{
			items: [],
			nextCursor: void 0,
			activeNodeId: null,
			assistantId: null,
			rootId: null
		}], { revalidate: false });
	}, [mutate]);
	const { trigger: deleteMessageTrigger } = useMutation("DELETE", "/messages/:id", { refresh: branchCachePaths });
	const { trigger: deleteMessageGroupTrigger } = useMutation("DELETE", "/messages/:id/reply-group", { refresh: branchCachePaths });
	const { trigger: patchMessageTrigger } = useMutation("PATCH", "/messages/:id", { refresh: branchCachePaths });
	const { trigger: createSiblingTrigger } = useMutation("POST", "/messages/:id/siblings", { refresh: branchCachePaths });
	const { trigger: createMessageTrigger } = useMutation("POST", "/topics/:topicId/messages", { refresh: branchCachePaths });
	const { trigger: setActiveNodeTrigger } = useMutation("PUT", "/topics/:id/active-node", { refresh: branchCachePaths });
	const { trigger: clearTopicMessagesTrigger } = useMutation("DELETE", "/topics/:topicId/messages", { refresh: [messagesCachePath] });
	return {
		branchWithoutIds,
		seedOptimisticBranch,
		seedReservedMessages,
		patchMessageInBranch,
		rollbackBranch,
		clearBranchCache,
		deleteMessageTrigger,
		deleteMessageGroupTrigger,
		patchMessageTrigger,
		createSiblingTrigger,
		createMessageTrigger,
		setActiveNodeTrigger,
		clearTopicMessagesTrigger
	};
}
function useTopicBranchActions(topicId) {
	const { isPending, status } = useTopicStreamStatus(topicId);
	const branchCachePaths = getTopicBranchCachePaths(topicId);
	const { trigger: reserveBranchTrigger } = useMutation("POST", "/messages/:id/branches", { refresh: branchCachePaths });
	const { trigger: deleteReservedBranchTrigger } = useMutation("DELETE", "/messages/:id", { refresh: branchCachePaths });
	return {
		reserveBranch: (0, import_react.useCallback)(async (anchorMessageId) => {
			const activate = !isPending && status !== "awaiting-approval";
			await reserveBranchTrigger({
				params: { id: anchorMessageId },
				body: { activate }
			});
			if (activate) EventEmitter.emit(EVENT_NAMES.FOCUS_CHAT_COMPOSER, { topicId });
		}, [
			isPending,
			reserveBranchTrigger,
			status,
			topicId
		]),
		deleteReservedBranch: (0, import_react.useCallback)((messageId) => deleteReservedBranchTrigger({
			params: { id: messageId },
			query: { awaitingInputOnly: true }
		}), [deleteReservedBranchTrigger])
	};
}
export { useTopicMessagesCache as n, useTopicBranchActions as t };
