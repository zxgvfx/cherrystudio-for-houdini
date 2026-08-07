import { C as uint8ArrayTag, E as getSymbols, S as uint32ArrayTag, T as getTag, _ as regexpTag, a as arrayTag, b as symbolTag, c as dateTag, d as int16ArrayTag, f as int32ArrayTag, g as objectTag, h as numberTag, i as arrayBufferTag, l as float32ArrayTag, m as mapTag, n as isBuffer, o as booleanTag, p as int8ArrayTag, r as argumentsTag, s as dataViewTag, u as float64ArrayTag, v as setTag, w as uint8ClampedArrayTag, x as uint16ArrayTag, y as stringTag } from "./isEqual-DO7BtJs5.js";
import { t as isArrayLike } from "./isArrayLike-qCM8LrC4.js";
import { i as isTypedArray$1, n as isTypedArray, t as isPrototype } from "./isPrototype-CEcR1wZx.js";
function toString(value) {
	if (value == null) return "";
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map(toString).join(",");
	const result = String(value);
	if (result === "0" && Object.is(Number(value), -0)) return "-0";
	return result;
}
function toKey(value) {
	if (typeof value === "string" || typeof value === "symbol") return value;
	if (Object.is(value?.valueOf?.(), -0)) return "-0";
	return String(value);
}
function toPath(deepKey) {
	if (Array.isArray(deepKey)) return deepKey.map(toKey);
	if (typeof deepKey === "symbol") return [deepKey];
	deepKey = toString(deepKey);
	const result = [];
	const length = deepKey.length;
	if (length === 0) return result;
	let index = 0;
	let key = "";
	let quoteChar = "";
	let bracket = false;
	if (deepKey.charCodeAt(0) === 46) result.push("");
	while (index < length) {
		const char = deepKey[index];
		if (quoteChar) if (char === "\\" && index + 1 < length) {
			index++;
			key += deepKey[index];
		} else if (char === quoteChar) quoteChar = "";
		else key += char;
		else if (bracket) if (char === "\"" || char === "'") quoteChar = char;
		else if (char === "]") {
			bracket = false;
			result.push(key);
			key = "";
		} else key += char;
		else if (char === "[") {
			bracket = true;
			if (key) {
				result.push(key);
				key = "";
			}
		} else if (char === ".") {
			if (key) {
				result.push(key);
				key = "";
			}
			const next = deepKey[index + 1];
			if (next === void 0 || next === ".") result.push("");
		} else key += char;
		index++;
	}
	if (key) result.push(key);
	return result;
}
function isUnsafeProperty(key) {
	return key === "__proto__";
}
function isDeepKey(key) {
	switch (typeof key) {
		case "number":
		case "symbol": return false;
		case "string": return key.includes(".") || key.includes("[") || key.includes("]");
	}
}
function get(object, path, defaultValue) {
	if (object == null) return defaultValue;
	switch (typeof path) {
		case "string": {
			if (isUnsafeProperty(path)) return defaultValue;
			const result = object[path];
			if (result === void 0) if (isDeepKey(path) && !Object.hasOwn(object, path)) return get(object, toPath(path), defaultValue);
			else return defaultValue;
			return result;
		}
		case "number":
		case "symbol": {
			if (typeof path === "number") path = toKey(path);
			const result = object[path];
			if (result === void 0) return defaultValue;
			return result;
		}
		default: {
			if (Array.isArray(path)) return getWithPath(object, path, defaultValue);
			if (Object.is(path?.valueOf(), -0)) path = "-0";
			else path = String(path);
			if (isUnsafeProperty(path)) return defaultValue;
			const result = object[path];
			if (result === void 0) return defaultValue;
			return result;
		}
	}
}
function getWithPath(object, path, defaultValue) {
	if (path.length === 0) return defaultValue;
	let current = object;
	for (let index = 0; index < path.length; index++) {
		if (current == null) return defaultValue;
		if (isUnsafeProperty(path[index])) return defaultValue;
		current = current[path[index]];
	}
	if (current === void 0) return defaultValue;
	return current;
}
function isPrimitive(value) {
	return value == null || typeof value !== "object" && typeof value !== "function";
}
function cloneDeepWith(obj, cloneValue) {
	return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), cloneValue);
}
function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = /* @__PURE__ */ new Map(), cloneValue = void 0) {
	const cloned = cloneValue?.(valueToClone, keyToClone, objectToClone, stack);
	if (cloned !== void 0) return cloned;
	if (isPrimitive(valueToClone)) return valueToClone;
	if (stack.has(valueToClone)) return stack.get(valueToClone);
	if (Array.isArray(valueToClone)) {
		const result = new Array(valueToClone.length);
		stack.set(valueToClone, result);
		for (let i = 0; i < valueToClone.length; i++) result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
		if (Object.hasOwn(valueToClone, "index")) result.index = valueToClone.index;
		if (Object.hasOwn(valueToClone, "input")) result.input = valueToClone.input;
		return result;
	}
	if (valueToClone instanceof Date) return new Date(valueToClone.getTime());
	if (valueToClone instanceof RegExp) {
		const result = new RegExp(valueToClone.source, valueToClone.flags);
		result.lastIndex = valueToClone.lastIndex;
		return result;
	}
	if (valueToClone instanceof Map) {
		const result = /* @__PURE__ */ new Map();
		stack.set(valueToClone, result);
		for (const [key, value] of valueToClone) result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
		return result;
	}
	if (valueToClone instanceof Set) {
		const result = /* @__PURE__ */ new Set();
		stack.set(valueToClone, result);
		for (const value of valueToClone) result.add(cloneDeepWithImpl(value, void 0, objectToClone, stack, cloneValue));
		return result;
	}
	if (isBuffer(valueToClone)) return valueToClone.subarray();
	if (isTypedArray$1(valueToClone)) {
		const result = new (Object.getPrototypeOf(valueToClone)).constructor(valueToClone.length);
		stack.set(valueToClone, result);
		for (let i = 0; i < valueToClone.length; i++) result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && valueToClone instanceof SharedArrayBuffer) return valueToClone.slice(0);
	if (valueToClone instanceof DataView) {
		const result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (typeof File !== "undefined" && valueToClone instanceof File) {
		const result = new File([valueToClone], valueToClone.name, { type: valueToClone.type });
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (typeof Blob !== "undefined" && valueToClone instanceof Blob) {
		const result = new Blob([valueToClone], { type: valueToClone.type });
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof Error) {
		const result = structuredClone(valueToClone);
		stack.set(valueToClone, result);
		result.message = valueToClone.message;
		result.name = valueToClone.name;
		result.stack = valueToClone.stack;
		result.cause = valueToClone.cause;
		result.constructor = valueToClone.constructor;
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof Boolean) {
		const result = new Boolean(valueToClone.valueOf());
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof Number) {
		const result = new Number(valueToClone.valueOf());
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (valueToClone instanceof String) {
		const result = new String(valueToClone.valueOf());
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	if (typeof valueToClone === "object" && isCloneableObject(valueToClone)) {
		const result = Object.create(Object.getPrototypeOf(valueToClone));
		stack.set(valueToClone, result);
		copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
		return result;
	}
	return valueToClone;
}
function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
	const keys = [...Object.keys(source), ...getSymbols(source)];
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const descriptor = Object.getOwnPropertyDescriptor(target, key);
		if (descriptor == null || descriptor.writable) target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue);
	}
}
function isCloneableObject(object) {
	switch (getTag(object)) {
		case argumentsTag:
		case arrayTag:
		case arrayBufferTag:
		case dataViewTag:
		case booleanTag:
		case dateTag:
		case float32ArrayTag:
		case float64ArrayTag:
		case int8ArrayTag:
		case int16ArrayTag:
		case int32ArrayTag:
		case mapTag:
		case numberTag:
		case objectTag:
		case regexpTag:
		case setTag:
		case stringTag:
		case symbolTag:
		case uint8ArrayTag:
		case uint8ClampedArrayTag:
		case uint16ArrayTag:
		case uint32ArrayTag: return true;
		default: return false;
	}
}
function cloneDeepWith$1(obj, customizer) {
	return cloneDeepWith(obj, (value, key, object, stack) => {
		const cloned = customizer?.(value, key, object, stack);
		if (cloned !== void 0) return cloned;
		if (typeof obj !== "object") return;
		if (getTag(obj) === "[object Object]" && typeof obj.constructor !== "function") {
			const result = {};
			stack.set(obj, result);
			copyProperties(result, obj, object, stack);
			return result;
		}
		switch (Object.prototype.toString.call(obj)) {
			case numberTag:
			case stringTag:
			case booleanTag: {
				const result = new obj.constructor(obj?.valueOf());
				copyProperties(result, obj);
				return result;
			}
			case argumentsTag: {
				const result = {};
				copyProperties(result, obj);
				result.length = obj.length;
				result[Symbol.iterator] = obj[Symbol.iterator];
				return result;
			}
			default: return;
		}
	});
}
function isSymbol(value) {
	return typeof value === "symbol" || value instanceof Symbol;
}
function toNumber(value) {
	if (isSymbol(value)) return NaN;
	return Number(value);
}
function toFinite(value) {
	if (!value) return value === 0 ? value : 0;
	value = toNumber(value);
	if (value === Infinity || value === -Infinity) return (value < 0 ? -1 : 1) * Number.MAX_VALUE;
	return value === value ? value : 0;
}
function toInteger(value) {
	const finite = toFinite(value);
	const remainder = finite % 1;
	return remainder ? finite - remainder : finite;
}
function times(n, getValue) {
	n = toInteger(n);
	if (n < 1 || !Number.isSafeInteger(n)) return [];
	const result = new Array(n);
	for (let i = 0; i < n; i++) result[i] = typeof getValue === "function" ? getValue(i) : i;
	return result;
}
function keysIn(object) {
	if (object == null) return [];
	switch (typeof object) {
		case "object":
		case "function":
			if (isArrayLike(object)) return arrayLikeKeysIn(object);
			if (isPrototype(object)) return prototypeKeysIn(object);
			return keysInImpl(object);
		default: return keysInImpl(Object(object));
	}
}
function keysInImpl(object) {
	const result = [];
	for (const key in object) result.push(key);
	return result;
}
function prototypeKeysIn(object) {
	return keysInImpl(object).filter((key) => key !== "constructor");
}
function arrayLikeKeysIn(object) {
	const indices = times(object.length, (index) => `${index}`);
	const filteredKeys = new Set(indices);
	if (isBuffer(object)) {
		filteredKeys.add("offset");
		filteredKeys.add("parent");
	}
	if (isTypedArray(object)) {
		filteredKeys.add("buffer");
		filteredKeys.add("byteLength");
		filteredKeys.add("byteOffset");
	}
	const inheritedKeys = keysInImpl(object).filter((key) => !filteredKeys.has(key));
	if (Array.isArray(object)) return [...indices, ...inheritedKeys];
	return [...indices.filter((index) => Object.hasOwn(object, index)), ...inheritedKeys];
}
function getSymbolsIn(object) {
	const result = [];
	while (object) {
		result.push(...getSymbols(object));
		object = Object.getPrototypeOf(object);
	}
	return result;
}
export { isSymbol as a, isPrimitive as c, isUnsafeProperty as d, toPath as f, toInteger as i, get as l, keysIn as n, cloneDeepWith$1 as o, toKey as p, times as r, cloneDeepWithImpl as s, getSymbolsIn as t, isDeepKey as u };
