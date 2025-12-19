import "./dayjs.min-MfknQfLl.js";
import "./preload-helper-T0xubxxH.js";
import "./purify.es-CfWAaV4W.js";
import "./src-B1ibmIA4.js";
import "./chunk-4KMFLZZN-CNy9VpgZ.js";
import "./isArrayLikeObject-BqWLwIW5.js";
import "./_baseUniq-BKhx0pi0.js";
import "./_basePickBy-DmEMHBvl.js";
import "./isEmpty-BXWDwNAw.js";
import "./clone-DR_JdwCh.js";
import "./chunk-JEIROHC2-CRrsJUKn.js";
import "./chunk-BN7GFLIU-CXYvrjZO.js";
import "./chunk-T44TD3VJ-4mokAFko.js";
import "./chunk-KMC2YHZD-BtjJhpQB.js";
import "./chunk-WFWHJNB7-Bef1jMzy.js";
import "./chunk-WFRQ32O7-Do2tM8aE.js";
import "./chunk-XRWGC2XP-BBOKayYL.js";
import { F as log, d as __name, k as configureSvgSize } from "./src-bdkGtRSs.js";
import { b as selectSvgElement } from "./chunk-T57MJCP2-DTZSklNl.js";
import { b as parse } from "./mermaid-parser.core-DMzhX5RY.js";
import { b as package_default } from "./chunk-4HWIWPIY-DgNuDtSz.js";
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
