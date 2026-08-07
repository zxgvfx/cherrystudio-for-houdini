import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { a as mergeUiProps, i as UiDataSlot, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { a as X } from "./toast-DfLEw4mF.js";
import { _ as createContextScope, a as useControllableState, c as useId, d as useDismissableLayerSurface, h as createSlot, n as PortalContainerProvider, o as Presence, p as Primitive, r as useDialogPortalContainer, s as Portal, u as DismissableLayer, v as useComposedRefs, y as composeEventHandlers$1 } from "./portal-container-CZkqeItp.js";
import { t as composeEventHandlers } from "./dist-DOdXVW1s.js";
import { a as FocusScope, i as useFocusGuards, n as Combination_default, t as hideOthers } from "./es2015-DmjbZU9-.js";
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
	const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const triggerRef = import_react.useRef(null);
	const contentRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DIALOG_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, {
		scope: __scopeDialog,
		triggerRef,
		contentRef,
		contentId: useId(),
		titleId: useId(),
		descriptionId: useId(),
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children
	});
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...triggerProps } = props;
	const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
	const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": context.open,
		"aria-controls": context.open ? context.contentId : void 0,
		"data-state": getState(context.open),
		...triggerProps,
		ref: composedTriggerRef,
		onClick: composeEventHandlers$1(props.onClick, context.onOpenToggle)
	});
});
DialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, { forceMount: void 0 });
var DialogPortal$1 = (props) => {
	const { __scopeDialog, forceMount, children, container } = props;
	const context = useDialogContext(PORTAL_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopeDialog,
		forceMount,
		children: import_react.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
				asChild: true,
				container,
				children: child
			})
		}))
	});
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
	return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlayImpl, {
			...overlayProps,
			ref: forwardedRef
		})
	}) : null;
});
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
	const composedRefs = useComposedRefs(forwardedRef, useDismissableLayerSurface());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Combination_default, {
		as: Slot,
		allowPinchZoom: true,
		shards: [context.contentRef],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState(context.open),
			...overlayProps,
			ref: composedRefs,
			style: {
				pointerEvents: "auto",
				...overlayProps.style
			}
		})
	});
});
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentModal, {
			...contentProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentNonModal, {
			...contentProps,
			ref: forwardedRef
		})
	});
});
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
	import_react.useEffect(() => {
		const content = contentRef.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: context.open,
		onCloseAutoFocus: composeEventHandlers$1(props.onCloseAutoFocus, (event) => {
			event.preventDefault();
			context.triggerRef.current?.focus();
		}),
		onPointerDownOutside: composeEventHandlers$1(props.onPointerDownOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
		}),
		onFocusOutside: composeEventHandlers$1(props.onFocusOutside, (event) => event.preventDefault())
	});
});
var DialogContentNonModal = import_react.forwardRef((props, forwardedRef) => {
	const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
	const hasInteractedOutsideRef = import_react.useRef(false);
	const hasPointerDownOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		onCloseAutoFocus: (event) => {
			props.onCloseAutoFocus?.(event);
			if (!event.defaultPrevented) {
				if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
				event.preventDefault();
			}
			hasInteractedOutsideRef.current = false;
			hasPointerDownOutsideRef.current = false;
		},
		onInteractOutside: (event) => {
			props.onInteractOutside?.(event);
			if (!event.defaultPrevented) {
				hasInteractedOutsideRef.current = true;
				if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
			}
			const target = event.target;
			if (context.triggerRef.current?.contains(target)) event.preventDefault();
			if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
		}
	});
});
var DialogContentImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME, __scopeDialog);
	useFocusGuards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
		asChild: true,
		loop: true,
		trapped: trapFocus,
		onMountAutoFocus: onOpenAutoFocus,
		onUnmountAutoFocus: onCloseAutoFocus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
			role: "dialog",
			id: context.contentId,
			"aria-describedby": context.descriptionId,
			"aria-labelledby": context.titleId,
			"data-state": getState(context.open),
			...contentProps,
			ref: forwardedRef,
			deferPointerDownOutside: true,
			onDismiss: () => context.onOpenChange(false)
		})
	}) });
});
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...titleProps } = props;
	const context = useDialogContext(TITLE_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h2, {
		id: context.titleId,
		...titleProps,
		ref: forwardedRef
	});
});
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...descriptionProps } = props;
	const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.p, {
		id: context.descriptionId,
		...descriptionProps,
		ref: forwardedRef
	});
});
DialogDescription$1.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeDialog, ...closeProps } = props;
	const context = useDialogContext(CLOSE_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		...closeProps,
		ref: forwardedRef,
		onClick: composeEventHandlers$1(props.onClick, () => context.onOpenChange(false))
	});
});
DialogClose$1.displayName = CLOSE_NAME;
function getState(open) {
	return open ? "open" : "closed";
}
function Dialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		"data-slot": "dialog",
		...props
	});
}
function DialogTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger$1, {
		"data-ui": "part:dialog-trigger",
		"data-slot": "dialog-trigger",
		...mergeUiProps(props, "part:dialog-trigger")
	});
}
function DialogPortal({ container, ...props }) {
	const defaultPortalContainer = useDialogPortalContainer();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		container: container ?? defaultPortalContainer,
		...props
	});
}
function DialogClose({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
		"data-ui": "part:dialog-close",
		"data-slot": "dialog-close",
		...mergeUiProps(props, "part:dialog-close")
	});
}
function DialogOverlay({ className, onPointerDown, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		"data-ui": "part:dialog-overlay",
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 z-[80] bg-black/50", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:animation-duration-[220ms] data-[state=open]:ease-[cubic-bezier(0.16,1,0.3,1)]", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:animation-duration-[200ms] data-[state=closed]:ease-[cubic-bezier(0.4,0,1,1)]", "fill-mode-both motion-reduce:animate-none", className),
		onPointerDown: composeEventHandlers(onPointerDown, (event) => event.stopPropagation(), { checkForDefaultPrevented: false }),
		...mergeUiProps(props, "part:dialog-overlay")
	});
}
var dialogContentSizeClass = {
	sm: "sm:max-w-sm",
	default: "sm:max-w-lg",
	lg: "sm:max-w-xl",
	xl: "sm:max-w-[720px]"
};
function DialogContent({ className, children, closeOnOverlayClick = true, showCloseButton = true, motion = "directional", overlayClassName, onPointerDown, size = "default", ref, ...props }) {
	const [contentElement, setContentElement] = import_react.useState(null);
	const handleRef = import_react.useCallback((node) => {
		setContentElement(node);
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
				className: overlayClassName,
				onClick: (event) => {
					if (!closeOnOverlayClick) event.preventDefault();
				}
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
			"data-ui": "part:dialog-content",
			ref: handleRef,
			"data-slot": "dialog-content",
			className: cn("bg-card text-card-foreground fixed top-[50%] left-[50%] z-[80] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border-0 p-6 shadow-xl", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-99 data-[state=open]:animation-duration-[260ms] data-[state=open]:ease-[cubic-bezier(0.16,1,0.3,1)]", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-99 data-[state=closed]:animation-duration-[200ms] data-[state=closed]:ease-[cubic-bezier(0.4,0,1,1)]", motion === "directional" && "data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4", "fill-mode-both motion-reduce:animate-none", dialogContentSizeClass[size], className),
			onPointerDown: composeEventHandlers(onPointerDown, (event) => event.stopPropagation(), { checkForDefaultPrevented: false }),
			...mergeUiProps(props, "part:dialog-content"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PortalContainerProvider, {
				container: contentElement,
				children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose$1, {
					"data-ui": "part:dialog-close",
					"data-slot": "dialog-close",
					className: "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus-visible:bg-accent focus-visible:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Close"
					})]
				})]
			})
		})]
	});
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.dialog-header part:dialog-header",
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-2 text-center sm:text-left", className),
		...mergeUiProps(props, "ui.dialog-header part:dialog-header")
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.dialog-footer part:dialog-footer",
		"data-slot": "dialog-footer",
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...mergeUiProps(props, "ui.dialog-footer part:dialog-footer")
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-ui": "part:dialog-title",
		"data-slot": "dialog-title",
		className: cn("text-lg leading-none font-semibold", className),
		...mergeUiProps(props, "part:dialog-title")
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-ui": "part:dialog-description",
		"data-slot": "dialog-description",
		className: cn("text-muted-foreground text-sm", className),
		...mergeUiProps(props, "part:dialog-description")
	});
}
export { DialogFooter as a, DialogTrigger as c, DialogOverlay$1 as d, DialogPortal$1 as f, DialogDescription as i, Dialog$1 as l, DialogClose as n, DialogHeader as o, DialogContent as r, DialogTitle as s, Dialog as t, DialogContent$1 as u };
