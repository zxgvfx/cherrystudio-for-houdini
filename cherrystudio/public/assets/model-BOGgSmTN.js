import { C as string$2, _ as object$1, a as array$1, g as number$3, n as _enum$1, o as boolean$2, s as custom } from "./schemas-1oAyIgyK.js";
const ENDPOINT_TYPE = {
	ANTHROPIC_MESSAGES: "anthropic-messages",
	GOOGLE_GENERATE_CONTENT: "google-generate-content",
	JINA_RERANK: "jina-rerank",
	OLLAMA_CHAT: "ollama-chat",
	OLLAMA_GENERATE: "ollama-generate",
	OPENAI_AUDIO_TRANSCRIPTION: "openai-audio-transcription",
	OPENAI_AUDIO_TRANSLATION: "openai-audio-translation",
	OPENAI_CHAT_COMPLETIONS: "openai-chat-completions",
	OPENAI_EMBEDDINGS: "openai-embeddings",
	OPENAI_IMAGE_EDIT: "openai-image-edit",
	OPENAI_IMAGE_GENERATION: "openai-image-generation",
	OPENAI_RESPONSES: "openai-responses",
	OPENAI_TEXT_COMPLETIONS: "openai-text-completions",
	OPENAI_TEXT_TO_SPEECH: "openai-text-to-speech",
	OPENAI_VIDEO_GENERATION: "openai-video-generation"
};
const MODEL_CAPABILITY = {
	FUNCTION_CALL: "function-call",
	REASONING: "reasoning",
	IMAGE_RECOGNITION: "image-recognition",
	IMAGE_GENERATION: "image-generation",
	AUDIO_RECOGNITION: "audio-recognition",
	AUDIO_GENERATION: "audio-generation",
	EMBEDDING: "embedding",
	RERANK: "rerank",
	AUDIO_TRANSCRIPT: "audio-transcript",
	VIDEO_RECOGNITION: "video-recognition",
	VIDEO_GENERATION: "video-generation",
	STRUCTURED_OUTPUT: "structured-output",
	FILE_INPUT: "file-input",
	CODE_EXECUTION: "code-execution",
	FILE_SEARCH: "file-search",
	COMPUTER_USE: "computer-use"
};
const SERVER_TOOL = {
	WEB_SEARCH: "web-search",
	URL_CONTEXT: "url-context"
};
const SERVER_TOOL_MODEL_SCOPE = {
	ALL_CHAT_MODELS: "all-chat-models",
	MODEL_DEPENDENT: "model-dependent"
};
const CANONICAL_PARAM_KEY = {
	ADD_WATERMARK: "addWatermark",
	ASPECT_RATIO: "aspectRatio",
	BACKGROUND: "background",
	BOTTOM_SCALE: "bottomScale",
	CFG: "cfg",
	CUSTOM_SIZE: "customSize",
	DETAIL: "detail",
	ENABLE_INTERLEAVE: "enableInterleave",
	FUNCTION: "function",
	GUIDANCE_SCALE: "guidanceScale",
	IMAGE_RESOLUTION: "imageResolution",
	IMAGE_WEIGHT: "imageWeight",
	IS_SKETCH: "isSketch",
	LEFT_SCALE: "leftScale",
	MAGIC_PROMPT_OPTION: "magicPromptOption",
	MAX_IMAGES: "maxImages",
	MODERATION: "moderation",
	NEGATIVE_PROMPT: "negativePrompt",
	NUM_IMAGES: "numImages",
	NUM_INFERENCE_STEPS: "numInferenceSteps",
	OUTPUT_FORMAT: "outputFormat",
	OUTPUT_COMPRESSION: "outputCompression",
	PERSON_GENERATION: "personGeneration",
	PROMPT_ENHANCEMENT: "promptEnhancement",
	PROMPT_EXTEND: "promptExtend",
	QUALITY: "quality",
	RESOLUTION: "resolution",
	REF_MODE: "refMode",
	REF_STRENGTH: "refStrength",
	RENDERING_SPEED: "renderingSpeed",
	RESEMBLANCE: "resemblance",
	RIGHT_SCALE: "rightScale",
	SAFETY_TOLERANCE: "safetyTolerance",
	SEED: "seed",
	SEQUENTIAL_IMAGE_GENERATION: "sequentialImageGeneration",
	SIZE: "size",
	SOURCE_LANG: "sourceLang",
	STRENGTH: "strength",
	STYLE: "style",
	STYLE_TYPE: "styleType",
	TARGET_LANG: "targetLang",
	THINKING_MODE: "thinkingMode",
	TOP_SCALE: "topScale",
	UPSCALE_FACTOR: "upscaleFactor"
};
const MODALITY = {
	TEXT: "text",
	IMAGE: "image",
	AUDIO: "audio",
	VIDEO: "video",
	VECTOR: "vector"
};
const CURRENCY = {
	USD: "USD",
	CNY: "CNY"
};
const REASONING_EFFORT = {
	NONE: "none",
	MINIMAL: "minimal",
	LOW: "low",
	MEDIUM: "medium",
	HIGH: "high",
	XHIGH: "xhigh",
	MAX: "max",
	AUTO: "auto"
};
const REASONING_EFFORT_ORDER = [
	"none",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"max",
	"auto"
];
function objectValues(obj) {
	return Object.values(obj);
}
Object.freeze({ status: "aborted" });
function $constructor(name, initializer$2, params) {
	function init(inst, def) {
		if (!inst._zod) Object.defineProperty(inst, "_zod", {
			value: {
				def,
				constr: _,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: false
		});
		if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer$2(inst, def);
		const proto = _.prototype;
		const keys = Object.keys(proto);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a$1;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a$1 = inst._zod).deferred ?? (_a$1.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
const globalConfig = {};
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
		throw new Error("cached value already set");
	} };
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepString = step.toString();
	let stepDecCount = (stepString.split(".")[1] || "").length;
	if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
		const match = stepString.match(/\d?e-(\d?)/);
		if (match?.[1]) stepDecCount = Number.parseInt(match[1]);
	}
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
var EVALUATING = Symbol("evaluating");
function defineLazy(object$2, key, getter) {
	let value = void 0;
	Object.defineProperty(object$2, key, {
		get() {
			if (value === EVALUATING) return;
			if (value === void 0) {
				value = EVALUATING;
				value = getter();
			}
			return value;
		},
		set(v) {
			Object.defineProperty(object$2, key, { value: v });
		},
		configurable: true
	});
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = cached(() => {
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	return o;
}
const propertyKeyTypes = new Set([
	"string",
	"number",
	"symbol"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
const NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = {};
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				newShape[key] = currDef.shape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = { ...schema._zod.def.shape };
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				delete newShape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = schema._zod.def.shape;
		for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function merge(a, b) {
	return clone(a, mergeDefs(a._zod.def, {
		get shape() {
			const _shape = {
				...a._zod.def.shape,
				...b._zod.def.shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: []
	}));
}
function partial(Class, schema, mask) {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const oldShape = schema._zod.def.shape;
			const shape = { ...oldShape };
			if (mask) for (const key in mask) {
				if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				shape[key] = Class ? new Class({
					type: "optional",
					innerType: oldShape[key]
				}) : oldShape[key];
			}
			else for (const key in oldShape) shape[key] = Class ? new Class({
				type: "optional",
				innerType: oldShape[key]
			}) : oldShape[key];
			assignProp(this, "shape", shape);
			return shape;
		},
		checks: []
	}));
}
function required(Class, schema, mask) {
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const oldShape = schema._zod.def.shape;
		const shape = { ...oldShape };
		if (mask) for (const key in mask) {
			if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
			if (!mask[key]) continue;
			shape[key] = new Class({
				type: "nonoptional",
				innerType: oldShape[key]
			});
		}
		else for (const key in oldShape) shape[key] = new Class({
			type: "nonoptional",
			innerType: oldShape[key]
		});
		assignProp(this, "shape", shape);
		return shape;
	} }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a$1;
		(_a$1 = iss).path ?? (_a$1.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config$1) {
	const full = {
		...iss,
		path: iss.path ?? []
	};
	if (!iss.message) full.message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config$1.customError?.(iss)) ?? unwrapMessage(config$1.localeError?.(iss)) ?? "Invalid input";
	delete full.inst;
	delete full.continue;
	if (!ctx?.reportInput) delete full.input;
	return full;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
var initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false
	});
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue$1) => issue$1.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) {
		fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		fieldErrors[sub.path[0]].push(mapper(sub));
	} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, mapper = (issue$1) => issue$1.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error$1) => {
		for (const issue$1 of error$1.issues) if (issue$1.code === "invalid_union" && issue$1.errors.length) issue$1.errors.map((issues) => processError({ issues }));
		else if (issue$1.code === "invalid_key") processError({ issues: issue$1.issues });
		else if (issue$1.code === "invalid_element") processError({ issues: issue$1.issues });
		else if (issue$1.path.length === 0) fieldErrors._errors.push(mapper(issue$1));
		else {
			let curr = fieldErrors;
			let i = 0;
			while (i < issue$1.path.length) {
				const el = issue$1.path[i];
				if (!(i === issue$1.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
				else {
					curr[el] = curr[el] || { _errors: [] };
					curr[el]._errors.push(mapper(issue$1));
				}
				curr = curr[el];
				i++;
			}
		}
	};
	processError(error);
	return fieldErrors;
}
const _parse = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
const _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? {
		success: false,
		error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParse$1 = /* @__PURE__ */ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? {
		success: false,
		error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParseAsync$1 = /* @__PURE__ */ _safeParseAsync($ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _parse(_Err)(schema, value, ctx);
};
const _decode = (_Err) => (schema, value, _ctx) => {
	return _parse(_Err)(schema, value, _ctx);
};
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _parseAsync(_Err)(schema, value, ctx);
};
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _parseAsync(_Err)(schema, value, _ctx);
};
const _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
const _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
const cuid = /^[cC][^\s-]{8,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
const uuid = (version$1) => {
	if (!version$1) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return /* @__PURE__ */ new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version$1}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^[A-Za-z0-9_-]*$/;
const e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date$1 = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time$1(args) {
	return /* @__PURE__ */ new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const time$2 = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const timeRegex = `${time$2}(?:${opts.join("|")})`;
	return /* @__PURE__ */ new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
const string$1 = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return /* @__PURE__ */ new RegExp(`^${regex}$`);
};
const integer = /^-?\d+$/;
const number$2 = /^-?\d+(?:\.\d+)?$/;
const boolean$1 = /^(?:true|false)$/i;
const lowercase = /^[^A-Z]*$/;
const uppercase = /^[^a-z]*$/;
const $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
	var _a$1;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a$1 = inst._zod).onattach ?? (_a$1.onattach = []);
});
var numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
};
const $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst$1) => {
		const bag = inst$1._zod.bag;
		const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
		else bag.exclusiveMaximum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst$1) => {
		const bag = inst$1._zod.bag;
		const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
		else bag.exclusiveMinimum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst$1) => {
		var _a$1;
		(_a$1 = inst$1._zod.bag).multipleOf ?? (_a$1.multipleOf = def.value);
	});
	inst._zod.check = (payload) => {
		if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
		if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
		payload.issues.push({
			origin: typeof payload.value,
			code: "not_multiple_of",
			divisor: def.value,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	def.format = def.format || "float64";
	const isInt = def.format?.includes("int");
	const origin = isInt ? "int" : "number";
	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst$1) => {
		const bag = inst$1._zod.bag;
		bag.format = def.format;
		bag.minimum = minimum;
		bag.maximum = maximum;
		if (isInt) bag.pattern = integer;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (isInt) {
			if (!Number.isInteger(input)) {
				payload.issues.push({
					expected: origin,
					format: def.format,
					code: "invalid_type",
					continue: false,
					input,
					inst
				});
				return;
			}
			if (!Number.isSafeInteger(input)) {
				if (input > 0) payload.issues.push({
					input,
					code: "too_big",
					maximum: Number.MAX_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				else payload.issues.push({
					input,
					code: "too_small",
					minimum: Number.MIN_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				return;
			}
		}
		if (input < minimum) payload.issues.push({
			origin: "number",
			input,
			code: "too_small",
			minimum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
		if (input > maximum) payload.issues.push({
			origin: "number",
			input,
			code: "too_big",
			maximum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a$1;
	$ZodCheck.init(inst, def);
	(_a$1 = inst._zod.def).when ?? (_a$1.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst$1) => {
		const curr = inst$1._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst$1._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a$1;
	$ZodCheck.init(inst, def);
	(_a$1 = inst._zod.def).when ?? (_a$1.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst$1) => {
		const curr = inst$1._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst$1._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a$1;
	$ZodCheck.init(inst, def);
	(_a$1 = inst._zod.def).when ?? (_a$1.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst$1) => {
		const bag = inst$1._zod.bag;
		bag.minimum = def.length;
		bag.maximum = def.length;
		bag.length = def.length;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? {
				code: "too_big",
				maximum: def.length
			} : {
				code: "too_small",
				minimum: def.length
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a$1, _b;
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst$1) => {
		const bag = inst$1._zod.bag;
		bag.format = def.format;
		if (def.pattern) {
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(def.pattern);
		}
	});
	if (def.pattern) (_a$1 = inst._zod).check ?? (_a$1.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	});
	else (_b = inst._zod).check ?? (_b.check = () => {});
});
const $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	def.pattern = pattern;
	inst._zod.onattach.push((inst$1) => {
		const bag = inst$1._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = /* @__PURE__ */ new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst$1) => {
		const bag = inst$1._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = /* @__PURE__ */ new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst$1) => {
		const bag = inst$1._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
var Doc = class {
	constructor(args = []) {
		this.content = [];
		this.indent = 0;
		if (this) this.args = args;
	}
	indented(fn) {
		this.indent += 1;
		fn(this);
		this.indent -= 1;
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const args = this?.args;
		const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
		return new F(...args, lines.join("\n"));
	}
};
const version = {
	major: 4,
	minor: 3,
	patch: 6
};
const $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
	var _a$1;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version;
	const checks = [...inst._zod.def.checks ?? []];
	if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a$1 = inst._zod).deferred ?? (_a$1.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks$1, ctx) => {
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks$1) {
				if (ch._zod.def.when) {
					if (!ch._zod.def.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					if (payload.issues.length === currLen) return;
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					if (payload.issues.length === currLen) continue;
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		const handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary)) {
				canary.aborted = true;
				return canary;
			}
			const checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return checkResult.then((checkResult$1) => inst._zod.parse(checkResult$1, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				const canary = inst._zod.parse({
					value: payload.value,
					issues: []
				}, {
					...ctx,
					skipChecks: true
				});
				if (canary instanceof Promise) return canary.then((canary$1) => {
					return handleCanaryResult(canary$1, payload, ctx);
				});
				return handleCanaryResult(canary, payload, ctx);
			}
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result$1) => runChecks(result$1, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
	defineLazy(inst, "~standard", () => ({
		validate: (value) => {
			try {
				const r = safeParse$1(inst, value);
				return r.success ? { value: r.data } : { issues: r.error?.issues };
			} catch (_) {
				return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
});
const $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_$1) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
const $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
const $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
const $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
const $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
const $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const trimmed = payload.value.trim();
			const url$1 = new URL(trimmed);
			if (def.hostname) {
				def.hostname.lastIndex = 0;
				if (!def.hostname.test(url$1.hostname)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: def.hostname.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.protocol) {
				def.protocol.lastIndex = 0;
				if (!def.protocol.test(url$1.protocol.endsWith(":") ? url$1.protocol.slice(0, -1) : url$1.protocol)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: def.protocol.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.normalize) payload.value = url$1.href;
			else payload.value = trimmed;
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid);
	$ZodStringFormat.init(inst, def);
});
const $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
const $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
const $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv4`;
});
const $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv6`;
	inst._zod.check = (payload) => {
		try {
			new URL(`http://[${payload.value}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		const parts = payload.value.split("/");
		try {
			if (parts.length !== 2) throw new Error();
			const [address, prefix] = parts;
			if (!prefix) throw new Error();
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) throw new Error();
			if (prefixNum < 0 || prefixNum > 128) throw new Error();
			new URL(`http://[${address}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
const $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64";
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64URL(data) {
	if (!base64url.test(data)) return false;
	const base64$1 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64$1.padEnd(Math.ceil(base64$1.length / 4) * 4, "="));
}
const $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64url);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64url";
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
const $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = inst._zod.bag.pattern ?? number$2;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Number(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
		const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
		payload.issues.push({
			expected: "number",
			code: "invalid_type",
			input,
			inst,
			...received ? { received } : {}
		});
		return payload;
	};
});
const $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
const $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Boolean(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "boolean") return payload;
		payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
const $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
const $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = Array(input.length);
		const proms = [];
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result$1) => handleArrayResult(result$1, payload, i)));
			else handleArrayResult(result, payload, i);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handlePropertyResult(result, final, key, input, isOptionalOut) {
	if (result.issues.length) {
		if (isOptionalOut && !(key in input)) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (result.value === void 0) {
		if (key in input) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		keys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const isOptionalOut = _catchall.optout === "optional";
	for (const key in input) {
		if (keySet.has(key)) continue;
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run({
			value: input[key],
			issues: []
		}, ctx);
		if (r instanceof Promise) proms.push(r.then((r$1) => handlePropertyResult(r$1, payload, key, input, isOptionalOut)));
		else handlePropertyResult(r, payload, key, input, isOptionalOut);
	}
	if (unrecognized.length) payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst
	});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
const $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
		const sh = def.shape;
		Object.defineProperty(def, "shape", { get: () => {
			const newSh = { ...sh };
			Object.defineProperty(def, "shape", { value: newSh });
			return newSh;
		} });
	}
	const _normalized = cached(() => normalizeDef(def));
	defineLazy(inst._zod, "propValues", () => {
		const shape = def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
				for (const v of field.values) propValues[key].add(v);
			}
		}
		return propValues;
	});
	const isObject$1 = isObject;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = {};
		const proms = [];
		const shape = value.shape;
		for (const key of value.keys) {
			const el = shape[key];
			const isOptionalOut = el._zod.optout === "optional";
			const r = el._zod.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r$1) => handlePropertyResult(r$1, payload, key, input, isOptionalOut)));
			else handlePropertyResult(r, payload, key, input, isOptionalOut);
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
	};
});
const $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	const superParse = inst._zod.parse;
	const _normalized = cached(() => normalizeDef(def));
	const generateFastpass = (shape) => {
		const doc = new Doc([
			"shape",
			"payload",
			"ctx"
		]);
		const normalized = _normalized.value;
		const parseStr = (key) => {
			const k = esc(key);
			return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		};
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		let counter = 0;
		for (const key of normalized.keys) ids[key] = `key_${counter++}`;
		doc.write(`const newResult = {};`);
		for (const key of normalized.keys) {
			const id = ids[key];
			const k = esc(key);
			const isOptionalOut = shape[key]?._zod?.optout === "optional";
			doc.write(`const ${id} = ${parseStr(key)};`);
			if (isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
			else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		const fn = doc.compile();
		return (payload, ctx) => fn(shape, payload, ctx);
	};
	let fastpass;
	const isObject$1 = isObject;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
			if (!catchall) return payload;
			return handleCatchall([], input, payload, ctx, value, inst);
		}
		return superParse(payload, ctx);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
const $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "values", () => {
		if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazy(inst._zod, "pattern", () => {
		if (def.options.every((o) => o._zod.pattern)) {
			const patterns = def.options.map((o) => o._zod.pattern);
			return /* @__PURE__ */ new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	const single = def.options.length === 1;
	const first = def.options[0]._zod.run;
	inst._zod.parse = (payload, ctx) => {
		if (single) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results$1) => {
			return handleUnionResults(results$1, payload, inst, ctx);
		});
	};
});
const $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
	def.inclusive = false;
	$ZodUnion.init(inst, def);
	const _super = inst._zod.parse;
	defineLazy(inst._zod, "propValues", () => {
		const propValues = {};
		for (const option of def.options) {
			const pv = option._zod.propValues;
			if (!pv || Object.keys(pv).length === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
			for (const [k, v] of Object.entries(pv)) {
				if (!propValues[k]) propValues[k] = /* @__PURE__ */ new Set();
				for (const val of v) propValues[k].add(val);
			}
		}
		return propValues;
	});
	const disc = cached(() => {
		const opts = def.options;
		const map = /* @__PURE__ */ new Map();
		for (const o of opts) {
			const values = o._zod.propValues?.[def.discriminator];
			if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
			for (const v of values) {
				if (map.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
				map.set(v, o);
			}
		}
		return map;
	});
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isObject(input)) {
			payload.issues.push({
				code: "invalid_type",
				expected: "object",
				input,
				inst
			});
			return payload;
		}
		const opt = disc.value.get(input?.[def.discriminator]);
		if (opt) return opt._zod.run(payload, ctx);
		if (def.unionFallback) return _super(payload, ctx);
		payload.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: def.discriminator,
			input,
			path: [def.discriminator],
			inst
		});
		return payload;
	};
});
const $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		const left = def.left._zod.run({
			value: input,
			issues: []
		}, ctx);
		const right = def.right._zod.run({
			value: input,
			issues: []
		}, ctx);
		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left$1, right$1]) => {
			return handleIntersectionResults(payload, left$1, right$1);
		});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = /* @__PURE__ */ new Map();
	let unrecIssue;
	for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
		unrecIssue ?? (unrecIssue = iss);
		for (const k of iss.keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k).l = true;
		}
	} else result.issues.push(iss);
	for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
		if (!unrecKeys.has(k)) unrecKeys.set(k, {});
		unrecKeys.get(k).r = true;
	}
	else result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length && unrecIssue) result.issues.push({
		...unrecIssue,
		keys: bothKeys
	});
	if (aborted(result)) return result;
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
const $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isPlainObject(input)) {
			payload.issues.push({
				expected: "record",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		const values = def.keyType._zod.values;
		if (values) {
			payload.value = {};
			const recordKeys = /* @__PURE__ */ new Set();
			for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
				recordKeys.add(typeof key === "number" ? key.toString() : key);
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result$1) => {
					if (result$1.issues.length) payload.issues.push(...prefixIssues(key, result$1.issues));
					payload.value[key] = result$1.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[key] = result.value;
				}
			}
			let unrecognized;
			for (const key in input) if (!recordKeys.has(key)) {
				unrecognized = unrecognized ?? [];
				unrecognized.push(key);
			}
			if (unrecognized && unrecognized.length > 0) payload.issues.push({
				code: "unrecognized_keys",
				input,
				inst,
				keys: unrecognized
			});
		} else {
			payload.value = {};
			for (const key of Reflect.ownKeys(input)) {
				if (key === "__proto__") continue;
				let keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (typeof key === "string" && number$2.test(key) && keyResult.issues.length) {
					const retryResult = def.keyType._zod.run({
						value: Number(key),
						issues: []
					}, ctx);
					if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (retryResult.issues.length === 0) keyResult = retryResult;
				}
				if (keyResult.issues.length) {
					if (def.mode === "loose") payload.value[key] = input[key];
					else payload.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					continue;
				}
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result$1) => {
					if (result$1.issues.length) payload.issues.push(...prefixIssues(key, result$1.issues));
					payload.value[keyResult.value] = result$1.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[keyResult.value] = result.value;
				}
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
const $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	const valuesSet = new Set(values);
	inst._zod.values = valuesSet;
	inst._zod.pattern = /* @__PURE__ */ new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (valuesSet.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
const $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
	const values = new Set(def.values);
	inst._zod.values = values;
	inst._zod.pattern = /* @__PURE__ */ new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values: def.values,
			input,
			inst
		});
		return payload;
	};
});
const $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		const _out = def.transform(payload.value, payload);
		if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
			payload.value = output;
			return payload;
		});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		return payload;
	};
});
function handleOptionalResult(result, input) {
	if (result.issues.length && input === void 0) return {
		issues: [],
		value: void 0
	};
	return result;
}
const $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? new Set([...def.innerType._zod.values, void 0]) : void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? /* @__PURE__ */ new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (def.innerType._zod.optin === "optional") {
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, payload.value));
			return handleOptionalResult(result, payload.value);
		}
		if (payload.value === void 0) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? /* @__PURE__ */ new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result$1) => handleDefaultResult(result$1, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
const $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		const v = def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result$1) => handleNonOptionalResult(result$1, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
const $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result$1) => {
			payload.value = result$1.value;
			if (result$1.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result$1.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
					input: payload.value
				});
				payload.issues = [];
			}
			return payload;
		});
		payload.value = result.value;
		if (result.issues.length) {
			payload.value = def.catchValue({
				...payload,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value
			});
			payload.issues = [];
		}
		return payload;
	};
});
const $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right$1) => handlePipeResult(right$1, def.in, ctx));
			return handlePipeResult(right, def.in, ctx);
		}
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left$1) => handlePipeResult(left$1, def.out, ctx));
		return handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	if (left.issues.length) {
		left.aborted = true;
		return left;
	}
	return next._zod.run({
		value: left.value,
		issues: left.issues
	}, ctx);
}
const $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
	defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
