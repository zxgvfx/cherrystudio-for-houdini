import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { Ko as loggerService, t as require_jsx_runtime } from "./jsx-runtime-B4r10XlC.js";
import { Ef as Provider_default, Tf as StoreSyncService_default, ma as ThemeProvider, n as persistor, r as store_default } from "./store-BcxWZwLI.js";
import "./dayjs.min-COl7sqdH.js";
import "./react-CGLB_Dcb.js";
import "./stylis-CGNjFRAJ.js";
import "./ImageViewer-DE5Xxwp6.js";
import "./Component-BnbUztei.js";
import "./dist-aTvvHKIL.js";
import "./dist-jHQCAtXo.js";
import "./katex-Cpd4UQ-s.js";
import "./dist-MOdv-LBH.js";
import "./purify.es-CuN2L7KX.js";
import "./markdown-it-Dc_WBnmF.js";
import "./EventStreamCodec-urIXJldl.js";
import { t as require_client } from "./client-CHeN2K28.js";
import { t as PersistGate } from "./react-BZCwWD0n.js";
import "./DynamicIcon-IXbwd0Xo.js";
import { t as SelectionToolbar_default } from "./SelectionToolbar-qjtxPQ8k.js";
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
