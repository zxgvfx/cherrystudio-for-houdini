import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./es2015-DmjbZU9-.js";
import { t as EmptyState } from "./empty-state-C4JfZPek.js";
import { n as ImagePreviewViewport, t as useImagePreviewTransform } from "./use-image-preview-transform-A7ofbzcb.js";
import "./file-KsLXrn8b.js";
import { r as toFileUrl } from "./file-DzPAqnYr.js";
import { t as FlipHorizontal } from "./flip-horizontal-J7Rcrpmx.js";
import { t as FlipVertical } from "./flip-vertical-_afHwKNb.js";
import { t as ImageOff } from "./image-off-C9lXTjdM.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import { t as RefreshCcw } from "./refresh-ccw-n8_3N9Vc.js";
import { t as RotateCcwSquare } from "./rotate-ccw-square-DpJg2I8A.js";
import { t as RotateCwSquare } from "./rotate-cw-square-Bz8eV6cA.js";
import { t as ZoomIn } from "./zoom-in-CyXlkrIh.js";
import { t as ZoomOut } from "./zoom-out-q-aeGunZ.js";
import { t as FilePreviewLayout } from "./FilePreviewLayout-BHC9_5NZ.js";
import { t as FilePreviewToolbar } from "./FilePreviewToolbar-C2Jz3S8R.js";
import { t as FilePreviewToolbarButton } from "./FilePreviewToolbarButton-CUtcvRPo.js";
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
