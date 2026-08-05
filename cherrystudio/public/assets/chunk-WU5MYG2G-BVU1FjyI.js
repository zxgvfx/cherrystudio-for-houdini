import { w as select_default } from "./src-Bffb5RtZ.js";
import { n as __name } from "./src-DnWfLfuG.js";
import { x as getConfig2 } from "./chunk-CSCIHK7Q-Cgo236yL.js";
var selectSvgElement = /* @__PURE__ */ __name((id) => {
	const { securityLevel } = getConfig2();
	let root = select_default("body");
	if (securityLevel === "sandbox") root = select_default((select_default(`#i${id}`).node()?.contentDocument ?? document).body);
	return root.select(`#${id}`);
}, "selectSvgElement");
export { selectSvgElement as t };
