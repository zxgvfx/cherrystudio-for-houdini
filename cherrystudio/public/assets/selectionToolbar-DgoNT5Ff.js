import { a as __toESM } from "./chunk-BilcBJ05.js";
import { t as require_client } from "./client-oe-m2DQS.js";
import { ls as loggerService } from "./es-CLFTGHaZ.js";
import { n as store_default, sa as ThemeProvider, t as persistor, vm as StoreSyncService_default, ym as Provider_default } from "./store-CA5bo1r8.js";
import "./dayjs.min-D9b6NYuk.js";
import "./react-CySG9LcS.js";
import "./ImageViewer-B3NMHBkG.js";
import "./stylis-DmBHAH98.js";
import "./Component-BRH6-HJR.js";
import "./dist-DHB7VIdx.js";
import "./styled-components.browser.esm-uS3mDXI2.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DuRsdr50.js";
import "./dist-BRteDD4O.js";
import "./purify.es-BGPp4qon.js";
import "./markdown-it-6plNOQ7K.js";
import { t as PersistGate } from "./react-BDb9GNWZ.js";
import "./DynamicIcon-CAi1tSF_.js";
import { t as SelectionToolbar_default } from "./SelectionToolbar-BNKdhaJz.js";
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
