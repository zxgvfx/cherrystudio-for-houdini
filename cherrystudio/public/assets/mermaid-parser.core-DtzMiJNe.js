const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./info-NVLQJR56-NuFZqLlI.js","./chunk-FPAJGGOC-DvczyXWu.js","./isEmpty-eU5w6VY6.js","./_baseFor-DGqm56vS.js","./reduce-CBXB-mBy.js","./flatten-BrMCaMvI.js","./chunk-0ogMdkZ1.js","./chunk-LBM3YZW2-BUKp2ZJ0.js","./packet-BFZMPI3H-BNxTxQ7y.js","./chunk-76Q3JFCE-DHvbyQHi.js","./pie-7BOR55EZ-CQoDvcEi.js","./chunk-T53DSG4Q-B9vFiDId.js","./architecture-U656AL7Q-Dx5YxNXq.js","./chunk-O7ZBX7Z2-CuHT8urv.js","./gitGraph-F6HP7TQM-DgcMuHF_.js","./chunk-S6J4BHB3-BJu2Ty5i.js","./radar-NHE76QYJ-B270FaMQ.js","./chunk-LHMN2FUI-J_x19aou.js","./treemap-KMMF4GRG-CPm3eZq7.js","./chunk-FWNWRKHM--srwD8Tv.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-DPod9cAG.js";
import { f as __name } from "./chunk-FPAJGGOC-DvczyXWu.js";
var parsers = {};
var initializers = {
	info: /* @__PURE__ */ __name(async () => {
		const { createInfoServices: createInfoServices2 } = await __vitePreload(async () => {
			const { createInfoServices: createInfoServices2$1 } = await import("./info-NVLQJR56-NuFZqLlI.js");
			return { createInfoServices: createInfoServices2$1 };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url);
		parsers.info = createInfoServices2().Info.parser.LangiumParser;
	}, "info"),
	packet: /* @__PURE__ */ __name(async () => {
		const { createPacketServices: createPacketServices2 } = await __vitePreload(async () => {
			const { createPacketServices: createPacketServices2$1 } = await import("./packet-BFZMPI3H-BNxTxQ7y.js");
			return { createPacketServices: createPacketServices2$1 };
		}, __vite__mapDeps([8,1,2,3,4,5,6,9]), import.meta.url);
		parsers.packet = createPacketServices2().Packet.parser.LangiumParser;
	}, "packet"),
	pie: /* @__PURE__ */ __name(async () => {
		const { createPieServices: createPieServices2 } = await __vitePreload(async () => {
			const { createPieServices: createPieServices2$1 } = await import("./pie-7BOR55EZ-CQoDvcEi.js");
			return { createPieServices: createPieServices2$1 };
		}, __vite__mapDeps([10,1,2,3,4,5,6,11]), import.meta.url);
		parsers.pie = createPieServices2().Pie.parser.LangiumParser;
	}, "pie"),
	architecture: /* @__PURE__ */ __name(async () => {
		const { createArchitectureServices: createArchitectureServices2 } = await __vitePreload(async () => {
			const { createArchitectureServices: createArchitectureServices2$1 } = await import("./architecture-U656AL7Q-Dx5YxNXq.js");
			return { createArchitectureServices: createArchitectureServices2$1 };
		}, __vite__mapDeps([12,1,2,3,4,5,6,13]), import.meta.url);
		parsers.architecture = createArchitectureServices2().Architecture.parser.LangiumParser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ __name(async () => {
		const { createGitGraphServices: createGitGraphServices2 } = await __vitePreload(async () => {
			const { createGitGraphServices: createGitGraphServices2$1 } = await import("./gitGraph-F6HP7TQM-DgcMuHF_.js");
			return { createGitGraphServices: createGitGraphServices2$1 };
		}, __vite__mapDeps([14,1,2,3,4,5,6,15]), import.meta.url);
		parsers.gitGraph = createGitGraphServices2().GitGraph.parser.LangiumParser;
	}, "gitGraph"),
	radar: /* @__PURE__ */ __name(async () => {
		const { createRadarServices: createRadarServices2 } = await __vitePreload(async () => {
			const { createRadarServices: createRadarServices2$1 } = await import("./radar-NHE76QYJ-B270FaMQ.js");
			return { createRadarServices: createRadarServices2$1 };
		}, __vite__mapDeps([16,1,2,3,4,5,6,17]), import.meta.url);
		parsers.radar = createRadarServices2().Radar.parser.LangiumParser;
	}, "radar"),
	treemap: /* @__PURE__ */ __name(async () => {
		const { createTreemapServices: createTreemapServices2 } = await __vitePreload(async () => {
			const { createTreemapServices: createTreemapServices2$1 } = await import("./treemap-KMMF4GRG-CPm3eZq7.js");
			return { createTreemapServices: createTreemapServices2$1 };
		}, __vite__mapDeps([18,1,2,3,4,5,6,19]), import.meta.url);
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
		const lexerErrors = result.lexerErrors.map((err) => err.message).join("\n");
		const parserErrors = result.parserErrors.map((err) => err.message).join("\n");
		super(`Parsing failed: ${lexerErrors} ${parserErrors}`);
		this.result = result;
	}
	static {
		__name(this, "MermaidParseError");
	}
};
export { parse as t };
