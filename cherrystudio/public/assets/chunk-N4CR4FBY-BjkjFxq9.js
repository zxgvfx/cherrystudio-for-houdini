const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-6UL2VRFP-BVdIhydk.js","./dist-ZQpw1vMj.js","./chunk-0ogMdkZ1.js","./chunk-JA3XYJ7Z-DthlSIss.js","./src-BfEXwqas.js","./dayjs.min-A7WN91xd.js","./src-CVa4gIVB.js","./chunk-S3R3BYOJ-Dzjr8u-W.js","./math-HYWoavDF.js","./chunk-ABZYJK2D-yCGHmLnA.js","./preload-helper-BO1u-67e.js","./purify.es-BGPp4qon.js","./_baseFor-DopXmZGg.js","./dagre-DDcS6CM7.js","./graphlib-bm61-OiM.js","./isEmpty--rBKRpEP.js","./reduce-DInMMjMx.js","./flatten-B4cSGI4x.js","./clone-CtQBEl1V.js","./chunk-ATLVNIR6-JJ--aDjG.js","./chunk-CVBHYZKI-AGgMznU_.js","./chunk-HN2XXSSU-CqC8H8E0.js","./chunk-JZLCHNYA-OINUdt9a.js","./chunk-QXUST7PY-CoLnvwHo.js","./line-Cwoy_f5Q.js","./path-BfLWznLX.js","./array-7Qxy-Gy6.js","./cose-bilkent-S5V4N54A-Bsp0EHXv.js","./cytoscape.esm-DcRigw0w.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-BO1u-67e.js";
import { n as __name, r as log } from "./src-BfEXwqas.js";
import { s as common_default, y as getConfig } from "./chunk-ABZYJK2D-yCGHmLnA.js";
import { d as interpolateToCurve } from "./chunk-S3R3BYOJ-Dzjr8u-W.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-JZLCHNYA-OINUdt9a.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-QXUST7PY-CoLnvwHo.js";
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
(/* @__PURE__ */ __name(() => {
	registerLayoutLoaders([{
		name: "dagre",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-6UL2VRFP-BVdIhydk.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-Bsp0EHXv.js"), __vite__mapDeps([27,28,4,5,2,6]), import.meta.url), "loader")
	}]]);
}, "registerDefaultLayoutLoaders"))();
var render = /* @__PURE__ */ __name(async (data4Layout, svg) => {
	if (!(data4Layout.layoutAlgorithm in layoutAlgorithms)) throw new Error(`Unknown layout algorithm: ${data4Layout.layoutAlgorithm}`);
	const layoutDefinition = layoutAlgorithms[data4Layout.layoutAlgorithm];
	return (await layoutDefinition.loader()).render(data4Layout, svg, internalHelpers, { algorithm: layoutDefinition.algorithm });
}, "render");
var getRegisteredLayoutAlgorithm = /* @__PURE__ */ __name((algorithm = "", { fallback = "dagre" } = {}) => {
	if (algorithm in layoutAlgorithms) return algorithm;
	if (fallback in layoutAlgorithms) {
		log.warn(`Layout algorithm ${algorithm} is not registered. Using ${fallback} as fallback.`);
		return fallback;
	}
	throw new Error(`Both layout algorithms ${algorithm} and ${fallback} are not registered.`);
}, "getRegisteredLayoutAlgorithm");
export { registerLayoutLoaders as n, render as r, getRegisteredLayoutAlgorithm as t };
