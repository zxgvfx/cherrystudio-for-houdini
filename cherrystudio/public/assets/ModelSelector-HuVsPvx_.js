import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { i as modelMatchesDisplayTag, n as ModelTag, o as sortBy, r as getModelDisplayTags, t as MODEL_DISPLAY_TAGS } from "./Model-CdvaPtgc.js";
import { t as head } from "./head-Cem_9hKR.js";
import { t as isDev } from "./platform-CINZzEpE.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { n as UiDataSlot, r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DSfDf9Q4.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { i as usePortalContainer } from "./portal-container-CJZY5KbV.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { n as Switch } from "./switch-C8ze0dtD.js";
import { t as Checkbox } from "./checkbox-wIIoFt4V.js";
import { t as Input } from "./input-BdTU3c_O.js";
import { i as PopoverTrigger, r as PopoverContent, t as Popover } from "./popover-V3qUK3h7.js";
import { n as HoverCardContent, r as HoverCardTrigger, t as HoverCard } from "./hover-card-CdD1RjhB.js";
import { x as useCommandHandler } from "./command-DJ8bdie_.js";
import { r as openSettingsTab } from "./mainWindowNavigation-BoKv8CTA.js";
import { a as isUniqueModelId, o as parseUniqueModelId } from "./model-DbPSoCMM.js";
import { c as useQuery, n as useDataChange, o as useMutation } from "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as CircleSlash } from "./circle-slash-DQs2sOuQ.js";
import { t as Pin } from "./pin-CryR5xyJ.js";
import { t as Search } from "./search-Dz0ktO-n.js";
import { t as Settings2 } from "./settings-2-Dwi4n8ON.js";
import { t as X } from "./x-Bh2_A30k.js";
import { t as useIcon } from "./use-icon-u7Wb-l1f.js";
import { o as getProviderLabelKey } from "./label-Grg6QUtw.js";
import { t as AGENT_RUNTIME_CAPABILITIES } from "./agentRuntimeCapabilities-Dnr3VRWR.js";
import { I as isNonChatModel, u as isExternalCliProvider } from "./provider-B43PumwQ.js";
import { i as useModels } from "./useModel-DWj6Qb5f.js";
import { u as useProviders } from "./useProvider-DFQPidMA.js";
import { c as deriveThinkingOptions, n as getSearchMatchScore, u as getModelLogoRef } from "./model-BGDvQJb9.js";
import { i as DynamicVirtualList_default } from "./VirtualList-BcHriGxz.js";
import { t as isProviderSettingsListVisibleProvider } from "./providerSettings-HvlvfaC_.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var baseAgentFilter = (model) => !isNonChatModel(model);
var AGENT_ONLY_FILTER = Symbol("agentModelFilter");
function modelFilterIncludesAgentOnlyProviders(filter) {
	return Boolean(filter?.[AGENT_ONLY_FILTER]);
}
function useAgentModelFilter(agentType) {
	return (0, import_react.useMemo)(() => {
		const caps = agentType ? AGENT_RUNTIME_CAPABILITIES[agentType] : void 0;
		const predicate = (model, provider) => {
			if (!baseAgentFilter(model)) return false;
			return !caps?.isModelCompatible || caps.isModelCompatible(provider, model);
		};
		predicate[AGENT_ONLY_FILTER] = true;
		return predicate;
	}, [agentType]);
}
const MODEL_SELECTOR_TAGS = MODEL_DISPLAY_TAGS;
var initialTagSelection = Object.fromEntries(MODEL_SELECTOR_TAGS.map((tag) => [tag, false]));
function useModelTagFilter() {
	const [tagSelection, setTagSelection] = (0, import_react.useState)(initialTagSelection);
	const selectedTags = (0, import_react.useMemo)(() => MODEL_SELECTOR_TAGS.filter((tag) => tagSelection[tag]), [tagSelection]);
	const toggleTag = (0, import_react.useCallback)((tag) => {
		setTagSelection((prev) => ({
			...prev,
			[tag]: !prev[tag]
		}));
	}, []);
	const resetTags = (0, import_react.useCallback)(() => {
		setTagSelection(initialTagSelection);
	}, []);
	return {
		tagSelection,
		selectedTags,
		tagFilter: (0, import_react.useCallback)((model, provider) => {
			if (selectedTags.length === 0) return true;
			return selectedTags.every((tag) => modelMatchesDisplayTag(model, tag, provider));
		}, [selectedTags]),
		toggleTag,
		resetTags
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DEFAULT_COLLISION_PADDING = 12;
const DEFAULT_SELECTOR_CONTENT_HEIGHT = 344;
var SELECTOR_CONTENT_POSITION_CLASS = "animation-selector-shell-content";
var SELECTOR_PANEL_ANIMATION_CLASS = "animation-selector-shell-panel";
function parsePixelValue(value) {
	if (!value) return void 0;
	const match = value.trim().match(/^(-?\d+(?:\.\d+)?)px$/);
	if (!match) return void 0;
	const parsed = Number.parseFloat(match[1]);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : void 0;
}
function parseCssSize(value) {
	if (typeof value === "number") return Number.isFinite(value) && value > 0 ? value : void 0;
	return parsePixelValue(value);
}
function getAvailablePopoverHeight(element, contentHeight) {
	const styles = window.getComputedStyle(element);
	const parentStyles = element.parentElement ? window.getComputedStyle(element.parentElement) : null;
	const heightCandidates = [
		parsePixelValue(styles.getPropertyValue("--radix-popover-content-available-height")),
		parsePixelValue(styles.getPropertyValue("--radix-popper-available-height")),
		parsePixelValue(parentStyles?.getPropertyValue("--radix-popper-available-height")),
		parsePixelValue(styles.maxHeight),
		parseCssSize(contentHeight)
	].filter((height) => height !== void 0);
	return heightCandidates.length > 0 ? Math.min(...heightCandidates) : void 0;
}
function createLocalPortalContainer() {
	if (typeof document === "undefined") return null;
	const element = document.createElement("div");
	element.dataset.selectorShellPortal = "true";
	element.style.display = "contents";
	return element;
}
function toCssSize(value) {
	return typeof value === "number" ? `${value}px` : value;
}
function SelectorShell({ trigger, open, onOpenChange, search, filterContent, multiSelect, bottomAction, children, contentClassName, width, side = "bottom", align = "start", sideOffset = 4, contentHeight, maxContentHeight, portalContainer, mountStrategy = "destroy", contentProps, "data-testid": dataTestId }) {
	const { t } = useTranslation();
	const triggerNode = (0, import_react.isValidElement)(trigger) ? trigger : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "ui.selector-shell",
		children: trigger
	});
	const { forceMount, hidden, onInteractOutside, onOpenAutoFocus, onKeyDown, style, collisionPadding = DEFAULT_COLLISION_PADDING, ...restContentProps } = contentProps ?? {};
	const contentRef = (0, import_react.useRef)(null);
	const searchRef = (0, import_react.useRef)(null);
	const filterRef = (0, import_react.useRef)(null);
	const multiSelectRef = (0, import_react.useRef)(null);
	const panelRef = (0, import_react.useRef)(null);
	const listBodyRef = (0, import_react.useRef)(null);
	const bottomActionRef = (0, import_react.useRef)(null);
	const internalSearchInputRef = (0, import_react.useRef)(null);
	const localPortalRootRef = (0, import_react.useRef)(null);
	const measureFrameRef = (0, import_react.useRef)(null);
	const [localPortalContainer] = (0, import_react.useState)(createLocalPortalContainer);
	const [availableListHeight, setAvailableListHeight] = (0, import_react.useState)(void 0);
	const [hasOpened, setHasOpened] = (0, import_react.useState)(open);
	const pagePortalContainer = usePortalContainer();
	const hasSearch = Boolean(search);
	const hasFilterContent = Boolean(filterContent);
	const renderMultiSelectAsSearchBadge = Boolean(search && multiSelect?.placement === "search-badge");
	const renderMultiSelectRow = Boolean(multiSelect && !renderMultiSelectAsSearchBadge);
	const resolvedBottomActions = Array.isArray(bottomAction) ? bottomAction : bottomAction ? [bottomAction] : [];
	const hasBottomAction = resolvedBottomActions.length > 0;
	const measureAvailableListHeight = (0, import_react.useCallback)(() => {
		const contentElement = contentRef.current;
		if (!contentElement) {
			setAvailableListHeight(void 0);
			return;
		}
		const availablePopoverHeight = getAvailablePopoverHeight(contentElement, contentHeight);
		if (!availablePopoverHeight) {
			setAvailableListHeight(void 0);
			return;
		}
		const contentStyles = window.getComputedStyle(contentElement);
		const panelStyles = panelRef.current ? window.getComputedStyle(panelRef.current) : null;
		const verticalPadding = (parsePixelValue(contentStyles.paddingTop) ?? 0) + (parsePixelValue(contentStyles.paddingBottom) ?? 0) + (parsePixelValue(panelStyles?.paddingTop) ?? 0) + (parsePixelValue(panelStyles?.paddingBottom) ?? 0);
		const chromeHeight = [
			searchRef.current,
			filterRef.current,
			multiSelectRef.current,
			bottomActionRef.current
		].reduce((height, element) => height + (element?.getBoundingClientRect().height ?? 0), 0);
		const nextListHeight = Math.max(0, Math.floor(availablePopoverHeight - chromeHeight - verticalPadding));
		setAvailableListHeight((previousHeight) => previousHeight === nextListHeight ? previousHeight : nextListHeight);
	}, [contentHeight]);
	const scheduleMeasureAvailableListHeight = (0, import_react.useCallback)(() => {
		if (!open) return;
		if (measureFrameRef.current !== null) window.cancelAnimationFrame(measureFrameRef.current);
		measureFrameRef.current = window.requestAnimationFrame(() => {
			measureFrameRef.current = null;
			measureAvailableListHeight();
		});
	}, [measureAvailableListHeight, open]);
	const setContentElement = (0, import_react.useCallback)((element) => {
		contentRef.current = element;
		scheduleMeasureAvailableListHeight();
	}, [scheduleMeasureAvailableListHeight]);
	const setSearchElement = (0, import_react.useCallback)((element) => {
		searchRef.current = element;
		scheduleMeasureAvailableListHeight();
	}, [scheduleMeasureAvailableListHeight]);
	const setSearchInputElement = (0, import_react.useCallback)((element) => {
		internalSearchInputRef.current = element;
		if (search?.inputRef) search.inputRef.current = element;
	}, [search?.inputRef]);
	const setFilterElement = (0, import_react.useCallback)((element) => {
		filterRef.current = element;
		scheduleMeasureAvailableListHeight();
	}, [scheduleMeasureAvailableListHeight]);
	const setMultiSelectElement = (0, import_react.useCallback)((element) => {
		multiSelectRef.current = element;
		scheduleMeasureAvailableListHeight();
	}, [scheduleMeasureAvailableListHeight]);
	const setPanelElement = (0, import_react.useCallback)((element) => {
		panelRef.current = element;
		scheduleMeasureAvailableListHeight();
	}, [scheduleMeasureAvailableListHeight]);
	const setListBodyElement = (0, import_react.useCallback)((element) => {
		listBodyRef.current = element;
		scheduleMeasureAvailableListHeight();
	}, [scheduleMeasureAvailableListHeight]);
	const setBottomActionElement = (0, import_react.useCallback)((element) => {
		bottomActionRef.current = element;
		scheduleMeasureAvailableListHeight();
	}, [scheduleMeasureAvailableListHeight]);
	const setLocalPortalRootElement = (0, import_react.useCallback)((element) => {
		localPortalRootRef.current = element;
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		const root = localPortalRootRef.current;
		if (!root || !localPortalContainer || portalContainer || pagePortalContainer) return;
		root.appendChild(localPortalContainer);
		return () => {
			if (localPortalContainer.parentElement === root) root.removeChild(localPortalContainer);
		};
	}, [
		localPortalContainer,
		pagePortalContainer,
		portalContainer
	]);
	(0, import_react.useLayoutEffect)(() => {
		if (open) setHasOpened(true);
		if (!open) {
			setAvailableListHeight(void 0);
			return;
		}
		measureAvailableListHeight();
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(measureAvailableListHeight);
		[
			contentRef.current,
			panelRef.current,
			searchRef.current,
			filterRef.current,
			multiSelectRef.current,
			listBodyRef.current,
			bottomActionRef.current
		].filter((element) => Boolean(element)).forEach((element) => observer.observe(element));
		window.addEventListener("resize", measureAvailableListHeight);
		return () => {
			if (measureFrameRef.current !== null) {
				window.cancelAnimationFrame(measureFrameRef.current);
				measureFrameRef.current = null;
			}
			observer.disconnect();
			window.removeEventListener("resize", measureAvailableListHeight);
		};
	}, [
		contentHeight,
		hasBottomAction,
		hasFilterContent,
		hasSearch,
		maxContentHeight,
		measureAvailableListHeight,
		open,
		renderMultiSelectRow
	]);
	(0, import_react.useLayoutEffect)(() => {
		return () => {
			if (measureFrameRef.current !== null) {
				window.cancelAnimationFrame(measureFrameRef.current);
				measureFrameRef.current = null;
			}
		};
	}, []);
	const shouldRenderContent = mountStrategy === "lazy-keep" ? open || hasOpened : true;
	const shouldForceMount = mountStrategy === "lazy-keep" || forceMount ? true : void 0;
	const resolvedPortalContainer = portalContainer ?? pagePortalContainer ?? localPortalContainer ?? void 0;
	const layout = (0, import_react.useMemo)(() => ({
		availableListHeight,
		portalContainer: resolvedPortalContainer ?? null
	}), [availableListHeight, resolvedPortalContainer]);
	const canRenderContent = shouldRenderContent && resolvedPortalContainer !== void 0;
	const body = canRenderContent ? typeof children === "function" ? children(layout) : children : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.selector-shell",
		ref: setLocalPortalRootElement,
		className: "contents",
		"data-selector-shell-root": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
			open,
			onOpenChange,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: triggerNode })
			}), canRenderContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
				side,
				align,
				sideOffset,
				collisionPadding,
				portalContainer: resolvedPortalContainer,
				forceMount: shouldForceMount,
				hidden: mountStrategy === "lazy-keep" && !open ? true : hidden,
				...restContentProps,
				style: {
					width: toCssSize(width),
					maxWidth: "var(--radix-popover-content-available-width)",
					height: toCssSize(contentHeight),
					maxHeight: toCssSize(maxContentHeight),
					...style
				},
				onInteractOutside: (event) => {
					if ((event.detail?.originalEvent?.target ?? event.target)?.closest?.("[data-entity-context-menu-root]")) event.preventDefault();
					onInteractOutside?.(event);
				},
				onOpenAutoFocus: (event) => {
					if (search && search.autoFocus !== false) {
						event.preventDefault();
						internalSearchInputRef.current?.focus();
					}
					onOpenAutoFocus?.(event);
				},
				onKeyDown,
				className: cn("max-h-[var(--radix-popover-content-available-height)] w-90 overflow-visible rounded-none border-0 bg-transparent p-0 shadow-none", SELECTOR_CONTENT_POSITION_CLASS, contentClassName),
				"data-selector-shell-content": "true",
				ref: setContentElement,
				"data-testid": dataTestId,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: setPanelElement,
					className: cn("flex h-full max-h-[inherit] w-full flex-col overflow-hidden rounded-lg border-[0.5px] border-border bg-popover pt-1 shadow-lg", SELECTOR_PANEL_ANIMATION_CLASS),
					"data-selector-shell-panel": "true",
					children: [
						search ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: setSearchElement,
							className: "flex h-9 items-center gap-2 border-border-subtle border-b px-3",
							"data-selector-shell-chrome": "search",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "-translate-y-1/2 pointer-events-none absolute top-1/2 left-0 size-3.5 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "text",
										ref: setSearchInputElement,
										value: search.value,
										autoFocus: search.autoFocus ?? true,
										spellCheck: search.spellCheck ?? false,
										placeholder: search.placeholder,
										"aria-activedescendant": search.activeDescendant,
										"aria-controls": search.ariaControls,
										className: cn("h-7 rounded-none border-0 bg-transparent! py-0 pr-6 pl-5 text-xs leading-7 shadow-none transition-none md:text-xs dark:bg-transparent!", "focus-visible:border-transparent focus-visible:ring-0", "placeholder:text-muted-foreground"),
										"data-testid": search.dataTestId,
										onChange: (event) => search.onChange(event.target.value),
										onKeyDown: search.onKeyDown
									}),
									search.value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "icon-sm",
										"aria-label": t("common.clear"),
										className: "-translate-y-1/2 absolute top-1/2 right-0 size-[22px] rounded-md p-0 text-muted-foreground hover:bg-accent/40 hover:text-foreground",
										onMouseDown: (event) => event.preventDefault(),
										onClick: () => {
											search.onChange("");
											internalSearchInputRef.current?.focus();
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											className: "size-2.5",
											"aria-hidden": "true"
										})
									}) : null
								]
							}), renderMultiSelectAsSearchBadge && multiSelect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: multiSelect.tooltip,
								delay: 1500,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									size: "sm",
									disabled: multiSelect.disabled,
									"aria-pressed": multiSelect.checked,
									"aria-label": multiSelect.ariaLabel,
									"data-testid": multiSelect.dataTestId,
									className: cn("h-6 min-h-6 shrink-0 rounded-md px-2 text-xs", multiSelect.checked ? "bg-accent text-accent-foreground hover:bg-accent" : "bg-secondary/60 hover:bg-secondary"),
									onClick: () => multiSelect.onCheckedChange(!multiSelect.checked),
									children: multiSelect.label
								})
							}) : null]
						}) : null,
						hasFilterContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: setFilterElement,
							className: "flex items-center justify-between gap-2 border-border-subtle border-b px-3 py-2",
							"data-selector-shell-chrome": "filter",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
								children: filterContent
							})
						}) : null,
						renderMultiSelectRow && multiSelect ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: setMultiSelectElement,
							className: "flex items-center justify-between gap-3 border-border border-b px-3 py-2",
							"data-selector-shell-chrome": "multi-select",
							"data-testid": multiSelect.rowTestId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 items-center gap-1 text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: multiSelect.label
								}), multiSelect.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-muted-foreground",
									children: multiSelect.hint
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: multiSelect.checked,
								disabled: multiSelect.disabled,
								size: "sm",
								"data-testid": multiSelect.dataTestId,
								onCheckedChange: multiSelect.onCheckedChange
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: setListBodyElement,
							className: "min-h-0 flex-1 overflow-hidden",
							"data-selector-shell-body": "true",
							children: body
						}),
						hasBottomAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: setBottomActionElement,
							className: "relative z-1 shrink-0 border-border border-t bg-popover",
							"data-selector-shell-chrome": "bottom-action",
							children: resolvedBottomActions.map((action, index) => {
								const selected = action.type === "selectable" && action.selected;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: action.disabled,
									"aria-pressed": action.type === "selectable" ? selected : void 0,
									onClick: action.onClick,
									className: cn("relative flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50", selected ? "bg-accent/70 text-accent-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"),
									children: [
										selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											className: "-translate-y-1/2 absolute top-1/2 left-0 block h-[60%] w-0.75 rounded-full bg-muted-foreground/60"
										}) : null,
										action.icon,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1 truncate",
											children: action.label
										})
									]
								}, index);
							})
						}) : null
					]
				})
			}) : null]
		})
	});
}
function getProviderDisplayName(provider) {
	if (provider.presetProviderId && provider.id === provider.presetProviderId) return resolver_default.t(getProviderLabelKey(provider.presetProviderId));
	return provider.name;
}
var NUMBER_FORMATTER = new Intl.NumberFormat(void 0);
var DETAIL_CARD_TARGET_WIDTH = 336;
var DETAIL_CARD_SIDE_OFFSET = 8;
var DETAIL_CARD_COLLISION_PADDING = 12;
var DETAIL_CARD_OPEN_DELAY = 1500;
var REASONING_EFFORT_LABEL_KEYS = {
	auto: "assistants.settings.reasoning_effort.auto",
	default: "assistants.settings.reasoning_effort.default",
	high: "assistants.settings.reasoning_effort.high",
	low: "assistants.settings.reasoning_effort.low",
	max: "assistants.settings.reasoning_effort.max",
	medium: "assistants.settings.reasoning_effort.medium",
	minimal: "assistants.settings.reasoning_effort.minimal",
	none: "assistants.settings.reasoning_effort.off",
	xhigh: "assistants.settings.reasoning_effort.xhigh"
};
var IMAGE_MODE_LABEL_KEYS = {
	edit: "paintings.mode.edit",
	generate: "paintings.mode.generate",
	merge: "paintings.mode.merge",
	remix: "paintings.mode.remix",
	upscale: "paintings.mode.upscale"
};
function formatNumber(value) {
	return value == null ? void 0 : NUMBER_FORMATTER.format(value);
}
function getViewportSize() {
	if (typeof window === "undefined") return {
		width: 0,
		height: 0
	};
	return {
		width: document.documentElement.clientWidth || window.innerWidth,
		height: document.documentElement.clientHeight || window.innerHeight
	};
}
function getAvailableSpaceForSide(triggerRect, side, viewport) {
	switch (side) {
		case "right": return viewport.width - triggerRect.right - DETAIL_CARD_SIDE_OFFSET - DETAIL_CARD_COLLISION_PADDING;
		case "left": return triggerRect.left - DETAIL_CARD_SIDE_OFFSET - DETAIL_CARD_COLLISION_PADDING;
	}
}
function getDetailCardSide(trigger) {
	const triggerRect = trigger.getBoundingClientRect();
	const viewport = getViewportSize();
	const rightSpace = getAvailableSpaceForSide(triggerRect, "right", viewport);
	const leftSpace = getAvailableSpaceForSide(triggerRect, "left", viewport);
	if (rightSpace >= DETAIL_CARD_TARGET_WIDTH) return "right";
	if (leftSpace >= DETAIL_CARD_TARGET_WIDTH) return "left";
	return rightSpace >= leftSpace ? "right" : "left";
}
function getDetailCardAlign() {
	return "start";
}
function compactList(values, limit = 3) {
	if (!values?.length) return;
	const visibleValues = values.slice(0, limit);
	const restCount = values.length - visibleValues.length;
	return restCount > 0 ? `${visibleValues.join(", ")} +${restCount}` : visibleValues.join(", ");
}
function formatReasoningEfforts(values, t) {
	return values?.map((value) => t(REASONING_EFFORT_LABEL_KEYS[value] ?? value)).join(", ");
}
function formatImageGenerationModes(model, t) {
	return compactList(Object.keys(model.imageGeneration?.modes ?? {}).map((mode) => t(IMAGE_MODE_LABEL_KEYS[mode] ?? mode)));
}
function DetailRow({ label, value }) {
	if (value == null || value === "") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.detail-row",
		className: "grid grid-cols-[6.75rem_minmax(0,1fr)] gap-3 text-xs leading-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "truncate text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "min-w-0 truncate text-foreground",
			children: value
		})]
	});
}
function ModelSelectorDetailCardBody({ item, provider, providerName }) {
	const { t } = useTranslation();
	const { model, modelIdentifier } = item;
	const tags = (0, import_react.useMemo)(() => getModelDisplayTags(model, void 0, provider), [model, provider]);
	const reasoningEfforts = formatReasoningEfforts(deriveThinkingOptions(model)?.filter((option) => option !== "default"), t);
	const imageModes = formatImageGenerationModes(model, t);
	const hasTokenDetails = model.contextWindow != null || model.maxInputTokens != null || model.maxOutputTokens != null;
	const hasCapabilityDetails = Boolean(reasoningEfforts || imageModes);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.model-selector-detail-card",
		className: "max-h-[min(420px,70vh,var(--radix-hover-card-content-available-height,70vh))] overflow-auto p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 space-y-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate font-medium text-foreground text-sm",
					title: model.name,
					children: model.name
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-1.5 border-border border-t pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
					label: t("models.detail.provider"),
					value: providerName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
					label: t("models.detail.model_id"),
					value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						title: modelIdentifier,
						children: modelIdentifier
					})
				})]
			}),
			tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1.5",
				children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelTag, {
					tag,
					size: 10,
					showLabel: true,
					showTooltip: false
				}, `${item.key}-detail-${tag}`))
			}) : null,
			hasTokenDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-1.5 border-border border-t pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						label: t("models.detail.context_window"),
						value: formatNumber(model.contextWindow)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						label: t("models.detail.max_input_tokens"),
						value: formatNumber(model.maxInputTokens)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
						label: t("models.detail.max_output_tokens"),
						value: formatNumber(model.maxOutputTokens)
					})
				]
			}) : null,
			hasCapabilityDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-1.5 border-border border-t pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
					label: t("assistants.settings.reasoning_effort.label"),
					value: reasoningEfforts
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
					label: t("models.detail.image_modes"),
					value: imageModes
				})]
			}) : null
		]
	});
}
const ModelSelectorDetailCard = (0, import_react.memo)(function ModelSelectorDetailCard$1({ item, provider, portalContainer, children }) {
	const providerName = getProviderDisplayName(provider);
	const triggerRef = (0, import_react.useRef)(null);
	const [side, setSide] = (0, import_react.useState)("right");
	const align = getDetailCardAlign();
	const setTriggerElement = (0, import_react.useCallback)((element) => {
		triggerRef.current = element;
	}, []);
	const updateSide = (0, import_react.useCallback)(() => {
		if (!triggerRef.current) return;
		setSide(getDetailCardSide(triggerRef.current));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HoverCard, {
		openDelay: DETAIL_CARD_OPEN_DELAY,
		closeDelay: 100,
		onOpenChange: (open) => open && updateSide(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardTrigger, {
			asChild: true,
			ref: setTriggerElement,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardContent, {
			side,
			align,
			sideOffset: DETAIL_CARD_SIDE_OFFSET,
			collisionPadding: DETAIL_CARD_COLLISION_PADDING,
			portalContainer: portalContainer ?? void 0,
			className: "w-84 max-w-(--radix-hover-card-content-available-width) p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelectorDetailCardBody, {
				item,
				provider,
				providerName
			})
		})]
	});
});
const MODEL_SELECTOR_ROW_CLASS = "group relative flex h-8 w-full items-center gap-1 rounded-[10px] px-2 py-1 text-left text-xs transition-colors";
const MODEL_SELECTOR_ROW_ACTION_BUTTON_CLASS = "flex size-5 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 shadow-none transition hover:bg-accent hover:text-accent-foreground hover:opacity-100! group-hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";
const MODEL_SELECTOR_ROW_CHECKBOX_CLASS = "border-muted-foreground/40 hover:bg-muted/70 data-[state=checked]:border-muted-foreground data-[state=checked]:bg-muted-foreground data-[state=checked]:text-background focus-visible:border-ring";
function ModelSelectorRow({ ref, selected, focused = false, disabled = false, showSelectedIndicator = false, checkbox, leading, children, trailing, actions, onSelect, rootProps, optionProps, className, ...props }) {
	const { className: rootClassName, ...restRootProps } = rootProps ?? {};
	const { className: optionClassName, onClick: onOptionClick, ...restOptionProps } = optionProps ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.model-selector-row",
		...mergeUiProps(props, "ui.model-selector-row"),
		...mergeUiProps(restRootProps, "ui.model-selector-row"),
		ref,
		className: cn(MODEL_SELECTOR_ROW_CLASS, selected && "bg-accent/70 text-accent-foreground", !selected && !disabled && focused && "bg-accent/60", !selected && !disabled && !focused && "text-foreground hover:bg-accent/60", disabled && "cursor-not-allowed text-muted-foreground opacity-50", className, rootClassName),
		"data-model-selector-row": true,
		children: [
			showSelectedIndicator ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "-translate-y-1/2 absolute top-1/2 left-0 block h-[60%] w-0.75 rounded-full bg-primary"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				...restOptionProps,
				role: optionProps?.role ?? "option",
				"aria-selected": optionProps?.["aria-selected"] ?? selected,
				"aria-disabled": optionProps?.["aria-disabled"] ?? (disabled || void 0),
				tabIndex: optionProps?.tabIndex ?? -1,
				className: cn("flex min-w-0 flex-1 cursor-pointer items-center gap-2 overflow-hidden outline-none", disabled && "cursor-not-allowed", optionClassName),
				onClick: (event) => {
					onOptionClick?.(event);
					if (event.defaultPrevented || disabled) return;
					onSelect?.();
				},
				children: [
					checkbox,
					leading,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden",
						children
					}),
					trailing
				]
			}),
			actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ml-0 flex shrink-0 items-center gap-1",
				children: actions
			}) : null
		]
	});
}
function ModelSelectorRowActionButton({ pinned = false, selected = false, className, onClick, onKeyDown, children, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		...props,
		type,
		variant: "ghost",
		size: "icon-sm",
		className: cn(MODEL_SELECTOR_ROW_ACTION_BUTTON_CLASS, (pinned || selected) && "text-foreground!", pinned && "-rotate-45 opacity-100", className),
		onClick: (event) => {
			event.stopPropagation();
			onClick?.(event);
		},
		onKeyDown: (event) => {
			if (event.key === "Enter" || event.key === " ") event.stopPropagation();
			onKeyDown?.(event);
		},
		children
	});
}
function areSelectedIdsEqual(left, right) {
	return left.length === right.length && left.every((modelId, index) => modelId === right[index]);
}
function computeCollapsedSelection(resolvedSelectedModelIds, rawSelectedModelIds) {
	const collapsed = resolvedSelectedModelIds.slice(0, 1);
	if (areSelectedIdsEqual(collapsed, rawSelectedModelIds)) return null;
	return collapsed;
}
function computeToggledSelection(rawSelectedModelIds, modelId) {
	return rawSelectedModelIds.includes(modelId) ? rawSelectedModelIds.filter((id) => id !== modelId) : [...rawSelectedModelIds, modelId];
}
function isButtonEventTarget(target) {
	return target instanceof HTMLElement && Boolean(target.closest("button"));
}
function useModelListKeyboardNav({ open, focusedItemKey, items, onClose, onFocusItem, onSelectItem, pageSize = 12 }) {
	(0, import_react.useEffect)(() => {
		if (!open || items.length === 0) return;
		const handleKeyDown = (event) => {
			if (event.isComposing) return;
			if (![
				"ArrowUp",
				"ArrowDown",
				"PageUp",
				"PageDown",
				"Enter",
				"Escape"
			].includes(event.key)) return;
			if (event.key === "Enter" && isButtonEventTarget(event.target)) return;
			event.preventDefault();
			event.stopPropagation();
			const currentIndex = items.findIndex((item) => item.key === focusedItemKey);
			let nextIndex = -1;
			switch (event.key) {
				case "ArrowUp":
					nextIndex = (currentIndex < 0 ? 0 : currentIndex - 1 + items.length) % items.length;
					break;
				case "ArrowDown":
					nextIndex = (currentIndex < 0 ? 0 : currentIndex + 1) % items.length;
					break;
				case "PageUp":
					nextIndex = Math.max(0, (currentIndex < 0 ? 0 : currentIndex) - pageSize);
					break;
				case "PageDown":
					nextIndex = Math.min(items.length - 1, (currentIndex < 0 ? 0 : currentIndex) + pageSize);
					break;
				case "Enter":
					if (currentIndex >= 0) onSelectItem(items[currentIndex]);
					return;
				case "Escape":
					onClose();
					return;
			}
			const nextItem = items[nextIndex];
			if (nextItem) onFocusItem(nextItem.key);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		focusedItemKey,
		items,
		onClose,
		onFocusItem,
		onSelectItem,
		open,
		pageSize
	]);
}
var logger$1 = loggerService.withContext("usePins");
function usePins(entityType, options = {}) {
	const enabled = options.enabled ?? true;
	const { data: rawPins = [], isLoading, isRefreshing, error: queryError, refetch } = useQuery("/pins", {
		enabled,
		query: { entityType }
	});
	useDataChange("/pins", () => {
		if (enabled) refetch();
	});
	const { trigger: createPin, isLoading: isCreatingPin, error: createError } = useMutation("POST", "/pins", { refresh: ["/pins"] });
	const { trigger: deletePin, isLoading: isDeletingPin, error: deleteError } = useMutation("DELETE", "/pins/:id", { refresh: ["/pins"] });
	const toggleInFlightRef = (0, import_react.useRef)(false);
	const pins = (0, import_react.useMemo)(() => enabled ? rawPins.filter((pin) => pin.entityType === entityType) : [], [
		enabled,
		rawPins,
		entityType
	]);
	const pinnedIds = (0, import_react.useMemo)(() => pins.map((pin) => pin.entityId), [pins]);
	const isMutating = isCreatingPin || isDeletingPin;
	const error = queryError ?? createError ?? deleteError;
	(0, import_react.useEffect)(() => {
		if (enabled && queryError) logger$1.error("Failed to read pins", queryError, { entityType });
	}, [
		enabled,
		queryError,
		entityType
	]);
	const stateRef = (0, import_react.useRef)({
		enabled,
		isLoading,
		isRefreshing,
		isMutating
	});
	const pinsRef = (0, import_react.useRef)(pins);
	stateRef.current = {
		enabled,
		isLoading,
		isRefreshing,
		isMutating
	};
	pinsRef.current = pins;
	return {
		isLoading,
		isRefreshing,
		isMutating,
		error,
		pinnedIds,
		refetch,
		togglePin: (0, import_react.useCallback)(async (entityId) => {
			const state = stateRef.current;
			if (!state.enabled || state.isLoading || state.isRefreshing || state.isMutating || toggleInFlightRef.current) {
				logger$1.debug("togglePin gated", {
					entityType,
					entityId,
					enabled: state.enabled,
					isLoading: state.isLoading,
					isRefreshing: state.isRefreshing,
					isMutating: state.isMutating,
					inFlight: toggleInFlightRef.current
				});
				return;
			}
			toggleInFlightRef.current = true;
			try {
				const existing = pinsRef.current.find((pin) => pin.entityId === entityId);
				if (existing) {
					await deletePin({ params: { id: existing.id } });
					return;
				}
				await createPin({ body: {
					entityType,
					entityId
				} });
			} finally {
				toggleInFlightRef.current = false;
			}
		}, [
			createPin,
			deletePin,
			entityType
		])
	};
}
var EMPTY_TAGS = [];
function getModelSearchScore(keywords, model, provider, providerDisplayName) {
	return getSearchMatchScore(keywords, [
		{
			value: model.name,
			weight: 0,
			allowAbbreviation: true
		},
		{
			value: model.apiModelId,
			weight: 1,
			allowAbbreviation: true
		},
		{
			value: model.id,
			weight: 1,
			allowAbbreviation: true
		},
		{
			value: provider.name,
			weight: 2,
			allowAbbreviation: false
		},
		{
			value: provider.id,
			weight: 2,
			allowAbbreviation: false
		},
		{
			value: provider.presetProviderId,
			weight: 2,
			allowAbbreviation: false
		},
		{
			value: providerDisplayName,
			weight: 2,
			allowAbbreviation: false
		}
	]);
}
function getDuplicateModelNames(models) {
	const nameCounts = /* @__PURE__ */ new Map();
	for (const model of models) {
		const name = model.name?.trim();
		if (!name) continue;
		nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1);
	}
	return new Set([...nameCounts.entries()].filter(([, count]) => count > 1).map(([name]) => name));
}
function sortModels(models) {
	return sortBy(models, ["group", "name"]);
}
function getModelIdentifier(model) {
	return model.apiModelId ?? parseUniqueModelId(model.id).modelId;
}
function sortProvidersByPriority(providers, prioritizedProviderIds) {
	if (prioritizedProviderIds.length === 0) return providers;
	const providerById = new Map(providers.map((provider) => [provider.id, provider]));
	const prioritized = prioritizedProviderIds.map((providerId) => providerById.get(providerId)).filter((provider) => Boolean(provider));
	const prioritizedIds = new Set(prioritized.map((provider) => provider.id));
	const remaining = providers.filter((provider) => !prioritizedIds.has(provider.id));
	return [...prioritized, ...remaining];
}
function useModelSelectorData({ enabled = true, selectedModelIds = [], maxSelectedCount, searchText, filter, showTagFilter = true, showPinnedModels = true, prioritizedProviderIds = [] }) {
	const { providers, isLoading: isProvidersLoading, refetch: refetchProviders } = useProviders({ enabled: true }, { enabled });
	const { models, isLoading: isModelsLoading, refetch: refetchModels } = useModels({ enabled: true }, { fetchEnabled: enabled });
	const { isLoading: isPinsLoading, isRefreshing: isPinsRefreshing, isMutating: isPinsMutating, pinnedIds: rawPinnedIds, refetch: refetchPinnedModels, togglePin } = usePins("model", { enabled });
	const { tagSelection, selectedTags, tagFilter, toggleTag, resetTags } = useModelTagFilter();
	const pinnedIds = (0, import_react.useMemo)(() => rawPinnedIds.filter(isUniqueModelId), [rawPinnedIds]);
	const availableProviders = providers;
	const availableModels = models;
	const baseModelFilter = (0, import_react.useCallback)((model, provider) => filter?.(model, provider) ?? true, [filter]);
	const includeAgentOnlyProviders = (0, import_react.useMemo)(() => modelFilterIncludesAgentOnlyProviders(filter), [filter]);
	const agentOnlyProviderIds = (0, import_react.useMemo)(() => new Set(availableProviders.filter(isExternalCliProvider).map((p) => p.id)), [availableProviders]);
	const sortedProviders = (0, import_react.useMemo)(() => sortProvidersByPriority(availableProviders, prioritizedProviderIds), [availableProviders, prioritizedProviderIds]);
	const modelsByProvider = (0, import_react.useMemo)(() => {
		const providerById = new Map(sortedProviders.map((provider) => [provider.id, provider]));
		const grouped = /* @__PURE__ */ new Map();
		for (const model of availableModels) {
			const provider = providerById.get(model.providerId);
			if (!provider || !baseModelFilter(model, provider)) continue;
			if (!includeAgentOnlyProviders && agentOnlyProviderIds.has(model.providerId)) continue;
			const existingModels = grouped.get(model.providerId);
			if (existingModels) existingModels.push(model);
			else grouped.set(model.providerId, [model]);
		}
		return grouped;
	}, [
		availableModels,
		agentOnlyProviderIds,
		baseModelFilter,
		includeAgentOnlyProviders,
		sortedProviders
	]);
	const availableTags = (0, import_react.useMemo)(() => {
		if (modelsByProvider.size === 0) return EMPTY_TAGS;
		return MODEL_SELECTOR_TAGS.filter((tag) => sortedProviders.some((provider) => (modelsByProvider.get(provider.id) ?? []).some((model) => modelMatchesDisplayTag(model, tag, provider))));
	}, [modelsByProvider, sortedProviders]);
	const selectableModelsById = (0, import_react.useMemo)(() => {
		const entries = [...modelsByProvider.values()].flat().map((model) => [model.id, model]);
		return new Map(entries);
	}, [modelsByProvider]);
	const resolvedSelectedModelIds = (0, import_react.useMemo)(() => {
		const nextSelectedIds = [];
		const seen = /* @__PURE__ */ new Set();
		for (const modelId of selectedModelIds) {
			if (seen.has(modelId) || !selectableModelsById.has(modelId)) continue;
			seen.add(modelId);
			nextSelectedIds.push(modelId);
		}
		return nextSelectedIds;
	}, [selectableModelsById, selectedModelIds]);
	const visibleSelectedModelIdSet = (0, import_react.useMemo)(() => {
		if (maxSelectedCount == null) return new Set(resolvedSelectedModelIds);
		return new Set(resolvedSelectedModelIds.slice(0, maxSelectedCount));
	}, [maxSelectedCount, resolvedSelectedModelIds]);
	const searchFilter = (0, import_react.useCallback)((provider) => {
		const providerModels = modelsByProvider.get(provider.id) ?? [];
		if (searchText.trim()) {
			const providerDisplayName = getProviderDisplayName(provider);
			return sortBy(providerModels.flatMap((model) => {
				const searchScore = getModelSearchScore(searchText, model, provider, providerDisplayName);
				return searchScore === null ? [] : [{
					model,
					searchScore
				}];
			}), [
				"searchScore",
				"model.group",
				"model.name"
			]).map(({ model }) => model);
		}
		return sortModels(providerModels);
	}, [modelsByProvider, searchText]);
	const createModelItem = (0, import_react.useCallback)((model, provider, isPinned, showIdentifier) => {
		const modelId = model.id;
		return {
			key: isPinned ? `${modelId}_pinned` : modelId,
			type: "model",
			model,
			provider,
			modelId,
			modelIdentifier: getModelIdentifier(model),
			isPinned,
			showIdentifier
		};
	}, []);
	const { listItems, modelItems } = (0, import_react.useMemo)(() => {
		const items = [];
		const pinnedIdSet = new Set(pinnedIds);
		const providerById = new Map(sortedProviders.map((provider) => [provider.id, provider]));
		const finalModelFilter = (model) => {
			const provider = providerById.get(model.providerId);
			return (!showTagFilter || tagFilter(model, provider)) && baseModelFilter(model, provider);
		};
		const tagFilteredModelsByProvider = new Map(sortedProviders.map((provider) => [provider.id, searchFilter(provider).filter((model) => !showTagFilter ? true : tagFilter(model, provider))]));
		const duplicateNamesByProvider = new Map(sortedProviders.map((provider) => [provider.id, getDuplicateModelNames(tagFilteredModelsByProvider.get(provider.id) ?? [])]));
		const globalDuplicateNames = getDuplicateModelNames(sortedProviders.flatMap((provider) => tagFilteredModelsByProvider.get(provider.id) ?? []));
		if (searchText.length === 0 && showPinnedModels && pinnedIdSet.size > 0) {
			const pinnedItems = pinnedIds.flatMap((modelId) => {
				const model = selectableModelsById.get(modelId);
				const provider = model ? providerById.get(model.providerId) : void 0;
				if (!model || !provider || !finalModelFilter(model)) return [];
				return [createModelItem(model, provider, true, (duplicateNamesByProvider.get(provider.id)?.has(model.name) ?? false) || globalDuplicateNames.has(model.name))];
			});
			if (pinnedItems.length > 0) {
				items.push({
					key: "pinned-group",
					type: "group",
					title: "pinned",
					groupKind: "pinned"
				});
				items.push(...pinnedItems);
			}
		}
		sortedProviders.forEach((provider) => {
			const filteredModels = (tagFilteredModelsByProvider.get(provider.id) ?? []).filter((model) => !showPinnedModels || searchText.length > 0 || !pinnedIdSet.has(model.id));
			if (filteredModels.length === 0) return;
			items.push({
				key: `provider-${provider.id}`,
				type: "group",
				title: getProviderDisplayName(provider),
				groupKind: "provider",
				provider,
				canNavigateToSettings: isProviderSettingsListVisibleProvider(provider)
			});
			items.push(...filteredModels.map((model) => createModelItem(model, provider, showPinnedModels && pinnedIdSet.has(model.id), (duplicateNamesByProvider.get(provider.id)?.has(model.name) ?? false) || globalDuplicateNames.has(model.name))));
		});
		return {
			listItems: items,
			modelItems: items.filter((item) => item.type === "model")
		};
	}, [
		baseModelFilter,
		createModelItem,
		pinnedIds,
		searchFilter,
		selectableModelsById,
		searchText.length,
		showPinnedModels,
		showTagFilter,
		sortedProviders,
		tagFilter
	]);
	return {
		availableTags,
		isLoading: isProvidersLoading || isModelsLoading || isPinsLoading,
		isPinActionDisabled: isPinsLoading || isPinsRefreshing || isPinsMutating,
		listItems,
		modelItems,
		pinnedIds,
		refetchModels,
		refetchPinnedModels,
		refetchProviders,
		resetTags,
		resolvedSelectedModelIds,
		selectableModelsById,
		selectedTags,
		sortedProviders,
		tagSelection,
		togglePin,
		toggleTag,
		visibleSelectedModelIdSet
	};
}
var logger = loggerService.withContext("ModelSelector");
var ITEM_HEIGHT = 36;
var MODEL_SELECTOR_LIST_VERTICAL_PADDING = 8;
var ROW_TAG_SIZE = 9;
var FILTER_TAG_SIZE = 10;
var FILTER_TAG_FADE_WIDTH_PX = 24;
var MODEL_SELECTOR_CONTENT_HEIGHT = 440;
var MODEL_SELECTOR_WIDTH = 400;
var DEFAULT_PRIORITIZED_PROVIDER_IDS = [];
var MODEL_SELECTOR_NAVIGATION_KEYS = new Set([
	"ArrowUp",
	"ArrowDown",
	"PageUp",
	"PageDown",
	"Enter"
]);
var DEFAULT_MODEL_SELECTOR_KEYBOARD_PAGE_SIZE = Math.max(1, Math.floor(MODEL_SELECTOR_CONTENT_HEIGHT / ITEM_HEIGHT));
var estimateModelSelectorItemSize = () => ITEM_HEIGHT;
function dedupeSelectedIds(ids) {
	const nextSelectedIds = [];
	const seen = /* @__PURE__ */ new Set();
	for (const modelId of ids) {
		if (seen.has(modelId)) continue;
		seen.add(modelId);
		nextSelectedIds.push(modelId);
	}
	return nextSelectedIds;
}
function getMalformedSelectionWarning({ multiple, selectionType, value }) {
	if (multiple) {
		if (selectionType === "id") return value !== void 0 && !Array.isArray(value) ? {
			message: "normalizeSelectedIdsFromValue: multiple=true but value is not an array; coercing to []",
			context: {
				selectionType: "id",
				valueType: typeof value
			}
		} : null;
		return value !== void 0 && !Array.isArray(value) ? {
			message: "normalizeSelectedIdsFromValue: multiple=true but value is not an array; coercing to []",
			context: {
				selectionType: "model",
				valueType: typeof value
			}
		} : null;
	}
	if (selectionType === "id") return value !== void 0 && Array.isArray(value) ? {
		message: "normalizeSelectedIdsFromValue: multiple=false but value is an array; coercing to []",
		context: {
			selectionType: "id",
			valueLength: value.length
		}
	} : null;
	return value !== void 0 && Array.isArray(value) ? {
		message: "normalizeSelectedIdsFromValue: multiple=false but value is an array; coercing to []",
		context: {
			selectionType: "model",
			valueLength: value.length
		}
	} : null;
}
function normalizeSelectedIdsFromValue({ multiple, selectionType, value }) {
	if (multiple) {
		if (selectionType === "id") return dedupeSelectedIds(Array.isArray(value) ? value.filter((modelId) => typeof modelId === "string" && isUniqueModelId(modelId)) : []);
		return dedupeSelectedIds((Array.isArray(value) ? value : []).flatMap((candidate) => typeof candidate === "object" && candidate?.id ? [candidate.id] : []));
	}
	if (selectionType === "id") return typeof value === "string" && isUniqueModelId(value) ? dedupeSelectedIds([value]) : [];
	return typeof value === "object" && !Array.isArray(value) && value?.id ? dedupeSelectedIds([value.id]) : [];
}
function modelsFromSelectedIds(selectedIds, selectableModelsById) {
	return selectedIds.flatMap((modelId) => {
		const model = selectableModelsById.get(modelId);
		return model ? [model] : [];
	});
}
function ModelRow({ item, isFocused, onPin, onSelect, showCheckbox, showPinActions, isPinActionDisabled, isSelected, detailPortalContainer, t }) {
	const icon = useIcon(getModelLogoRef(item.model, item.provider.id));
	const rowTags = (0, import_react.useMemo)(() => getModelDisplayTags(item.model, void 0, item.provider), [item.model, item.provider]);
	const providerName = getProviderDisplayName(item.provider);
	const leading = icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(icon.Avatar, {
		"data-ui": "ui.model-row",
		size: 24,
		className: "border border-border"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
		size: "sm",
		className: "border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: head(item.model.name) || "M" })
	});
	const checkbox = showCheckbox ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
		checked: isSelected,
		size: "sm",
		tabIndex: -1,
		"aria-hidden": "true",
		className: "ml-1",
		"data-testid": `model-selector-checkbox-${item.modelId}`
	}) : null;
	const trailing = rowTags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.model-row",
		className: "ml-2 flex h-[18px] max-w-[65%] shrink-0 items-center justify-end gap-1 overflow-hidden",
		children: rowTags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelTag, {
			tag,
			size: ROW_TAG_SIZE,
			showLabel: false,
			showTooltip: true,
			className: "h-full items-center"
		}, `${item.key}-${tag}`))
	}) : null;
	const pinAction = showPinActions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelectorRowActionButton, {
		disabled: isPinActionDisabled,
		"aria-label": t(item.isPinned ? "models.action.unpin" : "models.action.pin"),
		className: "size-4 rounded-sm hover:bg-transparent",
		pinned: item.isPinned,
		selected: isSelected,
		onClick: () => onPin(item.modelId),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3" })
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelectorDetailCard, {
		item,
		provider: item.provider,
		portalContainer: detailPortalContainer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModelSelectorRow, {
			selected: isSelected,
			focused: isFocused,
			showSelectedIndicator: !showCheckbox && isSelected,
			checkbox,
			leading,
			trailing,
			actions: pinAction,
			onSelect: () => onSelect(item),
			rootProps: { className: "pr-0.5" },
			optionProps: { "data-testid": `model-selector-item-${item.modelId}` },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 max-w-full shrink-0 truncate",
					title: item.model.name,
					children: item.model.name
				}),
				item.showIdentifier && item.modelIdentifier ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 max-w-[45%] shrink truncate font-mono text-muted-foreground text-[10px]",
					title: item.modelIdentifier,
					children: item.modelIdentifier
				}) : null,
				item.isPinned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-[1_999_0%] truncate text-muted-foreground text-xs",
					title: providerName,
					children: ["| ", providerName]
				})
			]
		})
	});
}
function ModelSelectorFilterTags({ tags, tagSelection, onToggleTag }) {
	const scrollRef = (0, import_react.useRef)(null);
	const [fadeState, setFadeState] = (0, import_react.useState)({
		left: false,
		right: false
	});
	const updateFadeState = (0, import_react.useCallback)(() => {
		const element = scrollRef.current;
		if (!element) return;
		const left = element.scrollLeft > 0;
		const right = element.scrollLeft + element.clientWidth < element.scrollWidth - 1;
		setFadeState((prev) => prev.left === left && prev.right === right ? prev : {
			left,
			right
		});
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		updateFadeState();
	});
	(0, import_react.useLayoutEffect)(() => {
		const element = scrollRef.current;
		if (!element || typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(updateFadeState);
		observer.observe(element);
		return () => observer.disconnect();
	}, [updateFadeState]);
	const maskImage = fadeState.left && fadeState.right ? `linear-gradient(to right, transparent, black ${FILTER_TAG_FADE_WIDTH_PX}px, black calc(100% - ${FILTER_TAG_FADE_WIDTH_PX}px), transparent)` : fadeState.right ? `linear-gradient(to right, black calc(100% - ${FILTER_TAG_FADE_WIDTH_PX}px), transparent)` : fadeState.left ? `linear-gradient(to right, transparent, black ${FILTER_TAG_FADE_WIDTH_PX}px)` : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.model-selector-filter-tags",
		ref: scrollRef,
		onScroll: updateFadeState,
		style: maskImage ? { maskImage } : void 0,
		className: "flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		"data-testid": "model-selector-filter-tags",
		children: tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelTag, {
			tag,
			size: FILTER_TAG_SIZE,
			showLabel: true,
			inactive: !tagSelection[tag],
			onClick: () => onToggleTag(tag),
			className: "h-5 shrink-0 items-center transition-colors"
		}, `filter-${tag}`))
	});
}
function ModelSelector(props) {
	const { trigger, open: openProp, onOpenChange, filter, showTagFilter = true, showPinnedModels = true, showPinActions = true, prioritizedProviderIds = DEFAULT_PRIORITIZED_PROVIDER_IDS, side = "bottom", align = "start", sideOffset = 4, contentClassName, portalContainer, mountStrategy = "destroy", multiSelectMode: multiSelectModeProp, defaultMultiSelectMode = false, onMultiSelectModeChange, onSettingsNavigate, shortcut } = props;
	const { t } = useTranslation();
	const multiple = props.multiple;
	const noneOptionLabel = props.multiple ? void 0 : props.noneOptionLabel;
	const selectionType = props.selectionType;
	const selectedValue = props.value;
	const [internalOpen, setInternalOpen] = (0, import_react.useState)(false);
	const [internalMultiSelectMode, setInternalMultiSelectMode] = (0, import_react.useState)(defaultMultiSelectMode);
	const [shellKey, setShellKey] = (0, import_react.useState)(0);
	const [searchText, setSearchText] = (0, import_react.useState)("");
	const deferredSearchText = (0, import_react.useDeferredValue)(searchText);
	const [focusedItemKey, _setFocusedItemKey] = (0, import_react.useState)("");
	const [hasActivatedLazyData, setHasActivatedLazyData] = (0, import_react.useState)(openProp === true && mountStrategy === "lazy-keep");
	const setFocusedItemKey = (0, import_react.useCallback)((key) => {
		(0, import_react.startTransition)(() => _setFocusedItemKey(key));
	}, []);
	const inputRef = (0, import_react.useRef)(null);
	const listRef = (0, import_react.useRef)(null);
	const skipNextFocusScroll = (0, import_react.useRef)(false);
	const ignoreNextMultiSelectCloseRef = (0, import_react.useRef)(false);
	const ignoreNextMultiSelectCloseTimerRef = (0, import_react.useRef)(null);
	const focusScrollFrameRef = (0, import_react.useRef)(null);
	const malformedSelectionWarningKeyRef = (0, import_react.useRef)(null);
	const hasActiveTagFilterRef = (0, import_react.useRef)(false);
	const [renderedOpen, setRenderedOpen] = (0, import_react.useState)(false);
	const isScrollingRef = (0, import_react.useRef)(false);
	const scrollIdleTimerRef = (0, import_react.useRef)(null);
	const handleListScroll = (0, import_react.useCallback)(() => {
		isScrollingRef.current = true;
		if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
		scrollIdleTimerRef.current = setTimeout(() => {
			isScrollingRef.current = false;
		}, 150);
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
			if (ignoreNextMultiSelectCloseTimerRef.current) clearTimeout(ignoreNextMultiSelectCloseTimerRef.current);
			if (focusScrollFrameRef.current !== null) window.cancelAnimationFrame(focusScrollFrameRef.current);
		};
	}, []);
	const open = openProp ?? internalOpen;
	const dataEnabled = open || mountStrategy === "lazy-keep" && hasActivatedLazyData;
	if (renderedOpen !== open) {
		setRenderedOpen(open);
		if (!open && mountStrategy === "lazy-keep" && hasActiveTagFilterRef.current) setShellKey((key) => key + 1);
	}
	const multiSelectMode = multiple ? multiSelectModeProp ?? internalMultiSelectMode : false;
	const multiSelectModeRef = (0, import_react.useRef)(multiSelectMode);
	const wasDataEnabledRef = (0, import_react.useRef)(false);
	multiSelectModeRef.current = multiSelectMode;
	const setOpen = (0, import_react.useCallback)((nextOpen) => {
		if (!nextOpen && ignoreNextMultiSelectCloseRef.current) {
			ignoreNextMultiSelectCloseRef.current = false;
			if (ignoreNextMultiSelectCloseTimerRef.current) {
				clearTimeout(ignoreNextMultiSelectCloseTimerRef.current);
				ignoreNextMultiSelectCloseTimerRef.current = null;
			}
			return;
		}
		if (openProp === void 0) setInternalOpen(nextOpen);
		onOpenChange?.(nextOpen);
	}, [onOpenChange, openProp]);
	const handleShortcut = (0, import_react.useCallback)(() => setOpen(true), [setOpen]);
	const setMultiSelectMode = (0, import_react.useCallback)((nextEnabled) => {
		if (!multiple) return;
		multiSelectModeRef.current = nextEnabled;
		if (multiSelectModeProp === void 0) setInternalMultiSelectMode(nextEnabled);
		onMultiSelectModeChange?.(nextEnabled);
	}, [
		multiSelectModeProp,
		multiple,
		onMultiSelectModeChange
	]);
	const rawSelectedModelIds = (0, import_react.useMemo)(() => normalizeSelectedIdsFromValue({
		multiple,
		selectionType,
		value: selectedValue
	}), [
		multiple,
		selectionType,
		selectedValue
	]);
	const { availableTags, isLoading, isPinActionDisabled, listItems, modelItems, refetchModels, refetchPinnedModels, refetchProviders, resetTags, resolvedSelectedModelIds, selectableModelsById, selectedTags, tagSelection, togglePin, toggleTag, visibleSelectedModelIdSet } = useModelSelectorData({
		enabled: dataEnabled,
		selectedModelIds: rawSelectedModelIds,
		maxSelectedCount: multiple && multiSelectMode ? void 0 : 1,
		searchText: deferredSearchText,
		filter,
		prioritizedProviderIds,
		showPinnedModels,
		showTagFilter
	});
	const listItemsRef = (0, import_react.useRef)(listItems);
	const modelItemsRef = (0, import_react.useRef)(modelItems);
	const visibleSelectedModelIdSetRef = (0, import_react.useRef)(visibleSelectedModelIdSet);
	listItemsRef.current = listItems;
	modelItemsRef.current = modelItems;
	visibleSelectedModelIdSetRef.current = visibleSelectedModelIdSet;
	hasActiveTagFilterRef.current = selectedTags.length > 0;
	const listHeight = (0, import_react.useMemo)(() => MODEL_SELECTOR_LIST_VERTICAL_PADDING + Math.max(1, listItems.length) * ITEM_HEIGHT, [listItems.length]);
	const pageSize = DEFAULT_MODEL_SELECTOR_KEYBOARD_PAGE_SIZE;
	const selectedTagsKey = (0, import_react.useMemo)(() => selectedTags.join("|"), [selectedTags]);
	const getListItemKey = (0, import_react.useCallback)((index) => listItems[index].key, [listItems]);
	const isStickyListItem = (0, import_react.useCallback)((index) => listItems[index].type === "group", [listItems]);
	const emitSelection = (0, import_react.useCallback)((nextSelectedIds) => {
		if (props.multiple) {
			if (props.selectionType === "id") {
				props.onSelect(nextSelectedIds);
				return;
			}
			props.onSelect(modelsFromSelectedIds(nextSelectedIds, selectableModelsById));
			return;
		}
		const nextSelectedId = nextSelectedIds[0];
		if (props.selectionType === "id") {
			props.onSelect(nextSelectedId);
			return;
		}
		props.onSelect(nextSelectedId ? selectableModelsById.get(nextSelectedId) : void 0);
	}, [
		props.multiple,
		props.selectionType,
		props.onSelect,
		selectableModelsById
	]);
	const focusItem = (0, import_react.useCallback)((key, align$1 = "auto") => {
		setFocusedItemKey(key);
		const index = listItemsRef.current.findIndex((item) => item.key === key);
		if (index >= 0) {
			if (focusScrollFrameRef.current !== null) window.cancelAnimationFrame(focusScrollFrameRef.current);
			focusScrollFrameRef.current = window.requestAnimationFrame(() => {
				focusScrollFrameRef.current = null;
				listRef.current?.scrollToIndex(index, { align: align$1 });
			});
		}
	}, [setFocusedItemKey]);
	const focusItemBeforePaint = (0, import_react.useCallback)((key, align$1 = "auto") => {
		setFocusedItemKey(key);
		const index = listItemsRef.current.findIndex((item) => item.key === key);
		if (index < 0) return;
		if (focusScrollFrameRef.current !== null) {
			window.cancelAnimationFrame(focusScrollFrameRef.current);
			focusScrollFrameRef.current = null;
		}
		listRef.current?.scrollToIndex(index, { align: align$1 });
	}, [setFocusedItemKey]);
	const handleSelectItem = (0, import_react.useCallback)((item) => {
		skipNextFocusScroll.current = true;
		if (multiple && multiSelectModeRef.current) {
			ignoreNextMultiSelectCloseRef.current = true;
			if (ignoreNextMultiSelectCloseTimerRef.current) clearTimeout(ignoreNextMultiSelectCloseTimerRef.current);
			ignoreNextMultiSelectCloseTimerRef.current = setTimeout(() => {
				ignoreNextMultiSelectCloseRef.current = false;
				ignoreNextMultiSelectCloseTimerRef.current = null;
			}, 0);
			emitSelection(computeToggledSelection(rawSelectedModelIds, item.modelId));
			return;
		}
		emitSelection([item.modelId]);
		setOpen(false);
	}, [
		emitSelection,
		multiple,
		rawSelectedModelIds,
		setOpen
	]);
	const handleClose = (0, import_react.useCallback)(() => {
		setOpen(false);
	}, [setOpen]);
	const pendingCloseActionRef = (0, import_react.useRef)(null);
	const runPendingCloseAction = (0, import_react.useCallback)(() => {
		const action = pendingCloseActionRef.current;
		if (!action) return;
		pendingCloseActionRef.current = null;
		action();
	}, []);
	const closeBeforeAction = (0, import_react.useCallback)((action) => {
		pendingCloseActionRef.current = action;
		if (!open) {
			setShellKey((key) => key + 1);
			runPendingCloseAction();
			return;
		}
		if (mountStrategy !== "lazy-keep" || !hasActiveTagFilterRef.current) setShellKey((key) => key + 1);
		setOpen(false);
	}, [
		mountStrategy,
		open,
		runPendingCloseAction,
		setOpen
	]);
	const closeBeforeSettingsNavigation = (0, import_react.useCallback)((path) => {
		closeBeforeAction(() => {
			const navigate = () => openSettingsTab(path);
			if (onSettingsNavigate) {
				onSettingsNavigate(navigate);
				return;
			}
			navigate();
		});
	}, [closeBeforeAction, onSettingsNavigate]);
	const handleNavigateToProviderSettings = (0, import_react.useCallback)((providerId) => {
		closeBeforeSettingsNavigation(`/settings/provider?id=${encodeURIComponent(providerId)}`);
	}, [closeBeforeSettingsNavigation]);
	const handleNavigateToCustomModelSettings = (0, import_react.useCallback)(() => {
		closeBeforeSettingsNavigation("/settings/provider");
	}, [closeBeforeSettingsNavigation]);
	const handleSelectNone = (0, import_react.useCallback)(() => {
		emitSelection([]);
		setOpen(false);
	}, [emitSelection, setOpen]);
	const handleTogglePin = (0, import_react.useCallback)((modelId) => {
		if (isPinActionDisabled) return;
		skipNextFocusScroll.current = true;
		togglePin(modelId).catch((error) => {
			logger.error("Failed to toggle model pin", error, { modelId });
			toast.error(t("common.error"));
		});
	}, [
		isPinActionDisabled,
		t,
		togglePin
	]);
	const handleMultiSelectModeChange = (0, import_react.useCallback)((nextEnabled) => {
		if (!multiple) return;
		skipNextFocusScroll.current = true;
		setMultiSelectMode(nextEnabled);
		if (nextEnabled) return;
		const collapsed = computeCollapsedSelection(resolvedSelectedModelIds, rawSelectedModelIds);
		if (collapsed !== null) emitSelection(collapsed);
	}, [
		emitSelection,
		multiple,
		rawSelectedModelIds,
		resolvedSelectedModelIds,
		setMultiSelectMode
	]);
	useModelListKeyboardNav({
		open,
		focusedItemKey,
		items: modelItems,
		onClose: handleClose,
		onFocusItem: focusItem,
		onSelectItem: handleSelectItem,
		pageSize
	});
	(0, import_react.useEffect)(() => {
		if (!isDev) return;
		const warning = getMalformedSelectionWarning({
			multiple,
			selectionType,
			value: selectedValue
		});
		if (!warning) return;
		const warningKey = `${warning.message}:${JSON.stringify(warning.context)}`;
		if (malformedSelectionWarningKeyRef.current === warningKey) return;
		malformedSelectionWarningKeyRef.current = warningKey;
		logger.warn(warning.message, warning.context);
	}, [
		multiple,
		selectionType,
		selectedValue
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
		return () => window.clearTimeout(timer);
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (open && mountStrategy === "lazy-keep") setHasActivatedLazyData(true);
	}, [mountStrategy, open]);
	(0, import_react.useEffect)(() => {
		const wasDataEnabled = wasDataEnabledRef.current;
		wasDataEnabledRef.current = dataEnabled;
		if (!open || !wasDataEnabled) return;
		refetchModels();
		refetchProviders();
		if (showPinnedModels) refetchPinnedModels();
	}, [
		dataEnabled,
		open,
		refetchModels,
		refetchPinnedModels,
		refetchProviders,
		showPinnedModels
	]);
	(0, import_react.useEffect)(() => {
		if (!open) {
			skipNextFocusScroll.current = false;
			setSearchText("");
			setFocusedItemKey("");
			resetTags();
		}
	}, [
		open,
		resetTags,
		setFocusedItemKey
	]);
	(0, import_react.useEffect)(() => {
		if (open) return;
		const frameId = window.requestAnimationFrame(runPendingCloseAction);
		return () => window.cancelAnimationFrame(frameId);
	}, [open, runPendingCloseAction]);
	(0, import_react.useLayoutEffect)(() => {
		const currentModelItems = modelItemsRef.current;
		if (!open || isLoading || currentModelItems.length === 0) return;
		if (skipNextFocusScroll.current) {
			skipNextFocusScroll.current = false;
			return;
		}
		const targetKey = deferredSearchText || selectedTagsKey.length > 0 ? currentModelItems[0]?.key : currentModelItems.find((item) => visibleSelectedModelIdSetRef.current.has(item.modelId))?.key ?? currentModelItems[0]?.key;
		if (targetKey) focusItemBeforePaint(targetKey, "start");
	}, [
		deferredSearchText,
		focusItemBeforePaint,
		isLoading,
		open,
		selectedTagsKey
	]);
	const rowRenderer = (0, import_react.useCallback)((item, detailPortalContainer) => {
		if (item.type === "group") {
			const groupTitle = item.groupKind === "pinned" ? t("models.pinned") : item.provider ? getProviderDisplayName(item.provider) : "";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "ui.model-selector",
				className: "group flex h-7 items-center gap-1 bg-popover px-4 text-[11px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-4 items-center truncate leading-4",
					children: groupTitle
				}), item.provider && item.canNavigateToSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					content: t("navigate.provider_settings"),
					delay: 500,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						"aria-label": t("navigate.provider_settings"),
						className: "size-4 shrink-0 translate-y-[2px] p-0 text-muted-foreground opacity-0 transition hover:opacity-100! group-hover:opacity-60",
						onClick: (event) => {
							event.stopPropagation();
							handleNavigateToProviderSettings(item.provider.id);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "block size-3" })
					})
				})]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "ui.model-selector",
			className: "px-1 py-0.5",
			onMouseEnter: () => {
				if (isScrollingRef.current) return;
				setFocusedItemKey(item.key);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelRow, {
				item,
				isFocused: focusedItemKey === item.key,
				isPinActionDisabled,
				isSelected: visibleSelectedModelIdSet.has(item.modelId),
				onPin: handleTogglePin,
				onSelect: handleSelectItem,
				showCheckbox: multiple && multiSelectMode,
				showPinActions,
				detailPortalContainer,
				t
			})
		});
	}, [
		focusedItemKey,
		handleNavigateToProviderSettings,
		handleSelectItem,
		handleTogglePin,
		isPinActionDisabled,
		multiple,
		multiSelectMode,
		setFocusedItemKey,
		showPinActions,
		t,
		visibleSelectedModelIdSet
	]);
	const handleSearchKeyDown = (0, import_react.useCallback)((event) => {
		if (MODEL_SELECTOR_NAVIGATION_KEYS.has(event.key)) event.preventDefault();
	}, []);
	const searchConfig = (0, import_react.useMemo)(() => ({
		inputRef,
		value: searchText,
		onChange: setSearchText,
		placeholder: t("models.search.placeholder"),
		dataTestId: "model-selector-search",
		onKeyDown: handleSearchKeyDown
	}), [
		handleSearchKeyDown,
		searchText,
		t
	]);
	const filterContent = (0, import_react.useMemo)(() => {
		if (!showTagFilter || availableTags.length === 0) return;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelectorFilterTags, {
			tags: availableTags,
			tagSelection,
			onToggleTag: toggleTag
		});
	}, [
		availableTags,
		showTagFilter,
		tagSelection,
		toggleTag
	]);
	const multiSelectConfig = (0, import_react.useMemo)(() => multiple ? {
		label: t("models.multi_select.label"),
		ariaLabel: t("models.multi_select.label"),
		tooltip: t("models.multi_select.tooltip"),
		checked: multiSelectMode,
		placement: "search-badge",
		onCheckedChange: handleMultiSelectModeChange,
		dataTestId: "model-selector-multi-select-switch",
		rowTestId: "model-selector-multi-select-row"
	} : void 0, [
		handleMultiSelectModeChange,
		multiSelectMode,
		multiple,
		t
	]);
	const bottomActions = (0, import_react.useMemo)(() => {
		const actions = [{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-3.5" }),
			label: t("models.action.configure_custom"),
			onClick: handleNavigateToCustomModelSettings
		}];
		if (noneOptionLabel) actions.push({
			type: "selectable",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash, { className: "size-3.5" }),
			label: noneOptionLabel,
			selected: rawSelectedModelIds.length === 0,
			onClick: handleSelectNone
		});
		return actions;
	}, [
		handleNavigateToCustomModelSettings,
		handleSelectNone,
		noneOptionLabel,
		rawSelectedModelIds.length,
		t
	]);
	const initialListHeight = Math.min(listHeight, MODEL_SELECTOR_CONTENT_HEIGHT);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [shortcut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutBinding, {
		shortcut,
		onTrigger: handleShortcut
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectorShell, {
		trigger,
		open,
		onOpenChange: setOpen,
		search: searchConfig,
		filterContent,
		multiSelect: multiSelectConfig,
		width: MODEL_SELECTOR_WIDTH,
		side,
		align,
		sideOffset,
		portalContainer,
		contentClassName,
		mountStrategy,
		contentHeight: MODEL_SELECTOR_CONTENT_HEIGHT,
		bottomAction: bottomActions,
		"data-testid": "model-selector-content",
		children: ({ availableListHeight, portalContainer: detailPortalContainer }) => {
			const visibleListHeight = availableListHeight === void 0 ? initialListHeight : availableListHeight;
			const virtualListHeight = Math.max(0, visibleListHeight - MODEL_SELECTOR_LIST_VERTICAL_PADDING);
			return listItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "ui.model-selector.listbox",
				className: "py-1",
				role: "listbox",
				"aria-multiselectable": multiple && multiSelectMode,
				style: { height: visibleListHeight },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicVirtualList_default, {
					ref: listRef,
					list: listItems,
					size: virtualListHeight,
					estimateSize: estimateModelSelectorItemSize,
					getItemKey: getListItemKey,
					isSticky: isStickyListItem,
					scrollPaddingStart: ITEM_HEIGHT,
					onScroll: handleListScroll,
					overscan: 6,
					children: (item) => rowRenderer(item, detailPortalContainer)
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "ui.model-selector.model-selector-empty",
				className: "flex items-center justify-center px-3 py-4 text-muted-foreground text-xs",
				style: { height: visibleListHeight },
				"data-testid": "model-selector-empty",
				children: t("models.no_matches")
			});
		}
	}, shellKey)] });
}
function ShortcutBinding({ shortcut, onTrigger }) {
	useCommandHandler(shortcut, onTrigger);
	return null;
}
export { ModelSelectorRowActionButton as a, SelectorShell as c, ModelSelectorRow as i, useAgentModelFilter as l, usePins as n, getProviderDisplayName as o, MODEL_SELECTOR_ROW_CHECKBOX_CLASS as r, DEFAULT_SELECTOR_CONTENT_HEIGHT as s, ModelSelector as t };
