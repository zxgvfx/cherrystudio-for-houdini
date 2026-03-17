import { D as getRuntimeEnvironmentUserAgent, G as resolve, I as loadOptionalSetting, L as loadSetting, X as withUserAgentSuffix, Z as withoutTrailingSlash, ct as NoSuchModelError } from "./dist-CBre6L4p.js";
import { n as anthropicTools, t as AnthropicMessagesLanguageModel } from "./internal-BEQPupHG.js";
var VERSION = "4.0.66";
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
	const pemContents = pemKey.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s/g, "");
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
	const data = new TextEncoder().encode(signingInput);
	const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, data);
	const signatureBase64 = base64url(String.fromCharCode(...new Uint8Array(signature)));
	return `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}.${signatureBase64}`;
};
async function generateAuthToken(credentials) {
	try {
		const jwt = await buildJwt(credentials || await loadCredentials());
		const response = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			headers: withUserAgentSuffix({ "Content-Type": "application/x-www-form-urlencoded" }, `ai-sdk/google-vertex/${VERSION}`, getRuntimeEnvironmentUserAgent()),
			body: new URLSearchParams({
				grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
				assertion: jwt
			})
		});
		if (!response.ok) throw new Error(`Token request failed: ${response.statusText}`);
		return (await response.json()).access_token;
	} catch (error) {
		throw error;
	}
}
var vertexAnthropicTools = {
	bash_20241022: anthropicTools.bash_20241022,
	bash_20250124: anthropicTools.bash_20250124,
	textEditor_20241022: anthropicTools.textEditor_20241022,
	textEditor_20250124: anthropicTools.textEditor_20250124,
	textEditor_20250429: anthropicTools.textEditor_20250429,
	textEditor_20250728: anthropicTools.textEditor_20250728,
	computer_20241022: anthropicTools.computer_20241022,
	webSearch_20250305: anthropicTools.webSearch_20250305
};
function createVertexAnthropic(options = {}) {
	const getBaseURL = () => {
		var _a;
		const location = loadOptionalSetting({
			settingValue: options.location,
			environmentVariableName: "GOOGLE_VERTEX_LOCATION"
		});
		const project = loadOptionalSetting({
			settingValue: options.project,
			environmentVariableName: "GOOGLE_VERTEX_PROJECT"
		});
		return (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : `https://${location === "global" ? "" : location + "-"}aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/anthropic/models`;
	};
	const createChatModel = (modelId) => {
		var _a;
		return new AnthropicMessagesLanguageModel(modelId, {
			provider: "vertex.anthropic.messages",
			baseURL: getBaseURL(),
			headers: (_a = options.headers) != null ? _a : {},
			fetch: options.fetch,
			buildRequestUrl: (baseURL, isStreaming) => `${baseURL}/${modelId}:${isStreaming ? "streamRawPredict" : "rawPredict"}`,
			transformRequestBody: (args) => {
				const { model, ...rest } = args;
				return {
					...rest,
					anthropic_version: "vertex-2023-10-16"
				};
			},
			supportedUrls: () => ({}),
			supportsNativeStructuredOutput: false
		});
	};
	const provider = function(modelId) {
		if (new.target) throw new Error("The Anthropic model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.specificationVersion = "v3";
	provider.languageModel = createChatModel;
	provider.chat = createChatModel;
	provider.messages = createChatModel;
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
	provider.tools = vertexAnthropicTools;
	return provider;
}
function createVertexAnthropic2(options = {}) {
	return createVertexAnthropic({
		...options,
		headers: async () => ({
			Authorization: `Bearer ${await generateAuthToken(options.googleCredentials)}`,
			...await resolve(options.headers)
		})
	});
}
var vertexAnthropic = createVertexAnthropic2();
export { vertexAnthropic as n, createVertexAnthropic2 as t };
