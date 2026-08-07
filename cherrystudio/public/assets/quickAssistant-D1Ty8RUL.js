import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./abortSignalPolyfill-KatcZ07J.js";
/* empty css                */
import { t as require_client } from "./client-BiEbbPYr.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-Ba0ofBX2.js";
import "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import "./react-BgPOU4At.js";
import { a as prepareWindow, i as ThemeProvider, n as useCustomCss, r as WindowFatalFallback, t as useLanguageSync } from "./useLanguageSync-C-PwJtmI.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-78czMD_R.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./react-error-boundary-B3KJNPcX.js";
import "./es2015-DmjbZU9-.js";
import "./diff-HM2C_nqz.js";
import "./with-selector-BMhODuKS.js";
import "./dist-Cu7DuZHc.js";
import "./useCodeStyle-ZK5esKOR.js";
import "./useTheme-CbMe73se.js";
import "./useMermaid-BXipJuXT.js";
import "./shiki-pLteNJ2v.js";
import { n as CodeStyleProvider, t as PopupHost } from "./PopupHost-D6GX_Gcr.js";
import "./ipc-BDTAufGC.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-BQINHMNg.js";
import "./file-KsLXrn8b.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DKTI9lZN.js";
import "./popup-BqV2ZD7D.js";
import "./mcp-BYi31fTn.js";
import "./label-B7fCsuWT.js";
import "./provider-DxZtFw5B.js";
import "./model-J88ZZ_lQ.js";
import "./uiParts-B-0xzcKJ.js";
import "./customCssMigration-CL_Jb19d.js";
import { t as ToastHost } from "./ToastHost-Bh6080H2.js";
import "./useModel-CIp4kGrE.js";
import "./useProvider-DEPjZhOC.js";
import "./model-D4kd6G9w.js";
import "./useTimer-B4RsTlvl.js";
import "./transport-0repP7FI.js";
import "./partsHelpers-BYW3sR0L.js";
import "./useTopicStreamStatus-C4CQlzhh.js";
import "./useAssistant-BNTbY6l-.js";
import "./useTemporaryTopic-BFezI0fe.js";
import { t as HomeWindow_default } from "./HomeWindow-DBvSgzDG.js";
import "./react-hotkeys-hook.esm-CQVE5KWH.js";
import "./ModelAvatar-B9O4au8z.js";
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
