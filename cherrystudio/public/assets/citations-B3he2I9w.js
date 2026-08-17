import { c as isKnowledgeCitation, l as isMemoryCitation, s as ReferenceCategory, u as isWebCitation } from "./message-B_yl0O_K.js";
import { o as isToolUIPart, r as getToolName } from "./dist-DmJhY6Jt.js";
import { C as isDeferredToolOutput, _ as kbSearchOutputSchema, b as webSearchOutputSchema, c as KB_SEARCH_TOOL_NAME, f as WEB_FETCH_TOOL_NAME, h as kbReadOutputSchema, i as CITATION_SNIPPET_MAX_CHARS, m as kbGrepOutputSchema, p as WEB_SEARCH_TOOL_NAME, r as normalizeToolOutputResponse, s as KB_READ_TOOL_NAME, t as extractOutputMetadata } from "./toolOutput-CFeNIV-2.js";
import { a as readCherryMeta } from "./uiParts-D7jaMraw.js";
import { t as cleanMarkdownContent } from "./formats-CgjOOl9i.js";
import { a as normalizeCitationMarks, c as WEB_SEARCH_SOURCE, i as mapMarkdownOutsideCode, r as mapCitationMarksToTags } from "./citation-Njzn5Mjh.js";
import { n as parseFunctionCallToolName } from "./mcpToolName-DmIzMwU1.js";
function isPersistedToolOutput(value) {
	if (typeof value !== "object" || value === null) return false;
	const ref = value.$persistedToolOutput;
	return typeof ref === "object" && ref !== null;
}
function blobRefsOf(ref) {
	if (ref.shape === "entities") return ref.blobRefs;
	const { fileEntryId, vfsFilename, head, tail, totalChars, totalLines } = ref;
	return [{
		key: "",
		fileEntryId,
		vfsFilename,
		head,
		tail,
		totalChars,
		totalLines
	}];
}
function envelopeDisplayExcerpt(ref) {
	const blobs = blobRefsOf(ref);
	return {
		head: blobs[0].head,
		tail: blobs[blobs.length - 1].tail,
		totalChars: blobs.reduce((sum, b) => sum + b.totalChars, 0),
		totalLines: blobs.reduce((sum, b) => sum + b.totalLines, 0)
	};
}
function convertReferencesToCitationReferences(references, blockId) {
	const citations = references.filter((ref) => ref.category === ReferenceCategory.CITATION);
	if (citations.length === 0) return void 0;
	return citations.map((ref) => ({
		citationBlockId: blockId,
		citationBlockSource: isWebCitation(ref) ? ref.content?.source ?? void 0 : void 0
	}));
}
function toHostOrUrl$1(url) {
	try {
		return new URL(url).hostname;
	} catch {
		return url;
	}
}
function extractOpenRouterContent(entry) {
	if (!entry.providerMetadata || typeof entry.providerMetadata !== "object") return void 0;
	const providerMetadata = entry.providerMetadata;
	if (!providerMetadata.openrouter || typeof providerMetadata.openrouter !== "object") return void 0;
	const openrouterMeta = providerMetadata.openrouter;
	return typeof openrouterMeta.content === "string" ? openrouterMeta.content : void 0;
}
function readExplicitCitationNumber(entry) {
	const value = entry.number;
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}
function normalizeWebResult(result) {
	if (typeof result === "string") return {
		number: 0,
		url: result,
		title: toHostOrUrl$1(result),
		showFavicon: true,
		type: "websearch"
	};
	if (!result || typeof result !== "object") return null;
	const entry = result;
	const openAiUrlCitation = entry.url_citation && typeof entry.url_citation === "object" ? entry.url_citation : void 0;
	const webEntry = entry.web && typeof entry.web === "object" ? entry.web : void 0;
	const url = typeof entry.url === "string" && entry.url || typeof entry.link === "string" && entry.link || typeof openAiUrlCitation?.url === "string" && openAiUrlCitation.url || typeof webEntry?.uri === "string" && webEntry.uri || "";
	const title = typeof entry.title === "string" && entry.title || typeof openAiUrlCitation?.title === "string" && openAiUrlCitation.title || typeof webEntry?.title === "string" && webEntry.title || toHostOrUrl$1(url);
	const content = typeof entry.content === "string" && entry.content || extractOpenRouterContent(entry);
	if (!url && !title && !content) return null;
	return {
		number: readExplicitCitationNumber(entry),
		url,
		title,
		content,
		showFavicon: true,
		type: "websearch"
	};
}
function normalizeWebResults(results) {
	if (results && typeof results === "object" && Array.isArray(results.groundingChunks)) {
		const obj = results;
		const chunks = obj.groundingChunks;
		const groundingSupports = obj.groundingSupports && Array.isArray(obj.groundingSupports) ? obj.groundingSupports : void 0;
		return chunks.map((chunk, index) => {
			const web = chunk?.web && typeof chunk.web === "object" ? chunk.web : void 0;
			const url = typeof web?.uri === "string" ? web.uri : "";
			if (!url) return null;
			return {
				number: index + 1,
				url,
				title: typeof web?.title === "string" ? web.title : toHostOrUrl$1(url),
				showFavicon: true,
				type: "websearch",
				...groundingSupports ? { metadata: groundingSupports } : {}
			};
		}).filter(Boolean);
	}
	return (Array.isArray(results) ? results : results && typeof results === "object" && Array.isArray(results.results) ? results.results : []).map(normalizeWebResult).filter((c) => c !== null);
}
function assignMissingCitationNumbers(citations) {
	const assigned = new Set(citations.filter((citation) => citation.number > 0).map((citation) => citation.number));
	let nextNumber = 1;
	return citations.map((citation) => {
		if (citation.number > 0) return citation;
		while (assigned.has(nextNumber)) nextNumber += 1;
		assigned.add(nextNumber);
		return {
			...citation,
			number: nextNumber
		};
	});
}
function convertReferencesToCitations(references) {
	const all = [];
	for (const ref of references) {
		if (isWebCitation(ref)) {
			all.push(...normalizeWebResults(ref.content?.results));
			continue;
		}
		if (isKnowledgeCitation(ref)) {
			const knowledge = Array.isArray(ref.content) ? ref.content : [];
			const usedNumbers = new Set(all.filter((citation) => citation.number > 0).map((citation) => citation.number));
			all.push(...knowledge.map((item) => {
				const number = item.id > 0 && !usedNumbers.has(item.id) ? item.id : 0;
				if (number > 0) usedNumbers.add(number);
				const fileMatch = item.sourceUrl?.match(/\[(.*?)]\(http:\/\/file\/(.*?)\)/);
				return {
					number,
					url: fileMatch ? `http://file/${fileMatch[2]}` : item.sourceUrl || "",
					title: fileMatch ? fileMatch[1] : item.sourceUrl || "",
					content: item.content,
					showFavicon: true,
					type: "knowledge"
				};
			}));
			continue;
		}
		if (isMemoryCitation(ref)) {
			const memories = Array.isArray(ref.content) ? ref.content : [];
			all.push(...memories.map((item) => ({
				number: 0,
				url: "",
				title: `Memory ${item.hash?.slice(0, 8) || ""}`.trim(),
				content: item.memory,
				showFavicon: false,
				type: "memory"
			})));
		}
	}
	const urlSet = /* @__PURE__ */ new Set();
	return assignMissingCitationNumbers(all.filter((citation) => {
		if (citation.type === "knowledge" || citation.type === "memory") return true;
		if (!citation.url) return true;
		if (urlSet.has(citation.url)) return false;
		urlSet.add(citation.url);
		return true;
	}));
}
var EMPTY_MESSAGE_CITATIONS = {
	byId: /* @__PURE__ */ new Map(),
	byMarkerNumber: /* @__PURE__ */ new Map(),
	all: []
};
var CITABLE_TOOL_NAMES = new Set([
	WEB_SEARCH_TOOL_NAME,
	WEB_FETCH_TOOL_NAME,
	KB_SEARCH_TOOL_NAME,
	KB_READ_TOOL_NAME
]);
var CHERRY_TOOLS_MCP_SERVER = "cherry-tools";
var TOOL_INVOKE_TOOL_NAME = "tool_invoke";
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function toHostOrUrl(url) {
	try {
		return new URL(url).hostname;
	} catch {
		return url;
	}
}
function sourceIdToNumber(sourceId) {
	if (typeof sourceId !== "string") return void 0;
	const match = sourceId.match(/^citation-(\d+)$/);
	if (!match) return void 0;
	const value = Number(match[1]);
	return Number.isFinite(value) && value >= 0 ? value + 1 : void 0;
}
function resolveCitableToolName(part) {
	if (!isToolUIPart(part)) return null;
	const toolPart = part;
	if (toolPart.state !== "output-available") return null;
	const rawName = getToolName(toolPart);
	if (CITABLE_TOOL_NAMES.has(rawName)) {
		if (part.type !== "dynamic-tool") return rawName;
		const partMetadata = readCherryMeta(part)?.tool;
		const outputMetadata = extractOutputMetadata(toolPart.output).metadata;
		const belongsToCherryTools = (metadata) => metadata?.serverId === CHERRY_TOOLS_MCP_SERVER || metadata?.serverName === CHERRY_TOOLS_MCP_SERVER;
		return belongsToCherryTools(partMetadata) || belongsToCherryTools(outputMetadata) ? rawName : null;
	}
	if (rawName === TOOL_INVOKE_TOOL_NAME) {
		const input = toolPart.input;
		if (isRecord(input) && typeof input.name === "string" && CITABLE_TOOL_NAMES.has(input.name)) return input.name;
		return null;
	}
	const parsed = parseFunctionCallToolName(rawName);
	if (parsed && parsed.serverPart === CHERRY_TOOLS_MCP_SERVER && CITABLE_TOOL_NAMES.has(parsed.toolPart)) return parsed.toolPart;
	return null;
}
function unwrapCitableOutput(output) {
	if (isPersistedToolOutput(output)) {
		const ref = output.$persistedToolOutput;
		return ref.shape === "entities" ? ref.skeleton : output;
	}
	if (isDeferredToolOutput(output) && output.skeleton !== void 0) return output.skeleton;
	return output;
}
function toSnippet(content) {
	const trimmed = content.trim();
	if (trimmed.length <= 300) return trimmed;
	return `${trimmed.slice(0, 300)}…`;
}
function parseKbReadCitation(output) {
	const read = kbReadOutputSchema.safeParse(output);
	if (read.success) {
		const { id: id$1, baseId: baseId$1, conceptId: conceptId$1, title: title$1, content } = read.data;
		return id$1 ? {
			id: id$1,
			baseId: baseId$1,
			conceptId: conceptId$1,
			title: title$1,
			content: toSnippet(content)
		} : null;
	}
	const grep = kbGrepOutputSchema.safeParse(output);
	if (!grep.success) return null;
	const { id, baseId, conceptId, title, matches } = grep.data;
	if (!id || matches.length === 0) return null;
	return {
		id,
		baseId,
		conceptId,
		title,
		content: toSnippet(matches.map((match) => match.snippet).join(" … "))
	};
}
function documentKey(item) {
	if (!item.conceptId) return void 0;
	return `${item.baseId ?? ""}\u0000${item.conceptId}`;
}
function markerNumberOfId(id) {
	if (typeof id === "number") return id;
	const suffix = id.match(/(\d+)$/)?.[1];
	return suffix ? Number(suffix) : void 0;
}
function resolveMessageCitations(parts) {
	const byId = /* @__PURE__ */ new Map();
	const byMarkerNumber = /* @__PURE__ */ new Map();
	const all = [];
	const byUrl = /* @__PURE__ */ new Map();
	for (const part of parts) {
		if (part.type !== "source-url" || typeof part.url !== "string" || !part.url || byUrl.has(part.url)) continue;
		const number = sourceIdToNumber(part.sourceId) ?? all.length + 1;
		const citation = {
			number,
			url: part.url,
			title: part.title || toHostOrUrl(part.url),
			showFavicon: true,
			type: "websearch"
		};
		byId.set(String(number), citation);
		byMarkerNumber.set(number, citation);
		byUrl.set(part.url, citation);
		all.push(citation);
	}
	let nextNumber = all.reduce((max, citation) => Math.max(max, citation.number), 0) + 1;
	let lookupCallCount = 0;
	const toolMarkerCandidates = /* @__PURE__ */ new Map();
	const byDocument = /* @__PURE__ */ new Map();
	const addKnowledgeCitation = (item) => {
		const key = String(item.id);
		if (byId.has(key)) return;
		const document = documentKey(item);
		const existing = document ? byDocument.get(document) : void 0;
		if (existing) {
			byId.set(key, existing);
			return;
		}
		const citation = {
			number: nextNumber++,
			url: "",
			title: item.title || "",
			content: item.content,
			showFavicon: false,
			type: "knowledge"
		};
		byId.set(key, citation);
		if (document) byDocument.set(document, citation);
		all.push(citation);
		const markerNumber = markerNumberOfId(item.id);
		if (markerNumber !== void 0 && !toolMarkerCandidates.has(markerNumber)) toolMarkerCandidates.set(markerNumber, citation);
	};
	for (const part of parts) {
		const toolName = resolveCitableToolName(part);
		if (!toolName) continue;
		const rawOutput = unwrapCitableOutput(part.output);
		const output = normalizeToolOutputResponse(rawOutput);
		if (toolName === "kb_search") {
			const parsed$1 = kbSearchOutputSchema.safeParse(output);
			if (!parsed$1.success || parsed$1.data.length === 0) continue;
			lookupCallCount += 1;
			for (const item of parsed$1.data) addKnowledgeCitation(item);
			continue;
		}
		if (toolName === "kb_read") {
			const item = parseKbReadCitation(rawOutput) ?? parseKbReadCitation(output);
			if (!item) continue;
			lookupCallCount += 1;
			addKnowledgeCitation(item);
			continue;
		}
		const parsed = webSearchOutputSchema.safeParse(output);
		if (!parsed.success || parsed.data.length === 0) continue;
		lookupCallCount += 1;
		for (const item of parsed.data) {
			const key = String(item.id);
			if (byId.has(key)) continue;
			const existing = item.url ? byUrl.get(item.url) : void 0;
			if (existing) {
				byId.set(key, existing);
				continue;
			}
			const citation = {
				number: nextNumber++,
				url: item.url,
				title: item.title || toHostOrUrl(item.url),
				content: item.content,
				showFavicon: true,
				type: "websearch"
			};
			byId.set(key, citation);
			if (item.url) byUrl.set(item.url, citation);
			all.push(citation);
			const markerNumber = markerNumberOfId(item.id);
			if (markerNumber !== void 0 && !toolMarkerCandidates.has(markerNumber)) toolMarkerCandidates.set(markerNumber, citation);
		}
	}
	if (lookupCallCount === 1) {
		for (const [markerNumber, citation] of toolMarkerCandidates) if (!byMarkerNumber.has(markerNumber)) byMarkerNumber.set(markerNumber, citation);
	}
	if (all.length === 0) return EMPTY_MESSAGE_CITATIONS;
	return {
		byId,
		byMarkerNumber,
		all
	};
}
function createCitationLookup(citations) {
	const cleanCache = /* @__PURE__ */ new Map();
	const clean = (citation) => {
		const cached = cleanCache.get(citation);
		if (cached) return cached;
		const cleaned = citation.content ? {
			...citation,
			content: cleanMarkdownContent(citation.content)
		} : citation;
		cleanCache.set(citation, cleaned);
		return cleaned;
	};
	const markerNumberMap = /* @__PURE__ */ new Map();
	for (const [markerNumber, citation] of citations.byMarkerNumber) markerNumberMap.set(markerNumber, clean(citation));
	const lookup = /* @__PURE__ */ new Map();
	for (const [id, citation] of citations.byId) lookup.set(id, clean(citation));
	for (const [markerNumber, citation] of markerNumberMap) {
		const key = String(markerNumber);
		if (!lookup.has(key)) lookup.set(key, citation);
	}
	return {
		lookup,
		markerNumberMap
	};
}
function normalizeMarkerContent(content, markerNumberMap) {
	return markerNumberMap.size > 0 ? normalizeCitationMarks(content, markerNumberMap, WEB_SEARCH_SOURCE.AISDK) : content;
}
function collapseMarkerRuns(text, byMarker) {
	return text.replace(/\[cite:[\w-]+\](?:[ \t]*\[cite:[\w-]+\])+/g, (run) => {
		const seen = /* @__PURE__ */ new Set();
		const kept = [];
		for (const match of run.matchAll(/\[cite:([\w-]+)\]/g)) {
			const citation = byMarker.get(match[1]);
			if (citation && seen.has(citation)) continue;
			if (citation) seen.add(citation);
			kept.push(match[0]);
		}
		return kept.join("");
	});
}
function resolveCitationMarkerParts(contents, citations) {
	if (citations.byId.size === 0) return contents.map((content) => ({
		content,
		byMarker: /* @__PURE__ */ new Map(),
		cited: []
	}));
	const { lookup, markerNumberMap } = createCitationLookup(citations);
	const displayed = /* @__PURE__ */ new Map();
	let nextDisplayNumber = 1;
	return contents.map((content) => {
		const byMarker = /* @__PURE__ */ new Map();
		const cited = [];
		const seenInPart = /* @__PURE__ */ new Set();
		return {
			content: mapMarkdownOutsideCode(normalizeMarkerContent(content, markerNumberMap), (text) => {
				for (const match of text.matchAll(/\[cite:([\w-]+)\]/g)) {
					const citation = lookup.get(match[1]);
					if (!citation) continue;
					let display = displayed.get(citation);
					if (!display) {
						display = {
							...citation,
							number: nextDisplayNumber++
						};
						displayed.set(citation, display);
					}
					byMarker.set(match[1], display);
					if (!seenInPart.has(display)) {
						seenInPart.add(display);
						cited.push(display);
					}
				}
				return collapseMarkerRuns(text, byMarker);
			}),
			byMarker,
			cited
		};
	});
}
function resolveCitationMarkers(content, citations) {
	return resolveCitationMarkerParts([content], citations)[0];
}
var CITATION_MARKER_PATTERN = /([ \t]?)\[cite:([\w-]+)\]/g;
function toExportableCitations(content, parts) {
	const { content: resolved, byMarker, cited } = resolveCitationMarkers(content, resolveMessageCitations(parts));
	return {
		content: mapMarkdownOutsideCode(resolved, (text) => text.replace(CITATION_MARKER_PATTERN, (_match, space, id) => {
			const citation = byMarker.get(id);
			return citation ? `${space}[${citation.number}]` : "";
		})),
		cited
	};
}
function stripCitationMarkers(content) {
	return mapMarkdownOutsideCode(content, (text) => text.replace(CITATION_MARKER_PATTERN, ""));
}
function withToolCitationTags(content, citations, displayByMarker) {
	let projection;
	if (displayByMarker) {
		const { markerNumberMap } = createCitationLookup(citations);
		const cited$1 = [];
		const seen = /* @__PURE__ */ new Set();
		projection = {
			content: mapMarkdownOutsideCode(normalizeMarkerContent(content, markerNumberMap), (text) => {
				for (const match of text.matchAll(/\[cite:([\w-]+)\]/g)) {
					const citation = displayByMarker.get(match[1]);
					if (citation && !seen.has(citation)) {
						seen.add(citation);
						cited$1.push(citation);
					}
				}
				return collapseMarkerRuns(text, displayByMarker);
			}),
			byMarker: new Map(displayByMarker),
			cited: cited$1
		};
	} else projection = resolveCitationMarkers(content, citations);
	const { content: resolved, byMarker, cited } = projection;
	return {
		content: mapCitationMarksToTags(resolved, byMarker),
		cited
	};
}
export { withToolCitationTags as a, envelopeDisplayExcerpt as c, toExportableCitations as i, isPersistedToolOutput as l, resolveMessageCitations as n, convertReferencesToCitationReferences as o, stripCitationMarkers as r, convertReferencesToCitations as s, resolveCitationMarkerParts as t };
