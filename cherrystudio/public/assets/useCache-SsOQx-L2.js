import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as isEqual } from "./isEqual-DO7BtJs5.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as require_with_selector } from "./with-selector-BMhODuKS.js";
function isPlainObject(object) {
	if (typeof object !== "object") return false;
	if (object == null) return false;
	if (Object.getPrototypeOf(object) === null) return true;
	if (Object.prototype.toString.call(object) !== "[object Object]") {
		const tag = object[Symbol.toStringTag];
		if (tag == null) return false;
		if (!Object.getOwnPropertyDescriptor(object, Symbol.toStringTag)?.writable) return false;
		return object.toString() === `[object ${tag}]`;
	}
	let proto = object;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(object) === proto;
}
const DefaultUseCache = {
	"app.dist.update_state": {
		info: null,
		checking: false,
		downloading: false,
		downloaded: false,
		downloadProgress: 0,
		available: false,
		ignore: false,
		manualCheck: false
	},
	"app.path.resources": "",
	"chat.multi_select_mode": false,
	"chat.selected_message_ids": [],
	"chat.web_search.searching": false,
	"chat.scroll_anchor.${topicId}": null,
	"knowledge.recall.search_queries": {},
	"notes.active_file_path": void 0,
	"mini_app.opened_keep_alive": [],
	"mini_app.current_id": "",
	"mini_app.show": false,
	"mini_app.opened_oneoff": null,
	"mini_app.detected_region": null,
	"topic.renaming": [],
	"topic.newly_renamed": [],
	"agent.session.waiting_id_map": {},
	"translate.input": "",
	"translate.output": "",
	"translate.detecting": false,
	"translate.translating": {
		isTranslating: false,
		abortKey: null
	},
	"painting.generation.${paintingId}": null,
	"scroll.position.${topicId}": 0,
	"entity.cache.${type}_${id}": {
		loaded: false,
		data: null
	},
	"message.streaming.task.${messageId}": null,
	"message.streaming.topic_tasks.${topicId}": [],
	"message.streaming.content.${messageId}": null,
	"message.streaming.block.${blockId}": null,
	"message.streaming.siblings_counter.${topicId}": 0,
	"message.streaming.chat_session.${topicId}": null,
	"message.ui.${messageId}": {}
};
const DefaultSharedCache = {
	"chat.web_search.active_searches": {},
	"mcp.tools.${serverId}": [],
	"mcp.status.${serverId}": {
		state: "disabled",
		lastCheckedAt: 0
	},
	"agent.model_switch_confirmation.skipped": false,
	"agent.session.compaction.${sessionId}": null,
	"agent.session.api_retry.${sessionId}": null,
	"agent.session.context_usage.${sessionId}": null,
	"agent.session.slash_commands.${sessionId}": null,
	"agent.session.background_tasks.${sessionId}": [],
	"agent.session.task_events.${sessionId}": {},
	"agent.session.flow_parts.${sessionId}.${messageId}": [],
	"topic.stream.statuses.${topicId}": null,
	"topic.stream.last_seen_completion.${topicId}": null,
	"feature.openclaw.gateway_status": "stopped",
	"feature.api_gateway.running": false,
	"feature.binary.latest_versions": {},
	"web_search.provider.last_used_key.${providerId}": "",
	"ocr.provider.last_used_key.${providerId}": "",
	"jobs.state.${jobId}": null,
	"jobs.progress.${jobId}": { progress: 0 },
	"knowledge.item.embedding_progress.${itemId}": null,
	"mini_app.transient_descriptor.${appId}": null,
	"knowledge.item.directory_copy_progress.${itemId}": null
};
const DefaultRendererPersistCache = {
	"ui.tab.pinned_tabs": [],
	"ui.tab.normal_tabs": [],
	"ui.tab.active_tab_id": "",
	"ui.global_search.recent_items": [],
	"ui.sidebar.docked_tabs": [],
	"ui.sidebar.width": 50,
	"ui.chat.sidebar.width": 275,
	"ui.chat.artifact_pane.width": 460,
	"ui.composer.input_history": [],
	"ui.chat.last_used_assistant_id": null,
	"ui.chat.last_used_topic_id": null,
	"ui.chat.right_pane_open_override": null,
	"ui.topic.expansion.time": [],
	"ui.topic.expansion.assistant": null,
	"ui.agent.last_used_session_id": null,
	"ui.agent.last_used_agent_id": null,
	"ui.agent.last_used_workspace_id": null,
	"ui.agent.right_pane_open_override": null,
	"ui.agent.session.expansion.time": [],
	"ui.agent.session.expansion.agent": null,
	"ui.agent.session.expansion.workdir": null,
	"settings.provider.last_selected_provider_id": null,
	"feature.mcp.provider_available_servers": {},
	"agent.open_external_app.last_used_target": null,
	"ui.emoji.recently_used": []
};
var STORAGE_PERSIST_KEY = "cs_cache_persist";
var logger$1 = loggerService.withContext("CacheService");
var CacheService = class {
	memoryCache = /* @__PURE__ */ new Map();
	sharedCache = /* @__PURE__ */ new Map();
	persistCache = /* @__PURE__ */ new Map();
	activeHookCounts = /* @__PURE__ */ new Map();
	subscribers = /* @__PURE__ */ new Map();
	persistSaveTimer;
	persistDirty = false;
	PERSIST_SAVE_DEBOUNCE_MS = 350;
	sharedCacheReady = false;
	sharedCacheReadyCallbacks = [];
	constructor() {
		this.initialize();
	}
	initialize() {
		this.loadPersistCache();
		this.setupIpcListeners();
		this.setupWindowUnloadHandler();
		this.syncSharedCacheFromMain();
		logger$1.debug("CacheService initialized");
	}
	get(key) {
		return this.getInternal(key);
	}
	getCasual(key) {
		return this.getInternal(key);
	}
	getInternal(key) {
		const entry = this.memoryCache.get(key);
		if (entry === void 0) return;
		if (entry.expireAt && Date.now() > entry.expireAt) {
			this.memoryCache.delete(key);
			this.notifySubscribers(key);
			return;
		}
		return entry.value;
	}
	set(key, value, ttl) {
		this.setInternal(key, value, ttl);
	}
	setCasual(key, value, ttl) {
		this.setInternal(key, value, ttl);
	}
	setInternal(key, value, ttl) {
		const existingEntry = this.memoryCache.get(key);
		if (existingEntry && isEqual(existingEntry.value, value)) {
			const newExpireAt = ttl ? Date.now() + ttl : void 0;
			if (!Object.is(existingEntry.expireAt, newExpireAt)) {
				existingEntry.expireAt = newExpireAt;
				logger$1.verbose(`Updated TTL for memory cache key "${key}"`);
			} else logger$1.verbose(`Skipped memory cache update for key "${key}" - value and TTL unchanged`);
			return;
		}
		const entry = {
			value,
			expireAt: ttl ? Date.now() + ttl : void 0
		};
		this.memoryCache.set(key, entry);
		this.notifySubscribers(key);
		logger$1.verbose(`Updated memory cache for key "${key}"`);
	}
	has(key) {
		return this.hasInternal(key);
	}
	hasCasual(key) {
		return this.hasInternal(key);
	}
	hasInternal(key) {
		const entry = this.memoryCache.get(key);
		if (entry === void 0) return false;
		if (entry.expireAt && Date.now() > entry.expireAt) {
			this.memoryCache.delete(key);
			this.notifySubscribers(key);
			return false;
		}
		return true;
	}
	delete(key) {
		return this.deleteInternal(key);
	}
	deleteCasual(key) {
		return this.deleteInternal(key);
	}
	deleteInternal(key) {
		if (this.activeHookCounts.get(key)) {
			logger$1.error(`Cannot delete key "${key}" as it's being used by useCache hook`);
			return false;
		}
		if (!this.memoryCache.has(key)) {
			logger$1.verbose(`Skipped memory cache delete for key "${key}" - not exists`);
			return true;
		}
		this.memoryCache.delete(key);
		this.notifySubscribers(key);
		logger$1.verbose(`Deleted memory cache key "${key}"`);
		return true;
	}
	hasTTL(key) {
		return this.memoryCache.get(key)?.expireAt !== void 0;
	}
	hasTTLCasual(key) {
		return this.memoryCache.get(key)?.expireAt !== void 0;
	}
	hasSharedTTL(key) {
		return this.sharedCache.get(key)?.expireAt !== void 0;
	}
	getShared(key) {
		return this.getSharedInternal(key);
	}
	getSharedSnapshot(key) {
		return this.sharedCache.get(key)?.value;
	}
	getSharedInternal(key) {
		const entry = this.sharedCache.get(key);
		if (!entry) return void 0;
		if (entry.expireAt && Date.now() > entry.expireAt) {
			this.sharedCache.delete(key);
			this.notifySubscribers(key);
			return;
		}
		return entry.value;
	}
	setShared(key, value, ttl) {
		this.setSharedInternal(key, value, ttl);
	}
	setSharedInternal(key, value, ttl) {
		const existingEntry = this.sharedCache.get(key);
		const newExpireAt = ttl ? Date.now() + ttl : void 0;
		if (existingEntry && isEqual(existingEntry.value, value)) {
			if (!Object.is(existingEntry.expireAt, newExpireAt)) {
				existingEntry.expireAt = newExpireAt;
				logger$1.verbose(`Updated TTL for shared cache key "${key}"`);
				this.broadcastSync({
					type: "shared",
					key,
					value,
					expireAt: newExpireAt
				});
			} else logger$1.verbose(`Skipped shared cache update for key "${key}" - value and TTL unchanged`);
			return;
		}
		const entry = {
			value,
			expireAt: newExpireAt
		};
		this.sharedCache.set(key, entry);
		this.notifySubscribers(key);
		this.broadcastSync({
			type: "shared",
			key,
			value,
			expireAt: newExpireAt
		});
		logger$1.verbose(`Updated shared cache for key "${key}"`);
	}
	hasShared(key) {
		return this.hasSharedInternal(key);
	}
	hasSharedInternal(key) {
		const entry = this.sharedCache.get(key);
		if (!entry) return false;
		if (entry.expireAt && Date.now() > entry.expireAt) {
			this.sharedCache.delete(key);
			this.notifySubscribers(key);
			return false;
		}
		return true;
	}
	deleteShared(key) {
		return this.deleteSharedInternal(key);
	}
	deleteSharedInternal(key) {
		if (this.activeHookCounts.get(key)) {
			logger$1.error(`Cannot delete key "${key}" as it's being used by useSharedCache hook`);
			return false;
		}
		if (!this.sharedCache.has(key)) {
			logger$1.verbose(`Skipped shared cache delete for key "${key}" - not exists`);
			return true;
		}
		this.sharedCache.delete(key);
		this.notifySubscribers(key);
		this.broadcastSync({
			type: "shared",
			key,
			value: void 0
		});
		logger$1.verbose(`Deleted shared cache key "${key}"`);
		return true;
	}
	getPersist(key) {
		const value = this.persistCache.get(key);
		if (value !== void 0) return value;
		const defaultValue = DefaultRendererPersistCache[key];
		this.persistCache.set(key, defaultValue);
		this.schedulePersistSave();
		logger$1.warn(`Missing persist cache key "${key}", using default value`);
		return defaultValue;
	}
	setPersist(key, value) {
		const nextValue = typeof value === "function" ? value(this.getPersist(key)) : value;
		if (isEqual(this.persistCache.get(key), nextValue)) {
			logger$1.verbose(`Skipped persist cache update for key "${key}" - value unchanged`);
			return;
		}
		this.persistCache.set(key, nextValue);
		this.notifySubscribers(key);
		this.broadcastSync({
			type: "persist",
			key,
			value: nextValue
		});
		this.schedulePersistSave();
		logger$1.verbose(`Updated persist cache for key "${key}"`);
	}
	hasPersist(key) {
		return !isEqual(this.getPersist(key), DefaultRendererPersistCache[key]);
	}
	deletePersist(key) {
		this.setPersist(key, DefaultRendererPersistCache[key]);
	}
	registerHook(key) {
		const currentCount = this.activeHookCounts.get(key) ?? 0;
		this.activeHookCounts.set(key, currentCount + 1);
	}
	unregisterHook(key) {
		const currentCount = this.activeHookCounts.get(key);
		if (!currentCount) return;
		if (currentCount === 1) {
			this.activeHookCounts.delete(key);
			return;
		}
		this.activeHookCounts.set(key, currentCount - 1);
	}
	getStats(includeDetails = false) {
		const now = Date.now();
		const memory = this.processCacheTier(this.memoryCache, now, includeDetails);
		const shared = this.processCacheTier(this.sharedCache, now, includeDetails);
		const persist = this.processPersistTier(includeDetails);
		const totalBytes = memory.summary.estimatedBytes + shared.summary.estimatedBytes + persist.summary.estimatedBytes;
		const total = {
			totalCount: memory.summary.totalCount + shared.summary.totalCount + persist.summary.totalCount,
			validCount: memory.summary.validCount + shared.summary.validCount + persist.summary.validCount,
			expiredCount: memory.summary.expiredCount + shared.summary.expiredCount,
			withTTLCount: memory.summary.withTTLCount + shared.summary.withTTLCount,
			hookReferences: memory.summary.hookReferences + shared.summary.hookReferences + persist.summary.hookReferences,
			estimatedBytes: totalBytes,
			estimatedSize: this.formatBytes(totalBytes)
		};
		return {
			collectedAt: now,
			summary: {
				memory: memory.summary,
				shared: shared.summary,
				persist: persist.summary,
				total
			},
			details: {
				memory: memory.details,
				shared: shared.details,
				persist: persist.details
			}
		};
	}
	processCacheTier(cache, now, includeDetails) {
		let validCount = 0;
		let expiredCount = 0;
		let withTTLCount = 0;
		let hookReferences = 0;
		let estimatedBytes = 0;
		const details = [];
		for (const [key, entry] of cache.entries()) {
			const hasTTL = entry.expireAt !== void 0;
			const isExpired = hasTTL && now > entry.expireAt;
			const hookCount = this.activeHookCounts.get(key) ?? 0;
			estimatedBytes += this.estimateSize(key) + this.estimateSize(entry.value);
			if (entry.expireAt) estimatedBytes += 8;
			if (hasTTL) withTTLCount++;
			if (isExpired) expiredCount++;
			else validCount++;
			hookReferences += hookCount;
			if (includeDetails) details.push({
				key,
				hasValue: entry.value !== void 0,
				hasTTL,
				isExpired,
				expireAt: entry.expireAt,
				remainingTTL: hasTTL && !isExpired ? entry.expireAt - now : void 0,
				hookCount
			});
		}
		return {
			summary: {
				totalCount: cache.size,
				validCount,
				expiredCount,
				withTTLCount,
				hookReferences,
				estimatedBytes
			},
			details
		};
	}
	processPersistTier(includeDetails) {
		let hookReferences = 0;
		let estimatedBytes = 0;
		for (const [key, value] of this.persistCache.entries()) {
			hookReferences += this.activeHookCounts.get(key) ?? 0;
			estimatedBytes += this.estimateSize(key) + this.estimateSize(value);
		}
		const details = includeDetails ? Array.from(this.persistCache.keys()).map((key) => ({
			key,
			hasValue: true,
			hasTTL: false,
			isExpired: false,
			hookCount: this.activeHookCounts.get(key) ?? 0
		})) : [];
		return {
			summary: {
				totalCount: this.persistCache.size,
				validCount: this.persistCache.size,
				expiredCount: 0,
				withTTLCount: 0,
				hookReferences,
				estimatedBytes
			},
			details
		};
	}
	estimateSize(value) {
		try {
			return new Blob([JSON.stringify(value)]).size;
		} catch {
			return 0;
		}
	}
	formatBytes(bytes) {
		if (bytes === 0) return "0 B";
		const k = 1024;
		const sizes = [
			"B",
			"KB",
			"MB",
			"GB"
		];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
	}
	isSharedCacheReady() {
		return this.sharedCacheReady;
	}
	onSharedCacheReady(callback) {
		if (this.sharedCacheReady) {
			callback();
			return () => {};
		}
		this.sharedCacheReadyCallbacks.push(callback);
		return () => {
			const idx = this.sharedCacheReadyCallbacks.indexOf(callback);
			if (idx >= 0) this.sharedCacheReadyCallbacks.splice(idx, 1);
		};
	}
	markSharedCacheReady() {
		this.sharedCacheReady = true;
		this.sharedCacheReadyCallbacks.forEach((cb) => cb());
		this.sharedCacheReadyCallbacks = [];
	}
	async syncSharedCacheFromMain() {
		if (!window.api?.cache?.getAllShared) {
			logger$1.warn("Cache getAllShared API not available");
			this.markSharedCacheReady();
			return;
		}
		try {
			const allShared = await window.api.cache.getAllShared();
			let syncedCount = 0;
			for (const [key, entry] of Object.entries(allShared)) {
				if (entry.expireAt && Date.now() > entry.expireAt) continue;
				const existingEntry = this.sharedCache.get(key);
				const valueChanged = !existingEntry || !Object.is(existingEntry.value, entry.value);
				const ttlChanged = !existingEntry || !Object.is(existingEntry.expireAt, entry.expireAt);
				if (valueChanged || ttlChanged) {
					this.sharedCache.set(key, entry);
					this.notifySubscribers(key);
					syncedCount++;
				}
			}
			logger$1.debug(`Synced ${syncedCount} changed shared cache entries from Main (total: ${Object.keys(allShared).length})`);
		} catch (error) {
			logger$1.error("Failed to sync shared cache from Main:", error);
		} finally {
			this.markSharedCacheReady();
		}
	}
	subscribe(key, callback) {
		if (!this.subscribers.has(key)) this.subscribers.set(key, /* @__PURE__ */ new Set());
		const keySubscribers = this.subscribers.get(key);
		keySubscribers.add(callback);
		return () => {
			keySubscribers.delete(callback);
			if (keySubscribers.size === 0) this.subscribers.delete(key);
		};
	}
	notifySubscribers(key) {
		const keySubscribers = this.subscribers.get(key);
		if (keySubscribers) keySubscribers.forEach((callback) => {
			try {
				callback();
			} catch (error) {
				logger$1.error(`Subscriber callback error for key ${key}:`, error);
			}
		});
	}
	loadPersistCache() {
		for (const [key, defaultValue] of Object.entries(DefaultRendererPersistCache)) this.persistCache.set(key, defaultValue);
		try {
			const stored = localStorage.getItem(STORAGE_PERSIST_KEY);
			if (!stored) {
				this.savePersistCache();
				logger$1.debug("Initialized persist cache with default values");
				return;
			}
			const data = JSON.parse(stored);
			const schemaKeys = Object.keys(DefaultRendererPersistCache);
			for (const key of schemaKeys) if (key in data) this.persistCache.set(key, data[key]);
			this.savePersistCache();
			logger$1.debug("Loaded persist cache from localStorage with defaults");
		} catch (error) {
			logger$1.error("Failed to load persist cache:", error);
			localStorage.removeItem(STORAGE_PERSIST_KEY);
			logger$1.debug("Fallback to default persist cache values");
		}
	}
	savePersistCache() {
		try {
			const data = {};
			for (const [key, value] of this.persistCache.entries()) data[key] = value;
			const jsonData = JSON.stringify(data);
			const size = jsonData.length;
			if (size > 1024 * 1024 * 2) logger$1.warn(`Persist cache is too large (${(size / (1024 * 1024)).toFixed(2)} MB), this may cause performance issues, and may cause data loss, please check your persist cache and reduce the size`);
			localStorage.setItem(STORAGE_PERSIST_KEY, jsonData);
			logger$1.verbose(`Saved persist cache to localStorage, size: ${(size / (1024 * 1024)).toFixed(2)} MB`);
		} catch (error) {
			logger$1.error("Failed to save persist cache:", error);
		}
	}
	schedulePersistSave() {
		this.persistDirty = true;
		if (this.persistSaveTimer) clearTimeout(this.persistSaveTimer);
		this.persistSaveTimer = setTimeout(() => {
			this.savePersistCache();
			this.persistDirty = false;
		}, this.PERSIST_SAVE_DEBOUNCE_MS);
	}
	broadcastSync(message) {
		if (window.api?.cache?.broadcastSync) window.api.cache.broadcastSync(message);
	}
	setupIpcListeners() {
		if (!window.api?.cache?.onSync) {
			logger$1.warn("Cache sync API not available");
			return;
		}
		window.api.cache.onSync((message) => {
			if (message.type === "shared") {
				if (message.value === void 0) {
					this.sharedCache.delete(message.key);
					this.notifySubscribers(message.key);
					return;
				}
				const existingEntry = this.sharedCache.get(message.key);
				if (existingEntry && isEqual(existingEntry.value, message.value)) {
					existingEntry.expireAt = message.expireAt;
					return;
				}
				const entry = {
					value: message.value,
					expireAt: message.expireAt
				};
				this.sharedCache.set(message.key, entry);
				this.notifySubscribers(message.key);
			} else if (message.type === "persist") {
				this.persistCache.set(message.key, message.value);
				this.notifySubscribers(message.key);
			}
		});
	}
	setupWindowUnloadHandler() {
		window.addEventListener("beforeunload", () => {
			if (this.persistDirty) this.savePersistCache();
		});
	}
	cleanup() {
		if (this.persistDirty) this.savePersistCache();
		if (this.persistSaveTimer) clearTimeout(this.persistSaveTimer);
		this.memoryCache.clear();
		this.sharedCache.clear();
		this.persistCache.clear();
		this.activeHookCounts.clear();
		this.subscribers.clear();
		logger$1.debug("CacheService cleanup completed");
	}
};
const cacheService = new CacheService();
function isTemplateKey(key) {
	return key.includes("${") && key.includes("}");
}
function templateToRegex(template) {
	const pattern = template.replace(/[.*+?^${}()|[\]\\]/g, (match) => {
		if (match === "$" || match === "{" || match === "}") return match;
		return "\\" + match;
	}).replace(/\$\{[^}]+\}/g, "([\\w\\-]+)");
	return /* @__PURE__ */ new RegExp(`^${pattern}$`);
}
function findMatchingSharedCacheSchemaKey(key) {
	if (key in DefaultSharedCache) return key;
	const schemaKeys = Object.keys(DefaultSharedCache);
	for (const schemaKey of schemaKeys) if (isTemplateKey(schemaKey)) {
		if (templateToRegex(schemaKey).test(key)) return schemaKey;
	}
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_with_selector = require_with_selector();
var logger = loggerService.withContext("useCache");
function findMatchingUseCacheSchemaKey(key) {
	if (key in DefaultUseCache) return key;
	const schemaKeys = Object.keys(DefaultUseCache);
	for (const schemaKey of schemaKeys) if (isTemplateKey(schemaKey)) {
		if (templateToRegex(schemaKey).test(key)) return schemaKey;
	}
}
function getUseCacheDefaultValue(key) {
	const schemaKey = findMatchingUseCacheSchemaKey(key);
	if (schemaKey) return DefaultUseCache[schemaKey];
}
function getSharedCacheDefaultValue(key) {
	const schemaKey = findMatchingSharedCacheSchemaKey(key);
	if (schemaKey) return DefaultSharedCache[schemaKey];
}
function useCache(key, initValue) {
	const defaultValue = getUseCacheDefaultValue(key);
	const value = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((callback) => cacheService.subscribe(key, callback), [key]), (0, import_react.useCallback)(() => cacheService.get(key), [key]), (0, import_react.useCallback)(() => cacheService.get(key), [key]));
	(0, import_react.useEffect)(() => {
		if (cacheService.has(key)) return;
		if (initValue !== void 0) cacheService.set(key, initValue);
		else if (defaultValue !== void 0) cacheService.set(key, defaultValue);
	}, [
		key,
		initValue,
		defaultValue
	]);
	(0, import_react.useEffect)(() => {
		cacheService.registerHook(key);
		return () => cacheService.unregisterHook(key);
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (cacheService.hasTTL(key)) logger.warn(`useCache hook for key "${key}" is using a cache with TTL. This may cause unstable behavior as the value can expire between renders.`);
	}, [key]);
	const setValue = (0, import_react.useCallback)((newValue) => {
		if (typeof newValue === "function") {
			const prev = cacheService.get(key) ?? initValue ?? defaultValue;
			cacheService.set(key, newValue(prev));
		} else cacheService.set(key, newValue);
	}, [
		key,
		initValue,
		defaultValue
	]);
	return [value ?? initValue ?? defaultValue, setValue];
}
function useSharedCache(key, initValue) {
	const value = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((callback) => cacheService.subscribe(key, callback), [key]), (0, import_react.useCallback)(() => cacheService.getSharedSnapshot(key), [key]), (0, import_react.useCallback)(() => cacheService.getSharedSnapshot(key), [key]));
	(0, import_react.useEffect)(() => {
		if (cacheService.hasShared(key)) return;
		if (initValue === void 0) {
			const defaultValue = getSharedCacheDefaultValue(key);
			if (defaultValue !== void 0) cacheService.setShared(key, defaultValue);
		} else cacheService.setShared(key, initValue);
	}, [key, initValue]);
	(0, import_react.useEffect)(() => {
		cacheService.registerHook(key);
		return () => cacheService.unregisterHook(key);
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (cacheService.hasSharedTTL(key)) logger.warn(`useSharedCache hook for key "${key}" is using a cache with TTL. This may cause unstable behavior as the value can expire between renders.`);
	}, [key]);
	const setValue = (0, import_react.useCallback)((newValue) => {
		if (typeof newValue === "function") {
			const prev = cacheService.getShared(key) ?? initValue ?? getSharedCacheDefaultValue(key);
			cacheService.setShared(key, newValue(prev));
		} else cacheService.setShared(key, newValue);
	}, [key, initValue]);
	return [value ?? initValue ?? getSharedCacheDefaultValue(key), setValue];
}
function useSharedCacheValue(key) {
	return (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((callback) => cacheService.subscribe(key, callback), [key]), (0, import_react.useCallback)(() => cacheService.getSharedSnapshot(key), [key]), (0, import_react.useCallback)(() => cacheService.getSharedSnapshot(key), [key]));
}
function shallowEqual(a, b) {
	if (Object.is(a, b)) return true;
	if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) return false;
	if (Array.isArray(a) || Array.isArray(b)) {
		if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
		return a.every((item, index) => Object.is(item, b[index]));
	}
	if (!isPlainObject(a) || !isPlainObject(b)) return false;
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);
	if (keysA.length !== keysB.length) return false;
	return keysA.every((key) => Object.hasOwn(b, key) && Object.is(a[key], b[key]));
}
var CACHE_KEYS_DEP_SEPARATOR = "\0";
function useCacheKeysSelector(keys, subscribeKey, readKey, selector, isEqual$1) {
	const stableKeys = (0, import_react.useMemo)(() => [...keys], [keys.join(CACHE_KEYS_DEP_SEPARATOR)]);
	const subscribe = (0, import_react.useCallback)((onStoreChange) => {
		const disposers = stableKeys.map((key) => subscribeKey(key, onStoreChange));
		return () => disposers.forEach((dispose) => dispose());
	}, [stableKeys, subscribeKey]);
	const getSnapshot = (0, import_react.useMemo)(() => {
		let cachedValues;
		return () => {
			const nextValues = stableKeys.map((key) => readKey(key));
			const prevValues = cachedValues;
			if (prevValues !== void 0 && nextValues.length === prevValues.length && nextValues.every((value, index) => Object.is(value, prevValues[index]))) return prevValues;
			cachedValues = nextValues;
			return nextValues;
		};
	}, [stableKeys, readKey]);
	return (0, import_with_selector.useSyncExternalStoreWithSelector)(subscribe, getSnapshot, getSnapshot, selector, isEqual$1);
}
var subscribeSharedKey = (key, onStoreChange) => cacheService.subscribe(key, onStoreChange);
var readSharedKey = (key) => cacheService.getSharedSnapshot(key);
function useSharedCacheSelector(keys, selector, isEqual$1 = shallowEqual) {
	return useCacheKeysSelector(keys, subscribeSharedKey, readSharedKey, selector, isEqual$1);
}
function usePersistCache(key) {
	const value = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((callback) => cacheService.subscribe(key, callback), [key]), (0, import_react.useCallback)(() => cacheService.getPersist(key), [key]), (0, import_react.useCallback)(() => cacheService.getPersist(key), [key]));
	(0, import_react.useEffect)(() => {
		cacheService.registerHook(key);
		return () => cacheService.unregisterHook(key);
	}, [key]);
	return [value, (0, import_react.useCallback)((newValue) => cacheService.setPersist(key, newValue), [key])];
}
export { useSharedCacheValue as a, useSharedCacheSelector as i, usePersistCache as n, cacheService as o, useSharedCache as r, isPlainObject as s, useCache as t };
