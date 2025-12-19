import { K as _getNative_default, L as _toSource_default, P as isArray_default, R as _baseGetTag_default, T as _root_default, m as _Map_default, o as _overArg_default, q as isTypedArray_default, t as isBuffer_default, u as isArguments_default, v as _isPrototype_default, y as isArrayLike_default } from "./isArrayLikeObject-D_I98Q6J.js";
var WeakMap = _getNative_default(_root_default, "WeakMap");
var _WeakMap_default = WeakMap;
var nativeKeys = _overArg_default(Object.keys, Object);
var _nativeKeys_default = nativeKeys;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function baseKeys(object) {
	if (!_isPrototype_default(object)) return _nativeKeys_default(object);
	var result = [];
	for (var key in Object(object)) if (hasOwnProperty$1.call(object, key) && key != "constructor") result.push(key);
	return result;
}
var _baseKeys_default = baseKeys;
var DataView = _getNative_default(_root_default, "DataView");
var _DataView_default = DataView;
var Promise$1 = _getNative_default(_root_default, "Promise");
var _Promise_default = Promise$1;
var Set = _getNative_default(_root_default, "Set");
var _Set_default = Set;
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
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
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
export { isEmpty_default as b, _getTag_default as c, _Set_default as d, _baseKeys_default as e };
