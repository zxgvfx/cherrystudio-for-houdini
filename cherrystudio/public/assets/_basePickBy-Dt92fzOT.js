import { A as _baseRest_default, D as _assignValue_default, E as eq_default, G as _isIndex_default, N as identity_default, O as isObject_default, P as isArray_default, Q as isObjectLike_default, R as _baseGetTag_default, n as keysIn_default, x as _isIterateeCall_default, y as isArrayLike_default } from "./isArrayLikeObject-CLvaVZ_f.js";
import { B as keys_default, E as _baseFindIndex_default, G as _arrayMap_default, H as isSymbol_default, k as _baseEach_default, m as _baseIteratee_default, p as _hasPath_default, w as _baseFlatten_default, x as _baseGet_default, y as _toKey_default, z as _castPath_default } from "./_baseUniq-a3tMHZXc.js";
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
	var index = string.length;
	while (index-- && reWhitespace.test(string.charAt(index)));
	return index;
}
var _trimmedEndIndex_default = trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim(string) {
	return string ? string.slice(0, _trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var _baseTrim_default = baseTrim;
var NAN = NaN;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
	if (typeof value == "number") return value;
	if (isSymbol_default(value)) return NAN;
	if (isObject_default(value)) {
		var other = typeof value.valueOf == "function" ? value.valueOf() : value;
		value = isObject_default(other) ? other + "" : other;
	}
	if (typeof value != "string") return value === 0 ? value : +value;
	value = _baseTrim_default(value);
	var isBinary = reIsBinary.test(value);
	return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;
var INFINITY = Infinity, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
	if (!value) return value === 0 ? value : 0;
	value = toNumber_default(value);
	if (value === INFINITY || value === -INFINITY) {
		var sign = value < 0 ? -1 : 1;
		return sign * MAX_INTEGER;
	}
	return value === value ? value : 0;
}
var toFinite_default = toFinite;
function toInteger(value) {
	var result = toFinite_default(value), remainder = result % 1;
	return result === result ? remainder ? result - remainder : result : 0;
}
var toInteger_default = toInteger;
function flatten(array) {
	var length = array == null ? 0 : array.length;
	return length ? _baseFlatten_default(array, 1) : [];
}
var flatten_default = flatten;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
var defaults = _baseRest_default(function(object, sources) {
	object = Object(object);
	var index = -1;
	var length = sources.length;
	var guard = length > 2 ? sources[2] : void 0;
	if (guard && _isIterateeCall_default(sources[0], sources[1], guard)) length = 1;
	while (++index < length) {
		var source = sources[index];
		var props = keysIn_default(source);
		var propsIndex = -1;
		var propsLength = props.length;
		while (++propsIndex < propsLength) {
			var key = props[propsIndex];
			var value = object[key];
			if (value === void 0 || eq_default(value, objectProto$1[key]) && !hasOwnProperty$1.call(object, key)) object[key] = source[key];
		}
	}
	return object;
});
var defaults_default = defaults;
function last(array) {
	var length = array == null ? 0 : array.length;
	return length ? array[length - 1] : void 0;
}
var last_default = last;
function createFind(findIndexFunc) {
	return function(collection, predicate, fromIndex) {
		var iterable = Object(collection);
		if (!isArrayLike_default(collection)) {
			var iteratee = _baseIteratee_default(predicate, 3);
			collection = keys_default(collection);
			predicate = function(key) {
				return iteratee(iterable[key], key, iterable);
			};
		}
		var index = findIndexFunc(collection, predicate, fromIndex);
		return index > -1 ? iterable[iteratee ? collection[index] : index] : void 0;
	};
}
var _createFind_default = createFind;
var nativeMax = Math.max;
function findIndex(array, predicate, fromIndex) {
	var length = array == null ? 0 : array.length;
	if (!length) return -1;
	var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
	if (index < 0) index = nativeMax(length + index, 0);
	return _baseFindIndex_default(array, _baseIteratee_default(predicate, 3), index);
}
var findIndex_default = findIndex;
var find = _createFind_default(findIndex_default);
var find_default = find;
function baseMap(collection, iteratee) {
	var index = -1, result = isArrayLike_default(collection) ? Array(collection.length) : [];
	_baseEach_default(collection, function(value, key, collection$1) {
		result[++index] = iteratee(value, key, collection$1);
	});
	return result;
}
var _baseMap_default = baseMap;
function map(collection, iteratee) {
	var func = isArray_default(collection) ? _arrayMap_default : _baseMap_default;
	return func(collection, _baseIteratee_default(iteratee, 3));
}
var map_default = map;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseHas(object, key) {
	return object != null && hasOwnProperty.call(object, key);
}
var _baseHas_default = baseHas;
function has(object, path) {
	return object != null && _hasPath_default(object, path, _baseHas_default);
}
var has_default = has;
var stringTag = "[object String]";
function isString(value) {
	return typeof value == "string" || !isArray_default(value) && isObjectLike_default(value) && _baseGetTag_default(value) == stringTag;
}
var isString_default = isString;
function baseLt(value, other) {
	return value < other;
}
var _baseLt_default = baseLt;
function baseExtremum(array, iteratee, comparator) {
	var index = -1, length = array.length;
	while (++index < length) {
		var value = array[index], current = iteratee(value);
		if (current != null && (computed === void 0 ? current === current && !isSymbol_default(current) : comparator(current, computed))) var computed = current, result = value;
	}
	return result;
}
var _baseExtremum_default = baseExtremum;
function min(array) {
	return array && array.length ? _baseExtremum_default(array, identity_default, _baseLt_default) : void 0;
}
var min_default = min;
function baseSet(object, path, value, customizer) {
	if (!isObject_default(object)) return object;
	path = _castPath_default(path, object);
	var index = -1, length = path.length, lastIndex = length - 1, nested = object;
	while (nested != null && ++index < length) {
		var key = _toKey_default(path[index]), newValue = value;
		if (key === "__proto__" || key === "constructor" || key === "prototype") return object;
		if (index != lastIndex) {
			var objValue = nested[key];
			newValue = customizer ? customizer(objValue, key, nested) : void 0;
			if (newValue === void 0) newValue = isObject_default(objValue) ? objValue : _isIndex_default(path[index + 1]) ? [] : {};
		}
		_assignValue_default(nested, key, newValue);
		nested = nested[key];
	}
	return object;
}
var _baseSet_default = baseSet;
function basePickBy(object, paths, predicate) {
	var index = -1, length = paths.length, result = {};
	while (++index < length) {
		var path = paths[index], value = _baseGet_default(object, path);
		if (predicate(value, path)) _baseSet_default(result, _castPath_default(path, object), value);
	}
	return result;
}
var _basePickBy_default = basePickBy;
export { _basePickBy_default as b, min_default as c, _baseExtremum_default as d, _baseLt_default as e, isString_default as f, has_default as g, map_default as h, _baseMap_default as i, find_default as j, last_default as k, defaults_default as l, flatten_default as m, toInteger_default as n, toFinite_default as o };
