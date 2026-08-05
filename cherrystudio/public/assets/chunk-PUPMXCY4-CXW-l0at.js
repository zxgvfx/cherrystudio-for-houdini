import { _ as createDefaultCoreModule, a as EmptyFileSystem, g as __name, h as WardleyGrammarGeneratedModule, l as MermaidGeneratedSharedModule, n as AbstractMermaidValueConverter, v as createDefaultSharedCoreModule, y as inject } from "./chunk-NNHCCRGN-DlfmgQ0M.js";
var WardleyValueConverter = class extends AbstractMermaidValueConverter {
	static {
		__name(this, "WardleyValueConverter");
	}
	runCustomConverter(rule, input, _cstNode) {
		switch (rule.name.toUpperCase()) {
			case "LINK_LABEL": return input.substring(1).trim();
			default: return;
		}
	}
};
var WardleyModule = { parser: { ValueConverter: /* @__PURE__ */ __name(() => new WardleyValueConverter(), "ValueConverter") } };
function createWardleyServices(context = EmptyFileSystem) {
	const shared = inject(createDefaultSharedCoreModule(context), MermaidGeneratedSharedModule);
	const Wardley = inject(createDefaultCoreModule({ shared }), WardleyGrammarGeneratedModule, WardleyModule);
	shared.ServiceRegistry.register(Wardley);
	return {
		shared,
		Wardley
	};
}
__name(createWardleyServices, "createWardleyServices");
export { createWardleyServices as n, WardleyModule as t };
