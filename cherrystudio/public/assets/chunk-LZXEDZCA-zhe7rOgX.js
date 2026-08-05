const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dagre-BM42HDAG-D_-sZyQF.js","./dist-CnX2RsIG.js","./chunk-BilcBJ05.js","./chunk-O5CBEL6O-CgpElJQ9.js","./src-DnWfLfuG.js","./dayjs.min-D9b6NYuk.js","./src-Bffb5RtZ.js","./chunk-5ZQYHXKU-BCHZace-.js","./chunk-CSCIHK7Q-Cgo236yL.js","./preload-helper-CnwuLMwE.js","./purify.es-BGPp4qon.js","./dagre-CTS5hO1O.js","./graphlib-DqMsnCVz.js","./chunk-3OPIFGDE-D3JjGZ_b.js","./chunk-L5ZTLDWV-C5Liuw8M.js","./chunk-NZK2D7GU-D2wVRqtl.js","./rough.esm-CQMJz75H.js","./chunk-BSJP7CBP-FqA1yUMg.js","./chunk-KSCS5N6A-DozEDuzR.js","./line-CSKYiYTh.js","./path-Bis32_P5.js","./array-CajRF06m.js","./cose-bilkent-S5V4N54A-BjAI81Ti.js","./cytoscape.esm-Bns5Ws40.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-CnwuLMwE.js";
import { n as __name, r as log } from "./src-DnWfLfuG.js";
import { b as getConfig, s as common_default } from "./chunk-CSCIHK7Q-Cgo236yL.js";
import { f as interpolateToCurve } from "./chunk-5ZQYHXKU-BCHZace-.js";
import { a as insertNode, i as insertCluster, s as labelHelper } from "./chunk-3OPIFGDE-D3JjGZ_b.js";
import { a as positionEdgeLabel, i as markers_default, n as insertEdge, r as insertEdgeLabel } from "./chunk-KSCS5N6A-DozEDuzR.js";
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
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./dagre-BM42HDAG-D_-sZyQF.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]), import.meta.url), "loader")
	}, ...[{
		name: "cose-bilkent",
		loader: /* @__PURE__ */ __name(async () => await __vitePreload(() => import("./cose-bilkent-S5V4N54A-BjAI81Ti.js"), __vite__mapDeps([22,23,4,5,2,6]), import.meta.url), "loader")
	}]]);
}, "registerDefaultLayoutLoaders"))();
var render = /* @__PURE__ */ __name(async (data4Layout, svg) => {
	if (!(data4Layout.layoutAlgorithm in layoutAlgorithms)) throw new Error(`Unknown layout algorithm: ${data4Layout.layoutAlgorithm}`);
	if (data4Layout.diagramId) for (const node of data4Layout.nodes) {
		const originalDomId = node.domId || node.id;
		node.domId = `${data4Layout.diagramId}-${originalDomId}`;
	}
	const layoutDefinition = layoutAlgorithms[data4Layout.layoutAlgorithm];
	const layoutRenderer = await layoutDefinition.loader();
	const { theme, themeVariables } = data4Layout.config;
	const { useGradient, gradientStart, gradientStop } = themeVariables;
	const svgId = svg.attr("id");
	svg.append("defs").append("filter").attr("id", `${svgId}-drop-shadow`).attr("height", "130%").attr("width", "130%").append("feDropShadow").attr("dx", "4").attr("dy", "4").attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", `${theme?.includes("dark") ? "#FFFFFF" : "#000000"}`);
	svg.append("defs").append("filter").attr("id", `${svgId}-drop-shadow-small`).attr("height", "150%").attr("width", "150%").append("feDropShadow").attr("dx", "2").attr("dy", "2").attr("stdDeviation", 0).attr("flood-opacity", "0.06").attr("flood-color", `${theme?.includes("dark") ? "#FFFFFF" : "#000000"}`);
	if (useGradient) {
		const gradient = svg.append("linearGradient").attr("id", svg.attr("id") + "-gradient").attr("gradientUnits", "objectBoundingBox").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
		gradient.append("svg:stop").attr("offset", "0%").attr("stop-color", gradientStart).attr("stop-opacity", 1);
		gradient.append("svg:stop").attr("offset", "100%").attr("stop-color", gradientStop).attr("stop-opacity", 1);
	}
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
export { registerLayoutLoaders as n, render as r, getRegisteredLayoutAlgorithm as t };
