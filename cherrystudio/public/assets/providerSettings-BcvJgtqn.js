import { s as __toESM } from "./chunk-DiqNceaa.js";
import { D as isEqualsSameValueZero } from "./isEqual-DO7BtJs5.js";
import { t as isArrayLike } from "./isArrayLike-qCM8LrC4.js";
import { a as isSymbol, f as toPath } from "./getSymbolsIn-BtmoyFWl.js";
import { i as isObject, r as isIndex } from "./isUndefined-CZjb9k0E.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_react_dom } from "./react-dom-CKbeLgrG.js";
import { a as mergeUiProps, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { a as X } from "./toast-DfLEw4mF.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { n as defaultRangeExtractor, t as useVirtualizer } from "./esm-D1CPXB7e.js";
import { _ as useSensors, c as DndContext, d as PointerSensor, g as useSensor, h as useDroppable, l as DragOverlay, o as useSortable, s as verticalListSortingStrategy, t as SortableContext, u as KeyboardSensor, v as CSS } from "./sortable.esm-D8gcNQZE.js";
import { S as SERVER_TOOL, i as createUniqueModelId, v as MODALITY, y as MODEL_CAPABILITY } from "./model-CfoN7z8F.js";
import { t as ArrowUpDown } from "./arrow-up-down-R1Q9LYGF.js";
import { t as Boxes } from "./boxes-DT47b11r.js";
import { t as Ear } from "./ear-C7aQYfiK.js";
import { t as Eye } from "./eye-B3h_cTL2.js";
import { t as Gift } from "./gift-BV2kGnP7.js";
import { t as Globe } from "./globe-Ds2oiCgn.js";
import { t as Lightbulb } from "./lightbulb-DhlHdQ31.js";
import { t as Video } from "./video-CLi91f1t.js";
import { t as Wrench } from "./wrench-B0uARSuO.js";
import { P as isServerToolModelEligible, T as isCherryAIProvider, w as isBuiltinWebSearchAvailable } from "./model-J88ZZ_lQ.js";
import { s as isFreeModel } from "./model-D4kd6G9w.js";
function flatten(arr, depth = 1) {
	const result = [];
	const flooredDepth = Math.floor(depth);
	const recursive = (arr$1, currentDepth) => {
		for (let i = 0; i < arr$1.length; i++) {
			const item = arr$1[i];
			if (Array.isArray(item) && currentDepth < flooredDepth) recursive(item, currentDepth + 1);
			else result.push(item);
		}
	};
	recursive(arr, 0);
	return result;
}
function isIterateeCall(value, index, object) {
	if (!isObject(object)) return false;
	if (typeof index === "number" && isArrayLike(object) && isIndex(index) && index < object.length || typeof index === "string" && index in object) return isEqualsSameValueZero(object[index], value);
	return false;
}
function getPriority(a) {
	if (typeof a === "symbol") return 1;
	if (a === null) return 2;
	if (a === void 0) return 3;
	if (a !== a) return 4;
	return 0;
}
var compareValues = (a, b, order) => {
	if (a !== b) {
		const aPriority = getPriority(a);
		const bPriority = getPriority(b);
		if (aPriority === bPriority && aPriority === 0) {
			if (a < b) return order === "desc" ? 1 : -1;
			if (a > b) return order === "desc" ? -1 : 1;
		}
		return order === "desc" ? bPriority - aPriority : aPriority - bPriority;
	}
	return 0;
};
var regexIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var regexIsPlainProp = /^\w*$/;
function isKey(value, object) {
	if (Array.isArray(value)) return false;
	if (typeof value === "number" || typeof value === "boolean" || value == null || isSymbol(value)) return true;
	return typeof value === "string" && (regexIsPlainProp.test(value) || !regexIsDeepProp.test(value)) || object != null && Object.hasOwn(object, value);
}
function orderBy(collection, criteria, orders, guard) {
	if (collection == null) return [];
	orders = guard ? void 0 : orders;
	if (!Array.isArray(collection)) collection = Object.values(collection);
	if (!Array.isArray(criteria)) criteria = criteria == null ? [null] : [criteria];
	if (criteria.length === 0) criteria = [null];
	if (!Array.isArray(orders)) orders = orders == null ? [] : [orders];
	orders = orders.map((order) => String(order));
	const getValueByNestedPath = (object, path) => {
		let target = object;
		for (let i = 0; i < path.length && target != null; ++i) target = target[path[i]];
		return target;
	};
	const getValueByCriterion = (criterion, object) => {
		if (object == null || criterion == null) return object;
		if (typeof criterion === "object" && "key" in criterion) {
			if (Object.hasOwn(object, criterion.key)) return object[criterion.key];
			return getValueByNestedPath(object, criterion.path);
		}
		if (typeof criterion === "function") return criterion(object);
		if (Array.isArray(criterion)) return getValueByNestedPath(object, criterion);
		if (typeof object === "object") return object[criterion];
		return object;
	};
	const preparedCriteria = criteria.map((criterion) => {
		if (Array.isArray(criterion) && criterion.length === 1) criterion = criterion[0];
		if (criterion == null || typeof criterion === "function" || Array.isArray(criterion) || isKey(criterion)) return criterion;
		return {
			key: criterion,
			path: toPath(criterion)
		};
	});
	return collection.map((item) => ({
		original: item,
		criteria: preparedCriteria.map((criterion) => getValueByCriterion(criterion, item))
	})).slice().sort((a, b) => {
		for (let i = 0; i < preparedCriteria.length; i++) {
			const comparedResult = compareValues(a.criteria[i], b.criteria[i], orders[i]);
			if (comparedResult !== 0) return comparedResult;
		}
		return 0;
	}).map((item) => item.original);
}
function sortBy(collection, ...criteria) {
	const length = criteria.length;
	if (length > 1 && isIterateeCall(collection, criteria[0], criteria[1])) criteria = [];
	else if (length > 2 && isIterateeCall(criteria[0], criteria[1], criteria[2])) criteria = [criteria[0]];
	return orderBy(collection, flatten(criteria), ["asc"]);
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var CustomTag = ({ children, icon, color, size = 12, style, tooltip, closable = false, onClose, onClick, onContextMenu, disabled, inactive, className = "" }) => {
	const actualColor = inactive ? "#aaaaaa" : color;
	const tagContent = (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.custom-tag",
		className: `inline-flex items-center gap-1 rounded-full whitespace-nowrap relative transition-opacity duration-200 ${!disabled && onClick ? "cursor-pointer hover:opacity-80" : disabled ? "cursor-not-allowed" : "cursor-auto"} ${className}`,
		style: {
			padding: `${size / 3}px ${closable ? size * 1.8 : size * .8}px ${size / 3}px ${size * .8}px`,
			color: actualColor,
			backgroundColor: actualColor + "20",
			fontSize: `${size}px`,
			lineHeight: 1,
			...style
		},
		onClick: disabled ? void 0 : onClick,
		onContextMenu: disabled ? void 0 : onContextMenu,
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center justify-center",
				style: {
					fontSize: `${size}px`,
					color: "currentColor"
				},
				children: icon
			}),
			children,
			closable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute flex items-center justify-center cursor-pointer rounded-full transition-all duration-200 hover:bg-[#da8a8a] hover:text-white",
				style: {
					right: `${size * .2}px`,
					top: `${size * .2}px`,
					bottom: `${size * .2}px`,
					fontSize: `${size * .8}px`,
					color: actualColor,
					aspectRatio: 1
				},
				onClick: (e) => {
					e.stopPropagation();
					onClose?.();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: size * .8 })
			})
		]
	}), [
		actualColor,
		children,
		closable,
		disabled,
		icon,
		onClick,
		onClose,
		onContextMenu,
		size,
		style,
		className
	]);
	return tooltip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: tooltip,
		delay: 300,
		children: tagContent
	}) : tagContent;
};
var CustomTag_default = (0, import_react.memo)(CustomTag);
const AudioTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#13c2c2",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ear, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.audio") : void 0,
		...restProps,
		children: showLabel ? t("models.type.audio") : ""
	});
};
const EmbeddingTag = ({ size = 12, showTooltip, showLabel = true, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#FFA500",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.embedding") : void 0,
		...restProps,
		children: showLabel ? t("models.type.embedding") : ""
	});
};
const FreeTag = ({ size = 12, showTooltip, showLabel = true, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#7cb305",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.free") : void 0,
		...restProps,
		children: showLabel ? t("models.type.free") : ""
	});
};
const ReasoningTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#6372bd",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.reasoning") : void 0,
		...restProps,
		children: showLabel ? t("models.type.reasoning") : ""
	});
};
const RerankerTag = ({ size = 12, showTooltip, showLabel = true, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#6495ED",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.rerank") : void 0,
		...restProps,
		children: showLabel ? t("models.type.rerank") : ""
	});
};
const ToolsCallingTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#f18737",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.function_calling") : void 0,
		...restProps,
		children: showLabel ? t("models.type.function_calling") : ""
	});
};
const VideoTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#722ed1",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.video") : void 0,
		...restProps,
		children: showLabel ? t("models.type.video") : ""
	});
};
const VisionTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#00b96b",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.vision") : void 0,
		...restProps,
		children: showLabel ? t("models.type.vision") : ""
	});
};
const WebSearchTag = ({ size = 12, showTooltip, showLabel, ...restProps }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTag_default, {
		size,
		color: "#1677ff",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
			size,
			color: "currentColor",
			className: "text-current"
		}),
		tooltip: showTooltip ? t("models.type.websearch") : void 0,
		...restProps,
		children: showLabel ? t("models.type.websearch") : ""
	});
};
const MODEL_DISPLAY_TAGS = [
	...[
		MODEL_CAPABILITY.IMAGE_RECOGNITION,
		MODEL_CAPABILITY.AUDIO_RECOGNITION,
		MODEL_CAPABILITY.VIDEO_RECOGNITION,
		MODEL_CAPABILITY.REASONING,
		MODEL_CAPABILITY.FUNCTION_CALL,
		MODEL_CAPABILITY.EMBEDDING,
		MODEL_CAPABILITY.RERANK
	],
	SERVER_TOOL.WEB_SEARCH,
	"free"
];
var INPUT_MODALITY_BY_DISPLAY_TAG = {
	[MODEL_CAPABILITY.IMAGE_RECOGNITION]: MODALITY.IMAGE,
	[MODEL_CAPABILITY.AUDIO_RECOGNITION]: MODALITY.AUDIO,
	[MODEL_CAPABILITY.VIDEO_RECOGNITION]: MODALITY.VIDEO
};
function isModelTagVisible(tag, { showFree = true, showReasoning = true, showToolsCalling = true } = {}) {
	if (tag === "free") return showFree;
	if (tag === MODEL_CAPABILITY.REASONING) return showReasoning;
	if (tag === MODEL_CAPABILITY.FUNCTION_CALL) return showToolsCalling;
	return true;
}
function modelMatchesDisplayTag(model, tag, provider) {
	if (tag === "free") return isFreeModel(model);
	if (tag === SERVER_TOOL.WEB_SEARCH) return provider ? isBuiltinWebSearchAvailable(model, provider) : isServerToolModelEligible(model, SERVER_TOOL.WEB_SEARCH);
	const inputModality = INPUT_MODALITY_BY_DISPLAY_TAG[tag];
	return model.capabilities.includes(tag) || Boolean(inputModality && model.inputModalities?.includes(inputModality));
}
function getModelDisplayTags(model, options, provider) {
	return MODEL_DISPLAY_TAGS.filter((tag) => isModelTagVisible(tag, options) && modelMatchesDisplayTag(model, tag, provider));
}
var MODEL_TAG_COMPONENTS = {
	"image-recognition": VisionTag,
	"audio-recognition": AudioTag,
	"video-recognition": VideoTag,
	"web-search": WebSearchTag,
	reasoning: ReasoningTag,
	"function-call": ToolsCallingTag,
	embedding: EmbeddingTag,
	rerank: RerankerTag,
	free: FreeTag
};
function ModelTag({ tag, size = 12, showTooltip, showLabel = false, ...restProps }) {
	const TagComponent = MODEL_TAG_COMPONENTS[tag];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagComponent, {
		size,
		showTooltip,
		showLabel,
		...restProps
	});
}
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
	const { groups, getGroupId, getItemId, renderGroupHeader, renderItem, renderGroupFooter, estimateGroupHeaderSize, estimateItemSize, estimateGroupFooterSize, disabled = false, dragActivationDistance = 6, dragCapabilities, canDragGroup, canDragItem, canDropGroup, canDropItem, onDragStart, onDragEnd, ...virtualListProps } = props;
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
					rowType: "group-header"
				});
				continue;
			}
			if (row.type === "item") {
				targets.set(groupId, {
					itemId: getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup),
					position: "after",
					rowType: "item"
				});
				continue;
			}
			targets.set(groupId, {
				position: "before",
				rowType: "group-footer"
			});
		}
		return targets;
	}, [
		getGroupId,
		getItemId,
		rows
	]);
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
			const groupId = getGroupId(row.group, row.groupIndex);
			if (row.type === "group-header") {
				targets.set(groupId, {
					before: {
						position: "before",
						rowType: "group-header"
					},
					after: {
						position: "after",
						rowType: "group-header"
					}
				});
				continue;
			}
			const groupTargets = targets.get(groupId);
			if (!groupTargets) continue;
			if (row.type === "item") {
				groupTargets.after = {
					itemId: getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup),
					position: "after",
					rowType: "item"
				};
				continue;
			}
			groupTargets.after = {
				position: "after",
				rowType: "group-footer"
			};
		}
		return targets;
	}, [
		getGroupId,
		getItemId,
		rows
	]);
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
			if (overDropState.targetGroupId !== groupId) return null;
			const target$1 = groupBoundaryIndicatorTargets.get(groupId)?.[overDropState.position];
			if (!target$1 || target$1.rowType !== row.type) return null;
			if (row.type === "item") {
				const itemId = getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup);
				if (target$1.itemId !== itemId) return null;
			}
			return target$1.position;
		}
		if (overDropState.rowType === "item") {
			if (row.type !== "item") return null;
			return getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup) === overDropState.targetId ? overDropState.position : null;
		}
		if (overDropState.targetGroupId !== groupId) return null;
		const target = groupAppendIndicatorTargets.get(groupId);
		if (!target || target.rowType !== row.type) return null;
		if (row.type === "item") {
			const itemId = getItemId(row.item, row.itemIndex, row.group, row.groupIndex, row.itemIndexInGroup);
			if (target.itemId !== itemId) return null;
		}
		return target.position;
	}, [
		activeDragState,
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
const LOCAL_EMBEDDING_PROVIDER_ID = "local-embedding";
const LOCAL_EMBEDDING_MODEL_ID = "qwen3-embedding-0.6b";
const LOCAL_EMBEDDING_DIMENSIONS = 1024;
const LOCAL_EMBEDDING_UNIQUE_MODEL_ID = createUniqueModelId(LOCAL_EMBEDDING_PROVIDER_ID, LOCAL_EMBEDDING_MODEL_ID);
function isProviderSettingsListVisibleProvider(provider) {
	return !isCherryAIProvider(provider) && provider.id !== "local-embedding";
}
export { GroupedSortableVirtualList_default as a, DynamicVirtualList_default as c, getModelDisplayTags as d, modelMatchesDisplayTag as f, LOCAL_EMBEDDING_UNIQUE_MODEL_ID as i, MODEL_DISPLAY_TAGS as l, sortBy as m, LOCAL_EMBEDDING_DIMENSIONS as n, GroupedVirtualList_default as o, CustomTag_default as p, LOCAL_EMBEDDING_PROVIDER_ID as r, buildGroupedVirtualRows as s, isProviderSettingsListVisibleProvider as t, ModelTag as u };
