import "./dayjs.min-CNu3tPBh.js";
import { D as __name, O as log } from "./src-BNJs7-l-.js";
import { c as configureSvgSize } from "./chunk-7R4GIKGN-CHXwpkSF.js";
import "./purify.es-Cmt93dJl.js";
import { t as selectSvgElement } from "./chunk-HHEYEP7N-B76yzjbd.js";
import "./chunk-XZSTWKYB-Djd3rlms.js";
import "./chunk-R5LLSJPH-DXHmvl68.js";
import "./chunk-7E7YKBS2-BZ3D0bF-.js";
import "./chunk-EGIJ26TM-B2Vcdpj7.js";
import "./chunk-C72U2L5F-DogCHhJ-.js";
import "./chunk-XIRO2GV7-BON3fzSY.js";
import "./chunk-L3YUKLVL-CdOAUgCJ.js";
import "./chunk-OZEHJAEY-DTY9E4RQ.js";
import { t as parse } from "./mermaid-parser.core-D-OaDfhA.js";
var parser = { parse: /* @__PURE__ */ __name(async (input) => {
	const ast = await parse("info", input);
	log.debug(ast);
}, "parse") };
var DEFAULT_INFO_DB = { version: "11.13.0" };
var diagram = {
	parser,
	db: { getVersion: /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion") },
	renderer: { draw: /* @__PURE__ */ __name((text, id, version) => {
		log.debug("rendering info diagram\n" + text);
		const svg = selectSvgElement(id);
		configureSvgSize(svg, 100, 400, true);
		svg.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
	}, "draw") }
};
export { diagram };
