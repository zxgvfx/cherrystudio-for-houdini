import { C as stubArray_default, E as _arrayMap_default, S as _getSymbols_default, T as _arrayPush_default, a as _baseUniq_default, b as _getAllKeys_default, c as filter_default, i as _arrayEach_default, n as forEach_default, s as _baseFlatten_default, t as reduce_default, w as _baseGetAllKeys_default, x as keys_default } from "./reduce-CBXB-mBy.js";
import { C as isFunction_default, E as _Symbol_default, g as isArray_default, h as isObjectLike_default, l as _nodeUtil_default, p as isBuffer_default, u as _baseUnary_default, v as _Stack_default, w as isObject_default } from "./_baseFor-DGqm56vS.js";
import { n as _getTag_default, t as isEmpty_default } from "./isEmpty-eU5w6VY6.js";
import { A as _copyArray_default, D as isArrayLikeObject_default, E as _assignValue_default, M as _cloneArrayBuffer_default, N as _cloneBuffer_default, O as _initCloneObject_default, S as constant_default, T as _copyObject_default, b as _baseRest_default, j as _cloneTypedArray_default, k as _getPrototype_default, w as keysIn_default } from "./chunk-S3R3BYOJ-SD49tN4s.js";
function baseAssign(object, source) {
	return object && _copyObject_default(source, keys_default(source), object);
}
var _baseAssign_default = baseAssign;
function baseAssignIn(object, source) {
	return object && _copyObject_default(source, keysIn_default(source), object);
}
var _baseAssignIn_default = baseAssignIn;
function copySymbols(source, object) {
	return _copyObject_default(source, _getSymbols_default(source), object);
}
var _copySymbols_default = copySymbols;
var _getSymbolsIn_default = !Object.getOwnPropertySymbols ? stubArray_default : function(object) {
	var result = [];
	while (object) {
		_arrayPush_default(result, _getSymbols_default(object));
		object = _getPrototype_default(object);
	}
	return result;
};
function copySymbolsIn(source, object) {
	return _copyObject_default(source, _getSymbolsIn_default(source), object);
}
var _copySymbolsIn_default = copySymbolsIn;
function getAllKeysIn(object) {
	return _baseGetAllKeys_default(object, keysIn_default, _getSymbolsIn_default);
}
var _getAllKeysIn_default = getAllKeysIn;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function initCloneArray(array) {
	var length = array.length, result = new array.constructor(length);
	if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
		result.index = array.index;
		result.input = array.input;
	}
	return result;
}
var _initCloneArray_default = initCloneArray;
function cloneDataView(dataView, isDeep) {
	var buffer = isDeep ? _cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
	return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView_default = cloneDataView;
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
	var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	result.lastIndex = regexp.lastIndex;
	return result;
}
var _cloneRegExp_default = cloneRegExp;
var symbolProto = _Symbol_default ? _Symbol_default.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
	return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol_default = cloneSymbol;
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
	var Ctor = object.constructor;
	switch (tag) {
		case arrayBufferTag$1: return _cloneArrayBuffer_default(object);
		case boolTag$1:
		case dateTag$1: return new Ctor(+object);
		case dataViewTag$1: return _cloneDataView_default(object, isDeep);
		case float32Tag$1:
		case float64Tag$1:
		case int8Tag$1:
		case int16Tag$1:
		case int32Tag$1:
		case uint8Tag$1:
		case uint8ClampedTag$1:
		case uint16Tag$1:
		case uint32Tag$1: return _cloneTypedArray_default(object, isDeep);
		case mapTag$2: return new Ctor();
		case numberTag$1:
		case stringTag$1: return new Ctor(object);
		case regexpTag$1: return _cloneRegExp_default(object);
		case setTag$2: return new Ctor();
		case symbolTag$1: return _cloneSymbol_default(object);
	}
}
var _initCloneByTag_default = initCloneByTag;
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
	return isObjectLike_default(value) && _getTag_default(value) == mapTag$1;
}
var _baseIsMap_default = baseIsMap;
var nodeIsMap = _nodeUtil_default && _nodeUtil_default.isMap;
var isMap_default = nodeIsMap ? _baseUnary_default(nodeIsMap) : _baseIsMap_default;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
	return isObjectLike_default(value) && _getTag_default(value) == setTag$1;
}
var _baseIsSet_default = baseIsSet;
var nodeIsSet = _nodeUtil_default && _nodeUtil_default.isSet;
var isSet_default = nodeIsSet ? _baseUnary_default(nodeIsSet) : _baseIsSet_default;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
	var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
	if (customizer) result = object ? customizer(value, key, object, stack) : customizer(value);
	if (result !== void 0) return result;
	if (!isObject_default(value)) return value;
	var isArr = isArray_default(value);
	if (isArr) {
		result = _initCloneArray_default(value);
		if (!isDeep) return _copyArray_default(value, result);
	} else {
		var tag = _getTag_default(value), isFunc = tag == funcTag || tag == genTag;
		if (isBuffer_default(value)) return _cloneBuffer_default(value, isDeep);
		if (tag == objectTag || tag == argsTag || isFunc && !object) {
			result = isFlat || isFunc ? {} : _initCloneObject_default(value);
			if (!isDeep) return isFlat ? _copySymbolsIn_default(value, _baseAssignIn_default(result, value)) : _copySymbols_default(value, _baseAssign_default(result, value));
		} else {
			if (!cloneableTags[tag]) return object ? value : {};
			result = _initCloneByTag_default(value, tag, isDeep);
		}
	}
	stack || (stack = new _Stack_default());
	var stacked = stack.get(value);
	if (stacked) return stacked;
	stack.set(value, result);
	if (isSet_default(value)) value.forEach(function(subValue) {
		result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	});
	else if (isMap_default(value)) value.forEach(function(subValue, key$1) {
		result.set(key$1, baseClone(subValue, bitmask, customizer, key$1, value, stack));
	});
	var props = isArr ? void 0 : (isFull ? isFlat ? _getAllKeysIn_default : _getAllKeys_default : isFlat ? keysIn_default : keys_default)(value);
	_arrayEach_default(props || value, function(subValue, key$1) {
		if (props) {
			key$1 = subValue;
			subValue = value[key$1];
		}
		_assignValue_default(result, key$1, baseClone(subValue, bitmask, customizer, key$1, value, stack));
	});
	return result;
}
var _baseClone_default = baseClone;
function baseValues(object, props) {
	return _arrayMap_default(props, function(key) {
		return object[key];
	});
}
var _baseValues_default = baseValues;
function values(object) {
	return object == null ? [] : _baseValues_default(object, keys_default(object));
}
var values_default = values;
function isUndefined(value) {
	return value === void 0;
}
var isUndefined_default = isUndefined;
var union_default = _baseRest_default(function(arrays) {
	return _baseUniq_default(_baseFlatten_default(arrays, 1, isArrayLikeObject_default, true));
});
var DEFAULT_EDGE_NAME = "\0";
var GRAPH_NODE = "\0";
var EDGE_KEY_DELIM = "";
var Graph = class {
	constructor(opts = {}) {
		this._isDirected = Object.prototype.hasOwnProperty.call(opts, "directed") ? opts.directed : true;
		this._isMultigraph = Object.prototype.hasOwnProperty.call(opts, "multigraph") ? opts.multigraph : false;
		this._isCompound = Object.prototype.hasOwnProperty.call(opts, "compound") ? opts.compound : false;
		this._label = void 0;
		this._defaultNodeLabelFn = constant_default(void 0);
		this._defaultEdgeLabelFn = constant_default(void 0);
		this._nodes = {};
		if (this._isCompound) {
			this._parent = {};
			this._children = {};
			this._children[GRAPH_NODE] = {};
		}
		this._in = {};
		this._preds = {};
		this._out = {};
		this._sucs = {};
		this._edgeObjs = {};
		this._edgeLabels = {};
	}
	isDirected() {
		return this._isDirected;
	}
	isMultigraph() {
		return this._isMultigraph;
	}
	isCompound() {
		return this._isCompound;
	}
	setGraph(label) {
		this._label = label;
		return this;
	}
	graph() {
		return this._label;
	}
	setDefaultNodeLabel(newDefault) {
		if (!isFunction_default(newDefault)) newDefault = constant_default(newDefault);
		this._defaultNodeLabelFn = newDefault;
		return this;
	}
	nodeCount() {
		return this._nodeCount;
	}
	nodes() {
		return keys_default(this._nodes);
	}
	sources() {
		var self = this;
		return filter_default(this.nodes(), function(v) {
			return isEmpty_default(self._in[v]);
		});
	}
	sinks() {
		var self = this;
		return filter_default(this.nodes(), function(v) {
			return isEmpty_default(self._out[v]);
		});
	}
	setNodes(vs, value) {
		var args = arguments;
		var self = this;
		forEach_default(vs, function(v) {
			if (args.length > 1) self.setNode(v, value);
			else self.setNode(v);
		});
		return this;
	}
	setNode(v, value) {
		if (Object.prototype.hasOwnProperty.call(this._nodes, v)) {
			if (arguments.length > 1) this._nodes[v] = value;
			return this;
		}
		this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
		if (this._isCompound) {
			this._parent[v] = GRAPH_NODE;
			this._children[v] = {};
			this._children[GRAPH_NODE][v] = true;
		}
		this._in[v] = {};
		this._preds[v] = {};
		this._out[v] = {};
		this._sucs[v] = {};
		++this._nodeCount;
		return this;
	}
	node(v) {
		return this._nodes[v];
	}
	hasNode(v) {
		return Object.prototype.hasOwnProperty.call(this._nodes, v);
	}
	removeNode(v) {
		if (Object.prototype.hasOwnProperty.call(this._nodes, v)) {
			var removeEdge = (e) => this.removeEdge(this._edgeObjs[e]);
			delete this._nodes[v];
			if (this._isCompound) {
				this._removeFromParentsChildList(v);
				delete this._parent[v];
				forEach_default(this.children(v), (child) => {
					this.setParent(child);
				});
				delete this._children[v];
			}
			forEach_default(keys_default(this._in[v]), removeEdge);
			delete this._in[v];
			delete this._preds[v];
			forEach_default(keys_default(this._out[v]), removeEdge);
			delete this._out[v];
			delete this._sucs[v];
			--this._nodeCount;
		}
		return this;
	}
	setParent(v, parent) {
		if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
		if (isUndefined_default(parent)) parent = GRAPH_NODE;
		else {
			parent += "";
			for (var ancestor = parent; !isUndefined_default(ancestor); ancestor = this.parent(ancestor)) if (ancestor === v) throw new Error("Setting " + parent + " as parent of " + v + " would create a cycle");
			this.setNode(parent);
		}
		this.setNode(v);
		this._removeFromParentsChildList(v);
		this._parent[v] = parent;
		this._children[parent][v] = true;
		return this;
	}
	_removeFromParentsChildList(v) {
		delete this._children[this._parent[v]][v];
	}
	parent(v) {
		if (this._isCompound) {
			var parent = this._parent[v];
			if (parent !== GRAPH_NODE) return parent;
		}
	}
	children(v) {
		if (isUndefined_default(v)) v = GRAPH_NODE;
		if (this._isCompound) {
			var children = this._children[v];
			if (children) return keys_default(children);
		} else if (v === GRAPH_NODE) return this.nodes();
		else if (this.hasNode(v)) return [];
	}
	predecessors(v) {
		var predsV = this._preds[v];
		if (predsV) return keys_default(predsV);
	}
	successors(v) {
		var sucsV = this._sucs[v];
		if (sucsV) return keys_default(sucsV);
	}
	neighbors(v) {
		var preds = this.predecessors(v);
		if (preds) return union_default(preds, this.successors(v));
	}
	isLeaf(v) {
		var neighbors;
		if (this.isDirected()) neighbors = this.successors(v);
		else neighbors = this.neighbors(v);
		return neighbors.length === 0;
	}
	filterNodes(filter) {
		var copy = new this.constructor({
			directed: this._isDirected,
			multigraph: this._isMultigraph,
			compound: this._isCompound
		});
		copy.setGraph(this.graph());
		var self = this;
		forEach_default(this._nodes, function(value, v) {
			if (filter(v)) copy.setNode(v, value);
		});
		forEach_default(this._edgeObjs, function(e) {
			if (copy.hasNode(e.v) && copy.hasNode(e.w)) copy.setEdge(e, self.edge(e));
		});
		var parents = {};
		function findParent(v) {
			var parent = self.parent(v);
			if (parent === void 0 || copy.hasNode(parent)) {
				parents[v] = parent;
				return parent;
			} else if (parent in parents) return parents[parent];
			else return findParent(parent);
		}
		if (this._isCompound) forEach_default(copy.nodes(), function(v) {
			copy.setParent(v, findParent(v));
		});
		return copy;
	}
	setDefaultEdgeLabel(newDefault) {
		if (!isFunction_default(newDefault)) newDefault = constant_default(newDefault);
		this._defaultEdgeLabelFn = newDefault;
		return this;
	}
	edgeCount() {
		return this._edgeCount;
	}
	edges() {
		return values_default(this._edgeObjs);
	}
	setPath(vs, value) {
		var self = this;
		var args = arguments;
		reduce_default(vs, function(v, w) {
			if (args.length > 1) self.setEdge(v, w, value);
			else self.setEdge(v, w);
			return w;
		});
		return this;
	}
	setEdge() {
		var v, w, name, value;
		var valueSpecified = false;
		var arg0 = arguments[0];
		if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
			v = arg0.v;
			w = arg0.w;
			name = arg0.name;
			if (arguments.length === 2) {
				value = arguments[1];
				valueSpecified = true;
			}
		} else {
			v = arg0;
			w = arguments[1];
			name = arguments[3];
			if (arguments.length > 2) {
				value = arguments[2];
				valueSpecified = true;
			}
		}
		v = "" + v;
		w = "" + w;
		if (!isUndefined_default(name)) name = "" + name;
		var e = edgeArgsToId(this._isDirected, v, w, name);
		if (Object.prototype.hasOwnProperty.call(this._edgeLabels, e)) {
			if (valueSpecified) this._edgeLabels[e] = value;
			return this;
		}
		if (!isUndefined_default(name) && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
		this.setNode(v);
		this.setNode(w);
		this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);
		var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
		v = edgeObj.v;
		w = edgeObj.w;
		Object.freeze(edgeObj);
		this._edgeObjs[e] = edgeObj;
		incrementOrInitEntry(this._preds[w], v);
		incrementOrInitEntry(this._sucs[v], w);
		this._in[w][e] = edgeObj;
		this._out[v][e] = edgeObj;
		this._edgeCount++;
		return this;
	}
	edge(v, w, name) {
		var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
		return this._edgeLabels[e];
	}
	hasEdge(v, w, name) {
		var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
		return Object.prototype.hasOwnProperty.call(this._edgeLabels, e);
	}
	removeEdge(v, w, name) {
		var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
		var edge = this._edgeObjs[e];
		if (edge) {
			v = edge.v;
			w = edge.w;
			delete this._edgeLabels[e];
			delete this._edgeObjs[e];
			decrementOrRemoveEntry(this._preds[w], v);
			decrementOrRemoveEntry(this._sucs[v], w);
			delete this._in[w][e];
			delete this._out[v][e];
			this._edgeCount--;
		}
		return this;
	}
	inEdges(v, u) {
		var inV = this._in[v];
		if (inV) {
			var edges = values_default(inV);
			if (!u) return edges;
			return filter_default(edges, function(edge) {
				return edge.v === u;
			});
		}
	}
	outEdges(v, w) {
		var outV = this._out[v];
		if (outV) {
			var edges = values_default(outV);
			if (!w) return edges;
			return filter_default(edges, function(edge) {
				return edge.w === w;
			});
		}
	}
	nodeEdges(v, w) {
		var inEdges = this.inEdges(v, w);
		if (inEdges) return inEdges.concat(this.outEdges(v, w));
	}
};
Graph.prototype._nodeCount = 0;
Graph.prototype._edgeCount = 0;
function incrementOrInitEntry(map, k) {
	if (map[k]) map[k]++;
	else map[k] = 1;
}
function decrementOrRemoveEntry(map, k) {
	if (!--map[k]) delete map[k];
}
function edgeArgsToId(isDirected, v_, w_, name) {
	var v = "" + v_;
	var w = "" + w_;
	if (!isDirected && v > w) {
		var tmp = v;
		v = w;
		w = tmp;
	}
	return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM + (isUndefined_default(name) ? DEFAULT_EDGE_NAME : name);
}
function edgeArgsToObj(isDirected, v_, w_, name) {
	var v = "" + v_;
	var w = "" + w_;
	if (!isDirected && v > w) {
		var tmp = v;
		v = w;
		w = tmp;
	}
	var edgeObj = {
		v,
		w
	};
	if (name) edgeObj.name = name;
	return edgeObj;
}
function edgeObjToId(isDirected, edgeObj) {
	return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}
export { _baseClone_default as i, isUndefined_default as n, values_default as r, Graph as t };
