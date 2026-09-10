import { C as string, M as datetime, T as unknown, _ as object, a as array, b as preprocess, c as discriminatedUnion, d as intersection, g as number, i as _null, m as looseObject, n as _enum, o as boolean, p as literal, s as custom, v as optional, w as union, x as record } from "./schemas-1oAyIgyK.js";
const RELATED_TASK_META_KEY = "io.modelcontextprotocol/related-task";
var AssertObjectSchema = custom((v) => v !== null && (typeof v === "object" || typeof v === "function"));
const ProgressTokenSchema = union([string(), number().int()]);
const CursorSchema = string();
looseObject({
	ttl: union([number(), _null()]).optional(),
	pollInterval: number().optional()
});
const TaskMetadataSchema = object({ ttl: number().optional() });
const RelatedTaskMetadataSchema = object({ taskId: string() });
var RequestMetaSchema = looseObject({
	progressToken: ProgressTokenSchema.optional(),
	[RELATED_TASK_META_KEY]: RelatedTaskMetadataSchema.optional()
});
var BaseRequestParamsSchema = object({ _meta: RequestMetaSchema.optional() });
const TaskAugmentedRequestParamsSchema = BaseRequestParamsSchema.extend({ task: TaskMetadataSchema.optional() });
const RequestSchema = object({
	method: string(),
	params: BaseRequestParamsSchema.loose().optional()
});
var NotificationsParamsSchema = object({ _meta: RequestMetaSchema.optional() });
const NotificationSchema = object({
	method: string(),
	params: NotificationsParamsSchema.loose().optional()
});
const ResultSchema = looseObject({ _meta: RequestMetaSchema.optional() });
const RequestIdSchema = union([string(), number().int()]);
const JSONRPCRequestSchema = object({
	jsonrpc: literal("2.0"),
	id: RequestIdSchema,
	...RequestSchema.shape
}).strict();
const JSONRPCNotificationSchema = object({
	jsonrpc: literal("2.0"),
	...NotificationSchema.shape
}).strict();
const JSONRPCResultResponseSchema = object({
	jsonrpc: literal("2.0"),
	id: RequestIdSchema,
	result: ResultSchema
}).strict();
var ErrorCode;
(function(ErrorCode$1) {
	ErrorCode$1[ErrorCode$1["ConnectionClosed"] = -32e3] = "ConnectionClosed";
	ErrorCode$1[ErrorCode$1["RequestTimeout"] = -32001] = "RequestTimeout";
	ErrorCode$1[ErrorCode$1["ParseError"] = -32700] = "ParseError";
	ErrorCode$1[ErrorCode$1["InvalidRequest"] = -32600] = "InvalidRequest";
	ErrorCode$1[ErrorCode$1["MethodNotFound"] = -32601] = "MethodNotFound";
	ErrorCode$1[ErrorCode$1["InvalidParams"] = -32602] = "InvalidParams";
	ErrorCode$1[ErrorCode$1["InternalError"] = -32603] = "InternalError";
	ErrorCode$1[ErrorCode$1["UrlElicitationRequired"] = -32042] = "UrlElicitationRequired";
})(ErrorCode || (ErrorCode = {}));
const JSONRPCErrorResponseSchema = object({
	jsonrpc: literal("2.0"),
	id: RequestIdSchema.optional(),
	error: object({
		code: number().int(),
		message: string(),
		data: unknown().optional()
	})
}).strict();
union([
	JSONRPCRequestSchema,
	JSONRPCNotificationSchema,
	JSONRPCResultResponseSchema,
	JSONRPCErrorResponseSchema
]);
union([JSONRPCResultResponseSchema, JSONRPCErrorResponseSchema]);
const EmptyResultSchema = ResultSchema.strict();
const CancelledNotificationParamsSchema = NotificationsParamsSchema.extend({
	requestId: RequestIdSchema.optional(),
	reason: string().optional()
});
const CancelledNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/cancelled"),
	params: CancelledNotificationParamsSchema
});
const IconsSchema = object({ icons: array(object({
	src: string(),
	mimeType: string().optional(),
	sizes: array(string()).optional(),
	theme: _enum(["light", "dark"]).optional()
})).optional() });
const BaseMetadataSchema = object({
	name: string(),
	title: string().optional()
});
const ImplementationSchema = BaseMetadataSchema.extend({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	version: string(),
	websiteUrl: string().optional(),
	description: string().optional()
});
var ElicitationCapabilitySchema = preprocess((value) => {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		if (Object.keys(value).length === 0) return { form: {} };
	}
	return value;
}, intersection(object({
	form: intersection(object({ applyDefaults: boolean().optional() }), record(string(), unknown())).optional(),
	url: AssertObjectSchema.optional()
}), record(string(), unknown()).optional()));
const ClientTasksCapabilitySchema = looseObject({
	list: AssertObjectSchema.optional(),
	cancel: AssertObjectSchema.optional(),
	requests: looseObject({
		sampling: looseObject({ createMessage: AssertObjectSchema.optional() }).optional(),
		elicitation: looseObject({ create: AssertObjectSchema.optional() }).optional()
	}).optional()
});
const ServerTasksCapabilitySchema = looseObject({
	list: AssertObjectSchema.optional(),
	cancel: AssertObjectSchema.optional(),
	requests: looseObject({ tools: looseObject({ call: AssertObjectSchema.optional() }).optional() }).optional()
});
const ClientCapabilitiesSchema = object({
	experimental: record(string(), AssertObjectSchema).optional(),
	sampling: object({
		context: AssertObjectSchema.optional(),
		tools: AssertObjectSchema.optional()
	}).optional(),
	elicitation: ElicitationCapabilitySchema.optional(),
	roots: object({ listChanged: boolean().optional() }).optional(),
	tasks: ClientTasksCapabilitySchema.optional()
});
const InitializeRequestParamsSchema = BaseRequestParamsSchema.extend({
	protocolVersion: string(),
	capabilities: ClientCapabilitiesSchema,
	clientInfo: ImplementationSchema
});
const InitializeRequestSchema = RequestSchema.extend({
	method: literal("initialize"),
	params: InitializeRequestParamsSchema
});
const ServerCapabilitiesSchema = object({
	experimental: record(string(), AssertObjectSchema).optional(),
	logging: AssertObjectSchema.optional(),
	completions: AssertObjectSchema.optional(),
	prompts: object({ listChanged: boolean().optional() }).optional(),
	resources: object({
		subscribe: boolean().optional(),
		listChanged: boolean().optional()
	}).optional(),
	tools: object({ listChanged: boolean().optional() }).optional(),
	tasks: ServerTasksCapabilitySchema.optional()
});
const InitializeResultSchema = ResultSchema.extend({
	protocolVersion: string(),
	capabilities: ServerCapabilitiesSchema,
	serverInfo: ImplementationSchema,
	instructions: string().optional()
});
const InitializedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/initialized"),
	params: NotificationsParamsSchema.optional()
});
const PingRequestSchema = RequestSchema.extend({
	method: literal("ping"),
	params: BaseRequestParamsSchema.optional()
});
const ProgressSchema = object({
	progress: number(),
	total: optional(number()),
	message: optional(string())
});
const ProgressNotificationParamsSchema = object({
	...NotificationsParamsSchema.shape,
	...ProgressSchema.shape,
	progressToken: ProgressTokenSchema
});
const ProgressNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/progress"),
	params: ProgressNotificationParamsSchema
});
const PaginatedRequestParamsSchema = BaseRequestParamsSchema.extend({ cursor: CursorSchema.optional() });
const PaginatedRequestSchema = RequestSchema.extend({ params: PaginatedRequestParamsSchema.optional() });
const PaginatedResultSchema = ResultSchema.extend({ nextCursor: CursorSchema.optional() });
const TaskStatusSchema = _enum([
	"working",
	"input_required",
	"completed",
	"failed",
	"cancelled"
]);
const TaskSchema = object({
	taskId: string(),
	status: TaskStatusSchema,
	ttl: union([number(), _null()]),
	createdAt: string(),
	lastUpdatedAt: string(),
	pollInterval: optional(number()),
	statusMessage: optional(string())
});
const CreateTaskResultSchema = ResultSchema.extend({ task: TaskSchema });
const TaskStatusNotificationParamsSchema = NotificationsParamsSchema.merge(TaskSchema);
const TaskStatusNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/tasks/status"),
	params: TaskStatusNotificationParamsSchema
});
const GetTaskRequestSchema = RequestSchema.extend({
	method: literal("tasks/get"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
const GetTaskResultSchema = ResultSchema.merge(TaskSchema);
const GetTaskPayloadRequestSchema = RequestSchema.extend({
	method: literal("tasks/result"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
ResultSchema.loose();
const ListTasksRequestSchema = PaginatedRequestSchema.extend({ method: literal("tasks/list") });
const ListTasksResultSchema = PaginatedResultSchema.extend({ tasks: array(TaskSchema) });
const CancelTaskRequestSchema = RequestSchema.extend({
	method: literal("tasks/cancel"),
	params: BaseRequestParamsSchema.extend({ taskId: string() })
});
ResultSchema.merge(TaskSchema);
const ResourceContentsSchema = object({
	uri: string(),
	mimeType: optional(string()),
	_meta: record(string(), unknown()).optional()
});
const TextResourceContentsSchema = ResourceContentsSchema.extend({ text: string() });
var Base64Schema = string().refine((val) => {
	try {
		atob(val);
		return true;
	} catch {
		return false;
	}
}, { message: "Invalid Base64 string" });
const BlobResourceContentsSchema = ResourceContentsSchema.extend({ blob: Base64Schema });
const RoleSchema = _enum(["user", "assistant"]);
const AnnotationsSchema = object({
	audience: array(RoleSchema).optional(),
	priority: number().min(0).max(1).optional(),
	lastModified: datetime({ offset: true }).optional()
});
const ResourceSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	uri: string(),
	description: optional(string()),
	mimeType: optional(string()),
	annotations: AnnotationsSchema.optional(),
	_meta: optional(looseObject({}))
});
const ResourceTemplateSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	uriTemplate: string(),
	description: optional(string()),
	mimeType: optional(string()),
	annotations: AnnotationsSchema.optional(),
	_meta: optional(looseObject({}))
});
const ListResourcesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/list") });
const ListResourcesResultSchema = PaginatedResultSchema.extend({ resources: array(ResourceSchema) });
const ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({ method: literal("resources/templates/list") });
const ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({ resourceTemplates: array(ResourceTemplateSchema) });
const ResourceRequestParamsSchema = BaseRequestParamsSchema.extend({ uri: string() });
const ReadResourceRequestParamsSchema = ResourceRequestParamsSchema;
const ReadResourceRequestSchema = RequestSchema.extend({
	method: literal("resources/read"),
	params: ReadResourceRequestParamsSchema
});
const ReadResourceResultSchema = ResultSchema.extend({ contents: array(union([TextResourceContentsSchema, BlobResourceContentsSchema])) });
const ResourceListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/resources/list_changed"),
	params: NotificationsParamsSchema.optional()
});
const SubscribeRequestParamsSchema = ResourceRequestParamsSchema;
const SubscribeRequestSchema = RequestSchema.extend({
	method: literal("resources/subscribe"),
	params: SubscribeRequestParamsSchema
});
const UnsubscribeRequestParamsSchema = ResourceRequestParamsSchema;
const UnsubscribeRequestSchema = RequestSchema.extend({
	method: literal("resources/unsubscribe"),
	params: UnsubscribeRequestParamsSchema
});
const ResourceUpdatedNotificationParamsSchema = NotificationsParamsSchema.extend({ uri: string() });
const ResourceUpdatedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/resources/updated"),
	params: ResourceUpdatedNotificationParamsSchema
});
const PromptArgumentSchema = object({
	name: string(),
	description: optional(string()),
	required: optional(boolean())
});
const PromptSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	description: optional(string()),
	arguments: optional(array(PromptArgumentSchema)),
	_meta: optional(looseObject({}))
});
const ListPromptsRequestSchema = PaginatedRequestSchema.extend({ method: literal("prompts/list") });
const ListPromptsResultSchema = PaginatedResultSchema.extend({ prompts: array(PromptSchema) });
const GetPromptRequestParamsSchema = BaseRequestParamsSchema.extend({
	name: string(),
	arguments: record(string(), string()).optional()
});
const GetPromptRequestSchema = RequestSchema.extend({
	method: literal("prompts/get"),
	params: GetPromptRequestParamsSchema
});
const TextContentSchema = object({
	type: literal("text"),
	text: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
const ImageContentSchema = object({
	type: literal("image"),
	data: Base64Schema,
	mimeType: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
const AudioContentSchema = object({
	type: literal("audio"),
	data: Base64Schema,
	mimeType: string(),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
const ToolUseContentSchema = object({
	type: literal("tool_use"),
	name: string(),
	id: string(),
	input: record(string(), unknown()),
	_meta: record(string(), unknown()).optional()
});
const EmbeddedResourceSchema = object({
	type: literal("resource"),
	resource: union([TextResourceContentsSchema, BlobResourceContentsSchema]),
	annotations: AnnotationsSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
const ContentBlockSchema = union([
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ResourceSchema.extend({ type: literal("resource_link") }),
	EmbeddedResourceSchema
]);
const PromptMessageSchema = object({
	role: RoleSchema,
	content: ContentBlockSchema
});
const GetPromptResultSchema = ResultSchema.extend({
	description: string().optional(),
	messages: array(PromptMessageSchema)
});
const PromptListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/prompts/list_changed"),
	params: NotificationsParamsSchema.optional()
});
const ToolAnnotationsSchema = object({
	title: string().optional(),
	readOnlyHint: boolean().optional(),
	destructiveHint: boolean().optional(),
	idempotentHint: boolean().optional(),
	openWorldHint: boolean().optional()
});
const ToolExecutionSchema = object({ taskSupport: _enum([
	"required",
	"optional",
	"forbidden"
]).optional() });
const ToolSchema = object({
	...BaseMetadataSchema.shape,
	...IconsSchema.shape,
	description: string().optional(),
	inputSchema: object({
		type: literal("object"),
		properties: record(string(), AssertObjectSchema).optional(),
		required: array(string()).optional()
	}).catchall(unknown()),
	outputSchema: object({
		type: literal("object"),
		properties: record(string(), AssertObjectSchema).optional(),
		required: array(string()).optional()
	}).catchall(unknown()).optional(),
	annotations: ToolAnnotationsSchema.optional(),
	execution: ToolExecutionSchema.optional(),
	_meta: record(string(), unknown()).optional()
});
const ListToolsRequestSchema = PaginatedRequestSchema.extend({ method: literal("tools/list") });
const ListToolsResultSchema = PaginatedResultSchema.extend({ tools: array(ToolSchema) });
const CallToolResultSchema = ResultSchema.extend({
	content: array(ContentBlockSchema).default([]),
	structuredContent: record(string(), unknown()).optional(),
	isError: boolean().optional()
});
CallToolResultSchema.or(ResultSchema.extend({ toolResult: unknown() }));
const CallToolRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	name: string(),
	arguments: record(string(), unknown()).optional()
});
const CallToolRequestSchema = RequestSchema.extend({
	method: literal("tools/call"),
	params: CallToolRequestParamsSchema
});
const ToolListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/tools/list_changed"),
	params: NotificationsParamsSchema.optional()
});
object({
	autoRefresh: boolean().default(true),
	debounceMs: number().int().nonnegative().default(300)
});
const LoggingLevelSchema = _enum([
	"debug",
	"info",
	"notice",
	"warning",
	"error",
	"critical",
	"alert",
	"emergency"
]);
const SetLevelRequestParamsSchema = BaseRequestParamsSchema.extend({ level: LoggingLevelSchema });
const SetLevelRequestSchema = RequestSchema.extend({
	method: literal("logging/setLevel"),
	params: SetLevelRequestParamsSchema
});
const LoggingMessageNotificationParamsSchema = NotificationsParamsSchema.extend({
	level: LoggingLevelSchema,
	logger: string().optional(),
	data: unknown()
});
const LoggingMessageNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/message"),
	params: LoggingMessageNotificationParamsSchema
});
const ModelPreferencesSchema = object({
	hints: array(object({ name: string().optional() })).optional(),
	costPriority: number().min(0).max(1).optional(),
	speedPriority: number().min(0).max(1).optional(),
	intelligencePriority: number().min(0).max(1).optional()
});
const ToolChoiceSchema = object({ mode: _enum([
	"auto",
	"required",
	"none"
]).optional() });
const ToolResultContentSchema = object({
	type: literal("tool_result"),
	toolUseId: string().describe("The unique identifier for the corresponding tool call."),
	content: array(ContentBlockSchema).default([]),
	structuredContent: object({}).loose().optional(),
	isError: boolean().optional(),
	_meta: record(string(), unknown()).optional()
});
const SamplingContentSchema = discriminatedUnion("type", [
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema
]);
const SamplingMessageContentBlockSchema = discriminatedUnion("type", [
	TextContentSchema,
	ImageContentSchema,
	AudioContentSchema,
	ToolUseContentSchema,
	ToolResultContentSchema
]);
const SamplingMessageSchema = object({
	role: RoleSchema,
	content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)]),
	_meta: record(string(), unknown()).optional()
});
const CreateMessageRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
	messages: array(SamplingMessageSchema),
	modelPreferences: ModelPreferencesSchema.optional(),
	systemPrompt: string().optional(),
	includeContext: _enum([
		"none",
		"thisServer",
		"allServers"
	]).optional(),
	temperature: number().optional(),
	maxTokens: number().int(),
	stopSequences: array(string()).optional(),
	metadata: AssertObjectSchema.optional(),
	tools: array(ToolSchema).optional(),
	toolChoice: ToolChoiceSchema.optional()
});
const CreateMessageRequestSchema = RequestSchema.extend({
	method: literal("sampling/createMessage"),
	params: CreateMessageRequestParamsSchema
});
const CreateMessageResultSchema = ResultSchema.extend({
	model: string(),
	stopReason: optional(_enum([
		"endTurn",
		"stopSequence",
		"maxTokens"
	]).or(string())),
	role: RoleSchema,
	content: SamplingContentSchema
});
const CreateMessageResultWithToolsSchema = ResultSchema.extend({
	model: string(),
	stopReason: optional(_enum([
		"endTurn",
		"stopSequence",
		"maxTokens",
		"toolUse"
	]).or(string())),
	role: RoleSchema,
	content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)])
});
const BooleanSchemaSchema = object({
	type: literal("boolean"),
	title: string().optional(),
	description: string().optional(),
	default: boolean().optional()
});
const StringSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	minLength: number().optional(),
	maxLength: number().optional(),
	format: _enum([
		"email",
		"uri",
		"date",
		"date-time"
	]).optional(),
	default: string().optional()
});
const NumberSchemaSchema = object({
	type: _enum(["number", "integer"]),
	title: string().optional(),
	description: string().optional(),
	minimum: number().optional(),
	maximum: number().optional(),
	default: number().optional()
});
const UntitledSingleSelectEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	enum: array(string()),
	default: string().optional()
});
const TitledSingleSelectEnumSchemaSchema = object({
	type: literal("string"),
	title: string().optional(),
	description: string().optional(),
	oneOf: array(object({
		const: string(),
		title: string()
	})),
	default: string().optional()
});
const PrimitiveSchemaDefinitionSchema = union([
	union([
		object({
			type: literal("string"),
			title: string().optional(),
			description: string().optional(),
			enum: array(string()),
			enumNames: array(string()).optional(),
			default: string().optional()
		}),
		union([UntitledSingleSelectEnumSchemaSchema, TitledSingleSelectEnumSchemaSchema]),
		union([object({
			type: literal("array"),
			title: string().optional(),
			description: string().optional(),
			minItems: number().optional(),
			maxItems: number().optional(),
			items: object({
				type: literal("string"),
				enum: array(string())
			}),
			default: array(string()).optional()
		}), object({
			type: literal("array"),
			title: string().optional(),
			description: string().optional(),
			minItems: number().optional(),
			maxItems: number().optional(),
			items: object({ anyOf: array(object({
				const: string(),
				title: string()
			})) }),
			default: array(string()).optional()
		})])
	]),
	BooleanSchemaSchema,
	StringSchemaSchema,
	NumberSchemaSchema
]);
const ElicitRequestParamsSchema = union([TaskAugmentedRequestParamsSchema.extend({
	mode: literal("form").optional(),
	message: string(),
	requestedSchema: object({
		type: literal("object"),
		properties: record(string(), PrimitiveSchemaDefinitionSchema),
		required: array(string()).optional()
	})
}), TaskAugmentedRequestParamsSchema.extend({
	mode: literal("url"),
	message: string(),
	elicitationId: string(),
	url: string().url()
})]);
const ElicitRequestSchema = RequestSchema.extend({
	method: literal("elicitation/create"),
	params: ElicitRequestParamsSchema
});
const ElicitationCompleteNotificationParamsSchema = NotificationsParamsSchema.extend({ elicitationId: string() });
const ElicitationCompleteNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/elicitation/complete"),
	params: ElicitationCompleteNotificationParamsSchema
});
const ElicitResultSchema = ResultSchema.extend({
	action: _enum([
		"accept",
		"decline",
		"cancel"
	]),
	content: preprocess((val) => val === null ? void 0 : val, record(string(), union([
		string(),
		number(),
		boolean(),
		array(string())
	])).optional())
});
const ResourceTemplateReferenceSchema = object({
	type: literal("ref/resource"),
	uri: string()
});
const PromptReferenceSchema = object({
	type: literal("ref/prompt"),
	name: string()
});
const CompleteRequestParamsSchema = BaseRequestParamsSchema.extend({
	ref: union([PromptReferenceSchema, ResourceTemplateReferenceSchema]),
	argument: object({
		name: string(),
		value: string()
	}),
	context: object({ arguments: record(string(), string()).optional() }).optional()
});
const CompleteRequestSchema = RequestSchema.extend({
	method: literal("completion/complete"),
	params: CompleteRequestParamsSchema
});
const CompleteResultSchema = ResultSchema.extend({ completion: looseObject({
	values: array(string()).max(100),
	total: optional(number().int()),
	hasMore: optional(boolean())
}) });
const RootSchema = object({
	uri: string().startsWith("file://"),
	name: string().optional(),
	_meta: record(string(), unknown()).optional()
});
const ListRootsRequestSchema = RequestSchema.extend({
	method: literal("roots/list"),
	params: BaseRequestParamsSchema.optional()
});
const ListRootsResultSchema = ResultSchema.extend({ roots: array(RootSchema) });
const RootsListChangedNotificationSchema = NotificationSchema.extend({
	method: literal("notifications/roots/list_changed"),
	params: NotificationsParamsSchema.optional()
});
union([
	PingRequestSchema,
	InitializeRequestSchema,
	CompleteRequestSchema,
	SetLevelRequestSchema,
	GetPromptRequestSchema,
	ListPromptsRequestSchema,
	ListResourcesRequestSchema,
	ListResourceTemplatesRequestSchema,
	ReadResourceRequestSchema,
	SubscribeRequestSchema,
	UnsubscribeRequestSchema,
	CallToolRequestSchema,
	ListToolsRequestSchema,
	GetTaskRequestSchema,
	GetTaskPayloadRequestSchema,
	ListTasksRequestSchema,
	CancelTaskRequestSchema
]);
union([
	CancelledNotificationSchema,
	ProgressNotificationSchema,
	InitializedNotificationSchema,
	RootsListChangedNotificationSchema,
	TaskStatusNotificationSchema
]);
union([
	EmptyResultSchema,
	CreateMessageResultSchema,
	CreateMessageResultWithToolsSchema,
	ElicitResultSchema,
	ListRootsResultSchema,
	GetTaskResultSchema,
	ListTasksResultSchema,
	CreateTaskResultSchema
]);
union([
	PingRequestSchema,
	CreateMessageRequestSchema,
	ElicitRequestSchema,
	ListRootsRequestSchema,
	GetTaskRequestSchema,
	GetTaskPayloadRequestSchema,
	ListTasksRequestSchema,
	CancelTaskRequestSchema
]);
union([
	CancelledNotificationSchema,
	ProgressNotificationSchema,
	LoggingMessageNotificationSchema,
	ResourceUpdatedNotificationSchema,
	ResourceListChangedNotificationSchema,
	ToolListChangedNotificationSchema,
	PromptListChangedNotificationSchema,
	TaskStatusNotificationSchema,
	ElicitationCompleteNotificationSchema
]);
union([
	EmptyResultSchema,
	InitializeResultSchema,
	CompleteResultSchema,
	GetPromptResultSchema,
	ListPromptsResultSchema,
	ListResourcesResultSchema,
	ListResourceTemplatesResultSchema,
	ReadResourceResultSchema,
	CallToolResultSchema,
	ListToolsResultSchema,
	GetTaskResultSchema,
	ListTasksResultSchema,
	CreateTaskResultSchema
]);
const BuiltinMcpServerNames = {
	flomo: "@cherry/flomo",
	mcpAutoInstall: "@cherry/mcp-auto-install",
	memory: "@cherry/memory",
	sequentialThinking: "@cherry/sequentialthinking",
	braveSearch: "@cherry/brave-search",
	fetch: "@cherry/fetch",
	filesystem: "@cherry/filesystem",
	difyKnowledge: "@cherry/dify-knowledge",
	python: "@cherry/python",
	didiMcp: "@cherry/didi-mcp",
	browser: "@cherry/browser",
	nowledgeMem: "@cherry/nowledge-mem",
	hub: "@cherry/hub"
};
const BuiltinMcpServerNamesArray = Object.values(BuiltinMcpServerNames);
const isBuiltinMcpServerName = (name) => {
	return BuiltinMcpServerNamesArray.some((n) => n === name);
};
const isInMemoryBuiltinMcpServer = (server) => {
	return server.type === "inMemory" && isBuiltinMcpServerName(server.name);
};
const isMcpContentBlock = (value) => {
	return ContentBlockSchema.safeParse(value).success;
};
export { CallToolResultSchema as a, isMcpContentBlock as i, isBuiltinMcpServerName as n, isInMemoryBuiltinMcpServer as r, BuiltinMcpServerNames as t };