const $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r$1) => handleRefineResult(r$1, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
var _a;
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta$2 = _meta[0];
		this._map.set(schema, meta$2);
		if (meta$2 && typeof meta$2 === "object" && "id" in meta$2) this._idmap.set(meta$2.id, schema);
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta$2 = this._map.get(schema);
		if (meta$2 && typeof meta$2 === "object" && "id" in meta$2) this._idmap.delete(meta$2.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			const f = {
				...pm,
				...this._map.get(schema)
			};
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
const globalRegistry = globalThis.__zod_globalRegistry;
/* @__NO_SIDE_EFFECTS__ */
function _string(Class, params) {
	return new Class({
		type: "string",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _number(Class, params) {
	return new Class({
		type: "number",
		checks: [],
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _coercedNumber(Class, params) {
	return new Class({
		type: "number",
		coerce: true,
		checks: [],
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
/* @__NO_SIDE_EFFECTS__ */
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
/* @__NO_SIDE_EFFECTS__ */
function _trim() {
	return /* @__PURE__ */ _overwrite((input) => input.trim());
}
/* @__NO_SIDE_EFFECTS__ */
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
/* @__NO_SIDE_EFFECTS__ */
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
/* @__NO_SIDE_EFFECTS__ */
function _slugify() {
	return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
/* @__NO_SIDE_EFFECTS__ */
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _superRefine(fn) {
	const ch = /* @__PURE__ */ _check((payload) => {
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, ch._zod.def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	});
	return ch;
}
/* @__NO_SIDE_EFFECTS__ */
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		external: params?.external ?? void 0
	};
}
function process(schema, ctx, _params = {
	path: [],
	schemaPath: []
}) {
	var _a$1;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path
	};
	ctx.seen.set(schema, result);
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			process(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta$2 = ctx.metadataRegistry.get(schema);
	if (meta$2) Object.assign(result.schema, meta$2);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && result.schema._prefault) (_a$1 = result.schema).default ?? (_a$1.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const idToSchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id$1) => id$1);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
			};
		}
		if (entry[1] === root) return { ref: "#" };
		const defUriPrefix = `#/${defsSegment}/`;
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + defId
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema$1 = seen.schema;
		for (const key in schema$1) delete schema$1[key];
		schema$1.$ref = ref;
	};
	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") {
				extractToDef(entry);
				continue;
			}
		}
	}
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema$1 = seen.def ?? seen.schema;
		const _cached = { ...schema$1 };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema$1.allOf = schema$1.allOf ?? [];
				schema$1.allOf.push(refSchema);
			} else Object.assign(schema$1, refSchema);
			Object.assign(schema$1, _cached);
			if (zodSchema._zod.parent === ref) for (const key in schema$1) {
				if (key === "$ref" || key === "allOf") continue;
				if (!(key in _cached)) delete schema$1[key];
			}
			if (refSchema.$ref && refSeen.def) for (const key in schema$1) {
				if (key === "$ref" || key === "allOf") continue;
				if (key in refSeen.def && JSON.stringify(schema$1[key]) === JSON.stringify(refSeen.def[key])) delete schema$1[key];
			}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema$1.$ref = parentSeen.schema.$ref;
				if (parentSeen.def) for (const key in schema$1) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in parentSeen.def && JSON.stringify(schema$1[key]) === JSON.stringify(parentSeen.def[key])) delete schema$1[key];
				}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema$1,
			path: seen.path ?? []
		});
	};
	for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	Object.assign(result, root.def ?? root.schema);
	const defs = ctx.external?.defs ?? {};
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) defs[seen.defId] = seen.def;
	}
	if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
	else result.definitions = defs;
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: false,
			writable: false
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	const ctx = initializeContext({
		...params,
		processors
	});
	process(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	const { libraryOptions, target } = params ?? {};
	const ctx = initializeContext({
		...libraryOptions ?? {},
		target,
		io,
		processors
	});
	process(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
var formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
};
const stringProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	json.type = "string";
	const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
	if (typeof minimum === "number") json.minLength = minimum;
	if (typeof maximum === "number") json.maxLength = maximum;
	if (format) {
		json.format = formatMap[format] ?? format;
		if (json.format === "") delete json.format;
		if (format === "time") delete json.format;
	}
	if (contentEncoding) json.contentEncoding = contentEncoding;
	if (patterns && patterns.size > 0) {
		const regexes = [...patterns];
		if (regexes.length === 1) json.pattern = regexes[0].source;
		else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
			...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: regex.source
		}))];
	}
};
const numberProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
	if (typeof format === "string" && format.includes("int")) json.type = "integer";
	else json.type = "number";
	if (typeof exclusiveMinimum === "number") if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
		json.minimum = exclusiveMinimum;
		json.exclusiveMinimum = true;
	} else json.exclusiveMinimum = exclusiveMinimum;
	if (typeof minimum === "number") {
		json.minimum = minimum;
		if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") if (exclusiveMinimum >= minimum) delete json.minimum;
		else delete json.exclusiveMinimum;
	}
	if (typeof exclusiveMaximum === "number") if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
		json.maximum = exclusiveMaximum;
		json.exclusiveMaximum = true;
	} else json.exclusiveMaximum = exclusiveMaximum;
	if (typeof maximum === "number") {
		json.maximum = maximum;
		if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") if (exclusiveMaximum <= maximum) delete json.maximum;
		else delete json.exclusiveMaximum;
	}
	if (typeof multipleOf === "number") json.multipleOf = multipleOf;
};
const booleanProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
const neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
const unknownProcessor = (_schema, _ctx, _json, _params) => {};
const enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
const literalProcessor = (schema, ctx, json, _params) => {
	const def = schema._zod.def;
	const vals = [];
	for (const val of def.values) if (val === void 0) {
		if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
	} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
	else vals.push(Number(val));
	else vals.push(val);
	if (vals.length === 0) {} else if (vals.length === 1) {
		const val = vals[0];
		json.type = val === null ? "null" : typeof val;
		if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
		else json.const = val;
	} else {
		if (vals.every((v) => typeof v === "number")) json.type = "number";
		if (vals.every((v) => typeof v === "string")) json.type = "string";
		if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
		if (vals.every((v) => v === null)) json.type = "null";
		json.enum = vals;
	}
};
const customProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
};
const transformProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
};
const arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = process(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
const objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	json.properties = {};
	const shape = def.shape;
	for (const key in shape) json.properties[key] = process(shape[key], ctx, {
		...params,
		path: [
			...params.path,
			"properties",
			key
		]
	});
	const allKeys = new Set(Object.keys(shape));
	const requiredKeys = new Set([...allKeys].filter((key) => {
		const v = def.shape[key]._zod;
		if (ctx.io === "input") return v.optin === void 0;
		else return v.optout === void 0;
	}));
	if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
	else if (!def.catchall) {
		if (ctx.io === "output") json.additionalProperties = false;
	} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	});
};
const unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) => process(x, ctx, {
		...params,
		path: [
			...params.path,
			isExclusive ? "oneOf" : "anyOf",
			i
		]
	}));
	if (isExclusive) json.oneOf = options;
	else json.anyOf = options;
};
const intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = process(def.left, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			0
		]
	});
	const b = process(def.right, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			1
		]
	});
	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
	json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
};
const recordProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	const keyType = def.keyType;
	const patterns = keyType._zod.bag?.patterns;
	if (def.mode === "loose" && patterns && patterns.size > 0) {
		const valueSchema = process(def.valueType, ctx, {
			...params,
			path: [
				...params.path,
				"patternProperties",
				"*"
			]
		});
		json.patternProperties = {};
		for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
	} else {
		if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = process(def.keyType, ctx, {
			...params,
			path: [...params.path, "propertyNames"]
		});
		json.additionalProperties = process(def.valueType, ctx, {
			...params,
			path: [...params.path, "additionalProperties"]
		});
	}
	const keyValues = keyType._zod.values;
	if (keyValues) {
		const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
		if (validKeyValues.length > 0) json.required = validKeyValues;
	}
};
const nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
const nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
const prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
const catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		throw new Error("Dynamic catch values are not supported in JSON Schema");
	}
	json.default = catchValue;
};
const pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
	process(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
const readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
const optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date(params) {
	return /* @__PURE__ */ _isoDate(ZodISODate, params);
}
const ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return /* @__PURE__ */ _isoTime(ZodISOTime, params);
}
const ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
}
var initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	Object.defineProperties(inst, {
		format: { value: (mapper) => formatError(inst, mapper) },
		flatten: { value: (mapper) => flattenError(inst, mapper) },
		addIssue: { value: (issue$1) => {
			inst.issues.push(issue$1);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		addIssues: { value: (issues$1) => {
			inst.issues.push(...issues$1);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		isEmpty: { get() {
			return inst.issues.length === 0;
		} }
	});
};
$constructor("ZodError", initializer);
const ZodRealError = $constructor("ZodError", initializer, { Parent: Error });
const parse = /* @__PURE__ */ _parse(ZodRealError);
const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
const encode = /* @__PURE__ */ _encode(ZodRealError);
const decode = /* @__PURE__ */ _decode(ZodRealError);
const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
const ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	Object.assign(inst["~standard"], { jsonSchema: {
		input: createStandardJSONSchemaMethod(inst, "input"),
		output: createStandardJSONSchemaMethod(inst, "output")
	} });
	inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
	inst.def = def;
	inst.type = def.type;
	Object.defineProperty(inst, "_def", { value: def });
	inst.check = (...checks) => {
		return inst.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...checks.map((ch) => typeof ch === "function" ? { _zod: {
			check: ch,
			def: { check: "custom" },
			onattach: []
		} } : ch)] }), { parent: true });
	};
	inst.with = inst.check;
	inst.clone = (def$1, params) => clone(inst, def$1, params);
	inst.brand = () => inst;
	inst.register = ((reg, meta$2) => {
		reg.add(inst, meta$2);
		return inst;
	});
	inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.encode = (data, params) => encode(inst, data, params);
	inst.decode = (data, params) => decode(inst, data, params);
	inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
	inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
	inst.safeEncode = (data, params) => safeEncode(inst, data, params);
	inst.safeDecode = (data, params) => safeDecode(inst, data, params);
	inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
	inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
	inst.refine = (check, params) => inst.check(refine(check, params));
	inst.superRefine = (refinement) => inst.check(superRefine(refinement));
	inst.overwrite = (fn) => inst.check(/* @__PURE__ */ _overwrite(fn));
	inst.optional = () => optional(inst);
	inst.exactOptional = () => exactOptional(inst);
	inst.nullable = () => nullable(inst);
	inst.nullish = () => optional(nullable(inst));
	inst.nonoptional = (params) => nonoptional(inst, params);
	inst.array = () => array(inst);
	inst.or = (arg) => union([inst, arg]);
	inst.and = (arg) => intersection(inst, arg);
	inst.transform = (tx) => pipe(inst, transform(tx));
	inst.default = (def$1) => _default(inst, def$1);
	inst.prefault = (def$1) => prefault(inst, def$1);
	inst.catch = (params) => _catch(inst, params);
	inst.pipe = (target) => pipe(inst, target);
	inst.readonly = () => readonly(inst);
	inst.describe = (description) => {
		const cl = inst.clone();
		globalRegistry.add(cl, { description });
		return cl;
	};
	Object.defineProperty(inst, "description", {
		get() {
			return globalRegistry.get(inst)?.description;
		},
		configurable: true
	});
	inst.meta = (...args) => {
		if (args.length === 0) return globalRegistry.get(inst);
		const cl = inst.clone();
		globalRegistry.add(cl, args[0]);
		return cl;
	};
	inst.isOptional = () => inst.safeParse(void 0).success;
	inst.isNullable = () => inst.safeParse(null).success;
	inst.apply = (fn) => fn(inst);
	return inst;
});
const _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	inst.regex = (...args) => inst.check(/* @__PURE__ */ _regex(...args));
	inst.includes = (...args) => inst.check(/* @__PURE__ */ _includes(...args));
	inst.startsWith = (...args) => inst.check(/* @__PURE__ */ _startsWith(...args));
	inst.endsWith = (...args) => inst.check(/* @__PURE__ */ _endsWith(...args));
	inst.min = (...args) => inst.check(/* @__PURE__ */ _minLength(...args));
	inst.max = (...args) => inst.check(/* @__PURE__ */ _maxLength(...args));
	inst.length = (...args) => inst.check(/* @__PURE__ */ _length(...args));
	inst.nonempty = (...args) => inst.check(/* @__PURE__ */ _minLength(1, ...args));
	inst.lowercase = (params) => inst.check(/* @__PURE__ */ _lowercase(params));
	inst.uppercase = (params) => inst.check(/* @__PURE__ */ _uppercase(params));
	inst.trim = () => inst.check(/* @__PURE__ */ _trim());
	inst.normalize = (...args) => inst.check(/* @__PURE__ */ _normalize(...args));
	inst.toLowerCase = () => inst.check(/* @__PURE__ */ _toLowerCase());
	inst.toUpperCase = () => inst.check(/* @__PURE__ */ _toUpperCase());
	inst.slugify = () => inst.check(/* @__PURE__ */ _slugify());
});
const ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
	inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
	inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime(params));
	inst.date = (params) => inst.check(date(params));
	inst.time = (params) => inst.check(time(params));
	inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
	return /* @__PURE__ */ _string(ZodString, params);
}
const ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
const ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function url(params) {
	return /* @__PURE__ */ _url(ZodURL, params);
}
const ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
	inst.gt = (value, params) => inst.check(/* @__PURE__ */ _gt(value, params));
	inst.gte = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.min = (value, params) => inst.check(/* @__PURE__ */ _gte(value, params));
	inst.lt = (value, params) => inst.check(/* @__PURE__ */ _lt(value, params));
	inst.lte = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
	inst.max = (value, params) => inst.check(/* @__PURE__ */ _lte(value, params));
	inst.int = (params) => inst.check(int(params));
	inst.safe = (params) => inst.check(int(params));
	inst.positive = (params) => inst.check(/* @__PURE__ */ _gt(0, params));
	inst.nonnegative = (params) => inst.check(/* @__PURE__ */ _gte(0, params));
	inst.negative = (params) => inst.check(/* @__PURE__ */ _lt(0, params));
	inst.nonpositive = (params) => inst.check(/* @__PURE__ */ _lte(0, params));
	inst.multipleOf = (value, params) => inst.check(/* @__PURE__ */ _multipleOf(value, params));
	inst.step = (value, params) => inst.check(/* @__PURE__ */ _multipleOf(value, params));
	inst.finite = () => inst;
	const bag = inst._zod.bag;
	inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
	inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
	inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
	inst.isFinite = true;
	inst.format = bag.format ?? null;
});
function number$1(params) {
	return /* @__PURE__ */ _number(ZodNumber, params);
}
const ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return /* @__PURE__ */ _int(ZodNumberFormat, params);
}
const ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return /* @__PURE__ */ _boolean(ZodBoolean, params);
}
const ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown);
}
const ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return /* @__PURE__ */ _never(ZodNever, params);
}
const ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
	inst.min = (minLength, params) => inst.check(/* @__PURE__ */ _minLength(minLength, params));
	inst.nonempty = (params) => inst.check(/* @__PURE__ */ _minLength(1, params));
	inst.max = (maxLength, params) => inst.check(/* @__PURE__ */ _maxLength(maxLength, params));
	inst.length = (len, params) => inst.check(/* @__PURE__ */ _length(len, params));
	inst.unwrap = () => inst.element;
});
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray, element, params);
}
const ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
	$ZodObjectJIT.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	defineLazy(inst, "shape", () => {
		return def.shape;
	});
	inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
	inst.catchall = (catchall) => inst.clone({
		...inst._zod.def,
		catchall
	});
	inst.passthrough = () => inst.clone({
		...inst._zod.def,
		catchall: unknown()
	});
	inst.loose = () => inst.clone({
		...inst._zod.def,
		catchall: unknown()
	});
	inst.strict = () => inst.clone({
		...inst._zod.def,
		catchall: never()
	});
	inst.strip = () => inst.clone({
		...inst._zod.def,
		catchall: void 0
	});
	inst.extend = (incoming) => {
		return extend(inst, incoming);
	};
	inst.safeExtend = (incoming) => {
		return safeExtend(inst, incoming);
	};
	inst.merge = (other) => merge(inst, other);
	inst.pick = (mask) => pick(inst, mask);
	inst.omit = (mask) => omit(inst, mask);
	inst.partial = (...args) => partial(ZodOptional, inst, args[0]);
	inst.required = (...args) => required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
	return new ZodObject({
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	});
}
const ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
const ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion.init(inst, def);
	$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
const ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
const ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
function partialRecord(keyType, valueType, params) {
	const k = clone(keyType);
	k._zod.values = void 0;
	return new ZodRecord({
		type: "record",
		keyType: k,
		valueType,
		...normalizeParams(params)
	});
}
const ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = Object.values(def.entries);
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	return new ZodEnum({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
const ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", { get() {
		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return def.values[0];
	} });
});
function literal$1(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
const ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output$1) => {
			payload.value = output$1;
			return payload;
		});
		payload.value = output;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
const ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
const ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
const ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
const ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
const ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
const ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
const ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
const ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function refine(fn, _params = {}) {
	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
	return /* @__PURE__ */ _superRefine(fn);
}
function preprocess(fn, schema) {
	return pipe(transform(fn), schema);
}
function number(params) {
	return /* @__PURE__ */ _coercedNumber(ZodNumber, params);
}
var blankToUndefined = (v) => v === "" || v == null ? void 0 : v;
var optString = string().optional();
var optBool = boolean().optional();
var optNumber = preprocess(blankToUndefined, number().optional());
var optInt = preprocess(blankToUndefined, number().int().optional());
const IMAGE_PARAM_CATALOG = {
	addWatermark: {
		schema: optBool,
		wire: "watermark"
	},
	aspectRatio: { schema: optString },
	background: { schema: optString },
	bottomScale: { schema: optNumber },
	cfg: { schema: optNumber },
	customSize: { schema: optString },
	detail: { schema: optNumber },
	enableInterleave: { schema: optBool },
	function: { schema: optString },
	guidanceScale: { schema: optNumber },
	imageResolution: {
		schema: optString,
		wire: "size"
	},
	imageWeight: { schema: optNumber },
	isSketch: { schema: optBool },
	leftScale: { schema: optNumber },
	magicPromptOption: { schema: optBool },
	maxImages: { schema: optInt },
	moderation: { schema: optString },
	negativePrompt: { schema: optString },
	numImages: { schema: optInt },
	numInferenceSteps: { schema: optInt },
	outputFormat: { schema: optString },
	outputCompression: { schema: optInt },
	personGeneration: { schema: optString },
	promptEnhancement: { schema: optBool },
	promptExtend: { schema: optBool },
	quality: { schema: optString },
	resolution: { schema: optString },
	refMode: { schema: optString },
	refStrength: { schema: optNumber },
	renderingSpeed: { schema: optString },
	resemblance: { schema: optNumber },
	rightScale: { schema: optNumber },
	safetyTolerance: { schema: optInt },
	seed: { schema: optInt },
	sequentialImageGeneration: { schema: optString },
	size: { schema: optString },
	sourceLang: { schema: optString },
	strength: { schema: optNumber },
	style: { schema: optString },
	styleType: { schema: optString },
	targetLang: { schema: optString },
	thinkingMode: { schema: optBool },
	topScale: { schema: optNumber },
	upscaleFactor: { schema: optNumber }
};
object(Object.fromEntries(Object.entries(IMAGE_PARAM_CATALOG).map(([key, entry]) => [key, entry.schema])));
const ModelIdSchema = string().min(1);
const ProviderIdSchema = string().min(1);
const VersionSchema = string().min(1);
datetime();
const NumericRangeSchema$1 = object({
	min: number$1(),
	max: number$1()
}).refine((r) => r.min <= r.max, { message: "min must be less than or equal to max" });
object({
	min: string(),
	max: string()
});
const ZodCurrencySchema = _enum(objectValues(CURRENCY)).optional();
const PricePerTokenSchema$1 = object({
	perMillionTokens: number$1().nonnegative().nullable(),
	currency: ZodCurrencySchema
});
const MetadataSchema = record(string(), unknown()).optional();
const ModalitySchema = _enum(objectValues(MODALITY));
const ModelCapabilityTypeSchema = _enum(objectValues(MODEL_CAPABILITY));
const CanonicalParamKeySchema = _enum(objectValues(CANONICAL_PARAM_KEY));
const ThinkingTokenLimitsSchema$1 = object({
	min: number$1().nonnegative().optional(),
	max: number$1().positive().optional(),
	default: number$1().nonnegative().optional()
}).refine((d) => d.min == null === (d.max == null), { message: "min and max must be both present or both absent" }).refine((d) => d.min == null || d.max == null || d.min <= d.max, { message: "min must be less than or equal to max" });
const ReasoningEffortSchema$2 = _enum(objectValues(REASONING_EFFORT));
const ReasoningControlSchema = discriminatedUnion("kind", [
	object({
		kind: literal$1("effort"),
		values: array(ReasoningEffortSchema$2).min(1),
		default: ReasoningEffortSchema$2.optional()
	}),
	object({
		kind: literal$1("budget"),
		min: number$1().nonnegative(),
		max: number$1().positive(),
		default: number$1().nonnegative().optional()
	}),
	object({
		kind: literal$1("toggle"),
		default: boolean().optional()
	})
]);
const ReasoningWireDialectSchema = _enum(["effort", "budget"]);
object({
	pattern: string().refine((source) => {
		try {
			new RegExp(source, "i");
			return true;
		} catch {
			return false;
		}
	}, { message: "pattern must be a valid regular expression" }),
	effort: array(ReasoningEffortSchema$2).min(1).optional(),
	toggle: boolean().optional(),
	budget: object({
		min: number$1().nonnegative(),
		max: number$1().positive()
	}).refine((b) => b.min <= b.max, { message: "budget min must be <= max" }).optional(),
	template: literal$1(true).optional(),
	wireDialect: ReasoningWireDialectSchema.optional()
}).refine((rule) => rule.template !== true || rule.effort !== void 0 || rule.toggle !== void 0 || rule.budget !== void 0 || rule.wireDialect !== void 0, { message: "a template rule with no knobs declares nothing — drop it or make it a profile" });
const ReasoningSupportSchema = object({
	controls: array(ReasoningControlSchema).optional(),
	thinkingTokenLimits: ThinkingTokenLimitsSchema$1.optional(),
	supportedEfforts: array(ReasoningEffortSchema$2).optional(),
	defaultEffort: ReasoningEffortSchema$2.optional(),
	wireDialect: ReasoningWireDialectSchema.optional()
}).superRefine((r, ctx) => {
	const kinds = (r.controls ?? []).map((c) => c.kind);
	if (new Set(kinds).size !== kinds.length) ctx.addIssue({
		code: "custom",
		message: "at most one reasoning control per kind"
	});
	for (const c of r.controls ?? []) {
		if (c.kind === "effort" && c.default != null && !c.values.includes(c.default)) ctx.addIssue({
			code: "custom",
			message: "effort default must be a member of values"
		});
		if (c.kind === "budget" && (c.min > c.max || c.default != null && (c.default < c.min || c.default > c.max))) ctx.addIssue({
			code: "custom",
			message: "budget range must satisfy min <= default <= max"
		});
	}
});
const ImageGenerationSupportSchema = object({ modes: partialRecord(_enum([
	"generate",
	"edit",
	"remix",
	"upscale",
	"merge"
]), object({
	supports: partialRecord(CanonicalParamKeySchema, discriminatedUnion("type", [
		object({
			type: literal$1("switch"),
			default: boolean().optional()
		}),
		object({
			type: literal$1("enum"),
			options: array(string()).min(1),
			default: string().optional(),
			render: _enum(["select", "chips"]).optional(),
			columns: number$1().int().positive().optional()
		}),
		object({
			type: literal$1("range"),
			min: number$1(),
			max: number$1(),
			default: number$1().optional(),
			step: number$1().optional()
		}).refine((r) => r.min <= r.max, { message: "min must be ≤ max" }),
		object({
			type: literal$1("size"),
			minSide: number$1(),
			maxSide: number$1(),
			pairedEnumKey: string().optional()
		}),
		object({
			type: literal$1("text"),
			multiline: boolean().optional()
		})
	])),
	maxInputImages: number$1().int().positive().optional(),
	vendorTransport: object({
		endpoint: string(),
		isSync: boolean().optional()
	}).optional(),
	requirePrompt: boolean().optional()
})) });
const ParameterSupportSchema = object({
	temperature: object({
		supported: boolean(),
		range: NumericRangeSchema$1.optional()
	}).default({ supported: true }),
	topP: object({
		supported: boolean(),
		range: NumericRangeSchema$1.optional()
	}).default({ supported: true }),
	topK: object({
		supported: boolean(),
		range: NumericRangeSchema$1.optional()
	}).default({ supported: false }),
	frequencyPenalty: boolean().default(true),
	presencePenalty: boolean().default(true),
	maxTokens: boolean().default(true),
	stopSequences: boolean().default(true),
	systemMessage: boolean().default(true)
});
const ModelPricingSchema = object({
	input: PricePerTokenSchema$1,
	output: PricePerTokenSchema$1,
	cacheRead: PricePerTokenSchema$1.optional(),
	cacheWrite: PricePerTokenSchema$1.optional(),
	perImage: object({
		price: number$1(),
		currency: ZodCurrencySchema,
		unit: _enum(["image", "pixel"]).optional()
	}).optional(),
	perMinute: object({
		price: number$1(),
		currency: ZodCurrencySchema
	}).optional()
});
object({
	version: VersionSchema,
	models: array(object({
		id: ModelIdSchema,
		name: string(),
		description: string().optional(),
		capabilities: array(ModelCapabilityTypeSchema).refine((arr) => new Set(arr).size === arr.length, { message: "Capabilities must be unique" }).optional(),
		inputModalities: array(ModalitySchema).refine((arr) => new Set(arr).size === arr.length, { message: "Input modalities must be unique" }).optional(),
		outputModalities: array(ModalitySchema).refine((arr) => new Set(arr).size === arr.length, { message: "Output modalities must be unique" }).optional(),
		contextWindow: number$1().optional(),
		maxOutputTokens: number$1().optional(),
		maxInputTokens: number$1().optional(),
		pricing: ModelPricingSchema.optional(),
		reasoning: ReasoningSupportSchema.optional(),
		parameterSupport: ParameterSupportSchema.optional(),
		imageGeneration: ImageGenerationSupportSchema.optional(),
		family: string().optional(),
		ownedBy: string().optional(),
		openWeights: boolean().optional(),
		metadata: MetadataSchema
	}))
});
function resolveModeSupports(support, mode$1) {
	const modes = support?.modes;
	if (!modes) return void 0;
	const firstMode = Object.keys(modes)[0];
	return (modes[mode$1] ?? (firstMode ? modes[firstMode] : void 0))?.supports;
}
function applyConstraints(base, spec) {
	switch (spec.type) {
		case "enum": return base.refine((v) => v == null || v === "custom" || spec.options.includes(String(v)), { message: "value not in supported options" });
		case "range": return base.refine((v) => v == null || Number(v) >= spec.min && Number(v) <= spec.max, { message: "value out of range" });
		default: return base;
	}
}
function buildParamsSchema(support, mode$1 = "generate") {
	const shape = {};
	for (const [key, entry] of Object.entries(IMAGE_PARAM_CATALOG)) shape[key] = entry.schema.catch(void 0);
	const supports = resolveModeSupports(support, mode$1);
	if (!supports) return object(shape).loose();
	for (const [key, spec] of Object.entries(supports)) {
		const entry = IMAGE_PARAM_CATALOG[key];
		if (!entry) continue;
		shape[key] = applyConstraints(entry.schema, spec).catch(void 0);
		if (spec.type === "size") {
			const side = preprocess((v) => v === "" || v == null ? void 0 : v, number().min(spec.minSide).max(spec.maxSide).optional());
			shape[`${key}_width`] = side.catch(void 0);
			shape[`${key}_height`] = side.catch(void 0);
		}
	}
	return object(shape).loose();
}
var literal = (target, value) => ({
	target,
	value: {
		source: "literal",
		value
	}
});
var effort = (target) => ({
	target,
	value: { source: "effort" }
});
var summary = (target) => ({
	target,
	value: { source: "assistant-summary" }
});
var mode = (operations, rest = {}) => ({
	operations,
	...rest
});
var budgetTokens = (target) => ({
	target,
	value: { source: "budget" }
});
mode([literal("thinkingConfig.includeThoughts", false), literal("thinkingConfig.thinkingBudget", 0)]), mode([literal("thinkingConfig.includeThoughts", true), literal("thinkingConfig.thinkingBudget", -1)]), literal("thinkingConfig.includeThoughts", true), budgetTokens("thinkingConfig.thinkingBudget");
literal("thinking.type", "enabled"), budgetTokens("thinking.budgetTokens"), literal("sendReasoning", true);
mode([literal("thinking.type", "disabled")]);
var genericEffort = (summaryTarget) => {
	const suffix = summaryTarget ? [summary(summaryTarget)] : [];
	return {
		off: mode([literal("reasoningEffort", "none"), ...suffix]),
		auto: mode([effort("reasoningEffort"), ...suffix], { effortMap: { auto: "medium" } }),
		effort: mode([effort("reasoningEffort"), ...suffix])
	};
};
genericEffort(), genericEffort("reasoningSummary"), mode([literal("thinking.type", "disabled")]), mode([literal("thinking.type", "adaptive"), literal("thinking.display", "summarized")]), mode([
	literal("thinking.type", "adaptive"),
	literal("thinking.display", "summarized"),
	effort("effort")
], { effortMap: { minimal: "low" } }), mode([literal("thinkingConfig.includeThoughts", false), literal("thinkingConfig.thinkingLevel", "minimal")]), mode([literal("thinkingConfig.includeThoughts", true)]), mode([literal("thinkingConfig.includeThoughts", true), effort("thinkingConfig.thinkingLevel")]), mode([literal("think", false)]), mode([literal("think", true)]), mode([effort("think")]);
const VENDOR_PATTERNS = {
	anthropic: /^(?:anthropic\.)?claude/i,
	gemini: /^(?:gemini|palm|veo|imagen|learnlm|lyria)/i,
	gemma: /^gemma(?:[-:\d]|$)/i,
	grok: /^grok/i,
	openai: /\bgpt\b|^o[134]|^chatgpt|^codex|^davinci|^babbage|^dall-e|^text-moderation|^text-embedding-(?:3|ada)/i,
	qwen: /^qwen|^qwq|^qvq|^tongyi/i,
	doubao: /^(?:doubao|skylark|seed|seedance|seedream|ep-)/i,
	hunyuan: /^(?:hunyuan|hy-|hy\d)/i,
	kimi: /^(?:kimi|moonshot|k3(?:[-_.]|$))/i,
	deepseek: /^deepseek/i,
	perplexity: /^sonar/i,
	baichuan: /^baichuan/i,
	mimo: /^mimo-/i,
	ling: /^(?:ling|ring)-/i,
	minimax: /^(?:minimax|abab)/i,
	step: /^step-/i,
	zhipu: /^(?:glm|chatglm|cogview|cogvideo|codegeex)/i,
	mistral: /^(?:open-|labs-)?(?:mistral|pixtral|codestral|ministral|voxtral|devstral|mixtral|magistral)/i
};
function matchVendor(normalizedId) {
	for (const [vendor, pattern] of Object.entries(VENDOR_PATTERNS)) if (pattern.test(normalizedId)) return vendor;
}
const ReasoningWireTargetSchema = _enum([
	"reasoningEffort",
	"reasoningSummary",
	"reasoning_effort",
	"reasoning.effort",
	"reasoning.enabled",
	"reasoning.exclude",
	"reasoning.max_tokens",
	"thinking.type",
	"thinking.budget_tokens",
	"thinking.budgetTokens",
	"thinking.display",
	"effort",
	"sendReasoning",
	"enable_thinking",
	"thinking_budget",
	"incremental_output",
	"disable_reasoning",
	"reasoning_budget",
	"chat_template_kwargs.enable_thinking",
	"chat_template_kwargs.thinking",
	"chat_template_kwargs.thinking_mode",
	"chat_template_kwargs.thinking_budget",
	"extra_body.google.thinking_config.thinking_budget",
	"extra_body.google.thinking_config.include_thoughts",
	"extra_body.thinking.type",
	"extra_body.thinking_budget",
	"extra_body.reasoning_effort",
	"thinkingConfig.includeThoughts",
	"thinkingConfig.thinkingBudget",
	"thinkingConfig.thinkingLevel",
	"reasoningConfig.type",
	"reasoningConfig.budgetTokens",
	"reasoningConfig.maxReasoningEffort",
	"think"
]);
var ReasoningEffortSchema$1 = _enum(objectValues(REASONING_EFFORT));
const ReasoningWireOperationSchema = object({
	target: ReasoningWireTargetSchema,
	value: discriminatedUnion("source", [
		object({
			source: literal$1("literal"),
			value: union([
				string(),
				number$1(),
				boolean()
			])
		}),
		object({ source: literal$1("effort") }),
		object({ source: literal$1("budget") }),
		object({ source: literal$1("assistant-summary") })
	])
});
var NonBudgetReasoningWireOperationSchema = object({
	target: ReasoningWireTargetSchema,
	value: discriminatedUnion("source", [
		object({
			source: literal$1("literal"),
			value: union([
				string(),
				number$1(),
				boolean()
			])
		}),
		object({ source: literal$1("effort") }),
		object({ source: literal$1("assistant-summary") })
	])
});
var ReasoningBudgetPolicySchema = object({
	min: number$1().nonnegative().optional(),
	autoValue: number$1().optional(),
	clampToMaxTokens: boolean().optional(),
	missing: discriminatedUnion("type", [
		object({ type: literal$1("omit-value") }),
		object({ type: literal$1("omit-mode") }),
		object({
			type: literal$1("fallback"),
			value: number$1()
		})
	])
});
var ReasoningEffortMapSchema = partialRecord(ReasoningEffortSchema$1, ReasoningEffortSchema$1).optional();
const ReasoningWireModeSchema = union([object({
	operations: array(NonBudgetReasoningWireOperationSchema).min(1),
	effortMap: ReasoningEffortMapSchema
}), object({
	operations: array(ReasoningWireOperationSchema).min(1).refine((operations) => operations.some((operation) => operation.value.source === "budget"), { message: "reasoning budget mode must contain a budget operation" }),
	effortMap: ReasoningEffortMapSchema,
	budget: ReasoningBudgetPolicySchema
})]);
const ReasoningWireProfileSchema = object({
	disabled: literal$1(true).optional(),
	default: ReasoningWireModeSchema.optional(),
	off: ReasoningWireModeSchema.optional(),
	auto: ReasoningWireModeSchema.optional(),
	effort: ReasoningWireModeSchema.optional()
}).refine((profile) => profile.disabled === true || profile.default || profile.off || profile.auto || profile.effort, { message: "reasoning wire profile must declare a mode or be disabled" });
object({
	wire: ReasoningWireProfileSchema,
	budgetWire: ReasoningWireProfileSchema.optional()
});
const EndpointTypeSchema = _enum(objectValues(ENDPOINT_TYPE));
var endpointTypeValues = objectValues(ENDPOINT_TYPE);
const ApiFeaturesSchema = object({
	arrayContent: boolean().default(true),
	streamOptions: boolean().default(true),
	developerRole: boolean().default(false),
	serviceTier: boolean().default(false),
	verbosity: boolean().default(false),
	reportsActualCost: boolean().default(false)
});
const FastModeTransportSchema = _enum(["openai-priority", "claude-code"]);
const ServerToolConfigSchema = object({
	id: _enum(objectValues(SERVER_TOOL)),
	modelScope: _enum(objectValues(SERVER_TOOL_MODEL_SCOPE)).default(SERVER_TOOL_MODEL_SCOPE.MODEL_DEPENDENT),
	endpointTypes: array(EndpointTypeSchema).optional(),
	vendors: array(_enum(Object.keys(VENDOR_PATTERNS))).optional()
});
var reasoningFormat = (type) => object({
	type: literal$1(type),
	wire: ReasoningWireProfileSchema.optional()
});
const ProviderReasoningFormatSchema = discriminatedUnion("type", [
	reasoningFormat("openai-chat"),
	reasoningFormat("openai-responses"),
	reasoningFormat("anthropic"),
	reasoningFormat("gemini"),
	reasoningFormat("ollama"),
	reasoningFormat("none")
]);
ProviderReasoningFormatSchema.options.map((option) => option.shape.type.value);
const ProviderWebsiteSchema = object({ website: object({
	official: url().optional(),
	docs: url().optional(),
	apiKey: url().optional(),
	models: url().optional()
}) });
const RegistryEndpointConfigSchema = object({
	baseUrl: url().optional(),
	modelsApiUrls: object({
		default: url().optional(),
		embedding: url().optional(),
		image: url().optional(),
		reranker: url().optional()
	}).optional(),
	reasoningFormat: ProviderReasoningFormatSchema.optional(),
	adapterFamily: string().optional()
});
object({
	version: VersionSchema,
	providers: array(object({
		id: ProviderIdSchema,
		presetProviderId: ProviderIdSchema.optional(),
		name: string(),
		description: string().optional(),
		endpointConfigs: record(string().refine((k) => endpointTypeValues.includes(k), { message: `Invalid endpoint type key, must be one of: ${objectValues(ENDPOINT_TYPE).join(", ")}` }), RegistryEndpointConfigSchema).optional(),
		defaultChatEndpoint: EndpointTypeSchema.nullable().default(null),
		modelListSource: _enum(["api", "registry"]).default("api"),
		authMethods: array(_enum([
			"api-key",
			"oauth",
			"external-cli"
		])).optional(),
		authOptional: boolean().default(false),
		serverTools: array(ServerToolConfigSchema).default([]),
		apiFeatures: ApiFeaturesSchema.optional(),
		reportedCostCurrency: ZodCurrencySchema,
		fastMode: object({ transport: FastModeTransportSchema }).optional(),
		metadata: MetadataSchema.and(ProviderWebsiteSchema)
	}).refine((data) => {
		if (data.endpointConfigs && data.defaultChatEndpoint) return data.defaultChatEndpoint in data.endpointConfigs;
		return true;
	}, { message: "defaultChatEndpoint must exist as a key in endpointConfigs" }))
});
const CapabilityOverrideSchema = object({
	add: array(ModelCapabilityTypeSchema).optional(),
	remove: array(ModelCapabilityTypeSchema).optional(),
	force: array(ModelCapabilityTypeSchema).optional()
});
var ReasoningEndpointTypeSchema = _enum([
	ENDPOINT_TYPE.OPENAI_RESPONSES,
	ENDPOINT_TYPE.OPENAI_CHAT_COMPLETIONS,
	ENDPOINT_TYPE.ANTHROPIC_MESSAGES,
	ENDPOINT_TYPE.GOOGLE_GENERATE_CONTENT,
	ENDPOINT_TYPE.OLLAMA_CHAT,
	ENDPOINT_TYPE.OLLAMA_GENERATE,
	ENDPOINT_TYPE.OPENAI_TEXT_COMPLETIONS
]);
const ProviderModelReasoningContractSchema = object({
	support: ReasoningSupportSchema.optional(),
	wire: ReasoningWireProfileSchema.optional()
}).refine((contract) => contract.support || contract.wire, { message: "provider-model reasoning contract must declare support or wire" });
object({
	version: VersionSchema,
	overrides: array(object({
		providerId: ProviderIdSchema,
		modelId: ModelIdSchema,
		apiModelId: string().optional(),
		modelVariants: array(string().min(1)).optional(),
		capabilities: CapabilityOverrideSchema.optional(),
		limits: object({
			contextWindow: number$1().optional(),
			maxOutputTokens: number$1().optional(),
			maxInputTokens: number$1().optional()
		}).optional(),
		pricing: ModelPricingSchema.partial().optional(),
		reasoningContracts: partialRecord(ReasoningEndpointTypeSchema, ProviderModelReasoningContractSchema).optional(),
		supportsFastMode: boolean().optional(),
		parameterSupport: ParameterSupportSchema.partial().optional(),
		endpointTypes: array(EndpointTypeSchema).optional(),
		inputModalities: array(ModalitySchema).optional(),
		outputModalities: array(ModalitySchema).optional(),
		name: string().optional(),
		description: string().optional(),
		family: string().optional(),
		ownedBy: string().optional(),
		imageGeneration: ImageGenerationSupportSchema.optional(),
		disabled: boolean().optional(),
		replaceWith: ModelIdSchema.optional(),
		reason: string().optional()
	}))
});
const COMMON_AGGREGATOR_PREFIXES = [
	"aihubmix-",
	"aihub-",
	"ahm-",
	"alicloud-",
	"azure-",
	"baidu-",
	"cbs-",
	"cc-",
	"sf-",
	"s-",
	"bai-",
	"web-",
	"deepinfra-",
	"groq-",
	"nvidia-",
	"sophnet-",
	"zai-org-",
	"zai-",
	"lucidquery-",
	"lucidnova-",
	"lucid-",
	"siliconflow-",
	"chutes-",
	"huoshan-",
	"meta-",
	"cohere-",
	"coding-",
	"dmxapi-",
	"perplexity-",
	"ai21-",
	"openai-",
	"dmxapi_",
	"aistudio_"
];
const PREFIX_EXPANSIONS = [["mm-", "minimax-"]];
const COLON_VARIANT_SUFFIXES = [
	":free",
	":nitro",
	":extended",
	":beta",
	":preview",
	":thinking",
	":exacto",
	":latest",
	":cloud"
];
const HYPHEN_VARIANT_SUFFIXES = [
	"-free",
	"-search",
	"-online",
	"-think",
	"-reasoning",
	"-classic",
	"-low",
	"-high",
	"-minimal",
	"-nothink",
	"-no-think",
	"-ssvip",
	"-thinking",
	"-nothinking",
	"-aliyun",
	"-huoshan",
	"-tee",
	"-cc",
	"-fw",
	"-di",
	"-t",
	"-reverse"
];
const PAREN_VARIANT_SUFFIXES = [
	"(free)",
	"(beta)",
	"(preview)",
	"(thinking)"
];
var PROTECTED_COMPOUND_PREFIXES = [
	"non",
	"no",
	"pre",
	"anti",
	"post"
];
var PARAMETER_SIZE_PATTERN = /-(\d+(?:\.\d+)?b)(?=-|$)/i;
var COLON_VARIANT_TAG_PATTERN = /^(?:\d+(?:[.x]\d+)*b(?:$|[-.])|q\d|iq\d|fp16|bf16|f16)/i;
const QUANTIZATION_SUFFIXES = [
	"-fp8",
	"-fp16",
	"-bf16",
	"-awq",
	"-int4",
	"-int8",
	"-gguf",
	"-gptq"
];
var DATE_SNAPSHOT_PATTERN = /-20\d{2}-(?:0[1-9]|1[0-2])-(?:[0-2]\d|3[01])$|-20\d{2}(?:0[1-9]|1[0-2])(?:[0-2]\d|3[01])$|-2\d(?:0[1-9]|1[0-2])(?:[0-2]\d|3[01])$|-(?:0[1-9]|1[0-2])(?:[0-2]\d|3[01])$|-2\d(?:0[1-9]|1[0-2])$/;
var BEDROCK_VENDOR = "anthropic|amazon|meta|google|mistralai|cohere|openai|ai21|microsoft|nvidia";
var BEDROCK_DOTTED_VENDOR = `${BEDROCK_VENDOR}|deepseek|minimax|mistral|moonshot|moonshotai|qwen|writer|xai|zai`;
var BEDROCK_VENDOR_DOTTED = /* @__PURE__ */ new RegExp(`^(?:[a-z]+\\.)*(?:${BEDROCK_DOTTED_VENDOR})\\.`);
var BEDROCK_VENDOR_DASH = /* @__PURE__ */ new RegExp(`^(?:${BEDROCK_VENDOR})-{1,2}`);
var BEDROCK_REVISION_PATTERN = /(?:[-_]v?\d+)?:\d+$/i;
function stripAggregatorPrefixes(modelId, additionalPrefixes = []) {
	const allPrefixes = [...additionalPrefixes, ...COMMON_AGGREGATOR_PREFIXES];
	let result = modelId;
	for (const prefix of allPrefixes) if (result.startsWith(prefix)) {
		result = result.slice(prefix.length);
		break;
	}
	return result;
}
function stripBedrockVendorPrefix(modelId) {
	return stripBedrockDottedVendorPrefix(modelId).replace(BEDROCK_VENDOR_DASH, "");
}
function stripBedrockDottedVendorPrefix(modelId) {
	return modelId.replace(BEDROCK_VENDOR_DOTTED, "");
}
function stripBedrockRevision(modelId) {
	return modelId.replace(BEDROCK_REVISION_PATTERN, "");
}
function expandKnownPrefixes(modelId) {
	for (const [abbrev, canonical] of PREFIX_EXPANSIONS) if (modelId.startsWith(abbrev)) return canonical + modelId.slice(abbrev.length);
	return modelId;
}
function stripVariantSuffixes(modelId, options = {}) {
	const colonSuffixes = options.colonSuffixes ?? COLON_VARIANT_SUFFIXES;
	const hyphenSuffixes = options.hyphenSuffixes ?? HYPHEN_VARIANT_SUFFIXES;
	const parenSuffixes = options.parenSuffixes ?? PAREN_VARIANT_SUFFIXES;
	if ((options.officialModelsWithSuffix ?? /* @__PURE__ */ new Set()).has(modelId)) return modelId;
	const colonIdx = modelId.lastIndexOf(":");
	if (colonIdx > 0) {
		const suffix = modelId.slice(colonIdx);
		if (colonSuffixes.includes(suffix)) return modelId.slice(0, colonIdx);
	}
	for (const suffix of hyphenSuffixes) if (modelId.endsWith(suffix)) {
		const remaining = modelId.slice(0, -suffix.length);
		if (PROTECTED_COMPOUND_PREFIXES.some((p) => remaining === p || remaining.endsWith(`-${p}`))) continue;
		return remaining;
	}
	for (const suffix of parenSuffixes) if (modelId.endsWith(suffix)) {
		let result = modelId.slice(0, -suffix.length);
		if (result.endsWith(" ")) result = result.slice(0, -1);
		return result;
	}
	return modelId;
}
function normalizeVersionSeparators(modelId) {
	return modelId.replace(/(\d)[,._p](?=\d)/g, "$1-");
}
function stripQuantization(modelId) {
	for (const suffix of QUANTIZATION_SUFFIXES) if (modelId.endsWith(suffix)) return modelId.slice(0, -suffix.length);
	return modelId;
}
function stripDateSnapshot(modelId) {
	return modelId.replace(/@.*$/, "").replace(DATE_SNAPSHOT_PATTERN, "");
}
function stripVariantQuantDateSuffixes(modelId) {
	let result = modelId;
	for (;;) {
		const next = stripDateSnapshot(stripQuantization(stripVariantSuffixes(result)));
		if (next === result) return result;
		result = next;
	}
}
function stripParameterSize(modelId) {
	return modelId.replace(PARAMETER_SIZE_PATTERN, "");
}
function colonVariantTagToHyphen(modelId) {
	const colonIdx = modelId.lastIndexOf(":");
	if (colonIdx > 0 && COLON_VARIANT_TAG_PATTERN.test(modelId.slice(colonIdx + 1))) return `${modelId.slice(0, colonIdx)}-${modelId.slice(colonIdx + 1)}`;
	return modelId;
}
function normalizeModelId(modelId, options = {}) {
	const parts = modelId.split("/");
	let baseName = parts[parts.length - 1].toLowerCase();
	baseName = stripAggregatorPrefixes(baseName);
	baseName = stripBedrockVendorPrefix(baseName);
	baseName = stripBedrockRevision(baseName);
	baseName = expandKnownPrefixes(baseName);
	if (options.keepParameterSize) baseName = colonVariantTagToHyphen(baseName);
	for (;;) {
		const stripped = stripVariantQuantDateSuffixes(baseName);
		const next = options.keepParameterSize ? stripped : stripParameterSize(stripped);
		if (next === baseName) break;
		baseName = next;
	}
	baseName = normalizeVersionSeparators(baseName);
	baseName = baseName.replace(/_/g, "-");
	return baseName;
}
ENDPOINT_TYPE.ANTHROPIC_MESSAGES, ENDPOINT_TYPE.GOOGLE_GENERATE_CONTENT, ENDPOINT_TYPE.OLLAMA_CHAT, ENDPOINT_TYPE.OLLAMA_GENERATE, ENDPOINT_TYPE.JINA_RERANK, ENDPOINT_TYPE.OPENAI_RESPONSES;
var ENDPOINT_IMPLIED_CAPABILITY = {
	[ENDPOINT_TYPE.JINA_RERANK]: MODEL_CAPABILITY.RERANK,
	[ENDPOINT_TYPE.OPENAI_AUDIO_TRANSCRIPTION]: MODEL_CAPABILITY.AUDIO_TRANSCRIPT,
	[ENDPOINT_TYPE.OPENAI_AUDIO_TRANSLATION]: MODEL_CAPABILITY.AUDIO_TRANSCRIPT,
	[ENDPOINT_TYPE.OPENAI_EMBEDDINGS]: MODEL_CAPABILITY.EMBEDDING,
	[ENDPOINT_TYPE.OPENAI_IMAGE_GENERATION]: MODEL_CAPABILITY.IMAGE_GENERATION,
	[ENDPOINT_TYPE.OPENAI_IMAGE_EDIT]: MODEL_CAPABILITY.IMAGE_GENERATION,
	[ENDPOINT_TYPE.OPENAI_TEXT_TO_SPEECH]: MODEL_CAPABILITY.AUDIO_GENERATION,
	[ENDPOINT_TYPE.OPENAI_VIDEO_GENERATION]: MODEL_CAPABILITY.VIDEO_GENERATION
};
function endpointImpliedCapability(endpointType) {
	return endpointType ? ENDPOINT_IMPLIED_CAPABILITY[endpointType] : void 0;
}
const SERVER_TOOL_FUNCTION_MIXING_MODEL_IDS = [
	"gemini-3-1-flash-image",
	"gemini-3-1-flash-image-preview",
	"gemini-3-1-flash-lite",
	"gemini-3-1-flash-lite-image",
	"gemini-3-1-flash-lite-preview",
	"gemini-3-1-flash-live-preview",
	"gemini-3-1-flash-tts-preview",
	"gemini-3-1-pro-preview",
	"gemini-3-1-pro-preview-customtools",
	"gemini-3-5-flash",
	"gemini-3-5-flash-lite",
	"gemini-3-5-live-translate-preview",
	"gemini-3-6-flash",
	"gemini-3-flash",
	"gemini-3-flash-preview",
	"gemini-3-pro-image",
	"gemini-3-pro-image-preview",
	"gemini-3-pro-preview",
	"gemini-flash-latest",
	"gemini-pro-latest"
];
const WEB_SEARCH_UNSUPPORTED_EFFORTS = {
	"gpt-5": ["minimal"],
	"gpt-5-codex": ["minimal"],
	"gpt-5-image": ["minimal"],
	"gpt-5-image-mini": ["minimal"],
	"gpt-5-mini": ["minimal"],
	"gpt-5-nano": ["minimal"],
	"gpt-5-pro": ["minimal"]
};
var MIXING_MODEL_IDS = new Set(SERVER_TOOL_FUNCTION_MIXING_MODEL_IDS);
function supportsServerToolFunctionMixing(rawModelId) {
	return MIXING_MODEL_IDS.has(normalizeModelId(rawModelId, { keepParameterSize: true })) || MIXING_MODEL_IDS.has(normalizeModelId(rawModelId));
}
function isWebSearchEffortUnsupported(rawModelId, effort$1) {
	return (WEB_SEARCH_UNSUPPORTED_EFFORTS[normalizeModelId(rawModelId, { keepParameterSize: true })] ?? WEB_SEARCH_UNSUPPORTED_EFFORTS[normalizeModelId(rawModelId)])?.includes(effort$1) ?? false;
}
var ELIGIBLE_MODEL_IDS = new Map(Object.entries({
	cherryin: {
		"web-search": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6",
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest",
			"gpt-4-1",
			"gpt-4-1-mini",
			"gpt-4-1-nano",
			"gpt-4o",
			"gpt-4o-mini",
			"gpt-4o-mini-search-preview",
			"gpt-5",
			"gpt-5-1",
			"gpt-5-1-codex",
			"gpt-5-1-codex-max",
			"gpt-5-1-codex-mini",
			"gpt-5-1-instant",
			"gpt-5-2",
			"gpt-5-2-chat",
			"gpt-5-2-chat-latest",
			"gpt-5-2-codex",
			"gpt-5-2-pro",
			"gpt-5-3-chat",
			"gpt-5-3-chat-latest",
			"gpt-5-3-codex",
			"gpt-5-3-codex-spark",
			"gpt-5-4",
			"gpt-5-4-mini",
			"gpt-5-4-nano",
			"gpt-5-4-pro",
			"gpt-5-5",
			"gpt-5-5-pro",
			"gpt-5-6",
			"gpt-5-6-luna",
			"gpt-5-6-luna-pro",
			"gpt-5-6-sol",
			"gpt-5-6-sol-pro",
			"gpt-5-6-terra",
			"gpt-5-6-terra-pro",
			"gpt-5-chat",
			"gpt-5-codex",
			"gpt-5-mini",
			"gpt-5-nano",
			"gpt-5-pro",
			"o3",
			"o3-deep-research",
			"o3-mini",
			"o3-pro",
			"o4-mini"
		],
		"url-context": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6",
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-image",
			"gemini-2-5-flash-image-preview",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-image",
			"gemini-3-1-flash-image-preview",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-image",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest"
		]
	},
	aihubmix: {
		"web-search": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6",
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest",
			"gpt-4-1",
			"gpt-4-1-mini",
			"gpt-4-1-nano",
			"gpt-4o",
			"gpt-4o-mini",
			"gpt-4o-mini-search-preview",
			"gpt-5",
			"gpt-5-1",
			"gpt-5-1-codex",
			"gpt-5-1-codex-max",
			"gpt-5-1-codex-mini",
			"gpt-5-1-instant",
			"gpt-5-2",
			"gpt-5-2-chat",
			"gpt-5-2-chat-latest",
			"gpt-5-2-codex",
			"gpt-5-2-pro",
			"gpt-5-3-chat",
			"gpt-5-3-chat-latest",
			"gpt-5-3-codex",
			"gpt-5-3-codex-spark",
			"gpt-5-4",
			"gpt-5-4-mini",
			"gpt-5-4-nano",
			"gpt-5-4-pro",
			"gpt-5-5",
			"gpt-5-5-pro",
			"gpt-5-6",
			"gpt-5-6-luna",
			"gpt-5-6-luna-pro",
			"gpt-5-6-sol",
			"gpt-5-6-sol-pro",
			"gpt-5-6-terra",
			"gpt-5-6-terra-pro",
			"gpt-5-chat",
			"gpt-5-codex",
			"gpt-5-mini",
			"gpt-5-nano",
			"gpt-5-pro",
			"o3",
			"o3-deep-research",
			"o3-mini",
			"o3-pro",
			"o4-mini"
		],
		"url-context": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6",
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-image",
			"gemini-2-5-flash-image-preview",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-image",
			"gemini-3-1-flash-image-preview",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-image",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest"
		]
	},
	zhipu: { "web-search": [
		"glm-4",
		"glm-4-1v",
		"glm-4-5",
		"glm-4-5-air",
		"glm-4-5-flash",
		"glm-4-5v",
		"glm-4-6",
		"glm-4-6v",
		"glm-4-6v-flash",
		"glm-4-7",
		"glm-4-7-flash",
		"glm-4-7-flashx",
		"glm-4-7-maas",
		"glm-4-air",
		"glm-4-airx",
		"glm-4-flash",
		"glm-4-flashx",
		"glm-4-long",
		"glm-4-plus",
		"glm-5",
		"glm-5-1",
		"glm-5-2",
		"glm-5-2-fast",
		"glm-5-maas",
		"glm-5-turbo"
	] },
	deepseek: { "web-search": [
		"deepseek-v4-flash",
		"deepseek-v4-flash-latest",
		"deepseek-v4-pro"
	] },
	"new-api": {
		"web-search": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6",
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest",
			"gpt-4-1",
			"gpt-4-1-mini",
			"gpt-4-1-nano",
			"gpt-4o",
			"gpt-4o-mini",
			"gpt-4o-mini-search-preview",
			"gpt-5",
			"gpt-5-1",
			"gpt-5-1-codex",
			"gpt-5-1-codex-max",
			"gpt-5-1-codex-mini",
			"gpt-5-1-instant",
			"gpt-5-2",
			"gpt-5-2-chat",
			"gpt-5-2-chat-latest",
			"gpt-5-2-codex",
			"gpt-5-2-pro",
			"gpt-5-3-chat",
			"gpt-5-3-chat-latest",
			"gpt-5-3-codex",
			"gpt-5-3-codex-spark",
			"gpt-5-4",
			"gpt-5-4-mini",
			"gpt-5-4-nano",
			"gpt-5-4-pro",
			"gpt-5-5",
			"gpt-5-5-pro",
			"gpt-5-6",
			"gpt-5-6-luna",
			"gpt-5-6-luna-pro",
			"gpt-5-6-sol",
			"gpt-5-6-sol-pro",
			"gpt-5-6-terra",
			"gpt-5-6-terra-pro",
			"gpt-5-chat",
			"gpt-5-codex",
			"gpt-5-mini",
			"gpt-5-nano",
			"gpt-5-pro",
			"o3",
			"o3-deep-research",
			"o3-mini",
			"o3-pro",
			"o4-mini"
		],
		"url-context": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6",
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-image",
			"gemini-2-5-flash-image-preview",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-image",
			"gemini-3-1-flash-image-preview",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-image",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest"
		]
	},
	anthropic: {
		"web-search": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6"
		],
		"url-context": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6"
		]
	},
	"claude-code": { "url-context": [
		"claude-haiku-4-5",
		"claude-opus-4",
		"claude-opus-4-1",
		"claude-opus-4-5",
		"claude-opus-4-6",
		"claude-opus-4-6-v1",
		"claude-opus-4-7",
		"claude-opus-4-7-fast",
		"claude-opus-4-8",
		"claude-opus-4-8-fast",
		"claude-sonnet-4",
		"claude-sonnet-4-5",
		"claude-sonnet-4-6"
	] },
	openai: { "web-search": [
		"gpt-4-1",
		"gpt-4-1-mini",
		"gpt-4-1-nano",
		"gpt-4o",
		"gpt-4o-mini",
		"gpt-4o-mini-search-preview",
		"gpt-5",
		"gpt-5-1",
		"gpt-5-1-codex",
		"gpt-5-1-codex-max",
		"gpt-5-1-codex-mini",
		"gpt-5-1-instant",
		"gpt-5-2",
		"gpt-5-2-chat",
		"gpt-5-2-chat-latest",
		"gpt-5-2-codex",
		"gpt-5-2-pro",
		"gpt-5-3-chat",
		"gpt-5-3-chat-latest",
		"gpt-5-3-codex",
		"gpt-5-3-codex-spark",
		"gpt-5-4",
		"gpt-5-4-mini",
		"gpt-5-4-nano",
		"gpt-5-4-pro",
		"gpt-5-5",
		"gpt-5-5-pro",
		"gpt-5-6",
		"gpt-5-6-luna",
		"gpt-5-6-luna-pro",
		"gpt-5-6-sol",
		"gpt-5-6-sol-pro",
		"gpt-5-6-terra",
		"gpt-5-6-terra-pro",
		"gpt-5-chat",
		"gpt-5-codex",
		"gpt-5-mini",
		"gpt-5-nano",
		"gpt-5-pro",
		"o3",
		"o3-deep-research",
		"o3-mini",
		"o3-pro",
		"o4-mini"
	] },
	"azure-openai": {
		"web-search": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6",
			"gpt-4-1",
			"gpt-4-1-mini",
			"gpt-4-1-nano",
			"gpt-4o",
			"gpt-4o-mini",
			"gpt-4o-mini-search-preview",
			"gpt-5",
			"gpt-5-1",
			"gpt-5-1-codex",
			"gpt-5-1-codex-max",
			"gpt-5-1-codex-mini",
			"gpt-5-1-instant",
			"gpt-5-2",
			"gpt-5-2-chat",
			"gpt-5-2-chat-latest",
			"gpt-5-2-codex",
			"gpt-5-2-pro",
			"gpt-5-3-chat",
			"gpt-5-3-chat-latest",
			"gpt-5-3-codex",
			"gpt-5-3-codex-spark",
			"gpt-5-4",
			"gpt-5-4-mini",
			"gpt-5-4-nano",
			"gpt-5-4-pro",
			"gpt-5-5",
			"gpt-5-5-pro",
			"gpt-5-6",
			"gpt-5-6-luna",
			"gpt-5-6-luna-pro",
			"gpt-5-6-sol",
			"gpt-5-6-sol-pro",
			"gpt-5-6-terra",
			"gpt-5-6-terra-pro",
			"gpt-5-chat",
			"gpt-5-codex",
			"gpt-5-mini",
			"gpt-5-nano",
			"gpt-5-pro",
			"o3",
			"o3-deep-research",
			"o3-mini",
			"o3-pro",
			"o4-mini"
		],
		"url-context": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6"
		]
	},
	gemini: {
		"web-search": [
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest"
		],
		"url-context": [
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-image",
			"gemini-2-5-flash-image-preview",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-image",
			"gemini-3-1-flash-image-preview",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-image",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest"
		]
	},
	vertexai: {
		"web-search": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6",
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest"
		],
		"url-context": [
			"gemini-2-0-flash",
			"gemini-2-0-flash-lite",
			"gemini-2-5-computer-use-preview-10-2025",
			"gemini-2-5-flash",
			"gemini-2-5-flash-image",
			"gemini-2-5-flash-image-preview",
			"gemini-2-5-flash-lite",
			"gemini-2-5-pro",
			"gemini-2-5-pro-preview",
			"gemini-2-5-pro-preview-05-06",
			"gemini-3-1-flash-image",
			"gemini-3-1-flash-image-preview",
			"gemini-3-1-flash-lite",
			"gemini-3-1-flash-lite-image",
			"gemini-3-1-flash-lite-preview",
			"gemini-3-1-flash-live-preview",
			"gemini-3-1-pro-preview",
			"gemini-3-1-pro-preview-customtools",
			"gemini-3-5-flash",
			"gemini-3-5-flash-lite",
			"gemini-3-6-flash",
			"gemini-3-flash",
			"gemini-3-flash-preview",
			"gemini-3-pro-image",
			"gemini-3-pro-image-preview",
			"gemini-3-pro-preview",
			"gemini-flash-latest",
			"gemini-flash-lite-latest",
			"gemini-pro-latest"
		]
	},
	moonshot: { "web-search": [
		"kimi-k2",
		"kimi-k2-0711-preview",
		"kimi-k2-0905-preview",
		"kimi-k2-5",
		"kimi-k2-6",
		"kimi-k2-7-code",
		"kimi-k2-7-code-highspeed",
		"kimi-k2-instruct",
		"kimi-k2-thinking-maas",
		"kimi-k2-thinking-turbo",
		"kimi-k2-turbo-preview",
		"kimi-k3",
		"kimi-k3-fast",
		"kimi-latest"
	] },
	dashscope: {
		"web-search": [
			"deepseek-r1",
			"deepseek-r1-distill-llama-70b",
			"deepseek-r1-distill-llama-8b",
			"deepseek-r1-distill-qwen-1-5b",
			"deepseek-r1-distill-qwen-14b",
			"deepseek-r1-distill-qwen-32b",
			"deepseek-r1-distill-qwen-7b",
			"deepseek-v3",
			"deepseek-v3-1",
			"deepseek-v3-1-maas",
			"deepseek-v3-1-terminus",
			"deepseek-v3-2",
			"deepseek-v3-2-exp",
			"deepseek-v3-2-maas",
			"deepseek-v4-flash",
			"deepseek-v4-flash-latest",
			"deepseek-v4-pro",
			"glm-4",
			"glm-4-1v",
			"glm-4-5",
			"glm-4-5-air",
			"glm-4-5-flash",
			"glm-4-5v",
			"glm-4-6",
			"glm-4-6v",
			"glm-4-6v-flash",
			"glm-4-7",
			"glm-4-7-flash",
			"glm-4-7-flashx",
			"glm-4-7-maas",
			"glm-4-air",
			"glm-4-airx",
			"glm-4-flash",
			"glm-4-flashx",
			"glm-4-long",
			"glm-4-plus",
			"glm-5",
			"glm-5-1",
			"glm-5-2",
			"glm-5-2-fast",
			"glm-5-maas",
			"glm-5-turbo",
			"kimi-k2",
			"kimi-k2-0711-preview",
			"kimi-k2-0905-preview",
			"kimi-k2-5",
			"kimi-k2-6",
			"kimi-k2-7-code",
			"kimi-k2-7-code-highspeed",
			"kimi-k2-instruct",
			"kimi-k2-thinking-maas",
			"kimi-k2-thinking-turbo",
			"kimi-k2-turbo-preview",
			"kimi-k3",
			"kimi-k3-fast",
			"kimi-latest",
			"minimax-m2-1",
			"qwen-flash",
			"qwen-plus",
			"qwen-plus-character",
			"qwen-plus-character-ja",
			"qwen-turbo",
			"qwen3-5-flash",
			"qwen3-5-flash-02-23",
			"qwen3-5-plus",
			"qwen3-5-plus-02-15",
			"qwen3-6-flash",
			"qwen3-6-max-preview",
			"qwen3-6-plus",
			"qwen3-7-max",
			"qwen3-7-plus",
			"qwen3-8-max",
			"qwen3-8-max-preview",
			"qwen3-max",
			"qwen3-max-preview",
			"qwq-plus"
		],
		"url-context": [
			"qwen-flash",
			"qwen-plus",
			"qwen-plus-character",
			"qwen-plus-character-ja",
			"qwen3-5-flash",
			"qwen3-5-flash-02-23",
			"qwen3-5-plus",
			"qwen3-5-plus-02-15",
			"qwen3-6-flash",
			"qwen3-6-max-preview",
			"qwen3-6-plus",
			"qwen3-7-max",
			"qwen3-7-plus",
			"qwen3-8-max",
			"qwen3-8-max-preview",
			"qwen3-max",
			"qwen3-max-preview"
		]
	},
	doubao: { "web-search": [
		"doubao-seed-1-6",
		"doubao-seed-1-8",
		"doubao-seed-2-0-code-preview",
		"doubao-seed-2-0-lite",
		"doubao-seed-2-0-mini",
		"doubao-seed-2-0-pro",
		"doubao-seed-2-1-pro",
		"doubao-seed-2-1-turbo",
		"doubao-seed-character",
		"doubao-seed-evolving"
	] },
	grok: { "web-search": [
		"grok-4",
		"grok-4-1",
		"grok-4-1-fast",
		"grok-4-1-fast-non-reasoning",
		"grok-4-20",
		"grok-4-20-0309-non-reasoning",
		"grok-4-20-multi-agent",
		"grok-4-20-multi-agent-beta",
		"grok-4-20-non-reasoning",
		"grok-4-20-non-reasoning-beta",
		"grok-4-20-reasoning-beta",
		"grok-4-3",
		"grok-4-5",
		"grok-4-fast"
	] },
	perplexity: { "web-search": [
		"sonar",
		"sonar-deep-research",
		"sonar-pro",
		"sonar-reasoning-pro"
	] },
	"aws-bedrock": {
		"web-search": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6"
		],
		"url-context": [
			"claude-haiku-4-5",
			"claude-opus-4",
			"claude-opus-4-1",
			"claude-opus-4-5",
			"claude-opus-4-6",
			"claude-opus-4-6-v1",
			"claude-opus-4-7",
			"claude-opus-4-7-fast",
			"claude-opus-4-8",
			"claude-opus-4-8-fast",
			"claude-sonnet-4",
			"claude-sonnet-4-5",
			"claude-sonnet-4-6"
		]
	},
	poe: { "web-search": [
		"claude-haiku-4-5",
		"claude-opus-4",
		"claude-opus-4-1",
		"claude-opus-4-5",
		"claude-opus-4-6",
		"claude-opus-4-6-v1",
		"claude-opus-4-7",
		"claude-opus-4-7-fast",
		"claude-opus-4-8",
		"claude-opus-4-8-fast",
		"claude-sonnet-4",
		"claude-sonnet-4-5",
		"claude-sonnet-4-6",
		"deepseek-r1",
		"deepseek-r1-distill-llama-70b",
		"deepseek-r1-distill-llama-8b",
		"deepseek-r1-distill-qwen-1-5b",
		"deepseek-r1-distill-qwen-14b",
		"deepseek-r1-distill-qwen-32b",
		"deepseek-r1-distill-qwen-7b",
		"deepseek-v3",
		"deepseek-v3-1",
		"deepseek-v3-1-maas",
		"deepseek-v3-1-terminus",
		"deepseek-v3-2",
		"deepseek-v3-2-exp",
		"deepseek-v3-2-maas",
		"deepseek-v4-flash",
		"deepseek-v4-flash-latest",
		"deepseek-v4-pro",
		"doubao-seed-1-6",
		"doubao-seed-1-8",
		"doubao-seed-2-0-code-preview",
		"doubao-seed-2-0-lite",
		"doubao-seed-2-0-mini",
		"doubao-seed-2-0-pro",
		"doubao-seed-2-1-pro",
		"doubao-seed-2-1-turbo",
		"doubao-seed-character",
		"doubao-seed-evolving",
		"gemini-2-0-flash",
		"gemini-2-0-flash-lite",
		"gemini-2-5-computer-use-preview-10-2025",
		"gemini-2-5-flash",
		"gemini-2-5-flash-lite",
		"gemini-2-5-pro",
		"gemini-2-5-pro-preview",
		"gemini-2-5-pro-preview-05-06",
		"gemini-3-1-flash-lite",
		"gemini-3-1-flash-lite-preview",
		"gemini-3-1-flash-live-preview",
		"gemini-3-1-pro-preview",
		"gemini-3-1-pro-preview-customtools",
		"gemini-3-5-flash",
		"gemini-3-5-flash-lite",
		"gemini-3-6-flash",
		"gemini-3-flash",
		"gemini-3-flash-preview",
		"gemini-3-pro-image",
		"gemini-3-pro-image-preview",
		"gemini-3-pro-preview",
		"gemini-flash-latest",
		"gemini-flash-lite-latest",
		"gemini-pro-latest",
		"glm-4",
		"glm-4-1v",
		"glm-4-5",
		"glm-4-5-air",
		"glm-4-5-flash",
		"glm-4-5v",
		"glm-4-6",
		"glm-4-6v",
		"glm-4-6v-flash",
		"glm-4-7",
		"glm-4-7-flash",
		"glm-4-7-flashx",
		"glm-4-7-maas",
		"glm-4-air",
		"glm-4-airx",
		"glm-4-flash",
		"glm-4-flashx",
		"glm-4-long",
		"glm-4-plus",
		"glm-5",
		"glm-5-1",
		"glm-5-2",
		"glm-5-2-fast",
		"glm-5-maas",
		"glm-5-turbo",
		"gpt-4-1",
		"gpt-4-1-mini",
		"gpt-4-1-nano",
		"gpt-4o",
		"gpt-4o-mini",
		"gpt-4o-mini-search-preview",
		"gpt-5",
		"gpt-5-1",
		"gpt-5-1-codex",
		"gpt-5-1-codex-max",
		"gpt-5-1-codex-mini",
		"gpt-5-1-instant",
		"gpt-5-2",
		"gpt-5-2-chat",
		"gpt-5-2-chat-latest",
		"gpt-5-2-codex",
		"gpt-5-2-pro",
		"gpt-5-3-chat",
		"gpt-5-3-chat-latest",
		"gpt-5-3-codex",
		"gpt-5-3-codex-spark",
		"gpt-5-4",
		"gpt-5-4-mini",
		"gpt-5-4-nano",
		"gpt-5-4-pro",
		"gpt-5-5",
		"gpt-5-5-pro",
		"gpt-5-6",
		"gpt-5-6-luna",
		"gpt-5-6-luna-pro",
		"gpt-5-6-sol",
		"gpt-5-6-sol-pro",
		"gpt-5-6-terra",
		"gpt-5-6-terra-pro",
		"gpt-5-chat",
		"gpt-5-codex",
		"gpt-5-mini",
		"gpt-5-nano",
		"gpt-5-pro",
		"grok-4",
		"grok-4-1",
		"grok-4-1-fast",
		"grok-4-1-fast-non-reasoning",
		"grok-4-20",
		"grok-4-20-0309-non-reasoning",
		"grok-4-20-multi-agent",
		"grok-4-20-multi-agent-beta",
		"grok-4-20-non-reasoning",
		"grok-4-20-non-reasoning-beta",
		"grok-4-20-reasoning-beta",
		"grok-4-3",
		"grok-4-5",
		"grok-4-fast",
		"kimi-k2",
		"kimi-k2-0711-preview",
		"kimi-k2-0905-preview",
		"kimi-k2-5",
		"kimi-k2-6",
		"kimi-k2-7-code",
		"kimi-k2-7-code-highspeed",
		"kimi-k2-instruct",
		"kimi-k2-thinking-maas",
		"kimi-k2-thinking-turbo",
		"kimi-k2-turbo-preview",
		"kimi-k3",
		"kimi-k3-fast",
		"kimi-latest",
		"minimax-m2-1",
		"o3",
		"o3-deep-research",
		"o3-mini",
		"o3-pro",
		"o4-mini",
		"qwen-flash",
		"qwen-plus",
		"qwen-plus-character",
		"qwen-plus-character-ja",
		"qwen-turbo",
		"qwen3-5-flash",
		"qwen3-5-flash-02-23",
		"qwen3-5-plus",
		"qwen3-5-plus-02-15",
		"qwen3-6-flash",
		"qwen3-6-max-preview",
		"qwen3-6-plus",
		"qwen3-7-max",
		"qwen3-7-plus",
		"qwen3-8-max",
		"qwen3-8-max-preview",
		"qwen3-max",
		"qwen3-max-preview",
		"qwq-plus",
		"sonar",
		"sonar-deep-research",
		"sonar-pro",
		"sonar-reasoning-pro"
	] }
}).map(([providerId, tools]) => [providerId, new Map(Object.entries(tools).map(([tool, ids]) => [tool, new Set(ids)]))]));
function isServerToolModelEligible(rawModelId, providerId, tool) {
	const ids = ELIGIBLE_MODEL_IDS.get(providerId)?.get(tool);
	if (!ids) return false;
	const exact = normalizeModelId(rawModelId, { keepParameterSize: true });
	return ids.has(exact) || ids.has(normalizeModelId(rawModelId));
}
const PricePerTokenSchema = object$1({
	perMillionTokens: number$3().nonnegative().nullable(),
	currency: _enum$1(objectValues(CURRENCY)).default(CURRENCY.USD).optional()
});
const ThinkingTokenLimitsSchema = object$1({
	min: number$3().nonnegative().optional(),
	max: number$3().positive().optional(),
	default: number$3().nonnegative().optional()
}).refine((limits) => limits.min === void 0 || limits.max === void 0 || limits.min <= limits.max, {
	message: "min must be less than or equal to max",
	path: ["min"]
});
var ReasoningEffortSchema = _enum$1(objectValues(REASONING_EFFORT));
var CommonReasoningFieldsSchema = {
	controls: array$1(ReasoningControlSchema).optional(),
	thinkingTokenLimits: ThinkingTokenLimitsSchema.optional(),
	selectableEfforts: array$1(ReasoningEffortSchema).optional(),
	defaultEffort: ReasoningEffortSchema.optional(),
	interleaved: boolean$2().optional()
};
var NumericRangeSchema = object$1({
	min: number$3(),
	max: number$3()
});
const ParameterSupportDbSchema = object$1({
	temperature: object$1({
		supported: boolean$2(),
		range: NumericRangeSchema.optional()
	}).optional(),
	topP: object$1({
		supported: boolean$2(),
		range: NumericRangeSchema.optional()
	}).optional(),
	topK: object$1({
		supported: boolean$2(),
		range: NumericRangeSchema.optional()
	}).optional(),
	frequencyPenalty: boolean$2().optional(),
	presencePenalty: boolean$2().optional(),
	maxTokens: boolean$2().optional(),
	stopSequences: boolean$2().optional(),
	systemMessage: boolean$2().optional()
});
var RESERVED_UNIQUE_MODEL_ID_ROUTE_CHARS = ["?", "#"];
function isUniqueModelId(value) {
	return typeof value === "string" && value.includes("::");
}
const UniqueModelIdSchema = custom((value) => {
	if (typeof value !== "string") return false;
	const idx = value.indexOf("::");
	if (idx <= 0) return false;
	const modelId = value.slice(idx + 2);
	if (modelId.length === 0) return false;
	return !RESERVED_UNIQUE_MODEL_ID_ROUTE_CHARS.some((char) => modelId.includes(char));
}, { message: `Must be a valid UniqueModelId (providerId::modelId)` });
function createUniqueModelId(providerId, modelId) {
	if (providerId.length === 0) throw new Error("providerId cannot be empty");
	if (providerId.includes("::")) throw new Error(`providerId cannot contain "::": ${providerId}`);
	if (modelId.length === 0) throw new Error("modelId cannot be empty");
	const reservedChar = RESERVED_UNIQUE_MODEL_ID_ROUTE_CHARS.find((char) => modelId.includes(char));
	if (reservedChar) throw new Error(`modelId cannot contain reserved route character "${reservedChar}": ${modelId}`);
	return `${providerId}::${modelId}`;
}
function parseUniqueModelId(uniqueId) {
	const idx = uniqueId.indexOf("::");
	if (idx === -1) throw new Error(`Invalid UniqueModelId format: ${uniqueId}`);
	return {
		providerId: uniqueId.slice(0, idx),
		modelId: uniqueId.slice(idx + 2)
	};
}
const UI_CAPABILITY_TAGS = [
	MODEL_CAPABILITY.IMAGE_RECOGNITION,
	MODEL_CAPABILITY.IMAGE_GENERATION,
	MODEL_CAPABILITY.AUDIO_RECOGNITION,
	MODEL_CAPABILITY.AUDIO_GENERATION,
	MODEL_CAPABILITY.VIDEO_RECOGNITION,
	MODEL_CAPABILITY.VIDEO_GENERATION,
	MODEL_CAPABILITY.EMBEDDING,
	MODEL_CAPABILITY.REASONING,
	MODEL_CAPABILITY.FUNCTION_CALL,
	MODEL_CAPABILITY.RERANK
];
const UI_SERVER_TOOL_TAGS = [SERVER_TOOL.WEB_SEARCH];
[...UI_CAPABILITY_TAGS, ...UI_SERVER_TOOL_TAGS];
const RuntimeReasoningSchema = object$1({ ...CommonReasoningFieldsSchema }).required({ selectableEfforts: true });
const RuntimeParameterSupportSchema = object$1({
	temperature: object$1({
		supported: boolean$2(),
		min: number$3(),
		max: number$3(),
		default: number$3().optional()
	}).optional(),
	topP: object$1({
		supported: boolean$2(),
		min: number$3(),
		max: number$3(),
		default: number$3().optional()
	}).optional(),
	topK: object$1({
		supported: boolean$2(),
		min: number$3(),
		max: number$3()
	}).optional(),
	frequencyPenalty: boolean$2().optional(),
	presencePenalty: boolean$2().optional(),
	maxTokens: boolean$2(),
	stopSequences: boolean$2(),
	systemMessage: boolean$2()
});
const InputTokenPricingTierSchema = object$1({
	minInputTokens: number$3().int().positive().refine(Number.isSafeInteger),
	input: PricePerTokenSchema,
	output: PricePerTokenSchema,
	cacheRead: PricePerTokenSchema.optional(),
	cacheWrite: PricePerTokenSchema.optional()
});
const RuntimeModelPricingSchema = object$1({
	input: PricePerTokenSchema,
	output: PricePerTokenSchema,
	cacheRead: PricePerTokenSchema.optional(),
	cacheWrite: PricePerTokenSchema.optional(),
	inputTokenTiers: array$1(InputTokenPricingTierSchema).optional(),
	perImage: object$1({
		price: number$3(),
		unit: _enum$1(["image", "pixel"]).optional()
	}).optional(),
	perMinute: object$1({ price: number$3() }).optional()
}).superRefine((pricing, ctx) => {
	for (let index = 1; index < (pricing.inputTokenTiers?.length ?? 0); index++) {
		const previous = pricing.inputTokenTiers[index - 1];
		if (pricing.inputTokenTiers[index].minInputTokens <= previous.minInputTokens) ctx.addIssue({
			code: "custom",
			path: [
				"inputTokenTiers",
				index,
				"minInputTokens"
			],
			message: "minInputTokens must be strictly increasing"
		});
	}
	if (!pricing.inputTokenTiers?.length) return;
	const rates = [
		{
			rate: pricing.input,
			path: ["input"]
		},
		{
			rate: pricing.output,
			path: ["output"]
		},
		...pricing.cacheRead ? [{
			rate: pricing.cacheRead,
			path: ["cacheRead"]
		}] : [],
		...pricing.cacheWrite ? [{
			rate: pricing.cacheWrite,
			path: ["cacheWrite"]
		}] : [],
		...(pricing.inputTokenTiers ?? []).flatMap((tier, index) => [
			{
				rate: tier.input,
				path: [
					"inputTokenTiers",
					index,
					"input"
				]
			},
			{
				rate: tier.output,
				path: [
					"inputTokenTiers",
					index,
					"output"
				]
			},
			...tier.cacheRead ? [{
				rate: tier.cacheRead,
				path: [
					"inputTokenTiers",
					index,
					"cacheRead"
				]
			}] : [],
			...tier.cacheWrite ? [{
				rate: tier.cacheWrite,
				path: [
					"inputTokenTiers",
					index,
					"cacheWrite"
				]
			}] : []
		])
	];
	const currency = pricing.input.currency ?? CURRENCY.USD;
	for (const { rate, path } of rates) if ((rate.currency ?? CURRENCY.USD) !== currency) ctx.addIssue({
		code: "custom",
		path: [...path, "currency"],
		message: "pricing currencies must match"
	});
});
object$1({
	id: UniqueModelIdSchema,
	providerId: string$2(),
	apiModelId: string$2().optional(),
	presetModelId: string$2().nullable().optional(),
	name: string$2(),
	description: string$2().optional(),
	group: string$2().optional(),
	family: string$2().optional(),
	ownedBy: string$2().optional(),
	capabilities: array$1(_enum$1(objectValues(MODEL_CAPABILITY))),
	inputModalities: array$1(_enum$1(objectValues(MODALITY))).optional(),
	outputModalities: array$1(_enum$1(objectValues(MODALITY))).optional(),
	contextWindow: number$3().optional(),
	maxOutputTokens: number$3().optional(),
	maxInputTokens: number$3().optional(),
	endpointTypes: array$1(_enum$1(objectValues(ENDPOINT_TYPE))).optional(),
	supportsStreaming: boolean$2(),
	reasoning: RuntimeReasoningSchema.optional(),
	supportsFastMode: boolean$2().optional(),
	parameterSupport: RuntimeParameterSupportSchema.optional(),
	pricing: RuntimeModelPricingSchema.optional(),
	imageGeneration: ImageGenerationSupportSchema.optional(),
	isEnabled: boolean$2(),
	isHidden: boolean$2(),
	isDeprecated: boolean$2().optional(),
	replaceWith: UniqueModelIdSchema.optional(),
	notes: string$2().optional()
});
export { SERVER_TOOL_MODEL_SCOPE as C, SERVER_TOOL as S, ENDPOINT_TYPE as _, isUniqueModelId as a, REASONING_EFFORT as b, isWebSearchEffortUnsupported as c, FastModeTransportSchema as d, ServerToolConfigSchema as f, CURRENCY as g, buildParamsSchema as h, createUniqueModelId as i, supportsServerToolFunctionMixing as l, matchVendor as m, RuntimeModelPricingSchema as n, parseUniqueModelId as o, VENDOR_PATTERNS as p, UniqueModelIdSchema as r, isServerToolModelEligible as s, ParameterSupportDbSchema as t, endpointImpliedCapability as u, MODALITY as v, objectValues as w, REASONING_EFFORT_ORDER as x, MODEL_CAPABILITY as y };
