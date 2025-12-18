const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-2BBEFEWP-BfPWTkdw.js","./preload-helper-BMYLnTBu.js","./dist-GyeXwPcL.js","./chunk-st2fFX3F.js","./chunk-62K37W7T-CS5FBIWY.js","./src-CGrvQjpB.js","./dayjs.min-U3mmM7gw.js","./purify.es-C6MO4CcO.js","./src-DPg-QLn9.js","./chunk-U37J5Y7L-BnFtP-4c.js","./math-BTIk4ARo.js","./isArrayLikeObject-C0fnS-tW.js","./path-dRVSja5Y.js","./array-DdqFijih.js","./line-CvT3J1bN.js","./dagre-DPGzJ1M4.js","./graphlib-Ds559TXH.js","./isEmpty-4inQ9Rdd.js","./_baseUniq-DL66X10H.js","./_basePickBy-CmFGsbDd.js","./clone-CRrzn8ol.js","./chunk-7RNWAQOT-BlzdrJx7.js","./chunk-CV3G5MRU-B4vCiYcL.js","./chunk-JSVUIEYQ-DCQg9tFL.js","./chunk-NCRKNZAS-Ci-2AFhK.js","./chunk-WH6PBGIT-BYU-radU.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-BMYLnTBu.js";
import { l as interpolateToCurve } from "./chunk-U37J5Y7L-BnFtP-4c.js";
import { F as log, d as __name, j as common_default, v as getConfig } from "./src-CGrvQjpB.js";
import { e as insertCluster, f as insertNode, h as labelHelper } from "./chunk-CV3G5MRU-B4vCiYcL.js";
import { c as insertEdge, d as insertEdgeLabel, e as markers_default, f as positionEdgeLabel } from "./chunk-NCRKNZAS-Ci-2AFhK.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-2BBEFEWP-BfPWTkdw.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]), import.meta.url), "loader")
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
