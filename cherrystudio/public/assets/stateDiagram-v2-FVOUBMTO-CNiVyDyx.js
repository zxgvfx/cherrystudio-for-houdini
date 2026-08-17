import "./dayjs.min-EuyAzn7r.js";
import { n as __name } from "./src-D2sM_phe.js";
import "./chunk-7R4GIKGN-BVEPjrNo.js";
import "./purify.es-BrXIkv5K.js";
import "./src-Axz2g2Kv.js";
import "./chunk-GEFDOKGD-DInWMQjv.js";
import "./chunk-MX3YWQON-DY4twLZB.js";
import "./dist-B5PWVjZI.js";
import "./chunk-YBOYWFTD-BnVFFCdP.js";
import "./chunk-PQ6SQG4A-Cr1sT05N.js";
import "./chunk-PU5JKC2W-C0QGORE3.js";
import "./chunk-KYZI473N-CHhb-TXw.js";
import "./chunk-O4XLMI2P-DrZN-nfG.js";
import "./chunk-GLR3WWYH-B9p3y8ao.js";
import "./chunk-55IACEB6-CUnKDPQ1.js";
import "./chunk-KX2RTZJC-DSk9x0vV.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-NQ4KR5QH-C_wKLAOj.js";
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
