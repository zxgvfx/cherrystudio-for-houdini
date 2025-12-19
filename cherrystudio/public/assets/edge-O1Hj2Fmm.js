import { A as unknown, C as safeParseAsync, f as _enum, k as array, l as boolean, t as number, u as object, v as record, x as string, z as union } from "./schemas-Bbbixa2f.js";
import { b as ZodFirstPartyTypeKind, c as EventSourceParserStream, e as APICallError, f as EmptyResponseBodyError, g as InvalidArgumentError, j as JSONParseError, k as LoadAPIKeyError, n as TooManyEmbeddingValuesForCallError, o as TypeValidationError, p as UnsupportedFunctionalityError, t as toJSONSchema } from "./types-Db4HyS8d.js";
import { b as combineHeaders, e as createJsonErrorResponseHandler, f as createJsonResponseHandler, i as generateId, j as getRuntimeEnvironmentUserAgent, l as loadOptionalSetting, m as loadSetting, n as parseProviderOptions, o as postJsonToApi, p as resolve, r as withUserAgentSuffix, s as withoutTrailingSlash } from "./dist-Bk10HTjR.js";
function combineHeaders$1(...headers) {
	return headers.reduce((combinedHeaders, currentHeaders) => ({
		...combinedHeaders,
		...currentHeaders != null ? currentHeaders : {}
	}), {});
}
function extractResponseHeaders(response) {
	return Object.fromEntries([...response.headers]);
}
var createIdGenerator = ({ prefix, size = 16, alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", separator = "-" } = {}) => {
	const generator = () => {
		const alphabetLength = alphabet.length;
		const chars = new Array(size);
		for (let i = 0; i < size; i++) chars[i] = alphabet[Math.random() * alphabetLength | 0];
		return chars.join("");
	};
	if (prefix == null) return generator;
	if (alphabet.includes(separator)) throw new InvalidArgumentError({
		argument: "separator",
		message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
	});
	return () => `${prefix}${separator}${generator()}`;
};
var generateId$1 = createIdGenerator();
function isAbortError(error) {
	return (error instanceof Error || error instanceof DOMException) && (error.name === "AbortError" || error.name === "ResponseAborted" || error.name === "TimeoutError");
}
var FETCH_FAILED_ERROR_MESSAGES = ["fetch failed", "failed to fetch"];
function handleFetchError({ error, url, requestBodyValues }) {
	if (isAbortError(error)) return error;
	if (error instanceof TypeError && FETCH_FAILED_ERROR_MESSAGES.includes(error.message.toLowerCase())) {
		const cause = error.cause;
		if (cause != null) return new APICallError({
			message: `Cannot connect to API: ${cause.message}`,
			cause,
			url,
			requestBodyValues,
			isRetryable: true
		});
	}
	return error;
}
function getRuntimeEnvironmentUserAgent$1(globalThisAny = globalThis) {
	var _a, _b, _c;
	if (globalThisAny.window) return `runtime/browser`;
	if ((_a = globalThisAny.navigator) == null ? void 0 : _a.userAgent) return `runtime/${globalThisAny.navigator.userAgent.toLowerCase()}`;
	if ((_c = (_b = globalThisAny.process) == null ? void 0 : _b.versions) == null ? void 0 : _c.node) return `runtime/node.js/${globalThisAny.process.version.substring(0)}`;
	if (globalThisAny.EdgeRuntime) return `runtime/vercel-edge`;
	return "runtime/unknown";
}
function normalizeHeaders(headers) {
	if (headers == null) return {};
	const normalized = {};
	if (headers instanceof Headers) headers.forEach((value, key) => {
		normalized[key.toLowerCase()] = value;
	});
	else {
		if (!Array.isArray(headers)) headers = Object.entries(headers);
		for (const [key, value] of headers) if (value != null) normalized[key.toLowerCase()] = value;
	}
	return normalized;
}
function withUserAgentSuffix$1(headers, ...userAgentSuffixParts) {
	const normalizedHeaders = new Headers(normalizeHeaders(headers));
	const currentUserAgentHeader = normalizedHeaders.get("user-agent") || "";
	normalizedHeaders.set("user-agent", [currentUserAgentHeader, ...userAgentSuffixParts].filter(Boolean).join(" "));
	return Object.fromEntries(normalizedHeaders.entries());
}
var VERSION$1 = "3.0.19";
function loadApiKey({ apiKey, environmentVariableName, apiKeyParameterName = "apiKey", description }) {
	if (typeof apiKey === "string") return apiKey;
	if (apiKey != null) throw new LoadAPIKeyError({ message: `${description} API key must be a string.` });
	if (typeof process === "undefined") throw new LoadAPIKeyError({ message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter. Environment variables is not supported in this environment.` });
	apiKey = {}[environmentVariableName];
	if (apiKey == null) throw new LoadAPIKeyError({ message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter or the ${environmentVariableName} environment variable.` });
	if (typeof apiKey !== "string") throw new LoadAPIKeyError({ message: `${description} API key must be a string. The value of the ${environmentVariableName} environment variable is not a string.` });
	return apiKey;
}
var suspectProtoRx = /"__proto__"\s*:/;
var suspectConstructorRx = /"constructor"\s*:/;
function _parse(text) {
	const obj = JSON.parse(text);
	if (obj === null || typeof obj !== "object") return obj;
	if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) return obj;
	return filter(obj);
}
function filter(obj) {
	let next = [obj];
	while (next.length) {
		const nodes = next;
		next = [];
		for (const node of nodes) {
			if (Object.prototype.hasOwnProperty.call(node, "__proto__")) throw new SyntaxError("Object contains forbidden prototype property");
			if (Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) throw new SyntaxError("Object contains forbidden prototype property");
			for (const key in node) {
				const value = node[key];
				if (value && typeof value === "object") next.push(value);
			}
		}
	}
	return obj;
}
function secureJsonParse(text) {
	const { stackTraceLimit } = Error;
	try {
		Error.stackTraceLimit = 0;
	} catch (e) {
		return _parse(text);
	}
	try {
		return _parse(text);
	} finally {
		Error.stackTraceLimit = stackTraceLimit;
	}
}
var validatorSymbol = Symbol.for("vercel.ai.validator");
function validator(validate) {
	return {
		[validatorSymbol]: true,
		validate
	};
}
function isValidator(value) {
	return typeof value === "object" && value !== null && validatorSymbol in value && value[validatorSymbol] === true && "validate" in value;
}
function asValidator(value) {
	return isValidator(value) ? value : typeof value === "function" ? value() : standardSchemaValidator(value);
}
function standardSchemaValidator(standardSchema) {
	return validator(async (value) => {
		const result = await standardSchema["~standard"].validate(value);
		return result.issues == null ? {
			success: true,
			value: result.value
		} : {
			success: false,
			error: new TypeValidationError({
				value,
				cause: result.issues
			})
		};
	});
}
async function validateTypes({ value, schema }) {
	const result = await safeValidateTypes({
		value,
		schema
	});
	if (!result.success) throw TypeValidationError.wrap({
		value,
		cause: result.error
	});
	return result.value;
}
async function safeValidateTypes({ value, schema }) {
	const validator2 = asValidator(schema);
	try {
		if (validator2.validate == null) return {
			success: true,
			value,
			rawValue: value
		};
		const result = await validator2.validate(value);
		if (result.success) return {
			success: true,
			value: result.value,
			rawValue: value
		};
		return {
			success: false,
			error: TypeValidationError.wrap({
				value,
				cause: result.error
			}),
			rawValue: value
		};
	} catch (error) {
		return {
			success: false,
			error: TypeValidationError.wrap({
				value,
				cause: error
			}),
			rawValue: value
		};
	}
}
async function parseJSON({ text, schema }) {
	try {
		const value = secureJsonParse(text);
		if (schema == null) return value;
		return validateTypes({
			value,
			schema
		});
	} catch (error) {
		if (JSONParseError.isInstance(error) || TypeValidationError.isInstance(error)) throw error;
		throw new JSONParseError({
			text,
			cause: error
		});
	}
}
async function safeParseJSON({ text, schema }) {
	try {
		const value = secureJsonParse(text);
		if (schema == null) return {
			success: true,
			value,
			rawValue: value
		};
		return await safeValidateTypes({
			value,
			schema
		});
	} catch (error) {
		return {
			success: false,
			error: JSONParseError.isInstance(error) ? error : new JSONParseError({
				text,
				cause: error
			}),
			rawValue: void 0
		};
	}
}
function parseJsonEventStream({ stream, schema }) {
	return stream.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).pipeThrough(new TransformStream({ async transform({ data }, controller) {
		if (data === "[DONE]") return;
		controller.enqueue(await safeParseJSON({
			text: data,
			schema
		}));
	} }));
}
async function parseProviderOptions$1({ provider, providerOptions, schema }) {
	if ((providerOptions == null ? void 0 : providerOptions[provider]) == null) return void 0;
	const parsedProviderOptions = await safeValidateTypes({
		value: providerOptions[provider],
		schema
	});
	if (!parsedProviderOptions.success) throw new InvalidArgumentError({
		argument: "providerOptions",
		message: `invalid ${provider} provider options`,
		cause: parsedProviderOptions.error
	});
	return parsedProviderOptions.value;
}
var getOriginalFetch2 = () => globalThis.fetch;
var postJsonToApi$1 = async ({ url, headers, body, failedResponseHandler, successfulResponseHandler, abortSignal, fetch: fetch$1 }) => postToApi({
	url,
	headers: {
		"Content-Type": "application/json",
		...headers
	},
	body: {
		content: JSON.stringify(body),
		values: body
	},
	failedResponseHandler,
	successfulResponseHandler,
	abortSignal,
	fetch: fetch$1
});
var postToApi = async ({ url, headers = {}, body, successfulResponseHandler, failedResponseHandler, abortSignal, fetch: fetch$1 = getOriginalFetch2() }) => {
	try {
		const response = await fetch$1(url, {
			method: "POST",
			headers: withUserAgentSuffix$1(headers, `ai-sdk/provider-utils/${VERSION$1}`, getRuntimeEnvironmentUserAgent$1()),
			body: body.content,
			signal: abortSignal
		});
		const responseHeaders = extractResponseHeaders(response);
		if (!response.ok) {
			let errorInformation;
			try {
				errorInformation = await failedResponseHandler({
					response,
					url,
					requestBodyValues: body.values
				});
			} catch (error) {
				if (isAbortError(error) || APICallError.isInstance(error)) throw error;
				throw new APICallError({
					message: "Failed to process error response",
					cause: error,
					statusCode: response.status,
					url,
					responseHeaders,
					requestBodyValues: body.values
				});
			}
			throw errorInformation.value;
		}
		try {
			return await successfulResponseHandler({
				response,
				url,
				requestBodyValues: body.values
			});
		} catch (error) {
			if (error instanceof Error) {
				if (isAbortError(error) || APICallError.isInstance(error)) throw error;
			}
			throw new APICallError({
				message: "Failed to process successful response",
				cause: error,
				statusCode: response.status,
				url,
				responseHeaders,
				requestBodyValues: body.values
			});
		}
	} catch (error) {
		throw handleFetchError({
			error,
			url,
			requestBodyValues: body.values
		});
	}
};
function tool(tool2) {
	return tool2;
}
function createProviderDefinedToolFactory({ id, name, inputSchema }) {
	return ({ execute, outputSchema, toModelOutput, onInputStart, onInputDelta, onInputAvailable,...args }) => tool({
		type: "provider-defined",
		id,
		name,
		args,
		inputSchema,
		outputSchema,
		execute,
		toModelOutput,
		onInputStart,
		onInputDelta,
		onInputAvailable
	});
}
function createProviderDefinedToolFactoryWithOutputSchema({ id, name, inputSchema, outputSchema }) {
	return ({ execute, toModelOutput, onInputStart, onInputDelta, onInputAvailable,...args }) => tool({
		type: "provider-defined",
		id,
		name,
		args,
		inputSchema,
		outputSchema,
		execute,
		toModelOutput,
		onInputStart,
		onInputDelta,
		onInputAvailable
	});
}
async function resolve$1(value) {
	if (typeof value === "function") value = value();
	return Promise.resolve(value);
}
var createJsonErrorResponseHandler$1 = ({ errorSchema, errorToMessage, isRetryable }) => async ({ response, url, requestBodyValues }) => {
	const responseBody = await response.text();
	const responseHeaders = extractResponseHeaders(response);
	if (responseBody.trim() === "") return {
		responseHeaders,
		value: new APICallError({
			message: response.statusText,
			url,
			requestBodyValues,
			statusCode: response.status,
			responseHeaders,
			responseBody,
			isRetryable: isRetryable == null ? void 0 : isRetryable(response)
		})
	};
	try {
		const parsedError = await parseJSON({
			text: responseBody,
			schema: errorSchema
		});
		return {
			responseHeaders,
			value: new APICallError({
				message: errorToMessage(parsedError),
				url,
				requestBodyValues,
				statusCode: response.status,
				responseHeaders,
				responseBody,
				data: parsedError,
				isRetryable: isRetryable == null ? void 0 : isRetryable(response, parsedError)
			})
		};
	} catch (parseError) {
		return {
			responseHeaders,
			value: new APICallError({
				message: response.statusText,
				url,
				requestBodyValues,
				statusCode: response.status,
				responseHeaders,
				responseBody,
				isRetryable: isRetryable == null ? void 0 : isRetryable(response)
			})
		};
	}
};
var createEventSourceResponseHandler = (chunkSchema$1) => async ({ response }) => {
	const responseHeaders = extractResponseHeaders(response);
	if (response.body == null) throw new EmptyResponseBodyError({});
	return {
		responseHeaders,
		value: parseJsonEventStream({
			stream: response.body,
			schema: chunkSchema$1
		})
	};
};
var createJsonResponseHandler$1 = (responseSchema$1) => async ({ response, url, requestBodyValues }) => {
	const responseBody = await response.text();
	const parsedResult = await safeParseJSON({
		text: responseBody,
		schema: responseSchema$1
	});
	const responseHeaders = extractResponseHeaders(response);
	if (!parsedResult.success) throw new APICallError({
		message: "Invalid JSON response",
		cause: parsedResult.error,
		statusCode: response.status,
		responseHeaders,
		responseBody,
		url,
		requestBodyValues
	});
	return {
		responseHeaders,
		value: parsedResult.value,
		rawValue: parsedResult.rawValue
	};
};
function addAdditionalPropertiesToJsonSchema(jsonSchema2) {
	if (jsonSchema2.type === "object") {
		jsonSchema2.additionalProperties = false;
		const properties = jsonSchema2.properties;
		if (properties != null) for (const property in properties) properties[property] = addAdditionalPropertiesToJsonSchema(properties[property]);
	}
	if (jsonSchema2.type === "array" && jsonSchema2.items != null) if (Array.isArray(jsonSchema2.items)) jsonSchema2.items = jsonSchema2.items.map((item) => addAdditionalPropertiesToJsonSchema(item));
	else jsonSchema2.items = addAdditionalPropertiesToJsonSchema(jsonSchema2.items);
	return jsonSchema2;
}
var getRelativePath = (pathA, pathB) => {
	let i = 0;
	for (; i < pathA.length && i < pathB.length; i++) if (pathA[i] !== pathB[i]) break;
	return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
	name: void 0,
	$refStrategy: "root",
	basePath: ["#"],
	effectStrategy: "input",
	pipeStrategy: "all",
	dateStrategy: "format:date-time",
	mapStrategy: "entries",
	removeAdditionalStrategy: "passthrough",
	allowedAdditionalProperties: true,
	rejectedAdditionalProperties: false,
	definitionPath: "definitions",
	strictUnions: false,
	definitions: {},
	errorMessages: false,
	patternStrategy: "escape",
	applyRegexFlags: false,
	emailStrategy: "format:email",
	base64Strategy: "contentEncoding:base64",
	nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
	...defaultOptions,
	name: options
} : {
	...defaultOptions,
	...options
};
function parseAnyDef() {
	return {};
}
function parseArrayDef(def, refs) {
	var _a, _b, _c;
	const res = { type: "array" };
	if (((_a = def.type) == null ? void 0 : _a._def) && ((_c = (_b = def.type) == null ? void 0 : _b._def) == null ? void 0 : _c.typeName) !== ZodFirstPartyTypeKind.ZodAny) res.items = parseDef(def.type._def, {
		...refs,
		currentPath: [...refs.currentPath, "items"]
	});
	if (def.minLength) res.minItems = def.minLength.value;
	if (def.maxLength) res.maxItems = def.maxLength.value;
	if (def.exactLength) {
		res.minItems = def.exactLength.value;
		res.maxItems = def.exactLength.value;
	}
	return res;
}
function parseBigintDef(def) {
	const res = {
		type: "integer",
		format: "int64"
	};
	if (!def.checks) return res;
	for (const check of def.checks) switch (check.kind) {
		case "min":
			if (check.inclusive) res.minimum = check.value;
			else res.exclusiveMinimum = check.value;
			break;
		case "max":
			if (check.inclusive) res.maximum = check.value;
			else res.exclusiveMaximum = check.value;
			break;
		case "multipleOf":
			res.multipleOf = check.value;
			break;
	}
	return res;
}
function parseBooleanDef() {
	return { type: "boolean" };
}
function parseBrandedDef(_def, refs) {
	return parseDef(_def.type._def, refs);
}
var parseCatchDef = (def, refs) => {
	return parseDef(def.innerType._def, refs);
};
function parseDateDef(def, refs, overrideDateStrategy) {
	const strategy = overrideDateStrategy != null ? overrideDateStrategy : refs.dateStrategy;
	if (Array.isArray(strategy)) return { anyOf: strategy.map((item, i) => parseDateDef(def, refs, item)) };
	switch (strategy) {
		case "string":
		case "format:date-time": return {
			type: "string",
			format: "date-time"
		};
		case "format:date": return {
			type: "string",
			format: "date"
		};
		case "integer": return integerDateParser(def);
	}
}
var integerDateParser = (def) => {
	const res = {
		type: "integer",
		format: "unix-time"
	};
	for (const check of def.checks) switch (check.kind) {
		case "min":
			res.minimum = check.value;
			break;
		case "max":
			res.maximum = check.value;
			break;
	}
	return res;
};
function parseDefaultDef(_def, refs) {
	return {
		...parseDef(_def.innerType._def, refs),
		default: _def.defaultValue()
	};
}
function parseEffectsDef(_def, refs) {
	return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : parseAnyDef();
}
function parseEnumDef(def) {
	return {
		type: "string",
		enum: Array.from(def.values)
	};
}
var isJsonSchema7AllOfType = (type) => {
	if ("type" in type && type.type === "string") return false;
	return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
	const allOf = [parseDef(def.left._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"allOf",
			"0"
		]
	}), parseDef(def.right._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"allOf",
			"1"
		]
	})].filter((x) => !!x);
	const mergedAllOf = [];
	allOf.forEach((schema) => {
		if (isJsonSchema7AllOfType(schema)) mergedAllOf.push(...schema.allOf);
		else {
			let nestedSchema = schema;
			if ("additionalProperties" in schema && schema.additionalProperties === false) {
				const { additionalProperties,...rest } = schema;
				nestedSchema = rest;
			}
			mergedAllOf.push(nestedSchema);
		}
	});
	return mergedAllOf.length ? { allOf: mergedAllOf } : void 0;
}
function parseLiteralDef(def) {
	const parsedType = typeof def.value;
	if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") return { type: Array.isArray(def.value) ? "array" : "object" };
	return {
		type: parsedType === "bigint" ? "integer" : parsedType,
		const: def.value
	};
}
var emojiRegex = void 0;
var zodPatterns = {
	cuid: /^[cC][^\s-]{8,}$/,
	cuid2: /^[0-9a-z]+$/,
	ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
	email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
	emoji: () => {
		if (emojiRegex === void 0) emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
		return emojiRegex;
	},
	uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
	ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
	ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	nanoid: /^[a-zA-Z0-9_-]{21}$/,
	jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
	const res = { type: "string" };
	if (def.checks) for (const check of def.checks) switch (check.kind) {
		case "min":
			res.minLength = typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value;
			break;
		case "max":
			res.maxLength = typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value;
			break;
		case "email":
			switch (refs.emailStrategy) {
				case "format:email":
					addFormat(res, "email", check.message, refs);
					break;
				case "format:idn-email":
					addFormat(res, "idn-email", check.message, refs);
					break;
				case "pattern:zod":
					addPattern(res, zodPatterns.email, check.message, refs);
					break;
			}
			break;
		case "url":
			addFormat(res, "uri", check.message, refs);
			break;
		case "uuid":
			addFormat(res, "uuid", check.message, refs);
			break;
		case "regex":
			addPattern(res, check.regex, check.message, refs);
			break;
		case "cuid":
			addPattern(res, zodPatterns.cuid, check.message, refs);
			break;
		case "cuid2":
			addPattern(res, zodPatterns.cuid2, check.message, refs);
			break;
		case "startsWith":
			addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
			break;
		case "endsWith":
			addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
			break;
		case "datetime":
			addFormat(res, "date-time", check.message, refs);
			break;
		case "date":
			addFormat(res, "date", check.message, refs);
			break;
		case "time":
			addFormat(res, "time", check.message, refs);
			break;
		case "duration":
			addFormat(res, "duration", check.message, refs);
			break;
		case "length":
			res.minLength = typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value;
			res.maxLength = typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value;
			break;
		case "includes":
			addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
			break;
		case "ip":
			if (check.version !== "v6") addFormat(res, "ipv4", check.message, refs);
			if (check.version !== "v4") addFormat(res, "ipv6", check.message, refs);
			break;
		case "base64url":
			addPattern(res, zodPatterns.base64url, check.message, refs);
			break;
		case "jwt":
			addPattern(res, zodPatterns.jwt, check.message, refs);
			break;
		case "cidr":
			if (check.version !== "v6") addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
			if (check.version !== "v4") addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
			break;
		case "emoji":
			addPattern(res, zodPatterns.emoji(), check.message, refs);
			break;
		case "ulid":
			addPattern(res, zodPatterns.ulid, check.message, refs);
			break;
		case "base64":
			switch (refs.base64Strategy) {
				case "format:binary":
					addFormat(res, "binary", check.message, refs);
					break;
				case "contentEncoding:base64":
					res.contentEncoding = "base64";
					break;
				case "pattern:zod":
					addPattern(res, zodPatterns.base64, check.message, refs);
					break;
			}
			break;
		case "nanoid": addPattern(res, zodPatterns.nanoid, check.message, refs);
		case "toLowerCase":
		case "toUpperCase":
		case "trim": break;
		default:
	}
	return res;
}
function escapeLiteralCheckValue(literal, refs) {
	return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
var ALPHA_NUMERIC = /* @__PURE__ */ new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
	let result = "";
	for (let i = 0; i < source.length; i++) {
		if (!ALPHA_NUMERIC.has(source[i])) result += "\\";
		result += source[i];
	}
	return result;
}
function addFormat(schema, value, message, refs) {
	var _a;
	if (schema.format || ((_a = schema.anyOf) == null ? void 0 : _a.some((x) => x.format))) {
		if (!schema.anyOf) schema.anyOf = [];
		if (schema.format) {
			schema.anyOf.push({ format: schema.format });
			delete schema.format;
		}
		schema.anyOf.push({
			format: value,
			...message && refs.errorMessages && { errorMessage: { format: message } }
		});
	} else schema.format = value;
}
function addPattern(schema, regex, message, refs) {
	var _a;
	if (schema.pattern || ((_a = schema.allOf) == null ? void 0 : _a.some((x) => x.pattern))) {
		if (!schema.allOf) schema.allOf = [];
		if (schema.pattern) {
			schema.allOf.push({ pattern: schema.pattern });
			delete schema.pattern;
		}
		schema.allOf.push({
			pattern: stringifyRegExpWithFlags(regex, refs),
			...message && refs.errorMessages && { errorMessage: { pattern: message } }
		});
	} else schema.pattern = stringifyRegExpWithFlags(regex, refs);
}
function stringifyRegExpWithFlags(regex, refs) {
	var _a;
	if (!refs.applyRegexFlags || !regex.flags) return regex.source;
	const flags = {
		i: regex.flags.includes("i"),
		m: regex.flags.includes("m"),
		s: regex.flags.includes("s")
	};
	const source = flags.i ? regex.source.toLowerCase() : regex.source;
	let pattern = "";
	let isEscaped = false;
	let inCharGroup = false;
	let inCharRange = false;
	for (let i = 0; i < source.length; i++) {
		if (isEscaped) {
			pattern += source[i];
			isEscaped = false;
			continue;
		}
		if (flags.i) {
			if (inCharGroup) {
				if (source[i].match(/[a-z]/)) {
					if (inCharRange) {
						pattern += source[i];
						pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
						inCharRange = false;
					} else if (source[i + 1] === "-" && ((_a = source[i + 2]) == null ? void 0 : _a.match(/[a-z]/))) {
						pattern += source[i];
						inCharRange = true;
					} else pattern += `${source[i]}${source[i].toUpperCase()}`;
					continue;
				}
			} else if (source[i].match(/[a-z]/)) {
				pattern += `[${source[i]}${source[i].toUpperCase()}]`;
				continue;
			}
		}
		if (flags.m) {
			if (source[i] === "^") {
				pattern += `(^|(?<=[\r
]))`;
				continue;
			} else if (source[i] === "$") {
				pattern += `($|(?=[\r
]))`;
				continue;
			}
		}
		if (flags.s && source[i] === ".") {
			pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
			continue;
		}
		pattern += source[i];
		if (source[i] === "\\") isEscaped = true;
		else if (inCharGroup && source[i] === "]") inCharGroup = false;
		else if (!inCharGroup && source[i] === "[") inCharGroup = true;
	}
	try {
		new RegExp(pattern);
	} catch (e) {
		console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
		return regex.source;
	}
	return pattern;
}
function parseRecordDef(def, refs) {
	var _a, _b, _c, _d, _e, _f;
	const schema = {
		type: "object",
		additionalProperties: (_a = parseDef(def.valueType._def, {
			...refs,
			currentPath: [...refs.currentPath, "additionalProperties"]
		})) != null ? _a : refs.allowedAdditionalProperties
	};
	if (((_b = def.keyType) == null ? void 0 : _b._def.typeName) === ZodFirstPartyTypeKind.ZodString && ((_c = def.keyType._def.checks) == null ? void 0 : _c.length)) {
		const { type,...keyType } = parseStringDef(def.keyType._def, refs);
		return {
			...schema,
			propertyNames: keyType
		};
	} else if (((_d = def.keyType) == null ? void 0 : _d._def.typeName) === ZodFirstPartyTypeKind.ZodEnum) return {
		...schema,
		propertyNames: { enum: def.keyType._def.values }
	};
	else if (((_e = def.keyType) == null ? void 0 : _e._def.typeName) === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && ((_f = def.keyType._def.type._def.checks) == null ? void 0 : _f.length)) {
		const { type,...keyType } = parseBrandedDef(def.keyType._def, refs);
		return {
			...schema,
			propertyNames: keyType
		};
	}
	return schema;
}
function parseMapDef(def, refs) {
	if (refs.mapStrategy === "record") return parseRecordDef(def, refs);
	const keys = parseDef(def.keyType._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"items",
			"items",
			"0"
		]
	}) || parseAnyDef();
	const values = parseDef(def.valueType._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"items",
			"items",
			"1"
		]
	}) || parseAnyDef();
	return {
		type: "array",
		maxItems: 125,
		items: {
			type: "array",
			items: [keys, values],
			minItems: 2,
			maxItems: 2
		}
	};
}
function parseNativeEnumDef(def) {
	const object$1 = def.values;
	const actualKeys = Object.keys(def.values).filter((key) => {
		return typeof object$1[object$1[key]] !== "number";
	});
	const actualValues = actualKeys.map((key) => object$1[key]);
	const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
	return {
		type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
		enum: actualValues
	};
}
function parseNeverDef() {
	return { not: parseAnyDef() };
}
function parseNullDef() {
	return { type: "null" };
}
var primitiveMappings = {
	ZodString: "string",
	ZodNumber: "number",
	ZodBigInt: "integer",
	ZodBoolean: "boolean",
	ZodNull: "null"
};
function parseUnionDef(def, refs) {
	const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
	if (options.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
		const types = options.reduce((types2, x) => {
			const type = primitiveMappings[x._def.typeName];
			return type && !types2.includes(type) ? [...types2, type] : types2;
		}, []);
		return { type: types.length > 1 ? types : types[0] };
	} else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
		const types = options.reduce((acc, x) => {
			const type = typeof x._def.value;
			switch (type) {
				case "string":
				case "number":
				case "boolean": return [...acc, type];
				case "bigint": return [...acc, "integer"];
				case "object": if (x._def.value === null) return [...acc, "null"];
				case "symbol":
				case "undefined":
				case "function":
				default: return acc;
			}
		}, []);
		if (types.length === options.length) {
			const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
			return {
				type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
				enum: options.reduce((acc, x) => {
					return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
				}, [])
			};
		}
	} else if (options.every((x) => x._def.typeName === "ZodEnum")) return {
		type: "string",
		enum: options.reduce((acc, x) => [...acc, ...x._def.values.filter((x2) => !acc.includes(x2))], [])
	};
	return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
	const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"anyOf",
			`${i}`
		]
	})).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
	return anyOf.length ? { anyOf } : void 0;
};
function parseNullableDef(def, refs) {
	if ([
		"ZodString",
		"ZodNumber",
		"ZodBigInt",
		"ZodBoolean",
		"ZodNull"
	].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) return { type: [primitiveMappings[def.innerType._def.typeName], "null"] };
	const base = parseDef(def.innerType._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"anyOf",
			"0"
		]
	});
	return base && { anyOf: [base, { type: "null" }] };
}
function parseNumberDef(def) {
	const res = { type: "number" };
	if (!def.checks) return res;
	for (const check of def.checks) switch (check.kind) {
		case "int":
			res.type = "integer";
			break;
		case "min":
			if (check.inclusive) res.minimum = check.value;
			else res.exclusiveMinimum = check.value;
			break;
		case "max":
			if (check.inclusive) res.maximum = check.value;
			else res.exclusiveMaximum = check.value;
			break;
		case "multipleOf":
			res.multipleOf = check.value;
			break;
	}
	return res;
}
function parseObjectDef(def, refs) {
	const result = {
		type: "object",
		properties: {}
	};
	const required = [];
	const shape = def.shape();
	for (const propName in shape) {
		let propDef = shape[propName];
		if (propDef === void 0 || propDef._def === void 0) continue;
		const propOptional = safeIsOptional(propDef);
		const parsedDef = parseDef(propDef._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"properties",
				propName
			],
			propertyPath: [
				...refs.currentPath,
				"properties",
				propName
			]
		});
		if (parsedDef === void 0) continue;
		result.properties[propName] = parsedDef;
		if (!propOptional) required.push(propName);
	}
	if (required.length) result.required = required;
	const additionalProperties = decideAdditionalProperties(def, refs);
	if (additionalProperties !== void 0) result.additionalProperties = additionalProperties;
	return result;
}
function decideAdditionalProperties(def, refs) {
	if (def.catchall._def.typeName !== "ZodNever") return parseDef(def.catchall._def, {
		...refs,
		currentPath: [...refs.currentPath, "additionalProperties"]
	});
	switch (def.unknownKeys) {
		case "passthrough": return refs.allowedAdditionalProperties;
		case "strict": return refs.rejectedAdditionalProperties;
		case "strip": return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
	}
}
function safeIsOptional(schema) {
	try {
		return schema.isOptional();
	} catch (e) {
		return true;
	}
}
var parseOptionalDef = (def, refs) => {
	var _a;
	if (refs.currentPath.toString() === ((_a = refs.propertyPath) == null ? void 0 : _a.toString())) return parseDef(def.innerType._def, refs);
	const innerSchema = parseDef(def.innerType._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"anyOf",
			"1"
		]
	});
	return innerSchema ? { anyOf: [{ not: parseAnyDef() }, innerSchema] } : parseAnyDef();
};
var parsePipelineDef = (def, refs) => {
	if (refs.pipeStrategy === "input") return parseDef(def.in._def, refs);
	else if (refs.pipeStrategy === "output") return parseDef(def.out._def, refs);
	const a = parseDef(def.in._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"allOf",
			"0"
		]
	});
	const b = parseDef(def.out._def, {
		...refs,
		currentPath: [
			...refs.currentPath,
			"allOf",
			a ? "1" : "0"
		]
	});
	return { allOf: [a, b].filter((x) => x !== void 0) };
};
function parsePromiseDef(def, refs) {
	return parseDef(def.type._def, refs);
}
function parseSetDef(def, refs) {
	const items = parseDef(def.valueType._def, {
		...refs,
		currentPath: [...refs.currentPath, "items"]
	});
	const schema = {
		type: "array",
		uniqueItems: true,
		items
	};
	if (def.minSize) schema.minItems = def.minSize.value;
	if (def.maxSize) schema.maxItems = def.maxSize.value;
	return schema;
}
function parseTupleDef(def, refs) {
	if (def.rest) return {
		type: "array",
		minItems: def.items.length,
		items: def.items.map((x, i) => parseDef(x._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"items",
				`${i}`
			]
		})).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
		additionalItems: parseDef(def.rest._def, {
			...refs,
			currentPath: [...refs.currentPath, "additionalItems"]
		})
	};
	else return {
		type: "array",
		minItems: def.items.length,
		maxItems: def.items.length,
		items: def.items.map((x, i) => parseDef(x._def, {
			...refs,
			currentPath: [
				...refs.currentPath,
				"items",
				`${i}`
			]
		})).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
	};
}
function parseUndefinedDef() {
	return { not: parseAnyDef() };
}
function parseUnknownDef() {
	return parseAnyDef();
}
var parseReadonlyDef = (def, refs) => {
	return parseDef(def.innerType._def, refs);
};
var selectParser = (def, typeName, refs) => {
	switch (typeName) {
		case ZodFirstPartyTypeKind.ZodString: return parseStringDef(def, refs);
		case ZodFirstPartyTypeKind.ZodNumber: return parseNumberDef(def);
		case ZodFirstPartyTypeKind.ZodObject: return parseObjectDef(def, refs);
		case ZodFirstPartyTypeKind.ZodBigInt: return parseBigintDef(def);
		case ZodFirstPartyTypeKind.ZodBoolean: return parseBooleanDef();
		case ZodFirstPartyTypeKind.ZodDate: return parseDateDef(def, refs);
		case ZodFirstPartyTypeKind.ZodUndefined: return parseUndefinedDef();
		case ZodFirstPartyTypeKind.ZodNull: return parseNullDef();
		case ZodFirstPartyTypeKind.ZodArray: return parseArrayDef(def, refs);
		case ZodFirstPartyTypeKind.ZodUnion:
		case ZodFirstPartyTypeKind.ZodDiscriminatedUnion: return parseUnionDef(def, refs);
		case ZodFirstPartyTypeKind.ZodIntersection: return parseIntersectionDef(def, refs);
		case ZodFirstPartyTypeKind.ZodTuple: return parseTupleDef(def, refs);
		case ZodFirstPartyTypeKind.ZodRecord: return parseRecordDef(def, refs);
		case ZodFirstPartyTypeKind.ZodLiteral: return parseLiteralDef(def);
		case ZodFirstPartyTypeKind.ZodEnum: return parseEnumDef(def);
		case ZodFirstPartyTypeKind.ZodNativeEnum: return parseNativeEnumDef(def);
		case ZodFirstPartyTypeKind.ZodNullable: return parseNullableDef(def, refs);
		case ZodFirstPartyTypeKind.ZodOptional: return parseOptionalDef(def, refs);
		case ZodFirstPartyTypeKind.ZodMap: return parseMapDef(def, refs);
		case ZodFirstPartyTypeKind.ZodSet: return parseSetDef(def, refs);
		case ZodFirstPartyTypeKind.ZodLazy: return () => def.getter()._def;
		case ZodFirstPartyTypeKind.ZodPromise: return parsePromiseDef(def, refs);
		case ZodFirstPartyTypeKind.ZodNaN:
		case ZodFirstPartyTypeKind.ZodNever: return parseNeverDef();
		case ZodFirstPartyTypeKind.ZodEffects: return parseEffectsDef(def, refs);
		case ZodFirstPartyTypeKind.ZodAny: return parseAnyDef();
		case ZodFirstPartyTypeKind.ZodUnknown: return parseUnknownDef();
		case ZodFirstPartyTypeKind.ZodDefault: return parseDefaultDef(def, refs);
		case ZodFirstPartyTypeKind.ZodBranded: return parseBrandedDef(def, refs);
		case ZodFirstPartyTypeKind.ZodReadonly: return parseReadonlyDef(def, refs);
		case ZodFirstPartyTypeKind.ZodCatch: return parseCatchDef(def, refs);
		case ZodFirstPartyTypeKind.ZodPipeline: return parsePipelineDef(def, refs);
		case ZodFirstPartyTypeKind.ZodFunction:
		case ZodFirstPartyTypeKind.ZodVoid:
		case ZodFirstPartyTypeKind.ZodSymbol: return void 0;
		default: return /* @__PURE__ */ ((_) => void 0)(typeName);
	}
};
function parseDef(def, refs, forceResolution = false) {
	var _a;
	const seenItem = refs.seen.get(def);
	if (refs.override) {
		const overrideResult = (_a = refs.override) == null ? void 0 : _a.call(refs, def, refs, seenItem, forceResolution);
		if (overrideResult !== ignoreOverride) return overrideResult;
	}
	if (seenItem && !forceResolution) {
		const seenSchema = get$ref(seenItem, refs);
		if (seenSchema !== void 0) return seenSchema;
	}
	const newItem = {
		def,
		path: refs.currentPath,
		jsonSchema: void 0
	};
	refs.seen.set(def, newItem);
	const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
	const jsonSchema2 = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
	if (jsonSchema2) addMeta(def, refs, jsonSchema2);
	if (refs.postProcess) {
		const postProcessResult = refs.postProcess(jsonSchema2, def, refs);
		newItem.jsonSchema = jsonSchema2;
		return postProcessResult;
	}
	newItem.jsonSchema = jsonSchema2;
	return jsonSchema2;
}
var get$ref = (item, refs) => {
	switch (refs.$refStrategy) {
		case "root": return { $ref: item.path.join("/") };
		case "relative": return { $ref: getRelativePath(refs.currentPath, item.path) };
		case "none":
		case "seen":
			if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
				console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
				return parseAnyDef();
			}
			return refs.$refStrategy === "seen" ? parseAnyDef() : void 0;
	}
};
var addMeta = (def, refs, jsonSchema2) => {
	if (def.description) jsonSchema2.description = def.description;
	return jsonSchema2;
};
var getRefs = (options) => {
	const _options = getDefaultOptions(options);
	const currentPath = _options.name !== void 0 ? [
		..._options.basePath,
		_options.definitionPath,
		_options.name
	] : _options.basePath;
	return {
		..._options,
		currentPath,
		propertyPath: void 0,
		seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [def._def, {
			def: def._def,
			path: [
				..._options.basePath,
				_options.definitionPath,
				name
			],
			jsonSchema: void 0
		}]))
	};
};
var zodToJsonSchema = (schema, options) => {
	var _a;
	const refs = getRefs(options);
	let definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => {
		var _a2;
		return {
			...acc,
			[name2]: (_a2 = parseDef(schema2._def, {
				...refs,
				currentPath: [
					...refs.basePath,
					refs.definitionPath,
					name2
				]
			}, true)) != null ? _a2 : parseAnyDef()
		};
	}, {}) : void 0;
	const name = typeof options === "string" ? options : (options == null ? void 0 : options.nameStrategy) === "title" ? void 0 : options == null ? void 0 : options.name;
	const main = (_a = parseDef(schema._def, name === void 0 ? refs : {
		...refs,
		currentPath: [
			...refs.basePath,
			refs.definitionPath,
			name
		]
	}, false)) != null ? _a : parseAnyDef();
	const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
	if (title !== void 0) main.title = title;
	const combined = name === void 0 ? definitions ? {
		...main,
		[refs.definitionPath]: definitions
	} : main : {
		$ref: [
			...refs.$refStrategy === "relative" ? [] : refs.basePath,
			refs.definitionPath,
			name
		].join("/"),
		[refs.definitionPath]: {
			...definitions,
			[name]: main
		}
	};
	combined.$schema = "http://json-schema.org/draft-07/schema#";
	return combined;
};
var zod_to_json_schema_default = zodToJsonSchema;
function zod3Schema(zodSchema2, options) {
	var _a;
	const useReferences = (_a = options == null ? void 0 : options.useReferences) != null ? _a : false;
	return jsonSchema(() => zod_to_json_schema_default(zodSchema2, { $refStrategy: useReferences ? "root" : "none" }), { validate: async (value) => {
		const result = await zodSchema2.safeParseAsync(value);
		return result.success ? {
			success: true,
			value: result.data
		} : {
			success: false,
			error: result.error
		};
	} });
}
function zod4Schema(zodSchema2, options) {
	var _a;
	const useReferences = (_a = options == null ? void 0 : options.useReferences) != null ? _a : false;
	return jsonSchema(() => addAdditionalPropertiesToJsonSchema(toJSONSchema(zodSchema2, {
		target: "draft-7",
		io: "input",
		reused: useReferences ? "ref" : "inline"
	})), { validate: async (value) => {
		const result = await safeParseAsync(zodSchema2, value);
		return result.success ? {
			success: true,
			value: result.data
		} : {
			success: false,
			error: result.error
		};
	} });
}
function isZod4Schema(zodSchema2) {
	return "_zod" in zodSchema2;
}
function zodSchema(zodSchema2, options) {
	if (isZod4Schema(zodSchema2)) return zod4Schema(zodSchema2, options);
	else return zod3Schema(zodSchema2, options);
}
var schemaSymbol = Symbol.for("vercel.ai.schema");
function lazySchema(createSchema) {
	let schema;
	return () => {
		if (schema == null) schema = createSchema();
		return schema;
	};
}
function jsonSchema(jsonSchema2, { validate } = {}) {
	return {
		[schemaSymbol]: true,
		_type: void 0,
		[validatorSymbol]: true,
		get jsonSchema() {
			if (typeof jsonSchema2 === "function") jsonSchema2 = jsonSchema2();
			return jsonSchema2;
		},
		validate
	};
}
var { btoa: btoa$1, atob: atob$1 } = globalThis;
function convertUint8ArrayToBase64(array$1) {
	let latin1string = "";
	for (let i = 0; i < array$1.length; i++) latin1string += String.fromCodePoint(array$1[i]);
	return btoa$1(latin1string);
}
function convertToBase64(value) {
	return value instanceof Uint8Array ? convertUint8ArrayToBase64(value) : value;
}
function withoutTrailingSlash$1(url) {
	return url == null ? void 0 : url.replace(/\/$/, "");
}
function convertJSONSchemaToOpenAPISchema(jsonSchema$1) {
	if (jsonSchema$1 == null || isEmptyObjectSchema(jsonSchema$1)) return void 0;
	if (typeof jsonSchema$1 === "boolean") return {
		type: "boolean",
		properties: {}
	};
	const { type, description, required, properties, items, allOf, anyOf, oneOf, format, const: constValue, minLength, enum: enumValues } = jsonSchema$1;
	const result = {};
	if (description) result.description = description;
	if (required) result.required = required;
	if (format) result.format = format;
	if (constValue !== void 0) result.enum = [constValue];
	if (type) if (Array.isArray(type)) {
		const hasNull = type.includes("null");
		const nonNullTypes = type.filter((t) => t !== "null");
		if (nonNullTypes.length === 0) result.type = "null";
		else {
			result.anyOf = nonNullTypes.map((t) => ({ type: t }));
			if (hasNull) result.nullable = true;
		}
	} else result.type = type;
	if (enumValues !== void 0) result.enum = enumValues;
	if (properties != null) result.properties = Object.entries(properties).reduce((acc, [key, value]) => {
		acc[key] = convertJSONSchemaToOpenAPISchema(value);
		return acc;
	}, {});
	if (items) result.items = Array.isArray(items) ? items.map(convertJSONSchemaToOpenAPISchema) : convertJSONSchemaToOpenAPISchema(items);
	if (allOf) result.allOf = allOf.map(convertJSONSchemaToOpenAPISchema);
	if (anyOf) if (anyOf.some((schema) => typeof schema === "object" && (schema == null ? void 0 : schema.type) === "null")) {
		const nonNullSchemas = anyOf.filter((schema) => !(typeof schema === "object" && (schema == null ? void 0 : schema.type) === "null"));
		if (nonNullSchemas.length === 1) {
			const converted = convertJSONSchemaToOpenAPISchema(nonNullSchemas[0]);
			if (typeof converted === "object") {
				result.nullable = true;
				Object.assign(result, converted);
			}
		} else {
			result.anyOf = nonNullSchemas.map(convertJSONSchemaToOpenAPISchema);
			result.nullable = true;
		}
	} else result.anyOf = anyOf.map(convertJSONSchemaToOpenAPISchema);
	if (oneOf) result.oneOf = oneOf.map(convertJSONSchemaToOpenAPISchema);
	if (minLength !== void 0) result.minLength = minLength;
	return result;
}
function isEmptyObjectSchema(jsonSchema$1) {
	return jsonSchema$1 != null && typeof jsonSchema$1 === "object" && jsonSchema$1.type === "object" && (jsonSchema$1.properties == null || Object.keys(jsonSchema$1.properties).length === 0) && !jsonSchema$1.additionalProperties;
}
function convertToGoogleGenerativeAIMessages(prompt, options) {
	var _a;
	const systemInstructionParts = [];
	const contents = [];
	let systemMessagesAllowed = true;
	const isGemmaModel = (_a = options == null ? void 0 : options.isGemmaModel) != null ? _a : false;
	for (const { role, content } of prompt) switch (role) {
		case "system":
			if (!systemMessagesAllowed) throw new UnsupportedFunctionalityError({ functionality: "system messages are only supported at the beginning of the conversation" });
			systemInstructionParts.push({ text: content });
			break;
		case "user": {
			systemMessagesAllowed = false;
			const parts = [];
			for (const part of content) switch (part.type) {
				case "text":
					parts.push({ text: part.text });
					break;
				case "file": {
					const mediaType = part.mediaType === "image/*" ? "image/jpeg" : part.mediaType;
					parts.push(part.data instanceof URL ? { fileData: {
						mimeType: mediaType,
						fileUri: part.data.toString()
					} } : { inlineData: {
						mimeType: mediaType,
						data: convertToBase64(part.data)
					} });
					break;
				}
			}
			contents.push({
				role: "user",
				parts
			});
			break;
		}
		case "assistant":
			systemMessagesAllowed = false;
			contents.push({
				role: "model",
				parts: content.map((part) => {
					var _a2, _b, _c;
					const thoughtSignature = ((_b = (_a2 = part.providerOptions) == null ? void 0 : _a2.google) == null ? void 0 : _b.thoughtSignature) != null ? String((_c = part.providerOptions.google) == null ? void 0 : _c.thoughtSignature) : void 0;
					switch (part.type) {
						case "text": return part.text.length === 0 ? void 0 : {
							text: part.text,
							thoughtSignature
						};
						case "reasoning": return part.text.length === 0 ? void 0 : {
							text: part.text,
							thought: true,
							thoughtSignature
						};
						case "file":
							if (part.mediaType !== "image/png") throw new UnsupportedFunctionalityError({ functionality: "Only PNG images are supported in assistant messages" });
							if (part.data instanceof URL) throw new UnsupportedFunctionalityError({ functionality: "File data URLs in assistant messages are not supported" });
							return { inlineData: {
								mimeType: part.mediaType,
								data: convertToBase64(part.data)
							} };
						case "tool-call": return {
							functionCall: {
								name: part.toolName,
								args: part.input
							},
							thoughtSignature
						};
					}
				}).filter((part) => part !== void 0)
			});
			break;
		case "tool": {
			systemMessagesAllowed = false;
			const parts = [];
			for (const part of content) {
				const output = part.output;
				if (output.type === "content") for (const contentPart of output.value) switch (contentPart.type) {
					case "text":
						parts.push({ functionResponse: {
							name: part.toolName,
							response: {
								name: part.toolName,
								content: contentPart.text
							}
						} });
						break;
					case "media":
						parts.push({ inlineData: {
							mimeType: contentPart.mediaType,
							data: contentPart.data
						} }, { text: "Tool executed successfully and returned this image as a response" });
						break;
					default:
						parts.push({ text: JSON.stringify(contentPart) });
						break;
				}
				else parts.push({ functionResponse: {
					name: part.toolName,
					response: {
						name: part.toolName,
						content: output.value
					}
				} });
			}
			contents.push({
				role: "user",
				parts
			});
			break;
		}
	}
	if (isGemmaModel && systemInstructionParts.length > 0 && contents.length > 0 && contents[0].role === "user") {
		const systemText = systemInstructionParts.map((part) => part.text).join("\n\n");
		contents[0].parts.unshift({ text: systemText + "\n\n" });
	}
	return {
		systemInstruction: systemInstructionParts.length > 0 && !isGemmaModel ? { parts: systemInstructionParts } : void 0,
		contents
	};
}
function getModelPath(modelId) {
	return modelId.includes("/") ? modelId : `models/${modelId}`;
}
var googleErrorDataSchema = lazySchema(() => zodSchema(object({ error: object({
	code: number().nullable(),
	message: string(),
	status: string()
}) })));
var googleFailedResponseHandler = createJsonErrorResponseHandler$1({
	errorSchema: googleErrorDataSchema,
	errorToMessage: (data) => data.error.message
});
var googleGenerativeAIProviderOptions = lazySchema(() => zodSchema(object({
	responseModalities: array(_enum(["TEXT", "IMAGE"])).optional(),
	thinkingConfig: object({
		thinkingBudget: number().optional(),
		includeThoughts: boolean().optional(),
		thinkingLevel: _enum([
			"minimal",
			"low",
			"medium",
			"high"
		]).optional()
	}).optional(),
	cachedContent: string().optional(),
	structuredOutputs: boolean().optional(),
	safetySettings: array(object({
		category: _enum([
			"HARM_CATEGORY_UNSPECIFIED",
			"HARM_CATEGORY_HATE_SPEECH",
			"HARM_CATEGORY_DANGEROUS_CONTENT",
			"HARM_CATEGORY_HARASSMENT",
			"HARM_CATEGORY_SEXUALLY_EXPLICIT",
			"HARM_CATEGORY_CIVIC_INTEGRITY"
		]),
		threshold: _enum([
			"HARM_BLOCK_THRESHOLD_UNSPECIFIED",
			"BLOCK_LOW_AND_ABOVE",
			"BLOCK_MEDIUM_AND_ABOVE",
			"BLOCK_ONLY_HIGH",
			"BLOCK_NONE",
			"OFF"
		])
	})).optional(),
	threshold: _enum([
		"HARM_BLOCK_THRESHOLD_UNSPECIFIED",
		"BLOCK_LOW_AND_ABOVE",
		"BLOCK_MEDIUM_AND_ABOVE",
		"BLOCK_ONLY_HIGH",
		"BLOCK_NONE",
		"OFF"
	]).optional(),
	audioTimestamp: boolean().optional(),
	labels: record(string(), string()).optional(),
	mediaResolution: _enum([
		"MEDIA_RESOLUTION_UNSPECIFIED",
		"MEDIA_RESOLUTION_LOW",
		"MEDIA_RESOLUTION_MEDIUM",
		"MEDIA_RESOLUTION_HIGH"
	]).optional(),
	imageConfig: object({
		aspectRatio: _enum([
			"1:1",
			"2:3",
			"3:2",
			"3:4",
			"4:3",
			"4:5",
			"5:4",
			"9:16",
			"16:9",
			"21:9"
		]).optional(),
		imageSize: _enum([
			"1K",
			"2K",
			"4K"
		]).optional()
	}).optional(),
	retrievalConfig: object({ latLng: object({
		latitude: number(),
		longitude: number()
	}).optional() }).optional()
})));
function prepareTools({ tools, toolChoice, modelId }) {
	var _a;
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	const isLatest = [
		"gemini-flash-latest",
		"gemini-flash-lite-latest",
		"gemini-pro-latest"
	].some((id) => id === modelId);
	const isGemini2orNewer = modelId.includes("gemini-2") || modelId.includes("gemini-3") || isLatest;
	const supportsDynamicRetrieval = modelId.includes("gemini-1.5-flash") && !modelId.includes("-8b");
	const supportsFileSearch = modelId.includes("gemini-2.5");
	if (tools == null) return {
		tools: void 0,
		toolConfig: void 0,
		toolWarnings
	};
	const hasFunctionTools = tools.some((tool$1) => tool$1.type === "function");
	const hasProviderDefinedTools = tools.some((tool$1) => tool$1.type === "provider-defined");
	if (hasFunctionTools && hasProviderDefinedTools) {
		const functionTools = tools.filter((tool$1) => tool$1.type === "function");
		toolWarnings.push({
			type: "unsupported-tool",
			tool: tools.find((tool$1) => tool$1.type === "function"),
			details: `Cannot mix function tools with provider-defined tools in the same request. Falling back to provider-defined tools only. The following function tools will be ignored: ${functionTools.map((t) => t.name).join(", ")}. Please use either function tools or provider-defined tools, but not both.`
		});
	}
	if (hasProviderDefinedTools) {
		const googleTools2 = [];
		const providerDefinedTools = tools.filter((tool$1) => tool$1.type === "provider-defined");
		providerDefinedTools.forEach((tool$1) => {
			switch (tool$1.id) {
				case "google.google_search":
					if (isGemini2orNewer) googleTools2.push({ googleSearch: {} });
					else if (supportsDynamicRetrieval) googleTools2.push({ googleSearchRetrieval: { dynamicRetrievalConfig: {
						mode: tool$1.args.mode,
						dynamicThreshold: tool$1.args.dynamicThreshold
					} } });
					else googleTools2.push({ googleSearchRetrieval: {} });
					break;
				case "google.enterprise_web_search":
					if (isGemini2orNewer) googleTools2.push({ enterpriseWebSearch: {} });
					else toolWarnings.push({
						type: "unsupported-tool",
						tool: tool$1,
						details: "Enterprise Web Search requires Gemini 2.0 or newer."
					});
					break;
				case "google.url_context":
					if (isGemini2orNewer) googleTools2.push({ urlContext: {} });
					else toolWarnings.push({
						type: "unsupported-tool",
						tool: tool$1,
						details: "The URL context tool is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.code_execution":
					if (isGemini2orNewer) googleTools2.push({ codeExecution: {} });
					else toolWarnings.push({
						type: "unsupported-tool",
						tool: tool$1,
						details: "The code execution tools is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.file_search":
					if (supportsFileSearch) googleTools2.push({ fileSearch: { ...tool$1.args } });
					else toolWarnings.push({
						type: "unsupported-tool",
						tool: tool$1,
						details: "The file search tool is only supported with Gemini 2.5 models."
					});
					break;
				case "google.vertex_rag_store":
					if (isGemini2orNewer) googleTools2.push({ retrieval: { vertex_rag_store: {
						rag_resources: { rag_corpus: tool$1.args.ragCorpus },
						similarity_top_k: tool$1.args.topK
					} } });
					else toolWarnings.push({
						type: "unsupported-tool",
						tool: tool$1,
						details: "The RAG store tool is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.google_maps":
					if (isGemini2orNewer) googleTools2.push({ googleMaps: {} });
					else toolWarnings.push({
						type: "unsupported-tool",
						tool: tool$1,
						details: "The Google Maps grounding tool is not supported with Gemini models other than Gemini 2 or newer."
					});
					break;
				default:
					toolWarnings.push({
						type: "unsupported-tool",
						tool: tool$1
					});
					break;
			}
		});
		return {
			tools: googleTools2.length > 0 ? googleTools2 : void 0,
			toolConfig: void 0,
			toolWarnings
		};
	}
	const functionDeclarations = [];
	for (const tool$1 of tools) switch (tool$1.type) {
		case "function":
			functionDeclarations.push({
				name: tool$1.name,
				description: (_a = tool$1.description) != null ? _a : "",
				parameters: convertJSONSchemaToOpenAPISchema(tool$1.inputSchema)
			});
			break;
		default:
			toolWarnings.push({
				type: "unsupported-tool",
				tool: tool$1
			});
			break;
	}
	if (toolChoice == null) return {
		tools: [{ functionDeclarations }],
		toolConfig: void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: "AUTO" } },
			toolWarnings
		};
		case "none": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: "NONE" } },
			toolWarnings
		};
		case "required": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: { mode: "ANY" } },
			toolWarnings
		};
		case "tool": return {
			tools: [{ functionDeclarations }],
			toolConfig: { functionCallingConfig: {
				mode: "ANY",
				allowedFunctionNames: [toolChoice.toolName]
			} },
			toolWarnings
		};
		default: {
			const _exhaustiveCheck = type;
			throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${_exhaustiveCheck}` });
		}
	}
}
function mapGoogleGenerativeAIFinishReason({ finishReason, hasToolCalls }) {
	switch (finishReason) {
		case "STOP": return hasToolCalls ? "tool-calls" : "stop";
		case "MAX_TOKENS": return "length";
		case "IMAGE_SAFETY":
		case "RECITATION":
		case "SAFETY":
		case "BLOCKLIST":
		case "PROHIBITED_CONTENT":
		case "SPII": return "content-filter";
		case "FINISH_REASON_UNSPECIFIED":
		case "OTHER": return "other";
		case "MALFORMED_FUNCTION_CALL": return "error";
		default: return "unknown";
	}
}
var GoogleGenerativeAILanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v2";
		var _a;
		this.modelId = modelId;
		this.config = config;
		this.generateId = (_a = config.generateId) != null ? _a : generateId$1;
	}
	get provider() {
		return this.config.provider;
	}
	get supportedUrls() {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).supportedUrls) == null ? void 0 : _b.call(_a)) != null ? _c : {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions }) {
		var _a;
		const warnings = [];
		const googleOptions = await parseProviderOptions$1({
			provider: "google",
			providerOptions,
			schema: googleGenerativeAIProviderOptions
		});
		if ((tools == null ? void 0 : tools.some((tool$1) => tool$1.type === "provider-defined" && tool$1.id === "google.vertex_rag_store")) && !this.config.provider.startsWith("google.vertex.")) warnings.push({
			type: "other",
			message: `The 'vertex_rag_store' tool is only supported with the Google Vertex provider and might not be supported or could behave unexpectedly with the current Google provider (${this.config.provider}).`
		});
		const isGemmaModel = this.modelId.toLowerCase().startsWith("gemma-");
		const { contents, systemInstruction } = convertToGoogleGenerativeAIMessages(prompt, { isGemmaModel });
		const { tools: googleTools2, toolConfig: googleToolConfig, toolWarnings } = prepareTools({
			tools,
			toolChoice,
			modelId: this.modelId
		});
		return {
			args: {
				generationConfig: {
					maxOutputTokens,
					temperature,
					topK,
					topP,
					frequencyPenalty,
					presencePenalty,
					stopSequences,
					seed,
					responseMimeType: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? "application/json" : void 0,
					responseSchema: (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && ((_a = googleOptions == null ? void 0 : googleOptions.structuredOutputs) != null ? _a : true) ? convertJSONSchemaToOpenAPISchema(responseFormat.schema) : void 0,
					...(googleOptions == null ? void 0 : googleOptions.audioTimestamp) && { audioTimestamp: googleOptions.audioTimestamp },
					responseModalities: googleOptions == null ? void 0 : googleOptions.responseModalities,
					thinkingConfig: googleOptions == null ? void 0 : googleOptions.thinkingConfig,
					...(googleOptions == null ? void 0 : googleOptions.imageConfig) && { imageConfig: googleOptions.imageConfig },
					...(googleOptions == null ? void 0 : googleOptions.mediaResolution) && { mediaResolution: googleOptions.mediaResolution }
				},
				contents,
				systemInstruction: isGemmaModel ? void 0 : systemInstruction,
				safetySettings: googleOptions == null ? void 0 : googleOptions.safetySettings,
				tools: googleTools2,
				toolConfig: (googleOptions == null ? void 0 : googleOptions.retrievalConfig) ? {
					...googleToolConfig,
					retrievalConfig: googleOptions.retrievalConfig
				} : googleToolConfig,
				cachedContent: googleOptions == null ? void 0 : googleOptions.cachedContent,
				labels: googleOptions == null ? void 0 : googleOptions.labels
			},
			warnings: [...warnings, ...toolWarnings]
		};
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
		const { args, warnings } = await this.getArgs(options);
		const body = JSON.stringify(args);
		const mergedHeaders = combineHeaders$1(await resolve$1(this.config.headers), options.headers);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi$1({
			url: `${this.config.baseURL}/${getModelPath(this.modelId)}:generateContent`,
			headers: mergedHeaders,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler$1(responseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const candidate = response.candidates[0];
		const content = [];
		const parts = (_b = (_a = candidate.content) == null ? void 0 : _a.parts) != null ? _b : [];
		const usageMetadata = response.usageMetadata;
		let lastCodeExecutionToolCallId;
		for (const part of parts) if ("executableCode" in part && ((_c = part.executableCode) == null ? void 0 : _c.code)) {
			const toolCallId = this.config.generateId();
			lastCodeExecutionToolCallId = toolCallId;
			content.push({
				type: "tool-call",
				toolCallId,
				toolName: "code_execution",
				input: JSON.stringify(part.executableCode),
				providerExecuted: true
			});
		} else if ("codeExecutionResult" in part && part.codeExecutionResult) {
			content.push({
				type: "tool-result",
				toolCallId: lastCodeExecutionToolCallId,
				toolName: "code_execution",
				result: {
					outcome: part.codeExecutionResult.outcome,
					output: part.codeExecutionResult.output
				},
				providerExecuted: true
			});
			lastCodeExecutionToolCallId = void 0;
		} else if ("text" in part && part.text != null && part.text.length > 0) content.push({
			type: part.thought === true ? "reasoning" : "text",
			text: part.text,
			providerMetadata: part.thoughtSignature ? { google: { thoughtSignature: part.thoughtSignature } } : void 0
		});
		else if ("functionCall" in part) content.push({
			type: "tool-call",
			toolCallId: this.config.generateId(),
			toolName: part.functionCall.name,
			input: JSON.stringify(part.functionCall.args),
			providerMetadata: part.thoughtSignature ? { google: { thoughtSignature: part.thoughtSignature } } : void 0
		});
		else if ("inlineData" in part) content.push({
			type: "file",
			data: part.inlineData.data,
			mediaType: part.inlineData.mimeType
		});
		const sources = (_d = extractSources({
			groundingMetadata: candidate.groundingMetadata,
			generateId: this.config.generateId
		})) != null ? _d : [];
		for (const source of sources) content.push(source);
		return {
			content,
			finishReason: mapGoogleGenerativeAIFinishReason({
				finishReason: candidate.finishReason,
				hasToolCalls: content.some((part) => part.type === "tool-call")
			}),
			usage: {
				inputTokens: (_e = usageMetadata == null ? void 0 : usageMetadata.promptTokenCount) != null ? _e : void 0,
				outputTokens: (_f = usageMetadata == null ? void 0 : usageMetadata.candidatesTokenCount) != null ? _f : void 0,
				totalTokens: (_g = usageMetadata == null ? void 0 : usageMetadata.totalTokenCount) != null ? _g : void 0,
				reasoningTokens: (_h = usageMetadata == null ? void 0 : usageMetadata.thoughtsTokenCount) != null ? _h : void 0,
				cachedInputTokens: (_i = usageMetadata == null ? void 0 : usageMetadata.cachedContentTokenCount) != null ? _i : void 0
			},
			warnings,
			providerMetadata: { google: {
				promptFeedback: (_j = response.promptFeedback) != null ? _j : null,
				groundingMetadata: (_k = candidate.groundingMetadata) != null ? _k : null,
				urlContextMetadata: (_l = candidate.urlContextMetadata) != null ? _l : null,
				safetyRatings: (_m = candidate.safetyRatings) != null ? _m : null,
				usageMetadata: usageMetadata != null ? usageMetadata : null
			} },
			request: { body },
			response: {
				headers: responseHeaders,
				body: rawResponse
			}
		};
	}
	async doStream(options) {
		const { args, warnings } = await this.getArgs(options);
		const body = JSON.stringify(args);
		const headers = combineHeaders$1(await resolve$1(this.config.headers), options.headers);
		const { responseHeaders, value: response } = await postJsonToApi$1({
			url: `${this.config.baseURL}/${getModelPath(this.modelId)}:streamGenerateContent?alt=sse`,
			headers,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(chunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = "unknown";
		const usage = {
			inputTokens: void 0,
			outputTokens: void 0,
			totalTokens: void 0
		};
		let providerMetadata = void 0;
		const generateId2 = this.config.generateId;
		let hasToolCalls = false;
		let currentTextBlockId = null;
		let currentReasoningBlockId = null;
		let blockCounter = 0;
		const emittedSourceUrls = /* @__PURE__ */ new Set();
		let lastCodeExecutionToolCallId;
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					const usageMetadata = value.usageMetadata;
					if (usageMetadata != null) {
						usage.inputTokens = (_a = usageMetadata.promptTokenCount) != null ? _a : void 0;
						usage.outputTokens = (_b = usageMetadata.candidatesTokenCount) != null ? _b : void 0;
						usage.totalTokens = (_c = usageMetadata.totalTokenCount) != null ? _c : void 0;
						usage.reasoningTokens = (_d = usageMetadata.thoughtsTokenCount) != null ? _d : void 0;
						usage.cachedInputTokens = (_e = usageMetadata.cachedContentTokenCount) != null ? _e : void 0;
					}
					const candidate = (_f = value.candidates) == null ? void 0 : _f[0];
					if (candidate == null) return;
					const content = candidate.content;
					const sources = extractSources({
						groundingMetadata: candidate.groundingMetadata,
						generateId: generateId2
					});
					if (sources != null) {
						for (const source of sources) if (source.sourceType === "url" && !emittedSourceUrls.has(source.url)) {
							emittedSourceUrls.add(source.url);
							controller.enqueue(source);
						}
					}
					if (content != null) {
						const parts = (_g = content.parts) != null ? _g : [];
						for (const part of parts) if ("executableCode" in part && ((_h = part.executableCode) == null ? void 0 : _h.code)) {
							const toolCallId = generateId2();
							lastCodeExecutionToolCallId = toolCallId;
							controller.enqueue({
								type: "tool-call",
								toolCallId,
								toolName: "code_execution",
								input: JSON.stringify(part.executableCode),
								providerExecuted: true
							});
							hasToolCalls = true;
						} else if ("codeExecutionResult" in part && part.codeExecutionResult) {
							const toolCallId = lastCodeExecutionToolCallId;
							if (toolCallId) {
								controller.enqueue({
									type: "tool-result",
									toolCallId,
									toolName: "code_execution",
									result: {
										outcome: part.codeExecutionResult.outcome,
										output: part.codeExecutionResult.output
									},
									providerExecuted: true
								});
								lastCodeExecutionToolCallId = void 0;
							}
						} else if ("text" in part && part.text != null && part.text.length > 0) if (part.thought === true) {
							if (currentTextBlockId !== null) {
								controller.enqueue({
									type: "text-end",
									id: currentTextBlockId
								});
								currentTextBlockId = null;
							}
							if (currentReasoningBlockId === null) {
								currentReasoningBlockId = String(blockCounter++);
								controller.enqueue({
									type: "reasoning-start",
									id: currentReasoningBlockId,
									providerMetadata: part.thoughtSignature ? { google: { thoughtSignature: part.thoughtSignature } } : void 0
								});
							}
							controller.enqueue({
								type: "reasoning-delta",
								id: currentReasoningBlockId,
								delta: part.text,
								providerMetadata: part.thoughtSignature ? { google: { thoughtSignature: part.thoughtSignature } } : void 0
							});
						} else {
							if (currentReasoningBlockId !== null) {
								controller.enqueue({
									type: "reasoning-end",
									id: currentReasoningBlockId
								});
								currentReasoningBlockId = null;
							}
							if (currentTextBlockId === null) {
								currentTextBlockId = String(blockCounter++);
								controller.enqueue({
									type: "text-start",
									id: currentTextBlockId,
									providerMetadata: part.thoughtSignature ? { google: { thoughtSignature: part.thoughtSignature } } : void 0
								});
							}
							controller.enqueue({
								type: "text-delta",
								id: currentTextBlockId,
								delta: part.text,
								providerMetadata: part.thoughtSignature ? { google: { thoughtSignature: part.thoughtSignature } } : void 0
							});
						}
						else if ("inlineData" in part) controller.enqueue({
							type: "file",
							mediaType: part.inlineData.mimeType,
							data: part.inlineData.data
						});
						const toolCallDeltas = getToolCallsFromParts({
							parts: content.parts,
							generateId: generateId2
						});
						if (toolCallDeltas != null) for (const toolCall of toolCallDeltas) {
							controller.enqueue({
								type: "tool-input-start",
								id: toolCall.toolCallId,
								toolName: toolCall.toolName,
								providerMetadata: toolCall.providerMetadata
							});
							controller.enqueue({
								type: "tool-input-delta",
								id: toolCall.toolCallId,
								delta: toolCall.args,
								providerMetadata: toolCall.providerMetadata
							});
							controller.enqueue({
								type: "tool-input-end",
								id: toolCall.toolCallId,
								providerMetadata: toolCall.providerMetadata
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId: toolCall.toolCallId,
								toolName: toolCall.toolName,
								input: toolCall.args,
								providerMetadata: toolCall.providerMetadata
							});
							hasToolCalls = true;
						}
					}
					if (candidate.finishReason != null) {
						finishReason = mapGoogleGenerativeAIFinishReason({
							finishReason: candidate.finishReason,
							hasToolCalls
						});
						providerMetadata = { google: {
							promptFeedback: (_i = value.promptFeedback) != null ? _i : null,
							groundingMetadata: (_j = candidate.groundingMetadata) != null ? _j : null,
							urlContextMetadata: (_k = candidate.urlContextMetadata) != null ? _k : null,
							safetyRatings: (_l = candidate.safetyRatings) != null ? _l : null
						} };
						if (usageMetadata != null) providerMetadata.google.usageMetadata = usageMetadata;
					}
				},
				flush(controller) {
					if (currentTextBlockId !== null) controller.enqueue({
						type: "text-end",
						id: currentTextBlockId
					});
					if (currentReasoningBlockId !== null) controller.enqueue({
						type: "reasoning-end",
						id: currentReasoningBlockId
					});
					controller.enqueue({
						type: "finish",
						finishReason,
						usage,
						providerMetadata
					});
				}
			})),
			response: { headers: responseHeaders },
			request: { body }
		};
	}
};
function getToolCallsFromParts({ parts, generateId: generateId2 }) {
	const functionCallParts = parts == null ? void 0 : parts.filter((part) => "functionCall" in part);
	return functionCallParts == null || functionCallParts.length === 0 ? void 0 : functionCallParts.map((part) => ({
		type: "tool-call",
		toolCallId: generateId2(),
		toolName: part.functionCall.name,
		args: JSON.stringify(part.functionCall.args),
		providerMetadata: part.thoughtSignature ? { google: { thoughtSignature: part.thoughtSignature } } : void 0
	}));
}
function extractSources({ groundingMetadata, generateId: generateId2 }) {
	var _a, _b, _c, _d, _e;
	if (!(groundingMetadata == null ? void 0 : groundingMetadata.groundingChunks)) return void 0;
	const sources = [];
	for (const chunk of groundingMetadata.groundingChunks) if (chunk.web != null) sources.push({
		type: "source",
		sourceType: "url",
		id: generateId2(),
		url: chunk.web.uri,
		title: (_a = chunk.web.title) != null ? _a : void 0
	});
	else if (chunk.retrievedContext != null) {
		const uri = chunk.retrievedContext.uri;
		const fileSearchStore = chunk.retrievedContext.fileSearchStore;
		if (uri && (uri.startsWith("http://") || uri.startsWith("https://"))) sources.push({
			type: "source",
			sourceType: "url",
			id: generateId2(),
			url: uri,
			title: (_b = chunk.retrievedContext.title) != null ? _b : void 0
		});
		else if (uri) {
			const title = (_c = chunk.retrievedContext.title) != null ? _c : "Unknown Document";
			let mediaType = "application/octet-stream";
			let filename = void 0;
			if (uri.endsWith(".pdf")) {
				mediaType = "application/pdf";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".txt")) {
				mediaType = "text/plain";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".docx")) {
				mediaType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
				filename = uri.split("/").pop();
			} else if (uri.endsWith(".doc")) {
				mediaType = "application/msword";
				filename = uri.split("/").pop();
			} else if (uri.match(/\.(md|markdown)$/)) {
				mediaType = "text/markdown";
				filename = uri.split("/").pop();
			} else filename = uri.split("/").pop();
			sources.push({
				type: "source",
				sourceType: "document",
				id: generateId2(),
				mediaType,
				title,
				filename
			});
		} else if (fileSearchStore) {
			const title = (_d = chunk.retrievedContext.title) != null ? _d : "Unknown Document";
			sources.push({
				type: "source",
				sourceType: "document",
				id: generateId2(),
				mediaType: "application/octet-stream",
				title,
				filename: fileSearchStore.split("/").pop()
			});
		}
	} else if (chunk.maps != null) {
		if (chunk.maps.uri) sources.push({
			type: "source",
			sourceType: "url",
			id: generateId2(),
			url: chunk.maps.uri,
			title: (_e = chunk.maps.title) != null ? _e : void 0
		});
	}
	return sources.length > 0 ? sources : void 0;
}
var getGroundingMetadataSchema = () => object({
	webSearchQueries: array(string()).nullish(),
	retrievalQueries: array(string()).nullish(),
	searchEntryPoint: object({ renderedContent: string() }).nullish(),
	groundingChunks: array(object({
		web: object({
			uri: string(),
			title: string().nullish()
		}).nullish(),
		retrievedContext: object({
			uri: string().nullish(),
			title: string().nullish(),
			text: string().nullish(),
			fileSearchStore: string().nullish()
		}).nullish(),
		maps: object({
			uri: string().nullish(),
			title: string().nullish(),
			text: string().nullish(),
			placeId: string().nullish()
		}).nullish()
	})).nullish(),
	groundingSupports: array(object({
		segment: object({
			startIndex: number().nullish(),
			endIndex: number().nullish(),
			text: string().nullish()
		}),
		segment_text: string().nullish(),
		groundingChunkIndices: array(number()).nullish(),
		supportChunkIndices: array(number()).nullish(),
		confidenceScores: array(number()).nullish(),
		confidenceScore: array(number()).nullish()
	})).nullish(),
	retrievalMetadata: union([object({ webDynamicRetrievalScore: number() }), object({})]).nullish()
});
var getContentSchema = () => object({ parts: array(union([
	object({
		functionCall: object({
			name: string(),
			args: unknown()
		}),
		thoughtSignature: string().nullish()
	}),
	object({ inlineData: object({
		mimeType: string(),
		data: string()
	}) }),
	object({
		executableCode: object({
			language: string(),
			code: string()
		}).nullish(),
		codeExecutionResult: object({
			outcome: string(),
			output: string()
		}).nullish(),
		text: string().nullish(),
		thought: boolean().nullish(),
		thoughtSignature: string().nullish()
	})
])).nullish() });
var getSafetyRatingSchema = () => object({
	category: string().nullish(),
	probability: string().nullish(),
	probabilityScore: number().nullish(),
	severity: string().nullish(),
	severityScore: number().nullish(),
	blocked: boolean().nullish()
});
var usageSchema = object({
	cachedContentTokenCount: number().nullish(),
	thoughtsTokenCount: number().nullish(),
	promptTokenCount: number().nullish(),
	candidatesTokenCount: number().nullish(),
	totalTokenCount: number().nullish(),
	trafficType: string().nullish()
});
var getUrlContextMetadataSchema = () => object({ urlMetadata: array(object({
	retrievedUrl: string(),
	urlRetrievalStatus: string()
})) });
var responseSchema = lazySchema(() => zodSchema(object({
	candidates: array(object({
		content: getContentSchema().nullish().or(object({}).strict()),
		finishReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish(),
		groundingMetadata: getGroundingMetadataSchema().nullish(),
		urlContextMetadata: getUrlContextMetadataSchema().nullish()
	})),
	usageMetadata: usageSchema.nullish(),
	promptFeedback: object({
		blockReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish()
	}).nullish()
})));
var chunkSchema = lazySchema(() => zodSchema(object({
	candidates: array(object({
		content: getContentSchema().nullish(),
		finishReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish(),
		groundingMetadata: getGroundingMetadataSchema().nullish(),
		urlContextMetadata: getUrlContextMetadataSchema().nullish()
	})).nullish(),
	usageMetadata: usageSchema.nullish(),
	promptFeedback: object({
		blockReason: string().nullish(),
		safetyRatings: array(getSafetyRatingSchema()).nullish()
	}).nullish()
})));
var codeExecution = createProviderDefinedToolFactoryWithOutputSchema({
	id: "google.code_execution",
	name: "code_execution",
	inputSchema: object({
		language: string().describe("The programming language of the code."),
		code: string().describe("The code to be executed.")
	}),
	outputSchema: object({
		outcome: string().describe("The outcome of the execution (e.g., \"OUTCOME_OK\")."),
		output: string().describe("The output from the code execution.")
	})
});
var enterpriseWebSearch = createProviderDefinedToolFactory({
	id: "google.enterprise_web_search",
	name: "enterprise_web_search",
	inputSchema: lazySchema(() => zodSchema(object({})))
});
var fileSearchArgsBaseSchema = object({
	fileSearchStoreNames: array(string()).describe("The names of the file_search_stores to retrieve from. Example: `fileSearchStores/my-file-search-store-123`"),
	topK: number().int().positive().describe("The number of file search retrieval chunks to retrieve.").optional(),
	metadataFilter: string().describe("Metadata filter to apply to the file search retrieval documents. See https://google.aip.dev/160 for the syntax of the filter expression.").optional()
}).passthrough();
var fileSearchArgsSchema = lazySchema(() => zodSchema(fileSearchArgsBaseSchema));
var fileSearch = createProviderDefinedToolFactory({
	id: "google.file_search",
	name: "file_search",
	inputSchema: fileSearchArgsSchema
});
var googleMaps = createProviderDefinedToolFactory({
	id: "google.google_maps",
	name: "google_maps",
	inputSchema: lazySchema(() => zodSchema(object({})))
});
var googleSearch = createProviderDefinedToolFactory({
	id: "google.google_search",
	name: "google_search",
	inputSchema: lazySchema(() => zodSchema(object({
		mode: _enum(["MODE_DYNAMIC", "MODE_UNSPECIFIED"]).default("MODE_UNSPECIFIED"),
		dynamicThreshold: number().default(1)
	})))
});
var urlContext = createProviderDefinedToolFactory({
	id: "google.url_context",
	name: "url_context",
	inputSchema: lazySchema(() => zodSchema(object({})))
});
var vertexRagStore = createProviderDefinedToolFactory({
	id: "google.vertex_rag_store",
	name: "vertex_rag_store",
	inputSchema: object({
		ragCorpus: string(),
		topK: number().optional()
	})
});
var googleTools = {
	googleSearch,
	enterpriseWebSearch,
	googleMaps,
	urlContext,
	fileSearch,
	codeExecution,
	vertexRagStore
};
var VERSION = "3.0.94";
var googleVertexErrorDataSchema = object({ error: object({
	code: number().nullable(),
	message: string(),
	status: string()
}) });
var googleVertexFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: googleVertexErrorDataSchema,
	errorToMessage: (data) => data.error.message
});
var googleVertexEmbeddingProviderOptions = object({
	outputDimensionality: number().optional(),
	taskType: _enum([
		"SEMANTIC_SIMILARITY",
		"CLASSIFICATION",
		"CLUSTERING",
		"RETRIEVAL_DOCUMENT",
		"RETRIEVAL_QUERY",
		"QUESTION_ANSWERING",
		"FACT_VERIFICATION",
		"CODE_RETRIEVAL_QUERY"
	]).optional(),
	title: string().optional(),
	autoTruncate: boolean().optional()
});
var GoogleVertexEmbeddingModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v2";
		this.maxEmbeddingsPerCall = 2048;
		this.supportsParallelCalls = true;
		this.modelId = modelId;
		this.config = config;
	}
	get provider() {
		return this.config.provider;
	}
	async doEmbed({ values, headers, abortSignal, providerOptions }) {
		var _a;
		const googleOptions = (_a = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleVertexEmbeddingProviderOptions
		})) != null ? _a : {};
		if (values.length > this.maxEmbeddingsPerCall) throw new TooManyEmbeddingValuesForCallError({
			provider: this.provider,
			modelId: this.modelId,
			maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
			values
		});
		const mergedHeaders = combineHeaders(await resolve(this.config.headers), headers);
		const url = `${this.config.baseURL}/models/${this.modelId}:predict`;
		const { responseHeaders, value: response, rawValue } = await postJsonToApi({
			url,
			headers: mergedHeaders,
			body: {
				instances: values.map((value) => ({
					content: value,
					task_type: googleOptions.taskType,
					title: googleOptions.title
				})),
				parameters: {
					outputDimensionality: googleOptions.outputDimensionality,
					autoTruncate: googleOptions.autoTruncate
				}
			},
			failedResponseHandler: googleVertexFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(googleVertexTextEmbeddingResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			embeddings: response.predictions.map((prediction) => prediction.embeddings.values),
			usage: { tokens: response.predictions.reduce((tokenCount, prediction) => tokenCount + prediction.embeddings.statistics.token_count, 0) },
			response: {
				headers: responseHeaders,
				body: rawValue
			}
		};
	}
};
var googleVertexTextEmbeddingResponseSchema = object({ predictions: array(object({ embeddings: object({
	values: array(number()),
	statistics: object({ token_count: number() })
}) })) });
var GoogleVertexImageModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v2";
		this.maxImagesPerCall = 4;
	}
	get provider() {
		return this.config.provider;
	}
	async doGenerate({ prompt, n, size, aspectRatio, seed, providerOptions, headers, abortSignal }) {
		var _a, _b, _c, _d, _e, _f, _g;
		const warnings = [];
		if (size != null) warnings.push({
			type: "unsupported-setting",
			setting: "size",
			details: "This model does not support the `size` option. Use `aspectRatio` instead."
		});
		const vertexImageOptions = await parseProviderOptions({
			provider: "vertex",
			providerOptions,
			schema: vertexImageProviderOptionsSchema
		});
		const body = {
			instances: [{ prompt }],
			parameters: {
				sampleCount: n,
				...aspectRatio != null ? { aspectRatio } : {},
				...seed != null ? { seed } : {},
				...vertexImageOptions != null ? vertexImageOptions : {}
			}
		};
		const currentDate = (_c = (_b = (_a = this.config._internal) == null ? void 0 : _a.currentDate) == null ? void 0 : _b.call(_a)) != null ? _c : /* @__PURE__ */ new Date();
		const { value: response, responseHeaders } = await postJsonToApi({
			url: `${this.config.baseURL}/models/${this.modelId}:predict`,
			headers: combineHeaders(await resolve(this.config.headers), headers),
			body,
			failedResponseHandler: googleVertexFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(vertexImageResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			images: (_e = (_d = response.predictions) == null ? void 0 : _d.map(({ bytesBase64Encoded }) => bytesBase64Encoded)) != null ? _e : [],
			warnings,
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			},
			providerMetadata: { vertex: { images: (_g = (_f = response.predictions) == null ? void 0 : _f.map((prediction) => {
				const { prompt: revisedPrompt } = prediction;
				return { ...revisedPrompt != null && { revisedPrompt } };
			})) != null ? _g : [] } }
		};
	}
};
var vertexImageResponseSchema = object({ predictions: array(object({
	bytesBase64Encoded: string(),
	mimeType: string(),
	prompt: string().nullish()
})).nullish() });
var vertexImageProviderOptionsSchema = object({
	negativePrompt: string().nullish(),
	personGeneration: _enum([
		"dont_allow",
		"allow_adult",
		"allow_all"
	]).nullish(),
	safetySetting: _enum([
		"block_low_and_above",
		"block_medium_and_above",
		"block_only_high",
		"block_none"
	]).nullish(),
	addWatermark: boolean().nullish(),
	storageUri: string().nullish(),
	sampleImageSize: _enum(["1K", "2K"]).nullish()
});
var googleVertexTools = {
	googleSearch: googleTools.googleSearch,
	enterpriseWebSearch: googleTools.enterpriseWebSearch,
	googleMaps: googleTools.googleMaps,
	urlContext: googleTools.urlContext,
	fileSearch: googleTools.fileSearch,
	codeExecution: googleTools.codeExecution,
	vertexRagStore: googleTools.vertexRagStore
};
function createVertex(options = {}) {
	const loadVertexProject = () => loadSetting({
		settingValue: options.project,
		settingName: "project",
		environmentVariableName: "GOOGLE_VERTEX_PROJECT",
		description: "Google Vertex project"
	});
	const loadVertexLocation = () => loadSetting({
		settingValue: options.location,
		settingName: "location",
		environmentVariableName: "GOOGLE_VERTEX_LOCATION",
		description: "Google Vertex location"
	});
	const loadBaseURL = () => {
		var _a;
		const region = loadVertexLocation();
		const project = loadVertexProject();
		const baseHost = `${region === "global" ? "" : region + "-"}aiplatform.googleapis.com`;
		return (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : `https://${baseHost}/v1beta1/projects/${project}/locations/${region}/publishers/google`;
	};
	const createConfig = (name) => {
		const getHeaders = async () => {
			var _a;
			const originalHeaders = await resolve((_a = options.headers) != null ? _a : {});
			return withUserAgentSuffix(originalHeaders, `ai-sdk/google-vertex/${VERSION}`);
		};
		return {
			provider: `google.vertex.${name}`,
			headers: getHeaders,
			fetch: options.fetch,
			baseURL: loadBaseURL()
		};
	};
	const createChatModel = (modelId) => {
		var _a;
		return new GoogleGenerativeAILanguageModel(modelId, {
			...createConfig("chat"),
			generateId: (_a = options.generateId) != null ? _a : generateId,
			supportedUrls: () => ({ "*": [/^https?:\/\/.*$/, /^gs:\/\/.*$/] })
		});
	};
	const createEmbeddingModel = (modelId) => new GoogleVertexEmbeddingModel(modelId, createConfig("embedding"));
	const createImageModel = (modelId) => new GoogleVertexImageModel(modelId, createConfig("image"));
	const provider = function(modelId) {
		if (new.target) throw new Error("The Google Vertex AI model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.languageModel = createChatModel;
	provider.textEmbeddingModel = createEmbeddingModel;
	provider.image = createImageModel;
	provider.imageModel = createImageModel;
	provider.tools = googleVertexTools;
	return provider;
}
var loadCredentials = async () => {
	try {
		return {
			clientEmail: loadSetting({
				settingValue: void 0,
				settingName: "clientEmail",
				environmentVariableName: "GOOGLE_CLIENT_EMAIL",
				description: "Google client email"
			}),
			privateKey: loadSetting({
				settingValue: void 0,
				settingName: "privateKey",
				environmentVariableName: "GOOGLE_PRIVATE_KEY",
				description: "Google private key"
			}),
			privateKeyId: loadOptionalSetting({
				settingValue: void 0,
				environmentVariableName: "GOOGLE_PRIVATE_KEY_ID"
			})
		};
	} catch (error) {
		throw new Error(`Failed to load Google credentials: ${error.message}`);
	}
};
var base64url = (str) => {
	return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};
var importPrivateKey = async (pemKey) => {
	const pemHeader = "-----BEGIN PRIVATE KEY-----";
	const pemFooter = "-----END PRIVATE KEY-----";
	const pemContents = pemKey.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");
	const binaryString = atob(pemContents);
	const binaryData = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) binaryData[i] = binaryString.charCodeAt(i);
	return await crypto.subtle.importKey("pkcs8", binaryData, {
		name: "RSASSA-PKCS1-v1_5",
		hash: "SHA-256"
	}, true, ["sign"]);
};
var buildJwt = async (credentials) => {
	const now = Math.floor(Date.now() / 1e3);
	const header = {
		alg: "RS256",
		typ: "JWT"
	};
	if (credentials.privateKeyId) header.kid = credentials.privateKeyId;
	const payload = {
		iss: credentials.clientEmail,
		scope: "https://www.googleapis.com/auth/cloud-platform",
		aud: "https://oauth2.googleapis.com/token",
		exp: now + 3600,
		iat: now
	};
	const privateKey = await importPrivateKey(credentials.privateKey);
	const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
	const encoder = new TextEncoder();
	const data = encoder.encode(signingInput);
	const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, data);
	const signatureBase64 = base64url(String.fromCharCode(...new Uint8Array(signature)));
	return `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}.${signatureBase64}`;
};
async function generateAuthToken(credentials) {
	try {
		const creds = credentials || await loadCredentials();
		const jwt = await buildJwt(creds);
		const response = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			headers: withUserAgentSuffix({ "Content-Type": "application/x-www-form-urlencoded" }, `ai-sdk/google-vertex/${VERSION}`, getRuntimeEnvironmentUserAgent()),
			body: new URLSearchParams({
				grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
				assertion: jwt
			})
		});
		if (!response.ok) throw new Error(`Token request failed: ${response.statusText}`);
		const data = await response.json();
		return data.access_token;
	} catch (error) {
		throw error;
	}
}
function createVertex2(options = {}) {
	return createVertex({
		...options,
		headers: async () => ({
			Authorization: `Bearer ${await generateAuthToken(options.googleCredentials)}`,
			...await resolve(options.headers)
		})
	});
}
var vertex = createVertex2();
export { createVertex2 as b, vertex as c, GoogleGenerativeAILanguageModel as d, combineHeaders$1 as e, convertToBase64 as f, createEventSourceResponseHandler as g, createJsonErrorResponseHandler$1 as h, createJsonResponseHandler$1 as i, createProviderDefinedToolFactory as j, createProviderDefinedToolFactoryWithOutputSchema as k, generateId$1 as l, lazySchema as m, loadApiKey as n, parseProviderOptions$1 as o, postJsonToApi$1 as p, resolve$1 as q, withUserAgentSuffix$1 as r, withoutTrailingSlash$1 as s, zodSchema as t };
