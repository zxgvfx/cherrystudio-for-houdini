import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_react_dom } from "./react-dom-D5lMhlFn.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
import { t as require_shim } from "./shim-2TzZzGeK.js";
import { t as require_with_selector } from "./with-selector-DFVq3c2Y.js";
import { A as getRenderedAttributes, s as NodeView, t as Editor, z as isNodeViewSelected } from "./dist-DEHNmG6a.js";
var { getOwnPropertyNames, getOwnPropertySymbols } = Object;
var { hasOwnProperty } = Object.prototype;
function combineComparators(comparatorA, comparatorB) {
	return function isEqual(a, b, state) {
		return comparatorA(a, b, state) && comparatorB(a, b, state);
	};
}
function createIsCircular(areItemsEqual) {
	return function isCircular(a, b, state) {
		if (!a || !b || typeof a !== "object" || typeof b !== "object") return areItemsEqual(a, b, state);
		const { cache } = state;
		const cachedA = cache.get(a);
		const cachedB = cache.get(b);
		if (cachedA && cachedB) return cachedA === b && cachedB === a;
		cache.set(a, b);
		cache.set(b, a);
		const result = areItemsEqual(a, b, state);
		cache.delete(a);
		cache.delete(b);
		return result;
	};
}
function getShortTag(value) {
	return value != null ? value[Symbol.toStringTag] : void 0;
}
function getStrictProperties(object) {
	return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
var hasOwn = Object.hasOwn || ((object, property) => hasOwnProperty.call(object, property));
function sameValueZeroEqual(a, b) {
	return a === b || !a && !b && a !== a && b !== b;
}
var PREACT_VNODE = "__v";
var PREACT_OWNER = "__o";
var REACT_OWNER = "_owner";
var { getOwnPropertyDescriptor, keys } = Object;
function areArrayBuffersEqual(a, b) {
	return a.byteLength === b.byteLength && areTypedArraysEqual(new Uint8Array(a), new Uint8Array(b));
}
function areArraysEqual(a, b, state) {
	let index = a.length;
	if (b.length !== index) return false;
	while (index-- > 0) if (!state.equals(a[index], b[index], index, index, a, b, state)) return false;
	return true;
}
function areDataViewsEqual(a, b) {
	return a.byteLength === b.byteLength && areTypedArraysEqual(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength));
}
function areDatesEqual(a, b) {
	return sameValueZeroEqual(a.getTime(), b.getTime());
}
function areErrorsEqual(a, b) {
	return a.name === b.name && a.message === b.message && a.cause === b.cause && a.stack === b.stack;
}
function areFunctionsEqual(a, b) {
	return a === b;
}
function areMapsEqual(a, b, state) {
	const size = a.size;
	if (size !== b.size) return false;
	if (!size) return true;
	const matchedIndices = new Array(size);
	const aIterable = a.entries();
	let aResult;
	let bResult;
	let index = 0;
	while (aResult = aIterable.next()) {
		if (aResult.done) break;
		const bIterable = b.entries();
		let hasMatch = false;
		let matchIndex = 0;
		while (bResult = bIterable.next()) {
			if (bResult.done) break;
			if (matchedIndices[matchIndex]) {
				matchIndex++;
				continue;
			}
			const aEntry = aResult.value;
			const bEntry = bResult.value;
			if (state.equals(aEntry[0], bEntry[0], index, matchIndex, a, b, state) && state.equals(aEntry[1], bEntry[1], aEntry[0], bEntry[0], a, b, state)) {
				hasMatch = matchedIndices[matchIndex] = true;
				break;
			}
			matchIndex++;
		}
		if (!hasMatch) return false;
		index++;
	}
	return true;
}
var areNumbersEqual = sameValueZeroEqual;
function areObjectsEqual(a, b, state) {
	const properties = keys(a);
	let index = properties.length;
	if (keys(b).length !== index) return false;
	while (index-- > 0) if (!isPropertyEqual(a, b, state, properties[index])) return false;
	return true;
}
function areObjectsEqualStrict(a, b, state) {
	const properties = getStrictProperties(a);
	let index = properties.length;
	if (getStrictProperties(b).length !== index) return false;
	let property;
	let descriptorA;
	let descriptorB;
	while (index-- > 0) {
		property = properties[index];
		if (!isPropertyEqual(a, b, state, property)) return false;
		descriptorA = getOwnPropertyDescriptor(a, property);
		descriptorB = getOwnPropertyDescriptor(b, property);
		if ((descriptorA || descriptorB) && (!descriptorA || !descriptorB || descriptorA.configurable !== descriptorB.configurable || descriptorA.enumerable !== descriptorB.enumerable || descriptorA.writable !== descriptorB.writable)) return false;
	}
	return true;
}
function arePrimitiveWrappersEqual(a, b) {
	return sameValueZeroEqual(a.valueOf(), b.valueOf());
}
function areRegExpsEqual(a, b) {
	return a.source === b.source && a.flags === b.flags;
}
function areSetsEqual(a, b, state) {
	const size = a.size;
	if (size !== b.size) return false;
	if (!size) return true;
	const matchedIndices = new Array(size);
	const aIterable = a.values();
	let aResult;
	let bResult;
	while (aResult = aIterable.next()) {
		if (aResult.done) break;
		const bIterable = b.values();
		let hasMatch = false;
		let matchIndex = 0;
		while (bResult = bIterable.next()) {
			if (bResult.done) break;
			if (!matchedIndices[matchIndex] && state.equals(aResult.value, bResult.value, aResult.value, bResult.value, a, b, state)) {
				hasMatch = matchedIndices[matchIndex] = true;
				break;
			}
			matchIndex++;
		}
		if (!hasMatch) return false;
	}
	return true;
}
function areTypedArraysEqual(a, b) {
	let index = a.byteLength;
	if (b.byteLength !== index || a.byteOffset !== b.byteOffset) return false;
	while (index-- > 0) if (a[index] !== b[index]) return false;
	return true;
}
function areUrlsEqual(a, b) {
	return a.hostname === b.hostname && a.pathname === b.pathname && a.protocol === b.protocol && a.port === b.port && a.hash === b.hash && a.username === b.username && a.password === b.password;
}
function isPropertyEqual(a, b, state, property) {
	if ((property === REACT_OWNER || property === PREACT_OWNER || property === PREACT_VNODE) && (a.$$typeof || b.$$typeof)) return true;
	return hasOwn(b, property) && state.equals(a[property], b[property], property, property, a, b, state);
}
var ARRAY_BUFFER_TAG = "[object ArrayBuffer]";
var ARGUMENTS_TAG = "[object Arguments]";
var BOOLEAN_TAG = "[object Boolean]";
var DATA_VIEW_TAG = "[object DataView]";
var DATE_TAG = "[object Date]";
var ERROR_TAG = "[object Error]";
var MAP_TAG = "[object Map]";
var NUMBER_TAG = "[object Number]";
var OBJECT_TAG = "[object Object]";
var REG_EXP_TAG = "[object RegExp]";
var SET_TAG = "[object Set]";
var STRING_TAG = "[object String]";
var TYPED_ARRAY_TAGS = {
	"[object Int8Array]": true,
	"[object Uint8Array]": true,
	"[object Uint8ClampedArray]": true,
	"[object Int16Array]": true,
	"[object Uint16Array]": true,
	"[object Int32Array]": true,
	"[object Uint32Array]": true,
	"[object Float16Array]": true,
	"[object Float32Array]": true,
	"[object Float64Array]": true,
	"[object BigInt64Array]": true,
	"[object BigUint64Array]": true
};
var URL_TAG = "[object URL]";
var toString = Object.prototype.toString;
function createEqualityComparator({ areArrayBuffersEqual: areArrayBuffersEqual$1, areArraysEqual: areArraysEqual$1, areDataViewsEqual: areDataViewsEqual$1, areDatesEqual: areDatesEqual$1, areErrorsEqual: areErrorsEqual$1, areFunctionsEqual: areFunctionsEqual$1, areMapsEqual: areMapsEqual$1, areNumbersEqual: areNumbersEqual$1, areObjectsEqual: areObjectsEqual$1, arePrimitiveWrappersEqual: arePrimitiveWrappersEqual$1, areRegExpsEqual: areRegExpsEqual$1, areSetsEqual: areSetsEqual$1, areTypedArraysEqual: areTypedArraysEqual$1, areUrlsEqual: areUrlsEqual$1, unknownTagComparators }) {
	return function comparator(a, b, state) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		const type = typeof a;
		if (type !== typeof b) return false;
		if (type !== "object") {
			if (type === "number") return areNumbersEqual$1(a, b, state);
			if (type === "function") return areFunctionsEqual$1(a, b, state);
			return false;
		}
		const constructor = a.constructor;
		if (constructor !== b.constructor) return false;
		if (constructor === Object) return areObjectsEqual$1(a, b, state);
		if (Array.isArray(a)) return areArraysEqual$1(a, b, state);
		if (constructor === Date) return areDatesEqual$1(a, b, state);
		if (constructor === RegExp) return areRegExpsEqual$1(a, b, state);
		if (constructor === Map) return areMapsEqual$1(a, b, state);
		if (constructor === Set) return areSetsEqual$1(a, b, state);
		const tag = toString.call(a);
		if (tag === DATE_TAG) return areDatesEqual$1(a, b, state);
		if (tag === REG_EXP_TAG) return areRegExpsEqual$1(a, b, state);
		if (tag === MAP_TAG) return areMapsEqual$1(a, b, state);
		if (tag === SET_TAG) return areSetsEqual$1(a, b, state);
		if (tag === OBJECT_TAG) return typeof a.then !== "function" && typeof b.then !== "function" && areObjectsEqual$1(a, b, state);
		if (tag === URL_TAG) return areUrlsEqual$1(a, b, state);
		if (tag === ERROR_TAG) return areErrorsEqual$1(a, b, state);
		if (tag === ARGUMENTS_TAG) return areObjectsEqual$1(a, b, state);
		if (TYPED_ARRAY_TAGS[tag]) return areTypedArraysEqual$1(a, b, state);
		if (tag === ARRAY_BUFFER_TAG) return areArrayBuffersEqual$1(a, b, state);
		if (tag === DATA_VIEW_TAG) return areDataViewsEqual$1(a, b, state);
		if (tag === BOOLEAN_TAG || tag === NUMBER_TAG || tag === STRING_TAG) return arePrimitiveWrappersEqual$1(a, b, state);
		if (unknownTagComparators) {
			let unknownTagComparator = unknownTagComparators[tag];
			if (!unknownTagComparator) {
				const shortTag = getShortTag(a);
				if (shortTag) unknownTagComparator = unknownTagComparators[shortTag];
			}
			if (unknownTagComparator) return unknownTagComparator(a, b, state);
		}
		return false;
	};
}
function createEqualityComparatorConfig({ circular, createCustomConfig, strict }) {
	let config = {
		areArrayBuffersEqual,
		areArraysEqual: strict ? areObjectsEqualStrict : areArraysEqual,
		areDataViewsEqual,
		areDatesEqual,
		areErrorsEqual,
		areFunctionsEqual,
		areMapsEqual: strict ? combineComparators(areMapsEqual, areObjectsEqualStrict) : areMapsEqual,
		areNumbersEqual,
		areObjectsEqual: strict ? areObjectsEqualStrict : areObjectsEqual,
		arePrimitiveWrappersEqual,
		areRegExpsEqual,
		areSetsEqual: strict ? combineComparators(areSetsEqual, areObjectsEqualStrict) : areSetsEqual,
		areTypedArraysEqual: strict ? combineComparators(areTypedArraysEqual, areObjectsEqualStrict) : areTypedArraysEqual,
		areUrlsEqual,
		unknownTagComparators: void 0
	};
	if (createCustomConfig) config = Object.assign({}, config, createCustomConfig(config));
	if (circular) {
		const areArraysEqual$1 = createIsCircular(config.areArraysEqual);
		const areMapsEqual$1 = createIsCircular(config.areMapsEqual);
		const areObjectsEqual$1 = createIsCircular(config.areObjectsEqual);
		const areSetsEqual$1 = createIsCircular(config.areSetsEqual);
		config = Object.assign({}, config, {
			areArraysEqual: areArraysEqual$1,
			areMapsEqual: areMapsEqual$1,
			areObjectsEqual: areObjectsEqual$1,
			areSetsEqual: areSetsEqual$1
		});
	}
	return config;
}
function createInternalEqualityComparator(compare) {
	return function(a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, state) {
		return compare(a, b, state);
	};
}
function createIsEqual({ circular, comparator, createState, equals, strict }) {
	if (createState) return function isEqual(a, b) {
		const { cache = circular ? /* @__PURE__ */ new WeakMap() : void 0, meta } = createState();
		return comparator(a, b, {
			cache,
			equals,
			meta,
			strict
		});
	};
	if (circular) return function isEqual(a, b) {
		return comparator(a, b, {
			cache: /* @__PURE__ */ new WeakMap(),
			equals,
			meta: void 0,
			strict
		});
	};
	const state = {
		cache: void 0,
		equals,
		meta: void 0,
		strict
	};
	return function isEqual(a, b) {
		return comparator(a, b, state);
	};
}
var deepEqual = createCustomEqual();
createCustomEqual({ strict: true });
createCustomEqual({ circular: true });
createCustomEqual({
	circular: true,
	strict: true
});
createCustomEqual({ createInternalComparator: () => sameValueZeroEqual });
createCustomEqual({
	strict: true,
	createInternalComparator: () => sameValueZeroEqual
});
createCustomEqual({
	circular: true,
	createInternalComparator: () => sameValueZeroEqual
});
createCustomEqual({
	circular: true,
	createInternalComparator: () => sameValueZeroEqual,
	strict: true
});
function createCustomEqual(options = {}) {
	const { circular = false, createInternalComparator: createCustomInternalComparator, createState, strict = false } = options;
	const comparator = createEqualityComparator(createEqualityComparatorConfig(options));
	return createIsEqual({
		circular,
		comparator,
		createState,
		equals: createCustomInternalComparator ? createCustomInternalComparator(comparator) : createInternalEqualityComparator(comparator),
		strict
	});
}
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_shim = require_shim();
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var import_shim$1 = require_shim();
var import_with_selector = require_with_selector();
var import_react_dom$1 = require_react_dom();
var mergeRefs = (...refs) => {
	return (node) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") ref(node);
			else if (ref) ref.current = node;
		});
	};
};
var Portals = ({ contentComponent }) => {
	const renderers = (0, import_shim.useSyncExternalStore)(contentComponent.subscribe, contentComponent.getSnapshot, contentComponent.getServerSnapshot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Object.values(renderers) });
};
function getInstance() {
	const subscribers = /* @__PURE__ */ new Set();
	let renderers = {};
	return {
		subscribe(callback) {
			subscribers.add(callback);
			return () => {
				subscribers.delete(callback);
			};
		},
		getSnapshot() {
			return renderers;
		},
		getServerSnapshot() {
			return renderers;
		},
		setRenderer(id, renderer) {
			renderers = {
				...renderers,
				[id]: import_react_dom.createPortal(renderer.reactElement, renderer.element, id)
			};
			subscribers.forEach((subscriber) => subscriber());
		},
		removeRenderer(id) {
			const nextRenderers = { ...renderers };
			delete nextRenderers[id];
			renderers = nextRenderers;
			subscribers.forEach((subscriber) => subscriber());
		}
	};
}
var PureEditorContent = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.editorContentRef = import_react.createRef();
	}
	componentDidMount() {
		this.init();
	}
	componentDidUpdate() {
		this.init();
	}
	init() {
		var _a;
		const editor = this.props.editor;
		if (editor && !editor.isDestroyed && ((_a = editor.view.dom) == null ? void 0 : _a.parentNode)) {
			if (editor.contentComponent) return;
			const element = this.editorContentRef.current;
			element.append(...editor.view.dom.parentNode.childNodes);
			editor.setOptions({ element });
			editor.contentComponent = getInstance();
			editor.createNodeViews();
			editor.isEditorContentInitialized = true;
			this.forceUpdate();
		}
	}
	componentWillUnmount() {
		var _a;
		const editor = this.props.editor;
		if (!editor) return;
		editor.isEditorContentInitialized = false;
		if (!editor.isDestroyed) editor.view.setProps({ nodeViews: {} });
		editor.contentComponent = null;
		try {
			if (!((_a = editor.view.dom) == null ? void 0 : _a.parentNode)) return;
			const newElement = document.createElement("div");
			newElement.append(...editor.view.dom.parentNode.childNodes);
			editor.setOptions({ element: newElement });
		} catch {}
	}
	render() {
		const { editor, innerRef, ...rest } = this.props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: mergeRefs(innerRef, this.editorContentRef),
			...rest
		}), (editor == null ? void 0 : editor.contentComponent) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portals, { contentComponent: editor.contentComponent })] });
	}
};
var EditorContentWithKey = (0, import_react.forwardRef)((props, ref) => {
	const key = import_react.useMemo(() => {
		return Math.floor(Math.random() * 4294967295).toString();
	}, [props.editor]);
	return import_react.createElement(PureEditorContent, {
		key,
		innerRef: ref,
		...props
	});
});
var EditorContent = import_react.memo(EditorContentWithKey);
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
var EditorStateManager = class {
	constructor(initialEditor) {
		this.transactionNumber = 0;
		this.lastTransactionNumber = 0;
		this.subscribers = /* @__PURE__ */ new Set();
		this.editor = initialEditor;
		this.lastSnapshot = {
			editor: initialEditor,
			transactionNumber: 0
		};
		this.getSnapshot = this.getSnapshot.bind(this);
		this.getServerSnapshot = this.getServerSnapshot.bind(this);
		this.watch = this.watch.bind(this);
		this.subscribe = this.subscribe.bind(this);
	}
	getSnapshot() {
		if (this.transactionNumber === this.lastTransactionNumber) return this.lastSnapshot;
		this.lastTransactionNumber = this.transactionNumber;
		this.lastSnapshot = {
			editor: this.editor,
			transactionNumber: this.transactionNumber
		};
		return this.lastSnapshot;
	}
	getServerSnapshot() {
		return {
			editor: null,
			transactionNumber: 0
		};
	}
	subscribe(callback) {
		this.subscribers.add(callback);
		return () => {
			this.subscribers.delete(callback);
		};
	}
	watch(nextEditor) {
		this.editor = nextEditor;
		if (this.editor) {
			const fn = () => {
				this.transactionNumber += 1;
				this.subscribers.forEach((callback) => callback());
			};
			const currentEditor = this.editor;
			currentEditor.on("transaction", fn);
			return () => {
				currentEditor.off("transaction", fn);
			};
		}
	}
};
function useEditorState(options) {
	var _a;
	const [editorStateManager] = (0, import_react.useState)(() => new EditorStateManager(options.editor));
	const selectedState = (0, import_with_selector.useSyncExternalStoreWithSelector)(editorStateManager.subscribe, editorStateManager.getSnapshot, editorStateManager.getServerSnapshot, options.selector, (_a = options.equalityFn) != null ? _a : deepEqual);
	useIsomorphicLayoutEffect(() => {
		return editorStateManager.watch(options.editor);
	}, [options.editor, editorStateManager]);
	(0, import_react.useDebugValue)(selectedState);
	return selectedState;
}
var isDev = false;
var isSSR = typeof window === "undefined";
var isNext = isSSR || Boolean(typeof window !== "undefined" && window.next);
var EditorInstanceManager = class _EditorInstanceManager {
	constructor(options) {
		this.editor = null;
		this.subscriptions = /* @__PURE__ */ new Set();
		this.isComponentMounted = false;
		this.previousDeps = null;
		this.instanceId = "";
		this.options = options;
		this.subscriptions = /* @__PURE__ */ new Set();
		this.setEditor(this.getInitialEditor());
		this.scheduleDestroy();
		this.getEditor = this.getEditor.bind(this);
		this.getServerSnapshot = this.getServerSnapshot.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.refreshEditorInstance = this.refreshEditorInstance.bind(this);
		this.scheduleDestroy = this.scheduleDestroy.bind(this);
		this.onRender = this.onRender.bind(this);
		this.createEditor = this.createEditor.bind(this);
	}
	setEditor(editor) {
		this.editor = editor;
		this.instanceId = Math.random().toString(36).slice(2, 9);
		this.subscriptions.forEach((cb) => cb());
	}
	getInitialEditor() {
		const explicit = this.options.current.immediatelyRender;
		let immediatelyRender = explicit != null ? explicit : true;
		if (isSSR) {
			if (immediatelyRender && isDev) console.warn("SSR detected. `immediatelyRender` has been set to false to avoid hydration mismatches");
			immediatelyRender = false;
		} else if (isNext && explicit === void 0) {
			immediatelyRender = false;
			if (isDev) console.warn("Next.js detected. `immediatelyRender` defaults to false to avoid hydration mismatches. Pass `immediatelyRender: true` explicitly if you are rendering the editor only on the client.");
		}
		return immediatelyRender ? this.createEditor() : null;
	}
	createEditor() {
		return new Editor({
			...this.options.current,
			onBeforeCreate: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onBeforeCreate) == null ? void 0 : _b.call(_a, ...args);
			},
			onBlur: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onBlur) == null ? void 0 : _b.call(_a, ...args);
			},
			onCreate: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onCreate) == null ? void 0 : _b.call(_a, ...args);
			},
			onDestroy: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onDestroy) == null ? void 0 : _b.call(_a, ...args);
			},
			onFocus: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onFocus) == null ? void 0 : _b.call(_a, ...args);
			},
			onSelectionUpdate: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onSelectionUpdate) == null ? void 0 : _b.call(_a, ...args);
			},
			onTransaction: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onTransaction) == null ? void 0 : _b.call(_a, ...args);
			},
			onUpdate: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onUpdate) == null ? void 0 : _b.call(_a, ...args);
			},
			onContentError: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onContentError) == null ? void 0 : _b.call(_a, ...args);
			},
			onDrop: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onDrop) == null ? void 0 : _b.call(_a, ...args);
			},
			onPaste: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onPaste) == null ? void 0 : _b.call(_a, ...args);
			},
			onDelete: (...args) => {
				var _a, _b;
				return (_b = (_a = this.options.current).onDelete) == null ? void 0 : _b.call(_a, ...args);
			}
		});
	}
	getEditor() {
		return this.editor;
	}
	getServerSnapshot() {
		return null;
	}
	subscribe(onStoreChange) {
		this.subscriptions.add(onStoreChange);
		return () => {
			this.subscriptions.delete(onStoreChange);
		};
	}
	static compareOptions(a, b) {
		return Object.keys(a).every((key) => {
			if ([
				"onCreate",
				"onBeforeCreate",
				"onDestroy",
				"onUpdate",
				"onTransaction",
				"onFocus",
				"onBlur",
				"onSelectionUpdate",
				"onContentError",
				"onDrop",
				"onPaste"
			].includes(key)) return true;
			if (key === "extensions" && a.extensions && b.extensions) {
				if (a.extensions.length !== b.extensions.length) return false;
				return a.extensions.every((extension, index) => {
					var _a;
					if (extension !== ((_a = b.extensions) == null ? void 0 : _a[index])) return false;
					return true;
				});
			}
			if (a[key] !== b[key]) return false;
			return true;
		});
	}
	onRender(deps) {
		return () => {
			this.isComponentMounted = true;
			clearTimeout(this.scheduledDestructionTimeout);
			if (this.editor && !this.editor.isDestroyed && deps.length === 0) {
				if (!_EditorInstanceManager.compareOptions(this.options.current, this.editor.options)) this.editor.setOptions({
					...this.options.current,
					editable: this.editor.isEditable
				});
			} else this.refreshEditorInstance(deps);
			return () => {
				this.isComponentMounted = false;
				this.scheduleDestroy();
			};
		};
	}
	refreshEditorInstance(deps) {
		if (this.editor && !this.editor.isDestroyed) {
			if (this.previousDeps === null) {
				this.previousDeps = deps;
				return;
			}
			if (this.previousDeps.length === deps.length && this.previousDeps.every((dep, index) => dep === deps[index])) return;
		}
		if (this.editor && !this.editor.isDestroyed) this.editor.destroy();
		this.setEditor(this.createEditor());
		this.previousDeps = deps;
	}
	scheduleDestroy() {
		const currentInstanceId = this.instanceId;
		const currentEditor = this.editor;
		this.scheduledDestructionTimeout = setTimeout(() => {
			if (this.isComponentMounted && this.instanceId === currentInstanceId) {
				if (currentEditor) currentEditor.setOptions(this.options.current);
				return;
			}
			if (currentEditor && !currentEditor.isDestroyed) {
				currentEditor.destroy();
				if (this.instanceId === currentInstanceId) this.setEditor(null);
			}
		}, 1);
	}
};
function useEditor(options = {}, deps = []) {
	const mostRecentOptions = (0, import_react.useRef)(options);
	mostRecentOptions.current = options;
	const [instanceManager] = (0, import_react.useState)(() => new EditorInstanceManager(mostRecentOptions));
	const editor = (0, import_shim$1.useSyncExternalStore)(instanceManager.subscribe, instanceManager.getEditor, instanceManager.getServerSnapshot);
	(0, import_react.useDebugValue)(editor);
	(0, import_react.useEffect)(instanceManager.onRender(deps));
	useEditorState({
		editor,
		selector: ({ transactionNumber }) => {
			if (options.shouldRerenderOnTransaction === false || options.shouldRerenderOnTransaction === void 0) return null;
			if (options.immediatelyRender && transactionNumber === 0) return 0;
			return transactionNumber + 1;
		}
	});
	return editor;
}
var EditorContext = (0, import_react.createContext)({ editor: null });
EditorContext.Consumer;
var ReactNodeViewContext = (0, import_react.createContext)({
	onDragStart: () => {},
	nodeViewContentChildren: void 0,
	nodeViewContentRef: () => {}
});
var useReactNodeView = () => (0, import_react.useContext)(ReactNodeViewContext);
function NodeViewContent({ as: Tag = "div", ...props }) {
	const { nodeViewContentRef, nodeViewContentChildren } = useReactNodeView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		...props,
		ref: nodeViewContentRef,
		"data-node-view-content": "",
		style: {
			whiteSpace: "pre-wrap",
			...props.style
		},
		children: nodeViewContentChildren
	});
}
var NodeViewWrapper = import_react.forwardRef((props, ref) => {
	const { onDragStart } = useReactNodeView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(props.as || "div", {
		...props,
		ref,
		"data-node-view-wrapper": "",
		onDragStart,
		style: {
			whiteSpace: "normal",
			...props.style
		}
	});
});
function isClassComponent(Component) {
	return !!(typeof Component === "function" && Component.prototype && Component.prototype.isReactComponent);
}
function isForwardRefComponent(Component) {
	return !!(typeof Component === "object" && Component.$$typeof && (Component.$$typeof.toString() === "Symbol(react.forward_ref)" || Component.$$typeof.description === "react.forward_ref"));
}
function isMemoComponent(Component) {
	return !!(typeof Component === "object" && Component.$$typeof && (Component.$$typeof.toString() === "Symbol(react.memo)" || Component.$$typeof.description === "react.memo"));
}
function canReceiveRef(Component) {
	if (isClassComponent(Component)) return true;
	if (isForwardRefComponent(Component)) return true;
	if (isMemoComponent(Component)) {
		const wrappedComponent = Component.type;
		if (wrappedComponent) return isClassComponent(wrappedComponent) || isForwardRefComponent(wrappedComponent);
	}
	return false;
}
function isReact19Plus() {
	try {
		if (import_react.version) return parseInt(import_react.version.split(".")[0], 10) >= 19;
	} catch {}
	return false;
}
var ReactRenderer = class {
	constructor(component, { editor, props = {}, as = "div", className = "" }) {
		this.ref = null;
		this.destroyed = false;
		this.id = Math.floor(Math.random() * 4294967295).toString();
		this.component = component;
		this.editor = editor;
		this.props = props;
		this.element = document.createElement(as);
		this.element.classList.add("react-renderer");
		if (className) this.element.classList.add(...className.split(" "));
		if (this.editor.isEditorContentInitialized) (0, import_react_dom$1.flushSync)(() => {
			this.render();
		});
		else queueMicrotask(() => {
			if (this.destroyed) return;
			this.render();
		});
	}
	render() {
		var _a;
		if (this.destroyed) return;
		const Component = this.component;
		const props = this.props;
		const editor = this.editor;
		const isReact19 = isReact19Plus();
		const componentCanReceiveRef = canReceiveRef(Component);
		const elementProps = { ...props };
		if (elementProps.ref && !(isReact19 || componentCanReceiveRef)) delete elementProps.ref;
		if (!elementProps.ref && (isReact19 || componentCanReceiveRef)) elementProps.ref = (ref) => {
			this.ref = ref;
		};
		this.reactElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...elementProps });
		(_a = editor == null ? void 0 : editor.contentComponent) == null || _a.setRenderer(this.id, this);
	}
	updateProps(props = {}) {
		if (this.destroyed) return;
		let changed = false;
		const keys$1 = Object.keys(props);
		for (let i = 0; i < keys$1.length; i += 1) {
			const key = keys$1[i];
			if (props[key] !== this.props[key]) {
				changed = true;
				break;
			}
		}
		if (!changed) return;
		this.props = {
			...this.props,
			...props
		};
		this.render();
	}
	destroy() {
		var _a;
		this.destroyed = true;
		const editor = this.editor;
		(_a = editor == null ? void 0 : editor.contentComponent) == null || _a.removeRenderer(this.id);
		try {
			if (this.element && this.element.parentNode) this.element.parentNode.removeChild(this.element);
		} catch {}
	}
	updateAttributes(attributes) {
		Object.keys(attributes).forEach((key) => {
			this.element.setAttribute(key, attributes[key]);
		});
	}
};
import_react.createContext({ markViewContentRef: () => {} });
var ReactNodeView = class extends NodeView {
	constructor(component, props, options) {
		super(component, props, options);
		this.selectionRafId = null;
		this.handlePositionUpdate = () => {
			const newPos = this.getPos();
			if (typeof newPos !== "number" || newPos === this.currentPos) return;
			this.currentPos = newPos;
			this.renderer.updateProps({ getPos: () => this.getPos() });
			if (typeof this.options.attrs === "function") this.updateElementAttributes();
		};
		this.cachedExtensionWithSyncedStorage = null;
		if (!this.node.isLeaf) {
			if (this.options.contentDOMElementTag) this.contentDOMElement = document.createElement(this.options.contentDOMElementTag);
			else this.contentDOMElement = document.createElement(this.node.isInline ? "span" : "div");
			this.contentDOMElement.dataset.nodeViewContentReact = "";
			this.contentDOMElement.dataset.nodeViewWrapper = "";
			this.contentDOMElement.style.whiteSpace = "inherit";
			const contentTarget = this.dom.querySelector("[data-node-view-content]");
			if (!contentTarget) return;
			contentTarget.appendChild(this.contentDOMElement);
		}
		if (this.options.trackNodeViewPosition) this.editor.on("update", this.handlePositionUpdate);
	}
	get extensionWithSyncedStorage() {
		if (!this.cachedExtensionWithSyncedStorage) {
			const editor = this.editor;
			const extension = this.extension;
			this.cachedExtensionWithSyncedStorage = new Proxy(extension, { get(target, prop, receiver) {
				var _a;
				if (prop === "storage") return (_a = editor.storage[extension.name]) != null ? _a : {};
				return Reflect.get(target, prop, receiver);
			} });
		}
		return this.cachedExtensionWithSyncedStorage;
	}
	mount() {
		const mountProps = {
			editor: this.editor,
			node: this.node,
			decorations: this.decorations,
			innerDecorations: this.innerDecorations,
			view: this.view,
			selected: false,
			extension: this.extensionWithSyncedStorage,
			HTMLAttributes: this.HTMLAttributes,
			getPos: () => this.getPos(),
			updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
			deleteNode: () => this.deleteNode(),
			ref: (0, import_react.createRef)()
		};
		if (!this.component.displayName) {
			const capitalizeFirstChar = (string) => {
				return string.charAt(0).toUpperCase() + string.substring(1);
			};
			this.component.displayName = capitalizeFirstChar(this.extension.name);
		}
		const onDragStart = this.onDragStart.bind(this);
		const nodeViewContentRef = (element) => {
			if (element && this.contentDOMElement && element.firstChild !== this.contentDOMElement) {
				if (element.hasAttribute("data-node-view-wrapper")) element.removeAttribute("data-node-view-wrapper");
				element.appendChild(this.contentDOMElement);
			}
		};
		const context = {
			onDragStart,
			nodeViewContentRef
		};
		const Component = this.component;
		const ReactNodeViewProvider = (0, import_react.memo)((componentProps) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactNodeViewContext.Provider, {
				value: context,
				children: (0, import_react.createElement)(Component, componentProps)
			});
		});
		ReactNodeViewProvider.displayName = "ReactNodeView";
		let as = this.node.isInline ? "span" : "div";
		if (this.options.as) as = this.options.as;
		const { className = "" } = this.options;
		this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
		this.renderer = new ReactRenderer(ReactNodeViewProvider, {
			editor: this.editor,
			props: mountProps,
			as,
			className: `node-${this.node.type.name} ${className}`.trim()
		});
		this.editor.on("selectionUpdate", this.handleSelectionUpdate);
		this.updateElementAttributes();
		this.currentPos = this.getPos();
	}
	get dom() {
		var _a;
		if (this.renderer.element.firstElementChild && !((_a = this.renderer.element.firstElementChild) == null ? void 0 : _a.hasAttribute("data-node-view-wrapper"))) throw Error("Please use the NodeViewWrapper component for your node view.");
		return this.renderer.element;
	}
	get contentDOM() {
		if (this.node.isLeaf) return null;
		return this.contentDOMElement;
	}
	handleSelectionUpdate() {
		if (this.selectionRafId) {
			cancelAnimationFrame(this.selectionRafId);
			this.selectionRafId = null;
		}
		this.selectionRafId = requestAnimationFrame(() => {
			this.selectionRafId = null;
			const pos = this.currentPos;
			if (typeof pos !== "number") return;
			if (isNodeViewSelected({
				selection: this.editor.state.selection,
				pos,
				nodeSize: this.node.nodeSize,
				selectedOnTextSelection: this.options.selectedOnTextSelection
			})) {
				if (this.renderer.props.selected) return;
				this.selectNode();
			} else {
				if (!this.renderer.props.selected) return;
				this.deselectNode();
			}
		});
	}
	update(node, decorations, innerDecorations) {
		const rerenderComponent = (props) => {
			this.renderer.updateProps(props);
			if (typeof this.options.attrs === "function") this.updateElementAttributes();
		};
		if (node.type !== this.node.type) return false;
		if (typeof this.options.update === "function") {
			const oldNode = this.node;
			const oldDecorations = this.decorations;
			const oldInnerDecorations = this.innerDecorations;
			this.node = node;
			this.decorations = decorations;
			this.innerDecorations = innerDecorations;
			this.currentPos = this.getPos();
			return this.options.update({
				oldNode,
				oldDecorations,
				newNode: node,
				newDecorations: decorations,
				oldInnerDecorations,
				innerDecorations,
				updateProps: () => rerenderComponent({
					node,
					decorations,
					innerDecorations,
					extension: this.extensionWithSyncedStorage
				})
			});
		}
		if (!(node !== this.node)) {
			this.node = node;
			this.decorations = decorations;
			this.innerDecorations = innerDecorations;
			return true;
		}
		const newPos = this.getPos();
		this.node = node;
		this.decorations = decorations;
		this.innerDecorations = innerDecorations;
		this.currentPos = newPos;
		const extraProps = {
			node,
			decorations,
			innerDecorations,
			extension: this.extensionWithSyncedStorage
		};
		if (this.options.trackNodeViewPosition) extraProps.getPos = () => this.getPos();
		rerenderComponent(extraProps);
		return true;
	}
	selectNode() {
		this.renderer.updateProps({ selected: true });
		this.renderer.element.classList.add("ProseMirror-selectednode");
	}
	deselectNode() {
		this.renderer.updateProps({ selected: false });
		this.renderer.element.classList.remove("ProseMirror-selectednode");
	}
	destroy() {
		this.renderer.destroy();
		this.editor.off("selectionUpdate", this.handleSelectionUpdate);
		if (this.options.trackNodeViewPosition) this.editor.off("update", this.handlePositionUpdate);
		this.contentDOMElement = null;
		if (this.selectionRafId) {
			cancelAnimationFrame(this.selectionRafId);
			this.selectionRafId = null;
		}
	}
	updateElementAttributes() {
		if (this.options.attrs) {
			let attrsObj = {};
			if (typeof this.options.attrs === "function") {
				const extensionAttributes = this.editor.extensionManager.attributes;
				const HTMLAttributes = getRenderedAttributes(this.node, extensionAttributes);
				attrsObj = this.options.attrs({
					node: this.node,
					HTMLAttributes
				});
			} else attrsObj = this.options.attrs;
			this.renderer.updateAttributes(attrsObj);
		}
	}
};
function ReactNodeViewRenderer(component, options) {
	return (props) => {
		if (!props.editor.contentComponent) return {};
		return new ReactNodeView(component, props, options);
	};
}
var TiptapContext = (0, import_react.createContext)({ get editor() {
	throw new Error("useTiptap must be used within a <Tiptap> provider");
} });
TiptapContext.displayName = "TiptapContext";
var useTiptap = () => (0, import_react.useContext)(TiptapContext);
function TiptapWrapper({ editor, instance, children }) {
	const resolvedEditor = editor != null ? editor : instance;
	if (!resolvedEditor) throw new Error("Tiptap: An editor instance is required. Pass a non-null `editor` prop.");
	const tiptapContextValue = (0, import_react.useMemo)(() => ({ editor: resolvedEditor }), [resolvedEditor]);
	const legacyContextValue = (0, import_react.useMemo)(() => ({ editor: resolvedEditor }), [resolvedEditor]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorContext.Provider, {
		value: legacyContextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiptapContext.Provider, {
			value: tiptapContextValue,
			children
		})
	});
}
TiptapWrapper.displayName = "Tiptap";
function TiptapContent({ ...rest }) {
	const { editor } = useTiptap();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorContent, {
		editor,
		...rest
	});
}
TiptapContent.displayName = "Tiptap.Content";
Object.assign(TiptapWrapper, { Content: TiptapContent });
export { ReactRenderer as a, ReactNodeViewRenderer as i, NodeViewContent as n, useEditor as o, NodeViewWrapper as r, useEditorState as s, EditorContent as t };
