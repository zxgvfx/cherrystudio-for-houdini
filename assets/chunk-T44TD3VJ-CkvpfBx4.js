import { b as AbstractMermaidTokenBuilder, e as CommonValueConverter, g as InfoGeneratedModule, h as MermaidGeneratedSharedModule, m as __name, n as EmptyFileSystem, o as inject, p as createDefaultCoreModule, q as createDefaultSharedCoreModule } from "./chunk-4KMFLZZN-BcL2o9x-.js";
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
	const Info = inject(createDefaultCoreModule({ shared }), InfoGeneratedModule, InfoModule);
	shared.ServiceRegistry.register(Info);
	return {
		shared,
		Info
	};
}
__name(createInfoServices, "createInfoServices");
export { InfoModule as b, createInfoServices as c };
