const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-6UL2VRFP-J65b43Vj.js","./dist-fpqj8I8z.js","./chunk-0ogMdkZ1.js","./chunk-JA3XYJ7Z-DT_6yhAz.js","./src-Be1z-l4k.js","./dayjs.min-A7WN91xd.js","./src-BjBVFYTI.js","./chunk-S3R3BYOJ-SD49tN4s.js","./math-IrdXx6vZ.js","./chunk-ABZYJK2D-BJEZmKZ0.js","./preload-helper-DPod9cAG.js","./purify.es--yUqBK1B.js","./_baseFor-DGqm56vS.js","./dagre-DX79BZC5.js","./graphlib-DdUHvA-U.js","./isEmpty-eU5w6VY6.js","./reduce-CBXB-mBy.js","./flatten-BrMCaMvI.js","./clone-BbZf87mt.js","./chunk-ATLVNIR6-CA8VX9_O.js","./chunk-CVBHYZKI-BM3mjY3h.js","./chunk-HN2XXSSU-CZygpUsK.js","./chunk-JZLCHNYA-BWyyxGr8.js","./chunk-QXUST7PY-BHHeyNcD.js","./line-CFjy7euR.js","./path-Di4dD57o.js","./array-BI9TCyur.js","./cose-bilkent-S5V4N54A-BeJFRUrb.js","./cytoscape.esm-DEaisxFg.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-DPod9cAG.js";
import { n as __name, r as log } from "./src-Be1z-l4k.js";
import { s as common_default, y as getConfig } from "./chunk-ABZYJK2D-BJEZmKZ0.js";
import { d as interpolateToCurve } from "./chunk-S3R3BYOJ-SD49tN4s.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-JZLCHNYA-BWyyxGr8.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-QXUST7PY-BHHeyNcD.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-6UL2VRFP-J65b43Vj.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-BeJFRUrb.js"), __vite__mapDeps([27,28,4,5,2,6]), import.meta.url), "loader")
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
