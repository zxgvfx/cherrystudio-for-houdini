const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./info-J43DQDTF-B8vo-sYl.js","./chunk-5DO6E6H7-Blu7OruR.js","./chunk-NNHCCRGN-DlfmgQ0M.js","./packet-YPE3B663-BiYRIl1r.js","./chunk-MPE355IW-7KX47i8t.js","./pie-LRSECV5Y-DC5OqANY.js","./chunk-MZUSXYTE-DZhn1Odl.js","./treeView-BLDUP644-BG9nPsKm.js","./chunk-WCWK7LTN-Cy7SKvjY.js","./architecture-7EHR7CIX-m0atwD0Q.js","./chunk-4EGX6M5U-CzQvcJju.js","./gitGraph-WXDBUCRP-DOHXZGPq.js","./chunk-UIBZB4QT-D-OF3sF8.js","./eventmodeling-FCH6USID-AzwBP85n.js","./chunk-N66VUXT2-BZyJeq2E.js","./radar-GUYGQ44K-6W3wNEYr.js","./chunk-FHYWG6QK-HEyo2I7S.js","./treemap-LRROVOQU-CpoHuzZL.js","./chunk-BR22UD5L-BIHCZR_O.js","./wardley-L42UT6IY-BEpng1N3.js","./chunk-PUPMXCY4-CXW-l0at.js"])))=>i.map(i=>d[i]);
import { t as __vitePreload } from "./preload-helper-CnwuLMwE.js";
import { g as __name } from "./chunk-NNHCCRGN-DlfmgQ0M.js";
var parsers = {};
var initializers = {
	info: /* @__PURE__ */ __name(async () => {
		const { createInfoServices: createInfoServices2 } = await __vitePreload(async () => {
			const { createInfoServices: createInfoServices2$1 } = await import("./info-J43DQDTF-B8vo-sYl.js");
			return { createInfoServices: createInfoServices2$1 };
		}, __vite__mapDeps([0,1,2]), import.meta.url);
		parsers.info = createInfoServices2().Info.parser.LangiumParser;
	}, "info"),
	packet: /* @__PURE__ */ __name(async () => {
		const { createPacketServices: createPacketServices2 } = await __vitePreload(async () => {
			const { createPacketServices: createPacketServices2$1 } = await import("./packet-YPE3B663-BiYRIl1r.js");
			return { createPacketServices: createPacketServices2$1 };
		}, __vite__mapDeps([3,4,2]), import.meta.url);
		parsers.packet = createPacketServices2().Packet.parser.LangiumParser;
	}, "packet"),
	pie: /* @__PURE__ */ __name(async () => {
		const { createPieServices: createPieServices2 } = await __vitePreload(async () => {
			const { createPieServices: createPieServices2$1 } = await import("./pie-LRSECV5Y-DC5OqANY.js");
			return { createPieServices: createPieServices2$1 };
		}, __vite__mapDeps([5,6,2]), import.meta.url);
		parsers.pie = createPieServices2().Pie.parser.LangiumParser;
	}, "pie"),
	treeView: /* @__PURE__ */ __name(async () => {
		const { createTreeViewServices: createTreeViewServices2 } = await __vitePreload(async () => {
			const { createTreeViewServices: createTreeViewServices2$1 } = await import("./treeView-BLDUP644-BG9nPsKm.js");
			return { createTreeViewServices: createTreeViewServices2$1 };
		}, __vite__mapDeps([7,2,8]), import.meta.url);
		parsers.treeView = createTreeViewServices2().TreeView.parser.LangiumParser;
	}, "treeView"),
	architecture: /* @__PURE__ */ __name(async () => {
		const { createArchitectureServices: createArchitectureServices2 } = await __vitePreload(async () => {
			const { createArchitectureServices: createArchitectureServices2$1 } = await import("./architecture-7EHR7CIX-m0atwD0Q.js");
			return { createArchitectureServices: createArchitectureServices2$1 };
		}, __vite__mapDeps([9,10,2]), import.meta.url);
		parsers.architecture = createArchitectureServices2().Architecture.parser.LangiumParser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ __name(async () => {
		const { createGitGraphServices: createGitGraphServices2 } = await __vitePreload(async () => {
			const { createGitGraphServices: createGitGraphServices2$1 } = await import("./gitGraph-WXDBUCRP-DOHXZGPq.js");
			return { createGitGraphServices: createGitGraphServices2$1 };
		}, __vite__mapDeps([11,2,12]), import.meta.url);
		parsers.gitGraph = createGitGraphServices2().GitGraph.parser.LangiumParser;
	}, "gitGraph"),
	eventmodeling: /* @__PURE__ */ __name(async () => {
		const { createEventModelingServices: createEventModelingServices2 } = await __vitePreload(async () => {
			const { createEventModelingServices: createEventModelingServices2$1 } = await import("./eventmodeling-FCH6USID-AzwBP85n.js");
			return { createEventModelingServices: createEventModelingServices2$1 };
		}, __vite__mapDeps([13,14,2]), import.meta.url);
		parsers.eventmodeling = createEventModelingServices2().EventModel.parser.LangiumParser;
	}, "eventmodeling"),
	radar: /* @__PURE__ */ __name(async () => {
		const { createRadarServices: createRadarServices2 } = await __vitePreload(async () => {
			const { createRadarServices: createRadarServices2$1 } = await import("./radar-GUYGQ44K-6W3wNEYr.js");
			return { createRadarServices: createRadarServices2$1 };
		}, __vite__mapDeps([15,16,2]), import.meta.url);
		parsers.radar = createRadarServices2().Radar.parser.LangiumParser;
	}, "radar"),
	treemap: /* @__PURE__ */ __name(async () => {
		const { createTreemapServices: createTreemapServices2 } = await __vitePreload(async () => {
			const { createTreemapServices: createTreemapServices2$1 } = await import("./treemap-LRROVOQU-CpoHuzZL.js");
			return { createTreemapServices: createTreemapServices2$1 };
		}, __vite__mapDeps([17,18,2]), import.meta.url);
		parsers.treemap = createTreemapServices2().Treemap.parser.LangiumParser;
	}, "treemap"),
	wardley: /* @__PURE__ */ __name(async () => {
		const { createWardleyServices: createWardleyServices2 } = await __vitePreload(async () => {
			const { createWardleyServices: createWardleyServices2$1 } = await import("./wardley-L42UT6IY-BEpng1N3.js");
			return { createWardleyServices: createWardleyServices2$1 };
		}, __vite__mapDeps([19,2,20]), import.meta.url);
		parsers.wardley = createWardleyServices2().Wardley.parser.LangiumParser;
	}, "wardley")
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
