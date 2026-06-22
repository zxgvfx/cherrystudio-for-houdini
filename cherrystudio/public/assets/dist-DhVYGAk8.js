import { A as unknown, D as string, S as object, T as record, d as array, f as boolean, k as union, o as _enum, u as any, v as literal, x as number } from "./types-BaLzBUv4.js";
import { C as extractResponseHeaders, D as getRuntimeEnvironmentUserAgent, G as resolve, I as loadOptionalSetting, K as safeParseJSON, L as loadSetting, P as lazySchema, Q as zodSchema, U as postJsonToApi, V as parseProviderOptions, X as withUserAgentSuffix, Z as withoutTrailingSlash, a as combineHeaders, c as convertToBase64, dt as UnsupportedFunctionalityError, h as createJsonResponseHandler, i as asSchema, lt as TooManyEmbeddingValuesForCallError, m as createJsonErrorResponseHandler, nt as EmptyResponseBodyError, q as safeValidateTypes, u as convertUint8ArrayToBase64, w as generateId, z as normalizeHeaders } from "./dist-B2-WP_X8.js";
import { n as fromUtf8, t as toUtf8 } from "./toUtf8.browser-RJKo7WB0.js";
import { t as EventStreamCodec } from "./EventStreamCodec-BiFEcBYJ.js";
import { n as anthropicTools, r as prepareTools } from "./internal-DNLR2aYL.js";
/**
* @license MIT <https://opensource.org/licenses/MIT>
* @copyright Michael Hart 2024
*/
var encoder = new TextEncoder();
var HOST_SERVICES = {
	appstream2: "appstream",
	cloudhsmv2: "cloudhsm",
	email: "ses",
	marketplace: "aws-marketplace",
	mobile: "AWSMobileHubService",
	pinpoint: "mobiletargeting",
	queue: "sqs",
	"git-codecommit": "codecommit",
	"mturk-requester-sandbox": "mturk-requester",
	"personalize-runtime": "personalize"
};
var UNSIGNABLE_HEADERS = new Set([
	"authorization",
	"content-type",
	"content-length",
	"user-agent",
	"presigned-expires",
	"expect",
	"x-amzn-trace-id",
	"range",
	"connection"
]);
var AwsV4Signer = class {
	constructor({ method, url, headers, body, accessKeyId, secretAccessKey, sessionToken, service, region, cache, datetime, signQuery, appendSessionToken, allHeaders, singleEncode }) {
		if (url == null) throw new TypeError("url is a required option");
		if (accessKeyId == null) throw new TypeError("accessKeyId is a required option");
		if (secretAccessKey == null) throw new TypeError("secretAccessKey is a required option");
		this.method = method || (body ? "POST" : "GET");
		this.url = new URL(url);
		this.headers = new Headers(headers || {});
		this.body = body;
		this.accessKeyId = accessKeyId;
		this.secretAccessKey = secretAccessKey;
		this.sessionToken = sessionToken;
		let guessedService, guessedRegion;
		if (!service || !region) [guessedService, guessedRegion] = guessServiceRegion(this.url, this.headers);
		this.service = service || guessedService || "";
		this.region = region || guessedRegion || "us-east-1";
		this.cache = cache || /* @__PURE__ */ new Map();
		this.datetime = datetime || (/* @__PURE__ */ new Date()).toISOString().replace(/[:-]|\.\d{3}/g, "");
		this.signQuery = signQuery;
		this.appendSessionToken = appendSessionToken || this.service === "iotdevicegateway";
		this.headers.delete("Host");
		if (this.service === "s3" && !this.signQuery && !this.headers.has("X-Amz-Content-Sha256")) this.headers.set("X-Amz-Content-Sha256", "UNSIGNED-PAYLOAD");
		const params = this.signQuery ? this.url.searchParams : this.headers;
		params.set("X-Amz-Date", this.datetime);
		if (this.sessionToken && !this.appendSessionToken) params.set("X-Amz-Security-Token", this.sessionToken);
		this.signableHeaders = ["host", ...this.headers.keys()].filter((header) => allHeaders || !UNSIGNABLE_HEADERS.has(header)).sort();
		this.signedHeaders = this.signableHeaders.join(";");
		this.canonicalHeaders = this.signableHeaders.map((header) => header + ":" + (header === "host" ? this.url.host : (this.headers.get(header) || "").replace(/\s+/g, " "))).join("\n");
		this.credentialString = [
			this.datetime.slice(0, 8),
			this.region,
			this.service,
			"aws4_request"
		].join("/");
		if (this.signQuery) {
			if (this.service === "s3" && !params.has("X-Amz-Expires")) params.set("X-Amz-Expires", "86400");
			params.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
			params.set("X-Amz-Credential", this.accessKeyId + "/" + this.credentialString);
			params.set("X-Amz-SignedHeaders", this.signedHeaders);
		}
		if (this.service === "s3") try {
			this.encodedPath = decodeURIComponent(this.url.pathname.replace(/\+/g, " "));
		} catch (e) {
			this.encodedPath = this.url.pathname;
		}
		else this.encodedPath = this.url.pathname.replace(/\/+/g, "/");
		if (!singleEncode) this.encodedPath = encodeURIComponent(this.encodedPath).replace(/%2F/g, "/");
		this.encodedPath = encodeRfc3986(this.encodedPath);
		const seenKeys = /* @__PURE__ */ new Set();
		this.encodedSearch = [...this.url.searchParams].filter(([k]) => {
			if (!k) return false;
			if (this.service === "s3") {
				if (seenKeys.has(k)) return false;
				seenKeys.add(k);
			}
			return true;
		}).map((pair) => pair.map((p) => encodeRfc3986(encodeURIComponent(p)))).sort(([k1, v1], [k2, v2]) => k1 < k2 ? -1 : k1 > k2 ? 1 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0).map((pair) => pair.join("=")).join("&");
	}
	async sign() {
		if (this.signQuery) {
			this.url.searchParams.set("X-Amz-Signature", await this.signature());
			if (this.sessionToken && this.appendSessionToken) this.url.searchParams.set("X-Amz-Security-Token", this.sessionToken);
		} else this.headers.set("Authorization", await this.authHeader());
		return {
			method: this.method,
			url: this.url,
			headers: this.headers,
			body: this.body
		};
	}
	async authHeader() {
		return [
			"AWS4-HMAC-SHA256 Credential=" + this.accessKeyId + "/" + this.credentialString,
			"SignedHeaders=" + this.signedHeaders,
			"Signature=" + await this.signature()
		].join(", ");
	}
	async signature() {
		const date = this.datetime.slice(0, 8);
		const cacheKey = [
			this.secretAccessKey,
			date,
			this.region,
			this.service
		].join();
		let kCredentials = this.cache.get(cacheKey);
		if (!kCredentials) {
			kCredentials = await hmac(await hmac(await hmac(await hmac("AWS4" + this.secretAccessKey, date), this.region), this.service), "aws4_request");
			this.cache.set(cacheKey, kCredentials);
		}
		return buf2hex(await hmac(kCredentials, await this.stringToSign()));
	}
	async stringToSign() {
		return [
			"AWS4-HMAC-SHA256",
			this.datetime,
			this.credentialString,
			buf2hex(await hash(await this.canonicalString()))
		].join("\n");
	}
	async canonicalString() {
		return [
			this.method.toUpperCase(),
			this.encodedPath,
			this.encodedSearch,
			this.canonicalHeaders + "\n",
			this.signedHeaders,
			await this.hexBodyHash()
		].join("\n");
	}
	async hexBodyHash() {
		let hashHeader = this.headers.get("X-Amz-Content-Sha256") || (this.service === "s3" && this.signQuery ? "UNSIGNED-PAYLOAD" : null);
		if (hashHeader == null) {
			if (this.body && typeof this.body !== "string" && !("byteLength" in this.body)) throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");
			hashHeader = buf2hex(await hash(this.body || ""));
		}
		return hashHeader;
	}
};
async function hmac(key, string$1) {
	const cryptoKey = await crypto.subtle.importKey("raw", typeof key === "string" ? encoder.encode(key) : key, {
		name: "HMAC",
		hash: { name: "SHA-256" }
	}, false, ["sign"]);
	return crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(string$1));
}
async function hash(content) {
	return crypto.subtle.digest("SHA-256", typeof content === "string" ? encoder.encode(content) : content);
}
var HEX_CHARS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f"
];
function buf2hex(arrayBuffer) {
	const buffer = new Uint8Array(arrayBuffer);
	let out = "";
	for (let idx = 0; idx < buffer.length; idx++) {
		const n = buffer[idx];
		out += HEX_CHARS[n >>> 4 & 15];
		out += HEX_CHARS[n & 15];
	}
	return out;
}
function encodeRfc3986(urlEncodedStr) {
	return urlEncodedStr.replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}
