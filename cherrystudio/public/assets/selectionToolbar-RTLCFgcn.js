import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { t as require_client } from "./client-BqJEnEoB.js";
import { Zo as loggerService } from "./es-DkAVbmke.js";
import { Xf as Provider_default, Yf as StoreSyncService_default, ba as ThemeProvider, n as store_default, t as persistor } from "./store-BGJt4Ep3.js";
import "./dayjs.min-A7WN91xd.js";
import "./react-1FqkuScD.js";
import "./stylis-BaN_JEhW.js";
import "./ImageViewer-DYgRjhpa.js";
import "./Component-SVUcMpmS.js";
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
import "./DynamicIcon-CHlEx6E0.js";
import { t as SelectionToolbar_default } from "./SelectionToolbar-DueFdGku.js";
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
