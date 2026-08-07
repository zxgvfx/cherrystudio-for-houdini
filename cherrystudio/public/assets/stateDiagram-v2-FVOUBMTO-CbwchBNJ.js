import "./dayjs.min-CNu3tPBh.js";
import { D as __name } from "./src-BNJs7-l-.js";
import "./chunk-7R4GIKGN-CHXwpkSF.js";
import "./purify.es-Cmt93dJl.js";
import "./chunk-GEFDOKGD-B_rlJtFs.js";
import "./chunk-MX3YWQON-DlWEgeua.js";
import "./dist-CxgTYLYB.js";
import "./chunk-YBOYWFTD-D3-zQtJQ.js";
import "./chunk-PQ6SQG4A-BOmZ971H.js";
import "./chunk-PU5JKC2W-Cu-wUjZK.js";
import "./chunk-KYZI473N-Du-OPVjy.js";
import "./chunk-O4XLMI2P-DQGMYyCL.js";
import "./chunk-GLR3WWYH-BZcQpS2m.js";
import "./chunk-55IACEB6-CmpuvNII.js";
import "./chunk-KX2RTZJC-Atbq-HtU.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-NQ4KR5QH-B_BxvWDx.js";
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
