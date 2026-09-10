import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { i as formatErrorMessageWithPrefix } from "./error-CskkREu_.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { a as DialogFooter, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DwmxJH-S.js";
import { t as Input } from "./input-DWk3xPNN.js";
import { i as FieldError } from "./field-e1WfHFF8.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function CreateGroupDialog({ open, onCreate, onOpenChange, errorMessage, isSubmitting = false, namePlaceholder, nameRequiredMessage, submitLabel, title }) {
	const { t } = useTranslation();
	const [name, setName] = (0, import_react.useState)("");
	const [hasAttemptedSubmit, setHasAttemptedSubmit] = (0, import_react.useState)(false);
	const [isSubmittingInternally, setIsSubmittingInternally] = (0, import_react.useState)(false);
	const [submitError, setSubmitError] = (0, import_react.useState)(null);
	const submitting = isSubmitting || isSubmittingInternally;
	(0, import_react.useEffect)(() => {
		if (open) return;
		setName("");
		setHasAttemptedSubmit(false);
		setIsSubmittingInternally(false);
		setSubmitError(null);
	}, [open]);
	const handleOpenChange = (nextOpen) => {
		if (submitting) return;
		onOpenChange(nextOpen);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (submitting) return;
		const normalizedName = name.trim();
		setHasAttemptedSubmit(true);
		setSubmitError(null);
		if (!normalizedName) return;
		setIsSubmittingInternally(true);
		try {
			await onCreate(normalizedName);
			onOpenChange(false);
		} catch (error) {
			setSubmitError(formatErrorMessageWithPrefix(error, errorMessage ?? t("common.group.create_failed")));
		} finally {
			setIsSubmittingInternally(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			size: "sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title ?? t("common.group.create") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-ui": "ui.create-group-dialog.action.submit",
				className: "flex flex-col gap-4",
				onSubmit: handleSubmit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoFocus: true,
					maxLength: 64,
					value: name,
					"aria-label": t("common.name"),
					"aria-invalid": hasAttemptedSubmit && !name.trim(),
					placeholder: namePlaceholder ?? t("common.group.name_placeholder"),
					disabled: submitting,
					onChange: (event) => {
						setName(event.target.value);
						setHasAttemptedSubmit(false);
						setSubmitError(null);
					}
				}), hasAttemptedSubmit && !name.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: nameRequiredMessage ?? t("common.group.name_required") })
				}) : submitError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { children: submitError })
				}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					disabled: submitting,
					onClick: () => handleOpenChange(false),
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "emphasis",
					loading: submitting,
					children: submitLabel ?? t("common.add")
				})] })]
			})]
		})
	});
}
export { CreateGroupDialog as t };
