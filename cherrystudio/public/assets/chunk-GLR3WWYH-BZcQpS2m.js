const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-KLK3FWXG-B6uCZjr3.js","./dist-CxgTYLYB.js","./chunk-DiqNceaa.js","./chunk-PU5JKC2W-Cu-wUjZK.js","./src-BNJs7-l-.js","./dayjs.min-CNu3tPBh.js","./chunk-GEFDOKGD-B_rlJtFs.js","./math-BcgEFMid.js","./chunk-7R4GIKGN-CHXwpkSF.js","./preload-helper-BAxOQgJR.js","./purify.es-Cmt93dJl.js","./_createAssigner-BlLJQMNU.js","./dagre-vtSKmmqW.js","./graphlib-Bt7GAcdH.js","./isEmpty-DtG0CncE.js","./_baseUniq-D-KJerXB.js","./_basePickBy-CU0oN7Qu.js","./clone-D7t6gmTx.js","./chunk-KYZI473N-Du-OPVjy.js","./chunk-PQ6SQG4A-BOmZ971H.js","./chunk-YBOYWFTD-D3-zQtJQ.js","./rough.esm-CQhCMm63.js","./chunk-MX3YWQON-DlWEgeua.js","./chunk-O4XLMI2P-DQGMYyCL.js","./line-CVOWet2t.js","./path-BM9cMg4l.js","./array-DL5nUy18.js","./cose-bilkent-S5V4N54A-CXsTgBAE.js","./cytoscape.esm-DXNseWxG.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import { D as __name, O as log } from "./src-BNJs7-l-.js";
import { s as common_default, y as getConfig } from "./chunk-7R4GIKGN-CHXwpkSF.js";
import { d as interpolateToCurve } from "./chunk-GEFDOKGD-B_rlJtFs.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-KYZI473N-Du-OPVjy.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-O4XLMI2P-DQGMYyCL.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-KLK3FWXG-B6uCZjr3.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-CXsTgBAE.js"), __vite__mapDeps([27,28,4,5,2]), import.meta.url), "loader")
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
