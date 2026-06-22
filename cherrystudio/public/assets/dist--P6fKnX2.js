import { D as string, S as object } from "./types-BaLzBUv4.js";
import { F as loadApiKey, X as withUserAgentSuffix, Z as withoutTrailingSlash, ct as NoSuchModelError } from "./dist-B2-WP_X8.js";
import { t as OpenAICompatibleChatLanguageModel } from "./dist-rP4NIIpJ.js";
var VERSION = "2.0.34";
var cerebrasErrorStructure = {
	errorSchema: object({
		message: string(),
		type: string(),
		param: string(),
		code: string()
	}),
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
	provider.specificationVersion = "v3";
	provider.languageModel = createLanguageModel;
	provider.chat = createLanguageModel;
	provider.embeddingModel = (modelId) => {
		throw new NoSuchModelError({
			modelId,
			modelType: "embeddingModel"
		});
	};
	provider.textEmbeddingModel = provider.embeddingModel;
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
