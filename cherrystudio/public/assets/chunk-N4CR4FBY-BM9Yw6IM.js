const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-6UL2VRFP-Danuw46i.js","./dist-CWcojVmm.js","./chunk-0ogMdkZ1.js","./chunk-JA3XYJ7Z-Baw-zkAr.js","./src-Dn7yUkKm.js","./dayjs.min-A7WN91xd.js","./src-CE7Lch5q.js","./chunk-S3R3BYOJ-Jutc6WAU.js","./math-BDqOtkLY.js","./chunk-ABZYJK2D-Cu--blQt.js","./preload-helper-Ds6i2_-X.js","./purify.es-DVK4qXZQ.js","./_baseFor-D3YGcNEJ.js","./dagre-CCdJVLDF.js","./graphlib-DzwcB8M5.js","./isEmpty-7pwPNs8K.js","./reduce-fulHaVuN.js","./flatten-917SNdFV.js","./clone-xK3rrHhf.js","./chunk-ATLVNIR6-BBDs9nQc.js","./chunk-CVBHYZKI-B18SVOmJ.js","./chunk-HN2XXSSU-BFN_y8Cn.js","./chunk-JZLCHNYA-BZJFUP1R.js","./chunk-QXUST7PY-DgjRQMjU.js","./line-LT_lHIbO.js","./path-DJFEfAYv.js","./array-DZuPr1wl.js","./cose-bilkent-S5V4N54A-BO8EjfXG.js","./cytoscape.esm-gh9Dco9T.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-Ds6i2_-X.js";
import { n as __name, r as log } from "./src-Dn7yUkKm.js";
import { s as common_default, y as getConfig } from "./chunk-ABZYJK2D-Cu--blQt.js";
import { d as interpolateToCurve } from "./chunk-S3R3BYOJ-Jutc6WAU.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-JZLCHNYA-BZJFUP1R.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-QXUST7PY-DgjRQMjU.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-6UL2VRFP-Danuw46i.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-BO8EjfXG.js"), __vite__mapDeps([27,28,4,5,2,6]), import.meta.url), "loader")
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
