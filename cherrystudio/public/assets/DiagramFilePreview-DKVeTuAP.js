import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./es2015-wfS3L7va.js";
import { t as EmptyState } from "./empty-state-IUSabDcM.js";
import "./purify.es-RDRNldMc.js";
import "./useTheme-mM6gKAcD.js";
import "./ipc-DpcwPFwy.js";
import "./file-OKCzlHoD.js";
import "./file-CkrjUGO_.js";
import "./toast-D2efAzAF.js";
import { t as FileWarning } from "./file-warning-fWEPemj9.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { t as Workflow } from "./workflow-3FyQTBiU.js";
import "./popup-fJcKiA2S.js";
import "./image-DyuN5EBc.js";
import "./ImagePreviewService-B71uVdEp.js";
import "./utils-Bmb3FmSZ.js";
import "./ActionTools-Buww6P9E.js";
import "./LoadingIcon-CDdNXnOv.js";
import "./ResetIcon-DgMgoLHf.js";
import { t as GraphvizPreview_default } from "./GraphvizPreview-CZDXhSTP.js";
import { t as MermaidPreview_default } from "./MermaidPreview-BNPIuu26.js";
import { t as PlantUmlPreview_default } from "./PlantUmlPreview-7Mhpxay4.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-luXf9AC0.js";
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
