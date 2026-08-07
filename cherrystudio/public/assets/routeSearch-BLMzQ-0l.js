const MESSAGE_VIEW = "message";
function parseChatRouteSearch(search) {
	return {
		assistantId: typeof search.assistantId === "string" ? search.assistantId : void 0,
		topicId: typeof search.topicId === "string" ? search.topicId : void 0,
		view: search.view === "message" ? MESSAGE_VIEW : void 0
	};
}
export { parseChatRouteSearch as t };
