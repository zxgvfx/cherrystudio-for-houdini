const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-6UL2VRFP-_peGLAWS.js","./dist-F5pRA-vX.js","./chunk-0ogMdkZ1.js","./chunk-JA3XYJ7Z-Dn_bOaiN.js","./src-6zIEfxP7.js","./dayjs.min-COl7sqdH.js","./src-DCqOnvDB.js","./chunk-S3R3BYOJ-DT4ALjSF.js","./math-B8bBIItG.js","./chunk-ABZYJK2D-ChEDJ2w5.js","./preload-helper-0g9Mvw_b.js","./purify.es-CuN2L7KX.js","./_baseFor-Coo_DsK8.js","./dagre-saTG8KQG.js","./graphlib--kbgLfYb.js","./isEmpty-CYv_ehDI.js","./reduce-CsRsNN4I.js","./flatten-CkPJLFBz.js","./clone-B_-CLfy-.js","./chunk-ATLVNIR6-C3jSzKxJ.js","./chunk-CVBHYZKI-igpUc3CW.js","./chunk-HN2XXSSU-DOCmk5GW.js","./chunk-JZLCHNYA-idhHdf3f.js","./chunk-QXUST7PY-DVxtU0dB.js","./line-C6ntPgbq.js","./path-DIOl-DFI.js","./array-C_GohYfm.js","./cose-bilkent-S5V4N54A-t1A_t1mp.js","./cytoscape.esm-ByV52lTO.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-0g9Mvw_b.js";
import { n as __name, r as log } from "./src-6zIEfxP7.js";
import { s as common_default, y as getConfig } from "./chunk-ABZYJK2D-ChEDJ2w5.js";
import { d as interpolateToCurve } from "./chunk-S3R3BYOJ-DT4ALjSF.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-JZLCHNYA-idhHdf3f.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-QXUST7PY-DVxtU0dB.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-6UL2VRFP-_peGLAWS.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-t1A_t1mp.js"), __vite__mapDeps([27,28,4,5,2,6]), import.meta.url), "loader")
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
