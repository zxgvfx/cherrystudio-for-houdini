import { _ as createDefaultCoreModule, a as EmptyFileSystem, g as __name, i as CommonValueConverter, l as MermaidGeneratedSharedModule, t as AbstractMermaidTokenBuilder, u as PacketGrammarGeneratedModule, v as createDefaultSharedCoreModule, y as inject } from "./chunk-NNHCCRGN-DlfmgQ0M.js";
var PacketTokenBuilder = class extends AbstractMermaidTokenBuilder {
	static {
		__name(this, "PacketTokenBuilder");
	}
	constructor() {
		super(["packet"]);
	}
};
var PacketModule = { parser: {
	TokenBuilder: /* @__PURE__ */ __name(() => new PacketTokenBuilder(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ __name(() => new CommonValueConverter(), "ValueConverter")
} };
function createPacketServices(context = EmptyFileSystem) {
	const shared = inject(createDefaultSharedCoreModule(context), MermaidGeneratedSharedModule);
	const Packet = inject(createDefaultCoreModule({ shared }), PacketGrammarGeneratedModule, PacketModule);
	shared.ServiceRegistry.register(Packet);
	return {
		shared,
		Packet
	};
}
__name(createPacketServices, "createPacketServices");
export { createPacketServices as n, PacketModule as t };
