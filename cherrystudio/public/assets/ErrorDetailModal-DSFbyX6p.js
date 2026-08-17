const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./errorDiagnosis-vWM3Kfst.js","./mcp-CN-pwFr9.js","./schemas-CV_EtlSZ.js","./error-B2Op57SY.js","./dist-DmJhY6Jt.js","./i18next-D3kAsMbP.js","./model-DbPSoCMM.js","./errorDetails-e0XF6LNW.js","./IpcError-M3DORlSx.js","./aiSdk-CmlhHSPA.js","./rolldown-runtime-BeJLVFtF.js","./dayjs.min-EuyAzn7r.js","./resolver-CZPudlzl.js","./preload-helper-DXC6tWlX.js","./initReactI18next-BmJnUitX.js","./PreferenceService-ay5pWhVK.js","./isEqual-DO7BtJs5.js","./LoggerService-CbighP69.js","./aiGeneration-B219ezQN.js","./toArray-DryE-6I0.js","./isArrayLike-qCM8LrC4.js","./toInteger-DIjY6RxA.js","./ipc-BuGMWdaI.js","./react-DXAbXv4a.js","./markdownLight-CPb9cwdQ.js","./find-C9LAhrgt.js","./citations-B3he2I9w.js","./citation-Njzn5Mjh.js","./formats-CgjOOl9i.js","./object-0mzFS11y.js","./toolOutput-CFeNIV-2.js","./knowledge-Cnld5F6B.js","./group-BlMwbJVX.js","./file-BaEpIJyZ.js","./file-C52KaMrN.js","./codeLanguages-YsZif4Se.js","./mcpToolName-DmIzMwU1.js","./message-B_yl0O_K.js","./uiParts-D7jaMraw.js","./model-BGDvQJb9.js","./registry-u6zu0ArP.js","./DataApiService-De4qIOPj.js","./dataApiDevtools-D0Xh4YeJ.js","./platform-CINZzEpE.js","./naming-C7JIUN29.js","./provider-B43PumwQ.js","./label-Grg6QUtw.js","./provider-6diZSUqp.js","./errorClassifier-UPNyM4xm.js","./agentRuntimeCapabilities-Dnr3VRWR.js","./systemProviderId-BF_COOhE.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as loggerService } from "./LoggerService-CbighP69.js";
import { A as isSerializedAiSdkNoSuchProviderError, C as isSerializedAiSdkInvalidPromptError, D as isSerializedAiSdkNoObjectGeneratedError, E as isSerializedAiSdkMessageConversionError, F as isSerializedAiSdkTypeValidationError, I as isSerializedAiSdkUnsupportedFunctionalityError, L as isSerializedError, M as isSerializedAiSdkRetryError, N as isSerializedAiSdkTooManyEmbeddingValuesForCallError, O as isSerializedAiSdkNoSpeechGeneratedError, P as isSerializedAiSdkToolCallRepairError, S as isSerializedAiSdkInvalidMessageRoleError, T as isSerializedAiSdkJSONParseError, _ as isSerializedAiSdkDownloadError, b as isSerializedAiSdkInvalidArgumentError, g as isSerializedAiSdkApiCallError, j as isSerializedAiSdkNoSuchToolError, k as isSerializedAiSdkNoSuchModelError, n as formatError, t as formatAiSdkError, u as safeToString, v as isSerializedAiSdkError, w as isSerializedAiSdkInvalidToolInputError, x as isSerializedAiSdkInvalidDataContentError, y as isSerializedAiSdkErrorUnion } from "./error-B2Op57SY.js";
import { r as resolver_default } from "./resolver-CZPudlzl.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { r as mergeUiProps, t as cn } from "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import { t as Button } from "./button-Bb_7V8uR.js";
import { n as useCodeStyle } from "./useCodeStyle-zD0Sb1Ey.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as CircleCheckBig } from "./circle-check-big-D9CBmYpq.js";
import { t as Copy } from "./copy-B5-oGRx4.js";
import { t as LoaderCircle } from "./loader-circle-DIMPUHfk.js";
import { t as Stethoscope } from "./stethoscope-BAUeG7kJ.js";
import { t as parseDataUrl } from "./dataUrl-RLS6DsdP.js";
import { t as CodeViewer_default } from "./CodeViewer-DmsmcVO3.js";
import { t as ContentPopup_default } from "./ContentPopup-DyrL_Lr_.js";
import { t as Scrollbar_default } from "./Scrollbar-DJ9MDpuH.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
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
			const { diagnoseError } = await __vitePreload(async () => {
				const { diagnoseError: diagnoseError$1 } = await import("./errorDiagnosis-vWM3Kfst.js");
				return { diagnoseError: diagnoseError$1 };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]), import.meta.url);
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
export { showErrorDetailPopup as n, ErrorDetailContent as t };
