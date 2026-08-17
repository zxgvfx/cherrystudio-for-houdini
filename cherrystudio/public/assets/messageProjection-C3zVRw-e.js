import { d as toContentRole } from "./message-B_yl0O_K.js";
import { i as isBlankUserTurn } from "./uiParts-D7jaMraw.js";
function sharedMessageToUIMessage(shared) {
	return {
		id: shared.id,
		role: toContentRole(shared.role),
		parts: shared.data?.parts ?? [],
		metadata: {
			parentId: shared.parentId,
			siblingsGroupId: shared.siblingsGroupId || void 0,
			modelId: shared.modelId ?? void 0,
			messageSnapshot: shared.messageSnapshot ?? void 0,
			status: shared.status,
			turnOptions: shared.data.turnOptions,
			createdAt: shared.createdAt,
			stats: shared.stats ?? void 0,
			...shared.stats?.totalTokens ? { totalTokens: shared.stats.totalTokens } : {}
		}
	};
}
function isRenderableConversationMessage(message) {
	return !isBlankUserTurn({
		role: message.role,
		status: message.metadata?.status,
		parts: message.parts
	});
}
function uiMessagesToPartsMap(messages) {
	const map = {};
	for (const message of messages) if (message.parts.length > 0) map[message.id] = message.parts;
	return map;
}
export { sharedMessageToUIMessage as n, uiMessagesToPartsMap as r, isRenderableConversationMessage as t };
