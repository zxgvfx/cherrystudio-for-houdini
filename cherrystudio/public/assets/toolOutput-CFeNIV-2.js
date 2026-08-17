import { C as string, _ as object, a as array, g as number, n as _enum, o as boolean, w as union } from "./schemas-CV_EtlSZ.js";
import { i as isMcpContentBlock } from "./mcp-CN-pwFr9.js";
import { s as KnowledgeItemStatusSchema } from "./knowledge-Cnld5F6B.js";
function isDeferredToolOutput(value) {
	if (typeof value !== "object" || value === null) return false;
	const ref = value.$deferredToolResult;
	return typeof ref === "object" && ref !== null && typeof ref.topicId === "string" && !!ref.topicId && typeof ref.messageId === "string" && !!ref.messageId && typeof ref.toolCallId === "string" && !!ref.toolCallId;
}
function isHttpUrl(value) {
	try {
		const { protocol } = new URL(value);
		return protocol === "http:" || protocol === "https:";
	} catch {
		return false;
	}
}
const GENERATE_IMAGE_TOOL_NAME = "generate_image";
const generateImageOutputSchema = array(object({
	id: string().describe("File entry id of the generated image."),
	name: string().describe("File name of the generated image.")
}));
const CITATION_SNIPPET_MAX_CHARS = 300;
const KB_LIST_TOOL_NAME = "kb_list";
object({
	query: string().trim().min(1).max(200).optional().describe("List mode only: case-insensitive substring filter against the knowledge base name or source names such as filenames, URLs, and note titles."),
	groupId: string().trim().min(1).optional().describe("List mode only: restrict the result to a single knowledge base group. Omit to span all groups."),
	baseId: string().trim().min(1).optional().describe("Pass a base id (from a prior list-mode call) to switch to outline mode: return that base’s folder/document tree instead of the list of bases. Omit to list the bases."),
	maxDepth: number().int().nonnegative().optional().describe("Outline mode only (requires `baseId`): limit the tree to this many folder levels (0 = top level)."),
	limit: number().int().positive().max(50).default(20).describe(`List mode only: maximum bases to return (default 20, max 50).`),
	cursor: string().trim().min(1).optional().describe("List mode only: continuation cursor returned by the previous kb_list call.")
});
object({
	items: array(object({
		id: string(),
		name: string(),
		groupId: string().nullable(),
		status: _enum(["completed", "failed"]),
		itemCount: number().int().nonnegative().optional(),
		sampleSources: array(string()),
		itemsUnavailable: boolean().optional()
	})),
	total: number().int().nonnegative(),
	nextCursor: string().optional()
});
const KB_SEARCH_TOOL_NAME = "kb_search";
const kbSearchInputSchema = object({
	query: string().trim().min(2, "Query must be at least 2 characters").max(200, "Query should be concise — break long questions into multiple searches").describe("Self-contained keyword search. MUST NOT use pronouns (\"it\", \"their\") or context-dependent references; expand the topic from earlier messages when the user asks a follow-up. Examples: ✓ \"Cherry Studio MCP cache invalidation\", ✗ \"its cache\"."),
	baseIds: array(string().trim().min(1)).min(1).describe("IDs of the knowledge bases to search, picked from the result of kb_list. At least one is required; pass multiple to fan out across related bases.")
});
const kbSearchOutputSchema = array(object({
	id: union([string(), number().int().positive()]),
	baseId: string().optional(),
	conceptId: string().optional(),
	title: string().optional(),
	type: string().optional(),
	content: string(),
	score: number().min(0).max(1)
}));
const KB_READ_TOOL_NAME = "kb_read";
object({
	baseId: string().trim().min(1).describe("ID of the knowledge base to read from — a base id from kb_list or a kb_search hit."),
	conceptId: string().trim().min(1).describe("Concept ID of the document to read — the `conceptId` field of a kb_search hit (its relative path)."),
	charStart: number().int().nonnegative().optional().describe("Read mode only: 0-based start offset of the slice to read. Omit to start at the beginning."),
	charEnd: number().int().positive().optional().describe("Read mode only: end offset (exclusive) of the slice. Omit to read to the end. Long reads are capped; when `totalChars` exceeds the returned `charEnd`, page on by calling again with `charStart` set to that `charEnd`."),
	pattern: string().min(1).max(200).optional().describe("Pass a JavaScript regular expression to switch to grep mode: instead of the document text, return each matching line with its character offsets and a snippet (anchors `^`/`$` bind to each line; a match cannot span lines). Use this for an exact lookup — a number, code symbol, term, quote. Omit to read the document text; use kb_search for semantic/meaning-based lookup across documents."),
	ignoreCase: boolean().optional().describe("Grep mode only: case-insensitive matching. Defaults to true."),
	maxMatches: number().int().positive().max(200).optional().describe("Grep mode only: maximum matches to return (default 50, hard cap 200). `totalMatches` always reports the full count.")
});
const kbReadOutputSchema = object({
	id: string().optional(),
	baseId: string().optional(),
	conceptId: string(),
	title: string(),
	type: string(),
	totalChars: number().int().nonnegative(),
	charStart: number().int().nonnegative(),
	charEnd: number().int().nonnegative(),
	content: string(),
	truncated: boolean()
});
const kbGrepMatchSchema = object({
	line: number().int().positive(),
	charStart: number().int().nonnegative(),
	charEnd: number().int().nonnegative(),
	snippet: string()
});
const kbGrepOutputSchema = object({
	id: string().optional(),
	baseId: string().optional(),
	conceptId: string(),
	title: string(),
	type: string(),
	totalMatches: number().int().nonnegative(),
	matches: array(kbGrepMatchSchema)
});
const kbTreeNodeSchema = object({
	depth: number().int().nonnegative(),
	title: string(),
	type: string(),
	status: KnowledgeItemStatusSchema,
	conceptId: string().optional()
});
object({
	baseId: string(),
	totalItems: number().int().nonnegative(),
	truncated: boolean(),
	nodes: array(kbTreeNodeSchema)
});
const KB_MANAGE_TOOL_NAME = "kb_manage";
const KB_MANAGE_ACTIONS = [
	"add",
	"delete",
	"refresh"
];
object({
	baseId: string().trim().min(1).describe("ID of the knowledge base to modify — a base id from kb_list."),
	action: _enum(KB_MANAGE_ACTIONS).describe("add: import a new source (set `type` + its field). delete: remove documents by `conceptIds`. refresh: re-index documents by `conceptIds`. All actions modify the base and require user approval."),
	type: _enum([
		"file",
		"url",
		"note"
	]).optional().describe("For action=\"add\" only: the source kind — \"file\" (set `path`), \"url\" (set `url`), or \"note\" (set `content`)."),
	path: string().trim().min(1).optional().describe("For action=\"add\", type=\"file\": absolute local filesystem path of the file to import."),
	url: string().trim().min(1).optional().describe("For action=\"add\", type=\"url\": the URL to fetch and index."),
	content: string().min(1).optional().describe("For action=\"add\", type=\"note\": the plain-text note content to index."),
	title: string().trim().min(1).optional().describe("For action=\"add\", type=\"note\": optional display title (defaults to the note's first line)."),
	conceptIds: array(string().trim().min(1)).optional().describe("For action=\"delete\"/\"refresh\": Concept IDs (the `conceptId` field of a kb_search hit or a kb_list result) to operate on.")
});
object({
	action: _enum(KB_MANAGE_ACTIONS),
	added: array(string()).optional(),
	deleted: array(string()).optional(),
	refreshed: array(string()).optional(),
	notFound: array(string()).optional()
});
const WEB_SEARCH_TOOL_NAME = "web_search";
const PROVIDER_WEB_SEARCH_TOOL_NAME = "webSearch";
const WEB_FETCH_TOOL_NAME = "web_fetch";
const webSearchInputSchema = object({ query: string().trim().min(2, "Query must be at least 2 characters").max(200, "Query should be concise — break long questions into multiple searches").describe("Self-contained web search query. MUST NOT use pronouns (\"it\", \"their\") or context-dependent references; expand the topic from earlier messages when the user asks a follow-up. Examples: ✓ \"Anthropic Claude 4.5 release date\", ✗ \"when did it ship\".") });
const webSearchOutputSchema = array(object({
	id: union([string(), number().int().positive()]),
	title: string(),
	url: string(),
	content: string()
}));
object({ urls: array(string().trim().min(1).refine(isHttpUrl, "must be an absolute http(s) URL")).min(1).max(20, "Fetch at most 20 URLs per call").describe("Absolute http(s) web page URLs to fetch and summarize. Use web_search first when you do not know the URL.") });
const TO_MARKDOWN_TOOL_NAME = "to_markdown";
const TO_MARKDOWN_SUPPORTED_EXTENSIONS = ".doc, .docx, .docm, .ppt, .pps, .pot, .pptx, .pptm, .ppsx, .ppsm, .xls, .xlsx, .xlsm, .xlsb, .odt, .ods, .odp, .rtf, .epub, .csv, .pdf";
object({ path: string().trim().min(1).max(4096).describe(`Required local source path. Relative paths resolve from the session workspace; absolute paths must be an attachment announced with this session or live under the agent data directory. Supported extensions: ${TO_MARKDOWN_SUPPORTED_EXTENSIONS}.`) });
object({
	path: string().describe("Absolute path to the temporary Markdown file. Read this file in slices as needed."),
	chars: number().int().nonnegative().describe("Number of characters written to the Markdown file.")
});
`${TO_MARKDOWN_SUPPORTED_EXTENSIONS}`;
const REPORT_ARTIFACTS_TOOL_NAME = "report_artifacts";
const reportArtifactsInputSchema = object({
	artifacts: array(object({
		path: string().trim().min(1).describe("Absolute or workspace-relative path to a final deliverable file."),
		description: string().trim().min(1).optional().describe("One-line description of what this file is.")
	})).min(1).describe("The final deliverable file(s) produced for the user. List only finished outputs — never intermediate, scratch, or temporary files."),
	summary: string().trim().min(1).optional().describe("One-line summary of what was produced.")
});
object({
	filename: string().trim().min(1).describe("Name of the attached file to read, exactly as it appears in the attachment manifest in the conversation."),
	offset: number().int().nonnegative().optional().describe("0-based character offset to start from. Page through long documents with offset + limit. Omit to start at the beginning."),
	limit: number().int().positive().max(2e5).optional().describe(`Max characters to return. Omit to default to 8000.`)
});
union([object({
	text: string(),
	totalChars: number().int().nonnegative(),
	nextOffset: number().int().nonnegative().optional()
}), object({ error: string() })]);
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isToolType(value) {
	return value === "mcp" || value === "builtin" || value === "provider";
}
function isMcpContentArray(value) {
	return Array.isArray(value) && value.every(isMcpContentBlock);
}
function extractOutputMetadata(output) {
	if (!isRecord(output)) return { response: output };
	const metadata = isRecord(output.metadata) ? output.metadata : void 0;
	if ("content" in output || metadata) {
		const normalizedMeta = metadata ? {
			description: typeof metadata.description === "string" ? metadata.description : void 0,
			name: typeof metadata.name === "string" ? metadata.name : void 0,
			serverId: typeof metadata.serverId === "string" ? metadata.serverId : void 0,
			serverName: typeof metadata.serverName === "string" ? metadata.serverName : void 0,
			type: isToolType(metadata.type) ? metadata.type : void 0
		} : void 0;
		return {
			response: normalizedMeta?.type === "mcp" && isMcpContentArray(output.content) ? output : output.content,
			metadata: normalizedMeta
		};
	}
	return { response: output };
}
function normalizeToolOutputResponse(output) {
	return extractOutputMetadata(output).response;
}
export { isDeferredToolOutput as C, generateImageOutputSchema as S, kbSearchOutputSchema as _, KB_LIST_TOOL_NAME as a, webSearchOutputSchema as b, KB_SEARCH_TOOL_NAME as c, TO_MARKDOWN_TOOL_NAME as d, WEB_FETCH_TOOL_NAME as f, kbSearchInputSchema as g, kbReadOutputSchema as h, CITATION_SNIPPET_MAX_CHARS as i, PROVIDER_WEB_SEARCH_TOOL_NAME as l, kbGrepOutputSchema as m, isToolType as n, KB_MANAGE_TOOL_NAME as o, WEB_SEARCH_TOOL_NAME as p, normalizeToolOutputResponse as r, KB_READ_TOOL_NAME as s, extractOutputMetadata as t, REPORT_ARTIFACTS_TOOL_NAME as u, reportArtifactsInputSchema as v, GENERATE_IMAGE_TOOL_NAME as x, webSearchInputSchema as y };
