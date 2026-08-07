const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./mermaid.core-BweX85u7.js","./dist-CxgTYLYB.js","./chunk-DiqNceaa.js","./chunk-PU5JKC2W-Cu-wUjZK.js","./src-BNJs7-l-.js","./dayjs.min-CNu3tPBh.js","./chunk-GEFDOKGD-B_rlJtFs.js","./math-BcgEFMid.js","./chunk-7R4GIKGN-CHXwpkSF.js","./preload-helper-BAxOQgJR.js","./purify.es-Cmt93dJl.js","./_createAssigner-BlLJQMNU.js","./chunk-GLR3WWYH-BZcQpS2m.js","./chunk-KYZI473N-Du-OPVjy.js","./chunk-PQ6SQG4A-BOmZ971H.js","./chunk-YBOYWFTD-D3-zQtJQ.js","./rough.esm-CQhCMm63.js","./chunk-O4XLMI2P-DQGMYyCL.js","./line-CVOWet2t.js","./path-BM9cMg4l.js","./array-DL5nUy18.js","./chunk-MX3YWQON-DlWEgeua.js","./chunk-HHEYEP7N-B76yzjbd.js","./chunk-XPW4576I-DHZ4kD6k.js","./mermaid.core-BYrqrmUv.js","./isEmpty-DtG0CncE.js"])))=>i.map(i=>d[i]);
import { s as __toESM } from "./chunk-DiqNceaa.js";
import { c as ThemeMode } from "./PreferenceService-Ba0ofBX2.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import { n as useTheme } from "./useTheme-CbMe73se.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var mermaidModule = null;
var mermaidLoading = false;
var mermaidLoadPromise = null;
var loadMermaidModule = async () => {
	if (mermaidModule) return mermaidModule;
	if (mermaidLoading && mermaidLoadPromise) return mermaidLoadPromise;
	mermaidLoading = true;
	mermaidLoadPromise = __vitePreload(() => import("./mermaid.core-BweX85u7.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]), import.meta.url).then((module) => {
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
export { useMermaid as t };
