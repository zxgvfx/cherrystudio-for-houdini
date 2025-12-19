import "./dayjs.min-MfknQfLl.js";
import "./preload-helper-T0xubxxH.js";
import "./purify.es-CfWAaV4W.js";
import "./src-B1ibmIA4.js";
import "./isArrayLikeObject-BqWLwIW5.js";
import "./chunk-U37J5Y7L-CJPpCTGk.js";
import { d as __name } from "./src-bdkGtRSs.js";
import "./dist-DPxGza6L.js";
import "./path-BkCnxW_x.js";
import "./math-D8DXO2KX.js";
import "./array-BFT1s4ag.js";
import "./line-C_EqvRST.js";
import "./chunk-62K37W7T-BPYl3fvq.js";
import "./chunk-WH6PBGIT-K6gisNLZ.js";
import "./chunk-JSVUIEYQ-BU40EcnT.js";
import "./chunk-WVR4S24B-DTAf5wOC.js";
import "./chunk-NRVI72HA-CDsC2CZw.js";
import "./chunk-7RNWAQOT-De_BhOh8.js";
import "./chunk-CV3G5MRU-CIg5A-0R.js";
import "./chunk-NCRKNZAS-B-l2kvf6.js";
import "./chunk-NXG7ZM6U-D3XRmIXz.js";
import { b as StateDB, c as stateDiagram_default, d as stateRenderer_v3_unified_default, e as styles_default } from "./chunk-LXBSTHXV-D1FIj_xE.js";
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
