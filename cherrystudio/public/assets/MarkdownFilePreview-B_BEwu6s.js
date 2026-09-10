const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CodeViewer-Cn7MfYiz.js","./dist-oTn6Mzbo.js","./lib-cWyaA6i9.js","./rolldown-runtime-D8OvLAZx.js","./zwitch-D4MLDKRr.js","./react-dom-D5lMhlFn.js","./react-C1DTAr29.js","./jsx-runtime-Cc0-uZGc.js","./CodeViewer-DvhZTSjd.js","./esm-Dxo6iURQ.js","./debounce-fOdNUTaO.js","./usePreference-DRNUEk4I.js","./PreferenceService-CvpJqJd7.js","./isEqual-C7zEE0RK.js","./schemas-1oAyIgyK.js","./LoggerService-ChVOAPl8.js","./useCodeStyle-hWHmowmT.js","./style-BQVh98fR.js","./clsx-QWGtB080.js","./bundle-mjs-DzarEL82.js","./shiki-g8Tr0-KC.js","./preload-helper-Cs2ugBNd.js","./asyncInitializer-B9PC8Ae7.js","./uuid-DhKGupY-.js","./v4-D_N0UQip.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import "./dayjs.min-BBb2vAs7.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import "./react-dom-D5lMhlFn.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as EmptyState } from "./empty-state-IUSabDcM.js";
import { t as Markdown } from "./markdown-CDY5Xb9A.js";
import "./chunk-BO2N2NFS-fKJ-DR8B.js";
import "./extend-BDo4rIBl.js";
import "./marked.esm-5kn1DqGn.js";
import "./dist-Bsd0pttl.js";
import { n as withFullMarkdown } from "./presets-DUE4KxHS.js";
import "./dist-oTn6Mzbo.js";
import "./dist-ry9cWLbi.js";
import "./katex-hMbgOs8f.js";
import "./src-BxTmfvcS.js";
import "./chunk-7R4GIKGN-Dhqhodyz.js";
import "./purify.es-RDRNldMc.js";
import "./src-BkCZtMji.js";
import "./chunk-GEFDOKGD-CjhhL8_m.js";
import "./chunk-HHEYEP7N-BdBCwgnw.js";
import "./chunk-XPW4576I-DfKBLxcn.js";
import "./chunk-MX3YWQON-BCZ6eQbh.js";
import "./dist-CyZmekFX.js";
import "./chunk-YBOYWFTD-oI8qIE65.js";
import "./chunk-PQ6SQG4A-lGU_NePG.js";
import "./chunk-PU5JKC2W-B6_FzVbS.js";
import "./chunk-KYZI473N-C2tcBmRB.js";
import "./chunk-O4XLMI2P-aY1SO_x2.js";
import "./chunk-GLR3WWYH-47_v3MWD.js";
import "./mermaid.core-EJboeJDS.js";
import { t as SegmentedControl } from "./segmented-control-BPwDi61u.js";
import { t as FileText } from "./file-text-8OMsybAB.js";
import { t as FileWarning } from "./file-warning-fWEPemj9.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-luXf9AC0.js";
import { t as FilePreviewToolbar } from "./FilePreviewToolbar-DXhEtJV1.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function MarkdownFilePreviewToolbar({ disabled, mode, onModeChange }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbar, {
		"aria-label": t("preview.label"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
			size: "sm",
			"aria-label": t("file_preview.markdown.mode.label"),
			className: "rounded-md [&>button]:h-6 [&>button]:rounded-sm [&>button]:px-2",
			disabled,
			value: mode,
			onValueChange: onModeChange,
			options: [{
				value: "preview",
				label: t("file_preview.markdown.mode.preview")
			}, {
				value: "source",
				label: t("file_preview.markdown.mode.source")
			}]
		})
	});
}
var logger = loggerService.withContext("MarkdownFilePreview");
var MARKDOWN_PREVIEW_MAX_SIZE_MIB = 2;
var MARKDOWN_PREVIEW_MAX_SIZE_BYTES = MARKDOWN_PREVIEW_MAX_SIZE_MIB * 1024 * 1024;
var MARKDOWN_PLUGINS = withFullMarkdown();
var LazyCodeViewer = (0, import_react.lazy)(() => __vitePreload(() => import("./CodeViewer-Cn7MfYiz.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]), import.meta.url));
function MarkdownPreviewLoading() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.markdown-preview-loading.status",
		role: "status",
		className: "flex h-full items-center justify-center gap-2 text-muted-foreground text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-4 animate-spin",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("file_preview.loading") })]
	});
}
function MarkdownPreviewError() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.markdown-preview-error.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileWarning,
			title: t("file_preview.markdown.read_error.title"),
			description: t("file_preview.load_error.description"),
			className: "h-full"
		})
	});
}
function MarkdownPreviewTooLarge() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.markdown-preview-too-large.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileWarning,
			title: t("file_preview.markdown.too_large.title"),
			description: t("file_preview.markdown.too_large.description", { limit: MARKDOWN_PREVIEW_MAX_SIZE_MIB }),
			className: "h-full"
		})
	});
}
function MarkdownPreviewEmpty() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FileText,
		title: t("file_preview.markdown.empty.title"),
		description: t("file_preview.markdown.empty.description"),
		className: "h-full"
	});
}
function MarkdownPreviewContent({ loadState, markdownId, mode }) {
	const { t } = useTranslation();
	if (loadState.status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownPreviewLoading, {});
	if (loadState.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownPreviewError, {});
	if (loadState.status === "too_large") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownPreviewTooLarge, {});
	if (mode === "source") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.markdown-preview-content",
		className: "flex min-h-full w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownPreviewLoading, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyCodeViewer, {
				value: loadState.content,
				language: "markdown",
				wrapped: true,
				className: "min-w-0 flex-1 overflow-hidden"
			})
		})
	});
	if (loadState.content.trim().length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownPreviewEmpty, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.markdown-preview-content",
		className: "mx-auto w-full max-w-4xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			id: markdownId,
			plugins: MARKDOWN_PLUGINS,
			footnoteLabel: t("common.footnotes"),
			children: loadState.content
		})
	});
}
function MarkdownFilePreview({ filePath, metadata, refreshKey, type = "file" }) {
	const markdownId = (0, import_react.useId)();
	const [mode, setMode] = (0, import_react.useState)("preview");
	const [loadState, setLoadState] = (0, import_react.useState)({ status: "loading" });
	const effectiveMode = type === "artifact" ? "preview" : mode;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoadState({ status: "loading" });
		(async () => {
			try {
				if (metadata.size > MARKDOWN_PREVIEW_MAX_SIZE_BYTES) {
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
				logger.error(`Failed to read Markdown preview: ${filePath}`, normalized);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilePreviewLayout.Frame, { children: [type === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownFilePreviewToolbar, {
		disabled: loadState.status !== "ready",
		mode,
		onModeChange: setMode
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownPreviewContent, {
		loadState,
		markdownId,
		mode: effectiveMode
	}) })] });
}
export { MarkdownFilePreview as default };
