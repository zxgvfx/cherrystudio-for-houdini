import "./dayjs.min-MfknQfLl.js";
import "./preload-helper-tKu-GDMy.js";
import "./purify.es-t-jsSY2O.js";
import "./src-BrRF9XeF.js";
import "./chunk-4KMFLZZN-H5c2MWuL.js";
import "./isArrayLikeObject-CLvaVZ_f.js";
import "./_baseUniq-a3tMHZXc.js";
import "./_basePickBy-Dt92fzOT.js";
import "./isEmpty-Bzxt9fVW.js";
import "./clone-Buqdp3zv.js";
import "./chunk-JEIROHC2-B3hRJD0k.js";
import "./chunk-BN7GFLIU-C0dm2dKB.js";
import "./chunk-T44TD3VJ-CqwwR6x4.js";
import "./chunk-KMC2YHZD-Cj6Rhmf0.js";
import "./chunk-WFWHJNB7-DdJ7cZoc.js";
import "./chunk-WFRQ32O7-n7uwfW50.js";
import "./chunk-XRWGC2XP-JsQNVmmO.js";
import { F as log, d as __name, k as configureSvgSize } from "./src-rJjPA-w6.js";
import { b as selectSvgElement } from "./chunk-T57MJCP2-D9qi2TyH.js";
import { b as parse } from "./mermaid-parser.core-DqG-sqpm.js";
import { b as package_default } from "./chunk-4HWIWPIY-XUWW9rgo.js";
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
