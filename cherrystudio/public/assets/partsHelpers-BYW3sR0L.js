import { s as __toESM, t as __commonJSMin } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { C as string, S as strictObject, T as unknown, _ as object$1, a as array$1, c as discriminatedUnion, f as lazy, g as number, h as never, i as _null, n as _enum, o as boolean, p as literal, r as _instanceof, s as custom, w as union, x as record } from "./schemas-CV_EtlSZ.js";
import { r as resolver_default } from "./resolver-DYDQGqns.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { t as toast } from "./toast-DKTI9lZN.js";
import { C as withUserAgentSuffix, S as validateTypes, _ as readResponseWithSizeLimit, a as isToolUIPart, b as safeValidateTypes, c as DEFAULT_MAX_DOWNLOAD_SIZE, d as createIdGenerator, f as generateId, g as parseJsonEventStream, h as normalizeHeaders, l as DownloadError, m as lazySchema, o as readUIMessageStream, p as getRuntimeEnvironmentUserAgent, u as asSchema, v as resolve, w as zodSchema, x as validateDownloadUrl, y as safeParseJSON } from "./dist-Zc546Plu.js";
import { i as readCherryMeta } from "./uiParts-B-0xzcKJ.js";
var marker$1 = "vercel.ai.error";
var symbol$1 = Symbol.for(marker$1);
var _a$1, _b;
var AISDKError = class _AISDKError extends (_b = Error, _a$1 = symbol$1, _b) {
	constructor({ name: name14$1, message, cause }) {
		super(message);
		this[_a$1] = true;
		this.name = name14$1;
		this.cause = cause;
	}
	static isInstance(error) {
		return _AISDKError.hasMarker(error, marker$1);
	}
	static hasMarker(error, marker15$1) {
		const markerSymbol = Symbol.for(marker15$1);
		return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
	}
};
function getErrorMessage$1(error) {
	if (error == null) return "unknown error";
	if (typeof error === "string") return error;
	if (error instanceof Error) return error.message;
	return JSON.stringify(error);
}
var name12$1 = "AI_TypeValidationError";
var marker13$1 = `vercel.ai.error.${name12$1}`;
var symbol13$1 = Symbol.for(marker13$1);
var _a13$1, _b13;
var TypeValidationError = class _TypeValidationError extends (_b13 = AISDKError, _a13$1 = symbol13$1, _b13) {
	constructor({ value, cause, context }) {
		let contextPrefix = "Type validation failed";
		if (context == null ? void 0 : context.field) contextPrefix += ` for ${context.field}`;
		if ((context == null ? void 0 : context.entityName) || (context == null ? void 0 : context.entityId)) {
			contextPrefix += " (";
			const parts = [];
			if (context.entityName) parts.push(context.entityName);
			if (context.entityId) parts.push(`id: "${context.entityId}"`);
			contextPrefix += parts.join(", ");
			contextPrefix += ")";
		}
		super({
			name: name12$1,
			message: `${contextPrefix}: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage$1(cause)}`,
			cause
		});
		this[_a13$1] = true;
		this.value = value;
		this.context = context;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker13$1);
	}
	static wrap({ value, cause, context }) {
		var _a15$1, _b15, _c;
		if (_TypeValidationError.isInstance(cause) && cause.value === value && ((_a15$1 = cause.context) == null ? void 0 : _a15$1.field) === (context == null ? void 0 : context.field) && ((_b15 = cause.context) == null ? void 0 : _b15.entityName) === (context == null ? void 0 : context.entityName) && ((_c = cause.context) == null ? void 0 : _c.entityId) === (context == null ? void 0 : context.entityId)) return cause;
		return new _TypeValidationError({
			value,
			cause,
			context
		});
	}
};
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name21 in all) __defProp(target, name21, {
		get: all[name21],
		enumerable: true
	});
};
var name8 = "AI_NoObjectGeneratedError";
var marker8 = `vercel.ai.error.${name8}`;
var symbol8 = Symbol.for(marker8);
var _a8;
var NoObjectGeneratedError = class extends AISDKError {
	constructor({ message = "No object generated.", cause, text: text2, response, usage, finishReason }) {
		super({
			name: name8,
			message,
			cause
		});
		this[_a8] = true;
		this.text = text2;
		this.response = response;
		this.usage = usage;
		this.finishReason = finishReason;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker8);
	}
};
_a8 = symbol8;
var name15 = "AI_UIMessageStreamError";
var marker15 = `vercel.ai.error.${name15}`;
var symbol15 = Symbol.for(marker15);
var _a15;
var UIMessageStreamError = class extends AISDKError {
	constructor({ chunkType, chunkId, message }) {
		super({
			name: name15,
			message
		});
		this[_a15] = true;
		this.chunkType = chunkType;
		this.chunkId = chunkId;
	}
	static isInstance(error) {
		return AISDKError.hasMarker(error, marker15);
	}
};
_a15 = symbol15;
var VERSION = "6.0.185";
var download = async ({ url, maxBytes, abortSignal }) => {
	var _a21;
	const urlText = url.toString();
	validateDownloadUrl(urlText);
	try {
		const response = await fetch(urlText, {
			headers: withUserAgentSuffix({}, `ai-sdk/${VERSION}`, getRuntimeEnvironmentUserAgent()),
			signal: abortSignal
		});
		if (response.redirected) validateDownloadUrl(response.url);
		if (!response.ok) throw new DownloadError({
			url: urlText,
			statusCode: response.status,
			statusText: response.statusText
		});
		return {
			data: await readResponseWithSizeLimit({
				response,
				url: urlText,
				maxBytes: maxBytes != null ? maxBytes : DEFAULT_MAX_DOWNLOAD_SIZE
			}),
			mediaType: (_a21 = response.headers.get("content-type")) != null ? _a21 : void 0
		};
	} catch (error) {
		if (DownloadError.isInstance(error)) throw error;
		throw new DownloadError({
			url: urlText,
			cause: error
		});
	}
};
var dataContentSchema = union([
	string(),
	_instanceof(Uint8Array),
	_instanceof(ArrayBuffer),
	custom((value) => {
		var _a21, _b$1;
		return (_b$1 = (_a21 = globalThis.Buffer) == null ? void 0 : _a21.isBuffer(value)) != null ? _b$1 : false;
	}, { message: "Must be a Buffer" })
]);
var jsonValueSchema = lazy(() => union([
	_null(),
	string(),
	number(),
	boolean(),
	record(string(), jsonValueSchema.optional()),
	array$1(jsonValueSchema)
]));
var providerMetadataSchema = record(string(), record(string(), jsonValueSchema.optional()));
var textPartSchema = object$1({
	type: literal("text"),
	text: string(),
	providerOptions: providerMetadataSchema.optional()
});
var imagePartSchema = object$1({
	type: literal("image"),
	image: union([dataContentSchema, _instanceof(URL)]),
	mediaType: string().optional(),
	providerOptions: providerMetadataSchema.optional()
});
var filePartSchema = object$1({
	type: literal("file"),
	data: union([dataContentSchema, _instanceof(URL)]),
	filename: string().optional(),
	mediaType: string(),
	providerOptions: providerMetadataSchema.optional()
});
var reasoningPartSchema = object$1({
	type: literal("reasoning"),
	text: string(),
	providerOptions: providerMetadataSchema.optional()
});
var toolCallPartSchema = object$1({
	type: literal("tool-call"),
	toolCallId: string(),
	toolName: string(),
	input: unknown(),
	providerOptions: providerMetadataSchema.optional(),
	providerExecuted: boolean().optional()
});
var outputSchema = discriminatedUnion("type", [
	object$1({
		type: literal("text"),
		value: string(),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("json"),
		value: jsonValueSchema,
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("execution-denied"),
		reason: string().optional(),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("error-text"),
		value: string(),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("error-json"),
		value: jsonValueSchema,
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		type: literal("content"),
		value: array$1(union([
			object$1({
				type: literal("text"),
				text: string(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("media"),
				data: string(),
				mediaType: string()
			}),
			object$1({
				type: literal("file-data"),
				data: string(),
				mediaType: string(),
				filename: string().optional(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("file-url"),
				url: string(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("file-id"),
				fileId: union([string(), record(string(), string())]),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("image-data"),
				data: string(),
				mediaType: string(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("image-url"),
				url: string(),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("image-file-id"),
				fileId: union([string(), record(string(), string())]),
				providerOptions: providerMetadataSchema.optional()
			}),
			object$1({
				type: literal("custom"),
				providerOptions: providerMetadataSchema.optional()
			})
		]))
	})
]);
var toolResultPartSchema = object$1({
	type: literal("tool-result"),
	toolCallId: string(),
	toolName: string(),
	output: outputSchema,
	providerOptions: providerMetadataSchema.optional()
});
var toolApprovalRequestSchema = object$1({
	type: literal("tool-approval-request"),
	approvalId: string(),
	toolCallId: string()
});
var toolApprovalResponseSchema = object$1({
	type: literal("tool-approval-response"),
	approvalId: string(),
	approved: boolean(),
	reason: string().optional()
});
union([
	object$1({
		role: literal("system"),
		content: string(),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		role: literal("user"),
		content: union([string(), array$1(union([
			textPartSchema,
			imagePartSchema,
			filePartSchema
		]))]),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		role: literal("assistant"),
		content: union([string(), array$1(union([
			textPartSchema,
			filePartSchema,
			reasoningPartSchema,
			toolCallPartSchema,
			toolResultPartSchema,
			toolApprovalRequestSchema
		]))]),
		providerOptions: providerMetadataSchema.optional()
	}),
	object$1({
		role: literal("tool"),
		content: array$1(union([toolResultPartSchema, toolApprovalResponseSchema])),
		providerOptions: providerMetadataSchema.optional()
	})
]);
function mergeObjects(base, overrides) {
	if (base === void 0 && overrides === void 0) return;
	if (base === void 0) return overrides;
	if (overrides === void 0) return base;
	const result = { ...base };
	for (const key in overrides) {
		if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
		if (Object.prototype.hasOwnProperty.call(overrides, key)) {
			const overridesValue = overrides[key];
			if (overridesValue === void 0) continue;
			const baseValue = key in base ? base[key] : void 0;
			const isSourceObject = overridesValue !== null && typeof overridesValue === "object" && !Array.isArray(overridesValue) && !(overridesValue instanceof Date) && !(overridesValue instanceof RegExp);
			const isTargetObject = baseValue !== null && baseValue !== void 0 && typeof baseValue === "object" && !Array.isArray(baseValue) && !(baseValue instanceof Date) && !(baseValue instanceof RegExp);
			if (isSourceObject && isTargetObject) result[key] = mergeObjects(baseValue, overridesValue);
			else result[key] = overridesValue;
		}
	}
	return result;
}
__export({}, {
	array: () => array,
	choice: () => choice,
	json: () => json,
	object: () => object,
	text: () => text
});
function fixJson(input) {
	const stack = ["ROOT"];
	let lastValidIndex = -1;
	let literalStart = null;
	function processValueStart(char, i, swapState) {
		switch (char) {
			case "\"":
				lastValidIndex = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_STRING");
				break;
			case "f":
			case "t":
			case "n":
				lastValidIndex = i;
				literalStart = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_LITERAL");
				break;
			case "-":
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_NUMBER");
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				lastValidIndex = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_NUMBER");
				break;
			case "{":
				lastValidIndex = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_OBJECT_START");
				break;
			case "[":
				lastValidIndex = i;
				stack.pop();
				stack.push(swapState);
				stack.push("INSIDE_ARRAY_START");
				break;
		}
	}
	function processAfterObjectValue(char, i) {
		switch (char) {
			case ",":
				stack.pop();
				stack.push("INSIDE_OBJECT_AFTER_COMMA");
				break;
			case "}":
				lastValidIndex = i;
				stack.pop();
				break;
		}
	}
	function processAfterArrayValue(char, i) {
		switch (char) {
			case ",":
				stack.pop();
				stack.push("INSIDE_ARRAY_AFTER_COMMA");
				break;
			case "]":
				lastValidIndex = i;
				stack.pop();
				break;
		}
	}
	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		switch (stack[stack.length - 1]) {
			case "ROOT":
				processValueStart(char, i, "FINISH");
				break;
			case "INSIDE_OBJECT_START":
				switch (char) {
					case "\"":
						stack.pop();
						stack.push("INSIDE_OBJECT_KEY");
						break;
					case "}":
						lastValidIndex = i;
						stack.pop();
						break;
				}
				break;
			case "INSIDE_OBJECT_AFTER_COMMA":
				switch (char) {
					case "\"":
						stack.pop();
						stack.push("INSIDE_OBJECT_KEY");
						break;
				}
				break;
			case "INSIDE_OBJECT_KEY":
				switch (char) {
					case "\"":
						stack.pop();
						stack.push("INSIDE_OBJECT_AFTER_KEY");
						break;
				}
				break;
			case "INSIDE_OBJECT_AFTER_KEY":
				switch (char) {
					case ":":
						stack.pop();
						stack.push("INSIDE_OBJECT_BEFORE_VALUE");
						break;
				}
				break;
			case "INSIDE_OBJECT_BEFORE_VALUE":
				processValueStart(char, i, "INSIDE_OBJECT_AFTER_VALUE");
				break;
			case "INSIDE_OBJECT_AFTER_VALUE":
				processAfterObjectValue(char, i);
				break;
			case "INSIDE_STRING":
				switch (char) {
					case "\"":
						stack.pop();
						lastValidIndex = i;
						break;
					case "\\":
						stack.push("INSIDE_STRING_ESCAPE");
						break;
					default: lastValidIndex = i;
				}
				break;
			case "INSIDE_ARRAY_START":
				switch (char) {
					case "]":
						lastValidIndex = i;
						stack.pop();
						break;
					default:
						lastValidIndex = i;
						processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
						break;
				}
				break;
			case "INSIDE_ARRAY_AFTER_VALUE":
				switch (char) {
					case ",":
						stack.pop();
						stack.push("INSIDE_ARRAY_AFTER_COMMA");
						break;
					case "]":
						lastValidIndex = i;
						stack.pop();
						break;
					default:
						lastValidIndex = i;
						break;
				}
				break;
			case "INSIDE_ARRAY_AFTER_COMMA":
				processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
				break;
			case "INSIDE_STRING_ESCAPE":
				stack.pop();
				lastValidIndex = i;
				break;
			case "INSIDE_NUMBER":
				switch (char) {
					case "0":
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						lastValidIndex = i;
						break;
					case "e":
					case "E":
					case "-":
					case ".": break;
					case ",":
						stack.pop();
						if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") processAfterArrayValue(char, i);
						if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") processAfterObjectValue(char, i);
						break;
					case "}":
						stack.pop();
						if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") processAfterObjectValue(char, i);
						break;
					case "]":
						stack.pop();
						if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") processAfterArrayValue(char, i);
						break;
					default:
						stack.pop();
						break;
				}
				break;
			case "INSIDE_LITERAL": {
				const partialLiteral = input.substring(literalStart, i + 1);
				if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
					stack.pop();
					if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") processAfterObjectValue(char, i);
					else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") processAfterArrayValue(char, i);
				} else lastValidIndex = i;
				break;
			}
		}
	}
	let result = input.slice(0, lastValidIndex + 1);
	for (let i = stack.length - 1; i >= 0; i--) switch (stack[i]) {
		case "INSIDE_STRING":
			result += "\"";
			break;
		case "INSIDE_OBJECT_KEY":
		case "INSIDE_OBJECT_AFTER_KEY":
		case "INSIDE_OBJECT_AFTER_COMMA":
		case "INSIDE_OBJECT_START":
		case "INSIDE_OBJECT_BEFORE_VALUE":
		case "INSIDE_OBJECT_AFTER_VALUE":
			result += "}";
			break;
		case "INSIDE_ARRAY_START":
		case "INSIDE_ARRAY_AFTER_COMMA":
		case "INSIDE_ARRAY_AFTER_VALUE":
			result += "]";
			break;
		case "INSIDE_LITERAL": {
			const partialLiteral = input.substring(literalStart, input.length);
			if ("true".startsWith(partialLiteral)) result += "true".slice(partialLiteral.length);
			else if ("false".startsWith(partialLiteral)) result += "false".slice(partialLiteral.length);
			else if ("null".startsWith(partialLiteral)) result += "null".slice(partialLiteral.length);
		}
	}
	return result;
}
async function parsePartialJson(jsonText) {
	if (jsonText === void 0) return {
		value: void 0,
		state: "undefined-input"
	};
	let result = await safeParseJSON({ text: jsonText });
	if (result.success) return {
		value: result.value,
		state: "successful-parse"
	};
	result = await safeParseJSON({ text: fixJson(jsonText) });
	if (result.success) return {
		value: result.value,
		state: "repaired-parse"
	};
	return {
		value: void 0,
		state: "failed-parse"
	};
}
var text = () => ({
	name: "text",
	responseFormat: Promise.resolve({ type: "text" }),
	async parseCompleteOutput({ text: text2 }) {
		return text2;
	},
	async parsePartialOutput({ text: text2 }) {
		return { partial: text2 };
	},
	createElementStreamTransform() {}
});
var object = ({ schema: inputSchema, name: name21, description }) => {
	const schema = asSchema(inputSchema);
	return {
		name: "object",
		responseFormat: resolve(schema.jsonSchema).then((jsonSchema2) => ({
			type: "json",
			schema: jsonSchema2,
			...name21 != null && { name: name21 },
			...description != null && { description }
		})),
		async parseCompleteOutput({ text: text2 }, context2) {
			const parseResult = await safeParseJSON({ text: text2 });
			if (!parseResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: could not parse the response.",
				cause: parseResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			const validationResult = await safeValidateTypes({
				value: parseResult.value,
				schema
			});
			if (!validationResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: response did not match schema.",
				cause: validationResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			return validationResult.value;
		},
		async parsePartialOutput({ text: text2 }) {
			const result = await parsePartialJson(text2);
			switch (result.state) {
				case "failed-parse":
				case "undefined-input": return;
				case "repaired-parse":
				case "successful-parse": return { partial: result.value };
			}
		},
		createElementStreamTransform() {}
	};
};
var array = ({ element: inputElementSchema, name: name21, description }) => {
	const elementSchema = asSchema(inputElementSchema);
	return {
		name: "array",
		responseFormat: resolve(elementSchema.jsonSchema).then((jsonSchema2) => {
			const { $schema, ...itemSchema } = jsonSchema2;
			return {
				type: "json",
				schema: {
					$schema: "http://json-schema.org/draft-07/schema#",
					type: "object",
					properties: { elements: {
						type: "array",
						items: itemSchema
					} },
					required: ["elements"],
					additionalProperties: false
				},
				...name21 != null && { name: name21 },
				...description != null && { description }
			};
		}),
		async parseCompleteOutput({ text: text2 }, context2) {
			const parseResult = await safeParseJSON({ text: text2 });
			if (!parseResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: could not parse the response.",
				cause: parseResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			const outerValue = parseResult.value;
			if (outerValue == null || typeof outerValue !== "object" || !("elements" in outerValue) || !Array.isArray(outerValue.elements)) throw new NoObjectGeneratedError({
				message: "No object generated: response did not match schema.",
				cause: new TypeValidationError({
					value: outerValue,
					cause: "response must be an object with an elements array"
				}),
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			for (const element of outerValue.elements) {
				const validationResult = await safeValidateTypes({
					value: element,
					schema: elementSchema
				});
				if (!validationResult.success) throw new NoObjectGeneratedError({
					message: "No object generated: response did not match schema.",
					cause: validationResult.error,
					text: text2,
					response: context2.response,
					usage: context2.usage,
					finishReason: context2.finishReason
				});
			}
			return outerValue.elements;
		},
		async parsePartialOutput({ text: text2 }) {
			const result = await parsePartialJson(text2);
			switch (result.state) {
				case "failed-parse":
				case "undefined-input": return;
				case "repaired-parse":
				case "successful-parse": {
					const outerValue = result.value;
					if (outerValue == null || typeof outerValue !== "object" || !("elements" in outerValue) || !Array.isArray(outerValue.elements)) return;
					const rawElements = result.state === "repaired-parse" && outerValue.elements.length > 0 ? outerValue.elements.slice(0, -1) : outerValue.elements;
					const parsedElements = [];
					for (const rawElement of rawElements) {
						const validationResult = await safeValidateTypes({
							value: rawElement,
							schema: elementSchema
						});
						if (validationResult.success) parsedElements.push(validationResult.value);
					}
					return { partial: parsedElements };
				}
			}
		},
		createElementStreamTransform() {
			let publishedElements = 0;
			return new TransformStream({ transform({ partialOutput }, controller) {
				if (partialOutput != null) for (; publishedElements < partialOutput.length; publishedElements++) controller.enqueue(partialOutput[publishedElements]);
			} });
		}
	};
};
var choice = ({ options: choiceOptions, name: name21, description }) => {
	return {
		name: "choice",
		responseFormat: Promise.resolve({
			type: "json",
			schema: {
				$schema: "http://json-schema.org/draft-07/schema#",
				type: "object",
				properties: { result: {
					type: "string",
					enum: choiceOptions
				} },
				required: ["result"],
				additionalProperties: false
			},
			...name21 != null && { name: name21 },
			...description != null && { description }
		}),
		async parseCompleteOutput({ text: text2 }, context2) {
			const parseResult = await safeParseJSON({ text: text2 });
			if (!parseResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: could not parse the response.",
				cause: parseResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			const outerValue = parseResult.value;
			if (outerValue == null || typeof outerValue !== "object" || !("result" in outerValue) || typeof outerValue.result !== "string" || !choiceOptions.includes(outerValue.result)) throw new NoObjectGeneratedError({
				message: "No object generated: response did not match schema.",
				cause: new TypeValidationError({
					value: outerValue,
					cause: "response must be an object that contains a choice value."
				}),
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			return outerValue.result;
		},
		async parsePartialOutput({ text: text2 }) {
			const result = await parsePartialJson(text2);
			switch (result.state) {
				case "failed-parse":
				case "undefined-input": return;
				case "repaired-parse":
				case "successful-parse": {
					const outerValue = result.value;
					if (outerValue == null || typeof outerValue !== "object" || !("result" in outerValue) || typeof outerValue.result !== "string") return;
					const potentialMatches = choiceOptions.filter((choiceOption) => choiceOption.startsWith(outerValue.result));
					if (result.state === "successful-parse") return potentialMatches.includes(outerValue.result) ? { partial: outerValue.result } : void 0;
					else return potentialMatches.length === 1 ? { partial: potentialMatches[0] } : void 0;
				}
			}
		},
		createElementStreamTransform() {}
	};
};
var json = ({ name: name21, description } = {}) => {
	return {
		name: "json",
		responseFormat: Promise.resolve({
			type: "json",
			...name21 != null && { name: name21 },
			...description != null && { description }
		}),
		async parseCompleteOutput({ text: text2 }, context2) {
			const parseResult = await safeParseJSON({ text: text2 });
			if (!parseResult.success) throw new NoObjectGeneratedError({
				message: "No object generated: could not parse the response.",
				cause: parseResult.error,
				text: text2,
				response: context2.response,
				usage: context2.usage,
				finishReason: context2.finishReason
			});
			return parseResult.value;
		},
		async parsePartialOutput({ text: text2 }) {
			const result = await parsePartialJson(text2);
			switch (result.state) {
				case "failed-parse":
				case "undefined-input": return;
				case "repaired-parse":
				case "successful-parse": return result.value === void 0 ? void 0 : { partial: result.value };
			}
		},
		createElementStreamTransform() {}
	};
};
createIdGenerator({
	prefix: "aitxt",
	size: 24
});
var toolMetadataSchema = record(string(), jsonValueSchema.optional());
var uiMessageChunkSchema = lazySchema(() => zodSchema(union([
	strictObject({
		type: literal("text-start"),
		id: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("text-delta"),
		id: string(),
		delta: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("text-end"),
		id: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("error"),
		errorText: string()
	}),
	strictObject({
		type: literal("tool-input-start"),
		toolCallId: string(),
		toolName: string(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional(),
		title: string().optional()
	}),
	strictObject({
		type: literal("tool-input-delta"),
		toolCallId: string(),
		inputTextDelta: string()
	}),
	strictObject({
		type: literal("tool-input-available"),
		toolCallId: string(),
		toolName: string(),
		input: unknown(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional(),
		title: string().optional()
	}),
	strictObject({
		type: literal("tool-input-error"),
		toolCallId: string(),
		toolName: string(),
		input: unknown(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional(),
		errorText: string(),
		title: string().optional()
	}),
	strictObject({
		type: literal("tool-approval-request"),
		approvalId: string(),
		toolCallId: string()
	}),
	strictObject({
		type: literal("tool-output-available"),
		toolCallId: string(),
		output: unknown(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional(),
		preliminary: boolean().optional()
	}),
	strictObject({
		type: literal("tool-output-error"),
		toolCallId: string(),
		errorText: string(),
		providerExecuted: boolean().optional(),
		providerMetadata: providerMetadataSchema.optional(),
		toolMetadata: toolMetadataSchema.optional(),
		dynamic: boolean().optional()
	}),
	strictObject({
		type: literal("tool-output-denied"),
		toolCallId: string()
	}),
	strictObject({
		type: literal("reasoning-start"),
		id: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("reasoning-delta"),
		id: string(),
		delta: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("reasoning-end"),
		id: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("source-url"),
		sourceId: string(),
		url: string(),
		title: string().optional(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("source-document"),
		sourceId: string(),
		mediaType: string(),
		title: string(),
		filename: string().optional(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: literal("file"),
		url: string(),
		mediaType: string(),
		providerMetadata: providerMetadataSchema.optional()
	}),
	strictObject({
		type: custom((value) => typeof value === "string" && value.startsWith("data-"), { message: "Type must start with \"data-\"" }),
		id: string().optional(),
		data: unknown(),
		transient: boolean().optional()
	}),
	strictObject({ type: literal("start-step") }),
	strictObject({ type: literal("finish-step") }),
	strictObject({
		type: literal("start"),
		messageId: string().optional(),
		messageMetadata: unknown().optional()
	}),
	strictObject({
		type: literal("finish"),
		finishReason: _enum([
			"stop",
			"length",
			"content-filter",
			"tool-calls",
			"error",
			"other"
		]).optional(),
		messageMetadata: unknown().optional()
	}),
	strictObject({
		type: literal("abort"),
		reason: string().optional()
	}),
	strictObject({
		type: literal("message-metadata"),
		messageMetadata: unknown()
	})
])));
function isDataUIMessageChunk(chunk) {
	return chunk.type.startsWith("data-");
}
function isStaticToolUIPart(part) {
	return part.type.startsWith("tool-");
}
function isDynamicToolUIPart(part) {
	return part.type === "dynamic-tool";
}
function isToolUIPart$1(part) {
	return isStaticToolUIPart(part) || isDynamicToolUIPart(part);
}
function getStaticToolName(part) {
	return part.type.split("-").slice(1).join("-");
}
function createStreamingUIMessageState({ lastMessage, messageId }) {
	return {
		message: (lastMessage == null ? void 0 : lastMessage.role) === "assistant" ? lastMessage : {
			id: messageId,
			metadata: void 0,
			role: "assistant",
			parts: []
		},
		activeTextParts: {},
		activeReasoningParts: {},
		partialToolCalls: {}
	};
}
function processUIMessageStream({ stream, messageMetadataSchema, dataPartSchemas, runUpdateMessageJob, onError, onToolCall, onData }) {
	return stream.pipeThrough(new TransformStream({ async transform(chunk, controller) {
		await runUpdateMessageJob(async ({ state, write }) => {
			var _a21, _b$1, _c, _d;
			function getToolInvocation(toolCallId) {
				const toolInvocation = state.message.parts.filter(isToolUIPart$1).find((invocation) => invocation.toolCallId === toolCallId);
				if (toolInvocation == null) throw new UIMessageStreamError({
					chunkType: "tool-invocation",
					chunkId: toolCallId,
					message: `No tool invocation found for tool call ID "${toolCallId}".`
				});
				return toolInvocation;
			}
			function updateToolPart(options) {
				var _a22;
				const part = state.message.parts.find((part2) => isStaticToolUIPart(part2) && part2.toolCallId === options.toolCallId);
				const anyOptions = options;
				const anyPart = part;
				if (part != null) {
					part.state = options.state;
					anyPart.input = anyOptions.input;
					anyPart.output = anyOptions.output;
					anyPart.errorText = anyOptions.errorText;
					anyPart.rawInput = anyOptions.rawInput;
					anyPart.preliminary = anyOptions.preliminary;
					if (options.title !== void 0) anyPart.title = options.title;
					if (options.toolMetadata !== void 0) anyPart.toolMetadata = options.toolMetadata;
					anyPart.providerExecuted = (_a22 = anyOptions.providerExecuted) != null ? _a22 : part.providerExecuted;
					const providerMetadata = anyOptions.providerMetadata;
					if (providerMetadata != null) if (options.state === "output-available" || options.state === "output-error") {
						const resultPart = part;
						resultPart.resultProviderMetadata = providerMetadata;
					} else part.callProviderMetadata = providerMetadata;
				} else state.message.parts.push({
					type: `tool-${options.toolName}`,
					toolCallId: options.toolCallId,
					state: options.state,
					title: options.title,
					...options.toolMetadata !== void 0 ? { toolMetadata: options.toolMetadata } : {},
					input: anyOptions.input,
					output: anyOptions.output,
					rawInput: anyOptions.rawInput,
					errorText: anyOptions.errorText,
					providerExecuted: anyOptions.providerExecuted,
					preliminary: anyOptions.preliminary,
					...anyOptions.providerMetadata != null && (options.state === "output-available" || options.state === "output-error") ? { resultProviderMetadata: anyOptions.providerMetadata } : {},
					...anyOptions.providerMetadata != null && !(options.state === "output-available" || options.state === "output-error") ? { callProviderMetadata: anyOptions.providerMetadata } : {}
				});
			}
			function updateDynamicToolPart(options) {
				var _a22, _b2;
				const part = state.message.parts.find((part2) => part2.type === "dynamic-tool" && part2.toolCallId === options.toolCallId);
				const anyOptions = options;
				const anyPart = part;
				if (part != null) {
					part.state = options.state;
					anyPart.toolName = options.toolName;
					anyPart.input = anyOptions.input;
					anyPart.output = anyOptions.output;
					anyPart.errorText = anyOptions.errorText;
					anyPart.rawInput = (_a22 = anyOptions.rawInput) != null ? _a22 : anyPart.rawInput;
					anyPart.preliminary = anyOptions.preliminary;
					if (options.title !== void 0) anyPart.title = options.title;
					if (options.toolMetadata !== void 0) anyPart.toolMetadata = options.toolMetadata;
					anyPart.providerExecuted = (_b2 = anyOptions.providerExecuted) != null ? _b2 : part.providerExecuted;
					const providerMetadata = anyOptions.providerMetadata;
					if (providerMetadata != null) if (options.state === "output-available" || options.state === "output-error") {
						const resultPart = part;
						resultPart.resultProviderMetadata = providerMetadata;
					} else part.callProviderMetadata = providerMetadata;
				} else state.message.parts.push({
					type: "dynamic-tool",
					toolName: options.toolName,
					toolCallId: options.toolCallId,
					state: options.state,
					input: anyOptions.input,
					output: anyOptions.output,
					errorText: anyOptions.errorText,
					preliminary: anyOptions.preliminary,
					providerExecuted: anyOptions.providerExecuted,
					title: options.title,
					...options.toolMetadata !== void 0 ? { toolMetadata: options.toolMetadata } : {},
					...anyOptions.providerMetadata != null && (options.state === "output-available" || options.state === "output-error") ? { resultProviderMetadata: anyOptions.providerMetadata } : {},
					...anyOptions.providerMetadata != null && !(options.state === "output-available" || options.state === "output-error") ? { callProviderMetadata: anyOptions.providerMetadata } : {}
				});
			}
			async function updateMessageMetadata(metadata) {
				if (metadata != null) {
					const mergedMetadata = state.message.metadata != null ? mergeObjects(state.message.metadata, metadata) : metadata;
					if (messageMetadataSchema != null) await validateTypes({
						value: mergedMetadata,
						schema: messageMetadataSchema,
						context: {
							field: "message.metadata",
							entityId: state.message.id
						}
					});
					state.message.metadata = mergedMetadata;
				}
			}
			switch (chunk.type) {
				case "text-start": {
					const textPart = {
						type: "text",
						text: "",
						providerMetadata: chunk.providerMetadata,
						state: "streaming"
					};
					state.activeTextParts[chunk.id] = textPart;
					state.message.parts.push(textPart);
					write();
					break;
				}
				case "text-delta": {
					const textPart = state.activeTextParts[chunk.id];
					if (textPart == null) throw new UIMessageStreamError({
						chunkType: "text-delta",
						chunkId: chunk.id,
						message: `Received text-delta for missing text part with ID "${chunk.id}". Ensure a "text-start" chunk is sent before any "text-delta" chunks.`
					});
					textPart.text += chunk.delta;
					textPart.providerMetadata = (_a21 = chunk.providerMetadata) != null ? _a21 : textPart.providerMetadata;
					write();
					break;
				}
				case "text-end": {
					const textPart = state.activeTextParts[chunk.id];
					if (textPart == null) throw new UIMessageStreamError({
						chunkType: "text-end",
						chunkId: chunk.id,
						message: `Received text-end for missing text part with ID "${chunk.id}". Ensure a "text-start" chunk is sent before any "text-end" chunks.`
					});
					textPart.state = "done";
					textPart.providerMetadata = (_b$1 = chunk.providerMetadata) != null ? _b$1 : textPart.providerMetadata;
					delete state.activeTextParts[chunk.id];
					write();
					break;
				}
				case "reasoning-start": {
					const reasoningPart = {
						type: "reasoning",
						text: "",
						providerMetadata: chunk.providerMetadata,
						state: "streaming"
					};
					state.activeReasoningParts[chunk.id] = reasoningPart;
					state.message.parts.push(reasoningPart);
					write();
					break;
				}
				case "reasoning-delta": {
					const reasoningPart = state.activeReasoningParts[chunk.id];
					if (reasoningPart == null) throw new UIMessageStreamError({
						chunkType: "reasoning-delta",
						chunkId: chunk.id,
						message: `Received reasoning-delta for missing reasoning part with ID "${chunk.id}". Ensure a "reasoning-start" chunk is sent before any "reasoning-delta" chunks.`
					});
					reasoningPart.text += chunk.delta;
					reasoningPart.providerMetadata = (_c = chunk.providerMetadata) != null ? _c : reasoningPart.providerMetadata;
					write();
					break;
				}
				case "reasoning-end": {
					const reasoningPart = state.activeReasoningParts[chunk.id];
					if (reasoningPart == null) throw new UIMessageStreamError({
						chunkType: "reasoning-end",
						chunkId: chunk.id,
						message: `Received reasoning-end for missing reasoning part with ID "${chunk.id}". Ensure a "reasoning-start" chunk is sent before any "reasoning-end" chunks.`
					});
					reasoningPart.providerMetadata = (_d = chunk.providerMetadata) != null ? _d : reasoningPart.providerMetadata;
					reasoningPart.state = "done";
					delete state.activeReasoningParts[chunk.id];
					write();
					break;
				}
				case "file":
					state.message.parts.push({
						type: "file",
						mediaType: chunk.mediaType,
						url: chunk.url,
						...chunk.providerMetadata != null ? { providerMetadata: chunk.providerMetadata } : {}
					});
					write();
					break;
				case "source-url":
					state.message.parts.push({
						type: "source-url",
						sourceId: chunk.sourceId,
						url: chunk.url,
						title: chunk.title,
						providerMetadata: chunk.providerMetadata
					});
					write();
					break;
				case "source-document":
					state.message.parts.push({
						type: "source-document",
						sourceId: chunk.sourceId,
						mediaType: chunk.mediaType,
						title: chunk.title,
						filename: chunk.filename,
						providerMetadata: chunk.providerMetadata
					});
					write();
					break;
				case "tool-input-start": {
					const toolInvocations = state.message.parts.filter(isStaticToolUIPart);
					state.partialToolCalls[chunk.toolCallId] = {
						text: "",
						toolName: chunk.toolName,
						index: toolInvocations.length,
						dynamic: chunk.dynamic,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata
					};
					if (chunk.dynamic) updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "input-streaming",
						input: void 0,
						providerExecuted: chunk.providerExecuted,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata,
						providerMetadata: chunk.providerMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "input-streaming",
						input: void 0,
						providerExecuted: chunk.providerExecuted,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata,
						providerMetadata: chunk.providerMetadata
					});
					write();
					break;
				}
				case "tool-input-delta": {
					const partialToolCall = state.partialToolCalls[chunk.toolCallId];
					if (partialToolCall == null) throw new UIMessageStreamError({
						chunkType: "tool-input-delta",
						chunkId: chunk.toolCallId,
						message: `Received tool-input-delta for missing tool call with ID "${chunk.toolCallId}". Ensure a "tool-input-start" chunk is sent before any "tool-input-delta" chunks.`
					});
					partialToolCall.text += chunk.inputTextDelta;
					const { value: partialArgs } = await parsePartialJson(partialToolCall.text);
					if (partialToolCall.dynamic) updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: partialToolCall.toolName,
						state: "input-streaming",
						input: partialArgs,
						title: partialToolCall.title,
						toolMetadata: partialToolCall.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: partialToolCall.toolName,
						state: "input-streaming",
						input: partialArgs,
						title: partialToolCall.title,
						toolMetadata: partialToolCall.toolMetadata
					});
					write();
					break;
				}
				case "tool-input-available":
					if (chunk.dynamic) updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "input-available",
						input: chunk.input,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "input-available",
						input: chunk.input,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: chunk.title,
						toolMetadata: chunk.toolMetadata
					});
					write();
					if (onToolCall && !chunk.providerExecuted) await onToolCall({ toolCall: chunk });
					break;
				case "tool-input-error": {
					const existingPart = state.message.parts.filter(isToolUIPart$1).find((p) => p.toolCallId === chunk.toolCallId);
					if (existingPart != null ? existingPart.type === "dynamic-tool" : !!chunk.dynamic) updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "output-error",
						input: chunk.input,
						errorText: chunk.errorText,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						toolMetadata: chunk.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: chunk.toolName,
						state: "output-error",
						input: void 0,
						rawInput: chunk.input,
						errorText: chunk.errorText,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						toolMetadata: chunk.toolMetadata
					});
					write();
					break;
				}
				case "tool-approval-request": {
					const toolInvocation = getToolInvocation(chunk.toolCallId);
					toolInvocation.state = "approval-requested";
					toolInvocation.approval = { id: chunk.approvalId };
					write();
					break;
				}
				case "tool-output-denied": {
					const toolInvocation = getToolInvocation(chunk.toolCallId);
					toolInvocation.state = "output-denied";
					write();
					break;
				}
				case "tool-output-available": {
					const toolInvocation = getToolInvocation(chunk.toolCallId);
					if (toolInvocation.type === "dynamic-tool") updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: toolInvocation.toolName,
						state: "output-available",
						input: toolInvocation.input,
						output: chunk.output,
						preliminary: chunk.preliminary,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: toolInvocation.title,
						toolMetadata: toolInvocation.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: getStaticToolName(toolInvocation),
						state: "output-available",
						input: toolInvocation.input,
						output: chunk.output,
						providerExecuted: chunk.providerExecuted,
						preliminary: chunk.preliminary,
						providerMetadata: chunk.providerMetadata,
						title: toolInvocation.title,
						toolMetadata: toolInvocation.toolMetadata
					});
					write();
					break;
				}
				case "tool-output-error": {
					const toolInvocation = getToolInvocation(chunk.toolCallId);
					if (toolInvocation.type === "dynamic-tool") updateDynamicToolPart({
						toolCallId: chunk.toolCallId,
						toolName: toolInvocation.toolName,
						state: "output-error",
						input: toolInvocation.input,
						errorText: chunk.errorText,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: toolInvocation.title,
						toolMetadata: toolInvocation.toolMetadata
					});
					else updateToolPart({
						toolCallId: chunk.toolCallId,
						toolName: getStaticToolName(toolInvocation),
						state: "output-error",
						input: toolInvocation.input,
						rawInput: toolInvocation.rawInput,
						errorText: chunk.errorText,
						providerExecuted: chunk.providerExecuted,
						providerMetadata: chunk.providerMetadata,
						title: toolInvocation.title,
						toolMetadata: toolInvocation.toolMetadata
					});
					write();
					break;
				}
				case "start-step":
					state.message.parts.push({ type: "step-start" });
					break;
				case "finish-step":
					state.activeTextParts = {};
					state.activeReasoningParts = {};
					break;
				case "start":
					if (chunk.messageId != null) state.message.id = chunk.messageId;
					await updateMessageMetadata(chunk.messageMetadata);
					if (chunk.messageId != null || chunk.messageMetadata != null) write();
					break;
				case "finish":
					if (chunk.finishReason != null) state.finishReason = chunk.finishReason;
					await updateMessageMetadata(chunk.messageMetadata);
					if (chunk.messageMetadata != null) write();
					break;
				case "message-metadata":
					await updateMessageMetadata(chunk.messageMetadata);
					if (chunk.messageMetadata != null) write();
					break;
				case "error":
					onError?.(new Error(chunk.errorText));
					break;
				default: if (isDataUIMessageChunk(chunk)) {
					if ((dataPartSchemas == null ? void 0 : dataPartSchemas[chunk.type]) != null) {
						const partIdx = state.message.parts.findIndex((p) => "id" in p && "data" in p && p.id === chunk.id && p.type === chunk.type);
						const actualPartIdx = partIdx >= 0 ? partIdx : state.message.parts.length;
						await validateTypes({
							value: chunk.data,
							schema: dataPartSchemas[chunk.type],
							context: {
								field: `message.parts[${actualPartIdx}].data`,
								entityName: chunk.type,
								entityId: chunk.id
							}
						});
					}
					const dataChunk = chunk;
					if (dataChunk.transient) {
						onData?.(dataChunk);
						break;
					}
					const existingUIPart = dataChunk.id != null ? state.message.parts.find((chunkArg) => dataChunk.type === chunkArg.type && dataChunk.id === chunkArg.id) : void 0;
					if (existingUIPart != null) existingUIPart.data = dataChunk.data;
					else state.message.parts.push(dataChunk);
					onData?.(dataChunk);
					write();
				}
			}
			controller.enqueue(chunk);
		});
	} }));
}
async function consumeStream({ stream, onError }) {
	const reader = stream.getReader();
	try {
		while (true) {
			const { done } = await reader.read();
			if (done) break;
		}
	} catch (error) {
		onError?.(error);
	} finally {
		reader.releaseLock();
	}
}
createIdGenerator({
	prefix: "aitxt",
	size: 24
});
var toolMetadataSchema2 = record(string(), jsonValueSchema.optional());
lazySchema(() => zodSchema(array$1(object$1({
	id: string(),
	role: _enum([
		"system",
		"user",
		"assistant"
	]),
	metadata: unknown().optional(),
	parts: array$1(union([
		object$1({
			type: literal("text"),
			text: string(),
			state: _enum(["streaming", "done"]).optional(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({
			type: literal("reasoning"),
			text: string(),
			state: _enum(["streaming", "done"]).optional(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({
			type: literal("source-url"),
			sourceId: string(),
			url: string(),
			title: string().optional(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({
			type: literal("source-document"),
			sourceId: string(),
			mediaType: string(),
			title: string(),
			filename: string().optional(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({
			type: literal("file"),
			mediaType: string(),
			filename: string().optional(),
			url: string(),
			providerMetadata: providerMetadataSchema.optional()
		}),
		object$1({ type: literal("step-start") }),
		object$1({
			type: string().startsWith("data-"),
			id: string().optional(),
			data: unknown()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("input-streaming"),
			input: unknown().optional(),
			providerExecuted: boolean().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			output: never().optional(),
			errorText: never().optional(),
			approval: never().optional()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("input-available"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: never().optional()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("approval-requested"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: never().optional(),
				reason: never().optional()
			})
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("approval-responded"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: boolean(),
				reason: string().optional()
			})
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-available"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: unknown(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			resultProviderMetadata: providerMetadataSchema.optional(),
			preliminary: boolean().optional(),
			approval: object$1({
				id: string(),
				approved: literal(true),
				reason: string().optional()
			}).optional()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-error"),
			input: unknown().optional(),
			rawInput: unknown().optional(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: string(),
			callProviderMetadata: providerMetadataSchema.optional(),
			resultProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: literal(true),
				reason: string().optional()
			}).optional()
		}),
		object$1({
			type: literal("dynamic-tool"),
			toolName: string(),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-denied"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: literal(false),
				reason: string().optional()
			})
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("input-streaming"),
			providerExecuted: boolean().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			input: unknown().optional(),
			output: never().optional(),
			errorText: never().optional(),
			approval: never().optional()
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("input-available"),
			providerExecuted: boolean().optional(),
			input: unknown(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: never().optional()
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("approval-requested"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: never().optional(),
				reason: never().optional()
			})
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("approval-responded"),
			input: unknown(),
			providerExecuted: boolean().optional(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: boolean(),
				reason: string().optional()
			})
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-available"),
			providerExecuted: boolean().optional(),
			input: unknown(),
			output: unknown(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			resultProviderMetadata: providerMetadataSchema.optional(),
			preliminary: boolean().optional(),
			approval: object$1({
				id: string(),
				approved: literal(true),
				reason: string().optional()
			}).optional()
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-error"),
			providerExecuted: boolean().optional(),
			input: unknown().optional(),
			rawInput: unknown().optional(),
			output: never().optional(),
			errorText: string(),
			callProviderMetadata: providerMetadataSchema.optional(),
			resultProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: literal(true),
				reason: string().optional()
			}).optional()
		}),
		object$1({
			type: string().startsWith("tool-"),
			toolCallId: string(),
			toolMetadata: toolMetadataSchema2.optional(),
			state: literal("output-denied"),
			providerExecuted: boolean().optional(),
			input: unknown(),
			output: never().optional(),
			errorText: never().optional(),
			callProviderMetadata: providerMetadataSchema.optional(),
			approval: object$1({
				id: string(),
				approved: literal(false),
				reason: string().optional()
			})
		})
	])).nonempty("Message must contain at least one part")
})).nonempty("Messages array must not be empty")));
createIdGenerator({
	prefix: "aiobj",
	size: 24
});
function createDownload(options) {
	return ({ url, abortSignal }) => download({
		url,
		maxBytes: options == null ? void 0 : options.maxBytes,
		abortSignal
	});
}
var SerialJobExecutor = class {
	constructor() {
		this.queue = [];
		this.isProcessing = false;
	}
	async processQueue() {
		if (this.isProcessing) return;
		this.isProcessing = true;
		while (this.queue.length > 0) {
			await this.queue[0]();
			this.queue.shift();
		}
		this.isProcessing = false;
	}
	async run(job) {
		return new Promise((resolve3, reject) => {
			this.queue.push(async () => {
				try {
					await job();
					resolve3();
				} catch (error) {
					reject(error);
				}
			});
			this.processQueue();
		});
	}
};
createIdGenerator({
	prefix: "aiobj",
	size: 24
});
createDownload();
createDownload();
async function convertFileListToFileUIParts(files) {
	if (files == null) return [];
	if (!globalThis.FileList || !(files instanceof globalThis.FileList)) throw new Error("FileList is not supported in the current environment");
	return Promise.all(Array.from(files).map(async (file) => {
		const { name: name21, type } = file;
		return {
			type: "file",
			mediaType: type,
			filename: name21,
			url: await new Promise((resolve3, reject) => {
				const reader = new FileReader();
				reader.onload = (readerEvent) => {
					var _a21;
					resolve3((_a21 = readerEvent.target) == null ? void 0 : _a21.result);
				};
				reader.onerror = (error) => reject(error);
				reader.readAsDataURL(file);
			})
		};
	}));
}
var HttpChatTransport = class {
	constructor({ api = "/api/chat", credentials, headers, body, fetch: fetch2, prepareSendMessagesRequest, prepareReconnectToStreamRequest }) {
		this.api = api;
		this.credentials = credentials;
		this.headers = headers;
		this.body = body;
		this.fetch = fetch2;
		this.prepareSendMessagesRequest = prepareSendMessagesRequest;
		this.prepareReconnectToStreamRequest = prepareReconnectToStreamRequest;
	}
	async sendMessages({ abortSignal, ...options }) {
		var _a21, _b$1, _c, _d, _e;
		const resolvedBody = await resolve(this.body);
		const resolvedHeaders = await resolve(this.headers);
		const resolvedCredentials = await resolve(this.credentials);
		const baseHeaders = {
			...normalizeHeaders(resolvedHeaders),
			...normalizeHeaders(options.headers)
		};
		const preparedRequest = await ((_a21 = this.prepareSendMessagesRequest) == null ? void 0 : _a21.call(this, {
			api: this.api,
			id: options.chatId,
			messages: options.messages,
			body: {
				...resolvedBody,
				...options.body
			},
			headers: baseHeaders,
			credentials: resolvedCredentials,
			requestMetadata: options.metadata,
			trigger: options.trigger,
			messageId: options.messageId
		}));
		const api = (_b$1 = preparedRequest == null ? void 0 : preparedRequest.api) != null ? _b$1 : this.api;
		const headers = (preparedRequest == null ? void 0 : preparedRequest.headers) !== void 0 ? normalizeHeaders(preparedRequest.headers) : baseHeaders;
		const body = (preparedRequest == null ? void 0 : preparedRequest.body) !== void 0 ? preparedRequest.body : {
			...resolvedBody,
			...options.body,
			id: options.chatId,
			messages: options.messages,
			trigger: options.trigger,
			messageId: options.messageId
		};
		const credentials = (_c = preparedRequest == null ? void 0 : preparedRequest.credentials) != null ? _c : resolvedCredentials;
		const response = await ((_d = this.fetch) != null ? _d : globalThis.fetch)(api, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...headers
			},
			body: JSON.stringify(body),
			credentials,
			signal: abortSignal
		});
		if (!response.ok) throw new Error((_e = await response.text()) != null ? _e : "Failed to fetch the chat response.");
		if (!response.body) throw new Error("The response body is empty.");
		return this.processResponseStream(response.body);
	}
	async reconnectToStream(options) {
		var _a21, _b$1, _c, _d, _e;
		const resolvedBody = await resolve(this.body);
		const resolvedHeaders = await resolve(this.headers);
		const resolvedCredentials = await resolve(this.credentials);
		const baseHeaders = {
			...normalizeHeaders(resolvedHeaders),
			...normalizeHeaders(options.headers)
		};
		const preparedRequest = await ((_a21 = this.prepareReconnectToStreamRequest) == null ? void 0 : _a21.call(this, {
			api: this.api,
			id: options.chatId,
			body: {
				...resolvedBody,
				...options.body
			},
			headers: baseHeaders,
			credentials: resolvedCredentials,
			requestMetadata: options.metadata
		}));
		const api = (_b$1 = preparedRequest == null ? void 0 : preparedRequest.api) != null ? _b$1 : `${this.api}/${options.chatId}/stream`;
		const headers = (preparedRequest == null ? void 0 : preparedRequest.headers) !== void 0 ? normalizeHeaders(preparedRequest.headers) : baseHeaders;
		const credentials = (_c = preparedRequest == null ? void 0 : preparedRequest.credentials) != null ? _c : resolvedCredentials;
		const response = await ((_d = this.fetch) != null ? _d : globalThis.fetch)(api, {
			method: "GET",
			headers,
			credentials
		});
		if (response.status === 204) return null;
		if (!response.ok) throw new Error((_e = await response.text()) != null ? _e : "Failed to fetch the chat response.");
		if (!response.body) throw new Error("The response body is empty.");
		return this.processResponseStream(response.body);
	}
};
var DefaultChatTransport = class extends HttpChatTransport {
	constructor(options = {}) {
		super(options);
	}
	processResponseStream(stream) {
		return parseJsonEventStream({
			stream,
			schema: uiMessageChunkSchema
		}).pipeThrough(new TransformStream({ async transform(chunk, controller) {
			if (!chunk.success) throw chunk.error;
			controller.enqueue(chunk.value);
		} }));
	}
};
var AbstractChat = class {
	constructor({ generateId: generateId2 = generateId, id = generateId2(), transport = new DefaultChatTransport(), messageMetadataSchema, dataPartSchemas, state, onError, onToolCall, onFinish, onData, sendAutomaticallyWhen }) {
		this.activeResponse = void 0;
		this.jobExecutor = new SerialJobExecutor();
		this.sendMessage = async (message, options) => {
			var _a21, _b$1, _c, _d;
			if (message == null) {
				await this.makeRequest({
					trigger: "submit-message",
					messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
					...options
				});
				return;
			}
			let uiMessage;
			if ("text" in message || "files" in message) uiMessage = { parts: [...Array.isArray(message.files) ? message.files : await convertFileListToFileUIParts(message.files), ..."text" in message && message.text != null ? [{
				type: "text",
				text: message.text
			}] : []] };
			else uiMessage = message;
			if (message.messageId != null) {
				const messageIndex = this.state.messages.findIndex((m) => m.id === message.messageId);
				if (messageIndex === -1) throw new Error(`message with id ${message.messageId} not found`);
				if (this.state.messages[messageIndex].role !== "user") throw new Error(`message with id ${message.messageId} is not a user message`);
				this.state.messages = this.state.messages.slice(0, messageIndex + 1);
				this.state.replaceMessage(messageIndex, {
					...uiMessage,
					id: message.messageId,
					role: (_b$1 = uiMessage.role) != null ? _b$1 : "user",
					metadata: message.metadata
				});
			} else this.state.pushMessage({
				...uiMessage,
				id: (_c = uiMessage.id) != null ? _c : this.generateId(),
				role: (_d = uiMessage.role) != null ? _d : "user",
				metadata: message.metadata
			});
			await this.makeRequest({
				trigger: "submit-message",
				messageId: message.messageId,
				...options
			});
		};
		this.regenerate = async ({ messageId, ...options } = {}) => {
			const messageIndex = messageId == null ? this.state.messages.length - 1 : this.state.messages.findIndex((message) => message.id === messageId);
			if (messageIndex === -1) throw new Error(`message ${messageId} not found`);
			this.state.messages = this.state.messages.slice(0, this.messages[messageIndex].role === "assistant" ? messageIndex : messageIndex + 1);
			await this.makeRequest({
				trigger: "regenerate-message",
				messageId,
				...options
			});
		};
		this.resumeStream = async (options = {}) => {
			await this.makeRequest({
				trigger: "resume-stream",
				...options
			});
		};
		this.clearError = () => {
			if (this.status === "error") {
				this.state.error = void 0;
				this.setStatus({ status: "ready" });
			}
		};
		this.addToolApprovalResponse = async ({ id: id$1, approved, reason, options }) => this.jobExecutor.run(async () => {
			const messages = this.state.messages;
			const lastMessage = messages[messages.length - 1];
			const updatePart = (part) => isToolUIPart$1(part) && part.state === "approval-requested" && part.approval.id === id$1 ? {
				...part,
				state: "approval-responded",
				approval: {
					id: id$1,
					approved,
					reason
				}
			} : part;
			this.state.replaceMessage(messages.length - 1, {
				...lastMessage,
				parts: lastMessage.parts.map(updatePart)
			});
			if (this.activeResponse) this.activeResponse.state.message.parts = this.activeResponse.state.message.parts.map(updatePart);
			if (this.status !== "streaming" && this.status !== "submitted" && this.sendAutomaticallyWhen) this.shouldSendAutomatically().then((shouldSend) => {
				var _a21;
				if (shouldSend) this.makeRequest({
					trigger: "submit-message",
					messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
					...options
				});
			});
		});
		this.addToolOutput = async ({ state: state$1 = "output-available", toolCallId, output, errorText, options }) => this.jobExecutor.run(async () => {
			const messages = this.state.messages;
			const lastMessage = messages[messages.length - 1];
			const updatePart = (part) => isToolUIPart$1(part) && part.toolCallId === toolCallId ? {
				...part,
				state: state$1,
				output,
				errorText
			} : part;
			this.state.replaceMessage(messages.length - 1, {
				...lastMessage,
				parts: lastMessage.parts.map(updatePart)
			});
			if (this.activeResponse) this.activeResponse.state.message.parts = this.activeResponse.state.message.parts.map(updatePart);
			if (this.status !== "streaming" && this.status !== "submitted" && this.sendAutomaticallyWhen) this.shouldSendAutomatically().then((shouldSend) => {
				var _a21;
				if (shouldSend) this.makeRequest({
					trigger: "submit-message",
					messageId: (_a21 = this.lastMessage) == null ? void 0 : _a21.id,
					...options
				});
			});
		});
		this.addToolResult = this.addToolOutput;
		this.stop = async () => {
			var _a21;
			if (this.status !== "streaming" && this.status !== "submitted") return;
			if ((_a21 = this.activeResponse) == null ? void 0 : _a21.abortController) this.activeResponse.abortController.abort();
		};
		this.id = id;
		this.transport = transport;
		this.generateId = generateId2;
		this.messageMetadataSchema = messageMetadataSchema;
		this.dataPartSchemas = dataPartSchemas;
		this.state = state;
		this.onError = onError;
		this.onToolCall = onToolCall;
		this.onFinish = onFinish;
		this.onData = onData;
		this.sendAutomaticallyWhen = sendAutomaticallyWhen;
	}
	get status() {
		return this.state.status;
	}
	setStatus({ status, error }) {
		if (this.status === status) return;
		this.state.status = status;
		this.state.error = error;
	}
	get error() {
		return this.state.error;
	}
	get messages() {
		return this.state.messages;
	}
	get lastMessage() {
		return this.state.messages[this.state.messages.length - 1];
	}
	set messages(messages) {
		this.state.messages = messages;
	}
	async shouldSendAutomatically() {
		if (!this.sendAutomaticallyWhen) return false;
		const result = this.sendAutomaticallyWhen({ messages: this.state.messages });
		if (result && typeof result === "object" && "then" in result) return await result;
		return result;
	}
	async makeRequest({ trigger, metadata, headers, body, messageId }) {
		var _a21, _b$1, _c;
		let resumeStream;
		if (trigger === "resume-stream") try {
			const reconnect = await this.transport.reconnectToStream({
				chatId: this.id,
				metadata,
				headers,
				body
			});
			if (reconnect == null) return;
			resumeStream = reconnect;
		} catch (err) {
			if (this.onError && err instanceof Error) this.onError(err);
			this.setStatus({
				status: "error",
				error: err
			});
			return;
		}
		this.setStatus({
			status: "submitted",
			error: void 0
		});
		const lastMessage = this.lastMessage;
		let isAbort = false;
		let isDisconnect = false;
		let isError = false;
		try {
			const activeResponse = {
				state: createStreamingUIMessageState({
					lastMessage: this.state.snapshot(lastMessage),
					messageId: this.generateId()
				}),
				abortController: new AbortController()
			};
			activeResponse.abortController.signal.addEventListener("abort", () => {
				isAbort = true;
			});
			this.activeResponse = activeResponse;
			let stream;
			if (trigger === "resume-stream") stream = resumeStream;
			else stream = await this.transport.sendMessages({
				chatId: this.id,
				messages: this.state.messages,
				abortSignal: activeResponse.abortController.signal,
				metadata,
				headers,
				body,
				trigger,
				messageId
			});
			const runUpdateMessageJob = (job) => this.jobExecutor.run(() => job({
				state: activeResponse.state,
				write: () => {
					var _a22;
					this.setStatus({ status: "streaming" });
					if (activeResponse.state.message.id === ((_a22 = this.lastMessage) == null ? void 0 : _a22.id)) this.state.replaceMessage(this.state.messages.length - 1, activeResponse.state.message);
					else this.state.pushMessage(activeResponse.state.message);
				}
			}));
			await consumeStream({
				stream: processUIMessageStream({
					stream,
					onToolCall: this.onToolCall,
					onData: this.onData,
					messageMetadataSchema: this.messageMetadataSchema,
					dataPartSchemas: this.dataPartSchemas,
					runUpdateMessageJob,
					onError: (error) => {
						throw error;
					}
				}),
				onError: (error) => {
					throw error;
				}
			});
			this.setStatus({ status: "ready" });
		} catch (err) {
			if (isAbort || err.name === "AbortError") {
				isAbort = true;
				this.setStatus({ status: "ready" });
				return null;
			}
			isError = true;
			if (err instanceof TypeError && (err.message.toLowerCase().includes("fetch") || err.message.toLowerCase().includes("network"))) isDisconnect = true;
			if (this.onError && err instanceof Error) this.onError(err);
			this.setStatus({
				status: "error",
				error: err
			});
		} finally {
			try {
				(_b$1 = this.onFinish) == null || _b$1.call(this, {
					message: this.activeResponse.state.message,
					messages: this.state.messages,
					isAbort,
					isDisconnect,
					isError,
					finishReason: (_a21 = this.activeResponse) == null ? void 0 : _a21.state.finishReason
				});
			} catch (err) {
				console.error(err);
			}
			this.activeResponse = void 0;
		}
		if (!isError && await this.shouldSendAutomatically()) await this.makeRequest({
			trigger: "submit-message",
			messageId: (_c = this.lastMessage) == null ? void 0 : _c.id,
			metadata,
			headers,
			body
		});
	}
};
var require_throttleit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function throttle$1(function_, wait) {
		if (typeof function_ !== "function") throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
		let timeoutId;
		let lastCallTime = 0;
		return function throttled(...arguments_) {
			clearTimeout(timeoutId);
			const now = Date.now();
			const delayForNextCall = wait - (now - lastCallTime);
			if (delayForNextCall <= 0) {
				lastCallTime = now;
				function_.apply(this, arguments_);
			} else timeoutId = setTimeout(() => {
				lastCallTime = Date.now();
				function_.apply(this, arguments_);
			}, delayForNextCall);
		};
	}
	module.exports = throttle$1;
}));
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_throttleit = /* @__PURE__ */ __toESM(require_throttleit(), 1);
var __accessCheck = (obj, member, msg) => {
	if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
	__accessCheck(obj, member, "read from private field");
	return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
	if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
	member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
	__accessCheck(obj, member, "write to private field");
	setter ? setter.call(obj, value) : member.set(obj, value);
	return value;
};
function throttle(fn, waitMs) {
	return waitMs != null ? (0, import_throttleit.default)(fn, waitMs) : fn;
}
var _messages, _status, _error, _messagesCallbacks, _statusCallbacks, _errorCallbacks, _callMessagesCallbacks, _callStatusCallbacks, _callErrorCallbacks;
var ReactChatState = class {
	constructor(initialMessages = []) {
		__privateAdd(this, _messages, void 0);
		__privateAdd(this, _status, "ready");
		__privateAdd(this, _error, void 0);
		__privateAdd(this, _messagesCallbacks, /* @__PURE__ */ new Set());
		__privateAdd(this, _statusCallbacks, /* @__PURE__ */ new Set());
		__privateAdd(this, _errorCallbacks, /* @__PURE__ */ new Set());
		this.pushMessage = (message) => {
			__privateSet(this, _messages, __privateGet(this, _messages).concat(message));
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.popMessage = () => {
			__privateSet(this, _messages, __privateGet(this, _messages).slice(0, -1));
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.replaceMessage = (index, message) => {
			__privateSet(this, _messages, [
				...__privateGet(this, _messages).slice(0, index),
				this.snapshot(message),
				...__privateGet(this, _messages).slice(index + 1)
			]);
			__privateGet(this, _callMessagesCallbacks).call(this);
		};
		this.snapshot = (value) => structuredClone(value);
		this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => {
			const callback = throttleWaitMs ? throttle(onChange, throttleWaitMs) : onChange;
			__privateGet(this, _messagesCallbacks).add(callback);
			return () => {
				__privateGet(this, _messagesCallbacks).delete(callback);
			};
		};
		this["~registerStatusCallback"] = (onChange) => {
			__privateGet(this, _statusCallbacks).add(onChange);
			return () => {
				__privateGet(this, _statusCallbacks).delete(onChange);
			};
		};
		this["~registerErrorCallback"] = (onChange) => {
			__privateGet(this, _errorCallbacks).add(onChange);
			return () => {
				__privateGet(this, _errorCallbacks).delete(onChange);
			};
		};
		__privateAdd(this, _callMessagesCallbacks, () => {
			__privateGet(this, _messagesCallbacks).forEach((callback) => callback());
		});
		__privateAdd(this, _callStatusCallbacks, () => {
			__privateGet(this, _statusCallbacks).forEach((callback) => callback());
		});
		__privateAdd(this, _callErrorCallbacks, () => {
			__privateGet(this, _errorCallbacks).forEach((callback) => callback());
		});
		__privateSet(this, _messages, initialMessages);
	}
	get status() {
		return __privateGet(this, _status);
	}
	set status(newStatus) {
		__privateSet(this, _status, newStatus);
		__privateGet(this, _callStatusCallbacks).call(this);
	}
	get error() {
		return __privateGet(this, _error);
	}
	set error(newError) {
		__privateSet(this, _error, newError);
		__privateGet(this, _callErrorCallbacks).call(this);
	}
	get messages() {
		return __privateGet(this, _messages);
	}
	set messages(newMessages) {
		__privateSet(this, _messages, [...newMessages]);
		__privateGet(this, _callMessagesCallbacks).call(this);
	}
};
_messages = /* @__PURE__ */ new WeakMap();
_status = /* @__PURE__ */ new WeakMap();
_error = /* @__PURE__ */ new WeakMap();
_messagesCallbacks = /* @__PURE__ */ new WeakMap();
_statusCallbacks = /* @__PURE__ */ new WeakMap();
_errorCallbacks = /* @__PURE__ */ new WeakMap();
_callMessagesCallbacks = /* @__PURE__ */ new WeakMap();
_callStatusCallbacks = /* @__PURE__ */ new WeakMap();
_callErrorCallbacks = /* @__PURE__ */ new WeakMap();
var _state;
var Chat = class extends AbstractChat {
	constructor({ messages, ...init }) {
		const state = new ReactChatState(messages);
		super({
			...init,
			state
		});
		__privateAdd(this, _state, void 0);
		this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => __privateGet(this, _state)["~registerMessagesCallback"](onChange, throttleWaitMs);
		this["~registerStatusCallback"] = (onChange) => __privateGet(this, _state)["~registerStatusCallback"](onChange);
		this["~registerErrorCallback"] = (onChange) => __privateGet(this, _state)["~registerErrorCallback"](onChange);
		__privateSet(this, _state, state);
	}
};
_state = /* @__PURE__ */ new WeakMap();
function useChat({ experimental_throttle: throttleWaitMs, resume = false, ...options } = {}) {
	const callbacksRef = (0, import_react.useRef)(!("chat" in options) ? {
		onToolCall: options.onToolCall,
		onData: options.onData,
		onFinish: options.onFinish,
		onError: options.onError,
		sendAutomaticallyWhen: options.sendAutomaticallyWhen
	} : {});
	if (!("chat" in options)) callbacksRef.current = {
		onToolCall: options.onToolCall,
		onData: options.onData,
		onFinish: options.onFinish,
		onError: options.onError,
		sendAutomaticallyWhen: options.sendAutomaticallyWhen
	};
	const optionsWithCallbacks = {
		...options,
		onToolCall: (arg) => {
			var _a$2, _b$1;
			return (_b$1 = (_a$2 = callbacksRef.current).onToolCall) == null ? void 0 : _b$1.call(_a$2, arg);
		},
		onData: (arg) => {
			var _a$2, _b$1;
			return (_b$1 = (_a$2 = callbacksRef.current).onData) == null ? void 0 : _b$1.call(_a$2, arg);
		},
		onFinish: (arg) => {
			var _a$2, _b$1;
			return (_b$1 = (_a$2 = callbacksRef.current).onFinish) == null ? void 0 : _b$1.call(_a$2, arg);
		},
		onError: (arg) => {
			var _a$2, _b$1;
			return (_b$1 = (_a$2 = callbacksRef.current).onError) == null ? void 0 : _b$1.call(_a$2, arg);
		},
		sendAutomaticallyWhen: (arg) => {
			var _a$2, _b$1, _c;
			return (_c = (_b$1 = (_a$2 = callbacksRef.current).sendAutomaticallyWhen) == null ? void 0 : _b$1.call(_a$2, arg)) != null ? _c : false;
		}
	};
	const chatRef = (0, import_react.useRef)("chat" in options ? options.chat : new Chat(optionsWithCallbacks));
	if ("chat" in options && options.chat !== chatRef.current || "id" in options && chatRef.current.id !== options.id) chatRef.current = "chat" in options ? options.chat : new Chat(optionsWithCallbacks);
	const messages = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((update) => chatRef.current["~registerMessagesCallback"](update, throttleWaitMs), [throttleWaitMs, chatRef.current.id]), () => chatRef.current.messages, () => chatRef.current.messages);
	const status = (0, import_react.useSyncExternalStore)(chatRef.current["~registerStatusCallback"], () => chatRef.current.status, () => chatRef.current.status);
	const error = (0, import_react.useSyncExternalStore)(chatRef.current["~registerErrorCallback"], () => chatRef.current.error, () => chatRef.current.error);
	const setMessages = (0, import_react.useCallback)((messagesParam) => {
		if (typeof messagesParam === "function") messagesParam = messagesParam(chatRef.current.messages);
		chatRef.current.messages = messagesParam;
	}, [chatRef]);
	(0, import_react.useEffect)(() => {
		if (resume) chatRef.current.resumeStream();
	}, [resume, chatRef]);
	return {
		id: chatRef.current.id,
		messages,
		setMessages,
		sendMessage: chatRef.current.sendMessage,
		regenerate: chatRef.current.regenerate,
		clearError: chatRef.current.clearError,
		stop: chatRef.current.stop,
		error,
		resumeStream: chatRef.current.resumeStream,
		status,
		addToolResult: chatRef.current.addToolOutput,
		addToolOutput: chatRef.current.addToolOutput,
		addToolApprovalResponse: chatRef.current.addToolApprovalResponse
	};
}
var logger$3 = loggerService.withContext("TopicStreamSubscription");
function branchKey(executionId, anchorMessageId) {
	return JSON.stringify([executionId, anchorMessageId ?? null]);
}
function createBranch(executionId, anchorMessageId) {
	const branch = {
		executionId,
		anchorMessageId,
		stream: void 0,
		controller: null,
		closed: false
	};
	branch.stream = new ReadableStream({
		start(controller) {
			branch.controller = controller;
		},
		cancel() {
			branch.closed = true;
		}
	});
	return branch;
}
var TopicStreamSubscription = class {
	#topicId;
	#branches = /* @__PURE__ */ new Map();
	#terminalByBranchKey = /* @__PURE__ */ new Map();
	#terminalListeners = /* @__PURE__ */ new Set();
	#topicStateListeners = /* @__PURE__ */ new Set();
	#ipcUnsubs = [];
	#attached = false;
	#attachInFlight = null;
	#disposed = false;
	#topicOpen = false;
	constructor(topicId) {
		this.#topicId = topicId;
	}
	listen() {
		if (this.#disposed) return;
		this.#setupIpcListeners();
	}
	register(executionId, anchorMessageId) {
		const branch = this.#getOrCreateBranch(executionId, anchorMessageId);
		this.#ensureAttached();
		return branch.stream;
	}
	hasOpenBranch(executionId, anchorMessageId) {
		const branch = this.#branches.get(branchKey(executionId, anchorMessageId));
		return branch !== void 0 && !branch.closed;
	}
	hasAnyOpenBranch() {
		for (const branch of this.#branches.values()) if (!branch.closed) return true;
		return false;
	}
	isTopicOpen() {
		return this.#topicOpen;
	}
	unregister(executionId, anchorMessageId) {
		const key = branchKey(executionId, anchorMessageId);
		const branch = this.#branches.get(key);
		if (!branch) return;
		this.#closeBranch(branch);
		this.#branches.delete(key);
		this.#terminalByBranchKey.delete(key);
		if (anchorMessageId) this.#terminalByBranchKey.delete(branchKey(executionId));
		if (this.#branches.size === 0 && this.#attached && !this.#disposed && !this.#topicOpen) queueMicrotask(() => {
			if (this.#branches.size === 0 && this.#attached && !this.#disposed && !this.#topicOpen) this.#detach();
		});
	}
	onExecutionTerminal(listener) {
		this.#terminalListeners.add(listener);
		for (const { executionId, terminal } of this.#terminalByBranchKey.values()) try {
			listener(executionId, terminal);
		} catch (err) {
			logger$3.warn("terminal listener threw during replay", {
				topicId: this.#topicId,
				err
			});
		}
		return () => this.#terminalListeners.delete(listener);
	}
	onTopicStateChange(listener) {
		this.#topicStateListeners.add(listener);
		return () => this.#topicStateListeners.delete(listener);
	}
	dispose() {
		if (this.#disposed) return;
		this.#disposed = true;
		for (const branch of this.#branches.values()) this.#closeBranch(branch);
		this.#branches.clear();
		this.#terminalByBranchKey.clear();
		this.#terminalListeners.clear();
		this.#topicStateListeners.clear();
		if (this.#attached) ipcApi.request("ai.stream.detach", { topicId: this.#topicId }).catch(() => {});
		this.#attached = false;
		this.#attachInFlight = null;
		for (const unsub of this.#ipcUnsubs) unsub();
		this.#ipcUnsubs = [];
	}
	#getOrCreateBranch(executionId, anchorMessageId) {
		const key = branchKey(executionId, anchorMessageId);
		let branch = this.#branches.get(key);
		if (!branch) {
			branch = createBranch(executionId, anchorMessageId);
			if (this.#terminalFor(executionId, anchorMessageId)) this.#closeBranch(branch);
			this.#branches.set(key, branch);
		}
		return branch;
	}
	#terminalFor(executionId, anchorMessageId) {
		const exact = this.#terminalByBranchKey.get(branchKey(executionId, anchorMessageId))?.terminal;
		if (exact) return exact;
		if (anchorMessageId) return this.#terminalByBranchKey.get(branchKey(executionId))?.terminal;
	}
	#closeBranch(branch) {
		if (branch.closed) return;
		branch.closed = true;
		try {
			branch.controller?.close();
		} catch {}
	}
	#routeChunk(payload) {
		if (payload.topicId !== this.#topicId) return;
		const executionId = payload.executionId;
		if (!executionId) {
			if (this.#branches.size === 1) {
				const only = this.#branches.values().next().value;
				if (!only.closed) only.controller?.enqueue(payload.chunk);
			} else logger$3.warn("chunk without executionId dropped", { topicId: this.#topicId });
			return;
		}
		const branch = this.#getOrCreateBranch(executionId, payload.anchorMessageId);
		if (!branch.closed) branch.controller?.enqueue(payload.chunk);
	}
	#enqueueError(error, executionId, anchorMessageId) {
		const chunk = {
			type: "data-error",
			data: { ...error }
		};
		if (executionId) {
			const branch = this.#getOrCreateBranch(executionId, anchorMessageId);
			if (!branch.closed) branch.controller?.enqueue(chunk);
			return;
		}
		for (const branch of this.#branches.values()) if (!branch.closed) branch.controller?.enqueue(chunk);
	}
	#emitTerminal(executionId, terminal, anchorMessageId) {
		const keys = anchorMessageId !== void 0 ? [branchKey(executionId, anchorMessageId)] : [...this.#branches].filter(([, branch]) => branch.executionId === executionId).map(([key]) => key);
		if (keys.length === 0) keys.push(branchKey(executionId));
		for (const key of keys) {
			const branch = this.#branches.get(key);
			if (branch) this.#closeBranch(branch);
			const resolvedAnchorMessageId = anchorMessageId ?? branch?.anchorMessageId;
			const terminalForBranch = resolvedAnchorMessageId === void 0 ? terminal : {
				...terminal,
				anchorMessageId: resolvedAnchorMessageId
			};
			this.#terminalByBranchKey.set(key, {
				executionId,
				terminal: terminalForBranch
			});
			for (const listener of this.#terminalListeners) try {
				listener(executionId, terminalForBranch);
			} catch (err) {
				logger$3.warn("terminal listener threw", {
					topicId: this.#topicId,
					err
				});
			}
		}
	}
	#terminateAll(terminal) {
		for (const branch of [...this.#branches.values()]) this.#emitTerminal(branch.executionId, terminal, branch.anchorMessageId);
	}
	#updateTopicOpen(isTopicDone) {
		if (isTopicDone === void 0) return false;
		const topicOpen = !isTopicDone;
		if (topicOpen === this.#topicOpen) return false;
		this.#topicOpen = topicOpen;
		return true;
	}
	#notifyTopicStateChange() {
		for (const listener of this.#topicStateListeners) try {
			listener();
		} catch (err) {
			logger$3.warn("topic state listener threw", {
				topicId: this.#topicId,
				err
			});
		}
	}
	#setupIpcListeners() {
		if (this.#ipcUnsubs.length > 0) return;
		this.#ipcUnsubs.push(ipcApi.on("ai.stream.chunk", (data) => this.#routeChunk(data)), ipcApi.on("ai.stream.done", (data) => {
			if (data.topicId !== this.#topicId) return;
			const topicStateChanged = this.#updateTopicOpen(data.isTopicDone);
			const terminal = {
				isAbort: data.status === "paused",
				isError: false
			};
			if (data.executionId) this.#emitTerminal(data.executionId, terminal, data.anchorMessageId);
			if (data.isTopicDone || !data.executionId) this.#terminateAll(terminal);
			if (topicStateChanged) this.#notifyTopicStateChange();
		}), ipcApi.on("ai.stream.error", (data) => {
			if (data.topicId !== this.#topicId) return;
			const topicStateChanged = this.#updateTopicOpen(data.isTopicDone);
			this.#enqueueError(data.error, data.executionId, data.anchorMessageId);
			const terminal = {
				isAbort: false,
				isError: true
			};
			if (data.executionId) this.#emitTerminal(data.executionId, terminal, data.anchorMessageId);
			if (data.isTopicDone || !data.executionId) this.#terminateAll(terminal);
			if (topicStateChanged) this.#notifyTopicStateChange();
		}));
	}
	async #ensureAttached() {
		if (this.#attached || this.#attachInFlight || this.#disposed) return this.#attachInFlight ?? void 0;
		this.#setupIpcListeners();
		this.#attachInFlight = (async () => {
			try {
				const res = await ipcApi.request("ai.stream.attach", { topicId: this.#topicId });
				if (this.#disposed) return;
				this.#attached = true;
				switch (res.status) {
					case "attached":
						for (const payload of res.bufferedChunks) this.#routeChunk(payload);
						break;
					case "not-found":
					case "done":
						this.#terminateAll({
							isAbort: false,
							isError: false
						});
						break;
					case "paused":
						this.#terminateAll({
							isAbort: true,
							isError: false
						});
						break;
					case "error":
						if (res.error) this.#enqueueError(res.error);
						this.#terminateAll({
							isAbort: false,
							isError: true
						});
						break;
				}
				if (this.#branches.size === 0 && !this.#disposed && !this.#topicOpen) this.#detach();
			} catch (err) {
				logger$3.error("streamAttach failed", {
					topicId: this.#topicId,
					err
				});
				if (!this.#disposed) this.#terminateAll({
					isAbort: false,
					isError: true
				});
			} finally {
				this.#attachInFlight = null;
			}
		})();
		return this.#attachInFlight;
	}
	#detach() {
		if (!this.#attached) return;
		ipcApi.request("ai.stream.detach", { topicId: this.#topicId }).catch(() => {});
		this.#attached = false;
		this.#attachInFlight = null;
	}
};
var logger$2 = loggerService.withContext("ExecutionStreamOverlayService");
var MAX_ENTRIES = 32;
var EMPTY_VIEW = Object.freeze({
	overlay: Object.freeze({}),
	liveAssistants: Object.freeze([])
});
function executionKey(executionId, anchorMessageId) {
	return JSON.stringify([executionId, anchorMessageId ?? null]);
}
function pickSeed(uiMessages, anchorMessageId) {
	if (!anchorMessageId) return void 0;
	const found = uiMessages.find((m) => m.id === anchorMessageId);
	if (!found) return {
		id: anchorMessageId,
		role: "assistant",
		parts: []
	};
	return {
		...found,
		parts: structuredClone(found.parts ?? [])
	};
}
function canReuseSettledPart(previous, next) {
	if (previous.type !== next.type) return false;
	if (previous.type === "text" && next.type === "text") return previous.state !== "streaming" && next.state !== "streaming" && previous.text === next.text;
	if (previous.type === "reasoning" && next.type === "reasoning") return previous.state !== "streaming" && next.state !== "streaming" && previous.text === next.text;
	if (isToolUIPart(previous) && isToolUIPart(next)) {
		const previousTool = previous;
		const nextTool = next;
		if (previousTool.toolCallId !== nextTool.toolCallId || previousTool.state !== nextTool.state) return false;
		if (previousTool.state === "output-available") return previousTool.preliminary !== true && nextTool.preliminary !== true;
		return previousTool.state === "output-error" || previousTool.state === "output-denied" || previousTool.state === "cancelled";
	}
	return previous.type === "file" || previous.type === "source-url" || previous.type === "source-document" || previous.type === "step-start";
}
function shareSettledPartReferences(previous, next) {
	if (!previous || previous.length === 0 || next.length === 0) return next;
	let reusedAny = false;
	let reusedAll = previous.length === next.length;
	const shared = next.map((part, index) => {
		const previousPart = previous[index];
		if (previousPart === part || previousPart && canReuseSettledPart(previousPart, part)) {
			reusedAny = true;
			return previousPart;
		}
		reusedAll = false;
		return part;
	});
	if (reusedAll) return previous;
	return reusedAny ? shared : next;
}
function computeView(snapshots) {
	const overlay = {};
	for (const snapshot of Object.values(snapshots)) if (snapshot?.parts?.length) overlay[snapshot.id] = snapshot.parts;
	return {
		overlay,
		liveAssistants: Object.values(snapshots).filter((s) => s?.role === "assistant")
	};
}
var ExecutionStreamOverlayService = class {
	#entries = /* @__PURE__ */ new Map();
	acquire(topicId) {
		const entry = this.#getOrCreate(topicId);
		entry.refCount += 1;
		entry.lastActiveAt = Date.now();
		this.#flushPending(entry, entry.epoch);
	}
	release(topicId, consumer) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		entry.desired.delete(consumer);
		entry.refCount = Math.max(0, entry.refCount - 1);
		if (entry.refCount === 0) entry.needsRemountReconcile = true;
		this.#maybeDrop(entry);
	}
	syncExecutions(topicId, consumer, executions, getSeedMessages) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		entry.desired.set(consumer, {
			executions,
			getSeedMessages
		});
		const union$1 = /* @__PURE__ */ new Map();
		for (const contribution of entry.desired.values()) for (const { executionId, anchorMessageId } of contribution.executions) {
			const key = executionKey(executionId, anchorMessageId);
			if (!union$1.has(key)) union$1.set(key, {
				executionId,
				anchorMessageId,
				seed: contribution
			});
		}
		for (const key of entry.settledKeys) if (!union$1.has(key)) entry.settledKeys.delete(key);
		if (entry.needsRemountReconcile) {
			entry.needsRemountReconcile = false;
			const liveExecutionIds = new Set([...union$1.values()].map((item) => item.executionId));
			let next = entry.snapshots;
			for (const executionId of Object.keys(entry.snapshots)) {
				if (liveExecutionIds.has(executionId)) continue;
				entry.pendingSnapshots.delete(executionId);
				entry.readerVersions.set(executionId, (entry.readerVersions.get(executionId) ?? 0) + 1);
				if (next === entry.snapshots) next = { ...entry.snapshots };
				delete next[executionId];
			}
			this.#commitSnapshots(entry, next);
		}
		for (const [key, handle] of [...entry.readers]) {
			if (union$1.has(key)) continue;
			handle.cancel();
			handle.unregister();
			entry.readers.delete(key);
		}
		for (const [key, item] of union$1) {
			if (entry.readers.has(key)) continue;
			if (entry.settledKeys.has(key)) {
				if (!entry.sub.hasOpenBranch(item.executionId, item.anchorMessageId)) continue;
				entry.settledKeys.delete(key);
			}
			this.#startReader(entry, key, item.executionId, item.anchorMessageId, item.seed.getSeedMessages);
		}
	}
	subscribe(topicId, listener) {
		const entry = this.#entries.get(topicId);
		if (!entry) return () => {};
		entry.listeners.add(listener);
		return () => entry.listeners.delete(listener);
	}
	getView(topicId) {
		return this.#entries.get(topicId)?.view ?? EMPTY_VIEW;
	}
	onFinish(topicId, listener) {
		const entry = this.#entries.get(topicId);
		if (!entry) return () => {};
		entry.finishListeners.add(listener);
		return () => entry.finishListeners.delete(listener);
	}
	disposeOverlay(topicId, messageId) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		const snapshotEntry = Object.entries(entry.snapshots).find(([, snapshot]) => snapshot.id === messageId);
		const pendingEntry = [...entry.pendingSnapshots].find(([, item]) => item.snapshot.id === messageId);
		const executionId = snapshotEntry?.[0] ?? pendingEntry?.[0];
		if (!executionId || this.#liveReaderExecutionIds(entry).has(executionId)) return;
		entry.pendingSnapshots.delete(executionId);
		entry.readerVersions.set(executionId, (entry.readerVersions.get(executionId) ?? 0) + 1);
		if (entry.pendingSnapshots.size === 0) this.#cancelFrame(entry);
		if (snapshotEntry) {
			const next = { ...entry.snapshots };
			delete next[snapshotEntry[0]];
			this.#commitSnapshots(entry, next);
		}
	}
	reset(topicId) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		const liveExecutionIds = this.#liveReaderExecutionIds(entry);
		if (liveExecutionIds.size === 0) {
			this.clear(topicId);
			return;
		}
		let next = entry.snapshots;
		for (const executionId of new Set([...Object.keys(entry.snapshots), ...entry.pendingSnapshots.keys()])) {
			if (liveExecutionIds.has(executionId)) continue;
			entry.pendingSnapshots.delete(executionId);
			entry.readerVersions.set(executionId, (entry.readerVersions.get(executionId) ?? 0) + 1);
			if (executionId in next) {
				if (next === entry.snapshots) next = { ...entry.snapshots };
				delete next[executionId];
			}
		}
		if (entry.pendingSnapshots.size === 0) this.#cancelFrame(entry);
		this.#commitSnapshots(entry, next);
	}
	clear(topicId) {
		const entry = this.#entries.get(topicId);
		if (!entry) return;
		this.#invalidatePending(entry);
		entry.readerVersions.clear();
		if (Object.keys(entry.snapshots).length > 0) this.#commitSnapshots(entry, {});
	}
	#getOrCreate(topicId) {
		let entry = this.#entries.get(topicId);
		if (entry) return entry;
		this.#evictIfNeeded();
		const sub = new TopicStreamSubscription(topicId);
		if (topicId) sub.listen();
		entry = {
			topicId,
			sub,
			dropped: false,
			refCount: 0,
			desired: /* @__PURE__ */ new Map(),
			snapshots: {},
			view: EMPTY_VIEW,
			pendingSnapshots: /* @__PURE__ */ new Map(),
			readerVersions: /* @__PURE__ */ new Map(),
			readers: /* @__PURE__ */ new Map(),
			settledKeys: /* @__PURE__ */ new Set(),
			liveReaderCount: 0,
			epoch: 0,
			frameId: null,
			listeners: /* @__PURE__ */ new Set(),
			finishListeners: /* @__PURE__ */ new Set(),
			lastActiveAt: Date.now(),
			needsRemountReconcile: false
		};
		this.#entries.set(topicId, entry);
		sub.onExecutionTerminal(() => {
			if (this.#entries.get(topicId) === entry) this.#maybeDrop(entry);
		});
		sub.onTopicStateChange(() => {
			if (this.#entries.get(topicId) === entry) this.#maybeDrop(entry);
		});
		return entry;
	}
	#evictIfNeeded() {
		while (this.#entries.size >= MAX_ENTRIES) {
			let oldest;
			for (const entry of this.#entries.values()) {
				if (entry.refCount > 0) continue;
				if (!oldest || entry.lastActiveAt < oldest.lastActiveAt) oldest = entry;
			}
			if (!oldest) return;
			logger$2.error("evicting stale overlay entry", {
				topicId: oldest.topicId,
				entryCount: this.#entries.size,
				liveReaders: oldest.liveReaderCount,
				idleMs: Date.now() - oldest.lastActiveAt
			});
			for (const handle of oldest.readers.values()) handle.cancel();
			this.#dropEntry(oldest);
		}
	}
	#maybeDrop(entry) {
		if (entry.refCount > 0 || entry.liveReaderCount > 0) return;
		if (entry.sub.isTopicOpen()) return;
		if (entry.sub.hasAnyOpenBranch()) return;
		this.#dropEntry(entry);
	}
	#liveReaderExecutionIds(entry) {
		const ids = /* @__PURE__ */ new Set();
		for (const handle of entry.readers.values()) ids.add(handle.executionId);
		return ids;
	}
	#dropEntry(entry) {
		if (entry.dropped) return;
		entry.dropped = true;
		if (this.#entries.get(entry.topicId) === entry) this.#entries.delete(entry.topicId);
		this.#cancelFrame(entry);
		entry.sub.dispose();
	}
	#startReader(entry, key, executionId, anchorMessageId, getSeedMessages) {
		const branch = entry.sub.register(executionId, anchorMessageId);
		const readerEpoch = entry.epoch;
		const readerVersion = (entry.readerVersions.get(executionId) ?? 0) + 1;
		entry.readerVersions.set(executionId, readerVersion);
		entry.pendingSnapshots.delete(executionId);
		if (executionId in entry.snapshots) {
			const next = { ...entry.snapshots };
			delete next[executionId];
			this.#commitSnapshots(entry, next);
		}
		let cancelled = false;
		let readerFailed = false;
		let terminal;
		const offTerminal = entry.sub.onExecutionTerminal((id, t) => {
			if (id !== executionId) return;
			if (t.anchorMessageId !== void 0 && t.anchorMessageId !== anchorMessageId) return;
			terminal = t;
		});
		const seed = pickSeed(getSeedMessages(), anchorMessageId);
		const topicId = entry.topicId;
		const handle = {
			executionId,
			anchorMessageId,
			cancel: () => {
				cancelled = true;
			},
			unregister: () => {
				offTerminal();
				entry.sub.unregister(executionId, anchorMessageId);
			}
		};
		entry.readers.set(key, handle);
		entry.liveReaderCount += 1;
		(async () => {
			let last;
			try {
				for await (const snapshot of readUIMessageStream({
					stream: branch,
					message: seed,
					terminateOnError: false,
					onError: (err) => logger$2.warn("readUIMessageStream error", {
						topicId,
						executionId,
						err
					})
				})) {
					if (cancelled) break;
					const sharedParts = shareSettledPartReferences(last?.parts, snapshot.parts);
					const nextSnapshot = sharedParts === snapshot.parts ? snapshot : {
						...snapshot,
						parts: sharedParts
					};
					last = nextSnapshot;
					this.#queueSnapshot(entry, executionId, nextSnapshot, readerEpoch, readerVersion);
				}
			} catch (err) {
				readerFailed = true;
				logger$2.error("execution reader threw", {
					topicId,
					executionId,
					err
				});
			} finally {
				offTerminal();
				if (entry.readers.get(key) === handle) {
					entry.sub.unregister(executionId, anchorMessageId);
					entry.readers.delete(key);
				}
				if (!cancelled) {
					entry.settledKeys.add(key);
					if (entry.refCount === 0) {
						entry.pendingSnapshots.delete(executionId);
						entry.readerVersions.set(executionId, (entry.readerVersions.get(executionId) ?? 0) + 1);
						if (executionId in entry.snapshots) {
							const next = { ...entry.snapshots };
							delete next[executionId];
							this.#commitSnapshots(entry, next);
						}
					} else {
						this.#flushPending(entry, readerEpoch);
						const t = terminal ?? {
							isAbort: false,
							isError: false
						};
						const isError = t.isError || readerFailed;
						const message = last ?? seed;
						if (message || isError) {
							const event = {
								message: message ?? {
									id: "",
									role: "assistant",
									parts: []
								},
								isAbort: t.isAbort,
								isError
							};
							for (const listener of [...entry.finishListeners]) try {
								listener(executionId, event);
							} catch (err) {
								logger$2.warn("finish listener threw", {
									topicId,
									executionId,
									err
								});
							}
						}
					}
				}
				entry.liveReaderCount -= 1;
				this.#maybeDrop(entry);
			}
		})();
	}
	#queueSnapshot(entry, executionId, snapshot, epoch, readerVersion) {
		if (epoch !== entry.epoch || entry.readerVersions.get(executionId) !== readerVersion) return;
		entry.pendingSnapshots.set(executionId, {
			epoch,
			readerVersion,
			snapshot
		});
		if (entry.frameId !== null) return;
		entry.frameId = window.requestAnimationFrame(() => {
			entry.frameId = null;
			this.#flushPending(entry, epoch);
		});
	}
	#flushPending(entry, expectedEpoch) {
		if (expectedEpoch !== entry.epoch) return;
		this.#cancelFrame(entry);
		const pending = entry.pendingSnapshots;
		if (pending.size === 0) return;
		entry.pendingSnapshots = /* @__PURE__ */ new Map();
		let next = entry.snapshots;
		for (const [executionId, item] of pending) {
			if (item.epoch !== entry.epoch) continue;
			if (entry.readerVersions.get(executionId) !== item.readerVersion) continue;
			if (entry.snapshots[executionId] === item.snapshot) continue;
			if (next === entry.snapshots) next = { ...entry.snapshots };
			next[executionId] = item.snapshot;
		}
		this.#commitSnapshots(entry, next);
	}
	#commitSnapshots(entry, next) {
		if (next === entry.snapshots) return;
		entry.snapshots = next;
		entry.view = computeView(next);
		entry.lastActiveAt = Date.now();
		for (const listener of [...entry.listeners]) try {
			listener();
		} catch (err) {
			logger$2.warn("overlay listener threw", {
				topicId: entry.topicId,
				err
			});
		}
	}
	#invalidatePending(entry) {
		entry.epoch += 1;
		entry.pendingSnapshots.clear();
		this.#cancelFrame(entry);
	}
	#cancelFrame(entry) {
		if (entry.frameId === null) return;
		window.cancelAnimationFrame(entry.frameId);
		entry.frameId = null;
	}
};
const executionStreamOverlayService = new ExecutionStreamOverlayService();
function getStreamBlockedMessage(response) {
	return response.reason === "paused" ? resolver_default.t("restore.messages_paused") : response.message;
}
var logger$1 = loggerService.withContext("StreamDispatchService");
var StreamDispatchService = class {
	listeners = /* @__PURE__ */ new Map();
	notify(result) {
		const subs = this.listeners.get(result.topicId);
		if (!subs) return;
		for (const cb of [...subs]) try {
			cb(result);
		} catch (err) {
			logger$1.warn("stream dispatch listener threw", {
				topicId: result.topicId,
				err
			});
		}
	}
	dispatch(topicId, request) {
		ipcApi.request("ai.stream.open", request).then((ack) => {
			if (ack.mode === "blocked") toast.error(getStreamBlockedMessage(ack));
			this.notify({
				ok: true,
				topicId,
				ack
			});
		}).catch((error) => {
			const err = error instanceof Error ? error : new Error(String(error));
			logger$1.error("streamOpen IPC failed", err);
			this.notify({
				ok: false,
				topicId,
				error: err
			});
		});
	}
	subscribe(topicId, listener) {
		let subs = this.listeners.get(topicId);
		if (!subs) {
			subs = /* @__PURE__ */ new Set();
			this.listeners.set(topicId, subs);
		}
		subs.add(listener);
		return () => {
			subs.delete(listener);
			if (subs.size === 0) this.listeners.delete(topicId);
		};
	}
};
const streamDispatchService = new StreamDispatchService();
var logger = loggerService.withContext("IpcChatTransport");
function isPerExecutionOnly(data) {
	return !!data.executionId && !data.isTopicDone;
}
var IpcChatTransport = class {
	#defaultBody;
	constructor(defaultBody = {}) {
		this.#defaultBody = defaultBody;
	}
	sendMessages(options) {
		const { chatId: topicId, messages, abortSignal, body, trigger } = options;
		const mergedBody = {
			...this.#defaultBody,
			...body
		};
		const stream = this.buildListenerStream(topicId, void 0, abortSignal);
		const lastMessage = messages.at(-1);
		const ipcRequest = trigger === "regenerate-message" ? {
			trigger: "regenerate-message",
			topicId,
			parentAnchorId: mergedBody.parentAnchorId ?? "",
			mentionedModelIds: mergedBody.mentionedModels,
			reasoningEffort: mergedBody.reasoningEffort,
			...mergedBody.fastMode ? { fastMode: true } : {}
		} : {
			trigger: "submit-message",
			topicId,
			parentAnchorId: mergedBody.parentAnchorId,
			userMessageParts: mergedBody.userMessageParts ?? lastMessage?.parts ?? [],
			mentionedModelIds: mergedBody.mentionedModels,
			reasoningEffort: mergedBody.reasoningEffort,
			...mergedBody.fastMode ? { fastMode: true } : {}
		};
		streamDispatchService.dispatch(topicId, ipcRequest);
		return Promise.resolve(stream);
	}
	async reconnectToStream(options) {
		const topicId = options.chatId;
		logger.info("reconnectToStream called", { topicId });
		const result = await ipcApi.request("ai.stream.attach", { topicId });
		logger.info("reconnectToStream result", {
			topicId,
			status: result.status
		});
		if (result.status === "not-found") return null;
		if (result.status === "done" || result.status === "paused") return new ReadableStream({ start: (c) => c.close() });
		if (result.status === "error") return new ReadableStream({ start: (c) => c.error(new Error(result.error?.message ?? "Stream error")) });
		logger.info("Reconnected to stream", {
			topicId,
			bufferedChunks: result.bufferedChunks.length
		});
		return this.buildListenerStream(topicId, result.bufferedChunks);
	}
	buildListenerStream(topicId, initialChunks, abortSignal, executionId) {
		const unsubscribers = [];
		let isCleaned = false;
		let isStreamClosed = false;
		const cleanup = () => {
			if (isCleaned) return;
			isCleaned = true;
			for (const unsub of unsubscribers) unsub();
		};
		return new ReadableStream({
			start(controller) {
				if (initialChunks) {
					for (const data of initialChunks) if (matchesStream(data)) controller.enqueue(data.chunk);
				}
				let pendingChunks = [];
				let rafHandle = null;
				const flushPending = () => {
					rafHandle = null;
					if (pendingChunks.length === 0 || isStreamClosed) {
						pendingChunks = [];
						return;
					}
					const batch = pendingChunks;
					pendingChunks = [];
					for (const chunk of batch) controller.enqueue(chunk);
				};
				const schedulePending = (chunk) => {
					pendingChunks.push(chunk);
					if (rafHandle === null) rafHandle = requestAnimationFrame(flushPending);
				};
				const cancelPending = () => {
					if (rafHandle !== null) {
						cancelAnimationFrame(rafHandle);
						rafHandle = null;
					}
					pendingChunks = [];
				};
				unsubscribers.push(cancelPending);
				const closeStream = () => {
					if (isStreamClosed) return;
					isStreamClosed = true;
					if (rafHandle !== null) cancelAnimationFrame(rafHandle);
					rafHandle = null;
					for (const chunk of pendingChunks) controller.enqueue(chunk);
					pendingChunks = [];
					cleanup();
					controller.close();
				};
				const errorStream = (err) => {
					if (isStreamClosed) return;
					isStreamClosed = true;
					cancelPending();
					cleanup();
					controller.error(err);
				};
				function matchesStream(data) {
					if (data.topicId !== topicId) return false;
					if (executionId) return data.executionId === executionId || !!data.isTopicDone;
					return !data.executionId || !!data.isTopicDone;
				}
				unsubscribers.push(streamDispatchService.subscribe(topicId, (result) => {
					if (result.ok) {
						if (result.ack.mode === "blocked") closeStream();
						return;
					}
					errorStream(result.error);
				}), ipcApi.on("ai.stream.chunk", (data) => {
					if (data.topicId !== topicId || isStreamClosed) return;
					if (executionId && data.executionId !== executionId) return;
					if (!executionId && data.executionId) return;
					if (isStreamClosed || !matchesStream(data)) return;
					schedulePending(data.chunk);
				}));
				unsubscribers.push(ipcApi.on("ai.stream.done", (data) => {
					if (!matchesStream(data)) return;
					if (executionId && data.executionId !== executionId) return;
					if (!executionId && isPerExecutionOnly(data)) return;
					closeStream();
				}));
				unsubscribers.push(ipcApi.on("ai.stream.error", (data) => {
					if (!matchesStream(data)) return;
					errorStream(new Error(data.error.message ?? "Unknown stream error"));
				}));
				if (abortSignal) {
					if (abortSignal.aborted) {
						ipcApi.request("ai.stream.abort", { topicId }).catch((e) => logger.warn("streamAbort failed", {
							topicId,
							e
						}));
						closeStream();
						return;
					}
					const onAbort = () => {
						logger.info("Stream abort requested", { topicId });
						ipcApi.request("ai.stream.abort", { topicId }).catch((e) => logger.warn("streamAbort failed", {
							topicId,
							e
						}));
						closeStream();
					};
					abortSignal.addEventListener("abort", onAbort, { once: true });
					unsubscribers.push(() => abortSignal.removeEventListener("abort", onAbort));
				}
			},
			cancel() {
				if (!isStreamClosed) {
					isStreamClosed = true;
					ipcApi.request("ai.stream.detach", { topicId }).catch((e) => logger.warn("streamDetach failed", {
						topicId,
						e
					}));
					cleanup();
				}
			}
		});
	}
};
const ipcChatTransport = new IpcChatTransport();
function useExecutionOverlay(topicId, activeExecutions, uiMessages, options = {}) {
	const consumer = (0, import_react.useRef)({}).current;
	const uiMessagesRef = (0, import_react.useRef)(uiMessages);
	uiMessagesRef.current = uiMessages;
	const onFinishRef = (0, import_react.useRef)(options.onFinish);
	onFinishRef.current = options.onFinish;
	const topicIdRef = (0, import_react.useRef)(topicId);
	topicIdRef.current = topicId;
	(0, import_react.useEffect)(() => {
		executionStreamOverlayService.acquire(topicId);
		const offFinish = executionStreamOverlayService.onFinish(topicId, (executionId, event) => onFinishRef.current?.(executionId, event));
		return () => {
			offFinish();
			executionStreamOverlayService.release(topicId, consumer);
		};
	}, [consumer, topicId]);
	const getSeedMessages = (0, import_react.useCallback)(() => uiMessagesRef.current, []);
	(0, import_react.useEffect)(() => {
		executionStreamOverlayService.syncExecutions(topicId, consumer, activeExecutions, getSeedMessages);
	}, [
		activeExecutions,
		consumer,
		getSeedMessages,
		topicId
	]);
	const view = (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((listener) => executionStreamOverlayService.subscribe(topicId, listener), [topicId]), (0, import_react.useCallback)(() => executionStreamOverlayService.getView(topicId), [topicId]));
	const api = (0, import_react.useRef)(void 0);
	if (!api.current) api.current = {
		overlay: view.overlay,
		liveAssistants: view.liveAssistants,
		disposeOverlay: (messageId) => executionStreamOverlayService.disposeOverlay(topicIdRef.current, messageId),
		reset: () => executionStreamOverlayService.reset(topicIdRef.current),
		clear: () => executionStreamOverlayService.clear(topicIdRef.current)
	};
	api.current.overlay = view.overlay;
	api.current.liveAssistants = view.liveAssistants;
	return api.current;
}
function getTextFromParts(parts) {
	return parts.filter((p) => p.type === "text").map((p) => p.text).filter((t) => t.trim().length > 0).join("\n\n");
}
function hasTextParts(parts) {
	return parts.some((p) => p.type === "text" && p.text.trim().length > 0);
}
function hasTranslationParts(parts) {
	return parts.some((p) => p.type === "data-translation");
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasUnroundtrippableTextMetadata(part, textPartCount) {
	const providerMetadata = part.providerMetadata;
	if (providerMetadata === void 0) return false;
	if (!isRecord(providerMetadata)) return true;
	if (Object.keys(providerMetadata).length === 0) return false;
	if (Object.keys(providerMetadata).some((provider) => provider !== "cherry")) return true;
	const cherry = providerMetadata.cherry;
	if (!isRecord(cherry)) return cherry !== void 0;
	for (const [key, value] of Object.entries(cherry)) {
		if (key === "references") {
			if (!Array.isArray(value) || value.length > 0) return true;
			continue;
		}
		if (key === "composer") {
			if (value !== void 0 && (textPartCount !== 1 || !readCherryMeta(part)?.composer)) return true;
			continue;
		}
		return true;
	}
	return false;
}
function canEditAssistantMessageParts(parts) {
	let hasText = false;
	let hasEditablePart = false;
	let hasFile = false;
	let editableRunEnded = false;
	const textPartCount = parts.reduce((count, part) => count + (part.type === "text" ? 1 : 0), 0);
	for (const part of parts) {
		if (part.type === "data-translation") continue;
		if (part.type === "text") {
			if (editableRunEnded || hasFile || hasUnroundtrippableTextMetadata(part, textPartCount)) return false;
			hasText ||= part.text.trim().length > 0;
			hasEditablePart = true;
			continue;
		}
		if (part.type === "file") {
			if (editableRunEnded) return false;
			hasEditablePart = true;
			hasFile = true;
			continue;
		}
		if (hasEditablePart) editableRunEnded = true;
	}
	return hasText;
}
function getTranslationFromParts(parts) {
	return parts.filter((p) => p.type === "data-translation").map((p) => p.data);
}
export { hasTranslationParts as a, getStreamBlockedMessage as c, hasTextParts as i, Chat as l, getTextFromParts as n, useExecutionOverlay as o, getTranslationFromParts as r, ipcChatTransport as s, canEditAssistantMessageParts as t, useChat as u };
