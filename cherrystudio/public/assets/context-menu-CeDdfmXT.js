import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Check } from "./check-6rPNpD2R.js";
import { t as ChevronRight } from "./chevron-right-DT7pu8Yo.js";
import { _ as createContextScope, a as useControllableState, i as usePortalContainer, p as Primitive, y as composeEventHandlers } from "./portal-container-Cc9NoOZQ.js";
import { t as cva } from "./dist-D9lByzdX.js";
import { _ as createMenuScope, a as Group, c as Label, d as RadioItem, f as Root3, g as SubTrigger, h as SubContent, i as Content2$1, l as Portal, m as Sub, n as Arrow2, o as Item2$1, p as Separator, r as CheckboxItem, s as ItemIndicator, t as Anchor2, u as RadioGroup } from "./dist-DymrEc9g.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var CONTEXT_MENU_NAME = "ContextMenu";
var [createContextMenuContext, createContextMenuScope] = createContextScope(CONTEXT_MENU_NAME, [createMenuScope]);
var useMenuScope = createMenuScope();
var [ContextMenuProvider, useContextMenuContext] = createContextMenuContext(CONTEXT_MENU_NAME);
var ContextMenu$1 = (props) => {
	const { __scopeContextMenu, children, onOpenChange, open: openProp, dir, modal = true } = props;
	const hasInteractedRef = import_react.useRef(false);
	{
		const hasWarnedRef = import_react.useRef(false);
		import_react.useEffect(() => {
			if (openProp === true && !hasInteractedRef.current && !hasWarnedRef.current) {
				hasWarnedRef.current = true;
				console.warn("ContextMenu: The `open` prop has been set to `true` before the user has interacted with the trigger, so its position is indeterminate. This is likely unintended and will result in the menu being anchored to the top-left corner of the viewport.");
			}
		}, [openProp]);
	}
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: false,
		onChange: onOpenChange,
		caller: CONTEXT_MENU_NAME
	});
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuProvider, {
		scope: __scopeContextMenu,
		open,
		onOpenChange: setOpen,
		modal,
		hasInteractedRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, {
			...menuScope,
			dir,
			open,
			onOpenChange: setOpen,
			modal,
			children
		})
	});
};
ContextMenu$1.displayName = CONTEXT_MENU_NAME;
var TRIGGER_NAME = "ContextMenuTrigger";
var ContextMenuTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, disabled = false, ...triggerProps } = props;
	const context = useContextMenuContext(TRIGGER_NAME, __scopeContextMenu);
	const menuScope = useMenuScope(__scopeContextMenu);
	const [point, setPoint] = import_react.useState({
		x: 0,
		y: 0
	});
	const virtualRef = import_react.useMemo(() => ({ current: { getBoundingClientRect: () => DOMRect.fromRect({
		width: 0,
		height: 0,
		...point
	}) } }), [point]);
	const longPressTimerRef = import_react.useRef(0);
	const clearLongPress = import_react.useCallback(() => window.clearTimeout(longPressTimerRef.current), []);
	const handleOpen = (event) => {
		context.hasInteractedRef.current = true;
		setPoint({
			x: event.clientX,
			y: event.clientY
		});
		context.onOpenChange(true);
	};
	import_react.useEffect(() => clearLongPress, [clearLongPress]);
	import_react.useEffect(() => void (disabled && clearLongPress()), [disabled, clearLongPress]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor2, {
		...menuScope,
		virtualRef
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-state": context.open ? "open" : "closed",
		"data-disabled": disabled ? "" : void 0,
		...triggerProps,
		ref: forwardedRef,
		style: {
			WebkitTouchCallout: "none",
			...props.style
		},
		onContextMenu: disabled ? props.onContextMenu : composeEventHandlers(props.onContextMenu, (event) => {
			clearLongPress();
			handleOpen(event);
			event.preventDefault();
		}),
		onPointerDown: disabled ? props.onPointerDown : composeEventHandlers(props.onPointerDown, whenTouchOrPen((event) => {
			clearLongPress();
			if (context.open) context.onOpenChange(false);
			longPressTimerRef.current = window.setTimeout(() => handleOpen(event), 700);
		})),
		onPointerMove: disabled ? props.onPointerMove : composeEventHandlers(props.onPointerMove, whenTouchOrPen(clearLongPress)),
		onPointerCancel: disabled ? props.onPointerCancel : composeEventHandlers(props.onPointerCancel, whenTouchOrPen(clearLongPress)),
		onPointerUp: disabled ? props.onPointerUp : composeEventHandlers(props.onPointerUp, whenTouchOrPen(clearLongPress))
	})] });
});
ContextMenuTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "ContextMenuPortal";
var ContextMenuPortal = (props) => {
	const { __scopeContextMenu, ...portalProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...menuScope,
		...portalProps
	});
};
ContextMenuPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "ContextMenuContent";
var ContextMenuContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...contentProps } = props;
	const context = useContextMenuContext(CONTENT_NAME, __scopeContextMenu);
	const menuScope = useMenuScope(__scopeContextMenu);
	const hasInteractedOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		...menuScope,
		...contentProps,
		ref: forwardedRef,
		side: "right",
		sideOffset: 2,
		align: "start",
		onCloseAutoFocus: (event) => {
			props.onCloseAutoFocus?.(event);
			if (!event.defaultPrevented && hasInteractedOutsideRef.current) event.preventDefault();
			hasInteractedOutsideRef.current = false;
		},
		onInteractOutside: (event) => {
			props.onInteractOutside?.(event);
			if (!event.defaultPrevented && !context.modal) hasInteractedOutsideRef.current = true;
		},
		style: {
			...props.style,
			"--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
ContextMenuContent$1.displayName = CONTENT_NAME;
var GROUP_NAME = "ContextMenuGroup";
var ContextMenuGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...groupProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
		...menuScope,
		...groupProps,
		ref: forwardedRef
	});
});
ContextMenuGroup.displayName = GROUP_NAME;
var LABEL_NAME = "ContextMenuLabel";
var ContextMenuLabel = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...labelProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		...menuScope,
		...labelProps,
		ref: forwardedRef
	});
});
ContextMenuLabel.displayName = LABEL_NAME;
var ITEM_NAME = "ContextMenuItem";
var ContextMenuItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...itemProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2$1, {
		...menuScope,
		...itemProps,
		ref: forwardedRef
	});
});
ContextMenuItem$1.displayName = ITEM_NAME;
var CHECKBOX_ITEM_NAME = "ContextMenuCheckboxItem";
var ContextMenuCheckboxItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...checkboxItemProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxItem, {
		...menuScope,
		...checkboxItemProps,
		ref: forwardedRef
	});
});
ContextMenuCheckboxItem$1.displayName = CHECKBOX_ITEM_NAME;
var RADIO_GROUP_NAME = "ContextMenuRadioGroup";
var ContextMenuRadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...radioGroupProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
		...menuScope,
		...radioGroupProps,
		ref: forwardedRef
	});
});
ContextMenuRadioGroup.displayName = RADIO_GROUP_NAME;
var RADIO_ITEM_NAME = "ContextMenuRadioItem";
var ContextMenuRadioItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...radioItemProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioItem, {
		...menuScope,
		...radioItemProps,
		ref: forwardedRef
	});
});
ContextMenuRadioItem.displayName = RADIO_ITEM_NAME;
var INDICATOR_NAME = "ContextMenuItemIndicator";
var ContextMenuItemIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...itemIndicatorProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator, {
		...menuScope,
		...itemIndicatorProps,
		ref: forwardedRef
	});
});
ContextMenuItemIndicator.displayName = INDICATOR_NAME;
var SEPARATOR_NAME = "ContextMenuSeparator";
var ContextMenuSeparator$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...separatorProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		...menuScope,
		...separatorProps,
		ref: forwardedRef
	});
});
ContextMenuSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "ContextMenuArrow";
var ContextMenuArrow = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...arrowProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow2, {
		...menuScope,
		...arrowProps,
		ref: forwardedRef
	});
});
ContextMenuArrow.displayName = ARROW_NAME;
var SUB_NAME = "ContextMenuSub";
var ContextMenuSub$1 = (props) => {
	const { __scopeContextMenu, children, onOpenChange, open: openProp, defaultOpen } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: SUB_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, {
		...menuScope,
		open,
		onOpenChange: setOpen,
		children
	});
};
ContextMenuSub$1.displayName = SUB_NAME;
var SUB_TRIGGER_NAME = "ContextMenuSubTrigger";
var ContextMenuSubTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...triggerItemProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTrigger, {
		...menuScope,
		...triggerItemProps,
		ref: forwardedRef
	});
});
ContextMenuSubTrigger$1.displayName = SUB_TRIGGER_NAME;
var SUB_CONTENT_NAME = "ContextMenuSubContent";
var ContextMenuSubContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeContextMenu, ...subContentProps } = props;
	const menuScope = useMenuScope(__scopeContextMenu);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent, {
		...menuScope,
		...subContentProps,
		ref: forwardedRef,
		style: {
			...props.style,
			"--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
ContextMenuSubContent$1.displayName = SUB_CONTENT_NAME;
function whenTouchOrPen(handler) {
	return (event) => event.pointerType !== "mouse" ? handler(event) : void 0;
}
var Root2 = ContextMenu$1;
var Trigger = ContextMenuTrigger$1;
var Portal2 = ContextMenuPortal;
var Content2 = ContextMenuContent$1;
var Item2 = ContextMenuItem$1;
var CheckboxItem2 = ContextMenuCheckboxItem$1;
var ItemIndicator2 = ContextMenuItemIndicator;
var Separator2 = ContextMenuSeparator$1;
var Sub2 = ContextMenuSub$1;
var SubTrigger2 = ContextMenuSubTrigger$1;
var SubContent2 = ContextMenuSubContent$1;
var menuContentStyles = cn("z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md [-webkit-app-region:no-drag]", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95");
var menuSubContentStyles = cn("z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg [-webkit-app-region:no-drag]", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95");
var menuItemVariants = cva(cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden", "focus:bg-accent focus:text-accent-foreground", "data-disabled:pointer-events-none data-disabled:opacity-50", "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "[&_svg:not([class*='text-'])]:text-muted-foreground"), {
	variants: {
		variant: {
			default: "",
			destructive: "text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20 data-[variant=destructive]:[&_svg:not([class*='text-'])]:text-destructive!"
		},
		inset: {
			true: "pl-8",
			false: ""
		}
	},
	defaultVariants: {
		variant: "default",
		inset: false
	}
});
var ContextMenuOpeningPointerUpGuardContext = import_react.createContext(null);
function ContextMenu({ onOpenChange, ...props }) {
	const shouldStopOpeningPointerUpRef = import_react.useRef(false);
	const clearOpeningPointerUpListenerRef = import_react.useRef(null);
	const clearOpeningPointerUpTimerRef = import_react.useRef(null);
	const clearOpeningPointerUp = import_react.useCallback(() => {
		shouldStopOpeningPointerUpRef.current = false;
		clearOpeningPointerUpListenerRef.current?.();
		clearOpeningPointerUpListenerRef.current = null;
		if (clearOpeningPointerUpTimerRef.current !== null) {
			window.clearTimeout(clearOpeningPointerUpTimerRef.current);
			clearOpeningPointerUpTimerRef.current = null;
		}
	}, []);
	const pointerUpGuard = import_react.useMemo(() => ({
		consumeOpeningPointerUp: () => {
			const shouldStop = shouldStopOpeningPointerUpRef.current;
			clearOpeningPointerUp();
			return shouldStop;
		},
		markOpeningPointerUp: () => {
			shouldStopOpeningPointerUpRef.current = true;
			clearOpeningPointerUpListenerRef.current?.();
			const handleOpeningPointerUp = () => clearOpeningPointerUp();
			window.addEventListener("pointerup", handleOpeningPointerUp, { once: true });
			clearOpeningPointerUpListenerRef.current = () => {
				window.removeEventListener("pointerup", handleOpeningPointerUp);
			};
			if (clearOpeningPointerUpTimerRef.current !== null) window.clearTimeout(clearOpeningPointerUpTimerRef.current);
			clearOpeningPointerUpTimerRef.current = window.setTimeout(clearOpeningPointerUp, 1e3);
		}
	}), [clearOpeningPointerUp]);
	const handleOpenChange = import_react.useCallback((open) => {
		if (!open) clearOpeningPointerUp();
		onOpenChange?.(open);
	}, [clearOpeningPointerUp, onOpenChange]);
	import_react.useEffect(() => clearOpeningPointerUp, [clearOpeningPointerUp]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuOpeningPointerUpGuardContext, {
		value: pointerUpGuard,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
			"data-slot": "context-menu",
			onOpenChange: handleOpenChange,
			...props
		})
	});
}
function ContextMenuTrigger({ onContextMenu, disabled, ...props }) {
	const pointerUpGuard = import_react.use(ContextMenuOpeningPointerUpGuardContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-ui": "part:context-menu-trigger",
		"data-slot": "context-menu-trigger",
		disabled,
		onContextMenu: (event) => {
			if (!disabled) pointerUpGuard?.markOpeningPointerUp();
			onContextMenu?.(event);
		},
		...mergeUiProps(props, "part:context-menu-trigger")
	});
}
function ContextMenuSub({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub2, {
		"data-slot": "context-menu-sub",
		...props
	});
}
function stopOpeningPointerUp(event, pointerUpGuard) {
	const isOpeningPointerUp = pointerUpGuard?.consumeOpeningPointerUp() ?? false;
	if (event.button !== 2 && !isOpeningPointerUp) return;
	event.preventDefault();
	event.stopPropagation();
}
function ContextMenuSubTrigger({ className, inset, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
		"data-ui": "part:context-menu-sub-trigger",
		"data-slot": "context-menu-sub-trigger",
		"data-inset": inset,
		className: cn(menuItemVariants({ inset }), "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className),
		...mergeUiProps(props, "part:context-menu-sub-trigger"),
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto size-4" })]
	});
}
function ContextMenuSubContent({ className, onPointerUpCapture, ...props }) {
	const pointerUpGuard = import_react.use(ContextMenuOpeningPointerUpGuardContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
		"data-ui": "part:context-menu-sub-content",
		"data-slot": "context-menu-sub-content",
		className: cn(menuSubContentStyles, "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
		onPointerUpCapture: (event) => {
			onPointerUpCapture?.(event);
			stopOpeningPointerUp(event, pointerUpGuard);
		},
		...mergeUiProps(props, "part:context-menu-sub-content")
	});
}
function ContextMenuContent({ className, onPointerUpCapture, portalContainer, ...props }) {
	const pointerUpGuard = import_react.use(ContextMenuOpeningPointerUpGuardContext);
	const defaultPortalContainer = usePortalContainer();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
		container: portalContainer ?? defaultPortalContainer ?? void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
			"data-ui": "part:context-menu-content",
			"data-slot": "context-menu-content",
			className: cn(menuContentStyles, "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
			onPointerUpCapture: (event) => {
				onPointerUpCapture?.(event);
				stopOpeningPointerUp(event, pointerUpGuard);
			},
			...mergeUiProps(props, "part:context-menu-content")
		})
	});
}
function ContextMenuItem({ className, inset, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		"data-ui": "part:context-menu-item",
		"data-slot": "context-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn(menuItemVariants({
			variant,
			inset
		}), className),
		...mergeUiProps(props, "part:context-menu-item")
	});
}
function ContextMenuCheckboxItem({ className, children, checked, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
		"data-ui": "part:context-menu-checkbox-item",
		"data-slot": "context-menu-checkbox-item",
		className: cn(menuItemVariants({ inset: true }), "pr-2", className),
		checked,
		...mergeUiProps(props, "part:context-menu-checkbox-item"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pointer-events-none absolute left-2 flex size-4 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
		}), children]
	});
}
function ContextMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		"data-ui": "part:context-menu-separator",
		"data-slot": "context-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...mergeUiProps(props, "part:context-menu-separator")
	});
}
function ContextMenuShortcut({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "ui.context-menu-shortcut part:context-menu-shortcut",
		"data-slot": "context-menu-shortcut",
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...mergeUiProps(props, "ui.context-menu-shortcut part:context-menu-shortcut")
	});
}
function ContextMenuItemContent(props) {
	const { icon, children, badge, className } = props;
	const shortcut = "shortcut" in props ? props.shortcut : void 0;
	const hasSubmenu = "hasSubmenu" in props ? props.hasSubmenu : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "ui.context-menu-item-content",
		className: cn("flex min-w-0 flex-1 items-center gap-2", className),
		children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-4 shrink-0",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 flex-1 truncate",
			children
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-ui": "ui.context-menu-item-content",
		className: "ml-auto flex items-center gap-1",
		children: [
			badge,
			shortcut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuShortcut, { children: shortcut }),
			hasSubmenu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })
		]
	})] });
}
export { ContextMenuItemContent as a, ContextMenuSubContent as c, ContextMenuItem as i, ContextMenuSubTrigger as l, ContextMenuCheckboxItem as n, ContextMenuSeparator as o, ContextMenuContent as r, ContextMenuSub as s, ContextMenu as t, ContextMenuTrigger as u };
