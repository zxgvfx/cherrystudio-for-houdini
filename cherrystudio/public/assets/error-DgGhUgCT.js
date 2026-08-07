import { r as __export } from "./chunk-DiqNceaa.js";
import { C as string, P as _coercedNumber, R as NEVER, S as strictObject, T as unknown, _ as object, a as array, c as discriminatedUnion, g as number$1, j as ZodError, n as _enum, o as boolean, p as literal, s as custom, t as ZodNumber, u as int, x as record } from "./schemas-CV_EtlSZ.js";
import { n as t } from "./i18next-DBAWv9hQ.js";
import { t as IpcError } from "./IpcError-D-kcO4bk.js";
import { t as formatErrorDetails } from "./errorDetails-CsrPCSVK.js";
import { b as REASONING_EFFORT, r as UniqueModelIdSchema, w as objectValues } from "./model-CfoN7z8F.js";
import { s as AISDKError, t as InvalidToolInputError } from "./dist-Zc546Plu.js";
function number(params) {
	return _coercedNumber(ZodNumber, params);
}
const ReasoningEffortOptionSchema = _enum(["default", ...objectValues(REASONING_EFFORT)]);
_enum([
	"maxOutputTokens",
	"temperature",
	"topP",
	"topK",
	"presencePenalty",
	"frequencyPenalty",
	"stopSequences",
	"seed"
]);
const AgentWorkspaceNameSchema = string().trim().min(1);
const AgentWorkspacePathSchema = string().min(1);
const AGENT_WORKSPACE_TYPES = ["user", "system"];
const AGENT_WORKSPACE_TYPE = {
	USER: "user",
	SYSTEM: "system"
};
const AgentWorkspaceTypeSchema = _enum(AGENT_WORKSPACE_TYPES);
const AgentSessionWorkspaceSourceSchema = discriminatedUnion("type", [strictObject({
	type: literal("user"),
	workspaceId: string().min(1)
}), strictObject({ type: literal("system") })]);
const AgentWorkspaceEntitySchema = strictObject({
	id: string(),
	name: AgentWorkspaceNameSchema,
	path: AgentWorkspacePathSchema,
	type: AgentWorkspaceTypeSchema,
	orderKey: string(),
	createdAt: string(),
	updatedAt: string()
});
AgentWorkspaceEntitySchema.pick({
	path: true,
	name: true
}).partial({ name: true });
AgentWorkspaceEntitySchema.pick({ name: true });
const JobStatusAtomSchema = _enum([
	"pending",
	"delayed",
	"running",
	"completed",
	"failed",
	"cancelled"
]);
const JobErrorSchema = strictObject({
	code: string(),
	message: string(),
	params: record(string(), unknown()).optional(),
	retryable: boolean()
});
const TriggerSchema = discriminatedUnion("kind", [
	strictObject({
		kind: literal("cron"),
		expr: string().min(1),
		timezone: string().optional(),
		limit: number$1().int().min(1).optional()
	}),
	strictObject({
		kind: literal("interval"),
		ms: number$1().int().min(1),
		anchor: _enum(["createdAt", "lastRun"]).optional()
	}),
	strictObject({
		kind: literal("once"),
		at: number$1().int().min(0)
	})
]);
const CatchUpPolicySchema = discriminatedUnion("kind", [strictObject({ kind: literal("skip-missed") }), strictObject({
	kind: literal("after-startup"),
	minutes: number$1().int().min(0)
})]);
strictObject({
	maxAttempts: number$1().int().min(1),
	backoff: _enum([
		"exponential",
		"fixed",
		"none"
	]),
	baseDelayMs: number$1().int().min(0),
	maxDelayMs: number$1().int().min(0)
});
strictObject({
	id: string(),
	type: string(),
	status: JobStatusAtomSchema,
	priority: number$1().int(),
	queue: string(),
	idempotencyKey: string().nullable(),
	scheduleId: string().nullable(),
	scheduledAt: string(),
	startedAt: string().nullable(),
	finishedAt: string().nullable(),
	attempt: number$1().int().min(0),
	maxAttempts: number$1().int().min(1),
	input: unknown(),
	output: unknown().nullable(),
	error: JobErrorSchema.nullable(),
	parentId: string().nullable(),
	cancelRequested: boolean(),
	metadata: record(string(), unknown()),
	timeoutMs: number$1().int().nullable(),
	createdAt: string(),
	updatedAt: string()
});
strictObject({
	id: string(),
	type: string(),
	name: string().nullable(),
	trigger: TriggerSchema,
	jobInputTemplate: unknown(),
	enabled: boolean(),
	nextRun: string().nullable(),
	lastRun: string().nullable(),
	catchUpPolicy: CatchUpPolicySchema,
	metadata: record(string(), unknown()),
	createdAt: string(),
	updatedAt: string()
});
strictObject({
	progress: number$1().min(0).max(100),
	detail: unknown().optional()
});
const JobScheduleNameAtomSchema = string().min(1).max(200).refine((s) => s === s.trim(), { message: "name must be trimmed" }).refine((s) => {
	for (let i = 0; i < s.length; i++) {
		const code = s.charCodeAt(i);
		if (code === 0 || code === 9 || code === 10 || code === 13) return false;
	}
	return true;
}, { message: "name cannot contain control characters (NUL/TAB/LF/CR)" }).refine((s) => !s.startsWith("__"), { message: "name cannot start with \"__\" (reserved)" });
strictObject({
	type: string().min(1),
	name: JobScheduleNameAtomSchema.nullable().optional(),
	trigger: TriggerSchema,
	jobInputTemplate: unknown(),
	catchUpPolicy: CatchUpPolicySchema,
	metadata: record(string(), unknown()).optional(),
	enabled: boolean().optional()
});
strictObject({
	name: JobScheduleNameAtomSchema.nullable().optional(),
	trigger: TriggerSchema.optional(),
	jobInputTemplate: unknown().optional(),
	catchUpPolicy: CatchUpPolicySchema.optional(),
	enabled: boolean().optional(),
	metadata: record(string(), unknown()).optional()
});
strictObject({
	status: string().optional().transform((value, ctx) => {
		if (!value) return void 0;
		const parts = value.split(",").map((s) => s.trim()).filter(Boolean);
		if (parts.length === 0) return void 0;
		const out = [];
		for (const part of parts) {
			const parsed = JobStatusAtomSchema.safeParse(part);
			if (!parsed.success) {
				ctx.addIssue({
					code: "custom",
					message: `invalid status value: ${part}`
				});
				return NEVER;
			}
			out.push(parsed.data);
		}
		return out;
	}),
	queue: string().optional(),
	type: string().optional(),
	scheduleId: string().optional(),
	parentId: string().optional(),
	limit: number().int().min(1).max(500).optional(),
	offset: number().int().min(0).optional()
});
const AgentNameAtomSchema = string().min(1);
string().min(1);
number$1().min(1).nullable().optional();
const AgentToolNameSetSchema = array(string()).transform((items) => Array.from(new Set(items)));
array(string().min(1)).transform((items) => Array.from(new Set(items)));
const AgentKnowledgeBaseIdSetSchema = array(string().min(1)).transform((items) => Array.from(new Set(items)));
const AgentSkillUpdateListSchema = array(strictObject({
	skillId: string().min(1),
	isEnabled: boolean()
})).transform((items) => {
	const bySkillId = /* @__PURE__ */ new Map();
	for (const item of items) bySkillId.set(item.skillId, item);
	return Array.from(bySkillId.values());
});
const AgentPermissionModeSchema = _enum([
	"default",
	"acceptEdits",
	"bypassPermissions",
	"plan",
	"auto"
]);
const AgentSchedulerTypeSchema = _enum([
	"cron",
	"interval",
	"one-time"
]);
const AgentConfigurationSchema = object({
	avatar: string().optional(),
	slash_commands: array(string()).optional(),
	permission_mode: AgentPermissionModeSchema.optional(),
	reasoning_effort: ReasoningEffortOptionSchema.optional(),
	max_turns: number$1().optional(),
	env_vars: record(string(), string()).optional(),
	bootstrap_completed: boolean().optional(),
	scheduler_enabled: boolean().optional(),
	scheduler_type: AgentSchedulerTypeSchema.optional(),
	scheduler_cron: string().optional(),
	scheduler_interval: number$1().optional(),
	scheduler_one_time_delay: number$1().optional(),
	scheduler_last_run: string().optional(),
	heartbeat_enabled: boolean().optional(),
	heartbeat_interval: number$1().optional()
}).loose();
function sanitizeAgentConfiguration(raw) {
	if (raw == null) return {
		data: void 0,
		invalidKeys: []
	};
	if (typeof raw !== "object" || Array.isArray(raw)) return {
		data: void 0,
		invalidKeys: ["<root>"]
	};
	const parsed = AgentConfigurationSchema.safeParse(raw);
	if (parsed.success) return {
		data: parsed.data,
		invalidKeys: []
	};
	const invalidKeys = Array.from(new Set(parsed.error.issues.map((i) => i.path[0]).filter((p) => typeof p === "string")));
	const filtered = {};
	for (const [key, value] of Object.entries(raw)) if (!invalidKeys.includes(key)) filtered[key] = value;
	const reparsed = AgentConfigurationSchema.safeParse(filtered);
	return {
		data: reparsed.success ? reparsed.data : {},
		invalidKeys
	};
}
const AgentBaseSchema = strictObject({
	name: AgentNameAtomSchema,
	description: string().optional(),
	instructions: string().optional(),
	model: UniqueModelIdSchema,
	planModel: UniqueModelIdSchema.optional(),
	smallModel: UniqueModelIdSchema.optional(),
	mcps: array(string()).optional(),
	knowledgeBaseIds: AgentKnowledgeBaseIdSetSchema.optional(),
	disabledTools: AgentToolNameSetSchema.optional(),
	configuration: AgentConfigurationSchema.optional()
});
const AGENT_MUTABLE_FIELDS = {
	name: true,
	description: true,
	instructions: true,
	model: true,
	planModel: true,
	smallModel: true,
	mcps: true,
	knowledgeBaseIds: true,
	disabledTools: true,
	configuration: true
};
const AgentEntitySchema = AgentBaseSchema.extend({
	id: string(),
	type: _enum(["claude-code"]),
	createdAt: string(),
	updatedAt: string(),
	orderKey: string(),
	model: UniqueModelIdSchema.nullable(),
	modelName: string().nullable()
});
strictObject({
	id: string(),
	agentId: string(),
	name: string(),
	prompt: string(),
	trigger: TriggerSchema,
	timeoutMinutes: number$1(),
	workspace: AgentSessionWorkspaceSourceSchema,
	reuseSession: boolean(),
	reuseSessionId: string().nullable(),
	channelIds: array(string()).optional(),
	nextRun: string().nullable().optional(),
	lastRun: string().nullable().optional(),
	enabled: boolean(),
	status: _enum([
		"active",
		"paused",
		"completed"
	]),
	createdAt: string(),
	updatedAt: string()
});
strictObject({
	id: string(),
	scheduleId: string(),
	sessionId: string().nullable().optional(),
	startedAt: string(),
	durationMs: number$1(),
	status: _enum([
		"running",
		"completed",
		"failed",
		"cancelled"
	]),
	result: string().nullable().optional(),
	error: string().nullable().optional()
});
AgentEntitySchema.pick(AGENT_MUTABLE_FIELDS).partial().extend({
	configuration: AgentConfigurationSchema.partial().optional(),
	skillUpdates: AgentSkillUpdateListSchema.optional()
});
strictObject({
	page: number$1().int().positive().optional(),
	limit: number$1().int().positive().max(500).optional()
});
const AGENTS_MAX_LIMIT = 500;
strictObject({
	search: string().trim().min(1).optional(),
	page: int().positive().default(1),
	limit: int().positive().max(500).default(100)
});
strictObject({ deleteSessions: boolean().optional() });
const AgentServerErrorSchema = object({ error: object({
	message: string(),
	type: string(),
	code: string()
}) });
const isSerializedError = (error) => {
	return "name" in error && "message" in error && "stack" in error;
};
const isSerializedAiSdkError = (error) => {
	return "cause" in error;
};
const isSerializedAiSdkApiCallError = (error) => {
	return isSerializedAiSdkError(error) && "url" in error && "requestBodyValues" in error && "statusCode" in error && "responseHeaders" in error && "responseBody" in error && "isRetryable" in error && "data" in error;
};
const isSerializedAiSdkDownloadError = (error) => {
	return isSerializedAiSdkError(error) && "url" in error && "statusCode" in error && "statusText" in error;
};
const isSerializedAiSdkInvalidArgumentError = (error) => {
	return isSerializedAiSdkError(error) && "message" in error && error.name === "AI_InvalidArgumentError";
};
const isSerializedAiSdkInvalidDataContentError = (error) => {
	return isSerializedAiSdkError(error) && "content" in error;
};
const isSerializedAiSdkInvalidMessageRoleError = (error) => {
	return isSerializedAiSdkError(error) && "role" in error;
};
const isSerializedAiSdkInvalidPromptError = (error) => {
	return isSerializedAiSdkError(error) && "prompt" in error;
};
const isSerializedAiSdkInvalidToolInputError = (error) => {
	return isSerializedAiSdkError(error) && "toolName" in error && "toolInput" in error;
};
const isSerializedAiSdkJSONParseError = (error) => {
	return isSerializedAiSdkError(error) && "text" in error;
};
const isSerializedAiSdkMessageConversionError = (error) => {
	return isSerializedAiSdkError(error) && "originalMessage" in error;
};
const isSerializedAiSdkNoSpeechGeneratedError = (error) => {
	return isSerializedAiSdkError(error) && "responses" in error;
};
const isSerializedAiSdkNoObjectGeneratedError = (error) => {
	return isSerializedAiSdkError(error) && "text" in error && "response" in error && "usage" in error && "finishReason" in error;
};
const isSerializedAiSdkNoSuchModelError = (error) => {
	return isSerializedAiSdkError(error) && "modelId" in error && "modelType" in error;
};
const isSerializedAiSdkNoSuchProviderError = (error) => {
	return isSerializedAiSdkNoSuchModelError(error) && "providerId" in error && "availableProviders" in error;
};
const isSerializedAiSdkNoSuchToolError = (error) => {
	return isSerializedAiSdkError(error) && "toolName" in error && "availableTools" in error;
};
const isSerializedAiSdkProviderSpecificError = (error) => {
	return isSerializedAiSdkError(error) && "provider" in error;
};
const isSerializedAiSdkRetryError = (error) => {
	return isSerializedAiSdkError(error) && "reason" in error && "lastError" in error && "errors" in error;
};
const isSerializedAiSdkTooManyEmbeddingValuesForCallError = (error) => {
	return isSerializedAiSdkError(error) && "provider" in error && "modelId" in error && "maxEmbeddingsPerCall" in error && "values" in error;
};
const isSerializedAiSdkToolCallRepairError = (error) => {
	return isSerializedAiSdkError(error) && "originalError" in error;
};
const isSerializedAiSdkTypeValidationError = (error) => {
	return isSerializedAiSdkError(error) && "value" in error && !("parameter" in error);
};
const isSerializedAiSdkUnsupportedFunctionalityError = (error) => {
	return isSerializedAiSdkError(error) && "functionality" in error;
};
const isSerializedAiSdkErrorUnion = (error) => {
	return isSerializedAiSdkApiCallError(error) || isSerializedAiSdkDownloadError(error) || isSerializedAiSdkInvalidArgumentError(error) || isSerializedAiSdkInvalidDataContentError(error) || isSerializedAiSdkInvalidMessageRoleError(error) || isSerializedAiSdkInvalidPromptError(error) || isSerializedAiSdkInvalidToolInputError(error) || isSerializedAiSdkJSONParseError(error) || isSerializedAiSdkMessageConversionError(error) || isSerializedAiSdkNoObjectGeneratedError(error) || isSerializedAiSdkNoSuchModelError(error) || isSerializedAiSdkNoSuchProviderError(error) || isSerializedAiSdkNoSuchToolError(error) || isSerializedAiSdkProviderSpecificError(error) || isSerializedAiSdkRetryError(error) || isSerializedAiSdkToolCallRepairError(error) || isSerializedAiSdkTypeValidationError(error) || isSerializedAiSdkUnsupportedFunctionalityError(error);
};
const aiErrorCodes = {
	AI_REQUEST_FAILED: "AI_REQUEST_FAILED",
	AI_AGENT_TASK_NOT_FOUND: "AI_AGENT_TASK_NOT_FOUND",
	AI_AGENT_TASK_TRIGGER_INVALID: "AI_AGENT_TASK_TRIGGER_INVALID"
};
function aiErrorDetail(e) {
	return e instanceof IpcError && e.code === aiErrorCodes.AI_REQUEST_FAILED ? e.data : void 0;
}
function isSerializable(value) {
	const seen = /* @__PURE__ */ new Set();
	function _isSerializable(val) {
		if (val === null || val === void 0) return val !== void 0;
		const type = typeof val;
		if (type === "string" || type === "number" || type === "boolean") return true;
		if (type === "object") {
			if (seen.has(val)) return false;
			seen.add(val);
			if (Array.isArray(val)) return val.every((item) => _isSerializable(item));
			const proto = Object.getPrototypeOf(val);
			if (proto !== null && proto !== Object.prototype && proto !== Array.prototype) return false;
			if (val instanceof Date || val instanceof RegExp || val instanceof Map || val instanceof Set || val instanceof Error || val instanceof File || val instanceof Blob) return false;
			return Object.values(val).every((v) => _isSerializable(v));
		}
		return false;
	}
	try {
		return _isSerializable(value);
	} catch {
		return false;
	}
}
custom(isSerializable);
function safeSerialize(value, options = {}) {
	const { onError = "serialize", pretty = true } = options;
	const space = pretty ? 2 : void 0;
	if (isSerializable(value)) try {
		return JSON.stringify(value, null, space);
	} catch (err) {
		if (onError === "error") throw new Error(`Failed to stringify serializable value: ${err instanceof Error ? err.message : err}`);
		return null;
	}
	switch (onError) {
		case "error": throw new TypeError("Value is not serializable and cannot be safely serialized.");
		case "omit": return null;
		case "serialize": return tryLenientSerialize(value, space);
	}
}
function tryLenientSerialize(value, space) {
	const seen = /* @__PURE__ */ new WeakSet();
	return JSON.stringify(value, (_, val) => {
		if (typeof val === "object" && val !== null) {
			if (seen.has(val)) return "[Circular]";
			seen.add(val);
		}
		if (val instanceof Date) return val.toISOString();
		if (val instanceof RegExp) return `{RegExp: "${val.toString()}"}`;
		if (typeof val === "function") return `[Function: ${val.name || "anonymous"}]`;
		if (typeof val === "symbol") return `Symbol(${String(val.description)})`;
		if (val instanceof Map) return Object.fromEntries(val.entries());
		if (val instanceof Set) return Array.from(val);
		if (val === void 0) return "[undefined]";
		return val;
	}, space);
}
function bind(fn, thisArg) {
	return function wrap() {
		return fn.apply(thisArg, arguments);
	};
}
var { toString } = Object.prototype;
var { getPrototypeOf } = Object;
var { iterator, toStringTag } = Symbol;
var kindOf = ((cache) => (thing) => {
	const str = toString.call(thing);
	return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
var kindOfTest = (type) => {
	type = type.toLowerCase();
	return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
var { isArray } = Array;
var isUndefined = typeOfTest("undefined");
function isBuffer(val) {
	return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
	let result;
	if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
	else result = val && val.buffer && isArrayBuffer(val.buffer);
	return result;
}
var isString = typeOfTest("string");
var isFunction$1 = typeOfTest("function");
var isNumber = typeOfTest("number");
var isObject = (thing) => thing !== null && typeof thing === "object";
var isBoolean = (thing) => thing === true || thing === false;
var isPlainObject = (val) => {
	if (kindOf(val) !== "object") return false;
	const prototype$1 = getPrototypeOf(val);
	return (prototype$1 === null || prototype$1 === Object.prototype || Object.getPrototypeOf(prototype$1) === null) && !(toStringTag in val) && !(iterator in val);
};
var isEmptyObject = (val) => {
	if (!isObject(val) || isBuffer(val)) return false;
	try {
		return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
	} catch (e) {
		return false;
	}
};
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isReactNativeBlob = (value) => {
	return !!(value && typeof value.uri !== "undefined");
};
var isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
var isStream = (val) => isObject(val) && isFunction$1(val.pipe);
function getGlobal() {
	if (typeof globalThis !== "undefined") return globalThis;
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	return {};
}
var G = getGlobal();
var FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
var isFormData = (thing) => {
	if (!thing) return false;
	if (FormDataCtor && thing instanceof FormDataCtor) return true;
	const proto = getPrototypeOf(thing);
	if (!proto || proto === Object.prototype) return false;
	if (!isFunction$1(thing.append)) return false;
	const kind = kindOf(thing);
	return kind === "formdata" || kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
};
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(kindOfTest);
var trim = (str) => {
	return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
function forEach(obj, fn, { allOwnKeys = false } = {}) {
	if (obj === null || typeof obj === "undefined") return;
	let i;
	let l;
	if (typeof obj !== "object") obj = [obj];
	if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj);
	else {
		if (isBuffer(obj)) return;
		const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
		const len = keys.length;
		let key;
		for (i = 0; i < len; i++) {
			key = keys[i];
			fn.call(null, obj[key], key, obj);
		}
	}
}
function findKey(obj, key) {
	if (isBuffer(obj)) return null;
	key = key.toLowerCase();
	const keys = Object.keys(obj);
	let i = keys.length;
	let _key;
	while (i-- > 0) {
		_key = keys[i];
		if (key === _key.toLowerCase()) return _key;
	}
	return null;
}
var _global = (() => {
	if (typeof globalThis !== "undefined") return globalThis;
	return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge(...objs) {
	const { caseless, skipUndefined } = isContextDefined(this) && this || {};
	const result = {};
	const assignValue = (val, key) => {
		if (key === "__proto__" || key === "constructor" || key === "prototype") return;
		const targetKey = caseless && findKey(result, key) || key;
		const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
		if (isPlainObject(existing) && isPlainObject(val)) result[targetKey] = merge(existing, val);
		else if (isPlainObject(val)) result[targetKey] = merge({}, val);
		else if (isArray(val)) result[targetKey] = val.slice();
		else if (!skipUndefined || !isUndefined(val)) result[targetKey] = val;
	};
	for (let i = 0, l = objs.length; i < l; i++) objs[i] && forEach(objs[i], assignValue);
	return result;
}
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
	forEach(b, (val, key) => {
		if (thisArg && isFunction$1(val)) Object.defineProperty(a, key, {
			__proto__: null,
			value: bind(val, thisArg),
			writable: true,
			enumerable: true,
			configurable: true
		});
		else Object.defineProperty(a, key, {
			__proto__: null,
			value: val,
			writable: true,
			enumerable: true,
			configurable: true
		});
	}, { allOwnKeys });
	return a;
};
var stripBOM = (content) => {
	if (content.charCodeAt(0) === 65279) content = content.slice(1);
	return content;
};
var inherits = (constructor, superConstructor, props, descriptors) => {
	constructor.prototype = Object.create(superConstructor.prototype, descriptors);
	Object.defineProperty(constructor.prototype, "constructor", {
		__proto__: null,
		value: constructor,
		writable: true,
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(constructor, "super", {
		__proto__: null,
		value: superConstructor.prototype
	});
	props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
	let props;
	let i;
	let prop;
	const merged = {};
	destObj = destObj || {};
	if (sourceObj == null) return destObj;
	do {
		props = Object.getOwnPropertyNames(sourceObj);
		i = props.length;
		while (i-- > 0) {
			prop = props[i];
			if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
				destObj[prop] = sourceObj[prop];
				merged[prop] = true;
			}
		}
		sourceObj = filter !== false && getPrototypeOf(sourceObj);
	} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
	return destObj;
};
var endsWith = (str, searchString, position) => {
	str = String(str);
	if (position === void 0 || position > str.length) position = str.length;
	position -= searchString.length;
	const lastIndex = str.indexOf(searchString, position);
	return lastIndex !== -1 && lastIndex === position;
};
var toArray = (thing) => {
	if (!thing) return null;
	if (isArray(thing)) return thing;
	let i = thing.length;
	if (!isNumber(i)) return null;
	const arr = new Array(i);
	while (i-- > 0) arr[i] = thing[i];
	return arr;
};
var isTypedArray = ((TypedArray) => {
	return (thing) => {
		return TypedArray && thing instanceof TypedArray;
	};
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
var forEachEntry = (obj, fn) => {
	const _iterator = (obj && obj[iterator]).call(obj);
	let result;
	while ((result = _iterator.next()) && !result.done) {
		const pair = result.value;
		fn.call(obj, pair[0], pair[1]);
	}
};
var matchAll = (regExp, str) => {
	let matches;
	const arr = [];
	while ((matches = regExp.exec(str)) !== null) arr.push(matches);
	return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
	return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
		return p1.toUpperCase() + p2;
	});
};
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty$1 }) => (obj, prop) => hasOwnProperty$1.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
	const descriptors = Object.getOwnPropertyDescriptors(obj);
	const reducedDescriptors = {};
	forEach(descriptors, (descriptor, name) => {
		let ret;
		if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
	});
	Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods = (obj) => {
	reduceDescriptors(obj, (descriptor, name) => {
		if (isFunction$1(obj) && [
			"arguments",
			"caller",
			"callee"
		].includes(name)) return false;
		const value = obj[name];
		if (!isFunction$1(value)) return;
		descriptor.enumerable = false;
		if ("writable" in descriptor) {
			descriptor.writable = false;
			return;
		}
		if (!descriptor.set) descriptor.set = () => {
			throw Error("Can not rewrite read-only method '" + name + "'");
		};
	});
};
var toObjectSet = (arrayOrString, delimiter) => {
	const obj = {};
	const define = (arr) => {
		arr.forEach((value) => {
			obj[value] = true;
		});
	};
	isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
	return obj;
};
var noop = () => {};
var toFiniteNumber = (value, defaultValue) => {
	return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
	return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
var toJSONObject = (obj) => {
	const stack = new Array(10);
	const visit = (source, i) => {
		if (isObject(source)) {
			if (stack.indexOf(source) >= 0) return;
			if (isBuffer(source)) return source;
			if (!("toJSON" in source)) {
				stack[i] = source;
				const target = isArray(source) ? [] : {};
				forEach(source, (value, key) => {
					const reducedValue = visit(value, i + 1);
					!isUndefined(reducedValue) && (target[key] = reducedValue);
				});
				stack[i] = void 0;
				return target;
			}
		}
		return source;
	};
	return visit(obj, 0);
};
var isAsyncFn = kindOfTest("AsyncFunction");
var isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
	if (setImmediateSupported) return setImmediate;
	return postMessageSupported ? ((token, callbacks) => {
		_global.addEventListener("message", ({ source, data }) => {
			if (source === _global && data === token) callbacks.length && callbacks.shift()();
		}, false);
		return (cb) => {
			callbacks.push(cb);
			_global.postMessage(token, "*");
		};
	})(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
var utils_default = {
	isArray,
	isArrayBuffer,
	isBuffer,
	isFormData,
	isArrayBufferView,
	isString,
	isNumber,
	isBoolean,
	isObject,
	isPlainObject,
	isEmptyObject,
	isReadableStream,
	isRequest,
	isResponse,
	isHeaders,
	isUndefined,
	isDate,
	isFile,
	isReactNativeBlob,
	isReactNative,
	isBlob,
	isRegExp,
	isFunction: isFunction$1,
	isStream,
	isURLSearchParams,
	isTypedArray,
	isFileList,
	forEach,
	merge,
	extend,
	trim,
	stripBOM,
	inherits,
	toFlatObject,
	kindOf,
	kindOfTest,
	endsWith,
	toArray,
	forEachEntry,
	matchAll,
	isHTMLForm,
	hasOwnProperty,
	hasOwnProp: hasOwnProperty,
	reduceDescriptors,
	freezeMethods,
	toObjectSet,
	toCamelCase,
	noop,
	toFiniteNumber,
	findKey,
	global: _global,
	isContextDefined,
	isSpecCompliantForm,
	toJSONObject,
	isAsyncFn,
	isThenable,
	setImmediate: _setImmediate,
	asap,
	isIterable
};
var ignoreDuplicateOf = utils_default.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]);
var parseHeaders_default = (rawHeaders) => {
	const parsed = {};
	let key;
	let val;
	let i;
	rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
		i = line.indexOf(":");
		key = line.substring(0, i).trim().toLowerCase();
		val = line.substring(i + 1).trim();
		if (!key || parsed[key] && ignoreDuplicateOf[key]) return;
		if (key === "set-cookie") if (parsed[key]) parsed[key].push(val);
		else parsed[key] = [val];
		else parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
	});
	return parsed;
};
var $internals = Symbol("internals");
var INVALID_HEADER_VALUE_CHARS_RE = /[^\x09\x20-\x7E\x80-\xFF]/g;
function trimSPorHTAB(str) {
	let start = 0;
	let end = str.length;
	while (start < end) {
		const code = str.charCodeAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === str.length ? str : str.slice(start, end);
}
function normalizeHeader(header) {
	return header && String(header).trim().toLowerCase();
}
function sanitizeHeaderValue(str) {
	return trimSPorHTAB(str.replace(INVALID_HEADER_VALUE_CHARS_RE, ""));
}
function normalizeValue(value) {
	if (value === false || value == null) return value;
	return utils_default.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}
function parseTokens(str) {
	const tokens = Object.create(null);
	const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let match;
	while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
	return tokens;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	if (utils_default.isFunction(filter)) return filter.call(this, value, header);
	if (isHeaderNameFilter) value = header;
	if (!utils_default.isString(value)) return;
	if (utils_default.isString(filter)) return value.indexOf(filter) !== -1;
	if (utils_default.isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
	return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
		return char.toUpperCase() + str;
	});
}
function buildAccessors(obj, header) {
	const accessorName = utils_default.toCamelCase(" " + header);
	[
		"get",
		"set",
		"has"
	].forEach((methodName) => {
		Object.defineProperty(obj, methodName + accessorName, {
			__proto__: null,
			value: function(arg1, arg2, arg3) {
				return this[methodName].call(this, header, arg1, arg2, arg3);
			},
			configurable: true
		});
	});
}
var AxiosHeaders$1 = class {
	constructor(headers) {
		headers && this.set(headers);
	}
	set(header, valueOrRewrite, rewrite) {
		const self$1 = this;
		function setHeader(_value, _header, _rewrite) {
			const lHeader = normalizeHeader(_header);
			if (!lHeader) throw new Error("header name must be a non-empty string");
			const key = utils_default.findKey(self$1, lHeader);
			if (!key || self$1[key] === void 0 || _rewrite === true || _rewrite === void 0 && self$1[key] !== false) self$1[key || _header] = normalizeValue(_value);
		}
		const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
		if (utils_default.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
		else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders_default(header), valueOrRewrite);
		else if (utils_default.isObject(header) && utils_default.isIterable(header)) {
			let obj = {}, dest, key;
			for (const entry of header) {
				if (!utils_default.isArray(entry)) throw TypeError("Object iterator must return a key-value pair");
				obj[key = entry[0]] = (dest = obj[key]) ? utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
			}
			setHeaders(obj, valueOrRewrite);
		} else header != null && setHeader(valueOrRewrite, header, rewrite);
		return this;
	}
	get(header, parser) {
		header = normalizeHeader(header);
		if (header) {
			const key = utils_default.findKey(this, header);
			if (key) {
				const value = this[key];
				if (!parser) return value;
				if (parser === true) return parseTokens(value);
				if (utils_default.isFunction(parser)) return parser.call(this, value, key);
				if (utils_default.isRegExp(parser)) return parser.exec(value);
				throw new TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(header, matcher) {
		header = normalizeHeader(header);
		if (header) {
			const key = utils_default.findKey(this, header);
			return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
		}
		return false;
	}
	delete(header, matcher) {
		const self$1 = this;
		let deleted = false;
		function deleteHeader(_header) {
			_header = normalizeHeader(_header);
			if (_header) {
				const key = utils_default.findKey(self$1, _header);
				if (key && (!matcher || matchHeaderValue(self$1, self$1[key], key, matcher))) {
					delete self$1[key];
					deleted = true;
				}
			}
		}
		if (utils_default.isArray(header)) header.forEach(deleteHeader);
		else deleteHeader(header);
		return deleted;
	}
	clear(matcher) {
		const keys = Object.keys(this);
		let i = keys.length;
		let deleted = false;
		while (i--) {
			const key = keys[i];
			if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
				delete this[key];
				deleted = true;
			}
		}
		return deleted;
	}
	normalize(format) {
		const self$1 = this;
		const headers = {};
		utils_default.forEach(this, (value, header) => {
			const key = utils_default.findKey(headers, header);
			if (key) {
				self$1[key] = normalizeValue(value);
				delete self$1[header];
				return;
			}
			const normalized = format ? formatHeader(header) : String(header).trim();
			if (normalized !== header) delete self$1[header];
			self$1[normalized] = normalizeValue(value);
			headers[normalized] = true;
		});
		return this;
	}
	concat(...targets) {
		return this.constructor.concat(this, ...targets);
	}
	toJSON(asStrings) {
		const obj = Object.create(null);
		utils_default.forEach(this, (value, header) => {
			value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
		});
		return obj;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
	}
	getSetCookie() {
		return this.get("set-cookie") || [];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(thing) {
		return thing instanceof this ? thing : new this(thing);
	}
	static concat(first, ...targets) {
		const computed = new this(first);
		targets.forEach((target) => computed.set(target));
		return computed;
	}
	static accessor(header) {
		const accessors = (this[$internals] = this[$internals] = { accessors: {} }).accessors;
		const prototype$1 = this.prototype;
		function defineAccessor(_header) {
			const lHeader = normalizeHeader(_header);
			if (!accessors[lHeader]) {
				buildAccessors(prototype$1, _header);
				accessors[lHeader] = true;
			}
		}
		utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
		return this;
	}
};
AxiosHeaders$1.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]);
utils_default.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
	let mapped = key[0].toUpperCase() + key.slice(1);
	return {
		get: () => value,
		set(headerValue) {
			this[mapped] = headerValue;
		}
	};
});
utils_default.freezeMethods(AxiosHeaders$1);
var AxiosHeaders_default = AxiosHeaders$1;
var REDACTED = "[REDACTED ****]";
function hasOwnOrPrototypeToJSON(source) {
	if (utils_default.hasOwnProp(source, "toJSON")) return true;
	let prototype$1 = Object.getPrototypeOf(source);
	while (prototype$1 && prototype$1 !== Object.prototype) {
		if (utils_default.hasOwnProp(prototype$1, "toJSON")) return true;
		prototype$1 = Object.getPrototypeOf(prototype$1);
	}
	return false;
}
function redactConfig(config, redactKeys) {
	const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
	const seen = [];
	const visit = (source) => {
		if (source === null || typeof source !== "object") return source;
		if (utils_default.isBuffer(source)) return source;
		if (seen.indexOf(source) !== -1) return void 0;
		if (source instanceof AxiosHeaders_default) source = source.toJSON();
		seen.push(source);
		let result;
		if (utils_default.isArray(source)) {
			result = [];
			source.forEach((v, i) => {
				const reducedValue = visit(v);
				if (!utils_default.isUndefined(reducedValue)) result[i] = reducedValue;
			});
		} else {
			if (!utils_default.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
				seen.pop();
				return source;
			}
			result = Object.create(null);
			for (const [key, value] of Object.entries(source)) {
				const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
				if (!utils_default.isUndefined(reducedValue)) result[key] = reducedValue;
			}
		}
		seen.pop();
		return result;
	};
	return visit(config);
}
var AxiosError$1 = class AxiosError$1 extends Error {
	static from(error, code, config, request, response, customProps) {
		const axiosError = new AxiosError$1(error.message, code || error.code, config, request, response);
		axiosError.cause = error;
		axiosError.name = error.name;
		if (error.status != null && axiosError.status == null) axiosError.status = error.status;
		customProps && Object.assign(axiosError, customProps);
		return axiosError;
	}
	constructor(message, code, config, request, response) {
		super(message);
		Object.defineProperty(this, "message", {
			__proto__: null,
			value: message,
			enumerable: true,
			writable: true,
			configurable: true
		});
		this.name = "AxiosError";
		this.isAxiosError = true;
		code && (this.code = code);
		config && (this.config = config);
		request && (this.request = request);
		if (response) {
			this.response = response;
			this.status = response.status;
		}
	}
	toJSON() {
		const config = this.config;
		const redactKeys = config && utils_default.hasOwnProp(config, "redact") ? config.redact : void 0;
		const serializedConfig = utils_default.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils_default.toJSONObject(config);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: serializedConfig,
			code: this.code,
			status: this.status
		};
	}
};
AxiosError$1.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError$1.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError$1.ECONNABORTED = "ECONNABORTED";
AxiosError$1.ETIMEDOUT = "ETIMEDOUT";
AxiosError$1.ECONNREFUSED = "ECONNREFUSED";
AxiosError$1.ERR_NETWORK = "ERR_NETWORK";
AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError$1.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError$1.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError$1.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError$1.ERR_CANCELED = "ERR_CANCELED";
AxiosError$1.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError$1.ERR_INVALID_URL = "ERR_INVALID_URL";
AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
var AxiosError_default = AxiosError$1;
function isVisitable(thing) {
	return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
function removeBrackets(key) {
	return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
	if (!path) return key;
	return path.concat(key).map(function each(token, i) {
		token = removeBrackets(token);
		return !dots && i ? "[" + token + "]" : token;
	}).join(dots ? "." : "");
}
function isFlatArray(arr) {
	return utils_default.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
	return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
	if (!utils_default.isObject(obj)) throw new TypeError("target must be an object");
	formData = formData || new FormData();
	options = utils_default.toFlatObject(options, {
		metaTokens: true,
		dots: false,
		indexes: false
	}, false, function defined(option, source) {
		return !utils_default.isUndefined(source[option]);
	});
	const metaTokens = options.metaTokens;
	const visitor = options.visitor || defaultVisitor;
	const dots = options.dots;
	const indexes = options.indexes;
	const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
	const maxDepth = options.maxDepth === void 0 ? 100 : options.maxDepth;
	const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
	if (!utils_default.isFunction(visitor)) throw new TypeError("visitor must be a function");
	function convertValue(value) {
		if (value === null) return "";
		if (utils_default.isDate(value)) return value.toISOString();
		if (utils_default.isBoolean(value)) return value.toString();
		if (!useBlob && utils_default.isBlob(value)) throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
		if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
		return value;
	}
	function defaultVisitor(value, key, path) {
		let arr = value;
		if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
			formData.append(renderKey(path, key, dots), convertValue(value));
			return false;
		}
		if (value && !path && typeof value === "object") {
			if (utils_default.endsWith(key, "{}")) {
				key = metaTokens ? key : key.slice(0, -2);
				value = JSON.stringify(value);
			} else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
				key = removeBrackets(key);
				arr.forEach(function each(el, index) {
					!(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
				});
				return false;
			}
		}
		if (isVisitable(value)) return true;
		formData.append(renderKey(path, key, dots), convertValue(value));
		return false;
	}
	const stack = [];
	const exposedHelpers = Object.assign(predicates, {
		defaultVisitor,
		convertValue,
		isVisitable
	});
	function build(value, path, depth = 0) {
		if (utils_default.isUndefined(value)) return;
		if (depth > maxDepth) throw new AxiosError_default("Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth, AxiosError_default.ERR_FORM_DATA_DEPTH_EXCEEDED);
		if (stack.indexOf(value) !== -1) throw Error("Circular reference detected in " + path.join("."));
		stack.push(value);
		utils_default.forEach(value, function each(el, key) {
			if ((!(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers)) === true) build(el, path ? path.concat(key) : [key], depth + 1);
		});
		stack.pop();
	}
	if (!utils_default.isObject(obj)) throw new TypeError("data must be an object");
	build(obj);
	return formData;
}
var toFormData_default = toFormData$1;
function encode$1(str) {
	const charMap = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
		return charMap[match];
	});
}
function AxiosURLSearchParams(params, options) {
	this._pairs = [];
	params && toFormData_default(params, this, options);
}
var prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
	this._pairs.push([name, value]);
};
prototype.toString = function toString$1(encoder) {
	const _encode = encoder ? function(value) {
		return encoder.call(this, value, encode$1);
	} : encode$1;
	return this._pairs.map(function each(pair) {
		return _encode(pair[0]) + "=" + _encode(pair[1]);
	}, "").join("&");
};
var AxiosURLSearchParams_default = AxiosURLSearchParams;
function encode(val) {
	return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
	if (!params) return url;
	const _encode = options && options.encode || encode;
	const _options = utils_default.isFunction(options) ? { serialize: options } : options;
	const serializeFn = _options && _options.serialize;
	let serializedParams;
	if (serializeFn) serializedParams = serializeFn(params, _options);
	else serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, _options).toString(_encode);
	if (serializedParams) {
		const hashmarkIndex = url.indexOf("#");
		if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
		url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
	}
	return url;
}
var InterceptorManager = class {
	constructor() {
		this.handlers = [];
	}
	use(fulfilled, rejected, options) {
		this.handlers.push({
			fulfilled,
			rejected,
			synchronous: options ? options.synchronous : false,
			runWhen: options ? options.runWhen : null
		});
		return this.handlers.length - 1;
	}
	eject(id) {
		if (this.handlers[id]) this.handlers[id] = null;
	}
	clear() {
		if (this.handlers) this.handlers = [];
	}
	forEach(fn) {
		utils_default.forEach(this.handlers, function forEachHandler(h) {
			if (h !== null) fn(h);
		});
	}
};
var InterceptorManager_default = InterceptorManager;
var transitional_default = {
	silentJSONParsing: true,
	forcedJSONParsing: true,
	clarifyTimeoutError: false,
	legacyInterceptorReqResOrdering: true
};
var browser_default = {
	isBrowser: true,
	classes: {
		URLSearchParams: typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default,
		FormData: typeof FormData !== "undefined" ? FormData : null,
		Blob: typeof Blob !== "undefined" ? Blob : null
	},
	protocols: [
		"http",
		"https",
		"file",
		"blob",
		"url",
		"data"
	]
};
var utils_exports = /* @__PURE__ */ __export({
	hasBrowserEnv: () => hasBrowserEnv,
	hasStandardBrowserEnv: () => hasStandardBrowserEnv,
	hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
	navigator: () => _navigator,
	origin: () => origin
}, 1);
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || void 0;
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(_navigator.product) < 0);
var hasStandardBrowserWebWorkerEnv = (() => {
	return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";
var platform_default = {
	...utils_exports,
	...browser_default
};
function toURLEncodedForm(data, options) {
	return toFormData_default(data, new platform_default.classes.URLSearchParams(), {
		visitor: function(value, key, path, helpers) {
			if (platform_default.isNode && utils_default.isBuffer(value)) {
				this.append(key, value.toString("base64"));
				return false;
			}
			return helpers.defaultVisitor.apply(this, arguments);
		},
		...options
	});
}
function parsePropPath(name) {
	return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
		return match[0] === "[]" ? "" : match[1] || match[0];
	});
}
function arrayToObject(arr) {
	const obj = {};
	const keys = Object.keys(arr);
	let i;
	const len = keys.length;
	let key;
	for (i = 0; i < len; i++) {
		key = keys[i];
		obj[key] = arr[key];
	}
	return obj;
}
function formDataToJSON(formData) {
	function buildPath(path, value, target, index) {
		let name = path[index++];
		if (name === "__proto__") return true;
		const isNumericKey = Number.isFinite(+name);
		const isLast = index >= path.length;
		name = !name && utils_default.isArray(target) ? target.length : name;
		if (isLast) {
			if (utils_default.hasOwnProp(target, name)) target[name] = utils_default.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
			else target[name] = value;
			return !isNumericKey;
		}
		if (!target[name] || !utils_default.isObject(target[name])) target[name] = [];
		if (buildPath(path, value, target[name], index) && utils_default.isArray(target[name])) target[name] = arrayToObject(target[name]);
		return !isNumericKey;
	}
	if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
		const obj = {};
		utils_default.forEachEntry(formData, (name, value) => {
			buildPath(parsePropPath(name), value, obj, 0);
		});
		return obj;
	}
	return null;
}
var formDataToJSON_default = formDataToJSON;
var own = (obj, key) => obj != null && utils_default.hasOwnProp(obj, key) ? obj[key] : void 0;
function stringifySafely(rawValue, parser, encoder) {
	if (utils_default.isString(rawValue)) try {
		(parser || JSON.parse)(rawValue);
		return utils_default.trim(rawValue);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
	transitional: transitional_default,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function transformRequest(data, headers) {
		const contentType = headers.getContentType() || "";
		const hasJSONContentType = contentType.indexOf("application/json") > -1;
		const isObjectPayload = utils_default.isObject(data);
		if (isObjectPayload && utils_default.isHTMLForm(data)) data = new FormData(data);
		if (utils_default.isFormData(data)) return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
		if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) return data;
		if (utils_default.isArrayBufferView(data)) return data.buffer;
		if (utils_default.isURLSearchParams(data)) {
			headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
			return data.toString();
		}
		let isFileList$1;
		if (isObjectPayload) {
			const formSerializer = own(this, "formSerializer");
			if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, formSerializer).toString();
			if ((isFileList$1 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
				const env = own(this, "env");
				const _FormData = env && env.FormData;
				return toFormData_default(isFileList$1 ? { "files[]": data } : data, _FormData && new _FormData(), formSerializer);
			}
		}
		if (isObjectPayload || hasJSONContentType) {
			headers.setContentType("application/json", false);
			return stringifySafely(data);
		}
		return data;
	}],
	transformResponse: [function transformResponse(data) {
		const transitional = own(this, "transitional") || defaults.transitional;
		const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
		const responseType = own(this, "responseType");
		const JSONRequested = responseType === "json";
		if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) return data;
		if (data && utils_default.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
			const strictJSONParsing = !(transitional && transitional.silentJSONParsing) && JSONRequested;
			try {
				return JSON.parse(data, own(this, "parseReviver"));
			} catch (e) {
				if (strictJSONParsing) {
					if (e.name === "SyntaxError") throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, own(this, "response"));
					throw e;
				}
			}
		}
		return data;
	}],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: platform_default.classes.FormData,
		Blob: platform_default.classes.Blob
	},
	validateStatus: function validateStatus(status) {
		return status >= 200 && status < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
utils_default.forEach([
	"delete",
	"get",
	"head",
	"post",
	"put",
	"patch",
	"query"
], (method) => {
	defaults.headers[method] = {};
});
var defaults_default = defaults;
function transformData(fns, response) {
	const config = this || defaults_default;
	const context = response || config;
	const headers = AxiosHeaders_default.from(context.headers);
	let data = context.data;
	utils_default.forEach(fns, function transform(fn) {
		data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
	});
	headers.normalize();
	return data;
}
function isCancel$1(value) {
	return !!(value && value.__CANCEL__);
}
var CanceledError$1 = class extends AxiosError_default {
	constructor(message, config, request) {
		super(message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
		this.name = "CanceledError";
		this.__CANCEL__ = true;
	}
};
var CanceledError_default = CanceledError$1;
function settle(resolve, reject, response) {
	const validateStatus = response.config.validateStatus;
	if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
	else reject(new AxiosError_default("Request failed with status code " + response.status, response.status >= 400 && response.status < 500 ? AxiosError_default.ERR_BAD_REQUEST : AxiosError_default.ERR_BAD_RESPONSE, response.config, response.request, response));
}
function parseProtocol(url) {
	const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
	return match && match[1] || "";
}
function speedometer(samplesCount, min) {
	samplesCount = samplesCount || 10;
	const bytes = new Array(samplesCount);
	const timestamps = new Array(samplesCount);
	let head = 0;
	let tail = 0;
	let firstSampleTS;
	min = min !== void 0 ? min : 1e3;
	return function push(chunkLength) {
		const now = Date.now();
		const startedAt = timestamps[tail];
		if (!firstSampleTS) firstSampleTS = now;
		bytes[head] = chunkLength;
		timestamps[head] = now;
		let i = tail;
		let bytesCount = 0;
		while (i !== head) {
			bytesCount += bytes[i++];
			i = i % samplesCount;
		}
		head = (head + 1) % samplesCount;
		if (head === tail) tail = (tail + 1) % samplesCount;
		if (now - firstSampleTS < min) return;
		const passed = startedAt && now - startedAt;
		return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
	};
}
var speedometer_default = speedometer;
function throttle(fn, freq) {
	let timestamp = 0;
	let threshold = 1e3 / freq;
	let lastArgs;
	let timer;
	const invoke = (args, now = Date.now()) => {
		timestamp = now;
		lastArgs = null;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		fn(...args);
	};
	const throttled = (...args) => {
		const now = Date.now();
		const passed = now - timestamp;
		if (passed >= threshold) invoke(args, now);
		else {
			lastArgs = args;
			if (!timer) timer = setTimeout(() => {
				timer = null;
				invoke(lastArgs);
			}, threshold - passed);
		}
	};
	const flush = () => lastArgs && invoke(lastArgs);
	return [throttled, flush];
}
var throttle_default = throttle;
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
	let bytesNotified = 0;
	const _speedometer = speedometer_default(50, 250);
	return throttle_default((e) => {
		const rawLoaded = e.loaded;
		const total = e.lengthComputable ? e.total : void 0;
		const loaded = total != null ? Math.min(rawLoaded, total) : rawLoaded;
		const progressBytes = Math.max(0, loaded - bytesNotified);
		const rate = _speedometer(progressBytes);
		bytesNotified = Math.max(bytesNotified, loaded);
		listener({
			loaded,
			total,
			progress: total ? loaded / total : void 0,
			bytes: progressBytes,
			rate: rate ? rate : void 0,
			estimated: rate && total ? (total - loaded) / rate : void 0,
			event: e,
			lengthComputable: total != null,
			[isDownloadStream ? "download" : "upload"]: true
		});
	}, freq);
};
const progressEventDecorator = (total, throttled) => {
	const lengthComputable = total != null;
	return [(loaded) => throttled[0]({
		lengthComputable,
		total,
		loaded
	}), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? ((origin$1, isMSIE) => (url) => {
	url = new URL(url, platform_default.origin);
	return origin$1.protocol === url.protocol && origin$1.host === url.host && (isMSIE || origin$1.port === url.port);
})(new URL(platform_default.origin), platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)) : () => true;
var cookies_default = platform_default.hasStandardBrowserEnv ? {
	write(name, value, expires, path, domain, secure, sameSite) {
		if (typeof document === "undefined") return;
		const cookie = [`${name}=${encodeURIComponent(value)}`];
		if (utils_default.isNumber(expires)) cookie.push(`expires=${new Date(expires).toUTCString()}`);
		if (utils_default.isString(path)) cookie.push(`path=${path}`);
		if (utils_default.isString(domain)) cookie.push(`domain=${domain}`);
		if (secure === true) cookie.push("secure");
		if (utils_default.isString(sameSite)) cookie.push(`SameSite=${sameSite}`);
		document.cookie = cookie.join("; ");
	},
	read(name) {
		if (typeof document === "undefined") return null;
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].replace(/^\s+/, "");
			const eq = cookie.indexOf("=");
			if (eq !== -1 && cookie.slice(0, eq) === name) return decodeURIComponent(cookie.slice(eq + 1));
		}
		return null;
	},
	remove(name) {
		this.write(name, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
};
function isAbsoluteURL(url) {
	if (typeof url !== "string") return false;
	return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
	return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
	let isRelativeUrl = !isAbsoluteURL(requestedURL);
	if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) return combineURLs(baseURL, requestedURL);
	return requestedURL;
}
var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
	config2 = config2 || {};
	const config = Object.create(null);
	Object.defineProperty(config, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: false,
		writable: true,
		configurable: true
	});
	function getMergedValue(target, source, prop, caseless) {
		if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) return utils_default.merge.call({ caseless }, target, source);
		else if (utils_default.isPlainObject(source)) return utils_default.merge({}, source);
		else if (utils_default.isArray(source)) return source.slice();
		return source;
	}
	function mergeDeepProperties(a, b, prop, caseless) {
		if (!utils_default.isUndefined(b)) return getMergedValue(a, b, prop, caseless);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a, prop, caseless);
	}
	function valueFromConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
	}
	function defaultToConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a);
	}
	function mergeDirectKeys(a, b, prop) {
		if (utils_default.hasOwnProp(config2, prop)) return getMergedValue(a, b);
		else if (utils_default.hasOwnProp(config1, prop)) return getMergedValue(void 0, a);
	}
	const mergeMap = {
		url: valueFromConfig2,
		method: valueFromConfig2,
		data: valueFromConfig2,
		baseURL: defaultToConfig2,
		transformRequest: defaultToConfig2,
		transformResponse: defaultToConfig2,
		paramsSerializer: defaultToConfig2,
		timeout: defaultToConfig2,
		timeoutMessage: defaultToConfig2,
		withCredentials: defaultToConfig2,
		withXSRFToken: defaultToConfig2,
		adapter: defaultToConfig2,
		responseType: defaultToConfig2,
		xsrfCookieName: defaultToConfig2,
		xsrfHeaderName: defaultToConfig2,
		onUploadProgress: defaultToConfig2,
		onDownloadProgress: defaultToConfig2,
		decompress: defaultToConfig2,
		maxContentLength: defaultToConfig2,
		maxBodyLength: defaultToConfig2,
		beforeRedirect: defaultToConfig2,
		transport: defaultToConfig2,
		httpAgent: defaultToConfig2,
		httpsAgent: defaultToConfig2,
		cancelToken: defaultToConfig2,
		socketPath: defaultToConfig2,
		allowedSocketPaths: defaultToConfig2,
		responseEncoding: defaultToConfig2,
		validateStatus: mergeDirectKeys,
		headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
	};
	utils_default.forEach(Object.keys({
		...config1,
		...config2
	}), function computeConfigValue(prop) {
		if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
		const merge$1 = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
		const configValue = merge$1(utils_default.hasOwnProp(config1, prop) ? config1[prop] : void 0, utils_default.hasOwnProp(config2, prop) ? config2[prop] : void 0, prop);
		utils_default.isUndefined(configValue) && merge$1 !== mergeDirectKeys || (config[prop] = configValue);
	});
	return config;
}
var FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
function setFormDataHeaders(headers, formHeaders, policy) {
	if (policy !== "content-only") {
		headers.set(formHeaders);
		return;
	}
	Object.entries(formHeaders).forEach(([key, val]) => {
		if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) headers.set(key, val);
	});
}
var encodeUTF8 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
var resolveConfig_default = (config) => {
	const newConfig = mergeConfig$1({}, config);
	const own$1 = (key) => utils_default.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
	const data = own$1("data");
	let withXSRFToken = own$1("withXSRFToken");
	const xsrfHeaderName = own$1("xsrfHeaderName");
	const xsrfCookieName = own$1("xsrfCookieName");
	let headers = own$1("headers");
	const auth = own$1("auth");
	const baseURL = own$1("baseURL");
	const allowAbsoluteUrls = own$1("allowAbsoluteUrls");
	const url = own$1("url");
	newConfig.headers = headers = AxiosHeaders_default.from(headers);
	newConfig.url = buildURL(buildFullPath(baseURL, url, allowAbsoluteUrls), config.params, config.paramsSerializer);
	if (auth) headers.set("Authorization", "Basic " + btoa((auth.username || "") + ":" + (auth.password ? encodeUTF8(auth.password) : "")));
	if (utils_default.isFormData(data)) {
		if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) headers.setContentType(void 0);
		else if (utils_default.isFunction(data.getHeaders)) setFormDataHeaders(headers, data.getHeaders(), own$1("formDataHeaderPolicy"));
	}
	if (platform_default.hasStandardBrowserEnv) {
		if (utils_default.isFunction(withXSRFToken)) withXSRFToken = withXSRFToken(newConfig);
		if (withXSRFToken === true || withXSRFToken == null && isURLSameOrigin_default(newConfig.url)) {
			const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
			if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
		}
	}
	return newConfig;
};
var xhr_default = typeof XMLHttpRequest !== "undefined" && function(config) {
	return new Promise(function dispatchXhrRequest(resolve, reject) {
		const _config = resolveConfig_default(config);
		let requestData = _config.data;
		const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
		let { responseType, onUploadProgress, onDownloadProgress } = _config;
		let onCanceled;
		let uploadThrottled, downloadThrottled;
		let flushUpload, flushDownload;
		function done() {
			flushUpload && flushUpload();
			flushDownload && flushDownload();
			_config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
			_config.signal && _config.signal.removeEventListener("abort", onCanceled);
		}
		let request = new XMLHttpRequest();
		request.open(_config.method.toUpperCase(), _config.url, true);
		request.timeout = _config.timeout;
		function onloadend() {
			if (!request) return;
			const responseHeaders = AxiosHeaders_default.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
			settle(function _resolve(value) {
				resolve(value);
				done();
			}, function _reject(err) {
				reject(err);
				done();
			}, {
				data: !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response,
				status: request.status,
				statusText: request.statusText,
				headers: responseHeaders,
				config,
				request
			});
			request = null;
		}
		if ("onloadend" in request) request.onloadend = onloadend;
		else request.onreadystatechange = function handleLoad() {
			if (!request || request.readyState !== 4) return;
			if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) return;
			setTimeout(onloadend);
		};
		request.onabort = function handleAbort() {
			if (!request) return;
			reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
			done();
			request = null;
		};
		request.onerror = function handleError(event) {
			const err = new AxiosError_default(event && event.message ? event.message : "Network Error", AxiosError_default.ERR_NETWORK, config, request);
			err.event = event || null;
			reject(err);
			done();
			request = null;
		};
		request.ontimeout = function handleTimeout() {
			let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
			const transitional = _config.transitional || transitional_default;
			if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
			reject(new AxiosError_default(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED, config, request));
			done();
			request = null;
		};
		requestData === void 0 && requestHeaders.setContentType(null);
		if ("setRequestHeader" in request) utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
			request.setRequestHeader(key, val);
		});
		if (!utils_default.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
		if (responseType && responseType !== "json") request.responseType = _config.responseType;
		if (onDownloadProgress) {
			[downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
			request.addEventListener("progress", downloadThrottled);
		}
		if (onUploadProgress && request.upload) {
			[uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
			request.upload.addEventListener("progress", uploadThrottled);
			request.upload.addEventListener("loadend", flushUpload);
		}
		if (_config.cancelToken || _config.signal) {
			onCanceled = (cancel) => {
				if (!request) return;
				reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
				request.abort();
				done();
				request = null;
			};
			_config.cancelToken && _config.cancelToken.subscribe(onCanceled);
			if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
		}
		const protocol = parseProtocol(_config.url);
		if (protocol && !platform_default.protocols.includes(protocol)) {
			reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
			return;
		}
		request.send(requestData || null);
	});
};
var composeSignals = (signals, timeout) => {
	const { length } = signals = signals ? signals.filter(Boolean) : [];
	if (timeout || length) {
		let controller = new AbortController();
		let aborted;
		const onabort = function(reason) {
			if (!aborted) {
				aborted = true;
				unsubscribe();
				const err = reason instanceof Error ? reason : this.reason;
				controller.abort(err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err));
			}
		};
		let timer = timeout && setTimeout(() => {
			timer = null;
			onabort(new AxiosError_default(`timeout of ${timeout}ms exceeded`, AxiosError_default.ETIMEDOUT));
		}, timeout);
		const unsubscribe = () => {
			if (signals) {
				timer && clearTimeout(timer);
				timer = null;
				signals.forEach((signal$1) => {
					signal$1.unsubscribe ? signal$1.unsubscribe(onabort) : signal$1.removeEventListener("abort", onabort);
				});
				signals = null;
			}
		};
		signals.forEach((signal$1) => signal$1.addEventListener("abort", onabort));
		const { signal } = controller;
		signal.unsubscribe = () => utils_default.asap(unsubscribe);
		return signal;
	}
};
var composeSignals_default = composeSignals;
const streamChunk = function* (chunk, chunkSize) {
	let len = chunk.byteLength;
	if (!chunkSize || len < chunkSize) {
		yield chunk;
		return;
	}
	let pos = 0;
	let end;
	while (pos < len) {
		end = pos + chunkSize;
		yield chunk.slice(pos, end);
		pos = end;
	}
};
const readBytes = async function* (iterable, chunkSize) {
	for await (const chunk of readStream(iterable)) yield* streamChunk(chunk, chunkSize);
};
var readStream = async function* (stream) {
	if (stream[Symbol.asyncIterator]) {
		yield* stream;
		return;
	}
	const reader = stream.getReader();
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			yield value;
		}
	} finally {
		await reader.cancel();
	}
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
	const iterator$1 = readBytes(stream, chunkSize);
	let bytes = 0;
	let done;
	let _onFinish = (e) => {
		if (!done) {
			done = true;
			onFinish && onFinish(e);
		}
	};
	return new ReadableStream({
		async pull(controller) {
			try {
				const { done: done$1, value } = await iterator$1.next();
				if (done$1) {
					_onFinish();
					controller.close();
					return;
				}
				let len = value.byteLength;
				if (onProgress) onProgress(bytes += len);
				controller.enqueue(new Uint8Array(value));
			} catch (err) {
				_onFinish(err);
				throw err;
			}
		},
		cancel(reason) {
			_onFinish(reason);
			return iterator$1.return();
		}
	}, { highWaterMark: 2 });
};
function estimateDataURLDecodedBytes(url) {
	if (!url || typeof url !== "string") return 0;
	if (!url.startsWith("data:")) return 0;
	const comma = url.indexOf(",");
	if (comma < 0) return 0;
	const meta = url.slice(5, comma);
	const body = url.slice(comma + 1);
	if (/;base64/i.test(meta)) {
		let effectiveLen = body.length;
		const len = body.length;
		for (let i = 0; i < len; i++) if (body.charCodeAt(i) === 37 && i + 2 < len) {
			const a = body.charCodeAt(i + 1);
			const b = body.charCodeAt(i + 2);
			if ((a >= 48 && a <= 57 || a >= 65 && a <= 70 || a >= 97 && a <= 102) && (b >= 48 && b <= 57 || b >= 65 && b <= 70 || b >= 97 && b <= 102)) {
				effectiveLen -= 2;
				i += 2;
			}
		}
		let pad = 0;
		let idx = len - 1;
		const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && body.charCodeAt(j - 1) === 51 && (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
		if (idx >= 0) {
			if (body.charCodeAt(idx) === 61) {
				pad++;
				idx--;
			} else if (tailIsPct3D(idx)) {
				pad++;
				idx -= 3;
			}
		}
		if (pad === 1 && idx >= 0) {
			if (body.charCodeAt(idx) === 61) pad++;
			else if (tailIsPct3D(idx)) pad++;
		}
		const bytes$1 = Math.floor(effectiveLen / 4) * 3 - (pad || 0);
		return bytes$1 > 0 ? bytes$1 : 0;
	}
	if (typeof Buffer !== "undefined" && typeof Buffer.byteLength === "function") return Buffer.byteLength(body, "utf8");
	let bytes = 0;
	for (let i = 0, len = body.length; i < len; i++) {
		const c = body.charCodeAt(i);
		if (c < 128) bytes += 1;
		else if (c < 2048) bytes += 2;
		else if (c >= 55296 && c <= 56319 && i + 1 < len) {
			const next = body.charCodeAt(i + 1);
			if (next >= 56320 && next <= 57343) {
				bytes += 4;
				i++;
			} else bytes += 3;
		} else bytes += 3;
	}
	return bytes;
}
const VERSION$1 = "1.16.0";
var DEFAULT_CHUNK_SIZE = 64 * 1024;
var { isFunction } = utils_default;
var test = (fn, ...args) => {
	try {
		return !!fn(...args);
	} catch (e) {
		return false;
	}
};
var factory = (env) => {
	const globalObject = utils_default.global ?? globalThis;
	const { ReadableStream: ReadableStream$1, TextEncoder } = globalObject;
	env = utils_default.merge.call({ skipUndefined: true }, {
		Request: globalObject.Request,
		Response: globalObject.Response
	}, env);
	const { fetch: envFetch, Request, Response } = env;
	const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
	const isRequestSupported = isFunction(Request);
	const isResponseSupported = isFunction(Response);
	if (!isFetchSupported) return false;
	const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
	const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
	const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
		let duplexAccessed = false;
		const request = new Request(platform_default.origin, {
			body: new ReadableStream$1(),
			method: "POST",
			get duplex() {
				duplexAccessed = true;
				return "half";
			}
		});
		const hasContentType = request.headers.has("Content-Type");
		if (request.body != null) request.body.cancel();
		return duplexAccessed && !hasContentType;
	});
	const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
	const resolvers = { stream: supportsResponseStream && ((res) => res.body) };
	isFetchSupported && [
		"text",
		"arrayBuffer",
		"blob",
		"formData",
		"stream"
	].forEach((type) => {
		!resolvers[type] && (resolvers[type] = (res, config) => {
			let method = res && res[type];
			if (method) return method.call(res);
			throw new AxiosError_default(`Response type '${type}' is not supported`, AxiosError_default.ERR_NOT_SUPPORT, config);
		});
	});
	const getBodyLength = async (body) => {
		if (body == null) return 0;
		if (utils_default.isBlob(body)) return body.size;
		if (utils_default.isSpecCompliantForm(body)) return (await new Request(platform_default.origin, {
			method: "POST",
			body
		}).arrayBuffer()).byteLength;
		if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) return body.byteLength;
		if (utils_default.isURLSearchParams(body)) body = body + "";
		if (utils_default.isString(body)) return (await encodeText(body)).byteLength;
	};
	const resolveBodyLength = async (headers, body) => {
		const length = utils_default.toFiniteNumber(headers.getContentLength());
		return length == null ? getBodyLength(body) : length;
	};
	return async (config) => {
		let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions, maxContentLength, maxBodyLength } = resolveConfig_default(config);
		const hasMaxContentLength = utils_default.isNumber(maxContentLength) && maxContentLength > -1;
		const hasMaxBodyLength = utils_default.isNumber(maxBodyLength) && maxBodyLength > -1;
		let _fetch = envFetch || fetch;
		responseType = responseType ? (responseType + "").toLowerCase() : "text";
		let composedSignal = composeSignals_default([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
		let request = null;
		const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
			composedSignal.unsubscribe();
		});
		let requestContentLength;
		try {
			if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
				if (estimateDataURLDecodedBytes(url) > maxContentLength) throw new AxiosError_default("maxContentLength size of " + maxContentLength + " exceeded", AxiosError_default.ERR_BAD_RESPONSE, config, request);
			}
			if (hasMaxBodyLength && method !== "get" && method !== "head") {
				const outboundLength = await resolveBodyLength(headers, data);
				if (typeof outboundLength === "number" && isFinite(outboundLength) && outboundLength > maxBodyLength) throw new AxiosError_default("Request body larger than maxBodyLength limit", AxiosError_default.ERR_BAD_REQUEST, config, request);
			}
			if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
				let _request = new Request(url, {
					method: "POST",
					body: data,
					duplex: "half"
				});
				let contentTypeHeader;
				if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
				if (_request.body) {
					const [onProgress, flush] = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress)));
					data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
				}
			}
			if (!utils_default.isString(withCredentials)) withCredentials = withCredentials ? "include" : "omit";
			const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
			if (utils_default.isFormData(data)) {
				const contentType = headers.getContentType();
				if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) headers.delete("content-type");
			}
			headers.set("User-Agent", "axios/" + VERSION$1, false);
			const resolvedOptions = {
				...fetchOptions,
				signal: composedSignal,
				method: method.toUpperCase(),
				headers: headers.normalize().toJSON(),
				body: data,
				duplex: "half",
				credentials: isCredentialsSupported ? withCredentials : void 0
			};
			request = isRequestSupported && new Request(url, resolvedOptions);
			let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
			if (hasMaxContentLength) {
				const declaredLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
				if (declaredLength != null && declaredLength > maxContentLength) throw new AxiosError_default("maxContentLength size of " + maxContentLength + " exceeded", AxiosError_default.ERR_BAD_RESPONSE, config, request);
			}
			const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
			if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
				const options = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((prop) => {
					options[prop] = response[prop];
				});
				const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
				const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
				let bytesRead = 0;
				const onChunkProgress = (loadedBytes) => {
					if (hasMaxContentLength) {
						bytesRead = loadedBytes;
						if (bytesRead > maxContentLength) throw new AxiosError_default("maxContentLength size of " + maxContentLength + " exceeded", AxiosError_default.ERR_BAD_RESPONSE, config, request);
					}
					onProgress && onProgress(loadedBytes);
				};
				response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
					flush && flush();
					unsubscribe && unsubscribe();
				}), options);
			}
			responseType = responseType || "text";
			let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
			if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
				let materializedSize;
				if (responseData != null) {
					if (typeof responseData.byteLength === "number") materializedSize = responseData.byteLength;
					else if (typeof responseData.size === "number") materializedSize = responseData.size;
					else if (typeof responseData === "string") materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
				}
				if (typeof materializedSize === "number" && materializedSize > maxContentLength) throw new AxiosError_default("maxContentLength size of " + maxContentLength + " exceeded", AxiosError_default.ERR_BAD_RESPONSE, config, request);
			}
			!isStreamResponse && unsubscribe && unsubscribe();
			return await new Promise((resolve, reject) => {
				settle(resolve, reject, {
					data: responseData,
					headers: AxiosHeaders_default.from(response.headers),
					status: response.status,
					statusText: response.statusText,
					config,
					request
				});
			});
		} catch (err) {
			unsubscribe && unsubscribe();
			if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError_default) {
				const canceledError = composedSignal.reason;
				canceledError.config = config;
				request && (canceledError.request = request);
				err !== canceledError && (canceledError.cause = err);
				throw canceledError;
			}
			if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) throw Object.assign(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request, err && err.response), { cause: err.cause || err });
			throw AxiosError_default.from(err, err && err.code, config, request, err && err.response);
		}
	};
};
var seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
	let env = config && config.env || {};
	const { fetch: fetch$1, Request, Response } = env;
	const seeds = [
		Request,
		Response,
		fetch$1
	];
	let i = seeds.length, seed, target, map = seedCache;
	while (i--) {
		seed = seeds[i];
		target = map.get(seed);
		target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
		map = target;
	}
	return target;
};
getFetch();
var knownAdapters = {
	http: null,
	xhr: xhr_default,
	fetch: { get: getFetch }
};
utils_default.forEach(knownAdapters, (fn, value) => {
	if (fn) {
		try {
			Object.defineProperty(fn, "name", {
				__proto__: null,
				value
			});
		} catch (e) {}
		Object.defineProperty(fn, "adapterName", {
			__proto__: null,
			value
		});
	}
});
var renderReason = (reason) => `- ${reason}`;
var isResolvedHandle = (adapter$1) => utils_default.isFunction(adapter$1) || adapter$1 === null || adapter$1 === false;
function getAdapter$1(adapters, config) {
	adapters = utils_default.isArray(adapters) ? adapters : [adapters];
	const { length } = adapters;
	let nameOrAdapter;
	let adapter$1;
	const rejectedReasons = {};
	for (let i = 0; i < length; i++) {
		nameOrAdapter = adapters[i];
		let id;
		adapter$1 = nameOrAdapter;
		if (!isResolvedHandle(nameOrAdapter)) {
			adapter$1 = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
			if (adapter$1 === void 0) throw new AxiosError_default(`Unknown adapter '${id}'`);
		}
		if (adapter$1 && (utils_default.isFunction(adapter$1) || (adapter$1 = adapter$1.get(config)))) break;
		rejectedReasons[id || "#" + i] = adapter$1;
	}
	if (!adapter$1) {
		const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
		throw new AxiosError_default(`There is no suitable adapter to dispatch the request ` + (length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified"), "ERR_NOT_SUPPORT");
	}
	return adapter$1;
}
var adapters_default = {
	getAdapter: getAdapter$1,
	adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
	if (config.cancelToken) config.cancelToken.throwIfRequested();
	if (config.signal && config.signal.aborted) throw new CanceledError_default(null, config);
}
function dispatchRequest(config) {
	throwIfCancellationRequested(config);
	config.headers = AxiosHeaders_default.from(config.headers);
	config.data = transformData.call(config, config.transformRequest);
	if ([
		"post",
		"put",
		"patch"
	].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
	return adapters_default.getAdapter(config.adapter || defaults_default.adapter, config)(config).then(function onAdapterResolution(response) {
		throwIfCancellationRequested(config);
		config.response = response;
		try {
			response.data = transformData.call(config, config.transformResponse, response);
		} finally {
			delete config.response;
		}
		response.headers = AxiosHeaders_default.from(response.headers);
		return response;
	}, function onAdapterRejection(reason) {
		if (!isCancel$1(reason)) {
			throwIfCancellationRequested(config);
			if (reason && reason.response) {
				config.response = reason.response;
				try {
					reason.response.data = transformData.call(config, config.transformResponse, reason.response);
				} finally {
					delete config.response;
				}
				reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
			}
		}
		return Promise.reject(reason);
	});
}
var validators$1 = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((type, i) => {
	validators$1[type] = function validator(thing) {
		return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
	};
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional(validator, version, message) {
	function formatMessage(opt, desc) {
		return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
	}
	return (value, opt, opts) => {
		if (validator === false) throw new AxiosError_default(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError_default.ERR_DEPRECATED);
		if (version && !deprecatedWarnings[opt]) {
			deprecatedWarnings[opt] = true;
			console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
		}
		return validator ? validator(value, opt, opts) : true;
	};
};
validators$1.spelling = function spelling(correctSpelling) {
	return (value, opt) => {
		console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
		return true;
	};
};
function assertOptions(options, schema, allowUnknown) {
	if (typeof options !== "object") throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
	const keys = Object.keys(options);
	let i = keys.length;
	while (i-- > 0) {
		const opt = keys[i];
		const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
		if (validator) {
			const value = options[opt];
			const result = value === void 0 || validator(value, opt, options);
			if (result !== true) throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (allowUnknown !== true) throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
	}
}
var validator_default = {
	assertOptions,
	validators: validators$1
};
var validators = validator_default.validators;
var Axios$1 = class {
	constructor(instanceConfig) {
		this.defaults = instanceConfig || {};
		this.interceptors = {
			request: new InterceptorManager_default(),
			response: new InterceptorManager_default()
		};
	}
	async request(configOrUrl, config) {
		try {
			return await this._request(configOrUrl, config);
		} catch (err) {
			if (err instanceof Error) {
				let dummy = {};
				Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = /* @__PURE__ */ new Error();
				const stack = (() => {
					if (!dummy.stack) return "";
					const firstNewlineIndex = dummy.stack.indexOf("\n");
					return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
				})();
				try {
					if (!err.stack) err.stack = stack;
					else if (stack) {
						const firstNewlineIndex = stack.indexOf("\n");
						const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
						const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
						if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) err.stack += "\n" + stack;
					}
				} catch (e) {}
			}
			throw err;
		}
	}
	_request(configOrUrl, config) {
		if (typeof configOrUrl === "string") {
			config = config || {};
			config.url = configOrUrl;
		} else config = configOrUrl || {};
		config = mergeConfig$1(this.defaults, config);
		const { transitional, paramsSerializer, headers } = config;
		if (transitional !== void 0) validator_default.assertOptions(transitional, {
			silentJSONParsing: validators.transitional(validators.boolean),
			forcedJSONParsing: validators.transitional(validators.boolean),
			clarifyTimeoutError: validators.transitional(validators.boolean),
			legacyInterceptorReqResOrdering: validators.transitional(validators.boolean)
		}, false);
		if (paramsSerializer != null) if (utils_default.isFunction(paramsSerializer)) config.paramsSerializer = { serialize: paramsSerializer };
		else validator_default.assertOptions(paramsSerializer, {
			encode: validators.function,
			serialize: validators.function
		}, true);
		if (config.allowAbsoluteUrls !== void 0) {} else if (this.defaults.allowAbsoluteUrls !== void 0) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
		else config.allowAbsoluteUrls = true;
		validator_default.assertOptions(config, {
			baseUrl: validators.spelling("baseURL"),
			withXsrfToken: validators.spelling("withXSRFToken")
		}, true);
		config.method = (config.method || this.defaults.method || "get").toLowerCase();
		let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
		headers && utils_default.forEach([
			"delete",
			"get",
			"head",
			"post",
			"put",
			"patch",
			"query",
			"common"
		], (method) => {
			delete headers[method];
		});
		config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
		const requestInterceptorChain = [];
		let synchronousRequestInterceptors = true;
		this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
			if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
			synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
			const transitional$1 = config.transitional || transitional_default;
			if (transitional$1 && transitional$1.legacyInterceptorReqResOrdering) requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
			else requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
		});
		const responseInterceptorChain = [];
		this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
			responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
		});
		let promise;
		let i = 0;
		let len;
		if (!synchronousRequestInterceptors) {
			const chain = [dispatchRequest.bind(this), void 0];
			chain.unshift(...requestInterceptorChain);
			chain.push(...responseInterceptorChain);
			len = chain.length;
			promise = Promise.resolve(config);
			while (i < len) promise = promise.then(chain[i++], chain[i++]);
			return promise;
		}
		len = requestInterceptorChain.length;
		let newConfig = config;
		while (i < len) {
			const onFulfilled = requestInterceptorChain[i++];
			const onRejected = requestInterceptorChain[i++];
			try {
				newConfig = onFulfilled(newConfig);
			} catch (error) {
				onRejected.call(this, error);
				break;
			}
		}
		try {
			promise = dispatchRequest.call(this, newConfig);
		} catch (error) {
			return Promise.reject(error);
		}
		i = 0;
		len = responseInterceptorChain.length;
		while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
		return promise;
	}
	getUri(config) {
		config = mergeConfig$1(this.defaults, config);
		return buildURL(buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls), config.params, config.paramsSerializer);
	}
};
utils_default.forEach([
	"delete",
	"get",
	"head",
	"options"
], function forEachMethodNoData(method) {
	Axios$1.prototype[method] = function(url, config) {
		return this.request(mergeConfig$1(config || {}, {
			method,
			url,
			data: (config || {}).data
		}));
	};
});
utils_default.forEach([
	"post",
	"put",
	"patch",
	"query"
], function forEachMethodWithData(method) {
	function generateHTTPMethod(isForm) {
		return function httpMethod(url, data, config) {
			return this.request(mergeConfig$1(config || {}, {
				method,
				headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
				url,
				data
			}));
		};
	}
	Axios$1.prototype[method] = generateHTTPMethod();
	if (method !== "query") Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_default = Axios$1;
var CancelToken_default = class CancelToken$1 {
	constructor(executor) {
		if (typeof executor !== "function") throw new TypeError("executor must be a function.");
		let resolvePromise;
		this.promise = new Promise(function promiseExecutor(resolve) {
			resolvePromise = resolve;
		});
		const token = this;
		this.promise.then((cancel) => {
			if (!token._listeners) return;
			let i = token._listeners.length;
			while (i-- > 0) token._listeners[i](cancel);
			token._listeners = null;
		});
		this.promise.then = (onfulfilled) => {
			let _resolve;
			const promise = new Promise((resolve) => {
				token.subscribe(resolve);
				_resolve = resolve;
			}).then(onfulfilled);
			promise.cancel = function reject() {
				token.unsubscribe(_resolve);
			};
			return promise;
		};
		executor(function cancel(message, config, request) {
			if (token.reason) return;
			token.reason = new CanceledError_default(message, config, request);
			resolvePromise(token.reason);
		});
	}
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	subscribe(listener) {
		if (this.reason) {
			listener(this.reason);
			return;
		}
		if (this._listeners) this._listeners.push(listener);
		else this._listeners = [listener];
	}
	unsubscribe(listener) {
		if (!this._listeners) return;
		const index = this._listeners.indexOf(listener);
		if (index !== -1) this._listeners.splice(index, 1);
	}
	toAbortSignal() {
		const controller = new AbortController();
		const abort = (err) => {
			controller.abort(err);
		};
		this.subscribe(abort);
		controller.signal.unsubscribe = () => this.unsubscribe(abort);
		return controller.signal;
	}
	static source() {
		let cancel;
		return {
			token: new CancelToken$1(function executor(c) {
				cancel = c;
			}),
			cancel
		};
	}
};
function spread$1(callback) {
	return function wrap(arr) {
		return callback.apply(null, arr);
	};
}
function isAxiosError$1(payload) {
	return utils_default.isObject(payload) && payload.isAxiosError === true;
}
var HttpStatusCode$1 = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
	HttpStatusCode$1[value] = key;
});
var HttpStatusCode_default = HttpStatusCode$1;
function createInstance(defaultConfig) {
	const context = new Axios_default(defaultConfig);
	const instance = bind(Axios_default.prototype.request, context);
	utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
	utils_default.extend(instance, context, null, { allOwnKeys: true });
	instance.create = function create$1(instanceConfig) {
		return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
	};
	return instance;
}
var axios = createInstance(defaults_default);
axios.Axios = Axios_default;
axios.CanceledError = CanceledError_default;
axios.CancelToken = CancelToken_default;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData_default;
axios.AxiosError = AxiosError_default;
axios.Cancel = axios.CanceledError;
axios.all = function all$1(promises) {
	return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders_default;
axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode_default;
axios.default = axios;
var axios_default = axios;
var { Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig, create } = axios_default;
function parseJSON(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		return null;
	}
}
function formatErrorMessage(error) {
	if (error instanceof ZodError) return formatZodError(error);
	if (isAxiosError(error)) return formatAxiosError(error);
	const parseResult = AgentServerErrorSchema.safeParse(error);
	if (parseResult.success) return formatAgentServerError(parseResult.data);
	return formatErrorDetails(error);
}
function getErrorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	else return t("error.unknown");
}
function formatErrorMessageWithPrefix(error, prefix) {
	return `${prefix}: ${getErrorMessage(error)}`;
}
const isTimeoutError = (error) => {
	if (error instanceof DOMException && error.name === "TimeoutError") return true;
	const cause = error?.cause;
	if (cause instanceof DOMException && cause.name === "TimeoutError") return true;
	return false;
};
const isAbortError = (error) => {
	if (isTimeoutError(error)) return false;
	const errorMessage = String(error?.message || "");
	if (errorMessage === "Request was aborted.") return true;
	if (error instanceof DOMException && error.name === "AbortError") return true;
	if (error && typeof error === "object" && errorMessage && (errorMessage === "Request was aborted." || errorMessage.includes("signal is aborted without reason"))) return true;
	return false;
};
const formatMcpError = (error) => {
	return error.message;
};
var getBaseError = (error) => {
	return {
		name: error.name ?? null,
		message: error.message ?? null,
		stack: error.stack ?? null,
		cause: error.cause ? String(error.cause) : null
	};
};
var serializeInvalidToolInputError = (error) => {
	return {
		...getBaseError(error),
		toolName: error.toolName,
		toolInput: error.toolInput
	};
};
var serializeNoSuchToolError = (error) => {
	return {
		...getBaseError(error),
		toolName: error.toolName ?? null,
		availableTools: error.availableTools ?? null
	};
};
const serializeError = (error) => {
	const serializedError = {
		name: error.name ?? null,
		message: error.message ?? null,
		stack: error.stack ?? null,
		cause: safeSerialize(error.cause)
	};
	if ("url" in error) serializedError.url = error.url;
	if ("requestBodyValues" in error) serializedError.requestBodyValues = safeSerialize(error.requestBodyValues);
	if ("statusCode" in error) serializedError.statusCode = error.statusCode ?? null;
	if ("responseBody" in error && error.responseBody) {
		const body = parseJSON(error.responseBody);
		if (body) {
			const message = body.message || body.msg;
			if (message) if (serializedError.message === null) serializedError.message = message;
			else serializedError.message += " " + message;
			serializedError.responseBody = JSON.stringify(body, null, 2);
		} else serializedError.responseBody = error.responseBody;
	}
	if ("isRetryable" in error) serializedError.isRetryable = error.isRetryable;
	if ("data" in error) serializedError.data = safeSerialize(error.data);
	if ("responseHeaders" in error) serializedError.responseHeaders = error.responseHeaders ?? null;
	if ("statusText" in error) serializedError.statusText = error.statusText ?? null;
	if ("parameter" in error) serializedError.parameter = error.parameter;
	if ("value" in error) serializedError.value = safeSerialize(error.value);
	if ("content" in error) serializedError.content = safeSerialize(error.content);
	if ("role" in error) serializedError.role = error.role;
	if ("prompt" in error) serializedError.prompt = safeSerialize(error.prompt);
	if ("toolName" in error) serializedError.toolName = error.toolName;
	if ("toolInput" in error) serializedError.toolInput = error.toolInput;
	if ("text" in error) serializedError.text = error.text ?? null;
	if ("originalMessage" in error) serializedError.originalMessage = safeSerialize(error.originalMessage);
	if ("response" in error) serializedError.response = safeSerialize(error.response);
	if ("usage" in error) serializedError.usage = safeSerialize(error.usage);
	if ("finishReason" in error) serializedError.finishReason = error.finishReason ?? null;
	if ("modelId" in error) serializedError.modelId = error.modelId;
	if ("modelType" in error) serializedError.modelType = error.modelType;
	if ("providerId" in error) serializedError.providerId = error.providerId;
	if ("availableProviders" in error) serializedError.availableProviders = error.availableProviders;
	if ("availableTools" in error) serializedError.availableTools = error.availableTools ?? null;
	if ("reason" in error) serializedError.reason = error.reason;
	if ("lastError" in error) serializedError.lastError = safeSerialize(error.lastError);
	if ("errors" in error) serializedError.errors = error.errors.map((err) => safeSerialize(err));
	if ("originalError" in error) serializedError.originalError = InvalidToolInputError.isInstance(error.originalError) ? serializeInvalidToolInputError(error.originalError) : serializeNoSuchToolError(error.originalError);
	if ("functionality" in error) serializedError.functionality = error.functionality;
	if ("provider" in error) serializedError.provider = error.provider;
	return serializedError;
};
const formatZodError = (error, title) => {
	const errorMessage = error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
	return title ? `${title}: \n${errorMessage}` : errorMessage;
};
function safeToString(value) {
	if (value == null) return "null";
	if (typeof value === "string") return value;
	if (typeof value !== "object" && typeof value !== "function") return String(value);
	if (typeof value === "object") {
		if (typeof value === "function") return value.toString();
		try {
			return JSON.stringify(value, getCircularReplacer());
		} catch (err) {
			return "[Unserializable: " + err + "]";
		}
	}
	return String(value);
}
function getCircularReplacer() {
	const seen = /* @__PURE__ */ new WeakSet();
	return (_key, value) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) return "[Circular]";
			seen.add(value);
		}
		return value;
	};
}
function formatError(error) {
	return `${t("error.name")}: ${error.name}\n${t("error.message")}: ${error.message}\n${t("error.stack")}: ${error.stack}`;
}
function formatAiSdkError(error) {
	let text = formatError(error) + "\n";
	if (error.cause) text += `${t("error.cause")}: ${error.cause}\n`;
	if (isSerializedAiSdkApiCallError(error)) {
		if (error.statusCode) text += `${t("error.statusCode")}: ${error.statusCode}\n`;
		text += `${t("error.requestUrl")}: ${error.url}\n`;
		const requestBodyValues = safeToString(error.requestBodyValues);
		text += `${t("error.requestBodyValues")}: ${requestBodyValues}\n`;
		if (error.responseHeaders) text += `${t("error.responseHeaders")}: ${JSON.stringify(error.responseHeaders, null, 2)}\n`;
		if (error.responseBody) text += `${t("error.responseBody")}: ${error.responseBody}\n`;
		if (error.data) {
			const data = safeToString(error.data);
			text += `${t("error.data")}: ${data}\n`;
		}
	}
	return text.trim();
}
const formatAgentServerError = (error) => `${t("common.error")}: ${error.error.code} ${error.error.message}`;
const formatAxiosError = (error) => {
	if (!error.response) return `${t("common.error")}: ${t("error.no_response")}`;
	const { status, statusText } = error.response;
	return `${t("common.error")}: ${status} ${statusText}`;
};
function serializeHealthCheckError(error) {
	const aiDetail = aiErrorDetail(error);
	if (aiDetail) return aiDetail;
	if (AISDKError.isInstance(error)) return serializeError(error);
	if (error instanceof Error) return {
		name: error.name || null,
		message: error.message || null,
		stack: error.stack || null
	};
	return {
		name: null,
		message: safeToString(error),
		stack: null
	};
}
export { isSerializedAiSdkNoSuchToolError as A, AGENT_WORKSPACE_TYPE as B, isSerializedAiSdkInvalidToolInputError as C, isSerializedAiSdkNoSpeechGeneratedError as D, isSerializedAiSdkNoObjectGeneratedError as E, isSerializedAiSdkUnsupportedFunctionalityError as F, number as H, isSerializedError as I, AGENTS_MAX_LIMIT as L, isSerializedAiSdkTooManyEmbeddingValuesForCallError as M, isSerializedAiSdkToolCallRepairError as N, isSerializedAiSdkNoSuchModelError as O, isSerializedAiSdkTypeValidationError as P, AgentPermissionModeSchema as R, isSerializedAiSdkInvalidPromptError as S, isSerializedAiSdkMessageConversionError as T, ReasoningEffortOptionSchema as V, isSerializedAiSdkError as _, formatMcpError as a, isSerializedAiSdkInvalidDataContentError as b, isAbortError as c, parseJSON as d, axios_default as f, isSerializedAiSdkDownloadError as g, isSerializedAiSdkApiCallError as h, formatErrorMessageWithPrefix as i, isSerializedAiSdkRetryError as j, isSerializedAiSdkNoSuchProviderError as k, safeToString as l, aiErrorDetail as m, formatError as n, formatZodError as o, aiErrorCodes as p, formatErrorMessage as r, getErrorMessage as s, formatAiSdkError as t, serializeHealthCheckError as u, isSerializedAiSdkErrorUnion as v, isSerializedAiSdkJSONParseError as w, isSerializedAiSdkInvalidMessageRoleError as x, isSerializedAiSdkInvalidArgumentError as y, sanitizeAgentConfiguration as z };
