import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { o as useMutation } from "./useDataApi-DxcxHgaT.js";
import { n as EventEmitter, t as EVENT_NAMES } from "./EventService-B0N3Z50N.js";
import { r as hasClearContextPart } from "./uiParts-D7jaMraw.js";
import { i as useTopicStreamStatus } from "./useTopicStreamStatus-8sPVIB3X.js";
var LIVE_PREVIEW_LENGTH = 160;
function truncateLivePreview(text) {
	return text.length > LIVE_PREVIEW_LENGTH ? `${text.substring(0, LIVE_PREVIEW_LENGTH)}...` : text;
}
function getStringField(value, key) {
	if (!value || typeof value !== "object") return void 0;
	const field = value[key];
	return typeof field === "string" ? field : void 0;
}
function getObjectField(value, key) {
	if (!value || typeof value !== "object") return void 0;
	const field = value[key];
	return field && typeof field === "object" ? field : void 0;
}
function extractTopicMessageFlowLivePreview(parts) {
	for (const part of parts) {
		const data = getObjectField(part, "data");
		const preview = (part.type === "text" ? getStringField(part, "text") : ["data-code", "data-translation"].includes(part.type) ? getStringField(data, "content") : part.type === "data-compact" ? getStringField(data, "content") ?? getStringField(data, "compactedContent") : part.type === "data-error" ? getStringField(data, "message") : void 0)?.trim();
		if (preview) return truncateLivePreview(preview);
	}
	return "";
}
function buildTopicMessageFlowLiveState({ topicId, messages, partsByMessageId, activeNodeId, streamingMessageIds }) {
	const nodes = messages.flatMap((message) => {
		const metadata = message.metadata ?? {};
		const parentId = metadata.parentId;
		if (parentId == null) return [];
		const parts = partsByMessageId[message.id] ?? message.parts ?? [];
		const createdAt = metadata.createdAt ?? (/* @__PURE__ */ new Date()).toISOString();
		const isStreamingMessage = streamingMessageIds?.has(message.id) ?? false;
		const fallbackStatus = message.role === "assistant" && parts.length === 0 ? "pending" : "success";
		return [{
			id: message.id,
			parentId,
			role: message.role === "system" ? "assistant" : message.role,
			isContextBoundary: hasClearContextPart(parts) || void 0,
			preview: extractTopicMessageFlowLivePreview(parts),
			modelId: metadata.modelId ?? null,
			status: isStreamingMessage ? "pending" : metadata.status ?? fallbackStatus,
			createdAt,
			...metadata.siblingsGroupId ? { siblingsGroupId: metadata.siblingsGroupId } : {}
		}];
	});
	if (nodes.length === 0) return null;
	return {
		topicId,
		activeNodeId: activeNodeId ?? nodes.at(-1)?.id ?? null,
		nodes
	};
}
function toTreeNode(node, existing) {
	return {
		id: node.id,
		parentId: node.parentId,
		role: node.role,
		isContextBoundary: node.isContextBoundary ?? existing?.isContextBoundary,
		preview: node.preview || existing?.preview || "",
		modelId: node.modelId ?? existing?.modelId ?? null,
		status: node.status,
		createdAt: node.createdAt,
		hasChildren: existing?.hasChildren ?? false
	};
}
function compareTreeNodeOrder(a, b) {
	return a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id);
}
function groupKey(parentId, siblingsGroupId) {
	return `${parentId ?? "root"}:${siblingsGroupId}`;
}
function mergeTopicMessageFlowLiveTree(tree, liveState) {
	if (!liveState) return tree;
	const regularNodes = /* @__PURE__ */ new Map();
	const siblingGroups = /* @__PURE__ */ new Map();
	const existingTreeNodes = /* @__PURE__ */ new Map();
	const groupedNodeIds = /* @__PURE__ */ new Set();
	for (const node of tree.nodes) {
		regularNodes.set(node.id, node);
		existingTreeNodes.set(node.id, node);
	}
	for (const group of tree.siblingsGroups) {
		const key = groupKey(group.parentId, group.siblingsGroupId);
		siblingGroups.set(key, {
			parentId: group.parentId,
			siblingsGroupId: group.siblingsGroupId,
			nodes: group.nodes.slice()
		});
		for (const node of group.nodes) {
			existingTreeNodes.set(node.id, {
				...node,
				parentId: group.parentId
			});
			groupedNodeIds.add(node.id);
		}
	}
	for (const liveNode of liveState.nodes) {
		const existing = existingTreeNodes.get(liveNode.id);
		if (liveNode.siblingsGroupId && liveNode.siblingsGroupId !== 0) {
			regularNodes.delete(liveNode.id);
			const key = groupKey(liveNode.parentId, liveNode.siblingsGroupId);
			const group = siblingGroups.get(key) ?? {
				parentId: liveNode.parentId,
				siblingsGroupId: liveNode.siblingsGroupId,
				nodes: []
			};
			const nextNode = toTreeNode(liveNode, existing);
			const existingIndex = group.nodes.findIndex((node) => node.id === liveNode.id);
			group.nodes = existingIndex === -1 ? [...group.nodes, nextNode].sort(compareTreeNodeOrder) : group.nodes.map((node, index) => index === existingIndex ? nextNode : node);
			siblingGroups.set(key, group);
			groupedNodeIds.add(liveNode.id);
			continue;
		}
		regularNodes.set(liveNode.id, toTreeNode(liveNode, existing));
	}
	const childParentIds = /* @__PURE__ */ new Set();
	for (const node of regularNodes.values()) if (node.parentId) childParentIds.add(node.parentId);
	for (const group of siblingGroups.values()) if (group.parentId) childParentIds.add(group.parentId);
	return {
		activeNodeId: liveState.activeNodeId ?? tree.activeNodeId,
		rootId: tree.rootId,
		nodes: Array.from(regularNodes.values()).filter((node) => !groupedNodeIds.has(node.id)).map((node) => ({
			...node,
			hasChildren: node.hasChildren || childParentIds.has(node.id)
		})),
		siblingsGroups: Array.from(siblingGroups.values()).map((group) => ({
			...group,
			nodes: group.nodes.map((node) => ({
				...node,
				hasChildren: node.hasChildren || childParentIds.has(node.id)
			})).sort(compareTreeNodeOrder)
		}))
	};
}
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
export { mergeTopicMessageFlowLiveTree as i, useTopicMessagesCache as n, buildTopicMessageFlowLiveState as r, useTopicBranchActions as t };
