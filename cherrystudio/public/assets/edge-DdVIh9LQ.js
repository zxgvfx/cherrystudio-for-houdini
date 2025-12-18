import { A as record, C as string, E as union, F as unknown, j as _enum, o as array, q as boolean, x as number, y as object } from "./v4-_VdBfIuS.js";
import { B as parseProviderOptions, D as postJsonToApi, F as resolve, L as withoutTrailingSlash, T as TooManyEmbeddingValuesForCallError, V as UnsupportedFunctionalityError, c as combineHeaders, e as convertToBase64, h as createEventSourceResponseHandler, j as createJsonErrorResponseHandler, k as createJsonResponseHandler, l as createProviderDefinedToolFactory, m as createProviderDefinedToolFactoryWithOutputSchema, q as generateId, y as loadOptionalSetting, z as loadSetting } from "./dist-DljPbAPG.js";
function convertJSONSchemaToOpenAPISchema(jsonSchema) {
	if (jsonSchema == null || isEmptyObjectSchema(jsonSchema)) return void 0;
	if (typeof jsonSchema === "boolean") return {
		type: "boolean",
		properties: {}
	};
	const { type, description, required, properties, items, allOf, anyOf, oneOf, format, const: constValue, minLength, enum: enumValues } = jsonSchema;
	const result = {};
	if (description) result.description = description;
	if (required) result.required = required;
	if (format) result.format = format;
	if (constValue !== void 0) result.enum = [constValue];
	if (type) if (Array.isArray(type)) if (type.includes("null")) {
		result.type = type.filter((t) => t !== "null")[0];
		result.nullable = true;
	} else result.type = type;
	else if (type === "null") result.type = "null";
	else result.type = type;
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
function isEmptyObjectSchema(jsonSchema) {
	return jsonSchema != null && typeof jsonSchema === "object" && jsonSchema.type === "object" && (jsonSchema.properties == null || Object.keys(jsonSchema.properties).length === 0) && !jsonSchema.additionalProperties;
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
					var _a2, _b, _c, _d, _e, _f;
					switch (part.type) {
						case "text": return part.text.length === 0 ? void 0 : {
							text: part.text,
							thoughtSignature: (_b = (_a2 = part.providerOptions) == null ? void 0 : _a2.google) == null ? void 0 : _b.thoughtSignature
						};
						case "reasoning": return part.text.length === 0 ? void 0 : {
							text: part.text,
							thought: true,
							thoughtSignature: (_d = (_c = part.providerOptions) == null ? void 0 : _c.google) == null ? void 0 : _d.thoughtSignature
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
							thoughtSignature: (_f = (_e = part.providerOptions) == null ? void 0 : _e.google) == null ? void 0 : _f.thoughtSignature
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
var googleErrorDataSchema = object({ error: object({
	code: number().nullable(),
	message: string(),
	status: string()
}) });
var googleFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: googleErrorDataSchema,
	errorToMessage: (data) => data.error.message
});
var googleGenerativeAIProviderOptions = object({
	responseModalities: array(_enum(["TEXT", "IMAGE"])).optional(),
	thinkingConfig: object({
		thinkingBudget: number().optional(),
		includeThoughts: boolean().optional()
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
	labels: record(string(), string()).optional()
});
function prepareTools({ tools, toolChoice, modelId }) {
	var _a;
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	const isGemini2 = modelId.includes("gemini-2");
	const supportsDynamicRetrieval = modelId.includes("gemini-1.5-flash") && !modelId.includes("-8b");
	if (tools == null) return {
		tools: void 0,
		toolConfig: void 0,
		toolWarnings
	};
	const hasFunctionTools = tools.some((tool) => tool.type === "function");
	const hasProviderDefinedTools = tools.some((tool) => tool.type === "provider-defined");
	if (hasFunctionTools && hasProviderDefinedTools) toolWarnings.push({
		type: "unsupported-tool",
		tool: tools.find((tool) => tool.type === "function"),
		details: "Cannot mix function tools with provider-defined tools in the same request. Please use either function tools or provider-defined tools, but not both."
	});
	if (hasProviderDefinedTools) {
		const googleTools2 = {};
		const providerDefinedTools = tools.filter((tool) => tool.type === "provider-defined");
		providerDefinedTools.forEach((tool) => {
			switch (tool.id) {
				case "google.google_search":
					if (isGemini2) googleTools2.googleSearch = {};
					else if (supportsDynamicRetrieval) googleTools2.googleSearchRetrieval = { dynamicRetrievalConfig: {
						mode: tool.args.mode,
						dynamicThreshold: tool.args.dynamicThreshold
					} };
					else googleTools2.googleSearchRetrieval = {};
					break;
				case "google.url_context":
					if (isGemini2) googleTools2.urlContext = {};
					else toolWarnings.push({
						type: "unsupported-tool",
						tool,
						details: "The URL context tool is not supported with other Gemini models than Gemini 2."
					});
					break;
				case "google.code_execution":
					if (isGemini2) googleTools2.codeExecution = {};
					else toolWarnings.push({
						type: "unsupported-tool",
						tool,
						details: "The code execution tools is not supported with other Gemini models than Gemini 2."
					});
					break;
				default:
					toolWarnings.push({
						type: "unsupported-tool",
						tool
					});
					break;
			}
		});
		return {
			tools: Object.keys(googleTools2).length > 0 ? googleTools2 : void 0,
			toolConfig: void 0,
			toolWarnings
		};
	}
	const functionDeclarations = [];
	for (const tool of tools) switch (tool.type) {
		case "function":
			functionDeclarations.push({
				name: tool.name,
				description: (_a = tool.description) != null ? _a : "",
				parameters: convertJSONSchemaToOpenAPISchema(tool.inputSchema)
			});
			break;
		default:
			toolWarnings.push({
				type: "unsupported-tool",
				tool
			});
			break;
	}
	if (toolChoice == null) return {
		tools: { functionDeclarations },
		toolConfig: void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto": return {
			tools: { functionDeclarations },
			toolConfig: { functionCallingConfig: { mode: "AUTO" } },
			toolWarnings
		};
		case "none": return {
			tools: { functionDeclarations },
			toolConfig: { functionCallingConfig: { mode: "NONE" } },
			toolWarnings
		};
		case "required": return {
			tools: { functionDeclarations },
			toolConfig: { functionCallingConfig: { mode: "ANY" } },
			toolWarnings
		};
		case "tool": return {
			tools: { functionDeclarations },
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
var groundingChunkSchema = object({
	web: object({
		uri: string(),
		title: string()
	}).nullish(),
	retrievedContext: object({
		uri: string(),
		title: string()
	}).nullish()
});
var groundingMetadataSchema = object({
	webSearchQueries: array(string()).nullish(),
	retrievalQueries: array(string()).nullish(),
	searchEntryPoint: object({ renderedContent: string() }).nullish(),
	groundingChunks: array(groundingChunkSchema).nullish(),
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
var googleSearch = createProviderDefinedToolFactory({
	id: "google.google_search",
	name: "google_search",
	inputSchema: object({
		mode: _enum(["MODE_DYNAMIC", "MODE_UNSPECIFIED"]).default("MODE_UNSPECIFIED"),
		dynamicThreshold: number().default(1)
	})
});
var urlMetadataSchema = object({
	retrievedUrl: string(),
	urlRetrievalStatus: string()
});
var urlContextMetadataSchema = object({ urlMetadata: array(urlMetadataSchema) });
var urlContext = createProviderDefinedToolFactory({
	id: "google.url_context",
	name: "url_context",
	inputSchema: object({})
});
var GoogleGenerativeAILanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v2";
		var _a;
		this.modelId = modelId;
		this.config = config;
		this.generateId = (_a = config.generateId) != null ? _a : generateId;
	}
	get provider() {
		return this.config.provider;
	}
	get supportedUrls() {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).supportedUrls) == null ? void 0 : _b.call(_a)) != null ? _c : {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, tools, toolChoice, providerOptions }) {
		var _a, _b;
		const warnings = [];
		const googleOptions = await parseProviderOptions({
			provider: "google",
			providerOptions,
			schema: googleGenerativeAIProviderOptions
		});
		if (((_a = googleOptions == null ? void 0 : googleOptions.thinkingConfig) == null ? void 0 : _a.includeThoughts) === true && !this.config.provider.startsWith("google.vertex.")) warnings.push({
			type: "other",
			message: `The 'includeThoughts' option is only supported with the Google Vertex provider and might not be supported or could behave unexpectedly with the current Google provider (${this.config.provider}).`
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
					responseSchema: (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && ((_b = googleOptions == null ? void 0 : googleOptions.structuredOutputs) != null ? _b : true) ? convertJSONSchemaToOpenAPISchema(responseFormat.schema) : void 0,
					...(googleOptions == null ? void 0 : googleOptions.audioTimestamp) && { audioTimestamp: googleOptions.audioTimestamp },
					responseModalities: googleOptions == null ? void 0 : googleOptions.responseModalities,
					thinkingConfig: googleOptions == null ? void 0 : googleOptions.thinkingConfig
				},
				contents,
				systemInstruction: isGemmaModel ? void 0 : systemInstruction,
				safetySettings: googleOptions == null ? void 0 : googleOptions.safetySettings,
				tools: googleTools2,
				toolConfig: googleToolConfig,
				cachedContent: googleOptions == null ? void 0 : googleOptions.cachedContent,
				labels: googleOptions == null ? void 0 : googleOptions.labels
			},
			warnings: [...warnings, ...toolWarnings]
		};
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
		const { args, warnings } = await this.getArgs(options);
		const body = JSON.stringify(args);
		const mergedHeaders = combineHeaders(await resolve(this.config.headers), options.headers);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: `${this.config.baseURL}/${getModelPath(this.modelId)}:generateContent`,
			headers: mergedHeaders,
			body: args,
			failedResponseHandler: googleFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(responseSchema),
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
				groundingMetadata: (_j = candidate.groundingMetadata) != null ? _j : null,
				urlContextMetadata: (_k = candidate.urlContextMetadata) != null ? _k : null,
				safetyRatings: (_l = candidate.safetyRatings) != null ? _l : null,
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
		const headers = combineHeaders(await resolve(this.config.headers), options.headers);
		const { responseHeaders, value: response } = await postJsonToApi({
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
					var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
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
						const inlineDataParts = getInlineDataParts(content.parts);
						if (inlineDataParts != null) for (const part of inlineDataParts) controller.enqueue({
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
							groundingMetadata: (_i = candidate.groundingMetadata) != null ? _i : null,
							urlContextMetadata: (_j = candidate.urlContextMetadata) != null ? _j : null,
							safetyRatings: (_k = candidate.safetyRatings) != null ? _k : null
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
function getInlineDataParts(parts) {
	return parts == null ? void 0 : parts.filter((part) => "inlineData" in part);
}
function extractSources({ groundingMetadata, generateId: generateId2 }) {
	var _a;
	return (_a = groundingMetadata == null ? void 0 : groundingMetadata.groundingChunks) == null ? void 0 : _a.filter((chunk) => chunk.web != null).map((chunk) => ({
		type: "source",
		sourceType: "url",
		id: generateId2(),
		url: chunk.web.uri,
		title: chunk.web.title
	}));
}
var contentSchema = object({ parts: array(union([
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
var safetyRatingSchema = object({
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
	totalTokenCount: number().nullish()
});
var responseSchema = object({
	candidates: array(object({
		content: contentSchema.nullish().or(object({}).strict()),
		finishReason: string().nullish(),
		safetyRatings: array(safetyRatingSchema).nullish(),
		groundingMetadata: groundingMetadataSchema.nullish(),
		urlContextMetadata: urlContextMetadataSchema.nullish()
	})),
	usageMetadata: usageSchema.nullish()
});
var chunkSchema = object({
	candidates: array(object({
		content: contentSchema.nullish(),
		finishReason: string().nullish(),
		safetyRatings: array(safetyRatingSchema).nullish(),
		groundingMetadata: groundingMetadataSchema.nullish(),
		urlContextMetadata: urlContextMetadataSchema.nullish()
	})).nullish(),
	usageMetadata: usageSchema.nullish()
});
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
var googleTools = {
	googleSearch,
	urlContext,
	codeExecution
};
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
	storageUri: string().nullish()
});
var googleVertexTools = {
	googleSearch: googleTools.googleSearch,
	urlContext: googleTools.urlContext,
	codeExecution: googleTools.codeExecution
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
		return (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : `https://${baseHost}/v1/projects/${project}/locations/${region}/publishers/google`;
	};
	const createConfig = (name) => {
		var _a;
		return {
			provider: `google.vertex.${name}`,
			headers: (_a = options.headers) != null ? _a : {},
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
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
export { createVertex2 as b, vertex as c };
