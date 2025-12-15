import { b as __commonJSMin, d as __export, e as __reExport, g as __toESM } from "./chunk-st2fFX3F.js";
import { A as _baseRest_default, C as _copyObject_default, D as _assignValue_default, F as _baseAssignValue_default, M as isFunction_default, N as identity_default, O as isObject_default, P as isArray_default, Q as isObjectLike_default, R as _baseGetTag_default, b as isArrayLikeObject_default, r as _nodeUtil_default, s as _baseUnary_default, v as _isPrototype_default, w as _createAssigner_default, x as _isIterateeCall_default, y as isArrayLike_default } from "./isArrayLikeObject-CLvaVZ_f.js";
import { B as keys_default, C as _arrayIncludes_default, D as _baseIndexOf_default, F as noop_default, G as _arrayMap_default, b as _baseUniq_default, c as reduce_default, d as isUndefined_default, e as values_default, f as filter_default, g as _baseFilter_default, h as forEach_default, j as _arrayIncludesWith_default, k as _baseEach_default, m as _baseIteratee_default, q as _cacheHas_default, r as _arraySome_default, s as _SetCache_default, u as _getAllKeysIn_default, v as _arrayFilter_default, w as _baseFlatten_default } from "./_baseUniq-a3tMHZXc.js";
import { b as _basePickBy_default, c as min_default, f as isString_default, g as has_default, h as map_default, j as find_default, k as last_default, l as defaults_default, m as flatten_default, n as toInteger_default } from "./_basePickBy-Dt92fzOT.js";
import { b as isEmpty_default } from "./isEmpty-Bzxt9fVW.js";
import { b as clone_default } from "./clone-Buqdp3zv.js";
function isAstNode(obj) {
	return typeof obj === "object" && obj !== null && typeof obj.$type === "string";
}
function isReference(obj) {
	return typeof obj === "object" && obj !== null && typeof obj.$refText === "string";
}
function isAstNodeDescription(obj) {
	return typeof obj === "object" && obj !== null && typeof obj.name === "string" && typeof obj.type === "string" && typeof obj.path === "string";
}
function isLinkingError(obj) {
	return typeof obj === "object" && obj !== null && isAstNode(obj.container) && isReference(obj.reference) && typeof obj.message === "string";
}
var AbstractAstReflection = class {
	constructor() {
		this.subtypes = {};
		this.allSubtypes = {};
	}
	isInstance(node, type) {
		return isAstNode(node) && this.isSubtype(node.$type, type);
	}
	isSubtype(subtype, supertype) {
		if (subtype === supertype) return true;
		let nested = this.subtypes[subtype];
		if (!nested) nested = this.subtypes[subtype] = {};
		const existing = nested[supertype];
		if (existing !== void 0) return existing;
		else {
			const result = this.computeIsSubtype(subtype, supertype);
			nested[supertype] = result;
			return result;
		}
	}
	getAllSubTypes(type) {
		const existing = this.allSubtypes[type];
		if (existing) return existing;
		else {
			const allTypes = this.getAllTypes();
			const types = [];
			for (const possibleSubType of allTypes) if (this.isSubtype(possibleSubType, type)) types.push(possibleSubType);
			this.allSubtypes[type] = types;
			return types;
		}
	}
};
function isCompositeCstNode(node) {
	return typeof node === "object" && node !== null && Array.isArray(node.content);
}
function isLeafCstNode(node) {
	return typeof node === "object" && node !== null && typeof node.tokenType === "object";
}
function isRootCstNode(node) {
	return isCompositeCstNode(node) && typeof node.fullText === "string";
}
var StreamImpl = class StreamImpl {
	constructor(startFn, nextFn) {
		this.startFn = startFn;
		this.nextFn = nextFn;
	}
	iterator() {
		const iterator = {
			state: this.startFn(),
			next: () => this.nextFn(iterator.state),
			[Symbol.iterator]: () => iterator
		};
		return iterator;
	}
	[Symbol.iterator]() {
		return this.iterator();
	}
	isEmpty() {
		const iterator = this.iterator();
		return Boolean(iterator.next().done);
	}
	count() {
		const iterator = this.iterator();
		let count = 0;
		let next = iterator.next();
		while (!next.done) {
			count++;
			next = iterator.next();
		}
		return count;
	}
	toArray() {
		const result = [];
		const iterator = this.iterator();
		let next;
		do {
			next = iterator.next();
			if (next.value !== void 0) result.push(next.value);
		} while (!next.done);
		return result;
	}
	toSet() {
		return new Set(this);
	}
	toMap(keyFn, valueFn) {
		const entryStream = this.map((element) => [keyFn ? keyFn(element) : element, valueFn ? valueFn(element) : element]);
		return new Map(entryStream);
	}
	toString() {
		return this.join();
	}
	concat(other) {
		return new StreamImpl(() => ({
			first: this.startFn(),
			firstDone: false,
			iterator: other[Symbol.iterator]()
		}), (state) => {
			let result;
			if (!state.firstDone) {
				do {
					result = this.nextFn(state.first);
					if (!result.done) return result;
				} while (!result.done);
				state.firstDone = true;
			}
			do {
				result = state.iterator.next();
				if (!result.done) return result;
			} while (!result.done);
			return DONE_RESULT;
		});
	}
	join(separator = ",") {
		const iterator = this.iterator();
		let value = "";
		let result;
		let addSeparator = false;
		do {
			result = iterator.next();
			if (!result.done) {
				if (addSeparator) value += separator;
				value += toString(result.value);
			}
			addSeparator = true;
		} while (!result.done);
		return value;
	}
	indexOf(searchElement, fromIndex = 0) {
		const iterator = this.iterator();
		let index = 0;
		let next = iterator.next();
		while (!next.done) {
			if (index >= fromIndex && next.value === searchElement) return index;
			next = iterator.next();
			index++;
		}
		return -1;
	}
	every(predicate) {
		const iterator = this.iterator();
		let next = iterator.next();
		while (!next.done) {
			if (!predicate(next.value)) return false;
			next = iterator.next();
		}
		return true;
	}
	some(predicate) {
		const iterator = this.iterator();
		let next = iterator.next();
		while (!next.done) {
			if (predicate(next.value)) return true;
			next = iterator.next();
		}
		return false;
	}
	forEach(callbackfn) {
		const iterator = this.iterator();
		let index = 0;
		let next = iterator.next();
		while (!next.done) {
			callbackfn(next.value, index);
			next = iterator.next();
			index++;
		}
	}
	map(callbackfn) {
		return new StreamImpl(this.startFn, (state) => {
			const { done, value } = this.nextFn(state);
			if (done) return DONE_RESULT;
			else return {
				done: false,
				value: callbackfn(value)
			};
		});
	}
	filter(predicate) {
		return new StreamImpl(this.startFn, (state) => {
			let result;
			do {
				result = this.nextFn(state);
				if (!result.done && predicate(result.value)) return result;
			} while (!result.done);
			return DONE_RESULT;
		});
	}
	nonNullable() {
		return this.filter((e) => e !== void 0 && e !== null);
	}
	reduce(callbackfn, initialValue) {
		const iterator = this.iterator();
		let previousValue = initialValue;
		let next = iterator.next();
		while (!next.done) {
			if (previousValue === void 0) previousValue = next.value;
			else previousValue = callbackfn(previousValue, next.value);
			next = iterator.next();
		}
		return previousValue;
	}
	reduceRight(callbackfn, initialValue) {
		return this.recursiveReduce(this.iterator(), callbackfn, initialValue);
	}
	recursiveReduce(iterator, callbackfn, initialValue) {
		const next = iterator.next();
		if (next.done) return initialValue;
		const previousValue = this.recursiveReduce(iterator, callbackfn, initialValue);
		if (previousValue === void 0) return next.value;
		return callbackfn(previousValue, next.value);
	}
	find(predicate) {
		const iterator = this.iterator();
		let next = iterator.next();
		while (!next.done) {
			if (predicate(next.value)) return next.value;
			next = iterator.next();
		}
		return void 0;
	}
	findIndex(predicate) {
		const iterator = this.iterator();
		let index = 0;
		let next = iterator.next();
		while (!next.done) {
			if (predicate(next.value)) return index;
			next = iterator.next();
			index++;
		}
		return -1;
	}
	includes(searchElement) {
		const iterator = this.iterator();
		let next = iterator.next();
		while (!next.done) {
			if (next.value === searchElement) return true;
			next = iterator.next();
		}
		return false;
	}
	flatMap(callbackfn) {
		return new StreamImpl(() => ({ this: this.startFn() }), (state) => {
			do {
				if (state.iterator) {
					const next = state.iterator.next();
					if (next.done) state.iterator = void 0;
					else return next;
				}
				const { done, value } = this.nextFn(state.this);
				if (!done) {
					const mapped = callbackfn(value);
					if (isIterable(mapped)) state.iterator = mapped[Symbol.iterator]();
					else return {
						done: false,
						value: mapped
					};
				}
			} while (state.iterator);
			return DONE_RESULT;
		});
	}
	flat(depth) {
		if (depth === void 0) depth = 1;
		if (depth <= 0) return this;
		const stream$1 = depth > 1 ? this.flat(depth - 1) : this;
		return new StreamImpl(() => ({ this: stream$1.startFn() }), (state) => {
			do {
				if (state.iterator) {
					const next = state.iterator.next();
					if (next.done) state.iterator = void 0;
					else return next;
				}
				const { done, value } = stream$1.nextFn(state.this);
				if (!done) if (isIterable(value)) state.iterator = value[Symbol.iterator]();
				else return {
					done: false,
					value
				};
			} while (state.iterator);
			return DONE_RESULT;
		});
	}
	head() {
		const iterator = this.iterator();
		const result = iterator.next();
		if (result.done) return void 0;
		return result.value;
	}
	tail(skipCount = 1) {
		return new StreamImpl(() => {
			const state = this.startFn();
			for (let i = 0; i < skipCount; i++) {
				const next = this.nextFn(state);
				if (next.done) return state;
			}
			return state;
		}, this.nextFn);
	}
	limit(maxSize) {
		return new StreamImpl(() => ({
			size: 0,
			state: this.startFn()
		}), (state) => {
			state.size++;
			if (state.size > maxSize) return DONE_RESULT;
			return this.nextFn(state.state);
		});
	}
	distinct(by) {
		return new StreamImpl(() => ({
			set: /* @__PURE__ */ new Set(),
			internalState: this.startFn()
		}), (state) => {
			let result;
			do {
				result = this.nextFn(state.internalState);
				if (!result.done) {
					const value = by ? by(result.value) : result.value;
					if (!state.set.has(value)) {
						state.set.add(value);
						return result;
					}
				}
			} while (!result.done);
			return DONE_RESULT;
		});
	}
	exclude(other, key) {
		const otherKeySet = /* @__PURE__ */ new Set();
		for (const item of other) {
			const value = key ? key(item) : item;
			otherKeySet.add(value);
		}
		return this.filter((e) => {
			const ownKey = key ? key(e) : e;
			return !otherKeySet.has(ownKey);
		});
	}
};
function toString(item) {
	if (typeof item === "string") return item;
	if (typeof item === "undefined") return "undefined";
	if (typeof item.toString === "function") return item.toString();
	return Object.prototype.toString.call(item);
}
function isIterable(obj) {
	return !!obj && typeof obj[Symbol.iterator] === "function";
}
const EMPTY_STREAM = new StreamImpl(() => void 0, () => DONE_RESULT);
const DONE_RESULT = Object.freeze({
	done: true,
	value: void 0
});
function stream(...collections) {
	if (collections.length === 1) {
		const collection = collections[0];
		if (collection instanceof StreamImpl) return collection;
		if (isIterable(collection)) return new StreamImpl(() => collection[Symbol.iterator](), (iterator) => iterator.next());
		if (typeof collection.length === "number") return new StreamImpl(() => ({ index: 0 }), (state) => {
			if (state.index < collection.length) return {
				done: false,
				value: collection[state.index++]
			};
			else return DONE_RESULT;
		});
	}
	if (collections.length > 1) return new StreamImpl(() => ({
		collIndex: 0,
		arrIndex: 0
	}), (state) => {
		do {
			if (state.iterator) {
				const next = state.iterator.next();
				if (!next.done) return next;
				state.iterator = void 0;
			}
			if (state.array) {
				if (state.arrIndex < state.array.length) return {
					done: false,
					value: state.array[state.arrIndex++]
				};
				state.array = void 0;
				state.arrIndex = 0;
			}
			if (state.collIndex < collections.length) {
				const collection = collections[state.collIndex++];
				if (isIterable(collection)) state.iterator = collection[Symbol.iterator]();
				else if (collection && typeof collection.length === "number") state.array = collection;
			}
		} while (state.iterator || state.array || state.collIndex < collections.length);
		return DONE_RESULT;
	});
	return EMPTY_STREAM;
}
var TreeStreamImpl = class extends StreamImpl {
	constructor(root, children, options) {
		super(() => ({
			iterators: (options === null || options === void 0 ? void 0 : options.includeRoot) ? [[root][Symbol.iterator]()] : [children(root)[Symbol.iterator]()],
			pruned: false
		}), (state) => {
			if (state.pruned) {
				state.iterators.pop();
				state.pruned = false;
			}
			while (state.iterators.length > 0) {
				const iterator = state.iterators[state.iterators.length - 1];
				const next = iterator.next();
				if (next.done) state.iterators.pop();
				else {
					state.iterators.push(children(next.value)[Symbol.iterator]());
					return next;
				}
			}
			return DONE_RESULT;
		});
	}
	iterator() {
		const iterator = {
			state: this.startFn(),
			next: () => this.nextFn(iterator.state),
			prune: () => {
				iterator.state.pruned = true;
			},
			[Symbol.iterator]: () => iterator
		};
		return iterator;
	}
};
var Reduction;
(function(Reduction$1) {
	function sum(stream$1) {
		return stream$1.reduce((a, b) => a + b, 0);
	}
	Reduction$1.sum = sum;
	function product(stream$1) {
		return stream$1.reduce((a, b) => a * b, 0);
	}
	Reduction$1.product = product;
	function min(stream$1) {
		return stream$1.reduce((a, b) => Math.min(a, b));
	}
	Reduction$1.min = min;
	function max(stream$1) {
		return stream$1.reduce((a, b) => Math.max(a, b));
	}
	Reduction$1.max = max;
})(Reduction || (Reduction = {}));
var cst_utils_exports = {};
__export(cst_utils_exports, {
	DefaultNameRegexp: () => DefaultNameRegexp,
	RangeComparison: () => RangeComparison,
	compareRange: () => compareRange,
	findCommentNode: () => findCommentNode,
	findDeclarationNodeAtOffset: () => findDeclarationNodeAtOffset,
	findLeafNodeAtOffset: () => findLeafNodeAtOffset,
	findLeafNodeBeforeOffset: () => findLeafNodeBeforeOffset,
	flattenCst: () => flattenCst,
	getInteriorNodes: () => getInteriorNodes,
	getNextNode: () => getNextNode,
	getPreviousNode: () => getPreviousNode,
	getStartlineNode: () => getStartlineNode,
	inRange: () => inRange,
	isChildNode: () => isChildNode,
	isCommentNode: () => isCommentNode,
	streamCst: () => streamCst,
	toDocumentSegment: () => toDocumentSegment,
	tokenToRange: () => tokenToRange
});
function streamCst(node) {
	return new TreeStreamImpl(node, (element) => {
		if (isCompositeCstNode(element)) return element.content;
		else return [];
	}, { includeRoot: true });
}
function flattenCst(node) {
	return streamCst(node).filter(isLeafCstNode);
}
function isChildNode(child, parent) {
	while (child.container) {
		child = child.container;
		if (child === parent) return true;
	}
	return false;
}
function tokenToRange(token) {
	return {
		start: {
			character: token.startColumn - 1,
			line: token.startLine - 1
		},
		end: {
			character: token.endColumn,
			line: token.endLine - 1
		}
	};
}
function toDocumentSegment(node) {
	if (!node) return void 0;
	const { offset, end, range } = node;
	return {
		range,
		offset,
		end,
		length: end - offset
	};
}
var RangeComparison;
(function(RangeComparison$1) {
	RangeComparison$1[RangeComparison$1["Before"] = 0] = "Before";
	RangeComparison$1[RangeComparison$1["After"] = 1] = "After";
	RangeComparison$1[RangeComparison$1["OverlapFront"] = 2] = "OverlapFront";
	RangeComparison$1[RangeComparison$1["OverlapBack"] = 3] = "OverlapBack";
	RangeComparison$1[RangeComparison$1["Inside"] = 4] = "Inside";
	RangeComparison$1[RangeComparison$1["Outside"] = 5] = "Outside";
})(RangeComparison || (RangeComparison = {}));
function compareRange(range, to) {
	if (range.end.line < to.start.line || range.end.line === to.start.line && range.end.character <= to.start.character) return RangeComparison.Before;
	else if (range.start.line > to.end.line || range.start.line === to.end.line && range.start.character >= to.end.character) return RangeComparison.After;
	const startInside = range.start.line > to.start.line || range.start.line === to.start.line && range.start.character >= to.start.character;
	const endInside = range.end.line < to.end.line || range.end.line === to.end.line && range.end.character <= to.end.character;
	if (startInside && endInside) return RangeComparison.Inside;
	else if (startInside) return RangeComparison.OverlapBack;
	else if (endInside) return RangeComparison.OverlapFront;
	else return RangeComparison.Outside;
}
function inRange(range, to) {
	const comparison = compareRange(range, to);
	return comparison > RangeComparison.After;
}
const DefaultNameRegexp = /^[\w\p{L}]$/u;
function findDeclarationNodeAtOffset(cstNode, offset, nameRegexp = DefaultNameRegexp) {
	if (cstNode) {
		if (offset > 0) {
			const localOffset = offset - cstNode.offset;
			const textAtOffset = cstNode.text.charAt(localOffset);
			if (!nameRegexp.test(textAtOffset)) offset--;
		}
		return findLeafNodeAtOffset(cstNode, offset);
	}
	return void 0;
}
function findCommentNode(cstNode, commentNames) {
	if (cstNode) {
		const previous = getPreviousNode(cstNode, true);
		if (previous && isCommentNode(previous, commentNames)) return previous;
		if (isRootCstNode(cstNode)) {
			const endIndex = cstNode.content.findIndex((e) => !e.hidden);
			for (let i = endIndex - 1; i >= 0; i--) {
				const child = cstNode.content[i];
				if (isCommentNode(child, commentNames)) return child;
			}
		}
	}
	return void 0;
}
function isCommentNode(cstNode, commentNames) {
	return isLeafCstNode(cstNode) && commentNames.includes(cstNode.tokenType.name);
}
function findLeafNodeAtOffset(node, offset) {
	if (isLeafCstNode(node)) return node;
	else if (isCompositeCstNode(node)) {
		const searchResult = binarySearch(node, offset, false);
		if (searchResult) return findLeafNodeAtOffset(searchResult, offset);
	}
	return void 0;
}
function findLeafNodeBeforeOffset(node, offset) {
	if (isLeafCstNode(node)) return node;
	else if (isCompositeCstNode(node)) {
		const searchResult = binarySearch(node, offset, true);
		if (searchResult) return findLeafNodeBeforeOffset(searchResult, offset);
	}
	return void 0;
}
function binarySearch(node, offset, closest) {
	let left = 0;
	let right = node.content.length - 1;
	let closestNode = void 0;
	while (left <= right) {
		const middle = Math.floor((left + right) / 2);
		const middleNode = node.content[middle];
		if (middleNode.offset <= offset && middleNode.end > offset) return middleNode;
		if (middleNode.end <= offset) {
			closestNode = closest ? middleNode : void 0;
			left = middle + 1;
		} else right = middle - 1;
	}
	return closestNode;
}
function getPreviousNode(node, hidden = true) {
	while (node.container) {
		const parent = node.container;
		let index = parent.content.indexOf(node);
		while (index > 0) {
			index--;
			const previous = parent.content[index];
			if (hidden || !previous.hidden) return previous;
		}
		node = parent;
	}
	return void 0;
}
function getNextNode(node, hidden = true) {
	while (node.container) {
		const parent = node.container;
		let index = parent.content.indexOf(node);
		const last = parent.content.length - 1;
		while (index < last) {
			index++;
			const next = parent.content[index];
			if (hidden || !next.hidden) return next;
		}
		node = parent;
	}
	return void 0;
}
function getStartlineNode(node) {
	if (node.range.start.character === 0) return node;
	const line = node.range.start.line;
	let last = node;
	let index;
	while (node.container) {
		const parent = node.container;
		const selfIndex = index !== null && index !== void 0 ? index : parent.content.indexOf(node);
		if (selfIndex === 0) {
			node = parent;
			index = void 0;
		} else {
			index = selfIndex - 1;
			node = parent.content[index];
		}
		if (node.range.start.line !== line) break;
		last = node;
	}
	return last;
}
function getInteriorNodes(start, end) {
	const commonParent = getCommonParent(start, end);
	if (!commonParent) return [];
	return commonParent.parent.content.slice(commonParent.a + 1, commonParent.b);
}
function getCommonParent(a, b) {
	const aParents = getParentChain(a);
	const bParents = getParentChain(b);
	let current;
	for (let i = 0; i < aParents.length && i < bParents.length; i++) {
		const aParent = aParents[i];
		const bParent = bParents[i];
		if (aParent.parent === bParent.parent) current = {
			parent: aParent.parent,
			a: aParent.index,
			b: bParent.index
		};
		else break;
	}
	return current;
}
function getParentChain(node) {
	const chain = [];
	while (node.container) {
		const parent = node.container;
		const index = parent.content.indexOf(node);
		chain.push({
			parent,
			index
		});
		node = parent;
	}
	return chain.reverse();
}
var ErrorWithLocation = class extends Error {
	constructor(node, message) {
		super(node ? `${message} at ${node.range.start.line}:${node.range.start.character}` : message);
	}
};
function assertUnreachable(_) {
	throw new Error("Error! The input value was not handled.");
}
var ast_exports = {};
__export(ast_exports, {
	AbstractElement: () => AbstractElement,
	AbstractRule: () => AbstractRule,
	AbstractType: () => AbstractType,
	Action: () => Action,
	Alternatives: () => Alternatives,
	ArrayLiteral: () => ArrayLiteral,
	ArrayType: () => ArrayType,
	Assignment: () => Assignment,
	BooleanLiteral: () => BooleanLiteral,
	CharacterRange: () => CharacterRange,
	Condition: () => Condition,
	Conjunction: () => Conjunction,
	CrossReference: () => CrossReference,
	Disjunction: () => Disjunction,
	EndOfFile: () => EndOfFile,
	Grammar: () => Grammar,
	GrammarImport: () => GrammarImport,
	Group: () => Group$1,
	InferredType: () => InferredType,
	Interface: () => Interface,
	Keyword: () => Keyword,
	LangiumGrammarAstReflection: () => LangiumGrammarAstReflection,
	LangiumGrammarTerminals: () => LangiumGrammarTerminals,
	NamedArgument: () => NamedArgument,
	NegatedToken: () => NegatedToken,
	Negation: () => Negation,
	NumberLiteral: () => NumberLiteral,
	Parameter: () => Parameter,
	ParameterReference: () => ParameterReference,
	ParserRule: () => ParserRule,
	ReferenceType: () => ReferenceType,
	RegexToken: () => RegexToken,
	ReturnType: () => ReturnType,
	RuleCall: () => RuleCall,
	SimpleType: () => SimpleType,
	StringLiteral: () => StringLiteral,
	TerminalAlternatives: () => TerminalAlternatives,
	TerminalGroup: () => TerminalGroup,
	TerminalRule: () => TerminalRule,
	TerminalRuleCall: () => TerminalRuleCall,
	Type: () => Type,
	TypeAttribute: () => TypeAttribute,
	TypeDefinition: () => TypeDefinition,
	UnionType: () => UnionType,
	UnorderedGroup: () => UnorderedGroup,
	UntilToken: () => UntilToken,
	ValueLiteral: () => ValueLiteral,
	Wildcard: () => Wildcard,
	isAbstractElement: () => isAbstractElement,
	isAbstractRule: () => isAbstractRule,
	isAbstractType: () => isAbstractType,
	isAction: () => isAction,
	isAlternatives: () => isAlternatives,
	isArrayLiteral: () => isArrayLiteral,
	isArrayType: () => isArrayType,
	isAssignment: () => isAssignment,
	isBooleanLiteral: () => isBooleanLiteral,
	isCharacterRange: () => isCharacterRange,
	isCondition: () => isCondition,
	isConjunction: () => isConjunction,
	isCrossReference: () => isCrossReference,
	isDisjunction: () => isDisjunction,
	isEndOfFile: () => isEndOfFile,
	isFeatureName: () => isFeatureName,
	isGrammar: () => isGrammar,
	isGrammarImport: () => isGrammarImport,
	isGroup: () => isGroup,
	isInferredType: () => isInferredType,
	isInterface: () => isInterface,
	isKeyword: () => isKeyword,
	isNamedArgument: () => isNamedArgument,
	isNegatedToken: () => isNegatedToken,
	isNegation: () => isNegation,
	isNumberLiteral: () => isNumberLiteral,
	isParameter: () => isParameter,
	isParameterReference: () => isParameterReference,
	isParserRule: () => isParserRule,
	isPrimitiveType: () => isPrimitiveType,
	isReferenceType: () => isReferenceType,
	isRegexToken: () => isRegexToken,
	isReturnType: () => isReturnType,
	isRuleCall: () => isRuleCall,
	isSimpleType: () => isSimpleType,
	isStringLiteral: () => isStringLiteral,
	isTerminalAlternatives: () => isTerminalAlternatives,
	isTerminalGroup: () => isTerminalGroup,
	isTerminalRule: () => isTerminalRule,
	isTerminalRuleCall: () => isTerminalRuleCall,
	isType: () => isType,
	isTypeAttribute: () => isTypeAttribute,
	isTypeDefinition: () => isTypeDefinition,
	isUnionType: () => isUnionType,
	isUnorderedGroup: () => isUnorderedGroup,
	isUntilToken: () => isUntilToken,
	isValueLiteral: () => isValueLiteral,
	isWildcard: () => isWildcard,
	reflection: () => reflection$1
});
const LangiumGrammarTerminals = {
	ID: /\^?[_a-zA-Z][\w_]*/,
	STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/,
	NUMBER: /NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity)/,
	RegexLiteral: /\/(?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+\/[a-z]*/,
	WS: /\s+/,
	ML_COMMENT: /\/\*[\s\S]*?\*\//,
	SL_COMMENT: /\/\/[^\n\r]*/
};
const AbstractRule = "AbstractRule";
function isAbstractRule(item) {
	return reflection$1.isInstance(item, AbstractRule);
}
const AbstractType = "AbstractType";
function isAbstractType(item) {
	return reflection$1.isInstance(item, AbstractType);
}
const Condition = "Condition";
function isCondition(item) {
	return reflection$1.isInstance(item, Condition);
}
function isFeatureName(item) {
	return isPrimitiveType(item) || item === "current" || item === "entry" || item === "extends" || item === "false" || item === "fragment" || item === "grammar" || item === "hidden" || item === "import" || item === "interface" || item === "returns" || item === "terminal" || item === "true" || item === "type" || item === "infer" || item === "infers" || item === "with" || typeof item === "string" && /\^?[_a-zA-Z][\w_]*/.test(item);
}
function isPrimitiveType(item) {
	return item === "string" || item === "number" || item === "boolean" || item === "Date" || item === "bigint";
}
const TypeDefinition = "TypeDefinition";
function isTypeDefinition(item) {
	return reflection$1.isInstance(item, TypeDefinition);
}
const ValueLiteral = "ValueLiteral";
function isValueLiteral(item) {
	return reflection$1.isInstance(item, ValueLiteral);
}
const AbstractElement = "AbstractElement";
function isAbstractElement(item) {
	return reflection$1.isInstance(item, AbstractElement);
}
const ArrayLiteral = "ArrayLiteral";
function isArrayLiteral(item) {
	return reflection$1.isInstance(item, ArrayLiteral);
}
const ArrayType = "ArrayType";
function isArrayType(item) {
	return reflection$1.isInstance(item, ArrayType);
}
const BooleanLiteral = "BooleanLiteral";
function isBooleanLiteral(item) {
	return reflection$1.isInstance(item, BooleanLiteral);
}
const Conjunction = "Conjunction";
function isConjunction(item) {
	return reflection$1.isInstance(item, Conjunction);
}
const Disjunction = "Disjunction";
function isDisjunction(item) {
	return reflection$1.isInstance(item, Disjunction);
}
const Grammar = "Grammar";
function isGrammar(item) {
	return reflection$1.isInstance(item, Grammar);
}
const GrammarImport = "GrammarImport";
function isGrammarImport(item) {
	return reflection$1.isInstance(item, GrammarImport);
}
const InferredType = "InferredType";
function isInferredType(item) {
	return reflection$1.isInstance(item, InferredType);
}
const Interface = "Interface";
function isInterface(item) {
	return reflection$1.isInstance(item, Interface);
}
const NamedArgument = "NamedArgument";
function isNamedArgument(item) {
	return reflection$1.isInstance(item, NamedArgument);
}
const Negation = "Negation";
function isNegation(item) {
	return reflection$1.isInstance(item, Negation);
}
const NumberLiteral = "NumberLiteral";
function isNumberLiteral(item) {
	return reflection$1.isInstance(item, NumberLiteral);
}
const Parameter = "Parameter";
function isParameter(item) {
	return reflection$1.isInstance(item, Parameter);
}
const ParameterReference = "ParameterReference";
function isParameterReference(item) {
	return reflection$1.isInstance(item, ParameterReference);
}
const ParserRule = "ParserRule";
function isParserRule(item) {
	return reflection$1.isInstance(item, ParserRule);
}
const ReferenceType = "ReferenceType";
function isReferenceType(item) {
	return reflection$1.isInstance(item, ReferenceType);
}
const ReturnType = "ReturnType";
function isReturnType(item) {
	return reflection$1.isInstance(item, ReturnType);
}
const SimpleType = "SimpleType";
function isSimpleType(item) {
	return reflection$1.isInstance(item, SimpleType);
}
const StringLiteral = "StringLiteral";
function isStringLiteral(item) {
	return reflection$1.isInstance(item, StringLiteral);
}
const TerminalRule = "TerminalRule";
function isTerminalRule(item) {
	return reflection$1.isInstance(item, TerminalRule);
}
const Type = "Type";
function isType(item) {
	return reflection$1.isInstance(item, Type);
}
const TypeAttribute = "TypeAttribute";
function isTypeAttribute(item) {
	return reflection$1.isInstance(item, TypeAttribute);
}
const UnionType = "UnionType";
function isUnionType(item) {
	return reflection$1.isInstance(item, UnionType);
}
const Action = "Action";
function isAction(item) {
	return reflection$1.isInstance(item, Action);
}
const Alternatives = "Alternatives";
function isAlternatives(item) {
	return reflection$1.isInstance(item, Alternatives);
}
const Assignment = "Assignment";
function isAssignment(item) {
	return reflection$1.isInstance(item, Assignment);
}
const CharacterRange = "CharacterRange";
function isCharacterRange(item) {
	return reflection$1.isInstance(item, CharacterRange);
}
const CrossReference = "CrossReference";
function isCrossReference(item) {
	return reflection$1.isInstance(item, CrossReference);
}
const EndOfFile = "EndOfFile";
function isEndOfFile(item) {
	return reflection$1.isInstance(item, EndOfFile);
}
const Group$1 = "Group";
function isGroup(item) {
	return reflection$1.isInstance(item, Group$1);
}
const Keyword = "Keyword";
function isKeyword(item) {
	return reflection$1.isInstance(item, Keyword);
}
const NegatedToken = "NegatedToken";
function isNegatedToken(item) {
	return reflection$1.isInstance(item, NegatedToken);
}
const RegexToken = "RegexToken";
function isRegexToken(item) {
	return reflection$1.isInstance(item, RegexToken);
}
const RuleCall = "RuleCall";
function isRuleCall(item) {
	return reflection$1.isInstance(item, RuleCall);
}
const TerminalAlternatives = "TerminalAlternatives";
function isTerminalAlternatives(item) {
	return reflection$1.isInstance(item, TerminalAlternatives);
}
const TerminalGroup = "TerminalGroup";
function isTerminalGroup(item) {
	return reflection$1.isInstance(item, TerminalGroup);
}
const TerminalRuleCall = "TerminalRuleCall";
function isTerminalRuleCall(item) {
	return reflection$1.isInstance(item, TerminalRuleCall);
}
const UnorderedGroup = "UnorderedGroup";
function isUnorderedGroup(item) {
	return reflection$1.isInstance(item, UnorderedGroup);
}
const UntilToken = "UntilToken";
function isUntilToken(item) {
	return reflection$1.isInstance(item, UntilToken);
}
const Wildcard = "Wildcard";
function isWildcard(item) {
	return reflection$1.isInstance(item, Wildcard);
}
var LangiumGrammarAstReflection = class extends AbstractAstReflection {
	getAllTypes() {
		return [
			AbstractElement,
			AbstractRule,
			AbstractType,
			Action,
			Alternatives,
			ArrayLiteral,
			ArrayType,
			Assignment,
			BooleanLiteral,
			CharacterRange,
			Condition,
			Conjunction,
			CrossReference,
			Disjunction,
			EndOfFile,
			Grammar,
			GrammarImport,
			Group$1,
			InferredType,
			Interface,
			Keyword,
			NamedArgument,
			NegatedToken,
			Negation,
			NumberLiteral,
			Parameter,
			ParameterReference,
			ParserRule,
			ReferenceType,
			RegexToken,
			ReturnType,
			RuleCall,
			SimpleType,
			StringLiteral,
			TerminalAlternatives,
			TerminalGroup,
			TerminalRule,
			TerminalRuleCall,
			Type,
			TypeAttribute,
			TypeDefinition,
			UnionType,
			UnorderedGroup,
			UntilToken,
			ValueLiteral,
			Wildcard
		];
	}
	computeIsSubtype(subtype, supertype) {
		switch (subtype) {
			case Action:
			case Alternatives:
			case Assignment:
			case CharacterRange:
			case CrossReference:
			case EndOfFile:
			case Group$1:
			case Keyword:
			case NegatedToken:
			case RegexToken:
			case RuleCall:
			case TerminalAlternatives:
			case TerminalGroup:
			case TerminalRuleCall:
			case UnorderedGroup:
			case UntilToken:
			case Wildcard: return this.isSubtype(AbstractElement, supertype);
			case ArrayLiteral:
			case NumberLiteral:
			case StringLiteral: return this.isSubtype(ValueLiteral, supertype);
			case ArrayType:
			case ReferenceType:
			case SimpleType:
			case UnionType: return this.isSubtype(TypeDefinition, supertype);
			case BooleanLiteral: return this.isSubtype(Condition, supertype) || this.isSubtype(ValueLiteral, supertype);
			case Conjunction:
			case Disjunction:
			case Negation:
			case ParameterReference: return this.isSubtype(Condition, supertype);
			case InferredType:
			case Interface:
			case Type: return this.isSubtype(AbstractType, supertype);
			case ParserRule: return this.isSubtype(AbstractRule, supertype) || this.isSubtype(AbstractType, supertype);
			case TerminalRule: return this.isSubtype(AbstractRule, supertype);
			default: return false;
		}
	}
	getReferenceType(refInfo) {
		const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
		switch (referenceId) {
			case "Action:type":
			case "CrossReference:type":
			case "Interface:superTypes":
			case "ParserRule:returnType":
			case "SimpleType:typeRef": return AbstractType;
			case "Grammar:hiddenTokens":
			case "ParserRule:hiddenTokens":
			case "RuleCall:rule": return AbstractRule;
			case "Grammar:usedGrammars": return Grammar;
			case "NamedArgument:parameter":
			case "ParameterReference:parameter": return Parameter;
			case "TerminalRuleCall:rule": return TerminalRule;
			default: throw new Error(`${referenceId} is not a valid reference id.`);
		}
	}
	getTypeMetaData(type) {
		switch (type) {
			case AbstractElement: return {
				name: AbstractElement,
				properties: [{ name: "cardinality" }, { name: "lookahead" }]
			};
			case ArrayLiteral: return {
				name: ArrayLiteral,
				properties: [{
					name: "elements",
					defaultValue: []
				}]
			};
			case ArrayType: return {
				name: ArrayType,
				properties: [{ name: "elementType" }]
			};
			case BooleanLiteral: return {
				name: BooleanLiteral,
				properties: [{
					name: "true",
					defaultValue: false
				}]
			};
			case Conjunction: return {
				name: Conjunction,
				properties: [{ name: "left" }, { name: "right" }]
			};
			case Disjunction: return {
				name: Disjunction,
				properties: [{ name: "left" }, { name: "right" }]
			};
			case Grammar: return {
				name: Grammar,
				properties: [
					{
						name: "definesHiddenTokens",
						defaultValue: false
					},
					{
						name: "hiddenTokens",
						defaultValue: []
					},
					{
						name: "imports",
						defaultValue: []
					},
					{
						name: "interfaces",
						defaultValue: []
					},
					{
						name: "isDeclared",
						defaultValue: false
					},
					{ name: "name" },
					{
						name: "rules",
						defaultValue: []
					},
					{
						name: "types",
						defaultValue: []
					},
					{
						name: "usedGrammars",
						defaultValue: []
					}
				]
			};
			case GrammarImport: return {
				name: GrammarImport,
				properties: [{ name: "path" }]
			};
			case InferredType: return {
				name: InferredType,
				properties: [{ name: "name" }]
			};
			case Interface: return {
				name: Interface,
				properties: [
					{
						name: "attributes",
						defaultValue: []
					},
					{ name: "name" },
					{
						name: "superTypes",
						defaultValue: []
					}
				]
			};
			case NamedArgument: return {
				name: NamedArgument,
				properties: [
					{
						name: "calledByName",
						defaultValue: false
					},
					{ name: "parameter" },
					{ name: "value" }
				]
			};
			case Negation: return {
				name: Negation,
				properties: [{ name: "value" }]
			};
			case NumberLiteral: return {
				name: NumberLiteral,
				properties: [{ name: "value" }]
			};
			case Parameter: return {
				name: Parameter,
				properties: [{ name: "name" }]
			};
			case ParameterReference: return {
				name: ParameterReference,
				properties: [{ name: "parameter" }]
			};
			case ParserRule: return {
				name: ParserRule,
				properties: [
					{ name: "dataType" },
					{
						name: "definesHiddenTokens",
						defaultValue: false
					},
					{ name: "definition" },
					{
						name: "entry",
						defaultValue: false
					},
					{
						name: "fragment",
						defaultValue: false
					},
					{
						name: "hiddenTokens",
						defaultValue: []
					},
					{ name: "inferredType" },
					{ name: "name" },
					{
						name: "parameters",
						defaultValue: []
					},
					{ name: "returnType" },
					{
						name: "wildcard",
						defaultValue: false
					}
				]
			};
			case ReferenceType: return {
				name: ReferenceType,
				properties: [{ name: "referenceType" }]
			};
			case ReturnType: return {
				name: ReturnType,
				properties: [{ name: "name" }]
			};
			case SimpleType: return {
				name: SimpleType,
				properties: [
					{ name: "primitiveType" },
					{ name: "stringType" },
					{ name: "typeRef" }
				]
			};
			case StringLiteral: return {
				name: StringLiteral,
				properties: [{ name: "value" }]
			};
			case TerminalRule: return {
				name: TerminalRule,
				properties: [
					{ name: "definition" },
					{
						name: "fragment",
						defaultValue: false
					},
					{
						name: "hidden",
						defaultValue: false
					},
					{ name: "name" },
					{ name: "type" }
				]
			};
			case Type: return {
				name: Type,
				properties: [{ name: "name" }, { name: "type" }]
			};
			case TypeAttribute: return {
				name: TypeAttribute,
				properties: [
					{ name: "defaultValue" },
					{
						name: "isOptional",
						defaultValue: false
					},
					{ name: "name" },
					{ name: "type" }
				]
			};
			case UnionType: return {
				name: UnionType,
				properties: [{
					name: "types",
					defaultValue: []
				}]
			};
			case Action: return {
				name: Action,
				properties: [
					{ name: "cardinality" },
					{ name: "feature" },
					{ name: "inferredType" },
					{ name: "lookahead" },
					{ name: "operator" },
					{ name: "type" }
				]
			};
			case Alternatives: return {
				name: Alternatives,
				properties: [
					{ name: "cardinality" },
					{
						name: "elements",
						defaultValue: []
					},
					{ name: "lookahead" }
				]
			};
			case Assignment: return {
				name: Assignment,
				properties: [
					{ name: "cardinality" },
					{ name: "feature" },
					{ name: "lookahead" },
					{ name: "operator" },
					{ name: "terminal" }
				]
			};
			case CharacterRange: return {
				name: CharacterRange,
				properties: [
					{ name: "cardinality" },
					{ name: "left" },
					{ name: "lookahead" },
					{ name: "right" }
				]
			};
			case CrossReference: return {
				name: CrossReference,
				properties: [
					{ name: "cardinality" },
					{
						name: "deprecatedSyntax",
						defaultValue: false
					},
					{ name: "lookahead" },
					{ name: "terminal" },
					{ name: "type" }
				]
			};
			case EndOfFile: return {
				name: EndOfFile,
				properties: [{ name: "cardinality" }, { name: "lookahead" }]
			};
			case Group$1: return {
				name: Group$1,
				properties: [
					{ name: "cardinality" },
					{
						name: "elements",
						defaultValue: []
					},
					{ name: "guardCondition" },
					{ name: "lookahead" }
				]
			};
			case Keyword: return {
				name: Keyword,
				properties: [
					{ name: "cardinality" },
					{ name: "lookahead" },
					{ name: "value" }
				]
			};
			case NegatedToken: return {
				name: NegatedToken,
				properties: [
					{ name: "cardinality" },
					{ name: "lookahead" },
					{ name: "terminal" }
				]
			};
			case RegexToken: return {
				name: RegexToken,
				properties: [
					{ name: "cardinality" },
					{ name: "lookahead" },
					{ name: "regex" }
				]
			};
			case RuleCall: return {
				name: RuleCall,
				properties: [
					{
						name: "arguments",
						defaultValue: []
					},
					{ name: "cardinality" },
					{ name: "lookahead" },
					{ name: "rule" }
				]
			};
			case TerminalAlternatives: return {
				name: TerminalAlternatives,
				properties: [
					{ name: "cardinality" },
					{
						name: "elements",
						defaultValue: []
					},
					{ name: "lookahead" }
				]
			};
			case TerminalGroup: return {
				name: TerminalGroup,
				properties: [
					{ name: "cardinality" },
					{
						name: "elements",
						defaultValue: []
					},
					{ name: "lookahead" }
				]
			};
			case TerminalRuleCall: return {
				name: TerminalRuleCall,
				properties: [
					{ name: "cardinality" },
					{ name: "lookahead" },
					{ name: "rule" }
				]
			};
			case UnorderedGroup: return {
				name: UnorderedGroup,
				properties: [
					{ name: "cardinality" },
					{
						name: "elements",
						defaultValue: []
					},
					{ name: "lookahead" }
				]
			};
			case UntilToken: return {
				name: UntilToken,
				properties: [
					{ name: "cardinality" },
					{ name: "lookahead" },
					{ name: "terminal" }
				]
			};
			case Wildcard: return {
				name: Wildcard,
				properties: [{ name: "cardinality" }, { name: "lookahead" }]
			};
			default: return {
				name: type,
				properties: []
			};
		}
	}
};
const reflection$1 = new LangiumGrammarAstReflection();
var ast_utils_exports = {};
__export(ast_utils_exports, {
	assignMandatoryProperties: () => assignMandatoryProperties,
	copyAstNode: () => copyAstNode,
	findLocalReferences: () => findLocalReferences,
	findRootNode: () => findRootNode,
	getContainerOfType: () => getContainerOfType,
	getDocument: () => getDocument,
	hasContainerOfType: () => hasContainerOfType,
	linkContentToContainer: () => linkContentToContainer,
	streamAllContents: () => streamAllContents,
	streamAst: () => streamAst,
	streamContents: () => streamContents,
	streamReferences: () => streamReferences
});
function linkContentToContainer(node) {
	for (const [name, value] of Object.entries(node)) if (!name.startsWith("$")) {
		if (Array.isArray(value)) value.forEach((item, index) => {
			if (isAstNode(item)) {
				item.$container = node;
				item.$containerProperty = name;
				item.$containerIndex = index;
			}
		});
		else if (isAstNode(value)) {
			value.$container = node;
			value.$containerProperty = name;
		}
	}
}
function getContainerOfType(node, typePredicate) {
	let item = node;
	while (item) {
		if (typePredicate(item)) return item;
		item = item.$container;
	}
	return void 0;
}
function hasContainerOfType(node, predicate) {
	let item = node;
	while (item) {
		if (predicate(item)) return true;
		item = item.$container;
	}
	return false;
}
function getDocument(node) {
	const rootNode = findRootNode(node);
	const result = rootNode.$document;
	if (!result) throw new Error("AST node has no document.");
	return result;
}
function findRootNode(node) {
	while (node.$container) node = node.$container;
	return node;
}
function streamContents(node, options) {
	if (!node) throw new Error("Node must be an AstNode.");
	const range = options === null || options === void 0 ? void 0 : options.range;
	return new StreamImpl(() => ({
		keys: Object.keys(node),
		keyIndex: 0,
		arrayIndex: 0
	}), (state) => {
		while (state.keyIndex < state.keys.length) {
			const property = state.keys[state.keyIndex];
			if (!property.startsWith("$")) {
				const value = node[property];
				if (isAstNode(value)) {
					state.keyIndex++;
					if (isAstNodeInRange(value, range)) return {
						done: false,
						value
					};
				} else if (Array.isArray(value)) {
					while (state.arrayIndex < value.length) {
						const index = state.arrayIndex++;
						const element = value[index];
						if (isAstNode(element) && isAstNodeInRange(element, range)) return {
							done: false,
							value: element
						};
					}
					state.arrayIndex = 0;
				}
			}
			state.keyIndex++;
		}
		return DONE_RESULT;
	});
}
function streamAllContents(root, options) {
	if (!root) throw new Error("Root node must be an AstNode.");
	return new TreeStreamImpl(root, (node) => streamContents(node, options));
}
function streamAst(root, options) {
	if (!root) throw new Error("Root node must be an AstNode.");
	else if ((options === null || options === void 0 ? void 0 : options.range) && !isAstNodeInRange(root, options.range)) return new TreeStreamImpl(root, () => []);
	return new TreeStreamImpl(root, (node) => streamContents(node, options), { includeRoot: true });
}
function isAstNodeInRange(astNode, range) {
	var _a;
	if (!range) return true;
	const nodeRange = (_a = astNode.$cstNode) === null || _a === void 0 ? void 0 : _a.range;
	if (!nodeRange) return false;
	return inRange(nodeRange, range);
}
function streamReferences(node) {
	return new StreamImpl(() => ({
		keys: Object.keys(node),
		keyIndex: 0,
		arrayIndex: 0
	}), (state) => {
		while (state.keyIndex < state.keys.length) {
			const property = state.keys[state.keyIndex];
			if (!property.startsWith("$")) {
				const value = node[property];
				if (isReference(value)) {
					state.keyIndex++;
					return {
						done: false,
						value: {
							reference: value,
							container: node,
							property
						}
					};
				} else if (Array.isArray(value)) {
					while (state.arrayIndex < value.length) {
						const index = state.arrayIndex++;
						const element = value[index];
						if (isReference(element)) return {
							done: false,
							value: {
								reference: element,
								container: node,
								property,
								index
							}
						};
					}
					state.arrayIndex = 0;
				}
			}
			state.keyIndex++;
		}
		return DONE_RESULT;
	});
}
function findLocalReferences(targetNode, lookup = getDocument(targetNode).parseResult.value) {
	const refs = [];
	streamAst(lookup).forEach((node) => {
		streamReferences(node).forEach((refInfo) => {
			if (refInfo.reference.ref === targetNode) refs.push(refInfo.reference);
		});
	});
	return stream(refs);
}
function assignMandatoryProperties(reflection$2, node) {
	const typeMetaData = reflection$2.getTypeMetaData(node.$type);
	const genericNode = node;
	for (const property of typeMetaData.properties) if (property.defaultValue !== void 0 && genericNode[property.name] === void 0) genericNode[property.name] = copyDefaultValue(property.defaultValue);
}
function copyDefaultValue(propertyType) {
	if (Array.isArray(propertyType)) return [...propertyType.map(copyDefaultValue)];
	else return propertyType;
}
function copyAstNode(node, buildReference) {
	const copy = { $type: node.$type };
	for (const [name, value] of Object.entries(node)) if (!name.startsWith("$")) if (isAstNode(value)) copy[name] = copyAstNode(value, buildReference);
	else if (isReference(value)) copy[name] = buildReference(copy, name, value.$refNode, value.$refText);
	else if (Array.isArray(value)) {
		const copiedArray = [];
		for (const element of value) if (isAstNode(element)) copiedArray.push(copyAstNode(element, buildReference));
		else if (isReference(element)) copiedArray.push(buildReference(copy, name, element.$refNode, element.$refText));
		else copiedArray.push(element);
		copy[name] = copiedArray;
	} else copy[name] = value;
	linkContentToContainer(copy);
	return copy;
}
function cc(char) {
	return char.charCodeAt(0);
}
function insertToSet(item, set) {
	if (Array.isArray(item)) item.forEach(function(subItem) {
		set.push(subItem);
	});
	else set.push(item);
}
function addFlag(flagObj, flagKey) {
	if (flagObj[flagKey] === true) throw "duplicate flag " + flagKey;
	flagObj[flagKey];
	flagObj[flagKey] = true;
}
function ASSERT_EXISTS(obj) {
	// istanbul ignore next
	if (obj === void 0) throw Error("Internal Error - Should never get here!");
	return true;
}
// istanbul ignore next
function ASSERT_NEVER_REACH_HERE() {
	throw Error("Internal Error - Should never get here!");
}
function isCharacter(obj) {
	return obj["type"] === "Character";
}
const digitsCharCodes = [];
for (let i = cc("0"); i <= cc("9"); i++) digitsCharCodes.push(i);
const wordCharCodes = [cc("_")].concat(digitsCharCodes);
for (let i = cc("a"); i <= cc("z"); i++) wordCharCodes.push(i);
for (let i = cc("A"); i <= cc("Z"); i++) wordCharCodes.push(i);
const whitespaceCodes = [
	cc(" "),
	cc("\f"),
	cc("\n"),
	cc("\r"),
	cc("	"),
	cc("\v"),
	cc("	"),
	cc("\xA0"),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc(" "),
	cc("\u2028"),
	cc("\u2029"),
	cc(" "),
	cc(" "),
	cc("　"),
	cc("﻿")
];
const hexDigitPattern = /[0-9a-fA-F]/;
const decimalPattern = /[0-9]/;
const decimalPatternNoZero = /[1-9]/;
var RegExpParser = class {
	constructor() {
		this.idx = 0;
		this.input = "";
		this.groupIdx = 0;
	}
	saveState() {
		return {
			idx: this.idx,
			input: this.input,
			groupIdx: this.groupIdx
		};
	}
	restoreState(newState$1) {
		this.idx = newState$1.idx;
		this.input = newState$1.input;
		this.groupIdx = newState$1.groupIdx;
	}
	pattern(input) {
		this.idx = 0;
		this.input = input;
		this.groupIdx = 0;
		this.consumeChar("/");
		const value = this.disjunction();
		this.consumeChar("/");
		const flags = {
			type: "Flags",
			loc: {
				begin: this.idx,
				end: input.length
			},
			global: false,
			ignoreCase: false,
			multiLine: false,
			unicode: false,
			sticky: false
		};
		while (this.isRegExpFlag()) switch (this.popChar()) {
			case "g":
				addFlag(flags, "global");
				break;
			case "i":
				addFlag(flags, "ignoreCase");
				break;
			case "m":
				addFlag(flags, "multiLine");
				break;
			case "u":
				addFlag(flags, "unicode");
				break;
			case "y":
				addFlag(flags, "sticky");
				break;
		}
		if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx));
		return {
			type: "Pattern",
			flags,
			value,
			loc: this.loc(0)
		};
	}
	disjunction() {
		const alts = [];
		const begin = this.idx;
		alts.push(this.alternative());
		while (this.peekChar() === "|") {
			this.consumeChar("|");
			alts.push(this.alternative());
		}
		return {
			type: "Disjunction",
			value: alts,
			loc: this.loc(begin)
		};
	}
	alternative() {
		const terms = [];
		const begin = this.idx;
		while (this.isTerm()) terms.push(this.term());
		return {
			type: "Alternative",
			value: terms,
			loc: this.loc(begin)
		};
	}
	term() {
		if (this.isAssertion()) return this.assertion();
		else return this.atom();
	}
	assertion() {
		const begin = this.idx;
		switch (this.popChar()) {
			case "^": return {
				type: "StartAnchor",
				loc: this.loc(begin)
			};
			case "$": return {
				type: "EndAnchor",
				loc: this.loc(begin)
			};
			case "\\":
				switch (this.popChar()) {
					case "b": return {
						type: "WordBoundary",
						loc: this.loc(begin)
					};
					case "B": return {
						type: "NonWordBoundary",
						loc: this.loc(begin)
					};
				}
				// istanbul ignore next
				throw Error("Invalid Assertion Escape");
			case "(":
				this.consumeChar("?");
				let type;
				switch (this.popChar()) {
					case "=":
						type = "Lookahead";
						break;
					case "!":
						type = "NegativeLookahead";
						break;
				}
				ASSERT_EXISTS(type);
				const disjunction = this.disjunction();
				this.consumeChar(")");
				return {
					type,
					value: disjunction,
					loc: this.loc(begin)
				};
		}
		// istanbul ignore next
		return ASSERT_NEVER_REACH_HERE();
	}
	quantifier(isBacktracking = false) {
		let range = void 0;
		const begin = this.idx;
		switch (this.popChar()) {
			case "*":
				range = {
					atLeast: 0,
					atMost: Infinity
				};
				break;
			case "+":
				range = {
					atLeast: 1,
					atMost: Infinity
				};
				break;
			case "?":
				range = {
					atLeast: 0,
					atMost: 1
				};
				break;
			case "{":
				const atLeast = this.integerIncludingZero();
				switch (this.popChar()) {
					case "}":
						range = {
							atLeast,
							atMost: atLeast
						};
						break;
					case ",":
						let atMost;
						if (this.isDigit()) {
							atMost = this.integerIncludingZero();
							range = {
								atLeast,
								atMost
							};
						} else range = {
							atLeast,
							atMost: Infinity
						};
						this.consumeChar("}");
						break;
				}
				if (isBacktracking === true && range === void 0) return void 0;
				ASSERT_EXISTS(range);
				break;
		}
		if (isBacktracking === true && range === void 0) return void 0;
		// istanbul ignore else
		if (ASSERT_EXISTS(range)) {
			if (this.peekChar(0) === "?") {
				this.consumeChar("?");
				range.greedy = false;
			} else range.greedy = true;
			range.type = "Quantifier";
			range.loc = this.loc(begin);
			return range;
		}
	}
	atom() {
		let atom$1;
		const begin = this.idx;
		switch (this.peekChar()) {
			case ".":
				atom$1 = this.dotAll();
				break;
			case "\\":
				atom$1 = this.atomEscape();
				break;
			case "[":
				atom$1 = this.characterClass();
				break;
			case "(":
				atom$1 = this.group();
				break;
		}
		if (atom$1 === void 0 && this.isPatternCharacter()) atom$1 = this.patternCharacter();
		// istanbul ignore else
		if (ASSERT_EXISTS(atom$1)) {
			atom$1.loc = this.loc(begin);
			if (this.isQuantifier()) atom$1.quantifier = this.quantifier();
			return atom$1;
		}
		// istanbul ignore next
		return ASSERT_NEVER_REACH_HERE();
	}
	dotAll() {
		this.consumeChar(".");
		return {
			type: "Set",
			complement: true,
			value: [
				cc("\n"),
				cc("\r"),
				cc("\u2028"),
				cc("\u2029")
			]
		};
	}
	atomEscape() {
		this.consumeChar("\\");
		switch (this.peekChar()) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9": return this.decimalEscapeAtom();
			case "d":
			case "D":
			case "s":
			case "S":
			case "w":
			case "W": return this.characterClassEscape();
			case "f":
			case "n":
			case "r":
			case "t":
			case "v": return this.controlEscapeAtom();
			case "c": return this.controlLetterEscapeAtom();
			case "0": return this.nulCharacterAtom();
			case "x": return this.hexEscapeSequenceAtom();
			case "u": return this.regExpUnicodeEscapeSequenceAtom();
			default: return this.identityEscapeAtom();
		}
	}
	decimalEscapeAtom() {
		const value = this.positiveInteger();
		return {
			type: "GroupBackReference",
			value
		};
	}
	characterClassEscape() {
		let set;
		let complement = false;
		switch (this.popChar()) {
			case "d":
				set = digitsCharCodes;
				break;
			case "D":
				set = digitsCharCodes;
				complement = true;
				break;
			case "s":
				set = whitespaceCodes;
				break;
			case "S":
				set = whitespaceCodes;
				complement = true;
				break;
			case "w":
				set = wordCharCodes;
				break;
			case "W":
				set = wordCharCodes;
				complement = true;
				break;
		}
		// istanbul ignore else
		if (ASSERT_EXISTS(set)) return {
			type: "Set",
			value: set,
			complement
		};
		// istanbul ignore next
		return ASSERT_NEVER_REACH_HERE();
	}
	controlEscapeAtom() {
		let escapeCode;
		switch (this.popChar()) {
			case "f":
				escapeCode = cc("\f");
				break;
			case "n":
				escapeCode = cc("\n");
				break;
			case "r":
				escapeCode = cc("\r");
				break;
			case "t":
				escapeCode = cc("	");
				break;
			case "v":
				escapeCode = cc("\v");
				break;
		}
		// istanbul ignore else
		if (ASSERT_EXISTS(escapeCode)) return {
			type: "Character",
			value: escapeCode
		};
		// istanbul ignore next
		return ASSERT_NEVER_REACH_HERE();
	}
	controlLetterEscapeAtom() {
		this.consumeChar("c");
		const letter = this.popChar();
		if (/[a-zA-Z]/.test(letter) === false) throw Error("Invalid ");
		const letterCode = letter.toUpperCase().charCodeAt(0) - 64;
		return {
			type: "Character",
			value: letterCode
		};
	}
	nulCharacterAtom() {
		this.consumeChar("0");
		return {
			type: "Character",
			value: cc("\0")
		};
	}
	hexEscapeSequenceAtom() {
		this.consumeChar("x");
		return this.parseHexDigits(2);
	}
	regExpUnicodeEscapeSequenceAtom() {
		this.consumeChar("u");
		return this.parseHexDigits(4);
	}
	identityEscapeAtom() {
		const escapedChar = this.popChar();
		return {
			type: "Character",
			value: cc(escapedChar)
		};
	}
	classPatternCharacterAtom() {
		switch (this.peekChar()) {
			case "\n":
			case "\r":
			case "\u2028":
			case "\u2029":
			case "\\":
			case "]": throw Error("TBD");
			default:
				const nextChar = this.popChar();
				return {
					type: "Character",
					value: cc(nextChar)
				};
		}
	}
	characterClass() {
		const set = [];
		let complement = false;
		this.consumeChar("[");
		if (this.peekChar(0) === "^") {
			this.consumeChar("^");
			complement = true;
		}
		while (this.isClassAtom()) {
			const from = this.classAtom();
			from.type;
			if (isCharacter(from) && this.isRangeDash()) {
				this.consumeChar("-");
				const to = this.classAtom();
				to.type;
				if (isCharacter(to)) {
					if (to.value < from.value) throw Error("Range out of order in character class");
					set.push({
						from: from.value,
						to: to.value
					});
				} else {
					insertToSet(from.value, set);
					set.push(cc("-"));
					insertToSet(to.value, set);
				}
			} else insertToSet(from.value, set);
		}
		this.consumeChar("]");
		return {
			type: "Set",
			complement,
			value: set
		};
	}
	classAtom() {
		switch (this.peekChar()) {
			case "]":
			case "\n":
			case "\r":
			case "\u2028":
			case "\u2029": throw Error("TBD");
			case "\\": return this.classEscape();
			default: return this.classPatternCharacterAtom();
		}
	}
	classEscape() {
		this.consumeChar("\\");
		switch (this.peekChar()) {
			case "b":
				this.consumeChar("b");
				return {
					type: "Character",
					value: cc("\b")
				};
			case "d":
			case "D":
			case "s":
			case "S":
			case "w":
			case "W": return this.characterClassEscape();
			case "f":
			case "n":
			case "r":
			case "t":
			case "v": return this.controlEscapeAtom();
			case "c": return this.controlLetterEscapeAtom();
			case "0": return this.nulCharacterAtom();
			case "x": return this.hexEscapeSequenceAtom();
			case "u": return this.regExpUnicodeEscapeSequenceAtom();
			default: return this.identityEscapeAtom();
		}
	}
	group() {
		let capturing = true;
		this.consumeChar("(");
		switch (this.peekChar(0)) {
			case "?":
				this.consumeChar("?");
				this.consumeChar(":");
				capturing = false;
				break;
			default:
				this.groupIdx++;
				break;
		}
		const value = this.disjunction();
		this.consumeChar(")");
		const groupAst = {
			type: "Group",
			capturing,
			value
		};
		if (capturing) groupAst["idx"] = this.groupIdx;
		return groupAst;
	}
	positiveInteger() {
		let number$1 = this.popChar();
		// istanbul ignore next - can't ever get here due to previous lookahead checks
		if (decimalPatternNoZero.test(number$1) === false) throw Error("Expecting a positive integer");
		while (decimalPattern.test(this.peekChar(0))) number$1 += this.popChar();
		return parseInt(number$1, 10);
	}
	integerIncludingZero() {
		let number$1 = this.popChar();
		if (decimalPattern.test(number$1) === false) throw Error("Expecting an integer");
		while (decimalPattern.test(this.peekChar(0))) number$1 += this.popChar();
		return parseInt(number$1, 10);
	}
	patternCharacter() {
		const nextChar = this.popChar();
		switch (nextChar) {
			case "\n":
			case "\r":
			case "\u2028":
			case "\u2029":
			case "^":
			case "$":
			case "\\":
			case ".":
			case "*":
			case "+":
			case "?":
			case "(":
			case ")":
			case "[":
			case "|":
 // istanbul ignore next
			throw Error("TBD");
			default: return {
				type: "Character",
				value: cc(nextChar)
			};
		}
	}
	isRegExpFlag() {
		switch (this.peekChar(0)) {
			case "g":
			case "i":
			case "m":
			case "u":
			case "y": return true;
			default: return false;
		}
	}
	isRangeDash() {
		return this.peekChar() === "-" && this.isClassAtom(1);
	}
	isDigit() {
		return decimalPattern.test(this.peekChar(0));
	}
	isClassAtom(howMuch = 0) {
		switch (this.peekChar(howMuch)) {
			case "]":
			case "\n":
			case "\r":
			case "\u2028":
			case "\u2029": return false;
			default: return true;
		}
	}
	isTerm() {
		return this.isAtom() || this.isAssertion();
	}
	isAtom() {
		if (this.isPatternCharacter()) return true;
		switch (this.peekChar(0)) {
			case ".":
			case "\\":
			case "[":
			case "(": return true;
			default: return false;
		}
	}
	isAssertion() {
		switch (this.peekChar(0)) {
			case "^":
			case "$": return true;
			case "\\": switch (this.peekChar(1)) {
				case "b":
				case "B": return true;
				default: return false;
			}
			case "(": return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");
			default: return false;
		}
	}
	isQuantifier() {
		const prevState = this.saveState();
		try {
			return this.quantifier(true) !== void 0;
		} catch (e) {
			return false;
		} finally {
			this.restoreState(prevState);
		}
	}
	isPatternCharacter() {
		switch (this.peekChar()) {
			case "^":
			case "$":
			case "\\":
			case ".":
			case "*":
			case "+":
			case "?":
			case "(":
			case ")":
			case "[":
			case "|":
			case "/":
			case "\n":
			case "\r":
			case "\u2028":
			case "\u2029": return false;
			default: return true;
		}
	}
	parseHexDigits(howMany) {
		let hexString = "";
		for (let i = 0; i < howMany; i++) {
			const hexChar = this.popChar();
			if (hexDigitPattern.test(hexChar) === false) throw Error("Expecting a HexDecimal digits");
			hexString += hexChar;
		}
		const charCode = parseInt(hexString, 16);
		return {
			type: "Character",
			value: charCode
		};
	}
	peekChar(howMuch = 0) {
		return this.input[this.idx + howMuch];
	}
	popChar() {
		const nextChar = this.peekChar(0);
		this.consumeChar(void 0);
		return nextChar;
	}
	consumeChar(char) {
		if (char !== void 0 && this.input[this.idx] !== char) throw Error("Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
		if (this.idx >= this.input.length) throw Error("Unexpected end of input");
		this.idx++;
	}
	loc(begin) {
		return {
			begin,
			end: this.idx
		};
	}
};
var BaseRegExpVisitor = class {
	visitChildren(node) {
		for (const key in node) {
			const child = node[key];
			/* istanbul ignore else */
			if (node.hasOwnProperty(key)) {
				if (child.type !== void 0) this.visit(child);
				else if (Array.isArray(child)) child.forEach((subChild) => {
					this.visit(subChild);
				}, this);
			}
		}
	}
	visit(node) {
		switch (node.type) {
			case "Pattern":
				this.visitPattern(node);
				break;
			case "Flags":
				this.visitFlags(node);
				break;
			case "Disjunction":
				this.visitDisjunction(node);
				break;
			case "Alternative":
				this.visitAlternative(node);
				break;
			case "StartAnchor":
				this.visitStartAnchor(node);
				break;
			case "EndAnchor":
				this.visitEndAnchor(node);
				break;
			case "WordBoundary":
				this.visitWordBoundary(node);
				break;
			case "NonWordBoundary":
				this.visitNonWordBoundary(node);
				break;
			case "Lookahead":
				this.visitLookahead(node);
				break;
			case "NegativeLookahead":
				this.visitNegativeLookahead(node);
				break;
			case "Character":
				this.visitCharacter(node);
				break;
			case "Set":
				this.visitSet(node);
				break;
			case "Group":
				this.visitGroup(node);
				break;
			case "GroupBackReference":
				this.visitGroupBackReference(node);
				break;
			case "Quantifier":
				this.visitQuantifier(node);
				break;
		}
		this.visitChildren(node);
	}
	visitPattern(node) {}
	visitFlags(node) {}
	visitDisjunction(node) {}
	visitAlternative(node) {}
	visitStartAnchor(node) {}
	visitEndAnchor(node) {}
	visitWordBoundary(node) {}
	visitNonWordBoundary(node) {}
	visitLookahead(node) {}
	visitNegativeLookahead(node) {}
	visitCharacter(node) {}
	visitSet(node) {}
	visitGroup(node) {}
	visitGroupBackReference(node) {}
	visitQuantifier(node) {}
};
var regexp_utils_exports = {};
__export(regexp_utils_exports, {
	NEWLINE_REGEXP: () => NEWLINE_REGEXP,
	escapeRegExp: () => escapeRegExp,
	getCaseInsensitivePattern: () => getCaseInsensitivePattern,
	getTerminalParts: () => getTerminalParts,
	isMultilineComment: () => isMultilineComment,
	isWhitespace: () => isWhitespace,
	partialMatches: () => partialMatches,
	partialRegExp: () => partialRegExp,
	whitespaceCharacters: () => whitespaceCharacters
});
const NEWLINE_REGEXP = /\r?\n/gm;
const regexpParser = new RegExpParser();
var TerminalRegExpVisitor = class extends BaseRegExpVisitor {
	constructor() {
		super(...arguments);
		this.isStarting = true;
		this.endRegexpStack = [];
		this.multiline = false;
	}
	get endRegex() {
		return this.endRegexpStack.join("");
	}
	reset(regex) {
		this.multiline = false;
		this.regex = regex;
		this.startRegexp = "";
		this.isStarting = true;
		this.endRegexpStack = [];
	}
	visitGroup(node) {
		if (node.quantifier) {
			this.isStarting = false;
			this.endRegexpStack = [];
		}
	}
	visitCharacter(node) {
		const char = String.fromCharCode(node.value);
		if (!this.multiline && char === "\n") this.multiline = true;
		if (node.quantifier) {
			this.isStarting = false;
			this.endRegexpStack = [];
		} else {
			const escapedChar = escapeRegExp(char);
			this.endRegexpStack.push(escapedChar);
			if (this.isStarting) this.startRegexp += escapedChar;
		}
	}
	visitSet(node) {
		if (!this.multiline) {
			const set = this.regex.substring(node.loc.begin, node.loc.end);
			const regex = new RegExp(set);
			this.multiline = Boolean("\n".match(regex));
		}
		if (node.quantifier) {
			this.isStarting = false;
			this.endRegexpStack = [];
		} else {
			const set = this.regex.substring(node.loc.begin, node.loc.end);
			this.endRegexpStack.push(set);
			if (this.isStarting) this.startRegexp += set;
		}
	}
	visitChildren(node) {
		if (node.type === "Group") {
			const group = node;
			if (group.quantifier) return;
		}
		super.visitChildren(node);
	}
};
const visitor = new TerminalRegExpVisitor();
function getTerminalParts(regexp) {
	try {
		if (typeof regexp !== "string") regexp = regexp.source;
		regexp = `/${regexp}/`;
		const pattern = regexpParser.pattern(regexp);
		const parts = [];
		for (const alternative of pattern.value.value) {
			visitor.reset(regexp);
			visitor.visit(alternative);
			parts.push({
				start: visitor.startRegexp,
				end: visitor.endRegex
			});
		}
		return parts;
	} catch (_a) {
		return [];
	}
}
function isMultilineComment(regexp) {
	try {
		if (typeof regexp === "string") regexp = new RegExp(regexp);
		regexp = regexp.toString();
		visitor.reset(regexp);
		visitor.visit(regexpParser.pattern(regexp));
		return visitor.multiline;
	} catch (_a) {
		return false;
	}
}
const whitespaceCharacters = "\f\n\r	\v \xA0            \u2028\u2029  　﻿".split("");
function isWhitespace(value) {
	const regexp = typeof value === "string" ? new RegExp(value) : value;
	return whitespaceCharacters.some((ws) => regexp.test(ws));
}
function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function getCaseInsensitivePattern(keyword) {
	return Array.prototype.map.call(keyword, (letter) => /\w/.test(letter) ? `[${letter.toLowerCase()}${letter.toUpperCase()}]` : escapeRegExp(letter)).join("");
}
function partialMatches(regex, input) {
	const partial = partialRegExp(regex);
	const match = input.match(partial);
	return !!match && match[0].length > 0;
}
function partialRegExp(regex) {
	if (typeof regex === "string") regex = new RegExp(regex);
	const re = regex, source = regex.source;
	let i = 0;
	function process$1() {
		let result = "", tmp;
		function appendRaw(nbChars) {
			result += source.substr(i, nbChars);
			i += nbChars;
		}
		function appendOptional(nbChars) {
			result += "(?:" + source.substr(i, nbChars) + "|$)";
			i += nbChars;
		}
		while (i < source.length) switch (source[i]) {
			case "\\":
				switch (source[i + 1]) {
					case "c":
						appendOptional(3);
						break;
					case "x":
						appendOptional(4);
						break;
					case "u":
						if (re.unicode) if (source[i + 2] === "{") appendOptional(source.indexOf("}", i) - i + 1);
						else appendOptional(6);
						else appendOptional(2);
						break;
					case "p":
					case "P":
						if (re.unicode) appendOptional(source.indexOf("}", i) - i + 1);
						else appendOptional(2);
						break;
					case "k":
						appendOptional(source.indexOf(">", i) - i + 1);
						break;
					default:
						appendOptional(2);
						break;
				}
				break;
			case "[":
				tmp = /\[(?:\\.|.)*?\]/g;
				tmp.lastIndex = i;
				tmp = tmp.exec(source) || [];
				appendOptional(tmp[0].length);
				break;
			case "|":
			case "^":
			case "$":
			case "*":
			case "+":
			case "?":
				appendRaw(1);
				break;
			case "{":
				tmp = /\{\d+,?\d*\}/g;
				tmp.lastIndex = i;
				tmp = tmp.exec(source);
				if (tmp) appendRaw(tmp[0].length);
				else appendOptional(1);
				break;
			case "(":
				if (source[i + 1] === "?") switch (source[i + 2]) {
					case ":":
						result += "(?:";
						i += 3;
						result += process$1() + "|$)";
						break;
					case "=":
						result += "(?=";
						i += 3;
						result += process$1() + ")";
						break;
					case "!":
						tmp = i;
						i += 3;
						process$1();
						result += source.substr(tmp, i - tmp);
						break;
					case "<":
						switch (source[i + 3]) {
							case "=":
							case "!":
								tmp = i;
								i += 4;
								process$1();
								result += source.substr(tmp, i - tmp);
								break;
							default:
								appendRaw(source.indexOf(">", i) - i + 1);
								result += process$1() + "|$)";
								break;
						}
						break;
				}
				else {
					appendRaw(1);
					result += process$1() + "|$)";
				}
				break;
			case ")":
				++i;
				return result;
			default:
				appendOptional(1);
				break;
		}
		return result;
	}
	return new RegExp(process$1(), regex.flags);
}
var grammar_utils_exports = {};
__export(grammar_utils_exports, {
	findAssignment: () => findAssignment,
	findNameAssignment: () => findNameAssignment,
	findNodeForKeyword: () => findNodeForKeyword,
	findNodeForProperty: () => findNodeForProperty,
	findNodesForKeyword: () => findNodesForKeyword,
	findNodesForKeywordInternal: () => findNodesForKeywordInternal,
	findNodesForProperty: () => findNodesForProperty,
	getActionAtElement: () => getActionAtElement,
	getActionType: () => getActionType,
	getAllReachableRules: () => getAllReachableRules,
	getCrossReferenceTerminal: () => getCrossReferenceTerminal,
	getEntryRule: () => getEntryRule,
	getExplicitRuleType: () => getExplicitRuleType,
	getHiddenRules: () => getHiddenRules,
	getRuleType: () => getRuleType,
	getRuleTypeName: () => getRuleTypeName,
	getTypeName: () => getTypeName,
	isArrayCardinality: () => isArrayCardinality,
	isArrayOperator: () => isArrayOperator,
	isCommentTerminal: () => isCommentTerminal,
	isDataType: () => isDataType,
	isDataTypeRule: () => isDataTypeRule,
	isOptionalCardinality: () => isOptionalCardinality,
	terminalRegex: () => terminalRegex
});
function getEntryRule(grammar) {
	return grammar.rules.find((e) => isParserRule(e) && e.entry);
}
function getHiddenRules(grammar) {
	return grammar.rules.filter((e) => isTerminalRule(e) && e.hidden);
}
function getAllReachableRules(grammar, allTerminals) {
	const ruleNames = /* @__PURE__ */ new Set();
	const entryRule = getEntryRule(grammar);
	if (!entryRule) return new Set(grammar.rules);
	const topMostRules = [entryRule].concat(getHiddenRules(grammar));
	for (const rule of topMostRules) ruleDfs(rule, ruleNames, allTerminals);
	const rules = /* @__PURE__ */ new Set();
	for (const rule of grammar.rules) if (ruleNames.has(rule.name) || isTerminalRule(rule) && rule.hidden) rules.add(rule);
	return rules;
}
function ruleDfs(rule, visitedSet, allTerminals) {
	visitedSet.add(rule.name);
	streamAllContents(rule).forEach((node) => {
		if (isRuleCall(node) || allTerminals && isTerminalRuleCall(node)) {
			const refRule = node.rule.ref;
			if (refRule && !visitedSet.has(refRule.name)) ruleDfs(refRule, visitedSet, allTerminals);
		}
	});
}
function getCrossReferenceTerminal(crossRef) {
	if (crossRef.terminal) return crossRef.terminal;
	else if (crossRef.type.ref) {
		const nameAssigment = findNameAssignment(crossRef.type.ref);
		return nameAssigment === null || nameAssigment === void 0 ? void 0 : nameAssigment.terminal;
	}
	return void 0;
}
function isCommentTerminal(terminalRule) {
	return terminalRule.hidden && !isWhitespace(terminalRegex(terminalRule));
}
function findNodesForProperty(node, property) {
	if (!node || !property) return [];
	return findNodesForPropertyInternal(node, property, node.astNode, true);
}
function findNodeForProperty(node, property, index) {
	if (!node || !property) return void 0;
	const nodes = findNodesForPropertyInternal(node, property, node.astNode, true);
	if (nodes.length === 0) return void 0;
	if (index !== void 0) index = Math.max(0, Math.min(index, nodes.length - 1));
	else index = 0;
	return nodes[index];
}
function findNodesForPropertyInternal(node, property, element, first$1) {
	if (!first$1) {
		const nodeFeature = getContainerOfType(node.grammarSource, isAssignment);
		if (nodeFeature && nodeFeature.feature === property) return [node];
	}
	if (isCompositeCstNode(node) && node.astNode === element) return node.content.flatMap((e) => findNodesForPropertyInternal(e, property, element, false));
	return [];
}
function findNodesForKeyword(node, keyword) {
	if (!node) return [];
	return findNodesForKeywordInternal(node, keyword, node === null || node === void 0 ? void 0 : node.astNode);
}
function findNodeForKeyword(node, keyword, index) {
	if (!node) return void 0;
	const nodes = findNodesForKeywordInternal(node, keyword, node === null || node === void 0 ? void 0 : node.astNode);
	if (nodes.length === 0) return void 0;
	if (index !== void 0) index = Math.max(0, Math.min(index, nodes.length - 1));
	else index = 0;
	return nodes[index];
}
function findNodesForKeywordInternal(node, keyword, element) {
	if (node.astNode !== element) return [];
	if (isKeyword(node.grammarSource) && node.grammarSource.value === keyword) return [node];
	const treeIterator = streamCst(node).iterator();
	let result;
	const keywordNodes = [];
	do {
		result = treeIterator.next();
		if (!result.done) {
			const childNode = result.value;
			if (childNode.astNode === element) {
				if (isKeyword(childNode.grammarSource) && childNode.grammarSource.value === keyword) keywordNodes.push(childNode);
			} else treeIterator.prune();
		}
	} while (!result.done);
	return keywordNodes;
}
function findAssignment(cstNode) {
	var _a;
	const astNode = cstNode.astNode;
	while (astNode === ((_a = cstNode.container) === null || _a === void 0 ? void 0 : _a.astNode)) {
		const assignment = getContainerOfType(cstNode.grammarSource, isAssignment);
		if (assignment) return assignment;
		cstNode = cstNode.container;
	}
	return void 0;
}
function findNameAssignment(type) {
	let startNode = type;
	if (isInferredType(startNode)) if (isAction(startNode.$container)) startNode = startNode.$container.$container;
	else if (isParserRule(startNode.$container)) startNode = startNode.$container;
	else assertUnreachable(startNode.$container);
	return findNameAssignmentInternal(type, startNode, /* @__PURE__ */ new Map());
}
function findNameAssignmentInternal(type, startNode, cache) {
	var _a;
	function go(node, refType) {
		let childAssignment = void 0;
		const parentAssignment = getContainerOfType(node, isAssignment);
		if (!parentAssignment) childAssignment = findNameAssignmentInternal(refType, refType, cache);
		cache.set(type, childAssignment);
		return childAssignment;
	}
	if (cache.has(type)) return cache.get(type);
	cache.set(type, void 0);
	for (const node of streamAllContents(startNode)) if (isAssignment(node) && node.feature.toLowerCase() === "name") {
		cache.set(type, node);
		return node;
	} else if (isRuleCall(node) && isParserRule(node.rule.ref)) return go(node, node.rule.ref);
	else if (isSimpleType(node) && ((_a = node.typeRef) === null || _a === void 0 ? void 0 : _a.ref)) return go(node, node.typeRef.ref);
	return void 0;
}
function getActionAtElement(element) {
	const parent = element.$container;
	if (isGroup(parent)) {
		const elements = parent.elements;
		const index = elements.indexOf(element);
		for (let i = index - 1; i >= 0; i--) {
			const item = elements[i];
			if (isAction(item)) return item;
			else {
				const action = streamAllContents(elements[i]).find(isAction);
				if (action) return action;
			}
		}
	}
	if (isAbstractElement(parent)) return getActionAtElement(parent);
	else return void 0;
}
function isOptionalCardinality(cardinality, element) {
	return cardinality === "?" || cardinality === "*" || isGroup(element) && Boolean(element.guardCondition);
}
function isArrayCardinality(cardinality) {
	return cardinality === "*" || cardinality === "+";
}
function isArrayOperator(operator) {
	return operator === "+=";
}
function isDataTypeRule(rule) {
	return isDataTypeRuleInternal(rule, /* @__PURE__ */ new Set());
}
function isDataTypeRuleInternal(rule, visited) {
	if (visited.has(rule)) return true;
	else visited.add(rule);
	for (const node of streamAllContents(rule)) if (isRuleCall(node)) {
		if (!node.rule.ref) return false;
		if (isParserRule(node.rule.ref) && !isDataTypeRuleInternal(node.rule.ref, visited)) return false;
	} else if (isAssignment(node)) return false;
	else if (isAction(node)) return false;
	return Boolean(rule.definition);
}
function isDataType(type) {
	return isDataTypeInternal(type.type, /* @__PURE__ */ new Set());
}
function isDataTypeInternal(type, visited) {
	if (visited.has(type)) return true;
	else visited.add(type);
	if (isArrayType(type)) return false;
	else if (isReferenceType(type)) return false;
	else if (isUnionType(type)) return type.types.every((e) => isDataTypeInternal(e, visited));
	else if (isSimpleType(type)) if (type.primitiveType !== void 0) return true;
	else if (type.stringType !== void 0) return true;
	else if (type.typeRef !== void 0) {
		const ref = type.typeRef.ref;
		if (isType(ref)) return isDataTypeInternal(ref.type, visited);
		else return false;
	} else return false;
	else return false;
}
function getExplicitRuleType(rule) {
	if (rule.inferredType) return rule.inferredType.name;
	else if (rule.dataType) return rule.dataType;
	else if (rule.returnType) {
		const refType = rule.returnType.ref;
		if (refType) {
			if (isParserRule(refType)) return refType.name;
			else if (isInterface(refType) || isType(refType)) return refType.name;
		}
	}
	return void 0;
}
function getTypeName(type) {
	var _a;
	if (isParserRule(type)) return isDataTypeRule(type) ? type.name : (_a = getExplicitRuleType(type)) !== null && _a !== void 0 ? _a : type.name;
	else if (isInterface(type) || isType(type) || isReturnType(type)) return type.name;
	else if (isAction(type)) {
		const actionType = getActionType(type);
		if (actionType) return actionType;
	} else if (isInferredType(type)) return type.name;
	throw new Error("Cannot get name of Unknown Type");
}
function getActionType(action) {
	var _a;
	if (action.inferredType) return action.inferredType.name;
	else if ((_a = action.type) === null || _a === void 0 ? void 0 : _a.ref) return getTypeName(action.type.ref);
	return void 0;
}
function getRuleTypeName(rule) {
	var _a, _b, _c;
	if (isTerminalRule(rule)) return (_b = (_a = rule.type) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "string";
	else return isDataTypeRule(rule) ? rule.name : (_c = getExplicitRuleType(rule)) !== null && _c !== void 0 ? _c : rule.name;
}
function getRuleType(rule) {
	var _a, _b, _c;
	if (isTerminalRule(rule)) return (_b = (_a = rule.type) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "string";
	else return (_c = getExplicitRuleType(rule)) !== null && _c !== void 0 ? _c : rule.name;
}
function terminalRegex(terminalRule) {
	const flags = {
		s: false,
		i: false,
		u: false
	};
	const source = abstractElementToRegex(terminalRule.definition, flags);
	const flagText = Object.entries(flags).filter(([, value]) => value).map(([name]) => name).join("");
	return new RegExp(source, flagText);
}
const WILDCARD = /[\s\S]/.source;
function abstractElementToRegex(element, flags) {
	if (isTerminalAlternatives(element)) return terminalAlternativesToRegex(element);
	else if (isTerminalGroup(element)) return terminalGroupToRegex(element);
	else if (isCharacterRange(element)) return characterRangeToRegex(element);
	else if (isTerminalRuleCall(element)) {
		const rule = element.rule.ref;
		if (!rule) throw new Error("Missing rule reference.");
		return withCardinality(abstractElementToRegex(rule.definition), {
			cardinality: element.cardinality,
			lookahead: element.lookahead
		});
	} else if (isNegatedToken(element)) return negateTokenToRegex(element);
	else if (isUntilToken(element)) return untilTokenToRegex(element);
	else if (isRegexToken(element)) {
		const lastSlash = element.regex.lastIndexOf("/");
		const source = element.regex.substring(1, lastSlash);
		const regexFlags = element.regex.substring(lastSlash + 1);
		if (flags) {
			flags.i = regexFlags.includes("i");
			flags.s = regexFlags.includes("s");
			flags.u = regexFlags.includes("u");
		}
		return withCardinality(source, {
			cardinality: element.cardinality,
			lookahead: element.lookahead,
			wrap: false
		});
	} else if (isWildcard(element)) return withCardinality(WILDCARD, {
		cardinality: element.cardinality,
		lookahead: element.lookahead
	});
	else throw new Error(`Invalid terminal element: ${element === null || element === void 0 ? void 0 : element.$type}`);
}
function terminalAlternativesToRegex(alternatives) {
	return withCardinality(alternatives.elements.map((e) => abstractElementToRegex(e)).join("|"), {
		cardinality: alternatives.cardinality,
		lookahead: alternatives.lookahead
	});
}
function terminalGroupToRegex(group) {
	return withCardinality(group.elements.map((e) => abstractElementToRegex(e)).join(""), {
		cardinality: group.cardinality,
		lookahead: group.lookahead
	});
}
function untilTokenToRegex(until) {
	return withCardinality(`${WILDCARD}*?${abstractElementToRegex(until.terminal)}`, {
		cardinality: until.cardinality,
		lookahead: until.lookahead
	});
}
function negateTokenToRegex(negate$1) {
	return withCardinality(`(?!${abstractElementToRegex(negate$1.terminal)})${WILDCARD}*?`, {
		cardinality: negate$1.cardinality,
		lookahead: negate$1.lookahead
	});
}
function characterRangeToRegex(range) {
	if (range.right) return withCardinality(`[${keywordToRegex(range.left)}-${keywordToRegex(range.right)}]`, {
		cardinality: range.cardinality,
		lookahead: range.lookahead,
		wrap: false
	});
	return withCardinality(keywordToRegex(range.left), {
		cardinality: range.cardinality,
		lookahead: range.lookahead,
		wrap: false
	});
}
function keywordToRegex(keyword) {
	return escapeRegExp(keyword.value);
}
function withCardinality(regex, options) {
	var _a;
	if (options.wrap !== false || options.lookahead) regex = `(${(_a = options.lookahead) !== null && _a !== void 0 ? _a : ""}${regex})`;
	if (options.cardinality) return `${regex}${options.cardinality}`;
	return regex;
}
function createGrammarConfig(services) {
	const rules = [];
	const grammar = services.Grammar;
	for (const rule of grammar.rules) if (isTerminalRule(rule) && isCommentTerminal(rule) && isMultilineComment(terminalRegex(rule))) rules.push(rule.name);
	return {
		multilineCommentRules: rules,
		nameRegexp: DefaultNameRegexp
	};
}
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
var assign = _createAssigner_default(function(object, source) {
	if (_isPrototype_default(source) || isArrayLike_default(source)) {
		_copyObject_default(source, keys_default(source), object);
		return;
	}
	for (var key in source) if (hasOwnProperty$1.call(source, key)) _assignValue_default(object, key, source[key]);
});
var assign_default = assign;
function baseSlice(array$1, start, end) {
	var index = -1, length = array$1.length;
	if (start < 0) start = -start > length ? 0 : length + start;
	end = end > length ? length : end;
	if (end < 0) end += length;
	length = start > end ? 0 : end - start >>> 0;
	start >>>= 0;
	var result = Array(length);
	while (++index < length) result[index] = array$1[index + start];
	return result;
}
var _baseSlice_default = baseSlice;
function compact(array$1) {
	var index = -1, length = array$1 == null ? 0 : array$1.length, resIndex = 0, result = [];
	while (++index < length) {
		var value = array$1[index];
		if (value) result[resIndex++] = value;
	}
	return result;
}
var compact_default = compact;
function arrayAggregator(array$1, setter, iteratee, accumulator) {
	var index = -1, length = array$1 == null ? 0 : array$1.length;
	while (++index < length) {
		var value = array$1[index];
		setter(accumulator, value, iteratee(value), array$1);
	}
	return accumulator;
}
var _arrayAggregator_default = arrayAggregator;
function baseAggregator(collection, setter, iteratee, accumulator) {
	_baseEach_default(collection, function(value, key, collection$1) {
		setter(accumulator, value, iteratee(value), collection$1);
	});
	return accumulator;
}
var _baseAggregator_default = baseAggregator;
function createAggregator(setter, initializer) {
	return function(collection, iteratee) {
		var func$1 = isArray_default(collection) ? _arrayAggregator_default : _baseAggregator_default, accumulator = initializer ? initializer() : {};
		return func$1(collection, setter, _baseIteratee_default(iteratee, 2), accumulator);
	};
}
var _createAggregator_default = createAggregator;
var LARGE_ARRAY_SIZE = 200;
function baseDifference(array$1, values, iteratee, comparator) {
	var index = -1, includes$1 = _arrayIncludes_default, isCommon = true, length = array$1.length, result = [], valuesLength = values.length;
	if (!length) return result;
	if (iteratee) values = _arrayMap_default(values, _baseUnary_default(iteratee));
	if (comparator) {
		includes$1 = _arrayIncludesWith_default;
		isCommon = false;
	} else if (values.length >= LARGE_ARRAY_SIZE) {
		includes$1 = _cacheHas_default;
		isCommon = false;
		values = new _SetCache_default(values);
	}
	outer: while (++index < length) {
		var value = array$1[index], computed = iteratee == null ? value : iteratee(value);
		value = comparator || value !== 0 ? value : 0;
		if (isCommon && computed === computed) {
			var valuesIndex = valuesLength;
			while (valuesIndex--) if (values[valuesIndex] === computed) continue outer;
			result.push(value);
		} else if (!includes$1(values, computed, comparator)) result.push(value);
	}
	return result;
}
var _baseDifference_default = baseDifference;
var difference = _baseRest_default(function(array$1, values) {
	return isArrayLikeObject_default(array$1) ? _baseDifference_default(array$1, _baseFlatten_default(values, 1, isArrayLikeObject_default, true)) : [];
});
var difference_default = difference;
function drop(array$1, n, guard) {
	var length = array$1 == null ? 0 : array$1.length;
	if (!length) return [];
	n = guard || n === void 0 ? 1 : toInteger_default(n);
	return _baseSlice_default(array$1, n < 0 ? 0 : n, length);
}
var drop_default = drop;
function dropRight(array$1, n, guard) {
	var length = array$1 == null ? 0 : array$1.length;
	if (!length) return [];
	n = guard || n === void 0 ? 1 : toInteger_default(n);
	n = length - n;
	return _baseSlice_default(array$1, 0, n < 0 ? 0 : n);
}
var dropRight_default = dropRight;
function arrayEvery(array$1, predicate) {
	var index = -1, length = array$1 == null ? 0 : array$1.length;
	while (++index < length) if (!predicate(array$1[index], index, array$1)) return false;
	return true;
}
var _arrayEvery_default = arrayEvery;
function baseEvery(collection, predicate) {
	var result = true;
	_baseEach_default(collection, function(value, index, collection$1) {
		result = !!predicate(value, index, collection$1);
		return result;
	});
	return result;
}
var _baseEvery_default = baseEvery;
function every(collection, predicate, guard) {
	var func$1 = isArray_default(collection) ? _arrayEvery_default : _baseEvery_default;
	if (guard && _isIterateeCall_default(collection, predicate, guard)) predicate = void 0;
	return func$1(collection, _baseIteratee_default(predicate, 3));
}
var every_default = every;
function head(array$1) {
	return array$1 && array$1.length ? array$1[0] : void 0;
}
var head_default = head;
function flatMap(collection, iteratee) {
	return _baseFlatten_default(map_default(collection, iteratee), 1);
}
var flatMap_default = flatMap;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var groupBy = _createAggregator_default(function(result, value, key) {
	if (hasOwnProperty.call(result, key)) result[key].push(value);
	else _baseAssignValue_default(result, key, [value]);
});
var groupBy_default = groupBy;
var nativeMax$1 = Math.max;
function includes(collection, value, fromIndex, guard) {
	collection = isArrayLike_default(collection) ? collection : values_default(collection);
	fromIndex = fromIndex && !guard ? toInteger_default(fromIndex) : 0;
	var length = collection.length;
	if (fromIndex < 0) fromIndex = nativeMax$1(length + fromIndex, 0);
	return isString_default(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && _baseIndexOf_default(collection, value, fromIndex) > -1;
}
var includes_default = includes;
var nativeMax = Math.max;
function indexOf(array$1, value, fromIndex) {
	var length = array$1 == null ? 0 : array$1.length;
	if (!length) return -1;
	var index = fromIndex == null ? 0 : toInteger_default(fromIndex);
	if (index < 0) index = nativeMax(length + index, 0);
	return _baseIndexOf_default(array$1, value, index);
}
var indexOf_default = indexOf;
var regexpTag = "[object RegExp]";
function baseIsRegExp(value) {
	return isObjectLike_default(value) && _baseGetTag_default(value) == regexpTag;
}
var _baseIsRegExp_default = baseIsRegExp;
var nodeIsRegExp = _nodeUtil_default && _nodeUtil_default.isRegExp;
var isRegExp = nodeIsRegExp ? _baseUnary_default(nodeIsRegExp) : _baseIsRegExp_default;
var isRegExp_default = isRegExp;
var FUNC_ERROR_TEXT = "Expected a function";
function negate(predicate) {
	if (typeof predicate != "function") throw new TypeError(FUNC_ERROR_TEXT);
	return function() {
		var args = arguments;
		switch (args.length) {
			case 0: return !predicate.call(this);
			case 1: return !predicate.call(this, args[0]);
			case 2: return !predicate.call(this, args[0], args[1]);
			case 3: return !predicate.call(this, args[0], args[1], args[2]);
		}
		return !predicate.apply(this, args);
	};
}
var negate_default = negate;
function pickBy(object, predicate) {
	if (object == null) return {};
	var props = _arrayMap_default(_getAllKeysIn_default(object), function(prop) {
		return [prop];
	});
	predicate = _baseIteratee_default(predicate);
	return _basePickBy_default(object, props, function(value, path) {
		return predicate(value, path[0]);
	});
}
var pickBy_default = pickBy;
function reject(collection, predicate) {
	var func$1 = isArray_default(collection) ? _arrayFilter_default : _baseFilter_default;
	return func$1(collection, negate_default(_baseIteratee_default(predicate, 3)));
}
var reject_default = reject;
function baseSome(collection, predicate) {
	var result;
	_baseEach_default(collection, function(value, index, collection$1) {
		result = predicate(value, index, collection$1);
		return !result;
	});
	return !!result;
}
var _baseSome_default = baseSome;
function some(collection, predicate, guard) {
	var func$1 = isArray_default(collection) ? _arraySome_default : _baseSome_default;
	if (guard && _isIterateeCall_default(collection, predicate, guard)) predicate = void 0;
	return func$1(collection, _baseIteratee_default(predicate, 3));
}
var some_default = some;
function uniq(array$1) {
	return array$1 && array$1.length ? _baseUniq_default(array$1) : [];
}
var uniq_default = uniq;
function uniqBy(array$1, iteratee) {
	return array$1 && array$1.length ? _baseUniq_default(array$1, _baseIteratee_default(iteratee, 2)) : [];
}
var uniqBy_default = uniqBy;
function PRINT_ERROR(msg) {
	/* istanbul ignore else - can't override global.console in node.js */
	if (console && console.error) console.error(`Error: ${msg}`);
}
function PRINT_WARNING(msg) {
	/* istanbul ignore else - can't override global.console in node.js*/
	if (console && console.warn) console.warn(`Warning: ${msg}`);
}
function timer(func$1) {
	const start = (/* @__PURE__ */ new Date()).getTime();
	const val = func$1();
	const end = (/* @__PURE__ */ new Date()).getTime();
	const total = end - start;
	return {
		time: total,
		value: val
	};
}
function toFastProperties(toBecomeFast) {
	function FakeConstructor() {}
	FakeConstructor.prototype = toBecomeFast;
	const fakeInstance = new FakeConstructor();
	function fakeAccess() {
		return typeof fakeInstance.bar;
	}
	fakeAccess();
	fakeAccess();
	return toBecomeFast;
}
function tokenLabel$1(tokType) {
	if (hasTokenLabel$1(tokType)) return tokType.LABEL;
	else return tokType.name;
}
function hasTokenLabel$1(obj) {
	return isString_default(obj.LABEL) && obj.LABEL !== "";
}
var AbstractProduction = class {
	get definition() {
		return this._definition;
	}
	set definition(value) {
		this._definition = value;
	}
	constructor(_definition) {
		this._definition = _definition;
	}
	accept(visitor$1) {
		visitor$1.visit(this);
		forEach_default(this.definition, (prod) => {
			prod.accept(visitor$1);
		});
	}
};
var NonTerminal = class extends AbstractProduction {
	constructor(options) {
		super([]);
		this.idx = 1;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
	set definition(definition) {}
	get definition() {
		if (this.referencedRule !== void 0) return this.referencedRule.definition;
		return [];
	}
	accept(visitor$1) {
		visitor$1.visit(this);
	}
};
var Rule = class extends AbstractProduction {
	constructor(options) {
		super(options.definition);
		this.orgText = "";
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
};
var Alternative = class extends AbstractProduction {
	constructor(options) {
		super(options.definition);
		this.ignoreAmbiguities = false;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
};
var Option$1 = class extends AbstractProduction {
	constructor(options) {
		super(options.definition);
		this.idx = 1;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
};
var RepetitionMandatory = class extends AbstractProduction {
	constructor(options) {
		super(options.definition);
		this.idx = 1;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
};
var RepetitionMandatoryWithSeparator = class extends AbstractProduction {
	constructor(options) {
		super(options.definition);
		this.idx = 1;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
};
var Repetition = class extends AbstractProduction {
	constructor(options) {
		super(options.definition);
		this.idx = 1;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
};
var RepetitionWithSeparator = class extends AbstractProduction {
	constructor(options) {
		super(options.definition);
		this.idx = 1;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
};
var Alternation = class extends AbstractProduction {
	get definition() {
		return this._definition;
	}
	set definition(value) {
		this._definition = value;
	}
	constructor(options) {
		super(options.definition);
		this.idx = 1;
		this.ignoreAmbiguities = false;
		this.hasPredicates = false;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
};
var Terminal = class {
	constructor(options) {
		this.idx = 1;
		assign_default(this, pickBy_default(options, (v) => v !== void 0));
	}
	accept(visitor$1) {
		visitor$1.visit(this);
	}
};
function serializeGrammar(topRules) {
	return map_default(topRules, serializeProduction);
}
function serializeProduction(node) {
	function convertDefinition(definition) {
		return map_default(definition, serializeProduction);
	}
	/* istanbul ignore else */
	if (node instanceof NonTerminal) {
		const serializedNonTerminal = {
			type: "NonTerminal",
			name: node.nonTerminalName,
			idx: node.idx
		};
		if (isString_default(node.label)) serializedNonTerminal.label = node.label;
		return serializedNonTerminal;
	} else if (node instanceof Alternative) return {
		type: "Alternative",
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof Option$1) return {
		type: "Option",
		idx: node.idx,
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof RepetitionMandatory) return {
		type: "RepetitionMandatory",
		idx: node.idx,
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof RepetitionMandatoryWithSeparator) return {
		type: "RepetitionMandatoryWithSeparator",
		idx: node.idx,
		separator: serializeProduction(new Terminal({ terminalType: node.separator })),
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof RepetitionWithSeparator) return {
		type: "RepetitionWithSeparator",
		idx: node.idx,
		separator: serializeProduction(new Terminal({ terminalType: node.separator })),
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof Repetition) return {
		type: "Repetition",
		idx: node.idx,
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof Alternation) return {
		type: "Alternation",
		idx: node.idx,
		definition: convertDefinition(node.definition)
	};
	else if (node instanceof Terminal) {
		const serializedTerminal = {
			type: "Terminal",
			name: node.terminalType.name,
			label: tokenLabel$1(node.terminalType),
			idx: node.idx
		};
		if (isString_default(node.label)) serializedTerminal.terminalLabel = node.label;
		const pattern = node.terminalType.PATTERN;
		if (node.terminalType.PATTERN) serializedTerminal.pattern = isRegExp_default(pattern) ? pattern.source : pattern;
		return serializedTerminal;
	} else if (node instanceof Rule) return {
		type: "Rule",
		name: node.name,
		orgText: node.orgText,
		definition: convertDefinition(node.definition)
	};
	else throw Error("non exhaustive match");
}
var GAstVisitor = class {
	visit(node) {
		const nodeAny = node;
		switch (nodeAny.constructor) {
			case NonTerminal: return this.visitNonTerminal(nodeAny);
			case Alternative: return this.visitAlternative(nodeAny);
			case Option$1: return this.visitOption(nodeAny);
			case RepetitionMandatory: return this.visitRepetitionMandatory(nodeAny);
			case RepetitionMandatoryWithSeparator: return this.visitRepetitionMandatoryWithSeparator(nodeAny);
			case RepetitionWithSeparator: return this.visitRepetitionWithSeparator(nodeAny);
			case Repetition: return this.visitRepetition(nodeAny);
			case Alternation: return this.visitAlternation(nodeAny);
			case Terminal: return this.visitTerminal(nodeAny);
			case Rule: return this.visitRule(nodeAny);
			default: throw Error("non exhaustive match");
		}
	}
	/* c8 ignore next */
	visitNonTerminal(node) {}
	/* c8 ignore next */
	visitAlternative(node) {}
	/* c8 ignore next */
	visitOption(node) {}
	/* c8 ignore next */
	visitRepetition(node) {}
	/* c8 ignore next */
	visitRepetitionMandatory(node) {}
	/* c8 ignore next 3 */
	visitRepetitionMandatoryWithSeparator(node) {}
	/* c8 ignore next */
	visitRepetitionWithSeparator(node) {}
	/* c8 ignore next */
	visitAlternation(node) {}
	/* c8 ignore next */
	visitTerminal(node) {}
	/* c8 ignore next */
	visitRule(node) {}
};
function isSequenceProd(prod) {
	return prod instanceof Alternative || prod instanceof Option$1 || prod instanceof Repetition || prod instanceof RepetitionMandatory || prod instanceof RepetitionMandatoryWithSeparator || prod instanceof RepetitionWithSeparator || prod instanceof Terminal || prod instanceof Rule;
}
function isOptionalProd(prod, alreadyVisited = []) {
	const isDirectlyOptional = prod instanceof Option$1 || prod instanceof Repetition || prod instanceof RepetitionWithSeparator;
	if (isDirectlyOptional) return true;
	if (prod instanceof Alternation) return some_default(prod.definition, (subProd) => {
		return isOptionalProd(subProd, alreadyVisited);
	});
	else if (prod instanceof NonTerminal && includes_default(alreadyVisited, prod)) return false;
	else if (prod instanceof AbstractProduction) {
		if (prod instanceof NonTerminal) alreadyVisited.push(prod);
		return every_default(prod.definition, (subProd) => {
			return isOptionalProd(subProd, alreadyVisited);
		});
	} else return false;
}
function isBranchingProd(prod) {
	return prod instanceof Alternation;
}
function getProductionDslName$1(prod) {
	/* istanbul ignore else */
	if (prod instanceof NonTerminal) return "SUBRULE";
	else if (prod instanceof Option$1) return "OPTION";
	else if (prod instanceof Alternation) return "OR";
	else if (prod instanceof RepetitionMandatory) return "AT_LEAST_ONE";
	else if (prod instanceof RepetitionMandatoryWithSeparator) return "AT_LEAST_ONE_SEP";
	else if (prod instanceof RepetitionWithSeparator) return "MANY_SEP";
	else if (prod instanceof Repetition) return "MANY";
	else if (prod instanceof Terminal) return "CONSUME";
	else throw Error("non exhaustive match");
}
var RestWalker = class {
	walk(prod, prevRest = []) {
		forEach_default(prod.definition, (subProd, index) => {
			const currRest = drop_default(prod.definition, index + 1);
			/* istanbul ignore else */
			if (subProd instanceof NonTerminal) this.walkProdRef(subProd, currRest, prevRest);
			else if (subProd instanceof Terminal) this.walkTerminal(subProd, currRest, prevRest);
			else if (subProd instanceof Alternative) this.walkFlat(subProd, currRest, prevRest);
			else if (subProd instanceof Option$1) this.walkOption(subProd, currRest, prevRest);
			else if (subProd instanceof RepetitionMandatory) this.walkAtLeastOne(subProd, currRest, prevRest);
			else if (subProd instanceof RepetitionMandatoryWithSeparator) this.walkAtLeastOneSep(subProd, currRest, prevRest);
			else if (subProd instanceof RepetitionWithSeparator) this.walkManySep(subProd, currRest, prevRest);
			else if (subProd instanceof Repetition) this.walkMany(subProd, currRest, prevRest);
			else if (subProd instanceof Alternation) this.walkOr(subProd, currRest, prevRest);
			else throw Error("non exhaustive match");
		});
	}
	walkTerminal(terminal, currRest, prevRest) {}
	walkProdRef(refProd, currRest, prevRest) {}
	walkFlat(flatProd, currRest, prevRest) {
		const fullOrRest = currRest.concat(prevRest);
		this.walk(flatProd, fullOrRest);
	}
	walkOption(optionProd, currRest, prevRest) {
		const fullOrRest = currRest.concat(prevRest);
		this.walk(optionProd, fullOrRest);
	}
	walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
		const fullAtLeastOneRest = [new Option$1({ definition: atLeastOneProd.definition })].concat(currRest, prevRest);
		this.walk(atLeastOneProd, fullAtLeastOneRest);
	}
	walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
		const fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
		this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
	}
	walkMany(manyProd, currRest, prevRest) {
		const fullManyRest = [new Option$1({ definition: manyProd.definition })].concat(currRest, prevRest);
		this.walk(manyProd, fullManyRest);
	}
	walkManySep(manySepProd, currRest, prevRest) {
		const fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
		this.walk(manySepProd, fullManySepRest);
	}
	walkOr(orProd, currRest, prevRest) {
		const fullOrRest = currRest.concat(prevRest);
		forEach_default(orProd.definition, (alt) => {
			const prodWrapper = new Alternative({ definition: [alt] });
			this.walk(prodWrapper, fullOrRest);
		});
	}
};
function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
	const repSepRest = [new Option$1({ definition: [new Terminal({ terminalType: repSepProd.separator })].concat(repSepProd.definition) })];
	const fullRepSepRest = repSepRest.concat(currRest, prevRest);
	return fullRepSepRest;
}
function first(prod) {
	/* istanbul ignore else */
	if (prod instanceof NonTerminal) return first(prod.referencedRule);
	else if (prod instanceof Terminal) return firstForTerminal(prod);
	else if (isSequenceProd(prod)) return firstForSequence(prod);
	else if (isBranchingProd(prod)) return firstForBranching(prod);
	else throw Error("non exhaustive match");
}
function firstForSequence(prod) {
	let firstSet = [];
	const seq = prod.definition;
	let nextSubProdIdx = 0;
	let hasInnerProdsRemaining = seq.length > nextSubProdIdx;
	let currSubProd;
	let isLastInnerProdOptional = true;
	while (hasInnerProdsRemaining && isLastInnerProdOptional) {
		currSubProd = seq[nextSubProdIdx];
		isLastInnerProdOptional = isOptionalProd(currSubProd);
		firstSet = firstSet.concat(first(currSubProd));
		nextSubProdIdx = nextSubProdIdx + 1;
		hasInnerProdsRemaining = seq.length > nextSubProdIdx;
	}
	return uniq_default(firstSet);
}
function firstForBranching(prod) {
	const allAlternativesFirsts = map_default(prod.definition, (innerProd) => {
		return first(innerProd);
	});
	return uniq_default(flatten_default(allAlternativesFirsts));
}
function firstForTerminal(terminal) {
	return [terminal.terminalType];
}
const IN = "_~IN~_";
var ResyncFollowsWalker = class extends RestWalker {
	constructor(topProd) {
		super();
		this.topProd = topProd;
		this.follows = {};
	}
	startWalking() {
		this.walk(this.topProd);
		return this.follows;
	}
	walkTerminal(terminal, currRest, prevRest) {}
	walkProdRef(refProd, currRest, prevRest) {
		const followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
		const fullRest = currRest.concat(prevRest);
		const restProd = new Alternative({ definition: fullRest });
		const t_in_topProd_follows = first(restProd);
		this.follows[followName] = t_in_topProd_follows;
	}
};
function computeAllProdsFollows(topProductions) {
	const reSyncFollows = {};
	forEach_default(topProductions, (topProd) => {
		const currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
		assign_default(reSyncFollows, currRefsFollow);
	});
	return reSyncFollows;
}
function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
	return inner.name + occurenceInParent + IN;
}
let regExpAstCache = {};
const regExpParser = new RegExpParser();
function getRegExpAst(regExp) {
	const regExpStr = regExp.toString();
	if (regExpAstCache.hasOwnProperty(regExpStr)) return regExpAstCache[regExpStr];
	else {
		const regExpAst = regExpParser.pattern(regExpStr);
		regExpAstCache[regExpStr] = regExpAst;
		return regExpAst;
	}
}
function clearRegExpParserCache() {
	regExpAstCache = {};
}
const complementErrorMessage = "Complement Sets are not supported for first char optimization";
const failedOptimizationPrefixMsg = "Unable to use \"first char\" lexer optimizations:\n";
function getOptimizedStartCodesIndices(regExp, ensureOptimizations = false) {
	try {
		const ast = getRegExpAst(regExp);
		const firstChars = firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
		return firstChars;
	} catch (e) {
		/* istanbul ignore next */
		if (e.message === complementErrorMessage) {
			if (ensureOptimizations) PRINT_WARNING(`${failedOptimizationPrefixMsg}\tUnable to optimize: < ${regExp.toString()} >\n	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
		} else {
			let msgSuffix = "";
			if (ensureOptimizations) msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
			PRINT_ERROR(`${failedOptimizationPrefixMsg}\n\tFailed parsing: < ${regExp.toString()} >\n\tUsing the @chevrotain/regexp-to-ast library\n	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + msgSuffix);
		}
	}
	return [];
}
function firstCharOptimizedIndices(ast, result, ignoreCase) {
	switch (ast.type) {
		case "Disjunction":
			for (let i = 0; i < ast.value.length; i++) firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
			break;
		case "Alternative":
			const terms = ast.value;
			for (let i = 0; i < terms.length; i++) {
				const term = terms[i];
				switch (term.type) {
					case "EndAnchor":
					case "GroupBackReference":
					case "Lookahead":
					case "NegativeLookahead":
					case "StartAnchor":
					case "WordBoundary":
					case "NonWordBoundary": continue;
				}
				const atom$1 = term;
				switch (atom$1.type) {
					case "Character":
						addOptimizedIdxToResult(atom$1.value, result, ignoreCase);
						break;
					case "Set":
						if (atom$1.complement === true) throw Error(complementErrorMessage);
						forEach_default(atom$1.value, (code) => {
							if (typeof code === "number") addOptimizedIdxToResult(code, result, ignoreCase);
							else {
								const range = code;
								if (ignoreCase === true) for (let rangeCode = range.from; rangeCode <= range.to; rangeCode++) addOptimizedIdxToResult(rangeCode, result, ignoreCase);
								else {
									for (let rangeCode = range.from; rangeCode <= range.to && rangeCode < minOptimizationVal; rangeCode++) addOptimizedIdxToResult(rangeCode, result, ignoreCase);
									if (range.to >= minOptimizationVal) {
										const minUnOptVal = range.from >= minOptimizationVal ? range.from : minOptimizationVal;
										const maxUnOptVal = range.to;
										const minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
										const maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);
										for (let currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) result[currOptIdx] = currOptIdx;
									}
								}
							}
						});
						break;
					case "Group":
						firstCharOptimizedIndices(atom$1.value, result, ignoreCase);
						break;
					default: throw Error("Non Exhaustive Match");
				}
				const isOptionalQuantifier = atom$1.quantifier !== void 0 && atom$1.quantifier.atLeast === 0;
				if (atom$1.type === "Group" && isWholeOptional(atom$1) === false || atom$1.type !== "Group" && isOptionalQuantifier === false) break;
			}
			break;
		default: throw Error("non exhaustive match!");
	}
	return values_default(result);
}
function addOptimizedIdxToResult(code, result, ignoreCase) {
	const optimizedCharIdx = charCodeToOptimizedIndex(code);
	result[optimizedCharIdx] = optimizedCharIdx;
	if (ignoreCase === true) handleIgnoreCase(code, result);
}
function handleIgnoreCase(code, result) {
	const char = String.fromCharCode(code);
	const upperChar = char.toUpperCase();
	/* istanbul ignore else */
	if (upperChar !== char) {
		const optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
		result[optimizedCharIdx] = optimizedCharIdx;
	} else {
		const lowerChar = char.toLowerCase();
		if (lowerChar !== char) {
			const optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
			result[optimizedCharIdx] = optimizedCharIdx;
		}
	}
}
function findCode(setNode, targetCharCodes) {
	return find_default(setNode.value, (codeOrRange) => {
		if (typeof codeOrRange === "number") return includes_default(targetCharCodes, codeOrRange);
		else {
			const range = codeOrRange;
			return find_default(targetCharCodes, (targetCode) => range.from <= targetCode && targetCode <= range.to) !== void 0;
		}
	});
}
function isWholeOptional(ast) {
	const quantifier = ast.quantifier;
	if (quantifier && quantifier.atLeast === 0) return true;
	if (!ast.value) return false;
	return isArray_default(ast.value) ? every_default(ast.value, isWholeOptional) : isWholeOptional(ast.value);
}
var CharCodeFinder = class extends BaseRegExpVisitor {
	constructor(targetCharCodes) {
		super();
		this.targetCharCodes = targetCharCodes;
		this.found = false;
	}
	visitChildren(node) {
		if (this.found === true) return;
		switch (node.type) {
			case "Lookahead":
				this.visitLookahead(node);
				return;
			case "NegativeLookahead":
				this.visitNegativeLookahead(node);
				return;
		}
		super.visitChildren(node);
	}
	visitCharacter(node) {
		if (includes_default(this.targetCharCodes, node.value)) this.found = true;
	}
	visitSet(node) {
		if (node.complement) {
			if (findCode(node, this.targetCharCodes) === void 0) this.found = true;
		} else if (findCode(node, this.targetCharCodes) !== void 0) this.found = true;
	}
};
function canMatchCharCode(charCodes, pattern) {
	if (pattern instanceof RegExp) {
		const ast = getRegExpAst(pattern);
		const charCodeFinder = new CharCodeFinder(charCodes);
		charCodeFinder.visit(ast);
		return charCodeFinder.found;
	} else return find_default(pattern, (char) => {
		return includes_default(charCodes, char.charCodeAt(0));
	}) !== void 0;
}
const PATTERN = "PATTERN";
const DEFAULT_MODE = "defaultMode";
const MODES = "modes";
let SUPPORT_STICKY = typeof (/* @__PURE__ */ new RegExp("(?:)")).sticky === "boolean";
function analyzeTokenTypes(tokenTypes, options) {
	options = defaults_default(options, {
		useSticky: SUPPORT_STICKY,
		debug: false,
		safeMode: false,
		positionTracking: "full",
		lineTerminatorCharacters: ["\r", "\n"],
		tracer: (msg, action) => action()
	});
	const tracer = options.tracer;
	tracer("initCharCodeToOptimizedIndexMap", () => {
		initCharCodeToOptimizedIndexMap();
	});
	let onlyRelevantTypes;
	tracer("Reject Lexer.NA", () => {
		onlyRelevantTypes = reject_default(tokenTypes, (currType) => {
			return currType[PATTERN] === Lexer.NA;
		});
	});
	let hasCustom = false;
	let allTransformedPatterns;
	tracer("Transform Patterns", () => {
		hasCustom = false;
		allTransformedPatterns = map_default(onlyRelevantTypes, (currType) => {
			const currPattern = currType[PATTERN];
			/* istanbul ignore else */
			if (isRegExp_default(currPattern)) {
				const regExpSource = currPattern.source;
				if (regExpSource.length === 1 && regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) return regExpSource;
				else if (regExpSource.length === 2 && regExpSource[0] === "\\" && !includes_default([
					"d",
					"D",
					"s",
					"S",
					"t",
					"r",
					"n",
					"t",
					"0",
					"c",
					"b",
					"B",
					"f",
					"v",
					"w",
					"W"
				], regExpSource[1])) return regExpSource[1];
				else return options.useSticky ? addStickyFlag(currPattern) : addStartOfInput(currPattern);
			} else if (isFunction_default(currPattern)) {
				hasCustom = true;
				return { exec: currPattern };
			} else if (typeof currPattern === "object") {
				hasCustom = true;
				return currPattern;
			} else if (typeof currPattern === "string") if (currPattern.length === 1) return currPattern;
			else {
				const escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
				const wrappedRegExp = new RegExp(escapedRegExpString);
				return options.useSticky ? addStickyFlag(wrappedRegExp) : addStartOfInput(wrappedRegExp);
			}
			else throw Error("non exhaustive match");
		});
	});
	let patternIdxToType;
	let patternIdxToGroup;
	let patternIdxToLongerAltIdxArr;
	let patternIdxToPushMode;
	let patternIdxToPopMode;
	tracer("misc mapping", () => {
		patternIdxToType = map_default(onlyRelevantTypes, (currType) => currType.tokenTypeIdx);
		patternIdxToGroup = map_default(onlyRelevantTypes, (clazz) => {
			const groupName = clazz.GROUP;
			/* istanbul ignore next */
			if (groupName === Lexer.SKIPPED) return void 0;
			else if (isString_default(groupName)) return groupName;
			else if (isUndefined_default(groupName)) return false;
			else throw Error("non exhaustive match");
		});
		patternIdxToLongerAltIdxArr = map_default(onlyRelevantTypes, (clazz) => {
			const longerAltType = clazz.LONGER_ALT;
			if (longerAltType) {
				const longerAltIdxArr = isArray_default(longerAltType) ? map_default(longerAltType, (type) => indexOf_default(onlyRelevantTypes, type)) : [indexOf_default(onlyRelevantTypes, longerAltType)];
				return longerAltIdxArr;
			}
		});
		patternIdxToPushMode = map_default(onlyRelevantTypes, (clazz) => clazz.PUSH_MODE);
		patternIdxToPopMode = map_default(onlyRelevantTypes, (clazz) => has_default(clazz, "POP_MODE"));
	});
	let patternIdxToCanLineTerminator;
	tracer("Line Terminator Handling", () => {
		const lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
		patternIdxToCanLineTerminator = map_default(onlyRelevantTypes, (tokType) => false);
		if (options.positionTracking !== "onlyOffset") patternIdxToCanLineTerminator = map_default(onlyRelevantTypes, (tokType) => {
			if (has_default(tokType, "LINE_BREAKS")) return !!tokType.LINE_BREAKS;
			else return checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false && canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
		});
	});
	let patternIdxToIsCustom;
	let patternIdxToShort;
	let emptyGroups;
	let patternIdxToConfig;
	tracer("Misc Mapping #2", () => {
		patternIdxToIsCustom = map_default(onlyRelevantTypes, isCustomPattern);
		patternIdxToShort = map_default(allTransformedPatterns, isShortPattern);
		emptyGroups = reduce_default(onlyRelevantTypes, (acc, clazz) => {
			const groupName = clazz.GROUP;
			if (isString_default(groupName) && !(groupName === Lexer.SKIPPED)) acc[groupName] = [];
			return acc;
		}, {});
		patternIdxToConfig = map_default(allTransformedPatterns, (x, idx) => {
			return {
				pattern: allTransformedPatterns[idx],
				longerAlt: patternIdxToLongerAltIdxArr[idx],
				canLineTerminator: patternIdxToCanLineTerminator[idx],
				isCustom: patternIdxToIsCustom[idx],
				short: patternIdxToShort[idx],
				group: patternIdxToGroup[idx],
				push: patternIdxToPushMode[idx],
				pop: patternIdxToPopMode[idx],
				tokenTypeIdx: patternIdxToType[idx],
				tokenType: onlyRelevantTypes[idx]
			};
		});
	});
	let canBeOptimized = true;
	let charCodeToPatternIdxToConfig = [];
	if (!options.safeMode) tracer("First Char Optimization", () => {
		charCodeToPatternIdxToConfig = reduce_default(onlyRelevantTypes, (result, currTokType, idx) => {
			if (typeof currTokType.PATTERN === "string") {
				const charCode = currTokType.PATTERN.charCodeAt(0);
				const optimizedIdx = charCodeToOptimizedIndex(charCode);
				addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
			} else if (isArray_default(currTokType.START_CHARS_HINT)) {
				let lastOptimizedIdx;
				forEach_default(currTokType.START_CHARS_HINT, (charOrInt) => {
					const charCode = typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt;
					const currOptimizedIdx = charCodeToOptimizedIndex(charCode);
					/* istanbul ignore else */
					if (lastOptimizedIdx !== currOptimizedIdx) {
						lastOptimizedIdx = currOptimizedIdx;
						addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
					}
				});
			} else if (isRegExp_default(currTokType.PATTERN)) if (currTokType.PATTERN.unicode) {
				canBeOptimized = false;
				if (options.ensureOptimizations) PRINT_ERROR(`${failedOptimizationPrefixMsg}\tUnable to analyze < ${currTokType.PATTERN.toString()} > pattern.\n	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
			} else {
				const optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
				/* istanbul ignore if */
				if (isEmpty_default(optimizedCodes)) canBeOptimized = false;
				forEach_default(optimizedCodes, (code) => {
					addToMapOfArrays(result, code, patternIdxToConfig[idx]);
				});
			}
			else {
				if (options.ensureOptimizations) PRINT_ERROR(`${failedOptimizationPrefixMsg}\tTokenType: <${currTokType.name}> is using a custom token pattern without providing <start_chars_hint> parameter.\n	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`);
				canBeOptimized = false;
			}
			return result;
		}, []);
	});
	return {
		emptyGroups,
		patternIdxToConfig,
		charCodeToPatternIdxToConfig,
		hasCustom,
		canBeOptimized
	};
}
function validatePatterns(tokenTypes, validModesNames) {
	let errors = [];
	const missingResult = findMissingPatterns(tokenTypes);
	errors = errors.concat(missingResult.errors);
	const invalidResult = findInvalidPatterns(missingResult.valid);
	const validTokenTypes = invalidResult.valid;
	errors = errors.concat(invalidResult.errors);
	errors = errors.concat(validateRegExpPattern(validTokenTypes));
	errors = errors.concat(findInvalidGroupType(validTokenTypes));
	errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
	errors = errors.concat(findUnreachablePatterns(validTokenTypes));
	return errors;
}
function validateRegExpPattern(tokenTypes) {
	let errors = [];
	const withRegExpPatterns = filter_default(tokenTypes, (currTokType) => isRegExp_default(currTokType[PATTERN]));
	errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
	errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
	errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
	errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
	errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
	return errors;
}
function findMissingPatterns(tokenTypes) {
	const tokenTypesWithMissingPattern = filter_default(tokenTypes, (currType) => {
		return !has_default(currType, PATTERN);
	});
	const errors = map_default(tokenTypesWithMissingPattern, (currType) => {
		return {
			message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
			type: LexerDefinitionErrorType.MISSING_PATTERN,
			tokenTypes: [currType]
		};
	});
	const valid = difference_default(tokenTypes, tokenTypesWithMissingPattern);
	return {
		errors,
		valid
	};
}
function findInvalidPatterns(tokenTypes) {
	const tokenTypesWithInvalidPattern = filter_default(tokenTypes, (currType) => {
		const pattern = currType[PATTERN];
		return !isRegExp_default(pattern) && !isFunction_default(pattern) && !has_default(pattern, "exec") && !isString_default(pattern);
	});
	const errors = map_default(tokenTypesWithInvalidPattern, (currType) => {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
			type: LexerDefinitionErrorType.INVALID_PATTERN,
			tokenTypes: [currType]
		};
	});
	const valid = difference_default(tokenTypes, tokenTypesWithInvalidPattern);
	return {
		errors,
		valid
	};
}
const end_of_input = /[^\\][$]/;
function findEndOfInputAnchor(tokenTypes) {
	class EndAnchorFinder extends BaseRegExpVisitor {
		constructor() {
			super(...arguments);
			this.found = false;
		}
		visitEndAnchor(node) {
			this.found = true;
		}
	}
	const invalidRegex = filter_default(tokenTypes, (currType) => {
		const pattern = currType.PATTERN;
		try {
			const regexpAst = getRegExpAst(pattern);
			const endAnchorVisitor = new EndAnchorFinder();
			endAnchorVisitor.visit(regexpAst);
			return endAnchorVisitor.found;
		} catch (e) {
			/* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
			return end_of_input.test(pattern.source);
		}
	});
	const errors = map_default(invalidRegex, (currType) => {
		return {
			message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
			type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
			tokenTypes: [currType]
		};
	});
	return errors;
}
function findEmptyMatchRegExps(tokenTypes) {
	const matchesEmptyString = filter_default(tokenTypes, (currType) => {
		const pattern = currType.PATTERN;
		return pattern.test("");
	});
	const errors = map_default(matchesEmptyString, (currType) => {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
			type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
			tokenTypes: [currType]
		};
	});
	return errors;
}
const start_of_input = /[^\\[][\^]|^\^/;
function findStartOfInputAnchor(tokenTypes) {
	class StartAnchorFinder extends BaseRegExpVisitor {
		constructor() {
			super(...arguments);
			this.found = false;
		}
		visitStartAnchor(node) {
			this.found = true;
		}
	}
	const invalidRegex = filter_default(tokenTypes, (currType) => {
		const pattern = currType.PATTERN;
		try {
			const regexpAst = getRegExpAst(pattern);
			const startAnchorVisitor = new StartAnchorFinder();
			startAnchorVisitor.visit(regexpAst);
			return startAnchorVisitor.found;
		} catch (e) {
			/* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
			return start_of_input.test(pattern.source);
		}
	});
	const errors = map_default(invalidRegex, (currType) => {
		return {
			message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
			type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
			tokenTypes: [currType]
		};
	});
	return errors;
}
function findUnsupportedFlags(tokenTypes) {
	const invalidFlags = filter_default(tokenTypes, (currType) => {
		const pattern = currType[PATTERN];
		return pattern instanceof RegExp && (pattern.multiline || pattern.global);
	});
	const errors = map_default(invalidFlags, (currType) => {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
			type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
			tokenTypes: [currType]
		};
	});
	return errors;
}
function findDuplicatePatterns(tokenTypes) {
	const found = [];
	let identicalPatterns = map_default(tokenTypes, (outerType) => {
		return reduce_default(tokenTypes, (result, innerType) => {
			if (outerType.PATTERN.source === innerType.PATTERN.source && !includes_default(found, innerType) && innerType.PATTERN !== Lexer.NA) {
				found.push(innerType);
				result.push(innerType);
				return result;
			}
			return result;
		}, []);
	});
	identicalPatterns = compact_default(identicalPatterns);
	const duplicatePatterns = filter_default(identicalPatterns, (currIdenticalSet) => {
		return currIdenticalSet.length > 1;
	});
	const errors = map_default(duplicatePatterns, (setOfIdentical) => {
		const tokenTypeNames = map_default(setOfIdentical, (currType) => {
			return currType.name;
		});
		const dupPatternSrc = head_default(setOfIdentical).PATTERN;
		return {
			message: `The same RegExp pattern ->${dupPatternSrc}<-has been used in all of the following Token Types: ${tokenTypeNames.join(", ")} <-`,
			type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
			tokenTypes: setOfIdentical
		};
	});
	return errors;
}
function findInvalidGroupType(tokenTypes) {
	const invalidTypes = filter_default(tokenTypes, (clazz) => {
		if (!has_default(clazz, "GROUP")) return false;
		const group = clazz.GROUP;
		return group !== Lexer.SKIPPED && group !== Lexer.NA && !isString_default(group);
	});
	const errors = map_default(invalidTypes, (currType) => {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
			type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
			tokenTypes: [currType]
		};
	});
	return errors;
}
function findModesThatDoNotExist(tokenTypes, validModes) {
	const invalidModes = filter_default(tokenTypes, (clazz) => {
		return clazz.PUSH_MODE !== void 0 && !includes_default(validModes, clazz.PUSH_MODE);
	});
	const errors = map_default(invalidModes, (tokType) => {
		const msg = `Token Type: ->${tokType.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${tokType.PUSH_MODE}<-which does not exist`;
		return {
			message: msg,
			type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
			tokenTypes: [tokType]
		};
	});
	return errors;
}
function findUnreachablePatterns(tokenTypes) {
	const errors = [];
	const canBeTested = reduce_default(tokenTypes, (result, tokType, idx) => {
		const pattern = tokType.PATTERN;
		if (pattern === Lexer.NA) return result;
		if (isString_default(pattern)) result.push({
			str: pattern,
			idx,
			tokenType: tokType
		});
		else if (isRegExp_default(pattern) && noMetaChar(pattern)) result.push({
			str: pattern.source,
			idx,
			tokenType: tokType
		});
		return result;
	}, []);
	forEach_default(tokenTypes, (tokType, testIdx) => {
		forEach_default(canBeTested, ({ str, idx, tokenType }) => {
			if (testIdx < idx && testTokenType(str, tokType.PATTERN)) {
				const msg = `Token: ->${tokenType.name}<- can never be matched.\nBecause it appears AFTER the Token Type ->${tokType.name}<-in the lexer's definition.\nSee https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
				errors.push({
					message: msg,
					type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
					tokenTypes: [tokType, tokenType]
				});
			}
		});
	});
	return errors;
}
function testTokenType(str, pattern) {
	/* istanbul ignore else */
	if (isRegExp_default(pattern)) {
		const regExpArray = pattern.exec(str);
		return regExpArray !== null && regExpArray.index === 0;
	} else if (isFunction_default(pattern)) return pattern(str, 0, [], {});
	else if (has_default(pattern, "exec")) return pattern.exec(str, 0, [], {});
	else if (typeof pattern === "string") return pattern === str;
	else throw Error("non exhaustive match");
}
function noMetaChar(regExp) {
	const metaChars = [
		".",
		"\\",
		"[",
		"]",
		"|",
		"^",
		"$",
		"(",
		")",
		"?",
		"*",
		"+",
		"{"
	];
	return find_default(metaChars, (char) => regExp.source.indexOf(char) !== -1) === void 0;
}
function addStartOfInput(pattern) {
	const flags = pattern.ignoreCase ? "i" : "";
	return new RegExp(`^(?:${pattern.source})`, flags);
}
function addStickyFlag(pattern) {
	const flags = pattern.ignoreCase ? "iy" : "y";
	return new RegExp(`${pattern.source}`, flags);
}
function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
	const errors = [];
	if (!has_default(lexerDefinition, DEFAULT_MODE)) errors.push({
		message: "A MultiMode Lexer cannot be initialized without a <" + DEFAULT_MODE + "> property in its definition\n",
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
	});
	if (!has_default(lexerDefinition, MODES)) errors.push({
		message: "A MultiMode Lexer cannot be initialized without a <" + MODES + "> property in its definition\n",
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
	});
	if (has_default(lexerDefinition, MODES) && has_default(lexerDefinition, DEFAULT_MODE) && !has_default(lexerDefinition.modes, lexerDefinition.defaultMode)) errors.push({
		message: `A MultiMode Lexer cannot be initialized with a ${DEFAULT_MODE}: <${lexerDefinition.defaultMode}>which does not exist\n`,
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
	});
	if (has_default(lexerDefinition, MODES)) forEach_default(lexerDefinition.modes, (currModeValue, currModeName) => {
		forEach_default(currModeValue, (currTokType, currIdx) => {
			if (isUndefined_default(currTokType)) errors.push({
				message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${currModeName}> at index: <${currIdx}>\n`,
				type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
			});
			else if (has_default(currTokType, "LONGER_ALT")) {
				const longerAlt = isArray_default(currTokType.LONGER_ALT) ? currTokType.LONGER_ALT : [currTokType.LONGER_ALT];
				forEach_default(longerAlt, (currLongerAlt) => {
					if (!isUndefined_default(currLongerAlt) && !includes_default(currModeValue, currLongerAlt)) errors.push({
						message: `A MultiMode Lexer cannot be initialized with a longer_alt <${currLongerAlt.name}> on token <${currTokType.name}> outside of mode <${currModeName}>\n`,
						type: LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
					});
				});
			}
		});
	});
	return errors;
}
function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
	const warnings = [];
	let hasAnyLineBreak = false;
	const allTokenTypes = compact_default(flatten_default(values_default(lexerDefinition.modes)));
	const concreteTokenTypes = reject_default(allTokenTypes, (currType) => currType[PATTERN] === Lexer.NA);
	const terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
	if (trackLines) forEach_default(concreteTokenTypes, (tokType) => {
		const currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
		if (currIssue !== false) {
			const message = buildLineBreakIssueMessage(tokType, currIssue);
			const warningDescriptor = {
				message,
				type: currIssue.issue,
				tokenType: tokType
			};
			warnings.push(warningDescriptor);
		} else if (has_default(tokType, "LINE_BREAKS")) {
			if (tokType.LINE_BREAKS === true) hasAnyLineBreak = true;
		} else if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) hasAnyLineBreak = true;
	});
	if (trackLines && !hasAnyLineBreak) warnings.push({
		message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
		type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
	});
	return warnings;
}
function cloneEmptyGroups(emptyGroups) {
	const clonedResult = {};
	const groupKeys = keys_default(emptyGroups);
	forEach_default(groupKeys, (currKey) => {
		const currGroupValue = emptyGroups[currKey];
		/* istanbul ignore else */
		if (isArray_default(currGroupValue)) clonedResult[currKey] = [];
		else throw Error("non exhaustive match");
	});
	return clonedResult;
}
function isCustomPattern(tokenType) {
	const pattern = tokenType.PATTERN;
	/* istanbul ignore else */
	if (isRegExp_default(pattern)) return false;
	else if (isFunction_default(pattern)) return true;
	else if (has_default(pattern, "exec")) return true;
	else if (isString_default(pattern)) return false;
	else throw Error("non exhaustive match");
}
function isShortPattern(pattern) {
	if (isString_default(pattern) && pattern.length === 1) return pattern.charCodeAt(0);
	else return false;
}
const LineTerminatorOptimizedTester = {
	test: function(text) {
		const len = text.length;
		for (let i = this.lastIndex; i < len; i++) {
			const c = text.charCodeAt(i);
			if (c === 10) {
				this.lastIndex = i + 1;
				return true;
			} else if (c === 13) {
				if (text.charCodeAt(i + 1) === 10) this.lastIndex = i + 2;
				else this.lastIndex = i + 1;
				return true;
			}
		}
		return false;
	},
	lastIndex: 0
};
function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
	if (has_default(tokType, "LINE_BREAKS")) return false;
	else if (isRegExp_default(tokType.PATTERN)) {
		try {
			canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
		} catch (e) {
			/* istanbul ignore next - to test this we would have to mock <canMatchCharCode> to throw an error */
			return {
				issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
				errMsg: e.message
			};
		}
		return false;
	} else if (isString_default(tokType.PATTERN)) return false;
	else if (isCustomPattern(tokType)) return { issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
	else throw Error("non exhaustive match");
}
function buildLineBreakIssueMessage(tokType, details) {
	/* istanbul ignore else */
	if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) return `Warning: unable to identify line terminator usage in pattern.
\tThe problem is in the <${tokType.name}> Token Type\n\t Root cause: ${details.errMsg}.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
	else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
\tThe problem is in the <${tokType.name}> Token Type\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
	else throw Error("non exhaustive match");
}
function getCharCodes(charsOrCodes) {
	const charCodes = map_default(charsOrCodes, (numOrString) => {
		if (isString_default(numOrString)) return numOrString.charCodeAt(0);
		else return numOrString;
	});
	return charCodes;
}
function addToMapOfArrays(map, key, value) {
	if (map[key] === void 0) map[key] = [value];
	else map[key].push(value);
}
const minOptimizationVal = 256;
let charCodeToOptimizedIdxMap = [];
function charCodeToOptimizedIndex(charCode) {
	return charCode < minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
}
function initCharCodeToOptimizedIndexMap() {
	if (isEmpty_default(charCodeToOptimizedIdxMap)) {
		charCodeToOptimizedIdxMap = new Array(65536);
		for (let i = 0; i < 65536; i++) charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
	}
}
function tokenStructuredMatcher(tokInstance, tokConstructor) {
	const instanceType = tokInstance.tokenTypeIdx;
	if (instanceType === tokConstructor.tokenTypeIdx) return true;
	else return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
}
function tokenStructuredMatcherNoCategories(token, tokType) {
	return token.tokenTypeIdx === tokType.tokenTypeIdx;
}
let tokenShortNameIdx = 1;
const tokenIdxToClass = {};
function augmentTokenTypes(tokenTypes) {
	const tokenTypesAndParents = expandCategories(tokenTypes);
	assignTokenDefaultProps(tokenTypesAndParents);
	assignCategoriesMapProp(tokenTypesAndParents);
	assignCategoriesTokensProp(tokenTypesAndParents);
	forEach_default(tokenTypesAndParents, (tokType) => {
		tokType.isParent = tokType.categoryMatches.length > 0;
	});
}
function expandCategories(tokenTypes) {
	let result = clone_default(tokenTypes);
	let categories = tokenTypes;
	let searching = true;
	while (searching) {
		categories = compact_default(flatten_default(map_default(categories, (currTokType) => currTokType.CATEGORIES)));
		const newCategories = difference_default(categories, result);
		result = result.concat(newCategories);
		if (isEmpty_default(newCategories)) searching = false;
		else categories = newCategories;
	}
	return result;
}
function assignTokenDefaultProps(tokenTypes) {
	forEach_default(tokenTypes, (currTokType) => {
		if (!hasShortKeyProperty(currTokType)) {
			tokenIdxToClass[tokenShortNameIdx] = currTokType;
			currTokType.tokenTypeIdx = tokenShortNameIdx++;
		}
		if (hasCategoriesProperty(currTokType) && !isArray_default(currTokType.CATEGORIES)) currTokType.CATEGORIES = [currTokType.CATEGORIES];
		if (!hasCategoriesProperty(currTokType)) currTokType.CATEGORIES = [];
		if (!hasExtendingTokensTypesProperty(currTokType)) currTokType.categoryMatches = [];
		if (!hasExtendingTokensTypesMapProperty(currTokType)) currTokType.categoryMatchesMap = {};
	});
}
function assignCategoriesTokensProp(tokenTypes) {
	forEach_default(tokenTypes, (currTokType) => {
		currTokType.categoryMatches = [];
		forEach_default(currTokType.categoryMatchesMap, (val, key) => {
			currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
		});
	});
}
function assignCategoriesMapProp(tokenTypes) {
	forEach_default(tokenTypes, (currTokType) => {
		singleAssignCategoriesToksMap([], currTokType);
	});
}
function singleAssignCategoriesToksMap(path, nextNode) {
	forEach_default(path, (pathNode) => {
		nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
	});
	forEach_default(nextNode.CATEGORIES, (nextCategory) => {
		const newPath = path.concat(nextNode);
		if (!includes_default(newPath, nextCategory)) singleAssignCategoriesToksMap(newPath, nextCategory);
	});
}
function hasShortKeyProperty(tokType) {
	return has_default(tokType, "tokenTypeIdx");
}
function hasCategoriesProperty(tokType) {
	return has_default(tokType, "CATEGORIES");
}
function hasExtendingTokensTypesProperty(tokType) {
	return has_default(tokType, "categoryMatches");
}
function hasExtendingTokensTypesMapProperty(tokType) {
	return has_default(tokType, "categoryMatchesMap");
}
function isTokenType(tokType) {
	return has_default(tokType, "tokenTypeIdx");
}
const defaultLexerErrorProvider = {
	buildUnableToPopLexerModeMessage(token) {
		return `Unable to pop Lexer Mode after encountering Token ->${token.image}<- The Mode Stack is empty`;
	},
	buildUnexpectedCharactersMessage(fullText, startOffset, length, line, column) {
		return `unexpected character: ->${fullText.charAt(startOffset)}<- at offset: ${startOffset}, skipped ${length} characters.`;
	}
};
var LexerDefinitionErrorType;
(function(LexerDefinitionErrorType$1) {
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
	LexerDefinitionErrorType$1[LexerDefinitionErrorType$1["MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"] = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
const DEFAULT_LEXER_CONFIG = {
	deferDefinitionErrorsHandling: false,
	positionTracking: "full",
	lineTerminatorsPattern: /\n|\r\n?/g,
	lineTerminatorCharacters: ["\n", "\r"],
	ensureOptimizations: false,
	safeMode: false,
	errorMessageProvider: defaultLexerErrorProvider,
	traceInitPerf: false,
	skipValidations: false,
	recoveryEnabled: true
};
Object.freeze(DEFAULT_LEXER_CONFIG);
var Lexer = class {
	constructor(lexerDefinition, config = DEFAULT_LEXER_CONFIG) {
		this.lexerDefinition = lexerDefinition;
		this.lexerDefinitionErrors = [];
		this.lexerDefinitionWarning = [];
		this.patternIdxToConfig = {};
		this.charCodeToPatternIdxToConfig = {};
		this.modes = [];
		this.emptyGroups = {};
		this.trackStartLines = true;
		this.trackEndLines = true;
		this.hasCustom = false;
		this.canModeBeOptimized = {};
		this.TRACE_INIT = (phaseDesc, phaseImpl) => {
			if (this.traceInitPerf === true) {
				this.traceInitIndent++;
				const indent = new Array(this.traceInitIndent + 1).join("	");
				if (this.traceInitIndent < this.traceInitMaxIdent) console.log(`${indent}--> <${phaseDesc}>`);
				const { time, value } = timer(phaseImpl);
				/* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */
				const traceMethod = time > 10 ? console.warn : console.log;
				if (this.traceInitIndent < this.traceInitMaxIdent) traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
				this.traceInitIndent--;
				return value;
			} else return phaseImpl();
		};
		if (typeof config === "boolean") throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
		this.config = assign_default({}, DEFAULT_LEXER_CONFIG, config);
		const traceInitVal = this.config.traceInitPerf;
		if (traceInitVal === true) {
			this.traceInitMaxIdent = Infinity;
			this.traceInitPerf = true;
		} else if (typeof traceInitVal === "number") {
			this.traceInitMaxIdent = traceInitVal;
			this.traceInitPerf = true;
		}
		this.traceInitIndent = -1;
		this.TRACE_INIT("Lexer Constructor", () => {
			let actualDefinition;
			let hasOnlySingleMode = true;
			this.TRACE_INIT("Lexer Config handling", () => {
				if (this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
				else if (this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
				if (config.safeMode && config.ensureOptimizations) throw Error("\"safeMode\" and \"ensureOptimizations\" flags are mutually exclusive.");
				this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking);
				this.trackEndLines = /full/i.test(this.config.positionTracking);
				if (isArray_default(lexerDefinition)) actualDefinition = {
					modes: { defaultMode: clone_default(lexerDefinition) },
					defaultMode: DEFAULT_MODE
				};
				else {
					hasOnlySingleMode = false;
					actualDefinition = clone_default(lexerDefinition);
				}
			});
			if (this.config.skipValidations === false) {
				this.TRACE_INIT("performRuntimeChecks", () => {
					this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
				});
				this.TRACE_INIT("performWarningRuntimeChecks", () => {
					this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
				});
			}
			actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
			forEach_default(actualDefinition.modes, (currModeValue, currModeName) => {
				actualDefinition.modes[currModeName] = reject_default(currModeValue, (currTokType) => isUndefined_default(currTokType));
			});
			const allModeNames = keys_default(actualDefinition.modes);
			forEach_default(actualDefinition.modes, (currModDef, currModName) => {
				this.TRACE_INIT(`Mode: <${currModName}> processing`, () => {
					this.modes.push(currModName);
					if (this.config.skipValidations === false) this.TRACE_INIT(`validatePatterns`, () => {
						this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
					});
					if (isEmpty_default(this.lexerDefinitionErrors)) {
						augmentTokenTypes(currModDef);
						let currAnalyzeResult;
						this.TRACE_INIT(`analyzeTokenTypes`, () => {
							currAnalyzeResult = analyzeTokenTypes(currModDef, {
								lineTerminatorCharacters: this.config.lineTerminatorCharacters,
								positionTracking: config.positionTracking,
								ensureOptimizations: config.ensureOptimizations,
								safeMode: config.safeMode,
								tracer: this.TRACE_INIT
							});
						});
						this.patternIdxToConfig[currModName] = currAnalyzeResult.patternIdxToConfig;
						this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult.charCodeToPatternIdxToConfig;
						this.emptyGroups = assign_default({}, this.emptyGroups, currAnalyzeResult.emptyGroups);
						this.hasCustom = currAnalyzeResult.hasCustom || this.hasCustom;
						this.canModeBeOptimized[currModName] = currAnalyzeResult.canBeOptimized;
					}
				});
			});
			this.defaultMode = actualDefinition.defaultMode;
			if (!isEmpty_default(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
				const allErrMessages = map_default(this.lexerDefinitionErrors, (error$1) => {
					return error$1.message;
				});
				const allErrMessagesString = allErrMessages.join("-----------------------\n");
				throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
			}
			forEach_default(this.lexerDefinitionWarning, (warningDescriptor) => {
				PRINT_WARNING(warningDescriptor.message);
			});
			this.TRACE_INIT("Choosing sub-methods implementations", () => {
				if (SUPPORT_STICKY) {
					this.chopInput = identity_default;
					this.match = this.matchWithTest;
				} else {
					this.updateLastIndex = noop_default;
					this.match = this.matchWithExec;
				}
				if (hasOnlySingleMode) this.handleModes = noop_default;
				if (this.trackStartLines === false) this.computeNewColumn = identity_default;
				if (this.trackEndLines === false) this.updateTokenEndLineColumnLocation = noop_default;
				if (/full/i.test(this.config.positionTracking)) this.createTokenInstance = this.createFullToken;
				else if (/onlyStart/i.test(this.config.positionTracking)) this.createTokenInstance = this.createStartOnlyToken;
				else if (/onlyOffset/i.test(this.config.positionTracking)) this.createTokenInstance = this.createOffsetOnlyToken;
				else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
				if (this.hasCustom) {
					this.addToken = this.addTokenUsingPush;
					this.handlePayload = this.handlePayloadWithCustom;
				} else {
					this.addToken = this.addTokenUsingMemberAccess;
					this.handlePayload = this.handlePayloadNoCustom;
				}
			});
			this.TRACE_INIT("Failed Optimization Warnings", () => {
				const unOptimizedModes = reduce_default(this.canModeBeOptimized, (cannotBeOptimized, canBeOptimized, modeName) => {
					if (canBeOptimized === false) cannotBeOptimized.push(modeName);
					return cannotBeOptimized;
				}, []);
				if (config.ensureOptimizations && !isEmpty_default(unOptimizedModes)) throw Error(`Lexer Modes: < ${unOptimizedModes.join(", ")} > cannot be optimized.\n	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
			});
			this.TRACE_INIT("clearRegExpParserCache", () => {
				clearRegExpParserCache();
			});
			this.TRACE_INIT("toFastProperties", () => {
				toFastProperties(this);
			});
		});
	}
	tokenize(text, initialMode = this.defaultMode) {
		if (!isEmpty_default(this.lexerDefinitionErrors)) {
			const allErrMessages = map_default(this.lexerDefinitionErrors, (error$1) => {
				return error$1.message;
			});
			const allErrMessagesString = allErrMessages.join("-----------------------\n");
			throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
		}
		return this.tokenizeInternal(text, initialMode);
	}
	tokenizeInternal(text, initialMode) {
		let i, j, k, matchAltImage, longerAlt, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, msg, match;
		const orgText = text;
		const orgLength = orgText.length;
		let offset = 0;
		let matchedTokensIndex = 0;
		const guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10);
		const matchedTokens = new Array(guessedNumberOfTokens);
		const errors = [];
		let line = this.trackStartLines ? 1 : void 0;
		let column = this.trackStartLines ? 1 : void 0;
		const groups = cloneEmptyGroups(this.emptyGroups);
		const trackLines = this.trackStartLines;
		const lineTerminatorPattern = this.config.lineTerminatorsPattern;
		let currModePatternsLength = 0;
		let patternIdxToConfig = [];
		let currCharCodeToPatternIdxToConfig = [];
		const modeStack = [];
		const emptyArray = [];
		Object.freeze(emptyArray);
		let getPossiblePatterns;
		function getPossiblePatternsSlow() {
			return patternIdxToConfig;
		}
		function getPossiblePatternsOptimized(charCode) {
			const optimizedCharIdx = charCodeToOptimizedIndex(charCode);
			const possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
			if (possiblePatterns === void 0) return emptyArray;
			else return possiblePatterns;
		}
		const pop_mode = (popToken) => {
			if (modeStack.length === 1 && popToken.tokenType.PUSH_MODE === void 0) {
				const msg$1 = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
				errors.push({
					offset: popToken.startOffset,
					line: popToken.startLine,
					column: popToken.startColumn,
					length: popToken.image.length,
					message: msg$1
				});
			} else {
				modeStack.pop();
				const newMode = last_default(modeStack);
				patternIdxToConfig = this.patternIdxToConfig[newMode];
				currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
				currModePatternsLength = patternIdxToConfig.length;
				const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
				if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) getPossiblePatterns = getPossiblePatternsOptimized;
				else getPossiblePatterns = getPossiblePatternsSlow;
			}
		};
		function push_mode(newMode) {
			modeStack.push(newMode);
			currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
			patternIdxToConfig = this.patternIdxToConfig[newMode];
			currModePatternsLength = patternIdxToConfig.length;
			currModePatternsLength = patternIdxToConfig.length;
			const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
			if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) getPossiblePatterns = getPossiblePatternsOptimized;
			else getPossiblePatterns = getPossiblePatternsSlow;
		}
		push_mode.call(this, initialMode);
		let currConfig;
		const recoveryEnabled = this.config.recoveryEnabled;
		while (offset < orgLength) {
			matchedImage = null;
			const nextCharCode = orgText.charCodeAt(offset);
			const chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode);
			const chosenPatternsLength = chosenPatternIdxToConfig.length;
			for (i = 0; i < chosenPatternsLength; i++) {
				currConfig = chosenPatternIdxToConfig[i];
				const currPattern = currConfig.pattern;
				payload = null;
				const singleCharCode = currConfig.short;
				if (singleCharCode !== false) {
					if (nextCharCode === singleCharCode) matchedImage = currPattern;
				} else if (currConfig.isCustom === true) {
					match = currPattern.exec(orgText, offset, matchedTokens, groups);
					if (match !== null) {
						matchedImage = match[0];
						if (match.payload !== void 0) payload = match.payload;
					} else matchedImage = null;
				} else {
					this.updateLastIndex(currPattern, offset);
					matchedImage = this.match(currPattern, text, offset);
				}
				if (matchedImage !== null) {
					longerAlt = currConfig.longerAlt;
					if (longerAlt !== void 0) {
						const longerAltLength = longerAlt.length;
						for (k = 0; k < longerAltLength; k++) {
							const longerAltConfig = patternIdxToConfig[longerAlt[k]];
							const longerAltPattern = longerAltConfig.pattern;
							altPayload = null;
							if (longerAltConfig.isCustom === true) {
								match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
								if (match !== null) {
									matchAltImage = match[0];
									if (match.payload !== void 0) altPayload = match.payload;
								} else matchAltImage = null;
							} else {
								this.updateLastIndex(longerAltPattern, offset);
								matchAltImage = this.match(longerAltPattern, text, offset);
							}
							if (matchAltImage && matchAltImage.length > matchedImage.length) {
								matchedImage = matchAltImage;
								payload = altPayload;
								currConfig = longerAltConfig;
								break;
							}
						}
					}
					break;
				}
			}
			if (matchedImage !== null) {
				imageLength = matchedImage.length;
				group = currConfig.group;
				if (group !== void 0) {
					tokType = currConfig.tokenTypeIdx;
					newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
					this.handlePayload(newToken, payload);
					if (group === false) matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
					else groups[group].push(newToken);
				}
				text = this.chopInput(text, imageLength);
				offset = offset + imageLength;
				column = this.computeNewColumn(column, imageLength);
				if (trackLines === true && currConfig.canLineTerminator === true) {
					let numOfLTsInMatch = 0;
					let foundTerminator;
					let lastLTEndOffset;
					lineTerminatorPattern.lastIndex = 0;
					do {
						foundTerminator = lineTerminatorPattern.test(matchedImage);
						if (foundTerminator === true) {
							lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
							numOfLTsInMatch++;
						}
					} while (foundTerminator === true);
					if (numOfLTsInMatch !== 0) {
						line = line + numOfLTsInMatch;
						column = imageLength - lastLTEndOffset;
						this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
					}
				}
				this.handleModes(currConfig, pop_mode, push_mode, newToken);
			} else {
				const errorStartOffset = offset;
				const errorLine = line;
				const errorColumn = column;
				let foundResyncPoint = recoveryEnabled === false;
				while (foundResyncPoint === false && offset < orgLength) {
					text = this.chopInput(text, 1);
					offset++;
					for (j = 0; j < currModePatternsLength; j++) {
						const currConfig$1 = patternIdxToConfig[j];
						const currPattern = currConfig$1.pattern;
						const singleCharCode = currConfig$1.short;
						if (singleCharCode !== false) {
							if (orgText.charCodeAt(offset) === singleCharCode) foundResyncPoint = true;
						} else if (currConfig$1.isCustom === true) foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
						else {
							this.updateLastIndex(currPattern, offset);
							foundResyncPoint = currPattern.exec(text) !== null;
						}
						if (foundResyncPoint === true) break;
					}
				}
				errLength = offset - errorStartOffset;
				column = this.computeNewColumn(column, errLength);
				msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn);
				errors.push({
					offset: errorStartOffset,
					line: errorLine,
					column: errorColumn,
					length: errLength,
					message: msg
				});
				if (recoveryEnabled === false) break;
			}
		}
		if (!this.hasCustom) matchedTokens.length = matchedTokensIndex;
		return {
			tokens: matchedTokens,
			groups,
			errors
		};
	}
	handleModes(config, pop_mode, push_mode, newToken) {
		if (config.pop === true) {
			const pushMode = config.push;
			pop_mode(newToken);
			if (pushMode !== void 0) push_mode.call(this, pushMode);
		} else if (config.push !== void 0) push_mode.call(this, config.push);
	}
	chopInput(text, length) {
		return text.substring(length);
	}
	updateLastIndex(regExp, newLastIndex) {
		regExp.lastIndex = newLastIndex;
	}
	updateTokenEndLineColumnLocation(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
		let lastCharIsLT, fixForEndingInLT;
		if (group !== void 0) {
			lastCharIsLT = lastLTIdx === imageLength - 1;
			fixForEndingInLT = lastCharIsLT ? -1 : 0;
			if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
				newToken.endLine = line + fixForEndingInLT;
				newToken.endColumn = column - 1 + -fixForEndingInLT;
			}
		}
	}
	computeNewColumn(oldColumn, imageLength) {
		return oldColumn + imageLength;
	}
	createOffsetOnlyToken(image, startOffset, tokenTypeIdx, tokenType) {
		return {
			image,
			startOffset,
			tokenTypeIdx,
			tokenType
		};
	}
	createStartOnlyToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
		return {
			image,
			startOffset,
			startLine,
			startColumn,
			tokenTypeIdx,
			tokenType
		};
	}
	createFullToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
		return {
			image,
			startOffset,
			endOffset: startOffset + imageLength - 1,
			startLine,
			endLine: startLine,
			startColumn,
			endColumn: startColumn + imageLength - 1,
			tokenTypeIdx,
			tokenType
		};
	}
	addTokenUsingPush(tokenVector, index, tokenToAdd) {
		tokenVector.push(tokenToAdd);
		return index;
	}
	addTokenUsingMemberAccess(tokenVector, index, tokenToAdd) {
		tokenVector[index] = tokenToAdd;
		index++;
		return index;
	}
	handlePayloadNoCustom(token, payload) {}
	handlePayloadWithCustom(token, payload) {
		if (payload !== null) token.payload = payload;
	}
	matchWithTest(pattern, text, offset) {
		const found = pattern.test(text);
		if (found === true) return text.substring(offset, pattern.lastIndex);
		return null;
	}
	matchWithExec(pattern, text) {
		const regExpArray = pattern.exec(text);
		return regExpArray !== null ? regExpArray[0] : null;
	}
};
Lexer.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
Lexer.NA = /NOT_APPLICABLE/;
function tokenLabel(tokType) {
	if (hasTokenLabel(tokType)) return tokType.LABEL;
	else return tokType.name;
}
function hasTokenLabel(obj) {
	return isString_default(obj.LABEL) && obj.LABEL !== "";
}
const PARENT = "parent";
const CATEGORIES = "categories";
const LABEL = "label";
const GROUP = "group";
const PUSH_MODE = "push_mode";
const POP_MODE = "pop_mode";
const LONGER_ALT = "longer_alt";
const LINE_BREAKS = "line_breaks";
const START_CHARS_HINT = "start_chars_hint";
function createToken(config) {
	return createTokenInternal(config);
}
function createTokenInternal(config) {
	const pattern = config.pattern;
	const tokenType = {};
	tokenType.name = config.name;
	if (!isUndefined_default(pattern)) tokenType.PATTERN = pattern;
	if (has_default(config, PARENT)) throw "The parent property is no longer supported.\nSee: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.";
	if (has_default(config, CATEGORIES)) tokenType.CATEGORIES = config[CATEGORIES];
	augmentTokenTypes([tokenType]);
	if (has_default(config, LABEL)) tokenType.LABEL = config[LABEL];
	if (has_default(config, GROUP)) tokenType.GROUP = config[GROUP];
	if (has_default(config, POP_MODE)) tokenType.POP_MODE = config[POP_MODE];
	if (has_default(config, PUSH_MODE)) tokenType.PUSH_MODE = config[PUSH_MODE];
	if (has_default(config, LONGER_ALT)) tokenType.LONGER_ALT = config[LONGER_ALT];
	if (has_default(config, LINE_BREAKS)) tokenType.LINE_BREAKS = config[LINE_BREAKS];
	if (has_default(config, START_CHARS_HINT)) tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
	return tokenType;
}
const EOF = createToken({
	name: "EOF",
	pattern: Lexer.NA
});
augmentTokenTypes([EOF]);
function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
	return {
		image,
		startOffset,
		endOffset,
		startLine,
		endLine,
		startColumn,
		endColumn,
		tokenTypeIdx: tokType.tokenTypeIdx,
		tokenType: tokType
	};
}
function tokenMatcher(token, tokType) {
	return tokenStructuredMatcher(token, tokType);
}
const defaultParserErrorProvider = {
	buildMismatchTokenMessage({ expected, actual, previous, ruleName }) {
		const hasLabel = hasTokenLabel(expected);
		const expectedMsg = hasLabel ? `--> ${tokenLabel(expected)} <--` : `token of type --> ${expected.name} <--`;
		const msg = `Expecting ${expectedMsg} but found --> '${actual.image}' <--`;
		return msg;
	},
	buildNotAllInputParsedMessage({ firstRedundant, ruleName }) {
		return "Redundant input, expecting EOF but found: " + firstRedundant.image;
	},
	buildNoViableAltMessage({ expectedPathsPerAlt, actual, previous, customUserDescription, ruleName }) {
		const errPrefix = "Expecting: ";
		const actualText = head_default(actual).image;
		const errSuffix = "\nbut found: '" + actualText + "'";
		if (customUserDescription) return errPrefix + customUserDescription + errSuffix;
		else {
			const allLookAheadPaths = reduce_default(expectedPathsPerAlt, (result, currAltPaths) => result.concat(currAltPaths), []);
			const nextValidTokenSequences = map_default(allLookAheadPaths, (currPath) => `[${map_default(currPath, (currTokenType) => tokenLabel(currTokenType)).join(", ")}]`);
			const nextValidSequenceItems = map_default(nextValidTokenSequences, (itemMsg, idx) => `  ${idx + 1}. ${itemMsg}`);
			const calculatedDescription = `one of these possible Token sequences:\n${nextValidSequenceItems.join("\n")}`;
			return errPrefix + calculatedDescription + errSuffix;
		}
	},
	buildEarlyExitMessage({ expectedIterationPaths, actual, customUserDescription, ruleName }) {
		const errPrefix = "Expecting: ";
		const actualText = head_default(actual).image;
		const errSuffix = "\nbut found: '" + actualText + "'";
		if (customUserDescription) return errPrefix + customUserDescription + errSuffix;
		else {
			const nextValidTokenSequences = map_default(expectedIterationPaths, (currPath) => `[${map_default(currPath, (currTokenType) => tokenLabel(currTokenType)).join(",")}]`);
			const calculatedDescription = `expecting at least one iteration which starts with one of these possible Token sequences::\n  <${nextValidTokenSequences.join(" ,")}>`;
			return errPrefix + calculatedDescription + errSuffix;
		}
	}
};
Object.freeze(defaultParserErrorProvider);
const defaultGrammarResolverErrorProvider = { buildRuleNotFoundError(topLevelRule, undefinedRule) {
	const msg = "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
	return msg;
} };
const defaultGrammarValidatorErrorProvider = {
	buildDuplicateFoundError(topLevelRule, duplicateProds) {
		function getExtraProductionArgument$1(prod) {
			if (prod instanceof Terminal) return prod.terminalType.name;
			else if (prod instanceof NonTerminal) return prod.nonTerminalName;
			else return "";
		}
		const topLevelName = topLevelRule.name;
		const duplicateProd = head_default(duplicateProds);
		const index = duplicateProd.idx;
		const dslName = getProductionDslName$1(duplicateProd);
		const extraArgument = getExtraProductionArgument$1(duplicateProd);
		const hasExplicitIndex = index > 0;
		let msg = `->${dslName}${hasExplicitIndex ? index : ""}<- ${extraArgument ? `with argument: ->${extraArgument}<-` : ""}
                  appears more than once (${duplicateProds.length} times) in the top level rule: ->${topLevelName}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
		msg = msg.replace(/[ \t]+/g, " ");
		msg = msg.replace(/\s\s+/g, "\n");
		return msg;
	},
	buildNamespaceConflictError(rule) {
		const errMsg = `Namespace conflict found in grammar.\nThe grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${rule.name}>.\nTo resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter.`;
		return errMsg;
	},
	buildAlternationPrefixAmbiguityError(options) {
		const pathMsg = map_default(options.prefixPath, (currTok) => tokenLabel(currTok)).join(", ");
		const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
		const errMsg = `Ambiguous alternatives: <${options.ambiguityIndices.join(" ,")}> due to common lookahead prefix\nin <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,\n<${pathMsg}> may appears as a prefix path in all these alternatives.\nSee: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details.`;
		return errMsg;
	},
	buildAlternationAmbiguityError(options) {
		const pathMsg = map_default(options.prefixPath, (currtok) => tokenLabel(currtok)).join(", ");
		const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
		let currMessage = `Ambiguous Alternatives Detected: <${options.ambiguityIndices.join(" ,")}> in <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,\n<${pathMsg}> may appears as a prefix path in all these alternatives.\n`;
		currMessage = currMessage + "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.";
		return currMessage;
	},
	buildEmptyRepetitionError(options) {
		let dslName = getProductionDslName$1(options.repetition);
		if (options.repetition.idx !== 0) dslName += options.repetition.idx;
		const errMsg = `The repetition <${dslName}> within Rule <${options.topLevelRule.name}> can never consume any tokens.\nThis could lead to an infinite loop.`;
		return errMsg;
	},
	buildTokenNameError(options) {
		/* istanbul ignore next */
		return "deprecated";
	},
	buildEmptyAlternationError(options) {
		const errMsg = `Ambiguous empty alternative: <${options.emptyChoiceIdx + 1}> in <OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.\nOnly the last alternative may be an empty alternative.`;
		return errMsg;
	},
	buildTooManyAlternativesError(options) {
		const errMsg = `An Alternation cannot have more than 256 alternatives:\n<OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.\n has ${options.alternation.definition.length + 1} alternatives.`;
		return errMsg;
	},
	buildLeftRecursionError(options) {
		const ruleName = options.topLevelRule.name;
		const pathNames = map_default(options.leftRecursionPath, (currRule) => currRule.name);
		const leftRecursivePath = `${ruleName} --> ${pathNames.concat([ruleName]).join(" --> ")}`;
		const errMsg = `Left Recursion found in grammar.\nrule: <${ruleName}> can be invoked from itself (directly or indirectly)\nwithout consuming any Tokens. The grammar path that causes this is: \n ${leftRecursivePath}\n To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
		return errMsg;
	},
	buildInvalidRuleNameError(options) {
		/* istanbul ignore next */
		return "deprecated";
	},
	buildDuplicateRuleNameError(options) {
		let ruleName;
		if (options.topLevelRule instanceof Rule) ruleName = options.topLevelRule.name;
		else ruleName = options.topLevelRule;
		const errMsg = `Duplicate definition, rule: ->${ruleName}<- is already defined in the grammar: ->${options.grammarName}<-`;
		return errMsg;
	}
};
function resolveGrammar$1(topLevels, errMsgProvider) {
	const refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
	refResolver.resolveRefs();
	return refResolver.errors;
}
var GastRefResolverVisitor = class extends GAstVisitor {
	constructor(nameToTopRule, errMsgProvider) {
		super();
		this.nameToTopRule = nameToTopRule;
		this.errMsgProvider = errMsgProvider;
		this.errors = [];
	}
	resolveRefs() {
		forEach_default(values_default(this.nameToTopRule), (prod) => {
			this.currTopLevel = prod;
			prod.accept(this);
		});
	}
	visitNonTerminal(node) {
		const ref = this.nameToTopRule[node.nonTerminalName];
		if (!ref) {
			const msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
			this.errors.push({
				message: msg,
				type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
				ruleName: this.currTopLevel.name,
				unresolvedRefName: node.nonTerminalName
			});
		} else node.referencedRule = ref;
	}
};
var AbstractNextPossibleTokensWalker = class extends RestWalker {
	constructor(topProd, path) {
		super();
		this.topProd = topProd;
		this.path = path;
		this.possibleTokTypes = [];
		this.nextProductionName = "";
		this.nextProductionOccurrence = 0;
		this.found = false;
		this.isAtEndOfPath = false;
	}
	startWalking() {
		this.found = false;
		if (this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!");
		this.ruleStack = clone_default(this.path.ruleStack).reverse();
		this.occurrenceStack = clone_default(this.path.occurrenceStack).reverse();
		this.ruleStack.pop();
		this.occurrenceStack.pop();
		this.updateExpectedNext();
		this.walk(this.topProd);
		return this.possibleTokTypes;
	}
	walk(prod, prevRest = []) {
		if (!this.found) super.walk(prod, prevRest);
	}
	walkProdRef(refProd, currRest, prevRest) {
		if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
			const fullRest = currRest.concat(prevRest);
			this.updateExpectedNext();
			this.walk(refProd.referencedRule, fullRest);
		}
	}
	updateExpectedNext() {
		if (isEmpty_default(this.ruleStack)) {
			this.nextProductionName = "";
			this.nextProductionOccurrence = 0;
			this.isAtEndOfPath = true;
		} else {
			this.nextProductionName = this.ruleStack.pop();
			this.nextProductionOccurrence = this.occurrenceStack.pop();
		}
	}
};
var NextAfterTokenWalker = class extends AbstractNextPossibleTokensWalker {
	constructor(topProd, path) {
		super(topProd, path);
		this.path = path;
		this.nextTerminalName = "";
		this.nextTerminalOccurrence = 0;
		this.nextTerminalName = this.path.lastTok.name;
		this.nextTerminalOccurrence = this.path.lastTokOccurrence;
	}
	walkTerminal(terminal, currRest, prevRest) {
		if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
			const fullRest = currRest.concat(prevRest);
			const restProd = new Alternative({ definition: fullRest });
			this.possibleTokTypes = first(restProd);
			this.found = true;
		}
	}
};
var AbstractNextTerminalAfterProductionWalker = class extends RestWalker {
	constructor(topRule, occurrence) {
		super();
		this.topRule = topRule;
		this.occurrence = occurrence;
		this.result = {
			token: void 0,
			occurrence: void 0,
			isEndOfRule: void 0
		};
	}
	startWalking() {
		this.walk(this.topRule);
		return this.result;
	}
};
var NextTerminalAfterManyWalker = class extends AbstractNextTerminalAfterProductionWalker {
	walkMany(manyProd, currRest, prevRest) {
		if (manyProd.idx === this.occurrence) {
			const firstAfterMany = head_default(currRest.concat(prevRest));
			this.result.isEndOfRule = firstAfterMany === void 0;
			if (firstAfterMany instanceof Terminal) {
				this.result.token = firstAfterMany.terminalType;
				this.result.occurrence = firstAfterMany.idx;
			}
		} else super.walkMany(manyProd, currRest, prevRest);
	}
};
var NextTerminalAfterManySepWalker = class extends AbstractNextTerminalAfterProductionWalker {
	walkManySep(manySepProd, currRest, prevRest) {
		if (manySepProd.idx === this.occurrence) {
			const firstAfterManySep = head_default(currRest.concat(prevRest));
			this.result.isEndOfRule = firstAfterManySep === void 0;
			if (firstAfterManySep instanceof Terminal) {
				this.result.token = firstAfterManySep.terminalType;
				this.result.occurrence = firstAfterManySep.idx;
			}
		} else super.walkManySep(manySepProd, currRest, prevRest);
	}
};
var NextTerminalAfterAtLeastOneWalker = class extends AbstractNextTerminalAfterProductionWalker {
	walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
		if (atLeastOneProd.idx === this.occurrence) {
			const firstAfterAtLeastOne = head_default(currRest.concat(prevRest));
			this.result.isEndOfRule = firstAfterAtLeastOne === void 0;
			if (firstAfterAtLeastOne instanceof Terminal) {
				this.result.token = firstAfterAtLeastOne.terminalType;
				this.result.occurrence = firstAfterAtLeastOne.idx;
			}
		} else super.walkAtLeastOne(atLeastOneProd, currRest, prevRest);
	}
};
var NextTerminalAfterAtLeastOneSepWalker = class extends AbstractNextTerminalAfterProductionWalker {
	walkAtLeastOneSep(atleastOneSepProd, currRest, prevRest) {
		if (atleastOneSepProd.idx === this.occurrence) {
			const firstAfterfirstAfterAtLeastOneSep = head_default(currRest.concat(prevRest));
			this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === void 0;
			if (firstAfterfirstAfterAtLeastOneSep instanceof Terminal) {
				this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
				this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
			}
		} else super.walkAtLeastOneSep(atleastOneSepProd, currRest, prevRest);
	}
};
function possiblePathsFrom(targetDef, maxLength, currPath = []) {
	currPath = clone_default(currPath);
	let result = [];
	let i = 0;
	function remainingPathWith(nextDef) {
		return nextDef.concat(drop_default(targetDef, i + 1));
	}
	function getAlternativesForProd(definition) {
		const alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
		return result.concat(alternatives);
	}
	while (currPath.length < maxLength && i < targetDef.length) {
		const prod = targetDef[i];
		/* istanbul ignore else */
		if (prod instanceof Alternative) return getAlternativesForProd(prod.definition);
		else if (prod instanceof NonTerminal) return getAlternativesForProd(prod.definition);
		else if (prod instanceof Option$1) result = getAlternativesForProd(prod.definition);
		else if (prod instanceof RepetitionMandatory) {
			const newDef = prod.definition.concat([new Repetition({ definition: prod.definition })]);
			return getAlternativesForProd(newDef);
		} else if (prod instanceof RepetitionMandatoryWithSeparator) {
			const newDef = [new Alternative({ definition: prod.definition }), new Repetition({ definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition) })];
			return getAlternativesForProd(newDef);
		} else if (prod instanceof RepetitionWithSeparator) {
			const newDef = prod.definition.concat([new Repetition({ definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition) })]);
			result = getAlternativesForProd(newDef);
		} else if (prod instanceof Repetition) {
			const newDef = prod.definition.concat([new Repetition({ definition: prod.definition })]);
			result = getAlternativesForProd(newDef);
		} else if (prod instanceof Alternation) {
			forEach_default(prod.definition, (currAlt) => {
				if (isEmpty_default(currAlt.definition) === false) result = getAlternativesForProd(currAlt.definition);
			});
			return result;
		} else if (prod instanceof Terminal) currPath.push(prod.terminalType);
		else throw Error("non exhaustive match");
		i++;
	}
	result.push({
		partialPath: currPath,
		suffixDef: drop_default(targetDef, i)
	});
	return result;
}
function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
	const EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
	const EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
	const EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
	let foundCompletePath = false;
	const tokenVectorLength = tokenVector.length;
	const minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
	const result = [];
	const possiblePaths = [];
	possiblePaths.push({
		idx: -1,
		def: initialDef,
		ruleStack: [],
		occurrenceStack: []
	});
	while (!isEmpty_default(possiblePaths)) {
		const currPath = possiblePaths.pop();
		if (currPath === EXIT_ALTERNATIVE) {
			if (foundCompletePath && last_default(possiblePaths).idx <= minimalAlternativesIndex) possiblePaths.pop();
			continue;
		}
		const currDef = currPath.def;
		const currIdx = currPath.idx;
		const currRuleStack = currPath.ruleStack;
		const currOccurrenceStack = currPath.occurrenceStack;
		if (isEmpty_default(currDef)) continue;
		const prod = currDef[0];
		/* istanbul ignore else */
		if (prod === EXIT_NON_TERMINAL) {
			const nextPath = {
				idx: currIdx,
				def: drop_default(currDef),
				ruleStack: dropRight_default(currRuleStack),
				occurrenceStack: dropRight_default(currOccurrenceStack)
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof Terminal)
 /* istanbul ignore else */
		if (currIdx < tokenVectorLength - 1) {
			const nextIdx = currIdx + 1;
			const actualToken = tokenVector[nextIdx];
			if (tokMatcher(actualToken, prod.terminalType)) {
				const nextPath = {
					idx: nextIdx,
					def: drop_default(currDef),
					ruleStack: currRuleStack,
					occurrenceStack: currOccurrenceStack
				};
				possiblePaths.push(nextPath);
			}
		} else if (currIdx === tokenVectorLength - 1) {
			result.push({
				nextTokenType: prod.terminalType,
				nextTokenOccurrence: prod.idx,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			});
			foundCompletePath = true;
		} else throw Error("non exhaustive match");
		else if (prod instanceof NonTerminal) {
			const newRuleStack = clone_default(currRuleStack);
			newRuleStack.push(prod.nonTerminalName);
			const newOccurrenceStack = clone_default(currOccurrenceStack);
			newOccurrenceStack.push(prod.idx);
			const nextPath = {
				idx: currIdx,
				def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, drop_default(currDef)),
				ruleStack: newRuleStack,
				occurrenceStack: newOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof Option$1) {
			const nextPathWithout = {
				idx: currIdx,
				def: drop_default(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			const nextPathWith = {
				idx: currIdx,
				def: prod.definition.concat(drop_default(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof RepetitionMandatory) {
			const secondIteration = new Repetition({
				definition: prod.definition,
				idx: prod.idx
			});
			const nextDef = prod.definition.concat([secondIteration], drop_default(currDef));
			const nextPath = {
				idx: currIdx,
				def: nextDef,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof RepetitionMandatoryWithSeparator) {
			const separatorGast = new Terminal({ terminalType: prod.separator });
			const secondIteration = new Repetition({
				definition: [separatorGast].concat(prod.definition),
				idx: prod.idx
			});
			const nextDef = prod.definition.concat([secondIteration], drop_default(currDef));
			const nextPath = {
				idx: currIdx,
				def: nextDef,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof RepetitionWithSeparator) {
			const nextPathWithout = {
				idx: currIdx,
				def: drop_default(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			const separatorGast = new Terminal({ terminalType: prod.separator });
			const nthRepetition = new Repetition({
				definition: [separatorGast].concat(prod.definition),
				idx: prod.idx
			});
			const nextDef = prod.definition.concat([nthRepetition], drop_default(currDef));
			const nextPathWith = {
				idx: currIdx,
				def: nextDef,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof Repetition) {
			const nextPathWithout = {
				idx: currIdx,
				def: drop_default(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			const nthRepetition = new Repetition({
				definition: prod.definition,
				idx: prod.idx
			});
			const nextDef = prod.definition.concat([nthRepetition], drop_default(currDef));
			const nextPathWith = {
				idx: currIdx,
				def: nextDef,
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof Alternation) for (let i = prod.definition.length - 1; i >= 0; i--) {
			const currAlt = prod.definition[i];
			const currAltPath = {
				idx: currIdx,
				def: currAlt.definition.concat(drop_default(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(currAltPath);
			possiblePaths.push(EXIT_ALTERNATIVE);
		}
		else if (prod instanceof Alternative) possiblePaths.push({
			idx: currIdx,
			def: prod.definition.concat(drop_default(currDef)),
			ruleStack: currRuleStack,
			occurrenceStack: currOccurrenceStack
		});
		else if (prod instanceof Rule) possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
		else throw Error("non exhaustive match");
	}
	return result;
}
function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
	const newRuleStack = clone_default(currRuleStack);
	newRuleStack.push(topRule.name);
	const newCurrOccurrenceStack = clone_default(currOccurrenceStack);
	newCurrOccurrenceStack.push(1);
	return {
		idx: currIdx,
		def: topRule.definition,
		ruleStack: newRuleStack,
		occurrenceStack: newCurrOccurrenceStack
	};
}
var PROD_TYPE;
(function(PROD_TYPE$1) {
	PROD_TYPE$1[PROD_TYPE$1["OPTION"] = 0] = "OPTION";
	PROD_TYPE$1[PROD_TYPE$1["REPETITION"] = 1] = "REPETITION";
	PROD_TYPE$1[PROD_TYPE$1["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
	PROD_TYPE$1[PROD_TYPE$1["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
	PROD_TYPE$1[PROD_TYPE$1["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
	PROD_TYPE$1[PROD_TYPE$1["ALTERNATION"] = 5] = "ALTERNATION";
})(PROD_TYPE || (PROD_TYPE = {}));
function getProdType$1(prod) {
	/* istanbul ignore else */
	if (prod instanceof Option$1 || prod === "Option") return PROD_TYPE.OPTION;
	else if (prod instanceof Repetition || prod === "Repetition") return PROD_TYPE.REPETITION;
	else if (prod instanceof RepetitionMandatory || prod === "RepetitionMandatory") return PROD_TYPE.REPETITION_MANDATORY;
	else if (prod instanceof RepetitionMandatoryWithSeparator || prod === "RepetitionMandatoryWithSeparator") return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
	else if (prod instanceof RepetitionWithSeparator || prod === "RepetitionWithSeparator") return PROD_TYPE.REPETITION_WITH_SEPARATOR;
	else if (prod instanceof Alternation || prod === "Alternation") return PROD_TYPE.ALTERNATION;
	else throw Error("non exhaustive match");
}
function getLookaheadPaths(options) {
	const { occurrence, rule, prodType, maxLookahead } = options;
	const type = getProdType$1(prodType);
	if (type === PROD_TYPE.ALTERNATION) return getLookaheadPathsForOr(occurrence, rule, maxLookahead);
	else return getLookaheadPathsForOptionalProd(occurrence, rule, type, maxLookahead);
}
function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
	const lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
	const tokenMatcher$1 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
	return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher$1, dynamicTokensEnabled);
}
function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
	const lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
	const tokenMatcher$1 = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
	return lookaheadBuilder(lookAheadPaths[0], tokenMatcher$1, dynamicTokensEnabled);
}
function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher$1, dynamicTokensEnabled) {
	const numOfAlts = alts.length;
	const areAllOneTokenLookahead = every_default(alts, (currAlt) => {
		return every_default(currAlt, (currPath) => {
			return currPath.length === 1;
		});
	});
	if (hasPredicates) return function(orAlts) {
		const predicates = map_default(orAlts, (currAlt) => currAlt.GATE);
		for (let t = 0; t < numOfAlts; t++) {
			const currAlt = alts[t];
			const currNumOfPaths = currAlt.length;
			const currPredicate = predicates[t];
			if (currPredicate !== void 0 && currPredicate.call(this) === false) continue;
			nextPath: for (let j = 0; j < currNumOfPaths; j++) {
				const currPath = currAlt[j];
				const currPathLength = currPath.length;
				for (let i = 0; i < currPathLength; i++) {
					const nextToken = this.LA(i + 1);
					if (tokenMatcher$1(nextToken, currPath[i]) === false) continue nextPath;
				}
				return t;
			}
		}
		return void 0;
	};
	else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
		const singleTokenAlts = map_default(alts, (currAlt) => {
			return flatten_default(currAlt);
		});
		const choiceToAlt = reduce_default(singleTokenAlts, (result, currAlt, idx) => {
			forEach_default(currAlt, (currTokType) => {
				if (!has_default(result, currTokType.tokenTypeIdx)) result[currTokType.tokenTypeIdx] = idx;
				forEach_default(currTokType.categoryMatches, (currExtendingType) => {
					if (!has_default(result, currExtendingType)) result[currExtendingType] = idx;
				});
			});
			return result;
		}, {});
		return function() {
			const nextToken = this.LA(1);
			return choiceToAlt[nextToken.tokenTypeIdx];
		};
	} else return function() {
		for (let t = 0; t < numOfAlts; t++) {
			const currAlt = alts[t];
			const currNumOfPaths = currAlt.length;
			nextPath: for (let j = 0; j < currNumOfPaths; j++) {
				const currPath = currAlt[j];
				const currPathLength = currPath.length;
				for (let i = 0; i < currPathLength; i++) {
					const nextToken = this.LA(i + 1);
					if (tokenMatcher$1(nextToken, currPath[i]) === false) continue nextPath;
				}
				return t;
			}
		}
		return void 0;
	};
}
function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher$1, dynamicTokensEnabled) {
	const areAllOneTokenLookahead = every_default(alt, (currPath) => {
		return currPath.length === 1;
	});
	const numOfPaths = alt.length;
	if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
		const singleTokensTypes = flatten_default(alt);
		if (singleTokensTypes.length === 1 && isEmpty_default(singleTokensTypes[0].categoryMatches)) {
			const expectedTokenType = singleTokensTypes[0];
			const expectedTokenUniqueKey = expectedTokenType.tokenTypeIdx;
			return function() {
				return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey;
			};
		} else {
			const choiceToAlt = reduce_default(singleTokensTypes, (result, currTokType, idx) => {
				result[currTokType.tokenTypeIdx] = true;
				forEach_default(currTokType.categoryMatches, (currExtendingType) => {
					result[currExtendingType] = true;
				});
				return result;
			}, []);
			return function() {
				const nextToken = this.LA(1);
				return choiceToAlt[nextToken.tokenTypeIdx] === true;
			};
		}
	} else return function() {
		nextPath: for (let j = 0; j < numOfPaths; j++) {
			const currPath = alt[j];
			const currPathLength = currPath.length;
			for (let i = 0; i < currPathLength; i++) {
				const nextToken = this.LA(i + 1);
				if (tokenMatcher$1(nextToken, currPath[i]) === false) continue nextPath;
			}
			return true;
		}
		return false;
	};
}
var RestDefinitionFinderWalker = class extends RestWalker {
	constructor(topProd, targetOccurrence, targetProdType) {
		super();
		this.topProd = topProd;
		this.targetOccurrence = targetOccurrence;
		this.targetProdType = targetProdType;
	}
	startWalking() {
		this.walk(this.topProd);
		return this.restDef;
	}
	checkIsTarget(node, expectedProdType, currRest, prevRest) {
		if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
			this.restDef = currRest.concat(prevRest);
			return true;
		}
		return false;
	}
	walkOption(optionProd, currRest, prevRest) {
		if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) super.walkOption(optionProd, currRest, prevRest);
	}
	walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
		if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) super.walkOption(atLeastOneProd, currRest, prevRest);
	}
	walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
		if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) super.walkOption(atLeastOneSepProd, currRest, prevRest);
	}
	walkMany(manyProd, currRest, prevRest) {
		if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) super.walkOption(manyProd, currRest, prevRest);
	}
	walkManySep(manySepProd, currRest, prevRest) {
		if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) super.walkOption(manySepProd, currRest, prevRest);
	}
};
var InsideDefinitionFinderVisitor = class extends GAstVisitor {
	constructor(targetOccurrence, targetProdType, targetRef) {
		super();
		this.targetOccurrence = targetOccurrence;
		this.targetProdType = targetProdType;
		this.targetRef = targetRef;
		this.result = [];
	}
	checkIsTarget(node, expectedProdName) {
		if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === void 0 || node === this.targetRef)) this.result = node.definition;
	}
	visitOption(node) {
		this.checkIsTarget(node, PROD_TYPE.OPTION);
	}
	visitRepetition(node) {
		this.checkIsTarget(node, PROD_TYPE.REPETITION);
	}
	visitRepetitionMandatory(node) {
		this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
	}
	visitRepetitionMandatoryWithSeparator(node) {
		this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
	}
	visitRepetitionWithSeparator(node) {
		this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
	}
	visitAlternation(node) {
		this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
	}
};
function initializeArrayOfArrays(size) {
	const result = new Array(size);
	for (let i = 0; i < size; i++) result[i] = [];
	return result;
}
function pathToHashKeys(path) {
	let keys = [""];
	for (let i = 0; i < path.length; i++) {
		const tokType = path[i];
		const longerKeys = [];
		for (let j = 0; j < keys.length; j++) {
			const currShorterKey = keys[j];
			longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
			for (let t = 0; t < tokType.categoryMatches.length; t++) {
				const categoriesKeySuffix = "_" + tokType.categoryMatches[t];
				longerKeys.push(currShorterKey + categoriesKeySuffix);
			}
		}
		keys = longerKeys;
	}
	return keys;
}
function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
	for (let currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
		if (currAltIdx === idx) continue;
		const otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
		for (let searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
			const searchKey = searchPathKeys[searchIdx];
			if (otherAltKnownPathsKeys[searchKey] === true) return false;
		}
	}
	return true;
}
function lookAheadSequenceFromAlternatives(altsDefs, k) {
	const partialAlts = map_default(altsDefs, (currAlt) => possiblePathsFrom([currAlt], 1));
	const finalResult = initializeArrayOfArrays(partialAlts.length);
	const altsHashes = map_default(partialAlts, (currAltPaths) => {
		const dict = {};
		forEach_default(currAltPaths, (item) => {
			const keys = pathToHashKeys(item.partialPath);
			forEach_default(keys, (currKey) => {
				dict[currKey] = true;
			});
		});
		return dict;
	});
	let newData = partialAlts;
	for (let pathLength = 1; pathLength <= k; pathLength++) {
		const currDataset = newData;
		newData = initializeArrayOfArrays(currDataset.length);
		for (let altIdx = 0; altIdx < currDataset.length; altIdx++) {
			const currAltPathsAndSuffixes = currDataset[altIdx];
			for (let currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
				const currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
				const suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
				const prefixKeys = pathToHashKeys(currPathPrefix);
				const isUnique = isUniquePrefixHash(altsHashes, prefixKeys, altIdx);
				if (isUnique || isEmpty_default(suffixDef) || currPathPrefix.length === k) {
					const currAltResult = finalResult[altIdx];
					if (containsPath(currAltResult, currPathPrefix) === false) {
						currAltResult.push(currPathPrefix);
						for (let j = 0; j < prefixKeys.length; j++) {
							const currKey = prefixKeys[j];
							altsHashes[altIdx][currKey] = true;
						}
					}
				} else {
					const newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
					newData[altIdx] = newData[altIdx].concat(newPartialPathsAndSuffixes);
					forEach_default(newPartialPathsAndSuffixes, (item) => {
						const prefixKeys$1 = pathToHashKeys(item.partialPath);
						forEach_default(prefixKeys$1, (key) => {
							altsHashes[altIdx][key] = true;
						});
					});
				}
			}
		}
	}
	return finalResult;
}
function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
	const visitor$1 = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
	ruleGrammar.accept(visitor$1);
	return lookAheadSequenceFromAlternatives(visitor$1.result, k);
}
function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
	const insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
	ruleGrammar.accept(insideDefVisitor);
	const insideDef = insideDefVisitor.result;
	const afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
	const afterDef = afterDefWalker.startWalking();
	const insideFlat = new Alternative({ definition: insideDef });
	const afterFlat = new Alternative({ definition: afterDef });
	return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
}
function containsPath(alternative, searchPath) {
	compareOtherPath: for (let i = 0; i < alternative.length; i++) {
		const otherPath = alternative[i];
		if (otherPath.length !== searchPath.length) continue;
		for (let j = 0; j < otherPath.length; j++) {
			const searchTok = searchPath[j];
			const otherTok = otherPath[j];
			const matchingTokens = searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== void 0;
			if (matchingTokens === false) continue compareOtherPath;
		}
		return true;
	}
	return false;
}
function isStrictPrefixOfPath(prefix, other) {
	return prefix.length < other.length && every_default(prefix, (tokType, idx) => {
		const otherTokType = other[idx];
		return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
	});
}
function areTokenCategoriesNotUsed(lookAheadPaths) {
	return every_default(lookAheadPaths, (singleAltPaths) => every_default(singleAltPaths, (singlePath) => every_default(singlePath, (token) => isEmpty_default(token.categoryMatches))));
}
function validateLookahead(options) {
	const lookaheadValidationErrorMessages = options.lookaheadStrategy.validate({
		rules: options.rules,
		tokenTypes: options.tokenTypes,
		grammarName: options.grammarName
	});
	return map_default(lookaheadValidationErrorMessages, (errorMessage) => Object.assign({ type: ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION }, errorMessage));
}
function validateGrammar$1(topLevels, tokenTypes, errMsgProvider, grammarName) {
	const duplicateErrors = flatMap_default(topLevels, (currTopLevel) => validateDuplicateProductions(currTopLevel, errMsgProvider));
	const termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
	const tooManyAltsErrors = flatMap_default(topLevels, (curRule) => validateTooManyAlts(curRule, errMsgProvider));
	const duplicateRulesError = flatMap_default(topLevels, (curRule) => validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider));
	return duplicateErrors.concat(termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError);
}
function validateDuplicateProductions(topLevelRule, errMsgProvider) {
	const collectorVisitor$1 = new OccurrenceValidationCollector();
	topLevelRule.accept(collectorVisitor$1);
	const allRuleProductions = collectorVisitor$1.allProductions;
	const productionGroups = groupBy_default(allRuleProductions, identifyProductionForDuplicates);
	const duplicates = pickBy_default(productionGroups, (currGroup) => {
		return currGroup.length > 1;
	});
	const errors = map_default(values_default(duplicates), (currDuplicates) => {
		const firstProd = head_default(currDuplicates);
		const msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
		const dslName = getProductionDslName$1(firstProd);
		const defError = {
			message: msg,
			type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
			ruleName: topLevelRule.name,
			dslName,
			occurrence: firstProd.idx
		};
		const param = getExtraProductionArgument(firstProd);
		if (param) defError.parameter = param;
		return defError;
	});
	return errors;
}
function identifyProductionForDuplicates(prod) {
	return `${getProductionDslName$1(prod)}_#_${prod.idx}_#_${getExtraProductionArgument(prod)}`;
}
function getExtraProductionArgument(prod) {
	if (prod instanceof Terminal) return prod.terminalType.name;
	else if (prod instanceof NonTerminal) return prod.nonTerminalName;
	else return "";
}
var OccurrenceValidationCollector = class extends GAstVisitor {
	constructor() {
		super(...arguments);
		this.allProductions = [];
	}
	visitNonTerminal(subrule) {
		this.allProductions.push(subrule);
	}
	visitOption(option$1) {
		this.allProductions.push(option$1);
	}
	visitRepetitionWithSeparator(manySep) {
		this.allProductions.push(manySep);
	}
	visitRepetitionMandatory(atLeastOne) {
		this.allProductions.push(atLeastOne);
	}
	visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
		this.allProductions.push(atLeastOneSep);
	}
	visitRepetition(many) {
		this.allProductions.push(many);
	}
	visitAlternation(or) {
		this.allProductions.push(or);
	}
	visitTerminal(terminal) {
		this.allProductions.push(terminal);
	}
};
function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
	const errors = [];
	const occurrences = reduce_default(allRules, (result, curRule) => {
		if (curRule.name === rule.name) return result + 1;
		return result;
	}, 0);
	if (occurrences > 1) {
		const errMsg = errMsgProvider.buildDuplicateRuleNameError({
			topLevelRule: rule,
			grammarName: className
		});
		errors.push({
			message: errMsg,
			type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
			ruleName: rule.name
		});
	}
	return errors;
}
function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
	const errors = [];
	let errMsg;
	if (!includes_default(definedRulesNames, ruleName)) {
		errMsg = `Invalid rule override, rule: ->${ruleName}<- cannot be overridden in the grammar: ->${className}<-as it is not defined in any of the super grammars `;
		errors.push({
			message: errMsg,
			type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
			ruleName
		});
	}
	return errors;
}
function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path = []) {
	const errors = [];
	const nextNonTerminals = getFirstNoneTerminal(currRule.definition);
	if (isEmpty_default(nextNonTerminals)) return [];
	else {
		const ruleName = topRule.name;
		const foundLeftRecursion = includes_default(nextNonTerminals, topRule);
		if (foundLeftRecursion) errors.push({
			message: errMsgProvider.buildLeftRecursionError({
				topLevelRule: topRule,
				leftRecursionPath: path
			}),
			type: ParserDefinitionErrorType.LEFT_RECURSION,
			ruleName
		});
		const validNextSteps = difference_default(nextNonTerminals, path.concat([topRule]));
		const errorsFromNextSteps = flatMap_default(validNextSteps, (currRefRule) => {
			const newPath = clone_default(path);
			newPath.push(currRefRule);
			return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
		});
		return errors.concat(errorsFromNextSteps);
	}
}
function getFirstNoneTerminal(definition) {
	let result = [];
	if (isEmpty_default(definition)) return result;
	const firstProd = head_default(definition);
	/* istanbul ignore else */
	if (firstProd instanceof NonTerminal) result.push(firstProd.referencedRule);
	else if (firstProd instanceof Alternative || firstProd instanceof Option$1 || firstProd instanceof RepetitionMandatory || firstProd instanceof RepetitionMandatoryWithSeparator || firstProd instanceof RepetitionWithSeparator || firstProd instanceof Repetition) result = result.concat(getFirstNoneTerminal(firstProd.definition));
	else if (firstProd instanceof Alternation) result = flatten_default(map_default(firstProd.definition, (currSubDef) => getFirstNoneTerminal(currSubDef.definition)));
	else if (firstProd instanceof Terminal) {} else throw Error("non exhaustive match");
	const isFirstOptional = isOptionalProd(firstProd);
	const hasMore = definition.length > 1;
	if (isFirstOptional && hasMore) {
		const rest = drop_default(definition);
		return result.concat(getFirstNoneTerminal(rest));
	} else return result;
}
var OrCollector = class extends GAstVisitor {
	constructor() {
		super(...arguments);
		this.alternations = [];
	}
	visitAlternation(node) {
		this.alternations.push(node);
	}
};
function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
	const orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	const ors = orCollector.alternations;
	const errors = flatMap_default(ors, (currOr) => {
		const exceptLast = dropRight_default(currOr.definition);
		return flatMap_default(exceptLast, (currAlternative, currAltIdx) => {
			const possibleFirstInAlt = nextPossibleTokensAfter([currAlternative], [], tokenStructuredMatcher, 1);
			if (isEmpty_default(possibleFirstInAlt)) return [{
				message: errMsgProvider.buildEmptyAlternationError({
					topLevelRule,
					alternation: currOr,
					emptyChoiceIdx: currAltIdx
				}),
				type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
				ruleName: topLevelRule.name,
				occurrence: currOr.idx,
				alternative: currAltIdx + 1
			}];
			else return [];
		});
	});
	return errors;
}
function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
	const orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	let ors = orCollector.alternations;
	ors = reject_default(ors, (currOr) => currOr.ignoreAmbiguities === true);
	const errors = flatMap_default(ors, (currOr) => {
		const currOccurrence = currOr.idx;
		const actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead;
		const alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr);
		const altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
		const altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
		return altsAmbiguityErrors.concat(altsPrefixAmbiguityErrors);
	});
	return errors;
}
var RepetitionCollector = class extends GAstVisitor {
	constructor() {
		super(...arguments);
		this.allProductions = [];
	}
	visitRepetitionWithSeparator(manySep) {
		this.allProductions.push(manySep);
	}
	visitRepetitionMandatory(atLeastOne) {
		this.allProductions.push(atLeastOne);
	}
	visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
		this.allProductions.push(atLeastOneSep);
	}
	visitRepetition(many) {
		this.allProductions.push(many);
	}
};
function validateTooManyAlts(topLevelRule, errMsgProvider) {
	const orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	const ors = orCollector.alternations;
	const errors = flatMap_default(ors, (currOr) => {
		if (currOr.definition.length > 255) return [{
			message: errMsgProvider.buildTooManyAlternativesError({
				topLevelRule,
				alternation: currOr
			}),
			type: ParserDefinitionErrorType.TOO_MANY_ALTS,
			ruleName: topLevelRule.name,
			occurrence: currOr.idx
		}];
		else return [];
	});
	return errors;
}
function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
	const errors = [];
	forEach_default(topLevelRules, (currTopRule) => {
		const collectorVisitor$1 = new RepetitionCollector();
		currTopRule.accept(collectorVisitor$1);
		const allRuleProductions = collectorVisitor$1.allProductions;
		forEach_default(allRuleProductions, (currProd) => {
			const prodType = getProdType$1(currProd);
			const actualMaxLookahead = currProd.maxLookahead || maxLookahead;
			const currOccurrence = currProd.idx;
			const paths = getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead);
			const pathsInsideProduction = paths[0];
			if (isEmpty_default(flatten_default(pathsInsideProduction))) {
				const errMsg = errMsgProvider.buildEmptyRepetitionError({
					topLevelRule: currTopRule,
					repetition: currProd
				});
				errors.push({
					message: errMsg,
					type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
					ruleName: currTopRule.name
				});
			}
		});
	});
	return errors;
}
function checkAlternativesAmbiguities(alternatives, alternation$1, rule, errMsgProvider) {
	const foundAmbiguousPaths = [];
	const identicalAmbiguities = reduce_default(alternatives, (result, currAlt, currAltIdx) => {
		if (alternation$1.definition[currAltIdx].ignoreAmbiguities === true) return result;
		forEach_default(currAlt, (currPath) => {
			const altsCurrPathAppearsIn = [currAltIdx];
			forEach_default(alternatives, (currOtherAlt, currOtherAltIdx) => {
				if (currAltIdx !== currOtherAltIdx && containsPath(currOtherAlt, currPath) && alternation$1.definition[currOtherAltIdx].ignoreAmbiguities !== true) altsCurrPathAppearsIn.push(currOtherAltIdx);
			});
			if (altsCurrPathAppearsIn.length > 1 && !containsPath(foundAmbiguousPaths, currPath)) {
				foundAmbiguousPaths.push(currPath);
				result.push({
					alts: altsCurrPathAppearsIn,
					path: currPath
				});
			}
		});
		return result;
	}, []);
	const currErrors = map_default(identicalAmbiguities, (currAmbDescriptor) => {
		const ambgIndices = map_default(currAmbDescriptor.alts, (currAltIdx) => currAltIdx + 1);
		const currMessage = errMsgProvider.buildAlternationAmbiguityError({
			topLevelRule: rule,
			alternation: alternation$1,
			ambiguityIndices: ambgIndices,
			prefixPath: currAmbDescriptor.path
		});
		return {
			message: currMessage,
			type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
			ruleName: rule.name,
			occurrence: alternation$1.idx,
			alternatives: currAmbDescriptor.alts
		};
	});
	return currErrors;
}
function checkPrefixAlternativesAmbiguities(alternatives, alternation$1, rule, errMsgProvider) {
	const pathsAndIndices = reduce_default(alternatives, (result, currAlt, idx) => {
		const currPathsAndIdx = map_default(currAlt, (currPath) => {
			return {
				idx,
				path: currPath
			};
		});
		return result.concat(currPathsAndIdx);
	}, []);
	const errors = compact_default(flatMap_default(pathsAndIndices, (currPathAndIdx) => {
		const alternativeGast = alternation$1.definition[currPathAndIdx.idx];
		if (alternativeGast.ignoreAmbiguities === true) return [];
		const targetIdx = currPathAndIdx.idx;
		const targetPath = currPathAndIdx.path;
		const prefixAmbiguitiesPathsAndIndices = filter_default(pathsAndIndices, (searchPathAndIdx) => {
			return alternation$1.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && isStrictPrefixOfPath(searchPathAndIdx.path, targetPath);
		});
		const currPathPrefixErrors = map_default(prefixAmbiguitiesPathsAndIndices, (currAmbPathAndIdx) => {
			const ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
			const occurrence = alternation$1.idx === 0 ? "" : alternation$1.idx;
			const message = errMsgProvider.buildAlternationPrefixAmbiguityError({
				topLevelRule: rule,
				alternation: alternation$1,
				ambiguityIndices: ambgIndices,
				prefixPath: currAmbPathAndIdx.path
			});
			return {
				message,
				type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
				ruleName: rule.name,
				occurrence,
				alternatives: ambgIndices
			};
		});
		return currPathPrefixErrors;
	}));
	return errors;
}
function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
	const errors = [];
	const tokenNames = map_default(tokenTypes, (currToken) => currToken.name);
	forEach_default(topLevels, (currRule) => {
		const currRuleName = currRule.name;
		if (includes_default(tokenNames, currRuleName)) {
			const errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
			errors.push({
				message: errMsg,
				type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
				ruleName: currRuleName
			});
		}
	});
	return errors;
}
function resolveGrammar(options) {
	const actualOptions = defaults_default(options, { errMsgProvider: defaultGrammarResolverErrorProvider });
	const topRulesTable = {};
	forEach_default(options.rules, (rule) => {
		topRulesTable[rule.name] = rule;
	});
	return resolveGrammar$1(topRulesTable, actualOptions.errMsgProvider);
}
function validateGrammar(options) {
	options = defaults_default(options, { errMsgProvider: defaultGrammarValidatorErrorProvider });
	return validateGrammar$1(options.rules, options.tokenTypes, options.errMsgProvider, options.grammarName);
}
const MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
const NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
const EARLY_EXIT_EXCEPTION = "EarlyExitException";
const NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
const RECOGNITION_EXCEPTION_NAMES = [
	MISMATCHED_TOKEN_EXCEPTION,
	NO_VIABLE_ALT_EXCEPTION,
	EARLY_EXIT_EXCEPTION,
	NOT_ALL_INPUT_PARSED_EXCEPTION
];
Object.freeze(RECOGNITION_EXCEPTION_NAMES);
function isRecognitionException(error$1) {
	return includes_default(RECOGNITION_EXCEPTION_NAMES, error$1.name);
}
var RecognitionException = class extends Error {
	constructor(message, token) {
		super(message);
		this.token = token;
		this.resyncedTokens = [];
		Object.setPrototypeOf(this, new.target.prototype);
		/* istanbul ignore next - V8 workaround to remove constructor from stacktrace when typescript target is ES5 */
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	}
};
var MismatchedTokenException = class extends RecognitionException {
	constructor(message, token, previousToken) {
		super(message, token);
		this.previousToken = previousToken;
		this.name = MISMATCHED_TOKEN_EXCEPTION;
	}
};
var NoViableAltException = class extends RecognitionException {
	constructor(message, token, previousToken) {
		super(message, token);
		this.previousToken = previousToken;
		this.name = NO_VIABLE_ALT_EXCEPTION;
	}
};
var NotAllInputParsedException = class extends RecognitionException {
	constructor(message, token) {
		super(message, token);
		this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
	}
};
var EarlyExitException = class extends RecognitionException {
	constructor(message, token, previousToken) {
		super(message, token);
		this.previousToken = previousToken;
		this.name = EARLY_EXIT_EXCEPTION;
	}
};
const EOF_FOLLOW_KEY = {};
const IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
var InRuleRecoveryException = class extends Error {
	constructor(message) {
		super(message);
		this.name = IN_RULE_RECOVERY_EXCEPTION;
	}
};
var Recoverable = class {
	initRecoverable(config) {
		this.firstAfterRepMap = {};
		this.resyncFollows = {};
		this.recoveryEnabled = has_default(config, "recoveryEnabled") ? config.recoveryEnabled : DEFAULT_PARSER_CONFIG.recoveryEnabled;
		if (this.recoveryEnabled) this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
	}
	getTokenToInsert(tokType) {
		const tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
		tokToInsert.isInsertedInRecovery = true;
		return tokToInsert;
	}
	canTokenTypeBeInsertedInRecovery(tokType) {
		return true;
	}
	canTokenTypeBeDeletedInRecovery(tokType) {
		return true;
	}
	tryInRepetitionRecovery(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
		const reSyncTokType = this.findReSyncTokenType();
		const savedLexerState = this.exportLexerState();
		const resyncedTokens = [];
		let passedResyncPoint = false;
		const nextTokenWithoutResync = this.LA(1);
		let currToken = this.LA(1);
		const generateErrorMessage = () => {
			const previousToken = this.LA(0);
			const msg = this.errorMessageProvider.buildMismatchTokenMessage({
				expected: expectedTokType,
				actual: nextTokenWithoutResync,
				previous: previousToken,
				ruleName: this.getCurrRuleFullName()
			});
			const error$1 = new MismatchedTokenException(msg, nextTokenWithoutResync, this.LA(0));
			error$1.resyncedTokens = dropRight_default(resyncedTokens);
			this.SAVE_ERROR(error$1);
		};
		while (!passedResyncPoint) if (this.tokenMatcher(currToken, expectedTokType)) {
			generateErrorMessage();
			return;
		} else if (lookAheadFunc.call(this)) {
			generateErrorMessage();
			grammarRule.apply(this, grammarRuleArgs);
			return;
		} else if (this.tokenMatcher(currToken, reSyncTokType)) passedResyncPoint = true;
		else {
			currToken = this.SKIP_TOKEN();
			this.addToResyncTokens(currToken, resyncedTokens);
		}
		this.importLexerState(savedLexerState);
	}
	shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck) {
		if (notStuck === false) return false;
		if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) return false;
		if (this.isBackTracking()) return false;
		if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) return false;
		return true;
	}
	getFollowsForInRuleRecovery(tokType, tokIdxInRule) {
		const grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
		const follows = this.getNextPossibleTokenTypes(grammarPath);
		return follows;
	}
	tryInRuleRecovery(expectedTokType, follows) {
		if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
			const tokToInsert = this.getTokenToInsert(expectedTokType);
			return tokToInsert;
		}
		if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
			const nextTok = this.SKIP_TOKEN();
			this.consumeToken();
			return nextTok;
		}
		throw new InRuleRecoveryException("sad sad panda");
	}
	canPerformInRuleRecovery(expectedToken, follows) {
		return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
	}
	canRecoverWithSingleTokenInsertion(expectedTokType, follows) {
		if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) return false;
		if (isEmpty_default(follows)) return false;
		const mismatchedTok = this.LA(1);
		const isMisMatchedTokInFollows = find_default(follows, (possibleFollowsTokType) => {
			return this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
		}) !== void 0;
		return isMisMatchedTokInFollows;
	}
	canRecoverWithSingleTokenDeletion(expectedTokType) {
		if (!this.canTokenTypeBeDeletedInRecovery(expectedTokType)) return false;
		const isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
		return isNextTokenWhatIsExpected;
	}
	isInCurrentRuleReSyncSet(tokenTypeIdx) {
		const followKey = this.getCurrFollowKey();
		const currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
		return includes_default(currentRuleReSyncSet, tokenTypeIdx);
	}
	findReSyncTokenType() {
		const allPossibleReSyncTokTypes = this.flattenFollowSet();
		let nextToken = this.LA(1);
		let k = 2;
		while (true) {
			const foundMatch = find_default(allPossibleReSyncTokTypes, (resyncTokType) => {
				const canMatch = tokenMatcher(nextToken, resyncTokType);
				return canMatch;
			});
			if (foundMatch !== void 0) return foundMatch;
			nextToken = this.LA(k);
			k++;
		}
	}
	getCurrFollowKey() {
		if (this.RULE_STACK.length === 1) return EOF_FOLLOW_KEY;
		const currRuleShortName = this.getLastExplicitRuleShortName();
		const currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
		const prevRuleShortName = this.getPreviousExplicitRuleShortName();
		return {
			ruleName: this.shortRuleNameToFullName(currRuleShortName),
			idxInCallingRule: currRuleIdx,
			inRule: this.shortRuleNameToFullName(prevRuleShortName)
		};
	}
	buildFullFollowKeyStack() {
		const explicitRuleStack = this.RULE_STACK;
		const explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
		return map_default(explicitRuleStack, (ruleName, idx) => {
			if (idx === 0) return EOF_FOLLOW_KEY;
			return {
				ruleName: this.shortRuleNameToFullName(ruleName),
				idxInCallingRule: explicitOccurrenceStack[idx],
				inRule: this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
			};
		});
	}
	flattenFollowSet() {
		const followStack = map_default(this.buildFullFollowKeyStack(), (currKey) => {
			return this.getFollowSetFromFollowKey(currKey);
		});
		return flatten_default(followStack);
	}
	getFollowSetFromFollowKey(followKey) {
		if (followKey === EOF_FOLLOW_KEY) return [EOF];
		const followName = followKey.ruleName + followKey.idxInCallingRule + IN + followKey.inRule;
		return this.resyncFollows[followName];
	}
	addToResyncTokens(token, resyncTokens) {
		if (!this.tokenMatcher(token, EOF)) resyncTokens.push(token);
		return resyncTokens;
	}
	reSyncTo(tokType) {
		const resyncedTokens = [];
		let nextTok = this.LA(1);
		while (this.tokenMatcher(nextTok, tokType) === false) {
			nextTok = this.SKIP_TOKEN();
			this.addToResyncTokens(nextTok, resyncedTokens);
		}
		return dropRight_default(resyncedTokens);
	}
	attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {}
	getCurrentGrammarPath(tokType, tokIdxInRule) {
		const pathRuleStack = this.getHumanReadableRuleStack();
		const pathOccurrenceStack = clone_default(this.RULE_OCCURRENCE_STACK);
		const grammarPath = {
			ruleStack: pathRuleStack,
			occurrenceStack: pathOccurrenceStack,
			lastTok: tokType,
			lastTokOccurrence: tokIdxInRule
		};
		return grammarPath;
	}
	getHumanReadableRuleStack() {
		return map_default(this.RULE_STACK, (currShortName) => this.shortRuleNameToFullName(currShortName));
	}
};
function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
	const key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
	let firstAfterRepInfo = this.firstAfterRepMap[key];
	if (firstAfterRepInfo === void 0) {
		const currRuleName = this.getCurrRuleFullName();
		const ruleGrammar = this.getGAstProductions()[currRuleName];
		const walker = new nextToksWalker(ruleGrammar, prodOccurrence);
		firstAfterRepInfo = walker.startWalking();
		this.firstAfterRepMap[key] = firstAfterRepInfo;
	}
	let expectTokAfterLastMatch = firstAfterRepInfo.token;
	let nextTokIdx = firstAfterRepInfo.occurrence;
	const isEndOfRule = firstAfterRepInfo.isEndOfRule;
	if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === void 0) {
		expectTokAfterLastMatch = EOF;
		nextTokIdx = 1;
	}
	if (expectTokAfterLastMatch === void 0 || nextTokIdx === void 0) return;
	if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
}
const BITS_FOR_METHOD_TYPE = 4;
const BITS_FOR_OCCURRENCE_IDX = 8;
const BITS_FOR_ALT_IDX = 8;
const OR_IDX = 1 << BITS_FOR_OCCURRENCE_IDX;
const OPTION_IDX = 2 << BITS_FOR_OCCURRENCE_IDX;
const MANY_IDX = 3 << BITS_FOR_OCCURRENCE_IDX;
const AT_LEAST_ONE_IDX = 4 << BITS_FOR_OCCURRENCE_IDX;
const MANY_SEP_IDX = 5 << BITS_FOR_OCCURRENCE_IDX;
const AT_LEAST_ONE_SEP_IDX = 6 << BITS_FOR_OCCURRENCE_IDX;
function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
	return occurrence | dslMethodIdx | ruleIdx;
}
32 - BITS_FOR_ALT_IDX;
var LLkLookaheadStrategy = class {
	constructor(options) {
		var _a;
		this.maxLookahead = (_a = options === null || options === void 0 ? void 0 : options.maxLookahead) !== null && _a !== void 0 ? _a : DEFAULT_PARSER_CONFIG.maxLookahead;
	}
	validate(options) {
		const leftRecursionErrors = this.validateNoLeftRecursion(options.rules);
		if (isEmpty_default(leftRecursionErrors)) {
			const emptyAltErrors = this.validateEmptyOrAlternatives(options.rules);
			const ambiguousAltsErrors = this.validateAmbiguousAlternationAlternatives(options.rules, this.maxLookahead);
			const emptyRepetitionErrors = this.validateSomeNonEmptyLookaheadPath(options.rules, this.maxLookahead);
			const allErrors = [
				...leftRecursionErrors,
				...emptyAltErrors,
				...ambiguousAltsErrors,
				...emptyRepetitionErrors
			];
			return allErrors;
		}
		return leftRecursionErrors;
	}
	validateNoLeftRecursion(rules) {
		return flatMap_default(rules, (currTopRule) => validateNoLeftRecursion(currTopRule, currTopRule, defaultGrammarValidatorErrorProvider));
	}
	validateEmptyOrAlternatives(rules) {
		return flatMap_default(rules, (currTopRule) => validateEmptyOrAlternative(currTopRule, defaultGrammarValidatorErrorProvider));
	}
	validateAmbiguousAlternationAlternatives(rules, maxLookahead) {
		return flatMap_default(rules, (currTopRule) => validateAmbiguousAlternationAlternatives(currTopRule, maxLookahead, defaultGrammarValidatorErrorProvider));
	}
	validateSomeNonEmptyLookaheadPath(rules, maxLookahead) {
		return validateSomeNonEmptyLookaheadPath(rules, maxLookahead, defaultGrammarValidatorErrorProvider);
	}
	buildLookaheadForAlternation(options) {
		return buildLookaheadFuncForOr(options.prodOccurrence, options.rule, options.maxLookahead, options.hasPredicates, options.dynamicTokensEnabled, buildAlternativesLookAheadFunc);
	}
	buildLookaheadForOptional(options) {
		return buildLookaheadFuncForOptionalProd(options.prodOccurrence, options.rule, options.maxLookahead, options.dynamicTokensEnabled, getProdType$1(options.prodType), buildSingleAlternativeLookaheadFunction);
	}
};
var LooksAhead = class {
	initLooksAhead(config) {
		this.dynamicTokensEnabled = has_default(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
		this.maxLookahead = has_default(config, "maxLookahead") ? config.maxLookahead : DEFAULT_PARSER_CONFIG.maxLookahead;
		this.lookaheadStrategy = has_default(config, "lookaheadStrategy") ? config.lookaheadStrategy : new LLkLookaheadStrategy({ maxLookahead: this.maxLookahead });
		this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
	}
	preComputeLookaheadFunctions(rules) {
		forEach_default(rules, (currRule) => {
			this.TRACE_INIT(`${currRule.name} Rule Lookahead`, () => {
				const { alternation: alternation$1, repetition: repetition$1, option: option$1, repetitionMandatory: repetitionMandatory$1, repetitionMandatoryWithSeparator, repetitionWithSeparator } = collectMethods(currRule);
				forEach_default(alternation$1, (currProd) => {
					const prodIdx = currProd.idx === 0 ? "" : currProd.idx;
					this.TRACE_INIT(`${getProductionDslName$1(currProd)}${prodIdx}`, () => {
						const laFunc = this.lookaheadStrategy.buildLookaheadForAlternation({
							prodOccurrence: currProd.idx,
							rule: currRule,
							maxLookahead: currProd.maxLookahead || this.maxLookahead,
							hasPredicates: currProd.hasPredicates,
							dynamicTokensEnabled: this.dynamicTokensEnabled
						});
						const key = getKeyForAutomaticLookahead(this.fullRuleNameToShort[currRule.name], OR_IDX, currProd.idx);
						this.setLaFuncCache(key, laFunc);
					});
				});
				forEach_default(repetition$1, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, MANY_IDX, "Repetition", currProd.maxLookahead, getProductionDslName$1(currProd));
				});
				forEach_default(option$1, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, OPTION_IDX, "Option", currProd.maxLookahead, getProductionDslName$1(currProd));
				});
				forEach_default(repetitionMandatory$1, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_IDX, "RepetitionMandatory", currProd.maxLookahead, getProductionDslName$1(currProd));
				});
				forEach_default(repetitionMandatoryWithSeparator, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_SEP_IDX, "RepetitionMandatoryWithSeparator", currProd.maxLookahead, getProductionDslName$1(currProd));
				});
				forEach_default(repetitionWithSeparator, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, MANY_SEP_IDX, "RepetitionWithSeparator", currProd.maxLookahead, getProductionDslName$1(currProd));
				});
			});
		});
	}
	computeLookaheadFunc(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
		this.TRACE_INIT(`${dslMethodName}${prodOccurrence === 0 ? "" : prodOccurrence}`, () => {
			const laFunc = this.lookaheadStrategy.buildLookaheadForOptional({
				prodOccurrence,
				rule,
				maxLookahead: prodMaxLookahead || this.maxLookahead,
				dynamicTokensEnabled: this.dynamicTokensEnabled,
				prodType
			});
			const key = getKeyForAutomaticLookahead(this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
			this.setLaFuncCache(key, laFunc);
		});
	}
	getKeyForAutomaticLookahead(dslMethodIdx, occurrence) {
		const currRuleShortName = this.getLastExplicitRuleShortName();
		return getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
	}
	getLaFuncFromCache(key) {
		return this.lookAheadFuncsCache.get(key);
	}
	/* istanbul ignore next */
	setLaFuncCache(key, value) {
		this.lookAheadFuncsCache.set(key, value);
	}
};
var DslMethodsCollectorVisitor = class extends GAstVisitor {
	constructor() {
		super(...arguments);
		this.dslMethods = {
			option: [],
			alternation: [],
			repetition: [],
			repetitionWithSeparator: [],
			repetitionMandatory: [],
			repetitionMandatoryWithSeparator: []
		};
	}
	reset() {
		this.dslMethods = {
			option: [],
			alternation: [],
			repetition: [],
			repetitionWithSeparator: [],
			repetitionMandatory: [],
			repetitionMandatoryWithSeparator: []
		};
	}
	visitOption(option$1) {
		this.dslMethods.option.push(option$1);
	}
	visitRepetitionWithSeparator(manySep) {
		this.dslMethods.repetitionWithSeparator.push(manySep);
	}
	visitRepetitionMandatory(atLeastOne) {
		this.dslMethods.repetitionMandatory.push(atLeastOne);
	}
	visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
		this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
	}
	visitRepetition(many) {
		this.dslMethods.repetition.push(many);
	}
	visitAlternation(or) {
		this.dslMethods.alternation.push(or);
	}
};
const collectorVisitor = new DslMethodsCollectorVisitor();
function collectMethods(rule) {
	collectorVisitor.reset();
	rule.accept(collectorVisitor);
	const dslMethods = collectorVisitor.dslMethods;
	collectorVisitor.reset();
	return dslMethods;
}
function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
	if (isNaN(currNodeLocation.startOffset) === true) {
		currNodeLocation.startOffset = newLocationInfo.startOffset;
		currNodeLocation.endOffset = newLocationInfo.endOffset;
	} else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) currNodeLocation.endOffset = newLocationInfo.endOffset;
}
function setNodeLocationFull(currNodeLocation, newLocationInfo) {
	if (isNaN(currNodeLocation.startOffset) === true) {
		currNodeLocation.startOffset = newLocationInfo.startOffset;
		currNodeLocation.startColumn = newLocationInfo.startColumn;
		currNodeLocation.startLine = newLocationInfo.startLine;
		currNodeLocation.endOffset = newLocationInfo.endOffset;
		currNodeLocation.endColumn = newLocationInfo.endColumn;
		currNodeLocation.endLine = newLocationInfo.endLine;
	} else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
		currNodeLocation.endOffset = newLocationInfo.endOffset;
		currNodeLocation.endColumn = newLocationInfo.endColumn;
		currNodeLocation.endLine = newLocationInfo.endLine;
	}
}
function addTerminalToCst(node, token, tokenTypeName) {
	if (node.children[tokenTypeName] === void 0) node.children[tokenTypeName] = [token];
	else node.children[tokenTypeName].push(token);
}
function addNoneTerminalToCst(node, ruleName, ruleResult) {
	if (node.children[ruleName] === void 0) node.children[ruleName] = [ruleResult];
	else node.children[ruleName].push(ruleResult);
}
const NAME = "name";
function defineNameProp(obj, nameValue) {
	Object.defineProperty(obj, NAME, {
		enumerable: false,
		configurable: true,
		writable: false,
		value: nameValue
	});
}
function defaultVisit(ctx, param) {
	const childrenNames = keys_default(ctx);
	const childrenNamesLength = childrenNames.length;
	for (let i = 0; i < childrenNamesLength; i++) {
		const currChildName = childrenNames[i];
		const currChildArray = ctx[currChildName];
		const currChildArrayLength = currChildArray.length;
		for (let j = 0; j < currChildArrayLength; j++) {
			const currChild = currChildArray[j];
			if (currChild.tokenTypeIdx === void 0) this[currChild.name](currChild.children, param);
		}
	}
}
function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
	const derivedConstructor = function() {};
	defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
	const semanticProto = {
		visit: function(cstNode, param) {
			if (isArray_default(cstNode)) cstNode = cstNode[0];
			if (isUndefined_default(cstNode)) return void 0;
			return this[cstNode.name](cstNode.children, param);
		},
		validateVisitor: function() {
			const semanticDefinitionErrors = validateVisitor(this, ruleNames);
			if (!isEmpty_default(semanticDefinitionErrors)) {
				const errorMessages = map_default(semanticDefinitionErrors, (currDefError) => currDefError.msg);
				throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:\n\t${errorMessages.join("\n\n").replace(/\n/g, "\n	")}`);
			}
		}
	};
	derivedConstructor.prototype = semanticProto;
	derivedConstructor.prototype.constructor = derivedConstructor;
	derivedConstructor._RULE_NAMES = ruleNames;
	return derivedConstructor;
}
function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
	const derivedConstructor = function() {};
	defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
	const withDefaultsProto = Object.create(baseConstructor.prototype);
	forEach_default(ruleNames, (ruleName) => {
		withDefaultsProto[ruleName] = defaultVisit;
	});
	derivedConstructor.prototype = withDefaultsProto;
	derivedConstructor.prototype.constructor = derivedConstructor;
	return derivedConstructor;
}
var CstVisitorDefinitionError;
(function(CstVisitorDefinitionError$1) {
	CstVisitorDefinitionError$1[CstVisitorDefinitionError$1["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
	CstVisitorDefinitionError$1[CstVisitorDefinitionError$1["MISSING_METHOD"] = 1] = "MISSING_METHOD";
})(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));
function validateVisitor(visitorInstance, ruleNames) {
	const missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
	return missingErrors;
}
function validateMissingCstMethods(visitorInstance, ruleNames) {
	const missingRuleNames = filter_default(ruleNames, (currRuleName) => {
		return isFunction_default(visitorInstance[currRuleName]) === false;
	});
	const errors = map_default(missingRuleNames, (currRuleName) => {
		return {
			msg: `Missing visitor method: <${currRuleName}> on ${visitorInstance.constructor.name} CST Visitor.`,
			type: CstVisitorDefinitionError.MISSING_METHOD,
			methodName: currRuleName
		};
	});
	return compact_default(errors);
}
var TreeBuilder = class {
	initTreeBuilder(config) {
		this.CST_STACK = [];
		this.outputCst = config.outputCst;
		this.nodeLocationTracking = has_default(config, "nodeLocationTracking") ? config.nodeLocationTracking : DEFAULT_PARSER_CONFIG.nodeLocationTracking;
		if (!this.outputCst) {
			this.cstInvocationStateUpdate = noop_default;
			this.cstFinallyStateUpdate = noop_default;
			this.cstPostTerminal = noop_default;
			this.cstPostNonTerminal = noop_default;
			this.cstPostRule = noop_default;
		} else if (/full/i.test(this.nodeLocationTracking)) if (this.recoveryEnabled) {
			this.setNodeLocationFromToken = setNodeLocationFull;
			this.setNodeLocationFromNode = setNodeLocationFull;
			this.cstPostRule = noop_default;
			this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
		} else {
			this.setNodeLocationFromToken = noop_default;
			this.setNodeLocationFromNode = noop_default;
			this.cstPostRule = this.cstPostRuleFull;
			this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
		}
		else if (/onlyOffset/i.test(this.nodeLocationTracking)) if (this.recoveryEnabled) {
			this.setNodeLocationFromToken = setNodeLocationOnlyOffset;
			this.setNodeLocationFromNode = setNodeLocationOnlyOffset;
			this.cstPostRule = noop_default;
			this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
		} else {
			this.setNodeLocationFromToken = noop_default;
			this.setNodeLocationFromNode = noop_default;
			this.cstPostRule = this.cstPostRuleOnlyOffset;
			this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
		}
		else if (/none/i.test(this.nodeLocationTracking)) {
			this.setNodeLocationFromToken = noop_default;
			this.setNodeLocationFromNode = noop_default;
			this.cstPostRule = noop_default;
			this.setInitialNodeLocation = noop_default;
		} else throw Error(`Invalid <nodeLocationTracking> config option: "${config.nodeLocationTracking}"`);
	}
	setInitialNodeLocationOnlyOffsetRecovery(cstNode) {
		cstNode.location = {
			startOffset: NaN,
			endOffset: NaN
		};
	}
	setInitialNodeLocationOnlyOffsetRegular(cstNode) {
		cstNode.location = {
			startOffset: this.LA(1).startOffset,
			endOffset: NaN
		};
	}
	setInitialNodeLocationFullRecovery(cstNode) {
		cstNode.location = {
			startOffset: NaN,
			startLine: NaN,
			startColumn: NaN,
			endOffset: NaN,
			endLine: NaN,
			endColumn: NaN
		};
	}
	setInitialNodeLocationFullRegular(cstNode) {
		const nextToken = this.LA(1);
		cstNode.location = {
			startOffset: nextToken.startOffset,
			startLine: nextToken.startLine,
			startColumn: nextToken.startColumn,
			endOffset: NaN,
			endLine: NaN,
			endColumn: NaN
		};
	}
	cstInvocationStateUpdate(fullRuleName) {
		const cstNode = {
			name: fullRuleName,
			children: Object.create(null)
		};
		this.setInitialNodeLocation(cstNode);
		this.CST_STACK.push(cstNode);
	}
	cstFinallyStateUpdate() {
		this.CST_STACK.pop();
	}
	cstPostRuleFull(ruleCstNode) {
		const prevToken = this.LA(0);
		const loc = ruleCstNode.location;
		if (loc.startOffset <= prevToken.startOffset === true) {
			loc.endOffset = prevToken.endOffset;
			loc.endLine = prevToken.endLine;
			loc.endColumn = prevToken.endColumn;
		} else {
			loc.startOffset = NaN;
			loc.startLine = NaN;
			loc.startColumn = NaN;
		}
	}
	cstPostRuleOnlyOffset(ruleCstNode) {
		const prevToken = this.LA(0);
		const loc = ruleCstNode.location;
		if (loc.startOffset <= prevToken.startOffset === true) loc.endOffset = prevToken.endOffset;
		else loc.startOffset = NaN;
	}
	cstPostTerminal(key, consumedToken) {
		const rootCst = this.CST_STACK[this.CST_STACK.length - 1];
		addTerminalToCst(rootCst, consumedToken, key);
		this.setNodeLocationFromToken(rootCst.location, consumedToken);
	}
	cstPostNonTerminal(ruleCstResult, ruleName) {
		const preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
		addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
		this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
	}
	getBaseCstVisitorConstructor() {
		if (isUndefined_default(this.baseCstVisitorConstructor)) {
			const newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, keys_default(this.gastProductionsCache));
			this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
			return newBaseCstVisitorConstructor;
		}
		return this.baseCstVisitorConstructor;
	}
	getBaseCstVisitorConstructorWithDefaults() {
		if (isUndefined_default(this.baseCstVisitorWithDefaultsConstructor)) {
			const newConstructor = createBaseVisitorConstructorWithDefaults(this.className, keys_default(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
			this.baseCstVisitorWithDefaultsConstructor = newConstructor;
			return newConstructor;
		}
		return this.baseCstVisitorWithDefaultsConstructor;
	}
	getLastExplicitRuleShortName() {
		const ruleStack = this.RULE_STACK;
		return ruleStack[ruleStack.length - 1];
	}
	getPreviousExplicitRuleShortName() {
		const ruleStack = this.RULE_STACK;
		return ruleStack[ruleStack.length - 2];
	}
	getLastExplicitRuleOccurrenceIndex() {
		const occurrenceStack = this.RULE_OCCURRENCE_STACK;
		return occurrenceStack[occurrenceStack.length - 1];
	}
};
var LexerAdapter = class {
	initLexerAdapter() {
		this.tokVector = [];
		this.tokVectorLength = 0;
		this.currIdx = -1;
	}
	set input(newInput) {
		if (this.selfAnalysisDone !== true) throw Error(`Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.`);
		this.reset();
		this.tokVector = newInput;
		this.tokVectorLength = newInput.length;
	}
	get input() {
		return this.tokVector;
	}
	SKIP_TOKEN() {
		if (this.currIdx <= this.tokVector.length - 2) {
			this.consumeToken();
			return this.LA(1);
		} else return END_OF_FILE;
	}
	LA(howMuch) {
		const soughtIdx = this.currIdx + howMuch;
		if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) return END_OF_FILE;
		else return this.tokVector[soughtIdx];
	}
	consumeToken() {
		this.currIdx++;
	}
	exportLexerState() {
		return this.currIdx;
	}
	importLexerState(newState$1) {
		this.currIdx = newState$1;
	}
	resetLexerState() {
		this.currIdx = -1;
	}
	moveToTerminatedState() {
		this.currIdx = this.tokVector.length - 1;
	}
	getLexerPosition() {
		return this.exportLexerState();
	}
};
var RecognizerApi = class {
	ACTION(impl) {
		return impl.call(this);
	}
	consume(idx, tokType, options) {
		return this.consumeInternal(tokType, idx, options);
	}
	subrule(idx, ruleToCall, options) {
		return this.subruleInternal(ruleToCall, idx, options);
	}
	option(idx, actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, idx);
	}
	or(idx, altsOrOpts) {
		return this.orInternal(altsOrOpts, idx);
	}
	many(idx, actionORMethodDef) {
		return this.manyInternal(idx, actionORMethodDef);
	}
	atLeastOne(idx, actionORMethodDef) {
		return this.atLeastOneInternal(idx, actionORMethodDef);
	}
	CONSUME(tokType, options) {
		return this.consumeInternal(tokType, 0, options);
	}
	CONSUME1(tokType, options) {
		return this.consumeInternal(tokType, 1, options);
	}
	CONSUME2(tokType, options) {
		return this.consumeInternal(tokType, 2, options);
	}
	CONSUME3(tokType, options) {
		return this.consumeInternal(tokType, 3, options);
	}
	CONSUME4(tokType, options) {
		return this.consumeInternal(tokType, 4, options);
	}
	CONSUME5(tokType, options) {
		return this.consumeInternal(tokType, 5, options);
	}
	CONSUME6(tokType, options) {
		return this.consumeInternal(tokType, 6, options);
	}
	CONSUME7(tokType, options) {
		return this.consumeInternal(tokType, 7, options);
	}
	CONSUME8(tokType, options) {
		return this.consumeInternal(tokType, 8, options);
	}
	CONSUME9(tokType, options) {
		return this.consumeInternal(tokType, 9, options);
	}
	SUBRULE(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 0, options);
	}
	SUBRULE1(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 1, options);
	}
	SUBRULE2(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 2, options);
	}
	SUBRULE3(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 3, options);
	}
	SUBRULE4(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 4, options);
	}
	SUBRULE5(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 5, options);
	}
	SUBRULE6(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 6, options);
	}
	SUBRULE7(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 7, options);
	}
	SUBRULE8(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 8, options);
	}
	SUBRULE9(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 9, options);
	}
	OPTION(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 0);
	}
	OPTION1(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 1);
	}
	OPTION2(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 2);
	}
	OPTION3(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 3);
	}
	OPTION4(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 4);
	}
	OPTION5(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 5);
	}
	OPTION6(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 6);
	}
	OPTION7(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 7);
	}
	OPTION8(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 8);
	}
	OPTION9(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 9);
	}
	OR(altsOrOpts) {
		return this.orInternal(altsOrOpts, 0);
	}
	OR1(altsOrOpts) {
		return this.orInternal(altsOrOpts, 1);
	}
	OR2(altsOrOpts) {
		return this.orInternal(altsOrOpts, 2);
	}
	OR3(altsOrOpts) {
		return this.orInternal(altsOrOpts, 3);
	}
	OR4(altsOrOpts) {
		return this.orInternal(altsOrOpts, 4);
	}
	OR5(altsOrOpts) {
		return this.orInternal(altsOrOpts, 5);
	}
	OR6(altsOrOpts) {
		return this.orInternal(altsOrOpts, 6);
	}
	OR7(altsOrOpts) {
		return this.orInternal(altsOrOpts, 7);
	}
	OR8(altsOrOpts) {
		return this.orInternal(altsOrOpts, 8);
	}
	OR9(altsOrOpts) {
		return this.orInternal(altsOrOpts, 9);
	}
	MANY(actionORMethodDef) {
		this.manyInternal(0, actionORMethodDef);
	}
	MANY1(actionORMethodDef) {
		this.manyInternal(1, actionORMethodDef);
	}
	MANY2(actionORMethodDef) {
		this.manyInternal(2, actionORMethodDef);
	}
	MANY3(actionORMethodDef) {
		this.manyInternal(3, actionORMethodDef);
	}
	MANY4(actionORMethodDef) {
		this.manyInternal(4, actionORMethodDef);
	}
	MANY5(actionORMethodDef) {
		this.manyInternal(5, actionORMethodDef);
	}
	MANY6(actionORMethodDef) {
		this.manyInternal(6, actionORMethodDef);
	}
	MANY7(actionORMethodDef) {
		this.manyInternal(7, actionORMethodDef);
	}
	MANY8(actionORMethodDef) {
		this.manyInternal(8, actionORMethodDef);
	}
	MANY9(actionORMethodDef) {
		this.manyInternal(9, actionORMethodDef);
	}
	MANY_SEP(options) {
		this.manySepFirstInternal(0, options);
	}
	MANY_SEP1(options) {
		this.manySepFirstInternal(1, options);
	}
	MANY_SEP2(options) {
		this.manySepFirstInternal(2, options);
	}
	MANY_SEP3(options) {
		this.manySepFirstInternal(3, options);
	}
	MANY_SEP4(options) {
		this.manySepFirstInternal(4, options);
	}
	MANY_SEP5(options) {
		this.manySepFirstInternal(5, options);
	}
	MANY_SEP6(options) {
		this.manySepFirstInternal(6, options);
	}
	MANY_SEP7(options) {
		this.manySepFirstInternal(7, options);
	}
	MANY_SEP8(options) {
		this.manySepFirstInternal(8, options);
	}
	MANY_SEP9(options) {
		this.manySepFirstInternal(9, options);
	}
	AT_LEAST_ONE(actionORMethodDef) {
		this.atLeastOneInternal(0, actionORMethodDef);
	}
	AT_LEAST_ONE1(actionORMethodDef) {
		return this.atLeastOneInternal(1, actionORMethodDef);
	}
	AT_LEAST_ONE2(actionORMethodDef) {
		this.atLeastOneInternal(2, actionORMethodDef);
	}
	AT_LEAST_ONE3(actionORMethodDef) {
		this.atLeastOneInternal(3, actionORMethodDef);
	}
	AT_LEAST_ONE4(actionORMethodDef) {
		this.atLeastOneInternal(4, actionORMethodDef);
	}
	AT_LEAST_ONE5(actionORMethodDef) {
		this.atLeastOneInternal(5, actionORMethodDef);
	}
	AT_LEAST_ONE6(actionORMethodDef) {
		this.atLeastOneInternal(6, actionORMethodDef);
	}
	AT_LEAST_ONE7(actionORMethodDef) {
		this.atLeastOneInternal(7, actionORMethodDef);
	}
	AT_LEAST_ONE8(actionORMethodDef) {
		this.atLeastOneInternal(8, actionORMethodDef);
	}
	AT_LEAST_ONE9(actionORMethodDef) {
		this.atLeastOneInternal(9, actionORMethodDef);
	}
	AT_LEAST_ONE_SEP(options) {
		this.atLeastOneSepFirstInternal(0, options);
	}
	AT_LEAST_ONE_SEP1(options) {
		this.atLeastOneSepFirstInternal(1, options);
	}
	AT_LEAST_ONE_SEP2(options) {
		this.atLeastOneSepFirstInternal(2, options);
	}
	AT_LEAST_ONE_SEP3(options) {
		this.atLeastOneSepFirstInternal(3, options);
	}
	AT_LEAST_ONE_SEP4(options) {
		this.atLeastOneSepFirstInternal(4, options);
	}
	AT_LEAST_ONE_SEP5(options) {
		this.atLeastOneSepFirstInternal(5, options);
	}
	AT_LEAST_ONE_SEP6(options) {
		this.atLeastOneSepFirstInternal(6, options);
	}
	AT_LEAST_ONE_SEP7(options) {
		this.atLeastOneSepFirstInternal(7, options);
	}
	AT_LEAST_ONE_SEP8(options) {
		this.atLeastOneSepFirstInternal(8, options);
	}
	AT_LEAST_ONE_SEP9(options) {
		this.atLeastOneSepFirstInternal(9, options);
	}
	RULE(name, implementation, config = DEFAULT_RULE_CONFIG) {
		if (includes_default(this.definedRulesNames, name)) {
			const errMsg = defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
				topLevelRule: name,
				grammarName: this.className
			});
			const error$1 = {
				message: errMsg,
				type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
				ruleName: name
			};
			this.definitionErrors.push(error$1);
		}
		this.definedRulesNames.push(name);
		const ruleImplementation = this.defineRule(name, implementation, config);
		this[name] = ruleImplementation;
		return ruleImplementation;
	}
	OVERRIDE_RULE(name, impl, config = DEFAULT_RULE_CONFIG) {
		const ruleErrors = validateRuleIsOverridden(name, this.definedRulesNames, this.className);
		this.definitionErrors = this.definitionErrors.concat(ruleErrors);
		const ruleImplementation = this.defineRule(name, impl, config);
		this[name] = ruleImplementation;
		return ruleImplementation;
	}
	BACKTRACK(grammarRule, args) {
		return function() {
			this.isBackTrackingStack.push(1);
			const orgState = this.saveRecogState();
			try {
				grammarRule.apply(this, args);
				return true;
			} catch (e) {
				if (isRecognitionException(e)) return false;
				else throw e;
			} finally {
				this.reloadRecogState(orgState);
				this.isBackTrackingStack.pop();
			}
		};
	}
	getGAstProductions() {
		return this.gastProductionsCache;
	}
	getSerializedGastProductions() {
		return serializeGrammar(values_default(this.gastProductionsCache));
	}
};
var RecognizerEngine = class {
	initRecognizerEngine(tokenVocabulary, config) {
		this.className = this.constructor.name;
		this.shortRuleNameToFull = {};
		this.fullRuleNameToShort = {};
		this.ruleShortNameIdx = 256;
		this.tokenMatcher = tokenStructuredMatcherNoCategories;
		this.subruleIdx = 0;
		this.definedRulesNames = [];
		this.tokensMap = {};
		this.isBackTrackingStack = [];
		this.RULE_STACK = [];
		this.RULE_OCCURRENCE_STACK = [];
		this.gastProductionsCache = {};
		if (has_default(config, "serializedGrammar")) throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
		if (isArray_default(tokenVocabulary)) {
			if (isEmpty_default(tokenVocabulary)) throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
			if (typeof tokenVocabulary[0].startOffset === "number") throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
		}
		if (isArray_default(tokenVocabulary)) this.tokensMap = reduce_default(tokenVocabulary, (acc, tokType) => {
			acc[tokType.name] = tokType;
			return acc;
		}, {});
		else if (has_default(tokenVocabulary, "modes") && every_default(flatten_default(values_default(tokenVocabulary.modes)), isTokenType)) {
			const allTokenTypes$1 = flatten_default(values_default(tokenVocabulary.modes));
			const uniqueTokens = uniq_default(allTokenTypes$1);
			this.tokensMap = reduce_default(uniqueTokens, (acc, tokType) => {
				acc[tokType.name] = tokType;
				return acc;
			}, {});
		} else if (isObject_default(tokenVocabulary)) this.tokensMap = clone_default(tokenVocabulary);
		else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
		this.tokensMap["EOF"] = EOF;
		const allTokenTypes = has_default(tokenVocabulary, "modes") ? flatten_default(values_default(tokenVocabulary.modes)) : values_default(tokenVocabulary);
		const noTokenCategoriesUsed = every_default(allTokenTypes, (tokenConstructor) => isEmpty_default(tokenConstructor.categoryMatches));
		this.tokenMatcher = noTokenCategoriesUsed ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
		augmentTokenTypes(values_default(this.tokensMap));
	}
	defineRule(ruleName, impl, config) {
		if (this.selfAnalysisDone) throw Error(`Grammar rule <${ruleName}> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
		const resyncEnabled = has_default(config, "resyncEnabled") ? config.resyncEnabled : DEFAULT_RULE_CONFIG.resyncEnabled;
		const recoveryValueFunc = has_default(config, "recoveryValueFunc") ? config.recoveryValueFunc : DEFAULT_RULE_CONFIG.recoveryValueFunc;
		const shortName = this.ruleShortNameIdx << BITS_FOR_METHOD_TYPE + BITS_FOR_OCCURRENCE_IDX;
		this.ruleShortNameIdx++;
		this.shortRuleNameToFull[shortName] = ruleName;
		this.fullRuleNameToShort[ruleName] = shortName;
		let invokeRuleWithTry;
		if (this.outputCst === true) invokeRuleWithTry = function invokeRuleWithTry$1(...args) {
			try {
				this.ruleInvocationStateUpdate(shortName, ruleName, this.subruleIdx);
				impl.apply(this, args);
				const cst = this.CST_STACK[this.CST_STACK.length - 1];
				this.cstPostRule(cst);
				return cst;
			} catch (e) {
				return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
			} finally {
				this.ruleFinallyStateUpdate();
			}
		};
		else invokeRuleWithTry = function invokeRuleWithTryCst(...args) {
			try {
				this.ruleInvocationStateUpdate(shortName, ruleName, this.subruleIdx);
				return impl.apply(this, args);
			} catch (e) {
				return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
			} finally {
				this.ruleFinallyStateUpdate();
			}
		};
		const wrappedGrammarRule = Object.assign(invokeRuleWithTry, {
			ruleName,
			originalGrammarAction: impl
		});
		return wrappedGrammarRule;
	}
	invokeRuleCatch(e, resyncEnabledConfig, recoveryValueFunc) {
		const isFirstInvokedRule = this.RULE_STACK.length === 1;
		const reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
		if (isRecognitionException(e)) {
			const recogError = e;
			if (reSyncEnabled) {
				const reSyncTokType = this.findReSyncTokenType();
				if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
					recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
					if (this.outputCst) {
						const partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
						partialCstResult.recoveredNode = true;
						return partialCstResult;
					} else return recoveryValueFunc(e);
				} else {
					if (this.outputCst) {
						const partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
						partialCstResult.recoveredNode = true;
						recogError.partialCstResult = partialCstResult;
					}
					throw recogError;
				}
			} else if (isFirstInvokedRule) {
				this.moveToTerminatedState();
				return recoveryValueFunc(e);
			} else throw recogError;
		} else throw e;
	}
	optionInternal(actionORMethodDef, occurrence) {
		const key = this.getKeyForAutomaticLookahead(OPTION_IDX, occurrence);
		return this.optionInternalLogic(actionORMethodDef, occurrence, key);
	}
	optionInternalLogic(actionORMethodDef, occurrence, key) {
		let lookAheadFunc = this.getLaFuncFromCache(key);
		let action;
		if (typeof actionORMethodDef !== "function") {
			action = actionORMethodDef.DEF;
			const predicate = actionORMethodDef.GATE;
			if (predicate !== void 0) {
				const orgLookaheadFunction = lookAheadFunc;
				lookAheadFunc = () => {
					return predicate.call(this) && orgLookaheadFunction.call(this);
				};
			}
		} else action = actionORMethodDef;
		if (lookAheadFunc.call(this) === true) return action.call(this);
		return void 0;
	}
	atLeastOneInternal(prodOccurrence, actionORMethodDef) {
		const laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_IDX, prodOccurrence);
		return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
	}
	atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, key) {
		let lookAheadFunc = this.getLaFuncFromCache(key);
		let action;
		if (typeof actionORMethodDef !== "function") {
			action = actionORMethodDef.DEF;
			const predicate = actionORMethodDef.GATE;
			if (predicate !== void 0) {
				const orgLookaheadFunction = lookAheadFunc;
				lookAheadFunc = () => {
					return predicate.call(this) && orgLookaheadFunction.call(this);
				};
			}
		} else action = actionORMethodDef;
		if (lookAheadFunc.call(this) === true) {
			let notStuck = this.doSingleRepetition(action);
			while (lookAheadFunc.call(this) === true && notStuck === true) notStuck = this.doSingleRepetition(action);
		} else throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
		this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, AT_LEAST_ONE_IDX, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
	}
	atLeastOneSepFirstInternal(prodOccurrence, options) {
		const laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_SEP_IDX, prodOccurrence);
		this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
	}
	atLeastOneSepFirstInternalLogic(prodOccurrence, options, key) {
		const action = options.DEF;
		const separator = options.SEP;
		const firstIterationLookaheadFunc = this.getLaFuncFromCache(key);
		if (firstIterationLookaheadFunc.call(this) === true) {
			action.call(this);
			const separatorLookAheadFunc = () => {
				return this.tokenMatcher(this.LA(1), separator);
			};
			while (this.tokenMatcher(this.LA(1), separator) === true) {
				this.CONSUME(separator);
				action.call(this);
			}
			this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
				prodOccurrence,
				separator,
				separatorLookAheadFunc,
				action,
				NextTerminalAfterAtLeastOneSepWalker
			], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
		} else throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
	}
	manyInternal(prodOccurrence, actionORMethodDef) {
		const laKey = this.getKeyForAutomaticLookahead(MANY_IDX, prodOccurrence);
		return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
	}
	manyInternalLogic(prodOccurrence, actionORMethodDef, key) {
		let lookaheadFunction = this.getLaFuncFromCache(key);
		let action;
		if (typeof actionORMethodDef !== "function") {
			action = actionORMethodDef.DEF;
			const predicate = actionORMethodDef.GATE;
			if (predicate !== void 0) {
				const orgLookaheadFunction = lookaheadFunction;
				lookaheadFunction = () => {
					return predicate.call(this) && orgLookaheadFunction.call(this);
				};
			}
		} else action = actionORMethodDef;
		let notStuck = true;
		while (lookaheadFunction.call(this) === true && notStuck === true) notStuck = this.doSingleRepetition(action);
		this.attemptInRepetitionRecovery(this.manyInternal, [prodOccurrence, actionORMethodDef], lookaheadFunction, MANY_IDX, prodOccurrence, NextTerminalAfterManyWalker, notStuck);
	}
	manySepFirstInternal(prodOccurrence, options) {
		const laKey = this.getKeyForAutomaticLookahead(MANY_SEP_IDX, prodOccurrence);
		this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
	}
	manySepFirstInternalLogic(prodOccurrence, options, key) {
		const action = options.DEF;
		const separator = options.SEP;
		const firstIterationLaFunc = this.getLaFuncFromCache(key);
		if (firstIterationLaFunc.call(this) === true) {
			action.call(this);
			const separatorLookAheadFunc = () => {
				return this.tokenMatcher(this.LA(1), separator);
			};
			while (this.tokenMatcher(this.LA(1), separator) === true) {
				this.CONSUME(separator);
				action.call(this);
			}
			this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
				prodOccurrence,
				separator,
				separatorLookAheadFunc,
				action,
				NextTerminalAfterManySepWalker
			], separatorLookAheadFunc, MANY_SEP_IDX, prodOccurrence, NextTerminalAfterManySepWalker);
		}
	}
	repetitionSepSecondInternal(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
		while (separatorLookAheadFunc()) {
			this.CONSUME(separator);
			action.call(this);
		}
		/* istanbul ignore else */
		this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
			prodOccurrence,
			separator,
			separatorLookAheadFunc,
			action,
			nextTerminalAfterWalker
		], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
	}
	doSingleRepetition(action) {
		const beforeIteration = this.getLexerPosition();
		action.call(this);
		const afterIteration = this.getLexerPosition();
		return afterIteration > beforeIteration;
	}
	orInternal(altsOrOpts, occurrence) {
		const laKey = this.getKeyForAutomaticLookahead(OR_IDX, occurrence);
		const alts = isArray_default(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
		const laFunc = this.getLaFuncFromCache(laKey);
		const altIdxToTake = laFunc.call(this, alts);
		if (altIdxToTake !== void 0) {
			const chosenAlternative = alts[altIdxToTake];
			return chosenAlternative.ALT.call(this);
		}
		this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
	}
	ruleFinallyStateUpdate() {
		this.RULE_STACK.pop();
		this.RULE_OCCURRENCE_STACK.pop();
		this.cstFinallyStateUpdate();
		if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
			const firstRedundantTok = this.LA(1);
			const errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
				firstRedundant: firstRedundantTok,
				ruleName: this.getCurrRuleFullName()
			});
			this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
		}
	}
	subruleInternal(ruleToCall, idx, options) {
		let ruleResult;
		try {
			const args = options !== void 0 ? options.ARGS : void 0;
			this.subruleIdx = idx;
			ruleResult = ruleToCall.apply(this, args);
			this.cstPostNonTerminal(ruleResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleToCall.ruleName);
			return ruleResult;
		} catch (e) {
			throw this.subruleInternalError(e, options, ruleToCall.ruleName);
		}
	}
	subruleInternalError(e, options, ruleName) {
		if (isRecognitionException(e) && e.partialCstResult !== void 0) {
			this.cstPostNonTerminal(e.partialCstResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleName);
			delete e.partialCstResult;
		}
		throw e;
	}
	consumeInternal(tokType, idx, options) {
		let consumedToken;
		try {
			const nextToken = this.LA(1);
			if (this.tokenMatcher(nextToken, tokType) === true) {
				this.consumeToken();
				consumedToken = nextToken;
			} else this.consumeInternalError(tokType, nextToken, options);
		} catch (eFromConsumption) {
			consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
		}
		this.cstPostTerminal(options !== void 0 && options.LABEL !== void 0 ? options.LABEL : tokType.name, consumedToken);
		return consumedToken;
	}
	consumeInternalError(tokType, nextToken, options) {
		let msg;
		const previousToken = this.LA(0);
		if (options !== void 0 && options.ERR_MSG) msg = options.ERR_MSG;
		else msg = this.errorMessageProvider.buildMismatchTokenMessage({
			expected: tokType,
			actual: nextToken,
			previous: previousToken,
			ruleName: this.getCurrRuleFullName()
		});
		throw this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
	}
	consumeInternalRecovery(tokType, idx, eFromConsumption) {
		if (this.recoveryEnabled && eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
			const follows = this.getFollowsForInRuleRecovery(tokType, idx);
			try {
				return this.tryInRuleRecovery(tokType, follows);
			} catch (eFromInRuleRecovery) {
				if (eFromInRuleRecovery.name === IN_RULE_RECOVERY_EXCEPTION) throw eFromConsumption;
				else throw eFromInRuleRecovery;
			}
		} else throw eFromConsumption;
	}
	saveRecogState() {
		const savedErrors = this.errors;
		const savedRuleStack = clone_default(this.RULE_STACK);
		return {
			errors: savedErrors,
			lexerState: this.exportLexerState(),
			RULE_STACK: savedRuleStack,
			CST_STACK: this.CST_STACK
		};
	}
	reloadRecogState(newState$1) {
		this.errors = newState$1.errors;
		this.importLexerState(newState$1.lexerState);
		this.RULE_STACK = newState$1.RULE_STACK;
	}
	ruleInvocationStateUpdate(shortName, fullName, idxInCallingRule) {
		this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
		this.RULE_STACK.push(shortName);
		this.cstInvocationStateUpdate(fullName);
	}
	isBackTracking() {
		return this.isBackTrackingStack.length !== 0;
	}
	getCurrRuleFullName() {
		const shortName = this.getLastExplicitRuleShortName();
		return this.shortRuleNameToFull[shortName];
	}
	shortRuleNameToFullName(shortName) {
		return this.shortRuleNameToFull[shortName];
	}
	isAtEndOfInput() {
		return this.tokenMatcher(this.LA(1), EOF);
	}
	reset() {
		this.resetLexerState();
		this.subruleIdx = 0;
		this.isBackTrackingStack = [];
		this.errors = [];
		this.RULE_STACK = [];
		this.CST_STACK = [];
		this.RULE_OCCURRENCE_STACK = [];
	}
};
var ErrorHandler = class {
	initErrorHandler(config) {
		this._errors = [];
		this.errorMessageProvider = has_default(config, "errorMessageProvider") ? config.errorMessageProvider : DEFAULT_PARSER_CONFIG.errorMessageProvider;
	}
	SAVE_ERROR(error$1) {
		if (isRecognitionException(error$1)) {
			error$1.context = {
				ruleStack: this.getHumanReadableRuleStack(),
				ruleOccurrenceStack: clone_default(this.RULE_OCCURRENCE_STACK)
			};
			this._errors.push(error$1);
			return error$1;
		} else throw Error("Trying to save an Error which is not a RecognitionException");
	}
	get errors() {
		return clone_default(this._errors);
	}
	set errors(newErrors) {
		this._errors = newErrors;
	}
	raiseEarlyExitException(occurrence, prodType, userDefinedErrMsg) {
		const ruleName = this.getCurrRuleFullName();
		const ruleGrammar = this.getGAstProductions()[ruleName];
		const lookAheadPathsPerAlternative = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
		const insideProdPaths = lookAheadPathsPerAlternative[0];
		const actualTokens = [];
		for (let i = 1; i <= this.maxLookahead; i++) actualTokens.push(this.LA(i));
		const msg = this.errorMessageProvider.buildEarlyExitMessage({
			expectedIterationPaths: insideProdPaths,
			actual: actualTokens,
			previous: this.LA(0),
			customUserDescription: userDefinedErrMsg,
			ruleName
		});
		throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
	}
	raiseNoAltException(occurrence, errMsgTypes) {
		const ruleName = this.getCurrRuleFullName();
		const ruleGrammar = this.getGAstProductions()[ruleName];
		const lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
		const actualTokens = [];
		for (let i = 1; i <= this.maxLookahead; i++) actualTokens.push(this.LA(i));
		const previousToken = this.LA(0);
		const errMsg = this.errorMessageProvider.buildNoViableAltMessage({
			expectedPathsPerAlt: lookAheadPathsPerAlternative,
			actual: actualTokens,
			previous: previousToken,
			customUserDescription: errMsgTypes,
			ruleName: this.getCurrRuleFullName()
		});
		throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
	}
};
var ContentAssist = class {
	initContentAssist() {}
	computeContentAssist(startRuleName, precedingInput) {
		const startRuleGast = this.gastProductionsCache[startRuleName];
		if (isUndefined_default(startRuleGast)) throw Error(`Rule ->${startRuleName}<- does not exist in this grammar.`);
		return nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
	}
	getNextPossibleTokenTypes(grammarPath) {
		const topRuleName = head_default(grammarPath.ruleStack);
		const gastProductions = this.getGAstProductions();
		const topProduction = gastProductions[topRuleName];
		const nextPossibleTokenTypes = new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
		return nextPossibleTokenTypes;
	}
};
const RECORDING_NULL_OBJECT = { description: "This Object indicates the Parser is during Recording Phase" };
Object.freeze(RECORDING_NULL_OBJECT);
const HANDLE_SEPARATOR = true;
const MAX_METHOD_IDX = Math.pow(2, BITS_FOR_OCCURRENCE_IDX) - 1;
const RFT = createToken({
	name: "RECORDING_PHASE_TOKEN",
	pattern: Lexer.NA
});
augmentTokenTypes([RFT]);
const RECORDING_PHASE_TOKEN = createTokenInstance(RFT, "This IToken indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details", -1, -1, -1, -1, -1, -1);
Object.freeze(RECORDING_PHASE_TOKEN);
const RECORDING_PHASE_CSTNODE = {
	name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
	children: {}
};
var GastRecorder = class {
	initGastRecorder(config) {
		this.recordingProdStack = [];
		this.RECORDING_PHASE = false;
	}
	enableRecording() {
		this.RECORDING_PHASE = true;
		this.TRACE_INIT("Enable Recording", () => {
			for (let i = 0; i < 10; i++) {
				const idx = i > 0 ? i : "";
				this[`CONSUME${idx}`] = function(arg1, arg2) {
					return this.consumeInternalRecord(arg1, i, arg2);
				};
				this[`SUBRULE${idx}`] = function(arg1, arg2) {
					return this.subruleInternalRecord(arg1, i, arg2);
				};
				this[`OPTION${idx}`] = function(arg1) {
					return this.optionInternalRecord(arg1, i);
				};
				this[`OR${idx}`] = function(arg1) {
					return this.orInternalRecord(arg1, i);
				};
				this[`MANY${idx}`] = function(arg1) {
					this.manyInternalRecord(i, arg1);
				};
				this[`MANY_SEP${idx}`] = function(arg1) {
					this.manySepFirstInternalRecord(i, arg1);
				};
				this[`AT_LEAST_ONE${idx}`] = function(arg1) {
					this.atLeastOneInternalRecord(i, arg1);
				};
				this[`AT_LEAST_ONE_SEP${idx}`] = function(arg1) {
					this.atLeastOneSepFirstInternalRecord(i, arg1);
				};
			}
			this[`consume`] = function(idx, arg1, arg2) {
				return this.consumeInternalRecord(arg1, idx, arg2);
			};
			this[`subrule`] = function(idx, arg1, arg2) {
				return this.subruleInternalRecord(arg1, idx, arg2);
			};
			this[`option`] = function(idx, arg1) {
				return this.optionInternalRecord(arg1, idx);
			};
			this[`or`] = function(idx, arg1) {
				return this.orInternalRecord(arg1, idx);
			};
			this[`many`] = function(idx, arg1) {
				this.manyInternalRecord(idx, arg1);
			};
			this[`atLeastOne`] = function(idx, arg1) {
				this.atLeastOneInternalRecord(idx, arg1);
			};
			this.ACTION = this.ACTION_RECORD;
			this.BACKTRACK = this.BACKTRACK_RECORD;
			this.LA = this.LA_RECORD;
		});
	}
	disableRecording() {
		this.RECORDING_PHASE = false;
		this.TRACE_INIT("Deleting Recording methods", () => {
			const that = this;
			for (let i = 0; i < 10; i++) {
				const idx = i > 0 ? i : "";
				delete that[`CONSUME${idx}`];
				delete that[`SUBRULE${idx}`];
				delete that[`OPTION${idx}`];
				delete that[`OR${idx}`];
				delete that[`MANY${idx}`];
				delete that[`MANY_SEP${idx}`];
				delete that[`AT_LEAST_ONE${idx}`];
				delete that[`AT_LEAST_ONE_SEP${idx}`];
			}
			delete that[`consume`];
			delete that[`subrule`];
			delete that[`option`];
			delete that[`or`];
			delete that[`many`];
			delete that[`atLeastOne`];
			delete that.ACTION;
			delete that.BACKTRACK;
			delete that.LA;
		});
	}
	ACTION_RECORD(impl) {}
	BACKTRACK_RECORD(grammarRule, args) {
		return () => true;
	}
	LA_RECORD(howMuch) {
		return END_OF_FILE;
	}
	topLevelRuleRecord(name, def) {
		try {
			const newTopLevelRule = new Rule({
				definition: [],
				name
			});
			newTopLevelRule.name = name;
			this.recordingProdStack.push(newTopLevelRule);
			def.call(this);
			this.recordingProdStack.pop();
			return newTopLevelRule;
		} catch (originalError) {
			if (originalError.KNOWN_RECORDER_ERROR !== true) try {
				originalError.message = originalError.message + "\n	 This error was thrown during the \"grammar recording phase\" For more info see:\n	https://chevrotain.io/docs/guide/internals.html#grammar-recording";
			} catch (mutabilityError) {
				throw originalError;
			}
			throw originalError;
		}
	}
	optionInternalRecord(actionORMethodDef, occurrence) {
		return recordProd.call(this, Option$1, actionORMethodDef, occurrence);
	}
	atLeastOneInternalRecord(occurrence, actionORMethodDef) {
		recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
	}
	atLeastOneSepFirstInternalRecord(occurrence, options) {
		recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
	}
	manyInternalRecord(occurrence, actionORMethodDef) {
		recordProd.call(this, Repetition, actionORMethodDef, occurrence);
	}
	manySepFirstInternalRecord(occurrence, options) {
		recordProd.call(this, RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
	}
	orInternalRecord(altsOrOpts, occurrence) {
		return recordOrProd.call(this, altsOrOpts, occurrence);
	}
	subruleInternalRecord(ruleToCall, occurrence, options) {
		assertMethodIdxIsValid(occurrence);
		if (!ruleToCall || has_default(ruleToCall, "ruleName") === false) {
			const error$1 = /* @__PURE__ */ new Error(`<SUBRULE${getIdxSuffix(occurrence)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(ruleToCall)}>\n inside top level rule: <${this.recordingProdStack[0].name}>`);
			error$1.KNOWN_RECORDER_ERROR = true;
			throw error$1;
		}
		const prevProd = last_default(this.recordingProdStack);
		const ruleName = ruleToCall.ruleName;
		const newNoneTerminal = new NonTerminal({
			idx: occurrence,
			nonTerminalName: ruleName,
			label: options === null || options === void 0 ? void 0 : options.LABEL,
			referencedRule: void 0
		});
		prevProd.definition.push(newNoneTerminal);
		return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
	}
	consumeInternalRecord(tokType, occurrence, options) {
		assertMethodIdxIsValid(occurrence);
		if (!hasShortKeyProperty(tokType)) {
			const error$1 = /* @__PURE__ */ new Error(`<CONSUME${getIdxSuffix(occurrence)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(tokType)}>\n inside top level rule: <${this.recordingProdStack[0].name}>`);
			error$1.KNOWN_RECORDER_ERROR = true;
			throw error$1;
		}
		const prevProd = last_default(this.recordingProdStack);
		const newNoneTerminal = new Terminal({
			idx: occurrence,
			terminalType: tokType,
			label: options === null || options === void 0 ? void 0 : options.LABEL
		});
		prevProd.definition.push(newNoneTerminal);
		return RECORDING_PHASE_TOKEN;
	}
};
function recordProd(prodConstructor, mainProdArg, occurrence, handleSep = false) {
	assertMethodIdxIsValid(occurrence);
	const prevProd = last_default(this.recordingProdStack);
	const grammarAction = isFunction_default(mainProdArg) ? mainProdArg : mainProdArg.DEF;
	const newProd = new prodConstructor({
		definition: [],
		idx: occurrence
	});
	if (handleSep) newProd.separator = mainProdArg.SEP;
	if (has_default(mainProdArg, "MAX_LOOKAHEAD")) newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
	this.recordingProdStack.push(newProd);
	grammarAction.call(this);
	prevProd.definition.push(newProd);
	this.recordingProdStack.pop();
	return RECORDING_NULL_OBJECT;
}
function recordOrProd(mainProdArg, occurrence) {
	assertMethodIdxIsValid(occurrence);
	const prevProd = last_default(this.recordingProdStack);
	const hasOptions = isArray_default(mainProdArg) === false;
	const alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
	const newOrProd = new Alternation({
		definition: [],
		idx: occurrence,
		ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
	});
	if (has_default(mainProdArg, "MAX_LOOKAHEAD")) newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
	const hasPredicates = some_default(alts, (currAlt) => isFunction_default(currAlt.GATE));
	newOrProd.hasPredicates = hasPredicates;
	prevProd.definition.push(newOrProd);
	forEach_default(alts, (currAlt) => {
		const currAltFlat = new Alternative({ definition: [] });
		newOrProd.definition.push(currAltFlat);
		if (has_default(currAlt, "IGNORE_AMBIGUITIES")) currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
		else if (has_default(currAlt, "GATE")) currAltFlat.ignoreAmbiguities = true;
		this.recordingProdStack.push(currAltFlat);
		currAlt.ALT.call(this);
		this.recordingProdStack.pop();
	});
	return RECORDING_NULL_OBJECT;
}
function getIdxSuffix(idx) {
	return idx === 0 ? "" : `${idx}`;
}
function assertMethodIdxIsValid(idx) {
	if (idx < 0 || idx > MAX_METHOD_IDX) {
		const error$1 = /* @__PURE__ */ new Error(`Invalid DSL Method idx value: <${idx}>\n\tIdx value must be a none negative value smaller than ${MAX_METHOD_IDX + 1}`);
		error$1.KNOWN_RECORDER_ERROR = true;
		throw error$1;
	}
}
var PerformanceTracer = class {
	initPerformanceTracer(config) {
		if (has_default(config, "traceInitPerf")) {
			const userTraceInitPerf = config.traceInitPerf;
			const traceIsNumber = typeof userTraceInitPerf === "number";
			this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
			this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
		} else {
			this.traceInitMaxIdent = 0;
			this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
		}
		this.traceInitIndent = -1;
	}
	TRACE_INIT(phaseDesc, phaseImpl) {
		if (this.traceInitPerf === true) {
			this.traceInitIndent++;
			const indent = new Array(this.traceInitIndent + 1).join("	");
			if (this.traceInitIndent < this.traceInitMaxIdent) console.log(`${indent}--> <${phaseDesc}>`);
			const { time, value } = timer(phaseImpl);
			/* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */
			const traceMethod = time > 10 ? console.warn : console.log;
			if (this.traceInitIndent < this.traceInitMaxIdent) traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
			this.traceInitIndent--;
			return value;
		} else return phaseImpl();
	}
};
function applyMixins(derivedCtor, baseCtors) {
	baseCtors.forEach((baseCtor) => {
		const baseProto = baseCtor.prototype;
		Object.getOwnPropertyNames(baseProto).forEach((propName) => {
			if (propName === "constructor") return;
			const basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
			if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
			else derivedCtor.prototype[propName] = baseCtor.prototype[propName];
		});
	});
}
const END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(END_OF_FILE);
const DEFAULT_PARSER_CONFIG = Object.freeze({
	recoveryEnabled: false,
	maxLookahead: 3,
	dynamicTokensEnabled: false,
	outputCst: true,
	errorMessageProvider: defaultParserErrorProvider,
	nodeLocationTracking: "none",
	traceInitPerf: false,
	skipValidations: false
});
const DEFAULT_RULE_CONFIG = Object.freeze({
	recoveryValueFunc: () => void 0,
	resyncEnabled: true
});
var ParserDefinitionErrorType;
(function(ParserDefinitionErrorType$1) {
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
	ParserDefinitionErrorType$1[ParserDefinitionErrorType$1["CUSTOM_LOOKAHEAD_VALIDATION"] = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));
function EMPTY_ALT(value = void 0) {
	return function() {
		return value;
	};
}
var Parser = class Parser {
	static performSelfAnalysis(parserInstance) {
		throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
	}
	performSelfAnalysis() {
		this.TRACE_INIT("performSelfAnalysis", () => {
			let defErrorsMsgs;
			this.selfAnalysisDone = true;
			const className = this.className;
			this.TRACE_INIT("toFastProps", () => {
				toFastProperties(this);
			});
			this.TRACE_INIT("Grammar Recording", () => {
				try {
					this.enableRecording();
					forEach_default(this.definedRulesNames, (currRuleName) => {
						const wrappedRule = this[currRuleName];
						const originalGrammarAction = wrappedRule["originalGrammarAction"];
						let recordedRuleGast;
						this.TRACE_INIT(`${currRuleName} Rule`, () => {
							recordedRuleGast = this.topLevelRuleRecord(currRuleName, originalGrammarAction);
						});
						this.gastProductionsCache[currRuleName] = recordedRuleGast;
					});
				} finally {
					this.disableRecording();
				}
			});
			let resolverErrors = [];
			this.TRACE_INIT("Grammar Resolving", () => {
				resolverErrors = resolveGrammar({ rules: values_default(this.gastProductionsCache) });
				this.definitionErrors = this.definitionErrors.concat(resolverErrors);
			});
			this.TRACE_INIT("Grammar Validations", () => {
				if (isEmpty_default(resolverErrors) && this.skipValidations === false) {
					const validationErrors = validateGrammar({
						rules: values_default(this.gastProductionsCache),
						tokenTypes: values_default(this.tokensMap),
						errMsgProvider: defaultGrammarValidatorErrorProvider,
						grammarName: className
					});
					const lookaheadValidationErrors = validateLookahead({
						lookaheadStrategy: this.lookaheadStrategy,
						rules: values_default(this.gastProductionsCache),
						tokenTypes: values_default(this.tokensMap),
						grammarName: className
					});
					this.definitionErrors = this.definitionErrors.concat(validationErrors, lookaheadValidationErrors);
				}
			});
			if (isEmpty_default(this.definitionErrors)) {
				if (this.recoveryEnabled) this.TRACE_INIT("computeAllProdsFollows", () => {
					const allFollows = computeAllProdsFollows(values_default(this.gastProductionsCache));
					this.resyncFollows = allFollows;
				});
				this.TRACE_INIT("ComputeLookaheadFunctions", () => {
					var _a, _b;
					(_b = (_a = this.lookaheadStrategy).initialize) === null || _b === void 0 || _b.call(_a, { rules: values_default(this.gastProductionsCache) });
					this.preComputeLookaheadFunctions(values_default(this.gastProductionsCache));
				});
			}
			if (!Parser.DEFER_DEFINITION_ERRORS_HANDLING && !isEmpty_default(this.definitionErrors)) {
				defErrorsMsgs = map_default(this.definitionErrors, (defError) => defError.message);
				throw new Error(`Parser Definition Errors detected:\n ${defErrorsMsgs.join("\n-------------------------------\n")}`);
			}
		});
	}
	constructor(tokenVocabulary, config) {
		this.definitionErrors = [];
		this.selfAnalysisDone = false;
		const that = this;
		that.initErrorHandler(config);
		that.initLexerAdapter();
		that.initLooksAhead(config);
		that.initRecognizerEngine(tokenVocabulary, config);
		that.initRecoverable(config);
		that.initTreeBuilder(config);
		that.initContentAssist();
		that.initGastRecorder(config);
		that.initPerformanceTracer(config);
		if (has_default(config, "ignoredIssues")) throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
		this.skipValidations = has_default(config, "skipValidations") ? config.skipValidations : DEFAULT_PARSER_CONFIG.skipValidations;
	}
};
Parser.DEFER_DEFINITION_ERRORS_HANDLING = false;
applyMixins(Parser, [
	Recoverable,
	LooksAhead,
	TreeBuilder,
	LexerAdapter,
	RecognizerEngine,
	RecognizerApi,
	ErrorHandler,
	ContentAssist,
	GastRecorder,
	PerformanceTracer
]);
var EmbeddedActionsParser = class extends Parser {
	constructor(tokenVocabulary, config = DEFAULT_PARSER_CONFIG) {
		const configClone = clone_default(config);
		configClone.outputCst = false;
		super(tokenVocabulary, configClone);
	}
};
function buildATNKey(rule, type, occurrence) {
	return `${rule.name}_${type}_${occurrence}`;
}
const ATN_BASIC = 1;
const ATN_RULE_START = 2;
const ATN_PLUS_BLOCK_START = 4;
const ATN_STAR_BLOCK_START = 5;
const ATN_RULE_STOP = 7;
const ATN_BLOCK_END = 8;
const ATN_STAR_LOOP_BACK = 9;
const ATN_STAR_LOOP_ENTRY = 10;
const ATN_PLUS_LOOP_BACK = 11;
const ATN_LOOP_END = 12;
var AbstractTransition = class {
	constructor(target) {
		this.target = target;
	}
	isEpsilon() {
		return false;
	}
};
var AtomTransition = class extends AbstractTransition {
	constructor(target, tokenType) {
		super(target);
		this.tokenType = tokenType;
	}
};
var EpsilonTransition = class extends AbstractTransition {
	constructor(target) {
		super(target);
	}
	isEpsilon() {
		return true;
	}
};
var RuleTransition = class extends AbstractTransition {
	constructor(ruleStart, rule, followState) {
		super(ruleStart);
		this.rule = rule;
		this.followState = followState;
	}
	isEpsilon() {
		return true;
	}
};
function createATN(rules) {
	const atn = {
		decisionMap: {},
		decisionStates: [],
		ruleToStartState: /* @__PURE__ */ new Map(),
		ruleToStopState: /* @__PURE__ */ new Map(),
		states: []
	};
	createRuleStartAndStopATNStates(atn, rules);
	const ruleLength = rules.length;
	for (let i = 0; i < ruleLength; i++) {
		const rule = rules[i];
		const ruleBlock = block(atn, rule, rule);
		if (ruleBlock === void 0) continue;
		buildRuleHandle(atn, rule, ruleBlock);
	}
	return atn;
}
function createRuleStartAndStopATNStates(atn, rules) {
	const ruleLength = rules.length;
	for (let i = 0; i < ruleLength; i++) {
		const rule = rules[i];
		const start = newState(atn, rule, void 0, { type: ATN_RULE_START });
		const stop = newState(atn, rule, void 0, { type: ATN_RULE_STOP });
		start.stop = stop;
		atn.ruleToStartState.set(rule, start);
		atn.ruleToStopState.set(rule, stop);
	}
}
function atom(atn, rule, production) {
	if (production instanceof Terminal) return tokenRef(atn, rule, production.terminalType, production);
	else if (production instanceof NonTerminal) return ruleRef(atn, rule, production);
	else if (production instanceof Alternation) return alternation(atn, rule, production);
	else if (production instanceof Option$1) return option(atn, rule, production);
	else if (production instanceof Repetition) return repetition(atn, rule, production);
	else if (production instanceof RepetitionWithSeparator) return repetitionSep(atn, rule, production);
	else if (production instanceof RepetitionMandatory) return repetitionMandatory(atn, rule, production);
	else if (production instanceof RepetitionMandatoryWithSeparator) return repetitionMandatorySep(atn, rule, production);
	else return block(atn, rule, production);
}
function repetition(atn, rule, repetition$1) {
	const starState = newState(atn, rule, repetition$1, { type: ATN_STAR_BLOCK_START });
	defineDecisionState(atn, starState);
	const handle = makeAlts(atn, rule, starState, repetition$1, block(atn, rule, repetition$1));
	return star(atn, rule, repetition$1, handle);
}
function repetitionSep(atn, rule, repetition$1) {
	const starState = newState(atn, rule, repetition$1, { type: ATN_STAR_BLOCK_START });
	defineDecisionState(atn, starState);
	const handle = makeAlts(atn, rule, starState, repetition$1, block(atn, rule, repetition$1));
	const sep = tokenRef(atn, rule, repetition$1.separator, repetition$1);
	return star(atn, rule, repetition$1, handle, sep);
}
function repetitionMandatory(atn, rule, repetition$1) {
	const plusState = newState(atn, rule, repetition$1, { type: ATN_PLUS_BLOCK_START });
	defineDecisionState(atn, plusState);
	const handle = makeAlts(atn, rule, plusState, repetition$1, block(atn, rule, repetition$1));
	return plus(atn, rule, repetition$1, handle);
}
function repetitionMandatorySep(atn, rule, repetition$1) {
	const plusState = newState(atn, rule, repetition$1, { type: ATN_PLUS_BLOCK_START });
	defineDecisionState(atn, plusState);
	const handle = makeAlts(atn, rule, plusState, repetition$1, block(atn, rule, repetition$1));
	const sep = tokenRef(atn, rule, repetition$1.separator, repetition$1);
	return plus(atn, rule, repetition$1, handle, sep);
}
function alternation(atn, rule, alternation$1) {
	const start = newState(atn, rule, alternation$1, { type: ATN_BASIC });
	defineDecisionState(atn, start);
	const alts = map_default(alternation$1.definition, (e) => atom(atn, rule, e));
	const handle = makeAlts(atn, rule, start, alternation$1, ...alts);
	return handle;
}
function option(atn, rule, option$1) {
	const start = newState(atn, rule, option$1, { type: ATN_BASIC });
	defineDecisionState(atn, start);
	const handle = makeAlts(atn, rule, start, option$1, block(atn, rule, option$1));
	return optional(atn, rule, option$1, handle);
}
function block(atn, rule, block$1) {
	const handles = filter_default(map_default(block$1.definition, (e) => atom(atn, rule, e)), (e) => e !== void 0);
	if (handles.length === 1) return handles[0];
	else if (handles.length === 0) return void 0;
	else return makeBlock(atn, handles);
}
function plus(atn, rule, plus$1, handle, sep) {
	const blkStart = handle.left;
	const blkEnd = handle.right;
	const loop = newState(atn, rule, plus$1, { type: ATN_PLUS_LOOP_BACK });
	defineDecisionState(atn, loop);
	const end = newState(atn, rule, plus$1, { type: ATN_LOOP_END });
	blkStart.loopback = loop;
	end.loopback = loop;
	atn.decisionMap[buildATNKey(rule, sep ? "RepetitionMandatoryWithSeparator" : "RepetitionMandatory", plus$1.idx)] = loop;
	epsilon(blkEnd, loop);
	if (sep === void 0) {
		epsilon(loop, blkStart);
		epsilon(loop, end);
	} else {
		epsilon(loop, end);
		epsilon(loop, sep.left);
		epsilon(sep.right, blkStart);
	}
	return {
		left: blkStart,
		right: end
	};
}
function star(atn, rule, star$1, handle, sep) {
	const start = handle.left;
	const end = handle.right;
	const entry = newState(atn, rule, star$1, { type: ATN_STAR_LOOP_ENTRY });
	defineDecisionState(atn, entry);
	const loopEnd = newState(atn, rule, star$1, { type: ATN_LOOP_END });
	const loop = newState(atn, rule, star$1, { type: ATN_STAR_LOOP_BACK });
	entry.loopback = loop;
	loopEnd.loopback = loop;
	epsilon(entry, start);
	epsilon(entry, loopEnd);
	epsilon(end, loop);
	if (sep !== void 0) {
		epsilon(loop, loopEnd);
		epsilon(loop, sep.left);
		epsilon(sep.right, start);
	} else epsilon(loop, entry);
	atn.decisionMap[buildATNKey(rule, sep ? "RepetitionWithSeparator" : "Repetition", star$1.idx)] = entry;
	return {
		left: entry,
		right: loopEnd
	};
}
function optional(atn, rule, optional$1, handle) {
	const start = handle.left;
	const end = handle.right;
	epsilon(start, end);
	atn.decisionMap[buildATNKey(rule, "Option", optional$1.idx)] = start;
	return handle;
}
function defineDecisionState(atn, state) {
	atn.decisionStates.push(state);
	state.decision = atn.decisionStates.length - 1;
	return state.decision;
}
function makeAlts(atn, rule, start, production, ...alts) {
	const end = newState(atn, rule, production, {
		type: ATN_BLOCK_END,
		start
	});
	start.end = end;
	for (const alt of alts) if (alt !== void 0) {
		epsilon(start, alt.left);
		epsilon(alt.right, end);
	} else epsilon(start, end);
	const handle = {
		left: start,
		right: end
	};
	atn.decisionMap[buildATNKey(rule, getProdType(production), production.idx)] = start;
	return handle;
}
function getProdType(production) {
	if (production instanceof Alternation) return "Alternation";
	else if (production instanceof Option$1) return "Option";
	else if (production instanceof Repetition) return "Repetition";
	else if (production instanceof RepetitionWithSeparator) return "RepetitionWithSeparator";
	else if (production instanceof RepetitionMandatory) return "RepetitionMandatory";
	else if (production instanceof RepetitionMandatoryWithSeparator) return "RepetitionMandatoryWithSeparator";
	else throw new Error("Invalid production type encountered");
}
function makeBlock(atn, alts) {
	const altsLength = alts.length;
	for (let i = 0; i < altsLength - 1; i++) {
		const handle = alts[i];
		let transition;
		if (handle.left.transitions.length === 1) transition = handle.left.transitions[0];
		const isRuleTransition = transition instanceof RuleTransition;
		const ruleTransition = transition;
		const next = alts[i + 1].left;
		if (handle.left.type === ATN_BASIC && handle.right.type === ATN_BASIC && transition !== void 0 && (isRuleTransition && ruleTransition.followState === handle.right || transition.target === handle.right)) {
			if (isRuleTransition) ruleTransition.followState = next;
			else transition.target = next;
			removeState(atn, handle.right);
		} else epsilon(handle.right, next);
	}
	const first$1 = alts[0];
	const last = alts[altsLength - 1];
	return {
		left: first$1.left,
		right: last.right
	};
}
function tokenRef(atn, rule, tokenType, production) {
	const left = newState(atn, rule, production, { type: ATN_BASIC });
	const right = newState(atn, rule, production, { type: ATN_BASIC });
	addTransition(left, new AtomTransition(right, tokenType));
	return {
		left,
		right
	};
}
function ruleRef(atn, currentRule, nonTerminal) {
	const rule = nonTerminal.referencedRule;
	const start = atn.ruleToStartState.get(rule);
	const left = newState(atn, currentRule, nonTerminal, { type: ATN_BASIC });
	const right = newState(atn, currentRule, nonTerminal, { type: ATN_BASIC });
	const call = new RuleTransition(start, rule, right);
	addTransition(left, call);
	return {
		left,
		right
	};
}
function buildRuleHandle(atn, rule, block$1) {
	const start = atn.ruleToStartState.get(rule);
	epsilon(start, block$1.left);
	const stop = atn.ruleToStopState.get(rule);
	epsilon(block$1.right, stop);
	const handle = {
		left: start,
		right: stop
	};
	return handle;
}
function epsilon(a, b) {
	const transition = new EpsilonTransition(b);
	addTransition(a, transition);
}
function newState(atn, rule, production, partial) {
	const t = Object.assign({
		atn,
		production,
		epsilonOnlyTransitions: false,
		rule,
		transitions: [],
		nextTokenWithinRule: [],
		stateNumber: atn.states.length
	}, partial);
	atn.states.push(t);
	return t;
}
function addTransition(state, transition) {
	if (state.transitions.length === 0) state.epsilonOnlyTransitions = transition.isEpsilon();
	state.transitions.push(transition);
}
function removeState(atn, state) {
	atn.states.splice(atn.states.indexOf(state), 1);
}
const DFA_ERROR = {};
var ATNConfigSet = class {
	constructor() {
		this.map = {};
		this.configs = [];
	}
	get size() {
		return this.configs.length;
	}
	finalize() {
		this.map = {};
	}
	add(config) {
		const key = getATNConfigKey(config);
		if (!(key in this.map)) {
			this.map[key] = this.configs.length;
			this.configs.push(config);
		}
	}
	get elements() {
		return this.configs;
	}
	get alts() {
		return map_default(this.configs, (e) => e.alt);
	}
	get key() {
		let value = "";
		for (const k in this.map) value += k + ":";
		return value;
	}
};
function getATNConfigKey(config, alt = true) {
	return `${alt ? `a${config.alt}` : ""}s${config.state.stateNumber}:${config.stack.map((e) => e.stateNumber.toString()).join("_")}`;
}
function createDFACache(startState, decision) {
	const map = {};
	return (predicateSet) => {
		const key = predicateSet.toString();
		let existing = map[key];
		if (existing !== void 0) return existing;
		else {
			existing = {
				atnStartState: startState,
				decision,
				states: {}
			};
			map[key] = existing;
			return existing;
		}
	};
}
var PredicateSet = class {
	constructor() {
		this.predicates = [];
	}
	is(index) {
		return index >= this.predicates.length || this.predicates[index];
	}
	set(index, value) {
		this.predicates[index] = value;
	}
	toString() {
		let value = "";
		const size = this.predicates.length;
		for (let i = 0; i < size; i++) value += this.predicates[i] === true ? "1" : "0";
		return value;
	}
};
const EMPTY_PREDICATES = new PredicateSet();
var LLStarLookaheadStrategy = class extends LLkLookaheadStrategy {
	constructor(options) {
		var _a;
		super();
		this.logging = (_a = options === null || options === void 0 ? void 0 : options.logging) !== null && _a !== void 0 ? _a : ((message) => console.log(message));
	}
	initialize(options) {
		this.atn = createATN(options.rules);
		this.dfas = initATNSimulator(this.atn);
	}
	validateAmbiguousAlternationAlternatives() {
		return [];
	}
	validateEmptyOrAlternatives() {
		return [];
	}
	buildLookaheadForAlternation(options) {
		const { prodOccurrence, rule, hasPredicates, dynamicTokensEnabled } = options;
		const dfas = this.dfas;
		const logging = this.logging;
		const key = buildATNKey(rule, "Alternation", prodOccurrence);
		const decisionState = this.atn.decisionMap[key];
		const decisionIndex = decisionState.decision;
		const partialAlts = map_default(getLookaheadPaths({
			maxLookahead: 1,
			occurrence: prodOccurrence,
			prodType: "Alternation",
			rule
		}), (currAlt) => map_default(currAlt, (path) => path[0]));
		if (isLL1Sequence(partialAlts, false) && !dynamicTokensEnabled) {
			const choiceToAlt = reduce_default(partialAlts, (result, currAlt, idx) => {
				forEach_default(currAlt, (currTokType) => {
					if (currTokType) {
						result[currTokType.tokenTypeIdx] = idx;
						forEach_default(currTokType.categoryMatches, (currExtendingType) => {
							result[currExtendingType] = idx;
						});
					}
				});
				return result;
			}, {});
			if (hasPredicates) return function(orAlts) {
				var _a;
				const nextToken = this.LA(1);
				const prediction = choiceToAlt[nextToken.tokenTypeIdx];
				if (orAlts !== void 0 && prediction !== void 0) {
					const gate = (_a = orAlts[prediction]) === null || _a === void 0 ? void 0 : _a.GATE;
					if (gate !== void 0 && gate.call(this) === false) return void 0;
				}
				return prediction;
			};
			else return function() {
				const nextToken = this.LA(1);
				return choiceToAlt[nextToken.tokenTypeIdx];
			};
		} else if (hasPredicates) return function(orAlts) {
			const predicates = new PredicateSet();
			const length = orAlts === void 0 ? 0 : orAlts.length;
			for (let i = 0; i < length; i++) {
				const gate = orAlts === null || orAlts === void 0 ? void 0 : orAlts[i].GATE;
				predicates.set(i, gate === void 0 || gate.call(this));
			}
			const result = adaptivePredict.call(this, dfas, decisionIndex, predicates, logging);
			return typeof result === "number" ? result : void 0;
		};
		else return function() {
			const result = adaptivePredict.call(this, dfas, decisionIndex, EMPTY_PREDICATES, logging);
			return typeof result === "number" ? result : void 0;
		};
	}
	buildLookaheadForOptional(options) {
		const { prodOccurrence, rule, prodType, dynamicTokensEnabled } = options;
		const dfas = this.dfas;
		const logging = this.logging;
		const key = buildATNKey(rule, prodType, prodOccurrence);
		const decisionState = this.atn.decisionMap[key];
		const decisionIndex = decisionState.decision;
		const alts = map_default(getLookaheadPaths({
			maxLookahead: 1,
			occurrence: prodOccurrence,
			prodType,
			rule
		}), (e) => {
			return map_default(e, (g) => g[0]);
		});
		if (isLL1Sequence(alts) && alts[0][0] && !dynamicTokensEnabled) {
			const alt = alts[0];
			const singleTokensTypes = flatten_default(alt);
			if (singleTokensTypes.length === 1 && isEmpty_default(singleTokensTypes[0].categoryMatches)) {
				const expectedTokenType = singleTokensTypes[0];
				const expectedTokenUniqueKey = expectedTokenType.tokenTypeIdx;
				return function() {
					return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey;
				};
			} else {
				const choiceToAlt = reduce_default(singleTokensTypes, (result, currTokType) => {
					if (currTokType !== void 0) {
						result[currTokType.tokenTypeIdx] = true;
						forEach_default(currTokType.categoryMatches, (currExtendingType) => {
							result[currExtendingType] = true;
						});
					}
					return result;
				}, {});
				return function() {
					const nextToken = this.LA(1);
					return choiceToAlt[nextToken.tokenTypeIdx] === true;
				};
			}
		}
		return function() {
			const result = adaptivePredict.call(this, dfas, decisionIndex, EMPTY_PREDICATES, logging);
			return typeof result === "object" ? false : result === 0;
		};
	}
};
function isLL1Sequence(sequences, allowEmpty = true) {
	const fullSet = /* @__PURE__ */ new Set();
	for (const alt of sequences) {
		const altSet = /* @__PURE__ */ new Set();
		for (const tokType of alt) {
			if (tokType === void 0) if (allowEmpty) break;
			else return false;
			const indices = [tokType.tokenTypeIdx].concat(tokType.categoryMatches);
			for (const index of indices) if (fullSet.has(index)) {
				if (!altSet.has(index)) return false;
			} else {
				fullSet.add(index);
				altSet.add(index);
			}
		}
	}
	return true;
}
function initATNSimulator(atn) {
	const decisionLength = atn.decisionStates.length;
	const decisionToDFA = Array(decisionLength);
	for (let i = 0; i < decisionLength; i++) decisionToDFA[i] = createDFACache(atn.decisionStates[i], i);
	return decisionToDFA;
}
function adaptivePredict(dfaCaches, decision, predicateSet, logging) {
	const dfa = dfaCaches[decision](predicateSet);
	let start = dfa.start;
	if (start === void 0) {
		const closure$1 = computeStartState(dfa.atnStartState);
		start = addDFAState(dfa, newDFAState(closure$1));
		dfa.start = start;
	}
	const alt = performLookahead.apply(this, [
		dfa,
		start,
		predicateSet,
		logging
	]);
	return alt;
}
function performLookahead(dfa, s0, predicateSet, logging) {
	let previousD = s0;
	let i = 1;
	const path = [];
	let t = this.LA(i++);
	while (true) {
		let d = getExistingTargetState(previousD, t);
		if (d === void 0) d = computeLookaheadTarget.apply(this, [
			dfa,
			previousD,
			t,
			i,
			predicateSet,
			logging
		]);
		if (d === DFA_ERROR) return buildAdaptivePredictError(path, previousD, t);
		if (d.isAcceptState === true) return d.prediction;
		previousD = d;
		path.push(t);
		t = this.LA(i++);
	}
}
function computeLookaheadTarget(dfa, previousD, token, lookahead, predicateSet, logging) {
	const reach = computeReachSet(previousD.configs, token, predicateSet);
	if (reach.size === 0) {
		addDFAEdge(dfa, previousD, token, DFA_ERROR);
		return DFA_ERROR;
	}
	let newState$1 = newDFAState(reach);
	const predictedAlt = getUniqueAlt(reach, predicateSet);
	if (predictedAlt !== void 0) {
		newState$1.isAcceptState = true;
		newState$1.prediction = predictedAlt;
		newState$1.configs.uniqueAlt = predictedAlt;
	} else if (hasConflictTerminatingPrediction(reach)) {
		const prediction = min_default(reach.alts);
		newState$1.isAcceptState = true;
		newState$1.prediction = prediction;
		newState$1.configs.uniqueAlt = prediction;
		reportLookaheadAmbiguity.apply(this, [
			dfa,
			lookahead,
			reach.alts,
			logging
		]);
	}
	newState$1 = addDFAEdge(dfa, previousD, token, newState$1);
	return newState$1;
}
function reportLookaheadAmbiguity(dfa, lookahead, ambiguityIndices, logging) {
	const prefixPath = [];
	for (let i = 1; i <= lookahead; i++) prefixPath.push(this.LA(i).tokenType);
	const atnState = dfa.atnStartState;
	const topLevelRule = atnState.rule;
	const production = atnState.production;
	const message = buildAmbiguityError({
		topLevelRule,
		ambiguityIndices,
		production,
		prefixPath
	});
	logging(message);
}
function buildAmbiguityError(options) {
	const pathMsg = map_default(options.prefixPath, (currtok) => tokenLabel(currtok)).join(", ");
	const occurrence = options.production.idx === 0 ? "" : options.production.idx;
	let currMessage = `Ambiguous Alternatives Detected: <${options.ambiguityIndices.join(", ")}> in <${getProductionDslName(options.production)}${occurrence}> inside <${options.topLevelRule.name}> Rule,\n<${pathMsg}> may appears as a prefix path in all these alternatives.\n`;
	currMessage = currMessage + "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.";
	return currMessage;
}
function getProductionDslName(prod) {
	if (prod instanceof NonTerminal) return "SUBRULE";
	else if (prod instanceof Option$1) return "OPTION";
	else if (prod instanceof Alternation) return "OR";
	else if (prod instanceof RepetitionMandatory) return "AT_LEAST_ONE";
	else if (prod instanceof RepetitionMandatoryWithSeparator) return "AT_LEAST_ONE_SEP";
	else if (prod instanceof RepetitionWithSeparator) return "MANY_SEP";
	else if (prod instanceof Repetition) return "MANY";
	else if (prod instanceof Terminal) return "CONSUME";
	else throw Error("non exhaustive match");
}
function buildAdaptivePredictError(path, previous, current) {
	const nextTransitions = flatMap_default(previous.configs.elements, (e) => e.state.transitions);
	const nextTokenTypes = uniqBy_default(nextTransitions.filter((e) => e instanceof AtomTransition).map((e) => e.tokenType), (e) => e.tokenTypeIdx);
	return {
		actualToken: current,
		possibleTokenTypes: nextTokenTypes,
		tokenPath: path
	};
}
function getExistingTargetState(state, token) {
	return state.edges[token.tokenTypeIdx];
}
function computeReachSet(configs, token, predicateSet) {
	const intermediate = new ATNConfigSet();
	const skippedStopStates = [];
	for (const c of configs.elements) {
		if (predicateSet.is(c.alt) === false) continue;
		if (c.state.type === ATN_RULE_STOP) {
			skippedStopStates.push(c);
			continue;
		}
		const transitionLength = c.state.transitions.length;
		for (let i = 0; i < transitionLength; i++) {
			const transition = c.state.transitions[i];
			const target = getReachableTarget(transition, token);
			if (target !== void 0) intermediate.add({
				state: target,
				alt: c.alt,
				stack: c.stack
			});
		}
	}
	let reach;
	if (skippedStopStates.length === 0 && intermediate.size === 1) reach = intermediate;
	if (reach === void 0) {
		reach = new ATNConfigSet();
		for (const c of intermediate.elements) closure(c, reach);
	}
	if (skippedStopStates.length > 0 && !hasConfigInRuleStopState(reach)) for (const c of skippedStopStates) reach.add(c);
	return reach;
}
function getReachableTarget(transition, token) {
	if (transition instanceof AtomTransition && tokenMatcher(token, transition.tokenType)) return transition.target;
	return void 0;
}
function getUniqueAlt(configs, predicateSet) {
	let alt;
	for (const c of configs.elements) if (predicateSet.is(c.alt) === true) {
		if (alt === void 0) alt = c.alt;
		else if (alt !== c.alt) return void 0;
	}
	return alt;
}
function newDFAState(closure$1) {
	return {
		configs: closure$1,
		edges: {},
		isAcceptState: false,
		prediction: -1
	};
}
function addDFAEdge(dfa, from, token, to) {
	to = addDFAState(dfa, to);
	from.edges[token.tokenTypeIdx] = to;
	return to;
}
function addDFAState(dfa, state) {
	if (state === DFA_ERROR) return state;
	const mapKey = state.configs.key;
	const existing = dfa.states[mapKey];
	if (existing !== void 0) return existing;
	state.configs.finalize();
	dfa.states[mapKey] = state;
	return state;
}
function computeStartState(atnState) {
	const configs = new ATNConfigSet();
	const numberOfTransitions = atnState.transitions.length;
	for (let i = 0; i < numberOfTransitions; i++) {
		const target = atnState.transitions[i].target;
		const config = {
			state: target,
			alt: i,
			stack: []
		};
		closure(config, configs);
	}
	return configs;
}
function closure(config, configs) {
	const p = config.state;
	if (p.type === ATN_RULE_STOP) {
		if (config.stack.length > 0) {
			const atnStack = [...config.stack];
			const followState = atnStack.pop();
			const followConfig = {
				state: followState,
				alt: config.alt,
				stack: atnStack
			};
			closure(followConfig, configs);
		} else configs.add(config);
		return;
	}
	if (!p.epsilonOnlyTransitions) configs.add(config);
	const transitionLength = p.transitions.length;
	for (let i = 0; i < transitionLength; i++) {
		const transition = p.transitions[i];
		const c = getEpsilonTarget(config, transition);
		if (c !== void 0) closure(c, configs);
	}
}
function getEpsilonTarget(config, transition) {
	if (transition instanceof EpsilonTransition) return {
		state: transition.target,
		alt: config.alt,
		stack: config.stack
	};
	else if (transition instanceof RuleTransition) {
		const stack = [...config.stack, transition.followState];
		return {
			state: transition.target,
			alt: config.alt,
			stack
		};
	}
	return void 0;
}
function hasConfigInRuleStopState(configs) {
	for (const c of configs.elements) if (c.state.type === ATN_RULE_STOP) return true;
	return false;
}
function allConfigsInRuleStopStates(configs) {
	for (const c of configs.elements) if (c.state.type !== ATN_RULE_STOP) return false;
	return true;
}
function hasConflictTerminatingPrediction(configs) {
	if (allConfigsInRuleStopStates(configs)) return true;
	const altSets = getConflictingAltSets(configs.elements);
	const heuristic = hasConflictingAltSet(altSets) && !hasStateAssociatedWithOneAlt(altSets);
	return heuristic;
}
function getConflictingAltSets(configs) {
	const configToAlts = /* @__PURE__ */ new Map();
	for (const c of configs) {
		const key = getATNConfigKey(c, false);
		let alts = configToAlts.get(key);
		if (alts === void 0) {
			alts = {};
			configToAlts.set(key, alts);
		}
		alts[c.alt] = true;
	}
	return configToAlts;
}
function hasConflictingAltSet(altSets) {
	for (const value of Array.from(altSets.values())) if (Object.keys(value).length > 1) return true;
	return false;
}
function hasStateAssociatedWithOneAlt(altSets) {
	for (const value of Array.from(altSets.values())) if (Object.keys(value).length === 1) return true;
	return false;
}
var DocumentUri;
(function(DocumentUri$1) {
	function is(value) {
		return typeof value === "string";
	}
	DocumentUri$1.is = is;
})(DocumentUri || (DocumentUri = {}));
var URI$1;
(function(URI$2) {
	function is(value) {
		return typeof value === "string";
	}
	URI$2.is = is;
})(URI$1 || (URI$1 = {}));
var integer;
(function(integer$1) {
	integer$1.MIN_VALUE = -2147483648;
	integer$1.MAX_VALUE = 2147483647;
	function is(value) {
		return typeof value === "number" && integer$1.MIN_VALUE <= value && value <= integer$1.MAX_VALUE;
	}
	integer$1.is = is;
})(integer || (integer = {}));
var uinteger;
(function(uinteger$1) {
	uinteger$1.MIN_VALUE = 0;
	uinteger$1.MAX_VALUE = 2147483647;
	function is(value) {
		return typeof value === "number" && uinteger$1.MIN_VALUE <= value && value <= uinteger$1.MAX_VALUE;
	}
	uinteger$1.is = is;
})(uinteger || (uinteger = {}));
var Position;
(function(Position$1) {
	function create(line, character) {
		if (line === Number.MAX_VALUE) line = uinteger.MAX_VALUE;
		if (character === Number.MAX_VALUE) character = uinteger.MAX_VALUE;
		return {
			line,
			character
		};
	}
	Position$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.objectLiteral(candidate) && Is$1.uinteger(candidate.line) && Is$1.uinteger(candidate.character);
	}
	Position$1.is = is;
})(Position || (Position = {}));
var Range;
(function(Range$1) {
	function create(one, two, three, four) {
		if (Is$1.uinteger(one) && Is$1.uinteger(two) && Is$1.uinteger(three) && Is$1.uinteger(four)) return {
			start: Position.create(one, two),
			end: Position.create(three, four)
		};
		else if (Position.is(one) && Position.is(two)) return {
			start: one,
			end: two
		};
		else throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
	}
	Range$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
	}
	Range$1.is = is;
})(Range || (Range = {}));
var Location;
(function(Location$1) {
	function create(uri, range) {
		return {
			uri,
			range
		};
	}
	Location$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.objectLiteral(candidate) && Range.is(candidate.range) && (Is$1.string(candidate.uri) || Is$1.undefined(candidate.uri));
	}
	Location$1.is = is;
})(Location || (Location = {}));
var LocationLink;
(function(LocationLink$1) {
	function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
		return {
			targetUri,
			targetRange,
			targetSelectionRange,
			originSelectionRange
		};
	}
	LocationLink$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is$1.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is$1.undefined(candidate.originSelectionRange));
	}
	LocationLink$1.is = is;
})(LocationLink || (LocationLink = {}));
var Color;
(function(Color$1) {
	function create(red, green, blue, alpha) {
		return {
			red,
			green,
			blue,
			alpha
		};
	}
	Color$1.create = create;
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && Is$1.numberRange(candidate.red, 0, 1) && Is$1.numberRange(candidate.green, 0, 1) && Is$1.numberRange(candidate.blue, 0, 1) && Is$1.numberRange(candidate.alpha, 0, 1);
	}
	Color$1.is = is;
})(Color || (Color = {}));
var ColorInformation;
(function(ColorInformation$1) {
	function create(range, color) {
		return {
			range,
			color
		};
	}
	ColorInformation$1.create = create;
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
	}
	ColorInformation$1.is = is;
})(ColorInformation || (ColorInformation = {}));
var ColorPresentation;
(function(ColorPresentation$1) {
	function create(label, textEdit, additionalTextEdits) {
		return {
			label,
			textEdit,
			additionalTextEdits
		};
	}
	ColorPresentation$1.create = create;
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && Is$1.string(candidate.label) && (Is$1.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is$1.undefined(candidate.additionalTextEdits) || Is$1.typedArray(candidate.additionalTextEdits, TextEdit.is));
	}
	ColorPresentation$1.is = is;
})(ColorPresentation || (ColorPresentation = {}));
var FoldingRangeKind;
(function(FoldingRangeKind$1) {
	FoldingRangeKind$1.Comment = "comment";
	FoldingRangeKind$1.Imports = "imports";
	FoldingRangeKind$1.Region = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
var FoldingRange;
(function(FoldingRange$1) {
	function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
		const result = {
			startLine,
			endLine
		};
		if (Is$1.defined(startCharacter)) result.startCharacter = startCharacter;
		if (Is$1.defined(endCharacter)) result.endCharacter = endCharacter;
		if (Is$1.defined(kind)) result.kind = kind;
		if (Is$1.defined(collapsedText)) result.collapsedText = collapsedText;
		return result;
	}
	FoldingRange$1.create = create;
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && Is$1.uinteger(candidate.startLine) && Is$1.uinteger(candidate.startLine) && (Is$1.undefined(candidate.startCharacter) || Is$1.uinteger(candidate.startCharacter)) && (Is$1.undefined(candidate.endCharacter) || Is$1.uinteger(candidate.endCharacter)) && (Is$1.undefined(candidate.kind) || Is$1.string(candidate.kind));
	}
	FoldingRange$1.is = is;
})(FoldingRange || (FoldingRange = {}));
var DiagnosticRelatedInformation;
(function(DiagnosticRelatedInformation$1) {
	function create(location, message) {
		return {
			location,
			message
		};
	}
	DiagnosticRelatedInformation$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Location.is(candidate.location) && Is$1.string(candidate.message);
	}
	DiagnosticRelatedInformation$1.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
var DiagnosticSeverity;
(function(DiagnosticSeverity$1) {
	DiagnosticSeverity$1.Error = 1;
	DiagnosticSeverity$1.Warning = 2;
	DiagnosticSeverity$1.Information = 3;
	DiagnosticSeverity$1.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
var DiagnosticTag;
(function(DiagnosticTag$1) {
	DiagnosticTag$1.Unnecessary = 1;
	DiagnosticTag$1.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
var CodeDescription;
(function(CodeDescription$1) {
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && Is$1.string(candidate.href);
	}
	CodeDescription$1.is = is;
})(CodeDescription || (CodeDescription = {}));
var Diagnostic;
(function(Diagnostic$1) {
	function create(range, message, severity, code, source, relatedInformation) {
		let result = {
			range,
			message
		};
		if (Is$1.defined(severity)) result.severity = severity;
		if (Is$1.defined(code)) result.code = code;
		if (Is$1.defined(source)) result.source = source;
		if (Is$1.defined(relatedInformation)) result.relatedInformation = relatedInformation;
		return result;
	}
	Diagnostic$1.create = create;
	function is(value) {
		var _a;
		let candidate = value;
		return Is$1.defined(candidate) && Range.is(candidate.range) && Is$1.string(candidate.message) && (Is$1.number(candidate.severity) || Is$1.undefined(candidate.severity)) && (Is$1.integer(candidate.code) || Is$1.string(candidate.code) || Is$1.undefined(candidate.code)) && (Is$1.undefined(candidate.codeDescription) || Is$1.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is$1.string(candidate.source) || Is$1.undefined(candidate.source)) && (Is$1.undefined(candidate.relatedInformation) || Is$1.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
	}
	Diagnostic$1.is = is;
})(Diagnostic || (Diagnostic = {}));
var Command;
(function(Command$1) {
	function create(title, command, ...args) {
		let result = {
			title,
			command
		};
		if (Is$1.defined(args) && args.length > 0) result.arguments = args;
		return result;
	}
	Command$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Is$1.string(candidate.title) && Is$1.string(candidate.command);
	}
	Command$1.is = is;
})(Command || (Command = {}));
var TextEdit;
(function(TextEdit$1) {
	function replace(range, newText) {
		return {
			range,
			newText
		};
	}
	TextEdit$1.replace = replace;
	function insert(position, newText) {
		return {
			range: {
				start: position,
				end: position
			},
			newText
		};
	}
	TextEdit$1.insert = insert;
	function del(range) {
		return {
			range,
			newText: ""
		};
	}
	TextEdit$1.del = del;
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && Is$1.string(candidate.newText) && Range.is(candidate.range);
	}
	TextEdit$1.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function(ChangeAnnotation$1) {
	function create(label, needsConfirmation, description) {
		const result = { label };
		if (needsConfirmation !== void 0) result.needsConfirmation = needsConfirmation;
		if (description !== void 0) result.description = description;
		return result;
	}
	ChangeAnnotation$1.create = create;
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && Is$1.string(candidate.label) && (Is$1.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is$1.string(candidate.description) || candidate.description === void 0);
	}
	ChangeAnnotation$1.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function(ChangeAnnotationIdentifier$1) {
	function is(value) {
		const candidate = value;
		return Is$1.string(candidate);
	}
	ChangeAnnotationIdentifier$1.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function(AnnotatedTextEdit$1) {
	function replace(range, newText, annotation) {
		return {
			range,
			newText,
			annotationId: annotation
		};
	}
	AnnotatedTextEdit$1.replace = replace;
	function insert(position, newText, annotation) {
		return {
			range: {
				start: position,
				end: position
			},
			newText,
			annotationId: annotation
		};
	}
	AnnotatedTextEdit$1.insert = insert;
	function del(range, annotation) {
		return {
			range,
			newText: "",
			annotationId: annotation
		};
	}
	AnnotatedTextEdit$1.del = del;
	function is(value) {
		const candidate = value;
		return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
	}
	AnnotatedTextEdit$1.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
var TextDocumentEdit;
(function(TextDocumentEdit$1) {
	function create(textDocument, edits) {
		return {
			textDocument,
			edits
		};
	}
	TextDocumentEdit$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
	}
	TextDocumentEdit$1.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function(CreateFile$1) {
	function create(uri, options, annotation) {
		let result = {
			kind: "create",
			uri
		};
		if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
		if (annotation !== void 0) result.annotationId = annotation;
		return result;
	}
	CreateFile$1.create = create;
	function is(value) {
		let candidate = value;
		return candidate && candidate.kind === "create" && Is$1.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is$1.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is$1.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
	}
	CreateFile$1.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function(RenameFile$1) {
	function create(oldUri, newUri, options, annotation) {
		let result = {
			kind: "rename",
			oldUri,
			newUri
		};
		if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
		if (annotation !== void 0) result.annotationId = annotation;
		return result;
	}
	RenameFile$1.create = create;
	function is(value) {
		let candidate = value;
		return candidate && candidate.kind === "rename" && Is$1.string(candidate.oldUri) && Is$1.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is$1.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is$1.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
	}
	RenameFile$1.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function(DeleteFile$1) {
	function create(uri, options, annotation) {
		let result = {
			kind: "delete",
			uri
		};
		if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) result.options = options;
		if (annotation !== void 0) result.annotationId = annotation;
		return result;
	}
	DeleteFile$1.create = create;
	function is(value) {
		let candidate = value;
		return candidate && candidate.kind === "delete" && Is$1.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is$1.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is$1.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
	}
	DeleteFile$1.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function(WorkspaceEdit$1) {
	function is(value) {
		let candidate = value;
		return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every((change) => {
			if (Is$1.string(change.kind)) return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
			else return TextDocumentEdit.is(change);
		}));
	}
	WorkspaceEdit$1.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextDocumentIdentifier;
(function(TextDocumentIdentifier$1) {
	function create(uri) {
		return { uri };
	}
	TextDocumentIdentifier$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Is$1.string(candidate.uri);
	}
	TextDocumentIdentifier$1.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
var VersionedTextDocumentIdentifier;
(function(VersionedTextDocumentIdentifier$1) {
	function create(uri, version) {
		return {
			uri,
			version
		};
	}
	VersionedTextDocumentIdentifier$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Is$1.string(candidate.uri) && Is$1.integer(candidate.version);
	}
	VersionedTextDocumentIdentifier$1.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
var OptionalVersionedTextDocumentIdentifier;
(function(OptionalVersionedTextDocumentIdentifier$1) {
	function create(uri, version) {
		return {
			uri,
			version
		};
	}
	OptionalVersionedTextDocumentIdentifier$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Is$1.string(candidate.uri) && (candidate.version === null || Is$1.integer(candidate.version));
	}
	OptionalVersionedTextDocumentIdentifier$1.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
var TextDocumentItem;
(function(TextDocumentItem$1) {
	function create(uri, languageId, version, text) {
		return {
			uri,
			languageId,
			version,
			text
		};
	}
	TextDocumentItem$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Is$1.string(candidate.uri) && Is$1.string(candidate.languageId) && Is$1.integer(candidate.version) && Is$1.string(candidate.text);
	}
	TextDocumentItem$1.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
var MarkupKind;
(function(MarkupKind$1) {
	MarkupKind$1.PlainText = "plaintext";
	MarkupKind$1.Markdown = "markdown";
	function is(value) {
		const candidate = value;
		return candidate === MarkupKind$1.PlainText || candidate === MarkupKind$1.Markdown;
	}
	MarkupKind$1.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function(MarkupContent$1) {
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is$1.string(candidate.value);
	}
	MarkupContent$1.is = is;
})(MarkupContent || (MarkupContent = {}));
var CompletionItemKind;
(function(CompletionItemKind$1) {
	CompletionItemKind$1.Text = 1;
	CompletionItemKind$1.Method = 2;
	CompletionItemKind$1.Function = 3;
	CompletionItemKind$1.Constructor = 4;
	CompletionItemKind$1.Field = 5;
	CompletionItemKind$1.Variable = 6;
	CompletionItemKind$1.Class = 7;
	CompletionItemKind$1.Interface = 8;
	CompletionItemKind$1.Module = 9;
	CompletionItemKind$1.Property = 10;
	CompletionItemKind$1.Unit = 11;
	CompletionItemKind$1.Value = 12;
	CompletionItemKind$1.Enum = 13;
	CompletionItemKind$1.Keyword = 14;
	CompletionItemKind$1.Snippet = 15;
	CompletionItemKind$1.Color = 16;
	CompletionItemKind$1.File = 17;
	CompletionItemKind$1.Reference = 18;
	CompletionItemKind$1.Folder = 19;
	CompletionItemKind$1.EnumMember = 20;
	CompletionItemKind$1.Constant = 21;
	CompletionItemKind$1.Struct = 22;
	CompletionItemKind$1.Event = 23;
	CompletionItemKind$1.Operator = 24;
	CompletionItemKind$1.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
var InsertTextFormat;
(function(InsertTextFormat$1) {
	InsertTextFormat$1.PlainText = 1;
	InsertTextFormat$1.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
var CompletionItemTag;
(function(CompletionItemTag$1) {
	CompletionItemTag$1.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
var InsertReplaceEdit;
(function(InsertReplaceEdit$1) {
	function create(newText, insert, replace) {
		return {
			newText,
			insert,
			replace
		};
	}
	InsertReplaceEdit$1.create = create;
	function is(value) {
		const candidate = value;
		return candidate && Is$1.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
	}
	InsertReplaceEdit$1.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
var InsertTextMode;
(function(InsertTextMode$1) {
	InsertTextMode$1.asIs = 1;
	InsertTextMode$1.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItemLabelDetails;
(function(CompletionItemLabelDetails$1) {
	function is(value) {
		const candidate = value;
		return candidate && (Is$1.string(candidate.detail) || candidate.detail === void 0) && (Is$1.string(candidate.description) || candidate.description === void 0);
	}
	CompletionItemLabelDetails$1.is = is;
})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
var CompletionItem;
(function(CompletionItem$1) {
	function create(label) {
		return { label };
	}
	CompletionItem$1.create = create;
})(CompletionItem || (CompletionItem = {}));
var CompletionList;
(function(CompletionList$1) {
	function create(items, isIncomplete) {
		return {
			items: items ? items : [],
			isIncomplete: !!isIncomplete
		};
	}
	CompletionList$1.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function(MarkedString$1) {
	function fromPlainText(plainText) {
		return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
	}
	MarkedString$1.fromPlainText = fromPlainText;
	function is(value) {
		const candidate = value;
		return Is$1.string(candidate) || Is$1.objectLiteral(candidate) && Is$1.string(candidate.language) && Is$1.string(candidate.value);
	}
	MarkedString$1.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function(Hover$1) {
	function is(value) {
		let candidate = value;
		return !!candidate && Is$1.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is$1.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
	}
	Hover$1.is = is;
})(Hover || (Hover = {}));
var ParameterInformation;
(function(ParameterInformation$1) {
	function create(label, documentation) {
		return documentation ? {
			label,
			documentation
		} : { label };
	}
	ParameterInformation$1.create = create;
})(ParameterInformation || (ParameterInformation = {}));
var SignatureInformation;
(function(SignatureInformation$1) {
	function create(label, documentation, ...parameters) {
		let result = { label };
		if (Is$1.defined(documentation)) result.documentation = documentation;
		if (Is$1.defined(parameters)) result.parameters = parameters;
		else result.parameters = [];
		return result;
	}
	SignatureInformation$1.create = create;
})(SignatureInformation || (SignatureInformation = {}));
var DocumentHighlightKind;
(function(DocumentHighlightKind$1) {
	DocumentHighlightKind$1.Text = 1;
	DocumentHighlightKind$1.Read = 2;
	DocumentHighlightKind$1.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
var DocumentHighlight;
(function(DocumentHighlight$1) {
	function create(range, kind) {
		let result = { range };
		if (Is$1.number(kind)) result.kind = kind;
		return result;
	}
	DocumentHighlight$1.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
var SymbolKind;
(function(SymbolKind$1) {
	SymbolKind$1.File = 1;
	SymbolKind$1.Module = 2;
	SymbolKind$1.Namespace = 3;
	SymbolKind$1.Package = 4;
	SymbolKind$1.Class = 5;
	SymbolKind$1.Method = 6;
	SymbolKind$1.Property = 7;
	SymbolKind$1.Field = 8;
	SymbolKind$1.Constructor = 9;
	SymbolKind$1.Enum = 10;
	SymbolKind$1.Interface = 11;
	SymbolKind$1.Function = 12;
	SymbolKind$1.Variable = 13;
	SymbolKind$1.Constant = 14;
	SymbolKind$1.String = 15;
	SymbolKind$1.Number = 16;
	SymbolKind$1.Boolean = 17;
	SymbolKind$1.Array = 18;
	SymbolKind$1.Object = 19;
	SymbolKind$1.Key = 20;
	SymbolKind$1.Null = 21;
	SymbolKind$1.EnumMember = 22;
	SymbolKind$1.Struct = 23;
	SymbolKind$1.Event = 24;
	SymbolKind$1.Operator = 25;
	SymbolKind$1.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolTag;
(function(SymbolTag$1) {
	SymbolTag$1.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function(SymbolInformation$1) {
	function create(name, kind, range, uri, containerName) {
		let result = {
			name,
			kind,
			location: {
				uri,
				range
			}
		};
		if (containerName) result.containerName = containerName;
		return result;
	}
	SymbolInformation$1.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var WorkspaceSymbol;
(function(WorkspaceSymbol$1) {
	function create(name, kind, uri, range) {
		return range !== void 0 ? {
			name,
			kind,
			location: {
				uri,
				range
			}
		} : {
			name,
			kind,
			location: { uri }
		};
	}
	WorkspaceSymbol$1.create = create;
})(WorkspaceSymbol || (WorkspaceSymbol = {}));
var DocumentSymbol;
(function(DocumentSymbol$1) {
	function create(name, detail, kind, range, selectionRange, children) {
		let result = {
			name,
			detail,
			kind,
			range,
			selectionRange
		};
		if (children !== void 0) result.children = children;
		return result;
	}
	DocumentSymbol$1.create = create;
	function is(value) {
		let candidate = value;
		return candidate && Is$1.string(candidate.name) && Is$1.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is$1.string(candidate.detail)) && (candidate.deprecated === void 0 || Is$1.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
	}
	DocumentSymbol$1.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
var CodeActionKind;
(function(CodeActionKind$1) {
	CodeActionKind$1.Empty = "";
	CodeActionKind$1.QuickFix = "quickfix";
	CodeActionKind$1.Refactor = "refactor";
	CodeActionKind$1.RefactorExtract = "refactor.extract";
	CodeActionKind$1.RefactorInline = "refactor.inline";
	CodeActionKind$1.RefactorRewrite = "refactor.rewrite";
	CodeActionKind$1.Source = "source";
	CodeActionKind$1.SourceOrganizeImports = "source.organizeImports";
	CodeActionKind$1.SourceFixAll = "source.fixAll";
})(CodeActionKind || (CodeActionKind = {}));
var CodeActionTriggerKind;
(function(CodeActionTriggerKind$1) {
	CodeActionTriggerKind$1.Invoked = 1;
	CodeActionTriggerKind$1.Automatic = 2;
})(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
var CodeActionContext;
(function(CodeActionContext$1) {
	function create(diagnostics, only, triggerKind) {
		let result = { diagnostics };
		if (only !== void 0 && only !== null) result.only = only;
		if (triggerKind !== void 0 && triggerKind !== null) result.triggerKind = triggerKind;
		return result;
	}
	CodeActionContext$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Is$1.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is$1.typedArray(candidate.only, Is$1.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
	}
	CodeActionContext$1.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function(CodeAction$1) {
	function create(title, kindOrCommandOrEdit, kind) {
		let result = { title };
		let checkKind = true;
		if (typeof kindOrCommandOrEdit === "string") {
			checkKind = false;
			result.kind = kindOrCommandOrEdit;
		} else if (Command.is(kindOrCommandOrEdit)) result.command = kindOrCommandOrEdit;
		else result.edit = kindOrCommandOrEdit;
		if (checkKind && kind !== void 0) result.kind = kind;
		return result;
	}
	CodeAction$1.create = create;
	function is(value) {
		let candidate = value;
		return candidate && Is$1.string(candidate.title) && (candidate.diagnostics === void 0 || Is$1.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is$1.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is$1.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
	}
	CodeAction$1.is = is;
})(CodeAction || (CodeAction = {}));
var CodeLens;
(function(CodeLens$1) {
	function create(range, data) {
		let result = { range };
		if (Is$1.defined(data)) result.data = data;
		return result;
	}
	CodeLens$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Range.is(candidate.range) && (Is$1.undefined(candidate.command) || Command.is(candidate.command));
	}
	CodeLens$1.is = is;
})(CodeLens || (CodeLens = {}));
var FormattingOptions;
(function(FormattingOptions$1) {
	function create(tabSize, insertSpaces) {
		return {
			tabSize,
			insertSpaces
		};
	}
	FormattingOptions$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Is$1.uinteger(candidate.tabSize) && Is$1.boolean(candidate.insertSpaces);
	}
	FormattingOptions$1.is = is;
})(FormattingOptions || (FormattingOptions = {}));
var DocumentLink;
(function(DocumentLink$1) {
	function create(range, target, data) {
		return {
			range,
			target,
			data
		};
	}
	DocumentLink$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Range.is(candidate.range) && (Is$1.undefined(candidate.target) || Is$1.string(candidate.target));
	}
	DocumentLink$1.is = is;
})(DocumentLink || (DocumentLink = {}));
var SelectionRange;
(function(SelectionRange$1) {
	function create(range, parent) {
		return {
			range,
			parent
		};
	}
	SelectionRange$1.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange$1.is(candidate.parent));
	}
	SelectionRange$1.is = is;
})(SelectionRange || (SelectionRange = {}));
var SemanticTokenTypes;
(function(SemanticTokenTypes$1) {
	SemanticTokenTypes$1["namespace"] = "namespace";
	SemanticTokenTypes$1["type"] = "type";
	SemanticTokenTypes$1["class"] = "class";
	SemanticTokenTypes$1["enum"] = "enum";
	SemanticTokenTypes$1["interface"] = "interface";
	SemanticTokenTypes$1["struct"] = "struct";
	SemanticTokenTypes$1["typeParameter"] = "typeParameter";
	SemanticTokenTypes$1["parameter"] = "parameter";
	SemanticTokenTypes$1["variable"] = "variable";
	SemanticTokenTypes$1["property"] = "property";
	SemanticTokenTypes$1["enumMember"] = "enumMember";
	SemanticTokenTypes$1["event"] = "event";
	SemanticTokenTypes$1["function"] = "function";
	SemanticTokenTypes$1["method"] = "method";
	SemanticTokenTypes$1["macro"] = "macro";
	SemanticTokenTypes$1["keyword"] = "keyword";
	SemanticTokenTypes$1["modifier"] = "modifier";
	SemanticTokenTypes$1["comment"] = "comment";
	SemanticTokenTypes$1["string"] = "string";
	SemanticTokenTypes$1["number"] = "number";
	SemanticTokenTypes$1["regexp"] = "regexp";
	SemanticTokenTypes$1["operator"] = "operator";
	SemanticTokenTypes$1["decorator"] = "decorator";
})(SemanticTokenTypes || (SemanticTokenTypes = {}));
var SemanticTokenModifiers;
(function(SemanticTokenModifiers$1) {
	SemanticTokenModifiers$1["declaration"] = "declaration";
	SemanticTokenModifiers$1["definition"] = "definition";
	SemanticTokenModifiers$1["readonly"] = "readonly";
	SemanticTokenModifiers$1["static"] = "static";
	SemanticTokenModifiers$1["deprecated"] = "deprecated";
	SemanticTokenModifiers$1["abstract"] = "abstract";
	SemanticTokenModifiers$1["async"] = "async";
	SemanticTokenModifiers$1["modification"] = "modification";
	SemanticTokenModifiers$1["documentation"] = "documentation";
	SemanticTokenModifiers$1["defaultLibrary"] = "defaultLibrary";
})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
var SemanticTokens;
(function(SemanticTokens$1) {
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
	}
	SemanticTokens$1.is = is;
})(SemanticTokens || (SemanticTokens = {}));
var InlineValueText;
(function(InlineValueText$1) {
	function create(range, text) {
		return {
			range,
			text
		};
	}
	InlineValueText$1.create = create;
	function is(value) {
		const candidate = value;
		return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is$1.string(candidate.text);
	}
	InlineValueText$1.is = is;
})(InlineValueText || (InlineValueText = {}));
var InlineValueVariableLookup;
(function(InlineValueVariableLookup$1) {
	function create(range, variableName, caseSensitiveLookup) {
		return {
			range,
			variableName,
			caseSensitiveLookup
		};
	}
	InlineValueVariableLookup$1.create = create;
	function is(value) {
		const candidate = value;
		return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is$1.boolean(candidate.caseSensitiveLookup) && (Is$1.string(candidate.variableName) || candidate.variableName === void 0);
	}
	InlineValueVariableLookup$1.is = is;
})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
var InlineValueEvaluatableExpression;
(function(InlineValueEvaluatableExpression$1) {
	function create(range, expression) {
		return {
			range,
			expression
		};
	}
	InlineValueEvaluatableExpression$1.create = create;
	function is(value) {
		const candidate = value;
		return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is$1.string(candidate.expression) || candidate.expression === void 0);
	}
	InlineValueEvaluatableExpression$1.is = is;
})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
var InlineValueContext;
(function(InlineValueContext$1) {
	function create(frameId, stoppedLocation) {
		return {
			frameId,
			stoppedLocation
		};
	}
	InlineValueContext$1.create = create;
	function is(value) {
		const candidate = value;
		return Is$1.defined(candidate) && Range.is(value.stoppedLocation);
	}
	InlineValueContext$1.is = is;
})(InlineValueContext || (InlineValueContext = {}));
var InlayHintKind;
(function(InlayHintKind$1) {
	InlayHintKind$1.Type = 1;
	InlayHintKind$1.Parameter = 2;
	function is(value) {
		return value === 1 || value === 2;
	}
	InlayHintKind$1.is = is;
})(InlayHintKind || (InlayHintKind = {}));
var InlayHintLabelPart;
(function(InlayHintLabelPart$1) {
	function create(value) {
		return { value };
	}
	InlayHintLabelPart$1.create = create;
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is$1.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
	}
	InlayHintLabelPart$1.is = is;
})(InlayHintLabelPart || (InlayHintLabelPart = {}));
var InlayHint;
(function(InlayHint$1) {
	function create(position, label, kind) {
		const result = {
			position,
			label
		};
		if (kind !== void 0) result.kind = kind;
		return result;
	}
	InlayHint$1.create = create;
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && Position.is(candidate.position) && (Is$1.string(candidate.label) || Is$1.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is$1.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is$1.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is$1.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is$1.boolean(candidate.paddingRight));
	}
	InlayHint$1.is = is;
})(InlayHint || (InlayHint = {}));
var StringValue;
(function(StringValue$1) {
	function createSnippet(value) {
		return {
			kind: "snippet",
			value
		};
	}
	StringValue$1.createSnippet = createSnippet;
})(StringValue || (StringValue = {}));
var InlineCompletionItem;
(function(InlineCompletionItem$1) {
	function create(insertText, filterText, range, command) {
		return {
			insertText,
			filterText,
			range,
			command
		};
	}
	InlineCompletionItem$1.create = create;
})(InlineCompletionItem || (InlineCompletionItem = {}));
var InlineCompletionList;
(function(InlineCompletionList$1) {
	function create(items) {
		return { items };
	}
	InlineCompletionList$1.create = create;
})(InlineCompletionList || (InlineCompletionList = {}));
var InlineCompletionTriggerKind;
(function(InlineCompletionTriggerKind$1) {
	InlineCompletionTriggerKind$1.Invoked = 0;
	InlineCompletionTriggerKind$1.Automatic = 1;
})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
var SelectedCompletionInfo;
(function(SelectedCompletionInfo$1) {
	function create(range, text) {
		return {
			range,
			text
		};
	}
	SelectedCompletionInfo$1.create = create;
})(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
var InlineCompletionContext;
(function(InlineCompletionContext$1) {
	function create(triggerKind, selectedCompletionInfo) {
		return {
			triggerKind,
			selectedCompletionInfo
		};
	}
	InlineCompletionContext$1.create = create;
})(InlineCompletionContext || (InlineCompletionContext = {}));
var WorkspaceFolder;
(function(WorkspaceFolder$1) {
	function is(value) {
		const candidate = value;
		return Is$1.objectLiteral(candidate) && URI$1.is(candidate.uri) && Is$1.string(candidate.name);
	}
	WorkspaceFolder$1.is = is;
})(WorkspaceFolder || (WorkspaceFolder = {}));
var TextDocument$1;
(function(TextDocument$2) {
	function create(uri, languageId, version, content) {
		return new FullTextDocument$1(uri, languageId, version, content);
	}
	TextDocument$2.create = create;
	function is(value) {
		let candidate = value;
		return Is$1.defined(candidate) && Is$1.string(candidate.uri) && (Is$1.undefined(candidate.languageId) || Is$1.string(candidate.languageId)) && Is$1.uinteger(candidate.lineCount) && Is$1.func(candidate.getText) && Is$1.func(candidate.positionAt) && Is$1.func(candidate.offsetAt) ? true : false;
	}
	TextDocument$2.is = is;
	function applyEdits(document, edits) {
		let text = document.getText();
		let sortedEdits = mergeSort$1(edits, (a, b) => {
			let diff = a.range.start.line - b.range.start.line;
			if (diff === 0) return a.range.start.character - b.range.start.character;
			return diff;
		});
		let lastModifiedOffset = text.length;
		for (let i = sortedEdits.length - 1; i >= 0; i--) {
			let e = sortedEdits[i];
			let startOffset = document.offsetAt(e.range.start);
			let endOffset = document.offsetAt(e.range.end);
			if (endOffset <= lastModifiedOffset) text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
			else throw new Error("Overlapping edit");
			lastModifiedOffset = startOffset;
		}
		return text;
	}
	TextDocument$2.applyEdits = applyEdits;
	function mergeSort$1(data, compare) {
		if (data.length <= 1) return data;
		const p = data.length / 2 | 0;
		const left = data.slice(0, p);
		const right = data.slice(p);
		mergeSort$1(left, compare);
		mergeSort$1(right, compare);
		let leftIdx = 0;
		let rightIdx = 0;
		let i = 0;
		while (leftIdx < left.length && rightIdx < right.length) {
			let ret = compare(left[leftIdx], right[rightIdx]);
			if (ret <= 0) data[i++] = left[leftIdx++];
			else data[i++] = right[rightIdx++];
		}
		while (leftIdx < left.length) data[i++] = left[leftIdx++];
		while (rightIdx < right.length) data[i++] = right[rightIdx++];
		return data;
	}
})(TextDocument$1 || (TextDocument$1 = {}));
var FullTextDocument$1 = class {
	constructor(uri, languageId, version, content) {
		this._uri = uri;
		this._languageId = languageId;
		this._version = version;
		this._content = content;
		this._lineOffsets = void 0;
	}
	get uri() {
		return this._uri;
	}
	get languageId() {
		return this._languageId;
	}
	get version() {
		return this._version;
	}
	getText(range) {
		if (range) {
			let start = this.offsetAt(range.start);
			let end = this.offsetAt(range.end);
			return this._content.substring(start, end);
		}
		return this._content;
	}
	update(event, version) {
		this._content = event.text;
		this._version = version;
		this._lineOffsets = void 0;
	}
	getLineOffsets() {
		if (this._lineOffsets === void 0) {
			let lineOffsets = [];
			let text = this._content;
			let isLineStart = true;
			for (let i = 0; i < text.length; i++) {
				if (isLineStart) {
					lineOffsets.push(i);
					isLineStart = false;
				}
				let ch = text.charAt(i);
				isLineStart = ch === "\r" || ch === "\n";
				if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") i++;
			}
			if (isLineStart && text.length > 0) lineOffsets.push(text.length);
			this._lineOffsets = lineOffsets;
		}
		return this._lineOffsets;
	}
	positionAt(offset) {
		offset = Math.max(Math.min(offset, this._content.length), 0);
		let lineOffsets = this.getLineOffsets();
		let low = 0, high = lineOffsets.length;
		if (high === 0) return Position.create(0, offset);
		while (low < high) {
			let mid = Math.floor((low + high) / 2);
			if (lineOffsets[mid] > offset) high = mid;
			else low = mid + 1;
		}
		let line = low - 1;
		return Position.create(line, offset - lineOffsets[line]);
	}
	offsetAt(position) {
		let lineOffsets = this.getLineOffsets();
		if (position.line >= lineOffsets.length) return this._content.length;
		else if (position.line < 0) return 0;
		let lineOffset = lineOffsets[position.line];
		let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
		return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
	}
	get lineCount() {
		return this.getLineOffsets().length;
	}
};
var Is$1;
(function(Is$2) {
	const toString$1 = Object.prototype.toString;
	function defined(value) {
		return typeof value !== "undefined";
	}
	Is$2.defined = defined;
	function undefined$1(value) {
		return typeof value === "undefined";
	}
	Is$2.undefined = undefined$1;
	function boolean$1(value) {
		return value === true || value === false;
	}
	Is$2.boolean = boolean$1;
	function string$1(value) {
		return toString$1.call(value) === "[object String]";
	}
	Is$2.string = string$1;
	function number$1(value) {
		return toString$1.call(value) === "[object Number]";
	}
	Is$2.number = number$1;
	function numberRange(value, min, max) {
		return toString$1.call(value) === "[object Number]" && min <= value && value <= max;
	}
	Is$2.numberRange = numberRange;
	function integer$1(value) {
		return toString$1.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
	}
	Is$2.integer = integer$1;
	function uinteger$1(value) {
		return toString$1.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
	}
	Is$2.uinteger = uinteger$1;
	function func$1(value) {
		return toString$1.call(value) === "[object Function]";
	}
	Is$2.func = func$1;
	function objectLiteral(value) {
		return value !== null && typeof value === "object";
	}
	Is$2.objectLiteral = objectLiteral;
	function typedArray(value, check) {
		return Array.isArray(value) && value.every(check);
	}
	Is$2.typedArray = typedArray;
})(Is$1 || (Is$1 = {}));
var CstNodeBuilder = class {
	constructor() {
		this.nodeStack = [];
	}
	get current() {
		var _a;
		return (_a = this.nodeStack[this.nodeStack.length - 1]) !== null && _a !== void 0 ? _a : this.rootNode;
	}
	buildRootNode(input) {
		this.rootNode = new RootCstNodeImpl(input);
		this.rootNode.root = this.rootNode;
		this.nodeStack = [this.rootNode];
		return this.rootNode;
	}
	buildCompositeNode(feature) {
		const compositeNode = new CompositeCstNodeImpl();
		compositeNode.grammarSource = feature;
		compositeNode.root = this.rootNode;
		this.current.content.push(compositeNode);
		this.nodeStack.push(compositeNode);
		return compositeNode;
	}
	buildLeafNode(token, feature) {
		const leafNode = new LeafCstNodeImpl(token.startOffset, token.image.length, tokenToRange(token), token.tokenType, !feature);
		leafNode.grammarSource = feature;
		leafNode.root = this.rootNode;
		this.current.content.push(leafNode);
		return leafNode;
	}
	removeNode(node) {
		const parent = node.container;
		if (parent) {
			const index = parent.content.indexOf(node);
			if (index >= 0) parent.content.splice(index, 1);
		}
	}
	addHiddenNodes(tokens) {
		const nodes = [];
		for (const token of tokens) {
			const leafNode = new LeafCstNodeImpl(token.startOffset, token.image.length, tokenToRange(token), token.tokenType, true);
			leafNode.root = this.rootNode;
			nodes.push(leafNode);
		}
		let current = this.current;
		let added = false;
		if (current.content.length > 0) {
			current.content.push(...nodes);
			return;
		}
		while (current.container) {
			const index = current.container.content.indexOf(current);
			if (index > 0) {
				current.container.content.splice(index, 0, ...nodes);
				added = true;
				break;
			}
			current = current.container;
		}
		if (!added) this.rootNode.content.unshift(...nodes);
	}
	construct(item) {
		const current = this.current;
		if (typeof item.$type === "string") this.current.astNode = item;
		item.$cstNode = current;
		const node = this.nodeStack.pop();
		if ((node === null || node === void 0 ? void 0 : node.content.length) === 0) this.removeNode(node);
	}
};
var AbstractCstNode = class {
	get parent() {
		return this.container;
	}
	get feature() {
		return this.grammarSource;
	}
	get hidden() {
		return false;
	}
	get astNode() {
		var _a, _b;
		const node = typeof ((_a = this._astNode) === null || _a === void 0 ? void 0 : _a.$type) === "string" ? this._astNode : (_b = this.container) === null || _b === void 0 ? void 0 : _b.astNode;
		if (!node) throw new Error("This node has no associated AST element");
		return node;
	}
	set astNode(value) {
		this._astNode = value;
	}
	get element() {
		return this.astNode;
	}
	get text() {
		return this.root.fullText.substring(this.offset, this.end);
	}
};
var LeafCstNodeImpl = class extends AbstractCstNode {
	get offset() {
		return this._offset;
	}
	get length() {
		return this._length;
	}
	get end() {
		return this._offset + this._length;
	}
	get hidden() {
		return this._hidden;
	}
	get tokenType() {
		return this._tokenType;
	}
	get range() {
		return this._range;
	}
	constructor(offset, length, range, tokenType, hidden = false) {
		super();
		this._hidden = hidden;
		this._offset = offset;
		this._tokenType = tokenType;
		this._length = length;
		this._range = range;
	}
};
var CompositeCstNodeImpl = class extends AbstractCstNode {
	constructor() {
		super(...arguments);
		this.content = new CstNodeContainer(this);
	}
	get children() {
		return this.content;
	}
	get offset() {
		var _a, _b;
		return (_b = (_a = this.firstNonHiddenNode) === null || _a === void 0 ? void 0 : _a.offset) !== null && _b !== void 0 ? _b : 0;
	}
	get length() {
		return this.end - this.offset;
	}
	get end() {
		var _a, _b;
		return (_b = (_a = this.lastNonHiddenNode) === null || _a === void 0 ? void 0 : _a.end) !== null && _b !== void 0 ? _b : 0;
	}
	get range() {
		const firstNode = this.firstNonHiddenNode;
		const lastNode = this.lastNonHiddenNode;
		if (firstNode && lastNode) {
			if (this._rangeCache === void 0) {
				const { range: firstRange } = firstNode;
				const { range: lastRange } = lastNode;
				this._rangeCache = {
					start: firstRange.start,
					end: lastRange.end.line < firstRange.start.line ? firstRange.start : lastRange.end
				};
			}
			return this._rangeCache;
		} else return {
			start: Position.create(0, 0),
			end: Position.create(0, 0)
		};
	}
	get firstNonHiddenNode() {
		for (const child of this.content) if (!child.hidden) return child;
		return this.content[0];
	}
	get lastNonHiddenNode() {
		for (let i = this.content.length - 1; i >= 0; i--) {
			const child = this.content[i];
			if (!child.hidden) return child;
		}
		return this.content[this.content.length - 1];
	}
};
var CstNodeContainer = class CstNodeContainer extends Array {
	constructor(parent) {
		super();
		this.parent = parent;
		Object.setPrototypeOf(this, CstNodeContainer.prototype);
	}
	push(...items) {
		this.addParents(items);
		return super.push(...items);
	}
	unshift(...items) {
		this.addParents(items);
		return super.unshift(...items);
	}
	splice(start, count, ...items) {
		this.addParents(items);
		return super.splice(start, count, ...items);
	}
	addParents(items) {
		for (const item of items) item.container = this.parent;
	}
};
var RootCstNodeImpl = class extends CompositeCstNodeImpl {
	get text() {
		return this._text.substring(this.offset, this.end);
	}
	get fullText() {
		return this._text;
	}
	constructor(input) {
		super();
		this._text = "";
		this._text = input !== null && input !== void 0 ? input : "";
	}
};
const DatatypeSymbol = Symbol("Datatype");
function isDataTypeNode(node) {
	return node.$type === DatatypeSymbol;
}
const ruleSuffix = "​";
const withRuleSuffix = (name) => name.endsWith(ruleSuffix) ? name : name + ruleSuffix;
var AbstractLangiumParser = class {
	constructor(services) {
		this._unorderedGroups = /* @__PURE__ */ new Map();
		this.allRules = /* @__PURE__ */ new Map();
		this.lexer = services.parser.Lexer;
		const tokens = this.lexer.definition;
		const production = services.LanguageMetaData.mode === "production";
		this.wrapper = new ChevrotainWrapper(tokens, Object.assign(Object.assign({}, services.parser.ParserConfig), {
			skipValidations: production,
			errorMessageProvider: services.parser.ParserErrorMessageProvider
		}));
	}
	alternatives(idx, choices) {
		this.wrapper.wrapOr(idx, choices);
	}
	optional(idx, callback) {
		this.wrapper.wrapOption(idx, callback);
	}
	many(idx, callback) {
		this.wrapper.wrapMany(idx, callback);
	}
	atLeastOne(idx, callback) {
		this.wrapper.wrapAtLeastOne(idx, callback);
	}
	getRule(name) {
		return this.allRules.get(name);
	}
	isRecording() {
		return this.wrapper.IS_RECORDING;
	}
	get unorderedGroups() {
		return this._unorderedGroups;
	}
	getRuleStack() {
		return this.wrapper.RULE_STACK;
	}
	finalize() {
		this.wrapper.wrapSelfAnalysis();
	}
};
var LangiumParser = class extends AbstractLangiumParser {
	get current() {
		return this.stack[this.stack.length - 1];
	}
	constructor(services) {
		super(services);
		this.nodeBuilder = new CstNodeBuilder();
		this.stack = [];
		this.assignmentMap = /* @__PURE__ */ new Map();
		this.linker = services.references.Linker;
		this.converter = services.parser.ValueConverter;
		this.astReflection = services.shared.AstReflection;
	}
	rule(rule, impl) {
		const type = this.computeRuleType(rule);
		const ruleMethod = this.wrapper.DEFINE_RULE(withRuleSuffix(rule.name), this.startImplementation(type, impl).bind(this));
		this.allRules.set(rule.name, ruleMethod);
		if (rule.entry) this.mainRule = ruleMethod;
		return ruleMethod;
	}
	computeRuleType(rule) {
		if (rule.fragment) return void 0;
		else if (isDataTypeRule(rule)) return DatatypeSymbol;
		else {
			const explicit = getExplicitRuleType(rule);
			return explicit !== null && explicit !== void 0 ? explicit : rule.name;
		}
	}
	parse(input, options = {}) {
		this.nodeBuilder.buildRootNode(input);
		const lexerResult = this.lexerResult = this.lexer.tokenize(input);
		this.wrapper.input = lexerResult.tokens;
		const ruleMethod = options.rule ? this.allRules.get(options.rule) : this.mainRule;
		if (!ruleMethod) throw new Error(options.rule ? `No rule found with name '${options.rule}'` : "No main rule available.");
		const result = ruleMethod.call(this.wrapper, {});
		this.nodeBuilder.addHiddenNodes(lexerResult.hidden);
		this.unorderedGroups.clear();
		this.lexerResult = void 0;
		return {
			value: result,
			lexerErrors: lexerResult.errors,
			lexerReport: lexerResult.report,
			parserErrors: this.wrapper.errors
		};
	}
	startImplementation($type, implementation) {
		return (args) => {
			const createNode = !this.isRecording() && $type !== void 0;
			if (createNode) {
				const node = { $type };
				this.stack.push(node);
				if ($type === DatatypeSymbol) node.value = "";
			}
			let result;
			try {
				result = implementation(args);
			} catch (err) {
				result = void 0;
			}
			if (result === void 0 && createNode) result = this.construct();
			return result;
		};
	}
	extractHiddenTokens(token) {
		const hiddenTokens = this.lexerResult.hidden;
		if (!hiddenTokens.length) return [];
		const offset = token.startOffset;
		for (let i = 0; i < hiddenTokens.length; i++) {
			const token$1 = hiddenTokens[i];
			if (token$1.startOffset > offset) return hiddenTokens.splice(0, i);
		}
		return hiddenTokens.splice(0, hiddenTokens.length);
	}
	consume(idx, tokenType, feature) {
		const token = this.wrapper.wrapConsume(idx, tokenType);
		if (!this.isRecording() && this.isValidToken(token)) {
			const hiddenTokens = this.extractHiddenTokens(token);
			this.nodeBuilder.addHiddenNodes(hiddenTokens);
			const leafNode = this.nodeBuilder.buildLeafNode(token, feature);
			const { assignment, isCrossRef } = this.getAssignment(feature);
			const current = this.current;
			if (assignment) {
				const convertedValue = isKeyword(feature) ? token.image : this.converter.convert(token.image, leafNode);
				this.assign(assignment.operator, assignment.feature, convertedValue, leafNode, isCrossRef);
			} else if (isDataTypeNode(current)) {
				let text = token.image;
				if (!isKeyword(feature)) text = this.converter.convert(text, leafNode).toString();
				current.value += text;
			}
		}
	}
	isValidToken(token) {
		return !token.isInsertedInRecovery && !isNaN(token.startOffset) && typeof token.endOffset === "number" && !isNaN(token.endOffset);
	}
	subrule(idx, rule, fragment, feature, args) {
		let cstNode;
		if (!this.isRecording() && !fragment) cstNode = this.nodeBuilder.buildCompositeNode(feature);
		const subruleResult = this.wrapper.wrapSubrule(idx, rule, args);
		if (!this.isRecording() && cstNode && cstNode.length > 0) this.performSubruleAssignment(subruleResult, feature, cstNode);
	}
	performSubruleAssignment(result, feature, cstNode) {
		const { assignment, isCrossRef } = this.getAssignment(feature);
		if (assignment) this.assign(assignment.operator, assignment.feature, result, cstNode, isCrossRef);
		else if (!assignment) {
			const current = this.current;
			if (isDataTypeNode(current)) current.value += result.toString();
			else if (typeof result === "object" && result) {
				const object = this.assignWithoutOverride(result, current);
				const newItem = object;
				this.stack.pop();
				this.stack.push(newItem);
			}
		}
	}
	action($type, action) {
		if (!this.isRecording()) {
			let last = this.current;
			if (action.feature && action.operator) {
				last = this.construct();
				this.nodeBuilder.removeNode(last.$cstNode);
				const node = this.nodeBuilder.buildCompositeNode(action);
				node.content.push(last.$cstNode);
				const newItem = { $type };
				this.stack.push(newItem);
				this.assign(action.operator, action.feature, last, last.$cstNode, false);
			} else last.$type = $type;
		}
	}
	construct() {
		if (this.isRecording()) return void 0;
		const obj = this.current;
		linkContentToContainer(obj);
		this.nodeBuilder.construct(obj);
		this.stack.pop();
		if (isDataTypeNode(obj)) return this.converter.convert(obj.value, obj.$cstNode);
		else assignMandatoryProperties(this.astReflection, obj);
		return obj;
	}
	getAssignment(feature) {
		if (!this.assignmentMap.has(feature)) {
			const assignment = getContainerOfType(feature, isAssignment);
			this.assignmentMap.set(feature, {
				assignment,
				isCrossRef: assignment ? isCrossReference(assignment.terminal) : false
			});
		}
		return this.assignmentMap.get(feature);
	}
	assign(operator, feature, value, cstNode, isCrossRef) {
		const obj = this.current;
		let item;
		if (isCrossRef && typeof value === "string") item = this.linker.buildReference(obj, feature, cstNode, value);
		else item = value;
		switch (operator) {
			case "=":
				obj[feature] = item;
				break;
			case "?=":
				obj[feature] = true;
				break;
			case "+=":
				if (!Array.isArray(obj[feature])) obj[feature] = [];
				obj[feature].push(item);
		}
	}
	assignWithoutOverride(target, source) {
		for (const [name, existingValue] of Object.entries(source)) {
			const newValue = target[name];
			if (newValue === void 0) target[name] = existingValue;
			else if (Array.isArray(newValue) && Array.isArray(existingValue)) {
				existingValue.push(...newValue);
				target[name] = existingValue;
			}
		}
		const targetCstNode = target.$cstNode;
		if (targetCstNode) {
			targetCstNode.astNode = void 0;
			target.$cstNode = void 0;
		}
		return target;
	}
	get definitionErrors() {
		return this.wrapper.definitionErrors;
	}
};
var AbstractParserErrorMessageProvider = class {
	buildMismatchTokenMessage(options) {
		return defaultParserErrorProvider.buildMismatchTokenMessage(options);
	}
	buildNotAllInputParsedMessage(options) {
		return defaultParserErrorProvider.buildNotAllInputParsedMessage(options);
	}
	buildNoViableAltMessage(options) {
		return defaultParserErrorProvider.buildNoViableAltMessage(options);
	}
	buildEarlyExitMessage(options) {
		return defaultParserErrorProvider.buildEarlyExitMessage(options);
	}
};
var LangiumParserErrorMessageProvider = class extends AbstractParserErrorMessageProvider {
	buildMismatchTokenMessage({ expected, actual }) {
		const expectedMsg = expected.LABEL ? "`" + expected.LABEL + "`" : expected.name.endsWith(":KW") ? `keyword '${expected.name.substring(0, expected.name.length - 3)}'` : `token of type '${expected.name}'`;
		return `Expecting ${expectedMsg} but found \`${actual.image}\`.`;
	}
	buildNotAllInputParsedMessage({ firstRedundant }) {
		return `Expecting end of file but found \`${firstRedundant.image}\`.`;
	}
};
var LangiumCompletionParser = class extends AbstractLangiumParser {
	constructor() {
		super(...arguments);
		this.tokens = [];
		this.elementStack = [];
		this.lastElementStack = [];
		this.nextTokenIndex = 0;
		this.stackSize = 0;
	}
	action() {}
	construct() {
		return void 0;
	}
	parse(input) {
		this.resetState();
		const tokens = this.lexer.tokenize(input, { mode: "partial" });
		this.tokens = tokens.tokens;
		this.wrapper.input = [...this.tokens];
		this.mainRule.call(this.wrapper, {});
		this.unorderedGroups.clear();
		return {
			tokens: this.tokens,
			elementStack: [...this.lastElementStack],
			tokenIndex: this.nextTokenIndex
		};
	}
	rule(rule, impl) {
		const ruleMethod = this.wrapper.DEFINE_RULE(withRuleSuffix(rule.name), this.startImplementation(impl).bind(this));
		this.allRules.set(rule.name, ruleMethod);
		if (rule.entry) this.mainRule = ruleMethod;
		return ruleMethod;
	}
	resetState() {
		this.elementStack = [];
		this.lastElementStack = [];
		this.nextTokenIndex = 0;
		this.stackSize = 0;
	}
	startImplementation(implementation) {
		return (args) => {
			const size = this.keepStackSize();
			try {
				implementation(args);
			} finally {
				this.resetStackSize(size);
			}
		};
	}
	removeUnexpectedElements() {
		this.elementStack.splice(this.stackSize);
	}
	keepStackSize() {
		const size = this.elementStack.length;
		this.stackSize = size;
		return size;
	}
	resetStackSize(size) {
		this.removeUnexpectedElements();
		this.stackSize = size;
	}
	consume(idx, tokenType, feature) {
		this.wrapper.wrapConsume(idx, tokenType);
		if (!this.isRecording()) {
			this.lastElementStack = [...this.elementStack, feature];
			this.nextTokenIndex = this.currIdx + 1;
		}
	}
	subrule(idx, rule, fragment, feature, args) {
		this.before(feature);
		this.wrapper.wrapSubrule(idx, rule, args);
		this.after(feature);
	}
	before(element) {
		if (!this.isRecording()) this.elementStack.push(element);
	}
	after(element) {
		if (!this.isRecording()) {
			const index = this.elementStack.lastIndexOf(element);
			if (index >= 0) this.elementStack.splice(index);
		}
	}
	get currIdx() {
		return this.wrapper.currIdx;
	}
};
const defaultConfig = {
	recoveryEnabled: true,
	nodeLocationTracking: "full",
	skipValidations: true,
	errorMessageProvider: new LangiumParserErrorMessageProvider()
};
var ChevrotainWrapper = class extends EmbeddedActionsParser {
	constructor(tokens, config) {
		const useDefaultLookahead = config && "maxLookahead" in config;
		super(tokens, Object.assign(Object.assign(Object.assign({}, defaultConfig), { lookaheadStrategy: useDefaultLookahead ? new LLkLookaheadStrategy({ maxLookahead: config.maxLookahead }) : new LLStarLookaheadStrategy({ logging: config.skipValidations ? () => {} : void 0 }) }), config));
	}
	get IS_RECORDING() {
		return this.RECORDING_PHASE;
	}
	DEFINE_RULE(name, impl) {
		return this.RULE(name, impl);
	}
	wrapSelfAnalysis() {
		this.performSelfAnalysis();
	}
	wrapConsume(idx, tokenType) {
		return this.consume(idx, tokenType);
	}
	wrapSubrule(idx, rule, args) {
		return this.subrule(idx, rule, { ARGS: [args] });
	}
	wrapOr(idx, choices) {
		this.or(idx, choices);
	}
	wrapOption(idx, callback) {
		this.option(idx, callback);
	}
	wrapMany(idx, callback) {
		this.many(idx, callback);
	}
	wrapAtLeastOne(idx, callback) {
		this.atLeastOne(idx, callback);
	}
};
function createParser(grammar, parser, tokens) {
	const parserContext = {
		parser,
		tokens,
		ruleNames: /* @__PURE__ */ new Map()
	};
	buildRules(parserContext, grammar);
	return parser;
}
function buildRules(parserContext, grammar) {
	const reachable = getAllReachableRules(grammar, false);
	const parserRules = stream(grammar.rules).filter(isParserRule).filter((rule) => reachable.has(rule));
	for (const rule of parserRules) {
		const ctx = Object.assign(Object.assign({}, parserContext), {
			consume: 1,
			optional: 1,
			subrule: 1,
			many: 1,
			or: 1
		});
		parserContext.parser.rule(rule, buildElement(ctx, rule.definition));
	}
}
function buildElement(ctx, element, ignoreGuard = false) {
	let method;
	if (isKeyword(element)) method = buildKeyword(ctx, element);
	else if (isAction(element)) method = buildAction(ctx, element);
	else if (isAssignment(element)) method = buildElement(ctx, element.terminal);
	else if (isCrossReference(element)) method = buildCrossReference(ctx, element);
	else if (isRuleCall(element)) method = buildRuleCall(ctx, element);
	else if (isAlternatives(element)) method = buildAlternatives(ctx, element);
	else if (isUnorderedGroup(element)) method = buildUnorderedGroup(ctx, element);
	else if (isGroup(element)) method = buildGroup(ctx, element);
	else if (isEndOfFile(element)) {
		const idx = ctx.consume++;
		method = () => ctx.parser.consume(idx, EOF, element);
	} else throw new ErrorWithLocation(element.$cstNode, `Unexpected element type: ${element.$type}`);
	return wrap(ctx, ignoreGuard ? void 0 : getGuardCondition(element), method, element.cardinality);
}
function buildAction(ctx, action) {
	const actionType = getTypeName(action);
	return () => ctx.parser.action(actionType, action);
}
function buildRuleCall(ctx, ruleCall) {
	const rule = ruleCall.rule.ref;
	if (isParserRule(rule)) {
		const idx = ctx.subrule++;
		const fragment = rule.fragment;
		const predicate = ruleCall.arguments.length > 0 ? buildRuleCallPredicate(rule, ruleCall.arguments) : () => ({});
		return (args) => ctx.parser.subrule(idx, getRule(ctx, rule), fragment, ruleCall, predicate(args));
	} else if (isTerminalRule(rule)) {
		const idx = ctx.consume++;
		const method = getToken(ctx, rule.name);
		return () => ctx.parser.consume(idx, method, ruleCall);
	} else if (!rule) throw new ErrorWithLocation(ruleCall.$cstNode, `Undefined rule: ${ruleCall.rule.$refText}`);
	else assertUnreachable(rule);
}
function buildRuleCallPredicate(rule, namedArgs) {
	const predicates = namedArgs.map((e) => buildPredicate(e.value));
	return (args) => {
		const ruleArgs = {};
		for (let i = 0; i < predicates.length; i++) {
			const ruleTarget = rule.parameters[i];
			const predicate = predicates[i];
			ruleArgs[ruleTarget.name] = predicate(args);
		}
		return ruleArgs;
	};
}
function buildPredicate(condition) {
	if (isDisjunction(condition)) {
		const left = buildPredicate(condition.left);
		const right = buildPredicate(condition.right);
		return (args) => left(args) || right(args);
	} else if (isConjunction(condition)) {
		const left = buildPredicate(condition.left);
		const right = buildPredicate(condition.right);
		return (args) => left(args) && right(args);
	} else if (isNegation(condition)) {
		const value = buildPredicate(condition.value);
		return (args) => !value(args);
	} else if (isParameterReference(condition)) {
		const name = condition.parameter.ref.name;
		return (args) => args !== void 0 && args[name] === true;
	} else if (isBooleanLiteral(condition)) {
		const value = Boolean(condition.true);
		return () => value;
	}
	assertUnreachable(condition);
}
function buildAlternatives(ctx, alternatives) {
	if (alternatives.elements.length === 1) return buildElement(ctx, alternatives.elements[0]);
	else {
		const methods = [];
		for (const element of alternatives.elements) {
			const predicatedMethod = { ALT: buildElement(ctx, element, true) };
			const guard = getGuardCondition(element);
			if (guard) predicatedMethod.GATE = buildPredicate(guard);
			methods.push(predicatedMethod);
		}
		const idx = ctx.or++;
		return (args) => ctx.parser.alternatives(idx, methods.map((method) => {
			const alt = { ALT: () => method.ALT(args) };
			const gate = method.GATE;
			if (gate) alt.GATE = () => gate(args);
			return alt;
		}));
	}
}
function buildUnorderedGroup(ctx, group) {
	if (group.elements.length === 1) return buildElement(ctx, group.elements[0]);
	const methods = [];
	for (const element of group.elements) {
		const predicatedMethod = { ALT: buildElement(ctx, element, true) };
		const guard = getGuardCondition(element);
		if (guard) predicatedMethod.GATE = buildPredicate(guard);
		methods.push(predicatedMethod);
	}
	const orIdx = ctx.or++;
	const idFunc = (groupIdx, lParser) => {
		const stackId = lParser.getRuleStack().join("-");
		return `uGroup_${groupIdx}_${stackId}`;
	};
	const alternatives = (args) => ctx.parser.alternatives(orIdx, methods.map((method, idx) => {
		const alt = { ALT: () => true };
		const parser = ctx.parser;
		alt.ALT = () => {
			method.ALT(args);
			if (!parser.isRecording()) {
				const key = idFunc(orIdx, parser);
				if (!parser.unorderedGroups.get(key)) parser.unorderedGroups.set(key, []);
				const groupState = parser.unorderedGroups.get(key);
				if (typeof (groupState === null || groupState === void 0 ? void 0 : groupState[idx]) === "undefined") groupState[idx] = true;
			}
		};
		const gate = method.GATE;
		if (gate) alt.GATE = () => gate(args);
		else alt.GATE = () => {
			const trackedAlternatives = parser.unorderedGroups.get(idFunc(orIdx, parser));
			const allow = !(trackedAlternatives === null || trackedAlternatives === void 0 ? void 0 : trackedAlternatives[idx]);
			return allow;
		};
		return alt;
	}));
	const wrapped = wrap(ctx, getGuardCondition(group), alternatives, "*");
	return (args) => {
		wrapped(args);
		if (!ctx.parser.isRecording()) ctx.parser.unorderedGroups.delete(idFunc(orIdx, ctx.parser));
	};
}
function buildGroup(ctx, group) {
	const methods = group.elements.map((e) => buildElement(ctx, e));
	return (args) => methods.forEach((method) => method(args));
}
function getGuardCondition(element) {
	if (isGroup(element)) return element.guardCondition;
	return void 0;
}
function buildCrossReference(ctx, crossRef, terminal = crossRef.terminal) {
	if (!terminal) {
		if (!crossRef.type.ref) throw new Error("Could not resolve reference to type: " + crossRef.type.$refText);
		const assignment = findNameAssignment(crossRef.type.ref);
		const assignTerminal = assignment === null || assignment === void 0 ? void 0 : assignment.terminal;
		if (!assignTerminal) throw new Error("Could not find name assignment for type: " + getTypeName(crossRef.type.ref));
		return buildCrossReference(ctx, crossRef, assignTerminal);
	} else if (isRuleCall(terminal) && isParserRule(terminal.rule.ref)) {
		const rule = terminal.rule.ref;
		const idx = ctx.subrule++;
		return (args) => ctx.parser.subrule(idx, getRule(ctx, rule), false, crossRef, args);
	} else if (isRuleCall(terminal) && isTerminalRule(terminal.rule.ref)) {
		const idx = ctx.consume++;
		const terminalRule = getToken(ctx, terminal.rule.ref.name);
		return () => ctx.parser.consume(idx, terminalRule, crossRef);
	} else if (isKeyword(terminal)) {
		const idx = ctx.consume++;
		const keyword = getToken(ctx, terminal.value);
		return () => ctx.parser.consume(idx, keyword, crossRef);
	} else throw new Error("Could not build cross reference parser");
}
function buildKeyword(ctx, keyword) {
	const idx = ctx.consume++;
	const token = ctx.tokens[keyword.value];
	if (!token) throw new Error("Could not find token for keyword: " + keyword.value);
	return () => ctx.parser.consume(idx, token, keyword);
}
function wrap(ctx, guard, method, cardinality) {
	const gate = guard && buildPredicate(guard);
	if (!cardinality) if (gate) {
		const idx = ctx.or++;
		return (args) => ctx.parser.alternatives(idx, [{
			ALT: () => method(args),
			GATE: () => gate(args)
		}, {
			ALT: EMPTY_ALT(),
			GATE: () => !gate(args)
		}]);
	} else return method;
	if (cardinality === "*") {
		const idx = ctx.many++;
		return (args) => ctx.parser.many(idx, {
			DEF: () => method(args),
			GATE: gate ? () => gate(args) : void 0
		});
	} else if (cardinality === "+") {
		const idx = ctx.many++;
		if (gate) {
			const orIdx = ctx.or++;
			return (args) => ctx.parser.alternatives(orIdx, [{
				ALT: () => ctx.parser.atLeastOne(idx, { DEF: () => method(args) }),
				GATE: () => gate(args)
			}, {
				ALT: EMPTY_ALT(),
				GATE: () => !gate(args)
			}]);
		} else return (args) => ctx.parser.atLeastOne(idx, { DEF: () => method(args) });
	} else if (cardinality === "?") {
		const idx = ctx.optional++;
		return (args) => ctx.parser.optional(idx, {
			DEF: () => method(args),
			GATE: gate ? () => gate(args) : void 0
		});
	} else assertUnreachable(cardinality);
}
function getRule(ctx, element) {
	const name = getRuleName(ctx, element);
	const rule = ctx.parser.getRule(name);
	if (!rule) throw new Error(`Rule "${name}" not found."`);
	return rule;
}
function getRuleName(ctx, element) {
	if (isParserRule(element)) return element.name;
	else if (ctx.ruleNames.has(element)) return ctx.ruleNames.get(element);
	else {
		let item = element;
		let parent = item.$container;
		let ruleName = element.$type;
		while (!isParserRule(parent)) {
			if (isGroup(parent) || isAlternatives(parent) || isUnorderedGroup(parent)) {
				const index = parent.elements.indexOf(item);
				ruleName = index.toString() + ":" + ruleName;
			}
			item = parent;
			parent = parent.$container;
		}
		const rule = parent;
		ruleName = rule.name + ":" + ruleName;
		ctx.ruleNames.set(element, ruleName);
		return ruleName;
	}
}
function getToken(ctx, name) {
	const token = ctx.tokens[name];
	if (!token) throw new Error(`Token "${name}" not found."`);
	return token;
}
function createCompletionParser(services) {
	const grammar = services.Grammar;
	const lexer = services.parser.Lexer;
	const parser = new LangiumCompletionParser(services);
	createParser(grammar, parser, lexer.definition);
	parser.finalize();
	return parser;
}
function createLangiumParser(services) {
	const parser = prepareLangiumParser(services);
	parser.finalize();
	return parser;
}
function prepareLangiumParser(services) {
	const grammar = services.Grammar;
	const lexer = services.parser.Lexer;
	const parser = new LangiumParser(services);
	return createParser(grammar, parser, lexer.definition);
}
var DefaultTokenBuilder = class {
	constructor() {
		this.diagnostics = [];
	}
	buildTokens(grammar, options) {
		const reachableRules = stream(getAllReachableRules(grammar, false));
		const terminalTokens = this.buildTerminalTokens(reachableRules);
		const tokens = this.buildKeywordTokens(reachableRules, terminalTokens, options);
		terminalTokens.forEach((terminalToken) => {
			const pattern = terminalToken.PATTERN;
			if (typeof pattern === "object" && pattern && "test" in pattern && isWhitespace(pattern)) tokens.unshift(terminalToken);
			else tokens.push(terminalToken);
		});
		return tokens;
	}
	flushLexingReport(text) {
		return { diagnostics: this.popDiagnostics() };
	}
	popDiagnostics() {
		const diagnostics = [...this.diagnostics];
		this.diagnostics = [];
		return diagnostics;
	}
	buildTerminalTokens(rules) {
		return rules.filter(isTerminalRule).filter((e) => !e.fragment).map((terminal) => this.buildTerminalToken(terminal)).toArray();
	}
	buildTerminalToken(terminal) {
		const regex = terminalRegex(terminal);
		const pattern = this.requiresCustomPattern(regex) ? this.regexPatternFunction(regex) : regex;
		const tokenType = {
			name: terminal.name,
			PATTERN: pattern
		};
		if (typeof pattern === "function") tokenType.LINE_BREAKS = true;
		if (terminal.hidden) tokenType.GROUP = isWhitespace(regex) ? Lexer.SKIPPED : "hidden";
		return tokenType;
	}
	requiresCustomPattern(regex) {
		if (regex.flags.includes("u") || regex.flags.includes("s")) return true;
		else if (regex.source.includes("?<=") || regex.source.includes("?<!")) return true;
		else return false;
	}
	regexPatternFunction(regex) {
		const stickyRegex = new RegExp(regex, regex.flags + "y");
		return (text, offset) => {
			stickyRegex.lastIndex = offset;
			const execResult = stickyRegex.exec(text);
			return execResult;
		};
	}
	buildKeywordTokens(rules, terminalTokens, options) {
		return rules.filter(isParserRule).flatMap((rule) => streamAllContents(rule).filter(isKeyword)).distinct((e) => e.value).toArray().sort((a, b) => b.value.length - a.value.length).map((keyword) => this.buildKeywordToken(keyword, terminalTokens, Boolean(options === null || options === void 0 ? void 0 : options.caseInsensitive)));
	}
	buildKeywordToken(keyword, terminalTokens, caseInsensitive) {
		const keywordPattern = this.buildKeywordPattern(keyword, caseInsensitive);
		const tokenType = {
			name: keyword.value,
			PATTERN: keywordPattern,
			LONGER_ALT: this.findLongerAlt(keyword, terminalTokens)
		};
		if (typeof keywordPattern === "function") tokenType.LINE_BREAKS = true;
		return tokenType;
	}
	buildKeywordPattern(keyword, caseInsensitive) {
		return caseInsensitive ? new RegExp(getCaseInsensitivePattern(keyword.value)) : keyword.value;
	}
	findLongerAlt(keyword, terminalTokens) {
		return terminalTokens.reduce((longerAlts, token) => {
			const pattern = token === null || token === void 0 ? void 0 : token.PATTERN;
			if ((pattern === null || pattern === void 0 ? void 0 : pattern.source) && partialMatches("^" + pattern.source + "$", keyword.value)) longerAlts.push(token);
			return longerAlts;
		}, []);
	}
};
var DefaultValueConverter = class {
	convert(input, cstNode) {
		let feature = cstNode.grammarSource;
		if (isCrossReference(feature)) feature = getCrossReferenceTerminal(feature);
		if (isRuleCall(feature)) {
			const rule = feature.rule.ref;
			if (!rule) throw new Error("This cst node was not parsed by a rule.");
			return this.runConverter(rule, input, cstNode);
		}
		return input;
	}
	runConverter(rule, input, cstNode) {
		var _a;
		switch (rule.name.toUpperCase()) {
			case "INT": return ValueConverter.convertInt(input);
			case "STRING": return ValueConverter.convertString(input);
			case "ID": return ValueConverter.convertID(input);
		}
		switch ((_a = getRuleType(rule)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) {
			case "number": return ValueConverter.convertNumber(input);
			case "boolean": return ValueConverter.convertBoolean(input);
			case "bigint": return ValueConverter.convertBigint(input);
			case "date": return ValueConverter.convertDate(input);
			default: return input;
		}
	}
};
var ValueConverter;
(function(ValueConverter$1) {
	function convertString(input) {
		let result = "";
		for (let i = 1; i < input.length - 1; i++) {
			const c = input.charAt(i);
			if (c === "\\") {
				const c1 = input.charAt(++i);
				result += convertEscapeCharacter(c1);
			} else result += c;
		}
		return result;
	}
	ValueConverter$1.convertString = convertString;
	function convertEscapeCharacter(char) {
		switch (char) {
			case "b": return "\b";
			case "f": return "\f";
			case "n": return "\n";
			case "r": return "\r";
			case "t": return "	";
			case "v": return "\v";
			case "0": return "\0";
			default: return char;
		}
	}
	function convertID(input) {
		if (input.charAt(0) === "^") return input.substring(1);
		else return input;
	}
	ValueConverter$1.convertID = convertID;
	function convertInt(input) {
		return parseInt(input);
	}
	ValueConverter$1.convertInt = convertInt;
	function convertBigint(input) {
		return BigInt(input);
	}
	ValueConverter$1.convertBigint = convertBigint;
	function convertDate(input) {
		return new Date(input);
	}
	ValueConverter$1.convertDate = convertDate;
	function convertNumber(input) {
		return Number(input);
	}
	ValueConverter$1.convertNumber = convertNumber;
	function convertBoolean(input) {
		return input.toLowerCase() === "true";
	}
	ValueConverter$1.convertBoolean = convertBoolean;
})(ValueConverter || (ValueConverter = {}));
var require_ral = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	let _ral;
	function RAL() {
		if (_ral === void 0) throw new Error(`No runtime abstraction layer installed`);
		return _ral;
	}
	(function(RAL$1) {
		function install(ral) {
			if (ral === void 0) throw new Error(`No runtime abstraction layer provided`);
			_ral = ral;
		}
		RAL$1.install = install;
	})(RAL || (RAL = {}));
	exports.default = RAL;
}));
var require_is = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function boolean(value) {
		return value === true || value === false;
	}
	exports.boolean = boolean;
	function string(value) {
		return typeof value === "string" || value instanceof String;
	}
	exports.string = string;
	function number(value) {
		return typeof value === "number" || value instanceof Number;
	}
	exports.number = number;
	function error(value) {
		return value instanceof Error;
	}
	exports.error = error;
	function func(value) {
		return typeof value === "function";
	}
	exports.func = func;
	function array(value) {
		return Array.isArray(value);
	}
	exports.array = array;
	function stringArray(value) {
		return array(value) && value.every((elem) => string(elem));
	}
	exports.stringArray = stringArray;
}));
var require_events = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const ral_1$1 = require_ral();
	var Event;
	(function(Event$1) {
		const _disposable = { dispose() {} };
		Event$1.None = function() {
			return _disposable;
		};
	})(Event || (exports.Event = Event = {}));
	var CallbackList = class {
		add(callback, context = null, bucket) {
			if (!this._callbacks) {
				this._callbacks = [];
				this._contexts = [];
			}
			this._callbacks.push(callback);
			this._contexts.push(context);
			if (Array.isArray(bucket)) bucket.push({ dispose: () => this.remove(callback, context) });
		}
		remove(callback, context = null) {
			if (!this._callbacks) return;
			let foundCallbackWithDifferentContext = false;
			for (let i = 0, len = this._callbacks.length; i < len; i++) if (this._callbacks[i] === callback) if (this._contexts[i] === context) {
				this._callbacks.splice(i, 1);
				this._contexts.splice(i, 1);
				return;
			} else foundCallbackWithDifferentContext = true;
			if (foundCallbackWithDifferentContext) throw new Error("When adding a listener with a context, you should remove it with the same context");
		}
		invoke(...args) {
			if (!this._callbacks) return [];
			const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
			for (let i = 0, len = callbacks.length; i < len; i++) try {
				ret.push(callbacks[i].apply(contexts[i], args));
			} catch (e) {
				(0, ral_1$1.default)().console.error(e);
			}
			return ret;
		}
		isEmpty() {
			return !this._callbacks || this._callbacks.length === 0;
		}
		dispose() {
			this._callbacks = void 0;
			this._contexts = void 0;
		}
	};
	var Emitter$2 = class Emitter$2 {
		constructor(_options) {
			this._options = _options;
		}
		get event() {
			if (!this._event) this._event = (listener, thisArgs, disposables) => {
				if (!this._callbacks) this._callbacks = new CallbackList();
				if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) this._options.onFirstListenerAdd(this);
				this._callbacks.add(listener, thisArgs);
				const result = { dispose: () => {
					if (!this._callbacks) return;
					this._callbacks.remove(listener, thisArgs);
					result.dispose = Emitter$2._noop;
					if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) this._options.onLastListenerRemove(this);
				} };
				if (Array.isArray(disposables)) disposables.push(result);
				return result;
			};
			return this._event;
		}
		fire(event) {
			if (this._callbacks) this._callbacks.invoke.call(this._callbacks, event);
		}
		dispose() {
			if (this._callbacks) {
				this._callbacks.dispose();
				this._callbacks = void 0;
			}
		}
	};
	exports.Emitter = Emitter$2;
	Emitter$2._noop = function() {};
}));
var require_cancellation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const ral_1 = require_ral();
	const Is = require_is();
	const events_1 = require_events();
	var CancellationToken$10;
	(function(CancellationToken$11) {
		CancellationToken$11.None = Object.freeze({
			isCancellationRequested: false,
			onCancellationRequested: events_1.Event.None
		});
		CancellationToken$11.Cancelled = Object.freeze({
			isCancellationRequested: true,
			onCancellationRequested: events_1.Event.None
		});
		function is(value) {
			const candidate = value;
			return candidate && (candidate === CancellationToken$11.None || candidate === CancellationToken$11.Cancelled || Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
		}
		CancellationToken$11.is = is;
	})(CancellationToken$10 || (exports.CancellationToken = CancellationToken$10 = {}));
	const shortcutEvent = Object.freeze(function(callback, context) {
		const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
		return { dispose() {
			handle.dispose();
		} };
	});
	var MutableToken = class {
		constructor() {
			this._isCancelled = false;
		}
		cancel() {
			if (!this._isCancelled) {
				this._isCancelled = true;
				if (this._emitter) {
					this._emitter.fire(void 0);
					this.dispose();
				}
			}
		}
		get isCancellationRequested() {
			return this._isCancelled;
		}
		get onCancellationRequested() {
			if (this._isCancelled) return shortcutEvent;
			if (!this._emitter) this._emitter = new events_1.Emitter();
			return this._emitter.event;
		}
		dispose() {
			if (this._emitter) {
				this._emitter.dispose();
				this._emitter = void 0;
			}
		}
	};
	var CancellationTokenSource$2 = class {
		get token() {
			if (!this._token) this._token = new MutableToken();
			return this._token;
		}
		cancel() {
			if (!this._token) this._token = CancellationToken$10.Cancelled;
			else this._token.cancel();
		}
		dispose() {
			if (!this._token) this._token = CancellationToken$10.None;
			else if (this._token instanceof MutableToken) this._token.dispose();
		}
	};
	exports.CancellationTokenSource = CancellationTokenSource$2;
}));
var cancellation_exports = {};
__reExport(cancellation_exports, /* @__PURE__ */ __toESM(require_cancellation()));
function delayNextTick() {
	return new Promise((resolve) => {
		if (typeof setImmediate === "undefined") setTimeout(resolve, 0);
		else setImmediate(resolve);
	});
}
let lastTick = 0;
let globalInterruptionPeriod = 10;
function startCancelableOperation() {
	lastTick = performance.now();
	return new cancellation_exports.CancellationTokenSource();
}
function setInterruptionPeriod(period) {
	globalInterruptionPeriod = period;
}
const OperationCancelled = Symbol("OperationCancelled");
function isOperationCancelled(err) {
	return err === OperationCancelled;
}
async function interruptAndCheck(token) {
	if (token === cancellation_exports.CancellationToken.None) return;
	const current = performance.now();
	if (current - lastTick >= globalInterruptionPeriod) {
		lastTick = current;
		await delayNextTick();
		lastTick = performance.now();
	}
	if (token.isCancellationRequested) throw OperationCancelled;
}
var Deferred = class {
	constructor() {
		this.promise = new Promise((resolve, reject$1) => {
			this.resolve = (arg) => {
				resolve(arg);
				return this;
			};
			this.reject = (err) => {
				reject$1(err);
				return this;
			};
		});
	}
};
var FullTextDocument = class FullTextDocument {
	constructor(uri, languageId, version, content) {
		this._uri = uri;
		this._languageId = languageId;
		this._version = version;
		this._content = content;
		this._lineOffsets = void 0;
	}
	get uri() {
		return this._uri;
	}
	get languageId() {
		return this._languageId;
	}
	get version() {
		return this._version;
	}
	getText(range) {
		if (range) {
			const start = this.offsetAt(range.start);
			const end = this.offsetAt(range.end);
			return this._content.substring(start, end);
		}
		return this._content;
	}
	update(changes, version) {
		for (const change of changes) if (FullTextDocument.isIncremental(change)) {
			const range = getWellformedRange(change.range);
			const startOffset = this.offsetAt(range.start);
			const endOffset = this.offsetAt(range.end);
			this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
			const startLine = Math.max(range.start.line, 0);
			const endLine = Math.max(range.end.line, 0);
			let lineOffsets = this._lineOffsets;
			const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
			if (endLine - startLine === addedLineOffsets.length) for (let i = 0, len = addedLineOffsets.length; i < len; i++) lineOffsets[i + startLine + 1] = addedLineOffsets[i];
			else if (addedLineOffsets.length < 1e4) lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
			else this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
			const diff = change.text.length - (endOffset - startOffset);
			if (diff !== 0) for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) lineOffsets[i] = lineOffsets[i] + diff;
		} else if (FullTextDocument.isFull(change)) {
			this._content = change.text;
			this._lineOffsets = void 0;
		} else throw new Error("Unknown change event received");
		this._version = version;
	}
	getLineOffsets() {
		if (this._lineOffsets === void 0) this._lineOffsets = computeLineOffsets(this._content, true);
		return this._lineOffsets;
	}
	positionAt(offset) {
		offset = Math.max(Math.min(offset, this._content.length), 0);
		const lineOffsets = this.getLineOffsets();
		let low = 0, high = lineOffsets.length;
		if (high === 0) return {
			line: 0,
			character: offset
		};
		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if (lineOffsets[mid] > offset) high = mid;
			else low = mid + 1;
		}
		const line = low - 1;
		offset = this.ensureBeforeEOL(offset, lineOffsets[line]);
		return {
			line,
			character: offset - lineOffsets[line]
		};
	}
	offsetAt(position) {
		const lineOffsets = this.getLineOffsets();
		if (position.line >= lineOffsets.length) return this._content.length;
		else if (position.line < 0) return 0;
		const lineOffset = lineOffsets[position.line];
		if (position.character <= 0) return lineOffset;
		const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
		const offset = Math.min(lineOffset + position.character, nextLineOffset);
		return this.ensureBeforeEOL(offset, lineOffset);
	}
	ensureBeforeEOL(offset, lineOffset) {
		while (offset > lineOffset && isEOL(this._content.charCodeAt(offset - 1))) offset--;
		return offset;
	}
	get lineCount() {
		return this.getLineOffsets().length;
	}
	static isIncremental(event) {
		const candidate = event;
		return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
	}
	static isFull(event) {
		const candidate = event;
		return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
	}
};
var TextDocument;
(function(TextDocument$2) {
	function create(uri, languageId, version, content) {
		return new FullTextDocument(uri, languageId, version, content);
	}
	TextDocument$2.create = create;
	function update(document, changes, version) {
		if (document instanceof FullTextDocument) {
			document.update(changes, version);
			return document;
		} else throw new Error("TextDocument.update: document must be created by TextDocument.create");
	}
	TextDocument$2.update = update;
	function applyEdits(document, edits) {
		const text = document.getText();
		const sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
			const diff = a.range.start.line - b.range.start.line;
			if (diff === 0) return a.range.start.character - b.range.start.character;
			return diff;
		});
		let lastModifiedOffset = 0;
		const spans = [];
		for (const e of sortedEdits) {
			const startOffset = document.offsetAt(e.range.start);
			if (startOffset < lastModifiedOffset) throw new Error("Overlapping edit");
			else if (startOffset > lastModifiedOffset) spans.push(text.substring(lastModifiedOffset, startOffset));
			if (e.newText.length) spans.push(e.newText);
			lastModifiedOffset = document.offsetAt(e.range.end);
		}
		spans.push(text.substr(lastModifiedOffset));
		return spans.join("");
	}
	TextDocument$2.applyEdits = applyEdits;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare) {
	if (data.length <= 1) return data;
	const p = data.length / 2 | 0;
	const left = data.slice(0, p);
	const right = data.slice(p);
	mergeSort(left, compare);
	mergeSort(right, compare);
	let leftIdx = 0;
	let rightIdx = 0;
	let i = 0;
	while (leftIdx < left.length && rightIdx < right.length) {
		const ret = compare(left[leftIdx], right[rightIdx]);
		if (ret <= 0) data[i++] = left[leftIdx++];
		else data[i++] = right[rightIdx++];
	}
	while (leftIdx < left.length) data[i++] = left[leftIdx++];
	while (rightIdx < right.length) data[i++] = right[rightIdx++];
	return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
	const result = isAtLineStart ? [textOffset] : [];
	for (let i = 0; i < text.length; i++) {
		const ch = text.charCodeAt(i);
		if (isEOL(ch)) {
			if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) i++;
			result.push(textOffset + i + 1);
		}
	}
	return result;
}
function isEOL(char) {
	return char === 13 || char === 10;
}
function getWellformedRange(range) {
	const start = range.start;
	const end = range.end;
	if (start.line > end.line || start.line === end.line && start.character > end.character) return {
		start: end,
		end: start
	};
	return range;
}
function getWellformedEdit(textEdit) {
	const range = getWellformedRange(textEdit.range);
	if (range !== textEdit.range) return {
		newText: textEdit.newText,
		range
	};
	return textEdit;
}
var LIB;
(() => {
	var t = { 470: (t$1) => {
		function e$1(t$2) {
			if ("string" != typeof t$2) throw new TypeError("Path must be a string. Received " + JSON.stringify(t$2));
		}
		function r$1(t$2, e$2) {
			for (var r$2, n$2 = "", i = 0, o = -1, s = 0, h = 0; h <= t$2.length; ++h) {
				if (h < t$2.length) r$2 = t$2.charCodeAt(h);
				else {
					if (47 === r$2) break;
					r$2 = 47;
				}
				if (47 === r$2) {
					if (o === h - 1 || 1 === s);
					else if (o !== h - 1 && 2 === s) {
						if (n$2.length < 2 || 2 !== i || 46 !== n$2.charCodeAt(n$2.length - 1) || 46 !== n$2.charCodeAt(n$2.length - 2)) {
							if (n$2.length > 2) {
								var a = n$2.lastIndexOf("/");
								if (a !== n$2.length - 1) {
									-1 === a ? (n$2 = "", i = 0) : i = (n$2 = n$2.slice(0, a)).length - 1 - n$2.lastIndexOf("/"), o = h, s = 0;
									continue;
								}
							} else if (2 === n$2.length || 1 === n$2.length) {
								n$2 = "", i = 0, o = h, s = 0;
								continue;
							}
						}
						e$2 && (n$2.length > 0 ? n$2 += "/.." : n$2 = "..", i = 2);
					} else n$2.length > 0 ? n$2 += "/" + t$2.slice(o + 1, h) : n$2 = t$2.slice(o + 1, h), i = h - o - 1;
					o = h, s = 0;
				} else 46 === r$2 && -1 !== s ? ++s : s = -1;
			}
			return n$2;
		}
		var n$1 = {
			resolve: function() {
				for (var t$2, n$2 = "", i = !1, o = arguments.length - 1; o >= -1 && !i; o--) {
					var s;
					o >= 0 ? s = arguments[o] : (void 0 === t$2 && (t$2 = process.cwd()), s = t$2), e$1(s), 0 !== s.length && (n$2 = s + "/" + n$2, i = 47 === s.charCodeAt(0));
				}
				return n$2 = r$1(n$2, !i), i ? n$2.length > 0 ? "/" + n$2 : "/" : n$2.length > 0 ? n$2 : ".";
			},
			normalize: function(t$2) {
				if (e$1(t$2), 0 === t$2.length) return ".";
				var n$2 = 47 === t$2.charCodeAt(0), i = 47 === t$2.charCodeAt(t$2.length - 1);
				return 0 !== (t$2 = r$1(t$2, !n$2)).length || n$2 || (t$2 = "."), t$2.length > 0 && i && (t$2 += "/"), n$2 ? "/" + t$2 : t$2;
			},
			isAbsolute: function(t$2) {
				return e$1(t$2), t$2.length > 0 && 47 === t$2.charCodeAt(0);
			},
			join: function() {
				if (0 === arguments.length) return ".";
				for (var t$2, r$2 = 0; r$2 < arguments.length; ++r$2) {
					var i = arguments[r$2];
					e$1(i), i.length > 0 && (void 0 === t$2 ? t$2 = i : t$2 += "/" + i);
				}
				return void 0 === t$2 ? "." : n$1.normalize(t$2);
			},
			relative: function(t$2, r$2) {
				if (e$1(t$2), e$1(r$2), t$2 === r$2) return "";
				if ((t$2 = n$1.resolve(t$2)) === (r$2 = n$1.resolve(r$2))) return "";
				for (var i = 1; i < t$2.length && 47 === t$2.charCodeAt(i); ++i);
				for (var o = t$2.length, s = o - i, h = 1; h < r$2.length && 47 === r$2.charCodeAt(h); ++h);
				for (var a = r$2.length - h, c = s < a ? s : a, f = -1, u = 0; u <= c; ++u) {
					if (u === c) {
						if (a > c) {
							if (47 === r$2.charCodeAt(h + u)) return r$2.slice(h + u + 1);
							if (0 === u) return r$2.slice(h + u);
						} else s > c && (47 === t$2.charCodeAt(i + u) ? f = u : 0 === u && (f = 0));
						break;
					}
					var l = t$2.charCodeAt(i + u);
					if (l !== r$2.charCodeAt(h + u)) break;
					47 === l && (f = u);
				}
				var g = "";
				for (u = i + f + 1; u <= o; ++u) u !== o && 47 !== t$2.charCodeAt(u) || (0 === g.length ? g += ".." : g += "/..");
				return g.length > 0 ? g + r$2.slice(h + f) : (h += f, 47 === r$2.charCodeAt(h) && ++h, r$2.slice(h));
			},
			_makeLong: function(t$2) {
				return t$2;
			},
			dirname: function(t$2) {
				if (e$1(t$2), 0 === t$2.length) return ".";
				for (var r$2 = t$2.charCodeAt(0), n$2 = 47 === r$2, i = -1, o = !0, s = t$2.length - 1; s >= 1; --s) if (47 === (r$2 = t$2.charCodeAt(s))) {
					if (!o) {
						i = s;
						break;
					}
				} else o = !1;
				return -1 === i ? n$2 ? "/" : "." : n$2 && 1 === i ? "//" : t$2.slice(0, i);
			},
			basename: function(t$2, r$2) {
				if (void 0 !== r$2 && "string" != typeof r$2) throw new TypeError("\"ext\" argument must be a string");
				e$1(t$2);
				var n$2, i = 0, o = -1, s = !0;
				if (void 0 !== r$2 && r$2.length > 0 && r$2.length <= t$2.length) {
					if (r$2.length === t$2.length && r$2 === t$2) return "";
					var h = r$2.length - 1, a = -1;
					for (n$2 = t$2.length - 1; n$2 >= 0; --n$2) {
						var c = t$2.charCodeAt(n$2);
						if (47 === c) {
							if (!s) {
								i = n$2 + 1;
								break;
							}
						} else -1 === a && (s = !1, a = n$2 + 1), h >= 0 && (c === r$2.charCodeAt(h) ? -1 == --h && (o = n$2) : (h = -1, o = a));
					}
					return i === o ? o = a : -1 === o && (o = t$2.length), t$2.slice(i, o);
				}
				for (n$2 = t$2.length - 1; n$2 >= 0; --n$2) if (47 === t$2.charCodeAt(n$2)) {
					if (!s) {
						i = n$2 + 1;
						break;
					}
				} else -1 === o && (s = !1, o = n$2 + 1);
				return -1 === o ? "" : t$2.slice(i, o);
			},
			extname: function(t$2) {
				e$1(t$2);
				for (var r$2 = -1, n$2 = 0, i = -1, o = !0, s = 0, h = t$2.length - 1; h >= 0; --h) {
					var a = t$2.charCodeAt(h);
					if (47 !== a) -1 === i && (o = !1, i = h + 1), 46 === a ? -1 === r$2 ? r$2 = h : 1 !== s && (s = 1) : -1 !== r$2 && (s = -1);
					else if (!o) {
						n$2 = h + 1;
						break;
					}
				}
				return -1 === r$2 || -1 === i || 0 === s || 1 === s && r$2 === i - 1 && r$2 === n$2 + 1 ? "" : t$2.slice(r$2, i);
			},
			format: function(t$2) {
				if (null === t$2 || "object" != typeof t$2) throw new TypeError("The \"pathObject\" argument must be of type Object. Received type " + typeof t$2);
				return function(t$3, e$2) {
					var r$2 = e$2.dir || e$2.root, n$2 = e$2.base || (e$2.name || "") + (e$2.ext || "");
					return r$2 ? r$2 === e$2.root ? r$2 + n$2 : r$2 + "/" + n$2 : n$2;
				}(0, t$2);
			},
			parse: function(t$2) {
				e$1(t$2);
				var r$2 = {
					root: "",
					dir: "",
					base: "",
					ext: "",
					name: ""
				};
				if (0 === t$2.length) return r$2;
				var n$2, i = t$2.charCodeAt(0), o = 47 === i;
				o ? (r$2.root = "/", n$2 = 1) : n$2 = 0;
				for (var s = -1, h = 0, a = -1, c = !0, f = t$2.length - 1, u = 0; f >= n$2; --f) if (47 !== (i = t$2.charCodeAt(f))) -1 === a && (c = !1, a = f + 1), 46 === i ? -1 === s ? s = f : 1 !== u && (u = 1) : -1 !== s && (u = -1);
				else if (!c) {
					h = f + 1;
					break;
				}
				return -1 === s || -1 === a || 0 === u || 1 === u && s === a - 1 && s === h + 1 ? -1 !== a && (r$2.base = r$2.name = 0 === h && o ? t$2.slice(1, a) : t$2.slice(h, a)) : (0 === h && o ? (r$2.name = t$2.slice(1, s), r$2.base = t$2.slice(1, a)) : (r$2.name = t$2.slice(h, s), r$2.base = t$2.slice(h, a)), r$2.ext = t$2.slice(s, a)), h > 0 ? r$2.dir = t$2.slice(0, h - 1) : o && (r$2.dir = "/"), r$2;
			},
			sep: "/",
			delimiter: ":",
			win32: null,
			posix: null
		};
		n$1.posix = n$1, t$1.exports = n$1;
	} }, e = {};
	function r(n$1) {
		var i = e[n$1];
		if (void 0 !== i) return i.exports;
		var o = e[n$1] = { exports: {} };
		return t[n$1](o, o.exports, r), o.exports;
	}
	r.d = (t$1, e$1) => {
		for (var n$1 in e$1) r.o(e$1, n$1) && !r.o(t$1, n$1) && Object.defineProperty(t$1, n$1, {
			enumerable: !0,
			get: e$1[n$1]
		});
	}, r.o = (t$1, e$1) => Object.prototype.hasOwnProperty.call(t$1, e$1), r.r = (t$1) => {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t$1, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t$1, "__esModule", { value: !0 });
	};
	var n = {};
	(() => {
		let t$1;
		if (r.r(n), r.d(n, {
			URI: () => f,
			Utils: () => P
		}), "object" == typeof process) t$1 = "win32" === process.platform;
		else if ("object" == typeof navigator) {
			let e$2 = navigator.userAgent;
			t$1 = e$2.indexOf("Windows") >= 0;
		}
		const e$1 = /^\w[\w\d+.-]*$/, i = /^\//, o = /^\/\//;
		function s(t$2, r$1) {
			if (!t$2.scheme && r$1) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${t$2.authority}", path: "${t$2.path}", query: "${t$2.query}", fragment: "${t$2.fragment}"}`);
			if (t$2.scheme && !e$1.test(t$2.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
			if (t$2.path) {
				if (t$2.authority) {
					if (!i.test(t$2.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
				} else if (o.test(t$2.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
			}
		}
		const h = "", a = "/", c = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
		class f {
			static isUri(t$2) {
				return t$2 instanceof f || !!t$2 && "string" == typeof t$2.authority && "string" == typeof t$2.fragment && "string" == typeof t$2.path && "string" == typeof t$2.query && "string" == typeof t$2.scheme && "string" == typeof t$2.fsPath && "function" == typeof t$2.with && "function" == typeof t$2.toString;
			}
			scheme;
			authority;
			path;
			query;
			fragment;
			constructor(t$2, e$2, r$1, n$1, i$1, o$1 = !1) {
				"object" == typeof t$2 ? (this.scheme = t$2.scheme || h, this.authority = t$2.authority || h, this.path = t$2.path || h, this.query = t$2.query || h, this.fragment = t$2.fragment || h) : (this.scheme = function(t$3, e$3) {
					return t$3 || e$3 ? t$3 : "file";
				}(t$2, o$1), this.authority = e$2 || h, this.path = function(t$3, e$3) {
					switch (t$3) {
						case "https":
						case "http":
						case "file": e$3 ? e$3[0] !== a && (e$3 = a + e$3) : e$3 = a;
					}
					return e$3;
				}(this.scheme, r$1 || h), this.query = n$1 || h, this.fragment = i$1 || h, s(this, o$1));
			}
			get fsPath() {
				return m(this, !1);
			}
			with(t$2) {
				if (!t$2) return this;
				let { scheme: e$2, authority: r$1, path: n$1, query: i$1, fragment: o$1 } = t$2;
				return void 0 === e$2 ? e$2 = this.scheme : null === e$2 && (e$2 = h), void 0 === r$1 ? r$1 = this.authority : null === r$1 && (r$1 = h), void 0 === n$1 ? n$1 = this.path : null === n$1 && (n$1 = h), void 0 === i$1 ? i$1 = this.query : null === i$1 && (i$1 = h), void 0 === o$1 ? o$1 = this.fragment : null === o$1 && (o$1 = h), e$2 === this.scheme && r$1 === this.authority && n$1 === this.path && i$1 === this.query && o$1 === this.fragment ? this : new l(e$2, r$1, n$1, i$1, o$1);
			}
			static parse(t$2, e$2 = !1) {
				const r$1 = c.exec(t$2);
				return r$1 ? new l(r$1[2] || h, C(r$1[4] || h), C(r$1[5] || h), C(r$1[7] || h), C(r$1[9] || h), e$2) : new l(h, h, h, h, h);
			}
			static file(e$2) {
				let r$1 = h;
				if (t$1 && (e$2 = e$2.replace(/\\/g, a)), e$2[0] === a && e$2[1] === a) {
					const t$2 = e$2.indexOf(a, 2);
					-1 === t$2 ? (r$1 = e$2.substring(2), e$2 = a) : (r$1 = e$2.substring(2, t$2), e$2 = e$2.substring(t$2) || a);
				}
				return new l("file", r$1, e$2, h, h);
			}
			static from(t$2) {
				const e$2 = new l(t$2.scheme, t$2.authority, t$2.path, t$2.query, t$2.fragment);
				return s(e$2, !0), e$2;
			}
			toString(t$2 = !1) {
				return y(this, t$2);
			}
			toJSON() {
				return this;
			}
			static revive(t$2) {
				if (t$2) {
					if (t$2 instanceof f) return t$2;
					{
						const e$2 = new l(t$2);
						return e$2._formatted = t$2.external, e$2._fsPath = t$2._sep === u ? t$2.fsPath : null, e$2;
					}
				}
				return t$2;
			}
		}
		const u = t$1 ? 1 : void 0;
		class l extends f {
			_formatted = null;
			_fsPath = null;
			get fsPath() {
				return this._fsPath || (this._fsPath = m(this, !1)), this._fsPath;
			}
			toString(t$2 = !1) {
				return t$2 ? y(this, !0) : (this._formatted || (this._formatted = y(this, !1)), this._formatted);
			}
			toJSON() {
				const t$2 = { $mid: 1 };
				return this._fsPath && (t$2.fsPath = this._fsPath, t$2._sep = u), this._formatted && (t$2.external = this._formatted), this.path && (t$2.path = this.path), this.scheme && (t$2.scheme = this.scheme), this.authority && (t$2.authority = this.authority), this.query && (t$2.query = this.query), this.fragment && (t$2.fragment = this.fragment), t$2;
			}
		}
		const g = {
			58: "%3A",
			47: "%2F",
			63: "%3F",
			35: "%23",
			91: "%5B",
			93: "%5D",
			64: "%40",
			33: "%21",
			36: "%24",
			38: "%26",
			39: "%27",
			40: "%28",
			41: "%29",
			42: "%2A",
			43: "%2B",
			44: "%2C",
			59: "%3B",
			61: "%3D",
			32: "%20"
		};
		function d(t$2, e$2, r$1) {
			let n$1, i$1 = -1;
			for (let o$1 = 0; o$1 < t$2.length; o$1++) {
				const s$1 = t$2.charCodeAt(o$1);
				if (s$1 >= 97 && s$1 <= 122 || s$1 >= 65 && s$1 <= 90 || s$1 >= 48 && s$1 <= 57 || 45 === s$1 || 46 === s$1 || 95 === s$1 || 126 === s$1 || e$2 && 47 === s$1 || r$1 && 91 === s$1 || r$1 && 93 === s$1 || r$1 && 58 === s$1) -1 !== i$1 && (n$1 += encodeURIComponent(t$2.substring(i$1, o$1)), i$1 = -1), void 0 !== n$1 && (n$1 += t$2.charAt(o$1));
				else {
					void 0 === n$1 && (n$1 = t$2.substr(0, o$1));
					const e$3 = g[s$1];
					void 0 !== e$3 ? (-1 !== i$1 && (n$1 += encodeURIComponent(t$2.substring(i$1, o$1)), i$1 = -1), n$1 += e$3) : -1 === i$1 && (i$1 = o$1);
				}
			}
			return -1 !== i$1 && (n$1 += encodeURIComponent(t$2.substring(i$1))), void 0 !== n$1 ? n$1 : t$2;
		}
		function p(t$2) {
			let e$2;
			for (let r$1 = 0; r$1 < t$2.length; r$1++) {
				const n$1 = t$2.charCodeAt(r$1);
				35 === n$1 || 63 === n$1 ? (void 0 === e$2 && (e$2 = t$2.substr(0, r$1)), e$2 += g[n$1]) : void 0 !== e$2 && (e$2 += t$2[r$1]);
			}
			return void 0 !== e$2 ? e$2 : t$2;
		}
		function m(e$2, r$1) {
			let n$1;
			return n$1 = e$2.authority && e$2.path.length > 1 && "file" === e$2.scheme ? `//${e$2.authority}${e$2.path}` : 47 === e$2.path.charCodeAt(0) && (e$2.path.charCodeAt(1) >= 65 && e$2.path.charCodeAt(1) <= 90 || e$2.path.charCodeAt(1) >= 97 && e$2.path.charCodeAt(1) <= 122) && 58 === e$2.path.charCodeAt(2) ? r$1 ? e$2.path.substr(1) : e$2.path[1].toLowerCase() + e$2.path.substr(2) : e$2.path, t$1 && (n$1 = n$1.replace(/\//g, "\\")), n$1;
		}
		function y(t$2, e$2) {
			const r$1 = e$2 ? p : d;
			let n$1 = "", { scheme: i$1, authority: o$1, path: s$1, query: h$1, fragment: c$1 } = t$2;
			if (i$1 && (n$1 += i$1, n$1 += ":"), (o$1 || "file" === i$1) && (n$1 += a, n$1 += a), o$1) {
				let t$3 = o$1.indexOf("@");
				if (-1 !== t$3) {
					const e$3 = o$1.substr(0, t$3);
					o$1 = o$1.substr(t$3 + 1), t$3 = e$3.lastIndexOf(":"), -1 === t$3 ? n$1 += r$1(e$3, !1, !1) : (n$1 += r$1(e$3.substr(0, t$3), !1, !1), n$1 += ":", n$1 += r$1(e$3.substr(t$3 + 1), !1, !0)), n$1 += "@";
				}
				o$1 = o$1.toLowerCase(), t$3 = o$1.lastIndexOf(":"), -1 === t$3 ? n$1 += r$1(o$1, !1, !0) : (n$1 += r$1(o$1.substr(0, t$3), !1, !0), n$1 += o$1.substr(t$3));
			}
			if (s$1) {
				if (s$1.length >= 3 && 47 === s$1.charCodeAt(0) && 58 === s$1.charCodeAt(2)) {
					const t$3 = s$1.charCodeAt(1);
					t$3 >= 65 && t$3 <= 90 && (s$1 = `/${String.fromCharCode(t$3 + 32)}:${s$1.substr(3)}`);
				} else if (s$1.length >= 2 && 58 === s$1.charCodeAt(1)) {
					const t$3 = s$1.charCodeAt(0);
					t$3 >= 65 && t$3 <= 90 && (s$1 = `${String.fromCharCode(t$3 + 32)}:${s$1.substr(2)}`);
				}
				n$1 += r$1(s$1, !0, !1);
			}
			return h$1 && (n$1 += "?", n$1 += r$1(h$1, !1, !1)), c$1 && (n$1 += "#", n$1 += e$2 ? c$1 : d(c$1, !1, !1)), n$1;
		}
		function v(t$2) {
			try {
				return decodeURIComponent(t$2);
			} catch {
				return t$2.length > 3 ? t$2.substr(0, 3) + v(t$2.substr(3)) : t$2;
			}
		}
		const b = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
		function C(t$2) {
			return t$2.match(b) ? t$2.replace(b, ((t$3) => v(t$3))) : t$2;
		}
		var A = r(470);
		const w = A.posix || A, x = "/";
		var P;
		(function(t$2) {
			t$2.joinPath = function(t$3, ...e$2) {
				return t$3.with({ path: w.join(t$3.path, ...e$2) });
			}, t$2.resolvePath = function(t$3, ...e$2) {
				let r$1 = t$3.path, n$1 = !1;
				r$1[0] !== x && (r$1 = x + r$1, n$1 = !0);
				let i$1 = w.resolve(r$1, ...e$2);
				return n$1 && i$1[0] === x && !t$3.authority && (i$1 = i$1.substring(1)), t$3.with({ path: i$1 });
			}, t$2.dirname = function(t$3) {
				if (0 === t$3.path.length || t$3.path === x) return t$3;
				let e$2 = w.dirname(t$3.path);
				return 1 === e$2.length && 46 === e$2.charCodeAt(0) && (e$2 = ""), t$3.with({ path: e$2 });
			}, t$2.basename = function(t$3) {
				return w.basename(t$3.path);
			}, t$2.extname = function(t$3) {
				return w.extname(t$3.path);
			};
		})(P || (P = {}));
	})(), LIB = n;
})();
const { URI, Utils } = LIB;
var UriUtils;
(function(UriUtils$1) {
	UriUtils$1.basename = Utils.basename;
	UriUtils$1.dirname = Utils.dirname;
	UriUtils$1.extname = Utils.extname;
	UriUtils$1.joinPath = Utils.joinPath;
	UriUtils$1.resolvePath = Utils.resolvePath;
	function equals(a, b) {
		return (a === null || a === void 0 ? void 0 : a.toString()) === (b === null || b === void 0 ? void 0 : b.toString());
	}
	UriUtils$1.equals = equals;
	function relative(from, to) {
		const fromPath = typeof from === "string" ? from : from.path;
		const toPath = typeof to === "string" ? to : to.path;
		const fromParts = fromPath.split("/").filter((e) => e.length > 0);
		const toParts = toPath.split("/").filter((e) => e.length > 0);
		let i = 0;
		for (; i < fromParts.length; i++) if (fromParts[i] !== toParts[i]) break;
		const backPart = "../".repeat(fromParts.length - i);
		const toPart = toParts.slice(i).join("/");
		return backPart + toPart;
	}
	UriUtils$1.relative = relative;
	function normalize(uri) {
		return URI.parse(uri.toString()).toString();
	}
	UriUtils$1.normalize = normalize;
})(UriUtils || (UriUtils = {}));
var DocumentState;
(function(DocumentState$1) {
	DocumentState$1[DocumentState$1["Changed"] = 0] = "Changed";
	DocumentState$1[DocumentState$1["Parsed"] = 1] = "Parsed";
	DocumentState$1[DocumentState$1["IndexedContent"] = 2] = "IndexedContent";
	DocumentState$1[DocumentState$1["ComputedScopes"] = 3] = "ComputedScopes";
	DocumentState$1[DocumentState$1["Linked"] = 4] = "Linked";
	DocumentState$1[DocumentState$1["IndexedReferences"] = 5] = "IndexedReferences";
	DocumentState$1[DocumentState$1["Validated"] = 6] = "Validated";
})(DocumentState || (DocumentState = {}));
var DefaultLangiumDocumentFactory = class {
	constructor(services) {
		this.serviceRegistry = services.ServiceRegistry;
		this.textDocuments = services.workspace.TextDocuments;
		this.fileSystemProvider = services.workspace.FileSystemProvider;
	}
	async fromUri(uri, cancellationToken = cancellation_exports.CancellationToken.None) {
		const content = await this.fileSystemProvider.readFile(uri);
		return this.createAsync(uri, content, cancellationToken);
	}
	fromTextDocument(textDocument, uri, token) {
		uri = uri !== null && uri !== void 0 ? uri : URI.parse(textDocument.uri);
		if (cancellation_exports.CancellationToken.is(token)) return this.createAsync(uri, textDocument, token);
		else return this.create(uri, textDocument, token);
	}
	fromString(text, uri, token) {
		if (cancellation_exports.CancellationToken.is(token)) return this.createAsync(uri, text, token);
		else return this.create(uri, text, token);
	}
	fromModel(model, uri) {
		return this.create(uri, { $model: model });
	}
	create(uri, content, options) {
		if (typeof content === "string") {
			const parseResult = this.parse(uri, content, options);
			return this.createLangiumDocument(parseResult, uri, void 0, content);
		} else if ("$model" in content) {
			const parseResult = {
				value: content.$model,
				parserErrors: [],
				lexerErrors: []
			};
			return this.createLangiumDocument(parseResult, uri);
		} else {
			const parseResult = this.parse(uri, content.getText(), options);
			return this.createLangiumDocument(parseResult, uri, content);
		}
	}
	async createAsync(uri, content, cancelToken) {
		if (typeof content === "string") {
			const parseResult = await this.parseAsync(uri, content, cancelToken);
			return this.createLangiumDocument(parseResult, uri, void 0, content);
		} else {
			const parseResult = await this.parseAsync(uri, content.getText(), cancelToken);
			return this.createLangiumDocument(parseResult, uri, content);
		}
	}
	createLangiumDocument(parseResult, uri, textDocument, text) {
		let document;
		if (textDocument) document = {
			parseResult,
			uri,
			state: DocumentState.Parsed,
			references: [],
			textDocument
		};
		else {
			const textDocumentGetter = this.createTextDocumentGetter(uri, text);
			document = {
				parseResult,
				uri,
				state: DocumentState.Parsed,
				references: [],
				get textDocument() {
					return textDocumentGetter();
				}
			};
		}
		parseResult.value.$document = document;
		return document;
	}
	async update(document, cancellationToken) {
		var _a, _b;
		const oldText = (_a = document.parseResult.value.$cstNode) === null || _a === void 0 ? void 0 : _a.root.fullText;
		const textDocument = (_b = this.textDocuments) === null || _b === void 0 ? void 0 : _b.get(document.uri.toString());
		const text = textDocument ? textDocument.getText() : await this.fileSystemProvider.readFile(document.uri);
		if (textDocument) Object.defineProperty(document, "textDocument", { value: textDocument });
		else {
			const textDocumentGetter = this.createTextDocumentGetter(document.uri, text);
			Object.defineProperty(document, "textDocument", { get: textDocumentGetter });
		}
		if (oldText !== text) {
			document.parseResult = await this.parseAsync(document.uri, text, cancellationToken);
			document.parseResult.value.$document = document;
		}
		document.state = DocumentState.Parsed;
		return document;
	}
	parse(uri, text, options) {
		const services = this.serviceRegistry.getServices(uri);
		return services.parser.LangiumParser.parse(text, options);
	}
	parseAsync(uri, text, cancellationToken) {
		const services = this.serviceRegistry.getServices(uri);
		return services.parser.AsyncParser.parse(text, cancellationToken);
	}
	createTextDocumentGetter(uri, text) {
		const serviceRegistry = this.serviceRegistry;
		let textDoc = void 0;
		return () => {
			return textDoc !== null && textDoc !== void 0 ? textDoc : textDoc = TextDocument.create(uri.toString(), serviceRegistry.getServices(uri).LanguageMetaData.languageId, 0, text !== null && text !== void 0 ? text : "");
		};
	}
};
var DefaultLangiumDocuments = class {
	constructor(services) {
		this.documentMap = /* @__PURE__ */ new Map();
		this.langiumDocumentFactory = services.workspace.LangiumDocumentFactory;
		this.serviceRegistry = services.ServiceRegistry;
	}
	get all() {
		return stream(this.documentMap.values());
	}
	addDocument(document) {
		const uriString = document.uri.toString();
		if (this.documentMap.has(uriString)) throw new Error(`A document with the URI '${uriString}' is already present.`);
		this.documentMap.set(uriString, document);
	}
	getDocument(uri) {
		const uriString = uri.toString();
		return this.documentMap.get(uriString);
	}
	async getOrCreateDocument(uri, cancellationToken) {
		let document = this.getDocument(uri);
		if (document) return document;
		document = await this.langiumDocumentFactory.fromUri(uri, cancellationToken);
		this.addDocument(document);
		return document;
	}
	createDocument(uri, text, cancellationToken) {
		if (cancellationToken) return this.langiumDocumentFactory.fromString(text, uri, cancellationToken).then((document) => {
			this.addDocument(document);
			return document;
		});
		else {
			const document = this.langiumDocumentFactory.fromString(text, uri);
			this.addDocument(document);
			return document;
		}
	}
	hasDocument(uri) {
		return this.documentMap.has(uri.toString());
	}
	invalidateDocument(uri) {
		const uriString = uri.toString();
		const langiumDoc = this.documentMap.get(uriString);
		if (langiumDoc) {
			const linker = this.serviceRegistry.getServices(uri).references.Linker;
			linker.unlink(langiumDoc);
			langiumDoc.state = DocumentState.Changed;
			langiumDoc.precomputedScopes = void 0;
			langiumDoc.diagnostics = void 0;
		}
		return langiumDoc;
	}
	deleteDocument(uri) {
		const uriString = uri.toString();
		const langiumDoc = this.documentMap.get(uriString);
		if (langiumDoc) {
			langiumDoc.state = DocumentState.Changed;
			this.documentMap.delete(uriString);
		}
		return langiumDoc;
	}
};
const ref_resolving = Symbol("ref_resolving");
var DefaultLinker = class {
	constructor(services) {
		this.reflection = services.shared.AstReflection;
		this.langiumDocuments = () => services.shared.workspace.LangiumDocuments;
		this.scopeProvider = services.references.ScopeProvider;
		this.astNodeLocator = services.workspace.AstNodeLocator;
	}
	async link(document, cancelToken = cancellation_exports.CancellationToken.None) {
		for (const node of streamAst(document.parseResult.value)) {
			await interruptAndCheck(cancelToken);
			streamReferences(node).forEach((ref) => this.doLink(ref, document));
		}
	}
	doLink(refInfo, document) {
		var _a;
		const ref = refInfo.reference;
		if (ref._ref === void 0) {
			ref._ref = ref_resolving;
			try {
				const description = this.getCandidate(refInfo);
				if (isLinkingError(description)) ref._ref = description;
				else {
					ref._nodeDescription = description;
					if (this.langiumDocuments().hasDocument(description.documentUri)) {
						const linkedNode = this.loadAstNode(description);
						ref._ref = linkedNode !== null && linkedNode !== void 0 ? linkedNode : this.createLinkingError(refInfo, description);
					} else ref._ref = void 0;
				}
			} catch (err) {
				console.error(`An error occurred while resolving reference to '${ref.$refText}':`, err);
				const errorMessage = (_a = err.message) !== null && _a !== void 0 ? _a : String(err);
				ref._ref = Object.assign(Object.assign({}, refInfo), { message: `An error occurred while resolving reference to '${ref.$refText}': ${errorMessage}` });
			}
			document.references.push(ref);
		}
	}
	unlink(document) {
		for (const ref of document.references) {
			delete ref._ref;
			delete ref._nodeDescription;
		}
		document.references = [];
	}
	getCandidate(refInfo) {
		const scope = this.scopeProvider.getScope(refInfo);
		const description = scope.getElement(refInfo.reference.$refText);
		return description !== null && description !== void 0 ? description : this.createLinkingError(refInfo);
	}
	buildReference(node, property, refNode, refText) {
		const linker = this;
		const reference = {
			$refNode: refNode,
			$refText: refText,
			get ref() {
				var _a;
				if (isAstNode(this._ref)) return this._ref;
				else if (isAstNodeDescription(this._nodeDescription)) {
					const linkedNode = linker.loadAstNode(this._nodeDescription);
					this._ref = linkedNode !== null && linkedNode !== void 0 ? linkedNode : linker.createLinkingError({
						reference,
						container: node,
						property
					}, this._nodeDescription);
				} else if (this._ref === void 0) {
					this._ref = ref_resolving;
					const document = findRootNode(node).$document;
					const refData = linker.getLinkedNode({
						reference,
						container: node,
						property
					});
					if (refData.error && document && document.state < DocumentState.ComputedScopes) return this._ref = void 0;
					this._ref = (_a = refData.node) !== null && _a !== void 0 ? _a : refData.error;
					this._nodeDescription = refData.descr;
					document === null || document === void 0 || document.references.push(this);
				} else if (this._ref === ref_resolving) throw new Error(`Cyclic reference resolution detected: ${linker.astNodeLocator.getAstNodePath(node)}/${property} (symbol '${refText}')`);
				return isAstNode(this._ref) ? this._ref : void 0;
			},
			get $nodeDescription() {
				return this._nodeDescription;
			},
			get error() {
				return isLinkingError(this._ref) ? this._ref : void 0;
			}
		};
		return reference;
	}
	getLinkedNode(refInfo) {
		var _a;
		try {
			const description = this.getCandidate(refInfo);
			if (isLinkingError(description)) return { error: description };
			const linkedNode = this.loadAstNode(description);
			if (linkedNode) return {
				node: linkedNode,
				descr: description
			};
			else return {
				descr: description,
				error: this.createLinkingError(refInfo, description)
			};
		} catch (err) {
			console.error(`An error occurred while resolving reference to '${refInfo.reference.$refText}':`, err);
			const errorMessage = (_a = err.message) !== null && _a !== void 0 ? _a : String(err);
			return { error: Object.assign(Object.assign({}, refInfo), { message: `An error occurred while resolving reference to '${refInfo.reference.$refText}': ${errorMessage}` }) };
		}
	}
	loadAstNode(nodeDescription) {
		if (nodeDescription.node) return nodeDescription.node;
		const doc = this.langiumDocuments().getDocument(nodeDescription.documentUri);
		if (!doc) return void 0;
		return this.astNodeLocator.getAstNode(doc.parseResult.value, nodeDescription.path);
	}
	createLinkingError(refInfo, targetDescription) {
		const document = findRootNode(refInfo.container).$document;
		if (document && document.state < DocumentState.ComputedScopes) console.warn(`Attempted reference resolution before document reached ComputedScopes state (${document.uri}).`);
		const referenceType = this.reflection.getReferenceType(refInfo);
		return Object.assign(Object.assign({}, refInfo), {
			message: `Could not resolve reference to ${referenceType} named '${refInfo.reference.$refText}'.`,
			targetDescription
		});
	}
};
function isNamed(node) {
	return typeof node.name === "string";
}
var DefaultNameProvider = class {
	getName(node) {
		if (isNamed(node)) return node.name;
		return void 0;
	}
	getNameNode(node) {
		return findNodeForProperty(node.$cstNode, "name");
	}
};
var DefaultReferences = class {
	constructor(services) {
		this.nameProvider = services.references.NameProvider;
		this.index = services.shared.workspace.IndexManager;
		this.nodeLocator = services.workspace.AstNodeLocator;
	}
	findDeclaration(sourceCstNode) {
		if (sourceCstNode) {
			const assignment = findAssignment(sourceCstNode);
			const nodeElem = sourceCstNode.astNode;
			if (assignment && nodeElem) {
				const reference = nodeElem[assignment.feature];
				if (isReference(reference)) return reference.ref;
				else if (Array.isArray(reference)) {
					for (const ref of reference) if (isReference(ref) && ref.$refNode && ref.$refNode.offset <= sourceCstNode.offset && ref.$refNode.end >= sourceCstNode.end) return ref.ref;
				}
			}
			if (nodeElem) {
				const nameNode = this.nameProvider.getNameNode(nodeElem);
				if (nameNode && (nameNode === sourceCstNode || isChildNode(sourceCstNode, nameNode))) return nodeElem;
			}
		}
		return void 0;
	}
	findDeclarationNode(sourceCstNode) {
		const astNode = this.findDeclaration(sourceCstNode);
		if (astNode === null || astNode === void 0 ? void 0 : astNode.$cstNode) {
			const targetNode = this.nameProvider.getNameNode(astNode);
			return targetNode !== null && targetNode !== void 0 ? targetNode : astNode.$cstNode;
		}
		return void 0;
	}
	findReferences(targetNode, options) {
		const refs = [];
		if (options.includeDeclaration) {
			const ref = this.getReferenceToSelf(targetNode);
			if (ref) refs.push(ref);
		}
		let indexReferences = this.index.findAllReferences(targetNode, this.nodeLocator.getAstNodePath(targetNode));
		if (options.documentUri) indexReferences = indexReferences.filter((ref) => UriUtils.equals(ref.sourceUri, options.documentUri));
		refs.push(...indexReferences);
		return stream(refs);
	}
	getReferenceToSelf(targetNode) {
		const nameNode = this.nameProvider.getNameNode(targetNode);
		if (nameNode) {
			const doc = getDocument(targetNode);
			const path = this.nodeLocator.getAstNodePath(targetNode);
			return {
				sourceUri: doc.uri,
				sourcePath: path,
				targetUri: doc.uri,
				targetPath: path,
				segment: toDocumentSegment(nameNode),
				local: true
			};
		}
		return void 0;
	}
};
var MultiMap = class {
	constructor(elements) {
		this.map = /* @__PURE__ */ new Map();
		if (elements) for (const [key, value] of elements) this.add(key, value);
	}
	get size() {
		return Reduction.sum(stream(this.map.values()).map((a) => a.length));
	}
	clear() {
		this.map.clear();
	}
	delete(key, value) {
		if (value === void 0) return this.map.delete(key);
		else {
			const values = this.map.get(key);
			if (values) {
				const index = values.indexOf(value);
				if (index >= 0) {
					if (values.length === 1) this.map.delete(key);
					else values.splice(index, 1);
					return true;
				}
			}
			return false;
		}
	}
	get(key) {
		var _a;
		return (_a = this.map.get(key)) !== null && _a !== void 0 ? _a : [];
	}
	has(key, value) {
		if (value === void 0) return this.map.has(key);
		else {
			const values = this.map.get(key);
			if (values) return values.indexOf(value) >= 0;
			return false;
		}
	}
	add(key, value) {
		if (this.map.has(key)) this.map.get(key).push(value);
		else this.map.set(key, [value]);
		return this;
	}
	addAll(key, values) {
		if (this.map.has(key)) this.map.get(key).push(...values);
		else this.map.set(key, Array.from(values));
		return this;
	}
	forEach(callbackfn) {
		this.map.forEach((array$1, key) => array$1.forEach((value) => callbackfn(value, key, this)));
	}
	[Symbol.iterator]() {
		return this.entries().iterator();
	}
	entries() {
		return stream(this.map.entries()).flatMap(([key, array$1]) => array$1.map((value) => [key, value]));
	}
	keys() {
		return stream(this.map.keys());
	}
	values() {
		return stream(this.map.values()).flat();
	}
	entriesGroupedByKey() {
		return stream(this.map.entries());
	}
};
var BiMap = class {
	get size() {
		return this.map.size;
	}
	constructor(elements) {
		this.map = /* @__PURE__ */ new Map();
		this.inverse = /* @__PURE__ */ new Map();
		if (elements) for (const [key, value] of elements) this.set(key, value);
	}
	clear() {
		this.map.clear();
		this.inverse.clear();
	}
	set(key, value) {
		this.map.set(key, value);
		this.inverse.set(value, key);
		return this;
	}
	get(key) {
		return this.map.get(key);
	}
	getKey(value) {
		return this.inverse.get(value);
	}
	delete(key) {
		const value = this.map.get(key);
		if (value !== void 0) {
			this.map.delete(key);
			this.inverse.delete(value);
			return true;
		}
		return false;
	}
};
var DefaultScopeComputation = class {
	constructor(services) {
		this.nameProvider = services.references.NameProvider;
		this.descriptions = services.workspace.AstNodeDescriptionProvider;
	}
	async computeExports(document, cancelToken = cancellation_exports.CancellationToken.None) {
		return this.computeExportsForNode(document.parseResult.value, document, void 0, cancelToken);
	}
	async computeExportsForNode(parentNode, document, children = streamContents, cancelToken = cancellation_exports.CancellationToken.None) {
		const exports$1 = [];
		this.exportNode(parentNode, exports$1, document);
		for (const node of children(parentNode)) {
			await interruptAndCheck(cancelToken);
			this.exportNode(node, exports$1, document);
		}
		return exports$1;
	}
	exportNode(node, exports$1, document) {
		const name = this.nameProvider.getName(node);
		if (name) exports$1.push(this.descriptions.createDescription(node, name, document));
	}
	async computeLocalScopes(document, cancelToken = cancellation_exports.CancellationToken.None) {
		const rootNode = document.parseResult.value;
		const scopes = new MultiMap();
		for (const node of streamAllContents(rootNode)) {
			await interruptAndCheck(cancelToken);
			this.processNode(node, document, scopes);
		}
		return scopes;
	}
	processNode(node, document, scopes) {
		const container = node.$container;
		if (container) {
			const name = this.nameProvider.getName(node);
			if (name) scopes.add(container, this.descriptions.createDescription(node, name, document));
		}
	}
};
var StreamScope = class {
	constructor(elements, outerScope, options) {
		var _a;
		this.elements = elements;
		this.outerScope = outerScope;
		this.caseInsensitive = (_a = options === null || options === void 0 ? void 0 : options.caseInsensitive) !== null && _a !== void 0 ? _a : false;
	}
	getAllElements() {
		if (this.outerScope) return this.elements.concat(this.outerScope.getAllElements());
		else return this.elements;
	}
	getElement(name) {
		const local = this.caseInsensitive ? this.elements.find((e) => e.name.toLowerCase() === name.toLowerCase()) : this.elements.find((e) => e.name === name);
		if (local) return local;
		if (this.outerScope) return this.outerScope.getElement(name);
		return void 0;
	}
};
var MapScope = class {
	constructor(elements, outerScope, options) {
		var _a;
		this.elements = /* @__PURE__ */ new Map();
		this.caseInsensitive = (_a = options === null || options === void 0 ? void 0 : options.caseInsensitive) !== null && _a !== void 0 ? _a : false;
		for (const element of elements) {
			const name = this.caseInsensitive ? element.name.toLowerCase() : element.name;
			this.elements.set(name, element);
		}
		this.outerScope = outerScope;
	}
	getElement(name) {
		const localName = this.caseInsensitive ? name.toLowerCase() : name;
		const local = this.elements.get(localName);
		if (local) return local;
		if (this.outerScope) return this.outerScope.getElement(name);
		return void 0;
	}
	getAllElements() {
		let elementStream = stream(this.elements.values());
		if (this.outerScope) elementStream = elementStream.concat(this.outerScope.getAllElements());
		return elementStream;
	}
};
const EMPTY_SCOPE = {
	getElement() {
		return void 0;
	},
	getAllElements() {
		return EMPTY_STREAM;
	}
};
var DisposableCache = class {
	constructor() {
		this.toDispose = [];
		this.isDisposed = false;
	}
	onDispose(disposable) {
		this.toDispose.push(disposable);
	}
	dispose() {
		this.throwIfDisposed();
		this.clear();
		this.isDisposed = true;
		this.toDispose.forEach((disposable) => disposable.dispose());
	}
	throwIfDisposed() {
		if (this.isDisposed) throw new Error("This cache has already been disposed");
	}
};
var SimpleCache = class extends DisposableCache {
	constructor() {
		super(...arguments);
		this.cache = /* @__PURE__ */ new Map();
	}
	has(key) {
		this.throwIfDisposed();
		return this.cache.has(key);
	}
	set(key, value) {
		this.throwIfDisposed();
		this.cache.set(key, value);
	}
	get(key, provider) {
		this.throwIfDisposed();
		if (this.cache.has(key)) return this.cache.get(key);
		else if (provider) {
			const value = provider();
			this.cache.set(key, value);
			return value;
		} else return void 0;
	}
	delete(key) {
		this.throwIfDisposed();
		return this.cache.delete(key);
	}
	clear() {
		this.throwIfDisposed();
		this.cache.clear();
	}
};
var ContextCache = class extends DisposableCache {
	constructor(converter) {
		super();
		this.cache = /* @__PURE__ */ new Map();
		this.converter = converter !== null && converter !== void 0 ? converter : ((value) => value);
	}
	has(contextKey, key) {
		this.throwIfDisposed();
		return this.cacheForContext(contextKey).has(key);
	}
	set(contextKey, key, value) {
		this.throwIfDisposed();
		this.cacheForContext(contextKey).set(key, value);
	}
	get(contextKey, key, provider) {
		this.throwIfDisposed();
		const contextCache = this.cacheForContext(contextKey);
		if (contextCache.has(key)) return contextCache.get(key);
		else if (provider) {
			const value = provider();
			contextCache.set(key, value);
			return value;
		} else return void 0;
	}
	delete(contextKey, key) {
		this.throwIfDisposed();
		return this.cacheForContext(contextKey).delete(key);
	}
	clear(contextKey) {
		this.throwIfDisposed();
		if (contextKey) {
			const mapKey = this.converter(contextKey);
			this.cache.delete(mapKey);
		} else this.cache.clear();
	}
	cacheForContext(contextKey) {
		const mapKey = this.converter(contextKey);
		let documentCache = this.cache.get(mapKey);
		if (!documentCache) {
			documentCache = /* @__PURE__ */ new Map();
			this.cache.set(mapKey, documentCache);
		}
		return documentCache;
	}
};
var DocumentCache = class extends ContextCache {
	constructor(sharedServices, state) {
		super((uri) => uri.toString());
		if (state) {
			this.toDispose.push(sharedServices.workspace.DocumentBuilder.onDocumentPhase(state, (document) => {
				this.clear(document.uri.toString());
			}));
			this.toDispose.push(sharedServices.workspace.DocumentBuilder.onUpdate((_changed, deleted) => {
				for (const uri of deleted) this.clear(uri);
			}));
		} else this.toDispose.push(sharedServices.workspace.DocumentBuilder.onUpdate((changed, deleted) => {
			const allUris = changed.concat(deleted);
			for (const uri of allUris) this.clear(uri);
		}));
	}
};
var WorkspaceCache = class extends SimpleCache {
	constructor(sharedServices, state) {
		super();
		if (state) {
			this.toDispose.push(sharedServices.workspace.DocumentBuilder.onBuildPhase(state, () => {
				this.clear();
			}));
			this.toDispose.push(sharedServices.workspace.DocumentBuilder.onUpdate((_changed, deleted) => {
				if (deleted.length > 0) this.clear();
			}));
		} else this.toDispose.push(sharedServices.workspace.DocumentBuilder.onUpdate(() => {
			this.clear();
		}));
	}
};
var DefaultScopeProvider = class {
	constructor(services) {
		this.reflection = services.shared.AstReflection;
		this.nameProvider = services.references.NameProvider;
		this.descriptions = services.workspace.AstNodeDescriptionProvider;
		this.indexManager = services.shared.workspace.IndexManager;
		this.globalScopeCache = new WorkspaceCache(services.shared);
	}
	getScope(context) {
		const scopes = [];
		const referenceType = this.reflection.getReferenceType(context);
		const precomputed = getDocument(context.container).precomputedScopes;
		if (precomputed) {
			let currentNode = context.container;
			do {
				const allDescriptions = precomputed.get(currentNode);
				if (allDescriptions.length > 0) scopes.push(stream(allDescriptions).filter((desc) => this.reflection.isSubtype(desc.type, referenceType)));
				currentNode = currentNode.$container;
			} while (currentNode);
		}
		let result = this.getGlobalScope(referenceType, context);
		for (let i = scopes.length - 1; i >= 0; i--) result = this.createScope(scopes[i], result);
		return result;
	}
	createScope(elements, outerScope, options) {
		return new StreamScope(stream(elements), outerScope, options);
	}
	createScopeForNodes(elements, outerScope, options) {
		const s = stream(elements).map((e) => {
			const name = this.nameProvider.getName(e);
			if (name) return this.descriptions.createDescription(e, name);
			return void 0;
		}).nonNullable();
		return new StreamScope(s, outerScope, options);
	}
	getGlobalScope(referenceType, _context) {
		return this.globalScopeCache.get(referenceType, () => new MapScope(this.indexManager.allElements(referenceType)));
	}
};
function isAstNodeWithComment(node) {
	return typeof node.$comment === "string";
}
function isIntermediateReference(obj) {
	return typeof obj === "object" && !!obj && ("$ref" in obj || "$error" in obj);
}
var DefaultJsonSerializer = class {
	constructor(services) {
		this.ignoreProperties = new Set([
			"$container",
			"$containerProperty",
			"$containerIndex",
			"$document",
			"$cstNode"
		]);
		this.langiumDocuments = services.shared.workspace.LangiumDocuments;
		this.astNodeLocator = services.workspace.AstNodeLocator;
		this.nameProvider = services.references.NameProvider;
		this.commentProvider = services.documentation.CommentProvider;
	}
	serialize(node, options) {
		const serializeOptions = options !== null && options !== void 0 ? options : {};
		const specificReplacer = options === null || options === void 0 ? void 0 : options.replacer;
		const defaultReplacer = (key, value) => this.replacer(key, value, serializeOptions);
		const replacer = specificReplacer ? (key, value) => specificReplacer(key, value, defaultReplacer) : defaultReplacer;
		try {
			this.currentDocument = getDocument(node);
			return JSON.stringify(node, replacer, options === null || options === void 0 ? void 0 : options.space);
		} finally {
			this.currentDocument = void 0;
		}
	}
	deserialize(content, options) {
		const deserializeOptions = options !== null && options !== void 0 ? options : {};
		const root = JSON.parse(content);
		this.linkNode(root, root, deserializeOptions);
		return root;
	}
	replacer(key, value, { refText, sourceText, textRegions, comments, uriConverter }) {
		var _a, _b, _c, _d;
		if (this.ignoreProperties.has(key)) return void 0;
		else if (isReference(value)) {
			const refValue = value.ref;
			const $refText = refText ? value.$refText : void 0;
			if (refValue) {
				const targetDocument = getDocument(refValue);
				let targetUri = "";
				if (this.currentDocument && this.currentDocument !== targetDocument) if (uriConverter) targetUri = uriConverter(targetDocument.uri, value);
				else targetUri = targetDocument.uri.toString();
				const targetPath = this.astNodeLocator.getAstNodePath(refValue);
				return {
					$ref: `${targetUri}#${targetPath}`,
					$refText
				};
			} else return {
				$error: (_b = (_a = value.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : "Could not resolve reference",
				$refText
			};
		} else if (isAstNode(value)) {
			let astNode = void 0;
			if (textRegions) {
				astNode = this.addAstNodeRegionWithAssignmentsTo(Object.assign({}, value));
				if ((!key || value.$document) && (astNode === null || astNode === void 0 ? void 0 : astNode.$textRegion)) astNode.$textRegion.documentURI = (_c = this.currentDocument) === null || _c === void 0 ? void 0 : _c.uri.toString();
			}
			if (sourceText && !key) {
				astNode !== null && astNode !== void 0 || (astNode = Object.assign({}, value));
				astNode.$sourceText = (_d = value.$cstNode) === null || _d === void 0 ? void 0 : _d.text;
			}
			if (comments) {
				astNode !== null && astNode !== void 0 || (astNode = Object.assign({}, value));
				const comment = this.commentProvider.getComment(value);
				if (comment) astNode.$comment = comment.replace(/\r/g, "");
			}
			return astNode !== null && astNode !== void 0 ? astNode : value;
		} else return value;
	}
	addAstNodeRegionWithAssignmentsTo(node) {
		const createDocumentSegment = (cstNode) => ({
			offset: cstNode.offset,
			end: cstNode.end,
			length: cstNode.length,
			range: cstNode.range
		});
		if (node.$cstNode) {
			const textRegion = node.$textRegion = createDocumentSegment(node.$cstNode);
			const assignments = textRegion.assignments = {};
			Object.keys(node).filter((key) => !key.startsWith("$")).forEach((key) => {
				const propertyAssignments = findNodesForProperty(node.$cstNode, key).map(createDocumentSegment);
				if (propertyAssignments.length !== 0) assignments[key] = propertyAssignments;
			});
			return node;
		}
		return void 0;
	}
	linkNode(node, root, options, container, containerProperty, containerIndex) {
		for (const [propertyName, item] of Object.entries(node)) if (Array.isArray(item)) for (let index = 0; index < item.length; index++) {
			const element = item[index];
			if (isIntermediateReference(element)) item[index] = this.reviveReference(node, propertyName, root, element, options);
			else if (isAstNode(element)) this.linkNode(element, root, options, node, propertyName, index);
		}
		else if (isIntermediateReference(item)) node[propertyName] = this.reviveReference(node, propertyName, root, item, options);
		else if (isAstNode(item)) this.linkNode(item, root, options, node, propertyName);
		const mutable = node;
		mutable.$container = container;
		mutable.$containerProperty = containerProperty;
		mutable.$containerIndex = containerIndex;
	}
	reviveReference(container, property, root, reference, options) {
		let refText = reference.$refText;
		let error$1 = reference.$error;
		if (reference.$ref) {
			const ref = this.getRefNode(root, reference.$ref, options.uriConverter);
			if (isAstNode(ref)) {
				if (!refText) refText = this.nameProvider.getName(ref);
				return {
					$refText: refText !== null && refText !== void 0 ? refText : "",
					ref
				};
			} else error$1 = ref;
		}
		if (error$1) {
			const ref = { $refText: refText !== null && refText !== void 0 ? refText : "" };
			ref.error = {
				container,
				property,
				message: error$1,
				reference: ref
			};
			return ref;
		} else return void 0;
	}
	getRefNode(root, uri, uriConverter) {
		try {
			const fragmentIndex = uri.indexOf("#");
			if (fragmentIndex === 0) {
				const node$1 = this.astNodeLocator.getAstNode(root, uri.substring(1));
				if (!node$1) return "Could not resolve path: " + uri;
				return node$1;
			}
			if (fragmentIndex < 0) {
				const documentUri$1 = uriConverter ? uriConverter(uri) : URI.parse(uri);
				const document$1 = this.langiumDocuments.getDocument(documentUri$1);
				if (!document$1) return "Could not find document for URI: " + uri;
				return document$1.parseResult.value;
			}
			const documentUri = uriConverter ? uriConverter(uri.substring(0, fragmentIndex)) : URI.parse(uri.substring(0, fragmentIndex));
			const document = this.langiumDocuments.getDocument(documentUri);
			if (!document) return "Could not find document for URI: " + uri;
			if (fragmentIndex === uri.length - 1) return document.parseResult.value;
			const node = this.astNodeLocator.getAstNode(document.parseResult.value, uri.substring(fragmentIndex + 1));
			if (!node) return "Could not resolve URI: " + uri;
			return node;
		} catch (err) {
			return String(err);
		}
	}
};
var DefaultServiceRegistry = class {
	get map() {
		return this.fileExtensionMap;
	}
	constructor(services) {
		this.languageIdMap = /* @__PURE__ */ new Map();
		this.fileExtensionMap = /* @__PURE__ */ new Map();
		this.textDocuments = services === null || services === void 0 ? void 0 : services.workspace.TextDocuments;
	}
	register(language) {
		const data = language.LanguageMetaData;
		for (const ext of data.fileExtensions) {
			if (this.fileExtensionMap.has(ext)) console.warn(`The file extension ${ext} is used by multiple languages. It is now assigned to '${data.languageId}'.`);
			this.fileExtensionMap.set(ext, language);
		}
		this.languageIdMap.set(data.languageId, language);
		if (this.languageIdMap.size === 1) this.singleton = language;
		else this.singleton = void 0;
	}
	getServices(uri) {
		var _a, _b;
		if (this.singleton !== void 0) return this.singleton;
		if (this.languageIdMap.size === 0) throw new Error("The service registry is empty. Use `register` to register the services of a language.");
		const languageId = (_b = (_a = this.textDocuments) === null || _a === void 0 ? void 0 : _a.get(uri)) === null || _b === void 0 ? void 0 : _b.languageId;
		if (languageId !== void 0) {
			const services$1 = this.languageIdMap.get(languageId);
			if (services$1) return services$1;
		}
		const ext = UriUtils.extname(uri);
		const services = this.fileExtensionMap.get(ext);
		if (!services) if (languageId) throw new Error(`The service registry contains no services for the extension '${ext}' for language '${languageId}'.`);
		else throw new Error(`The service registry contains no services for the extension '${ext}'.`);
		return services;
	}
	hasServices(uri) {
		try {
			this.getServices(uri);
			return true;
		} catch (_a) {
			return false;
		}
	}
	get all() {
		return Array.from(this.languageIdMap.values());
	}
};
function diagnosticData(code) {
	return { code };
}
var ValidationCategory;
(function(ValidationCategory$1) {
	ValidationCategory$1.all = [
		"fast",
		"slow",
		"built-in"
	];
})(ValidationCategory || (ValidationCategory = {}));
var ValidationRegistry = class {
	constructor(services) {
		this.entries = new MultiMap();
		this.entriesBefore = [];
		this.entriesAfter = [];
		this.reflection = services.shared.AstReflection;
	}
	register(checksRecord, thisObj = this, category = "fast") {
		if (category === "built-in") throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");
		for (const [type, ch] of Object.entries(checksRecord)) {
			const callbacks = ch;
			if (Array.isArray(callbacks)) for (const check of callbacks) {
				const entry = {
					check: this.wrapValidationException(check, thisObj),
					category
				};
				this.addEntry(type, entry);
			}
			else if (typeof callbacks === "function") {
				const entry = {
					check: this.wrapValidationException(callbacks, thisObj),
					category
				};
				this.addEntry(type, entry);
			} else assertUnreachable(callbacks);
		}
	}
	wrapValidationException(check, thisObj) {
		return async (node, accept, cancelToken) => {
			await this.handleException(() => check.call(thisObj, node, accept, cancelToken), "An error occurred during validation", accept, node);
		};
	}
	async handleException(functionality, messageContext, accept, node) {
		try {
			await functionality();
		} catch (err) {
			if (isOperationCancelled(err)) throw err;
			console.error(`${messageContext}:`, err);
			if (err instanceof Error && err.stack) console.error(err.stack);
			const messageDetails = err instanceof Error ? err.message : String(err);
			accept("error", `${messageContext}: ${messageDetails}`, { node });
		}
	}
	addEntry(type, entry) {
		if (type === "AstNode") {
			this.entries.add("AstNode", entry);
			return;
		}
		for (const subtype of this.reflection.getAllSubTypes(type)) this.entries.add(subtype, entry);
	}
	getChecks(type, categories) {
		let checks = stream(this.entries.get(type)).concat(this.entries.get("AstNode"));
		if (categories) checks = checks.filter((entry) => categories.includes(entry.category));
		return checks.map((entry) => entry.check);
	}
	registerBeforeDocument(checkBefore, thisObj = this) {
		this.entriesBefore.push(this.wrapPreparationException(checkBefore, "An error occurred during set-up of the validation", thisObj));
	}
	registerAfterDocument(checkAfter, thisObj = this) {
		this.entriesAfter.push(this.wrapPreparationException(checkAfter, "An error occurred during tear-down of the validation", thisObj));
	}
	wrapPreparationException(check, messageContext, thisObj) {
		return async (rootNode, accept, categories, cancelToken) => {
			await this.handleException(() => check.call(thisObj, rootNode, accept, categories, cancelToken), messageContext, accept, rootNode);
		};
	}
	get checksBefore() {
		return this.entriesBefore;
	}
	get checksAfter() {
		return this.entriesAfter;
	}
};
var DefaultDocumentValidator = class {
	constructor(services) {
		this.validationRegistry = services.validation.ValidationRegistry;
		this.metadata = services.LanguageMetaData;
	}
	async validateDocument(document, options = {}, cancelToken = cancellation_exports.CancellationToken.None) {
		const parseResult = document.parseResult;
		const diagnostics = [];
		await interruptAndCheck(cancelToken);
		if (!options.categories || options.categories.includes("built-in")) {
			this.processLexingErrors(parseResult, diagnostics, options);
			if (options.stopAfterLexingErrors && diagnostics.some((d) => {
				var _a;
				return ((_a = d.data) === null || _a === void 0 ? void 0 : _a.code) === DocumentValidator.LexingError;
			})) return diagnostics;
			this.processParsingErrors(parseResult, diagnostics, options);
			if (options.stopAfterParsingErrors && diagnostics.some((d) => {
				var _a;
				return ((_a = d.data) === null || _a === void 0 ? void 0 : _a.code) === DocumentValidator.ParsingError;
			})) return diagnostics;
			this.processLinkingErrors(document, diagnostics, options);
			if (options.stopAfterLinkingErrors && diagnostics.some((d) => {
				var _a;
				return ((_a = d.data) === null || _a === void 0 ? void 0 : _a.code) === DocumentValidator.LinkingError;
			})) return diagnostics;
		}
		try {
			diagnostics.push(...await this.validateAst(parseResult.value, options, cancelToken));
		} catch (err) {
			if (isOperationCancelled(err)) throw err;
			console.error("An error occurred during validation:", err);
		}
		await interruptAndCheck(cancelToken);
		return diagnostics;
	}
	processLexingErrors(parseResult, diagnostics, _options) {
		var _a, _b, _c;
		const lexerDiagnostics = [...parseResult.lexerErrors, ...(_b = (_a = parseResult.lexerReport) === null || _a === void 0 ? void 0 : _a.diagnostics) !== null && _b !== void 0 ? _b : []];
		for (const lexerDiagnostic of lexerDiagnostics) {
			const severity = (_c = lexerDiagnostic.severity) !== null && _c !== void 0 ? _c : "error";
			const diagnostic = {
				severity: toDiagnosticSeverity(severity),
				range: {
					start: {
						line: lexerDiagnostic.line - 1,
						character: lexerDiagnostic.column - 1
					},
					end: {
						line: lexerDiagnostic.line - 1,
						character: lexerDiagnostic.column + lexerDiagnostic.length - 1
					}
				},
				message: lexerDiagnostic.message,
				data: toDiagnosticData(severity),
				source: this.getSource()
			};
			diagnostics.push(diagnostic);
		}
	}
	processParsingErrors(parseResult, diagnostics, _options) {
		for (const parserError of parseResult.parserErrors) {
			let range = void 0;
			if (isNaN(parserError.token.startOffset)) {
				if ("previousToken" in parserError) {
					const token = parserError.previousToken;
					if (!isNaN(token.startOffset)) {
						const position = {
							line: token.endLine - 1,
							character: token.endColumn
						};
						range = {
							start: position,
							end: position
						};
					} else {
						const position = {
							line: 0,
							character: 0
						};
						range = {
							start: position,
							end: position
						};
					}
				}
			} else range = tokenToRange(parserError.token);
			if (range) {
				const diagnostic = {
					severity: toDiagnosticSeverity("error"),
					range,
					message: parserError.message,
					data: diagnosticData(DocumentValidator.ParsingError),
					source: this.getSource()
				};
				diagnostics.push(diagnostic);
			}
		}
	}
	processLinkingErrors(document, diagnostics, _options) {
		for (const reference of document.references) {
			const linkingError = reference.error;
			if (linkingError) {
				const info = {
					node: linkingError.container,
					property: linkingError.property,
					index: linkingError.index,
					data: {
						code: DocumentValidator.LinkingError,
						containerType: linkingError.container.$type,
						property: linkingError.property,
						refText: linkingError.reference.$refText
					}
				};
				diagnostics.push(this.toDiagnostic("error", linkingError.message, info));
			}
		}
	}
	async validateAst(rootNode, options, cancelToken = cancellation_exports.CancellationToken.None) {
		const validationItems = [];
		const acceptor = (severity, message, info) => {
			validationItems.push(this.toDiagnostic(severity, message, info));
		};
		await this.validateAstBefore(rootNode, options, acceptor, cancelToken);
		await this.validateAstNodes(rootNode, options, acceptor, cancelToken);
		await this.validateAstAfter(rootNode, options, acceptor, cancelToken);
		return validationItems;
	}
	async validateAstBefore(rootNode, options, acceptor, cancelToken = cancellation_exports.CancellationToken.None) {
		var _a;
		const checksBefore = this.validationRegistry.checksBefore;
		for (const checkBefore of checksBefore) {
			await interruptAndCheck(cancelToken);
			await checkBefore(rootNode, acceptor, (_a = options.categories) !== null && _a !== void 0 ? _a : [], cancelToken);
		}
	}
	async validateAstNodes(rootNode, options, acceptor, cancelToken = cancellation_exports.CancellationToken.None) {
		await Promise.all(streamAst(rootNode).map(async (node) => {
			await interruptAndCheck(cancelToken);
			const checks = this.validationRegistry.getChecks(node.$type, options.categories);
			for (const check of checks) await check(node, acceptor, cancelToken);
		}));
	}
	async validateAstAfter(rootNode, options, acceptor, cancelToken = cancellation_exports.CancellationToken.None) {
		var _a;
		const checksAfter = this.validationRegistry.checksAfter;
		for (const checkAfter of checksAfter) {
			await interruptAndCheck(cancelToken);
			await checkAfter(rootNode, acceptor, (_a = options.categories) !== null && _a !== void 0 ? _a : [], cancelToken);
		}
	}
	toDiagnostic(severity, message, info) {
		return {
			message,
			range: getDiagnosticRange(info),
			severity: toDiagnosticSeverity(severity),
			code: info.code,
			codeDescription: info.codeDescription,
			tags: info.tags,
			relatedInformation: info.relatedInformation,
			data: info.data,
			source: this.getSource()
		};
	}
	getSource() {
		return this.metadata.languageId;
	}
};
function getDiagnosticRange(info) {
	if (info.range) return info.range;
	let cstNode;
	if (typeof info.property === "string") cstNode = findNodeForProperty(info.node.$cstNode, info.property, info.index);
	else if (typeof info.keyword === "string") cstNode = findNodeForKeyword(info.node.$cstNode, info.keyword, info.index);
	cstNode !== null && cstNode !== void 0 || (cstNode = info.node.$cstNode);
	if (!cstNode) return {
		start: {
			line: 0,
			character: 0
		},
		end: {
			line: 0,
			character: 0
		}
	};
	return cstNode.range;
}
function toDiagnosticSeverity(severity) {
	switch (severity) {
		case "error": return 1;
		case "warning": return 2;
		case "info": return 3;
		case "hint": return 4;
		default: throw new Error("Invalid diagnostic severity: " + severity);
	}
}
function toDiagnosticData(severity) {
	switch (severity) {
		case "error": return diagnosticData(DocumentValidator.LexingError);
		case "warning": return diagnosticData(DocumentValidator.LexingWarning);
		case "info": return diagnosticData(DocumentValidator.LexingInfo);
		case "hint": return diagnosticData(DocumentValidator.LexingHint);
		default: throw new Error("Invalid diagnostic severity: " + severity);
	}
}
var DocumentValidator;
(function(DocumentValidator$1) {
	DocumentValidator$1.LexingError = "lexing-error";
	DocumentValidator$1.LexingWarning = "lexing-warning";
	DocumentValidator$1.LexingInfo = "lexing-info";
	DocumentValidator$1.LexingHint = "lexing-hint";
	DocumentValidator$1.ParsingError = "parsing-error";
	DocumentValidator$1.LinkingError = "linking-error";
})(DocumentValidator || (DocumentValidator = {}));
var DefaultAstNodeDescriptionProvider = class {
	constructor(services) {
		this.astNodeLocator = services.workspace.AstNodeLocator;
		this.nameProvider = services.references.NameProvider;
	}
	createDescription(node, name, document) {
		const doc = document !== null && document !== void 0 ? document : getDocument(node);
		name !== null && name !== void 0 || (name = this.nameProvider.getName(node));
		const path = this.astNodeLocator.getAstNodePath(node);
		if (!name) throw new Error(`Node at path ${path} has no name.`);
		let nameNodeSegment;
		const nameSegmentGetter = () => {
			var _a;
			return nameNodeSegment !== null && nameNodeSegment !== void 0 ? nameNodeSegment : nameNodeSegment = toDocumentSegment((_a = this.nameProvider.getNameNode(node)) !== null && _a !== void 0 ? _a : node.$cstNode);
		};
		return {
			node,
			name,
			get nameSegment() {
				return nameSegmentGetter();
			},
			selectionSegment: toDocumentSegment(node.$cstNode),
			type: node.$type,
			documentUri: doc.uri,
			path
		};
	}
};
var DefaultReferenceDescriptionProvider = class {
	constructor(services) {
		this.nodeLocator = services.workspace.AstNodeLocator;
	}
	async createDescriptions(document, cancelToken = cancellation_exports.CancellationToken.None) {
		const descr = [];
		const rootNode = document.parseResult.value;
		for (const astNode of streamAst(rootNode)) {
			await interruptAndCheck(cancelToken);
			streamReferences(astNode).filter((refInfo) => !isLinkingError(refInfo)).forEach((refInfo) => {
				const description = this.createDescription(refInfo);
				if (description) descr.push(description);
			});
		}
		return descr;
	}
	createDescription(refInfo) {
		const targetNodeDescr = refInfo.reference.$nodeDescription;
		const refCstNode = refInfo.reference.$refNode;
		if (!targetNodeDescr || !refCstNode) return void 0;
		const docUri = getDocument(refInfo.container).uri;
		return {
			sourceUri: docUri,
			sourcePath: this.nodeLocator.getAstNodePath(refInfo.container),
			targetUri: targetNodeDescr.documentUri,
			targetPath: targetNodeDescr.path,
			segment: toDocumentSegment(refCstNode),
			local: UriUtils.equals(targetNodeDescr.documentUri, docUri)
		};
	}
};
var DefaultAstNodeLocator = class {
	constructor() {
		this.segmentSeparator = "/";
		this.indexSeparator = "@";
	}
	getAstNodePath(node) {
		if (node.$container) {
			const containerPath = this.getAstNodePath(node.$container);
			const newSegment = this.getPathSegment(node);
			const nodePath = containerPath + this.segmentSeparator + newSegment;
			return nodePath;
		}
		return "";
	}
	getPathSegment({ $containerProperty, $containerIndex }) {
		if (!$containerProperty) throw new Error("Missing '$containerProperty' in AST node.");
		if ($containerIndex !== void 0) return $containerProperty + this.indexSeparator + $containerIndex;
		return $containerProperty;
	}
	getAstNode(node, path) {
		const segments = path.split(this.segmentSeparator);
		return segments.reduce((previousValue, currentValue) => {
			if (!previousValue || currentValue.length === 0) return previousValue;
			const propertyIndex = currentValue.indexOf(this.indexSeparator);
			if (propertyIndex > 0) {
				const property = currentValue.substring(0, propertyIndex);
				const arrayIndex = parseInt(currentValue.substring(propertyIndex + 1));
				const array$1 = previousValue[property];
				return array$1 === null || array$1 === void 0 ? void 0 : array$1[arrayIndex];
			}
			return previousValue[currentValue];
		}, node);
	}
};
var event_exports = {};
__reExport(event_exports, /* @__PURE__ */ __toESM(require_events()));
var DefaultConfigurationProvider = class {
	constructor(services) {
		this._ready = new Deferred();
		this.settings = {};
		this.workspaceConfig = false;
		this.onConfigurationSectionUpdateEmitter = new event_exports.Emitter();
		this.serviceRegistry = services.ServiceRegistry;
	}
	get ready() {
		return this._ready.promise;
	}
	initialize(params) {
		var _a, _b;
		this.workspaceConfig = (_b = (_a = params.capabilities.workspace) === null || _a === void 0 ? void 0 : _a.configuration) !== null && _b !== void 0 ? _b : false;
	}
	async initialized(params) {
		if (this.workspaceConfig) {
			if (params.register) {
				const languages = this.serviceRegistry.all;
				params.register({ section: languages.map((lang) => this.toSectionName(lang.LanguageMetaData.languageId)) });
			}
			if (params.fetchConfiguration) {
				const configToUpdate = this.serviceRegistry.all.map((lang) => ({ section: this.toSectionName(lang.LanguageMetaData.languageId) }));
				const configs = await params.fetchConfiguration(configToUpdate);
				configToUpdate.forEach((conf, idx) => {
					this.updateSectionConfiguration(conf.section, configs[idx]);
				});
			}
		}
		this._ready.resolve();
	}
	updateConfiguration(change) {
		if (!change.settings) return;
		Object.keys(change.settings).forEach((section) => {
			const configuration = change.settings[section];
			this.updateSectionConfiguration(section, configuration);
			this.onConfigurationSectionUpdateEmitter.fire({
				section,
				configuration
			});
		});
	}
	updateSectionConfiguration(section, configuration) {
		this.settings[section] = configuration;
	}
	async getConfiguration(language, configuration) {
		await this.ready;
		const sectionName = this.toSectionName(language);
		if (this.settings[sectionName]) return this.settings[sectionName][configuration];
	}
	toSectionName(languageId) {
		return `${languageId}`;
	}
	get onConfigurationSectionUpdate() {
		return this.onConfigurationSectionUpdateEmitter.event;
	}
};
var Disposable;
(function(Disposable$1) {
	function create(callback) {
		return { dispose: async () => await callback() };
	}
	Disposable$1.create = create;
})(Disposable || (Disposable = {}));
var DefaultDocumentBuilder = class {
	constructor(services) {
		this.updateBuildOptions = { validation: { categories: ["built-in", "fast"] } };
		this.updateListeners = [];
		this.buildPhaseListeners = new MultiMap();
		this.documentPhaseListeners = new MultiMap();
		this.buildState = /* @__PURE__ */ new Map();
		this.documentBuildWaiters = /* @__PURE__ */ new Map();
		this.currentState = DocumentState.Changed;
		this.langiumDocuments = services.workspace.LangiumDocuments;
		this.langiumDocumentFactory = services.workspace.LangiumDocumentFactory;
		this.textDocuments = services.workspace.TextDocuments;
		this.indexManager = services.workspace.IndexManager;
		this.serviceRegistry = services.ServiceRegistry;
	}
	async build(documents, options = {}, cancelToken = cancellation_exports.CancellationToken.None) {
		var _a, _b;
		for (const document of documents) {
			const key = document.uri.toString();
			if (document.state === DocumentState.Validated) {
				if (typeof options.validation === "boolean" && options.validation) {
					document.state = DocumentState.IndexedReferences;
					document.diagnostics = void 0;
					this.buildState.delete(key);
				} else if (typeof options.validation === "object") {
					const buildState = this.buildState.get(key);
					const previousCategories = (_a = buildState === null || buildState === void 0 ? void 0 : buildState.result) === null || _a === void 0 ? void 0 : _a.validationChecks;
					if (previousCategories) {
						const newCategories = (_b = options.validation.categories) !== null && _b !== void 0 ? _b : ValidationCategory.all;
						const categories = newCategories.filter((c) => !previousCategories.includes(c));
						if (categories.length > 0) {
							this.buildState.set(key, {
								completed: false,
								options: { validation: Object.assign(Object.assign({}, options.validation), { categories }) },
								result: buildState.result
							});
							document.state = DocumentState.IndexedReferences;
						}
					}
				}
			} else this.buildState.delete(key);
		}
		this.currentState = DocumentState.Changed;
		await this.emitUpdate(documents.map((e) => e.uri), []);
		await this.buildDocuments(documents, options, cancelToken);
	}
	async update(changed, deleted, cancelToken = cancellation_exports.CancellationToken.None) {
		this.currentState = DocumentState.Changed;
		for (const deletedUri of deleted) {
			this.langiumDocuments.deleteDocument(deletedUri);
			this.buildState.delete(deletedUri.toString());
			this.indexManager.remove(deletedUri);
		}
		for (const changedUri of changed) {
			const invalidated = this.langiumDocuments.invalidateDocument(changedUri);
			if (!invalidated) {
				const newDocument = this.langiumDocumentFactory.fromModel({ $type: "INVALID" }, changedUri);
				newDocument.state = DocumentState.Changed;
				this.langiumDocuments.addDocument(newDocument);
			}
			this.buildState.delete(changedUri.toString());
		}
		const allChangedUris = stream(changed).concat(deleted).map((uri) => uri.toString()).toSet();
		this.langiumDocuments.all.filter((doc) => !allChangedUris.has(doc.uri.toString()) && this.shouldRelink(doc, allChangedUris)).forEach((doc) => {
			const linker = this.serviceRegistry.getServices(doc.uri).references.Linker;
			linker.unlink(doc);
			doc.state = Math.min(doc.state, DocumentState.ComputedScopes);
			doc.diagnostics = void 0;
		});
		await this.emitUpdate(changed, deleted);
		await interruptAndCheck(cancelToken);
		const rebuildDocuments = this.sortDocuments(this.langiumDocuments.all.filter((doc) => {
			var _a;
			return doc.state < DocumentState.Linked || !((_a = this.buildState.get(doc.uri.toString())) === null || _a === void 0 ? void 0 : _a.completed);
		}).toArray());
		await this.buildDocuments(rebuildDocuments, this.updateBuildOptions, cancelToken);
	}
	async emitUpdate(changed, deleted) {
		await Promise.all(this.updateListeners.map((listener) => listener(changed, deleted)));
	}
	sortDocuments(documents) {
		let left = 0;
		let right = documents.length - 1;
		while (left < right) {
			while (left < documents.length && this.hasTextDocument(documents[left])) left++;
			while (right >= 0 && !this.hasTextDocument(documents[right])) right--;
			if (left < right) [documents[left], documents[right]] = [documents[right], documents[left]];
		}
		return documents;
	}
	hasTextDocument(doc) {
		var _a;
		return Boolean((_a = this.textDocuments) === null || _a === void 0 ? void 0 : _a.get(doc.uri));
	}
	shouldRelink(document, changedUris) {
		if (document.references.some((ref) => ref.error !== void 0)) return true;
		return this.indexManager.isAffected(document, changedUris);
	}
	onUpdate(callback) {
		this.updateListeners.push(callback);
		return Disposable.create(() => {
			const index = this.updateListeners.indexOf(callback);
			if (index >= 0) this.updateListeners.splice(index, 1);
		});
	}
	async buildDocuments(documents, options, cancelToken) {
		this.prepareBuild(documents, options);
		await this.runCancelable(documents, DocumentState.Parsed, cancelToken, (doc) => this.langiumDocumentFactory.update(doc, cancelToken));
		await this.runCancelable(documents, DocumentState.IndexedContent, cancelToken, (doc) => this.indexManager.updateContent(doc, cancelToken));
		await this.runCancelable(documents, DocumentState.ComputedScopes, cancelToken, async (doc) => {
			const scopeComputation = this.serviceRegistry.getServices(doc.uri).references.ScopeComputation;
			doc.precomputedScopes = await scopeComputation.computeLocalScopes(doc, cancelToken);
		});
		await this.runCancelable(documents, DocumentState.Linked, cancelToken, (doc) => {
			const linker = this.serviceRegistry.getServices(doc.uri).references.Linker;
			return linker.link(doc, cancelToken);
		});
		await this.runCancelable(documents, DocumentState.IndexedReferences, cancelToken, (doc) => this.indexManager.updateReferences(doc, cancelToken));
		const toBeValidated = documents.filter((doc) => this.shouldValidate(doc));
		await this.runCancelable(toBeValidated, DocumentState.Validated, cancelToken, (doc) => this.validate(doc, cancelToken));
		for (const doc of documents) {
			const state = this.buildState.get(doc.uri.toString());
			if (state) state.completed = true;
		}
	}
	prepareBuild(documents, options) {
		for (const doc of documents) {
			const key = doc.uri.toString();
			const state = this.buildState.get(key);
			if (!state || state.completed) this.buildState.set(key, {
				completed: false,
				options,
				result: state === null || state === void 0 ? void 0 : state.result
			});
		}
	}
	async runCancelable(documents, targetState, cancelToken, callback) {
		const filtered = documents.filter((doc) => doc.state < targetState);
		for (const document of filtered) {
			await interruptAndCheck(cancelToken);
			await callback(document);
			document.state = targetState;
			await this.notifyDocumentPhase(document, targetState, cancelToken);
		}
		const targetStateDocs = documents.filter((doc) => doc.state === targetState);
		await this.notifyBuildPhase(targetStateDocs, targetState, cancelToken);
		this.currentState = targetState;
	}
	onBuildPhase(targetState, callback) {
		this.buildPhaseListeners.add(targetState, callback);
		return Disposable.create(() => {
			this.buildPhaseListeners.delete(targetState, callback);
		});
	}
	onDocumentPhase(targetState, callback) {
		this.documentPhaseListeners.add(targetState, callback);
		return Disposable.create(() => {
			this.documentPhaseListeners.delete(targetState, callback);
		});
	}
	waitUntil(state, uriOrToken, cancelToken) {
		let uri = void 0;
		if (uriOrToken && "path" in uriOrToken) uri = uriOrToken;
		else cancelToken = uriOrToken;
		cancelToken !== null && cancelToken !== void 0 || (cancelToken = cancellation_exports.CancellationToken.None);
		if (uri) {
			const document = this.langiumDocuments.getDocument(uri);
			if (document && document.state > state) return Promise.resolve(uri);
		}
		if (this.currentState >= state) return Promise.resolve(void 0);
		else if (cancelToken.isCancellationRequested) return Promise.reject(OperationCancelled);
		return new Promise((resolve, reject$1) => {
			const buildDisposable = this.onBuildPhase(state, () => {
				buildDisposable.dispose();
				cancelDisposable.dispose();
				if (uri) {
					const document = this.langiumDocuments.getDocument(uri);
					resolve(document === null || document === void 0 ? void 0 : document.uri);
				} else resolve(void 0);
			});
			const cancelDisposable = cancelToken.onCancellationRequested(() => {
				buildDisposable.dispose();
				cancelDisposable.dispose();
				reject$1(OperationCancelled);
			});
		});
	}
	async notifyDocumentPhase(document, state, cancelToken) {
		const listeners = this.documentPhaseListeners.get(state);
		const listenersCopy = listeners.slice();
		for (const listener of listenersCopy) try {
			await listener(document, cancelToken);
		} catch (err) {
			if (!isOperationCancelled(err)) throw err;
		}
	}
	async notifyBuildPhase(documents, state, cancelToken) {
		if (documents.length === 0) return;
		const listeners = this.buildPhaseListeners.get(state);
		const listenersCopy = listeners.slice();
		for (const listener of listenersCopy) {
			await interruptAndCheck(cancelToken);
			await listener(documents, cancelToken);
		}
	}
	shouldValidate(document) {
		return Boolean(this.getBuildOptions(document).validation);
	}
	async validate(document, cancelToken) {
		var _a, _b;
		const validator = this.serviceRegistry.getServices(document.uri).validation.DocumentValidator;
		const validationSetting = this.getBuildOptions(document).validation;
		const options = typeof validationSetting === "object" ? validationSetting : void 0;
		const diagnostics = await validator.validateDocument(document, options, cancelToken);
		if (document.diagnostics) document.diagnostics.push(...diagnostics);
		else document.diagnostics = diagnostics;
		const state = this.buildState.get(document.uri.toString());
		if (state) {
			(_a = state.result) !== null && _a !== void 0 || (state.result = {});
			const newCategories = (_b = options === null || options === void 0 ? void 0 : options.categories) !== null && _b !== void 0 ? _b : ValidationCategory.all;
			if (state.result.validationChecks) state.result.validationChecks.push(...newCategories);
			else state.result.validationChecks = [...newCategories];
		}
	}
	getBuildOptions(document) {
		var _a, _b;
		return (_b = (_a = this.buildState.get(document.uri.toString())) === null || _a === void 0 ? void 0 : _a.options) !== null && _b !== void 0 ? _b : {};
	}
};
var DefaultIndexManager = class {
	constructor(services) {
		this.symbolIndex = /* @__PURE__ */ new Map();
		this.symbolByTypeIndex = new ContextCache();
		this.referenceIndex = /* @__PURE__ */ new Map();
		this.documents = services.workspace.LangiumDocuments;
		this.serviceRegistry = services.ServiceRegistry;
		this.astReflection = services.AstReflection;
	}
	findAllReferences(targetNode, astNodePath) {
		const targetDocUri = getDocument(targetNode).uri;
		const result = [];
		this.referenceIndex.forEach((docRefs) => {
			docRefs.forEach((refDescr) => {
				if (UriUtils.equals(refDescr.targetUri, targetDocUri) && refDescr.targetPath === astNodePath) result.push(refDescr);
			});
		});
		return stream(result);
	}
	allElements(nodeType, uris) {
		let documentUris = stream(this.symbolIndex.keys());
		if (uris) documentUris = documentUris.filter((uri) => !uris || uris.has(uri));
		return documentUris.map((uri) => this.getFileDescriptions(uri, nodeType)).flat();
	}
	getFileDescriptions(uri, nodeType) {
		var _a;
		if (!nodeType) return (_a = this.symbolIndex.get(uri)) !== null && _a !== void 0 ? _a : [];
		const descriptions = this.symbolByTypeIndex.get(uri, nodeType, () => {
			var _a$1;
			const allFileDescriptions = (_a$1 = this.symbolIndex.get(uri)) !== null && _a$1 !== void 0 ? _a$1 : [];
			return allFileDescriptions.filter((e) => this.astReflection.isSubtype(e.type, nodeType));
		});
		return descriptions;
	}
	remove(uri) {
		const uriString = uri.toString();
		this.symbolIndex.delete(uriString);
		this.symbolByTypeIndex.clear(uriString);
		this.referenceIndex.delete(uriString);
	}
	async updateContent(document, cancelToken = cancellation_exports.CancellationToken.None) {
		const services = this.serviceRegistry.getServices(document.uri);
		const exports$1 = await services.references.ScopeComputation.computeExports(document, cancelToken);
		const uri = document.uri.toString();
		this.symbolIndex.set(uri, exports$1);
		this.symbolByTypeIndex.clear(uri);
	}
	async updateReferences(document, cancelToken = cancellation_exports.CancellationToken.None) {
		const services = this.serviceRegistry.getServices(document.uri);
		const indexData = await services.workspace.ReferenceDescriptionProvider.createDescriptions(document, cancelToken);
		this.referenceIndex.set(document.uri.toString(), indexData);
	}
	isAffected(document, changedUris) {
		const references = this.referenceIndex.get(document.uri.toString());
		if (!references) return false;
		return references.some((ref) => !ref.local && changedUris.has(ref.targetUri.toString()));
	}
};
var DefaultWorkspaceManager = class {
	constructor(services) {
		this.initialBuildOptions = {};
		this._ready = new Deferred();
		this.serviceRegistry = services.ServiceRegistry;
		this.langiumDocuments = services.workspace.LangiumDocuments;
		this.documentBuilder = services.workspace.DocumentBuilder;
		this.fileSystemProvider = services.workspace.FileSystemProvider;
		this.mutex = services.workspace.WorkspaceLock;
	}
	get ready() {
		return this._ready.promise;
	}
	get workspaceFolders() {
		return this.folders;
	}
	initialize(params) {
		var _a;
		this.folders = (_a = params.workspaceFolders) !== null && _a !== void 0 ? _a : void 0;
	}
	initialized(_params) {
		return this.mutex.write((token) => {
			var _a;
			return this.initializeWorkspace((_a = this.folders) !== null && _a !== void 0 ? _a : [], token);
		});
	}
	async initializeWorkspace(folders, cancelToken = cancellation_exports.CancellationToken.None) {
		const documents = await this.performStartup(folders);
		await interruptAndCheck(cancelToken);
		await this.documentBuilder.build(documents, this.initialBuildOptions, cancelToken);
	}
	async performStartup(folders) {
		const fileExtensions = this.serviceRegistry.all.flatMap((e) => e.LanguageMetaData.fileExtensions);
		const documents = [];
		const collector = (document) => {
			documents.push(document);
			if (!this.langiumDocuments.hasDocument(document.uri)) this.langiumDocuments.addDocument(document);
		};
		await this.loadAdditionalDocuments(folders, collector);
		await Promise.all(folders.map((wf) => [wf, this.getRootFolder(wf)]).map(async (entry) => this.traverseFolder(...entry, fileExtensions, collector)));
		this._ready.resolve();
		return documents;
	}
	loadAdditionalDocuments(_folders, _collector) {
		return Promise.resolve();
	}
	getRootFolder(workspaceFolder) {
		return URI.parse(workspaceFolder.uri);
	}
	async traverseFolder(workspaceFolder, folderPath, fileExtensions, collector) {
		const content = await this.fileSystemProvider.readDirectory(folderPath);
		await Promise.all(content.map(async (entry) => {
			if (this.includeEntry(workspaceFolder, entry, fileExtensions)) {
				if (entry.isDirectory) await this.traverseFolder(workspaceFolder, entry.uri, fileExtensions, collector);
				else if (entry.isFile) {
					const document = await this.langiumDocuments.getOrCreateDocument(entry.uri);
					collector(document);
				}
			}
		}));
	}
	includeEntry(_workspaceFolder, entry, fileExtensions) {
		const name = UriUtils.basename(entry.uri);
		if (name.startsWith(".")) return false;
		if (entry.isDirectory) return name !== "node_modules" && name !== "out";
		else if (entry.isFile) {
			const extname = UriUtils.extname(entry.uri);
			return fileExtensions.includes(extname);
		}
		return false;
	}
};
var DefaultLexerErrorMessageProvider = class {
	buildUnexpectedCharactersMessage(fullText, startOffset, length, line, column) {
		return defaultLexerErrorProvider.buildUnexpectedCharactersMessage(fullText, startOffset, length, line, column);
	}
	buildUnableToPopLexerModeMessage(token) {
		return defaultLexerErrorProvider.buildUnableToPopLexerModeMessage(token);
	}
};
const DEFAULT_TOKENIZE_OPTIONS = { mode: "full" };
var DefaultLexer = class {
	constructor(services) {
		this.errorMessageProvider = services.parser.LexerErrorMessageProvider;
		this.tokenBuilder = services.parser.TokenBuilder;
		const tokens = this.tokenBuilder.buildTokens(services.Grammar, { caseInsensitive: services.LanguageMetaData.caseInsensitive });
		this.tokenTypes = this.toTokenTypeDictionary(tokens);
		const lexerTokens = isTokenTypeDictionary(tokens) ? Object.values(tokens) : tokens;
		const production = services.LanguageMetaData.mode === "production";
		this.chevrotainLexer = new Lexer(lexerTokens, {
			positionTracking: "full",
			skipValidations: production,
			errorMessageProvider: this.errorMessageProvider
		});
	}
	get definition() {
		return this.tokenTypes;
	}
	tokenize(text, _options = DEFAULT_TOKENIZE_OPTIONS) {
		var _a, _b, _c;
		const chevrotainResult = this.chevrotainLexer.tokenize(text);
		return {
			tokens: chevrotainResult.tokens,
			errors: chevrotainResult.errors,
			hidden: (_a = chevrotainResult.groups.hidden) !== null && _a !== void 0 ? _a : [],
			report: (_c = (_b = this.tokenBuilder).flushLexingReport) === null || _c === void 0 ? void 0 : _c.call(_b, text)
		};
	}
	toTokenTypeDictionary(buildTokens) {
		if (isTokenTypeDictionary(buildTokens)) return buildTokens;
		const tokens = isIMultiModeLexerDefinition(buildTokens) ? Object.values(buildTokens.modes).flat() : buildTokens;
		const res = {};
		tokens.forEach((token) => res[token.name] = token);
		return res;
	}
};
function isTokenTypeArray(tokenVocabulary) {
	return Array.isArray(tokenVocabulary) && (tokenVocabulary.length === 0 || "name" in tokenVocabulary[0]);
}
function isIMultiModeLexerDefinition(tokenVocabulary) {
	return tokenVocabulary && "modes" in tokenVocabulary && "defaultMode" in tokenVocabulary;
}
function isTokenTypeDictionary(tokenVocabulary) {
	return !isTokenTypeArray(tokenVocabulary) && !isIMultiModeLexerDefinition(tokenVocabulary);
}
function parseJSDoc(node, start, options) {
	let opts;
	let position;
	if (typeof node === "string") {
		position = start;
		opts = options;
	} else {
		position = node.range.start;
		opts = start;
	}
	if (!position) position = Position.create(0, 0);
	const lines = getLines(node);
	const normalizedOptions = normalizeOptions(opts);
	const tokens = tokenize({
		lines,
		position,
		options: normalizedOptions
	});
	return parseJSDocComment({
		index: 0,
		tokens,
		position
	});
}
function isJSDoc(node, options) {
	const normalizedOptions = normalizeOptions(options);
	const lines = getLines(node);
	if (lines.length === 0) return false;
	const first$1 = lines[0];
	const last = lines[lines.length - 1];
	const firstRegex = normalizedOptions.start;
	const lastRegex = normalizedOptions.end;
	return Boolean(firstRegex === null || firstRegex === void 0 ? void 0 : firstRegex.exec(first$1)) && Boolean(lastRegex === null || lastRegex === void 0 ? void 0 : lastRegex.exec(last));
}
function getLines(node) {
	let content = "";
	if (typeof node === "string") content = node;
	else content = node.text;
	const lines = content.split(NEWLINE_REGEXP);
	return lines;
}
const tagRegex = /\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy;
const inlineTagRegex = /\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;
function tokenize(context) {
	var _a, _b, _c;
	const tokens = [];
	let currentLine = context.position.line;
	let currentCharacter = context.position.character;
	for (let i = 0; i < context.lines.length; i++) {
		const first$1 = i === 0;
		const last = i === context.lines.length - 1;
		let line = context.lines[i];
		let index = 0;
		if (first$1 && context.options.start) {
			const match = (_a = context.options.start) === null || _a === void 0 ? void 0 : _a.exec(line);
			if (match) index = match.index + match[0].length;
		} else {
			const match = (_b = context.options.line) === null || _b === void 0 ? void 0 : _b.exec(line);
			if (match) index = match.index + match[0].length;
		}
		if (last) {
			const match = (_c = context.options.end) === null || _c === void 0 ? void 0 : _c.exec(line);
			if (match) line = line.substring(0, match.index);
		}
		line = line.substring(0, lastCharacter(line));
		const whitespaceEnd = skipWhitespace(line, index);
		if (whitespaceEnd >= line.length) {
			if (tokens.length > 0) {
				const position = Position.create(currentLine, currentCharacter);
				tokens.push({
					type: "break",
					content: "",
					range: Range.create(position, position)
				});
			}
		} else {
			tagRegex.lastIndex = index;
			const tagMatch = tagRegex.exec(line);
			if (tagMatch) {
				const fullMatch = tagMatch[0];
				const value = tagMatch[1];
				const start = Position.create(currentLine, currentCharacter + index);
				const end = Position.create(currentLine, currentCharacter + index + fullMatch.length);
				tokens.push({
					type: "tag",
					content: value,
					range: Range.create(start, end)
				});
				index += fullMatch.length;
				index = skipWhitespace(line, index);
			}
			if (index < line.length) {
				const rest = line.substring(index);
				const inlineTagMatches = Array.from(rest.matchAll(inlineTagRegex));
				tokens.push(...buildInlineTokens(inlineTagMatches, rest, currentLine, currentCharacter + index));
			}
		}
		currentLine++;
		currentCharacter = 0;
	}
	if (tokens.length > 0 && tokens[tokens.length - 1].type === "break") return tokens.slice(0, -1);
	return tokens;
}
function buildInlineTokens(tags, line, lineIndex, characterIndex) {
	const tokens = [];
	if (tags.length === 0) {
		const start = Position.create(lineIndex, characterIndex);
		const end = Position.create(lineIndex, characterIndex + line.length);
		tokens.push({
			type: "text",
			content: line,
			range: Range.create(start, end)
		});
	} else {
		let lastIndex = 0;
		for (const match of tags) {
			const matchIndex = match.index;
			const startContent = line.substring(lastIndex, matchIndex);
			if (startContent.length > 0) tokens.push({
				type: "text",
				content: line.substring(lastIndex, matchIndex),
				range: Range.create(Position.create(lineIndex, lastIndex + characterIndex), Position.create(lineIndex, matchIndex + characterIndex))
			});
			let offset = startContent.length + 1;
			const tagName = match[1];
			tokens.push({
				type: "inline-tag",
				content: tagName,
				range: Range.create(Position.create(lineIndex, lastIndex + offset + characterIndex), Position.create(lineIndex, lastIndex + offset + tagName.length + characterIndex))
			});
			offset += tagName.length;
			if (match.length === 4) {
				offset += match[2].length;
				const value = match[3];
				tokens.push({
					type: "text",
					content: value,
					range: Range.create(Position.create(lineIndex, lastIndex + offset + characterIndex), Position.create(lineIndex, lastIndex + offset + value.length + characterIndex))
				});
			} else tokens.push({
				type: "text",
				content: "",
				range: Range.create(Position.create(lineIndex, lastIndex + offset + characterIndex), Position.create(lineIndex, lastIndex + offset + characterIndex))
			});
			lastIndex = matchIndex + match[0].length;
		}
		const endContent = line.substring(lastIndex);
		if (endContent.length > 0) tokens.push({
			type: "text",
			content: endContent,
			range: Range.create(Position.create(lineIndex, lastIndex + characterIndex), Position.create(lineIndex, lastIndex + characterIndex + endContent.length))
		});
	}
	return tokens;
}
const nonWhitespaceRegex = /\S/;
const whitespaceEndRegex = /\s*$/;
function skipWhitespace(line, index) {
	const match = line.substring(index).match(nonWhitespaceRegex);
	if (match) return index + match.index;
	else return line.length;
}
function lastCharacter(line) {
	const match = line.match(whitespaceEndRegex);
	if (match && typeof match.index === "number") return match.index;
	return void 0;
}
function parseJSDocComment(context) {
	var _a, _b, _c, _d;
	const startPosition = Position.create(context.position.line, context.position.character);
	if (context.tokens.length === 0) return new JSDocCommentImpl([], Range.create(startPosition, startPosition));
	const elements = [];
	while (context.index < context.tokens.length) {
		const element = parseJSDocElement(context, elements[elements.length - 1]);
		if (element) elements.push(element);
	}
	const start = (_b = (_a = elements[0]) === null || _a === void 0 ? void 0 : _a.range.start) !== null && _b !== void 0 ? _b : startPosition;
	const end = (_d = (_c = elements[elements.length - 1]) === null || _c === void 0 ? void 0 : _c.range.end) !== null && _d !== void 0 ? _d : startPosition;
	return new JSDocCommentImpl(elements, Range.create(start, end));
}
function parseJSDocElement(context, last) {
	const next = context.tokens[context.index];
	if (next.type === "tag") return parseJSDocTag(context, false);
	else if (next.type === "text" || next.type === "inline-tag") return parseJSDocText(context);
	else {
		appendEmptyLine(next, last);
		context.index++;
		return void 0;
	}
}
function appendEmptyLine(token, element) {
	if (element) {
		const line = new JSDocLineImpl("", token.range);
		if ("inlines" in element) element.inlines.push(line);
		else element.content.inlines.push(line);
	}
}
function parseJSDocText(context) {
	let token = context.tokens[context.index];
	const firstToken = token;
	let lastToken = token;
	const lines = [];
	while (token && token.type !== "break" && token.type !== "tag") {
		lines.push(parseJSDocInline(context));
		lastToken = token;
		token = context.tokens[context.index];
	}
	return new JSDocTextImpl(lines, Range.create(firstToken.range.start, lastToken.range.end));
}
function parseJSDocInline(context) {
	const token = context.tokens[context.index];
	if (token.type === "inline-tag") return parseJSDocTag(context, true);
	else return parseJSDocLine(context);
}
function parseJSDocTag(context, inline) {
	const tagToken = context.tokens[context.index++];
	const name = tagToken.content.substring(1);
	const nextToken = context.tokens[context.index];
	if ((nextToken === null || nextToken === void 0 ? void 0 : nextToken.type) === "text") if (inline) {
		const docLine = parseJSDocLine(context);
		return new JSDocTagImpl(name, new JSDocTextImpl([docLine], docLine.range), inline, Range.create(tagToken.range.start, docLine.range.end));
	} else {
		const textDoc = parseJSDocText(context);
		return new JSDocTagImpl(name, textDoc, inline, Range.create(tagToken.range.start, textDoc.range.end));
	}
	else {
		const range = tagToken.range;
		return new JSDocTagImpl(name, new JSDocTextImpl([], range), inline, range);
	}
}
function parseJSDocLine(context) {
	const token = context.tokens[context.index++];
	return new JSDocLineImpl(token.content, token.range);
}
function normalizeOptions(options) {
	if (!options) return normalizeOptions({
		start: "/**",
		end: "*/",
		line: "*"
	});
	const { start, end, line } = options;
	return {
		start: normalizeOption(start, true),
		end: normalizeOption(end, false),
		line: normalizeOption(line, true)
	};
}
function normalizeOption(option$1, start) {
	if (typeof option$1 === "string" || typeof option$1 === "object") {
		const escaped = typeof option$1 === "string" ? escapeRegExp(option$1) : option$1.source;
		if (start) return /* @__PURE__ */ new RegExp(`^\\s*${escaped}`);
		else return /* @__PURE__ */ new RegExp(`\\s*${escaped}\\s*$`);
	} else return option$1;
}
var JSDocCommentImpl = class {
	constructor(elements, range) {
		this.elements = elements;
		this.range = range;
	}
	getTag(name) {
		return this.getAllTags().find((e) => e.name === name);
	}
	getTags(name) {
		return this.getAllTags().filter((e) => e.name === name);
	}
	getAllTags() {
		return this.elements.filter((e) => "name" in e);
	}
	toString() {
		let value = "";
		for (const element of this.elements) if (value.length === 0) value = element.toString();
		else {
			const text = element.toString();
			value += fillNewlines(value) + text;
		}
		return value.trim();
	}
	toMarkdown(options) {
		let value = "";
		for (const element of this.elements) if (value.length === 0) value = element.toMarkdown(options);
		else {
			const text = element.toMarkdown(options);
			value += fillNewlines(value) + text;
		}
		return value.trim();
	}
};
var JSDocTagImpl = class {
	constructor(name, content, inline, range) {
		this.name = name;
		this.content = content;
		this.inline = inline;
		this.range = range;
	}
	toString() {
		let text = `@${this.name}`;
		const content = this.content.toString();
		if (this.content.inlines.length === 1) text = `${text} ${content}`;
		else if (this.content.inlines.length > 1) text = `${text}\n${content}`;
		if (this.inline) return `{${text}}`;
		else return text;
	}
	toMarkdown(options) {
		var _a, _b;
		return (_b = (_a = options === null || options === void 0 ? void 0 : options.renderTag) === null || _a === void 0 ? void 0 : _a.call(options, this)) !== null && _b !== void 0 ? _b : this.toMarkdownDefault(options);
	}
	toMarkdownDefault(options) {
		const content = this.content.toMarkdown(options);
		if (this.inline) {
			const rendered = renderInlineTag(this.name, content, options !== null && options !== void 0 ? options : {});
			if (typeof rendered === "string") return rendered;
		}
		let marker = "";
		if ((options === null || options === void 0 ? void 0 : options.tag) === "italic" || (options === null || options === void 0 ? void 0 : options.tag) === void 0) marker = "*";
		else if ((options === null || options === void 0 ? void 0 : options.tag) === "bold") marker = "**";
		else if ((options === null || options === void 0 ? void 0 : options.tag) === "bold-italic") marker = "***";
		let text = `${marker}@${this.name}${marker}`;
		if (this.content.inlines.length === 1) text = `${text} — ${content}`;
		else if (this.content.inlines.length > 1) text = `${text}\n${content}`;
		if (this.inline) return `{${text}}`;
		else return text;
	}
};
function renderInlineTag(tag, content, options) {
	var _a, _b;
	if (tag === "linkplain" || tag === "linkcode" || tag === "link") {
		const index = content.indexOf(" ");
		let display = content;
		if (index > 0) {
			const displayStart = skipWhitespace(content, index);
			display = content.substring(displayStart);
			content = content.substring(0, index);
		}
		if (tag === "linkcode" || tag === "link" && options.link === "code") display = `\`${display}\``;
		const renderedLink = (_b = (_a = options.renderLink) === null || _a === void 0 ? void 0 : _a.call(options, content, display)) !== null && _b !== void 0 ? _b : renderLinkDefault(content, display);
		return renderedLink;
	}
	return void 0;
}
function renderLinkDefault(content, display) {
	try {
		URI.parse(content, true);
		return `[${display}](${content})`;
	} catch (_a) {
		return content;
	}
}
var JSDocTextImpl = class {
	constructor(lines, range) {
		this.inlines = lines;
		this.range = range;
	}
	toString() {
		let text = "";
		for (let i = 0; i < this.inlines.length; i++) {
			const inline = this.inlines[i];
			const next = this.inlines[i + 1];
			text += inline.toString();
			if (next && next.range.start.line > inline.range.start.line) text += "\n";
		}
		return text;
	}
	toMarkdown(options) {
		let text = "";
		for (let i = 0; i < this.inlines.length; i++) {
			const inline = this.inlines[i];
			const next = this.inlines[i + 1];
			text += inline.toMarkdown(options);
			if (next && next.range.start.line > inline.range.start.line) text += "\n";
		}
		return text;
	}
};
var JSDocLineImpl = class {
	constructor(text, range) {
		this.text = text;
		this.range = range;
	}
	toString() {
		return this.text;
	}
	toMarkdown() {
		return this.text;
	}
};
function fillNewlines(text) {
	if (text.endsWith("\n")) return "\n";
	else return "\n\n";
}
var JSDocDocumentationProvider = class {
	constructor(services) {
		this.indexManager = services.shared.workspace.IndexManager;
		this.commentProvider = services.documentation.CommentProvider;
	}
	getDocumentation(node) {
		const comment = this.commentProvider.getComment(node);
		if (comment && isJSDoc(comment)) {
			const parsedJSDoc = parseJSDoc(comment);
			return parsedJSDoc.toMarkdown({
				renderLink: (link, display) => {
					return this.documentationLinkRenderer(node, link, display);
				},
				renderTag: (tag) => {
					return this.documentationTagRenderer(node, tag);
				}
			});
		}
		return void 0;
	}
	documentationLinkRenderer(node, name, display) {
		var _a;
		const description = (_a = this.findNameInPrecomputedScopes(node, name)) !== null && _a !== void 0 ? _a : this.findNameInGlobalScope(node, name);
		if (description && description.nameSegment) {
			const line = description.nameSegment.range.start.line + 1;
			const character = description.nameSegment.range.start.character + 1;
			const uri = description.documentUri.with({ fragment: `L${line},${character}` });
			return `[${display}](${uri.toString()})`;
		} else return void 0;
	}
	documentationTagRenderer(_node, _tag) {
		return void 0;
	}
	findNameInPrecomputedScopes(node, name) {
		const document = getDocument(node);
		const precomputed = document.precomputedScopes;
		if (!precomputed) return void 0;
		let currentNode = node;
		do {
			const allDescriptions = precomputed.get(currentNode);
			const description = allDescriptions.find((e) => e.name === name);
			if (description) return description;
			currentNode = currentNode.$container;
		} while (currentNode);
		return void 0;
	}
	findNameInGlobalScope(node, name) {
		const description = this.indexManager.allElements().find((e) => e.name === name);
		return description;
	}
};
var DefaultCommentProvider = class {
	constructor(services) {
		this.grammarConfig = () => services.parser.GrammarConfig;
	}
	getComment(node) {
		var _a;
		if (isAstNodeWithComment(node)) return node.$comment;
		return (_a = findCommentNode(node.$cstNode, this.grammarConfig().multilineCommentRules)) === null || _a === void 0 ? void 0 : _a.text;
	}
};
var DefaultAsyncParser = class {
	constructor(services) {
		this.syncParser = services.parser.LangiumParser;
	}
	parse(text, _cancelToken) {
		return Promise.resolve(this.syncParser.parse(text));
	}
};
var AbstractThreadedAsyncParser = class {
	constructor(services) {
		this.threadCount = 8;
		this.terminationDelay = 200;
		this.workerPool = [];
		this.queue = [];
		this.hydrator = services.serializer.Hydrator;
	}
	initializeWorkers() {
		while (this.workerPool.length < this.threadCount) {
			const worker = this.createWorker();
			worker.onReady(() => {
				if (this.queue.length > 0) {
					const deferred = this.queue.shift();
					if (deferred) {
						worker.lock();
						deferred.resolve(worker);
					}
				}
			});
			this.workerPool.push(worker);
		}
	}
	async parse(text, cancelToken) {
		const worker = await this.acquireParserWorker(cancelToken);
		const deferred = new Deferred();
		let timeout;
		const cancellation = cancelToken.onCancellationRequested(() => {
			timeout = setTimeout(() => {
				this.terminateWorker(worker);
			}, this.terminationDelay);
		});
		worker.parse(text).then((result) => {
			const hydrated = this.hydrator.hydrate(result);
			deferred.resolve(hydrated);
		}).catch((err) => {
			deferred.reject(err);
		}).finally(() => {
			cancellation.dispose();
			clearTimeout(timeout);
		});
		return deferred.promise;
	}
	terminateWorker(worker) {
		worker.terminate();
		const index = this.workerPool.indexOf(worker);
		if (index >= 0) this.workerPool.splice(index, 1);
	}
	async acquireParserWorker(cancelToken) {
		this.initializeWorkers();
		for (const worker of this.workerPool) if (worker.ready) {
			worker.lock();
			return worker;
		}
		const deferred = new Deferred();
		cancelToken.onCancellationRequested(() => {
			const index = this.queue.indexOf(deferred);
			if (index >= 0) this.queue.splice(index, 1);
			deferred.reject(OperationCancelled);
		});
		this.queue.push(deferred);
		return deferred.promise;
	}
};
var ParserWorker = class {
	get ready() {
		return this._ready;
	}
	get onReady() {
		return this.onReadyEmitter.event;
	}
	constructor(sendMessage, onMessage, onError, terminate) {
		this.onReadyEmitter = new event_exports.Emitter();
		this.deferred = new Deferred();
		this._ready = true;
		this._parsing = false;
		this.sendMessage = sendMessage;
		this._terminate = terminate;
		onMessage((result) => {
			const parseResult = result;
			this.deferred.resolve(parseResult);
			this.unlock();
		});
		onError((error$1) => {
			this.deferred.reject(error$1);
			this.unlock();
		});
	}
	terminate() {
		this.deferred.reject(OperationCancelled);
		this._terminate();
	}
	lock() {
		this._ready = false;
	}
	unlock() {
		this._parsing = false;
		this._ready = true;
		this.onReadyEmitter.fire();
	}
	parse(text) {
		if (this._parsing) throw new Error("Parser worker is busy");
		this._parsing = true;
		this.deferred = new Deferred();
		this.sendMessage(text);
		return this.deferred.promise;
	}
};
var DefaultWorkspaceLock = class {
	constructor() {
		this.previousTokenSource = new cancellation_exports.CancellationTokenSource();
		this.writeQueue = [];
		this.readQueue = [];
		this.done = true;
	}
	write(action) {
		this.cancelWrite();
		const tokenSource = startCancelableOperation();
		this.previousTokenSource = tokenSource;
		return this.enqueue(this.writeQueue, action, tokenSource.token);
	}
	read(action) {
		return this.enqueue(this.readQueue, action);
	}
	enqueue(queue, action, cancellationToken = cancellation_exports.CancellationToken.None) {
		const deferred = new Deferred();
		const entry = {
			action,
			deferred,
			cancellationToken
		};
		queue.push(entry);
		this.performNextOperation();
		return deferred.promise;
	}
	async performNextOperation() {
		if (!this.done) return;
		const entries = [];
		if (this.writeQueue.length > 0) entries.push(this.writeQueue.shift());
		else if (this.readQueue.length > 0) entries.push(...this.readQueue.splice(0, this.readQueue.length));
		else return;
		this.done = false;
		await Promise.all(entries.map(async ({ action, deferred, cancellationToken }) => {
			try {
				const result = await Promise.resolve().then(() => action(cancellationToken));
				deferred.resolve(result);
			} catch (err) {
				if (isOperationCancelled(err)) deferred.resolve(void 0);
				else deferred.reject(err);
			}
		}));
		this.done = true;
		this.performNextOperation();
	}
	cancelWrite() {
		this.previousTokenSource.cancel();
	}
};
var DefaultHydrator = class {
	constructor(services) {
		this.grammarElementIdMap = new BiMap();
		this.tokenTypeIdMap = new BiMap();
		this.grammar = services.Grammar;
		this.lexer = services.parser.Lexer;
		this.linker = services.references.Linker;
	}
	dehydrate(result) {
		return {
			lexerErrors: result.lexerErrors,
			lexerReport: result.lexerReport ? this.dehydrateLexerReport(result.lexerReport) : void 0,
			parserErrors: result.parserErrors.map((e) => Object.assign(Object.assign({}, e), { message: e.message })),
			value: this.dehydrateAstNode(result.value, this.createDehyrationContext(result.value))
		};
	}
	dehydrateLexerReport(lexerReport) {
		return lexerReport;
	}
	createDehyrationContext(node) {
		const astNodes = /* @__PURE__ */ new Map();
		const cstNodes = /* @__PURE__ */ new Map();
		for (const astNode of streamAst(node)) astNodes.set(astNode, {});
		if (node.$cstNode) for (const cstNode of streamCst(node.$cstNode)) cstNodes.set(cstNode, {});
		return {
			astNodes,
			cstNodes
		};
	}
	dehydrateAstNode(node, context) {
		const obj = context.astNodes.get(node);
		obj.$type = node.$type;
		obj.$containerIndex = node.$containerIndex;
		obj.$containerProperty = node.$containerProperty;
		if (node.$cstNode !== void 0) obj.$cstNode = this.dehydrateCstNode(node.$cstNode, context);
		for (const [name, value] of Object.entries(node)) {
			if (name.startsWith("$")) continue;
			if (Array.isArray(value)) {
				const arr = [];
				obj[name] = arr;
				for (const item of value) if (isAstNode(item)) arr.push(this.dehydrateAstNode(item, context));
				else if (isReference(item)) arr.push(this.dehydrateReference(item, context));
				else arr.push(item);
			} else if (isAstNode(value)) obj[name] = this.dehydrateAstNode(value, context);
			else if (isReference(value)) obj[name] = this.dehydrateReference(value, context);
			else if (value !== void 0) obj[name] = value;
		}
		return obj;
	}
	dehydrateReference(reference, context) {
		const obj = {};
		obj.$refText = reference.$refText;
		if (reference.$refNode) obj.$refNode = context.cstNodes.get(reference.$refNode);
		return obj;
	}
	dehydrateCstNode(node, context) {
		const cstNode = context.cstNodes.get(node);
		if (isRootCstNode(node)) cstNode.fullText = node.fullText;
		else cstNode.grammarSource = this.getGrammarElementId(node.grammarSource);
		cstNode.hidden = node.hidden;
		cstNode.astNode = context.astNodes.get(node.astNode);
		if (isCompositeCstNode(node)) cstNode.content = node.content.map((child) => this.dehydrateCstNode(child, context));
		else if (isLeafCstNode(node)) {
			cstNode.tokenType = node.tokenType.name;
			cstNode.offset = node.offset;
			cstNode.length = node.length;
			cstNode.startLine = node.range.start.line;
			cstNode.startColumn = node.range.start.character;
			cstNode.endLine = node.range.end.line;
			cstNode.endColumn = node.range.end.character;
		}
		return cstNode;
	}
	hydrate(result) {
		const node = result.value;
		const context = this.createHydrationContext(node);
		if ("$cstNode" in node) this.hydrateCstNode(node.$cstNode, context);
		return {
			lexerErrors: result.lexerErrors,
			lexerReport: result.lexerReport,
			parserErrors: result.parserErrors,
			value: this.hydrateAstNode(node, context)
		};
	}
	createHydrationContext(node) {
		const astNodes = /* @__PURE__ */ new Map();
		const cstNodes = /* @__PURE__ */ new Map();
		for (const astNode of streamAst(node)) astNodes.set(astNode, {});
		let root;
		if (node.$cstNode) for (const cstNode of streamCst(node.$cstNode)) {
			let cst;
			if ("fullText" in cstNode) {
				cst = new RootCstNodeImpl(cstNode.fullText);
				root = cst;
			} else if ("content" in cstNode) cst = new CompositeCstNodeImpl();
			else if ("tokenType" in cstNode) cst = this.hydrateCstLeafNode(cstNode);
			if (cst) {
				cstNodes.set(cstNode, cst);
				cst.root = root;
			}
		}
		return {
			astNodes,
			cstNodes
		};
	}
	hydrateAstNode(node, context) {
		const astNode = context.astNodes.get(node);
		astNode.$type = node.$type;
		astNode.$containerIndex = node.$containerIndex;
		astNode.$containerProperty = node.$containerProperty;
		if (node.$cstNode) astNode.$cstNode = context.cstNodes.get(node.$cstNode);
		for (const [name, value] of Object.entries(node)) {
			if (name.startsWith("$")) continue;
			if (Array.isArray(value)) {
				const arr = [];
				astNode[name] = arr;
				for (const item of value) if (isAstNode(item)) arr.push(this.setParent(this.hydrateAstNode(item, context), astNode));
				else if (isReference(item)) arr.push(this.hydrateReference(item, astNode, name, context));
				else arr.push(item);
			} else if (isAstNode(value)) astNode[name] = this.setParent(this.hydrateAstNode(value, context), astNode);
			else if (isReference(value)) astNode[name] = this.hydrateReference(value, astNode, name, context);
			else if (value !== void 0) astNode[name] = value;
		}
		return astNode;
	}
	setParent(node, parent) {
		node.$container = parent;
		return node;
	}
	hydrateReference(reference, node, name, context) {
		return this.linker.buildReference(node, name, context.cstNodes.get(reference.$refNode), reference.$refText);
	}
	hydrateCstNode(cstNode, context, num = 0) {
		const cstNodeObj = context.cstNodes.get(cstNode);
		if (typeof cstNode.grammarSource === "number") cstNodeObj.grammarSource = this.getGrammarElement(cstNode.grammarSource);
		cstNodeObj.astNode = context.astNodes.get(cstNode.astNode);
		if (isCompositeCstNode(cstNodeObj)) for (const child of cstNode.content) {
			const hydrated = this.hydrateCstNode(child, context, num++);
			cstNodeObj.content.push(hydrated);
		}
		return cstNodeObj;
	}
	hydrateCstLeafNode(cstNode) {
		const tokenType = this.getTokenType(cstNode.tokenType);
		const offset = cstNode.offset;
		const length = cstNode.length;
		const startLine = cstNode.startLine;
		const startColumn = cstNode.startColumn;
		const endLine = cstNode.endLine;
		const endColumn = cstNode.endColumn;
		const hidden = cstNode.hidden;
		const node = new LeafCstNodeImpl(offset, length, {
			start: {
				line: startLine,
				character: startColumn
			},
			end: {
				line: endLine,
				character: endColumn
			}
		}, tokenType, hidden);
		return node;
	}
	getTokenType(name) {
		return this.lexer.definition[name];
	}
	getGrammarElementId(node) {
		if (!node) return void 0;
		if (this.grammarElementIdMap.size === 0) this.createGrammarElementIdMap();
		return this.grammarElementIdMap.get(node);
	}
	getGrammarElement(id) {
		if (this.grammarElementIdMap.size === 0) this.createGrammarElementIdMap();
		const element = this.grammarElementIdMap.getKey(id);
		return element;
	}
	createGrammarElementIdMap() {
		let id = 0;
		for (const element of streamAst(this.grammar)) if (isAbstractElement(element)) this.grammarElementIdMap.set(element, id++);
	}
};
function createDefaultCoreModule(context) {
	return {
		documentation: {
			CommentProvider: (services) => new DefaultCommentProvider(services),
			DocumentationProvider: (services) => new JSDocDocumentationProvider(services)
		},
		parser: {
			AsyncParser: (services) => new DefaultAsyncParser(services),
			GrammarConfig: (services) => createGrammarConfig(services),
			LangiumParser: (services) => createLangiumParser(services),
			CompletionParser: (services) => createCompletionParser(services),
			ValueConverter: () => new DefaultValueConverter(),
			TokenBuilder: () => new DefaultTokenBuilder(),
			Lexer: (services) => new DefaultLexer(services),
			ParserErrorMessageProvider: () => new LangiumParserErrorMessageProvider(),
			LexerErrorMessageProvider: () => new DefaultLexerErrorMessageProvider()
		},
		workspace: {
			AstNodeLocator: () => new DefaultAstNodeLocator(),
			AstNodeDescriptionProvider: (services) => new DefaultAstNodeDescriptionProvider(services),
			ReferenceDescriptionProvider: (services) => new DefaultReferenceDescriptionProvider(services)
		},
		references: {
			Linker: (services) => new DefaultLinker(services),
			NameProvider: () => new DefaultNameProvider(),
			ScopeProvider: (services) => new DefaultScopeProvider(services),
			ScopeComputation: (services) => new DefaultScopeComputation(services),
			References: (services) => new DefaultReferences(services)
		},
		serializer: {
			Hydrator: (services) => new DefaultHydrator(services),
			JsonSerializer: (services) => new DefaultJsonSerializer(services)
		},
		validation: {
			DocumentValidator: (services) => new DefaultDocumentValidator(services),
			ValidationRegistry: (services) => new ValidationRegistry(services)
		},
		shared: () => context.shared
	};
}
function createDefaultSharedCoreModule(context) {
	return {
		ServiceRegistry: (services) => new DefaultServiceRegistry(services),
		workspace: {
			LangiumDocuments: (services) => new DefaultLangiumDocuments(services),
			LangiumDocumentFactory: (services) => new DefaultLangiumDocumentFactory(services),
			DocumentBuilder: (services) => new DefaultDocumentBuilder(services),
			IndexManager: (services) => new DefaultIndexManager(services),
			WorkspaceManager: (services) => new DefaultWorkspaceManager(services),
			FileSystemProvider: (services) => context.fileSystemProvider(services),
			WorkspaceLock: () => new DefaultWorkspaceLock(),
			ConfigurationProvider: (services) => new DefaultConfigurationProvider(services)
		}
	};
}
var Module;
(function(Module$1) {
	Module$1.merge = (m1, m2) => _merge(_merge({}, m1), m2);
})(Module || (Module = {}));
function inject(module1, module2, module3, module4, module5, module6, module7, module8, module9) {
	const module = [
		module1,
		module2,
		module3,
		module4,
		module5,
		module6,
		module7,
		module8,
		module9
	].reduce(_merge, {});
	return _inject(module);
}
const isProxy = Symbol("isProxy");
function eagerLoad(item) {
	if (item && item[isProxy]) for (const value of Object.values(item)) eagerLoad(value);
	return item;
}
function _inject(module, injector) {
	const proxy = new Proxy({}, {
		deleteProperty: () => false,
		set: () => {
			throw new Error("Cannot set property on injected service container");
		},
		get: (obj, prop) => {
			if (prop === isProxy) return true;
			else return _resolve(obj, prop, module, injector || proxy);
		},
		getOwnPropertyDescriptor: (obj, prop) => (_resolve(obj, prop, module, injector || proxy), Object.getOwnPropertyDescriptor(obj, prop)),
		has: (_, prop) => prop in module,
		ownKeys: () => [...Object.getOwnPropertyNames(module)]
	});
	return proxy;
}
const __requested__ = Symbol();
function _resolve(obj, prop, module, injector) {
	if (prop in obj) {
		if (obj[prop] instanceof Error) throw new Error("Construction failure. Please make sure that your dependencies are constructable.", { cause: obj[prop] });
		if (obj[prop] === __requested__) throw new Error("Cycle detected. Please make \"" + String(prop) + "\" lazy. Visit https://langium.org/docs/reference/configuration-services/#resolving-cyclic-dependencies");
		return obj[prop];
	} else if (prop in module) {
		const value = module[prop];
		obj[prop] = __requested__;
		try {
			obj[prop] = typeof value === "function" ? value(injector) : _inject(value, injector);
		} catch (error$1) {
			obj[prop] = error$1 instanceof Error ? error$1 : void 0;
			throw error$1;
		}
		return obj[prop];
	} else return void 0;
}
function _merge(target, source) {
	if (source) {
		for (const [key, value2] of Object.entries(source)) if (value2 !== void 0) {
			const value1 = target[key];
			if (value1 !== null && value2 !== null && typeof value1 === "object" && typeof value2 === "object") target[key] = _merge(value1, value2);
			else target[key] = value2;
		}
	}
	return target;
}
const indentationBuilderDefaultOptions = {
	indentTokenName: "INDENT",
	dedentTokenName: "DEDENT",
	whitespaceTokenName: "WS",
	ignoreIndentationDelimiters: []
};
var LexingMode;
(function(LexingMode$1) {
	LexingMode$1["REGULAR"] = "indentation-sensitive";
	LexingMode$1["IGNORE_INDENTATION"] = "ignore-indentation";
})(LexingMode || (LexingMode = {}));
var IndentationAwareTokenBuilder = class extends DefaultTokenBuilder {
	constructor(options = indentationBuilderDefaultOptions) {
		super();
		this.indentationStack = [0];
		this.whitespaceRegExp = /[ \t]+/y;
		this.options = Object.assign(Object.assign({}, indentationBuilderDefaultOptions), options);
		this.indentTokenType = createToken({
			name: this.options.indentTokenName,
			pattern: this.indentMatcher.bind(this),
			line_breaks: false
		});
		this.dedentTokenType = createToken({
			name: this.options.dedentTokenName,
			pattern: this.dedentMatcher.bind(this),
			line_breaks: false
		});
	}
	buildTokens(grammar, options) {
		const tokenTypes = super.buildTokens(grammar, options);
		if (!isTokenTypeArray(tokenTypes)) throw new Error("Invalid tokens built by default builder");
		const { indentTokenName, dedentTokenName, whitespaceTokenName, ignoreIndentationDelimiters } = this.options;
		let dedent;
		let indent;
		let ws;
		const otherTokens = [];
		for (const tokenType of tokenTypes) {
			for (const [begin, end] of ignoreIndentationDelimiters) if (tokenType.name === begin) tokenType.PUSH_MODE = LexingMode.IGNORE_INDENTATION;
			else if (tokenType.name === end) tokenType.POP_MODE = true;
			if (tokenType.name === dedentTokenName) dedent = tokenType;
			else if (tokenType.name === indentTokenName) indent = tokenType;
			else if (tokenType.name === whitespaceTokenName) ws = tokenType;
			else otherTokens.push(tokenType);
		}
		if (!dedent || !indent || !ws) throw new Error("Some indentation/whitespace tokens not found!");
		if (ignoreIndentationDelimiters.length > 0) {
			const multiModeLexerDef = {
				modes: {
					[LexingMode.REGULAR]: [
						dedent,
						indent,
						...otherTokens,
						ws
					],
					[LexingMode.IGNORE_INDENTATION]: [...otherTokens, ws]
				},
				defaultMode: LexingMode.REGULAR
			};
			return multiModeLexerDef;
		} else return [
			dedent,
			indent,
			ws,
			...otherTokens
		];
	}
	flushLexingReport(text) {
		const result = super.flushLexingReport(text);
		return Object.assign(Object.assign({}, result), { remainingDedents: this.flushRemainingDedents(text) });
	}
	isStartOfLine(text, offset) {
		return offset === 0 || "\r\n".includes(text[offset - 1]);
	}
	matchWhitespace(text, offset, tokens, groups) {
		var _a;
		this.whitespaceRegExp.lastIndex = offset;
		const match = this.whitespaceRegExp.exec(text);
		return {
			currIndentLevel: (_a = match === null || match === void 0 ? void 0 : match[0].length) !== null && _a !== void 0 ? _a : 0,
			prevIndentLevel: this.indentationStack.at(-1),
			match
		};
	}
	createIndentationTokenInstance(tokenType, text, image, offset) {
		const lineNumber = this.getLineNumber(text, offset);
		return createTokenInstance(tokenType, image, offset, offset + image.length, lineNumber, lineNumber, 1, image.length);
	}
	getLineNumber(text, offset) {
		return text.substring(0, offset).split(/\r\n|\r|\n/).length;
	}
	indentMatcher(text, offset, tokens, groups) {
		if (!this.isStartOfLine(text, offset)) return null;
		const { currIndentLevel, prevIndentLevel, match } = this.matchWhitespace(text, offset, tokens, groups);
		if (currIndentLevel <= prevIndentLevel) return null;
		this.indentationStack.push(currIndentLevel);
		return match;
	}
	dedentMatcher(text, offset, tokens, groups) {
		var _a, _b, _c, _d;
		if (!this.isStartOfLine(text, offset)) return null;
		const { currIndentLevel, prevIndentLevel, match } = this.matchWhitespace(text, offset, tokens, groups);
		if (currIndentLevel >= prevIndentLevel) return null;
		const matchIndentIndex = this.indentationStack.lastIndexOf(currIndentLevel);
		if (matchIndentIndex === -1) {
			this.diagnostics.push({
				severity: "error",
				message: `Invalid dedent level ${currIndentLevel} at offset: ${offset}. Current indentation stack: ${this.indentationStack}`,
				offset,
				length: (_b = (_a = match === null || match === void 0 ? void 0 : match[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0,
				line: this.getLineNumber(text, offset),
				column: 1
			});
			return null;
		}
		const numberOfDedents = this.indentationStack.length - matchIndentIndex - 1;
		const newlinesBeforeDedent = (_d = (_c = text.substring(0, offset).match(/[\r\n]+$/)) === null || _c === void 0 ? void 0 : _c[0].length) !== null && _d !== void 0 ? _d : 1;
		for (let i = 0; i < numberOfDedents; i++) {
			const token = this.createIndentationTokenInstance(this.dedentTokenType, text, "", offset - (newlinesBeforeDedent - 1));
			tokens.push(token);
			this.indentationStack.pop();
		}
		return null;
	}
	buildTerminalToken(terminal) {
		const tokenType = super.buildTerminalToken(terminal);
		const { indentTokenName, dedentTokenName, whitespaceTokenName } = this.options;
		if (tokenType.name === indentTokenName) return this.indentTokenType;
		else if (tokenType.name === dedentTokenName) return this.dedentTokenType;
		else if (tokenType.name === whitespaceTokenName) return createToken({
			name: whitespaceTokenName,
			pattern: this.whitespaceRegExp,
			group: Lexer.SKIPPED
		});
		return tokenType;
	}
	flushRemainingDedents(text) {
		const remainingDedents = [];
		while (this.indentationStack.length > 1) {
			remainingDedents.push(this.createIndentationTokenInstance(this.dedentTokenType, text, "", text.length));
			this.indentationStack.pop();
		}
		this.indentationStack = [0];
		return remainingDedents;
	}
};
var IndentationAwareLexer = class extends DefaultLexer {
	constructor(services) {
		super(services);
		if (services.parser.TokenBuilder instanceof IndentationAwareTokenBuilder) this.indentationTokenBuilder = services.parser.TokenBuilder;
		else throw new Error("IndentationAwareLexer requires an accompanying IndentationAwareTokenBuilder");
	}
	tokenize(text, options = DEFAULT_TOKENIZE_OPTIONS) {
		const result = super.tokenize(text);
		const report = result.report;
		if ((options === null || options === void 0 ? void 0 : options.mode) === "full") result.tokens.push(...report.remainingDedents);
		report.remainingDedents = [];
		const { indentTokenType, dedentTokenType } = this.indentationTokenBuilder;
		const indentTokenIdx = indentTokenType.tokenTypeIdx;
		const dedentTokenIdx = dedentTokenType.tokenTypeIdx;
		const cleanTokens = [];
		const length = result.tokens.length - 1;
		for (let i = 0; i < length; i++) {
			const token = result.tokens[i];
			const nextToken = result.tokens[i + 1];
			if (token.tokenTypeIdx === indentTokenIdx && nextToken.tokenTypeIdx === dedentTokenIdx) {
				i++;
				continue;
			}
			cleanTokens.push(token);
		}
		if (length >= 0) cleanTokens.push(result.tokens[length]);
		result.tokens = cleanTokens;
		return result;
	}
};
var EmptyFileSystemProvider = class {
	readFile() {
		throw new Error("No file system is available.");
	}
	async readDirectory() {
		return [];
	}
};
const EmptyFileSystem = { fileSystemProvider: () => new EmptyFileSystemProvider() };
const minimalGrammarModule = {
	Grammar: () => void 0,
	LanguageMetaData: () => ({
		caseInsensitive: false,
		fileExtensions: [".langium"],
		languageId: "langium"
	})
};
const minimalSharedGrammarModule = { AstReflection: () => new LangiumGrammarAstReflection() };
function createMinimalGrammarServices() {
	const shared = inject(createDefaultSharedCoreModule(EmptyFileSystem), minimalSharedGrammarModule);
	const grammar = inject(createDefaultCoreModule({ shared }), minimalGrammarModule);
	shared.ServiceRegistry.register(grammar);
	return grammar;
}
function loadGrammarFromJson(json) {
	var _a;
	const services = createMinimalGrammarServices();
	const astNode = services.serializer.JsonSerializer.deserialize(json);
	services.shared.workspace.LangiumDocumentFactory.fromModel(astNode, URI.parse(`memory://${(_a = astNode.name) !== null && _a !== void 0 ? _a : "grammar"}.langium`));
	return astNode;
}
var utils_exports = {};
__export(utils_exports, {
	AstUtils: () => ast_utils_exports,
	BiMap: () => BiMap,
	Cancellation: () => cancellation_exports,
	ContextCache: () => ContextCache,
	CstUtils: () => cst_utils_exports,
	DONE_RESULT: () => DONE_RESULT,
	Deferred: () => Deferred,
	Disposable: () => Disposable,
	DisposableCache: () => DisposableCache,
	DocumentCache: () => DocumentCache,
	EMPTY_STREAM: () => EMPTY_STREAM,
	ErrorWithLocation: () => ErrorWithLocation,
	GrammarUtils: () => grammar_utils_exports,
	MultiMap: () => MultiMap,
	OperationCancelled: () => OperationCancelled,
	Reduction: () => Reduction,
	RegExpUtils: () => regexp_utils_exports,
	SimpleCache: () => SimpleCache,
	StreamImpl: () => StreamImpl,
	TreeStreamImpl: () => TreeStreamImpl,
	URI: () => URI,
	UriUtils: () => UriUtils,
	WorkspaceCache: () => WorkspaceCache,
	assertUnreachable: () => assertUnreachable,
	delayNextTick: () => delayNextTick,
	interruptAndCheck: () => interruptAndCheck,
	isOperationCancelled: () => isOperationCancelled,
	loadGrammarFromJson: () => loadGrammarFromJson,
	setInterruptionPeriod: () => setInterruptionPeriod,
	startCancelableOperation: () => startCancelableOperation,
	stream: () => stream
});
__reExport(utils_exports, event_exports);
var lib_exports = {};
__export(lib_exports, {
	AbstractAstReflection: () => AbstractAstReflection,
	AbstractCstNode: () => AbstractCstNode,
	AbstractLangiumParser: () => AbstractLangiumParser,
	AbstractParserErrorMessageProvider: () => AbstractParserErrorMessageProvider,
	AbstractThreadedAsyncParser: () => AbstractThreadedAsyncParser,
	AstUtils: () => ast_utils_exports,
	BiMap: () => BiMap,
	Cancellation: () => cancellation_exports,
	CompositeCstNodeImpl: () => CompositeCstNodeImpl,
	ContextCache: () => ContextCache,
	CstNodeBuilder: () => CstNodeBuilder,
	CstUtils: () => cst_utils_exports,
	DEFAULT_TOKENIZE_OPTIONS: () => DEFAULT_TOKENIZE_OPTIONS,
	DONE_RESULT: () => DONE_RESULT,
	DatatypeSymbol: () => DatatypeSymbol,
	DefaultAstNodeDescriptionProvider: () => DefaultAstNodeDescriptionProvider,
	DefaultAstNodeLocator: () => DefaultAstNodeLocator,
	DefaultAsyncParser: () => DefaultAsyncParser,
	DefaultCommentProvider: () => DefaultCommentProvider,
	DefaultConfigurationProvider: () => DefaultConfigurationProvider,
	DefaultDocumentBuilder: () => DefaultDocumentBuilder,
	DefaultDocumentValidator: () => DefaultDocumentValidator,
	DefaultHydrator: () => DefaultHydrator,
	DefaultIndexManager: () => DefaultIndexManager,
	DefaultJsonSerializer: () => DefaultJsonSerializer,
	DefaultLangiumDocumentFactory: () => DefaultLangiumDocumentFactory,
	DefaultLangiumDocuments: () => DefaultLangiumDocuments,
	DefaultLexer: () => DefaultLexer,
	DefaultLexerErrorMessageProvider: () => DefaultLexerErrorMessageProvider,
	DefaultLinker: () => DefaultLinker,
	DefaultNameProvider: () => DefaultNameProvider,
	DefaultReferenceDescriptionProvider: () => DefaultReferenceDescriptionProvider,
	DefaultReferences: () => DefaultReferences,
	DefaultScopeComputation: () => DefaultScopeComputation,
	DefaultScopeProvider: () => DefaultScopeProvider,
	DefaultServiceRegistry: () => DefaultServiceRegistry,
	DefaultTokenBuilder: () => DefaultTokenBuilder,
	DefaultValueConverter: () => DefaultValueConverter,
	DefaultWorkspaceLock: () => DefaultWorkspaceLock,
	DefaultWorkspaceManager: () => DefaultWorkspaceManager,
	Deferred: () => Deferred,
	Disposable: () => Disposable,
	DisposableCache: () => DisposableCache,
	DocumentCache: () => DocumentCache,
	DocumentState: () => DocumentState,
	DocumentValidator: () => DocumentValidator,
	EMPTY_SCOPE: () => EMPTY_SCOPE,
	EMPTY_STREAM: () => EMPTY_STREAM,
	EmptyFileSystem: () => EmptyFileSystem,
	EmptyFileSystemProvider: () => EmptyFileSystemProvider,
	ErrorWithLocation: () => ErrorWithLocation,
	GrammarAST: () => ast_exports,
	GrammarUtils: () => grammar_utils_exports,
	IndentationAwareLexer: () => IndentationAwareLexer,
	IndentationAwareTokenBuilder: () => IndentationAwareTokenBuilder,
	JSDocDocumentationProvider: () => JSDocDocumentationProvider,
	LangiumCompletionParser: () => LangiumCompletionParser,
	LangiumParser: () => LangiumParser,
	LangiumParserErrorMessageProvider: () => LangiumParserErrorMessageProvider,
	LeafCstNodeImpl: () => LeafCstNodeImpl,
	LexingMode: () => LexingMode,
	MapScope: () => MapScope,
	Module: () => Module,
	MultiMap: () => MultiMap,
	OperationCancelled: () => OperationCancelled,
	ParserWorker: () => ParserWorker,
	Reduction: () => Reduction,
	RegExpUtils: () => regexp_utils_exports,
	RootCstNodeImpl: () => RootCstNodeImpl,
	SimpleCache: () => SimpleCache,
	StreamImpl: () => StreamImpl,
	StreamScope: () => StreamScope,
	TextDocument: () => TextDocument,
	TreeStreamImpl: () => TreeStreamImpl,
	URI: () => URI,
	UriUtils: () => UriUtils,
	ValidationCategory: () => ValidationCategory,
	ValidationRegistry: () => ValidationRegistry,
	ValueConverter: () => ValueConverter,
	WorkspaceCache: () => WorkspaceCache,
	assertUnreachable: () => assertUnreachable,
	createCompletionParser: () => createCompletionParser,
	createDefaultCoreModule: () => createDefaultCoreModule,
	createDefaultSharedCoreModule: () => createDefaultSharedCoreModule,
	createGrammarConfig: () => createGrammarConfig,
	createLangiumParser: () => createLangiumParser,
	createParser: () => createParser,
	delayNextTick: () => delayNextTick,
	diagnosticData: () => diagnosticData,
	eagerLoad: () => eagerLoad,
	getDiagnosticRange: () => getDiagnosticRange,
	indentationBuilderDefaultOptions: () => indentationBuilderDefaultOptions,
	inject: () => inject,
	interruptAndCheck: () => interruptAndCheck,
	isAstNode: () => isAstNode,
	isAstNodeDescription: () => isAstNodeDescription,
	isAstNodeWithComment: () => isAstNodeWithComment,
	isCompositeCstNode: () => isCompositeCstNode,
	isIMultiModeLexerDefinition: () => isIMultiModeLexerDefinition,
	isJSDoc: () => isJSDoc,
	isLeafCstNode: () => isLeafCstNode,
	isLinkingError: () => isLinkingError,
	isNamed: () => isNamed,
	isOperationCancelled: () => isOperationCancelled,
	isReference: () => isReference,
	isRootCstNode: () => isRootCstNode,
	isTokenTypeArray: () => isTokenTypeArray,
	isTokenTypeDictionary: () => isTokenTypeDictionary,
	loadGrammarFromJson: () => loadGrammarFromJson,
	parseJSDoc: () => parseJSDoc,
	prepareLangiumParser: () => prepareLangiumParser,
	setInterruptionPeriod: () => setInterruptionPeriod,
	startCancelableOperation: () => startCancelableOperation,
	stream: () => stream,
	toDiagnosticData: () => toDiagnosticData,
	toDiagnosticSeverity: () => toDiagnosticSeverity
});
__reExport(lib_exports, utils_exports);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", {
	value,
	configurable: true
});
var Statement = "Statement";
var Architecture = "Architecture";
function isArchitecture(item) {
	return reflection.isInstance(item, Architecture);
}
__name(isArchitecture, "isArchitecture");
var Axis = "Axis";
var Branch = "Branch";
function isBranch(item) {
	return reflection.isInstance(item, Branch);
}
__name(isBranch, "isBranch");
var Checkout = "Checkout";
var CherryPicking = "CherryPicking";
var ClassDefStatement = "ClassDefStatement";
var Commit = "Commit";
function isCommit(item) {
	return reflection.isInstance(item, Commit);
}
__name(isCommit, "isCommit");
var Curve = "Curve";
var Edge = "Edge";
var Entry = "Entry";
var GitGraph = "GitGraph";
function isGitGraph(item) {
	return reflection.isInstance(item, GitGraph);
}
__name(isGitGraph, "isGitGraph");
var Group = "Group";
var Info = "Info";
function isInfo(item) {
	return reflection.isInstance(item, Info);
}
__name(isInfo, "isInfo");
var Item = "Item";
var Junction = "Junction";
var Merge = "Merge";
function isMerge(item) {
	return reflection.isInstance(item, Merge);
}
__name(isMerge, "isMerge");
var Option = "Option";
var Packet = "Packet";
function isPacket(item) {
	return reflection.isInstance(item, Packet);
}
__name(isPacket, "isPacket");
var PacketBlock = "PacketBlock";
function isPacketBlock(item) {
	return reflection.isInstance(item, PacketBlock);
}
__name(isPacketBlock, "isPacketBlock");
var Pie = "Pie";
function isPie(item) {
	return reflection.isInstance(item, Pie);
}
__name(isPie, "isPie");
var PieSection = "PieSection";
function isPieSection(item) {
	return reflection.isInstance(item, PieSection);
}
__name(isPieSection, "isPieSection");
var Radar = "Radar";
var Service = "Service";
var Treemap = "Treemap";
function isTreemap(item) {
	return reflection.isInstance(item, Treemap);
}
__name(isTreemap, "isTreemap");
var TreemapRow = "TreemapRow";
var Direction = "Direction";
var Leaf = "Leaf";
var Section = "Section";
var MermaidAstReflection = class extends AbstractAstReflection {
	static {
		__name(this, "MermaidAstReflection");
	}
	getAllTypes() {
		return [
			Architecture,
			Axis,
			Branch,
			Checkout,
			CherryPicking,
			ClassDefStatement,
			Commit,
			Curve,
			Direction,
			Edge,
			Entry,
			GitGraph,
			Group,
			Info,
			Item,
			Junction,
			Leaf,
			Merge,
			Option,
			Packet,
			PacketBlock,
			Pie,
			PieSection,
			Radar,
			Section,
			Service,
			Statement,
			Treemap,
			TreemapRow
		];
	}
	computeIsSubtype(subtype, supertype) {
		switch (subtype) {
			case Branch:
			case Checkout:
			case CherryPicking:
			case Commit:
			case Merge: return this.isSubtype(Statement, supertype);
			case Direction: return this.isSubtype(GitGraph, supertype);
			case Leaf:
			case Section: return this.isSubtype(Item, supertype);
			default: return false;
		}
	}
	getReferenceType(refInfo) {
		const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
		switch (referenceId) {
			case "Entry:axis": return Axis;
			default: throw new Error(`${referenceId} is not a valid reference id.`);
		}
	}
	getTypeMetaData(type) {
		switch (type) {
			case Architecture: return {
				name: Architecture,
				properties: [
					{ name: "accDescr" },
					{ name: "accTitle" },
					{
						name: "edges",
						defaultValue: []
					},
					{
						name: "groups",
						defaultValue: []
					},
					{
						name: "junctions",
						defaultValue: []
					},
					{
						name: "services",
						defaultValue: []
					},
					{ name: "title" }
				]
			};
			case Axis: return {
				name: Axis,
				properties: [{ name: "label" }, { name: "name" }]
			};
			case Branch: return {
				name: Branch,
				properties: [{ name: "name" }, { name: "order" }]
			};
			case Checkout: return {
				name: Checkout,
				properties: [{ name: "branch" }]
			};
			case CherryPicking: return {
				name: CherryPicking,
				properties: [
					{ name: "id" },
					{ name: "parent" },
					{
						name: "tags",
						defaultValue: []
					}
				]
			};
			case ClassDefStatement: return {
				name: ClassDefStatement,
				properties: [{ name: "className" }, { name: "styleText" }]
			};
			case Commit: return {
				name: Commit,
				properties: [
					{ name: "id" },
					{ name: "message" },
					{
						name: "tags",
						defaultValue: []
					},
					{ name: "type" }
				]
			};
			case Curve: return {
				name: Curve,
				properties: [
					{
						name: "entries",
						defaultValue: []
					},
					{ name: "label" },
					{ name: "name" }
				]
			};
			case Edge: return {
				name: Edge,
				properties: [
					{ name: "lhsDir" },
					{
						name: "lhsGroup",
						defaultValue: false
					},
					{ name: "lhsId" },
					{
						name: "lhsInto",
						defaultValue: false
					},
					{ name: "rhsDir" },
					{
						name: "rhsGroup",
						defaultValue: false
					},
					{ name: "rhsId" },
					{
						name: "rhsInto",
						defaultValue: false
					},
					{ name: "title" }
				]
			};
			case Entry: return {
				name: Entry,
				properties: [{ name: "axis" }, { name: "value" }]
			};
			case GitGraph: return {
				name: GitGraph,
				properties: [
					{ name: "accDescr" },
					{ name: "accTitle" },
					{
						name: "statements",
						defaultValue: []
					},
					{ name: "title" }
				]
			};
			case Group: return {
				name: Group,
				properties: [
					{ name: "icon" },
					{ name: "id" },
					{ name: "in" },
					{ name: "title" }
				]
			};
			case Info: return {
				name: Info,
				properties: [
					{ name: "accDescr" },
					{ name: "accTitle" },
					{ name: "title" }
				]
			};
			case Item: return {
				name: Item,
				properties: [{ name: "classSelector" }, { name: "name" }]
			};
			case Junction: return {
				name: Junction,
				properties: [{ name: "id" }, { name: "in" }]
			};
			case Merge: return {
				name: Merge,
				properties: [
					{ name: "branch" },
					{ name: "id" },
					{
						name: "tags",
						defaultValue: []
					},
					{ name: "type" }
				]
			};
			case Option: return {
				name: Option,
				properties: [{ name: "name" }, {
					name: "value",
					defaultValue: false
				}]
			};
			case Packet: return {
				name: Packet,
				properties: [
					{ name: "accDescr" },
					{ name: "accTitle" },
					{
						name: "blocks",
						defaultValue: []
					},
					{ name: "title" }
				]
			};
			case PacketBlock: return {
				name: PacketBlock,
				properties: [
					{ name: "bits" },
					{ name: "end" },
					{ name: "label" },
					{ name: "start" }
				]
			};
			case Pie: return {
				name: Pie,
				properties: [
					{ name: "accDescr" },
					{ name: "accTitle" },
					{
						name: "sections",
						defaultValue: []
					},
					{
						name: "showData",
						defaultValue: false
					},
					{ name: "title" }
				]
			};
			case PieSection: return {
				name: PieSection,
				properties: [{ name: "label" }, { name: "value" }]
			};
			case Radar: return {
				name: Radar,
				properties: [
					{ name: "accDescr" },
					{ name: "accTitle" },
					{
						name: "axes",
						defaultValue: []
					},
					{
						name: "curves",
						defaultValue: []
					},
					{
						name: "options",
						defaultValue: []
					},
					{ name: "title" }
				]
			};
			case Service: return {
				name: Service,
				properties: [
					{ name: "icon" },
					{ name: "iconText" },
					{ name: "id" },
					{ name: "in" },
					{ name: "title" }
				]
			};
			case Treemap: return {
				name: Treemap,
				properties: [
					{ name: "accDescr" },
					{ name: "accTitle" },
					{ name: "title" },
					{
						name: "TreemapRows",
						defaultValue: []
					}
				]
			};
			case TreemapRow: return {
				name: TreemapRow,
				properties: [{ name: "indent" }, { name: "item" }]
			};
			case Direction: return {
				name: Direction,
				properties: [
					{ name: "accDescr" },
					{ name: "accTitle" },
					{ name: "dir" },
					{
						name: "statements",
						defaultValue: []
					},
					{ name: "title" }
				]
			};
			case Leaf: return {
				name: Leaf,
				properties: [
					{ name: "classSelector" },
					{ name: "name" },
					{ name: "value" }
				]
			};
			case Section: return {
				name: Section,
				properties: [{ name: "classSelector" }, { name: "name" }]
			};
			default: return {
				name: type,
				properties: []
			};
		}
	}
};
var reflection = new MermaidAstReflection();
var loadedInfoGrammar;
var InfoGrammar = /* @__PURE__ */ __name(() => loadedInfoGrammar ?? (loadedInfoGrammar = loadGrammarFromJson(`{"$type":"Grammar","isDeclared":true,"name":"Info","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Info","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"info"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"},{"$type":"Group","elements":[{"$type":"Keyword","value":"showInfo"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[],"cardinality":"?"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@7"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "InfoGrammar");
var loadedPacketGrammar;
var PacketGrammar = /* @__PURE__ */ __name(() => loadedPacketGrammar ?? (loadedPacketGrammar = loadGrammarFromJson(`{"$type":"Grammar","isDeclared":true,"name":"Packet","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Packet","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"packet"},{"$type":"Keyword","value":"packet-beta"}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"Assignment","feature":"blocks","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PacketBlock","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"start","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"end","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}],"cardinality":"?"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"+"},{"$type":"Assignment","feature":"bits","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@9"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "PacketGrammar");
var loadedPieGrammar;
var PieGrammar = /* @__PURE__ */ __name(() => loadedPieGrammar ?? (loadedPieGrammar = loadGrammarFromJson(`{"$type":"Grammar","isDeclared":true,"name":"Pie","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Pie","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"pie"},{"$type":"Assignment","feature":"showData","operator":"?=","terminal":{"$type":"Keyword","value":"showData"},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"Assignment","feature":"sections","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PieSection","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@8"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@9"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "PieGrammar");
var loadedArchitectureGrammar;
var ArchitectureGrammar = /* @__PURE__ */ __name(() => loadedArchitectureGrammar ?? (loadedArchitectureGrammar = loadGrammarFromJson(`{"$type":"Grammar","isDeclared":true,"name":"Architecture","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Architecture","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[],"cardinality":"*"},{"$type":"Keyword","value":"architecture-beta"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"groups","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Assignment","feature":"services","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Assignment","feature":"junctions","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Assignment","feature":"edges","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"LeftPort","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"lhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"RightPort","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rhsDir","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Keyword","value":":"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Arrow","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Assignment","feature":"lhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"--"},{"$type":"Group","elements":[{"$type":"Keyword","value":"-"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":"-"}]}]},{"$type":"Assignment","feature":"rhsInto","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"group"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]},"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Service","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"service"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"iconText","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]}},{"$type":"Assignment","feature":"icon","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}}],"cardinality":"?"},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Junction","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"junction"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"in"},{"$type":"Assignment","feature":"in","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Edge","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"lhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"lhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Assignment","feature":"rhsId","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Assignment","feature":"rhsGroup","operator":"?=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ARROW_DIRECTION","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"L"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"R"}}]},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"T"}}]},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"B"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_GROUP","definition":{"$type":"RegexToken","regex":"/\\\\{group\\\\}/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARROW_INTO","definition":{"$type":"RegexToken","regex":"/<|>/"},"fragment":false,"hidden":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@18"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@19"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false},{"$type":"TerminalRule","name":"ARCH_ICON","definition":{"$type":"RegexToken","regex":"/\\\\([\\\\w-:]+\\\\)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ARCH_TITLE","definition":{"$type":"RegexToken","regex":"/\\\\[[\\\\w ]+\\\\]/"},"fragment":false,"hidden":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "ArchitectureGrammar");
var loadedGitGraphGrammar;
var GitGraphGrammar = /* @__PURE__ */ __name(() => loadedGitGraphGrammar ?? (loadedGitGraphGrammar = loadGrammarFromJson(`{"$type":"Grammar","isDeclared":true,"name":"GitGraph","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"GitGraph","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"Keyword","value":":"}]},{"$type":"Keyword","value":"gitGraph:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"gitGraph"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]},{"$type":"Keyword","value":":"}]}]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"Assignment","feature":"statements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Statement","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Direction","definition":{"$type":"Assignment","feature":"dir","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"LR"},{"$type":"Keyword","value":"TB"},{"$type":"Keyword","value":"BT"}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Commit","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"commit"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"msg:","cardinality":"?"},{"$type":"Assignment","feature":"message","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Branch","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"branch"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"order:"},{"$type":"Assignment","feature":"order","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Merge","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"merge"},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"type:"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"NORMAL"},{"$type":"Keyword","value":"REVERSE"},{"$type":"Keyword","value":"HIGHLIGHT"}]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Checkout","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"checkout"},{"$type":"Keyword","value":"switch"}]},{"$type":"Assignment","feature":"branch","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CherryPicking","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"cherry-pick"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"id:"},{"$type":"Assignment","feature":"id","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"tag:"},{"$type":"Assignment","feature":"tags","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"parent:"},{"$type":"Assignment","feature":"parent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@14"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false},{"$type":"TerminalRule","name":"REFERENCE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\w([-\\\\./\\\\w]*[-\\\\w])?/"},"fragment":false,"hidden":false}],"definesHiddenTokens":false,"hiddenTokens":[],"interfaces":[],"types":[],"usedGrammars":[]}`)), "GitGraphGrammar");
var loadedRadarGrammar;
var RadarGrammar = /* @__PURE__ */ __name(() => loadedRadarGrammar ?? (loadedRadarGrammar = loadGrammarFromJson(`{"$type":"Grammar","isDeclared":true,"name":"Radar","imports":[],"rules":[{"$type":"ParserRule","entry":true,"name":"Radar","definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":"radar-beta:"},{"$type":"Group","elements":[{"$type":"Keyword","value":"radar-beta"},{"$type":"Keyword","value":":"}]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Keyword","value":"axis"},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"axes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"curve"},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"curves","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"options","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]}}],"cardinality":"*"}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Label","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"label","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Axis","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Curve","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[],"cardinality":"?"},{"$type":"Keyword","value":"{"},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"Entries","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"},{"$type":"Assignment","feature":"entries","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]}}],"cardinality":"*"},{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"*"}]}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"DetailedEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"axis","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@2"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Keyword","value":":","cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NumberEntry","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Option","definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"showLegend"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"ticks"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"max"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"min"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Keyword","value":"graticule"}},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"GRATICULE","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"circle"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"polygon"}}]},"fragment":false,"hidden":false},{"$type":"ParserRule","fragment":true,"name":"EOL","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[],"cardinality":"+"},{"$type":"EndOfFile"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"FLOAT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/[0-9]+\\\\.[0-9]+(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"INT","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"RegexToken","regex":"/0|[1-9][0-9]*(?!\\\\.)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER","type":{"$type":"ReturnType","name":"number"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@15"}},{"$type":"TerminalRuleCall","rule":{"$ref":"#/rules@16"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\"([^\\"\\\\\\\\]|\\\\\\\\.)*\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/[\\\\w]([-\\\\w]*\\\\w)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NEWLINE","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WHITESPACE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"YAML","definition":{"$type":"RegexToken","regex":"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"DIRECTIVE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SINGLE_LINE_COMMENT","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*%%[^\\\\n\\\\r]*/"},"fragment":false}],"interfaces":[{"$type":"Interface","name":"Entry","attributes":[{"$type":"TypeAttribute","name":"axis","isOptional":true,"type":{"$type":"ReferenceType","referenceType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@2"}}}},{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}],"superTypes":[]}],"definesHiddenTokens":false,"hiddenTokens":[],"types":[],"usedGrammars":[]}`)), "RadarGrammar");
var loadedTreemapGrammar;
var TreemapGrammar = /* @__PURE__ */ __name(() => loadedTreemapGrammar ?? (loadedTreemapGrammar = loadGrammarFromJson(`{"$type":"Grammar","isDeclared":true,"name":"Treemap","rules":[{"$type":"ParserRule","fragment":true,"name":"TitleAndAccessibilities","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"accDescr","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}},{"$type":"Assignment","feature":"accTitle","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]}},{"$type":"Assignment","feature":"title","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}}],"cardinality":"+"},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"BOOLEAN","type":{"$type":"ReturnType","name":"boolean"},"definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"true"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"false"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_DESCR","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ACC_TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"TITLE","definition":{"$type":"RegexToken","regex":"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/"},"fragment":false,"hidden":false},{"$type":"ParserRule","entry":true,"name":"Treemap","returnType":{"$ref":"#/interfaces@4"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@0"},"arguments":[]},{"$type":"Assignment","feature":"TreemapRows","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"TREEMAP_KEYWORD","definition":{"$type":"TerminalAlternatives","elements":[{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap-beta"}},{"$type":"CharacterRange","left":{"$type":"Keyword","value":"treemap"}}]},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"CLASS_DEF","definition":{"$type":"RegexToken","regex":"/classDef\\\\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\\\\s+([^;\\\\r\\\\n]*))?(?:;)?/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STYLE_SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":::"}},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"SEPARATOR","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":":"}},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"COMMA","definition":{"$type":"CharacterRange","left":{"$type":"Keyword","value":","}},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/[ \\\\t]+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\%\\\\%[^\\\\n]*/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"NL","definition":{"$type":"RegexToken","regex":"/\\\\r?\\\\n/"},"fragment":false},{"$type":"ParserRule","name":"TreemapRow","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"indent","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"item","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ClassDef","dataType":"string","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Item","returnType":{"$ref":"#/interfaces@0"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Section","returnType":{"$ref":"#/interfaces@1"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Leaf","returnType":{"$ref":"#/interfaces@2"},"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"?"},{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}]},{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Assignment","feature":"classSelector","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"INDENTATION","definition":{"$type":"RegexToken","regex":"/[ \\\\t]{1,}/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"ID2","definition":{"$type":"RegexToken","regex":"/[a-zA-Z_][a-zA-Z0-9_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"NUMBER2","definition":{"$type":"RegexToken","regex":"/[0-9_\\\\.\\\\,]+/"},"fragment":false,"hidden":false},{"$type":"ParserRule","name":"MyNumber","dataType":"number","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"STRING2","definition":{"$type":"RegexToken","regex":"/\\"[^\\"]*\\"|'[^']*'/"},"fragment":false,"hidden":false}],"interfaces":[{"$type":"Interface","name":"Item","attributes":[{"$type":"TypeAttribute","name":"name","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"classSelector","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]},{"$type":"Interface","name":"Section","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[]},{"$type":"Interface","name":"Leaf","superTypes":[{"$ref":"#/interfaces@0"}],"attributes":[{"$type":"TypeAttribute","name":"value","type":{"$type":"SimpleType","primitiveType":"number"},"isOptional":false}]},{"$type":"Interface","name":"ClassDefStatement","attributes":[{"$type":"TypeAttribute","name":"className","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false},{"$type":"TypeAttribute","name":"styleText","type":{"$type":"SimpleType","primitiveType":"string"},"isOptional":false}],"superTypes":[]},{"$type":"Interface","name":"Treemap","attributes":[{"$type":"TypeAttribute","name":"TreemapRows","type":{"$type":"ArrayType","elementType":{"$type":"SimpleType","typeRef":{"$ref":"#/rules@14"}}},"isOptional":false},{"$type":"TypeAttribute","name":"title","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accTitle","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}},{"$type":"TypeAttribute","name":"accDescr","isOptional":true,"type":{"$type":"SimpleType","primitiveType":"string"}}],"superTypes":[]}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"types":[],"usedGrammars":[],"$comment":"/**\\n * Treemap grammar for Langium\\n * Converted from mindmap grammar\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treemap keyword, allowing for empty lines and comments before the\\n * treemap declaration.\\n */"}`)), "TreemapGrammar");
var InfoLanguageMetaData = {
	languageId: "info",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: false,
	mode: "production"
};
var PacketLanguageMetaData = {
	languageId: "packet",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: false,
	mode: "production"
};
var PieLanguageMetaData = {
	languageId: "pie",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: false,
	mode: "production"
};
var ArchitectureLanguageMetaData = {
	languageId: "architecture",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: false,
	mode: "production"
};
var GitGraphLanguageMetaData = {
	languageId: "gitGraph",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: false,
	mode: "production"
};
var RadarLanguageMetaData = {
	languageId: "radar",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: false,
	mode: "production"
};
var TreemapLanguageMetaData = {
	languageId: "treemap",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: false,
	mode: "production"
};
var MermaidGeneratedSharedModule = { AstReflection: /* @__PURE__ */ __name(() => new MermaidAstReflection(), "AstReflection") };
var InfoGeneratedModule = {
	Grammar: /* @__PURE__ */ __name(() => InfoGrammar(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ __name(() => InfoLanguageMetaData, "LanguageMetaData"),
	parser: {}
};
var PacketGeneratedModule = {
	Grammar: /* @__PURE__ */ __name(() => PacketGrammar(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ __name(() => PacketLanguageMetaData, "LanguageMetaData"),
	parser: {}
};
var PieGeneratedModule = {
	Grammar: /* @__PURE__ */ __name(() => PieGrammar(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ __name(() => PieLanguageMetaData, "LanguageMetaData"),
	parser: {}
};
var ArchitectureGeneratedModule = {
	Grammar: /* @__PURE__ */ __name(() => ArchitectureGrammar(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ __name(() => ArchitectureLanguageMetaData, "LanguageMetaData"),
	parser: {}
};
var GitGraphGeneratedModule = {
	Grammar: /* @__PURE__ */ __name(() => GitGraphGrammar(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ __name(() => GitGraphLanguageMetaData, "LanguageMetaData"),
	parser: {}
};
var RadarGeneratedModule = {
	Grammar: /* @__PURE__ */ __name(() => RadarGrammar(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ __name(() => RadarLanguageMetaData, "LanguageMetaData"),
	parser: {}
};
var TreemapGeneratedModule = {
	Grammar: /* @__PURE__ */ __name(() => TreemapGrammar(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ __name(() => TreemapLanguageMetaData, "LanguageMetaData"),
	parser: {}
};
var accessibilityDescrRegex = /accDescr(?:[\t ]*:([^\n\r]*)|\s*{([^}]*)})/;
var accessibilityTitleRegex = /accTitle[\t ]*:([^\n\r]*)/;
var titleRegex = /title([\t ][^\n\r]*|)/;
var rulesRegexes = {
	ACC_DESCR: accessibilityDescrRegex,
	ACC_TITLE: accessibilityTitleRegex,
	TITLE: titleRegex
};
var AbstractMermaidValueConverter = class extends DefaultValueConverter {
	static {
		__name(this, "AbstractMermaidValueConverter");
	}
	runConverter(rule, input, cstNode) {
		let value = this.runCommonConverter(rule, input, cstNode);
		if (value === void 0) value = this.runCustomConverter(rule, input, cstNode);
		if (value === void 0) return super.runConverter(rule, input, cstNode);
		return value;
	}
	runCommonConverter(rule, input, _cstNode) {
		const regex = rulesRegexes[rule.name];
		if (regex === void 0) return void 0;
		const match = regex.exec(input);
		if (match === null) return void 0;
		if (match[1] !== void 0) return match[1].trim().replace(/[\t ]{2,}/gm, " ");
		if (match[2] !== void 0) return match[2].replace(/^\s*/gm, "").replace(/\s+$/gm, "").replace(/[\t ]{2,}/gm, " ").replace(/[\n\r]{2,}/gm, "\n");
		return void 0;
	}
};
var CommonValueConverter = class extends AbstractMermaidValueConverter {
	static {
		__name(this, "CommonValueConverter");
	}
	runCustomConverter(_rule, _input, _cstNode) {
		return void 0;
	}
};
var AbstractMermaidTokenBuilder = class extends DefaultTokenBuilder {
	static {
		__name(this, "AbstractMermaidTokenBuilder");
	}
	constructor(keywords) {
		super();
		this.keywords = new Set(keywords);
	}
	buildKeywordTokens(rules, terminalTokens, options) {
		const tokenTypes = super.buildKeywordTokens(rules, terminalTokens, options);
		tokenTypes.forEach((tokenType) => {
			if (this.keywords.has(tokenType.name) && tokenType.PATTERN !== void 0) tokenType.PATTERN = /* @__PURE__ */ new RegExp(tokenType.PATTERN.toString() + "(?:(?=%%)|(?!\\S))");
		});
		return tokenTypes;
	}
};
(class extends AbstractMermaidTokenBuilder {
	static {
		__name(this, "CommonTokenBuilder");
	}
});
export { AbstractMermaidTokenBuilder as b, AbstractMermaidValueConverter as c, ArchitectureGeneratedModule as d, CommonValueConverter as e, GitGraphGeneratedModule as f, InfoGeneratedModule as g, MermaidGeneratedSharedModule as h, PacketGeneratedModule as i, PieGeneratedModule as j, RadarGeneratedModule as k, TreemapGeneratedModule as l, __name as m, EmptyFileSystem as n, inject as o, createDefaultCoreModule as p, createDefaultSharedCoreModule as q };
