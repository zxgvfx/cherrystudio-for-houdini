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
export { classifyTurn as t };
