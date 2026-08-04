import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { t as require_client } from "./client-m02CLza-.js";
import { Zo as loggerService } from "./es-BDLhINRJ.js";
import { Xf as Provider_default, Yf as StoreSyncService_default, ba as ThemeProvider, n as store_default, t as persistor } from "./store-D3I1EUFZ.js";
import "./dayjs.min-A7WN91xd.js";
import "./react-1FqkuScD.js";
import "./stylis-BaN_JEhW.js";
import "./ImageViewer-VzHMoqVA.js";
import "./Component-B_GKOkwQ.js";
import "./styled-components.browser.esm-CytjnjfA.js";
import "./dist-DYrs8EAA.js";
import { t as require_jsx_runtime } from "./jsx-runtime-B6WzJNpD.js";
import "./dist-BtLPB_E4.js";
import "./katex-Cc0oK20U.js";
import "./dist-BRteDD4O.js";
import "./purify.es-BGPp4qon.js";
import "./markdown-it-BuTTxTHS.js";
import "./EventStreamCodec-DDbUq8nk.js";
import { t as PersistGate } from "./react-Cjr9BAjq.js";
import "./DynamicIcon-yFQU1jFK.js";
import { t as SelectionToolbar_default } from "./SelectionToolbar-DlPG0UDC.js";
var import_client = require_client();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
loggerService.initWindowSource("SelectionToolbar");
StoreSyncService_default.subscribe();
var App = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider_default, {
		store: store_default,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistGate, {
			loading: null,
			persistor,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionToolbar_default, {})
		}) })
	});
};
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}));
