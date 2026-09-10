import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { r as formatErrorMessage } from "./error-CskkREu_.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { n as UiDataSlot, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DwmxJH-S.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as CircleAlert } from "./circle-alert-CTZPqbzd.js";
import { n as createPopup } from "./popup-fJcKiA2S.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var PopupContainer = ({ open, resolve, title, content, okText, cancelText, danger, icon, action }) => {
	const { t } = useTranslation();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleCancel = (0, import_react.useCallback)(() => {
		if (loading) return;
		resolve(false);
	}, [loading, resolve]);
	const handleConfirm = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			await action();
		} catch (error) {
			toast.error({
				title: t("common.error"),
				description: formatErrorMessage(error)
			});
			setLoading(false);
			return;
		}
		resolve(true);
	}, [
		action,
		resolve,
		t
	]);
	const handleOpenChange = (0, import_react.useCallback)((next) => {
		if (!next) handleCancel();
	}, [handleCancel]);
	const leadingIcon = icon === null ? null : icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-5 shrink-0 text-warning" });
	const okLabel = okText ?? (danger ? t("common.delete") : t("common.confirm"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			showCloseButton: false,
			closeOnOverlayClick: !loading,
			overlayClassName: "z-[90]",
			className: cn("confirm-popup z-[90] gap-5 sm:max-w-lg"),
			onInteractOutside: (event) => {
				if (loading) event.preventDefault();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [leadingIcon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-base leading-6",
							children: title
						}) : null, content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("wrap-anywhere mt-2 min-w-0 max-w-full text-muted-foreground text-sm leading-5", title ? "" : "mt-0"),
								children: content
							}) })
						}) : null]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: handleCancel,
				disabled: loading,
				children: cancelText ?? t("common.cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: danger ? "destructive" : "default",
				onClick: handleConfirm,
				loading,
				children: okLabel
			})] })]
		})
	});
};
var ConfirmActionPopup_default = createPopup(PopupContainer, { dismissResult: false });
export { ConfirmActionPopup_default as t };
