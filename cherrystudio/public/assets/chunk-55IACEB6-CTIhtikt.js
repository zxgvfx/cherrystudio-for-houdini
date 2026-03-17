import { w as select_default } from "./src-DCqOnvDB.js";
import { n as __name } from "./src-6zIEfxP7.js";
var getDiagramElement = /* @__PURE__ */ __name((id, securityLevel) => {
	let sandboxElement;
	if (securityLevel === "sandbox") sandboxElement = select_default("#i" + id);
	return (securityLevel === "sandbox" ? select_default(sandboxElement.nodes()[0].contentDocument.body) : select_default("body")).select(`[id="${id}"]`);
}, "getDiagramElement");
export { getDiagramElement as t };
