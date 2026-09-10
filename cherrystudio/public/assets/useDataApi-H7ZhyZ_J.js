import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as isDev } from "./platform-fGkkNTU9.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_shim } from "./shim-2TzZzGeK.js";
import { t as dataApiService } from "./DataApiService-Csr1w5Kb.js";
import { _ as useIsomorphicLayoutEffect, a as withMiddleware, c as SWRGlobalState, d as createCacheHelper, f as getTimestamp, g as serialize, h as mergeObjects, i as useSWRConfig, l as UNDEFINED, m as isUndefined, n as useSWR, o as INFINITE_PREFIX$1, p as isFunction, r as preload, s as IS_REACT_LEGACY, t as unstable_serialize, u as cache } from "./index-eOJHr-Jy.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
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
var unstable_serialize$1 = (getKey) => {
	return INFINITE_PREFIX$1 + getFirstPageKey(getKey);
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
	const mutate = (0, import_react.useCallback)(function(data, opts) {
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
			if (isUndefined(pageData)) return mutate(getInfiniteCache().data);
			data.push(pageData);
			previousPageData = pageData;
		}
		return mutate(data);
	}, [
		infiniteKey,
		cache$1,
		mutate,
		resolvePageSize
	]);
	return {
		size: resolvePageSize(),
		setSize,
		mutate,
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
	const { mutate } = useSWRConfig();
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
			const data = await mutate(serializedKey, fetcherRef.current(resolvedKey, { arg }), mergeObjects(options, { throwOnError: true }));
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
	const { data, error, isLoading, isValidating, mutate } = useSWR(isEnabled && resolvedPath ? buildSWRKey(resolvedPath, options?.query) : null, getFetcher, {
		...DEFAULT_SWR_OPTIONS,
		...options?.swrOptions
	});
	return {
		data,
		isLoading,
		isRefreshing: isValidating,
		error,
		refetch: (0, import_react.useCallback)(() => mutate(), [mutate]),
		mutate
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
	const { mutate, cache: cache$1 } = useSWRConfig();
	return (0, import_react.useCallback)(async (keys) => {
		if (keys === true || keys === void 0) {
			await mutate(() => true);
			return;
		}
		if (keys === false) return;
		await invalidatePathPatterns(cache$1, mutate, typeof keys === "string" ? [keys] : keys);
	}, [cache$1, mutate]);
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
	const { mutate } = useSWRConfig();
	return (0, import_react.useCallback)(async (path, value, query) => {
		await mutate(query !== void 0 && Object.keys(query).length > 0 ? [path, query] : [path], value, false);
	}, [mutate]);
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
	const { error, isLoading, isValidating, mutate, setSize } = swrResult;
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
		refresh: (0, import_react.useCallback)(() => mutate(), [mutate]),
		reset: (0, import_react.useCallback)(() => setSize(1), [setSize]),
		mutate
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
function useDataChange(endpoints, listener, options = {}) {
	const listenerRef = (0, import_react.useRef)(listener);
	const routeParamsRef = (0, import_react.useRef)(options.routeParams);
	(0, import_react.useEffect)(() => {
		listenerRef.current = listener;
		routeParamsRef.current = options.routeParams;
	});
	const endpointsKey = Array.isArray(endpoints) ? endpoints.join("\0") : endpoints;
	(0, import_react.useEffect)(() => {
		if (endpointsKey === "") return;
		const endpointList = endpointsKey.split("\0");
		return dataApiService.onDataChanged(endpointList, (effects) => {
			const routeParams = routeParamsRef.current;
			const matchingEffects = routeParams ? effects.filter((effect) => !effect.routeParams || Object.entries(routeParams).every(([key, value]) => effect.routeParams?.[key] === value)) : effects;
			if (matchingEffects.length > 0) listenerRef.current(matchingEffects);
		});
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
export { useInvalidateCache as a, useQuery as c, unstable_serialize$1 as d, useInfiniteQuery as i, useReadCache as l, useDataChange as n, useMutation as o, useInfiniteFlatItems as r, usePaginatedQuery as s, prefetch as t, useWriteCache as u };
