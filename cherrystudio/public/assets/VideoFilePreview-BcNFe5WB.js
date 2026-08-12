import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import "./file-KsLXrn8b.js";
import { r as toFileUrl } from "./file-DzPAqnYr.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import { t as VideoOff } from "./video-off-CE0rK-2g.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-BHC9_5NZ.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("VideoFilePreview");
function VideoFilePreview({ filePath, fileName, refreshKey }) {
	const { t } = useTranslation();
	const [status, setStatus] = (0, import_react.useState)("loading");
	const src = (0, import_react.useMemo)(() => toFileUrl(filePath), [filePath]);
	if (status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.video-file-preview.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: VideoOff,
			title: t("file_preview.load_error.title"),
			description: t("file_preview.load_error.description"),
			className: "h-full"
		})
	}) }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-full min-w-full items-center justify-center bg-black/90 p-4",
		children: [status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "ui.video-file-preview.status",
			role: "status",
			className: "absolute inset-0 flex items-center justify-center gap-2 text-sm text-white/80",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "size-4 animate-spin",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("file_preview.loading") })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			src,
			title: fileName,
			controls: true,
			autoPlay: false,
			className: `max-h-full max-w-full ${status === "loading" ? "opacity-0" : "opacity-100"}`,
			onLoadedData: () => setStatus("ready"),
			onError: () => {
				const error = /* @__PURE__ */ new Error(`Failed to load video preview: ${filePath}`);
				logger.error(`Failed to load video preview: ${filePath}`, error);
				setStatus("error");
			}
		}, `${filePath}:${refreshKey}`)]
	}) }) });
}
export { VideoFilePreview as default };
