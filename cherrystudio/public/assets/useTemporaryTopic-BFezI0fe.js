import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as dataApiService } from "./DataApiService-DP44jQXR.js";
import { t as clampSurrogateBoundary } from "./text-3zA0LTvR.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useTemporaryTopic");
var TEMPORARY_TOPIC_NAME_MAX_LENGTH = 30;
function useTemporaryTopic(options = {}) {
	const { assistantId, enabled = assistantId !== void 0 } = options;
	const [topicId, setTopicId] = (0, import_react.useState)(null);
	const [epoch, setEpoch] = (0, import_react.useState)(0);
	const activeIdRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!enabled) {
			setTopicId(null);
			return;
		}
		let cancelled = false;
		const body = assistantId ? { assistantId } : {};
		dataApiService.post("/temporary/topics", { body }).then((topic) => {
			activeIdRef.current = topic.id;
			if (cancelled) {
				dataApiService.delete(`/temporary/topics/${topic.id}`).catch((err) => {
					logger.warn("Failed to cleanup racing temporary topic", err);
				});
				return;
			}
			setTopicId(topic.id);
			logger.debug("Leased temporary topic", {
				topicId: topic.id,
				assistantId,
				epoch
			});
		}).catch((err) => {
			logger.error("Failed to create temporary topic", err);
		});
		return () => {
			cancelled = true;
			setTopicId(null);
			const idToCleanup = activeIdRef.current;
			activeIdRef.current = null;
			if (idToCleanup) dataApiService.delete(`/temporary/topics/${idToCleanup}`).catch((err) => {
				logger.warn("Failed to release temporary topic on unmount", err);
			});
		};
	}, [
		enabled,
		assistantId,
		epoch
	]);
	const reset = (0, import_react.useCallback)(() => {
		setEpoch((n) => n + 1);
	}, []);
	const persist = (0, import_react.useCallback)(async (initialName) => {
		const id = activeIdRef.current;
		if (!id) return;
		await dataApiService.post(`/temporary/topics/${id}/persist`, { body: {} });
		activeIdRef.current = null;
		logger.debug("Persisted temporary topic", { topicId: id });
		const trimmed = initialName?.trim();
		if (trimmed) try {
			await dataApiService.patch(`/topics/${id}`, { body: {
				name: trimmed.slice(0, clampSurrogateBoundary(trimmed, TEMPORARY_TOPIC_NAME_MAX_LENGTH)),
				isNameManuallyEdited: false
			} });
		} catch (err) {
			logger.warn("Failed to seed placeholder topic name", err);
		}
	}, []);
	return {
		topicId,
		ready: topicId !== null,
		reset,
		persist
	};
}
export { useTemporaryTopic as t };
