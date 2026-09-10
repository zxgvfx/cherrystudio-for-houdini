import { t as cacheService } from "./CacheService-IyXh62g9.js";
import { t as dataApiService } from "./DataApiService-Csr1w5Kb.js";
function forgetLastUsedChatTopic(topicIds) {
	const lastUsed = cacheService.getPersist("ui.chat.last_used_topic_id");
	if (lastUsed && topicIds.includes(lastUsed)) cacheService.setPersist("ui.chat.last_used_topic_id", null);
}
function forgetLastUsedAgentSession(sessionIds) {
	const lastUsed = cacheService.getPersist("ui.agent.last_used_session_id");
	if (lastUsed && sessionIds.includes(lastUsed)) cacheService.setPersist("ui.agent.last_used_session_id", null);
}
async function resolveChatEntryTopicId() {
	const lastUsedTopicId = cacheService.getPersist("ui.chat.last_used_topic_id");
	if (lastUsedTopicId) try {
		await dataApiService.get(`/topics/${lastUsedTopicId}`);
		return lastUsedTopicId;
	} catch {
		cacheService.setPersist("ui.chat.last_used_topic_id", null);
	}
	const { topic } = await dataApiService.get("/topics/latest");
	return topic?.id ?? null;
}
async function resolveAgentEntrySessionId() {
	const lastUsedSessionId = cacheService.getPersist("ui.agent.last_used_session_id");
	if (lastUsedSessionId) try {
		await dataApiService.get(`/agent-sessions/${lastUsedSessionId}`);
		return lastUsedSessionId;
	} catch {
		cacheService.setPersist("ui.agent.last_used_session_id", null);
	}
	const { session } = await dataApiService.get("/agent-sessions/latest");
	return session?.id ?? null;
}
export { resolveChatEntryTopicId as i, forgetLastUsedChatTopic as n, resolveAgentEntrySessionId as r, forgetLastUsedAgentSession as t };
