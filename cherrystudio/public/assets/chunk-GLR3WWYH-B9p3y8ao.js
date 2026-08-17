const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-KLK3FWXG-CTvZMirD.js","./dist-B5PWVjZI.js","./rolldown-runtime-BeJLVFtF.js","./chunk-PU5JKC2W-C0QGORE3.js","./src-D2sM_phe.js","./dayjs.min-EuyAzn7r.js","./src-Axz2g2Kv.js","./chunk-GEFDOKGD-DInWMQjv.js","./math-C02Z-LAI.js","./chunk-7R4GIKGN-BVEPjrNo.js","./preload-helper-DXC6tWlX.js","./purify.es-BrXIkv5K.js","./_createAssigner-Ktrgs0eX.js","./dagre-DlIuwBJD.js","./graphlib-DEVdo3jk.js","./isEmpty-GJbwS6BL.js","./_baseUniq-D4WZM6EW.js","./_basePickBy-C3r83EiK.js","./clone-35BCky25.js","./chunk-KYZI473N-CHhb-TXw.js","./chunk-PQ6SQG4A-Cr1sT05N.js","./chunk-YBOYWFTD-BnVFFCdP.js","./rough.esm-DoFoqnyw.js","./chunk-MX3YWQON-DY4twLZB.js","./chunk-O4XLMI2P-DrZN-nfG.js","./line-DKut4N8n.js","./path-m24cpsyW.js","./array-DZIvApEA.js","./cose-bilkent-S5V4N54A-DEp4e68T.js","./cytoscape.esm-q5Kh13Nj.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { n as __name, r as log } from "./src-D2sM_phe.js";
import { s as common_default, y as getConfig } from "./chunk-7R4GIKGN-BVEPjrNo.js";
import { d as interpolateToCurve } from "./chunk-GEFDOKGD-DInWMQjv.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-KYZI473N-CHhb-TXw.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-O4XLMI2P-DrZN-nfG.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-KLK3FWXG-CTvZMirD.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-DEp4e68T.js"), __vite__mapDeps([28,29,4,5,2,6]), import.meta.url), "loader")
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
