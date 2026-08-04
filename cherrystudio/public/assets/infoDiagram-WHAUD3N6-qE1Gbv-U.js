import "./dayjs.min-A7WN91xd.js";
import "./purify.es-CkyOJxeY.js";
import "./src-CfORTIv5.js";
import "./chunk-FPAJGGOC-DNJoCHsA.js";
import "./chunk-O7ZBX7Z2-BBiOiDiM.js";
import "./chunk-S6J4BHB3-D7MoyX9i.js";
import "./chunk-LBM3YZW2-Bj5dKQ-F.js";
import "./chunk-76Q3JFCE-BDR-f8sl.js";
import "./chunk-T53DSG4Q-DnY4V9Aw.js";
import "./chunk-LHMN2FUI-cJnjUk42.js";
import "./chunk-FWNWRKHM-DEYs2m9s.js";
import { n as __name, r as log } from "./src-0snulynL.js";
import { c as configureSvgSize } from "./chunk-ABZYJK2D-eSl0jDLZ.js";
import { t as selectSvgElement } from "./chunk-EXTU4WIE-C7EOMtrA.js";
import { t as parse } from "./mermaid-parser.core-BhJYYwbP.js";
import { t as package_default } from "./chunk-XAJISQIX-GFLQaqFo.js";
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
