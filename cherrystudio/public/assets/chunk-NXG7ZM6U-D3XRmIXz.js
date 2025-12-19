const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-2BBEFEWP-gRVcrxCv.js","./preload-helper-T0xubxxH.js","./dist-DPxGza6L.js","./chunk-st2fFX3F.js","./chunk-62K37W7T-BPYl3fvq.js","./src-bdkGtRSs.js","./dayjs.min-MfknQfLl.js","./purify.es-CfWAaV4W.js","./src-B1ibmIA4.js","./chunk-U37J5Y7L-CJPpCTGk.js","./math-D8DXO2KX.js","./isArrayLikeObject-BqWLwIW5.js","./path-BkCnxW_x.js","./array-BFT1s4ag.js","./line-C_EqvRST.js","./dagre-BEvCBaR7.js","./graphlib-B62gzF4j.js","./isEmpty-BXWDwNAw.js","./_baseUniq-BKhx0pi0.js","./_basePickBy-DmEMHBvl.js","./clone-DR_JdwCh.js","./chunk-7RNWAQOT-De_BhOh8.js","./chunk-CV3G5MRU-CIg5A-0R.js","./chunk-JSVUIEYQ-BU40EcnT.js","./chunk-NCRKNZAS-B-l2kvf6.js","./chunk-WH6PBGIT-K6gisNLZ.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-T0xubxxH.js";
import { l as interpolateToCurve } from "./chunk-U37J5Y7L-CJPpCTGk.js";
import { F as log, d as __name, j as common_default, v as getConfig } from "./src-bdkGtRSs.js";
import { e as insertCluster, f as insertNode, h as labelHelper } from "./chunk-CV3G5MRU-CIg5A-0R.js";
import { c as insertEdge, d as insertEdgeLabel, e as markers_default, f as positionEdgeLabel } from "./chunk-NCRKNZAS-B-l2kvf6.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-2BBEFEWP-gRVcrxCv.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]), import.meta.url), "loader")
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
