import { D as string, S as object, T as record, d as array, f as boolean, k as union, m as discriminatedUnion, u as any, v as literal, x as number } from "./types-BaLzBUv4.js";
import { F as loadApiKey, U as postJsonToApi, V as parseProviderOptions, Z as withoutTrailingSlash, a as combineHeaders, ct as NoSuchModelError, dt as UnsupportedFunctionalityError, f as createEventSourceResponseHandler, h as createJsonResponseHandler, m as createJsonErrorResponseHandler, tt as APICallError, w as generateId } from "./dist-Bp3sQ_Uj.js";
var huggingfaceFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: object({ error: object({
		message: string(),
		type: string().optional(),
		code: string().optional()
	}) }),
	errorToMessage: (data) => data.error.message
});
function convertHuggingFaceResponsesUsage(usage) {
	var _a, _b, _c, _d;
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
	const inputTokens = usage.input_tokens;
	const outputTokens = usage.output_tokens;
	const cachedTokens = (_b = (_a = usage.input_tokens_details) == null ? void 0 : _a.cached_tokens) != null ? _b : 0;
	const reasoningTokens = (_d = (_c = usage.output_tokens_details) == null ? void 0 : _c.reasoning_tokens) != null ? _d : 0;
	return {
		inputTokens: {
			total: inputTokens,
			noCache: inputTokens - cachedTokens,
			cacheRead: cachedTokens,
			cacheWrite: void 0
		},
		outputTokens: {
			total: outputTokens,
			text: outputTokens - reasoningTokens,
			reasoning: reasoningTokens
		},
		raw: usage
	};
}
async function convertToHuggingFaceResponsesMessages({ prompt }) {
	const messages = [];
	const warnings = [];
	for (const { role, content } of prompt) switch (role) {
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
							type: "input_text",
							text: part.text
						};
						case "file": if (part.mediaType.startsWith("image/")) {
							const mediaType = part.mediaType === "image/*" ? "image/jpeg" : part.mediaType;
							return {
								type: "input_image",
								image_url: part.data instanceof URL ? part.data.toString() : `data:${mediaType};base64,${part.data}`
							};
						} else throw new UnsupportedFunctionalityError({ functionality: `file part media type ${part.mediaType}` });
						default: {
							const _exhaustiveCheck = part;
							throw new Error(`Unsupported part type: ${_exhaustiveCheck}`);
						}
					}
				})
			});
			break;
		case "assistant":
			for (const part of content) switch (part.type) {
				case "text":
					messages.push({
						role: "assistant",
						content: [{
							type: "output_text",
							text: part.text
						}]
					});
					break;
				case "tool-call": break;
				case "tool-result": break;
				case "reasoning":
					messages.push({
						role: "assistant",
						content: [{
							type: "output_text",
							text: part.text
						}]
					});
					break;
			}
			break;
		case "tool":
			warnings.push({
				type: "unsupported",
				feature: "tool messages"
			});
			break;
		default: {
			const _exhaustiveCheck = role;
			throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
		}
	}
	return {
		input: messages,
		warnings
	};
}
function prepareResponsesTools({ tools, toolChoice }) {
	tools = (tools == null ? void 0 : tools.length) ? tools : void 0;
	const toolWarnings = [];
	if (tools == null) return {
		tools: void 0,
		toolChoice: void 0,
		toolWarnings
	};
	const huggingfaceTools = [];
	for (const tool of tools) switch (tool.type) {
		case "function":
			huggingfaceTools.push({
				type: "function",
				name: tool.name,
				description: tool.description,
				parameters: tool.inputSchema
			});
			break;
		case "provider":
			toolWarnings.push({
				type: "unsupported",
				feature: `provider-defined tool ${tool.id}`
			});
			break;
		default: {
			const _exhaustiveCheck = tool;
			throw new Error(`Unsupported tool type: ${_exhaustiveCheck}`);
		}
	}
	let mappedToolChoice = void 0;
	if (toolChoice) switch (toolChoice.type) {
		case "auto":
			mappedToolChoice = "auto";
			break;
		case "required":
			mappedToolChoice = "required";
			break;
		case "none": break;
		case "tool":
			mappedToolChoice = {
				type: "function",
				function: { name: toolChoice.toolName }
			};
			break;
		default: {
			const _exhaustiveCheck = toolChoice;
			throw new Error(`Unsupported tool choice type: ${_exhaustiveCheck}`);
		}
	}
	return {
		tools: huggingfaceTools,
		toolChoice: mappedToolChoice,
		toolWarnings
	};
}
function mapHuggingFaceResponsesFinishReason(finishReason) {
	switch (finishReason) {
		case "stop": return "stop";
		case "length": return "length";
		case "content_filter": return "content-filter";
		case "tool_calls": return "tool-calls";
		case "error": return "error";
		default: return "other";
	}
}
var HuggingFaceResponsesLanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v3";
		this.supportedUrls = { "image/*": [/^https?:\/\/.*$/] };
		this.modelId = modelId;
		this.config = config;
	}
	get provider() {
		return this.config.provider;
	}
	async getArgs({ maxOutputTokens, temperature, stopSequences, topP, topK, presencePenalty, frequencyPenalty, seed, prompt, providerOptions, tools, toolChoice, responseFormat }) {
		var _a, _b;
		const warnings = [];
		if (topK != null) warnings.push({
			type: "unsupported",
			feature: "topK"
		});
		if (seed != null) warnings.push({
			type: "unsupported",
			feature: "seed"
		});
		if (presencePenalty != null) warnings.push({
			type: "unsupported",
			feature: "presencePenalty"
		});
		if (frequencyPenalty != null) warnings.push({
			type: "unsupported",
			feature: "frequencyPenalty"
		});
		if (stopSequences != null) warnings.push({
			type: "unsupported",
			feature: "stopSequences"
		});
		const { input, warnings: messageWarnings } = await convertToHuggingFaceResponsesMessages({ prompt });
		warnings.push(...messageWarnings);
		const huggingfaceOptions = await parseProviderOptions({
			provider: "huggingface",
			providerOptions,
			schema: huggingfaceResponsesProviderOptionsSchema
		});
		const { tools: preparedTools, toolChoice: preparedToolChoice, toolWarnings } = prepareResponsesTools({
			tools,
			toolChoice
		});
		warnings.push(...toolWarnings);
		return {
			args: {
				model: this.modelId,
				input,
				temperature,
				top_p: topP,
				max_output_tokens: maxOutputTokens,
				...(responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema && { text: { format: {
					type: "json_schema",
					strict: (_a = huggingfaceOptions == null ? void 0 : huggingfaceOptions.strictJsonSchema) != null ? _a : false,
					name: (_b = responseFormat.name) != null ? _b : "response",
					description: responseFormat.description,
					schema: responseFormat.schema
				} } },
				metadata: huggingfaceOptions == null ? void 0 : huggingfaceOptions.metadata,
				instructions: huggingfaceOptions == null ? void 0 : huggingfaceOptions.instructions,
				...preparedTools && { tools: preparedTools },
				...preparedToolChoice && { tool_choice: preparedToolChoice },
				...(huggingfaceOptions == null ? void 0 : huggingfaceOptions.reasoningEffort) != null && { reasoning: { ...(huggingfaceOptions == null ? void 0 : huggingfaceOptions.reasoningEffort) != null && { effort: huggingfaceOptions.reasoningEffort } } }
			},
			warnings
		};
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g;
		const { args, warnings } = await this.getArgs(options);
		const body = {
			...args,
			stream: false
		};
		const url = this.config.url({
			path: "/responses",
			modelId: this.modelId
		});
		const { value: response, responseHeaders, rawValue: rawResponse } = await postJsonToApi({
			url,
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: huggingfaceFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(huggingfaceResponsesResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		if (response.error) throw new APICallError({
			message: response.error.message,
			url,
			requestBodyValues: body,
			statusCode: 400,
			responseHeaders,
			responseBody: rawResponse,
			isRetryable: false
		});
		const content = [];
		for (const part of response.output) switch (part.type) {
			case "message":
				for (const contentPart of part.content) {
					content.push({
						type: "text",
						text: contentPart.text,
						providerMetadata: { huggingface: { itemId: part.id } }
					});
					if (contentPart.annotations) for (const annotation of contentPart.annotations) content.push({
						type: "source",
						sourceType: "url",
						id: (_c = (_b = (_a = this.config).generateId) == null ? void 0 : _b.call(_a)) != null ? _c : generateId(),
						url: annotation.url,
						title: annotation.title
					});
				}
				break;
			case "reasoning":
				for (const contentPart of part.content) content.push({
					type: "reasoning",
					text: contentPart.text,
					providerMetadata: { huggingface: { itemId: part.id } }
				});
				break;
			case "mcp_call":
				content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: part.name,
					input: part.arguments,
					providerExecuted: true
				});
				if (part.output) content.push({
					type: "tool-result",
					toolCallId: part.id,
					toolName: part.name,
					result: part.output
				});
				break;
			case "mcp_list_tools":
				content.push({
					type: "tool-call",
					toolCallId: part.id,
					toolName: "list_tools",
					input: JSON.stringify({ server_label: part.server_label }),
					providerExecuted: true
				});
				if (part.tools) content.push({
					type: "tool-result",
					toolCallId: part.id,
					toolName: "list_tools",
					result: { tools: part.tools }
				});
				break;
			case "function_call":
				content.push({
					type: "tool-call",
					toolCallId: part.call_id,
					toolName: part.name,
					input: part.arguments
				});
				if (part.output) content.push({
					type: "tool-result",
					toolCallId: part.call_id,
					toolName: part.name,
					result: part.output
				});
				break;
			default: break;
		}
		return {
			content,
			finishReason: {
				unified: mapHuggingFaceResponsesFinishReason((_e = (_d = response.incomplete_details) == null ? void 0 : _d.reason) != null ? _e : "stop"),
				raw: (_g = (_f = response.incomplete_details) == null ? void 0 : _f.reason) != null ? _g : void 0
			},
			usage: convertHuggingFaceResponsesUsage(response.usage),
			request: { body },
			response: {
				id: response.id,
				timestamp: /* @__PURE__ */ new Date(response.created_at * 1e3),
				modelId: response.model,
				headers: responseHeaders,
				body: rawResponse
			},
			providerMetadata: { huggingface: { responseId: response.id } },
			warnings
		};
	}
	async doStream(options) {
		const { args, warnings } = await this.getArgs(options);
		const body = {
			...args,
			stream: true
		};
		const { value: response, responseHeaders } = await postJsonToApi({
			url: this.config.url({
				path: "/responses",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: huggingfaceFailedResponseHandler,
			successfulResponseHandler: createEventSourceResponseHandler(huggingfaceResponsesChunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = {
			unified: "other",
			raw: void 0
		};
		let responseId = null;
		let usage = void 0;
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					var _a, _b, _c, _d;
					if (!chunk.success) {
						finishReason = {
							unified: "error",
							raw: void 0
						};
						controller.enqueue({
							type: "error",
							error: chunk.error
						});
						return;
					}
					const value = chunk.value;
					if (isResponseCreatedChunk(value)) {
						responseId = value.response.id;
						controller.enqueue({
							type: "response-metadata",
							id: value.response.id,
							timestamp: /* @__PURE__ */ new Date(value.response.created_at * 1e3),
							modelId: value.response.model
						});
						return;
					}
					if (isResponseOutputItemAddedChunk(value)) {
						if (value.item.type === "message" && value.item.role === "assistant") controller.enqueue({
							type: "text-start",
							id: value.item.id,
							providerMetadata: { huggingface: { itemId: value.item.id } }
						});
						else if (value.item.type === "function_call") controller.enqueue({
							type: "tool-input-start",
							id: value.item.call_id,
							toolName: value.item.name
						});
						else if (value.item.type === "reasoning") controller.enqueue({
							type: "reasoning-start",
							id: value.item.id,
							providerMetadata: { huggingface: { itemId: value.item.id } }
						});
						return;
					}
					if (isResponseOutputItemDoneChunk(value)) {
						if (value.item.type === "message" && value.item.role === "assistant") controller.enqueue({
							type: "text-end",
							id: value.item.id
						});
						else if (value.item.type === "function_call") {
							controller.enqueue({
								type: "tool-input-end",
								id: value.item.call_id
							});
							controller.enqueue({
								type: "tool-call",
								toolCallId: value.item.call_id,
								toolName: value.item.name,
								input: value.item.arguments
							});
							if (value.item.output) controller.enqueue({
								type: "tool-result",
								toolCallId: value.item.call_id,
								toolName: value.item.name,
								result: value.item.output
							});
						}
						return;
					}
					if (isResponseCompletedChunk(value)) {
						responseId = value.response.id;
						finishReason = {
							unified: mapHuggingFaceResponsesFinishReason((_b = (_a = value.response.incomplete_details) == null ? void 0 : _a.reason) != null ? _b : "stop"),
							raw: (_d = (_c = value.response.incomplete_details) == null ? void 0 : _c.reason) != null ? _d : void 0
						};
						if (value.response.usage) usage = value.response.usage;
						return;
					}
					if (isReasoningDeltaChunk(value)) {
						controller.enqueue({
							type: "reasoning-delta",
							id: value.item_id,
							delta: value.delta
						});
						return;
					}
					if (isReasoningEndChunk(value)) {
						controller.enqueue({
							type: "reasoning-end",
							id: value.item_id
						});
						return;
					}
					if (isTextDeltaChunk(value)) {
						controller.enqueue({
							type: "text-delta",
							id: value.item_id,
							delta: value.delta
						});
						return;
					}
				},
				flush(controller) {
					controller.enqueue({
						type: "finish",
						finishReason,
						usage: convertHuggingFaceResponsesUsage(usage),
						providerMetadata: { huggingface: { responseId } }
					});
				}
			})),
			request: { body },
			response: { headers: responseHeaders }
		};
	}
};
var huggingfaceResponsesProviderOptionsSchema = object({
	metadata: record(string(), string()).optional(),
	instructions: string().optional(),
	strictJsonSchema: boolean().optional(),
	reasoningEffort: string().optional()
});
var huggingfaceResponsesOutputSchema = discriminatedUnion("type", [
	object({
		type: literal("message"),
		id: string(),
		role: string().optional(),
		status: string().optional(),
		content: array(object({
			type: literal("output_text"),
			text: string(),
			annotations: array(any()).optional()
		}))
	}),
	object({
		type: literal("reasoning"),
		id: string(),
		status: string().optional(),
		content: array(object({
			type: literal("reasoning_text"),
			text: string()
		})),
		summary: array(object({
			type: literal("reasoning_summary"),
			text: string()
		}).optional()).optional()
	}),
	object({
		type: literal("function_call"),
		id: string(),
		call_id: string(),
		name: string(),
		arguments: string(),
		output: string().optional(),
		status: string().optional()
	}),
	object({
		type: literal("mcp_call"),
		id: string(),
		name: string(),
		arguments: string(),
		output: string().optional(),
		status: string().optional()
	}),
	object({
		type: literal("mcp_list_tools"),
		id: string(),
		server_label: string(),
		tools: array(any()).optional(),
		status: string().optional()
	})
]);
var huggingfaceResponsesResponseSchema = object({
	id: string(),
	model: string(),
	object: string(),
	created_at: number(),
	status: string(),
	error: any().nullable(),
	instructions: any().nullable(),
	max_output_tokens: any().nullable(),
	metadata: any().nullable(),
	tool_choice: any(),
	tools: array(any()),
	temperature: number(),
	top_p: number(),
	incomplete_details: object({ reason: string() }).nullable().optional(),
	usage: object({
		input_tokens: number(),
		input_tokens_details: object({ cached_tokens: number() }).optional(),
		output_tokens: number(),
		output_tokens_details: object({ reasoning_tokens: number() }).optional(),
		total_tokens: number()
	}).nullable().optional(),
	output: array(huggingfaceResponsesOutputSchema),
	output_text: string().nullable().optional()
});
var responseOutputItemAddedSchema = object({
	type: literal("response.output_item.added"),
	output_index: number(),
	item: discriminatedUnion("type", [
		object({
			type: literal("message"),
			id: string(),
			role: string().optional(),
			status: string().optional(),
			content: array(any()).optional()
		}),
		object({
			type: literal("reasoning"),
			id: string(),
			status: string().optional(),
			content: array(any()).optional(),
			summary: array(any()).optional()
		}),
		object({
			type: literal("mcp_list_tools"),
			id: string(),
			server_label: string(),
			tools: array(any()).optional(),
			error: string().optional()
		}),
		object({
			type: literal("mcp_call"),
			id: string(),
			server_label: string(),
			name: string(),
			arguments: string(),
			output: string().optional(),
			error: string().optional()
		}),
		object({
			type: literal("function_call"),
			id: string(),
			call_id: string(),
			name: string(),
			arguments: string(),
			output: string().optional(),
			error: string().optional()
		})
	]),
	sequence_number: number()
});
var responseOutputItemDoneSchema = object({
	type: literal("response.output_item.done"),
	output_index: number(),
	item: discriminatedUnion("type", [
		object({
			type: literal("message"),
			id: string(),
			role: string().optional(),
			status: string().optional(),
			content: array(any()).optional()
		}),
		object({
			type: literal("mcp_list_tools"),
			id: string(),
			server_label: string(),
			tools: array(any()).optional(),
			error: string().optional()
		}),
		object({
			type: literal("mcp_call"),
			id: string(),
			server_label: string(),
			name: string(),
			arguments: string(),
			output: string().optional(),
			error: string().optional()
		}),
		object({
			type: literal("function_call"),
			id: string(),
			call_id: string(),
			name: string(),
			arguments: string(),
			output: string().optional(),
			error: string().optional()
		}),
		object({
			type: literal("reasoning"),
			id: string(),
			status: string().optional(),
			content: array(any()).optional(),
			summary: array(any()).optional()
		})
	]),
	sequence_number: number()
});
var textDeltaChunkSchema = object({
	type: literal("response.output_text.delta"),
	item_id: string(),
	output_index: number(),
	content_index: number(),
	delta: string(),
	sequence_number: number()
});
var huggingfaceResponsesChunkSchema = union([
	responseOutputItemAddedSchema,
	responseOutputItemDoneSchema,
	object({
		type: literal("response.reasoning_text.delta"),
		item_id: string(),
		output_index: number(),
		content_index: number(),
		delta: string(),
		sequence_number: number()
	}),
	object({
		type: literal("response.reasoning_text.done"),
		item_id: string(),
		output_index: number(),
		content_index: number(),
		text: string(),
		sequence_number: number()
	}),
	textDeltaChunkSchema,
	object({
		type: literal("response.completed"),
		response: huggingfaceResponsesResponseSchema,
		sequence_number: number()
	}),
	object({
		type: literal("response.created"),
		response: object({
			id: string(),
			object: string(),
			created_at: number(),
			status: string(),
			model: string()
		})
	}),
	object({ type: string() }).loose()
]);
function isResponseOutputItemAddedChunk(chunk) {
	return chunk.type === "response.output_item.added";
}
function isResponseOutputItemDoneChunk(chunk) {
	return chunk.type === "response.output_item.done";
}
function isTextDeltaChunk(chunk) {
	return chunk.type === "response.output_text.delta";
}
function isReasoningDeltaChunk(chunk) {
	return chunk.type === "response.reasoning_text.delta";
}
function isReasoningEndChunk(chunk) {
	return chunk.type === "response.reasoning_text.done";
}
function isResponseCompletedChunk(chunk) {
	return chunk.type === "response.completed";
}
function isResponseCreatedChunk(chunk) {
	return chunk.type === "response.created";
}
function createHuggingFace(options = {}) {
	var _a;
	const baseURL = (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : "https://router.huggingface.co/v1";
	const getHeaders = () => ({
		Authorization: `Bearer ${loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "HUGGINGFACE_API_KEY",
			description: "Hugging Face"
		})}`,
		...options.headers
	});
	const createResponsesModel = (modelId) => {
		var _a2;
		return new HuggingFaceResponsesLanguageModel(modelId, {
			provider: "huggingface.responses",
			url: ({ path }) => `${baseURL}${path}`,
			headers: getHeaders,
			fetch: options.fetch,
			generateId: (_a2 = options.generateId) != null ? _a2 : generateId
		});
	};
	const provider = (modelId) => createResponsesModel(modelId);
	provider.specificationVersion = "v3";
	provider.languageModel = createResponsesModel;
	provider.responses = createResponsesModel;
	provider.embeddingModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "embeddingModel",
			message: "Hugging Face Responses API does not support text embeddings. Use the Hugging Face Inference API directly for embeddings."
		});
	};
	provider.textEmbeddingModel = provider.embeddingModel;
	provider.imageModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "imageModel",
			message: "Hugging Face Responses API does not support image generation. Use the Hugging Face Inference API directly for image models."
		});
	};
	return provider;
}
var huggingface = createHuggingFace();
export { createHuggingFace, huggingface };
