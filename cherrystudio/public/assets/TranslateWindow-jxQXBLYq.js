import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./LoggerService-oVV4iwe6.js";
import "./error-3V5V4Mev.js";
import "./PreferenceService-uLlqCRc6.js";
import { t as isEmpty } from "./isEmpty-D8zepxXt.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-yBX61WcV.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./es2015-DmjbZU9-.js";
import { t as scrollbar_default } from "./scrollbar-u8WAeDey.js";
import "./ipc-BDTAufGC.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import { t as toast } from "./toast-DsSiWKrR.js";
import { t as ArrowLeftRight } from "./arrow-left-right-C5BnKrEM.js";
import { t as useDefaultModel } from "./useModel-wPmUe3o8.js";
import { r as useTranslate } from "./translate-piZrmqIV.js";
import "./model-Z1svQByC.js";
import "./MessagePartsContext-vl7JGECh.js";
import { t as useHotkeys } from "./react-hotkeys-hook.esm-wkMq5OC3.js";
import { t as LanguageSelect_default } from "./LanguageSelect-DWmaQbBk.js";
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
