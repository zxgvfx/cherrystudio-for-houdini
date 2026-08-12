import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { a as useSharedCacheValue, r as useSharedCache } from "./useCache-SsOQx-L2.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as isUniqueModelId, i as createUniqueModelId, o as parseUniqueModelId } from "./model-CfoN7z8F.js";
import { r as hasClearContextPart } from "./uiParts-CtZmiNbl.js";
import { t as classifyTurn } from "./transport-CTTVYBal.js";
function resolveUniqueModelId(modelId, modelSnapshot) {
	if (isUniqueModelId(modelId)) return modelId;
	if (!modelSnapshot) return void 0;
	return createUniqueModelId(modelSnapshot.provider, modelSnapshot.id);
}
function statsFromMetadata(metadata) {
	if (!metadata) return void 0;
	const stats = { ...metadata.stats };
	if (metadata.totalTokens !== void 0) stats.totalTokens = metadata.totalTokens;
	return Object.keys(stats).length > 0 ? stats : void 0;
}
function toMessageListItem(message, ctx) {
	const metadata = message.metadata ?? {};
	const messageSnapshot = metadata.messageSnapshot;
	let model = messageSnapshot?.model;
	if (!model && metadata.modelId && isUniqueModelId(metadata.modelId)) {
		const { providerId, modelId: modelId$1 } = parseUniqueModelId(metadata.modelId);
		model = {
			id: modelId$1,
			name: modelId$1,
			provider: providerId
		};
	}
	const modelId = metadata.modelId ?? (message.role === "assistant" && model ? createUniqueModelId(model.provider, model.id) : void 0);
	return {
		id: message.id,
		role: message.role,
		assistantId: ctx.assistantId,
		topicId: ctx.topicId,
		parentId: metadata.parentId ?? null,
		isContextBoundary: hasClearContextPart(message.parts) || void 0,
		createdAt: metadata.createdAt ?? "",
		status: message.role === "assistant" ? metadata.status ?? "pending" : "success",
		modelId,
		model,
		messageSnapshot,
		siblingsGroupId: metadata.siblingsGroupId,
		isActiveBranch: metadata.isActiveBranch,
		stats: statsFromMetadata(message.metadata)
	};
}
function getMessageListItemModel(message) {
	if (message.model) return {
		id: message.model.id,
		name: message.model.name,
		provider: message.model.provider,
		group: message.model.group ?? ""
	};
	if (!message.modelId || !isUniqueModelId(message.modelId)) return void 0;
	const { providerId, modelId } = parseUniqueModelId(message.modelId);
	return {
		id: modelId,
		name: modelId,
		provider: providerId,
		group: ""
	};
}
function getDirectAssistantModelsByUserId(messages) {
	const modelsByUserId = /* @__PURE__ */ new Map();
	const seenModelIdsByUserId = /* @__PURE__ */ new Map();
	for (const message of messages) {
		if (message.role !== "assistant" || !message.parentId) continue;
		const model = getMessageListItemModel(message);
		const uniqueModelId = model ? resolveUniqueModelId(message.modelId, {
			provider: model.provider,
			id: model.id
		}) : void 0;
		if (!model || !uniqueModelId) continue;
		let seenModelIds = seenModelIdsByUserId.get(message.parentId);
		if (!seenModelIds) {
			seenModelIds = /* @__PURE__ */ new Set();
			seenModelIdsByUserId.set(message.parentId, seenModelIds);
		}
		if (seenModelIds.has(uniqueModelId)) continue;
		seenModelIds.add(uniqueModelId);
		const userModels = modelsByUserId.get(message.parentId) ?? [];
		userModels.push({
			id: uniqueModelId,
			providerId: model.provider,
			apiModelId: model.id,
			name: model.name,
			group: model.group || void 0,
			capabilities: [],
			supportsStreaming: true,
			isEnabled: true,
			isHidden: false
		});
		modelsByUserId.set(message.parentId, userModels);
	}
	return modelsByUserId;
}
function directAssistantModelEqual(previous, next) {
	return previous.id === next.id && previous.providerId === next.providerId && previous.apiModelId === next.apiModelId && previous.name === next.name && previous.group === next.group && previous.supportsStreaming === next.supportsStreaming && previous.isEnabled === next.isEnabled && previous.isHidden === next.isHidden;
}
function shareDirectAssistantModelsByUserId(previous, next) {
	if (!previous || previous.size !== next.size) return next;
	for (const [userId, nextModels] of next) {
		const previousModels = previous.get(userId);
		if (!previousModels || previousModels.length !== nextModels.length) return next;
		for (let index = 0; index < nextModels.length; index++) if (!directAssistantModelEqual(previousModels[index], nextModels[index])) return next;
	}
	return previous;
}
function getMessageListItemModelName(message) {
	const model = getMessageListItemModel(message);
	return model?.name || model?.id || message.modelId || "";
}
function isMessageListItemProcessing(message) {
	return message.status === "pending";
}
function createMessageExportView(message, parts) {
	const model = getMessageListItemModel(message);
	return {
		id: message.id,
		role: message.role,
		assistantId: message.assistantId,
		topicId: message.topicId,
		createdAt: message.createdAt,
		updatedAt: message.updatedAt,
		status: message.status,
		modelId: message.modelId,
		model,
		messageSnapshot: message.messageSnapshot,
		parentId: message.parentId,
		siblingsGroupId: message.siblingsGroupId,
		stats: message.stats,
		parts
	};
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useTopicStreamStatus");
function useTopicStreamStatus(topicId) {
	const entry = useSharedCacheValue(`topic.stream.statuses.${topicId}`);
	const [lastSeenCompletion, setLastSeenCompletion] = useSharedCache(`topic.stream.last_seen_completion.${topicId}`);
	const status = entry?.status;
	const lastCompletedAt = entry?.lastCompletedAt ?? null;
	return {
		status,
		activeExecutions: (0, import_react.useMemo)(() => entry?.activeExecutions ?? [], [entry]),
		awaitingApprovalAnchors: (0, import_react.useMemo)(() => entry?.awaitingApprovalAnchors ?? [], [entry]),
		isPending: classifyTurn(status).isStreamLive,
		isFulfilled: status === "done" && lastCompletedAt !== lastSeenCompletion,
		markSeen: (0, import_react.useCallback)(() => {
			if (lastCompletedAt != null && lastCompletedAt !== lastSeenCompletion) setLastSeenCompletion(lastCompletedAt);
		}, [
			lastCompletedAt,
			lastSeenCompletion,
			setLastSeenCompletion
		])
	};
}
function useTopicAwaitingApproval(topicId) {
	return classifyTurn(useSharedCacheValue(`topic.stream.statuses.${topicId}`)?.status).isAwaitingApproval;
}
function useTopicDbRefreshOnAwaitingApproval(topicId, refresh) {
	const status = useSharedCacheValue(`topic.stream.statuses.${topicId}`)?.status;
	const refreshRef = (0, import_react.useRef)(refresh);
	refreshRef.current = refresh;
	const prevRef = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		const previous = prevRef.current;
		const prev = previous?.topicId === topicId ? previous.status : void 0;
		prevRef.current = {
			status,
			topicId
		};
		if (classifyTurn(prev).isStreamLive && classifyTurn(status).isAwaitingApproval) refreshRef.current().catch(() => {});
	}, [status, topicId]);
}
function useTopicOverlayHandoffOnTerminal(topicId, onHandoff) {
	const status = useSharedCacheValue(`topic.stream.statuses.${topicId}`)?.status;
	const onHandoffRef = (0, import_react.useRef)(onHandoff);
	onHandoffRef.current = onHandoff;
	const prevRef = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		const previous = prevRef.current;
		const prev = previous?.topicId === topicId ? previous.status : void 0;
		prevRef.current = {
			status,
			topicId
		};
		const next = classifyTurn(status);
		if (classifyTurn(prev).isStreamLive && next.isTerminal && !next.isAwaitingApproval) (async () => {
			await onHandoffRef.current();
		})().catch((error) => {
			logger.warn("Topic overlay handoff failed", error, { topicId });
		});
	}, [status, topicId]);
}
export { createMessageExportView as a, getMessageListItemModelName as c, toMessageListItem as d, resolveUniqueModelId as f, useTopicStreamStatus as i, isMessageListItemProcessing as l, useTopicDbRefreshOnAwaitingApproval as n, getDirectAssistantModelsByUserId as o, useTopicOverlayHandoffOnTerminal as r, getMessageListItemModel as s, useTopicAwaitingApproval as t, shareDirectAssistantModelsByUserId as u };
