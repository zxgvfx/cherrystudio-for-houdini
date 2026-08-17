import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import "./abortSignalPolyfill-KatcZ07J.js";
/* empty css                */
import { t as require_client } from "./client-CL1qLRYW.js";
import "./LoggerService-CbighP69.js";
import "./PreferenceService-ay5pWhVK.js";
import "./platform-CINZzEpE.js";
import "./dataApiDevtools-D0Xh4YeJ.js";
import "./dayjs.min-EuyAzn7r.js";
import "./resolver-CZPudlzl.js";
import "./i18next-D3kAsMbP.js";
import "./react-DXAbXv4a.js";
import { a as prepareWindow, i as ThemeProvider, n as useCustomCss, r as WindowFatalFallback, t as useLanguageSync } from "./useLanguageSync-Al9p-zPL.js";
import "./react-dom-D-tOyCJ4.js";
import "./usePreference-ChTcu0lP.js";
import "./utils-DqZKxyln.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
import "./shim-4_R-7_4j.js";
import "./react-error-boundary-1QFJEaxP.js";
import "./es2015-CF8XujIC.js";
import "./diff-BkIMdlj4.js";
import "./with-selector-YZwnb76j.js";
import "./dist-CbafgI8N.js";
import "./useCodeStyle-zD0Sb1Ey.js";
import "./useTheme-CkJQYl0u.js";
import "./shiki-5X_PGXXr.js";
import { n as CodeStyleProvider, t as PopupHost } from "./PopupHost-fHyOqzfs.js";
import "./ipc-BuGMWdaI.js";
import { t as ErrorBoundaryCustomized } from "./ErrorBoundary-Bijb9tIO.js";
import "./CacheService-BxZWLQeF.js";
import "./useCache-DNNSH80c.js";
import "./file-BaEpIJyZ.js";
import "./model-DbPSoCMM.js";
import "./DataApiService-De4qIOPj.js";
import "./useDataApi-DxcxHgaT.js";
import "./toast-C6NqKFoQ.js";
import "./popup-BLG-Gue5.js";
import "./mcp-CN-pwFr9.js";
import "./label-Grg6QUtw.js";
import "./systemProviderId-BF_COOhE.js";
import "./provider-6diZSUqp.js";
import "./naming-C7JIUN29.js";
import "./provider-B43PumwQ.js";
import "./uiParts-D7jaMraw.js";
import "./customCssMigration-CpKKPCjP.js";
import { t as ToastHost } from "./ToastHost-36bSxswo.js";
import "./partsHelpers-BRL-MkUw.js";
import "./useTopicStreamStatus-8sPVIB3X.js";
import "./useModel-DWj6Qb5f.js";
import "./useProvider-DFQPidMA.js";
import "./model-BGDvQJb9.js";
import "./useAssistant-qAhsBp_v.js";
import "./useTemporaryTopic-DGg0rPC3.js";
import { t as HomeWindow_default } from "./HomeWindow-CcBTcAk7.js";
import "./react-hotkeys-hook.esm-Bev6lfWe.js";
import "./ModelAvatar-BilEtvkp.js";
import "./useTimer-BCHMb2QP.js";
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
