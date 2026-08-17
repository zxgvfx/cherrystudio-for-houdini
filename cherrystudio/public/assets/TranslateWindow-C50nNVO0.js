import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./LoggerService-CbighP69.js";
import "./error-B2Op57SY.js";
import "./PreferenceService-ay5pWhVK.js";
import { t as isEmpty } from "./isEmpty-E8ry7LkJ.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as useTranslation } from "./useTranslation-DXBMLNgN.js";
import "./react-dom-D-tOyCJ4.js";
import { n as usePreference } from "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import "./es2015-CF8XujIC.js";
import { t as scrollbar_default } from "./scrollbar-6bETwjbG.js";
import "./ipc-BuGMWdaI.js";
import "./model-DbPSoCMM.js";
import "./aiSdk-CmlhHSPA.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import { t as toast } from "./toast-C6NqKFoQ.js";
import { t as ArrowLeftRight } from "./arrow-left-right-ioLOBshH.js";
import "./systemProviderId-BF_COOhE.js";
import "./agentRuntimeCapabilities-Dnr3VRWR.js";
import "./provider-B43PumwQ.js";
import { t as useDefaultModel } from "./useModel-DWj6Qb5f.js";
import { t as useHotkeys } from "./react-hotkeys-hook.esm-Bev6lfWe.js";
import { r as useTranslate } from "./translate-BOBQuPLK.js";
import "./MessagePartsContext-C8SysI78.js";
import { t as LanguageSelect_default } from "./LanguageSelect-BjZPP4Vx.js";
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
