import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { n as useTheme } from "./useTheme-C0NcZaKl.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { h as svgToSvgBlob, m as svgToPngBlob } from "./image-Bb803VSe.js";
import { t as ImagePreviewService } from "./ImagePreviewService-baJ3FtkL.js";
const TOOL_SPECS = {
	copy: {
		id: "copy",
		type: "core",
		order: 11
	},
	download: {
		id: "download",
		type: "core",
		order: 10
	},
	edit: {
		id: "edit",
		type: "core",
		order: 12
	},
	"view-source": {
		id: "view-source",
		type: "core",
		order: 12
	},
	save: {
		id: "save",
		type: "core",
		order: 13
	},
	expand: {
		id: "expand",
		type: "core",
		order: 20
	},
	"split-view": {
		id: "split-view",
		type: "quick",
		order: 10
	},
	run: {
		id: "run",
		type: "quick",
		order: 11
	},
	wrap: {
		id: "wrap",
		type: "quick",
		order: 20
	},
	"copy-image": {
		id: "copy-image",
		type: "quick",
		order: 30
	},
	"download-svg": {
		id: "download-svg",
		type: "quick",
		order: 31
	},
	"download-png": {
		id: "download-png",
		type: "quick",
		order: 32
	},
	"zoom-in": {
		id: "zoom-in",
		type: "quick",
		order: 40
	},
	"zoom-out": {
		id: "zoom-out",
		type: "quick",
		order: 41
	}
};
var logger$1 = loggerService.withContext("Utils:download");
const download = (url, filename) => {
	if ([
		"file://",
		"blob:",
		"data:image/png",
		"data:image/jpeg",
		"data:image/svg+xml"
	].some((prefix) => url.startsWith(prefix))) {
		const link = document.createElement("a");
		link.href = url;
		let resolvedFilename = filename;
		if (!resolvedFilename) if (url.startsWith("file://")) {
			const pathname = new URL(url).pathname;
			resolvedFilename = decodeURIComponent(pathname.substring(pathname.lastIndexOf("/") + 1));
		} else if (url.startsWith("blob:")) resolvedFilename = `${Date.now()}_diagram.svg`;
		else if (url.startsWith("data:")) {
			const mimeMatch = url.match(/^data:([^;,]+)[;,]/);
			const extension = getExtensionFromMimeType(mimeMatch && mimeMatch[1]);
			resolvedFilename = `${Date.now()}_download${extension}`;
		} else resolvedFilename = "download";
		link.download = resolvedFilename;
		document.body.appendChild(link);
		link.click();
		link.remove();
		return;
	}
	return fetch(url).then((response) => {
		let finalFilename = filename || "download";
		if (!filename) {
			const contentDisposition = response.headers.get("Content-Disposition");
			if (contentDisposition) {
				const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
				if (filenameMatch) finalFilename = filenameMatch[1];
			}
			const urlFilename = url.split("/").pop();
			if (urlFilename && urlFilename.includes(".")) finalFilename = urlFilename;
			if (!finalFilename.includes(".")) {
				const extension = getExtensionFromMimeType(response.headers.get("Content-Type"));
				finalFilename += extension;
			}
			finalFilename = `${Date.now()}_${finalFilename}`;
		}
		return response.blob().then((blob) => ({
			blob,
			finalFilename
		}));
	}).then(({ blob, finalFilename }) => {
		const blobUrl = URL.createObjectURL(new Blob([blob]));
		const link = document.createElement("a");
		link.href = blobUrl;
		link.download = finalFilename;
		document.body.appendChild(link);
		link.click();
		URL.revokeObjectURL(blobUrl);
		link.remove();
	}).catch((error) => {
		logger$1.error("Download failed:", error);
		throw error;
	});
};
function getExtensionFromMimeType(mimeType) {
	if (!mimeType) return ".bin";
	return {
		"image/jpeg": ".jpg",
		"image/png": ".png",
		"image/gif": ".gif",
		"image/svg+xml": ".svg",
		"application/pdf": ".pdf",
		"text/plain": ".txt",
		"application/msword": ".doc",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx"
	}[mimeType] || ".bin";
}
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("usePreviewToolHandlers");
const useImageTools = (containerRef, options) => {
	const transformRef = (0, import_react.useRef)({
		scale: 1,
		x: 0,
		y: 0
	});
	const { imgSelector, prefix, enableDrag, enableWheelZoom } = options;
	const { t } = useTranslation();
	const { theme } = useTheme();
	const getImgElement = (0, import_react.useCallback)(() => {
		if (!containerRef.current) return null;
		const shadowRoot = containerRef.current.shadowRoot;
		if (shadowRoot) return shadowRoot.querySelector(imgSelector);
		return containerRef.current.querySelector(imgSelector);
	}, [containerRef, imgSelector]);
	const getCleanImgElement = (0, import_react.useCallback)(() => {
		const imgElement = getImgElement();
		if (!imgElement) return null;
		const clonedElement = imgElement.cloneNode(true);
		clonedElement.style.transform = "";
		clonedElement.style.transformOrigin = "";
		return clonedElement;
	}, [getImgElement]);
	const getCurrentPosition = (0, import_react.useCallback)(() => {
		const imgElement = getImgElement();
		if (!imgElement) return transformRef.current;
		const transform = imgElement.style.transform;
		if (!transform || transform === "none") return transformRef.current;
		const matrix = new DOMMatrix(transform);
		return {
			x: matrix.m41,
			y: matrix.m42
		};
	}, [getImgElement]);
	const applyTransform = (0, import_react.useCallback)((element, x, y, scale) => {
		if (!element) return;
		element.style.transformOrigin = "top left";
		element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
	}, []);
	const pan = (0, import_react.useCallback)((dx, dy, absolute = false) => {
		const currentPos = getCurrentPosition();
		const newX = absolute ? dx : currentPos.x + dx;
		const newY = absolute ? dy : currentPos.y + dy;
		transformRef.current.x = newX;
		transformRef.current.y = newY;
		applyTransform(getImgElement(), newX, newY, transformRef.current.scale);
	}, [
		getCurrentPosition,
		getImgElement,
		applyTransform
	]);
	(0, import_react.useEffect)(() => {
		if (!enableDrag || !containerRef.current) return;
		const container = containerRef.current;
		const startPos = {
			x: 0,
			y: 0
		};
		const handleMouseMove = (e) => {
			const dx = e.clientX - startPos.x;
			const dy = e.clientY - startPos.y;
			const newX = transformRef.current.x + dx;
			const newY = transformRef.current.y + dy;
			applyTransform(getImgElement(), newX, newY, transformRef.current.scale);
			e.preventDefault();
		};
		const handleMouseUp = (e) => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
			container.style.cursor = "default";
			const dx = e.clientX - startPos.x;
			const dy = e.clientY - startPos.y;
			transformRef.current.x += dx;
			transformRef.current.y += dy;
		};
		const handleMouseDown = (e) => {
			if (e.button !== 0) return;
			const currentPos = getCurrentPosition();
			transformRef.current.x = currentPos.x;
			transformRef.current.y = currentPos.y;
			startPos.x = e.clientX;
			startPos.y = e.clientY;
			container.style.cursor = "grabbing";
			e.preventDefault();
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		};
		container.addEventListener("mousedown", handleMouseDown);
		return () => {
			container.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [
		containerRef,
		getImgElement,
		applyTransform,
		getCurrentPosition,
		enableDrag
	]);
	const zoom = (0, import_react.useCallback)((delta, absolute = false) => {
		const newScale = absolute ? Math.max(.1, Math.min(3, delta)) : Math.max(.1, Math.min(3, transformRef.current.scale + delta));
		transformRef.current.scale = newScale;
		applyTransform(getImgElement(), transformRef.current.x, transformRef.current.y, newScale);
	}, [getImgElement, applyTransform]);
	(0, import_react.useEffect)(() => {
		if (!enableWheelZoom || !containerRef.current) return;
		const container = containerRef.current;
		const handleWheel = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.target) {
				if (container.contains(e.target)) {
					e.preventDefault();
					e.stopPropagation();
					zoom(e.deltaY < 0 ? .1 : -.1);
				}
			}
		};
		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => container.removeEventListener("wheel", handleWheel);
	}, [
		containerRef,
		zoom,
		enableWheelZoom
	]);
	const copy = (0, import_react.useCallback)(async () => {
		try {
			const imgElement = getCleanImgElement();
			if (!imgElement) return false;
			const blob = await svgToPngBlob(imgElement);
			await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
			toast.success(t("message.copy.success"));
			return true;
		} catch (error) {
			logger.error("Copy failed:", error);
			toast.error(t("message.copy.failed"));
			return false;
		}
	}, [getCleanImgElement, t]);
	const download$1 = (0, import_react.useCallback)(async (format) => {
		try {
			const imgElement = getCleanImgElement();
			if (!imgElement) return;
			const timestamp = Date.now();
			if (format === "svg") {
				const blob = svgToSvgBlob(imgElement);
				const url = URL.createObjectURL(blob);
				await download(url, `${prefix}-${timestamp}.svg`);
				URL.revokeObjectURL(url);
			} else {
				const blob = await svgToPngBlob(imgElement);
				const pngUrl = URL.createObjectURL(blob);
				await download(pngUrl, `${prefix}-${timestamp}.png`);
				URL.revokeObjectURL(pngUrl);
			}
		} catch (error) {
			logger.error("Download failed:", error);
			toast.error(t("message.download.failed"));
		}
	}, [
		getCleanImgElement,
		prefix,
		t
	]);
	const dialog = (0, import_react.useCallback)(async () => {
		try {
			const imgElement = getCleanImgElement();
			if (!imgElement) return;
			await ImagePreviewService.show(imgElement, { format: "svg" });
		} catch (error) {
			logger.error("Dialog preview failed:", error);
			toast.error(t("message.dialog.failed"));
		}
	}, [getCleanImgElement, t]);
	const getCurrentTransform = (0, import_react.useCallback)(() => {
		return {
			scale: transformRef.current.scale,
			x: transformRef.current.x,
			y: transformRef.current.y
		};
	}, [transformRef]);
	(0, import_react.useEffect)(() => {
		pan(0, 0, true);
		zoom(1, true);
	}, [
		pan,
		zoom,
		theme
	]);
	return {
		zoom,
		pan,
		copy,
		download: download$1,
		dialog,
		getCurrentTransform
	};
};
const useToolManager = (setTools) => {
	return {
		registerTool: (0, import_react.useCallback)((tool) => {
			setTools?.((prev) => {
				return [...prev.filter((t) => t.id !== tool.id), tool].sort((a, b) => b.order - a.order);
			});
		}, [setTools]),
		removeTool: (0, import_react.useCallback)((id) => {
			setTools?.((prev) => prev.filter((tool) => tool.id !== id));
		}, [setTools])
	};
};
export { useImageTools as n, TOOL_SPECS as r, useToolManager as t };
