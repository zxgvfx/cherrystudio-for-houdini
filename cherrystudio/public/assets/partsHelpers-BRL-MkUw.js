import { c as __toESM, t as __commonJSMin } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { o as isToolUIPart, s as readUIMessageStream, t as AbstractChat } from "./dist-DmJhY6Jt.js";
import { a as readCherryMeta } from "./uiParts-D7jaMraw.js";
var require_throttleit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function throttle$1(function_, wait) {
		if (typeof function_ !== "function") throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
		let timeoutId;
		let lastCallTime = 0;
		return function throttled(...arguments_) {
			clearTimeout(timeoutId);
			const now = Date.now();
			const delayForNextCall = wait - (now - lastCallTime);
			if (delayForNextCall <= 0) {
				lastCallTime = now;
				function_.apply(this, arguments_);
			} else timeoutId = setTimeout(() => {
				lastCallTime = Date.now();
				function_.apply(this, arguments_);
			}, delayForNextCall);
		};
	}
	module.exports = throttle$1;
}));
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_throttleit = /* @__PURE__ */ __toESM(require_throttleit(), 1);
var __accessCheck = (obj, member, msg) => {
	if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
	__accessCheck(obj, member, "read from private field");
	return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
	if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
	member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
	__accessCheck(obj, member, "write to private field");
	setter ? setter.call(obj, value) : member.set(obj, value);
	return value;
};
function throttle(fn, waitMs) {
	return waitMs != null ? (0, import_throttleit.default)(fn, waitMs) : fn;
}
var _messages, _status, _error, _messagesCallbacks, _statusCallbacks, _errorCallbacks, _callMessagesCallbacks, _callStatusCallbacks, _callErrorCallbacks;
var ReactChatState = class {
	constructor(initialMessages = []) {
		__privateAdd(this, _messages, void 0);
		__privateAdd(this, _status, "ready");
		__privateAdd(this, _error, void 0);
		__privateAdd(this, _messagesCallbacks, /* @__PURE__ */ new Set());
		__privateAdd(this, _statusCallbacks, /* @__PURE__ */ new Set());
		__privateAdd(this, _errorCallbacks, /* @__PURE__ */ new Set());
		this.pushMessage = (message) => {
			__privateSet(this, _messages, __privateGet(this, _messages).concat(message));
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.popMessage = () => {
			__privateSet(this, _messages, __privateGet(this, _messages).slice(0, -1));
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.replaceMessage = (index, message) => {
			__privateSet(this, _messages, [
				...__privateGet(this, _messages).slice(0, index),
				this.snapshot(message),
				...__privateGet(this, _messages).slice(index + 1)
			]);
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.snapshot = (value) => {
			if (!(value && Array.isArray(value.parts))) return structuredClone(value);
			const snapshot = {
				...value,
				parts: value.parts.map((part) => ({ ...part }))
			};
			if ("metadata" in value) {
				const metadata = value.metadata;
				snapshot.metadata = Array.isArray(metadata) ? [...metadata] : metadata !== null && typeof metadata === "object" ? { ...metadata } : metadata;
			}
			return snapshot;
		};
		this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => {
			const callback = throttleWaitMs ? throttle(onChange, throttleWaitMs) : onChange;
			__privateGet(this, _messagesCallbacks).add(callback);
			return () => {
				__privateGet(this, _messagesCallbacks).delete(callback);
			};
		};
		this["~registerStatusCallback"] = (onChange) => {
			__privateGet(this, _statusCallbacks).add(onChange);
			return () => {
				__privateGet(this, _statusCallbacks).delete(onChange);
			};
		};
		this["~registerErrorCallback"] = (onChange) => {
			__privateGet(this, _errorCallbacks).add(onChange);
			return () => {
				__privateGet(this, _errorCallbacks).delete(onChange);
			};
		};
		__privateAdd(this, _callMessagesCallbacks, () => {
			__privateGet(this, _messagesCallbacks).forEach((callback) => callback());
		});
		__privateAdd(this, _callStatusCallbacks, () => {
			__privateGet(this, _statusCallbacks).forEach((callback) => callback());
		});
		__privateAdd(this, _callErrorCallbacks, () => {
			__privateGet(this, _errorCallbacks).forEach((callback) => callback());
		});
		__privateSet(this, _messages, initialMessages);
	}
	get status() {
		return __privateGet(this, _status);
	}
	set status(newStatus) {
		__privateSet(this, _status, newStatus);
		__privateGet(this, _callStatusCallbacks).call(this);
	}
	get error() {
		return __privateGet(this, _error);
	}
	set error(newError) {
		__privateSet(this, _error, newError);
		__privateGet(this, _callErrorCallbacks).call(this);
	}
	get messages() {
		return __privateGet(this, _messages);
	}
	set messages(newMessages) {
		__privateSet(this, _messages, [...newMessages]);
		__privateGet(this, _callMessagesCallbacks).call(this);
	}
};
_messages = /* @__PURE__ */ new WeakMap();
_status = /* @__PURE__ */ new WeakMap();
_error = /* @__PURE__ */ new WeakMap();
_messagesCallbacks = /* @__PURE__ */ new WeakMap();
_statusCallbacks = /* @__PURE__ */ new WeakMap();
_errorCallbacks = /* @__PURE__ */ new WeakMap();
_callMessagesCallbacks = /* @__PURE__ */ new WeakMap();
_callStatusCallbacks = /* @__PURE__ */ new WeakMap();
_callErrorCallbacks = /* @__PURE__ */ new WeakMap();
var _state;
var Chat = class extends AbstractChat {
	constructor({ messages, ...init }) {
		const state = new ReactChatState(messages);
		super({
			...init,
			state
		});
		__privateAdd(this, _state, void 0);
		this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => __privateGet(this, _state)["~registerMessagesCallback"](onChange, throttleWaitMs);
		this["~registerStatusCallback"] = (onChange) => __privateGet(this, _state)["~registerStatusCallback"](onChange);
		this["~registerErrorCallback"] = (onChange) => __privateGet(this, _state)["~registerErrorCallback"](onChange);
		__privateSet(this, _state, state);
	}
};
_state = /* @__PURE__ */ new WeakMap();
function useChat({ experimental_throttle: throttleWaitMs, resume = false, ...options } = {}) {
	const callbacksRef = (0, import_react.useRef)(!("chat" in options) ? {
		onToolCall: options.onToolCall,
		onData: options.onData,
		onFinish: options.onFinish,
		onError: options.onError,
		sendAutomaticallyWhen: options.sendAutomaticallyWhen
	} : {});
	if (!("chat" in options)) callbacksRef.current = {
		onToolCall: options.onToolCall,
		onData: options.onData,
		onFinish: options.onFinish,
		onError: options.onError,
		sendAutomaticallyWhen: options.sendAutomaticallyWhen
	};
	const optionsWithCallbacks = {
		...options,
		onToolCall: (arg) => {
			var _a, _b;
			return (_b = (_a = callbacksRef.current).onToolCall) == null ? void 0 : _b.call(_a, arg);
		},
		onData: (arg) => {
			var _a, _b;
			return (_b = (_a = callbacksRef.current).onData) == null ? void 0 : _b.call(_a, arg);
		},
		onFinish: (arg) => {
			var _a, _b;
			return (_b = (_a = callbacksRef.current).onFinish) == null ? void 0 : _b.call(_a, arg);
		},
		onError: (arg) => {
			var _a, _b;
			return (_b = (_a = callbacksRef.current).onError) == null ? void 0 : _b.call(_a, arg);
		},
		sendAutomaticallyWhen: (arg) => {
			var _a, _b, _c;
			return (_c = (_b = (_a = callbacksRef.current).sendAutomaticallyWhen) == null ? void 0 : _b.call(_a, arg)) != null ? _c : false;
		}
	};
	const chatRef = (0, import_react.useRef)("chat" in options ? options.chat : new Chat(optionsWithCallbacks));
	if ("chat" in options && options.chat !== chatRef.current || "id" in options && chatRef.current.id !== options.id) chatRef.current = "chat" in options ? options.chat : new Chat(optionsWithCallbacks);
	const messages = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((update) => chatRef.current["~registerMessagesCallback"](update, throttleWaitMs), [throttleWaitMs, chatRef.current.id]), () => chatRef.current.messages, () => chatRef.current.messages);
	const status = (0, import_react.useSyncExternalStore)(chatRef.current["~registerStatusCallback"], () => chatRef.current.status, () => chatRef.current.status);
	const error = (0, import_react.useSyncExternalStore)(chatRef.current["~registerErrorCallback"], () => chatRef.current.error, () => chatRef.current.error);
	const setMessages = (0, import_react.useCallback)((messagesParam) => {
		if (typeof messagesParam === "function") messagesParam = messagesParam(chatRef.current.messages);
		chatRef.current.messages = messagesParam;
	}, [chatRef]);
	(0, import_react.useEffect)(() => {
		if (resume) chatRef.current.resumeStream();
	}, [resume, chatRef]);
	return {
		id: chatRef.current.id,
		messages,
		setMessages,
		sendMessage: chatRef.current.sendMessage,
		regenerate: chatRef.current.regenerate,
		clearError: chatRef.current.clearError,
		stop: chatRef.current.stop,
		error,
		resumeStream: chatRef.current.resumeStream,
		status,
		addToolResult: chatRef.current.addToolOutput,
		addToolOutput: chatRef.current.addToolOutput,
		addToolApprovalResponse: chatRef.current.addToolApprovalResponse
	};
}
var logger$3 = loggerService.withContext("TopicStreamSubscription");
function branchKey(executionId, anchorMessageId, attemptId) {
	return JSON.stringify([
		executionId,
		anchorMessageId ?? null,
		attemptId ?? null
	]);
}
function createBranch(executionId, anchorMessageId, attemptId) {
	const branch = {
		executionId,
		attemptId,
		anchorMessageId,
		stream: void 0,
		controller: null,
		closed: false
	};
	branch.stream = new ReadableStream({
		start(controller) {
			branch.controller = controller;
		},
		cancel() {
			branch.closed = true;
		}
	});
	return branch;
}
var TopicStreamSubscription = class {
	#topicId;
	#branches = /* @__PURE__ */ new Map();
	#terminalByBranchKey = /* @__PURE__ */ new Map();
	#terminalListeners = /* @__PURE__ */ new Set();
	#branchRetirementListeners = /* @__PURE__ */ new Set();
	#topicStateListeners = /* @__PURE__ */ new Set();
	#ipcUnsubs = [];
	#attached = false;
	#attachInFlight = null;
	#disposed = false;
	#topicOpen = false;
	#terminalAttemptWatermark;
	constructor(topicId) {
		this.#topicId = topicId;
	}
	listen() {
		if (this.#disposed) return;
		this.#setupIpcListeners();
	}
	register(executionId, anchorMessageId, attemptId) {
		const branch = this.#getOrCreateBranch(executionId, anchorMessageId, attemptId);
		if (!branch.closed) this.#ensureAttached();
		return branch.stream;
	}
	hasOpenBranch(executionId, anchorMessageId, attemptId) {
		const branch = this.#branches.get(branchKey(executionId, anchorMessageId, attemptId));
		return branch !== void 0 && !branch.closed;
	}
	hasAnyOpenBranch() {
		for (const branch of this.#branches.values()) if (!branch.closed) return true;
		return false;
	}
	isTopicOpen() {
		return this.#topicOpen;
	}
	unregister(executionId, anchorMessageId, attemptId) {
		const key = branchKey(executionId, anchorMessageId, attemptId);
		const branch = this.#branches.get(key);
		if (branch) {
			this.#closeBranch(branch);
			this.#branches.delete(key);
		}
		this.#terminalByBranchKey.delete(key);
		if (this.#branches.size === 0 && this.#attached && !this.#disposed && !this.#topicOpen) queueMicrotask(() => {
			if (this.#branches.size === 0 && this.#attached && !this.#disposed && !this.#topicOpen) this.#detach();
		});
	}
	cancelBranch(executionId, anchorMessageId, attemptId) {
		const branch = this.#branches.get(branchKey(executionId, anchorMessageId, attemptId));
		if (!branch || branch.closed) return;
		branch.closed = true;
		try {
			branch.controller?.error();
		} catch {}
	}
	onExecutionTerminal(listener) {
		this.#terminalListeners.add(listener);
		for (const { executionId, terminal } of this.#terminalByBranchKey.values()) try {
			listener(executionId, terminal);
		} catch (err) {
			logger$3.warn("terminal listener threw during replay", {
				topicId: this.#topicId,
				err
			});
		}
		return () => this.#terminalListeners.delete(listener);
	}
	onBranchesRetired(listener) {
		this.#branchRetirementListeners.add(listener);
		return () => this.#branchRetirementListeners.delete(listener);
	}
	onTopicStateChange(listener) {
		this.#topicStateListeners.add(listener);
		return () => this.#topicStateListeners.delete(listener);
	}
	dispose() {
		if (this.#disposed) return;
		this.#disposed = true;
		for (const branch of this.#branches.values()) this.#closeBranch(branch);
		this.#branches.clear();
		this.#terminalByBranchKey.clear();
		this.#terminalListeners.clear();
		this.#branchRetirementListeners.clear();
		this.#topicStateListeners.clear();
		if (this.#attached) ipcApi.request("ai.stream.detach", { topicId: this.#topicId }).catch(() => {});
		this.#attached = false;
		this.#attachInFlight = null;
		for (const unsub of this.#ipcUnsubs) unsub();
		this.#ipcUnsubs = [];
	}
	#getOrCreateBranch(executionId, anchorMessageId, attemptId) {
		const key = branchKey(executionId, anchorMessageId, attemptId);
		let branch = this.#branches.get(key);
		if (!branch) {
			branch = createBranch(executionId, anchorMessageId, attemptId);
			if (this.#isBranchSettled(executionId, anchorMessageId, attemptId)) {
				this.#closeBranch(branch);
				return branch;
			}
			this.#branches.set(key, branch);
		}
		return branch;
	}
	#terminalFor(executionId, anchorMessageId, attemptId) {
		return this.#terminalByBranchKey.get(branchKey(executionId, anchorMessageId, attemptId))?.terminal;
	}
	#isBranchSettled(executionId, anchorMessageId, attemptId) {
		return this.#terminalFor(executionId, anchorMessageId, attemptId) !== void 0 || this.#terminalAttemptWatermark !== void 0 && attemptId <= this.#terminalAttemptWatermark;
	}
	#closeBranch(branch) {
		if (branch.closed) return;
		branch.closed = true;
		try {
			branch.controller?.close();
		} catch {}
	}
	#routeChunk(payload) {
		if (payload.topicId !== this.#topicId) return;
		const { executionId, attemptId } = payload;
		if (!executionId || attemptId === void 0) {
			logger$3.warn("chunk without execution identity dropped", {
				topicId: this.#topicId,
				hasExecutionId: executionId !== void 0,
				hasAttemptId: attemptId !== void 0
			});
			return;
		}
		if (this.#isBranchSettled(executionId, payload.anchorMessageId, attemptId)) return;
		const branch = this.#getOrCreateBranch(executionId, payload.anchorMessageId, attemptId);
		if (!branch.closed) branch.controller?.enqueue(payload.chunk);
	}
	#enqueueError(error, executionId, anchorMessageId, attemptId, topicAttemptWatermark) {
		const chunk = {
			type: "data-error",
			data: { ...error }
		};
		if (executionId && attemptId !== void 0) {
			const branch = this.#getOrCreateBranch(executionId, anchorMessageId, attemptId);
			if (!branch.closed) branch.controller?.enqueue(chunk);
			return;
		}
		if (executionId) {
			logger$3.warn("execution error without attemptId dropped", {
				topicId: this.#topicId,
				executionId
			});
			return;
		}
		const branches = [...this.#branches.values()].filter((branch) => topicAttemptWatermark === void 0 || branch.attemptId <= topicAttemptWatermark);
		this.#enqueueErrorToBranches(chunk, branches);
	}
	#enqueueErrorToBranches(chunk, branches) {
		for (const branch of branches) {
			const key = branchKey(branch.executionId, branch.anchorMessageId, branch.attemptId);
			if (this.#branches.get(key) !== branch) continue;
			if (!branch.closed) branch.controller?.enqueue(chunk);
		}
	}
	#emitTerminal(executionId, terminal, anchorMessageId, attemptId) {
		const keys = anchorMessageId !== void 0 || attemptId !== void 0 ? [branchKey(executionId, anchorMessageId, attemptId)] : [...this.#branches].filter(([, branch]) => branch.executionId === executionId).map(([key]) => key);
		if (keys.length === 0) keys.push(branchKey(executionId, void 0, attemptId));
		for (const key of keys) {
			const branch = this.#branches.get(key);
			if (branch) this.#closeBranch(branch);
			const resolvedAnchorMessageId = anchorMessageId ?? branch?.anchorMessageId;
			const resolvedAttemptId = attemptId ?? branch?.attemptId;
			const terminalForBranch = {
				...terminal,
				...resolvedAttemptId !== void 0 ? { attemptId: resolvedAttemptId } : {},
				...resolvedAnchorMessageId !== void 0 ? { anchorMessageId: resolvedAnchorMessageId } : {}
			};
			this.#terminalByBranchKey.set(key, {
				executionId,
				terminal: terminalForBranch
			});
			for (const listener of this.#terminalListeners) try {
				listener(executionId, terminalForBranch);
			} catch (err) {
				logger$3.warn("terminal listener threw", {
					topicId: this.#topicId,
					err
				});
			}
		}
	}
	#terminateAll(terminal) {
		this.#terminateBranches([...this.#branches.values()], terminal);
	}
	#applyTerminal(executionId, terminal, anchorMessageId, attemptId, topicAttemptWatermark) {
		if (topicAttemptWatermark === void 0) {
			if (executionId) this.#emitTerminal(executionId, terminal, anchorMessageId, attemptId);
			else this.#terminateAll(terminal);
			return;
		}
		this.#terminalAttemptWatermark = Math.max(this.#terminalAttemptWatermark ?? 0, topicAttemptWatermark);
		const exactKey = executionId ? branchKey(executionId, anchorMessageId, attemptId) : void 0;
		const coveredBranches = [...this.#branches.entries()].filter(([, branch]) => branch.attemptId <= topicAttemptWatermark).filter(([key]) => key !== exactKey).map(([, branch]) => branch);
		if (executionId) {
			this.#retireBranches(coveredBranches);
			this.#emitTerminal(executionId, terminal, anchorMessageId, attemptId);
		} else this.#terminateBranches(coveredBranches, terminal);
	}
	#retireBranches(branches) {
		const identities = branches.map(({ executionId, attemptId, anchorMessageId }) => ({
			executionId,
			attemptId,
			...anchorMessageId !== void 0 ? { anchorMessageId } : {}
		}));
		if (identities.length === 0) return;
		for (const listener of this.#branchRetirementListeners) try {
			listener(identities);
		} catch (err) {
			logger$3.warn("branch retirement listener threw", {
				topicId: this.#topicId,
				err
			});
		}
		for (const branch of branches) {
			const key = branchKey(branch.executionId, branch.anchorMessageId, branch.attemptId);
			if (this.#branches.get(key) !== branch) continue;
			this.#closeBranch(branch);
			this.#branches.delete(key);
			this.#terminalByBranchKey.delete(key);
		}
	}
	#terminateBranches(branches, terminal) {
		for (const branch of branches) {
			const key = branchKey(branch.executionId, branch.anchorMessageId, branch.attemptId);
			if (this.#branches.get(key) !== branch) continue;
			this.#emitTerminal(branch.executionId, terminal, branch.anchorMessageId, branch.attemptId);
		}
	}
	#updateTopicOpen(isTopicDone) {
		if (isTopicDone === void 0) return false;
		const topicOpen = !isTopicDone;
		if (topicOpen === this.#topicOpen) return false;
		this.#topicOpen = topicOpen;
		return true;
	}
	#notifyTopicStateChange() {
		for (const listener of this.#topicStateListeners) try {
			listener();
		} catch (err) {
			logger$3.warn("topic state listener threw", {
				topicId: this.#topicId,
				err
			});
		}
	}
	#setupIpcListeners() {
		if (this.#ipcUnsubs.length > 0) return;
		this.#ipcUnsubs.push(ipcApi.on("ai.stream.chunk", (data) => this.#routeChunk(data)), ipcApi.on("ai.stream.done", (data) => {
			if (data.topicId !== this.#topicId) return;
			const topicStateChanged = this.#updateTopicOpen(data.isTopicDone);
			const terminal = {
				...data.attemptId !== void 0 ? { attemptId: data.attemptId } : {},
				isAbort: data.status === "paused",
				isError: false
			};
			this.#applyTerminal(data.executionId, terminal, data.anchorMessageId, data.attemptId, data.isTopicDone ? data.topicAttemptWatermark : void 0);
			if (topicStateChanged) this.#notifyTopicStateChange();
		}), ipcApi.on("ai.stream.error", (data) => {
			if (data.topicId !== this.#topicId) return;
			const topicStateChanged = this.#updateTopicOpen(data.isTopicDone);
			this.#enqueueError(data.error, data.executionId, data.anchorMessageId, data.attemptId, data.isTopicDone ? data.topicAttemptWatermark : void 0);
			const terminal = {
				...data.attemptId !== void 0 ? { attemptId: data.attemptId } : {},
				isAbort: false,
				isError: true
			};
			this.#applyTerminal(data.executionId, terminal, data.anchorMessageId, data.attemptId, data.isTopicDone ? data.topicAttemptWatermark : void 0);
			if (topicStateChanged) this.#notifyTopicStateChange();
		}));
	}
	async #ensureAttached() {
		if (this.#attached || this.#attachInFlight || this.#disposed) return this.#attachInFlight ?? void 0;
		this.#setupIpcListeners();
		const branchesAtAttach = [...this.#branches.values()];
		this.#attachInFlight = (async () => {
			let shouldReattach = false;
			try {
				const res = await ipcApi.request("ai.stream.attach", { topicId: this.#topicId });
				if (this.#disposed) return;
				this.#attached = true;
				switch (res.status) {
					case "attached":
						for (const payload of res.bufferedChunks) this.#routeChunk(payload);
						break;
					case "not-found":
					case "done":
						this.#terminateBranches(branchesAtAttach, {
							isAbort: false,
							isError: false
						});
						break;
					case "paused":
						this.#terminateBranches(branchesAtAttach, {
							isAbort: true,
							isError: false
						});
						break;
					case "error":
						if (res.error) this.#enqueueErrorToBranches({
							type: "data-error",
							data: { ...res.error }
						}, branchesAtAttach);
						this.#terminateBranches(branchesAtAttach, {
							isAbort: false,
							isError: true
						});
						break;
				}
				shouldReattach = res.status !== "attached" && this.hasAnyOpenBranch();
				if (shouldReattach) this.#attached = false;
				if (this.#branches.size === 0 && !this.#disposed && !this.#topicOpen) this.#detach();
			} catch (err) {
				logger$3.error("streamAttach failed", {
					topicId: this.#topicId,
					err
				});
				if (!this.#disposed) {
					this.#terminateBranches(branchesAtAttach, {
						isAbort: false,
						isError: true
					});
					shouldReattach = this.hasAnyOpenBranch();
				}
			} finally {
				this.#attachInFlight = null;
				if (shouldReattach && !this.#disposed) this.#ensureAttached();
			}
		})();
		return this.#attachInFlight;
	}
	#detach() {
		if (!this.#attached) return;
		ipcApi.request("ai.stream.detach", { topicId: this.#topicId }).catch(() => {});
		this.#attached = false;
		this.#attachInFlight = null;
	}
};
var logger$2 = loggerService.withContext("ExecutionStreamOverlayService");
var MAX_ENTRIES = 32;
var MIN_COMMIT_INTERVAL_MS = 100;
var MAX_COMMIT_INTERVAL_MS = 3e3;
var COMMIT_CHARS_PER_MS = 2e3;
function commitIntervalMs(pending) {
	let chars = 0;
	for (const item of pending) for (const part of item.snapshot.parts ?? []) {
		const text = part.text;
		if (typeof text === "string") chars += text.length;
	}
	return Math.min(MAX_COMMIT_INTERVAL_MS, Math.max(MIN_COMMIT_INTERVAL_MS, chars / COMMIT_CHARS_PER_MS));
}
var EMPTY_VIEW = Object.freeze({
	overlay: Object.freeze({}),
	liveAssistants: Object.freeze([])
});
function executionKey(executionId, anchorMessageId, attemptId) {
	return JSON.stringify([
		executionId,
		anchorMessageId ?? null,
		attemptId ?? null
	]);
}
function pickSeed(uiMessages, anchorMessageId, seedFromEmpty = false) {
	if (!anchorMessageId) return void 0;
	if (seedFromEmpty) return {
		id: anchorMessageId,
		role: "assistant",
		parts: []
	};
	const found = uiMessages.find((m) => m.id === anchorMessageId);
	if (!found) return {
		id: anchorMessageId,
		role: "assistant",
		parts: []
	};
	return {
		...found,
		parts: structuredClone(found.parts ?? [])
	};
}
function canReuseSettledPart(previous, next) {
	if (previous.type !== next.type) return false;
	if (previous.type === "text" && next.type === "text") return previous.state !== "streaming" && next.state !== "streaming" && previous.text === next.text;
	if (previous.type === "reasoning" && next.type === "reasoning") return previous.state !== "streaming" && next.state !== "streaming" && previous.text === next.text;
	if (isToolUIPart(previous) && isToolUIPart(next)) {
		const previousTool = previous;
		const nextTool = next;
		if (previousTool.toolCallId !== nextTool.toolCallId || previousTool.state !== nextTool.state) return false;
		if (previousTool.state === "output-available") return previousTool.preliminary !== true && nextTool.preliminary !== true;
		return previousTool.state === "output-error" || previousTool.state === "output-denied" || previousTool.state === "cancelled";
	}
	return previous.type === "file" || previous.type === "source-url" || previous.type === "source-document" || previous.type === "step-start";
}
function shareSettledPartReferences(previous, next) {
	if (!previous || previous.length === 0 || next.length === 0) return next;
	let reusedAny = false;
	let reusedAll = previous.length === next.length;
	const shared = next.map((part, index) => {
		const previousPart = previous[index];
		if (previousPart === part || previousPart && canReuseSettledPart(previousPart, part)) {
			reusedAny = true;
			return previousPart;
		}
		reusedAll = false;
		return part;
	});
	if (reusedAll) return previous;
	return reusedAny ? shared : next;
}
function computeView(snapshots) {
	const overlay = {};
	for (const snapshot of Object.values(snapshots)) if (snapshot?.parts?.length) overlay[snapshot.id] = snapshot.parts;
	return {
		overlay,
		liveAssistants: Object.values(snapshots).filter((s) => s?.role === "assistant")
	};
}
var ExecutionStreamOverlayService = class {
	#entries = /* @__PURE__ */ new Map();
	acquire(topicId) {
		const entry = this.#getOrCreate(topicId);
		entry.refCount += 1;
		entry.lastActiveAt = Date.now();
		this.#flushPending(entry, entry.epoch);
	}
	release(topicId, consumer) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		entry.desired.delete(consumer);
		entry.refCount = Math.max(0, entry.refCount - 1);
		if (entry.refCount === 0) entry.needsRemountReconcile = true;
		this.#maybeDrop(entry);
	}
	syncExecutions(topicId, consumer, executions, getSeedMessages) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		entry.desired.set(consumer, {
			executions,
			getSeedMessages
		});
		const union = /* @__PURE__ */ new Map();
		for (const contribution of entry.desired.values()) for (const { executionId, attemptId, anchorMessageId, seedFromEmpty } of contribution.executions) {
			const key = executionKey(executionId, anchorMessageId, attemptId);
			const existing = union.get(key);
			if (!existing) union.set(key, {
				executionId,
				attemptId,
				anchorMessageId,
				seedFromEmpty,
				seed: contribution
			});
			else if (seedFromEmpty && !existing.seedFromEmpty) union.set(key, {
				...existing,
				seedFromEmpty: true
			});
		}
		for (const key of entry.settledKeys) if (!union.has(key)) entry.settledKeys.delete(key);
		if (entry.needsRemountReconcile) {
			entry.needsRemountReconcile = false;
			const liveExecutionIds = new Set([...union.values()].map((item) => item.executionId));
			let next = entry.snapshots;
			for (const executionId of Object.keys(entry.snapshots)) {
				if (liveExecutionIds.has(executionId)) continue;
				entry.pendingSnapshots.delete(executionId);
				entry.readerVersions.set(executionId, (entry.readerVersions.get(executionId) ?? 0) + 1);
				if (next === entry.snapshots) next = { ...entry.snapshots };
				delete next[executionId];
			}
			this.#commitSnapshots(entry, next);
		}
		for (const [key, handle] of [...entry.readers]) {
			if (union.has(key)) continue;
			handle.cancel();
			handle.unregister();
			entry.readers.delete(key);
		}
		for (const [key, item] of union) {
			if (entry.readers.has(key)) continue;
			if (entry.settledKeys.has(key)) {
				if (!entry.sub.hasOpenBranch(item.executionId, item.anchorMessageId, item.attemptId)) continue;
				entry.settledKeys.delete(key);
			}
			this.#startReader(entry, key, item.executionId, item.attemptId, item.anchorMessageId, item.seedFromEmpty, item.seed.getSeedMessages);
		}
	}
	subscribe(topicId, listener) {
		const entry = this.#entries.get(topicId);
		if (!entry) return () => {};
		entry.listeners.add(listener);
		return () => entry.listeners.delete(listener);
	}
	getView(topicId) {
		return this.#entries.get(topicId)?.view ?? EMPTY_VIEW;
	}
	onFinish(topicId, listener) {
		const entry = this.#entries.get(topicId);
		if (!entry) return () => {};
		entry.finishListeners.add(listener);
		return () => entry.finishListeners.delete(listener);
	}
	disposeOverlay(topicId, messageId) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		const snapshotEntry = Object.entries(entry.snapshots).find(([, snapshot]) => snapshot.id === messageId);
		const pendingEntry = [...entry.pendingSnapshots].find(([, item]) => item.snapshot.id === messageId);
		const executionId = snapshotEntry?.[0] ?? pendingEntry?.[0];
		if (!executionId || this.#liveReaderExecutionIds(entry).has(executionId)) return;
		entry.pendingSnapshots.delete(executionId);
		entry.readerVersions.set(executionId, (entry.readerVersions.get(executionId) ?? 0) + 1);
		if (entry.pendingSnapshots.size === 0) this.#cancelFrame(entry);
		if (snapshotEntry) {
			const next = { ...entry.snapshots };
			delete next[snapshotEntry[0]];
			this.#commitSnapshots(entry, next);
		}
	}
	reset(topicId) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		const liveExecutionIds = this.#liveReaderExecutionIds(entry);
		if (liveExecutionIds.size === 0) {
			this.clear(topicId);
			return;
		}
		let next = entry.snapshots;
		for (const executionId of new Set([...Object.keys(entry.snapshots), ...entry.pendingSnapshots.keys()])) {
			if (liveExecutionIds.has(executionId)) continue;
			entry.pendingSnapshots.delete(executionId);
			entry.readerVersions.set(executionId, (entry.readerVersions.get(executionId) ?? 0) + 1);
			if (executionId in next) {
				if (next === entry.snapshots) next = { ...entry.snapshots };
				delete next[executionId];
			}
		}
		if (entry.pendingSnapshots.size === 0) this.#cancelFrame(entry);
		this.#commitSnapshots(entry, next);
	}
	clear(topicId) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		this.#invalidatePending(entry);
		entry.readerVersions.clear();
		if (Object.keys(entry.snapshots).length > 0) this.#commitSnapshots(entry, {});
	}
	#getOrCreate(topicId) {
		let entry = this.#entries.get(topicId);
		if (entry) return entry;
		this.#evictIfNeeded();
		const sub = new TopicStreamSubscription(topicId);
		if (topicId) sub.listen();
		entry = {
			topicId,
			sub,
			dropped: false,
			refCount: 0,
			desired: /* @__PURE__ */ new Map(),
			snapshots: {},
			view: EMPTY_VIEW,
			pendingSnapshots: /* @__PURE__ */ new Map(),
			readerVersions: /* @__PURE__ */ new Map(),
			readers: /* @__PURE__ */ new Map(),
			settledKeys: /* @__PURE__ */ new Set(),
			liveReaderCount: 0,
			epoch: 0,
			commitTimer: null,
			commitDeadline: null,
			lastCommitAt: 0,
			listeners: /* @__PURE__ */ new Set(),
			finishListeners: /* @__PURE__ */ new Set(),
			lastActiveAt: Date.now(),
			needsRemountReconcile: false
		};
		this.#entries.set(topicId, entry);
		sub.onExecutionTerminal(() => {
			if (this.#entries.get(topicId) === entry) this.#maybeDrop(entry);
		});
		sub.onBranchesRetired((branches) => {
			if (this.#entries.get(topicId) !== entry) return;
			for (const branch of branches) {
				const key = executionKey(branch.executionId, branch.anchorMessageId, branch.attemptId);
				entry.settledKeys.add(key);
				const handle = entry.readers.get(key);
				if (!handle) continue;
				handle.cancel();
				handle.unregister();
				entry.readers.delete(key);
			}
			this.#maybeDrop(entry);
		});
		sub.onTopicStateChange(() => {
			if (this.#entries.get(topicId) === entry) this.#maybeDrop(entry);
		});
		return entry;
	}
	#evictIfNeeded() {
		while (this.#entries.size >= MAX_ENTRIES) {
			let oldest;
			for (const entry of this.#entries.values()) {
				if (entry.refCount > 0) continue;
				if (!oldest || entry.lastActiveAt < oldest.lastActiveAt) oldest = entry;
			}
			if (!oldest) return;
			logger$2.error("evicting stale overlay entry", {
				topicId: oldest.topicId,
				entryCount: this.#entries.size,
				liveReaders: oldest.liveReaderCount,
				idleMs: Date.now() - oldest.lastActiveAt
			});
			for (const handle of oldest.readers.values()) handle.cancel();
			this.#dropEntry(oldest);
		}
	}
	#maybeDrop(entry) {
		if (entry.refCount > 0 || entry.liveReaderCount > 0) return;
		if (entry.sub.isTopicOpen()) return;
		if (entry.sub.hasAnyOpenBranch()) return;
		this.#dropEntry(entry);
	}
	#liveReaderExecutionIds(entry) {
		const ids = /* @__PURE__ */ new Set();
		for (const handle of entry.readers.values()) ids.add(handle.executionId);
		return ids;
	}
	#dropEntry(entry) {
		if (entry.dropped) return;
		entry.dropped = true;
		if (this.#entries.get(entry.topicId) === entry) this.#entries.delete(entry.topicId);
		this.#cancelFrame(entry);
		entry.sub.dispose();
	}
	#startReader(entry, key, executionId, attemptId, anchorMessageId, seedFromEmpty, getSeedMessages) {
		const branch = entry.sub.register(executionId, anchorMessageId, attemptId);
		if (!entry.sub.hasOpenBranch(executionId, anchorMessageId, attemptId)) {
			entry.settledKeys.add(key);
			return;
		}
		const readerEpoch = entry.epoch;
		const readerVersion = (entry.readerVersions.get(executionId) ?? 0) + 1;
		entry.readerVersions.set(executionId, readerVersion);
		entry.pendingSnapshots.delete(executionId);
		if (executionId in entry.snapshots) {
			const next = { ...entry.snapshots };
			delete next[executionId];
			this.#commitSnapshots(entry, next);
		}
		let cancelled = false;
		let readerFailed = false;
		let terminal;
		const offTerminal = entry.sub.onExecutionTerminal((id, t) => {
			if (id !== executionId) return;
			if (t.attemptId !== void 0 && t.attemptId !== attemptId) return;
			if (t.anchorMessageId !== void 0 && t.anchorMessageId !== anchorMessageId) return;
			terminal = t;
		});
		const seed = pickSeed(getSeedMessages(), anchorMessageId, seedFromEmpty);
		const topicId = entry.topicId;
		const handle = {
			executionId,
			attemptId,
			anchorMessageId,
			cancel: () => {
				cancelled = true;
				entry.sub.cancelBranch(executionId, anchorMessageId, attemptId);
			},
			unregister: () => {
				offTerminal();
				entry.sub.unregister(executionId, anchorMessageId, attemptId);
			}
		};
		entry.readers.set(key, handle);
		entry.liveReaderCount += 1;
		(async () => {
			let last;
			try {
				for await (const snapshot of readUIMessageStream({
					stream: branch,
					message: seed,
					terminateOnError: false,
					onError: (err) => {
						if (!cancelled) logger$2.warn("readUIMessageStream error", {
							topicId,
							executionId,
							err
						});
					}
				})) {
					if (cancelled) break;
					const sharedParts = shareSettledPartReferences(last?.parts, snapshot.parts);
					const nextSnapshot = sharedParts === snapshot.parts ? snapshot : {
						...snapshot,
						parts: sharedParts
					};
					last = nextSnapshot;
					this.#queueSnapshot(entry, executionId, nextSnapshot, readerEpoch, readerVersion);
				}
			} catch (err) {
				readerFailed = true;
				logger$2.error("execution reader threw", {
					topicId,
					executionId,
					err
				});
			} finally {
				offTerminal();
				if (entry.readers.get(key) === handle) {
					entry.sub.unregister(executionId, anchorMessageId, attemptId);
					entry.readers.delete(key);
				}
				if (!cancelled) {
					entry.settledKeys.add(key);
					if (entry.refCount === 0) {
						entry.pendingSnapshots.delete(executionId);
						entry.readerVersions.set(executionId, (entry.readerVersions.get(executionId) ?? 0) + 1);
						if (executionId in entry.snapshots) {
							const next = { ...entry.snapshots };
							delete next[executionId];
							this.#commitSnapshots(entry, next);
						}
					} else {
						this.#flushPending(entry, readerEpoch);
						const t = terminal ?? {
							isAbort: false,
							isError: false
						};
						const isError = t.isError || readerFailed;
						const message = last ?? seed;
						if (message || isError) {
							const event = {
								attemptId,
								message: message ?? {
									id: "",
									role: "assistant",
									parts: []
								},
								isAbort: t.isAbort,
								isError
							};
							for (const listener of [...entry.finishListeners]) try {
								listener(executionId, event);
							} catch (err) {
								logger$2.warn("finish listener threw", {
									topicId,
									executionId,
									err
								});
							}
						}
					}
				}
				entry.liveReaderCount -= 1;
				this.#maybeDrop(entry);
			}
		})();
	}
	#queueSnapshot(entry, executionId, snapshot, epoch, readerVersion) {
		if (epoch !== entry.epoch || entry.readerVersions.get(executionId) !== readerVersion) return;
		entry.pendingSnapshots.set(executionId, {
			epoch,
			readerVersion,
			snapshot
		});
		const deadline = entry.lastCommitAt + commitIntervalMs(entry.pendingSnapshots.values());
		if (entry.commitTimer !== null) {
			if (entry.commitDeadline !== null && deadline <= entry.commitDeadline) return;
			this.#cancelFrame(entry);
		}
		entry.commitDeadline = deadline;
		const delay = Math.max(0, deadline - performance.now());
		entry.commitTimer = window.setTimeout(() => {
			entry.commitTimer = null;
			entry.commitDeadline = null;
			this.#flushPending(entry, epoch);
		}, delay);
	}
	#flushPending(entry, expectedEpoch) {
		if (expectedEpoch !== entry.epoch) return;
		this.#cancelFrame(entry);
		const pending = entry.pendingSnapshots;
		if (pending.size === 0) return;
		entry.pendingSnapshots = /* @__PURE__ */ new Map();
		let next = entry.snapshots;
		for (const [executionId, item] of pending) {
			if (item.epoch !== entry.epoch) continue;
			if (entry.readerVersions.get(executionId) !== item.readerVersion) continue;
			if (entry.snapshots[executionId] === item.snapshot) continue;
			if (next === entry.snapshots) next = { ...entry.snapshots };
			next[executionId] = item.snapshot;
		}
		this.#commitSnapshots(entry, next);
	}
	#commitSnapshots(entry, next) {
		if (next === entry.snapshots) return;
		entry.lastCommitAt = performance.now();
		entry.snapshots = next;
		entry.view = computeView(next);
		entry.lastActiveAt = Date.now();
		for (const listener of [...entry.listeners]) try {
			listener();
		} catch (err) {
			logger$2.warn("overlay listener threw", {
				topicId: entry.topicId,
				err
			});
		}
	}
	#invalidatePending(entry) {
		entry.epoch += 1;
		entry.pendingSnapshots.clear();
		this.#cancelFrame(entry);
	}
	#cancelFrame(entry) {
		if (entry.commitTimer !== null) window.clearTimeout(entry.commitTimer);
		entry.commitTimer = null;
		entry.commitDeadline = null;
	}
};
const executionStreamOverlayService = new ExecutionStreamOverlayService();
function getStreamBlockedMessage(response) {
	return response.reason === "paused" ? resolver_default.t("restore.messages_paused") : response.message;
}
var logger$1 = loggerService.withContext("StreamDispatchService");
var StreamDispatchService = class {
	listeners = /* @__PURE__ */ new Map();
	notify(result) {
		const subs = this.listeners.get(result.topicId);
		if (!subs) return;
		for (const cb of [...subs]) try {
			cb(result);
		} catch (err) {
			logger$1.warn("stream dispatch listener threw", {
				topicId: result.topicId,
				err
			});
		}
	}
	dispatch(topicId, request) {
		ipcApi.request("ai.stream.open", request).then((ack) => {
			if (ack.mode === "blocked") toast.error(getStreamBlockedMessage(ack));
			this.notify({
				ok: true,
				topicId,
				ack
			});
		}).catch((error) => {
			const err = error instanceof Error ? error : new Error(String(error));
			logger$1.error("streamOpen IPC failed", err);
			this.notify({
				ok: false,
				topicId,
				error: err
			});
		});
	}
	subscribe(topicId, listener) {
		let subs = this.listeners.get(topicId);
		if (!subs) {
			subs = /* @__PURE__ */ new Set();
			this.listeners.set(topicId, subs);
		}
		subs.add(listener);
		return () => {
			subs.delete(listener);
			if (subs.size === 0) this.listeners.delete(topicId);
		};
	}
};
const streamDispatchService = new StreamDispatchService();
var logger = loggerService.withContext("IpcChatTransport");
function isPerExecutionOnly(data) {
	return !!data.executionId && !data.isTopicDone;
}
var IpcChatTransport = class {
	#defaultBody;
	constructor(defaultBody = {}) {
		this.#defaultBody = defaultBody;
	}
	sendMessages(options) {
		const { chatId: topicId, messages, abortSignal, body, trigger } = options;
		const mergedBody = {
			...this.#defaultBody,
			...body
		};
		const stream = this.buildListenerStream(topicId, void 0, abortSignal);
		const lastMessage = messages.at(-1);
		const ipcRequest = trigger === "regenerate-message" ? {
			trigger: "regenerate-message",
			topicId,
			parentAnchorId: mergedBody.parentAnchorId ?? "",
			mentionedModelIds: mergedBody.mentionedModels,
			reasoningEffort: mergedBody.reasoningEffort,
			...mergedBody.fastMode ? { fastMode: true } : {}
		} : {
			trigger: "submit-message",
			topicId,
			parentAnchorId: mergedBody.parentAnchorId,
			userMessageParts: mergedBody.userMessageParts ?? lastMessage?.parts ?? [],
			mentionedModelIds: mergedBody.mentionedModels,
			reasoningEffort: mergedBody.reasoningEffort,
			...mergedBody.fastMode ? { fastMode: true } : {}
		};
		streamDispatchService.dispatch(topicId, ipcRequest);
		return Promise.resolve(stream);
	}
	async reconnectToStream(options) {
		const topicId = options.chatId;
		logger.info("reconnectToStream called", { topicId });
		const result = await ipcApi.request("ai.stream.attach", { topicId });
		logger.info("reconnectToStream result", {
			topicId,
			status: result.status
		});
		if (result.status === "not-found") return null;
		if (result.status === "done" || result.status === "paused") return new ReadableStream({ start: (c) => c.close() });
		if (result.status === "error") return new ReadableStream({ start: (c) => c.error(new Error(result.error?.message ?? "Stream error")) });
		logger.info("Reconnected to stream", {
			topicId,
			bufferedChunks: result.bufferedChunks.length
		});
		return this.buildListenerStream(topicId, result.bufferedChunks);
	}
	buildListenerStream(topicId, initialChunks, abortSignal, executionId) {
		const unsubscribers = [];
		let isCleaned = false;
		let isStreamClosed = false;
		const cleanup = () => {
			if (isCleaned) return;
			isCleaned = true;
			for (const unsub of unsubscribers) unsub();
		};
		return new ReadableStream({
			start(controller) {
				if (initialChunks) {
					for (const data of initialChunks) if (matchesStream(data)) controller.enqueue(data.chunk);
				}
				let pendingChunks = [];
				let rafHandle = null;
				const flushPending = () => {
					rafHandle = null;
					if (pendingChunks.length === 0 || isStreamClosed) {
						pendingChunks = [];
						return;
					}
					const batch = pendingChunks;
					pendingChunks = [];
					for (const chunk of batch) controller.enqueue(chunk);
				};
				const schedulePending = (chunk) => {
					pendingChunks.push(chunk);
					if (rafHandle === null) rafHandle = requestAnimationFrame(flushPending);
				};
				const cancelPending = () => {
					if (rafHandle !== null) {
						cancelAnimationFrame(rafHandle);
						rafHandle = null;
					}
					pendingChunks = [];
				};
				unsubscribers.push(cancelPending);
				const closeStream = () => {
					if (isStreamClosed) return;
					isStreamClosed = true;
					if (rafHandle !== null) cancelAnimationFrame(rafHandle);
					rafHandle = null;
					for (const chunk of pendingChunks) controller.enqueue(chunk);
					pendingChunks = [];
					cleanup();
					controller.close();
				};
				const errorStream = (err) => {
					if (isStreamClosed) return;
					isStreamClosed = true;
					cancelPending();
					cleanup();
					controller.error(err);
				};
				function matchesStream(data) {
					if (data.topicId !== topicId) return false;
					if (executionId) return data.executionId === executionId || !!data.isTopicDone;
					return !data.executionId || !!data.isTopicDone;
				}
				unsubscribers.push(streamDispatchService.subscribe(topicId, (result) => {
					if (result.ok) {
						if (result.ack.mode === "blocked") closeStream();
						return;
					}
					errorStream(result.error);
				}), ipcApi.on("ai.stream.chunk", (data) => {
					if (data.topicId !== topicId || isStreamClosed) return;
					if (executionId && data.executionId !== executionId) return;
					if (!executionId && data.executionId) return;
					if (isStreamClosed || !matchesStream(data)) return;
					schedulePending(data.chunk);
				}));
				unsubscribers.push(ipcApi.on("ai.stream.done", (data) => {
					if (!matchesStream(data)) return;
					if (executionId && data.executionId !== executionId) return;
					if (!executionId && isPerExecutionOnly(data)) return;
					closeStream();
				}));
				unsubscribers.push(ipcApi.on("ai.stream.error", (data) => {
					if (!matchesStream(data)) return;
					errorStream(new Error(data.error.message ?? "Unknown stream error"));
				}));
				if (abortSignal) {
					if (abortSignal.aborted) {
						ipcApi.request("ai.stream.abort", { topicId }).catch((e) => logger.warn("streamAbort failed", {
							topicId,
							e
						}));
						closeStream();
						return;
					}
					const onAbort = () => {
						logger.info("Stream abort requested", { topicId });
						ipcApi.request("ai.stream.abort", { topicId }).catch((e) => logger.warn("streamAbort failed", {
							topicId,
							e
						}));
						closeStream();
					};
					abortSignal.addEventListener("abort", onAbort, { once: true });
					unsubscribers.push(() => abortSignal.removeEventListener("abort", onAbort));
				}
			},
			cancel() {
				if (!isStreamClosed) {
					isStreamClosed = true;
					ipcApi.request("ai.stream.detach", { topicId }).catch((e) => logger.warn("streamDetach failed", {
						topicId,
						e
					}));
					cleanup();
				}
			}
		});
	}
};
const ipcChatTransport = new IpcChatTransport();
function useExecutionOverlay(topicId, activeExecutions, uiMessages, options = {}) {
	const consumer = (0, import_react.useRef)({}).current;
	const uiMessagesRef = (0, import_react.useRef)(uiMessages);
	uiMessagesRef.current = uiMessages;
	const onFinishRef = (0, import_react.useRef)(options.onFinish);
	onFinishRef.current = options.onFinish;
	const topicIdRef = (0, import_react.useRef)(topicId);
	topicIdRef.current = topicId;
	(0, import_react.useEffect)(() => {
		executionStreamOverlayService.acquire(topicId);
		const offFinish = executionStreamOverlayService.onFinish(topicId, (executionId, event) => onFinishRef.current?.(executionId, event));
		return () => {
			offFinish();
			executionStreamOverlayService.release(topicId, consumer);
		};
	}, [consumer, topicId]);
	const getSeedMessages = (0, import_react.useCallback)(() => uiMessagesRef.current, []);
	(0, import_react.useEffect)(() => {
		executionStreamOverlayService.syncExecutions(topicId, consumer, activeExecutions, getSeedMessages);
	}, [
		activeExecutions,
		consumer,
		getSeedMessages,
		topicId
	]);
	const view = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((listener) => executionStreamOverlayService.subscribe(topicId, listener), [topicId]), (0, import_react.useCallback)(() => executionStreamOverlayService.getView(topicId), [topicId]));
	const api = (0, import_react.useRef)(void 0);
	if (!api.current) api.current = {
		overlay: view.overlay,
		liveAssistants: view.liveAssistants,
		disposeOverlay: (messageId) => executionStreamOverlayService.disposeOverlay(topicIdRef.current, messageId),
		reset: () => executionStreamOverlayService.reset(topicIdRef.current),
		clear: () => executionStreamOverlayService.clear(topicIdRef.current)
	};
	api.current.overlay = view.overlay;
	api.current.liveAssistants = view.liveAssistants;
	return api.current;
}
function getTextFromParts(parts) {
	return parts.filter((p) => p.type === "text").map((p) => p.text).filter((t) => t.trim().length > 0).join("\n\n");
}
function hasTextParts(parts) {
	return parts.some((p) => p.type === "text" && p.text.trim().length > 0);
}
function hasTranslationParts(parts) {
	return parts.some((p) => p.type === "data-translation");
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasUnroundtrippableTextMetadata(part, textPartCount) {
	const providerMetadata = part.providerMetadata;
	if (providerMetadata === void 0) return false;
	if (!isRecord(providerMetadata)) return true;
	if (Object.keys(providerMetadata).length === 0) return false;
	if (Object.keys(providerMetadata).some((provider) => provider !== "cherry")) return true;
	const cherry = providerMetadata.cherry;
	if (!isRecord(cherry)) return cherry !== void 0;
	for (const [key, value] of Object.entries(cherry)) {
		if (key === "references") {
			if (!Array.isArray(value) || value.length > 0) return true;
			continue;
		}
		if (key === "composer") {
			if (value !== void 0 && (textPartCount !== 1 || !readCherryMeta(part)?.composer)) return true;
			continue;
		}
		return true;
	}
	return false;
}
function canEditAssistantMessageParts(parts) {
	let hasText = false;
	let hasEditablePart = false;
	let hasFile = false;
	let editableRunEnded = false;
	const textPartCount = parts.reduce((count, part) => count + (part.type === "text" ? 1 : 0), 0);
	for (const part of parts) {
		if (part.type === "data-translation") continue;
		if (part.type === "text") {
			if (editableRunEnded || hasFile || hasUnroundtrippableTextMetadata(part, textPartCount)) return false;
			hasText ||= part.text.trim().length > 0;
			hasEditablePart = true;
			continue;
		}
		if (part.type === "file") {
			if (editableRunEnded) return false;
			hasEditablePart = true;
			hasFile = true;
			continue;
		}
		if (hasEditablePart) editableRunEnded = true;
	}
	return hasText;
}
function getTranslationFromParts(parts) {
	return parts.filter((p) => p.type === "data-translation").map((p) => p.data);
}
export { hasTranslationParts as a, getStreamBlockedMessage as c, hasTextParts as i, Chat as l, getTextFromParts as n, useExecutionOverlay as o, getTranslationFromParts as r, ipcChatTransport as s, canEditAssistantMessageParts as t, useChat as u };
