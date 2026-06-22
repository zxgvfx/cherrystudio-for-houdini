import { o as __toESM } from "./chunk-0ogMdkZ1.js";
import { t as require_client } from "./client-DWQtM338.js";
import { Xo as loggerService } from "./es-CRkf9ice.js";
import { Uf as StoreSyncService_default, Wf as Provider_default, n as store_default, t as persistor, ya as ThemeProvider } from "./store-DxDhJR5y.js";
import "./dayjs.min-A7WN91xd.js";
import "./react-1FqkuScD.js";
import "./stylis-BaN_JEhW.js";
import "./ImageViewer-CM8D5DNp.js";
import "./Component-DHxvSiB1.js";
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
import "./DynamicIcon-2qwl9MEU.js";
import { t as SelectionToolbar_default } from "./SelectionToolbar-iJapuXGh.js";
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
