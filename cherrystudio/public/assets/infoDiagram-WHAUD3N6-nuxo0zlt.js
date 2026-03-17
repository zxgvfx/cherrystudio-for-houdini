import "./dayjs.min-COl7sqdH.js";
import "./purify.es-CuN2L7KX.js";
import "./src-DCqOnvDB.js";
import "./chunk-FPAJGGOC-B-Nn_3t0.js";
import "./chunk-O7ZBX7Z2-ebI8zaxS.js";
import "./chunk-S6J4BHB3-BVLH03d7.js";
import "./chunk-LBM3YZW2-DpnMUD4W.js";
import "./chunk-76Q3JFCE-DSf5U1EZ.js";
import "./chunk-T53DSG4Q-DaOZ58Qa.js";
import "./chunk-LHMN2FUI-BKnbafyQ.js";
import "./chunk-FWNWRKHM-DowjeSnx.js";
import { n as __name, r as log } from "./src-6zIEfxP7.js";
import { c as configureSvgSize } from "./chunk-ABZYJK2D-ChEDJ2w5.js";
import { t as selectSvgElement } from "./chunk-EXTU4WIE-C8RzXrZX.js";
import { t as parse } from "./mermaid-parser.core-DXTNpm0h.js";
import { t as package_default } from "./chunk-XAJISQIX-BbM22utE.js";
var parser = { parse: /* @__PURE__ */ __name(async (input) => {
	const ast = await parse("info", input);
	log.debug(ast);
}, "parse") };
var DEFAULT_INFO_DB = { version: package_default.version + "" };
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
