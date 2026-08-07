import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as isDev } from "./platform-YWZQ2_mC.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as require_shim } from "./shim-BiqNigny.js";
import { t as dataApiService } from "./DataApiService-DP44jQXR.js";
var has = Object.prototype.hasOwnProperty;
function dequal(foo, bar) {
	var ctor, len;
	if (foo === bar) return true;
	if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();
		if (ctor === Array) {
			if ((len = foo.length) === bar.length) while (len-- && dequal(foo[len], bar[len]));
			return len === -1;
		}
		if (!ctor || typeof foo === "object") {
			len = 0;
			for (ctor in foo) {
				if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
			}
			return Object.keys(bar).length === len;
		}
	}
	return foo !== foo && bar !== bar;
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var SWRGlobalState = /* @__PURE__ */ new WeakMap();
var noop$1 = () => {};
var UNDEFINED = noop$1();
var OBJECT$1 = Object;
var isUndefined = (v) => v === UNDEFINED;
var isFunction = (v) => typeof v == "function";
var mergeObjects = (a, b) => ({
	...a,
	...b
});
var isPromiseLike = (x) => isFunction(x.then);
var EMPTY_CACHE = {};
var INITIAL_CACHE = {};
var STR_UNDEFINED = "undefined";
var isWindowDefined = typeof window != STR_UNDEFINED;
var isDocumentDefined = typeof document != STR_UNDEFINED;
var isLegacyDeno = isWindowDefined && "Deno" in window;
var hasRequestAnimationFrame = () => isWindowDefined && typeof window["requestAnimationFrame"] != STR_UNDEFINED;
var createCacheHelper = (cache$1, key) => {
	const state = SWRGlobalState.get(cache$1);
	return [
		() => !isUndefined(key) && cache$1.get(key) || EMPTY_CACHE,
		(info) => {
			if (!isUndefined(key)) {
				const prev = cache$1.get(key);
				if (!(key in INITIAL_CACHE)) INITIAL_CACHE[key] = prev;
				state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
			}
		},
		state[6],
		() => {
			if (!isUndefined(key)) {
				if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
			}
			return !isUndefined(key) && cache$1.get(key) || EMPTY_CACHE;
		}
	];
};
var online = true;
var isOnline = () => online;
var [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [window.addEventListener.bind(window), window.removeEventListener.bind(window)] : [noop$1, noop$1];
var isVisible = () => {
	const visibilityState = isDocumentDefined && document.visibilityState;
	return isUndefined(visibilityState) || visibilityState !== "hidden";
};
var initFocus = (callback) => {
	if (isDocumentDefined) document.addEventListener("visibilitychange", callback);
	onWindowEvent("focus", callback);
	return () => {
		if (isDocumentDefined) document.removeEventListener("visibilitychange", callback);
		offWindowEvent("focus", callback);
	};
};
var initReconnect = (callback) => {
	const onOnline = () => {
		online = true;
		callback();
	};
	const onOffline = () => {
		online = false;
	};
	onWindowEvent("online", onOnline);
	onWindowEvent("offline", onOffline);
	return () => {
		offWindowEvent("online", onOnline);
		offWindowEvent("offline", onOffline);
	};
};
var preset = {
	isOnline,
	isVisible
};
var defaultConfigOptions = {
	initFocus,
	initReconnect
};
var IS_REACT_LEGACY = !import_react.useId;
var IS_SERVER = !isWindowDefined || isLegacyDeno;
var rAF = (f) => hasRequestAnimationFrame() ? window["requestAnimationFrame"](f) : setTimeout(f, 1);
var useIsomorphicLayoutEffect = IS_SERVER ? import_react.useEffect : import_react.useLayoutEffect;
var navigatorConnection = typeof navigator !== "undefined" && navigator.connection;
var slowConnection = !IS_SERVER && navigatorConnection && (["slow-2g", "2g"].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);
var table$2 = /* @__PURE__ */ new WeakMap();
var getTypeName$2 = (value) => OBJECT$1.prototype.toString.call(value);
var isObjectTypeName$2 = (typeName, type) => typeName === `[object ${type}]`;
var counter$2 = 0;
var stableHash$2 = (arg) => {
	const type = typeof arg;
	const typeName = getTypeName$2(arg);
	const isDate = isObjectTypeName$2(typeName, "Date");
	const isRegex = isObjectTypeName$2(typeName, "RegExp");
	const isPlainObject = isObjectTypeName$2(typeName, "Object");
	let result;
	let index;
	if (OBJECT$1(arg) === arg && !isDate && !isRegex) {
		result = table$2.get(arg);
		if (result) return result;
		result = ++counter$2 + "~";
		table$2.set(arg, result);
		if (Array.isArray(arg)) {
			result = "@";
			for (index = 0; index < arg.length; index++) result += stableHash$2(arg[index]) + ",";
			table$2.set(arg, result);
		}
		if (isPlainObject) {
			result = "#";
			const keys = OBJECT$1.keys(arg).sort();
			while (!isUndefined(index = keys.pop())) if (!isUndefined(arg[index])) result += index + ":" + stableHash$2(arg[index]) + ",";
			table$2.set(arg, result);
		}
	} else result = isDate ? arg.toJSON() : type == "symbol" ? arg.toString() : type == "string" ? JSON.stringify(arg) : "" + arg;
	return result;
};
var serialize = (key) => {
	if (isFunction(key)) try {
		key = key();
	} catch (err) {
		key = "";
	}
	const args = key;
	key = typeof key == "string" ? key : (Array.isArray(key) ? key.length : key) ? stableHash$2(key) : "";
	return [key, args];
};
var __timestamp = 0;
var getTimestamp = () => ++__timestamp;
async function internalMutate(...args) {
	const [cache$1, _key, _data, _opts] = args;
	const options = mergeObjects({
		populateCache: true,
		throwOnError: true
	}, typeof _opts === "boolean" ? { revalidate: _opts } : _opts || {});
	let populateCache = options.populateCache;
	const rollbackOnErrorOption = options.rollbackOnError;
	let optimisticData = options.optimisticData;
	const rollbackOnError = (error) => {
		return typeof rollbackOnErrorOption === "function" ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
	};
	const throwOnError = options.throwOnError;
	if (isFunction(_key)) {
		const keyFilter = _key;
		const matchedKeys = [];
		const it = cache$1.keys();
		for (const key of it) if (!/^\$(inf|sub)\$/.test(key) && keyFilter(cache$1.get(key)._k)) matchedKeys.push(key);
		return Promise.all(matchedKeys.map(mutateByKey));
	}
	return mutateByKey(_key);
	async function mutateByKey(_k) {
		const [key] = serialize(_k);
		if (!key) return;
		const [get, set] = createCacheHelper(cache$1, key);
		const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache$1);
		const startRevalidate = () => {
			const revalidators = EVENT_REVALIDATORS[key];
			if (isFunction(options.revalidate) ? options.revalidate(get().data, _k) : options.revalidate !== false) {
				delete FETCH[key];
				delete PRELOAD[key];
				if (revalidators && revalidators[0]) return revalidators[0](2).then(() => get().data);
			}
			return get().data;
		};
		if (args.length < 3) return startRevalidate();
		let data = _data;
		let error;
		let isError = false;
		const beforeMutationTs = getTimestamp();
		MUTATION[key] = [beforeMutationTs, 0];
		const hasOptimisticData = !isUndefined(optimisticData);
		const state = get();
		const displayedData = state.data;
		const currentData = state._c;
		const committedData = isUndefined(currentData) ? displayedData : currentData;
		if (hasOptimisticData) {
			optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
			set({
				data: optimisticData,
				_c: committedData
			});
		}
		if (isFunction(data)) try {
			data = data(committedData);
		} catch (err) {
			error = err;
			isError = true;
		}
		if (data && isPromiseLike(data)) {
			data = await data.catch((err) => {
				error = err;
				isError = true;
			});
			if (beforeMutationTs !== MUTATION[key][0]) {
				if (isError) throw error;
				return data;
			} else if (isError && hasOptimisticData && rollbackOnError(error)) {
				populateCache = true;
				set({
					data: committedData,
					_c: UNDEFINED
				});
			}
		}
		if (populateCache) {
			if (!isError) if (isFunction(populateCache)) set({
				data: populateCache(data, committedData),
				error: UNDEFINED,
				_c: UNDEFINED
			});
			else set({
				data,
				error: UNDEFINED,
				_c: UNDEFINED
			});
		}
		MUTATION[key][1] = getTimestamp();
		Promise.resolve(startRevalidate()).then(() => {
			set({ _c: UNDEFINED });
		});
		if (isError) {
			if (throwOnError) throw error;
			return;
		}
		return data;
	}
}
var revalidateAllKeys = (revalidators, type) => {
	for (const key in revalidators) if (revalidators[key][0]) revalidators[key][0](type);
};
var initCache = (provider, options) => {
	if (!SWRGlobalState.has(provider)) {
		const opts = mergeObjects(defaultConfigOptions, options);
		const EVENT_REVALIDATORS = Object.create(null);
		const mutate$1 = internalMutate.bind(UNDEFINED, provider);
		let unmount = noop$1;
		const subscriptions = Object.create(null);
		const subscribe = (key, callback) => {
			const subs = subscriptions[key] || [];
			subscriptions[key] = subs;
			subs.push(callback);
			return () => subs.splice(subs.indexOf(callback), 1);
		};
		const setter = (key, value, prev) => {
			provider.set(key, value);
			const subs = subscriptions[key];
			if (subs) for (const fn of subs) fn(value, prev);
		};
		const initProvider = () => {
			if (!SWRGlobalState.has(provider)) {
				SWRGlobalState.set(provider, [
					EVENT_REVALIDATORS,
					Object.create(null),
					Object.create(null),
					Object.create(null),
					mutate$1,
					setter,
					subscribe
				]);
				if (!IS_SERVER) {
					const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, 0)));
					const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, 1)));
					unmount = () => {
						releaseFocus && releaseFocus();
						releaseReconnect && releaseReconnect();
						SWRGlobalState.delete(provider);
					};
				}
			}
		};
		initProvider();
		return [
			provider,
			mutate$1,
			initProvider,
			unmount
		];
	}
	return [provider, SWRGlobalState.get(provider)[4]];
};
var onErrorRetry = (_, __, config, revalidate, opts) => {
	const maxRetryCount = config.errorRetryCount;
	const currentRetryCount = opts.retryCount;
	const timeout = ~~((Math.random() + .5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
	if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) return;
	setTimeout(revalidate, timeout, opts);
};
var compare = dequal;
var [cache, mutate] = initCache(/* @__PURE__ */ new Map());
var defaultConfig = mergeObjects({
	onLoadingSlow: noop$1,
	onSuccess: noop$1,
	onError: noop$1,
	onErrorRetry,
	onDiscarded: noop$1,
	revalidateOnFocus: true,
	revalidateOnReconnect: true,
	revalidateIfStale: true,
	shouldRetryOnError: true,
	errorRetryInterval: slowConnection ? 1e4 : 5e3,
	focusThrottleInterval: 5 * 1e3,
	dedupingInterval: 2 * 1e3,
	loadingTimeout: slowConnection ? 5e3 : 3e3,
	compare,
	isPaused: () => false,
	cache,
	mutate,
	fallback: {}
}, preset);
var mergeConfigs = (a, b) => {
	const v = mergeObjects(a, b);
	if (b) {
		const { use: u1, fallback: f1 } = a;
		const { use: u2, fallback: f2 } = b;
		if (u1 && u2) v.use = u1.concat(u2);
		if (f1 && f2) v.fallback = mergeObjects(f1, f2);
	}
	return v;
};
var SWRConfigContext = (0, import_react.createContext)({});
var SWRConfig = (props) => {
	const { value } = props;
	const parentConfig = (0, import_react.useContext)(SWRConfigContext);
	const isFunctionalConfig = isFunction(value);
	const config = (0, import_react.useMemo)(() => isFunctionalConfig ? value(parentConfig) : value, [
		isFunctionalConfig,
		parentConfig,
		value
	]);
	const extendedConfig = (0, import_react.useMemo)(() => isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
		isFunctionalConfig,
		parentConfig,
		config
	]);
	const provider = config && config.provider;
	const cacheContextRef = (0, import_react.useRef)(UNDEFINED);
	if (provider && !cacheContextRef.current) cacheContextRef.current = initCache(provider(extendedConfig.cache || cache), config);
	const cacheContext = cacheContextRef.current;
	if (cacheContext) {
		extendedConfig.cache = cacheContext[0];
		extendedConfig.mutate = cacheContext[1];
	}
	useIsomorphicLayoutEffect(() => {
		if (cacheContext) {
			cacheContext[2] && cacheContext[2]();
			return cacheContext[3];
		}
	}, []);
	return (0, import_react.createElement)(SWRConfigContext.Provider, mergeObjects(props, { value: extendedConfig }));
};
var INFINITE_PREFIX$1 = "$inf$";
var enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
var use$1 = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
var setupDevTools = () => {
	if (enableDevtools) window.__SWR_DEVTOOLS_REACT__ = import_react.default;
};
var normalize = (args) => {
	return isFunction(args[1]) ? [
		args[0],
		args[1],
		args[2] || {}
	] : [
		args[0],
		null,
		(args[1] === null ? args[2] : args[1]) || {}
	];
};
var useSWRConfig = () => {
	const parentConfig = (0, import_react.useContext)(SWRConfigContext);
	return (0, import_react.useMemo)(() => mergeObjects(defaultConfig, parentConfig), [parentConfig]);
};
var preload = (key_, fetcher) => {
	const [key, fnArg] = serialize(key_);
	const [, , , PRELOAD] = SWRGlobalState.get(cache);
	if (PRELOAD[key]) return PRELOAD[key];
	const req = fetcher(fnArg);
	PRELOAD[key] = req;
	return req;
};
var middleware = (useSWRNext) => (key_, fetcher_, config) => {
	return useSWRNext(key_, fetcher_ && ((...args) => {
		const [key] = serialize(key_);
		const [, , , PRELOAD] = SWRGlobalState.get(cache);
		if (key.startsWith("$inf$")) return fetcher_(...args);
		const req = PRELOAD[key];
		if (isUndefined(req)) return fetcher_(...args);
		delete PRELOAD[key];
		return req;
	}), config);
};
var BUILT_IN_MIDDLEWARE = use$1.concat(middleware);
var withArgs = (hook) => {
	return function useSWRArgs(...args) {
		const fallbackConfig = useSWRConfig();
		const [key, fn, _config] = normalize(args);
		const config = mergeConfigs(fallbackConfig, _config);
		let next = hook;
		const { use: use$2 } = config;
		const middleware$1 = (use$2 || []).concat(BUILT_IN_MIDDLEWARE);
		for (let i = middleware$1.length; i--;) next = middleware$1[i](next);
		return next(key, fn || config.fetcher || null, config);
	};
};
var subscribeCallback = (key, callbacks, callback) => {
	const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
	keyedRevalidators.push(callback);
	return () => {
		const index = keyedRevalidators.indexOf(callback);
		if (index >= 0) {
			keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
			keyedRevalidators.pop();
		}
	};
};
var withMiddleware = (useSWR$1, middleware$1) => {
	return (...args) => {
		const [key, fn, config] = normalize(args);
		const uses = (config.use || []).concat(middleware$1);
		return useSWR$1(key, fn, {
			...config,
			use: uses
		});
	};
};
setupDevTools();
var import_shim$1 = require_shim();
var noop$2 = () => {};
var UNDEFINED$2 = noop$2();
var OBJECT$2 = Object;
var isUndefined$2 = (v) => v === UNDEFINED$2;
var isFunction$2 = (v) => typeof v == "function";
var table$1 = /* @__PURE__ */ new WeakMap();
var getTypeName$1 = (value) => OBJECT$2.prototype.toString.call(value);
var isObjectTypeName$1 = (typeName, type) => typeName === `[object ${type}]`;
var counter$1 = 0;
var stableHash$1 = (arg) => {
	const type = typeof arg;
	const typeName = getTypeName$1(arg);
	const isDate = isObjectTypeName$1(typeName, "Date");
	const isRegex = isObjectTypeName$1(typeName, "RegExp");
	const isPlainObject = isObjectTypeName$1(typeName, "Object");
	let result;
	let index;
	if (OBJECT$2(arg) === arg && !isDate && !isRegex) {
		result = table$1.get(arg);
		if (result) return result;
		result = ++counter$1 + "~";
		table$1.set(arg, result);
		if (Array.isArray(arg)) {
			result = "@";
			for (index = 0; index < arg.length; index++) result += stableHash$1(arg[index]) + ",";
			table$1.set(arg, result);
		}
		if (isPlainObject) {
			result = "#";
			const keys = OBJECT$2.keys(arg).sort();
			while (!isUndefined$2(index = keys.pop())) if (!isUndefined$2(arg[index])) result += index + ":" + stableHash$1(arg[index]) + ",";
			table$1.set(arg, result);
		}
	} else result = isDate ? arg.toJSON() : type == "symbol" ? arg.toString() : type == "string" ? JSON.stringify(arg) : "" + arg;
	return result;
};
var serialize$2 = (key) => {
	if (isFunction$2(key)) try {
		key = key();
	} catch (err) {
		key = "";
	}
	const args = key;
	key = typeof key == "string" ? key : (Array.isArray(key) ? key.length : key) ? stableHash$1(key) : "";
	return [key, args];
};
var unstable_serialize = (key) => serialize$2(key)[0];
var use = import_react.use || ((thenable) => {
	switch (thenable.status) {
		case "pending": throw thenable;
		case "fulfilled": return thenable.value;
		case "rejected": throw thenable.reason;
		default:
			thenable.status = "pending";
			thenable.then((v) => {
				thenable.status = "fulfilled";
				thenable.value = v;
			}, (e) => {
				thenable.status = "rejected";
				thenable.reason = e;
			});
			throw thenable;
	}
});
var WITH_DEDUPE = { dedupe: true };
var resolvedUndef = Promise.resolve(UNDEFINED);
var useSWRHandler = (_key, fetcher, config) => {
	const { cache: cache$1, compare: compare$1, suspense, fallbackData, revalidateOnMount, revalidateIfStale, refreshInterval, refreshWhenHidden, refreshWhenOffline, keepPreviousData, strictServerPrefetchWarning } = config;
	const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache$1);
	const [key, fnArg] = serialize(_key);
	const initialMountedRef = (0, import_react.useRef)(false);
	const unmountedRef = (0, import_react.useRef)(false);
	const keyRef = (0, import_react.useRef)(key);
	const fetcherRef = (0, import_react.useRef)(fetcher);
	const configRef = (0, import_react.useRef)(config);
	const getConfig = () => configRef.current;
	const isActive = () => getConfig().isVisible() && getConfig().isOnline();
	const [getCache, setCache, subscribeCache, getInitialCache] = createCacheHelper(cache$1, key);
	const stateDependencies = (0, import_react.useRef)({}).current;
	const fallback = isUndefined(fallbackData) ? isUndefined(config.fallback) ? UNDEFINED : config.fallback[key] : fallbackData;
	const isEqual = (prev, current) => {
		for (const _ in stateDependencies) {
			const t = _;
			if (t === "data") {
				if (!compare$1(prev[t], current[t])) {
					if (!isUndefined(prev[t])) return false;
					if (!compare$1(returnedData, current[t])) return false;
				}
			} else if (current[t] !== prev[t]) return false;
		}
		return true;
	};
	const getSnapshot = (0, import_react.useMemo)(() => {
		const shouldStartRequest = (() => {
			if (!key) return false;
			if (!fetcher) return false;
			if (!isUndefined(revalidateOnMount)) return revalidateOnMount;
			if (getConfig().isPaused()) return false;
			if (suspense) return false;
			return revalidateIfStale !== false;
		})();
		const getSelectedCache = (state) => {
			const snapshot = mergeObjects(state);
			delete snapshot._k;
			if (!shouldStartRequest) return snapshot;
			return {
				isValidating: true,
				isLoading: true,
				...snapshot
			};
		};
		const cachedData$1 = getCache();
		const initialData = getInitialCache();
		const clientSnapshot = getSelectedCache(cachedData$1);
		const serverSnapshot = cachedData$1 === initialData ? clientSnapshot : getSelectedCache(initialData);
		let memorizedSnapshot = clientSnapshot;
		return [() => {
			const newSnapshot = getSelectedCache(getCache());
			if (isEqual(newSnapshot, memorizedSnapshot)) {
				memorizedSnapshot.data = newSnapshot.data;
				memorizedSnapshot.isLoading = newSnapshot.isLoading;
				memorizedSnapshot.isValidating = newSnapshot.isValidating;
				memorizedSnapshot.error = newSnapshot.error;
				return memorizedSnapshot;
			} else {
				memorizedSnapshot = newSnapshot;
				return newSnapshot;
			}
		}, () => serverSnapshot];
	}, [cache$1, key]);
	const cached = (0, import_shim$1.useSyncExternalStore)((0, import_react.useCallback)((callback) => subscribeCache(key, (current, prev) => {
		if (!isEqual(prev, current)) callback();
	}), [cache$1, key]), getSnapshot[0], getSnapshot[1]);
	const isInitialMount = !initialMountedRef.current;
	const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
	const cachedData = cached.data;
	const data = isUndefined(cachedData) ? fallback && isPromiseLike(fallback) ? use(fallback) : fallback : cachedData;
	const error = cached.error;
	const laggyDataRef = (0, import_react.useRef)(data);
	const returnedData = keepPreviousData ? isUndefined(cachedData) ? isUndefined(laggyDataRef.current) ? data : laggyDataRef.current : cachedData : data;
	const hasKeyButNoData = key && isUndefined(data);
	const isHydration = !IS_SERVER && (0, import_shim$1.useSyncExternalStore)(() => noop$1, () => false, () => true);
	if (strictServerPrefetchWarning && isHydration && !suspense && hasKeyButNoData) console.warn(`Missing pre-initiated data for serialized key "${key}" during server-side rendering. Data fethcing should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
	const shouldDoInitialRevalidation = (() => {
		if (hasRevalidator && !isUndefined(error)) return false;
		if (isInitialMount && !isUndefined(revalidateOnMount)) return revalidateOnMount;
		if (getConfig().isPaused()) return false;
		if (suspense) return isUndefined(data) ? false : revalidateIfStale;
		return isUndefined(data) || revalidateIfStale;
	})();
	const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
	const isValidating = isUndefined(cached.isValidating) ? defaultValidatingState : cached.isValidating;
	const isLoading = isUndefined(cached.isLoading) ? defaultValidatingState : cached.isLoading;
	const revalidate = (0, import_react.useCallback)(async (revalidateOpts) => {
		const currentFetcher = fetcherRef.current;
		if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) return false;
		let newData;
		let startAt;
		let loading = true;
		const opts = revalidateOpts || {};
		const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
		const callbackSafeguard = () => {
			if (IS_REACT_LEGACY) return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
			return key === keyRef.current;
		};
		const finalState = {
			isValidating: false,
			isLoading: false
		};
		const finishRequestAndUpdateState = () => {
			setCache(finalState);
		};
		const cleanupState = () => {
			const requestInfo = FETCH[key];
			if (requestInfo && requestInfo[1] === startAt) delete FETCH[key];
		};
		const initialState = { isValidating: true };
		if (isUndefined(getCache().data)) initialState.isLoading = true;
		try {
			if (shouldStartNewRequest) {
				setCache(initialState);
				if (config.loadingTimeout && isUndefined(getCache().data)) setTimeout(() => {
					if (loading && callbackSafeguard()) getConfig().onLoadingSlow(key, config);
				}, config.loadingTimeout);
				FETCH[key] = [currentFetcher(fnArg), getTimestamp()];
			}
			[newData, startAt] = FETCH[key];
			newData = await newData;
			if (shouldStartNewRequest) setTimeout(cleanupState, config.dedupingInterval);
			if (!FETCH[key] || FETCH[key][1] !== startAt) {
				if (shouldStartNewRequest) {
					if (callbackSafeguard()) getConfig().onDiscarded(key);
				}
				return false;
			}
			finalState.error = UNDEFINED;
			const mutationInfo = MUTATION[key];
			if (!isUndefined(mutationInfo) && (startAt <= mutationInfo[0] || startAt <= mutationInfo[1] || mutationInfo[1] === 0)) {
				finishRequestAndUpdateState();
				if (shouldStartNewRequest) {
					if (callbackSafeguard()) getConfig().onDiscarded(key);
				}
				return false;
			}
			const cacheData = getCache().data;
			finalState.data = compare$1(cacheData, newData) ? cacheData : newData;
			if (shouldStartNewRequest) {
				if (callbackSafeguard()) getConfig().onSuccess(newData, key, config);
			}
		} catch (err) {
			cleanupState();
			const currentConfig = getConfig();
			const { shouldRetryOnError } = currentConfig;
			if (!currentConfig.isPaused()) {
				finalState.error = err;
				if (shouldStartNewRequest && callbackSafeguard()) {
					currentConfig.onError(err, key, currentConfig);
					if (shouldRetryOnError === true || isFunction(shouldRetryOnError) && shouldRetryOnError(err)) {
						if (!getConfig().revalidateOnFocus || !getConfig().revalidateOnReconnect || isActive()) currentConfig.onErrorRetry(err, key, currentConfig, (_opts) => {
							const revalidators = EVENT_REVALIDATORS[key];
							if (revalidators && revalidators[0]) revalidators[0](3, _opts);
						}, {
							retryCount: (opts.retryCount || 0) + 1,
							dedupe: true
						});
					}
				}
			}
		}
		loading = false;
		finishRequestAndUpdateState();
		return true;
	}, [key, cache$1]);
	const boundMutate = (0, import_react.useCallback)((...args) => {
		return internalMutate(cache$1, keyRef.current, ...args);
	}, []);
	useIsomorphicLayoutEffect(() => {
		fetcherRef.current = fetcher;
		configRef.current = config;
		if (!isUndefined(cachedData)) laggyDataRef.current = cachedData;
	});
	useIsomorphicLayoutEffect(() => {
		if (!key) return;
		const softRevalidate = revalidate.bind(UNDEFINED, WITH_DEDUPE);
		let nextFocusRevalidatedAt = 0;
		if (getConfig().revalidateOnFocus) nextFocusRevalidatedAt = Date.now() + getConfig().focusThrottleInterval;
		const onRevalidate = (type, opts = {}) => {
			if (type == 0) {
				const now = Date.now();
				if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
					nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
					softRevalidate();
				}
			} else if (type == 1) {
				if (getConfig().revalidateOnReconnect && isActive()) softRevalidate();
			} else if (type == 2) return revalidate();
			else if (type == 3) return revalidate(opts);
		};
		const unsubEvents = subscribeCallback(key, EVENT_REVALIDATORS, onRevalidate);
		unmountedRef.current = false;
		keyRef.current = key;
		initialMountedRef.current = true;
		setCache({ _k: fnArg });
		if (shouldDoInitialRevalidation) {
			if (!FETCH[key]) if (isUndefined(data) || IS_SERVER) softRevalidate();
			else rAF(softRevalidate);
		}
		return () => {
			unmountedRef.current = true;
			unsubEvents();
		};
	}, [key]);
	useIsomorphicLayoutEffect(() => {
		let timer;
		function next() {
			const interval = isFunction(refreshInterval) ? refreshInterval(getCache().data) : refreshInterval;
			if (interval && timer !== -1) timer = setTimeout(execute, interval);
		}
		function execute() {
			if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) revalidate(WITH_DEDUPE).then(next);
			else next();
		}
		next();
		return () => {
			if (timer) {
				clearTimeout(timer);
				timer = -1;
			}
		};
	}, [
		refreshInterval,
		refreshWhenHidden,
		refreshWhenOffline,
		key
	]);
	(0, import_react.useDebugValue)(returnedData);
	if (suspense) {
		if (!IS_REACT_LEGACY && IS_SERVER && hasKeyButNoData) throw new Error("Fallback data is required when using Suspense in SSR.");
		if (hasKeyButNoData) {
			fetcherRef.current = fetcher;
			configRef.current = config;
			unmountedRef.current = false;
		}
		const req = PRELOAD[key];
		use(!isUndefined(req) && hasKeyButNoData ? boundMutate(req) : resolvedUndef);
		if (!isUndefined(error) && hasKeyButNoData) throw error;
		const revalidation = hasKeyButNoData ? revalidate(WITH_DEDUPE) : resolvedUndef;
		if (!isUndefined(returnedData) && hasKeyButNoData) {
			revalidation.status = "fulfilled";
			revalidation.value = true;
		}
		use(revalidation);
	}
	return {
		mutate: boundMutate,
		get data() {
			stateDependencies.data = true;
			return returnedData;
		},
		get error() {
			stateDependencies.error = true;
			return error;
		},
		get isValidating() {
			stateDependencies.isValidating = true;
			return isValidating;
		},
		get isLoading() {
			stateDependencies.isLoading = true;
			return isLoading;
		}
	};
};
OBJECT$1.defineProperty(SWRConfig, "defaultValue", { value: defaultConfig });
var useSWR = withArgs(useSWRHandler);
var import_shim = require_shim();
var noop = () => {};
var UNDEFINED$1 = noop();
var OBJECT = Object;
var isUndefined$1 = (v) => v === UNDEFINED$1;
var isFunction$1 = (v) => typeof v == "function";
var table = /* @__PURE__ */ new WeakMap();
var getTypeName = (value) => OBJECT.prototype.toString.call(value);
var isObjectTypeName = (typeName, type) => typeName === `[object ${type}]`;
var counter = 0;
var stableHash = (arg) => {
	const type = typeof arg;
	const typeName = getTypeName(arg);
	const isDate = isObjectTypeName(typeName, "Date");
	const isRegex = isObjectTypeName(typeName, "RegExp");
	const isPlainObject = isObjectTypeName(typeName, "Object");
	let result;
	let index;
	if (OBJECT(arg) === arg && !isDate && !isRegex) {
		result = table.get(arg);
		if (result) return result;
		result = ++counter + "~";
		table.set(arg, result);
		if (Array.isArray(arg)) {
			result = "@";
			for (index = 0; index < arg.length; index++) result += stableHash(arg[index]) + ",";
			table.set(arg, result);
		}
		if (isPlainObject) {
			result = "#";
			const keys = OBJECT.keys(arg).sort();
			while (!isUndefined$1(index = keys.pop())) if (!isUndefined$1(arg[index])) result += index + ":" + stableHash(arg[index]) + ",";
			table.set(arg, result);
		}
	} else result = isDate ? arg.toJSON() : type == "symbol" ? arg.toString() : type == "string" ? JSON.stringify(arg) : "" + arg;
	return result;
};
var serialize$1 = (key) => {
	if (isFunction$1(key)) try {
		key = key();
	} catch (err) {
		key = "";
	}
	const args = key;
	key = typeof key == "string" ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : "";
	return [key, args];
};
var getFirstPageKey = (getKey) => {
	return serialize$1(getKey ? getKey(0, null) : null)[0];
};
var EMPTY_PROMISE = Promise.resolve();
var infinite = (useSWRNext) => (getKey, fn, config) => {
	const didMountRef = (0, import_react.useRef)(false);
	const { cache: cache$1, initialSize = 1, revalidateAll = false, persistSize = false, revalidateFirstPage = true, revalidateOnMount = false, parallel = false } = config;
	const [, , , PRELOAD] = SWRGlobalState.get(cache);
	let infiniteKey;
	try {
		infiniteKey = getFirstPageKey(getKey);
		if (infiniteKey) infiniteKey = INFINITE_PREFIX$1 + infiniteKey;
	} catch (err) {}
	const [get, set, subscribeCache] = createCacheHelper(cache$1, infiniteKey);
	const getSnapshot = (0, import_react.useCallback)(() => {
		return isUndefined(get()._l) ? initialSize : get()._l;
	}, [
		cache$1,
		infiniteKey,
		initialSize
	]);
	(0, import_shim.useSyncExternalStore)((0, import_react.useCallback)((callback) => {
		if (infiniteKey) return subscribeCache(infiniteKey, () => {
			callback();
		});
		return () => {};
	}, [cache$1, infiniteKey]), getSnapshot, getSnapshot);
	const resolvePageSize = (0, import_react.useCallback)(() => {
		const cachedPageSize = get()._l;
		return isUndefined(cachedPageSize) ? initialSize : cachedPageSize;
	}, [infiniteKey, initialSize]);
	const lastPageSizeRef = (0, import_react.useRef)(resolvePageSize());
	useIsomorphicLayoutEffect(() => {
		if (!didMountRef.current) {
			didMountRef.current = true;
			return;
		}
		if (infiniteKey) set({ _l: persistSize ? lastPageSizeRef.current : resolvePageSize() });
	}, [infiniteKey, cache$1]);
	const shouldRevalidateOnMount = revalidateOnMount && !didMountRef.current;
	const swr = useSWRNext(infiniteKey, async (key) => {
		const forceRevalidateAll = get()._i;
		const shouldRevalidatePage = get()._r;
		set({ _r: UNDEFINED });
		const data = [];
		const pageSize = resolvePageSize();
		const [getCache] = createCacheHelper(cache$1, key);
		const cacheData = getCache().data;
		const revalidators = [];
		let previousPageData = null;
		for (let i = 0; i < pageSize; ++i) {
			const [pageKey, pageArg] = serialize(getKey(i, parallel ? null : previousPageData));
			if (!pageKey) break;
			const [getSWRCache, setSWRCache] = createCacheHelper(cache$1, pageKey);
			let pageData = getSWRCache().data;
			const shouldFetchPage = revalidateAll || forceRevalidateAll || isUndefined(pageData) || revalidateFirstPage && !i && !isUndefined(cacheData) || shouldRevalidateOnMount || cacheData && !isUndefined(cacheData[i]) && !config.compare(cacheData[i], pageData);
			if (fn && (typeof shouldRevalidatePage === "function" ? shouldRevalidatePage(pageData, pageArg) : shouldFetchPage)) {
				const revalidate = async () => {
					if (!(pageKey in PRELOAD)) pageData = await fn(pageArg);
					else {
						const req = PRELOAD[pageKey];
						delete PRELOAD[pageKey];
						pageData = await req;
					}
					setSWRCache({
						data: pageData,
						_k: pageArg
					});
					data[i] = pageData;
				};
				if (parallel) revalidators.push(revalidate);
				else await revalidate();
			} else data[i] = pageData;
			if (!parallel) previousPageData = pageData;
		}
		if (parallel) await Promise.all(revalidators.map((r) => r()));
		set({ _i: UNDEFINED });
		return data;
	}, config);
	const mutate$1 = (0, import_react.useCallback)(function(data, opts) {
		const options = typeof opts === "boolean" ? { revalidate: opts } : opts || {};
		const shouldRevalidate = options.revalidate !== false;
		if (!infiniteKey) return EMPTY_PROMISE;
		if (shouldRevalidate) if (!isUndefined(data)) set({
			_i: false,
			_r: options.revalidate
		});
		else set({
			_i: true,
			_r: options.revalidate
		});
		return arguments.length ? swr.mutate(data, {
			...options,
			revalidate: shouldRevalidate
		}) : swr.mutate();
	}, [infiniteKey, cache$1]);
	const setSize = (0, import_react.useCallback)((arg) => {
		if (!infiniteKey) return EMPTY_PROMISE;
		const [, changeSize] = createCacheHelper(cache$1, infiniteKey);
		let size;
		if (isFunction(arg)) size = arg(resolvePageSize());
		else if (typeof arg == "number") size = arg;
		if (typeof size != "number") return EMPTY_PROMISE;
		changeSize({ _l: size });
		lastPageSizeRef.current = size;
		const data = [];
		const [getInfiniteCache] = createCacheHelper(cache$1, infiniteKey);
		let previousPageData = null;
		for (let i = 0; i < size; ++i) {
			const [pageKey] = serialize(getKey(i, previousPageData));
			const [getCache] = createCacheHelper(cache$1, pageKey);
			const pageData = pageKey ? getCache().data : UNDEFINED;
			if (isUndefined(pageData)) return mutate$1(getInfiniteCache().data);
			data.push(pageData);
			previousPageData = pageData;
		}
		return mutate$1(data);
	}, [
		infiniteKey,
		cache$1,
		mutate$1,
		resolvePageSize
	]);
	return {
		size: resolvePageSize(),
		setSize,
		mutate: mutate$1,
		get data() {
			return swr.data;
		},
		get error() {
			return swr.error;
		},
		get isValidating() {
			return swr.isValidating;
		},
		get isLoading() {
			return swr.isLoading;
		}
	};
};
var useSWRInfinite = withMiddleware(useSWR, infinite);
var startTransition = IS_REACT_LEGACY ? (cb) => {
	cb();
} : import_react.startTransition;
var useStateWithDeps = (initialState) => {
	const [, rerender] = (0, import_react.useState)({});
	const unmountedRef = (0, import_react.useRef)(false);
	const stateRef = (0, import_react.useRef)(initialState);
	const stateDependenciesRef = (0, import_react.useRef)({
		data: false,
		error: false,
		isValidating: false
	});
	const setState = (0, import_react.useCallback)((payload) => {
		let shouldRerender = false;
		const currentState = stateRef.current;
		for (const key in payload) if (Object.prototype.hasOwnProperty.call(payload, key)) {
			const k = key;
			if (currentState[k] !== payload[k]) {
				currentState[k] = payload[k];
				if (stateDependenciesRef.current[k]) shouldRerender = true;
			}
		}
		if (shouldRerender && !unmountedRef.current) rerender({});
	}, []);
	useIsomorphicLayoutEffect(() => {
		unmountedRef.current = false;
		return () => {
			unmountedRef.current = true;
		};
	});
	return [
		stateRef,
		stateDependenciesRef.current,
		setState
	];
};
var mutation = () => (key, fetcher, config = {}) => {
	const { mutate: mutate$1 } = useSWRConfig();
	const keyRef = (0, import_react.useRef)(key);
	const fetcherRef = (0, import_react.useRef)(fetcher);
	const configRef = (0, import_react.useRef)(config);
	const ditchMutationsUntilRef = (0, import_react.useRef)(0);
	const [stateRef, stateDependencies, setState] = useStateWithDeps({
		data: UNDEFINED,
		error: UNDEFINED,
		isMutating: false
	});
	const currentState = stateRef.current;
	const trigger = (0, import_react.useCallback)(async (arg, opts) => {
		const [serializedKey, resolvedKey] = serialize(keyRef.current);
		if (!fetcherRef.current) throw new Error("Can’t trigger the mutation: missing fetcher.");
		if (!serializedKey) throw new Error("Can’t trigger the mutation: missing key.");
		const options = mergeObjects(mergeObjects({
			populateCache: false,
			throwOnError: true
		}, configRef.current), opts);
		const mutationStartedAt = getTimestamp();
		ditchMutationsUntilRef.current = mutationStartedAt;
		setState({ isMutating: true });
		try {
			const data = await mutate$1(serializedKey, fetcherRef.current(resolvedKey, { arg }), mergeObjects(options, { throwOnError: true }));
			if (ditchMutationsUntilRef.current <= mutationStartedAt) {
				startTransition(() => setState({
					data,
					isMutating: false,
					error: void 0
				}));
				options.onSuccess == null || options.onSuccess.call(options, data, serializedKey, options);
			}
			return data;
		} catch (error) {
			if (ditchMutationsUntilRef.current <= mutationStartedAt) {
				startTransition(() => setState({
					error,
					isMutating: false
				}));
				options.onError == null || options.onError.call(options, error, serializedKey, options);
				if (options.throwOnError) throw error;
			}
		}
	}, []);
	const reset = (0, import_react.useCallback)(() => {
		ditchMutationsUntilRef.current = getTimestamp();
		setState({
			data: UNDEFINED,
			error: UNDEFINED,
			isMutating: false
		});
	}, []);
	useIsomorphicLayoutEffect(() => {
		keyRef.current = key;
		fetcherRef.current = fetcher;
		configRef.current = config;
	});
	return {
		trigger,
		reset,
		get data() {
			stateDependencies.data = true;
			return currentState.data;
		},
		get error() {
			stateDependencies.error = true;
			return currentState.error;
		},
		get isMutating() {
			stateDependencies.isMutating = true;
			return currentState.isMutating;
		}
	};
};
var useSWRMutation = withMiddleware(useSWR, mutation);
var logger = loggerService.withContext("useDataApi");
var DEFAULT_SWR_OPTIONS = {
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
	dedupingInterval: 5e3,
	shouldRetryOnError: false,
	keepPreviousData: true
};
var EMPTY_ITEMS = Object.freeze([]);
function useQuery(path, options) {
	const isEnabled = options?.enabled !== false;
	const resolvedPath = isEnabled ? resolveTemplate(path, options?.params) : null;
	const { data, error, isLoading, isValidating, mutate: mutate$1 } = useSWR(isEnabled && resolvedPath ? buildSWRKey(resolvedPath, options?.query) : null, getFetcher, {
		...DEFAULT_SWR_OPTIONS,
		...options?.swrOptions
	});
	return {
		data,
		isLoading,
		isRefreshing: isValidating,
		error,
		refetch: (0, import_react.useCallback)(() => mutate$1(), [mutate$1]),
		mutate: mutate$1
	};
}
function useMutation(method, path, options) {
	const { mutate: globalMutate, cache: cache$1 } = useSWRConfig();
	const optionsRef = (0, import_react.useRef)(options);
	(0, import_react.useEffect)(() => {
		optionsRef.current = options;
	}, [options]);
	const inFlightParamsRef = (0, import_react.useRef)(null);
	const apiFetcher = createApiFetcher(method);
	const fetcher = async (templatePath, { arg }) => {
		return apiFetcher(resolveTemplate(templatePath, arg?.params), {
			body: arg?.body,
			query: arg?.query
		});
	};
	const { trigger: swrTrigger, isMutating, error } = useSWRMutation(path, fetcher, {
		populateCache: false,
		revalidate: false,
		onError: (err) => optionsRef.current?.onError?.(err),
		...options?.swrOptions
	});
	return {
		trigger: (0, import_react.useCallback)(async (data) => {
			const opts = optionsRef.current;
			const capturedArgs = data;
			const paramsRecord = capturedArgs?.params;
			const resolvedPath = resolveTemplate(path, paramsRecord);
			const hasOptimisticData = opts?.optimisticData !== void 0;
			if (isDev && paramsRecord) {
				const prev = inFlightParamsRef.current;
				if (prev && JSON.stringify(prev) !== JSON.stringify(paramsRecord)) logger.warn(`Concurrent trigger on template useMutation: ${method} ${String(path)}. In-flight params=${JSON.stringify(prev)}, new params=${JSON.stringify(paramsRecord)}. isMutating/error state will be shared between the two calls. Use per-row hook instances with concrete paths (e.g. useMutation('${method}', providerPath(id))) for parallel writes.`);
			}
			inFlightParamsRef.current = paramsRecord ?? null;
			if (hasOptimisticData) await globalMutate([resolvedPath], opts.optimisticData, false);
			try {
				const result = await swrTrigger({
					params: paramsRecord,
					body: capturedArgs?.body,
					query: capturedArgs?.query
				});
				const refreshOpt = opts?.refresh;
				if (refreshOpt) try {
					const keys = typeof refreshOpt === "function" ? refreshOpt({
						args: capturedArgs,
						result
					}) : refreshOpt;
					if (keys.length > 0) await invalidatePathPatterns(cache$1, globalMutate, keys);
				} catch (refreshErr) {
					logger.warn(`Refresh failed after successful ${method} ${String(path)}; cache may be stale`, { error: refreshErr });
				}
				opts?.onSuccess?.(result);
				if (hasOptimisticData) await globalMutate([resolvedPath]);
				return result;
			} catch (err) {
				if (hasOptimisticData) await globalMutate([resolvedPath]);
				throw err;
			} finally {
				if (inFlightParamsRef.current === paramsRecord) inFlightParamsRef.current = null;
			}
		}, [
			cache$1,
			globalMutate,
			method,
			path,
			swrTrigger
		]),
		isLoading: isMutating,
		error
	};
}
function useInvalidateCache() {
	const { mutate: mutate$1, cache: cache$1 } = useSWRConfig();
	return (0, import_react.useCallback)(async (keys) => {
		if (keys === true || keys === void 0) {
			await mutate$1(() => true);
			return;
		}
		if (keys === false) return;
		await invalidatePathPatterns(cache$1, mutate$1, typeof keys === "string" ? [keys] : keys);
	}, [cache$1, mutate$1]);
}
function prefetch(path, options) {
	return preload(buildSWRKey(resolveTemplate(path, options?.params), options?.query), getFetcher);
}
function useReadCache() {
	const { cache: cache$1 } = useSWRConfig();
	return (0, import_react.useCallback)((path, query) => {
		const serialized = query !== void 0 && Object.keys(query).length > 0 ? unstable_serialize([path, query]) : unstable_serialize([path]);
		return cache$1.get(serialized)?.data;
	}, [cache$1]);
}
function useWriteCache() {
	const { mutate: mutate$1 } = useSWRConfig();
	return (0, import_react.useCallback)(async (path, value, query) => {
		await mutate$1(query !== void 0 && Object.keys(query).length > 0 ? [path, query] : [path], value, false);
	}, [mutate$1]);
}
function useInfiniteQuery(path, options) {
	const limit = options?.limit ?? 10;
	const enabled = options?.enabled !== false;
	const resolvedPath = resolveTemplate(path, options?.params);
	const getKey = (0, import_react.useCallback)((_pageIndex, previousPageData) => {
		if (!enabled) return null;
		if (previousPageData && !previousPageData.nextCursor) return null;
		return [resolvedPath, {
			...options?.query,
			limit,
			...previousPageData?.nextCursor ? { cursor: previousPageData.nextCursor } : {}
		}];
	}, [
		resolvedPath,
		options?.query,
		limit,
		enabled
	]);
	const infiniteFetcher = (key) => {
		return getFetcher(key);
	};
	const swrResult = useSWRInfinite(getKey, infiniteFetcher, {
		...DEFAULT_SWR_OPTIONS,
		...options?.swrOptions
	});
	const { error, isLoading, isValidating, mutate: mutate$1, setSize } = swrResult;
	const pages = (0, import_react.useMemo)(() => swrResult.data ?? [], [swrResult.data]);
	const hasNext = (0, import_react.useMemo)(() => {
		if (!pages.length) return false;
		return !!pages[pages.length - 1].nextCursor;
	}, [pages]);
	return {
		pages,
		isLoading,
		isRefreshing: isValidating,
		error,
		hasNext,
		loadNext: (0, import_react.useCallback)(() => {
			if (hasNext) setSize((s) => s + 1);
		}, [hasNext, setSize]),
		refresh: (0, import_react.useCallback)(() => mutate$1(), [mutate$1]),
		reset: (0, import_react.useCallback)(() => setSize(1), [setSize]),
		mutate: mutate$1
	};
}
function useInfiniteFlatItems(pages, options) {
	const reversePages = options?.reversePages;
	const reverseItems = options?.reverseItems;
	return (0, import_react.useMemo)(() => {
		if (!pages) return [];
		const orderedPages = reversePages ? pages.slice().reverse() : pages;
		const flattenPage = (page) => reverseItems ? [...page.items].reverse() : page.items;
		return orderedPages.flatMap(flattenPage);
	}, [
		pages,
		reversePages,
		reverseItems
	]);
}
function usePaginatedQuery(path, options) {
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const limit = options?.limit || 10;
	(0, import_react.useEffect)(() => {
		setCurrentPage(1);
	}, [unstable_serialize([options?.query ?? {}])]);
	const queryWithPagination = {
		...options?.query,
		page: currentPage,
		limit
	};
	const { data, isLoading, isRefreshing, error, refetch } = useQuery(path, {
		params: options?.params,
		query: queryWithPagination,
		enabled: options?.enabled,
		swrOptions: options?.swrOptions
	});
	const paginatedData = data;
	const items = paginatedData?.items ?? EMPTY_ITEMS;
	const total = paginatedData?.total || 0;
	const hasNext = currentPage < Math.ceil(total / limit);
	const hasPrev = currentPage > 1;
	const nextPage = (0, import_react.useCallback)(() => {
		if (hasNext) setCurrentPage((prev) => prev + 1);
	}, [hasNext]);
	return {
		items,
		total,
		page: currentPage,
		isLoading,
		isRefreshing,
		error,
		hasNext,
		hasPrev,
		prevPage: (0, import_react.useCallback)(() => {
			if (hasPrev) setCurrentPage((prev) => prev - 1);
		}, [hasPrev]),
		nextPage,
		refresh: refetch,
		reset: (0, import_react.useCallback)(() => {
			setCurrentPage(1);
		}, [])
	};
}
function useDataChange(endpoints, listener) {
	const listenerRef = (0, import_react.useRef)(listener);
	(0, import_react.useEffect)(() => {
		listenerRef.current = listener;
	});
	const endpointsKey = Array.isArray(endpoints) ? endpoints.join("\0") : endpoints;
	(0, import_react.useEffect)(() => {
		if (endpointsKey === "") return;
		const endpointList = endpointsKey.split("\0");
		return dataApiService.onDataChanged(endpointList, (effects) => listenerRef.current(effects));
	}, [endpointsKey]);
}
function createApiFetcher(method) {
	return async (path, options) => {
		const query = options?.query;
		switch (method) {
			case "GET": return dataApiService.get(path, { query });
			case "POST": return dataApiService.post(path, {
				body: options?.body,
				query
			});
			case "PUT": return dataApiService.put(path, {
				body: options?.body || {},
				query
			});
			case "DELETE": return dataApiService.delete(path, { query });
			case "PATCH": return dataApiService.patch(path, {
				body: options?.body,
				query
			});
			default: throw new Error(`Unsupported method: ${method}`);
		}
	};
}
function buildSWRKey(path, query) {
	if (query && Object.keys(query).length > 0) return [path, query];
	return [path];
}
function getFetcher([path, query]) {
	return createApiFetcher("GET")(path, { query });
}
function assertValidPattern(pattern) {
	if (!isDev) return;
	if (pattern.endsWith("*") && !pattern.endsWith("/*")) {
		const msg = `Invalid refresh pattern "${pattern}": wildcard must be a full path segment (use "/foo/*" not "/foo*")`;
		logger.error(msg);
		throw new Error(msg);
	}
	if (pattern === "/*" || pattern === "*") {
		const msg = `Invalid refresh pattern "${pattern}": bare wildcard would invalidate unrelated caches`;
		logger.error(msg);
		throw new Error(msg);
	}
}
function createMultiKeyMatcher(patterns) {
	patterns.forEach(assertValidPattern);
	const exact = patterns.filter((p) => !p.endsWith("/*"));
	const prefixes = patterns.filter((p) => p.endsWith("/*")).map((p) => p.slice(0, -1));
	return (key) => {
		if (!Array.isArray(key) || typeof key[0] !== "string") return false;
		const k = key[0];
		return exact.includes(k) || prefixes.some((prefix) => k.startsWith(prefix));
	};
}
var INFINITE_PREFIX = "$inf$";
function extractInfinitePath(key) {
	if (!key.startsWith(INFINITE_PREFIX)) return void 0;
	const openIdx = key.indexOf("@\"", 5);
	if (openIdx !== 5) return void 0;
	const pathStart = openIdx + 2;
	let i = pathStart;
	while (i < key.length) {
		const ch = key.charCodeAt(i);
		if (ch === 92) {
			i += 2;
			continue;
		}
		if (ch === 34) try {
			return JSON.parse(key.slice(pathStart - 1, i + 1));
		} catch {
			return;
		}
		i += 1;
	}
}
function findMatchingInfiniteKeys(cache$1, patterns) {
	const exact = patterns.filter((p) => !p.endsWith("/*"));
	const prefixes = patterns.filter((p) => p.endsWith("/*")).map((p) => p.slice(0, -1));
	const matched = [];
	for (const key of cache$1.keys()) {
		if (typeof key !== "string" || !key.startsWith(INFINITE_PREFIX)) continue;
		const path = extractInfinitePath(key);
		if (path === void 0) continue;
		if (exact.includes(path) || prefixes.some((prefix) => path.startsWith(prefix))) matched.push(key);
	}
	return matched;
}
async function invalidatePathPatterns(cache$1, globalMutate, patterns) {
	await globalMutate(createMultiKeyMatcher(patterns));
	const infiniteKeys = findMatchingInfiniteKeys(cache$1, patterns);
	if (infiniteKeys.length > 0) await Promise.all(infiniteKeys.map((k) => globalMutate(k)));
}
function resolveTemplate(path, params) {
	if (!params || !path.includes(":")) return path;
	return path.replace(/(?<=\/):([a-zA-Z][a-zA-Z0-9]*)\*?/g, (_match, key) => {
		const value = params[key];
		if (value === void 0 || value === null) throw new Error(`Missing param "${key}" for path "${path}"`);
		return String(value);
	});
}
export { useInvalidateCache as a, useQuery as c, useSWR as d, useSWRConfig as f, useInfiniteQuery as i, useReadCache as l, useDataChange as n, useMutation as o, withMiddleware as p, useInfiniteFlatItems as r, usePaginatedQuery as s, prefetch as t, useWriteCache as u };
