const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CodeViewer-D_6PkJe0.js","./dist-Cu7DuZHc.js","./lib-6TKYmTQn.js","./chunk-DiqNceaa.js","./zwitch-B7UdpQMH.js","./react-dom-CKbeLgrG.js","./react-BgPOU4At.js","./jsx-runtime-DCB_IiL2.js","./CodeViewer-DGoFKh5Z.js","./esm-D1CPXB7e.js","./debounce-BIuc7S_h.js","./usePreference-78czMD_R.js","./PreferenceService-Ba0ofBX2.js","./isEqual-DO7BtJs5.js","./schemas-CV_EtlSZ.js","./LoggerService-oVV4iwe6.js","./useCodeStyle-ZK5esKOR.js","./style-qqUWb85F.js","./clsx-Bu5J6-zp.js","./bundle-mjs-CwOjJOmf.js","./shiki-pLteNJ2v.js","./preload-helper-BAxOQgJR.js","./asyncInitializer-CQLJDRoG.js","./uuid-DNJDgQB1.js","./v4-BSqPk4tJ.js"])))=>i.map(i=>d[i]);
import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import "./dayjs.min-CNu3tPBh.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import "./react-dom-CKbeLgrG.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { t as Markdown } from "./markdown-CUccgRk8.js";
import "./lib-BGOUa2xQ.js";
import "./chunk-BO2N2NFS-tlJFVTTK.js";
import "./marked.esm-Dt1bmnBy.js";
import "./dist-CAn2sUiv.js";
import { r as withFullMarkdown } from "./presets-DvKIcYCC.js";
import "./dist-Cu7DuZHc.js";
import "./dist-J1XnJP4k.js";
import "./katex-CRJeAHCa.js";
import "./src-BNJs7-l-.js";
import "./chunk-7R4GIKGN-CHXwpkSF.js";
import "./purify.es-Cmt93dJl.js";
import "./chunk-GEFDOKGD-B_rlJtFs.js";
import "./chunk-HHEYEP7N-B76yzjbd.js";
import "./chunk-XPW4576I-DHZ4kD6k.js";
import "./chunk-MX3YWQON-DlWEgeua.js";
import "./dist-CxgTYLYB.js";
import "./chunk-YBOYWFTD-D3-zQtJQ.js";
import "./chunk-PQ6SQG4A-BOmZ971H.js";
import "./chunk-PU5JKC2W-Cu-wUjZK.js";
import "./chunk-KYZI473N-Du-OPVjy.js";
import "./chunk-O4XLMI2P-DQGMYyCL.js";
import "./chunk-GLR3WWYH-BZcQpS2m.js";
import "./mermaid.core-BYrqrmUv.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import { t as FileText } from "./file-text-C2NTQkH7.js";
import { t as FileWarning } from "./file-warning-DsBgOFak.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-B1WTzID2.js";
import { t as FilePreviewToolbar } from "./FilePreviewToolbar-CQBIVGt4.js";
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
var LazyCodeViewer = (0, import_react.lazy)(() => __vitePreload(() => import("./CodeViewer-D_6PkJe0.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]), import.meta.url));
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
