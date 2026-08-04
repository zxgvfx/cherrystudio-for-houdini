import "./dayjs.min-A7WN91xd.js";
import "./purify.es-DVK4qXZQ.js";
import "./src-CE7Lch5q.js";
import "./chunk-FPAJGGOC-CRgAxkEb.js";
import "./chunk-O7ZBX7Z2-DvDg5FhK.js";
import "./chunk-S6J4BHB3-BcC1URD2.js";
import "./chunk-LBM3YZW2-CBGkY6yt.js";
import "./chunk-76Q3JFCE-Dd_lvfcB.js";
import "./chunk-T53DSG4Q-C6BZYGad.js";
import "./chunk-LHMN2FUI-DKAz_CvS.js";
import "./chunk-FWNWRKHM-BugacAbj.js";
import { n as __name, r as log } from "./src-Dn7yUkKm.js";
import { c as configureSvgSize } from "./chunk-ABZYJK2D-Cu--blQt.js";
import { t as selectSvgElement } from "./chunk-EXTU4WIE-DCNikkmw.js";
import { t as parse } from "./mermaid-parser.core-CQdkgva7.js";
import { t as package_default } from "./chunk-XAJISQIX-L_3jxm_O.js";
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
