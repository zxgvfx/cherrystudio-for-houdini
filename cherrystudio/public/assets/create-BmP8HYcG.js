import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { C as AGENT_PROMPT } from "./PreferenceService-ay5pWhVK.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-B3OAESWo.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { t as scrollbar_default } from "./scrollbar-6bETwjbG.js";
import { a as FormItem, d as useForm, f as useFormState, i as FormField, n as FormControl, o as FormLabel, p as useWatch, r as FormDescription, s as FormMessage, t as Form } from "./form-BQjGub5t.js";
import { n as ipcApi } from "./ipc-BuGMWdaI.js";
import { t as getDefaultRouteTitle } from "./routeTitle-cKI7p46Z.js";
import { t as Check } from "./check-bQmMgMQ_.js";
import { t as AGENT_RUNTIME_CAPABILITIES } from "./agentRuntimeCapabilities-Dnr3VRWR.js";
import { t as uuid } from "./uuid-85lqhJWx.js";
import { n as useModelById, t as useDefaultModel } from "./useModel-DWj6Qb5f.js";
import { D as PromptEditorField, E as PromptPolishActions, T as PermissionModeSelect, _ as usePromptProcessor, c as PromptVariablesPopover, f as resourceDialogCloseButtonClassName, i as EDIT_DIALOG_PROMPT_MIN_HEIGHT, l as TextInputField, m as resourceDialogTitleClassName, n as CompactModelField, o as FieldLabelWithHelp, p as resourceDialogHeaderClassName, r as EDIT_DIALOG_PROMPT_MAX_HEIGHT, s as KnowledgeBaseField, t as AvatarField, v as SkillCatalogPicker } from "./EditDialogShared-BpH7F_cP.js";
import { T as useReconcileSkillsOnOpen, a as RESOURCE_PROMPT_POLISH_SYSTEM_PROMPT, w as useInstalledSkills } from "./resourceCatalog-orFaFf1i.js";
import { l as useAgentModelFilter } from "./ModelSelector-HuVsPvx_.js";
import { i as getPermissionModeCards } from "./agent-CC-UrJwb.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var EMPTY_MODEL_LABELS = {
	modelId: null,
	planModelId: null,
	smallModelId: null,
	contextCompressModelId: null
};
var AGENT_RUNTIME_OPTIONS = Object.entries(AGENT_RUNTIME_CAPABILITIES).map(([value, caps]) => ({
	value,
	labelKey: caps.labelKey,
	labelFallback: caps.labelFallback
}));
var AGENT_RUNTIME_SELECTED_LABELS = {
	"claude-code": {
		labelKey: "library.config.agent.field.runtime.selected.claude_code",
		labelFallback: "Advanced"
	},
	pi: {
		labelKey: "library.config.agent.field.runtime.selected.pi",
		labelFallback: "Fast"
	}
};
function AgentRuntimeModelFields({ form, portalContainer, modelLabels, setModelLabels, modelFilter, onSettingsNavigate }) {
	const { t } = useTranslation();
	const permissionModeCards = getPermissionModeCards(useWatch({
		control: form.control,
		name: "agentType"
	}));
	const handleRuntimeChange = (next) => {
		form.setValue("agentType", next, { shouldDirty: true });
		form.setValue("permissionMode", AGENT_RUNTIME_CAPABILITIES[next].createDefaults.permissionMode, { shouldDirty: true });
		form.setValue("modelId", null, { shouldDirty: true });
		setModelLabels(EMPTY_MODEL_LABELS);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "agentType",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t("library.config.agent.field.runtime.label") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: field.value,
					onValueChange: (value) => handleRuntimeChange(value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-9 w-full rounded-md",
						"aria-label": t("library.config.agent.field.runtime.label"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { children: t(AGENT_RUNTIME_SELECTED_LABELS[field.value].labelKey, AGENT_RUNTIME_SELECTED_LABELS[field.value].labelFallback) })
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
						portalContainer,
						children: AGENT_RUNTIME_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: option.value,
							children: t(option.labelKey, option.labelFallback)
						}, option.value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormDescription, {
					className: "text-xs",
					children: t("library.config.agent.field.runtime.immutable_hint")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
			control: form.control,
			name: "permissionMode",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t("library.config.agent.field.permission_mode.label") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionModeSelect, {
					cards: permissionModeCards,
					value: field.value,
					onValueChange: field.onChange,
					portalContainer,
					ariaLabel: t("library.config.agent.field.permission_mode.label"),
					t
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
			] })
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
		})
	] });
}
function BasicInfoStep({ form, portalContainer, fallbackAvatar, modelFilter, runtimeSelectable = false, onSettingsNavigate }) {
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
			runtimeSelectable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentRuntimeModelFields, {
				form,
				portalContainer,
				modelLabels,
				setModelLabels,
				modelFilter,
				onSettingsNavigate
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactModelField, {
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
function SystemPromptStep({ form, portalContainer }) {
	const { t } = useTranslation();
	const [resetPreviewKey, setResetPreviewKey] = (0, import_react.useState)(0);
	const name = useWatch({
		control: form.control,
		name: "name"
	});
	const modelId = useWatch({
		control: form.control,
		name: "modelId"
	});
	const prompt = useWatch({
		control: form.control,
		name: "prompt"
	});
	const { model } = useModelById(modelId);
	const processedPrompt = usePromptProcessor({
		prompt,
		modelName: model?.name
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
				previewValue: processedPrompt || prompt,
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
function getResourceCreateDefaultAvatar(kind) {
	return kind === "assistant" ? "💬" : "🤖";
}
function getDefaultValues(kind, initialName = "") {
	return {
		avatar: getResourceCreateDefaultAvatar(kind),
		name: initialName,
		description: "",
		agentType: "claude-code",
		permissionMode: AGENT_RUNTIME_CAPABILITIES["claude-code"].createDefaults.permissionMode,
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
function ResourceCreateWizard({ kind, open, onOpenChange, onSubmit, modelFilter, isSubmitting = false, initialName }) {
	const { t } = useTranslation();
	const form = useForm({ defaultValues: getDefaultValues(kind, initialName) });
	const agentType = form.watch("agentType");
	const agentModelFilter = useAgentModelFilter(kind === "agent" ? agentType : void 0);
	const activeModelFilter = kind === "agent" ? agentModelFilter : modelFilter;
	const { defaultModel } = useDefaultModel({ enabled: open });
	const selectableDefaultModelId = open && defaultModel && (!activeModelFilter || activeModelFilter(defaultModel)) ? defaultModel.id : null;
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
		const systemPrompt = {
			id: "system-prompt",
			label: t("library.config.prompt.label")
		};
		const knowledge = {
			id: "knowledge",
			label: t("library.config.dialogs.create.step.knowledge")
		};
		if (kind === "assistant") return [
			basic,
			systemPrompt,
			knowledge
		];
		const capability = {
			id: "capability",
			label: t("library.config.dialogs.create.step.capability")
		};
		const caps = AGENT_RUNTIME_CAPABILITIES[agentType];
		return [
			basic,
			systemPrompt,
			...caps.skills ? [capability] : [],
			...caps.knowledgeBases ? [knowledge] : []
		];
	}, [
		agentType,
		kind,
		t
	]);
	(0, import_react.useEffect)(() => {
		setStepIndex((index) => Math.min(index, steps.length - 1));
	}, [steps.length]);
	const resetForOpen = (0, import_react.useEffectEvent)(() => {
		autoSelectedDefaultModelIdRef.current = null;
		form.reset(getDefaultValues(kind, initialName));
		form.clearErrors();
		setStepIndex(0);
	});
	(0, import_react.useEffect)(() => {
		if (!open) return;
		resetForOpen();
	}, [kind, open]);
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
				agentType: values.agentType,
				permissionMode: values.permissionMode,
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
									fallbackAvatar: getResourceCreateDefaultAvatar(kind),
									modelFilter: activeModelFilter,
									runtimeSelectable: kind === "agent",
									onSettingsNavigate: closeBeforeAction
								}) : null,
								currentStep.id === "system-prompt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemPromptStep, {
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
export { getResourceCreateDefaultAvatar as n, ResourceCreateWizard as t };
