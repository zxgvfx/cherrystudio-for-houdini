const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./info-63CPKGFF-lZ4Gc3jT.js","./chunk-4KMFLZZN-DKZVZAaH.js","./isEmpty-_Wq7Or9l.js","./isArrayLikeObject-B-RNrFRP.js","./_baseUniq-D4AXUGVn.js","./_basePickBy-DXmuZVX8.js","./clone-CBOXH742.js","./chunk-st2fFX3F.js","./chunk-T44TD3VJ-Cqa8HFrb.js","./packet-HUATNLJX-CIwuVP15.js","./chunk-KMC2YHZD-b0fWvrTD.js","./pie-WTHONI2E-Cy5-S_eT.js","./chunk-WFWHJNB7-By6BuQ-Q.js","./architecture-O4VJ6CD3-0Ya1Aqha.js","./chunk-JEIROHC2-BQNKaqiu.js","./gitGraph-ZV4HHKMB-CRk4H71W.js","./chunk-BN7GFLIU-taUHbwF1.js","./radar-NJJJXTRR-MVLaLu6P.js","./chunk-WFRQ32O7-BktnexHx.js","./treemap-75Q7IDZK-BEdakLCY.js","./chunk-XRWGC2XP-v0jB-lQ3.js"])))=>i.map(i=>d[i]);
import { b as __vitePreload } from "./preload-helper-tKu-GDMy.js";
import { m as __name } from "./chunk-4KMFLZZN-DKZVZAaH.js";
var parsers = {};
var initializers = {
	info: /* @__PURE__ */ __name(async () => {
		const { createInfoServices: createInfoServices2 } = await __vitePreload(async () => {
			const { createInfoServices: createInfoServices2$1 } = await import("./info-63CPKGFF-lZ4Gc3jT.js");
			return { createInfoServices: createInfoServices2$1 };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url);
		const parser = createInfoServices2().Info.parser.LangiumParser;
		parsers.info = parser;
	}, "info"),
	packet: /* @__PURE__ */ __name(async () => {
		const { createPacketServices: createPacketServices2 } = await __vitePreload(async () => {
			const { createPacketServices: createPacketServices2$1 } = await import("./packet-HUATNLJX-CIwuVP15.js");
			return { createPacketServices: createPacketServices2$1 };
		}, __vite__mapDeps([9,1,2,3,4,5,6,7,10]), import.meta.url);
		const parser = createPacketServices2().Packet.parser.LangiumParser;
		parsers.packet = parser;
	}, "packet"),
	pie: /* @__PURE__ */ __name(async () => {
		const { createPieServices: createPieServices2 } = await __vitePreload(async () => {
			const { createPieServices: createPieServices2$1 } = await import("./pie-WTHONI2E-Cy5-S_eT.js");
			return { createPieServices: createPieServices2$1 };
		}, __vite__mapDeps([11,1,2,3,4,5,6,7,12]), import.meta.url);
		const parser = createPieServices2().Pie.parser.LangiumParser;
		parsers.pie = parser;
	}, "pie"),
	architecture: /* @__PURE__ */ __name(async () => {
		const { createArchitectureServices: createArchitectureServices2 } = await __vitePreload(async () => {
			const { createArchitectureServices: createArchitectureServices2$1 } = await import("./architecture-O4VJ6CD3-0Ya1Aqha.js");
			return { createArchitectureServices: createArchitectureServices2$1 };
		}, __vite__mapDeps([13,1,2,3,4,5,6,7,14]), import.meta.url);
		const parser = createArchitectureServices2().Architecture.parser.LangiumParser;
		parsers.architecture = parser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ __name(async () => {
		const { createGitGraphServices: createGitGraphServices2 } = await __vitePreload(async () => {
			const { createGitGraphServices: createGitGraphServices2$1 } = await import("./gitGraph-ZV4HHKMB-CRk4H71W.js");
			return { createGitGraphServices: createGitGraphServices2$1 };
		}, __vite__mapDeps([15,1,2,3,4,5,6,7,16]), import.meta.url);
		const parser = createGitGraphServices2().GitGraph.parser.LangiumParser;
		parsers.gitGraph = parser;
	}, "gitGraph"),
	radar: /* @__PURE__ */ __name(async () => {
		const { createRadarServices: createRadarServices2 } = await __vitePreload(async () => {
			const { createRadarServices: createRadarServices2$1 } = await import("./radar-NJJJXTRR-MVLaLu6P.js");
			return { createRadarServices: createRadarServices2$1 };
		}, __vite__mapDeps([17,1,2,3,4,5,6,7,18]), import.meta.url);
		const parser = createRadarServices2().Radar.parser.LangiumParser;
		parsers.radar = parser;
	}, "radar"),
	treemap: /* @__PURE__ */ __name(async () => {
		const { createTreemapServices: createTreemapServices2 } = await __vitePreload(async () => {
			const { createTreemapServices: createTreemapServices2$1 } = await import("./treemap-75Q7IDZK-BEdakLCY.js");
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
