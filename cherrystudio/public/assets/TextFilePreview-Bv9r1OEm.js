import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as EmptyState } from "./empty-state-IUSabDcM.js";
import "./dist-oTn6Mzbo.js";
import "./useCodeStyle-hWHmowmT.js";
import "./shiki-g8Tr0-KC.js";
import { t as FileText } from "./file-text-8OMsybAB.js";
import { t as FileWarning } from "./file-warning-fWEPemj9.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { t as CodeViewer_default } from "./CodeViewer-DvhZTSjd.js";
import { n as getLanguageByFilePath } from "./codeLanguage-D_-GyKr9.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-luXf9AC0.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("TextFilePreview");
var TEXT_PREVIEW_MAX_SIZE_MIB = 2;
var TEXT_PREVIEW_MAX_SIZE_BYTES = TEXT_PREVIEW_MAX_SIZE_MIB * 1024 * 1024;
function TextPreviewLoading() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.text-preview-loading.status",
		role: "status",
		className: "flex h-full items-center justify-center gap-2 text-muted-foreground text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-4 animate-spin",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("file_preview.loading") })]
	});
}
function TextPreviewEmpty() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.text-preview-empty.status",
		role: "status",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileText,
			title: t("file_preview.text.empty.title"),
			description: t("file_preview.text.empty.description"),
			className: "h-full"
		})
	});
}
function TextPreviewTooLarge() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.text-preview-too-large.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileWarning,
			title: t("file_preview.text.too_large.title"),
			description: t("file_preview.text.too_large.description", { limit: TEXT_PREVIEW_MAX_SIZE_MIB }),
			className: "h-full"
		})
	});
}
function TextPreviewError() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.text-preview-error.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileWarning,
			title: t("file_preview.text.read_error.title"),
			description: t("file_preview.load_error.description"),
			className: "h-full"
		})
	});
}
function TextPreviewContent({ filePath, loadState }) {
	if (loadState.status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPreviewLoading, {});
	if (loadState.status === "empty") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPreviewEmpty, {});
	if (loadState.status === "too_large") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPreviewTooLarge, {});
	if (loadState.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPreviewError, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.text-preview-content",
		className: "min-h-full w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeViewer_default, {
			value: loadState.content,
			language: getLanguageByFilePath(filePath),
			wrapped: false,
			className: "min-h-full w-full"
		})
	});
}
function TextFilePreview({ filePath, metadata, refreshKey }) {
	const [loadState, setLoadState] = (0, import_react.useState)({ status: "loading" });
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoadState({ status: "loading" });
		(async () => {
			try {
				if (metadata.size === 0) {
					setLoadState({ status: "empty" });
					return;
				}
				if (metadata.size > TEXT_PREVIEW_MAX_SIZE_BYTES) {
					setLoadState({ status: "too_large" });
					return;
				}
				const content = await window.api.fs.readText(filePath);
				if (!cancelled) setLoadState({
					status: "ready",
					content
				});
			} catch (error) {
				if (cancelled) return;
				const normalized = error instanceof Error ? error : new Error(String(error));
				logger.error(`Failed to read text preview: ${filePath}`, normalized);
				setLoadState({
					status: "error",
					error: normalized
				});
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		filePath,
		metadata.size,
		refreshKey
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextPreviewContent, {
		filePath,
		loadState
	}) }) });
}
export { TextFilePreview as default };
