import { s as __toESM } from "./chunk-DiqNceaa.js";
import { a as GroupedSortableVirtualList_default, o as GroupedVirtualList_default, s as buildGroupedVirtualRows } from "./providerSettings-BcvJgtqn.js";
import { t as require_dayjs_min } from "./dayjs.min-CNu3tPBh.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { a as mergeUiProps, i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as Input } from "./input-dvr72LyA.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-n5iWPIgn.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { n as MenuItem, r as MenuList, t as MenuDivider } from "./menu-item-Boj_QdAM.js";
import { t as Skeleton } from "./skeleton-CmSX8uoi.js";
import { i as CommandHint, n as CommandContextMenu } from "./command-lPk0rc3k.js";
import { n as cn } from "./style-qqUWb85F.js";
import { a as isUniqueModelId, o as parseUniqueModelId } from "./model-CfoN7z8F.js";
import { t as Bot } from "./bot-Gan43VZU.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as ChevronRight } from "./chevron-right-CvFIUMTW.js";
import { t as ChevronsDownUp } from "./chevrons-down-up-DBIwXZL5.js";
import { t as ChevronsUpDown } from "./chevrons-up-down-Dn-WN3pT.js";
import { t as Clock } from "./clock-C_51ruVA.js";
import { t as Folder } from "./folder-CNcoOMX-.js";
import { t as History } from "./history-BBBeCIJj.js";
import { t as ListFilter } from "./list-filter-DPtCcpHu.js";
import { t as Search } from "./search-CQaFGVmj.js";
import { t as SquareMinus } from "./square-minus-BXCTunud.js";
import { t as EmojiIcon_default } from "./EmojiIcon-Cws6jG0n.js";
import { t as ModelAvatar_default } from "./ModelAvatar-B9O4au8z.js";
import { t as getAgentAvatarFromConfiguration } from "./agent-xClAvhQf.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
function getResourceListOptionDomId(itemId) {
	return `resource-list-option-${encodeURIComponent(itemId)}`;
}
const ResourceListContext = (0, import_react.createContext)(null);
const ResourceListActionsContext = (0, import_react.createContext)(null);
const ResourceListControlsContext = (0, import_react.createContext)(null);
const ResourceListItemAccessorsContext = (0, import_react.createContext)(null);
const ResourceListMetaContext = (0, import_react.createContext)(null);
const ResourceListSourceItemsContext = (0, import_react.createContext)(null);
const ResourceListUiStoreContext = (0, import_react.createContext)(null);
const ResourceListViewContext = (0, import_react.createContext)(null);
function useResourceListActions() {
	const actions = (0, import_react.use)(ResourceListActionsContext);
	if (!actions) throw new Error("ResourceList compound components must be rendered inside ResourceList.Provider");
	return actions;
}
function useResourceListControlsState() {
	const controls = (0, import_react.use)(ResourceListControlsContext);
	if (!controls) throw new Error("ResourceList compound components must be rendered inside ResourceList.Provider");
	return controls;
}
function useResourceListItemAccessors() {
	const accessors = (0, import_react.use)(ResourceListItemAccessorsContext);
	if (!accessors) throw new Error("ResourceList compound components must be rendered inside ResourceList.Provider");
	return accessors;
}
function useResourceListMeta() {
	const meta = (0, import_react.use)(ResourceListMetaContext);
	if (!meta) throw new Error("ResourceList compound components must be rendered inside ResourceList.Provider");
	return meta;
}
function useResourceListSourceItems() {
	const sourceItems = (0, import_react.use)(ResourceListSourceItemsContext);
	if (!sourceItems) throw new Error("ResourceList compound components must be rendered inside ResourceList.Provider");
	return sourceItems;
}
function useResourceListUiStore() {
	const store = (0, import_react.use)(ResourceListUiStoreContext);
	if (!store) throw new Error("ResourceList compound components must be rendered inside ResourceList.Provider");
	return store;
}
function useResourceListView() {
	const view = (0, import_react.use)(ResourceListViewContext);
	if (!view) throw new Error("ResourceList compound components must be rendered inside ResourceList.Provider");
	return view;
}
function useResourceListRowState(itemId) {
	const store = useResourceListUiStore();
	const subscribe = (0, import_react.useCallback)((listener) => store.subscribeRow(itemId, listener), [itemId, store]);
	const getSnapshot = (0, import_react.useCallback)(() => store.getRowSnapshot(itemId), [itemId, store]);
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
}
function useResourceListGroupState(groupId) {
	const store = useResourceListUiStore();
	const subscribe = (0, import_react.useCallback)((listener) => store.subscribeGroup(groupId, listener), [groupId, store]);
	const getSnapshot = (0, import_react.useCallback)(() => store.getGroupSnapshot(groupId), [groupId, store]);
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
}
const RESOURCE_LIST_ROW_HEIGHT_CLASS = "h-[38px]";
const RESOURCE_LIST_VISUAL_ROW_CLASS = "h-8 rounded-lg";
const RESOURCE_LIST_INTERACTIVE_ROW_CLASS = "hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:bg-sidebar-accent focus-visible:text-sidebar-foreground";
const RESOURCE_LIST_TEXT_START_PADDING_CLASS = "pl-9";
const RESOURCE_LIST_LEADING_SLOT_BASE_CLASS = "flex size-6 shrink-0 items-center justify-center";
const RESOURCE_LIST_ITEM_LEADING_SLOT_CLASS = "rounded-lg text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground group-data-[selected=true]:text-foreground [&_svg]:size-4 [&_svg]:shrink-0";
const RESOURCE_LIST_GROUP_HEADER_LEADING_SLOT_CLASS = "rounded-lg text-inherit [&_svg]:size-4 [&_svg]:text-inherit";
const RESOURCE_LIST_TITLE_FADE_CLASS = "overflow-hidden text-clip whitespace-nowrap transition-[margin] duration-150 [mask-image:linear-gradient(to_right,#000_calc(100%-16px),transparent)]";
const RESOURCE_LIST_TITLE_FADE_YIELD_CLASS = "group-has-[[data-resource-list-item-actions][data-active=true]]:mr-12 group-has-[[data-resource-list-item-actions]:focus-within]:mr-12 group-hover:mr-12";
const RESOURCE_LIST_RIGHT_PANEL_SEARCH_INPUT_CLASS = "h-8 rounded-lg border-border-subtle bg-background-subtle pl-7 pr-2 text-xs shadow-none md:text-xs placeholder:text-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:bg-background focus-visible:ring-0";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var RESOURCE_LIST_LEADING_SLOT_CLASS_BY_VARIANT = {
	groupHeader: RESOURCE_LIST_GROUP_HEADER_LEADING_SLOT_CLASS,
	item: RESOURCE_LIST_ITEM_LEADING_SLOT_CLASS,
	loading: void 0
};
function ResourceListLeadingSlot({ className, ref, variant = "item", children, "aria-hidden": ariaHidden, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "chat.resource-list-leading-slot",
		ref,
		"aria-hidden": ariaHidden ?? (children == null ? true : void 0),
		"data-resource-list-leading-slot": "true",
		className: cn(RESOURCE_LIST_LEADING_SLOT_BASE_CLASS, RESOURCE_LIST_LEADING_SLOT_CLASS_BY_VARIANT[variant], className),
		...mergeUiProps(props, "chat.resource-list-leading-slot"),
		children
	});
}
var EMPTY_GROUP_HEADER_ITEMS = [];
function stopEventPropagation(event) {
	event.stopPropagation();
}
function ResourceListGroupHeaderContextMenuOwner({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function SectionHeader({ section, className, ref, style, ...props }) {
	const actions = useResourceListActions();
	const meta = useResourceListMeta();
	const collapsed = useResourceListGroupState(section.id).collapsed;
	const sectionHeaderAction = meta.getSectionHeaderAction?.(section);
	const sectionHeaderActionAlwaysVisible = (0, import_react.isValidElement)(sectionHeaderAction) && sectionHeaderAction.props.alwaysVisible === true;
	if (!section.label) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.section-header",
		ref,
		style,
		className: cn("group/resource-list-section flex w-full items-center text-foreground text-sm", RESOURCE_LIST_ROW_HEIGHT_CLASS, className),
		...mergeUiProps(props, "chat.section-header"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex w-full items-center gap-1.5 px-2.5 text-muted-foreground transition-colors duration-150", RESOURCE_LIST_VISUAL_ROW_CLASS, RESOURCE_LIST_INTERACTIVE_ROW_CLASS),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-expanded": !collapsed,
				className: "flex h-full min-w-0 flex-1 items-center gap-1.5 text-left text-inherit outline-none focus-visible:text-foreground",
				onClick: () => actions.toggleGroup(section.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate text-left font-semibold text-[13px] text-inherit leading-5",
					children: section.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					"aria-hidden": "true",
					size: 11,
					className: "hidden shrink-0 text-muted-foreground transition-transform duration-150 group-focus-within/resource-list-section:block group-hover/resource-list-section:block",
					style: { transform: collapsed ? "none" : "rotate(90deg)" }
				})]
			}), sectionHeaderAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("ml-auto flex shrink-0 items-center transition-opacity", sectionHeaderActionAlwaysVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 focus-within:pointer-events-auto focus-within:opacity-100 group-hover/resource-list-section:pointer-events-auto group-hover/resource-list-section:opacity-100"),
				children: sectionHeaderAction
			})]
		})
	});
}
function GroupHeader({ group, className, ref, style, onContextMenu, ...props }) {
	const actions = useResourceListActions();
	const meta = useResourceListMeta();
	const view = useResourceListView();
	const groupState = useResourceListGroupState(group.id);
	const viewGroup = view.groups.find((candidate) => candidate.group.id === group.id);
	const collapsed = groupState.collapsed;
	const groupItems = viewGroup?.allItems ?? EMPTY_GROUP_HEADER_ITEMS;
	const clickBehavior = meta.getGroupHeaderClickBehavior(group);
	const isCollapsible = clickBehavior !== "none";
	const selected = clickBehavior === "select-first-then-toggle" && groupState.selected;
	const groupHeaderContext = { collapsed };
	const groupHeaderAction = meta.getGroupHeaderAction?.(group);
	const groupHeaderContextMenu = meta.getGroupHeaderContextMenu?.(group);
	const groupHeaderLeadingAction = meta.getGroupHeaderLeadingAction?.(group, groupHeaderContext);
	const customGroupHeaderIcon = meta.getGroupHeaderIcon?.(group, groupHeaderContext);
	const groupHeaderClassName = meta.getGroupHeaderClassName?.(group);
	const groupHeaderTooltip = meta.getGroupHeaderTooltip?.(group);
	const groupHeaderIcon = customGroupHeaderIcon ?? null;
	const hasLeadingSlot = Boolean(groupHeaderIcon || groupHeaderLeadingAction);
	const handleContextMenu = (0, import_react.useCallback)((event) => {
		onContextMenu?.(event);
	}, [onContextMenu]);
	const handleClick = (0, import_react.useCallback)(() => {
		if (!isCollapsible) return;
		if (clickBehavior === "select-first-then-toggle" && !selected) {
			const firstItem = groupItems[0];
			if (firstItem) {
				actions.selectGroupHeaderItem(meta.getItemId(firstItem));
				return;
			}
			if (meta.onEmptyGroupHeaderClick) {
				if (meta.onEmptyGroupHeaderClick(group) !== false) return;
			}
		}
		actions.toggleGroup(group.id);
	}, [
		actions,
		clickBehavior,
		group,
		groupItems,
		isCollapsible,
		meta,
		selected
	]);
	const headerContextMenuItems = groupHeaderContextMenu && groupHeaderContextMenu.length > 0 ? groupHeaderContextMenu : null;
	const resolveHeaderContextMenuItems = (0, import_react.useCallback)(() => headerContextMenuItems ?? [], [headerContextMenuItems]);
	if (!group.label) return null;
	const groupHeaderLabelClassName = cn("min-w-0 truncate text-left text-[13px] text-inherit leading-5", clickBehavior === "select-first-then-toggle" ? "font-normal" : "font-medium");
	const groupHeaderActionYieldClassName = groupHeaderAction ? "transition-[padding-right] duration-150 group-focus-within/resource-list-group:pr-12 group-hover/resource-list-group:pr-12 group-has-data-[state=open]/resource-list-group:pr-12" : void 0;
	const headerContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.group-header",
		className: cn("relative flex w-full items-center gap-1.5 transition-colors duration-150", hasLeadingSlot ? "px-1.5" : "px-2.5", RESOURCE_LIST_VISUAL_ROW_CLASS, RESOURCE_LIST_INTERACTIVE_ROW_CLASS, selected && "bg-sidebar-accent text-sidebar-foreground shadow-none", groupHeaderClassName),
		children: [
			groupHeaderLeadingAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-6 shrink-0 items-center justify-center",
				onClick: stopEventPropagation,
				onContextMenu: stopEventPropagation,
				onPointerDown: stopEventPropagation,
				onPointerUp: stopEventPropagation,
				children: groupHeaderLeadingAction
			}),
			isCollapsible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-expanded": !collapsed,
				"aria-current": selected ? "true" : void 0,
				className: cn("flex h-full min-w-0 flex-1 items-center gap-1.5 text-left text-inherit outline-none", groupHeaderActionYieldClassName),
				onClick: handleClick,
				children: [
					groupHeaderIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListLeadingSlot, {
						"aria-hidden": "true",
						variant: "groupHeader",
						children: groupHeaderIcon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: groupHeaderLabelClassName,
						children: group.label
					}),
					!groupHeaderAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						"aria-hidden": "true",
						size: 11,
						className: "hidden shrink-0 text-muted-foreground transition-transform duration-150 group-focus-within/resource-list-group:block group-hover/resource-list-group:block group-has-data-[state=open]/resource-list-group:block",
						style: { transform: collapsed ? "none" : "rotate(90deg)" }
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex h-full min-w-0 flex-1 items-center gap-1.5 text-left text-inherit", groupHeaderActionYieldClassName),
				children: [groupHeaderIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListLeadingSlot, {
					"aria-hidden": "true",
					variant: "groupHeader",
					children: groupHeaderIcon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: groupHeaderLabelClassName,
					children: group.label
				})]
			}),
			groupHeaderAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-translate-y-1/2 pointer-events-none absolute top-1/2 right-1.5 flex items-center opacity-0 transition-opacity focus-within:pointer-events-auto focus-within:opacity-100 group-focus-within/resource-list-group:pointer-events-auto group-focus-within/resource-list-group:opacity-100 group-hover/resource-list-group:pointer-events-auto group-hover/resource-list-group:opacity-100 has-data-[state=open]:pointer-events-auto has-data-[state=open]:opacity-100",
				onClick: stopEventPropagation,
				onContextMenu: stopEventPropagation,
				onPointerDown: stopEventPropagation,
				onPointerUp: stopEventPropagation,
				children: groupHeaderAction
			})
		]
	});
	const header = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.group-header",
		ref,
		style,
		className: cn("group/resource-list-group flex w-full items-center text-foreground text-sm", RESOURCE_LIST_ROW_HEIGHT_CLASS, className),
		"data-selected": selected || void 0,
		onContextMenu: handleContextMenu,
		...mergeUiProps(props, "chat.group-header"),
		children: groupHeaderTooltip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: groupHeaderTooltip,
			placement: "right",
			sideOffset: 4,
			delay: 500,
			fullWidthTrigger: true,
			children: headerContent
		}) : headerContent
	});
	if (!headerContextMenuItems) return header;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "webcontents.context",
		getExtraItems: resolveHeaderContextMenuItems,
		children: header
	});
}
function GroupShowMore({ groupId, className, ref, style, ...props }) {
	const actions = useResourceListActions();
	const meta = useResourceListMeta();
	const canCollapseToDefault = useResourceListGroupState(groupId).canCollapseToDefault;
	const label = canCollapseToDefault ? meta.groupCollapseLabel : meta.groupShowMoreLabel;
	if (!label) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.group-show-more",
		ref,
		style,
		className: cn("flex items-center justify-start pr-1.5 text-foreground", RESOURCE_LIST_ROW_HEIGHT_CLASS, RESOURCE_LIST_TEXT_START_PADDING_CLASS, className),
		...mergeUiProps(props, "chat.group-show-more"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "flex h-5 min-w-0 items-center justify-start rounded-sm px-0 text-left font-medium text-[11px] text-muted-foreground leading-4 transition-colors duration-150 hover:text-inherit focus-visible:bg-sidebar-accent focus-visible:text-inherit focus-visible:outline-none",
			onClick: () => {
				if (canCollapseToDefault) {
					actions.collapseGroupItems(groupId);
					return;
				}
				actions.showMoreInGroup(groupId);
			},
			children: label
		})
	});
}
var EMPTY_ROW_STATE = Object.freeze({
	active: false,
	dragging: false,
	renaming: false,
	revealFocused: false,
	selected: false
});
var EMPTY_GROUP_STATE = Object.freeze({
	canCollapseToDefault: false,
	collapsed: false,
	hasMore: false,
	selected: false,
	visibleCount: 0
});
function sameRowState(a, b) {
	return a.active === b.active && a.dragging === b.dragging && a.renaming === b.renaming && a.revealFocused === b.revealFocused && a.selected === b.selected;
}
function sameGroupState(a, b) {
	return a.canCollapseToDefault === b.canCollapseToDefault && a.collapsed === b.collapsed && a.hasMore === b.hasMore && a.selected === b.selected && a.visibleCount === b.visibleCount;
}
function addDefined(target, ...ids) {
	for (const id of ids) if (id) target.add(id);
}
var ResourceListUiService = class {
	groupCache = /* @__PURE__ */ new Map();
	groupListeners = /* @__PURE__ */ new Map();
	groupRecords = /* @__PURE__ */ new Map();
	itemGroupIds = /* @__PURE__ */ new Map();
	listboxListeners = /* @__PURE__ */ new Set();
	listboxSnapshot;
	rowCache = /* @__PURE__ */ new Map();
	rowListeners = /* @__PURE__ */ new Map();
	state;
	constructor(initialState = {}) {
		this.state = {
			activeId: initialState.activeId ?? null,
			draggingId: initialState.draggingId ?? null,
			renamingId: initialState.renamingId ?? null,
			revealFocus: initialState.revealFocus ?? null,
			selectedId: initialState.selectedId ?? null
		};
		this.listboxSnapshot = {
			activeId: this.state.activeId,
			selectedId: this.state.selectedId
		};
	}
	getRowSnapshot = (itemId) => {
		const next = {
			active: this.state.activeId === itemId,
			dragging: this.state.draggingId === itemId,
			renaming: this.state.renamingId === itemId,
			revealFocused: this.state.revealFocus?.itemId === itemId,
			selected: this.state.selectedId === itemId
		};
		const previous = this.rowCache.get(itemId);
		if (previous && sameRowState(previous, next)) return previous;
		if (sameRowState(EMPTY_ROW_STATE, next)) {
			this.rowCache.set(itemId, EMPTY_ROW_STATE);
			return EMPTY_ROW_STATE;
		}
		this.rowCache.set(itemId, next);
		return next;
	};
	getGroupSnapshot = (groupId) => {
		const record = this.groupRecords.get(groupId);
		if (!record) return EMPTY_GROUP_STATE;
		const next = {
			canCollapseToDefault: record.canCollapseToDefault,
			collapsed: record.collapsed,
			hasMore: record.hasMore,
			selected: this.state.selectedId !== null && record.itemIds.has(this.state.selectedId),
			visibleCount: record.visibleCount
		};
		const previous = this.groupCache.get(groupId);
		if (previous && sameGroupState(previous, next)) return previous;
		this.groupCache.set(groupId, next);
		return next;
	};
	getUiSnapshot = () => this.state;
	getListboxSnapshot = () => {
		const { activeId, selectedId } = this.state;
		if (this.listboxSnapshot.activeId === activeId && this.listboxSnapshot.selectedId === selectedId) return this.listboxSnapshot;
		this.listboxSnapshot = {
			activeId,
			selectedId
		};
		return this.listboxSnapshot;
	};
	setActiveId = (activeId) => {
		if (this.state.activeId === activeId) return;
		const previousId = this.state.activeId;
		this.state = {
			...this.state,
			activeId
		};
		this.notifyRows(previousId, activeId);
		this.notifyListbox();
	};
	subscribeListbox = (listener) => {
		this.listboxListeners.add(listener);
		return () => {
			this.listboxListeners.delete(listener);
		};
	};
	subscribeRow = (itemId, listener) => {
		const listeners = this.rowListeners.get(itemId) ?? /* @__PURE__ */ new Set();
		listeners.add(listener);
		this.rowListeners.set(itemId, listeners);
		return () => {
			listeners.delete(listener);
			if (listeners.size === 0) {
				this.rowListeners.delete(itemId);
				this.rowCache.delete(itemId);
			}
		};
	};
	subscribeGroup = (groupId, listener) => {
		const listeners = this.groupListeners.get(groupId) ?? /* @__PURE__ */ new Set();
		listeners.add(listener);
		this.groupListeners.set(groupId, listeners);
		return () => {
			listeners.delete(listener);
			if (listeners.size === 0) {
				this.groupListeners.delete(groupId);
				this.groupCache.delete(groupId);
			}
		};
	};
	setDraggingId = (draggingId) => {
		if (this.state.draggingId === draggingId) return;
		const previousId = this.state.draggingId;
		this.state = {
			...this.state,
			draggingId
		};
		this.notifyRows(previousId, draggingId);
	};
	setRenamingId = (renamingId) => {
		if (this.state.renamingId === renamingId) return;
		const previousId = this.state.renamingId;
		this.state = {
			...this.state,
			renamingId
		};
		this.notifyRows(previousId, renamingId);
	};
	setRevealFocus = (revealFocus) => {
		const previousFocus = this.state.revealFocus;
		if (previousFocus?.itemId === revealFocus?.itemId && previousFocus?.requestId === revealFocus?.requestId) return;
		this.state = {
			...this.state,
			revealFocus
		};
		this.notifyRows(previousFocus?.itemId, revealFocus?.itemId);
	};
	setSelectedId = (selectedId) => {
		if (this.state.selectedId === selectedId) return;
		const previousId = this.state.selectedId;
		const previousGroupId = previousId ? this.itemGroupIds.get(previousId) : void 0;
		const nextGroupId = selectedId ? this.itemGroupIds.get(selectedId) : void 0;
		this.state = {
			...this.state,
			selectedId
		};
		this.notifyRows(previousId, selectedId);
		this.notifyGroups(previousGroupId, nextGroupId);
		this.notifyListbox();
	};
	setViewGroups(groups, getItemId) {
		const nextGroupRecords = /* @__PURE__ */ new Map();
		const nextItemGroupIds = /* @__PURE__ */ new Map();
		const changedGroupIds = /* @__PURE__ */ new Set();
		for (const viewGroup of groups) {
			const itemIds = /* @__PURE__ */ new Set();
			for (const item of viewGroup.allItems) {
				const itemId = getItemId(item);
				itemIds.add(itemId);
				nextItemGroupIds.set(itemId, viewGroup.group.id);
			}
			const nextRecord = {
				canCollapseToDefault: viewGroup.canCollapseToDefault,
				collapsed: viewGroup.collapsed,
				hasMore: viewGroup.hasMore,
				itemIds,
				visibleCount: viewGroup.visibleCount
			};
			const previousSnapshot = this.getGroupSnapshot(viewGroup.group.id);
			nextGroupRecords.set(viewGroup.group.id, nextRecord);
			this.groupRecords.set(viewGroup.group.id, nextRecord);
			this.groupCache.delete(viewGroup.group.id);
			if (!sameGroupState(previousSnapshot, this.getGroupSnapshot(viewGroup.group.id))) changedGroupIds.add(viewGroup.group.id);
		}
		for (const groupId of this.groupRecords.keys()) if (!nextGroupRecords.has(groupId)) {
			changedGroupIds.add(groupId);
			this.groupCache.delete(groupId);
		}
		this.groupRecords = nextGroupRecords;
		this.itemGroupIds = nextItemGroupIds;
		this.notifyGroups(...changedGroupIds);
	}
	notifyGroups(...groupIds) {
		const next = /* @__PURE__ */ new Set();
		addDefined(next, ...groupIds);
		for (const groupId of next) this.groupListeners.get(groupId)?.forEach((listener) => listener());
	}
	notifyRows(...itemIds) {
		const next = /* @__PURE__ */ new Set();
		addDefined(next, ...itemIds);
		for (const itemId of next) {
			this.rowCache.delete(itemId);
			this.rowListeners.get(itemId)?.forEach((listener) => listener());
		}
	}
	notifyListbox() {
		if (this.listboxListeners.size === 0) return;
		this.getListboxSnapshot();
		this.listboxListeners.forEach((listener) => listener());
	}
};
var EMPTY_SORT_OPTIONS = [];
var EMPTY_FILTER_OPTIONS = [];
var EMPTY_GROUP_SEEDS = [];
var getDefaultItemId = (item) => item.id;
var getDefaultItemLabel = (item) => item.name;
var estimateDefaultItemSize = () => 38;
var UNGROUPED_RESOURCE_GROUP = {
	id: "ungrouped",
	label: ""
};
var UNSECTIONED_RESOURCE_SECTION = {
	id: "resource-list:section:unsectioned",
	label: ""
};
function getResourceListGroup(item, groupBy) {
	return groupBy?.(item) ?? UNGROUPED_RESOURCE_GROUP;
}
function getResourceListGroupFromSeed(group) {
	return {
		id: group.id,
		label: group.label,
		count: group.count
	};
}
function normalizeCollapsedIds(collapsedIds) {
	return Array.isArray(collapsedIds) ? collapsedIds : [];
}
function deriveResourceListItems({ filterById, filters, getItemLabel, items, query, sortById, sortId }) {
	const normalizedQuery = query.trim().toLowerCase();
	let next = [...items];
	if (normalizedQuery) next = next.filter((item) => getItemLabel(item).toLowerCase().includes(normalizedQuery));
	if (filters.length > 0) next = next.filter((item) => {
		for (const filterId of filters) {
			const filter = filterById.get(filterId);
			if (filter && !filter.predicate(item)) return false;
		}
		return true;
	});
	const sort = sortId ? sortById.get(sortId) : null;
	if (sort) next.sort(sort.comparator);
	return next;
}
function buildResourceListGroups({ collapsedIds, defaultGroupVisibleCount, groupBy, groupSeeds = EMPTY_GROUP_SEEDS, groupVisibleCounts, items }) {
	const collapsedIdSet = new Set(collapsedIds);
	if (!groupBy) return [{
		group: {
			id: "all",
			label: ""
		},
		allItems: [...items],
		items: [...items],
		totalCount: items.length,
		visibleCount: items.length,
		hasMore: false,
		canCollapseToDefault: false,
		collapsed: false
	}];
	const groups = /* @__PURE__ */ new Map();
	for (const group of groupSeeds) groups.set(group.id, {
		group,
		items: []
	});
	for (const item of items) {
		const group = getResourceListGroup(item, groupBy);
		const existing = groups.get(group.id);
		if (existing) existing.items.push(item);
		else groups.set(group.id, {
			group,
			items: [item]
		});
	}
	return [...groups.values()].map(({ group, items: items$1 }) => {
		const totalCount = items$1.length;
		const collapsed = Boolean(group.label) && collapsedIdSet.has(group.id);
		const configuredVisibleCount = groupVisibleCounts[group.id] ?? defaultGroupVisibleCount;
		const visibleCount = Math.min(configuredVisibleCount, totalCount);
		const hasMore = !collapsed && visibleCount < totalCount;
		const canCollapseToDefault = !collapsed && totalCount > defaultGroupVisibleCount && visibleCount >= totalCount;
		return {
			group: {
				...group,
				count: group.count ?? totalCount
			},
			allItems: items$1,
			items: collapsed ? [] : items$1.slice(0, visibleCount),
			totalCount,
			visibleCount: collapsed ? 0 : visibleCount,
			hasMore,
			canCollapseToDefault,
			collapsed
		};
	});
}
function buildResourceListSections({ collapsedIds, defaultGroupVisibleCount, groupBy, groupSeeds = EMPTY_GROUP_SEEDS, groupVisibleCounts, items, sectionBy }) {
	if (!sectionBy) return [];
	const collapsedIdSet = new Set(collapsedIds);
	const sections = /* @__PURE__ */ new Map();
	for (const item of items) {
		const section = sectionBy(item) ?? UNSECTIONED_RESOURCE_SECTION;
		const existing = sections.get(section.id);
		if (existing) existing.items.push(item);
		else sections.set(section.id, {
			section,
			items: [item],
			groupSeeds: []
		});
	}
	for (const groupSeed of groupSeeds) {
		const section = groupSeed.section ?? UNSECTIONED_RESOURCE_SECTION;
		const group = getResourceListGroupFromSeed(groupSeed);
		const existing = sections.get(section.id);
		if (existing) existing.groupSeeds.push(group);
		else sections.set(section.id, {
			section,
			items: [],
			groupSeeds: [group]
		});
	}
	const sectionEntries = [...sections.values()];
	const showSectionHeaders = sectionEntries.length > 1;
	return sectionEntries.map(({ section, items: items$1, groupSeeds: groupSeeds$1 }) => {
		const collapsed = showSectionHeaders && Boolean(section.label) && collapsedIdSet.has(section.id);
		const groups = buildResourceListGroups({
			collapsedIds,
			defaultGroupVisibleCount,
			groupBy,
			groupSeeds: groupSeeds$1,
			groupVisibleCounts,
			items: items$1
		});
		const visibleGroups = collapsed ? groups.map((group) => ({
			...group,
			items: [],
			visibleCount: 0,
			hasMore: false,
			canCollapseToDefault: false
		})) : groups;
		return {
			section: {
				...section,
				count: section.count ?? items$1.length
			},
			groups: visibleGroups,
			allItems: items$1,
			totalCount: items$1.length,
			collapsed
		};
	});
}
function buildSectionStateGroups(sections) {
	return sections.map((section) => ({
		group: section.section,
		allItems: section.allItems,
		items: section.collapsed ? [] : section.groups.flatMap((group) => group.items),
		totalCount: section.totalCount,
		visibleCount: section.collapsed ? 0 : section.groups.reduce((count, group) => count + group.visibleCount, 0),
		hasMore: false,
		canCollapseToDefault: false,
		collapsed: section.collapsed
	}));
}
function findResourceListRevealTarget({ defaultGroupVisibleCount, getItemId, groupBy, groupVisibleCounts, itemId, items, sectionBy }) {
	const targetItem = items.find((item) => getItemId(item) === itemId);
	if (!targetItem) return null;
	const targetSectionId = sectionBy ? sectionBy(targetItem)?.id ?? UNSECTIONED_RESOURCE_SECTION.id : null;
	if (!groupBy) return {
		targetGroupId: null,
		targetSectionId,
		visibleCount: void 0
	};
	const targetGroupId = getResourceListGroup(targetItem, groupBy).id;
	const targetIndexInGroup = items.filter((item) => getResourceListGroup(item, groupBy).id === targetGroupId).findIndex((item) => getItemId(item) === itemId);
	const currentVisibleCount = groupVisibleCounts[targetGroupId] ?? defaultGroupVisibleCount;
	const targetVisibleCount = targetIndexInGroup + 1;
	return {
		targetGroupId,
		targetSectionId,
		visibleCount: targetIndexInGroup >= 0 && targetVisibleCount > currentVisibleCount ? targetVisibleCount : void 0
	};
}
function reducer(state, action) {
	switch (action.type) {
		case "setQuery": return {
			...state,
			query: action.query
		};
		case "setFilters": return {
			...state,
			filters: action.filters
		};
		case "toggleFilter": {
			const next = new Set(state.filters);
			if (next.has(action.filterId)) next.delete(action.filterId);
			else next.add(action.filterId);
			return {
				...state,
				filters: [...next]
			};
		}
		case "setSort": return {
			...state,
			sort: action.sort
		};
		case "setActiveItem":
			if (state.activeId === action.id) return state;
			return {
				...state,
				activeId: action.id
			};
		case "selectItem":
			if (state.selectedId === action.id && state.activeId === action.id) return state;
			return {
				...state,
				activeId: action.id,
				selectedId: action.id
			};
		case "startRename": return {
			...state,
			renamingId: action.id
		};
		case "cancelRename": return {
			...state,
			renamingId: null
		};
		case "showMoreInGroup": return {
			...state,
			groupVisibleCounts: {
				...state.groupVisibleCounts,
				[action.groupId]: Number.POSITIVE_INFINITY
			}
		};
		case "collapseGroupItems": return {
			...state,
			groupVisibleCounts: {
				...state.groupVisibleCounts,
				[action.groupId]: action.defaultCount
			}
		};
		case "expandGroups": return {
			...state,
			collapsedGroups: state.collapsedGroups.filter((groupId) => !action.groupIds.includes(groupId))
		};
		case "collapseGroups": {
			const collapsedGroups = new Set(state.collapsedGroups);
			const groupVisibleCounts = { ...state.groupVisibleCounts };
			for (const groupId of action.groupIds) {
				collapsedGroups.add(groupId);
				groupVisibleCounts[groupId] = action.defaultCount;
			}
			return {
				...state,
				collapsedGroups: [...collapsedGroups],
				groupVisibleCounts
			};
		}
		case "resetGroupVisibleCounts": {
			const groupVisibleCounts = { ...state.groupVisibleCounts };
			for (const groupId of action.groupIds) groupVisibleCounts[groupId] = action.defaultCount;
			return {
				...state,
				groupVisibleCounts
			};
		}
		case "toggleGroup": {
			const collapsedGroups = state.collapsedGroups.includes(action.groupId) ? state.collapsedGroups.filter((groupId) => groupId !== action.groupId) : [...state.collapsedGroups, action.groupId];
			return {
				...state,
				collapsedGroups
			};
		}
		case "revealItem": {
			const nextGroupVisibleCounts = { ...state.groupVisibleCounts };
			const targetGroupId = action.groupIds[0];
			if (targetGroupId && action.visibleCount !== void 0) nextGroupVisibleCounts[targetGroupId] = Math.max(nextGroupVisibleCounts[targetGroupId] ?? 0, action.visibleCount);
			return {
				...state,
				query: action.clearQuery ? "" : state.query,
				filters: action.clearFilters ? [] : state.filters,
				collapsedGroups: action.groupIds.length > 0 ? state.collapsedGroups.filter((groupId) => !action.groupIds.includes(groupId)) : state.collapsedGroups,
				groupVisibleCounts: nextGroupVisibleCounts,
				activeId: action.itemId,
				revealFocus: {
					itemId: action.itemId,
					requestId: action.requestId
				}
			};
		}
		case "clearRevealFocus":
			if (state.revealFocus?.itemId !== action.itemId || state.revealFocus.requestId !== action.requestId) return state;
			return {
				...state,
				revealFocus: null
			};
		case "startDrag": return {
			...state,
			draggingId: action.id
		};
		case "endDrag": return {
			...state,
			draggingId: null
		};
	}
}
function ResourceListProvider({ items, children, variant = "resource", status = "idle", selectedId: selectedIdProp, defaultSortId, sortOptions = EMPTY_SORT_OPTIONS, filterOptions = EMPTY_FILTER_OPTIONS, groupBy, groupSeeds = EMPTY_GROUP_SEEDS, sectionBy, getItemId = getDefaultItemId, getItemLabel = getDefaultItemLabel, getSectionHeaderAction, getGroupHeaderAction, getGroupHeaderContextMenu, getGroupHeaderLeadingAction, getGroupHeaderIcon, isGroupHeaderIconVisible, getGroupHeaderClassName, getGroupHeaderTooltip, groupHeaderClickBehavior = "toggle", collapsedState, revealRequest, dragCapabilities, canDragGroup, canDragItem, canDropGroup, canDropItem, defaultGroupVisibleCount = 5, groupLoadStep = 5, groupShowMoreLabel, groupCollapseLabel, estimateItemSize = estimateDefaultItemSize, onSelectItem, onRenameItem, onGroupHeaderSelectItem, onEmptyGroupHeaderClick, onOpenContextMenu, onReorder, onCollapsedStateChange }) {
	const [state, dispatch] = (0, import_react.useReducer)(reducer, {
		activeId: selectedIdProp ?? null,
		query: "",
		filters: [],
		sort: defaultSortId ?? null,
		selectedId: selectedIdProp ?? null,
		revealFocus: null,
		renamingId: null,
		collapsedGroups: [],
		groupVisibleCounts: {},
		draggingId: null
	});
	const filterById = (0, import_react.useMemo)(() => new Map(filterOptions.map((option) => [option.id, option])), [filterOptions]);
	const sortById = (0, import_react.useMemo)(() => new Map(sortOptions.map((option) => [option.id, option])), [sortOptions]);
	const isControlled = collapsedState !== void 0;
	const effectiveCollapsedIds = normalizeCollapsedIds(collapsedState ?? state.collapsedGroups);
	const effectiveSelectedId = selectedIdProp !== void 0 ? selectedIdProp : state.selectedId;
	const isSelectedControlled = selectedIdProp !== void 0;
	const handledRevealRequestRef = (0, import_react.useRef)(null);
	const collapsedStateRef = (0, import_react.useRef)([]);
	const uiStoreRef = (0, import_react.useRef)(null);
	if (!uiStoreRef.current) uiStoreRef.current = new ResourceListUiService({
		activeId: state.activeId,
		draggingId: state.draggingId,
		renamingId: state.renamingId,
		revealFocus: state.revealFocus,
		selectedId: effectiveSelectedId
	});
	const uiStore = uiStoreRef.current;
	const getGroupHeaderClickBehavior = (0, import_react.useCallback)((group) => typeof groupHeaderClickBehavior === "function" ? groupHeaderClickBehavior(group) : groupHeaderClickBehavior, [groupHeaderClickBehavior]);
	const seedGroups = (0, import_react.useMemo)(() => groupSeeds.map(getResourceListGroupFromSeed), [groupSeeds]);
	(0, import_react.useEffect)(() => {
		if (!revealRequest) return;
		const requestKey = `${revealRequest.requestId}:${revealRequest.itemId}`;
		if (handledRevealRequestRef.current === requestKey) return;
		const query = revealRequest.clearQuery ? "" : state.query;
		const revealItems = deriveResourceListItems({
			filterById,
			filters: revealRequest.clearFilters ? [] : state.filters,
			getItemLabel,
			items,
			query,
			sortById,
			sortId: state.sort
		});
		const revealTarget = findResourceListRevealTarget({
			defaultGroupVisibleCount,
			getItemId,
			groupBy,
			groupVisibleCounts: state.groupVisibleCounts,
			itemId: revealRequest.itemId,
			items: revealItems,
			sectionBy
		});
		if (!revealTarget) return;
		const revealGroupIds = [revealTarget.targetGroupId].filter((groupId) => typeof groupId === "string");
		const revealSectionIds = [revealTarget.targetSectionId].filter((sectionId) => typeof sectionId === "string");
		const revealIds = [...revealGroupIds, ...revealSectionIds];
		if (isControlled && revealIds.some((id) => effectiveCollapsedIds.includes(id))) {
			const nextCollapsedIds = effectiveCollapsedIds.filter((id) => !revealIds.includes(id));
			collapsedStateRef.current = nextCollapsedIds;
			onCollapsedStateChange?.(nextCollapsedIds);
		}
		handledRevealRequestRef.current = requestKey;
		dispatch({
			type: "revealItem",
			clearFilters: revealRequest.clearFilters,
			clearQuery: revealRequest.clearQuery,
			groupIds: [...revealGroupIds, ...revealSectionIds],
			itemId: revealRequest.itemId,
			requestId: revealRequest.requestId,
			visibleCount: revealTarget.visibleCount
		});
	}, [
		isControlled,
		effectiveCollapsedIds,
		filterById,
		defaultGroupVisibleCount,
		getItemId,
		getItemLabel,
		groupBy,
		items,
		onCollapsedStateChange,
		revealRequest,
		sectionBy,
		sortById,
		state.filters,
		state.groupVisibleCounts,
		state.query,
		state.sort
	]);
	(0, import_react.useEffect)(() => {
		if (!state.revealFocus) return;
		const { itemId, requestId } = state.revealFocus;
		const timeout = window.setTimeout(() => {
			dispatch({
				type: "clearRevealFocus",
				itemId,
				requestId
			});
		}, 1e3);
		return () => {
			window.clearTimeout(timeout);
		};
	}, [state.revealFocus]);
	const viewItems = (0, import_react.useMemo)(() => {
		return deriveResourceListItems({
			filterById,
			filters: state.filters,
			getItemLabel,
			items,
			query: state.query,
			sortById,
			sortId: state.sort
		});
	}, [
		filterById,
		getItemLabel,
		items,
		sortById,
		state.filters,
		state.query,
		state.sort
	]);
	const viewSections = (0, import_react.useMemo)(() => {
		return buildResourceListSections({
			collapsedIds: effectiveCollapsedIds,
			defaultGroupVisibleCount,
			groupBy,
			groupSeeds,
			groupVisibleCounts: state.groupVisibleCounts,
			items: viewItems,
			sectionBy
		});
	}, [
		defaultGroupVisibleCount,
		effectiveCollapsedIds,
		groupBy,
		groupSeeds,
		sectionBy,
		state.groupVisibleCounts,
		viewItems
	]);
	const viewGroups = (0, import_react.useMemo)(() => {
		if (sectionBy) return viewSections.flatMap((section) => section.groups);
		return buildResourceListGroups({
			collapsedIds: effectiveCollapsedIds,
			defaultGroupVisibleCount,
			groupBy,
			groupSeeds: seedGroups,
			groupVisibleCounts: state.groupVisibleCounts,
			items: viewItems
		});
	}, [
		defaultGroupVisibleCount,
		effectiveCollapsedIds,
		groupBy,
		sectionBy,
		seedGroups,
		state.groupVisibleCounts,
		viewItems,
		viewSections
	]);
	const visibleItems = (0, import_react.useMemo)(() => viewGroups.flatMap((group) => group.items), [viewGroups]);
	const stateGroups = (0, import_react.useMemo)(() => sectionBy ? [...buildSectionStateGroups(viewSections), ...viewGroups] : viewGroups, [
		sectionBy,
		viewGroups,
		viewSections
	]);
	(0, import_react.useLayoutEffect)(() => {
		uiStore.setSelectedId(effectiveSelectedId);
	}, [effectiveSelectedId, uiStore]);
	(0, import_react.useEffect)(() => {
		uiStore.setActiveId(state.activeId);
	}, [state.activeId, uiStore]);
	(0, import_react.useLayoutEffect)(() => {
		uiStore.setActiveId(effectiveSelectedId);
		dispatch({
			type: "setActiveItem",
			id: effectiveSelectedId
		});
	}, [effectiveSelectedId, uiStore]);
	(0, import_react.useLayoutEffect)(() => {
		uiStore.setRenamingId(state.renamingId);
	}, [state.renamingId, uiStore]);
	(0, import_react.useLayoutEffect)(() => {
		uiStore.setRevealFocus(state.revealFocus);
	}, [state.revealFocus, uiStore]);
	(0, import_react.useLayoutEffect)(() => {
		uiStore.setDraggingId(state.draggingId);
	}, [state.draggingId, uiStore]);
	(0, import_react.useLayoutEffect)(() => {
		uiStore.setViewGroups(stateGroups, getItemId);
	}, [
		getItemId,
		stateGroups,
		uiStore
	]);
	(0, import_react.useLayoutEffect)(() => {
		collapsedStateRef.current = effectiveCollapsedIds;
	}, [effectiveCollapsedIds]);
	const notifyControlledCollapsedStateChange = (0, import_react.useCallback)((nextCollapsedIds) => {
		const next = [...new Set(nextCollapsedIds)];
		collapsedStateRef.current = next;
		onCollapsedStateChange?.(next);
	}, [onCollapsedStateChange]);
	const actions = (0, import_react.useMemo)(() => ({
		setQuery: (query) => dispatch({
			type: "setQuery",
			query
		}),
		setFilters: (filters) => dispatch({
			type: "setFilters",
			filters
		}),
		toggleFilter: (filterId) => dispatch({
			type: "toggleFilter",
			filterId
		}),
		setSort: (sortId) => dispatch({
			type: "setSort",
			sort: sortId
		}),
		setActiveItem: (id) => {
			uiStore.setActiveId(id);
			dispatch({
				type: "setActiveItem",
				id
			});
		},
		selectItem: (id) => {
			uiStore.setActiveId(id);
			if (!isSelectedControlled) {
				uiStore.setSelectedId(id);
				dispatch({
					type: "selectItem",
					id
				});
			} else dispatch({
				type: "setActiveItem",
				id
			});
			onSelectItem?.(id);
		},
		startRename: (id) => {
			uiStore.setRenamingId(id);
			dispatch({
				type: "startRename",
				id
			});
		},
		commitRename: (id, name) => {
			onRenameItem?.(id, name);
			uiStore.setRenamingId(null);
			dispatch({ type: "cancelRename" });
		},
		cancelRename: () => {
			uiStore.setRenamingId(null);
			dispatch({ type: "cancelRename" });
		},
		openContextMenu: (id) => onOpenContextMenu?.(id),
		selectGroupHeaderItem: (id) => {
			if (!isSelectedControlled) {
				uiStore.setSelectedId(id);
				dispatch({
					type: "selectItem",
					id
				});
			}
			(onGroupHeaderSelectItem ?? onSelectItem)?.(id);
		},
		showMoreInGroup: (groupId) => dispatch({
			type: "showMoreInGroup",
			groupId
		}),
		collapseGroupItems: (groupId) => dispatch({
			type: "collapseGroupItems",
			groupId,
			defaultCount: defaultGroupVisibleCount
		}),
		expandGroups: (groupIds) => {
			if (isControlled) {
				const removeSet = new Set(groupIds);
				notifyControlledCollapsedStateChange(collapsedStateRef.current.filter((id) => !removeSet.has(id)));
				return;
			}
			dispatch({
				type: "expandGroups",
				groupIds
			});
		},
		collapseGroups: (groupIds) => {
			if (isControlled) {
				dispatch({
					type: "resetGroupVisibleCounts",
					groupIds,
					defaultCount: defaultGroupVisibleCount
				});
				notifyControlledCollapsedStateChange([...collapsedStateRef.current, ...groupIds]);
				return;
			}
			dispatch({
				type: "collapseGroups",
				groupIds,
				defaultCount: defaultGroupVisibleCount
			});
		},
		toggleGroup: (groupId) => {
			if (isControlled) {
				notifyControlledCollapsedStateChange(collapsedStateRef.current.includes(groupId) ? collapsedStateRef.current.filter((id) => id !== groupId) : [...collapsedStateRef.current, groupId]);
				return;
			}
			dispatch({
				type: "toggleGroup",
				groupId
			});
		},
		reorder: (payload) => onReorder?.(payload)
	}), [
		defaultGroupVisibleCount,
		isControlled,
		isSelectedControlled,
		notifyControlledCollapsedStateChange,
		onGroupHeaderSelectItem,
		onOpenContextMenu,
		onRenameItem,
		onReorder,
		onSelectItem,
		uiStore
	]);
	const controlsState = (0, import_react.useMemo)(() => ({
		filters: state.filters,
		query: state.query,
		sort: state.sort,
		status
	}), [
		state.filters,
		state.query,
		state.sort,
		status
	]);
	const itemAccessors = (0, import_react.useMemo)(() => ({
		getItemId,
		getItemLabel
	}), [getItemId, getItemLabel]);
	const meta = (0, import_react.useMemo)(() => ({
		variant,
		getItemId,
		getItemLabel,
		groups: viewGroups.map((group) => group.group),
		sections: viewSections.map((section) => section.section),
		getSectionHeaderAction,
		getGroupHeaderAction,
		getGroupHeaderContextMenu,
		getGroupHeaderLeadingAction,
		getGroupHeaderIcon,
		isGroupHeaderIconVisible,
		getGroupHeaderClassName,
		getGroupHeaderTooltip,
		getGroupHeaderClickBehavior,
		onEmptyGroupHeaderClick,
		sortOptions,
		filterOptions,
		estimateItemSize,
		defaultGroupVisibleCount,
		groupLoadStep,
		groupShowMoreLabel,
		groupCollapseLabel,
		revealRequest,
		dragCapabilities: {
			groups: false,
			items: true,
			itemSameGroup: true,
			itemCrossGroup: false,
			...dragCapabilities
		},
		canDragGroup,
		canDragItem,
		canDropGroup,
		canDropItem
	}), [
		canDragGroup,
		canDragItem,
		canDropGroup,
		canDropItem,
		defaultGroupVisibleCount,
		dragCapabilities,
		estimateItemSize,
		filterOptions,
		getSectionHeaderAction,
		getGroupHeaderAction,
		getGroupHeaderClassName,
		getGroupHeaderClickBehavior,
		getGroupHeaderContextMenu,
		getGroupHeaderIcon,
		getGroupHeaderLeadingAction,
		getGroupHeaderTooltip,
		isGroupHeaderIconVisible,
		getItemId,
		getItemLabel,
		groupCollapseLabel,
		groupLoadStep,
		groupShowMoreLabel,
		onEmptyGroupHeaderClick,
		revealRequest,
		sortOptions,
		variant,
		viewGroups,
		viewSections
	]);
	const view = (0, import_react.useMemo)(() => ({
		items: viewItems,
		visibleItems,
		groups: viewGroups,
		sections: viewSections
	}), [
		viewGroups,
		viewItems,
		viewSections,
		visibleItems
	]);
	const legacyState = (0, import_react.useMemo)(() => ({
		...state,
		collapsedGroups: [...viewSections.filter((section) => section.collapsed).map((section) => section.section.id), ...viewGroups.filter((group) => group.collapsed).map((group) => group.group.id)],
		selectedId: effectiveSelectedId,
		status
	}), [
		effectiveSelectedId,
		state,
		status,
		viewGroups,
		viewSections
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListUiStoreContext, {
		value: uiStore,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListActionsContext, {
			value: actions,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListItemAccessorsContext, {
				value: itemAccessors,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListMetaContext, {
					value: meta,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListSourceItemsContext, {
						value: items,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListViewContext, {
							value: view,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListControlsContext, {
								value: controlsState,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListContext, {
									value: (0, import_react.useMemo)(() => ({
										state: legacyState,
										actions,
										meta,
										sourceItems: items,
										view
									}), [
										actions,
										items,
										legacyState,
										meta,
										view
									]),
									children
								})
							})
						})
					})
				})
			})
		})
	});
}
var SCROLLBAR_AUTO_HIDE_DELAY = 1200;
var SCROLLBAR_FADE_STEP = 140;
var ITEM_ROW_CLASS = `flex w-full items-center py-[2px] ${RESOURCE_LIST_ROW_HEIGHT_CLASS}`;
function assignRef(ref, value) {
	if (!ref) return;
	if (typeof ref === "function") {
		ref(value);
		return;
	}
	ref.current = value;
}
var SCROLLBAR_THUMB_CLASS_BY_STAGE = {
	active: "[&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,var(--scrollbar-thumb)_0%,var(--scrollbar-thumb)_45%,color-mix(in_srgb,var(--scrollbar-thumb)_55%,transparent)_72%,transparent_100%)]",
	"fade-1": "[&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--scrollbar-thumb)_70%,transparent)_0%,color-mix(in_srgb,var(--scrollbar-thumb)_70%,transparent)_45%,color-mix(in_srgb,var(--scrollbar-thumb)_35%,transparent)_72%,transparent_100%)]",
	"fade-2": "[&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--scrollbar-thumb)_40%,transparent)_0%,color-mix(in_srgb,var(--scrollbar-thumb)_40%,transparent)_45%,color-mix(in_srgb,var(--scrollbar-thumb)_20%,transparent)_72%,transparent_100%)]",
	"fade-3": "[&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--scrollbar-thumb)_16%,transparent)_0%,color-mix(in_srgb,var(--scrollbar-thumb)_16%,transparent)_45%,color-mix(in_srgb,var(--scrollbar-thumb)_8%,transparent)_72%,transparent_100%)]",
	idle: "[&::-webkit-scrollbar-thumb]:bg-[linear-gradient(180deg,transparent_0%,transparent_50%,transparent_100%)]"
};
var SCROLLBAR_COLOR_BY_STAGE = {
	active: "var(--scrollbar-thumb) transparent",
	"fade-1": "color-mix(in srgb, var(--scrollbar-thumb) 70%, transparent) transparent",
	"fade-2": "color-mix(in srgb, var(--scrollbar-thumb) 40%, transparent) transparent",
	"fade-3": "color-mix(in srgb, var(--scrollbar-thumb) 16%, transparent) transparent",
	idle: "transparent transparent"
};
var estimateResourceListChromeSize = () => 38;
function toSectionVirtualGroup(section) {
	return {
		...section,
		__resourceListKind: "section"
	};
}
function isSectionVirtualGroup(group) {
	return group.__resourceListKind === "section";
}
function useAutoHideScrollbar(delay = SCROLLBAR_AUTO_HIDE_DELAY) {
	const [stage, setStage] = (0, import_react.useState)("idle");
	const timeoutRefs = (0, import_react.useRef)([]);
	const clearScrollingTimeout = (0, import_react.useCallback)(() => {
		timeoutRefs.current.forEach(clearTimeout);
		timeoutRefs.current = [];
	}, []);
	const handleScroll = (0, import_react.useCallback)(() => {
		clearScrollingTimeout();
		setStage("active");
		timeoutRefs.current = [
			setTimeout(() => setStage("fade-1"), delay),
			setTimeout(() => setStage("fade-2"), delay + SCROLLBAR_FADE_STEP),
			setTimeout(() => setStage("fade-3"), delay + SCROLLBAR_FADE_STEP * 2),
			setTimeout(() => setStage("idle"), delay + SCROLLBAR_FADE_STEP * 3)
		];
	}, [clearScrollingTimeout, delay]);
	(0, import_react.useEffect)(() => clearScrollingTimeout, [clearScrollingTimeout]);
	return {
		stage,
		handleScroll
	};
}
function getListViewportClassName(stage, className) {
	return cn("-mr-2 min-h-0 flex-1 overflow-auto py-1.5 pt-0.5! pr-2 [scrollbar-gutter:stable]", "[&::-webkit-scrollbar-thumb:hover]:bg-[var(--scrollbar-thumb-hover)]", "[&::-webkit-scrollbar-thumb]:transition-[background] [&::-webkit-scrollbar-thumb]:duration-150 [&::-webkit-scrollbar-thumb]:ease-out", SCROLLBAR_THUMB_CLASS_BY_STAGE[stage], className);
}
function VirtualItemRow({ children, groupHeaderIconVisible }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.virtual-item-row",
		"data-resource-list-group-header-icon-visible": groupHeaderIconVisible,
		"data-resource-list-item-row": "true",
		className: cn(ITEM_ROW_CLASS, !groupHeaderIconVisible && "[&_[role=option]]:!px-2.5 [&_[data-resource-list-leading-slot=true]]:hidden"),
		children
	});
}
function buildVirtualGroups(view) {
	const groups = [];
	let itemIndex = 0;
	const appendGroup = (group) => {
		const items = [];
		for (const item of group.items) {
			items.push({
				group: group.group,
				groupCollapsed: group.collapsed,
				item,
				itemIndex
			});
			itemIndex += 1;
		}
		groups.push({
			group: group.group,
			header: group.group.label ? {
				type: "group",
				group: group.group
			} : void 0,
			items,
			footer: group.hasMore || group.canCollapseToDefault ? {
				group: group.group,
				groupCollapsed: group.collapsed,
				groupId: group.group.id
			} : void 0
		});
	};
	if (view.sections.length > 0) {
		const showSectionHeaders = view.sections.length > 1;
		for (const section of view.sections) {
			if (showSectionHeaders) {
				groups.push({
					group: toSectionVirtualGroup(section.section),
					header: {
						type: "section",
						section: section.section
					},
					items: []
				});
				if (section.collapsed) continue;
			}
			for (const group of section.groups) appendGroup(group);
		}
		return groups;
	}
	for (const group of view.groups) appendGroup(group);
	return groups;
}
function getResourceListVirtualRowKey(row, getItemId) {
	if (row.type === "group-header") return `group-header:${row.group.id}`;
	if (row.type === "group-footer") return `group-footer:${row.group.id}`;
	return `item:${getItemId(row.item.item)}`;
}
function getRevealRowIndex(groups, itemId, getItemId) {
	return buildGroupedVirtualRows(groups, true, true).findIndex((row) => row.type === "item" && getItemId(row.item.item) === itemId);
}
function getVirtualItems(groups) {
	return groups.flatMap((group) => group.items);
}
function getVirtualItemIndex(items, itemId, getItemId) {
	if (!itemId) return -1;
	return items.findIndex((item) => getItemId(item.item) === itemId);
}
function getVirtualRowIndex(rows, itemId, getItemId) {
	return rows.findIndex((row) => row.type === "item" && getItemId(row.item.item) === itemId);
}
function clampVirtualItemIndex(index, itemCount) {
	return Math.min(itemCount - 1, Math.max(0, index));
}
function useResourceListListboxNavigation({ getItemId, groups, listboxRef, virtualListRef, virtualRows }) {
	const actions = useResourceListActions();
	const store = useResourceListUiStore();
	const virtualItems = (0, import_react.useMemo)(() => getVirtualItems(groups), [groups]);
	const getCurrentVirtualItemIndex = (0, import_react.useCallback)(() => {
		const { activeId, selectedId } = store.getListboxSnapshot();
		const activeIndex = getVirtualItemIndex(virtualItems, activeId, getItemId);
		if (activeIndex >= 0) return activeIndex;
		return getVirtualItemIndex(virtualItems, selectedId, getItemId);
	}, [
		getItemId,
		store,
		virtualItems
	]);
	const getActiveItemId = (0, import_react.useCallback)(() => {
		const currentIndex = getCurrentVirtualItemIndex();
		const activeItem = currentIndex >= 0 ? virtualItems[currentIndex] : void 0;
		return activeItem ? getItemId(activeItem.item) : null;
	}, [
		getCurrentVirtualItemIndex,
		getItemId,
		virtualItems
	]);
	const syncActiveDescendant = (0, import_react.useCallback)(() => {
		const activeId = getActiveItemId();
		const scrollElement = listboxRef.current;
		if (activeId) scrollElement?.setAttribute("aria-activedescendant", getResourceListOptionDomId(activeId));
		else scrollElement?.removeAttribute("aria-activedescendant");
		if (store.getListboxSnapshot().activeId !== activeId) actions.setActiveItem(activeId);
	}, [
		actions,
		getActiveItemId,
		listboxRef,
		store
	]);
	(0, import_react.useLayoutEffect)(() => {
		syncActiveDescendant();
	}, [syncActiveDescendant]);
	(0, import_react.useEffect)(() => store.subscribeListbox(syncActiveDescendant), [store, syncActiveDescendant]);
	const scrollItemIntoView = (0, import_react.useCallback)((itemId) => {
		const rowIndex = getVirtualRowIndex(virtualRows, itemId, getItemId);
		if (rowIndex >= 0) virtualListRef.current?.scrollToIndex(rowIndex, { align: "auto" });
	}, [
		getItemId,
		virtualListRef,
		virtualRows
	]);
	const moveActiveItem = (0, import_react.useCallback)((nextIndex) => {
		const item = virtualItems[clampVirtualItemIndex(nextIndex, virtualItems.length)];
		if (!item) return;
		const itemId = getItemId(item.item);
		actions.setActiveItem(itemId);
		scrollItemIntoView(itemId);
	}, [
		actions,
		getItemId,
		scrollItemIntoView,
		virtualItems
	]);
	return { handleListboxKeyDown: (0, import_react.useCallback)((event) => {
		if (event.defaultPrevented || event.target !== event.currentTarget || event.nativeEvent.isComposing) return;
		if (virtualItems.length === 0) return;
		const currentIndex = getCurrentVirtualItemIndex();
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				moveActiveItem(currentIndex < 0 ? 0 : currentIndex + 1);
				return;
			case "ArrowUp":
				event.preventDefault();
				moveActiveItem(currentIndex < 0 ? virtualItems.length - 1 : currentIndex - 1);
				return;
			case "Home":
				event.preventDefault();
				moveActiveItem(0);
				return;
			case "End":
				event.preventDefault();
				moveActiveItem(virtualItems.length - 1);
				return;
			case "Enter":
			case " ":
			case "Spacebar":
				const activeId = getActiveItemId();
				if (!activeId) return;
				event.preventDefault();
				actions.selectItem(activeId);
		}
	}, [
		actions,
		getActiveItemId,
		getCurrentVirtualItemIndex,
		moveActiveItem,
		virtualItems.length
	]) };
}
function useRevealRequestScroll(getItemId, groups, revealRequest, virtualListRef) {
	const scrolledRequestRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!revealRequest) return;
		const requestKey = `${revealRequest.requestId}:${revealRequest.itemId}`;
		if (scrolledRequestRef.current === requestKey) return;
		const rowIndex = getRevealRowIndex(groups, revealRequest.itemId, getItemId);
		if (rowIndex < 0) return;
		scrolledRequestRef.current = requestKey;
		virtualListRef.current?.scrollToIndex(rowIndex, { align: "center" });
	}, [
		getItemId,
		groups,
		revealRequest,
		virtualListRef
	]);
}
function hasGroupHeaderIcon(meta, virtualItem) {
	if (!virtualItem.group.label) return true;
	return getGroupHeaderIconVisible(meta, virtualItem.group, virtualItem.groupCollapsed);
}
function getGroupHeaderIconVisible(meta, group, collapsed) {
	if (meta.isGroupHeaderIconVisible) return meta.isGroupHeaderIconVisible(group, { collapsed });
	return meta.getGroupHeaderIcon?.(group, { collapsed }) != null;
}
function useResourceListRenderContext() {
	const actions = useResourceListActions();
	const controls = useResourceListControlsState();
	const meta = useResourceListMeta();
	const sourceItems = useResourceListSourceItems();
	const store = useResourceListUiStore();
	const view = useResourceListView();
	return (0, import_react.useMemo)(() => {
		return {
			actions,
			meta,
			sourceItems,
			state: {
				filters: controls.filters,
				query: controls.query,
				sort: controls.sort,
				status: controls.status,
				get activeId() {
					return store.getUiSnapshot().activeId;
				},
				get collapsedGroups() {
					return [...view.sections.filter((section) => section.collapsed).map((section) => section.section.id), ...view.groups.filter((group) => group.collapsed).map((group) => group.group.id)];
				},
				get draggingId() {
					return store.getUiSnapshot().draggingId;
				},
				get groupVisibleCounts() {
					return Object.fromEntries(view.groups.map((group) => [group.group.id, group.visibleCount]));
				},
				get renamingId() {
					return store.getUiSnapshot().renamingId;
				},
				get revealFocus() {
					return store.getUiSnapshot().revealFocus;
				},
				get selectedId() {
					return store.getUiSnapshot().selectedId;
				}
			},
			view
		};
	}, [
		actions,
		controls,
		meta,
		sourceItems,
		store,
		view
	]);
}
function VirtualItems({ className, ref, ariaLabel, renderItem }) {
	const meta = useResourceListMeta();
	const { estimateItemSize, getItemId, revealRequest } = meta;
	const view = useResourceListView();
	const renderContext = useResourceListRenderContext();
	const groups = (0, import_react.useMemo)(() => buildVirtualGroups(view), [view]);
	const virtualRows = (0, import_react.useMemo)(() => buildGroupedVirtualRows(groups, true, true), [groups]);
	const virtualListRef = (0, import_react.useRef)(null);
	const listboxRef = (0, import_react.useRef)(null);
	const { stage, handleScroll } = useAutoHideScrollbar();
	const { handleListboxKeyDown } = useResourceListListboxNavigation({
		getItemId,
		groups,
		listboxRef,
		virtualListRef,
		virtualRows
	});
	const isScrolling = stage !== "idle";
	const estimateVirtualItemSize = (0, import_react.useCallback)((virtualItem) => estimateItemSize(virtualItem.itemIndex), [estimateItemSize]);
	const renderGroupHeader = (0, import_react.useCallback)((header) => {
		return header.type === "section" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { section: header.section }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupHeader, { group: header.group });
	}, []);
	const renderVirtualItem = (0, import_react.useCallback)((virtualItem) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualItemRow, {
		groupHeaderIconVisible: hasGroupHeaderIcon(meta, virtualItem),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full",
			children: renderItem(virtualItem.item, renderContext)
		})
	}), [
		meta,
		renderContext,
		renderItem
	]);
	const renderGroupFooter = (0, import_react.useCallback)((footer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.virtual-items",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupShowMore, {
			groupId: footer.groupId,
			className: !getGroupHeaderIconVisible(meta, footer.group, footer.groupCollapsed) ? "pl-2.5" : void 0
		})
	}), [meta]);
	const getVirtualRowKey = (0, import_react.useCallback)((index) => {
		const row = virtualRows[index];
		return row ? getResourceListVirtualRowKey(row, getItemId) : index;
	}, [getItemId, virtualRows]);
	const setScrollElementRef = (0, import_react.useCallback)((node) => {
		listboxRef.current = node;
		assignRef(ref, node);
	}, [ref]);
	useRevealRequestScroll(getItemId, groups, revealRequest, virtualListRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListGroupHeaderContextMenuOwner, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupedVirtualList_default, {
		ref: virtualListRef,
		scrollElementRef: setScrollElementRef,
		role: "listbox",
		groups,
		className: getListViewportClassName(stage, className),
		scrollerProps: {
			"data-scrolling": isScrolling ? "true" : "false",
			"aria-label": ariaLabel,
			onKeyDown: handleListboxKeyDown,
			tabIndex: 0
		},
		scrollerStyle: { scrollbarColor: SCROLLBAR_COLOR_BY_STAGE[stage] },
		getItemKey: getVirtualRowKey,
		onScroll: handleScroll,
		overscan: 6,
		estimateGroupHeaderSize: estimateResourceListChromeSize,
		estimateItemSize: estimateVirtualItemSize,
		estimateGroupFooterSize: estimateResourceListChromeSize,
		renderGroupHeader,
		renderItem: renderVirtualItem,
		renderGroupFooter
	}) });
}
function VirtualDraggableItems({ className, ref, ariaLabel, renderItem }) {
	const actions = useResourceListActions();
	const meta = useResourceListMeta();
	const { canDragGroup: canDragGroupMeta, canDragItem: canDragItemMeta, canDropGroup: canDropGroupMeta, canDropItem: canDropItemMeta, dragCapabilities, estimateItemSize, getItemId, revealRequest } = meta;
	const view = useResourceListView();
	const renderContext = useResourceListRenderContext();
	const groups = (0, import_react.useMemo)(() => buildVirtualGroups(view), [view]);
	const virtualRows = (0, import_react.useMemo)(() => buildGroupedVirtualRows(groups, true, true), [groups]);
	const virtualListRef = (0, import_react.useRef)(null);
	const listboxRef = (0, import_react.useRef)(null);
	const { stage, handleScroll } = useAutoHideScrollbar();
	const { handleListboxKeyDown } = useResourceListListboxNavigation({
		getItemId,
		groups,
		listboxRef,
		virtualListRef,
		virtualRows
	});
	const isScrolling = stage !== "idle";
	const getGroupId = (0, import_react.useCallback)((group) => group.id, []);
	const getVirtualItemId = (0, import_react.useCallback)((virtualItem) => getItemId(virtualItem.item), [getItemId]);
	const estimateVirtualItemSize = (0, import_react.useCallback)((virtualItem) => estimateItemSize(virtualItem.itemIndex), [estimateItemSize]);
	const handleGroupedDragEnd = (0, import_react.useCallback)((payload) => {
		if (payload.type === "group") {
			actions.reorder({
				type: "group",
				activeGroupId: String(payload.activeGroupId),
				overGroupId: String(payload.overGroupId),
				overType: payload.overType,
				sourceIndex: payload.sourceIndex,
				targetIndex: payload.targetIndex
			});
			return;
		}
		if (payload.overType === "item" && payload.activeId === payload.overId) return;
		actions.reorder({
			type: "item",
			activeId: String(payload.activeId),
			overId: String(payload.overId),
			position: payload.position,
			overType: payload.overType,
			sourceGroupId: String(payload.sourceGroupId),
			targetGroupId: String(payload.targetGroupId),
			sourceIndex: payload.sourceIndex,
			targetIndex: payload.targetIndex
		});
	}, [actions]);
	const canDragGroup = (0, import_react.useCallback)((group, groupIndex) => !isSectionVirtualGroup(group) && (canDragGroupMeta?.(group, groupIndex) ?? true), [canDragGroupMeta]);
	const canDragVirtualItem = (0, import_react.useCallback)((virtualItem, _itemIndex, group, groupIndex, itemIndexInGroup) => canDragItemMeta?.({
		item: virtualItem.item,
		itemIndex: virtualItem.itemIndex,
		group,
		groupIndex,
		itemIndexInGroup
	}) ?? true, [canDragItemMeta]);
	const canDropGroup = (0, import_react.useCallback)((payload) => {
		if (isSectionVirtualGroup(payload.activeGroup) || isSectionVirtualGroup(payload.overGroup)) return false;
		return canDropGroupMeta?.({
			activeGroupId: String(payload.activeGroupId),
			overGroupId: String(payload.overGroupId),
			overType: payload.overType,
			sourceIndex: payload.sourceIndex ?? -1,
			targetIndex: payload.targetIndex ?? -1
		}) ?? true;
	}, [canDropGroupMeta]);
	const canDropVirtualItem = (0, import_react.useCallback)((payload) => {
		if (isSectionVirtualGroup(payload.sourceGroup) || isSectionVirtualGroup(payload.overGroup)) return false;
		return canDropItemMeta?.({
			activeId: String(payload.activeId),
			activeItem: payload.activeItem.item,
			overId: String(payload.overId),
			overItem: payload.overItem?.item,
			overType: payload.overType,
			sourceGroup: payload.sourceGroup,
			sourceGroupId: String(payload.sourceGroupId),
			sourceIndex: payload.sourceIndex,
			targetGroup: payload.overGroup,
			targetGroupId: String(payload.overGroupId),
			targetIndex: payload.targetIndex
		}) ?? true;
	}, [canDropItemMeta]);
	const renderGroupHeader = (0, import_react.useCallback)((header) => {
		return header.type === "section" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { section: header.section }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupHeader, { group: header.group });
	}, []);
	const renderVirtualItem = (0, import_react.useCallback)((virtualItem) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualItemRow, {
		groupHeaderIconVisible: hasGroupHeaderIcon(meta, virtualItem),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full",
			children: renderItem(virtualItem.item, renderContext)
		})
	}), [
		meta,
		renderContext,
		renderItem
	]);
	const renderGroupFooter = (0, import_react.useCallback)((footer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.virtual-draggable-items",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupShowMore, {
			groupId: footer.groupId,
			className: !getGroupHeaderIconVisible(meta, footer.group, footer.groupCollapsed) ? "pl-2.5" : void 0
		})
	}), [meta]);
	const getVirtualRowKey = (0, import_react.useCallback)((index) => {
		const row = virtualRows[index];
		return row ? getResourceListVirtualRowKey(row, getItemId) : index;
	}, [getItemId, virtualRows]);
	const setScrollElementRef = (0, import_react.useCallback)((node) => {
		listboxRef.current = node;
		assignRef(ref, node);
	}, [ref]);
	useRevealRequestScroll(getItemId, groups, revealRequest, virtualListRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListGroupHeaderContextMenuOwner, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupedSortableVirtualList_default, {
		ref: virtualListRef,
		scrollElementRef: setScrollElementRef,
		role: "listbox",
		groups,
		className: getListViewportClassName(stage, className),
		scrollerProps: {
			"data-scrolling": isScrolling ? "true" : "false",
			"aria-label": ariaLabel,
			onKeyDown: handleListboxKeyDown,
			tabIndex: 0
		},
		scrollerStyle: { scrollbarColor: SCROLLBAR_COLOR_BY_STAGE[stage] },
		getItemKey: getVirtualRowKey,
		onScroll: handleScroll,
		overscan: 6,
		getGroupId,
		getItemId: getVirtualItemId,
		dragCapabilities,
		estimateGroupHeaderSize: estimateResourceListChromeSize,
		estimateItemSize: estimateVirtualItemSize,
		estimateGroupFooterSize: estimateResourceListChromeSize,
		canDragGroup,
		canDragItem: canDragVirtualItem,
		canDropGroup,
		canDropItem: canDropVirtualItem,
		onDragEnd: handleGroupedDragEnd,
		renderGroupHeader,
		renderItem: renderVirtualItem,
		renderGroupFooter
	}) });
}
function Frame({ className, ref, ...props }) {
	const meta = useResourceListMeta();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.frame",
		ref,
		"data-resource-list-variant": meta.variant,
		className: cn("flex min-h-0 flex-1 flex-col overflow-hidden border-border border-r-[0.5px] p-1.5 text-sidebar-foreground", className),
		...mergeUiProps(props, "chat.frame")
	});
}
function Search$1({ className, icon, wrapperClassName, ref, ...props }) {
	const actions = useResourceListActions();
	const state = useResourceListControlsState();
	const searchIcon = icon === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 12 }) : icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.search",
		className: wrapperClassName,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [searchIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 flex text-foreground-tertiary",
				children: searchIcon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				ref,
				value: state.query,
				onChange: (event) => actions.setQuery(event.target.value),
				className: cn("h-7 rounded-full border border-sidebar-border bg-sidebar pr-2 text-[10px] text-sidebar-foreground shadow-none transition-colors md:text-[10px]", "placeholder:text-[10px] placeholder:text-muted-foreground focus-visible:border-sidebar-ring focus-visible:ring-0", searchIcon ? "pl-6" : "pl-2", className),
				...props
			})]
		})
	});
}
function Header({ actions, children, className, count, icon, ref, title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.header",
		ref,
		className: cn("flex shrink-0 flex-col gap-2.5", className),
		...mergeUiProps(props, "chat.header"),
		children: [(title || actions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-5 items-center gap-1.5",
			children: [
				icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-3.5 shrink-0 items-center justify-center text-foreground-tertiary",
					children: icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-baseline gap-1",
					children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-medium text-[12px] text-muted-foreground leading-4",
						children: title
					}), count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 font-medium text-[12px] text-foreground-tertiary tabular-nums leading-4",
						children: count
					})]
				}),
				actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 items-center gap-1.5 text-muted-foreground",
					children: actions
				})
			]
		}), children]
	});
}
function HeaderItem({ actions, className, command, icon, label, ref, variant = "ghost", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.header-item",
		className: "flex min-h-8 items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			ref,
			variant,
			className: cn("group min-h-8 min-w-0 justify-start gap-1.5 rounded-lg py-1 text-sm shadow-none outline-none transition-all duration-150 hover:bg-accent/60 focus-visible:bg-accent/60 [&_svg]:size-4 [&_svg]:shrink-0", icon ? "px-1.5" : "px-2.5", command ? "w-full shrink" : "flex-1", className),
			...props,
			children: [
				icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemLeadingSlot, { children: icon }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate text-left font-medium text-[13px] text-muted-foreground leading-5 group-hover:text-foreground group-focus-visible:text-foreground",
					children: label
				}),
				command && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandHint, { command })
			]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 items-center gap-1 text-muted-foreground",
			children: actions
		})]
	});
}
function HeaderActionButton({ className, ref, size = "icon-navbar", variant = "ghost", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		size,
		variant,
		className: cn("text-muted-foreground! leading-none hover:bg-muted hover:text-foreground! data-[state=open]:bg-muted data-[state=open]:text-foreground! [&_.lucide:not(.lucide-custom)]:text-current! [&_svg]:block [&_svg]:size-4!", className),
		...props
	});
}
function GroupHeaderActionButton({ className, ref, size = null, variant = "ghost", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		size,
		variant,
		className: cn("inline-flex size-6 min-h-6 min-w-6 shrink-0 items-center justify-center gap-0 rounded-md p-0 text-muted-foreground! leading-none shadow-none hover:bg-muted hover:text-foreground! data-[state=open]:bg-muted data-[state=open]:text-foreground! [&_.lucide:not(.lucide-custom)]:text-current! [&_svg]:block [&_svg]:size-3! [&_svg]:shrink-0", className),
		...props
	});
}
function SectionToggleMenuItem({ collapseIcon, collapseLabel, disabled, expandIcon, expandLabel, onClick, sectionIds, ...props }) {
	const actions = useResourceListActions();
	const view = useResourceListView();
	const sectionIdSet = new Set(sectionIds);
	const sections = view.sections.filter((candidate) => sectionIdSet.has(candidate.section.id));
	const groups = sections.flatMap((section) => section.groups);
	const groupIds = groups.map((group) => group.group.id);
	const expandGroupIds = [...sections.map((section) => section.section.id), ...groupIds];
	const expandedGroupIds = groups.filter((group) => !group.collapsed).map((group) => group.group.id);
	const hasExpandedGroup = expandedGroupIds.length > 0;
	const isDisabled = disabled || groupIds.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
		icon: hasExpandedGroup ? collapseIcon : expandIcon,
		label: hasExpandedGroup ? collapseLabel : expandLabel,
		disabled: isDisabled,
		onClick: (event) => {
			onClick?.(event);
			if (event.defaultPrevented || isDisabled) return;
			if (hasExpandedGroup) actions.collapseGroups(expandedGroupIds);
			else actions.expandGroups(expandGroupIds);
		},
		...props
	});
}
function SectionCollapseActionButton({ alwaysVisible, disabled, label, onClick, sectionId, type = "button", ...props }) {
	const actions = useResourceListActions();
	const groupIds = useResourceListView().sections.find((candidate) => candidate.section.id === sectionId)?.groups.filter((group) => !group.collapsed).map((group) => group.group.id) ?? [];
	const isDisabled = disabled || groupIds.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		title: label,
		delay: 500,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupHeaderActionButton, {
			type,
			"aria-label": props["aria-label"] ?? label,
			disabled: isDisabled,
			onClick: (event) => {
				event.stopPropagation();
				onClick?.(event);
				if (event.defaultPrevented || isDisabled) return;
				actions.collapseGroups(groupIds);
			},
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareMinus, { className: "block" })
		})
	});
}
function FilterBar({ className, ref, ...props }) {
	const actions = useResourceListActions();
	const meta = useResourceListMeta();
	const state = useResourceListControlsState();
	if (meta.filterOptions.length === 0 && meta.sortOptions.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "chat.filter-bar",
		ref,
		className: cn("flex flex-wrap items-center gap-1.5 p-2", className),
		...mergeUiProps(props, "chat.filter-bar"),
		children: [meta.filterOptions.map((option) => {
			const active = state.filters.includes(option.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: active ? "secondary" : "ghost",
				"data-active": active || void 0,
				onClick: () => actions.toggleFilter(option.id),
				children: option.label
			}, option.id);
		}), meta.sortOptions.map((option) => {
			const active = state.sort === option.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: active ? "secondary" : "ghost",
				"data-active": active || void 0,
				onClick: () => actions.setSort(active ? null : option.id),
				children: option.label
			}, option.id);
		})]
	});
}
function Item({ item, className, ref, id: elementId, onClick, onKeyDown, onMouseEnter, onMouseLeave, tabIndex, tooltip, ...props }) {
	const actions = useResourceListActions();
	const { getItemId } = useResourceListItemAccessors();
	const id = getItemId(item);
	const rowState = useResourceListRowState(id);
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.item.option",
		ref,
		id: elementId ?? getResourceListOptionDomId(id),
		role: "option",
		"aria-selected": rowState.selected,
		"data-active-descendant": rowState.active || void 0,
		"data-selected": rowState.selected || void 0,
		"data-reveal-focus": rowState.revealFocused || void 0,
		"data-dragging": rowState.dragging || void 0,
		tabIndex: tabIndex ?? -1,
		className: cn("group relative flex w-full cursor-pointer items-center gap-1.5 px-2.5 text-[13px] text-foreground outline-none transition-all duration-150 has-[[data-resource-list-leading-slot=true]]:px-1.5", RESOURCE_LIST_VISUAL_ROW_CLASS, RESOURCE_LIST_INTERACTIVE_ROW_CLASS, rowState.active && !rowState.selected && "bg-sidebar-accent text-sidebar-foreground", rowState.selected && "bg-sidebar-accent text-sidebar-foreground shadow-none", rowState.revealFocused && "animation-resource-list-reveal-focus", className),
		onClick: (event) => {
			actions.selectItem(id);
			onClick?.(event);
		},
		onKeyDown: (event) => {
			onKeyDown?.(event);
			if (event.defaultPrevented || event.target !== event.currentTarget) return;
			if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
				event.preventDefault();
				event.currentTarget.click();
			}
		},
		onMouseEnter: (event) => {
			onMouseEnter?.(event);
		},
		onMouseLeave: (event) => {
			onMouseLeave?.(event);
		},
		...mergeUiProps(props, "chat.item.option")
	});
	if (!tooltip) return content;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: tooltip,
		placement: "right",
		sideOffset: 4,
		delay: 500,
		fullWidthTrigger: true,
		children: content
	});
}
function RenameField({ item, className, ref, onPointerDown, ...props }) {
	const actions = useResourceListActions();
	const { getItemId, getItemLabel } = useResourceListItemAccessors();
	const id = getItemId(item);
	const rowState = useResourceListRowState(id);
	const didCommitRef = (0, import_react.useRef)(false);
	const setInputRef = (0, import_react.useCallback)((node) => {
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	(0, import_react.useEffect)(() => {
		if (!rowState.renaming) didCommitRef.current = false;
	}, [rowState.renaming]);
	const commitRename = (name) => {
		if (didCommitRef.current) return;
		didCommitRef.current = true;
		actions.commitRename(id, name);
	};
	if (!rowState.renaming) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		ref: setInputRef,
		defaultValue: getItemLabel(item),
		className: cn("h-6 flex-1 border-none bg-transparent px-0 text-[13px] text-foreground shadow-none focus-visible:ring-0", className),
		onBlur: (event) => commitRename(event.currentTarget.value),
		onPointerDown: (event) => {
			onPointerDown?.(event);
			event.stopPropagation();
		},
		onKeyDown: (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				event.stopPropagation();
				commitRename(event.currentTarget.value);
			}
			if (event.key === " " || event.key === "Spacebar") event.stopPropagation();
			if (event.key === "Escape") {
				event.preventDefault();
				event.stopPropagation();
				didCommitRef.current = true;
				actions.cancelRename();
			}
		},
		...props
	});
}
function ItemTitle({ className, ref, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "chat.item-title",
		ref,
		className: cn("min-w-0 flex-1 truncate text-left font-normal text-[13px] text-muted-foreground leading-5 group-hover:text-foreground group-focus-visible:text-foreground group-data-[selected=true]:font-medium group-data-[selected=true]:text-foreground", className),
		...mergeUiProps(props, "chat.item-title")
	});
}
function ItemLeadingSlot(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListLeadingSlot, {
		variant: "item",
		...props
	});
}
function ItemAction({ className, ref, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-ui": "chat.item-action",
		ref,
		type,
		className: cn("pointer-events-none flex size-5 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all duration-150 [&_svg]:size-3.5 [&_svg]:shrink-0", "hover:bg-accent hover:text-foreground", "focus-visible:pointer-events-auto focus-visible:bg-sidebar-accent focus-visible:opacity-100 focus-visible:outline-none", "group-hover:pointer-events-auto group-hover:opacity-100 data-[deleting=true]:pointer-events-auto data-[deleting=true]:opacity-100", className),
		...mergeUiProps(props, "chat.item-action")
	});
}
function ItemActions({ active, className, ref, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.item-actions",
		ref,
		"data-active": active || void 0,
		"data-resource-list-item-actions": "true",
		className: cn("-translate-y-1/2 pointer-events-none absolute top-1/2 right-1.5 flex items-center gap-0 opacity-0 transition-opacity duration-150", "focus-within:pointer-events-auto focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 data-[active=true]:pointer-events-auto data-[active=true]:opacity-100", className),
		...mergeUiProps(props, "chat.item-actions")
	});
}
function Body({ draggable = false, emptyFallback, errorFallback, listRef, renderItem, virtualClassName, ariaLabel }) {
	const state = useResourceListControlsState();
	const view = useResourceListView();
	if (state.status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {});
	if (state.status === "error") return errorFallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {});
	if (view.items.length === 0 && view.groups.length === 0 && view.sections.length === 0) return emptyFallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState$1, {});
	if (draggable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualDraggableItems, {
		ref: listRef,
		className: virtualClassName,
		ariaLabel,
		renderItem
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualItems, {
		ref: listRef,
		className: virtualClassName,
		ariaLabel,
		renderItem
	});
}
function EmptyState$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		compact: true,
		preset: "no-resource",
		...props
	});
}
var RESOURCE_LIST_LOADING_GROUPS = [{
	id: "primary",
	headerWidth: "w-20",
	itemWidths: [
		"w-36",
		"w-28",
		"w-32"
	]
}, {
	id: "secondary",
	headerWidth: "w-16",
	itemWidths: ["w-32", "w-24"]
}];
function LoadingState({ className, ref, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.loading-state",
		ref,
		className: cn("flex flex-col px-1 py-1.5", className),
		...mergeUiProps(props, "chat.loading-state"),
		children: RESOURCE_LIST_LOADING_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-resource-list-loading-group": "true",
			className: "flex flex-col pb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-resource-list-loading-group-header": "true",
				className: cn("flex items-center gap-1.5 px-1.5 pt-2 pb-1", RESOURCE_LIST_ROW_HEIGHT_CLASS),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListLeadingSlot, {
					variant: "loading",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-ui": "part:skeleton",
						"data-slot": "skeleton",
						className: "size-5 shrink-0 rounded-md"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-ui": "part:skeleton",
					"data-slot": "skeleton",
					className: cn("h-3 rounded-sm", group.headerWidth)
				})]
			}), group.itemWidths.map((width, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-resource-list-loading-item": "true",
				className: cn("mb-1.5 flex w-full items-center gap-1.5 px-1.5 last:mb-0", RESOURCE_LIST_VISUAL_ROW_CLASS),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceListLeadingSlot, {
						variant: "loading",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
							"data-ui": "part:skeleton",
							"data-slot": "skeleton",
							className: "size-5 shrink-0 rounded-md"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-ui": "part:skeleton",
						"data-slot": "skeleton",
						className: cn("h-3 rounded-sm", width)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
						"data-ui": "part:skeleton",
						"data-slot": "skeleton",
						className: "ml-auto size-5 shrink-0 rounded-md opacity-60"
					})
				]
			}, `${group.id}-${index}`))]
		}, group.id))
	});
}
function ErrorState({ className, message, ref, children, ...props }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.error-state.alert",
		ref,
		role: "alert",
		className: cn("m-2 rounded-md border border-error-border bg-error-subtle p-3 text-error-subtle-foreground text-sm", className),
		...mergeUiProps(props, "chat.error-state.alert"),
		children: message ?? children ?? t("error.boundary.default.message")
	});
}
var ResourceList = {
	Provider: ResourceListProvider,
	Frame,
	Header,
	HeaderActionButton,
	GroupHeaderActionButton,
	SectionCollapseActionButton,
	SectionToggleMenuItem,
	HeaderItem,
	Search: Search$1,
	FilterBar,
	GroupHeader,
	GroupShowMore,
	Body,
	VirtualItems,
	VirtualDraggableItems,
	Item,
	ItemAction,
	ItemActions,
	ItemLeadingSlot,
	ItemTitle,
	RenameField,
	EmptyState: EmptyState$1,
	LoadingState,
	ErrorState
};
function ConversationResourceMenu({ items }) {
	if (!items?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "chat.conversation-resource-menu",
		className: "flex flex-col gap-1",
		"data-testid": "conversation-resource-menu",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceList.HeaderItem, {
			type: "button",
			icon: item.icon,
			label: item.label,
			"aria-label": typeof item.label === "string" ? item.label : void 0,
			"aria-current": item.active ? "page" : void 0,
			onClick: () => void item.onSelect(),
			className: cn(item.active && "bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent focus-visible:bg-sidebar-accent [&_span]:text-sidebar-foreground")
		}, item.id))
	});
}
function resolveDefaultCollapsedGroupIds({ collapsedIds, groupBy, items }) {
	if (collapsedIds !== null) return collapsedIds;
	const groupIds = /* @__PURE__ */ new Set();
	for (const item of items) {
		const group = groupBy(item);
		if (group?.label) groupIds.add(group.id);
	}
	return [...groupIds];
}
var DEFAULT_RESOLVED_ACTION_AVAILABILITY = {
	visible: true,
	enabled: true
};
function buildResourceEntityMenuActionDescriptor({ ...descriptor }) {
	return {
		...descriptor,
		surface: "menu"
	};
}
function buildResolvedResourceEntityMenuAction({ availability = DEFAULT_RESOLVED_ACTION_AVAILABILITY, children = [], danger = false, ...action }) {
	return {
		...action,
		danger,
		availability,
		children
	};
}
function buildResourceEntityIconTypeActionDescriptor(params) {
	return buildResourceEntityMenuActionDescriptor(params);
}
const DEFAULT_ASSISTANT_EMOJI = "😀";
const RESOURCE_ICON_TYPE_OPTIONS = [
	"emoji",
	"model",
	"none"
];
var RESOURCE_ICON_TYPE_LABEL_KEYS = {
	emoji: "settings.assistant.icon.type.emoji",
	model: "settings.assistant.icon.type.model",
	none: "settings.assistant.icon.type.none"
};
function buildModelAvatarModel(uniqueModelId, modelName) {
	if (!isUniqueModelId(uniqueModelId)) return void 0;
	const { providerId, modelId } = parseUniqueModelId(uniqueModelId);
	return {
		id: modelId,
		name: modelName || modelId,
		providerId
	};
}
function renderFallbackAssistantIcon(emoji) {
	return emoji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiIcon_default, {
		emoji,
		size: 24,
		fontSize: 14,
		className: "mr-0"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "chat.render-fallback-assistant-icon",
		className: "flex size-6 items-center justify-center rounded-full bg-sidebar-accent",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 14 })
	});
}
function renderAssistantEntityIcon(iconType, assistant, fallbackModelId) {
	if (iconType === "none") return void 0;
	const modelAvatarModel = buildModelAvatarModel(assistant.modelId ?? fallbackModelId, assistant.modelName);
	if (iconType === "model" && modelAvatarModel) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelAvatar_default, {
		model: modelAvatarModel,
		size: 24,
		className: "border border-border-subtle"
	});
	return renderFallbackAssistantIcon(assistant.emoji);
}
function renderAgentEntityIcon(iconType, agent, fallbackModelId) {
	if (iconType === "none") return void 0;
	const modelAvatarModel = buildModelAvatarModel(agent?.model ?? fallbackModelId, agent?.modelName);
	if (iconType === "model" && modelAvatarModel) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelAvatar_default, {
		model: modelAvatarModel,
		size: 24
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiIcon_default, {
		emoji: getAgentAvatarFromConfiguration(agent?.configuration) || "😀",
		size: 24,
		fontSize: 14,
		className: "mr-0"
	});
}
function buildResolvedIconTypeActions(parentActionId, currentIconType, t) {
	return RESOURCE_ICON_TYPE_OPTIONS.map((type) => ({
		id: `${parentActionId}.${type}`,
		label: t(RESOURCE_ICON_TYPE_LABEL_KEYS[type]),
		icon: currentIconType === type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "chat.build-resolved-icon-type",
			className: "block size-4"
		}),
		order: 0,
		danger: false,
		availability: {
			visible: true,
			enabled: true
		},
		children: []
	}));
}
function buildResolvedIconTypeMenuAction(parentActionId, label, icon, order, currentIconType, t) {
	return buildResolvedResourceEntityMenuAction({
		id: parentActionId,
		label,
		icon,
		order,
		children: buildResolvedIconTypeActions(parentActionId, currentIconType, t)
	});
}
function buildIconTypeActionDescriptors(commandPrefix) {
	return RESOURCE_ICON_TYPE_OPTIONS.map((type) => ({
		id: `${commandPrefix}.${type}`,
		commandId: `${commandPrefix}.${type}`,
		label: ({ t }) => t(RESOURCE_ICON_TYPE_LABEL_KEYS[type]),
		icon: ({ assistantIconType }) => assistantIconType === type ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-ui": "chat.build-icon-type-action",
			className: "block size-4"
		}),
		order: 0,
		surface: "menu"
	}));
}
function remapResourceListCollapsedGroupIds(collapsedIds, mapGroupId) {
	return Array.from(new Set(collapsedIds.map(mapGroupId)));
}
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
function getResourceTimeBucket(timestamp, now) {
	if (timestamp === void 0) return "earlier";
	const item = (0, import_dayjs_min.default)(timestamp);
	const current = now === void 0 ? (0, import_dayjs_min.default)() : (0, import_dayjs_min.default)(now);
	if (!item.isValid() || !current.isValid()) return "earlier";
	const itemStart = item.startOf("day");
	const todayStart = current.startOf("day");
	if (itemStart.isSame(todayStart)) return "today";
	const yesterdayStart = todayStart.subtract(1, "day");
	if (itemStart.isSame(yesterdayStart)) return "yesterday";
	const weekStart = todayStart.startOf("week");
	if (itemStart.isSame(weekStart) || itemStart.isAfter(weekStart) && itemStart.isBefore(yesterdayStart)) return "this-week";
	return "earlier";
}
function sortRankedResourceItems(items, { getRank, isPinned, compareWithinGroup }) {
	return items.map((item, index) => ({
		item,
		index,
		rank: getRank(item),
		pinned: isPinned(item)
	})).sort((a, b) => {
		if (a.rank !== b.rank) return a.rank - b.rank;
		if (a.pinned || b.pinned) return a.index - b.index;
		const withinDelta = compareWithinGroup(a.item, b.item);
		if (withinDelta !== 0) return withinDelta;
		return a.index - b.index;
	}).map(({ item }) => item);
}
function compareResourceRecency(getUpdatedAt) {
	return (a, b) => {
		const aMs = Date.parse(getUpdatedAt(a));
		const bMs = Date.parse(getUpdatedAt(b));
		if (Number.isFinite(aMs) && Number.isFinite(bMs)) return bMs - aMs;
		return 0;
	};
}
function compareResourceOrderKey(a, b) {
	if (a && b) {
		if (a < b) return -1;
		if (a > b) return 1;
	}
	return 0;
}
function buildResourceListItemDropAnchor(payload) {
	if (payload.overType === "item") return payload.position === "before" ? { before: payload.overId } : { after: payload.overId };
	return { position: "last" };
}
var SESSION_DISPLAY_OPTIONS = [
	"time",
	"workdir",
	"agent"
];
const SESSION_DISPLAY_LABEL_KEYS = {
	agent: "agent.session.display.agent",
	time: "agent.session.display.time",
	workdir: "agent.session.display.workdir"
};
var SESSION_DISPLAY_ICONS = {
	agent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 16 }),
	time: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 16 }),
	workdir: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { size: 16 })
};
function SessionListOptionsMenu({ historyRecordsActive, manageAgentsActive, mode, onChange, onManageAgents, onOpenHistoryRecords, sectionIds }) {
	const { t } = useTranslation();
	const [open, setOpen] = (0, import_react.useState)(false);
	const runAfterMenuClose = (action) => {
		setOpen(false);
		window.setTimeout(action, 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceList.HeaderActionButton, {
				type: "button",
				"aria-label": t("agent.session.display.title"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "block" })
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "end",
			side: "bottom",
			sideOffset: 4,
			className: "w-44 p-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2.5 py-1 font-medium text-muted-foreground text-xs",
					children: t("agent.session.display.title")
				}),
				SESSION_DISPLAY_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					size: "sm",
					icon: SESSION_DISPLAY_ICONS[option],
					label: t(SESSION_DISPLAY_LABEL_KEYS[option]),
					active: mode === option,
					onClick: () => {
						runAfterMenuClose(() => onChange(option));
					}
				}, option)),
				sectionIds && sectionIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceList.SectionToggleMenuItem, {
					size: "sm",
					expandIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { size: 16 }),
					collapseIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsDownUp, { size: 16 }),
					sectionIds,
					expandLabel: t("agent.session.group.expand_all"),
					collapseLabel: t("agent.session.group.collapse_all"),
					onClick: () => {
						setOpen(false);
					}
				})] }),
				onOpenHistoryRecords && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, {}),
				onOpenHistoryRecords && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					size: "sm",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 16 }),
					label: t("history.records.shortTitle"),
					active: historyRecordsActive,
					onClick: () => {
						setOpen(false);
						onOpenHistoryRecords();
					}
				}),
				onManageAgents && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, {}),
				onManageAgents && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					size: "sm",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 16 }),
					label: t("agent.manage.title"),
					active: manageAgentsActive,
					onClick: () => {
						setOpen(false);
						onManageAgents();
					}
				})
			] })
		})]
	});
}
var TOPIC_DISPLAY_OPTIONS = ["time", "assistant"];
var TOPIC_DISPLAY_LABEL_KEYS = {
	assistant: "chat.topics.display.assistant",
	time: "chat.topics.display.time"
};
var TOPIC_DISPLAY_ICONS = {
	assistant: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 16 }),
	time: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 16 })
};
function TopicListOptionsMenu({ historyRecordsActive, manageAssistantsActive, mode, onChange, onManageAssistants, onOpenHistoryRecords, sectionIds }) {
	const { t } = useTranslation();
	const [open, setOpen] = (0, import_react.useState)(false);
	const runAfterMenuClose = (action) => {
		setOpen(false);
		window.setTimeout(action, 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceList.HeaderActionButton, {
				type: "button",
				"aria-label": t("chat.topics.display.title"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "block" })
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			align: "end",
			side: "bottom",
			sideOffset: 4,
			className: "w-44 p-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2.5 py-1 font-medium text-muted-foreground text-xs",
					children: t("chat.topics.display.title")
				}),
				TOPIC_DISPLAY_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					size: "sm",
					icon: TOPIC_DISPLAY_ICONS[option],
					label: t(TOPIC_DISPLAY_LABEL_KEYS[option]),
					active: mode === option,
					onClick: () => {
						runAfterMenuClose(() => onChange(option));
					}
				}, option)),
				sectionIds && sectionIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceList.SectionToggleMenuItem, {
					size: "sm",
					expandIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { size: 16 }),
					collapseIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsDownUp, { size: 16 }),
					sectionIds,
					expandLabel: t("chat.topics.group.expand_all"),
					collapseLabel: t("chat.topics.group.collapse_all"),
					onClick: () => {
						setOpen(false);
					}
				})] }),
				onOpenHistoryRecords && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, {}),
				onOpenHistoryRecords && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					size: "sm",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 16 }),
					label: t("history.records.shortTitle"),
					active: historyRecordsActive,
					onClick: () => {
						setOpen(false);
						onOpenHistoryRecords();
					}
				}),
				onManageAssistants && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuDivider, {}),
				onManageAssistants && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
					size: "sm",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { size: 16 }),
					label: t("assistants.presets.manage.title"),
					active: manageAssistantsActive,
					onClick: () => {
						setOpen(false);
						onManageAssistants();
					}
				})
			] })
		})]
	});
}
function useResourceListPinnedState({ disabled = false, onTogglePin, pinnedIds: sourcePinnedIds }) {
	const [optimisticPinnedById, setOptimisticPinnedById] = (0, import_react.useState)({});
	const [togglingIds, setTogglingIds] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const sourcePinnedIdSet = (0, import_react.useMemo)(() => new Set(sourcePinnedIds), [sourcePinnedIds]);
	const optimisticPinnedByIdRef = (0, import_react.useRef)(optimisticPinnedById);
	const sourcePinnedIdSetRef = (0, import_react.useRef)(sourcePinnedIdSet);
	const togglingIdsRef = (0, import_react.useRef)(togglingIds);
	optimisticPinnedByIdRef.current = optimisticPinnedById;
	sourcePinnedIdSetRef.current = sourcePinnedIdSet;
	togglingIdsRef.current = togglingIds;
	(0, import_react.useEffect)(() => {
		setOptimisticPinnedById((prev) => {
			let changed = false;
			const next = { ...prev };
			for (const [id, pinned] of Object.entries(prev)) if (sourcePinnedIdSet.has(id) === pinned) {
				delete next[id];
				changed = true;
			}
			return changed ? next : prev;
		});
	}, [sourcePinnedIdSet]);
	return {
		pinnedIds: (0, import_react.useMemo)(() => {
			const ids = sourcePinnedIds.filter((id) => optimisticPinnedById[id] !== false);
			for (const [id, pinned] of Object.entries(optimisticPinnedById)) if (pinned && !sourcePinnedIdSet.has(id)) ids.push(id);
			return ids;
		}, [
			optimisticPinnedById,
			sourcePinnedIdSet,
			sourcePinnedIds
		]),
		isPinned: (0, import_react.useCallback)((id) => optimisticPinnedById[id] ?? sourcePinnedIdSet.has(id), [optimisticPinnedById, sourcePinnedIdSet]),
		togglePinned: (0, import_react.useCallback)(async (id) => {
			if (disabled || togglingIdsRef.current.has(id)) return;
			const nextPinned = !(optimisticPinnedByIdRef.current[id] ?? sourcePinnedIdSetRef.current.has(id));
			setOptimisticPinnedById((prev) => ({
				...prev,
				[id]: nextPinned
			}));
			togglingIdsRef.current = new Set(togglingIdsRef.current).add(id);
			setTogglingIds(togglingIdsRef.current);
			try {
				await onTogglePin(id);
			} catch (error) {
				setOptimisticPinnedById((prev) => {
					const next = { ...prev };
					delete next[id];
					return next;
				});
				throw error;
			} finally {
				const next = new Set(togglingIdsRef.current);
				next.delete(id);
				togglingIdsRef.current = next;
				setTogglingIds(next);
			}
		}, [disabled, onTogglePin]),
		togglingIds
	};
}
export { RESOURCE_LIST_RIGHT_PANEL_SEARCH_INPUT_CLASS as C, useResourceListItemAccessors as D, useResourceListActions as E, useResourceListRowState as O, ResourceList as S, RESOURCE_LIST_TITLE_FADE_YIELD_CLASS as T, buildResolvedResourceEntityMenuAction as _, buildResourceListItemDropAnchor as a, resolveDefaultCollapsedGroupIds as b, getResourceTimeBucket as c, RESOURCE_ICON_TYPE_OPTIONS as d, buildIconTypeActionDescriptors as f, DEFAULT_ASSISTANT_EMOJI as g, renderAssistantEntityIcon as h, SessionListOptionsMenu as i, sortRankedResourceItems as l, renderAgentEntityIcon as m, TopicListOptionsMenu as n, compareResourceOrderKey as o, buildResolvedIconTypeMenuAction as p, SESSION_DISPLAY_LABEL_KEYS as r, compareResourceRecency as s, useResourceListPinnedState as t, remapResourceListCollapsedGroupIds as u, buildResourceEntityIconTypeActionDescriptor as v, RESOURCE_LIST_TITLE_FADE_CLASS as w, ConversationResourceMenu as x, buildResourceEntityMenuActionDescriptor as y };
