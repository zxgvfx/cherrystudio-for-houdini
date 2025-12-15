import { b as AbstractMermaidTokenBuilder, e as CommonValueConverter, h as MermaidGeneratedSharedModule, k as RadarGeneratedModule, m as __name, n as EmptyFileSystem, o as inject, p as createDefaultCoreModule, q as createDefaultSharedCoreModule } from "./chunk-4KMFLZZN-H5c2MWuL.js";
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
	const Radar = inject(createDefaultCoreModule({ shared }), RadarGeneratedModule, RadarModule);
	shared.ServiceRegistry.register(Radar);
	return {
		shared,
		Radar
	};
}
__name(createRadarServices, "createRadarServices");
export { RadarModule as b, createRadarServices as c };
