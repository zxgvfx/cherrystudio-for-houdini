import { x as select_default } from "./src-DPg-QLn9.js";
import { d as __name, w as getConfig2 } from "./src-CGrvQjpB.js";
var selectSvgElement = /* @__PURE__ */ __name((id) => {
	const { securityLevel } = getConfig2();
	let root = select_default("body");
	if (securityLevel === "sandbox") {
		const sandboxElement = select_default(`#i${id}`);
		const doc = sandboxElement.node()?.contentDocument ?? document;
		root = select_default(doc.body);
	}
	const svg = root.select(`#${id}`);
	return svg;
}, "selectSvgElement");
export { selectSvgElement as b };
