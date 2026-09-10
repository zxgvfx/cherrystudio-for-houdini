import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as LRUCache } from "./esm-sYfmGpyU.js";
import { i as useSWRConfig, t as unstable_serialize } from "./index-eOJHr-Jy.js";
import { d as unstable_serialize$1, i as useInfiniteQuery } from "./useDataApi-H7ZhyZ_J.js";
var InfiniteQueryCacheManager = class {
	providers = /* @__PURE__ */ new WeakMap();
	constructor(options, clock) {
		this.options = options;
		this.clock = clock;
	}
	acquire(cache, groupKey) {
		const provider = this.getProvider(cache);
		const group = this.getGroup(provider, groupKey);
		group.generation += 1;
		group.subscribers += 1;
		this.clearTimer(group, "releaseTimer");
		this.cancelEviction(group);
		provider.inactiveGroups.delete(groupKey);
		let isReleased = false;
		return () => {
			if (isReleased) return;
			isReleased = true;
			this.release(provider, group);
		};
	}
	syncPages(cache, groupKey, pageKeys) {
		const provider = this.getProvider(cache);
		const group = this.getGroup(provider, groupKey);
		const nextPageKeys = new Set(pageKeys);
		for (const pageKey of group.pageKeys) if (!nextPageKeys.has(pageKey) && !group.inFlightPageKeys.has(pageKey)) this.deletePage(provider, group, pageKey);
		group.currentPageKeys = nextPageKeys;
		for (const pageKey of nextPageKeys) group.pageKeys.add(pageKey);
		this.refreshInactiveGroup(provider, group);
	}
	beginRequest(cache, groupKey, pageKey) {
		const provider = this.getProvider(cache);
		const group = this.getGroup(provider, groupKey);
		group.inFlight += 1;
		const pageRequest = group.inFlightPageKeys.get(pageKey) ?? {
			count: 0,
			succeeded: false
		};
		pageRequest.count += 1;
		group.inFlightPageKeys.set(pageKey, pageRequest);
		this.clearTimer(group, "evictionTimer");
		if (!group.pageKeys.has(pageKey)) {
			group.pageKeys.add(pageKey);
			this.refreshInactiveGroup(provider, group);
		}
		let isFinished = false;
		return (succeeded = true) => {
			if (isFinished) return;
			isFinished = true;
			group.inFlight -= 1;
			pageRequest.count -= 1;
			pageRequest.succeeded ||= succeeded;
			if (pageRequest.count === 0) {
				group.inFlightPageKeys.delete(pageKey);
				if (!pageRequest.succeeded && !group.currentPageKeys.has(pageKey)) {
					this.deletePage(provider, group, pageKey);
					this.refreshInactiveGroup(provider, group);
				}
			}
			if (group.inFlight === 0 && group.evictionGeneration !== void 0) this.scheduleEviction(provider, group, group.evictionGeneration);
		};
	}
	getProvider(cache) {
		const existing = this.providers.get(cache);
		if (existing) return existing;
		const inactiveGroups = new LRUCache({
			max: this.options.maxInactiveGroups,
			maxSize: this.options.maxInactivePages,
			perf: this.clock ?? globalThis.performance,
			sizeCalculation: (group) => Math.max(1, group.pageKeys.size),
			ttl: this.options.idleTtlMs,
			ttlAutopurge: true,
			dispose: (group, _groupKey, reason) => {
				const provider$1 = this.providers.get(cache);
				if (provider$1 && (reason === "evict" || reason === "expire")) this.requestEviction(provider$1, group, group.generation);
			}
		});
		const provider = {
			cache,
			groups: /* @__PURE__ */ new Map(),
			inactiveGroups
		};
		this.providers.set(cache, provider);
		return provider;
	}
	getGroup(provider, groupKey) {
		const existing = provider.groups.get(groupKey);
		if (existing) return existing;
		const group = {
			currentPageKeys: /* @__PURE__ */ new Set(),
			generation: 0,
			groupKey,
			inFlight: 0,
			inFlightPageKeys: /* @__PURE__ */ new Map(),
			pageKeys: /* @__PURE__ */ new Set(),
			subscribers: 0
		};
		provider.groups.set(groupKey, group);
		return group;
	}
	release(provider, group) {
		group.subscribers = Math.max(0, group.subscribers - 1);
		if (group.subscribers > 0) return;
		const generation = group.generation;
		this.clearTimer(group, "releaseTimer");
		group.releaseTimer = setTimeout(() => {
			group.releaseTimer = void 0;
			if (group.subscribers > 0 || group.generation !== generation) return;
			this.addInactiveGroup(provider, group, generation);
		}, this.options.releaseDelayMs);
	}
	addInactiveGroup(provider, group, generation) {
		if (group.pageKeys.size > this.options.maxInactivePages) {
			this.requestEviction(provider, group, generation);
			return;
		}
		provider.inactiveGroups.set(group.groupKey, group);
	}
	refreshInactiveGroup(provider, group) {
		if (group.subscribers > 0 || group.evictionGeneration !== void 0) return;
		if (!provider.inactiveGroups.delete(group.groupKey)) return;
		this.addInactiveGroup(provider, group, group.generation);
	}
	requestEviction(provider, group, generation) {
		if (group.subscribers > 0 || group.generation !== generation) return;
		group.evictionGeneration = generation;
		if (group.inFlight === 0) this.scheduleEviction(provider, group, generation);
	}
	scheduleEviction(provider, group, generation) {
		this.clearTimer(group, "evictionTimer");
		group.evictionTimer = setTimeout(() => {
			group.evictionTimer = void 0;
			if (group.subscribers > 0 || group.inFlight > 0 || group.generation !== generation || group.evictionGeneration !== generation) return;
			for (const pageKey of group.pageKeys) provider.cache.delete(pageKey);
			provider.cache.delete(group.groupKey);
			provider.groups.delete(group.groupKey);
		}, 0);
	}
	cancelEviction(group) {
		group.evictionGeneration = void 0;
		this.clearTimer(group, "evictionTimer");
	}
	deletePage(provider, group, pageKey) {
		provider.cache.delete(pageKey);
		group.pageKeys.delete(pageKey);
	}
	clearTimer(group, timer) {
		const handle = group[timer];
		if (handle === void 0) return;
		clearTimeout(handle);
		group[timer] = void 0;
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react());
function createInfiniteQueryRetentionMiddleware(options) {
	const manager = new InfiniteQueryCacheManager(options);
	return (useSWRNext) => {
		return function useInfiniteQueryRetention(key, fetcher, config) {
			const { cache } = useSWRConfig();
			const getKey = typeof key === "function" ? key : void 0;
			const getKeyRef = (0, import_react.useRef)(getKey);
			getKeyRef.current = getKey;
			let enabled = false;
			let infiniteKey = "";
			if (getKey) try {
				enabled = Boolean(getKey(0, null));
				if (enabled) infiniteKey = unstable_serialize$1(getKey);
			} catch {
				enabled = false;
			}
			const result = useSWRNext(key, enabled && fetcher ? (...args) => {
				const finishRequest = manager.beginRequest(cache, infiniteKey, unstable_serialize(args[0]));
				try {
					return Promise.resolve(fetcher(...args)).then((result$1) => {
						finishRequest();
						return result$1;
					}, (error) => {
						finishRequest(false);
						throw error;
					});
				} catch (error) {
					finishRequest(false);
					throw error;
				}
			} : fetcher, config);
			const pages = result.data;
			const isParallel = config.parallel === true;
			(0, import_react.useLayoutEffect)(() => {
				if (!enabled) return;
				return manager.acquire(cache, infiniteKey);
			}, [
				cache,
				enabled,
				infiniteKey
			]);
			(0, import_react.useLayoutEffect)(() => {
				const currentGetKey = getKeyRef.current;
				if (!enabled || !currentGetKey || !pages?.length) return;
				const pageKeys = [];
				let previousPage = null;
				for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
					const pageKey = currentGetKey(pageIndex, isParallel ? null : previousPage);
					if (!pageKey) break;
					const serializedPageKey = unstable_serialize(pageKey);
					if (cache.get(serializedPageKey) === void 0) return;
					pageKeys.push(serializedPageKey);
					previousPage = pages[pageIndex];
				}
				if (pageKeys.length === pages.length) manager.syncPages(cache, infiniteKey, pageKeys);
			}, [
				cache,
				enabled,
				infiniteKey,
				isParallel,
				pages
			]);
			return result;
		};
	};
}
var CONVERSATION_HISTORY_RETENTION = {
	idleTtlMs: 10 * 6e4,
	maxInactiveGroups: 4,
	maxInactivePages: 12,
	releaseDelayMs: 1e3
};
var useConversationInfiniteQuery = useInfiniteQuery;
var conversationHistoryRetentionMiddleware = createInfiniteQueryRetentionMiddleware(CONVERSATION_HISTORY_RETENTION);
function useConversationHistoryQuery(path, options) {
	return useConversationInfiniteQuery(path, {
		...options,
		swrOptions: {
			...options?.swrOptions,
			use: [conversationHistoryRetentionMiddleware, ...options?.swrOptions?.use ?? []]
		}
	});
}
export { useConversationHistoryQuery as t };
