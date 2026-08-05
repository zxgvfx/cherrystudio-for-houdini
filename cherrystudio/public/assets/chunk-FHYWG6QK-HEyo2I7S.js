import { _ as createDefaultCoreModule, a as EmptyFileSystem, f as RadarGrammarGeneratedModule, g as __name, i as CommonValueConverter, l as MermaidGeneratedSharedModule, t as AbstractMermaidTokenBuilder, v as createDefaultSharedCoreModule, y as inject } from "./chunk-NNHCCRGN-DlfmgQ0M.js";
var RadarTokenBuilder = class extends AbstractMermaidTokenBuilder {
	static {
		__name(this, "RadarTokenBuilder");
	}
	constructor() {
		super(["radar-beta"]);
	}
};
var RadarModule = { parser: {
	TokenBuilder: /* @__PURE__ */ __name(() => new RadarTokenBuilder(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ __name(() => new CommonValueConverter(), "ValueConverter")
} };
function createRadarServices(context = EmptyFileSystem) {
	const shared = inject(createDefaultSharedCoreModule(context), MermaidGeneratedSharedModule);
	const Radar = inject(createDefaultCoreModule({ shared }), RadarGrammarGeneratedModule, RadarModule);
	shared.ServiceRegistry.register(Radar);
	return {
		shared,
		Radar
	};
}
__name(createRadarServices, "createRadarServices");
export { createRadarServices as n, RadarModule as t };
