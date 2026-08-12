const anyMap = /* @__PURE__ */ new WeakMap();
const eventsMap = /* @__PURE__ */ new WeakMap();
const producersMap = /* @__PURE__ */ new WeakMap();
var anyProducer = Symbol("anyProducer");
var resolvedPromise = Promise.resolve();
var listenerAdded = Symbol("listenerAdded");
var listenerRemoved = Symbol("listenerRemoved");
var canEmitMetaEvents = false;
var isGlobalDebugEnabled = false;
var isEventKeyType = (key) => typeof key === "string" || typeof key === "symbol" || typeof key === "number";
function assertEventName(eventName) {
	if (!isEventKeyType(eventName)) throw new TypeError("`eventName` must be a string, symbol, or number");
}
function assertListener(listener) {
	if (typeof listener !== "function") throw new TypeError("listener must be a function");
}
function getListeners(instance, eventName) {
	const events = eventsMap.get(instance);
	if (!events.has(eventName)) return;
	return events.get(eventName);
}
function getEventProducers(instance, eventName) {
	const key = isEventKeyType(eventName) ? eventName : anyProducer;
	const producers = producersMap.get(instance);
	if (!producers.has(key)) return;
	return producers.get(key);
}
function enqueueProducers(instance, eventName, eventData) {
	const producers = producersMap.get(instance);
	if (producers.has(eventName)) for (const producer of producers.get(eventName)) producer.enqueue(eventData);
	if (producers.has(anyProducer)) {
		const item = Promise.all([eventName, eventData]);
		for (const producer of producers.get(anyProducer)) producer.enqueue(item);
	}
}
function iterator(instance, eventNames) {
	eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
	let isFinished = false;
	let flush = () => {};
	let queue = [];
	const producer = {
		enqueue(item) {
			queue.push(item);
			flush();
		},
		finish() {
			isFinished = true;
			flush();
		}
	};
	for (const eventName of eventNames) {
		let set = getEventProducers(instance, eventName);
		if (!set) {
			set = /* @__PURE__ */ new Set();
			producersMap.get(instance).set(eventName, set);
		}
		set.add(producer);
	}
	return {
		async next() {
			if (!queue) return { done: true };
			if (queue.length === 0) {
				if (isFinished) {
					queue = void 0;
					return this.next();
				}
				await new Promise((resolve) => {
					flush = resolve;
				});
				return this.next();
			}
			return {
				done: false,
				value: await queue.shift()
			};
		},
		async return(value) {
			queue = void 0;
			for (const eventName of eventNames) {
				const set = getEventProducers(instance, eventName);
				if (set) {
					set.delete(producer);
					if (set.size === 0) producersMap.get(instance).delete(eventName);
				}
			}
			flush();
			return arguments.length > 0 ? {
				done: true,
				value: await value
			} : { done: true };
		},
		[Symbol.asyncIterator]() {
			return this;
		}
	};
}
function defaultMethodNamesOrAssert(methodNames) {
	if (methodNames === void 0) return allEmitteryMethods;
	if (!Array.isArray(methodNames)) throw new TypeError("`methodNames` must be an array of strings");
	for (const methodName of methodNames) if (!allEmitteryMethods.includes(methodName)) {
		if (typeof methodName !== "string") throw new TypeError("`methodNames` element must be a string");
		throw new Error(`${methodName} is not Emittery method`);
	}
	return methodNames;
}
var isMetaEvent = (eventName) => eventName === listenerAdded || eventName === listenerRemoved;
function emitMetaEvent(emitter, eventName, eventData) {
	if (!isMetaEvent(eventName)) return;
	try {
		canEmitMetaEvents = true;
		emitter.emit(eventName, eventData);
	} finally {
		canEmitMetaEvents = false;
	}
}
var Emittery = class Emittery {
	static mixin(emitteryPropertyName, methodNames) {
		methodNames = defaultMethodNamesOrAssert(methodNames);
		return (target) => {
			if (typeof target !== "function") throw new TypeError("`target` must be function");
			for (const methodName of methodNames) if (target.prototype[methodName] !== void 0) throw new Error(`The property \`${methodName}\` already exists on \`target\``);
			function getEmitteryProperty() {
				Object.defineProperty(this, emitteryPropertyName, {
					enumerable: false,
					value: new Emittery()
				});
				return this[emitteryPropertyName];
			}
			Object.defineProperty(target.prototype, emitteryPropertyName, {
				enumerable: false,
				get: getEmitteryProperty
			});
			const emitteryMethodCaller = (methodName) => function(...args) {
				return this[emitteryPropertyName][methodName](...args);
			};
			for (const methodName of methodNames) Object.defineProperty(target.prototype, methodName, {
				enumerable: false,
				value: emitteryMethodCaller(methodName)
			});
			return target;
		};
	}
	static get isDebugEnabled() {
		const { env } = globalThis.process ?? { env: {} };
		return env.DEBUG === "emittery" || env.DEBUG === "*" || isGlobalDebugEnabled;
	}
	static set isDebugEnabled(newValue) {
		isGlobalDebugEnabled = newValue;
	}
	constructor(options = {}) {
		anyMap.set(this, /* @__PURE__ */ new Set());
		eventsMap.set(this, /* @__PURE__ */ new Map());
		producersMap.set(this, /* @__PURE__ */ new Map());
		producersMap.get(this).set(anyProducer, /* @__PURE__ */ new Set());
		this.debug = options.debug ?? {};
		if (this.debug.enabled === void 0) this.debug.enabled = false;
		if (!this.debug.logger) this.debug.logger = (type, debugName, eventName, eventData) => {
			try {
				eventData = JSON.stringify(eventData);
			} catch {
				eventData = `Object with the following keys failed to stringify: ${Object.keys(eventData).join(",")}`;
			}
			if (typeof eventName === "symbol" || typeof eventName === "number") eventName = eventName.toString();
			const currentTime = /* @__PURE__ */ new Date();
			const logTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}.${currentTime.getMilliseconds()}`;
			console.log(`[${logTime}][emittery:${type}][${debugName}] Event Name: ${eventName}\n\tdata: ${eventData}`);
		};
	}
	logIfDebugEnabled(type, eventName, eventData) {
		if (Emittery.isDebugEnabled || this.debug.enabled) this.debug.logger(type, this.debug.name, eventName, eventData);
	}
	on(eventNames, listener, { signal } = {}) {
		assertListener(listener);
		eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
		for (const eventName of eventNames) {
			assertEventName(eventName);
			let set = getListeners(this, eventName);
			if (!set) {
				set = /* @__PURE__ */ new Set();
				eventsMap.get(this).set(eventName, set);
			}
			set.add(listener);
			this.logIfDebugEnabled("subscribe", eventName, void 0);
			if (!isMetaEvent(eventName)) emitMetaEvent(this, listenerAdded, {
				eventName,
				listener
			});
		}
		const off = () => {
			this.off(eventNames, listener);
			signal?.removeEventListener("abort", off);
		};
		signal?.addEventListener("abort", off, { once: true });
		if (signal?.aborted) off();
		return off;
	}
	off(eventNames, listener) {
		assertListener(listener);
		eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
		for (const eventName of eventNames) {
			assertEventName(eventName);
			const set = getListeners(this, eventName);
			if (set) {
				set.delete(listener);
				if (set.size === 0) eventsMap.get(this).delete(eventName);
			}
			this.logIfDebugEnabled("unsubscribe", eventName, void 0);
			if (!isMetaEvent(eventName)) emitMetaEvent(this, listenerRemoved, {
				eventName,
				listener
			});
		}
	}
	once(eventNames, predicate) {
		if (predicate !== void 0 && typeof predicate !== "function") throw new TypeError("predicate must be a function");
		let off_;
		const promise = new Promise((resolve) => {
			off_ = this.on(eventNames, (data) => {
				if (predicate && !predicate(data)) return;
				off_();
				resolve(data);
			});
		});
		promise.off = off_;
		return promise;
	}
	events(eventNames) {
		eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
		for (const eventName of eventNames) assertEventName(eventName);
		return iterator(this, eventNames);
	}
	async emit(eventName, eventData) {
		assertEventName(eventName);
		if (isMetaEvent(eventName) && !canEmitMetaEvents) throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
		this.logIfDebugEnabled("emit", eventName, eventData);
		enqueueProducers(this, eventName, eventData);
		const listeners = getListeners(this, eventName) ?? /* @__PURE__ */ new Set();
		const anyListeners = anyMap.get(this);
		const staticListeners = [...listeners];
		const staticAnyListeners = isMetaEvent(eventName) ? [] : [...anyListeners];
		await resolvedPromise;
		await Promise.all([...staticListeners.map(async (listener) => {
			if (listeners.has(listener)) return listener(eventData);
		}), ...staticAnyListeners.map(async (listener) => {
			if (anyListeners.has(listener)) return listener(eventName, eventData);
		})]);
	}
	async emitSerial(eventName, eventData) {
		assertEventName(eventName);
		if (isMetaEvent(eventName) && !canEmitMetaEvents) throw new TypeError("`eventName` cannot be meta event `listenerAdded` or `listenerRemoved`");
		this.logIfDebugEnabled("emitSerial", eventName, eventData);
		const listeners = getListeners(this, eventName) ?? /* @__PURE__ */ new Set();
		const anyListeners = anyMap.get(this);
		const staticListeners = [...listeners];
		const staticAnyListeners = [...anyListeners];
		await resolvedPromise;
		for (const listener of staticListeners) if (listeners.has(listener)) await listener(eventData);
		for (const listener of staticAnyListeners) if (anyListeners.has(listener)) await listener(eventName, eventData);
	}
	onAny(listener, { signal } = {}) {
		assertListener(listener);
		this.logIfDebugEnabled("subscribeAny", void 0, void 0);
		anyMap.get(this).add(listener);
		emitMetaEvent(this, listenerAdded, { listener });
		const offAny = () => {
			this.offAny(listener);
			signal?.removeEventListener("abort", offAny);
		};
		signal?.addEventListener("abort", offAny, { once: true });
		if (signal?.aborted) offAny();
		return offAny;
	}
	anyEvent() {
		return iterator(this);
	}
	offAny(listener) {
		assertListener(listener);
		this.logIfDebugEnabled("unsubscribeAny", void 0, void 0);
		emitMetaEvent(this, listenerRemoved, { listener });
		anyMap.get(this).delete(listener);
	}
	clearListeners(eventNames) {
		eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
		for (const eventName of eventNames) {
			this.logIfDebugEnabled("clear", eventName, void 0);
			if (isEventKeyType(eventName)) {
				const set = getListeners(this, eventName);
				if (set) set.clear();
				const producers = getEventProducers(this, eventName);
				if (producers) {
					for (const producer of producers) producer.finish();
					producers.clear();
				}
			} else {
				anyMap.get(this).clear();
				for (const [eventName$1, listeners] of eventsMap.get(this).entries()) {
					listeners.clear();
					eventsMap.get(this).delete(eventName$1);
				}
				for (const [eventName$1, producers] of producersMap.get(this).entries()) {
					for (const producer of producers) producer.finish();
					producers.clear();
					producersMap.get(this).delete(eventName$1);
				}
			}
		}
	}
	listenerCount(eventNames) {
		eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
		let count = 0;
		for (const eventName of eventNames) {
			if (isEventKeyType(eventName)) {
				count += anyMap.get(this).size + (getListeners(this, eventName)?.size ?? 0) + (getEventProducers(this, eventName)?.size ?? 0) + (getEventProducers(this)?.size ?? 0);
				continue;
			}
			if (eventName !== void 0) assertEventName(eventName);
			count += anyMap.get(this).size;
			for (const value of eventsMap.get(this).values()) count += value.size;
			for (const value of producersMap.get(this).values()) count += value.size;
		}
		return count;
	}
	bindMethods(target, methodNames) {
		if (typeof target !== "object" || target === null) throw new TypeError("`target` must be an object");
		methodNames = defaultMethodNamesOrAssert(methodNames);
		for (const methodName of methodNames) {
			if (target[methodName] !== void 0) throw new Error(`The property \`${methodName}\` already exists on \`target\``);
			Object.defineProperty(target, methodName, {
				enumerable: false,
				value: this[methodName].bind(this)
			});
		}
	}
};
var allEmitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== "constructor");
Object.defineProperty(Emittery, "listenerAdded", {
	value: listenerAdded,
	writable: false,
	enumerable: true,
	configurable: false
});
Object.defineProperty(Emittery, "listenerRemoved", {
	value: listenerRemoved,
	writable: false,
	enumerable: true,
	configurable: false
});
const EventEmitter = new Emittery();
const EVENT_NAMES = {
	SEND_MESSAGE: "SEND_MESSAGE",
	CLEAR_MESSAGES: "CLEAR_MESSAGES",
	EDIT_MESSAGE: "EDIT_MESSAGE",
	CHAT_COMPLETION_PAUSED: "CHAT_COMPLETION_PAUSED",
	SHOW_ASSISTANTS: "SHOW_ASSISTANTS",
	SWITCH_TOPIC_SIDEBAR: "SWITCH_TOPIC_SIDEBAR",
	COPY_TOPIC_IMAGE: "COPY_TOPIC_IMAGE",
	EXPORT_TOPIC_IMAGE: "EXPORT_TOPIC_IMAGE",
	LOCATE_MESSAGE: "LOCATE_MESSAGE",
	LOCATE_NOTE_LINE: "LOCATE_NOTE_LINE",
	CHANGE_TOPIC: "CHANGE_TOPIC",
	FOCUS_CHAT_COMPOSER: "FOCUS_CHAT_COMPOSER",
	GLOBAL_SEARCH_SELECT_TOPIC: "GLOBAL_SEARCH_SELECT_TOPIC",
	GLOBAL_SEARCH_SELECT_TOPIC_MESSAGE: "GLOBAL_SEARCH_SELECT_TOPIC_MESSAGE",
	GLOBAL_SEARCH_SELECT_AGENT_SESSION: "GLOBAL_SEARCH_SELECT_AGENT_SESSION",
	GLOBAL_SEARCH_SELECT_AGENT_SESSION_MESSAGE: "GLOBAL_SEARCH_SELECT_AGENT_SESSION_MESSAGE",
	GLOBAL_SEARCH_SELECT_KNOWLEDGE_BASE: "GLOBAL_SEARCH_SELECT_KNOWLEDGE_BASE",
	REVEAL_ACTIVE_RESOURCE_LIST: "REVEAL_ACTIVE_RESOURCE_LIST",
	OPEN_RESOURCE_EDIT_DIALOG: "OPEN_RESOURCE_EDIT_DIALOG"
};
export { EventEmitter as n, EVENT_NAMES as t };
