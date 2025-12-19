import { C as loadOptionalSetting, D as loadSetting, J as resolve, O as withUserAgentSuffix, P as withoutTrailingSlash, X as NoSuchModelError, t as getRuntimeEnvironmentUserAgent } from "./dist-mVY8hbYS.js";
import { b as AnthropicMessagesLanguageModel, c as anthropicTools } from "./internal-jvHTVTvv.js";
var VERSION = "3.0.79";
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
			headers: withUserAgentSuffix({ "Content-Type": "application/x-www-form-urlencoded" }, `ai-sdk/google-vertex/${VERSION}`, getRuntimeEnvironmentUserAgent()),
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
function createVertexAnthropic(options = {}) {
	var _a;
	const location = loadOptionalSetting({
		settingValue: options.location,
		environmentVariableName: "GOOGLE_VERTEX_LOCATION"
	});
	const project = loadOptionalSetting({
		settingValue: options.project,
		environmentVariableName: "GOOGLE_VERTEX_PROJECT"
	});
	const baseURL = (_a = withoutTrailingSlash(options.baseURL)) != null ? _a : `https://${location === "global" ? "" : location + "-"}aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/anthropic/models`;
	const createChatModel = (modelId) => {
		var _a2;
		return new AnthropicMessagesLanguageModel(modelId, {
			provider: "vertex.anthropic.messages",
			baseURL,
			headers: (_a2 = options.headers) != null ? _a2 : {},
			fetch: options.fetch,
			buildRequestUrl: (baseURL2, isStreaming) => `${baseURL2}/${modelId}:${isStreaming ? "streamRawPredict" : "rawPredict"}`,
			transformRequestBody: (args) => {
				const { model,...rest } = args;
				return {
					...rest,
					anthropic_version: "vertex-2023-10-16"
				};
			},
			supportedUrls: () => ({})
		});
	};
	const provider = function(modelId) {
		if (new.target) throw new Error("The Anthropic model function cannot be called with the new keyword.");
		return createChatModel(modelId);
	};
	provider.languageModel = createChatModel;
	provider.chat = createChatModel;
	provider.messages = createChatModel;
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
	provider.tools = anthropicTools;
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
export { createVertexAnthropic2 as b, vertexAnthropic as c };
