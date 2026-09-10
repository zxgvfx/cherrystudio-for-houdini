import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { B as MessageListProvider } from "./agent-e68nHjCJ.js";
import { i as defaultMessageRenderConfig } from "./types-DmDsFD-i.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EMPTY_MESSAGE_ACTIONS = {};
function createFallbackTopic(messages) {
	const firstMessage = messages[0];
	return {
		id: firstMessage?.topicId || "standalone-message-content",
		assistantId: firstMessage?.assistantId || "",
		name: "",
		lastActivityAt: firstMessage?.updatedAt || firstMessage?.createdAt || "",
		createdAt: firstMessage?.createdAt || "",
		updatedAt: firstMessage?.updatedAt || "",
		messages: []
	};
}
function MessageContentProvider({ messages, partsByMessageId, children, topic, renderConfig, actions }) {
	const resolvedActions = actions ?? EMPTY_MESSAGE_ACTIONS;
	const mergedRenderConfig = (0, import_react.useMemo)(() => ({
		...defaultMessageRenderConfig,
		...renderConfig
	}), [renderConfig]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageListProvider, {
		value: (0, import_react.useMemo)(() => ({
			state: {
				topic: topic ?? createFallbackTopic(messages),
				messages,
				partsByMessageId,
				hasOlder: false,
				messageNavigation: "none",
				estimateSize: 0,
				overscan: 0,
				loadOlderDelayMs: 0,
				loadingResetDelayMs: 0,
				renderConfig: mergedRenderConfig,
				selection: {
					enabled: false,
					isMultiSelectMode: false,
					selectedMessageIds: []
				},
				getMessageActivityState: (message) => ({
					isProcessing: message.status === "pending",
					isStreamTarget: message.status === "pending",
					isApprovalAnchor: false
				})
			},
			actions: resolvedActions,
			meta: { selectionLayer: false }
		}), [
			mergedRenderConfig,
			messages,
			partsByMessageId,
			resolvedActions,
			topic
		]),
		children
	});
}
export { MessageContentProvider as t };
