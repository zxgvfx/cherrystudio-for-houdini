import { f as _enum, j as any, k as array, l as boolean, q as literal, t as number, u as object, v as record, x as string, z as union } from "./schemas-Bbbixa2f.js";
import { B as loadApiKey, G as parseProviderOptions, I as postJsonToApi, O as withUserAgentSuffix, P as withoutTrailingSlash, V as InvalidResponseDataError, X as NoSuchModelError, _ as UnsupportedFunctionalityError, c as combineHeaders, e as convertToBase64, h as createEventSourceResponseHandler, j as createJsonErrorResponseHandler, k as createJsonResponseHandler, q as generateId, w as isParsableJson } from "./dist-mVY8hbYS.js";
function getOpenAIMetadata(message) {
	var _a, _b;
	return (_b = (_a = message == null ? void 0 : message.providerOptions) == null ? void 0 : _a.openaiCompatible) != null ? _b : {};
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
							} else throw new UnsupportedFunctionalityError({ functionality: `file part media type ${part.mediaType}` });
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
var openaiCompatibleProviderOptions = object({
	user: string().optional(),
	reasoningEffort: string().optional(),
	textVerbosity: string().optional()
});
var openaiCompatibleErrorDataSchema = object({ error: object({
	message: string(),
	type: string().nullish(),
	param: any().nullish(),
	code: union([string(), number()]).nullish()
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
			throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${_exhaustiveCheck}` });
		}
	}
}
var OpenAICompatibleChatLanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v2";
		var _a, _b;
		this.modelId = modelId;
		this.config = config;
		const errorStructure = (_a = config.errorStructure) != null ? _a : defaultOpenAICompatibleErrorStructure;
		this.chunkSchema = createOpenAICompatibleChatChunkSchema(errorStructure.errorSchema);
		this.failedResponseHandler = createJsonErrorResponseHandler(errorStructure);
		this.supportsStructuredOutputs = (_b = config.supportsStructuredOutputs) != null ? _b : false;
	}
	get provider() {
		return this.config.provider;
	}
	get providerOptionsName() {
		return this.config.provider.split(".")[0].trim();
	}
	get supportedUrls() {
		var _a, _b, _c;
		return (_c = (_b = (_a = this.config).supportedUrls) == null ? void 0 : _b.call(_a)) != null ? _c : {};
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, providerOptions, stopSequences, responseFormat, seed, toolChoice, tools }) {
		var _a, _b, _c, _d;
		const warnings = [];
		const compatibleOptions = Object.assign((_a = await parseProviderOptions({
			provider: "openai-compatible",
			providerOptions,
			schema: openaiCompatibleProviderOptions
		})) != null ? _a : {}, (_b = await parseProviderOptions({
			provider: this.providerOptionsName,
			providerOptions,
			schema: openaiCompatibleProviderOptions
		})) != null ? _b : {});
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
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
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
		const reasoning = (_a = choice.message.reasoning_content) != null ? _a : choice.message.reasoning;
		if (reasoning != null && reasoning.length > 0) content.push({
			type: "reasoning",
			text: reasoning
		});
		if (choice.message.tool_calls != null) for (const toolCall of choice.message.tool_calls) content.push({
			type: "tool-call",
			toolCallId: (_b = toolCall.id) != null ? _b : generateId(),
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
		var _a;
		const { args, warnings } = await this.getArgs({ ...options });
		const body = {
			...args,
			stream: true,
			stream_options: this.config.includeUsage ? { include_usage: true } : void 0
		};
		const metadataExtractor = (_a = this.config.metadataExtractor) == null ? void 0 : _a.createStreamExtractor();
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
					var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
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
					const reasoningContent = (_a2 = delta.reasoning_content) != null ? _a2 : delta.reasoning;
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
							if (((_b = toolCallDelta.function) == null ? void 0 : _b.name) == null) throw new InvalidResponseDataError({
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
					var _a2, _b, _c, _d, _e, _f;
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
							toolCallId: (_a2 = toolCall.id) != null ? _a2 : generateId(),
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
							inputTokens: (_b = usage.promptTokens) != null ? _b : void 0,
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
var openaiCompatibleTokenUsageSchema = object({
	prompt_tokens: number().nullish(),
	completion_tokens: number().nullish(),
	total_tokens: number().nullish(),
	prompt_tokens_details: object({ cached_tokens: number().nullish() }).nullish(),
	completion_tokens_details: object({
		reasoning_tokens: number().nullish(),
		accepted_prediction_tokens: number().nullish(),
		rejected_prediction_tokens: number().nullish()
	}).nullish()
}).nullish();
var OpenAICompatibleChatResponseSchema = object({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		message: object({
			role: literal("assistant").nullish(),
			content: string().nullish(),
			reasoning_content: string().nullish(),
			reasoning: string().nullish(),
			tool_calls: array(object({
				id: string().nullish(),
				function: object({
					name: string(),
					arguments: string()
				})
			})).nullish()
		}),
		finish_reason: string().nullish()
	})),
	usage: openaiCompatibleTokenUsageSchema
});
var createOpenAICompatibleChatChunkSchema = (errorSchema) => union([object({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		delta: object({
			role: _enum(["assistant"]).nullish(),
			content: string().nullish(),
			reasoning_content: string().nullish(),
			reasoning: string().nullish(),
			tool_calls: array(object({
				index: number(),
				id: string().nullish(),
				function: object({
					name: string().nullish(),
					arguments: string().nullish()
				})
			})).nullish()
		}).nullish(),
		finish_reason: string().nullish()
	})),
	usage: openaiCompatibleTokenUsageSchema
}), errorSchema]);
object({
	echo: boolean().optional(),
	logitBias: record(string(), number()).optional(),
	suffix: string().optional(),
	user: string().optional()
});
var usageSchema = object({
	prompt_tokens: number(),
	completion_tokens: number(),
	total_tokens: number()
});
object({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		text: string(),
		finish_reason: string()
	})),
	usage: usageSchema.nullish()
});
object({
	dimensions: number().optional(),
	user: string().optional()
});
object({
	data: array(object({ embedding: array(number()) })),
	usage: object({ prompt_tokens: number() }).nullish(),
	providerMetadata: record(string(), record(string(), any())).optional()
});
object({ data: array(object({ b64_json: string() })) });
var VERSION = "1.0.31";
var cerebrasErrorSchema = object({
	message: string(),
	type: string(),
	param: string(),
	code: string()
});
var cerebrasErrorStructure = {
	errorSchema: cerebrasErrorSchema,
	errorToMessage: (data) => data.message
};
function createCerebras(options = {}) {
	var _a;
	const baseURL = withoutTrailingSlash((_a = options.baseURL) != null ? _a : "https://api.cerebras.ai/v1");
	const getHeaders = () => withUserAgentSuffix({
		Authorization: `Bearer ${loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "CEREBRAS_API_KEY",
			description: "Cerebras API key"
		})}`,
		...options.headers
	}, `ai-sdk/cerebras/${VERSION}`);
	const createLanguageModel = (modelId) => {
		return new OpenAICompatibleChatLanguageModel(modelId, {
			provider: `cerebras.chat`,
			url: ({ path }) => `${baseURL}${path}`,
			headers: getHeaders,
			fetch: options.fetch,
			errorStructure: cerebrasErrorStructure,
			supportsStructuredOutputs: true
		});
	};
	const provider = (modelId) => createLanguageModel(modelId);
	provider.languageModel = createLanguageModel;
	provider.chat = createLanguageModel;
	provider.textEmbeddingModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "textEmbeddingModel"
		});
	};
	provider.imageModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "imageModel"
		});
	};
	return provider;
}
var cerebras = createCerebras();
export { VERSION, cerebras, createCerebras };
