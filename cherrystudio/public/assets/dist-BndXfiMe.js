import { f as _enum$1, j as any$1, k as array$1, l as boolean$1, q as literal$1, t as number$1, u as object$1, v as record$1, x as string$1, z as union$1 } from "./schemas-Bbbixa2f.js";
import "./types-Db4HyS8d.js";
import { F as parseProviderOptions, G as postJsonToApi, M as withUserAgentSuffix, N as withoutTrailingSlash, c as combineHeaders, e as convertToBase64, g as createEventSourceResponseHandler, i as createJsonErrorResponseHandler, j as createJsonResponseHandler, l as createProviderDefinedToolFactory, m as createProviderDefinedToolFactoryWithOutputSchema, q as generateId, w as isParsableJson } from "./dist-K3A05YNJ.js";
var marker$1 = "vercel.ai.error";
var symbol$2 = Symbol.for(marker$1);
var _a$1;
var _AISDKError = class _AISDKError$1 extends Error {
	constructor({ name: name14, message, cause }) {
		super(message);
		this[_a$1] = true;
		this.name = name14;
		this.cause = cause;
	}
	static isInstance(error$1) {
		return _AISDKError$1.hasMarker(error$1, marker$1);
	}
	static hasMarker(error$1, marker15) {
		const markerSymbol = Symbol.for(marker15);
		return error$1 != null && typeof error$1 === "object" && markerSymbol in error$1 && typeof error$1[markerSymbol] === "boolean" && error$1[markerSymbol] === true;
	}
};
_a$1 = symbol$2;
var AISDKError$1 = _AISDKError;
var name$1 = "AI_APICallError";
var marker2$1 = `vercel.ai.error.${name$1}`;
var symbol2$1 = Symbol.for(marker2$1);
var _a2$1;
_a2$1 = symbol2$1;
var name2$1 = "AI_EmptyResponseBodyError";
var marker3$1 = `vercel.ai.error.${name2$1}`;
var symbol3$1 = Symbol.for(marker3$1);
var _a3;
_a3 = symbol3$1;
var name3$1 = "AI_InvalidArgumentError";
var marker4$1 = `vercel.ai.error.${name3$1}`;
var symbol4$1 = Symbol.for(marker4$1);
var _a4;
_a4 = symbol4$1;
var name4$1 = "AI_InvalidPromptError";
var marker5$1 = `vercel.ai.error.${name4$1}`;
var symbol5$1 = Symbol.for(marker5$1);
var _a5;
_a5 = symbol5$1;
var name5$1 = "AI_InvalidResponseDataError";
var marker6$1 = `vercel.ai.error.${name5$1}`;
var symbol6$1 = Symbol.for(marker6$1);
var _a6;
var InvalidResponseDataError = class extends AISDKError$1 {
	constructor({ data, message = `Invalid response data: ${JSON.stringify(data)}.` }) {
		super({
			name: name5$1,
			message
		});
		this[_a6] = true;
		this.data = data;
	}
	static isInstance(error$1) {
		return AISDKError$1.hasMarker(error$1, marker6$1);
	}
};
_a6 = symbol6$1;
var name6$1 = "AI_JSONParseError";
var marker7$1 = `vercel.ai.error.${name6$1}`;
var symbol7$1 = Symbol.for(marker7$1);
var _a7;
_a7 = symbol7$1;
var name7$1 = "AI_LoadAPIKeyError";
var marker8$1 = `vercel.ai.error.${name7$1}`;
var symbol8$1 = Symbol.for(marker8$1);
var _a8;
_a8 = symbol8$1;
var name8$1 = "AI_LoadSettingError";
var marker9$1 = `vercel.ai.error.${name8$1}`;
var symbol9$1 = Symbol.for(marker9$1);
var _a9;
_a9 = symbol9$1;
var name9$1 = "AI_NoContentGeneratedError";
var marker10$1 = `vercel.ai.error.${name9$1}`;
var symbol10$1 = Symbol.for(marker10$1);
var _a10;
_a10 = symbol10$1;
var name10$1 = "AI_NoSuchModelError";
var marker11$1 = `vercel.ai.error.${name10$1}`;
var symbol11$1 = Symbol.for(marker11$1);
var _a11;
_a11 = symbol11$1;
var name11$1 = "AI_TooManyEmbeddingValuesForCallError";
var marker12$1 = `vercel.ai.error.${name11$1}`;
var symbol12$1 = Symbol.for(marker12$1);
var _a12;
_a12 = symbol12$1;
var name12$1 = "AI_TypeValidationError";
var marker13$1 = `vercel.ai.error.${name12$1}`;
var symbol13$1 = Symbol.for(marker13$1);
var _a13;
_a13 = symbol13$1;
var name13$1 = "AI_UnsupportedFunctionalityError";
var marker14$1 = `vercel.ai.error.${name13$1}`;
var symbol14$1 = Symbol.for(marker14$1);
var _a14$1;
var UnsupportedFunctionalityError$1 = class extends AISDKError$1 {
	constructor({ functionality, message = `'${functionality}' functionality not supported.` }) {
		super({
			name: name13$1,
			message
		});
		this[_a14$1] = true;
		this.functionality = functionality;
	}
	static isInstance(error$1) {
		return AISDKError$1.hasMarker(error$1, marker14$1);
	}
};
_a14$1 = symbol14$1;
function getOpenAIMetadata(message) {
	var _a$2, _b$1;
	return (_b$1 = (_a$2 = message == null ? void 0 : message.providerOptions) == null ? void 0 : _a$2.openaiCompatible) != null ? _b$1 : {};
}
function convertToOpenAICompatibleChatMessages(prompt) {
	const messages = [];
	for (const { role, content,...message } of prompt) {
		const metadata = getOpenAIMetadata({ ...message });
		switch (role) {
			case "system":
				messages.push({
					role: "system",
					content,
					...metadata
				});
				break;
			case "user":
				if (content.length === 1 && content[0].type === "text") {
					messages.push({
						role: "user",
						content: content[0].text,
						...getOpenAIMetadata(content[0])
					});
					break;
				}
				messages.push({
					role: "user",
					content: content.map((part) => {
						const partMetadata = getOpenAIMetadata(part);
						switch (part.type) {
							case "text": return {
								type: "text",
								text: part.text,
								...partMetadata
							};
							case "file": if (part.mediaType.startsWith("image/")) {
								const mediaType = part.mediaType === "image/*" ? "image/jpeg" : part.mediaType;
								return {
									type: "image_url",
									image_url: { url: part.data instanceof URL ? part.data.toString() : `data:${mediaType};base64,${convertToBase64(part.data)}` },
									...partMetadata
								};
							} else throw new UnsupportedFunctionalityError$1({ functionality: `file part media type ${part.mediaType}` });
						}
					}),
					...metadata
				});
				break;
			case "assistant": {
				let text = "";
				const toolCalls = [];
				for (const part of content) {
					const partMetadata = getOpenAIMetadata(part);
					switch (part.type) {
						case "text":
							text += part.text;
							break;
						case "tool-call":
							toolCalls.push({
								id: part.toolCallId,
								type: "function",
								function: {
									name: part.toolName,
									arguments: JSON.stringify(part.input)
								},
								...partMetadata
							});
							break;
					}
				}
				messages.push({
					role: "assistant",
					content: text,
					tool_calls: toolCalls.length > 0 ? toolCalls : void 0,
					...metadata
				});
				break;
			}
			case "tool":
				for (const toolResponse of content) {
					const output = toolResponse.output;
					let contentValue;
					switch (output.type) {
						case "text":
						case "error-text":
							contentValue = output.value;
							break;
						case "content":
						case "json":
						case "error-json":
							contentValue = JSON.stringify(output.value);
							break;
					}
					const toolResponseMetadata = getOpenAIMetadata(toolResponse);
					messages.push({
						role: "tool",
						tool_call_id: toolResponse.toolCallId,
						content: contentValue,
						...toolResponseMetadata
					});
				}
				break;
			default: {
				const _exhaustiveCheck = role;
				throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
			}
		}
	}
	return messages;
}
function getResponseMetadata({ id, model, created }) {
	return {
		id: id != null ? id : void 0,
		modelId: model != null ? model : void 0,
		timestamp: created != null ? /* @__PURE__ */ new Date(created * 1e3) : void 0
	};
}
function mapOpenAICompatibleFinishReason(finishReason) {
	switch (finishReason) {
		case "stop": return "stop";
		case "length": return "length";
		case "content_filter": return "content-filter";
		case "function_call":
		case "tool_calls": return "tool-calls";
		default: return "unknown";
	}
}
var openaiCompatibleProviderOptions = object$1({
	user: string$1().optional(),
	reasoningEffort: string$1().optional(),
	textVerbosity: string$1().optional()
});
var openaiCompatibleErrorDataSchema = object$1({ error: object$1({
	message: string$1(),
	type: string$1().nullish(),
	param: any$1().nullish(),
	code: union$1([string$1(), number$1()]).nullish()
}) });
var defaultOpenAICompatibleErrorStructure = {
	errorSchema: openaiCompatibleErrorDataSchema,
	errorToMessage: (data) => data.error.message
};
function prepareTools({ tools, toolChoice }) {
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	if (tools == null) return {
		tools: void 0,
		toolChoice: void 0,
		toolWarnings
	};
	const openaiCompatTools = [];
	for (const tool of tools) if (tool.type === "provider-defined") toolWarnings.push({
		type: "unsupported-tool",
		tool
	});
	else openaiCompatTools.push({
		type: "function",
		function: {
			name: tool.name,
			description: tool.description,
			parameters: tool.inputSchema
		}
	});
	if (toolChoice == null) return {
		tools: openaiCompatTools,
		toolChoice: void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto":
		case "none":
		case "required": return {
			tools: openaiCompatTools,
			toolChoice: type,
			toolWarnings
		};
		case "tool": return {
			tools: openaiCompatTools,
			toolChoice: {
				type: "function",
				function: { name: toolChoice.toolName }
			},
			toolWarnings
		};
		default: {
			const _exhaustiveCheck = type;
			throw new UnsupportedFunctionalityError$1({ functionality: `tool choice type: ${_exhaustiveCheck}` });
		}
	}
}
var OpenAICompatibleChatLanguageModel = class {
	constructor(modelId, config$1) {
		this.specificationVersion = "v2";
		var _a$2, _b$1;
		this.modelId = modelId;
		this.config = config$1;
		const errorStructure = (_a$2 = config$1.errorStructure) != null ? _a$2 : defaultOpenAICompatibleErrorStructure;
		this.chunkSchema = createOpenAICompatibleChatChunkSchema(errorStructure.errorSchema);
		this.failedResponseHandler = createJsonErrorResponseHandler(errorStructure);
		this.supportsStructuredOutputs = (_b$1 = config$1.supportsStructuredOutputs) != null ? _b$1 : false;
	}
	get provider() {
		return this.config.provider;
	}
	get providerOptionsName() {
		return this.config.provider.split(".")[0].trim();
	}
	get supportedUrls() {
		var _a$2, _b$1, _c;
		return (_c = (_b$1 = (_a$2 = this.config).supportedUrls) == null ? void 0 : _b$1.call(_a$2)) != null ? _c : {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, providerOptions, stopSequences, responseFormat, seed, toolChoice, tools }) {
		var _a$2, _b$1, _c, _d;
		const warnings = [];
		const compatibleOptions = Object.assign((_a$2 = await parseProviderOptions({
			provider: "openai-compatible",
			providerOptions,
			schema: openaiCompatibleProviderOptions
		})) != null ? _a$2 : {}, (_b$1 = await parseProviderOptions({
			provider: this.providerOptionsName,
			providerOptions,
			schema: openaiCompatibleProviderOptions
		})) != null ? _b$1 : {});
		if (topK != null) warnings.push({
			type: "unsupported-setting",
			setting: "topK"
		});
		if ((responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && !this.supportsStructuredOutputs) warnings.push({
			type: "unsupported-setting",
			setting: "responseFormat",
			details: "JSON response format schema is only supported with structuredOutputs"
		});
		const { tools: openaiTools, toolChoice: openaiToolChoice, toolWarnings } = prepareTools({
			tools,
			toolChoice
		});
		return {
			args: {
				model: this.modelId,
				user: compatibleOptions.user,
				max_tokens: maxOutputTokens,
				temperature,
				top_p: topP,
				frequency_penalty: frequencyPenalty,
				presence_penalty: presencePenalty,
				response_format: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? this.supportsStructuredOutputs === true && responseFormat.schema != null ? {
					type: "json_schema",
					json_schema: {
						schema: responseFormat.schema,
						name: (_c = responseFormat.name) != null ? _c : "response",
						description: responseFormat.description
					}
				} : { type: "json_object" } : void 0,
				stop: stopSequences,
				seed,
				...Object.fromEntries(Object.entries((_d = providerOptions == null ? void 0 : providerOptions[this.providerOptionsName]) != null ? _d : {}).filter(([key]) => !Object.keys(openaiCompatibleProviderOptions.shape).includes(key))),
				reasoning_effort: compatibleOptions.reasoningEffort,
				verbosity: compatibleOptions.textVerbosity,
				messages: convertToOpenAICompatibleChatMessages(prompt),
				tools: openaiTools,
				tool_choice: openaiToolChoice
			},
			warnings: [...warnings, ...toolWarnings]
		};
	}
	async doGenerate(options) {
		var _a$2, _b$1, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
		const { args, warnings } = await this.getArgs({ ...options });
		const body = JSON.stringify(args);
		const { responseHeaders, value: responseBody, rawValue: rawResponse } = await postJsonToApi({
			url: this.config.url({
				path: "/chat/completions",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), options.headers),
			body: args,
			failedResponseHandler: this.failedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(OpenAICompatibleChatResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const choice = responseBody.choices[0];
		const content = [];
		const text = choice.message.content;
		if (text != null && text.length > 0) content.push({
			type: "text",
			text
		});
		const reasoning = (_a$2 = choice.message.reasoning_content) != null ? _a$2 : choice.message.reasoning;
		if (reasoning != null && reasoning.length > 0) content.push({
			type: "reasoning",
			text: reasoning
		});
		if (choice.message.tool_calls != null) for (const toolCall of choice.message.tool_calls) content.push({
			type: "tool-call",
			toolCallId: (_b$1 = toolCall.id) != null ? _b$1 : generateId(),
			toolName: toolCall.function.name,
			input: toolCall.function.arguments
		});
		const providerMetadata = {
			[this.providerOptionsName]: {},
			...await ((_d = (_c = this.config.metadataExtractor) == null ? void 0 : _c.extractMetadata) == null ? void 0 : _d.call(_c, { parsedBody: rawResponse }))
		};
		const completionTokenDetails = (_e = responseBody.usage) == null ? void 0 : _e.completion_tokens_details;
		if ((completionTokenDetails == null ? void 0 : completionTokenDetails.accepted_prediction_tokens) != null) providerMetadata[this.providerOptionsName].acceptedPredictionTokens = completionTokenDetails == null ? void 0 : completionTokenDetails.accepted_prediction_tokens;
		if ((completionTokenDetails == null ? void 0 : completionTokenDetails.rejected_prediction_tokens) != null) providerMetadata[this.providerOptionsName].rejectedPredictionTokens = completionTokenDetails == null ? void 0 : completionTokenDetails.rejected_prediction_tokens;
		return {
			content,
			finishReason: mapOpenAICompatibleFinishReason(choice.finish_reason),
			usage: {
				inputTokens: (_g = (_f = responseBody.usage) == null ? void 0 : _f.prompt_tokens) != null ? _g : void 0,
				outputTokens: (_i = (_h = responseBody.usage) == null ? void 0 : _h.completion_tokens) != null ? _i : void 0,
				totalTokens: (_k = (_j = responseBody.usage) == null ? void 0 : _j.total_tokens) != null ? _k : void 0,
				reasoningTokens: (_n = (_m = (_l = responseBody.usage) == null ? void 0 : _l.completion_tokens_details) == null ? void 0 : _m.reasoning_tokens) != null ? _n : void 0,
				cachedInputTokens: (_q = (_p = (_o = responseBody.usage) == null ? void 0 : _o.prompt_tokens_details) == null ? void 0 : _p.cached_tokens) != null ? _q : void 0
			},
			providerMetadata,
			request: { body },
			response: {
				...getResponseMetadata(responseBody),
				headers: responseHeaders,
				body: rawResponse
			},
			warnings
		};
	}
	async doStream(options) {
		var _a$2;
		const { args, warnings } = await this.getArgs({ ...options });
		const body = {
			...args,
			stream: true,
			stream_options: this.config.includeUsage ? { include_usage: true } : void 0
		};
		const metadataExtractor = (_a$2 = this.config.metadataExtractor) == null ? void 0 : _a$2.createStreamExtractor();
		const { responseHeaders, value: response } = await postJsonToApi({
			url: this.config.url({
				path: "/chat/completions",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: this.failedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(this.chunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const toolCalls = [];
		let finishReason = "unknown";
		const usage = {
			completionTokens: void 0,
			completionTokensDetails: {
				reasoningTokens: void 0,
				acceptedPredictionTokens: void 0,
				rejectedPredictionTokens: void 0
			},
			promptTokens: void 0,
			promptTokensDetails: { cachedTokens: void 0 },
			totalTokens: void 0
		};
		let isFirstChunk = true;
		const providerOptionsName = this.providerOptionsName;
		let isActiveReasoning = false;
		let isActiveText = false;
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					var _a2$2, _b$1, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						finishReason = "error";
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					metadataExtractor?.processChunk(chunk.rawValue);
					if ("error" in value) {
						finishReason = "error";
						controller.enqueue({
							type: "error",
							error: value.error.message
						});
						return;
					}
					if (isFirstChunk) {
						isFirstChunk = false;
						controller.enqueue({
							type: "response-metadata",
							...getResponseMetadata(value)
						});
					}
					if (value.usage != null) {
						const { prompt_tokens, completion_tokens, total_tokens, prompt_tokens_details, completion_tokens_details } = value.usage;
						usage.promptTokens = prompt_tokens != null ? prompt_tokens : void 0;
						usage.completionTokens = completion_tokens != null ? completion_tokens : void 0;
						usage.totalTokens = total_tokens != null ? total_tokens : void 0;
						if ((completion_tokens_details == null ? void 0 : completion_tokens_details.reasoning_tokens) != null) usage.completionTokensDetails.reasoningTokens = completion_tokens_details == null ? void 0 : completion_tokens_details.reasoning_tokens;
						if ((completion_tokens_details == null ? void 0 : completion_tokens_details.accepted_prediction_tokens) != null) usage.completionTokensDetails.acceptedPredictionTokens = completion_tokens_details == null ? void 0 : completion_tokens_details.accepted_prediction_tokens;
						if ((completion_tokens_details == null ? void 0 : completion_tokens_details.rejected_prediction_tokens) != null) usage.completionTokensDetails.rejectedPredictionTokens = completion_tokens_details == null ? void 0 : completion_tokens_details.rejected_prediction_tokens;
						if ((prompt_tokens_details == null ? void 0 : prompt_tokens_details.cached_tokens) != null) usage.promptTokensDetails.cachedTokens = prompt_tokens_details == null ? void 0 : prompt_tokens_details.cached_tokens;
					}
					const choice = value.choices[0];
					if ((choice == null ? void 0 : choice.finish_reason) != null) finishReason = mapOpenAICompatibleFinishReason(choice.finish_reason);
					if ((choice == null ? void 0 : choice.delta) == null) return;
					const delta = choice.delta;
					const reasoningContent = (_a2$2 = delta.reasoning_content) != null ? _a2$2 : delta.reasoning;
					if (reasoningContent) {
						if (!isActiveReasoning) {
							controller.enqueue({
								type: "reasoning-start",
								id: "reasoning-0"
							});
							isActiveReasoning = true;
						}
						controller.enqueue({
							type: "reasoning-delta",
							id: "reasoning-0",
							delta: reasoningContent
						});
					}
					if (delta.content) {
						if (!isActiveText) {
							controller.enqueue({
								type: "text-start",
								id: "txt-0"
							});
							isActiveText = true;
						}
						controller.enqueue({
							type: "text-delta",
							id: "txt-0",
							delta: delta.content
						});
					}
					if (delta.tool_calls != null) for (const toolCallDelta of delta.tool_calls) {
						const index = toolCallDelta.index;
						if (toolCalls[index] == null) {
							if (toolCallDelta.id == null) throw new InvalidResponseDataError({
								data: toolCallDelta,
								message: `Expected 'id' to be a string.`
							});
							if (((_b$1 = toolCallDelta.function) == null ? void 0 : _b$1.name) == null) throw new InvalidResponseDataError({
								data: toolCallDelta,
								message: `Expected 'function.name' to be a string.`
							});
							controller.enqueue({
								type: "tool-input-start",
								id: toolCallDelta.id,
								toolName: toolCallDelta.function.name
							});
							toolCalls[index] = {
								id: toolCallDelta.id,
								type: "function",
								function: {
									name: toolCallDelta.function.name,
									arguments: (_c = toolCallDelta.function.arguments) != null ? _c : ""
								},
								hasFinished: false
							};
							const toolCall2 = toolCalls[index];
							if (((_d = toolCall2.function) == null ? void 0 : _d.name) != null && ((_e = toolCall2.function) == null ? void 0 : _e.arguments) != null) {
								if (toolCall2.function.arguments.length > 0) controller.enqueue({
									type: "tool-input-delta",
									id: toolCall2.id,
									delta: toolCall2.function.arguments
								});
								if (isParsableJson(toolCall2.function.arguments)) {
									controller.enqueue({
										type: "tool-input-end",
										id: toolCall2.id
									});
									controller.enqueue({
										type: "tool-call",
										toolCallId: (_f = toolCall2.id) != null ? _f : generateId(),
										toolName: toolCall2.function.name,
										input: toolCall2.function.arguments
									});
									toolCall2.hasFinished = true;
								}
							}
							continue;
						}
						const toolCall = toolCalls[index];
						if (toolCall.hasFinished) continue;
						if (((_g = toolCallDelta.function) == null ? void 0 : _g.arguments) != null) toolCall.function.arguments += (_i = (_h = toolCallDelta.function) == null ? void 0 : _h.arguments) != null ? _i : "";
						controller.enqueue({
							type: "tool-input-delta",
							id: toolCall.id,
							delta: (_j = toolCallDelta.function.arguments) != null ? _j : ""
						});
						if (((_k = toolCall.function) == null ? void 0 : _k.name) != null && ((_l = toolCall.function) == null ? void 0 : _l.arguments) != null && isParsableJson(toolCall.function.arguments)) {
							controller.enqueue({
								type: "tool-input-end",
								id: toolCall.id
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId: (_m = toolCall.id) != null ? _m : generateId(),
								toolName: toolCall.function.name,
								input: toolCall.function.arguments
							});
							toolCall.hasFinished = true;
						}
					}
				},
				flush(controller) {
					var _a2$2, _b$1, _c, _d, _e, _f;
					if (isActiveReasoning) controller.enqueue({
						type: "reasoning-end",
						id: "reasoning-0"
					});
					if (isActiveText) controller.enqueue({
						type: "text-end",
						id: "txt-0"
					});
					for (const toolCall of toolCalls.filter((toolCall2) => !toolCall2.hasFinished)) {
						controller.enqueue({
							type: "tool-input-end",
							id: toolCall.id
						});
						controller.enqueue({
							type: "tool-call",
							toolCallId: (_a2$2 = toolCall.id) != null ? _a2$2 : generateId(),
							toolName: toolCall.function.name,
							input: toolCall.function.arguments
						});
					}
					const providerMetadata = {
						[providerOptionsName]: {},
						...metadataExtractor == null ? void 0 : metadataExtractor.buildMetadata()
					};
					if (usage.completionTokensDetails.acceptedPredictionTokens != null) providerMetadata[providerOptionsName].acceptedPredictionTokens = usage.completionTokensDetails.acceptedPredictionTokens;
					if (usage.completionTokensDetails.rejectedPredictionTokens != null) providerMetadata[providerOptionsName].rejectedPredictionTokens = usage.completionTokensDetails.rejectedPredictionTokens;
					controller.enqueue({
						type: "finish",
						finishReason,
						usage: {
							inputTokens: (_b$1 = usage.promptTokens) != null ? _b$1 : void 0,
							outputTokens: (_c = usage.completionTokens) != null ? _c : void 0,
							totalTokens: (_d = usage.totalTokens) != null ? _d : void 0,
							reasoningTokens: (_e = usage.completionTokensDetails.reasoningTokens) != null ? _e : void 0,
							cachedInputTokens: (_f = usage.promptTokensDetails.cachedTokens) != null ? _f : void 0
						},
						providerMetadata
					});
				}
			})),
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
var openaiCompatibleTokenUsageSchema = object$1({
	prompt_tokens: number$1().nullish(),
	completion_tokens: number$1().nullish(),
	total_tokens: number$1().nullish(),
	prompt_tokens_details: object$1({ cached_tokens: number$1().nullish() }).nullish(),
	completion_tokens_details: object$1({
		reasoning_tokens: number$1().nullish(),
		accepted_prediction_tokens: number$1().nullish(),
		rejected_prediction_tokens: number$1().nullish()
	}).nullish()
}).nullish();
var OpenAICompatibleChatResponseSchema = object$1({
	id: string$1().nullish(),
	created: number$1().nullish(),
	model: string$1().nullish(),
	choices: array$1(object$1({
		message: object$1({
			role: literal$1("assistant").nullish(),
			content: string$1().nullish(),
			reasoning_content: string$1().nullish(),
			reasoning: string$1().nullish(),
			tool_calls: array$1(object$1({
				id: string$1().nullish(),
				function: object$1({
					name: string$1(),
					arguments: string$1()
				})
			})).nullish()
		}),
		finish_reason: string$1().nullish()
	})),
	usage: openaiCompatibleTokenUsageSchema
});
var createOpenAICompatibleChatChunkSchema = (errorSchema) => union$1([object$1({
	id: string$1().nullish(),
	created: number$1().nullish(),
	model: string$1().nullish(),
	choices: array$1(object$1({
		delta: object$1({
			role: _enum$1(["assistant"]).nullish(),
			content: string$1().nullish(),
			reasoning_content: string$1().nullish(),
			reasoning: string$1().nullish(),
			tool_calls: array$1(object$1({
				index: number$1(),
				id: string$1().nullish(),
				function: object$1({
					name: string$1().nullish(),
					arguments: string$1().nullish()
				})
			})).nullish()
		}).nullish(),
		finish_reason: string$1().nullish()
	})),
	usage: openaiCompatibleTokenUsageSchema
}), errorSchema]);
object$1({
	echo: boolean$1().optional(),
	logitBias: record$1(string$1(), number$1()).optional(),
	suffix: string$1().optional(),
	user: string$1().optional()
});
var usageSchema$1 = object$1({
	prompt_tokens: number$1(),
	completion_tokens: number$1(),
	total_tokens: number$1()
});
object$1({
	id: string$1().nullish(),
	created: number$1().nullish(),
	model: string$1().nullish(),
	choices: array$1(object$1({
		text: string$1(),
		finish_reason: string$1()
	})),
	usage: usageSchema$1.nullish()
});
object$1({
	dimensions: number$1().optional(),
	user: string$1().optional()
});
object$1({
	data: array$1(object$1({ embedding: array$1(number$1()) })),
	usage: object$1({ prompt_tokens: number$1() }).nullish(),
	providerMetadata: record$1(string$1(), record$1(string$1(), any$1())).optional()
});
object$1({ data: array$1(object$1({ b64_json: string$1() })) });
var marker = "vercel.ai.error";
var symbol$1 = Symbol.for(marker);
var _a, _b;
var AISDKError = class _AISDKError$1 extends (_b = Error, _a = symbol$1, _b) {
	constructor({ name: name14, message, cause }) {
		super(message);
		this[_a] = true;
		this.name = name14;
		this.cause = cause;
	}
	static isInstance(error$1) {
		return _AISDKError$1.hasMarker(error$1, marker);
	}
	static hasMarker(error$1, marker15) {
		const markerSymbol = Symbol.for(marker15);
		return error$1 != null && typeof error$1 === "object" && markerSymbol in error$1 && typeof error$1[markerSymbol] === "boolean" && error$1[markerSymbol] === true;
	}
};
var name = "AI_APICallError";
var marker2 = `vercel.ai.error.${name}`;
var symbol2 = Symbol.for(marker2);
var _a2, _b2;
var APICallError = class extends (_b2 = AISDKError, _a2 = symbol2, _b2) {
	constructor({ message, url: url$1, requestBodyValues, statusCode, responseHeaders, responseBody, cause, isRetryable = statusCode != null && (statusCode === 408 || statusCode === 409 || statusCode === 429 || statusCode >= 500), data }) {
		super({
			name,
			message,
			cause
		});
		this[_a2] = true;
		this.url = url$1;
		this.requestBodyValues = requestBodyValues;
		this.statusCode = statusCode;
		this.responseHeaders = responseHeaders;
		this.responseBody = responseBody;
		this.isRetryable = isRetryable;
		this.data = data;
	}
	static isInstance(error$1) {
		return AISDKError.hasMarker(error$1, marker2);
	}
};
var name2 = "AI_EmptyResponseBodyError";
`${name2}`;
var name3 = "AI_InvalidArgumentError";
`${name3}`;
var name4 = "AI_InvalidPromptError";
`${name4}`;
var name5 = "AI_InvalidResponseDataError";
`${name5}`;
var name6 = "AI_JSONParseError";
`${name6}`;
var name7 = "AI_LoadAPIKeyError";
`${name7}`;
var name8 = "AI_LoadSettingError";
`${name8}`;
var name9 = "AI_NoContentGeneratedError";
`${name9}`;
var name10 = "AI_NoSuchModelError";
`${name10}`;
var name11 = "AI_TooManyEmbeddingValuesForCallError";
`${name11}`;
var name12 = "AI_TypeValidationError";
`${name12}`;
var name13 = "AI_UnsupportedFunctionalityError";
var marker14 = `vercel.ai.error.${name13}`;
var symbol14 = Symbol.for(marker14);
var _a14, _b14;
var UnsupportedFunctionalityError = class extends (_b14 = AISDKError, _a14 = symbol14, _b14) {
	constructor({ functionality, message = `'${functionality}' functionality not supported.` }) {
		super({
			name: name13,
			message
		});
		this[_a14] = true;
		this.functionality = functionality;
	}
	static isInstance(error$1) {
		return AISDKError.hasMarker(error$1, marker14);
	}
};
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name$2 in all) __defProp(target, name$2, {
		get: all[name$2],
		enumerable: true
	});
};
var external_exports = {};
__export(external_exports, {
	$brand: () => $brand,
	$input: () => $input,
	$output: () => $output,
	NEVER: () => NEVER,
	TimePrecision: () => TimePrecision,
	ZodAny: () => ZodAny,
	ZodArray: () => ZodArray,
	ZodBase64: () => ZodBase64,
	ZodBase64URL: () => ZodBase64URL,
	ZodBigInt: () => ZodBigInt,
	ZodBigIntFormat: () => ZodBigIntFormat,
	ZodBoolean: () => ZodBoolean,
	ZodCIDRv4: () => ZodCIDRv4,
	ZodCIDRv6: () => ZodCIDRv6,
	ZodCUID: () => ZodCUID,
	ZodCUID2: () => ZodCUID2,
	ZodCatch: () => ZodCatch,
	ZodCustom: () => ZodCustom,
	ZodCustomStringFormat: () => ZodCustomStringFormat,
	ZodDate: () => ZodDate,
	ZodDefault: () => ZodDefault,
	ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
	ZodE164: () => ZodE164,
	ZodEmail: () => ZodEmail,
	ZodEmoji: () => ZodEmoji,
	ZodEnum: () => ZodEnum,
	ZodError: () => ZodError,
	ZodFile: () => ZodFile,
	ZodGUID: () => ZodGUID,
	ZodIPv4: () => ZodIPv4,
	ZodIPv6: () => ZodIPv6,
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	ZodIntersection: () => ZodIntersection,
	ZodIssueCode: () => ZodIssueCode,
	ZodJWT: () => ZodJWT,
	ZodKSUID: () => ZodKSUID,
	ZodLazy: () => ZodLazy,
	ZodLiteral: () => ZodLiteral,
	ZodMap: () => ZodMap,
	ZodNaN: () => ZodNaN,
	ZodNanoID: () => ZodNanoID,
	ZodNever: () => ZodNever,
	ZodNonOptional: () => ZodNonOptional,
	ZodNull: () => ZodNull,
	ZodNullable: () => ZodNullable,
	ZodNumber: () => ZodNumber,
	ZodNumberFormat: () => ZodNumberFormat,
	ZodObject: () => ZodObject,
	ZodOptional: () => ZodOptional,
	ZodPipe: () => ZodPipe,
	ZodPrefault: () => ZodPrefault,
	ZodPromise: () => ZodPromise,
	ZodReadonly: () => ZodReadonly,
	ZodRealError: () => ZodRealError,
	ZodRecord: () => ZodRecord,
	ZodSet: () => ZodSet,
	ZodString: () => ZodString,
	ZodStringFormat: () => ZodStringFormat,
	ZodSuccess: () => ZodSuccess,
	ZodSymbol: () => ZodSymbol,
	ZodTemplateLiteral: () => ZodTemplateLiteral,
	ZodTransform: () => ZodTransform,
	ZodTuple: () => ZodTuple,
	ZodType: () => ZodType,
	ZodULID: () => ZodULID,
	ZodURL: () => ZodURL,
	ZodUUID: () => ZodUUID,
	ZodUndefined: () => ZodUndefined,
	ZodUnion: () => ZodUnion,
	ZodUnknown: () => ZodUnknown,
	ZodVoid: () => ZodVoid,
	ZodXID: () => ZodXID,
	_ZodString: () => _ZodString,
	_default: () => _default2,
	any: () => any,
	array: () => array,
	base64: () => base642,
	base64url: () => base64url2,
	bigint: () => bigint2,
	boolean: () => boolean2,
	catch: () => _catch2,
	check: () => check,
	cidrv4: () => cidrv42,
	cidrv6: () => cidrv62,
	clone: () => clone,
	coerce: () => coerce_exports,
	config: () => config,
	core: () => core_exports2,
	cuid: () => cuid3,
	cuid2: () => cuid22,
	custom: () => custom,
	date: () => date3,
	discriminatedUnion: () => discriminatedUnion,
	e164: () => e1642,
	email: () => email2,
	emoji: () => emoji2,
	endsWith: () => _endsWith,
	enum: () => _enum2,
	file: () => file,
	flattenError: () => flattenError,
	float32: () => float32,
	float64: () => float64,
	formatError: () => formatError,
	function: () => _function,
	getErrorMap: () => getErrorMap,
	globalRegistry: () => globalRegistry,
	gt: () => _gt,
	gte: () => _gte,
	guid: () => guid2,
	includes: () => _includes,
	instanceof: () => _instanceof,
	int: () => int,
	int32: () => int32,
	int64: () => int64,
	intersection: () => intersection,
	ipv4: () => ipv42,
	ipv6: () => ipv62,
	iso: () => iso_exports,
	json: () => json,
	jwt: () => jwt,
	keyof: () => keyof,
	ksuid: () => ksuid2,
	lazy: () => lazy,
	length: () => _length,
	literal: () => literal,
	locales: () => locales_exports,
	looseObject: () => looseObject,
	lowercase: () => _lowercase,
	lt: () => _lt,
	lte: () => _lte,
	map: () => map,
	maxLength: () => _maxLength,
	maxSize: () => _maxSize,
	mime: () => _mime,
	minLength: () => _minLength,
	minSize: () => _minSize,
	multipleOf: () => _multipleOf,
	nan: () => nan,
	nanoid: () => nanoid2,
	nativeEnum: () => nativeEnum,
	negative: () => _negative,
	never: () => never,
	nonnegative: () => _nonnegative,
	nonoptional: () => nonoptional,
	nonpositive: () => _nonpositive,
	normalize: () => _normalize,
	null: () => _null3,
	nullable: () => nullable,
	nullish: () => nullish2,
	number: () => number2,
	object: () => object,
	optional: () => optional,
	overwrite: () => _overwrite,
	parse: () => parse2,
	parseAsync: () => parseAsync2,
	partialRecord: () => partialRecord,
	pipe: () => pipe,
	positive: () => _positive,
	prefault: () => prefault,
	preprocess: () => preprocess,
	prettifyError: () => prettifyError,
	promise: () => promise,
	property: () => _property,
	readonly: () => readonly,
	record: () => record,
	refine: () => refine,
	regex: () => _regex,
	regexes: () => regexes_exports,
	registry: () => registry,
	safeParse: () => safeParse2,
	safeParseAsync: () => safeParseAsync2,
	set: () => set,
	setErrorMap: () => setErrorMap,
	size: () => _size,
	startsWith: () => _startsWith,
	strictObject: () => strictObject,
	string: () => string2,
	stringFormat: () => stringFormat,
	stringbool: () => stringbool,
	success: () => success,
	superRefine: () => superRefine,
	symbol: () => symbol,
	templateLiteral: () => templateLiteral,
	toJSONSchema: () => toJSONSchema,
	toLowerCase: () => _toLowerCase,
	toUpperCase: () => _toUpperCase,
	transform: () => transform,
	treeifyError: () => treeifyError,
	trim: () => _trim,
	tuple: () => tuple,
	uint32: () => uint32,
	uint64: () => uint64,
	ulid: () => ulid2,
	undefined: () => _undefined3,
	union: () => union,
	unknown: () => unknown,
	uppercase: () => _uppercase,
	url: () => url,
	uuid: () => uuid2,
	uuidv4: () => uuidv4,
	uuidv6: () => uuidv6,
	uuidv7: () => uuidv7,
	void: () => _void2,
	xid: () => xid2
});
var core_exports2 = {};
__export(core_exports2, {
	$ZodAny: () => $ZodAny,
	$ZodArray: () => $ZodArray,
	$ZodAsyncError: () => $ZodAsyncError,
	$ZodBase64: () => $ZodBase64,
	$ZodBase64URL: () => $ZodBase64URL,
	$ZodBigInt: () => $ZodBigInt,
	$ZodBigIntFormat: () => $ZodBigIntFormat,
	$ZodBoolean: () => $ZodBoolean,
	$ZodCIDRv4: () => $ZodCIDRv4,
	$ZodCIDRv6: () => $ZodCIDRv6,
	$ZodCUID: () => $ZodCUID,
	$ZodCUID2: () => $ZodCUID2,
	$ZodCatch: () => $ZodCatch,
	$ZodCheck: () => $ZodCheck,
	$ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
	$ZodCheckEndsWith: () => $ZodCheckEndsWith,
	$ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
	$ZodCheckIncludes: () => $ZodCheckIncludes,
	$ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
	$ZodCheckLessThan: () => $ZodCheckLessThan,
	$ZodCheckLowerCase: () => $ZodCheckLowerCase,
	$ZodCheckMaxLength: () => $ZodCheckMaxLength,
	$ZodCheckMaxSize: () => $ZodCheckMaxSize,
	$ZodCheckMimeType: () => $ZodCheckMimeType,
	$ZodCheckMinLength: () => $ZodCheckMinLength,
	$ZodCheckMinSize: () => $ZodCheckMinSize,
	$ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
	$ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
	$ZodCheckOverwrite: () => $ZodCheckOverwrite,
	$ZodCheckProperty: () => $ZodCheckProperty,
	$ZodCheckRegex: () => $ZodCheckRegex,
	$ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
	$ZodCheckStartsWith: () => $ZodCheckStartsWith,
	$ZodCheckStringFormat: () => $ZodCheckStringFormat,
	$ZodCheckUpperCase: () => $ZodCheckUpperCase,
	$ZodCustom: () => $ZodCustom,
	$ZodCustomStringFormat: () => $ZodCustomStringFormat,
	$ZodDate: () => $ZodDate,
	$ZodDefault: () => $ZodDefault,
	$ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
	$ZodE164: () => $ZodE164,
	$ZodEmail: () => $ZodEmail,
	$ZodEmoji: () => $ZodEmoji,
	$ZodEnum: () => $ZodEnum,
	$ZodError: () => $ZodError,
	$ZodFile: () => $ZodFile,
	$ZodFunction: () => $ZodFunction,
	$ZodGUID: () => $ZodGUID,
	$ZodIPv4: () => $ZodIPv4,
	$ZodIPv6: () => $ZodIPv6,
	$ZodISODate: () => $ZodISODate,
	$ZodISODateTime: () => $ZodISODateTime,
	$ZodISODuration: () => $ZodISODuration,
	$ZodISOTime: () => $ZodISOTime,
	$ZodIntersection: () => $ZodIntersection,
	$ZodJWT: () => $ZodJWT,
	$ZodKSUID: () => $ZodKSUID,
	$ZodLazy: () => $ZodLazy,
	$ZodLiteral: () => $ZodLiteral,
	$ZodMap: () => $ZodMap,
	$ZodNaN: () => $ZodNaN,
	$ZodNanoID: () => $ZodNanoID,
	$ZodNever: () => $ZodNever,
	$ZodNonOptional: () => $ZodNonOptional,
	$ZodNull: () => $ZodNull,
	$ZodNullable: () => $ZodNullable,
	$ZodNumber: () => $ZodNumber,
	$ZodNumberFormat: () => $ZodNumberFormat,
	$ZodObject: () => $ZodObject,
	$ZodOptional: () => $ZodOptional,
	$ZodPipe: () => $ZodPipe,
	$ZodPrefault: () => $ZodPrefault,
	$ZodPromise: () => $ZodPromise,
	$ZodReadonly: () => $ZodReadonly,
	$ZodRealError: () => $ZodRealError,
	$ZodRecord: () => $ZodRecord,
	$ZodRegistry: () => $ZodRegistry,
	$ZodSet: () => $ZodSet,
	$ZodString: () => $ZodString,
	$ZodStringFormat: () => $ZodStringFormat,
	$ZodSuccess: () => $ZodSuccess,
	$ZodSymbol: () => $ZodSymbol,
	$ZodTemplateLiteral: () => $ZodTemplateLiteral,
	$ZodTransform: () => $ZodTransform,
	$ZodTuple: () => $ZodTuple,
	$ZodType: () => $ZodType,
	$ZodULID: () => $ZodULID,
	$ZodURL: () => $ZodURL,
	$ZodUUID: () => $ZodUUID,
	$ZodUndefined: () => $ZodUndefined,
	$ZodUnion: () => $ZodUnion,
	$ZodUnknown: () => $ZodUnknown,
	$ZodVoid: () => $ZodVoid,
	$ZodXID: () => $ZodXID,
	$brand: () => $brand,
	$constructor: () => $constructor,
	$input: () => $input,
	$output: () => $output,
	Doc: () => Doc,
	JSONSchema: () => json_schema_exports,
	JSONSchemaGenerator: () => JSONSchemaGenerator,
	NEVER: () => NEVER,
	TimePrecision: () => TimePrecision,
	_any: () => _any,
	_array: () => _array,
	_base64: () => _base64,
	_base64url: () => _base64url,
	_bigint: () => _bigint,
	_boolean: () => _boolean,
	_catch: () => _catch,
	_cidrv4: () => _cidrv4,
	_cidrv6: () => _cidrv6,
	_coercedBigint: () => _coercedBigint,
	_coercedBoolean: () => _coercedBoolean,
	_coercedDate: () => _coercedDate,
	_coercedNumber: () => _coercedNumber,
	_coercedString: () => _coercedString,
	_cuid: () => _cuid,
	_cuid2: () => _cuid2,
	_custom: () => _custom,
	_date: () => _date,
	_default: () => _default,
	_discriminatedUnion: () => _discriminatedUnion,
	_e164: () => _e164,
	_email: () => _email,
	_emoji: () => _emoji2,
	_endsWith: () => _endsWith,
	_enum: () => _enum,
	_file: () => _file,
	_float32: () => _float32,
	_float64: () => _float64,
	_gt: () => _gt,
	_gte: () => _gte,
	_guid: () => _guid,
	_includes: () => _includes,
	_int: () => _int,
	_int32: () => _int32,
	_int64: () => _int64,
	_intersection: () => _intersection,
	_ipv4: () => _ipv4,
	_ipv6: () => _ipv6,
	_isoDate: () => _isoDate,
	_isoDateTime: () => _isoDateTime,
	_isoDuration: () => _isoDuration,
	_isoTime: () => _isoTime,
	_jwt: () => _jwt,
	_ksuid: () => _ksuid,
	_lazy: () => _lazy,
	_length: () => _length,
	_literal: () => _literal,
	_lowercase: () => _lowercase,
	_lt: () => _lt,
	_lte: () => _lte,
	_map: () => _map,
	_max: () => _lte,
	_maxLength: () => _maxLength,
	_maxSize: () => _maxSize,
	_mime: () => _mime,
	_min: () => _gte,
	_minLength: () => _minLength,
	_minSize: () => _minSize,
	_multipleOf: () => _multipleOf,
	_nan: () => _nan,
	_nanoid: () => _nanoid,
	_nativeEnum: () => _nativeEnum,
	_negative: () => _negative,
	_never: () => _never,
	_nonnegative: () => _nonnegative,
	_nonoptional: () => _nonoptional,
	_nonpositive: () => _nonpositive,
	_normalize: () => _normalize,
	_null: () => _null2,
	_nullable: () => _nullable,
	_number: () => _number,
	_optional: () => _optional,
	_overwrite: () => _overwrite,
	_parse: () => _parse,
	_parseAsync: () => _parseAsync,
	_pipe: () => _pipe,
	_positive: () => _positive,
	_promise: () => _promise,
	_property: () => _property,
	_readonly: () => _readonly,
	_record: () => _record,
	_refine: () => _refine,
	_regex: () => _regex,
	_safeParse: () => _safeParse,
	_safeParseAsync: () => _safeParseAsync,
	_set: () => _set,
	_size: () => _size,
	_startsWith: () => _startsWith,
	_string: () => _string,
	_stringFormat: () => _stringFormat,
	_stringbool: () => _stringbool,
	_success: () => _success,
	_symbol: () => _symbol,
	_templateLiteral: () => _templateLiteral,
	_toLowerCase: () => _toLowerCase,
	_toUpperCase: () => _toUpperCase,
	_transform: () => _transform,
	_trim: () => _trim,
	_tuple: () => _tuple,
	_uint32: () => _uint32,
	_uint64: () => _uint64,
	_ulid: () => _ulid,
	_undefined: () => _undefined2,
	_union: () => _union,
	_unknown: () => _unknown,
	_uppercase: () => _uppercase,
	_url: () => _url,
	_uuid: () => _uuid,
	_uuidv4: () => _uuidv4,
	_uuidv6: () => _uuidv6,
	_uuidv7: () => _uuidv7,
	_void: () => _void,
	_xid: () => _xid,
	clone: () => clone,
	config: () => config,
	flattenError: () => flattenError,
	formatError: () => formatError,
	function: () => _function,
	globalConfig: () => globalConfig,
	globalRegistry: () => globalRegistry,
	isValidBase64: () => isValidBase64,
	isValidBase64URL: () => isValidBase64URL,
	isValidJWT: () => isValidJWT,
	locales: () => locales_exports,
	parse: () => parse,
	parseAsync: () => parseAsync,
	prettifyError: () => prettifyError,
	regexes: () => regexes_exports,
	registry: () => registry,
	safeParse: () => safeParse,
	safeParseAsync: () => safeParseAsync,
	toDotPath: () => toDotPath,
	toJSONSchema: () => toJSONSchema,
	treeifyError: () => treeifyError,
	util: () => util_exports,
	version: () => version
});
var NEVER = Object.freeze({ status: "aborted" });
/* @__NO_SIDE_EFFECTS__ */
function $constructor(name$2, initializer3, params) {
	function init(inst, def) {
		var _a$2;
		Object.defineProperty(inst, "_zod", {
			value: inst._zod ?? {},
			enumerable: false
		});
		(_a$2 = inst._zod).traits ?? (_a$2.traits = /* @__PURE__ */ new Set());
		inst._zod.traits.add(name$2);
		initializer3(inst, def);
		for (const k in _.prototype) if (!(k in inst)) Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
		inst._zod.constr = _;
		inst._zod.def = def;
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name$2 });
	function _(def) {
		var _a$2;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a$2 = inst._zod).deferred ?? (_a$2.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name$2);
	} });
	Object.defineProperty(_, "name", { value: name$2 });
	return _;
}
var $brand = Symbol("zod_brand");
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var globalConfig = {};
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
var util_exports = {};
__export(util_exports, {
	BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
	Class: () => Class,
	NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
	aborted: () => aborted,
	allowsEval: () => allowsEval,
	assert: () => assert,
	assertEqual: () => assertEqual,
	assertIs: () => assertIs,
	assertNever: () => assertNever,
	assertNotEqual: () => assertNotEqual,
	assignProp: () => assignProp,
	cached: () => cached,
	captureStackTrace: () => captureStackTrace,
	cleanEnum: () => cleanEnum,
	cleanRegex: () => cleanRegex,
	clone: () => clone,
	createTransparentProxy: () => createTransparentProxy,
	defineLazy: () => defineLazy,
	esc: () => esc,
	escapeRegex: () => escapeRegex,
	extend: () => extend,
	finalizeIssue: () => finalizeIssue,
	floatSafeRemainder: () => floatSafeRemainder,
	getElementAtPath: () => getElementAtPath,
	getEnumValues: () => getEnumValues,
	getLengthableOrigin: () => getLengthableOrigin,
	getParsedType: () => getParsedType,
	getSizableOrigin: () => getSizableOrigin,
	isObject: () => isObject,
	isPlainObject: () => isPlainObject,
	issue: () => issue,
	joinValues: () => joinValues,
	jsonStringifyReplacer: () => jsonStringifyReplacer,
	merge: () => merge,
	normalizeParams: () => normalizeParams,
	nullish: () => nullish,
	numKeys: () => numKeys,
	omit: () => omit,
	optionalKeys: () => optionalKeys,
	partial: () => partial,
	pick: () => pick,
	prefixIssues: () => prefixIssues,
	primitiveTypes: () => primitiveTypes,
	promiseAllObject: () => promiseAllObject,
	propertyKeyTypes: () => propertyKeyTypes,
	randomString: () => randomString,
	required: () => required,
	stringifyPrimitive: () => stringifyPrimitive,
	unwrapMessage: () => unwrapMessage
});
function assertEqual(val) {
	return val;
}
function assertNotEqual(val) {
	return val;
}
function assertIs(_arg) {}
function assertNever(_x) {
	throw new Error();
}
function assert(_) {}
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
	return values;
}
function joinValues(array2, separator = "|") {
	return array2.map((val) => stringifyPrimitive(val)).join(separator);
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
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
	const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
	return valInt % stepInt / 10 ** decCount;
}
function defineLazy(object2, key, getter) {
	Object.defineProperty(object2, key, {
		get() {
			{
				const value = getter();
				object2[key] = value;
				return value;
			}
			throw new Error("cached value already set");
		},
		set(v) {
			Object.defineProperty(object2, key, { value: v });
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
function getElementAtPath(obj, path) {
	if (!path) return obj;
	return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
	const keys = Object.keys(promisesObj);
	const promises = keys.map((key) => promisesObj[key]);
	return Promise.all(promises).then((results) => {
		const resolvedObj = {};
		for (let i = 0; i < keys.length; i++) resolvedObj[keys[i]] = results[i];
		return resolvedObj;
	});
}
function randomString(length = 10) {
	const chars = "abcdefghijklmnopqrstuvwxyz";
	let str = "";
	for (let i = 0; i < length; i++) str += chars[Math.floor(Math.random() * 26)];
	return str;
}
function esc(str) {
	return JSON.stringify(str);
}
var captureStackTrace = Error.captureStackTrace ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = cached(() => {
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		const F = Function;
		new F("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function numKeys(data) {
	let keyCount = 0;
	for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) keyCount++;
	return keyCount;
}
var getParsedType = (data) => {
	const t = typeof data;
	switch (t) {
		case "undefined": return "undefined";
		case "string": return "string";
		case "number": return Number.isNaN(data) ? "nan" : "number";
		case "boolean": return "boolean";
		case "function": return "function";
		case "bigint": return "bigint";
		case "symbol": return "symbol";
		case "object":
			if (Array.isArray(data)) return "array";
			if (data === null) return "null";
			if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return "promise";
			if (typeof Map !== "undefined" && data instanceof Map) return "map";
			if (typeof Set !== "undefined" && data instanceof Set) return "set";
			if (typeof Date !== "undefined" && data instanceof Date) return "date";
			if (typeof File !== "undefined" && data instanceof File) return "file";
			return "object";
		default: throw new Error(`Unknown data type: ${t}`);
	}
};
var propertyKeyTypes = /* @__PURE__ */ new Set([
	"string",
	"number",
	"symbol"
]);
var primitiveTypes = /* @__PURE__ */ new Set([
	"string",
	"number",
	"bigint",
	"boolean",
	"symbol",
	"undefined"
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
function createTransparentProxy(getter) {
	let target;
	return new Proxy({}, {
		get(_, prop, receiver) {
			target ?? (target = getter());
			return Reflect.get(target, prop, receiver);
		},
		set(_, prop, value, receiver) {
			target ?? (target = getter());
			return Reflect.set(target, prop, value, receiver);
		},
		has(_, prop) {
			target ?? (target = getter());
			return Reflect.has(target, prop);
		},
		deleteProperty(_, prop) {
			target ?? (target = getter());
			return Reflect.deleteProperty(target, prop);
		},
		ownKeys(_) {
			target ?? (target = getter());
			return Reflect.ownKeys(target);
		},
		getOwnPropertyDescriptor(_, prop) {
			target ?? (target = getter());
			return Reflect.getOwnPropertyDescriptor(target, prop);
		},
		defineProperty(_, prop, descriptor) {
			target ?? (target = getter());
			return Reflect.defineProperty(target, prop, descriptor);
		}
	});
}
function stringifyPrimitive(value) {
	if (typeof value === "bigint") return value.toString() + "n";
	if (typeof value === "string") return `"${value}"`;
	return `${value}`;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
var NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
var BIGINT_FORMAT_RANGES = {
	int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
	const newShape = {};
	const currDef = schema._zod.def;
	for (const key in mask) {
		if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
		if (!mask[key]) continue;
		newShape[key] = currDef.shape[key];
	}
	return clone(schema, {
		...schema._zod.def,
		shape: newShape,
		checks: []
	});
}
function omit(schema, mask) {
	const newShape = { ...schema._zod.def.shape };
	const currDef = schema._zod.def;
	for (const key in mask) {
		if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
		if (!mask[key]) continue;
		delete newShape[key];
	}
	return clone(schema, {
		...schema._zod.def,
		shape: newShape,
		checks: []
	});
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const def = {
		...schema._zod.def,
		get shape() {
			const _shape = {
				...schema._zod.def.shape,
				...shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		checks: []
	};
	return clone(schema, def);
}
function merge(a, b) {
	return clone(a, {
		...a._zod.def,
		get shape() {
			const _shape = {
				...a._zod.def.shape,
				...b._zod.def.shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		catchall: b._zod.def.catchall,
		checks: []
	});
}
function partial(Class2, schema, mask) {
	const oldShape = schema._zod.def.shape;
	const shape = { ...oldShape };
	if (mask) for (const key in mask) {
		if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
		if (!mask[key]) continue;
		shape[key] = Class2 ? new Class2({
			type: "optional",
			innerType: oldShape[key]
		}) : oldShape[key];
	}
	else for (const key in oldShape) shape[key] = Class2 ? new Class2({
		type: "optional",
		innerType: oldShape[key]
	}) : oldShape[key];
	return clone(schema, {
		...schema._zod.def,
		shape,
		checks: []
	});
}
function required(Class2, schema, mask) {
	const oldShape = schema._zod.def.shape;
	const shape = { ...oldShape };
	if (mask) for (const key in mask) {
		if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
		if (!mask[key]) continue;
		shape[key] = new Class2({
			type: "nonoptional",
			innerType: oldShape[key]
		});
	}
	else for (const key in oldShape) shape[key] = new Class2({
		type: "nonoptional",
		innerType: oldShape[key]
	});
	return clone(schema, {
		...schema._zod.def,
		shape,
		checks: []
	});
}
function aborted(x, startIndex = 0) {
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a$2;
		(_a$2 = iss).path ?? (_a$2.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
	const full = {
		...iss,
		path: iss.path ?? []
	};
	if (!iss.message) {
		const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
		full.message = message;
	}
	delete full.inst;
	delete full.continue;
	if (!ctx?.reportInput) delete full.input;
	return full;
}
function getSizableOrigin(input) {
	if (input instanceof Set) return "set";
	if (input instanceof Map) return "map";
	if (input instanceof File) return "file";
	return "unknown";
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
function cleanEnum(obj) {
	return Object.entries(obj).filter(([k, _]) => {
		return Number.isNaN(Number.parseInt(k, 10));
	}).map((el) => el[1]);
}
var Class = class {
	constructor(..._args) {}
};
var initializer = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	Object.defineProperty(inst, "message", {
		get() {
			return JSON.stringify(def, jsonStringifyReplacer, 2);
		},
		enumerable: true
	});
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false
	});
};
var $ZodError = /* @__PURE__ */ $constructor("$ZodError", initializer);
var $ZodRealError = /* @__PURE__ */ $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error40, mapper = (issue2) => issue2.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error40.issues) if (sub.path.length > 0) {
		fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		fieldErrors[sub.path[0]].push(mapper(sub));
	} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error40, _mapper) {
	const mapper = _mapper || function(issue2) {
		return issue2.message;
	};
	const fieldErrors = { _errors: [] };
	const processError = (error41) => {
		for (const issue2 of error41.issues) if (issue2.code === "invalid_union" && issue2.errors.length) issue2.errors.map((issues) => processError({ issues }));
		else if (issue2.code === "invalid_key") processError({ issues: issue2.issues });
		else if (issue2.code === "invalid_element") processError({ issues: issue2.issues });
		else if (issue2.path.length === 0) fieldErrors._errors.push(mapper(issue2));
		else {
			let curr = fieldErrors;
			let i = 0;
			while (i < issue2.path.length) {
				const el = issue2.path[i];
				const terminal = i === issue2.path.length - 1;
				if (!terminal) curr[el] = curr[el] || { _errors: [] };
				else {
					curr[el] = curr[el] || { _errors: [] };
					curr[el]._errors.push(mapper(issue2));
				}
				curr = curr[el];
				i++;
			}
		}
	};
	processError(error40);
	return fieldErrors;
}
function treeifyError(error40, _mapper) {
	const mapper = _mapper || function(issue2) {
		return issue2.message;
	};
	const result = { errors: [] };
	const processError = (error41, path = []) => {
		var _a$2, _b$1;
		for (const issue2 of error41.issues) if (issue2.code === "invalid_union" && issue2.errors.length) issue2.errors.map((issues) => processError({ issues }, issue2.path));
		else if (issue2.code === "invalid_key") processError({ issues: issue2.issues }, issue2.path);
		else if (issue2.code === "invalid_element") processError({ issues: issue2.issues }, issue2.path);
		else {
			const fullpath = [...path, ...issue2.path];
			if (fullpath.length === 0) {
				result.errors.push(mapper(issue2));
				continue;
			}
			let curr = result;
			let i = 0;
			while (i < fullpath.length) {
				const el = fullpath[i];
				const terminal = i === fullpath.length - 1;
				if (typeof el === "string") {
					curr.properties ?? (curr.properties = {});
					(_a$2 = curr.properties)[el] ?? (_a$2[el] = { errors: [] });
					curr = curr.properties[el];
				} else {
					curr.items ?? (curr.items = []);
					(_b$1 = curr.items)[el] ?? (_b$1[el] = { errors: [] });
					curr = curr.items[el];
				}
				if (terminal) curr.errors.push(mapper(issue2));
				i++;
			}
		}
	};
	processError(error40);
	return result;
}
function toDotPath(path) {
	const segs = [];
	for (const seg of path) if (typeof seg === "number") segs.push(`[${seg}]`);
	else if (typeof seg === "symbol") segs.push(`[${JSON.stringify(String(seg))}]`);
	else if (/[^\w$]/.test(seg)) segs.push(`[${JSON.stringify(seg)}]`);
	else {
		if (segs.length) segs.push(".");
		segs.push(seg);
	}
	return segs.join("");
}
function prettifyError(error40) {
	const lines = [];
	const issues = [...error40.issues].sort((a, b) => a.path.length - b.path.length);
	for (const issue2 of issues) {
		lines.push(`\u2716 ${issue2.message}`);
		if (issue2.path?.length) lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
	}
	return lines.join("\n");
}
var _parse = (_Err) => (schema, value, _ctx, _params) => {
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
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
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
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
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
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
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
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var regexes_exports = {};
__export(regexes_exports, {
	_emoji: () => _emoji,
	base64: () => base64,
	base64url: () => base64url,
	bigint: () => bigint,
	boolean: () => boolean,
	browserEmail: () => browserEmail,
	cidrv4: () => cidrv4,
	cidrv6: () => cidrv6,
	cuid: () => cuid,
	cuid2: () => cuid2,
	date: () => date,
	datetime: () => datetime,
	domain: () => domain,
	duration: () => duration,
	e164: () => e164,
	email: () => email,
	emoji: () => emoji,
	extendedDuration: () => extendedDuration,
	guid: () => guid,
	hostname: () => hostname,
	html5Email: () => html5Email,
	integer: () => integer,
	ipv4: () => ipv4,
	ipv6: () => ipv6,
	ksuid: () => ksuid,
	lowercase: () => lowercase,
	nanoid: () => nanoid,
	null: () => _null,
	number: () => number,
	rfc5322Email: () => rfc5322Email,
	string: () => string,
	time: () => time,
	ulid: () => ulid,
	undefined: () => _undefined,
	unicodeEmail: () => unicodeEmail,
	uppercase: () => uppercase,
	uuid: () => uuid,
	uuid4: () => uuid4,
	uuid6: () => uuid6,
	uuid7: () => uuid7,
	xid: () => xid
});
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version2) => {
	if (!version2) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/;
	return /* @__PURE__ */ new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version2}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
	return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var hostname = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
var domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var e164 = /^\+(?:[0-9]){6,14}[0-9]$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
	return regex;
}
function time(args) {
	return /* @__PURE__ */ new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
	const time3 = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-]\\d{2}:\\d{2})`);
	const timeRegex = `${time3}(?:${opts.join("|")})`;
	return /* @__PURE__ */ new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return /* @__PURE__ */ new RegExp(`^${regex}$`);
};
var bigint = /^\d+n?$/;
var integer = /^\d+$/;
var number = /^-?\d+(?:\.\d+)?/i;
var boolean = /true|false/i;
var _null = /null/i;
var _undefined = /undefined/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
	var _a$2;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a$2 = inst._zod).onattach ?? (_a$2.onattach = []);
});
var numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
		const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
		else bag.exclusiveMaximum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
		const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
		else bag.exclusiveMinimum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst2) => {
		var _a$2;
		(_a$2 = inst2._zod.bag).multipleOf ?? (_a$2.multipleOf = def.value);
	});
	inst._zod.check = (payload) => {
		if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
		const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
		if (isMultiple) return;
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
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	def.format = def.format || "float64";
	const isInt = def.format?.includes("int");
	const origin = isInt ? "int" : "number";
	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
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
					continue: !def.abort
				});
				else payload.issues.push({
					input,
					code: "too_small",
					minimum: Number.MIN_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
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
			inst
		});
	};
});
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
		bag.format = def.format;
		bag.minimum = minimum;
		bag.maximum = maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input < minimum) payload.issues.push({
			origin: "bigint",
			input,
			code: "too_small",
			minimum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
		if (input > maximum) payload.issues.push({
			origin: "bigint",
			input,
			code: "too_big",
			maximum,
			inst
		});
	};
});
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
	var _a$2;
	$ZodCheck.init(inst, def);
	(_a$2 = inst._zod.def).when ?? (_a$2.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.size !== void 0;
	});
	inst._zod.onattach.push((inst2) => {
		const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst2._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const size = input.size;
		if (size <= def.maximum) return;
		payload.issues.push({
			origin: getSizableOrigin(input),
			code: "too_big",
			maximum: def.maximum,
			input,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
	var _a$2;
	$ZodCheck.init(inst, def);
	(_a$2 = inst._zod.def).when ?? (_a$2.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.size !== void 0;
	});
	inst._zod.onattach.push((inst2) => {
		const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst2._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const size = input.size;
		if (size >= def.minimum) return;
		payload.issues.push({
			origin: getSizableOrigin(input),
			code: "too_small",
			minimum: def.minimum,
			input,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
	var _a$2;
	$ZodCheck.init(inst, def);
	(_a$2 = inst._zod.def).when ?? (_a$2.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.size !== void 0;
	});
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
		bag.minimum = def.size;
		bag.maximum = def.size;
		bag.size = def.size;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const size = input.size;
		if (size === def.size) return;
		const tooBig = size > def.size;
		payload.issues.push({
			origin: getSizableOrigin(input),
			...tooBig ? {
				code: "too_big",
				maximum: def.size
			} : {
				code: "too_small",
				minimum: def.size
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a$2;
	$ZodCheck.init(inst, def);
	(_a$2 = inst._zod.def).when ?? (_a$2.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst2) => {
		const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst2._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length <= def.maximum) return;
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
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a$2;
	$ZodCheck.init(inst, def);
	(_a$2 = inst._zod.def).when ?? (_a$2.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst2) => {
		const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst2._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length >= def.minimum) return;
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
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a$2;
	$ZodCheck.init(inst, def);
	(_a$2 = inst._zod.def).when ?? (_a$2.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
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
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a$2, _b$1;
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
		bag.format = def.format;
		if (def.pattern) {
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(def.pattern);
		}
	});
	if (def.pattern) (_a$2 = inst._zod).check ?? (_a$2.check = (payload) => {
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
	else (_b$1 = inst._zod).check ?? (_b$1.check = () => {});
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
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
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	def.pattern = pattern;
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
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
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = /* @__PURE__ */ new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
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
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = /* @__PURE__ */ new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
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
function handleCheckPropertyResult(result, payload, property) {
	if (result.issues.length) payload.issues.push(...prefixIssues(property, result.issues));
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		const result = def.schema._zod.run({
			value: payload.value[def.property],
			issues: []
		}, {});
		if (result instanceof Promise) return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
		handleCheckPropertyResult(result, payload, def.property);
	};
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
	$ZodCheck.init(inst, def);
	const mimeSet = new Set(def.mime);
	inst._zod.onattach.push((inst2) => {
		inst2._zod.bag.mime = def.mime;
	});
	inst._zod.check = (payload) => {
		if (mimeSet.has(payload.value.type)) return;
		payload.issues.push({
			code: "invalid_value",
			values: def.mime,
			input: payload.value.type,
			inst
		});
	};
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
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
		const content = arg;
		const lines = content.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const args = this?.args;
		const content = this?.content ?? [``];
		const lines = [...content.map((x) => `  ${x}`)];
		return new F(...args, lines.join("\n"));
	}
};
var version = {
	major: 4,
	minor: 0,
	patch: 0
};
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
	var _a$2;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version;
	const checks = [...inst._zod.def.checks ?? []];
	if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a$2 = inst._zod).deferred ?? (_a$2.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks2, ctx) => {
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks2) {
				if (ch._zod.def.when) {
					const shouldRun = ch._zod.def.when(payload);
					if (!shouldRun) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					const nextLen = payload.issues.length;
					if (nextLen === currLen) return;
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					const nextLen = payload.issues.length;
					if (nextLen === currLen) continue;
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		inst._zod.run = (payload, ctx) => {
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result2) => runChecks(result2, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
	inst["~standard"] = {
		validate: (value) => {
			try {
				const r = safeParse(inst, value);
				return r.success ? { value: r.data } : { issues: r.error?.issues };
			} catch (_) {
				return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	};
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_2) {}
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
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const versionMap = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		};
		const v = versionMap[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const orig = payload.value;
			const url2 = new URL(orig);
			const href = url2.href;
			if (def.hostname) {
				def.hostname.lastIndex = 0;
				if (!def.hostname.test(url2.hostname)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: hostname.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.protocol) {
				def.protocol.lastIndex = 0;
				if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: def.protocol.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (!orig.endsWith("/") && href.endsWith("/")) payload.value = href.slice(0, -1);
			else payload.value = href;
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
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date);
	$ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration);
	$ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
		bag.format = `ipv4`;
	});
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.onattach.push((inst2) => {
		const bag = inst2._zod.bag;
		bag.format = `ipv6`;
	});
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
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		const [address, prefix] = payload.value.split("/");
		try {
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
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64);
	$ZodStringFormat.init(inst, def);
	inst._zod.onattach.push((inst2) => {
		inst2._zod.bag.contentEncoding = "base64";
	});
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
	const base643 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	const padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
	return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64url);
	$ZodStringFormat.init(inst, def);
	inst._zod.onattach.push((inst2) => {
		inst2._zod.bag.contentEncoding = "base64url";
	});
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
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
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
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
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
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (def.fn(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = inst._zod.bag.pattern ?? number;
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
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean;
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
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = bigint;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = BigInt(payload.value);
		} catch (_) {}
		if (typeof payload.value === "bigint") return payload;
		payload.issues.push({
			expected: "bigint",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
	$ZodCheckBigIntFormat.init(inst, def);
	$ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (typeof input === "symbol") return payload;
		payload.issues.push({
			expected: "symbol",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = _undefined;
	inst._zod.values = /* @__PURE__ */ new Set([void 0]);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (typeof input === "undefined") return payload;
		payload.issues.push({
			expected: "undefined",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = _null;
	inst._zod.values = /* @__PURE__ */ new Set([null]);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (input === null) return payload;
		payload.issues.push({
			expected: "null",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
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
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (typeof input === "undefined") return payload;
		payload.issues.push({
			expected: "void",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = new Date(payload.value);
		} catch (_err) {}
		const input = payload.value;
		const isDate = input instanceof Date;
		const isValidDate = isDate && !Number.isNaN(input.getTime());
		if (isValidDate) return payload;
		payload.issues.push({
			expected: "date",
			code: "invalid_type",
			input,
			...isDate ? { received: "Invalid Date" } : {},
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
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
			if (result instanceof Promise) proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
			else handleArrayResult(result, payload, i);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handleObjectResult(result, final, key) {
	if (result.issues.length) final.issues.push(...prefixIssues(key, result.issues));
	final.value[key] = result.value;
}
function handleOptionalObjectResult(result, final, key, input) {
	if (result.issues.length) if (input[key] === void 0) if (key in input) final.value[key] = void 0;
	else final.value[key] = result.value;
	else final.issues.push(...prefixIssues(key, result.issues));
	else if (result.value === void 0) {
		if (key in input) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	const _normalized = cached(() => {
		const keys = Object.keys(def.shape);
		for (const k of keys) if (!(def.shape[k] instanceof $ZodType)) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
		const okeys = optionalKeys(def.shape);
		return {
			shape: def.shape,
			keys,
			keySet: new Set(keys),
			numKeys: keys.length,
			optionalKeys: new Set(okeys)
		};
	});
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
		const ids = /* @__PURE__ */ Object.create(null);
		let counter = 0;
		for (const key of normalized.keys) ids[key] = `key_${counter++}`;
		doc.write(`const newResult = {}`);
		for (const key of normalized.keys) if (normalized.optionalKeys.has(key)) {
			const id = ids[key];
			doc.write(`const ${id} = ${parseStr(key)};`);
			const k = esc(key);
			doc.write(`
        if (${id}.issues.length) {
          if (input[${k}] === undefined) {
            if (${k} in input) {
              newResult[${k}] = undefined;
            }
          } else {
            payload.issues = payload.issues.concat(
              ${id}.issues.map((iss) => ({
                ...iss,
                path: iss.path ? [${k}, ...iss.path] : [${k}],
              }))
            );
          }
        } else if (${id}.value === undefined) {
          if (${k} in input) newResult[${k}] = undefined;
        } else {
          newResult[${k}] = ${id}.value;
        }
        `);
		} else {
			const id = ids[key];
			doc.write(`const ${id} = ${parseStr(key)};`);
			doc.write(`
          if (${id}.issues.length) payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${esc(key)}, ...iss.path] : [${esc(key)}]
          })));`);
			doc.write(`newResult[${esc(key)}] = ${id}.value`);
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		const fn = doc.compile();
		return (payload, ctx) => fn(shape, payload, ctx);
	};
	let fastpass;
	const isObject2 = isObject;
	const jit = !globalConfig.jitless;
	const allowsEval2 = allowsEval;
	const fastEnabled = jit && allowsEval2.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject2(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
		} else {
			payload.value = {};
			const shape = value.shape;
			for (const key of value.keys) {
				const el = shape[key];
				const r = el._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				const isOptional = el._zod.optin === "optional" && el._zod.optout === "optional";
				if (r instanceof Promise) proms.push(r.then((r2) => isOptional ? handleOptionalObjectResult(r2, payload, key, input) : handleObjectResult(r2, payload, key)));
				else if (isOptional) handleOptionalObjectResult(r, payload, key, input);
				else handleObjectResult(r, payload, key);
			}
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		const unrecognized = [];
		const keySet = value.keySet;
		const _catchall = catchall._zod;
		const t = _catchall.def.type;
		for (const key of Object.keys(input)) {
			if (keySet.has(key)) continue;
			if (t === "never") {
				unrecognized.push(key);
				continue;
			}
			const r = _catchall.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r2) => handleObjectResult(r2, payload, key)));
			else handleObjectResult(r, payload, key);
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
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "values", () => {
		if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
		return void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		if (def.options.every((o) => o._zod.pattern)) {
			const patterns = def.options.map((o) => o._zod.pattern);
			return /* @__PURE__ */ new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
		return void 0;
	});
	inst._zod.parse = (payload, ctx) => {
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
		return Promise.all(results).then((results2) => {
			return handleUnionResults(results2, payload, inst, ctx);
		});
	};
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
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
		const map2 = /* @__PURE__ */ new Map();
		for (const o of opts) {
			const values = o._zod.propValues[def.discriminator];
			if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
			for (const v of values) {
				if (map2.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
				map2.set(v, o);
			}
		}
		return map2;
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
			input,
			path: [def.discriminator],
			inst
		});
		return payload;
	};
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
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
		const async = left instanceof Promise || right instanceof Promise;
		if (async) return Promise.all([left, right]).then(([left2, right2]) => {
			return handleIntersectionResults(payload, left2, right2);
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
	if (left.issues.length) result.issues.push(...left.issues);
	if (right.issues.length) result.issues.push(...right.issues);
	if (aborted(result)) return result;
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
	$ZodType.init(inst, def);
	const items = def.items;
	const optStart = items.length - [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				input,
				inst,
				expected: "tuple",
				code: "invalid_type"
			});
			return payload;
		}
		payload.value = [];
		const proms = [];
		if (!def.rest) {
			const tooBig = input.length > items.length;
			const tooSmall = input.length < optStart - 1;
			if (tooBig || tooSmall) {
				payload.issues.push({
					input,
					inst,
					origin: "array",
					...tooBig ? {
						code: "too_big",
						maximum: items.length
					} : {
						code: "too_small",
						minimum: items.length
					}
				});
				return payload;
			}
		}
		let i = -1;
		for (const item of items) {
			i++;
			if (i >= input.length) {
				if (i >= optStart) continue;
			}
			const result = item._zod.run({
				value: input[i],
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
			else handleTupleResult(result, payload, i);
		}
		if (def.rest) {
			const rest = input.slice(items.length);
			for (const el of rest) {
				i++;
				const result = def.rest._zod.run({
					value: el,
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
				else handleTupleResult(result, payload, i);
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handleTupleResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
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
		if (def.keyType._zod.values) {
			const values = def.keyType._zod.values;
			payload.value = {};
			for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result2) => {
					if (result2.issues.length) payload.issues.push(...prefixIssues(key, result2.issues));
					payload.value[key] = result2.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[key] = result.value;
				}
			}
			let unrecognized;
			for (const key in input) if (!values.has(key)) {
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
				const keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (keyResult.issues.length) {
					payload.issues.push({
						origin: "record",
						code: "invalid_key",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					payload.value[keyResult.value] = keyResult.value;
					continue;
				}
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result2) => {
					if (result2.issues.length) payload.issues.push(...prefixIssues(key, result2.issues));
					payload.value[keyResult.value] = result2.value;
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
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!(input instanceof Map)) {
			payload.issues.push({
				expected: "map",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		payload.value = /* @__PURE__ */ new Map();
		for (const [key, value] of input) {
			const keyResult = def.keyType._zod.run({
				value: key,
				issues: []
			}, ctx);
			const valueResult = def.valueType._zod.run({
				value,
				issues: []
			}, ctx);
			if (keyResult instanceof Promise || valueResult instanceof Promise) proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
				handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
			}));
			else handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
	if (keyResult.issues.length) if (propertyKeyTypes.has(typeof key)) final.issues.push(...prefixIssues(key, keyResult.issues));
	else final.issues.push({
		origin: "map",
		code: "invalid_key",
		input,
		inst,
		issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
	});
	if (valueResult.issues.length) if (propertyKeyTypes.has(typeof key)) final.issues.push(...prefixIssues(key, valueResult.issues));
	else final.issues.push({
		origin: "map",
		code: "invalid_element",
		input,
		inst,
		key,
		issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
	});
	final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!(input instanceof Set)) {
			payload.issues.push({
				input,
				inst,
				expected: "set",
				code: "invalid_type"
			});
			return payload;
		}
		const proms = [];
		payload.value = /* @__PURE__ */ new Set();
		for (const item of input) {
			const result = def.valueType._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result2) => handleSetResult(result2, payload)));
			else handleSetResult(result, payload);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handleSetResult(result, final) {
	if (result.issues.length) final.issues.push(...result.issues);
	final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	inst._zod.values = new Set(values);
	inst._zod.pattern = /* @__PURE__ */ new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (inst._zod.values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.values = new Set(def.values);
	inst._zod.pattern = /* @__PURE__ */ new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? o.toString() : String(o)).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (inst._zod.values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values: def.values,
			input,
			inst
		});
		return payload;
	};
});
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (input instanceof File) return payload;
		payload.issues.push({
			expected: "file",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		const _out = def.transform(payload.value, payload);
		if (_ctx.async) {
			const output = _out instanceof Promise ? _out : Promise.resolve(_out);
			return output.then((output2) => {
				payload.value = output2;
				return payload;
			});
		}
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		return payload;
	};
});
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? /* @__PURE__ */ new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (def.innerType._zod.optin === "optional") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? /* @__PURE__ */ new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result2) => handleDefaultResult(result2, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		const v = def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result2) => handleNonOptionalResult(result2, inst));
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
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result2) => {
			payload.value = result2.issues.length === 0;
			return payload;
		});
		payload.value = result.issues.length === 0;
		return payload;
	};
});
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result2) => {
			payload.value = result2.value;
			if (result2.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
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
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
			payload.issues.push({
				input: payload.value,
				inst,
				expected: "nan",
				code: "invalid_type"
			});
			return payload;
		}
		return payload;
	};
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	inst._zod.parse = (payload, ctx) => {
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left2) => handlePipeResult(left2, def, ctx));
		return handlePipeResult(left, def, ctx);
	};
});
function handlePipeResult(left, def, ctx) {
	if (aborted(left)) return left;
	return def.out._zod.run({
		value: left.value,
		issues: left.issues
	}, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	const regexParts = [];
	for (const part of def.parts) if (part instanceof $ZodType) {
		if (!part._zod.pattern) throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
		const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
		if (!source) throw new Error(`Invalid template literal part: ${part._zod.traits}`);
		const start = source.startsWith("^") ? 1 : 0;
		const end = source.endsWith("$") ? source.length - 1 : source.length;
		regexParts.push(source.slice(start, end));
	} else if (part === null || primitiveTypes.has(typeof part)) regexParts.push(escapeRegex(`${part}`));
	else throw new Error(`Invalid template literal part: ${part}`);
	inst._zod.pattern = /* @__PURE__ */ new RegExp(`^${regexParts.join("")}$`);
	inst._zod.parse = (payload, _ctx) => {
		if (typeof payload.value !== "string") {
			payload.issues.push({
				input: payload.value,
				inst,
				expected: "template_literal",
				code: "invalid_type"
			});
			return payload;
		}
		inst._zod.pattern.lastIndex = 0;
		if (!inst._zod.pattern.test(payload.value)) {
			payload.issues.push({
				input: payload.value,
				inst,
				code: "invalid_format",
				format: "template_literal",
				pattern: inst._zod.pattern.source
			});
			return payload;
		}
		return payload;
	};
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({
			value: inner,
			issues: []
		}, ctx));
	};
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "innerType", () => def.getter());
	defineLazy(inst._zod, "pattern", () => inst._zod.innerType._zod.pattern);
	defineLazy(inst._zod, "propValues", () => inst._zod.innerType._zod.propValues);
	defineLazy(inst._zod, "optin", () => inst._zod.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => inst._zod.innerType._zod.optout);
	inst._zod.parse = (payload, ctx) => {
		const inner = inst._zod.innerType;
		return inner._zod.run(payload, ctx);
	};
});
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r2) => handleRefineResult(r2, payload, input, inst));
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
var locales_exports = {};
__export(locales_exports, {
	ar: () => ar_default,
	az: () => az_default,
	be: () => be_default,
	ca: () => ca_default,
	cs: () => cs_default,
	de: () => de_default,
	en: () => en_default,
	eo: () => eo_default,
	es: () => es_default,
	fa: () => fa_default,
	fi: () => fi_default,
	fr: () => fr_default,
	frCA: () => fr_CA_default,
	he: () => he_default,
	hu: () => hu_default,
	id: () => id_default,
	it: () => it_default,
	ja: () => ja_default,
	kh: () => kh_default,
	ko: () => ko_default,
	mk: () => mk_default,
	ms: () => ms_default,
	nl: () => nl_default,
	no: () => no_default,
	ota: () => ota_default,
	pl: () => pl_default,
	ps: () => ps_default,
	pt: () => pt_default,
	ru: () => ru_default,
	sl: () => sl_default,
	sv: () => sv_default,
	ta: () => ta_default,
	th: () => th_default,
	tr: () => tr_default,
	ua: () => ua_default,
	ur: () => ur_default,
	vi: () => vi_default,
	zhCN: () => zh_CN_default,
	zhTW: () => zh_TW_default
});
var error = () => {
	const Sizable = {
		string: {
			unit: "حرف",
			verb: "أن يحوي"
		},
		file: {
			unit: "بايت",
			verb: "أن يحوي"
		},
		array: {
			unit: "عنصر",
			verb: "أن يحوي"
		},
		set: {
			unit: "عنصر",
			verb: "أن يحوي"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "مدخل",
		email: "بريد إلكتروني",
		url: "رابط",
		emoji: "إيموجي",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "تاريخ ووقت بمعيار ISO",
		date: "تاريخ بمعيار ISO",
		time: "وقت بمعيار ISO",
		duration: "مدة بمعيار ISO",
		ipv4: "عنوان IPv4",
		ipv6: "عنوان IPv6",
		cidrv4: "مدى عناوين بصيغة IPv4",
		cidrv6: "مدى عناوين بصيغة IPv6",
		base64: "نَص بترميز base64-encoded",
		base64url: "نَص بترميز base64url-encoded",
		json_string: "نَص على هيئة JSON",
		e164: "رقم هاتف بمعيار E.164",
		jwt: "JWT",
		template_literal: "مدخل"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${issue2.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${stringifyPrimitive(issue2.values[0])}`;
				return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
				return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
				return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${issue2.prefix}"`;
				if (_issue.format === "ends_with") return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${_issue.suffix}"`;
				if (_issue.format === "includes") return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${_issue.pattern}`;
				return `${Nouns[_issue.format] ?? issue2.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
			}
			case "not_multiple_of": return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${issue2.divisor}`;
			case "unrecognized_keys": return `\u0645\u0639\u0631\u0641${issue2.keys.length > 1 ? "ات" : ""} \u063A\u0631\u064A\u0628${issue2.keys.length > 1 ? "ة" : ""}: ${joinValues(issue2.keys, "، ")}`;
			case "invalid_key": return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
			case "invalid_union": return "مدخل غير مقبول";
			case "invalid_element": return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
			default: return "مدخل غير مقبول";
		}
	};
};
function ar_default() {
	return { localeError: error() };
}
var error2 = () => {
	const Sizable = {
		string: {
			unit: "simvol",
			verb: "olmalıdır"
		},
		file: {
			unit: "bayt",
			verb: "olmalıdır"
		},
		array: {
			unit: "element",
			verb: "olmalıdır"
		},
		set: {
			unit: "element",
			verb: "olmalıdır"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		jwt: "JWT",
		template_literal: "input"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${issue2.expected}, daxil olan ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue2.values[0])}`;
				return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
				return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
				if (_issue.format === "ends_with") return `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir`;
				if (_issue.format === "includes") return `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r`;
				if (_issue.format === "regex") return `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
				return `Yanl\u0131\u015F ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Yanl\u0131\u015F \u0259d\u0259d: ${issue2.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
			case "unrecognized_keys": return `Tan\u0131nmayan a\xE7ar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
			case "invalid_union": return "Yanlış dəyər";
			case "invalid_element": return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
			default: return `Yanl\u0131\u015F d\u0259y\u0259r`;
		}
	};
};
function az_default() {
	return { localeError: error2() };
}
function getBelarusianPlural(count, one, few, many) {
	const absCount = Math.abs(count);
	const lastDigit = absCount % 10;
	const lastTwoDigits = absCount % 100;
	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return many;
	if (lastDigit === 1) return one;
	if (lastDigit >= 2 && lastDigit <= 4) return few;
	return many;
}
var error3 = () => {
	const Sizable = {
		string: {
			unit: {
				one: "сімвал",
				few: "сімвалы",
				many: "сімвалаў"
			},
			verb: "мець"
		},
		array: {
			unit: {
				one: "элемент",
				few: "элементы",
				many: "элементаў"
			},
			verb: "мець"
		},
		set: {
			unit: {
				one: "элемент",
				few: "элементы",
				many: "элементаў"
			},
			verb: "мець"
		},
		file: {
			unit: {
				one: "байт",
				few: "байты",
				many: "байтаў"
			},
			verb: "мець"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "лік";
			case "object":
				if (Array.isArray(data)) return "масіў";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "увод",
		email: "email адрас",
		url: "URL",
		emoji: "эмодзі",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO дата і час",
		date: "ISO дата",
		time: "ISO час",
		duration: "ISO працягласць",
		ipv4: "IPv4 адрас",
		ipv6: "IPv6 адрас",
		cidrv4: "IPv4 дыяпазон",
		cidrv6: "IPv6 дыяпазон",
		base64: "радок у фармаце base64",
		base64url: "радок у фармаце base64url",
		json_string: "JSON радок",
		e164: "нумар E.164",
		jwt: "JWT",
		template_literal: "увод"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${issue2.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
				return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) {
					const maxValue = Number(issue2.maximum);
					const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "значэнне"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
				}
				return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "значэнне"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) {
					const minValue = Number(issue2.minimum);
					const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
				}
				return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"`;
				if (_issue.format === "includes") return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
				return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
			case "unrecognized_keys": return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue2.keys.length > 1 ? "ключы" : "ключ"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
			case "invalid_union": return "Няправільны ўвод";
			case "invalid_element": return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue2.origin}`;
			default: return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434`;
		}
	};
};
function be_default() {
	return { localeError: error3() };
}
var error4 = () => {
	const Sizable = {
		string: {
			unit: "caràcters",
			verb: "contenir"
		},
		file: {
			unit: "bytes",
			verb: "contenir"
		},
		array: {
			unit: "elements",
			verb: "contenir"
		},
		set: {
			unit: "elements",
			verb: "contenir"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "entrada",
		email: "adreça electrònica",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "data i hora ISO",
		date: "data ISO",
		time: "hora ISO",
		duration: "durada ISO",
		ipv4: "adreça IPv4",
		ipv6: "adreça IPv6",
		cidrv4: "rang IPv4",
		cidrv6: "rang IPv6",
		base64: "cadena codificada en base64",
		base64url: "cadena codificada en base64url",
		json_string: "cadena JSON",
		e164: "número E.164",
		jwt: "JWT",
		template_literal: "entrada"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Tipus inv\xE0lid: s'esperava ${issue2.expected}, s'ha rebut ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
				return `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "com a màxim" : "menys de";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingu\xE9s ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
				return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? "com a mínim" : "més de";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Massa petit: s'esperava que ${issue2.origin} contingu\xE9s ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
				return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Format inv\xE0lid: ha d'incloure "${_issue.includes}"`;
				if (_issue.format === "regex") return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}`;
				return `Format inv\xE0lid per a ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue2.divisor}`;
			case "unrecognized_keys": return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Clau inv\xE0lida a ${issue2.origin}`;
			case "invalid_union": return "Entrada invàlida";
			case "invalid_element": return `Element inv\xE0lid a ${issue2.origin}`;
			default: return `Entrada inv\xE0lida`;
		}
	};
};
function ca_default() {
	return { localeError: error4() };
}
var error5 = () => {
	const Sizable = {
		string: {
			unit: "znaků",
			verb: "mít"
		},
		file: {
			unit: "bajtů",
			verb: "mít"
		},
		array: {
			unit: "prvků",
			verb: "mít"
		},
		set: {
			unit: "prvků",
			verb: "mít"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "číslo";
			case "string": return "řetězec";
			case "boolean": return "boolean";
			case "bigint": return "bigint";
			case "function": return "funkce";
			case "symbol": return "symbol";
			case "undefined": return "undefined";
			case "object":
				if (Array.isArray(data)) return "pole";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "regulární výraz",
		email: "e-mailová adresa",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "datum a čas ve formátu ISO",
		date: "datum ve formátu ISO",
		time: "čas ve formátu ISO",
		duration: "doba trvání ISO",
		ipv4: "IPv4 adresa",
		ipv6: "IPv6 adresa",
		cidrv4: "rozsah IPv4",
		cidrv6: "rozsah IPv6",
		base64: "řetězec zakódovaný ve formátu base64",
		base64url: "řetězec zakódovaný ve formátu base64url",
		json_string: "řetězec ve formátu JSON",
		e164: "číslo E.164",
		jwt: "JWT",
		template_literal: "vstup"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${issue2.expected}, obdr\u017Eeno ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue2.values[0])}`;
				return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvků"}`;
				return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvků"}`;
				return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"`;
				if (_issue.format === "regex") return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}`;
				return `Neplatn\xFD form\xE1t ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue2.divisor}`;
			case "unrecognized_keys": return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Neplatn\xFD kl\xED\u010D v ${issue2.origin}`;
			case "invalid_union": return "Neplatný vstup";
			case "invalid_element": return `Neplatn\xE1 hodnota v ${issue2.origin}`;
			default: return `Neplatn\xFD vstup`;
		}
	};
};
function cs_default() {
	return { localeError: error5() };
}
var error6 = () => {
	const Sizable = {
		string: {
			unit: "Zeichen",
			verb: "zu haben"
		},
		file: {
			unit: "Bytes",
			verb: "zu haben"
		},
		array: {
			unit: "Elemente",
			verb: "zu haben"
		},
		set: {
			unit: "Elemente",
			verb: "zu haben"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "Zahl";
			case "object":
				if (Array.isArray(data)) return "Array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "Eingabe",
		email: "E-Mail-Adresse",
		url: "URL",
		emoji: "Emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO-Datum und -Uhrzeit",
		date: "ISO-Datum",
		time: "ISO-Uhrzeit",
		duration: "ISO-Dauer",
		ipv4: "IPv4-Adresse",
		ipv6: "IPv6-Adresse",
		cidrv4: "IPv4-Bereich",
		cidrv6: "IPv6-Bereich",
		base64: "Base64-codierter String",
		base64url: "Base64-URL-codierter String",
		json_string: "JSON-String",
		e164: "E.164-Nummer",
		jwt: "JWT",
		template_literal: "Eingabe"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Ung\xFCltige Eingabe: erwartet ${issue2.expected}, erhalten ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
				return `Ung\xFCltige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
				return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
				return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen`;
				if (_issue.format === "ends_with") return `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden`;
				if (_issue.format === "includes") return `Ung\xFCltiger String: muss "${_issue.includes}" enthalten`;
				if (_issue.format === "regex") return `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen`;
				return `Ung\xFCltig: ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
			case "unrecognized_keys": return `${issue2.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Ung\xFCltiger Schl\xFCssel in ${issue2.origin}`;
			case "invalid_union": return "Ungültige Eingabe";
			case "invalid_element": return `Ung\xFCltiger Wert in ${issue2.origin}`;
			default: return `Ung\xFCltige Eingabe`;
		}
	};
};
function de_default() {
	return { localeError: error6() };
}
var parsedType = (data) => {
	const t = typeof data;
	switch (t) {
		case "number": return Number.isNaN(data) ? "NaN" : "number";
		case "object":
			if (Array.isArray(data)) return "array";
			if (data === null) return "null";
			if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
	}
	return t;
};
var error7 = () => {
	const Sizable = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const Nouns = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		jwt: "JWT",
		template_literal: "input"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Invalid input: expected ${issue2.expected}, received ${parsedType(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
				return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
				return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
				if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
				return `Invalid ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${issue2.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${issue2.origin}`;
			case "invalid_union": return "Invalid input";
			case "invalid_element": return `Invalid value in ${issue2.origin}`;
			default: return `Invalid input`;
		}
	};
};
function en_default() {
	return { localeError: error7() };
}
var parsedType2 = (data) => {
	const t = typeof data;
	switch (t) {
		case "number": return Number.isNaN(data) ? "NaN" : "nombro";
		case "object":
			if (Array.isArray(data)) return "tabelo";
			if (data === null) return "senvalora";
			if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
	}
	return t;
};
var error8 = () => {
	const Sizable = {
		string: {
			unit: "karaktrojn",
			verb: "havi"
		},
		file: {
			unit: "bajtojn",
			verb: "havi"
		},
		array: {
			unit: "elementojn",
			verb: "havi"
		},
		set: {
			unit: "elementojn",
			verb: "havi"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const Nouns = {
		regex: "enigo",
		email: "retadreso",
		url: "URL",
		emoji: "emoĝio",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO-datotempo",
		date: "ISO-dato",
		time: "ISO-tempo",
		duration: "ISO-daŭro",
		ipv4: "IPv4-adreso",
		ipv6: "IPv6-adreso",
		cidrv4: "IPv4-rango",
		cidrv6: "IPv6-rango",
		base64: "64-ume kodita karaktraro",
		base64url: "URL-64-ume kodita karaktraro",
		json_string: "JSON-karaktraro",
		e164: "E.164-nombro",
		jwt: "JWT",
		template_literal: "enigo"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Nevalida enigo: atendi\u011Dis ${issue2.expected}, ricevi\u011Dis ${parsedType2(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue2.values[0])}`;
				return `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
				return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
				if (_issue.format === "regex") return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
				return `Nevalida ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
			case "unrecognized_keys": return `Nekonata${issue2.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Nevalida \u015Dlosilo en ${issue2.origin}`;
			case "invalid_union": return "Nevalida enigo";
			case "invalid_element": return `Nevalida valoro en ${issue2.origin}`;
			default: return `Nevalida enigo`;
		}
	};
};
function eo_default() {
	return { localeError: error8() };
}
var error9 = () => {
	const Sizable = {
		string: {
			unit: "caracteres",
			verb: "tener"
		},
		file: {
			unit: "bytes",
			verb: "tener"
		},
		array: {
			unit: "elementos",
			verb: "tener"
		},
		set: {
			unit: "elementos",
			verb: "tener"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "número";
			case "object":
				if (Array.isArray(data)) return "arreglo";
				if (data === null) return "nulo";
				if (Object.getPrototypeOf(data) !== Object.prototype) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "entrada",
		email: "dirección de correo electrónico",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "fecha y hora ISO",
		date: "fecha ISO",
		time: "hora ISO",
		duration: "duración ISO",
		ipv4: "dirección IPv4",
		ipv6: "dirección IPv6",
		cidrv4: "rango IPv4",
		cidrv6: "rango IPv6",
		base64: "cadena codificada en base64",
		base64url: "URL codificada en base64",
		json_string: "cadena JSON",
		e164: "número E.164",
		jwt: "JWT",
		template_literal: "entrada"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Entrada inv\xE1lida: se esperaba ${issue2.expected}, recibido ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
				return `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Demasiado grande: se esperaba que ${issue2.origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
				return `Demasiado grande: se esperaba que ${issue2.origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Demasiado peque\xF1o: se esperaba que ${issue2.origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Demasiado peque\xF1o: se esperaba que ${issue2.origin} fuera ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Cadena inv\xE1lida: debe incluir "${_issue.includes}"`;
				if (_issue.format === "regex") return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}`;
				return `Inv\xE1lido ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue2.divisor}`;
			case "unrecognized_keys": return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Llave inv\xE1lida en ${issue2.origin}`;
			case "invalid_union": return "Entrada inválida";
			case "invalid_element": return `Valor inv\xE1lido en ${issue2.origin}`;
			default: return `Entrada inv\xE1lida`;
		}
	};
};
function es_default() {
	return { localeError: error9() };
}
var error10 = () => {
	const Sizable = {
		string: {
			unit: "کاراکتر",
			verb: "داشته باشد"
		},
		file: {
			unit: "بایت",
			verb: "داشته باشد"
		},
		array: {
			unit: "آیتم",
			verb: "داشته باشد"
		},
		set: {
			unit: "آیتم",
			verb: "داشته باشد"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "عدد";
			case "object":
				if (Array.isArray(data)) return "آرایه";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "ورودی",
		email: "آدرس ایمیل",
		url: "URL",
		emoji: "ایموجی",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "تاریخ و زمان ایزو",
		date: "تاریخ ایزو",
		time: "زمان ایزو",
		duration: "مدت زمان ایزو",
		ipv4: "IPv4 آدرس",
		ipv6: "IPv6 آدرس",
		cidrv4: "IPv4 دامنه",
		cidrv6: "IPv6 دامنه",
		base64: "base64-encoded رشته",
		base64url: "base64url-encoded رشته",
		json_string: "JSON رشته",
		e164: "E.164 عدد",
		jwt: "JWT",
		template_literal: "ورودی"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${issue2.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${parsedType4(issue2.input)} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue2.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
				return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue2.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "مقدار"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"} \u0628\u0627\u0634\u062F`;
				return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "مقدار"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0628\u0627\u0634\u062F`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F`;
				return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0628\u0627\u0634\u062F`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
				if (_issue.format === "ends_with") return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
				if (_issue.format === "includes") return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F`;
				if (_issue.format === "regex") return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
				return `${Nouns[_issue.format] ?? issue2.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
			}
			case "not_multiple_of": return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue2.divisor} \u0628\u0627\u0634\u062F`;
			case "unrecognized_keys": return `\u06A9\u0644\u06CC\u062F${issue2.keys.length > 1 ? "های" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue2.origin}`;
			case "invalid_union": return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
			case "invalid_element": return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue2.origin}`;
			default: return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
		}
	};
};
function fa_default() {
	return { localeError: error10() };
}
var error11 = () => {
	const Sizable = {
		string: {
			unit: "merkkiä",
			subject: "merkkijonon"
		},
		file: {
			unit: "tavua",
			subject: "tiedoston"
		},
		array: {
			unit: "alkiota",
			subject: "listan"
		},
		set: {
			unit: "alkiota",
			subject: "joukon"
		},
		number: {
			unit: "",
			subject: "luvun"
		},
		bigint: {
			unit: "",
			subject: "suuren kokonaisluvun"
		},
		int: {
			unit: "",
			subject: "kokonaisluvun"
		},
		date: {
			unit: "",
			subject: "päivämäärän"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "säännöllinen lauseke",
		email: "sähköpostiosoite",
		url: "URL-osoite",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO-aikaleima",
		date: "ISO-päivämäärä",
		time: "ISO-aika",
		duration: "ISO-kesto",
		ipv4: "IPv4-osoite",
		ipv6: "IPv6-osoite",
		cidrv4: "IPv4-alue",
		cidrv6: "IPv6-alue",
		base64: "base64-koodattu merkkijono",
		base64url: "base64url-koodattu merkkijono",
		json_string: "JSON-merkkijono",
		e164: "E.164-luku",
		jwt: "JWT",
		template_literal: "templaattimerkkijono"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Virheellinen tyyppi: odotettiin ${issue2.expected}, oli ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue2.values[0])}`;
				return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
				return `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
				return `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"`;
				if (_issue.format === "regex") return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}`;
				return `Virheellinen ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Virheellinen luku: t\xE4ytyy olla luvun ${issue2.divisor} monikerta`;
			case "unrecognized_keys": return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return "Virheellinen avain tietueessa";
			case "invalid_union": return "Virheellinen unioni";
			case "invalid_element": return "Virheellinen arvo joukossa";
			default: return `Virheellinen sy\xF6te`;
		}
	};
};
function fi_default() {
	return { localeError: error11() };
}
var error12 = () => {
	const Sizable = {
		string: {
			unit: "caractères",
			verb: "avoir"
		},
		file: {
			unit: "octets",
			verb: "avoir"
		},
		array: {
			unit: "éléments",
			verb: "avoir"
		},
		set: {
			unit: "éléments",
			verb: "avoir"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "nombre";
			case "object":
				if (Array.isArray(data)) return "tableau";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "entrée",
		email: "adresse e-mail",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "date et heure ISO",
		date: "date ISO",
		time: "heure ISO",
		duration: "durée ISO",
		ipv4: "adresse IPv4",
		ipv6: "adresse IPv6",
		cidrv4: "plage IPv4",
		cidrv6: "plage IPv6",
		base64: "chaîne encodée en base64",
		base64url: "chaîne encodée en base64url",
		json_string: "chaîne JSON",
		e164: "numéro E.164",
		jwt: "JWT",
		template_literal: "entrée"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Entr\xE9e invalide : ${issue2.expected} attendu, ${parsedType4(issue2.input)} re\xE7u`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Entr\xE9e invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
				return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Trop grand : ${issue2.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
				return `Trop grand : ${issue2.origin ?? "valeur"} doit \xEAtre ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Trop petit : ${issue2.origin} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Trop petit : ${issue2.origin} doit \xEAtre ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
				if (_issue.format === "regex") return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${_issue.pattern}`;
				return `${Nouns[_issue.format] ?? issue2.format} invalide`;
			}
			case "not_multiple_of": return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
			case "unrecognized_keys": return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Cl\xE9 invalide dans ${issue2.origin}`;
			case "invalid_union": return "Entrée invalide";
			case "invalid_element": return `Valeur invalide dans ${issue2.origin}`;
			default: return `Entr\xE9e invalide`;
		}
	};
};
function fr_default() {
	return { localeError: error12() };
}
var error13 = () => {
	const Sizable = {
		string: {
			unit: "caractères",
			verb: "avoir"
		},
		file: {
			unit: "octets",
			verb: "avoir"
		},
		array: {
			unit: "éléments",
			verb: "avoir"
		},
		set: {
			unit: "éléments",
			verb: "avoir"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "entrée",
		email: "adresse courriel",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "date-heure ISO",
		date: "date ISO",
		time: "heure ISO",
		duration: "durée ISO",
		ipv4: "adresse IPv4",
		ipv6: "adresse IPv6",
		cidrv4: "plage IPv4",
		cidrv6: "plage IPv6",
		base64: "chaîne encodée en base64",
		base64url: "chaîne encodée en base64url",
		json_string: "chaîne JSON",
		e164: "numéro E.164",
		jwt: "JWT",
		template_literal: "entrée"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Entr\xE9e invalide : attendu ${issue2.expected}, re\xE7u ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
				return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "≤" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
				return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? "≥" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
				if (_issue.format === "regex") return `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}`;
				return `${Nouns[_issue.format] ?? issue2.format} invalide`;
			}
			case "not_multiple_of": return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
			case "unrecognized_keys": return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Cl\xE9 invalide dans ${issue2.origin}`;
			case "invalid_union": return "Entrée invalide";
			case "invalid_element": return `Valeur invalide dans ${issue2.origin}`;
			default: return `Entr\xE9e invalide`;
		}
	};
};
function fr_CA_default() {
	return { localeError: error13() };
}
var error14 = () => {
	const Sizable = {
		string: {
			unit: "אותיות",
			verb: "לכלול"
		},
		file: {
			unit: "בייטים",
			verb: "לכלול"
		},
		array: {
			unit: "פריטים",
			verb: "לכלול"
		},
		set: {
			unit: "פריטים",
			verb: "לכלול"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "קלט",
		email: "כתובת אימייל",
		url: "כתובת רשת",
		emoji: "אימוג'י",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "תאריך וזמן ISO",
		date: "תאריך ISO",
		time: "זמן ISO",
		duration: "משך זמן ISO",
		ipv4: "כתובת IPv4",
		ipv6: "כתובת IPv6",
		cidrv4: "טווח IPv4",
		cidrv6: "טווח IPv6",
		base64: "מחרוזת בבסיס 64",
		base64url: "מחרוזת בבסיס 64 לכתובות רשת",
		json_string: "מחרוזת JSON",
		e164: "מספר E.164",
		jwt: "JWT",
		template_literal: "קלט"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA ${issue2.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA ${stringifyPrimitive(issue2.values[0])}`;
				return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05D0\u05D7\u05EA \u05DE\u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA  ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${issue2.origin ?? "value"} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
				return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${issue2.origin ?? "value"} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${issue2.origin} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${issue2.origin} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1"${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${_issue.suffix}"`;
				if (_issue.format === "includes") return `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05E0\u05D4: \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${_issue.pattern}`;
				return `${Nouns[_issue.format] ?? issue2.format} \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
			}
			case "not_multiple_of": return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${issue2.divisor}`;
			case "unrecognized_keys": return `\u05DE\u05E4\u05EA\u05D7${issue2.keys.length > 1 ? "ות" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${issue2.keys.length > 1 ? "ים" : "ה"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u05DE\u05E4\u05EA\u05D7 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${issue2.origin}`;
			case "invalid_union": return "קלט לא תקין";
			case "invalid_element": return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${issue2.origin}`;
			default: return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
		}
	};
};
function he_default() {
	return { localeError: error14() };
}
var error15 = () => {
	const Sizable = {
		string: {
			unit: "karakter",
			verb: "legyen"
		},
		file: {
			unit: "byte",
			verb: "legyen"
		},
		array: {
			unit: "elem",
			verb: "legyen"
		},
		set: {
			unit: "elem",
			verb: "legyen"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "szám";
			case "object":
				if (Array.isArray(data)) return "tömb";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "bemenet",
		email: "email cím",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO időbélyeg",
		date: "ISO dátum",
		time: "ISO idő",
		duration: "ISO időintervallum",
		ipv4: "IPv4 cím",
		ipv6: "IPv6 cím",
		cidrv4: "IPv4 tartomány",
		cidrv6: "IPv6 tartomány",
		base64: "base64-kódolt string",
		base64url: "base64url-kódolt string",
		json_string: "JSON string",
		e164: "E.164 szám",
		jwt: "JWT",
		template_literal: "bemenet"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${issue2.expected}, a kapott \xE9rt\xE9k ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue2.values[0])}`;
				return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `T\xFAl nagy: ${issue2.origin ?? "érték"} m\xE9rete t\xFAl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
				return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue2.origin ?? "érték"} t\xFAl nagy: ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} m\xE9rete t\xFAl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} t\xFAl kicsi ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
				if (_issue.format === "ends_with") return `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
				if (_issue.format === "includes") return `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia`;
				if (_issue.format === "regex") return `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie`;
				return `\xC9rv\xE9nytelen ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\xC9rv\xE9nytelen sz\xE1m: ${issue2.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
			case "unrecognized_keys": return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\xC9rv\xE9nytelen kulcs ${issue2.origin}`;
			case "invalid_union": return "Érvénytelen bemenet";
			case "invalid_element": return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue2.origin}`;
			default: return `\xC9rv\xE9nytelen bemenet`;
		}
	};
};
function hu_default() {
	return { localeError: error15() };
}
var error16 = () => {
	const Sizable = {
		string: {
			unit: "karakter",
			verb: "memiliki"
		},
		file: {
			unit: "byte",
			verb: "memiliki"
		},
		array: {
			unit: "item",
			verb: "memiliki"
		},
		set: {
			unit: "item",
			verb: "memiliki"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "input",
		email: "alamat email",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "tanggal dan waktu format ISO",
		date: "tanggal format ISO",
		time: "jam format ISO",
		duration: "durasi format ISO",
		ipv4: "alamat IPv4",
		ipv6: "alamat IPv6",
		cidrv4: "rentang alamat IPv4",
		cidrv6: "rentang alamat IPv6",
		base64: "string dengan enkode base64",
		base64url: "string dengan enkode base64url",
		json_string: "string JSON",
		e164: "angka E.164",
		jwt: "JWT",
		template_literal: "input"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Input tidak valid: diharapkan ${issue2.expected}, diterima ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
				return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
				return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
				if (_issue.format === "includes") return `String tidak valid: harus menyertakan "${_issue.includes}"`;
				if (_issue.format === "regex") return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
				return `${Nouns[_issue.format] ?? issue2.format} tidak valid`;
			}
			case "not_multiple_of": return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
			case "unrecognized_keys": return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Kunci tidak valid di ${issue2.origin}`;
			case "invalid_union": return "Input tidak valid";
			case "invalid_element": return `Nilai tidak valid di ${issue2.origin}`;
			default: return `Input tidak valid`;
		}
	};
};
function id_default() {
	return { localeError: error16() };
}
var error17 = () => {
	const Sizable = {
		string: {
			unit: "caratteri",
			verb: "avere"
		},
		file: {
			unit: "byte",
			verb: "avere"
		},
		array: {
			unit: "elementi",
			verb: "avere"
		},
		set: {
			unit: "elementi",
			verb: "avere"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "numero";
			case "object":
				if (Array.isArray(data)) return "vettore";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "input",
		email: "indirizzo email",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "data e ora ISO",
		date: "data ISO",
		time: "ora ISO",
		duration: "durata ISO",
		ipv4: "indirizzo IPv4",
		ipv6: "indirizzo IPv6",
		cidrv4: "intervallo IPv4",
		cidrv6: "intervallo IPv6",
		base64: "stringa codificata in base64",
		base64url: "URL codificata in base64",
		json_string: "stringa JSON",
		e164: "numero E.164",
		jwt: "JWT",
		template_literal: "input"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Input non valido: atteso ${issue2.expected}, ricevuto ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
				return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
				return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Stringa non valida: deve includere "${_issue.includes}"`;
				if (_issue.format === "regex") return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
				return `Invalid ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
			case "unrecognized_keys": return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Chiave non valida in ${issue2.origin}`;
			case "invalid_union": return "Input non valido";
			case "invalid_element": return `Valore non valido in ${issue2.origin}`;
			default: return `Input non valido`;
		}
	};
};
function it_default() {
	return { localeError: error17() };
}
var error18 = () => {
	const Sizable = {
		string: {
			unit: "文字",
			verb: "である"
		},
		file: {
			unit: "バイト",
			verb: "である"
		},
		array: {
			unit: "要素",
			verb: "である"
		},
		set: {
			unit: "要素",
			verb: "である"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "数値";
			case "object":
				if (Array.isArray(data)) return "配列";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "入力値",
		email: "メールアドレス",
		url: "URL",
		emoji: "絵文字",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO日時",
		date: "ISO日付",
		time: "ISO時刻",
		duration: "ISO期間",
		ipv4: "IPv4アドレス",
		ipv6: "IPv6アドレス",
		cidrv4: "IPv4範囲",
		cidrv6: "IPv6範囲",
		base64: "base64エンコード文字列",
		base64url: "base64urlエンコード文字列",
		json_string: "JSON文字列",
		e164: "E.164番号",
		jwt: "JWT",
		template_literal: "入力値"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u7121\u52B9\u306A\u5165\u529B: ${issue2.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${parsedType4(issue2.input)}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u7121\u52B9\u306A\u5165\u529B: ${stringifyPrimitive(issue2.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
				return `\u7121\u52B9\u306A\u9078\u629E: ${joinValues(issue2.values, "、")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
			case "too_big": {
				const adj = issue2.inclusive ? "以下である" : "より小さい";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "値"}\u306F${issue2.maximum.toString()}${sizing.unit ?? "要素"}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
				return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "値"}\u306F${issue2.maximum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? "以上である" : "より大きい";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${sizing.unit}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
				return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
				if (_issue.format === "ends_with") return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
				if (_issue.format === "includes") return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
				if (_issue.format === "regex") return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${_issue.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
				return `\u7121\u52B9\u306A${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u7121\u52B9\u306A\u6570\u5024: ${issue2.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
			case "unrecognized_keys": return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${issue2.keys.length > 1 ? "群" : ""}: ${joinValues(issue2.keys, "、")}`;
			case "invalid_key": return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
			case "invalid_union": return "無効な入力";
			case "invalid_element": return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
			default: return `\u7121\u52B9\u306A\u5165\u529B`;
		}
	};
};
function ja_default() {
	return { localeError: error18() };
}
var error19 = () => {
	const Sizable = {
		string: {
			unit: "តួអក្សរ",
			verb: "គួរមាន"
		},
		file: {
			unit: "បៃ",
			verb: "គួរមាន"
		},
		array: {
			unit: "ធាតុ",
			verb: "គួរមាន"
		},
		set: {
			unit: "ធាតុ",
			verb: "គួរមាន"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "មិនមែនជាលេខ (NaN)" : "លេខ";
			case "object":
				if (Array.isArray(data)) return "អារេ (Array)";
				if (data === null) return "គ្មានតម្លៃ (null)";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "ទិន្នន័យបញ្ចូល",
		email: "អាសយដ្ឋានអ៊ីមែល",
		url: "URL",
		emoji: "សញ្ញាអារម្មណ៍",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
		date: "កាលបរិច្ឆេទ ISO",
		time: "ម៉ោង ISO",
		duration: "រយៈពេល ISO",
		ipv4: "អាសយដ្ឋាន IPv4",
		ipv6: "អាសយដ្ឋាន IPv6",
		cidrv4: "ដែនអាសយដ្ឋាន IPv4",
		cidrv6: "ដែនអាសយដ្ឋាន IPv6",
		base64: "ខ្សែអក្សរអ៊ិកូដ base64",
		base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
		json_string: "ខ្សែអក្សរ JSON",
		e164: "លេខ E.164",
		jwt: "JWT",
		template_literal: "ទិន្នន័យបញ្ចូល"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${stringifyPrimitive(issue2.values[0])}`;
				return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
				return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
				return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${_issue.suffix}"`;
				if (_issue.format === "includes") return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${_issue.pattern}`;
				return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${issue2.divisor}`;
			case "unrecognized_keys": return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
			case "invalid_union": return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
			case "invalid_element": return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
			default: return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
		}
	};
};
function kh_default() {
	return { localeError: error19() };
}
var error20 = () => {
	const Sizable = {
		string: {
			unit: "문자",
			verb: "to have"
		},
		file: {
			unit: "바이트",
			verb: "to have"
		},
		array: {
			unit: "개",
			verb: "to have"
		},
		set: {
			unit: "개",
			verb: "to have"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "입력",
		email: "이메일 주소",
		url: "URL",
		emoji: "이모지",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO 날짜시간",
		date: "ISO 날짜",
		time: "ISO 시간",
		duration: "ISO 기간",
		ipv4: "IPv4 주소",
		ipv6: "IPv6 주소",
		cidrv4: "IPv4 범위",
		cidrv6: "IPv6 범위",
		base64: "base64 인코딩 문자열",
		base64url: "base64url 인코딩 문자열",
		json_string: "JSON 문자열",
		e164: "E.164 번호",
		jwt: "JWT",
		template_literal: "입력"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${issue2.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${parsedType4(issue2.input)}\uC785\uB2C8\uB2E4`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${stringifyPrimitive(issue2.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
				return `\uC798\uBABB\uB41C \uC635\uC158: ${joinValues(issue2.values, "또는 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
			case "too_big": {
				const adj = issue2.inclusive ? "이하" : "미만";
				const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
				const sizing = getSizing(issue2.origin);
				const unit = sizing?.unit ?? "요소";
				if (sizing) return `${issue2.origin ?? "값"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
				return `${issue2.origin ?? "값"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()} ${adj}${suffix}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? "이상" : "초과";
				const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
				const sizing = getSizing(issue2.origin);
				const unit = sizing?.unit ?? "요소";
				if (sizing) return `${issue2.origin ?? "값"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
				return `${issue2.origin ?? "값"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()} ${adj}${suffix}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
				if (_issue.format === "ends_with") return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
				if (_issue.format === "includes") return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
				if (_issue.format === "regex") return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${_issue.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
				return `\uC798\uBABB\uB41C ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\uC798\uBABB\uB41C \uC22B\uC790: ${issue2.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
			case "unrecognized_keys": return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\uC798\uBABB\uB41C \uD0A4: ${issue2.origin}`;
			case "invalid_union": return `\uC798\uBABB\uB41C \uC785\uB825`;
			case "invalid_element": return `\uC798\uBABB\uB41C \uAC12: ${issue2.origin}`;
			default: return `\uC798\uBABB\uB41C \uC785\uB825`;
		}
	};
};
function ko_default() {
	return { localeError: error20() };
}
var error21 = () => {
	const Sizable = {
		string: {
			unit: "знаци",
			verb: "да имаат"
		},
		file: {
			unit: "бајти",
			verb: "да имаат"
		},
		array: {
			unit: "ставки",
			verb: "да имаат"
		},
		set: {
			unit: "ставки",
			verb: "да имаат"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "број";
			case "object":
				if (Array.isArray(data)) return "низа";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "внес",
		email: "адреса на е-пошта",
		url: "URL",
		emoji: "емоџи",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO датум и време",
		date: "ISO датум",
		time: "ISO време",
		duration: "ISO времетраење",
		ipv4: "IPv4 адреса",
		ipv6: "IPv6 адреса",
		cidrv4: "IPv4 опсег",
		cidrv6: "IPv6 опсег",
		base64: "base64-енкодирана низа",
		base64url: "base64url-енкодирана низа",
		json_string: "JSON низа",
		e164: "E.164 број",
		jwt: "JWT",
		template_literal: "внес"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
				return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "вредноста"} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементи"}`;
				return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "вредноста"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${_issue.suffix}"`;
				if (_issue.format === "includes") return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${_issue.pattern}`;
				return `Invalid ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${issue2.divisor}`;
			case "unrecognized_keys": return `${issue2.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${issue2.origin}`;
			case "invalid_union": return "Грешен внес";
			case "invalid_element": return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${issue2.origin}`;
			default: return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441`;
		}
	};
};
function mk_default() {
	return { localeError: error21() };
}
var error22 = () => {
	const Sizable = {
		string: {
			unit: "aksara",
			verb: "mempunyai"
		},
		file: {
			unit: "bait",
			verb: "mempunyai"
		},
		array: {
			unit: "elemen",
			verb: "mempunyai"
		},
		set: {
			unit: "elemen",
			verb: "mempunyai"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "nombor";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "input",
		email: "alamat e-mel",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "tarikh masa ISO",
		date: "tarikh ISO",
		time: "masa ISO",
		duration: "tempoh ISO",
		ipv4: "alamat IPv4",
		ipv6: "alamat IPv6",
		cidrv4: "julat IPv4",
		cidrv6: "julat IPv6",
		base64: "string dikodkan base64",
		base64url: "string dikodkan base64url",
		json_string: "string JSON",
		e164: "nombor E.164",
		jwt: "JWT",
		template_literal: "input"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Input tidak sah: dijangka ${issue2.expected}, diterima ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
				return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
				return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
				if (_issue.format === "includes") return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
				if (_issue.format === "regex") return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
				return `${Nouns[_issue.format] ?? issue2.format} tidak sah`;
			}
			case "not_multiple_of": return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
			case "unrecognized_keys": return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Kunci tidak sah dalam ${issue2.origin}`;
			case "invalid_union": return "Input tidak sah";
			case "invalid_element": return `Nilai tidak sah dalam ${issue2.origin}`;
			default: return `Input tidak sah`;
		}
	};
};
function ms_default() {
	return { localeError: error22() };
}
var error23 = () => {
	const Sizable = {
		string: { unit: "tekens" },
		file: { unit: "bytes" },
		array: { unit: "elementen" },
		set: { unit: "elementen" }
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "getal";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "invoer",
		email: "emailadres",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datum en tijd",
		date: "ISO datum",
		time: "ISO tijd",
		duration: "ISO duur",
		ipv4: "IPv4-adres",
		ipv6: "IPv6-adres",
		cidrv4: "IPv4-bereik",
		cidrv6: "IPv6-bereik",
		base64: "base64-gecodeerde tekst",
		base64url: "base64 URL-gecodeerde tekst",
		json_string: "JSON string",
		e164: "E.164-nummer",
		jwt: "JWT",
		template_literal: "invoer"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Ongeldige invoer: verwacht ${issue2.expected}, ontving ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
				return `Ongeldige optie: verwacht \xE9\xE9n van ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Te lang: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} bevat`;
				return `Te lang: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Te kort: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} bevat`;
				return `Te kort: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
				if (_issue.format === "ends_with") return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
				if (_issue.format === "includes") return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
				if (_issue.format === "regex") return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
				return `Ongeldig: ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
			case "unrecognized_keys": return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Ongeldige key in ${issue2.origin}`;
			case "invalid_union": return "Ongeldige invoer";
			case "invalid_element": return `Ongeldige waarde in ${issue2.origin}`;
			default: return `Ongeldige invoer`;
		}
	};
};
function nl_default() {
	return { localeError: error23() };
}
var error24 = () => {
	const Sizable = {
		string: {
			unit: "tegn",
			verb: "å ha"
		},
		file: {
			unit: "bytes",
			verb: "å ha"
		},
		array: {
			unit: "elementer",
			verb: "å inneholde"
		},
		set: {
			unit: "elementer",
			verb: "å inneholde"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "tall";
			case "object":
				if (Array.isArray(data)) return "liste";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "input",
		email: "e-postadresse",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO dato- og klokkeslett",
		date: "ISO-dato",
		time: "ISO-klokkeslett",
		duration: "ISO-varighet",
		ipv4: "IPv4-område",
		ipv6: "IPv6-område",
		cidrv4: "IPv4-spekter",
		cidrv6: "IPv6-spekter",
		base64: "base64-enkodet streng",
		base64url: "base64url-enkodet streng",
		json_string: "JSON-streng",
		e164: "E.164-nummer",
		jwt: "JWT",
		template_literal: "input"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Ugyldig input: forventet ${issue2.expected}, fikk ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
				return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
				return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Ugyldig streng: m\xE5 starte med "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Ugyldig streng: m\xE5 ende med "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Ugyldig streng: m\xE5 inneholde "${_issue.includes}"`;
				if (_issue.format === "regex") return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${_issue.pattern}`;
				return `Ugyldig ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${issue2.divisor}`;
			case "unrecognized_keys": return `${issue2.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Ugyldig n\xF8kkel i ${issue2.origin}`;
			case "invalid_union": return "Ugyldig input";
			case "invalid_element": return `Ugyldig verdi i ${issue2.origin}`;
			default: return `Ugyldig input`;
		}
	};
};
function no_default() {
	return { localeError: error24() };
}
var error25 = () => {
	const Sizable = {
		string: {
			unit: "harf",
			verb: "olmalıdır"
		},
		file: {
			unit: "bayt",
			verb: "olmalıdır"
		},
		array: {
			unit: "unsur",
			verb: "olmalıdır"
		},
		set: {
			unit: "unsur",
			verb: "olmalıdır"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "numara";
			case "object":
				if (Array.isArray(data)) return "saf";
				if (data === null) return "gayb";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "giren",
		email: "epostagâh",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO hengâmı",
		date: "ISO tarihi",
		time: "ISO zamanı",
		duration: "ISO müddeti",
		ipv4: "IPv4 nişânı",
		ipv6: "IPv6 nişânı",
		cidrv4: "IPv4 menzili",
		cidrv6: "IPv6 menzili",
		base64: "base64-şifreli metin",
		base64url: "base64url-şifreli metin",
		json_string: "JSON metin",
		e164: "E.164 sayısı",
		jwt: "JWT",
		template_literal: "giren"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `F\xE2sit giren: umulan ${issue2.expected}, al\u0131nan ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `F\xE2sit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
				return `F\xE2sit tercih: m\xFBteberler ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
				return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmal\u0131yd\u0131.`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmal\u0131yd\u0131.`;
				return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmal\u0131yd\u0131.`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `F\xE2sit metin: "${_issue.prefix}" ile ba\u015Flamal\u0131.`;
				if (_issue.format === "ends_with") return `F\xE2sit metin: "${_issue.suffix}" ile bitmeli.`;
				if (_issue.format === "includes") return `F\xE2sit metin: "${_issue.includes}" ihtiv\xE2 etmeli.`;
				if (_issue.format === "regex") return `F\xE2sit metin: ${_issue.pattern} nak\u015F\u0131na uymal\u0131.`;
				return `F\xE2sit ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `F\xE2sit say\u0131: ${issue2.divisor} kat\u0131 olmal\u0131yd\u0131.`;
			case "unrecognized_keys": return `Tan\u0131nmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `${issue2.origin} i\xE7in tan\u0131nmayan anahtar var.`;
			case "invalid_union": return "Giren tanınamadı.";
			case "invalid_element": return `${issue2.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
			default: return `K\u0131ymet tan\u0131namad\u0131.`;
		}
	};
};
function ota_default() {
	return { localeError: error25() };
}
var error26 = () => {
	const Sizable = {
		string: {
			unit: "توکي",
			verb: "ولري"
		},
		file: {
			unit: "بایټس",
			verb: "ولري"
		},
		array: {
			unit: "توکي",
			verb: "ولري"
		},
		set: {
			unit: "توکي",
			verb: "ولري"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "عدد";
			case "object":
				if (Array.isArray(data)) return "ارې";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "ورودي",
		email: "بریښنالیک",
		url: "یو آر ال",
		emoji: "ایموجي",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "نیټه او وخت",
		date: "نېټه",
		time: "وخت",
		duration: "موده",
		ipv4: "د IPv4 پته",
		ipv6: "د IPv6 پته",
		cidrv4: "د IPv4 ساحه",
		cidrv6: "د IPv6 ساحه",
		base64: "base64-encoded متن",
		base64url: "base64url-encoded متن",
		json_string: "JSON متن",
		e164: "د E.164 شمېره",
		jwt: "JWT",
		template_literal: "ورودي"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${issue2.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${parsedType4(issue2.input)} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${stringifyPrimitive(issue2.values[0])} \u0648\u0627\u06CC`;
				return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${joinValues(issue2.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "ارزښت"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصرونه"} \u0648\u0644\u0631\u064A`;
				return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "ارزښت"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0648\u064A`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0648\u0644\u0631\u064A`;
				return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0648\u064A`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
				if (_issue.format === "ends_with") return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
				if (_issue.format === "includes") return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${_issue.includes}" \u0648\u0644\u0631\u064A`;
				if (_issue.format === "regex") return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${_issue.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
				return `${Nouns[_issue.format] ?? issue2.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
			}
			case "not_multiple_of": return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${issue2.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
			case "unrecognized_keys": return `\u0646\u0627\u0633\u0645 ${issue2.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
			case "invalid_union": return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
			case "invalid_element": return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
			default: return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
		}
	};
};
function ps_default() {
	return { localeError: error26() };
}
var error27 = () => {
	const Sizable = {
		string: {
			unit: "znaków",
			verb: "mieć"
		},
		file: {
			unit: "bajtów",
			verb: "mieć"
		},
		array: {
			unit: "elementów",
			verb: "mieć"
		},
		set: {
			unit: "elementów",
			verb: "mieć"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "liczba";
			case "object":
				if (Array.isArray(data)) return "tablica";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "wyrażenie",
		email: "adres email",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "data i godzina w formacie ISO",
		date: "data w formacie ISO",
		time: "godzina w formacie ISO",
		duration: "czas trwania ISO",
		ipv4: "adres IPv4",
		ipv6: "adres IPv6",
		cidrv4: "zakres IPv4",
		cidrv6: "zakres IPv6",
		base64: "ciąg znaków zakodowany w formacie base64",
		base64url: "ciąg znaków zakodowany w formacie base64url",
		json_string: "ciąg znaków w formacie JSON",
		e164: "liczba E.164",
		jwt: "JWT",
		template_literal: "wejście"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${issue2.expected}, otrzymano ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
				return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "wartość"} b\u0119dzie mie\u0107 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementów"}`;
				return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "wartość"} b\u0119dzie wynosi\u0107 ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "wartość"} b\u0119dzie mie\u0107 ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "elementów"}`;
				return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "wartość"} b\u0119dzie wynosi\u0107 ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${_issue.includes}"`;
				if (_issue.format === "regex") return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${_issue.pattern}`;
				return `Nieprawid\u0142ow(y/a/e) ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${issue2.divisor}`;
			case "unrecognized_keys": return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Nieprawid\u0142owy klucz w ${issue2.origin}`;
			case "invalid_union": return "Nieprawidłowe dane wejściowe";
			case "invalid_element": return `Nieprawid\u0142owa warto\u015B\u0107 w ${issue2.origin}`;
			default: return `Nieprawid\u0142owe dane wej\u015Bciowe`;
		}
	};
};
function pl_default() {
	return { localeError: error27() };
}
var error28 = () => {
	const Sizable = {
		string: {
			unit: "caracteres",
			verb: "ter"
		},
		file: {
			unit: "bytes",
			verb: "ter"
		},
		array: {
			unit: "itens",
			verb: "ter"
		},
		set: {
			unit: "itens",
			verb: "ter"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "número";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "nulo";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "padrão",
		email: "endereço de e-mail",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "data e hora ISO",
		date: "data ISO",
		time: "hora ISO",
		duration: "duração ISO",
		ipv4: "endereço IPv4",
		ipv6: "endereço IPv6",
		cidrv4: "faixa de IPv4",
		cidrv6: "faixa de IPv6",
		base64: "texto codificado em base64",
		base64url: "URL codificada em base64",
		json_string: "texto JSON",
		e164: "número E.164",
		jwt: "JWT",
		template_literal: "entrada"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Tipo inv\xE1lido: esperado ${issue2.expected}, recebido ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Entrada inv\xE1lida: esperado ${stringifyPrimitive(issue2.values[0])}`;
				return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
				return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Texto inv\xE1lido: deve come\xE7ar com "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Texto inv\xE1lido: deve terminar com "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Texto inv\xE1lido: deve incluir "${_issue.includes}"`;
				if (_issue.format === "regex") return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${_issue.pattern}`;
				return `${Nouns[_issue.format] ?? issue2.format} inv\xE1lido`;
			}
			case "not_multiple_of": return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${issue2.divisor}`;
			case "unrecognized_keys": return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Chave inv\xE1lida em ${issue2.origin}`;
			case "invalid_union": return "Entrada inválida";
			case "invalid_element": return `Valor inv\xE1lido em ${issue2.origin}`;
			default: return `Campo inv\xE1lido`;
		}
	};
};
function pt_default() {
	return { localeError: error28() };
}
function getRussianPlural(count, one, few, many) {
	const absCount = Math.abs(count);
	const lastDigit = absCount % 10;
	const lastTwoDigits = absCount % 100;
	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return many;
	if (lastDigit === 1) return one;
	if (lastDigit >= 2 && lastDigit <= 4) return few;
	return many;
}
var error29 = () => {
	const Sizable = {
		string: {
			unit: {
				one: "символ",
				few: "символа",
				many: "символов"
			},
			verb: "иметь"
		},
		file: {
			unit: {
				one: "байт",
				few: "байта",
				many: "байт"
			},
			verb: "иметь"
		},
		array: {
			unit: {
				one: "элемент",
				few: "элемента",
				many: "элементов"
			},
			verb: "иметь"
		},
		set: {
			unit: {
				one: "элемент",
				few: "элемента",
				many: "элементов"
			},
			verb: "иметь"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "число";
			case "object":
				if (Array.isArray(data)) return "массив";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "ввод",
		email: "email адрес",
		url: "URL",
		emoji: "эмодзи",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO дата и время",
		date: "ISO дата",
		time: "ISO время",
		duration: "ISO длительность",
		ipv4: "IPv4 адрес",
		ipv6: "IPv6 адрес",
		cidrv4: "IPv4 диапазон",
		cidrv6: "IPv6 диапазон",
		base64: "строка в формате base64",
		base64url: "строка в формате base64url",
		json_string: "JSON строка",
		e164: "номер E.164",
		jwt: "JWT",
		template_literal: "ввод"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${stringifyPrimitive(issue2.values[0])}`;
				return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) {
					const maxValue = Number(issue2.maximum);
					const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "значение"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.maximum.toString()} ${unit}`;
				}
				return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "значение"} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) {
					const minValue = Number(issue2.minimum);
					const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
					return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.minimum.toString()} ${unit}`;
				}
				return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
				if (_issue.format === "includes") return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
				return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
			case "unrecognized_keys": return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${issue2.keys.length > 1 ? "ые" : "ый"} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "и" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
			case "invalid_union": return "Неверные входные данные";
			case "invalid_element": return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${issue2.origin}`;
			default: return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435`;
		}
	};
};
function ru_default() {
	return { localeError: error29() };
}
var error30 = () => {
	const Sizable = {
		string: {
			unit: "znakov",
			verb: "imeti"
		},
		file: {
			unit: "bajtov",
			verb: "imeti"
		},
		array: {
			unit: "elementov",
			verb: "imeti"
		},
		set: {
			unit: "elementov",
			verb: "imeti"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "število";
			case "object":
				if (Array.isArray(data)) return "tabela";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "vnos",
		email: "e-poštni naslov",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datum in čas",
		date: "ISO datum",
		time: "ISO čas",
		duration: "ISO trajanje",
		ipv4: "IPv4 naslov",
		ipv6: "IPv6 naslov",
		cidrv4: "obseg IPv4",
		cidrv6: "obseg IPv6",
		base64: "base64 kodiran niz",
		base64url: "base64url kodiran niz",
		json_string: "JSON niz",
		e164: "E.164 številka",
		jwt: "JWT",
		template_literal: "vnos"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Neveljaven vnos: pri\u010Dakovano ${issue2.expected}, prejeto ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Neveljaven vnos: pri\u010Dakovano ${stringifyPrimitive(issue2.values[0])}`;
				return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
				return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Neveljaven niz: mora se za\u010Deti z "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Neveljaven niz: mora se kon\u010Dati z "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
				if (_issue.format === "regex") return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
				return `Neveljaven ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${issue2.divisor}`;
			case "unrecognized_keys": return `Neprepoznan${issue2.keys.length > 1 ? "i ključi" : " ključ"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Neveljaven klju\u010D v ${issue2.origin}`;
			case "invalid_union": return "Neveljaven vnos";
			case "invalid_element": return `Neveljavna vrednost v ${issue2.origin}`;
			default: return "Neveljaven vnos";
		}
	};
};
function sl_default() {
	return { localeError: error30() };
}
var error31 = () => {
	const Sizable = {
		string: {
			unit: "tecken",
			verb: "att ha"
		},
		file: {
			unit: "bytes",
			verb: "att ha"
		},
		array: {
			unit: "objekt",
			verb: "att innehålla"
		},
		set: {
			unit: "objekt",
			verb: "att innehålla"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "antal";
			case "object":
				if (Array.isArray(data)) return "lista";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "reguljärt uttryck",
		email: "e-postadress",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO-datum och tid",
		date: "ISO-datum",
		time: "ISO-tid",
		duration: "ISO-varaktighet",
		ipv4: "IPv4-intervall",
		ipv6: "IPv6-intervall",
		cidrv4: "IPv4-spektrum",
		cidrv6: "IPv6-spektrum",
		base64: "base64-kodad sträng",
		base64url: "base64url-kodad sträng",
		json_string: "JSON-sträng",
		e164: "E.164-nummer",
		jwt: "JWT",
		template_literal: "mall-literal"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Ogiltig inmatning: f\xF6rv\xE4ntat ${issue2.expected}, fick ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Ogiltig inmatning: f\xF6rv\xE4ntat ${stringifyPrimitive(issue2.values[0])}`;
				return `Ogiltigt val: f\xF6rv\xE4ntade en av ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `F\xF6r stor(t): f\xF6rv\xE4ntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
				return `F\xF6r stor(t): f\xF6rv\xE4ntat ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Ogiltig str\xE4ng: m\xE5ste sluta med "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${_issue.includes}"`;
				if (_issue.format === "regex") return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${_issue.pattern}"`;
				return `Ogiltig(t) ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Ogiltigt tal: m\xE5ste vara en multipel av ${issue2.divisor}`;
			case "unrecognized_keys": return `${issue2.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Ogiltig nyckel i ${issue2.origin ?? "värdet"}`;
			case "invalid_union": return "Ogiltig input";
			case "invalid_element": return `Ogiltigt v\xE4rde i ${issue2.origin ?? "värdet"}`;
			default: return `Ogiltig input`;
		}
	};
};
function sv_default() {
	return { localeError: error31() };
}
var error32 = () => {
	const Sizable = {
		string: {
			unit: "எழுத்துக்கள்",
			verb: "கொண்டிருக்க வேண்டும்"
		},
		file: {
			unit: "பைட்டுகள்",
			verb: "கொண்டிருக்க வேண்டும்"
		},
		array: {
			unit: "உறுப்புகள்",
			verb: "கொண்டிருக்க வேண்டும்"
		},
		set: {
			unit: "உறுப்புகள்",
			verb: "கொண்டிருக்க வேண்டும்"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "எண் அல்லாதது" : "எண்";
			case "object":
				if (Array.isArray(data)) return "அணி";
				if (data === null) return "வெறுமை";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "உள்ளீடு",
		email: "மின்னஞ்சல் முகவரி",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO தேதி நேரம்",
		date: "ISO தேதி",
		time: "ISO நேரம்",
		duration: "ISO கால அளவு",
		ipv4: "IPv4 முகவரி",
		ipv6: "IPv6 முகவரி",
		cidrv4: "IPv4 வரம்பு",
		cidrv6: "IPv6 வரம்பு",
		base64: "base64-encoded சரம்",
		base64url: "base64url-encoded சரம்",
		json_string: "JSON சரம்",
		e164: "E.164 எண்",
		jwt: "JWT",
		template_literal: "input"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${stringifyPrimitive(issue2.values[0])}`;
				return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${joinValues(issue2.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
				return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
				return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
				if (_issue.format === "ends_with") return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
				if (_issue.format === "includes") return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
				if (_issue.format === "regex") return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${_issue.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
				return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${issue2.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
			case "unrecognized_keys": return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${issue2.keys.length > 1 ? "கள்" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
			case "invalid_union": return "தவறான உள்ளீடு";
			case "invalid_element": return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
			default: return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1`;
		}
	};
};
function ta_default() {
	return { localeError: error32() };
}
var error33 = () => {
	const Sizable = {
		string: {
			unit: "ตัวอักษร",
			verb: "ควรมี"
		},
		file: {
			unit: "ไบต์",
			verb: "ควรมี"
		},
		array: {
			unit: "รายการ",
			verb: "ควรมี"
		},
		set: {
			unit: "รายการ",
			verb: "ควรมี"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "ไม่ใช่ตัวเลข (NaN)" : "ตัวเลข";
			case "object":
				if (Array.isArray(data)) return "อาร์เรย์ (Array)";
				if (data === null) return "ไม่มีค่า (null)";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "ข้อมูลที่ป้อน",
		email: "ที่อยู่อีเมล",
		url: "URL",
		emoji: "อิโมจิ",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "วันที่เวลาแบบ ISO",
		date: "วันที่แบบ ISO",
		time: "เวลาแบบ ISO",
		duration: "ช่วงเวลาแบบ ISO",
		ipv4: "ที่อยู่ IPv4",
		ipv6: "ที่อยู่ IPv6",
		cidrv4: "ช่วง IP แบบ IPv4",
		cidrv6: "ช่วง IP แบบ IPv6",
		base64: "ข้อความแบบ Base64",
		base64url: "ข้อความแบบ Base64 สำหรับ URL",
		json_string: "ข้อความแบบ JSON",
		e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
		jwt: "โทเคน JWT",
		template_literal: "ข้อมูลที่ป้อน"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${issue2.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${stringifyPrimitive(issue2.values[0])}`;
				return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "ไม่เกิน" : "น้อยกว่า";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "ค่า"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
				return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "ค่า"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? "อย่างน้อย" : "มากกว่า";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
				return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${_issue.suffix}"`;
				if (_issue.format === "includes") return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${_issue.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
				if (_issue.format === "regex") return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${_issue.pattern}`;
				return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${issue2.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
			case "unrecognized_keys": return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
			case "invalid_union": return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
			case "invalid_element": return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
			default: return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07`;
		}
	};
};
function th_default() {
	return { localeError: error33() };
}
var parsedType3 = (data) => {
	const t = typeof data;
	switch (t) {
		case "number": return Number.isNaN(data) ? "NaN" : "number";
		case "object":
			if (Array.isArray(data)) return "array";
			if (data === null) return "null";
			if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
	}
	return t;
};
var error34 = () => {
	const Sizable = {
		string: {
			unit: "karakter",
			verb: "olmalı"
		},
		file: {
			unit: "bayt",
			verb: "olmalı"
		},
		array: {
			unit: "öğe",
			verb: "olmalı"
		},
		set: {
			unit: "öğe",
			verb: "olmalı"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const Nouns = {
		regex: "girdi",
		email: "e-posta adresi",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO tarih ve saat",
		date: "ISO tarih",
		time: "ISO saat",
		duration: "ISO süre",
		ipv4: "IPv4 adresi",
		ipv6: "IPv6 adresi",
		cidrv4: "IPv4 aralığı",
		cidrv6: "IPv6 aralığı",
		base64: "base64 ile şifrelenmiş metin",
		base64url: "base64url ile şifrelenmiş metin",
		json_string: "JSON dizesi",
		e164: "E.164 sayısı",
		jwt: "JWT",
		template_literal: "Şablon dizesi"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `Ge\xE7ersiz de\u011Fer: beklenen ${issue2.expected}, al\u0131nan ${parsedType3(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `Ge\xE7ersiz de\u011Fer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
				return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "öğe"}`;
				return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Ge\xE7ersiz metin: "${_issue.prefix}" ile ba\u015Flamal\u0131`;
				if (_issue.format === "ends_with") return `Ge\xE7ersiz metin: "${_issue.suffix}" ile bitmeli`;
				if (_issue.format === "includes") return `Ge\xE7ersiz metin: "${_issue.includes}" i\xE7ermeli`;
				if (_issue.format === "regex") return `Ge\xE7ersiz metin: ${_issue.pattern} desenine uymal\u0131`;
				return `Ge\xE7ersiz ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `Ge\xE7ersiz say\u0131: ${issue2.divisor} ile tam b\xF6l\xFCnebilmeli`;
			case "unrecognized_keys": return `Tan\u0131nmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `${issue2.origin} i\xE7inde ge\xE7ersiz anahtar`;
			case "invalid_union": return "Geçersiz değer";
			case "invalid_element": return `${issue2.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
			default: return `Ge\xE7ersiz de\u011Fer`;
		}
	};
};
function tr_default() {
	return { localeError: error34() };
}
var error35 = () => {
	const Sizable = {
		string: {
			unit: "символів",
			verb: "матиме"
		},
		file: {
			unit: "байтів",
			verb: "матиме"
		},
		array: {
			unit: "елементів",
			verb: "матиме"
		},
		set: {
			unit: "елементів",
			verb: "матиме"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "число";
			case "object":
				if (Array.isArray(data)) return "масив";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "вхідні дані",
		email: "адреса електронної пошти",
		url: "URL",
		emoji: "емодзі",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "дата та час ISO",
		date: "дата ISO",
		time: "час ISO",
		duration: "тривалість ISO",
		ipv4: "адреса IPv4",
		ipv6: "адреса IPv6",
		cidrv4: "діапазон IPv4",
		cidrv6: "діапазон IPv6",
		base64: "рядок у кодуванні base64",
		base64url: "рядок у кодуванні base64url",
		json_string: "рядок JSON",
		e164: "номер E.164",
		jwt: "JWT",
		template_literal: "вхідні дані"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${issue2.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
				return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "значення"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементів"}`;
				return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "значення"} \u0431\u0443\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} \u0431\u0443\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
				if (_issue.format === "includes") return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
				return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${issue2.divisor}`;
			case "unrecognized_keys": return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "і" : ""}: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
			case "invalid_union": return "Неправильні вхідні дані";
			case "invalid_element": return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${issue2.origin}`;
			default: return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456`;
		}
	};
};
function ua_default() {
	return { localeError: error35() };
}
var error36 = () => {
	const Sizable = {
		string: {
			unit: "حروف",
			verb: "ہونا"
		},
		file: {
			unit: "بائٹس",
			verb: "ہونا"
		},
		array: {
			unit: "آئٹمز",
			verb: "ہونا"
		},
		set: {
			unit: "آئٹمز",
			verb: "ہونا"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "نمبر";
			case "object":
				if (Array.isArray(data)) return "آرے";
				if (data === null) return "نل";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "ان پٹ",
		email: "ای میل ایڈریس",
		url: "یو آر ایل",
		emoji: "ایموجی",
		uuid: "یو یو آئی ڈی",
		uuidv4: "یو یو آئی ڈی وی 4",
		uuidv6: "یو یو آئی ڈی وی 6",
		nanoid: "نینو آئی ڈی",
		guid: "جی یو آئی ڈی",
		cuid: "سی یو آئی ڈی",
		cuid2: "سی یو آئی ڈی 2",
		ulid: "یو ایل آئی ڈی",
		xid: "ایکس آئی ڈی",
		ksuid: "کے ایس یو آئی ڈی",
		datetime: "آئی ایس او ڈیٹ ٹائم",
		date: "آئی ایس او تاریخ",
		time: "آئی ایس او وقت",
		duration: "آئی ایس او مدت",
		ipv4: "آئی پی وی 4 ایڈریس",
		ipv6: "آئی پی وی 6 ایڈریس",
		cidrv4: "آئی پی وی 4 رینج",
		cidrv6: "آئی پی وی 6 رینج",
		base64: "بیس 64 ان کوڈڈ سٹرنگ",
		base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
		json_string: "جے ایس او این سٹرنگ",
		e164: "ای 164 نمبر",
		jwt: "جے ڈبلیو ٹی",
		template_literal: "ان پٹ"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${issue2.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${parsedType4(issue2.input)} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${stringifyPrimitive(issue2.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
				return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${joinValues(issue2.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "ویلیو"} \u06A9\u06D2 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عناصر"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
				return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "ویلیو"} \u06A9\u0627 ${adj}${issue2.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u06D2 ${adj}${issue2.minimum.toString()} ${sizing.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
				return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u0627 ${adj}${issue2.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
				if (_issue.format === "ends_with") return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
				if (_issue.format === "includes") return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
				if (_issue.format === "regex") return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${_issue.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
				return `\u063A\u0644\u0637 ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${issue2.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
			case "unrecognized_keys": return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${issue2.keys.length > 1 ? "ز" : ""}: ${joinValues(issue2.keys, "، ")}`;
			case "invalid_key": return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
			case "invalid_union": return "غلط ان پٹ";
			case "invalid_element": return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
			default: return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679`;
		}
	};
};
function ur_default() {
	return { localeError: error36() };
}
var error37 = () => {
	const Sizable = {
		string: {
			unit: "ký tự",
			verb: "có"
		},
		file: {
			unit: "byte",
			verb: "có"
		},
		array: {
			unit: "phần tử",
			verb: "có"
		},
		set: {
			unit: "phần tử",
			verb: "có"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "số";
			case "object":
				if (Array.isArray(data)) return "mảng";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "đầu vào",
		email: "địa chỉ email",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ngày giờ ISO",
		date: "ngày ISO",
		time: "giờ ISO",
		duration: "khoảng thời gian ISO",
		ipv4: "địa chỉ IPv4",
		ipv6: "địa chỉ IPv6",
		cidrv4: "dải IPv4",
		cidrv6: "dải IPv6",
		base64: "chuỗi mã hóa base64",
		base64url: "chuỗi mã hóa base64url",
		json_string: "chuỗi JSON",
		e164: "số E.164",
		jwt: "JWT",
		template_literal: "đầu vào"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${issue2.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${stringifyPrimitive(issue2.values[0])}`;
				return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
				return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "giá trị"} ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${_issue.includes}"`;
				if (_issue.format === "regex") return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${_issue.pattern}`;
				return `${Nouns[_issue.format] ?? issue2.format} kh\xF4ng h\u1EE3p l\u1EC7`;
			}
			case "not_multiple_of": return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${issue2.divisor}`;
			case "unrecognized_keys": return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
			case "invalid_union": return "Đầu vào không hợp lệ";
			case "invalid_element": return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
			default: return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7`;
		}
	};
};
function vi_default() {
	return { localeError: error37() };
}
var error38 = () => {
	const Sizable = {
		string: {
			unit: "字符",
			verb: "包含"
		},
		file: {
			unit: "字节",
			verb: "包含"
		},
		array: {
			unit: "项",
			verb: "包含"
		},
		set: {
			unit: "项",
			verb: "包含"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "非数字(NaN)" : "数字";
			case "object":
				if (Array.isArray(data)) return "数组";
				if (data === null) return "空值(null)";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "输入",
		email: "电子邮件",
		url: "URL",
		emoji: "表情符号",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO日期时间",
		date: "ISO日期",
		time: "ISO时间",
		duration: "ISO时长",
		ipv4: "IPv4地址",
		ipv6: "IPv6地址",
		cidrv4: "IPv4网段",
		cidrv6: "IPv6网段",
		base64: "base64编码字符串",
		base64url: "base64url编码字符串",
		json_string: "JSON字符串",
		e164: "E.164号码",
		jwt: "JWT",
		template_literal: "输入"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${issue2.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${stringifyPrimitive(issue2.values[0])}`;
				return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "个元素"}`;
				return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.prefix}" \u5F00\u5934`;
				if (_issue.format === "ends_with") return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.suffix}" \u7ED3\u5C3E`;
				if (_issue.format === "includes") return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${_issue.pattern}`;
				return `\u65E0\u6548${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${issue2.divisor} \u7684\u500D\u6570`;
			case "unrecognized_keys": return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${joinValues(issue2.keys, ", ")}`;
			case "invalid_key": return `${issue2.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
			case "invalid_union": return "无效输入";
			case "invalid_element": return `${issue2.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
			default: return `\u65E0\u6548\u8F93\u5165`;
		}
	};
};
function zh_CN_default() {
	return { localeError: error38() };
}
var error39 = () => {
	const Sizable = {
		string: {
			unit: "字元",
			verb: "擁有"
		},
		file: {
			unit: "位元組",
			verb: "擁有"
		},
		array: {
			unit: "項目",
			verb: "擁有"
		},
		set: {
			unit: "項目",
			verb: "擁有"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const parsedType4 = (data) => {
		const t = typeof data;
		switch (t) {
			case "number": return Number.isNaN(data) ? "NaN" : "number";
			case "object":
				if (Array.isArray(data)) return "array";
				if (data === null) return "null";
				if (Object.getPrototypeOf(data) !== Object.prototype && data.constructor) return data.constructor.name;
		}
		return t;
	};
	const Nouns = {
		regex: "輸入",
		email: "郵件地址",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO 日期時間",
		date: "ISO 日期",
		time: "ISO 時間",
		duration: "ISO 期間",
		ipv4: "IPv4 位址",
		ipv6: "IPv6 位址",
		cidrv4: "IPv4 範圍",
		cidrv6: "IPv6 範圍",
		base64: "base64 編碼字串",
		base64url: "base64url 編碼字串",
		json_string: "JSON 字串",
		e164: "E.164 數值",
		jwt: "JWT",
		template_literal: "輸入"
	};
	return (issue2) => {
		switch (issue2.code) {
			case "invalid_type": return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${issue2.expected}\uFF0C\u4F46\u6536\u5230 ${parsedType4(issue2.input)}`;
			case "invalid_value":
				if (issue2.values.length === 1) return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${stringifyPrimitive(issue2.values[0])}`;
				return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
			case "too_big": {
				const adj = issue2.inclusive ? "<=" : "<";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "值"} \u61C9\u70BA ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "個元素"}`;
				return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "值"} \u61C9\u70BA ${adj}${issue2.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue2.inclusive ? ">=" : ">";
				const sizing = getSizing(issue2.origin);
				if (sizing) return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
				return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue2;
				if (_issue.format === "starts_with") return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.prefix}" \u958B\u982D`;
				if (_issue.format === "ends_with") return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.suffix}" \u7D50\u5C3E`;
				if (_issue.format === "includes") return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${_issue.includes}"`;
				if (_issue.format === "regex") return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${_issue.pattern}`;
				return `\u7121\u6548\u7684 ${Nouns[_issue.format] ?? issue2.format}`;
			}
			case "not_multiple_of": return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${issue2.divisor} \u7684\u500D\u6578`;
			case "unrecognized_keys": return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${issue2.keys.length > 1 ? "們" : ""}\uFF1A${joinValues(issue2.keys, "、")}`;
			case "invalid_key": return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
			case "invalid_union": return "無效的輸入值";
			case "invalid_element": return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
			default: return `\u7121\u6548\u7684\u8F38\u5165\u503C`;
		}
	};
};
function zh_TW_default() {
	return { localeError: error39() };
}
var $output = Symbol("ZodOutput");
var $input = Symbol("ZodInput");
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new Map();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) {
			if (this._idmap.has(meta.id)) throw new Error(`ID ${meta.id} already exists in the registry`);
			this._idmap.set(meta.id, schema);
		}
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new Map();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			return {
				...pm,
				...this._map.get(schema)
			};
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
var globalRegistry = /* @__PURE__ */ registry();
function _string(Class2, params) {
	return new Class2({
		type: "string",
		...normalizeParams(params)
	});
}
function _coercedString(Class2, params) {
	return new Class2({
		type: "string",
		coerce: true,
		...normalizeParams(params)
	});
}
function _email(Class2, params) {
	return new Class2({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _guid(Class2, params) {
	return new Class2({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _uuid(Class2, params) {
	return new Class2({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _uuidv4(Class2, params) {
	return new Class2({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
function _uuidv6(Class2, params) {
	return new Class2({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
function _uuidv7(Class2, params) {
	return new Class2({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
function _url(Class2, params) {
	return new Class2({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _emoji2(Class2, params) {
	return new Class2({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _nanoid(Class2, params) {
	return new Class2({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cuid(Class2, params) {
	return new Class2({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cuid2(Class2, params) {
	return new Class2({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ulid(Class2, params) {
	return new Class2({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _xid(Class2, params) {
	return new Class2({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ksuid(Class2, params) {
	return new Class2({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ipv4(Class2, params) {
	return new Class2({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _ipv6(Class2, params) {
	return new Class2({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cidrv4(Class2, params) {
	return new Class2({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _cidrv6(Class2, params) {
	return new Class2({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _base64(Class2, params) {
	return new Class2({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _base64url(Class2, params) {
	return new Class2({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _e164(Class2, params) {
	return new Class2({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
function _jwt(Class2, params) {
	return new Class2({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
var TimePrecision = {
	Any: null,
	Minute: -1,
	Second: 0,
	Millisecond: 3,
	Microsecond: 6
};
function _isoDateTime(Class2, params) {
	return new Class2({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
function _isoDate(Class2, params) {
	return new Class2({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
function _isoTime(Class2, params) {
	return new Class2({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
function _isoDuration(Class2, params) {
	return new Class2({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
function _number(Class2, params) {
	return new Class2({
		type: "number",
		checks: [],
		...normalizeParams(params)
	});
}
function _coercedNumber(Class2, params) {
	return new Class2({
		type: "number",
		coerce: true,
		checks: [],
		...normalizeParams(params)
	});
}
function _int(Class2, params) {
	return new Class2({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params)
	});
}
function _float32(Class2, params) {
	return new Class2({
		type: "number",
		check: "number_format",
		abort: false,
		format: "float32",
		...normalizeParams(params)
	});
}
function _float64(Class2, params) {
	return new Class2({
		type: "number",
		check: "number_format",
		abort: false,
		format: "float64",
		...normalizeParams(params)
	});
}
function _int32(Class2, params) {
	return new Class2({
		type: "number",
		check: "number_format",
		abort: false,
		format: "int32",
		...normalizeParams(params)
	});
}
function _uint32(Class2, params) {
	return new Class2({
		type: "number",
		check: "number_format",
		abort: false,
		format: "uint32",
		...normalizeParams(params)
	});
}
function _boolean(Class2, params) {
	return new Class2({
		type: "boolean",
		...normalizeParams(params)
	});
}
function _coercedBoolean(Class2, params) {
	return new Class2({
		type: "boolean",
		coerce: true,
		...normalizeParams(params)
	});
}
function _bigint(Class2, params) {
	return new Class2({
		type: "bigint",
		...normalizeParams(params)
	});
}
function _coercedBigint(Class2, params) {
	return new Class2({
		type: "bigint",
		coerce: true,
		...normalizeParams(params)
	});
}
function _int64(Class2, params) {
	return new Class2({
		type: "bigint",
		check: "bigint_format",
		abort: false,
		format: "int64",
		...normalizeParams(params)
	});
}
function _uint64(Class2, params) {
	return new Class2({
		type: "bigint",
		check: "bigint_format",
		abort: false,
		format: "uint64",
		...normalizeParams(params)
	});
}
function _symbol(Class2, params) {
	return new Class2({
		type: "symbol",
		...normalizeParams(params)
	});
}
function _undefined2(Class2, params) {
	return new Class2({
		type: "undefined",
		...normalizeParams(params)
	});
}
function _null2(Class2, params) {
	return new Class2({
		type: "null",
		...normalizeParams(params)
	});
}
function _any(Class2) {
	return new Class2({ type: "any" });
}
function _unknown(Class2) {
	return new Class2({ type: "unknown" });
}
function _never(Class2, params) {
	return new Class2({
		type: "never",
		...normalizeParams(params)
	});
}
function _void(Class2, params) {
	return new Class2({
		type: "void",
		...normalizeParams(params)
	});
}
function _date(Class2, params) {
	return new Class2({
		type: "date",
		...normalizeParams(params)
	});
}
function _coercedDate(Class2, params) {
	return new Class2({
		type: "date",
		coerce: true,
		...normalizeParams(params)
	});
}
function _nan(Class2, params) {
	return new Class2({
		type: "nan",
		...normalizeParams(params)
	});
}
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
function _positive(params) {
	return _gt(0, params);
}
function _negative(params) {
	return _lt(0, params);
}
function _nonpositive(params) {
	return _lte(0, params);
}
function _nonnegative(params) {
	return _gte(0, params);
}
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
function _maxSize(maximum, params) {
	return new $ZodCheckMaxSize({
		check: "max_size",
		...normalizeParams(params),
		maximum
	});
}
function _minSize(minimum, params) {
	return new $ZodCheckMinSize({
		check: "min_size",
		...normalizeParams(params),
		minimum
	});
}
function _size(size, params) {
	return new $ZodCheckSizeEquals({
		check: "size_equals",
		...normalizeParams(params),
		size
	});
}
function _maxLength(maximum, params) {
	const ch = new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
	return ch;
}
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
function _property(property, schema, params) {
	return new $ZodCheckProperty({
		check: "property",
		property,
		schema,
		...normalizeParams(params)
	});
}
function _mime(types, params) {
	return new $ZodCheckMimeType({
		check: "mime_type",
		mime: types,
		...normalizeParams(params)
	});
}
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
function _normalize(form) {
	return _overwrite((input) => input.normalize(form));
}
function _trim() {
	return _overwrite((input) => input.trim());
}
function _toLowerCase() {
	return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
	return _overwrite((input) => input.toUpperCase());
}
function _array(Class2, element, params) {
	return new Class2({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
function _union(Class2, options, params) {
	return new Class2({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
function _discriminatedUnion(Class2, discriminator, options, params) {
	return new Class2({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
function _intersection(Class2, left, right) {
	return new Class2({
		type: "intersection",
		left,
		right
	});
}
function _tuple(Class2, items, _paramsOrRest, _params) {
	const hasRest = _paramsOrRest instanceof $ZodType;
	const params = hasRest ? _params : _paramsOrRest;
	const rest = hasRest ? _paramsOrRest : null;
	return new Class2({
		type: "tuple",
		items,
		rest,
		...normalizeParams(params)
	});
}
function _record(Class2, keyType, valueType, params) {
	return new Class2({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
function _map(Class2, keyType, valueType, params) {
	return new Class2({
		type: "map",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
function _set(Class2, valueType, params) {
	return new Class2({
		type: "set",
		valueType,
		...normalizeParams(params)
	});
}
function _enum(Class2, values, params) {
	const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
	return new Class2({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
function _nativeEnum(Class2, entries, params) {
	return new Class2({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
function _literal(Class2, value, params) {
	return new Class2({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
function _file(Class2, params) {
	return new Class2({
		type: "file",
		...normalizeParams(params)
	});
}
function _transform(Class2, fn) {
	return new Class2({
		type: "transform",
		transform: fn
	});
}
function _optional(Class2, innerType) {
	return new Class2({
		type: "optional",
		innerType
	});
}
function _nullable(Class2, innerType) {
	return new Class2({
		type: "nullable",
		innerType
	});
}
function _default(Class2, innerType, defaultValue) {
	return new Class2({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : defaultValue;
		}
	});
}
function _nonoptional(Class2, innerType, params) {
	return new Class2({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
function _success(Class2, innerType) {
	return new Class2({
		type: "success",
		innerType
	});
}
function _catch(Class2, innerType, catchValue) {
	return new Class2({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
function _pipe(Class2, in_, out) {
	return new Class2({
		type: "pipe",
		in: in_,
		out
	});
}
function _readonly(Class2, innerType) {
	return new Class2({
		type: "readonly",
		innerType
	});
}
function _templateLiteral(Class2, parts, params) {
	return new Class2({
		type: "template_literal",
		parts,
		...normalizeParams(params)
	});
}
function _lazy(Class2, getter) {
	return new Class2({
		type: "lazy",
		getter
	});
}
function _promise(Class2, innerType) {
	return new Class2({
		type: "promise",
		innerType
	});
}
function _custom(Class2, fn, _params) {
	const norm = normalizeParams(_params);
	norm.abort ?? (norm.abort = true);
	const schema = new Class2({
		type: "custom",
		check: "custom",
		fn,
		...norm
	});
	return schema;
}
function _refine(Class2, fn, _params) {
	const schema = new Class2({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
	return schema;
}
function _stringbool(Classes, _params) {
	const params = normalizeParams(_params);
	let truthyArray = params.truthy ?? [
		"true",
		"1",
		"yes",
		"on",
		"y",
		"enabled"
	];
	let falsyArray = params.falsy ?? [
		"false",
		"0",
		"no",
		"off",
		"n",
		"disabled"
	];
	if (params.case !== "sensitive") {
		truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
		falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
	}
	const truthySet = new Set(truthyArray);
	const falsySet = new Set(falsyArray);
	const _Pipe = Classes.Pipe ?? $ZodPipe;
	const _Boolean = Classes.Boolean ?? $ZodBoolean;
	const _String = Classes.String ?? $ZodString;
	const _Transform = Classes.Transform ?? $ZodTransform;
	const tx = new _Transform({
		type: "transform",
		transform: (input, payload) => {
			let data = input;
			if (params.case !== "sensitive") data = data.toLowerCase();
			if (truthySet.has(data)) return true;
			else if (falsySet.has(data)) return false;
			else {
				payload.issues.push({
					code: "invalid_value",
					expected: "stringbool",
					values: [...truthySet, ...falsySet],
					input: payload.value,
					inst: tx
				});
				return {};
			}
		},
		error: params.error
	});
	const innerPipe = new _Pipe({
		type: "pipe",
		in: new _String({
			type: "string",
			error: params.error
		}),
		out: tx,
		error: params.error
	});
	const outerPipe = new _Pipe({
		type: "pipe",
		in: innerPipe,
		out: new _Boolean({
			type: "boolean",
			error: params.error
		}),
		error: params.error
	});
	return outerPipe;
}
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
	const params = normalizeParams(_params);
	const def = {
		...normalizeParams(_params),
		check: "string_format",
		type: "string",
		format,
		fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
		...params
	};
	if (fnOrRegex instanceof RegExp) def.pattern = fnOrRegex;
	const inst = new Class2(def);
	return inst;
}
var $ZodFunction = class {
	constructor(def) {
		this._def = def;
		this.def = def;
	}
	implement(func) {
		if (typeof func !== "function") throw new Error("implement() must be called with a function");
		const impl = (...args) => {
			const parsedArgs = this._def.input ? parse(this._def.input, args, void 0, { callee: impl }) : args;
			if (!Array.isArray(parsedArgs)) throw new Error("Invalid arguments schema: not an array or tuple schema.");
			const output = func(...parsedArgs);
			return this._def.output ? parse(this._def.output, output, void 0, { callee: impl }) : output;
		};
		return impl;
	}
	implementAsync(func) {
		if (typeof func !== "function") throw new Error("implement() must be called with a function");
		const impl = async (...args) => {
			const parsedArgs = this._def.input ? await parseAsync(this._def.input, args, void 0, { callee: impl }) : args;
			if (!Array.isArray(parsedArgs)) throw new Error("Invalid arguments schema: not an array or tuple schema.");
			const output = await func(...parsedArgs);
			return this._def.output ? parseAsync(this._def.output, output, void 0, { callee: impl }) : output;
		};
		return impl;
	}
	input(...args) {
		const F = this.constructor;
		if (Array.isArray(args[0])) return new F({
			type: "function",
			input: new $ZodTuple({
				type: "tuple",
				items: args[0],
				rest: args[1]
			}),
			output: this._def.output
		});
		return new F({
			type: "function",
			input: args[0],
			output: this._def.output
		});
	}
	output(output) {
		const F = this.constructor;
		return new F({
			type: "function",
			input: this._def.input,
			output
		});
	}
};
function _function(params) {
	return new $ZodFunction({
		type: "function",
		input: Array.isArray(params?.input) ? _tuple($ZodTuple, params?.input) : params?.input ?? _array($ZodArray, _unknown($ZodUnknown)),
		output: params?.output ?? _unknown($ZodUnknown)
	});
}
var JSONSchemaGenerator = class {
	constructor(params) {
		this.counter = 0;
		this.metadataRegistry = params?.metadata ?? globalRegistry;
		this.target = params?.target ?? "draft-2020-12";
		this.unrepresentable = params?.unrepresentable ?? "throw";
		this.override = params?.override ?? (() => {});
		this.io = params?.io ?? "output";
		this.seen = /* @__PURE__ */ new Map();
	}
	process(schema, _params = {
		path: [],
		schemaPath: []
	}) {
		var _a$2;
		const def = schema._zod.def;
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const seen = this.seen.get(schema);
		if (seen) {
			seen.count++;
			const isCycle = _params.schemaPath.includes(schema);
			if (isCycle) seen.cycle = _params.path;
			return seen.schema;
		}
		const result = {
			schema: {},
			count: 1,
			cycle: void 0,
			path: _params.path
		};
		this.seen.set(schema, result);
		const overrideSchema = schema._zod.toJSONSchema?.();
		if (overrideSchema) result.schema = overrideSchema;
		else {
			const params = {
				..._params,
				schemaPath: [..._params.schemaPath, schema],
				path: _params.path
			};
			const parent = schema._zod.parent;
			if (parent) {
				result.ref = parent;
				this.process(parent, params);
				this.seen.get(parent).isParent = true;
			} else {
				const _json = result.schema;
				switch (def.type) {
					case "string": {
						const json2 = _json;
						json2.type = "string";
						const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
						if (typeof minimum === "number") json2.minLength = minimum;
						if (typeof maximum === "number") json2.maxLength = maximum;
						if (format) {
							json2.format = formatMap[format] ?? format;
							if (json2.format === "") delete json2.format;
						}
						if (contentEncoding) json2.contentEncoding = contentEncoding;
						if (patterns && patterns.size > 0) {
							const regexes = [...patterns];
							if (regexes.length === 1) json2.pattern = regexes[0].source;
							else if (regexes.length > 1) result.schema.allOf = [...regexes.map((regex) => ({
								...this.target === "draft-7" ? { type: "string" } : {},
								pattern: regex.source
							}))];
						}
						break;
					}
					case "number": {
						const json2 = _json;
						const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
						if (typeof format === "string" && format.includes("int")) json2.type = "integer";
						else json2.type = "number";
						if (typeof exclusiveMinimum === "number") json2.exclusiveMinimum = exclusiveMinimum;
						if (typeof minimum === "number") {
							json2.minimum = minimum;
							if (typeof exclusiveMinimum === "number") if (exclusiveMinimum >= minimum) delete json2.minimum;
							else delete json2.exclusiveMinimum;
						}
						if (typeof exclusiveMaximum === "number") json2.exclusiveMaximum = exclusiveMaximum;
						if (typeof maximum === "number") {
							json2.maximum = maximum;
							if (typeof exclusiveMaximum === "number") if (exclusiveMaximum <= maximum) delete json2.maximum;
							else delete json2.exclusiveMaximum;
						}
						if (typeof multipleOf === "number") json2.multipleOf = multipleOf;
						break;
					}
					case "boolean": {
						const json2 = _json;
						json2.type = "boolean";
						break;
					}
					case "bigint":
						if (this.unrepresentable === "throw") throw new Error("BigInt cannot be represented in JSON Schema");
						break;
					case "symbol":
						if (this.unrepresentable === "throw") throw new Error("Symbols cannot be represented in JSON Schema");
						break;
					case "null":
						_json.type = "null";
						break;
					case "any": break;
					case "unknown": break;
					case "undefined":
						if (this.unrepresentable === "throw") throw new Error("Undefined cannot be represented in JSON Schema");
						break;
					case "void":
						if (this.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
						break;
					case "never":
						_json.not = {};
						break;
					case "date":
						if (this.unrepresentable === "throw") throw new Error("Date cannot be represented in JSON Schema");
						break;
					case "array": {
						const json2 = _json;
						const { minimum, maximum } = schema._zod.bag;
						if (typeof minimum === "number") json2.minItems = minimum;
						if (typeof maximum === "number") json2.maxItems = maximum;
						json2.type = "array";
						json2.items = this.process(def.element, {
							...params,
							path: [...params.path, "items"]
						});
						break;
					}
					case "object": {
						const json2 = _json;
						json2.type = "object";
						json2.properties = {};
						const shape = def.shape;
						for (const key in shape) json2.properties[key] = this.process(shape[key], {
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
							if (this.io === "input") return v.optin === void 0;
							else return v.optout === void 0;
						}));
						if (requiredKeys.size > 0) json2.required = Array.from(requiredKeys);
						if (def.catchall?._zod.def.type === "never") json2.additionalProperties = false;
						else if (!def.catchall) {
							if (this.io === "output") json2.additionalProperties = false;
						} else if (def.catchall) json2.additionalProperties = this.process(def.catchall, {
							...params,
							path: [...params.path, "additionalProperties"]
						});
						break;
					}
					case "union": {
						const json2 = _json;
						json2.anyOf = def.options.map((x, i) => this.process(x, {
							...params,
							path: [
								...params.path,
								"anyOf",
								i
							]
						}));
						break;
					}
					case "intersection": {
						const json2 = _json;
						const a = this.process(def.left, {
							...params,
							path: [
								...params.path,
								"allOf",
								0
							]
						});
						const b = this.process(def.right, {
							...params,
							path: [
								...params.path,
								"allOf",
								1
							]
						});
						const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
						const allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
						json2.allOf = allOf;
						break;
					}
					case "tuple": {
						const json2 = _json;
						json2.type = "array";
						const prefixItems = def.items.map((x, i) => this.process(x, {
							...params,
							path: [
								...params.path,
								"prefixItems",
								i
							]
						}));
						if (this.target === "draft-2020-12") json2.prefixItems = prefixItems;
						else json2.items = prefixItems;
						if (def.rest) {
							const rest = this.process(def.rest, {
								...params,
								path: [...params.path, "items"]
							});
							if (this.target === "draft-2020-12") json2.items = rest;
							else json2.additionalItems = rest;
						}
						if (def.rest) json2.items = this.process(def.rest, {
							...params,
							path: [...params.path, "items"]
						});
						const { minimum, maximum } = schema._zod.bag;
						if (typeof minimum === "number") json2.minItems = minimum;
						if (typeof maximum === "number") json2.maxItems = maximum;
						break;
					}
					case "record": {
						const json2 = _json;
						json2.type = "object";
						json2.propertyNames = this.process(def.keyType, {
							...params,
							path: [...params.path, "propertyNames"]
						});
						json2.additionalProperties = this.process(def.valueType, {
							...params,
							path: [...params.path, "additionalProperties"]
						});
						break;
					}
					case "map":
						if (this.unrepresentable === "throw") throw new Error("Map cannot be represented in JSON Schema");
						break;
					case "set":
						if (this.unrepresentable === "throw") throw new Error("Set cannot be represented in JSON Schema");
						break;
					case "enum": {
						const json2 = _json;
						const values = getEnumValues(def.entries);
						if (values.every((v) => typeof v === "number")) json2.type = "number";
						if (values.every((v) => typeof v === "string")) json2.type = "string";
						json2.enum = values;
						break;
					}
					case "literal": {
						const json2 = _json;
						const vals = [];
						for (const val of def.values) if (val === void 0) {
							if (this.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
						} else if (typeof val === "bigint") if (this.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
						else vals.push(Number(val));
						else vals.push(val);
						if (vals.length === 0) {} else if (vals.length === 1) {
							const val = vals[0];
							json2.type = val === null ? "null" : typeof val;
							json2.const = val;
						} else {
							if (vals.every((v) => typeof v === "number")) json2.type = "number";
							if (vals.every((v) => typeof v === "string")) json2.type = "string";
							if (vals.every((v) => typeof v === "boolean")) json2.type = "string";
							if (vals.every((v) => v === null)) json2.type = "null";
							json2.enum = vals;
						}
						break;
					}
					case "file": {
						const json2 = _json;
						const file2 = {
							type: "string",
							format: "binary",
							contentEncoding: "binary"
						};
						const { minimum, maximum, mime } = schema._zod.bag;
						if (minimum !== void 0) file2.minLength = minimum;
						if (maximum !== void 0) file2.maxLength = maximum;
						if (mime) if (mime.length === 1) {
							file2.contentMediaType = mime[0];
							Object.assign(json2, file2);
						} else json2.anyOf = mime.map((m) => {
							const mFile = {
								...file2,
								contentMediaType: m
							};
							return mFile;
						});
						else Object.assign(json2, file2);
						break;
					}
					case "transform":
						if (this.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
						break;
					case "nullable": {
						const inner = this.process(def.innerType, params);
						_json.anyOf = [inner, { type: "null" }];
						break;
					}
					case "nonoptional":
						this.process(def.innerType, params);
						result.ref = def.innerType;
						break;
					case "success": {
						const json2 = _json;
						json2.type = "boolean";
						break;
					}
					case "default":
						this.process(def.innerType, params);
						result.ref = def.innerType;
						_json.default = JSON.parse(JSON.stringify(def.defaultValue));
						break;
					case "prefault":
						this.process(def.innerType, params);
						result.ref = def.innerType;
						if (this.io === "input") _json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
						break;
					case "catch": {
						this.process(def.innerType, params);
						result.ref = def.innerType;
						let catchValue;
						try {
							catchValue = def.catchValue(void 0);
						} catch {
							throw new Error("Dynamic catch values are not supported in JSON Schema");
						}
						_json.default = catchValue;
						break;
					}
					case "nan":
						if (this.unrepresentable === "throw") throw new Error("NaN cannot be represented in JSON Schema");
						break;
					case "template_literal": {
						const json2 = _json;
						const pattern = schema._zod.pattern;
						if (!pattern) throw new Error("Pattern not found in template literal");
						json2.type = "string";
						json2.pattern = pattern.source;
						break;
					}
					case "pipe": {
						const innerType = this.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
						this.process(innerType, params);
						result.ref = innerType;
						break;
					}
					case "readonly":
						this.process(def.innerType, params);
						result.ref = def.innerType;
						_json.readOnly = true;
						break;
					case "promise":
						this.process(def.innerType, params);
						result.ref = def.innerType;
						break;
					case "optional":
						this.process(def.innerType, params);
						result.ref = def.innerType;
						break;
					case "lazy": {
						const innerType = schema._zod.innerType;
						this.process(innerType, params);
						result.ref = innerType;
						break;
					}
					case "custom":
						if (this.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
						break;
					default:
				}
			}
		}
		const meta = this.metadataRegistry.get(schema);
		if (meta) Object.assign(result.schema, meta);
		if (this.io === "input" && isTransforming(schema)) {
			delete result.schema.examples;
			delete result.schema.default;
		}
		if (this.io === "input" && result.schema._prefault) (_a$2 = result.schema).default ?? (_a$2.default = result.schema._prefault);
		delete result.schema._prefault;
		const _result = this.seen.get(schema);
		return _result.schema;
	}
	emit(schema, _params) {
		const params = {
			cycles: _params?.cycles ?? "ref",
			reused: _params?.reused ?? "inline",
			external: _params?.external ?? void 0
		};
		const root = this.seen.get(schema);
		if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
		const makeURI = (entry) => {
			const defsSegment = this.target === "draft-2020-12" ? "$defs" : "definitions";
			if (params.external) {
				const externalId = params.external.registry.get(entry[0])?.id;
				const uriGenerator = params.external.uri ?? ((id2) => id2);
				if (externalId) return { ref: uriGenerator(externalId) };
				const id = entry[1].defId ?? entry[1].schema.id ?? `schema${this.counter++}`;
				entry[1].defId = id;
				return {
					defId: id,
					ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
				};
			}
			if (entry[1] === root) return { ref: "#" };
			const uriPrefix = `#`;
			const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
			const defId = entry[1].schema.id ?? `__schema${this.counter++}`;
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
			const schema2 = seen.schema;
			for (const key in schema2) delete schema2[key];
			schema2.$ref = ref;
		};
		if (params.cycles === "throw") for (const entry of this.seen.entries()) {
			const seen = entry[1];
			if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
		}
		for (const entry of this.seen.entries()) {
			const seen = entry[1];
			if (schema === entry[0]) {
				extractToDef(entry);
				continue;
			}
			if (params.external) {
				const ext = params.external.registry.get(entry[0])?.id;
				if (schema !== entry[0] && ext) {
					extractToDef(entry);
					continue;
				}
			}
			const id = this.metadataRegistry.get(entry[0])?.id;
			if (id) {
				extractToDef(entry);
				continue;
			}
			if (seen.cycle) {
				extractToDef(entry);
				continue;
			}
			if (seen.count > 1) {
				if (params.reused === "ref") {
					extractToDef(entry);
					continue;
				}
			}
		}
		const flattenRef = (zodSchema, params2) => {
			const seen = this.seen.get(zodSchema);
			const schema2 = seen.def ?? seen.schema;
			const _cached = { ...schema2 };
			if (seen.ref === null) return;
			const ref = seen.ref;
			seen.ref = null;
			if (ref) {
				flattenRef(ref, params2);
				const refSchema = this.seen.get(ref).schema;
				if (refSchema.$ref && params2.target === "draft-7") {
					schema2.allOf = schema2.allOf ?? [];
					schema2.allOf.push(refSchema);
				} else {
					Object.assign(schema2, refSchema);
					Object.assign(schema2, _cached);
				}
			}
			if (!seen.isParent) this.override({
				zodSchema,
				jsonSchema: schema2,
				path: seen.path ?? []
			});
		};
		for (const entry of [...this.seen.entries()].reverse()) flattenRef(entry[0], { target: this.target });
		const result = {};
		if (this.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
		else if (this.target === "draft-7") result.$schema = "http://json-schema.org/draft-07/schema#";
		else console.warn(`Invalid target: ${this.target}`);
		if (params.external?.uri) {
			const id = params.external.registry.get(schema)?.id;
			if (!id) throw new Error("Schema is missing an `id` property");
			result.$id = params.external.uri(id);
		}
		Object.assign(result, root.def);
		const defs = params.external?.defs ?? {};
		for (const entry of this.seen.entries()) {
			const seen = entry[1];
			if (seen.def && seen.defId) defs[seen.defId] = seen.def;
		}
		if (params.external) {} else if (Object.keys(defs).length > 0) if (this.target === "draft-2020-12") result.$defs = defs;
		else result.definitions = defs;
		try {
			return JSON.parse(JSON.stringify(result));
		} catch (_err) {
			throw new Error("Error converting schema to JSON.");
		}
	}
};
function toJSONSchema(input, _params) {
	if (input instanceof $ZodRegistry) {
		const gen2 = new JSONSchemaGenerator(_params);
		const defs = {};
		for (const entry of input._idmap.entries()) {
			const [_, schema] = entry;
			gen2.process(schema);
		}
		const schemas = {};
		const external = {
			registry: input,
			uri: _params?.uri,
			defs
		};
		for (const entry of input._idmap.entries()) {
			const [key, schema] = entry;
			schemas[key] = gen2.emit(schema, {
				..._params,
				external
			});
		}
		if (Object.keys(defs).length > 0) {
			const defsSegment = gen2.target === "draft-2020-12" ? "$defs" : "definitions";
			schemas.__shared = { [defsSegment]: defs };
		}
		return { schemas };
	}
	const gen = new JSONSchemaGenerator(_params);
	gen.process(input);
	return gen.emit(input, _params);
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const schema = _schema;
	const def = schema._zod.def;
	switch (def.type) {
		case "string":
		case "number":
		case "bigint":
		case "boolean":
		case "date":
		case "symbol":
		case "undefined":
		case "null":
		case "any":
		case "unknown":
		case "never":
		case "void":
		case "literal":
		case "enum":
		case "nan":
		case "file":
		case "template_literal": return false;
		case "array": return isTransforming(def.element, ctx);
		case "object":
			for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
			return false;
		case "union":
			for (const option of def.options) if (isTransforming(option, ctx)) return true;
			return false;
		case "intersection": return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
		case "tuple":
			for (const item of def.items) if (isTransforming(item, ctx)) return true;
			if (def.rest && isTransforming(def.rest, ctx)) return true;
			return false;
		case "record": return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
		case "map": return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
		case "set": return isTransforming(def.valueType, ctx);
		case "promise":
		case "optional":
		case "nonoptional":
		case "nullable":
		case "readonly": return isTransforming(def.innerType, ctx);
		case "lazy": return isTransforming(def.getter(), ctx);
		case "default": return isTransforming(def.innerType, ctx);
		case "prefault": return isTransforming(def.innerType, ctx);
		case "custom": return false;
		case "transform": return true;
		case "pipe": return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
		case "success": return false;
		case "catch": return false;
		default:
	}
	throw new Error(`Unknown schema type: ${def.type}`);
}
var json_schema_exports = {};
var iso_exports = {};
__export(iso_exports, {
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	date: () => date2,
	datetime: () => datetime2,
	duration: () => duration2,
	time: () => time2
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime2(params) {
	return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date2(params) {
	return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time2(params) {
	return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration2(params) {
	return _isoDuration(ZodISODuration, params);
}
var initializer2 = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	Object.defineProperties(inst, {
		format: { value: (mapper) => formatError(inst, mapper) },
		flatten: { value: (mapper) => flattenError(inst, mapper) },
		addIssue: { value: (issue2) => inst.issues.push(issue2) },
		addIssues: { value: (issues2) => inst.issues.push(...issues2) },
		isEmpty: { get() {
			return inst.issues.length === 0;
		} }
	});
};
var ZodError = /* @__PURE__ */ $constructor("ZodError", initializer2);
var ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, { Parent: Error });
var parse2 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	inst.def = def;
	Object.defineProperty(inst, "_def", { value: def });
	inst.check = (...checks) => {
		return inst.clone({
			...def,
			checks: [...def.checks ?? [], ...checks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)]
		});
	};
	inst.clone = (def2, params) => clone(inst, def2, params);
	inst.brand = () => inst;
	inst.register = (reg, meta) => {
		reg.add(inst, meta);
		return inst;
	};
	inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse2(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.refine = (check2, params) => inst.check(refine(check2, params));
	inst.superRefine = (refinement) => inst.check(superRefine(refinement));
	inst.overwrite = (fn) => inst.check(_overwrite(fn));
	inst.optional = () => optional(inst);
	inst.nullable = () => nullable(inst);
	inst.nullish = () => optional(nullable(inst));
	inst.nonoptional = (params) => nonoptional(inst, params);
	inst.array = () => array(inst);
	inst.or = (arg) => union([inst, arg]);
	inst.and = (arg) => intersection(inst, arg);
	inst.transform = (tx) => pipe(inst, transform(tx));
	inst.default = (def2) => _default2(inst, def2);
	inst.prefault = (def2) => prefault(inst, def2);
	inst.catch = (params) => _catch2(inst, params);
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
	return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	inst.regex = (...args) => inst.check(_regex(...args));
	inst.includes = (...args) => inst.check(_includes(...args));
	inst.startsWith = (...args) => inst.check(_startsWith(...args));
	inst.endsWith = (...args) => inst.check(_endsWith(...args));
	inst.min = (...args) => inst.check(_minLength(...args));
	inst.max = (...args) => inst.check(_maxLength(...args));
	inst.length = (...args) => inst.check(_length(...args));
	inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
	inst.lowercase = (params) => inst.check(_lowercase(params));
	inst.uppercase = (params) => inst.check(_uppercase(params));
	inst.trim = () => inst.check(_trim());
	inst.normalize = (...args) => inst.check(_normalize(...args));
	inst.toLowerCase = () => inst.check(_toLowerCase());
	inst.toUpperCase = () => inst.check(_toUpperCase());
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(_email(ZodEmail, params));
	inst.url = (params) => inst.check(_url(ZodURL, params));
	inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
	inst.guid = (params) => inst.check(_guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(_guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(_xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(_e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime2(params));
	inst.date = (params) => inst.check(date2(params));
	inst.time = (params) => inst.check(time2(params));
	inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
	return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function email2(params) {
	return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function guid2(params) {
	return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function uuid2(params) {
	return _uuid(ZodUUID, params);
}
function uuidv4(params) {
	return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
	return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
	return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function url(params) {
	return _url(ZodURL, params);
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function emoji2(params) {
	return _emoji2(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function nanoid2(params) {
	return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cuid3(params) {
	return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cuid22(params) {
	return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ulid2(params) {
	return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function xid2(params) {
	return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ksuid2(params) {
	return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ipv42(params) {
	return _ipv4(ZodIPv4, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function ipv62(params) {
	return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cidrv42(params) {
	return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function cidrv62(params) {
	return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function base642(params) {
	return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function base64url2(params) {
	return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function e1642(params) {
	return _e164(ZodE164, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function jwt(params) {
	return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
	$ZodCustomStringFormat.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
	return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType.init(inst, def);
	inst.gt = (value, params) => inst.check(_gt(value, params));
	inst.gte = (value, params) => inst.check(_gte(value, params));
	inst.min = (value, params) => inst.check(_gte(value, params));
	inst.lt = (value, params) => inst.check(_lt(value, params));
	inst.lte = (value, params) => inst.check(_lte(value, params));
	inst.max = (value, params) => inst.check(_lte(value, params));
	inst.int = (params) => inst.check(int(params));
	inst.safe = (params) => inst.check(int(params));
	inst.positive = (params) => inst.check(_gt(0, params));
	inst.nonnegative = (params) => inst.check(_gte(0, params));
	inst.negative = (params) => inst.check(_lt(0, params));
	inst.nonpositive = (params) => inst.check(_lte(0, params));
	inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
	inst.step = (value, params) => inst.check(_multipleOf(value, params));
	inst.finite = () => inst;
	const bag = inst._zod.bag;
	inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
	inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
	inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
	inst.isFinite = true;
	inst.format = bag.format ?? null;
});
function number2(params) {
	return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return _int(ZodNumberFormat, params);
}
function float32(params) {
	return _float32(ZodNumberFormat, params);
}
function float64(params) {
	return _float64(ZodNumberFormat, params);
}
function int32(params) {
	return _int32(ZodNumberFormat, params);
}
function uint32(params) {
	return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
});
function boolean2(params) {
	return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
	$ZodBigInt.init(inst, def);
	ZodType.init(inst, def);
	inst.gte = (value, params) => inst.check(_gte(value, params));
	inst.min = (value, params) => inst.check(_gte(value, params));
	inst.gt = (value, params) => inst.check(_gt(value, params));
	inst.gte = (value, params) => inst.check(_gte(value, params));
	inst.min = (value, params) => inst.check(_gte(value, params));
	inst.lt = (value, params) => inst.check(_lt(value, params));
	inst.lte = (value, params) => inst.check(_lte(value, params));
	inst.max = (value, params) => inst.check(_lte(value, params));
	inst.positive = (params) => inst.check(_gt(BigInt(0), params));
	inst.negative = (params) => inst.check(_lt(BigInt(0), params));
	inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
	inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
	inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
	const bag = inst._zod.bag;
	inst.minValue = bag.minimum ?? null;
	inst.maxValue = bag.maximum ?? null;
	inst.format = bag.format ?? null;
});
function bigint2(params) {
	return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
	$ZodBigIntFormat.init(inst, def);
	ZodBigInt.init(inst, def);
});
function int64(params) {
	return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
	return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
	$ZodSymbol.init(inst, def);
	ZodType.init(inst, def);
});
function symbol(params) {
	return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
	$ZodUndefined.init(inst, def);
	ZodType.init(inst, def);
});
function _undefined3(params) {
	return _undefined2(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
	$ZodNull.init(inst, def);
	ZodType.init(inst, def);
});
function _null3(params) {
	return _null2(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
	$ZodAny.init(inst, def);
	ZodType.init(inst, def);
});
function any() {
	return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
});
function unknown() {
	return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
});
function never(params) {
	return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
	$ZodVoid.init(inst, def);
	ZodType.init(inst, def);
});
function _void2(params) {
	return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
	$ZodDate.init(inst, def);
	ZodType.init(inst, def);
	inst.min = (value, params) => inst.check(_gte(value, params));
	inst.max = (value, params) => inst.check(_lte(value, params));
	const c = inst._zod.bag;
	inst.minDate = c.minimum ? new Date(c.minimum) : null;
	inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date3(params) {
	return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst.element = def.element;
	inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
	inst.nonempty = (params) => inst.check(_minLength(1, params));
	inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
	inst.length = (len, params) => inst.check(_length(len, params));
	inst.unwrap = () => inst.element;
});
function array(element, params) {
	return _array(ZodArray, element, params);
}
function keyof(schema) {
	const shape = schema._zod.def.shape;
	return literal(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
	$ZodObject.init(inst, def);
	ZodType.init(inst, def);
	util_exports.defineLazy(inst, "shape", () => def.shape);
	inst.keyof = () => _enum2(Object.keys(inst._zod.def.shape));
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
		return util_exports.extend(inst, incoming);
	};
	inst.merge = (other) => util_exports.merge(inst, other);
	inst.pick = (mask) => util_exports.pick(inst, mask);
	inst.omit = (mask) => util_exports.omit(inst, mask);
	inst.partial = (...args) => util_exports.partial(ZodOptional, inst, args[0]);
	inst.required = (...args) => util_exports.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
	const def = {
		type: "object",
		get shape() {
			util_exports.assignProp(this, "shape", { ...shape });
			return this.shape;
		},
		...util_exports.normalizeParams(params)
	};
	return new ZodObject(def);
}
function strictObject(shape, params) {
	return new ZodObject({
		type: "object",
		get shape() {
			util_exports.assignProp(this, "shape", { ...shape });
			return this.shape;
		},
		catchall: never(),
		...util_exports.normalizeParams(params)
	});
}
function looseObject(shape, params) {
	return new ZodObject({
		type: "object",
		get shape() {
			util_exports.assignProp(this, "shape", { ...shape });
			return this.shape;
		},
		catchall: unknown(),
		...util_exports.normalizeParams(params)
	});
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...util_exports.normalizeParams(params)
	});
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion.init(inst, def);
	$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...util_exports.normalizeParams(params)
	});
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
	$ZodTuple.init(inst, def);
	ZodType.init(inst, def);
	inst.rest = (rest) => inst.clone({
		...inst._zod.def,
		rest
	});
});
function tuple(items, _paramsOrRest, _params) {
	const hasRest = _paramsOrRest instanceof $ZodType;
	const params = hasRest ? _params : _paramsOrRest;
	const rest = hasRest ? _paramsOrRest : null;
	return new ZodTuple({
		type: "tuple",
		items,
		rest,
		...util_exports.normalizeParams(params)
	});
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodType.init(inst, def);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...util_exports.normalizeParams(params)
	});
}
function partialRecord(keyType, valueType, params) {
	return new ZodRecord({
		type: "record",
		keyType: union([keyType, never()]),
		valueType,
		...util_exports.normalizeParams(params)
	});
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
	$ZodMap.init(inst, def);
	ZodType.init(inst, def);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function map(keyType, valueType, params) {
	return new ZodMap({
		type: "map",
		keyType,
		valueType,
		...util_exports.normalizeParams(params)
	});
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
	$ZodSet.init(inst, def);
	ZodType.init(inst, def);
	inst.min = (...args) => inst.check(_minSize(...args));
	inst.nonempty = (params) => inst.check(_minSize(1, params));
	inst.max = (...args) => inst.check(_maxSize(...args));
	inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
	return new ZodSet({
		type: "set",
		valueType,
		...util_exports.normalizeParams(params)
	});
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
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
			...util_exports.normalizeParams(params),
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
			...util_exports.normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum2(values, params) {
	const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
	return new ZodEnum({
		type: "enum",
		entries,
		...util_exports.normalizeParams(params)
	});
}
function nativeEnum(entries, params) {
	return new ZodEnum({
		type: "enum",
		entries,
		...util_exports.normalizeParams(params)
	});
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", { get() {
		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return def.values[0];
	} });
});
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...util_exports.normalizeParams(params)
	});
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
	$ZodFile.init(inst, def);
	ZodType.init(inst, def);
	inst.min = (size, params) => inst.check(_minSize(size, params));
	inst.max = (size, params) => inst.check(_maxSize(size, params));
	inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
	return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.addIssue = (issue2) => {
			if (typeof issue2 === "string") payload.issues.push(util_exports.issue(issue2, payload.value, def));
			else {
				const _issue = issue2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				_issue.continue ?? (_issue.continue = true);
				payload.issues.push(util_exports.issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output2) => {
			payload.value = output2;
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
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
function nullish2(innerType) {
	return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : defaultValue;
		}
	});
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : defaultValue;
		}
	});
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...util_exports.normalizeParams(params)
	});
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
	$ZodSuccess.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
	return new ZodSuccess({
		type: "success",
		innerType
	});
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
	$ZodNaN.init(inst, def);
	ZodType.init(inst, def);
});
function nan(params) {
	return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
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
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
	$ZodTemplateLiteral.init(inst, def);
	ZodType.init(inst, def);
});
function templateLiteral(parts, params) {
	return new ZodTemplateLiteral({
		type: "template_literal",
		parts,
		...util_exports.normalizeParams(params)
	});
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
	$ZodLazy.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
	return new ZodLazy({
		type: "lazy",
		getter
	});
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
	$ZodPromise.init(inst, def);
	ZodType.init(inst, def);
	inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
	return new ZodPromise({
		type: "promise",
		innerType
	});
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
});
function check(fn) {
	const ch = new $ZodCheck({ check: "custom" });
	ch._zod.check = fn;
	return ch;
}
function custom(fn, _params) {
	return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
	return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
	const ch = check((payload) => {
		payload.addIssue = (issue2) => {
			if (typeof issue2 === "string") payload.issues.push(util_exports.issue(issue2, payload.value, ch._zod.def));
			else {
				const _issue = issue2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(util_exports.issue(_issue));
			}
		};
		return fn(payload.value, payload);
	});
	return ch;
}
function _instanceof(cls, params = { error: `Input not instance of ${cls.name}` }) {
	const inst = new ZodCustom({
		type: "custom",
		check: "custom",
		fn: (data) => data instanceof cls,
		abort: true,
		...util_exports.normalizeParams(params)
	});
	inst._zod.bag.Class = cls;
	return inst;
}
var stringbool = (...args) => _stringbool({
	Pipe: ZodPipe,
	Boolean: ZodBoolean,
	String: ZodString,
	Transform: ZodTransform
}, ...args);
function json(params) {
	const jsonSchema = lazy(() => {
		return union([
			string2(params),
			number2(),
			boolean2(),
			_null3(),
			array(jsonSchema),
			record(string2(), jsonSchema)
		]);
	});
	return jsonSchema;
}
function preprocess(fn, schema) {
	return pipe(transform(fn), schema);
}
var ZodIssueCode = {
	invalid_type: "invalid_type",
	too_big: "too_big",
	too_small: "too_small",
	invalid_format: "invalid_format",
	not_multiple_of: "not_multiple_of",
	unrecognized_keys: "unrecognized_keys",
	invalid_union: "invalid_union",
	invalid_key: "invalid_key",
	invalid_element: "invalid_element",
	invalid_value: "invalid_value",
	custom: "custom"
};
function setErrorMap(map2) {
	config({ customError: map2 });
}
function getErrorMap() {
	return config().customError;
}
var coerce_exports = {};
__export(coerce_exports, {
	bigint: () => bigint3,
	boolean: () => boolean3,
	date: () => date4,
	number: () => number3,
	string: () => string3
});
function string3(params) {
	return _coercedString(ZodString, params);
}
function number3(params) {
	return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
	return _coercedBoolean(ZodBoolean, params);
}
function bigint3(params) {
	return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
	return _coercedDate(ZodDate, params);
}
config(en_default());
var openaiErrorDataSchema = external_exports.object({ error: external_exports.object({
	message: external_exports.string(),
	type: external_exports.string().nullish(),
	param: external_exports.any().nullish(),
	code: external_exports.union([external_exports.string(), external_exports.number()]).nullish()
}) });
var openaiFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: openaiErrorDataSchema,
	errorToMessage: (data) => data.error.message
});
var localShellInputSchema = external_exports.object({ action: external_exports.object({
	type: external_exports.literal("exec"),
	command: external_exports.array(external_exports.string()),
	timeoutMs: external_exports.number().optional(),
	user: external_exports.string().optional(),
	workingDirectory: external_exports.string().optional(),
	env: external_exports.record(external_exports.string(), external_exports.string()).optional()
}) });
var localShellOutputSchema = external_exports.object({ output: external_exports.string() });
createProviderDefinedToolFactoryWithOutputSchema({
	id: "openai.local_shell",
	name: "local_shell",
	inputSchema: localShellInputSchema,
	outputSchema: localShellOutputSchema
});
function isFileId(data, prefixes) {
	if (!prefixes) return false;
	return prefixes.some((prefix) => data.startsWith(prefix));
}
async function convertToOpenAIResponsesInput({ prompt, systemMessageMode, fileIdPrefixes, store, hasLocalShellTool = false }) {
	const input = [];
	const warnings = [];
	for (const { role, content } of prompt) switch (role) {
		case "system":
			switch (systemMessageMode) {
				case "system":
					input.push({
						role: "system",
						content
					});
					break;
				case "developer":
					input.push({
						role: "developer",
						content
					});
					break;
				case "remove":
					warnings.push({
						type: "other",
						message: "system messages are removed for this model"
					});
					break;
				default: {
					const _exhaustiveCheck = systemMessageMode;
					throw new Error(`Unsupported system message mode: ${_exhaustiveCheck}`);
				}
			}
			break;
		case "user":
			input.push({
				role: "user",
				content: content.map((part, index) => {
					switch (part.type) {
						case "text": return {
							type: "input_text",
							text: part.text
						};
						case "file": if (part.mediaType.startsWith("image/")) {
							const mediaType = part.mediaType === "image/*" ? "image/jpeg" : part.mediaType;
							return {
								type: "input_image",
								...part.data instanceof URL ? { image_url: part.data.toString() } : typeof part.data === "string" && isFileId(part.data, fileIdPrefixes) ? { file_id: part.data } : { image_url: `data:${mediaType};base64,${convertToBase64(part.data)}` },
								detail: part.providerOptions?.openai?.imageDetail
							};
						} else if (part.mediaType === "application/pdf") {
							if (part.data instanceof URL) return {
								type: "input_file",
								file_url: part.data.toString()
							};
							return {
								type: "input_file",
								...typeof part.data === "string" && isFileId(part.data, fileIdPrefixes) ? { file_id: part.data } : {
									filename: part.filename ?? `part-${index}.pdf`,
									file_data: `data:application/pdf;base64,${convertToBase64(part.data)}`
								}
							};
						} else throw new UnsupportedFunctionalityError({ functionality: `file part media type ${part.mediaType}` });
					}
				})
			});
			break;
		case "assistant": {
			const reasoningMessages = {};
			const toolCallParts = {};
			for (const part of content) switch (part.type) {
				case "text":
					input.push({
						role: "assistant",
						content: [{
							type: "output_text",
							text: part.text
						}],
						id: part.providerOptions?.openai?.itemId ?? void 0
					});
					break;
				case "tool-call":
					toolCallParts[part.toolCallId] = part;
					if (part.providerExecuted) break;
					if (hasLocalShellTool && part.toolName === "local_shell") {
						const parsedInput = localShellInputSchema.parse(part.input);
						input.push({
							type: "local_shell_call",
							call_id: part.toolCallId,
							id: part.providerOptions?.openai?.itemId ?? void 0,
							action: {
								type: "exec",
								command: parsedInput.action.command,
								timeout_ms: parsedInput.action.timeoutMs,
								user: parsedInput.action.user,
								working_directory: parsedInput.action.workingDirectory,
								env: parsedInput.action.env
							}
						});
						break;
					}
					input.push({
						type: "function_call",
						call_id: part.toolCallId,
						name: part.toolName,
						arguments: JSON.stringify(part.input),
						id: part.providerOptions?.openai?.itemId ?? void 0
					});
					break;
				case "tool-result":
					if (store) input.push({
						type: "item_reference",
						id: part.toolCallId
					});
					else warnings.push({
						type: "other",
						message: `Results for OpenAI tool ${part.toolName} are not sent to the API when store is false`
					});
					break;
				case "reasoning": {
					const providerOptions = await parseProviderOptions({
						provider: "openai",
						providerOptions: part.providerOptions,
						schema: openaiResponsesReasoningProviderOptionsSchema
					});
					const reasoningId = providerOptions?.itemId;
					if (reasoningId != null) {
						const reasoningMessage = reasoningMessages[reasoningId];
						if (store) {
							if (reasoningMessage === void 0) {
								input.push({
									type: "item_reference",
									id: reasoningId
								});
								reasoningMessages[reasoningId] = {
									type: "reasoning",
									id: reasoningId,
									summary: []
								};
							}
						} else {
							const summaryParts = [];
							if (part.text.length > 0) summaryParts.push({
								type: "summary_text",
								text: part.text
							});
							else if (reasoningMessage !== void 0) warnings.push({
								type: "other",
								message: `Cannot append empty reasoning part to existing reasoning sequence. Skipping reasoning part: ${JSON.stringify(part)}.`
							});
							if (reasoningMessage === void 0) {
								reasoningMessages[reasoningId] = {
									type: "reasoning",
									id: reasoningId,
									encrypted_content: providerOptions?.reasoningEncryptedContent,
									summary: summaryParts
								};
								input.push(reasoningMessages[reasoningId]);
							} else reasoningMessage.summary.push(...summaryParts);
						}
					} else warnings.push({
						type: "other",
						message: `Non-OpenAI reasoning parts are not supported. Skipping reasoning part: ${JSON.stringify(part)}.`
					});
					break;
				}
			}
			break;
		}
		case "tool":
			for (const part of content) {
				const output = part.output;
				if (hasLocalShellTool && part.toolName === "local_shell" && output.type === "json") {
					input.push({
						type: "local_shell_call_output",
						call_id: part.toolCallId,
						output: localShellOutputSchema.parse(output.value).output
					});
					break;
				}
				let contentValue;
				switch (output.type) {
					case "text":
					case "error-text":
						contentValue = output.value;
						break;
					case "content":
					case "json":
					case "error-json":
						contentValue = JSON.stringify(output.value);
						break;
				}
				input.push({
					type: "function_call_output",
					call_id: part.toolCallId,
					output: contentValue
				});
			}
			break;
		default: {
			const _exhaustiveCheck = role;
			throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
		}
	}
	return {
		input,
		warnings
	};
}
var openaiResponsesReasoningProviderOptionsSchema = external_exports.object({
	itemId: external_exports.string().nullish(),
	reasoningEncryptedContent: external_exports.string().nullish()
});
function mapOpenAIResponseFinishReason({ finishReason, hasFunctionCall }) {
	switch (finishReason) {
		case void 0:
		case null: return hasFunctionCall ? "tool-calls" : "stop";
		case "max_output_tokens": return "length";
		case "content_filter": return "content-filter";
		default: return hasFunctionCall ? "tool-calls" : "unknown";
	}
}
var codeInterpreterInputSchema = external_exports.object({
	code: external_exports.string().nullish(),
	containerId: external_exports.string()
});
var codeInterpreterOutputSchema = external_exports.object({ outputs: external_exports.array(external_exports.discriminatedUnion("type", [external_exports.object({
	type: external_exports.literal("logs"),
	logs: external_exports.string()
}), external_exports.object({
	type: external_exports.literal("image"),
	url: external_exports.string()
})])).nullish() });
var codeInterpreterArgsSchema = external_exports.object({ container: external_exports.union([external_exports.string(), external_exports.object({ fileIds: external_exports.array(external_exports.string()).optional() })]).optional() });
createProviderDefinedToolFactoryWithOutputSchema({
	id: "openai.code_interpreter",
	name: "code_interpreter",
	inputSchema: codeInterpreterInputSchema,
	outputSchema: codeInterpreterOutputSchema
});
var comparisonFilterSchema = external_exports.object({
	key: external_exports.string(),
	type: external_exports.enum([
		"eq",
		"ne",
		"gt",
		"gte",
		"lt",
		"lte"
	]),
	value: external_exports.union([
		external_exports.string(),
		external_exports.number(),
		external_exports.boolean()
	])
});
var compoundFilterSchema = external_exports.object({
	type: external_exports.enum(["and", "or"]),
	filters: external_exports.array(external_exports.union([comparisonFilterSchema, external_exports.lazy(() => compoundFilterSchema)]))
});
var fileSearchArgsSchema = external_exports.object({
	vectorStoreIds: external_exports.array(external_exports.string()),
	maxNumResults: external_exports.number().optional(),
	ranking: external_exports.object({
		ranker: external_exports.string().optional(),
		scoreThreshold: external_exports.number().optional()
	}).optional(),
	filters: external_exports.union([comparisonFilterSchema, compoundFilterSchema]).optional()
});
var fileSearchOutputSchema = external_exports.object({
	queries: external_exports.array(external_exports.string()),
	results: external_exports.array(external_exports.object({
		attributes: external_exports.record(external_exports.string(), external_exports.unknown()),
		fileId: external_exports.string(),
		filename: external_exports.string(),
		score: external_exports.number(),
		text: external_exports.string()
	})).nullable()
});
createProviderDefinedToolFactoryWithOutputSchema({
	id: "openai.file_search",
	name: "file_search",
	inputSchema: external_exports.object({}),
	outputSchema: fileSearchOutputSchema
});
var webSearchArgsSchema = external_exports.object({
	filters: external_exports.object({ allowedDomains: external_exports.array(external_exports.string()).optional() }).optional(),
	searchContextSize: external_exports.enum([
		"low",
		"medium",
		"high"
	]).optional(),
	userLocation: external_exports.object({
		type: external_exports.literal("approximate"),
		country: external_exports.string().optional(),
		city: external_exports.string().optional(),
		region: external_exports.string().optional(),
		timezone: external_exports.string().optional()
	}).optional()
});
createProviderDefinedToolFactory({
	id: "openai.web_search",
	name: "web_search",
	inputSchema: external_exports.object({ action: external_exports.discriminatedUnion("type", [
		external_exports.object({
			type: external_exports.literal("search"),
			query: external_exports.string().nullish()
		}),
		external_exports.object({
			type: external_exports.literal("open_page"),
			url: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("find"),
			url: external_exports.string(),
			pattern: external_exports.string()
		})
	]).nullish() })
});
var webSearchPreviewArgsSchema = external_exports.object({
	searchContextSize: external_exports.enum([
		"low",
		"medium",
		"high"
	]).optional(),
	userLocation: external_exports.object({
		type: external_exports.literal("approximate"),
		country: external_exports.string().optional(),
		city: external_exports.string().optional(),
		region: external_exports.string().optional(),
		timezone: external_exports.string().optional()
	}).optional()
});
createProviderDefinedToolFactory({
	id: "openai.web_search_preview",
	name: "web_search_preview",
	inputSchema: external_exports.object({ action: external_exports.discriminatedUnion("type", [
		external_exports.object({
			type: external_exports.literal("search"),
			query: external_exports.string().nullish()
		}),
		external_exports.object({
			type: external_exports.literal("open_page"),
			url: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("find"),
			url: external_exports.string(),
			pattern: external_exports.string()
		})
	]).nullish() })
});
var imageGenerationArgsSchema = external_exports.object({
	background: external_exports.enum([
		"auto",
		"opaque",
		"transparent"
	]).optional(),
	inputFidelity: external_exports.enum(["low", "high"]).optional(),
	inputImageMask: external_exports.object({
		fileId: external_exports.string().optional(),
		imageUrl: external_exports.string().optional()
	}).optional(),
	model: external_exports.string().optional(),
	moderation: external_exports.enum(["auto"]).optional(),
	outputCompression: external_exports.number().int().min(0).max(100).optional(),
	outputFormat: external_exports.enum([
		"png",
		"jpeg",
		"webp"
	]).optional(),
	partialImages: external_exports.number().int().min(0).max(3).optional(),
	quality: external_exports.enum([
		"auto",
		"low",
		"medium",
		"high"
	]).optional(),
	size: external_exports.enum([
		"1024x1024",
		"1024x1536",
		"1536x1024",
		"auto"
	]).optional()
}).strict();
var imageGenerationOutputSchema = external_exports.object({ result: external_exports.string() });
createProviderDefinedToolFactoryWithOutputSchema({
	id: "openai.image_generation",
	name: "image_generation",
	inputSchema: external_exports.object({}),
	outputSchema: imageGenerationOutputSchema
});
function prepareResponsesTools({ tools, toolChoice, strictJsonSchema }) {
	tools = tools?.length ? tools : void 0;
	const toolWarnings = [];
	if (tools == null) return {
		tools: void 0,
		toolChoice: void 0,
		toolWarnings
	};
	const openaiTools = [];
	for (const tool of tools) switch (tool.type) {
		case "function":
			openaiTools.push({
				type: "function",
				name: tool.name,
				description: tool.description,
				parameters: tool.inputSchema,
				strict: strictJsonSchema
			});
			break;
		case "provider-defined":
			switch (tool.id) {
				case "openai.file_search": {
					const args = fileSearchArgsSchema.parse(tool.args);
					openaiTools.push({
						type: "file_search",
						vector_store_ids: args.vectorStoreIds,
						max_num_results: args.maxNumResults,
						ranking_options: args.ranking ? {
							ranker: args.ranking.ranker,
							score_threshold: args.ranking.scoreThreshold
						} : void 0,
						filters: args.filters
					});
					break;
				}
				case "openai.local_shell":
					openaiTools.push({ type: "local_shell" });
					break;
				case "openai.web_search_preview": {
					const args = webSearchPreviewArgsSchema.parse(tool.args);
					openaiTools.push({
						type: "web_search_preview",
						search_context_size: args.searchContextSize,
						user_location: args.userLocation
					});
					break;
				}
				case "openai.web_search": {
					const args = webSearchArgsSchema.parse(tool.args);
					openaiTools.push({
						type: "web_search",
						filters: args.filters != null ? { allowed_domains: args.filters.allowedDomains } : void 0,
						search_context_size: args.searchContextSize,
						user_location: args.userLocation
					});
					break;
				}
				case "openai.code_interpreter": {
					const args = codeInterpreterArgsSchema.parse(tool.args);
					openaiTools.push({
						type: "code_interpreter",
						container: args.container == null ? {
							type: "auto",
							file_ids: void 0
						} : typeof args.container === "string" ? args.container : {
							type: "auto",
							file_ids: args.container.fileIds
						}
					});
					break;
				}
				case "openai.image_generation": {
					const args = imageGenerationArgsSchema.parse(tool.args);
					openaiTools.push({
						type: "image_generation",
						background: args.background,
						input_fidelity: args.inputFidelity,
						input_image_mask: args.inputImageMask ? {
							file_id: args.inputImageMask.fileId,
							image_url: args.inputImageMask.imageUrl
						} : void 0,
						model: args.model,
						moderation: args.moderation,
						partial_images: args.partialImages,
						quality: args.quality,
						output_compression: args.outputCompression,
						output_format: args.outputFormat,
						size: args.size
					});
					break;
				}
			}
			break;
		default:
			toolWarnings.push({
				type: "unsupported-tool",
				tool
			});
			break;
	}
	if (toolChoice == null) return {
		tools: openaiTools,
		toolChoice: void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto":
		case "none":
		case "required": return {
			tools: openaiTools,
			toolChoice: type,
			toolWarnings
		};
		case "tool": return {
			tools: openaiTools,
			toolChoice: toolChoice.toolName === "code_interpreter" || toolChoice.toolName === "file_search" || toolChoice.toolName === "image_generation" || toolChoice.toolName === "web_search_preview" || toolChoice.toolName === "web_search" ? { type: toolChoice.toolName } : {
				type: "function",
				name: toolChoice.toolName
			},
			toolWarnings
		};
		default: {
			const _exhaustiveCheck = type;
			throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${_exhaustiveCheck}` });
		}
	}
}
var webSearchCallItem = external_exports.object({
	type: external_exports.literal("web_search_call"),
	id: external_exports.string(),
	status: external_exports.string(),
	action: external_exports.discriminatedUnion("type", [
		external_exports.object({
			type: external_exports.literal("search"),
			query: external_exports.string().nullish()
		}),
		external_exports.object({
			type: external_exports.literal("open_page"),
			url: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("find"),
			url: external_exports.string(),
			pattern: external_exports.string()
		})
	]).nullish()
});
var fileSearchCallItem = external_exports.object({
	type: external_exports.literal("file_search_call"),
	id: external_exports.string(),
	queries: external_exports.array(external_exports.string()),
	results: external_exports.array(external_exports.object({
		attributes: external_exports.record(external_exports.string(), external_exports.unknown()),
		file_id: external_exports.string(),
		filename: external_exports.string(),
		score: external_exports.number(),
		text: external_exports.string()
	})).nullish()
});
var codeInterpreterCallItem = external_exports.object({
	type: external_exports.literal("code_interpreter_call"),
	id: external_exports.string(),
	code: external_exports.string().nullable(),
	container_id: external_exports.string(),
	outputs: external_exports.array(external_exports.discriminatedUnion("type", [external_exports.object({
		type: external_exports.literal("logs"),
		logs: external_exports.string()
	}), external_exports.object({
		type: external_exports.literal("image"),
		url: external_exports.string()
	})])).nullable()
});
var localShellCallItem = external_exports.object({
	type: external_exports.literal("local_shell_call"),
	id: external_exports.string(),
	call_id: external_exports.string(),
	action: external_exports.object({
		type: external_exports.literal("exec"),
		command: external_exports.array(external_exports.string()),
		timeout_ms: external_exports.number().optional(),
		user: external_exports.string().optional(),
		working_directory: external_exports.string().optional(),
		env: external_exports.record(external_exports.string(), external_exports.string()).optional()
	})
});
var imageGenerationCallItem = external_exports.object({
	type: external_exports.literal("image_generation_call"),
	id: external_exports.string(),
	result: external_exports.string()
});
var TOP_LOGPROBS_MAX = 20;
var LOGPROBS_SCHEMA = external_exports.array(external_exports.object({
	token: external_exports.string(),
	logprob: external_exports.number(),
	top_logprobs: external_exports.array(external_exports.object({
		token: external_exports.string(),
		logprob: external_exports.number()
	}))
}));
var OpenAIResponsesLanguageModel = class {
	constructor(modelId, config2) {
		this.specificationVersion = "v2";
		this.supportedUrls = {
			"image/*": [/^https?:\/\/.*$/],
			"application/pdf": [/^https?:\/\/.*$/]
		};
		this.modelId = modelId;
		this.config = config2;
	}
	get provider() {
		return this.config.provider;
	}
	async getArgs({ maxOutputTokens, temperature, stopSequences, topP, topK, presencePenalty, frequencyPenalty, seed, prompt, providerOptions, tools, toolChoice, responseFormat }) {
		const warnings = [];
		const modelConfig = getResponsesModelConfig(this.modelId);
		if (topK != null) warnings.push({
			type: "unsupported-setting",
			setting: "topK"
		});
		if (seed != null) warnings.push({
			type: "unsupported-setting",
			setting: "seed"
		});
		if (presencePenalty != null) warnings.push({
			type: "unsupported-setting",
			setting: "presencePenalty"
		});
		if (frequencyPenalty != null) warnings.push({
			type: "unsupported-setting",
			setting: "frequencyPenalty"
		});
		if (stopSequences != null) warnings.push({
			type: "unsupported-setting",
			setting: "stopSequences"
		});
		const openaiOptions = await parseProviderOptions({
			provider: "openai",
			providerOptions,
			schema: openaiResponsesProviderOptionsSchema
		});
		const { input, warnings: inputWarnings } = await convertToOpenAIResponsesInput({
			prompt,
			systemMessageMode: modelConfig.systemMessageMode,
			fileIdPrefixes: this.config.fileIdPrefixes,
			store: openaiOptions?.store ?? true,
			hasLocalShellTool: hasOpenAITool("openai.local_shell")
		});
		warnings.push(...inputWarnings);
		const strictJsonSchema = openaiOptions?.strictJsonSchema ?? false;
		let include = openaiOptions?.include;
		function addInclude(key) {
			include = include != null ? [...include, key] : [key];
		}
		function hasOpenAITool(id) {
			return tools?.find((tool) => tool.type === "provider-defined" && tool.id === id) != null;
		}
		const topLogprobs = typeof openaiOptions?.logprobs === "number" ? openaiOptions?.logprobs : openaiOptions?.logprobs === true ? TOP_LOGPROBS_MAX : void 0;
		if (topLogprobs) addInclude("message.output_text.logprobs");
		const webSearchToolName = tools?.find((tool) => tool.type === "provider-defined" && (tool.id === "openai.web_search" || tool.id === "openai.web_search_preview"))?.name;
		if (webSearchToolName) addInclude("web_search_call.action.sources");
		if (hasOpenAITool("openai.code_interpreter")) addInclude("code_interpreter_call.outputs");
		const baseArgs = {
			model: this.modelId,
			input,
			temperature,
			top_p: topP,
			max_output_tokens: maxOutputTokens,
			...(responseFormat?.type === "json" || openaiOptions?.textVerbosity) && { text: {
				...responseFormat?.type === "json" && { format: responseFormat.schema != null ? {
					type: "json_schema",
					strict: strictJsonSchema,
					name: responseFormat.name ?? "response",
					description: responseFormat.description,
					schema: responseFormat.schema
				} : { type: "json_object" } },
				...openaiOptions?.textVerbosity && { verbosity: openaiOptions.textVerbosity }
			} },
			max_tool_calls: openaiOptions?.maxToolCalls,
			metadata: openaiOptions?.metadata,
			parallel_tool_calls: openaiOptions?.parallelToolCalls,
			previous_response_id: openaiOptions?.previousResponseId,
			store: openaiOptions?.store,
			user: openaiOptions?.user,
			instructions: openaiOptions?.instructions,
			service_tier: openaiOptions?.serviceTier,
			include,
			prompt_cache_key: openaiOptions?.promptCacheKey,
			safety_identifier: openaiOptions?.safetyIdentifier,
			top_logprobs: topLogprobs,
			...modelConfig.isReasoningModel && (openaiOptions?.reasoningEffort != null || openaiOptions?.reasoningSummary != null) && { reasoning: {
				...openaiOptions?.reasoningEffort != null && { effort: openaiOptions.reasoningEffort },
				...openaiOptions?.reasoningSummary != null && { summary: openaiOptions.reasoningSummary }
			} },
			...modelConfig.requiredAutoTruncation && { truncation: "auto" }
		};
		if (modelConfig.isReasoningModel) {
			if (baseArgs.temperature != null) {
				baseArgs.temperature = void 0;
				warnings.push({
					type: "unsupported-setting",
					setting: "temperature",
					details: "temperature is not supported for reasoning models"
				});
			}
			if (baseArgs.top_p != null) {
				baseArgs.top_p = void 0;
				warnings.push({
					type: "unsupported-setting",
					setting: "topP",
					details: "topP is not supported for reasoning models"
				});
			}
		} else {
			if (openaiOptions?.reasoningEffort != null) warnings.push({
				type: "unsupported-setting",
				setting: "reasoningEffort",
				details: "reasoningEffort is not supported for non-reasoning models"
			});
			if (openaiOptions?.reasoningSummary != null) warnings.push({
				type: "unsupported-setting",
				setting: "reasoningSummary",
				details: "reasoningSummary is not supported for non-reasoning models"
			});
		}
		if (openaiOptions?.serviceTier === "flex" && !modelConfig.supportsFlexProcessing) {
			warnings.push({
				type: "unsupported-setting",
				setting: "serviceTier",
				details: "flex processing is only available for o3, o4-mini, and gpt-5 models"
			});
			delete baseArgs.service_tier;
		}
		if (openaiOptions?.serviceTier === "priority" && !modelConfig.supportsPriorityProcessing) {
			warnings.push({
				type: "unsupported-setting",
				setting: "serviceTier",
				details: "priority processing is only available for supported models (gpt-4, gpt-5, gpt-5-mini, o3, o4-mini) and requires Enterprise access. gpt-5-nano is not supported"
			});
			delete baseArgs.service_tier;
		}
		const { tools: openaiTools, toolChoice: openaiToolChoice, toolWarnings } = prepareResponsesTools({
			tools,
			toolChoice,
			strictJsonSchema
		});
		return {
			webSearchToolName,
			args: {
				...baseArgs,
				tools: openaiTools,
				tool_choice: openaiToolChoice
			},
			warnings: [...warnings, ...toolWarnings]
		};
	}
	async doGenerate(options) {
		const { args: body, warnings, webSearchToolName } = await this.getArgs(options);
		const url2 = this.config.url({
			path: "/responses",
			modelId: this.modelId
		});
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: url2,
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: openaiFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(external_exports.object({
				id: external_exports.string(),
				created_at: external_exports.number(),
				error: external_exports.object({
					code: external_exports.string(),
					message: external_exports.string()
				}).nullish(),
				model: external_exports.string(),
				output: external_exports.array(external_exports.discriminatedUnion("type", [
					external_exports.object({
						type: external_exports.literal("message"),
						role: external_exports.literal("assistant"),
						id: external_exports.string(),
						content: external_exports.array(external_exports.object({
							type: external_exports.literal("output_text"),
							text: external_exports.string(),
							logprobs: LOGPROBS_SCHEMA.nullish(),
							annotations: external_exports.array(external_exports.discriminatedUnion("type", [
								external_exports.object({
									type: external_exports.literal("url_citation"),
									start_index: external_exports.number(),
									end_index: external_exports.number(),
									url: external_exports.string(),
									title: external_exports.string()
								}),
								external_exports.object({
									type: external_exports.literal("file_citation"),
									file_id: external_exports.string(),
									filename: external_exports.string().nullish(),
									index: external_exports.number().nullish(),
									start_index: external_exports.number().nullish(),
									end_index: external_exports.number().nullish(),
									quote: external_exports.string().nullish()
								}),
								external_exports.object({ type: external_exports.literal("container_file_citation") })
							]))
						}))
					}),
					webSearchCallItem,
					fileSearchCallItem,
					codeInterpreterCallItem,
					imageGenerationCallItem,
					localShellCallItem,
					external_exports.object({
						type: external_exports.literal("function_call"),
						call_id: external_exports.string(),
						name: external_exports.string(),
						arguments: external_exports.string(),
						id: external_exports.string()
					}),
					external_exports.object({
						type: external_exports.literal("computer_call"),
						id: external_exports.string(),
						status: external_exports.string().optional()
					}),
					external_exports.object({
						type: external_exports.literal("reasoning"),
						id: external_exports.string(),
						encrypted_content: external_exports.string().nullish(),
						summary: external_exports.array(external_exports.object({
							type: external_exports.literal("summary_text"),
							text: external_exports.string()
						}))
					})
				])),
				service_tier: external_exports.string().nullish(),
				incomplete_details: external_exports.object({ reason: external_exports.string() }).nullish(),
				usage: usageSchema
			})),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		if (response.error) throw new APICallError({
			message: response.error.message,
			url: url2,
			requestBodyValues: body,
			statusCode: 400,
			responseHeaders,
			responseBody: rawResponse,
			isRetryable: false
		});
		const content = [];
		const logprobs = [];
		let hasFunctionCall = false;
		for (const part of response.output) switch (part.type) {
			case "reasoning":
				if (part.summary.length === 0) part.summary.push({
					type: "summary_text",
					text: ""
				});
				for (const summary of part.summary) content.push({
					type: "reasoning",
					text: summary.text,
					providerMetadata: { openai: {
						itemId: part.id,
						reasoningEncryptedContent: part.encrypted_content ?? null
					} }
				});
				break;
			case "image_generation_call":
				content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: "image_generation",
					input: "{}",
					providerExecuted: true
				});
				content.push({
					type: "tool-result",
					toolCallId: part.id,
					toolName: "image_generation",
					result: { result: part.result },
					providerExecuted: true
				});
				break;
			case "local_shell_call":
				content.push({
					type: "tool-call",
					toolCallId: part.call_id,
					toolName: "local_shell",
					input: JSON.stringify({ action: part.action }),
					providerMetadata: { openai: { itemId: part.id } }
				});
				break;
			case "message":
				for (const contentPart of part.content) {
					if (options.providerOptions?.openai?.logprobs && contentPart.logprobs) logprobs.push(contentPart.logprobs);
					content.push({
						type: "text",
						text: contentPart.text,
						providerMetadata: { openai: { itemId: part.id } }
					});
					for (const annotation of contentPart.annotations) if (annotation.type === "url_citation") content.push({
						type: "source",
						sourceType: "url",
						id: this.config.generateId?.() ?? generateId(),
						url: annotation.url,
						title: annotation.title
					});
					else if (annotation.type === "file_citation") content.push({
						type: "source",
						sourceType: "document",
						id: this.config.generateId?.() ?? generateId(),
						mediaType: "text/plain",
						title: annotation.quote ?? annotation.filename ?? "Document",
						filename: annotation.filename ?? annotation.file_id
					});
				}
				break;
			case "function_call":
				hasFunctionCall = true;
				content.push({
					type: "tool-call",
					toolCallId: part.call_id,
					toolName: part.name,
					input: part.arguments,
					providerMetadata: { openai: { itemId: part.id } }
				});
				break;
			case "web_search_call":
				content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: webSearchToolName ?? "web_search",
					input: JSON.stringify({ action: part.action }),
					providerExecuted: true
				});
				content.push({
					type: "tool-result",
					toolCallId: part.id,
					toolName: webSearchToolName ?? "web_search",
					result: { status: part.status },
					providerExecuted: true
				});
				break;
			case "computer_call":
				content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: "computer_use",
					input: "",
					providerExecuted: true
				});
				content.push({
					type: "tool-result",
					toolCallId: part.id,
					toolName: "computer_use",
					result: {
						type: "computer_use_tool_result",
						status: part.status || "completed"
					},
					providerExecuted: true
				});
				break;
			case "file_search_call":
				content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: "file_search",
					input: "{}",
					providerExecuted: true
				});
				content.push({
					type: "tool-result",
					toolCallId: part.id,
					toolName: "file_search",
					result: {
						queries: part.queries,
						results: part.results?.map((result) => ({
							attributes: result.attributes,
							fileId: result.file_id,
							filename: result.filename,
							score: result.score,
							text: result.text
						})) ?? null
					},
					providerExecuted: true
				});
				break;
			case "code_interpreter_call":
				content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: "code_interpreter",
					input: JSON.stringify({
						code: part.code,
						containerId: part.container_id
					}),
					providerExecuted: true
				});
				content.push({
					type: "tool-result",
					toolCallId: part.id,
					toolName: "code_interpreter",
					result: { outputs: part.outputs },
					providerExecuted: true
				});
				break;
		}
		const providerMetadata = { openai: { responseId: response.id } };
		if (logprobs.length > 0) providerMetadata.openai.logprobs = logprobs;
		if (typeof response.service_tier === "string") providerMetadata.openai.serviceTier = response.service_tier;
		return {
			content,
			finishReason: mapOpenAIResponseFinishReason({
				finishReason: response.incomplete_details?.reason,
				hasFunctionCall
			}),
			usage: {
				inputTokens: response.usage.input_tokens,
				outputTokens: response.usage.output_tokens,
				totalTokens: response.usage.input_tokens + response.usage.output_tokens,
				reasoningTokens: response.usage.output_tokens_details?.reasoning_tokens ?? void 0,
				cachedInputTokens: response.usage.input_tokens_details?.cached_tokens ?? void 0
			},
			request: { body },
			response: {
				id: response.id,
				timestamp: /* @__PURE__ */ new Date(response.created_at * 1e3),
				modelId: response.model,
				headers: responseHeaders,
				body: rawResponse
			},
			providerMetadata,
			warnings
		};
	}
	async doStream(options) {
		const { args: body, warnings, webSearchToolName } = await this.getArgs(options);
		const { responseHeaders, value: response } = await postJsonToApi({
			url: this.config.url({
				path: "/responses",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), options.headers),
			body: {
				...body,
				stream: true
			},
			failedResponseHandler: openaiFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(openaiResponsesChunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const self = this;
		let finishReason = "unknown";
		const usage = {
			inputTokens: void 0,
			outputTokens: void 0,
			totalTokens: void 0
		};
		const logprobs = [];
		let responseId = null;
		const ongoingToolCalls = {};
		let hasFunctionCall = false;
		const activeReasoning = {};
		let currentTextId = null;
		let serviceTier;
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					if (options.includeRawChunks) controller.enqueue({
						type: "raw",
						rawValue: chunk.rawValue
					});
					if (!chunk.success) {
						finishReason = "error";
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					if (isResponseOutputItemAddedChunk(value)) {
						if (value.item.type === "function_call") {
							ongoingToolCalls[value.output_index] = {
								toolName: value.item.name,
								toolCallId: value.item.call_id
							};
							controller.enqueue({
								type: "tool-input-start",
								id: value.item.call_id,
								toolName: value.item.name
							});
						} else if (value.item.type === "web_search_call") {
							ongoingToolCalls[value.output_index] = {
								toolName: webSearchToolName ?? "web_search",
								toolCallId: value.item.id
							};
							controller.enqueue({
								type: "tool-input-start",
								id: value.item.id,
								toolName: webSearchToolName ?? "web_search"
							});
						} else if (value.item.type === "computer_call") {
							ongoingToolCalls[value.output_index] = {
								toolName: "computer_use",
								toolCallId: value.item.id
							};
							controller.enqueue({
								type: "tool-input-start",
								id: value.item.id,
								toolName: "computer_use"
							});
						} else if (value.item.type === "code_interpreter_call") {
							ongoingToolCalls[value.output_index] = {
								toolName: "code_interpreter",
								toolCallId: value.item.id,
								codeInterpreter: { containerId: value.item.container_id }
							};
							controller.enqueue({
								type: "tool-input-start",
								id: value.item.id,
								toolName: "code_interpreter"
							});
							controller.enqueue({
								type: "tool-input-delta",
								id: value.item.id,
								delta: `{"containerId":"${value.item.container_id}","code":"`
							});
						} else if (value.item.type === "file_search_call") controller.enqueue({
							type: "tool-call",
							toolCallId: value.item.id,
							toolName: "file_search",
							input: "{}",
							providerExecuted: true
						});
						else if (value.item.type === "image_generation_call") controller.enqueue({
							type: "tool-call",
							toolCallId: value.item.id,
							toolName: "image_generation",
							input: "{}",
							providerExecuted: true
						});
						else if (value.item.type === "message") {
							currentTextId = value.item.id;
							controller.enqueue({
								type: "text-start",
								id: value.item.id,
								providerMetadata: { openai: { itemId: value.item.id } }
							});
						} else if (isResponseOutputItemAddedReasoningChunk(value)) {
							activeReasoning[value.item.id] = {
								encryptedContent: value.item.encrypted_content,
								summaryParts: [0]
							};
							controller.enqueue({
								type: "reasoning-start",
								id: `${value.item.id}:0`,
								providerMetadata: { openai: {
									itemId: value.item.id,
									reasoningEncryptedContent: value.item.encrypted_content ?? null
								} }
							});
						}
					} else if (isResponseOutputItemDoneChunk(value)) {
						if (value.item.type === "function_call") {
							ongoingToolCalls[value.output_index] = void 0;
							hasFunctionCall = true;
							controller.enqueue({
								type: "tool-input-end",
								id: value.item.call_id
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId: value.item.call_id,
								toolName: value.item.name,
								input: value.item.arguments,
								providerMetadata: { openai: { itemId: value.item.id } }
							});
						} else if (value.item.type === "web_search_call") {
							ongoingToolCalls[value.output_index] = void 0;
							controller.enqueue({
								type: "tool-input-end",
								id: value.item.id
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId: value.item.id,
								toolName: "web_search",
								input: JSON.stringify({ action: value.item.action }),
								providerExecuted: true
							});
							controller.enqueue({
								type: "tool-result",
								toolCallId: value.item.id,
								toolName: "web_search",
								result: { status: value.item.status },
								providerExecuted: true
							});
						} else if (value.item.type === "computer_call") {
							ongoingToolCalls[value.output_index] = void 0;
							controller.enqueue({
								type: "tool-input-end",
								id: value.item.id
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId: value.item.id,
								toolName: "computer_use",
								input: "",
								providerExecuted: true
							});
							controller.enqueue({
								type: "tool-result",
								toolCallId: value.item.id,
								toolName: "computer_use",
								result: {
									type: "computer_use_tool_result",
									status: value.item.status || "completed"
								},
								providerExecuted: true
							});
						} else if (value.item.type === "file_search_call") {
							ongoingToolCalls[value.output_index] = void 0;
							controller.enqueue({
								type: "tool-result",
								toolCallId: value.item.id,
								toolName: "file_search",
								result: {
									queries: value.item.queries,
									results: value.item.results?.map((result) => ({
										attributes: result.attributes,
										fileId: result.file_id,
										filename: result.filename,
										score: result.score,
										text: result.text
									})) ?? null
								},
								providerExecuted: true
							});
						} else if (value.item.type === "code_interpreter_call") {
							ongoingToolCalls[value.output_index] = void 0;
							controller.enqueue({
								type: "tool-result",
								toolCallId: value.item.id,
								toolName: "code_interpreter",
								result: { outputs: value.item.outputs },
								providerExecuted: true
							});
						} else if (value.item.type === "image_generation_call") controller.enqueue({
							type: "tool-result",
							toolCallId: value.item.id,
							toolName: "image_generation",
							result: { result: value.item.result },
							providerExecuted: true
						});
						else if (value.item.type === "local_shell_call") {
							ongoingToolCalls[value.output_index] = void 0;
							controller.enqueue({
								type: "tool-call",
								toolCallId: value.item.call_id,
								toolName: "local_shell",
								input: JSON.stringify({ action: {
									type: "exec",
									command: value.item.action.command,
									timeoutMs: value.item.action.timeout_ms,
									user: value.item.action.user,
									workingDirectory: value.item.action.working_directory,
									env: value.item.action.env
								} }),
								providerMetadata: { openai: { itemId: value.item.id } }
							});
						} else if (value.item.type === "message") {
							if (currentTextId) {
								controller.enqueue({
									type: "text-end",
									id: currentTextId
								});
								currentTextId = null;
							}
						} else if (isResponseOutputItemDoneReasoningChunk(value)) {
							const activeReasoningPart = activeReasoning[value.item.id];
							if (activeReasoningPart) for (const summaryIndex of activeReasoningPart.summaryParts) controller.enqueue({
								type: "reasoning-end",
								id: `${value.item.id}:${summaryIndex}`,
								providerMetadata: { openai: {
									itemId: value.item.id,
									reasoningEncryptedContent: value.item.encrypted_content ?? null
								} }
							});
							delete activeReasoning[value.item.id];
						}
					} else if (isResponseFunctionCallArgumentsDeltaChunk(value)) {
						const toolCall = ongoingToolCalls[value.output_index];
						if (toolCall != null) controller.enqueue({
							type: "tool-input-delta",
							id: toolCall.toolCallId,
							delta: value.delta
						});
					} else if (isResponseImageGenerationCallPartialImageChunk(value)) controller.enqueue({
						type: "tool-result",
						toolCallId: value.item_id,
						toolName: "image_generation",
						result: { result: value.partial_image_b64 },
						providerExecuted: true
					});
					else if (isResponseCodeInterpreterCallCodeDeltaChunk(value)) {
						const toolCall = ongoingToolCalls[value.output_index];
						if (toolCall != null) controller.enqueue({
							type: "tool-input-delta",
							id: toolCall.toolCallId,
							delta: JSON.stringify(value.delta).slice(1, -1)
						});
					} else if (isResponseCodeInterpreterCallCodeDoneChunk(value)) {
						const toolCall = ongoingToolCalls[value.output_index];
						if (toolCall != null) {
							controller.enqueue({
								type: "tool-input-delta",
								id: toolCall.toolCallId,
								delta: "\"}"
							});
							controller.enqueue({
								type: "tool-input-end",
								id: toolCall.toolCallId
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId: toolCall.toolCallId,
								toolName: "code_interpreter",
								input: JSON.stringify({
									code: value.code,
									containerId: toolCall.codeInterpreter.containerId
								}),
								providerExecuted: true
							});
						}
					} else if (isResponseCreatedChunk(value)) {
						responseId = value.response.id;
						controller.enqueue({
							type: "response-metadata",
							id: value.response.id,
							timestamp: /* @__PURE__ */ new Date(value.response.created_at * 1e3),
							modelId: value.response.model
						});
					} else if (isTextDeltaChunk(value)) {
						if (!currentTextId) {
							currentTextId = value.item_id;
							controller.enqueue({
								type: "text-start",
								id: currentTextId,
								providerMetadata: { openai: { itemId: value.item_id } }
							});
						}
						controller.enqueue({
							type: "text-delta",
							id: currentTextId,
							delta: value.delta
						});
						if (options.providerOptions?.openai?.logprobs && value.logprobs) logprobs.push(value.logprobs);
					} else if (isResponseReasoningSummaryPartAddedChunk(value)) {
						if (value.summary_index > 0) {
							activeReasoning[value.item_id]?.summaryParts.push(value.summary_index);
							controller.enqueue({
								type: "reasoning-start",
								id: `${value.item_id}:${value.summary_index}`,
								providerMetadata: { openai: {
									itemId: value.item_id,
									reasoningEncryptedContent: activeReasoning[value.item_id]?.encryptedContent ?? null
								} }
							});
						}
					} else if (isResponseReasoningSummaryTextDeltaChunk(value)) controller.enqueue({
						type: "reasoning-delta",
						id: `${value.item_id}:${value.summary_index}`,
						delta: value.delta,
						providerMetadata: { openai: { itemId: value.item_id } }
					});
					else if (isResponseFinishedChunk(value)) {
						finishReason = mapOpenAIResponseFinishReason({
							finishReason: value.response.incomplete_details?.reason,
							hasFunctionCall
						});
						usage.inputTokens = value.response.usage.input_tokens;
						usage.outputTokens = value.response.usage.output_tokens;
						usage.totalTokens = value.response.usage.input_tokens + value.response.usage.output_tokens;
						usage.reasoningTokens = value.response.usage.output_tokens_details?.reasoning_tokens ?? void 0;
						usage.cachedInputTokens = value.response.usage.input_tokens_details?.cached_tokens ?? void 0;
						if (typeof value.response.service_tier === "string") serviceTier = value.response.service_tier;
					} else if (isResponseAnnotationAddedChunk(value)) {
						if (value.annotation.type === "url_citation") controller.enqueue({
							type: "source",
							sourceType: "url",
							id: self.config.generateId?.() ?? generateId(),
							url: value.annotation.url,
							title: value.annotation.title
						});
						else if (value.annotation.type === "file_citation") controller.enqueue({
							type: "source",
							sourceType: "document",
							id: self.config.generateId?.() ?? generateId(),
							mediaType: "text/plain",
							title: value.annotation.quote ?? value.annotation.filename ?? "Document",
							filename: value.annotation.filename ?? value.annotation.file_id
						});
					} else if (isErrorChunk(value)) controller.enqueue({
						type: "error",
						error: value
					});
				},
				flush(controller) {
					if (currentTextId) {
						controller.enqueue({
							type: "text-end",
							id: currentTextId
						});
						currentTextId = null;
					}
					const providerMetadata = { openai: { responseId } };
					if (logprobs.length > 0) providerMetadata.openai.logprobs = logprobs;
					if (serviceTier !== void 0) providerMetadata.openai.serviceTier = serviceTier;
					controller.enqueue({
						type: "finish",
						finishReason,
						usage,
						providerMetadata
					});
				}
			})),
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
var usageSchema = external_exports.object({
	input_tokens: external_exports.number(),
	input_tokens_details: external_exports.object({ cached_tokens: external_exports.number().nullish() }).nullish(),
	output_tokens: external_exports.number(),
	output_tokens_details: external_exports.object({ reasoning_tokens: external_exports.number().nullish() }).nullish()
});
var textDeltaChunkSchema = external_exports.object({
	type: external_exports.literal("response.output_text.delta"),
	item_id: external_exports.string(),
	delta: external_exports.string(),
	logprobs: LOGPROBS_SCHEMA.nullish()
});
var errorChunkSchema = external_exports.object({
	type: external_exports.literal("error"),
	code: external_exports.string(),
	message: external_exports.string(),
	param: external_exports.string().nullish(),
	sequence_number: external_exports.number()
});
var responseFinishedChunkSchema = external_exports.object({
	type: external_exports.enum(["response.completed", "response.incomplete"]),
	response: external_exports.object({
		incomplete_details: external_exports.object({ reason: external_exports.string() }).nullish(),
		usage: usageSchema,
		service_tier: external_exports.string().nullish()
	})
});
var responseCreatedChunkSchema = external_exports.object({
	type: external_exports.literal("response.created"),
	response: external_exports.object({
		id: external_exports.string(),
		created_at: external_exports.number(),
		model: external_exports.string(),
		service_tier: external_exports.string().nullish()
	})
});
var responseOutputItemAddedSchema = external_exports.object({
	type: external_exports.literal("response.output_item.added"),
	output_index: external_exports.number(),
	item: external_exports.discriminatedUnion("type", [
		external_exports.object({
			type: external_exports.literal("message"),
			id: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("reasoning"),
			id: external_exports.string(),
			encrypted_content: external_exports.string().nullish()
		}),
		external_exports.object({
			type: external_exports.literal("function_call"),
			id: external_exports.string(),
			call_id: external_exports.string(),
			name: external_exports.string(),
			arguments: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("web_search_call"),
			id: external_exports.string(),
			status: external_exports.string(),
			action: external_exports.object({
				type: external_exports.literal("search"),
				query: external_exports.string().optional()
			}).nullish()
		}),
		external_exports.object({
			type: external_exports.literal("computer_call"),
			id: external_exports.string(),
			status: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("file_search_call"),
			id: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("image_generation_call"),
			id: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("code_interpreter_call"),
			id: external_exports.string(),
			container_id: external_exports.string(),
			code: external_exports.string().nullable(),
			outputs: external_exports.array(external_exports.discriminatedUnion("type", [external_exports.object({
				type: external_exports.literal("logs"),
				logs: external_exports.string()
			}), external_exports.object({
				type: external_exports.literal("image"),
				url: external_exports.string()
			})])).nullable(),
			status: external_exports.string()
		})
	])
});
var responseOutputItemDoneSchema = external_exports.object({
	type: external_exports.literal("response.output_item.done"),
	output_index: external_exports.number(),
	item: external_exports.discriminatedUnion("type", [
		external_exports.object({
			type: external_exports.literal("message"),
			id: external_exports.string()
		}),
		external_exports.object({
			type: external_exports.literal("reasoning"),
			id: external_exports.string(),
			encrypted_content: external_exports.string().nullish()
		}),
		external_exports.object({
			type: external_exports.literal("function_call"),
			id: external_exports.string(),
			call_id: external_exports.string(),
			name: external_exports.string(),
			arguments: external_exports.string(),
			status: external_exports.literal("completed")
		}),
		codeInterpreterCallItem,
		imageGenerationCallItem,
		webSearchCallItem,
		fileSearchCallItem,
		localShellCallItem,
		external_exports.object({
			type: external_exports.literal("computer_call"),
			id: external_exports.string(),
			status: external_exports.literal("completed")
		})
	])
});
var responseFunctionCallArgumentsDeltaSchema = external_exports.object({
	type: external_exports.literal("response.function_call_arguments.delta"),
	item_id: external_exports.string(),
	output_index: external_exports.number(),
	delta: external_exports.string()
});
var responseImageGenerationCallPartialImageSchema = external_exports.object({
	type: external_exports.literal("response.image_generation_call.partial_image"),
	item_id: external_exports.string(),
	output_index: external_exports.number(),
	partial_image_b64: external_exports.string()
});
var responseCodeInterpreterCallCodeDeltaSchema = external_exports.object({
	type: external_exports.literal("response.code_interpreter_call_code.delta"),
	item_id: external_exports.string(),
	output_index: external_exports.number(),
	delta: external_exports.string()
});
var responseCodeInterpreterCallCodeDoneSchema = external_exports.object({
	type: external_exports.literal("response.code_interpreter_call_code.done"),
	item_id: external_exports.string(),
	output_index: external_exports.number(),
	code: external_exports.string()
});
var responseAnnotationAddedSchema = external_exports.object({
	type: external_exports.literal("response.output_text.annotation.added"),
	annotation: external_exports.discriminatedUnion("type", [external_exports.object({
		type: external_exports.literal("url_citation"),
		url: external_exports.string(),
		title: external_exports.string()
	}), external_exports.object({
		type: external_exports.literal("file_citation"),
		file_id: external_exports.string(),
		filename: external_exports.string().nullish(),
		index: external_exports.number().nullish(),
		start_index: external_exports.number().nullish(),
		end_index: external_exports.number().nullish(),
		quote: external_exports.string().nullish()
	})])
});
var responseReasoningSummaryPartAddedSchema = external_exports.object({
	type: external_exports.literal("response.reasoning_summary_part.added"),
	item_id: external_exports.string(),
	summary_index: external_exports.number()
});
var responseReasoningSummaryTextDeltaSchema = external_exports.object({
	type: external_exports.literal("response.reasoning_summary_text.delta"),
	item_id: external_exports.string(),
	summary_index: external_exports.number(),
	delta: external_exports.string()
});
var openaiResponsesChunkSchema = external_exports.union([
	textDeltaChunkSchema,
	responseFinishedChunkSchema,
	responseCreatedChunkSchema,
	responseOutputItemAddedSchema,
	responseOutputItemDoneSchema,
	responseFunctionCallArgumentsDeltaSchema,
	responseImageGenerationCallPartialImageSchema,
	responseCodeInterpreterCallCodeDeltaSchema,
	responseCodeInterpreterCallCodeDoneSchema,
	responseAnnotationAddedSchema,
	responseReasoningSummaryPartAddedSchema,
	responseReasoningSummaryTextDeltaSchema,
	errorChunkSchema,
	external_exports.object({ type: external_exports.string() }).loose()
]);
function isTextDeltaChunk(chunk) {
	return chunk.type === "response.output_text.delta";
}
function isResponseOutputItemDoneChunk(chunk) {
	return chunk.type === "response.output_item.done";
}
function isResponseOutputItemDoneReasoningChunk(chunk) {
	return isResponseOutputItemDoneChunk(chunk) && chunk.item.type === "reasoning";
}
function isResponseFinishedChunk(chunk) {
	return chunk.type === "response.completed" || chunk.type === "response.incomplete";
}
function isResponseCreatedChunk(chunk) {
	return chunk.type === "response.created";
}
function isResponseFunctionCallArgumentsDeltaChunk(chunk) {
	return chunk.type === "response.function_call_arguments.delta";
}
function isResponseImageGenerationCallPartialImageChunk(chunk) {
	return chunk.type === "response.image_generation_call.partial_image";
}
function isResponseCodeInterpreterCallCodeDeltaChunk(chunk) {
	return chunk.type === "response.code_interpreter_call_code.delta";
}
function isResponseCodeInterpreterCallCodeDoneChunk(chunk) {
	return chunk.type === "response.code_interpreter_call_code.done";
}
function isResponseOutputItemAddedChunk(chunk) {
	return chunk.type === "response.output_item.added";
}
function isResponseOutputItemAddedReasoningChunk(chunk) {
	return isResponseOutputItemAddedChunk(chunk) && chunk.item.type === "reasoning";
}
function isResponseAnnotationAddedChunk(chunk) {
	return chunk.type === "response.output_text.annotation.added";
}
function isResponseReasoningSummaryPartAddedChunk(chunk) {
	return chunk.type === "response.reasoning_summary_part.added";
}
function isResponseReasoningSummaryTextDeltaChunk(chunk) {
	return chunk.type === "response.reasoning_summary_text.delta";
}
function isErrorChunk(chunk) {
	return chunk.type === "error";
}
function getResponsesModelConfig(modelId) {
	const supportsFlexProcessing = modelId.startsWith("o3") || modelId.startsWith("o4-mini") || modelId.startsWith("gpt-5") && !modelId.startsWith("gpt-5-chat");
	const supportsPriorityProcessing = modelId.startsWith("gpt-4") || modelId.startsWith("gpt-5-mini") || modelId.startsWith("gpt-5") && !modelId.startsWith("gpt-5-nano") && !modelId.startsWith("gpt-5-chat") || modelId.startsWith("o3") || modelId.startsWith("o4-mini");
	const defaults = {
		requiredAutoTruncation: false,
		systemMessageMode: "system",
		supportsFlexProcessing,
		supportsPriorityProcessing
	};
	if (modelId.startsWith("gpt-5-chat")) return {
		...defaults,
		isReasoningModel: false
	};
	if (modelId.startsWith("o") || modelId.startsWith("gpt-5") || modelId.startsWith("codex-") || modelId.startsWith("computer-use")) {
		if (modelId.startsWith("o1-mini") || modelId.startsWith("o1-preview")) return {
			...defaults,
			isReasoningModel: true,
			systemMessageMode: "remove"
		};
		return {
			...defaults,
			isReasoningModel: true,
			systemMessageMode: "developer"
		};
	}
	return {
		...defaults,
		isReasoningModel: false
	};
}
var openaiResponsesProviderOptionsSchema = external_exports.object({
	include: external_exports.array(external_exports.enum([
		"reasoning.encrypted_content",
		"file_search_call.results",
		"message.output_text.logprobs"
	])).nullish(),
	instructions: external_exports.string().nullish(),
	logprobs: external_exports.union([external_exports.boolean(), external_exports.number().min(1).max(TOP_LOGPROBS_MAX)]).optional(),
	maxToolCalls: external_exports.number().nullish(),
	metadata: external_exports.any().nullish(),
	parallelToolCalls: external_exports.boolean().nullish(),
	previousResponseId: external_exports.string().nullish(),
	promptCacheKey: external_exports.string().nullish(),
	reasoningEffort: external_exports.string().nullish(),
	reasoningSummary: external_exports.string().nullish(),
	safetyIdentifier: external_exports.string().nullish(),
	serviceTier: external_exports.enum([
		"auto",
		"flex",
		"priority"
	]).nullish(),
	store: external_exports.boolean().nullish(),
	strictJsonSchema: external_exports.boolean().nullish(),
	textVerbosity: external_exports.enum([
		"low",
		"medium",
		"high"
	]).nullish(),
	user: external_exports.string().nullish()
});
var VERSION = "0.1.0";
function createGitHubCopilotOpenAICompatible(options = {}) {
	const baseURL = withoutTrailingSlash(options.baseURL ?? "https://api.githubcopilot.com");
	if (!baseURL) throw new Error("baseURL is required");
	const headers = {
		...options.apiKey && { Authorization: `Bearer ${options.apiKey}` },
		...options.headers
	};
	const getHeaders = () => withUserAgentSuffix(headers, `opeoginni/github-copilot-openai-compatible/${VERSION}`);
	const createChatModel = (modelId) => {
		if (modelId.includes("gpt-5-codex") || modelId.includes("gpt-5.1-codex") || modelId.includes("gpt-5.1-codex-mini")) return new OpenAIResponsesLanguageModel(modelId, {
			provider: `${options.name ?? "githubcopilot"}.responses`,
			headers: getHeaders,
			url: ({ path }) => `${baseURL}${path}`,
			fetch: options.fetch
		});
		return new OpenAICompatibleChatLanguageModel(modelId, {
			provider: `${options.name ?? "githubcopilot"}.chat`,
			headers: getHeaders,
			url: ({ path }) => `${baseURL}${path}`,
			fetch: options.fetch
		});
	};
	const createLanguageModel = (modelId) => createChatModel(modelId);
	const provider = function(modelId) {
		return createChatModel(modelId);
	};
	provider.languageModel = createLanguageModel;
	provider.chatModel = createChatModel;
	return provider;
}
var githubCopilot = createGitHubCopilotOpenAICompatible();
var VERSION2 = "0.1.20";
export { VERSION2 as VERSION, createGitHubCopilotOpenAICompatible, githubCopilot };
