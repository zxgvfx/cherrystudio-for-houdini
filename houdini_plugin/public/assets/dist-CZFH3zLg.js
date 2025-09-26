import { C as string, o as array, u as literal, x as number, y as object } from "./v4-_VdBfIuS.js";
import { D as postJsonToApi, L as withoutTrailingSlash, S as NoSuchModelError, V as UnsupportedFunctionalityError, c as combineHeaders, f as convertUint8ArrayToBase64, h as createEventSourceResponseHandler, j as createJsonErrorResponseHandler, k as createJsonResponseHandler, q as generateId, x as loadApiKey } from "./dist-DljPbAPG.js";
function convertToPerplexityMessages(prompt) {
	const messages = [];
	for (const { role, content } of prompt) switch (role) {
		case "system":
			messages.push({
				role: "system",
				content
			});
			break;
		case "user":
		case "assistant": {
			const hasImage = content.some((part) => part.type === "file" && part.mediaType.startsWith("image/"));
			const messageContent = content.map((part) => {
				var _a;
				switch (part.type) {
					case "text": return {
						type: "text",
						text: part.text
					};
					case "file": return part.data instanceof URL ? {
						type: "image_url",
						image_url: { url: part.data.toString() }
					} : {
						type: "image_url",
						image_url: { url: `data:${(_a = part.mediaType) != null ? _a : "image/jpeg"};base64,${typeof part.data === "string" ? part.data : convertUint8ArrayToBase64(part.data)}` }
					};
				}
			}).filter(Boolean);
			messages.push({
				role,
				content: hasImage ? messageContent : messageContent.filter((part) => part.type === "text").map((part) => part.text).join("")
			});
			break;
		}
		case "tool": throw new UnsupportedFunctionalityError({ functionality: "Tool messages" });
		default: {
			const _exhaustiveCheck = role;
			throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
		}
	}
	return messages;
}
function mapPerplexityFinishReason(finishReason) {
	switch (finishReason) {
		case "stop":
		case "length": return finishReason;
		default: return "unknown";
	}
}
var PerplexityLanguageModel = class {
	constructor(modelId, config) {
		this.specificationVersion = "v2";
		this.provider = "perplexity";
		this.supportedUrls = {};
		this.modelId = modelId;
		this.config = config;
	}
	getArgs({ prompt, maxOutputTokens, temperature, topP, topK, frequencyPenalty, presencePenalty, stopSequences, responseFormat, seed, providerOptions }) {
		var _a;
		const warnings = [];
		if (topK != null) warnings.push({
			type: "unsupported-setting",
			setting: "topK"
		});
		if (stopSequences != null) warnings.push({
			type: "unsupported-setting",
			setting: "stopSequences"
		});
		if (seed != null) warnings.push({
			type: "unsupported-setting",
			setting: "seed"
		});
		return {
			args: {
				model: this.modelId,
				frequency_penalty: frequencyPenalty,
				max_tokens: maxOutputTokens,
				presence_penalty: presencePenalty,
				temperature,
				top_k: topK,
				top_p: topP,
				response_format: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? {
					type: "json_schema",
					json_schema: { schema: responseFormat.schema }
				} : void 0,
				...(_a = providerOptions == null ? void 0 : providerOptions.perplexity) != null ? _a : {},
				messages: convertToPerplexityMessages(prompt)
			},
			warnings
		};
	}
	async doGenerate(options) {
		var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
		const { args: body, warnings } = this.getArgs(options);
		const { responseHeaders, value: response, rawValue: rawResponse } = await postJsonToApi({
			url: `${this.config.baseURL}/chat/completions`,
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: perplexityErrorSchema,
				errorToMessage
			}),
			successfulResponseHandler: createJsonResponseHandler(perplexityResponseSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		const choice = response.choices[0];
		const content = [];
		const text = choice.message.content;
		if (text.length > 0) content.push({
			type: "text",
			text
		});
		if (response.citations != null) for (const url of response.citations) content.push({
			type: "source",
			sourceType: "url",
			id: this.config.generateId(),
			url
		});
		return {
			content,
			finishReason: mapPerplexityFinishReason(choice.finish_reason),
			usage: {
				inputTokens: (_a = response.usage) == null ? void 0 : _a.prompt_tokens,
				outputTokens: (_b = response.usage) == null ? void 0 : _b.completion_tokens,
				totalTokens: (_d = (_c = response.usage) == null ? void 0 : _c.total_tokens) != null ? _d : void 0
			},
			request: { body },
			response: {
				...getResponseMetadata(response),
				headers: responseHeaders,
				body: rawResponse
			},
			warnings,
			providerMetadata: { perplexity: {
				images: (_f = (_e = response.images) == null ? void 0 : _e.map((image) => ({
					imageUrl: image.image_url,
					originUrl: image.origin_url,
					height: image.height,
					width: image.width
				}))) != null ? _f : null,
				usage: {
					citationTokens: (_h = (_g = response.usage) == null ? void 0 : _g.citation_tokens) != null ? _h : null,
					numSearchQueries: (_j = (_i = response.usage) == null ? void 0 : _i.num_search_queries) != null ? _j : null
				}
			} }
		};
	}
	async doStream(options) {
		const { args, warnings } = this.getArgs(options);
		const body = {
			...args,
			stream: true
		};
		const { responseHeaders, value: response } = await postJsonToApi({
			url: `${this.config.baseURL}/chat/completions`,
			headers: combineHeaders(this.config.headers(), options.headers),
			body,
			failedResponseHandler: createJsonErrorResponseHandler({
				errorSchema: perplexityErrorSchema,
				errorToMessage
			}),
			successfulResponseHandler: createEventSourceResponseHandler(perplexityChunkSchema),
			abortSignal: options.abortSignal,
			fetch: this.config.fetch
		});
		let finishReason = "unknown";
		const usage = {
			inputTokens: void 0,
			outputTokens: void 0,
			totalTokens: void 0
		};
		const providerMetadata = { perplexity: {
			usage: {
				citationTokens: null,
				numSearchQueries: null
			},
			images: null
		} };
		let isFirstChunk = true;
		let isActive = false;
		const self = this;
		return {
			stream: response.pipeThrough(new TransformStream({
				start(controller) {
					controller.enqueue({
						type: "stream-start",
						warnings
					});
				},
				transform(chunk, controller) {
					var _a, _b, _c;
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
						controller.enqueue({
							type: "response-metadata",
							...getResponseMetadata(value)
						});
						(_a = value.citations) == null || _a.forEach((url) => {
							controller.enqueue({
								type: "source",
								sourceType: "url",
								id: self.config.generateId(),
								url
							});
						});
						isFirstChunk = false;
					}
					if (value.usage != null) {
						usage.inputTokens = value.usage.prompt_tokens;
						usage.outputTokens = value.usage.completion_tokens;
						providerMetadata.perplexity.usage = {
							citationTokens: (_b = value.usage.citation_tokens) != null ? _b : null,
							numSearchQueries: (_c = value.usage.num_search_queries) != null ? _c : null
						};
					}
					if (value.images != null) providerMetadata.perplexity.images = value.images.map((image) => ({
						imageUrl: image.image_url,
						originUrl: image.origin_url,
						height: image.height,
						width: image.width
					}));
					const choice = value.choices[0];
					if ((choice == null ? void 0 : choice.finish_reason) != null) finishReason = mapPerplexityFinishReason(choice.finish_reason);
					if ((choice == null ? void 0 : choice.delta) == null) return;
					const delta = choice.delta;
					const textContent = delta.content;
					if (textContent != null) {
						if (!isActive) {
							controller.enqueue({
								type: "text-start",
								id: "0"
							});
							isActive = true;
						}
						controller.enqueue({
							type: "text-delta",
							id: "0",
							delta: textContent
						});
					}
				},
				flush(controller) {
					if (isActive) controller.enqueue({
						type: "text-end",
						id: "0"
					});
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
function getResponseMetadata({ id, model, created }) {
	return {
		id,
		modelId: model,
		timestamp: /* @__PURE__ */ new Date(created * 1e3)
	};
}
var perplexityUsageSchema = object({
	prompt_tokens: number(),
	completion_tokens: number(),
	total_tokens: number().nullish(),
	citation_tokens: number().nullish(),
	num_search_queries: number().nullish()
});
var perplexityImageSchema = object({
	image_url: string(),
	origin_url: string(),
	height: number(),
	width: number()
});
var perplexityResponseSchema = object({
	id: string(),
	created: number(),
	model: string(),
	choices: array(object({
		message: object({
			role: literal("assistant"),
			content: string()
		}),
		finish_reason: string().nullish()
	})),
	citations: array(string()).nullish(),
	images: array(perplexityImageSchema).nullish(),
	usage: perplexityUsageSchema.nullish()
});
var perplexityChunkSchema = object({
	id: string(),
	created: number(),
	model: string(),
	choices: array(object({
		delta: object({
			role: literal("assistant"),
			content: string()
		}),
		finish_reason: string().nullish()
	})),
	citations: array(string()).nullish(),
	images: array(perplexityImageSchema).nullish(),
	usage: perplexityUsageSchema.nullish()
});
var perplexityErrorSchema = object({ error: object({
	code: number(),
	message: string().nullish(),
	type: string().nullish()
}) });
var errorToMessage = (data) => {
	var _a, _b;
	return (_b = (_a = data.error.message) != null ? _a : data.error.type) != null ? _b : "unknown error";
};
function createPerplexity(options = {}) {
	const getHeaders = () => ({
		Authorization: `Bearer ${loadApiKey({
			apiKey: options.apiKey,
			environmentVariableName: "PERPLEXITY_API_KEY",
			description: "Perplexity"
		})}`,
		...options.headers
	});
	const createLanguageModel = (modelId) => {
		var _a;
		return new PerplexityLanguageModel(modelId, {
			baseURL: withoutTrailingSlash((_a = options.baseURL) != null ? _a : "https://api.perplexity.ai"),
			headers: getHeaders,
			generateId,
			fetch: options.fetch
		});
	};
	const provider = (modelId) => createLanguageModel(modelId);
	provider.languageModel = createLanguageModel;
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
var perplexity = createPerplexity();
export { createPerplexity, perplexity };
