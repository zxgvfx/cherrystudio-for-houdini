const MESSAGE_VIEW = "message";
function parseChatRouteSearch(search) {
	return {
		topicId: typeof search.topicId === "string" ? search.topicId : void 0,
		view: search.view === "message" ? MESSAGE_VIEW : void 0
	};
}
export { parseChatRouteSearch as t };
