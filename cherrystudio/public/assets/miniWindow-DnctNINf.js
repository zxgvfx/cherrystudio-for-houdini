import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { t as require_client } from "./client-DWQtM338.js";
import { n as AntdProvider_default, r as require_lib } from "./LanguageSelect-CZ6Tj4PS.js";
import { Xo as loggerService } from "./es-CRkf9ice.js";
import { Ra as ErrorBoundaryWrapper, Si as getToastUtilities, Uf as StoreSyncService_default, Wf as Provider_default, fa as CodeStyleProvider, fc as useSettings, n as store_default, t as persistor, ya as ThemeProvider } from "./store-DxDhJR5y.js";
import "./dayjs.min-A7WN91xd.js";
import { t as require_react } from "./react-1FqkuScD.js";
import "./stylis-BaN_JEhW.js";
import "./ImageViewer-CM8D5DNp.js";
import "./Component-DHxvSiB1.js";
import { t as HomeWindow_default } from "./HomeWindow-BMYj_m-8.js";
import "./styled-components.browser.esm-BcmQ0ilM.js";
import "./dist-Ca8EYzZO.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cpik8iNG.js";
import "./dist-DM-0cBjw.js";
import "./katex-D5SCYXV3.js";
import "./dist-D5MdU1Xy.js";
import "./purify.es--yUqBK1B.js";
import "./markdown-it-BvXFV0GV.js";
import "./EventStreamCodec-BiFEcBYJ.js";
import { t as PersistGate } from "./react-PgPPq49X.js";
import "./en_US-1EeIq2iX.js";
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
