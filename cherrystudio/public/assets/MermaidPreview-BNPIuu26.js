const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./mermaid.core-DfoJ3KiY.js","./dist-CyZmekFX.js","./rolldown-runtime-D8OvLAZx.js","./chunk-PU5JKC2W-B6_FzVbS.js","./src-BxTmfvcS.js","./dayjs.min-BBb2vAs7.js","./src-BkCZtMji.js","./chunk-GEFDOKGD-CjhhL8_m.js","./math-BvH9V0aI.js","./chunk-7R4GIKGN-Dhqhodyz.js","./preload-helper-Cs2ugBNd.js","./purify.es-RDRNldMc.js","./_createAssigner-BE3XE1ym.js","./chunk-GLR3WWYH-47_v3MWD.js","./chunk-KYZI473N-C2tcBmRB.js","./chunk-PQ6SQG4A-lGU_NePG.js","./chunk-YBOYWFTD-oI8qIE65.js","./rough.esm-CkNalSv9.js","./chunk-O4XLMI2P-aY1SO_x2.js","./line-BgGkiE_9.js","./path-DdsAB209.js","./array-C8Gy2X3U.js","./chunk-MX3YWQON-BCZ6eQbh.js","./chunk-HHEYEP7N-BdBCwgnw.js","./chunk-XPW4576I-DfKBLxcn.js","./mermaid.core-EJboeJDS.js","./isEmpty-DmX_zWoN.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { c as ThemeMode } from "./PreferenceService-CvpJqJd7.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { n as useTheme } from "./useTheme-mM6gKAcD.js";
import { a as useDebouncedRender, n as ImagePreviewLayout_default, r as ShadowTransparentContainer, t as renderSvgInShadowHost } from "./utils-Bmb3FmSZ.js";
import { t as nanoid } from "./index.browser-BCZc4bmf.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var mermaidModule = null;
var mermaidLoading = false;
var mermaidLoadPromise = null;
var loadMermaidModule = async () => {
	if (mermaidModule) return mermaidModule;
	if (mermaidLoading && mermaidLoadPromise) return mermaidLoadPromise;
	mermaidLoading = true;
	mermaidLoadPromise = __vitePreload(() => import("./mermaid.core-DfoJ3KiY.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]), import.meta.url).then((module) => {
		mermaidModule = module.default || module;
		mermaidLoading = false;
		return mermaidModule;
	}).catch((error) => {
		mermaidLoading = false;
		throw error;
	});
	return mermaidLoadPromise;
};
const useMermaid = () => {
	const { theme } = useTheme();
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [forceRenderKey, setForceRenderKey] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const initialize = async () => {
			try {
				setIsLoading(true);
				const mermaid = await loadMermaidModule();
				if (!mounted) return;
				mermaid.initialize({
					startOnLoad: false,
					theme: theme === ThemeMode.dark ? "dark" : "default"
				});
				setForceRenderKey((prev) => prev + 1);
				setError(null);
			} catch (error$1) {
				setError(error$1 instanceof Error ? error$1.message : "Failed to initialize Mermaid");
			} finally {
				if (mounted) setIsLoading(false);
			}
		};
		initialize();
		return () => {
			mounted = false;
		};
	}, [theme]);
	return {
		mermaid: mermaidModule,
		isLoading,
		error,
		forceRenderKey
	};
};
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
