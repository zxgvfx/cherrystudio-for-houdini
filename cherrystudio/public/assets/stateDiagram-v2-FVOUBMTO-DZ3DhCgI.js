import "./dayjs.min-CNu3tPBh.js";
import { D as __name } from "./src-BNJs7-l-.js";
import "./chunk-7R4GIKGN-opF5h3Q7.js";
import "./purify.es-Cmt93dJl.js";
import "./chunk-GEFDOKGD-zw4Vf4TN.js";
import "./chunk-MX3YWQON-DlWEgeua.js";
import "./dist-CxgTYLYB.js";
import "./chunk-YBOYWFTD-Kki0wG0o.js";
import "./chunk-PQ6SQG4A-CzNZMsqR.js";
import "./chunk-PU5JKC2W-BGkxwWVA.js";
import "./chunk-KYZI473N-Bewh20wY.js";
import "./chunk-O4XLMI2P-D0X8v0R7.js";
import "./chunk-GLR3WWYH-BebQK3DK.js";
import "./chunk-55IACEB6-CZkOgpLD.js";
import "./chunk-KX2RTZJC-CydZGpuc.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-NQ4KR5QH-CuaWzo4h.js";
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
