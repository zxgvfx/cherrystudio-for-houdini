const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-2BBEFEWP-DoMBHCqK.js","./preload-helper-B3513jP_.js","./dist-BxiPzjBU.js","./chunk-st2fFX3F.js","./chunk-62K37W7T-BeZbC9lK.js","./src-CEhSfknn.js","./dayjs.min-MfknQfLl.js","./purify.es-BKa0rpML.js","./src-5u9chS5z.js","./chunk-U37J5Y7L-43VRkMh9.js","./math-iH7icnWp.js","./isArrayLikeObject-D_I98Q6J.js","./path-DUBajVUd.js","./array-Bh1-Sa4T.js","./line-4OH-JkDY.js","./dagre-C7ejc05o.js","./graphlib-DNQemVTd.js","./isEmpty-CpYFi3X3.js","./_baseUniq-D12b1s0I.js","./_basePickBy-DTFes8nm.js","./clone-DZVKG1__.js","./chunk-7RNWAQOT-Cj-WKKVW.js","./chunk-CV3G5MRU-DTDwJpxo.js","./chunk-JSVUIEYQ-BvqTIx8Q.js","./chunk-NCRKNZAS-DWqDn7as.js","./chunk-WH6PBGIT-BILoVK1G.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-B3513jP_.js";
import { l as interpolateToCurve } from "./chunk-U37J5Y7L-43VRkMh9.js";
import { F as log, d as __name, j as common_default, v as getConfig } from "./src-CEhSfknn.js";
import { e as insertCluster, f as insertNode, h as labelHelper } from "./chunk-CV3G5MRU-DTDwJpxo.js";
import { c as insertEdge, d as insertEdgeLabel, e as markers_default, f as positionEdgeLabel } from "./chunk-NCRKNZAS-DWqDn7as.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-2BBEFEWP-DoMBHCqK.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]), import.meta.url), "loader")
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
