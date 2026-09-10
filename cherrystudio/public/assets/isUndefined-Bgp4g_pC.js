import { D as isEqualsSameValueZero } from "./isEqual-C7zEE0RK.js";
import { a as cloneDeepWithImpl, c as isDeepKey, d as toKey, i as cloneDeepWith, n as keysIn, o as isPrimitive, s as get, t as getSymbolsIn, u as toPath } from "./getSymbolsIn-DUZGeWP2.js";
import { r as isArguments } from "./isPrototype-CLntiGJ2.js";
import { n as isSymbol } from "./toInteger-uNKBnrVl.js";
function property(path) {
	return function(object) {
		return get(object, path);
	};
}
function isObject(value) {
	return value !== null && (typeof value === "object" || typeof value === "function");
}
function isMatchWith(target, source, compare) {
	if (typeof compare !== "function") return isMatchWith(target, source, () => void 0);
	return isMatchWithInternal(target, source, function doesMatch(objValue, srcValue, key, object, source$1, stack) {
		const isEqual = compare(objValue, srcValue, key, object, source$1, stack);
		if (isEqual !== void 0) return Boolean(isEqual);
		return isMatchWithInternal(objValue, srcValue, doesMatch, stack, false);
	}, /* @__PURE__ */ new Map(), true);
}
function isMatchWithInternal(target, source, compare, stack, isRoot = false) {
	if (source === target) return true;
	switch (typeof source) {
		case "object": return isObjectMatch(target, source, compare, stack);
		case "function":
			if (Object.keys(source).length > 0) return isMatchWithInternal(target, { ...source }, compare, stack, isRoot);
			return isEqualsSameValueZero(target, source);
		default:
			if (!isObject(target)) return isEqualsSameValueZero(target, source);
			if (isRoot) {
				if (typeof source === "string") return source === "";
				return true;
			}
			return isEqualsSameValueZero(target, source);
	}
}
function isObjectMatch(target, source, compare, stack) {
	if (source == null) return true;
	if (Array.isArray(source)) return isArrayMatch(target, source, compare, stack);
	if (source instanceof Map) return isMapMatch(target, source, compare, stack);
	if (source instanceof Set) return isSetMatch(target, source, compare, stack);
	const keys = Object.keys(source);
	if (target == null || isPrimitive(target)) return keys.length === 0;
	if (keys.length === 0) return true;
	if (stack?.has(source)) return stack.get(source) === target;
	stack?.set(source, target);
	try {
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (!isPrimitive(target) && !(key in target)) return false;
			if (source[key] === void 0 && target[key] !== void 0) return false;
			if (source[key] === null && target[key] !== null) return false;
			if (!compare(target[key], source[key], key, target, source, stack)) return false;
		}
		return true;
	} finally {
		stack?.delete(source);
	}
}
function isMapMatch(target, source, compare, stack) {
	if (source.size === 0) return true;
	if (!(target instanceof Map)) return false;
	for (const [key, sourceValue] of source.entries()) if (compare(target.get(key), sourceValue, key, target, source, stack) === false) return false;
	return true;
}
function isArrayMatch(target, source, compare, stack) {
	if (source.length === 0) return true;
	if (!Array.isArray(target)) return false;
	const countedIndex = /* @__PURE__ */ new Set();
	for (let i = 0; i < source.length; i++) {
		const sourceItem = source[i];
		let found = false;
		for (let j = 0; j < target.length; j++) {
			if (countedIndex.has(j)) continue;
			const targetItem = target[j];
			let matches$1 = false;
			if (compare(targetItem, sourceItem, i, target, source, stack)) matches$1 = true;
			if (matches$1) {
				countedIndex.add(j);
				found = true;
				break;
			}
		}
		if (!found) return false;
	}
	return true;
}
function isSetMatch(target, source, compare, stack) {
	if (source.size === 0) return true;
	if (!(target instanceof Set)) return false;
	return isArrayMatch([...target], [...source], compare, stack);
}
function isMatch(target, source) {
	return isMatchWith(target, source, () => void 0);
}
function cloneDeep$1(obj) {
	return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), void 0);
}
function matches(source) {
	source = cloneDeep$1(source);
	return (target) => {
		return isMatch(target, source);
	};
}
function cloneDeep(obj) {
	return cloneDeepWith(obj);
}
var IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length = Number.MAX_SAFE_INTEGER) {
	switch (typeof value) {
		case "number": return Number.isInteger(value) && value >= 0 && value < length;
		case "symbol": return false;
		case "string": return IS_UNSIGNED_INTEGER.test(value);
	}
}
function has(object, path) {
	let resolvedPath;
	if (Array.isArray(path)) resolvedPath = path;
	else if (typeof path === "string" && isDeepKey(path) && object?.[path] == null) resolvedPath = toPath(path);
	else resolvedPath = [path];
	if (resolvedPath.length === 0) return false;
	let current = object;
	for (let i = 0; i < resolvedPath.length; i++) {
		const key = resolvedPath[i];
		if (current == null || !Object.hasOwn(current, key)) {
			if (!((Array.isArray(current) || isArguments(current)) && isIndex(key) && key < current.length)) return false;
		}
		current = current[key];
	}
	return true;
}
function matchesProperty(property$1, source) {
	switch (typeof property$1) {
		case "object":
			if (Object.is(property$1?.valueOf(), -0)) property$1 = "-0";
			break;
		case "number":
			property$1 = toKey(property$1);
			break;
	}
	source = cloneDeep(source);
	return function(target) {
		const result = get(target, property$1);
		if (result === void 0) return has(target, property$1);
		if (source === void 0) return result === void 0;
		return isMatch(result, source);
	};
}
function identity$1(x) {
	return x;
}
function iteratee(value) {
	if (value == null) return identity$1;
	switch (typeof value) {
		case "function": return value;
		case "object":
			if (Array.isArray(value) && value.length === 2) return matchesProperty(value[0], value[1]);
			return matches(value);
		case "string":
		case "symbol":
		case "number": return property(value);
	}
}
function identity(x) {
	return x;
}
function isUndefined(x) {
	return x === void 0;
}
function omitBy(object, shouldOmit) {
	if (object == null) return {};
	const result = {};
	const predicate = iteratee(shouldOmit ?? identity);
	const keys = [...keysIn(object), ...getSymbolsIn(object)];
	for (let i = 0; i < keys.length; i++) {
		const key = isSymbol(keys[i]) ? keys[i] : keys[i].toString();
		const value = object[key];
		if (!predicate(value, key, object)) result[key] = value;
	}
	return result;
}
function isUndefined$1(x) {
	return isUndefined(x);
}
export { isObject as i, omitBy as n, isIndex as r, isUndefined$1 as t };
