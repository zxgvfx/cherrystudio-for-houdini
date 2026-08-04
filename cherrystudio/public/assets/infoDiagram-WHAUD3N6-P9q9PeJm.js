import "./dayjs.min-A7WN91xd.js";
import "./purify.es-BGPp4qon.js";
import "./src-CVa4gIVB.js";
import "./chunk-FPAJGGOC-BtMvJbgL.js";
import "./chunk-O7ZBX7Z2-BJ__apzz.js";
import "./chunk-S6J4BHB3-JJsuHHti.js";
import "./chunk-LBM3YZW2-pSi-f3Si.js";
import "./chunk-76Q3JFCE-Dk7LUwjx.js";
import "./chunk-T53DSG4Q-B3UNx8uO.js";
import "./chunk-LHMN2FUI-VMvEbgo7.js";
import "./chunk-FWNWRKHM-CvgaY0Oc.js";
import { n as __name, r as log } from "./src-BfEXwqas.js";
import { c as configureSvgSize } from "./chunk-ABZYJK2D-yCGHmLnA.js";
import { t as selectSvgElement } from "./chunk-EXTU4WIE-CH-vFUOf.js";
import { t as parse } from "./mermaid-parser.core-Bhi_8IYD.js";
import { t as package_default } from "./chunk-XAJISQIX-C-_hyuBF.js";
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
