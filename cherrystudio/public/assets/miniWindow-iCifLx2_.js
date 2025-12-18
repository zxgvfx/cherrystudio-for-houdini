import { g as __toESM } from "./chunk-st2fFX3F.js";
import { c as AppHeroUIProvider, d as AntdProvider_default, e as ToastPortal, f as require_lib } from "./LanguageSelect-v98Fxf9J.js";
import { f3 as loggerService } from "./es-C7gg5F5w.js";
import { c as persistor, cq as getToastUtilities, d as store_default, d8 as CodeStyleProvider, df as ThemeProvider, fS as useSettings, jX as StoreSyncService_default, jZ as Provider_default } from "./store-Cu6DN42A.js";
import { b as require_react } from "./react-Cs7_W7Sm.js";
import "./v4-_VdBfIuS.js";
import "./dayjs.min-U3mmM7gw.js";
import { b as require_jsx_runtime } from "./jsx-runtime-VX_aOJrC.js";
import "./ImageViewer-C62pMHpu.js";
import "./dist-DljPbAPG.js";
import "./dist-DdcLErxA.js";
import "./preload-helper-BMYLnTBu.js";
import "./internal-Dhi1dCTx.js";
import "./edge-3nQCkgcX.js";
import "./edge-DdVIh9LQ.js";
import "./stylis-BjTM3uyy.js";
import "./Component-DSlWG0rr.js";
import "./createLucideIcon-jMI35CFY.js";
import "./arrow-up-right-CNsBHbnt.js";
import "./at-sign-xTGnPodW.js";
import "./camera-dkUy5-ny.js";
import "./check-B83soOyU.js";
import "./chevron-down-DQTDa4tv.js";
import "./chevron-left-D7JKNHox.js";
import "./chevron-right-CXYX9XBh.js";
import "./chevron-up-DemTCl1S.js";
import "./chevrons-down-up-6nkpCTPE.js";
import "./chevrons-up-down-t2QV6Dcz.js";
import "./circle-arrow-left-d1czQReV.js";
import "./circle-pause-DeGD0I61.js";
import "./circle-play-CX64iSSB.js";
import "./circle-question-mark-CRXB0Y0T.js";
import "./circle-x-Btc5rhit.js";
import "./code-xml-D7OXxlxe.js";
import "./code-O1iQ3_Yk.js";
import "./copy-D3xZcu-G.js";
import "./corner-down-left-sxETZo9-.js";
import "./download-4RY1w6yh.js";
import "./ellipsis-vertical-hwLOuxg7.js";
import "./eye-B9JlB5mS.js";
import "./file-code-D0YW9bV4.js";
import "./file-pen-line-VUtn3cTm.js";
import "./file-search-Cpw-cIfE.js";
import "./file-text-CLQ4i-wx.js";
import "./forward-CcRJZZO_.js";
import "./globe-C5z0RFaE.js";
import "./image-BjZ1swck.js";
import "./languages-DQ--Dzel.js";
import "./lightbulb-B033avh-.js";
import "./link-DgxnF9dV.js";
import "./list-checks-DvoHetOg.js";
import "./maximize-2-CkwXCJJC.js";
import "./maximize-Bbadv7b-.js";
import "./menu-v-no0s_j.js";
import "./message-square-izgj7kkC.js";
import "./minimize-2-BGhR8ngr.js";
import "./minus-W7iJaaEq.js";
import "./notebook-pen-BEC2d7wp.js";
import "./paperclip-pb5PAWtA.js";
import "./pencil-D1umxxOY.js";
import "./pin-AiYhAgYo.js";
import "./refresh-cw-BCGKhaPu.js";
import "./rotate-ccw-DLP537cR.js";
import "./save-DsEYOVMx.js";
import "./scan-Cp4KTaiy.js";
import "./search-DCQj0Gj3.js";
import "./send-PSMeq6g4.js";
import "./settings-2-0Y24daJe.js";
import "./shield-check-OUg8bs9_.js";
import "./sparkle-D9ufbh4W.js";
import "./sparkles--OromKM_.js";
import "./split-B5jcEyd8.js";
import "./square-pen-fY-dRxzY.js";
import "./square-split-horizontal-Dxmbp-rT.js";
import "./square-D7oCXyW7.js";
import "./text-DDO9A2_f.js";
import "./thumbs-up-DNDZsFG2.js";
import "./trash-DOR5BdsB.js";
import "./triangle-alert-DW7EbPTu.js";
import "./upload-DxynKgGw.js";
import "./wrap-text-DPxUCeCy.js";
import "./x-rvgp0iND.js";
import "./zoom-in-ABwsqExz.js";
import "./zoom-out-DIfv10G0.js";
import { b as HomeWindow_default, d as ErrorBoundaryCustomized } from "./HomeWindow-B1ud1iAz.js";
import "./emotion-is-prop-valid.esm-B2kLQv7X.js";
import "./module-B3cvBXXU.js";
import "./es-BokE909h.js";
import "./dist-DzKOcZda.js";
import "./dist-fgFHyV9x.js";
import "./dist-Cn5RiyRu.js";
import "./katex-7bqOEKAb.js";
import "./decode-Bp4nUNek.js";
import "./purify.es-C6MO4CcO.js";
import { b as require_client } from "./client-1wQDZEWn.js";
import { b as PersistGate } from "./react-dJ6r6XrM.js";
import "./en_US-BG3puM0i.js";
var import_client = /* @__PURE__ */ __toESM(require_client());
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react = /* @__PURE__ */ __toESM(require_react());
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppHeroUIProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntdProvider_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeStyleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistGate, {
			loading: null,
			persistor,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundaryCustomized, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniWindowContent, {}) })
		}) }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastPortal, {})] })
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
const root = (0, import_client.createRoot)(document.getElementById("root"));
root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniWindowApp_default, {}));
