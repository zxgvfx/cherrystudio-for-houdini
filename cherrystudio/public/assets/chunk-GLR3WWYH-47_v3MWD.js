const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-KLK3FWXG-CHkSL1SR.js","./dist-CyZmekFX.js","./rolldown-runtime-D8OvLAZx.js","./chunk-PU5JKC2W-B6_FzVbS.js","./src-BxTmfvcS.js","./dayjs.min-BBb2vAs7.js","./src-BkCZtMji.js","./chunk-GEFDOKGD-CjhhL8_m.js","./math-BvH9V0aI.js","./chunk-7R4GIKGN-Dhqhodyz.js","./preload-helper-Cs2ugBNd.js","./purify.es-RDRNldMc.js","./_createAssigner-BE3XE1ym.js","./dagre-BxxGjoFm.js","./graphlib-CvrvqBk2.js","./isEmpty-DmX_zWoN.js","./_baseUniq-euB0txCp.js","./_basePickBy-GFVPRxH8.js","./clone-BD2esSDk.js","./chunk-KYZI473N-C2tcBmRB.js","./chunk-PQ6SQG4A-lGU_NePG.js","./chunk-YBOYWFTD-oI8qIE65.js","./rough.esm-CkNalSv9.js","./chunk-MX3YWQON-BCZ6eQbh.js","./chunk-O4XLMI2P-aY1SO_x2.js","./line-BgGkiE_9.js","./path-DdsAB209.js","./array-C8Gy2X3U.js","./cose-bilkent-S5V4N54A-BfZDTle8.js","./cytoscape.esm-YKZRsBN7.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { n as __name, r as log } from "./src-BxTmfvcS.js";
import { s as common_default, y as getConfig } from "./chunk-7R4GIKGN-Dhqhodyz.js";
import { d as interpolateToCurve } from "./chunk-GEFDOKGD-CjhhL8_m.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-KYZI473N-C2tcBmRB.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-O4XLMI2P-aY1SO_x2.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-KLK3FWXG-CHkSL1SR.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-BfZDTle8.js"), __vite__mapDeps([28,29,4,5,2,6]), import.meta.url), "loader")
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
