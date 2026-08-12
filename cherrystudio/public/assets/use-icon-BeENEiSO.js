const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./catalog-PgJIDJWD.js","./dist-BGahvVh8.js","./clsx-Bu5J6-zp.js","./react-BgPOU4At.js","./chunk-DiqNceaa.js","./avatar-BMK8th-L.js","./dist-BjhqGbBP.js","./dist-C0L0ClnX.js","./jsx-runtime-DCB_IiL2.js","./react-dom-CKbeLgrG.js","./dist-6HM0HyiE.js","./dist-CuwIZpzZ.js","./shim-BiqNigny.js","./openclaw-B4QWBzrT.js","./tesseract-js-CbiYFouk.js","./bailian-D_LRsl29.js","./tavily-D_vAToMR.js","./cherryin-71veRWFJ.js","./smithery-D3pHZTkC.js","./dmxapi-Dq5qF8Ok.js","./paddleocr-BVP_FTLF.js","./modelscope-CGxZ4EPN.js","./zhipu-Dv2udDow.js","./catalog-BGaGP7Dw.js"])))=>i.map(i=>d[i]);
import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
var providerCatalogModule;
var modelCatalogModule;
var providerCatalogPromise;
var modelCatalogPromise;
function loadProviderCatalogModule() {
	providerCatalogPromise ??= __vitePreload(() => import("./catalog-PgJIDJWD.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]), import.meta.url).then((module) => {
		providerCatalogModule = module;
		return module;
	});
	return providerCatalogPromise;
}
function loadModelCatalogModule() {
	modelCatalogPromise ??= __vitePreload(() => import("./catalog-BGaGP7Dw.js"), __vite__mapDeps([23,1,2,3,4,5,6,7,8,9,10,11,12]), import.meta.url).then((module) => {
		modelCatalogModule = module;
		return module;
	});
	return modelCatalogPromise;
}
async function loadProviderIconCatalog() {
	return (await loadProviderCatalogModule()).PROVIDER_ICON_CATALOG;
}
async function loadProviderIcon(key) {
	return (await loadProviderCatalogModule()).PROVIDER_ICON_CATALOG[key];
}
async function loadModelIcon(key) {
	return (await loadModelCatalogModule()).MODEL_ICON_CATALOG[key];
}
function loadIcon(ref) {
	return ref.kind === "provider" ? loadProviderIcon(ref.key) : loadModelIcon(ref.key);
}
function getLoadedIcon(ref) {
	return ref.kind === "provider" ? providerCatalogModule?.PROVIDER_ICON_CATALOG[ref.key] : modelCatalogModule?.MODEL_ICON_CATALOG[ref.key];
}
var import_react = /* @__PURE__ */ __toESM(require_react());
function useIcon(iconRef) {
	const refKey = iconRef ? `${iconRef.kind}:${iconRef.key}` : void 0;
	const [loaded, setLoaded] = (0, import_react.useState)(void 0);
	const cachedAtRender = iconRef ? getLoadedIcon(iconRef) : void 0;
	(0, import_react.useEffect)(() => {
		if (!iconRef || cachedAtRender) return;
		const key = `${iconRef.kind}:${iconRef.key}`;
		const cached = getLoadedIcon(iconRef);
		if (cached) {
			setLoaded((prev) => prev && prev.refKey === key && prev.icon === cached ? prev : {
				refKey: key,
				icon: cached
			});
			return;
		}
		let cancelled = false;
		loadIcon(iconRef).then((icon) => {
			if (!cancelled) setLoaded({
				refKey: key,
				icon
			});
		}, () => {});
		return () => {
			cancelled = true;
		};
	}, [refKey]);
	if (!iconRef) return void 0;
	return cachedAtRender ?? (loaded && loaded.refKey === refKey ? loaded.icon : void 0);
}
export { loadProviderIconCatalog as n, useIcon as t };
