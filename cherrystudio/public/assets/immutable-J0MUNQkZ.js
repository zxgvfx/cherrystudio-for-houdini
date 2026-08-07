import { s as isPlainObject } from "./useCache-SsOQx-L2.js";
import { t as isArrayLike } from "./isArrayLike-qCM8LrC4.js";
import { d as isUnsafeProperty, f as toPath, l as get, n as keysIn, o as cloneDeepWith, p as toKey, t as getSymbolsIn, u as isDeepKey } from "./getSymbolsIn-BtmoyFWl.js";
import { d as useSWR, p as withMiddleware } from "./useDataApi-DhDD9bgI.js";
function flatten(value, depth = 1) {
	const result = [];
	const flooredDepth = Math.floor(depth);
	if (!isArrayLike(value)) return result;
	const recursive = (arr, currentDepth) => {
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			if (currentDepth < flooredDepth && (Array.isArray(item) || Boolean(item?.[Symbol.isConcatSpreadable]) || item !== null && typeof item === "object" && Object.prototype.toString.call(item) === "[object Arguments]")) if (Array.isArray(item)) recursive(item, currentDepth + 1);
			else recursive(Array.from(item), currentDepth + 1);
			else result.push(item);
		}
	};
	recursive(Array.from(value), 0);
	return result;
}
function unset(obj, path) {
	if (obj == null) return true;
	switch (typeof path) {
		case "symbol":
		case "number":
		case "object":
			if (Array.isArray(path)) return unsetWithPath(obj, path);
			if (typeof path === "number") path = toKey(path);
			else if (typeof path === "object") if (Object.is(path?.valueOf(), -0)) path = "-0";
			else path = String(path);
			if (isUnsafeProperty(path)) return false;
			if (obj?.[path] === void 0) return true;
			try {
				delete obj[path];
				return true;
			} catch {
				return false;
			}
		case "string":
			if (obj?.[path] === void 0 && isDeepKey(path)) return unsetWithPath(obj, toPath(path));
			if (isUnsafeProperty(path)) return false;
			try {
				delete obj[path];
				return true;
			} catch {
				return false;
			}
	}
}
function unsetWithPath(obj, path) {
	const parent = path.length === 1 ? obj : get(obj, path.slice(0, -1));
	const lastKey = path[path.length - 1];
	if (parent?.[lastKey] === void 0) return true;
	if (isUnsafeProperty(lastKey)) return false;
	try {
		delete parent[lastKey];
		return true;
	} catch {
		return false;
	}
}
function omit(obj, ...keysArr) {
	if (obj == null) return {};
	keysArr = flatten(keysArr);
	const result = cloneInOmit(obj, keysArr);
	for (let i = 0; i < keysArr.length; i++) {
		let keys = keysArr[i];
		switch (typeof keys) {
			case "object":
				if (!Array.isArray(keys)) keys = Array.from(keys);
				for (let j = 0; j < keys.length; j++) {
					const key = keys[j];
					unset(result, key);
				}
				break;
			case "string":
			case "symbol":
			case "number":
				unset(result, keys);
				break;
		}
	}
	return result;
}
function cloneInOmit(obj, keys) {
	if (keys.some((key) => Array.isArray(key) || isDeepKey(key))) return deepCloneInOmit(obj);
	return shallowCloneInOmit(obj);
}
function shallowCloneInOmit(obj) {
	const result = {};
	const keysToCopy = [...keysIn(obj), ...getSymbolsIn(obj)];
	for (let i = 0; i < keysToCopy.length; i++) {
		const key = keysToCopy[i];
		result[key] = obj[key];
	}
	return result;
}
function deepCloneInOmit(obj) {
	const result = {};
	const keysToCopy = [...keysIn(obj), ...getSymbolsIn(obj)];
	for (let i = 0; i < keysToCopy.length; i++) {
		const key = keysToCopy[i];
		result[key] = cloneDeepWith(obj[key], (valueToClone) => {
			if (isPlainObject(valueToClone)) return;
			return valueToClone;
		});
	}
	return result;
}
var immutable = (useSWRNext) => (key, fetcher, config) => {
	config.revalidateOnFocus = false;
	config.revalidateIfStale = false;
	config.revalidateOnReconnect = false;
	return useSWRNext(key, fetcher, config);
};
var useSWRImmutable = withMiddleware(useSWR, immutable);
export { omit as n, useSWRImmutable as t };
