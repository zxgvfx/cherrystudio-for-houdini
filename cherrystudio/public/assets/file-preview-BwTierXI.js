const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./file-preview-BIlrjAMb.js","./dist-BGahvVh8.js","./clsx-Bu5J6-zp.js","./react-BgPOU4At.js","./chunk-DiqNceaa.js","./dayjs.min-CNu3tPBh.js","./resolver-eUld2ti5.js","./preload-helper-BAxOQgJR.js","./i18next-DBAWv9hQ.js","./useTranslation-DnuRkr5k.js","./PreferenceService-uLlqCRc6.js","./isEqual-DO7BtJs5.js","./schemas-CV_EtlSZ.js","./LoggerService-oVV4iwe6.js","./file-x-2-w4DLkOkc.js","./createLucideIcon-_uCXKA5i.js","./Icon-C4T_C224.js","./react-dom-CKbeLgrG.js","./react-error-boundary-B3KJNPcX.js","./jsx-runtime-DCB_IiL2.js","./shim-BiqNigny.js","./with-selector-C8NQ8H_Y.js","./empty-state-C4JfZPek.js","./button-Db6_VSWw.js","./dist-C0L0ClnX.js","./dist-5QAtVvkT.js","./createLucideIcon-e8mQLP44.js","./FilePreview-Hqr6AiGk.js","./file-question-mark-CEHETqsE.js","./file-warning-DsBgOFak.js","./folder-open-DuPB2puz.js","./loader-circle-CyzyZXyF.js","./FilePreviewLayout-BHC9_5NZ.js","./scrollbar-u8WAeDey.js","./throttle-B4IzJa_Q.js","./debounce-BIuc7S_h.js","./FilePreviewToolbar-C2Jz3S8R.js","./FilePreviewToolbarButton-CUtcvRPo.js","./tooltip-ZuayyV11.js","./dist-CQkuGX9q.js","./portal-container-CZkqeItp.js","./style-qqUWb85F.js","./bundle-mjs-CwOjJOmf.js","./ipc-BDTAufGC.js","./IpcError-D-kcO4bk.js","./toast-DsSiWKrR.js","./toast-DfLEw4mF.js","./triangle-alert-C25EdSwg.js","./info-CtmtWFPe.js","./safeOpen-BssvK0Fy.js","./file-CjuTUJva.js","./filePreview-HCbM3Csa.js","./file-DzPAqnYr.js","./file-KsLXrn8b.js","./codeLanguages-BfQ-PZy3.js","./tab-BoJ166Ld.js","./useWindowInitData-C8-CHwDP.js","./mainWindowNavigation-m8-JFOdz.js","./routeTitle-BAQAVa2r.js"])))=>i.map(i=>d[i]);
import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import { t as reactUse } from "./utils-DVFGIRL7.js";
import { d as isModuleNotFoundError, n as invariant } from "./useStore-DJ7KNTtC.js";
import { d as trimPathLeft, f as trimPathRight, s as joinPaths } from "./ClientOnly-l_ZlsUIW.js";
import { n as redirect, r as rootRouteId } from "./redirect-Daxff24Y.js";
import { t as Link } from "./link-Bjd-ZTRy.js";
import { t as useMatch } from "./useMatch-fTlmYmxR.js";
import { t as useParams } from "./useParams-BtlVNn2w.js";
import { t as useSearch } from "./useSearch-BGqMIlqi.js";
import { t as useNavigate } from "./useNavigate-Co8njXzY.js";
import { a as parseFilePreviewRouteSearch } from "./filePreview-HCbM3Csa.js";
var BaseRoute = class {
	get to() {
		return this._to;
	}
	get id() {
		return this._id;
	}
	get path() {
		return this._path;
	}
	get fullPath() {
		return this._fullPath;
	}
	constructor(options) {
		this.init = (opts) => {
			this.originalIndex = opts.originalIndex;
			const options$1 = this.options;
			const isRoot = !options$1?.path && !options$1?.id;
			this.parentRoute = this.options.getParentRoute?.();
			if (isRoot) this._path = rootRouteId;
			else if (!this.parentRoute) invariant();
			let path = isRoot ? rootRouteId : options$1?.path;
			if (path && path !== "/") path = trimPathLeft(path);
			const customId = options$1?.id || path;
			let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
			if (path === "__root__") path = "/";
			if (id !== "__root__") id = joinPaths(["/", id]);
			const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
			this._path = path;
			this._id = id;
			this._fullPath = fullPath;
			this._to = trimPathRight(fullPath);
		};
		this.addChildren = (children) => {
			return this._addFileChildren(children);
		};
		this._addFileChildren = (children) => {
			if (Array.isArray(children)) this.children = children;
			if (typeof children === "object" && children !== null) this.children = Object.values(children);
			return this;
		};
		this._addFileTypes = () => {
			return this;
		};
		this.updateLoader = (options$1) => {
			Object.assign(this.options, options$1);
			return this;
		};
		this.update = (options$1) => {
			Object.assign(this.options, options$1);
			return this;
		};
		this.lazy = (lazyFn) => {
			this.lazyFn = lazyFn;
			return this;
		};
		this.redirect = (opts) => redirect({
			from: this.fullPath,
			...opts
		});
		this.options = options || {};
		this.isRoot = !options?.getParentRoute;
		if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
	}
};
var BaseRootRoute = class extends BaseRoute {
	constructor(options) {
		super(options);
	}
};
function useLoaderData(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		structuralSharing: opts.structuralSharing,
		select: (s) => {
			return opts.select ? opts.select(s.loaderData) : s.loaderData;
		}
	});
}
function useLoaderDeps(opts) {
	const { select, ...rest } = opts;
	return useMatch({
		...rest,
		select: (s) => {
			return select ? select(s.loaderDeps) : s.loaderDeps;
		}
	});
}
function useRouteContext(opts) {
	return useMatch({
		...opts,
		select: (match) => opts.select ? opts.select(match.context) : match.context
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var Route$1 = class extends BaseRoute {
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id,
				structuralSharing: opts?.structuralSharing
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = import_react.forwardRef((props, ref) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				ref,
				from: this.fullPath,
				...props
			});
		});
	}
};
function createRoute(options) {
	return new Route$1(options);
}
var RootRoute = class extends BaseRootRoute {
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id,
				structuralSharing: opts?.structuralSharing
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				structuralSharing: opts?.structuralSharing,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = import_react.forwardRef((props, ref) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				ref,
				from: this.fullPath,
				...props
			});
		});
	}
};
function createRootRoute(options) {
	return new RootRoute(options);
}
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
var $$splitComponentImporter = () => __vitePreload(() => import("./file-preview-BIlrjAMb.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]), import.meta.url);
const Route = createFileRoute("/app/file-preview")({
	validateSearch: (search) => parseFilePreviewRouteSearch(search),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
export { createRootRoute as i, lazyRouteComponent as n, createFileRoute as r, Route as t };
