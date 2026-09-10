import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { n as UiDataSlot, r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as Button } from "./button-BBhIgYp8.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DwmxJH-S.js";
import { n as ipcApi } from "./ipc-DpcwPFwy.js";
import { a as isUniqueModelId, r as UniqueModelIdSchema } from "./model-BOGgSmTN.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as ChevronDown } from "./chevron-down-CZ6Nbooa.js";
import { t as Download } from "./download-WNh7i55M.js";
import { t as RefreshCw } from "./refresh-cw-pKTKelZa.js";
import { n as createPopup } from "./popup-fJcKiA2S.js";
import { O as isEmbeddingModel } from "./provider-bQl8RVRp.js";
import { i as useModels } from "./useModel-kU1hKaYa.js";
import { t as ModelSelector } from "./ModelSelector-DGMGvnR1.js";
import { i as LOCAL_EMBEDDING_UNIQUE_MODEL_ID, n as LOCAL_EMBEDDING_DIMENSIONS, r as LOCAL_EMBEDDING_PROVIDER_ID } from "./providerSettings-DJmmyeTu.js";
import { r as normalizeKnowledgeError } from "./error-Bm05Af8U.js";
import { t as LocalModelDownloadProgress } from "./LocalModelDownloadProgress-CvZiSVaT.js";
import { t as useLocalModel } from "./useLocalModel-Bvd9zJkF.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
const KnowledgeDialogHeader = ({ children, className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
		className: cn("pr-8 text-left", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children })
	});
};
const KnowledgeDialogBody = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "knowledge.dialog-body",
		className: cn("space-y-3", className),
		...mergeUiProps(props, "knowledge.dialog-body")
	});
};
const KnowledgeDialogField = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "knowledge.dialog-field",
		className: cn("space-y-1.5", className),
		...mergeUiProps(props, "knowledge.dialog-field")
	});
};
const KnowledgeDialogFooter = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
		className,
		...props
	});
};
var KnowledgePanelShell = ({ children, header, headerClassName, className }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-ui": "knowledge.panel-shell",
		className: `flex h-full min-h-0 flex-1 flex-col ${className ?? ""}`,
		children: [header ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: headerClassName ?? "shrink-0 px-3 pt-3 pb-2",
			children: header
		}) : null, children]
	});
};
var KnowledgePanelShell_default = KnowledgePanelShell;
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useEmbeddingDimensions");
var EMBEDDING_DIMENSION_PROBE_TEXT = "test";
var INVALID_EMBEDDING_DIMENSIONS_ERROR = "Invalid embedding dimensions";
var getEmbeddingDimensions = (embeddings) => {
	const dimensions = embeddings[0]?.length ?? 0;
	if (dimensions <= 0) throw new Error(INVALID_EMBEDDING_DIMENSIONS_ERROR);
	return dimensions;
};
var fetchEmbeddingDimensions = async (uniqueModelId) => {
	try {
		const parsedModelId = UniqueModelIdSchema.parse(uniqueModelId);
		if (parsedModelId === LOCAL_EMBEDDING_UNIQUE_MODEL_ID) return LOCAL_EMBEDDING_DIMENSIONS;
		const { embeddings } = await ipcApi.request("ai.embedding.embed_many", {
			uniqueModelId: parsedModelId,
			values: [EMBEDDING_DIMENSION_PROBE_TEXT]
		});
		return getEmbeddingDimensions(embeddings);
	} catch (error) {
		const normalizedError = normalizeKnowledgeError(error);
		logger.error("Failed to get embedding dimensions", normalizedError, { uniqueModelId });
		throw normalizedError;
	}
};
const useEmbeddingDimensions = () => {
	const [isFetchingDimensions, setIsFetchingDimensions] = (0, import_react.useState)(false);
	return {
		fetchDimensions: (0, import_react.useCallback)(async (uniqueModelId) => {
			setIsFetchingDimensions(true);
			return fetchEmbeddingDimensions(uniqueModelId).then((dimensions) => {
				setIsFetchingDimensions(false);
				return dimensions;
			}, (error) => {
				setIsFetchingDimensions(false);
				throw error;
			});
		}, []),
		isFetchingDimensions
	};
};
var PopupContainer = ({ open, resolve, model, description }) => {
	const { t } = useTranslation();
	const { status, percent, download, cancel } = useLocalModel(model);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const downloading = status === "downloading";
	const handleDownload = (0, import_react.useCallback)(async () => {
		setFailed(false);
		try {
			resolve(await download());
		} catch {
			toast.error(t("settings.dependencies.localModels.notice.downloadFailed"));
			setFailed(true);
		}
	}, [
		download,
		resolve,
		t
	]);
	const handleCancel = (0, import_react.useCallback)(() => {
		if (!downloading) {
			resolve(false);
			return;
		}
		cancel();
	}, [
		cancel,
		downloading,
		resolve
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (0, import_react.useCallback)((next) => {
			if (!next) handleCancel();
		}, [handleCancel]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			showCloseButton: false,
			closeOnOverlayClick: !downloading,
			overlayClassName: "z-[90]",
			className: cn("confirm-popup z-[90] gap-5 sm:max-w-lg"),
			onInteractOutside: (event) => {
				if (downloading) event.preventDefault();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mt-0.5 size-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-base leading-6",
								children: t("knowledge.rag.download_local_model")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "wrap-anywhere mt-2 min-w-0 max-w-full text-muted-foreground text-sm leading-5",
									children: description
								}) })
							})]
						})]
					})
				}),
				downloading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalModelDownloadProgress, { percent }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: handleCancel,
					children: t("common.cancel")
				}), downloading ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void handleDownload(),
					className: "gap-1",
					children: [failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), t(failed ? "common.retry" : "settings.dependencies.localModels.download")]
				})] })
			]
		})
	});
};
var LocalModelDownloadPopup_default = createPopup(PopupContainer, { dismissResult: false });
const KnowledgeModelSelect = ({ value, placeholder, filter, invalid = false, noneOptionLabel, "aria-label": ariaLabel, onSettingsNavigate, prioritizedProviderIds, onChange }) => {
	const { models } = useModels({ enabled: true });
	const selectorValue = value && isUniqueModelId(value) ? value : void 0;
	const selectedModel = (0, import_react.useMemo)(() => selectorValue ? models.find((model) => model.id === selectorValue) : void 0, [models, selectorValue]);
	const hasValue = Boolean(value);
	const triggerLabel = selectedModel?.name ?? (value || placeholder);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelector, {
		multiple: false,
		selectionType: "id",
		value: selectorValue,
		filter,
		noneOptionLabel,
		prioritizedProviderIds,
		showTagFilter: false,
		onSettingsNavigate,
		onSelect: (modelId) => onChange(modelId ?? null),
		trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			"aria-label": ariaLabel,
			"aria-invalid": invalid || void 0,
			className: cn("h-8 w-full min-w-0 justify-between gap-2 rounded-md px-3 font-normal text-sm shadow-none", "aria-expanded:border-primary aria-expanded:ring-3 aria-expanded:ring-primary/20", hasValue ? "text-foreground" : "text-muted-foreground", invalid && "aria-expanded:border-error-border aria-expanded:ring-error/20 aria-invalid:border-error-border aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 dark:aria-expanded:ring-error/40"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate text-left",
				children: triggerLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 opacity-50" })]
		})
	});
};
var LOCAL_EMBEDDING_PRIORITIZED_PROVIDER_IDS = [LOCAL_EMBEDDING_PROVIDER_ID];
const KnowledgeEmbeddingModelSelect = (props) => {
	const { t } = useTranslation();
	const { onChange } = props;
	const { status, isStatusResolved } = useLocalModel("embedding");
	const handleChange = (0, import_react.useCallback)(async (modelId) => {
		if (modelId === LOCAL_EMBEDDING_UNIQUE_MODEL_ID && (!isStatusResolved || status === "unsupported")) return;
		if (modelId !== LOCAL_EMBEDDING_UNIQUE_MODEL_ID || status === "ready" || status === "downloading") {
			onChange(modelId);
			return;
		}
		if (!await LocalModelDownloadPopup_default.show({
			model: "embedding",
			description: t("settings.dependencies.localModels.embedding.subtitle")
		})) return;
		onChange(modelId);
	}, [
		isStatusResolved,
		onChange,
		status,
		t
	]);
	const filter = (0, import_react.useCallback)((model) => isEmbeddingModel(model) && (model.id !== LOCAL_EMBEDDING_UNIQUE_MODEL_ID || isStatusResolved && status !== "unsupported"), [isStatusResolved, status]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KnowledgeModelSelect, {
		...props,
		filter,
		prioritizedProviderIds: LOCAL_EMBEDDING_PRIORITIZED_PROVIDER_IDS,
		onChange: handleChange
	});
};
export { KnowledgePanelShell_default as a, KnowledgeDialogFooter as c, useEmbeddingDimensions as i, KnowledgeDialogHeader as l, KnowledgeModelSelect as n, KnowledgeDialogBody as o, LocalModelDownloadPopup_default as r, KnowledgeDialogField as s, KnowledgeEmbeddingModelSelect as t };
