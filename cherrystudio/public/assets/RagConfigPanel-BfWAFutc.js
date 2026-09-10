import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { i as formatErrorMessageWithPrefix } from "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import "./Model-CThI07dL.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import { t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import { t as Alert } from "./alert-DCOQC5CT.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { n as Tooltip } from "./tooltip-a5SkzYdn.js";
import { n as Switch } from "./switch-C4W4NCwc.js";
import "./es2015-wfS3L7va.js";
import { t as Input } from "./input-DWk3xPNN.js";
import { t as scrollbar_default } from "./scrollbar-DXc_RNdR.js";
import "./sortable.esm-TnTcc6bt.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-PDzaS6-f.js";
import { t as Slider } from "./slider-DAHgJXLj.js";
import "./command-CyHQabGE.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { r as openSettingsTab } from "./mainWindowNavigation-Dpzd_Ttr.js";
import "./file-OKCzlHoD.js";
import "./file-CkrjUGO_.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import "./DataApiService-Csr1w5Kb.js";
import { o as useMutation } from "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as ChevronDown } from "./chevron-down-CZ6Nbooa.js";
import { t as CircleSlash } from "./circle-slash-D9SKPeJ6.js";
import { t as Info } from "./info-DYnh0AU2.js";
import { t as RotateCcw } from "./rotate-ccw-CnP2I1zC.js";
import { t as Settings2 } from "./settings-2-fb7Kk-1U.js";
import "./popup-fJcKiA2S.js";
import "./mcp-BGt1L-d_.js";
import { r as getFileProcessorLabelKey } from "./label-CSb71add.js";
import "./systemProviderId-B4QvwwvR.js";
import "./provider-0IejLFjL.js";
import "./naming-BVJSQooI.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import { B as isRerankModel } from "./provider-bQl8RVRp.js";
import "./constants-BF9E3O0o.js";
import "./useModel-kU1hKaYa.js";
import "./useProvider-DvntuFRN.js";
import "./capabilities-DNV_QUgI.js";
import "./model-BCwc3I-J.js";
import "./group-Cqj37oRb.js";
import { t as DEFAULT_KNOWLEDGE_CHUNK_SEPARATOR } from "./knowledge-8Me8AnnG.js";
import { t as Scrollbar_default } from "./Scrollbar-CjwT5bYS.js";
import { c as SelectorShell, i as ModelSelectorRow, s as DEFAULT_SELECTOR_CONTENT_HEIGHT } from "./ModelSelector-DGMGvnR1.js";
import "./VirtualList-2tuBY6WI.js";
import { r as useEnableKnowledgeBaseEmbedding } from "./useKnowledgeBase-DfgLPgtw.js";
import "./providerSettings-DJmmyeTu.js";
import { t as useListboxKeyboardNavigation } from "./useListboxKeyboardNavigation-Mjn8AQ7k.js";
import { a as KnowledgePanelShell_default, c as KnowledgeDialogFooter, i as useEmbeddingDimensions, n as KnowledgeModelSelect, r as LocalModelDownloadPopup_default, t as KnowledgeEmbeddingModelSelect } from "./KnowledgeEmbeddingModelSelect-D45Us4_U.js";
import { r as normalizeKnowledgeError, t as getKnowledgeBaseFailureReason } from "./error-Bm05Af8U.js";
import { i as useAvailableFileProcessors, n as FILE_PROCESSOR_LOCAL_MODEL, r as PRESETS_FILE_PROCESSORS, t as FileProcessorIcon } from "./FileProcessorIcon-4NRHkLyb.js";
import "./LocalModelDownloadProgress-CvZiSVaT.js";
import { t as useLocalModel } from "./useLocalModel-Bvd9zJkF.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var knowledgeRagConfigKeys = [
	"fileProcessorId",
	"chunkSize",
	"chunkOverlap",
	"chunkStrategy",
	"chunkSeparator",
	"embeddingModelId",
	"rerankModelId",
	"documentCount",
	"threshold"
];
const parseOptionalInteger = (value) => {
	if (!value) return null;
	const parsed = Number(value);
	return Number.isInteger(parsed) ? parsed : null;
};
const parseRequiredInteger = (value) => {
	const parsed = parseOptionalInteger(value);
	if (parsed == null) throw new Error(`Expected integer string, received "${value}"`);
	return parsed;
};
const getKnowledgeRagChunkValidationErrors = (values) => {
	const chunkSize = parseOptionalInteger(values.chunkSize);
	const chunkOverlap = parseOptionalInteger(values.chunkOverlap);
	const errors = {};
	if (values.chunkSize && (!chunkSize || chunkSize <= 0)) errors.chunkSize = "chunkSizeInvalid";
	if (values.chunkOverlap && (chunkOverlap == null || chunkOverlap < 0)) errors.chunkOverlap = "chunkOverlapInvalid";
	if (chunkSize != null && chunkSize > 0 && chunkOverlap != null && chunkOverlap >= chunkSize) errors.chunkOverlap = "chunkOverlapMustBeSmaller";
	if (values.chunkStrategy === "delimiter" && values.chunkSeparator === "") errors.chunkSeparator = "chunkSeparatorRequired";
	return errors;
};
const getKnowledgeRagConfigFormState = (initialValues, currentValues) => {
	const validationErrorCodes = getKnowledgeRagChunkValidationErrors(currentValues);
	const hasEmptyChunkFields = currentValues.chunkSize === "" || currentValues.chunkOverlap === "";
	const hasValidationErrors = Object.values(validationErrorCodes).some(Boolean);
	const isDirty = knowledgeRagConfigKeys.some((key) => initialValues[key] !== currentValues[key]);
	return {
		validationErrorCodes,
		hasEmptyChunkFields,
		hasValidationErrors,
		isDirty,
		canSave: isDirty && !hasEmptyChunkFields && !hasValidationErrors
	};
};
var DEFAULT_KNOWLEDGE_DOCUMENT_COUNT = 6;
var DEFAULT_KNOWLEDGE_THRESHOLD = 0;
const createKnowledgeRagConfigFormValues = (base) => ({
	fileProcessorId: base.fileProcessorId ?? null,
	chunkSize: String(base.chunkSize),
	chunkOverlap: String(base.chunkOverlap),
	chunkStrategy: base.chunkStrategy,
	chunkSeparator: base.chunkSeparator,
	embeddingModelId: base.embeddingModelId,
	rerankModelId: base.rerankModelId ?? null,
	documentCount: base.documentCount ?? DEFAULT_KNOWLEDGE_DOCUMENT_COUNT,
	threshold: base.threshold ?? DEFAULT_KNOWLEDGE_THRESHOLD
});
const buildKnowledgeRagConfigPatch = (initialValues, currentValues) => {
	const patch = {};
	if (currentValues.fileProcessorId !== initialValues.fileProcessorId) patch.fileProcessorId = currentValues.fileProcessorId;
	if (currentValues.chunkSize !== initialValues.chunkSize) patch.chunkSize = parseRequiredInteger(currentValues.chunkSize);
	if (currentValues.chunkOverlap !== initialValues.chunkOverlap) patch.chunkOverlap = parseRequiredInteger(currentValues.chunkOverlap);
	if (currentValues.chunkStrategy !== initialValues.chunkStrategy) patch.chunkStrategy = currentValues.chunkStrategy;
	if (currentValues.chunkSeparator !== initialValues.chunkSeparator) patch.chunkSeparator = currentValues.chunkSeparator;
	if (currentValues.rerankModelId !== initialValues.rerankModelId) patch.rerankModelId = currentValues.rerankModelId;
	if (currentValues.documentCount !== initialValues.documentCount) patch.documentCount = currentValues.documentCount;
	if (currentValues.threshold !== initialValues.threshold) patch.threshold = currentValues.threshold;
	return patch;
};
var logger$1 = loggerService.withContext("useKnowledgeRagConfig");
var KNOWLEDGE_V2_FILE_PROCESSORS = PRESETS_FILE_PROCESSORS.filter((preset) => preset.capabilities.some((capability) => capability.feature === "document_to_markdown" && capability.inputs.includes("document")));
var canSelectFileProcessor = (processor, apiKeys) => processor.id === "open-mineru" || processor.type !== "api" || apiKeys?.some((key) => key.trim().length > 0) === true;
const useKnowledgeRagConfig = (base) => {
	const { t } = useTranslation();
	const [fileProcessorOverrides] = usePreference("feature.file_processing.overrides");
	const availableProcessors = useAvailableFileProcessors();
	const { trigger, isLoading, error } = useMutation("PATCH", "/knowledge-bases/:id", { refresh: ["/knowledge-bases"] });
	const initialValues = (0, import_react.useMemo)(() => createKnowledgeRagConfigFormValues(base), [base]);
	const fileProcessorOptions = (0, import_react.useMemo)(() => KNOWLEDGE_V2_FILE_PROCESSORS.flatMap((processor) => {
		const isInitialProcessor = processor.id === initialValues.fileProcessorId;
		const isSupported = availableProcessors.status === "ready" && availableProcessors.processorIds.has(processor.id);
		const shouldKeepInitialWhileUnavailable = availableProcessors.status !== "ready" && isInitialProcessor;
		if (!isSupported && !shouldKeepInitialWhileUnavailable) return [];
		const isConfigured = canSelectFileProcessor(processor, fileProcessorOverrides[processor.id]?.apiKeys);
		const disabled = !isSupported || !isConfigured;
		return [{
			value: processor.id,
			label: t(getFileProcessorLabelKey(processor.id)),
			disabled,
			statusLabel: isSupported && !isConfigured ? t("knowledge.rag.processor_not_configured") : void 0
		}];
	}), [
		availableProcessors.processorIds,
		availableProcessors.status,
		fileProcessorOverrides,
		initialValues.fileProcessorId,
		t
	]);
	const save = async (values, embeddingModelOverride) => {
		const patch = buildKnowledgeRagConfigPatch(initialValues, values);
		if (embeddingModelOverride) {
			patch.embeddingModelId = embeddingModelOverride.embeddingModelId;
			patch.dimensions = embeddingModelOverride.dimensions;
		}
		try {
			return await trigger({
				params: { id: base.id },
				body: patch
			});
		} catch (saveError) {
			const normalizedError = normalizeKnowledgeError(saveError);
			logger$1.error("Failed to update knowledge RAG config", normalizedError, {
				baseId: base.id,
				updates: patch
			});
			throw normalizedError;
		}
	};
	return {
		initialValues,
		fileProcessorOptions,
		save,
		isLoading,
		error
	};
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const RagFieldLabel = ({ className, label, hint }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.rag-field-label",
		className: cn("mb-2 flex items-center gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-foreground text-sm",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			content: hint,
			placement: "top",
			className: "w-fit max-w-sm px-2.5 py-1.5 text-[10px] leading-relaxed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
				size: 12,
				className: "cursor-help text-muted-foreground"
			})
		}) : null]
	});
};
const RagFieldRow = ({ label, hint, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.rag-field-row",
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagFieldLabel, {
			label,
			hint,
			className: "mb-0"
		}), children]
	});
};
const RagInlineField = ({ label, hint, value, suffix, placeholder, inputMode, onChange, controlClassName }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagFieldRow, {
		label,
		hint,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative", controlClassName ?? "w-44"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value,
				placeholder,
				inputMode,
				onChange: (event) => onChange(event.target.value),
				className: cn("shadow-none", suffix ? "pr-14" : void 0)
			}), suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 text-foreground-tertiary text-xs leading-4",
				children: suffix
			}) : null]
		})
	});
};
const RagHintText = ({ children, tone = "info" }) => {
	if (tone === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "knowledge.rag-hint-text",
		className: "rounded-md border border-error-border bg-error-subtle px-2.5 py-1.5 text-error-subtle-foreground text-xs leading-4",
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-ui": "knowledge.rag-hint-text",
		className: "text-muted-foreground text-xs leading-4",
		children
	});
};
const RagSliderField = ({ label, value, onValueChange, min, max, step, minLabel, maxLabel, formatValue, hint, disabled = false }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.rag-slider-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagFieldLabel, {
				label,
				hint,
				className: "mb-0"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-xs tabular-nums leading-4",
				children: formatValue(value)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: disabled ? "opacity-50" : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				"aria-label": label,
				value: [value],
				onValueChange: (nextValue) => onValueChange(nextValue[0] ?? min),
				min,
				max,
				step,
				size: "md",
				disabled,
				className: "w-full **:data-[slot=slider-thumb]:border-primary **:data-[slot=slider-range]:bg-primary **:data-[slot=slider-thumb]:bg-background **:data-[slot=slider-track]:bg-muted **:data-[slot=slider-thumb]:shadow-sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-px flex items-center justify-between text-foreground-tertiary text-xs leading-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: minLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: maxLabel })]
			})]
		})]
	});
};
var ChunkingSection = ({ chunkStrategy, chunkSeparator, chunkSize, chunkOverlap, chunkSizeErrorCode, chunkOverlapErrorCode, chunkSeparatorErrorCode, onChunkStrategyChange, onChunkSeparatorChange, onChunkSizeChange, onChunkOverlapChange }) => {
	const { t } = useTranslation();
	const getValidationErrorMessage = (errorCode) => {
		switch (errorCode) {
			case "chunkSizeInvalid": return t("knowledge.rag.chunk_size_invalid");
			case "chunkOverlapInvalid": return t("knowledge.rag.chunk_overlap_invalid");
			case "chunkOverlapMustBeSmaller": return t("knowledge.rag.chunk_overlap_must_be_smaller");
			case "chunkSeparatorRequired": return t("knowledge.rag.chunk_separator_required");
			default: return;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.chunking-section",
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagFieldRow, {
						label: t("knowledge.rag.smart_chunking"),
						hint: t("knowledge.rag.hints.smart_chunking"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: chunkStrategy === "structured",
							onCheckedChange: (checked) => onChunkStrategyChange(checked ? "structured" : "delimiter")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagInlineField, {
						label: t("knowledge.rag.chunk_separator"),
						hint: t("knowledge.rag.hints.chunk_separator"),
						value: chunkSeparator,
						placeholder: DEFAULT_KNOWLEDGE_CHUNK_SEPARATOR,
						onChange: onChunkSeparatorChange
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagInlineField, {
						label: t("knowledge.rag.chunk_size"),
						hint: t("knowledge.rag.hints.chunk_size"),
						value: chunkSize,
						suffix: t("knowledge.rag.tokens_unit"),
						inputMode: "numeric",
						onChange: onChunkSizeChange
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagInlineField, {
						label: t("knowledge.rag.chunk_overlap"),
						hint: t("knowledge.rag.hints.chunk_overlap"),
						value: chunkOverlap,
						suffix: t("knowledge.rag.tokens_unit"),
						inputMode: "numeric",
						onChange: onChunkOverlapChange
					})
				]
			}),
			chunkSizeErrorCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagHintText, {
				tone: "error",
				children: getValidationErrorMessage(chunkSizeErrorCode)
			}) : null,
			chunkOverlapErrorCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagHintText, {
				tone: "error",
				children: getValidationErrorMessage(chunkOverlapErrorCode)
			}) : null,
			chunkSeparatorErrorCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagHintText, {
				tone: "error",
				children: getValidationErrorMessage(chunkSeparatorErrorCode)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagHintText, {
				tone: "warning",
				children: t("knowledge.rag.chunk_size_change_warning")
			})
		]
	});
};
var ChunkingSection_default = ChunkingSection;
var EmbeddingSection = ({ embeddingModelId, onEmbeddingModelChange }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "knowledge.embedding-section",
		className: "flex flex-col gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagFieldLabel, {
			label: t("knowledge.rag.embedding_model"),
			hint: t("knowledge.rag.hints.embedding_model")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeEmbeddingModelSelect, {
			"aria-label": t("knowledge.rag.embedding_model"),
			value: embeddingModelId,
			placeholder: t("knowledge.rag.rerank_disabled"),
			noneOptionLabel: t("knowledge.rag.rerank_disabled"),
			onChange: onEmbeddingModelChange
		})] })
	});
};
var EmbeddingSection_default = EmbeddingSection;
var logger = loggerService.withContext("useOpenMineruConnectivity");
function useOpenMineruConnectivity() {
	const [state, setState] = (0, import_react.useState)(() => ({
		reachable: false,
		isResolved: false
	}));
	(0, import_react.useEffect)(() => {
		let mounted = true;
		setState({
			reachable: false,
			isResolved: false
		});
		ipcApi.request("file_processing.open_mineru.check_connectivity").then((reachable) => {
			if (mounted) setState({
				reachable,
				isResolved: true
			});
		}).catch((error) => {
			logger.warn("Failed to probe Open MinerU connectivity", error);
			if (mounted) setState({
				reachable: true,
				isResolved: true
			});
		});
		return () => {
			mounted = false;
		};
	}, []);
	return state;
}
var FILE_PROCESSOR_ROW_HEIGHT = 36;
var FILE_PROCESSOR_LIST_PADDING = 8;
var FILE_PROCESSOR_SHELL_CHROME_HEIGHT = 69;
var ProcessorRowIcon = ({ processorId }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "knowledge.processor-row-icon",
	className: "inline-flex size-4 shrink-0 items-center justify-center",
	"data-testid": `processor-icon-${processorId}`,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileProcessorIcon, { processorId })
});
const FileProcessorSelector = ({ value, options, placeholder, settingsLabel, "aria-label": ariaLabel, onChange, onSettingsNavigate }) => {
	const [open, setOpen] = (0, import_react.useState)(false);
	const selectedOption = options.find((option) => option.value === value);
	const listHeight = options.length * FILE_PROCESSOR_ROW_HEIGHT + FILE_PROCESSOR_LIST_PADDING;
	const contentHeight = Math.min(344, listHeight + FILE_PROCESSOR_SHELL_CHROME_HEIGHT);
	const handleSelect = (nextValue) => {
		onChange(nextValue);
		setOpen(false);
	};
	const handleSettingsNavigate = () => {
		setOpen(false);
		onSettingsNavigate();
	};
	const { activeIndex, activeOptionId, getOptionId, handleKeyDown, listboxId, listRef, setActiveIndex } = useListboxKeyboardNavigation({
		open,
		options,
		value,
		onSelect: (option) => handleSelect(option.value)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectorShell, {
		trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			"aria-label": ariaLabel,
			className: cn("h-8 w-full min-w-0 justify-between gap-2 rounded-md px-3 font-normal text-sm shadow-none", selectedOption ? "text-foreground" : "text-muted-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 flex-1 items-center gap-2",
				children: [selectedOption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessorRowIcon, { processorId: selectedOption.value }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate text-left",
					children: selectedOption?.label ?? placeholder
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 opacity-50" })]
		}),
		open,
		onOpenChange: setOpen,
		width: "var(--radix-popover-trigger-width)",
		contentHeight,
		bottomAction: [{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-3.5" }),
			label: settingsLabel,
			onClick: handleSettingsNavigate
		}, {
			type: "selectable",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash, { className: "size-3.5" }),
			label: placeholder,
			selected: value === null,
			onClick: () => handleSelect(null)
		}],
		contentProps: {
			onKeyDown: handleKeyDown,
			onOpenAutoFocus: (event) => {
				event.preventDefault();
				listRef.current?.focus();
			}
		},
		"data-testid": "file-processor-selector-content",
		children: ({ availableListHeight }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
			id: listboxId,
			ref: listRef,
			role: "listbox",
			"aria-label": ariaLabel,
			"aria-activedescendant": activeOptionId,
			tabIndex: 0,
			className: "min-h-0 flex-1 px-1 py-1 outline-none",
			style: { height: availableListHeight ?? listHeight },
			children: options.map((option, index) => {
				const selected = option.value === value;
				const active = index === activeIndex;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-0.5",
					"data-listbox-option-index": index,
					onMouseEnter: () => {
						if (!option.disabled) setActiveIndex(index);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelectorRow, {
						selected,
						focused: active,
						disabled: option.disabled,
						showSelectedIndicator: selected,
						leading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessorRowIcon, { processorId: option.value }),
						trailing: option.statusLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px]",
							children: option.statusLabel
						}) : void 0,
						onSelect: () => handleSelect(option.value),
						optionProps: {
							id: getOptionId(index),
							"aria-selected": selected,
							"data-active": active || void 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: option.label
						})
					})
				}, option.value);
			})
		})
	});
};
var openFileProcessingSettings = () => openSettingsTab("/settings/file-processing");
var requiresLocalOcrModel = (processorId) => FILE_PROCESSOR_LOCAL_MODEL[processorId] === "ocr";
var FileProcessingSection = ({ fileProcessorId, initialFileProcessorId, fileProcessorOptions, onFileProcessorChange }) => {
	const { t } = useTranslation();
	const { status, isStatusResolved } = useLocalModel("ocr");
	const { reachable, isResolved: isConnectivityResolved } = useOpenMineruConnectivity();
	const options = (0, import_react.useMemo)(() => fileProcessorOptions.flatMap((option) => {
		if (option.value === "open-mineru") {
			const unreachable = isConnectivityResolved && !reachable;
			const isPersistedSelection = option.value === initialFileProcessorId;
			if (unreachable && !isPersistedSelection) return [];
			return [{
				...option,
				disabled: option.disabled || !isConnectivityResolved || unreachable,
				statusLabel: unreachable ? t("knowledge.rag.processor_unreachable") : option.statusLabel
			}];
		}
		if (!requiresLocalOcrModel(option.value)) return [option];
		if (status === "unsupported") return option.value === initialFileProcessorId ? [{
			...option,
			disabled: true
		}] : [];
		const needsDownload = isStatusResolved && status !== "ready" && status !== "downloading";
		return [{
			...option,
			disabled: option.disabled || !isStatusResolved || status === "downloading",
			statusLabel: needsDownload ? t("knowledge.rag.processor_not_downloaded") : option.statusLabel
		}];
	}), [
		fileProcessorOptions,
		initialFileProcessorId,
		isConnectivityResolved,
		isStatusResolved,
		reachable,
		status,
		t
	]);
	const handleChange = async (value) => {
		if (value === "open-mineru" && (!isConnectivityResolved || !reachable)) return;
		if (value === null || !requiresLocalOcrModel(value)) {
			onFileProcessorChange(value);
			return;
		}
		if (!isStatusResolved || status === "downloading") return;
		if (status === "ready") {
			onFileProcessorChange(value);
			return;
		}
		if (!await LocalModelDownloadPopup_default.show({
			model: "ocr",
			description: t("settings.dependencies.localModels.ocr.subtitle")
		})) return;
		onFileProcessorChange(value);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.file-processing-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagFieldLabel, {
			label: t("knowledge.rag.file_processing"),
			hint: t("knowledge.rag.file_processing_hint")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileProcessorSelector, {
			"aria-label": t("knowledge.rag.file_processing"),
			value: fileProcessorId,
			options,
			placeholder: t("knowledge.rag.file_processing_none"),
			settingsLabel: t("common.go_to_settings"),
			onChange: (value) => void handleChange(value),
			onSettingsNavigate: openFileProcessingSettings
		})]
	});
};
var FileProcessingSection_default = FileProcessingSection;
var RerankSection = ({ rerankModelId, onRerankModelChange }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.rerank-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagFieldLabel, {
			label: t("knowledge.rag.rerank_model"),
			hint: t("knowledge.rag.hints.rerank_model")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeModelSelect, {
			"aria-label": t("knowledge.rag.rerank_model"),
			value: rerankModelId,
			placeholder: t("knowledge.rag.rerank_disabled"),
			noneOptionLabel: t("knowledge.rag.rerank_disabled"),
			filter: isRerankModel,
			onChange: onRerankModelChange
		})]
	});
};
var RerankSection_default = RerankSection;
var RetrievalSection = ({ documentCount, threshold, rerankModelId, onDocumentCountChange, onThresholdChange }) => {
	const { t } = useTranslation();
	const usesRelevanceThreshold = rerankModelId !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "knowledge.retrieval-section",
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagSliderField, {
			label: t("knowledge.rag.document_count"),
			hint: t("knowledge.rag.hints.document_count"),
			value: documentCount,
			onValueChange: onDocumentCountChange,
			min: 1,
			max: 50,
			step: 1,
			minLabel: "1",
			maxLabel: "50",
			formatValue: (value) => String(value)
		}), usesRelevanceThreshold ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagSliderField, {
			label: t("knowledge.rag.threshold"),
			hint: t("knowledge.rag.hints.threshold"),
			value: threshold,
			onValueChange: onThresholdChange,
			min: 0,
			max: 1,
			step: .1,
			minLabel: "0.0",
			maxLabel: "1.0",
			formatValue: (value) => value.toFixed(1)
		}) : null]
	});
};
var RetrievalSection_default = RetrievalSection;
var resolveEmbeddingModelChangeRoute = (itemCount, previousEmbeddingModelId) => {
	if (itemCount === 0) return "save-directly";
	if (previousEmbeddingModelId === null && typeof itemCount === "number" && itemCount > 0) return "enable-in-place";
	return "restore";
};
var FailedRagConfigPanel = ({ base, onRestoreBase }) => {
	const { t } = useTranslation();
	const failureReason = getKnowledgeBaseFailureReason(base, t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
		className: "flex h-full min-h-0 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-120 px-5 py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
				type: "error",
				message: t("knowledge.status.failed"),
				description: failureReason,
				"data-testid": "rag-failed-state",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					onClick: () => onRestoreBase(base),
					children: t("knowledge.restore.action")
				})
			})
		})
	});
};
var ActiveRagConfigPanel = ({ base, itemCount, onRestoreBase }) => {
	const { t } = useTranslation();
	const { initialValues, fileProcessorOptions, save, isLoading } = useKnowledgeRagConfig(base);
	const { fetchDimensions, isFetchingDimensions } = useEmbeddingDimensions();
	const { enableEmbedding, isEnabling } = useEnableKnowledgeBaseEmbedding();
	const [values, setValues] = (0, import_react.useState)(initialValues);
	(0, import_react.useEffect)(() => {
		setValues(initialValues);
	}, [initialValues]);
	const { validationErrorCodes, isDirty, canSave } = (0, import_react.useMemo)(() => getKnowledgeRagConfigFormState(initialValues, values), [initialValues, values]);
	const embeddingModelChangeRoute = values.embeddingModelId !== initialValues.embeddingModelId ? resolveEmbeddingModelChangeRoute(itemCount, initialValues.embeddingModelId) : null;
	const canEnableEmbeddingInPlace = embeddingModelChangeRoute === "enable-in-place";
	const requiresRestore = embeddingModelChangeRoute === "restore";
	const canSubmit = canSave || requiresRestore || canEnableEmbeddingInPlace;
	const handleSave = async () => {
		if (!canSubmit) return;
		if (!(values.embeddingModelId !== initialValues.embeddingModelId)) {
			try {
				await save(values);
				toast.success(t("knowledge.rag.saved"));
			} catch (error) {
				toast.error(formatErrorMessageWithPrefix(error, t("knowledge.error.failed_to_edit")));
			}
			return;
		}
		const route = resolveEmbeddingModelChangeRoute(itemCount, initialValues.embeddingModelId);
		if (route === "restore") {
			onRestoreBase(base, { embeddingModelId: values.embeddingModelId });
			return;
		}
		let dimensions = null;
		if (values.embeddingModelId) try {
			dimensions = await fetchDimensions(values.embeddingModelId);
		} catch (error) {
			toast.error(formatErrorMessageWithPrefix(error, t("message.error.get_embedding_dimensions")));
			return;
		}
		if (route === "enable-in-place") {
			try {
				const patch = buildKnowledgeRagConfigPatch(initialValues, values);
				await enableEmbedding(base.id, {
					...patch,
					embeddingModelId: values.embeddingModelId,
					dimensions
				});
				toast.success(t("knowledge.rag.saved"));
			} catch (error) {
				toast.error(formatErrorMessageWithPrefix(error, t("knowledge.error.failed_to_edit")));
			}
			return;
		}
		try {
			await save(values, {
				embeddingModelId: values.embeddingModelId,
				dimensions
			});
			toast.success(t("knowledge.rag.saved"));
		} catch (error) {
			toast.error(formatErrorMessageWithPrefix(error, t("knowledge.error.failed_to_edit")));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(KnowledgePanelShell_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
		className: "min-h-0 flex-1 px-6 py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileProcessingSection_default, {
					fileProcessorId: values.fileProcessorId,
					initialFileProcessorId: initialValues.fileProcessorId,
					fileProcessorOptions,
					onFileProcessorChange: (fileProcessorId) => setValues((currentValues) => ({
						...currentValues,
						fileProcessorId
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmbeddingSection_default, {
					embeddingModelId: values.embeddingModelId,
					onEmbeddingModelChange: (embeddingModelId) => setValues((currentValues) => ({
						...currentValues,
						embeddingModelId
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RerankSection_default, {
					rerankModelId: values.rerankModelId,
					onRerankModelChange: (rerankModelId) => setValues((currentValues) => ({
						...currentValues,
						rerankModelId
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetrievalSection_default, {
					documentCount: values.documentCount,
					threshold: values.threshold,
					rerankModelId: values.rerankModelId,
					onDocumentCountChange: (documentCount) => setValues((currentValues) => ({
						...currentValues,
						documentCount
					})),
					onThresholdChange: (threshold) => setValues((currentValues) => ({
						...currentValues,
						threshold
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "advanced",
						className: "border-border-subtle last:border-b",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, { children: t("common.advanced_settings") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "flex flex-col gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChunkingSection_default, {
								chunkStrategy: values.chunkStrategy,
								chunkSeparator: values.chunkSeparator,
								chunkSize: values.chunkSize,
								chunkOverlap: values.chunkOverlap,
								chunkSizeErrorCode: validationErrorCodes.chunkSize,
								chunkOverlapErrorCode: validationErrorCodes.chunkOverlap,
								chunkSeparatorErrorCode: validationErrorCodes.chunkSeparator,
								onChunkStrategyChange: (chunkStrategy) => setValues((currentValues) => ({
									...currentValues,
									chunkStrategy
								})),
								onChunkSeparatorChange: (chunkSeparator) => setValues((currentValues) => ({
									...currentValues,
									chunkSeparator
								})),
								onChunkSizeChange: (chunkSize) => setValues((currentValues) => ({
									...currentValues,
									chunkSize: chunkSize.replace(/\D/g, "")
								})),
								onChunkOverlapChange: (chunkOverlap) => setValues((currentValues) => ({
									...currentValues,
									chunkOverlap: chunkOverlap.replace(/\D/g, "")
								}))
							})
						})]
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(KnowledgeDialogFooter, {
		className: "shrink-0 border-border-subtle border-t px-6 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "ghost",
			size: "sm",
			disabled: !isDirty || isLoading,
			className: "mr-auto text-muted-foreground hover:text-foreground",
			onClick: () => setValues(initialValues),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), t("knowledge.rag.reset_action")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "emphasis",
			loading: isLoading || isFetchingDimensions || isEnabling,
			disabled: !canSubmit,
			onClick: handleSave,
			children: requiresRestore ? t("knowledge.restore.submit") : t("knowledge.rag.save_action")
		})]
	})] });
};
var RagConfigPanel = (props) => {
	if (props.base.status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FailedRagConfigPanel, { ...props });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveRagConfigPanel, { ...props });
};
var RagConfigPanel_default = RagConfigPanel;
export { RagConfigPanel_default as default };
