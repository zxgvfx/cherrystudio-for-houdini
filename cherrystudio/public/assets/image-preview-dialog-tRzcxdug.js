import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as createLucideIcon } from "./createLucideIcon-DA_gQr32.js";
import { t as ChevronLeft } from "./chevron-left-Bj4dPVCE.js";
import { t as ChevronRight } from "./chevron-right-D2nFIQF_.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { t as X } from "./x-BS4tSESx.js";
import { n as Tooltip } from "./tooltip-CJBVkA5B.js";
import { r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DUWl5M5Z.js";
import { n as ImagePreviewViewport, t as useImagePreviewTransform } from "./use-image-preview-transform-CepqGJxn.js";
var FlipHorizontal = createLucideIcon("flip-horizontal", [
	["path", {
		d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",
		key: "1i73f7"
	}],
	["path", {
		d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",
		key: "saxlbk"
	}],
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "M12 14v2",
		key: "8jcxud"
	}],
	["path", {
		d: "M12 8v2",
		key: "1woqiv"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}]
]);
var FlipVertical = createLucideIcon("flip-vertical", [
	["path", {
		d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",
		key: "14bfxa"
	}],
	["path", {
		d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",
		key: "14rx03"
	}],
	["path", {
		d: "M4 12H2",
		key: "rhcxmi"
	}],
	["path", {
		d: "M10 12H8",
		key: "s88cx1"
	}],
	["path", {
		d: "M16 12h-2",
		key: "10asgb"
	}],
	["path", {
		d: "M22 12h-2",
		key: "14jgyd"
	}]
]);
var RefreshCcw = createLucideIcon("refresh-ccw", [
	["path", {
		d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "14sxne"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",
		key: "1hlbsb"
	}],
	["path", {
		d: "M16 16h5v5",
		key: "ccwih5"
	}]
]);
var RotateCcwSquare = createLucideIcon("rotate-ccw-square", [
	["path", {
		d: "M20 9V7a2 2 0 0 0-2-2h-6",
		key: "19z8uc"
	}],
	["path", {
		d: "m15 2-3 3 3 3",
		key: "177bxs"
	}],
	["path", {
		d: "M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2",
		key: "d36hnl"
	}]
]);
var RotateCwSquare = createLucideIcon("rotate-cw-square", [
	["path", {
		d: "M12 5H6a2 2 0 0 0-2 2v3",
		key: "l96uqu"
	}],
	["path", {
		d: "m9 8 3-3-3-3",
		key: "1gzgc3"
	}],
	["path", {
		d: "M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
		key: "1w2k5h"
	}]
]);
var ZoomIn = createLucideIcon("zoom-in", [
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["line", {
		x1: "21",
		x2: "16.65",
		y1: "21",
		y2: "16.65",
		key: "13gj7c"
	}],
	["line", {
		x1: "11",
		x2: "11",
		y1: "8",
		y2: "14",
		key: "1vmskp"
	}],
	["line", {
		x1: "8",
		x2: "14",
		y1: "11",
		y2: "11",
		key: "durymu"
	}]
]);
var ZoomOut = createLucideIcon("zoom-out", [
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["line", {
		x1: "21",
		x2: "16.65",
		y1: "21",
		y2: "16.65",
		key: "13gj7c"
	}],
	["line", {
		x1: "8",
		x2: "14",
		y1: "11",
		y2: "11",
		key: "durymu"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ToolbarButton = ({ children, disabled, label, onClick, pressed }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
	content: label,
	delay: 300,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"aria-label": label,
		"aria-pressed": pressed,
		className: "size-9 rounded-full text-muted-foreground hover:text-foreground disabled:opacity-40",
		disabled,
		onClick,
		size: "icon",
		type: "button",
		variant: "ghost",
		children
	})
});
function ImagePreviewToolbar({ actions = [], className, context, item, labels, onActionError, transformControls }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.image-preview-toolbar",
		className: cn("flex items-center gap-1 rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-md", className),
		onClick: (event) => event.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				disabled: !transformControls.canZoomOut,
				label: labels.zoomOut,
				onClick: transformControls.zoomOut,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				disabled: !transformControls.canZoomIn,
				label: labels.zoomIn,
				onClick: transformControls.zoomIn,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: labels.rotateLeft,
				onClick: transformControls.rotateLeft,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcwSquare, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: labels.rotateRight,
				onClick: transformControls.rotateRight,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCwSquare, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: labels.flipHorizontal,
				onClick: transformControls.flipHorizontal,
				pressed: transformControls.transform.flipX,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipHorizontal, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: labels.flipVertical,
				onClick: transformControls.flipVertical,
				pressed: transformControls.transform.flipY,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipVertical, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: labels.reset,
				onClick: transformControls.reset,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "size-4" })
			}),
			actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				disabled: action.disabled,
				label: action.label,
				onClick: () => {
					Promise.resolve().then(() => action.onSelect(item, context)).catch((error) => onActionError?.(error, action, item));
				},
				children: action.icon
			}, action.id))
		]
	});
}
const DEFAULT_IMAGE_PREVIEW_LABELS = {
	close: "Close",
	flipHorizontal: "Flip horizontal",
	flipVertical: "Flip vertical",
	next: "Next image",
	previous: "Previous image",
	reset: "Reset",
	rotateLeft: "Rotate left",
	rotateRight: "Rotate right",
	zoomIn: "Zoom in",
	zoomOut: "Zoom out"
};
var clampIndex = (index, length) => {
	if (length <= 0) return 0;
	return Math.min(length - 1, Math.max(0, index));
};
function ImagePreviewDialog({ actions = [], activeIndex, className, contentClassName, defaultActiveIndex = 0, imageClassName, items, labels, onActiveIndexChange, onActionError, onOpenChange, open, overlayClassName, toolbarActions = [] }) {
	const mergedLabels = import_react.useMemo(() => ({
		...DEFAULT_IMAGE_PREVIEW_LABELS,
		...labels
	}), [labels]);
	const [uncontrolledIndex, setUncontrolledIndex] = import_react.useState(defaultActiveIndex);
	const transformControls = useImagePreviewTransform();
	const { reset } = transformControls;
	const currentIndex = clampIndex(activeIndex ?? uncontrolledIndex, items.length);
	const item = items[currentIndex];
	const hasMultipleItems = items.length > 1;
	import_react.useEffect(() => {
		if (open) reset();
	}, [
		currentIndex,
		open,
		reset
	]);
	import_react.useEffect(() => {
		if (activeIndex == null) setUncontrolledIndex((current) => clampIndex(current, items.length));
	}, [activeIndex, items.length]);
	const setActiveIndex = import_react.useCallback((nextIndex) => {
		const clampedIndex = clampIndex(nextIndex, items.length);
		if (activeIndex == null) setUncontrolledIndex(clampedIndex);
		onActiveIndexChange?.(clampedIndex);
	}, [
		activeIndex,
		items.length,
		onActiveIndexChange
	]);
	const showPrevious = import_react.useCallback(() => {
		setActiveIndex(Math.max(0, currentIndex - 1));
	}, [currentIndex, setActiveIndex]);
	const showNext = import_react.useCallback(() => {
		setActiveIndex(Math.min(items.length - 1, currentIndex + 1));
	}, [
		currentIndex,
		items.length,
		setActiveIndex
	]);
	const close = import_react.useCallback(() => {
		onOpenChange(false);
	}, [onOpenChange]);
	if (!item) return null;
	const actionContext = {
		close,
		index: currentIndex,
		items,
		resetTransform: reset,
		transform: transformControls.transform
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			"aria-describedby": void 0,
			className: cn("fixed top-0 left-0 z-[80] h-screen w-screen max-w-none translate-x-0 translate-y-0 overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none data-[state=closed]:animate-none data-[state=open]:animate-none sm:max-w-none", className),
			"data-testid": "image-preview-dialog",
			onKeyDown: (event) => {
				if (!hasMultipleItems) return;
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					showPrevious();
				}
				if (event.key === "ArrowRight") {
					event.preventDefault();
					showNext();
				}
			},
			overlayClassName: cn("bg-black/70 data-[state=closed]:animate-none data-[state=open]:animate-none", overlayClassName),
			showCloseButton: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-full w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "sr-only",
						children: mergedLabels.dialogTitle ?? mergedLabels.close
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"aria-label": mergedLabels.close,
						className: "absolute top-4 right-4 z-20 size-9 rounded-none bg-transparent p-0 text-white shadow-none transition-none hover:bg-transparent hover:text-white",
						onClick: close,
						size: "icon",
						type: "button",
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("absolute inset-0 px-6 pt-14 pb-20 sm:px-20 sm:pt-16 sm:pb-24", contentClassName),
						onClick: (event) => {
							if (event.target === event.currentTarget) close();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewViewport, {
							actionContext,
							actions,
							imageClassName,
							item,
							onActionError,
							onBackdropClick: close,
							transformControls
						})
					}),
					hasMultipleItems && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"aria-label": mergedLabels.previous,
						className: "absolute left-4 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border bg-popover text-popover-foreground shadow-md hover:bg-accent hover:text-accent-foreground disabled:opacity-30",
						disabled: currentIndex === 0,
						onClick: showPrevious,
						size: "icon",
						type: "button",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					hasMultipleItems && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"aria-label": mergedLabels.next,
						className: "absolute right-4 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border bg-popover text-popover-foreground shadow-md hover:bg-accent hover:text-accent-foreground disabled:opacity-30",
						disabled: currentIndex === items.length - 1,
						onClick: showNext,
						size: "icon",
						type: "button",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewToolbar, {
							actions: toolbarActions,
							context: actionContext,
							item,
							labels: mergedLabels,
							onActionError,
							transformControls
						})
					})
				]
			})
		})
	});
}
export { ImagePreviewDialog as t };
