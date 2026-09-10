function isEqualsSameValueZero(value, other) {
	return value === other || Number.isNaN(value) && Number.isNaN(other);
}
function noop() {}
function getSymbols(object) {
	return Object.getOwnPropertySymbols(object).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object, symbol));
}
function getTag(value) {
	if (value == null) return value === void 0 ? "[object Undefined]" : "[object Null]";
	return Object.prototype.toString.call(value);
}
var regexpTag = "[object RegExp]";
var stringTag = "[object String]";
var numberTag = "[object Number]";
var booleanTag = "[object Boolean]";
var argumentsTag = "[object Arguments]";
var symbolTag = "[object Symbol]";
var dateTag = "[object Date]";
var mapTag = "[object Map]";
var setTag = "[object Set]";
var arrayTag = "[object Array]";
var functionTag = "[object Function]";
var arrayBufferTag = "[object ArrayBuffer]";
var objectTag = "[object Object]";
var errorTag = "[object Error]";
var dataViewTag = "[object DataView]";
var uint8ArrayTag = "[object Uint8Array]";
var uint8ClampedArrayTag = "[object Uint8ClampedArray]";
var uint16ArrayTag = "[object Uint16Array]";
var uint32ArrayTag = "[object Uint32Array]";
var bigUint64ArrayTag = "[object BigUint64Array]";
var int8ArrayTag = "[object Int8Array]";
var int16ArrayTag = "[object Int16Array]";
var int32ArrayTag = "[object Int32Array]";
var bigInt64ArrayTag = "[object BigInt64Array]";
var float32ArrayTag = "[object Float32Array]";
var float64ArrayTag = "[object Float64Array]";
var globalThis_ = typeof globalThis === "object" && globalThis || typeof window === "object" && window || typeof self === "object" && self || typeof global === "object" && global || (function() {
	return this;
})();
function isBuffer(x) {
	return typeof globalThis_.Buffer !== "undefined" && globalThis_.Buffer.isBuffer(x);
}
function isPlainObject(value) {
	if (!value || typeof value !== "object") return false;
	const proto = Object.getPrototypeOf(value);
	if (!(proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null)) return false;
	return Object.prototype.toString.call(value) === "[object Object]";
}
function isEqualWith(a, b, areValuesEqual) {
	return isEqualWithImpl(a, b, void 0, void 0, void 0, void 0, areValuesEqual);
}
function isEqualWithImpl(a, b, property, aParent, bParent, stack, areValuesEqual) {
	const result = areValuesEqual(a, b, property, aParent, bParent, stack);
	if (result !== void 0) return result;
	if (typeof a === typeof b) switch (typeof a) {
		case "bigint":
		case "string":
		case "boolean":
		case "symbol":
		case "undefined": return a === b;
		case "number": return a === b || Object.is(a, b);
		case "function": return a === b;
		case "object": return areObjectsEqual(a, b, stack, areValuesEqual);
	}
	return areObjectsEqual(a, b, stack, areValuesEqual);
}
function areObjectsEqual(a, b, stack, areValuesEqual) {
	if (Object.is(a, b)) return true;
	let aTag = getTag(a);
	let bTag = getTag(b);
	if (aTag === "[object Arguments]") aTag = objectTag;
	if (bTag === "[object Arguments]") bTag = objectTag;
	if (aTag !== bTag) return false;
	switch (aTag) {
		case stringTag: return a.toString() === b.toString();
		case numberTag: return isEqualsSameValueZero(a.valueOf(), b.valueOf());
		case booleanTag:
		case dateTag:
		case symbolTag: return Object.is(a.valueOf(), b.valueOf());
		case regexpTag: return a.source === b.source && a.flags === b.flags;
		case functionTag: return a === b;
	}
	stack = stack ?? /* @__PURE__ */ new Map();
	const aStack = stack.get(a);
	const bStack = stack.get(b);
	if (aStack != null && bStack != null) return aStack === b;
	stack.set(a, b);
	stack.set(b, a);
	try {
		switch (aTag) {
			case mapTag:
				if (a.size !== b.size) return false;
				for (const [key, value] of a.entries()) if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)) return false;
				return true;
			case setTag: {
				if (a.size !== b.size) return false;
				const aValues = Array.from(a.values());
				const bValues = Array.from(b.values());
				for (let i = 0; i < aValues.length; i++) {
					const aValue = aValues[i];
					const index = bValues.findIndex((bValue) => {
						return isEqualWithImpl(aValue, bValue, void 0, a, b, stack, areValuesEqual);
					});
					if (index === -1) return false;
					bValues.splice(index, 1);
				}
				return true;
			}
			case arrayTag:
			case uint8ArrayTag:
			case uint8ClampedArrayTag:
			case uint16ArrayTag:
			case uint32ArrayTag:
			case bigUint64ArrayTag:
			case int8ArrayTag:
			case int16ArrayTag:
			case int32ArrayTag:
			case bigInt64ArrayTag:
			case float32ArrayTag:
			case float64ArrayTag:
				if (isBuffer(a) !== isBuffer(b)) return false;
				if (a.length !== b.length) return false;
				for (let i = 0; i < a.length; i++) if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) return false;
				return true;
			case arrayBufferTag:
				if (a.byteLength !== b.byteLength) return false;
				return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
			case dataViewTag:
				if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) return false;
				return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
			case errorTag: return a.name === b.name && a.message === b.message;
			case objectTag: {
				if (!(areObjectsEqual(a.constructor, b.constructor, stack, areValuesEqual) || isPlainObject(a) && isPlainObject(b))) return false;
				const aKeys = [...Object.keys(a), ...getSymbols(a)];
				const bKeys = [...Object.keys(b), ...getSymbols(b)];
				if (aKeys.length !== bKeys.length) return false;
				for (let i = 0; i < aKeys.length; i++) {
					const propKey = aKeys[i];
					const aProp = a[propKey];
					if (!Object.hasOwn(b, propKey)) return false;
					const bProp = b[propKey];
					if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) return false;
				}
				return true;
			}
			default: return false;
		}
	} finally {
		stack.delete(a);
		stack.delete(b);
	}
}
function isEqual(a, b) {
	return isEqualWith(a, b, noop);
}
export { uint8ArrayTag as C, isEqualsSameValueZero as D, getSymbols as E, uint32ArrayTag as S, getTag as T, regexpTag as _, arrayTag as a, symbolTag as b, dateTag as c, int16ArrayTag as d, int32ArrayTag as f, objectTag as g, numberTag as h, arrayBufferTag as i, float32ArrayTag as l, mapTag as m, isBuffer as n, booleanTag as o, int8ArrayTag as p, argumentsTag as r, dataViewTag as s, isEqual as t, float64ArrayTag as u, setTag as v, uint8ClampedArrayTag as w, uint16ArrayTag as x, stringTag as y };
