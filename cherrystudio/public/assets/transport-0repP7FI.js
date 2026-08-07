function isDeferredToolOutput(value) {
	if (typeof value !== "object" || value === null) return false;
	const ref = value.$deferredToolResult;
	return typeof ref === "object" && ref !== null && typeof ref.topicId === "string" && !!ref.topicId && typeof ref.messageId === "string" && !!ref.messageId && typeof ref.toolCallId === "string" && !!ref.toolCallId;
}
function isPersistedToolOutput(value) {
	if (typeof value !== "object" || value === null) return false;
	const ref = value.$persistedToolOutput;
	return typeof ref === "object" && ref !== null;
}
function blobRefsOf(ref) {
	if (ref.shape === "entities") return ref.blobRefs;
	const { fileEntryId, vfsFilename, head, tail, totalChars, totalLines } = ref;
	return [{
		key: "",
		fileEntryId,
		vfsFilename,
		head,
		tail,
		totalChars,
		totalLines
	}];
}
function envelopeDisplayExcerpt(ref) {
	const blobs = blobRefsOf(ref);
	return {
		head: blobs[0].head,
		tail: blobs[blobs.length - 1].tail,
		totalChars: blobs.reduce((sum, b) => sum + b.totalChars, 0),
		totalLines: blobs.reduce((sum, b) => sum + b.totalLines, 0)
	};
}
var NO_STREAM = {
	isStreamLive: false,
	isTurnActive: false,
	isAwaitingApproval: false,
	isTerminal: false
};
const TURN_STATE = {
	pending: {
		isStreamLive: true,
		isTurnActive: true,
		isAwaitingApproval: false,
		isTerminal: false
	},
	streaming: {
		isStreamLive: true,
		isTurnActive: true,
		isAwaitingApproval: false,
		isTerminal: false
	},
	done: {
		isStreamLive: false,
		isTurnActive: false,
		isAwaitingApproval: false,
		isTerminal: true
	},
	aborted: {
		isStreamLive: false,
		isTurnActive: false,
		isAwaitingApproval: false,
		isTerminal: true
	},
	error: {
		isStreamLive: false,
		isTurnActive: false,
		isAwaitingApproval: false,
		isTerminal: true
	},
	"awaiting-approval": {
		isStreamLive: false,
		isTurnActive: true,
		isAwaitingApproval: true,
		isTerminal: true
	}
};
function classifyTurn(status) {
	return status ? TURN_STATE[status] : NO_STREAM;
}
export { isDeferredToolOutput as i, envelopeDisplayExcerpt as n, isPersistedToolOutput as r, classifyTurn as t };
