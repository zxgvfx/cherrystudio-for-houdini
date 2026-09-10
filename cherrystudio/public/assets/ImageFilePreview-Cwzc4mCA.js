import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as loggerService } from "./LoggerService-ChVOAPl8.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./es2015-wfS3L7va.js";
import { t as EmptyState } from "./empty-state-IUSabDcM.js";
import { n as ImagePreviewViewport, t as useImagePreviewTransform } from "./use-image-preview-transform-BrWbXa0y.js";
import "./file-OKCzlHoD.js";
import { r as toFileUrl } from "./file-CkrjUGO_.js";
import { t as FlipHorizontal } from "./flip-horizontal-J4r1RQjP.js";
import { t as FlipVertical } from "./flip-vertical-DJP5vgex.js";
import { t as ImageOff } from "./image-off-DUrt1vKo.js";
import { t as LoaderCircle } from "./loader-circle-Cmg2d8Jz.js";
import { t as RefreshCcw } from "./refresh-ccw-D9LcaEB_.js";
import { t as RotateCcwSquare } from "./rotate-ccw-square-C2Y3qExz.js";
import { t as RotateCwSquare } from "./rotate-cw-square-B-z3TmmI.js";
import { t as ZoomIn } from "./zoom-in-C4WfI5mS.js";
import { t as ZoomOut } from "./zoom-out-BsUOfzYu.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-luXf9AC0.js";
import { t as FilePreviewToolbar } from "./FilePreviewToolbar-DXhEtJV1.js";
import { t as FilePreviewToolbarButton } from "./FilePreviewToolbarButton-CGx3ExsV.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ImageFilePreviewToolbar({ disabled, transformControls }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilePreviewToolbar, {
		"aria-label": t("preview.label"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbarButton, {
				label: t("preview.zoom_out"),
				disabled: disabled || !transformControls.canZoomOut,
				onClick: transformControls.zoomOut,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { "aria-hidden": true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbarButton, {
				label: t("preview.zoom_in"),
				disabled: disabled || !transformControls.canZoomIn,
				onClick: transformControls.zoomIn,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { "aria-hidden": true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbarButton, {
				label: t("preview.rotate_left"),
				disabled,
				onClick: transformControls.rotateLeft,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcwSquare, { "aria-hidden": true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbarButton, {
				label: t("preview.rotate_right"),
				disabled,
				onClick: transformControls.rotateRight,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCwSquare, { "aria-hidden": true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbarButton, {
				label: t("preview.flip_horizontal"),
				disabled,
				onClick: transformControls.flipHorizontal,
				pressed: transformControls.transform.flipX,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipHorizontal, { "aria-hidden": true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbarButton, {
				label: t("preview.flip_vertical"),
				disabled,
				onClick: transformControls.flipVertical,
				pressed: transformControls.transform.flipY,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipVertical, { "aria-hidden": true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewToolbarButton, {
				label: t("preview.reset"),
				disabled,
				onClick: transformControls.reset,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { "aria-hidden": true })
			})
		]
	});
}
var logger = loggerService.withContext("ImageFilePreview");
function ImageFilePreview({ filePath, fileName, refreshKey }) {
	const { t } = useTranslation();
	const [status, setStatus] = (0, import_react.useState)("loading");
	const transformControls = useImagePreviewTransform();
	const item = (0, import_react.useMemo)(() => ({
		id: `${filePath}:${refreshKey}`,
		src: toFileUrl(filePath),
		alt: fileName,
		title: fileName
	}), [
		fileName,
		filePath,
		refreshKey
	]);
	if (status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.image-file-preview.alert",
		role: "alert",
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ImageOff,
			title: t("file_preview.load_error.title"),
			description: t("file_preview.load_error.description"),
			className: "h-full"
		})
	}) }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilePreviewLayout.Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageFilePreviewToolbar, {
		disabled: status !== "ready",
		transformControls
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePreviewLayout.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-full min-w-full items-center justify-center p-4",
		children: [status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-ui": "ui.image-file-preview.status",
			role: "status",
			className: "absolute inset-0 flex items-center justify-center gap-2 text-muted-foreground text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "size-4 animate-spin",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("file_preview.loading") })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewViewport, {
			className: "h-full min-h-full w-full",
			imageClassName: status === "loading" ? "opacity-0" : void 0,
			item,
			transformControls,
			onLoad: () => setStatus("ready"),
			onError: () => {
				const error = /* @__PURE__ */ new Error(`Failed to load image preview: ${filePath}`);
				logger.error(`Failed to load image preview: ${filePath}`, error);
				setStatus("error");
			}
		})]
	}) })] });
}
export { ImageFilePreview as default };
