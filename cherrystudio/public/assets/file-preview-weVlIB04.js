const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./file-preview-qHyX6yLh.js","./utils-Bnoyl1me.js","./clsx-QWGtB080.js","./react-C1DTAr29.js","./rolldown-runtime-D8OvLAZx.js","./dayjs.min-BBb2vAs7.js","./resolver-Bn-i1elC.js","./preload-helper-Cs2ugBNd.js","./i18next-CqNcSVOM.js","./initReactI18next-BofyZ-Nu.js","./PreferenceService-CvpJqJd7.js","./isEqual-C7zEE0RK.js","./schemas-1oAyIgyK.js","./LoggerService-ChVOAPl8.js","./file-x-2-Dj-hGZMg.js","./createLucideIcon-iAH3Or8b.js","./Icon-ChXzzEWu.js","./react-dom-D5lMhlFn.js","./react-error-boundary-CnvE_Ln4.js","./useTranslation-DRFkwCLq.js","./jsx-runtime-Cc0-uZGc.js","./shim-2TzZzGeK.js","./with-selector-DFVq3c2Y.js","./empty-state-IUSabDcM.js","./button-BBhIgYp8.js","./dist-CHDMmyuS.js","./dist-D11Gudy9.js","./dist-D9lByzdX.js","./createLucideIcon-Du0e9oPs.js","./FilePreview-BEX76iC8.js","./file-question-mark-C75geVg6.js","./file-warning-fWEPemj9.js","./folder-open-Dy927fy9.js","./loader-circle-Cmg2d8Jz.js","./FilePreviewLayout-luXf9AC0.js","./scrollbar-DXc_RNdR.js","./throttle-BH60huJ9.js","./debounce-fOdNUTaO.js","./FilePreviewToolbar-DXhEtJV1.js","./FilePreviewToolbarButton-CGx3ExsV.js","./tooltip-a5SkzYdn.js","./dist-Cc8kG5V_.js","./portal-container-Cc9NoOZQ.js","./dist-DG2FHWbq.js","./style-BQVh98fR.js","./bundle-mjs-DzarEL82.js","./ipc-DpcwPFwy.js","./IpcError-CvtL-yge.js","./toast-D2efAzAF.js","./toast-BtN4jQ2l.js","./triangle-alert-eafrks-C.js","./info-RPr70zgf.js","./x-CpgRfh3_.js","./safeOpen-Bi1Ifzr9.js","./file-C14fz2kP.js","./filePreview-CGUDTTTP.js","./file-CkrjUGO_.js","./file-OKCzlHoD.js","./codeLanguages-DLij47cE.js","./tab-CVOgL8bf.js","./useWindowInitData-BzKs7Qq9.js","./mainWindowNavigation-Dpzd_Ttr.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as __vitePreload } from "./preload-helper-Cs2ugBNd.js";
import { t as reactUse } from "./utils-DnGPxu7s.js";
import { d as isModuleNotFoundError } from "./useStore-dDlHYNm4.js";
import { n as createRoute } from "./route-DjYENu2s.js";
import { a as parseFilePreviewRouteSearch } from "./filePreview-CGUDTTTP.js";
function createFileRoute(path) {
	if (typeof path === "object") return new FileRoute(path, { silent: true }).createRoute(path);
	return new FileRoute(path, { silent: true }).createRoute;
}
var FileRoute = class {
	constructor(path, _opts) {
		this.path = path;
		this.createRoute = (options) => {
			const route = createRoute(options);
			route.isRoot = false;
			return route;
		};
		this.silent = _opts?.silent;
	}
};
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function lazyRouteComponent(importer, exportName) {
	let loadPromise;
	let comp;
	let error;
	let reload;
	const load = () => {
		if (!loadPromise) loadPromise = importer().then((res) => {
			loadPromise = void 0;
			comp = res[exportName ?? "default"];
		}).catch((err) => {
			error = err;
			if (isModuleNotFoundError(error)) {
				if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
					const storageKey = `tanstack_router_reload:${error.message}`;
					if (!sessionStorage.getItem(storageKey)) {
						sessionStorage.setItem(storageKey, "1");
						reload = true;
					}
				}
			}
		});
		return loadPromise;
	};
	const lazyComp = function Lazy(props) {
		if (reload) {
			window.location.reload();
			throw new Promise(() => {});
		}
		if (error) throw error;
		if (!comp) if (reactUse) reactUse(load());
		else throw load();
		return import_react.createElement(comp, props);
	};
	lazyComp.preload = load;
	return lazyComp;
}
var $$splitComponentImporter = () => __vitePreload(() => import("./file-preview-qHyX6yLh.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]), import.meta.url);
const Route = createFileRoute("/app/file-preview")({
	validateSearch: (search) => parseFilePreviewRouteSearch(search),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
export { lazyRouteComponent as n, createFileRoute as r, Route as t };
