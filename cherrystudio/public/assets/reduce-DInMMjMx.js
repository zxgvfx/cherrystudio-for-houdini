import { E as _Symbol_default, O as eq_default, T as _baseGetTag_default, _ as _Uint8Array_default, c as isTypedArray_default, d as isLength_default, f as _isIndex_default, g as isArray_default, h as isObjectLike_default, i as isArrayLike_default, m as isArguments_default, n as identity_default, p as isBuffer_default, r as memoize_default, s as _arrayLikeKeys_default, t as _baseFor_default, v as _Stack_default, w as isObject_default, y as _MapCache_default } from "./_baseFor-DopXmZGg.js";
import { i as _baseKeys_default, n as _getTag_default, r as _Set_default } from "./isEmpty--rBKRpEP.js";
function arrayMap(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length, result = Array(length);
	while (++index < length) result[index] = iteratee(array[index], index, array);
	return result;
}
var _arrayMap_default = arrayMap;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
	this.__data__.set(value, HASH_UNDEFINED);
	return this;
}
var _setCacheAdd_default = setCacheAdd;
function setCacheHas(value) {
	return this.__data__.has(value);
}
var _setCacheHas_default = setCacheHas;
function SetCache(values) {
	var index = -1, length = values == null ? 0 : values.length;
	this.__data__ = new _MapCache_default();
	while (++index < length) this.add(values[index]);
}
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd_default;
SetCache.prototype.has = _setCacheHas_default;
var _SetCache_default = SetCache;
function arraySome(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (predicate(array[index], index, array)) return true;
	return false;
}
var _arraySome_default = arraySome;
function cacheHas(cache, key) {
	return cache.has(key);
}
var _cacheHas_default = cacheHas;
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
	if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
	var arrStacked = stack.get(array);
	var othStacked = stack.get(other);
	if (arrStacked && othStacked) return arrStacked == other && othStacked == array;
	var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new _SetCache_default() : void 0;
	stack.set(array, other);
	stack.set(other, array);
	while (++index < arrLength) {
		var arrValue = array[index], othValue = other[index];
		if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
		if (compared !== void 0) {
			if (compared) continue;
			result = false;
			break;
		}
		if (seen) {
			if (!_arraySome_default(other, function(othValue$1, othIndex) {
				if (!_cacheHas_default(seen, othIndex) && (arrValue === othValue$1 || equalFunc(arrValue, othValue$1, bitmask, customizer, stack))) return seen.push(othIndex);
			})) {
				result = false;
				break;
			}
		} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
			result = false;
			break;
		}
	}
	stack["delete"](array);
	stack["delete"](other);
	return result;
}
var _equalArrays_default = equalArrays;
function mapToArray(map) {
	var index = -1, result = Array(map.size);
	map.forEach(function(value, key) {
		result[++index] = [key, value];
	});
	return result;
}
var _mapToArray_default = mapToArray;
function setToArray(set) {
	var index = -1, result = Array(set.size);
	set.forEach(function(value) {
		result[++index] = value;
	});
	return result;
}
var _setToArray_default = setToArray;
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto$1 = _Symbol_default ? _Symbol_default.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	switch (tag) {
		case dataViewTag:
			if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
			object = object.buffer;
			other = other.buffer;
		case arrayBufferTag:
			if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array_default(object), new _Uint8Array_default(other))) return false;
			return true;
		case boolTag:
		case dateTag:
		case numberTag: return eq_default(+object, +other);
		case errorTag: return object.name == other.name && object.message == other.message;
		case regexpTag:
		case stringTag: return object == other + "";
		case mapTag: var convert = _mapToArray_default;
		case setTag:
			var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
			convert || (convert = _setToArray_default);
			if (object.size != other.size && !isPartial) return false;
			var stacked = stack.get(object);
			if (stacked) return stacked == other;
			bitmask |= COMPARE_UNORDERED_FLAG$2;
			stack.set(object, other);
			var result = _equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
			stack["delete"](object);
			return result;
		case symbolTag$1: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
	}
	return false;
}
var _equalByTag_default = equalByTag;
function arrayPush(array, values) {
	var index = -1, length = values.length, offset = array.length;
	while (++index < length) array[offset + index] = values[index];
	return array;
}
var _arrayPush_default = arrayPush;
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	var result = keysFunc(object);
	return isArray_default(object) ? result : _arrayPush_default(result, symbolsFunc(object));
}
var _baseGetAllKeys_default = baseGetAllKeys;
function arrayFilter(array, predicate) {
	var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
	while (++index < length) {
		var value = array[index];
		if (predicate(value, index, array)) result[resIndex++] = value;
	}
	return result;
}
var _arrayFilter_default = arrayFilter;
function stubArray() {
	return [];
}
var stubArray_default = stubArray;
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var _getSymbols_default = !nativeGetSymbols ? stubArray_default : function(object) {
	if (object == null) return [];
	object = Object(object);
	return _arrayFilter_default(nativeGetSymbols(object), function(symbol) {
		return propertyIsEnumerable.call(object, symbol);
	});
};
function keys(object) {
	return isArrayLike_default(object) ? _arrayLikeKeys_default(object) : _baseKeys_default(object);
}
var keys_default = keys;
function getAllKeys(object) {
	return _baseGetAllKeys_default(object, keys_default, _getSymbols_default);
}
var _getAllKeys_default = getAllKeys;
var COMPARE_PARTIAL_FLAG$3 = 1;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = _getAllKeys_default(object), objLength = objProps.length;
	if (objLength != _getAllKeys_default(other).length && !isPartial) return false;
	var index = objLength;
	while (index--) {
		var key = objProps[index];
		if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) return false;
	}
	var objStacked = stack.get(object);
	var othStacked = stack.get(other);
	if (objStacked && othStacked) return objStacked == other && othStacked == object;
	var result = true;
	stack.set(object, other);
	stack.set(other, object);
	var skipCtor = isPartial;
	while (++index < objLength) {
		key = objProps[index];
		var objValue = object[key], othValue = other[key];
		if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
		if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
			result = false;
			break;
		}
		skipCtor || (skipCtor = key == "constructor");
	}
	if (result && !skipCtor) {
		var objCtor = object.constructor, othCtor = other.constructor;
		if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
	}
	stack["delete"](object);
	stack["delete"](other);
	return result;
}
var _equalObjects_default = equalObjects;
var COMPARE_PARTIAL_FLAG$2 = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var hasOwnProperty = Object.prototype.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag : _getTag_default(object), othTag = othIsArr ? arrayTag : _getTag_default(other);
	objTag = objTag == argsTag ? objectTag : objTag;
	othTag = othTag == argsTag ? objectTag : othTag;
	var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
	if (isSameTag && isBuffer_default(object)) {
		if (!isBuffer_default(other)) return false;
		objIsArr = true;
		objIsObj = false;
	}
	if (isSameTag && !objIsObj) {
		stack || (stack = new _Stack_default());
		return objIsArr || isTypedArray_default(object) ? _equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
	}
	if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
		var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
		if (objIsWrapped || othIsWrapped) {
			var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
			stack || (stack = new _Stack_default());
			return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
		}
	}
	if (!isSameTag) return false;
	stack || (stack = new _Stack_default());
	return _equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep_default = baseIsEqualDeep;
