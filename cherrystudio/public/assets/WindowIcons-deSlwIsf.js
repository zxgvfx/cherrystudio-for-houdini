import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { i as useSessions } from "./useSession-CwZkOUrY.js";
import { l as useTopics, r as mapApiTopicToRendererTopic } from "./useTopic-DcX9oNzM.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var AGENT_SESSIONS_LOAD_ALL_PAGE_SIZE = 200;
function useRawAssistantTopicsSource({ enabled } = {}) {
	return useTopics({
		loadAll: true,
		enabled
	});
}
function useRawAgentSessionsSource({ enabled } = {}) {
	return useSessions(void 0, {
		loadAll: true,
		pageSize: AGENT_SESSIONS_LOAD_ALL_PAGE_SIZE,
		enabled
	});
}
function deriveAssistantTopicsView(topics) {
	return {
		rendererTopics: topics.map(mapApiTopicToRendererTopic),
		orderSignature: topics.map((t) => `${t.id}:${t.assistantId ?? ""}:${t.orderKey ?? ""}`).join("|")
	};
}
const AssistantTopicsSourceContext = (0, import_react.createContext)(null);
const AgentSessionsSourceContext = (0, import_react.createContext)(null);
function useAssistantTopicsSource() {
	const source = (0, import_react.use)(AssistantTopicsSourceContext);
	if (!source) throw new Error("useAssistantTopicsSource must be used within ResourceViewSourceProvider");
	return source;
}
function useAgentSessionsSource() {
	const source = (0, import_react.use)(AgentSessionsSourceContext);
	if (!source) throw new Error("useAgentSessionsSource must be used within ResourceViewSourceProvider");
	return source;
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var baseProps = {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": true
};
function BackToMainWindowIcon({ size = 24, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "icons.back-to-main-window",
		width: size,
		height: size,
		...mergeUiProps(baseProps, "icons.back-to-main-window"),
		...mergeUiProps(props, "icons.back-to-main-window"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 11V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.5 11.5v-2a1 1 0 0 1 1-1h2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "13",
				y: "13",
				width: "7.5",
				height: "7.5",
				rx: "2"
			})
		]
	});
}
function OpenInNewWindowIcon({ size = 24, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"data-ui": "icons.open-in-new-window",
		width: size,
		height: size,
		...mergeUiProps(baseProps, "icons.open-in-new-window"),
		...mergeUiProps(props, "icons.open-in-new-window"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "12.5",
			width: "9",
			height: "7.5",
			rx: "2"
		})]
	});
}
export { deriveAssistantTopicsView as a, useRawAgentSessionsSource as c, AssistantTopicsSourceContext as i, useRawAssistantTopicsSource as l, OpenInNewWindowIcon as n, useAgentSessionsSource as o, AgentSessionsSourceContext as r, useAssistantTopicsSource as s, BackToMainWindowIcon as t };
