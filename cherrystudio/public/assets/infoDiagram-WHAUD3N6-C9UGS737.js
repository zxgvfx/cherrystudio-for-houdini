import "./dayjs.min-A7WN91xd.js";
import "./purify.es--yUqBK1B.js";
import "./src-BjBVFYTI.js";
import "./chunk-FPAJGGOC-DvczyXWu.js";
import "./chunk-O7ZBX7Z2-CuHT8urv.js";
import "./chunk-S6J4BHB3-BJu2Ty5i.js";
import "./chunk-LBM3YZW2-BUKp2ZJ0.js";
import "./chunk-76Q3JFCE-DHvbyQHi.js";
import "./chunk-T53DSG4Q-B9vFiDId.js";
import "./chunk-LHMN2FUI-J_x19aou.js";
import "./chunk-FWNWRKHM--srwD8Tv.js";
import { n as __name, r as log } from "./src-Be1z-l4k.js";
import { c as configureSvgSize } from "./chunk-ABZYJK2D-BJEZmKZ0.js";
import { t as selectSvgElement } from "./chunk-EXTU4WIE-DDeZQQOf.js";
import { t as parse } from "./mermaid-parser.core-DtzMiJNe.js";
import { t as package_default } from "./chunk-XAJISQIX-CCOjebmN.js";
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
