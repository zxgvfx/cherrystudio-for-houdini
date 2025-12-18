const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./info-63CPKGFF-JcL5nSuv.js","./chunk-4KMFLZZN-d4WN8BMK.js","./isEmpty-4inQ9Rdd.js","./isArrayLikeObject-C0fnS-tW.js","./_baseUniq-DL66X10H.js","./_basePickBy-CmFGsbDd.js","./clone-CRrzn8ol.js","./chunk-st2fFX3F.js","./chunk-T44TD3VJ-DoNF6TMr.js","./packet-HUATNLJX-Dul5ASXN.js","./chunk-KMC2YHZD-B7XF2wIc.js","./pie-WTHONI2E-CDQKnK82.js","./chunk-WFWHJNB7-DAE1VoV0.js","./architecture-O4VJ6CD3-sJC90eX4.js","./chunk-JEIROHC2-Bp__XGMm.js","./gitGraph-ZV4HHKMB-DMSHYiH8.js","./chunk-BN7GFLIU-B23KORSM.js","./radar-NJJJXTRR-DljhWlaS.js","./chunk-WFRQ32O7-BAry2yLS.js","./treemap-75Q7IDZK-Bl-g84_6.js","./chunk-XRWGC2XP-BtBBws6I.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-BMYLnTBu.js";
import { m as __name } from "./chunk-4KMFLZZN-d4WN8BMK.js";
var parsers = {};
var initializers = {
	info: /* @__PURE__ */ __name(async () => {
		const { createInfoServices: createInfoServices2 } = await __vitePreload(async () => {
			const { createInfoServices: createInfoServices2$1 } = await import("./info-63CPKGFF-JcL5nSuv.js");
			return { createInfoServices: createInfoServices2$1 };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url);
		const parser = createInfoServices2().Info.parser.LangiumParser;
		parsers.info = parser;
	}, "info"),
	packet: /* @__PURE__ */ __name(async () => {
		const { createPacketServices: createPacketServices2 } = await __vitePreload(async () => {
			const { createPacketServices: createPacketServices2$1 } = await import("./packet-HUATNLJX-Dul5ASXN.js");
			return { createPacketServices: createPacketServices2$1 };
		}, __vite__mapDeps([9,1,2,3,4,5,6,7,10]), import.meta.url);
		const parser = createPacketServices2().Packet.parser.LangiumParser;
		parsers.packet = parser;
	}, "packet"),
	pie: /* @__PURE__ */ __name(async () => {
		const { createPieServices: createPieServices2 } = await __vitePreload(async () => {
			const { createPieServices: createPieServices2$1 } = await import("./pie-WTHONI2E-CDQKnK82.js");
			return { createPieServices: createPieServices2$1 };
		}, __vite__mapDeps([11,1,2,3,4,5,6,7,12]), import.meta.url);
		const parser = createPieServices2().Pie.parser.LangiumParser;
		parsers.pie = parser;
	}, "pie"),
	architecture: /* @__PURE__ */ __name(async () => {
		const { createArchitectureServices: createArchitectureServices2 } = await __vitePreload(async () => {
			const { createArchitectureServices: createArchitectureServices2$1 } = await import("./architecture-O4VJ6CD3-sJC90eX4.js");
			return { createArchitectureServices: createArchitectureServices2$1 };
		}, __vite__mapDeps([13,1,2,3,4,5,6,7,14]), import.meta.url);
		const parser = createArchitectureServices2().Architecture.parser.LangiumParser;
		parsers.architecture = parser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ __name(async () => {
		const { createGitGraphServices: createGitGraphServices2 } = await __vitePreload(async () => {
			const { createGitGraphServices: createGitGraphServices2$1 } = await import("./gitGraph-ZV4HHKMB-DMSHYiH8.js");
			return { createGitGraphServices: createGitGraphServices2$1 };
		}, __vite__mapDeps([15,1,2,3,4,5,6,7,16]), import.meta.url);
		const parser = createGitGraphServices2().GitGraph.parser.LangiumParser;
		parsers.gitGraph = parser;
	}, "gitGraph"),
	radar: /* @__PURE__ */ __name(async () => {
		const { createRadarServices: createRadarServices2 } = await __vitePreload(async () => {
			const { createRadarServices: createRadarServices2$1 } = await import("./radar-NJJJXTRR-DljhWlaS.js");
			return { createRadarServices: createRadarServices2$1 };
		}, __vite__mapDeps([17,1,2,3,4,5,6,7,18]), import.meta.url);
		const parser = createRadarServices2().Radar.parser.LangiumParser;
		parsers.radar = parser;
	}, "radar"),
	treemap: /* @__PURE__ */ __name(async () => {
		const { createTreemapServices: createTreemapServices2 } = await __vitePreload(async () => {
			const { createTreemapServices: createTreemapServices2$1 } = await import("./treemap-75Q7IDZK-Bl-g84_6.js");
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
