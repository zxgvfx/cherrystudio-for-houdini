import { _ as createDefaultCoreModule, a as EmptyFileSystem, d as PieGrammarGeneratedModule, g as __name, l as MermaidGeneratedSharedModule, n as AbstractMermaidValueConverter, t as AbstractMermaidTokenBuilder, v as createDefaultSharedCoreModule, y as inject } from "./chunk-NNHCCRGN-DlfmgQ0M.js";
var PieTokenBuilder = class extends AbstractMermaidTokenBuilder {
	static {
		__name(this, "PieTokenBuilder");
	}
	constructor() {
		super(["pie", "showData"]);
	}
};
var PieValueConverter = class extends AbstractMermaidValueConverter {
	static {
		__name(this, "PieValueConverter");
	}
	runCustomConverter(rule, input, _cstNode) {
		if (rule.name !== "PIE_SECTION_LABEL") return;
		return input.replace(/"/g, "").trim();
	}
};
var PieModule = { parser: {
	TokenBuilder: /* @__PURE__ */ __name(() => new PieTokenBuilder(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ __name(() => new PieValueConverter(), "ValueConverter")
} };
function createPieServices(context = EmptyFileSystem) {
	const shared = inject(createDefaultSharedCoreModule(context), MermaidGeneratedSharedModule);
	const Pie = inject(createDefaultCoreModule({ shared }), PieGrammarGeneratedModule, PieModule);
	shared.ServiceRegistry.register(Pie);
	return {
		shared,
		Pie
	};
}
__name(createPieServices, "createPieServices");
export { createPieServices as n, PieModule as t };
