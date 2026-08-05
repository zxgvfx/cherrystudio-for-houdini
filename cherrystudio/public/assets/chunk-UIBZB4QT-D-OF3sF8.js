import { _ as createDefaultCoreModule, a as EmptyFileSystem, g as __name, i as CommonValueConverter, l as MermaidGeneratedSharedModule, s as GitGraphGrammarGeneratedModule, t as AbstractMermaidTokenBuilder, v as createDefaultSharedCoreModule, y as inject } from "./chunk-NNHCCRGN-DlfmgQ0M.js";
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
	const GitGraph = inject(createDefaultCoreModule({ shared }), GitGraphGrammarGeneratedModule, GitGraphModule);
	shared.ServiceRegistry.register(GitGraph);
	return {
		shared,
		GitGraph
	};
}
__name(createGitGraphServices, "createGitGraphServices");
export { createGitGraphServices as n, GitGraphModule as t };
