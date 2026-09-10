import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_react_dom } from "./react-dom-D5lMhlFn.js";
import { r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { t as X } from "./x-CpgRfh3_.js";
import { i as usePortalContainer } from "./portal-container-Cc9NoOZQ.js";
import { n as motion } from "./react-BxKGY5j2.js";
import { t as AnimatePresence } from "./AnimatePresence-CugxpPoP.js";
import { t as scrollbar_default } from "./scrollbar-DXc_RNdR.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_react_dom = require_react_dom();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function PageSidePanel({ open, onClose, children, title, header, footer, side = "right", showCloseButton = true, closeLabel = "Close", backdropClassName, contentClassName, headerClassName, bodyClassName, footerClassName, closeButtonClassName }) {
	const headerContent = header ?? (title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-ui": "ui.page-side-panel",
		className: "font-semibold text-base text-foreground",
		children: title
	}) : null);
	const hasHeader = !!headerContent || showCloseButton;
	const headerId = (0, import_react.useId)();
	const panelRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const closedByPointerDownRef = (0, import_react.useRef)(false);
	const portalContainer = usePortalContainer() ?? (typeof document === "undefined" ? null : document.body);
	const isScopedPortal = typeof document !== "undefined" && portalContainer !== null && portalContainer !== document.body;
	const handleClose = (0, import_react.useCallback)((event) => {
		event?.preventDefault();
		event?.stopPropagation();
		onClose();
	}, [onClose]);
	(0, import_react.useEffect)(() => {
		if (open) {
			closedByPointerDownRef.current = false;
			triggerRef.current = document.activeElement;
			requestAnimationFrame(() => {
				panelRef.current?.focus();
			});
		} else {
			triggerRef.current?.focus();
			triggerRef.current = null;
		}
	}, [open]);
	const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		"data-ui": "ui.page-side-panel.action.close part:page-side-panel-backdrop",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .15 },
		"data-slot": "page-side-panel-backdrop",
		className: cn(isScopedPortal ? "absolute inset-0" : "fixed inset-0", "z-60 bg-black/50", backdropClassName),
		onClick: handleClose
	}, "backdrop"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		"data-ui": "ui.page-side-panel part:page-side-panel",
		ref: panelRef,
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": headerContent ? headerId : void 0,
		tabIndex: -1,
		onKeyDown: (e) => {
			if (e.key === "Escape") handleClose(e);
		},
		initial: { x: side === "right" ? "100%" : "-100%" },
		animate: { x: 0 },
		exit: { x: side === "right" ? "100%" : "-100%" },
		transition: {
			duration: .18,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		"data-slot": "page-side-panel",
		className: cn(isScopedPortal ? "absolute" : "fixed", "top-3 bottom-3 z-70 flex w-100 flex-col overflow-hidden rounded-3xl bg-card text-card-foreground shadow-xl outline-none", side === "right" ? "right-3" : "left-3", contentClassName),
		children: [
			hasHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-ui": "ui.page-side-panel.page-side-panel-header part:page-side-panel-header",
				"data-slot": "page-side-panel-header",
				className: cn("flex shrink-0 items-center justify-between px-6 pt-6 pb-3", headerClassName),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: headerContent ? headerId : void 0,
					className: "min-w-0 flex flex-1 items-center",
					children: headerContent
				}), showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-ui": "part:page-side-panel-close",
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					onPointerDown: (event) => {
						closedByPointerDownRef.current = true;
						handleClose(event);
					},
					onClick: (event) => {
						if (closedByPointerDownRef.current) {
							closedByPointerDownRef.current = false;
							event.preventDefault();
							event.stopPropagation();
							return;
						}
						handleClose(event);
					},
					"aria-label": closeLabel,
					"data-slot": "page-side-panel-close",
					className: cn("ml-3 shrink-0 rounded-md opacity-70 shadow-none transition-opacity hover:bg-transparent hover:opacity-100", closeButtonClassName),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
				"data-ui": "part:page-side-panel-body",
				"data-slot": "page-side-panel-body",
				className: cn("min-h-0 flex-1 space-y-4 px-6 py-4", bodyClassName),
				children
			}),
			footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-ui": "ui.page-side-panel.page-side-panel-footer part:page-side-panel-footer",
				"data-slot": "page-side-panel-footer",
				className: cn("shrink-0 space-y-2.5 px-6 pt-3 pb-6", footerClassName),
				children: footer
			})
		]
	}, "panel")] }) });
	return portalContainer ? (0, import_react_dom.createPortal)(panel, portalContainer) : panel;
}
function PageSidePanelSection({ title, actions, children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.page-side-panel-section",
		className: cn("flex flex-col gap-3", className),
		...mergeUiProps(props, "ui.page-side-panel-section"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-foreground text-sm",
				children: title
			}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 items-center gap-1",
				children: actions
			})]
		}), children]
	});
}
function PageSidePanelItem({ title, description, action, children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.page-side-panel-item",
		className: cn("flex flex-col gap-2", className),
		...mergeUiProps(props, "ui.page-side-panel-item"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground text-sm",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground text-xs",
					children: description
				})]
			}), action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0",
				children: action
			})]
		}), children]
	});
}
export { PageSidePanelItem as n, PageSidePanelSection as r, PageSidePanel as t };
