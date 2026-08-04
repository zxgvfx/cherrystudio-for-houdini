const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-6UL2VRFP-DB19Q7Nn.js","./dist-54a1YgjF.js","./chunk-0ogMdkZ1.js","./chunk-JA3XYJ7Z-DFENsjK_.js","./src-0snulynL.js","./dayjs.min-A7WN91xd.js","./src-CfORTIv5.js","./chunk-S3R3BYOJ-DBNXh5n3.js","./math-DwKi0v9r.js","./chunk-ABZYJK2D-eSl0jDLZ.js","./preload-helper-DiAdUXet.js","./purify.es-CkyOJxeY.js","./_baseFor-C1ZOHhHb.js","./dagre-BKTzciGT.js","./graphlib-DFv7Ho5V.js","./isEmpty-ls-aJDnV.js","./reduce-D32-VA2u.js","./flatten-DYPmrk1w.js","./clone-CFgllbzB.js","./chunk-ATLVNIR6-DxUMy6ne.js","./chunk-CVBHYZKI-DfZwlIJ8.js","./chunk-HN2XXSSU-ClwG2oQZ.js","./chunk-JZLCHNYA-CPXAZmiB.js","./chunk-QXUST7PY-9Pt0sCSa.js","./line-BYx78V5g.js","./path-GxZNf-Bi.js","./array-Budqsq10.js","./cose-bilkent-S5V4N54A-DltcblAx.js","./cytoscape.esm-BTHJtnkx.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-DiAdUXet.js";
import { n as __name, r as log } from "./src-0snulynL.js";
import { s as common_default, y as getConfig } from "./chunk-ABZYJK2D-eSl0jDLZ.js";
import { d as interpolateToCurve } from "./chunk-S3R3BYOJ-DBNXh5n3.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-JZLCHNYA-CPXAZmiB.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-QXUST7PY-9Pt0sCSa.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-6UL2VRFP-DB19Q7Nn.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-DltcblAx.js"), __vite__mapDeps([27,28,4,5,2,6]), import.meta.url), "loader")
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
