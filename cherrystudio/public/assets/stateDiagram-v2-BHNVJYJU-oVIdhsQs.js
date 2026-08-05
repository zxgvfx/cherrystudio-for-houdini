import "./dayjs.min-D9b6NYuk.js";
import "./purify.es-BGPp4qon.js";
import "./src-Bffb5RtZ.js";
import { n as __name } from "./src-DnWfLfuG.js";
import "./chunk-CSCIHK7Q-Cgo236yL.js";
import "./dist-CnX2RsIG.js";
import "./chunk-5ZQYHXKU-BCHZace-.js";
import "./chunk-O5CBEL6O-CgpElJQ9.js";
import "./chunk-BSJP7CBP-FqA1yUMg.js";
import "./chunk-L5ZTLDWV-C5Liuw8M.js";
import "./chunk-55IACEB6-898awZBu.js";
import "./chunk-2J33WTMH-Cc0N6ZOi.js";
import "./chunk-NZK2D7GU-D2wVRqtl.js";
import "./chunk-3OPIFGDE-D3JjGZ_b.js";
import "./chunk-KSCS5N6A-DozEDuzR.js";
import "./chunk-LZXEDZCA-zhe7rOgX.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-AQP2D5EJ-proG0mKx.js";
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
