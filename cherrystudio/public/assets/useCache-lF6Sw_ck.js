import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as isPlainObject } from "./isPlainObject-Bke-3U07.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_with_selector } from "./with-selector-DlsRhNV6.js";
import { n as DefaultSharedCache, r as DefaultUseCache, t as cacheService } from "./CacheService-IyXh62g9.js";
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
function useCacheKeysSelector(keys, subscribeKey, readKey, selector, isEqual) {
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
	return (0, import_with_selector.useSyncExternalStoreWithSelector)(subscribe, getSnapshot, getSnapshot, selector, isEqual);
}
var subscribeSharedKey = (key, onStoreChange) => cacheService.subscribe(key, onStoreChange);
var readSharedKey = (key) => cacheService.getSharedSnapshot(key);
function useSharedCacheSelector(keys, selector, isEqual = shallowEqual) {
	return useCacheKeysSelector(keys, subscribeSharedKey, readSharedKey, selector, isEqual);
}
function usePersistCache(key) {
	const value = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((callback) => cacheService.subscribe(key, callback), [key]), (0, import_react.useCallback)(() => cacheService.getPersist(key), [key]), (0, import_react.useCallback)(() => cacheService.getPersist(key), [key]));
	(0, import_react.useEffect)(() => {
		cacheService.registerHook(key);
		return () => cacheService.unregisterHook(key);
	}, [key]);
	return [value, (0, import_react.useCallback)((newValue) => cacheService.setPersist(key, newValue), [key])];
}
export { useSharedCacheValue as a, useSharedCacheSelector as i, usePersistCache as n, useSharedCache as r, useCache as t };
