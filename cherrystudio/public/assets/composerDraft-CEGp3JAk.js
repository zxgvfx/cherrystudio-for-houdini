import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { r as FileTypeSchema } from "./file-OKCzlHoD.js";
import { E as withPipelineNodeValues, a as normalizeQuoteTokenPromptText, n as FileComposerToken, t as ComposerToken } from "./tokenView-yvehtvx6.js";
import { a as isComposerMessageTokenKind, o as isComposerTokenKind, r as isComposerInputTokenKind } from "./composerTokenPolicy-BR1gNZTA.js";
import { U as mergeAttributes, nt as NodeSelection, o as Node3, tt as AllSelection } from "./dist-DEHNmG6a.js";
import { i as ReactNodeViewRenderer, r as NodeViewWrapper } from "./dist-DWgqr56K.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var promptVariableInputStyle = {
	minWidth: "2ch",
	maxWidth: "100%"
};
function resizePromptVariableInput(input) {
	if (!input) return;
	input.style.height = "auto";
	if (input.scrollHeight > 0) input.style.height = `${input.scrollHeight}px`;
}
function PromptVariableToken({ token, selected = false, editing = false, className, onCommit, onSelectAll, onEditRequest }) {
	const inputRef = (0, import_react.useRef)(null);
	const isComposingRef = (0, import_react.useRef)(false);
	const isDirtyRef = (0, import_react.useRef)(false);
	const hasFinishedCurrentDraftRef = (0, import_react.useRef)(false);
	const activeEditTokenIdRef = (0, import_react.useRef)(null);
	const onCommitRef = (0, import_react.useRef)(onCommit);
	const onSelectAllRef = (0, import_react.useRef)(onSelectAll);
	const isEditing = editing && !!onCommit;
	onCommitRef.current = onCommit;
	onSelectAllRef.current = onSelectAll;
	(0, import_react.useLayoutEffect)(() => {
		if (!isEditing) {
			activeEditTokenIdRef.current = null;
			isDirtyRef.current = false;
			hasFinishedCurrentDraftRef.current = false;
			return;
		}
		const input = inputRef.current;
		if (!input) return;
		const handleCompositionStart = (event) => {
			event.stopPropagation();
			isComposingRef.current = true;
		};
		const handleCompositionEnd = (event) => {
			event.stopPropagation();
			isComposingRef.current = false;
			const compositionText = event.data;
			const nextValue = compositionText && input.value === token.label ? compositionText : input.value;
			if (input.value !== nextValue) input.value = nextValue;
			if (nextValue !== token.label) isDirtyRef.current = true;
			resizePromptVariableInput(input);
		};
		const updateDraftState = () => {
			isDirtyRef.current = true;
			hasFinishedCurrentDraftRef.current = false;
			resizePromptVariableInput(input);
		};
		const finishEditing = (reason, options = {}) => {
			const nextValue = input.value;
			const dirty = isDirtyRef.current || nextValue !== token.label;
			if (!dirty && hasFinishedCurrentDraftRef.current) return;
			onCommitRef.current?.(nextValue, reason, {
				dirty,
				...options
			});
			isDirtyRef.current = false;
			hasFinishedCurrentDraftRef.current = true;
		};
		const handleKeyDown = (event) => {
			if (event.isComposing || isComposingRef.current) return;
			if ((event.metaKey || event.ctrlKey) && !event.shiftKey && !event.altKey && event.key.toLowerCase() === "a") {
				event.preventDefault();
				event.stopPropagation();
				onSelectAllRef.current?.(input.value, { dirty: isDirtyRef.current });
				isDirtyRef.current = false;
				hasFinishedCurrentDraftRef.current = true;
				return;
			}
			if (event.key === "Enter") {
				event.preventDefault();
				event.stopPropagation();
				finishEditing("enter");
				input.blur();
				return;
			}
			if (event.key === "Tab") {
				event.preventDefault();
				event.stopPropagation();
				finishEditing("tab", { direction: event.shiftKey ? -1 : 1 });
			}
		};
		const handleBlur = () => {
			finishEditing("blur");
		};
		input.addEventListener("compositionstart", handleCompositionStart);
		input.addEventListener("compositionend", handleCompositionEnd);
		input.addEventListener("input", updateDraftState);
		input.addEventListener("change", updateDraftState);
		input.addEventListener("keydown", handleKeyDown);
		input.addEventListener("blur", handleBlur);
		let focusFrame;
		if (activeEditTokenIdRef.current !== token.id) {
			activeEditTokenIdRef.current = token.id;
			isDirtyRef.current = false;
			hasFinishedCurrentDraftRef.current = false;
			input.focus({ preventScroll: true });
			input.select();
			resizePromptVariableInput(input);
			focusFrame = window.requestAnimationFrame(() => {
				input.focus({ preventScroll: true });
				input.select();
				resizePromptVariableInput(input);
			});
		}
		return () => {
			if (focusFrame !== void 0) window.cancelAnimationFrame(focusFrame);
			input.removeEventListener("compositionstart", handleCompositionStart);
			input.removeEventListener("compositionend", handleCompositionEnd);
			input.removeEventListener("input", updateDraftState);
			input.removeEventListener("change", updateDraftState);
			input.removeEventListener("keydown", handleKeyDown);
			input.removeEventListener("blur", handleBlur);
		};
	}, [
		isEditing,
		token.id,
		token.label
	]);
	const handleInputChange = () => {
		isDirtyRef.current = true;
		hasFinishedCurrentDraftRef.current = false;
		resizePromptVariableInput(inputRef.current);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposerToken, {
		token,
		selected,
		className,
		maxWidthClassName: "max-w-full",
		onMouseDown: !isEditing && onEditRequest ? (event) => {
			event.preventDefault();
			event.stopPropagation();
			onEditRequest();
		} : void 0,
		children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			ref: inputRef,
			defaultValue: token.label,
			"aria-label": token.description ?? token.label,
			rows: 1,
			className: "field-sizing-content wrap-anywhere m-0 min-w-0 max-w-full resize-none overflow-hidden whitespace-pre-wrap border-0 bg-transparent p-0 font-[inherit] text-current leading-[inherit] outline-none",
			style: promptVariableInputStyle,
			onChange: handleInputChange,
			onMouseDown: (event) => event.stopPropagation()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "wrap-anywhere min-w-0 whitespace-pre-wrap",
			children: token.label
		})
	});
}
function isComposerDraftTokenKind(value) {
	return isComposerTokenKind(value);
}
function readString(value) {
	return typeof value === "string" ? value : void 0;
}
function readPayload(value) {
	return value == null ? void 0 : value;
}
function normalizePromptText(kind, value) {
	const promptText = readString(value);
	if (!promptText) return void 0;
	if (kind === "quote") return normalizeQuoteTokenPromptText(promptText);
	return promptText;
}
function normalizeComposerTokenAttrs(attrs) {
	const kindValue = attrs.kind;
	const kind = isComposerDraftTokenKind(kindValue) ? kindValue : "reference";
	const label = readString(attrs.label) ?? "";
	const payload = readPayload(attrs.payload);
	const promptText = normalizePromptText(kind, attrs.promptText);
	return {
		id: readString(attrs.id) ?? label,
		kind,
		label,
		...readString(attrs.icon) && { icon: readString(attrs.icon) },
		...readString(attrs.description) && { description: readString(attrs.description) },
		...promptText && { promptText },
		...payload !== void 0 && { payload }
	};
}
const COMPOSER_TOKEN_NODE_NAME = "composerToken";
const COMPOSER_PROMPT_VARIABLE_EDIT_EVENT = "composer-prompt-variable-edit";
function requestComposerPromptVariableEdit(editorDom, tokenId, position) {
	if (!editorDom) return;
	const view = editorDom.ownerDocument.defaultView ?? window;
	const requestFrame = view.requestAnimationFrame.bind(view);
	const dispatchEditRequest = () => {
		editorDom.dispatchEvent(new CustomEvent(COMPOSER_PROMPT_VARIABLE_EDIT_EVENT, { detail: {
			tokenId,
			position
		} }));
	};
	requestFrame(() => {
		dispatchEditRequest();
		requestFrame(dispatchEditRequest);
	});
}
function deleteComposerTokenRange(editor, from, to) {
	editor.view.dispatch(editor.state.tr.delete(from, to).scrollIntoView());
	return true;
}
function deleteComposerTokenNearSelection(editor, nodeName, direction) {
	const { selection } = editor.state;
	if (selection instanceof NodeSelection && selection.node.type.name === nodeName) return deleteComposerTokenRange(editor, selection.from, selection.to);
	if (!selection.empty) return false;
	const adjacentNode = direction < 0 ? selection.$from.nodeBefore : selection.$from.nodeAfter;
	if (!adjacentNode || adjacentNode.type.name !== nodeName) return false;
	const from = direction < 0 ? selection.from - adjacentNode.nodeSize : selection.from;
	return deleteComposerTokenRange(editor, from, from + adjacentNode.nodeSize);
}
function ComposerTokenNodeView(props) {
	const { t } = useTranslation();
	const token = normalizeComposerTokenAttrs(props.node.attrs);
	const editor = props.editor;
	const getNodePosition = props.getPos;
	const nodeSize = props.node.nodeSize;
	const [isPromptVariableEditing, setPromptVariableEditing] = (0, import_react.useState)(false);
	const isPromptVariableEditRequestForCurrentNode = (0, import_react.useCallback)((detail) => {
		if (!detail || detail.tokenId !== token.id) return false;
		if (typeof detail.position !== "number") return true;
		return (typeof getNodePosition === "function" ? getNodePosition() : void 0) === detail.position;
	}, [getNodePosition, token.id]);
	(0, import_react.useLayoutEffect)(() => {
		if (token.kind !== "promptVariable") return;
		const handlePromptVariableEdit = (event) => {
			const detail = event.detail;
			if (isPromptVariableEditRequestForCurrentNode(detail)) setPromptVariableEditing(true);
		};
		props.editor.view.dom.addEventListener(COMPOSER_PROMPT_VARIABLE_EDIT_EVENT, handlePromptVariableEdit);
		return () => {
			props.editor.view.dom.removeEventListener(COMPOSER_PROMPT_VARIABLE_EDIT_EVENT, handlePromptVariableEdit);
		};
	}, [
		isPromptVariableEditRequestForCurrentNode,
		props.editor.view.dom,
		token.kind
	]);
	const commitPromptVariableValue = (value) => {
		props.updateAttributes({
			label: value || token.label,
			promptText: value
		});
	};
	const selectAdjacentPromptVariableToken = (direction) => {
		const currentPosition = typeof props.getPos === "function" ? props.getPos() : void 0;
		if (typeof currentPosition !== "number") return;
		const tokens = [];
		props.editor.state.doc.descendants((node, position) => {
			if (node.type.name !== "composerToken") return;
			const nextToken = normalizeComposerTokenAttrs(node.attrs);
			if (nextToken.kind === "promptVariable") tokens.push({
				position,
				token: nextToken
			});
		});
		if (!tokens.length) return;
		const currentIndex = tokens.findIndex((item) => item.position === currentPosition);
		const nextIndex = direction > 0 ? currentIndex >= 0 ? (currentIndex + 1) % tokens.length : Math.max(0, tokens.findIndex((item) => item.position > currentPosition)) : currentIndex >= 0 ? (currentIndex - 1 + tokens.length) % tokens.length : tokens.findLastIndex((item) => item.position < currentPosition);
		const target = tokens[nextIndex >= 0 ? nextIndex : tokens.length - 1];
		props.editor.chain().focus().setNodeSelection(target.position).run();
		props.editor.commands.editComposerToken(target.token.id, target.position);
	};
	const selectCurrentToken = () => {
		const position = typeof props.getPos === "function" ? props.getPos() : void 0;
		if (typeof position !== "number") return;
		props.editor.chain().focus().setNodeSelection(position).run();
	};
	const removeCurrentToken = (0, import_react.useCallback)(() => {
		const position = typeof getNodePosition === "function" ? getNodePosition() : void 0;
		if (typeof position !== "number") return;
		deleteComposerTokenRange(editor, position, position + nodeSize);
		editor.commands.focus();
	}, [
		editor,
		getNodePosition,
		nodeSize
	]);
	const finishPromptVariableEdit = (value, reason, options) => {
		if (token.kind !== "promptVariable") return;
		if (options.dirty) commitPromptVariableValue(value);
		setPromptVariableEditing(false);
		if (reason === "tab" && options.direction) {
			selectAdjacentPromptVariableToken(options.direction);
			return;
		}
		if (reason === "enter") {
			const position = typeof props.getPos === "function" ? props.getPos() : void 0;
			if (typeof position === "number") props.editor.chain().focus().setTextSelection(position + props.node.nodeSize).run();
		}
	};
	const selectAllComposerContent = (value, options) => {
		if (token.kind !== "promptVariable") return;
		if (options.dirty) commitPromptVariableValue(value);
		setPromptVariableEditing(false);
		props.editor.chain().focus().command(({ tr, dispatch }) => {
			dispatch?.(tr.setSelection(new AllSelection(tr.doc)));
			return true;
		}).run();
	};
	const rendered = props.renderToken?.(token, {
		selected: props.selected,
		nodeViewProps: props
	}) ?? (token.kind === "promptVariable" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptVariableToken, {
		token,
		selected: props.selected,
		editing: isPromptVariableEditing,
		onCommit: finishPromptVariableEdit,
		onSelectAll: selectAllComposerContent,
		onEditRequest: () => {
			selectCurrentToken();
			setPromptVariableEditing(true);
		}
	}) : token.kind === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileComposerToken, {
		token,
		selected: props.selected,
		onRemove: removeCurrentToken,
		removeLabel: t("common.delete")
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposerToken, {
		token,
		selected: props.selected,
		onRemove: removeCurrentToken,
		removeLabel: t("common.delete"),
		onPipelineNodeValuesChange: token.kind === "pipelineNode" ? (values) => {
			const next = withPipelineNodeValues(token, values);
			props.updateAttributes({
				payload: next.payload,
				promptText: next.promptText
			});
		} : void 0
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeViewWrapper, {
		as: "span",
		className: "inline align-baseline",
		contentEditable: false,
		"data-composer-token-node": "",
		children: rendered
	});
}
const ComposerTokenNode = Node3.create({
	name: COMPOSER_TOKEN_NODE_NAME,
	inline: true,
	group: "inline",
	atom: true,
	selectable: true,
	addOptions() {
		return { renderToken: void 0 };
	},
	addAttributes() {
		return {
			id: { default: null },
			kind: { default: "reference" },
			label: { default: "" },
			icon: { default: null },
			description: { default: null },
			promptText: { default: null },
			payload: { default: null }
		};
	},
	parseHTML() {
		return [{ tag: "span[data-composer-token]" }];
	},
	renderHTML({ HTMLAttributes }) {
		const safeAttributes = { ...HTMLAttributes };
		delete safeAttributes.payload;
		return ["span", mergeAttributes(safeAttributes, {
			"data-composer-token": "",
			"data-token-id": HTMLAttributes.id,
			"data-token-kind": HTMLAttributes.kind,
			contenteditable: "false"
		})];
	},
	renderText({ node }) {
		return normalizeComposerTokenAttrs(node.attrs).promptText ?? "";
	},
	addCommands() {
		return {
			insertComposerToken: (token) => ({ commands }) => {
				return commands.insertContent({
					type: this.name,
					attrs: token
				});
			},
			editComposerToken: (tokenId, position) => ({ editor }) => {
				requestComposerPromptVariableEdit(editor.view.dom, tokenId, position);
				return true;
			}
		};
	},
	addKeyboardShortcuts() {
		return {
			Backspace: () => deleteComposerTokenNearSelection(this.editor, this.name, -1),
			Delete: () => deleteComposerTokenNearSelection(this.editor, this.name, 1)
		};
	},
	addNodeView() {
		return ReactNodeViewRenderer((props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposerTokenNodeView, {
			...props,
			renderToken: this.options.renderToken
		}));
	}
});
var LINE_BREAK_PATTERN = /\r\n?|\n/;
function createComposerTokenContent(token) {
	return {
		type: COMPOSER_TOKEN_NODE_NAME,
		attrs: token
	};
}
function appendPlainTextContent(content, text) {
	text.split(LINE_BREAK_PATTERN).forEach((line, index) => {
		if (index > 0) content.push({ type: "hardBreak" });
		if (line) content.push({
			type: "text",
			text: line
		});
	});
}
function createComposerPlainTextContent(text) {
	const content = [];
	appendPlainTextContent(content, text);
	return content;
}
function collectLineMarkers(line, rules) {
	const markers = [];
	rules.forEach((rule, ruleIndex) => {
		for (const match of line.matchAll(rule.pattern)) {
			const marker = rule.resolve(match);
			if (!marker) continue;
			if (marker.from < 0 || marker.to <= marker.from || marker.to > line.length) continue;
			markers.push({
				...marker,
				ruleIndex
			});
		}
	});
	return markers.sort((a, b) => a.from - b.from || a.to - b.to || a.ruleIndex - b.ruleIndex);
}
function appendMarkedLineContent(content, line, rules) {
	const markers = collectLineMarkers(line, rules);
	if (!markers.length) {
		if (line) content.push({
			type: "text",
			text: line
		});
		return false;
	}
	let cursor = 0;
	let hasMarker = false;
	for (const marker of markers) {
		if (marker.from < cursor) continue;
		if (marker.from > cursor) content.push({
			type: "text",
			text: line.slice(cursor, marker.from)
		});
		content.push(createComposerTokenContent(marker.token));
		cursor = marker.to;
		hasMarker = true;
	}
	if (cursor < line.length) content.push({
		type: "text",
		text: line.slice(cursor)
	});
	return hasMarker;
}
function createComposerTokenMarkerInlineContent(text, rules) {
	if (!rules.length) return {
		content: createComposerPlainTextContent(text),
		hasToken: false
	};
	let hasToken = false;
	return {
		content: text.split(LINE_BREAK_PATTERN).flatMap((line, index) => {
			const nodes = [];
			if (index > 0) nodes.push({ type: "hardBreak" });
			if (appendMarkedLineContent(nodes, line, rules)) hasToken = true;
			return nodes;
		}),
		hasToken
	};
}
var PROMPT_VARIABLE_PATTERN = /\$\{([^}\r\n]+)\}/g;
var PROMPT_VARIABLE_ID_PATTERN = /^prompt-variable:(\d+):/;
function pushTextSegment(segments, text) {
	if (!text) return;
	const previous = segments[segments.length - 1];
	if (previous?.type === "text") {
		previous.text += text;
		return;
	}
	segments.push({
		type: "text",
		text
	});
}
function parsePromptVariableSegments(text) {
	const segments = [];
	let cursor = 0;
	let variableIndex = 0;
	for (const match of text.matchAll(PROMPT_VARIABLE_PATTERN)) {
		const raw = match[0];
		const matchIndex = match.index ?? 0;
		const variableName = match[1]?.trim() ?? "";
		if (!variableName) continue;
		pushTextSegment(segments, text.slice(cursor, matchIndex));
		segments.push({
			type: "variable",
			index: variableIndex,
			raw,
			variableName
		});
		variableIndex += 1;
		cursor = matchIndex + raw.length;
	}
	pushTextSegment(segments, text.slice(cursor));
	return segments.length ? segments : [{
		type: "text",
		text
	}];
}
function createPromptVariableToken(variableName, raw, index) {
	return {
		id: `prompt-variable:${index}:${variableName}`,
		kind: "promptVariable",
		label: variableName,
		description: raw,
		promptText: raw,
		payload: {
			raw,
			variableName
		}
	};
}
function createPromptVariableMarkerRule(options = {}) {
	const startIndex = options.startIndex ?? 0;
	let variableIndex = 0;
	return {
		id: "promptVariable",
		pattern: PROMPT_VARIABLE_PATTERN,
		resolve: (match) => {
			const raw = match[0];
			const matchIndex = match.index ?? 0;
			const variableName = match[1]?.trim() ?? "";
			if (!raw || !variableName) return null;
			const token = createPromptVariableToken(variableName, raw, startIndex + variableIndex);
			variableIndex += 1;
			return {
				from: matchIndex,
				to: matchIndex + raw.length,
				token
			};
		}
	};
}
function readPromptVariableIndex(token) {
	if (token.kind !== "promptVariable") return void 0;
	const match = PROMPT_VARIABLE_ID_PATTERN.exec(token.id);
	if (!match) return void 0;
	const index = Number.parseInt(match[1], 10);
	return Number.isFinite(index) ? index : void 0;
}
function getNextPromptVariableIndex(editor) {
	let nextIndex = 0;
	editor.state.doc.descendants((node) => {
		if (node.type.name !== "composerToken") return;
		const index = readPromptVariableIndex(normalizeComposerTokenAttrs(node.attrs));
		if (index !== void 0) nextIndex = Math.max(nextIndex, index + 1);
	});
	return nextIndex;
}
function createPromptVariableInlineContent(text, options = {}) {
	return createComposerTokenMarkerInlineContent(text, [createPromptVariableMarkerRule({ startIndex: options.startIndex ?? 0 })]).content;
}
function createPromptVariableContent(text) {
	const content = createPromptVariableInlineContent(text);
	return {
		type: "doc",
		content: [{
			type: "paragraph",
			...content.length > 0 && { content }
		}]
	};
}
function tokenizePromptVariablesInEditor(editor) {
	const replacements = [];
	let variableIndex = getNextPromptVariableIndex(editor);
	editor.state.doc.descendants((node, position) => {
		if (!node.isText) return;
		const segments = parsePromptVariableSegments(node.text ?? "");
		let offset = 0;
		for (const segment of segments) {
			if (segment.type === "text") {
				offset += segment.text.length;
				continue;
			}
			replacements.push({
				from: position + offset,
				to: position + offset + segment.raw.length,
				token: createPromptVariableToken(segment.variableName, segment.raw, variableIndex)
			});
			variableIndex += 1;
			offset += segment.raw.length;
		}
	});
	if (!replacements.length) return false;
	const tokenNodeType = editor.schema.nodes[COMPOSER_TOKEN_NODE_NAME];
	if (!tokenNodeType) return false;
	const transaction = editor.state.tr;
	for (const replacement of replacements.reverse()) transaction.replaceWith(replacement.from, replacement.to, tokenNodeType.create(replacement.token));
	if (!transaction.docChanged) return false;
	editor.view.dispatch(transaction);
	return true;
}
function getSelectionNode(selection) {
	if (selection instanceof NodeSelection) return selection.node;
	if (!("node" in selection)) return null;
	return selection.node;
}
function getSelectedPromptVariableToken(editor) {
	const selection = editor.state.selection;
	const node = getSelectionNode(selection);
	if (!node) return null;
	if (node.type.name !== "composerToken") return null;
	const token = normalizeComposerTokenAttrs(node.attrs);
	if (token.kind !== "promptVariable") return null;
	return {
		position: selection.from,
		token
	};
}
function selectPromptVariableToken(editor, direction) {
	const tokens = [];
	editor.state.doc.descendants((node, position) => {
		if (node.type.name !== "composerToken") return;
		const token = normalizeComposerTokenAttrs(node.attrs);
		if (token.kind === "promptVariable") tokens.push({
			position,
			token
		});
	});
	if (!tokens.length) return null;
	const currentPosition = editor.state.selection.from;
	const currentIndex = tokens.findIndex((token) => token.position === currentPosition);
	const nextIndex = direction > 0 ? currentIndex >= 0 ? (currentIndex + 1) % tokens.length : Math.max(0, tokens.findIndex((token) => token.position > currentPosition)) : currentIndex >= 0 ? (currentIndex - 1 + tokens.length) % tokens.length : tokens.findLastIndex((token) => token.position < currentPosition);
	const target = tokens[nextIndex >= 0 ? nextIndex : tokens.length - 1];
	editor.chain().focus().setNodeSelection(target.position).run();
	if (editor.commands?.editComposerToken) editor.commands.editComposerToken(target.token.id, target.position);
	else requestComposerPromptVariableEdit(editor.view?.dom, target.token.id, target.position);
	return target.token;
}
function updateSelectedPromptVariableToken(editor, nextValue) {
	const selected = getSelectedPromptVariableToken(editor);
	if (!selected) return false;
	const selection = editor.state.selection;
	const node = getSelectionNode(selection);
	if (!node) return false;
	const nextLabel = nextValue || selected.token.label;
	const transaction = editor.state.tr.setNodeMarkup(selected.position, void 0, {
		...node.attrs,
		label: nextLabel,
		promptText: nextValue
	});
	if (selection instanceof NodeSelection) transaction.setSelection(NodeSelection.create(transaction.doc, selected.position));
	editor.view.dispatch(transaction);
	return true;
}
var COMPOSER_MESSAGE_SNAPSHOT_VERSION = 1;
const COMPOSER_INPUT_MAX_LENGTH = 4e4;
function isEditorSource(source) {
	return typeof source.getJSON === "function";
}
function appendTextContent(nodes, text) {
	text.split(/\r\n?|\n/).forEach((line, index) => {
		if (index > 0) nodes.push({ type: "hardBreak" });
		if (line) nodes.push({
			type: "text",
			text: line
		});
	});
}
function getRestoredTextSuffix(payload) {
	if (typeof payload !== "object" || payload === null || Array.isArray(payload)) return "";
	const restoredTextSuffix = payload.restoredTextSuffix;
	return typeof restoredTextSuffix === "string" ? restoredTextSuffix : "";
}
function readPayloadObject(payload) {
	if (typeof payload !== "object" || payload === null || Array.isArray(payload)) return void 0;
	return payload;
}
function readPayloadString(payload, key) {
	const value = payload[key];
	return typeof value === "string" ? value : void 0;
}
function createDisplayFileTokenPayload(token) {
	if (token.kind === "pipelineNode") {
		const payload$1 = readPayloadObject(token.payload);
		const nodeId = payload$1 ? readPayloadString(payload$1, "nodeId") : void 0;
		if (!payload$1 || !nodeId) return void 0;
		return {
			nodeId,
			values: readPayloadObject(payload$1.values) ?? {}
		};
	}
	if (token.kind !== "file") return void 0;
	const payload = readPayloadObject(token.payload);
	if (!payload) return void 0;
	const displayPayload = {};
	const type = FileTypeSchema.safeParse(payload.type);
	if (type.success) displayPayload.type = type.data;
	const ext = readPayloadString(payload, "ext");
	if (ext) displayPayload.ext = ext;
	const name = readPayloadString(payload, "name");
	if (name) displayPayload.name = name;
	const originName = readPayloadString(payload, "origin_name");
	if (originName) displayPayload.origin_name = originName;
	if (typeof payload.size === "number") displayPayload.size = payload.size;
	return Object.keys(displayPayload).length > 0 ? displayPayload : void 0;
}
function getRestorableQuoteTextSuffix(text, start) {
	if (text.startsWith("\r\n", start)) return "\r\n";
	const next = text[start];
	return next === " " || next === "\n" || next === "\r" ? next : "";
}
function createComposerTokenNode(token, restoredTextSuffix = "") {
	const basePayload = readPayloadObject(token.payload);
	const payload = restoredTextSuffix ? {
		...basePayload,
		restoredTextSuffix
	} : basePayload;
	return {
		type: COMPOSER_TOKEN_NODE_NAME,
		attrs: {
			id: token.id,
			kind: token.kind,
			label: token.label,
			...token.icon && { icon: token.icon },
			...token.description && { description: token.description },
			...token.promptText && { promptText: token.promptText },
			...payload && { payload }
		}
	};
}
function createComposerContent(text, sourceTokens, isRestorableKind) {
	const nodes = [];
	const tokens = sourceTokens.filter((token) => isRestorableKind(token.kind) && token.label).toSorted((a, b) => a.textOffset - b.textOffset || a.index - b.index);
	if (!tokens.length) {
		appendTextContent(nodes, text);
		return {
			type: "doc",
			content: [{
				type: "paragraph",
				...nodes.length > 0 && { content: nodes }
			}]
		};
	}
	let cursor = 0;
	tokens.forEach((token) => {
		const offset = Math.max(cursor, Math.min(text.length, token.textOffset));
		if (offset > cursor) {
			appendTextContent(nodes, text.slice(cursor, offset));
			cursor = offset;
		}
		const promptText = token.promptText;
		const promptTextMatches = !!promptText && text.slice(offset, offset + promptText.length) === promptText;
		if (promptText && !promptTextMatches) return;
		const restoredTextSuffix = promptTextMatches && token.kind === "quote" ? getRestorableQuoteTextSuffix(text, offset + promptText.length) : "";
		nodes.push(createComposerTokenNode(token, restoredTextSuffix));
		if (promptTextMatches) cursor = offset + promptText.length + restoredTextSuffix.length;
	});
	if (cursor < text.length) appendTextContent(nodes, text.slice(cursor));
	return {
		type: "doc",
		content: [{
			type: "paragraph",
			...nodes.length > 0 && { content: nodes }
		}]
	};
}
function createComposerDraftContent(draft) {
	const inputTokens = draft.tokens.filter((token) => isComposerInputTokenKind(token.kind));
	if (!inputTokens.length) return createPromptVariableContent(draft.text);
	return createComposerContent(draft.text, inputTokens, isComposerInputTokenKind);
}
function serializeComposerDocument(source) {
	const json = isEditorSource(source) ? source.getJSON() : source;
	const tokens = [];
	let text = "";
	const visitNode = (node) => {
		if (node.type === "text") {
			text += node.text ?? "";
			return;
		}
		if (node.type === "hardBreak") {
			text += "\n";
			return;
		}
		if (node.type === "composerToken") {
			const token = normalizeComposerTokenAttrs(node.attrs ?? {});
			const restoredTextSuffix = getRestoredTextSuffix(token.payload);
			tokens.push({
				...token,
				index: tokens.length,
				textOffset: text.length
			});
			text += token.promptText ?? "";
			text += restoredTextSuffix;
			return;
		}
		if (!node.content?.length) return;
		if (node.type === "doc") {
			node.content.forEach((child, index) => {
				if (index > 0) text += "\n";
				visitNode(child);
			});
			return;
		}
		node.content.forEach(visitNode);
	};
	visitNode(json);
	return {
		text,
		tokens
	};
}
function excludeComposerDraftTokens(draft, shouldExclude) {
	if (!draft.tokens.some(shouldExclude)) return draft;
	const cuts = [];
	draft.tokens.filter(shouldExclude).map((token) => {
		const start = Math.min(draft.text.length, Math.max(0, token.textOffset));
		const promptText = token.promptText ?? "";
		if (!promptText || !draft.text.startsWith(promptText, start)) return {
			start,
			end: start
		};
		const end = start + promptText.length;
		return {
			start,
			end: draft.text[end] === " " ? end + 1 : end
		};
	}).filter((cut) => cut.end > cut.start).sort((first, second) => first.start - second.start).forEach((cut) => {
		const previous = cuts.at(-1);
		if (previous && cut.start <= previous.end) previous.end = Math.max(previous.end, cut.end);
		else cuts.push({ ...cut });
	});
	let text = "";
	let cursor = 0;
	cuts.forEach((cut) => {
		text += draft.text.slice(cursor, cut.start);
		cursor = cut.end;
	});
	text += draft.text.slice(cursor);
	const rebase = (offset) => {
		let removed = 0;
		for (const cut of cuts) {
			if (cut.start >= offset) break;
			removed += Math.min(offset, cut.end) - cut.start;
		}
		return offset - removed;
	};
	return {
		text,
		tokens: draft.tokens.filter((token) => !shouldExclude(token)).map((token, index) => ({
			...token,
			index,
			textOffset: rebase(Math.max(0, token.textOffset))
		}))
	};
}
function getComposerLineRanges(text) {
	const lines = [];
	let start = 0;
	for (let index = 0; index <= text.length; index += 1) {
		if (index < text.length && text[index] !== "\n") continue;
		const contentEnd = index > start && text[index - 1] === "\r" ? index - 1 : index;
		lines.push({
			start,
			contentEnd
		});
		start = index + 1;
	}
	return lines;
}
function trimComposerDraftBoundaryBlankLines(draft) {
	const lines = getComposerLineRanges(draft.text);
	const tokenRanges = draft.tokens.map((token) => {
		const start$1 = Math.min(draft.text.length, Math.max(0, token.textOffset));
		return {
			start: start$1,
			end: Math.min(draft.text.length, start$1 + (token.promptText?.length ?? 0))
		};
	});
	const meaningfulLineIndexes = lines.flatMap((line, index) => {
		const hasText = draft.text.slice(line.start, line.contentEnd).trim().length > 0;
		const hasToken = tokenRanges.some((token) => token.start <= line.contentEnd && token.end >= line.start);
		return hasText || hasToken ? [index] : [];
	});
	const firstMeaningfulLineIndex = meaningfulLineIndexes[0];
	if (firstMeaningfulLineIndex === void 0) return draft.text.length === 0 ? draft : {
		...draft,
		text: "",
		tokens: []
	};
	const lastMeaningfulLineIndex = meaningfulLineIndexes.at(-1) ?? firstMeaningfulLineIndex;
	const start = lines[firstMeaningfulLineIndex].start;
	const end = lines[lastMeaningfulLineIndex].contentEnd;
	if (start === 0 && end === draft.text.length) return draft;
	const text = draft.text.slice(start, end);
	return {
		text,
		tokens: draft.tokens.map((token) => ({
			...token,
			textOffset: Math.min(text.length, Math.max(0, token.textOffset - start))
		}))
	};
}
function createComposerMessageSnapshot(draft) {
	const visibleTokens = draft.tokens.filter((token) => isComposerMessageTokenKind(token.kind));
	if (visibleTokens.length === 0) return void 0;
	return {
		version: COMPOSER_MESSAGE_SNAPSHOT_VERSION,
		tokens: visibleTokens.map((token) => {
			const { id, kind, label, icon, description, index, textOffset, promptText } = token;
			const payload = createDisplayFileTokenPayload(token);
			return {
				id,
				kind,
				label,
				...icon && { icon },
				...description && { description },
				index,
				textOffset,
				...promptText && { promptText },
				...payload && { payload }
			};
		})
	};
}
function createComposerTextPart(text, composer) {
	if (!composer) return {
		type: "text",
		text
	};
	return {
		type: "text",
		text,
		providerMetadata: { cherry: { composer } }
	};
}
function createComposerUserMessageParts(draft) {
	return [createComposerTextPart(draft.text, createComposerMessageSnapshot(draft))];
}
export { createComposerTokenMarkerInlineContent as _, serializeComposerDocument as a, isComposerDraftTokenKind as b, createPromptVariableInlineContent as c, getSelectedPromptVariableToken as d, selectPromptVariableToken as f, createComposerTokenContent as g, createComposerPlainTextContent as h, excludeComposerDraftTokens as i, createPromptVariableMarkerRule as l, updateSelectedPromptVariableToken as m, createComposerDraftContent as n, trimComposerDraftBoundaryBlankLines as o, tokenizePromptVariablesInEditor as p, createComposerUserMessageParts as r, createPromptVariableContent as s, COMPOSER_INPUT_MAX_LENGTH as t, getNextPromptVariableIndex as u, COMPOSER_TOKEN_NODE_NAME as v, ComposerTokenNode as y };
