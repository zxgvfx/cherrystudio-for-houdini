import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./es2015-DmjbZU9-.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import "./purify.es-Cmt93dJl.js";
import "./useTheme-CbMe73se.js";
import "./useMermaid-BXipJuXT.js";
import "./ipc-BDTAufGC.js";
import "./file-KsLXrn8b.js";
import "./file-DzPAqnYr.js";
import "./toast-DKTI9lZN.js";
import { t as FileWarning } from "./file-warning-DsBgOFak.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import { t as Workflow } from "./workflow-BQsbkoln.js";
import "./popup-BqV2ZD7D.js";
import "./image-C_pRJZT2.js";
import "./ResetIcon-kMtS8h06.js";
import "./LoadingIcon-CmUpDics.js";
import "./utils-B0nOeIAi.js";
import "./ActionTools-ecx3HpwU.js";
import "./ImagePreviewService-DviiwJKX.js";
import { t as GraphvizPreview_default } from "./GraphvizPreview-B3KPLPOQ.js";
import { t as MermaidPreview_default } from "./MermaidPreview-BxYhbli4.js";
import { t as PlantUmlPreview_default } from "./PlantUmlPreview-Df9vkfce.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-B1WTzID2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("DiagramFilePreview");
var DIAGRAM_PREVIEW_MAX_SIZE_MIB = 2;
var DIAGRAM_PREVIEW_MAX_SIZE_BYTES = DIAGRAM_PREVIEW_MAX_SIZE_MIB * 1024 * 1024;
var RENDERERS = {
	mermaid: MermaidPreview_default,
	graphviz: GraphvizPreview_default,
	plantuml: PlantUmlPreview_default
};
var EXTENSION_TO_KIND = {
	mmd: "mermaid",
	mermaid: "mermaid",
	dot: "graphviz",
	gv: "graphviz",
	puml: "plantuml",
	plantuml: "plantuml",
	iuml: "plantuml"
};
function getDiagramKind(fileName) {
	return EXTENSION_TO_KIND[fileName.toLowerCase().split(".").pop() ?? ""] ?? "mermaid";
}
function DiagramFilePreview({ filePath, fileName, metadata, refreshKey }) {
	const { t } = useTranslation();
	const [loadState, setLoadState] = (0, import_react.useState)({ status: "loading" });
	const Renderer = RENDERERS[(0, import_react.useMemo)(() => getDiagramKind(fileName), [fileName])];
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoadState({ status: "loading" });
		(async () => {
			try {
				if (metadata.size === 0) {
					setLoadState({ status: "empty" });
					return;
				}
				if (metadata.size > DIAGRAM_PREVIEW_MAX_SIZE_BYTES) {
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
				logger.error(`Failed to read diagram preview: ${filePath}`, normalized);
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
	if (loadState.status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.diagram-file-preview.status",
		role: "status",
		className: "flex h-full items-center justify-center gap-2 text-muted-foreground text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-4 animate-spin",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("file_preview.loading") })]
	}) });
	if (loadState.status === "empty") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.diagram-file-preview.status",
		role: "status",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Workflow,
			title: t("file_preview.text.empty.title"),
			description: t("file_preview.text.empty.description"),
			className: "h-full"
		})
	}) });
	if (loadState.status === "too_large") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.diagram-file-preview.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileWarning,
			title: t("file_preview.text.too_large.title"),
			description: t("file_preview.text.too_large.description", { limit: DIAGRAM_PREVIEW_MAX_SIZE_MIB }),
			className: "h-full"
		})
	}) });
	if (loadState.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.diagram-file-preview.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileWarning,
			title: t("file_preview.text.read_error.title"),
			description: t("file_preview.load_error.description"),
			className: "h-full"
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-full w-full p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Renderer, {
			enableToolbar: true,
			children: loadState.content
		})
	}) }) });
}
export { DiagramFilePreview as default };
