import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { r as mergeUiProps } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as ImagePreviewDialog } from "./image-preview-dialog-tRzcxdug.js";
import { n as CommandContextMenu } from "./command-CtEyUhIg.js";
import { n as cn } from "./style-C-RkFX_x.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as Copy } from "./copy-B5-oGRx4.js";
import { t as Save } from "./save-CDnN9jci.js";
import { c as convertImageToPng, g as transformImageToPng, l as copyImageToClipboard, t as blobToDataUrl, u as getImageBlobFromSource } from "./image-BfuhOMOH.js";
import { l as removeSpecialCharactersForFileName } from "./file-CVv-vzb2.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var logger = loggerService.withContext("ImageViewer");
var getPreviewIndex = (items, src, fallbackIndex = 0) => {
	const matchedIndex = items.findIndex((item) => item.src === src);
	return matchedIndex >= 0 ? matchedIndex : fallbackIndex;
};
var getImageSaveName = (item) => {
	let name = item.alt?.trim();
	if (!name && /^(?:file|https?):/.test(item.src)) try {
		const pathname = decodeURIComponent(new URL(item.src).pathname);
		name = pathname.slice(pathname.lastIndexOf("/") + 1);
	} catch {}
	const nameWithoutImageExtension = name?.replace(/\.(?:avif|bmp|gif|heic|jpe?g|png|svg|webp)$/i, "");
	return removeSpecialCharactersForFileName(nameWithoutImageExtension || "") || "image";
};
var ImageViewer = ({ alt, className, contextMenuTransform, onClick, onContextMenu, preview, src, ...props }) => {
	const { t } = useTranslation();
	const previewConfig = typeof preview === "object" ? preview : void 0;
	const previewEnabled = preview !== false;
	const items = import_react.useMemo(() => {
		return previewConfig?.items ?? [{
			alt: typeof alt === "string" ? alt : void 0,
			id: src,
			src
		}];
	}, [
		alt,
		previewConfig?.items,
		src
	]);
	const initialIndex = import_react.useMemo(() => getPreviewIndex(items, src), [items, src]);
	const [open, setOpen] = import_react.useState(false);
	const [activeIndex, setActiveIndex] = import_react.useState(initialIndex);
	import_react.useEffect(() => {
		setActiveIndex(initialIndex);
	}, [initialIndex]);
	const labels = import_react.useMemo(() => ({
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
	const handleCopyImage = import_react.useCallback(async (item) => {
		try {
			await copyImageToClipboard(item.src);
			toast.success(t("message.copy.success"));
		} catch (error) {
			const err = error;
			logger.error(`Failed to copy image: ${err.message}`, { stack: err.stack });
			toast.error(t("message.copy.failed"));
		}
	}, [t]);
	const handleCopySource = import_react.useCallback(async (item) => {
		try {
			await navigator.clipboard.writeText(item.src);
			toast.success(t("message.copy.success"));
		} catch (error) {
			const err = error;
			logger.error(`Failed to copy image source: ${err.message}`, { stack: err.stack });
			toast.error(t("message.copy.failed"));
		}
	}, [t]);
	const handleSaveImage = import_react.useCallback(async (item, context) => {
		try {
			const blob = await getImageBlobFromSource(item.src);
			const { flipX, flipY, rotation } = context.transform;
			const pngBlob = rotation % 360 !== 0 || flipX || flipY ? await transformImageToPng(blob, {
				flipX,
				flipY,
				rotation
			}) : await convertImageToPng(blob);
			if (await window.api.file.saveImage(getImageSaveName(item), await blobToDataUrl(pngBlob))) toast.success(t("common.saved"));
		} catch (error) {
			const err = error;
			logger.error(`Failed to save image: ${err.message}`, { stack: err.stack });
			toast.error(t("common.save_failed"));
		}
	}, [t]);
	const saveAction = import_react.useMemo(() => ({
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }),
		id: "save-as",
		label: t("preview.save_as"),
		onSelect: handleSaveImage
	}), [handleSaveImage, t]);
	const builtInActions = import_react.useMemo(() => [
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }),
			id: "copy-image",
			label: t("preview.copy.image"),
			onSelect: handleCopyImage
		},
		saveAction,
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }),
			id: "copy-src",
			label: t("preview.copy.src"),
			onSelect: handleCopySource
		}
	], [
		handleCopyImage,
		handleCopySource,
		saveAction,
		t
	]);
	const contextActions = import_react.useMemo(() => [...builtInActions, ...previewConfig?.actions ?? []], [builtInActions, previewConfig?.actions]);
	const toolbarActions = import_react.useMemo(() => [saveAction, ...previewConfig?.toolbarActions ?? []], [previewConfig?.toolbarActions, saveAction]);
	const displayItem = items.find((item) => item.src === src) ?? {
		alt: typeof alt === "string" ? alt : void 0,
		id: src,
		src
	};
	const displayIndex = Math.max(0, items.findIndex((item) => item.id === displayItem.id));
	const resolvedContextMenuTransform = import_react.useMemo(() => ({
		flipX: contextMenuTransform?.flipX ?? false,
		flipY: contextMenuTransform?.flipY ?? false,
		offsetX: contextMenuTransform?.offsetX ?? 0,
		offsetY: contextMenuTransform?.offsetY ?? 0,
		rotation: contextMenuTransform?.rotation ?? 0,
		zoom: contextMenuTransform?.zoom ?? 1
	}), [contextMenuTransform]);
	const contextMenuActionContext = import_react.useMemo(() => ({
		close: () => setOpen(false),
		index: displayIndex,
		items,
		resetTransform: () => {},
		transform: resolvedContextMenuTransform
	}), [
		displayIndex,
		items,
		resolvedContextMenuTransform,
		setOpen
	]);
	const onActionError = import_react.useCallback((error, action, item) => {
		logger.error(`Image preview action failed: ${action.id}`, {
			error: error instanceof Error ? error.message : String(error),
			itemId: item.id
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandContextMenu, {
		location: "webcontents.context",
		extraItems: contextActions.map((action) => ({
			type: "item",
			id: action.id,
			label: action.label,
			icon: action.icon,
			enabled: !action.disabled,
			onSelect: () => {
				try {
					const result = action.onSelect(displayItem, contextMenuActionContext);
					Promise.resolve(result).catch((error) => onActionError(error, action, displayItem));
				} catch (error) {
					onActionError(error, action, displayItem);
				}
			}
		})),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			"data-ui": "ui.image-viewer",
			alt,
			className: cn(previewEnabled && "cursor-zoom-in", className),
			onClick: (event) => {
				onClick?.(event);
				if (!event.defaultPrevented && previewEnabled) {
					setActiveIndex(initialIndex);
					setOpen(true);
				}
			},
			onContextMenu,
			src,
			...mergeUiProps(props, "ui.image-viewer")
		})
	}), previewEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewDialog, {
		actions: contextActions,
		activeIndex,
		items,
		labels,
		onActionError,
		onActiveIndexChange: setActiveIndex,
		onOpenChange: setOpen,
		open,
		toolbarActions
	})] });
};
var ImageViewer_default = ImageViewer;
export { ImageViewer_default as t };
