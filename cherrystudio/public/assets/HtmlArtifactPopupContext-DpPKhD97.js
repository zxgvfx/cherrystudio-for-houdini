const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./HtmlArtifactView-BJBP81tJ.js","./utils-Bnoyl1me.js","./clsx-QWGtB080.js","./react-C1DTAr29.js","./rolldown-runtime-D8OvLAZx.js","./preload-helper-Cs2ugBNd.js","./iconify-C6gOqm1j.js","./tooltip-a5SkzYdn.js","./dist-Cc8kG5V_.js","./portal-container-Cc9NoOZQ.js","./react-dom-D5lMhlFn.js","./jsx-runtime-Cc0-uZGc.js","./dist-DG2FHWbq.js","./dist-oTn6Mzbo.js","./lib-cWyaA6i9.js","./zwitch-D4MLDKRr.js","./error-CskkREu_.js","./dist-CK6lZPpu.js","./schemas-1oAyIgyK.js","./i18next-CqNcSVOM.js","./model-BOGgSmTN.js","./errorDetails-CwhHRObo.js","./IpcError-CvtL-yge.js","./aiSdk-C-csCQz7.js","./dayjs.min-BBb2vAs7.js","./resolver-Bn-i1elC.js","./initReactI18next-BofyZ-Nu.js","./PreferenceService-CvpJqJd7.js","./isEqual-C7zEE0RK.js","./LoggerService-ChVOAPl8.js","./Parser-HXWnDM2J.js","./decode-BHVWJaD1.js","./code-xml-CzB7lZj2.js","./createLucideIcon-iAH3Or8b.js","./Icon-ChXzzEWu.js","./compass-7ypFlb6p.js","./download-WNh7i55M.js","./eye-CtOlZgqN.js","./maximize-2-B2iaKESx.js","./shield-alert-DKNZMa4a.js","./zoom-in-C4WfI5mS.js","./zoom-out-BsUOfzYu.js","./button-BBhIgYp8.js","./dist-CHDMmyuS.js","./dist-D11Gudy9.js","./dist-D9lByzdX.js","./createLucideIcon-Du0e9oPs.js","./useTranslation-DRFkwCLq.js","./HtmlPreviewFrame-B5On9r5n.js","./CodeViewer-DvhZTSjd.js","./esm-Dxo6iURQ.js","./debounce-fOdNUTaO.js","./usePreference-DRNUEk4I.js","./useCodeStyle-hWHmowmT.js","./style-BQVh98fR.js","./bundle-mjs-DzarEL82.js","./shiki-g8Tr0-KC.js","./asyncInitializer-B9PC8Ae7.js","./uuid-DhKGupY-.js","./v4-D_N0UQip.js","./ScrollOwnershipContext-Cz9Tjpos.js","./toast-D2efAzAF.js","./toast-BtN4jQ2l.js","./triangle-alert-eafrks-C.js","./info-RPr70zgf.js","./x-CpgRfh3_.js","./formats-BV-MUlSZ.js","./agentRuntimeCapabilities-C7UvdsI7.js","./provider-bQl8RVRp.js","./systemProviderId-B4QvwwvR.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var HtmlArtifactPopupContext = (0, import_react.createContext)(null);
var HtmlArtifactPopupOutlet = (0, import_react.lazy)(() => __vitePreload(() => import("./HtmlArtifactView-BJBP81tJ.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]), import.meta.url).then((module) => ({ default: module.HtmlArtifactPopupOutlet })));
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
