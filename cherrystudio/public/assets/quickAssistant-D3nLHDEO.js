import { s as __toESM } from "./chunk-DiqNceaa.js";
import "./abortSignalPolyfill-KatcZ07J.js";
/* empty css                */
import { t as require_client } from "./client-TaGHv70X.js";
import "./LoggerService-oVV4iwe6.js";
import "./PreferenceService-uLlqCRc6.js";
import "./useCache-SsOQx-L2.js";
import "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-eUld2ti5.js";
import "./i18next-DBAWv9hQ.js";
import "./react-BgPOU4At.js";
import { a as prepareWindow, i as ThemeProvider, n as useCustomCss, r as WindowFatalFallback, t as useLanguageSync } from "./useLanguageSync-BKR-zfcH.js";
import "./react-dom-CKbeLgrG.js";
import "./usePreference-yBX61WcV.js";
import "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import "./react-error-boundary-B3KJNPcX.js";
import "./es2015-DmjbZU9-.js";
import "./diff-HM2C_nqz.js";
import "./with-selector-BMhODuKS.js";
import "./dist-Cu7DuZHc.js";
import "./useCodeStyle-ZK5esKOR.js";
import "./useTheme-C0NcZaKl.js";
import "./useMermaid-CRrUmNsD.js";
import "./shiki-408EkuKH.js";
import { n as CodeStyleProvider, t as PopupHost } from "./PopupHost-_axdx3Fv.js";
import "./ipc-BDTAufGC.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-BQINHMNg.js";
import "./file-KsLXrn8b.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DsSiWKrR.js";
import "./popup-C0FVl5N5.js";
import "./mcp-UjkdK7II.js";
import "./label-CBJ9J2cR.js";
import "./provider-AVUknhIB.js";
import "./model-3irbiX6r.js";
import "./uiParts-CtZmiNbl.js";
import "./customCssMigration-kFDGIria.js";
import { t as ToastHost } from "./ToastHost-DtMy4OYe.js";
import "./useModel-wPmUe3o8.js";
import "./useProvider-BIst-GY7.js";
import "./model-Z1svQByC.js";
import "./useTimer-Brbjkb3R.js";
import "./transport-CTTVYBal.js";
import "./partsHelpers-DL2R_tcG.js";
import "./useTopicStreamStatus-C4wq2WGe.js";
import "./useAssistant-D7pB4IBa.js";
import "./useTemporaryTopic-BIojapW3.js";
import { t as HomeWindow_default } from "./HomeWindow-BRr-y0q3.js";
import "./react-hotkeys-hook.esm-wkMq5OC3.js";
import "./ModelAvatar-BgaF2qGi.js";
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
