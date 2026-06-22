import "./dayjs.min-A7WN91xd.js";
import "./purify.es--yUqBK1B.js";
import "./src-BjBVFYTI.js";
import { n as __name } from "./src-Be1z-l4k.js";
import "./chunk-ABZYJK2D-BJEZmKZ0.js";
import "./chunk-S3R3BYOJ-SD49tN4s.js";
import "./dist-fpqj8I8z.js";
import "./chunk-JA3XYJ7Z-DT_6yhAz.js";
import "./chunk-HN2XXSSU-CZygpUsK.js";
import "./chunk-CVBHYZKI-BM3mjY3h.js";
import "./chunk-55IACEB6-B436DjJ3.js";
import "./chunk-QN33PNHL-D3EG7NzD.js";
import "./chunk-ATLVNIR6-CA8VX9_O.js";
import "./chunk-JZLCHNYA-BWyyxGr8.js";
import "./chunk-QXUST7PY-BHHeyNcD.js";
import "./chunk-N4CR4FBY-GnzB9XOH.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-DI55MBZ5-CdGKjZTW.js";
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
