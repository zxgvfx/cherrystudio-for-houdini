const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-2BBEFEWP-S2fxTym5.js","./preload-helper-tKu-GDMy.js","./dist-CNehbUK1.js","./chunk-st2fFX3F.js","./chunk-62K37W7T-Dn-fmFkU.js","./src-BfrgZuL5.js","./dayjs.min-C3TImjef.js","./purify.es-t-jsSY2O.js","./src-C9KJCgun.js","./chunk-U37J5Y7L-DhmqduS1.js","./math-BDLAlUsQ.js","./isArrayLikeObject-B-RNrFRP.js","./path-l-8rToNm.js","./array-OzPE2SQQ.js","./line-CIsuKKln.js","./dagre-BfLroBui.js","./graphlib-D-qiGEDb.js","./isEmpty-_Wq7Or9l.js","./_baseUniq-D4AXUGVn.js","./_basePickBy-DXmuZVX8.js","./clone-CBOXH742.js","./chunk-7RNWAQOT-CSBKAAZX.js","./chunk-CV3G5MRU-CB_OJM8j.js","./chunk-JSVUIEYQ-BVexg-zg.js","./chunk-NCRKNZAS-DubEZeSB.js","./chunk-WH6PBGIT-Ce8XcWw1.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-tKu-GDMy.js";
import { l as interpolateToCurve } from "./chunk-U37J5Y7L-DhmqduS1.js";
import { F as log, d as __name, j as common_default, v as getConfig } from "./src-BfrgZuL5.js";
import { e as insertCluster, f as insertNode, h as labelHelper } from "./chunk-CV3G5MRU-CB_OJM8j.js";
import { c as insertEdge, d as insertEdgeLabel, e as markers_default, f as positionEdgeLabel } from "./chunk-NCRKNZAS-DubEZeSB.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-2BBEFEWP-S2fxTym5.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]), import.meta.url), "loader")
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
