import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as sortable_default } from "./sortable-qolG0zwK.js";
import { t as reorderVisibleSubset } from "./reorder-visible-subset-Ctt0p2Ex.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ReorderableList({ items, visibleItems = items, getId, renderItem, onReorder, layout = "list", direction = "vertical", disabled = false, className, listStyle, itemStyle, gap, useDragOverlay = true, showGhost = true, dragHandle = false, accessibility, restrictions, onDragStateChange, onReorderError }) {
	const visibleIndexById = (0, import_react.useMemo)(() => {
		return new Map(visibleItems.map((item, index) => [getId(item), index]));
	}, [getId, visibleItems]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(sortable_default, {
		items: visibleItems,
		itemKey: getId,
		onSortEnd: (0, import_react.useCallback)(({ oldIndex, newIndex }) => {
			if (disabled) return;
			const nextItems = reorderVisibleSubset({
				items,
				visibleItems,
				fromIndex: oldIndex,
				toIndex: newIndex,
				getId
			});
			if (nextItems !== items) Promise.resolve(onReorder(nextItems)).catch((error) => {
				if (onReorderError) {
					onReorderError(error);
					return;
				}
				globalThis.console.error("ReorderableList onReorder failed", error);
			});
		}, [
			disabled,
			getId,
			items,
			onReorder,
			onReorderError,
			visibleItems
		]),
		onDragStart: (0, import_react.useCallback)(() => {
			if (!disabled) onDragStateChange?.(true);
		}, [disabled, onDragStateChange]),
		onDragEnd: (0, import_react.useCallback)(() => {
			onDragStateChange?.(false);
		}, [onDragStateChange]),
		onDragCancel: (0, import_react.useCallback)(() => {
			onDragStateChange?.(false);
		}, [onDragStateChange]),
		renderItem: (item, state) => renderItem(item, visibleIndexById.get(getId(item)) ?? -1, state),
		layout,
		horizontal: direction === "horizontal",
		className,
		disabled,
		listStyle,
		itemStyle,
		gap,
		restrictions,
		useDragOverlay,
		showGhost,
		dragHandle,
		accessibility
	});
}
export { ReorderableList as t };
