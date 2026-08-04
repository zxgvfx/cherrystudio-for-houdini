import "./dayjs.min-A7WN91xd.js";
import "./purify.es-CkyOJxeY.js";
import "./src-CfORTIv5.js";
import { n as __name } from "./src-0snulynL.js";
import "./chunk-ABZYJK2D-eSl0jDLZ.js";
import "./chunk-S3R3BYOJ-DBNXh5n3.js";
import "./dist-54a1YgjF.js";
import "./chunk-JA3XYJ7Z-DFENsjK_.js";
import "./chunk-HN2XXSSU-ClwG2oQZ.js";
import "./chunk-CVBHYZKI-DfZwlIJ8.js";
import "./chunk-55IACEB6-DNQO3H9e.js";
import "./chunk-QN33PNHL-D61vTgVt.js";
import "./chunk-ATLVNIR6-DxUMy6ne.js";
import "./chunk-JZLCHNYA-CPXAZmiB.js";
import "./chunk-QXUST7PY-9Pt0sCSa.js";
import "./chunk-N4CR4FBY-CIwl9vjW.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-DI55MBZ5-lRX1leTG.js";
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
