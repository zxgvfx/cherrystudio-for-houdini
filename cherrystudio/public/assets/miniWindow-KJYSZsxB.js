import { a as __toESM } from "./chunk-BilcBJ05.js";
import { t as require_client } from "./client-oe-m2DQS.js";
import { n as AntdProvider_default, r as require_lib } from "./LanguageSelect-y82eiJhD.js";
import { ls as loggerService } from "./es-CLFTGHaZ.js";
import { Ea as ErrorBoundaryCustomized, cc as useSettings, ea as CodeStyleProvider, fi as getToastUtilities, n as store_default, sa as ThemeProvider, t as persistor, vm as StoreSyncService_default, ym as Provider_default } from "./store-CA5bo1r8.js";
import "./dayjs.min-D9b6NYuk.js";
import { t as require_react } from "./react-CySG9LcS.js";
import "./ImageViewer-B3NMHBkG.js";
import "./stylis-DmBHAH98.js";
import "./Component-BRH6-HJR.js";
import { t as HomeWindow_default } from "./HomeWindow-ol8v-qR3.js";
import "./dist-DHB7VIdx.js";
import "./styled-components.browser.esm-uS3mDXI2.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DuRsdr50.js";
import "./dist-BRteDD4O.js";
import "./purify.es-BGPp4qon.js";
import "./markdown-it-6plNOQ7K.js";
import { t as PersistGate } from "./react-BDb9GNWZ.js";
import "./en_US-DaFt_RpW.js";
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryCustomized, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniWindowContent, {}) })
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
