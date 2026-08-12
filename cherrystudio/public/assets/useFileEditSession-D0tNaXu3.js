import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { c as DynamicVirtualList_default } from "./providerSettings-Dq9K8OTx.js";
import { t as debounce } from "./debounce-BIuc7S_h.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { t as Input } from "./input-dvr72LyA.js";
import { n as CommandContextMenu } from "./command-Dkd9__0y.js";
import { t as IpcError } from "./IpcError-D-kcO4bk.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { d as useSWR, f as useSWRConfig } from "./useDataApi-DhDD9bgI.js";
import { t as ChevronRight } from "./chevron-right-CvFIUMTW.js";
import { t as Search } from "./search-CQaFGVmj.js";
import { t as X } from "./x-CZLr1OkN.js";
import { t as fileErrorCodes } from "./file-CjuTUJva.js";
import { t as Icon } from "./iconify-o-kjzozp.js";
import { i as getFileIconName } from "./constants-C567rLtO.js";
function flattenTree(data, adapter, expandedIds) {
	const out = [];
	const visitedIds = /* @__PURE__ */ new Set();
	const walk = (nodes, depth) => {
		for (const node of nodes) {
			const id = adapter.getId(node);
			if (visitedIds.has(id)) continue;
			visitedIds.add(id);
			out.push({
				id,
				node,
				depth
			});
			if (expandedIds.has(id)) {
				const children = adapter.getChildren(node);
				if (children && children.length > 0) walk(children, depth + 1);
			}
		}
	};
	walk(data, 0);
	return out;
}
var import_react = /* @__PURE__ */ __toESM(require_react());
const TreeActionsContext = (0, import_react.createContext)(null);
const TreeSelectionContext = (0, import_react.createContext)(null);
function ensure(value, name) {
	if (value === null) throw new Error(`${name} must be used inside <TreeView />`);
	return value;
}
function useTreeActions() {
	return ensure((0, import_react.use)(TreeActionsContext), "useTreeActions");
}
function useTreeSelection() {
	return ensure((0, import_react.use)(TreeSelectionContext), "useTreeSelection");
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function TreeRowInner(props) {
	const { id, node, depth, hasChildren, isDragging, isDragOver, dragPosition, renderRow } = props;
	const { toggleExpanded, selectNode, getDragHandleProps } = useTreeActions();
	const { expandedIds, selectedId } = useTreeSelection();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: renderRow({
		node,
		depth,
		isExpanded: expandedIds.has(id),
		isSelected: selectedId === id,
		isDragging,
		isDragOver,
		dragPosition,
		toggleExpanded: (0, import_react.useCallback)(() => {
			if (hasChildren) toggleExpanded(id);
		}, [
			hasChildren,
			id,
			toggleExpanded
		]),
		selectNode: (0, import_react.useCallback)(() => {
			selectNode(id);
		}, [id, selectNode]),
		dragHandleProps: getDragHandleProps(id)
	}) });
}
const TreeRow = (0, import_react.memo)(TreeRowInner);
var EMPTY_SET = /* @__PURE__ */ new Set();
function useExpandedState(options) {
	const { expandedIds: controlled, defaultExpandedIds, onExpandedChange } = options;
	const isControlled = controlled !== void 0;
	const [internal, setInternal] = (0, import_react.useState)(defaultExpandedIds ?? EMPTY_SET);
	const internalRef = (0, import_react.useRef)(internal);
	internalRef.current = internal;
	const current = isControlled ? controlled : internal;
	return {
		expandedIds: current,
		toggle: (0, import_react.useCallback)((id) => {
			const next = new Set(isControlled ? controlled : internalRef.current);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			if (!isControlled) {
				internalRef.current = next;
				setInternal(next);
			}
			onExpandedChange?.(next);
		}, [
			controlled,
			isControlled,
			onExpandedChange
		]),
		isExpanded: (0, import_react.useCallback)((id) => current.has(id), [current])
	};
}
function useSelectionState(options) {
	const { selectedId: controlled, defaultSelectedId, onSelectedChange } = options;
	const isControlled = controlled !== void 0;
	const [internal, setInternal] = (0, import_react.useState)(defaultSelectedId ?? null);
	const current = isControlled ? controlled ?? null : internal;
	return {
		selectedId: current,
		select: (0, import_react.useCallback)((id) => {
			if (!isControlled) setInternal(id);
			onSelectedChange?.(id);
		}, [isControlled, onSelectedChange]),
		isSelected: (0, import_react.useCallback)((id) => current === id, [current])
	};
}
var NOOP = () => {};
var DISABLED_HANDLE = {
	draggable: false,
	onDragStart: NOOP,
	onDragOver: NOOP,
	onDragLeave: NOOP,
	onDrop: NOOP,
	onDragEnd: NOOP
};
function useTreeDragAndDrop(options) {
	const { onMove, canHaveChildren } = options;
	const enabled = typeof onMove === "function";
	const [draggedId, setDraggedId] = (0, import_react.useState)(null);
	const [dragOverId, setDragOverId] = (0, import_react.useState)(null);
	const [dragPosition, setDragPosition] = (0, import_react.useState)(null);
	const positionRef = (0, import_react.useRef)(null);
	const draggedIdRef = (0, import_react.useRef)(null);
	const clear = (0, import_react.useCallback)(() => {
		draggedIdRef.current = null;
		setDraggedId(null);
		setDragOverId(null);
		setDragPosition(null);
		positionRef.current = null;
	}, []);
	const handleDragStart = (0, import_react.useCallback)((nodeId) => (e) => {
		draggedIdRef.current = nodeId;
		setDraggedId(nodeId);
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", nodeId);
		const el = e.currentTarget;
		if (el?.parentElement) {
			const rect = el.getBoundingClientRect();
			const ghost = el.cloneNode(true);
			ghost.style.width = `${rect.width}px`;
			ghost.style.opacity = "0.7";
			ghost.style.position = "absolute";
			ghost.style.top = "-1000px";
			document.body.appendChild(ghost);
			e.dataTransfer.setDragImage(ghost, 10, 10);
			setTimeout(() => {
				if (ghost.parentNode) document.body.removeChild(ghost);
			}, 0);
		}
	}, []);
	const handleDragOver = (0, import_react.useCallback)((nodeId) => (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
		if (draggedIdRef.current === nodeId) return;
		setDragOverId(nodeId);
		const rect = e.currentTarget.getBoundingClientRect();
		const mouseY = e.clientY;
		const thresholdTop = rect.top + rect.height * .3;
		const thresholdBottom = rect.bottom - rect.height * .3;
		const allowInside = canHaveChildren ? canHaveChildren(nodeId) : true;
		let next;
		if (mouseY < thresholdTop) next = "before";
		else if (mouseY > thresholdBottom) next = "after";
		else next = allowInside ? "inside" : "after";
		positionRef.current = next;
		setDragPosition(next);
	}, [canHaveChildren]);
	const handleDragLeave = (0, import_react.useCallback)(() => {
		setDragOverId(null);
		setDragPosition(null);
		positionRef.current = null;
	}, []);
	const handleDrop = (0, import_react.useCallback)((nodeId) => (e) => {
		e.preventDefault();
		const sourceId = draggedIdRef.current;
		const fallbackPosition = canHaveChildren?.(nodeId) === false ? "after" : "inside";
		const finalPosition = positionRef.current ?? fallbackPosition;
		if (sourceId && sourceId !== nodeId && onMove) onMove(sourceId, nodeId, finalPosition);
		clear();
	}, [
		canHaveChildren,
		onMove,
		clear
	]);
	const handleDragEnd = (0, import_react.useCallback)(() => {
		clear();
	}, [clear]);
	const getDragHandleProps = (0, import_react.useMemo)(() => {
		const handleCache = /* @__PURE__ */ new Map();
		return (nodeId) => {
			if (!enabled) return DISABLED_HANDLE;
			const cached = handleCache.get(nodeId);
			if (cached) return cached;
			const handleProps = {
				draggable: true,
				onDragStart: handleDragStart(nodeId),
				onDragOver: handleDragOver(nodeId),
				onDragLeave: handleDragLeave,
				onDrop: handleDrop(nodeId),
				onDragEnd: handleDragEnd
			};
			handleCache.set(nodeId, handleProps);
			return handleProps;
		};
	}, [
		enabled,
		handleDragStart,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleDragEnd
	]);
	return {
		draggedId: enabled ? draggedId : null,
		dragOverId: enabled ? dragOverId : null,
		dragPosition: enabled ? dragPosition : null,
		getDragHandleProps
	};
}
function TreeView(props) {
	const { data, adapter, expandedIds: controlledExpanded, defaultExpandedIds, onExpandedChange, selectedId: controlledSelected, defaultSelectedId, onSelectedChange, renderRow, onMove, renderList, className, emptyState } = props;
	const expanded = useExpandedState({
		expandedIds: controlledExpanded,
		defaultExpandedIds,
		onExpandedChange
	});
	const selection = useSelectionState({
		selectedId: controlledSelected,
		defaultSelectedId,
		onSelectedChange
	});
	const flat = (0, import_react.useMemo)(() => flattenTree(data, adapter, expanded.expandedIds), [
		data,
		adapter,
		expanded.expandedIds
	]);
	const flatById = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of flat) map.set(item.id, item);
		return map;
	}, [flat]);
	const drag = useTreeDragAndDrop({
		onMove,
		canHaveChildren: (0, import_react.useCallback)((id) => {
			const found = flatById.get(id);
			if (!found) return false;
			const fn = adapter.canHaveChildren;
			return fn ? fn(found.node) : true;
		}, [adapter, flatById])
	});
	const actionsValue = (0, import_react.useMemo)(() => ({
		toggleExpanded: expanded.toggle,
		selectNode: selection.select,
		getDragHandleProps: drag.getDragHandleProps
	}), [
		expanded.toggle,
		selection.select,
		drag.getDragHandleProps
	]);
	const selectionValue = (0, import_react.useMemo)(() => ({
		expandedIds: expanded.expandedIds,
		selectedId: selection.selectedId
	}), [expanded.expandedIds, selection.selectedId]);
	const renderItem = (0, import_react.useCallback)((index) => {
		const item = flat[index];
		if (!item) return null;
		const children = adapter.getChildren(item.node);
		const hasChildren = !!(children && children.length > 0) || adapter.canHaveChildren?.(item.node) === true;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeRow, {
			id: item.id,
			node: item.node,
			depth: item.depth,
			hasChildren,
			isDragging: drag.draggedId === item.id,
			isDragOver: drag.dragOverId === item.id,
			dragPosition: drag.dragOverId === item.id ? drag.dragPosition : null,
			renderRow
		}, item.id);
	}, [
		flat,
		adapter,
		renderRow,
		drag.draggedId,
		drag.dragOverId,
		drag.dragPosition
	]);
	const isSticky = (0, import_react.useCallback)((index) => {
		const item = flat[index];
		if (!item) return false;
		return adapter.isSticky ? adapter.isSticky(item.node) : false;
	}, [adapter, flat]);
	const getItemDepth = (0, import_react.useCallback)((index) => flat[index]?.depth ?? 0, [flat]);
	if (flat.length === 0 && emptyState !== void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.tree-view",
		className: cn("flex h-full w-full items-center justify-center", className),
		children: emptyState
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeActionsContext, {
		value: actionsValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeSelectionContext, {
			value: selectionValue,
			children: renderList ? renderList({
				flat,
				isSticky,
				getItemDepth,
				renderItem
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "ui.tree-view",
				className: cn("flex flex-col", className),
				children: flat.map((_item, index) => renderItem(index))
			})
		})
	});
}
var INDENT_STEP_PX = 12;
var INDENT_BASE_PX = 8;
var ICON_SIZE_PX = 16;
var CHEVRON_SIZE_PX = 11;
var MATERIAL_ICON_PREFIX = "material-icon-theme:";
function FileTreeRow(props) {
	const { args, renameSlot, animationSlot, renderRowExtras, getMenuItems, fileIcon, folderIcon } = props;
	const { node, depth, isExpanded, isSelected, isDragging, dragPosition, toggleExpanded, selectNode, dragHandleProps } = args;
	const isFolder = node.kind === "folder";
	const isRenaming = renameSlot ? renameSlot.isRenaming(node) : false;
	const effectiveDragHandleProps = isRenaming ? {
		...dragHandleProps,
		draggable: false
	} : dragHandleProps;
	const nameAnimationClassName = animationSlot ? animationSlot.isAnimating(node) ? "animation-shimmer" : animationSlot.isNewlyRenamed(node) ? "animation-reveal" : "" : "";
	const renderIcon = () => {
		if (isFolder) return folderIcon ? folderIcon(node, isExpanded) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			icon: `${MATERIAL_ICON_PREFIX}${isExpanded ? "folder-open" : "folder"}`,
			className: "shrink-0",
			width: ICON_SIZE_PX,
			height: ICON_SIZE_PX
		});
		return fileIcon ? fileIcon(node) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			icon: `${MATERIAL_ICON_PREFIX}${getFileIconName(node.name)}`,
			className: "shrink-0",
			width: ICON_SIZE_PX,
			height: ICON_SIZE_PX
		});
	};
	const handleRowClick = () => {
		selectNode();
		if (isFolder) toggleExpanded();
	};
	const indent = { paddingLeft: `${depth * INDENT_STEP_PX + INDENT_BASE_PX}px` };
	const row = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.file-tree-row",
		...mergeUiProps(effectiveDragHandleProps, "ui.file-tree-row"),
		"data-node-id": node.id,
		"data-kind": node.kind,
		onClick: handleRowClick,
		title: node.name,
		style: indent,
		className: cn("group relative flex select-none items-center gap-1.5 rounded-3xs py-1 pr-2 text-left text-sm", "transition-colors", isFolder ? "text-foreground hover:bg-accent/50" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground", isSelected && "bg-accent/60 text-accent-foreground", isDragging && "opacity-50", dragPosition === "inside" && "bg-primary/15 ring-1 ring-primary/40", dragPosition === "before" && "before:-top-px before:absolute before:inset-x-1 before:h-0.5 before:rounded before:bg-primary before:content-['']", dragPosition === "after" && "after:-bottom-px after:absolute after:inset-x-1 after:h-0.5 after:rounded after:bg-primary after:content-['']"),
		children: [
			isFolder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				onClick: (e) => {
					e.stopPropagation();
					toggleExpanded();
				},
				className: "size-auto min-h-0 shrink-0 rounded-none p-0 text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground",
				tabIndex: -1,
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					size: CHEVRON_SIZE_PX,
					className: "shrink-0 transition-transform",
					style: { transform: isExpanded ? "rotate(90deg)" : "none" }
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-block size-3 shrink-0",
				"aria-hidden": "true"
			}),
			renderIcon(),
			isRenaming && renameSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				...renameSlot.inputProps,
				onClick: (e) => e.stopPropagation(),
				className: cn("min-w-0 flex-1 rounded border bg-background px-1 text-sm leading-4 outline-none", renameSlot.inputProps.className),
				autoFocus: true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("min-w-0 flex-1 truncate", nameAnimationClassName),
				children: node.name
			}),
			renderRowExtras ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				onClick: (e) => e.stopPropagation(),
				className: "shrink-0",
				children: renderRowExtras(node)
			}) : null
		]
	});
	const menuItems = getMenuItems?.(node);
	if (!menuItems || menuItems.length === 0) return row;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "webcontents.context",
		extraItems: menuItems,
		children: row
	});
}
var DEFAULT_ITEM_SIZE = 28;
var VIRTUAL_OVERSCAN = 10;
function FileTree(props) {
	const { nodes, expandedIds, defaultExpandedIds, onExpandedChange, selectedId, defaultSelectedId, onSelectedChange, onMove, renameSlot, animationSlot, renderRowExtras, getMenuItems, fileIcon, folderIcon, renderList, stickyFolders = true, showSearch = false, searchKeyword = "", onSearchKeywordChange, searchPlaceholder, searchToolbar, searchClearLabel, emptyState } = props;
	const adapter = (0, import_react.useMemo)(() => ({
		getId: (n) => n.id,
		getChildren: (n) => n.children,
		canHaveChildren: (n) => n.kind === "folder",
		isSticky: stickyFolders ? (n) => n.kind === "folder" : void 0
	}), [stickyFolders]);
	const renderRow = (0, import_react.useCallback)((args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTreeRow, {
		args,
		renameSlot,
		animationSlot,
		renderRowExtras,
		getMenuItems,
		fileIcon,
		folderIcon
	}), [
		renameSlot,
		animationSlot,
		renderRowExtras,
		getMenuItems,
		fileIcon,
		folderIcon
	]);
	const defaultRenderList = (0, import_react.useCallback)(({ flat, isSticky, getItemDepth, renderItem }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicVirtualList_default, {
		list: flat,
		estimateSize: () => DEFAULT_ITEM_SIZE,
		overscan: VIRTUAL_OVERSCAN,
		isSticky,
		getItemDepth,
		children: (_item, index) => renderItem(index)
	}), []);
	const tree = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeView, {
		data: nodes,
		adapter,
		expandedIds,
		defaultExpandedIds,
		onExpandedChange,
		selectedId,
		defaultSelectedId,
		onSelectedChange,
		onMove,
		renderRow,
		renderList: renderList ?? defaultRenderList,
		emptyState
	});
	if (!showSearch) return tree;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.file-tree",
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 px-2 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 14,
						className: "-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "text",
						value: searchKeyword,
						onChange: (e) => onSearchKeywordChange?.(e.target.value),
						placeholder: searchPlaceholder,
						className: "h-8 min-w-0 flex-1 pr-7 pl-7 text-sm",
						"data-testid": "file-tree-search-input"
					}),
					searchKeyword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": searchClearLabel ?? "Clear search",
						onClick: () => onSearchKeywordChange?.(""),
						className: "-translate-y-1/2 absolute top-1/2 right-1 flex size-5 cursor-pointer items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
					})
				]
			}), searchToolbar]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1",
			children: tree
		})]
	});
}
var UnsupportedFileTextError = class extends Error {
	constructor(reason) {
		super(`Text file editing is not supported (${reason})`);
		this.reason = reason;
		this.name = "UnsupportedFileTextError";
	}
};
var UTF8_BOM = new Uint8Array([
	239,
	187,
	191
]);
function hasUtf8Bom(bytes) {
	return bytes.length >= UTF8_BOM.length && UTF8_BOM.every((value, index) => bytes[index] === value);
}
function decodeFileText(bytes) {
	const hasBom = hasUtf8Bom(bytes);
	let content;
	try {
		content = new TextDecoder("utf-8", { fatal: true }).decode(hasBom ? bytes.slice(UTF8_BOM.length) : bytes);
	} catch {
		throw new UnsupportedFileTextError("encoding");
	}
	if (content.includes("\0")) throw new UnsupportedFileTextError("encoding");
	const withoutCrlf = content.replace(/\r\n/g, "");
	const hasCrlf = content.includes("\r\n");
	if (withoutCrlf.includes("\r") || hasCrlf && withoutCrlf.includes("\n")) throw new UnsupportedFileTextError("mixed-line-endings");
	return {
		content: hasCrlf ? content.replace(/\r\n/g, "\n") : content,
		lineEnding: hasCrlf ? "crlf" : "lf",
		hasBom
	};
}
function encodeFileText(content, lineEnding, hasBom) {
	const normalized = content.replace(/\r\n?/g, "\n");
	const encoded = new TextEncoder().encode(lineEnding === "crlf" ? normalized.replace(/\n/g, "\r\n") : normalized);
	if (!hasBom) return encoded;
	const withBom = new Uint8Array(UTF8_BOM.length + encoded.length);
	withBom.set(UTF8_BOM);
	withBom.set(encoded, UTF8_BOM.length);
	return withBom;
}
var logger = loggerService.withContext("useFileEditSession");
var AUTOSAVE_DEBOUNCE_MS = 800;
var MAX_STALE_REBASES = 3;
const FILE_EDIT_MAX_SIZE_BYTES = 2 * 1024 * 1024;
var keyOf = (handle) => handle.kind === "entry" ? `file-edit-session/entry/${handle.entryId}` : `file-edit-session/path/${handle.path}`;
async function readFile(handle) {
	const { content, version } = await ipcApi.request("file.read", {
		handle,
		options: {
			mode: "full",
			encoding: "binary"
		}
	});
	if (content.byteLength > 2097152) throw new UnsupportedFileTextError("size");
	const decoded = decodeFileText(content);
	return {
		content: decoded.content,
		version,
		lineEnding: decoded.lineEnding,
		hasBom: decoded.hasBom
	};
}
var isAmbiguousMtime = (mtime) => mtime % 1e3 === 0;
function useFileEditSession(handle) {
	const { mutate } = useSWRConfig();
	const handleKey = handle ? keyOf(handle) : null;
	const { data, error, isLoading } = useSWR(handleKey, () => readFile(handle), {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		errorRetryCount: 0
	});
	const [draft, setDraftState] = (0, import_react.useState)("");
	const [savedContent, setSavedContentState] = (0, import_react.useState)("");
	const [savedSizeBytes, setSavedSizeBytes] = (0, import_react.useState)(void 0);
	const [conflict, setConflictState] = (0, import_react.useState)(false);
	const [saveError, setSaveErrorState] = (0, import_react.useState)(void 0);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const modelRef = (0, import_react.useRef)(null);
	const syncFromModel = (0, import_react.useCallback)((model) => {
		if (modelRef.current !== model) return;
		setDraftState(model.draft);
		setSavedContentState(model.snapshot.content);
		setSavedSizeBytes(model.snapshot.version.size);
		setConflictState(model.conflict);
		setSaveErrorState(model.lastWriteError ?? void 0);
		setReady(true);
	}, []);
	const runWritesRef = (0, import_react.useRef)(void 0);
	runWritesRef.current = async (model) => {
		let rebases = 0;
		if (modelRef.current === model) setIsSaving(true);
		try {
			while (!model.conflict && model.draft !== model.snapshot.content) {
				const writeDraft = model.draft;
				const baseline = model.snapshot;
				try {
					const encoded = encodeFileText(writeDraft, baseline.lineEnding, baseline.hasBom);
					const version = await ipcApi.request("file.write_if_unchanged", {
						handle: model.handle,
						data: encoded,
						expectedVersion: baseline.version
					});
					model.snapshot = {
						...baseline,
						content: writeDraft,
						version
					};
					model.lastWriteError = null;
					syncFromModel(model);
					mutate(model.key, model.snapshot, { revalidate: false });
				} catch (writeError) {
					if (writeError instanceof IpcError && writeError.code === fileErrorCodes.COMMITTED_METADATA_PENDING) {
						logger.warn("Autosave bytes committed; metadata recovery is pending", {
							handle: model.handle,
							data: writeError.data
						});
						try {
							const disk = await readFile(model.handle);
							model.snapshot = disk;
							model.lastWriteError = writeError;
							syncFromModel(model);
							mutate(model.key, disk, { revalidate: false });
							break;
						} catch (refreshError) {
							model.lastWriteError = refreshError;
							syncFromModel(model);
							break;
						}
					}
					if (!(writeError instanceof IpcError) || writeError.code !== fileErrorCodes.STALE_VERSION) {
						logger.error("Autosave failed", writeError);
						model.lastWriteError = writeError;
						syncFromModel(model);
						break;
					}
					try {
						const disk = await readFile(model.handle);
						if (disk.content === writeDraft) {
							model.snapshot = disk;
							syncFromModel(model);
							mutate(model.key, disk, { revalidate: false });
							continue;
						}
						if (disk.content === baseline.content && ++rebases <= MAX_STALE_REBASES) {
							model.snapshot = disk;
							mutate(model.key, disk, { revalidate: false });
							continue;
						}
						model.conflict = true;
						syncFromModel(model);
					} catch (verifyError) {
						logger.error("Stale-write verification failed", verifyError);
						model.conflict = true;
						syncFromModel(model);
					}
				}
			}
		} finally {
			if (modelRef.current === model) setIsSaving(false);
		}
	};
	const requestWrite = (0, import_react.useCallback)((model) => {
		if (model.writeRunning || model.conflict) return;
		model.writeRunning = true;
		model.chain = (async () => {
			try {
				await runWritesRef.current?.(model);
			} finally {
				model.writeRunning = false;
			}
		})();
	}, []);
	const debouncedWrite = (0, import_react.useMemo)(() => debounce((model) => requestWrite(model), AUTOSAVE_DEBOUNCE_MS), [requestWrite]);
	(0, import_react.useEffect)(() => {
		if (!data || !handle || !handleKey) return;
		const model = modelRef.current;
		if (model?.key === handleKey) {
			if (data.content === model.snapshot.content && data.lineEnding === model.snapshot.lineEnding && data.hasBom === model.snapshot.hasBom && data.version.mtime === model.snapshot.version.mtime && data.version.size === model.snapshot.version.size) return;
			if (model.draft !== model.snapshot.content) return;
			if (data.version.mtime < model.snapshot.version.mtime) return;
			model.snapshot = data;
			model.draft = data.content;
			syncFromModel(model);
			return;
		}
		const next = {
			handle,
			key: handleKey,
			snapshot: data,
			draft: data.content,
			conflict: false,
			lastWriteError: null,
			chain: Promise.resolve(),
			writeRunning: false
		};
		modelRef.current = next;
		syncFromModel(next);
	}, [
		data,
		handle,
		handleKey,
		syncFromModel
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			debouncedWrite.cancel();
			const model = modelRef.current;
			if (model && !model.conflict && model.draft !== model.snapshot.content) requestWrite(model);
			modelRef.current = null;
			setDraftState("");
			setSavedContentState("");
			setSavedSizeBytes(void 0);
			setConflictState(false);
			setSaveErrorState(void 0);
			setIsSaving(false);
			setReady(false);
		};
	}, [
		handleKey,
		debouncedWrite,
		requestWrite
	]);
	const setDraft = (0, import_react.useCallback)((next) => {
		const model = modelRef.current;
		if (!model) return;
		model.draft = next;
		setDraftState(next);
		if (model.lastWriteError instanceof IpcError && model.lastWriteError.code === fileErrorCodes.COMMITTED_METADATA_PENDING) {
			model.lastWriteError = null;
			setSaveErrorState(void 0);
		}
		if (!model.lastWriteError) debouncedWrite(model);
	}, [debouncedWrite]);
	const discard = (0, import_react.useCallback)(() => {
		const model = modelRef.current;
		if (!model || model.writeRunning) return;
		debouncedWrite.cancel();
		model.draft = model.snapshot.content;
		model.lastWriteError = null;
		syncFromModel(model);
	}, [debouncedWrite, syncFromModel]);
	const reload = (0, import_react.useCallback)(async () => {
		const model = modelRef.current;
		if (!model) return;
		debouncedWrite.cancel();
		await model.chain;
		const disk = await readFile(model.handle);
		if (modelRef.current !== model) return;
		model.snapshot = disk;
		model.draft = disk.content;
		model.conflict = false;
		model.lastWriteError = null;
		syncFromModel(model);
		mutate(model.key, disk, { revalidate: false });
	}, [
		debouncedWrite,
		mutate,
		syncFromModel
	]);
	const flush = (0, import_react.useCallback)(async () => {
		const model = modelRef.current;
		debouncedWrite.cancel();
		if (!model) return;
		requestWrite(model);
		await model.chain;
		if (model.draft !== model.snapshot.content) throw model.lastWriteError ?? /* @__PURE__ */ new Error("Pending edit could not be saved");
	}, [debouncedWrite, requestWrite]);
	const notifyExternalChange = (0, import_react.useCallback)((eventMtimeMs) => {
		const model = modelRef.current;
		if (!model) return;
		if (model.draft !== model.snapshot.content) return;
		if (eventMtimeMs !== void 0) {
			const floored = Math.floor(eventMtimeMs);
			if (floored === model.snapshot.version.mtime && !isAmbiguousMtime(floored)) return;
		}
		(async () => {
			try {
				const disk = await readFile(model.handle);
				if (modelRef.current !== model) return;
				if (model.draft !== model.snapshot.content) return;
				if (disk.version.mtime < model.snapshot.version.mtime) return;
				if (disk.content === model.snapshot.content) {
					model.snapshot = disk;
					return;
				}
				model.snapshot = disk;
				model.draft = disk.content;
				syncFromModel(model);
				mutate(model.key, disk, { revalidate: false });
			} catch (reloadError) {
				logger.error("External-change reload failed", reloadError);
			}
		})();
	}, [mutate, syncFromModel]);
	return (0, import_react.useMemo)(() => {
		let status;
		let unsupportedReason;
		if (!handle) status = "idle";
		else if (error instanceof UnsupportedFileTextError) {
			status = "unsupported";
			unsupportedReason = error.reason;
		} else if (error) status = "error";
		else if (!ready || isLoading) status = "loading";
		else status = "ready";
		return {
			status,
			savedContent,
			savedSizeBytes,
			draft,
			isDirty: draft !== savedContent,
			isSaving,
			conflict,
			saveError,
			metadataRecoveryPending: saveError instanceof IpcError && saveError.code === fileErrorCodes.COMMITTED_METADATA_PENDING,
			unsupportedReason,
			error: error && !(error instanceof UnsupportedFileTextError) ? error : void 0,
			setDraft,
			discard,
			reload,
			flush,
			notifyExternalChange
		};
	}, [
		handle,
		error,
		ready,
		isLoading,
		savedContent,
		savedSizeBytes,
		draft,
		isSaving,
		conflict,
		saveError,
		setDraft,
		discard,
		reload,
		flush,
		notifyExternalChange
	]);
}
export { useFileEditSession as n, FileTree as r, FILE_EDIT_MAX_SIZE_BYTES as t };
