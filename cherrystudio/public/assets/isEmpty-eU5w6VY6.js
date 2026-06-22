import { D as _root_default, S as _toSource_default, T as _baseGetTag_default, a as _overArg_default, b as _Map_default, c as isTypedArray_default, g as isArray_default, i as isArrayLike_default, m as isArguments_default, o as _isPrototype_default, p as isBuffer_default, x as _getNative_default } from "./_baseFor-DGqm56vS.js";
var _nativeKeys_default = _overArg_default(Object.keys, Object);
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function baseKeys(object) {
	if (!_isPrototype_default(object)) return _nativeKeys_default(object);
	var result = [];
	for (var key in Object(object)) if (hasOwnProperty$1.call(object, key) && key != "constructor") result.push(key);
	return result;
}
var _baseKeys_default = baseKeys;
var _DataView_default = _getNative_default(_root_default, "DataView");
var _Promise_default = _getNative_default(_root_default, "Promise");
var _Set_default = _getNative_default(_root_default, "Set");
var _WeakMap_default = _getNative_default(_root_default, "WeakMap");
var mapTag$1 = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = _toSource_default(_DataView_default), mapCtorString = _toSource_default(_Map_default), promiseCtorString = _toSource_default(_Promise_default), setCtorString = _toSource_default(_Set_default), weakMapCtorString = _toSource_default(_WeakMap_default);
var getTag = _baseGetTag_default;
if (_DataView_default && getTag(new _DataView_default(/* @__PURE__ */ new ArrayBuffer(1))) != dataViewTag || _Map_default && getTag(new _Map_default()) != mapTag$1 || _Promise_default && getTag(_Promise_default.resolve()) != promiseTag || _Set_default && getTag(new _Set_default()) != setTag$1 || _WeakMap_default && getTag(new _WeakMap_default()) != weakMapTag) getTag = function(value) {
	var result = _baseGetTag_default(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? _toSource_default(Ctor) : "";
	if (ctorString) switch (ctorString) {
		case dataViewCtorString: return dataViewTag;
		case mapCtorString: return mapTag$1;
		case promiseCtorString: return promiseTag;
		case setCtorString: return setTag$1;
		case weakMapCtorString: return weakMapTag;
	}
	return result;
};
var _getTag_default = getTag;
var mapTag = "[object Map]", setTag = "[object Set]";
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(value) {
	if (value == null) return true;
	if (isArrayLike_default(value) && (isArray_default(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer_default(value) || isTypedArray_default(value) || isArguments_default(value))) return !value.length;
	var tag = _getTag_default(value);
	if (tag == mapTag || tag == setTag) return !value.size;
	if (_isPrototype_default(value)) return !_baseKeys_default(value).length;
	for (var key in value) if (hasOwnProperty.call(value, key)) return false;
	return true;
}
var isEmpty_default = isEmpty;
export { _baseKeys_default as i, _getTag_default as n, _Set_default as r, isEmpty_default as t };
