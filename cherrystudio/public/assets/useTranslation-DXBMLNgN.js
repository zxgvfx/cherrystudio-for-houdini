import { c as __toESM } from "./rolldown-runtime-BeJLVFtF.js";
import { t as require_react } from "./react-DXAbXv4a.js";
import { n as getI18n, r as getDefaults } from "./initReactI18next-BmJnUitX.js";
function warn() {
	if (console && console.warn) {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		if (isString(args[0])) args[0] = `react-i18next:: ${args[0]}`;
		console.warn(...args);
	}
}
var alreadyWarned = {};
function warnOnce() {
	for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
	if (isString(args[0]) && alreadyWarned[args[0]]) return;
	if (isString(args[0])) alreadyWarned[args[0]] = /* @__PURE__ */ new Date();
	warn(...args);
}
var loadedClb = (i18n, cb) => () => {
	if (i18n.isInitialized) cb();
	else {
		const initialized = () => {
			setTimeout(() => {
				i18n.off("initialized", initialized);
			}, 0);
			cb();
		};
		i18n.on("initialized", initialized);
	}
};
const loadNamespaces = (i18n, ns, cb) => {
	i18n.loadNamespaces(ns, loadedClb(i18n, cb));
};
const loadLanguages = (i18n, lng, ns, cb) => {
	if (isString(ns)) ns = [ns];
	ns.forEach((n) => {
		if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
	});
	i18n.loadLanguages(lng, loadedClb(i18n, cb));
};
var oldI18nextHasLoadedNamespace = function(ns, i18n) {
	let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
	const lng = i18n.languages[0];
	const fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
	const lastLng = i18n.languages[i18n.languages.length - 1];
	if (lng.toLowerCase() === "cimode") return true;
	const loadNotPending = (l, n) => {
		const loadState = i18n.services.backendConnector.state[`${l}|${n}`];
		return loadState === -1 || loadState === 2;
	};
	if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
	if (i18n.hasResourceBundle(lng, ns)) return true;
	if (!i18n.services.backendConnector.backend || i18n.options.resources && !i18n.options.partialBundledLanguages) return true;
	if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
	return false;
};
const hasLoadedNamespace = function(ns, i18n) {
	let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
	if (!i18n.languages || !i18n.languages.length) {
		warnOnce("i18n.languages were undefined or empty", i18n.languages);
		return true;
	}
	if (!(i18n.options.ignoreJSONStructure !== void 0)) return oldI18nextHasLoadedNamespace(ns, i18n, options);
	return i18n.hasLoadedNamespace(ns, {
		lng: options.lng,
		precheck: (i18nInstance, loadNotPending) => {
			if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
		}
	});
};
const isString = (obj) => typeof obj === "string";
const isObject = (obj) => typeof obj === "object" && obj !== null;
var import_react = /* @__PURE__ */ __toESM(require_react());
const I18nContext = (0, import_react.createContext)();
var ReportNamespaces = class {
	constructor() {
		this.usedNamespaces = {};
	}
	addUsedNamespaces(namespaces) {
		namespaces.forEach((ns) => {
			if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
		});
	}
	getUsedNamespaces = () => Object.keys(this.usedNamespaces);
};
var usePrevious = (value, ignore) => {
	const ref = (0, import_react.useRef)();
	(0, import_react.useEffect)(() => {
		ref.current = ignore ? ref.current : value;
	}, [value, ignore]);
	return ref.current;
};
var alwaysNewT = (i18n, language, namespace, keyPrefix) => i18n.getFixedT(language, namespace, keyPrefix);
var useMemoizedT = (i18n, language, namespace, keyPrefix) => (0, import_react.useCallback)(alwaysNewT(i18n, language, namespace, keyPrefix), [
	i18n,
	language,
	namespace,
	keyPrefix
]);
const useTranslation = function(ns) {
	let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	const { i18n: i18nFromProps } = props;
	const { i18n: i18nFromContext, defaultNS: defaultNSFromContext } = (0, import_react.useContext)(I18nContext) || {};
	const i18n = i18nFromProps || i18nFromContext || getI18n();
	if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
	if (!i18n) {
		warnOnce("You will need to pass in an i18next instance by using initReactI18next");
		const notReadyT = (k, optsOrDefaultValue) => {
			if (isString(optsOrDefaultValue)) return optsOrDefaultValue;
			if (isObject(optsOrDefaultValue) && isString(optsOrDefaultValue.defaultValue)) return optsOrDefaultValue.defaultValue;
			return Array.isArray(k) ? k[k.length - 1] : k;
		};
		const retNotReady = [
			notReadyT,
			{},
			false
		];
		retNotReady.t = notReadyT;
		retNotReady.i18n = {};
		retNotReady.ready = false;
		return retNotReady;
	}
	if (i18n.options.react && i18n.options.react.wait !== void 0) warnOnce("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
	const i18nOptions = {
		...getDefaults(),
		...i18n.options.react,
		...props
	};
	const { useSuspense, keyPrefix } = i18nOptions;
	let namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
	namespaces = isString(namespaces) ? [namespaces] : namespaces || ["translation"];
	if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
	const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every((n) => hasLoadedNamespace(n, i18n, i18nOptions));
	const memoGetT = useMemoizedT(i18n, props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
	const getT = () => memoGetT;
	const getNewT = () => alwaysNewT(i18n, props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
	const [t, setT] = (0, import_react.useState)(getT);
	let joinedNS = namespaces.join();
	if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
	const previousJoinedNS = usePrevious(joinedNS);
	const isMounted = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		const { bindI18n, bindI18nStore } = i18nOptions;
		isMounted.current = true;
		if (!ready && !useSuspense) if (props.lng) loadLanguages(i18n, props.lng, namespaces, () => {
			if (isMounted.current) setT(getNewT);
		});
		else loadNamespaces(i18n, namespaces, () => {
			if (isMounted.current) setT(getNewT);
		});
		if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) setT(getNewT);
		const boundReset = () => {
			if (isMounted.current) setT(getNewT);
		};
		if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
		if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
		return () => {
			isMounted.current = false;
			if (bindI18n && i18n) bindI18n.split(" ").forEach((e) => i18n.off(e, boundReset));
			if (bindI18nStore && i18n) bindI18nStore.split(" ").forEach((e) => i18n.store.off(e, boundReset));
		};
	}, [i18n, joinedNS]);
	(0, import_react.useEffect)(() => {
		if (isMounted.current && ready) setT(getT);
	}, [
		i18n,
		keyPrefix,
		ready
	]);
	const ret = [
		t,
		i18n,
		ready
	];
	ret.t = t;
	ret.i18n = i18n;
	ret.ready = ready;
	if (ready) return ret;
	if (!ready && !useSuspense) return ret;
	throw new Promise((resolve) => {
		if (props.lng) loadLanguages(i18n, props.lng, namespaces, () => resolve());
		else loadNamespaces(i18n, namespaces, () => resolve());
	});
};
export { warn as a, isString as i, I18nContext as n, warnOnce as o, isObject as r, useTranslation as t };