function baseIsEqual(value, other, bitmask, customizer, stack) {
	if (value === other) return true;
	if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) return value !== value && other !== other;
	return _baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
}
var _baseIsEqual_default = baseIsEqual;
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch(object, source, matchData, customizer) {
	var index = matchData.length, length = index, noCustomizer = !customizer;
	if (object == null) return !length;
	object = Object(object);
	while (index--) {
		var data = matchData[index];
		if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return false;
	}
	while (++index < length) {
		data = matchData[index];
		var key = data[0], objValue = object[key], srcValue = data[1];
		if (noCustomizer && data[2]) {
			if (objValue === void 0 && !(key in object)) return false;
		} else {
			var stack = new _Stack_default();
			if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
			if (!(result === void 0 ? _baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) return false;
		}
	}
	return true;
}
var _baseIsMatch_default = baseIsMatch;
function isStrictComparable(value) {
	return value === value && !isObject_default(value);
}
var _isStrictComparable_default = isStrictComparable;
function getMatchData(object) {
	var result = keys_default(object), length = result.length;
	while (length--) {
		var key = result[length], value = object[key];
		result[length] = [
			key,
			value,
			_isStrictComparable_default(value)
		];
	}
	return result;
}
var _getMatchData_default = getMatchData;
function matchesStrictComparable(key, srcValue) {
	return function(object) {
		if (object == null) return false;
		return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
	};
}
var _matchesStrictComparable_default = matchesStrictComparable;
function baseMatches(source) {
	var matchData = _getMatchData_default(source);
	if (matchData.length == 1 && matchData[0][2]) return _matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
	return function(object) {
		return object === source || _baseIsMatch_default(object, source, matchData);
	};
}
var _baseMatches_default = baseMatches;
var symbolTag = "[object Symbol]";
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike_default(value) && _baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
	if (isArray_default(value)) return false;
	var type = typeof value;
	if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) return true;
	return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var _isKey_default = isKey;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
	var result = memoize_default(func, function(key) {
		if (cache.size === MAX_MEMOIZE_SIZE) cache.clear();
		return key;
	});
	var cache = result.cache;
	return result;
}
var _memoizeCapped_default = memoizeCapped;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var _stringToPath_default = _memoizeCapped_default(function(string) {
	var result = [];
	if (string.charCodeAt(0) === 46) result.push("");
	string.replace(rePropName, function(match, number, quote, subString) {
		result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
	});
	return result;
});
var INFINITY$1 = Infinity;
var symbolProto = _Symbol_default ? _Symbol_default.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
	if (typeof value == "string") return value;
	if (isArray_default(value)) return _arrayMap_default(value, baseToString) + "";
	if (isSymbol_default(value)) return symbolToString ? symbolToString.call(value) : "";
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var _baseToString_default = baseToString;
function toString(value) {
	return value == null ? "" : _baseToString_default(value);
}
var toString_default = toString;
function castPath(value, object) {
	if (isArray_default(value)) return value;
	return _isKey_default(value, object) ? [value] : _stringToPath_default(toString_default(value));
}
var _castPath_default = castPath;
var INFINITY = Infinity;
function toKey(value) {
	if (typeof value == "string" || isSymbol_default(value)) return value;
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _toKey_default = toKey;
function baseGet(object, path) {
	path = _castPath_default(path, object);
	var index = 0, length = path.length;
	while (object != null && index < length) object = object[_toKey_default(path[index++])];
	return index && index == length ? object : void 0;
}
var _baseGet_default = baseGet;
function get(object, path, defaultValue) {
	var result = object == null ? void 0 : _baseGet_default(object, path);
	return result === void 0 ? defaultValue : result;
}
var get_default = get;
function baseHasIn(object, key) {
	return object != null && key in Object(object);
}
var _baseHasIn_default = baseHasIn;
function hasPath(object, path, hasFunc) {
	path = _castPath_default(path, object);
	var index = -1, length = path.length, result = false;
	while (++index < length) {
		var key = _toKey_default(path[index]);
		if (!(result = object != null && hasFunc(object, key))) break;
		object = object[key];
	}
	if (result || ++index != length) return result;
	length = object == null ? 0 : object.length;
	return !!length && isLength_default(length) && _isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
}
var _hasPath_default = hasPath;
function hasIn(object, path) {
	return object != null && _hasPath_default(object, path, _baseHasIn_default);
}
var hasIn_default = hasIn;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
	if (_isKey_default(path) && _isStrictComparable_default(srcValue)) return _matchesStrictComparable_default(_toKey_default(path), srcValue);
	return function(object) {
		var objValue = get_default(object, path);
		return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : _baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	};
}
var _baseMatchesProperty_default = baseMatchesProperty;
function baseProperty(key) {
	return function(object) {
		return object == null ? void 0 : object[key];
	};
}
var _baseProperty_default = baseProperty;
function basePropertyDeep(path) {
	return function(object) {
		return _baseGet_default(object, path);
	};
}
var _basePropertyDeep_default = basePropertyDeep;
function property(path) {
	return _isKey_default(path) ? _baseProperty_default(_toKey_default(path)) : _basePropertyDeep_default(path);
}
var property_default = property;
function baseIteratee(value) {
	if (typeof value == "function") return value;
	if (value == null) return identity_default;
	if (typeof value == "object") return isArray_default(value) ? _baseMatchesProperty_default(value[0], value[1]) : _baseMatches_default(value);
	return property_default(value);
}
var _baseIteratee_default = baseIteratee;
function baseForOwn(object, iteratee) {
	return object && _baseFor_default(object, iteratee, keys_default);
}
var _baseForOwn_default = baseForOwn;
function createBaseEach(eachFunc, fromRight) {
	return function(collection, iteratee) {
		if (collection == null) return collection;
		if (!isArrayLike_default(collection)) return eachFunc(collection, iteratee);
		var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
		while (fromRight ? index-- : ++index < length) if (iteratee(iterable[index], index, iterable) === false) break;
		return collection;
	};
}
var _baseEach_default = createBaseEach(_baseForOwn_default);
function baseFilter(collection, predicate) {
	var result = [];
	_baseEach_default(collection, function(value, index, collection$1) {
		if (predicate(value, index, collection$1)) result.push(value);
	});
	return result;
}
var _baseFilter_default = baseFilter;
function filter(collection, predicate) {
	return (isArray_default(collection) ? _arrayFilter_default : _baseFilter_default)(collection, _baseIteratee_default(predicate, 3));
}
var filter_default = filter;
var spreadableSymbol = _Symbol_default ? _Symbol_default.isConcatSpreadable : void 0;
function isFlattenable(value) {
	return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var _isFlattenable_default = isFlattenable;
function baseFlatten(array, depth, predicate, isStrict, result) {
	var index = -1, length = array.length;
	predicate || (predicate = _isFlattenable_default);
	result || (result = []);
	while (++index < length) {
		var value = array[index];
		if (depth > 0 && predicate(value)) if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
		else _arrayPush_default(result, value);
		else if (!isStrict) result[result.length] = value;
	}
	return result;
}
var _baseFlatten_default = baseFlatten;
function baseFindIndex(array, predicate, fromIndex, fromRight) {
	var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
	while (fromRight ? index-- : ++index < length) if (predicate(array[index], index, array)) return index;
	return -1;
}
var _baseFindIndex_default = baseFindIndex;
function baseIsNaN(value) {
	return value !== value;
}
var _baseIsNaN_default = baseIsNaN;
function strictIndexOf(array, value, fromIndex) {
	var index = fromIndex - 1, length = array.length;
	while (++index < length) if (array[index] === value) return index;
	return -1;
}
var _strictIndexOf_default = strictIndexOf;
function baseIndexOf(array, value, fromIndex) {
	return value === value ? _strictIndexOf_default(array, value, fromIndex) : _baseFindIndex_default(array, _baseIsNaN_default, fromIndex);
}
var _baseIndexOf_default = baseIndexOf;
function arrayIncludes(array, value) {
	return !!(array == null ? 0 : array.length) && _baseIndexOf_default(array, value, 0) > -1;
}
var _arrayIncludes_default = arrayIncludes;
function arrayIncludesWith(array, value, comparator) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (comparator(value, array[index])) return true;
	return false;
}
var _arrayIncludesWith_default = arrayIncludesWith;
function noop() {}
var noop_default = noop;
var _createSet_default = !(_Set_default && 1 / _setToArray_default(new _Set_default([, -0]))[1] == Infinity) ? noop_default : function(values) {
	return new _Set_default(values);
};
var LARGE_ARRAY_SIZE = 200;
function baseUniq(array, iteratee, comparator) {
	var index = -1, includes = _arrayIncludes_default, length = array.length, isCommon = true, result = [], seen = result;
	if (comparator) {
		isCommon = false;
		includes = _arrayIncludesWith_default;
	} else if (length >= LARGE_ARRAY_SIZE) {
		var set = iteratee ? null : _createSet_default(array);
		if (set) return _setToArray_default(set);
		isCommon = false;
		includes = _cacheHas_default;
		seen = new _SetCache_default();
	} else seen = iteratee ? [] : result;
	outer: while (++index < length) {
		var value = array[index], computed = iteratee ? iteratee(value) : value;
		value = comparator || value !== 0 ? value : 0;
		if (isCommon && computed === computed) {
			var seenIndex = seen.length;
			while (seenIndex--) if (seen[seenIndex] === computed) continue outer;
			if (iteratee) seen.push(computed);
			result.push(value);
		} else if (!includes(seen, computed, comparator)) {
			if (seen !== result) seen.push(computed);
			result.push(value);
		}
	}
	return result;
}
var _baseUniq_default = baseUniq;
function arrayEach(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (iteratee(array[index], index, array) === false) break;
	return array;
}
var _arrayEach_default = arrayEach;
function castFunction(value) {
	return typeof value == "function" ? value : identity_default;
}
var _castFunction_default = castFunction;
function forEach(collection, iteratee) {
	return (isArray_default(collection) ? _arrayEach_default : _baseEach_default)(collection, _castFunction_default(iteratee));
}
var forEach_default = forEach;
function arrayReduce(array, iteratee, accumulator, initAccum) {
	var index = -1, length = array == null ? 0 : array.length;
	if (initAccum && length) accumulator = array[++index];
	while (++index < length) accumulator = iteratee(accumulator, array[index], index, array);
	return accumulator;
}
var _arrayReduce_default = arrayReduce;
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	eachFunc(collection, function(value, index, collection$1) {
		accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection$1);
	});
	return accumulator;
}
var _baseReduce_default = baseReduce;
function reduce(collection, iteratee, accumulator) {
	var func = isArray_default(collection) ? _arrayReduce_default : _baseReduce_default, initAccum = arguments.length < 3;
	return func(collection, _baseIteratee_default(iteratee, 4), accumulator, initAccum, _baseEach_default);
}
var reduce_default = reduce;
export { stubArray_default as C, _arrayMap_default as E, _getSymbols_default as S, _arrayPush_default as T, _castPath_default as _, _baseUniq_default as a, _getAllKeys_default as b, filter_default as c, _baseIteratee_default as d, _baseProperty_default as f, _toKey_default as g, _baseGet_default as h, _arrayEach_default as i, _baseEach_default as l, _hasPath_default as m, forEach_default as n, _baseFindIndex_default as o, hasIn_default as p, _castFunction_default as r, _baseFlatten_default as s, reduce_default as t, _baseForOwn_default as u, toString_default as v, _baseGetAllKeys_default as w, keys_default as x, isSymbol_default as y };
