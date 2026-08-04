const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./info-NVLQJR56-OyWSmbt2.js","./chunk-FPAJGGOC-BtMvJbgL.js","./isEmpty--rBKRpEP.js","./_baseFor-DopXmZGg.js","./reduce-DInMMjMx.js","./flatten-B4cSGI4x.js","./chunk-0ogMdkZ1.js","./chunk-LBM3YZW2-pSi-f3Si.js","./packet-BFZMPI3H-BCOG6_9p.js","./chunk-76Q3JFCE-Dk7LUwjx.js","./pie-7BOR55EZ-BnedZKVU.js","./chunk-T53DSG4Q-B3UNx8uO.js","./architecture-U656AL7Q-WiqrauJt.js","./chunk-O7ZBX7Z2-BJ__apzz.js","./gitGraph-F6HP7TQM-DHk2wZY0.js","./chunk-S6J4BHB3-JJsuHHti.js","./radar-NHE76QYJ-DA2FAGcV.js","./chunk-LHMN2FUI-VMvEbgo7.js","./treemap-KMMF4GRG-CMHHmkeF.js","./chunk-FWNWRKHM-CvgaY0Oc.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-BO1u-67e.js";
import { f as __name } from "./chunk-FPAJGGOC-BtMvJbgL.js";
var parsers = {};
var initializers = {
	info: /* @__PURE__ */ __name(async () => {
		const { createInfoServices: createInfoServices2 } = await __vitePreload(async () => {
			const { createInfoServices: createInfoServices2$1 } = await import("./info-NVLQJR56-OyWSmbt2.js");
			return { createInfoServices: createInfoServices2$1 };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url);
		parsers.info = createInfoServices2().Info.parser.LangiumParser;
	}, "info"),
	packet: /* @__PURE__ */ __name(async () => {
		const { createPacketServices: createPacketServices2 } = await __vitePreload(async () => {
			const { createPacketServices: createPacketServices2$1 } = await import("./packet-BFZMPI3H-BCOG6_9p.js");
			return { createPacketServices: createPacketServices2$1 };
		}, __vite__mapDeps([8,1,2,3,4,5,6,9]), import.meta.url);
		parsers.packet = createPacketServices2().Packet.parser.LangiumParser;
	}, "packet"),
	pie: /* @__PURE__ */ __name(async () => {
		const { createPieServices: createPieServices2 } = await __vitePreload(async () => {
			const { createPieServices: createPieServices2$1 } = await import("./pie-7BOR55EZ-BnedZKVU.js");
			return { createPieServices: createPieServices2$1 };
		}, __vite__mapDeps([10,1,2,3,4,5,6,11]), import.meta.url);
		parsers.pie = createPieServices2().Pie.parser.LangiumParser;
	}, "pie"),
	architecture: /* @__PURE__ */ __name(async () => {
		const { createArchitectureServices: createArchitectureServices2 } = await __vitePreload(async () => {
			const { createArchitectureServices: createArchitectureServices2$1 } = await import("./architecture-U656AL7Q-WiqrauJt.js");
			return { createArchitectureServices: createArchitectureServices2$1 };
		}, __vite__mapDeps([12,1,2,3,4,5,6,13]), import.meta.url);
		parsers.architecture = createArchitectureServices2().Architecture.parser.LangiumParser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ __name(async () => {
		const { createGitGraphServices: createGitGraphServices2 } = await __vitePreload(async () => {
			const { createGitGraphServices: createGitGraphServices2$1 } = await import("./gitGraph-F6HP7TQM-DHk2wZY0.js");
			return { createGitGraphServices: createGitGraphServices2$1 };
		}, __vite__mapDeps([14,1,2,3,4,5,6,15]), import.meta.url);
		parsers.gitGraph = createGitGraphServices2().GitGraph.parser.LangiumParser;
	}, "gitGraph"),
	radar: /* @__PURE__ */ __name(async () => {
		const { createRadarServices: createRadarServices2 } = await __vitePreload(async () => {
			const { createRadarServices: createRadarServices2$1 } = await import("./radar-NHE76QYJ-DA2FAGcV.js");
			return { createRadarServices: createRadarServices2$1 };
		}, __vite__mapDeps([16,1,2,3,4,5,6,17]), import.meta.url);
		parsers.radar = createRadarServices2().Radar.parser.LangiumParser;
	}, "radar"),
	treemap: /* @__PURE__ */ __name(async () => {
		const { createTreemapServices: createTreemapServices2 } = await __vitePreload(async () => {
			const { createTreemapServices: createTreemapServices2$1 } = await import("./treemap-KMMF4GRG-CMHHmkeF.js");
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
