const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./info-3K5VOQVL-Dkla0YJe.js","./chunk-XZSTWKYB-Djd3rlms.js","./isEmpty-DtG0CncE.js","./_createAssigner-BlLJQMNU.js","./_baseUniq-D-KJerXB.js","./_basePickBy-CU0oN7Qu.js","./clone-D7t6gmTx.js","./chunk-DiqNceaa.js","./chunk-EGIJ26TM-B2Vcdpj7.js","./packet-RMMSAZCW-BXu0yraT.js","./chunk-C72U2L5F-DogCHhJ-.js","./pie-UPGHQEXC-DiN43S_L.js","./chunk-XIRO2GV7-BON3fzSY.js","./architecture-PBZL5I3N-ClbPlYEQ.js","./chunk-R5LLSJPH-DXHmvl68.js","./gitGraph-HDMCJU4V-czbBBgPS.js","./chunk-7E7YKBS2-BZ3D0bF-.js","./radar-KQ55EAFF-B2G-CDGG.js","./chunk-L3YUKLVL-CdOAUgCJ.js","./treemap-KZPCXAKY-D0iH9gGJ.js","./chunk-OZEHJAEY-DTY9E4RQ.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import { f as __name } from "./chunk-XZSTWKYB-Djd3rlms.js";
var parsers = {};
var initializers = {
	info: /* @__PURE__ */ __name(async () => {
		const { createInfoServices: createInfoServices2 } = await __vitePreload(async () => {
			const { createInfoServices: createInfoServices2$1 } = await import("./info-3K5VOQVL-Dkla0YJe.js");
			return { createInfoServices: createInfoServices2$1 };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url);
		parsers.info = createInfoServices2().Info.parser.LangiumParser;
	}, "info"),
	packet: /* @__PURE__ */ __name(async () => {
		const { createPacketServices: createPacketServices2 } = await __vitePreload(async () => {
			const { createPacketServices: createPacketServices2$1 } = await import("./packet-RMMSAZCW-BXu0yraT.js");
			return { createPacketServices: createPacketServices2$1 };
		}, __vite__mapDeps([9,1,2,3,4,5,6,7,10]), import.meta.url);
		parsers.packet = createPacketServices2().Packet.parser.LangiumParser;
	}, "packet"),
	pie: /* @__PURE__ */ __name(async () => {
		const { createPieServices: createPieServices2 } = await __vitePreload(async () => {
			const { createPieServices: createPieServices2$1 } = await import("./pie-UPGHQEXC-DiN43S_L.js");
			return { createPieServices: createPieServices2$1 };
		}, __vite__mapDeps([11,1,2,3,4,5,6,7,12]), import.meta.url);
		parsers.pie = createPieServices2().Pie.parser.LangiumParser;
	}, "pie"),
	architecture: /* @__PURE__ */ __name(async () => {
		const { createArchitectureServices: createArchitectureServices2 } = await __vitePreload(async () => {
			const { createArchitectureServices: createArchitectureServices2$1 } = await import("./architecture-PBZL5I3N-ClbPlYEQ.js");
			return { createArchitectureServices: createArchitectureServices2$1 };
		}, __vite__mapDeps([13,1,2,3,4,5,6,7,14]), import.meta.url);
		parsers.architecture = createArchitectureServices2().Architecture.parser.LangiumParser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ __name(async () => {
		const { createGitGraphServices: createGitGraphServices2 } = await __vitePreload(async () => {
			const { createGitGraphServices: createGitGraphServices2$1 } = await import("./gitGraph-HDMCJU4V-czbBBgPS.js");
			return { createGitGraphServices: createGitGraphServices2$1 };
		}, __vite__mapDeps([15,1,2,3,4,5,6,7,16]), import.meta.url);
		parsers.gitGraph = createGitGraphServices2().GitGraph.parser.LangiumParser;
	}, "gitGraph"),
	radar: /* @__PURE__ */ __name(async () => {
		const { createRadarServices: createRadarServices2 } = await __vitePreload(async () => {
			const { createRadarServices: createRadarServices2$1 } = await import("./radar-KQ55EAFF-B2G-CDGG.js");
			return { createRadarServices: createRadarServices2$1 };
		}, __vite__mapDeps([17,1,2,3,4,5,6,7,18]), import.meta.url);
		parsers.radar = createRadarServices2().Radar.parser.LangiumParser;
	}, "radar"),
	treemap: /* @__PURE__ */ __name(async () => {
		const { createTreemapServices: createTreemapServices2 } = await __vitePreload(async () => {
			const { createTreemapServices: createTreemapServices2$1 } = await import("./treemap-KZPCXAKY-D0iH9gGJ.js");
			return { createTreemapServices: createTreemapServices2$1 };
		}, __vite__mapDeps([19,1,2,3,4,5,6,7,20]), import.meta.url);
		parsers.treemap = createTreemapServices2().Treemap.parser.LangiumParser;
	}, "treemap")
};
async function parse(diagramType, text) {
	const initializer = initializers[diagramType];
	if (!initializer) throw new Error(`Unknown diagram type: ${diagramType}`);
	if (!parsers[diagramType]) await initializer();
	const result = parsers[diagramType].parse(text);
	if (result.lexerErrors.length > 0 || result.parserErrors.length > 0) throw new MermaidParseError(result);
	return result.value;
}
__name(parse, "parse");
var MermaidParseError = class extends Error {
	constructor(result) {
		const lexerErrors = result.lexerErrors.map((err) => {
			return `Lexer error on line ${err.line !== void 0 && !isNaN(err.line) ? err.line : "?"}, column ${err.column !== void 0 && !isNaN(err.column) ? err.column : "?"}: ${err.message}`;
		}).join("\n");
		const parserErrors = result.parserErrors.map((err) => {
			return `Parse error on line ${err.token.startLine !== void 0 && !isNaN(err.token.startLine) ? err.token.startLine : "?"}, column ${err.token.startColumn !== void 0 && !isNaN(err.token.startColumn) ? err.token.startColumn : "?"}: ${err.message}`;
		}).join("\n");
		super(`Parsing failed: ${lexerErrors} ${parserErrors}`);
		this.result = result;
	}
	static {
		__name(this, "MermaidParseError");
	}
};
export { parse as t };
