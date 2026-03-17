import "./dayjs.min-COl7sqdH.js";
import "./purify.es-CuN2L7KX.js";
import "./src-DCqOnvDB.js";
import { n as __name } from "./src-6zIEfxP7.js";
import "./chunk-ABZYJK2D-ChEDJ2w5.js";
import "./chunk-S3R3BYOJ-DT4ALjSF.js";
import "./dist-F5pRA-vX.js";
import "./chunk-JA3XYJ7Z-Dn_bOaiN.js";
import "./chunk-HN2XXSSU-DOCmk5GW.js";
import "./chunk-CVBHYZKI-igpUc3CW.js";
import "./chunk-55IACEB6-CTIhtikt.js";
import "./chunk-QN33PNHL-BMfa9HTW.js";
import "./chunk-ATLVNIR6-C3jSzKxJ.js";
import "./chunk-JZLCHNYA-idhHdf3f.js";
import "./chunk-QXUST7PY-DVxtU0dB.js";
import "./chunk-N4CR4FBY-nwDlQlCG.js";
import { i as styles_default, n as stateDiagram_default, r as stateRenderer_v3_unified_default, t as StateDB } from "./chunk-DI55MBZ5-DlezGAzg.js";
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
