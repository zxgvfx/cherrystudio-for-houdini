import "./dayjs.min-BBb2vAs7.js";
import { n as __name, r as log } from "./src-BxTmfvcS.js";
import { c as configureSvgSize } from "./chunk-7R4GIKGN-Dhqhodyz.js";
import "./purify.es-RDRNldMc.js";
import "./src-BkCZtMji.js";
import { t as selectSvgElement } from "./chunk-HHEYEP7N-BdBCwgnw.js";
import "./chunk-XZSTWKYB-DKivZVva.js";
import "./chunk-R5LLSJPH-Lif8uITx.js";
import "./chunk-7E7YKBS2-DUZZblov.js";
import "./chunk-EGIJ26TM-CF2B0UK3.js";
import "./chunk-C72U2L5F-Bbr_Hxss.js";
import "./chunk-XIRO2GV7-CXiEDMew.js";
import "./chunk-L3YUKLVL-CN8caLid.js";
import "./chunk-OZEHJAEY-brqpMl21.js";
import { t as parse } from "./mermaid-parser.core-BZxD7IdZ.js";
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
