const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-2BBEFEWP-HuXWMFmH.js","./preload-helper-tKu-GDMy.js","./dist-B4A8UMUm.js","./chunk-st2fFX3F.js","./chunk-62K37W7T-Cdcrszm7.js","./src-XfX5FL_o.js","./dayjs.min-DvZ-eY4k.js","./purify.es-t-jsSY2O.js","./src-BrRF9XeF.js","./chunk-U37J5Y7L-UQ_9cfTv.js","./math-Cgxj31JI.js","./isArrayLikeObject-CLvaVZ_f.js","./path-T0ZMCeow.js","./array-CbcWshdr.js","./line-BDgR7DeH.js","./dagre-B1nSzaB6.js","./graphlib-DjzKPGO1.js","./isEmpty-Bzxt9fVW.js","./_baseUniq-a3tMHZXc.js","./_basePickBy-Dt92fzOT.js","./clone-Buqdp3zv.js","./chunk-7RNWAQOT-Dr1aZdFx.js","./chunk-CV3G5MRU-BTMjY3GG.js","./chunk-JSVUIEYQ-LX_3m2KZ.js","./chunk-NCRKNZAS-Bafx7C7q.js","./chunk-WH6PBGIT-B5kscszo.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-tKu-GDMy.js";
import { l as interpolateToCurve } from "./chunk-U37J5Y7L-UQ_9cfTv.js";
import { F as log, d as __name, j as common_default, v as getConfig } from "./src-XfX5FL_o.js";
import { e as insertCluster, f as insertNode, h as labelHelper } from "./chunk-CV3G5MRU-BTMjY3GG.js";
import { c as insertEdge, d as insertEdgeLabel, e as markers_default, f as positionEdgeLabel } from "./chunk-NCRKNZAS-Bafx7C7q.js";
var internalHelpers = {
	common: common_default,
	getConfig,
	insertCluster,
	insertEdge,
	insertEdgeLabel,
	insertMarkers: markers_default,
	insertNode,
	interpolateToCurve,
	labelHelper,
	log,
	positionEdgeLabel
};
var layoutAlgorithms = {};
var registerLayoutLoaders = /* @__PURE__ */ __name((loaders) => {
	for (const loader of loaders) layoutAlgorithms[loader.name] = loader;
}, "registerLayoutLoaders");
var registerDefaultLayoutLoaders = /* @__PURE__ */ __name(() => {
	registerLayoutLoaders([{
		name: "dagre",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-2BBEFEWP-HuXWMFmH.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]), import.meta.url), "loader")
	}]);
}, "registerDefaultLayoutLoaders");
registerDefaultLayoutLoaders();
var render = /* @__PURE__ */ __name(async (data4Layout, svg) => {
	if (!(data4Layout.layoutAlgorithm in layoutAlgorithms)) throw new Error(`Unknown layout algorithm: ${data4Layout.layoutAlgorithm}`);
	const layoutDefinition = layoutAlgorithms[data4Layout.layoutAlgorithm];
	const layoutRenderer = await layoutDefinition.loader();
	return layoutRenderer.render(data4Layout, svg, internalHelpers, { algorithm: layoutDefinition.algorithm });
}, "render");
var getRegisteredLayoutAlgorithm = /* @__PURE__ */ __name((algorithm = "", { fallback = "dagre" } = {}) => {
	if (algorithm in layoutAlgorithms) return algorithm;
	if (fallback in layoutAlgorithms) {
		log.warn(`Layout algorithm ${algorithm} is not registered. Using ${fallback} as fallback.`);
		return fallback;
	}
	throw new Error(`Both layout algorithms ${algorithm} and ${fallback} are not registered.`);
}, "getRegisteredLayoutAlgorithm");
export { getRegisteredLayoutAlgorithm as b, registerLayoutLoaders as c, render as d };
