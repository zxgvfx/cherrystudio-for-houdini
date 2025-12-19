const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./info-63CPKGFF-BflxYpYm.js","./chunk-4KMFLZZN-BcL2o9x-.js","./isEmpty-CpYFi3X3.js","./isArrayLikeObject-D_I98Q6J.js","./_baseUniq-D12b1s0I.js","./_basePickBy-DTFes8nm.js","./clone-DZVKG1__.js","./chunk-st2fFX3F.js","./chunk-T44TD3VJ-CkvpfBx4.js","./packet-HUATNLJX-gML_InR_.js","./chunk-KMC2YHZD-BdTcEzh7.js","./pie-WTHONI2E-BHtATFLd.js","./chunk-WFWHJNB7-B08LFvYM.js","./architecture-O4VJ6CD3-C4fUKq0l.js","./chunk-JEIROHC2-DwEynv_C.js","./gitGraph-ZV4HHKMB-BxbF1z81.js","./chunk-BN7GFLIU-D02Oc7bP.js","./radar-NJJJXTRR-Cu-sykAi.js","./chunk-WFRQ32O7-DOX0DzRb.js","./treemap-75Q7IDZK-BL8rl4W5.js","./chunk-XRWGC2XP-_3rH1249.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-B3513jP_.js";
import { m as __name } from "./chunk-4KMFLZZN-BcL2o9x-.js";
var parsers = {};
var initializers = {
	info: /* @__PURE__ */ __name(async () => {
		const { createInfoServices: createInfoServices2 } = await __vitePreload(async () => {
			const { createInfoServices: createInfoServices2$1 } = await import("./info-63CPKGFF-BflxYpYm.js");
			return { createInfoServices: createInfoServices2$1 };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url);
		const parser = createInfoServices2().Info.parser.LangiumParser;
		parsers.info = parser;
	}, "info"),
	packet: /* @__PURE__ */ __name(async () => {
		const { createPacketServices: createPacketServices2 } = await __vitePreload(async () => {
			const { createPacketServices: createPacketServices2$1 } = await import("./packet-HUATNLJX-gML_InR_.js");
			return { createPacketServices: createPacketServices2$1 };
		}, __vite__mapDeps([9,1,2,3,4,5,6,7,10]), import.meta.url);
		const parser = createPacketServices2().Packet.parser.LangiumParser;
		parsers.packet = parser;
	}, "packet"),
	pie: /* @__PURE__ */ __name(async () => {
		const { createPieServices: createPieServices2 } = await __vitePreload(async () => {
			const { createPieServices: createPieServices2$1 } = await import("./pie-WTHONI2E-BHtATFLd.js");
			return { createPieServices: createPieServices2$1 };
		}, __vite__mapDeps([11,1,2,3,4,5,6,7,12]), import.meta.url);
		const parser = createPieServices2().Pie.parser.LangiumParser;
		parsers.pie = parser;
	}, "pie"),
	architecture: /* @__PURE__ */ __name(async () => {
		const { createArchitectureServices: createArchitectureServices2 } = await __vitePreload(async () => {
			const { createArchitectureServices: createArchitectureServices2$1 } = await import("./architecture-O4VJ6CD3-C4fUKq0l.js");
			return { createArchitectureServices: createArchitectureServices2$1 };
		}, __vite__mapDeps([13,1,2,3,4,5,6,7,14]), import.meta.url);
		const parser = createArchitectureServices2().Architecture.parser.LangiumParser;
		parsers.architecture = parser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ __name(async () => {
		const { createGitGraphServices: createGitGraphServices2 } = await __vitePreload(async () => {
			const { createGitGraphServices: createGitGraphServices2$1 } = await import("./gitGraph-ZV4HHKMB-BxbF1z81.js");
			return { createGitGraphServices: createGitGraphServices2$1 };
		}, __vite__mapDeps([15,1,2,3,4,5,6,7,16]), import.meta.url);
		const parser = createGitGraphServices2().GitGraph.parser.LangiumParser;
		parsers.gitGraph = parser;
	}, "gitGraph"),
	radar: /* @__PURE__ */ __name(async () => {
		const { createRadarServices: createRadarServices2 } = await __vitePreload(async () => {
			const { createRadarServices: createRadarServices2$1 } = await import("./radar-NJJJXTRR-Cu-sykAi.js");
			return { createRadarServices: createRadarServices2$1 };
		}, __vite__mapDeps([17,1,2,3,4,5,6,7,18]), import.meta.url);
		const parser = createRadarServices2().Radar.parser.LangiumParser;
		parsers.radar = parser;
	}, "radar"),
	treemap: /* @__PURE__ */ __name(async () => {
		const { createTreemapServices: createTreemapServices2 } = await __vitePreload(async () => {
			const { createTreemapServices: createTreemapServices2$1 } = await import("./treemap-75Q7IDZK-BL8rl4W5.js");
			return { createTreemapServices: createTreemapServices2$1 };
		}, __vite__mapDeps([19,1,2,3,4,5,6,7,20]), import.meta.url);
		const parser = createTreemapServices2().Treemap.parser.LangiumParser;
		parsers.treemap = parser;
	}, "treemap")
};
async function parse(diagramType, text) {
	const initializer = initializers[diagramType];
	if (!initializer) throw new Error(`Unknown diagram type: ${diagramType}`);
	if (!parsers[diagramType]) await initializer();
	const parser = parsers[diagramType];
	const result = parser.parse(text);
	if (result.lexerErrors.length > 0 || result.parserErrors.length > 0) throw new MermaidParseError(result);
	return result.value;
}
__name(parse, "parse");
var MermaidParseError = class extends Error {
	constructor(result) {
		const lexerErrors = result.lexerErrors.map((err) => err.message).join("\n");
		const parserErrors = result.parserErrors.map((err) => err.message).join("\n");
		super(`Parsing failed: ${lexerErrors} ${parserErrors}`);
		this.result = result;
	}
	static {
		__name(this, "MermaidParseError");
	}
};
export { parse as b };
