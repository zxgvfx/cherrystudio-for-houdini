import { b as AbstractMermaidTokenBuilder, e as CommonValueConverter, f as GitGraphGeneratedModule, h as MermaidGeneratedSharedModule, m as __name, n as EmptyFileSystem, o as inject, p as createDefaultCoreModule, q as createDefaultSharedCoreModule } from "./chunk-4KMFLZZN-H5c2MWuL.js";
var GitGraphTokenBuilder = class extends AbstractMermaidTokenBuilder {
	static {
		__name(this, "GitGraphTokenBuilder");
	}
	constructor() {
		super(["gitGraph"]);
	}
};
var GitGraphModule = { parser: {
	TokenBuilder: /* @__PURE__ */ __name(() => new GitGraphTokenBuilder(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ __name(() => new CommonValueConverter(), "ValueConverter")
} };
function createGitGraphServices(context = EmptyFileSystem) {
	const shared = inject(createDefaultSharedCoreModule(context), MermaidGeneratedSharedModule);
	const GitGraph = inject(createDefaultCoreModule({ shared }), GitGraphGeneratedModule, GitGraphModule);
	shared.ServiceRegistry.register(GitGraph);
	return {
		shared,
		GitGraph
	};
}
__name(createGitGraphServices, "createGitGraphServices");
export { GitGraphModule as b, createGitGraphServices as c };
