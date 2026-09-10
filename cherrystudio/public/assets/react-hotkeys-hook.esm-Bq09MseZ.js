import { c as __toESM } from "./rolldown-runtime-D8OvLAZx.js";
import { t as require_react } from "./react-C1DTAr29.js";
import { t as require_jsx_runtime } from "./jsx-runtime-Cc0-uZGc.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
require_jsx_runtime();
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
var reservedModifierKeywords = [
	"shift",
	"alt",
	"meta",
	"mod",
	"ctrl"
];
var mappedKeys = {
	esc: "escape",
	"return": "enter",
	".": "period",
	",": "comma",
	"-": "slash",
	" ": "space",
	"`": "backquote",
	"#": "backslash",
	"+": "bracketright",
	ShiftLeft: "shift",
	ShiftRight: "shift",
	AltLeft: "alt",
	AltRight: "alt",
	MetaLeft: "meta",
	MetaRight: "meta",
	OSLeft: "meta",
	OSRight: "meta",
	ControlLeft: "ctrl",
	ControlRight: "ctrl"
};
function mapKey(key) {
	return (key && mappedKeys[key] || key || "").trim().toLowerCase().replace(/key|digit|numpad|arrow/, "");
}
function isHotkeyModifier(key) {
	return reservedModifierKeywords.includes(key);
}
function parseKeysHookInput(keys, splitKey) {
	if (splitKey === void 0) splitKey = ",";
	return keys.split(splitKey);
}
function parseHotkey(hotkey, combinationKey, description) {
	if (combinationKey === void 0) combinationKey = "+";
	var keys = hotkey.toLocaleLowerCase().split(combinationKey).map(function(k) {
		return mapKey(k);
	});
	var modifiers = {
		alt: keys.includes("alt"),
		ctrl: keys.includes("ctrl") || keys.includes("control"),
		shift: keys.includes("shift"),
		meta: keys.includes("meta"),
		mod: keys.includes("mod")
	};
	var singleCharKeys = keys.filter(function(k) {
		return !reservedModifierKeywords.includes(k);
	});
	return _extends({}, modifiers, {
		keys: singleCharKeys,
		description,
		hotkey
	});
}
(function() {
	if (typeof document !== "undefined") {
		document.addEventListener("keydown", function(e) {
			if (e.key === void 0) return;
			pushToCurrentlyPressedKeys([mapKey(e.key), mapKey(e.code)]);
		});
		document.addEventListener("keyup", function(e) {
			if (e.key === void 0) return;
			removeFromCurrentlyPressedKeys([mapKey(e.key), mapKey(e.code)]);
		});
	}
	if (typeof window !== "undefined") window.addEventListener("blur", function() {
		currentlyPressedKeys.clear();
	});
})();
var currentlyPressedKeys = /* @__PURE__ */ new Set();
function isReadonlyArray(value) {
	return Array.isArray(value);
}
function isHotkeyPressed(key, splitKey) {
	if (splitKey === void 0) splitKey = ",";
	return (isReadonlyArray(key) ? key : key.split(splitKey)).every(function(hotkey) {
		return currentlyPressedKeys.has(hotkey.trim().toLowerCase());
	});
}
function pushToCurrentlyPressedKeys(key) {
	var hotkeyArray = Array.isArray(key) ? key : [key];
	if (currentlyPressedKeys.has("meta")) currentlyPressedKeys.forEach(function(key$1) {
		return !isHotkeyModifier(key$1) && currentlyPressedKeys["delete"](key$1.toLowerCase());
	});
	hotkeyArray.forEach(function(hotkey) {
		return currentlyPressedKeys.add(hotkey.toLowerCase());
	});
}
function removeFromCurrentlyPressedKeys(key) {
	var hotkeyArray = Array.isArray(key) ? key : [key];
	if (key === "meta") currentlyPressedKeys.clear();
	else hotkeyArray.forEach(function(hotkey) {
		return currentlyPressedKeys["delete"](hotkey.toLowerCase());
	});
}
function maybePreventDefault(e, hotkey, preventDefault) {
	if (typeof preventDefault === "function" && preventDefault(e, hotkey) || preventDefault === true) e.preventDefault();
}
function isHotkeyEnabled(e, hotkey, enabled) {
	if (typeof enabled === "function") return enabled(e, hotkey);
	return enabled === true || enabled === void 0;
}
function isKeyboardEventTriggeredByInput(ev) {
	return isHotkeyEnabledOnTag(ev, [
		"input",
		"textarea",
		"select"
	]);
}
function isHotkeyEnabledOnTag(event, enabledOnTags) {
	if (enabledOnTags === void 0) enabledOnTags = false;
	var target = event.target, composed = event.composed;
	var targetTagName = null;
	if (isCustomElement(target) && composed) targetTagName = event.composedPath()[0] && event.composedPath()[0].tagName;
	else targetTagName = target && target.tagName;
	if (isReadonlyArray(enabledOnTags)) return Boolean(targetTagName && enabledOnTags && enabledOnTags.some(function(tag) {
		var _targetTagName;
		return tag.toLowerCase() === ((_targetTagName = targetTagName) == null ? void 0 : _targetTagName.toLowerCase());
	}));
	return Boolean(targetTagName && enabledOnTags && enabledOnTags);
}
function isCustomElement(element) {
	return !!element.tagName && !element.tagName.startsWith("-") && element.tagName.includes("-");
}
function isScopeActive(activeScopes, scopes) {
	if (activeScopes.length === 0 && scopes) {
		console.warn("A hotkey has the \"scopes\" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>");
		return true;
	}
	if (!scopes) return true;
	return activeScopes.some(function(scope) {
		return scopes.includes(scope);
	}) || activeScopes.includes("*");
}
var isHotkeyMatchingKeyboardEvent = function isHotkeyMatchingKeyboardEvent$1(e, hotkey, ignoreModifiers) {
	if (ignoreModifiers === void 0) ignoreModifiers = false;
	var alt = hotkey.alt, meta = hotkey.meta, mod = hotkey.mod, shift = hotkey.shift, ctrl = hotkey.ctrl, keys = hotkey.keys;
	var pressedKeyUppercase = e.key, code = e.code, ctrlKey = e.ctrlKey, metaKey = e.metaKey, shiftKey = e.shiftKey, altKey = e.altKey;
	var keyCode = mapKey(code);
	var pressedKey = pressedKeyUppercase.toLowerCase();
	if (!(keys != null && keys.includes(keyCode)) && !(keys != null && keys.includes(pressedKey)) && ![
		"ctrl",
		"control",
		"unknown",
		"meta",
		"alt",
		"shift",
		"os"
	].includes(keyCode)) return false;
	if (!ignoreModifiers) {
		if (alt === !altKey && pressedKey !== "alt") return false;
		if (shift === !shiftKey && pressedKey !== "shift") return false;
		if (mod) {
			if (!metaKey && !ctrlKey) return false;
		} else {
			if (meta === !metaKey && pressedKey !== "meta" && pressedKey !== "os") return false;
			if (ctrl === !ctrlKey && pressedKey !== "ctrl" && pressedKey !== "control") return false;
		}
	}
	if (keys && keys.length === 1 && (keys.includes(pressedKey) || keys.includes(keyCode))) return true;
	else if (keys) return isHotkeyPressed(keys);
	else if (!keys) return true;
	return false;
};
var BoundHotkeysProxyProvider = /* @__PURE__ */ (0, import_react.createContext)(void 0);
var useBoundHotkeysProxy = function useBoundHotkeysProxy$1() {
	return (0, import_react.useContext)(BoundHotkeysProxyProvider);
};
function deepEqual(x, y) {
	return x && y && typeof x === "object" && typeof y === "object" ? Object.keys(x).length === Object.keys(y).length && Object.keys(x).reduce(function(isEqual, key) {
		return isEqual && deepEqual(x[key], y[key]);
	}, true) : x === y;
}
var HotkeysContext = /* @__PURE__ */ (0, import_react.createContext)({
	hotkeys: [],
	enabledScopes: [],
	toggleScope: function toggleScope() {},
	enableScope: function enableScope() {},
	disableScope: function disableScope() {}
});
var useHotkeysContext = function useHotkeysContext$1() {
	return (0, import_react.useContext)(HotkeysContext);
};
function useDeepEqualMemo(value) {
	var ref = (0, import_react.useRef)(void 0);
	if (!deepEqual(ref.current, value)) ref.current = value;
	return ref.current;
}
var stopPropagation = function stopPropagation$1(e) {
	e.stopPropagation();
	e.preventDefault();
	e.stopImmediatePropagation();
};
var useSafeLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useHotkeys(keys, callback, options, dependencies) {
	var _useState = (0, import_react.useState)(null), ref = _useState[0], setRef = _useState[1];
	var hasTriggeredRef = (0, import_react.useRef)(false);
	var _options = !(options instanceof Array) ? options : !(dependencies instanceof Array) ? dependencies : void 0;
	var _keys = isReadonlyArray(keys) ? keys.join(_options == null ? void 0 : _options.splitKey) : keys;
	var _deps = options instanceof Array ? options : dependencies instanceof Array ? dependencies : void 0;
	var memoisedCB = (0, import_react.useCallback)(callback, _deps != null ? _deps : []);
	var cbRef = (0, import_react.useRef)(memoisedCB);
	if (_deps) cbRef.current = memoisedCB;
	else cbRef.current = callback;
	var memoisedOptions = useDeepEqualMemo(_options);
	var enabledScopes = useHotkeysContext().enabledScopes;
	var proxy = useBoundHotkeysProxy();
	useSafeLayoutEffect(function() {
		if ((memoisedOptions == null ? void 0 : memoisedOptions.enabled) === false || !isScopeActive(enabledScopes, memoisedOptions == null ? void 0 : memoisedOptions.scopes)) return;
		var listener = function listener$1(e, isKeyUp) {
			var _e$target;
			if (isKeyUp === void 0) isKeyUp = false;
			if (isKeyboardEventTriggeredByInput(e) && !isHotkeyEnabledOnTag(e, memoisedOptions == null ? void 0 : memoisedOptions.enableOnFormTags)) return;
			if (ref !== null) {
				var rootNode = ref.getRootNode();
				if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement !== ref && !ref.contains(rootNode.activeElement)) {
					stopPropagation(e);
					return;
				}
			}
			if ((_e$target = e.target) != null && _e$target.isContentEditable && !(memoisedOptions != null && memoisedOptions.enableOnContentEditable)) return;
			parseKeysHookInput(_keys, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
				var _hotkey$keys;
				var hotkey = parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey);
				if (isHotkeyMatchingKeyboardEvent(e, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.ignoreModifiers) || (_hotkey$keys = hotkey.keys) != null && _hotkey$keys.includes("*")) {
					if (memoisedOptions != null && memoisedOptions.ignoreEventWhen != null && memoisedOptions.ignoreEventWhen(e)) return;
					if (isKeyUp && hasTriggeredRef.current) return;
					maybePreventDefault(e, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.preventDefault);
					if (!isHotkeyEnabled(e, hotkey, memoisedOptions == null ? void 0 : memoisedOptions.enabled)) {
						stopPropagation(e);
						return;
					}
					cbRef.current(e, hotkey);
					if (!isKeyUp) hasTriggeredRef.current = true;
				}
			});
		};
		var handleKeyDown = function handleKeyDown$1(event) {
			if (event.key === void 0) return;
			pushToCurrentlyPressedKeys(mapKey(event.code));
			if ((memoisedOptions == null ? void 0 : memoisedOptions.keydown) === void 0 && (memoisedOptions == null ? void 0 : memoisedOptions.keyup) !== true || memoisedOptions != null && memoisedOptions.keydown) listener(event);
		};
		var handleKeyUp = function handleKeyUp$1(event) {
			if (event.key === void 0) return;
			removeFromCurrentlyPressedKeys(mapKey(event.code));
			hasTriggeredRef.current = false;
			if (memoisedOptions != null && memoisedOptions.keyup) listener(event, true);
		};
		var domNode = ref || (_options == null ? void 0 : _options.document) || document;
		domNode.addEventListener("keyup", handleKeyUp, _options == null ? void 0 : _options.eventListenerOptions);
		domNode.addEventListener("keydown", handleKeyDown, _options == null ? void 0 : _options.eventListenerOptions);
		if (proxy) parseKeysHookInput(_keys, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
			return proxy.addHotkey(parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey, memoisedOptions == null ? void 0 : memoisedOptions.description));
		});
		return function() {
			domNode.removeEventListener("keyup", handleKeyUp, _options == null ? void 0 : _options.eventListenerOptions);
			domNode.removeEventListener("keydown", handleKeyDown, _options == null ? void 0 : _options.eventListenerOptions);
			if (proxy) parseKeysHookInput(_keys, memoisedOptions == null ? void 0 : memoisedOptions.splitKey).forEach(function(key) {
				return proxy.removeHotkey(parseHotkey(key, memoisedOptions == null ? void 0 : memoisedOptions.combinationKey, memoisedOptions == null ? void 0 : memoisedOptions.description));
			});
		};
	}, [
		ref,
		_keys,
		memoisedOptions,
		enabledScopes
	]);
	return setRef;
}
export { useHotkeys as t };
