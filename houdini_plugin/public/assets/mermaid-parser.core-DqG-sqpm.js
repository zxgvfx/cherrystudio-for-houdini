const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./info-63CPKGFF-8lvpikPI.js","./chunk-4KMFLZZN-H5c2MWuL.js","./isEmpty-Bzxt9fVW.js","./isArrayLikeObject-CLvaVZ_f.js","./_baseUniq-a3tMHZXc.js","./_basePickBy-Dt92fzOT.js","./clone-Buqdp3zv.js","./chunk-st2fFX3F.js","./chunk-T44TD3VJ-CqwwR6x4.js","./packet-HUATNLJX-Crqzjdp0.js","./chunk-KMC2YHZD-Cj6Rhmf0.js","./pie-WTHONI2E-CbHIv2L4.js","./chunk-WFWHJNB7-DdJ7cZoc.js","./architecture-O4VJ6CD3-CNkt3j7I.js","./chunk-JEIROHC2-B3hRJD0k.js","./gitGraph-ZV4HHKMB-BP4RVRTv.js","./chunk-BN7GFLIU-C0dm2dKB.js","./radar-NJJJXTRR-CypiIAt9.js","./chunk-WFRQ32O7-n7uwfW50.js","./treemap-75Q7IDZK-jSeS8iqc.js","./chunk-XRWGC2XP-JsQNVmmO.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-tKu-GDMy.js";
import { m as __name } from "./chunk-4KMFLZZN-H5c2MWuL.js";
var parsers = {};
var initializers = {
	info: /* @__PURE__ */ __name(async () => {
		const { createInfoServices: createInfoServices2 } = await __vitePreload(async () => {
			const { createInfoServices: createInfoServices2$1 } = await import("./info-63CPKGFF-8lvpikPI.js");
			return { createInfoServices: createInfoServices2$1 };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url);
		const parser = createInfoServices2().Info.parser.LangiumParser;
		parsers.info = parser;
	}, "info"),
	packet: /* @__PURE__ */ __name(async () => {
		const { createPacketServices: createPacketServices2 } = await __vitePreload(async () => {
			const { createPacketServices: createPacketServices2$1 } = await import("./packet-HUATNLJX-Crqzjdp0.js");
			return { createPacketServices: createPacketServices2$1 };
		}, __vite__mapDeps([9,1,2,3,4,5,6,7,10]), import.meta.url);
		const parser = createPacketServices2().Packet.parser.LangiumParser;
		parsers.packet = parser;
	}, "packet"),
	pie: /* @__PURE__ */ __name(async () => {
		const { createPieServices: createPieServices2 } = await __vitePreload(async () => {
			const { createPieServices: createPieServices2$1 } = await import("./pie-WTHONI2E-CbHIv2L4.js");
			return { createPieServices: createPieServices2$1 };
		}, __vite__mapDeps([11,1,2,3,4,5,6,7,12]), import.meta.url);
		const parser = createPieServices2().Pie.parser.LangiumParser;
		parsers.pie = parser;
	}, "pie"),
	architecture: /* @__PURE__ */ __name(async () => {
		const { createArchitectureServices: createArchitectureServices2 } = await __vitePreload(async () => {
			const { createArchitectureServices: createArchitectureServices2$1 } = await import("./architecture-O4VJ6CD3-CNkt3j7I.js");
			return { createArchitectureServices: createArchitectureServices2$1 };
		}, __vite__mapDeps([13,1,2,3,4,5,6,7,14]), import.meta.url);
		const parser = createArchitectureServices2().Architecture.parser.LangiumParser;
		parsers.architecture = parser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ __name(async () => {
		const { createGitGraphServices: createGitGraphServices2 } = await __vitePreload(async () => {
			const { createGitGraphServices: createGitGraphServices2$1 } = await import("./gitGraph-ZV4HHKMB-BP4RVRTv.js");
			return { createGitGraphServices: createGitGraphServices2$1 };
		}, __vite__mapDeps([15,1,2,3,4,5,6,7,16]), import.meta.url);
		const parser = createGitGraphServices2().GitGraph.parser.LangiumParser;
		parsers.gitGraph = parser;
	}, "gitGraph"),
	radar: /* @__PURE__ */ __name(async () => {
		const { createRadarServices: createRadarServices2 } = await __vitePreload(async () => {
			const { createRadarServices: createRadarServices2$1 } = await import("./radar-NJJJXTRR-CypiIAt9.js");
			return { createRadarServices: createRadarServices2$1 };
		}, __vite__mapDeps([17,1,2,3,4,5,6,7,18]), import.meta.url);
		const parser = createRadarServices2().Radar.parser.LangiumParser;
		parsers.radar = parser;
	}, "radar"),
	treemap: /* @__PURE__ */ __name(async () => {
		const { createTreemapServices: createTreemapServices2 } = await __vitePreload(async () => {
			const { createTreemapServices: createTreemapServices2$1 } = await import("./treemap-75Q7IDZK-jSeS8iqc.js");
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
