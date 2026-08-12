import { C as string, D as uuid, M as datetime, S as strictObject, a as array, c as discriminatedUnion, g as number, n as _enum, p as literal, s as custom } from "./schemas-CV_EtlSZ.js";
import { V as ReasoningEffortOptionSchema } from "./error-3V5V4Mev.js";
import { g as CURRENCY, w as objectValues } from "./model-CfoN7z8F.js";
const MessageIdSchema = uuid();
var MessageProviderPerformanceSchema = strictObject({
	measuredOutputTokens: number().nonnegative(),
	generationDurationMs: number().nonnegative()
});
var MessageRuntimeToolExecutionSpanSchema = strictObject({
	id: string().min(1),
	kind: literal("tool-execution"),
	toolCallId: string().min(1),
	toolName: string().min(1).optional(),
	startedAt: number(),
	completedAt: number().optional()
});
var MessageRuntimeApprovalWaitSpanSchema = strictObject({
	id: string().min(1),
	kind: literal("approval-wait"),
	approvalId: string().min(1),
	toolCallId: string().min(1),
	toolName: string().min(1).optional(),
	startedAt: number(),
	completedAt: number().optional()
});
const MessageRuntimeTimingSchema = strictObject({
	startedAt: number(),
	completedAt: number().optional(),
	spans: array(discriminatedUnion("kind", [MessageRuntimeToolExecutionSpanSchema, MessageRuntimeApprovalWaitSpanSchema]))
});
const MessageStatsSchema = strictObject({
	inputTokens: number().optional(),
	outputTokens: number().optional(),
	totalTokens: number().optional(),
	contextTokens: number().optional(),
	inputTokenDetails: strictObject({
		noCacheTokens: number().optional(),
		cacheReadTokens: number().optional(),
		cacheWriteTokens: number().optional()
	}).optional(),
	outputTokenDetails: strictObject({
		textTokens: number().optional(),
		reasoningTokens: number().optional()
	}).optional(),
	requestCount: number().int().nonnegative().optional(),
	estimatedRequestCount: number().int().nonnegative().optional(),
	unpricedRequestCount: number().int().nonnegative().optional(),
	costs: array(strictObject({
		currency: _enum(objectValues(CURRENCY)),
		amount: number().nonnegative(),
		providerReportedRequestCount: number().int().nonnegative(),
		computedRequestCount: number().int().nonnegative()
	})).optional(),
	providerPerformance: MessageProviderPerformanceSchema.optional(),
	runtimeTiming: MessageRuntimeTimingSchema.optional(),
	timeFirstTokenMs: number().optional(),
	timeCompletionMs: number().optional(),
	timeThinkingMs: number().optional()
});
let ReferenceCategory = /* @__PURE__ */ function(ReferenceCategory$1) {
	ReferenceCategory$1["CITATION"] = "citation";
	ReferenceCategory$1["MENTION"] = "mention";
	return ReferenceCategory$1;
}({});
let CitationType = /* @__PURE__ */ function(CitationType$1) {
	CitationType$1["WEB"] = "web";
	CitationType$1["KNOWLEDGE"] = "knowledge";
	CitationType$1["MEMORY"] = "memory";
	return CitationType$1;
}({});
function isCitation(ref) {
	return ref.category === ReferenceCategory.CITATION;
}
function isWebCitation(ref) {
	return isCitation(ref) && ref.citationType === CitationType.WEB;
}
function isKnowledgeCitation(ref) {
	return isCitation(ref) && ref.citationType === CitationType.KNOWLEDGE;
}
function isMemoryCitation(ref) {
	return isCitation(ref) && ref.citationType === CitationType.MEMORY;
}
const MessageDataSchema = custom((value) => {
	if (typeof value !== "object" || value === null) return false;
	const v = value;
	if (v.parts !== void 0 && !Array.isArray(v.parts)) return false;
	if (v.turnOptions !== void 0) {
		if (typeof v.turnOptions !== "object" || v.turnOptions === null || Array.isArray(v.turnOptions)) return false;
		if (v.turnOptions.reasoningEffort !== void 0 && !ReasoningEffortOptionSchema.safeParse(v.turnOptions.reasoningEffort).success) return false;
		if (v.turnOptions.fastMode !== void 0 && typeof v.turnOptions.fastMode !== "boolean") return false;
	}
	return true;
});
const ModelSnapshotSchema = strictObject({
	id: string(),
	name: string(),
	provider: string(),
	group: string().optional()
});
const MessageSnapshotSchema = strictObject({
	id: string(),
	name: string(),
	emoji: string().optional(),
	model: ModelSnapshotSchema
});
const MessageRoleSchema = _enum([
	"user",
	"assistant",
	"system",
	"root"
]);
const ContentMessageRoleSchema = _enum([
	"user",
	"assistant",
	"system"
]);
function toContentRole(role) {
	if (role === "root") throw new Error("virtual root (role=root) must not be serialized into model history");
	return role;
}
const MessageStatusSchema = _enum([
	"pending",
	"success",
	"error",
	"paused"
]);
strictObject({
	id: MessageIdSchema,
	topicId: string(),
	parentId: string().nullable(),
	role: MessageRoleSchema,
	data: MessageDataSchema,
	searchableText: string(),
	status: MessageStatusSchema,
	siblingsGroupId: number(),
	modelId: string().nullable().optional(),
	messageSnapshot: MessageSnapshotSchema.nullable().optional(),
	stats: MessageStatsSchema.nullable().optional(),
	compactionSummary: string().nullable().optional(),
	createdAt: datetime(),
	updatedAt: datetime()
});
export { MessageStatsSchema as a, isKnowledgeCitation as c, toContentRole as d, MessageSnapshotSchema as i, isMemoryCitation as l, MessageDataSchema as n, MessageStatusSchema as o, MessageIdSchema as r, ReferenceCategory as s, ContentMessageRoleSchema as t, isWebCitation as u };
