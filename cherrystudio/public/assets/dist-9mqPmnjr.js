import { D as string, S as object, T as record, d as array, f as boolean, k as union, u as any, v as literal, x as number } from "./types-aaRaCq1D.js";
import { C as extractResponseHeaders, U as postJsonToApi, V as parseProviderOptions, Z as withoutTrailingSlash, a as combineHeaders, at as InvalidResponseDataError, ct as NoSuchModelError, dt as UnsupportedFunctionalityError, h as createJsonResponseHandler, it as InvalidPromptError, lt as TooManyEmbeddingValuesForCallError, m as createJsonErrorResponseHandler, w as generateId } from "./dist-CBre6L4p.js";
function convertToOllamaCompletionPrompt({ prompt, user = "user", assistant = "assistant" }) {
	let text = "";
	if (prompt[0].role === "system") {
		text += `${prompt[0].content}

`;
		prompt = prompt.slice(1);
	}
	for (const { role, content } of prompt) switch (role) {
		case "system": throw new InvalidPromptError({
			message: "Unexpected system message in prompt: ${content}",
			prompt
		});
		case "user": {
			const userMessage = content.map((part) => {
				switch (part.type) {
					case "text": return part.text;
				}
			}).filter(Boolean).join("");
			text += `${user}:
${userMessage}

`;
			break;
		}
		case "assistant": {
			const assistantMessage = content.map((part) => {
				switch (part.type) {
					case "text": return part.text;
					case "tool-call": throw new UnsupportedFunctionalityError({ functionality: "tool-call messages" });
				}
			}).join("");
			text += `${assistant}:
${assistantMessage}

`;
			break;
		}
		case "tool": throw new UnsupportedFunctionalityError({ functionality: "tool messages" });
		default: {
			const _exhaustiveCheck = role;
			throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
		}
	}
	text += `${assistant}:
`;
	return {
		prompt: text,
		stopSequences: [`
${user}:`]
	};
}
function mapOllamaFinishReason(finishReason) {
	switch (finishReason) {
		case "stop": return {
			raw: finishReason,
			unified: "stop"
		};
		case "length": return {
			raw: finishReason,
			unified: "length"
		};
		case "content_filter": return {
			raw: finishReason,
			unified: "content-filter"
		};
		case "function_call":
		case "tool_calls": return {
			raw: finishReason,
			unified: "tool-calls"
		};
		default: return {
			raw: finishReason,
			unified: "other"
		};
	}
}
function getResponseMetadata({ model, created_at }) {
	return {
		id: void 0,
		modelId: model != null ? model : void 0,
		timestamp: created_at != null ? new Date(created_at) : void 0
	};
}
function createNdjsonStreamResponseHandler(schema) {
	return async ({ response }) => {
		const responseHeaders = extractResponseHeaders(response);
		if (response.body == null) throw new Error("Response body is null");
		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = "";
		return {
			responseHeaders,
			value: new ReadableStream({
				async pull(controller) {
					while (true) {
						const { done, value } = await reader.read();
						if (done) {
							if (buffer.trim()) try {
								const parsed = JSON.parse(buffer.trim());
								const validated = schema.parse(parsed);
								controller.enqueue({
									success: true,
									value: validated,
									rawValue: validated
								});
							} catch (e) {}
							controller.close();
							return;
						}
						buffer += decoder.decode(value, { stream: true });
						const lines = buffer.split("\n");
						buffer = lines.pop() || "";
						for (const line of lines) {
							const trimmedLine = line.trim();
							if (trimmedLine) try {
								const parsed = JSON.parse(trimmedLine);
								const validated = schema.parse(parsed);
								controller.enqueue({
									success: true,
									value: validated,
									rawValue: validated
								});
							} catch (error) {
								console.warn("Failed to parse NDJSON line:", error);
							}
						}
					}
				},
				cancel() {
					reader.cancel();
				}
			})
		};
	};
}
var ollamaFailedResponseHandler = createJsonErrorResponseHandler({
	errorSchema: object({ error: object({
		message: string(),
		type: string().nullish(),
		param: any().nullish(),
		code: union([string(), number()]).nullish()
	}) }),
	errorToMessage: (data) => data.error.message
});
object({
	think: union([
		boolean(),
		literal("low"),
		literal("medium"),
		literal("high")
	]).optional(),
	user: string().optional(),
	suffix: string().optional(),
	echo: boolean().optional()
});
var OllamaCompletionLanguageModel = class {
	constructor(modelId, settings, config) {
		this.specificationVersion = "v3";
		this.defaultObjectGenerationMode = void 0;
		this.supportsImageUrls = false;
		this.supportedUrls = {};
		this.modelId = modelId;
		this.settings = settings;
		this.config = config;
		this.provider = config.provider;
	}
	getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences: userStopSequences, responseFormat, tools, toolChoice, seed }) {
		const warnings = [];
		if (topK != null) warnings.push({
			type: "unsupported",
			feature: "topK"
		});
		if (tools == null ? void 0 : tools.length) warnings.push({
			type: "unsupported",
			feature: "tools"
		});
		if (toolChoice != null) warnings.push({
			type: "unsupported",
			feature: "toolChoice"
		});
		if (responseFormat != null && responseFormat.type !== "text") warnings.push({
			type: "unsupported",
			feature: "responseFormat (JSON)"
		});
		const { prompt: completionPrompt, stopSequences } = convertToOllamaCompletionPrompt({ prompt });
		const stop = [...stopSequences != null ? stopSequences : [], ...userStopSequences != null ? userStopSequences : []];
		return {
			args: {
				model: this.modelId,
				user: this.settings.user,
				think: this.settings.think,
				max_tokens: maxOutputTokens,
				temperature,
				top_p: topP,
				frequency_penalty: frequencyPenalty,
				presence_penalty: presencePenalty,
				stop,
				prompt: completionPrompt,
				suffix: this.settings.suffix,
				echo: this.settings.echo,
				stream: false
			},
			warnings
		};
	}
	async doGenerate(options) {
		var _a, _b;
		const { args: body, warnings } = this.getArgs(options);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: this.config.url({
				path: "/generate",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), options.headers),
			body: {
				...body,
				stream: false
			},
			failedResponseHandler: ollamaFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(baseOllamaResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const { prompt: rawPrompt, ...rawSettings } = body;
		const typedResponse = response;
		return {
			content: [{
				type: "text",
				text: typedResponse.response
			}],
			usage: {
				inputTokens: {
					total: (_a = typedResponse.prompt_eval_count) != null ? _a : 0,
					noCache: void 0,
					cacheRead: void 0,
					cacheWrite: void 0
				},
				outputTokens: {
					total: (_b = typedResponse.eval_count) != null ? _b : 0,
					text: void 0,
					reasoning: void 0
				}
			},
			finishReason: mapOllamaFinishReason("stop"),
			request: { body: JSON.stringify(body) },
			response: {
				...getResponseMetadata(typedResponse),
				headers: responseHeaders,
				body: rawResponse
			},
			warnings
		};
	}
	async doStream(options) {
		const { args, warnings } = this.getArgs(options);
		const body = {
			...args,
			stream: true
		};
		const { responseHeaders, value: response } = await postJsonToApi({
			url: this.config.url({
				path: "/generate",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: ollamaFailedResponseHandler,
			successfulResponseHandler: createNdjsonStreamResponseHandler(baseOllamaResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const { prompt: rawPrompt, ...rawSettings } = args;
		let finishReason = "other";
		let usage = {
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
			}
		};
		let isFirstChunk = true;
		let textStarted = false;
		const textId = generateId();
		return {
			stream: response.pipeThrough(new TransformStream({
				transform(chunk, controller) {
					if (!chunk.success) {
						controller.enqueue({
							type: "error",
							error: chunk.rawValue
						});
						return;
					}
					const value = chunk.value;
					if ("error" in value) {
						finishReason = "error";
						controller.enqueue({
							type: "error",
							error: value.error
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
					if (value.done) finishReason = "stop";
					if (value.response != null) {
						if (!textStarted) {
							controller.enqueue({
								type: "text-start",
								id: textId
							});
							textStarted = true;
						}
						controller.enqueue({
							type: "text-delta",
							id: textId,
							delta: value.response
						});
					}
				},
				flush(controller) {
					if (textStarted) controller.enqueue({
						type: "text-end",
						id: textId
					});
					controller.enqueue({
						type: "finish",
						finishReason: mapOllamaFinishReason(finishReason),
						usage
					});
				}
			})),
			request: { body: JSON.stringify(body) },
			response: { headers: responseHeaders },
			warnings
		};
	}
};
var baseOllamaResponseSchema = object({
	model: string(),
	created_at: string(),
	response: string(),
	done: boolean(),
	context: array(number()),
	eval_count: number().optional(),
	eval_duration: number().optional(),
	load_duration: number().optional(),
	total_duration: number().optional(),
	prompt_eval_count: number().optional(),
	prompt_eval_duration: number().optional()
});
var ollamaEmbeddingProviderOptions = object({
	dimensions: number().optional(),
	truncate: boolean().optional(),
	keepAlive: string().optional()
});
var OllamaEmbeddingModel = class {
	constructor(modelId, settings, config) {
		this.specificationVersion = "v3";
		var _a, _b;
		this.modelId = modelId;
		this.settings = settings;
		this.config = config;
		this.provider = config.provider;
		this.maxEmbeddingsPerCall = (_a = settings.maxEmbeddingsPerCall) != null ? _a : 2048;
		this.supportsParallelCalls = (_b = settings.supportsParallelCalls) != null ? _b : true;
	}
	getArgs({ values }) {
		return {
			model: this.modelId,
			input: values,
			dimensions: this.settings.dimensions,
			truncate: this.settings.truncate,
			keep_alive: this.settings.keepAlive
		};
	}
	async doEmbed({ values, headers, abortSignal, providerOptions }) {
		var _a, _b, _c;
		if (this.maxEmbeddingsPerCall && values.length > this.maxEmbeddingsPerCall) throw new TooManyEmbeddingValuesForCallError({
			provider: this.provider,
			modelId: this.modelId,
			maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
			values
		});
		const ollamaOptions = await parseProviderOptions({
			provider: "ollama",
			providerOptions,
			schema: ollamaEmbeddingProviderOptions
		});
		const dimensions = (_a = ollamaOptions == null ? void 0 : ollamaOptions.dimensions) != null ? _a : this.settings.dimensions;
		const truncate = (_b = ollamaOptions == null ? void 0 : ollamaOptions.truncate) != null ? _b : this.settings.truncate;
		const keepAlive = (_c = ollamaOptions == null ? void 0 : ollamaOptions.keepAlive) != null ? _c : this.settings.keepAlive;
		const body = {
			model: this.modelId,
			input: values
		};
		if (dimensions !== void 0) body.dimensions = dimensions;
		if (truncate !== void 0) body.truncate = truncate;
		if (keepAlive !== void 0) body.keep_alive = keepAlive;
		const { responseHeaders, value: response, rawValue } = await postJsonToApi({
			url: this.config.url({
				path: "/embed",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), headers),
			body: { ...body },
			failedResponseHandler: ollamaFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(ollamaTextEmbeddingResponseSchema),
			abortSignal,
			fetch: this.config.fetch
		});
		const typedResponse = response;
		return {
			embeddings: typedResponse.embeddings.map((item) => item),
			usage: { tokens: typedResponse.prompt_eval_count },
			response: {
				headers: responseHeaders,
				body: rawValue
			},
			warnings: []
		};
	}
};
var ollamaTextEmbeddingResponseSchema = object({
	model: string(),
	embeddings: array(array(number())),
	total_duration: number(),
	load_duration: number(),
	prompt_eval_count: number()
});
var baseOllamaResponseSchema2 = object({
	model: string(),
	created_at: string(),
	done: boolean(),
	message: object({
		content: string(),
		role: string(),
		thinking: string().optional(),
		tool_calls: array(object({
			function: object({
				name: string(),
				arguments: record(string(), any())
			}),
			id: string().optional()
		})).optional().nullable()
	}),
	done_reason: string().optional(),
	eval_count: number().optional(),
	eval_duration: number().optional(),
	load_duration: number().optional(),
	prompt_eval_count: number().optional(),
	prompt_eval_duration: number().optional(),
	total_duration: number().optional()
});
var OllamaResponseProcessor = class {
	constructor(config) {
		this.config = config;
	}
	processGenerateResponse(response) {
		return {
			content: this.extractContent(response),
			finishReason: mapOllamaFinishReason(response.done_reason),
			usage: this.extractUsage(response),
			providerMetadata: { ollama: {} }
		};
	}
	extractContent(response) {
		var _a, _b, _c, _d, _e;
		const content = [];
		const text = response.message.content;
		if (text != null && text.length > 0) content.push({
			type: "text",
			text
		});
		const thinking = response.message.thinking;
		if (thinking != null && thinking.length > 0) content.push({
			type: "reasoning",
			text: thinking
		});
		for (const toolCall of (_a = response.message.tool_calls) != null ? _a : []) content.push({
			type: "tool-call",
			toolCallId: (_e = toolCall.id) != null ? _e : (_d = (_c = (_b = this.config).generateId) == null ? void 0 : _c.call(_b)) != null ? _d : generateId(),
			toolName: toolCall.function.name,
			input: JSON.stringify(toolCall.function.arguments)
		});
		return content;
	}
	extractUsage(response) {
		var _a, _b;
		return {
			inputTokens: {
				total: (_a = response.prompt_eval_count) != null ? _a : 0,
				noCache: void 0,
				cacheRead: void 0,
				cacheWrite: void 0
			},
			outputTokens: {
				total: (_b = response.eval_count) != null ? _b : 0,
				text: void 0,
				reasoning: void 0
			}
		};
	}
};
function extractOllamaResponseObjectsFromChunk(chunk) {
	var _a;
	if (chunk.success) return [chunk.value];
	const results = [];
	const raw = (_a = chunk.error) == null ? void 0 : _a.text;
	if (typeof raw !== "string" || raw.length === 0) return results;
	const lines = raw.split(/\r?\n/);
	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed === "") continue;
		try {
			const parsed = JSON.parse(trimmed);
			const validated = baseOllamaResponseSchema2.safeParse(parsed);
			if (validated.success) results.push(validated.data);
		} catch (e) {}
	}
	return results;
}
function convertToOllamaChatMessages({ prompt, systemMessageMode = "system" }) {
	const messages = [];
	for (const { role, content } of prompt) switch (role) {
		case "system":
			switch (systemMessageMode) {
				case "system":
					messages.push({
						role: "system",
						content
					});
					break;
				case "developer":
					messages.push({
						role: "developer",
						content
					});
					break;
				case "remove": break;
				default: {
					const _exhaustiveCheck = systemMessageMode;
					throw new Error(`Unsupported system message mode: ${_exhaustiveCheck}`);
				}
			}
			break;
		case "user": {
			if (content.length === 1 && content[0].type === "text") {
				messages.push({
					role: "user",
					content: content[0].text
				});
				break;
			}
			const userText = content.filter((part) => part.type === "text").map((part) => part.text).join("");
			const images = content.filter((part) => part.type === "file" && part.mediaType.startsWith("image/")).map((part) => part.data);
			messages.push({
				role: "user",
				content: userText.length > 0 ? userText : "",
				images: images.length > 0 ? images : void 0
			});
			break;
		}
		case "assistant": {
			let text = "";
			let thinking = "";
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
							arguments: part.input
						}
					});
					break;
				case "reasoning":
					thinking += part.text;
					break;
				default: throw new Error(`Unsupported part: ${part}`);
			}
			messages.push({
				role: "assistant",
				content: text,
				...thinking && { thinking },
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
	return messages;
}
var ollamaProviderOptions = object({
	think: union([
		boolean(),
		literal("low"),
		literal("medium"),
		literal("high")
	]).optional(),
	options: object({
		num_ctx: number().optional(),
		repeat_last_n: number().optional(),
		repeat_penalty: number().optional(),
		temperature: number().optional(),
		seed: number().optional(),
		stop: array(string()).optional(),
		num_predict: number().optional(),
		top_k: number().optional(),
		top_p: number().optional(),
		min_p: number().optional()
	}).optional()
});
function convertToOllamaResponsesMessages({ prompt, systemMessageMode }) {
	const messages = [];
	const warnings = [];
	for (const { role, content } of prompt) switch (role) {
		case "system":
			switch (systemMessageMode) {
				case "system":
					messages.push({
						role: "system",
						content
					});
					break;
				case "developer":
					messages.push({
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
			messages.push({
				role: "user",
				content: content.map((part, index) => {
					var _a, _b, _c;
					switch (part.type) {
						case "text": return {
							type: "input_text",
							text: part.text
						};
						case "file": if (part.mediaType.startsWith("image/")) {
							const mediaType = part.mediaType === "image/*" ? "image/jpeg" : part.mediaType;
							return {
								type: "input_image",
								image_url: part.data instanceof URL ? part.data.toString() : `data:${mediaType};base64,${part.data}`,
								detail: (_b = (_a = part.providerOptions) == null ? void 0 : _a.ollama) == null ? void 0 : _b.imageDetail
							};
						} else if (part.mediaType === "application/pdf") {
							if (part.data instanceof URL) throw new UnsupportedFunctionalityError({ functionality: "PDF file parts with URLs" });
							return {
								type: "input_file",
								filename: (_c = part.filename) != null ? _c : `part-${index}.pdf`,
								file_data: `data:application/pdf;base64,${part.data}`
							};
						} else throw new UnsupportedFunctionalityError({ functionality: `file part media type ${part.mediaType}` });
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
				case "tool-call":
					if (part.providerExecuted) break;
					messages.push({
						type: "function_call",
						call_id: part.toolCallId,
						name: part.toolName,
						arguments: JSON.stringify(part.input)
					});
					break;
				case "tool-result":
					warnings.push({
						type: "other",
						message: `tool result parts in assistant messages are not supported for Ollama responses`
					});
					break;
			}
			break;
		case "tool":
			for (const part of content) {
				const output = part.output;
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
		messages,
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
	const ollamaTools = [];
	for (const tool of tools) switch (tool.type) {
		case "function": {
			let parameters = tool.inputSchema;
			if (!parameters) parameters = {
				type: "object",
				properties: {},
				required: []
			};
			else if (parameters && typeof parameters === "object" && parameters.type === "object" && parameters.properties && Object.keys(parameters.properties).length === 0) parameters = {
				...parameters,
				properties: {},
				required: []
			};
			ollamaTools.push({
				type: "function",
				function: {
					name: tool.name,
					description: tool.description,
					parameters
				}
			});
			break;
		}
		default:
			toolWarnings.push({
				type: "unsupported",
				feature: "tool",
				details: tool.name
			});
			break;
	}
	if (toolChoice == null) return {
		tools: ollamaTools,
		toolChoice: void 0,
		toolWarnings
	};
	const type = toolChoice.type;
	switch (type) {
		case "auto":
		case "none":
		case "required": return {
			tools: ollamaTools,
			toolChoice: type,
			toolWarnings
		};
		case "tool": return {
			tools: ollamaTools,
			toolChoice: toolChoice.toolName == "web_search_preview" ? { type: "web_search_preview" } : {
				type: "function",
				name: toolChoice.toolName
			},
			toolWarnings
		};
		default: throw new UnsupportedFunctionalityError({ functionality: `tool choice type: ${type}` });
	}
}
var OllamaRequestBuilder = class {
	async buildRequest({ modelId, maxOutputTokens, temperature, stopSequences, topP, topK, presencePenalty, frequencyPenalty, seed, prompt, providerOptions, tools, toolChoice, responseFormat }) {
		const warnings = this.collectUnsupportedSettingsWarnings({
			topK,
			seed,
			presencePenalty,
			frequencyPenalty,
			stopSequences
		});
		const { messages, warnings: messageWarnings } = convertToOllamaResponsesMessages({
			prompt,
			systemMessageMode: "system"
		});
		warnings.push(...messageWarnings);
		const ollamaOptions = await this.parseProviderOptions(providerOptions);
		const baseArgs = this.buildBaseArgs({
			modelId,
			prompt,
			temperature,
			topP,
			maxOutputTokens,
			responseFormat,
			ollamaOptions
		});
		const { tools: ollamaTools, toolChoice: ollamaToolChoice, toolWarnings } = prepareResponsesTools({
			tools,
			toolChoice
		});
		return {
			args: {
				...baseArgs,
				tools: ollamaTools,
				tool_choice: ollamaToolChoice
			},
			warnings: [...warnings, ...toolWarnings]
		};
	}
	collectUnsupportedSettingsWarnings({ topK, seed, presencePenalty, frequencyPenalty, stopSequences }) {
		const warnings = [];
		const unsupportedSettings = [
			{
				value: topK,
				name: "topK"
			},
			{
				value: seed,
				name: "seed"
			},
			{
				value: presencePenalty,
				name: "presencePenalty"
			},
			{
				value: frequencyPenalty,
				name: "frequencyPenalty"
			},
			{
				value: stopSequences,
				name: "stopSequences"
			}
		];
		for (const { value, name } of unsupportedSettings) if (value != null) warnings.push({
			type: "unsupported",
			feature: "setting",
			details: name
		});
		return warnings;
	}
	async parseProviderOptions(providerOptions) {
		const result = await parseProviderOptions({
			provider: "ollama",
			providerOptions,
			schema: ollamaProviderOptions
		});
		return result != null ? result : null;
	}
	buildBaseArgs({ modelId, prompt, temperature, topP, maxOutputTokens, responseFormat, ollamaOptions }) {
		var _a, _b;
		return {
			model: modelId,
			messages: convertToOllamaChatMessages({
				prompt,
				systemMessageMode: "system"
			}),
			max_output_tokens: maxOutputTokens,
			...(responseFormat == null ? void 0 : responseFormat.type) === "json" && { format: responseFormat.schema != null ? responseFormat.schema : "json" },
			think: (_a = ollamaOptions == null ? void 0 : ollamaOptions.think) != null ? _a : false,
			options: {
				...temperature !== void 0 && { temperature },
				...topP !== void 0 && { top_p: topP },
				...(_b = ollamaOptions == null ? void 0 : ollamaOptions.options) != null ? _b : {}
			}
		};
	}
};
var OllamaStreamProcessor = class {
	constructor(config) {
		this.config = config;
		this.state = this.initializeState();
	}
	createTransformStream(warnings, options) {
		return new TransformStream({
			transform: (chunk, controller) => {
				this.processChunk(chunk, controller, options);
			},
			flush: (controller) => {
				this.finalizeStream(controller);
			}
		});
	}
	initializeState() {
		return {
			finishReason: {
				unified: "other",
				raw: void 0
			},
			usage: {
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
				}
			},
			responseId: null,
			ongoingToolCalls: {},
			hasToolCalls: false,
			isFirstChunk: true,
			hasTextStarted: false,
			hasReasoningStarted: false,
			textEnded: false,
			reasoningEnded: false,
			textId: generateId(),
			reasoningId: generateId()
		};
	}
	processChunk(chunk, controller, options) {
		if (options == null ? void 0 : options.includeRawChunks) controller.enqueue({
			type: "raw",
			rawValue: chunk.rawValue
		});
		const values = extractOllamaResponseObjectsFromChunk(chunk);
		if (values.length === 0) {
			if (!chunk.success) {
				this.state.finishReason = {
					unified: "error",
					raw: void 0
				};
				controller.enqueue({
					type: "error",
					error: chunk.error
				});
			}
			return;
		}
		for (const value of values) this.processResponseValue(value, controller);
	}
	processResponseValue(value, controller) {
		if (value && typeof value === "object" && "error" in value) {
			this.state.finishReason = {
				unified: "error",
				raw: void 0
			};
			controller.enqueue({
				type: "error",
				error: value.error
			});
			return;
		}
		if (this.state.isFirstChunk) {
			this.state.isFirstChunk = false;
			controller.enqueue({
				type: "response-metadata",
				...getResponseMetadata(value)
			});
		}
		if (value.done) this.handleDoneChunk(value, controller);
		const delta = value == null ? void 0 : value.message;
		if (delta) this.processDelta(delta, controller);
	}
	handleDoneChunk(value, controller) {
		this.state.finishReason = mapOllamaFinishReason(value.done_reason);
		this.state.usage = {
			inputTokens: {
				total: value.prompt_eval_count || 0,
				noCache: void 0,
				cacheRead: void 0,
				cacheWrite: void 0
			},
			outputTokens: {
				total: value.eval_count || 0,
				text: void 0,
				reasoning: void 0
			}
		};
		if (this.state.hasTextStarted && !this.state.textEnded) {
			controller.enqueue({
				type: "text-end",
				id: this.state.textId
			});
			this.state.textEnded = true;
		}
		if (this.state.hasReasoningStarted && !this.state.reasoningEnded) {
			controller.enqueue({
				type: "reasoning-end",
				id: this.state.reasoningId
			});
			this.state.reasoningEnded = true;
		}
	}
	processDelta(delta, controller) {
		this.processThinking(delta, controller);
		this.processTextContent(delta, controller);
		this.processToolCalls(delta, controller);
	}
	processTextContent(delta, controller) {
		if (delta == null ? void 0 : delta.content) {
			if (!this.state.hasTextStarted) {
				controller.enqueue({
					type: "text-start",
					id: this.state.textId
				});
				this.state.hasTextStarted = true;
			}
			controller.enqueue({
				type: "text-delta",
				id: this.state.textId,
				delta: delta.content
			});
		}
	}
	processThinking(delta, controller) {
		if (delta == null ? void 0 : delta.thinking) {
			if (!this.state.hasReasoningStarted) {
				controller.enqueue({
					type: "reasoning-start",
					id: this.state.reasoningId
				});
				this.state.hasReasoningStarted = true;
			}
			controller.enqueue({
				type: "reasoning-delta",
				id: this.state.reasoningId,
				delta: delta.thinking
			});
		}
	}
	processToolCalls(delta, controller) {
		var _a, _b, _c, _d;
		for (const toolCall of (_a = delta.tool_calls) != null ? _a : []) {
			if (((_b = toolCall.function) == null ? void 0 : _b.name) == null) throw new InvalidResponseDataError({
				data: toolCall,
				message: `Expected 'function.name' to be a string.`
			});
			if (((_c = toolCall.function) == null ? void 0 : _c.name) != null && ((_d = toolCall.function) == null ? void 0 : _d.arguments) != null) this.emitToolCall(toolCall, controller);
		}
	}
	emitToolCall(toolCall, controller) {
		var _a, _b, _c, _d;
		const id = (_d = toolCall.id) != null ? _d : (_c = (_b = (_a = this.config).generateId) == null ? void 0 : _b.call(_a)) != null ? _c : generateId();
		controller.enqueue({
			type: "tool-input-start",
			id,
			toolName: toolCall.function.name
		});
		controller.enqueue({
			type: "tool-input-delta",
			id,
			delta: JSON.stringify(toolCall.function.arguments)
		});
		controller.enqueue({
			type: "tool-input-end",
			id
		});
		controller.enqueue({
			type: "tool-call",
			toolCallId: id,
			toolName: toolCall.function.name,
			input: JSON.stringify(toolCall.function.arguments)
		});
		this.state.hasToolCalls = true;
	}
	finalizeStream(controller) {
		if (this.state.hasTextStarted && !this.state.textEnded) controller.enqueue({
			type: "text-end",
			id: this.state.textId
		});
		if (this.state.hasReasoningStarted && !this.state.reasoningEnded) controller.enqueue({
			type: "reasoning-end",
			id: this.state.reasoningId
		});
		controller.enqueue({
			type: "finish",
			finishReason: this.state.finishReason,
			usage: this.state.usage,
			providerMetadata: { ollama: { responseId: this.state.responseId } }
		});
	}
};
var OllamaResponsesLanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v3";
		this.defaultObjectGenerationMode = void 0;
		this.supportsImageUrls = true;
		this.supportedUrls = { "image/*": [/^https?:\/\/.*$/] };
		this.modelId = modelId;
		this.config = config;
		this.provider = config.provider;
		this.requestBuilder = new OllamaRequestBuilder();
		this.responseProcessor = new OllamaResponseProcessor(config);
	}
	async doGenerate(options) {
		const { args: body, warnings } = await this.prepareRequest(options);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: this.config.url({
				path: "/chat",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), options.headers),
			body: {
				...body,
				stream: false
			},
			failedResponseHandler: ollamaFailedResponseHandler,
			successfulResponseHandler: createJsonResponseHandler(baseOllamaResponseSchema2),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		return {
			...this.responseProcessor.processGenerateResponse(response),
			request: { body: JSON.stringify(body) },
			response: {
				modelId: this.modelId,
				timestamp: /* @__PURE__ */ new Date(),
				headers: responseHeaders,
				body: rawResponse
			},
			warnings
		};
	}
	async doStream(options) {
		const { args: body, warnings } = await this.prepareRequest(options);
		const { responseHeaders, value: response } = await postJsonToApi({
			url: this.config.url({
				path: "/chat",
				modelId: this.modelId
			}),
			headers: combineHeaders(this.config.headers(), options.headers),
			body: {
				...body,
				stream: true
			},
			failedResponseHandler: ollamaFailedResponseHandler,
			successfulResponseHandler: createNdjsonStreamResponseHandler(baseOllamaResponseSchema2),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const streamProcessor = new OllamaStreamProcessor(this.config);
		return {
			stream: response.pipeThrough(streamProcessor.createTransformStream(warnings, options)),
			request: { body },
			response: { headers: responseHeaders },
			warnings
		};
	}
	async prepareRequest(options) {
		return await this.requestBuilder.buildRequest({
			modelId: this.modelId,
			...options
		});
	}
};
function createOllama(options = {}) {
	var _a, _b;
	const baseURL = (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : "http://127.0.0.1:11434/api";
	const providerName = (_b = options.name) != null ? _b : "ollama";
	const getHeaders = () => ({
		"Ollama-Organization": options.organization,
		"Ollama-Project": options.project,
		...options.headers
	});
	const createCompletionModel = (modelId, settings = {}) => new OllamaCompletionLanguageModel(modelId, settings, {
		provider: `${providerName}.completion`,
		url: ({ path }) => `${baseURL}${path}`,
		headers: getHeaders,
		fetch: options.fetch
	});
	const createEmbeddingModel = (modelId, settings = {}) => new OllamaEmbeddingModel(modelId, settings, {
		provider: `${providerName}.embedding`,
		url: ({ path }) => `${baseURL}${path}`,
		headers: getHeaders,
		fetch: options.fetch
	});
	const createLanguageModel = (modelId) => {
		if (new.target) throw new Error("The Ollama model function cannot be called with the new keyword.");
		return createResponsesModel(modelId);
	};
	const createResponsesModel = (modelId) => {
		return new OllamaResponsesLanguageModel(modelId, {
			provider: `${providerName}.responses`,
			url: ({ path }) => `${baseURL}${path}`,
			headers: getHeaders,
			fetch: options.fetch
		});
	};
	const provider = function(modelId) {
		return createLanguageModel(modelId);
	};
	provider.specificationVersion = "v3";
	provider.languageModel = createLanguageModel;
	provider.chat = createLanguageModel;
	provider.completion = createCompletionModel;
	provider.embedding = createEmbeddingModel;
	provider.textEmbedding = createEmbeddingModel;
	provider.textEmbeddingModel = createEmbeddingModel;
	provider.embeddingModel = createEmbeddingModel;
	provider.imageModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "imageModel",
			message: "Image generation is unsupported with Ollama"
		});
	};
	return provider;
}
var ollama = createOllama();
export { createOllama, ollama };
