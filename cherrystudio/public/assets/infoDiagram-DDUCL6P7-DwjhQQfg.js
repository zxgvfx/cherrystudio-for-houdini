import "./dayjs.min-U3mmM7gw.js";
import "./preload-helper-BMYLnTBu.js";
import "./purify.es-C6MO4CcO.js";
import "./src-DPg-QLn9.js";
import "./chunk-4KMFLZZN-d4WN8BMK.js";
import "./isArrayLikeObject-C0fnS-tW.js";
import "./_baseUniq-DL66X10H.js";
import "./_basePickBy-CmFGsbDd.js";
import "./isEmpty-4inQ9Rdd.js";
import "./clone-CRrzn8ol.js";
import "./chunk-JEIROHC2-Bp__XGMm.js";
import "./chunk-BN7GFLIU-B23KORSM.js";
import "./chunk-T44TD3VJ-DoNF6TMr.js";
import "./chunk-KMC2YHZD-B7XF2wIc.js";
import "./chunk-WFWHJNB7-DAE1VoV0.js";
import "./chunk-WFRQ32O7-BAry2yLS.js";
import "./chunk-XRWGC2XP-BtBBws6I.js";
import { F as log, d as __name, k as configureSvgSize } from "./src-CGrvQjpB.js";
import { b as selectSvgElement } from "./chunk-T57MJCP2-BXztZNDO.js";
import { b as parse } from "./mermaid-parser.core-DJS5b1sv.js";
import { b as package_default } from "./chunk-4HWIWPIY-Dpokh4gt.js";
var parser = { parse: /* @__PURE__ */ __name(async (input) => {
	const ast = await parse("info", input);
	log.debug(ast);
}, "parse") };
var DEFAULT_INFO_DB = { version: package_default.version + "" };
var getVersion = /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = { getVersion };
var draw = /* @__PURE__ */ __name((text, id, version) => {
	log.debug("rendering info diagram\n" + text);
	const svg = selectSvgElement(id);
	configureSvgSize(svg, 100, 400, true);
	const group = svg.append("g");
	group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
	parser,
	db,
	renderer
};
export { diagram };
