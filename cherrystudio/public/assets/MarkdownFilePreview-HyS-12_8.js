const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CodeViewer-b_Jk2kIF.js","./dist-CbafgI8N.js","./lib-AqQ05U-c.js","./rolldown-runtime-BeJLVFtF.js","./zwitch-CMg-OEjI.js","./react-dom-D-tOyCJ4.js","./react-DXAbXv4a.js","./jsx-runtime-DZOd5Dcc.js","./CodeViewer-DmsmcVO3.js","./esm-CA5JRyYP.js","./debounce-RtBWGQ3U.js","./usePreference-ChTcu0lP.js","./PreferenceService-ay5pWhVK.js","./isEqual-DO7BtJs5.js","./schemas-CV_EtlSZ.js","./LoggerService-CbighP69.js","./useCodeStyle-zD0Sb1Ey.js","./style-C-RkFX_x.js","./clsx-CQMseKZW.js","./bundle-mjs-D5m5eEe0.js","./shiki-5X_PGXXr.js","./preload-helper-DXC6tWlX.js","./asyncInitializer-DlV1NBgp.js","./uuid-85lqhJWx.js","./v4-B6Ihluzs.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import "./dayjs.min-EuyAzn7r.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import "./react-dom-D-tOyCJ4.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as EmptyState } from "./empty-state-C_9tC-cn.js";
import { t as Markdown } from "./markdown-Dg3BbXYd.js";
import "./chunk-BO2N2NFS-CPhdpqIF.js";
import "./extend-CpT6M6LO.js";
import "./marked.esm-CssjD7C2.js";
import "./dist-CmBt0G-t.js";
import { n as withFullMarkdown } from "./presets-8R5jEa7y.js";
import "./dist-CbafgI8N.js";
import "./dist-DIxdlCXd.js";
import "./katex-C7NQd6as.js";
import "./src-D2sM_phe.js";
import "./chunk-7R4GIKGN-BVEPjrNo.js";
import "./purify.es-BrXIkv5K.js";
import "./src-Axz2g2Kv.js";
import "./chunk-GEFDOKGD-DInWMQjv.js";
import "./chunk-HHEYEP7N-Dbtl_Ep5.js";
import "./chunk-XPW4576I-Bu3yEro8.js";
import "./chunk-MX3YWQON-DY4twLZB.js";
import "./dist-B5PWVjZI.js";
import "./chunk-YBOYWFTD-BnVFFCdP.js";
import "./chunk-PQ6SQG4A-Cr1sT05N.js";
import "./chunk-PU5JKC2W-C0QGORE3.js";
import "./chunk-KYZI473N-CHhb-TXw.js";
import "./chunk-O4XLMI2P-DrZN-nfG.js";
import "./chunk-GLR3WWYH-B9p3y8ao.js";
import "./mermaid.core-Du8Joszx.js";
import { t as SegmentedControl } from "./segmented-control-CAdhwi7C.js";
import { t as FileText } from "./file-text-CbEF-1I4.js";
import { t as FileWarning } from "./file-warning-ui1zoWuR.js";
import { t as LoaderCircle } from "./loader-circle-DIMPUHfk.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-CwTr3bPn.js";
import { t as FilePreviewToolbar } from "./FilePreviewToolbar-B4BS_Cd8.js";
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
var LazyCodeViewer = (0, import_react.lazy)(() => __vitePreload(() => import("./CodeViewer-b_Jk2kIF.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]), import.meta.url));
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
