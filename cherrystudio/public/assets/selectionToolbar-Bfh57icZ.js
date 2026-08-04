import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { t as require_client } from "./client-DMmcWmzd.js";
import { Zo as loggerService } from "./es-CndCVlxX.js";
import { Jf as StoreSyncService_default, Yf as Provider_default, ba as ThemeProvider, n as store_default, t as persistor } from "./store-DRQKNOdQ.js";
import "./dayjs.min-A7WN91xd.js";
import "./react-1FqkuScD.js";
import "./stylis-BaN_JEhW.js";
import "./ImageViewer-BOsavF3D.js";
import "./Component-DLAh4rKR.js";
import "./styled-components.browser.esm-CWwHPchJ.js";
import "./dist-B0d1CYLd.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BEUwrBtJ.js";
import "./dist-B1WQMAJb.js";
import "./katex-BYiF-YTA.js";
import "./dist-NDLMieGj.js";
import "./purify.es-CkyOJxeY.js";
import "./markdown-it-BOysPDJQ.js";
import "./EventStreamCodec-DE3dEgH1.js";
import { t as PersistGate } from "./react-CVuFE9-Q.js";
import "./DynamicIcon-5MK1dgMA.js";
import { t as SelectionToolbar_default } from "./SelectionToolbar-5dFWAAd2.js";
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
