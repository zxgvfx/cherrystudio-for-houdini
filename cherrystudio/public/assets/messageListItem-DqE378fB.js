import { a as isUniqueModelId, i as createUniqueModelId, o as parseUniqueModelId } from "./model-BOGgSmTN.js";
import { i as hasClearContextPart } from "./uiParts-ClY38h-2.js";
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
export { isMessageListItemProcessing as a, resolveUniqueModelId as c, getMessageListItemModelName as i, getDirectAssistantModelsByUserId as n, shareDirectAssistantModelsByUserId as o, getMessageListItemModel as r, toMessageListItem as s, createMessageExportView as t };
