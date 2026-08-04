import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { t as require_client } from "./client-BqJEnEoB.js";
import { n as AntdProvider_default, r as require_lib } from "./LanguageSelect-BjEvo9EV.js";
import { Zo as loggerService } from "./es-DkAVbmke.js";
import { Ci as getToastUtilities, Xf as Provider_default, Yf as StoreSyncService_default, ba as ThemeProvider, n as store_default, pa as CodeStyleProvider, pc as useSettings, t as persistor, za as ErrorBoundaryWrapper } from "./store-BGJt4Ep3.js";
import "./dayjs.min-A7WN91xd.js";
import { t as require_react } from "./react-1FqkuScD.js";
import "./stylis-BaN_JEhW.js";
import "./ImageViewer-DYgRjhpa.js";
import "./Component-SVUcMpmS.js";
import { t as HomeWindow_default } from "./HomeWindow-BFJtQ2gj.js";
import "./styled-components.browser.esm-B07kmh63.js";
import "./dist-CpPsvXqm.js";
import { t as require_jsx_runtime } from "./jsx-runtime-T-fCGkSK.js";
import "./dist-AP7xzSwj.js";
import "./katex-DL1vLdSP.js";
import "./dist-DBMjR7eK.js";
import "./purify.es-DVK4qXZQ.js";
import "./markdown-it-VJd6GpLO.js";
import "./EventStreamCodec-Cd0W3c71.js";
import { t as PersistGate } from "./react-F8N3xTkn.js";
import "./en_US-ClyrJkqd.js";
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
