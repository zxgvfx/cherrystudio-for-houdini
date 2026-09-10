import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { n as UiDataSlot, r as mergeUiProps, t as cn } from "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { i as ContextMenuItem, r as ContextMenuContent, t as ContextMenu, u as ContextMenuTrigger } from "./context-menu-CeDdfmXT.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ImagePreviewContextMenu({ actions = [], children, context, item, onActionError }) {
	if (actions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextMenuContent, { children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContextMenuItem, {
		disabled: action.disabled,
		onSelect: (event) => {
			event.preventDefault();
			Promise.resolve().then(() => action.onSelect(item, context)).catch((error) => onActionError?.(error, action, item));
		},
		children: [action.icon, action.label]
	}, action.id)) })] });
}
function ImagePreviewImage({ className, fitScale = 1, item, style, transform, ...props }) {
	const transformValue = [
		`translate3d(${transform.offsetX}px, ${transform.offsetY}px, 0)`,
		`rotate(${transform.rotation}deg)`,
		`scale(${fitScale * transform.zoom})`,
		`scaleX(${transform.flipX ? -1 : 1})`,
		`scaleY(${transform.flipY ? -1 : 1})`
	].join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		"data-ui": "ui.image-preview",
		alt: item.alt ?? item.title ?? "",
		className: cn("block max-h-full max-w-full select-none object-contain", className),
		draggable: false,
		src: item.src,
		style: {
			...style,
			transform: transformValue,
			transformOrigin: "center",
			willChange: "transform"
		},
		...mergeUiProps(props, "ui.image-preview")
	});
}
var EMPTY_SIZE = {
	height: 0,
	width: 0
};
var clamp$1 = (value, min, max) => Math.min(max, Math.max(min, value));
var getItemKey = (item) => `${item.id}\0${item.src}`;
var getGeometry = (imageSize, viewportSize, transform) => {
	if (imageSize.width <= 0 || imageSize.height <= 0 || viewportSize.width <= 0 || viewportSize.height <= 0) return {
		fitScale: 1,
		maxOffsetX: 0,
		maxOffsetY: 0
	};
	const swapsDimensions = transform.rotation % 180 !== 0;
	const rotatedWidth = swapsDimensions ? imageSize.height : imageSize.width;
	const rotatedHeight = swapsDimensions ? imageSize.width : imageSize.height;
	const fitScale = Math.min(1, viewportSize.width / rotatedWidth, viewportSize.height / rotatedHeight);
	const renderedWidth = rotatedWidth * fitScale * transform.zoom;
	const renderedHeight = rotatedHeight * fitScale * transform.zoom;
	return {
		fitScale,
		maxOffsetX: Math.max(0, (renderedWidth - viewportSize.width) / 2),
		maxOffsetY: Math.max(0, (renderedHeight - viewportSize.height) / 2)
	};
};
var clampOffsets = (transform, imageSize, viewportSize) => {
	const { maxOffsetX, maxOffsetY } = getGeometry(imageSize, viewportSize, transform);
	return {
		offsetX: clamp$1(transform.offsetX, -maxOffsetX, maxOffsetX),
		offsetY: clamp$1(transform.offsetY, -maxOffsetY, maxOffsetY)
	};
};
function ImagePreviewViewport({ actionContext, actions = [], className, imageClassName, item, onActionError, onBackdropClick, onError, onLoad, transformControls, ...props }) {
	const viewportRef = import_react.useRef(null);
	const dragRef = import_react.useRef(null);
	const [isDragging, setIsDragging] = import_react.useState(false);
	const [viewportSize, setViewportSize] = import_react.useState(EMPTY_SIZE);
	const [loadedImage, setLoadedImage] = import_react.useState(null);
	const itemKey = getItemKey(item);
	const imageSize = loadedImage?.itemKey === itemKey ? loadedImage.size : EMPTY_SIZE;
	const { transform, update } = transformControls;
	const geometry = getGeometry(imageSize, viewportSize, transform);
	const canPan = geometry.maxOffsetX > 0 || geometry.maxOffsetY > 0;
	const isGeometryReady = imageSize.width > 0 && imageSize.height > 0 && viewportSize.width > 0 && viewportSize.height > 0;
	import_react.useLayoutEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const updateSize = () => {
			const rect = viewport.getBoundingClientRect();
			setViewportSize((current) => current.width === rect.width && current.height === rect.height ? current : {
				width: rect.width,
				height: rect.height
			});
		};
		updateSize();
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(updateSize);
		observer.observe(viewport);
		return () => observer.disconnect();
	}, []);
	import_react.useLayoutEffect(() => {
		update(clampOffsets(transform, imageSize, viewportSize));
	}, [
		imageSize,
		transform,
		update,
		viewportSize
	]);
	const zoomAt = import_react.useCallback((nextZoom, clientX, clientY) => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const rect = viewport.getBoundingClientRect();
		const anchorX = clientX - rect.left - rect.width / 2;
		const anchorY = clientY - rect.top - rect.height / 2;
		update((current) => {
			const zoom = clamp$1(nextZoom, transformControls.minZoom, transformControls.maxZoom);
			const ratio = zoom / current.zoom;
			const next = {
				...current,
				offsetX: anchorX - (anchorX - current.offsetX) * ratio,
				offsetY: anchorY - (anchorY - current.offsetY) * ratio,
				zoom
			};
			return {
				...next,
				...clampOffsets(next, imageSize, viewportSize)
			};
		});
	}, [
		imageSize,
		transformControls.maxZoom,
		transformControls.minZoom,
		update,
		viewportSize
	]);
	const handleWheel = import_react.useCallback((event) => {
		event.preventDefault();
		zoomAt(transform.zoom * Math.exp(-event.deltaY * .002), event.clientX, event.clientY);
	}, [transform.zoom, zoomAt]);
	const handlePointerDown = import_react.useCallback((event) => {
		event.stopPropagation();
		if (event.button !== 0 || !canPan) return;
		dragRef.current = {
			offsetX: transform.offsetX,
			offsetY: transform.offsetY,
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY
		};
		event.currentTarget.setPointerCapture(event.pointerId);
		setIsDragging(true);
		event.preventDefault();
	}, [
		canPan,
		transform.offsetX,
		transform.offsetY
	]);
	const handlePointerMove = import_react.useCallback((event) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		update(clampOffsets({
			...transform,
			offsetX: drag.offsetX + event.clientX - drag.startX,
			offsetY: drag.offsetY + event.clientY - drag.startY
		}, imageSize, viewportSize));
	}, [
		imageSize,
		transform,
		update,
		viewportSize
	]);
	const stopDragging = import_react.useCallback((event) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
		dragRef.current = null;
		setIsDragging(false);
	}, []);
	const image = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewImage, {
		className: cn("max-h-none max-w-none shrink-0", canPan && (isDragging ? "cursor-grabbing transition-none" : "cursor-grab"), imageClassName),
		fitScale: geometry.fitScale,
		item,
		onClick: (event) => event.stopPropagation(),
		onDoubleClick: (event) => {
			event.stopPropagation();
			zoomAt(transform.zoom > transformControls.minZoom ? transformControls.minZoom : 2, event.clientX, event.clientY);
		},
		onError,
		onLoad: (event) => {
			setLoadedImage({
				itemKey,
				size: {
					height: event.currentTarget.naturalHeight,
					width: event.currentTarget.naturalWidth
				}
			});
			onLoad?.(event);
		},
		onPointerCancel: stopDragging,
		onPointerDown: handlePointerDown,
		onPointerMove: handlePointerMove,
		onPointerUp: stopDragging,
		style: {
			...imageSize.width > 0 ? {
				height: imageSize.height,
				width: imageSize.width
			} : {},
			visibility: isGeometryReady ? "visible" : "hidden"
		},
		transform
	}, itemKey);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": "ui.image-preview-viewport",
		...mergeUiProps(props, "ui.image-preview-viewport"),
		ref: viewportRef,
		className: cn("relative flex h-full w-full touch-none items-center justify-center overflow-hidden", className),
		"data-testid": "image-preview-viewport",
		onClick: (event) => {
			if (event.target === event.currentTarget) onBackdropClick?.();
		},
		onWheel: handleWheel,
		children: actionContext && actions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewContextMenu, {
			actions,
			context: actionContext,
			item,
			onActionError,
			children: image
		}) : image
	});
}
var DEFAULT_TRANSFORM = {
	flipX: false,
	flipY: false,
	offsetX: 0,
	offsetY: 0,
	rotation: 0,
	zoom: 1
};
var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
var normalizeRotate = (value) => (value % 360 + 360) % 360;
var toFiniteNumber = (value, fallback) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
var normalizeTransform = (transform, minZoom, maxZoom) => ({
	flipX: transform?.flipX ?? DEFAULT_TRANSFORM.flipX,
	flipY: transform?.flipY ?? DEFAULT_TRANSFORM.flipY,
	offsetX: toFiniteNumber(transform?.offsetX, DEFAULT_TRANSFORM.offsetX),
	offsetY: toFiniteNumber(transform?.offsetY, DEFAULT_TRANSFORM.offsetY),
	rotation: normalizeRotate(toFiniteNumber(transform?.rotation, DEFAULT_TRANSFORM.rotation)),
	zoom: clamp(toFiniteNumber(transform?.zoom, DEFAULT_TRANSFORM.zoom), minZoom, maxZoom)
});
var transformsEqual = (left, right) => left.flipX === right.flipX && left.flipY === right.flipY && left.offsetX === right.offsetX && left.offsetY === right.offsetY && left.rotation === right.rotation && left.zoom === right.zoom;
function useImagePreviewTransform({ initialTransform, maxZoom = 5, minZoom = 1, zoomStep = .25 } = {}) {
	if (minZoom > maxZoom) throw new Error("useImagePreviewTransform requires minZoom <= maxZoom");
	if (zoomStep <= 0 || !Number.isFinite(zoomStep)) throw new Error("useImagePreviewTransform requires zoomStep > 0");
	const initialValue = import_react.useMemo(() => normalizeTransform(initialTransform, minZoom, maxZoom), [
		initialTransform,
		maxZoom,
		minZoom
	]);
	const [transform, setTransform] = import_react.useState(initialValue);
	const update = import_react.useCallback((nextUpdate) => {
		setTransform((current) => {
			const patch = typeof nextUpdate === "function" ? nextUpdate(current) : nextUpdate;
			const next = normalizeTransform({
				...current,
				...patch
			}, minZoom, maxZoom);
			return transformsEqual(current, next) ? current : next;
		});
	}, [maxZoom, minZoom]);
	const reset = import_react.useCallback(() => {
		setTransform(initialValue);
	}, [initialValue]);
	const zoomIn = import_react.useCallback(() => {
		update((current) => ({ zoom: current.zoom + zoomStep }));
	}, [update, zoomStep]);
	const zoomOut = import_react.useCallback(() => {
		update((current) => ({ zoom: current.zoom - zoomStep }));
	}, [update, zoomStep]);
	const rotateLeft = import_react.useCallback(() => {
		update((current) => ({
			offsetX: 0,
			offsetY: 0,
			rotation: current.rotation - 90
		}));
	}, [update]);
	const rotateRight = import_react.useCallback(() => {
		update((current) => ({
			offsetX: 0,
			offsetY: 0,
			rotation: current.rotation + 90
		}));
	}, [update]);
	const flipHorizontal = import_react.useCallback(() => {
		update((current) => ({ flipX: !current.flipX }));
	}, [update]);
	const flipVertical = import_react.useCallback(() => {
		update((current) => ({ flipY: !current.flipY }));
	}, [update]);
	return {
		canZoomIn: transform.zoom < maxZoom,
		canZoomOut: transform.zoom > minZoom,
		flipHorizontal,
		flipVertical,
		maxZoom,
		minZoom,
		reset,
		rotateLeft,
		rotateRight,
		transform,
		update,
		zoomIn,
		zoomOut
	};
}
export { ImagePreviewViewport as n, useImagePreviewTransform as t };
