import { x as select_default } from "./src-5u9chS5z.js";
import { d as __name } from "./src-CEhSfknn.js";
var getDiagramElement = /* @__PURE__ */ __name((id, securityLevel) => {
	let sandboxElement;
	if (securityLevel === "sandbox") sandboxElement = select_default("#i" + id);
	const root = securityLevel === "sandbox" ? select_default(sandboxElement.nodes()[0].contentDocument.body) : select_default("body");
	const svg = root.select(`[id="${id}"]`);
	return svg;
}, "getDiagramElement");
export { getDiagramElement as b };
