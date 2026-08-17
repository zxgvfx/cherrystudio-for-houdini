const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./file-preview-B190dHHt.js","./utils-DqZKxyln.js","./clsx-CQMseKZW.js","./react-DXAbXv4a.js","./rolldown-runtime-BeJLVFtF.js","./dayjs.min-EuyAzn7r.js","./resolver-CZPudlzl.js","./preload-helper-DXC6tWlX.js","./i18next-D3kAsMbP.js","./initReactI18next-BmJnUitX.js","./PreferenceService-ay5pWhVK.js","./isEqual-DO7BtJs5.js","./schemas-CV_EtlSZ.js","./LoggerService-CbighP69.js","./file-x-2-BeaOQ_Pc.js","./createLucideIcon-B9V3xxkc.js","./Icon-C_BHijq2.js","./react-dom-D-tOyCJ4.js","./react-error-boundary-1QFJEaxP.js","./useTranslation-DXBMLNgN.js","./jsx-runtime-DZOd5Dcc.js","./shim-4_R-7_4j.js","./with-selector-DOSXj2wE.js","./empty-state-C_9tC-cn.js","./button-Bb_7V8uR.js","./dist-CIFumK1O.js","./dist-DrTTjll5.js","./dist-CilunzGD.js","./createLucideIcon-DA_gQr32.js","./FilePreview-CDXNRwka.js","./file-question-mark-mTPwo8L4.js","./file-warning-ui1zoWuR.js","./folder-open-_dxyNNmN.js","./loader-circle-DIMPUHfk.js","./FilePreviewLayout-CwTr3bPn.js","./scrollbar-6bETwjbG.js","./throttle-CxpDA6MQ.js","./debounce-RtBWGQ3U.js","./FilePreviewToolbar-B4BS_Cd8.js","./FilePreviewToolbarButton-D2NN1_DC.js","./tooltip-CJBVkA5B.js","./dist-uhrWF5Y5.js","./portal-container-CJZY5KbV.js","./dist-BCEH2mJk.js","./style-C-RkFX_x.js","./bundle-mjs-D5m5eEe0.js","./ipc-BuGMWdaI.js","./IpcError-M3DORlSx.js","./toast-C6NqKFoQ.js","./toast-CTDSidj8.js","./triangle-alert-C_3aTl7W.js","./info-Ce_zTX1O.js","./x-BS4tSESx.js","./safeOpen-DGU5v2Xg.js","./file-Bb31h9pD.js","./filePreview-Bzjo3HcD.js","./file-C52KaMrN.js","./file-BaEpIJyZ.js","./codeLanguages-YsZif4Se.js","./tab-BIOOjV6R.js","./useWindowInitData-nzW1IbOc.js","./mainWindowNavigation-BoKv8CTA.js"])))=>i.map(i=>d[i]);
import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { t as __vitePreload } from "./preload-helper-DXC6tWlX.js";
import { t as reactUse } from "./utils-CKBORfL_.js";
import { d as isModuleNotFoundError } from "./useStore-BVKk9vF2.js";
import { n as createRoute } from "./route-CXgrgsxy.js";
import { a as parseFilePreviewRouteSearch } from "./filePreview-Bzjo3HcD.js";
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
var $$splitComponentImporter = () => __vitePreload(() => import("./file-preview-B190dHHt.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]), import.meta.url);
const Route = createFileRoute("/app/file-preview")({
	validateSearch: (search) => parseFilePreviewRouteSearch(search),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
export { lazyRouteComponent as n, createFileRoute as r, Route as t };
