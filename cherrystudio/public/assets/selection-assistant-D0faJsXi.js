import { s as __toESM } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { C as string, _ as object } from "./schemas-CV_EtlSZ.js";
import { n as ZodIssueCode, t as a } from "./zod-wCQOx8VP.js";
import { r as DefaultPreferences } from "./PreferenceService-Ba0ofBX2.js";
import { a as isWin, n as isLinux, r as isMac } from "./platform-YWZQ2_mC.js";
import "./dataApiDevtools-BVBX5Q3R.js";
import "./dayjs.min-CNu3tPBh.js";
import "./resolver-DYDQGqns.js";
import "./i18next-DBAWv9hQ.js";
import { t as require_react } from "./react-BgPOU4At.js";
import { t as Trans } from "./Trans-gaWfeLk6.js";
import { t as useTranslation } from "./useTranslation-DnuRkr5k.js";
import { t as require_react_dom } from "./react-dom-CKbeLgrG.js";
import { n as usePreference } from "./usePreference-78czMD_R.js";
import { a as mergeUiProps } from "./dist-BGahvVh8.js";
import { t as require_jsx_runtime } from "./jsx-runtime-DCB_IiL2.js";
import "./shim-BiqNigny.js";
import { c as SelectValue, i as SelectItem, n as SelectContent, s as SelectTrigger, t as Select } from "./select-BPh2DI-f.js";
import { t as Button } from "./button-Db6_VSWw.js";
import { n as Tooltip } from "./tooltip-ZuayyV11.js";
import { t as Divider } from "./divider-qgjPVXMV.js";
import { n as Switch } from "./switch-DEX3m-Zc.js";
import "./es2015-DmjbZU9-.js";
import { a as DialogFooter, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-9s9VTSCz.js";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-BLEiejOL.js";
import { t as Input } from "./input-dvr72LyA.js";
import { t as Input$1 } from "./textarea-Djv1FqZD.js";
import { t as require_with_selector } from "./with-selector-BMhODuKS.js";
import { t as _extends } from "./extends-DTNb3m69.js";
import { a as FormItem, d as useForm, i as FormField, n as FormControl, o as FormLabel, s as FormMessage, t as Form } from "./form-BNX-faEF.js";
import { t as Slider } from "./slider-_Xxahv5d.js";
import { n as useTheme } from "./useTheme-CbMe73se.js";
import { n as ipcApi } from "./ipc-BDTAufGC.js";
import { n as cn } from "./style-qqUWb85F.js";
import "./model-CfoN7z8F.js";
import "./DataApiService-DP44jQXR.js";
import "./useDataApi-DhDD9bgI.js";
import "./toast-DKTI9lZN.js";
import { t as CircleCheck } from "./circle-check-8iqFGUCC.js";
import { t as CircleQuestionMark } from "./circle-question-mark-B2xJCLbL.js";
import { t as CircleX } from "./circle-x-DObvF9JM.js";
import { t as Dices } from "./dices-DrMNOZEK.js";
import { t as ExternalLink } from "./external-link-CFdmQa9Q.js";
import { t as Globe } from "./globe-Ds2oiCgn.js";
import { t as OctagonX } from "./octagon-x-C4j-tHOm.js";
import { t as Pen } from "./pen-D8VpoN7p.js";
import { t as Pencil } from "./pencil-D9tpl364.js";
import { t as Plus } from "./plus-DvXnghWX.js";
import { t as Settings2 } from "./settings-2-BTluMuWp.js";
import { t as Trash } from "./trash-Uos38BpA.js";
import { t as TriangleAlert } from "./triangle-alert-S57Y3qwG.js";
import { t as popup } from "./popup-BqV2ZD7D.js";
import "./mcp-BYi31fTn.js";
import { c as getSelectionDescriptionLabelKey } from "./label-B7fCsuWT.js";
import "./provider-DxZtFw5B.js";
import "./model-J88ZZ_lQ.js";
import { t as Link } from "./link-BmlbhCp5.js";
import "./with-selector-DxfGCgh1.js";
import { t as useDefaultModel } from "./useModel-CIp4kGrE.js";
import "./useProvider-DEPjZhOC.js";
import { c as SettingRowTitle, n as SettingDescription, p as SettingsContentColumn, r as SettingGroup, s as SettingRow, u as SettingTitle } from "./SettingsPrimitives-CkQSNa69.js";
import "./model-D4kd6G9w.js";
import { i as useAssistants } from "./useAssistant-BNTbY6l-.js";
import { t as ModelAvatar_default } from "./ModelAvatar-B9O4au8z.js";
import "./SelectionActionIcon-SWek79jp.js";
import { t as SelectionToolbarView_default } from "./SelectionToolbarView-BC8YyqWM.js";
import "./useTemporaryValue-BuEAjgKO.js";
import { t as CopyButton_default } from "./CopyButton-DkMhcocz.js";
import { n as iconNames, t as DynamicIcon } from "./DynamicIcon-Bfrkw4A4.js";
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function formatProdErrorMessage(code) {
	return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var symbol_observable_default = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var actionTypes_default = {
	INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
	REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
	PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
function isPlainObject(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	let proto = obj;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function createStore(reducer$1, preloadedState, enhancer) {
	if (typeof reducer$1 !== "function") throw new Error(formatProdErrorMessage(2));
	if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") throw new Error(formatProdErrorMessage(0));
	if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
		enhancer = preloadedState;
		preloadedState = void 0;
	}
	if (typeof enhancer !== "undefined") {
		if (typeof enhancer !== "function") throw new Error(formatProdErrorMessage(1));
		return enhancer(createStore)(reducer$1, preloadedState);
	}
	let currentReducer = reducer$1;
	let currentState = preloadedState;
	let currentListeners = /* @__PURE__ */ new Map();
	let nextListeners = currentListeners;
	let listenerIdCounter = 0;
	let isDispatching = false;
	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) {
			nextListeners = /* @__PURE__ */ new Map();
			currentListeners.forEach((listener, key) => {
				nextListeners.set(key, listener);
			});
		}
	}
	function getState() {
		if (isDispatching) throw new Error(formatProdErrorMessage(3));
		return currentState;
	}
	function subscribe(listener) {
		if (typeof listener !== "function") throw new Error(formatProdErrorMessage(4));
		if (isDispatching) throw new Error(formatProdErrorMessage(5));
		let isSubscribed = true;
		ensureCanMutateNextListeners();
		const listenerId = listenerIdCounter++;
		nextListeners.set(listenerId, listener);
		return function unsubscribe() {
			if (!isSubscribed) return;
			if (isDispatching) throw new Error(formatProdErrorMessage(6));
			isSubscribed = false;
			ensureCanMutateNextListeners();
			nextListeners.delete(listenerId);
			currentListeners = null;
		};
	}
	function dispatch(action) {
		if (!isPlainObject(action)) throw new Error(formatProdErrorMessage(7));
		if (typeof action.type === "undefined") throw new Error(formatProdErrorMessage(8));
		if (typeof action.type !== "string") throw new Error(formatProdErrorMessage(17));
		if (isDispatching) throw new Error(formatProdErrorMessage(9));
		try {
			isDispatching = true;
			currentState = currentReducer(currentState, action);
		} finally {
			isDispatching = false;
		}
		(currentListeners = nextListeners).forEach((listener) => {
			listener();
		});
		return action;
	}
	function replaceReducer(nextReducer) {
		if (typeof nextReducer !== "function") throw new Error(formatProdErrorMessage(10));
		currentReducer = nextReducer;
		dispatch({ type: actionTypes_default.REPLACE });
	}
	function observable() {
		const outerSubscribe = subscribe;
		return {
			subscribe(observer) {
				if (typeof observer !== "object" || observer === null) throw new Error(formatProdErrorMessage(11));
				function observeState() {
					const observerAsObserver = observer;
					if (observerAsObserver.next) observerAsObserver.next(getState());
				}
				observeState();
				return { unsubscribe: outerSubscribe(observeState) };
			},
			[symbol_observable_default]() {
				return this;
			}
		};
	}
	dispatch({ type: actionTypes_default.INIT });
	return {
		dispatch,
		subscribe,
		getState,
		replaceReducer,
		[symbol_observable_default]: observable
	};
}
function bindActionCreator(actionCreator, dispatch) {
	return function(...args) {
		return dispatch(actionCreator.apply(this, args));
	};
}
function bindActionCreators(actionCreators, dispatch) {
	if (typeof actionCreators === "function") return bindActionCreator(actionCreators, dispatch);
	if (typeof actionCreators !== "object" || actionCreators === null) throw new Error(formatProdErrorMessage(16));
	const boundActionCreators = {};
	for (const key in actionCreators) {
		const actionCreator = actionCreators[key];
		if (typeof actionCreator === "function") boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	}
	return boundActionCreators;
}
function compose(...funcs) {
	if (funcs.length === 0) return (arg) => arg;
	if (funcs.length === 1) return funcs[0];
	return funcs.reduce((a$1, b) => (...args) => a$1(b(...args)));
}
function applyMiddleware(...middlewares) {
	return (createStore2) => (reducer$1, preloadedState) => {
		const store = createStore2(reducer$1, preloadedState);
		let dispatch = () => {
			throw new Error(formatProdErrorMessage(15));
		};
		const middlewareAPI = {
			getState: store.getState,
			dispatch: (action, ...args) => dispatch(action, ...args)
		};
		dispatch = compose(...middlewares.map((middleware) => middleware(middlewareAPI)))(store.dispatch);
		return {
			...store,
			dispatch
		};
	};
}
require_with_selector();
var IS_REACT_19 = /* @__PURE__ */ "19.2.3".startsWith("19");
var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(IS_REACT_19 ? "react.transitional.element" : "react.element");
var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Memo = REACT_MEMO_TYPE;
function typeOf(object$1) {
	if (typeof object$1 === "object" && object$1 !== null) {
		const { $$typeof } = object$1;
		switch ($$typeof) {
			case REACT_ELEMENT_TYPE: switch (object$1 = object$1.type, object$1) {
				case REACT_FRAGMENT_TYPE:
				case REACT_PROFILER_TYPE:
				case REACT_STRICT_MODE_TYPE:
				case REACT_SUSPENSE_TYPE:
				case REACT_SUSPENSE_LIST_TYPE: return object$1;
				default: switch (object$1 = object$1 && object$1.$$typeof, object$1) {
					case REACT_CONTEXT_TYPE:
					case REACT_FORWARD_REF_TYPE:
					case REACT_LAZY_TYPE:
					case REACT_MEMO_TYPE: return object$1;
					case REACT_CONSUMER_TYPE: return object$1;
					default: return $$typeof;
				}
			}
			case REACT_PORTAL_TYPE: return $$typeof;
		}
	}
}
function isMemo(object$1) {
	return typeOf(object$1) === REACT_MEMO_TYPE;
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, { areStatesEqual, areOwnPropsEqual, areStatePropsEqual }) {
	let hasRunAtLeastOnce = false;
	let state;
	let ownProps;
	let stateProps;
	let dispatchProps;
	let mergedProps;
	function handleFirstCall(firstState, firstOwnProps) {
		state = firstState;
		ownProps = firstOwnProps;
		stateProps = mapStateToProps(state, ownProps);
		dispatchProps = mapDispatchToProps(dispatch, ownProps);
		mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		hasRunAtLeastOnce = true;
		return mergedProps;
	}
	function handleNewPropsAndNewState() {
		stateProps = mapStateToProps(state, ownProps);
		if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
		mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		return mergedProps;
	}
	function handleNewProps() {
		if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
		if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
		mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		return mergedProps;
	}
	function handleNewState() {
		const nextStateProps = mapStateToProps(state, ownProps);
		const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
		stateProps = nextStateProps;
		if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
		return mergedProps;
	}
	function handleSubsequentCalls(nextState, nextOwnProps) {
		const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
		const stateChanged = !areStatesEqual(nextState, state, nextOwnProps, ownProps);
		state = nextState;
		ownProps = nextOwnProps;
		if (propsChanged && stateChanged) return handleNewPropsAndNewState();
		if (propsChanged) return handleNewProps();
		if (stateChanged) return handleNewState();
		return mergedProps;
	}
	return function pureFinalPropsSelector(nextState, nextOwnProps) {
		return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
	};
}
function finalPropsSelectorFactory(dispatch, { initMapStateToProps, initMapDispatchToProps, initMergeProps, ...options }) {
	return pureFinalPropsSelectorFactory(initMapStateToProps(dispatch, options), initMapDispatchToProps(dispatch, options), initMergeProps(dispatch, options), dispatch, options);
}
function bindActionCreators$1(actionCreators, dispatch) {
	const boundActionCreators = {};
	for (const key in actionCreators) {
		const actionCreator = actionCreators[key];
		if (typeof actionCreator === "function") boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
	}
	return boundActionCreators;
}
function wrapMapToPropsConstant(getConstant) {
	return function initConstantSelector(dispatch) {
		const constant = getConstant(dispatch);
		function constantSelector() {
			return constant;
		}
		constantSelector.dependsOnOwnProps = false;
		return constantSelector;
	};
}
function getDependsOnOwnProps(mapToProps) {
	return mapToProps.dependsOnOwnProps ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}
function wrapMapToPropsFunc(mapToProps, methodName) {
	return function initProxySelector(dispatch, { displayName }) {
		const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
			return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch, void 0);
		};
		proxy.dependsOnOwnProps = true;
		proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
			proxy.mapToProps = mapToProps;
			proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
			let props = proxy(stateOrDispatch, ownProps);
			if (typeof props === "function") {
				proxy.mapToProps = props;
				proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
				props = proxy(stateOrDispatch, ownProps);
			}
			return props;
		};
		return proxy;
	};
}
function createInvalidArgFactory(arg, name) {
	return (dispatch, options) => {
		throw new Error(`Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`);
	};
}
function mapDispatchToPropsFactory(mapDispatchToProps) {
	return mapDispatchToProps && typeof mapDispatchToProps === "object" ? wrapMapToPropsConstant((dispatch) => bindActionCreators$1(mapDispatchToProps, dispatch)) : !mapDispatchToProps ? wrapMapToPropsConstant((dispatch) => ({ dispatch })) : typeof mapDispatchToProps === "function" ? wrapMapToPropsFunc(mapDispatchToProps, "mapDispatchToProps") : createInvalidArgFactory(mapDispatchToProps, "mapDispatchToProps");
}
function mapStateToPropsFactory(mapStateToProps) {
	return !mapStateToProps ? wrapMapToPropsConstant(() => ({})) : typeof mapStateToProps === "function" ? wrapMapToPropsFunc(mapStateToProps, "mapStateToProps") : createInvalidArgFactory(mapStateToProps, "mapStateToProps");
}
function defaultMergeProps(stateProps, dispatchProps, ownProps) {
	return {
		...ownProps,
		...stateProps,
		...dispatchProps
	};
}
function wrapMergePropsFunc(mergeProps) {
	return function initMergePropsProxy(dispatch, { displayName, areMergedPropsEqual }) {
		let hasRunOnce = false;
		let mergedProps;
		return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
			const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
			if (hasRunOnce) {
				if (!areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
			} else {
				hasRunOnce = true;
				mergedProps = nextMergedProps;
			}
			return mergedProps;
		};
	};
}
function mergePropsFactory(mergeProps) {
	return !mergeProps ? () => defaultMergeProps : typeof mergeProps === "function" ? wrapMergePropsFunc(mergeProps) : createInvalidArgFactory(mergeProps, "mergeProps");
}
function defaultNoopBatch(callback) {
	callback();
}
function createListenerCollection() {
	let first = null;
	let last = null;
	return {
		clear() {
			first = null;
			last = null;
		},
		notify() {
			defaultNoopBatch(() => {
				let listener = first;
				while (listener) {
					listener.callback();
					listener = listener.next;
				}
			});
		},
		get() {
			const listeners = [];
			let listener = first;
			while (listener) {
				listeners.push(listener);
				listener = listener.next;
			}
			return listeners;
		},
		subscribe(callback) {
			let isSubscribed = true;
			const listener = last = {
				callback,
				next: null,
				prev: last
			};
			if (listener.prev) listener.prev.next = listener;
			else first = listener;
			return function unsubscribe() {
				if (!isSubscribed || first === null) return;
				isSubscribed = false;
				if (listener.next) listener.next.prev = listener.prev;
				else last = listener.prev;
				if (listener.prev) listener.prev.next = listener.next;
				else first = listener.next;
			};
		}
	};
}
var nullListeners = {
	notify() {},
	get: () => []
};
function createSubscription(store, parentSub) {
	let unsubscribe;
	let listeners = nullListeners;
	let subscriptionsAmount = 0;
	let selfSubscribed = false;
	function addNestedSub(listener) {
		trySubscribe();
		const cleanupListener = listeners.subscribe(listener);
		let removed = false;
		return () => {
			if (!removed) {
				removed = true;
				cleanupListener();
				tryUnsubscribe();
			}
		};
	}
	function notifyNestedSubs() {
		listeners.notify();
	}
	function handleChangeWrapper() {
		if (subscription.onStateChange) subscription.onStateChange();
	}
	function isSubscribed() {
		return selfSubscribed;
	}
	function trySubscribe() {
		subscriptionsAmount++;
		if (!unsubscribe) {
			unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
			listeners = createListenerCollection();
		}
	}
	function tryUnsubscribe() {
		subscriptionsAmount--;
		if (unsubscribe && subscriptionsAmount === 0) {
			unsubscribe();
			unsubscribe = void 0;
			listeners.clear();
			listeners = nullListeners;
		}
	}
	function trySubscribeSelf() {
		if (!selfSubscribed) {
			selfSubscribed = true;
			trySubscribe();
		}
	}
	function tryUnsubscribeSelf() {
		if (selfSubscribed) {
			selfSubscribed = false;
			tryUnsubscribe();
		}
	}
	const subscription = {
		addNestedSub,
		notifyNestedSubs,
		handleChangeWrapper,
		isSubscribed,
		trySubscribe: trySubscribeSelf,
		tryUnsubscribe: tryUnsubscribeSelf,
		getListeners: () => listeners
	};
	return subscription;
}
var canUseDOM = () => !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isDOM = /* @__PURE__ */ canUseDOM();
var isRunningInReactNative = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";
var isReactNative = /* @__PURE__ */ isRunningInReactNative();
var getUseIsomorphicLayoutEffect = () => isDOM || isReactNative ? import_react.useLayoutEffect : import_react.useEffect;
var useIsomorphicLayoutEffect$1 = /* @__PURE__ */ getUseIsomorphicLayoutEffect();
function is(x, y) {
	if (x === y) return x !== 0 || y !== 0 || 1 / x === 1 / y;
	else return x !== x && y !== y;
}
function shallowEqual(objA, objB) {
	if (is(objA, objB)) return true;
	if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);
	if (keysA.length !== keysB.length) return false;
	for (let i = 0; i < keysA.length; i++) if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) return false;
	return true;
}
var REACT_STATICS = {
	childContextTypes: true,
	contextType: true,
	contextTypes: true,
	defaultProps: true,
	displayName: true,
	getDefaultProps: true,
	getDerivedStateFromError: true,
	getDerivedStateFromProps: true,
	mixins: true,
	propTypes: true,
	type: true
};
var KNOWN_STATICS = {
	name: true,
	length: true,
	prototype: true,
	caller: true,
	callee: true,
	arguments: true,
	arity: true
};
var FORWARD_REF_STATICS = {
	$$typeof: true,
	render: true,
	defaultProps: true,
	displayName: true,
	propTypes: true
};
var MEMO_STATICS = {
	$$typeof: true,
	compare: true,
	defaultProps: true,
	displayName: true,
	propTypes: true,
	type: true
};
var TYPE_STATICS = {
	[ForwardRef]: FORWARD_REF_STATICS,
	[Memo]: MEMO_STATICS
};
function getStatics(component) {
	if (isMemo(component)) return MEMO_STATICS;
	return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent) {
	if (typeof sourceComponent !== "string") {
		if (objectPrototype) {
			const inheritedComponent = getPrototypeOf(sourceComponent);
			if (inheritedComponent && inheritedComponent !== objectPrototype) hoistNonReactStatics(targetComponent, inheritedComponent);
		}
		let keys = getOwnPropertyNames(sourceComponent);
		if (getOwnPropertySymbols) keys = keys.concat(getOwnPropertySymbols(sourceComponent));
		const targetStatics = getStatics(targetComponent);
		const sourceStatics = getStatics(sourceComponent);
		for (let i = 0; i < keys.length; ++i) {
			const key = keys[i];
			if (!KNOWN_STATICS[key] && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
				const descriptor = getOwnPropertyDescriptor(sourceComponent, key);
				try {
					defineProperty(targetComponent, key, descriptor);
				} catch (e) {}
			}
		}
	}
	return targetComponent;
}
var ContextKey = /* @__PURE__ */ Symbol.for(`react-redux-context`);
var gT = typeof globalThis !== "undefined" ? globalThis : {};
function getContext() {
	if (!import_react.createContext) return {};
	const contextMap = gT[ContextKey] ??= /* @__PURE__ */ new Map();
	let realContext = contextMap.get(import_react.createContext);
	if (!realContext) {
		realContext = import_react.createContext(null);
		contextMap.set(import_react.createContext, realContext);
	}
	return realContext;
}
var ReactReduxContext = /* @__PURE__ */ getContext();
var NO_SUBSCRIPTION_ARRAY = [null, null];
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
	useIsomorphicLayoutEffect$1(() => effectFunc(...effectArgs), dependencies);
}
function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, childPropsFromStoreUpdate, notifyNestedSubs) {
	lastWrapperProps.current = wrapperProps;
	renderIsScheduled.current = false;
	if (childPropsFromStoreUpdate.current) {
		childPropsFromStoreUpdate.current = null;
		notifyNestedSubs();
	}
}
function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, additionalSubscribeListener) {
	if (!shouldHandleStateChanges) return () => {};
	let didUnsubscribe = false;
	let lastThrownError = null;
	const checkForUpdates = () => {
		if (didUnsubscribe || !isMounted.current) return;
		const latestStoreState = store.getState();
		let newChildProps, error$1;
		try {
			newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
		} catch (e) {
			error$1 = e;
			lastThrownError = e;
		}
		if (!error$1) lastThrownError = null;
		if (newChildProps === lastChildProps.current) {
			if (!renderIsScheduled.current) notifyNestedSubs();
		} else {
			lastChildProps.current = newChildProps;
			childPropsFromStoreUpdate.current = newChildProps;
			renderIsScheduled.current = true;
			additionalSubscribeListener();
		}
	};
	subscription.onStateChange = checkForUpdates;
	subscription.trySubscribe();
	checkForUpdates();
	const unsubscribeWrapper = () => {
		didUnsubscribe = true;
		subscription.tryUnsubscribe();
		subscription.onStateChange = null;
		if (lastThrownError) throw lastThrownError;
	};
	return unsubscribeWrapper;
}
function strictEqual(a$1, b) {
	return a$1 === b;
}
function connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure, areStatesEqual = strictEqual, areOwnPropsEqual = shallowEqual, areStatePropsEqual = shallowEqual, areMergedPropsEqual = shallowEqual, forwardRef = false, context = ReactReduxContext } = {}) {
	const Context = context;
	const initMapStateToProps = mapStateToPropsFactory(mapStateToProps);
	const initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
	const initMergeProps = mergePropsFactory(mergeProps);
	const shouldHandleStateChanges = Boolean(mapStateToProps);
	const wrapWithConnect = (WrappedComponent) => {
		const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
		const displayName = `Connect(${wrappedComponentName})`;
		const selectorFactoryOptions = {
			shouldHandleStateChanges,
			displayName,
			wrappedComponentName,
			WrappedComponent,
			initMapStateToProps,
			initMapDispatchToProps,
			initMergeProps,
			areStatesEqual,
			areStatePropsEqual,
			areOwnPropsEqual,
			areMergedPropsEqual
		};
		function ConnectFunction(props) {
			const [propsContext, reactReduxForwardedRef, wrapperProps] = import_react.useMemo(() => {
				const { reactReduxForwardedRef: reactReduxForwardedRef2, ...wrapperProps2 } = props;
				return [
					props.context,
					reactReduxForwardedRef2,
					wrapperProps2
				];
			}, [props]);
			const ContextToUse = import_react.useMemo(() => {
				let ResultContext = Context;
				if (propsContext?.Consumer) {}
				return ResultContext;
			}, [propsContext, Context]);
			const contextValue = import_react.useContext(ContextToUse);
			const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
			const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
			const store = didStoreComeFromProps ? props.store : contextValue.store;
			const getServerState = didStoreComeFromContext ? contextValue.getServerState : store.getState;
			const childPropsSelector = import_react.useMemo(() => {
				return finalPropsSelectorFactory(store.dispatch, selectorFactoryOptions);
			}, [store]);
			const [subscription, notifyNestedSubs] = import_react.useMemo(() => {
				if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY;
				const subscription2 = createSubscription(store, didStoreComeFromProps ? void 0 : contextValue.subscription);
				return [subscription2, subscription2.notifyNestedSubs.bind(subscription2)];
			}, [
				store,
				didStoreComeFromProps,
				contextValue
			]);
			const overriddenContextValue = import_react.useMemo(() => {
				if (didStoreComeFromProps) return contextValue;
				return {
					...contextValue,
					subscription
				};
			}, [
				didStoreComeFromProps,
				contextValue,
				subscription
			]);
			const lastChildProps = import_react.useRef(void 0);
			const lastWrapperProps = import_react.useRef(wrapperProps);
			const childPropsFromStoreUpdate = import_react.useRef(void 0);
			const renderIsScheduled = import_react.useRef(false);
			const isMounted = import_react.useRef(false);
			const latestSubscriptionCallbackError = import_react.useRef(void 0);
			useIsomorphicLayoutEffect$1(() => {
				isMounted.current = true;
				return () => {
					isMounted.current = false;
				};
			}, []);
			const actualChildPropsSelector = import_react.useMemo(() => {
				const selector = () => {
					if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) return childPropsFromStoreUpdate.current;
					return childPropsSelector(store.getState(), wrapperProps);
				};
				return selector;
			}, [store, wrapperProps]);
			const subscribeForReact = import_react.useMemo(() => {
				const subscribe = (reactListener) => {
					if (!subscription) return () => {};
					return subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, reactListener);
				};
				return subscribe;
			}, [subscription]);
			useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [
				lastWrapperProps,
				lastChildProps,
				renderIsScheduled,
				wrapperProps,
				childPropsFromStoreUpdate,
				notifyNestedSubs
			]);
			let actualChildProps;
			try {
				actualChildProps = import_react.useSyncExternalStore(subscribeForReact, actualChildPropsSelector, getServerState ? () => childPropsSelector(getServerState(), wrapperProps) : actualChildPropsSelector);
			} catch (err) {
				if (latestSubscriptionCallbackError.current) err.message += `
The error may be correlated with this previous error:
${latestSubscriptionCallbackError.current.stack}

`;
				throw err;
			}
			useIsomorphicLayoutEffect$1(() => {
				latestSubscriptionCallbackError.current = void 0;
				childPropsFromStoreUpdate.current = void 0;
				lastChildProps.current = actualChildProps;
			});
			const renderedWrappedComponent = import_react.useMemo(() => {
				return /* @__PURE__ */ import_react.createElement(WrappedComponent, {
					...actualChildProps,
					ref: reactReduxForwardedRef
				});
			}, [
				reactReduxForwardedRef,
				WrappedComponent,
				actualChildProps
			]);
			return import_react.useMemo(() => {
				if (shouldHandleStateChanges) return /* @__PURE__ */ import_react.createElement(ContextToUse.Provider, { value: overriddenContextValue }, renderedWrappedComponent);
				return renderedWrappedComponent;
			}, [
				ContextToUse,
				renderedWrappedComponent,
				overriddenContextValue
			]);
		}
		const Connect = import_react.memo(ConnectFunction);
		Connect.WrappedComponent = WrappedComponent;
		Connect.displayName = ConnectFunction.displayName = displayName;
		if (forwardRef) {
			const forwarded = import_react.forwardRef(function forwardConnectRef(props, ref) {
				return /* @__PURE__ */ import_react.createElement(Connect, {
					...props,
					reactReduxForwardedRef: ref
				});
			});
			forwarded.displayName = displayName;
			forwarded.WrappedComponent = WrappedComponent;
			return /* @__PURE__ */ hoistNonReactStatics(forwarded, WrappedComponent);
		}
		return /* @__PURE__ */ hoistNonReactStatics(Connect, WrappedComponent);
	};
	return wrapWithConnect;
}
var connect_default = connect;
function Provider(providerProps) {
	const { children, context, serverState, store } = providerProps;
	const contextValue = import_react.useMemo(() => {
		return {
			store,
			subscription: createSubscription(store),
			getServerState: serverState ? () => serverState : void 0
		};
	}, [store, serverState]);
	const previousState = import_react.useMemo(() => store.getState(), [store]);
	useIsomorphicLayoutEffect$1(() => {
		const { subscription } = contextValue;
		subscription.onStateChange = subscription.notifyNestedSubs;
		subscription.trySubscribe();
		if (previousState !== store.getState()) subscription.notifyNestedSubs();
		return () => {
			subscription.tryUnsubscribe();
			subscription.onStateChange = void 0;
		};
	}, [contextValue, previousState]);
	const Context = context || ReactReduxContext;
	return /* @__PURE__ */ import_react.createElement(Context.Provider, { value: contextValue }, children);
}
var Provider_default = Provider;
var isProduction = true;
var prefix$2 = "Invariant failed";
function invariant$1(condition, message) {
	if (condition) return;
	if (isProduction) throw new Error(prefix$2);
	var provided = typeof message === "function" ? message() : message;
	var value = provided ? "".concat(prefix$2, ": ").concat(provided) : prefix$2;
	throw new Error(value);
}
var getRect = function getRect$1(_ref) {
	var top = _ref.top, right = _ref.right, bottom = _ref.bottom, left = _ref.left;
	return {
		top,
		right,
		bottom,
		left,
		width: right - left,
		height: bottom - top,
		x: left,
		y: top,
		center: {
			x: (right + left) / 2,
			y: (bottom + top) / 2
		}
	};
};
var expand = function expand$1(target, expandBy) {
	return {
		top: target.top - expandBy.top,
		left: target.left - expandBy.left,
		bottom: target.bottom + expandBy.bottom,
		right: target.right + expandBy.right
	};
};
var shrink = function shrink$1(target, shrinkBy) {
	return {
		top: target.top + shrinkBy.top,
		left: target.left + shrinkBy.left,
		bottom: target.bottom - shrinkBy.bottom,
		right: target.right - shrinkBy.right
	};
};
var shift = function shift$1(target, shiftBy) {
	return {
		top: target.top + shiftBy.y,
		left: target.left + shiftBy.x,
		bottom: target.bottom + shiftBy.y,
		right: target.right + shiftBy.x
	};
};
var noSpacing$1 = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
};
var createBox = function createBox$1(_ref2) {
	var borderBox = _ref2.borderBox, _ref2$margin = _ref2.margin, margin = _ref2$margin === void 0 ? noSpacing$1 : _ref2$margin, _ref2$border = _ref2.border, border = _ref2$border === void 0 ? noSpacing$1 : _ref2$border, _ref2$padding = _ref2.padding, padding = _ref2$padding === void 0 ? noSpacing$1 : _ref2$padding;
	var marginBox = getRect(expand(borderBox, margin));
	var paddingBox = getRect(shrink(borderBox, border));
	var contentBox = getRect(shrink(paddingBox, padding));
	return {
		marginBox,
		borderBox: getRect(borderBox),
		paddingBox,
		contentBox,
		margin,
		border,
		padding
	};
};
var parse = function parse$1(raw) {
	var value = raw.slice(0, -2);
	if (raw.slice(-2) !== "px") return 0;
	var result = Number(value);
	isNaN(result) && invariant$1(false);
	return result;
};
var getWindowScroll$1 = function getWindowScroll$2() {
	return {
		x: window.pageXOffset,
		y: window.pageYOffset
	};
};
var offset = function offset$1(original, change) {
	var borderBox = original.borderBox, border = original.border, margin = original.margin, padding = original.padding;
	return createBox({
		borderBox: shift(borderBox, change),
		border,
		margin,
		padding
	});
};
var withScroll = function withScroll$1(original, scroll$2) {
	if (scroll$2 === void 0) scroll$2 = getWindowScroll$1();
	return offset(original, scroll$2);
};
var calculateBox = function calculateBox$1(borderBox, styles) {
	return createBox({
		borderBox,
		margin: {
			top: parse(styles.marginTop),
			right: parse(styles.marginRight),
			bottom: parse(styles.marginBottom),
			left: parse(styles.marginLeft)
		},
		padding: {
			top: parse(styles.paddingTop),
			right: parse(styles.paddingRight),
			bottom: parse(styles.paddingBottom),
			left: parse(styles.paddingLeft)
		},
		border: {
			top: parse(styles.borderTopWidth),
			right: parse(styles.borderRightWidth),
			bottom: parse(styles.borderBottomWidth),
			left: parse(styles.borderLeftWidth)
		}
	});
};
var getBox = function getBox$1(el) {
	return calculateBox(el.getBoundingClientRect(), window.getComputedStyle(el));
};
var raf_schd_esm_default = function rafSchd$1(fn) {
	var lastArgs = [];
	var frameId = null;
	var wrapperFn = function wrapperFn$1() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		lastArgs = args;
		if (frameId) return;
		frameId = requestAnimationFrame(function() {
			frameId = null;
			fn.apply(void 0, lastArgs);
		});
	};
	wrapperFn.cancel = function() {
		if (!frameId) return;
		cancelAnimationFrame(frameId);
		frameId = null;
	};
	return wrapperFn;
};
function log(type, message) {}
log.bind(null, "warn");
var error = log.bind(null, "error");
function noop$2() {}
function getOptions(shared$1, fromBinding) {
	return {
		...shared$1,
		...fromBinding
	};
}
function bindEvents(el, bindings, sharedOptions) {
	const unbindings = bindings.map((binding) => {
		const options = getOptions(sharedOptions, binding.options);
		el.addEventListener(binding.eventName, binding.fn, options);
		return function unbind() {
			el.removeEventListener(binding.eventName, binding.fn, options);
		};
	});
	return function unbindAll() {
		unbindings.forEach((unbind) => {
			unbind();
		});
	};
}
var prefix$1 = "Invariant failed";
var RbdInvariant = class extends Error {};
RbdInvariant.prototype.toString = function toString() {
	return this.message;
};
function invariant(condition, message) {
	throw new RbdInvariant(prefix$1);
}
var ErrorBoundary = class extends import_react.Component {
	constructor(...args) {
		super(...args);
		this.callbacks = null;
		this.unbind = noop$2;
		this.onWindowError = (event) => {
			const callbacks = this.getCallbacks();
			if (callbacks.isDragging()) callbacks.tryAbort();
			if (event.error instanceof RbdInvariant) event.preventDefault();
		};
		this.getCallbacks = () => {
			if (!this.callbacks) throw new Error("Unable to find AppCallbacks in <ErrorBoundary/>");
			return this.callbacks;
		};
		this.setCallbacks = (callbacks) => {
			this.callbacks = callbacks;
		};
	}
	componentDidMount() {
		this.unbind = bindEvents(window, [{
			eventName: "error",
			fn: this.onWindowError
		}]);
	}
	componentDidCatch(err) {
		if (err instanceof RbdInvariant) {
			this.setState({});
			return;
		}
		throw err;
	}
	componentWillUnmount() {
		this.unbind();
	}
	render() {
		return this.props.children(this.setCallbacks);
	}
};
var dragHandleUsageInstructions = `
  Press space bar to start a drag.
  When dragging you can use the arrow keys to move the item around and escape to cancel.
  Some screen readers may require you to be in focus mode or to use your pass through key
`;
var position = (index) => index + 1;
var onDragStart = (start$1) => `
  You have lifted an item in position ${position(start$1.source.index)}
`;
var withLocation = (source, destination) => {
	const isInHomeList = source.droppableId === destination.droppableId;
	const startPosition = position(source.index);
	const endPosition = position(destination.index);
	if (isInHomeList) return `
      You have moved the item from position ${startPosition}
      to position ${endPosition}
    `;
	return `
    You have moved the item from position ${startPosition}
    in list ${source.droppableId}
    to list ${destination.droppableId}
    in position ${endPosition}
  `;
};
var withCombine = (id, source, combine$1) => {
	if (source.droppableId === combine$1.droppableId) return `
      The item ${id}
      has been combined with ${combine$1.draggableId}`;
	return `
      The item ${id}
      in list ${source.droppableId}
      has been combined with ${combine$1.draggableId}
      in list ${combine$1.droppableId}
    `;
};
var onDragUpdate = (update$1) => {
	const location = update$1.destination;
	if (location) return withLocation(update$1.source, location);
	const combine$1 = update$1.combine;
	if (combine$1) return withCombine(update$1.draggableId, update$1.source, combine$1);
	return "You are over an area that cannot be dropped on";
};
var returnedToStart = (source) => `
  The item has returned to its starting position
  of ${position(source.index)}
`;
var onDragEnd = (result) => {
	if (result.reason === "CANCEL") return `
      Movement cancelled.
      ${returnedToStart(result.source)}
    `;
	const location = result.destination;
	const combine$1 = result.combine;
	if (location) return `
      You have dropped the item.
      ${withLocation(result.source, location)}
    `;
	if (combine$1) return `
      You have dropped the item.
      ${withCombine(result.draggableId, result.source, combine$1)}
    `;
	return `
    The item has been dropped while not over a drop area.
    ${returnedToStart(result.source)}
  `;
};
var preset = {
	dragHandleUsageInstructions,
	onDragStart,
	onDragUpdate,
	onDragEnd
};
function isEqual$2(first, second) {
	if (first === second) return true;
	if (Number.isNaN(first) && Number.isNaN(second)) return true;
	return false;
}
function areInputsEqual(newInputs, lastInputs) {
	if (newInputs.length !== lastInputs.length) return false;
	for (let i = 0; i < newInputs.length; i++) if (!isEqual$2(newInputs[i], lastInputs[i])) return false;
	return true;
}
function useMemo$1(getResult, inputs) {
	const initial = (0, import_react.useState)(() => ({
		inputs,
		result: getResult()
	}))[0];
	const isFirstRun = (0, import_react.useRef)(true);
	const committed = (0, import_react.useRef)(initial);
	const cache = isFirstRun.current || Boolean(inputs && committed.current.inputs && areInputsEqual(inputs, committed.current.inputs)) ? committed.current : {
		inputs,
		result: getResult()
	};
	(0, import_react.useEffect)(() => {
		isFirstRun.current = false;
		committed.current = cache;
	}, [cache]);
	return cache.result;
}
function useCallback(callback, inputs) {
	return useMemo$1(() => callback, inputs);
}
var origin = {
	x: 0,
	y: 0
};
var add = (point1, point2) => ({
	x: point1.x + point2.x,
	y: point1.y + point2.y
});
var subtract = (point1, point2) => ({
	x: point1.x - point2.x,
	y: point1.y - point2.y
});
var isEqual$1 = (point1, point2) => point1.x === point2.x && point1.y === point2.y;
var negate = (point) => ({
	x: point.x !== 0 ? -point.x : 0,
	y: point.y !== 0 ? -point.y : 0
});
var patch = (line, value, otherValue = 0) => {
	if (line === "x") return {
		x: value,
		y: otherValue
	};
	return {
		x: otherValue,
		y: value
	};
};
var distance = (point1, point2) => Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
var closest$1 = (target, points) => Math.min(...points.map((point) => distance(target, point)));
var apply = (fn) => (point) => ({
	x: fn(point.x),
	y: fn(point.y)
});
var executeClip = (frame, subject) => {
	const result = getRect({
		top: Math.max(subject.top, frame.top),
		right: Math.min(subject.right, frame.right),
		bottom: Math.min(subject.bottom, frame.bottom),
		left: Math.max(subject.left, frame.left)
	});
	if (result.width <= 0 || result.height <= 0) return null;
	return result;
};
var offsetByPosition = (spacing, point) => ({
	top: spacing.top + point.y,
	left: spacing.left + point.x,
	bottom: spacing.bottom + point.y,
	right: spacing.right + point.x
});
var getCorners = (spacing) => [
	{
		x: spacing.left,
		y: spacing.top
	},
	{
		x: spacing.right,
		y: spacing.top
	},
	{
		x: spacing.left,
		y: spacing.bottom
	},
	{
		x: spacing.right,
		y: spacing.bottom
	}
];
var noSpacing = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0
};
var scroll$1 = (target, frame) => {
	if (!frame) return target;
	return offsetByPosition(target, frame.scroll.diff.displacement);
};
var increase = (target, axis, withPlaceholder) => {
	if (withPlaceholder && withPlaceholder.increasedBy) return {
		...target,
		[axis.end]: target[axis.end] + withPlaceholder.increasedBy[axis.line]
	};
	return target;
};
var clip = (target, frame) => {
	if (frame && frame.shouldClipSubject) return executeClip(frame.pageMarginBox, target);
	return getRect(target);
};
var getSubject = ({ page, withPlaceholder, axis, frame }) => {
	return {
		page,
		withPlaceholder,
		active: clip(increase(scroll$1(page.marginBox, frame), axis, withPlaceholder), frame)
	};
};
var scrollDroppable = (droppable$1, newScroll) => {
	!droppable$1.frame && invariant();
	const scrollable = droppable$1.frame;
	const scrollDiff = subtract(newScroll, scrollable.scroll.initial);
	const scrollDisplacement = negate(scrollDiff);
	const frame = {
		...scrollable,
		scroll: {
			initial: scrollable.scroll.initial,
			current: newScroll,
			diff: {
				value: scrollDiff,
				displacement: scrollDisplacement
			},
			max: scrollable.scroll.max
		}
	};
	const subject = getSubject({
		page: droppable$1.subject.page,
		withPlaceholder: droppable$1.subject.withPlaceholder,
		axis: droppable$1.axis,
		frame
	});
	return {
		...droppable$1,
		frame,
		subject
	};
};
function memoizeOne(resultFn, isEqual$3 = areInputsEqual) {
	let cache = null;
	function memoized(...newArgs) {
		if (cache && cache.lastThis === this && isEqual$3(newArgs, cache.lastArgs)) return cache.lastResult;
		const lastResult = resultFn.apply(this, newArgs);
		cache = {
			lastResult,
			lastArgs: newArgs,
			lastThis: this
		};
		return lastResult;
	}
	memoized.clear = function clear() {
		cache = null;
	};
	return memoized;
}
var toDroppableMap = memoizeOne((droppables) => droppables.reduce((previous, current) => {
	previous[current.descriptor.id] = current;
	return previous;
}, {}));
var toDraggableMap = memoizeOne((draggables) => draggables.reduce((previous, current) => {
	previous[current.descriptor.id] = current;
	return previous;
}, {}));
var toDroppableList = memoizeOne((droppables) => Object.values(droppables));
var toDraggableList = memoizeOne((draggables) => Object.values(draggables));
var getDraggablesInsideDroppable = memoizeOne((droppableId, draggables) => {
	return toDraggableList(draggables).filter((draggable$1) => droppableId === draggable$1.descriptor.droppableId).sort((a$1, b) => a$1.descriptor.index - b.descriptor.index);
});
function tryGetDestination(impact) {
	if (impact.at && impact.at.type === "REORDER") return impact.at.destination;
	return null;
}
function tryGetCombine(impact) {
	if (impact.at && impact.at.type === "COMBINE") return impact.at.combine;
	return null;
}
var removeDraggableFromList = memoizeOne((remove, list) => list.filter((item) => item.descriptor.id !== remove.descriptor.id));
var moveToNextCombine = ({ isMovingForward, draggable: draggable$1, destination, insideDestination, previousImpact }) => {
	if (!destination.isCombineEnabled) return null;
	if (!tryGetDestination(previousImpact)) return null;
	function getImpact(target) {
		const at = {
			type: "COMBINE",
			combine: {
				draggableId: target,
				droppableId: destination.descriptor.id
			}
		};
		return {
			...previousImpact,
			at
		};
	}
	const all = previousImpact.displaced.all;
	const closestId = all.length ? all[0] : null;
	if (isMovingForward) return closestId ? getImpact(closestId) : null;
	const withoutDraggable = removeDraggableFromList(draggable$1, insideDestination);
	if (!closestId) {
		if (!withoutDraggable.length) return null;
		const last = withoutDraggable[withoutDraggable.length - 1];
		return getImpact(last.descriptor.id);
	}
	const indexOfClosest = withoutDraggable.findIndex((d) => d.descriptor.id === closestId);
	!(indexOfClosest !== -1) && invariant();
	const proposedIndex = indexOfClosest - 1;
	if (proposedIndex < 0) return null;
	const before = withoutDraggable[proposedIndex];
	return getImpact(before.descriptor.id);
};
var isHomeOf = (draggable$1, destination) => draggable$1.descriptor.droppableId === destination.descriptor.id;
var noDisplacedBy = {
	point: origin,
	value: 0
};
var emptyGroups = {
	invisible: {},
	visible: {},
	all: []
};
var noImpact = {
	displaced: emptyGroups,
	displacedBy: noDisplacedBy,
	at: null
};
var isWithin = (lowerBound, upperBound) => (value) => lowerBound <= value && value <= upperBound;
var isPartiallyVisibleThroughFrame = (frame) => {
	const isWithinVertical = isWithin(frame.top, frame.bottom);
	const isWithinHorizontal = isWithin(frame.left, frame.right);
	return (subject) => {
		if (isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right)) return true;
		const isPartiallyVisibleVertically = isWithinVertical(subject.top) || isWithinVertical(subject.bottom);
		const isPartiallyVisibleHorizontally = isWithinHorizontal(subject.left) || isWithinHorizontal(subject.right);
		if (isPartiallyVisibleVertically && isPartiallyVisibleHorizontally) return true;
		const isBiggerVertically = subject.top < frame.top && subject.bottom > frame.bottom;
		const isBiggerHorizontally = subject.left < frame.left && subject.right > frame.right;
		if (isBiggerVertically && isBiggerHorizontally) return true;
		return isBiggerVertically && isPartiallyVisibleHorizontally || isBiggerHorizontally && isPartiallyVisibleVertically;
	};
};
var isTotallyVisibleThroughFrame = (frame) => {
	const isWithinVertical = isWithin(frame.top, frame.bottom);
	const isWithinHorizontal = isWithin(frame.left, frame.right);
	return (subject) => {
		return isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
	};
};
var vertical = {
	direction: "vertical",
	line: "y",
	crossAxisLine: "x",
	start: "top",
	end: "bottom",
	size: "height",
	crossAxisStart: "left",
	crossAxisEnd: "right",
	crossAxisSize: "width"
};
var horizontal = {
	direction: "horizontal",
	line: "x",
	crossAxisLine: "y",
	start: "left",
	end: "right",
	size: "width",
	crossAxisStart: "top",
	crossAxisEnd: "bottom",
	crossAxisSize: "height"
};
var isTotallyVisibleThroughFrameOnAxis = (axis) => (frame) => {
	const isWithinVertical = isWithin(frame.top, frame.bottom);
	const isWithinHorizontal = isWithin(frame.left, frame.right);
	return (subject) => {
		if (axis === vertical) return isWithinVertical(subject.top) && isWithinVertical(subject.bottom);
		return isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
	};
};
var getDroppableDisplaced = (target, destination) => {
	return offsetByPosition(target, destination.frame ? destination.frame.scroll.diff.displacement : origin);
};
var isVisibleInDroppable = (target, destination, isVisibleThroughFrameFn) => {
	if (!destination.subject.active) return false;
	return isVisibleThroughFrameFn(destination.subject.active)(target);
};
var isVisibleInViewport = (target, viewport, isVisibleThroughFrameFn) => isVisibleThroughFrameFn(viewport)(target);
var isVisible$1 = ({ target: toBeDisplaced, destination, viewport, withDroppableDisplacement: withDroppableDisplacement$1, isVisibleThroughFrameFn }) => {
	const displacedTarget = withDroppableDisplacement$1 ? getDroppableDisplaced(toBeDisplaced, destination) : toBeDisplaced;
	return isVisibleInDroppable(displacedTarget, destination, isVisibleThroughFrameFn) && isVisibleInViewport(displacedTarget, viewport, isVisibleThroughFrameFn);
};
var isPartiallyVisible = (args) => isVisible$1({
	...args,
	isVisibleThroughFrameFn: isPartiallyVisibleThroughFrame
});
var isTotallyVisible = (args) => isVisible$1({
	...args,
	isVisibleThroughFrameFn: isTotallyVisibleThroughFrame
});
var isTotallyVisibleOnAxis = (args) => isVisible$1({
	...args,
	isVisibleThroughFrameFn: isTotallyVisibleThroughFrameOnAxis(args.destination.axis)
});
var getShouldAnimate = (id, last, forceShouldAnimate) => {
	if (typeof forceShouldAnimate === "boolean") return forceShouldAnimate;
	if (!last) return true;
	const { invisible, visible } = last;
	if (invisible[id]) return false;
	const previous = visible[id];
	return previous ? previous.shouldAnimate : true;
};
function getTarget(draggable$1, displacedBy) {
	const marginBox = draggable$1.page.marginBox;
	return getRect(expand(marginBox, {
		top: displacedBy.point.y,
		right: 0,
		bottom: 0,
		left: displacedBy.point.x
	}));
}
function getDisplacementGroups({ afterDragging, destination, displacedBy, viewport, forceShouldAnimate, last }) {
	return afterDragging.reduce(function process(groups, draggable$1) {
		const target = getTarget(draggable$1, displacedBy);
		const id = draggable$1.descriptor.id;
		groups.all.push(id);
		if (!isPartiallyVisible({
			target,
			destination,
			viewport,
			withDroppableDisplacement: true
		})) {
			groups.invisible[draggable$1.descriptor.id] = true;
			return groups;
		}
		const displacement = {
			draggableId: id,
			shouldAnimate: getShouldAnimate(id, last, forceShouldAnimate)
		};
		groups.visible[id] = displacement;
		return groups;
	}, {
		all: [],
		visible: {},
		invisible: {}
	});
}
function getIndexOfLastItem(draggables, options) {
	if (!draggables.length) return 0;
	const indexOfLastItem = draggables[draggables.length - 1].descriptor.index;
	return options.inHomeList ? indexOfLastItem : indexOfLastItem + 1;
}
function goAtEnd({ insideDestination, inHomeList, displacedBy, destination }) {
	const newIndex = getIndexOfLastItem(insideDestination, { inHomeList });
	return {
		displaced: emptyGroups,
		displacedBy,
		at: {
			type: "REORDER",
			destination: {
				droppableId: destination.descriptor.id,
				index: newIndex
			}
		}
	};
}
function calculateReorderImpact({ draggable: draggable$1, insideDestination, destination, viewport, displacedBy, last, index, forceShouldAnimate }) {
	const inHomeList = isHomeOf(draggable$1, destination);
	if (index == null) return goAtEnd({
		insideDestination,
		inHomeList,
		displacedBy,
		destination
	});
	const match = insideDestination.find((item) => item.descriptor.index === index);
	if (!match) return goAtEnd({
		insideDestination,
		inHomeList,
		displacedBy,
		destination
	});
	const withoutDragging = removeDraggableFromList(draggable$1, insideDestination);
	const sliceFrom = insideDestination.indexOf(match);
	return {
		displaced: getDisplacementGroups({
			afterDragging: withoutDragging.slice(sliceFrom),
			destination,
			displacedBy,
			last,
			viewport: viewport.frame,
			forceShouldAnimate
		}),
		displacedBy,
		at: {
			type: "REORDER",
			destination: {
				droppableId: destination.descriptor.id,
				index
			}
		}
	};
}
function didStartAfterCritical(draggableId, afterCritical) {
	return Boolean(afterCritical.effected[draggableId]);
}
var fromCombine = ({ isMovingForward, destination, draggables, combine: combine$1, afterCritical }) => {
	if (!destination.isCombineEnabled) return null;
	const combineId = combine$1.draggableId;
	const combineWithIndex = draggables[combineId].descriptor.index;
	if (didStartAfterCritical(combineId, afterCritical)) {
		if (isMovingForward) return combineWithIndex;
		return combineWithIndex - 1;
	}
	if (isMovingForward) return combineWithIndex + 1;
	return combineWithIndex;
};
var fromReorder = ({ isMovingForward, isInHomeList, insideDestination, location }) => {
	if (!insideDestination.length) return null;
	const currentIndex = location.index;
	const proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
	const firstIndex = insideDestination[0].descriptor.index;
	const lastIndex = insideDestination[insideDestination.length - 1].descriptor.index;
	const upperBound = isInHomeList ? lastIndex : lastIndex + 1;
	if (proposedIndex < firstIndex) return null;
	if (proposedIndex > upperBound) return null;
	return proposedIndex;
};
var moveToNextIndex = ({ isMovingForward, isInHomeList, draggable: draggable$1, draggables, destination, insideDestination, previousImpact, viewport, afterCritical }) => {
	const wasAt = previousImpact.at;
	!wasAt && invariant();
	if (wasAt.type === "REORDER") {
		const newIndex$1 = fromReorder({
			isMovingForward,
			isInHomeList,
			location: wasAt.destination,
			insideDestination
		});
		if (newIndex$1 == null) return null;
		return calculateReorderImpact({
			draggable: draggable$1,
			insideDestination,
			destination,
			viewport,
			last: previousImpact.displaced,
			displacedBy: previousImpact.displacedBy,
			index: newIndex$1
		});
	}
	const newIndex = fromCombine({
		isMovingForward,
		destination,
		displaced: previousImpact.displaced,
		draggables,
		combine: wasAt.combine,
		afterCritical
	});
	if (newIndex == null) return null;
	return calculateReorderImpact({
		draggable: draggable$1,
		insideDestination,
		destination,
		viewport,
		last: previousImpact.displaced,
		displacedBy: previousImpact.displacedBy,
		index: newIndex
	});
};
var getCombinedItemDisplacement = ({ displaced, afterCritical, combineWith, displacedBy }) => {
	const isDisplaced = Boolean(displaced.visible[combineWith] || displaced.invisible[combineWith]);
	if (didStartAfterCritical(combineWith, afterCritical)) return isDisplaced ? origin : negate(displacedBy.point);
	return isDisplaced ? displacedBy.point : origin;
};
var whenCombining = ({ afterCritical, impact, draggables }) => {
	const combine$1 = tryGetCombine(impact);
	!combine$1 && invariant();
	const combineWith = combine$1.draggableId;
	const center = draggables[combineWith].page.borderBox.center;
	return add(center, getCombinedItemDisplacement({
		displaced: impact.displaced,
		afterCritical,
		combineWith,
		displacedBy: impact.displacedBy
	}));
};
var distanceFromStartToBorderBoxCenter = (axis, box) => box.margin[axis.start] + box.borderBox[axis.size] / 2;
var distanceFromEndToBorderBoxCenter = (axis, box) => box.margin[axis.end] + box.borderBox[axis.size] / 2;
var getCrossAxisBorderBoxCenter = (axis, target, isMoving) => target[axis.crossAxisStart] + isMoving.margin[axis.crossAxisStart] + isMoving.borderBox[axis.crossAxisSize] / 2;
var goAfter = ({ axis, moveRelativeTo, isMoving }) => patch(axis.line, moveRelativeTo.marginBox[axis.end] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
var goBefore = ({ axis, moveRelativeTo, isMoving }) => patch(axis.line, moveRelativeTo.marginBox[axis.start] - distanceFromEndToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
var goIntoStart = ({ axis, moveInto, isMoving }) => patch(axis.line, moveInto.contentBox[axis.start] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveInto.contentBox, isMoving));
var whenReordering = ({ impact, draggable: draggable$1, draggables, droppable: droppable$1, afterCritical }) => {
	const insideDestination = getDraggablesInsideDroppable(droppable$1.descriptor.id, draggables);
	const draggablePage = draggable$1.page;
	const axis = droppable$1.axis;
	if (!insideDestination.length) return goIntoStart({
		axis,
		moveInto: droppable$1.page,
		isMoving: draggablePage
	});
	const { displaced, displacedBy } = impact;
	const closestAfter = displaced.all[0];
	if (closestAfter) {
		const closest$2 = draggables[closestAfter];
		if (didStartAfterCritical(closestAfter, afterCritical)) return goBefore({
			axis,
			moveRelativeTo: closest$2.page,
			isMoving: draggablePage
		});
		return goBefore({
			axis,
			moveRelativeTo: offset(closest$2.page, displacedBy.point),
			isMoving: draggablePage
		});
	}
	const last = insideDestination[insideDestination.length - 1];
	if (last.descriptor.id === draggable$1.descriptor.id) return draggablePage.borderBox.center;
	if (didStartAfterCritical(last.descriptor.id, afterCritical)) return goAfter({
		axis,
		moveRelativeTo: offset(last.page, negate(afterCritical.displacedBy.point)),
		isMoving: draggablePage
	});
	return goAfter({
		axis,
		moveRelativeTo: last.page,
		isMoving: draggablePage
	});
};
var withDroppableDisplacement = (droppable$1, point) => {
	const frame = droppable$1.frame;
	if (!frame) return point;
	return add(point, frame.scroll.diff.displacement);
};
var getResultWithoutDroppableDisplacement = ({ impact, draggable: draggable$1, droppable: droppable$1, draggables, afterCritical }) => {
	const original = draggable$1.page.borderBox.center;
	const at = impact.at;
	if (!droppable$1) return original;
	if (!at) return original;
	if (at.type === "REORDER") return whenReordering({
		impact,
		draggable: draggable$1,
		draggables,
		droppable: droppable$1,
		afterCritical
	});
	return whenCombining({
		impact,
		draggables,
		afterCritical
	});
};
var getPageBorderBoxCenterFromImpact = (args) => {
	const withoutDisplacement = getResultWithoutDroppableDisplacement(args);
	const droppable$1 = args.droppable;
	return droppable$1 ? withDroppableDisplacement(droppable$1, withoutDisplacement) : withoutDisplacement;
};
var scrollViewport = (viewport, newScroll) => {
	const diff = subtract(newScroll, viewport.scroll.initial);
	const displacement = negate(diff);
	return {
		frame: getRect({
			top: newScroll.y,
			bottom: newScroll.y + viewport.frame.height,
			left: newScroll.x,
			right: newScroll.x + viewport.frame.width
		}),
		scroll: {
			initial: viewport.scroll.initial,
			max: viewport.scroll.max,
			current: newScroll,
			diff: {
				value: diff,
				displacement
			}
		}
	};
};
function getDraggables$1(ids, draggables) {
	return ids.map((id) => draggables[id]);
}
function tryGetVisible(id, groups) {
	for (let i = 0; i < groups.length; i++) {
		const displacement = groups[i].visible[id];
		if (displacement) return displacement;
	}
	return null;
}
var speculativelyIncrease = ({ impact, viewport, destination, draggables, maxScrollChange }) => {
	const scrolledViewport = scrollViewport(viewport, add(viewport.scroll.current, maxScrollChange));
	const scrolledDroppable = destination.frame ? scrollDroppable(destination, add(destination.frame.scroll.current, maxScrollChange)) : destination;
	const last = impact.displaced;
	const withViewportScroll = getDisplacementGroups({
		afterDragging: getDraggables$1(last.all, draggables),
		destination,
		displacedBy: impact.displacedBy,
		viewport: scrolledViewport.frame,
		last,
		forceShouldAnimate: false
	});
	const withDroppableScroll$1 = getDisplacementGroups({
		afterDragging: getDraggables$1(last.all, draggables),
		destination: scrolledDroppable,
		displacedBy: impact.displacedBy,
		viewport: viewport.frame,
		last,
		forceShouldAnimate: false
	});
	const invisible = {};
	const visible = {};
	const groups = [
		last,
		withViewportScroll,
		withDroppableScroll$1
	];
	last.all.forEach((id) => {
		const displacement = tryGetVisible(id, groups);
		if (displacement) {
			visible[id] = displacement;
			return;
		}
		invisible[id] = true;
	});
	return {
		...impact,
		displaced: {
			all: last.all,
			invisible,
			visible
		}
	};
};
var withViewportDisplacement = (viewport, point) => add(viewport.scroll.diff.displacement, point);
var getClientFromPageBorderBoxCenter = ({ pageBorderBoxCenter, draggable: draggable$1, viewport }) => {
	const offset$1 = subtract(withViewportDisplacement(viewport, pageBorderBoxCenter), draggable$1.page.borderBox.center);
	return add(draggable$1.client.borderBox.center, offset$1);
};
var isTotallyVisibleInNewLocation = ({ draggable: draggable$1, destination, newPageBorderBoxCenter, viewport, withDroppableDisplacement: withDroppableDisplacement$1, onlyOnMainAxis = false }) => {
	const changeNeeded = subtract(newPageBorderBoxCenter, draggable$1.page.borderBox.center);
	const args = {
		target: offsetByPosition(draggable$1.page.borderBox, changeNeeded),
		destination,
		withDroppableDisplacement: withDroppableDisplacement$1,
		viewport
	};
	return onlyOnMainAxis ? isTotallyVisibleOnAxis(args) : isTotallyVisible(args);
};
var moveToNextPlace = ({ isMovingForward, draggable: draggable$1, destination, draggables, previousImpact, viewport, previousPageBorderBoxCenter, previousClientSelection, afterCritical }) => {
	if (!destination.isEnabled) return null;
	const insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
	const isInHomeList = isHomeOf(draggable$1, destination);
	const impact = moveToNextCombine({
		isMovingForward,
		draggable: draggable$1,
		destination,
		insideDestination,
		previousImpact
	}) || moveToNextIndex({
		isMovingForward,
		isInHomeList,
		draggable: draggable$1,
		draggables,
		destination,
		insideDestination,
		previousImpact,
		viewport,
		afterCritical
	});
	if (!impact) return null;
	const pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
		impact,
		draggable: draggable$1,
		droppable: destination,
		draggables,
		afterCritical
	});
	if (isTotallyVisibleInNewLocation({
		draggable: draggable$1,
		destination,
		newPageBorderBoxCenter: pageBorderBoxCenter,
		viewport: viewport.frame,
		withDroppableDisplacement: false,
		onlyOnMainAxis: true
	})) return {
		clientSelection: getClientFromPageBorderBoxCenter({
			pageBorderBoxCenter,
			draggable: draggable$1,
			viewport
		}),
		impact,
		scrollJumpRequest: null
	};
	const distance$1 = subtract(pageBorderBoxCenter, previousPageBorderBoxCenter);
	return {
		clientSelection: previousClientSelection,
		impact: speculativelyIncrease({
			impact,
			viewport,
			destination,
			draggables,
			maxScrollChange: distance$1
		}),
		scrollJumpRequest: distance$1
	};
};
var getKnownActive = (droppable$1) => {
	const rect = droppable$1.subject.active;
	!rect && invariant();
	return rect;
};
var getBestCrossAxisDroppable = ({ isMovingForward, pageBorderBoxCenter, source, droppables, viewport }) => {
	const active = source.subject.active;
	if (!active) return null;
	const axis = source.axis;
	const isBetweenSourceClipped = isWithin(active[axis.start], active[axis.end]);
	const candidates = toDroppableList(droppables).filter((droppable$1) => droppable$1 !== source).filter((droppable$1) => droppable$1.isEnabled).filter((droppable$1) => Boolean(droppable$1.subject.active)).filter((droppable$1) => isPartiallyVisibleThroughFrame(viewport.frame)(getKnownActive(droppable$1))).filter((droppable$1) => {
		const activeOfTarget = getKnownActive(droppable$1);
		if (isMovingForward) return active[axis.crossAxisEnd] < activeOfTarget[axis.crossAxisEnd];
		return activeOfTarget[axis.crossAxisStart] < active[axis.crossAxisStart];
	}).filter((droppable$1) => {
		const activeOfTarget = getKnownActive(droppable$1);
		const isBetweenDestinationClipped = isWithin(activeOfTarget[axis.start], activeOfTarget[axis.end]);
		return isBetweenSourceClipped(activeOfTarget[axis.start]) || isBetweenSourceClipped(activeOfTarget[axis.end]) || isBetweenDestinationClipped(active[axis.start]) || isBetweenDestinationClipped(active[axis.end]);
	}).sort((a$1, b) => {
		const first = getKnownActive(a$1)[axis.crossAxisStart];
		const second = getKnownActive(b)[axis.crossAxisStart];
		if (isMovingForward) return first - second;
		return second - first;
	}).filter((droppable$1, index, array) => getKnownActive(droppable$1)[axis.crossAxisStart] === getKnownActive(array[0])[axis.crossAxisStart]);
	if (!candidates.length) return null;
	if (candidates.length === 1) return candidates[0];
	const contains = candidates.filter((droppable$1) => {
		return isWithin(getKnownActive(droppable$1)[axis.start], getKnownActive(droppable$1)[axis.end])(pageBorderBoxCenter[axis.line]);
	});
	if (contains.length === 1) return contains[0];
	if (contains.length > 1) return contains.sort((a$1, b) => getKnownActive(a$1)[axis.start] - getKnownActive(b)[axis.start])[0];
	return candidates.sort((a$1, b) => {
		const first = closest$1(pageBorderBoxCenter, getCorners(getKnownActive(a$1)));
		const second = closest$1(pageBorderBoxCenter, getCorners(getKnownActive(b)));
		if (first !== second) return first - second;
		return getKnownActive(a$1)[axis.start] - getKnownActive(b)[axis.start];
	})[0];
};
var getCurrentPageBorderBoxCenter = (draggable$1, afterCritical) => {
	const original = draggable$1.page.borderBox.center;
	return didStartAfterCritical(draggable$1.descriptor.id, afterCritical) ? subtract(original, afterCritical.displacedBy.point) : original;
};
var getCurrentPageBorderBox = (draggable$1, afterCritical) => {
	const original = draggable$1.page.borderBox;
	return didStartAfterCritical(draggable$1.descriptor.id, afterCritical) ? offsetByPosition(original, negate(afterCritical.displacedBy.point)) : original;
};
var getClosestDraggable = ({ pageBorderBoxCenter, viewport, destination, insideDestination, afterCritical }) => {
	return insideDestination.filter((draggable$1) => isTotallyVisible({
		target: getCurrentPageBorderBox(draggable$1, afterCritical),
		destination,
		viewport: viewport.frame,
		withDroppableDisplacement: true
	})).sort((a$1, b) => {
		const distanceToA = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(a$1, afterCritical)));
		const distanceToB = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(b, afterCritical)));
		if (distanceToA < distanceToB) return -1;
		if (distanceToB < distanceToA) return 1;
		return a$1.descriptor.index - b.descriptor.index;
	})[0] || null;
};
var getDisplacedBy = memoizeOne(function getDisplacedBy$1(axis, displaceBy) {
	const displacement = displaceBy[axis.line];
	return {
		value: displacement,
		point: patch(axis.line, displacement)
	};
});
var getRequiredGrowthForPlaceholder = (droppable$1, placeholderSize, draggables) => {
	const axis = droppable$1.axis;
	if (droppable$1.descriptor.mode === "virtual") return patch(axis.line, placeholderSize[axis.line]);
	const availableSpace = droppable$1.subject.page.contentBox[axis.size];
	const needsToGrowBy = getDraggablesInsideDroppable(droppable$1.descriptor.id, draggables).reduce((sum, dimension) => sum + dimension.client.marginBox[axis.size], 0) + placeholderSize[axis.line] - availableSpace;
	if (needsToGrowBy <= 0) return null;
	return patch(axis.line, needsToGrowBy);
};
var withMaxScroll = (frame, max) => ({
	...frame,
	scroll: {
		...frame.scroll,
		max
	}
});
var addPlaceholder = (droppable$1, draggable$1, draggables) => {
	const frame = droppable$1.frame;
	isHomeOf(draggable$1, droppable$1) && invariant();
	droppable$1.subject.withPlaceholder && invariant();
	const placeholderSize = getDisplacedBy(droppable$1.axis, draggable$1.displaceBy).point;
	const requiredGrowth = getRequiredGrowthForPlaceholder(droppable$1, placeholderSize, draggables);
	const added = {
		placeholderSize,
		increasedBy: requiredGrowth,
		oldFrameMaxScroll: droppable$1.frame ? droppable$1.frame.scroll.max : null
	};
	if (!frame) {
		const subject$1 = getSubject({
			page: droppable$1.subject.page,
			withPlaceholder: added,
			axis: droppable$1.axis,
			frame: droppable$1.frame
		});
		return {
			...droppable$1,
			subject: subject$1
		};
	}
	const newFrame = withMaxScroll(frame, requiredGrowth ? add(frame.scroll.max, requiredGrowth) : frame.scroll.max);
	const subject = getSubject({
		page: droppable$1.subject.page,
		withPlaceholder: added,
		axis: droppable$1.axis,
		frame: newFrame
	});
	return {
		...droppable$1,
		subject,
		frame: newFrame
	};
};
var removePlaceholder = (droppable$1) => {
	const added = droppable$1.subject.withPlaceholder;
	!added && invariant();
	const frame = droppable$1.frame;
	if (!frame) {
		const subject$1 = getSubject({
			page: droppable$1.subject.page,
			axis: droppable$1.axis,
			frame: null,
			withPlaceholder: null
		});
		return {
			...droppable$1,
			subject: subject$1
		};
	}
	const oldMaxScroll = added.oldFrameMaxScroll;
	!oldMaxScroll && invariant();
	const newFrame = withMaxScroll(frame, oldMaxScroll);
	const subject = getSubject({
		page: droppable$1.subject.page,
		axis: droppable$1.axis,
		frame: newFrame,
		withPlaceholder: null
	});
	return {
		...droppable$1,
		subject,
		frame: newFrame
	};
};
var moveToNewDroppable = ({ previousPageBorderBoxCenter, moveRelativeTo, insideDestination, draggable: draggable$1, draggables, destination, viewport, afterCritical }) => {
	if (!moveRelativeTo) {
		if (insideDestination.length) return null;
		const proposed = {
			displaced: emptyGroups,
			displacedBy: noDisplacedBy,
			at: {
				type: "REORDER",
				destination: {
					droppableId: destination.descriptor.id,
					index: 0
				}
			}
		};
		const proposedPageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
			impact: proposed,
			draggable: draggable$1,
			droppable: destination,
			draggables,
			afterCritical
		});
		return isTotallyVisibleInNewLocation({
			draggable: draggable$1,
			destination: isHomeOf(draggable$1, destination) ? destination : addPlaceholder(destination, draggable$1, draggables),
			newPageBorderBoxCenter: proposedPageBorderBoxCenter,
			viewport: viewport.frame,
			withDroppableDisplacement: false,
			onlyOnMainAxis: true
		}) ? proposed : null;
	}
	const isGoingBeforeTarget = Boolean(previousPageBorderBoxCenter[destination.axis.line] <= moveRelativeTo.page.borderBox.center[destination.axis.line]);
	const proposedIndex = (() => {
		const relativeTo = moveRelativeTo.descriptor.index;
		if (moveRelativeTo.descriptor.id === draggable$1.descriptor.id) return relativeTo;
		if (isGoingBeforeTarget) return relativeTo;
		return relativeTo + 1;
	})();
	return calculateReorderImpact({
		draggable: draggable$1,
		insideDestination,
		destination,
		viewport,
		displacedBy: getDisplacedBy(destination.axis, draggable$1.displaceBy),
		last: emptyGroups,
		index: proposedIndex
	});
};
var moveCrossAxis = ({ isMovingForward, previousPageBorderBoxCenter, draggable: draggable$1, isOver, draggables, droppables, viewport, afterCritical }) => {
	const destination = getBestCrossAxisDroppable({
		isMovingForward,
		pageBorderBoxCenter: previousPageBorderBoxCenter,
		source: isOver,
		droppables,
		viewport
	});
	if (!destination) return null;
	const insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
	const impact = moveToNewDroppable({
		previousPageBorderBoxCenter,
		destination,
		draggable: draggable$1,
		draggables,
		moveRelativeTo: getClosestDraggable({
			pageBorderBoxCenter: previousPageBorderBoxCenter,
			viewport,
			destination,
			insideDestination,
			afterCritical
		}),
		insideDestination,
		viewport,
		afterCritical
	});
	if (!impact) return null;
	return {
		clientSelection: getClientFromPageBorderBoxCenter({
			pageBorderBoxCenter: getPageBorderBoxCenterFromImpact({
				impact,
				draggable: draggable$1,
				droppable: destination,
				draggables,
				afterCritical
			}),
			draggable: draggable$1,
			viewport
		}),
		impact,
		scrollJumpRequest: null
	};
};
var whatIsDraggedOver = (impact) => {
	const at = impact.at;
	if (!at) return null;
	if (at.type === "REORDER") return at.destination.droppableId;
	return at.combine.droppableId;
};
var getDroppableOver$1 = (impact, droppables) => {
	const id = whatIsDraggedOver(impact);
	return id ? droppables[id] : null;
};
var moveInDirection = ({ state, type }) => {
	const isActuallyOver = getDroppableOver$1(state.impact, state.dimensions.droppables);
	const isMainAxisMovementAllowed = Boolean(isActuallyOver);
	const home$1 = state.dimensions.droppables[state.critical.droppable.id];
	const isOver = isActuallyOver || home$1;
	const direction = isOver.axis.direction;
	const isMovingOnMainAxis = direction === "vertical" && (type === "MOVE_UP" || type === "MOVE_DOWN") || direction === "horizontal" && (type === "MOVE_LEFT" || type === "MOVE_RIGHT");
	if (isMovingOnMainAxis && !isMainAxisMovementAllowed) return null;
	const isMovingForward = type === "MOVE_DOWN" || type === "MOVE_RIGHT";
	const draggable$1 = state.dimensions.draggables[state.critical.draggable.id];
	const previousPageBorderBoxCenter = state.current.page.borderBoxCenter;
	const { draggables, droppables } = state.dimensions;
	return isMovingOnMainAxis ? moveToNextPlace({
		isMovingForward,
		previousPageBorderBoxCenter,
		draggable: draggable$1,
		destination: isOver,
		draggables,
		viewport: state.viewport,
		previousClientSelection: state.current.client.selection,
		previousImpact: state.impact,
		afterCritical: state.afterCritical
	}) : moveCrossAxis({
		isMovingForward,
		previousPageBorderBoxCenter,
		draggable: draggable$1,
		isOver,
		draggables,
		droppables,
		viewport: state.viewport,
		afterCritical: state.afterCritical
	});
};
function isMovementAllowed(state) {
	return state.phase === "DRAGGING" || state.phase === "COLLECTING";
}
function isPositionInFrame(frame) {
	const isWithinVertical = isWithin(frame.top, frame.bottom);
	const isWithinHorizontal = isWithin(frame.left, frame.right);
	return function run(point) {
		return isWithinVertical(point.y) && isWithinHorizontal(point.x);
	};
}
function getHasOverlap(first, second) {
	return first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
}
function getFurthestAway({ pageBorderBox, draggable: draggable$1, candidates }) {
	const startCenter = draggable$1.page.borderBox.center;
	const sorted = candidates.map((candidate) => {
		const axis = candidate.axis;
		const target = patch(candidate.axis.line, pageBorderBox.center[axis.line], candidate.page.borderBox.center[axis.crossAxisLine]);
		return {
			id: candidate.descriptor.id,
			distance: distance(startCenter, target)
		};
	}).sort((a$1, b) => b.distance - a$1.distance);
	return sorted[0] ? sorted[0].id : null;
}
function getDroppableOver({ pageBorderBox, draggable: draggable$1, droppables }) {
	const candidates = toDroppableList(droppables).filter((item) => {
		if (!item.isEnabled) return false;
		const active = item.subject.active;
		if (!active) return false;
		if (!getHasOverlap(pageBorderBox, active)) return false;
		if (isPositionInFrame(active)(pageBorderBox.center)) return true;
		const axis = item.axis;
		const childCenter = active.center[axis.crossAxisLine];
		const crossAxisStart = pageBorderBox[axis.crossAxisStart];
		const crossAxisEnd = pageBorderBox[axis.crossAxisEnd];
		const isContained = isWithin(active[axis.crossAxisStart], active[axis.crossAxisEnd]);
		const isStartContained = isContained(crossAxisStart);
		const isEndContained = isContained(crossAxisEnd);
		if (!isStartContained && !isEndContained) return true;
		if (isStartContained) return crossAxisStart < childCenter;
		return crossAxisEnd > childCenter;
	});
	if (!candidates.length) return null;
	if (candidates.length === 1) return candidates[0].descriptor.id;
	return getFurthestAway({
		pageBorderBox,
		draggable: draggable$1,
		candidates
	});
}
var offsetRectByPosition = (rect, point) => getRect(offsetByPosition(rect, point));
var withDroppableScroll = (droppable$1, area) => {
	const frame = droppable$1.frame;
	if (!frame) return area;
	return offsetRectByPosition(area, frame.scroll.diff.value);
};
function getIsDisplaced({ displaced, id }) {
	return Boolean(displaced.visible[id] || displaced.invisible[id]);
}
function atIndex({ draggable: draggable$1, closest: closest$2, inHomeList }) {
	if (!closest$2) return null;
	if (!inHomeList) return closest$2.descriptor.index;
	if (closest$2.descriptor.index > draggable$1.descriptor.index) return closest$2.descriptor.index - 1;
	return closest$2.descriptor.index;
}
var getReorderImpact = ({ pageBorderBoxWithDroppableScroll: targetRect, draggable: draggable$1, destination, insideDestination, last, viewport, afterCritical }) => {
	const axis = destination.axis;
	const displacedBy = getDisplacedBy(destination.axis, draggable$1.displaceBy);
	const displacement = displacedBy.value;
	const targetStart = targetRect[axis.start];
	const targetEnd = targetRect[axis.end];
	return calculateReorderImpact({
		draggable: draggable$1,
		insideDestination,
		destination,
		viewport,
		last,
		displacedBy,
		index: atIndex({
			draggable: draggable$1,
			closest: removeDraggableFromList(draggable$1, insideDestination).find((child) => {
				const id = child.descriptor.id;
				const childCenter = child.page.borderBox.center[axis.line];
				const didStartAfterCritical$1 = didStartAfterCritical(id, afterCritical);
				const isDisplaced = getIsDisplaced({
					displaced: last,
					id
				});
				if (didStartAfterCritical$1) {
					if (isDisplaced) return targetEnd <= childCenter;
					return targetStart < childCenter - displacement;
				}
				if (isDisplaced) return targetEnd <= childCenter + displacement;
				return targetStart < childCenter;
			}) || null,
			inHomeList: isHomeOf(draggable$1, destination)
		})
	});
};
var combineThresholdDivisor = 4;
var getCombineImpact = ({ draggable: draggable$1, pageBorderBoxWithDroppableScroll: targetRect, previousImpact, destination, insideDestination, afterCritical }) => {
	if (!destination.isCombineEnabled) return null;
	const axis = destination.axis;
	const displacedBy = getDisplacedBy(destination.axis, draggable$1.displaceBy);
	const displacement = displacedBy.value;
	const targetStart = targetRect[axis.start];
	const targetEnd = targetRect[axis.end];
	const combineWith = removeDraggableFromList(draggable$1, insideDestination).find((child) => {
		const id = child.descriptor.id;
		const childRect = child.page.borderBox;
		const threshold = childRect[axis.size] / combineThresholdDivisor;
		const didStartAfterCritical$1 = didStartAfterCritical(id, afterCritical);
		const isDisplaced = getIsDisplaced({
			displaced: previousImpact.displaced,
			id
		});
		if (didStartAfterCritical$1) {
			if (isDisplaced) return targetEnd > childRect[axis.start] + threshold && targetEnd < childRect[axis.end] - threshold;
			return targetStart > childRect[axis.start] - displacement + threshold && targetStart < childRect[axis.end] - displacement - threshold;
		}
		if (isDisplaced) return targetEnd > childRect[axis.start] + displacement + threshold && targetEnd < childRect[axis.end] + displacement - threshold;
		return targetStart > childRect[axis.start] + threshold && targetStart < childRect[axis.end] - threshold;
	});
	if (!combineWith) return null;
	return {
		displacedBy,
		displaced: previousImpact.displaced,
		at: {
			type: "COMBINE",
			combine: {
				draggableId: combineWith.descriptor.id,
				droppableId: destination.descriptor.id
			}
		}
	};
};
var getDragImpact = ({ pageOffset, draggable: draggable$1, draggables, droppables, previousImpact, viewport, afterCritical }) => {
	const pageBorderBox = offsetRectByPosition(draggable$1.page.borderBox, pageOffset);
	const destinationId = getDroppableOver({
		pageBorderBox,
		draggable: draggable$1,
		droppables
	});
	if (!destinationId) return noImpact;
	const destination = droppables[destinationId];
	const insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
	const pageBorderBoxWithDroppableScroll = withDroppableScroll(destination, pageBorderBox);
	return getCombineImpact({
		pageBorderBoxWithDroppableScroll,
		draggable: draggable$1,
		previousImpact,
		destination,
		insideDestination,
		afterCritical
	}) || getReorderImpact({
		pageBorderBoxWithDroppableScroll,
		draggable: draggable$1,
		destination,
		insideDestination,
		last: previousImpact.displaced,
		viewport,
		afterCritical
	});
};
var patchDroppableMap = (droppables, updated) => ({
	...droppables,
	[updated.descriptor.id]: updated
});
var clearUnusedPlaceholder = ({ previousImpact, impact, droppables }) => {
	const last = whatIsDraggedOver(previousImpact);
	const now = whatIsDraggedOver(impact);
	if (!last) return droppables;
	if (last === now) return droppables;
	const lastDroppable = droppables[last];
	if (!lastDroppable.subject.withPlaceholder) return droppables;
	return patchDroppableMap(droppables, removePlaceholder(lastDroppable));
};
var recomputePlaceholders = ({ draggable: draggable$1, draggables, droppables, previousImpact, impact }) => {
	const cleaned = clearUnusedPlaceholder({
		previousImpact,
		impact,
		droppables
	});
	const isOver = whatIsDraggedOver(impact);
	if (!isOver) return cleaned;
	const droppable$1 = droppables[isOver];
	if (isHomeOf(draggable$1, droppable$1)) return cleaned;
	if (droppable$1.subject.withPlaceholder) return cleaned;
	return patchDroppableMap(cleaned, addPlaceholder(droppable$1, draggable$1, draggables));
};
var update = ({ state, clientSelection: forcedClientSelection, dimensions: forcedDimensions, viewport: forcedViewport, impact: forcedImpact, scrollJumpRequest }) => {
	const viewport = forcedViewport || state.viewport;
	const dimensions = forcedDimensions || state.dimensions;
	const clientSelection = forcedClientSelection || state.current.client.selection;
	const offset$1 = subtract(clientSelection, state.initial.client.selection);
	const client = {
		offset: offset$1,
		selection: clientSelection,
		borderBoxCenter: add(state.initial.client.borderBoxCenter, offset$1)
	};
	const page = {
		selection: add(client.selection, viewport.scroll.current),
		borderBoxCenter: add(client.borderBoxCenter, viewport.scroll.current),
		offset: add(client.offset, viewport.scroll.diff.value)
	};
	const current = {
		client,
		page
	};
	if (state.phase === "COLLECTING") return {
		...state,
		dimensions,
		viewport,
		current
	};
	const draggable$1 = dimensions.draggables[state.critical.draggable.id];
	const newImpact = forcedImpact || getDragImpact({
		pageOffset: page.offset,
		draggable: draggable$1,
		draggables: dimensions.draggables,
		droppables: dimensions.droppables,
		previousImpact: state.impact,
		viewport,
		afterCritical: state.afterCritical
	});
	const withUpdatedPlaceholders = recomputePlaceholders({
		draggable: draggable$1,
		impact: newImpact,
		previousImpact: state.impact,
		draggables: dimensions.draggables,
		droppables: dimensions.droppables
	});
	return {
		...state,
		current,
		dimensions: {
			draggables: dimensions.draggables,
			droppables: withUpdatedPlaceholders
		},
		impact: newImpact,
		viewport,
		scrollJumpRequest: scrollJumpRequest || null,
		forceShouldAnimate: scrollJumpRequest ? false : null
	};
};
function getDraggables(ids, draggables) {
	return ids.map((id) => draggables[id]);
}
var recompute = ({ impact, viewport, draggables, destination, forceShouldAnimate }) => {
	const last = impact.displaced;
	const displaced = getDisplacementGroups({
		afterDragging: getDraggables(last.all, draggables),
		destination,
		displacedBy: impact.displacedBy,
		viewport: viewport.frame,
		forceShouldAnimate,
		last
	});
	return {
		...impact,
		displaced
	};
};
var getClientBorderBoxCenter = ({ impact, draggable: draggable$1, droppable: droppable$1, draggables, viewport, afterCritical }) => {
	return getClientFromPageBorderBoxCenter({
		pageBorderBoxCenter: getPageBorderBoxCenterFromImpact({
			impact,
			draggable: draggable$1,
			draggables,
			droppable: droppable$1,
			afterCritical
		}),
		draggable: draggable$1,
		viewport
	});
};
var refreshSnap = ({ state, dimensions: forcedDimensions, viewport: forcedViewport }) => {
	!(state.movementMode === "SNAP") && invariant();
	const needsVisibilityCheck = state.impact;
	const viewport = forcedViewport || state.viewport;
	const dimensions = forcedDimensions || state.dimensions;
	const { draggables, droppables } = dimensions;
	const draggable$1 = draggables[state.critical.draggable.id];
	const isOver = whatIsDraggedOver(needsVisibilityCheck);
	!isOver && invariant();
	const destination = droppables[isOver];
	const impact = recompute({
		impact: needsVisibilityCheck,
		viewport,
		destination,
		draggables
	});
	return update({
		impact,
		clientSelection: getClientBorderBoxCenter({
			impact,
			draggable: draggable$1,
			droppable: destination,
			draggables,
			viewport,
			afterCritical: state.afterCritical
		}),
		state,
		dimensions,
		viewport
	});
};
var getHomeLocation = (descriptor) => ({
	index: descriptor.index,
	droppableId: descriptor.droppableId
});
var getLiftEffect = ({ draggable: draggable$1, home: home$1, draggables, viewport }) => {
	const displacedBy = getDisplacedBy(home$1.axis, draggable$1.displaceBy);
	const insideHome = getDraggablesInsideDroppable(home$1.descriptor.id, draggables);
	const rawIndex = insideHome.indexOf(draggable$1);
	!(rawIndex !== -1) && invariant();
	const afterDragging = insideHome.slice(rawIndex + 1);
	const effected = afterDragging.reduce((previous, item) => {
		previous[item.descriptor.id] = true;
		return previous;
	}, {});
	const afterCritical = {
		inVirtualList: home$1.descriptor.mode === "virtual",
		displacedBy,
		effected
	};
	return {
		impact: {
			displaced: getDisplacementGroups({
				afterDragging,
				destination: home$1,
				displacedBy,
				last: null,
				viewport: viewport.frame,
				forceShouldAnimate: false
			}),
			displacedBy,
			at: {
				type: "REORDER",
				destination: getHomeLocation(draggable$1.descriptor)
			}
		},
		afterCritical
	};
};
var patchDimensionMap = (dimensions, updated) => ({
	draggables: dimensions.draggables,
	droppables: patchDroppableMap(dimensions.droppables, updated)
});
var start = (key) => {};
var finish = (key) => {};
var offsetDraggable = ({ draggable: draggable$1, offset: offset$1, initialWindowScroll }) => {
	const client = offset(draggable$1.client, offset$1);
	const page = withScroll(client, initialWindowScroll);
	return {
		...draggable$1,
		placeholder: {
			...draggable$1.placeholder,
			client
		},
		client,
		page
	};
};
var getFrame = (droppable$1) => {
	const frame = droppable$1.frame;
	!frame && invariant();
	return frame;
};
var adjustAdditionsForScrollChanges = ({ additions, updatedDroppables, viewport }) => {
	const windowScrollChange = viewport.scroll.diff.value;
	return additions.map((draggable$1) => {
		const modified = updatedDroppables[draggable$1.descriptor.droppableId];
		const droppableScrollChange = getFrame(modified).scroll.diff.value;
		return offsetDraggable({
			draggable: draggable$1,
			offset: add(windowScrollChange, droppableScrollChange),
			initialWindowScroll: viewport.scroll.initial
		});
	});
};
var publishWhileDraggingInVirtual = ({ state, published }) => {
	start();
	const withScrollChange = published.modified.map((update$1) => {
		const existing = state.dimensions.droppables[update$1.droppableId];
		return scrollDroppable(existing, update$1.scroll);
	});
	const droppables = {
		...state.dimensions.droppables,
		...toDroppableMap(withScrollChange)
	};
	const updatedAdditions = toDraggableMap(adjustAdditionsForScrollChanges({
		additions: published.additions,
		updatedDroppables: droppables,
		viewport: state.viewport
	}));
	const draggables = {
		...state.dimensions.draggables,
		...updatedAdditions
	};
	published.removals.forEach((id) => {
		delete draggables[id];
	});
	const dimensions = {
		droppables,
		draggables
	};
	const wasOverId = whatIsDraggedOver(state.impact);
	const wasOver = wasOverId ? dimensions.droppables[wasOverId] : null;
	const draggable$1 = dimensions.draggables[state.critical.draggable.id];
	const home$1 = dimensions.droppables[state.critical.droppable.id];
	const { impact: onLiftImpact, afterCritical } = getLiftEffect({
		draggable: draggable$1,
		home: home$1,
		draggables,
		viewport: state.viewport
	});
	const previousImpact = wasOver && wasOver.isCombineEnabled ? state.impact : onLiftImpact;
	const impact = getDragImpact({
		pageOffset: state.current.page.offset,
		draggable: dimensions.draggables[state.critical.draggable.id],
		draggables: dimensions.draggables,
		droppables: dimensions.droppables,
		previousImpact,
		viewport: state.viewport,
		afterCritical
	});
	finish();
	const draggingState = {
		...state,
		phase: "DRAGGING",
		impact,
		onLiftImpact,
		dimensions,
		afterCritical,
		forceShouldAnimate: false
	};
	if (state.phase === "COLLECTING") return draggingState;
	return {
		...draggingState,
		phase: "DROP_PENDING",
		reason: state.reason,
		isWaiting: false
	};
};
var isSnapping = (state) => state.movementMode === "SNAP";
var postDroppableChange = (state, updated, isEnabledChanging) => {
	const dimensions = patchDimensionMap(state.dimensions, updated);
	if (!isSnapping(state) || isEnabledChanging) return update({
		state,
		dimensions
	});
	return refreshSnap({
		state,
		dimensions
	});
};
function removeScrollJumpRequest(state) {
	if (state.isDragging && state.movementMode === "SNAP") return {
		...state,
		scrollJumpRequest: null
	};
	return state;
}
var idle$2 = {
	phase: "IDLE",
	completed: null,
	shouldFlush: false
};
var reducer = (state = idle$2, action) => {
	if (action.type === "FLUSH") return {
		...idle$2,
		shouldFlush: true
	};
	if (action.type === "INITIAL_PUBLISH") {
		!(state.phase === "IDLE") && invariant();
		const { critical, clientSelection, viewport, dimensions, movementMode } = action.payload;
		const draggable$1 = dimensions.draggables[critical.draggable.id];
		const home$1 = dimensions.droppables[critical.droppable.id];
		const client = {
			selection: clientSelection,
			borderBoxCenter: draggable$1.client.borderBox.center,
			offset: origin
		};
		const initial = {
			client,
			page: {
				selection: add(client.selection, viewport.scroll.initial),
				borderBoxCenter: add(client.selection, viewport.scroll.initial),
				offset: add(client.selection, viewport.scroll.diff.value)
			}
		};
		const isWindowScrollAllowed = toDroppableList(dimensions.droppables).every((item) => !item.isFixedOnPage);
		const { impact, afterCritical } = getLiftEffect({
			draggable: draggable$1,
			home: home$1,
			draggables: dimensions.draggables,
			viewport
		});
		return {
			phase: "DRAGGING",
			isDragging: true,
			critical,
			movementMode,
			dimensions,
			initial,
			current: initial,
			isWindowScrollAllowed,
			impact,
			afterCritical,
			onLiftImpact: impact,
			viewport,
			scrollJumpRequest: null,
			forceShouldAnimate: null
		};
	}
	if (action.type === "COLLECTION_STARTING") {
		if (state.phase === "COLLECTING" || state.phase === "DROP_PENDING") return state;
		!(state.phase === "DRAGGING") && invariant();
		return {
			...state,
			phase: "COLLECTING"
		};
	}
	if (action.type === "PUBLISH_WHILE_DRAGGING") {
		!(state.phase === "COLLECTING" || state.phase === "DROP_PENDING") && invariant();
		return publishWhileDraggingInVirtual({
			state,
			published: action.payload
		});
	}
	if (action.type === "MOVE") {
		if (state.phase === "DROP_PENDING") return state;
		!isMovementAllowed(state) && invariant();
		const { client: clientSelection } = action.payload;
		if (isEqual$1(clientSelection, state.current.client.selection)) return state;
		return update({
			state,
			clientSelection,
			impact: isSnapping(state) ? state.impact : null
		});
	}
	if (action.type === "UPDATE_DROPPABLE_SCROLL") {
		if (state.phase === "DROP_PENDING") return removeScrollJumpRequest(state);
		if (state.phase === "COLLECTING") return removeScrollJumpRequest(state);
		!isMovementAllowed(state) && invariant();
		const { id, newScroll } = action.payload;
		const target = state.dimensions.droppables[id];
		if (!target) return state;
		return postDroppableChange(state, scrollDroppable(target, newScroll), false);
	}
	if (action.type === "UPDATE_DROPPABLE_IS_ENABLED") {
		if (state.phase === "DROP_PENDING") return state;
		!isMovementAllowed(state) && invariant();
		const { id, isEnabled } = action.payload;
		const target = state.dimensions.droppables[id];
		!target && invariant();
		!(target.isEnabled !== isEnabled) && invariant();
		return postDroppableChange(state, {
			...target,
			isEnabled
		}, true);
	}
	if (action.type === "UPDATE_DROPPABLE_IS_COMBINE_ENABLED") {
		if (state.phase === "DROP_PENDING") return state;
		!isMovementAllowed(state) && invariant();
		const { id, isCombineEnabled } = action.payload;
		const target = state.dimensions.droppables[id];
		!target && invariant();
		!(target.isCombineEnabled !== isCombineEnabled) && invariant();
		return postDroppableChange(state, {
			...target,
			isCombineEnabled
		}, true);
	}
	if (action.type === "MOVE_BY_WINDOW_SCROLL") {
		if (state.phase === "DROP_PENDING" || state.phase === "DROP_ANIMATING") return state;
		!isMovementAllowed(state) && invariant();
		!state.isWindowScrollAllowed && invariant();
		const newScroll = action.payload.newScroll;
		if (isEqual$1(state.viewport.scroll.current, newScroll)) return removeScrollJumpRequest(state);
		const viewport = scrollViewport(state.viewport, newScroll);
		if (isSnapping(state)) return refreshSnap({
			state,
			viewport
		});
		return update({
			state,
			viewport
		});
	}
	if (action.type === "UPDATE_VIEWPORT_MAX_SCROLL") {
		if (!isMovementAllowed(state)) return state;
		const maxScroll = action.payload.maxScroll;
		if (isEqual$1(maxScroll, state.viewport.scroll.max)) return state;
		const withMaxScroll$1 = {
			...state.viewport,
			scroll: {
				...state.viewport.scroll,
				max: maxScroll
			}
		};
		return {
			...state,
			viewport: withMaxScroll$1
		};
	}
	if (action.type === "MOVE_UP" || action.type === "MOVE_DOWN" || action.type === "MOVE_LEFT" || action.type === "MOVE_RIGHT") {
		if (state.phase === "COLLECTING" || state.phase === "DROP_PENDING") return state;
		!(state.phase === "DRAGGING") && invariant();
		const result = moveInDirection({
			state,
			type: action.type
		});
		if (!result) return state;
		return update({
			state,
			impact: result.impact,
			clientSelection: result.clientSelection,
			scrollJumpRequest: result.scrollJumpRequest
		});
	}
	if (action.type === "DROP_PENDING") {
		const reason = action.payload.reason;
		!(state.phase === "COLLECTING") && invariant();
		return {
			...state,
			phase: "DROP_PENDING",
			isWaiting: true,
			reason
		};
	}
	if (action.type === "DROP_ANIMATE") {
		const { completed, dropDuration, newHomeClientOffset } = action.payload;
		!(state.phase === "DRAGGING" || state.phase === "DROP_PENDING") && invariant();
		return {
			phase: "DROP_ANIMATING",
			completed,
			dropDuration,
			newHomeClientOffset,
			dimensions: state.dimensions
		};
	}
	if (action.type === "DROP_COMPLETE") {
		const { completed } = action.payload;
		return {
			phase: "IDLE",
			completed,
			shouldFlush: false
		};
	}
	return state;
};
function guard(action, predicate) {
	return action instanceof Object && "type" in action && action.type === predicate;
}
var beforeInitialCapture = (args) => ({
	type: "BEFORE_INITIAL_CAPTURE",
	payload: args
});
var lift$1 = (args) => ({
	type: "LIFT",
	payload: args
});
var initialPublish = (args) => ({
	type: "INITIAL_PUBLISH",
	payload: args
});
var publishWhileDragging = (args) => ({
	type: "PUBLISH_WHILE_DRAGGING",
	payload: args
});
var collectionStarting = () => ({
	type: "COLLECTION_STARTING",
	payload: null
});
var updateDroppableScroll = (args) => ({
	type: "UPDATE_DROPPABLE_SCROLL",
	payload: args
});
var updateDroppableIsEnabled = (args) => ({
	type: "UPDATE_DROPPABLE_IS_ENABLED",
	payload: args
});
var updateDroppableIsCombineEnabled = (args) => ({
	type: "UPDATE_DROPPABLE_IS_COMBINE_ENABLED",
	payload: args
});
var move = (args) => ({
	type: "MOVE",
	payload: args
});
var moveByWindowScroll = (args) => ({
	type: "MOVE_BY_WINDOW_SCROLL",
	payload: args
});
var updateViewportMaxScroll = (args) => ({
	type: "UPDATE_VIEWPORT_MAX_SCROLL",
	payload: args
});
var moveUp = () => ({
	type: "MOVE_UP",
	payload: null
});
var moveDown = () => ({
	type: "MOVE_DOWN",
	payload: null
});
var moveRight = () => ({
	type: "MOVE_RIGHT",
	payload: null
});
var moveLeft = () => ({
	type: "MOVE_LEFT",
	payload: null
});
var flush = () => ({
	type: "FLUSH",
	payload: null
});
var animateDrop = (args) => ({
	type: "DROP_ANIMATE",
	payload: args
});
var completeDrop = (args) => ({
	type: "DROP_COMPLETE",
	payload: args
});
var drop = (args) => ({
	type: "DROP",
	payload: args
});
var dropPending = (args) => ({
	type: "DROP_PENDING",
	payload: args
});
var dropAnimationFinished = () => ({
	type: "DROP_ANIMATION_FINISHED",
	payload: null
});
function validateDimensions(critical, dimensions) {}
var lift = (marshal) => ({ getState, dispatch }) => (next) => (action) => {
	if (!guard(action, "LIFT")) {
		next(action);
		return;
	}
	const { id, clientSelection, movementMode } = action.payload;
	const initial = getState();
	if (initial.phase === "DROP_ANIMATING") dispatch(completeDrop({ completed: initial.completed }));
	!(getState().phase === "IDLE") && invariant();
	dispatch(flush());
	dispatch(beforeInitialCapture({
		draggableId: id,
		movementMode
	}));
	const request = {
		draggableId: id,
		scrollOptions: { shouldPublishImmediately: movementMode === "SNAP" }
	};
	const { critical, dimensions, viewport } = marshal.startPublishing(request);
	validateDimensions(critical, dimensions);
	dispatch(initialPublish({
		critical,
		dimensions,
		clientSelection,
		movementMode,
		viewport
	}));
};
var style = (marshal) => () => (next) => (action) => {
	if (guard(action, "INITIAL_PUBLISH")) marshal.dragging();
	if (guard(action, "DROP_ANIMATE")) marshal.dropping(action.payload.completed.result.reason);
	if (guard(action, "FLUSH") || guard(action, "DROP_COMPLETE")) marshal.resting();
	next(action);
};
var curves = {
	outOfTheWay: "cubic-bezier(0.2, 0, 0, 1)",
	drop: "cubic-bezier(.2,1,.1,1)"
};
var combine = {
	opacity: {
		drop: 0,
		combining: .7
	},
	scale: { drop: .75 }
};
var timings = {
	outOfTheWay: .2,
	minDropTime: .33,
	maxDropTime: .55
};
var outOfTheWayTiming = `${timings.outOfTheWay}s ${curves.outOfTheWay}`;
var transitions = {
	fluid: `opacity ${outOfTheWayTiming}`,
	snap: `transform ${outOfTheWayTiming}, opacity ${outOfTheWayTiming}`,
	drop: (duration) => {
		const timing = `${duration}s ${curves.drop}`;
		return `transform ${timing}, opacity ${timing}`;
	},
	outOfTheWay: `transform ${outOfTheWayTiming}`,
	placeholder: `height ${outOfTheWayTiming}, width ${outOfTheWayTiming}, margin ${outOfTheWayTiming}`
};
var moveTo = (offset$1) => isEqual$1(offset$1, origin) ? void 0 : `translate(${offset$1.x}px, ${offset$1.y}px)`;
var transforms = {
	moveTo,
	drop: (offset$1, isCombining) => {
		const translate = moveTo(offset$1);
		if (!translate) return;
		if (!isCombining) return translate;
		return `${translate} scale(${combine.scale.drop})`;
	}
};
var { minDropTime, maxDropTime } = timings;
var dropTimeRange = maxDropTime - minDropTime;
var maxDropTimeAtDistance = 1500;
var cancelDropModifier = .6;
var getDropDuration = ({ current, destination, reason }) => {
	const distance$1 = distance(current, destination);
	if (distance$1 <= 0) return minDropTime;
	if (distance$1 >= maxDropTimeAtDistance) return maxDropTime;
	const duration = minDropTime + dropTimeRange * (distance$1 / maxDropTimeAtDistance);
	const withDuration = reason === "CANCEL" ? duration * cancelDropModifier : duration;
	return Number(withDuration.toFixed(2));
};
var getNewHomeClientOffset = ({ impact, draggable: draggable$1, dimensions, viewport, afterCritical }) => {
	const { draggables, droppables } = dimensions;
	const droppableId = whatIsDraggedOver(impact);
	const destination = droppableId ? droppables[droppableId] : null;
	const home$1 = droppables[draggable$1.descriptor.droppableId];
	return subtract(getClientBorderBoxCenter({
		impact,
		draggable: draggable$1,
		draggables,
		afterCritical,
		droppable: destination || home$1,
		viewport
	}), draggable$1.client.borderBox.center);
};
var getDropImpact = ({ draggables, reason, lastImpact, home: home$1, viewport, onLiftImpact }) => {
	if (!lastImpact.at || reason !== "DROP") return {
		impact: recompute({
			draggables,
			impact: onLiftImpact,
			destination: home$1,
			viewport,
			forceShouldAnimate: true
		}),
		didDropInsideDroppable: false
	};
	if (lastImpact.at.type === "REORDER") return {
		impact: lastImpact,
		didDropInsideDroppable: true
	};
	return {
		impact: {
			...lastImpact,
			displaced: emptyGroups
		},
		didDropInsideDroppable: true
	};
};
var dropMiddleware = ({ getState, dispatch }) => (next) => (action) => {
	if (!guard(action, "DROP")) {
		next(action);
		return;
	}
	const state = getState();
	const reason = action.payload.reason;
	if (state.phase === "COLLECTING") {
		dispatch(dropPending({ reason }));
		return;
	}
	if (state.phase === "IDLE") return;
	state.phase === "DROP_PENDING" && state.isWaiting && invariant();
	!(state.phase === "DRAGGING" || state.phase === "DROP_PENDING") && invariant();
	const critical = state.critical;
	const dimensions = state.dimensions;
	const draggable$1 = dimensions.draggables[state.critical.draggable.id];
	const { impact, didDropInsideDroppable } = getDropImpact({
		reason,
		lastImpact: state.impact,
		afterCritical: state.afterCritical,
		onLiftImpact: state.onLiftImpact,
		home: state.dimensions.droppables[state.critical.droppable.id],
		viewport: state.viewport,
		draggables: state.dimensions.draggables
	});
	const destination = didDropInsideDroppable ? tryGetDestination(impact) : null;
	const combine$1 = didDropInsideDroppable ? tryGetCombine(impact) : null;
	const source = {
		index: critical.draggable.index,
		droppableId: critical.droppable.id
	};
	const result = {
		draggableId: draggable$1.descriptor.id,
		type: draggable$1.descriptor.type,
		source,
		reason,
		mode: state.movementMode,
		destination,
		combine: combine$1
	};
	const newHomeClientOffset = getNewHomeClientOffset({
		impact,
		draggable: draggable$1,
		dimensions,
		viewport: state.viewport,
		afterCritical: state.afterCritical
	});
	const completed = {
		critical: state.critical,
		afterCritical: state.afterCritical,
		result,
		impact
	};
	if (!(!isEqual$1(state.current.client.offset, newHomeClientOffset) || Boolean(result.combine))) {
		dispatch(completeDrop({ completed }));
		return;
	}
	dispatch(animateDrop({
		newHomeClientOffset,
		dropDuration: getDropDuration({
			current: state.current.client.offset,
			destination: newHomeClientOffset,
			reason
		}),
		completed
	}));
};
var getWindowScroll = () => ({
	x: window.pageXOffset,
	y: window.pageYOffset
});
function getWindowScrollBinding(update$1) {
	return {
		eventName: "scroll",
		options: {
			passive: true,
			capture: false
		},
		fn: (event) => {
			if (event.target !== window && event.target !== window.document) return;
			update$1();
		}
	};
}
function getScrollListener({ onWindowScroll }) {
	function updateScroll() {
		onWindowScroll(getWindowScroll());
	}
	const scheduled = raf_schd_esm_default(updateScroll);
	const binding = getWindowScrollBinding(scheduled);
	let unbind = noop$2;
	function isActive$1() {
		return unbind !== noop$2;
	}
	function start$1() {
		isActive$1() && invariant();
		unbind = bindEvents(window, [binding]);
	}
	function stop() {
		!isActive$1() && invariant();
		scheduled.cancel();
		unbind();
		unbind = noop$2;
	}
	return {
		start: start$1,
		stop,
		isActive: isActive$1
	};
}
var shouldStop$1 = (action) => guard(action, "DROP_COMPLETE") || guard(action, "DROP_ANIMATE") || guard(action, "FLUSH");
var scrollListener = (store) => {
	const listener = getScrollListener({ onWindowScroll: (newScroll) => {
		store.dispatch(moveByWindowScroll({ newScroll }));
	} });
	return (next) => (action) => {
		if (!listener.isActive() && guard(action, "INITIAL_PUBLISH")) listener.start();
		if (listener.isActive() && shouldStop$1(action)) listener.stop();
		next(action);
	};
};
var getExpiringAnnounce = (announce) => {
	let wasCalled = false;
	let isExpired = false;
	const timeoutId = setTimeout(() => {
		isExpired = true;
	});
	const result = (message) => {
		if (wasCalled) return;
		if (isExpired) return;
		wasCalled = true;
		announce(message);
		clearTimeout(timeoutId);
	};
	result.wasCalled = () => wasCalled;
	return result;
};
var getAsyncMarshal = () => {
	const entries = [];
	const execute$1 = (timerId) => {
		const index = entries.findIndex((item) => item.timerId === timerId);
		!(index !== -1) && invariant();
		const [entry] = entries.splice(index, 1);
		entry.callback();
	};
	const add$1 = (fn) => {
		const timerId = setTimeout(() => execute$1(timerId));
		const entry = {
			timerId,
			callback: fn
		};
		entries.push(entry);
	};
	const flush$1 = () => {
		if (!entries.length) return;
		const shallow = [...entries];
		entries.length = 0;
		shallow.forEach((entry) => {
			clearTimeout(entry.timerId);
			entry.callback();
		});
	};
	return {
		add: add$1,
		flush: flush$1
	};
};
var areLocationsEqual = (first, second) => {
	if (first == null && second == null) return true;
	if (first == null || second == null) return false;
	return first.droppableId === second.droppableId && first.index === second.index;
};
var isCombineEqual = (first, second) => {
	if (first == null && second == null) return true;
	if (first == null || second == null) return false;
	return first.draggableId === second.draggableId && first.droppableId === second.droppableId;
};
var isCriticalEqual = (first, second) => {
	if (first === second) return true;
	const isDraggableEqual = first.draggable.id === second.draggable.id && first.draggable.droppableId === second.draggable.droppableId && first.draggable.type === second.draggable.type && first.draggable.index === second.draggable.index;
	const isDroppableEqual = first.droppable.id === second.droppable.id && first.droppable.type === second.droppable.type;
	return isDraggableEqual && isDroppableEqual;
};
var withTimings = (key, fn) => {
	start();
	fn();
	finish();
};
var getDragStart = (critical, mode) => ({
	draggableId: critical.draggable.id,
	type: critical.droppable.type,
	source: {
		droppableId: critical.droppable.id,
		index: critical.draggable.index
	},
	mode
});
function execute(responder, data, announce, getDefaultMessage) {
	if (!responder) {
		announce(getDefaultMessage(data));
		return;
	}
	const willExpire = getExpiringAnnounce(announce);
	responder(data, { announce: willExpire });
	if (!willExpire.wasCalled()) announce(getDefaultMessage(data));
}
var getPublisher = (getResponders, announce) => {
	const asyncMarshal = getAsyncMarshal();
	let dragging = null;
	const beforeCapture = (draggableId, mode) => {
		dragging && invariant();
		withTimings("onBeforeCapture", () => {
			const fn = getResponders().onBeforeCapture;
			if (fn) fn({
				draggableId,
				mode
			});
		});
	};
	const beforeStart = (critical, mode) => {
		dragging && invariant();
		withTimings("onBeforeDragStart", () => {
			const fn = getResponders().onBeforeDragStart;
			if (fn) fn(getDragStart(critical, mode));
		});
	};
	const start$1 = (critical, mode) => {
		dragging && invariant();
		const data = getDragStart(critical, mode);
		dragging = {
			mode,
			lastCritical: critical,
			lastLocation: data.source,
			lastCombine: null
		};
		asyncMarshal.add(() => {
			withTimings("onDragStart", () => execute(getResponders().onDragStart, data, announce, preset.onDragStart));
		});
	};
	const update$1 = (critical, impact) => {
		const location = tryGetDestination(impact);
		const combine$1 = tryGetCombine(impact);
		!dragging && invariant();
		const hasCriticalChanged = !isCriticalEqual(critical, dragging.lastCritical);
		if (hasCriticalChanged) dragging.lastCritical = critical;
		const hasLocationChanged = !areLocationsEqual(dragging.lastLocation, location);
		if (hasLocationChanged) dragging.lastLocation = location;
		const hasGroupingChanged = !isCombineEqual(dragging.lastCombine, combine$1);
		if (hasGroupingChanged) dragging.lastCombine = combine$1;
		if (!hasCriticalChanged && !hasLocationChanged && !hasGroupingChanged) return;
		const data = {
			...getDragStart(critical, dragging.mode),
			combine: combine$1,
			destination: location
		};
		asyncMarshal.add(() => {
			withTimings("onDragUpdate", () => execute(getResponders().onDragUpdate, data, announce, preset.onDragUpdate));
		});
	};
	const flush$1 = () => {
		!dragging && invariant();
		asyncMarshal.flush();
	};
	const drop$1 = (result) => {
		!dragging && invariant();
		dragging = null;
		withTimings("onDragEnd", () => execute(getResponders().onDragEnd, result, announce, preset.onDragEnd));
	};
	const abort = () => {
		if (!dragging) return;
		drop$1({
			...getDragStart(dragging.lastCritical, dragging.mode),
			combine: null,
			destination: null,
			reason: "CANCEL"
		});
	};
	return {
		beforeCapture,
		beforeStart,
		start: start$1,
		update: update$1,
		flush: flush$1,
		drop: drop$1,
		abort
	};
};
var responders = (getResponders, announce) => {
	const publisher = getPublisher(getResponders, announce);
	return (store) => (next) => (action) => {
		if (guard(action, "BEFORE_INITIAL_CAPTURE")) {
			publisher.beforeCapture(action.payload.draggableId, action.payload.movementMode);
			return;
		}
		if (guard(action, "INITIAL_PUBLISH")) {
			const critical = action.payload.critical;
			publisher.beforeStart(critical, action.payload.movementMode);
			next(action);
			publisher.start(critical, action.payload.movementMode);
			return;
		}
		if (guard(action, "DROP_COMPLETE")) {
			const result = action.payload.completed.result;
			publisher.flush();
			next(action);
			publisher.drop(result);
			return;
		}
		next(action);
		if (guard(action, "FLUSH")) {
			publisher.abort();
			return;
		}
		const state = store.getState();
		if (state.phase === "DRAGGING") publisher.update(state.critical, state.impact);
	};
};
var dropAnimationFinishMiddleware = (store) => (next) => (action) => {
	if (!guard(action, "DROP_ANIMATION_FINISHED")) {
		next(action);
		return;
	}
	const state = store.getState();
	!(state.phase === "DROP_ANIMATING") && invariant();
	store.dispatch(completeDrop({ completed: state.completed }));
};
var dropAnimationFlushOnScrollMiddleware = (store) => {
	let unbind = null;
	let frameId = null;
	function clear() {
		if (frameId) {
			cancelAnimationFrame(frameId);
			frameId = null;
		}
		if (unbind) {
			unbind();
			unbind = null;
		}
	}
	return (next) => (action) => {
		if (guard(action, "FLUSH") || guard(action, "DROP_COMPLETE") || guard(action, "DROP_ANIMATION_FINISHED")) clear();
		next(action);
		if (!guard(action, "DROP_ANIMATE")) return;
		const binding = {
			eventName: "scroll",
			options: {
				capture: true,
				passive: false,
				once: true
			},
			fn: function flushDropAnimation() {
				if (store.getState().phase === "DROP_ANIMATING") store.dispatch(dropAnimationFinished());
			}
		};
		frameId = requestAnimationFrame(() => {
			frameId = null;
			unbind = bindEvents(window, [binding]);
		});
	};
};
var dimensionMarshalStopper = (marshal) => () => (next) => (action) => {
	if (guard(action, "DROP_COMPLETE") || guard(action, "FLUSH") || guard(action, "DROP_ANIMATE")) marshal.stopPublishing();
	next(action);
};
var focus = (marshal) => {
	let isWatching = false;
	return () => (next) => (action) => {
		if (guard(action, "INITIAL_PUBLISH")) {
			isWatching = true;
			marshal.tryRecordFocus(action.payload.critical.draggable.id);
			next(action);
			marshal.tryRestoreFocusRecorded();
			return;
		}
		next(action);
		if (!isWatching) return;
		if (guard(action, "FLUSH")) {
			isWatching = false;
			marshal.tryRestoreFocusRecorded();
			return;
		}
		if (guard(action, "DROP_COMPLETE")) {
			isWatching = false;
			const result = action.payload.completed.result;
			if (result.combine) marshal.tryShiftRecord(result.draggableId, result.combine.draggableId);
			marshal.tryRestoreFocusRecorded();
		}
	};
};
var shouldStop = (action) => guard(action, "DROP_COMPLETE") || guard(action, "DROP_ANIMATE") || guard(action, "FLUSH");
var autoScroll = (autoScroller) => (store) => (next) => (action) => {
	if (shouldStop(action)) {
		autoScroller.stop();
		next(action);
		return;
	}
	if (guard(action, "INITIAL_PUBLISH")) {
		next(action);
		const state = store.getState();
		!(state.phase === "DRAGGING") && invariant();
		autoScroller.start(state);
		return;
	}
	next(action);
	autoScroller.scroll(store.getState());
};
var pendingDrop = (store) => (next) => (action) => {
	next(action);
	if (!guard(action, "PUBLISH_WHILE_DRAGGING")) return;
	const postActionState = store.getState();
	if (postActionState.phase !== "DROP_PENDING") return;
	if (postActionState.isWaiting) return;
	store.dispatch(drop({ reason: postActionState.reason }));
};
var composeEnhancers = compose;
var createStore$1 = ({ dimensionMarshal, focusMarshal, styleMarshal, getResponders, announce, autoScroller }) => createStore(reducer, composeEnhancers(applyMiddleware(style(styleMarshal), dimensionMarshalStopper(dimensionMarshal), lift(dimensionMarshal), dropMiddleware, dropAnimationFinishMiddleware, dropAnimationFlushOnScrollMiddleware, pendingDrop, autoScroll(autoScroller), scrollListener, focus(focusMarshal), responders(getResponders, announce))));
var clean$1 = () => ({
	additions: {},
	removals: {},
	modified: {}
});
function createPublisher({ registry, callbacks }) {
	let staging = clean$1();
	let frameId = null;
	const collect = () => {
		if (frameId) return;
		callbacks.collectionStarting();
		frameId = requestAnimationFrame(() => {
			frameId = null;
			start();
			const { additions, removals, modified } = staging;
			const added = Object.keys(additions).map((id) => registry.draggable.getById(id).getDimension(origin)).sort((a$1, b) => a$1.descriptor.index - b.descriptor.index);
			const updated = Object.keys(modified).map((id) => {
				return {
					droppableId: id,
					scroll: registry.droppable.getById(id).callbacks.getScrollWhileDragging()
				};
			});
			const result = {
				additions: added,
				removals: Object.keys(removals),
				modified: updated
			};
			staging = clean$1();
			finish();
			callbacks.publish(result);
		});
	};
	const add$1 = (entry) => {
		const id = entry.descriptor.id;
		staging.additions[id] = entry;
		staging.modified[entry.descriptor.droppableId] = true;
		if (staging.removals[id]) delete staging.removals[id];
		collect();
	};
	const remove = (entry) => {
		const descriptor = entry.descriptor;
		staging.removals[descriptor.id] = true;
		staging.modified[descriptor.droppableId] = true;
		if (staging.additions[descriptor.id]) delete staging.additions[descriptor.id];
		collect();
	};
	const stop = () => {
		if (!frameId) return;
		cancelAnimationFrame(frameId);
		frameId = null;
		staging = clean$1();
	};
	return {
		add: add$1,
		remove,
		stop
	};
}
var getMaxScroll = ({ scrollHeight, scrollWidth, height, width }) => {
	const maxScroll = subtract({
		x: scrollWidth,
		y: scrollHeight
	}, {
		x: width,
		y: height
	});
	return {
		x: Math.max(0, maxScroll.x),
		y: Math.max(0, maxScroll.y)
	};
};
var getDocumentElement = () => {
	const doc = document.documentElement;
	!doc && invariant();
	return doc;
};
var getMaxWindowScroll = () => {
	const doc = getDocumentElement();
	return getMaxScroll({
		scrollHeight: doc.scrollHeight,
		scrollWidth: doc.scrollWidth,
		width: doc.clientWidth,
		height: doc.clientHeight
	});
};
var getViewport = () => {
	const scroll$2 = getWindowScroll();
	const maxScroll = getMaxWindowScroll();
	const top = scroll$2.y;
	const left = scroll$2.x;
	const doc = getDocumentElement();
	const width = doc.clientWidth;
	const height = doc.clientHeight;
	return {
		frame: getRect({
			top,
			left,
			right: left + width,
			bottom: top + height
		}),
		scroll: {
			initial: scroll$2,
			current: scroll$2,
			max: maxScroll,
			diff: {
				value: origin,
				displacement: origin
			}
		}
	};
};
var getInitialPublish = ({ critical, scrollOptions, registry }) => {
	start();
	const viewport = getViewport();
	const windowScroll = viewport.scroll.current;
	const home$1 = critical.droppable;
	const droppables = registry.droppable.getAllByType(home$1.type).map((entry) => entry.callbacks.getDimensionAndWatchScroll(windowScroll, scrollOptions));
	const dimensions = {
		draggables: toDraggableMap(registry.draggable.getAllByType(critical.draggable.type).map((entry) => entry.getDimension(windowScroll))),
		droppables: toDroppableMap(droppables)
	};
	finish();
	return {
		dimensions,
		critical,
		viewport
	};
};
function shouldPublishUpdate(registry, dragging, entry) {
	if (entry.descriptor.id === dragging.id) return false;
	if (entry.descriptor.type !== dragging.type) return false;
	if (registry.droppable.getById(entry.descriptor.droppableId).descriptor.mode !== "virtual") return false;
	return true;
}
var createDimensionMarshal = (registry, callbacks) => {
	let collection = null;
	const publisher = createPublisher({
		callbacks: {
			publish: callbacks.publishWhileDragging,
			collectionStarting: callbacks.collectionStarting
		},
		registry
	});
	const updateDroppableIsEnabled$1 = (id, isEnabled) => {
		!registry.droppable.exists(id) && invariant();
		if (!collection) return;
		callbacks.updateDroppableIsEnabled({
			id,
			isEnabled
		});
	};
	const updateDroppableIsCombineEnabled$1 = (id, isCombineEnabled) => {
		if (!collection) return;
		!registry.droppable.exists(id) && invariant();
		callbacks.updateDroppableIsCombineEnabled({
			id,
			isCombineEnabled
		});
	};
	const updateDroppableScroll$1 = (id, newScroll) => {
		if (!collection) return;
		!registry.droppable.exists(id) && invariant();
		callbacks.updateDroppableScroll({
			id,
			newScroll
		});
	};
	const scrollDroppable$1 = (id, change) => {
		if (!collection) return;
		registry.droppable.getById(id).callbacks.scroll(change);
	};
	const stopPublishing = () => {
		if (!collection) return;
		publisher.stop();
		const home$1 = collection.critical.droppable;
		registry.droppable.getAllByType(home$1.type).forEach((entry) => entry.callbacks.dragStopped());
		collection.unsubscribe();
		collection = null;
	};
	const subscriber = (event) => {
		!collection && invariant();
		const dragging = collection.critical.draggable;
		if (event.type === "ADDITION") {
			if (shouldPublishUpdate(registry, dragging, event.value)) publisher.add(event.value);
		}
		if (event.type === "REMOVAL") {
			if (shouldPublishUpdate(registry, dragging, event.value)) publisher.remove(event.value);
		}
	};
	const startPublishing = (request) => {
		collection && invariant();
		const entry = registry.draggable.getById(request.draggableId);
		const home$1 = registry.droppable.getById(entry.descriptor.droppableId);
		const critical = {
			draggable: entry.descriptor,
			droppable: home$1.descriptor
		};
		collection = {
			critical,
			unsubscribe: registry.subscribe(subscriber)
		};
		return getInitialPublish({
			critical,
			registry,
			scrollOptions: request.scrollOptions
		});
	};
	return {
		updateDroppableIsEnabled: updateDroppableIsEnabled$1,
		updateDroppableIsCombineEnabled: updateDroppableIsCombineEnabled$1,
		scrollDroppable: scrollDroppable$1,
		updateDroppableScroll: updateDroppableScroll$1,
		startPublishing,
		stopPublishing
	};
};
var canStartDrag = (state, id) => {
	if (state.phase === "IDLE") return true;
	if (state.phase !== "DROP_ANIMATING") return false;
	if (state.completed.result.draggableId === id) return false;
	return state.completed.result.reason === "DROP";
};
var scrollWindow = (change) => {
	window.scrollBy(change.x, change.y);
};
var getScrollableDroppables = memoizeOne((droppables) => toDroppableList(droppables).filter((droppable$1) => {
	if (!droppable$1.isEnabled) return false;
	if (!droppable$1.frame) return false;
	return true;
}));
var getScrollableDroppableOver = (target, droppables) => {
	return getScrollableDroppables(droppables).find((droppable$1) => {
		!droppable$1.frame && invariant();
		return isPositionInFrame(droppable$1.frame.pageMarginBox)(target);
	}) || null;
};
var getBestScrollableDroppable = ({ center, destination, droppables }) => {
	if (destination) {
		const dimension = droppables[destination];
		if (!dimension.frame) return null;
		return dimension;
	}
	return getScrollableDroppableOver(center, droppables);
};
var defaultAutoScrollerOptions = {
	startFromPercentage: .25,
	maxScrollAtPercentage: .05,
	maxPixelScroll: 28,
	ease: (percentage) => percentage ** 2,
	durationDampening: {
		stopDampeningAt: 1200,
		accelerateAt: 360
	},
	disabled: false
};
var getDistanceThresholds = (container, axis, getAutoScrollerOptions = () => defaultAutoScrollerOptions) => {
	const autoScrollerOptions = getAutoScrollerOptions();
	return {
		startScrollingFrom: container[axis.size] * autoScrollerOptions.startFromPercentage,
		maxScrollValueAt: container[axis.size] * autoScrollerOptions.maxScrollAtPercentage
	};
};
var getPercentage = ({ startOfRange, endOfRange, current }) => {
	const range = endOfRange - startOfRange;
	if (range === 0) return 0;
	return (current - startOfRange) / range;
};
var minScroll = 1;
var getValueFromDistance = (distanceToEdge, thresholds, getAutoScrollerOptions = () => defaultAutoScrollerOptions) => {
	const autoScrollerOptions = getAutoScrollerOptions();
	if (distanceToEdge > thresholds.startScrollingFrom) return 0;
	if (distanceToEdge <= thresholds.maxScrollValueAt) return autoScrollerOptions.maxPixelScroll;
	if (distanceToEdge === thresholds.startScrollingFrom) return minScroll;
	const percentageFromStartScrollingFrom = 1 - getPercentage({
		startOfRange: thresholds.maxScrollValueAt,
		endOfRange: thresholds.startScrollingFrom,
		current: distanceToEdge
	});
	const scroll$2 = autoScrollerOptions.maxPixelScroll * autoScrollerOptions.ease(percentageFromStartScrollingFrom);
	return Math.ceil(scroll$2);
};
var dampenValueByTime = (proposedScroll, dragStartTime, getAutoScrollerOptions) => {
	const autoScrollerOptions = getAutoScrollerOptions();
	const accelerateAt = autoScrollerOptions.durationDampening.accelerateAt;
	const stopAt = autoScrollerOptions.durationDampening.stopDampeningAt;
	const startOfRange = dragStartTime;
	const endOfRange = stopAt;
	const runTime = Date.now() - startOfRange;
	if (runTime >= stopAt) return proposedScroll;
	if (runTime < accelerateAt) return minScroll;
	const betweenAccelerateAtAndStopAtPercentage = getPercentage({
		startOfRange: accelerateAt,
		endOfRange,
		current: runTime
	});
	const scroll$2 = proposedScroll * autoScrollerOptions.ease(betweenAccelerateAtAndStopAtPercentage);
	return Math.ceil(scroll$2);
};
var getValue = ({ distanceToEdge, thresholds, dragStartTime, shouldUseTimeDampening, getAutoScrollerOptions }) => {
	const scroll$2 = getValueFromDistance(distanceToEdge, thresholds, getAutoScrollerOptions);
	if (scroll$2 === 0) return 0;
	if (!shouldUseTimeDampening) return scroll$2;
	return Math.max(dampenValueByTime(scroll$2, dragStartTime, getAutoScrollerOptions), minScroll);
};
var getScrollOnAxis = ({ container, distanceToEdges, dragStartTime, axis, shouldUseTimeDampening, getAutoScrollerOptions }) => {
	const thresholds = getDistanceThresholds(container, axis, getAutoScrollerOptions);
	if (distanceToEdges[axis.end] < distanceToEdges[axis.start]) return getValue({
		distanceToEdge: distanceToEdges[axis.end],
		thresholds,
		dragStartTime,
		shouldUseTimeDampening,
		getAutoScrollerOptions
	});
	return -1 * getValue({
		distanceToEdge: distanceToEdges[axis.start],
		thresholds,
		dragStartTime,
		shouldUseTimeDampening,
		getAutoScrollerOptions
	});
};
var adjustForSizeLimits = ({ container, subject, proposedScroll }) => {
	const isTooBigVertically = subject.height > container.height;
	const isTooBigHorizontally = subject.width > container.width;
	if (!isTooBigHorizontally && !isTooBigVertically) return proposedScroll;
	if (isTooBigHorizontally && isTooBigVertically) return null;
	return {
		x: isTooBigHorizontally ? 0 : proposedScroll.x,
		y: isTooBigVertically ? 0 : proposedScroll.y
	};
};
var clean = apply((value) => value === 0 ? 0 : value);
var getScroll$1 = ({ dragStartTime, container, subject, center, shouldUseTimeDampening, getAutoScrollerOptions }) => {
	const distanceToEdges = {
		top: center.y - container.top,
		right: container.right - center.x,
		bottom: container.bottom - center.y,
		left: center.x - container.left
	};
	const y = getScrollOnAxis({
		container,
		distanceToEdges,
		dragStartTime,
		axis: vertical,
		shouldUseTimeDampening,
		getAutoScrollerOptions
	});
	const required = clean({
		x: getScrollOnAxis({
			container,
			distanceToEdges,
			dragStartTime,
			axis: horizontal,
			shouldUseTimeDampening,
			getAutoScrollerOptions
		}),
		y
	});
	if (isEqual$1(required, origin)) return null;
	const limited = adjustForSizeLimits({
		container,
		subject,
		proposedScroll: required
	});
	if (!limited) return null;
	return isEqual$1(limited, origin) ? null : limited;
};
var smallestSigned = apply((value) => {
	if (value === 0) return 0;
	return value > 0 ? 1 : -1;
});
var getOverlap = (() => {
	const getRemainder = (target, max) => {
		if (target < 0) return target;
		if (target > max) return target - max;
		return 0;
	};
	return ({ current, max, change }) => {
		const targetScroll = add(current, change);
		const overlap = {
			x: getRemainder(targetScroll.x, max.x),
			y: getRemainder(targetScroll.y, max.y)
		};
		if (isEqual$1(overlap, origin)) return null;
		return overlap;
	};
})();
var canPartiallyScroll = ({ max: rawMax, current, change }) => {
	const max = {
		x: Math.max(current.x, rawMax.x),
		y: Math.max(current.y, rawMax.y)
	};
	const smallestChange = smallestSigned(change);
	const overlap = getOverlap({
		max,
		current,
		change: smallestChange
	});
	if (!overlap) return true;
	if (smallestChange.x !== 0 && overlap.x === 0) return true;
	if (smallestChange.y !== 0 && overlap.y === 0) return true;
	return false;
};
var canScrollWindow = (viewport, change) => canPartiallyScroll({
	current: viewport.scroll.current,
	max: viewport.scroll.max,
	change
});
var getWindowOverlap = (viewport, change) => {
	if (!canScrollWindow(viewport, change)) return null;
	const max = viewport.scroll.max;
	const current = viewport.scroll.current;
	return getOverlap({
		current,
		max,
		change
	});
};
var canScrollDroppable = (droppable$1, change) => {
	const frame = droppable$1.frame;
	if (!frame) return false;
	return canPartiallyScroll({
		current: frame.scroll.current,
		max: frame.scroll.max,
		change
	});
};
var getDroppableOverlap = (droppable$1, change) => {
	const frame = droppable$1.frame;
	if (!frame) return null;
	if (!canScrollDroppable(droppable$1, change)) return null;
	return getOverlap({
		current: frame.scroll.current,
		max: frame.scroll.max,
		change
	});
};
var getWindowScrollChange = ({ viewport, subject, center, dragStartTime, shouldUseTimeDampening, getAutoScrollerOptions }) => {
	const scroll$2 = getScroll$1({
		dragStartTime,
		container: viewport.frame,
		subject,
		center,
		shouldUseTimeDampening,
		getAutoScrollerOptions
	});
	return scroll$2 && canScrollWindow(viewport, scroll$2) ? scroll$2 : null;
};
var getDroppableScrollChange = ({ droppable: droppable$1, subject, center, dragStartTime, shouldUseTimeDampening, getAutoScrollerOptions }) => {
	const frame = droppable$1.frame;
	if (!frame) return null;
	const scroll$2 = getScroll$1({
		dragStartTime,
		container: frame.pageMarginBox,
		subject,
		center,
		shouldUseTimeDampening,
		getAutoScrollerOptions
	});
	return scroll$2 && canScrollDroppable(droppable$1, scroll$2) ? scroll$2 : null;
};
var scroll = ({ state, dragStartTime, shouldUseTimeDampening, scrollWindow: scrollWindow$1, scrollDroppable: scrollDroppable$1, getAutoScrollerOptions }) => {
	const center = state.current.page.borderBoxCenter;
	const subject = state.dimensions.draggables[state.critical.draggable.id].page.marginBox;
	if (state.isWindowScrollAllowed) {
		const viewport = state.viewport;
		const change$1 = getWindowScrollChange({
			dragStartTime,
			viewport,
			subject,
			center,
			shouldUseTimeDampening,
			getAutoScrollerOptions
		});
		if (change$1) {
			scrollWindow$1(change$1);
			return;
		}
	}
	const droppable$1 = getBestScrollableDroppable({
		center,
		destination: whatIsDraggedOver(state.impact),
		droppables: state.dimensions.droppables
	});
	if (!droppable$1) return;
	const change = getDroppableScrollChange({
		dragStartTime,
		droppable: droppable$1,
		subject,
		center,
		shouldUseTimeDampening,
		getAutoScrollerOptions
	});
	if (change) scrollDroppable$1(droppable$1.descriptor.id, change);
};
var createFluidScroller = ({ scrollWindow: scrollWindow$1, scrollDroppable: scrollDroppable$1, getAutoScrollerOptions = () => defaultAutoScrollerOptions }) => {
	const scheduleWindowScroll = raf_schd_esm_default(scrollWindow$1);
	const scheduleDroppableScroll = raf_schd_esm_default(scrollDroppable$1);
	let dragging = null;
	const tryScroll = (state) => {
		!dragging && invariant();
		const { shouldUseTimeDampening, dragStartTime } = dragging;
		scroll({
			state,
			scrollWindow: scheduleWindowScroll,
			scrollDroppable: scheduleDroppableScroll,
			dragStartTime,
			shouldUseTimeDampening,
			getAutoScrollerOptions
		});
	};
	const start$1 = (state) => {
		start();
		dragging && invariant();
		const dragStartTime = Date.now();
		let wasScrollNeeded = false;
		const fakeScrollCallback = () => {
			wasScrollNeeded = true;
		};
		scroll({
			state,
			dragStartTime: 0,
			shouldUseTimeDampening: false,
			scrollWindow: fakeScrollCallback,
			scrollDroppable: fakeScrollCallback,
			getAutoScrollerOptions
		});
		dragging = {
			dragStartTime,
			shouldUseTimeDampening: wasScrollNeeded
		};
		finish();
		if (wasScrollNeeded) tryScroll(state);
	};
	const stop = () => {
		if (!dragging) return;
		scheduleWindowScroll.cancel();
		scheduleDroppableScroll.cancel();
		dragging = null;
	};
	return {
		start: start$1,
		stop,
		scroll: tryScroll
	};
};
var createJumpScroller = ({ move: move$1, scrollDroppable: scrollDroppable$1, scrollWindow: scrollWindow$1 }) => {
	const moveByOffset = (state, offset$1) => {
		move$1({ client: add(state.current.client.selection, offset$1) });
	};
	const scrollDroppableAsMuchAsItCan = (droppable$1, change) => {
		if (!canScrollDroppable(droppable$1, change)) return change;
		const overlap = getDroppableOverlap(droppable$1, change);
		if (!overlap) {
			scrollDroppable$1(droppable$1.descriptor.id, change);
			return null;
		}
		const whatTheDroppableCanScroll = subtract(change, overlap);
		scrollDroppable$1(droppable$1.descriptor.id, whatTheDroppableCanScroll);
		return subtract(change, whatTheDroppableCanScroll);
	};
	const scrollWindowAsMuchAsItCan = (isWindowScrollAllowed, viewport, change) => {
		if (!isWindowScrollAllowed) return change;
		if (!canScrollWindow(viewport, change)) return change;
		const overlap = getWindowOverlap(viewport, change);
		if (!overlap) {
			scrollWindow$1(change);
			return null;
		}
		const whatTheWindowCanScroll = subtract(change, overlap);
		scrollWindow$1(whatTheWindowCanScroll);
		return subtract(change, whatTheWindowCanScroll);
	};
	const jumpScroller = (state) => {
		const request = state.scrollJumpRequest;
		if (!request) return;
		const destination = whatIsDraggedOver(state.impact);
		!destination && invariant();
		const droppableRemainder = scrollDroppableAsMuchAsItCan(state.dimensions.droppables[destination], request);
		if (!droppableRemainder) return;
		const viewport = state.viewport;
		const windowRemainder = scrollWindowAsMuchAsItCan(state.isWindowScrollAllowed, viewport, droppableRemainder);
		if (!windowRemainder) return;
		moveByOffset(state, windowRemainder);
	};
	return jumpScroller;
};
var createAutoScroller = ({ scrollDroppable: scrollDroppable$1, scrollWindow: scrollWindow$1, move: move$1, getAutoScrollerOptions }) => {
	const fluidScroller = createFluidScroller({
		scrollWindow: scrollWindow$1,
		scrollDroppable: scrollDroppable$1,
		getAutoScrollerOptions
	});
	const jumpScroll = createJumpScroller({
		move: move$1,
		scrollWindow: scrollWindow$1,
		scrollDroppable: scrollDroppable$1
	});
	const scroll$2 = (state) => {
		if (getAutoScrollerOptions().disabled || state.phase !== "DRAGGING") return;
		if (state.movementMode === "FLUID") {
			fluidScroller.scroll(state);
			return;
		}
		if (!state.scrollJumpRequest) return;
		jumpScroll(state);
	};
	return {
		scroll: scroll$2,
		start: fluidScroller.start,
		stop: fluidScroller.stop
	};
};
var prefix = "data-rfd";
var dragHandle = (() => {
	const base = `${prefix}-drag-handle`;
	return {
		base,
		draggableId: `${base}-draggable-id`,
		contextId: `${base}-context-id`
	};
})();
var draggable = (() => {
	const base = `${prefix}-draggable`;
	return {
		base,
		contextId: `${base}-context-id`,
		id: `${base}-id`
	};
})();
var droppable = (() => {
	const base = `${prefix}-droppable`;
	return {
		base,
		contextId: `${base}-context-id`,
		id: `${base}-id`
	};
})();
var scrollContainer = { contextId: `${prefix}-scroll-container-context-id` };
var makeGetSelector = (context) => (attribute) => `[${attribute}="${context}"]`;
var getStyles = (rules, property) => rules.map((rule) => {
	const value = rule.styles[property];
	if (!value) return "";
	return `${rule.selector} { ${value} }`;
}).join(" ");
var noPointerEvents = "pointer-events: none;";
var getStyles$1 = (contextId) => {
	const getSelector$1 = makeGetSelector(contextId);
	const dragHandle$1 = (() => {
		const grabCursor = `
      cursor: -webkit-grab;
      cursor: grab;
    `;
		return {
			selector: getSelector$1(dragHandle.contextId),
			styles: {
				always: `
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          touch-action: manipulation;
        `,
				resting: grabCursor,
				dragging: noPointerEvents,
				dropAnimating: grabCursor
			}
		};
	})();
	const rules = [
		(() => {
			const transition = `
      transition: ${transitions.outOfTheWay};
    `;
			return {
				selector: getSelector$1(draggable.contextId),
				styles: {
					dragging: transition,
					dropAnimating: transition,
					userCancel: transition
				}
			};
		})(),
		dragHandle$1,
		{
			selector: getSelector$1(droppable.contextId),
			styles: { always: `overflow-anchor: none;` }
		},
		{
			selector: "body",
			styles: { dragging: `
        cursor: grabbing;
        cursor: -webkit-grabbing;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        overflow-anchor: none;
      ` }
		}
	];
	return {
		always: getStyles(rules, "always"),
		resting: getStyles(rules, "resting"),
		dragging: getStyles(rules, "dragging"),
		dropAnimating: getStyles(rules, "dropAnimating"),
		userCancel: getStyles(rules, "userCancel")
	};
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
var getHead = () => {
	const head = document.querySelector("head");
	!head && invariant();
	return head;
};
var createStyleEl = (nonce) => {
	const el = document.createElement("style");
	if (nonce) el.setAttribute("nonce", nonce);
	el.type = "text/css";
	return el;
};
function useStyleMarshal(contextId, nonce) {
	const styles = useMemo$1(() => getStyles$1(contextId), [contextId]);
	const alwaysRef = (0, import_react.useRef)(null);
	const dynamicRef = (0, import_react.useRef)(null);
	const setDynamicStyle = useCallback(memoizeOne((proposed) => {
		const el = dynamicRef.current;
		!el && invariant();
		el.textContent = proposed;
	}), []);
	const setAlwaysStyle = useCallback((proposed) => {
		const el = alwaysRef.current;
		!el && invariant();
		el.textContent = proposed;
	}, []);
	useIsomorphicLayoutEffect(() => {
		!(!alwaysRef.current && !dynamicRef.current) && invariant();
		const always = createStyleEl(nonce);
		const dynamic = createStyleEl(nonce);
		alwaysRef.current = always;
		dynamicRef.current = dynamic;
		always.setAttribute(`${prefix}-always`, contextId);
		dynamic.setAttribute(`${prefix}-dynamic`, contextId);
		getHead().appendChild(always);
		getHead().appendChild(dynamic);
		setAlwaysStyle(styles.always);
		setDynamicStyle(styles.resting);
		return () => {
			const remove = (ref) => {
				const current = ref.current;
				!current && invariant();
				getHead().removeChild(current);
				ref.current = null;
			};
			remove(alwaysRef);
			remove(dynamicRef);
		};
	}, [
		nonce,
		setAlwaysStyle,
		setDynamicStyle,
		styles.always,
		styles.resting,
		contextId
	]);
	const dragging = useCallback(() => setDynamicStyle(styles.dragging), [setDynamicStyle, styles.dragging]);
	const dropping = useCallback((reason) => {
		if (reason === "DROP") {
			setDynamicStyle(styles.dropAnimating);
			return;
		}
		setDynamicStyle(styles.userCancel);
	}, [
		setDynamicStyle,
		styles.dropAnimating,
		styles.userCancel
	]);
	const resting = useCallback(() => {
		if (!dynamicRef.current) return;
		setDynamicStyle(styles.resting);
	}, [setDynamicStyle, styles.resting]);
	return useMemo$1(() => ({
		dragging,
		dropping,
		resting
	}), [
		dragging,
		dropping,
		resting
	]);
}
function querySelectorAll(parentNode, selector) {
	return Array.from(parentNode.querySelectorAll(selector));
}
var getWindowFromEl = (el) => {
	if (el && el.ownerDocument && el.ownerDocument.defaultView) return el.ownerDocument.defaultView;
	return window;
};
function isHtmlElement(el) {
	return el instanceof getWindowFromEl(el).HTMLElement;
}
function findDragHandle(contextId, draggableId) {
	const selector = `[${dragHandle.contextId}="${contextId}"]`;
	const possible = querySelectorAll(document, selector);
	if (!possible.length) return null;
	const handle = possible.find((el) => {
		return el.getAttribute(dragHandle.draggableId) === draggableId;
	});
	if (!handle) return null;
	if (!isHtmlElement(handle)) return null;
	return handle;
}
function useFocusMarshal(contextId) {
	const entriesRef = (0, import_react.useRef)({});
	const recordRef = (0, import_react.useRef)(null);
	const restoreFocusFrameRef = (0, import_react.useRef)(null);
	const isMountedRef = (0, import_react.useRef)(false);
	const register = useCallback(function register$1(id, focus$1) {
		const entry = {
			id,
			focus: focus$1
		};
		entriesRef.current[id] = entry;
		return function unregister() {
			const entries = entriesRef.current;
			if (entries[id] !== entry) delete entries[id];
		};
	}, []);
	const tryGiveFocus = useCallback(function tryGiveFocus$1(tryGiveFocusTo) {
		const handle = findDragHandle(contextId, tryGiveFocusTo);
		if (handle && handle !== document.activeElement) handle.focus();
	}, [contextId]);
	const tryShiftRecord = useCallback(function tryShiftRecord$1(previous, redirectTo) {
		if (recordRef.current === previous) recordRef.current = redirectTo;
	}, []);
	const tryRestoreFocusRecorded = useCallback(function tryRestoreFocusRecorded$1() {
		if (restoreFocusFrameRef.current) return;
		if (!isMountedRef.current) return;
		restoreFocusFrameRef.current = requestAnimationFrame(() => {
			restoreFocusFrameRef.current = null;
			const record = recordRef.current;
			if (record) tryGiveFocus(record);
		});
	}, [tryGiveFocus]);
	const tryRecordFocus = useCallback(function tryRecordFocus$1(id) {
		recordRef.current = null;
		const focused = document.activeElement;
		if (!focused) return;
		if (focused.getAttribute(dragHandle.draggableId) !== id) return;
		recordRef.current = id;
	}, []);
	useIsomorphicLayoutEffect(() => {
		isMountedRef.current = true;
		return function clearFrameOnUnmount() {
			isMountedRef.current = false;
			const frameId = restoreFocusFrameRef.current;
			if (frameId) cancelAnimationFrame(frameId);
		};
	}, []);
	return useMemo$1(() => ({
		register,
		tryRecordFocus,
		tryRestoreFocusRecorded,
		tryShiftRecord
	}), [
		register,
		tryRecordFocus,
		tryRestoreFocusRecorded,
		tryShiftRecord
	]);
}
function createRegistry() {
	const entries = {
		draggables: {},
		droppables: {}
	};
	const subscribers = [];
	function subscribe(cb) {
		subscribers.push(cb);
		return function unsubscribe() {
			const index = subscribers.indexOf(cb);
			if (index === -1) return;
			subscribers.splice(index, 1);
		};
	}
	function notify(event) {
		if (subscribers.length) subscribers.forEach((cb) => cb(event));
	}
	function findDraggableById(id) {
		return entries.draggables[id] || null;
	}
	function getDraggableById(id) {
		const entry = findDraggableById(id);
		!entry && invariant();
		return entry;
	}
	const draggableAPI = {
		register: (entry) => {
			entries.draggables[entry.descriptor.id] = entry;
			notify({
				type: "ADDITION",
				value: entry
			});
		},
		update: (entry, last) => {
			const current = entries.draggables[last.descriptor.id];
			if (!current) return;
			if (current.uniqueId !== entry.uniqueId) return;
			delete entries.draggables[last.descriptor.id];
			entries.draggables[entry.descriptor.id] = entry;
		},
		unregister: (entry) => {
			const draggableId = entry.descriptor.id;
			const current = findDraggableById(draggableId);
			if (!current) return;
			if (entry.uniqueId !== current.uniqueId) return;
			delete entries.draggables[draggableId];
			if (entries.droppables[entry.descriptor.droppableId]) notify({
				type: "REMOVAL",
				value: entry
			});
		},
		getById: getDraggableById,
		findById: findDraggableById,
		exists: (id) => Boolean(findDraggableById(id)),
		getAllByType: (type) => Object.values(entries.draggables).filter((entry) => entry.descriptor.type === type)
	};
	function findDroppableById(id) {
		return entries.droppables[id] || null;
	}
	function getDroppableById(id) {
		const entry = findDroppableById(id);
		!entry && invariant();
		return entry;
	}
	const droppableAPI = {
		register: (entry) => {
			entries.droppables[entry.descriptor.id] = entry;
		},
		unregister: (entry) => {
			const current = findDroppableById(entry.descriptor.id);
			if (!current) return;
			if (entry.uniqueId !== current.uniqueId) return;
			delete entries.droppables[entry.descriptor.id];
		},
		getById: getDroppableById,
		findById: findDroppableById,
		exists: (id) => Boolean(findDroppableById(id)),
		getAllByType: (type) => Object.values(entries.droppables).filter((entry) => entry.descriptor.type === type)
	};
	function clean$2() {
		entries.draggables = {};
		entries.droppables = {};
		subscribers.length = 0;
	}
	return {
		draggable: draggableAPI,
		droppable: droppableAPI,
		subscribe,
		clean: clean$2
	};
}
function useRegistry() {
	const registry = useMemo$1(createRegistry, []);
	(0, import_react.useEffect)(() => {
		return function unmount() {
			registry.clean();
		};
	}, [registry]);
	return registry;
}
var StoreContext = import_react.createContext(null);
var getBodyElement = () => {
	const body = document.body;
	!body && invariant();
	return body;
};
var visuallyHidden = {
	position: "absolute",
	width: "1px",
	height: "1px",
	margin: "-1px",
	border: "0",
	padding: "0",
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	"clip-path": "inset(100%)"
};
var getId = (contextId) => `rfd-announcement-${contextId}`;
function useAnnouncer(contextId) {
	const id = useMemo$1(() => getId(contextId), [contextId]);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(function setup() {
		const el = document.createElement("div");
		ref.current = el;
		el.id = id;
		el.setAttribute("aria-live", "assertive");
		el.setAttribute("aria-atomic", "true");
		_extends(el.style, visuallyHidden);
		getBodyElement().appendChild(el);
		return function cleanup() {
			setTimeout(function remove() {
				const body = getBodyElement();
				if (body.contains(el)) body.removeChild(el);
				if (el === ref.current) ref.current = null;
			});
		};
	}, [id]);
	return useCallback((message) => {
		const el = ref.current;
		if (el) {
			el.textContent = message;
			return;
		}
	}, []);
}
var defaults = { separator: "::" };
function useUniqueId(prefix$3, options = defaults) {
	const id = import_react.useId();
	return useMemo$1(() => `${prefix$3}${options.separator}${id}`, [
		options.separator,
		prefix$3,
		id
	]);
}
function getElementId({ contextId, uniqueId }) {
	return `rfd-hidden-text-${contextId}-${uniqueId}`;
}
function useHiddenTextElement({ contextId, text }) {
	const uniqueId = useUniqueId("hidden-text", { separator: "-" });
	const id = useMemo$1(() => getElementId({
		contextId,
		uniqueId
	}), [uniqueId, contextId]);
	(0, import_react.useEffect)(function mount() {
		const el = document.createElement("div");
		el.id = id;
		el.textContent = text;
		el.style.display = "none";
		getBodyElement().appendChild(el);
		return function unmount() {
			const body = getBodyElement();
			if (body.contains(el)) body.removeChild(el);
		};
	}, [id, text]);
	return id;
}
var AppContext = import_react.createContext(null);
var peerDependencies = { react: "^18.0.0 || ^19.0.0" };
var semver = /(\d+)\.(\d+)\.(\d+)/;
var getVersion = (value) => {
	const result = semver.exec(value);
	!(result != null) && invariant();
	return {
		major: Number(result[1]),
		minor: Number(result[2]),
		patch: Number(result[3]),
		raw: value
	};
};
var isSatisfied = (expected, actual) => {
	if (actual.major > expected.major) return true;
	if (actual.major < expected.major) return false;
	if (actual.minor > expected.minor) return true;
	if (actual.minor < expected.minor) return false;
	return actual.patch >= expected.patch;
};
var checkReactVersion = (peerDepValue, actualValue) => {
	if (isSatisfied(getVersion(peerDepValue), getVersion(actualValue))) return;
};
var checkDoctype = (doc) => {
	const doctype = doc.doctype;
	if (!doctype) return;
	if (doctype.name.toLowerCase() !== "html") {}
	if (doctype.publicId !== "") {}
};
function useDev(useHook) {}
function useDevSetupWarning(fn, inputs) {
	useDev(() => {
		(0, import_react.useEffect)(() => {
			try {
				fn();
			} catch (e) {
				error(`
          A setup problem was encountered.

          > ${e.message}
        `);
			}
		}, inputs);
	});
}
function useStartupValidation() {
	useDevSetupWarning(() => {
		checkReactVersion(peerDependencies.react, "19.2.3");
		checkDoctype(document);
	}, []);
}
function usePrevious(current) {
	const ref = (0, import_react.useRef)(current);
	(0, import_react.useEffect)(() => {
		ref.current = current;
	});
	return ref;
}
function create() {
	let lock = null;
	function isClaimed() {
		return Boolean(lock);
	}
	function isActive$1(value) {
		return value === lock;
	}
	function claim(abandon) {
		lock && invariant();
		const newLock = { abandon };
		lock = newLock;
		return newLock;
	}
	function release() {
		!lock && invariant();
		lock = null;
	}
	function tryAbandon() {
		if (lock) {
			lock.abandon();
			release();
		}
	}
	return {
		isClaimed,
		isActive: isActive$1,
		claim,
		release,
		tryAbandon
	};
}
function isDragging(state) {
	if (state.phase === "IDLE" || state.phase === "DROP_ANIMATING") return false;
	return state.isDragging;
}
var tab = 9;
var enter = 13;
var escape = 27;
var space = 32;
var pageUp = 33;
var pageDown = 34;
var end = 35;
var home = 36;
var arrowLeft = 37;
var arrowUp = 38;
var arrowRight = 39;
var arrowDown = 40;
var preventedKeys = {
	[enter]: true,
	[tab]: true
};
var preventStandardKeyEvents = (event) => {
	if (preventedKeys[event.keyCode]) event.preventDefault();
};
var supportedEventName = (() => {
	const base = "visibilitychange";
	if (typeof document === "undefined") return base;
	return [
		base,
		`ms${base}`,
		`webkit${base}`,
		`moz${base}`,
		`o${base}`
	].find((eventName) => `on${eventName}` in document) || base;
})();
var primaryButton = 0;
var sloppyClickThreshold = 5;
function isSloppyClickThresholdExceeded(original, current) {
	return Math.abs(current.x - original.x) >= sloppyClickThreshold || Math.abs(current.y - original.y) >= sloppyClickThreshold;
}
var idle$1 = { type: "IDLE" };
function getCaptureBindings({ cancel, completed, getPhase, setPhase }) {
	return [
		{
			eventName: "mousemove",
			fn: (event) => {
				const { button, clientX, clientY } = event;
				if (button !== primaryButton) return;
				const point = {
					x: clientX,
					y: clientY
				};
				const phase = getPhase();
				if (phase.type === "DRAGGING") {
					event.preventDefault();
					phase.actions.move(point);
					return;
				}
				!(phase.type === "PENDING") && invariant();
				const pending = phase.point;
				if (!isSloppyClickThresholdExceeded(pending, point)) return;
				event.preventDefault();
				setPhase({
					type: "DRAGGING",
					actions: phase.actions.fluidLift(point)
				});
			}
		},
		{
			eventName: "mouseup",
			fn: (event) => {
				const phase = getPhase();
				if (phase.type !== "DRAGGING") {
					cancel();
					return;
				}
				event.preventDefault();
				phase.actions.drop({ shouldBlockNextClick: true });
				completed();
			}
		},
		{
			eventName: "mousedown",
			fn: (event) => {
				if (getPhase().type === "DRAGGING") event.preventDefault();
				cancel();
			}
		},
		{
			eventName: "keydown",
			fn: (event) => {
				if (getPhase().type === "PENDING") {
					cancel();
					return;
				}
				if (event.keyCode === escape) {
					event.preventDefault();
					cancel();
					return;
				}
				preventStandardKeyEvents(event);
			}
		},
		{
			eventName: "resize",
			fn: cancel
		},
		{
			eventName: "scroll",
			options: {
				passive: true,
				capture: false
			},
			fn: () => {
				if (getPhase().type === "PENDING") cancel();
			}
		},
		{
			eventName: "webkitmouseforcedown",
			fn: (event) => {
				const phase = getPhase();
				!(phase.type !== "IDLE") && invariant();
				if (phase.actions.shouldRespectForcePress()) {
					cancel();
					return;
				}
				event.preventDefault();
			}
		},
		{
			eventName: supportedEventName,
			fn: cancel
		}
	];
}
function useMouseSensor(api) {
	const phaseRef = (0, import_react.useRef)(idle$1);
	const unbindEventsRef = (0, import_react.useRef)(noop$2);
	const startCaptureBinding = useMemo$1(() => ({
		eventName: "mousedown",
		fn: function onMouseDown(event) {
			if (event.defaultPrevented) return;
			if (event.button !== primaryButton) return;
			if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
			const draggableId = api.findClosestDraggableId(event);
			if (!draggableId) return;
			const actions = api.tryGetLock(draggableId, stop, { sourceEvent: event });
			if (!actions) return;
			event.preventDefault();
			const point = {
				x: event.clientX,
				y: event.clientY
			};
			unbindEventsRef.current();
			startPendingDrag(actions, point);
		}
	}), [api]);
	const preventForcePressBinding = useMemo$1(() => ({
		eventName: "webkitmouseforcewillbegin",
		fn: (event) => {
			if (event.defaultPrevented) return;
			const id = api.findClosestDraggableId(event);
			if (!id) return;
			const options = api.findOptionsForDraggable(id);
			if (!options) return;
			if (options.shouldRespectForcePress) return;
			if (!api.canGetLock(id)) return;
			event.preventDefault();
		}
	}), [api]);
	const listenForCapture = useCallback(function listenForCapture$1() {
		unbindEventsRef.current = bindEvents(window, [preventForcePressBinding, startCaptureBinding], {
			passive: false,
			capture: true
		});
	}, [preventForcePressBinding, startCaptureBinding]);
	const stop = useCallback(() => {
		if (phaseRef.current.type === "IDLE") return;
		phaseRef.current = idle$1;
		unbindEventsRef.current();
		listenForCapture();
	}, [listenForCapture]);
	const cancel = useCallback(() => {
		const phase = phaseRef.current;
		stop();
		if (phase.type === "DRAGGING") phase.actions.cancel({ shouldBlockNextClick: true });
		if (phase.type === "PENDING") phase.actions.abort();
	}, [stop]);
	const bindCapturingEvents = useCallback(function bindCapturingEvents$1() {
		const options = {
			capture: true,
			passive: false
		};
		const bindings = getCaptureBindings({
			cancel,
			completed: stop,
			getPhase: () => phaseRef.current,
			setPhase: (phase) => {
				phaseRef.current = phase;
			}
		});
		unbindEventsRef.current = bindEvents(window, bindings, options);
	}, [cancel, stop]);
	const startPendingDrag = useCallback(function startPendingDrag$1(actions, point) {
		!(phaseRef.current.type === "IDLE") && invariant();
		phaseRef.current = {
			type: "PENDING",
			point,
			actions
		};
		bindCapturingEvents();
	}, [bindCapturingEvents]);
	useIsomorphicLayoutEffect(function mount() {
		listenForCapture();
		return function unmount() {
			unbindEventsRef.current();
		};
	}, [listenForCapture]);
}
function noop$1() {}
var scrollJumpKeys = {
	[pageDown]: true,
	[pageUp]: true,
	[home]: true,
	[end]: true
};
function getDraggingBindings(actions, stop) {
	function cancel() {
		stop();
		actions.cancel();
	}
	function drop$1() {
		stop();
		actions.drop();
	}
	return [
		{
			eventName: "keydown",
			fn: (event) => {
				if (event.keyCode === escape) {
					event.preventDefault();
					cancel();
					return;
				}
				if (event.keyCode === space) {
					event.preventDefault();
					drop$1();
					return;
				}
				if (event.keyCode === arrowDown) {
					event.preventDefault();
					actions.moveDown();
					return;
				}
				if (event.keyCode === arrowUp) {
					event.preventDefault();
					actions.moveUp();
					return;
				}
				if (event.keyCode === arrowRight) {
					event.preventDefault();
					actions.moveRight();
					return;
				}
				if (event.keyCode === arrowLeft) {
					event.preventDefault();
					actions.moveLeft();
					return;
				}
				if (scrollJumpKeys[event.keyCode]) {
					event.preventDefault();
					return;
				}
				preventStandardKeyEvents(event);
			}
		},
		{
			eventName: "mousedown",
			fn: cancel
		},
		{
			eventName: "mouseup",
			fn: cancel
		},
		{
			eventName: "click",
			fn: cancel
		},
		{
			eventName: "touchstart",
			fn: cancel
		},
		{
			eventName: "resize",
			fn: cancel
		},
		{
			eventName: "wheel",
			fn: cancel,
			options: { passive: true }
		},
		{
			eventName: supportedEventName,
			fn: cancel
		}
	];
}
function useKeyboardSensor(api) {
	const unbindEventsRef = (0, import_react.useRef)(noop$1);
	const startCaptureBinding = useMemo$1(() => ({
		eventName: "keydown",
		fn: function onKeyDown(event) {
			if (event.defaultPrevented) return;
			if (event.keyCode !== space) return;
			const draggableId = api.findClosestDraggableId(event);
			if (!draggableId) return;
			const preDrag = api.tryGetLock(draggableId, stop, { sourceEvent: event });
			if (!preDrag) return;
			event.preventDefault();
			let isCapturing = true;
			const actions = preDrag.snapLift();
			unbindEventsRef.current();
			function stop() {
				!isCapturing && invariant();
				isCapturing = false;
				unbindEventsRef.current();
				listenForCapture();
			}
			unbindEventsRef.current = bindEvents(window, getDraggingBindings(actions, stop), {
				capture: true,
				passive: false
			});
		}
	}), [api]);
	const listenForCapture = useCallback(function tryStartCapture() {
		unbindEventsRef.current = bindEvents(window, [startCaptureBinding], {
			passive: false,
			capture: true
		});
	}, [startCaptureBinding]);
	useIsomorphicLayoutEffect(function mount() {
		listenForCapture();
		return function unmount() {
			unbindEventsRef.current();
		};
	}, [listenForCapture]);
}
var idle = { type: "IDLE" };
var timeForLongPress = 120;
var forcePressThreshold = .15;
function getWindowBindings({ cancel, getPhase }) {
	return [
		{
			eventName: "orientationchange",
			fn: cancel
		},
		{
			eventName: "resize",
			fn: cancel
		},
		{
			eventName: "contextmenu",
			fn: (event) => {
				event.preventDefault();
			}
		},
		{
			eventName: "keydown",
			fn: (event) => {
				if (getPhase().type !== "DRAGGING") {
					cancel();
					return;
				}
				if (event.keyCode === escape) event.preventDefault();
				cancel();
			}
		},
		{
			eventName: supportedEventName,
			fn: cancel
		}
	];
}
function getHandleBindings({ cancel, completed, getPhase }) {
	return [
		{
			eventName: "touchmove",
			options: { capture: false },
			fn: (event) => {
				const phase = getPhase();
				if (phase.type !== "DRAGGING") {
					cancel();
					return;
				}
				phase.hasMoved = true;
				const { clientX, clientY } = event.touches[0];
				const point = {
					x: clientX,
					y: clientY
				};
				event.preventDefault();
				phase.actions.move(point);
			}
		},
		{
			eventName: "touchend",
			fn: (event) => {
				const phase = getPhase();
				if (phase.type !== "DRAGGING") {
					cancel();
					return;
				}
				event.preventDefault();
				phase.actions.drop({ shouldBlockNextClick: true });
				completed();
			}
		},
		{
			eventName: "touchcancel",
			fn: (event) => {
				if (getPhase().type !== "DRAGGING") {
					cancel();
					return;
				}
				event.preventDefault();
				cancel();
			}
		},
		{
			eventName: "touchforcechange",
			fn: (event) => {
				const phase = getPhase();
				!(phase.type !== "IDLE") && invariant();
				const touch = event.touches[0];
				if (!touch) return;
				if (!(touch.force >= forcePressThreshold)) return;
				const shouldRespect = phase.actions.shouldRespectForcePress();
				if (phase.type === "PENDING") {
					if (shouldRespect) cancel();
					return;
				}
				if (shouldRespect) {
					if (phase.hasMoved) {
						event.preventDefault();
						return;
					}
					cancel();
					return;
				}
				event.preventDefault();
			}
		},
		{
			eventName: supportedEventName,
			fn: cancel
		}
	];
}
function useTouchSensor(api) {
	const phaseRef = (0, import_react.useRef)(idle);
	const unbindEventsRef = (0, import_react.useRef)(noop$2);
	const getPhase = useCallback(function getPhase$1() {
		return phaseRef.current;
	}, []);
	const setPhase = useCallback(function setPhase$1(phase) {
		phaseRef.current = phase;
	}, []);
	const startCaptureBinding = useMemo$1(() => ({
		eventName: "touchstart",
		fn: function onTouchStart(event) {
			if (event.defaultPrevented) return;
			const draggableId = api.findClosestDraggableId(event);
			if (!draggableId) return;
			const actions = api.tryGetLock(draggableId, stop, { sourceEvent: event });
			if (!actions) return;
			const { clientX, clientY } = event.touches[0];
			const point = {
				x: clientX,
				y: clientY
			};
			unbindEventsRef.current();
			startPendingDrag(actions, point);
		}
	}), [api]);
	const listenForCapture = useCallback(function listenForCapture$1() {
		unbindEventsRef.current = bindEvents(window, [startCaptureBinding], {
			capture: true,
			passive: false
		});
	}, [startCaptureBinding]);
	const stop = useCallback(() => {
		const current = phaseRef.current;
		if (current.type === "IDLE") return;
		if (current.type === "PENDING") clearTimeout(current.longPressTimerId);
		setPhase(idle);
		unbindEventsRef.current();
		listenForCapture();
	}, [listenForCapture, setPhase]);
	const cancel = useCallback(() => {
		const phase = phaseRef.current;
		stop();
		if (phase.type === "DRAGGING") phase.actions.cancel({ shouldBlockNextClick: true });
		if (phase.type === "PENDING") phase.actions.abort();
	}, [stop]);
	const bindCapturingEvents = useCallback(function bindCapturingEvents$1() {
		const options = {
			capture: true,
			passive: false
		};
		const args = {
			cancel,
			completed: stop,
			getPhase
		};
		const unbindTarget = bindEvents(window, getHandleBindings(args), options);
		const unbindWindow = bindEvents(window, getWindowBindings(args), options);
		unbindEventsRef.current = function unbindAll() {
			unbindTarget();
			unbindWindow();
		};
	}, [
		cancel,
		getPhase,
		stop
	]);
	const startDragging = useCallback(function startDragging$1() {
		const phase = getPhase();
		!(phase.type === "PENDING") && invariant();
		setPhase({
			type: "DRAGGING",
			actions: phase.actions.fluidLift(phase.point),
			hasMoved: false
		});
	}, [getPhase, setPhase]);
	const startPendingDrag = useCallback(function startPendingDrag$1(actions, point) {
		!(getPhase().type === "IDLE") && invariant();
		setPhase({
			type: "PENDING",
			point,
			actions,
			longPressTimerId: setTimeout(startDragging, timeForLongPress)
		});
		bindCapturingEvents();
	}, [
		bindCapturingEvents,
		getPhase,
		setPhase,
		startDragging
	]);
	useIsomorphicLayoutEffect(function mount() {
		listenForCapture();
		return function unmount() {
			unbindEventsRef.current();
			const phase = getPhase();
			if (phase.type === "PENDING") {
				clearTimeout(phase.longPressTimerId);
				setPhase(idle);
			}
		};
	}, [
		getPhase,
		listenForCapture,
		setPhase
	]);
	useIsomorphicLayoutEffect(function webkitHack() {
		return bindEvents(window, [{
			eventName: "touchmove",
			fn: () => {},
			options: {
				capture: false,
				passive: false
			}
		}]);
	}, []);
}
function useValidateSensorHooks(sensorHooks) {
	useDev(() => {
		const previousRef = usePrevious(sensorHooks);
		useDevSetupWarning(() => {
			!(previousRef.current.length === sensorHooks.length) && invariant(false);
		});
	});
}
var interactiveTagNames = [
	"input",
	"button",
	"textarea",
	"select",
	"option",
	"optgroup",
	"video",
	"audio"
];
function isAnInteractiveElement(parent, current) {
	if (current == null) return false;
	if (interactiveTagNames.includes(current.tagName.toLowerCase())) return true;
	const attribute = current.getAttribute("contenteditable");
	if (attribute === "true" || attribute === "") return true;
	if (current === parent) return false;
	return isAnInteractiveElement(parent, current.parentElement);
}
function isEventInInteractiveElement(draggable$1, event) {
	const target = event.target;
	if (!isHtmlElement(target)) return false;
	return isAnInteractiveElement(draggable$1, target);
}
var getBorderBoxCenterPosition = (el) => getRect(el.getBoundingClientRect()).center;
function isElement(el) {
	return el instanceof getWindowFromEl(el).Element;
}
var supportedMatchesName = (() => {
	const base = "matches";
	if (typeof document === "undefined") return base;
	return [
		base,
		"msMatchesSelector",
		"webkitMatchesSelector"
	].find((name) => name in Element.prototype) || base;
})();
function closestPonyfill(el, selector) {
	if (el == null) return null;
	if (el[supportedMatchesName](selector)) return el;
	return closestPonyfill(el.parentElement, selector);
}
function closest(el, selector) {
	if (el.closest) return el.closest(selector);
	return closestPonyfill(el, selector);
}
function getSelector(contextId) {
	return `[${dragHandle.contextId}="${contextId}"]`;
}
function findClosestDragHandleFromEvent(contextId, event) {
	const target = event.target;
	if (!isElement(target)) return null;
	const handle = closest(target, getSelector(contextId));
	if (!handle) return null;
	if (!isHtmlElement(handle)) return null;
	return handle;
}
function tryGetClosestDraggableIdFromEvent(contextId, event) {
	const handle = findClosestDragHandleFromEvent(contextId, event);
	if (!handle) return null;
	return handle.getAttribute(dragHandle.draggableId);
}
function findDraggable(contextId, draggableId) {
	const selector = `[${draggable.contextId}="${contextId}"]`;
	const draggable$1 = querySelectorAll(document, selector).find((el) => {
		return el.getAttribute(draggable.id) === draggableId;
	});
	if (!draggable$1) return null;
	if (!isHtmlElement(draggable$1)) return null;
	return draggable$1;
}
function preventDefault(event) {
	event.preventDefault();
}
function isActive({ expected, phase, isLockActive, shouldWarn }) {
	if (!isLockActive()) {
		if (shouldWarn) {}
		return false;
	}
	if (expected !== phase) {
		if (shouldWarn) {}
		return false;
	}
	return true;
}
function canStart({ lockAPI, store, registry, draggableId }) {
	if (lockAPI.isClaimed()) return false;
	const entry = registry.draggable.findById(draggableId);
	if (!entry) return false;
	if (!entry.options.isEnabled) return false;
	if (!canStartDrag(store.getState(), draggableId)) return false;
	return true;
}
function tryStart({ lockAPI, contextId, store, registry, draggableId, forceSensorStop, sourceEvent }) {
	if (!canStart({
		lockAPI,
		store,
		registry,
		draggableId
	})) return null;
	const entry = registry.draggable.getById(draggableId);
	const el = findDraggable(contextId, entry.descriptor.id);
	if (!el) return null;
	if (sourceEvent && !entry.options.canDragInteractiveElements && isEventInInteractiveElement(el, sourceEvent)) return null;
	const lock = lockAPI.claim(forceSensorStop || noop$2);
	let phase = "PRE_DRAG";
	function getShouldRespectForcePress() {
		return entry.options.shouldRespectForcePress;
	}
	function isLockActive() {
		return lockAPI.isActive(lock);
	}
	function tryDispatch(expected, getAction) {
		if (isActive({
			expected,
			phase,
			isLockActive,
			shouldWarn: true
		})) store.dispatch(getAction());
	}
	const tryDispatchWhenDragging = tryDispatch.bind(null, "DRAGGING");
	function lift$2(args) {
		function completed() {
			lockAPI.release();
			phase = "COMPLETED";
		}
		if (phase !== "PRE_DRAG") {
			completed();
			invariant();
		}
		store.dispatch(lift$1(args.liftActionArgs));
		phase = "DRAGGING";
		function finish$1(reason, options = { shouldBlockNextClick: false }) {
			args.cleanup();
			if (options.shouldBlockNextClick) {
				const unbind = bindEvents(window, [{
					eventName: "click",
					fn: preventDefault,
					options: {
						once: true,
						passive: false,
						capture: true
					}
				}]);
				setTimeout(unbind);
			}
			completed();
			store.dispatch(drop({ reason }));
		}
		return {
			isActive: () => isActive({
				expected: "DRAGGING",
				phase,
				isLockActive,
				shouldWarn: false
			}),
			shouldRespectForcePress: getShouldRespectForcePress,
			drop: (options) => finish$1("DROP", options),
			cancel: (options) => finish$1("CANCEL", options),
			...args.actions
		};
	}
	function fluidLift(clientSelection) {
		const move$1 = raf_schd_esm_default((client) => {
			tryDispatchWhenDragging(() => move({ client }));
		});
		return {
			...lift$2({
				liftActionArgs: {
					id: draggableId,
					clientSelection,
					movementMode: "FLUID"
				},
				cleanup: () => move$1.cancel(),
				actions: { move: move$1 }
			}),
			move: move$1
		};
	}
	function snapLift() {
		return lift$2({
			liftActionArgs: {
				id: draggableId,
				clientSelection: getBorderBoxCenterPosition(el),
				movementMode: "SNAP"
			},
			cleanup: noop$2,
			actions: {
				moveUp: () => tryDispatchWhenDragging(moveUp),
				moveRight: () => tryDispatchWhenDragging(moveRight),
				moveDown: () => tryDispatchWhenDragging(moveDown),
				moveLeft: () => tryDispatchWhenDragging(moveLeft)
			}
		});
	}
	function abortPreDrag() {
		if (isActive({
			expected: "PRE_DRAG",
			phase,
			isLockActive,
			shouldWarn: true
		})) lockAPI.release();
	}
	return {
		isActive: () => isActive({
			expected: "PRE_DRAG",
			phase,
			isLockActive,
			shouldWarn: false
		}),
		shouldRespectForcePress: getShouldRespectForcePress,
		fluidLift,
		snapLift,
		abort: abortPreDrag
	};
}
var defaultSensors = [
	useMouseSensor,
	useKeyboardSensor,
	useTouchSensor
];
function useSensorMarshal({ contextId, store, registry, customSensors, enableDefaultSensors }) {
	const useSensors = [...enableDefaultSensors ? defaultSensors : [], ...customSensors || []];
	const lockAPI = (0, import_react.useState)(() => create())[0];
	const tryAbandonLock = useCallback(function tryAbandonLock$1(previous, current) {
		if (isDragging(previous) && !isDragging(current)) lockAPI.tryAbandon();
	}, [lockAPI]);
	useIsomorphicLayoutEffect(function listenToStore() {
		let previous = store.getState();
		return store.subscribe(() => {
			const current = store.getState();
			tryAbandonLock(previous, current);
			previous = current;
		});
	}, [
		lockAPI,
		store,
		tryAbandonLock
	]);
	useIsomorphicLayoutEffect(() => {
		return lockAPI.tryAbandon;
	}, [lockAPI.tryAbandon]);
	const canGetLock = useCallback((draggableId) => {
		return canStart({
			lockAPI,
			registry,
			store,
			draggableId
		});
	}, [
		lockAPI,
		registry,
		store
	]);
	const tryGetLock = useCallback((draggableId, forceStop, options) => tryStart({
		lockAPI,
		registry,
		contextId,
		store,
		draggableId,
		forceSensorStop: forceStop || null,
		sourceEvent: options && options.sourceEvent ? options.sourceEvent : null
	}), [
		contextId,
		lockAPI,
		registry,
		store
	]);
	const findClosestDraggableId = useCallback((event) => tryGetClosestDraggableIdFromEvent(contextId, event), [contextId]);
	const findOptionsForDraggable = useCallback((id) => {
		const entry = registry.draggable.findById(id);
		return entry ? entry.options : null;
	}, [registry.draggable]);
	const tryReleaseLock = useCallback(function tryReleaseLock$1() {
		if (!lockAPI.isClaimed()) return;
		lockAPI.tryAbandon();
		if (store.getState().phase !== "IDLE") store.dispatch(flush());
	}, [lockAPI, store]);
	const isLockClaimed = useCallback(() => lockAPI.isClaimed(), [lockAPI]);
	const api = useMemo$1(() => ({
		canGetLock,
		tryGetLock,
		findClosestDraggableId,
		findOptionsForDraggable,
		tryReleaseLock,
		isLockClaimed
	}), [
		canGetLock,
		tryGetLock,
		findClosestDraggableId,
		findOptionsForDraggable,
		tryReleaseLock,
		isLockClaimed
	]);
	useValidateSensorHooks(useSensors);
	for (let i = 0; i < useSensors.length; i++) useSensors[i](api);
}
var createResponders = (props) => ({
	onBeforeCapture: (t) => {
		const onBeforeCapureCallback = () => {
			if (props.onBeforeCapture) props.onBeforeCapture(t);
		};
		(0, import_react_dom.flushSync)(onBeforeCapureCallback);
	},
	onBeforeDragStart: props.onBeforeDragStart,
	onDragStart: props.onDragStart,
	onDragEnd: props.onDragEnd,
	onDragUpdate: props.onDragUpdate
});
var createAutoScrollerOptions = (props) => ({
	...defaultAutoScrollerOptions,
	...props.autoScrollerOptions,
	durationDampening: {
		...defaultAutoScrollerOptions.durationDampening,
		...props.autoScrollerOptions
	}
});
function getStore(lazyRef) {
	!lazyRef.current && invariant();
	return lazyRef.current;
}
function App(props) {
	const { contextId, setCallbacks, sensors, nonce, dragHandleUsageInstructions: dragHandleUsageInstructions$1 } = props;
	const lazyStoreRef = (0, import_react.useRef)(null);
	useStartupValidation();
	const lastPropsRef = usePrevious(props);
	const getResponders = useCallback(() => {
		return createResponders(lastPropsRef.current);
	}, [lastPropsRef]);
	const getAutoScrollerOptions = useCallback(() => {
		return createAutoScrollerOptions(lastPropsRef.current);
	}, [lastPropsRef]);
	const announce = useAnnouncer(contextId);
	const dragHandleUsageInstructionsId = useHiddenTextElement({
		contextId,
		text: dragHandleUsageInstructions$1
	});
	const styleMarshal = useStyleMarshal(contextId, nonce);
	const lazyDispatch = useCallback((action) => {
		getStore(lazyStoreRef).dispatch(action);
	}, []);
	const marshalCallbacks = useMemo$1(() => bindActionCreators({
		publishWhileDragging,
		updateDroppableScroll,
		updateDroppableIsEnabled,
		updateDroppableIsCombineEnabled,
		collectionStarting
	}, lazyDispatch), [lazyDispatch]);
	const registry = useRegistry();
	const dimensionMarshal = useMemo$1(() => {
		return createDimensionMarshal(registry, marshalCallbacks);
	}, [registry, marshalCallbacks]);
	const autoScroller = useMemo$1(() => createAutoScroller({
		scrollWindow,
		scrollDroppable: dimensionMarshal.scrollDroppable,
		getAutoScrollerOptions,
		...bindActionCreators({ move }, lazyDispatch)
	}), [
		dimensionMarshal.scrollDroppable,
		lazyDispatch,
		getAutoScrollerOptions
	]);
	const focusMarshal = useFocusMarshal(contextId);
	const store = useMemo$1(() => createStore$1({
		announce,
		autoScroller,
		dimensionMarshal,
		focusMarshal,
		getResponders,
		styleMarshal
	}), [
		announce,
		autoScroller,
		dimensionMarshal,
		focusMarshal,
		getResponders,
		styleMarshal
	]);
	lazyStoreRef.current = store;
	const tryResetStore = useCallback(() => {
		const current = getStore(lazyStoreRef);
		if (current.getState().phase !== "IDLE") current.dispatch(flush());
	}, []);
	const isDragging$1 = useCallback(() => {
		const state = getStore(lazyStoreRef).getState();
		if (state.phase === "DROP_ANIMATING") return true;
		if (state.phase === "IDLE") return false;
		return state.isDragging;
	}, []);
	setCallbacks(useMemo$1(() => ({
		isDragging: isDragging$1,
		tryAbort: tryResetStore
	}), [isDragging$1, tryResetStore]));
	const getCanLift = useCallback((id) => canStartDrag(getStore(lazyStoreRef).getState(), id), []);
	const getIsMovementAllowed = useCallback(() => isMovementAllowed(getStore(lazyStoreRef).getState()), []);
	const appContext = useMemo$1(() => ({
		marshal: dimensionMarshal,
		focus: focusMarshal,
		contextId,
		canLift: getCanLift,
		isMovementAllowed: getIsMovementAllowed,
		dragHandleUsageInstructionsId,
		registry
	}), [
		contextId,
		dimensionMarshal,
		dragHandleUsageInstructionsId,
		focusMarshal,
		getCanLift,
		getIsMovementAllowed,
		registry
	]);
	useSensorMarshal({
		contextId,
		store,
		registry,
		customSensors: sensors || null,
		enableDefaultSensors: props.enableDefaultSensors !== false
	});
	(0, import_react.useEffect)(() => {
		return tryResetStore;
	}, [tryResetStore]);
	return import_react.createElement(AppContext.Provider, { value: appContext }, import_react.createElement(Provider_default, {
		context: StoreContext,
		store
	}, props.children));
}
function useUniqueContextId() {
	return import_react.useId();
}
function DragDropContext(props) {
	const contextId = useUniqueContextId();
	const dragHandleUsageInstructions$1 = props.dragHandleUsageInstructions || preset.dragHandleUsageInstructions;
	return import_react.createElement(ErrorBoundary, null, (setCallbacks) => import_react.createElement(App, {
		nonce: props.nonce,
		contextId,
		setCallbacks,
		dragHandleUsageInstructions: dragHandleUsageInstructions$1,
		enableDefaultSensors: props.enableDefaultSensors,
		sensors: props.sensors,
		onBeforeCapture: props.onBeforeCapture,
		onBeforeDragStart: props.onBeforeDragStart,
		onDragStart: props.onDragStart,
		onDragUpdate: props.onDragUpdate,
		onDragEnd: props.onDragEnd,
		autoScrollerOptions: props.autoScrollerOptions
	}, props.children));
}
var zIndexOptions = {
	dragging: 5e3,
	dropAnimating: 4500
};
var getDraggingTransition = (shouldAnimateDragMovement, dropping) => {
	if (dropping) return transitions.drop(dropping.duration);
	if (shouldAnimateDragMovement) return transitions.snap;
	return transitions.fluid;
};
var getDraggingOpacity = (isCombining, isDropAnimating) => {
	if (!isCombining) return;
	return isDropAnimating ? combine.opacity.drop : combine.opacity.combining;
};
var getShouldDraggingAnimate = (dragging) => {
	if (dragging.forceShouldAnimate != null) return dragging.forceShouldAnimate;
	return dragging.mode === "SNAP";
};
function getDraggingStyle(dragging) {
	const box = dragging.dimension.client;
	const { offset: offset$1, combineWith, dropping } = dragging;
	const isCombining = Boolean(combineWith);
	const shouldAnimate = getShouldDraggingAnimate(dragging);
	const isDropAnimating = Boolean(dropping);
	const transform = isDropAnimating ? transforms.drop(offset$1, isCombining) : transforms.moveTo(offset$1);
	return {
		position: "fixed",
		top: box.marginBox.top,
		left: box.marginBox.left,
		boxSizing: "border-box",
		width: box.borderBox.width,
		height: box.borderBox.height,
		transition: getDraggingTransition(shouldAnimate, dropping),
		transform,
		opacity: getDraggingOpacity(isCombining, isDropAnimating),
		zIndex: isDropAnimating ? zIndexOptions.dropAnimating : zIndexOptions.dragging,
		pointerEvents: "none"
	};
}
function getSecondaryStyle(secondary) {
	return {
		transform: transforms.moveTo(secondary.offset),
		transition: secondary.shouldAnimateDisplacement ? void 0 : "none"
	};
}
function getStyle$1(mapped) {
	return mapped.type === "DRAGGING" ? getDraggingStyle(mapped) : getSecondaryStyle(mapped);
}
function getDimension$1(descriptor, el, windowScroll = origin) {
	const computedStyles = window.getComputedStyle(el);
	const client = calculateBox(el.getBoundingClientRect(), computedStyles);
	const page = withScroll(client, windowScroll);
	return {
		descriptor,
		placeholder: {
			client,
			tagName: el.tagName.toLowerCase(),
			display: computedStyles.display
		},
		displaceBy: {
			x: client.marginBox.width,
			y: client.marginBox.height
		},
		client,
		page
	};
}
function useDraggablePublisher(args) {
	const uniqueId = useUniqueId("draggable");
	const { descriptor, registry, getDraggableRef, canDragInteractiveElements, shouldRespectForcePress, isEnabled } = args;
	const options = useMemo$1(() => ({
		canDragInteractiveElements,
		shouldRespectForcePress,
		isEnabled
	}), [
		canDragInteractiveElements,
		isEnabled,
		shouldRespectForcePress
	]);
	const getDimension$2 = useCallback((windowScroll) => {
		const el = getDraggableRef();
		!el && invariant();
		return getDimension$1(descriptor, el, windowScroll);
	}, [descriptor, getDraggableRef]);
	const entry = useMemo$1(() => ({
		uniqueId,
		descriptor,
		options,
		getDimension: getDimension$2
	}), [
		descriptor,
		getDimension$2,
		options,
		uniqueId
	]);
	const publishedRef = (0, import_react.useRef)(entry);
	const isFirstPublishRef = (0, import_react.useRef)(true);
	useIsomorphicLayoutEffect(() => {
		registry.draggable.register(publishedRef.current);
		return () => registry.draggable.unregister(publishedRef.current);
	}, [registry.draggable]);
	useIsomorphicLayoutEffect(() => {
		if (isFirstPublishRef.current) {
			isFirstPublishRef.current = false;
			return;
		}
		const last = publishedRef.current;
		publishedRef.current = entry;
		registry.draggable.update(entry, last);
	}, [entry, registry.draggable]);
}
var DroppableContext = import_react.createContext(null);
function checkIsValidInnerRef(el) {
	!(el && isHtmlElement(el)) && invariant();
}
function useValidation$1(props, contextId, getRef) {
	useDevSetupWarning(() => {
		const id = props.draggableId;
		!id && invariant(false);
		!(typeof id === "string") && invariant(false);
		!Number.isInteger(props.index) && invariant(false);
		if (props.mapped.type === "DRAGGING") return;
		checkIsValidInnerRef(getRef());
		if (props.isEnabled) !findDragHandle(contextId, id) && invariant(false);
	});
}
function useClonePropValidation(isClone) {
	useDev(() => {
		const initialRef = (0, import_react.useRef)(isClone);
		useDevSetupWarning(() => {
			!(isClone === initialRef.current) && invariant(false);
		}, [isClone]);
	});
}
function useRequiredContext(Context) {
	const result = (0, import_react.useContext)(Context);
	!result && invariant();
	return result;
}
function preventHtml5Dnd(event) {
	event.preventDefault();
}
var Draggable = (props) => {
	const ref = (0, import_react.useRef)(null);
	const setRef = useCallback((el = null) => {
		ref.current = el;
	}, []);
	const getRef = useCallback(() => ref.current, []);
	const { contextId, dragHandleUsageInstructionsId, registry } = useRequiredContext(AppContext);
	const { type, droppableId } = useRequiredContext(DroppableContext);
	const descriptor = useMemo$1(() => ({
		id: props.draggableId,
		index: props.index,
		type,
		droppableId
	}), [
		props.draggableId,
		props.index,
		type,
		droppableId
	]);
	const { children, draggableId, isEnabled, shouldRespectForcePress, canDragInteractiveElements, isClone, mapped, dropAnimationFinished: dropAnimationFinishedAction } = props;
	useValidation$1(props, contextId, getRef);
	useClonePropValidation(isClone);
	if (!isClone) useDraggablePublisher(useMemo$1(() => ({
		descriptor,
		registry,
		getDraggableRef: getRef,
		canDragInteractiveElements,
		shouldRespectForcePress,
		isEnabled
	}), [
		descriptor,
		registry,
		getRef,
		canDragInteractiveElements,
		shouldRespectForcePress,
		isEnabled
	]));
	const dragHandleProps = useMemo$1(() => isEnabled ? {
		tabIndex: 0,
		role: "button",
		"aria-describedby": dragHandleUsageInstructionsId,
		"data-rfd-drag-handle-draggable-id": draggableId,
		"data-rfd-drag-handle-context-id": contextId,
		draggable: false,
		onDragStart: preventHtml5Dnd
	} : null, [
		contextId,
		dragHandleUsageInstructionsId,
		draggableId,
		isEnabled
	]);
	const onMoveEnd = useCallback((event) => {
		if (mapped.type !== "DRAGGING") return;
		if (!mapped.dropping) return;
		if (event.propertyName !== "transform") return;
		(0, import_react_dom.flushSync)(dropAnimationFinishedAction);
	}, [dropAnimationFinishedAction, mapped]);
	const provided = useMemo$1(() => {
		const style$1 = getStyle$1(mapped);
		const onTransitionEnd = mapped.type === "DRAGGING" && mapped.dropping ? onMoveEnd : void 0;
		return {
			innerRef: setRef,
			draggableProps: {
				"data-rfd-draggable-context-id": contextId,
				"data-rfd-draggable-id": draggableId,
				style: style$1,
				onTransitionEnd
			},
			dragHandleProps
		};
	}, [
		contextId,
		dragHandleProps,
		draggableId,
		mapped,
		onMoveEnd,
		setRef
	]);
	const rubric = useMemo$1(() => ({
		draggableId: descriptor.id,
		type: descriptor.type,
		source: {
			index: descriptor.index,
			droppableId: descriptor.droppableId
		}
	}), [
		descriptor.droppableId,
		descriptor.id,
		descriptor.index,
		descriptor.type
	]);
	return import_react.createElement(import_react.Fragment, null, children(provided, mapped.snapshot, rubric));
};
var isStrictEqual = (a$1, b) => a$1 === b;
var whatIsDraggedOverFromResult = (result) => {
	const { combine: combine$1, destination } = result;
	if (destination) return destination.droppableId;
	if (combine$1) return combine$1.droppableId;
	return null;
};
var getCombineWithFromResult = (result) => {
	return result.combine ? result.combine.draggableId : null;
};
var getCombineWithFromImpact = (impact) => {
	return impact.at && impact.at.type === "COMBINE" ? impact.at.combine.draggableId : null;
};
function getDraggableSelector() {
	const memoizedOffset = memoizeOne((x, y) => ({
		x,
		y
	}));
	const getMemoizedSnapshot = memoizeOne((mode, isClone, draggingOver = null, combineWith = null, dropping = null) => ({
		isDragging: true,
		isClone,
		isDropAnimating: Boolean(dropping),
		dropAnimation: dropping,
		mode,
		draggingOver,
		combineWith,
		combineTargetFor: null
	}));
	const getMemoizedProps = memoizeOne((offset$1, mode, dimension, isClone, draggingOver = null, combineWith = null, forceShouldAnimate = null) => ({ mapped: {
		type: "DRAGGING",
		dropping: null,
		draggingOver,
		combineWith,
		mode,
		offset: offset$1,
		dimension,
		forceShouldAnimate,
		snapshot: getMemoizedSnapshot(mode, isClone, draggingOver, combineWith, null)
	} }));
	const selector = (state, ownProps) => {
		if (isDragging(state)) {
			if (state.critical.draggable.id !== ownProps.draggableId) return null;
			const offset$1 = state.current.client.offset;
			const dimension = state.dimensions.draggables[ownProps.draggableId];
			const draggingOver = whatIsDraggedOver(state.impact);
			const combineWith = getCombineWithFromImpact(state.impact);
			const forceShouldAnimate = state.forceShouldAnimate;
			return getMemoizedProps(memoizedOffset(offset$1.x, offset$1.y), state.movementMode, dimension, ownProps.isClone, draggingOver, combineWith, forceShouldAnimate);
		}
		if (state.phase === "DROP_ANIMATING") {
			const completed = state.completed;
			if (completed.result.draggableId !== ownProps.draggableId) return null;
			const isClone = ownProps.isClone;
			const dimension = state.dimensions.draggables[ownProps.draggableId];
			const result = completed.result;
			const mode = result.mode;
			const draggingOver = whatIsDraggedOverFromResult(result);
			const combineWith = getCombineWithFromResult(result);
			const dropping = {
				duration: state.dropDuration,
				curve: curves.drop,
				moveTo: state.newHomeClientOffset,
				opacity: combineWith ? combine.opacity.drop : null,
				scale: combineWith ? combine.scale.drop : null
			};
			return { mapped: {
				type: "DRAGGING",
				offset: state.newHomeClientOffset,
				dimension,
				dropping,
				draggingOver,
				combineWith,
				mode,
				forceShouldAnimate: null,
				snapshot: getMemoizedSnapshot(mode, isClone, draggingOver, combineWith, dropping)
			} };
		}
		return null;
	};
	return selector;
}
function getSecondarySnapshot(combineTargetFor = null) {
	return {
		isDragging: false,
		isDropAnimating: false,
		isClone: false,
		dropAnimation: null,
		mode: null,
		draggingOver: null,
		combineTargetFor,
		combineWith: null
	};
}
var atRest = { mapped: {
	type: "SECONDARY",
	offset: origin,
	combineTargetFor: null,
	shouldAnimateDisplacement: true,
	snapshot: getSecondarySnapshot(null)
} };
function getSecondarySelector() {
	const memoizedOffset = memoizeOne((x, y) => ({
		x,
		y
	}));
	const getMemoizedSnapshot = memoizeOne(getSecondarySnapshot);
	const getMemoizedProps = memoizeOne((offset$1, combineTargetFor = null, shouldAnimateDisplacement) => ({ mapped: {
		type: "SECONDARY",
		offset: offset$1,
		combineTargetFor,
		shouldAnimateDisplacement,
		snapshot: getMemoizedSnapshot(combineTargetFor)
	} }));
	const getFallback = (combineTargetFor) => {
		return combineTargetFor ? getMemoizedProps(origin, combineTargetFor, true) : null;
	};
	const getProps = (ownId, draggingId, impact, afterCritical) => {
		const visualDisplacement = impact.displaced.visible[ownId];
		const isAfterCriticalInVirtualList = Boolean(afterCritical.inVirtualList && afterCritical.effected[ownId]);
		const combine$1 = tryGetCombine(impact);
		const combineTargetFor = combine$1 && combine$1.draggableId === ownId ? draggingId : null;
		if (!visualDisplacement) {
			if (!isAfterCriticalInVirtualList) return getFallback(combineTargetFor);
			if (impact.displaced.invisible[ownId]) return null;
			const change = negate(afterCritical.displacedBy.point);
			return getMemoizedProps(memoizedOffset(change.x, change.y), combineTargetFor, true);
		}
		if (isAfterCriticalInVirtualList) return getFallback(combineTargetFor);
		const displaceBy = impact.displacedBy.point;
		return getMemoizedProps(memoizedOffset(displaceBy.x, displaceBy.y), combineTargetFor, visualDisplacement.shouldAnimate);
	};
	const selector = (state, ownProps) => {
		if (isDragging(state)) {
			if (state.critical.draggable.id === ownProps.draggableId) return null;
			return getProps(ownProps.draggableId, state.critical.draggable.id, state.impact, state.afterCritical);
		}
		if (state.phase === "DROP_ANIMATING") {
			const completed = state.completed;
			if (completed.result.draggableId === ownProps.draggableId) return null;
			return getProps(ownProps.draggableId, completed.result.draggableId, completed.impact, completed.afterCritical);
		}
		return null;
	};
	return selector;
}
var makeMapStateToProps$1 = () => {
	const draggingSelector = getDraggableSelector();
	const secondarySelector = getSecondarySelector();
	const selector = (state, ownProps) => draggingSelector(state, ownProps) || secondarySelector(state, ownProps) || atRest;
	return selector;
};
var ConnectedDraggable = connect_default(makeMapStateToProps$1, { dropAnimationFinished }, null, {
	context: StoreContext,
	areStatePropsEqual: isStrictEqual
})(Draggable);
function PrivateDraggable(props) {
	if (useRequiredContext(DroppableContext).isUsingCloneFor === props.draggableId && !props.isClone) return null;
	return import_react.createElement(ConnectedDraggable, props);
}
function PublicDraggable(props) {
	const isEnabled = typeof props.isDragDisabled === "boolean" ? !props.isDragDisabled : true;
	const canDragInteractiveElements = Boolean(props.disableInteractiveElementBlocking);
	const shouldRespectForcePress = Boolean(props.shouldRespectForcePress);
	return import_react.createElement(PrivateDraggable, _extends({}, props, {
		isClone: false,
		isEnabled,
		canDragInteractiveElements,
		shouldRespectForcePress
	}));
}
var isEqual = (base) => (value) => base === value;
var isScroll = isEqual("scroll");
var isAuto = isEqual("auto");
isEqual("visible");
var isEither = (overflow, fn) => fn(overflow.overflowX) || fn(overflow.overflowY);
var isElementScrollable = (el) => {
	const style$1 = window.getComputedStyle(el);
	const overflow = {
		overflowX: style$1.overflowX,
		overflowY: style$1.overflowY
	};
	return isEither(overflow, isScroll) || isEither(overflow, isAuto);
};
var isBodyScrollable = () => {
	return false;
};
var getClosestScrollable = (el) => {
	if (el == null) return null;
	if (el === document.body) return isBodyScrollable() ? el : null;
	if (el === document.documentElement) return null;
	if (!isElementScrollable(el)) return getClosestScrollable(el.parentElement);
	return el;
};
var getScroll = (el) => ({
	x: el.scrollLeft,
	y: el.scrollTop
});
var getIsFixed = (el) => {
	if (!el) return false;
	if (window.getComputedStyle(el).position === "fixed") return true;
	return getIsFixed(el.parentElement);
};
var getEnv = (start$1) => {
	return {
		closestScrollable: getClosestScrollable(start$1),
		isFixedOnPage: getIsFixed(start$1)
	};
};
var getDroppableDimension = ({ descriptor, isEnabled, isCombineEnabled, isFixedOnPage, direction, client, page, closest: closest$2 }) => {
	const frame = (() => {
		if (!closest$2) return null;
		const { scrollSize, client: frameClient } = closest$2;
		const maxScroll = getMaxScroll({
			scrollHeight: scrollSize.scrollHeight,
			scrollWidth: scrollSize.scrollWidth,
			height: frameClient.paddingBox.height,
			width: frameClient.paddingBox.width
		});
		return {
			pageMarginBox: closest$2.page.marginBox,
			frameClient,
			scrollSize,
			shouldClipSubject: closest$2.shouldClipSubject,
			scroll: {
				initial: closest$2.scroll,
				current: closest$2.scroll,
				max: maxScroll,
				diff: {
					value: origin,
					displacement: origin
				}
			}
		};
	})();
	const axis = direction === "vertical" ? vertical : horizontal;
	return {
		descriptor,
		isCombineEnabled,
		isFixedOnPage,
		axis,
		isEnabled,
		client,
		page,
		frame,
		subject: getSubject({
			page,
			withPlaceholder: null,
			axis,
			frame
		})
	};
};
var getClient = (targetRef, closestScrollable) => {
	const base = getBox(targetRef);
	if (!closestScrollable) return base;
	if (targetRef !== closestScrollable) return base;
	const top = base.paddingBox.top - closestScrollable.scrollTop;
	const left = base.paddingBox.left - closestScrollable.scrollLeft;
	const bottom = top + closestScrollable.scrollHeight;
	return createBox({
		borderBox: expand({
			top,
			right: left + closestScrollable.scrollWidth,
			bottom,
			left
		}, base.border),
		margin: base.margin,
		border: base.border,
		padding: base.padding
	});
};
var getDimension = ({ ref, descriptor, env, windowScroll, direction, isDropDisabled, isCombineEnabled, shouldClipSubject }) => {
	const closestScrollable = env.closestScrollable;
	const client = getClient(ref, closestScrollable);
	const page = withScroll(client, windowScroll);
	const closest$2 = (() => {
		if (!closestScrollable) return null;
		const frameClient = getBox(closestScrollable);
		const scrollSize = {
			scrollHeight: closestScrollable.scrollHeight,
			scrollWidth: closestScrollable.scrollWidth
		};
		return {
			client: frameClient,
			page: withScroll(frameClient, windowScroll),
			scroll: getScroll(closestScrollable),
			scrollSize,
			shouldClipSubject
		};
	})();
	return getDroppableDimension({
		descriptor,
		isEnabled: !isDropDisabled,
		isCombineEnabled,
		isFixedOnPage: env.isFixedOnPage,
		direction,
		client,
		page,
		closest: closest$2
	});
};
var immediate = { passive: false };
var delayed = { passive: true };
var getListenerOptions = (options) => options.shouldPublishImmediately ? immediate : delayed;
var getClosestScrollableFromDrag = (dragging) => dragging && dragging.env.closestScrollable || null;
function useDroppablePublisher(args) {
	const whileDraggingRef = (0, import_react.useRef)(null);
	const appContext = useRequiredContext(AppContext);
	const uniqueId = useUniqueId("droppable");
	const { registry, marshal } = appContext;
	const previousRef = usePrevious(args);
	const descriptor = useMemo$1(() => ({
		id: args.droppableId,
		type: args.type,
		mode: args.mode
	}), [
		args.droppableId,
		args.mode,
		args.type
	]);
	const publishedDescriptorRef = (0, import_react.useRef)(descriptor);
	const memoizedUpdateScroll = useMemo$1(() => memoizeOne((x, y) => {
		!whileDraggingRef.current && invariant();
		const scroll$3 = {
			x,
			y
		};
		marshal.updateDroppableScroll(descriptor.id, scroll$3);
	}), [descriptor.id, marshal]);
	const getClosestScroll = useCallback(() => {
		const dragging = whileDraggingRef.current;
		if (!dragging || !dragging.env.closestScrollable) return origin;
		return getScroll(dragging.env.closestScrollable);
	}, []);
	const updateScroll = useCallback(() => {
		const scroll$3 = getClosestScroll();
		memoizedUpdateScroll(scroll$3.x, scroll$3.y);
	}, [getClosestScroll, memoizedUpdateScroll]);
	const scheduleScrollUpdate = useMemo$1(() => raf_schd_esm_default(updateScroll), [updateScroll]);
	const onClosestScroll = useCallback(() => {
		const dragging = whileDraggingRef.current;
		const closest$2 = getClosestScrollableFromDrag(dragging);
		!(dragging && closest$2) && invariant();
		if (dragging.scrollOptions.shouldPublishImmediately) {
			updateScroll();
			return;
		}
		scheduleScrollUpdate();
	}, [scheduleScrollUpdate, updateScroll]);
	const getDimensionAndWatchScroll = useCallback((windowScroll, options) => {
		whileDraggingRef.current && invariant();
		const previous = previousRef.current;
		const ref = previous.getDroppableRef();
		!ref && invariant();
		const env = getEnv(ref);
		const dragging = {
			ref,
			descriptor,
			env,
			scrollOptions: options
		};
		whileDraggingRef.current = dragging;
		const dimension = getDimension({
			ref,
			descriptor,
			env,
			windowScroll,
			direction: previous.direction,
			isDropDisabled: previous.isDropDisabled,
			isCombineEnabled: previous.isCombineEnabled,
			shouldClipSubject: !previous.ignoreContainerClipping
		});
		const scrollable = env.closestScrollable;
		if (scrollable) {
			scrollable.setAttribute(scrollContainer.contextId, appContext.contextId);
			scrollable.addEventListener("scroll", onClosestScroll, getListenerOptions(dragging.scrollOptions));
		}
		return dimension;
	}, [
		appContext.contextId,
		descriptor,
		onClosestScroll,
		previousRef
	]);
	const getScrollWhileDragging = useCallback(() => {
		const dragging = whileDraggingRef.current;
		const closest$2 = getClosestScrollableFromDrag(dragging);
		!(dragging && closest$2) && invariant();
		return getScroll(closest$2);
	}, []);
	const dragStopped = useCallback(() => {
		const dragging = whileDraggingRef.current;
		!dragging && invariant();
		const closest$2 = getClosestScrollableFromDrag(dragging);
		whileDraggingRef.current = null;
		if (!closest$2) return;
		scheduleScrollUpdate.cancel();
		closest$2.removeAttribute(scrollContainer.contextId);
		closest$2.removeEventListener("scroll", onClosestScroll, getListenerOptions(dragging.scrollOptions));
	}, [onClosestScroll, scheduleScrollUpdate]);
	const scroll$2 = useCallback((change) => {
		const dragging = whileDraggingRef.current;
		!dragging && invariant();
		const closest$2 = getClosestScrollableFromDrag(dragging);
		!closest$2 && invariant();
		closest$2.scrollTop += change.y;
		closest$2.scrollLeft += change.x;
	}, []);
	const callbacks = useMemo$1(() => {
		return {
			getDimensionAndWatchScroll,
			getScrollWhileDragging,
			dragStopped,
			scroll: scroll$2
		};
	}, [
		dragStopped,
		getDimensionAndWatchScroll,
		getScrollWhileDragging,
		scroll$2
	]);
	const entry = useMemo$1(() => ({
		uniqueId,
		descriptor,
		callbacks
	}), [
		callbacks,
		descriptor,
		uniqueId
	]);
	useIsomorphicLayoutEffect(() => {
		publishedDescriptorRef.current = entry.descriptor;
		registry.droppable.register(entry);
		return () => {
			if (whileDraggingRef.current) dragStopped();
			registry.droppable.unregister(entry);
		};
	}, [
		callbacks,
		descriptor,
		dragStopped,
		entry,
		marshal,
		registry.droppable
	]);
	useIsomorphicLayoutEffect(() => {
		if (!whileDraggingRef.current) return;
		marshal.updateDroppableIsEnabled(publishedDescriptorRef.current.id, !args.isDropDisabled);
	}, [args.isDropDisabled, marshal]);
	useIsomorphicLayoutEffect(() => {
		if (!whileDraggingRef.current) return;
		marshal.updateDroppableIsCombineEnabled(publishedDescriptorRef.current.id, args.isCombineEnabled);
	}, [args.isCombineEnabled, marshal]);
}
function noop() {}
var empty = {
	width: 0,
	height: 0,
	margin: noSpacing
};
var getSize = ({ isAnimatingOpenOnMount, placeholder, animate }) => {
	if (isAnimatingOpenOnMount) return empty;
	if (animate === "close") return empty;
	return {
		height: placeholder.client.borderBox.height,
		width: placeholder.client.borderBox.width,
		margin: placeholder.client.margin
	};
};
var getStyle = ({ isAnimatingOpenOnMount, placeholder, animate }) => {
	const size = getSize({
		isAnimatingOpenOnMount,
		placeholder,
		animate
	});
	return {
		display: placeholder.display,
		boxSizing: "border-box",
		width: size.width,
		height: size.height,
		marginTop: size.margin.top,
		marginRight: size.margin.right,
		marginBottom: size.margin.bottom,
		marginLeft: size.margin.left,
		flexShrink: "0",
		flexGrow: "0",
		pointerEvents: "none",
		transition: animate !== "none" ? transitions.placeholder : null
	};
};
var Placeholder = (props) => {
	const animateOpenTimerRef = (0, import_react.useRef)(null);
	const tryClearAnimateOpenTimer = useCallback(() => {
		if (!animateOpenTimerRef.current) return;
		clearTimeout(animateOpenTimerRef.current);
		animateOpenTimerRef.current = null;
	}, []);
	const { animate, onTransitionEnd, onClose, contextId } = props;
	const [isAnimatingOpenOnMount, setIsAnimatingOpenOnMount] = (0, import_react.useState)(props.animate === "open");
	(0, import_react.useEffect)(() => {
		if (!isAnimatingOpenOnMount) return noop;
		if (animate !== "open") {
			tryClearAnimateOpenTimer();
			setIsAnimatingOpenOnMount(false);
			return noop;
		}
		if (animateOpenTimerRef.current) return noop;
		animateOpenTimerRef.current = setTimeout(() => {
			animateOpenTimerRef.current = null;
			setIsAnimatingOpenOnMount(false);
		});
		return tryClearAnimateOpenTimer;
	}, [
		animate,
		isAnimatingOpenOnMount,
		tryClearAnimateOpenTimer
	]);
	const onSizeChangeEnd = useCallback((event) => {
		if (event.propertyName !== "height") return;
		onTransitionEnd();
		if (animate === "close") onClose();
	}, [
		animate,
		onClose,
		onTransitionEnd
	]);
	const style$1 = getStyle({
		isAnimatingOpenOnMount,
		animate: props.animate,
		placeholder: props.placeholder
	});
	return import_react.createElement(props.placeholder.tagName, {
		style: style$1,
		"data-rfd-placeholder-context-id": contextId,
		onTransitionEnd: onSizeChangeEnd,
		ref: props.innerRef
	});
};
var Placeholder$1 = import_react.memo(Placeholder);
function isBoolean(value) {
	return typeof value === "boolean";
}
function runChecks(args, checks) {
	checks.forEach((check) => check(args));
}
var shared = [
	function required({ props }) {
		!props.droppableId && invariant();
		!(typeof props.droppableId === "string") && invariant();
	},
	function boolean({ props }) {
		!isBoolean(props.isDropDisabled) && invariant();
		!isBoolean(props.isCombineEnabled) && invariant();
		!isBoolean(props.ignoreContainerClipping) && invariant();
	},
	function ref({ getDroppableRef }) {
		checkIsValidInnerRef(getDroppableRef());
	}
];
var standard = [function placeholder({ props, getPlaceholderRef }) {
	if (!props.placeholder) return;
	if (getPlaceholderRef()) return;
}];
var virtual = [function hasClone({ props }) {
	!props.renderClone && invariant();
}, function hasNoPlaceholder({ getPlaceholderRef }) {
	getPlaceholderRef() && invariant();
}];
function useValidation(args) {
	useDevSetupWarning(() => {
		runChecks(args, shared);
		if (args.props.mode === "standard") runChecks(args, standard);
		if (args.props.mode === "virtual") runChecks(args, virtual);
	});
}
var AnimateInOut = class extends import_react.PureComponent {
	constructor(...args) {
		super(...args);
		this.state = {
			isVisible: Boolean(this.props.on),
			data: this.props.on,
			animate: this.props.shouldAnimate && this.props.on ? "open" : "none"
		};
		this.onClose = () => {
			if (this.state.animate !== "close") return;
			this.setState({ isVisible: false });
		};
	}
	static getDerivedStateFromProps(props, state) {
		if (!props.shouldAnimate) return {
			isVisible: Boolean(props.on),
			data: props.on,
			animate: "none"
		};
		if (props.on) return {
			isVisible: true,
			data: props.on,
			animate: "open"
		};
		if (state.isVisible) return {
			isVisible: true,
			data: state.data,
			animate: "close"
		};
		return {
			isVisible: false,
			animate: "close",
			data: null
		};
	}
	render() {
		if (!this.state.isVisible) return null;
		const provided = {
			onClose: this.onClose,
			data: this.state.data,
			animate: this.state.animate
		};
		return this.props.children(provided);
	}
};
var Droppable = (props) => {
	const appContext = (0, import_react.useContext)(AppContext);
	!appContext && invariant();
	const { contextId, isMovementAllowed: isMovementAllowed$1 } = appContext;
	const droppableRef = (0, import_react.useRef)(null);
	const placeholderRef = (0, import_react.useRef)(null);
	const { children, droppableId, type, mode, direction, ignoreContainerClipping, isDropDisabled, isCombineEnabled, snapshot, useClone, updateViewportMaxScroll: updateViewportMaxScroll$1, getContainerForClone } = props;
	const getDroppableRef = useCallback(() => droppableRef.current, []);
	const setDroppableRef = useCallback((value = null) => {
		droppableRef.current = value;
	}, []);
	const getPlaceholderRef = useCallback(() => placeholderRef.current, []);
	const setPlaceholderRef = useCallback((value = null) => {
		placeholderRef.current = value;
	}, []);
	useValidation({
		props,
		getDroppableRef,
		getPlaceholderRef
	});
	const onPlaceholderTransitionEnd = useCallback(() => {
		if (isMovementAllowed$1()) updateViewportMaxScroll$1({ maxScroll: getMaxWindowScroll() });
	}, [isMovementAllowed$1, updateViewportMaxScroll$1]);
	useDroppablePublisher({
		droppableId,
		type,
		mode,
		direction,
		isDropDisabled,
		isCombineEnabled,
		ignoreContainerClipping,
		getDroppableRef
	});
	const placeholder = useMemo$1(() => import_react.createElement(AnimateInOut, {
		on: props.placeholder,
		shouldAnimate: props.shouldAnimatePlaceholder
	}, ({ onClose, data, animate }) => import_react.createElement(Placeholder$1, {
		placeholder: data,
		onClose,
		innerRef: setPlaceholderRef,
		animate,
		contextId,
		onTransitionEnd: onPlaceholderTransitionEnd
	})), [
		contextId,
		onPlaceholderTransitionEnd,
		props.placeholder,
		props.shouldAnimatePlaceholder,
		setPlaceholderRef
	]);
	const provided = useMemo$1(() => ({
		innerRef: setDroppableRef,
		placeholder,
		droppableProps: {
			"data-rfd-droppable-id": droppableId,
			"data-rfd-droppable-context-id": contextId
		}
	}), [
		contextId,
		droppableId,
		placeholder,
		setDroppableRef
	]);
	const isUsingCloneFor = useClone ? useClone.dragging.draggableId : null;
	const droppableContext = useMemo$1(() => ({
		droppableId,
		type,
		isUsingCloneFor
	}), [
		droppableId,
		isUsingCloneFor,
		type
	]);
	function getClone() {
		if (!useClone) return null;
		const { dragging, render } = useClone;
		const node = import_react.createElement(PrivateDraggable, {
			draggableId: dragging.draggableId,
			index: dragging.source.index,
			isClone: true,
			isEnabled: true,
			shouldRespectForcePress: false,
			canDragInteractiveElements: true
		}, (draggableProvided, draggableSnapshot) => render(draggableProvided, draggableSnapshot, dragging));
		return import_react_dom.createPortal(node, getContainerForClone());
	}
	return import_react.createElement(DroppableContext.Provider, { value: droppableContext }, children(provided, snapshot), getClone());
};
function getBody() {
	!document.body && invariant();
	return document.body;
}
var defaultProps = {
	mode: "standard",
	type: "DEFAULT",
	direction: "vertical",
	isDropDisabled: false,
	isCombineEnabled: false,
	ignoreContainerClipping: false,
	renderClone: null,
	getContainerForClone: getBody
};
var attachDefaultPropsToOwnProps = (ownProps) => {
	let mergedProps = { ...ownProps };
	let defaultPropKey;
	for (defaultPropKey in defaultProps) if (ownProps[defaultPropKey] === void 0) mergedProps = {
		...mergedProps,
		[defaultPropKey]: defaultProps[defaultPropKey]
	};
	return mergedProps;
};
var isMatchingType = (type, critical) => type === critical.droppable.type;
var getDraggable = (critical, dimensions) => dimensions.draggables[critical.draggable.id];
var makeMapStateToProps = () => {
	const idleWithAnimation = {
		placeholder: null,
		shouldAnimatePlaceholder: true,
		snapshot: {
			isDraggingOver: false,
			draggingOverWith: null,
			draggingFromThisWith: null,
			isUsingPlaceholder: false
		},
		useClone: null
	};
	const idleWithoutAnimation = {
		...idleWithAnimation,
		shouldAnimatePlaceholder: false
	};
	const getDraggableRubric = memoizeOne((descriptor) => ({
		draggableId: descriptor.id,
		type: descriptor.type,
		source: {
			index: descriptor.index,
			droppableId: descriptor.droppableId
		}
	}));
	const getMapProps = memoizeOne((id, isEnabled, isDraggingOverForConsumer, isDraggingOverForImpact, dragging, renderClone) => {
		const draggableId = dragging.descriptor.id;
		if (dragging.descriptor.droppableId === id) {
			const useClone = renderClone ? {
				render: renderClone,
				dragging: getDraggableRubric(dragging.descriptor)
			} : null;
			const snapshot$1 = {
				isDraggingOver: isDraggingOverForConsumer,
				draggingOverWith: isDraggingOverForConsumer ? draggableId : null,
				draggingFromThisWith: draggableId,
				isUsingPlaceholder: true
			};
			return {
				placeholder: dragging.placeholder,
				shouldAnimatePlaceholder: false,
				snapshot: snapshot$1,
				useClone
			};
		}
		if (!isEnabled) return idleWithoutAnimation;
		if (!isDraggingOverForImpact) return idleWithAnimation;
		const snapshot = {
			isDraggingOver: isDraggingOverForConsumer,
			draggingOverWith: draggableId,
			draggingFromThisWith: null,
			isUsingPlaceholder: true
		};
		return {
			placeholder: dragging.placeholder,
			shouldAnimatePlaceholder: true,
			snapshot,
			useClone: null
		};
	});
	const selector = (state, ownProps) => {
		const ownPropsWithDefaultProps = attachDefaultPropsToOwnProps(ownProps);
		const id = ownPropsWithDefaultProps.droppableId;
		const type = ownPropsWithDefaultProps.type;
		const isEnabled = !ownPropsWithDefaultProps.isDropDisabled;
		const renderClone = ownPropsWithDefaultProps.renderClone;
		if (isDragging(state)) {
			const critical = state.critical;
			if (!isMatchingType(type, critical)) return idleWithoutAnimation;
			const dragging = getDraggable(critical, state.dimensions);
			const isDraggingOver = whatIsDraggedOver(state.impact) === id;
			return getMapProps(id, isEnabled, isDraggingOver, isDraggingOver, dragging, renderClone);
		}
		if (state.phase === "DROP_ANIMATING") {
			const completed = state.completed;
			if (!isMatchingType(type, completed.critical)) return idleWithoutAnimation;
			const dragging = getDraggable(completed.critical, state.dimensions);
			return getMapProps(id, isEnabled, whatIsDraggedOverFromResult(completed.result) === id, whatIsDraggedOver(completed.impact) === id, dragging, renderClone);
		}
		if (state.phase === "IDLE" && state.completed && !state.shouldFlush) {
			const completed = state.completed;
			if (!isMatchingType(type, completed.critical)) return idleWithoutAnimation;
			const wasOver = whatIsDraggedOver(completed.impact) === id;
			const wasCombining = Boolean(completed.impact.at && completed.impact.at.type === "COMBINE");
			const isHome = completed.critical.droppable.id === id;
			if (wasOver) return wasCombining ? idleWithAnimation : idleWithoutAnimation;
			if (isHome) return idleWithAnimation;
			return idleWithoutAnimation;
		}
		return idleWithoutAnimation;
	};
	return selector;
};
var ConnectedDroppable = connect_default(makeMapStateToProps, { updateViewportMaxScroll }, (stateProps, dispatchProps, ownProps) => {
	return {
		...attachDefaultPropsToOwnProps(ownProps),
		...stateProps,
		...dispatchProps
	};
}, {
	context: StoreContext,
	areStatePropsEqual: isStrictEqual
})(Droppable);
var MacProcessTrustHintModal = ({ open, onClose }) => {
	const { t } = useTranslation();
	const handleOpenAccessibility = () => {
		window.api.shell.openExternal("x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility");
		onClose();
	};
	const handleConfirm = async () => {
		ipcApi.request("system.mac.request_process_trust");
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("selection.settings.enable.mac_process_trust_hint.title") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 py-4 text-foreground text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "m-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { i18nKey: "selection.settings.enable.mac_process_trust_hint.description.0" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "m-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { i18nKey: "selection.settings.enable.mac_process_trust_hint.description.1" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "m-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trans, { i18nKey: "selection.settings.enable.mac_process_trust_hint.description.2" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "text-muted-foreground text-xs",
					onClick: handleOpenAccessibility,
					children: t("selection.settings.enable.mac_process_trust_hint.button.open_accessibility_settings")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleConfirm,
					children: t("selection.settings.enable.mac_process_trust_hint.button.go_to_settings")
				})]
			})
		] })
	});
};
var MacProcessTrustHintModal_default = MacProcessTrustHintModal;
var logger$1 = loggerService.withContext("SelectionActionSearchModal");
var SEARCH_ENGINE_ICON_COLOR = "var(--muted-foreground)";
const LogoBing = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"data-ui": "settings.logo-bing",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "settings.logo-bing"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M11.501 3v8.5h-8.5V3zm0 18h-8.5v-8.5h8.5zm1-18h8.5v8.5h-8.5zm8.5 9.5V21h-8.5v-8.5z"
		})
	});
};
const LogoBaidu = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"data-ui": "settings.logo-baidu",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "settings.logo-baidu"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M5.926 12.497c2.063-.444 1.782-2.909 1.72-3.448c-.1-.83-1.078-2.282-2.404-2.167c-1.67.15-1.914 2.561-1.914 2.561c-.226 1.115.54 3.497 2.598 3.053m2.191 4.288c-.06.173-.195.616-.079 1.002c.23.866.982.905.982.905h1.08v-2.64H8.944c-.52.154-.77.559-.827.733m1.638-8.422c1.14 0 2.06-1.312 2.06-2.933s-.92-2.93-2.06-2.93c-1.138 0-2.06 1.31-2.06 2.93s.923 2.933 2.06 2.933m4.907.193c1.523.198 2.502-1.427 2.697-2.659c.198-1.23-.784-2.658-1.862-2.904c-1.08-.248-2.43 1.483-2.552 2.61c-.147 1.38.197 2.758 1.717 2.953m0 3.448c-1.865-2.905-4.513-1.723-5.399-.245c-.882 1.477-2.256 2.41-2.452 2.658c-.198.244-2.846 1.673-2.258 4.284c.588 2.609 2.653 2.56 2.653 2.56s1.521.15 3.286-.246c1.766-.391 3.286.098 3.286.098s4.124 1.38 5.253-1.278c1.127-2.66-.638-4.038-.638-4.038s-2.356-1.823-3.731-3.793m-6.007 7.75c-1.158-.231-1.62-1.021-1.677-1.156c-.057-.137-.386-.772-.212-1.853c.5-1.619 1.927-1.735 1.927-1.735h1.427v-1.755l1.216.02v6.479zm4.59-.019c-1.196-.308-1.252-1.158-1.252-1.158v-3.412l1.252-.02v3.066c.076.328.482.387.482.387H15v-3.433h1.331v4.57zm7.453-9.11c0-.59-.49-2.364-2.305-2.364c-1.818 0-2.061 1.675-2.061 2.859c0 1.13.095 2.707 2.354 2.657s2.012-2.56 2.012-3.152"
		})
	});
};
const LogoGoogle = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"data-ui": "settings.logo-google",
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...mergeUiProps(props, "settings.logo-google"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M3.064 7.51A10 10 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9s.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49"
		})
	});
};
const DEFAULT_SEARCH_ENGINES = [
	{
		label: "Google",
		value: "Google",
		searchEngine: "Google|https://www.google.com/search?q={{queryString}}",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoGoogle, { style: {
			fontSize: "14px",
			color: SEARCH_ENGINE_ICON_COLOR
		} })
	},
	{
		label: "Baidu",
		value: "Baidu",
		searchEngine: "Baidu|https://www.baidu.com/s?wd={{queryString}}",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoBaidu, { style: {
			fontSize: "14px",
			color: SEARCH_ENGINE_ICON_COLOR
		} })
	},
	{
		label: "Bing",
		value: "Bing",
		searchEngine: "Bing|https://www.bing.com/search?q={{queryString}}",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoBing, { style: {
			fontSize: "14px",
			color: SEARCH_ENGINE_ICON_COLOR
		} })
	},
	{
		label: "",
		value: "custom",
		searchEngine: "",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
			size: 14,
			color: SEARCH_ENGINE_ICON_COLOR
		})
	}
];
var EXAMPLE_URL = "https://example.com/search?q={{queryString}}";
var SelectionActionSearchModal = ({ isModalOpen, onOk, onCancel, currentAction }) => {
	const { t } = useTranslation();
	const form = useForm({
		resolver: a(object({
			engine: string(),
			customName: string().optional(),
			customUrl: string().optional()
		}).superRefine((value, ctx) => {
			if (value.engine !== "custom") return;
			if (!value.customName || value.customName.trim().length === 0) ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ["customName"],
				message: t("selection.settings.search_modal.custom.name.hint")
			});
			else if (value.customName.length > 16) ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ["customName"],
				message: t("selection.settings.search_modal.custom.name.max_length")
			});
			const url = value.customUrl ?? "";
			if (!url || url.trim().length === 0) ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ["customUrl"],
				message: t("selection.settings.search_modal.custom.url.required")
			});
			else if (!/^https?:\/\/.+$/.test(url)) ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ["customUrl"],
				message: t("selection.settings.search_modal.custom.url.invalid_format")
			});
			else if (!url.includes("{{queryString}}")) ctx.addIssue({
				code: ZodIssueCode.custom,
				path: ["customUrl"],
				message: t("selection.settings.search_modal.custom.url.missing_placeholder")
			});
		})),
		defaultValues: {
			engine: "Google",
			customName: "",
			customUrl: ""
		}
	});
	(0, import_react.useEffect)(() => {
		if (!isModalOpen) return;
		if (currentAction?.searchEngine) {
			const [engine$1, url] = currentAction.searchEngine.split("|");
			const defaultEngine = DEFAULT_SEARCH_ENGINES.find((e) => e.value === engine$1);
			if (defaultEngine) form.reset({
				engine: defaultEngine.value,
				customName: "",
				customUrl: ""
			});
			else form.reset({
				engine: "custom",
				customName: engine$1,
				customUrl: url
			});
		} else form.reset({
			engine: "Google",
			customName: "",
			customUrl: ""
		});
	}, [
		isModalOpen,
		currentAction,
		form
	]);
	const engine = form.watch("engine");
	const handleSubmit = (values) => {
		try {
			const selectedEngine = DEFAULT_SEARCH_ENGINES.find((e) => e.value === values.engine);
			onOk(selectedEngine?.value === "custom" ? `${values.customName}|${values.customUrl}` : selectedEngine?.searchEngine || "");
		} catch (error$1) {
			logger$1.debug("Submit failed:", error$1);
		}
	};
	const handleTest = () => {
		const customUrl = form.getValues("customUrl");
		if (customUrl) {
			const testUrl = customUrl.replace("{{queryString}}", "cherry studio");
			ipcApi.request("system.shell.open_website", testUrl);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isModalOpen,
		onOpenChange: (next) => !next && onCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			className: "sm:max-w-120",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("selection.settings.search_modal.title") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: form.handleSubmit(handleSubmit),
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "engine",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t("selection.settings.search_modal.engine.label") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: field.value,
									onValueChange: (value) => {
										field.onChange(value);
										if (value === "custom") {
											form.setValue("customName", "");
											form.setValue("customUrl", EXAMPLE_URL);
										}
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEFAULT_SEARCH_ENGINES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: option.value,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [option.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.label || t("selection.settings.search_modal.engine.custom") })]
										})
									}, option.value)) })]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						engine === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "customName",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t("selection.settings.search_modal.custom.name.label") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: t("selection.settings.search_modal.custom.name.hint"),
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "customUrl",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: t("selection.settings.search_modal.custom.url.label") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: EXAMPLE_URL,
										...field
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: handleTest,
										children: t("selection.settings.search_modal.custom.test")
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: onCancel,
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: t("common.confirm")
						})] })
					]
				})
			})]
		})
	});
};
var SelectionActionSearchModal_default = SelectionActionSearchModal;
var logger = loggerService.withContext("useSettingsActionsList");
var MAX_CUSTOM_ITEMS = 10;
var MAX_ENABLED_ITEMS = 8;
const useActionItems = (initialItems, setActionItems) => {
	const { t } = useTranslation();
	const [isUserModalOpen, setIsUserModalOpen] = (0, import_react.useState)(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = (0, import_react.useState)(false);
	const [userEditingAction, setUserEditingAction] = (0, import_react.useState)(null);
	const enabledItems = (0, import_react.useMemo)(() => initialItems?.filter((item) => item.enabled) ?? [], [initialItems]);
	const disabledItems = (0, import_react.useMemo)(() => initialItems?.filter((item) => !item.enabled) ?? [], [initialItems]);
	const customItemsCount = (0, import_react.useMemo)(() => initialItems?.filter((item) => !item.isBuiltIn).length ?? 0, [initialItems]);
	const handleEditActionItem = (item) => {
		if (item.isBuiltIn) {
			if (item.id === "search") {
				setIsSearchModalOpen(true);
				return;
			}
			return;
		}
		setUserEditingAction(item);
		setIsUserModalOpen(true);
	};
	const handleAddNewAction = () => {
		if (customItemsCount >= MAX_CUSTOM_ITEMS) return;
		setUserEditingAction(null);
		setIsUserModalOpen(true);
	};
	const handleUserModalOk = (actionItem) => {
		if (userEditingAction && initialItems) setActionItems(initialItems.map((item) => item.id === userEditingAction.id ? actionItem : item));
		else try {
			setActionItems([...initialItems || [], actionItem]);
		} catch (error$1) {
			logger.debug("Error adding item:", error$1);
		}
		setIsUserModalOpen(false);
	};
	const handleSearchModalOk = (searchEngine) => {
		if (!initialItems) return;
		setActionItems(initialItems.map((item) => item.id === "search" ? {
			...item,
			searchEngine
		} : item));
		setIsSearchModalOpen(false);
	};
	const handleDeleteActionItem = async (id) => {
		if (!initialItems) return;
		if (!await popup.confirm({
			centered: true,
			content: t("selection.settings.actions.delete_confirm")
		})) return;
		setActionItems(initialItems.filter((item) => item.id !== id));
	};
	const handleReset = async () => {
		if (!initialItems) return;
		if (!await popup.confirm({
			centered: true,
			content: t("selection.settings.actions.reset.confirm")
		})) return;
		const userItems = initialItems.filter((item) => !item.isBuiltIn).map((item) => ({
			...item,
			enabled: false
		}));
		setActionItems([...DefaultPreferences.default["feature.selection.action_items"], ...userItems]);
	};
	const onDragEnd$1 = (result) => {
		if (!result.destination || !initialItems) return;
		const { source, destination } = result;
		if (source.droppableId === "enabled" && destination.droppableId === "disabled" && enabledItems.length === 1) return;
		if (source.droppableId === destination.droppableId) {
			const list = source.droppableId === "enabled" ? [...enabledItems] : [...disabledItems];
			const [removed$1] = list.splice(source.index, 1);
			list.splice(destination.index, 0, removed$1);
			if (source.droppableId === "enabled") {
				const limitedEnabledItems = list.slice(0, MAX_ENABLED_ITEMS);
				const overflowItems = list.length > MAX_ENABLED_ITEMS ? list.slice(MAX_ENABLED_ITEMS) : [];
				setActionItems([
					...limitedEnabledItems.map((item) => ({
						...item,
						enabled: true
					})),
					...disabledItems,
					...overflowItems.map((item) => ({
						...item,
						enabled: false
					}))
				]);
			} else setActionItems([...enabledItems, ...list]);
			return;
		}
		const sourceList = source.droppableId === "enabled" ? [...enabledItems] : [...disabledItems];
		const destList = destination.droppableId === "enabled" ? [...enabledItems] : [...disabledItems];
		const [removed] = sourceList.splice(source.index, 1);
		const updatedItem = {
			...removed,
			enabled: destination.droppableId === "enabled"
		};
		const filteredDestList = destList.filter((item) => item.id !== updatedItem.id);
		filteredDestList.splice(destination.index, 0, updatedItem);
		let newEnabledItems = destination.droppableId === "enabled" ? filteredDestList : sourceList;
		let newDisabledItems = destination.droppableId === "disabled" ? filteredDestList : sourceList;
		if (newEnabledItems.length > MAX_ENABLED_ITEMS) {
			const overflowItems = newEnabledItems.slice(MAX_ENABLED_ITEMS).map((item) => ({
				...item,
				enabled: false
			}));
			newEnabledItems = newEnabledItems.slice(0, MAX_ENABLED_ITEMS);
			newDisabledItems = [...newDisabledItems, ...overflowItems];
		}
		setActionItems([...newEnabledItems.map((item) => ({
			...item,
			enabled: true
		})), ...newDisabledItems.map((item) => ({
			...item,
			enabled: false
		}))]);
	};
	const getSearchEngineInfo = (searchEngine) => {
		if (!searchEngine) return null;
		const [engine] = searchEngine.split("|");
		const defaultEngine = DEFAULT_SEARCH_ENGINES.find((e) => e.value === engine);
		if (defaultEngine) return {
			icon: defaultEngine.icon,
			name: defaultEngine.label
		};
		return {
			icon: DEFAULT_SEARCH_ENGINES.find((e) => e.value === "custom")?.icon,
			name: engine
		};
	};
	return {
		enabledItems,
		disabledItems,
		customItemsCount,
		isUserModalOpen,
		isSearchModalOpen,
		userEditingAction,
		setIsUserModalOpen,
		setIsSearchModalOpen,
		setUserEditingAction,
		handleEditActionItem,
		handleAddNewAction,
		handleUserModalOk,
		handleSearchModalOk,
		handleDeleteActionItem,
		handleReset,
		onDragEnd: onDragEnd$1,
		getSearchEngineInfo,
		MAX_CUSTOM_ITEMS,
		MAX_ENABLED_ITEMS
	};
};
var ActionsListItem = (0, import_react.memo)(({ item, provided, listType, isLastEnabledItem, onEdit, onDelete, getSearchEngineInfo }) => {
	const { t } = useTranslation();
	const isEnabled = listType === "enabled";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
		ref: provided.innerRef,
		...provided.draggableProps,
		...isLastEnabledItem ? {} : provided.dragHandleProps,
		disabled: !isEnabled,
		className: isLastEnabledItem ? "non-draggable" : "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemLeft, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIcon, {
				disabled: !isEnabled,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
					name: item.icon,
					size: 16,
					fallback: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						width: 16,
						height: 16
					} })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemName, {
				disabled: !isEnabled,
				children: item.isBuiltIn ? t(item.name) : item.name
			}),
			item.id === "search" && item.searchEngine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ItemDescription, { children: [getSearchEngineInfo(item.searchEngine)?.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getSearchEngineInfo(item.searchEngine)?.name })] })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionOperations, {
			item,
			onEdit,
			onDelete
		})]
	});
});
var ActionOperations = (0, import_react.memo)(({ item, onEdit, onDelete }) => {
	if (!item.isBuiltIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UserActionOpSection, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon-sm",
		onClick: () => onEdit(item),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
			size: 16,
			className: "btn-icon-edit"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon-sm",
		onClick: () => onDelete(item.id),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
			size: 16,
			className: "btn-icon-delete"
		})
	})] });
	if (item.isBuiltIn && item.id === "search") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserActionOpSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon-sm",
		onClick: () => onEdit(item),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {
			size: 16,
			className: "btn-icon-edit"
		})
	}) });
	return null;
});
var Item = ({ ref, className, disabled, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.item",
	ref,
	className: cn("group/action-item mb-2 flex min-h-11 cursor-move items-center justify-between rounded-md border border-border-subtle bg-transparent px-4 py-2 transition-colors last:mb-0 hover:border-border hover:bg-muted/50", disabled && "opacity-70 hover:bg-muted/30", className === "non-draggable" && "relative cursor-default border-border bg-muted/50 hover:bg-muted/50", className),
	...mergeUiProps(props, "settings.item")
});
var ItemLeft = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.item-left",
	className: cn("flex min-w-0 flex-1 items-center", className),
	...mergeUiProps(props, "settings.item-left")
});
var ItemName = ({ className, disabled, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.item-name",
	className: cn("ml-2 truncate", disabled ? "text-foreground-disabled" : "text-foreground", className),
	...mergeUiProps(props, "settings.item-name")
});
var ItemIcon = ({ className, disabled, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.item-icon",
	className: cn("mx-2 flex items-center justify-center", disabled ? "text-foreground-disabled" : "text-muted-foreground group-hover/action-item:text-foreground", className),
	...mergeUiProps(props, "settings.item-icon")
});
var ItemDescription = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.item-description",
	className: cn("ml-4 flex h-5 shrink-0 items-center gap-1 rounded-sm bg-muted/50 px-1.5 text-muted-foreground text-xs leading-none", className),
	...mergeUiProps(props, "settings.item-description")
});
var UserActionOpSection = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.user-action-op-section",
	className: cn("flex flex-row items-center gap-2 [&_.btn-icon-delete:hover]:text-destructive [&_.btn-icon-delete]:text-muted-foreground [&_.btn-icon-edit:hover]:text-foreground [&_.btn-icon-edit]:text-muted-foreground", className),
	...mergeUiProps(props, "settings.user-action-op-section")
});
var ActionsListItem_default = ActionsListItem;
var ActionsList_default = (0, import_react.memo)(({ droppableId, items, isLastEnabledItem, onEdit, onDelete, getSearchEngineInfo }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectedDroppable, {
		droppableId,
		children: (provided) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: provided.innerRef,
			className: "mb-4 rounded pb-px",
			...provided.droppableProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicDraggable, {
				draggableId: item.id,
				index,
				children: (provided$1) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionsListItem_default, {
					item,
					provided: provided$1,
					listType: droppableId,
					isLastEnabledItem,
					onEdit,
					onDelete,
					getSearchEngineInfo
				})
			}, item.id)), provided.placeholder] })
		})
	});
});
var ActionsListDivider_default = (0, import_react.memo)(({ enabledCount, maxEnabled }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.actions-list-divider",
		className: "my-4 flex items-center justify-center text-foreground-tertiary text-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 flex-1 bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mx-4",
				children: t("selection.settings.actions.drag_hint", {
					enabled: enabledCount,
					max: maxEnabled
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-0.5 flex-1 bg-border" })
		]
	});
});
var SelectionActionUserModal = ({ isModalOpen, editingAction, onOk, onCancel }) => {
	const { t } = useTranslation();
	const { assistants: userPredefinedAssistants } = useAssistants();
	const { defaultModel } = useDefaultModel();
	const assistantOptions = userPredefinedAssistants;
	const firstAssistantId = assistantOptions[0]?.id;
	const [formData, setFormData] = (0, import_react.useState)({});
	const [errors, setErrors] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (isModalOpen) {
			setFormData(editingAction || {
				name: "",
				prompt: "",
				icon: "",
				assistantId: ""
			});
			setErrors({});
		}
	}, [isModalOpen, editingAction]);
	const validateForm = () => {
		const newErrors = {};
		if (!formData.name?.trim()) newErrors.name = t("selection.settings.user_modal.name.hint");
		if (formData.icon && !iconNames.includes(formData.icon)) newErrors.icon = t("selection.settings.user_modal.icon.error");
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const handleOk = () => {
		if (!validateForm()) return;
		onOk({
			id: editingAction?.id || `user-${Date.now()}`,
			name: formData.name || "USER",
			enabled: editingAction?.enabled || false,
			isBuiltIn: editingAction?.isBuiltIn || false,
			icon: formData.icon,
			prompt: formData.prompt,
			assistantId: formData.assistantId
		});
	};
	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
		if (errors[field]) setErrors((prev) => ({
			...prev,
			[field]: void 0
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isModalOpen,
		onOpenChange: (next) => !next && onCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"aria-describedby": void 0,
			closeOnOverlayClick: false,
			className: "sm:max-w-130",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingAction ? t("selection.settings.user_modal.title.edit") : t("selection.settings.user_modal.title.add") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full min-w-0 flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-[70%] flex-auto pr-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSectionTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSectionTitleLabel, { children: t("selection.settings.user_modal.name.label") }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										autoFocus: true,
										placeholder: t("selection.settings.user_modal.name.hint"),
										value: formData.name || "",
										onChange: (e) => handleInputChange("name", e.target.value),
										maxLength: 16,
										"aria-invalid": !!errors.name
									}),
									errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorText, { children: errors.name })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalSectionTitle, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSectionTitleLabel, { children: t("selection.settings.user_modal.icon.label") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										content: t("selection.settings.user_modal.icon.tooltip"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionIcon$1, { size: 14 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spacer$1, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://lucide.dev/icons/",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-1 text-link text-xs",
										children: [t("selection.settings.user_modal.icon.view_all"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 12 })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										content: t("selection.settings.user_modal.icon.random"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiceButton, {
											onClick: () => {
												const randomIcon = iconNames[Math.floor(Math.random() * iconNames.length)];
												handleInputChange("icon", randomIcon);
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, {
												size: 14,
												className: "btn-icon"
											})
										})
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: t("selection.settings.user_modal.icon.placeholder"),
										value: formData.icon || "",
										onChange: (e) => handleInputChange("icon", e.target.value),
										className: "w-full",
										"aria-invalid": !!errors.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPreview, { children: formData.icon && (iconNames.includes(formData.icon) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
										name: formData.icon,
										size: 18
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonX, {
										size: 18,
										color: "var(--error)"
									})) })]
								}),
								errors.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorText, { children: errors.icon })
							] })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSection, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-auto pr-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalSectionTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSectionTitleLabel, { children: t("selection.settings.user_modal.model.label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: t("selection.settings.user_modal.model.tooltip"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionIcon$1, { size: 14 })
								})] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
								value: formData.assistantId ? "assistant" : "default",
								onValueChange: (value) => handleInputChange("assistantId", value === "default" ? "" : firstAssistantId ?? ""),
								className: "flex flex-row gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "default" }), t("selection.settings.user_modal.model.default")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "assistant" }), t("selection.settings.user_modal.model.assistant")]
								})]
							})]
						}) }),
						formData.assistantId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalSection, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSectionTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSectionTitleLabel, { children: t("selection.settings.user_modal.assistant.label") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: formData.assistantId,
							onValueChange: (value) => handleInputChange("assistantId", value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: cn("w-full min-w-0 overflow-hidden", "*:data-[slot=select-value]:min-w-0", "*:data-[slot=select-value]:flex-1", "*:data-[slot=select-value]:overflow-hidden"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
								className: "w-(--radix-select-trigger-width) max-w-(--radix-select-trigger-width)",
								children: assistantOptions.map((a$1) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: a$1.id,
									className: "overflow-hidden [&>span:last-child]:min-w-0 [&>span:last-child]:flex-1 [&>span:last-child]:overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AssistantItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelAvatar_default, {
											model: defaultModel,
											size: 18,
											className: "shrink-0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantName, {
											title: a$1.name,
											children: a$1.name
										}),
										firstAssistantId === a$1.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrentTag, {
											isCurrent: true,
											children: t("selection.settings.user_modal.assistant.default")
										})
									] })
								}, a$1.id))
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalSection, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalSectionTitle, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSectionTitleLabel, { children: t("selection.settings.user_modal.prompt.label") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: t("selection.settings.user_modal.prompt.tooltip"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionIcon$1, { size: 14 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spacer$1, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex select-text items-center gap-1 text-muted-foreground text-xs",
								children: [
									t("selection.settings.user_modal.prompt.placeholder_text"),
									" ",
									"{{text}}",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton_default, {
										tooltip: t("selection.settings.user_modal.prompt.copy_placeholder"),
										textToCopy: "{{text}}"
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							placeholder: t("selection.settings.user_modal.prompt.placeholder"),
							value: formData.prompt || "",
							onChange: (e) => handleInputChange("prompt", e.target.value),
							rows: 4,
							className: "resize-none"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onCancel,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleOk,
					children: t("common.confirm")
				})] })
			]
		})
	});
};
var ModalSection = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.modal-section",
	className: cn("mt-4 flex flex-col", className),
	...mergeUiProps(props, "settings.modal-section")
});
var ModalSectionTitle = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.modal-section-title",
	className: cn("mb-2 flex items-center gap-1", className),
	...mergeUiProps(props, "settings.modal-section-title")
});
var ModalSectionTitleLabel = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.modal-section-title-label",
	className: cn("text-foreground text-sm", className),
	...mergeUiProps(props, "settings.modal-section-title-label")
});
var QuestionIcon$1 = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
	className: cn("cursor-pointer text-muted-foreground", className),
	...props
});
var ErrorText = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.error-text",
	className: cn("text-destructive text-xs", className),
	...mergeUiProps(props, "settings.error-text")
});
var Spacer$1 = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.spacer",
	className: cn("flex-1", className),
	...mergeUiProps(props, "settings.spacer")
});
var IconPreview = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.icon-preview",
	className: cn("flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background-subtle", className),
	...mergeUiProps(props, "settings.icon-preview")
});
var AssistantItem = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.assistant-item",
	className: cn("flex h-7 w-full min-w-0 max-w-full flex-row items-center gap-2 overflow-hidden", className),
	...mergeUiProps(props, "settings.assistant-item")
});
var AssistantName = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.assistant-name",
	className: cn("min-w-0 flex-1 truncate text-left", className),
	...mergeUiProps(props, "settings.assistant-name")
});
var CurrentTag = ({ isCurrent, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	"data-ui": "settings.current-tag",
	className: cn("shrink-0 rounded px-1 py-0.5 text-xs", isCurrent ? "text-primary" : "text-foreground-tertiary", className),
	...mergeUiProps(props, "settings.current-tag")
});
var DiceButton = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.dice-button",
	className: cn("ml-1 flex cursor-pointer items-center justify-center transition-all active:rotate-720 [&_.btn-icon]:text-muted-foreground hover:[&_.btn-icon]:text-foreground", className),
	...mergeUiProps(props, "settings.dice-button")
});
var SelectionActionUserModal_default = SelectionActionUserModal;
var SettingsActionsListHeader_default = (0, import_react.memo)(({ customItemsCount, maxCustomItems, onReset, onAdd }) => {
	const { t } = useTranslation();
	const isCustomItemLimitReached = customItemsCount >= maxCustomItems;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-ui": "settings.actions-list-header",
		className: "flex w-full items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("selection.settings.actions.title") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: t("selection.settings.actions.reset.tooltip"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "mx-2 text-muted-foreground hover:text-foreground",
					onClick: onReset,
					children: t("selection.settings.actions.reset.button")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
				content: isCustomItemLimitReached ? t("selection.settings.actions.add_tooltip.disabled", { max: maxCustomItems }) : t("selection.settings.actions.add_tooltip.enabled"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: onAdd,
					disabled: isCustomItemLimitReached,
					style: { paddingInline: "8px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), t("selection.settings.actions.custom")]
				})
			})
		]
	});
});
var SelectionActionsList = ({ actionItems, setActionItems }) => {
	const { enabledItems, disabledItems, customItemsCount, isUserModalOpen, isSearchModalOpen, userEditingAction, setIsUserModalOpen, setIsSearchModalOpen, handleEditActionItem, handleAddNewAction, handleUserModalOk, handleSearchModalOk, handleDeleteActionItem, handleReset, onDragEnd: onDragEnd$1, getSearchEngineInfo, MAX_CUSTOM_ITEMS: MAX_CUSTOM_ITEMS$1, MAX_ENABLED_ITEMS: MAX_ENABLED_ITEMS$1 } = useActionItems(actionItems, setActionItems);
	const { theme } = useTheme();
	const [isCompact] = usePreference("feature.selection.compact");
	if (!actionItems || actionItems.length === 0) setActionItems(DefaultPreferences.default["feature.selection.action_items"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
		theme,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsActionsListHeader_default, {
				customItemsCount,
				maxCustomItems: MAX_CUSTOM_ITEMS$1,
				onReset: handleReset,
				onAdd: handleAddNewAction
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-6 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionToolbarView_default, {
					actionItems: actionItems?.filter((item) => item.enabled) ?? [],
					isCompact,
					handleAction: () => {},
					copyIconStatus: "normal",
					copyIconAnimation: "none"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragDropContext, {
				onDragEnd: onDragEnd$1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionsList_default, {
								droppableId: "enabled",
								items: enabledItems,
								isLastEnabledItem: enabledItems.length === 1,
								onEdit: handleEditActionItem,
								onDelete: handleDeleteActionItem,
								getSearchEngineInfo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionsListDivider_default, {
								enabledCount: enabledItems.length,
								maxEnabled: MAX_ENABLED_ITEMS$1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionsList_default, {
								droppableId: "disabled",
								items: disabledItems,
								isLastEnabledItem: false,
								onEdit: handleEditActionItem,
								onDelete: handleDeleteActionItem,
								getSearchEngineInfo
							})
						]
					})
				})
			}),
			isUserModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionActionUserModal_default, {
				isModalOpen: isUserModalOpen,
				editingAction: userEditingAction,
				onOk: handleUserModalOk,
				onCancel: () => setIsUserModalOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionActionSearchModal_default, {
				isModalOpen: isSearchModalOpen,
				onOk: handleSearchModalOk,
				onCancel: () => setIsSearchModalOpen(false),
				currentAction: actionItems?.find((item) => item.id === "search")
			})
		]
	});
};
var SelectionActionsList_default = SelectionActionsList;
var SelectionFilterListModal = ({ open, onClose, filterList = [], onSave }) => {
	const { t } = useTranslation();
	const [value, setValue] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (open) setValue((filterList || []).join("\n"));
	}, [open, filterList]);
	const handleSave = () => {
		const newList = value.trim().toLowerCase().split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
		onSave([...new Set(newList)]);
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			closeOnOverlayClick: false,
			className: "sm:max-w-130",
			onPointerDownOutside: (e) => e.preventDefault(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("selection.settings.filter_modal.title") }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm",
					children: isWin ? t("selection.settings.filter_modal.user_tips.windows") : t("selection.settings.filter_modal.user_tips.mac")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					className: "field-sizing-content mt-4 w-full",
					rows: 6,
					spellCheck: false,
					autoFocus: true,
					value,
					onChange: (e) => setValue(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onClose,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSave,
					children: t("common.save")
				})] })
			]
		})
	});
};
var SelectionFilterListModal_default = SelectionFilterListModal;
var SelectionAssistantSettings = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [selectionEnabled, setSelectionEnabled] = usePreference("feature.selection.enabled");
	const [triggerMode, setTriggerMode] = usePreference("feature.selection.trigger_mode");
	const [isCompact, setIsCompact] = usePreference("feature.selection.compact");
	const [isAutoClose, setIsAutoClose] = usePreference("feature.selection.auto_close");
	const [isAutoPin, setIsAutoPin] = usePreference("feature.selection.auto_pin");
	const [isFollowToolbar, setIsFollowToolbar] = usePreference("feature.selection.follow_toolbar");
	const [isRemeberWinSize, setIsRemeberWinSize] = usePreference("feature.selection.remember_win_size");
	const [actionWindowOpacity, setActionWindowOpacity] = usePreference("feature.selection.action_window_opacity");
	const [filterMode, setFilterMode] = usePreference("feature.selection.filter_mode");
	const [filterList, setFilterList] = usePreference("feature.selection.filter_list");
	const [actionItems, setActionItems] = usePreference("feature.selection.action_items");
	const isSupportedOS = isWin || isMac || isLinux;
	const [isFilterListModalOpen, setIsFilterListModalOpen] = (0, import_react.useState)(false);
	const [isMacTrustModalOpen, setIsMacTrustModalOpen] = (0, import_react.useState)(false);
	const [opacityValue, setOpacityValue] = (0, import_react.useState)(actionWindowOpacity);
	const [linuxEnvInfo, setLinuxEnvInfo] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const checkMacProcessTrust = async () => {
			if (!await ipcApi.request("system.mac.is_process_trusted")) setSelectionEnabled(false);
		};
		if (!isSupportedOS && selectionEnabled) {
			setSelectionEnabled(false);
			return;
		} else if (isMac && selectionEnabled) checkMacProcessTrust();
	}, [
		isSupportedOS,
		selectionEnabled,
		setSelectionEnabled
	]);
	(0, import_react.useEffect)(() => {
		if (isLinux) ipcApi.request("selection.get_linux_env_info").then(setLinuxEnvInfo);
	}, []);
	const handleEnableCheckboxChange = async (checked) => {
		if (!isSupportedOS) return;
		if (isMac && checked) {
			if (!await ipcApi.request("system.mac.is_process_trusted")) {
				setIsMacTrustModalOpen(true);
				return;
			}
		}
		setSelectionEnabled(checked);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsContentColumn, {
		theme,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
				theme,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-[15px]",
						children: t("selection.name")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "cursor-pointer border-0 bg-transparent p-0 font-normal text-link text-xs hover:underline",
							onClick: () => ipcApi.request("system.shell.open_website", "https://github.com/CherryHQ/cherry-studio/issues/6505"),
							children: "FAQ & " + t("settings.about.feedback.button")
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("selection.settings.enable.title") }), !isSupportedOS && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.enable.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: isSupportedOS && selectionEnabled,
						onCheckedChange: handleEnableCheckboxChange,
						disabled: !isSupportedOS
					})] }),
					!selectionEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionToolbarView_default, {
						actionItems: actionItems?.filter((item) => item.enabled),
						isCompact,
						handleAction: () => {},
						copyIconStatus: "normal",
						copyIconAnimation: "none"
					}) }),
					selectionEnabled && isLinux && linuxEnvInfo?.isLinuxWaylandDisplay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						size: 14,
						style: {
							marginRight: 4,
							color: "var(--error)"
						}
					}), t("selection.settings.linux.wayland_title")] }), linuxEnvInfo.isLinuxCompositorCompatible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.linux.wayland_description") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, {
							style: { marginTop: 6 },
							children: t("selection.settings.linux.wayland_checklist_subtitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChecklistItem, {
							style: { marginTop: 6 },
							children: [linuxEnvInfo.isLinuxXWaylandMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								size: 13,
								style: {
									color: "var(--success)",
									marginRight: 6,
									flexShrink: 0
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
								size: 13,
								style: {
									color: "var(--error)",
									marginRight: 6,
									flexShrink: 0
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t("selection.settings.linux.xwayland_label"), linuxEnvInfo.isLinuxXWaylandMode ? t("selection.settings.linux.xwayland_pass") : t("selection.settings.linux.xwayland_fail")] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChecklistItem, { children: [linuxEnvInfo.hasLinuxInputDeviceAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
							size: 13,
							style: {
								color: "var(--success)",
								marginRight: 6,
								flexShrink: 0
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
							size: 13,
							style: {
								color: "var(--error)",
								marginRight: 6,
								flexShrink: 0
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t("selection.settings.linux.input_group_label"), linuxEnvInfo.hasLinuxInputDeviceAccess ? t("selection.settings.linux.input_group_pass") : t("selection.settings.linux.input_group_fail")] })] })
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.linux.compositor_incompatible") })] })] })
				]
			}),
			selectionEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
					theme,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("selection.settings.toolbar.title") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { marginRight: "4px" },
							children: t("selection.settings.toolbar.trigger_mode.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: t(getSelectionDescriptionLabelKey(isWin ? "windows" : isLinux ? "linux" : "mac")),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionIcon, { size: 14 })
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.toolbar.trigger_mode.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
							value: triggerMode,
							onValueChange: (value) => setTriggerMode(value),
							className: "flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: t("selection.settings.toolbar.trigger_mode.selected_note"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex cursor-pointer items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											size: "sm",
											value: "selected"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("selection.settings.toolbar.trigger_mode.selected") })]
									})
								}),
								isWin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: t("selection.settings.toolbar.trigger_mode.ctrlkey_note"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex cursor-pointer items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											size: "sm",
											value: "ctrlkey"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("selection.settings.toolbar.trigger_mode.ctrlkey") })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									placement: "top-end",
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [t("selection.settings.toolbar.trigger_mode.shortcut_note"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/settings/shortcut",
										style: { color: "var(--link)" },
										children: t("selection.settings.toolbar.trigger_mode.shortcut_link")
									})] }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex cursor-pointer items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											size: "sm",
											value: "shortcut"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("selection.settings.toolbar.trigger_mode.shortcut") })]
									})
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("selection.settings.toolbar.compact_mode.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.toolbar.compact_mode.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: isCompact,
							onCheckedChange: setIsCompact
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
					theme,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("selection.settings.window.title") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("selection.settings.window.follow_toolbar.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.window.follow_toolbar.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: isFollowToolbar,
							onCheckedChange: setIsFollowToolbar
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("selection.settings.window.remember_size.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.window.remember_size.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: isRemeberWinSize,
							onCheckedChange: setIsRemeberWinSize
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("selection.settings.window.auto_close.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.window.auto_close.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: isAutoClose,
							onCheckedChange: setIsAutoClose
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("selection.settings.window.auto_pin.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.window.auto_pin.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: isAutoPin,
							onCheckedChange: setIsAutoPin
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("selection.settings.window.opacity.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.window.opacity.description") })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { marginRight: "16px" },
								children: [opacityValue, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								className: "w-25",
								min: 20,
								max: 100,
								value: [opacityValue],
								onValueChange: (value) => setOpacityValue(value[0]),
								onValueCommit: (value) => setActionWindowOpacity(value[0])
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionActionsList_default, {
					actionItems,
					setActionItems
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingGroup, {
					theme,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingTitle, { children: t("selection.settings.advanced.title") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRowTitle, { children: [t("selection.settings.advanced.filter_mode.title"), isLinux && linuxEnvInfo?.isLinuxWaylandDisplay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							style: {
								marginLeft: 6,
								display: "inline-flex",
								alignItems: "center"
							},
							children: [
								"（",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									size: 13,
									style: {
										margin: "0 3px",
										color: "var(--error)"
									}
								}),
								t("selection.settings.linux.filter_warning_text"),
								"）"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.advanced.filter_mode.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
							value: filterMode ?? "default",
							onValueChange: (value) => setFilterMode(value),
							className: "flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										size: "sm",
										value: "default"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("selection.settings.advanced.filter_mode.default") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										size: "sm",
										value: "whitelist"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("selection.settings.advanced.filter_mode.whitelist") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										size: "sm",
										value: "blacklist"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("selection.settings.advanced.filter_mode.blacklist") })]
								})
							]
						})] }),
						filterMode && filterMode !== "default" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRowTitle, { children: t("selection.settings.advanced.filter_list.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingDescription, { children: t("selection.settings.advanced.filter_list.description") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setIsFilterListModalOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 14 }), t("common.edit")]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionFilterListModal_default, {
								open: isFilterListModalOpen,
								onClose: () => setIsFilterListModalOpen(false),
								filterList,
								onSave: setFilterList
							})
						] })
					]
				})
			] }),
			isMac && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MacProcessTrustHintModal_default, {
				open: isMacTrustModalOpen,
				onClose: () => setIsMacTrustModalOpen(false)
			})
		]
	});
};
var Spacer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.spacer",
	className: cn("flex-1", className),
	...mergeUiProps(props, "settings.spacer")
});
var SettingLabel = Spacer;
var DemoContainer = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.demo",
	className: cn("mt-3.75 mb-1.25 flex items-center justify-center", className),
	...mergeUiProps(props, "settings.demo")
});
var QuestionIcon = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
	className: cn("cursor-pointer text-muted-foreground", className),
	...props
});
var ChecklistItem = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	"data-ui": "settings.checklist-item",
	className: cn("mb-0.5 flex items-center text-foreground-tertiary text-xs", className),
	...mergeUiProps(props, "settings.checklist-item")
});
var SplitComponent = SelectionAssistantSettings;
export { SplitComponent as component };
