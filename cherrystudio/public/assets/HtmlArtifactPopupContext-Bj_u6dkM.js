const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./HtmlArtifactView-C426b5Bp.js","./utils-DqZKxyln.js","./clsx-CQMseKZW.js","./react-DXAbXv4a.js","./rolldown-runtime-BeJLVFtF.js","./preload-helper-DXC6tWlX.js","./iconify-CuvVQaA6.js","./tooltip-CJBVkA5B.js","./dist-uhrWF5Y5.js","./portal-container-CJZY5KbV.js","./react-dom-D-tOyCJ4.js","./jsx-runtime-DZOd5Dcc.js","./dist-BCEH2mJk.js","./dist-CbafgI8N.js","./lib-AqQ05U-c.js","./zwitch-CMg-OEjI.js","./error-B2Op57SY.js","./dist-DmJhY6Jt.js","./schemas-CV_EtlSZ.js","./i18next-D3kAsMbP.js","./model-DbPSoCMM.js","./errorDetails-e0XF6LNW.js","./IpcError-M3DORlSx.js","./aiSdk-CmlhHSPA.js","./dayjs.min-EuyAzn7r.js","./resolver-CZPudlzl.js","./initReactI18next-BmJnUitX.js","./PreferenceService-ay5pWhVK.js","./isEqual-DO7BtJs5.js","./LoggerService-CbighP69.js","./Parser-DPwNZwi0.js","./decode-9PbUlI0g.js","./code-xml-xQj19L0j.js","./createLucideIcon-B9V3xxkc.js","./Icon-C_BHijq2.js","./compass-WNFF2rBX.js","./download-CMdP8Q_t.js","./eye-DgGv-EmO.js","./maximize-2-upx7BRxa.js","./shield-alert-hdKITYYr.js","./zoom-in-mEMTROIZ.js","./zoom-out-AwQWE2ez.js","./button-Bb_7V8uR.js","./dist-CIFumK1O.js","./dist-DrTTjll5.js","./dist-CilunzGD.js","./createLucideIcon-DA_gQr32.js","./useTranslation-DXBMLNgN.js","./HtmlPreviewFrame-ue531-vM.js","./CodeViewer-DmsmcVO3.js","./esm-CA5JRyYP.js","./debounce-RtBWGQ3U.js","./usePreference-ChTcu0lP.js","./useCodeStyle-zD0Sb1Ey.js","./style-C-RkFX_x.js","./bundle-mjs-D5m5eEe0.js","./shiki-5X_PGXXr.js","./asyncInitializer-DlV1NBgp.js","./uuid-85lqhJWx.js","./v4-B6Ihluzs.js","./ScrollOwnershipContext-B284g1nN.js","./toast-C6NqKFoQ.js","./toast-CTDSidj8.js","./triangle-alert-C_3aTl7W.js","./info-Ce_zTX1O.js","./x-BS4tSESx.js","./formats-CgjOOl9i.js","./agentRuntimeCapabilities-Dnr3VRWR.js","./provider-B43PumwQ.js","./systemProviderId-BF_COOhE.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DZOd5Dcc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var HtmlArtifactPopupContext = (0, import_react.createContext)(null);
var HtmlArtifactPopupOutlet = (0, import_react.lazy)(() => __vitePreload(() => import("./HtmlArtifactView-C426b5Bp.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]), import.meta.url).then((module) => ({ default: module.HtmlArtifactPopupOutlet })));
function useOptionalHtmlArtifactPopupContext() {
	return (0, import_react.use)(HtmlArtifactPopupContext);
}
function useHtmlArtifactPopupContext() {
	const popupContext = useOptionalHtmlArtifactPopupContext();
	if (!popupContext) throw new Error("HTML artifact popup components must be rendered within HtmlArtifactPopupHost");
	return popupContext;
}
function HtmlArtifactPopupHost({ children }) {
	const [approvedInteractiveHtmlById, setApprovedInteractiveHtmlById] = (0, import_react.useState)({});
	const [popupSession, setPopupSession] = (0, import_react.useState)(null);
	const approveInteractiveHtml = (0, import_react.useCallback)((artifactId, html) => {
		setApprovedInteractiveHtmlById((current) => current[artifactId] === html ? current : {
			...current,
			[artifactId]: html
		});
	}, []);
	const openPopup = (0, import_react.useCallback)((session) => {
		setPopupSession(session);
	}, []);
	const syncPopup = (0, import_react.useCallback)((update) => {
		setPopupSession((current) => {
			if (!current || current.artifactId !== update.artifactId) return current;
			if (current.html === update.html && current.title === update.title && current.onSave === update.onSave && current.editable === update.editable && current.kind === update.kind) return current;
			return {
				...current,
				...update
			};
		});
	}, []);
	const closePopup = (0, import_react.useCallback)(() => {
		setPopupSession(null);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HtmlArtifactPopupContext, {
		value: (0, import_react.useMemo)(() => ({
			approvedInteractiveHtmlById,
			popupSession,
			approveInteractiveHtml,
			openPopup,
			syncPopup,
			closePopup
		}), [
			approvedInteractiveHtmlById,
			approveInteractiveHtml,
			closePopup,
			openPopup,
			popupSession,
			syncPopup
		]),
		children: [children, popupSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlArtifactPopupOutlet, {})
		}) : null]
	});
}
export { useHtmlArtifactPopupContext as n, useOptionalHtmlArtifactPopupContext as r, HtmlArtifactPopupHost as t };
