import { t as isDev } from "./platform-CINZzEpE.js";
var DEFAULT_OPTIONS = { capturePayloads: false };
var MAX_ENTRIES = 500;
var MAX_STRING_LENGTH = 1e3;
var MAX_ARRAY_LENGTH = 50;
var MAX_OBJECT_KEYS = 100;
var MAX_DEPTH = 5;
var options = { ...DEFAULT_OPTIONS };
var events = [];
var eventIndex = /* @__PURE__ */ new Map();
var startTimes = /* @__PURE__ */ new Map();
function isEnabled() {
	return isDev && typeof window !== "undefined";
}
function prepareRecording() {
	if (!isEnabled()) return false;
	installGlobal();
	return true;
}
function safeRecord(record) {
	if (!prepareRecording()) return;
	try {
		record();
	} catch {}
}
function snapshotEvents() {
	return [...events];
}
function snapshotSummaryEvents() {
	return events.map((event) => ({
		id: event.id,
		state: event.state,
		timestamp: event.timestamp,
		completedAt: event.completedAt,
		requestId: event.requestId,
		method: event.method,
		path: event.path,
		status: event.status,
		retryAttempt: event.retryAttempt,
		clientDuration: event.clientDuration,
		mainDuration: event.mainDuration,
		handlerDuration: event.handlerDuration,
		error: event.error
	}));
}
function getEvent(requestId) {
	return eventIndex.get(requestId);
}
function clearEvents() {
	events.length = 0;
	eventIndex.clear();
	startTimes.clear();
}
function setDevtoolsOptions(nextOptions) {
	options = { capturePayloads: nextOptions.capturePayloads ?? options.capturePayloads };
	return { ...options };
}
function appendEvent(event, pushOptions) {
	const nextEvent = {
		...event,
		id: event.requestId,
		timestamp: Date.now()
	};
	events.push(nextEvent);
	eventIndex.set(nextEvent.requestId, nextEvent);
	if (pushOptions?.trackStart) startTimes.set(event.requestId, performance.now());
	pruneEvents();
}
function updateEvent(requestId, patch) {
	const event = eventIndex.get(requestId);
	if (!event) return false;
	Object.assign(event, patch);
	return true;
}
function upsertEvent(input, patch) {
	if (updateEvent(input.requestId, patch)) return;
	appendEvent({
		...input,
		...patch
	});
}
function pruneEvents() {
	if (events.length <= MAX_ENTRIES) return;
	for (const removed of events.splice(0, events.length - MAX_ENTRIES)) {
		eventIndex.delete(removed.requestId);
		startTimes.delete(removed.requestId);
	}
}
function consumeClientDuration(requestId) {
	const startTime = startTimes.get(requestId);
	if (startTime === void 0) return void 0;
	startTimes.delete(requestId);
	return performance.now() - startTime;
}
function sanitizeValue(value, depth = 0) {
	if (!options.capturePayloads) return void 0;
	if (value === null || value === void 0) return value;
	if (typeof value === "string") {
		if (value.length <= MAX_STRING_LENGTH) return value;
		return `${value.slice(0, MAX_STRING_LENGTH)}...<truncated ${value.length - MAX_STRING_LENGTH} chars>`;
	}
	if (typeof value === "number" || typeof value === "boolean") return value;
	if (typeof value === "bigint") return value.toString();
	if (typeof value === "function") return "<function>";
	if (typeof value !== "object") return String(value);
	if (depth >= MAX_DEPTH) return "<max-depth>";
	if (Array.isArray(value)) {
		const result$1 = value.slice(0, MAX_ARRAY_LENGTH).map((item) => sanitizeValue(item, depth + 1));
		if (value.length > MAX_ARRAY_LENGTH) result$1.push(`<truncated ${value.length - MAX_ARRAY_LENGTH} items>`);
		return result$1;
	}
	const result = {};
	const entries = Object.entries(value);
	for (const [key, item] of entries.slice(0, MAX_OBJECT_KEYS)) result[key] = sanitizeValue(item, depth + 1);
	if (entries.length > MAX_OBJECT_KEYS) result.__truncatedKeys = entries.length - MAX_OBJECT_KEYS;
	return result;
}
function serializeError(error) {
	const serializeMessage = (message) => {
		if (!options.capturePayloads) return "<payload capture disabled>";
		const sanitized = sanitizeValue(typeof message === "string" ? message : String(message));
		return typeof sanitized === "string" ? sanitized : String(sanitized);
	};
	if (error && typeof error === "object") {
		const record = error;
		return {
			name: typeof record.name === "string" ? record.name : void 0,
			code: typeof record.code === "string" ? record.code : void 0,
			message: serializeMessage(typeof record.message === "string" ? record.message : error),
			status: typeof record.status === "number" ? record.status : void 0,
			isRetryable: typeof record.isRetryable === "boolean" ? record.isRetryable : void 0
		};
	}
	return { message: serializeMessage(error) };
}
function installGlobal() {
	if (!isEnabled() || window.__CHERRY_DATA_API_DEVTOOLS__) return;
	window.__CHERRY_DATA_API_DEVTOOLS__ = {
		snapshot: snapshotEvents,
		snapshotSummary: snapshotSummaryEvents,
		getEvent,
		clear: clearEvents,
		setOptions: setDevtoolsOptions
	};
}
function exposeControlSurface() {
	installGlobal();
}
function recordStart(input) {
	safeRecord(() => {
		appendEvent({
			state: "pending",
			requestId: input.requestId,
			method: input.method,
			path: input.path,
			query: sanitizeValue(input.query),
			body: sanitizeValue(input.body),
			retryAttempt: input.retryAttempt
		}, { trackStart: true });
	});
}
function recordSuccess(input) {
	safeRecord(() => {
		const clientDuration = consumeClientDuration(input.requestId);
		upsertEvent(input, {
			state: "success",
			completedAt: Date.now(),
			status: input.response.status,
			response: sanitizeValue(input.response.data),
			clientDuration,
			mainDuration: input.response.metadata?.duration,
			handlerDuration: input.response.metadata?.handlerDuration
		});
	});
}
function recordError(input) {
	safeRecord(() => {
		const timingFields = {
			mainDuration: input.metadata?.duration,
			handlerDuration: input.metadata?.handlerDuration
		};
		upsertEvent(input, {
			state: "error",
			completedAt: Date.now(),
			status: input.status,
			clientDuration: consumeClientDuration(input.requestId),
			...timingFields,
			error: serializeError(input.error)
		});
	});
}
function recordRetry(input) {
	safeRecord(() => {
		upsertEvent(input, {
			state: "retry",
			completedAt: Date.now(),
			retryAttempt: input.retryAttempt,
			error: serializeError(input.error)
		});
	});
}
const DataApiDevtools = {
	exposeControlSurface,
	recordStart,
	recordSuccess,
	recordError,
	recordRetry
};
export { DataApiDevtools as t };
