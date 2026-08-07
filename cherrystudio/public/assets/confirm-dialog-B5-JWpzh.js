import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { i as UiDataSlot } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { a as DialogFooter, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ConfirmDialog({ open, onOpenChange, title, description, content, confirmText = "Confirm", cancelText = "Cancel", onConfirm, destructive = false, confirmLoading = false, contentClassName, overlayClassName }) {
	const handleConfirm = import_react.useCallback(async () => {
		await onConfirm?.();
		onOpenChange?.(false);
	}, [onConfirm, onOpenChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			motion: "fade-scale",
			showCloseButton: false,
			className: contentClassName,
			overlayClassName,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title }), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: description })] }),
				content,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: cancelText
					}) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: destructive ? "destructive" : "default",
					onClick: handleConfirm,
					loading: confirmLoading,
					children: confirmText
				})] })
			]
		})
	});
}
export { ConfirmDialog as t };
