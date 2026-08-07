import { D as __name, w as select_default } from "./src-BNJs7-l-.js";
import { b as getConfig2 } from "./chunk-7R4GIKGN-CHXwpkSF.js";
var selectSvgElement = /* @__PURE__ */ __name((id) => {
	const { securityLevel } = getConfig2();
	let root = select_default("body");
	if (securityLevel === "sandbox") root = select_default((select_default(`#i${id}`).node()?.contentDocument ?? document).body);
	return root.select(`#${id}`);
}, "selectSvgElement");
export { selectSvgElement as t };
