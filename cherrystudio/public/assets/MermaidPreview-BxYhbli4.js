import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as useMermaid } from "./useMermaid-BXipJuXT.js";
import { a as useDebouncedRender, n as ImagePreviewLayout_default, r as ShadowTransparentContainer, t as renderSvgInShadowHost } from "./utils-B0nOeIAi.js";
import { t as nanoid } from "./index.browser-BQKr_dOz.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var MermaidPreview = ({ children, enableToolbar = false, ref }) => {
	const { mermaid, isLoading: isLoadingMermaid, error: mermaidError, forceRenderKey } = useMermaid();
	const diagramId = (0, import_react.useRef)(`mermaid-${nanoid(6)}`).current;
	const [isVisible, setIsVisible] = (0, import_react.useState)(true);
	const { containerRef, error: renderError, isLoading: isRendering } = useDebouncedRender(children, (0, import_react.useCallback)(async (content, container) => {
		await mermaid.parse(content);
		const { width } = container.getBoundingClientRect();
		if (width === 0) return;
		const measureEl = document.createElement("div");
		measureEl.style.position = "absolute";
		measureEl.style.left = "-9999px";
		measureEl.style.top = "-9999px";
		measureEl.style.width = `${width}px`;
		document.body.appendChild(measureEl);
		try {
			const { svg } = await mermaid.render(diagramId, content, measureEl);
			renderSvgInShadowHost(svg.replace(/translate\(undefined,\s*NaN\)/g, "translate(0, 0)"), container);
		} finally {
			document.body.removeChild(measureEl);
		}
	}, [
		diagramId,
		mermaid,
		forceRenderKey
	]), {
		debounceDelay: 300,
		shouldRender: (0, import_react.useCallback)(() => {
			return !isLoadingMermaid && isVisible;
		}, [isLoadingMermaid, isVisible])
	});
	(0, import_react.useEffect)(() => {
		if (!containerRef.current) return;
		const checkVisibility = () => {
			const element = containerRef.current;
			if (!element) return;
			setIsVisible(element.offsetParent !== null && element.offsetWidth > 0 && element.offsetHeight > 0);
		};
		checkVisibility();
		const observer = new MutationObserver(() => {
			checkVisibility();
		});
		let targetElement = containerRef.current.parentElement;
		while (targetElement) {
			observer.observe(targetElement, {
				attributes: true,
				attributeFilter: ["class", "style"]
			});
			if (targetElement.className?.includes("fold")) break;
			targetElement = targetElement.parentElement;
		}
		return () => {
			observer.disconnect();
		};
	}, [containerRef]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePreviewLayout_default, {
		loading: isLoadingMermaid || isRendering,
		error: mermaidError || renderError,
		enableToolbar,
		ref,
		imageRef: containerRef,
		source: "mermaid",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShadowTransparentContainer, {
			ref: containerRef,
			className: "mermaid special-preview"
		})
	});
};
var MermaidPreview_default = (0, import_react.memo)(MermaidPreview);
export { MermaidPreview_default as t };
