import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { L as toHtml, T as normalizeTheme } from "./dist-CbafgI8N.js";
import { c as createHighlighter, d as createOnigurumaEngine, h as bundledLanguages, p as bundledThemes, t as createJavaScriptRegexEngine } from "./dist-DIxdlCXd.js";
import { n as useCodeStyle } from "./useCodeStyle-zD0Sb1Ey.js";
import { t as Columns2 } from "./columns-2-BUN_PYwg.js";
import { t as Rows2 } from "./rows-2-BUxz09nG.js";
var DIFFS_TAG_NAME = "diffs-container";
var GIT_DIFF_FILE_BREAK_REGEX = /(?=^diff --git)/gm;
var FILE_CONTEXT_BLOB = /(?=^@@ )/gm;
var HUNK_HEADER = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@(?: (.*))?/m;
var SPLIT_WITH_NEWLINES = /(?<=\n)/;
var FILENAME_HEADER_REGEX = /^(---|\+\+\+)\s+([^\t\r\n]+)/;
var FILENAME_HEADER_REGEX_GIT = /^(---|\+\+\+)\s+[ab]\/([^\t\r\n]+)/;
var ALTERNATE_FILE_NAMES_GIT = /^diff --git (?:"a\/(.+?)"|a\/(.+?)) (?:"b\/(.+?)"|b\/(.+?))$/;
var INDEX_LINE_METADATA = /^index ([0-9a-f]+)\.\.([0-9a-f]+)(?: (\d+))?$/i;
var HEADER_PREFIX_SLOT_ID = "header-prefix";
var HEADER_METADATA_SLOT_ID = "header-metadata";
var CUSTOM_HEADER_SLOT_ID = "header-custom";
var DEFAULT_THEMES = {
	dark: "pierre-dark",
	light: "pierre-light"
};
var THEME_CSS_ATTRIBUTE = "data-theme-css";
var UNSAFE_CSS_ATTRIBUTE = "data-unsafe-css";
var DEFAULT_VIRTUAL_FILE_METRICS = {
	hunkLineCount: 50,
	lineHeight: 20,
	diffHeaderHeight: 44,
	hunkSeparatorHeight: 32,
	fileGap: 8
};
var DEFAULT_EXPANDED_REGION = Object.freeze({
	fromStart: 0,
	fromEnd: 0
});
var DEFAULT_RENDER_RANGE = {
	startingLine: 0,
	totalLines: Infinity,
	bufferBefore: 0,
	bufferAfter: 0
};
var EMPTY_RENDER_RANGE = {
	startingLine: 0,
	totalLines: 0,
	bufferBefore: 0,
	bufferAfter: 0
};
function areSelectionsEqual(selectionA, selectionB) {
	return selectionA?.start === selectionB?.start && selectionA?.end === selectionB?.end && selectionA?.side === selectionB?.side && selectionA?.endSide === selectionB?.endSide;
}
function createTextNodeElement(value) {
	return {
		type: "text",
		value
	};
}
function createHastElement({ tagName, children = [], properties = {} }) {
	return {
		type: "element",
		tagName,
		properties,
		children
	};
}
function createIconElement({ name, width = 16, height = 16, properties }) {
	return createHastElement({
		tagName: "svg",
		properties: {
			width,
			height,
			viewBox: "0 0 16 16",
			...properties
		},
		children: [createHastElement({
			tagName: "use",
			properties: { href: `#${name.replace(/^#/, "")}` }
		})]
	});
}
function findCodeElement(nodes) {
	let firstChild = nodes.children[0];
	while (firstChild != null) {
		if (firstChild.type === "element" && firstChild.tagName === "code") return firstChild;
		if ("children" in firstChild) firstChild = firstChild.children[0];
		else firstChild = null;
	}
}
function createGutterWrapper(children) {
	return createHastElement({
		tagName: "div",
		properties: { "data-gutter": "" },
		children
	});
}
function createGutterItem(lineType, lineNumber, lineIndex, properties = {}) {
	return createHastElement({
		tagName: "div",
		properties: {
			"data-line-type": lineType,
			"data-column-number": lineNumber,
			"data-line-index": lineIndex,
			...properties
		},
		children: lineNumber != null ? [createHastElement({
			tagName: "span",
			properties: { "data-line-number-content": "" },
			children: [createTextNodeElement(`${lineNumber}`)]
		})] : void 0
	});
}
function createGutterGap(type, bufferType, size) {
	return createHastElement({
		tagName: "div",
		properties: {
			"data-gutter-buffer": bufferType,
			"data-buffer-size": size,
			"data-line-type": bufferType === "annotation" ? void 0 : type,
			style: bufferType === "annotation" ? `grid-row: span ${size};` : `grid-row: span ${size};min-height:calc(${size} * 1lh);`
		}
	});
}
function createGutterUtilityElement() {
	return createHastElement({
		tagName: "button",
		properties: {
			"data-utility-button": "",
			type: "button"
		},
		children: [createIconElement({
			name: "diffs-icon-plus",
			properties: { "data-icon": "" }
		})]
	});
}
function areSelectionPointsEqual(a, b) {
	return a.lineNumber === b.lineNumber && a.side === b.side;
}
var InteractionManager = class {
	hoveredLine;
	pre;
	gutterUtilityContainer;
	gutterUtilityButton;
	gutterUtilitySlot;
	interactiveLinesAttr = false;
	interactiveLineNumbersAttr = false;
	hasPointerListeners = false;
	hasDocumentPointerListeners = false;
	selectedRange = null;
	renderedSelectionRange;
	selectionAnchor;
	queuedSelectionRender;
	pointerSession = { mode: "idle" };
	constructor(mode, options) {
		this.mode = mode;
		this.options = options;
	}
	setOptions(options) {
		this.options = options;
	}
	cleanUp() {
		this.pre?.removeEventListener("click", this.handlePointerClick);
		this.pre?.removeEventListener("pointerdown", this.handlePointerDown);
		this.pre?.removeEventListener("pointermove", this.handlePointerMove);
		this.pre?.removeEventListener("pointerleave", this.handlePointerLeave);
		this.pre?.removeAttribute("data-interactive-lines");
		this.pre?.removeAttribute("data-interactive-line-numbers");
		this.pre = void 0;
		this.gutterUtilityContainer?.remove();
		this.gutterUtilityContainer = void 0;
		this.gutterUtilityButton = void 0;
		this.gutterUtilitySlot = void 0;
		this.clearHoveredLine();
		this.detachDocumentPointerListeners();
		this.clearPointerSession();
		if (this.queuedSelectionRender != null) {
			cancelAnimationFrame(this.queuedSelectionRender);
			this.queuedSelectionRender = void 0;
		}
		this.interactiveLinesAttr = false;
		this.interactiveLineNumbersAttr = false;
		this.hasPointerListeners = false;
	}
	setup(pre) {
		this.setSelectionDirty();
		const { usesCustomGutterUtility = false, enableGutterUtility = false } = this.options;
		if (this.pre !== pre) {
			this.cleanUp();
			this.pre = pre;
		}
		if (enableGutterUtility) this.ensureGutterUtilityNode(usesCustomGutterUtility);
		else if (this.gutterUtilityContainer != null) {
			this.gutterUtilityContainer.remove();
			this.gutterUtilityContainer = void 0;
			this.gutterUtilityButton = void 0;
			this.gutterUtilitySlot = void 0;
			if (this.pointerSession.mode === "gutterSelecting") {
				this.clearPointerSession();
				this.detachDocumentPointerListeners();
			}
		}
		this.syncPointerListeners(pre);
		this.updateInteractiveLineAttributes();
		this.renderSelection();
	}
	setSelectionDirty() {
		this.renderedSelectionRange = void 0;
	}
	isSelectionDirty() {
		return this.renderedSelectionRange === null;
	}
	setSelection(range) {
		const isRangeChange = !(range === this.selectedRange || areSelectionsEqual(range ?? void 0, this.selectedRange ?? void 0));
		if (!this.isSelectionDirty() && !isRangeChange) return;
		this.selectedRange = range;
		this.renderSelection();
		if (isRangeChange) this.notifySelectionCommitted();
	}
	getSelection() {
		return this.selectedRange;
	}
	getHoveredLine = () => {
		if (this.hoveredLine != null) {
			if (this.mode === "diff" && this.hoveredLine.type === "diff-line") return {
				lineNumber: this.hoveredLine.lineNumber,
				side: this.hoveredLine.annotationSide
			};
			if (this.mode === "file" && this.hoveredLine.type === "line") return { lineNumber: this.hoveredLine.lineNumber };
		}
	};
	handlePointerClick = (event) => {
		const { onHunkExpand, onLineClick, onLineNumberClick, onMergeConflictActionClick } = this.options;
		if (onHunkExpand == null && onLineClick == null && onLineNumberClick == null && onMergeConflictActionClick == null) return;
		if (this.options.onGutterUtilityClick != null && isGutterUtilityPointerPath(event.composedPath())) return;
		debugLogIfEnabled(this.options.__debugPointerEvents, "click", "FileDiff.DEBUG.handlePointerClick:", event);
		this.handlePointerEvent({
			eventType: "click",
			event
		});
	};
	handlePointerMove = (event) => {
		const { lineHoverHighlight = "disabled", onLineEnter, onLineLeave, enableGutterUtility = false } = this.options;
		if (lineHoverHighlight === "disabled" && !enableGutterUtility && onLineEnter == null && onLineLeave == null) return;
		debugLogIfEnabled(this.options.__debugPointerEvents, "move", "FileDiff.DEBUG.handlePointerMove:", event);
		this.handlePointerEvent({
			eventType: "move",
			event
		});
	};
	handlePointerLeave = (event) => {
		const { __debugPointerEvents } = this.options;
		debugLogIfEnabled(__debugPointerEvents, "move", "FileDiff.DEBUG.handlePointerLeave: no event");
		if (this.hoveredLine == null) {
			debugLogIfEnabled(__debugPointerEvents, "move", "FileDiff.DEBUG.handlePointerLeave: returned early, no .hoveredLine");
			return;
		}
		this.gutterUtilityContainer?.remove();
		this.options.onLineLeave?.({
			...this.hoveredLine,
			event
		});
		this.clearHoveredLine();
	};
	handlePointerEvent({ eventType, event }) {
		const { __debugPointerEvents } = this.options;
		const composedPath = event.composedPath();
		debugLogIfEnabled(__debugPointerEvents, eventType, "FileDiff.DEBUG.handlePointerEvent:", {
			eventType,
			composedPath
		});
		const target = this.resolvePointerTarget(composedPath);
		debugLogIfEnabled(__debugPointerEvents, eventType, "FileDiff.DEBUG.handlePointerEvent: resolvePointerTarget result:", target);
		const { onLineClick, onLineNumberClick, onLineEnter, onLineLeave, onHunkExpand, onMergeConflictActionClick } = this.options;
		switch (eventType) {
			case "move":
				if (isLinePointerTarget(target) && this.hoveredLine?.lineElement === target.lineElement) break;
				if (this.hoveredLine != null) {
					this.gutterUtilityContainer?.remove();
					onLineLeave?.({
						...this.hoveredLine,
						event
					});
					this.clearHoveredLine();
				}
				if (isLinePointerTarget(target)) {
					this.setHoveredLine(this.toEventBaseProps(target));
					if (this.gutterUtilityContainer != null) target.numberElement.appendChild(this.gutterUtilityContainer);
					onLineEnter?.({
						...this.hoveredLine,
						event
					});
				}
				break;
			case "click": {
				if (target == null) break;
				if (isMergeConflictActionPointerTarget(target) && onMergeConflictActionClick != null) {
					onMergeConflictActionClick(target);
					break;
				}
				if (isExpandoPointerTarget(target) && onHunkExpand != null) {
					onHunkExpand(target.hunkIndex, event.shiftKey ? "both" : target.direction, event.shiftKey ? Number.POSITIVE_INFINITY : void 0);
					break;
				}
				if (!isLinePointerTarget(target)) break;
				const eventBase = this.toEventBaseProps(target);
				if (onLineNumberClick != null && target.numberColumn) onLineNumberClick({
					...eventBase,
					event
				});
				else if (onLineClick != null) onLineClick({
					...eventBase,
					event
				});
				break;
			}
		}
	}
	syncPointerListeners(pre) {
		const { __debugPointerEvents, lineHoverHighlight = "disabled", onLineClick, onLineNumberClick, onLineEnter, onLineLeave, onHunkExpand, onMergeConflictActionClick, enableGutterUtility = false, enableLineSelection = false, onGutterUtilityClick } = this.options;
		const enableGutterSelection = onGutterUtilityClick != null;
		const shouldAttachPointerListeners = lineHoverHighlight !== "disabled" || onLineClick != null || onLineNumberClick != null || onHunkExpand != null || onMergeConflictActionClick != null || onLineEnter != null || onLineLeave != null || enableGutterUtility || enableLineSelection || enableGutterSelection;
		if (shouldAttachPointerListeners && !this.hasPointerListeners) {
			pre.addEventListener("click", this.handlePointerClick);
			pre.addEventListener("pointerdown", this.handlePointerDown);
			pre.addEventListener("pointermove", this.handlePointerMove);
			pre.addEventListener("pointerleave", this.handlePointerLeave);
			this.hasPointerListeners = true;
			debugLogIfEnabled(__debugPointerEvents, "click", "FileDiff.DEBUG.attachEventListeners: Attaching click events for:", (() => {
				const reasons = [];
				if (__debugPointerEvents === "both" || __debugPointerEvents === "click") {
					if (onLineClick != null) reasons.push("onLineClick");
					if (onLineNumberClick != null) reasons.push("onLineNumberClick");
					if (onHunkExpand != null) reasons.push("expandable hunk separators");
					if (onMergeConflictActionClick != null) reasons.push("merge conflict actions");
				}
				return reasons;
			})());
			debugLogIfEnabled(__debugPointerEvents, "move", "FileDiff.DEBUG.attachEventListeners: Attaching pointer move event");
			debugLogIfEnabled(__debugPointerEvents, "move", "FileDiff.DEBUG.attachEventListeners: Attaching pointer leave event");
		} else if (!shouldAttachPointerListeners && this.hasPointerListeners) {
			pre.removeEventListener("click", this.handlePointerClick);
			pre.removeEventListener("pointerdown", this.handlePointerDown);
			pre.removeEventListener("pointermove", this.handlePointerMove);
			pre.removeEventListener("pointerleave", this.handlePointerLeave);
			this.hasPointerListeners = false;
		}
		const hasActiveLineSelectionSession = this.pointerSession.mode === "selecting" || this.pointerSession.mode === "pendingSingleLineUnselect";
		const hasActiveGutterSelectionSession = this.pointerSession.mode === "gutterSelecting";
		if (!enableLineSelection && hasActiveLineSelectionSession || !enableGutterSelection && hasActiveGutterSelectionSession) {
			this.clearPointerSession();
			this.detachDocumentPointerListeners();
			this.selectionAnchor = void 0;
			this.clearPendingSingleLineState();
		}
	}
	updateInteractiveLineAttributes() {
		if (this.pre == null) return;
		const { onLineClick, onLineNumberClick, enableLineSelection = false } = this.options;
		const shouldHaveInteractiveLines = onLineClick != null;
		const shouldHaveInteractiveLineNumbers = onLineNumberClick != null || enableLineSelection;
		if (shouldHaveInteractiveLines && !this.interactiveLinesAttr) {
			this.pre.setAttribute("data-interactive-lines", "");
			this.interactiveLinesAttr = true;
		} else if (!shouldHaveInteractiveLines && this.interactiveLinesAttr) {
			this.pre.removeAttribute("data-interactive-lines");
			this.interactiveLinesAttr = false;
		}
		if (shouldHaveInteractiveLineNumbers && !this.interactiveLineNumbersAttr) {
			this.pre.setAttribute("data-interactive-line-numbers", "");
			this.interactiveLineNumbersAttr = true;
		} else if (!shouldHaveInteractiveLineNumbers && this.interactiveLineNumbersAttr) {
			this.pre.removeAttribute("data-interactive-line-numbers");
			this.interactiveLineNumbersAttr = false;
		}
	}
	handlePointerDown = (event) => {
		if (event.pointerType === "mouse" && event.button !== 0 || this.pre == null || this.pointerSession.mode !== "idle") return;
		const path = event.composedPath();
		if (isGutterUtilityPointerPath(path) && this.options.onGutterUtilityClick != null) this.startGutterSelectionFromPointerDown(event, path);
		else this.startLineSelectionFromPointerDown(event, path);
	};
	startLineSelectionFromPointerDown(event, path) {
		const { enableLineSelection = false } = this.options;
		if (!enableLineSelection) return;
		const pointerInfo = this.getSelectionPointerInfo(path, true);
		if (pointerInfo == null) return;
		const { pre } = this;
		if (pre == null) return;
		event.preventDefault();
		const { lineNumber, eventSide, lineIndex } = pointerInfo;
		if (event.shiftKey && this.selectedRange != null) {
			const rowRange = this.getIndexesFromSelection(this.selectedRange, pre.getAttribute("data-diff-type") === "split");
			if (rowRange == null) return;
			const useStart = rowRange.start <= rowRange.end ? lineIndex >= rowRange.start : lineIndex <= rowRange.end;
			this.selectionAnchor = {
				lineNumber: useStart ? this.selectedRange.start : this.selectedRange.end,
				side: useStart ? this.selectedRange.side : this.selectedRange.endSide ?? this.selectedRange.side
			};
			this.updateSelection(lineNumber, eventSide, false);
			this.notifySelectionStart(this.selectedRange);
			this.pointerSession = {
				mode: "selecting",
				pointerId: event.pointerId
			};
			this.attachDocumentPointerListeners();
			return;
		}
		if (this.selectedRange?.start === lineNumber && this.selectedRange?.end === lineNumber) {
			const point = {
				lineNumber,
				side: eventSide
			};
			this.selectionAnchor = point;
			this.pointerSession = {
				mode: "pendingSingleLineUnselect",
				pointerId: event.pointerId,
				anchor: point,
				pending: point
			};
			this.attachDocumentPointerListeners();
			return;
		}
		this.selectedRange = null;
		this.selectionAnchor = {
			lineNumber,
			side: eventSide
		};
		this.updateSelection(lineNumber, eventSide, false);
		this.notifySelectionStart(this.selectedRange);
		this.pointerSession = {
			mode: "selecting",
			pointerId: event.pointerId
		};
		this.attachDocumentPointerListeners();
	}
	startGutterSelectionFromPointerDown(event, path) {
		const { enableLineSelection = false, onGutterUtilityClick } = this.options;
		if (onGutterUtilityClick == null) return;
		const point = this.getSelectionPointFromPath(path);
		if (point == null) return;
		event.preventDefault();
		event.stopPropagation();
		this.pointerSession = {
			mode: "gutterSelecting",
			pointerId: event.pointerId,
			anchor: point,
			current: point
		};
		if (enableLineSelection) {
			this.selectionAnchor = {
				lineNumber: point.lineNumber,
				side: point.side
			};
			this.updateSelection(point.lineNumber, point.side, false);
			this.notifySelectionStart(this.selectedRange);
		}
		this.attachDocumentPointerListeners();
	}
	handleDocumentPointerMove = (event) => {
		const { enableLineSelection = false } = this.options;
		switch (this.pointerSession.mode) {
			case "idle": return;
			case "gutterSelecting": {
				if (event.pointerId !== this.pointerSession.pointerId) return;
				const point = this.getSelectionPointFromPath(event.composedPath());
				if (point == null) return;
				this.pointerSession.current = point;
				if (enableLineSelection === true) this.updateSelection(point.lineNumber, point.side);
				return;
			}
			case "selecting": {
				if (event.pointerId !== this.pointerSession.pointerId) return;
				const pointerInfo = this.getSelectionPointerInfo(event.composedPath(), false);
				if (pointerInfo == null || this.selectionAnchor == null) return;
				this.updateSelection(pointerInfo.lineNumber, pointerInfo.eventSide);
				return;
			}
			case "pendingSingleLineUnselect": {
				if (event.pointerId !== this.pointerSession.pointerId) return;
				const pointerInfo = this.getSelectionPointerInfo(event.composedPath(), false);
				if (pointerInfo == null || this.selectionAnchor == null) return;
				const point = {
					lineNumber: pointerInfo.lineNumber,
					side: pointerInfo.eventSide
				};
				if (areSelectionPointsEqual(this.pointerSession.pending, point)) return;
				this.updateSelection(pointerInfo.lineNumber, pointerInfo.eventSide, false);
				this.notifySelectionStart(this.selectedRange);
				this.notifySelectionChangeDelta();
				this.pointerSession = {
					mode: "selecting",
					pointerId: event.pointerId
				};
				return;
			}
		}
	};
	handleDocumentPointerUp = (event) => {
		const { enableLineSelection = false, onGutterUtilityClick } = this.options;
		switch (this.pointerSession.mode) {
			case "idle": return;
			case "gutterSelecting": {
				if (event.pointerId !== this.pointerSession.pointerId) return;
				const point = this.getSelectionPointFromPath(event.composedPath());
				if (point != null) {
					this.pointerSession.current = point;
					if (enableLineSelection) this.updateSelection(point.lineNumber, point.side);
				}
				onGutterUtilityClick?.(this.buildSelectedLineRange(this.pointerSession.anchor, this.pointerSession.current));
				this.selectionAnchor = void 0;
				if (enableLineSelection) {
					this.notifySelectionEnd(this.selectedRange);
					this.notifySelectionCommitted();
				}
				this.clearPointerSession();
				this.detachDocumentPointerListeners();
				return;
			}
			case "pendingSingleLineUnselect":
				if (event.pointerId !== this.pointerSession.pointerId) return;
				this.updateSelection(null, void 0, false);
				this.selectionAnchor = void 0;
				this.clearPendingSingleLineState();
				this.detachDocumentPointerListeners();
				this.notifySelectionEnd(this.selectedRange);
				this.notifySelectionCommitted();
				return;
			case "selecting":
				if (event.pointerId !== this.pointerSession.pointerId) return;
				this.selectionAnchor = void 0;
				this.detachDocumentPointerListeners();
				this.clearPointerSession();
				this.notifySelectionEnd(this.selectedRange);
				this.notifySelectionCommitted();
		}
	};
	handleDocumentPointerCancel = (event) => {
		switch (this.pointerSession.mode) {
			case "idle": return;
			case "gutterSelecting":
			case "selecting":
			case "pendingSingleLineUnselect":
				if ("pointerId" in this.pointerSession) {
					if (event.pointerId !== this.pointerSession.pointerId) return;
				}
				this.selectionAnchor = void 0;
				this.clearPendingSingleLineState();
				this.clearPointerSession();
				this.detachDocumentPointerListeners();
		}
	};
	clearHoveredLine() {
		if (this.hoveredLine == null) return;
		this.hoveredLine.lineElement.removeAttribute("data-hovered");
		this.hoveredLine.numberElement.removeAttribute("data-hovered");
		this.hoveredLine = void 0;
	}
	setHoveredLine(hoveredLine) {
		const { lineHoverHighlight = "disabled" } = this.options;
		if (this.hoveredLine != null) this.clearHoveredLine();
		this.hoveredLine = hoveredLine;
		if (lineHoverHighlight !== "disabled") {
			if (lineHoverHighlight === "both" || lineHoverHighlight === "line") this.hoveredLine.lineElement.setAttribute("data-hovered", "");
			if (lineHoverHighlight === "both" || lineHoverHighlight === "number") this.hoveredLine.numberElement.setAttribute("data-hovered", "");
		}
	}
	ensureGutterUtilityNode(useCustomGutterUtility) {
		if (this.gutterUtilityContainer == null) {
			this.gutterUtilityContainer = document.createElement("div");
			this.gutterUtilityContainer.setAttribute("data-gutter-utility-slot", "");
		}
		if (useCustomGutterUtility) {
			if (this.gutterUtilityButton != null) {
				this.gutterUtilityButton.remove();
				this.gutterUtilityButton = void 0;
			}
			if (this.gutterUtilitySlot == null) {
				this.gutterUtilitySlot = document.createElement("slot");
				this.gutterUtilitySlot.name = "gutter-utility-slot";
			}
			if (this.gutterUtilitySlot.parentNode !== this.gutterUtilityContainer) this.gutterUtilityContainer.replaceChildren(this.gutterUtilitySlot);
		} else {
			this.gutterUtilitySlot?.remove();
			this.gutterUtilitySlot = void 0;
			if (this.gutterUtilityButton == null) {
				const tempDiv = document.createElement("div");
				tempDiv.innerHTML = toHtml(createGutterUtilityElement());
				const utilityButton = tempDiv.firstElementChild;
				if (!(utilityButton instanceof HTMLButtonElement)) throw new Error("InteractionManager.ensureGutterUtilityNode: Node element should be a button");
				utilityButton.remove();
				this.gutterUtilityButton = utilityButton;
			}
			if (this.gutterUtilityButton.parentNode !== this.gutterUtilityContainer) this.gutterUtilityContainer.replaceChildren(this.gutterUtilityButton);
		}
	}
	attachDocumentPointerListeners() {
		if (this.hasDocumentPointerListeners) return;
		document.addEventListener("pointermove", this.handleDocumentPointerMove);
		document.addEventListener("pointerup", this.handleDocumentPointerUp);
		document.addEventListener("pointercancel", this.handleDocumentPointerCancel);
		this.hasDocumentPointerListeners = true;
	}
	detachDocumentPointerListeners() {
		if (!this.hasDocumentPointerListeners) return;
		document.removeEventListener("pointermove", this.handleDocumentPointerMove);
		document.removeEventListener("pointerup", this.handleDocumentPointerUp);
		document.removeEventListener("pointercancel", this.handleDocumentPointerCancel);
		this.hasDocumentPointerListeners = false;
	}
	clearPointerSession() {
		this.pointerSession = { mode: "idle" };
	}
	clearPendingSingleLineState() {
		if (this.pointerSession.mode === "pendingSingleLineUnselect") this.pointerSession = { mode: "idle" };
	}
	getSelectionPointerInfo(path, requireNumberColumn) {
		const target = this.resolvePointerTarget(path);
		if (!isLinePointerTarget(target)) return;
		if (requireNumberColumn && !target.numberColumn) return;
		if (target.splitLineIndex == null) return;
		return {
			lineIndex: target.splitLineIndex,
			lineNumber: target.lineNumber,
			eventSide: this.mode === "diff" ? target.side : void 0
		};
	}
	getSelectionPointFromPath(path) {
		const target = this.resolvePointerTarget(path);
		if (!isLinePointerTarget(target)) return;
		return {
			lineNumber: target.lineNumber,
			side: this.mode === "diff" ? target.side : void 0
		};
	}
	getLineIndex(lineNumber, side) {
		const { getLineIndex } = this.options;
		return getLineIndex != null ? getLineIndex(lineNumber, side) : [lineNumber - 1, lineNumber - 1];
	}
	updateSelection(currentLine, side, emitChange = true) {
		const { selectedRange: previousRange } = this;
		let nextRange;
		if (currentLine == null) nextRange = null;
		else {
			const anchorSide = this.selectionAnchor?.side ?? side;
			const anchorLine = this.selectionAnchor?.lineNumber ?? currentLine;
			nextRange = this.buildSelectionRange(anchorLine, currentLine, anchorSide, side);
		}
		if (areSelectionsEqual(previousRange ?? void 0, nextRange ?? void 0)) return;
		this.selectedRange = nextRange;
		if (emitChange) this.notifySelectionChangeDelta();
		this.queuedSelectionRender ??= requestAnimationFrame(this.renderSelection);
	}
	getIndexesFromSelection(selectedRange, split) {
		if (this.pre == null) return;
		const startIndexes = this.getLineIndex(selectedRange.start, selectedRange.side);
		const finalIndexes = this.getLineIndex(selectedRange.end, selectedRange.endSide ?? selectedRange.side);
		return startIndexes != null && finalIndexes != null ? {
			start: split ? startIndexes[1] : startIndexes[0],
			end: split ? finalIndexes[1] : finalIndexes[0]
		} : void 0;
	}
	renderSelection = () => {
		if (this.queuedSelectionRender != null) {
			cancelAnimationFrame(this.queuedSelectionRender);
			this.queuedSelectionRender = void 0;
		}
		if (this.pre == null || this.renderedSelectionRange === this.selectedRange) return;
		const allSelected = this.pre.querySelectorAll("[data-selected-line]");
		for (const element of allSelected) element.removeAttribute("data-selected-line");
		this.renderedSelectionRange = this.selectedRange;
		if (this.selectedRange == null) return;
		const { children: codeElements } = this.pre;
		if (codeElements.length === 0) return;
		if (codeElements.length > 2) {
			console.error(codeElements);
			throw new Error("InteractionManager.renderSelection: Somehow there are more than 2 code elements...");
		}
		const split = this.pre.getAttribute("data-diff-type") === "split";
		const rowRange = this.getIndexesFromSelection(this.selectedRange, split);
		if (rowRange == null) {
			console.error({
				rowRange,
				selectedRange: this.selectedRange
			});
			throw new Error("InteractionManager.renderSelection: No valid rowRange");
		}
		const isSingle = rowRange.start === rowRange.end;
		const first = Math.min(rowRange.start, rowRange.end);
		const last = Math.max(rowRange.start, rowRange.end);
		for (const code of codeElements) {
			const [gutter, content] = code.children;
			const len = content.children.length;
			if (len !== gutter.children.length) throw new Error("InteractionManager.renderSelection: gutter and content children dont match, something is wrong");
			for (let i = 0; i < len; i++) {
				const contentElement = content.children[i];
				const gutterElement = gutter.children[i];
				if (!(contentElement instanceof HTMLElement) || !(gutterElement instanceof HTMLElement)) continue;
				const lineIndex = this.parseLineIndex(contentElement, split);
				if ((lineIndex ?? 0) > last) break;
				if (lineIndex == null || lineIndex < first) continue;
				let attributeValue = isSingle ? "single" : lineIndex === first ? "first" : lineIndex === last ? "last" : "";
				contentElement.setAttribute("data-selected-line", attributeValue);
				gutterElement.setAttribute("data-selected-line", attributeValue);
				if (gutterElement.nextSibling instanceof HTMLElement && contentElement.nextSibling instanceof HTMLElement && (contentElement.nextSibling.hasAttribute("data-line-annotation") || contentElement.nextSibling.hasAttribute("data-merge-conflict-actions"))) {
					if (isSingle) {
						attributeValue = "last";
						contentElement.setAttribute("data-selected-line", "first");
					} else if (lineIndex === first) attributeValue = "";
					else if (lineIndex === last) contentElement.setAttribute("data-selected-line", "");
					contentElement.nextSibling.setAttribute("data-selected-line", attributeValue);
					gutterElement.nextSibling.setAttribute("data-selected-line", attributeValue);
				}
			}
		}
	};
	notifySelectionCommitted() {
		this.options.onLineSelected?.(this.selectedRange ?? null);
	}
	notifySelectionChangeDelta() {
		this.options.onLineSelectionChange?.(this.selectedRange ?? null);
	}
	notifySelectionStart(range) {
		this.options.onLineSelectionStart?.(range);
	}
	notifySelectionEnd(range) {
		this.options.onLineSelectionEnd?.(range);
	}
	toEventBaseProps(target) {
		if (this.mode === "file") return {
			type: "line",
			lineElement: target.lineElement,
			lineNumber: target.lineNumber,
			numberColumn: target.numberColumn,
			numberElement: target.numberElement
		};
		return {
			type: "diff-line",
			annotationSide: target.side,
			lineType: target.lineType,
			lineElement: target.lineElement,
			numberElement: target.numberElement,
			lineNumber: target.lineNumber,
			numberColumn: target.numberColumn
		};
	}
	buildSelectedLineRange(anchor, current) {
		return this.buildSelectionRange(anchor.lineNumber, current.lineNumber, anchor.side, current.side);
	}
	buildSelectionRange(start, end, side, endSide) {
		return {
			start,
			end,
			...side != null ? { side } : {},
			...side !== endSide && endSide != null ? { endSide } : {}
		};
	}
	resolvePointerTarget(path) {
		let numberColumn = false;
		let lineType;
		let codeElement;
		let lineElement;
		let lineIndexValue;
		let numberElement;
		let expandInfo;
		let lineNumber;
		let mergeConflictActionTarget;
		for (const element of path) {
			if (!(element instanceof HTMLElement)) continue;
			if (mergeConflictActionTarget == null && element.hasAttribute("data-merge-conflict-action")) {
				const resolutionValue = element.getAttribute("data-merge-conflict-action") ?? void 0;
				const conflictIndexValue = element.getAttribute("data-merge-conflict-conflict-index") ?? void 0;
				const conflictIndex = conflictIndexValue != null ? Number.parseInt(conflictIndexValue, 10) : NaN;
				if (isMergeConflictResolution(resolutionValue) && Number.isFinite(conflictIndex)) mergeConflictActionTarget = {
					kind: "merge-conflict-action",
					resolution: resolutionValue,
					conflictIndex
				};
			}
			const columnNumber = numberElement == null ? element.getAttribute("data-column-number") ?? void 0 : void 0;
			if (columnNumber != null) {
				numberElement = element;
				lineNumber = Number.parseInt(columnNumber, 10);
				numberColumn = true;
				lineType = getLineTypeFromElement(element);
				lineIndexValue = element.getAttribute("data-line-index") ?? void 0;
				continue;
			}
			const lineAttr = lineElement == null ? element.getAttribute("data-line") ?? void 0 : void 0;
			if (lineAttr != null) {
				lineElement = element;
				lineNumber = Number.parseInt(lineAttr, 10);
				lineType = getLineTypeFromElement(element);
				lineIndexValue = element.getAttribute("data-line-index") ?? void 0;
				continue;
			}
			if (expandInfo == null && element.hasAttribute("data-expand-button")) {
				expandInfo = {
					hunkIndex: void 0,
					direction: (() => {
						if (element.hasAttribute("data-expand-up")) return "up";
						if (element.hasAttribute("data-expand-down")) return "down";
						return "both";
					})()
				};
				continue;
			}
			const expandIndexValue = expandInfo != null ? element.getAttribute("data-expand-index") ?? void 0 : void 0;
			if (expandInfo != null && expandIndexValue != null) {
				const expandIndex = Number.parseInt(expandIndexValue, 10);
				if (!Number.isNaN(expandIndex)) expandInfo.hunkIndex = expandIndex;
				continue;
			}
			if (codeElement == null && element.hasAttribute("data-code")) {
				codeElement = element;
				break;
			}
		}
		if (mergeConflictActionTarget != null) return mergeConflictActionTarget;
		if (expandInfo?.hunkIndex != null) return {
			type: "line-info",
			hunkIndex: expandInfo.hunkIndex,
			direction: expandInfo.direction
		};
		lineElement ??= lineIndexValue != null ? queryHTMLElement(codeElement, `[data-line][data-line-index="${lineIndexValue}"]`) : void 0;
		numberElement ??= lineIndexValue != null ? queryHTMLElement(codeElement, `[data-column-number][data-line-index="${lineIndexValue}"]`) : void 0;
		if (codeElement == null || lineElement == null || numberElement == null || lineType == null || lineNumber == null || Number.isNaN(lineNumber)) return;
		const splitLineIndex = this.parseLineIndex(lineElement, this.isSplitDiff());
		if (this.mode === "file") return {
			kind: "line",
			lineType,
			lineElement,
			lineNumber,
			numberColumn,
			numberElement,
			side: void 0,
			splitLineIndex
		};
		const annotationSide = (() => {
			switch (lineType) {
				case "change-deletion": return "deletions";
				case "change-addition": return "additions";
				default: return codeElement.hasAttribute("data-deletions") ? "deletions" : "additions";
			}
		})();
		return {
			kind: "line",
			lineType,
			lineElement,
			lineNumber,
			numberColumn,
			numberElement,
			side: annotationSide,
			splitLineIndex
		};
	}
	isSplitDiff() {
		return this.pre?.getAttribute("data-diff-type") === "split";
	}
	parseLineIndex(element, split) {
		const lineIndexes = (element.getAttribute("data-line-index") ?? "").split(",").map((value) => Number.parseInt(value, 10)).filter((value) => !Number.isNaN(value));
		if (split && lineIndexes.length === 2) return lineIndexes[1];
		if (!split) return lineIndexes[0];
	}
};
function pluckInteractionOptions({ enableGutterUtility, enableHoverUtility, lineHoverHighlight, onGutterUtilityClick, onLineClick, onLineEnter, onLineLeave, onLineNumberClick, renderGutterUtility, renderHoverUtility, __debugPointerEvents, enableLineSelection, onLineSelected, onLineSelectionStart, onLineSelectionChange, onLineSelectionEnd }, onHunkExpand, getLineIndex, onMergeConflictActionClick) {
	return {
		enableGutterUtility: resolveEnableGutterUtilityOption({
			enableGutterUtility,
			enableHoverUtility,
			renderGutterUtility,
			renderHoverUtility,
			onGutterUtilityClick
		}),
		usesCustomGutterUtility: renderGutterUtility != null || renderHoverUtility != null,
		lineHoverHighlight,
		onGutterUtilityClick,
		onHunkExpand,
		onMergeConflictActionClick,
		onLineClick,
		onLineEnter,
		onLineLeave,
		onLineNumberClick,
		__debugPointerEvents,
		enableLineSelection,
		onLineSelected,
		onLineSelectionStart,
		onLineSelectionChange,
		onLineSelectionEnd,
		getLineIndex
	};
}
function resolveEnableGutterUtilityOption({ enableGutterUtility, enableHoverUtility, renderGutterUtility, renderHoverUtility, onGutterUtilityClick }) {
	if (enableGutterUtility !== void 0 && enableHoverUtility !== void 0) throw new Error("Cannot use both 'enableGutterUtility' and deprecated 'enableHoverUtility'. Use only 'enableGutterUtility'.");
	if (renderGutterUtility != null && renderHoverUtility != null) throw new Error("Cannot use both 'renderGutterUtility' and deprecated 'renderHoverUtility'. Use only 'renderGutterUtility'.");
	if (onGutterUtilityClick != null && (renderGutterUtility != null || renderHoverUtility != null)) throw new Error("Cannot use both 'onGutterUtilityClick' and render utility callbacks ('renderGutterUtility'/'renderHoverUtility'). Use only one gutter utility API.");
	return enableGutterUtility ?? enableHoverUtility ?? false;
}
function isLinePointerTarget(target) {
	return target != null && "kind" in target && target.kind === "line";
}
function isExpandoPointerTarget(target) {
	return "type" in target && target.type === "line-info";
}
function isMergeConflictActionPointerTarget(target) {
	return "kind" in target && target.kind === "merge-conflict-action";
}
function isMergeConflictResolution(value) {
	return value === "current" || value === "incoming" || value === "both";
}
function queryHTMLElement(parent, query) {
	const element = parent?.querySelector(query);
	return element instanceof HTMLElement ? element : void 0;
}
function getLineTypeFromElement(element) {
	const lineType = element.getAttribute("data-line-type");
	if (lineType == null) return;
	switch (lineType) {
		case "change-deletion":
		case "change-addition":
		case "context":
		case "context-expanded": return lineType;
		default: return;
	}
}
function isGutterUtilityPointerPath(path) {
	for (const element of path) if (element instanceof HTMLElement && element.hasAttribute("data-utility-button")) return true;
	return false;
}
function debugLogIfEnabled(debugLogType = "none", logIfType, ...args) {
	switch (debugLogType) {
		case "none": return;
		case "both": break;
		case "click":
			if (logIfType !== "click") return;
			break;
		case "move":
			if (logIfType !== "move") return;
			break;
	}
	console.log(...args);
}
var ResizeManager = class {
	observedNodes = /* @__PURE__ */ new Map();
	queuedUpdates = /* @__PURE__ */ new Map();
	cleanUp() {
		this.resizeObserver?.disconnect();
		this.observedNodes.clear();
		this.queuedUpdates.clear();
	}
	resizeObserver;
	setup(pre, disableAnnotations) {
		this.resizeObserver ??= new ResizeObserver(this.handleResizeObserver);
		const codeElements = pre.querySelectorAll("code");
		const observedNodes = new Map(this.observedNodes);
		this.observedNodes.clear();
		for (const codeElement of codeElements) {
			let item = observedNodes.get(codeElement);
			if (item != null && item.type !== "code") throw new Error("ResizeManager.setup: somehow a code node is being used for an annotation, should be impossible");
			let numberElement = codeElement.firstElementChild;
			if (!(numberElement instanceof HTMLElement)) numberElement = null;
			if (item != null) {
				this.observedNodes.set(codeElement, item);
				observedNodes.delete(codeElement);
				if (item.numberElement !== numberElement) {
					if (item.numberElement != null) this.resizeObserver.unobserve(item.numberElement);
					if (numberElement != null) {
						this.resizeObserver.observe(numberElement);
						observedNodes.delete(numberElement);
						this.observedNodes.set(numberElement, item);
					}
					item.numberElement = numberElement;
				} else if (item.numberElement != null) {
					observedNodes.delete(item.numberElement);
					this.observedNodes.set(item.numberElement, item);
				}
			} else {
				item = {
					type: "code",
					codeElement,
					numberElement,
					codeWidth: "auto",
					numberWidth: 0
				};
				this.observedNodes.set(codeElement, item);
				this.resizeObserver.observe(codeElement);
				if (numberElement != null) {
					this.observedNodes.set(numberElement, item);
					this.resizeObserver.observe(numberElement);
				}
			}
		}
		if (codeElements.length > 1 && !disableAnnotations) {
			const annotationElements = pre.querySelectorAll("[data-line-annotation*=\",\"]");
			const elementMap = /* @__PURE__ */ new Map();
			for (const element of annotationElements) {
				if (!(element instanceof HTMLElement)) continue;
				const { lineAnnotation = "" } = element.dataset;
				if (!/^\d+,\d+$/.test(lineAnnotation)) {
					console.error("DiffFileRenderer.setupResizeObserver: Invalid element or annotation", {
						lineAnnotation,
						element
					});
					continue;
				}
				let pairs = elementMap.get(lineAnnotation);
				if (pairs == null) {
					pairs = [];
					elementMap.set(lineAnnotation, pairs);
				}
				pairs.push(element);
			}
			for (const [key, pair] of elementMap) {
				if (pair.length !== 2) {
					console.error("DiffFileRenderer.setupResizeObserver: Bad Pair", key, pair);
					continue;
				}
				const [container1, container2] = pair;
				const child1 = container1.firstElementChild;
				const child2 = container2.firstElementChild;
				if (!(container1 instanceof HTMLElement) || !(container2 instanceof HTMLElement) || !(child1 instanceof HTMLElement) || !(child2 instanceof HTMLElement)) continue;
				let item = observedNodes.get(child1);
				if (item != null) {
					this.observedNodes.set(child1, item);
					this.observedNodes.set(child2, item);
					observedNodes.delete(child1);
					observedNodes.delete(child2);
					continue;
				}
				item = {
					type: "annotations",
					column1: {
						container: container1,
						child: child1,
						childHeight: child1.getBoundingClientRect().height
					},
					column2: {
						container: container2,
						child: child2,
						childHeight: child2.getBoundingClientRect().height
					},
					currentHeight: "auto"
				};
				const newHeight = Math.max(item.column1.childHeight, item.column2.childHeight);
				this.applyNewHeight(item, newHeight);
				this.observedNodes.set(child1, item);
				this.observedNodes.set(child2, item);
				this.resizeObserver.observe(child1);
				this.resizeObserver.observe(child2);
			}
		}
		for (const element of observedNodes.keys()) {
			if (element.isConnected) {
				element.style.removeProperty("--diffs-column-content-width");
				element.style.removeProperty("--diffs-column-number-width");
				element.style.removeProperty("--diffs-column-width");
				if (element.parentElement instanceof HTMLElement) element.parentElement.style.removeProperty("--diffs-annotation-min-height");
			}
			this.resizeObserver.unobserve(element);
		}
		observedNodes.clear();
	}
	handleResizeObserver = (entries) => {
		for (const entry of entries) {
			const { target, borderBoxSize } = entry;
			if (!(target instanceof HTMLElement)) {
				console.error("FileDiff.handleResizeObserver: Invalid element for ResizeObserver", entry);
				continue;
			}
			const item = this.observedNodes.get(target);
			if (item == null) {
				console.error("FileDiff.handleResizeObserver: Not a valid observed node", entry);
				continue;
			}
			const specs = borderBoxSize[0];
			if (item.type === "annotations") {
				const column = (() => {
					if (target === item.column1.child) return item.column1;
					if (target === item.column2.child) return item.column2;
				})();
				if (column == null) {
					console.error(`FileDiff.handleResizeObserver: Couldn't find a column for`, {
						item,
						target
					});
					continue;
				}
				column.childHeight = specs.blockSize;
				const newHeight = Math.max(item.column1.childHeight, item.column2.childHeight);
				this.applyNewHeight(item, newHeight);
			} else if (item.type === "code") {
				const update = [target, specs.inlineSize];
				const updates = this.queuedUpdates.get(item) ?? [];
				updates.push(update);
				this.queuedUpdates.set(item, updates);
			}
		}
		this.handleColumnChange();
	};
	handleColumnChange = () => {
		for (const [item, updates] of this.queuedUpdates) for (const [target, targetInlineSize] of updates) if (target === item.codeElement) {
			const inlineSize = Math.max(Math.floor(targetInlineSize), 0);
			if (inlineSize !== item.codeWidth) {
				const targetWidth = Math.max(inlineSize - item.numberWidth, 0);
				item.codeWidth = inlineSize === 0 ? "auto" : inlineSize;
				item.codeElement.style.setProperty("--diffs-column-content-width", `${targetWidth > 0 ? `${targetWidth}px` : "auto"}`);
				item.codeElement.style.setProperty("--diffs-column-width", `${typeof item.codeWidth === "number" ? `${item.codeWidth}px` : "auto"}`);
			}
			if (item.numberElement != null && typeof item.codeWidth === "number" && item.numberWidth === 0) updates.push([item.numberElement, item.numberElement.getBoundingClientRect().width]);
		} else if (target === item.numberElement) {
			const inlineSize = Math.max(Math.ceil(targetInlineSize), 0);
			if (inlineSize !== item.numberWidth) {
				item.numberWidth = inlineSize;
				item.codeElement.style.setProperty("--diffs-column-number-width", `${item.numberWidth === 0 ? "auto" : `${item.numberWidth}px`}`);
				if (item.codeWidth !== "auto") {
					const targetWidth = Math.max(item.codeWidth - item.numberWidth, 0);
					item.codeElement.style.setProperty("--diffs-column-content-width", `${targetWidth === 0 ? "auto" : `${targetWidth}px`}`);
				}
			}
		}
		this.queuedUpdates.clear();
	};
	applyNewHeight(item, newHeight) {
		if (newHeight !== item.currentHeight) {
			item.currentHeight = Math.max(newHeight, 0);
			item.column1.container.style.setProperty("--diffs-annotation-min-height", `${item.currentHeight}px`);
			item.column2.container.style.setProperty("--diffs-annotation-min-height", `${item.currentHeight}px`);
		}
	}
};
var ResolvedLanguages = /* @__PURE__ */ new Map();
var ResolvingLanguages = /* @__PURE__ */ new Map();
var RegisteredCustomLanguages = /* @__PURE__ */ new Map();
var AttachedLanguages = /* @__PURE__ */ new Set();
function areLanguagesAttached(languages) {
	for (const language of Array.isArray(languages) ? languages : [languages]) if (!AttachedLanguages.has(language)) return false;
	return true;
}
function attachResolvedLanguages(resolvedLanguages, highlighter$1) {
	resolvedLanguages = Array.isArray(resolvedLanguages) ? resolvedLanguages : [resolvedLanguages];
	for (const resolvedLang of resolvedLanguages) {
		if (AttachedLanguages.has(resolvedLang.name)) continue;
		let lang = ResolvedLanguages.get(resolvedLang.name);
		if (lang == null) {
			lang = resolvedLang;
			ResolvedLanguages.set(resolvedLang.name, lang);
		}
		AttachedLanguages.add(lang.name);
		highlighter$1.loadLanguageSync(lang.data);
	}
}
function isWorkerContext() {
	return typeof WorkerGlobalScope !== "undefined" && typeof self !== "undefined" && self instanceof WorkerGlobalScope;
}
async function resolveLanguage(lang) {
	if (isWorkerContext()) throw new Error(`resolveLanguage("${lang}") cannot be called from a worker context. Languages must be pre-resolved on the main thread and passed to the worker via the resolvedLanguages parameter.`);
	const resolver = ResolvingLanguages.get(lang);
	if (resolver != null) return resolver;
	try {
		let loader = RegisteredCustomLanguages.get(lang);
		if (loader == null && Object.prototype.hasOwnProperty.call(bundledLanguages, lang)) loader = bundledLanguages[lang];
		if (loader == null) throw new Error(`resolveLanguage: "${lang}" not found in bundled or custom languages`);
		const resolver$1 = loader().then(({ default: data }) => {
			const resolvedLang = {
				name: lang,
				data
			};
			if (!ResolvedLanguages.has(lang)) ResolvedLanguages.set(lang, resolvedLang);
			return resolvedLang;
		});
		ResolvingLanguages.set(lang, resolver$1);
		return await resolver$1;
	} finally {
		ResolvingLanguages.delete(lang);
	}
}
function getResolvedOrResolveLanguage(language) {
	return ResolvedLanguages.get(language) ?? resolveLanguage(language);
}
var ResolvedThemes = /* @__PURE__ */ new Map();
var ResolvingThemes = /* @__PURE__ */ new Map();
var RegisteredCustomThemes = /* @__PURE__ */ new Map();
var AttachedThemes = /* @__PURE__ */ new Set();
function attachResolvedThemes(themes, highlighter$1) {
	themes = Array.isArray(themes) ? themes : [themes];
	for (let themeRef of themes) {
		let resolvedTheme;
		if (typeof themeRef === "string") {
			resolvedTheme = ResolvedThemes.get(themeRef);
			if (resolvedTheme == null) throw new Error(`loadResolvedThemes: ${themeRef} is not resolved, you must resolve it before calling loadResolvedThemes`);
		} else {
			resolvedTheme = themeRef;
			themeRef = themeRef.name;
			if (!ResolvedThemes.has(themeRef)) ResolvedThemes.set(themeRef, resolvedTheme);
		}
		if (AttachedThemes.has(themeRef)) continue;
		AttachedThemes.add(themeRef);
		highlighter$1.loadThemeSync(resolvedTheme);
	}
}
async function resolveTheme(themeName) {
	if (isWorkerContext()) throw new Error(`resolveTheme("${themeName}") cannot be called from a worker context. Themes must be pre-resolved on the main thread and passed to the worker via the resolvedLanguages parameter.`);
	const resolver = ResolvingThemes.get(themeName);
	if (resolver != null) return resolver;
	try {
		const loader = RegisteredCustomThemes.get(themeName) ?? bundledThemes[themeName];
		if (loader == null) throw new Error(`resolveTheme: No valid loader for ${themeName}`);
		const resolver$1 = loader().then((result) => {
			return normalizeAndCacheResolvedTheme(themeName, "default" in result ? result.default : result);
		});
		ResolvingThemes.set(themeName, resolver$1);
		const theme = await resolver$1;
		if (theme.name !== themeName) throw new Error(`resolvedTheme: themeName: ${themeName} does not match theme.name: ${theme.name}`);
		ResolvedThemes.set(theme.name, theme);
		return theme;
	} finally {
		ResolvingThemes.delete(themeName);
	}
}
function normalizeAndCacheResolvedTheme(themeName, themeData) {
	const resolvedTheme = ResolvedThemes.get(themeName);
	if (resolvedTheme != null) return resolvedTheme;
	themeData = normalizeTheme(themeData);
	ResolvedThemes.set(themeName, themeData);
	return themeData;
}
function getResolvedOrResolveTheme(themeName) {
	return ResolvedThemes.get(themeName) ?? resolveTheme(themeName);
}
function registerCustomTheme(themeName, loader) {
	if (RegisteredCustomThemes.has(themeName)) {
		console.error("SharedHighlight.registerCustomTheme: theme name already registered", themeName);
		return;
	}
	RegisteredCustomThemes.set(themeName, loader);
}
var highlighter;
async function getSharedHighlighter({ themes, langs, preferredHighlighter = "shiki-js" }) {
	highlighter ??= createHighlighter({
		themes: [],
		langs: ["text"],
		engine: preferredHighlighter === "shiki-wasm" ? createOnigurumaEngine(__vitePreload(() => import("./wasm-Cm0l_x6O.js"), [], import.meta.url)) : createJavaScriptRegexEngine()
	});
	const instance = isHighlighterLoading(highlighter) ? await highlighter : highlighter;
	highlighter = instance;
	const languageLoaders = [];
	for (const language of langs) {
		if (language === "text" || language === "ansi") continue;
		const maybeResolvedLanguage = getResolvedOrResolveLanguage(language);
		if ("then" in maybeResolvedLanguage) languageLoaders.push(maybeResolvedLanguage);
		else attachResolvedLanguages(maybeResolvedLanguage, instance);
	}
	const themeLoaders = [];
	for (const themeName of themes) {
		const maybeResolvedTheme = getResolvedOrResolveTheme(themeName);
		if ("then" in maybeResolvedTheme) themeLoaders.push(maybeResolvedTheme);
		else attachResolvedThemes(maybeResolvedTheme, highlighter);
	}
	if (languageLoaders.length > 0 || themeLoaders.length > 0) await Promise.all([Promise.all(languageLoaders).then((languages) => {
		attachResolvedLanguages(languages, instance);
	}), Promise.all(themeLoaders).then((themes$1) => {
		attachResolvedThemes(themes$1, instance);
	})]);
	return instance;
}
function getHighlighterIfLoaded() {
	if (highlighter != null && !("then" in highlighter)) return highlighter;
}
function isHighlighterLoading(h = highlighter) {
	return h != null && "then" in h;
}
registerCustomTheme("pierre-dark", async () => {
	const m = await __vitePreload(() => import("./pierre-dark-BwveGmmT.js"), [], import.meta.url);
	return {
		...m.default ?? m,
		name: "pierre-dark"
	};
});
registerCustomTheme("pierre-light", async () => {
	const m = await __vitePreload(() => import("./pierre-light-urZiPveE.js"), [], import.meta.url);
	return {
		...m.default ?? m,
		name: "pierre-light"
	};
});
function getThemes(theme = DEFAULT_THEMES) {
	const themesArr = [];
	if (typeof theme === "string") themesArr.push(theme);
	else {
		themesArr.push(theme.dark);
		themesArr.push(theme.light);
	}
	return themesArr;
}
function areThemesAttached(themes) {
	for (const theme of getThemes(themes)) if (!AttachedThemes.has(theme)) return false;
	return true;
}
function areRenderRangesEqual(renderRangeA, renderRangeB) {
	if (renderRangeA == null || renderRangeB == null) return renderRangeA === renderRangeB;
	return renderRangeA.startingLine === renderRangeB.startingLine && renderRangeA.totalLines === renderRangeB.totalLines && renderRangeA.bufferBefore === renderRangeB.bufferBefore && renderRangeA.bufferAfter === renderRangeB.bufferAfter;
}
function areThemesEqual(themeA, themeB) {
	if (themeA == null || themeB == null || typeof themeA === "string" || typeof themeB === "string") return themeA === themeB;
	return themeA.dark === themeB.dark && themeA.light === themeB.light;
}
function createAnnotationElement(span) {
	return createHastElement({
		tagName: "div",
		children: [createHastElement({
			tagName: "div",
			children: span.annotations?.map((slotId) => createHastElement({
				tagName: "slot",
				properties: { name: slotId }
			})),
			properties: { "data-annotation-content": "" }
		})],
		properties: { "data-line-annotation": `${span.hunkIndex},${span.lineIndex}` }
	});
}
function getIconForType(type) {
	switch (type) {
		case "file": return "diffs-icon-file-code";
		case "change": return "diffs-icon-symbol-modified";
		case "new": return "diffs-icon-symbol-added";
		case "deleted": return "diffs-icon-symbol-deleted";
		case "rename-pure":
		case "rename-changed": return "diffs-icon-symbol-moved";
	}
}
function createFileHeaderElement({ fileOrDiff, mode }) {
	const fileDiff = "type" in fileOrDiff ? fileOrDiff : void 0;
	const properties = {
		"data-diffs-header": mode,
		"data-change-type": fileDiff?.type
	};
	return createHastElement({
		tagName: "div",
		children: [mode === "custom" ? createHastElement({
			tagName: "slot",
			properties: { name: CUSTOM_HEADER_SLOT_ID }
		}) : createHeaderElement({
			name: fileOrDiff.name,
			prevName: "prevName" in fileOrDiff ? fileOrDiff.prevName : void 0,
			iconType: fileDiff?.type ?? "file"
		}), ...mode === "custom" ? [] : [createMetadataElement(fileDiff)]],
		properties
	});
}
function createHeaderElement({ name, prevName, iconType }) {
	const children = [createHastElement({
		tagName: "slot",
		properties: { name: HEADER_PREFIX_SLOT_ID }
	}), createIconElement({
		name: getIconForType(iconType),
		properties: { "data-change-icon": iconType }
	})];
	if (prevName != null) {
		children.push(createHastElement({
			tagName: "div",
			children: [createHastElement({
				tagName: "bdi",
				children: [createTextNodeElement(prevName)]
			})],
			properties: { "data-prev-name": "" }
		}));
		children.push(createIconElement({
			name: "diffs-icon-arrow-right-short",
			properties: { "data-rename-icon": "" }
		}));
	}
	children.push(createHastElement({
		tagName: "div",
		children: [createHastElement({
			tagName: "bdi",
			children: [createTextNodeElement(name)]
		})],
		properties: { "data-title": "" }
	}));
	return createHastElement({
		tagName: "div",
		children,
		properties: { "data-header-content": "" }
	});
}
function createMetadataElement(fileDiff) {
	const children = [];
	if (fileDiff != null) {
		let additions = 0;
		let deletions = 0;
		for (const hunk of fileDiff.hunks) {
			additions += hunk.additionLines;
			deletions += hunk.deletionLines;
		}
		if (deletions > 0 || additions === 0) children.push(createHastElement({
			tagName: "span",
			children: [createTextNodeElement(`-${deletions}`)],
			properties: { "data-deletions-count": "" }
		}));
		if (additions > 0 || deletions === 0) children.push(createHastElement({
			tagName: "span",
			children: [createTextNodeElement(`+${additions}`)],
			properties: { "data-additions-count": "" }
		}));
	}
	children.push(createHastElement({
		tagName: "slot",
		properties: { name: HEADER_METADATA_SLOT_ID }
	}));
	return createHastElement({
		tagName: "div",
		children,
		properties: { "data-metadata": "" }
	});
}
function createPreElement(options) {
	return createHastElement({
		tagName: "pre",
		properties: createPreWrapperProperties(options)
	});
}
function createPreWrapperProperties({ diffIndicators, disableBackground, disableLineNumbers, overflow, split, totalLines, type, customProperties }) {
	return {
		...customProperties,
		"data-diff": type === "diff" ? "" : void 0,
		"data-file": type === "file" ? "" : void 0,
		"data-diff-type": type === "diff" ? split ? "split" : "single" : void 0,
		"data-overflow": overflow,
		"data-disable-line-numbers": disableLineNumbers ? "" : void 0,
		"data-background": !disableBackground ? "" : void 0,
		"data-indicators": diffIndicators === "bars" || diffIndicators === "classic" ? diffIndicators : void 0,
		tabIndex: 0,
		style: `--diffs-min-number-column-width-default:${`${totalLines}`.length}ch;`
	};
}
var CUSTOM_EXTENSION_TO_FILE_FORMAT = /* @__PURE__ */ new Map();
var EXTENSION_TO_FILE_FORMAT = {
	"1c": "1c",
	abap: "abap",
	as: "actionscript-3",
	ada: "ada",
	adb: "ada",
	ads: "ada",
	adoc: "asciidoc",
	asciidoc: "asciidoc",
	"component.html": "angular-html",
	"component.ts": "angular-ts",
	conf: "nginx",
	htaccess: "apache",
	cls: "tex",
	trigger: "apex",
	apl: "apl",
	applescript: "applescript",
	scpt: "applescript",
	ara: "ara",
	asm: "asm",
	s: "riscv",
	astro: "astro",
	awk: "awk",
	bal: "ballerina",
	sh: "zsh",
	bash: "zsh",
	bat: "cmd",
	cmd: "cmd",
	be: "berry",
	beancount: "beancount",
	bib: "bibtex",
	bicep: "bicep",
	"blade.php": "blade",
	bsl: "bsl",
	c: "c",
	h: "objective-cpp",
	cs: "csharp",
	cpp: "cpp",
	hpp: "cpp",
	cc: "cpp",
	cxx: "cpp",
	hh: "cpp",
	cdc: "cdc",
	cairo: "cairo",
	clar: "clarity",
	clj: "clojure",
	cljs: "clojure",
	cljc: "clojure",
	soy: "soy",
	cmake: "cmake",
	"CMakeLists.txt": "cmake",
	cob: "cobol",
	cbl: "cobol",
	cobol: "cobol",
	CODEOWNERS: "codeowners",
	ql: "ql",
	coffee: "coffeescript",
	lisp: "lisp",
	cl: "lisp",
	lsp: "lisp",
	log: "log",
	v: "verilog",
	cql: "cql",
	cr: "crystal",
	css: "css",
	csv: "csv",
	cue: "cue",
	cypher: "cypher",
	cyp: "cypher",
	d: "d",
	dart: "dart",
	dax: "dax",
	desktop: "desktop",
	diff: "diff",
	patch: "diff",
	Dockerfile: "dockerfile",
	dockerfile: "dockerfile",
	env: "dotenv",
	dm: "dream-maker",
	edge: "edge",
	el: "emacs-lisp",
	ex: "elixir",
	exs: "elixir",
	elm: "elm",
	erb: "erb",
	erl: "erlang",
	hrl: "erlang",
	f: "fortran-fixed-form",
	for: "fortran-fixed-form",
	fs: "fsharp",
	fsi: "fsharp",
	fsx: "fsharp",
	f03: "f03",
	f08: "f08",
	f18: "f18",
	f77: "f77",
	f90: "fortran-free-form",
	f95: "fortran-free-form",
	fnl: "fennel",
	fish: "fish",
	ftl: "ftl",
	tres: "gdresource",
	res: "gdresource",
	gd: "gdscript",
	gdshader: "gdshader",
	gs: "genie",
	feature: "gherkin",
	COMMIT_EDITMSG: "git-commit",
	"git-rebase-todo": "git-rebase",
	gjs: "glimmer-js",
	gleam: "gleam",
	gts: "glimmer-ts",
	glsl: "glsl",
	vert: "glsl",
	frag: "glsl",
	shader: "shaderlab",
	gp: "gnuplot",
	plt: "gnuplot",
	gnuplot: "gnuplot",
	go: "go",
	graphql: "graphql",
	gql: "graphql",
	groovy: "groovy",
	gvy: "groovy",
	hack: "hack",
	haml: "haml",
	hbs: "handlebars",
	handlebars: "handlebars",
	hs: "haskell",
	lhs: "haskell",
	hx: "haxe",
	hcl: "hcl",
	hjson: "hjson",
	hlsl: "hlsl",
	fx: "hlsl",
	html: "html",
	htm: "html",
	http: "http",
	rest: "http",
	hxml: "hxml",
	hy: "hy",
	imba: "imba",
	ini: "ini",
	cfg: "ini",
	jade: "pug",
	pug: "pug",
	java: "java",
	js: "javascript",
	mjs: "javascript",
	cjs: "javascript",
	jinja: "jinja",
	jinja2: "jinja",
	j2: "jinja",
	jison: "jison",
	jl: "julia",
	json: "json",
	json5: "json5",
	jsonc: "jsonc",
	jsonl: "jsonl",
	jsonnet: "jsonnet",
	libsonnet: "jsonnet",
	jssm: "jssm",
	jsx: "jsx",
	kt: "kotlin",
	kts: "kts",
	kql: "kusto",
	tex: "tex",
	ltx: "tex",
	lean: "lean4",
	less: "less",
	liquid: "liquid",
	lit: "lit",
	ll: "llvm",
	logo: "logo",
	lua: "lua",
	luau: "luau",
	Makefile: "makefile",
	mk: "makefile",
	makefile: "makefile",
	md: "markdown",
	markdown: "markdown",
	marko: "marko",
	m: "wolfram",
	mat: "matlab",
	mdc: "mdc",
	mdx: "mdx",
	wiki: "wikitext",
	mediawiki: "wikitext",
	mmd: "mermaid",
	mermaid: "mermaid",
	mips: "mipsasm",
	mojo: "mojo",
	"🔥": "mojo",
	move: "move",
	nar: "narrat",
	nf: "nextflow",
	nim: "nim",
	nims: "nim",
	nimble: "nim",
	nix: "nix",
	nu: "nushell",
	mm: "objective-cpp",
	ml: "ocaml",
	mli: "ocaml",
	mll: "ocaml",
	mly: "ocaml",
	pas: "pascal",
	p: "pascal",
	pl: "prolog",
	pm: "perl",
	t: "perl",
	raku: "raku",
	p6: "raku",
	pl6: "raku",
	php: "php",
	phtml: "php",
	pls: "plsql",
	sql: "sql",
	po: "po",
	polar: "polar",
	pcss: "postcss",
	pot: "pot",
	potx: "potx",
	pq: "powerquery",
	pqm: "powerquery",
	ps1: "powershell",
	psm1: "powershell",
	psd1: "powershell",
	prisma: "prisma",
	pro: "prolog",
	P: "prolog",
	properties: "properties",
	proto: "protobuf",
	pp: "puppet",
	purs: "purescript",
	py: "python",
	pyw: "python",
	pyi: "python",
	qml: "qml",
	qmldir: "qmldir",
	qss: "qss",
	r: "r",
	R: "r",
	rkt: "racket",
	rktl: "racket",
	razor: "razor",
	cshtml: "razor",
	rb: "ruby",
	rbw: "ruby",
	reg: "reg",
	regex: "regexp",
	rel: "rel",
	rs: "rust",
	rst: "rst",
	rake: "ruby",
	gemspec: "ruby",
	sas: "sas",
	sass: "sass",
	scala: "scala",
	sc: "scala",
	scm: "scheme",
	ss: "scheme",
	sld: "scheme",
	scss: "scss",
	sdbl: "sdbl",
	shadergraph: "shader",
	st: "smalltalk",
	sol: "solidity",
	sparql: "sparql",
	rq: "sparql",
	spl: "splunk",
	config: "ssh-config",
	do: "stata",
	ado: "stata",
	dta: "stata",
	styl: "stylus",
	stylus: "stylus",
	svelte: "svelte",
	swift: "swift",
	sv: "system-verilog",
	svh: "system-verilog",
	service: "systemd",
	socket: "systemd",
	device: "systemd",
	timer: "systemd",
	talon: "talonscript",
	tasl: "tasl",
	tcl: "tcl",
	templ: "templ",
	tf: "tf",
	tfvars: "tfvars",
	toml: "toml",
	ts: "typescript",
	tsp: "typespec",
	tsv: "tsv",
	tsx: "tsx",
	ttl: "turtle",
	twig: "twig",
	typ: "typst",
	vv: "v",
	vala: "vala",
	vapi: "vala",
	vb: "vb",
	vbs: "vb",
	bas: "vb",
	vh: "verilog",
	vhd: "vhdl",
	vhdl: "vhdl",
	vim: "vimscript",
	vue: "vue",
	"vine.ts": "vue-vine",
	vy: "vyper",
	wasm: "wasm",
	wat: "wasm",
	wy: "文言",
	wgsl: "wgsl",
	wit: "wit",
	wl: "wolfram",
	nb: "wolfram",
	xml: "xml",
	xsl: "xsl",
	xslt: "xsl",
	yaml: "yaml",
	yml: "yml",
	zs: "zenscript",
	zig: "zig",
	zsh: "zsh",
	sty: "tex"
};
function getFiletypeFromFileName(fileName) {
	if (CUSTOM_EXTENSION_TO_FILE_FORMAT.has(fileName)) return CUSTOM_EXTENSION_TO_FILE_FORMAT.get(fileName) ?? "text";
	if (EXTENSION_TO_FILE_FORMAT[fileName] != null) return EXTENSION_TO_FILE_FORMAT[fileName];
	const compoundMatch = fileName.match(/\.([^/\\]+\.[^/\\]+)$/);
	if (compoundMatch != null) {
		if (CUSTOM_EXTENSION_TO_FILE_FORMAT.has(compoundMatch[1])) return CUSTOM_EXTENSION_TO_FILE_FORMAT.get(compoundMatch[1]) ?? "text";
		if (EXTENSION_TO_FILE_FORMAT[compoundMatch[1]] != null) return EXTENSION_TO_FILE_FORMAT[compoundMatch[1]] ?? "text";
	}
	const simpleMatch = fileName.match(/\.([^.]+)$/)?.[1] ?? "";
	if (CUSTOM_EXTENSION_TO_FILE_FORMAT.has(simpleMatch)) return CUSTOM_EXTENSION_TO_FILE_FORMAT.get(simpleMatch) ?? "text";
	return EXTENSION_TO_FILE_FORMAT[simpleMatch] ?? "text";
}
function getHighlighterOptions(lang, { theme, preferredHighlighter = "shiki-js" }) {
	return {
		langs: [lang ?? "text"],
		themes: getThemes(theme),
		preferredHighlighter
	};
}
function getLineAnnotationName(annotation) {
	return `annotation-${"side" in annotation ? `${annotation.side}-` : ""}${annotation.lineNumber}`;
}
function cleanLastNewline(contents) {
	return contents.replace(/\n$|\r\n$/, "");
}
function processLine(node, line, state) {
	const lineInfo = typeof state.lineInfo === "function" ? state.lineInfo(line) : state.lineInfo[line - 1];
	if (lineInfo == null) {
		const errorMessage = `processLine: line ${line}, contains no state.lineInfo`;
		console.error(errorMessage, {
			node,
			line,
			state
		});
		throw new Error(errorMessage);
	}
	node.tagName = "div";
	node.properties["data-line"] = lineInfo.lineNumber;
	node.properties["data-alt-line"] = lineInfo.altLineNumber;
	node.properties["data-line-type"] = lineInfo.type;
	node.properties["data-line-index"] = lineInfo.lineIndex;
	if (node.children.length === 0) node.children.push(createTextNodeElement("\n"));
	return node;
}
function transformerStyleToClass(options = {}) {
	const { classPrefix = "__shiki_", classSuffix = "", classReplacer = (className) => className } = options;
	const classToStyle = /* @__PURE__ */ new Map();
	function stringifyStyle(style) {
		return Object.entries(style).map(([key, value]) => `${key}:${value}`).join(";");
	}
	function registerStyle(style) {
		let className = classPrefix + cyrb53(typeof style === "string" ? style : stringifyStyle(style)) + classSuffix;
		className = classReplacer(className);
		if (!classToStyle.has(className)) classToStyle.set(className, typeof style === "string" ? style : { ...style });
		return className;
	}
	return {
		name: "@shikijs/transformers:style-to-class",
		pre(t) {
			if (!t.properties.style) return;
			const className = registerStyle(t.properties.style);
			delete t.properties.style;
			this.addClassToHast(t, className);
		},
		tokens(lines) {
			for (const line of lines) for (const token of line) {
				if (!token.htmlStyle) continue;
				const className = registerStyle(token.htmlStyle);
				token.htmlStyle = {};
				token.htmlAttrs ||= {};
				if (!token.htmlAttrs.class) token.htmlAttrs.class = className;
				else token.htmlAttrs.class += ` ${className}`;
			}
		},
		getClassRegistry() {
			return classToStyle;
		},
		getCSS() {
			let css = "";
			for (const [className, style] of classToStyle.entries()) css += `.${className}{${typeof style === "string" ? style : stringifyStyle(style)}}`;
			return css;
		},
		clearRegistry() {
			classToStyle.clear();
		}
	};
}
function cyrb53(str, seed = 0) {
	let h1 = 3735928559 ^ seed;
	let h2 = 1103547991 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
	h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
	h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
	h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
	return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36).slice(0, 6);
}
function createTransformerWithState(useCSSClasses = false) {
	const state = { lineInfo: [] };
	const transformers = [{
		line(node) {
			delete node.properties.class;
			return node;
		},
		pre(pre) {
			const code = findCodeElement(pre);
			const children = [];
			if (code != null) {
				let index = 1;
				for (const node of code.children) {
					if (node.type !== "element") continue;
					children.push(processLine(node, index, state));
					index++;
				}
				code.children = children;
			}
			return pre;
		}
	}];
	if (useCSSClasses) transformers.push(tokenStyleNormalizer, toClass);
	return {
		state,
		transformers,
		toClass
	};
}
var toClass = transformerStyleToClass({ classPrefix: "hl-" });
var tokenStyleNormalizer = {
	name: "token-style-normalizer",
	tokens(lines) {
		for (const line of lines) for (const token of line) {
			if (token.htmlStyle != null) continue;
			const style = {};
			if (token.color != null) style.color = token.color;
			if (token.bgColor != null) style["background-color"] = token.bgColor;
			if (token.fontStyle != null && token.fontStyle !== 0) {
				if ((token.fontStyle & 1) !== 0) style["font-style"] = "italic";
				if ((token.fontStyle & 2) !== 0) style["font-weight"] = "bold";
				if ((token.fontStyle & 4) !== 0) style["text-decoration"] = "underline";
			}
			if (Object.keys(style).length > 0) token.htmlStyle = style;
		}
	}
};
function formatCSSVariablePrefix(type) {
	return `--${type === "token" ? "diffs-token" : "diffs"}-`;
}
function getHighlighterThemeStyles({ theme = DEFAULT_THEMES, highlighter: highlighter$1, prefix }) {
	let styles = "";
	if (typeof theme === "string") {
		const themeData = highlighter$1.getTheme(theme);
		styles += `color:${themeData.fg};`;
		styles += `background-color:${themeData.bg};`;
		styles += `${formatCSSVariablePrefix("global")}fg:${themeData.fg};`;
		styles += `${formatCSSVariablePrefix("global")}bg:${themeData.bg};`;
		styles += getThemeVariables(themeData, prefix);
	} else {
		let themeData = highlighter$1.getTheme(theme.dark);
		styles += `${formatCSSVariablePrefix("global")}dark:${themeData.fg};`;
		styles += `${formatCSSVariablePrefix("global")}dark-bg:${themeData.bg};`;
		styles += getThemeVariables(themeData, "dark");
		themeData = highlighter$1.getTheme(theme.light);
		styles += `${formatCSSVariablePrefix("global")}light:${themeData.fg};`;
		styles += `${formatCSSVariablePrefix("global")}light-bg:${themeData.bg};`;
		styles += getThemeVariables(themeData, "light");
	}
	return styles;
}
function getThemeVariables(themeData, modePrefix) {
	modePrefix = modePrefix != null ? `${modePrefix}-` : "";
	let styles = "";
	const additionGreen = themeData.colors?.["gitDecoration.addedResourceForeground"] ?? themeData.colors?.["terminal.ansiGreen"];
	if (additionGreen != null) styles += `${formatCSSVariablePrefix("global")}${modePrefix}addition-color:${additionGreen};`;
	const deletionRed = themeData.colors?.["gitDecoration.deletedResourceForeground"] ?? themeData.colors?.["terminal.ansiRed"];
	if (deletionRed != null) styles += `${formatCSSVariablePrefix("global")}${modePrefix}deletion-color:${deletionRed};`;
	const modifiedBlue = themeData.colors?.["gitDecoration.modifiedResourceForeground"] ?? themeData.colors?.["terminal.ansiBlue"];
	if (modifiedBlue != null) styles += `${formatCSSVariablePrefix("global")}${modePrefix}modified-color:${modifiedBlue};`;
	return styles;
}
function getLineNodes(nodes) {
	let firstChild = nodes.children[0];
	while (firstChild != null) {
		if (firstChild.type === "element" && firstChild.tagName === "code") return firstChild.children;
		if ("children" in firstChild) firstChild = firstChild.children[0];
		else firstChild = null;
	}
	console.error(nodes);
	throw new Error("getLineNodes: Unable to find children");
}
function createContentColumn(children, rowCount) {
	return createHastElement({
		tagName: "div",
		children,
		properties: {
			"data-content": "",
			style: `grid-row: span ${rowCount}`
		}
	});
}
var SVGSpriteSheet = `<svg data-icon-sprite aria-hidden="true" width="0" height="0">
  <symbol id="diffs-icon-arrow-right-short" viewBox="0 0 16 16">
    <path d="M8.47 4.22a.75.75 0 0 0 0 1.06l1.97 1.97H3.75a.75.75 0 0 0 0 1.5h6.69l-1.97 1.97a.75.75 0 1 0 1.06 1.06l3.25-3.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0"/>
  </symbol>
  <symbol id="diffs-icon-brand-github" viewBox="0 0 16 16">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.01 8.01 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27s-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8"/>
  </symbol>
  <symbol id="diffs-icon-chevron" viewBox="0 0 16 16">
    <path d="M1.47 4.47a.75.75 0 0 1 1.06 0L8 9.94l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-chevrons-narrow" viewBox="0 0 10 16">
    <path d="M4.47 2.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1-1.06 1.06L5 3.81 2.28 6.53a.75.75 0 0 1-1.06-1.06zM1.22 9.47a.75.75 0 0 1 1.06 0L5 12.19l2.72-2.72a.75.75 0 0 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-diff-split" viewBox="0 0 16 16">
    <path d="M14 0H8.5v16H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1.5 6.5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.5V0zm.5 7.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1" opacity=".3"/>
  </symbol>
  <symbol id="diffs-icon-diff-unified" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5h16zm-8-4a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1A.5.5 0 0 0 8 10" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 0a2 2 0 0 1 2 2v5.5H0V2a2 2 0 0 1 2-2zM6.5 3.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" clip-rule="evenodd" opacity=".4"/>
  </symbol>
  <symbol id="diffs-icon-expand" viewBox="0 0 16 16">
    <path d="M3.47 5.47a.75.75 0 0 1 1.06 0L8 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06"/>
  </symbol>
  <symbol id="diffs-icon-expand-all" viewBox="0 0 16 16">
    <path d="M11.47 9.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L8 12.94zM7.526 1.418a.75.75 0 0 1 1.004.052l4 4a.75.75 0 1 1-1.06 1.06L8 3.06 4.53 6.53a.75.75 0 1 1-1.06-1.06l4-4z"/>
  </symbol>
  <symbol id="diffs-icon-file-code" viewBox="0 0 16 16">
    <path d="M10.75 0c.199 0 .39.08.53.22l3.5 3.5c.14.14.22.331.22.53v9A2.75 2.75 0 0 1 12.25 16h-8.5A2.75 2.75 0 0 1 1 13.25V2.75A2.75 2.75 0 0 1 3.75 0zm-7 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V5h-1.25A2.25 2.25 0 0 1 10 2.75V1.5z"/><path d="M7.248 6.19a.75.75 0 0 1 .063 1.058L5.753 9l1.558 1.752a.75.75 0 0 1-1.122.996l-2-2.25a.75.75 0 0 1 0-.996l2-2.25a.75.75 0 0 1 1.06-.063M8.69 7.248a.75.75 0 1 1 1.12-.996l2 2.25a.75.75 0 0 1 0 .996l-2 2.25a.75.75 0 1 1-1.12-.996L10.245 9z"/>
  </symbol>
  <symbol id="diffs-icon-plus" viewBox="0 0 16 16">
    <path d="M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3"/>
  </symbol>
  <symbol id="diffs-icon-symbol-added" viewBox="0 0 16 16">
    <path d="M8 4a.75.75 0 0 1 .75.75v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5A.75.75 0 0 1 8 4"/><path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/>
  </symbol>
  <symbol id="diffs-icon-symbol-deleted" viewBox="0 0 16 16">
    <path d="M4 8a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 8"/><path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/>
  </symbol>
  <symbol id="diffs-icon-symbol-diffstat" viewBox="0 0 16 16">
    <path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/><path d="M8.75 4.296a.75.75 0 0 0-1.5 0V6.25h-2a.75.75 0 0 0 0 1.5h2v1.5h1.5v-1.5h2a.75.75 0 0 0 0-1.5h-2zM5.25 10a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5z"/>
  </symbol>
  <symbol id="diffs-icon-symbol-ignored" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706s.826.607 1.706.802c.898.2 2.091.288 3.704.288s2.806-.088 3.704-.288c.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5s-2.806.088-3.704.288c-.88.196-1.381.478-1.706.802s-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8M0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m11.53-2.47a.75.75 0 0 0-1.06-1.06l-6 6a.75.75 0 1 0 1.06 1.06z"/>
  </symbol>
  <symbol id="diffs-icon-symbol-modified" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706s.826.607 1.706.802c.898.2 2.091.288 3.704.288s2.806-.088 3.704-.288c.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5s-2.806.088-3.704.288c-.88.196-1.381.478-1.706.802s-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8M0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
  </symbol>
  <symbol id="diffs-icon-symbol-moved" viewBox="0 0 16 16">
    <path d="M1.788 4.296c.196-.88.478-1.381.802-1.706s.826-.606 1.706-.802C5.194 1.588 6.387 1.5 8 1.5s2.806.088 3.704.288c.88.196 1.381.478 1.706.802s.607.826.802 1.706c.2.898.288 2.091.288 3.704s-.088 2.806-.288 3.704c-.195.88-.478 1.381-.802 1.706s-.826.607-1.706.802c-.898.2-2.091.288-3.704.288s-2.806-.088-3.704-.288c-.88-.195-1.381-.478-1.706-.802s-.606-.826-.802-1.706C1.588 10.806 1.5 9.613 1.5 8s.088-2.806.288-3.704M8 0C1.412 0 0 1.412 0 8s1.412 8 8 8 8-1.412 8-8-1.412-8-8-8"/><path d="M8.495 4.695a.75.75 0 0 0-.05 1.06L10.486 8l-2.041 2.246a.75.75 0 0 0 1.11 1.008l2.5-2.75a.75.75 0 0 0 0-1.008l-2.5-2.75a.75.75 0 0 0-1.06-.051m-4 0a.75.75 0 0 0-.05 1.06l2.044 2.248-1.796 1.995a.75.75 0 0 0 1.114 1.004l2.25-2.5a.75.75 0 0 0-.002-1.007l-2.5-2.75a.75.75 0 0 0-1.06-.05"/>
  </symbol>
  <symbol id="diffs-icon-symbol-ref" viewBox="0 0 16 16">
    <path d="M1.5 8c0 1.613.088 2.806.288 3.704.196.88.478 1.381.802 1.706.286.286.71.54 1.41.73V1.86c-.7.19-1.124.444-1.41.73-.324.325-.606.826-.802 1.706C1.588 5.194 1.5 6.387 1.5 8m4 6.397c.697.07 1.522.103 2.5.103 1.613 0 2.806-.088 3.704-.288.88-.195 1.381-.478 1.706-.802s.607-.826.802-1.706c.2-.898.288-2.091.288-3.704s-.088-2.806-.288-3.704c-.195-.88-.478-1.381-.802-1.706s-.826-.606-1.706-.802C10.806 1.588 9.613 1.5 8 1.5c-.978 0-1.803.033-2.5.103zM0 8c0-6.588 1.412-8 8-8s8 1.412 8 8-1.412 8-8 8-8-1.412-8-8m7-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/>
  </symbol>
</svg>`;
function areFilesEqual(fileA, fileB) {
	return fileA?.cacheKey === fileB?.cacheKey && fileA?.contents === fileB?.contents && fileA?.name === fileB?.name && fileA?.lang === fileB?.lang;
}
function arePrePropertiesEqual(propsA, propsB) {
	if (propsA == null || propsB == null) return propsA === propsB;
	return areCustomPropertiesEqual(propsA.customProperties, propsB.customProperties) && propsA.type === propsB.type && propsA.diffIndicators === propsB.diffIndicators && propsA.disableBackground === propsB.disableBackground && propsA.disableLineNumbers === propsB.disableLineNumbers && propsA.overflow === propsB.overflow && propsA.split === propsB.split && propsA.totalLines === propsB.totalLines;
}
var EMPTY_CUSTOM_PROPERTIES = {};
function areCustomPropertiesEqual(customPropertiesA = EMPTY_CUSTOM_PROPERTIES, customPropertiesB = EMPTY_CUSTOM_PROPERTIES) {
	if (customPropertiesA === customPropertiesB) return true;
	const keysA = Object.keys(customPropertiesA);
	const keysB = Object.keys(customPropertiesB);
	if (keysA.length !== keysB.length) return false;
	for (const key of keysA) if (customPropertiesA[key] !== customPropertiesB[key]) return false;
	return true;
}
function createAnnotationWrapperNode(slot) {
	const wrapper = document.createElement("div");
	wrapper.dataset.annotationSlot = "";
	wrapper.slot = slot;
	wrapper.style.whiteSpace = "normal";
	return wrapper;
}
function createGutterUtilityContentNode() {
	const gutterUtilityContent = document.createElement("div");
	gutterUtilityContent.slot = "gutter-utility-slot";
	gutterUtilityContent.style.position = "absolute";
	gutterUtilityContent.style.top = "0";
	gutterUtilityContent.style.bottom = "0";
	gutterUtilityContent.style.textAlign = "center";
	gutterUtilityContent.style.whiteSpace = "normal";
	return gutterUtilityContent;
}
function createUnsafeCSSStyleNode() {
	const node = document.createElement("style");
	node.setAttribute(UNSAFE_CSS_ATTRIBUTE, "");
	return node;
}
var style_default = "@layer base, theme, rendered, unsafe;\n\n@layer base {\n  :host {\n    --diffs-font-fallback:\n      'SF Mono', Monaco, Consolas, 'Ubuntu Mono', 'Liberation Mono',\n      'Courier New', monospace;\n    --diffs-header-font-fallback:\n      system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',\n      'Noto Sans', 'Liberation Sans', Arial, sans-serif;\n\n    --diffs-mixer: light-dark(black, white);\n    --diffs-gap-fallback: 8px;\n\n    --diffs-added-light: #0dbe4e;\n    --diffs-added-dark: #5ecc71;\n    --diffs-modified-light: #009fff;\n    --diffs-modified-dark: #69b1ff;\n    --diffs-deleted-light: #ff2e3f;\n    --diffs-deleted-dark: #ff6762;\n\n    /*\n    // Available CSS Color Overrides\n    --diffs-bg-buffer-override\n    --diffs-bg-hover-override\n    --diffs-bg-context-override\n    --diffs-bg-separator-override\n\n    --diffs-fg-number-override\n    --diffs-fg-number-addition-override\n    --diffs-fg-number-deletion-override\n    --diffs-fg-conflict-marker-override\n\n    --diffs-deletion-color-override\n    --diffs-addition-color-override\n    --diffs-modified-color-override\n\n    --diffs-bg-deletion-override\n    --diffs-bg-deletion-number-override\n    --diffs-bg-deletion-hover-override\n    --diffs-bg-deletion-emphasis-override\n\n    --diffs-bg-addition-override\n    --diffs-bg-addition-number-override\n    --diffs-bg-addition-hover-override\n    --diffs-bg-addition-emphasis-override\n\n    // Line Selection Color Overrides (for enableLineSelection)\n    --diffs-selection-color-override\n    --diffs-bg-selection-override\n    --diffs-bg-selection-number-override\n    --diffs-bg-selection-background-override\n    --diffs-bg-selection-number-background-override\n\n    // Available CSS Layout Overrides\n    --diffs-gap-inline\n    --diffs-gap-block\n    --diffs-gap-style\n    --diffs-tab-size\n  */\n\n    color-scheme: light dark;\n    display: block;\n    font-family: var(\n      --diffs-header-font-family,\n      var(--diffs-header-font-fallback)\n    );\n    font-size: var(--diffs-font-size, 13px);\n    line-height: var(--diffs-line-height, 20px);\n    font-feature-settings: var(--diffs-font-features);\n\n    /* NOTE(amadeus): we cannot use 'in oklch' because current versions of cursor\n     * and vscode use an older build of chrome that appears to have a bug with\n     * color-mix and 'in oklch', so use 'in lab' instead */\n    --diffs-bg: light-dark(\n      var(--diffs-light-bg, #fff),\n      var(--diffs-dark-bg, #000)\n    );\n    --diffs-bg-buffer: var(\n      --diffs-bg-buffer-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 92%, var(--diffs-mixer)),\n        color-mix(in lab, var(--diffs-bg) 92%, var(--diffs-mixer))\n      )\n    );\n    --diffs-bg-hover: var(\n      --diffs-bg-hover-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 97%, var(--diffs-mixer)),\n        color-mix(in lab, var(--diffs-bg) 91%, var(--diffs-mixer))\n      )\n    );\n\n    --diffs-bg-context: var(\n      --diffs-bg-context-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 98.5%, var(--diffs-mixer)),\n        color-mix(in lab, var(--diffs-bg) 92.5%, var(--diffs-mixer))\n      )\n    );\n    --diffs-bg-context-number: var(\n      --diffs-bg-context-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg-context) 80%, var(--diffs-bg)),\n        color-mix(in lab, var(--diffs-bg-context) 60%, var(--diffs-bg))\n      )\n    );\n    --diffs-bg-conflict-marker: var(\n      --diffs-bg-conflict-marker-override,\n      light-dark(\n        color-mix(\n          in lab,\n          var(--diffs-bg-context) 88%,\n          var(--diffs-modified-base)\n        ),\n        color-mix(\n          in lab,\n          var(--diffs-bg-context) 80%,\n          var(--diffs-modified-base)\n        )\n      )\n    );\n    --diffs-bg-conflict-current: var(\n      --diffs-bg-conflict-current-override,\n      light-dark(#e5f8ea, #274432)\n    );\n    --diffs-bg-conflict-base: var(\n      --diffs-bg-conflict-base-override,\n      light-dark(\n        color-mix(\n          in lab,\n          var(--diffs-bg-context) 90%,\n          var(--diffs-modified-base)\n        ),\n        color-mix(\n          in lab,\n          var(--diffs-bg-context) 82%,\n          var(--diffs-modified-base)\n        )\n      )\n    );\n    --diffs-bg-conflict-incoming: var(\n      --diffs-bg-conflict-incoming-override,\n      light-dark(#e6f1ff, #253b5a)\n    );\n    --diffs-bg-conflict-marker-number: var(\n      --diffs-bg-conflict-marker-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg-conflict-marker) 72%, var(--diffs-bg)),\n        color-mix(in lab, var(--diffs-bg-conflict-marker) 54%, var(--diffs-bg))\n      )\n    );\n    --diffs-bg-conflict-current-number: var(\n      --diffs-bg-conflict-current-number-override,\n      light-dark(#d7f1de, #30533d)\n    );\n    --diffs-bg-conflict-base-number: var(\n      --diffs-bg-conflict-base-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg-conflict-base) 72%, var(--diffs-bg)),\n        color-mix(in lab, var(--diffs-bg-conflict-base) 54%, var(--diffs-bg))\n      )\n    );\n    --diffs-bg-conflict-incoming-number: var(\n      --diffs-bg-conflict-incoming-number-override,\n      light-dark(#d8e8ff, #2f4b73)\n    );\n    --conflict-bg-current: var(\n      --conflict-bg-current-override,\n      var(--diffs-bg-addition)\n    );\n    --conflict-bg-incoming: var(\n      --conflict-bg-incoming-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-modified-base)),\n        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-modified-base))\n      )\n    );\n    --conflict-bg-current-number: var(\n      --conflict-bg-current-number-override,\n      var(--diffs-bg-addition-number)\n    );\n    --conflict-bg-incoming-number: var(\n      --conflict-bg-incoming-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 91%, var(--diffs-modified-base)),\n        color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-modified-base))\n      )\n    );\n    --conflict-bg-current-header: var(\n      --conflict-bg-current-header-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 78%, var(--diffs-addition-base)),\n        color-mix(in lab, var(--diffs-bg) 68%, var(--diffs-addition-base))\n      )\n    );\n    --conflict-bg-incoming-header: var(\n      --conflict-bg-incoming-header-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 78%, var(--diffs-modified-base)),\n        color-mix(in lab, var(--diffs-bg) 68%, var(--diffs-modified-base))\n      )\n    );\n    --conflict-bg-current-header-number: var(\n      --conflict-bg-current-header-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 72%, var(--diffs-addition-base)),\n        color-mix(in lab, var(--diffs-bg) 62%, var(--diffs-addition-base))\n      )\n    );\n    --conflict-bg-incoming-header-number: var(\n      --conflict-bg-incoming-header-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 72%, var(--diffs-modified-base)),\n        color-mix(in lab, var(--diffs-bg) 62%, var(--diffs-modified-base))\n      )\n    );\n\n    --diffs-bg-separator: var(\n      --diffs-bg-separator-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 96%, var(--diffs-mixer)),\n        color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-mixer))\n      )\n    );\n\n    --diffs-fg: light-dark(var(--diffs-light, #000), var(--diffs-dark, #fff));\n    --diffs-fg-number: var(\n      --diffs-fg-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg)),\n        color-mix(in lab, var(--diffs-fg) 65%, var(--diffs-bg))\n      )\n    );\n    --diffs-fg-conflict-marker: var(\n      --diffs-fg-conflict-marker-override,\n      var(--diffs-fg-number)\n    );\n\n    --diffs-deletion-base: var(\n      --diffs-deletion-color-override,\n      light-dark(\n        var(\n          --diffs-light-deletion-color,\n          var(--diffs-deletion-color, var(--diffs-deleted-light))\n        ),\n        var(\n          --diffs-dark-deletion-color,\n          var(--diffs-deletion-color, var(--diffs-deleted-dark))\n        )\n      )\n    );\n    --diffs-addition-base: var(\n      --diffs-addition-color-override,\n      light-dark(\n        var(\n          --diffs-light-addition-color,\n          var(--diffs-addition-color, var(--diffs-added-light))\n        ),\n        var(\n          --diffs-dark-addition-color,\n          var(--diffs-addition-color, var(--diffs-added-dark))\n        )\n      )\n    );\n    --diffs-modified-base: var(\n      --diffs-modified-color-override,\n      light-dark(\n        var(\n          --diffs-light-modified-color,\n          var(--diffs-modified-color, var(--diffs-modified-light))\n        ),\n        var(\n          --diffs-dark-modified-color,\n          var(--diffs-modified-color, var(--diffs-modified-dark))\n        )\n      )\n    );\n\n    /* NOTE(amadeus): we cannot use 'in oklch' because current versions of cursor\n   * and vscode use an older build of chrome that appears to have a bug with\n   * color-mix and 'in oklch', so use 'in lab' instead */\n    --diffs-bg-deletion: var(\n      --diffs-bg-deletion-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-deletion-base)),\n        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-deletion-base))\n      )\n    );\n    --diffs-bg-deletion-number: var(\n      --diffs-bg-deletion-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 91%, var(--diffs-deletion-base)),\n        color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-deletion-base))\n      )\n    );\n    --diffs-bg-deletion-hover: var(\n      --diffs-bg-deletion-hover-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-deletion-base)),\n        color-mix(in lab, var(--diffs-bg) 75%, var(--diffs-deletion-base))\n      )\n    );\n    --diffs-bg-deletion-emphasis: var(\n      --diffs-bg-deletion-emphasis-override,\n      light-dark(\n        rgb(from var(--diffs-deletion-base) r g b / 0.15),\n        rgb(from var(--diffs-deletion-base) r g b / 0.2)\n      )\n    );\n\n    --diffs-bg-addition: var(\n      --diffs-bg-addition-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 88%, var(--diffs-addition-base)),\n        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-addition-base))\n      )\n    );\n    --diffs-bg-addition-number: var(\n      --diffs-bg-addition-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 91%, var(--diffs-addition-base)),\n        color-mix(in lab, var(--diffs-bg) 85%, var(--diffs-addition-base))\n      )\n    );\n    --diffs-bg-addition-hover: var(\n      --diffs-bg-addition-hover-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 80%, var(--diffs-addition-base)),\n        color-mix(in lab, var(--diffs-bg) 70%, var(--diffs-addition-base))\n      )\n    );\n    --diffs-bg-addition-emphasis: var(\n      --diffs-bg-addition-emphasis-override,\n      light-dark(\n        rgb(from var(--diffs-addition-base) r g b / 0.15),\n        rgb(from var(--diffs-addition-base) r g b / 0.2)\n      )\n    );\n\n    --diffs-selection-base: var(--diffs-modified-base);\n    --diffs-selection-number-fg: light-dark(\n      color-mix(in lab, var(--diffs-selection-base) 65%, var(--diffs-mixer)),\n      color-mix(in lab, var(--diffs-selection-base) 75%, var(--diffs-mixer))\n    );\n    --diffs-bg-selection: var(\n      --diffs-bg-selection-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 82%, var(--diffs-selection-base)),\n        color-mix(in lab, var(--diffs-bg) 75%, var(--diffs-selection-base))\n      )\n    );\n    --diffs-bg-selection-number: var(\n      --diffs-bg-selection-number-override,\n      light-dark(\n        color-mix(in lab, var(--diffs-bg) 75%, var(--diffs-selection-base)),\n        color-mix(in lab, var(--diffs-bg) 60%, var(--diffs-selection-base))\n      )\n    );\n\n    background-color: var(--diffs-bg);\n    color: var(--diffs-fg);\n  }\n\n  /* NOTE(mdo): Some semantic HTML elements (e.g. `pre`, `code`) have default\n * user-agent styles. These must be overridden to use our custom styles. */\n  pre,\n  code,\n  [data-error-wrapper] {\n    isolation: isolate;\n    margin: 0;\n    padding: 0;\n    display: block;\n    outline: none;\n    font-family: var(--diffs-font-family, var(--diffs-font-fallback));\n  }\n\n  pre,\n  code {\n    background-color: var(--diffs-bg);\n  }\n\n  code {\n    contain: content;\n  }\n\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n\n  [data-icon-sprite] {\n    display: none;\n  }\n\n  /* NOTE(mdo): Headers and separators are within pre/code, so we need to reset\n   * their font-family explicitly. */\n  [data-diffs-header],\n  [data-separator] {\n    font-family: var(\n      --diffs-header-font-family,\n      var(--diffs-header-font-fallback)\n    );\n  }\n\n  [data-file-info] {\n    padding: 10px;\n    font-weight: 700;\n    color: var(--fg);\n    /* NOTE(amadeus): we cannot use 'in oklch' because current versions of cursor\n   * and vscode use an older build of chrome that appears to have a bug with\n   * color-mix and 'in oklch', so use 'in lab' instead */\n    background-color: color-mix(in lab, var(--bg) 98%, var(--fg));\n    border-block: 1px solid color-mix(in lab, var(--bg) 95%, var(--fg));\n  }\n\n  [data-diff],\n  [data-file] {\n    /* This feels a bit crazy to me... so I need to think about it a bit more... */\n    --diffs-grid-number-column-width: minmax(min-content, max-content);\n    --diffs-code-grid: var(--diffs-grid-number-column-width) 1fr;\n\n    &[data-dehydrated] {\n      --diffs-code-grid: var(--diffs-grid-number-column-width) minmax(0, 1fr);\n    }\n\n    &:hover [data-code]::-webkit-scrollbar-thumb {\n      background-color: var(--diffs-bg-context);\n    }\n  }\n\n  [data-line] span {\n    color: light-dark(\n      var(--diffs-token-light, var(--diffs-light)),\n      var(--diffs-token-dark, var(--diffs-dark))\n    );\n    background-color: light-dark(\n      var(--diffs-token-light-bg, inherit),\n      var(--diffs-token-dark-bg, inherit)\n    );\n    font-weight: light-dark(\n      var(--diffs-token-light-font-weight, inherit),\n      var(--diffs-token-dark-font-weight, inherit)\n    );\n    font-style: light-dark(\n      var(--diffs-token-light-font-style, inherit),\n      var(--diffs-token-dark-font-style, inherit)\n    );\n    -webkit-text-decoration: light-dark(\n      var(--diffs-token-light-text-decoration, inherit),\n      var(--diffs-token-dark-text-decoration, inherit)\n    );\n            text-decoration: light-dark(\n      var(--diffs-token-light-text-decoration, inherit),\n      var(--diffs-token-dark-text-decoration, inherit)\n    );\n  }\n\n  [data-line],\n  [data-gutter-buffer],\n  [data-line-annotation],\n  [data-no-newline] {\n    color: var(--diffs-fg);\n    background-color: var(--diffs-line-bg, var(--diffs-bg));\n  }\n\n  [data-no-newline] {\n    -webkit-user-select: none;\n            user-select: none;\n\n    span {\n      opacity: 0.6;\n    }\n  }\n\n  [data-diff-type='split'][data-overflow='scroll'] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n\n    [data-additions] {\n      border-left: 1px solid var(--diffs-bg);\n    }\n\n    [data-deletions] {\n      border-right: 1px solid var(--diffs-bg);\n    }\n  }\n\n  [data-code] {\n    display: grid;\n    grid-auto-flow: dense;\n    grid-template-columns: var(--diffs-code-grid);\n    overflow: scroll clip;\n    overscroll-behavior-x: none;\n    tab-size: var(--diffs-tab-size, 2);\n    align-self: flex-start;\n    padding-top: var(--diffs-gap-block, var(--diffs-gap-fallback));\n    padding-bottom: max(\n      0px,\n      calc(var(--diffs-gap-block, var(--diffs-gap-fallback)) - 6px)\n    );\n  }\n\n  [data-container-size] {\n    container-type: inline-size;\n  }\n\n  [data-code]::-webkit-scrollbar {\n    width: 0;\n    height: 6px;\n  }\n\n  [data-code]::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  [data-code]::-webkit-scrollbar-thumb {\n    background-color: transparent;\n    border: 1px solid transparent;\n    background-clip: content-box;\n    border-radius: 3px;\n  }\n\n  [data-code]::-webkit-scrollbar-corner {\n    background-color: transparent;\n  }\n\n  /*\n   * If we apply these rules globally it will mean that webkit will opt into the\n   * standards compliant version of custom css scrollbars, which we do not want\n   * because the custom stuff will look better\n  */\n  @supports (-moz-appearance: none) {\n    [data-code] {\n      scrollbar-width: thin;\n      scrollbar-color: var(--diffs-bg-context) transparent;\n      padding-bottom: var(--diffs-gap-block, var(--diffs-gap-fallback));\n    }\n  }\n\n  [data-diffs-header] ~ [data-diff],\n  [data-diffs-header] ~ [data-file] {\n    [data-code],\n    &[data-overflow='wrap'] {\n      padding-top: 0;\n    }\n  }\n\n  [data-gutter] {\n    display: grid;\n    grid-template-rows: subgrid;\n    grid-template-columns: subgrid;\n    grid-column: 1;\n    z-index: 3;\n    position: relative;\n    background-color: var(--diffs-bg);\n\n    [data-gutter-buffer],\n    [data-column-number] {\n      border-right: var(--diffs-gap-style, 2px solid var(--diffs-bg));\n    }\n  }\n\n  [data-content] {\n    display: grid;\n    grid-template-rows: subgrid;\n    grid-template-columns: subgrid;\n    grid-column: 2;\n    min-width: 0;\n  }\n\n  [data-diff-type='split'][data-overflow='wrap'] {\n    display: grid;\n    grid-auto-flow: dense;\n    grid-template-columns: repeat(2, var(--diffs-code-grid));\n    padding-block: var(--diffs-gap-block, var(--diffs-gap-fallback));\n\n    [data-deletions] {\n      display: contents;\n\n      [data-gutter] {\n        grid-column: 1;\n      }\n\n      [data-content] {\n        grid-column: 2;\n        border-right: 1px solid var(--diffs-bg);\n      }\n    }\n\n    [data-additions] {\n      display: contents;\n\n      [data-gutter] {\n        grid-column: 3;\n        border-left: 1px solid var(--diffs-bg);\n      }\n\n      [data-content] {\n        grid-column: 4;\n      }\n    }\n  }\n\n  [data-overflow='scroll'] [data-gutter] {\n    position: sticky;\n    left: 0;\n  }\n\n  [data-line-annotation][data-selected-line] {\n    background-color: unset;\n\n    &::before {\n      content: '';\n      /* FIXME(amadeus): This needs to be audited ... */\n      position: sticky;\n      top: 0;\n      left: 0;\n      display: block;\n      border-right: var(--diffs-gap-style, 1px solid var(--diffs-bg));\n      background-color: var(--diffs-bg-selection-number);\n    }\n\n    [data-annotation-content] {\n      background-color: var(--diffs-bg-selection);\n    }\n  }\n\n  [data-interactive-lines] [data-line] {\n    cursor: pointer;\n  }\n\n  [data-content-buffer],\n  [data-gutter-buffer] {\n    position: relative;\n    -webkit-user-select: none;\n            user-select: none;\n    min-height: 1lh;\n  }\n\n  [data-gutter-buffer='annotation'] {\n    min-height: 0;\n  }\n\n  [data-gutter-buffer='buffer'] {\n    background-size: 8px 8px;\n    background-position: 0 0;\n    background-origin: border-box;\n    background-color: var(--diffs-bg);\n    /* This is incredibley expensive... */\n    background-image: repeating-linear-gradient(\n      -45deg,\n      transparent,\n      transparent calc(3px * 1.414),\n      rgb(from var(--diffs-bg-buffer) r g b / 0.8) calc(3px * 1.414),\n      rgb(from var(--diffs-bg-buffer) r g b / 0.8) calc(4px * 1.414)\n    );\n  }\n\n  [data-content-buffer] {\n    grid-column: 1;\n    /* We multiply by 1.414 (√2) to better approximate the diagonal repeat distance */\n    background-size: 8px 8px;\n    background-position: 5px 0;\n    background-origin: border-box;\n    background-color: var(--diffs-bg);\n    /* This is incredibley expensive... */\n    background-image: repeating-linear-gradient(\n      -45deg,\n      transparent,\n      transparent calc(3px * 1.414),\n      var(--diffs-bg-buffer) calc(3px * 1.414),\n      var(--diffs-bg-buffer) calc(4px * 1.414)\n    );\n  }\n\n  [data-separator] {\n    box-sizing: content-box;\n    background-color: var(--diffs-bg);\n  }\n\n  [data-separator='simple'] {\n    min-height: 4px;\n  }\n\n  [data-separator='line-info'],\n  [data-separator='line-info-basic'],\n  [data-separator='metadata'],\n  [data-separator='simple'] {\n    background-color: var(--diffs-bg-separator);\n  }\n\n  [data-separator='line-info'],\n  [data-separator='line-info-basic'],\n  [data-separator='metadata'] {\n    height: 32px;\n    position: relative;\n  }\n\n  [data-separator-wrapper] {\n    -webkit-user-select: none;\n            user-select: none;\n    fill: currentColor;\n    position: absolute;\n    inset-inline: 0;\n    display: flex;\n    align-items: center;\n    background-color: var(--diffs-bg);\n    height: 100%;\n  }\n\n  [data-content] [data-separator-wrapper] {\n    display: none;\n  }\n\n  [data-separator='metadata'] [data-separator-wrapper] {\n    inset-inline: 100% auto;\n    padding-inline: 1ch;\n    height: 100%;\n    background-color: var(--diffs-bg-separator);\n    color: var(--diffs-fg-number);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    min-width: min-content;\n  }\n\n  [data-separator='line-info'] {\n    margin-block: var(--diffs-gap-block, var(--diffs-gap-fallback));\n  }\n\n  [data-separator='line-info-basic'],\n  [data-separator='metadata'] {\n    margin-block: 0;\n  }\n\n  [data-separator='line-info'][data-separator-first] {\n    margin-top: 0;\n  }\n\n  [data-separator='line-info'][data-separator-last] {\n    margin-bottom: 0;\n  }\n\n  [data-expand-index] [data-separator-wrapper] {\n    display: grid;\n    grid-template-columns: 32px auto;\n  }\n\n  [data-expand-index] [data-separator-wrapper][data-separator-multi-button] {\n    grid-template-columns: 32px 32px auto;\n  }\n\n  [data-expand-button],\n  [data-separator-content] {\n    display: flex;\n    flex: 0 0 auto;\n    align-items: center;\n    background-color: var(--diffs-bg-separator);\n  }\n\n  [data-expand-button] {\n    justify-content: center;\n    flex-shrink: 0;\n    cursor: pointer;\n    min-width: 32px;\n    align-self: stretch;\n    color: var(--diffs-fg-number);\n    border-right: 2px solid var(--diffs-bg);\n\n    &:hover {\n      color: var(--diffs-fg);\n    }\n  }\n\n  [data-expand-down] [data-icon] {\n    transform: scaleY(-1);\n  }\n\n  [data-separator-content] {\n    flex: 1 1 auto;\n    padding: 0 1ch;\n    height: 100%;\n    color: var(--diffs-fg-number);\n\n    overflow: hidden;\n    justify-content: flex-start;\n  }\n\n  [data-separator='line-info'],\n  [data-separator='line-info-basic'] {\n    [data-separator-content] {\n      height: 100%;\n      -webkit-user-select: none;\n              user-select: none;\n      overflow: clip;\n    }\n  }\n\n  @supports (width: 1cqi) {\n    [data-unified] {\n      [data-separator='line-info'] [data-separator-wrapper] {\n        padding-inline: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n        width: 100cqi;\n\n        [data-separator-content] {\n          border-radius: 6px;\n        }\n      }\n\n      [data-separator='line-info'][data-expand-index]\n        [data-separator-wrapper]\n        [data-separator-content] {\n        border-top-left-radius: unset;\n        border-bottom-left-radius: unset;\n      }\n    }\n\n    [data-gutter] {\n      [data-separator='line-info'] [data-separator-wrapper] {\n        padding-left: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n      }\n\n      [data-separator='line-info'] [data-separator-content] {\n        border-top-left-radius: 6px;\n        border-bottom-left-radius: 6px;\n      }\n\n      [data-separator='line-info'][data-expand-index] [data-separator-content] {\n        border-top-left-radius: unset;\n        border-bottom-left-radius: unset;\n      }\n    }\n\n    [data-additions] {\n      [data-content] [data-separator='line-info'] {\n        background-color: var(--diffs-bg);\n\n        [data-separator-wrapper] {\n          display: none;\n        }\n      }\n\n      [data-gutter] [data-separator='line-info'] [data-separator-wrapper] {\n        display: block;\n        height: 100%;\n        background-color: var(--diffs-bg-separator);\n        border-top-right-radius: 6px;\n        border-bottom-right-radius: 6px;\n\n        [data-separator-content],\n        [data-expand-button] {\n          display: none;\n        }\n      }\n    }\n\n    [data-overflow='scroll']\n      [data-additions]\n      [data-gutter]\n      [data-separator='line-info']\n      [data-separator-wrapper] {\n      width: calc(100cqi - var(--diffs-gap-inline, var(--diffs-gap-fallback)));\n    }\n\n    [data-overflow='wrap']\n      [data-additions]\n      [data-content]\n      [data-separator='line-info']\n      [data-separator-wrapper] {\n      background-color: var(--diffs-bg-separator);\n      display: block;\n      height: 100%;\n      margin-right: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n      border-top-right-radius: 6px;\n      border-bottom-right-radius: 6px;\n\n      [data-separator-content],\n      [data-expand-button] {\n        display: none;\n      }\n    }\n\n    [data-separator='line-info'] [data-separator-wrapper] {\n      [data-expand-both],\n      [data-expand-down],\n      [data-expand-up] {\n        border-top-left-radius: 6px;\n        border-bottom-left-radius: 6px;\n      }\n    }\n\n    @media (pointer: fine) {\n      [data-separator='line-info'] [data-separator-wrapper] {\n        &[data-separator-multi-button] {\n          [data-expand-up] {\n            border-top-left-radius: 6px;\n            border-bottom-left-radius: unset;\n          }\n\n          [data-expand-down] {\n            border-bottom-left-radius: 6px;\n            border-top-left-radius: unset;\n          }\n        }\n      }\n    }\n  }\n\n  @media (pointer: coarse) {\n    [data-separator='line-info-basic']\n      [data-separator-wrapper][data-separator-multi-button] {\n      grid-template-columns: 34px 34px auto;\n\n      [data-separator-content] {\n        grid-column: unset;\n        grid-row: unset;\n      }\n    }\n\n    @supports (width: 1cqi) {\n      [data-separator='line-info'] [data-separator-wrapper] {\n        [data-expand-both],\n        [data-expand-down],\n        [data-expand-up] {\n          border-top-left-radius: 6px;\n          border-bottom-left-radius: 6px;\n        }\n\n        &[data-separator-multi-button] {\n          [data-expand-up] {\n            border-top-left-radius: 6px;\n            border-bottom-left-radius: 6px;\n          }\n\n          [data-expand-down] {\n            border-bottom-left-radius: unset;\n            border-top-left-radius: unset;\n          }\n        }\n      }\n    }\n  }\n\n  @media (pointer: fine) {\n    [data-separator-wrapper][data-separator-multi-button] {\n      display: grid;\n      grid-template-rows: 50% 50%;\n\n      [data-separator-content] {\n        grid-column: 2;\n        grid-row: 1 / -1;\n        min-width: min-content;\n      }\n\n      [data-expand-button] {\n        grid-column: 1;\n      }\n    }\n\n    [data-separator='line-info'] [data-separator-wrapper],\n    [data-separator='line-info']\n      [data-separator-wrapper][data-separator-multi-button] {\n      grid-template-columns: 34px auto;\n    }\n\n    [data-separator='line-info-basic'][data-expand-index]\n      [data-separator-wrapper] {\n      grid-template-columns: 100% auto;\n    }\n\n    [data-separator='line-info'],\n    [data-separator='line-info-basic'] {\n      [data-separator-multi-button] {\n        [data-expand-up] {\n          border-bottom: 1px solid var(--diffs-bg);\n          border-right: 2px solid var(--diffs-bg);\n        }\n        [data-expand-down] {\n          border-top: 1px solid var(--diffs-bg);\n          border-right: 2px solid var(--diffs-bg);\n        }\n      }\n    }\n  }\n\n  [data-additions] [data-gutter] [data-separator-wrapper],\n  [data-additions] [data-separator='line-info-basic'] [data-separator-wrapper],\n  [data-content] [data-separator-wrapper] {\n    display: none;\n  }\n\n  [data-line-annotation],\n  [data-gutter-buffer='annotation'] {\n    --diffs-line-bg: var(--diffs-bg-context);\n  }\n\n  [data-merge-conflict-actions],\n  [data-gutter-buffer='merge-conflict-action'] {\n    --diffs-line-bg: var(--diffs-bg-context);\n  }\n\n  [data-has-merge-conflict] [data-line-annotation],\n  [data-has-merge-conflict] [data-gutter-buffer='annotation'] {\n    --diffs-line-bg: var(--diffs-bg);\n  }\n\n  [data-has-merge-conflict] [data-gutter-buffer='merge-conflict-action'] {\n    --diffs-line-bg: var(--diffs-bg);\n  }\n\n  [data-line-annotation] {\n    min-height: var(--diffs-annotation-min-height, 0);\n    z-index: 2;\n  }\n\n  [data-merge-conflict-actions] {\n    z-index: 2;\n  }\n\n  [data-separator='custom'] {\n    display: grid;\n    grid-template-columns: subgrid;\n  }\n\n  [data-line],\n  [data-column-number],\n  [data-no-newline] {\n    position: relative;\n    padding-inline: 1ch;\n  }\n\n  [data-indicators='classic'] [data-line] {\n    padding-inline-start: 2ch;\n  }\n\n  [data-indicators='classic'] {\n    [data-line-type='change-addition'],\n    [data-line-type='change-deletion'] {\n      &[data-no-newline],\n      &[data-line] {\n        &::before {\n          display: inline-block;\n          width: 1ch;\n          height: 1lh;\n          position: absolute;\n          top: 0;\n          left: 0;\n          -webkit-user-select: none;\n                  user-select: none;\n        }\n      }\n    }\n\n    [data-line-type='change-addition'] {\n      &[data-line],\n      &[data-no-newline] {\n        &::before {\n          content: '+';\n          color: var(--diffs-addition-base);\n        }\n      }\n    }\n\n    [data-line-type='change-deletion'] {\n      &[data-line],\n      &[data-no-newline] {\n        &::before {\n          content: '-';\n          color: var(--diffs-deletion-base);\n        }\n      }\n    }\n  }\n\n  [data-indicators='bars'] {\n    [data-line-type='change-deletion'],\n    [data-line-type='change-addition'] {\n      &[data-column-number] {\n        &::before {\n          content: '';\n          display: block;\n          width: 4px;\n          height: 100%;\n          position: absolute;\n          top: 0;\n          left: 0;\n          -webkit-user-select: none;\n                  user-select: none;\n          contain: strict;\n        }\n      }\n    }\n\n    [data-line-type='change-deletion'] {\n      &[data-column-number] {\n        &::before {\n          background-image: linear-gradient(\n            0deg,\n            var(--diffs-bg-deletion) 50%,\n            var(--diffs-deletion-base) 50%\n          );\n          background-repeat: repeat;\n          background-size: 2px 2px;\n          background-size: calc(1lh / round(1lh / 2px))\n            calc(1lh / round(1lh / 2px));\n        }\n      }\n    }\n\n    [data-line-type='change-addition'] {\n      &[data-column-number] {\n        &::before {\n          background-color: var(--diffs-addition-base);\n        }\n      }\n    }\n  }\n\n  [data-overflow='wrap'] {\n    [data-line],\n    [data-annotation-content] {\n      white-space: pre-wrap;\n      word-break: break-word;\n    }\n  }\n\n  [data-overflow='scroll'] [data-line] {\n    white-space: pre;\n    min-height: 1lh;\n  }\n\n  [data-column-number] {\n    box-sizing: content-box;\n    text-align: right;\n    -webkit-user-select: none;\n            user-select: none;\n    background-color: var(--diffs-bg);\n    color: var(--diffs-fg-number);\n    padding-left: 2ch;\n  }\n\n  [data-line-number-content] {\n    display: inline-block;\n    min-width: var(\n      --diffs-min-number-column-width,\n      var(--diffs-min-number-column-width-default, 3ch)\n    );\n  }\n\n  [data-disable-line-numbers] {\n    [data-column-number] {\n      min-width: 4px;\n      padding: 0;\n    }\n\n    [data-line-number-content] {\n      display: none;\n    }\n\n    [data-gutter-utility-slot] {\n      right: unset;\n      left: 0;\n      justify-content: flex-start;\n    }\n\n    &[data-indicators='bars'] [data-gutter-utility-slot] {\n      /* Using 5px here because theres a 1px separator after the bar */\n      left: 5px;\n    }\n  }\n\n  [data-file][data-disable-line-numbers] {\n    [data-gutter-buffer],\n    [data-column-number] {\n      min-width: 0;\n      border-right: 0;\n    }\n  }\n\n  [data-interactive-line-numbers] [data-column-number] {\n    cursor: pointer;\n  }\n\n  [data-diff-span] {\n    border-radius: 3px;\n    -webkit-box-decoration-break: clone;\n            box-decoration-break: clone;\n  }\n\n  [data-line-type='change-addition'] {\n    &[data-column-number] {\n      color: var(\n        --diffs-fg-number-addition-override,\n        var(--diffs-addition-base)\n      );\n    }\n\n    > [data-diff-span] {\n      background-color: var(--diffs-bg-addition-emphasis);\n    }\n  }\n\n  [data-line-type='change-deletion'] {\n    &[data-column-number] {\n      color: var(\n        --diffs-fg-number-deletion-override,\n        var(--diffs-deletion-base)\n      );\n    }\n\n    [data-diff-span] {\n      background-color: var(--diffs-bg-deletion-emphasis);\n    }\n  }\n\n  [data-background] [data-line-type='change-addition'] {\n    --diffs-line-bg: var(--diffs-bg-addition);\n\n    &[data-column-number] {\n      background-color: var(--diffs-bg-addition-number);\n    }\n  }\n\n  [data-background] [data-line-type='change-deletion'] {\n    --diffs-line-bg: var(--diffs-bg-deletion);\n\n    &[data-column-number] {\n      background-color: var(--diffs-bg-deletion-number);\n    }\n  }\n\n  [data-merge-conflict='marker-start'],\n  [data-merge-conflict='marker-base'],\n  [data-merge-conflict='marker-separator'],\n  [data-merge-conflict='marker-end'] {\n    padding-left: 1ch;\n    color: var(--diffs-fg);\n  }\n\n  [data-merge-conflict='marker-start'],\n  [data-merge-conflict='marker-end'] {\n    display: flex;\n    align-items: center;\n\n    &::after {\n      color: var(--diffs-fg-conflict-marker);\n      font-style: normal;\n      font-size: 0.75rem;\n      line-height: 1.25rem;\n      padding-left: 1ch;\n      font-family: var(\n        --diffs-header-font-family,\n        var(--diffs-header-font-fallback)\n      );\n    }\n  }\n\n  [data-merge-conflict='marker-start']::after {\n    content: '(Current Change)';\n  }\n\n  [data-merge-conflict='marker-end']::after {\n    content: '(Incoming Change)';\n  }\n\n  [data-merge-conflict='marker-base'],\n  [data-merge-conflict='marker-end'] {\n    &[data-line],\n    &[data-no-newline] {\n      background-color: var(--diffs-bg-conflict-marker);\n    }\n\n    &[data-column-number] {\n      background-color: var(--diffs-bg-conflict-marker-number);\n      color: var(--diffs-fg-conflict-marker);\n\n      [data-line-number-content] {\n        color: var(--diffs-fg-conflict-marker);\n      }\n    }\n  }\n\n  [data-merge-conflict='current'] {\n    &[data-line],\n    &[data-no-newline] {\n      background-color: var(--conflict-bg-current);\n    }\n\n    &[data-column-number] {\n      background-color: var(--conflict-bg-current-number);\n      color: var(--diffs-addition-base);\n    }\n  }\n\n  [data-gutter-buffer='merge-conflict-marker-start'],\n  [data-merge-conflict='marker-start'] {\n    background-color: var(--conflict-bg-current-header);\n  }\n\n  [data-gutter-buffer='merge-conflict-marker-end'],\n  [data-merge-conflict='marker-end'] {\n    background-color: var(--conflict-bg-incoming-header);\n  }\n\n  [data-merge-conflict='marker-separator'] {\n    &[data-line],\n    &[data-no-newline] {\n      background-color: var(--diffs-bg);\n    }\n\n    &[data-column-number] {\n      background-color: var(--diffs-bg);\n    }\n  }\n\n  [data-merge-conflict='base'] {\n    &[data-line],\n    &[data-no-newline] {\n      background-color: var(--diffs-bg-conflict-base);\n    }\n\n    &[data-column-number] {\n      background-color: var(--diffs-bg-conflict-base-number);\n      color: var(--diffs-modified-base);\n    }\n  }\n\n  [data-merge-conflict='incoming'] {\n    &[data-line],\n    &[data-no-newline] {\n      background-color: var(--conflict-bg-incoming);\n    }\n\n    &[data-column-number] {\n      background-color: var(--conflict-bg-incoming-number);\n      color: var(--diffs-modified-base);\n    }\n  }\n\n  @media (pointer: fine) {\n    [data-column-number],\n    [data-line] {\n      &[data-hovered] {\n        background-color: var(--diffs-bg-hover);\n      }\n    }\n\n    [data-background] {\n      [data-column-number],\n      [data-line] {\n        &[data-hovered] {\n          &[data-line-type='change-deletion'] {\n            background-color: var(--diffs-bg-deletion-hover);\n          }\n\n          &[data-line-type='change-addition'] {\n            background-color: var(--diffs-bg-addition-hover);\n          }\n        }\n      }\n    }\n  }\n\n  [data-diffs-header='default'] {\n    position: relative;\n    background-color: var(--diffs-bg);\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    gap: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n    min-height: calc(\n      1lh + (var(--diffs-gap-block, var(--diffs-gap-fallback)) * 3)\n    );\n    padding-inline: 16px;\n    top: 0;\n    z-index: 2;\n  }\n\n  [data-header-content] {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: var(--diffs-gap-inline, var(--diffs-gap-fallback));\n    min-width: 0;\n    white-space: nowrap;\n  }\n\n  [data-header-content] [data-prev-name],\n  [data-header-content] [data-title] {\n    direction: rtl;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    min-width: 0;\n    white-space: nowrap;\n  }\n\n  [data-prev-name] {\n    opacity: 0.7;\n  }\n\n  [data-rename-icon] {\n    fill: currentColor;\n    flex-shrink: 0;\n    flex-grow: 0;\n  }\n\n  [data-diffs-header='default'] [data-metadata] {\n    display: flex;\n    align-items: center;\n    gap: 1ch;\n    white-space: nowrap;\n  }\n\n  [data-diffs-header='default'] [data-additions-count] {\n    font-family: var(--diffs-font-family, var(--diffs-font-fallback));\n    color: var(--diffs-addition-base);\n  }\n\n  [data-diffs-header='default'] [data-deletions-count] {\n    font-family: var(--diffs-font-family, var(--diffs-font-fallback));\n    color: var(--diffs-deletion-base);\n  }\n\n  [data-annotation-content] {\n    position: relative;\n    display: flow-root;\n    align-self: flex-start;\n    z-index: 2;\n    min-width: 0;\n    isolation: isolate;\n  }\n\n  [data-merge-conflict-actions-content] {\n    display: flex;\n    align-items: center;\n    gap: 0.25rem;\n    padding-inline: 0.5rem;\n    min-height: 1.75rem;\n    font-family: var(\n      --diffs-header-font-family,\n      var(--diffs-header-font-fallback)\n    );\n    font-size: 0.75rem;\n    line-height: 1.2;\n    color: var(--diffs-fg);\n  }\n\n  [data-merge-conflict-action] {\n    appearance: none;\n    border: 0;\n    background: transparent;\n    color: var(--diffs-fg-number);\n    font: inherit;\n    font-style: normal;\n    cursor: pointer;\n    padding: 0;\n  }\n\n  [data-merge-conflict-action]:hover {\n    color: var(--diffs-fg);\n  }\n\n  [data-merge-conflict-action='current']:hover {\n    color: var(--diffs-addition-base);\n  }\n\n  [data-merge-conflict-action='incoming']:hover {\n    color: var(--diffs-modified-base);\n  }\n\n  [data-merge-conflict-action-separator] {\n    color: var(--diffs-fg-number);\n    opacity: 0.6;\n    -webkit-user-select: none;\n            user-select: none;\n  }\n\n  /* Sticky positioning has a composite costs, so we should _only_ pay it if we\n   * need to */\n  [data-overflow='scroll'] [data-annotation-content] {\n    position: sticky;\n    width: var(--diffs-column-content-width, auto);\n    left: var(--diffs-column-number-width, 0);\n  }\n\n  [data-overflow='scroll'] [data-merge-conflict-actions-content] {\n    position: sticky;\n    width: var(--diffs-column-content-width, auto);\n    left: var(--diffs-column-number-width, 0);\n  }\n\n  /* Undo some of the stuff that the 'pre' tag does */\n  [data-annotation-slot] {\n    text-wrap-mode: wrap;\n    word-break: normal;\n    white-space-collapse: collapse;\n  }\n\n  [data-change-icon] {\n    fill: currentColor;\n    flex-shrink: 0;\n  }\n\n  [data-change-icon='change'],\n  [data-change-icon='rename-pure'],\n  [data-change-icon='rename-changed'] {\n    color: var(--diffs-modified-base);\n  }\n\n  [data-change-icon='new'] {\n    color: var(--diffs-addition-base);\n  }\n\n  [data-change-icon='deleted'] {\n    color: var(--diffs-deletion-base);\n  }\n\n  [data-change-icon='file'] {\n    opacity: 0.6;\n  }\n\n  /* Line selection highlighting */\n  [data-selected-line] {\n    &[data-gutter-buffer='annotation'],\n    &[data-column-number] {\n      color: var(--diffs-selection-number-fg);\n      background-color: var(--diffs-bg-selection-number);\n    }\n\n    &[data-line] {\n      background-color: var(--diffs-bg-selection);\n    }\n  }\n\n  [data-line-type='change-addition'],\n  [data-line-type='change-deletion'] {\n    &[data-selected-line] {\n      &[data-line],\n      &[data-line][data-hovered] {\n        background-color: light-dark(\n          color-mix(\n            in lab,\n            var(--diffs-line-bg, var(--diffs-bg)) 82%,\n            var(--diffs-selection-base)\n          ),\n          color-mix(\n            in lab,\n            var(--diffs-line-bg, var(--diffs-bg)) 75%,\n            var(--diffs-selection-base)\n          )\n        );\n      }\n\n      &[data-column-number],\n      &[data-column-number][data-hovered] {\n        color: var(--diffs-selection-number-fg);\n        background-color: light-dark(\n          color-mix(\n            in lab,\n            var(--diffs-line-bg, var(--diffs-bg)) 75%,\n            var(--diffs-selection-base)\n          ),\n          color-mix(\n            in lab,\n            var(--diffs-line-bg, var(--diffs-bg)) 60%,\n            var(--diffs-selection-base)\n          )\n        );\n      }\n    }\n  }\n\n  [data-gutter-utility-slot] {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    display: flex;\n    justify-content: flex-end;\n  }\n\n  [data-unmodified-lines] {\n    display: block;\n    overflow: hidden;\n    min-width: 0;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    flex: 0 1 auto;\n  }\n\n  [data-error-wrapper] {\n    overflow: auto;\n    padding: var(--diffs-gap-block, var(--diffs-gap-fallback))\n      var(--diffs-gap-inline, var(--diffs-gap-fallback));\n    max-height: 400px;\n    scrollbar-width: none;\n\n    [data-error-message] {\n      font-weight: bold;\n      font-size: 18px;\n      color: var(--diffs-deletion-base);\n    }\n\n    [data-error-stack] {\n      color: var(--diffs-fg-number);\n    }\n  }\n\n  [data-placeholder] {\n    contain: strict;\n  }\n\n  [data-utility-button] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: none;\n    appearance: none;\n    width: 1lh;\n    height: 1lh;\n    margin-right: calc((1lh - 1ch) * -1);\n    padding: 0;\n    cursor: pointer;\n    font-size: var(--diffs-font-size, 13px);\n    line-height: var(--diffs-line-height, 20px);\n    border-radius: 4px;\n    background-color: var(--diffs-modified-base);\n    color: var(--diffs-bg);\n    fill: currentColor;\n    position: relative;\n    z-index: 4;\n  }\n}\n";
var LAYER_ORDER = `@layer base, theme, rendered, unsafe;`;
function wrapUnsafeCSS(unsafeCSS) {
	return `${LAYER_ORDER}
@layer unsafe {
  ${unsafeCSS}
}`;
}
function wrapThemeCSS(themeCSS, themeType = "system") {
	return `${LAYER_ORDER}
@layer rendered {
  :host {${themeType === "system" ? "" : `
  color-scheme: ${themeType};`}
  ${themeCSS}
  }
}`;
}
function getOrCreateCodeNode({ code, pre, columnType, rowSpan, containerSize = false } = {}) {
	if (code == null) {
		code = document.createElement("code");
		code.setAttribute("data-code", "");
		if (columnType != null) code.setAttribute(`data-${columnType}`, "");
		pre?.appendChild(code);
	}
	if (rowSpan != null) code.style.setProperty("grid-row", `span ${rowSpan}`);
	else code.style.removeProperty("grid-row");
	if (containerSize) code.setAttribute("data-container-size", "");
	else code.removeAttribute("data-container-size");
	return code;
}
function prerenderHTMLIfNecessary(element, html) {
	if (html == null) return;
	const shadowRoot = element.shadowRoot ?? element.attachShadow({ mode: "open" });
	if (shadowRoot.innerHTML === "") shadowRoot.innerHTML = html;
}
function setPreNodeProperties(pre, { type, diffIndicators, disableBackground, disableLineNumbers, overflow, split, totalLines, customProperties }) {
	if (customProperties != null) for (const key in customProperties) {
		const value = customProperties[key];
		if (value != null) pre.setAttribute(key, `${value}`);
	}
	if (type === "diff") {
		pre.setAttribute("data-diff", "");
		pre.removeAttribute("data-file");
	} else {
		pre.setAttribute("data-file", "");
		pre.removeAttribute("data-diff");
	}
	switch (diffIndicators) {
		case "bars":
		case "classic":
			pre.setAttribute("data-indicators", diffIndicators);
			break;
		case "none":
			pre.removeAttribute("data-indicators");
			break;
	}
	if (disableLineNumbers) pre.setAttribute("data-disable-line-numbers", "");
	else pre.removeAttribute("data-disable-line-numbers");
	if (disableBackground) pre.removeAttribute("data-background");
	else pre.setAttribute("data-background", "");
	if (type === "diff") pre.setAttribute("data-diff-type", split ? "split" : "single");
	else pre.removeAttribute("data-diff-type");
	pre.setAttribute("data-overflow", overflow);
	pre.tabIndex = 0;
	pre.style.setProperty("--diffs-min-number-column-width-default", `${`${totalLines}`.length}ch`);
	return pre;
}
function upsertHostThemeStyle({ shadowRoot, currentNode, themeCSS }) {
	if (themeCSS.trim() === "") {
		currentNode?.remove();
		return;
	}
	currentNode ??= createHostThemeStyleNode();
	currentNode.textContent = themeCSS;
	if (currentNode.parentNode !== shadowRoot) shadowRoot.appendChild(currentNode);
	return currentNode;
}
function createHostThemeStyleNode() {
	const node = document.createElement("style");
	node.setAttribute(THEME_CSS_ATTRIBUTE, "");
	return node;
}
if (typeof HTMLElement !== "undefined" && customElements.get("diffs-container") == null) {
	let sheet;
	class FileDiffContainer extends HTMLElement {
		constructor() {
			super();
			if (this.shadowRoot != null) return;
			const shadowRoot = this.attachShadow({ mode: "open" });
			if (sheet == null) {
				sheet = new CSSStyleSheet();
				sheet.replaceSync(style_default);
			}
			shadowRoot.adoptedStyleSheets = [sheet];
		}
	}
	customElements.define(DIFFS_TAG_NAME, FileDiffContainer);
}
var ScrollSyncManager = class {
	isDeletionsScrolling = false;
	isAdditionsScrolling = false;
	timeoutId = -1;
	codeDeletions;
	codeAdditions;
	enabled = false;
	cleanUp() {
		if (!this.enabled) return;
		this.codeDeletions?.removeEventListener("scroll", this.handleDeletionsScroll);
		this.codeAdditions?.removeEventListener("scroll", this.handleAdditionsScroll);
		clearTimeout(this.timeoutId);
		this.codeDeletions = void 0;
		this.codeAdditions = void 0;
		this.enabled = false;
	}
	setup(pre, codeDeletions, codeAdditions) {
		if (codeDeletions == null || codeAdditions == null) for (const element of pre.children ?? []) {
			if (!(element instanceof HTMLElement)) continue;
			if ("deletions" in element.dataset) codeDeletions = element;
			else if ("additions" in element.dataset) codeAdditions = element;
		}
		if (codeAdditions == null || codeDeletions == null) {
			this.cleanUp();
			return;
		}
		if (this.codeDeletions !== codeDeletions) {
			this.codeDeletions?.removeEventListener("scroll", this.handleDeletionsScroll);
			this.codeDeletions = codeDeletions;
			codeDeletions.addEventListener("scroll", this.handleDeletionsScroll, { passive: true });
		}
		if (this.codeAdditions !== codeAdditions) {
			this.codeAdditions?.removeEventListener("scroll", this.handleAdditionsScroll);
			this.codeAdditions = codeAdditions;
			codeAdditions.addEventListener("scroll", this.handleAdditionsScroll, { passive: true });
		}
		this.enabled = true;
	}
	handleDeletionsScroll = () => {
		if (this.isAdditionsScrolling) return;
		this.isDeletionsScrolling = true;
		clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(() => {
			this.isDeletionsScrolling = false;
		}, 300);
		this.codeAdditions?.scrollTo({ left: this.codeDeletions?.scrollLeft });
	};
	handleAdditionsScroll = () => {
		if (this.isDeletionsScrolling) return;
		this.isAdditionsScrolling = true;
		clearTimeout(this.timeoutId);
		this.timeoutId = setTimeout(() => {
			this.isAdditionsScrolling = false;
		}, 300);
		this.codeDeletions?.scrollTo({ left: this.codeAdditions?.scrollLeft });
	};
};
function createEmptyRowBuffer(size) {
	return createHastElement({
		tagName: "div",
		properties: {
			"data-content-buffer": "",
			"data-buffer-size": size,
			style: `grid-row: span ${size};min-height:calc(${size} * 1lh)`
		}
	});
}
function createNoNewlineElement(type) {
	return createHastElement({
		tagName: "div",
		children: [createHastElement({
			tagName: "span",
			children: [createTextNodeElement("No newline at end of file")]
		})],
		properties: {
			"data-no-newline": "",
			"data-line-type": type,
			"data-column-content": ""
		}
	});
}
function createExpandButton(type) {
	return createHastElement({
		tagName: "div",
		children: [createIconElement({
			name: type === "both" ? "diffs-icon-expand-all" : "diffs-icon-expand",
			properties: { "data-icon": "" }
		})],
		properties: {
			"data-expand-button": "",
			"data-expand-both": type === "both" ? "" : void 0,
			"data-expand-up": type === "up" ? "" : void 0,
			"data-expand-down": type === "down" ? "" : void 0
		}
	});
}
function createSeparator({ type, content, expandIndex, chunked = false, slotName, isFirstHunk, isLastHunk }) {
	const children = [];
	if (type === "metadata" && content != null) children.push(createHastElement({
		tagName: "div",
		children: [createTextNodeElement(content)],
		properties: { "data-separator-wrapper": "" }
	}));
	if ((type === "line-info" || type === "line-info-basic") && content != null) {
		const contentChildren = [];
		if (expandIndex != null) if (!chunked) contentChildren.push(createExpandButton(!isFirstHunk && !isLastHunk ? "both" : isFirstHunk ? "down" : "up"));
		else {
			if (!isFirstHunk) contentChildren.push(createExpandButton("up"));
			if (!isLastHunk) contentChildren.push(createExpandButton("down"));
		}
		contentChildren.push(createHastElement({
			tagName: "div",
			children: [createHastElement({
				tagName: "span",
				children: [createTextNodeElement(content)],
				properties: { "data-unmodified-lines": "" }
			})],
			properties: { "data-separator-content": "" }
		}));
		children.push(createHastElement({
			tagName: "div",
			children: contentChildren,
			properties: {
				"data-separator-wrapper": "",
				"data-separator-multi-button": contentChildren.length > 2 ? "" : void 0
			}
		}));
	}
	if (type === "custom" && slotName != null) children.push(createHastElement({
		tagName: "slot",
		properties: { name: slotName }
	}));
	return createHastElement({
		tagName: "div",
		children,
		properties: {
			"data-separator": children.length === 0 ? "simple" : type,
			"data-expand-index": expandIndex,
			"data-separator-first": isFirstHunk ? "" : void 0,
			"data-separator-last": isLastHunk ? "" : void 0
		}
	});
}
function getHunkSeparatorSlotName(type, hunkIndex) {
	return `hunk-separator-${type}-${hunkIndex}`;
}
function getTotalLineCountFromHunks(hunks) {
	const lastHunk = hunks.at(-1);
	if (lastHunk == null) return 0;
	return Math.max(lastHunk.additionStart + lastHunk.additionCount, lastHunk.deletionStart + lastHunk.deletionCount);
}
function isDefaultRenderRange(renderRange) {
	return renderRange.startingLine === 0 && renderRange.totalLines === Infinity && renderRange.bufferBefore === 0 && renderRange.bufferAfter === 0;
}
var Diff = class {
	diff(oldStr, newStr, options = {}) {
		let callback;
		if (typeof options === "function") {
			callback = options;
			options = {};
		} else if ("callback" in options) callback = options.callback;
		const oldString = this.castInput(oldStr, options);
		const newString = this.castInput(newStr, options);
		const oldTokens = this.removeEmpty(this.tokenize(oldString, options));
		const newTokens = this.removeEmpty(this.tokenize(newString, options));
		return this.diffWithOptionsObj(oldTokens, newTokens, options, callback);
	}
	diffWithOptionsObj(oldTokens, newTokens, options, callback) {
		var _a;
		const done = (value) => {
			value = this.postProcess(value, options);
			if (callback) {
				setTimeout(function() {
					callback(value);
				}, 0);
				return;
			} else return value;
		};
		const newLen = newTokens.length, oldLen = oldTokens.length;
		let editLength = 1;
		let maxEditLength = newLen + oldLen;
		if (options.maxEditLength != null) maxEditLength = Math.min(maxEditLength, options.maxEditLength);
		const maxExecutionTime = (_a = options.timeout) !== null && _a !== void 0 ? _a : Infinity;
		const abortAfterTimestamp = Date.now() + maxExecutionTime;
		const bestPath = [{
			oldPos: -1,
			lastComponent: void 0
		}];
		let newPos = this.extractCommon(bestPath[0], newTokens, oldTokens, 0, options);
		if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) return done(this.buildValues(bestPath[0].lastComponent, newTokens, oldTokens));
		let minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;
		const execEditLength = () => {
			for (let diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
				let basePath;
				const removePath = bestPath[diagonalPath - 1], addPath = bestPath[diagonalPath + 1];
				if (removePath) bestPath[diagonalPath - 1] = void 0;
				let canAdd = false;
				if (addPath) {
					const addPathNewPos = addPath.oldPos - diagonalPath;
					canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
				}
				const canRemove = removePath && removePath.oldPos + 1 < oldLen;
				if (!canAdd && !canRemove) {
					bestPath[diagonalPath] = void 0;
					continue;
				}
				if (!canRemove || canAdd && removePath.oldPos < addPath.oldPos) basePath = this.addToPath(addPath, true, false, 0, options);
				else basePath = this.addToPath(removePath, false, true, 1, options);
				newPos = this.extractCommon(basePath, newTokens, oldTokens, diagonalPath, options);
				if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) return done(this.buildValues(basePath.lastComponent, newTokens, oldTokens)) || true;
				else {
					bestPath[diagonalPath] = basePath;
					if (basePath.oldPos + 1 >= oldLen) maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
					if (newPos + 1 >= newLen) minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
				}
			}
			editLength++;
		};
		if (callback) (function exec() {
			setTimeout(function() {
				if (editLength > maxEditLength || Date.now() > abortAfterTimestamp) return callback(void 0);
				if (!execEditLength()) exec();
			}, 0);
		})();
		else while (editLength <= maxEditLength && Date.now() <= abortAfterTimestamp) {
			const ret = execEditLength();
			if (ret) return ret;
		}
	}
	addToPath(path, added, removed, oldPosInc, options) {
		const last = path.lastComponent;
		if (last && !options.oneChangePerToken && last.added === added && last.removed === removed) return {
			oldPos: path.oldPos + oldPosInc,
			lastComponent: {
				count: last.count + 1,
				added,
				removed,
				previousComponent: last.previousComponent
			}
		};
		else return {
			oldPos: path.oldPos + oldPosInc,
			lastComponent: {
				count: 1,
				added,
				removed,
				previousComponent: last
			}
		};
	}
	extractCommon(basePath, newTokens, oldTokens, diagonalPath, options) {
		const newLen = newTokens.length, oldLen = oldTokens.length;
		let oldPos = basePath.oldPos, newPos = oldPos - diagonalPath, commonCount = 0;
		while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(oldTokens[oldPos + 1], newTokens[newPos + 1], options)) {
			newPos++;
			oldPos++;
			commonCount++;
			if (options.oneChangePerToken) basePath.lastComponent = {
				count: 1,
				previousComponent: basePath.lastComponent,
				added: false,
				removed: false
			};
		}
		if (commonCount && !options.oneChangePerToken) basePath.lastComponent = {
			count: commonCount,
			previousComponent: basePath.lastComponent,
			added: false,
			removed: false
		};
		basePath.oldPos = oldPos;
		return newPos;
	}
	equals(left, right, options) {
		if (options.comparator) return options.comparator(left, right);
		else return left === right || !!options.ignoreCase && left.toLowerCase() === right.toLowerCase();
	}
	removeEmpty(array) {
		const ret = [];
		for (let i = 0; i < array.length; i++) if (array[i]) ret.push(array[i]);
		return ret;
	}
	castInput(value, options) {
		return value;
	}
	tokenize(value, options) {
		return Array.from(value);
	}
	join(chars) {
		return chars.join("");
	}
	postProcess(changeObjects, options) {
		return changeObjects;
	}
	get useLongestToken() {
		return false;
	}
	buildValues(lastComponent, newTokens, oldTokens) {
		const components = [];
		let nextComponent;
		while (lastComponent) {
			components.push(lastComponent);
			nextComponent = lastComponent.previousComponent;
			delete lastComponent.previousComponent;
			lastComponent = nextComponent;
		}
		components.reverse();
		const componentLen = components.length;
		let componentPos = 0, newPos = 0, oldPos = 0;
		for (; componentPos < componentLen; componentPos++) {
			const component = components[componentPos];
			if (!component.removed) {
				if (!component.added && this.useLongestToken) {
					let value = newTokens.slice(newPos, newPos + component.count);
					value = value.map(function(value$1, i) {
						const oldValue = oldTokens[oldPos + i];
						return oldValue.length > value$1.length ? oldValue : value$1;
					});
					component.value = this.join(value);
				} else component.value = this.join(newTokens.slice(newPos, newPos + component.count));
				newPos += component.count;
				if (!component.added) oldPos += component.count;
			} else {
				component.value = this.join(oldTokens.slice(oldPos, oldPos + component.count));
				oldPos += component.count;
			}
		}
		return components;
	}
};
var CharacterDiff = class extends Diff {};
const characterDiff = new CharacterDiff();
function diffChars(oldStr, newStr, options) {
	return characterDiff.diff(oldStr, newStr, options);
}
function longestCommonPrefix(str1, str2) {
	let i;
	for (i = 0; i < str1.length && i < str2.length; i++) if (str1[i] != str2[i]) return str1.slice(0, i);
	return str1.slice(0, i);
}
function longestCommonSuffix(str1, str2) {
	let i;
	if (!str1 || !str2 || str1[str1.length - 1] != str2[str2.length - 1]) return "";
	for (i = 0; i < str1.length && i < str2.length; i++) if (str1[str1.length - (i + 1)] != str2[str2.length - (i + 1)]) return str1.slice(-i);
	return str1.slice(-i);
}
function replacePrefix(string, oldPrefix, newPrefix) {
	if (string.slice(0, oldPrefix.length) != oldPrefix) throw Error(`string ${JSON.stringify(string)} doesn't start with prefix ${JSON.stringify(oldPrefix)}; this is a bug`);
	return newPrefix + string.slice(oldPrefix.length);
}
function replaceSuffix(string, oldSuffix, newSuffix) {
	if (!oldSuffix) return string + newSuffix;
	if (string.slice(-oldSuffix.length) != oldSuffix) throw Error(`string ${JSON.stringify(string)} doesn't end with suffix ${JSON.stringify(oldSuffix)}; this is a bug`);
	return string.slice(0, -oldSuffix.length) + newSuffix;
}
function removePrefix(string, oldPrefix) {
	return replacePrefix(string, oldPrefix, "");
}
function removeSuffix(string, oldSuffix) {
	return replaceSuffix(string, oldSuffix, "");
}
function maximumOverlap(string1, string2) {
	return string2.slice(0, overlapCount(string1, string2));
}
function overlapCount(a, b) {
	let startA = 0;
	if (a.length > b.length) startA = a.length - b.length;
	let endB = b.length;
	if (a.length < b.length) endB = a.length;
	const map = Array(endB);
	let k = 0;
	map[0] = 0;
	for (let j = 1; j < endB; j++) {
		if (b[j] == b[k]) map[j] = map[k];
		else map[j] = k;
		while (k > 0 && b[j] != b[k]) k = map[k];
		if (b[j] == b[k]) k++;
	}
	k = 0;
	for (let i = startA; i < a.length; i++) {
		while (k > 0 && a[i] != b[k]) k = map[k];
		if (a[i] == b[k]) k++;
	}
	return k;
}
function trailingWs(string) {
	let i;
	for (i = string.length - 1; i >= 0; i--) if (!string[i].match(/\s/)) break;
	return string.substring(i + 1);
}
function leadingWs(string) {
	const match = string.match(/^\s*/);
	return match ? match[0] : "";
}
var extendedWordChars = "a-zA-Z0-9_\\u{AD}\\u{C0}-\\u{D6}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}";
var tokenizeIncludingWhitespace = new RegExp(`[${extendedWordChars}]+|\\s+|[^${extendedWordChars}]`, "ug");
var WordDiff = class extends Diff {
	equals(left, right, options) {
		if (options.ignoreCase) {
			left = left.toLowerCase();
			right = right.toLowerCase();
		}
		return left.trim() === right.trim();
	}
	tokenize(value, options = {}) {
		let parts;
		if (options.intlSegmenter) {
			const segmenter = options.intlSegmenter;
			if (segmenter.resolvedOptions().granularity != "word") throw new Error("The segmenter passed must have a granularity of \"word\"");
			parts = [];
			for (const segmentObj of Array.from(segmenter.segment(value))) {
				const segment = segmentObj.segment;
				if (parts.length && /\s/.test(parts[parts.length - 1]) && /\s/.test(segment)) parts[parts.length - 1] += segment;
				else parts.push(segment);
			}
		} else parts = value.match(tokenizeIncludingWhitespace) || [];
		const tokens = [];
		let prevPart = null;
		parts.forEach((part) => {
			if (/\s/.test(part)) if (prevPart == null) tokens.push(part);
			else tokens.push(tokens.pop() + part);
			else if (prevPart != null && /\s/.test(prevPart)) if (tokens[tokens.length - 1] == prevPart) tokens.push(tokens.pop() + part);
			else tokens.push(prevPart + part);
			else tokens.push(part);
			prevPart = part;
		});
		return tokens;
	}
	join(tokens) {
		return tokens.map((token, i) => {
			if (i == 0) return token;
			else return token.replace(/^\s+/, "");
		}).join("");
	}
	postProcess(changes, options) {
		if (!changes || options.oneChangePerToken) return changes;
		let lastKeep = null;
		let insertion = null;
		let deletion = null;
		changes.forEach((change) => {
			if (change.added) insertion = change;
			else if (change.removed) deletion = change;
			else {
				if (insertion || deletion) dedupeWhitespaceInChangeObjects(lastKeep, deletion, insertion, change);
				lastKeep = change;
				insertion = null;
				deletion = null;
			}
		});
		if (insertion || deletion) dedupeWhitespaceInChangeObjects(lastKeep, deletion, insertion, null);
		return changes;
	}
};
new WordDiff();
function dedupeWhitespaceInChangeObjects(startKeep, deletion, insertion, endKeep) {
	if (deletion && insertion) {
		const oldWsPrefix = leadingWs(deletion.value);
		const oldWsSuffix = trailingWs(deletion.value);
		const newWsPrefix = leadingWs(insertion.value);
		const newWsSuffix = trailingWs(insertion.value);
		if (startKeep) {
			const commonWsPrefix = longestCommonPrefix(oldWsPrefix, newWsPrefix);
			startKeep.value = replaceSuffix(startKeep.value, newWsPrefix, commonWsPrefix);
			deletion.value = removePrefix(deletion.value, commonWsPrefix);
			insertion.value = removePrefix(insertion.value, commonWsPrefix);
		}
		if (endKeep) {
			const commonWsSuffix = longestCommonSuffix(oldWsSuffix, newWsSuffix);
			endKeep.value = replacePrefix(endKeep.value, newWsSuffix, commonWsSuffix);
			deletion.value = removeSuffix(deletion.value, commonWsSuffix);
			insertion.value = removeSuffix(insertion.value, commonWsSuffix);
		}
	} else if (insertion) {
		if (startKeep) {
			const ws = leadingWs(insertion.value);
			insertion.value = insertion.value.substring(ws.length);
		}
		if (endKeep) {
			const ws = leadingWs(endKeep.value);
			endKeep.value = endKeep.value.substring(ws.length);
		}
	} else if (startKeep && endKeep) {
		const newWsFull = leadingWs(endKeep.value), delWsStart = leadingWs(deletion.value), delWsEnd = trailingWs(deletion.value);
		const newWsStart = longestCommonPrefix(newWsFull, delWsStart);
		deletion.value = removePrefix(deletion.value, newWsStart);
		const newWsEnd = longestCommonSuffix(removePrefix(newWsFull, newWsStart), delWsEnd);
		deletion.value = removeSuffix(deletion.value, newWsEnd);
		endKeep.value = replacePrefix(endKeep.value, newWsFull, newWsEnd);
		startKeep.value = replaceSuffix(startKeep.value, newWsFull, newWsFull.slice(0, newWsFull.length - newWsEnd.length));
	} else if (endKeep) {
		const endKeepWsPrefix = leadingWs(endKeep.value);
		const overlap = maximumOverlap(trailingWs(deletion.value), endKeepWsPrefix);
		deletion.value = removeSuffix(deletion.value, overlap);
	} else if (startKeep) {
		const overlap = maximumOverlap(trailingWs(startKeep.value), leadingWs(deletion.value));
		deletion.value = removePrefix(deletion.value, overlap);
	}
}
var WordsWithSpaceDiff = class extends Diff {
	tokenize(value) {
		const regex = new RegExp(`(\\r?\\n)|[${extendedWordChars}]+|[^\\S\\n\\r]+|[^${extendedWordChars}]`, "ug");
		return value.match(regex) || [];
	}
};
const wordsWithSpaceDiff = new WordsWithSpaceDiff();
function diffWordsWithSpace(oldStr, newStr, options) {
	return wordsWithSpaceDiff.diff(oldStr, newStr, options);
}
var LineDiff = class extends Diff {
	constructor() {
		super(...arguments);
		this.tokenize = tokenize;
	}
	equals(left, right, options) {
		if (options.ignoreWhitespace) {
			if (!options.newlineIsToken || !left.includes("\n")) left = left.trim();
			if (!options.newlineIsToken || !right.includes("\n")) right = right.trim();
		} else if (options.ignoreNewlineAtEof && !options.newlineIsToken) {
			if (left.endsWith("\n")) left = left.slice(0, -1);
			if (right.endsWith("\n")) right = right.slice(0, -1);
		}
		return super.equals(left, right, options);
	}
};
const lineDiff = new LineDiff();
function diffLines(oldStr, newStr, options) {
	return lineDiff.diff(oldStr, newStr, options);
}
function tokenize(value, options) {
	if (options.stripTrailingCr) value = value.replace(/\r\n/g, "\n");
	const retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
	if (!linesAndNewlines[linesAndNewlines.length - 1]) linesAndNewlines.pop();
	for (let i = 0; i < linesAndNewlines.length; i++) {
		const line = linesAndNewlines[i];
		if (i % 2 && !options.newlineIsToken) retLines[retLines.length - 1] += line;
		else retLines.push(line);
	}
	return retLines;
}
function isSentenceEndPunct(char) {
	return char == "." || char == "!" || char == "?";
}
var SentenceDiff = class extends Diff {
	tokenize(value) {
		var _a;
		const result = [];
		let tokenStartI = 0;
		for (let i = 0; i < value.length; i++) {
			if (i == value.length - 1) {
				result.push(value.slice(tokenStartI));
				break;
			}
			if (isSentenceEndPunct(value[i]) && value[i + 1].match(/\s/)) {
				result.push(value.slice(tokenStartI, i + 1));
				i = tokenStartI = i + 1;
				while ((_a = value[i + 1]) === null || _a === void 0 ? void 0 : _a.match(/\s/)) i++;
				result.push(value.slice(tokenStartI, i + 1));
				tokenStartI = i + 1;
			}
		}
		return result;
	}
};
new SentenceDiff();
var CssDiff = class extends Diff {
	tokenize(value) {
		return value.split(/([{}:;,]|\s+)/);
	}
};
new CssDiff();
var JsonDiff = class extends Diff {
	constructor() {
		super(...arguments);
		this.tokenize = tokenize;
	}
	get useLongestToken() {
		return true;
	}
	castInput(value, options) {
		const { undefinedReplacement, stringifyReplacer = (k, v) => typeof v === "undefined" ? undefinedReplacement : v } = options;
		return typeof value === "string" ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), null, "  ");
	}
	equals(left, right, options) {
		return super.equals(left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"), options);
	}
};
new JsonDiff();
function canonicalize(obj, stack, replacementStack, replacer, key) {
	stack = stack || [];
	replacementStack = replacementStack || [];
	if (replacer) obj = replacer(key === void 0 ? "" : key, obj);
	let i;
	for (i = 0; i < stack.length; i += 1) if (stack[i] === obj) return replacementStack[i];
	let canonicalizedObj;
	if ("[object Array]" === Object.prototype.toString.call(obj)) {
		stack.push(obj);
		canonicalizedObj = new Array(obj.length);
		replacementStack.push(canonicalizedObj);
		for (i = 0; i < obj.length; i += 1) canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, String(i));
		stack.pop();
		replacementStack.pop();
		return canonicalizedObj;
	}
	if (obj && obj.toJSON) obj = obj.toJSON();
	if (typeof obj === "object" && obj !== null) {
		stack.push(obj);
		canonicalizedObj = {};
		replacementStack.push(canonicalizedObj);
		const sortedKeys = [];
		let key$1;
		for (key$1 in obj)
 /* istanbul ignore else */
		if (Object.prototype.hasOwnProperty.call(obj, key$1)) sortedKeys.push(key$1);
		sortedKeys.sort();
		for (i = 0; i < sortedKeys.length; i += 1) {
			key$1 = sortedKeys[i];
			canonicalizedObj[key$1] = canonicalize(obj[key$1], stack, replacementStack, replacer, key$1);
		}
		stack.pop();
		replacementStack.pop();
	} else canonicalizedObj = obj;
	return canonicalizedObj;
}
var ArrayDiff = class extends Diff {
	tokenize(value) {
		return value.slice();
	}
	join(value) {
		return value;
	}
	removeEmpty(value) {
		return value;
	}
};
new ArrayDiff();
const INCLUDE_HEADERS = {
	includeIndex: true,
	includeUnderline: true,
	includeFileHeaders: true
};
function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	let optionsObj;
	if (!options) optionsObj = {};
	else if (typeof options === "function") optionsObj = { callback: options };
	else optionsObj = options;
	if (typeof optionsObj.context === "undefined") optionsObj.context = 4;
	const context = optionsObj.context;
	if (optionsObj.newlineIsToken) throw new Error("newlineIsToken may not be used with patch-generation functions, only with diffing functions");
	if (!optionsObj.callback) return diffLinesResultToPatch(diffLines(oldStr, newStr, optionsObj));
	else {
		const { callback } = optionsObj;
		diffLines(oldStr, newStr, Object.assign(Object.assign({}, optionsObj), { callback: (diff) => {
			callback(diffLinesResultToPatch(diff));
		} }));
	}
	function diffLinesResultToPatch(diff) {
		if (!diff) return;
		diff.push({
			value: "",
			lines: []
		});
		function contextLines(lines) {
			return lines.map(function(entry) {
				return " " + entry;
			});
		}
		const hunks = [];
		let oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
		for (let i = 0; i < diff.length; i++) {
			const current = diff[i], lines = current.lines || splitLines(current.value);
			current.lines = lines;
			if (current.added || current.removed) {
				if (!oldRangeStart) {
					const prev = diff[i - 1];
					oldRangeStart = oldLine;
					newRangeStart = newLine;
					if (prev) {
						curRange = context > 0 ? contextLines(prev.lines.slice(-context)) : [];
						oldRangeStart -= curRange.length;
						newRangeStart -= curRange.length;
					}
				}
				for (const line of lines) curRange.push((current.added ? "+" : "-") + line);
				if (current.added) newLine += lines.length;
				else oldLine += lines.length;
			} else {
				if (oldRangeStart) if (lines.length <= context * 2 && i < diff.length - 2) for (const line of contextLines(lines)) curRange.push(line);
				else {
					const contextSize = Math.min(lines.length, context);
					for (const line of contextLines(lines.slice(0, contextSize))) curRange.push(line);
					const hunk = {
						oldStart: oldRangeStart,
						oldLines: oldLine - oldRangeStart + contextSize,
						newStart: newRangeStart,
						newLines: newLine - newRangeStart + contextSize,
						lines: curRange
					};
					hunks.push(hunk);
					oldRangeStart = 0;
					newRangeStart = 0;
					curRange = [];
				}
				oldLine += lines.length;
				newLine += lines.length;
			}
		}
		for (const hunk of hunks) for (let i = 0; i < hunk.lines.length; i++) if (hunk.lines[i].endsWith("\n")) hunk.lines[i] = hunk.lines[i].slice(0, -1);
		else {
			hunk.lines.splice(i + 1, 0, "\\ No newline at end of file");
			i++;
		}
		return {
			oldFileName,
			newFileName,
			oldHeader,
			newHeader,
			hunks
		};
	}
}
function formatPatch(patch, headerOptions) {
	if (!headerOptions) headerOptions = INCLUDE_HEADERS;
	if (Array.isArray(patch)) {
		if (patch.length > 1 && !headerOptions.includeFileHeaders) throw new Error("Cannot omit file headers on a multi-file patch. (The result would be unparseable; how would a tool trying to apply the patch know which changes are to which file?)");
		return patch.map((p) => formatPatch(p, headerOptions)).join("\n");
	}
	const ret = [];
	if (headerOptions.includeIndex && patch.oldFileName == patch.newFileName) ret.push("Index: " + patch.oldFileName);
	if (headerOptions.includeUnderline) ret.push("===================================================================");
	if (headerOptions.includeFileHeaders) {
		ret.push("--- " + patch.oldFileName + (typeof patch.oldHeader === "undefined" ? "" : "	" + patch.oldHeader));
		ret.push("+++ " + patch.newFileName + (typeof patch.newHeader === "undefined" ? "" : "	" + patch.newHeader));
	}
	for (let i = 0; i < patch.hunks.length; i++) {
		const hunk = patch.hunks[i];
		if (hunk.oldLines === 0) hunk.oldStart -= 1;
		if (hunk.newLines === 0) hunk.newStart -= 1;
		ret.push("@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart + "," + hunk.newLines + " @@");
		for (const line of hunk.lines) ret.push(line);
	}
	return ret.join("\n") + "\n";
}
function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	if (typeof options === "function") options = { callback: options };
	if (!(options === null || options === void 0 ? void 0 : options.callback)) {
		const patchObj = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
		if (!patchObj) return;
		return formatPatch(patchObj, options === null || options === void 0 ? void 0 : options.headerOptions);
	} else {
		const { callback } = options;
		structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, Object.assign(Object.assign({}, options), { callback: (patchObj) => {
			if (!patchObj) callback(void 0);
			else callback(formatPatch(patchObj, options.headerOptions));
		} }));
	}
}
function splitLines(text) {
	const hasTrailingNl = text.endsWith("\n");
	const result = text.split("\n").map((line) => line + "\n");
	if (hasTrailingNl) result.pop();
	else result.push(result.pop().slice(0, -1));
	return result;
}
function createDiffSpanDecoration({ line, spanStart, spanLength }) {
	return {
		start: {
			line,
			character: spanStart
		},
		end: {
			line,
			character: spanStart + spanLength
		},
		properties: { "data-diff-span": "" },
		alwaysWrap: true
	};
}
function pushOrJoinSpan({ item, arr, enableJoin, isNeutral = false, isLastItem = false }) {
	const lastItem = arr[arr.length - 1];
	if (lastItem == null || isLastItem || !enableJoin) {
		arr.push([isNeutral ? 0 : 1, item.value]);
		return;
	}
	const isLastItemNeutral = lastItem[0] === 0;
	if (isNeutral === isLastItemNeutral || isNeutral && item.value.length === 1 && !isLastItemNeutral) {
		lastItem[1] += item.value;
		return;
	}
	arr.push([isNeutral ? 0 : 1, item.value]);
}
function iterateOverDiff({ diff, diffStyle, startingLine = 0, totalLines = Infinity, expandedHunks, collapsedContextThreshold = 1, callback }) {
	const state = {
		finalHunk: diff.hunks.at(-1),
		viewportStart: startingLine,
		viewportEnd: startingLine + totalLines,
		isWindowedHighlight: startingLine > 0 || totalLines < Infinity,
		splitCount: 0,
		unifiedCount: 0,
		shouldBreak() {
			if (!state.isWindowedHighlight) return false;
			const breakUnified = state.unifiedCount >= startingLine + totalLines;
			const breakSplit = state.splitCount >= startingLine + totalLines;
			if (diffStyle === "unified") return breakUnified;
			else if (diffStyle === "split") return breakSplit;
			else return breakUnified && breakSplit;
		},
		shouldSkip(unifiedHeight, splitHeight) {
			if (!state.isWindowedHighlight) return false;
			const skipUnified = state.unifiedCount + unifiedHeight < startingLine;
			const skipSplit = state.splitCount + splitHeight < startingLine;
			if (diffStyle === "unified") return skipUnified;
			else if (diffStyle === "split") return skipSplit;
			else return skipUnified && skipSplit;
		},
		incrementCounts(unifiedValue, splitValue) {
			if (diffStyle === "unified" || diffStyle === "both") state.unifiedCount += unifiedValue;
			if (diffStyle === "split" || diffStyle === "both") state.splitCount += splitValue;
		},
		isInWindow(unifiedHeight, splitHeight) {
			if (!state.isWindowedHighlight) return true;
			const unifiedInWindow = state.isInUnifiedWindow(unifiedHeight);
			const splitInWindow = state.isInSplitWindow(splitHeight);
			if (diffStyle === "unified") return unifiedInWindow;
			else if (diffStyle === "split") return splitInWindow;
			else return unifiedInWindow || splitInWindow;
		},
		isInUnifiedWindow(unifiedHeight) {
			return !state.isWindowedHighlight || state.unifiedCount >= startingLine - unifiedHeight && state.unifiedCount < startingLine + totalLines;
		},
		isInSplitWindow(splitHeight) {
			return !state.isWindowedHighlight || state.splitCount >= startingLine - splitHeight && state.splitCount < startingLine + totalLines;
		},
		emit(props, silent = false) {
			if (!silent) if (diffStyle === "unified") state.incrementCounts(1, 0);
			else if (diffStyle === "split") state.incrementCounts(0, 1);
			else state.incrementCounts(1, 1);
			return callback(props) ?? false;
		}
	};
	hunkIterator: for (const [hunkIndex, hunk] of diff.hunks.entries()) {
		if (state.shouldBreak()) break;
		const leadingRegion = getExpandedRegion(diff.isPartial, hunk.collapsedBefore, expandedHunks, hunkIndex, collapsedContextThreshold);
		const trailingRegion = (() => {
			if (hunk !== state.finalHunk || !hasFinalCollapsedHunk(diff)) return;
			const additionRemaining = diff.additionLines.length - (hunk.additionLineIndex + hunk.additionCount);
			const deletionRemaining = diff.deletionLines.length - (hunk.deletionLineIndex + hunk.deletionCount);
			if (additionRemaining !== deletionRemaining) throw new Error(`iterateOverDiff: trailing context mismatch (additions=${additionRemaining}, deletions=${deletionRemaining}) for ${diff.name}`);
			const trailingRangeSize = Math.min(additionRemaining, deletionRemaining);
			return getExpandedRegion(diff.isPartial, trailingRangeSize, expandedHunks, diff.hunks.length, collapsedContextThreshold);
		})();
		const expandedLineCount = leadingRegion.fromStart + leadingRegion.fromEnd;
		function getTrailingCollapsedAfter(unifiedLineIndex$1, splitLineIndex$1) {
			if (trailingRegion == null || trailingRegion.collapsedLines <= 0 || trailingRegion.fromStart + trailingRegion.fromEnd > 0) return 0;
			if (diffStyle === "unified") return unifiedLineIndex$1 === hunk.unifiedLineStart + hunk.unifiedLineCount - 1 ? trailingRegion.collapsedLines : 0;
			return splitLineIndex$1 === hunk.splitLineStart + hunk.splitLineCount - 1 ? trailingRegion.collapsedLines : 0;
		}
		function getPendingCollapsed() {
			if (leadingRegion.collapsedLines === 0) return 0;
			const value = leadingRegion.collapsedLines;
			leadingRegion.collapsedLines = 0;
			return value;
		}
		if (!state.shouldSkip(expandedLineCount, expandedLineCount)) {
			let unifiedLineIndex$1 = hunk.unifiedLineStart - leadingRegion.rangeSize;
			let splitLineIndex$1 = hunk.splitLineStart - leadingRegion.rangeSize;
			let deletionLineIndex$1 = hunk.deletionLineIndex - leadingRegion.rangeSize;
			let additionLineIndex$1 = hunk.additionLineIndex - leadingRegion.rangeSize;
			let deletionLineNumber$1 = hunk.deletionStart - leadingRegion.rangeSize;
			let additionLineNumber$1 = hunk.additionStart - leadingRegion.rangeSize;
			let index = 0;
			while (index < leadingRegion.fromStart) {
				if (state.isInWindow(0, 0)) {
					if (state.emit({
						hunkIndex,
						hunk,
						collapsedBefore: 0,
						collapsedAfter: 0,
						type: "context-expanded",
						deletionLine: {
							lineNumber: deletionLineNumber$1 + index,
							lineIndex: deletionLineIndex$1 + index,
							noEOFCR: false,
							unifiedLineIndex: unifiedLineIndex$1 + index,
							splitLineIndex: splitLineIndex$1 + index
						},
						additionLine: {
							unifiedLineIndex: unifiedLineIndex$1 + index,
							splitLineIndex: splitLineIndex$1 + index,
							lineIndex: additionLineIndex$1 + index,
							lineNumber: additionLineNumber$1 + index,
							noEOFCR: false
						}
					})) break hunkIterator;
				} else state.incrementCounts(1, 1);
				index++;
			}
			unifiedLineIndex$1 = hunk.unifiedLineStart - leadingRegion.fromEnd;
			splitLineIndex$1 = hunk.splitLineStart - leadingRegion.fromEnd;
			deletionLineIndex$1 = hunk.deletionLineIndex - leadingRegion.fromEnd;
			additionLineIndex$1 = hunk.additionLineIndex - leadingRegion.fromEnd;
			deletionLineNumber$1 = hunk.deletionStart - leadingRegion.fromEnd;
			additionLineNumber$1 = hunk.additionStart - leadingRegion.fromEnd;
			index = 0;
			while (index < leadingRegion.fromEnd) {
				if (state.isInWindow(0, 0)) {
					if (state.emit({
						hunkIndex,
						hunk,
						collapsedBefore: getPendingCollapsed(),
						collapsedAfter: 0,
						type: "context-expanded",
						deletionLine: {
							lineNumber: deletionLineNumber$1 + index,
							lineIndex: deletionLineIndex$1 + index,
							noEOFCR: false,
							unifiedLineIndex: unifiedLineIndex$1 + index,
							splitLineIndex: splitLineIndex$1 + index
						},
						additionLine: {
							unifiedLineIndex: unifiedLineIndex$1 + index,
							splitLineIndex: splitLineIndex$1 + index,
							lineIndex: additionLineIndex$1 + index,
							lineNumber: additionLineNumber$1 + index,
							noEOFCR: false
						}
					})) break hunkIterator;
				} else state.incrementCounts(1, 1);
				index++;
			}
		} else {
			state.incrementCounts(expandedLineCount, expandedLineCount);
			getPendingCollapsed();
		}
		let unifiedLineIndex = hunk.unifiedLineStart;
		let splitLineIndex = hunk.splitLineStart;
		let deletionLineIndex = hunk.deletionLineIndex;
		let additionLineIndex = hunk.additionLineIndex;
		let deletionLineNumber = hunk.deletionStart;
		let additionLineNumber = hunk.additionStart;
		const lastContent = hunk.hunkContent.at(-1);
		for (const content of hunk.hunkContent) {
			if (state.shouldBreak()) break hunkIterator;
			const isLastContent = content === lastContent;
			if (content.type === "context") {
				if (!state.shouldSkip(content.lines, content.lines)) {
					let index = 0;
					while (index < content.lines) {
						if (state.isInWindow(0, 0)) {
							const isLastLine = isLastContent && index === content.lines - 1;
							const unifiedRowIndex = unifiedLineIndex + index;
							const splitRowIndex = splitLineIndex + index;
							if (state.emit({
								hunkIndex,
								hunk,
								collapsedBefore: getPendingCollapsed(),
								collapsedAfter: getTrailingCollapsedAfter(unifiedRowIndex, splitRowIndex),
								type: "context",
								deletionLine: {
									lineNumber: deletionLineNumber + index,
									lineIndex: deletionLineIndex + index,
									noEOFCR: isLastLine && hunk.noEOFCRDeletions,
									unifiedLineIndex: unifiedRowIndex,
									splitLineIndex: splitRowIndex
								},
								additionLine: {
									unifiedLineIndex: unifiedRowIndex,
									splitLineIndex: splitRowIndex,
									lineIndex: additionLineIndex + index,
									lineNumber: additionLineNumber + index,
									noEOFCR: isLastLine && hunk.noEOFCRAdditions
								}
							})) break hunkIterator;
						} else state.incrementCounts(1, 1);
						index++;
					}
				} else {
					state.incrementCounts(content.lines, content.lines);
					getPendingCollapsed();
				}
				unifiedLineIndex += content.lines;
				splitLineIndex += content.lines;
				deletionLineIndex += content.lines;
				additionLineIndex += content.lines;
				deletionLineNumber += content.lines;
				additionLineNumber += content.lines;
			} else {
				const splitCount = Math.max(content.deletions, content.additions);
				const unifiedCount = content.deletions + content.additions;
				if (!state.shouldSkip(unifiedCount, splitCount)) {
					const iterationRanges = getChangeIterationRanges(state, content, diffStyle);
					for (const [rangeStart, rangeEnd] of iterationRanges) for (let index = rangeStart; index < rangeEnd; index++) {
						const collapsedAfter = getTrailingCollapsedAfter(unifiedLineIndex + index, diffStyle === "unified" ? splitLineIndex + (index < content.deletions ? index : index - content.deletions) : splitLineIndex + index);
						if (state.emit(getChangeLineData({
							hunkIndex,
							hunk,
							collapsedBefore: getPendingCollapsed(),
							collapsedAfter,
							diffStyle,
							index,
							unifiedLineIndex,
							splitLineIndex,
							additionLineIndex,
							deletionLineIndex,
							additionLineNumber,
							deletionLineNumber,
							content,
							isLastContent,
							unifiedCount,
							splitCount
						}), true)) break hunkIterator;
					}
				}
				getPendingCollapsed();
				state.incrementCounts(unifiedCount, splitCount);
				unifiedLineIndex += unifiedCount;
				splitLineIndex += splitCount;
				deletionLineIndex += content.deletions;
				additionLineIndex += content.additions;
				deletionLineNumber += content.deletions;
				additionLineNumber += content.additions;
			}
		}
		if (trailingRegion != null) {
			const { collapsedLines, fromStart, fromEnd } = trailingRegion;
			const len = fromStart + fromEnd;
			let index = 0;
			while (index < len) {
				if (state.shouldBreak()) break hunkIterator;
				if (state.isInWindow(0, 0)) {
					const isLastLine = index === len - 1;
					if (state.emit({
						hunkIndex: diff.hunks.length,
						hunk: void 0,
						collapsedBefore: 0,
						collapsedAfter: isLastLine ? collapsedLines : 0,
						type: "context-expanded",
						deletionLine: {
							lineNumber: deletionLineNumber + index,
							lineIndex: deletionLineIndex + index,
							noEOFCR: false,
							unifiedLineIndex: unifiedLineIndex + index,
							splitLineIndex: splitLineIndex + index
						},
						additionLine: {
							unifiedLineIndex: unifiedLineIndex + index,
							splitLineIndex: splitLineIndex + index,
							lineIndex: additionLineIndex + index,
							lineNumber: additionLineNumber + index,
							noEOFCR: false
						}
					})) break hunkIterator;
				} else state.incrementCounts(1, 1);
				index++;
			}
		}
	}
}
function getExpandedRegion(isPartial, rangeSize, expandedHunks, hunkIndex, collapsedContextThreshold) {
	rangeSize = Math.max(rangeSize, 0);
	if (rangeSize === 0 || isPartial) return {
		fromStart: 0,
		fromEnd: 0,
		rangeSize,
		collapsedLines: Math.max(rangeSize, 0)
	};
	if (expandedHunks === true || rangeSize <= collapsedContextThreshold) return {
		fromStart: rangeSize,
		fromEnd: 0,
		rangeSize,
		collapsedLines: 0
	};
	const region = expandedHunks?.get(hunkIndex);
	const fromStart = Math.min(Math.max(region?.fromStart ?? 0, 0), rangeSize);
	const fromEnd = Math.min(Math.max(region?.fromEnd ?? 0, 0), rangeSize);
	const expandedCount = fromStart + fromEnd;
	const renderAll = expandedCount >= rangeSize;
	return {
		fromStart: renderAll ? rangeSize : fromStart,
		fromEnd: renderAll ? 0 : fromEnd,
		rangeSize,
		collapsedLines: Math.max(rangeSize - expandedCount, 0)
	};
}
function hasFinalCollapsedHunk(diff) {
	const lastHunk = diff.hunks.at(-1);
	if (lastHunk == null || diff.isPartial || diff.additionLines.length === 0 || diff.deletionLines.length === 0) return false;
	return lastHunk.additionLineIndex + lastHunk.additionCount < diff.additionLines.length || lastHunk.deletionLineIndex + lastHunk.deletionCount < diff.deletionLines.length;
}
function getChangeIterationRanges(state, content, diffStyle) {
	if (!state.isWindowedHighlight) return [[0, diffStyle === "unified" ? content.deletions + content.additions : Math.max(content.deletions, content.additions)]];
	const useUnified = diffStyle !== "split";
	const useSplit = diffStyle !== "unified";
	const iterationSpace = diffStyle === "unified" ? "unified" : "split";
	const iterationRanges = [];
	function getVisibleRange(start, count) {
		if (start + count <= state.viewportStart || start >= state.viewportEnd) return;
		const visibleStart = Math.max(0, state.viewportStart - start);
		const visibleEnd = Math.min(count, state.viewportEnd - start);
		return visibleEnd > visibleStart ? [visibleStart, visibleEnd] : void 0;
	}
	function mapRangeToIteration(range, kind) {
		if (iterationSpace === "split") return range;
		return kind === "additions" ? [range[0] + content.deletions, range[1] + content.deletions] : range;
	}
	function pushRange(range, kind) {
		if (range == null) return;
		const [start, end] = mapRangeToIteration(range, kind);
		if (end > start) iterationRanges.push([start, end]);
	}
	if (useUnified) {
		pushRange(getVisibleRange(state.unifiedCount, content.deletions), "deletions");
		pushRange(getVisibleRange(state.unifiedCount + content.deletions, content.additions), "additions");
	}
	if (useSplit) {
		pushRange(getVisibleRange(state.splitCount, content.deletions), "deletions");
		pushRange(getVisibleRange(state.splitCount, content.additions), "additions");
	}
	if (iterationRanges.length === 0) return iterationRanges;
	iterationRanges.sort((a, b) => a[0] - b[0]);
	const merged = [iterationRanges[0]];
	for (const [start, end] of iterationRanges.slice(1)) {
		const last = merged[merged.length - 1];
		if (start <= last[1]) last[1] = Math.max(last[1], end);
		else merged.push([start, end]);
	}
	return merged;
}
function getChangeLineData({ hunkIndex, hunk, collapsedAfter, collapsedBefore, diffStyle, index, unifiedLineIndex, splitLineIndex, additionLineIndex, deletionLineIndex, additionLineNumber, deletionLineNumber, content, isLastContent, unifiedCount, splitCount }) {
	const unifiedDeletionLineIndex = index < content.deletions ? unifiedLineIndex + index : void 0;
	const unifiedAdditionLineIndex = diffStyle === "unified" ? index >= content.deletions ? unifiedLineIndex + index : void 0 : index < content.additions ? unifiedLineIndex + content.deletions + index : void 0;
	const resolvedSplitLineIndex = diffStyle === "unified" ? splitLineIndex + (index < content.deletions ? index : index - content.deletions) : splitLineIndex + index;
	const deletionLineIndexValue = index < content.deletions ? deletionLineIndex + index : void 0;
	const deletionLineNumberValue = index < content.deletions ? deletionLineNumber + index : void 0;
	const additionLineIndexValue = diffStyle === "unified" ? index >= content.deletions ? additionLineIndex + (index - content.deletions) : void 0 : index < content.additions ? additionLineIndex + index : void 0;
	const additionLineNumberValue = diffStyle === "unified" ? index >= content.deletions ? additionLineNumber + (index - content.deletions) : void 0 : index < content.additions ? additionLineNumber + index : void 0;
	const noEOFCRDeletion = diffStyle === "unified" ? isLastContent && index === content.deletions - 1 && hunk.noEOFCRDeletions : isLastContent && index === splitCount - 1 && hunk.noEOFCRDeletions;
	const noEOFCRAddition = diffStyle === "unified" ? isLastContent && index === unifiedCount - 1 && hunk.noEOFCRAdditions : isLastContent && index === splitCount - 1 && hunk.noEOFCRAdditions;
	const deletionLine = deletionLineIndexValue != null && deletionLineNumberValue != null && unifiedDeletionLineIndex != null ? {
		lineNumber: deletionLineNumberValue,
		lineIndex: deletionLineIndexValue,
		noEOFCR: noEOFCRDeletion,
		unifiedLineIndex: unifiedDeletionLineIndex,
		splitLineIndex: resolvedSplitLineIndex
	} : void 0;
	const additionLine = additionLineIndexValue != null && additionLineNumberValue != null && unifiedAdditionLineIndex != null ? {
		unifiedLineIndex: unifiedAdditionLineIndex,
		splitLineIndex: resolvedSplitLineIndex,
		lineIndex: additionLineIndexValue,
		lineNumber: additionLineNumberValue,
		noEOFCR: noEOFCRAddition
	} : void 0;
	if (deletionLine == null && additionLine != null) return {
		type: "change",
		hunkIndex,
		hunk,
		collapsedAfter,
		collapsedBefore,
		deletionLine: void 0,
		additionLine
	};
	else if (deletionLine != null && additionLine == null) return {
		type: "change",
		hunkIndex,
		hunk,
		collapsedAfter,
		collapsedBefore,
		deletionLine,
		additionLine: void 0
	};
	if (deletionLine == null || additionLine == null) throw new Error("iterateOverDiff: missing change line data");
	return {
		type: "change",
		hunkIndex,
		hunk,
		collapsedAfter,
		collapsedBefore,
		deletionLine,
		additionLine
	};
}
var DEFAULT_PLAIN_TEXT_OPTIONS = { forcePlainText: false };
function renderDiffWithHighlighter(diff, highlighter$1, options, { forcePlainText, startingLine, totalLines, expandedHunks, collapsedContextThreshold = 1 } = DEFAULT_PLAIN_TEXT_OPTIONS) {
	if (forcePlainText) {
		startingLine ??= 0;
		totalLines ??= Infinity;
	} else {
		startingLine = 0;
		totalLines = Infinity;
	}
	const isWindowedHighlight = startingLine > 0 || totalLines < Infinity;
	const baseThemeType = typeof options.theme === "string" ? highlighter$1.getTheme(options.theme).type : void 0;
	const themeStyles = getHighlighterThemeStyles({
		theme: options.theme,
		highlighter: highlighter$1
	});
	const lineDiffType = forcePlainText && !isWindowedHighlight && (diff.unifiedLineCount > 1e3 || diff.splitLineCount > 1e3) ? "none" : options.lineDiffType;
	const code = {
		deletionLines: [],
		additionLines: []
	};
	const shouldGroupAll = !forcePlainText && !diff.isPartial;
	const expandedHunksForIteration = forcePlainText ? expandedHunks : void 0;
	const buckets = /* @__PURE__ */ new Map();
	function getBucketForHunk(hunkIndex) {
		const index = shouldGroupAll ? 0 : hunkIndex;
		const bucket = buckets.get(index) ?? createBucket();
		buckets.set(index, bucket);
		return bucket;
	}
	function appendContent(lineContent, lineIndex, segments, contentWrapper) {
		if (isWindowedHighlight) {
			let segment = segments.at(-1);
			if (segment == null || segment.targetIndex + segment.count !== lineIndex) {
				segment = {
					targetIndex: lineIndex,
					originalOffset: contentWrapper.length,
					count: 0
				};
				segments.push(segment);
			}
			segment.count++;
		}
		contentWrapper.push(lineContent);
	}
	iterateOverDiff({
		diff,
		diffStyle: "both",
		startingLine,
		totalLines,
		expandedHunks: isWindowedHighlight ? expandedHunksForIteration : true,
		collapsedContextThreshold,
		callback: ({ hunkIndex, additionLine, deletionLine, type }) => {
			const bucket = getBucketForHunk(hunkIndex);
			const splitLineIndex = additionLine != null ? additionLine.splitLineIndex : deletionLine.splitLineIndex;
			if (type === "change" && additionLine != null && deletionLine != null) computeLineDiffDecorations({
				additionLine: diff.additionLines[additionLine.lineIndex],
				deletionLine: diff.deletionLines[deletionLine.lineIndex],
				deletionLineIndex: bucket.deletionContent.length,
				additionLineIndex: bucket.additionContent.length,
				deletionDecorations: bucket.deletionDecorations,
				additionDecorations: bucket.additionDecorations,
				lineDiffType
			});
			if (deletionLine != null) {
				appendContent(diff.deletionLines[deletionLine.lineIndex], deletionLine.lineIndex, bucket.deletionSegments, bucket.deletionContent);
				bucket.deletionInfo.push({
					type: type === "change" ? "change-deletion" : type,
					lineNumber: deletionLine.lineNumber,
					altLineNumber: type === "change" ? void 0 : additionLine.lineNumber ?? void 0,
					lineIndex: `${deletionLine.unifiedLineIndex},${splitLineIndex}`
				});
			}
			if (additionLine != null) {
				appendContent(diff.additionLines[additionLine.lineIndex], additionLine.lineIndex, bucket.additionSegments, bucket.additionContent);
				bucket.additionInfo.push({
					type: type === "change" ? "change-addition" : type,
					lineNumber: additionLine.lineNumber,
					altLineNumber: type === "change" ? void 0 : deletionLine.lineNumber ?? void 0,
					lineIndex: `${additionLine.unifiedLineIndex},${splitLineIndex}`
				});
			}
		}
	});
	for (const bucket of buckets.values()) {
		if (bucket.deletionContent.length === 0 && bucket.additionContent.length === 0) continue;
		const deletionFile = {
			name: diff.prevName ?? diff.name,
			contents: bucket.deletionContent.value
		};
		const additionFile = {
			name: diff.name,
			contents: bucket.additionContent.value
		};
		const { deletionLines, additionLines } = renderTwoFiles({
			deletionFile,
			deletionInfo: bucket.deletionInfo,
			deletionDecorations: bucket.deletionDecorations,
			additionFile,
			additionInfo: bucket.additionInfo,
			additionDecorations: bucket.additionDecorations,
			highlighter: highlighter$1,
			options,
			languageOverride: forcePlainText ? "text" : diff.lang
		});
		if (shouldGroupAll) {
			code.deletionLines = deletionLines;
			code.additionLines = additionLines;
			continue;
		}
		if (bucket.deletionSegments.length > 0) for (const seg of bucket.deletionSegments) for (let i = 0; i < seg.count; i++) code.deletionLines[seg.targetIndex + i] = deletionLines[seg.originalOffset + i];
		else code.deletionLines.push(...deletionLines);
		if (bucket.additionSegments.length > 0) for (const seg of bucket.additionSegments) for (let i = 0; i < seg.count; i++) code.additionLines[seg.targetIndex + i] = additionLines[seg.originalOffset + i];
		else code.additionLines.push(...additionLines);
	}
	return {
		code,
		themeStyles,
		baseThemeType
	};
}
function computeLineDiffDecorations({ deletionLine, additionLine, deletionLineIndex, additionLineIndex, deletionDecorations, additionDecorations, lineDiffType }) {
	if (deletionLine == null || additionLine == null || lineDiffType === "none") return;
	deletionLine = cleanLastNewline(deletionLine);
	additionLine = cleanLastNewline(additionLine);
	const lineDiff$1 = lineDiffType === "char" ? diffChars(deletionLine, additionLine) : diffWordsWithSpace(deletionLine, additionLine);
	const deletionSpans = [];
	const additionSpans = [];
	const enableJoin = lineDiffType === "word-alt";
	const lastItem = lineDiff$1.at(-1);
	for (const item of lineDiff$1) {
		const isLastItem = item === lastItem;
		if (!item.added && !item.removed) {
			pushOrJoinSpan({
				item,
				arr: deletionSpans,
				enableJoin,
				isNeutral: true,
				isLastItem
			});
			pushOrJoinSpan({
				item,
				arr: additionSpans,
				enableJoin,
				isNeutral: true,
				isLastItem
			});
		} else if (item.removed) pushOrJoinSpan({
			item,
			arr: deletionSpans,
			enableJoin,
			isLastItem
		});
		else pushOrJoinSpan({
			item,
			arr: additionSpans,
			enableJoin,
			isLastItem
		});
	}
	let spanIndex = 0;
	for (const span of deletionSpans) {
		if (span[0] === 1) deletionDecorations.push(createDiffSpanDecoration({
			line: deletionLineIndex,
			spanStart: spanIndex,
			spanLength: span[1].length
		}));
		spanIndex += span[1].length;
	}
	spanIndex = 0;
	for (const span of additionSpans) {
		if (span[0] === 1) additionDecorations.push(createDiffSpanDecoration({
			line: additionLineIndex,
			spanStart: spanIndex,
			spanLength: span[1].length
		}));
		spanIndex += span[1].length;
	}
}
function createBucket() {
	return {
		deletionContent: {
			push(value) {
				this.value += value;
				this.length++;
			},
			value: "",
			length: 0
		},
		additionContent: {
			push(value) {
				this.value += value;
				this.length++;
			},
			value: "",
			length: 0
		},
		deletionInfo: [],
		additionInfo: [],
		deletionDecorations: [],
		additionDecorations: [],
		deletionSegments: [],
		additionSegments: []
	};
}
function renderTwoFiles({ deletionFile, additionFile, deletionInfo, additionInfo, highlighter: highlighter$1, deletionDecorations, additionDecorations, languageOverride, options: { theme: themeOrThemes = DEFAULT_THEMES, ...options } }) {
	const deletionLang = languageOverride ?? getFiletypeFromFileName(deletionFile.name);
	const additionLang = languageOverride ?? getFiletypeFromFileName(additionFile.name);
	const { state, transformers } = createTransformerWithState();
	const hastConfig = (() => {
		return typeof themeOrThemes === "string" ? {
			...options,
			lang: "text",
			theme: themeOrThemes,
			transformers,
			decorations: void 0,
			defaultColor: false,
			cssVariablePrefix: formatCSSVariablePrefix("token")
		} : {
			...options,
			lang: "text",
			themes: themeOrThemes,
			transformers,
			decorations: void 0,
			defaultColor: false,
			cssVariablePrefix: formatCSSVariablePrefix("token")
		};
	})();
	return {
		deletionLines: (() => {
			if (deletionFile.contents === "") return [];
			hastConfig.lang = deletionLang;
			state.lineInfo = deletionInfo;
			hastConfig.decorations = deletionDecorations;
			return getLineNodes(highlighter$1.codeToHast(cleanLastNewline(deletionFile.contents), hastConfig));
		})(),
		additionLines: (() => {
			if (additionFile.contents === "") return [];
			hastConfig.lang = additionLang;
			hastConfig.decorations = additionDecorations;
			state.lineInfo = additionInfo;
			return getLineNodes(highlighter$1.codeToHast(cleanLastNewline(additionFile.contents), hastConfig));
		})()
	};
}
function isDiffPlainText(diff) {
	const computedLang = diff.lang ?? getFiletypeFromFileName(diff.name);
	const computedPreviousLang = diff.lang ?? (diff.prevName != null ? getFiletypeFromFileName(diff.prevName) : "text");
	return computedLang === "text" && computedPreviousLang === "text";
}
var instanceId$2 = -1;
var DiffHunksRenderer = class {
	__id = `diff-hunks-renderer:${++instanceId$2}`;
	highlighter;
	diff;
	expandedHunks = /* @__PURE__ */ new Map();
	deletionAnnotations = {};
	additionAnnotations = {};
	computedLang = "text";
	renderCache;
	constructor(options = { theme: DEFAULT_THEMES }, onRenderUpdate, workerManager) {
		this.options = options;
		this.onRenderUpdate = onRenderUpdate;
		this.workerManager = workerManager;
		if (workerManager?.isWorkingPool() !== true) this.highlighter = areThemesAttached(options.theme ?? DEFAULT_THEMES) ? getHighlighterIfLoaded() : void 0;
	}
	cleanUp() {
		this.highlighter = void 0;
		this.diff = void 0;
		this.renderCache = void 0;
		this.workerManager?.cleanUpPendingTasks(this);
		this.workerManager = void 0;
		this.onRenderUpdate = void 0;
	}
	recycle() {
		this.highlighter = void 0;
		this.diff = void 0;
		this.renderCache = void 0;
		this.workerManager?.cleanUpPendingTasks(this);
	}
	setOptions(options) {
		this.options = options;
	}
	mergeOptions(options) {
		this.options = {
			...this.options,
			...options
		};
	}
	expandHunk(index, direction, expansionLineCount = this.getOptionsWithDefaults().expansionLineCount) {
		const region = { ...this.expandedHunks.get(index) ?? {
			fromStart: 0,
			fromEnd: 0
		} };
		if (direction === "up" || direction === "both") region.fromStart += expansionLineCount;
		if (direction === "down" || direction === "both") region.fromEnd += expansionLineCount;
		if (this.renderCache?.highlighted !== true) this.renderCache = void 0;
		this.expandedHunks.set(index, region);
	}
	getExpandedHunk(hunkIndex) {
		return this.expandedHunks.get(hunkIndex) ?? DEFAULT_EXPANDED_REGION;
	}
	getExpandedHunksMap() {
		return this.expandedHunks;
	}
	setLineAnnotations(lineAnnotations) {
		this.additionAnnotations = {};
		this.deletionAnnotations = {};
		for (const annotation of lineAnnotations) {
			const map = (() => {
				switch (annotation.side) {
					case "deletions": return this.deletionAnnotations;
					case "additions": return this.additionAnnotations;
				}
			})();
			const arr = map[annotation.lineNumber] ?? [];
			map[annotation.lineNumber] = arr;
			arr.push(annotation);
		}
	}
	getUnifiedLineDecoration({ lineType }) {
		return { gutterLineType: lineType };
	}
	getSplitLineDecoration({ side, type }) {
		if (type !== "change") return { gutterLineType: type };
		return { gutterLineType: side === "deletions" ? "change-deletion" : "change-addition" };
	}
	createAnnotationElement(span) {
		return createAnnotationElement(span);
	}
	getOptionsWithDefaults() {
		const { diffIndicators = "bars", diffStyle = "split", disableBackground = false, disableFileHeader = false, disableLineNumbers = false, disableVirtualizationBuffers = false, collapsed = false, expandUnchanged = false, collapsedContextThreshold = 1, expansionLineCount = 100, hunkSeparators = "line-info", lineDiffType = "word-alt", maxLineDiffLength = 1e3, overflow = "scroll", theme = DEFAULT_THEMES, headerRenderMode = "default", tokenizeMaxLineLength = 1e3, useCSSClasses = false } = this.options;
		return {
			diffIndicators,
			diffStyle,
			disableBackground,
			disableFileHeader,
			disableLineNumbers,
			disableVirtualizationBuffers,
			collapsed,
			expandUnchanged,
			collapsedContextThreshold,
			expansionLineCount,
			hunkSeparators,
			lineDiffType,
			maxLineDiffLength,
			overflow,
			theme: this.workerManager?.getDiffRenderOptions().theme ?? theme,
			headerRenderMode,
			tokenizeMaxLineLength,
			useCSSClasses
		};
	}
	async initializeHighlighter() {
		this.highlighter = await getSharedHighlighter(getHighlighterOptions(this.computedLang, this.options));
		return this.highlighter;
	}
	hydrate(diff) {
		if (diff == null) return;
		this.diff = diff;
		const { options } = this.getRenderOptions(diff);
		let cache = this.workerManager?.getDiffResultCache(diff);
		if (cache != null && !areRenderOptionsEqual(options, cache.options)) cache = void 0;
		this.renderCache ??= {
			diff,
			highlighted: !isDiffPlainText(diff),
			options,
			result: cache?.result,
			renderRange: void 0
		};
		if (this.workerManager?.isWorkingPool() === true && this.renderCache.result == null) this.workerManager.highlightDiffAST(this, this.diff);
	}
	getRenderOptions(diff) {
		const options = (() => {
			if (this.workerManager?.isWorkingPool() === true) return this.workerManager.getDiffRenderOptions();
			const { theme, tokenizeMaxLineLength, lineDiffType } = this.getOptionsWithDefaults();
			return {
				theme,
				tokenizeMaxLineLength,
				lineDiffType
			};
		})();
		this.getOptionsWithDefaults();
		const { renderCache } = this;
		if (renderCache?.result == null) return {
			options,
			forceRender: true
		};
		if (diff !== renderCache.diff || !areRenderOptionsEqual(options, renderCache.options)) return {
			options,
			forceRender: true
		};
		return {
			options,
			forceRender: false
		};
	}
	renderDiff(diff = this.renderCache?.diff, renderRange = DEFAULT_RENDER_RANGE) {
		if (diff == null) return;
		const { expandUnchanged = false, collapsedContextThreshold } = this.getOptionsWithDefaults();
		const cache = this.workerManager?.getDiffResultCache(diff);
		if (cache != null && this.renderCache == null) this.renderCache = {
			diff,
			highlighted: true,
			renderRange: void 0,
			...cache
		};
		const { options, forceRender } = this.getRenderOptions(diff);
		this.renderCache ??= {
			diff,
			highlighted: false,
			options,
			result: void 0,
			renderRange: void 0
		};
		if (this.workerManager?.isWorkingPool() === true) {
			if (this.renderCache.result == null || !this.renderCache.highlighted && (diff !== this.renderCache.diff || !areRenderRangesEqual(this.renderCache.renderRange, renderRange))) {
				this.renderCache.diff = diff;
				this.renderCache.result = this.workerManager.getPlainDiffAST(diff, renderRange.startingLine, renderRange.totalLines, isDefaultRenderRange(renderRange) ? true : expandUnchanged ? true : this.expandedHunks, collapsedContextThreshold);
				this.renderCache.renderRange = renderRange;
			}
			if (renderRange.totalLines > 0 && (!this.renderCache.highlighted || forceRender)) this.workerManager.highlightDiffAST(this, diff);
		} else {
			this.computedLang = diff.lang ?? getFiletypeFromFileName(diff.name);
			const hasThemes = this.highlighter != null && areThemesAttached(options.theme);
			const hasLangs = this.highlighter != null && areLanguagesAttached(this.computedLang);
			if (this.highlighter != null && hasThemes && (forceRender || !this.renderCache.highlighted && hasLangs || this.renderCache.result == null)) {
				const { result, options: options$1 } = this.renderDiffWithHighlighter(diff, this.highlighter, !hasLangs);
				this.renderCache = {
					diff,
					options: options$1,
					highlighted: hasLangs,
					result,
					renderRange: void 0
				};
			}
			if (!hasThemes || !hasLangs) this.asyncHighlight(diff).then(({ result, options: options$1 }) => {
				this.onHighlightSuccess(diff, result, options$1);
			});
		}
		return this.renderCache.result != null ? this.processDiffResult(this.renderCache.diff, renderRange, this.renderCache.result) : void 0;
	}
	async asyncRender(diff, renderRange = DEFAULT_RENDER_RANGE) {
		const { result } = await this.asyncHighlight(diff);
		return this.processDiffResult(diff, renderRange, result);
	}
	createPreElement(split, totalLines, customProperties) {
		const { diffIndicators, disableBackground, disableLineNumbers, overflow } = this.getOptionsWithDefaults();
		return createPreElement({
			type: "diff",
			diffIndicators,
			disableBackground,
			disableLineNumbers,
			overflow,
			split,
			totalLines,
			customProperties
		});
	}
	async asyncHighlight(diff) {
		this.computedLang = diff.lang ?? getFiletypeFromFileName(diff.name);
		const hasThemes = this.highlighter != null && areThemesAttached(this.options.theme ?? DEFAULT_THEMES);
		const hasLangs = this.highlighter != null && areLanguagesAttached(this.computedLang);
		if (this.highlighter == null || !hasThemes || !hasLangs) this.highlighter = await this.initializeHighlighter();
		return this.renderDiffWithHighlighter(diff, this.highlighter);
	}
	renderDiffWithHighlighter(diff, highlighter$1, forcePlainText = false) {
		const { options } = this.getRenderOptions(diff);
		const { collapsedContextThreshold } = this.getOptionsWithDefaults();
		return {
			result: renderDiffWithHighlighter(diff, highlighter$1, options, {
				forcePlainText,
				expandedHunks: forcePlainText ? true : void 0,
				collapsedContextThreshold
			}),
			options
		};
	}
	onHighlightSuccess(diff, result, options) {
		if (this.renderCache == null) return;
		const triggerRenderUpdate = !this.renderCache.highlighted || !areRenderOptionsEqual(this.renderCache.options, options) || this.renderCache.diff !== diff;
		this.renderCache = {
			diff,
			options,
			highlighted: true,
			result,
			renderRange: void 0
		};
		if (triggerRenderUpdate) this.onRenderUpdate?.();
	}
	onHighlightError(error) {
		console.error(error);
	}
	processDiffResult(fileDiff, renderRange, { code, themeStyles, baseThemeType }) {
		const { diffStyle, disableFileHeader, expandUnchanged, expansionLineCount, collapsedContextThreshold, hunkSeparators } = this.getOptionsWithDefaults();
		this.diff = fileDiff;
		const unified = diffStyle === "unified";
		let additionsContentAST = [];
		let deletionsContentAST = [];
		let unifiedContentAST = [];
		const hunkData = [];
		const { additionLines, deletionLines } = code;
		const context = {
			rowCount: 0,
			hunkSeparators,
			additionsContentAST,
			deletionsContentAST,
			unifiedContentAST,
			unifiedGutterAST: createGutterWrapper(),
			deletionsGutterAST: createGutterWrapper(),
			additionsGutterAST: createGutterWrapper(),
			expansionLineCount,
			hunkData,
			incrementRowCount(count = 1) {
				context.rowCount += count;
			},
			pushToGutter(type, element) {
				switch (type) {
					case "unified":
						context.unifiedGutterAST.children.push(element);
						break;
					case "deletions":
						context.deletionsGutterAST.children.push(element);
						break;
					case "additions":
						context.additionsGutterAST.children.push(element);
						break;
				}
			}
		};
		const trailingRangeSize = calculateTrailingRangeSize(fileDiff);
		const pendingSplitContext = {
			size: 0,
			side: void 0,
			increment() {
				this.size += 1;
			},
			flush() {
				if (diffStyle === "unified") return;
				if (this.size <= 0 || this.side == null) {
					this.side = void 0;
					this.size = 0;
					return;
				}
				if (this.side === "additions") {
					context.pushToGutter("additions", createGutterGap(void 0, "buffer", this.size));
					additionsContentAST?.push(createEmptyRowBuffer(this.size));
				} else {
					context.pushToGutter("deletions", createGutterGap(void 0, "buffer", this.size));
					deletionsContentAST?.push(createEmptyRowBuffer(this.size));
				}
				this.size = 0;
				this.side = void 0;
			}
		};
		const pushGutterLineNumber = (type, lineType, lineNumber, lineIndex, gutterProperties) => {
			context.pushToGutter(type, createGutterItem(lineType, lineNumber, lineIndex, gutterProperties));
		};
		function pushSeparators(props) {
			pendingSplitContext.flush();
			if (diffStyle === "unified") pushSeparator("unified", props, context);
			else {
				pushSeparator("deletions", props, context);
				pushSeparator("additions", props, context);
			}
		}
		iterateOverDiff({
			diff: fileDiff,
			diffStyle,
			startingLine: renderRange.startingLine,
			totalLines: renderRange.totalLines,
			expandedHunks: expandUnchanged ? true : this.expandedHunks,
			collapsedContextThreshold,
			callback: ({ hunkIndex, hunk, collapsedBefore, collapsedAfter, additionLine, deletionLine, type }) => {
				const splitLineIndex = deletionLine != null ? deletionLine.splitLineIndex : additionLine.splitLineIndex;
				const unifiedLineIndex = additionLine != null ? additionLine.unifiedLineIndex : deletionLine.unifiedLineIndex;
				if (diffStyle === "split" && type !== "change") pendingSplitContext.flush();
				if (collapsedBefore > 0) pushSeparators({
					hunkIndex,
					collapsedLines: collapsedBefore,
					rangeSize: Math.max(hunk?.collapsedBefore ?? 0, 0),
					hunkSpecs: hunk?.hunkSpecs,
					isFirstHunk: hunkIndex === 0,
					isLastHunk: false,
					isExpandable: !fileDiff.isPartial
				});
				const lineIndex = diffStyle === "unified" ? unifiedLineIndex : splitLineIndex;
				const renderedLineContext = {
					type,
					hunkIndex,
					lineIndex,
					unifiedLineIndex,
					splitLineIndex,
					deletionLine,
					additionLine
				};
				if (diffStyle === "unified") {
					const injectedRows = this.getUnifiedInjectedRowsForLine?.(renderedLineContext);
					if (injectedRows?.before != null) pushUnifiedInjectedRows(injectedRows.before, context);
					let deletionLineContent = deletionLine != null ? deletionLines[deletionLine.lineIndex] : void 0;
					let additionLineContent = additionLine != null ? additionLines[additionLine.lineIndex] : void 0;
					if (deletionLineContent == null && additionLineContent == null) {
						const errorMessage = "DiffHunksRenderer.processDiffResult: deletionLine and additionLine are null, something is wrong";
						console.error(errorMessage, { file: fileDiff.name });
						throw new Error(errorMessage);
					}
					const lineType = type === "change" ? additionLine != null ? "change-addition" : "change-deletion" : type;
					const lineDecoration = this.getUnifiedLineDecoration({
						type,
						lineType,
						additionLineIndex: additionLine?.lineIndex,
						deletionLineIndex: deletionLine?.lineIndex
					});
					pushGutterLineNumber("unified", lineDecoration.gutterLineType, additionLine != null ? additionLine.lineNumber : deletionLine.lineNumber, `${unifiedLineIndex},${splitLineIndex}`, lineDecoration.gutterProperties);
					if (additionLineContent != null) additionLineContent = withContentProperties(additionLineContent, lineDecoration.contentProperties);
					else if (deletionLineContent != null) deletionLineContent = withContentProperties(deletionLineContent, lineDecoration.contentProperties);
					pushLineWithAnnotation({
						diffStyle: "unified",
						type,
						deletionLine: deletionLineContent,
						additionLine: additionLineContent,
						unifiedSpan: this.getAnnotations("unified", deletionLine?.lineNumber, additionLine?.lineNumber, hunkIndex, lineIndex),
						createAnnotationElement: (span) => this.createAnnotationElement(span),
						context
					});
					if (injectedRows?.after != null) pushUnifiedInjectedRows(injectedRows.after, context);
				} else {
					const injectedRows = this.getSplitInjectedRowsForLine?.(renderedLineContext);
					if (injectedRows?.before != null) pushSplitInjectedRows(injectedRows.before, context, pendingSplitContext);
					let deletionLineContent = deletionLine != null ? deletionLines[deletionLine.lineIndex] : void 0;
					let additionLineContent = additionLine != null ? additionLines[additionLine.lineIndex] : void 0;
					const deletionLineDecoration = this.getSplitLineDecoration({
						side: "deletions",
						type,
						lineIndex: deletionLine?.lineIndex
					});
					const additionLineDecoration = this.getSplitLineDecoration({
						side: "additions",
						type,
						lineIndex: additionLine?.lineIndex
					});
					if (deletionLineContent == null && additionLineContent == null) {
						const errorMessage = "DiffHunksRenderer.processDiffResult: deletionLine and additionLine are null, something is wrong";
						console.error(errorMessage, { file: fileDiff.name });
						throw new Error(errorMessage);
					}
					const missingSide = (() => {
						if (type === "change") {
							if (additionLineContent == null) return "additions";
							else if (deletionLineContent == null) return "deletions";
						}
					})();
					if (missingSide != null) {
						if (pendingSplitContext.side != null && pendingSplitContext.side !== missingSide) throw new Error("DiffHunksRenderer.processDiffResult: iterateOverDiff, invalid pending splits");
						pendingSplitContext.side = missingSide;
						pendingSplitContext.increment();
					}
					const annotationSpans = this.getAnnotations("split", deletionLine?.lineNumber, additionLine?.lineNumber, hunkIndex, lineIndex);
					if (annotationSpans != null && pendingSplitContext.size > 0) pendingSplitContext.flush();
					if (deletionLine != null) {
						const deletionLineDecorated = withContentProperties(deletionLineContent, deletionLineDecoration.contentProperties);
						pushGutterLineNumber("deletions", deletionLineDecoration.gutterLineType, deletionLine.lineNumber, `${deletionLine.unifiedLineIndex},${splitLineIndex}`, deletionLineDecoration.gutterProperties);
						if (deletionLineDecorated != null) deletionLineContent = deletionLineDecorated;
					}
					if (additionLine != null) {
						const additionLineDecorated = withContentProperties(additionLineContent, additionLineDecoration.contentProperties);
						pushGutterLineNumber("additions", additionLineDecoration.gutterLineType, additionLine.lineNumber, `${additionLine.unifiedLineIndex},${splitLineIndex}`, additionLineDecoration.gutterProperties);
						if (additionLineDecorated != null) additionLineContent = additionLineDecorated;
					}
					pushLineWithAnnotation({
						diffStyle: "split",
						type,
						additionLine: additionLineContent,
						deletionLine: deletionLineContent,
						...annotationSpans,
						createAnnotationElement: (span) => this.createAnnotationElement(span),
						context
					});
					if (injectedRows?.after != null) pushSplitInjectedRows(injectedRows.after, context, pendingSplitContext);
				}
				const noEOFCRDeletion = deletionLine?.noEOFCR ?? false;
				const noEOFCRAddition = additionLine?.noEOFCR ?? false;
				if (noEOFCRAddition || noEOFCRDeletion) {
					if (noEOFCRDeletion) {
						const noEOFType = type === "context" || type === "context-expanded" ? type : "change-deletion";
						if (diffStyle === "unified") {
							context.unifiedContentAST.push(createNoNewlineElement(noEOFType));
							context.pushToGutter("unified", createGutterGap(noEOFType, "metadata", 1));
						} else {
							context.deletionsContentAST.push(createNoNewlineElement(noEOFType));
							context.pushToGutter("deletions", createGutterGap(noEOFType, "metadata", 1));
							if (!noEOFCRAddition) {
								context.pushToGutter("additions", createGutterGap(void 0, "buffer", 1));
								context.additionsContentAST.push(createEmptyRowBuffer(1));
							}
						}
					}
					if (noEOFCRAddition) {
						const noEOFType = type === "context" || type === "context-expanded" ? type : "change-addition";
						if (diffStyle === "unified") {
							context.unifiedContentAST.push(createNoNewlineElement(noEOFType));
							context.pushToGutter("unified", createGutterGap(noEOFType, "metadata", 1));
						} else {
							context.additionsContentAST.push(createNoNewlineElement(noEOFType));
							context.pushToGutter("additions", createGutterGap(noEOFType, "metadata", 1));
							if (!noEOFCRDeletion) {
								context.pushToGutter("deletions", createGutterGap(void 0, "buffer", 1));
								context.deletionsContentAST.push(createEmptyRowBuffer(1));
							}
						}
					}
					context.incrementRowCount(1);
				}
				if (collapsedAfter > 0 && hunkSeparators !== "simple") pushSeparators({
					hunkIndex: type === "context-expanded" ? hunkIndex : hunkIndex + 1,
					collapsedLines: collapsedAfter,
					rangeSize: trailingRangeSize,
					hunkSpecs: void 0,
					isFirstHunk: false,
					isLastHunk: true,
					isExpandable: !fileDiff.isPartial
				});
				context.incrementRowCount(1);
			}
		});
		if (diffStyle === "split") pendingSplitContext.flush();
		const totalLines = Math.max(getTotalLineCountFromHunks(fileDiff.hunks), fileDiff.additionLines.length ?? 0, fileDiff.deletionLines.length ?? 0);
		const hasBuffer = renderRange.bufferBefore > 0 || renderRange.bufferAfter > 0;
		const shouldIncludeAdditions = !unified && fileDiff.type !== "deleted";
		const shouldIncludeDeletions = !unified && fileDiff.type !== "new";
		const hasContent = context.rowCount > 0 || hasBuffer;
		additionsContentAST = shouldIncludeAdditions && hasContent ? additionsContentAST : void 0;
		deletionsContentAST = shouldIncludeDeletions && hasContent ? deletionsContentAST : void 0;
		unifiedContentAST = unified && hasContent ? unifiedContentAST : void 0;
		const preNode = this.createPreElement(deletionsContentAST != null && additionsContentAST != null, totalLines);
		return {
			unifiedGutterAST: unified && hasContent ? context.unifiedGutterAST.children : void 0,
			unifiedContentAST,
			deletionsGutterAST: shouldIncludeDeletions && hasContent ? context.deletionsGutterAST.children : void 0,
			deletionsContentAST,
			additionsGutterAST: shouldIncludeAdditions && hasContent ? context.additionsGutterAST.children : void 0,
			additionsContentAST,
			hunkData,
			preNode,
			themeStyles,
			baseThemeType,
			headerElement: !disableFileHeader ? this.renderHeader(this.diff) : void 0,
			totalLines,
			rowCount: context.rowCount,
			bufferBefore: renderRange.bufferBefore,
			bufferAfter: renderRange.bufferAfter,
			css: ""
		};
	}
	renderCodeAST(type, result) {
		const gutterAST = type === "unified" ? result.unifiedGutterAST : type === "deletions" ? result.deletionsGutterAST : result.additionsGutterAST;
		const contentAST = type === "unified" ? result.unifiedContentAST : type === "deletions" ? result.deletionsContentAST : result.additionsContentAST;
		if (gutterAST == null || contentAST == null) return;
		const gutter = createGutterWrapper(gutterAST);
		gutter.properties.style = `grid-row: span ${result.rowCount}`;
		return [gutter, createContentColumn(contentAST, result.rowCount)];
	}
	renderFullAST(result, children = []) {
		const containerSize = this.getOptionsWithDefaults().hunkSeparators === "line-info";
		const unifiedAST = this.renderCodeAST("unified", result);
		if (unifiedAST != null) {
			children.push(createHastElement({
				tagName: "code",
				children: unifiedAST,
				properties: {
					"data-code": "",
					"data-container-size": containerSize ? "" : void 0,
					"data-unified": ""
				}
			}));
			return {
				...result.preNode,
				children
			};
		}
		const deletionsAST = this.renderCodeAST("deletions", result);
		if (deletionsAST != null) children.push(createHastElement({
			tagName: "code",
			children: deletionsAST,
			properties: {
				"data-code": "",
				"data-container-size": containerSize ? "" : void 0,
				"data-deletions": ""
			}
		}));
		const additionsAST = this.renderCodeAST("additions", result);
		if (additionsAST != null) children.push(createHastElement({
			tagName: "code",
			children: additionsAST,
			properties: {
				"data-code": "",
				"data-container-size": containerSize ? "" : void 0,
				"data-additions": ""
			}
		}));
		return {
			...result.preNode,
			children
		};
	}
	renderFullHTML(result, tempChildren = []) {
		return toHtml(this.renderFullAST(result, tempChildren));
	}
	renderPartialHTML(children, columnType) {
		if (columnType == null) return toHtml(children);
		return toHtml(createHastElement({
			tagName: "code",
			children,
			properties: {
				"data-code": "",
				"data-container-size": this.getOptionsWithDefaults().hunkSeparators === "line-info" ? "" : void 0,
				[`data-${columnType}`]: ""
			}
		}));
	}
	getAnnotations(type, deletionLineNumber, additionLineNumber, hunkIndex, lineIndex) {
		const deletionSpan = {
			type: "annotation",
			hunkIndex,
			lineIndex,
			annotations: []
		};
		if (deletionLineNumber != null) for (const anno of this.deletionAnnotations[deletionLineNumber] ?? []) deletionSpan.annotations.push(getLineAnnotationName(anno));
		const additionSpan = {
			type: "annotation",
			hunkIndex,
			lineIndex,
			annotations: []
		};
		if (additionLineNumber != null) for (const anno of this.additionAnnotations[additionLineNumber] ?? []) (type === "unified" ? deletionSpan : additionSpan).annotations.push(getLineAnnotationName(anno));
		if (type === "unified") {
			if (deletionSpan.annotations.length > 0) return deletionSpan;
			return;
		}
		if (additionSpan.annotations.length === 0 && deletionSpan.annotations.length === 0) return;
		return {
			deletionSpan,
			additionSpan
		};
	}
	renderHeader(diff) {
		const { headerRenderMode } = this.getOptionsWithDefaults();
		return createFileHeaderElement({
			fileOrDiff: diff,
			mode: headerRenderMode
		});
	}
};
function areRenderOptionsEqual(optionsA, optionsB) {
	return areThemesEqual(optionsA.theme, optionsB.theme) && optionsA.tokenizeMaxLineLength === optionsB.tokenizeMaxLineLength && optionsA.lineDiffType === optionsB.lineDiffType;
}
function getModifiedLinesString(lines) {
	return `${lines} unmodified line${lines > 1 ? "s" : ""}`;
}
function pushUnifiedInjectedRows(rows, context) {
	for (const row of rows) {
		context.unifiedContentAST.push(row.content);
		context.pushToGutter("unified", row.gutter);
		context.incrementRowCount(1);
	}
}
function pushSplitInjectedRows(rows, context, pendingSplitContext) {
	for (const { deletion, addition } of rows) {
		if (deletion == null && addition == null) continue;
		const missingSide = deletion != null && addition != null ? void 0 : deletion == null ? "deletions" : "additions";
		if (missingSide == null || pendingSplitContext.side !== missingSide) pendingSplitContext.flush();
		if (deletion != null) {
			context.deletionsContentAST.push(deletion.content);
			context.pushToGutter("deletions", deletion.gutter);
		}
		if (addition != null) {
			context.additionsContentAST.push(addition.content);
			context.pushToGutter("additions", addition.gutter);
		}
		if (missingSide != null) {
			pendingSplitContext.side = missingSide;
			pendingSplitContext.increment();
		}
		context.incrementRowCount(1);
	}
}
function pushLineWithAnnotation({ diffStyle, type, deletionLine, additionLine, unifiedSpan, deletionSpan, additionSpan, createAnnotationElement: createAnnotationElement$1, context }) {
	let hasAnnotationRow = false;
	if (diffStyle === "unified") {
		if (additionLine != null) context.unifiedContentAST.push(additionLine);
		else if (deletionLine != null) context.unifiedContentAST.push(deletionLine);
		if (unifiedSpan != null) {
			const lineType = type === "change" ? deletionLine != null ? "change-deletion" : "change-addition" : type;
			context.unifiedContentAST.push(createAnnotationElement$1(unifiedSpan));
			context.pushToGutter("unified", createGutterGap(lineType, "annotation", 1));
			hasAnnotationRow = true;
		}
	} else if (diffStyle === "split") {
		if (deletionLine != null) context.deletionsContentAST.push(deletionLine);
		if (additionLine != null) context.additionsContentAST.push(additionLine);
		if (deletionSpan != null) {
			const lineType = type === "change" ? deletionLine != null ? "change-deletion" : "context" : type;
			context.deletionsContentAST.push(createAnnotationElement$1(deletionSpan));
			context.pushToGutter("deletions", createGutterGap(lineType, "annotation", 1));
			hasAnnotationRow = true;
		}
		if (additionSpan != null) {
			const lineType = type === "change" ? additionLine != null ? "change-addition" : "context" : type;
			context.additionsContentAST.push(createAnnotationElement$1(additionSpan));
			context.pushToGutter("additions", createGutterGap(lineType, "annotation", 1));
			hasAnnotationRow = true;
		}
	}
	if (hasAnnotationRow) context.incrementRowCount(1);
}
function pushSeparator(type, { hunkIndex, collapsedLines, rangeSize, hunkSpecs, isFirstHunk, isLastHunk, isExpandable }, context) {
	if (collapsedLines <= 0) return;
	const linesAST = type === "unified" ? context.unifiedContentAST : type === "deletions" ? context.deletionsContentAST : context.additionsContentAST;
	if (context.hunkSeparators === "metadata") {
		if (hunkSpecs != null) {
			context.pushToGutter(type, createSeparator({
				type: "metadata",
				content: hunkSpecs,
				isFirstHunk,
				isLastHunk
			}));
			linesAST.push(createSeparator({
				type: "metadata",
				content: hunkSpecs,
				isFirstHunk,
				isLastHunk
			}));
			if (type !== "additions") context.incrementRowCount(1);
		}
		return;
	}
	if (context.hunkSeparators === "simple") {
		if (hunkIndex > 0) {
			context.pushToGutter(type, createSeparator({
				type: "simple",
				isFirstHunk,
				isLastHunk: false
			}));
			linesAST.push(createSeparator({
				type: "simple",
				isFirstHunk,
				isLastHunk: false
			}));
			if (type !== "additions") context.incrementRowCount(1);
		}
		return;
	}
	const slotName = getHunkSeparatorSlotName(type, hunkIndex);
	const chunked = rangeSize > context.expansionLineCount;
	const expandIndex = isExpandable ? hunkIndex : void 0;
	context.pushToGutter(type, createSeparator({
		type: context.hunkSeparators,
		content: getModifiedLinesString(collapsedLines),
		expandIndex,
		chunked,
		slotName,
		isFirstHunk,
		isLastHunk
	}));
	linesAST.push(createSeparator({
		type: context.hunkSeparators,
		content: getModifiedLinesString(collapsedLines),
		expandIndex,
		chunked,
		slotName,
		isFirstHunk,
		isLastHunk
	}));
	if (type !== "additions") context.incrementRowCount(1);
	context.hunkData.push({
		slotName,
		hunkIndex,
		lines: collapsedLines,
		type,
		expandable: isExpandable ? {
			up: !isFirstHunk,
			down: !isLastHunk,
			chunked
		} : void 0
	});
}
function withContentProperties(lineNode, contentProperties) {
	if (lineNode == null || lineNode.type !== "element" || contentProperties == null) return lineNode;
	return {
		...lineNode,
		properties: {
			...lineNode.properties,
			...contentProperties
		}
	};
}
function calculateTrailingRangeSize(fileDiff) {
	const lastHunk = fileDiff.hunks.at(-1);
	if (lastHunk == null || fileDiff.isPartial || fileDiff.additionLines.length === 0 || fileDiff.deletionLines.length === 0) return 0;
	const additionRemaining = fileDiff.additionLines.length - (lastHunk.additionLineIndex + lastHunk.additionCount);
	const deletionRemaining = fileDiff.deletionLines.length - (lastHunk.deletionLineIndex + lastHunk.deletionCount);
	if (additionRemaining !== deletionRemaining) throw new Error(`DiffHunksRenderer.processDiffResult: trailing context mismatch (additions=${additionRemaining}, deletions=${deletionRemaining}) for ${fileDiff.name}`);
	return Math.min(additionRemaining, deletionRemaining);
}
function areDiffLineAnnotationsEqual(annotationA, annotationB) {
	return annotationA.lineNumber === annotationB.lineNumber && annotationA.side === annotationB.side && annotationA.metadata === annotationB.metadata;
}
function areHunkDataEqual(hunkA, hunkB) {
	return hunkA.slotName === hunkB.slotName && hunkA.hunkIndex === hunkB.hunkIndex && hunkA.lines === hunkB.lines && hunkA.type === hunkB.type && hunkA.expandable?.chunked === hunkB.expandable?.chunked && hunkA.expandable?.up === hunkB.expandable?.up && hunkA.expandable?.down === hunkB.expandable?.down;
}
function parseLineType(line) {
	const firstChar = line[0];
	if (firstChar !== "+" && firstChar !== "-" && firstChar !== " " && firstChar !== "\\") {
		console.error(`parseLineType: Invalid firstChar: "${firstChar}", full line: "${line}"`);
		return;
	}
	const processedLine = line.substring(1);
	return {
		line: processedLine === "" ? "\n" : processedLine,
		type: firstChar === " " ? "context" : firstChar === "\\" ? "metadata" : firstChar === "+" ? "addition" : "deletion"
	};
}
function processFile(fileDiffString, { cacheKey, isGitDiff = GIT_DIFF_FILE_BREAK_REGEX.test(fileDiffString), oldFile, newFile, throwOnError = false } = {}) {
	let lastHunkEnd = 0;
	const hunks = fileDiffString.split(FILE_CONTEXT_BLOB);
	let currentFile;
	const isPartial = oldFile == null || newFile == null;
	let deletionLineIndex = 0;
	let additionLineIndex = 0;
	for (const hunk of hunks) {
		const lines = hunk.split(SPLIT_WITH_NEWLINES);
		const firstLine = lines.shift();
		if (firstLine == null) {
			if (throwOnError) throw Error("parsePatchContent: invalid hunk");
			else console.error("parsePatchContent: invalid hunk", hunk);
			continue;
		}
		const fileHeaderMatch = firstLine.match(HUNK_HEADER);
		let additionLines = 0;
		let deletionLines = 0;
		if (fileHeaderMatch == null || currentFile == null) {
			if (currentFile != null) {
				if (throwOnError) throw Error("parsePatchContent: Invalid hunk");
				else console.error("parsePatchContent: Invalid hunk", hunk);
				continue;
			}
			currentFile = {
				name: "",
				type: "change",
				hunks: [],
				splitLineCount: 0,
				unifiedLineCount: 0,
				isPartial,
				additionLines: !isPartial && oldFile != null && newFile != null ? newFile.contents.split(SPLIT_WITH_NEWLINES) : [],
				deletionLines: !isPartial && oldFile != null && newFile != null ? oldFile.contents.split(SPLIT_WITH_NEWLINES) : [],
				cacheKey
			};
			if (currentFile.additionLines.length === 1 && newFile?.contents === "") currentFile.additionLines.length = 0;
			if (currentFile.deletionLines.length === 1 && oldFile?.contents === "") currentFile.deletionLines.length = 0;
			lines.unshift(firstLine);
			for (const line of lines) {
				const filenameMatch = line.match(isGitDiff ? FILENAME_HEADER_REGEX_GIT : FILENAME_HEADER_REGEX);
				if (line.startsWith("diff --git")) {
					const [, , prevName, , name] = line.trim().match(ALTERNATE_FILE_NAMES_GIT) ?? [];
					currentFile.name = name.trim();
					if (prevName !== name) currentFile.prevName = prevName.trim();
				} else if (filenameMatch != null) {
					const [, type, fileName] = filenameMatch;
					if (type === "---" && fileName !== "/dev/null") {
						currentFile.prevName = fileName.trim();
						currentFile.name = fileName.trim();
					} else if (type === "+++" && fileName !== "/dev/null") currentFile.name = fileName.trim();
				} else if (isGitDiff) {
					if (line.startsWith("new mode ")) currentFile.mode = line.replace("new mode", "").trim();
					if (line.startsWith("old mode ")) currentFile.prevMode = line.replace("old mode", "").trim();
					if (line.startsWith("new file mode")) {
						currentFile.type = "new";
						currentFile.mode = line.replace("new file mode", "").trim();
					}
					if (line.startsWith("deleted file mode")) {
						currentFile.type = "deleted";
						currentFile.mode = line.replace("deleted file mode", "").trim();
					}
					if (line.startsWith("similarity index")) if (line.startsWith("similarity index 100%")) currentFile.type = "rename-pure";
					else currentFile.type = "rename-changed";
					if (line.startsWith("index ")) {
						const [, prevObjectId, newObjectId, mode] = line.trim().match(INDEX_LINE_METADATA) ?? [];
						if (prevObjectId != null) currentFile.prevObjectId = prevObjectId;
						if (newObjectId != null) currentFile.newObjectId = newObjectId;
						if (mode != null) currentFile.mode = mode;
					}
					if (line.startsWith("rename from ")) currentFile.prevName = line.replace("rename from ", "").trim();
					if (line.startsWith("rename to ")) currentFile.name = line.replace("rename to ", "").trim();
				}
			}
			continue;
		}
		let currentContent;
		let lastLineType;
		while (lines.length > 0 && (lines[lines.length - 1] === "\n" || lines[lines.length - 1] === "\r" || lines[lines.length - 1] === "\r\n" || lines[lines.length - 1] === "")) lines.pop();
		const additionStart = parseInt(fileHeaderMatch[3]);
		const deletionStart = parseInt(fileHeaderMatch[1]);
		deletionLineIndex = isPartial ? deletionLineIndex : deletionStart - 1;
		additionLineIndex = isPartial ? additionLineIndex : additionStart - 1;
		const hunkData = {
			collapsedBefore: 0,
			splitLineCount: 0,
			splitLineStart: 0,
			unifiedLineCount: 0,
			unifiedLineStart: 0,
			additionCount: parseInt(fileHeaderMatch[4] ?? "1"),
			additionStart,
			additionLines,
			deletionCount: parseInt(fileHeaderMatch[2] ?? "1"),
			deletionStart,
			deletionLines,
			deletionLineIndex,
			additionLineIndex,
			hunkContent: [],
			hunkContext: fileHeaderMatch[5],
			hunkSpecs: firstLine,
			noEOFCRAdditions: false,
			noEOFCRDeletions: false
		};
		if (isNaN(hunkData.additionCount) || isNaN(hunkData.deletionCount) || isNaN(hunkData.additionStart) || isNaN(hunkData.deletionStart)) {
			if (throwOnError) throw Error("parsePatchContent: invalid hunk metadata");
			else console.error("parsePatchContent: invalid hunk metadata", hunkData);
			continue;
		}
		for (const rawLine of lines) {
			const parsedLine = parseLineType(rawLine);
			if (parsedLine == null) {
				console.error("processFile: invalid rawLine:", rawLine);
				continue;
			}
			const { type, line } = parsedLine;
			if (type === "addition") {
				if (currentContent == null || currentContent.type !== "change") {
					currentContent = createContentGroup("change", deletionLineIndex, additionLineIndex);
					hunkData.hunkContent.push(currentContent);
				}
				additionLineIndex++;
				if (isPartial) currentFile.additionLines.push(line);
				currentContent.additions++;
				additionLines++;
				lastLineType = "addition";
			} else if (type === "deletion") {
				if (currentContent == null || currentContent.type !== "change") {
					currentContent = createContentGroup("change", deletionLineIndex, additionLineIndex);
					hunkData.hunkContent.push(currentContent);
				}
				deletionLineIndex++;
				if (isPartial) currentFile.deletionLines.push(line);
				currentContent.deletions++;
				deletionLines++;
				lastLineType = "deletion";
			} else if (type === "context") {
				if (currentContent == null || currentContent.type !== "context") {
					currentContent = createContentGroup("context", deletionLineIndex, additionLineIndex);
					hunkData.hunkContent.push(currentContent);
				}
				additionLineIndex++;
				deletionLineIndex++;
				if (isPartial) {
					currentFile.deletionLines.push(line);
					currentFile.additionLines.push(line);
				}
				currentContent.lines++;
				lastLineType = "context";
			} else if (type === "metadata" && currentContent != null) {
				if (currentContent.type === "context") {
					hunkData.noEOFCRAdditions = true;
					hunkData.noEOFCRDeletions = true;
				} else if (lastLineType === "deletion") hunkData.noEOFCRDeletions = true;
				else if (lastLineType === "addition") hunkData.noEOFCRAdditions = true;
				if (isPartial && (lastLineType === "addition" || lastLineType === "context")) {
					const lastIndex = currentFile.additionLines.length - 1;
					if (lastIndex >= 0) currentFile.additionLines[lastIndex] = cleanLastNewline(currentFile.additionLines[lastIndex]);
				}
				if (isPartial && (lastLineType === "deletion" || lastLineType === "context")) {
					const lastIndex = currentFile.deletionLines.length - 1;
					if (lastIndex >= 0) currentFile.deletionLines[lastIndex] = cleanLastNewline(currentFile.deletionLines[lastIndex]);
				}
			}
		}
		hunkData.additionLines = additionLines;
		hunkData.deletionLines = deletionLines;
		hunkData.collapsedBefore = Math.max(hunkData.additionStart - 1 - lastHunkEnd, 0);
		currentFile.hunks.push(hunkData);
		lastHunkEnd = hunkData.additionStart + hunkData.additionCount - 1;
		for (const content of hunkData.hunkContent) if (content.type === "context") {
			hunkData.splitLineCount += content.lines;
			hunkData.unifiedLineCount += content.lines;
		} else {
			hunkData.splitLineCount += Math.max(content.additions, content.deletions);
			hunkData.unifiedLineCount += content.deletions + content.additions;
		}
		hunkData.splitLineStart = currentFile.splitLineCount + hunkData.collapsedBefore;
		hunkData.unifiedLineStart = currentFile.unifiedLineCount + hunkData.collapsedBefore;
		currentFile.splitLineCount += hunkData.collapsedBefore + hunkData.splitLineCount;
		currentFile.unifiedLineCount += hunkData.collapsedBefore + hunkData.unifiedLineCount;
	}
	if (currentFile == null) return;
	if (currentFile.hunks.length > 0 && !isPartial && currentFile.additionLines.length > 0 && currentFile.deletionLines.length > 0) {
		const lastHunk = currentFile.hunks[currentFile.hunks.length - 1];
		const lastHunkEnd$1 = lastHunk.additionStart + lastHunk.additionCount - 1;
		const totalFileLines = currentFile.additionLines.length;
		const collapsedAfter = Math.max(totalFileLines - lastHunkEnd$1, 0);
		currentFile.splitLineCount += collapsedAfter;
		currentFile.unifiedLineCount += collapsedAfter;
	}
	if (!isGitDiff) {
		if (currentFile.prevName != null && currentFile.name !== currentFile.prevName) if (currentFile.hunks.length > 0) currentFile.type = "rename-changed";
		else currentFile.type = "rename-pure";
		else if (newFile != null && newFile.contents === "") currentFile.type = "deleted";
		else if (oldFile != null && oldFile.contents === "") currentFile.type = "new";
	}
	if (currentFile.type !== "rename-pure" && currentFile.type !== "rename-changed") currentFile.prevName = void 0;
	return currentFile;
}
function createContentGroup(type, deletionLineIndex, additionLineIndex) {
	if (type === "change") return {
		type: "change",
		additions: 0,
		deletions: 0,
		additionLineIndex,
		deletionLineIndex
	};
	return {
		type: "context",
		lines: 0,
		additionLineIndex,
		deletionLineIndex
	};
}
function parseDiffFromFile(oldFile, newFile, options, throwOnError = false) {
	const fileData = processFile(createTwoFilesPatch(oldFile.name, newFile.name, oldFile.contents, newFile.contents, oldFile.header, newFile.header, options), {
		cacheKey: (() => {
			if (oldFile.cacheKey != null && newFile.cacheKey != null) return `${oldFile.cacheKey}:${newFile.cacheKey}`;
		})(),
		oldFile,
		newFile,
		throwOnError
	});
	if (fileData == null) throw new Error("parseDiffFrom: FileInvalid diff -- probably need to fix something -- if the files are the same maybe?");
	return fileData;
}
var instanceId$1 = -1;
var FileDiff$1 = class {
	static LoadedCustomComponent = true;
	__id = `file-diff:${++instanceId$1}`;
	fileContainer;
	spriteSVG;
	pre;
	codeUnified;
	codeDeletions;
	codeAdditions;
	bufferBefore;
	bufferAfter;
	themeCSSStyle;
	appliedThemeCSS;
	unsafeCSSStyle;
	appliedUnsafeCSS;
	gutterUtilityContent;
	headerElement;
	headerPrefix;
	headerMetadata;
	headerCustom;
	separatorCache = /* @__PURE__ */ new Map();
	errorWrapper;
	placeHolder;
	hunksRenderer;
	resizeManager;
	scrollSyncManager;
	interactionManager;
	annotationCache = /* @__PURE__ */ new Map();
	lineAnnotations = [];
	deletionFile;
	additionFile;
	fileDiff;
	renderRange;
	appliedPreAttributes;
	lastRenderedHeaderHTML;
	lastRowCount;
	enabled = true;
	constructor(options = { theme: DEFAULT_THEMES }, workerManager, isContainerManaged = false) {
		this.options = options;
		this.workerManager = workerManager;
		this.isContainerManaged = isContainerManaged;
		this.hunksRenderer = this.createHunksRenderer(options);
		this.resizeManager = new ResizeManager();
		this.scrollSyncManager = new ScrollSyncManager();
		this.interactionManager = new InteractionManager("diff", pluckInteractionOptions(options, typeof options.hunkSeparators === "function" || (options.hunkSeparators ?? "line-info") === "line-info" || options.hunkSeparators === "line-info-basic" ? this.handleExpandHunk : void 0, this.getLineIndex));
		this.workerManager?.subscribeToThemeChanges(this);
		this.enabled = true;
	}
	handleHighlightRender = () => {
		this.rerender();
	};
	getHunksRendererOptions(options) {
		return {
			...options,
			headerRenderMode: options.renderCustomHeader != null ? "custom" : "default",
			hunkSeparators: typeof options.hunkSeparators === "function" ? "custom" : options.hunkSeparators
		};
	}
	createHunksRenderer(options) {
		return new DiffHunksRenderer(this.getHunksRendererOptions(options), this.handleHighlightRender, this.workerManager);
	}
	getLineIndex = (lineNumber, side = "additions") => {
		if (this.fileDiff == null) return;
		const lastHunk = this.fileDiff.hunks.at(-1);
		let targetUnifiedIndex;
		let targetSplitIndex;
		hunkIterator: for (const hunk of this.fileDiff.hunks) {
			let currentLineNumber = side === "deletions" ? hunk.deletionStart : hunk.additionStart;
			const hunkCount = side === "deletions" ? hunk.deletionCount : hunk.additionCount;
			let splitIndex = hunk.splitLineStart;
			let unifiedIndex = hunk.unifiedLineStart;
			if (lineNumber < currentLineNumber) {
				const difference = currentLineNumber - lineNumber;
				targetUnifiedIndex = Math.max(unifiedIndex - difference, 0);
				targetSplitIndex = Math.max(splitIndex - difference, 0);
				break hunkIterator;
			}
			if (lineNumber >= currentLineNumber + hunkCount) {
				if (hunk === lastHunk) {
					const difference = lineNumber - (currentLineNumber + hunkCount);
					targetUnifiedIndex = unifiedIndex + hunk.unifiedLineCount + difference;
					targetSplitIndex = splitIndex + hunk.splitLineCount + difference;
					break hunkIterator;
				}
				continue;
			}
			for (const content of hunk.hunkContent) if (content.type === "context") if (lineNumber < currentLineNumber + content.lines) {
				const difference = lineNumber - currentLineNumber;
				targetSplitIndex = splitIndex + difference;
				targetUnifiedIndex = unifiedIndex + difference;
				break hunkIterator;
			} else {
				currentLineNumber += content.lines;
				splitIndex += content.lines;
				unifiedIndex += content.lines;
			}
			else {
				const sideCount = side === "deletions" ? content.deletions : content.additions;
				if (lineNumber < currentLineNumber + sideCount) {
					const indexDifference = lineNumber - currentLineNumber;
					targetUnifiedIndex = unifiedIndex + (side === "additions" ? content.deletions : 0) + indexDifference;
					targetSplitIndex = splitIndex + indexDifference;
					break hunkIterator;
				} else {
					currentLineNumber += sideCount;
					splitIndex += Math.max(content.deletions, content.additions);
					unifiedIndex += content.deletions + content.additions;
				}
			}
			break hunkIterator;
		}
		if (targetUnifiedIndex == null || targetSplitIndex == null) return;
		return [targetUnifiedIndex, targetSplitIndex];
	};
	setOptions(options) {
		if (options == null) return;
		this.options = options;
		this.hunksRenderer.setOptions(this.getHunksRendererOptions(options));
		this.interactionManager.setOptions(pluckInteractionOptions(options, typeof options.hunkSeparators === "function" || (options.hunkSeparators ?? "line-info") === "line-info" || options.hunkSeparators === "line-info-basic" ? this.handleExpandHunk : void 0, this.getLineIndex));
	}
	mergeOptions(options) {
		this.options = {
			...this.options,
			...options
		};
	}
	setThemeType(themeType) {
		if ((this.options.themeType ?? "system") === themeType) return;
		this.mergeOptions({ themeType });
		if (typeof this.options.theme === "string" || this.fileContainer == null || this.appliedThemeCSS == null) return;
		this.applyThemeState(this.fileContainer, this.appliedThemeCSS.themeStyles, themeType, this.appliedThemeCSS.baseThemeType);
	}
	getHoveredLine = () => {
		return this.interactionManager.getHoveredLine();
	};
	setLineAnnotations(lineAnnotations) {
		this.lineAnnotations = lineAnnotations;
	}
	canPartiallyRender(forceRender, annotationsChanged, didContentChange) {
		if (forceRender || annotationsChanged || didContentChange || typeof this.options.hunkSeparators === "function") return false;
		return true;
	}
	setSelectedLines(range) {
		this.interactionManager.setSelection(range);
	}
	cleanUp(recycle = false) {
		this.resizeManager.cleanUp();
		this.interactionManager.cleanUp();
		this.scrollSyncManager.cleanUp();
		this.workerManager?.unsubscribeToThemeChanges(this);
		this.renderRange = void 0;
		if (!this.isContainerManaged) this.fileContainer?.remove();
		if (this.fileContainer?.shadowRoot != null) this.fileContainer.shadowRoot.innerHTML = "";
		this.fileContainer = void 0;
		if (this.pre != null) {
			this.pre.innerHTML = "";
			this.pre = void 0;
		}
		this.codeUnified = void 0;
		this.codeDeletions = void 0;
		this.codeAdditions = void 0;
		this.bufferBefore = void 0;
		this.bufferAfter = void 0;
		this.appliedPreAttributes = void 0;
		this.headerElement = void 0;
		this.headerPrefix = void 0;
		this.headerMetadata = void 0;
		this.headerCustom = void 0;
		this.lastRenderedHeaderHTML = void 0;
		this.errorWrapper = void 0;
		this.spriteSVG = void 0;
		this.lastRowCount = void 0;
		this.themeCSSStyle = void 0;
		this.appliedThemeCSS = void 0;
		this.unsafeCSSStyle = void 0;
		this.appliedUnsafeCSS = void 0;
		if (recycle) this.hunksRenderer.recycle();
		else {
			this.hunksRenderer.cleanUp();
			this.workerManager = void 0;
			this.fileDiff = void 0;
			this.deletionFile = void 0;
			this.additionFile = void 0;
		}
		this.enabled = false;
	}
	virtualizedSetup() {
		this.enabled = true;
		this.workerManager?.subscribeToThemeChanges(this);
	}
	hydrate(props) {
		const { fileContainer, prerenderedHTML, preventEmit = false, lineAnnotations, oldFile, newFile, fileDiff } = props;
		this.hydrateElements(fileContainer, prerenderedHTML);
		if (this.pre == null && this.headerElement == null) this.render({
			...props,
			preventEmit: true
		});
		else this.hydrationSetup({
			fileDiff,
			oldFile,
			newFile,
			lineAnnotations
		});
		if (!preventEmit) this.emitPostRender();
	}
	hydrateElements(fileContainer, prerenderedHTML) {
		prerenderHTMLIfNecessary(fileContainer, prerenderedHTML);
		for (const element of fileContainer.shadowRoot?.children ?? []) {
			if (element instanceof SVGElement) {
				this.spriteSVG = element;
				continue;
			}
			if (!(element instanceof HTMLElement)) continue;
			if (element instanceof HTMLPreElement) {
				this.pre = element;
				for (const code of element.children) {
					if (!(code instanceof HTMLElement) || code.tagName.toLowerCase() !== "code") continue;
					if ("deletions" in code.dataset) this.codeDeletions = code;
					if ("additions" in code.dataset) this.codeAdditions = code;
					if ("unified" in code.dataset) this.codeUnified = code;
				}
				continue;
			}
			if ("diffsHeader" in element.dataset) {
				this.headerElement = element;
				continue;
			}
			if (element instanceof HTMLStyleElement && element.hasAttribute("data-theme-css")) {
				this.themeCSSStyle = element;
				continue;
			}
			if (element instanceof HTMLStyleElement && element.hasAttribute("data-unsafe-css")) {
				this.unsafeCSSStyle = element;
				this.appliedUnsafeCSS = element.textContent;
				continue;
			}
		}
		if (this.pre != null) {
			this.syncCodeNodesFromPre(this.pre);
			this.pre.removeAttribute("data-dehydrated");
		}
		this.fileContainer = fileContainer;
	}
	hydrationSetup({ fileDiff, oldFile, newFile, lineAnnotations }) {
		const { diffStyle = "split", overflow = "scroll" } = this.options;
		this.lineAnnotations = lineAnnotations ?? this.lineAnnotations;
		this.additionFile = newFile;
		this.deletionFile = oldFile;
		this.fileDiff = fileDiff ?? (oldFile != null && newFile != null ? parseDiffFromFile(oldFile, newFile) : void 0);
		if (this.pre == null) return;
		this.hunksRenderer.hydrate(this.fileDiff);
		this.renderAnnotations();
		this.renderGutterUtility();
		this.injectUnsafeCSS();
		this.interactionManager.setup(this.pre);
		this.resizeManager.setup(this.pre, overflow === "wrap");
		if (overflow === "scroll" && diffStyle === "split") this.scrollSyncManager.setup(this.pre, this.codeDeletions, this.codeAdditions);
	}
	rerender() {
		if (!this.enabled || this.fileDiff == null && this.additionFile == null && this.deletionFile == null) return;
		this.render({
			forceRender: true,
			renderRange: this.renderRange
		});
	}
	handleExpandHunk = (hunkIndex, direction, expansionLineCountOverride) => {
		this.expandHunk(hunkIndex, direction, expansionLineCountOverride);
	};
	expandHunk = (hunkIndex, direction, expansionLineCountOverride) => {
		this.hunksRenderer.expandHunk(hunkIndex, direction, expansionLineCountOverride);
		this.rerender();
	};
	render({ oldFile, newFile, fileDiff, forceRender = false, preventEmit = false, lineAnnotations, fileContainer, containerWrapper, renderRange }) {
		if (!this.enabled) throw new Error("FileDiff.render: attempting to call render after cleaned up");
		const { collapsed = false } = this.options;
		const nextRenderRange = collapsed ? void 0 : renderRange;
		const filesDidChange = oldFile != null && newFile != null && (!areFilesEqual(oldFile, this.deletionFile) || !areFilesEqual(newFile, this.additionFile));
		let diffDidChange = fileDiff != null && fileDiff !== this.fileDiff;
		const annotationsChanged = lineAnnotations != null && (lineAnnotations.length > 0 || this.lineAnnotations.length > 0) ? lineAnnotations !== this.lineAnnotations : false;
		if (!collapsed && areRenderRangesEqual(nextRenderRange, this.renderRange) && !forceRender && !annotationsChanged && (fileDiff != null && fileDiff === this.fileDiff || fileDiff == null && !filesDidChange)) return false;
		const { renderRange: previousRenderRange } = this;
		this.renderRange = nextRenderRange;
		this.deletionFile = oldFile;
		this.additionFile = newFile;
		if (fileDiff != null) this.fileDiff = fileDiff;
		else if (oldFile != null && newFile != null && filesDidChange) {
			diffDidChange = true;
			this.fileDiff = parseDiffFromFile(oldFile, newFile);
		}
		if (lineAnnotations != null) this.setLineAnnotations(lineAnnotations);
		if (this.fileDiff == null) return false;
		this.hunksRenderer.setOptions(this.getHunksRendererOptions(this.options));
		this.hunksRenderer.setLineAnnotations(this.lineAnnotations);
		const { diffStyle = "split", disableErrorHandling = false, disableFileHeader = false, overflow = "scroll", themeType = "system" } = this.options;
		if (disableFileHeader) {
			if (this.headerElement != null) {
				this.headerElement.remove();
				this.headerElement = void 0;
				this.lastRenderedHeaderHTML = void 0;
			}
			this.clearHeaderSlots();
		}
		fileContainer = this.getOrCreateFileContainer(fileContainer, containerWrapper);
		if (collapsed) {
			this.removeRenderedCode();
			this.clearAuxiliaryNodes();
			try {
				const hunksResult = this.hunksRenderer.renderDiff(this.fileDiff, EMPTY_RENDER_RANGE);
				if (hunksResult != null) this.applyThemeState(fileContainer, hunksResult.themeStyles, themeType, hunksResult.baseThemeType);
				if (hunksResult?.headerElement != null) this.applyHeaderToDOM(hunksResult.headerElement, fileContainer);
				this.renderSeparators([]);
				this.injectUnsafeCSS();
			} catch (error) {
				if (disableErrorHandling) throw error;
				console.error(error);
				if (error instanceof Error) this.applyErrorToDOM(error, fileContainer);
			}
			if (!preventEmit) this.emitPostRender();
			return true;
		}
		try {
			const pre = this.getOrCreatePreNode(fileContainer);
			if (!(this.canPartiallyRender(forceRender, annotationsChanged, filesDidChange || diffDidChange) && this.applyPartialRender({
				previousRenderRange,
				renderRange: nextRenderRange
			}))) {
				const hunksResult = this.hunksRenderer.renderDiff(this.fileDiff, nextRenderRange);
				if (hunksResult == null) {
					if (this.workerManager?.isInitialized() === false) this.workerManager.initialize().then(() => this.rerender());
					return false;
				}
				this.applyThemeState(fileContainer, hunksResult.themeStyles, themeType, hunksResult.baseThemeType);
				if (hunksResult.headerElement != null) this.applyHeaderToDOM(hunksResult.headerElement, fileContainer);
				if (hunksResult.additionsContentAST != null || hunksResult.deletionsContentAST != null || hunksResult.unifiedContentAST != null) this.applyHunksToDOM(pre, hunksResult);
				else if (this.pre != null) {
					this.pre.remove();
					this.pre = void 0;
				}
				this.renderSeparators(hunksResult.hunkData);
			}
			this.applyBuffers(pre, nextRenderRange);
			this.injectUnsafeCSS();
			this.renderAnnotations();
			this.renderGutterUtility();
			this.interactionManager.setup(pre);
			this.resizeManager.setup(pre, overflow === "wrap");
			if (overflow === "scroll" && diffStyle === "split") this.scrollSyncManager.setup(pre, this.codeDeletions, this.codeAdditions);
			else this.scrollSyncManager.cleanUp();
		} catch (error) {
			if (disableErrorHandling) throw error;
			console.error(error);
			if (error instanceof Error) this.applyErrorToDOM(error, fileContainer);
		}
		if (!preventEmit) this.emitPostRender();
		return true;
	}
	emitPostRender() {
		if (this.fileContainer != null) this.options.onPostRender?.(this.fileContainer, this);
	}
	removeRenderedCode() {
		this.resizeManager.cleanUp();
		this.scrollSyncManager.cleanUp();
		this.interactionManager.cleanUp();
		this.bufferBefore?.remove();
		this.bufferBefore = void 0;
		this.bufferAfter?.remove();
		this.bufferAfter = void 0;
		this.codeUnified?.remove();
		this.codeUnified = void 0;
		this.codeDeletions?.remove();
		this.codeDeletions = void 0;
		this.codeAdditions?.remove();
		this.codeAdditions = void 0;
		this.pre?.remove();
		this.pre = void 0;
		this.appliedPreAttributes = void 0;
		this.lastRowCount = void 0;
	}
	clearAuxiliaryNodes() {
		for (const { element } of this.separatorCache.values()) element.remove();
		this.separatorCache.clear();
		for (const { element } of this.annotationCache.values()) element.remove();
		this.annotationCache.clear();
		this.gutterUtilityContent?.remove();
		this.gutterUtilityContent = void 0;
	}
	renderPlaceholder(height) {
		if (this.fileContainer == null) return false;
		this.cleanChildNodes();
		if (this.placeHolder == null) {
			const shadowRoot = this.fileContainer.shadowRoot ?? this.fileContainer.attachShadow({ mode: "open" });
			this.placeHolder = document.createElement("div");
			this.placeHolder.dataset.placeholder = "";
			shadowRoot.appendChild(this.placeHolder);
		}
		this.placeHolder.style.setProperty("height", `${height}px`);
		return true;
	}
	cleanChildNodes() {
		this.resizeManager.cleanUp();
		this.scrollSyncManager.cleanUp();
		this.interactionManager.cleanUp();
		this.bufferAfter?.remove();
		this.bufferBefore?.remove();
		this.codeAdditions?.remove();
		this.codeDeletions?.remove();
		this.codeUnified?.remove();
		this.errorWrapper?.remove();
		this.headerElement?.remove();
		this.gutterUtilityContent?.remove();
		this.headerPrefix?.remove();
		this.headerMetadata?.remove();
		this.headerCustom?.remove();
		this.pre?.remove();
		this.spriteSVG?.remove();
		this.themeCSSStyle?.remove();
		this.unsafeCSSStyle?.remove();
		this.bufferAfter = void 0;
		this.bufferBefore = void 0;
		this.codeAdditions = void 0;
		this.codeDeletions = void 0;
		this.codeUnified = void 0;
		this.errorWrapper = void 0;
		this.headerElement = void 0;
		this.gutterUtilityContent = void 0;
		this.headerPrefix = void 0;
		this.headerMetadata = void 0;
		this.headerCustom = void 0;
		this.pre = void 0;
		this.spriteSVG = void 0;
		this.themeCSSStyle = void 0;
		this.appliedThemeCSS = void 0;
		this.unsafeCSSStyle = void 0;
		this.appliedUnsafeCSS = void 0;
		this.lastRenderedHeaderHTML = void 0;
		this.lastRowCount = void 0;
	}
	renderSeparators(hunkData) {
		const { hunkSeparators } = this.options;
		if (this.isContainerManaged || this.fileContainer == null || typeof hunkSeparators !== "function") {
			for (const { element } of this.separatorCache.values()) element.remove();
			this.separatorCache.clear();
			return;
		}
		const staleSeparators = new Map(this.separatorCache);
		for (const hunk of hunkData) {
			const id = hunk.slotName;
			let cache = this.separatorCache.get(id);
			if (cache == null || !areHunkDataEqual(hunk, cache.hunkData)) {
				cache?.element.remove();
				const element = document.createElement("div");
				element.style.display = "contents";
				element.slot = hunk.slotName;
				const child = hunkSeparators(hunk, this);
				if (child != null) element.appendChild(child);
				this.fileContainer.appendChild(element);
				cache = {
					element,
					hunkData: hunk
				};
				this.separatorCache.set(id, cache);
			}
			staleSeparators.delete(id);
		}
		for (const [id, { element }] of staleSeparators.entries()) {
			this.separatorCache.delete(id);
			element.remove();
		}
	}
	renderAnnotations() {
		if (this.isContainerManaged || this.fileContainer == null) {
			for (const { element } of this.annotationCache.values()) element.remove();
			this.annotationCache.clear();
			return;
		}
		const staleAnnotations = new Map(this.annotationCache);
		const { renderAnnotation } = this.options;
		if (renderAnnotation != null && this.lineAnnotations.length > 0) for (const [index, annotation] of this.lineAnnotations.entries()) {
			const id = `${index}-${getLineAnnotationName(annotation)}`;
			let cache = this.annotationCache.get(id);
			if (cache == null || !areDiffLineAnnotationsEqual(annotation, cache.annotation)) {
				cache?.element.remove();
				const content = renderAnnotation(annotation);
				if (content == null) continue;
				cache = {
					element: createAnnotationWrapperNode(getLineAnnotationName(annotation)),
					annotation
				};
				cache.element.appendChild(content);
				this.fileContainer.appendChild(cache.element);
				this.annotationCache.set(id, cache);
			}
			staleAnnotations.delete(id);
		}
		for (const [id, { element }] of staleAnnotations.entries()) {
			this.annotationCache.delete(id);
			element.remove();
		}
	}
	renderGutterUtility() {
		const renderGutterUtility = this.options.renderGutterUtility ?? this.options.renderHoverUtility;
		if (this.fileContainer == null || renderGutterUtility == null) {
			this.gutterUtilityContent?.remove();
			this.gutterUtilityContent = void 0;
			return;
		}
		const element = renderGutterUtility(this.interactionManager.getHoveredLine);
		if (element != null && this.gutterUtilityContent != null) return;
		else if (element == null) {
			this.gutterUtilityContent?.remove();
			this.gutterUtilityContent = void 0;
			return;
		}
		const gutterUtilityContent = createGutterUtilityContentNode();
		gutterUtilityContent.appendChild(element);
		this.fileContainer.appendChild(gutterUtilityContent);
		this.gutterUtilityContent = gutterUtilityContent;
	}
	getOrCreateFileContainer(fileContainer, parentNode) {
		const previousContainer = this.fileContainer;
		this.fileContainer = fileContainer ?? this.fileContainer ?? document.createElement("diffs-container");
		if (previousContainer != null && previousContainer !== this.fileContainer) {
			this.lastRenderedHeaderHTML = void 0;
			this.headerElement = void 0;
		}
		if (parentNode != null && this.fileContainer.parentNode !== parentNode) parentNode.appendChild(this.fileContainer);
		if (this.spriteSVG == null) {
			const fragment = document.createElement("div");
			fragment.innerHTML = SVGSpriteSheet;
			const firstChild = fragment.firstChild;
			if (firstChild instanceof SVGElement) {
				this.spriteSVG = firstChild;
				this.fileContainer.shadowRoot?.appendChild(this.spriteSVG);
			}
		}
		return this.fileContainer;
	}
	getFileContainer() {
		return this.fileContainer;
	}
	getOrCreatePreNode(container) {
		const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
		if (this.pre == null) {
			this.pre = document.createElement("pre");
			this.appliedPreAttributes = void 0;
			this.codeUnified = void 0;
			this.codeDeletions = void 0;
			this.codeAdditions = void 0;
			shadowRoot.appendChild(this.pre);
		} else if (this.pre.parentNode !== shadowRoot) {
			shadowRoot.appendChild(this.pre);
			this.appliedPreAttributes = void 0;
		}
		this.placeHolder?.remove();
		this.placeHolder = void 0;
		return this.pre;
	}
	syncCodeNodesFromPre(pre) {
		this.codeUnified = void 0;
		this.codeDeletions = void 0;
		this.codeAdditions = void 0;
		for (const child of Array.from(pre.children)) {
			if (!(child instanceof HTMLElement)) continue;
			if (child.hasAttribute("data-unified")) this.codeUnified = child;
			else if (child.hasAttribute("data-deletions")) this.codeDeletions = child;
			else if (child.hasAttribute("data-additions")) this.codeAdditions = child;
		}
	}
	applyHeaderToDOM(headerAST, container) {
		this.cleanupErrorWrapper();
		this.placeHolder?.remove();
		this.placeHolder = void 0;
		const { fileDiff } = this;
		const headerHTML = toHtml(headerAST);
		if (headerHTML !== this.lastRenderedHeaderHTML) {
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = headerHTML;
			const newHeader = tempDiv.firstElementChild;
			if (!(newHeader instanceof HTMLElement)) return;
			if (this.headerElement != null) container.shadowRoot?.replaceChild(newHeader, this.headerElement);
			else container.shadowRoot?.prepend(newHeader);
			this.headerElement = newHeader;
			this.lastRenderedHeaderHTML = headerHTML;
		}
		if (this.isContainerManaged || fileDiff == null) return;
		const { renderCustomHeader, renderHeaderPrefix, renderHeaderMetadata } = this.options;
		if (renderCustomHeader != null) {
			const content$1 = renderCustomHeader(fileDiff) ?? void 0;
			this.headerCustom = this.upsertHeaderSlotElement(container, this.headerCustom, CUSTOM_HEADER_SLOT_ID, content$1);
			this.headerPrefix?.remove();
			this.headerMetadata?.remove();
			this.headerPrefix = void 0;
			this.headerMetadata = void 0;
			return;
		}
		const prefix = renderHeaderPrefix?.(fileDiff) ?? void 0;
		const content = renderHeaderMetadata?.(fileDiff) ?? void 0;
		this.headerPrefix = this.upsertHeaderSlotElement(container, this.headerPrefix, HEADER_PREFIX_SLOT_ID, prefix);
		this.headerMetadata = this.upsertHeaderSlotElement(container, this.headerMetadata, HEADER_METADATA_SLOT_ID, content);
		this.headerCustom?.remove();
		this.headerCustom = void 0;
	}
	clearHeaderSlots() {
		this.headerPrefix?.remove();
		this.headerMetadata?.remove();
		this.headerCustom?.remove();
		this.headerPrefix = void 0;
		this.headerMetadata = void 0;
		this.headerCustom = void 0;
	}
	upsertHeaderSlotElement(container, current, slot, content) {
		if (content == null) {
			current?.remove();
			return;
		}
		const element = current ?? this.createHeaderSlotElement(slot);
		if (current == null) container.appendChild(element);
		this.replaceHeaderSlotContent(element, content);
		return element;
	}
	replaceHeaderSlotContent(element, content) {
		element.replaceChildren();
		if (content instanceof Element) element.appendChild(content);
		else element.innerText = `${content}`;
	}
	createHeaderSlotElement(slot) {
		const element = document.createElement("div");
		element.slot = slot;
		return element;
	}
	injectUnsafeCSS() {
		const { unsafeCSS } = this.options;
		const shadowRoot = this.fileContainer?.shadowRoot;
		if (shadowRoot == null) return;
		if (unsafeCSS == null || unsafeCSS === "") {
			if (this.unsafeCSSStyle != null) {
				this.unsafeCSSStyle.remove();
				this.unsafeCSSStyle = void 0;
			}
			this.appliedUnsafeCSS = void 0;
			return;
		}
		if (this.unsafeCSSStyle?.parentNode === shadowRoot && this.appliedUnsafeCSS === unsafeCSS) return;
		this.unsafeCSSStyle ??= createUnsafeCSSStyleNode();
		if (this.unsafeCSSStyle.parentNode !== shadowRoot) shadowRoot.appendChild(this.unsafeCSSStyle);
		this.unsafeCSSStyle.textContent = wrapUnsafeCSS(unsafeCSS);
		this.appliedUnsafeCSS = unsafeCSS;
	}
	applyThemeState(container, themeStyles, themeType, baseThemeType) {
		const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
		const effectiveThemeType = baseThemeType ?? themeType;
		if (this.themeCSSStyle?.parentNode === shadowRoot && this.appliedThemeCSS?.themeStyles === themeStyles && this.appliedThemeCSS.themeType === effectiveThemeType) return;
		this.themeCSSStyle = upsertHostThemeStyle({
			shadowRoot,
			currentNode: this.themeCSSStyle,
			themeCSS: wrapThemeCSS(themeStyles, effectiveThemeType)
		});
		this.appliedThemeCSS = this.themeCSSStyle != null ? {
			themeStyles,
			themeType: effectiveThemeType,
			baseThemeType
		} : void 0;
	}
	applyHunksToDOM(pre, result) {
		const { overflow = "scroll" } = this.options;
		const containerSize = (this.options.hunkSeparators ?? "line-info") === "line-info";
		const rowSpan = overflow === "wrap" ? result.rowCount : void 0;
		this.cleanupErrorWrapper();
		this.applyPreNodeAttributes(pre, result);
		let shouldReplace = false;
		const codeElements = [];
		const unifiedAST = this.hunksRenderer.renderCodeAST("unified", result);
		const deletionsAST = this.hunksRenderer.renderCodeAST("deletions", result);
		const additionsAST = this.hunksRenderer.renderCodeAST("additions", result);
		if (unifiedAST != null) {
			shouldReplace = this.codeUnified == null || this.codeAdditions != null || this.codeDeletions != null;
			this.codeDeletions?.remove();
			this.codeDeletions = void 0;
			this.codeAdditions?.remove();
			this.codeAdditions = void 0;
			this.codeUnified = getOrCreateCodeNode({
				code: this.codeUnified,
				columnType: "unified",
				rowSpan,
				containerSize
			});
			this.codeUnified.innerHTML = this.hunksRenderer.renderPartialHTML(unifiedAST);
			codeElements.push(this.codeUnified);
		} else if (deletionsAST != null || additionsAST != null) {
			if (deletionsAST != null) {
				shouldReplace = this.codeDeletions == null || this.codeUnified != null;
				this.codeUnified?.remove();
				this.codeUnified = void 0;
				this.codeDeletions = getOrCreateCodeNode({
					code: this.codeDeletions,
					columnType: "deletions",
					rowSpan,
					containerSize
				});
				this.codeDeletions.innerHTML = this.hunksRenderer.renderPartialHTML(deletionsAST);
				codeElements.push(this.codeDeletions);
			} else {
				this.codeDeletions?.remove();
				this.codeDeletions = void 0;
			}
			if (additionsAST != null) {
				shouldReplace = shouldReplace || this.codeAdditions == null || this.codeUnified != null;
				this.codeUnified?.remove();
				this.codeUnified = void 0;
				this.codeAdditions = getOrCreateCodeNode({
					code: this.codeAdditions,
					columnType: "additions",
					rowSpan,
					containerSize
				});
				this.codeAdditions.innerHTML = this.hunksRenderer.renderPartialHTML(additionsAST);
				codeElements.push(this.codeAdditions);
			} else {
				this.codeAdditions?.remove();
				this.codeAdditions = void 0;
			}
		} else {
			this.codeUnified?.remove();
			this.codeUnified = void 0;
			this.codeDeletions?.remove();
			this.codeDeletions = void 0;
			this.codeAdditions?.remove();
			this.codeAdditions = void 0;
		}
		if (codeElements.length === 0) pre.textContent = "";
		else if (shouldReplace) pre.replaceChildren(...codeElements);
		this.lastRowCount = result.rowCount;
	}
	applyPartialRender({ previousRenderRange, renderRange }) {
		const { pre, codeUnified, codeAdditions, codeDeletions, options: { diffStyle = "split" } } = this;
		if (pre == null || previousRenderRange == null || renderRange == null || !Number.isFinite(previousRenderRange.totalLines) || !Number.isFinite(renderRange.totalLines) || this.lastRowCount == null) return false;
		const codeElements = this.getCodeColumns(diffStyle, codeUnified, codeDeletions, codeAdditions);
		if (codeElements == null) return false;
		const previousStart = previousRenderRange.startingLine;
		const nextStart = renderRange.startingLine;
		const previousEnd = previousStart + previousRenderRange.totalLines;
		const nextEnd = nextStart + renderRange.totalLines;
		const overlapStart = Math.max(previousStart, nextStart);
		const overlapEnd = Math.min(previousEnd, nextEnd);
		if (overlapEnd <= overlapStart) return false;
		const trimStart = Math.max(0, overlapStart - previousStart);
		const trimEnd = Math.max(0, previousEnd - overlapEnd);
		const trimResult = this.trimColumns({
			columns: codeElements,
			trimStart,
			trimEnd,
			previousStart,
			overlapStart,
			overlapEnd,
			diffStyle
		});
		if (trimResult < 0) throw new Error("applyPartialRender: failed to trim to overlap");
		if (this.lastRowCount < trimResult) throw new Error("applyPartialRender: trimmed beyond DOM row count");
		let rowCount = this.lastRowCount - trimResult;
		const renderChunk = (startingLine, totalLines) => {
			if (totalLines <= 0 || this.fileDiff == null) return;
			return this.hunksRenderer.renderDiff(this.fileDiff, {
				startingLine,
				totalLines,
				bufferBefore: 0,
				bufferAfter: 0
			});
		};
		const prependResult = renderChunk(nextStart, Math.max(overlapStart - nextStart, 0));
		if (prependResult == null && nextStart < overlapStart) return false;
		const appendResult = renderChunk(overlapEnd, Math.max(nextEnd - overlapEnd, 0));
		if (appendResult == null && nextEnd > overlapEnd) return false;
		const applyChunk = (result, insertPosition) => {
			if (result == null) return;
			if (diffStyle === "unified" && !Array.isArray(codeElements)) this.insertPartialHTML(diffStyle, codeElements, result, insertPosition);
			else if (diffStyle === "split" && Array.isArray(codeElements)) this.insertPartialHTML(diffStyle, codeElements, result, insertPosition);
			else throw new Error("FileDiff.applyPartialRender.applyChunk: invalid chunk application");
			rowCount += result.rowCount;
		};
		this.cleanupErrorWrapper();
		applyChunk(prependResult, "afterbegin");
		applyChunk(appendResult, "beforeend");
		if (this.lastRowCount !== rowCount) {
			this.applyRowSpan(diffStyle, codeElements, rowCount);
			this.lastRowCount = rowCount;
		}
		return true;
	}
	insertPartialHTML(diffStyle, columns, result, insertPosition) {
		if (diffStyle === "unified" && !Array.isArray(columns)) {
			const unifiedAST = this.hunksRenderer.renderCodeAST("unified", result);
			this.renderPartialColumn(columns, unifiedAST, insertPosition);
		} else if (diffStyle === "split" && Array.isArray(columns)) {
			const deletionsAST = this.hunksRenderer.renderCodeAST("deletions", result);
			const additionsAST = this.hunksRenderer.renderCodeAST("additions", result);
			this.renderPartialColumn(columns[0], deletionsAST, insertPosition);
			this.renderPartialColumn(columns[1], additionsAST, insertPosition);
		} else throw new Error("FileDiff.insertPartialHTML: Invalid argument composition");
	}
	renderPartialColumn(column, ast, insertPosition) {
		if (column == null || ast == null) return;
		const gutterChildren = getElementChildren(ast[0]);
		const contentChildren = getElementChildren(ast[1]);
		if (gutterChildren == null || contentChildren == null) throw new Error("FileDiff.insertPartialHTML: Unexpected AST structure");
		const firstHASTElement = contentChildren.at(0);
		if (insertPosition === "beforeend" && firstHASTElement?.type === "element" && typeof firstHASTElement.properties["data-buffer-size"] === "number") this.mergeBuffersIfNecessary(firstHASTElement.properties["data-buffer-size"], column.content.children[column.content.children.length - 1], column.gutter.children[column.gutter.children.length - 1], gutterChildren, contentChildren, true);
		const lastHASTElement = contentChildren.at(-1);
		if (insertPosition === "afterbegin" && lastHASTElement?.type === "element" && typeof lastHASTElement.properties["data-buffer-size"] === "number") this.mergeBuffersIfNecessary(lastHASTElement.properties["data-buffer-size"], column.content.children[0], column.gutter.children[0], gutterChildren, contentChildren, false);
		column.gutter.insertAdjacentHTML(insertPosition, this.hunksRenderer.renderPartialHTML(gutterChildren));
		column.content.insertAdjacentHTML(insertPosition, this.hunksRenderer.renderPartialHTML(contentChildren));
	}
	mergeBuffersIfNecessary(adjustmentSize, contentElement, gutterElement, gutterChildren, contentChildren, fromStart) {
		if (!(contentElement instanceof HTMLElement) || !(gutterElement instanceof HTMLElement)) return;
		const currentSize = this.getBufferSize(contentElement.dataset);
		if (currentSize == null) return;
		if (fromStart) {
			gutterChildren.shift();
			contentChildren.shift();
		} else {
			gutterChildren.pop();
			contentChildren.pop();
		}
		this.updateBufferSize(contentElement, currentSize + adjustmentSize);
		this.updateBufferSize(gutterElement, currentSize + adjustmentSize);
	}
	applyRowSpan(diffStyle, columns, rowCount) {
		const applySpan = (column) => {
			if (column == null) return;
			column.gutter.style.setProperty("grid-row", `span ${rowCount}`);
			column.content.style.setProperty("grid-row", `span ${rowCount}`);
		};
		if (diffStyle === "unified" && !Array.isArray(columns)) applySpan(columns);
		else if (diffStyle === "split" && Array.isArray(columns)) {
			applySpan(columns[0]);
			applySpan(columns[1]);
		} else throw new Error("dun fuuuuked up");
	}
	trimColumnRows(columns, preTrimCount, postTrimStart) {
		let visibleLineIndex = 0;
		let rowCount = 0;
		let rowIndex = 0;
		let pendingMetadataTrim = false;
		const hasPostTrim = postTrimStart >= 0;
		if (columns == null) return 0;
		const contentChildren = Array.from(columns.content.children);
		const gutterChildren = Array.from(columns.gutter.children);
		if (contentChildren.length !== gutterChildren.length) throw new Error("FileDiff.trimColumnRows: columns do not match");
		while (rowIndex < contentChildren.length) {
			if (preTrimCount <= 0 && !hasPostTrim && !pendingMetadataTrim) break;
			const gutterElement = gutterChildren[rowIndex];
			const contentElement = contentChildren[rowIndex];
			rowIndex++;
			if (!(gutterElement instanceof HTMLElement) || !(contentElement instanceof HTMLElement)) {
				console.error({
					gutterElement,
					contentElement
				});
				throw new Error("FileDiff.trimColumnRows: invalid row elements");
			}
			if (pendingMetadataTrim) {
				pendingMetadataTrim = false;
				if (gutterElement.dataset.gutterBuffer === "annotation" && "lineAnnotation" in contentElement.dataset || gutterElement.dataset.gutterBuffer === "metadata" && "noNewline" in contentElement.dataset) {
					gutterElement.remove();
					contentElement.remove();
					rowCount++;
					continue;
				}
			}
			if ("lineIndex" in gutterElement.dataset && "lineIndex" in contentElement.dataset) {
				if (preTrimCount > 0 || hasPostTrim && visibleLineIndex >= postTrimStart) {
					gutterElement.remove();
					contentElement.remove();
					if (preTrimCount > 0) {
						preTrimCount--;
						if (preTrimCount === 0) pendingMetadataTrim = true;
					}
					rowCount++;
				}
				visibleLineIndex++;
				continue;
			}
			if ("separator" in gutterElement.dataset && "separator" in contentElement.dataset) {
				if (preTrimCount > 0 || hasPostTrim && visibleLineIndex >= postTrimStart) {
					gutterElement.remove();
					contentElement.remove();
					rowCount++;
				}
				continue;
			}
			if (gutterElement.dataset.gutterBuffer === "annotation" && "lineAnnotation" in contentElement.dataset) {
				if (preTrimCount > 0 || hasPostTrim && visibleLineIndex >= postTrimStart) {
					gutterElement.remove();
					contentElement.remove();
					rowCount++;
				}
				continue;
			}
			if (gutterElement.dataset.gutterBuffer === "metadata" && "noNewline" in contentElement.dataset) {
				if (preTrimCount > 0 || hasPostTrim && visibleLineIndex >= postTrimStart) {
					gutterElement.remove();
					contentElement.remove();
					rowCount++;
				}
				continue;
			}
			if (gutterElement.dataset.gutterBuffer === "buffer" && "contentBuffer" in contentElement.dataset) {
				const totalRows = this.getBufferSize(contentElement.dataset);
				if (totalRows == null) throw new Error("FileDiff.trimColumnRows: invalid element");
				if (preTrimCount > 0) {
					const rowsToRemove = Math.min(preTrimCount, totalRows);
					const newSize = totalRows - rowsToRemove;
					if (newSize > 0) {
						this.updateBufferSize(gutterElement, newSize);
						this.updateBufferSize(contentElement, newSize);
						rowCount += rowsToRemove;
					} else {
						gutterElement.remove();
						contentElement.remove();
						rowCount += totalRows;
					}
					preTrimCount -= rowsToRemove;
				} else if (hasPostTrim) {
					const bufferStart = visibleLineIndex;
					const bufferEnd = visibleLineIndex + totalRows - 1;
					if (postTrimStart <= bufferStart) {
						gutterElement.remove();
						contentElement.remove();
						rowCount += totalRows;
					} else if (postTrimStart <= bufferEnd) {
						const rowsToRemove = bufferEnd - postTrimStart + 1;
						const newSize = totalRows - rowsToRemove;
						this.updateBufferSize(gutterElement, newSize);
						this.updateBufferSize(contentElement, newSize);
						rowCount += rowsToRemove;
					}
				}
				visibleLineIndex += totalRows;
				continue;
			}
			console.error({
				gutterElement,
				contentElement
			});
			throw new Error("FileDiff.trimColumnRows: unknown row elements");
		}
		return rowCount;
	}
	trimColumns({ columns, diffStyle, overlapEnd, overlapStart, previousStart, trimEnd, trimStart }) {
		const preTrimCount = Math.max(0, overlapStart - previousStart);
		const postTrimStart = overlapEnd - previousStart;
		if (postTrimStart < 0) throw new Error("FileDiff.trimColumns: overlap ends before previous");
		const shouldTrimStart = trimStart > 0;
		const shouldTrimEnd = trimEnd > 0;
		if (!shouldTrimStart && !shouldTrimEnd) return 0;
		const effectivePreTrimCount = shouldTrimStart ? preTrimCount : 0;
		const effectivePostTrimStart = shouldTrimEnd ? postTrimStart : -1;
		if (diffStyle === "unified" && !Array.isArray(columns)) return this.trimColumnRows(columns, effectivePreTrimCount, effectivePostTrimStart);
		else if (diffStyle === "split" && Array.isArray(columns)) {
			const deletionsTrim = this.trimColumnRows(columns[0], effectivePreTrimCount, effectivePostTrimStart);
			const additionsTrim = this.trimColumnRows(columns[1], effectivePreTrimCount, effectivePostTrimStart);
			if (columns[0] != null && columns[1] != null && deletionsTrim !== additionsTrim) throw new Error("FileDiff.trimColumns: split columns out of sync");
			return columns[0] != null ? deletionsTrim : additionsTrim;
		} else {
			console.error({
				diffStyle,
				columns
			});
			throw new Error("FileDiff.trimColumns: Invalid columns for diffType");
		}
	}
	getBufferSize(properties) {
		const parsed = Number.parseInt(properties?.bufferSize ?? "", 10);
		return Number.isNaN(parsed) ? void 0 : parsed;
	}
	updateBufferSize(element, size) {
		element.dataset.bufferSize = `${size}`;
		element.style.setProperty("grid-row", `span ${size}`);
		element.style.setProperty("min-height", `calc(${size} * 1lh)`);
	}
	getCodeColumns(diffStyle, codeUnified, codeDeletions, codeAdditions) {
		function getColumns(code) {
			if (code == null) return;
			const gutter = code.children[0];
			const content = code.children[1];
			if (!(gutter instanceof HTMLElement) || !(content instanceof HTMLElement) || gutter.dataset.gutter == null || content.dataset.content == null) return;
			return {
				gutter,
				content
			};
		}
		if (diffStyle === "unified") return getColumns(codeUnified);
		else {
			const deletions = getColumns(codeDeletions);
			const additions = getColumns(codeAdditions);
			return deletions != null || additions != null ? [deletions, additions] : void 0;
		}
	}
	applyBuffers(pre, renderRange) {
		const { disableVirtualizationBuffers = false } = this.options;
		if (disableVirtualizationBuffers || renderRange == null) {
			if (this.bufferBefore != null) {
				this.bufferBefore.remove();
				this.bufferBefore = void 0;
			}
			if (this.bufferAfter != null) {
				this.bufferAfter.remove();
				this.bufferAfter = void 0;
			}
			return;
		}
		if (renderRange.bufferBefore > 0) {
			if (this.bufferBefore == null) {
				this.bufferBefore = document.createElement("div");
				this.bufferBefore.dataset.virtualizerBuffer = "before";
				pre.before(this.bufferBefore);
			}
			this.bufferBefore.style.setProperty("height", `${renderRange.bufferBefore}px`);
			this.bufferBefore.style.setProperty("contain", "strict");
		} else if (this.bufferBefore != null) {
			this.bufferBefore.remove();
			this.bufferBefore = void 0;
		}
		if (renderRange.bufferAfter > 0) {
			if (this.bufferAfter == null) {
				this.bufferAfter = document.createElement("div");
				this.bufferAfter.dataset.virtualizerBuffer = "after";
				pre.after(this.bufferAfter);
			}
			this.bufferAfter.style.setProperty("height", `${renderRange.bufferAfter}px`);
			this.bufferAfter.style.setProperty("contain", "strict");
		} else if (this.bufferAfter != null) {
			this.bufferAfter.remove();
			this.bufferAfter = void 0;
		}
	}
	applyPreNodeAttributes(pre, { additionsContentAST, deletionsContentAST, totalLines }, customProperties) {
		const { diffIndicators = "bars", disableBackground = false, disableLineNumbers = false, overflow = "scroll", diffStyle = "split" } = this.options;
		const preProperties = {
			type: "diff",
			diffIndicators,
			disableBackground,
			disableLineNumbers,
			overflow,
			split: diffStyle === "unified" ? false : additionsContentAST != null && deletionsContentAST != null,
			totalLines,
			customProperties
		};
		if (arePrePropertiesEqual(preProperties, this.appliedPreAttributes)) return;
		setPreNodeProperties(pre, preProperties);
		this.appliedPreAttributes = preProperties;
	}
	applyErrorToDOM(error, container) {
		this.cleanupErrorWrapper();
		const pre = this.getOrCreatePreNode(container);
		pre.innerHTML = "";
		pre.remove();
		this.pre = void 0;
		this.appliedPreAttributes = void 0;
		const shadowRoot = container.shadowRoot ?? container.attachShadow({ mode: "open" });
		this.errorWrapper ??= document.createElement("div");
		this.errorWrapper.dataset.errorWrapper = "";
		this.errorWrapper.innerHTML = "";
		shadowRoot.appendChild(this.errorWrapper);
		const errorMessage = document.createElement("div");
		errorMessage.dataset.errorMessage = "";
		errorMessage.innerText = error.message;
		this.errorWrapper.appendChild(errorMessage);
		const errorStack = document.createElement("pre");
		errorStack.dataset.errorStack = "";
		errorStack.innerText = error.stack ?? "No Error Stack";
		this.errorWrapper.appendChild(errorStack);
	}
	cleanupErrorWrapper() {
		this.errorWrapper?.remove();
		this.errorWrapper = void 0;
	}
};
function getElementChildren(node) {
	if (node == null || node.type !== "element") return;
	return node.children ?? [];
}
function getMergeConflictActionSlotName({ hunkIndex, lineIndex, conflictIndex }) {
	return `merge-conflict-action-${hunkIndex}-${lineIndex}-${conflictIndex}`;
}
function getMergeConflictActionAnchor(action, fileDiff) {
	const hunk = fileDiff.hunks[action.hunkIndex];
	if (hunk == null) return;
	return {
		hunkIndex: action.hunkIndex,
		lineIndex: getUnifiedLineStartForContent(hunk, action.startContentIndex)
	};
}
function getUnifiedLineStartForContent(hunk, contentIndex) {
	let lineIndex = hunk.unifiedLineStart;
	for (let index = 0; index < contentIndex; index++) {
		const content = hunk.hunkContent[index];
		lineIndex += content.type === "context" ? content.lines : content.deletions + content.additions;
	}
	return lineIndex;
}
function resolveVirtualFileMetrics(hunkSeparators, metricsOverride) {
	const metrics = {
		...DEFAULT_VIRTUAL_FILE_METRICS,
		...metricsOverride
	};
	metrics.hunkSeparatorHeight = getHunkSeparatorHeight(hunkSeparators, metricsOverride?.hunkSeparatorHeight);
	return metrics;
}
function getHunkSeparatorHeight(type, customHeight) {
	if (customHeight != null) return customHeight;
	switch (type) {
		case "simple": return 4;
		case "metadata":
		case "line-info":
		case "line-info-basic":
		case "custom": return 32;
	}
}
var instanceId = -1;
var VirtualizedFileDiff = class extends FileDiff$1 {
	__id = `little-virtualized-file-diff:${++instanceId}`;
	top;
	height = 0;
	metrics;
	heightCache = /* @__PURE__ */ new Map();
	isVisible = false;
	virtualizer;
	constructor(options, virtualizer, metrics, workerManager, isContainerManaged = false) {
		super(options, workerManager, isContainerManaged);
		const { hunkSeparators = "line-info" } = this.options;
		this.virtualizer = virtualizer;
		this.metrics = resolveVirtualFileMetrics(typeof hunkSeparators === "function" ? "custom" : hunkSeparators, metrics);
	}
	getLineHeight(lineIndex, hasMetadataLine = false) {
		const cached = this.heightCache.get(lineIndex);
		if (cached != null) return cached;
		const multiplier = hasMetadataLine ? 2 : 1;
		return this.metrics.lineHeight * multiplier;
	}
	setOptions(options) {
		if (options == null) return;
		const previousDiffStyle = this.options.diffStyle;
		const previousOverflow = this.options.overflow;
		const previousCollapsed = this.options.collapsed;
		super.setOptions(options);
		if (previousDiffStyle !== this.options.diffStyle || previousOverflow !== this.options.overflow || previousCollapsed !== this.options.collapsed) {
			this.heightCache.clear();
			this.computeApproximateSize();
			this.renderRange = void 0;
		}
		this.virtualizer.instanceChanged(this);
	}
	reconcileHeights() {
		const { overflow = "scroll" } = this.options;
		if (this.fileContainer != null) this.top = this.virtualizer.getOffsetInScrollContainer(this.fileContainer);
		if (this.fileContainer == null || this.fileDiff == null) {
			this.height = 0;
			return;
		}
		if (overflow === "scroll" && this.lineAnnotations.length === 0 && !this.virtualizer.config.resizeDebugging) return;
		const diffStyle = this.getDiffStyle();
		let hasLineHeightChange = false;
		const codeGroups = diffStyle === "split" ? [this.codeDeletions, this.codeAdditions] : [this.codeUnified];
		for (const codeGroup of codeGroups) {
			if (codeGroup == null) continue;
			const content = codeGroup.children[1];
			if (!(content instanceof HTMLElement)) continue;
			for (const line of content.children) {
				if (!(line instanceof HTMLElement)) continue;
				const lineIndexAttr = line.dataset.lineIndex;
				if (lineIndexAttr == null) continue;
				const lineIndex = parseLineIndex(lineIndexAttr, diffStyle);
				let measuredHeight = line.getBoundingClientRect().height;
				let hasMetadata = false;
				if (line.nextElementSibling instanceof HTMLElement && ("lineAnnotation" in line.nextElementSibling.dataset || "noNewline" in line.nextElementSibling.dataset)) {
					if ("noNewline" in line.nextElementSibling.dataset) hasMetadata = true;
					measuredHeight += line.nextElementSibling.getBoundingClientRect().height;
				}
				const expectedHeight = this.getLineHeight(lineIndex, hasMetadata);
				if (measuredHeight === expectedHeight) continue;
				hasLineHeightChange = true;
				if (measuredHeight === this.metrics.lineHeight * (hasMetadata ? 2 : 1)) this.heightCache.delete(lineIndex);
				else this.heightCache.set(lineIndex, measuredHeight);
			}
		}
		if (hasLineHeightChange || this.virtualizer.config.resizeDebugging) this.computeApproximateSize();
	}
	onRender = (dirty) => {
		if (this.fileContainer == null) return false;
		if (dirty) this.top = this.virtualizer.getOffsetInScrollContainer(this.fileContainer);
		return this.render();
	};
	cleanUp() {
		if (this.fileContainer != null) this.virtualizer.disconnect(this.fileContainer);
		super.cleanUp();
	}
	expandHunk = (hunkIndex, direction, expansionLineCountOverride) => {
		this.hunksRenderer.expandHunk(hunkIndex, direction, expansionLineCountOverride);
		this.computeApproximateSize();
		this.renderRange = void 0;
		this.virtualizer.instanceChanged(this);
	};
	setVisibility(visible) {
		if (this.fileContainer == null) return;
		this.renderRange = void 0;
		if (visible && !this.isVisible) {
			this.top = this.virtualizer.getOffsetInScrollContainer(this.fileContainer);
			this.isVisible = true;
		} else if (!visible && this.isVisible) {
			this.isVisible = false;
			this.rerender();
		}
	}
	computeApproximateSize() {
		const isFirstCompute = this.height === 0;
		this.height = 0;
		if (this.fileDiff == null) return;
		const { disableFileHeader = false, expandUnchanged = false, collapsed = false, collapsedContextThreshold = 1, hunkSeparators = "line-info" } = this.options;
		const { diffHeaderHeight, fileGap, hunkSeparatorHeight } = this.metrics;
		const diffStyle = this.getDiffStyle();
		const separatorGap = hunkSeparators !== "simple" && hunkSeparators !== "metadata" && hunkSeparators !== "line-info-basic" ? fileGap : 0;
		if (!disableFileHeader) this.height += diffHeaderHeight;
		else if (hunkSeparators !== "simple" && hunkSeparators !== "metadata") this.height += fileGap;
		if (collapsed) return;
		iterateOverDiff({
			diff: this.fileDiff,
			diffStyle,
			expandedHunks: expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap(),
			collapsedContextThreshold,
			callback: ({ hunkIndex, collapsedBefore, collapsedAfter, deletionLine, additionLine }) => {
				const splitLineIndex = additionLine != null ? additionLine.splitLineIndex : deletionLine.splitLineIndex;
				const unifiedLineIndex = additionLine != null ? additionLine.unifiedLineIndex : deletionLine.unifiedLineIndex;
				const hasMetadata = (additionLine?.noEOFCR ?? false) || (deletionLine?.noEOFCR ?? false);
				if (collapsedBefore > 0) {
					if (hunkIndex > 0) this.height += separatorGap;
					this.height += hunkSeparatorHeight + separatorGap;
				}
				this.height += this.getLineHeight(diffStyle === "split" ? splitLineIndex : unifiedLineIndex, hasMetadata);
				if (collapsedAfter > 0 && hunkSeparators !== "simple") this.height += separatorGap + hunkSeparatorHeight;
			}
		});
		if (this.fileDiff.hunks.length > 0) this.height += fileGap;
		if (this.fileContainer != null && this.virtualizer.config.resizeDebugging && !isFirstCompute) {
			const rect = this.fileContainer.getBoundingClientRect();
			if (rect.height !== this.height) console.log("VirtualizedFileDiff.computeApproximateSize: computed height doesnt match", {
				name: this.fileDiff.name,
				elementHeight: rect.height,
				computedHeight: this.height
			});
			else console.log("VirtualizedFileDiff.computeApproximateSize: computed height IS CORRECT");
		}
	}
	render({ fileContainer, oldFile, newFile, fileDiff, ...props } = {}) {
		const isFirstRender = this.fileContainer == null;
		this.fileDiff ??= fileDiff ?? (oldFile != null && newFile != null ? parseDiffFromFile(oldFile, newFile) : void 0);
		fileContainer = this.getOrCreateFileContainer(fileContainer);
		if (this.fileDiff == null) {
			console.error("VirtualizedFileDiff.render: attempting to virtually render when we dont have the correct data");
			return false;
		}
		if (isFirstRender) {
			this.computeApproximateSize();
			this.virtualizer.connect(fileContainer, this);
			this.top ??= this.virtualizer.getOffsetInScrollContainer(fileContainer);
			this.isVisible = this.virtualizer.isInstanceVisible(this.top, this.height);
		} else this.top ??= this.virtualizer.getOffsetInScrollContainer(fileContainer);
		if (!this.isVisible) return this.renderPlaceholder(this.height);
		const windowSpecs = this.virtualizer.getWindowSpecs();
		const renderRange = this.computeRenderRangeFromWindow(this.fileDiff, this.top, windowSpecs);
		return super.render({
			fileDiff: this.fileDiff,
			fileContainer,
			renderRange,
			oldFile,
			newFile,
			...props
		});
	}
	getDiffStyle() {
		return this.options.diffStyle ?? "split";
	}
	getExpandedRegion(isPartial, hunkIndex, rangeSize) {
		if (rangeSize <= 0 || isPartial) return {
			fromStart: 0,
			fromEnd: 0,
			collapsedLines: Math.max(rangeSize, 0),
			renderAll: false
		};
		const { expandUnchanged = false, collapsedContextThreshold = 1 } = this.options;
		if (expandUnchanged || rangeSize <= collapsedContextThreshold) return {
			fromStart: rangeSize,
			fromEnd: 0,
			collapsedLines: 0,
			renderAll: true
		};
		const region = this.hunksRenderer.getExpandedHunk(hunkIndex);
		const fromStart = Math.min(Math.max(region.fromStart, 0), rangeSize);
		const fromEnd = Math.min(Math.max(region.fromEnd, 0), rangeSize);
		const expandedCount = fromStart + fromEnd;
		const renderAll = expandedCount >= rangeSize;
		return {
			fromStart,
			fromEnd,
			collapsedLines: Math.max(rangeSize - expandedCount, 0),
			renderAll
		};
	}
	getExpandedLineCount(fileDiff, diffStyle) {
		let count = 0;
		if (fileDiff.isPartial) {
			for (const hunk of fileDiff.hunks) count += diffStyle === "split" ? hunk.splitLineCount : hunk.unifiedLineCount;
			return count;
		}
		for (const [hunkIndex, hunk] of fileDiff.hunks.entries()) {
			const hunkCount = diffStyle === "split" ? hunk.splitLineCount : hunk.unifiedLineCount;
			count += hunkCount;
			const collapsedBefore = Math.max(hunk.collapsedBefore, 0);
			const { fromStart, fromEnd, renderAll } = this.getExpandedRegion(fileDiff.isPartial, hunkIndex, collapsedBefore);
			if (collapsedBefore > 0) count += renderAll ? collapsedBefore : fromStart + fromEnd;
		}
		const lastHunk = fileDiff.hunks.at(-1);
		if (lastHunk != null && hasFinalHunk(fileDiff)) {
			const additionRemaining = fileDiff.additionLines.length - (lastHunk.additionLineIndex + lastHunk.additionCount);
			const deletionRemaining = fileDiff.deletionLines.length - (lastHunk.deletionLineIndex + lastHunk.deletionCount);
			if (lastHunk != null && additionRemaining !== deletionRemaining) throw new Error(`VirtualizedFileDiff: trailing context mismatch (additions=${additionRemaining}, deletions=${deletionRemaining}) for ${fileDiff.name}`);
			const trailingRangeSize = Math.min(additionRemaining, deletionRemaining);
			if (lastHunk != null && trailingRangeSize > 0) {
				const { fromStart, renderAll } = this.getExpandedRegion(fileDiff.isPartial, fileDiff.hunks.length, trailingRangeSize);
				count += renderAll ? trailingRangeSize : fromStart;
			}
		}
		return count;
	}
	computeRenderRangeFromWindow(fileDiff, fileTop, { top, bottom }) {
		const { disableFileHeader = false, expandUnchanged = false, collapsedContextThreshold = 1, hunkSeparators = "line-info" } = this.options;
		const { diffHeaderHeight, fileGap, hunkLineCount, hunkSeparatorHeight, lineHeight } = this.metrics;
		const diffStyle = this.getDiffStyle();
		const fileHeight = this.height;
		const lineCount = this.getExpandedLineCount(fileDiff, diffStyle);
		const headerRegion = disableFileHeader ? fileGap : diffHeaderHeight;
		if (fileTop < top - fileHeight || fileTop > bottom) return {
			startingLine: 0,
			totalLines: 0,
			bufferBefore: 0,
			bufferAfter: fileHeight - headerRegion - fileGap
		};
		if (lineCount <= hunkLineCount || fileDiff.hunks.length === 0) return {
			startingLine: 0,
			totalLines: hunkLineCount,
			bufferBefore: 0,
			bufferAfter: 0
		};
		const estimatedTargetLines = Math.ceil(Math.max(bottom - top, 0) / lineHeight);
		const totalLines = Math.ceil(estimatedTargetLines / hunkLineCount) * hunkLineCount + hunkLineCount;
		const totalHunks = totalLines / hunkLineCount;
		const overflowHunks = totalHunks;
		const hunkOffsets = [];
		const viewportCenter = (top + bottom) / 2;
		const separatorGap = hunkSeparators === "simple" || hunkSeparators === "metadata" || hunkSeparators === "line-info-basic" ? 0 : fileGap;
		let absoluteLineTop = fileTop + headerRegion;
		let currentLine = 0;
		let firstVisibleHunk;
		let centerHunk;
		let overflowCounter;
		iterateOverDiff({
			diff: fileDiff,
			diffStyle,
			expandedHunks: expandUnchanged ? true : this.hunksRenderer.getExpandedHunksMap(),
			collapsedContextThreshold,
			callback: ({ hunkIndex, collapsedBefore, collapsedAfter, deletionLine, additionLine }) => {
				const splitLineIndex = additionLine != null ? additionLine.splitLineIndex : deletionLine.splitLineIndex;
				const unifiedLineIndex = additionLine != null ? additionLine.unifiedLineIndex : deletionLine.unifiedLineIndex;
				const hasMetadata = (additionLine?.noEOFCR ?? false) || (deletionLine?.noEOFCR ?? false);
				let gapAdjustment = collapsedBefore > 0 ? hunkSeparatorHeight + separatorGap + (hunkIndex > 0 ? separatorGap : 0) : 0;
				if (hunkIndex === 0 && hunkSeparators === "simple") gapAdjustment = 0;
				absoluteLineTop += gapAdjustment;
				const isAtHunkBoundary = currentLine % hunkLineCount === 0;
				if (isAtHunkBoundary) {
					hunkOffsets.push(absoluteLineTop - (fileTop + headerRegion + gapAdjustment));
					if (overflowCounter != null) {
						if (overflowCounter <= 0) return true;
						overflowCounter--;
					}
				}
				const lineHeight$1 = this.getLineHeight(diffStyle === "split" ? splitLineIndex : unifiedLineIndex, hasMetadata);
				const currentHunk = Math.floor(currentLine / hunkLineCount);
				if (absoluteLineTop > top - lineHeight$1 && absoluteLineTop < bottom) firstVisibleHunk ??= currentHunk;
				if (centerHunk == null && absoluteLineTop + lineHeight$1 > viewportCenter) centerHunk = currentHunk;
				if (overflowCounter == null && absoluteLineTop >= bottom && isAtHunkBoundary) overflowCounter = overflowHunks;
				currentLine++;
				absoluteLineTop += lineHeight$1;
				if (collapsedAfter > 0 && hunkSeparators !== "simple") absoluteLineTop += hunkSeparatorHeight + separatorGap;
				return false;
			}
		});
		if (firstVisibleHunk == null) return {
			startingLine: 0,
			totalLines: 0,
			bufferBefore: 0,
			bufferAfter: fileHeight - headerRegion - fileGap
		};
		const collectedHunks = hunkOffsets.length;
		centerHunk ??= firstVisibleHunk;
		const idealStartHunk = Math.round(centerHunk - totalHunks / 2);
		const maxStartHunk = Math.max(0, collectedHunks - totalHunks);
		const startHunk = Math.max(0, Math.min(idealStartHunk, maxStartHunk));
		const startingLine = startHunk * hunkLineCount;
		const clampedTotalLines = idealStartHunk < 0 ? totalLines + idealStartHunk * hunkLineCount : totalLines;
		const bufferBefore = hunkOffsets[startHunk] ?? 0;
		const finalHunkIndex = startHunk + clampedTotalLines / hunkLineCount;
		return {
			startingLine,
			totalLines: clampedTotalLines,
			bufferBefore,
			bufferAfter: finalHunkIndex < hunkOffsets.length ? fileHeight - headerRegion - hunkOffsets[finalHunkIndex] - fileGap : fileHeight - (absoluteLineTop - fileTop) - fileGap
		};
	}
};
function hasFinalHunk(fileDiff) {
	const lastHunk = fileDiff.hunks.at(-1);
	if (lastHunk == null || fileDiff.isPartial || fileDiff.additionLines.length === 0 || fileDiff.deletionLines.length === 0) return false;
	return lastHunk.additionLineIndex + lastHunk.additionCount < fileDiff.additionLines.length || lastHunk.deletionLineIndex + lastHunk.deletionCount < fileDiff.deletionLines.length;
}
function parseLineIndex(lineIndexAttr, diffStyle) {
	const [unifiedIndex, splitIndex] = lineIndexAttr.split(",").map(Number);
	return diffStyle === "split" ? splitIndex : unifiedIndex;
}
function areObjectsEqual(objA, objB, omitKeys) {
	if (objA === objB || objA == null || objB == null) return objA === objB;
	const omitSet = new Set(omitKeys);
	const keysA = Object.keys(objA);
	const keysBSet = new Set(Object.keys(objB));
	for (const key of keysA) {
		keysBSet.delete(key);
		if (omitSet.has(key)) continue;
		if (!(key in objB) || objA[key] !== objB[key]) return false;
	}
	for (const key of Array.from(keysBSet)) if (!omitSet.has(key)) return false;
	return true;
}
function areOptionsEqual(optionsA, optionsB) {
	return areThemesEqual(optionsA?.theme ?? DEFAULT_THEMES, optionsB?.theme ?? DEFAULT_THEMES) && areObjectsEqual(optionsA, optionsB, ["theme"]);
}
var GutterUtilitySlotStyles = {
	position: "absolute",
	top: 0,
	bottom: 0,
	textAlign: "center"
};
var MergeConflictSlotStyles = { display: "contents" };
function noopRender() {
	return null;
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function templateRender(children, __html) {
	if (typeof window === "undefined" && __html != null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("template", {
		shadowrootmode: "open",
		dangerouslySetInnerHTML: { __html }
	}), children] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var VirtualizerContext = (0, import_react.createContext)(void 0);
function useVirtualizer() {
	return (0, import_react.useContext)(VirtualizerContext);
}
var WorkerPoolContext = (0, import_react.createContext)(void 0);
function useStableCallback(callback) {
	const callbackRef = (0, import_react.useRef)(callback);
	(0, import_react.useInsertionEffect)(() => void (callbackRef.current = callback));
	return (0, import_react.useCallback)((...args) => {
		return callbackRef.current(...args);
	}, []);
}
function renderDiffChildren({ fileDiff, actions, renderCustomHeader, renderHeaderPrefix, renderHeaderMetadata, renderAnnotation, renderGutterUtility, renderHoverUtility, renderMergeConflictUtility, lineAnnotations, getHoveredLine, getInstance }) {
	const gutterUtility = renderGutterUtility ?? renderHoverUtility;
	const customHeader = renderCustomHeader?.(fileDiff);
	const prefix = renderHeaderPrefix?.(fileDiff);
	const metadata = renderHeaderMetadata?.(fileDiff);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		customHeader != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			slot: CUSTOM_HEADER_SLOT_ID,
			children: customHeader
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [prefix != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			slot: "header-prefix",
			children: prefix
		}), metadata != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			slot: "header-metadata",
			children: metadata
		})] }),
		renderAnnotation != null && lineAnnotations?.map((annotation, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			slot: getLineAnnotationName(annotation),
			children: renderAnnotation(annotation)
		}, index)),
		actions != null && renderMergeConflictUtility != null && getInstance != null && actions.map((action) => {
			if (action == null) return;
			const slot = getSlotName(action, fileDiff);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				slot,
				style: MergeConflictSlotStyles,
				children: renderMergeConflictUtility(action, getInstance)
			}, slot);
		}),
		gutterUtility != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			slot: "gutter-utility-slot",
			style: GutterUtilitySlotStyles,
			children: gutterUtility(getHoveredLine)
		})
	] });
}
function getSlotName(action, fileDiff) {
	const anchor = getMergeConflictActionAnchor(action, fileDiff);
	return anchor != null ? getMergeConflictActionSlotName({
		hunkIndex: anchor.hunkIndex,
		lineIndex: anchor.lineIndex,
		conflictIndex: action.conflictIndex
	}) : void 0;
}
var useIsometricEffect = typeof window === "undefined" ? import_react.useEffect : import_react.useLayoutEffect;
function useFileDiffInstance({ fileDiff, options, lineAnnotations, selectedLines, prerenderedHTML, metrics, hasGutterRenderUtility, hasCustomHeader, disableWorkerPool }) {
	const simpleVirtualizer = useVirtualizer();
	const poolManager = (0, import_react.useContext)(WorkerPoolContext);
	const instanceRef = (0, import_react.useRef)(null);
	const ref = useStableCallback((fileContainer) => {
		if (fileContainer != null) {
			if (instanceRef.current != null) throw new Error("useFileDiffInstance: An instance should not already exist when a node is created");
			if (simpleVirtualizer != null) instanceRef.current = new VirtualizedFileDiff(mergeFileDiffOptions({
				hasCustomHeader,
				hasGutterRenderUtility,
				options
			}), simpleVirtualizer, metrics, !disableWorkerPool ? poolManager : void 0, true);
			else instanceRef.current = new FileDiff$1(mergeFileDiffOptions({
				hasCustomHeader,
				hasGutterRenderUtility,
				options
			}), !disableWorkerPool ? poolManager : void 0, true);
			instanceRef.current.hydrate({
				fileDiff,
				fileContainer,
				lineAnnotations,
				prerenderedHTML
			});
		} else {
			if (instanceRef.current == null) throw new Error("useFileDiffInstance: A FileDiff instance should exist when unmounting");
			instanceRef.current.cleanUp();
			instanceRef.current = null;
		}
	});
	useIsometricEffect(() => {
		const { current: instance } = instanceRef;
		if (instance == null) return;
		const newOptions = mergeFileDiffOptions({
			hasCustomHeader,
			hasGutterRenderUtility,
			options
		});
		const forceRender = !areOptionsEqual(instance.options, newOptions);
		instance.setOptions(newOptions);
		instance.render({
			forceRender,
			fileDiff,
			lineAnnotations
		});
		if (selectedLines !== void 0) instance.setSelectedLines(selectedLines);
	});
	return {
		ref,
		getHoveredLine: (0, import_react.useCallback)(() => {
			return instanceRef.current?.getHoveredLine();
		}, [])
	};
}
function mergeFileDiffOptions({ options, hasCustomHeader, hasGutterRenderUtility }) {
	if (hasGutterRenderUtility || hasCustomHeader) return {
		...options,
		renderCustomHeader: hasCustomHeader ? noopRender : void 0,
		renderGutterUtility: hasGutterRenderUtility ? noopRender : void 0
	};
	return options;
}
function FileDiff({ fileDiff, options, metrics, lineAnnotations, selectedLines, className, style, prerenderedHTML, renderAnnotation, renderCustomHeader, renderHeaderPrefix, renderHeaderMetadata, renderGutterUtility, renderHoverUtility, disableWorkerPool = false }) {
	const { ref, getHoveredLine } = useFileDiffInstance({
		fileDiff,
		options,
		metrics,
		lineAnnotations,
		selectedLines,
		prerenderedHTML,
		hasGutterRenderUtility: renderGutterUtility != null || renderHoverUtility != null,
		hasCustomHeader: renderCustomHeader != null,
		disableWorkerPool
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DIFFS_TAG_NAME, {
		ref,
		className,
		style,
		children: templateRender(renderDiffChildren({
			fileDiff,
			renderCustomHeader,
			renderHeaderPrefix,
			renderHeaderMetadata,
			renderAnnotation,
			renderGutterUtility,
			lineAnnotations,
			renderHoverUtility,
			getHoveredLine
		}), prerenderedHTML)
	});
}
function useDiffStyle() {
	const [diffStyle, setDiffStyle] = (0, import_react.useState)("unified");
	return {
		diffStyle,
		toggleDiffStyle: (0, import_react.useCallback)(() => {
			setDiffStyle((prev) => prev === "unified" ? "split" : "unified");
		}, [])
	};
}
const DiffStyleToggle = (0, import_react.memo)(function DiffStyleToggle$1({ diffStyle, onToggle }) {
	const Icon = diffStyle === "unified" ? Columns2 : Rows2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-ui": "chat.diff-style-toggle",
		type: "button",
		className: "absolute top-2 right-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded border-none bg-muted text-muted-foreground opacity-0 transition-all duration-200 ease-in-out hover:opacity-100 hover:[&_.tool-icon]:text-foreground [.relative:hover_&]:opacity-60",
		onClick: onToggle,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: 14,
			className: "tool-icon"
		})
	});
});
function AgentFileDiffHunkView({ filePath, hunk, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDiff, {
		fileDiff: (0, import_react.useMemo)(() => parseDiffFromFile({
			name: filePath,
			contents: hunk.oldString ?? ""
		}, {
			name: filePath,
			contents: hunk.newString ?? ""
		}), [
			filePath,
			hunk.oldString,
			hunk.newString
		]),
		options
	});
}
function AgentFileDiffRenderer({ filePath, hunks }) {
	const { activeShikiTheme, isShikiThemeDark } = useCodeStyle();
	const { diffStyle, toggleDiffStyle } = useDiffStyle();
	const themeType = isShikiThemeDark ? "dark" : "light";
	const diffOptions = (0, import_react.useMemo)(() => ({
		disableFileHeader: true,
		diffStyle,
		overflow: "wrap",
		theme: activeShikiTheme,
		themeType
	}), [
		activeShikiTheme,
		themeType,
		diffStyle
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffStyleToggle, {
		diffStyle,
		onToggle: toggleDiffStyle
	}), hunks.map((hunk, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentFileDiffHunkView, {
		filePath: filePath ?? "",
		hunk,
		options: diffOptions
	}, index))] });
}
export { AgentFileDiffRenderer as default };
