import "./dayjs.min-A7WN91xd.js";
import "./purify.es-DVK4qXZQ.js";
import "./src-CE7Lch5q.js";
import { n as __name } from "./src-Dn7yUkKm.js";
import "./chunk-ABZYJK2D-Cu--blQt.js";
import "./chunk-S3R3BYOJ-Jutc6WAU.js";
import "./dist-CWcojVmm.js";
import "./chunk-JA3XYJ7Z-Baw-zkAr.js";
import "./chunk-HN2XXSSU-BFN_y8Cn.js";
import "./chunk-CVBHYZKI-B18SVOmJ.js";
import "./chunk-55IACEB6-DYZVFDF0.js";
import "./chunk-QN33PNHL-CxGD4HUC.js";
import "./chunk-ATLVNIR6-BBDs9nQc.js";
import "./chunk-JZLCHNYA-BZJFUP1R.js";
import "./chunk-QXUST7PY-DgjRQMjU.js";
import "./chunk-N4CR4FBY-BM9Yw6IM.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-DI55MBZ5-Bf83AfgR.js";
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
