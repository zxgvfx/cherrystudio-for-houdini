const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CodeViewer-D_6PkJe0.js","./dist-Cu7DuZHc.js","./lib-6TKYmTQn.js","./chunk-DiqNceaa.js","./zwitch-B7UdpQMH.js","./react-dom-CKbeLgrG.js","./react-BgPOU4At.js","./jsx-runtime-DCB_IiL2.js","./CodeViewer-DGoFKh5Z.js","./esm-D1CPXB7e.js","./debounce-BIuc7S_h.js","./usePreference-78czMD_R.js","./PreferenceService-Ba0ofBX2.js","./isEqual-DO7BtJs5.js","./schemas-CV_EtlSZ.js","./LoggerService-oVV4iwe6.js","./useCodeStyle-ZK5esKOR.js","./style-qqUWb85F.js","./clsx-Bu5J6-zp.js","./bundle-mjs-CwOjJOmf.js","./shiki-pLteNJ2v.js","./preload-helper-BAxOQgJR.js","./asyncInitializer-CQLJDRoG.js","./uuid-DNJDgQB1.js","./v4-BSqPk4tJ.js"])))=>i.map(i=>d[i]);
import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import "./react-dom-CKbeLgrG.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { t as SegmentedControl } from "./segmented-control-DMdgjBZR.js";
import "./file-KsLXrn8b.js";
import { i as toSafeFileUrl } from "./file-DzPAqnYr.js";
import { t as FileCode } from "./file-code-DAX41OX2.js";
import { t as FileWarning } from "./file-warning-DsBgOFak.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import { t as getFilePreviewExtension } from "./filePreview-DwIS9Jdg.js";
import { i as HtmlPreviewFrame_default, n as HTML_PREVIEW_RESTRICTED_CSP, r as HTML_PREVIEW_RESTRICTED_SANDBOX, t as HTML_PREVIEW_IFRAME_SANDBOX } from "./HtmlPreviewFrame-3dB4slDg.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-B1WTzID2.js";
import { t as FilePreviewToolbar } from "./FilePreviewToolbar-CQBIVGt4.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function HtmlFilePreviewToolbar({ disabled, mode, onModeChange }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbar, {
		"aria-label": t("preview.label"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
			size: "sm",
			"aria-label": t("file_preview.html.mode.label"),
			className: "rounded-md [&>button]:h-6 [&>button]:rounded-sm [&>button]:px-2",
			disabled,
			value: mode,
			onValueChange: onModeChange,
			options: [{
				value: "preview",
				label: t("file_preview.html.mode.preview")
			}, {
				value: "source",
				label: t("file_preview.html.mode.source")
			}]
		})
	});
}
var logger = loggerService.withContext("HtmlFilePreview");
var HTML_PREVIEW_MAX_SIZE_MIB = 2;
var HTML_PREVIEW_MAX_SIZE_BYTES = HTML_PREVIEW_MAX_SIZE_MIB * 1024 * 1024;
var LazyCodeViewer = (0, import_react.lazy)(() => __vitePreload(() => import("./CodeViewer-D_6PkJe0.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]), import.meta.url));
var HTML_PREVIEW_POLICIES = {
	artifact: { sandbox: HTML_PREVIEW_IFRAME_SANDBOX },
	file: {
		csp: HTML_PREVIEW_RESTRICTED_CSP,
		sandbox: ""
	}
};
function HtmlPreviewLoading() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.html-preview-loading.status",
		role: "status",
		className: "flex h-full items-center justify-center gap-2 text-muted-foreground text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-4 animate-spin",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("file_preview.loading") })]
	});
}
function HtmlPreviewError() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.html-preview-error.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileWarning,
			title: t("file_preview.html.read_error.title"),
			description: t("file_preview.load_error.description"),
			className: "h-full"
		})
	});
}
function HtmlPreviewTooLarge() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.html-preview-too-large.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileWarning,
			title: t("file_preview.html.too_large.title"),
			description: t("file_preview.html.too_large.description", { limit: HTML_PREVIEW_MAX_SIZE_MIB }),
			className: "h-full"
		})
	});
}
function HtmlPreviewEmpty() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FileCode,
		title: t("file_preview.html.empty.title"),
		description: t("file_preview.html.empty.description"),
		className: "h-full"
	});
}
function HtmlPreviewContent({ loadState, fileName, baseUrl, mode, previewType }) {
	if (loadState.status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlPreviewLoading, {});
	if (loadState.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlPreviewError, {});
	if (loadState.status === "too_large") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlPreviewTooLarge, {});
	if (mode === "source") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.html-preview-content",
		className: "flex min-h-full w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlPreviewLoading, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyCodeViewer, {
				value: loadState.content,
				language: "html",
				wrapped: true,
				className: "min-w-0 flex-1 overflow-hidden"
			})
		})
	});
	if (loadState.content.trim().length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlPreviewEmpty, {});
	const policy = HTML_PREVIEW_POLICIES[previewType];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.html-preview-content",
		className: "h-full bg-white [&>div]:bg-white [&_iframe]:bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlPreviewFrame_default, {
			html: loadState.content,
			title: fileName,
			baseUrl,
			...policy
		})
	});
}
function HtmlFilePreview({ filePath, fileName, metadata, refreshKey, type = "file" }) {
	const [mode, setMode] = (0, import_react.useState)("preview");
	const [loadState, setLoadState] = (0, import_react.useState)({ status: "loading" });
	const baseUrl = (0, import_react.useMemo)(() => toSafeFileUrl(filePath, getFilePreviewExtension(filePath)), [filePath]);
	const effectiveMode = type === "artifact" ? "preview" : mode;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoadState({ status: "loading" });
		(async () => {
			try {
				if (metadata.size > HTML_PREVIEW_MAX_SIZE_BYTES) {
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
				logger.error(`Failed to read HTML preview: ${filePath}`, normalized);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilePreviewLayout.Frame, { children: [type === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlFilePreviewToolbar, {
		disabled: loadState.status !== "ready",
		mode,
		onModeChange: setMode
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlPreviewContent, {
		loadState,
		fileName,
		baseUrl,
		mode: effectiveMode,
		previewType: type
	}) })] });
}
export { HtmlFilePreview as default };
