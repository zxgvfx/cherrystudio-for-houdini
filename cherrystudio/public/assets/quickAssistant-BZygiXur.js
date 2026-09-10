import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import "./abortSignalPolyfill-CroYRteo.js";
/* empty css                */
import { t as require_client } from "./client-Dri0ImSL.js";
import "./LoggerService-ChVOAPl8.js";
import "./PreferenceService-CvpJqJd7.js";
import "./platform-fGkkNTU9.js";
import "./dataApiDevtools-Bm4JBknU.js";
import "./dayjs.min-BBb2vAs7.js";
import "./resolver-Bn-i1elC.js";
import "./i18next-CqNcSVOM.js";
import "./react-C1DTAr29.js";
import { a as prepareWindow, i as ThemeProvider, n as useCustomCss, r as WindowFatalFallback, t as useLanguageSync } from "./useLanguageSync-C9ExgPoX.js";
import "./react-dom-D5lMhlFn.js";
import "./usePreference-DRNUEk4I.js";
import "./utils-Bnoyl1me.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import "./shim-2TzZzGeK.js";
import "./react-error-boundary-CnvE_Ln4.js";
import "./es2015-wfS3L7va.js";
import "./diff-KPuWBc9d.js";
import "./with-selector-DlsRhNV6.js";
import "./dist-oTn6Mzbo.js";
import "./useCodeStyle-hWHmowmT.js";
import "./useTheme-mM6gKAcD.js";
import "./shiki-g8Tr0-KC.js";
import { n as CodeStyleProvider, t as PopupHost } from "./PopupHost-ORVBzrBR.js";
import "./ipc-DpcwPFwy.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-CrY8yFbh.js";
import "./CacheService-IyXh62g9.js";
import "./useCache-lF6Sw_ck.js";
import "./file-OKCzlHoD.js";
import "./model-BOGgSmTN.js";
import "./DataApiService-Csr1w5Kb.js";
import "./useDataApi-H7ZhyZ_J.js";
import "./toast-D2efAzAF.js";
import "./popup-fJcKiA2S.js";
import "./mcp-BGt1L-d_.js";
import "./label-CSb71add.js";
import "./systemProviderId-B4QvwwvR.js";
import "./provider-0IejLFjL.js";
import "./naming-BVJSQooI.js";
import "./provider-bQl8RVRp.js";
import "./uiParts-ClY38h-2.js";
import "./customCssMigration-CzAWBFG-.js";
import { t as ToastHost } from "./ToastHost-IGq0t1_z.js";
import "./useExecutionOverlay-Cx6lCsHu.js";
import "./messageListItem-DqE378fB.js";
import "./useModel-kU1hKaYa.js";
import "./useProvider-DvntuFRN.js";
import "./capabilities-DNV_QUgI.js";
import "./model-BCwc3I-J.js";
import "./useAssistant-DKYAwKxt.js";
import "./useTemporaryTopic-fC-UaU_K.js";
import "./useTopicStreamStatus-Be-jC8fI.js";
import "./partsHelpers-DtgJJM4X.js";
import { t as HomeWindow_default } from "./HomeWindow-8Tw_H_Ml.js";
import "./react-hotkeys-hook.esm-Bq09MseZ.js";
import "./ModelAvatar-Dlf3Jj6Z.js";
import "./useTimer-CtD1TRRj.js";
var import_client = require_client();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function QuickAssistantRuntime() {
	useLanguageSync();
	useCustomCss();
	return null;
}
function QuickAssistantApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryCustomized, {
		fallbackComponent: WindowFatalFallback,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CodeStyleProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAssistantRuntime, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryCustomized, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeWindow_default, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopupHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastHost, {})
		] }) })
	});
}
var QuickAssistantApp_default = QuickAssistantApp;
await prepareWindow({ preference: [
	"app.language",
	"ui.custom_css",
	"ui.theme_mode",
	"ui.theme_user.color_primary",
	"ui.window_style",
	"feature.quick_assistant.assistant_id",
	"feature.quick_assistant.read_clipboard_at_startup"
] });
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAssistantApp_default, {}));
