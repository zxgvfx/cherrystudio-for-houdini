import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { a as useSharedCacheValue, r as useSharedCache } from "./useCache-lF6Sw_ck.js";
import { t as classifyTurn } from "./turnState-D76dPAfh.js";
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
export { useTopicStreamStatus as i, useTopicDbRefreshOnAwaitingApproval as n, useTopicOverlayHandoffOnTerminal as r, useTopicAwaitingApproval as t };
