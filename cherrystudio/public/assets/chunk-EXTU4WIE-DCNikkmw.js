import { w as select_default } from "./src-CE7Lch5q.js";
import { n as __name } from "./src-Dn7yUkKm.js";
import { b as getConfig2 } from "./chunk-ABZYJK2D-Cu--blQt.js";
var selectSvgElement = /* @__PURE__ */ __name((id) => {
	const { securityLevel } = getConfig2();
	let root = select_default("body");
	if (securityLevel === "sandbox") root = select_default((select_default(`#i${id}`).node()?.contentDocument ?? document).body);
	return root.select(`#${id}`);
}, "selectSvgElement");
export { selectSvgElement as t };
