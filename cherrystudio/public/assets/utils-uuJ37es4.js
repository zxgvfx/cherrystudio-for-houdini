import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as debounce } from "./debounce-BIuc7S_h.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { i as Flex } from "./flex-BmIgOnUt.js";
import { t as purify } from "./purify.es-Cmt93dJl.js";
import { n as cn, t as classNames } from "./style-qqUWb85F.js";
import { t as ChevronDown } from "./chevron-down-BVtofl6V.js";
import { t as ChevronLeft } from "./chevron-left-CAuKBMJN.js";
import { t as ChevronRight } from "./chevron-right-CvFIUMTW.js";
import { t as ChevronUp } from "./chevron-up-C-an45UL.js";
import { t as Scan } from "./scan-Cocl8-19.js";
import { t as ZoomIn } from "./zoom-in-CyXlkrIh.js";
import { t as ZoomOut } from "./zoom-out-q-aeGunZ.js";
import { f as makeSvgSizeAdaptive } from "./image-Bb803VSe.js";
import { t as ResetIcon_default } from "./ResetIcon-BOagnZ9e.js";
import { t as LoadingIcon_default } from "./LoadingIcon-BvH4iKvM.js";
import { n as useImageTools } from "./ActionTools-CMwyIh3s.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var logger = loggerService.withContext("useDebouncedRender");
const useDebouncedRender = (value, renderFunction, options = {}) => {
	const { debounceDelay = 300, shouldRender } = options;
	const containerRef = (0, import_react.useRef)(null);
	const debouncedFunctionRef = (0, import_react.useRef)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const wrappedRenderFunction = (0, import_react.useCallback)(async (content) => {
		if (shouldRender && !shouldRender() || !content) return;
		if (!containerRef.current) {
			logger.warn("Container element not available");
			throw new Error("Container element not available");
		}
		try {
			setIsLoading(true);
			await renderFunction(content, containerRef.current);
			setError(null);
		} catch (error$1) {
			const errorMessage = error$1 instanceof Error ? error$1.message : "Unknown rendering error";
			logger.error(errorMessage);
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [renderFunction, shouldRender]);
	const debouncedRender = (0, import_react.useMemo)(() => {
		const debouncedFn = debounce((content) => {
			import_react.startTransition(() => {
				wrappedRenderFunction(content);
			});
		}, debounceDelay);
		debouncedFunctionRef.current = debouncedFn;
		return debouncedFn;
	}, [wrappedRenderFunction, debounceDelay]);
	const triggerRender = (0, import_react.useCallback)((content) => {
		if (content) {
			setIsLoading(true);
			debouncedRender(content);
		} else {
			debouncedRender.cancel();
			setIsLoading(false);
			setError(null);
		}
	}, [debouncedRender]);
	const cancelRender = (0, import_react.useCallback)(() => {
		debouncedRender.cancel();
		setIsLoading(false);
	}, [debouncedRender]);
	const clearError = (0, import_react.useCallback)(() => {
		setError(null);
	}, []);
	const setLoadingState = (0, import_react.useCallback)((loading) => {
		setIsLoading(loading);
	}, []);
	(0, import_react.useEffect)(() => {
		if (value) triggerRender(value);
		else cancelRender();
		return () => {
			cancelRender();
		};
	}, [
		value,
		triggerRender,
		cancelRender
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (debouncedFunctionRef.current) debouncedFunctionRef.current.cancel();
		};
	}, []);
	return {
		containerRef,
		error,
		isLoading,
		triggerRender,
		cancelRender,
		clearError,
		setLoading: setLoadingState
	};
};
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ImageToolButton = ({ tooltip, icon, onClick }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: tooltip,
		delay: 500,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "rounded-full",
			onClick,
			size: "icon",
			"aria-label": tooltip,
			children: icon
		})
	});
};
var ImageToolButton_default = (0, import_react.memo)(ImageToolButton);
var ImageToolbar = ({ pan, zoom, dialog, className }) => {
	const { t } = useTranslation();
	const panDistance = 20;
	const zoomDelta = .1;
	const handleReset = (0, import_react.useCallback)(() => {
		pan(0, 0, true);
		zoom(1, true);
	}, [pan, zoom]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.image-toolbar",
		className: classNames("preview-toolbar absolute right-[1em] bottom-[1em] z-[5] flex flex-col items-center gap-1", className),
		role: "toolbar",
		"aria-label": t("preview.label"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full justify-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolButton_default, {
						tooltip: t("preview.pan_up"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: "1rem" }),
						onClick: () => pan(0, -panDistance)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolButton_default, {
						tooltip: t("preview.dialog"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, { size: "1rem" }),
						onClick: dialog
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full justify-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolButton_default, {
						tooltip: t("preview.pan_left"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: "1rem" }),
						onClick: () => pan(-panDistance, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolButton_default, {
						tooltip: t("preview.reset"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetIcon_default, { size: "1rem" }),
						onClick: handleReset
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolButton_default, {
						tooltip: t("preview.pan_right"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: "1rem" }),
						onClick: () => pan(panDistance, 0)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full justify-center gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolButton_default, {
						tooltip: t("preview.zoom_out"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { size: "1rem" }),
						onClick: () => zoom(-zoomDelta)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolButton_default, {
						tooltip: t("preview.pan_down"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: "1rem" }),
						onClick: () => pan(0, panDistance)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolButton_default, {
						tooltip: t("preview.zoom_in"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { size: "1rem" }),
						onClick: () => zoom(zoomDelta)
					})
				]
			})
		]
	});
};
var ImageToolbar_default = (0, import_react.memo)(ImageToolbar);
const PreviewError = ({ className, ref, ...props }) => import_react.createElement("div", {
	ref,
	className: cn("overflow-auto whitespace-pre-wrap break-words rounded-[4px] border border-error p-4 text-error", className),
	...props
});
PreviewError.displayName = "PreviewError";
const PreviewContainer = ({ className, role = "alert", ...props }) => import_react.createElement(Flex, {
	role,
	className: cn("relative min-h-[8rem] [&_.special-preview]:min-h-[8rem]", "[&_.preview-toolbar]:transform-gpu [&_.preview-toolbar]:opacity-0 [&_.preview-toolbar]:transition-opacity [&_.preview-toolbar]:duration-300 [&_.preview-toolbar]:ease-in-out [&_.preview-toolbar]:will-change-[opacity]", "[&:hover_.preview-toolbar]:opacity-100", className),
	...props
});
var shadowWhiteStyle = {
	"--shadow-host-background-color": "white",
	"--shadow-host-border": "0.5px solid var(--background-subtle)",
	"--shadow-host-border-radius": "8px"
};
const ShadowWhiteContainer = ({ style, ref, ...props }) => import_react.createElement("div", {
	ref,
	style: {
		...shadowWhiteStyle,
		...style
	},
	...props
});
ShadowWhiteContainer.displayName = "ShadowWhiteContainer";
var shadowTransparentStyle = {
	"--shadow-host-background-color": "transparent",
	"--shadow-host-border": "unset",
	"--shadow-host-border-radius": "unset"
};
const ShadowTransparentContainer = ({ style, ref, ...props }) => import_react.createElement("div", {
	ref,
	style: {
		...shadowTransparentStyle,
		...style
	},
	...props
});
ShadowTransparentContainer.displayName = "ShadowTransparentContainer";
var IMAGE_PREVIEW_LOADING_COLOR = "var(--muted-foreground)";
var ImagePreviewLayout = ({ children, ref, imageRef, source, loading, error, enableToolbar, className }) => {
	const { pan, zoom, copy, download, dialog } = useImageTools(imageRef, {
		imgSelector: "svg",
		prefix: source ?? "svg",
		enableDrag: true,
		enableWheelZoom: true
	});
	(0, import_react.useImperativeHandle)(ref, () => {
		return {
			pan,
			zoom,
			copy,
			download,
			dialog
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreviewContainer, {
		className: `image-preview-layout flex-col ${className ?? ""}`,
		children: [
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-10 flex items-center justify-center bg-background-subtle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingIcon_default, { color: IMAGE_PREVIEW_LOADING_COLOR })
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewError, { children: error }),
			children,
			!error && enableToolbar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageToolbar_default, {
				pan,
				zoom,
				dialog
			})
		]
	});
};
var ImagePreviewLayout_default = (0, import_react.memo)(ImagePreviewLayout);
function renderSvgInShadowHost(svgContent, hostElement) {
	if (!hostElement) throw new Error("Host element for SVG rendering is not available.");
	const sanitizedContent = purify.sanitize(svgContent, {
		ADD_TAGS: [
			"animate",
			"foreignObject",
			"use"
		],
		ADD_ATTR: ["from", "to"],
		HTML_INTEGRATION_POINTS: { foreignobject: true }
	});
	const shadowRoot = hostElement.shadowRoot || hostElement.attachShadow({ mode: "open" });
	const style = document.createElement("style");
	style.textContent = `
    :host {
      --shadow-host-background-color: white;
      --shadow-host-border: 0.5px solid var(--border);
      --shadow-host-border-radius: 8px;

      background-color: var(--shadow-host-background-color);
      border: var(--shadow-host-border);
      border-radius: var(--shadow-host-border-radius);
      padding: 1em;
      overflow: hidden; /* Prevent scrollbars, as scaling is now handled */
      white-space: normal;
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
  `;
	shadowRoot.innerHTML = "";
	shadowRoot.appendChild(style);
	if (sanitizedContent.trim() === "") return;
	const doc = new DOMParser().parseFromString(sanitizedContent, "image/svg+xml");
	const parserError = doc.querySelector("parsererror");
	let svgElement = doc.documentElement;
	if (parserError || svgElement.namespaceURI !== "http://www.w3.org/2000/svg") {
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = sanitizedContent;
		const svgFromHtml = tempDiv.querySelector("svg");
		if (svgFromHtml) {
			svgElement = svgFromHtml;
			svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		} else {
			if (parserError) throw new Error(`SVG parsing error: ${parserError.textContent || "Unknown parsing error"}`);
			throw new Error("Invalid SVG content: The provided string does not contain a valid SVG element.");
		}
	}
	if (svgElement instanceof SVGSVGElement) {
		makeSvgSizeAdaptive(svgElement);
		shadowRoot.appendChild(svgElement);
	} else throw new Error("Invalid SVG content: The provided string is not a valid SVG document.");
}
export { useDebouncedRender as a, ShadowWhiteContainer as i, ImagePreviewLayout_default as n, ShadowTransparentContainer as r, renderSvgInShadowHost as t };