function guessServiceRegion(url, headers) {
	const { hostname, pathname } = url;
	if (hostname.endsWith(".on.aws")) {
		const match$1 = hostname.match(/^[^.]{1,63}\.lambda-url\.([^.]{1,63})\.on\.aws$/);
		return match$1 != null ? ["lambda", match$1[1] || ""] : ["", ""];
	}
	if (hostname.endsWith(".r2.cloudflarestorage.com")) return ["s3", "auto"];
	if (hostname.endsWith(".backblazeb2.com")) {
		const match$1 = hostname.match(/^(?:[^.]{1,63}\.)?s3\.([^.]{1,63})\.backblazeb2\.com$/);
		return match$1 != null ? ["s3", match$1[1] || ""] : ["", ""];
	}
	const match = hostname.replace("dualstack.", "").match(/([^.]{1,63})\.(?:([^.]{0,63})\.)?amazonaws\.com(?:\.cn)?$/);
	let service = match && match[1] || "";
	let region = match && match[2];
	if (region === "us-gov") region = "us-gov-west-1";
	else if (region === "s3" || region === "s3-accelerate") {
		region = "us-east-1";
		service = "s3";
	} else if (service === "iot") if (hostname.startsWith("iot.")) service = "execute-api";
	else if (hostname.startsWith("data.jobs.iot.")) service = "iot-jobs-data";
	else service = pathname === "/mqtt" ? "iotdevicegateway" : "iotdata";
	else if (service === "autoscaling") {
		const targetPrefix = (headers.get("X-Amz-Target") || "").split(".")[0];
		if (targetPrefix === "AnyScaleFrontendService") service = "application-autoscaling";
		else if (targetPrefix === "AnyScaleScalingPlannerFrontendService") service = "autoscaling-plans";
	} else if (region == null && service.startsWith("s3-")) {
		region = service.slice(3).replace(/^fips-|^external-1/, "");
		service = "s3";
	} else if (service.endsWith("-fips")) service = service.slice(0, -5);
	else if (region && /-\d$/.test(service) && !/-\d$/.test(region)) [service, region] = [region, service];
	return [HOST_SERVICES[service] || service, region || ""];
}
var BEDROCK_STOP_REASONS = [
	"stop",
	"stop_sequence",
	"end_turn",
	"length",
	"max_tokens",
	"content-filter",
	"content_filtered",
	"guardrail_intervened",
	"tool-calls",
	"tool_use"
];
var BEDROCK_IMAGE_MIME_TYPES = {
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/gif": "gif",
	"image/webp": "webp"
};
var BEDROCK_DOCUMENT_MIME_TYPES = {
	"application/pdf": "pdf",
	"text/csv": "csv",
	"application/msword": "doc",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
	"application/vnd.ms-excel": "xls",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
	"text/html": "html",
	"text/plain": "txt",
	"text/markdown": "md"
};
var bedrockFilePartProviderOptions = object({ citations: object({ enabled: boolean() }).optional() });
var amazonBedrockLanguageModelOptions = object({
	additionalModelRequestFields: record(string(), any()).optional(),
	reasoningConfig: object({
		type: union([
			literal("enabled"),
			literal("disabled"),
			literal("adaptive")
		]).optional(),
		budgetTokens: number().optional(),
		maxReasoningEffort: _enum([
			"low",
			"medium",
			"high",
			"max"
		]).optional()
	}).optional(),
	anthropicBeta: array(string()).optional()
});
var BedrockErrorSchema = object({
	message: string(),
	type: string().nullish()
});
function createBedrockEventStreamDecoder(body, processEvent) {
	const codec = new EventStreamCodec(toUtf8, fromUtf8);
	let buffer = new Uint8Array(0);
	const textDecoder = new TextDecoder();
	return body.pipeThrough(new TransformStream({ async transform(chunk, controller) {
		var _a, _b;
		const newBuffer = new Uint8Array(buffer.length + chunk.length);
		newBuffer.set(buffer);
		newBuffer.set(chunk, buffer.length);
		buffer = newBuffer;
		while (buffer.length >= 4) {
			const totalLength = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength).getUint32(0, false);
			if (buffer.length < totalLength) break;
			try {
				const subView = buffer.subarray(0, totalLength);
				const decoded = codec.decode(subView);
				buffer = buffer.slice(totalLength);
				await processEvent({
					messageType: (_a = decoded.headers[":message-type"]) == null ? void 0 : _a.value,
					eventType: (_b = decoded.headers[":event-type"]) == null ? void 0 : _b.value,
					data: textDecoder.decode(decoded.body)
				}, controller);
			} catch (e) {
				break;
			}
		}
	} }));
}
var createBedrockEventStreamResponseHandler = (chunkSchema) => async ({ response }) => {
	const responseHeaders = extractResponseHeaders(response);
	if (response.body == null) throw new EmptyResponseBodyError({});
	return {
		responseHeaders,
		value: createBedrockEventStreamDecoder(response.body, async (event, controller) => {
			if (event.messageType === "event") {
				const parsedDataResult = await safeParseJSON({ text: event.data });
				if (!parsedDataResult.success) {
					controller.enqueue(parsedDataResult);
					return;
				}
				delete parsedDataResult.value.p;
				const wrappedData = { [event.eventType]: parsedDataResult.value };
				const validatedWrappedData = await safeValidateTypes({
					value: wrappedData,
					schema: chunkSchema
				});
				if (!validatedWrappedData.success) controller.enqueue(validatedWrappedData);
				else controller.enqueue({
					success: true,
					value: validatedWrappedData.value,
					rawValue: wrappedData
				});
			}
		})
	};
};
async function prepareTools$1({ tools, toolChoice, modelId }) {
	var _a;
	const toolWarnings = [];
	const betas = /* @__PURE__ */ new Set();
	if (tools == null || tools.length === 0) return {
		toolConfig: {},
		additionalTools: void 0,
		betas,
		toolWarnings
	};
	const supportedTools = tools.filter((tool) => {
		if (tool.type === "provider" && tool.id === "anthropic.web_search_20250305") {
			toolWarnings.push({
				type: "unsupported",
				feature: "web_search_20250305 tool",
				details: "The web_search_20250305 tool is not supported on Amazon Bedrock."
			});
			return false;
		}
		return true;
	});
	if (supportedTools.length === 0) return {
		toolConfig: {},
		additionalTools: void 0,
		betas,
		toolWarnings
	};
	const isAnthropicModel = modelId.includes("anthropic.");
	const ProviderTools = supportedTools.filter((t) => t.type === "provider");
	const functionTools = supportedTools.filter((t) => t.type === "function");
	let additionalTools = void 0;
	const bedrockTools = [];
	const usingAnthropicTools = isAnthropicModel && ProviderTools.length > 0;
	if (usingAnthropicTools) {
		const { toolChoice: preparedAnthropicToolChoice, toolWarnings: anthropicToolWarnings, betas: anthropicBetas } = await prepareTools({
			tools: ProviderTools,
			toolChoice,
			supportsStructuredOutput: false
		});
		toolWarnings.push(...anthropicToolWarnings);
		anthropicBetas.forEach((beta) => betas.add(beta));
		if (preparedAnthropicToolChoice) additionalTools = { tool_choice: preparedAnthropicToolChoice };
		for (const tool of ProviderTools) {
			const toolFactory = Object.values(anthropicTools).find((factory) => {
				return factory({}).id === tool.id;
			});
			if (toolFactory != null) {
				const fullToolDefinition = toolFactory({});
				bedrockTools.push({ toolSpec: {
					name: tool.name,
					inputSchema: { json: await asSchema(fullToolDefinition.inputSchema).jsonSchema }
				} });
			} else toolWarnings.push({
				type: "unsupported",
				feature: "tool ${tool.id}"
			});
		}
	} else for (const tool of ProviderTools) toolWarnings.push({
		type: "unsupported",
		feature: `tool ${tool.id}`
	});
	const filteredFunctionTools = (toolChoice == null ? void 0 : toolChoice.type) === "tool" ? functionTools.filter((t) => t.name === toolChoice.toolName) : functionTools;
	for (const tool of filteredFunctionTools) bedrockTools.push({ toolSpec: {
		name: tool.name,
		...((_a = tool.description) == null ? void 0 : _a.trim()) !== "" ? { description: tool.description } : {},
		...tool.strict != null ? { strict: tool.strict } : {},
		inputSchema: { json: tool.inputSchema }
	} });
	let bedrockToolChoice = void 0;
	if (!usingAnthropicTools && bedrockTools.length > 0 && toolChoice) {
		const type = toolChoice.type;
		switch (type) {
			case "auto":
				bedrockToolChoice = { auto: {} };
				break;
			case "required":
				bedrockToolChoice = { any: {} };
				break;
			case "none":
				bedrockTools.length = 0;
				bedrockToolChoice = void 0;
				break;
			case "tool":
				bedrockToolChoice = { tool: { name: toolChoice.toolName } };
				break;
			default: throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${type}` });
		}
	}
	return {
		toolConfig: bedrockTools.length > 0 ? {
			tools: bedrockTools,
			toolChoice: bedrockToolChoice
		} : {},
		additionalTools,
		betas,
		toolWarnings
	};
}
function convertBedrockUsage(usage) {
	var _a, _b;
	if (usage == null) return {
		inputTokens: {
			total: void 0,
			noCache: void 0,
			cacheRead: void 0,
			cacheWrite: void 0
		},
		outputTokens: {
			total: void 0,
			text: void 0,
			reasoning: void 0
		},
		raw: void 0
	};
	const inputTokens = usage.inputTokens;
	const outputTokens = usage.outputTokens;
	const cacheReadTokens = (_a = usage.cacheReadInputTokens) != null ? _a : 0;
	const cacheWriteTokens = (_b = usage.cacheWriteInputTokens) != null ? _b : 0;
	return {
		inputTokens: {
			total: inputTokens + cacheReadTokens + cacheWriteTokens,
			noCache: inputTokens,
			cacheRead: cacheReadTokens,
			cacheWrite: cacheWriteTokens
		},
		outputTokens: {
			total: outputTokens,
			text: outputTokens,
			reasoning: void 0
		},
		raw: usage
	};
}
function isMistralModel(modelId) {
	return modelId.includes("mistral.");
}
function normalizeToolCallId(toolCallId, isMistral) {
	if (!isMistral) return toolCallId;
	return toolCallId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 9);
}
function getCachePoint(providerMetadata) {
	var _a;
	const cachePointConfig = (_a = providerMetadata == null ? void 0 : providerMetadata.bedrock) == null ? void 0 : _a.cachePoint;
	if (!cachePointConfig) return;
	return { cachePoint: cachePointConfig };
}
async function shouldEnableCitations(providerMetadata) {
	var _a, _b;
	const bedrockOptions = await parseProviderOptions({
		provider: "bedrock",
		providerOptions: providerMetadata,
		schema: bedrockFilePartProviderOptions
	});
	return (_b = (_a = bedrockOptions == null ? void 0 : bedrockOptions.citations) == null ? void 0 : _a.enabled) != null ? _b : false;
}
async function convertToBedrockChatMessages(prompt, isMistral = false) {
	var _a, _b;
	const blocks = groupIntoBlocks(prompt);
	let system = [];
	const messages = [];
	let documentCounter = 0;
	const generateDocumentName = () => `document-${++documentCounter}`;
	for (let i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		const isLastBlock = i === blocks.length - 1;
		const type = block.type;
		switch (type) {
			case "system":
				if (messages.length > 0) throw new UnsupportedFunctionalityError({ functionality: "Multiple system messages that are separated by user/assistant messages" });
				for (const message of block.messages) {
					system.push({ text: message.content });
					const cachePoint = getCachePoint(message.providerOptions);
					if (cachePoint) system.push(cachePoint);
				}
				break;
			case "user": {
				const bedrockContent = [];
				for (const message of block.messages) {
					const { role, content, providerOptions } = message;
					switch (role) {
						case "user":
							for (let j = 0; j < content.length; j++) {
								const part = content[j];
								switch (part.type) {
									case "text":
										bedrockContent.push({ text: part.text });
										break;
									case "file":
										if (part.data instanceof URL) throw new UnsupportedFunctionalityError({ functionality: "File URL data" });
										if (part.mediaType.startsWith("image/")) bedrockContent.push({ image: {
											format: getBedrockImageFormat(part.mediaType),
											source: { bytes: convertToBase64(part.data) }
										} });
										else {
											if (!part.mediaType) throw new UnsupportedFunctionalityError({
												functionality: "file without mime type",
												message: "File mime type is required in user message part content"
											});
											const enableCitations = await shouldEnableCitations(part.providerOptions);
											bedrockContent.push({ document: {
												format: getBedrockDocumentFormat(part.mediaType),
												name: (_a = part.filename) != null ? _a : generateDocumentName(),
												source: { bytes: convertToBase64(part.data) },
												...enableCitations && { citations: { enabled: true } }
											} });
										}
										break;
								}
							}
							break;
						case "tool":
							for (const part of content) {
								if (part.type === "tool-approval-response") continue;
								let toolResultContent;
								const output = part.output;
								switch (output.type) {
									case "content":
										toolResultContent = output.value.map((contentPart) => {
											switch (contentPart.type) {
												case "text": return { text: contentPart.text };
												case "image-data":
													if (!contentPart.mediaType.startsWith("image/")) throw new UnsupportedFunctionalityError({ functionality: `media type: ${contentPart.mediaType}` });
													return { image: {
														format: getBedrockImageFormat(contentPart.mediaType),
														source: { bytes: contentPart.data }
													} };
												default: throw new UnsupportedFunctionalityError({ functionality: `unsupported tool content part type: ${contentPart.type}` });
											}
										});
										break;
									case "text":
									case "error-text":
										toolResultContent = [{ text: output.value }];
										break;
									case "execution-denied":
										toolResultContent = [{ text: (_b = output.reason) != null ? _b : "Tool execution denied." }];
										break;
									case "json":
									case "error-json":
									default:
										toolResultContent = [{ text: JSON.stringify(output.value) }];
										break;
								}
								bedrockContent.push({ toolResult: {
									toolUseId: normalizeToolCallId(part.toolCallId, isMistral),
									content: toolResultContent
								} });
							}
							break;
						default: {
							const _exhaustiveCheck = role;
							throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
						}
					}
					const cachePoint = getCachePoint(providerOptions);
					if (cachePoint) bedrockContent.push(cachePoint);
				}
				messages.push({
					role: "user",
					content: bedrockContent
				});
				break;
			}
			case "assistant": {
				const bedrockContent = [];
				for (let j = 0; j < block.messages.length; j++) {
					const message = block.messages[j];
					const isLastMessage = j === block.messages.length - 1;
					const { content } = message;
					for (let k = 0; k < content.length; k++) {
						const part = content[k];
						const isLastContentPart = k === content.length - 1;
						switch (part.type) {
							case "text":
								if (!part.text.trim()) break;
								bedrockContent.push({ text: trimIfLast(isLastBlock, isLastMessage, isLastContentPart, part.text) });
								break;
							case "reasoning": {
								const reasoningMetadata = await parseProviderOptions({
									provider: "bedrock",
									providerOptions: part.providerOptions,
									schema: bedrockReasoningMetadataSchema
								});
								if (reasoningMetadata != null) {
									if (reasoningMetadata.signature != null) bedrockContent.push({ reasoningContent: { reasoningText: {
										text: trimIfLast(isLastBlock, isLastMessage, isLastContentPart, part.text),
										signature: reasoningMetadata.signature
									} } });
									else if (reasoningMetadata.redactedData != null) bedrockContent.push({ reasoningContent: { redactedReasoning: { data: reasoningMetadata.redactedData } } });
								}
								break;
							}
							case "tool-call":
								bedrockContent.push({ toolUse: {
									toolUseId: normalizeToolCallId(part.toolCallId, isMistral),
									name: part.toolName,
									input: part.input
								} });
								break;
						}
					}
					const cachePoint = getCachePoint(message.providerOptions);
					if (cachePoint) bedrockContent.push(cachePoint);
				}
				messages.push({
					role: "assistant",
					content: bedrockContent
				});
				break;
			}
			default: {
				const _exhaustiveCheck = type;
				throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
			}
		}
	}
	return {
		system,
		messages
	};
}
function getBedrockImageFormat(mimeType) {
	if (!mimeType) throw new UnsupportedFunctionalityError({
		functionality: "image without mime type",
		message: "Image mime type is required in user message part content"
	});
	const format = BEDROCK_IMAGE_MIME_TYPES[mimeType];
	if (!format) throw new UnsupportedFunctionalityError({
		functionality: `image mime type: ${mimeType}`,
		message: `Unsupported image mime type: ${mimeType}, expected one of: ${Object.keys(BEDROCK_IMAGE_MIME_TYPES).join(", ")}`
	});
	return format;
}
function getBedrockDocumentFormat(mimeType) {
	const format = BEDROCK_DOCUMENT_MIME_TYPES[mimeType];
	if (!format) throw new UnsupportedFunctionalityError({
		functionality: `file mime type: ${mimeType}`,
		message: `Unsupported file mime type: ${mimeType}, expected one of: ${Object.keys(BEDROCK_DOCUMENT_MIME_TYPES).join(", ")}`
	});
	return format;
}
function trimIfLast(isLastBlock, isLastMessage, isLastContentPart, text) {
	return isLastBlock && isLastMessage && isLastContentPart ? text.trim() : text;
}
function groupIntoBlocks(prompt) {
	const blocks = [];
	let currentBlock = void 0;
	for (const message of prompt) {
		const { role } = message;
		switch (role) {
			case "system":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "system") {
					currentBlock = {
						type: "system",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "assistant":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "assistant") {
					currentBlock = {
						type: "assistant",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "user":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
					currentBlock = {
						type: "user",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			case "tool":
				if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
					currentBlock = {
						type: "user",
						messages: []
					};
					blocks.push(currentBlock);
				}
				currentBlock.messages.push(message);
				break;
			default: {
				const _exhaustiveCheck = role;
				throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
			}
		}
	}
	return blocks;
}
function mapBedrockFinishReason(finishReason, isJsonResponseFromTool) {
	switch (finishReason) {
		case "stop_sequence":
		case "end_turn": return "stop";
		case "max_tokens": return "length";
		case "content_filtered":
		case "guardrail_intervened": return "content-filter";
		case "tool_use": return isJsonResponseFromTool ? "stop" : "tool-calls";
		default: return "other";
	}
}
var BedrockChatLanguageModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v3";
		this.provider = "amazon-bedrock";
		this.supportedUrls = {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions }) {
		var _a, _b, _c, _d, _e, _f, _g, _h;
		const bedrockOptions = (_a = await parseProviderOptions({
			provider: "bedrock",
			providerOptions,
			schema: amazonBedrockLanguageModelOptions
		})) != null ? _a : {};
		const warnings = [];
		if (frequencyPenalty != null) warnings.push({
			type: "unsupported",
			feature: "frequencyPenalty"
		});
		if (presencePenalty != null) warnings.push({
			type: "unsupported",
			feature: "presencePenalty"
		});
		if (seed != null) warnings.push({
			type: "unsupported",
			feature: "seed"
		});
		if (temperature != null && temperature > 1) {
			warnings.push({
				type: "unsupported",
				feature: "temperature",
				details: `${temperature} exceeds bedrock maximum of 1.0. clamped to 1.0`
			});
			temperature = 1;
		} else if (temperature != null && temperature < 0) {
			warnings.push({
				type: "unsupported",
				feature: "temperature",
				details: `${temperature} is below bedrock minimum of 0. clamped to 0`
			});
			temperature = 0;
		}
		if (responseFormat != null && responseFormat.type !== "text" && responseFormat.type !== "json") warnings.push({
			type: "unsupported",
			feature: "responseFormat",
			details: "Only text and json response formats are supported."
		});
		const jsonResponseTool = (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null ? {
			type: "function",
			name: "json",
			description: "Respond with a JSON object.",
			inputSchema: responseFormat.schema
		} : void 0;
		const { toolConfig, additionalTools, toolWarnings, betas } = await prepareTools$1({
			tools: jsonResponseTool ? [...tools != null ? tools : [], jsonResponseTool] : tools,
			toolChoice: jsonResponseTool != null ? { type: "required" } : toolChoice,
			modelId: this.modelId
		});
		warnings.push(...toolWarnings);
		if (additionalTools) bedrockOptions.additionalModelRequestFields = {
			...bedrockOptions.additionalModelRequestFields,
			...additionalTools
		};
		if (betas.size > 0 || bedrockOptions.anthropicBeta) {
			const existingBetas = (_b = bedrockOptions.anthropicBeta) != null ? _b : [];
			const mergedBetas = betas.size > 0 ? [...existingBetas, ...Array.from(betas)] : existingBetas;
			bedrockOptions.additionalModelRequestFields = {
				...bedrockOptions.additionalModelRequestFields,
				anthropic_beta: mergedBetas
			};
		}
		const isAnthropicModel = this.modelId.includes("anthropic");
		const thinkingType = (_c = bedrockOptions.reasoningConfig) == null ? void 0 : _c.type;
		const isThinkingRequested = thinkingType === "enabled" || thinkingType === "adaptive";
		const thinkingBudget = thinkingType === "enabled" ? (_d = bedrockOptions.reasoningConfig) == null ? void 0 : _d.budgetTokens : void 0;
		const isAnthropicThinkingEnabled = isAnthropicModel && isThinkingRequested;
		const inferenceConfig = {
			...maxOutputTokens != null && { maxTokens: maxOutputTokens },
			...temperature != null && { temperature },
			...topP != null && { topP },
			...topK != null && { topK },
			...stopSequences != null && { stopSequences }
		};
		if (isAnthropicThinkingEnabled) {
			if (thinkingBudget != null) {
				if (inferenceConfig.maxTokens != null) inferenceConfig.maxTokens += thinkingBudget;
				else inferenceConfig.maxTokens = thinkingBudget + 4096;
				bedrockOptions.additionalModelRequestFields = {
					...bedrockOptions.additionalModelRequestFields,
					thinking: {
						type: "enabled",
						budget_tokens: thinkingBudget
					}
				};
			} else if (thinkingType === "adaptive") bedrockOptions.additionalModelRequestFields = {
				...bedrockOptions.additionalModelRequestFields,
				thinking: { type: "adaptive" }
			};
		} else if (!isAnthropicModel) {
			if (((_e = bedrockOptions.reasoningConfig) == null ? void 0 : _e.budgetTokens) != null) warnings.push({
				type: "unsupported",
				feature: "budgetTokens",
				details: "budgetTokens applies only to Anthropic models on Bedrock and will be ignored for this model."
			});
			if (thinkingType === "adaptive") warnings.push({
				type: "unsupported",
				feature: "adaptive thinking",
				details: "adaptive thinking type applies only to Anthropic models on Bedrock."
			});
		}
		const maxReasoningEffort = (_f = bedrockOptions.reasoningConfig) == null ? void 0 : _f.maxReasoningEffort;
		const isOpenAIModel = this.modelId.startsWith("openai.");
		if (maxReasoningEffort != null) if (isAnthropicModel) bedrockOptions.additionalModelRequestFields = {
			...bedrockOptions.additionalModelRequestFields,
			output_config: { effort: maxReasoningEffort }
		};
		else if (isOpenAIModel) bedrockOptions.additionalModelRequestFields = {
			...bedrockOptions.additionalModelRequestFields,
			reasoning_effort: maxReasoningEffort
		};
		else bedrockOptions.additionalModelRequestFields = {
			...bedrockOptions.additionalModelRequestFields,
			reasoningConfig: {
				...thinkingType != null && thinkingType !== "adaptive" && { type: thinkingType },
				...thinkingBudget != null && { budgetTokens: thinkingBudget },
				maxReasoningEffort
			}
		};
		if (isAnthropicThinkingEnabled && inferenceConfig.temperature != null) {
			delete inferenceConfig.temperature;
			warnings.push({
				type: "unsupported",
				feature: "temperature",
				details: "temperature is not supported when thinking is enabled"
			});
		}
		if (isAnthropicThinkingEnabled && inferenceConfig.topP != null) {
			delete inferenceConfig.topP;
			warnings.push({
				type: "unsupported",
				feature: "topP",
				details: "topP is not supported when thinking is enabled"
			});
		}
		if (isAnthropicThinkingEnabled && inferenceConfig.topK != null) {
			delete inferenceConfig.topK;
			warnings.push({
				type: "unsupported",
				feature: "topK",
				details: "topK is not supported when thinking is enabled"
			});
		}
		const hasAnyTools = ((_h = (_g = toolConfig.tools) == null ? void 0 : _g.length) != null ? _h : 0) > 0 || additionalTools;
		let filteredPrompt = prompt;
		if (!hasAnyTools) {
			if (prompt.some((message) => "content" in message && Array.isArray(message.content) && message.content.some((part) => part.type === "tool-call" || part.type === "tool-result"))) {
				filteredPrompt = prompt.map((message) => message.role === "system" ? message : {
					...message,
					content: message.content.filter((part) => part.type !== "tool-call" && part.type !== "tool-result")
				}).filter((message) => message.role === "system" || message.content.length > 0);
				warnings.push({
					type: "unsupported",
					feature: "toolContent",
					details: "Tool calls and results removed from conversation because Bedrock does not support tool content without active tools."
				});
			}
		}
		const isMistral = isMistralModel(this.modelId);
		const { system, messages } = await convertToBedrockChatMessages(filteredPrompt, isMistral);
		const { reasoningConfig: _, additionalModelRequestFields: __, ...filteredBedrockOptions } = (providerOptions == null ? void 0 : providerOptions.bedrock) || {};
		const additionalModelResponseFieldPaths = isAnthropicModel ? ["/delta/stop_sequence"] : void 0;
		return {
			command: {
				system,
				messages,
				additionalModelRequestFields: bedrockOptions.additionalModelRequestFields,
				...additionalModelResponseFieldPaths && { additionalModelResponseFieldPaths },
				...Object.keys(inferenceConfig).length > 0 && { inferenceConfig },
				...filteredBedrockOptions,
				...toolConfig.tools !== void 0 && toolConfig.tools.length > 0 ? { toolConfig } : {}
			},
			warnings,
			usesJsonResponseTool: jsonResponseTool != null,
			betas
		};
	}
	async getHeaders({ headers }) {
		return combineHeaders(await resolve(this.config.headers), headers);
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
		const { command: args, warnings, usesJsonResponseTool } = await this.getArgs(options);
		const { value: response, responseHeaders } = await postJsonToApi({
			url: `${this.getUrl(this.modelId)}/converse`,
			headers: await this.getHeaders({ headers: options.headers }),
			body: args,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => {
					var _a2;
					return `${(_a2 = error.message) != null ? _a2 : "Unknown error"}`;
				}
			}),
			successfulResponseHandler: createJsonResponseHandler(BedrockResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const content = [];
		let isJsonResponseFromTool = false;
		for (const part of response.output.message.content) {
			if (part.text) content.push({
				type: "text",
				text: part.text
			});
			if (part.reasoningContent) {
				if ("reasoningText" in part.reasoningContent) {
					const reasoning = {
						type: "reasoning",
						text: part.reasoningContent.reasoningText.text
					};
					if (part.reasoningContent.reasoningText.signature) reasoning.providerMetadata = { bedrock: { signature: part.reasoningContent.reasoningText.signature } };
					content.push(reasoning);
				} else if ("redactedReasoning" in part.reasoningContent) content.push({
					type: "reasoning",
					text: "",
					providerMetadata: { bedrock: { redactedData: (_a = part.reasoningContent.redactedReasoning.data) != null ? _a : "" } }
				});
			}
			if (part.toolUse) if (usesJsonResponseTool && part.toolUse.name === "json") {
				isJsonResponseFromTool = true;
				content.push({
					type: "text",
					text: JSON.stringify(part.toolUse.input)
				});
			} else {
				const isMistral = isMistralModel(this.modelId);
				const rawToolCallId = (_c = (_b = part.toolUse) == null ? void 0 : _b.toolUseId) != null ? _c : this.config.generateId();
				content.push({
					type: "tool-call",
					toolCallId: normalizeToolCallId(rawToolCallId, isMistral),
					toolName: (_e = (_d = part.toolUse) == null ? void 0 : _d.name) != null ? _e : `tool-${this.config.generateId()}`,
					input: JSON.stringify((_g = (_f = part.toolUse) == null ? void 0 : _f.input) != null ? _g : {})
				});
			}
		}
		const stopSequence = (_j = (_i = (_h = response.additionalModelResponseFields) == null ? void 0 : _h.delta) == null ? void 0 : _i.stop_sequence) != null ? _j : null;
		const providerMetadata = response.trace || response.usage || response.performanceConfig || response.serviceTier || isJsonResponseFromTool || stopSequence ? { bedrock: {
			...response.trace && typeof response.trace === "object" ? { trace: response.trace } : {},
			...response.performanceConfig && { performanceConfig: response.performanceConfig },
			...response.serviceTier && { serviceTier: response.serviceTier },
			...(((_k = response.usage) == null ? void 0 : _k.cacheWriteInputTokens) != null || ((_l = response.usage) == null ? void 0 : _l.cacheDetails) != null) && { usage: {
				...response.usage.cacheWriteInputTokens != null && { cacheWriteInputTokens: response.usage.cacheWriteInputTokens },
				...response.usage.cacheDetails != null && { cacheDetails: response.usage.cacheDetails }
			} },
			...isJsonResponseFromTool && { isJsonResponseFromTool: true },
			stopSequence
		} } : void 0;
		return {
			content,
			finishReason: {
				unified: mapBedrockFinishReason(response.stopReason, isJsonResponseFromTool),
				raw: (_m = response.stopReason) != null ? _m : void 0
			},
			usage: convertBedrockUsage(response.usage),
			response: {
				id: (_n = responseHeaders == null ? void 0 : responseHeaders["x-amzn-requestid"]) != null ? _n : void 0,
				timestamp: (responseHeaders == null ? void 0 : responseHeaders["date"]) != null ? new Date(responseHeaders["date"]) : void 0,
				modelId: this.modelId,
				headers: responseHeaders
			},
			warnings,
			...providerMetadata && { providerMetadata }
		};
	}
	async doStream(options) {
		const { command: args, warnings, usesJsonResponseTool } = await this.getArgs(options);
		const modelId = this.modelId;
		const isMistral = isMistralModel(modelId);
		const { value: response, responseHeaders } = await postJsonToApi({
			url: `${this.getUrl(modelId)}/converse-stream`,
			headers: await this.getHeaders({ headers: options.headers }),
			body: args,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => `${error.type}: ${error.message}`
			}),
			successfulResponseHandler: createBedrockEventStreamResponseHandler(BedrockStreamSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = {
			unified: "other",
			raw: void 0
		};
		let usage = void 0;
		let providerMetadata = void 0;
		let isJsonResponseFromTool = false;
		let stopSequence = null;
		const contentBlocks = {};
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					var _a;
					controller.enqueue({
						type: "stream-start",
						warnings
					});
					controller.enqueue({
						type: "response-metadata",
						id: (_a = responseHeaders == null ? void 0 : responseHeaders["x-amzn-requestid"]) != null ? _a : void 0,
						timestamp: (responseHeaders == null ? void 0 : responseHeaders["date"]) != null ? new Date(responseHeaders["date"]) : void 0,
						modelId
					});
				},
				transform(chunk, controller) {
					var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
					function enqueueError(bedrockError) {
						finishReason = {
							unified: "error",
							raw: void 0
						};
						controller.enqueue({
							type: "error",
							error: bedrockError
						});
					}
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						enqueueError(chunk.error);
						return;
					}
					const value = chunk.value;
					if (value.internalServerException) {
						enqueueError(value.internalServerException);
						return;
					}
					if (value.modelStreamErrorException) {
						enqueueError(value.modelStreamErrorException);
						return;
					}
					if (value.throttlingException) {
						enqueueError(value.throttlingException);
						return;
					}
					if (value.validationException) {
						enqueueError(value.validationException);
						return;
					}
					if (value.messageStop) {
						finishReason = {
							unified: mapBedrockFinishReason(value.messageStop.stopReason, isJsonResponseFromTool),
							raw: (_a = value.messageStop.stopReason) != null ? _a : void 0
						};
						stopSequence = (_d = (_c = (_b = value.messageStop.additionalModelResponseFields) == null ? void 0 : _b.delta) == null ? void 0 : _c.stop_sequence) != null ? _d : null;
					}
					if (value.metadata) {
						if (value.metadata.usage) usage = value.metadata.usage;
						const cacheUsage = ((_e = value.metadata.usage) == null ? void 0 : _e.cacheWriteInputTokens) != null || ((_f = value.metadata.usage) == null ? void 0 : _f.cacheDetails) != null ? { usage: {
							...((_g = value.metadata.usage) == null ? void 0 : _g.cacheWriteInputTokens) != null && { cacheWriteInputTokens: value.metadata.usage.cacheWriteInputTokens },
							...((_h = value.metadata.usage) == null ? void 0 : _h.cacheDetails) != null && { cacheDetails: value.metadata.usage.cacheDetails }
						} } : void 0;
						const trace = value.metadata.trace ? { trace: value.metadata.trace } : void 0;
						if (cacheUsage || trace || value.metadata.performanceConfig || value.metadata.serviceTier) providerMetadata = { bedrock: {
							...cacheUsage,
							...trace,
							...value.metadata.performanceConfig && { performanceConfig: value.metadata.performanceConfig },
							...value.metadata.serviceTier && { serviceTier: value.metadata.serviceTier }
						} };
					}
					if (((_i = value.contentBlockStart) == null ? void 0 : _i.contentBlockIndex) != null && !((_k = (_j = value.contentBlockStart) == null ? void 0 : _j.start) == null ? void 0 : _k.toolUse)) {
						const blockIndex = value.contentBlockStart.contentBlockIndex;
						contentBlocks[blockIndex] = { type: "text" };
						controller.enqueue({
							type: "text-start",
							id: String(blockIndex)
						});
					}
					if (((_l = value.contentBlockDelta) == null ? void 0 : _l.delta) && "text" in value.contentBlockDelta.delta && value.contentBlockDelta.delta.text) {
						const blockIndex = value.contentBlockDelta.contentBlockIndex || 0;
						if (contentBlocks[blockIndex] == null) {
							contentBlocks[blockIndex] = { type: "text" };
							controller.enqueue({
								type: "text-start",
								id: String(blockIndex)
							});
						}
						controller.enqueue({
							type: "text-delta",
							id: String(blockIndex),
							delta: value.contentBlockDelta.delta.text
						});
					}
					if (((_m = value.contentBlockStop) == null ? void 0 : _m.contentBlockIndex) != null) {
						const blockIndex = value.contentBlockStop.contentBlockIndex;
						const contentBlock = contentBlocks[blockIndex];
						if (contentBlock != null) {
							if (contentBlock.type === "reasoning") controller.enqueue({
								type: "reasoning-end",
								id: String(blockIndex)
							});
							else if (contentBlock.type === "text") controller.enqueue({
								type: "text-end",
								id: String(blockIndex)
							});
							else if (contentBlock.type === "tool-call") if (contentBlock.isJsonResponseTool) {
								isJsonResponseFromTool = true;
								controller.enqueue({
									type: "text-start",
									id: String(blockIndex)
								});
								controller.enqueue({
									type: "text-delta",
									id: String(blockIndex),
									delta: contentBlock.jsonText
								});
								controller.enqueue({
									type: "text-end",
									id: String(blockIndex)
								});
							} else {
								controller.enqueue({
									type: "tool-input-end",
									id: contentBlock.toolCallId
								});
								controller.enqueue({
									type: "tool-call",
									toolCallId: contentBlock.toolCallId,
									toolName: contentBlock.toolName,
									input: contentBlock.jsonText === "" ? "{}" : contentBlock.jsonText
								});
							}
							delete contentBlocks[blockIndex];
						}
					}
					if (((_n = value.contentBlockDelta) == null ? void 0 : _n.delta) && "reasoningContent" in value.contentBlockDelta.delta && value.contentBlockDelta.delta.reasoningContent) {
						const blockIndex = value.contentBlockDelta.contentBlockIndex || 0;
						const reasoningContent = value.contentBlockDelta.delta.reasoningContent;
						if ("text" in reasoningContent && reasoningContent.text) {
							if (contentBlocks[blockIndex] == null) {
								contentBlocks[blockIndex] = { type: "reasoning" };
								controller.enqueue({
									type: "reasoning-start",
									id: String(blockIndex)
								});
							}
							controller.enqueue({
								type: "reasoning-delta",
								id: String(blockIndex),
								delta: reasoningContent.text
							});
						} else if ("signature" in reasoningContent && reasoningContent.signature) controller.enqueue({
							type: "reasoning-delta",
							id: String(blockIndex),
							delta: "",
							providerMetadata: { bedrock: { signature: reasoningContent.signature } }
						});
						else if ("data" in reasoningContent && reasoningContent.data) controller.enqueue({
							type: "reasoning-delta",
							id: String(blockIndex),
							delta: "",
							providerMetadata: { bedrock: { redactedData: reasoningContent.data } }
						});
					}
					const contentBlockStart = value.contentBlockStart;
					if (((_o = contentBlockStart == null ? void 0 : contentBlockStart.start) == null ? void 0 : _o.toolUse) != null) {
						const toolUse = contentBlockStart.start.toolUse;
						const blockIndex = contentBlockStart.contentBlockIndex;
						const isJsonResponseTool = usesJsonResponseTool && toolUse.name === "json";
						const normalizedToolCallId = normalizeToolCallId(toolUse.toolUseId, isMistral);
						contentBlocks[blockIndex] = {
							type: "tool-call",
							toolCallId: normalizedToolCallId,
							toolName: toolUse.name,
							jsonText: "",
							isJsonResponseTool
						};
						if (!isJsonResponseTool) controller.enqueue({
							type: "tool-input-start",
							id: normalizedToolCallId,
							toolName: toolUse.name
						});
					}
					const contentBlockDelta = value.contentBlockDelta;
					if ((contentBlockDelta == null ? void 0 : contentBlockDelta.delta) && "toolUse" in contentBlockDelta.delta && contentBlockDelta.delta.toolUse) {
						const contentBlock = contentBlocks[contentBlockDelta.contentBlockIndex];
						if ((contentBlock == null ? void 0 : contentBlock.type) === "tool-call") {
							const delta = (_p = contentBlockDelta.delta.toolUse.input) != null ? _p : "";
							if (!contentBlock.isJsonResponseTool) controller.enqueue({
								type: "tool-input-delta",
								id: contentBlock.toolCallId,
								delta
							});
							contentBlock.jsonText += delta;
						}
					}
				},
				flush(controller) {
					if (isJsonResponseFromTool || stopSequence != null) if (providerMetadata) providerMetadata.bedrock = {
						...providerMetadata.bedrock,
						...isJsonResponseFromTool && { isJsonResponseFromTool: true },
						stopSequence
					};
					else providerMetadata = { bedrock: {
						...isJsonResponseFromTool && { isJsonResponseFromTool: true },
						stopSequence
					} };
					controller.enqueue({
						type: "finish",
						finishReason,
						usage: convertBedrockUsage(usage),
						...providerMetadata && { providerMetadata }
					});
				}
			})),
			response: { headers: responseHeaders }
		};
	}
	getUrl(modelId) {
		const encodedModelId = encodeURIComponent(modelId);
		return `${this.config.baseUrl()}/model/${encodedModelId}`;
	}
};
var BedrockStopReasonSchema = union([_enum(BEDROCK_STOP_REASONS), string()]);
var BedrockAdditionalModelResponseFieldsSchema = object({ delta: object({ stop_sequence: string().nullish() }).nullish() }).catchall(unknown());
var BedrockToolUseSchema = object({
	toolUseId: string(),
	name: string(),
	input: unknown()
});
var BedrockReasoningTextSchema = object({
	signature: string().nullish(),
	text: string()
});
var BedrockRedactedReasoningSchema = object({ data: string() });
var BedrockResponseSchema = object({
	metrics: object({ latencyMs: number() }).nullish(),
	output: object({ message: object({
		content: array(object({
			text: string().nullish(),
			toolUse: BedrockToolUseSchema.nullish(),
			reasoningContent: union([object({ reasoningText: BedrockReasoningTextSchema }), object({ redactedReasoning: BedrockRedactedReasoningSchema })]).nullish()
		})),
		role: string()
	}) }),
	stopReason: BedrockStopReasonSchema,
	additionalModelResponseFields: BedrockAdditionalModelResponseFieldsSchema.nullish(),
	trace: unknown().nullish(),
	performanceConfig: object({ latency: string() }).nullish(),
	serviceTier: object({ type: string() }).nullish(),
	usage: object({
		inputTokens: number(),
		outputTokens: number(),
		totalTokens: number(),
		cacheReadInputTokens: number().nullish(),
		cacheWriteInputTokens: number().nullish(),
		cacheDetails: array(object({
			inputTokens: number(),
			ttl: string()
		})).nullish()
	})
});
var BedrockStreamSchema = object({
	contentBlockDelta: object({
		contentBlockIndex: number(),
		delta: union([
			object({ text: string() }),
			object({ toolUse: object({ input: string() }) }),
			object({ reasoningContent: object({ text: string() }) }),
			object({ reasoningContent: object({ signature: string() }) }),
			object({ reasoningContent: object({ data: string() }) })
		]).nullish()
	}).nullish(),
	contentBlockStart: object({
		contentBlockIndex: number(),
		start: object({ toolUse: BedrockToolUseSchema.nullish() }).nullish()
	}).nullish(),
	contentBlockStop: object({ contentBlockIndex: number() }).nullish(),
	internalServerException: record(string(), unknown()).nullish(),
	messageStop: object({
		additionalModelResponseFields: BedrockAdditionalModelResponseFieldsSchema.nullish(),
		stopReason: BedrockStopReasonSchema
	}).nullish(),
	metadata: object({
		trace: unknown().nullish(),
		performanceConfig: object({ latency: string() }).nullish(),
		serviceTier: object({ type: string() }).nullish(),
		usage: object({
			cacheReadInputTokens: number().nullish(),
			cacheWriteInputTokens: number().nullish(),
			cacheDetails: array(object({
				inputTokens: number(),
				ttl: string()
			})).nullish(),
			inputTokens: number(),
			outputTokens: number()
		}).nullish()
	}).nullish(),
	modelStreamErrorException: record(string(), unknown()).nullish(),
	throttlingException: record(string(), unknown()).nullish(),
	validationException: record(string(), unknown()).nullish()
});
var bedrockReasoningMetadataSchema = object({
	signature: string().optional(),
	redactedData: string().optional()
});
var amazonBedrockEmbeddingModelOptionsSchema = object({
	dimensions: union([
		literal(1024),
		literal(512),
		literal(256)
	]).optional(),
	normalize: boolean().optional(),
	embeddingDimension: union([
		literal(256),
		literal(384),
		literal(1024),
		literal(3072)
	]).optional(),
	embeddingPurpose: _enum([
		"GENERIC_INDEX",
		"TEXT_RETRIEVAL",
		"IMAGE_RETRIEVAL",
		"VIDEO_RETRIEVAL",
		"DOCUMENT_RETRIEVAL",
		"AUDIO_RETRIEVAL",
		"GENERIC_RETRIEVAL",
		"CLASSIFICATION",
		"CLUSTERING"
	]).optional(),
	inputType: _enum([
		"search_document",
		"search_query",
		"classification",
		"clustering"
	]).optional(),
	truncate: _enum([
		"NONE",
		"START",
		"END"
	]).optional(),
	outputDimension: union([
		literal(256),
		literal(512),
		literal(1024),
		literal(1536)
	]).optional()
});
var BedrockEmbeddingModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v3";
		this.provider = "amazon-bedrock";
		this.maxEmbeddingsPerCall = 1;
		this.supportsParallelCalls = true;
	}
	getUrl(modelId) {
		const encodedModelId = encodeURIComponent(modelId);
		return `${this.config.baseUrl()}/model/${encodedModelId}/invoke`;
	}
	async doEmbed({ values, headers, abortSignal, providerOptions }) {
		var _a, _b, _c, _d, _e, _f;
		if (values.length > this.maxEmbeddingsPerCall) throw new TooManyEmbeddingValuesForCallError({
			provider: this.provider,
			modelId: this.modelId,
			maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
			values
		});
		const bedrockOptions = (_a = await parseProviderOptions({
			provider: "bedrock",
			providerOptions,
			schema: amazonBedrockEmbeddingModelOptionsSchema
		})) != null ? _a : {};
		const isNovaModel = this.modelId.startsWith("amazon.nova-") && this.modelId.includes("embed");
		const isCohereModel = this.modelId.startsWith("cohere.embed-");
		const args = isNovaModel ? {
			taskType: "SINGLE_EMBEDDING",
			singleEmbeddingParams: {
				embeddingPurpose: (_b = bedrockOptions.embeddingPurpose) != null ? _b : "GENERIC_INDEX",
				embeddingDimension: (_c = bedrockOptions.embeddingDimension) != null ? _c : 1024,
				text: {
					truncationMode: (_d = bedrockOptions.truncate) != null ? _d : "END",
					value: values[0]
				}
			}
		} : isCohereModel ? {
			input_type: (_e = bedrockOptions.inputType) != null ? _e : "search_query",
			texts: [values[0]],
			truncate: bedrockOptions.truncate,
			output_dimension: bedrockOptions.outputDimension
		} : {
			inputText: values[0],
			dimensions: bedrockOptions.dimensions,
			normalize: bedrockOptions.normalize
		};
		const { value: response } = await postJsonToApi({
			url: this.getUrl(this.modelId),
			headers: await resolve(combineHeaders(await resolve(this.config.headers), headers)),
			body: args,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => `${error.type}: ${error.message}`
			}),
			successfulResponseHandler: createJsonResponseHandler(BedrockEmbeddingResponseSchema),
			fetch: this.config.fetch,
			abortSignal
		});
		let embedding;
		if ("embedding" in response) embedding = response.embedding;
		else if (Array.isArray(response.embeddings)) {
			const firstEmbedding = response.embeddings[0];
			if (typeof firstEmbedding === "object" && firstEmbedding !== null && "embeddingType" in firstEmbedding) embedding = firstEmbedding.embedding;
			else embedding = firstEmbedding;
		} else embedding = response.embeddings.float[0];
		const tokens = "inputTextTokenCount" in response ? response.inputTextTokenCount : "inputTokenCount" in response ? (_f = response.inputTokenCount) != null ? _f : 0 : NaN;
		return {
			embeddings: [embedding],
			usage: { tokens },
			warnings: []
		};
	}
};
var BedrockEmbeddingResponseSchema = union([
	object({
		embedding: array(number()),
		inputTextTokenCount: number()
	}),
	object({
		embeddings: array(object({
			embeddingType: string(),
			embedding: array(number())
		})),
		inputTokenCount: number().optional()
	}),
	object({ embeddings: array(array(number())) }),
	object({ embeddings: object({ float: array(array(number())) }) })
]);
var modelMaxImagesPerCall = { "amazon.nova-canvas-v1:0": 5 };
var BedrockImageModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v3";
		this.provider = "amazon-bedrock";
	}
	get maxImagesPerCall() {
		var _a;
		return (_a = modelMaxImagesPerCall[this.modelId]) != null ? _a : 1;
	}
	getUrl(modelId) {
		const encodedModelId = encodeURIComponent(modelId);
		return `${this.config.baseUrl()}/model/${encodedModelId}/invoke`;
	}
	async doGenerate({ prompt, n, size, aspectRatio, seed, providerOptions, headers, abortSignal, files, mask }) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
		const warnings = [];
		const [width, height] = size ? size.split("x").map(Number) : [];
		const hasFiles = files != null && files.length > 0;
		const imageGenerationConfig = {
			...width ? { width } : {},
			...height ? { height } : {},
			...seed ? { seed } : {},
			...n ? { numberOfImages: n } : {},
			...((_a = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _a.quality) ? { quality: providerOptions.bedrock.quality } : {},
			...((_b = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _b.cfgScale) ? { cfgScale: providerOptions.bedrock.cfgScale } : {}
		};
		let args;
		if (hasFiles) {
			const hasMask = (mask == null ? void 0 : mask.type) != null;
			const hasMaskPrompt = ((_c = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _c.maskPrompt) != null;
			const taskType = (_e = (_d = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _d.taskType) != null ? _e : hasMask || hasMaskPrompt ? "INPAINTING" : "IMAGE_VARIATION";
			const sourceImageBase64 = getBase64Data(files[0]);
			switch (taskType) {
				case "INPAINTING": {
					const inPaintingParams = {
						image: sourceImageBase64,
						...prompt ? { text: prompt } : {},
						...((_f = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _f.negativeText) ? { negativeText: providerOptions.bedrock.negativeText } : {}
					};
					if (hasMask) inPaintingParams.maskImage = getBase64Data(mask);
					else if (hasMaskPrompt) inPaintingParams.maskPrompt = providerOptions.bedrock.maskPrompt;
					args = {
						taskType: "INPAINTING",
						inPaintingParams,
						imageGenerationConfig
					};
					break;
				}
				case "OUTPAINTING": {
					const outPaintingParams = {
						image: sourceImageBase64,
						...prompt ? { text: prompt } : {},
						...((_g = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _g.negativeText) ? { negativeText: providerOptions.bedrock.negativeText } : {},
						...((_h = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _h.outPaintingMode) ? { outPaintingMode: providerOptions.bedrock.outPaintingMode } : {}
					};
					if (hasMask) outPaintingParams.maskImage = getBase64Data(mask);
					else if (hasMaskPrompt) outPaintingParams.maskPrompt = providerOptions.bedrock.maskPrompt;
					args = {
						taskType: "OUTPAINTING",
						outPaintingParams,
						imageGenerationConfig
					};
					break;
				}
				case "BACKGROUND_REMOVAL":
					args = {
						taskType: "BACKGROUND_REMOVAL",
						backgroundRemovalParams: { image: sourceImageBase64 }
					};
					break;
				case "IMAGE_VARIATION":
					args = {
						taskType: "IMAGE_VARIATION",
						imageVariationParams: {
							images: files.map((file) => getBase64Data(file)),
							...prompt ? { text: prompt } : {},
							...((_i = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _i.negativeText) ? { negativeText: providerOptions.bedrock.negativeText } : {},
							...((_j = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _j.similarityStrength) != null ? { similarityStrength: providerOptions.bedrock.similarityStrength } : {}
						},
						imageGenerationConfig
					};
					break;
				default: throw new Error(`Unsupported task type: ${taskType}`);
			}
		} else args = {
			taskType: "TEXT_IMAGE",
			textToImageParams: {
				text: prompt,
				...((_k = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _k.negativeText) ? { negativeText: providerOptions.bedrock.negativeText } : {},
				...((_l = providerOptions == null ? void 0 : providerOptions.bedrock) == null ? void 0 : _l.style) ? { style: providerOptions.bedrock.style } : {}
			},
			imageGenerationConfig
		};
		if (aspectRatio != void 0) warnings.push({
			type: "unsupported",
			feature: "aspectRatio",
			details: "This model does not support aspect ratio. Use `size` instead."
		});
		const currentDate = (_o = (_n = (_m = this.config._internal) == null ? void 0 : _m.currentDate) == null ? void 0 : _n.call(_m)) != null ? _o : /* @__PURE__ */ new Date();
		const { value: response, responseHeaders } = await postJsonToApi({
			url: this.getUrl(this.modelId),
			headers: await resolve(combineHeaders(await resolve(this.config.headers), headers)),
			body: args,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => `${error.type}: ${error.message}`
			}),
			successfulResponseHandler: createJsonResponseHandler(bedrockImageResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		if (response.status === "Request Moderated") {
			const moderationReasons = (_p = response.details) == null ? void 0 : _p["Moderation Reasons"];
			const reasons = Array.isArray(moderationReasons) ? moderationReasons : ["Unknown"];
			throw new Error(`Amazon Bedrock request was moderated: ${reasons.join(", ")}`);
		}
		if (!response.images || response.images.length === 0) throw new Error("Amazon Bedrock returned no images. " + (response.status ? `Status: ${response.status}` : ""));
		return {
			images: response.images,
			warnings,
			response: {
				timestamp: currentDate,
				modelId: this.modelId,
				headers: responseHeaders
			}
		};
	}
};
function getBase64Data(file) {
	if (file.type === "url") throw new Error("URL-based images are not supported for Amazon Bedrock image editing. Please provide the image data directly.");
	if (file.data instanceof Uint8Array) return convertUint8ArrayToBase64(file.data);
	return file.data;
}
var bedrockImageResponseSchema = object({
	images: array(string()).optional(),
	id: string().optional(),
	status: string().optional(),
	result: unknown().optional(),
	progress: unknown().optional(),
	details: record(string(), unknown()).optional(),
	preview: unknown().optional()
});
var VERSION = "4.0.67";
function createSigV4FetchFunction(getCredentials, fetch$1 = globalThis.fetch) {
	return async (input, init) => {
		var _a, _b;
		const request = input instanceof Request ? input : void 0;
		const headersWithUserAgent = withUserAgentSuffix(combineHeaders(normalizeHeaders(request == null ? void 0 : request.headers), normalizeHeaders(init == null ? void 0 : init.headers)), `ai-sdk/amazon-bedrock/${VERSION}`, getRuntimeEnvironmentUserAgent());
		let effectiveBody = (_a = init == null ? void 0 : init.body) != null ? _a : void 0;
		if (effectiveBody === void 0 && request && request.body !== null) try {
			effectiveBody = await request.clone().text();
		} catch (e) {}
		const effectiveMethod = (_b = init == null ? void 0 : init.method) != null ? _b : request == null ? void 0 : request.method;
		if ((effectiveMethod == null ? void 0 : effectiveMethod.toUpperCase()) !== "POST" || !effectiveBody) return fetch$1(input, {
			...init,
			headers: headersWithUserAgent
		});
		const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
		const body = prepareBodyString(effectiveBody);
		const credentials = await getCredentials();
		const combinedHeaders = combineHeaders(headersWithUserAgent, normalizeHeaders((await new AwsV4Signer({
			url,
			method: "POST",
			headers: Object.entries(headersWithUserAgent),
			body,
			region: credentials.region,
			accessKeyId: credentials.accessKeyId,
			secretAccessKey: credentials.secretAccessKey,
			sessionToken: credentials.sessionToken,
			service: "bedrock"
		}).sign()).headers));
		return fetch$1(input, {
			...init,
			body,
			headers: combinedHeaders
		});
	};
}
function prepareBodyString(body) {
	if (typeof body === "string") return body;
	else if (body instanceof Uint8Array) return new TextDecoder().decode(body);
	else if (body instanceof ArrayBuffer) return new TextDecoder().decode(new Uint8Array(body));
	else return JSON.stringify(body);
}
function createApiKeyFetchFunction(apiKey, fetch$1 = globalThis.fetch) {
	return async (input, init) => {
		const finalHeaders = combineHeaders(withUserAgentSuffix(normalizeHeaders(init == null ? void 0 : init.headers), `ai-sdk/amazon-bedrock/${VERSION}`, getRuntimeEnvironmentUserAgent()), { Authorization: `Bearer ${apiKey}` });
		return fetch$1(input, {
			...init,
			headers: finalHeaders
		});
	};
}
var bedrockRerankingResponseSchema = lazySchema(() => zodSchema(object({
	results: array(object({
		index: number(),
		relevanceScore: number()
	})),
	nextToken: string().optional()
})));
var amazonBedrockRerankingModelOptionsSchema = lazySchema(() => zodSchema(object({
	nextToken: string().optional(),
	additionalModelRequestFields: record(string(), any()).optional()
})));
var BedrockRerankingModel = class {
	constructor(modelId, config) {
		this.modelId = modelId;
		this.config = config;
		this.specificationVersion = "v3";
		this.provider = "amazon-bedrock";
	}
	async doRerank({ documents, headers, query, topN, abortSignal, providerOptions }) {
		const bedrockOptions = await parseProviderOptions({
			provider: "bedrock",
			providerOptions,
			schema: amazonBedrockRerankingModelOptionsSchema
		});
		const { value: response, responseHeaders, rawValue } = await postJsonToApi({
			url: `${this.config.baseUrl()}/rerank`,
			headers: await resolve(combineHeaders(await resolve(this.config.headers), headers)),
			body: {
				nextToken: bedrockOptions == null ? void 0 : bedrockOptions.nextToken,
				queries: [{
					textQuery: { text: query },
					type: "TEXT"
				}],
				rerankingConfiguration: {
					bedrockRerankingConfiguration: {
						modelConfiguration: {
							modelArn: `arn:aws:bedrock:${this.config.region}::foundation-model/${this.modelId}`,
							additionalModelRequestFields: bedrockOptions == null ? void 0 : bedrockOptions.additionalModelRequestFields
						},
						numberOfResults: topN
					},
					type: "BEDROCK_RERANKING_MODEL"
				},
				sources: documents.values.map((value) => ({
					type: "INLINE",
					inlineDocumentSource: documents.type === "text" ? {
						type: "TEXT",
						textDocument: { text: value }
					} : {
						type: "JSON",
						jsonDocument: value
					}
				}))
			},
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: BedrockErrorSchema,
				errorToMessage: (error) => `${error.type}: ${error.message}`
			}),
			successfulResponseHandler: createJsonResponseHandler(bedrockRerankingResponseSchema),
			fetch: this.config.fetch,
			abortSignal
		});
		return {
			ranking: response.results,
			response: {
				headers: responseHeaders,
				body: rawValue
			}
		};
	}
};
function createAmazonBedrock(options = {}) {
	const rawApiKey = loadOptionalSetting({
		settingValue: options.apiKey,
		environmentVariableName: "AWS_BEARER_TOKEN_BEDROCK"
	});
	const apiKey = rawApiKey && rawApiKey.trim().length > 0 ? rawApiKey.trim() : void 0;
	const fetchFunction = apiKey ? createApiKeyFetchFunction(apiKey, options.fetch) : createSigV4FetchFunction(async () => {
		const region = loadSetting({
			settingValue: options.region,
			settingName: "region",
			environmentVariableName: "AWS_REGION",
			description: "AWS region"
		});
		if (options.credentialProvider) try {
			return {
				...await options.credentialProvider(),
				region
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`AWS credential provider failed: ${errorMessage}. Please ensure your credential provider returns valid AWS credentials with accessKeyId and secretAccessKey properties.`);
		}
		try {
			return {
				region,
				accessKeyId: loadSetting({
					settingValue: options.accessKeyId,
					settingName: "accessKeyId",
					environmentVariableName: "AWS_ACCESS_KEY_ID",
					description: "AWS access key ID"
				}),
				secretAccessKey: loadSetting({
					settingValue: options.secretAccessKey,
					settingName: "secretAccessKey",
					environmentVariableName: "AWS_SECRET_ACCESS_KEY",
					description: "AWS secret access key"
				}),
				sessionToken: loadOptionalSetting({
					settingValue: options.sessionToken,
					environmentVariableName: "AWS_SESSION_TOKEN"
				})
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			if (errorMessage.includes("AWS_ACCESS_KEY_ID") || errorMessage.includes("accessKeyId")) throw new Error(`AWS SigV4 authentication requires AWS credentials. Please provide either:
1. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables
2. Provide accessKeyId and secretAccessKey in options
3. Use a credentialProvider function
4. Use API key authentication with AWS_BEARER_TOKEN_BEDROCK or apiKey option
Original error: ${errorMessage}`);
			if (errorMessage.includes("AWS_SECRET_ACCESS_KEY") || errorMessage.includes("secretAccessKey")) throw new Error(`AWS SigV4 authentication requires both AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY. Please ensure both credentials are provided.
Original error: ${errorMessage}`);
			throw error;
		}
	}, options.fetch);
	const getHeaders = () => {
		var _a;
		return withUserAgentSuffix((_a = options.headers) != null ? _a : {}, `ai-sdk/amazon-bedrock/${VERSION}`);
	};
	const getBedrockRuntimeBaseUrl = () => {
		var _a, _b;
		return (_b = withoutTrailingSlash((_a = options.baseURL) != null ? _a : `https://bedrock-runtime.${loadSetting({
			settingValue: options.region,
			settingName: "region",
			environmentVariableName: "AWS_REGION",
			description: "AWS region"
		})}.amazonaws.com`)) != null ? _b : `https://bedrock-runtime.us-east-1.amazonaws.com`;
	};
	const getBedrockAgentRuntimeBaseUrl = () => {
		var _a, _b;
		return (_b = withoutTrailingSlash((_a = options.baseURL) != null ? _a : `https://bedrock-agent-runtime.${loadSetting({
			settingValue: options.region,
			settingName: "region",
			environmentVariableName: "AWS_REGION",
			description: "AWS region"
		})}.amazonaws.com`)) != null ? _b : `https://bedrock-agent-runtime.us-west-2.amazonaws.com`;
	};
	const createChatModel = (modelId) => new BedrockChatLanguageModel(modelId, {
		baseUrl: getBedrockRuntimeBaseUrl,
		headers: getHeaders,
		fetch: fetchFunction,
		generateId
	});
	const provider = function(modelId) {
		if (new.target) throw new Error("The Amazon Bedrock model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	const createEmbeddingModel = (modelId) => new BedrockEmbeddingModel(modelId, {
		baseUrl: getBedrockRuntimeBaseUrl,
		headers: getHeaders,
		fetch: fetchFunction
	});
	const createImageModel = (modelId) => new BedrockImageModel(modelId, {
		baseUrl: getBedrockRuntimeBaseUrl,
		headers: getHeaders,
		fetch: fetchFunction
	});
	const createRerankingModel = (modelId) => new BedrockRerankingModel(modelId, {
		baseUrl: getBedrockAgentRuntimeBaseUrl,
		region: loadSetting({
			settingValue: options.region,
			settingName: "region",
			environmentVariableName: "AWS_REGION",
			description: "AWS region"
		}),
		headers: getHeaders,
		fetch: fetchFunction
	});
	provider.specificationVersion = "v3";
	provider.languageModel = createChatModel;
	provider.embedding = createEmbeddingModel;
	provider.embeddingModel = createEmbeddingModel;
	provider.textEmbedding = createEmbeddingModel;
	provider.textEmbeddingModel = createEmbeddingModel;
	provider.image = createImageModel;
	provider.imageModel = createImageModel;
	provider.reranking = createRerankingModel;
	provider.rerankingModel = createRerankingModel;
	provider.tools = anthropicTools;
	return provider;
}
var bedrock = createAmazonBedrock();
export { VERSION, bedrock, createAmazonBedrock };
