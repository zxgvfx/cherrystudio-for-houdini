import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { A as isSerializedAiSdkNoSuchToolError, C as isSerializedAiSdkInvalidToolInputError, D as isSerializedAiSdkNoSpeechGeneratedError, E as isSerializedAiSdkNoObjectGeneratedError, F as isSerializedAiSdkUnsupportedFunctionalityError, I as isSerializedError, M as isSerializedAiSdkTooManyEmbeddingValuesForCallError, N as isSerializedAiSdkToolCallRepairError, O as isSerializedAiSdkNoSuchModelError, P as isSerializedAiSdkTypeValidationError, S as isSerializedAiSdkInvalidPromptError, T as isSerializedAiSdkMessageConversionError, _ as isSerializedAiSdkError, b as isSerializedAiSdkInvalidDataContentError, g as isSerializedAiSdkDownloadError, h as isSerializedAiSdkApiCallError, j as isSerializedAiSdkRetryError, k as isSerializedAiSdkNoSuchProviderError, l as safeToString, n as formatError, r as formatErrorMessage, t as formatAiSdkError, v as isSerializedAiSdkErrorUnion, w as isSerializedAiSdkJSONParseError, x as isSerializedAiSdkInvalidMessageRoleError, y as isSerializedAiSdkInvalidArgumentError } from "./error-3V5V4Mev.js";
import { t as fetchGenerate } from "./aiGeneration-Dqw73yb1.js";
import { r as resolver_default } from "./resolver-eUld2ti5.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { a as mergeUiProps, i as UiDataSlot, r as cn } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { n as useCodeStyle } from "./useCodeStyle-ZK5esKOR.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as CircleAlert } from "./circle-alert-BkebTlp2.js";
import { t as CircleCheckBig } from "./circle-check-big-DCuYaEij.js";
import { t as Copy } from "./copy-DLNIVOlq.js";
import { t as LoaderCircle } from "./loader-circle-CyzyZXyF.js";
import { t as Stethoscope } from "./stethoscope-BAc0KC40.js";
import { n as createPopup } from "./popup-C0FVl5N5.js";
import { r as readDefaultModel } from "./model-3irbiX6r.js";
import { g as parseDataUrl } from "./image-Bb803VSe.js";
import { E as CHERRYAI_PROVIDER_ID, T as CHERRYAI_DEFAULT_UNIQUE_MODEL_ID } from "./model-Z1svQByC.js";
import { t as Scrollbar_default } from "./Scrollbar-CJJ8_OkK.js";
import { t as CodeViewer_default } from "./CodeViewer-J2JSI1xF.js";
import { t as ContentPopup_default } from "./ContentPopup-lY8Dcfc2.js";
import { n as isMcpErrorMessage, r as isQuotaErrorMessage } from "./errorClassifier-CVVtI9xZ.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var PopupContainer = ({ open, resolve, title, content, okText, cancelText, danger, icon, action }) => {
	const { t } = useTranslation();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleCancel = (0, import_react.useCallback)(() => {
		if (loading) return;
		resolve(false);
	}, [loading, resolve]);
	const handleConfirm = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			await action();
		} catch (error) {
			toast.error({
				title: t("common.error"),
				description: formatErrorMessage(error)
			});
			setLoading(false);
			return;
		}
		resolve(true);
	}, [
		action,
		resolve,
		t
	]);
	const handleOpenChange = (0, import_react.useCallback)((next) => {
		if (!next) handleCancel();
	}, [handleCancel]);
	const leadingIcon = icon === null ? null : icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-5 shrink-0 text-warning" });
	const okLabel = okText ?? (danger ? t("common.delete") : t("common.confirm"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			showCloseButton: false,
			closeOnOverlayClick: !loading,
			overlayClassName: "z-[90]",
			className: cn("confirm-popup z-[90] gap-5 sm:max-w-lg"),
			onInteractOutside: (event) => {
				if (loading) event.preventDefault();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [leadingIcon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "text-base leading-6",
							children: title
						}) : null, content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiDataSlot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("wrap-anywhere mt-2 min-w-0 max-w-full text-muted-foreground text-sm leading-5", title ? "" : "mt-0"),
								children: content
							}) })
						}) : null]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: handleCancel,
				disabled: loading,
				children: cancelText ?? t("common.cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: danger ? "destructive" : "default",
				onClick: handleConfirm,
				loading,
				children: okLabel
			})] })]
		})
	});
};
var ConfirmActionPopup_default = createPopup(PopupContainer, { dismissResult: false });
var logger$1 = loggerService.withContext("errorDiagnosis");
async function getCherryAiDefaultFreeModel() {
	try {
		const defaultModel = (await ipcApi.request("ai.provider.model.list", { providerId: CHERRYAI_PROVIDER_ID })).find((model) => model.id === CHERRYAI_DEFAULT_UNIQUE_MODEL_ID);
		return defaultModel?.id ? defaultModel : void 0;
	} catch {
		logger$1.warn("Failed to fetch the default CherryAI free model");
		return;
	}
}
async function buildModelsToTry(context) {
	const defaultModel = await readDefaultModel();
	const models = [];
	const cherryModel = await getCherryAiDefaultFreeModel();
	if (cherryModel) models.push(cherryModel);
	if (defaultModel && defaultModel.id !== context?.modelId && !models.some((m) => m.id === defaultModel.id)) models.push(defaultModel);
	return models;
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
	if (status === 401 || status === 403 || msg.includes("api_key") || msg.includes("unauthorized") || msg.includes("forbidden")) return `## Context\nThe user is calling ${errorInfo.provider || context?.providerName || "the provider"} API and got an authentication error. Cherry Studio lets users configure API keys per provider in provider settings.\n`;
	if (status === 402 || isQuotaErrorMessage(msg)) return `## Context\nThe user's quota or account balance is exhausted on ${errorInfo.provider || context?.providerName || "the provider"}. Suggest checking billing on the provider's website, topping up, or switching to a different provider. DO NOT suggest waiting or retrying - this is not a transient issue.\n`;
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
{"summary":"one-line","category":"auth|region|quota|rate_limit|model|network|proxy|content|server|context_length|payload|stream|parse|mcp|knowledge|ocr|deprecated|unknown","explanation":"2-3 sentences why this happened","steps":[{"text":"step 1"},{"text":"step 2"}]}

## Rules
- 2-4 concrete steps, reference actual provider/model name from error
- No URLs, no links, no restart suggestion, plain text only
- Distinguish rate_limit (too many requests, transient, retry soon) from quota (billing/balance exhausted, not transient, must top up)
- Distinguish region (geo-block, fix by proxy/switching provider) from auth (API key issue)
- For content (safety filter), suggest rephrasing, never billing/auth fixes

## Examples
Input: {"name":"APICallError","message":"invalid_api_key","status":401,"provider":"openai","modelId":"gpt-4"}
Output: {"summary":"OpenAI API key is invalid or expired","category":"auth","explanation":"The OpenAI server rejected the request because the API key is invalid, expired, or has been revoked.","steps":[{"text":"Open provider settings and check your OpenAI API key is correct"},{"text":"Verify the API key is still active in your OpenAI dashboard"}]}

Input: {"name":"APICallError","message":"Rate limit exceeded","status":429,"provider":"openai","modelId":"gpt-4"}
Output: {"summary":"OpenAI rate limit hit due to too many requests","category":"rate_limit","explanation":"The OpenAI server is throttling because the request rate exceeded the allowed limit for this model. This is not a billing issue.","steps":[{"text":"Wait a few seconds before sending the next request"},{"text":"Slow down concurrent or repeated requests to gpt-4"},{"text":"Switch to a model with a higher rate limit if this happens often"}]}

Input: {"name":"APICallError","message":"insufficient_quota: You exceeded your current quota","status":429,"provider":"openai"}
Output: {"summary":"OpenAI account balance is exhausted","category":"quota","explanation":"The OpenAI account has run out of available credit or quota, so further requests are rejected until the balance is topped up.","steps":[{"text":"Check the billing page of your OpenAI account and top up credit"},{"text":"Switch to another provider with available quota in provider settings"}]}`;
	const content = JSON.stringify(errorInfo);
	const modelsToTry = await buildModelsToTry(context);
	let lastError = null;
	for (const model of modelsToTry) try {
		const response = await fetchGenerate({
			prompt,
			content,
			model
		});
		if (!response) {
			logger$1.warn(`Empty response from model ${model.id}, trying next`);
			lastError = /* @__PURE__ */ new Error(`Empty response from model: ${model.id}`);
			continue;
		}
		return parseResponse(response);
	} catch (err) {
		logger$1.warn(`Diagnosis failed with model ${model.id}`, err);
		lastError = err;
		continue;
	}
	logger$1.error("All diagnosis models failed", lastError);
	throw lastError || /* @__PURE__ */ new Error("All diagnosis models failed");
}
async function classifyErrorByAI(error, language) {
	const prompt = `You are an error diagnosis assistant for Cherry Studio. Summarize this error in one sentence (max 30 words) in ${language}. Return ONLY the summary text, no JSON, no markdown, no quotes.`;
	const content = `Error: ${error.name}: ${error.message}`;
	const modelsToTry = await buildModelsToTry();
	for (const model of modelsToTry) try {
		const response = await fetchGenerate({
			prompt,
			content,
			model
		});
		if (response?.trim()) return response.trim();
	} catch {
		continue;
	}
	return "";
}
var logger = loggerService.withContext("AIDiagnosisSection");
var AI_DIAGNOSIS_RESULT_COLOR = "var(--muted-foreground)";
var diagPanelStyle = {
	border: "1px solid color-mix(in srgb, var(--primary) 15%, transparent)",
	background: "color-mix(in srgb, var(--primary) 3%, transparent)"
};
var stepBgStyle = { background: "color-mix(in srgb, var(--primary) 4%, transparent)" };
var AiDiagnosisSection_default = (0, import_react.memo)(({ error, status, onStatusChange, diagnosisContext, blockId, onDiagnosisComplete, cachedDiagnosis, ref }) => {
	const { t, i18n } = useTranslation();
	const [result, setResult] = (0, import_react.useState)(cachedDiagnosis ?? null);
	const [diagError, setDiagError] = (0, import_react.useState)("");
	const cancelledRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		cancelledRef.current = false;
		return () => {
			cancelledRef.current = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (status === "loading" && !cachedDiagnosis) runDiagnosis();
	}, []);
	const runDiagnosis = (0, import_react.useCallback)(async () => {
		if (!error) return;
		cancelledRef.current = false;
		onStatusChange("loading");
		setDiagError("");
		try {
			const diagnosis = await diagnoseError(error, i18n.language, diagnosisContext);
			if (cancelledRef.current) return;
			setResult(diagnosis);
			onStatusChange("done");
			if (blockId && onDiagnosisComplete) Promise.resolve().then(() => onDiagnosisComplete(blockId, diagnosis)).catch((error$1) => {
				logger.warn(`Failed to persist diagnosis for ${blockId}:`, { error: error$1 });
			});
		} catch (err) {
			if (cancelledRef.current) return;
			setDiagError(err instanceof Error ? err.message : "Diagnosis failed");
			onStatusChange("error");
		}
	}, [
		error,
		i18n.language,
		onStatusChange,
		diagnosisContext,
		blockId,
		onDiagnosisComplete
	]);
	import_react.useImperativeHandle(ref, () => ({ runDiagnosis }), [runDiagnosis]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.ai-diagnosis-section",
		className: "mt-4 rounded-lg p-3.5 px-4",
		style: diagPanelStyle,
		children: [
			status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 font-semibold text-sm",
				style: { color: "var(--primary)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						size: 14,
						className: "animation-rotate"
					}),
					t("error.diagnosis.ai_loading"),
					"..."
				]
			}),
			status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2.5 flex items-center gap-1.5 font-semibold text-sm",
				style: { color: "var(--error)" },
				children: diagError
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "cursor-pointer rounded border px-2 py-1 text-xs",
				style: {
					borderColor: "var(--border)",
					color: "var(--foreground)"
				},
				onClick: () => void runDiagnosis(),
				children: t("common.retry")
			})] }),
			status === "done" && result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2.5 flex items-center gap-1.5 font-semibold text-sm",
					style: { color: "var(--primary)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 14 }), t("error.diagnosis.ai_result")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[13px] leading-[1.7]",
					style: { color: AI_DIAGNOSIS_RESULT_COLOR },
					children: result.explanation || result.summary
				}),
				result.steps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2.5 flex flex-col gap-1.5",
					children: result.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px]",
						style: stepBgStyle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-bold text-[10px] text-primary-foreground",
							style: { background: "var(--primary)" },
							children: i + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step.text })]
					}, i))
				})
			] })
		]
	});
});
var truncateLargeData = (data, t) => {
	const isLikelyBase64 = parseDataUrl(data)?.isBase64 ?? false;
	if (!data || data.length <= 1e5) return {
		content: data,
		truncated: false,
		isLikelyBase64
	};
	if (isLikelyBase64) return {
		content: `[${t("error.base64DataTruncated")}]`,
		truncated: true,
		isLikelyBase64: true
	};
	return {
		content: data.slice(0, 1e5) + `\n\n... [${t("error.truncated")}]`,
		truncated: true,
		isLikelyBase64: false
	};
};
var ErrorDetailContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar_default, {
	className: cn("max-h-[60vh] pr-[5px]", className),
	...props
});
var ErrorDetailList = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.error-detail-list",
	className: cn("flex flex-col gap-4", className),
	...mergeUiProps(props, "ui.error-detail-list")
});
var ErrorDetailItem = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.error-detail-item",
	className: cn("flex flex-col gap-2", className),
	...mergeUiProps(props, "ui.error-detail-item")
});
var ErrorDetailLabel = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.error-detail-label",
	className: cn("font-semibold text-[14px] text-foreground", className),
	...mergeUiProps(props, "ui.error-detail-label")
});
var ErrorDetailValue = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.error-detail-value",
	className: cn("rounded-[4px] border border-border bg-background-subtle p-2 font-[var(--code-font-family)] text-[12px] text-foreground [word-break:break-word]", className),
	...mergeUiProps(props, "ui.error-detail-value")
});
var StackTrace = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "ui.stack-trace",
	className: cn("rounded-[6px] border border-error-border bg-background-subtle p-3 [&_pre]:m-0 [&_pre]:whitespace-pre-wrap [&_pre]:font-[var(--code-font-family)] [&_pre]:text-[12px] [&_pre]:text-error [&_pre]:leading-[1.4] [&_pre]:[word-break:break-word]", className),
	...mergeUiProps(props, "ui.stack-trace")
});
var TruncatedBadge = ({ className, style, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "ui.truncated-badge",
	className: cn("ml-2 rounded-[4px] px-1.5 py-0.5 font-normal text-[10px] text-warning", className),
	style: {
		background: "var(--warning-subtle)",
		...style
	},
	...mergeUiProps(props, "ui.truncated-badge")
});
var BuiltinError = (0, import_react.memo)(({ error }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		error.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.name"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, {
			className: "selectable",
			children: error.name
		})] }),
		error.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.message"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, {
			className: "selectable",
			children: error.message
		})] }),
		error.stack && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.stack"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackTrace, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: error.stack }) })] })
	] });
});
var AiSdkErrorBase = (0, import_react.memo)(({ error }) => {
	const { t } = useTranslation();
	const tRef = (0, import_react.useRef)(t);
	(0, import_react.useEffect)(() => {
		tRef.current = t;
	}, [t]);
	const { highlightCode } = useCodeStyle();
	const [highlightedString, setHighlightedString] = (0, import_react.useState)("");
	const [isTruncated, setIsTruncated] = (0, import_react.useState)(false);
	const cause = error.cause;
	(0, import_react.useEffect)(() => {
		const highlight = async () => {
			try {
				const { content: truncatedCause, truncated, isLikelyBase64 } = truncateLargeData(cause || "", tRef.current);
				setIsTruncated(truncated);
				if (isLikelyBase64) {
					setHighlightedString(truncatedCause);
					return;
				}
				try {
					const parsed = JSON.parse(truncatedCause || "{}");
					setHighlightedString(await highlightCode(JSON.stringify(parsed, null, 2), "json"));
				} catch {
					setHighlightedString(truncatedCause || "");
				}
			} catch {
				setHighlightedString(cause || "");
			}
		};
		const timer = setTimeout(highlight, 0);
		return () => clearTimeout(timer);
	}, [highlightCode, cause]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuiltinError, { error }), cause && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [
		t("error.cause"),
		":",
		isTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedBadge, { children: t("error.truncatedBadge") })
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "markdown [&_pre]:bg-transparent! [&_pre_span]:whitespace-pre-wrap",
		dangerouslySetInnerHTML: { __html: highlightedString }
	}) })] })] });
});
var TruncatedCodeViewer = (0, import_react.memo)(({ value, label, language = "json" }) => {
	const { t } = useTranslation();
	const { content, truncated, isLikelyBase64 } = truncateLargeData(value, t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [
		label,
		":",
		truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedBadge, { children: t("error.truncatedBadge") })
	] }), isLikelyBase64 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: content }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeViewer_default, {
		value: content,
		className: "source-view selectable",
		language,
		expanded: true
	})] });
});
var AiSdkError = (0, import_react.memo)(({ error }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailList, { children: [
		(isSerializedAiSdkApiCallError(error) || isSerializedAiSdkDownloadError(error)) && error.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.requestUrl"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, {
			className: "selectable",
			children: error.url
		})] }),
		isSerializedAiSdkApiCallError(error) && error.responseBody && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedCodeViewer, {
			value: error.responseBody,
			label: t("error.responseBody")
		}),
		(isSerializedAiSdkApiCallError(error) || isSerializedAiSdkDownloadError(error)) && error.statusCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.statusCode"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, {
			className: "selectable",
			children: error.statusCode
		})] }),
		isSerializedAiSdkApiCallError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			error.responseHeaders && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.responseHeaders"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeViewer_default, {
				value: JSON.stringify(error.responseHeaders, null, 2),
				className: "source-view",
				language: "json",
				expanded: true
			})] }),
			error.requestBodyValues && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedCodeViewer, {
				value: safeToString(error.requestBodyValues),
				label: t("error.requestBodyValues")
			}),
			error.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruncatedCodeViewer, {
				value: safeToString(error.data),
				label: t("error.data")
			})
		] }),
		isSerializedAiSdkDownloadError(error) && error.statusText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.statusText"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.statusText })] }),
		isSerializedAiSdkInvalidArgumentError(error) && error.parameter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.parameter"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.parameter })] }),
		(isSerializedAiSdkInvalidArgumentError(error) || isSerializedAiSdkTypeValidationError(error)) && error.value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.value"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.value) })] }),
		isSerializedAiSdkInvalidDataContentError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.content"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.content) })] }),
		isSerializedAiSdkInvalidMessageRoleError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.role"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.role })] }),
		isSerializedAiSdkInvalidPromptError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.prompt"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.prompt) })] }),
		isSerializedAiSdkInvalidToolInputError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [error.toolName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.toolName"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.toolName })] }), error.toolInput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.toolInput"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.toolInput })] })] }),
		(isSerializedAiSdkJSONParseError(error) || isSerializedAiSdkNoObjectGeneratedError(error)) && error.text && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.text"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.text })] }),
		isSerializedAiSdkMessageConversionError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.originalMessage"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.originalMessage) })] }),
		isSerializedAiSdkNoSpeechGeneratedError(error) && error.responses && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.responses"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.responses.join(", ") })] }),
		isSerializedAiSdkNoObjectGeneratedError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			error.response && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.response"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.response) })] }),
			error.usage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.usage"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.usage) })] }),
			error.finishReason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.finishReason"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.finishReason })] })
		] }),
		(isSerializedAiSdkNoSuchModelError(error) || isSerializedAiSdkNoSuchProviderError(error) || isSerializedAiSdkTooManyEmbeddingValuesForCallError(error)) && error.modelId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.modelId"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.modelId })] }),
		(isSerializedAiSdkNoSuchModelError(error) || isSerializedAiSdkNoSuchProviderError(error)) && error.modelType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.modelType"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.modelType })] }),
		isSerializedAiSdkNoSuchProviderError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.providerId"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.providerId })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.availableProviders"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.availableProviders.join(", ") })] })] }),
		isSerializedAiSdkNoSuchToolError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.toolName"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.toolName })] }), error.availableTools && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.availableTools"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.availableTools?.join(", ") || t("common.none") })] })] }),
		isSerializedAiSdkRetryError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			error.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.reason"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.reason })] }),
			error.lastError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.lastError"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.lastError) })] }),
			error.errors && error.errors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.errors"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.errors.map((e) => safeToString(e)).join("\n\n") })] })
		] }),
		isSerializedAiSdkTooManyEmbeddingValuesForCallError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			error.provider && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.provider"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.provider })] }),
			error.maxEmbeddingsPerCall && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.maxEmbeddingsPerCall"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.maxEmbeddingsPerCall })] }),
			error.values && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.values"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.values) })] })
		] }),
		isSerializedAiSdkToolCallRepairError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.originalError"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: safeToString(error.originalError) })] }),
		isSerializedAiSdkUnsupportedFunctionalityError(error) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailLabel, { children: [t("error.functionality"), ":"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailValue, { children: error.functionality })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiSdkErrorBase, { error })
	] });
});
var ErrorDetailContent = ({ error, diagnosisContext, blockId, onDiagnosisComplete, cachedDiagnosis }) => {
	const { t } = useTranslation();
	const [diagStatus, setDiagStatus] = (0, import_react.useState)(cachedDiagnosis ? "done" : "idle");
	const diagSectionRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const isInitialRenderRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		if (isInitialRenderRef.current) {
			isInitialRenderRef.current = false;
			return;
		}
		if (diagStatus !== "idle") requestAnimationFrame(() => {
			containerRef.current?.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior: "smooth"
			});
		});
	}, [diagStatus]);
	const copyErrorDetails = (0, import_react.useCallback)(() => {
		if (!error) return;
		let errorText;
		if (isSerializedAiSdkError(error)) errorText = formatAiSdkError(error);
		else if (isSerializedError(error)) errorText = formatError(error);
		else errorText = safeToString(error);
		navigator.clipboard.writeText(errorText);
		toast.success(t("message.copied"));
	}, [error, t]);
	const renderErrorDetails = (error$1) => {
		if (!error$1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-ui": "ui.render-error-details",
			children: t("error.unknown")
		});
		if (isSerializedAiSdkErrorUnion(error$1)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiSdkError, { error: error$1 });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailList, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuiltinError, { error: error$1 }) });
	};
	const handleDiagnose = () => {
		if (diagStatus === "loading") return;
		setDiagStatus("loading");
		diagSectionRef.current?.runDiagnosis();
	};
	const getDiagButtonText = () => {
		switch (diagStatus) {
			case "loading": return t("error.diagnosis.ai_loading") + "...";
			case "done": return t("error.diagnosis.ai_done");
			default: return t("error.diagnosis.ai_button");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorDetailContainer, {
		ref: containerRef,
		children: [renderErrorDetails(error), diagStatus !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiDiagnosisSection_default, {
			ref: diagSectionRef,
			error,
			status: diagStatus,
			onStatusChange: setDiagStatus,
			diagnosisContext,
			blockId,
			onDiagnosisComplete,
			cachedDiagnosis
		}, blockId ?? error?.message)]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "ui.error-detail-content",
		className: "my-2 mt-4 flex justify-end gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			onClick: copyErrorDetails,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 }), t("common.copy")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			disabled: diagStatus === "loading",
			onClick: handleDiagnose,
			children: [diagStatus === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				size: 14,
				className: "animate-spin"
			}) : diagStatus === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { size: 14 }), getDiagButtonText()]
		})]
	})] });
};
function showErrorDetailPopup(params) {
	ContentPopup_default.show({
		title: resolver_default.t("error.detail"),
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorDetailContent, { ...params }),
		width: "60vw",
		styles: { content: {
			maxWidth: "1200px",
			minWidth: "600px"
		} }
	});
}
export { classifyErrorByAI as n, ConfirmActionPopup_default as r, showErrorDetailPopup as t };
