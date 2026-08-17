import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as ImagePreviewDialog } from "./image-preview-dialog-tRzcxdug.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as Copy } from "./copy-B5-oGRx4.js";
import { n as createPopup } from "./popup-BLG-Gue5.js";
import { d as imageInputToPreviewUrl, l as copyImageToClipboard } from "./image-BfuhOMOH.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("ImagePreviewService");
var ImagePreviewContainer = ({ src, open, resolve }) => {
	const { t } = useTranslation();
	const labels = (0, import_react.useMemo)(() => ({
		close: t("preview.close"),
		dialogTitle: t("preview.label"),
		flipHorizontal: t("preview.flip_horizontal"),
		flipVertical: t("preview.flip_vertical"),
		next: t("preview.next"),
		previous: t("preview.previous"),
		reset: t("preview.reset"),
		rotateLeft: t("preview.rotate_left"),
		rotateRight: t("preview.rotate_right"),
		zoomIn: t("preview.zoom_in"),
		zoomOut: t("preview.zoom_out")
	}), [t]);
	const handleVisibleChange = (visible) => {
		if (!visible) {
			if (src.startsWith("blob:")) URL.revokeObjectURL(src);
			resolve();
		}
	};
	const handleCopyImage = (0, import_react.useCallback)(async (item) => {
		try {
			await copyImageToClipboard(item.src);
			toast.success(t("message.copy.success"));
		} catch (error) {
			const err = error;
			logger.error(`Failed to copy image: ${err.message}`, { stack: err.stack });
			toast.error(t("message.copy.failed"));
		}
	}, [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewDialog, {
		actions: (0, import_react.useMemo)(() => [{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }),
			id: "copy-image",
			label: t("preview.copy.image"),
			onSelect: handleCopyImage
		}], [handleCopyImage, t]),
		items: [{
			id: src,
			src
		}],
		labels,
		onOpenChange: handleVisibleChange,
		open
	});
};
var imagePreviewPopup = createPopup(ImagePreviewContainer, { dismissResult: void 0 });
var ImagePreviewService = class {
	static async show(input, options = {}) {
		try {
			const src = await imageInputToPreviewUrl(input, options);
			await imagePreviewPopup.show({ src });
		} catch (error) {
			logger.error("Failed to show image preview:", error);
			throw error;
		}
	}
};
export { ImagePreviewService as t };
