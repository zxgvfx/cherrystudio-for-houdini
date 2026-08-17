import { t as loggerService } from "./LoggerService-CbighP69.js";
import "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import { t as fetchGenerate } from "./aiGeneration-B219ezQN.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import "./react-DXAbXv4a.js";
import "./ipc-BuGMWdaI.js";
import "./file-BaEpIJyZ.js";
import "./file-C52KaMrN.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./message-B_yl0O_K.js";
import { t as dataApiService } from "./DataApiService-De4qIOPj.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import "./naming-C7JIUN29.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import { K as CHERRYAI_DEFAULT_UNIQUE_MODEL_ID } from "./provider-B43PumwQ.js";
import "./toolOutput-CFeNIV-2.js";
import "./citations-B3he2I9w.js";
import "./uiParts-D7jaMraw.js";
import "./model-BGDvQJb9.js";
import { n as isMcpErrorMessage, r as isQuotaErrorMessage } from "./errorClassifier-UPNyM4xm.js";
import "./citation-Njzn5Mjh.js";
import "./group-BlMwbJVX.js";
import "./knowledge-Cnld5F6B.js";
import "./find-C9LAhrgt.js";
var logger = loggerService.withContext("errorDiagnosis");
async function getCherryAiDefaultFreeModel() {
	const model = await dataApiService.get(`/models/${CHERRYAI_DEFAULT_UNIQUE_MODEL_ID}`);
	if (!model) throw new Error(`Diagnosis model not found: ${CHERRYAI_DEFAULT_UNIQUE_MODEL_ID}`);
	return model;
}
function buildContextHint(errorInfo, context) {
	const msg = [
		String(errorInfo.message || "").toLowerCase(),
		typeof errorInfo.responseBody === "string" ? errorInfo.responseBody.toLowerCase() : "",
		typeof errorInfo.data === "string" ? errorInfo.data.toLowerCase() : ""
	].filter(Boolean).join("\n");
	const status = Number(errorInfo.status) || 0;
	const finishReason = String(errorInfo.finishReason ?? "").toLowerCase();
	const source = context?.errorSource || String(errorInfo.source || "");
	if ([
		"content-filter",
		"content_filter",
		"safety",
		"recitation"
	].includes(finishReason)) return `## Context\nThe provider's safety system blocked this response (finishReason=${finishReason}). Suggest rephrasing the prompt or removing sensitive content. DO NOT suggest checking the API key or billing.\n`;
	if (msg.includes("unsupported_country") || msg.includes("country, region") || msg.includes("country/region") || msg.includes("region not supported") || msg.includes("not available in your region") || msg.includes("not available in your country") || msg.includes("not available in your location") || msg.includes("not available in your area") || msg.includes("not available in your territory") || msg.includes("territory") && (status === 403 || msg.includes("unsupported"))) return `## Context\n${errorInfo.provider || context?.providerName || "the provider"} is blocking the request because the user's IP region is not supported. This is NOT an API-key issue. Suggest configuring an HTTP/SOCKS proxy in system settings, or switching to a provider available in the user's region. DO NOT suggest changing the API key.\n`;
	if (status === 401 || msg.includes("api_key") || msg.includes("unauthorized")) return `## Context\nThe user is calling ${errorInfo.provider || context?.providerName || "the provider"} API and got an authentication error. Cherry Studio lets users configure API keys per provider in provider settings.\n`;
	if (status === 402 || isQuotaErrorMessage(msg)) return `## Context\nThe user's quota or account balance is exhausted on ${errorInfo.provider || context?.providerName || "the provider"}. Suggest checking billing on the provider's website, topping up, or switching to a different provider. DO NOT suggest waiting or retrying - this is not a transient issue.\n`;
	if (status === 403 || msg.includes("forbidden")) return `## Context\n${errorInfo.provider || context?.providerName || "the provider"} refused this request with HTTP 403. The API key was NOT rejected as invalid, so this is usually an account plan, key permission, or resource-access restriction rather than a wrong key. Read the provider's own error text in the error data before concluding. DO NOT tell the user their API key is invalid or suggest regenerating it unless the provider's error text says so.\n`;
	if (status === 429 || msg.includes("rate_limit") || msg.includes("rate limit") || msg.includes("too many requests")) return `## Context\nThe user is hitting a rate limit on ${errorInfo.provider || context?.providerName || "the provider"} due to too many requests in a short window. This is NOT a billing or quota issue - the user has not run out of credit. Suggest waiting briefly before retrying, slowing down request frequency, or switching to a model with a higher rate limit. DO NOT mention billing, recharging, top-up, or running out of quota.\n`;
	if (status === 404 || msg.includes("model_not_found") || msg.includes("model not found")) return `## Context\nModel "${errorInfo.modelId || context?.modelId || "unknown"}" was not found. The model may be deprecated, the ID may be wrong, or the user's API plan may not include this model.\n`;
	if (msg.includes("content_filter") || msg.includes("content_policy") || msg.includes("prohibited_content") || msg.includes("responsible_ai") || msg.includes("output_blocked") || msg.includes("\"safety\"") || msg.includes("recitation") || msg.includes("blocked by safety")) return `## Context\nThe provider's safety system blocked this request or response due to content policy. Suggest rephrasing the prompt, removing sensitive content, or switching to a model with looser safety filters. DO NOT suggest checking the API key or billing.\n`;
	if (isMcpErrorMessage(msg)) return `## Context\nMCP (Model Context Protocol) server error. Users manage MCP servers in MCP settings. Common issues: server not started, wrong configuration, connection timeout.\n`;
	if (msg.includes("context_length") || msg.includes("context window") || msg.includes("prompt is too long") || msg.includes("input is too long") || msg.includes("too many tokens")) return `## Context\nThe prompt exceeds the model's context window. Suggest clearing chat history, removing large attachments, or switching to a model with a larger context window. DO NOT suggest checking the API key.\n`;
	if (msg.includes("econnrefused") || msg.includes("timeout") || msg.includes("fetch failed") || msg.includes("proxy") || msg.includes("certificate")) return `## Context\nNetwork or proxy error. Cherry Studio supports HTTP/SOCKS proxy configuration in system settings. The user may be behind a firewall or using a custom API endpoint.\n`;
	if (msg.includes("embedding") || msg.includes("knowledge base")) return `## Context\nKnowledge base / embedding error. Users create knowledge bases with documents and use embedding models for retrieval.\n`;
	return `## Context\nCherry Studio is an AI chat app connecting to LLM providers (OpenAI, Anthropic, Google, Ollama, etc.) with API keys. Error occurred during ${source || "chat"}.\n`;
}
function parseResponse(raw) {
	let cleaned = raw.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/, "");
	if (!cleaned.trimStart().startsWith("{")) {
		const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
		if (jsonMatch) cleaned = jsonMatch[0];
	}
	const parsed = JSON.parse(cleaned);
	if (!parsed.summary || !Array.isArray(parsed.steps)) throw new Error("Invalid diagnosis response format");
	return {
		summary: parsed.summary,
		category: parsed.category || "unknown",
		explanation: parsed.explanation || parsed.summary,
		steps: parsed.steps.map((s) => ({ text: typeof s === "string" ? s : s.text }))
	};
}
async function diagnoseError(error, language, context) {
	const errorBag = error;
	const errorInfo = {
		name: error.name,
		message: error.message
	};
	const status = errorBag.statusCode ?? errorBag.status;
	if (status) errorInfo.status = status;
	if (context?.errorSource) errorInfo.source = context.errorSource;
	const provider = context?.providerName ?? errorBag.provider ?? errorBag.providerId;
	if (typeof provider === "string" && provider) errorInfo.provider = provider;
	const modelId = context?.modelId ?? errorBag.modelId;
	if (typeof modelId === "string" && modelId) errorInfo.modelId = modelId;
	const cause = errorBag.cause;
	if (cause && typeof cause === "string") errorInfo.cause = cause.slice(0, 400);
	const responseBody = errorBag.responseBody;
	if (responseBody && typeof responseBody === "string") errorInfo.responseBody = responseBody.slice(0, 800);
	const data = errorBag.data;
	if (data !== void 0 && data !== null) try {
		const dataString = typeof data === "string" ? data : JSON.stringify(data);
		if (dataString) errorInfo.data = dataString.slice(0, 400);
	} catch {}
	const finishReason = errorBag.finishReason;
	if (finishReason && typeof finishReason === "string") errorInfo.finishReason = finishReason;
	const url = errorBag.url;
	if (url && typeof url === "string") try {
		const parsed = new URL(url);
		errorInfo.endpoint = `${parsed.origin}${parsed.pathname}`;
	} catch {}
	const prompt = `You are an error diagnosis assistant for Cherry Studio, an AI chat desktop app.
Analyze the error and return a JSON diagnosis in ${language}.

${buildContextHint(errorInfo, context)}
## Output
Return ONLY valid JSON (no markdown, no code blocks):
{"summary":"one-line","category":"auth|permission|region|quota|rate_limit|model|network|proxy|content|server|context_length|payload|stream|parse|mcp|knowledge|ocr|deprecated|unknown","explanation":"2-3 sentences why this happened","steps":[{"text":"step 1"},{"text":"step 2"}]}

## Rules
- 2-4 concrete steps, reference actual provider/model name from error
- No URLs, no links, no restart suggestion, plain text only
- Distinguish rate_limit (too many requests, transient, retry soon) from quota (billing/balance exhausted, not transient, must top up)
- Distinguish region (geo-block, fix by proxy/switching provider) from auth (API key issue)
- Distinguish permission (HTTP 403, request refused - plan/entitlement/resource access) from auth (key itself rejected)
- For content (safety filter), suggest rephrasing, never billing/auth fixes

## Examples
Input: {"name":"APICallError","message":"invalid_api_key","status":401,"provider":"openai","modelId":"gpt-4"}
Output: {"summary":"OpenAI API key is invalid or expired","category":"auth","explanation":"The OpenAI server rejected the request because the API key is invalid, expired, or has been revoked.","steps":[{"text":"Open provider settings and check your OpenAI API key is correct"},{"text":"Verify the API key is still active in your OpenAI dashboard"}]}

Input: {"name":"APICallError","message":"Rate limit exceeded","status":429,"provider":"openai","modelId":"gpt-4"}
Output: {"summary":"OpenAI rate limit hit due to too many requests","category":"rate_limit","explanation":"The OpenAI server is throttling because the request rate exceeded the allowed limit for this model. This is not a billing issue.","steps":[{"text":"Wait a few seconds before sending the next request"},{"text":"Slow down concurrent or repeated requests to gpt-4"},{"text":"Switch to a model with a higher rate limit if this happens often"}]}

Input: {"name":"APICallError","message":"insufficient_quota: You exceeded your current quota","status":429,"provider":"openai"}
Output: {"summary":"OpenAI account balance is exhausted","category":"quota","explanation":"The OpenAI account has run out of available credit or quota, so further requests are rejected until the balance is topped up.","steps":[{"text":"Check the billing page of your OpenAI account and top up credit"},{"text":"Switch to another provider with available quota in provider settings"}]}`;
	const content = JSON.stringify(errorInfo);
	try {
		const model = await getCherryAiDefaultFreeModel();
		const response = await fetchGenerate({
			prompt,
			content,
			model,
			throwOnError: true
		});
		if (!response) throw new Error(`Empty response from model: ${model.id}`);
		return parseResponse(response);
	} catch (error$1) {
		logger.error("Free diagnosis model unavailable", error$1);
		throw new Error(resolver_default.t("error.diagnosis.free_model_unavailable"));
	}
}
async function classifyErrorByAI(error, language) {
	const prompt = `You are an error diagnosis assistant for Cherry Studio. Summarize this error in one sentence (max 30 words) in ${language}. Return ONLY the summary text, no JSON, no markdown, no quotes.`;
	const content = `Error: ${error.name}: ${error.message}`;
	try {
		return (await fetchGenerate({
			prompt,
			content,
			model: await getCherryAiDefaultFreeModel(),
			throwOnError: true
		}))?.trim() || "";
	} catch (error$1) {
		logger.warn("Free diagnosis model unavailable for error classification", error$1);
		return "";
	}
}
export { classifyErrorByAI, diagnoseError };
