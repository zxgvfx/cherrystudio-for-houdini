import { E as _arrayMap_default, d as _baseIteratee_default, l as _baseEach_default, s as _baseFlatten_default, y as isSymbol_default } from "./reduce-CsRsNN4I.js";
import { g as isArray_default, i as isArrayLike_default, n as identity_default } from "./_baseFor-Coo_DsK8.js";
function baseMap(collection, iteratee) {
	var index = -1, result = isArrayLike_default(collection) ? Array(collection.length) : [];
	_baseEach_default(collection, function(value, key, collection$1) {
		result[++index] = iteratee(value, key, collection$1);
	});
	return result;
}
var _baseMap_default = baseMap;
function map(collection, iteratee) {
	return (isArray_default(collection) ? _arrayMap_default : _baseMap_default)(collection, _baseIteratee_default(iteratee, 3));
}
var map_default = map;
function baseExtremum(array, iteratee, comparator) {
	var index = -1, length = array.length;
	while (++index < length) {
		var value = array[index], current = iteratee(value);
		if (current != null && (computed === void 0 ? current === current && !isSymbol_default(current) : comparator(current, computed))) var computed = current, result = value;
	}
	return result;
}
var _baseExtremum_default = baseExtremum;
function baseLt(value, other) {
	return value < other;
}
var _baseLt_default = baseLt;
function min(array) {
	return array && array.length ? _baseExtremum_default(array, identity_default, _baseLt_default) : void 0;
}
var min_default = min;
function flatten(array) {
	return (array == null ? 0 : array.length) ? _baseFlatten_default(array, 1) : [];
}
var flatten_default = flatten;
export { map_default as a, _baseExtremum_default as i, min_default as n, _baseMap_default as o, _baseLt_default as r, flatten_default as t };
