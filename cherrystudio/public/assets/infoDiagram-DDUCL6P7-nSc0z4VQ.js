import "./dayjs.min-C3TImjef.js";
import "./preload-helper-tKu-GDMy.js";
import "./purify.es-t-jsSY2O.js";
import "./src-C9KJCgun.js";
import "./chunk-4KMFLZZN-DKZVZAaH.js";
import "./isArrayLikeObject-B-RNrFRP.js";
import "./_baseUniq-D4AXUGVn.js";
import "./_basePickBy-DXmuZVX8.js";
import "./isEmpty-_Wq7Or9l.js";
import "./clone-CBOXH742.js";
import "./chunk-JEIROHC2-BQNKaqiu.js";
import "./chunk-BN7GFLIU-taUHbwF1.js";
import "./chunk-T44TD3VJ-Cqa8HFrb.js";
import "./chunk-KMC2YHZD-b0fWvrTD.js";
import "./chunk-WFWHJNB7-By6BuQ-Q.js";
import "./chunk-WFRQ32O7-BktnexHx.js";
import "./chunk-XRWGC2XP-v0jB-lQ3.js";
import { F as log, d as __name, k as configureSvgSize } from "./src-BfrgZuL5.js";
import { b as selectSvgElement } from "./chunk-T57MJCP2-CEDdh69o.js";
import { b as parse } from "./mermaid-parser.core-ChcFIVqk.js";
import { b as package_default } from "./chunk-4HWIWPIY-BIUznEq-.js";
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
