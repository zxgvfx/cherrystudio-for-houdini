import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, n as useComposedRefs, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as useLayoutEffect2 } from "./dist-CuwIZpzZ.js";
import { t as ChevronDown } from "./chevron-down-BkfPRkug.js";
import { t as composeEventHandlers } from "./dist-DOdXVW1s.js";
import { t as createContextScope } from "./dist-C32tb75D.js";
import { t as useControllableState } from "./dist-UecRqrJ2.js";
import { t as Primitive } from "./dist-CRi1L997.js";
import { t as Presence } from "./dist-BloQ98wg.js";
import { n as createCollection, t as useDirection } from "./dist-BOf8p4Yz.js";
import { t as useId } from "./dist-vGheaeBs.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: COLLAPSIBLE_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleProvider, {
		scope: __scopeCollapsible,
		disabled,
		contentId: useId(),
		open,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState$1(open),
			"data-disabled": disabled ? "" : void 0,
			...collapsibleProps,
			ref: forwardedRef
		})
	});
});
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, ...triggerProps } = props;
	const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-controls": context.contentId,
		"aria-expanded": context.open || false,
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		disabled: context.disabled,
		...triggerProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
	});
});
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = import_react.forwardRef((props, forwardedRef) => {
	const { forceMount, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleContentImpl, {
			...contentProps,
			ref: forwardedRef,
			present
		})
	});
});
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCollapsible, present, children, ...contentProps } = props;
	const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
	const [isPresent, setIsPresent] = import_react.useState(present);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const heightRef = import_react.useRef(0);
	const height = heightRef.current;
	const widthRef = import_react.useRef(0);
	const width = widthRef.current;
	const isOpen = context.open || isPresent;
	const isMountAnimationPreventedRef = import_react.useRef(isOpen);
	const originalStylesRef = import_react.useRef(void 0);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	useLayoutEffect2(() => {
		const node = ref.current;
		if (node) {
			originalStylesRef.current = originalStylesRef.current || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			heightRef.current = rect.height;
			widthRef.current = rect.width;
			if (!isMountAnimationPreventedRef.current) {
				node.style.transitionDuration = originalStylesRef.current.transitionDuration;
				node.style.animationName = originalStylesRef.current.animationName;
			}
			setIsPresent(present);
		}
	}, [context.open, present]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": getState$1(context.open),
		"data-disabled": context.disabled ? "" : void 0,
		id: context.contentId,
		hidden: !isOpen,
		...contentProps,
		ref: composedRefs,
		style: {
			[`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
			[`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
			...props.style
		},
		children: isOpen && children
	});
});
function getState$1(open) {
	return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = [
	"Home",
	"End",
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [createCollectionScope, createCollapsibleScope]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = import_react.forwardRef((props, forwardedRef) => {
	const { type, ...accordionProps } = props;
	const singleProps = accordionProps;
	const multipleProps = accordionProps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeAccordion,
		children: type === "multiple" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplMultiple, {
			...multipleProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplSingle, {
			...singleProps,
			ref: forwardedRef
		})
	});
});
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(ACCORDION_NAME, { collapsible: false });
var AccordionImplSingle = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, collapsible = false, ...accordionSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemOpen: setValue,
		onItemClose: import_react.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionSingleProps,
				ref: forwardedRef
			})
		})
	});
});
var AccordionImplMultiple = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...accordionMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: ACCORDION_NAME
	});
	const handleItemOpen = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleItemClose = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionValueProvider, {
		scope: props.__scopeAccordion,
		value,
		onItemOpen: handleItemOpen,
		onItemClose: handleItemClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
			scope: props.__scopeAccordion,
			collapsible: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImpl, {
				...accordionMultipleProps,
				ref: forwardedRef
			})
		})
	});
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
	const composedRefs = useComposedRefs(import_react.useRef(null), forwardedRef);
	const getItems = useCollection(__scopeAccordion);
	const isDirectionLTR = useDirection(dir) === "ltr";
	const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
		if (!ACCORDION_KEYS.includes(event.key)) return;
		const target = event.target;
		const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
		const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
		const triggerCount = triggerCollection.length;
		if (triggerIndex === -1) return;
		event.preventDefault();
		let nextIndex = triggerIndex;
		const homeIndex = 0;
		const endIndex = triggerCount - 1;
		const moveNext = () => {
			nextIndex = triggerIndex + 1;
			if (nextIndex > endIndex) nextIndex = homeIndex;
		};
		const movePrev = () => {
			nextIndex = triggerIndex - 1;
			if (nextIndex < homeIndex) nextIndex = endIndex;
		};
		switch (event.key) {
			case "Home":
				nextIndex = homeIndex;
				break;
			case "End":
				nextIndex = endIndex;
				break;
			case "ArrowRight":
				if (orientation === "horizontal") if (isDirectionLTR) moveNext();
				else movePrev();
				break;
			case "ArrowDown":
				if (orientation === "vertical") moveNext();
				break;
			case "ArrowLeft":
				if (orientation === "horizontal") if (isDirectionLTR) movePrev();
				else moveNext();
				break;
			case "ArrowUp":
				if (orientation === "vertical") movePrev();
				break;
		}
		triggerCollection[nextIndex % triggerCount].ref.current?.focus();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionImplProvider, {
		scope: __scopeAccordion,
		disabled,
		direction: dir,
		orientation,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: __scopeAccordion,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...accordionProps,
				"data-orientation": orientation,
				ref: composedRefs,
				onKeyDown: disabled ? void 0 : handleKeyDown
			})
		})
	});
});
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, value, ...accordionItemProps } = props;
	const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
	const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	const triggerId = useId();
	const open = value && valueContext.value.includes(value) || false;
	const disabled = accordionContext.disabled || props.disabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItemProvider, {
		scope: __scopeAccordion,
		open,
		disabled,
		triggerId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			"data-orientation": accordionContext.orientation,
			"data-state": getState(open),
			...collapsibleScope,
			...accordionItemProps,
			ref: forwardedRef,
			disabled,
			open,
			onOpenChange: (open2) => {
				if (open2) valueContext.onItemOpen(value);
				else valueContext.onItemClose(value);
			}
		})
	});
});
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...headerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h3, {
		"data-orientation": accordionContext.orientation,
		"data-state": getState(itemContext.open),
		"data-disabled": itemContext.disabled ? "" : void 0,
		...headerProps,
		ref: forwardedRef
	});
});
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...triggerProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeAccordion,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
			"aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
			"data-orientation": accordionContext.orientation,
			id: itemContext.triggerId,
			...collapsibleScope,
			...triggerProps,
			ref: forwardedRef
		})
	});
});
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAccordion, ...contentProps } = props;
	const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
	const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
	const collapsibleScope = useCollapsibleScope(__scopeAccordion);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		role: "region",
		"aria-labelledby": itemContext.triggerId,
		"data-orientation": accordionContext.orientation,
		...collapsibleScope,
		...contentProps,
		ref: forwardedRef,
		style: {
			["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
			["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
			...props.style
		}
	});
});
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
function Accordion({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-ui": "part:accordion",
		"data-slot": "accordion",
		...mergeUiProps(props, "part:accordion")
	});
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		"data-ui": "part:accordion-item",
		"data-slot": "accordion-item",
		className: cn("border-border/60 border-b first:border-t last:border-b-0", className),
		...mergeUiProps(props, "part:accordion-item")
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
		className: "flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
			"data-ui": "part:accordion-trigger",
			"data-slot": "accordion-trigger",
			className: cn("flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-semibold leading-4 text-foreground/90", "transition-colors outline-none", "focus-visible:bg-accent/50", "disabled:pointer-events-none disabled:opacity-50", "[&[data-state=open]>svg]:rotate-180", className),
			...mergeUiProps(props, "part:accordion-trigger"),
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none size-4 shrink-0 text-foreground/60 transition-transform duration-200" })]
		})
	});
}
function AccordionContent({ className, contentClassName, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-ui": "part:accordion-content",
		"data-slot": "accordion-content",
		className: cn("data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm leading-5 text-foreground/60", contentClassName),
		...mergeUiProps(props, "part:accordion-content"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("pt-2 pb-4", className),
			children
		})
	});
}
export { AccordionTrigger as i, AccordionContent as n, AccordionItem as r, Accordion as t };
