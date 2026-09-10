import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./LoggerService-ChVOAPl8.js";
import "./error-CskkREu_.js";
import "./PreferenceService-CvpJqJd7.js";
import { t as isEmpty } from "./isEmpty-C6tZbbPv.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as useTranslation } from "./useTranslation-DRFkwCLq.js";
import "./react-dom-D5lMhlFn.js";
import { n as usePreference } from "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import "./es2015-wfS3L7va.js";
import { t as scrollbar_default } from "./scrollbar-DXc_RNdR.js";
import "./ipc-DpcwPFwy.js";
import "./model-BOGgSmTN.js";
import "./aiSdk-C-csCQz7.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import { t as toast } from "./toast-D2efAzAF.js";
import { t as ArrowLeftRight } from "./arrow-left-right-DFjZtt8w.js";
import "./systemProviderId-B4QvwwvR.js";
import "./agentRuntimeCapabilities-C7UvdsI7.js";
import "./provider-bQl8RVRp.js";
import { t as useDefaultModel } from "./useModel-kU1hKaYa.js";
import { t as useHotkeys } from "./react-hotkeys-hook.esm-Bq09MseZ.js";
import "./MessagePartsContext-Be-3g0sl.js";
import { r as useTranslate } from "./translate-Bffouxb4.js";
import { t as LanguageSelect_default } from "./LanguageSelect-D4DOnjAe.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var Translate = ({ text }) => {
	const [result, setResult] = (0, import_react.useState)("");
	const [targetLanguage, setTargetLanguage] = usePreference("feature.translate.mini_window.target_lang");
	const { translateModel } = useDefaultModel();
	const { t } = useTranslation();
	const { translate: runTranslate, cancel } = useTranslate({
		loggerContext: "TranslateWindow",
		onResponse: setResult
	});
	const translateCurrentText = (0, import_react.useEffectEvent)(() => {
		if (!text.trim() || !translateModel) {
			cancel();
			return;
		}
		runTranslate(text, targetLanguage);
	});
	(0, import_react.useEffect)(() => {
		translateCurrentText();
	}, [
		text,
		targetLanguage,
		translateModel?.id
	]);
	useHotkeys("c", () => {
		navigator.clipboard.writeText(result);
		toast.success(t("message.copy.success"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "quick-assistant.translate",
		className: "flex flex-1 flex-col overflow-hidden p-3 [-webkit-app-region:no-drag]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex w-full flex-row items-center justify-center gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-9 min-w-25 flex-1 items-center rounded-md border border-input bg-muted px-3 text-foreground-disabled text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: t("translate.any.language")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-4 shrink-0 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect_default, {
					showSearch: true,
					value: targetLanguage,
					className: "min-w-32.5 flex-1",
					optionFilterProp: "label",
					onChange: async (value) => {
						return await setTargetLanguage(value);
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-full flex-1 overflow-hidden",
			children: isEmpty(result) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-foreground-tertiary italic",
				children: [t("translate.output.placeholder"), "..."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(scrollbar_default, {
				className: "flex flex-1 flex-col gap-2.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full whitespace-pre-wrap break-words",
					children: result
				})
			})
		})]
	});
};
var TranslateWindow_default = Translate;
export { TranslateWindow_default as default };
