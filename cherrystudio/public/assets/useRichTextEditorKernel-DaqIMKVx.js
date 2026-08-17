import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { $ as Decoration, ct as Mapping, et as DecorationSet, it as PluginKey, r as Extension, rt as Plugin } from "./dist-DRPoOLZR.js";
import { o as useEditor } from "./dist-B9jpO_k0.js";
var GOOD_LEAF_SIZE = 200;
var RopeSequence = function RopeSequence$1() {};
RopeSequence.prototype.append = function append(other) {
	if (!other.length) return this;
	other = RopeSequence.from(other);
	return !this.length && other || other.length < GOOD_LEAF_SIZE && this.leafAppend(other) || this.length < GOOD_LEAF_SIZE && other.leafPrepend(this) || this.appendInner(other);
};
RopeSequence.prototype.prepend = function prepend(other) {
	if (!other.length) return this;
	return RopeSequence.from(other).append(this);
};
RopeSequence.prototype.appendInner = function appendInner(other) {
	return new Append(this, other);
};
RopeSequence.prototype.slice = function slice(from, to) {
	if (from === void 0) from = 0;
	if (to === void 0) to = this.length;
	if (from >= to) return RopeSequence.empty;
	return this.sliceInner(Math.max(0, from), Math.min(this.length, to));
};
RopeSequence.prototype.get = function get(i) {
	if (i < 0 || i >= this.length) return;
	return this.getInner(i);
};
RopeSequence.prototype.forEach = function forEach(f, from, to) {
	if (from === void 0) from = 0;
	if (to === void 0) to = this.length;
	if (from <= to) this.forEachInner(f, from, to, 0);
	else this.forEachInvertedInner(f, from, to, 0);
};
RopeSequence.prototype.map = function map(f, from, to) {
	if (from === void 0) from = 0;
	if (to === void 0) to = this.length;
	var result = [];
	this.forEach(function(elt, i) {
		return result.push(f(elt, i));
	}, from, to);
	return result;
};
RopeSequence.from = function from(values) {
	if (values instanceof RopeSequence) return values;
	return values && values.length ? new Leaf(values) : RopeSequence.empty;
};
var Leaf = /* @__PURE__ */ function(RopeSequence$1) {
	function Leaf$1(values) {
		RopeSequence$1.call(this);
		this.values = values;
	}
	if (RopeSequence$1) Leaf$1.__proto__ = RopeSequence$1;
	Leaf$1.prototype = Object.create(RopeSequence$1 && RopeSequence$1.prototype);
	Leaf$1.prototype.constructor = Leaf$1;
	var prototypeAccessors = {
		length: { configurable: true },
		depth: { configurable: true }
	};
	Leaf$1.prototype.flatten = function flatten() {
		return this.values;
	};
	Leaf$1.prototype.sliceInner = function sliceInner(from, to) {
		if (from == 0 && to == this.length) return this;
		return new Leaf$1(this.values.slice(from, to));
	};
	Leaf$1.prototype.getInner = function getInner(i) {
		return this.values[i];
	};
	Leaf$1.prototype.forEachInner = function forEachInner(f, from, to, start) {
		for (var i = from; i < to; i++) if (f(this.values[i], start + i) === false) return false;
	};
	Leaf$1.prototype.forEachInvertedInner = function forEachInvertedInner(f, from, to, start) {
		for (var i = from - 1; i >= to; i--) if (f(this.values[i], start + i) === false) return false;
	};
	Leaf$1.prototype.leafAppend = function leafAppend(other) {
		if (this.length + other.length <= GOOD_LEAF_SIZE) return new Leaf$1(this.values.concat(other.flatten()));
	};
	Leaf$1.prototype.leafPrepend = function leafPrepend(other) {
		if (this.length + other.length <= GOOD_LEAF_SIZE) return new Leaf$1(other.flatten().concat(this.values));
	};
	prototypeAccessors.length.get = function() {
		return this.values.length;
	};
	prototypeAccessors.depth.get = function() {
		return 0;
	};
	Object.defineProperties(Leaf$1.prototype, prototypeAccessors);
	return Leaf$1;
}(RopeSequence);
RopeSequence.empty = new Leaf([]);
var Append = /* @__PURE__ */ function(RopeSequence$1) {
	function Append$1(left, right) {
		RopeSequence$1.call(this);
		this.left = left;
		this.right = right;
		this.length = left.length + right.length;
		this.depth = Math.max(left.depth, right.depth) + 1;
	}
	if (RopeSequence$1) Append$1.__proto__ = RopeSequence$1;
	Append$1.prototype = Object.create(RopeSequence$1 && RopeSequence$1.prototype);
	Append$1.prototype.constructor = Append$1;
	Append$1.prototype.flatten = function flatten() {
		return this.left.flatten().concat(this.right.flatten());
	};
	Append$1.prototype.getInner = function getInner(i) {
		return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length);
	};
	Append$1.prototype.forEachInner = function forEachInner(f, from, to, start) {
		var leftLen = this.left.length;
		if (from < leftLen && this.left.forEachInner(f, from, Math.min(to, leftLen), start) === false) return false;
		if (to > leftLen && this.right.forEachInner(f, Math.max(from - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false) return false;
	};
	Append$1.prototype.forEachInvertedInner = function forEachInvertedInner(f, from, to, start) {
		var leftLen = this.left.length;
		if (from > leftLen && this.right.forEachInvertedInner(f, from - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false) return false;
		if (to < leftLen && this.left.forEachInvertedInner(f, Math.min(from, leftLen), to, start) === false) return false;
	};
	Append$1.prototype.sliceInner = function sliceInner(from, to) {
		if (from == 0 && to == this.length) return this;
		var leftLen = this.left.length;
		if (to <= leftLen) return this.left.slice(from, to);
		if (from >= leftLen) return this.right.slice(from - leftLen, to - leftLen);
		return this.left.slice(from, leftLen).append(this.right.slice(0, to - leftLen));
	};
	Append$1.prototype.leafAppend = function leafAppend(other) {
		var inner = this.right.leafAppend(other);
		if (inner) return new Append$1(this.left, inner);
	};
	Append$1.prototype.leafPrepend = function leafPrepend(other) {
		var inner = this.left.leafPrepend(other);
		if (inner) return new Append$1(inner, this.right);
	};
	Append$1.prototype.appendInner = function appendInner(other) {
		if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1) return new Append$1(this.left, new Append$1(this.right, other));
		return new Append$1(this, other);
	};
	return Append$1;
}(RopeSequence);
var dist_default = RopeSequence;
var max_empty_items = 500;
var Branch = class Branch {
	constructor(items, eventCount) {
		this.items = items;
		this.eventCount = eventCount;
	}
	popEvent(state, preserveItems) {
		if (this.eventCount == 0) return null;
		let end = this.items.length;
		for (;; end--) if (this.items.get(end - 1).selection) {
			--end;
			break;
		}
		let remap, mapFrom;
		if (preserveItems) {
			remap = this.remapping(end, this.items.length);
			mapFrom = remap.maps.length;
		}
		let transform = state.tr;
		let selection, remaining;
		let addAfter = [], addBefore = [];
		this.items.forEach((item, i) => {
			if (!item.step) {
				if (!remap) {
					remap = this.remapping(end, i + 1);
					mapFrom = remap.maps.length;
				}
				mapFrom--;
				addBefore.push(item);
				return;
			}
			if (remap) {
				addBefore.push(new Item(item.map));
				let step = item.step.map(remap.slice(mapFrom)), map;
				if (step && transform.maybeStep(step).doc) {
					map = transform.mapping.maps[transform.mapping.maps.length - 1];
					addAfter.push(new Item(map, void 0, void 0, addAfter.length + addBefore.length));
				}
				mapFrom--;
				if (map) remap.appendMap(map, mapFrom);
			} else transform.maybeStep(item.step);
			if (item.selection) {
				selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
				remaining = new Branch(this.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this.eventCount - 1);
				return false;
			}
		}, this.items.length, 0);
		return {
			remaining,
			transform,
			selection
		};
	}
	addTransform(transform, selection, histOptions, preserveItems) {
		let newItems = [], eventCount = this.eventCount;
		let oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;
		for (let i = 0; i < transform.steps.length; i++) {
			let step = transform.steps[i].invert(transform.docs[i]);
			let item = new Item(transform.mapping.maps[i], step, selection), merged;
			if (merged = lastItem && lastItem.merge(item)) {
				item = merged;
				if (i) newItems.pop();
				else oldItems = oldItems.slice(0, oldItems.length - 1);
			}
			newItems.push(item);
			if (selection) {
				eventCount++;
				selection = void 0;
			}
			if (!preserveItems) lastItem = item;
		}
		let overflow = eventCount - histOptions.depth;
		if (overflow > DEPTH_OVERFLOW) {
			oldItems = cutOffEvents(oldItems, overflow);
			eventCount -= overflow;
		}
		return new Branch(oldItems.append(newItems), eventCount);
	}
	remapping(from, to) {
		let maps = new Mapping();
		this.items.forEach((item, i) => {
			let mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from ? maps.maps.length - item.mirrorOffset : void 0;
			maps.appendMap(item.map, mirrorPos);
		}, from, to);
		return maps;
	}
	addMaps(array) {
		if (this.eventCount == 0) return this;
		return new Branch(this.items.append(array.map((map) => new Item(map))), this.eventCount);
	}
	rebased(rebasedTransform, rebasedCount) {
		if (!this.eventCount) return this;
		let rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);
		let mapping = rebasedTransform.mapping;
		let newUntil = rebasedTransform.steps.length;
		let eventCount = this.eventCount;
		this.items.forEach((item) => {
			if (item.selection) eventCount--;
		}, start);
		let iRebased = rebasedCount;
		this.items.forEach((item) => {
			let pos = mapping.getMirror(--iRebased);
			if (pos == null) return;
			newUntil = Math.min(newUntil, pos);
			let map = mapping.maps[pos];
			if (item.step) {
				let step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
				let selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
				if (selection) eventCount++;
				rebasedItems.push(new Item(map, step, selection));
			} else rebasedItems.push(new Item(map));
		}, start);
		let newMaps = [];
		for (let i = rebasedCount; i < newUntil; i++) newMaps.push(new Item(mapping.maps[i]));
		let branch = new Branch(this.items.slice(0, start).append(newMaps).append(rebasedItems), eventCount);
		if (branch.emptyItemCount() > max_empty_items) branch = branch.compress(this.items.length - rebasedItems.length);
		return branch;
	}
	emptyItemCount() {
		let count = 0;
		this.items.forEach((item) => {
			if (!item.step) count++;
		});
		return count;
	}
	compress(upto = this.items.length) {
		let remap = this.remapping(0, upto), mapFrom = remap.maps.length;
		let items = [], events = 0;
		this.items.forEach((item, i) => {
			if (i >= upto) {
				items.push(item);
				if (item.selection) events++;
			} else if (item.step) {
				let step = item.step.map(remap.slice(mapFrom)), map = step && step.getMap();
				mapFrom--;
				if (map) remap.appendMap(map, mapFrom);
				if (step) {
					let selection = item.selection && item.selection.map(remap.slice(mapFrom));
					if (selection) events++;
					let newItem = new Item(map.invert(), step, selection), merged, last = items.length - 1;
					if (merged = items.length && items[last].merge(newItem)) items[last] = merged;
					else items.push(newItem);
				}
			} else if (item.map) mapFrom--;
		}, this.items.length, 0);
		return new Branch(dist_default.from(items.reverse()), events);
	}
};
Branch.empty = new Branch(dist_default.empty, 0);
function cutOffEvents(items, n) {
	let cutPoint;
	items.forEach((item, i) => {
		if (item.selection && n-- == 0) {
			cutPoint = i;
			return false;
		}
	});
	return items.slice(cutPoint);
}
var Item = class Item {
	constructor(map, step, selection, mirrorOffset) {
		this.map = map;
		this.step = step;
		this.selection = selection;
		this.mirrorOffset = mirrorOffset;
	}
	merge(other) {
		if (this.step && other.step && !other.selection) {
			let step = other.step.merge(this.step);
			if (step) return new Item(step.getMap().invert(), step, this.selection);
		}
	}
};
var HistoryState = class {
	constructor(done, undone, prevRanges, prevTime, prevComposition) {
		this.done = done;
		this.undone = undone;
		this.prevRanges = prevRanges;
		this.prevTime = prevTime;
		this.prevComposition = prevComposition;
	}
};
var DEPTH_OVERFLOW = 20;
function applyTransaction(history$1, state, tr, options) {
	let historyTr = tr.getMeta(historyKey), rebased;
	if (historyTr) return historyTr.historyState;
	if (tr.getMeta(closeHistoryKey)) history$1 = new HistoryState(history$1.done, history$1.undone, null, 0, -1);
	let appended = tr.getMeta("appendedTransaction");
	if (tr.steps.length == 0) return history$1;
	else if (appended && appended.getMeta(historyKey)) if (appended.getMeta(historyKey).redo) return new HistoryState(history$1.done.addTransform(tr, void 0, options, mustPreserveItems(state)), history$1.undone, rangesFor(tr.mapping.maps), history$1.prevTime, history$1.prevComposition);
	else return new HistoryState(history$1.done, history$1.undone.addTransform(tr, void 0, options, mustPreserveItems(state)), null, history$1.prevTime, history$1.prevComposition);
	else if (tr.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
		let composition = tr.getMeta("composition");
		let newGroup = history$1.prevTime == 0 || !appended && history$1.prevComposition != composition && (history$1.prevTime < (tr.time || 0) - options.newGroupDelay || !isAdjacentTo(tr, history$1.prevRanges));
		let prevRanges = appended ? mapRanges(history$1.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps);
		return new HistoryState(history$1.done.addTransform(tr, newGroup ? state.selection.getBookmark() : void 0, options, mustPreserveItems(state)), Branch.empty, prevRanges, tr.time, composition == null ? history$1.prevComposition : composition);
	} else if (rebased = tr.getMeta("rebased")) return new HistoryState(history$1.done.rebased(tr, rebased), history$1.undone.rebased(tr, rebased), mapRanges(history$1.prevRanges, tr.mapping), history$1.prevTime, history$1.prevComposition);
	else return new HistoryState(history$1.done.addMaps(tr.mapping.maps), history$1.undone.addMaps(tr.mapping.maps), mapRanges(history$1.prevRanges, tr.mapping), history$1.prevTime, history$1.prevComposition);
}
function isAdjacentTo(transform, prevRanges) {
	if (!prevRanges) return false;
	if (!transform.docChanged) return true;
	let adjacent = false;
	transform.mapping.maps[0].forEach((start, end) => {
		for (let i = 0; i < prevRanges.length; i += 2) if (start <= prevRanges[i + 1] && end >= prevRanges[i]) adjacent = true;
	});
	return adjacent;
}
function rangesFor(maps) {
	let result = [];
	for (let i = maps.length - 1; i >= 0 && result.length == 0; i--) maps[i].forEach((_from, _to, from, to) => result.push(from, to));
	return result;
}
function mapRanges(ranges, mapping) {
	if (!ranges) return null;
	let result = [];
	for (let i = 0; i < ranges.length; i += 2) {
		let from = mapping.map(ranges[i], 1), to = mapping.map(ranges[i + 1], -1);
		if (from <= to) result.push(from, to);
	}
	return result;
}
function histTransaction(history$1, state, redo$1) {
	let preserveItems = mustPreserveItems(state);
	let histOptions = historyKey.get(state).spec.config;
	let pop = (redo$1 ? history$1.undone : history$1.done).popEvent(state, preserveItems);
	if (!pop) return null;
	let selection = pop.selection.resolve(pop.transform.doc);
	let added = (redo$1 ? history$1.done : history$1.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
	let newHist = new HistoryState(redo$1 ? added : pop.remaining, redo$1 ? pop.remaining : added, null, 0, -1);
	return pop.transform.setSelection(selection).setMeta(historyKey, {
		redo: redo$1,
		historyState: newHist
	});
}
var cachedPreserveItems = false, cachedPreserveItemsPlugins = null;
function mustPreserveItems(state) {
	let plugins = state.plugins;
	if (cachedPreserveItemsPlugins != plugins) {
		cachedPreserveItems = false;
		cachedPreserveItemsPlugins = plugins;
		for (let i = 0; i < plugins.length; i++) if (plugins[i].spec.historyPreserveItems) {
			cachedPreserveItems = true;
			break;
		}
	}
	return cachedPreserveItems;
}
var historyKey = new PluginKey("history");
var closeHistoryKey = new PluginKey("closeHistory");
function history(config = {}) {
	config = {
		depth: config.depth || 100,
		newGroupDelay: config.newGroupDelay || 500
	};
	return new Plugin({
		key: historyKey,
		state: {
			init() {
				return new HistoryState(Branch.empty, Branch.empty, null, 0, -1);
			},
			apply(tr, hist, state) {
				return applyTransaction(hist, state, tr, config);
			}
		},
		config,
		props: { handleDOMEvents: { beforeinput(view, e) {
			let inputType = e.inputType;
			let command = inputType == "historyUndo" ? undo : inputType == "historyRedo" ? redo : null;
			if (!command || !view.editable) return false;
			e.preventDefault();
			return command(view.state, view.dispatch);
		} } }
	});
}
function buildCommand(redo$1, scroll) {
	return (state, dispatch) => {
		let hist = historyKey.getState(state);
		if (!hist || (redo$1 ? hist.undone : hist.done).eventCount == 0) return false;
		if (dispatch) {
			let tr = histTransaction(hist, state, redo$1);
			if (tr) dispatch(scroll ? tr.scrollIntoView() : tr);
		}
		return true;
	};
}
var undo = buildCommand(false, true);
var redo = buildCommand(true, true);
buildCommand(false, false);
buildCommand(true, false);
const Placeholder = Extension.create({
	name: "placeholder",
	addOptions() {
		return {
			placeholder: "Write something...",
			showOnlyWhenEditable: true,
			showOnlyCurrent: true,
			includeChildren: false
		};
	},
	addProseMirrorPlugins() {
		return [new Plugin({
			key: new PluginKey("placeholder"),
			props: { decorations: ({ doc, selection }) => {
				const options = this.editor.options.extensions.find((extension) => extension.name === this.name)?.options ?? this.options;
				const active = this.editor.isEditable;
				const { anchor } = selection;
				const decorations = [];
				if (!active && options.showOnlyWhenEditable) return DecorationSet.empty;
				const isDragging = this.editor.view.dragging;
				doc.descendants((node, pos) => {
					const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
					const isEmpty = !node.isLeaf && !node.childCount;
					if (node.type.name === "codeBlock" || isDragging) return false;
					if ((hasAnchor || !options.showOnlyCurrent) && isEmpty) {
						const classes = ["placeholder"];
						if (hasAnchor) classes.push("has-focus");
						const decoration = Decoration.node(pos, pos + node.nodeSize, {
							class: classes.join(" "),
							"data-placeholder": typeof options.placeholder === "function" ? options.placeholder({
								editor: this.editor,
								node,
								pos,
								hasAnchor
							}) : options.placeholder
						});
						decorations.push(decoration);
					}
					return options.includeChildren;
				});
				return DecorationSet.create(doc, decorations);
			} }
		})];
	}
});
var import_react = /* @__PURE__ */ __toESM(require_react());
function useRichTextEditorKernel({ extensions, content = "", editable = true, immediatelyRender, enableSpellCheck = false, shouldRerenderOnTransaction = false, editorProps, handlePaste, onUpdate, onBlur, onCreate }) {
	const mergedEditorProps = (0, import_react.useMemo)(() => {
		const readOnlyStyle = editable ? "" : "user-select: text; -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text;";
		const mergeAttributes = (attributes = {}) => {
			const baseStyle = typeof attributes.style === "string" ? attributes.style : "";
			return {
				...attributes,
				style: [baseStyle, readOnlyStyle].filter(Boolean).join("; "),
				spellcheck: enableSpellCheck ? "true" : "false"
			};
		};
		const baseAttributes = editorProps?.attributes;
		return {
			...editorProps,
			...handlePaste && { handlePaste },
			attributes: typeof baseAttributes === "function" ? (state) => mergeAttributes(baseAttributes(state)) : mergeAttributes(baseAttributes)
		};
	}, [
		editable,
		editorProps,
		enableSpellCheck,
		handlePaste
	]);
	const editor = useEditor((0, import_react.useMemo)(() => ({
		shouldRerenderOnTransaction,
		extensions,
		content,
		editable,
		immediatelyRender,
		editorProps: mergedEditorProps,
		onUpdate,
		onBlur,
		onCreate
	}), [
		content,
		editable,
		extensions,
		immediatelyRender,
		mergedEditorProps,
		onBlur,
		onCreate,
		onUpdate,
		shouldRerenderOnTransaction
	]));
	(0, import_react.useEffect)(() => {
		if (!editor || editor.isDestroyed) return;
		editor.setEditable(editable);
	}, [editor, editable]);
	return editor;
}
export { undo as a, redo as i, Placeholder as n, history as r, useRichTextEditorKernel as t };
