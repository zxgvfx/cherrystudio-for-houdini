import { C as string, S as strictObject, T as unknown, _ as object, a as array, g as number, n as _enum, p as literal, w as union, x as record } from "./schemas-1oAyIgyK.js";
import { r as FileTypeSchema } from "./file-OKCzlHoD.js";
var ComposerMessageFileTokenPayloadSchema = object({
	type: FileTypeSchema.optional(),
	ext: string().optional(),
	name: string().optional(),
	origin_name: string().optional(),
	size: number().optional()
});
var ComposerMessageTokenPayloadSchema = union([object({
	nodeId: string(),
	values: record(string(), unknown()).optional()
}), ComposerMessageFileTokenPayloadSchema]);
var ComposerMessageTokenKindSchema = _enum([
	"skill",
	"link",
	"file",
	"folder",
	"command",
	"knowledge",
	"reference",
	"quote",
	"pipelineNode"
]);
var ComposerMessageTokenSchema = object({
	id: string(),
	kind: ComposerMessageTokenKindSchema,
	label: string(),
	icon: string().optional(),
	description: string().optional(),
	index: number(),
	textOffset: number(),
	promptText: string().optional(),
	payload: ComposerMessageTokenPayloadSchema.optional()
});
var ComposerMessageSnapshotSchema = object({
	version: literal(1),
	tokens: array(ComposerMessageTokenSchema)
});
const CherryTextMetaSchema = object({
	references: array(unknown()).optional(),
	composer: ComposerMessageSnapshotSchema.optional()
});
const CherryReasoningMetaSchema = object({
	thinkingMs: number().optional(),
	startedAt: number().optional()
});
const CherryToolMetaSchema = object({
	transport: string().optional(),
	toolName: string().optional(),
	tool: object({
		serverId: string().optional(),
		serverName: string().optional(),
		type: _enum([
			"mcp",
			"builtin",
			"provider"
		]).optional()
	}).optional()
});
const CherryFileMetaSchema = object({
	fileEntryId: string().optional(),
	fileTokenSourceId: string().optional(),
	composerFileKind: literal("pasted-text").optional(),
	pipelineAssetId: string().optional(),
	previewUrl: string().optional()
});
var DiagnosisStepSchema = object({ text: string() });
const CherryErrorMetaSchema = object({ diagnosis: object({
	summary: string(),
	category: string(),
	explanation: string(),
	steps: array(DiagnosisStepSchema)
}).optional() });
const KnowledgeScopePartDataSchema = strictObject({ baseIds: array(string().min(1)) });
var SCHEMA_BY_PART_TYPE = [
	[(t) => t === "text", CherryTextMetaSchema],
	[(t) => t === "reasoning", CherryReasoningMetaSchema],
	[(t) => t === "dynamic-tool" || t.startsWith("tool-"), CherryToolMetaSchema],
	[(t) => t === "file", CherryFileMetaSchema],
	[(t) => t === "data-error", CherryErrorMetaSchema]
];
function schemaForPartType(type) {
	for (const [match, schema] of SCHEMA_BY_PART_TYPE) if (match(type)) return schema;
	return null;
}
var KNOWLEDGE_SCOPE_PART_TYPE = "data-knowledge-scope";
var CLEAR_CONTEXT_PART_TYPE = "data-clear";
function createClearContextPart() {
	return {
		type: CLEAR_CONTEXT_PART_TYPE,
		data: {}
	};
}
function hasClearContextPart(parts) {
	return parts?.some((part) => part.type === CLEAR_CONTEXT_PART_TYPE) ?? false;
}
function isBlankUserTurn(input) {
	return input.role === "user" && input.status === "success" && (input.parts?.length ?? 0) === 0;
}
function withKnowledgeScopePart(parts, baseIds) {
	const contentParts = parts.filter((part) => part.type !== KNOWLEDGE_SCOPE_PART_TYPE);
	const uniqueBaseIds = Array.from(new Set(baseIds.filter(Boolean)));
	if (uniqueBaseIds.length === 0) return contentParts;
	return [...contentParts, {
		type: KNOWLEDGE_SCOPE_PART_TYPE,
		data: { baseIds: uniqueBaseIds }
	}];
}
function getKnowledgeBaseIdsFromParts(parts) {
	for (let index = parts.length - 1; index >= 0; index -= 1) {
		const part = parts[index];
		if (part.type !== KNOWLEDGE_SCOPE_PART_TYPE || !("data" in part)) continue;
		const result = KnowledgeScopePartDataSchema.safeParse(part.data);
		if (result.success) return Array.from(new Set(result.data.baseIds));
	}
}
function getComposerMessageFileTokenPayload(payload) {
	return payload && !("nodeId" in payload) ? payload : void 0;
}
function readCherryMeta(part) {
	const raw = part.providerMetadata?.cherry;
	if (!raw || typeof raw !== "object") return void 0;
	const schema = schemaForPartType(part.type);
	if (!schema) return void 0;
	const result = schema.safeParse(raw);
	if (!result.success) return void 0;
	return result.data;
}
function withCherryMeta(part, patch) {
	const existingMeta = part.providerMetadata;
	const existingCherry = existingMeta?.cherry ?? {};
	return {
		...part,
		providerMetadata: {
			...existingMeta,
			cherry: {
				...existingCherry,
				...patch
			}
		}
	};
}
export { isBlankUserTurn as a, withKnowledgeScopePart as c, hasClearContextPart as i, getComposerMessageFileTokenPayload as n, readCherryMeta as o, getKnowledgeBaseIdsFromParts as r, withCherryMeta as s, createClearContextPart as t };
