import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { n as AntdProvider_default, r as require_lib } from "./LanguageSelect-DJ5SZzEn.js";
import { Ko as loggerService, t as require_jsx_runtime } from "./jsx-runtime-B4r10XlC.js";
import { Ef as Provider_default, Na as ErrorBoundaryWrapper, Tf as StoreSyncService_default, ma as ThemeProvider, n as persistor, qs as useSettings, r as store_default, sa as CodeStyleProvider, vi as getToastUtilities } from "./store-BcxWZwLI.js";
import "./dayjs.min-COl7sqdH.js";
import { t as require_react } from "./react-CGLB_Dcb.js";
import "./stylis-CGNjFRAJ.js";
import "./ImageViewer-DE5Xxwp6.js";
import "./Component-BnbUztei.js";
import { t as HomeWindow_default } from "./HomeWindow-D-uJl2HI.js";
import "./dist-aTvvHKIL.js";
import "./dist-jHQCAtXo.js";
import "./katex-Cpd4UQ-s.js";
import "./dist-MOdv-LBH.js";
import "./purify.es-CuN2L7KX.js";
import "./markdown-it-Dc_WBnmF.js";
import "./EventStreamCodec-urIXJldl.js";
import { t as require_client } from "./client-CHeN2K28.js";
import { t as PersistGate } from "./react-BZCwWD0n.js";
import "./en_US-BucIHOzM.js";
var import_client = require_client();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function MiniWindowContent() {
	const { customCss } = useSettings();
	(0, import_react.useEffect)(() => {
		let customCssElement = document.getElementById("user-defined-custom-css");
		if (customCssElement) customCssElement.remove();
		if (customCss) {
			customCssElement = document.createElement("style");
			customCssElement.id = "user-defined-custom-css";
			customCssElement.textContent = customCss;
			document.head.appendChild(customCssElement);
		}
	}, [customCss]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeWindow_default, {});
}
function MiniWindow() {
	(0, import_react.useEffect)(() => {
		window.toast = getToastUtilities();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider_default, {
		store: store_default,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntdProvider_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeStyleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistGate, {
			loading: null,
			persistor,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniWindowContent, {}) })
		}) }) }) })
	});
}
var MiniWindowApp_default = MiniWindow;
loggerService.initWindowSource("MiniWindow");
function initKeyv() {
	window.keyv = new import_lib.default();
	window.keyv.init();
}
initKeyv();
StoreSyncService_default.subscribe();
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniWindowApp_default, {}));
