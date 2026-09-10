import "./dayjs.min-BBb2vAs7.js";
import { n as __name } from "./src-BxTmfvcS.js";
import "./chunk-7R4GIKGN-Dhqhodyz.js";
import "./purify.es-RDRNldMc.js";
import "./src-BkCZtMji.js";
import "./chunk-GEFDOKGD-CjhhL8_m.js";
import "./chunk-MX3YWQON-BCZ6eQbh.js";
import "./dist-CyZmekFX.js";
import "./chunk-YBOYWFTD-oI8qIE65.js";
import "./chunk-PQ6SQG4A-lGU_NePG.js";
import "./chunk-PU5JKC2W-B6_FzVbS.js";
import "./chunk-KYZI473N-C2tcBmRB.js";
import "./chunk-O4XLMI2P-aY1SO_x2.js";
import "./chunk-GLR3WWYH-47_v3MWD.js";
import "./chunk-55IACEB6-Bt64cZBk.js";
import "./chunk-KX2RTZJC-DZAh59G3.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-NQ4KR5QH-mKG9uUdp.js";
var diagram = {
	parser: stateDiagram_default,
	get db() {
		return new StateDB(2);
	},
	renderer: stateRenderer_v3_unified_default,
	styles: styles_default,
	init: /* @__PURE__ */ __name((cnf) => {
		if (!cnf.state) cnf.state = {};
		cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
	}, "init")
};
export { diagram };
