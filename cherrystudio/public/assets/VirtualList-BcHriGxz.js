import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_react_dom } from "./react-dom-D-tOyCJ4.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as defaultRangeExtractor, t as useVirtualizer } from "./esm-CA5JRyYP.js";
import { _ as useSensors, c as DndContext, d as PointerSensor, g as useSensor, h as useDroppable, l as DragOverlay, o as useSortable, s as verticalListSortingStrategy, t as SortableContext, u as KeyboardSensor, v as CSS } from "./sortable.esm-DLgVXjRs.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var SCROLLBAR_AUTO_HIDE_DELAY = 2e3;
var STICKY_ITEM_Z_INDEX = 1;
var ACTIVE_STICKY_ITEM_Z_INDEX_BASE = 2;
function assignRef(ref, value) {
	if (!ref) return;
	if (typeof ref === "function") {
		ref(value);
		return;
	}
	ref.current = value;
}
function DynamicVirtualList(props) {
	const { ref, list, children, size, estimateSize, isSticky, getItemDepth, rangeExtractor: customRangeExtractor, itemContainerStyle, scrollerStyle, role = "region", scrollElementRef, scrollerProps, autoHideScrollbar = false, header, className, onScroll, ...restOptions } = props;
	const [showScrollbar, setShowScrollbar] = (0, import_react.useState)(!autoHideScrollbar);
	const timeoutRef = (0, import_react.useRef)(null);
	const internalScrollerRef = (0, import_react.useRef)(null);
	const setScrollerRef = (0, import_react.useCallback)((node) => {
		internalScrollerRef.current = node;
		assignRef(scrollElementRef, node);
	}, [scrollElementRef]);
	const activeStickyIndexesRef = (0, import_react.useRef)([]);
	const stickyIndexes = (0, import_react.useMemo)(() => {
		if (!isSticky) return [];
		return list.map((_, index) => isSticky(index) ? index : -1).filter((index) => index !== -1);
	}, [list, isSticky]);
	const internalStickyRangeExtractor = (0, import_react.useCallback)((range) => {
		const activeStickies = [];
		if (getItemDepth) {
			const stickiesBeforeRange = stickyIndexes.filter((index) => index < range.startIndex);
			if (stickiesBeforeRange.length > 0) {
				const firstVisibleIndex = range.startIndex;
				const referenceDepth = getItemDepth(firstVisibleIndex);
				const ancestorChain = [];
				let minDepth = referenceDepth;
				for (let i = stickiesBeforeRange.length - 1; i >= 0; i--) {
					const stickyIndex = stickiesBeforeRange[i];
					const stickyDepth = getItemDepth(stickyIndex);
					if (stickyDepth < minDepth) {
						ancestorChain.unshift(stickyIndex);
						minDepth = stickyDepth;
					}
				}
				activeStickies.push(...ancestorChain);
			}
		} else {
			const lastStickyBeforeRange = [...stickyIndexes].reverse().find((index) => index < range.startIndex);
			if (lastStickyBeforeRange !== void 0) activeStickies.push(lastStickyBeforeRange);
		}
		activeStickyIndexesRef.current = activeStickies;
		return [...new Set([...activeStickyIndexesRef.current, ...defaultRangeExtractor(range)])].sort((a, b) => a - b);
	}, [stickyIndexes, getItemDepth]);
	const rangeExtractor = customRangeExtractor ?? (isSticky ? internalStickyRangeExtractor : void 0);
	const handleScrollbarHide = (0, import_react.useCallback)((isScrolling) => {
		if (!autoHideScrollbar) return;
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (isScrolling) setShowScrollbar(true);
		else timeoutRef.current = setTimeout(() => {
			setShowScrollbar(false);
		}, SCROLLBAR_AUTO_HIDE_DELAY);
	}, [autoHideScrollbar]);
	const virtualizer = useVirtualizer({
		...restOptions,
		count: list.length,
		getScrollElement: () => internalScrollerRef.current,
		estimateSize,
		rangeExtractor,
		onChange: (instance, sync) => {
			restOptions.onChange?.(instance, sync);
			handleScrollbarHide(instance.isScrolling);
		}
	});
	const previousListLengthRef = (0, import_react.useRef)(list.length);
	(0, import_react.useLayoutEffect)(() => {
		const wasEmpty = previousListLengthRef.current === 0;
		previousListLengthRef.current = list.length;
		if (wasEmpty && list.length > 0) virtualizer.measure();
	}, [list.length, virtualizer]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [autoHideScrollbar]);
	(0, import_react.useImperativeHandle)(ref, () => ({
		measure: () => virtualizer.measure(),
		scrollElement: () => virtualizer.scrollElement,
		scrollToOffset: (offset, options) => virtualizer.scrollToOffset(offset, options),
		scrollToIndex: (index, options) => virtualizer.scrollToIndex(index, options),
		resizeItem: (index, size$1) => virtualizer.resizeItem(index, size$1),
		getTotalSize: () => virtualizer.getTotalSize(),
		getVirtualItems: () => virtualizer.getVirtualItems(),
		getVirtualIndexes: () => virtualizer.getVirtualIndexes()
	}), [virtualizer]);
	const virtualItems = virtualizer.getVirtualItems();
	const totalSize = virtualizer.getTotalSize();
	const { horizontal } = restOptions;
	const measureItemElement = (horizontal ? itemContainerStyle?.width !== void 0 : itemContainerStyle?.height !== void 0) ? void 0 : virtualizer.measureElement;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.dynamic-virtual-list",
		...mergeUiProps(scrollerProps, "ui.dynamic-virtual-list"),
		ref: setScrollerRef,
		className: cn("dynamic-virtual-list [&::-webkit-scrollbar-thumb:hover]:bg-[var(--scrollbar-thumb-hover)] [&::-webkit-scrollbar-thumb]:transition-[background] [&::-webkit-scrollbar-thumb]:duration-300 [&::-webkit-scrollbar-thumb]:ease-in-out [&::-webkit-scrollbar-thumb]:will-change-[background]", isSticky && "isolate", autoHideScrollbar && !showScrollbar ? "[&::-webkit-scrollbar-thumb]:bg-transparent" : "[&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)]", className),
		role,
		onScroll,
		style: {
			overflow: "auto",
			scrollbarColor: autoHideScrollbar && !showScrollbar ? "transparent transparent" : "var(--scrollbar-thumb) transparent",
			...horizontal ? { width: size ?? "100%" } : { height: size ?? "100%" },
			...scrollerStyle
		},
		children: [header, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "relative",
				width: horizontal ? `${totalSize}px` : "100%",
				height: !horizontal ? `${totalSize}px` : "100%"
			},
			children: virtualItems.map((virtualItem) => {
				const isItemSticky = stickyIndexes.includes(virtualItem.index);
				const isItemActiveSticky = isItemSticky && activeStickyIndexesRef.current.includes(virtualItem.index);
				const activeStickyIndex = isItemActiveSticky ? activeStickyIndexesRef.current.indexOf(virtualItem.index) : -1;
				let stickyOffset = 0;
				if (activeStickyIndex >= 0) for (let i = 0; i < activeStickyIndex; i++) {
					const prevStickyIndex = activeStickyIndexesRef.current[i];
					stickyOffset += estimateSize(prevStickyIndex);
				}
				const activeStickyZIndex = ACTIVE_STICKY_ITEM_Z_INDEX_BASE + activeStickyIndexesRef.current.length - activeStickyIndex;
				const isCoveredBySticky = (() => {
					if (!activeStickyIndexesRef.current.length) return false;
					if (isItemActiveSticky) return false;
					const itemVisualTop = virtualItem.start;
					let totalStickyHeight = 0;
					for (const stickyIdx of activeStickyIndexesRef.current) totalStickyHeight += estimateSize(stickyIdx);
					return itemVisualTop < totalStickyHeight;
				})();
				const style = {
					...itemContainerStyle,
					position: isItemActiveSticky ? "sticky" : "absolute",
					top: isItemActiveSticky ? stickyOffset : 0,
					left: 0,
					zIndex: isItemActiveSticky ? activeStickyZIndex : isItemSticky ? STICKY_ITEM_Z_INDEX : 0,
					pointerEvents: isCoveredBySticky ? "none" : "auto",
					...isItemActiveSticky && { backgroundColor: "var(--background)" },
					...horizontal ? {
						transform: isItemActiveSticky ? void 0 : `translateX(${virtualItem.start}px)`,
						height: "100%"
					} : {
						transform: isItemActiveSticky ? void 0 : `translateY(${virtualItem.start}px)`,
						width: "100%"
					}
				};
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-index": virtualItem.index,
					ref: measureItemElement,
					style,
					children: children(list[virtualItem.index], virtualItem.index)
				}, virtualItem.key);
			})
		})]
	});
}
var DynamicVirtualList_default = (0, import_react.memo)(DynamicVirtualList);
var DEFAULT_GROUP_HEADER_SIZE$1 = 32;
var DEFAULT_GROUP_FOOTER_SIZE$1 = 32;
function buildGroupedVirtualRows(groups, hasGroupHeader, hasGroupFooter) {
	const rows = [];
	let itemIndex = 0;
	groups.forEach((entry, groupIndex) => {
		if (hasGroupHeader && entry.header !== void 0) rows.push({
			type: "group-header",
			group: entry.group,
			groupIndex,
			header: entry.header
		});
		entry.items.forEach((item, itemIndexInGroup) => {
			rows.push({
				type: "item",
				group: entry.group,
				groupIndex,
				item,
				itemIndex,
				itemIndexInGroup
			});
			itemIndex += 1;
		});
		if (hasGroupFooter && entry.footer !== void 0) rows.push({
			type: "group-footer",
			group: entry.group,
			groupIndex,
			footer: entry.footer
		});
	});
	return rows;
}
function GroupedVirtualList(props) {
	const { groups, renderGroupHeader, renderItem, renderGroupFooter, estimateGroupHeaderSize, estimateItemSize, estimateGroupFooterSize, ...virtualListProps } = props;
	const rows = (0, import_react.useMemo)(() => buildGroupedVirtualRows(groups, Boolean(renderGroupHeader), Boolean(renderGroupFooter)), [
		groups,
		renderGroupFooter,
		renderGroupHeader
	]);
	const estimateRowSize = (0, import_react.useCallback)((index) => {
		const row = rows[index];
		if (!row) return 0;
		if (row.type === "group-header") return estimateGroupHeaderSize?.(row.header, row.group, row.groupIndex) ?? DEFAULT_GROUP_HEADER_SIZE$1;
		if (row.type === "group-footer") return estimateGroupFooterSize?.(row.footer, row.group, row.groupIndex) ?? DEFAULT_GROUP_FOOTER_SIZE$1;
		return estimateItemSize(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup);
	}, [
		estimateGroupFooterSize,
		estimateGroupHeaderSize,
		estimateItemSize,
		rows
	]);
	const renderRow = (0, import_react.useCallback)((row) => {
		if (row.type === "group-header") return renderGroupHeader?.(row.header, row.group, row.groupIndex) ?? null;
		if (row.type === "group-footer") return renderGroupFooter?.(row.footer, row.group, row.groupIndex) ?? null;
		return renderItem(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup);
	}, [
		renderGroupFooter,
		renderGroupHeader,
		renderItem
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicVirtualList_default, {
		...virtualListProps,
		list: rows,
		estimateSize: estimateRowSize,
		children: renderRow
	});
}
var GroupedVirtualList_default = (0, import_react.memo)(GroupedVirtualList);
var import_react_dom = require_react_dom();
var DEFAULT_GROUP_HEADER_SIZE = 32;
var DEFAULT_GROUP_FOOTER_SIZE = 32;
var DEFAULT_DRAG_CAPABILITIES = {
	groups: false,
	items: true,
	itemSameGroup: true,
	itemCrossGroup: true
};
var ContextMenuSafePointerSensor = class extends PointerSensor {
	static activators = [{
		eventName: "onPointerDown",
		handler: ({ nativeEvent: event }, { onActivation }) => {
			if (!event.isPrimary || event.button !== 0 || event.ctrlKey) return false;
			onActivation?.({ event });
			return true;
		}
	}];
};
function toItemSortableId(id) {
	return `item:${String(id)}`;
}
function toGroupSortableId(id) {
	return `group:${String(id)}`;
}
function toGroupFooterDroppableId(id) {
	return `group-footer:${String(id)}`;
}
function getEventData(data) {
	if (!data || typeof data !== "object") return null;
	const rowData = data;
	return rowData.rowType === "group" || rowData.rowType === "item" ? rowData : null;
}
function isItemDragData(data) {
	return data.rowType === "item";
}
function joinClassNames(...classNames) {
	return classNames.filter(Boolean).join(" ") || void 0;
}
function DropIndicator({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.drop-indicator",
		"aria-hidden": "true",
		className: joinClassNames("pointer-events-none absolute right-2 left-2 z-10 h-0.5 rounded-full bg-sidebar-ring", position === "before" ? "top-0" : "bottom-0"),
		"data-drop-indicator": position
	});
}
function buildDragStartPayload(active) {
	if (isItemDragData(active)) return {
		type: "item",
		activeId: active.itemId,
		activeItem: active.item,
		sourceGroup: active.group,
		sourceGroupId: active.groupId,
		sourceIndex: active.itemIndexInGroup
	};
	return {
		type: "group",
		activeGroup: active.group,
		activeGroupId: active.groupId,
		sourceIndex: active.groupIndex
	};
}
function buildGroupDragData(group, groupId, groupIndex) {
	return {
		rowType: "group",
		group,
		groupId,
		groupIndex
	};
}
function buildItemDragData({ group, groupId, groupIndex, item, itemId, itemIndex, itemIndexInGroup }) {
	return {
		rowType: "item",
		group,
		groupId,
		groupIndex,
		item,
		itemId,
		itemIndex,
		itemIndexInGroup
	};
}
function buildDragEndPayload(active, over, position) {
	if (isItemDragData(active)) {
		const overItem = isItemDragData(over) ? over.item : void 0;
		return {
			type: "item",
			activeId: active.itemId,
			activeItem: active.item,
			overId: isItemDragData(over) ? over.itemId : over.groupId,
			overItem,
			overType: over.rowType,
			position,
			sourceGroup: active.group,
			sourceGroupId: active.groupId,
			sourceIndex: active.itemIndexInGroup,
			targetGroup: over.group,
			targetGroupId: over.groupId,
			targetIndex: isItemDragData(over) ? over.itemIndexInGroup : 0
		};
	}
	if (active.groupId === over.groupId) return null;
	return {
		type: "group",
		activeGroup: active.group,
		activeGroupId: active.groupId,
		overGroup: over.group,
		overGroupId: over.groupId,
		overItem: isItemDragData(over) ? over.item : void 0,
		overType: over.rowType,
		sourceIndex: active.groupIndex,
		targetIndex: over.groupIndex
	};
}
function getRectCenterY(rect) {
	if (!rect) return null;
	return rect.top + rect.height / 2;
}
function getItemDropPosition(event, active, over) {
	if (!isItemDragData(over)) return "before";
	const activeCenterY = getRectCenterY(event.active.rect?.current?.translated ?? event.active.rect?.current?.initial);
	const overCenterY = getRectCenterY(event.over?.rect);
	if (activeCenterY !== null && overCenterY !== null) return activeCenterY < overCenterY ? "before" : "after";
	if (isItemDragData(active) && active.groupId === over.groupId && active.itemIndexInGroup > over.itemIndexInGroup) return "before";
	return "after";
}
function getDropPosition(event, active, over) {
	if (!isItemDragData(active)) return active.groupIndex < over.groupIndex ? "after" : "before";
	return getItemDropPosition(event, active, over);
}
function buildDropPayloadFromEvent(event, activeDragData) {
	const active = getEventData(event.active.data.current) ?? activeDragData;
	const over = getEventData(event.over?.data.current);
	if (!active || !over) return null;
	const position = getDropPosition(event, active, over);
	const payload = buildDragEndPayload(active, over, position);
	if (!payload) return null;
	return {
		active,
		over,
		payload,
		position
	};
}
function getDropPositionFromState(over, dropState) {
	if (!dropState) return null;
	const overTargetId = isItemDragData(over) ? over.itemId : over.groupId;
	if (dropState.rowType !== over.rowType) return null;
	if (dropState.targetId !== overTargetId) return null;
	if (dropState.targetGroupId !== over.groupId) return null;
	return dropState.position;
}
function buildDropPayloadFromStateOrEvent(event, activeDragData, dropState, groupAppendDropTargets) {
	const active = getEventData(event.active.data.current) ?? activeDragData;
	const over = getEventData(event.over?.data.current);
	if (!active || !over) return null;
	const statePosition = getDropPositionFromState(over, dropState);
	const appendDropTarget = statePosition !== null && isItemDragData(active) && !isItemDragData(over) ? groupAppendDropTargets?.get(over.groupId) : void 0;
	const payloadOver = appendDropTarget ?? over;
	const position = appendDropTarget ? "after" : statePosition ?? getDropPosition(event, active, over);
	const payload = buildDragEndPayload(active, payloadOver, position);
	if (!payload) return null;
	return {
		active,
		over: payloadOver,
		payload,
		position
	};
}
function getOverDropState(over, position) {
	return {
		position,
		rowType: over.rowType,
		targetId: isItemDragData(over) ? over.itemId : over.groupId,
		targetGroupId: over.groupId
	};
}
function isSameOverDropState(current, next) {
	return current?.position === next?.position && current?.rowType === next?.rowType && current?.targetId === next?.targetId && current?.targetGroupId === next?.targetGroupId;
}
function getDropTargetRowState({ activeDragState, groupId, overDropState, rowId, rowType }) {
	const isBlocked = activeDragState?.blockedGroupIds.has(groupId) ?? false;
	const isAllowed = !isBlocked && rowType !== void 0 && rowId !== void 0 && overDropState?.rowType === rowType && overDropState.targetId === rowId;
	return {
		isBlocked,
		props: {
			className: isBlocked ? "cursor-not-allowed opacity-50 [&_*]:pointer-events-none" : void 0,
			"data-drop-allowed": isAllowed || void 0,
			"data-drop-blocked": isBlocked || void 0,
			"data-drop-invalid": isBlocked || void 0,
			"data-drop-target": isAllowed || void 0
		}
	};
}
function shouldDropPayload(payload, dragCapabilities, canDropGroup, canDropItem) {
	if (payload.type === "group") {
		if (!dragCapabilities.groups) return false;
		return canDropGroup?.({
			activeGroup: payload.activeGroup,
			activeGroupId: payload.activeGroupId,
			overGroup: payload.overGroup,
			overGroupId: payload.overGroupId,
			overItem: payload.overItem,
			overType: payload.overType,
			sourceIndex: payload.sourceIndex,
			targetIndex: payload.targetIndex
		}) ?? true;
	}
	if (!dragCapabilities.items) return false;
	const isSameGroup = payload.sourceGroupId === payload.targetGroupId;
	if (isSameGroup && !dragCapabilities.itemSameGroup) return false;
	if (!isSameGroup && !dragCapabilities.itemCrossGroup) return false;
	return canDropItem?.({
		activeId: payload.activeId,
		activeItem: payload.activeItem,
		overGroup: payload.targetGroup,
		overGroupId: payload.targetGroupId,
		overId: payload.overId,
		overItem: payload.overItem,
		overType: payload.overType,
		sourceGroup: payload.sourceGroup,
		sourceGroupId: payload.sourceGroupId,
		sourceIndex: payload.sourceIndex,
		targetIndex: payload.targetIndex
	}) ?? true;
}
function SortableItemRow({ activeDragState, children, data, disabled, dropIndicatorPosition, freezeTransform = false, draggableDisabled, overDropState, sourcePlaceholder = false }) {
	const dropTargetRowState = getDropTargetRowState({
		activeDragState,
		groupId: data.groupId,
		overDropState,
		rowId: data.itemId,
		rowType: "item"
	});
	const isActiveItem = activeDragState?.active !== void 0 && isItemDragData(activeDragState.active) && activeDragState.active.itemId === data.itemId;
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id: toItemSortableId(data.itemId),
		data,
		disabled: {
			draggable: draggableDisabled,
			droppable: disabled || dropTargetRowState.isBlocked && !isActiveItem
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.sortable-item-row",
		ref: setNodeRef,
		"data-dragging": isDragging || void 0,
		...mergeUiProps(dropTargetRowState.props, "ui.sortable-item-row"),
		className: joinClassNames(dropTargetRowState.props.className, dropIndicatorPosition ? "relative" : void 0),
		style: {
			opacity: isDragging || sourcePlaceholder ? .5 : void 0,
			transform: dropTargetRowState.isBlocked || freezeTransform ? void 0 : CSS.Transform.toString(transform),
			transition: dropTargetRowState.isBlocked || freezeTransform ? void 0 : transition
		},
		...mergeUiProps(attributes, "ui.sortable-item-row"),
		...mergeUiProps(listeners, "ui.sortable-item-row"),
		children: [dropIndicatorPosition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropIndicator, { position: dropIndicatorPosition }) : null, children]
	});
}
function GroupHeaderRow({ activeDragState, children, data, draggable, disabled, dropIndicatorPosition, freezeTransform, overDropState, sourcePlaceholder }) {
	if (draggable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableGroupHeaderRow, {
		activeDragState,
		data,
		disabled,
		dropIndicatorPosition,
		freezeTransform,
		overDropState,
		sourcePlaceholder,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DroppableGroupHeaderRow, {
		activeDragState,
		data,
		disabled,
		dropIndicatorPosition,
		overDropState,
		sourcePlaceholder,
		children
	});
}
function SortableGroupHeaderRow({ activeDragState, children, data, disabled, dropIndicatorPosition, freezeTransform = false, overDropState, sourcePlaceholder = false }) {
	const dropTargetRowState = getDropTargetRowState({
		activeDragState,
		groupId: data.groupId,
		overDropState,
		rowId: data.groupId,
		rowType: "group"
	});
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id: toGroupSortableId(data.groupId),
		data,
		disabled: disabled || dropTargetRowState.isBlocked
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.sortable-group-header-row",
		ref: setNodeRef,
		"data-dragging": isDragging || void 0,
		...mergeUiProps(dropTargetRowState.props, "ui.sortable-group-header-row"),
		className: joinClassNames(dropTargetRowState.props.className, dropIndicatorPosition ? "relative" : void 0),
		style: {
			opacity: isDragging || sourcePlaceholder ? .5 : void 0,
			transform: dropTargetRowState.isBlocked || freezeTransform ? void 0 : CSS.Transform.toString(transform),
			transition: dropTargetRowState.isBlocked || freezeTransform ? void 0 : transition
		},
		...mergeUiProps(attributes, "ui.sortable-group-header-row"),
		...mergeUiProps(listeners, "ui.sortable-group-header-row"),
		children: [dropIndicatorPosition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropIndicator, { position: dropIndicatorPosition }) : null, children]
	});
}
function DroppableGroupHeaderRow({ activeDragState, children, data, disabled, dropIndicatorPosition, overDropState, sourcePlaceholder = false }) {
	const dropTargetRowState = getDropTargetRowState({
		activeDragState,
		groupId: data.groupId,
		overDropState,
		rowId: data.groupId,
		rowType: "group"
	});
	const { isOver, setNodeRef } = useDroppable({
		id: toGroupSortableId(data.groupId),
		data,
		disabled: disabled || dropTargetRowState.isBlocked
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.droppable-group-header-row",
		ref: setNodeRef,
		"data-over": isOver || void 0,
		...mergeUiProps(dropTargetRowState.props, "ui.droppable-group-header-row"),
		className: joinClassNames(dropTargetRowState.props.className, dropIndicatorPosition ? "relative" : void 0),
		style: { opacity: sourcePlaceholder ? .5 : void 0 },
		children: [dropIndicatorPosition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropIndicator, { position: dropIndicatorPosition }) : null, children]
	});
}
function GroupFooterRow({ activeDragState, children, data, disabled, dropIndicatorPosition, sourcePlaceholder = false }) {
	const dropTargetRowState = getDropTargetRowState({
		activeDragState,
		groupId: data.groupId,
		overDropState: null
	});
	const { setNodeRef } = useDroppable({
		id: toGroupFooterDroppableId(data.groupId),
		data,
		disabled: disabled || dropTargetRowState.isBlocked
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.group-footer-row",
		ref: setNodeRef,
		...mergeUiProps(dropTargetRowState.props, "ui.group-footer-row"),
		className: joinClassNames(dropTargetRowState.props.className, dropIndicatorPosition ? "relative" : void 0),
		style: { opacity: sourcePlaceholder ? .5 : void 0 },
		children: [dropIndicatorPosition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropIndicator, { position: dropIndicatorPosition }) : null, children]
	});
}
function GroupedSortableVirtualList(props) {
	const { groups, getGroupId, getGroupBoundaryId, getItemId, renderGroupHeader, renderItem, renderGroupFooter, estimateGroupHeaderSize, estimateItemSize, estimateGroupFooterSize, disabled = false, dragActivationDistance = 6, dragCapabilities, canDragGroup, canDragItem, canDropGroup, canDropItem, onDragStart, onDragEnd, ...virtualListProps } = props;
	const effectiveDragCapabilities = (0, import_react.useMemo)(() => ({
		...DEFAULT_DRAG_CAPABILITIES,
		...dragCapabilities
	}), [dragCapabilities]);
	const [activeDragState, setActiveDragState] = (0, import_react.useState)(null);
	const [overDropState, setOverDropState] = (0, import_react.useState)(null);
	const activeDragDataRef = (0, import_react.useRef)(null);
	const overDropStateRef = (0, import_react.useRef)(null);
	const sensors = useSensors(useSensor(ContextMenuSafePointerSensor, { activationConstraint: { distance: dragActivationDistance } }), useSensor(KeyboardSensor));
	const rows = (0, import_react.useMemo)(() => buildGroupedVirtualRows(groups, Boolean(renderGroupHeader), Boolean(renderGroupFooter)), [
		groups,
		renderGroupFooter,
		renderGroupHeader
	]);
	const getEffectiveGroupBoundaryId = (0, import_react.useCallback)((group, groupIndex) => getGroupBoundaryId?.(group, groupIndex) ?? getGroupId(group, groupIndex), [getGroupBoundaryId, getGroupId]);
	const sortableIds = (0, import_react.useMemo)(() => rows.flatMap((row) => {
		if (row.type === "item") return toItemSortableId(getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup));
		if (row.type === "group-header" && effectiveDragCapabilities.groups && (canDragGroup?.(row.group, row.groupIndex) ?? true)) return toGroupSortableId(getGroupId(row.group, row.groupIndex));
		return [];
	}), [
		canDragGroup,
		effectiveDragCapabilities.groups,
		getGroupId,
		getItemId,
		rows
	]);
	const groupAppendIndicatorTargets = (0, import_react.useMemo)(() => {
		const targets = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const groupId = getGroupId(row.group, row.groupIndex);
			if (row.type === "group-header") {
				targets.set(groupId, {
					position: "after",
					row
				});
				continue;
			}
			if (row.type === "item") {
				targets.set(groupId, {
					position: "after",
					row
				});
				continue;
			}
			targets.set(groupId, {
				position: "before",
				row
			});
		}
		return targets;
	}, [getGroupId, rows]);
	const groupAppendDropTargets = (0, import_react.useMemo)(() => {
		const targets = /* @__PURE__ */ new Map();
		for (const row of rows) {
			if (row.type !== "item") continue;
			const groupId = getGroupId(row.group, row.groupIndex);
			const itemId = getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup);
			targets.set(groupId, buildItemDragData({
				group: row.group,
				groupId,
				groupIndex: row.groupIndex,
				item: row.item,
				itemId,
				itemIndex: row.itemIndex,
				itemIndexInGroup: row.itemIndexInGroup
			}));
		}
		return targets;
	}, [
		getGroupId,
		getItemId,
		rows
	]);
	const groupBoundaryIndicatorTargets = (0, import_react.useMemo)(() => {
		const targets = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const groupId = getEffectiveGroupBoundaryId(row.group, row.groupIndex);
			if (row.type === "group-header") {
				targets.set(groupId, {
					before: targets.get(groupId)?.before ?? {
						position: "before",
						row
					},
					after: {
						position: "after",
						row
					}
				});
				continue;
			}
			const groupTargets = targets.get(groupId);
			if (!groupTargets) continue;
			if (row.type === "item") {
				groupTargets.after = {
					position: "after",
					row
				};
				continue;
			}
			groupTargets.after = {
				position: "after",
				row
			};
		}
		return targets;
	}, [getEffectiveGroupBoundaryId, rows]);
	const estimateRowSize = (0, import_react.useCallback)((index) => {
		const row = rows[index];
		if (!row) return 0;
		if (row.type === "group-header") return estimateGroupHeaderSize?.(row.header, row.group, row.groupIndex) ?? DEFAULT_GROUP_HEADER_SIZE;
		if (row.type === "group-footer") return estimateGroupFooterSize?.(row.footer, row.group, row.groupIndex) ?? DEFAULT_GROUP_FOOTER_SIZE;
		return estimateItemSize(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup);
	}, [
		estimateGroupFooterSize,
		estimateGroupHeaderSize,
		estimateItemSize,
		rows
	]);
	const buildRowDragData = (0, import_react.useCallback)((row) => {
		const groupId = getGroupId(row.group, row.groupIndex);
		if (row.type === "group-header") return buildGroupDragData(row.group, groupId, row.groupIndex);
		if (row.type === "group-footer") return buildGroupDragData(row.group, groupId, row.groupIndex);
		if (row.type === "item") return buildItemDragData({
			group: row.group,
			groupId,
			groupIndex: row.groupIndex,
			item: row.item,
			itemId: getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup),
			itemIndex: row.itemIndex,
			itemIndexInGroup: row.itemIndexInGroup
		});
		return null;
	}, [getGroupId, getItemId]);
	const canDragActive = (0, import_react.useCallback)((active) => {
		if (isItemDragData(active)) return canDragItem?.(active.item, active.itemIndex, active.group, active.groupIndex, active.itemIndexInGroup) ?? true;
		return canDragGroup?.(active.group, active.groupIndex) ?? true;
	}, [canDragGroup, canDragItem]);
	const buildBlockedGroupIds = (0, import_react.useCallback)((active) => {
		const groupIds = [];
		const candidateDataByGroupId = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const groupId = getGroupId(row.group, row.groupIndex);
			if (!candidateDataByGroupId.has(groupId)) {
				candidateDataByGroupId.set(groupId, []);
				groupIds.push(groupId);
			}
			const rowDragData = buildRowDragData(row);
			if (rowDragData) candidateDataByGroupId.get(groupId)?.push(rowDragData);
		}
		const blockedGroupIds = /* @__PURE__ */ new Set();
		for (const groupId of groupIds) {
			if (!isItemDragData(active) && groupId === active.groupId) continue;
			if (!(candidateDataByGroupId.get(groupId) ?? []).some((over) => {
				const payload = buildDragEndPayload(active, over, "before");
				if (!payload) return false;
				if (payload.type === "item" && payload.overType === "item" && payload.activeId === payload.overId) return false;
				return shouldDropPayload(payload, effectiveDragCapabilities, canDropGroup, canDropItem);
			})) blockedGroupIds.add(groupId);
		}
		return blockedGroupIds;
	}, [
		buildRowDragData,
		canDropGroup,
		canDropItem,
		effectiveDragCapabilities,
		getGroupId,
		rows
	]);
	const clearOverDropState = (0, import_react.useCallback)(() => {
		overDropStateRef.current = null;
		setOverDropState((current) => current === null ? current : null);
	}, []);
	const clearDragState = (0, import_react.useCallback)(() => {
		activeDragDataRef.current = null;
		setActiveDragState((current) => current === null ? current : null);
		overDropStateRef.current = null;
		setOverDropState((current) => current === null ? current : null);
	}, []);
	const updateOverDropState = (0, import_react.useCallback)((nextOverDropState) => {
		overDropStateRef.current = nextOverDropState;
		setOverDropState((current) => isSameOverDropState(current, nextOverDropState) ? current : nextOverDropState);
	}, []);
	const sortingStrategy = (0, import_react.useCallback)((args) => {
		if (activeDragState?.active) return null;
		return verticalListSortingStrategy(args);
	}, [activeDragState]);
	const handleDragStart = (0, import_react.useCallback)((event) => {
		clearDragState();
		const active = getEventData(event.active.data.current);
		if (active && canDragActive(active)) {
			activeDragDataRef.current = active;
			const initialRect = event.active.rect.current.initial;
			setActiveDragState({
				active,
				blockedGroupIds: buildBlockedGroupIds(active),
				overlaySize: initialRect ? {
					height: initialRect.height,
					width: initialRect.width
				} : void 0
			});
		}
		if (active) onDragStart?.(buildDragStartPayload(active));
	}, [
		buildBlockedGroupIds,
		canDragActive,
		clearDragState,
		onDragStart
	]);
	const handleDragOver = (0, import_react.useCallback)((event) => {
		const result = buildDropPayloadFromEvent(event, activeDragDataRef.current);
		if (!result || !canDragActive(result.active)) {
			clearOverDropState();
			return;
		}
		if (result.payload.type === "item" && result.payload.overType === "item" && result.payload.activeId === result.payload.overId) {
			clearOverDropState();
			return;
		}
		if (!shouldDropPayload(result.payload, effectiveDragCapabilities, canDropGroup, canDropItem)) {
			clearOverDropState();
			return;
		}
		updateOverDropState(getOverDropState(result.over, result.position));
	}, [
		canDragActive,
		canDropGroup,
		canDropItem,
		clearOverDropState,
		effectiveDragCapabilities,
		updateOverDropState
	]);
	const isDragProjectionFrozen = activeDragState?.active !== void 0;
	const activeGroupPlaceholderId = activeDragState?.active !== void 0 && !isItemDragData(activeDragState.active) ? activeDragState.active.groupId : null;
	const getDropIndicatorPosition = (0, import_react.useCallback)((row) => {
		if (!overDropState) return null;
		const groupId = getGroupId(row.group, row.groupIndex);
		if (activeDragState?.active !== void 0 && !isItemDragData(activeDragState.active)) {
			const rowBoundaryId = getEffectiveGroupBoundaryId(row.group, row.groupIndex);
			if (overDropState.targetGroupId !== rowBoundaryId) return null;
			const target$1 = groupBoundaryIndicatorTargets.get(rowBoundaryId)?.[overDropState.position];
			return target$1?.row === row ? target$1.position : null;
		}
		if (overDropState.rowType === "item") {
			if (row.type !== "item") return null;
			return getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup) === overDropState.targetId ? overDropState.position : null;
		}
		if (overDropState.targetGroupId !== groupId) return null;
		const target = groupAppendIndicatorTargets.get(groupId);
		return target?.row === row ? target.position : null;
	}, [
		activeDragState,
		getEffectiveGroupBoundaryId,
		getGroupId,
		getItemId,
		groupAppendIndicatorTargets,
		groupBoundaryIndicatorTargets,
		overDropState
	]);
	const handleDragEnd = (0, import_react.useCallback)((event) => {
		const result = buildDropPayloadFromStateOrEvent(event, activeDragDataRef.current, overDropStateRef.current, groupAppendDropTargets);
		clearDragState();
		if (!result || !canDragActive(result.active)) return;
		const { payload } = result;
		if (payload.type === "item" && payload.overType === "item" && payload.activeId === payload.overId) return;
		if (!shouldDropPayload(payload, effectiveDragCapabilities, canDropGroup, canDropItem)) return;
		onDragEnd?.(payload);
	}, [
		canDragActive,
		canDropGroup,
		canDropItem,
		clearDragState,
		effectiveDragCapabilities,
		groupAppendDropTargets,
		onDragEnd
	]);
	const renderRow = (0, import_react.useCallback)((row) => {
		const groupId = getGroupId(row.group, row.groupIndex);
		const sourcePlaceholder = activeGroupPlaceholderId === groupId;
		if (row.type === "group-header") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupHeaderRow, {
			activeDragState,
			data: buildGroupDragData(row.group, groupId, row.groupIndex),
			disabled,
			dropIndicatorPosition: getDropIndicatorPosition(row),
			freezeTransform: isDragProjectionFrozen,
			overDropState,
			sourcePlaceholder,
			draggable: !disabled && effectiveDragCapabilities.groups && (canDragGroup?.(row.group, row.groupIndex) ?? true),
			children: renderGroupHeader?.(row.header, row.group, row.groupIndex) ?? null
		});
		if (row.type === "group-footer") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupFooterRow, {
			activeDragState,
			data: buildGroupDragData(row.group, groupId, row.groupIndex),
			disabled,
			dropIndicatorPosition: getDropIndicatorPosition(row),
			sourcePlaceholder,
			children: renderGroupFooter?.(row.footer, row.group, row.groupIndex) ?? null
		});
		const itemId = getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup);
		const itemDisabled = disabled || !effectiveDragCapabilities.items || !(canDragItem?.(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup) ?? true);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableItemRow, {
			activeDragState,
			data: buildItemDragData({
				group: row.group,
				groupId,
				groupIndex: row.groupIndex,
				item: row.item,
				itemId,
				itemIndex: row.itemIndex,
				itemIndexInGroup: row.itemIndexInGroup
			}),
			disabled,
			dropIndicatorPosition: getDropIndicatorPosition(row),
			draggableDisabled: itemDisabled,
			freezeTransform: isDragProjectionFrozen,
			overDropState,
			sourcePlaceholder,
			children: renderItem(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup)
		});
	}, [
		activeDragState,
		activeGroupPlaceholderId,
		canDragGroup,
		canDragItem,
		disabled,
		effectiveDragCapabilities.groups,
		effectiveDragCapabilities.items,
		getDropIndicatorPosition,
		getGroupId,
		getItemId,
		isDragProjectionFrozen,
		overDropState,
		renderGroupFooter,
		renderGroupHeader,
		renderItem
	]);
	const dragOverlayContent = (0, import_react.useMemo)(() => {
		const active = activeDragState?.active;
		if (!active) return null;
		if (isItemDragData(active)) return renderItem(active.item, active.itemIndex, active.group, active.groupIndex, active.itemIndexInGroup);
		const headerRow = rows.find((row) => row.type === "group-header" && getGroupId(row.group, row.groupIndex) === active.groupId);
		if (!headerRow || headerRow.type !== "group-header") return null;
		return renderGroupHeader?.(headerRow.header, headerRow.group, headerRow.groupIndex) ?? null;
	}, [
		activeDragState,
		getGroupId,
		renderGroupHeader,
		renderItem,
		rows
	]);
	const dragOverlay = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragOverlay, {
		dropAnimation: null,
		children: dragOverlayContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none",
			style: {
				height: activeDragState?.overlaySize?.height,
				width: activeDragState?.overlaySize?.width
			},
			children: dragOverlayContent
		}) : null
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DndContext, {
		sensors,
		onDragStart: handleDragStart,
		onDragOver: handleDragOver,
		onDragCancel: clearDragState,
		onDragEnd: handleDragEnd,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
			items: sortableIds,
			strategy: sortingStrategy,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicVirtualList_default, {
				...virtualListProps,
				list: rows,
				estimateSize: estimateRowSize,
				children: renderRow
			})
		}), (0, import_react_dom.createPortal)(dragOverlay, document.body)]
	});
}
var GroupedSortableVirtualList_default = (0, import_react.memo)(GroupedSortableVirtualList);
export { DynamicVirtualList_default as i, GroupedVirtualList_default as n, buildGroupedVirtualRows as r, GroupedSortableVirtualList_default as t };
