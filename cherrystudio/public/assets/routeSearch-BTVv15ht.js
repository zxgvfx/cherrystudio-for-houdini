const MESSAGE_VIEW = "message";
function parseAgentRouteSearch(search) {
	return {
		intent: search.intent === "feedback" ? "feedback" : void 0,
		sessionId: typeof search.sessionId === "string" ? search.sessionId : void 0,
		view: search.view === "message" ? MESSAGE_VIEW : void 0
	};
}
export { parseAgentRouteSearch as t };
