import "./dayjs.min-MfknQfLl.js";
import "./preload-helper-B3513jP_.js";
import "./purify.es-BKa0rpML.js";
import "./src-5u9chS5z.js";
import "./chunk-4KMFLZZN-BcL2o9x-.js";
import "./isArrayLikeObject-D_I98Q6J.js";
import "./_baseUniq-D12b1s0I.js";
import "./_basePickBy-DTFes8nm.js";
import "./isEmpty-CpYFi3X3.js";
import "./clone-DZVKG1__.js";
import "./chunk-JEIROHC2-DwEynv_C.js";
import "./chunk-BN7GFLIU-D02Oc7bP.js";
import "./chunk-T44TD3VJ-CkvpfBx4.js";
import "./chunk-KMC2YHZD-BdTcEzh7.js";
import "./chunk-WFWHJNB7-B08LFvYM.js";
import "./chunk-WFRQ32O7-DOX0DzRb.js";
import "./chunk-XRWGC2XP-_3rH1249.js";
import { F as log, d as __name, k as configureSvgSize } from "./src-CEhSfknn.js";
import { b as selectSvgElement } from "./chunk-T57MJCP2-Blm_RppS.js";
import { b as parse } from "./mermaid-parser.core-BBdvIw9E.js";
import { b as package_default } from "./chunk-4HWIWPIY-DScS8EJ5.js";
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
