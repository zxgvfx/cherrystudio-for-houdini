import { f as _enum, k as array, l as boolean, n as discriminatedUnion, q as literal, t as number, u as object, x as string, z as union } from "./schemas-Bbbixa2f.js";
import { m as NoSuchModelError, n as TooManyEmbeddingValuesForCallError, p as UnsupportedFunctionalityError } from "./types-Db4HyS8d.js";
import { B as loadApiKey, F as parseProviderOptions, G as postJsonToApi, M as withUserAgentSuffix, N as withoutTrailingSlash, c as combineHeaders, e as convertToBase64, g as createEventSourceResponseHandler, i as createJsonErrorResponseHandler, j as createJsonResponseHandler, q as generateId, u as injectJsonInstructionIntoMessages } from "./dist-K3A05YNJ.js";
function convertToMistralChatMessages(prompt) {
	const messages = [];
	for (let i = 0; i < prompt.length; i++) {
		const { role, content } = prompt[i];
		const isLastMessage = i === prompt.length - 1;
		switch (role) {
			case "system":
				messages.push({
					role: "system",
					content
				});
				break;
			case "user":
				messages.push({
					role: "user",
					content: content.map((part) => {
						switch (part.type) {
							case "text": return {
								type: "text",
								text: part.text
							};
							case "file": if (part.mediaType.startsWith("image/")) {
								const mediaType = part.mediaType === "image/*" ? "image/jpeg" : part.mediaType;
								return {
									type: "image_url",
									image_url: part.data instanceof URL ? part.data.toString() : `data:${mediaType};base64,${convertToBase64(part.data)}`
								};
							} else if (part.mediaType === "application/pdf") return {
								type: "document_url",
								document_url: part.data.toString()
							};
							else throw new UnsupportedFunctionalityError({ functionality: "Only images and PDF file parts are supported" });
						}
					})
				});
				break;
			case "assistant": {
				let text = "";
				const toolCalls = [];
				for (const part of content) switch (part.type) {
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
							}
						});
						break;
					case "reasoning":
						text += part.text;
						break;
					default: throw new Error(`Unsupported content type in assistant message: ${part.type}`);
				}
				messages.push({
					role: "assistant",
					content: text,
					prefix: isLastMessage ? true : void 0,
					tool_calls: toolCalls.length > 0 ? toolCalls : void 0
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
					messages.push({
						role: "tool",
						name: toolResponse.toolName,
						tool_call_id: toolResponse.toolCallId,
						content: contentValue
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
function mapMistralFinishReason(finishReason) {
	switch (finishReason) {
		case "stop": return "stop";
		case "length":
		case "model_length": return "length";
		case "tool_calls": return "tool-calls";
		default: return "unknown";
	}
}
var mistralLanguageModelOptions = object({
	safePrompt: boolean().optional(),
	documentImageLimit: number().optional(),
	documentPageLimit: number().optional(),
	structuredOutputs: boolean().optional(),
	strictJsonSchema: boolean().optional(),
	parallelToolCalls: boolean().optional()
});
var mistralErrorDataSchema = object({
	object: literal("error"),
	message: string(),
	type: string(),
	param: string().nullable(),
	code: string().nullable()
});
var mistralFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: mistralErrorDataSchema,
	errorToMessage: (data) => data.message
});
function prepareTools({ tools, toolChoice }) {
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	if (tools == null) return {
		tools: void 0,
		toolChoice: void 0,
		toolWarnings
	};
	const mistralTools = [];
	for (const tool of tools) if (tool.type === "provider-defined") toolWarnings.push({
		type: "unsupported-tool",
		tool
	});
	else mistralTools.push({
		type: "function",
		function: {
			name: tool.name,
			description: tool.description,
			parameters: tool.inputSchema
		}
	});
	if (toolChoice == null) return {
		tools: mistralTools,
		toolChoice: void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto":
		case "none": return {
			tools: mistralTools,
			toolChoice: type,
			toolWarnings
		};
		case "required": return {
			tools: mistralTools,
			toolChoice: "any",
			toolWarnings
		};
		case "tool": return {
			tools: mistralTools.filter((tool) => tool.function.name === toolChoice.toolName),
			toolChoice: "any",
			toolWarnings
		};
		default: {
			const _exhaustiveCheck = type;
			throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${_exhaustiveCheck}` });
		}
	}
}
var MistralChatLanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v2";
		this.supportedUrls = { "application/pdf": [/^https:\/\/.*$/] };
		var _a;
		this.modelId = modelId;
		this.config = config;
		this.generateId = (_a = config.generateId) != null ? _a : generateId;
	}
	get provider() {
		return this.config.provider;
	}
	async getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, providerOptions, tools, toolChoice }) {
		var _a, _b, _c, _d;
		const warnings = [];
		const options = (_a = await parseProviderOptions({
			provider: "mistral",
			providerOptions,
			schema: mistralLanguageModelOptions
		})) != null ? _a : {};
		if (topK != null) warnings.push({
			type: "unsupported-setting",
			setting: "topK"
		});
		if (frequencyPenalty != null) warnings.push({
			type: "unsupported-setting",
			setting: "frequencyPenalty"
		});
		if (presencePenalty != null) warnings.push({
			type: "unsupported-setting",
			setting: "presencePenalty"
		});
		if (stopSequences != null) warnings.push({
			type: "unsupported-setting",
			setting: "stopSequences"
		});
		const structuredOutputs = (_b = options.structuredOutputs) != null ? _b : true;
		const strictJsonSchema = (_c = options.strictJsonSchema) != null ? _c : false;
		if ((responseFormat == null ? void 0 : responseFormat.type) === "json" && !(responseFormat == null ? void 0 : responseFormat.schema)) prompt = injectJsonInstructionIntoMessages({
			messages: prompt,
			schema: responseFormat.schema
		});
		const baseArgs = {
			model: this.modelId,
			safe_prompt: options.safePrompt,
			max_tokens: maxOutputTokens,
			temperature,
			top_p: topP,
			random_seed: seed,
			response_format: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? structuredOutputs && (responseFormat == null ? void 0 : responseFormat.schema) != null ? {
				type: "json_schema",
				json_schema: {
					schema: responseFormat.schema,
					strict: strictJsonSchema,
					name: (_d = responseFormat.name) != null ? _d : "response",
					description: responseFormat.description
				}
			} : { type: "json_object" } : void 0,
			document_image_limit: options.documentImageLimit,
			document_page_limit: options.documentPageLimit,
			messages: convertToMistralChatMessages(prompt)
		};
		const { tools: mistralTools, toolChoice: mistralToolChoice, toolWarnings } = prepareTools({
			tools,
			toolChoice
		});
		return {
			args: {
				...baseArgs,
				tools: mistralTools,
				tool_choice: mistralToolChoice,
				...mistralTools != null && options.parallelToolCalls !== void 0 ? { parallel_tool_calls: options.parallelToolCalls } : {}
			},
			warnings: [...warnings, ...toolWarnings]
		};
	}
	async doGenerate(options) {
		const { args: body, warnings } = await this.getArgs(options);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: `${this.config.baseURL}/chat/completions`,
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: mistralFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(mistralChatResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const choice = response.choices[0];
		const content = [];
		if (choice.message.content != null && Array.isArray(choice.message.content)) {
			for (const part of choice.message.content) if (part.type === "thinking") {
				const reasoningText = extractReasoningContent(part.thinking);
				if (reasoningText.length > 0) content.push({
					type: "reasoning",
					text: reasoningText
				});
			} else if (part.type === "text") {
				if (part.text.length > 0) content.push({
					type: "text",
					text: part.text
				});
			}
		} else {
			const text = extractTextContent(choice.message.content);
			if (text != null && text.length > 0) content.push({
				type: "text",
				text
			});
		}
		if (choice.message.tool_calls != null) for (const toolCall of choice.message.tool_calls) content.push({
			type: "tool-call",
			toolCallId: toolCall.id,
			toolName: toolCall.function.name,
			input: toolCall.function.arguments
		});
		return {
			content,
			finishReason: mapMistralFinishReason(choice.finish_reason),
			usage: {
				inputTokens: response.usage.prompt_tokens,
				outputTokens: response.usage.completion_tokens,
				totalTokens: response.usage.total_tokens
			},
			request: { body },
			response: {
				...getResponseMetadata(response),
				headers: responseHeaders,
				body: rawResponse
			},
			warnings
		};
	}
	async doStream(options) {
		const { args, warnings } = await this.getArgs(options);
		const body = {
			...args,
			stream: true
		};
		const { responseHeaders, value: response } = await postJsonToApi({
			url: `${this.config.baseURL}/chat/completions`,
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: mistralFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(mistralChatChunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = "unknown";
		const usage = {
			inputTokens: void 0,
			outputTokens: void 0,
			totalTokens: void 0
		};
		let isFirstChunk = true;
		let activeText = false;
		let activeReasoningId = null;
		const generateId2 = this.generateId;
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
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					if (isFirstChunk) {
						isFirstChunk = false;
						controller.enqueue({
							type: "response-metadata",
							...getResponseMetadata(value)
						});
					}
					if (value.usage != null) {
						usage.inputTokens = value.usage.prompt_tokens;
						usage.outputTokens = value.usage.completion_tokens;
						usage.totalTokens = value.usage.total_tokens;
					}
					const choice = value.choices[0];
					const delta = choice.delta;
					const textContent = extractTextContent(delta.content);
					if (delta.content != null && Array.isArray(delta.content)) {
						for (const part of delta.content) if (part.type === "thinking") {
							const reasoningDelta = extractReasoningContent(part.thinking);
							if (reasoningDelta.length > 0) {
								if (activeReasoningId == null) {
									if (activeText) {
										controller.enqueue({
											type: "text-end",
											id: "0"
										});
										activeText = false;
									}
									activeReasoningId = generateId2();
									controller.enqueue({
										type: "reasoning-start",
										id: activeReasoningId
									});
								}
								controller.enqueue({
									type: "reasoning-delta",
									id: activeReasoningId,
									delta: reasoningDelta
								});
							}
						}
					}
					if (textContent != null && textContent.length > 0) {
						if (!activeText) {
							if (activeReasoningId != null) {
								controller.enqueue({
									type: "reasoning-end",
									id: activeReasoningId
								});
								activeReasoningId = null;
							}
							controller.enqueue({
								type: "text-start",
								id: "0"
							});
							activeText = true;
						}
						controller.enqueue({
							type: "text-delta",
							id: "0",
							delta: textContent
						});
					}
					if ((delta == null ? void 0 : delta.tool_calls) != null) for (const toolCall of delta.tool_calls) {
						const toolCallId = toolCall.id;
						const toolName = toolCall.function.name;
						const input = toolCall.function.arguments;
						controller.enqueue({
							type: "tool-input-start",
							id: toolCallId,
							toolName
						});
						controller.enqueue({
							type: "tool-input-delta",
							id: toolCallId,
							delta: input
						});
						controller.enqueue({
							type: "tool-input-end",
							id: toolCallId
						});
						controller.enqueue({
							type: "tool-call",
							toolCallId,
							toolName,
							input
						});
					}
					if (choice.finish_reason != null) finishReason = mapMistralFinishReason(choice.finish_reason);
				},
				flush(controller) {
					if (activeReasoningId != null) controller.enqueue({
						type: "reasoning-end",
						id: activeReasoningId
					});
					if (activeText) controller.enqueue({
						type: "text-end",
						id: "0"
					});
					controller.enqueue({
						type: "finish",
						finishReason,
						usage
					});
				}
			})),
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
function extractReasoningContent(thinking) {
	return thinking.filter((chunk) => chunk.type === "text").map((chunk) => chunk.text).join("");
}
function extractTextContent(content) {
	if (typeof content === "string") return content;
	if (content == null) return void 0;
	const textContent = [];
	for (const chunk of content) {
		const { type } = chunk;
		switch (type) {
			case "text":
				textContent.push(chunk.text);
				break;
			case "thinking":
			case "image_url":
			case "reference": break;
			default: {
				const _exhaustiveCheck = type;
				throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
			}
		}
	}
	return textContent.length ? textContent.join("") : void 0;
}
var mistralContentSchema = union([string(), array(discriminatedUnion("type", [
	object({
		type: literal("text"),
		text: string()
	}),
	object({
		type: literal("image_url"),
		image_url: union([string(), object({
			url: string(),
			detail: string().nullable()
		})])
	}),
	object({
		type: literal("reference"),
		reference_ids: array(number())
	}),
	object({
		type: literal("thinking"),
		thinking: array(object({
			type: literal("text"),
			text: string()
		}))
	})
]))]).nullish();
var mistralUsageSchema = object({
	prompt_tokens: number(),
	completion_tokens: number(),
	total_tokens: number()
});
var mistralChatResponseSchema = object({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		message: object({
			role: literal("assistant"),
			content: mistralContentSchema,
			tool_calls: array(object({
				id: string(),
				function: object({
					name: string(),
					arguments: string()
				})
			})).nullish()
		}),
		index: number(),
		finish_reason: string().nullish()
	})),
	object: literal("chat.completion"),
	usage: mistralUsageSchema
});
var mistralChatChunkSchema = object({
	id: string().nullish(),
	created: number().nullish(),
	model: string().nullish(),
	choices: array(object({
		delta: object({
			role: _enum(["assistant"]).optional(),
			content: mistralContentSchema,
			tool_calls: array(object({
				id: string(),
				function: object({
					name: string(),
					arguments: string()
				})
			})).nullish()
		}),
		finish_reason: string().nullish(),
		index: number()
	})),
	usage: mistralUsageSchema.nullish()
});
var MistralEmbeddingModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v2";
		this.maxEmbeddingsPerCall = 32;
		this.supportsParallelCalls = false;
		this.modelId = modelId;
		this.config = config;
	}
	get provider() {
		return this.config.provider;
	}
	async doEmbed({ values, abortSignal, headers }) {
		if (values.length > this.maxEmbeddingsPerCall) throw new TooManyEmbeddingValuesForCallError({
			provider: this.provider,
			modelId: this.modelId,
			maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
			values
		});
		const { responseHeaders, value: response, rawValue } = await postJsonToApi({
			url: `${this.config.baseURL}/embeddings`,
			headers: combineHeaders(this.config.headers(), headers),
			body: {
				model: this.modelId,
				input: values,
				encoding_format: "float"
			},
			failedResponseHandler: mistralFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(MistralTextEmbeddingResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		return {
			embeddings: response.data.map((item) => item.embedding),
			usage: response.usage ? { tokens: response.usage.prompt_tokens } : void 0,
			response: {
				headers: responseHeaders,
				body: rawValue
			}
		};
	}
};
var MistralTextEmbeddingResponseSchema = object({
	data: array(object({ embedding: array(number()) })),
	usage: object({ prompt_tokens: number() }).nullish()
});
var VERSION = "2.0.24";
function createMistral(options = {}) {
	var _a;
	const baseURL = (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : "https://api.mistral.ai/v1";
	const getHeaders = () => withUserAgentSuffix({
		Authorization: `Bearer ${loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "MISTRAL_API_KEY",
			description: "Mistral"
		})}`,
		...options.headers
	}, `ai-sdk/mistral/${VERSION}`);
	const createChatModel = (modelId) => new MistralChatLanguageModel(modelId, {
		provider: "mistral.chat",
		baseURL,
		headers: getHeaders,
		fetch: options.fetch,
		generateId: options.generateId
	});
	const createEmbeddingModel = (modelId) => new MistralEmbeddingModel(modelId, {
		provider: "mistral.embedding",
		baseURL,
		headers: getHeaders,
		fetch: options.fetch
	});
	const provider = function(modelId) {
		if (new.target) throw new Error("The Mistral model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.languageModel = createChatModel;
	provider.chat = createChatModel;
	provider.embedding = createEmbeddingModel;
	provider.textEmbedding = createEmbeddingModel;
	provider.textEmbeddingModel = createEmbeddingModel;
	provider.imageModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "imageModel"
		});
	};
	return provider;
}
var mistral = createMistral();
export { VERSION, createMistral, mistral };
