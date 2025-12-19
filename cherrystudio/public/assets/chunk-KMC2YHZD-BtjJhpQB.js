import { b as AbstractMermaidTokenBuilder, e as CommonValueConverter, h as MermaidGeneratedSharedModule, i as PacketGeneratedModule, m as __name, n as EmptyFileSystem, o as inject, p as createDefaultCoreModule, q as createDefaultSharedCoreModule } from "./chunk-4KMFLZZN-CNy9VpgZ.js";
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
	const Packet = inject(createDefaultCoreModule({ shared }), PacketGeneratedModule, PacketModule);
	shared.ServiceRegistry.register(Packet);
	return {
		shared,
		Packet
	};
}
__name(createPacketServices, "createPacketServices");
export { PacketModule as b, createPacketServices as c };
