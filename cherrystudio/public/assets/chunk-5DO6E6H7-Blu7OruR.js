import { _ as createDefaultCoreModule, a as EmptyFileSystem, c as InfoGrammarGeneratedModule, g as __name, i as CommonValueConverter, l as MermaidGeneratedSharedModule, t as AbstractMermaidTokenBuilder, v as createDefaultSharedCoreModule, y as inject } from "./chunk-NNHCCRGN-DlfmgQ0M.js";
var InfoTokenBuilder = class extends AbstractMermaidTokenBuilder {
	static {
		__name(this, "InfoTokenBuilder");
	}
	constructor() {
		super(["info", "showInfo"]);
	}
};
var InfoModule = { parser: {
	TokenBuilder: /* @__PURE__ */ __name(() => new InfoTokenBuilder(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ __name(() => new CommonValueConverter(), "ValueConverter")
} };
function createInfoServices(context = EmptyFileSystem) {
	const shared = inject(createDefaultSharedCoreModule(context), MermaidGeneratedSharedModule);
	const Info = inject(createDefaultCoreModule({ shared }), InfoGrammarGeneratedModule, InfoModule);
	shared.ServiceRegistry.register(Info);
	return {
		shared,
		Info
	};
}
__name(createInfoServices, "createInfoServices");
export { createInfoServices as n, InfoModule as t };
