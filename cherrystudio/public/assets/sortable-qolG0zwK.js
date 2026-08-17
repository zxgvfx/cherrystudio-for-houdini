import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_react_dom } from "./react-dom-D-tOyCJ4.js";
import { t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { _ as useSensors, a as sortableKeyboardCoordinates, c as DndContext, d as PointerSensor, f as TouchSensor, g as useSensor, i as rectSortingStrategy, l as DragOverlay, m as defaultDropAnimationSideEffects, o as useSortable, r as horizontalListSortingStrategy, s as verticalListSortingStrategy, t as SortableContext, u as KeyboardSensor, v as CSS } from "./sortable.esm-DLgVXjRs.js";
var restrictToHorizontalAxis = (_ref) => {
	let { transform } = _ref;
	return {
		...transform,
		y: 0
	};
};
function restrictToBoundingRect(transform, rect, boundingRect) {
	const value = { ...transform };
	if (rect.top + transform.y <= boundingRect.top) value.y = boundingRect.top - rect.top;
	else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) value.y = boundingRect.top + boundingRect.height - rect.bottom;
	if (rect.left + transform.x <= boundingRect.left) value.x = boundingRect.left - rect.left;
	else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) value.x = boundingRect.left + boundingRect.width - rect.right;
	return value;
}
var restrictToFirstScrollableAncestor = (_ref) => {
	let { draggingNodeRect, transform, scrollableAncestorRects } = _ref;
	const firstScrollableAncestorRect = scrollableAncestorRects[0];
	if (!draggingNodeRect || !firstScrollableAncestorRect) return transform;
	return restrictToBoundingRect(transform, draggingNodeRect, firstScrollableAncestorRect);
};
var restrictToVerticalAxis = (_ref) => {
	let { transform } = _ref;
	return {
		...transform,
		x: 0
	};
};
var restrictToWindowEdges = (_ref) => {
	let { transform, draggingNodeRect, windowRect } = _ref;
	if (!draggingNodeRect || !windowRect) return transform;
	return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
};
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ItemRenderer({ ref, index, item, renderItem, dragging, dragOverlay, ghost, transform, transition, listeners, dragHandleProps, itemStyle, ...props }) {
	(0, import_react.useEffect)(() => {
		if (!dragOverlay) return;
		document.body.style.cursor = "grabbing";
		return () => {
			document.body.style.cursor = "";
		};
	}, [dragOverlay]);
	const style = {
		transition,
		transform: CSS.Transform.toString(transform ?? null)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.item",
		ref,
		"data-index": index,
		className: "box-border origin-top-left touch-manipulation",
		style: {
			...style,
			...itemStyle,
			...dragOverlay ? {
				"--scale": 1.02,
				zIndex: 999,
				position: "relative"
			} : {}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "relative",
				boxSizing: "border-box",
				touchAction: "manipulation",
				transformOrigin: "50% 50%",
				transform: dragOverlay ? "scale(var(--scale))" : "scale(var(--scale, 1))",
				zIndex: dragging && !dragOverlay ? 0 : void 0,
				opacity: dragging && !dragOverlay ? ghost ? .25 : 0 : 1,
				cursor: dragOverlay ? "inherit" : itemStyle?.cursor ?? "pointer",
				pointerEvents: dragOverlay ? "none" : void 0
			},
			...listeners,
			...props,
			children: renderItem(item, {
				dragging: !!dragging,
				overlay: !!dragOverlay,
				dragHandleProps
			})
		})
	});
}
function SortableItem({ item, id, index, renderItem, disabled = false, useDragOverlay = true, showGhost = true, itemStyle, dragHandle = false }) {
	const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
		id,
		disabled
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemRenderer, {
		ref: setNodeRef,
		item,
		index,
		renderItem,
		dragging: isDragging,
		dragOverlay: !useDragOverlay && isDragging,
		ghost: showGhost && useDragOverlay && isDragging,
		transform,
		transition,
		listeners: dragHandle ? void 0 : listeners,
		dragHandleProps: dragHandle ? {
			ref: setActivatorNodeRef,
			attributes,
			listeners
		} : void 0,
		itemStyle,
		...dragHandle ? {} : attributes
	});
}
var PortalSafePointerSensor = class extends PointerSensor {
	static {
		this.activators = [{
			eventName: "onPointerDown",
			handler: ({ nativeEvent: event }, { onActivation }) => {
				if (!event.isPrimary || event.button !== 0) return false;
				let target = event.target;
				while (target) {
					if (target.dataset?.noDnd) return false;
					target = target.parentElement;
				}
				onActivation?.({ event });
				return true;
			}
		}];
	}
};
var import_react_dom = require_react_dom();
function Sortable({ items, itemKey, onSortEnd, onDragStart: customOnDragStart, onDragEnd: customOnDragEnd, onDragCancel: customOnDragCancel, renderItem, layout = "list", horizontal = false, useDragOverlay = true, adjustScale = true, collisionDetection, showGhost = false, className, disabled = false, listStyle, itemStyle, gap, restrictions, modifiers: customModifiers, dragHandle = false, accessibility }) {
	const sensors = useSensors(useSensor(PortalSafePointerSensor, { activationConstraint: { distance: 8 } }), useSensor(TouchSensor, { activationConstraint: {
		delay: 100,
		tolerance: 5
	} }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	const getId = (0, import_react.useCallback)((item) => typeof itemKey === "function" ? itemKey(item) : item[itemKey], [itemKey]);
	const itemIds = (0, import_react.useMemo)(() => items.map(getId), [items, getId]);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const activeItem = activeId ? items.find((item) => getId(item) === activeId) : null;
	const getIndex = (id) => itemIds.indexOf(id);
	const activeIndex = activeId ? getIndex(activeId) : -1;
	const handleDragStart = ({ active }) => {
		customOnDragStart?.({ active });
		if (active) setActiveId(active.id);
	};
	const handleDragEnd = ({ over }) => {
		setActiveId(null);
		customOnDragEnd?.({ over });
		if (over) {
			const overIndex = getIndex(over.id);
			if (activeIndex !== overIndex) onSortEnd({
				oldIndex: activeIndex,
				newIndex: overIndex
			});
		}
	};
	const handleDragCancel = () => {
		setActiveId(null);
		customOnDragCancel?.();
	};
	const strategy = layout === "list" ? horizontal ? horizontalListSortingStrategy : verticalListSortingStrategy : rectSortingStrategy;
	const { windowEdges = false, scrollableAncestor = false } = restrictions ?? {};
	const modifiers = (0, import_react.useMemo)(() => [
		...layout === "list" ? [horizontal ? restrictToHorizontalAxis : restrictToVerticalAxis] : [],
		...windowEdges ? [restrictToWindowEdges] : [],
		...scrollableAncestor ? [restrictToFirstScrollableAncestor] : [],
		...customModifiers ?? []
	], [
		layout,
		horizontal,
		windowEdges,
		scrollableAncestor,
		customModifiers
	]);
	const dropAnimation = (0, import_react.useMemo)(() => ({ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: showGhost ? "0.25" : "0" } } }) }), [showGhost]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DndContext, {
		sensors,
		onDragStart: handleDragStart,
		onDragEnd: handleDragEnd,
		onDragCancel: handleDragCancel,
		collisionDetection,
		modifiers,
		accessibility,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
			items: itemIds,
			strategy,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn(layout === "grid" ? "grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-md:grid-cols-1" : cn("flex", horizontal ? "flex-row items-center" : "w-full flex-col items-stretch"), className),
				"data-layout": layout,
				"data-direction": horizontal ? "horizontal" : "vertical",
				style: {
					...listStyle,
					gap
				},
				children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableItem, {
					id: itemIds[index],
					index,
					item,
					renderItem,
					disabled,
					useDragOverlay,
					showGhost,
					itemStyle,
					dragHandle
				}, itemIds[index]))
			})
		}), useDragOverlay && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragOverlay, {
			adjustScale,
			dropAnimation,
			children: activeItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemRenderer, {
				item: activeItem,
				renderItem,
				itemStyle,
				dragOverlay: true
			})
		}), document.body)]
	});
}
var sortable_default = Sortable;
export { sortable_default as t };
