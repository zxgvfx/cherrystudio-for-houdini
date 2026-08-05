import "./dayjs.min-D9b6NYuk.js";
import "./purify.es-BGPp4qon.js";
import "./src-Bffb5RtZ.js";
import "./chunk-NNHCCRGN-DlfmgQ0M.js";
import "./chunk-4EGX6M5U-CzQvcJju.js";
import "./chunk-N66VUXT2-BZyJeq2E.js";
import "./chunk-UIBZB4QT-D-OF3sF8.js";
import "./chunk-5DO6E6H7-Blu7OruR.js";
import "./chunk-MPE355IW-7KX47i8t.js";
import "./chunk-MZUSXYTE-DZhn1Odl.js";
import "./chunk-FHYWG6QK-HEyo2I7S.js";
import "./chunk-WCWK7LTN-Cy7SKvjY.js";
import "./chunk-BR22UD5L-BIHCZR_O.js";
import "./chunk-PUPMXCY4-CXW-l0at.js";
import { n as __name, r as log } from "./src-DnWfLfuG.js";
import { c as configureSvgSize } from "./chunk-CSCIHK7Q-Cgo236yL.js";
import { t as selectSvgElement } from "./chunk-WU5MYG2G-BVU1FjyI.js";
import { t as parse } from "./mermaid-parser.core-Cm9FrM5P.js";
var parser = { parse: /* @__PURE__ */ __name(async (input) => {
	const ast = await parse("info", input);
	log.debug(ast);
}, "parse") };
var DEFAULT_INFO_DB = { version: "11.15.0" };
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
