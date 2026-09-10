import { C as string, M as datetime, O as uuidv4, S as strictObject, _ as object, a as array, c as discriminatedUnion, g as number, i as _null, k as uuidv7, n as _enum, p as literal, w as union } from "./schemas-1oAyIgyK.js";
import { t as AbsoluteFilePathSchema } from "./file-OKCzlHoD.js";
import { c as PosixRelativeFilePathSchema, l as resolvePosixRelativeSegments } from "./file-CkrjUGO_.js";
import { t as GroupIdSchema } from "./group-Cqj37oRb.js";
const KnowledgeRelativePathSchema = PosixRelativeFilePathSchema.refine((value) => {
	const segments = resolvePosixRelativeSegments(value);
	return segments !== null && segments.length > 0;
}, "must stay inside the knowledge base material root and point below it");
const KnowledgeItemTypeSchema = _enum([
	"file",
	"url",
	"note",
	"directory"
]);
const KnowledgeItemStatusSchema = _enum([
	"idle",
	"preparing",
	"processing",
	"reading",
	"embedding",
	"completed",
	"failed",
	"deleting"
]);
const KnowledgeSearchScoreKindSchema = _enum(["relevance", "ranking"]);
const KnowledgeBaseStatusSchema = _enum(["completed", "failed"]);
const KnowledgeBaseErrorCodeSchema = _enum(["missing_embedding_model", "missing_vector_store"]);
const KnowledgeItemErrorCodeSchema = _enum(["directory_not_migrated", "indexing_interrupted"]);
const KnowledgeChunkSizeSchema = number().int().positive();
const KnowledgeChunkOverlapSchema = number().int().min(0);
const KnowledgeChunkStrategySchema = _enum(["structured", "delimiter"]);
const KnowledgeChunkSeparatorSchema = string();
const KnowledgeThresholdSchema = number().min(0).max(1);
const KnowledgeDocumentCountSchema = number().int().positive();
const KnowledgeBaseIdSchema = uuidv4();
const KnowledgeItemIdSchema = uuidv7();
const KnowledgeBaseGroupIdInputSchema = string().trim().pipe(GroupIdSchema);
const DEFAULT_KNOWLEDGE_CHUNK_SEPARATOR = "\\n\\n";
const KNOWLEDGE_RUNTIME_ITEMS_MAX = 100;
const KNOWLEDGE_NOTE_CONTENT_MAX = 1e6;
const KnowledgeBaseEntitySchema = strictObject({
	id: KnowledgeBaseIdSchema,
	name: string().trim().min(1),
	groupId: GroupIdSchema.nullable(),
	dimensions: number().int().positive().nullable(),
	embeddingModelId: string().trim().min(1).nullable(),
	status: KnowledgeBaseStatusSchema,
	error: KnowledgeBaseErrorCodeSchema.nullable(),
	rerankModelId: string().nullable().optional(),
	fileProcessorId: string().nullable().optional(),
	chunkSize: KnowledgeChunkSizeSchema,
	chunkOverlap: KnowledgeChunkOverlapSchema,
	chunkStrategy: KnowledgeChunkStrategySchema,
	chunkSeparator: KnowledgeChunkSeparatorSchema,
	threshold: KnowledgeThresholdSchema.optional(),
	documentCount: KnowledgeDocumentCountSchema.optional(),
	createdAt: datetime(),
	updatedAt: datetime()
});
function refineKnowledgeBaseInvariants(value, ctx) {
	if (value.status === "completed") {
		if (value.error !== null) ctx.addIssue({
			code: "custom",
			path: ["error"],
			message: "Completed knowledge base cannot have an error"
		});
		if (value.embeddingModelId === null !== (value.dimensions === null)) ctx.addIssue({
			code: "custom",
			path: ["dimensions"],
			message: "Embedding model and dimensions must be set together"
		});
	}
	if (value.status === "failed" && value.error === null) ctx.addIssue({
		code: "custom",
		path: ["error"],
		message: "Failed knowledge base requires an error"
	});
	if (value.chunkOverlap >= value.chunkSize) ctx.addIssue({
		code: "custom",
		path: ["chunkOverlap"],
		message: "Chunk overlap must be smaller than chunk size"
	});
	if (value.chunkStrategy === "delimiter" && !value.chunkSeparator) ctx.addIssue({
		code: "custom",
		path: ["chunkSeparator"],
		message: "Separator is required when chunk strategy is delimiter"
	});
}
const KnowledgeBaseSchema = KnowledgeBaseEntitySchema.superRefine(refineKnowledgeBaseInvariants);
KnowledgeBaseEntitySchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
}).superRefine(refineKnowledgeBaseInvariants);
var KnowledgeItemSharedSchema = strictObject({ source: string().trim().min(1).describe("Original user-facing source identifier for the knowledge item.") });
const FileItemDataSchema = KnowledgeItemSharedSchema.extend({
	relativePath: KnowledgeRelativePathSchema.describe("Knowledge-base-relative, POSIX-normalized path for the copied source file."),
	indexedRelativePath: KnowledgeRelativePathSchema.optional().describe("Knowledge-base-relative, POSIX-normalized path for the file actually indexed, such as a processed markdown artifact.")
});
const UrlItemDataSchema = KnowledgeItemSharedSchema.extend({
	url: string().trim().min(1).describe("URL to read and index."),
	relativePath: KnowledgeRelativePathSchema.optional().describe("Knowledge-base-relative path for the captured URL snapshot markdown, written on first index.")
});
const NoteItemDataSchema = KnowledgeItemSharedSchema.extend({
	content: string().max(KNOWLEDGE_NOTE_CONTENT_MAX).describe("Plain text note content to index."),
	relativePath: KnowledgeRelativePathSchema.optional().describe("Knowledge-base-relative path for the captured note snapshot markdown, written on first index.")
});
const DirectoryItemDataSchema = KnowledgeItemSharedSchema.extend({ relativePath: KnowledgeRelativePathSchema.optional().describe("Knowledge-base-relative `raw/` directory prefix the expanded files are stored under, written on first expansion.") });
union([
	FileItemDataSchema,
	UrlItemDataSchema,
	NoteItemDataSchema,
	DirectoryItemDataSchema
]);
var KnowledgeItemEntityBaseSchema = strictObject({
	id: KnowledgeItemIdSchema.describe("Stable knowledge item identifier."),
	baseId: KnowledgeBaseIdSchema.describe("Owning knowledge base identifier."),
	groupId: KnowledgeItemIdSchema.nullable().optional().describe("Parent container item identifier; null or undefined means the item is a root item."),
	createdAt: datetime().describe("ISO timestamp when the item row was created."),
	updatedAt: datetime().describe("ISO timestamp when the item row was last updated.")
});
var IdleKnowledgeItemLifecycleSchema = {
	status: literal("idle").describe("Item row exists but indexing has not started."),
	error: _null().describe("No error is stored for non-failed lifecycle states.")
};
var PreparingKnowledgeItemLifecycleSchema = {
	status: literal("preparing").describe("Container expansion is running; only directory items use it."),
	error: _null().describe("No error is stored for non-failed lifecycle states.")
};
var ProcessingKnowledgeItemLifecycleSchema = {
	status: literal("processing").describe("Work has been queued or is running before a more specific phase is known."),
	error: _null().describe("No error is stored for non-failed lifecycle states.")
};
var ReadingKnowledgeItemLifecycleSchema = {
	status: literal("reading").describe("Leaf source documents are being read; only file, url, and note items use it."),
	error: _null().describe("No error is stored for non-failed lifecycle states.")
};
var EmbeddingKnowledgeItemLifecycleSchema = {
	status: literal("embedding").describe("Leaf chunks are being embedded and written to the vector store; only file, url, and note items use it."),
	error: _null().describe("No error is stored for non-failed lifecycle states.")
};
var CompletedKnowledgeItemLifecycleSchema = {
	status: literal("completed").describe("Indexing or container reconciliation finished successfully."),
	error: _null().describe("No error is stored for non-failed lifecycle states.")
};
var DeletingKnowledgeItemLifecycleSchema = {
	status: literal("deleting").describe("Delete cleanup is in progress; default list, search, and RAG reads hide it."),
	error: _null().describe("No error is stored for non-failed lifecycle states.")
};
var FailedKnowledgeItemLifecycleSchema = {
	status: literal("failed").describe("Workflow failed."),
	error: string().trim().min(1).describe("Non-empty failure message for failed items.")
};
var createLeafKnowledgeItemEntitySchemas = (type, data) => [
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...IdleKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...ProcessingKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...ReadingKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...EmbeddingKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...CompletedKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...DeletingKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...FailedKnowledgeItemLifecycleSchema
	})
];
var createContainerKnowledgeItemEntitySchemas = (type, data) => [
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...IdleKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...PreparingKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...ProcessingKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...CompletedKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...DeletingKnowledgeItemLifecycleSchema
	}),
	KnowledgeItemEntityBaseSchema.extend({
		type: literal(type),
		data,
		...FailedKnowledgeItemLifecycleSchema
	})
];
union([
	discriminatedUnion("status", createLeafKnowledgeItemEntitySchemas("file", FileItemDataSchema)),
	discriminatedUnion("status", createLeafKnowledgeItemEntitySchemas("url", UrlItemDataSchema)),
	discriminatedUnion("status", createLeafKnowledgeItemEntitySchemas("note", NoteItemDataSchema)),
	discriminatedUnion("status", createContainerKnowledgeItemEntitySchemas("directory", DirectoryItemDataSchema))
]);
const KnowledgeChunkMetadataSchema = strictObject({
	itemId: KnowledgeItemIdSchema,
	itemType: KnowledgeItemTypeSchema,
	source: string().trim().min(1),
	chunkIndex: number().int().min(0),
	tokenCount: number().int().min(0)
});
strictObject({
	pageContent: string(),
	score: number(),
	scoreKind: KnowledgeSearchScoreKindSchema,
	rank: number().int().positive(),
	metadata: KnowledgeChunkMetadataSchema,
	itemId: KnowledgeItemIdSchema.optional(),
	chunkId: string(),
	conceptId: string().optional(),
	title: string().optional()
});
strictObject({
	id: string(),
	itemId: KnowledgeItemIdSchema,
	content: string(),
	metadata: KnowledgeChunkMetadataSchema
});
var KnowledgeBaseRuntimeConfigSchema = strictObject({
	dimensions: number().int().positive().nullable().optional(),
	embeddingModelId: string().trim().min(1).nullable().optional(),
	rerankModelId: string().nullable().optional(),
	fileProcessorId: string().nullable().optional(),
	chunkSize: KnowledgeChunkSizeSchema.optional(),
	chunkOverlap: KnowledgeChunkOverlapSchema.optional(),
	chunkStrategy: KnowledgeChunkStrategySchema.optional(),
	chunkSeparator: KnowledgeChunkSeparatorSchema.optional(),
	threshold: KnowledgeThresholdSchema.optional(),
	documentCount: KnowledgeDocumentCountSchema.optional()
});
var refineRuntimeConfig = (value, ctx) => {
	if (value.embeddingModelId == null !== (value.dimensions == null)) ctx.addIssue({
		code: "custom",
		path: ["dimensions"],
		message: "Embedding model and dimensions must be provided together"
	});
	if (value.chunkOverlap != null && value.chunkSize == null) ctx.addIssue({
		code: "custom",
		path: ["chunkSize"],
		message: "Chunk size is required when chunk overlap is provided"
	});
	if (value.chunkOverlap != null && value.chunkSize != null && value.chunkOverlap >= value.chunkSize) ctx.addIssue({
		code: "custom",
		path: ["chunkOverlap"],
		message: "Chunk overlap must be smaller than chunk size"
	});
};
KnowledgeBaseRuntimeConfigSchema.extend({
	name: string().trim().min(1),
	groupId: KnowledgeBaseGroupIdInputSchema.optional()
}).superRefine(refineRuntimeConfig);
strictObject({
	sourceBaseId: string().trim().pipe(KnowledgeBaseIdSchema),
	name: string().trim().min(1),
	dimensions: number().int().positive().nullable(),
	embeddingModelId: string().trim().min(1).nullable()
}).superRefine(refineRuntimeConfig);
strictObject({
	base: KnowledgeBaseSchema,
	skippedMissingSourceCount: number().int().nonnegative()
});
var CreateKnowledgeItemBaseSchema = strictObject({ groupId: KnowledgeItemIdSchema.nullable().optional() });
var UrlItemMemberSchema = CreateKnowledgeItemBaseSchema.extend({
	type: literal("url"),
	data: UrlItemDataSchema
});
var NoteItemMemberSchema = CreateKnowledgeItemBaseSchema.extend({
	type: literal("note"),
	data: NoteItemDataSchema
});
var DirectoryItemMemberSchema = CreateKnowledgeItemBaseSchema.extend({
	type: literal("directory"),
	data: DirectoryItemDataSchema
});
discriminatedUnion("type", [
	CreateKnowledgeItemBaseSchema.extend({
		type: literal("file"),
		data: FileItemDataSchema
	}),
	UrlItemMemberSchema,
	NoteItemMemberSchema,
	DirectoryItemMemberSchema
]);
var RuntimeFileItemDataSchema = KnowledgeItemSharedSchema.extend({
	path: AbsoluteFilePathSchema.describe("Absolute source path selected by the user before Knowledge copies it."),
	indexedPath: AbsoluteFilePathSchema.optional().describe("Absolute path to an already-processed artifact to copy in and index from, skipping the file processor.")
});
var RuntimeUrlItemDataSchema = KnowledgeItemSharedSchema.extend({
	url: string().trim().min(1).describe("URL to read and index."),
	snapshotPath: AbsoluteFilePathSchema.optional().describe("Absolute path to a captured URL snapshot markdown to copy in, skipping the live re-fetch.")
});
var RuntimeUrlItemMemberSchema = CreateKnowledgeItemBaseSchema.extend({
	type: literal("url"),
	data: RuntimeUrlItemDataSchema
});
var RuntimeNoteItemDataSchema = KnowledgeItemSharedSchema.extend({ content: string().max(KNOWLEDGE_NOTE_CONTENT_MAX).describe("Plain text note content to index.") });
var RuntimeNoteItemMemberSchema = CreateKnowledgeItemBaseSchema.extend({
	type: literal("note"),
	data: RuntimeNoteItemDataSchema
});
discriminatedUnion("type", [
	CreateKnowledgeItemBaseSchema.extend({
		type: literal("file"),
		data: RuntimeFileItemDataSchema
	}),
	RuntimeUrlItemMemberSchema,
	RuntimeNoteItemMemberSchema,
	DirectoryItemMemberSchema
]);
_enum([
	"rename",
	"detect",
	"replace"
]);
const KnowledgeAddItemConflictSchema = object({
	type: KnowledgeItemTypeSchema,
	title: string()
});
discriminatedUnion("status", [object({ status: literal("added") }), object({
	status: literal("conflicts"),
	conflicts: array(KnowledgeAddItemConflictSchema)
})]);
function getKnowledgePathBasename(value) {
	const normalized = value.replace(/[/\\]+$/, "");
	return normalized.split(/[/\\]/).pop()?.trim() || normalized || value;
}
function getKnowledgeNoteFirstLine(content) {
	return content.split("\n").map((line) => line.trim()).find(Boolean) || "";
}
function getKnowledgeNoteName(data) {
	return (data.relativePath ? getKnowledgePathBasename(data.relativePath).replace(/\.md$/i, "") : "") || getKnowledgeNoteFirstLine(data.source || "") || getKnowledgeNoteFirstLine(data.content || "");
}
function getKnowledgeItemDisplayTitle(item) {
	const data = item.data;
	switch (item.type) {
		case "file": return getKnowledgePathBasename(data.relativePath || data.source || "");
		case "directory": return getKnowledgePathBasename(data.relativePath || data.source || "");
		case "note": return getKnowledgeNoteName(data);
		case "url": return (data.relativePath ? getKnowledgePathBasename(data.relativePath).replace(/\.md$/i, "") : "") || data.url || data.source || "";
	}
}
export { KnowledgeBaseGroupIdInputSchema as a, KnowledgeItemTypeSchema as c, KnowledgeBaseErrorCodeSchema as i, getKnowledgeItemDisplayTitle as l, KNOWLEDGE_RUNTIME_ITEMS_MAX as n, KnowledgeItemErrorCodeSchema as o, KnowledgeBaseEntitySchema as r, KnowledgeItemStatusSchema as s, DEFAULT_KNOWLEDGE_CHUNK_SEPARATOR as t, getKnowledgePathBasename as u };
