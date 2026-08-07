import { s as __toESM } from "./chunk-DiqNceaa.js";
import { C as AGENT_PROMPT } from "./PreferenceService-Ba0ofBX2.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { t as scrollbar_default } from "./scrollbar-u8WAeDey.js";
import { a as FormItem, d as useForm, f as useFormState, i as FormField, p as useWatch, t as Form } from "./form-BNX-faEF.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { t as getDefaultRouteTitle } from "./routeTitle-DwBoGlJ5.js";
import { t as Check } from "./check-DGAvfDpR.js";
import { t as uuid } from "./uuid-DNJDgQB1.js";
import { t as useDefaultModel } from "./useModel-CIp4kGrE.js";
import { C as PromptEditorField, S as PromptPolishActions, _ as SkillCatalogPicker, c as PromptVariablesPopover, f as resourceDialogCloseButtonClassName, i as EDIT_DIALOG_PROMPT_MIN_HEIGHT, l as TextInputField, m as resourceDialogTitleClassName, n as CompactModelField, o as FieldLabelWithHelp, p as resourceDialogHeaderClassName, r as EDIT_DIALOG_PROMPT_MAX_HEIGHT, s as KnowledgeBaseField, t as AvatarField } from "./EditDialogShared-BrUlbKb6.js";
import { T as useReconcileSkillsOnOpen, a as RESOURCE_PROMPT_POLISH_SYSTEM_PROMPT, w as useInstalledSkills } from "./resourceCatalog-CcJqFkk2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EMPTY_MODEL_LABELS = {
	modelId: null,
	planModelId: null,
	smallModelId: null,
	contextCompressModelId: null
};
function BasicInfoStep({ form, portalContainer, fallbackAvatar, modelFilter, onSettingsNavigate }) {
	const { t } = useTranslation();
	const [emojiPickerOpen, setEmojiPickerOpen] = (0, import_react.useState)(false);
	const [modelLabels, setModelLabels] = (0, import_react.useState)(EMPTY_MODEL_LABELS);
	(0, import_react.useEffect)(() => {
		form.setFocus("name");
	}, [form]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.basic-info-step",
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[auto_1fr] items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarField, {
					form,
					emojiPickerOpen,
					setEmojiPickerOpen,
					fallback: fallbackAvatar,
					portalContainer,
					size: "sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInputField, {
					form,
					name: "name",
					label: t("common.name"),
					placeholder: t("library.config.dialogs.create.name_placeholder"),
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactModelField, {
				form,
				name: "modelId",
				label: t("common.model"),
				filter: modelFilter,
				portalContainer,
				modelLabels,
				setModelLabels,
				onSettingsNavigate,
				triggerClassName: "h-9 rounded-md border border-input bg-transparent px-3 hover:bg-accent/50 aria-expanded:bg-accent/50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInputField, {
				form,
				name: "description",
				label: t("common.description"),
				placeholder: t("library.config.dialogs.create.description_placeholder")
			})
		]
	});
}
function CapabilityStep({ form, portalContainer }) {
	const { t } = useTranslation();
	const skillIds = form.watch("skillIds");
	useReconcileSkillsOnOpen(true);
	const { skills, loading } = useInstalledSkills();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillCatalogPicker, {
		mode: "create",
		skills,
		loading,
		selectedIds: skillIds,
		onSelectedIdsChange: (ids) => form.setValue("skillIds", ids, { shouldDirty: true }),
		emptyLabel: t("library.config.dialogs.create.capability.no_skills"),
		portalContainer
	});
}
function KnowledgeStep({ form, isSubmitting = false, portalContainer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeBaseField, {
		form,
		portalContainer,
		formLabel: false,
		disabled: isSubmitting,
		onOpenKnowledgePage: (0, import_react.useCallback)(() => {
			if (isSubmitting) return;
			ipcApi.request("tab.detach", {
				id: uuid(),
				url: "/app/knowledge",
				title: getDefaultRouteTitle("/app/knowledge"),
				type: "route"
			});
		}, [isSubmitting])
	});
}
function PersonaStep({ form, portalContainer }) {
	const { t } = useTranslation();
	const [resetPreviewKey, setResetPreviewKey] = (0, import_react.useState)(0);
	const name = useWatch({
		control: form.control,
		name: "name"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
		control: form.control,
		name: "prompt",
		render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItem, {
			className: "flex h-full min-h-0 flex-col",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptEditorField, {
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptPolishActions, {
					value: field.value,
					fallbackSource: name,
					emptyValueSystemPrompt: AGENT_PROMPT,
					existingValueSystemPrompt: RESOURCE_PROMPT_POLISH_SYSTEM_PROMPT,
					onChange: (value) => {
						field.onChange(value);
						setResetPreviewKey((key) => key + 1);
					}
				}),
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabelWithHelp, {
					label: t("library.config.prompt.label"),
					formLabel: false,
					helpTrigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptVariablesPopover, { portalContainer })
				}),
				value: field.value,
				onChange: field.onChange,
				resetPreviewKey,
				placeholder: t("library.config.prompt.placeholder"),
				minHeight: EDIT_DIALOG_PROMPT_MIN_HEIGHT,
				maxHeight: EDIT_DIALOG_PROMPT_MAX_HEIGHT,
				autoFocus: true,
				fill: true
			})
		})
	});
}
function getDefaultAvatar(kind) {
	return kind === "assistant" ? "💬" : "🤖";
}
function getDefaultValues(kind) {
	return {
		avatar: getDefaultAvatar(kind),
		name: "",
		description: "",
		modelId: null,
		prompt: "",
		knowledgeBaseIds: [],
		skillIds: []
	};
}
function WizardFooter({ form, stepIndex, isLast, isSubmitting, onCancel, onBack, onNext, onCreate }) {
	const { t } = useTranslation();
	const [name, modelId] = useWatch({
		control: form.control,
		name: ["name", "modelId"]
	});
	const submitting = isSubmitting || form.formState.isSubmitting;
	const rootError = form.formState.errors.root?.message;
	const basicValid = (name?.trim().length ?? 0) > 0 && Boolean(modelId);
	const canProceed = stepIndex !== 0 || basicValid;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "resource-catalog.wizard-footer",
		className: "flex shrink-0 items-center justify-end gap-2 border-border-subtle border-t px-6 py-3",
		children: [
			rootError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-auto text-destructive text-xs",
				children: rootError
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				disabled: submitting,
				className: "text-muted-foreground",
				onClick: onCancel,
				children: t("common.cancel")
			}),
			stepIndex > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				disabled: submitting,
				onClick: onBack,
				children: t("library.config.dialogs.create.back")
			}) : null,
			isLast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				loading: submitting,
				disabled: !basicValid,
				onClick: onCreate,
				children: t("library.config.dialogs.create.submit")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				disabled: !canProceed,
				onClick: onNext,
				children: t("library.config.dialogs.create.next")
			})
		]
	});
}
function ResourceCreateWizard({ kind, open, onOpenChange, onSubmit, modelFilter, isSubmitting = false }) {
	const { t } = useTranslation();
	const form = useForm({ defaultValues: getDefaultValues(kind) });
	const { defaultModel } = useDefaultModel({ enabled: open });
	const selectableDefaultModelId = open && defaultModel && (!modelFilter || modelFilter(defaultModel)) ? defaultModel.id : null;
	const autoSelectedDefaultModelIdRef = (0, import_react.useRef)(null);
	const [stepIndex, setStepIndex] = (0, import_react.useState)(0);
	const [dialogContentElement, setDialogContentElement] = (0, import_react.useState)(null);
	const [dialogKey, setDialogKey] = (0, import_react.useState)(0);
	const pendingCloseActionRef = (0, import_react.useRef)(null);
	const { isSubmitting: isFormSubmitting } = useFormState({ control: form.control });
	const submitting = isSubmitting || isFormSubmitting;
	const steps = (0, import_react.useMemo)(() => {
		const basic = {
			id: "basic",
			label: t("library.config.dialogs.create.step.basic")
		};
		const persona = {
			id: "persona",
			label: t("library.config.dialogs.create.step.persona")
		};
		const knowledge = {
			id: "knowledge",
			label: t("library.config.dialogs.create.step.knowledge")
		};
		if (kind === "assistant") return [
			basic,
			persona,
			knowledge
		];
		return [
			basic,
			persona,
			{
				id: "capability",
				label: t("library.config.dialogs.create.step.capability")
			},
			knowledge
		];
	}, [kind, t]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		autoSelectedDefaultModelIdRef.current = null;
		form.reset(getDefaultValues(kind));
		form.clearErrors();
		setStepIndex(0);
	}, [
		form,
		kind,
		open
	]);
	(0, import_react.useEffect)(() => {
		if (!open) {
			autoSelectedDefaultModelIdRef.current = null;
			return;
		}
		const currentModelId = form.getValues("modelId");
		const autoSelectedModelId = autoSelectedDefaultModelIdRef.current;
		if (autoSelectedModelId && currentModelId === autoSelectedModelId && selectableDefaultModelId !== autoSelectedModelId) {
			autoSelectedDefaultModelIdRef.current = null;
			form.setValue("modelId", null, {
				shouldDirty: false,
				shouldTouch: false
			});
			return;
		}
		if (currentModelId || !selectableDefaultModelId) {
			if (autoSelectedModelId && currentModelId !== autoSelectedModelId) autoSelectedDefaultModelIdRef.current = null;
			return;
		}
		autoSelectedDefaultModelIdRef.current = selectableDefaultModelId;
		form.setValue("modelId", selectableDefaultModelId, {
			shouldDirty: false,
			shouldTouch: false
		});
	}, [
		form,
		kind,
		open,
		selectableDefaultModelId
	]);
	const isLast = stepIndex === steps.length - 1;
	const goNext = () => {
		if (stepIndex === 0) {
			const { name, modelId } = form.getValues();
			if (!(name.trim().length > 0 && modelId)) return;
		}
		setStepIndex((index) => Math.min(index + 1, steps.length - 1));
	};
	const goBack = () => setStepIndex((index) => Math.max(index - 1, 0));
	const runPendingCloseAction = (0, import_react.useCallback)(() => {
		const action = pendingCloseActionRef.current;
		if (!action) return;
		pendingCloseActionRef.current = null;
		action();
	}, []);
	const closeBeforeAction = (0, import_react.useCallback)((action) => {
		pendingCloseActionRef.current = action;
		if (!open) {
			setDialogKey((key) => key + 1);
			runPendingCloseAction();
			return;
		}
		setDialogKey((key) => key + 1);
		onOpenChange(false);
	}, [
		onOpenChange,
		open,
		runPendingCloseAction
	]);
	(0, import_react.useEffect)(() => {
		if (open) return;
		const frameId = window.requestAnimationFrame(runPendingCloseAction);
		return () => window.cancelAnimationFrame(frameId);
	}, [open, runPendingCloseAction]);
	const handleCreate = form.handleSubmit(async (values) => {
		if (!values.modelId) return;
		form.clearErrors("root");
		try {
			await onSubmit({
				avatar: values.avatar,
				name: values.name.trim(),
				modelId: values.modelId,
				description: values.description.trim(),
				prompt: values.prompt.trim(),
				knowledgeBaseIds: values.knowledgeBaseIds,
				skillIds: values.skillIds
			});
		} catch (error) {
			const message = error instanceof Error && error.message ? error.message : t("library.config.dialogs.create.submit_failed");
			form.setError("root", { message });
		}
	});
	const title = t(kind === "assistant" ? "library.config.dialogs.create.assistant_title" : "library.config.dialogs.create.agent_title");
	const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (nextOpen) => !submitting && onOpenChange(nextOpen),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			ref: setDialogContentElement,
			closeOnOverlayClick: !submitting,
			size: "xl",
			className: cn("flex h-[min(600px,76vh)] flex-col gap-0 p-0", resourceDialogCloseButtonClassName),
			onPointerDownOutside: (event) => submitting && event.preventDefault(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: resourceDialogHeaderClassName,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: resourceDialogTitleClassName,
						children: title
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (event) => event.preventDefault(),
					className: "flex min-h-0 flex-1 flex-col overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "w-44 shrink-0 space-y-1 border-border-subtle border-r p-3",
							children: steps.map((step, index) => {
								const done = index < stepIndex;
								const active = index === stepIndex;
								const clickable = index < stepIndex;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: !clickable,
									onClick: () => clickable && setStepIndex(index),
									className: cn("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors", active && "bg-accent/60", clickable ? "cursor-pointer hover:bg-accent/40" : "cursor-default"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("flex size-6 shrink-0 items-center justify-center rounded-full font-medium text-xs", active ? "bg-foreground text-background" : done ? "bg-foreground/10 text-foreground" : "border border-border text-muted-foreground"),
										children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											size: 13,
											strokeWidth: 2.5
										}) : index + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("min-w-0 flex-1 truncate text-sm", active ? "font-medium text-foreground" : "text-muted-foreground"),
										children: step.label
									})]
								}) }, step.id);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(scrollbar_default, {
							className: "min-w-0 flex-1 px-6 py-5",
							children: [
								currentStep.id === "basic" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BasicInfoStep, {
									form,
									portalContainer: dialogContentElement,
									fallbackAvatar: getDefaultAvatar(kind),
									modelFilter,
									onSettingsNavigate: closeBeforeAction
								}) : null,
								currentStep.id === "persona" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonaStep, {
									form,
									portalContainer: dialogContentElement
								}) : null,
								currentStep.id === "knowledge" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeStep, {
									form,
									isSubmitting: submitting,
									portalContainer: dialogContentElement
								}) : null,
								currentStep.id === "capability" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapabilityStep, {
									form,
									portalContainer: dialogContentElement
								}) : null
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WizardFooter, {
						form,
						stepIndex,
						isLast,
						isSubmitting,
						onCancel: () => onOpenChange(false),
						onBack: goBack,
						onNext: goNext,
						onCreate: () => void handleCreate()
					})]
				})
			})]
		})
	}, dialogKey);
}
export { ResourceCreateWizard as t };
