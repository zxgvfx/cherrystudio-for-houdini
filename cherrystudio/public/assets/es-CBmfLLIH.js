import { n as __esmMin, o as __toESM, r as __export } from "./chunk-0ogMdkZ1.js";
import { $a as getDOM, An as es_default$7, Bn as init_es$4, Ca as init_es$6, Ci as init_useEvent, Dr as init_getScrollBarSize, Er as getTargetScrollBarSize, Ga as init_ref, In as MenuItem_default, Ja as useComposeRef, Jr as KeyCode_default, Mn as init_es$5, Qi as useLayoutUpdateEffect, Ri as get, Rn as es_default$6, Rr as init_isVisible, Tr as getScrollBarSize, Ua as fillRef, Xa as useMemo$1, Xi as init_useLayoutEffect, Xr as init_pickAttrs, Ya as init_useMemo, Yr as init_KeyCode, Zi as useLayoutEffect_default, Zr as pickAttrs, _a as _toConsumableArray, _n as init_addEventListener, aa as _objectWithoutProperties, ao as init_defineProperty, ar as init_isMobile, bi as useMergedState, ci as es_default$5, da as canUseDom, do as _typeof, eo as init_findDOMNode, fa as init_canUseDom, fo as init_typeof, ga as raf_default, gn as addEventListenerWrap, ha as init_raf, ho as require_classnames, ia as isEqual_default, io as _defineProperty, lo as init_toArray, ma as init_slicedToArray, mo as init_extends, no as _objectSpread2, oa as init_objectWithoutProperties, oo as init_warning, or as isMobile_default, pa as _slicedToArray, po as _extends, qa as supportRef, ra as init_isEqual, ro as init_objectSpread2, to as require_react_dom, ui as init_es$7, uo as toArray, va as init_toConsumableArray, vi as init_es$8, wi as useEvent, xa as es_default$2, yi as init_useMergedState, zi as init_get, zr as isVisible_default } from "./es-BDLhINRJ.js";
import { t as require_react } from "./react-1FqkuScD.js";
import { Ct as es_default$1, Dt as init_styleChecker, Ot as isStyleSupport, wt as init_es$9 } from "./Component-B_GKOkwQ.js";
var import_react$57, TabContext_default;
var init_TabContext = __esmMin((() => {
	import_react$57 = /* @__PURE__ */ __toESM(require_react());
	TabContext_default = /* @__PURE__ */ (0, import_react$57.createContext)(null);
}));
var import_react$56, useIndicator, useIndicator_default;
var init_useIndicator = __esmMin((() => {
	init_slicedToArray();
	init_raf();
	import_react$56 = /* @__PURE__ */ __toESM(require_react());
	useIndicator = function useIndicator$1(options) {
		var activeTabOffset = options.activeTabOffset, horizontal = options.horizontal, rtl = options.rtl, _options$indicator = options.indicator, indicator = _options$indicator === void 0 ? {} : _options$indicator;
		var size = indicator.size, _indicator$align = indicator.align, align = _indicator$align === void 0 ? "center" : _indicator$align;
		var _useState2 = _slicedToArray((0, import_react$56.useState)(), 2), inkStyle = _useState2[0], setInkStyle = _useState2[1];
		var inkBarRafRef = (0, import_react$56.useRef)();
		var getLength = import_react$56.useCallback(function(origin) {
			if (typeof size === "function") return size(origin);
			if (typeof size === "number") return size;
			return origin;
		}, [size]);
		function cleanInkBarRaf() {
			raf_default.cancel(inkBarRafRef.current);
		}
		(0, import_react$56.useEffect)(function() {
			var newInkStyle = {};
			if (activeTabOffset) if (horizontal) {
				newInkStyle.width = getLength(activeTabOffset.width);
				var key = rtl ? "right" : "left";
				if (align === "start") newInkStyle[key] = activeTabOffset[key];
				if (align === "center") {
					newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width / 2;
					newInkStyle.transform = rtl ? "translateX(50%)" : "translateX(-50%)";
				}
				if (align === "end") {
					newInkStyle[key] = activeTabOffset[key] + activeTabOffset.width;
					newInkStyle.transform = "translateX(-100%)";
				}
			} else {
				newInkStyle.height = getLength(activeTabOffset.height);
				if (align === "start") newInkStyle.top = activeTabOffset.top;
				if (align === "center") {
					newInkStyle.top = activeTabOffset.top + activeTabOffset.height / 2;
					newInkStyle.transform = "translateY(-50%)";
				}
				if (align === "end") {
					newInkStyle.top = activeTabOffset.top + activeTabOffset.height;
					newInkStyle.transform = "translateY(-100%)";
				}
			}
			cleanInkBarRaf();
			inkBarRafRef.current = raf_default(function() {
				if (!(inkStyle && newInkStyle && Object.keys(newInkStyle).every(function(key$1) {
					var newValue = newInkStyle[key$1];
					var oldValue = inkStyle[key$1];
					return typeof newValue === "number" && typeof oldValue === "number" ? Math.round(newValue) === Math.round(oldValue) : newValue === oldValue;
				}))) setInkStyle(newInkStyle);
			});
			return cleanInkBarRaf;
		}, [
			JSON.stringify(activeTabOffset),
			horizontal,
			rtl,
			align,
			getLength
		]);
		return { style: inkStyle };
	};
	useIndicator_default = useIndicator;
}));
function useOffsets(tabs, tabSizes, holderScrollWidth) {
	return (0, import_react$55.useMemo)(function() {
		var _tabs$;
		var map = /* @__PURE__ */ new Map();
		var lastOffset = tabSizes.get((_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key) || DEFAULT_SIZE$1;
		var rightOffset = lastOffset.left + lastOffset.width;
		for (var i = 0; i < tabs.length; i += 1) {
			var key = tabs[i].key;
			var data = tabSizes.get(key);
			if (!data) {
				var _tabs;
				data = tabSizes.get((_tabs = tabs[i - 1]) === null || _tabs === void 0 ? void 0 : _tabs.key) || DEFAULT_SIZE$1;
			}
			var entity = map.get(key) || _objectSpread2({}, data);
			entity.right = rightOffset - entity.left - entity.width;
			map.set(key, entity);
		}
		return map;
	}, [
		tabs.map(function(tab) {
			return tab.key;
		}).join("_"),
		tabSizes,
		holderScrollWidth
	]);
}
var import_react$55, DEFAULT_SIZE$1;
var init_useOffsets = __esmMin((() => {
	init_objectSpread2();
	import_react$55 = /* @__PURE__ */ __toESM(require_react());
	DEFAULT_SIZE$1 = {
		width: 0,
		height: 0,
		left: 0,
		top: 0
	};
}));
function useSyncState(defaultState, onChange) {
	var stateRef = import_react$54.useRef(defaultState);
	var forceUpdate = _slicedToArray(import_react$54.useState({}), 2)[1];
	function setState(updater) {
		var newValue = typeof updater === "function" ? updater(stateRef.current) : updater;
		if (newValue !== stateRef.current) onChange(newValue, stateRef.current);
		stateRef.current = newValue;
		forceUpdate({});
	}
	return [stateRef.current, setState];
}
var import_react$54;
var init_useSyncState = __esmMin((() => {
	init_slicedToArray();
	import_react$54 = /* @__PURE__ */ __toESM(require_react());
}));
function useTouchMove(ref, onOffset) {
	var _useState2 = _slicedToArray((0, import_react$53.useState)(), 2), touchPosition = _useState2[0], setTouchPosition = _useState2[1];
	var _useState4 = _slicedToArray((0, import_react$53.useState)(0), 2), lastTimestamp = _useState4[0], setLastTimestamp = _useState4[1];
	var _useState6 = _slicedToArray((0, import_react$53.useState)(0), 2), lastTimeDiff = _useState6[0], setLastTimeDiff = _useState6[1];
	var _useState8 = _slicedToArray((0, import_react$53.useState)(), 2), lastOffset = _useState8[0], setLastOffset = _useState8[1];
	var motionRef = (0, import_react$53.useRef)();
	function onTouchStart(e) {
		var _e$touches$ = e.touches[0], screenX = _e$touches$.screenX, screenY = _e$touches$.screenY;
		setTouchPosition({
			x: screenX,
			y: screenY
		});
		window.clearInterval(motionRef.current);
	}
	function onTouchMove(e) {
		if (!touchPosition) return;
		var _e$touches$2 = e.touches[0], screenX = _e$touches$2.screenX, screenY = _e$touches$2.screenY;
		setTouchPosition({
			x: screenX,
			y: screenY
		});
		var offsetX = screenX - touchPosition.x;
		var offsetY = screenY - touchPosition.y;
		onOffset(offsetX, offsetY);
		var now = Date.now();
		setLastTimestamp(now);
		setLastTimeDiff(now - lastTimestamp);
		setLastOffset({
			x: offsetX,
			y: offsetY
		});
	}
	function onTouchEnd() {
		if (!touchPosition) return;
		setTouchPosition(null);
		setLastOffset(null);
		if (lastOffset) {
			var distanceX = lastOffset.x / lastTimeDiff;
			var distanceY = lastOffset.y / lastTimeDiff;
			var absX = Math.abs(distanceX);
			var absY = Math.abs(distanceY);
			if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) return;
			var currentX = distanceX;
			var currentY = distanceY;
			motionRef.current = window.setInterval(function() {
				if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
					window.clearInterval(motionRef.current);
					return;
				}
				currentX *= SPEED_OFF_MULTIPLE;
				currentY *= SPEED_OFF_MULTIPLE;
				onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL);
			}, REFRESH_INTERVAL);
		}
	}
	var lastWheelDirectionRef = (0, import_react$53.useRef)();
	function onWheel(e) {
		var deltaX = e.deltaX, deltaY = e.deltaY;
		var mixed = 0;
		var absX = Math.abs(deltaX);
		var absY = Math.abs(deltaY);
		if (absX === absY) mixed = lastWheelDirectionRef.current === "x" ? deltaX : deltaY;
		else if (absX > absY) {
			mixed = deltaX;
			lastWheelDirectionRef.current = "x";
		} else {
			mixed = deltaY;
			lastWheelDirectionRef.current = "y";
		}
		if (onOffset(-mixed, -mixed)) e.preventDefault();
	}
	var touchEventsRef = (0, import_react$53.useRef)(null);
	touchEventsRef.current = {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onWheel
	};
	import_react$52.useEffect(function() {
		function onProxyTouchStart(e) {
			touchEventsRef.current.onTouchStart(e);
		}
		function onProxyTouchMove(e) {
			touchEventsRef.current.onTouchMove(e);
		}
		function onProxyTouchEnd(e) {
			touchEventsRef.current.onTouchEnd(e);
		}
		function onProxyWheel(e) {
			touchEventsRef.current.onWheel(e);
		}
		document.addEventListener("touchmove", onProxyTouchMove, { passive: false });
		document.addEventListener("touchend", onProxyTouchEnd, { passive: true });
		ref.current.addEventListener("touchstart", onProxyTouchStart, { passive: true });
		ref.current.addEventListener("wheel", onProxyWheel, { passive: false });
		return function() {
			document.removeEventListener("touchmove", onProxyTouchMove);
			document.removeEventListener("touchend", onProxyTouchEnd);
		};
	}, []);
}
var import_react$52, import_react$53, MIN_SWIPE_DISTANCE, STOP_SWIPE_DISTANCE, REFRESH_INTERVAL, SPEED_OFF_MULTIPLE;
var init_useTouchMove = __esmMin((() => {
	init_slicedToArray();
	import_react$52 = /* @__PURE__ */ __toESM(require_react());
	import_react$53 = /* @__PURE__ */ __toESM(require_react());
	MIN_SWIPE_DISTANCE = .1;
	STOP_SWIPE_DISTANCE = .01;
	REFRESH_INTERVAL = 20;
	SPEED_OFF_MULTIPLE = Math.pow(.995, REFRESH_INTERVAL);
}));
function useUpdate(callback) {
	var _useState2 = _slicedToArray((0, import_react$51.useState)(0), 2), count = _useState2[0], setCount = _useState2[1];
	var effectRef = (0, import_react$51.useRef)(0);
	var callbackRef = (0, import_react$51.useRef)();
	callbackRef.current = callback;
	useLayoutUpdateEffect(function() {
		var _callbackRef$current;
		(_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 || _callbackRef$current.call(callbackRef);
	}, [count]);
	return function() {
		if (effectRef.current !== count) return;
		effectRef.current += 1;
		setCount(effectRef.current);
	};
}
function useUpdateState(defaultState) {
	var batchRef = (0, import_react$51.useRef)([]);
	var forceUpdate = _slicedToArray((0, import_react$51.useState)({}), 2)[1];
	var state = (0, import_react$51.useRef)(typeof defaultState === "function" ? defaultState() : defaultState);
	var flushUpdate = useUpdate(function() {
		var current = state.current;
		batchRef.current.forEach(function(callback) {
			current = callback(current);
		});
		batchRef.current = [];
		state.current = current;
		forceUpdate({});
	});
	function updater(callback) {
		batchRef.current.push(callback);
		flushUpdate();
	}
	return [state.current, updater];
}
var import_react$51;
var init_useUpdate = __esmMin((() => {
	init_slicedToArray();
	init_useLayoutEffect();
	import_react$51 = /* @__PURE__ */ __toESM(require_react());
}));
function useVisibleRange(tabOffsets, visibleTabContentValue, transform, tabContentSizeValue, addNodeSizeValue, operationNodeSizeValue, _ref) {
	var tabs = _ref.tabs, tabPosition = _ref.tabPosition, rtl = _ref.rtl;
	var charUnit;
	var position;
	var transformSize;
	if (["top", "bottom"].includes(tabPosition)) {
		charUnit = "width";
		position = rtl ? "right" : "left";
		transformSize = Math.abs(transform);
	} else {
		charUnit = "height";
		position = "top";
		transformSize = -transform;
	}
	return (0, import_react$50.useMemo)(function() {
		if (!tabs.length) return [0, 0];
		var len = tabs.length;
		var endIndex = len;
		for (var i = 0; i < len; i += 1) {
			var offset = tabOffsets.get(tabs[i].key) || DEFAULT_SIZE;
			if (Math.floor(offset[position] + offset[charUnit]) > Math.floor(transformSize + visibleTabContentValue)) {
				endIndex = i - 1;
				break;
			}
		}
		var startIndex = 0;
		for (var _i = len - 1; _i >= 0; _i -= 1) if ((tabOffsets.get(tabs[_i].key) || DEFAULT_SIZE)[position] < transformSize) {
			startIndex = _i + 1;
			break;
		}
		return startIndex > endIndex ? [0, -1] : [startIndex, endIndex];
	}, [
		tabOffsets,
		visibleTabContentValue,
		tabContentSizeValue,
		addNodeSizeValue,
		operationNodeSizeValue,
		transformSize,
		tabPosition,
		tabs.map(function(tab) {
			return tab.key;
		}).join("_"),
		rtl
	]);
}
var import_react$50, DEFAULT_SIZE;
var init_useVisibleRange = __esmMin((() => {
	import_react$50 = /* @__PURE__ */ __toESM(require_react());
	DEFAULT_SIZE = {
		width: 0,
		height: 0,
		left: 0,
		top: 0,
		right: 0
	};
}));
function stringify(obj) {
	var tgt;
	if (obj instanceof Map) {
		tgt = {};
		obj.forEach(function(v, k) {
			tgt[k] = v;
		});
	} else tgt = obj;
	return JSON.stringify(tgt);
}
function genDataNodeKey(key) {
	return String(key).replace(/"/g, RC_TABS_DOUBLE_QUOTE);
}
function getRemovable(closable, closeIcon, editable, disabled) {
	if (!editable || disabled || closable === false || closable === void 0 && (closeIcon === false || closeIcon === null)) return false;
	return true;
}
var RC_TABS_DOUBLE_QUOTE;
var init_util = __esmMin((() => {
	RC_TABS_DOUBLE_QUOTE = "TABS_DQ";
}));
var import_react$49, AddButton, AddButton_default;
var init_AddButton = __esmMin((() => {
	import_react$49 = /* @__PURE__ */ __toESM(require_react());
	AddButton = /* @__PURE__ */ import_react$49.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, editable = props.editable, locale = props.locale, style = props.style;
		if (!editable || editable.showAdd === false) return null;
		return /* @__PURE__ */ import_react$49.createElement("button", {
			ref,
			type: "button",
			className: "".concat(prefixCls, "-nav-add"),
			style,
			"aria-label": (locale === null || locale === void 0 ? void 0 : locale.addAriaLabel) || "Add tab",
			onClick: function onClick(event) {
				editable.onEdit("add", { event });
			}
		}, editable.addIcon || "+");
	});
	AddButton_default = AddButton;
}));
var import_react$48, ExtraContent, ExtraContent_default;
var init_ExtraContent = __esmMin((() => {
	init_typeof();
	import_react$48 = /* @__PURE__ */ __toESM(require_react());
	ExtraContent = /* @__PURE__ */ import_react$48.forwardRef(function(props, ref) {
		var position = props.position, prefixCls = props.prefixCls, extra = props.extra;
		if (!extra) return null;
		var content;
		var assertExtra = {};
		if (_typeof(extra) === "object" && !/* @__PURE__ */ import_react$48.isValidElement(extra)) assertExtra = extra;
		else assertExtra.right = extra;
		if (position === "right") content = assertExtra.right;
		if (position === "left") content = assertExtra.left;
		return content ? /* @__PURE__ */ import_react$48.createElement("div", {
			className: "".concat(prefixCls, "-extra-content"),
			ref
		}, content) : null;
	});
	ExtraContent_default = ExtraContent;
}));
var import_classnames$17, import_react$46, import_react$47, OperationNode, OperationNode_default;
var init_OperationNode = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	import_classnames$17 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$4();
	init_es$5();
	init_KeyCode();
	import_react$46 = /* @__PURE__ */ __toESM(require_react());
	import_react$47 = /* @__PURE__ */ __toESM(require_react());
	init_util();
	init_AddButton();
	OperationNode = /* @__PURE__ */ import_react$46.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, id = props.id, tabs = props.tabs, locale = props.locale, mobile = props.mobile, _props$more = props.more, moreProps = _props$more === void 0 ? {} : _props$more, style = props.style, className = props.className, editable = props.editable, tabBarGutter = props.tabBarGutter, rtl = props.rtl, removeAriaLabel = props.removeAriaLabel, onTabClick = props.onTabClick, getPopupContainer = props.getPopupContainer, popupClassName = props.popupClassName;
		var _useState2 = _slicedToArray((0, import_react$47.useState)(false), 2), open = _useState2[0], setOpen = _useState2[1];
		var _useState4 = _slicedToArray((0, import_react$47.useState)(null), 2), selectedKey = _useState4[0], setSelectedKey = _useState4[1];
		var _moreProps$icon = moreProps.icon, moreIcon = _moreProps$icon === void 0 ? "More" : _moreProps$icon;
		var popupId = "".concat(id, "-more-popup");
		var dropdownPrefix = "".concat(prefixCls, "-dropdown");
		var selectedItemId = selectedKey !== null ? "".concat(popupId, "-").concat(selectedKey) : null;
		var dropdownAriaLabel = locale === null || locale === void 0 ? void 0 : locale.dropdownAriaLabel;
		function onRemoveTab(event, key) {
			event.preventDefault();
			event.stopPropagation();
			editable.onEdit("remove", {
				key,
				event
			});
		}
		var menu = /* @__PURE__ */ import_react$46.createElement(es_default$7, {
			onClick: function onClick(_ref) {
				var key = _ref.key, domEvent = _ref.domEvent;
				onTabClick(key, domEvent);
				setOpen(false);
			},
			prefixCls: "".concat(dropdownPrefix, "-menu"),
			id: popupId,
			tabIndex: -1,
			role: "listbox",
			"aria-activedescendant": selectedItemId,
			selectedKeys: [selectedKey],
			"aria-label": dropdownAriaLabel !== void 0 ? dropdownAriaLabel : "expanded dropdown"
		}, tabs.map(function(tab) {
			var closable = tab.closable, disabled = tab.disabled, closeIcon = tab.closeIcon, key = tab.key, label = tab.label;
			var removable = getRemovable(closable, closeIcon, editable, disabled);
			return /* @__PURE__ */ import_react$46.createElement(MenuItem_default, {
				key,
				id: "".concat(popupId, "-").concat(key),
				role: "option",
				"aria-controls": id && "".concat(id, "-panel-").concat(key),
				disabled
			}, /* @__PURE__ */ import_react$46.createElement("span", null, label), removable && /* @__PURE__ */ import_react$46.createElement("button", {
				type: "button",
				"aria-label": removeAriaLabel || "remove",
				tabIndex: 0,
				className: "".concat(dropdownPrefix, "-menu-item-remove"),
				onClick: function onClick(e) {
					e.stopPropagation();
					onRemoveTab(e, key);
				}
			}, closeIcon || editable.removeIcon || "×"));
		}));
		function selectOffset(offset) {
			var enabledTabs = tabs.filter(function(tab$1) {
				return !tab$1.disabled;
			});
			var selectedIndex = enabledTabs.findIndex(function(tab$1) {
				return tab$1.key === selectedKey;
			}) || 0;
			var len = enabledTabs.length;
			for (var i = 0; i < len; i += 1) {
				selectedIndex = (selectedIndex + offset + len) % len;
				var tab = enabledTabs[selectedIndex];
				if (!tab.disabled) {
					setSelectedKey(tab.key);
					return;
				}
			}
		}
		function onKeyDown(e) {
			var which = e.which;
			if (!open) {
				if ([
					KeyCode_default.DOWN,
					KeyCode_default.SPACE,
					KeyCode_default.ENTER
				].includes(which)) {
					setOpen(true);
					e.preventDefault();
				}
				return;
			}
			switch (which) {
				case KeyCode_default.UP:
					selectOffset(-1);
					e.preventDefault();
					break;
				case KeyCode_default.DOWN:
					selectOffset(1);
					e.preventDefault();
					break;
				case KeyCode_default.ESC:
					setOpen(false);
					break;
				case KeyCode_default.SPACE:
				case KeyCode_default.ENTER:
					if (selectedKey !== null) onTabClick(selectedKey, e);
					break;
			}
		}
		(0, import_react$47.useEffect)(function() {
			var ele = document.getElementById(selectedItemId);
			if (ele && ele.scrollIntoView) ele.scrollIntoView(false);
		}, [selectedKey]);
		(0, import_react$47.useEffect)(function() {
			if (!open) setSelectedKey(null);
		}, [open]);
		var moreStyle = _defineProperty({}, rtl ? "marginRight" : "marginLeft", tabBarGutter);
		if (!tabs.length) {
			moreStyle.visibility = "hidden";
			moreStyle.order = 1;
		}
		var overlayClassName = (0, import_classnames$17.default)(_defineProperty({}, "".concat(dropdownPrefix, "-rtl"), rtl));
		var moreNode = mobile ? null : /* @__PURE__ */ import_react$46.createElement(es_default$6, _extends({
			prefixCls: dropdownPrefix,
			overlay: menu,
			visible: tabs.length ? open : false,
			onVisibleChange: setOpen,
			overlayClassName: (0, import_classnames$17.default)(overlayClassName, popupClassName),
			mouseEnterDelay: .1,
			mouseLeaveDelay: .1,
			getPopupContainer
		}, moreProps), /* @__PURE__ */ import_react$46.createElement("button", {
			type: "button",
			className: "".concat(prefixCls, "-nav-more"),
			style: moreStyle,
			"aria-haspopup": "listbox",
			"aria-controls": popupId,
			id: "".concat(id, "-more"),
			"aria-expanded": open,
			onKeyDown
		}, moreIcon));
		return /* @__PURE__ */ import_react$46.createElement("div", {
			className: (0, import_classnames$17.default)("".concat(prefixCls, "-nav-operations"), className),
			style,
			ref
		}, moreNode, /* @__PURE__ */ import_react$46.createElement(AddButton_default, {
			prefixCls,
			locale,
			editable
		}));
	});
	OperationNode_default = /* @__PURE__ */ import_react$46.memo(OperationNode, function(_, next) {
		return next.tabMoving;
	});
}));
var import_classnames$16, import_react$45, TabNode, TabNode_default;
var init_TabNode = __esmMin((() => {
	init_defineProperty();
	import_classnames$16 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$45 = /* @__PURE__ */ __toESM(require_react());
	init_util();
	TabNode = function TabNode$1(props) {
		var prefixCls = props.prefixCls, id = props.id, active = props.active, focus = props.focus, _props$tab = props.tab, key = _props$tab.key, label = _props$tab.label, disabled = _props$tab.disabled, closeIcon = _props$tab.closeIcon, icon = _props$tab.icon, closable = props.closable, renderWrapper = props.renderWrapper, removeAriaLabel = props.removeAriaLabel, editable = props.editable, onClick = props.onClick, onFocus = props.onFocus, onBlur = props.onBlur, onKeyDown = props.onKeyDown, onMouseDown = props.onMouseDown, onMouseUp = props.onMouseUp, style = props.style, tabCount = props.tabCount, currentPosition = props.currentPosition;
		var tabPrefix = "".concat(prefixCls, "-tab");
		var removable = getRemovable(closable, closeIcon, editable, disabled);
		function onInternalClick(e) {
			if (disabled) return;
			onClick(e);
		}
		function onRemoveTab(event) {
			event.preventDefault();
			event.stopPropagation();
			editable.onEdit("remove", {
				key,
				event
			});
		}
		var labelNode = import_react$45.useMemo(function() {
			return icon && typeof label === "string" ? /* @__PURE__ */ import_react$45.createElement("span", null, label) : label;
		}, [label, icon]);
		var btnRef = import_react$45.useRef(null);
		import_react$45.useEffect(function() {
			if (focus && btnRef.current) btnRef.current.focus();
		}, [focus]);
		var node = /* @__PURE__ */ import_react$45.createElement("div", {
			key,
			"data-node-key": genDataNodeKey(key),
			className: (0, import_classnames$16.default)(tabPrefix, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(tabPrefix, "-with-remove"), removable), "".concat(tabPrefix, "-active"), active), "".concat(tabPrefix, "-disabled"), disabled), "".concat(tabPrefix, "-focus"), focus)),
			style,
			onClick: onInternalClick
		}, /* @__PURE__ */ import_react$45.createElement("div", {
			ref: btnRef,
			role: "tab",
			"aria-selected": active,
			id: id && "".concat(id, "-tab-").concat(key),
			className: "".concat(tabPrefix, "-btn"),
			"aria-controls": id && "".concat(id, "-panel-").concat(key),
			"aria-disabled": disabled,
			tabIndex: disabled ? null : active ? 0 : -1,
			onClick: function onClick$1(e) {
				e.stopPropagation();
				onInternalClick(e);
			},
			onKeyDown,
			onMouseDown,
			onMouseUp,
			onFocus,
			onBlur
		}, focus && /* @__PURE__ */ import_react$45.createElement("div", {
			"aria-live": "polite",
			style: {
				width: 0,
				height: 0,
				position: "absolute",
				overflow: "hidden",
				opacity: 0
			}
		}, "Tab ".concat(currentPosition, " of ").concat(tabCount)), icon && /* @__PURE__ */ import_react$45.createElement("span", { className: "".concat(tabPrefix, "-icon") }, icon), label && labelNode), removable && /* @__PURE__ */ import_react$45.createElement("button", {
			type: "button",
			role: "tab",
			"aria-label": removeAriaLabel || "remove",
			tabIndex: active ? 0 : -1,
			className: "".concat(tabPrefix, "-remove"),
			onClick: function onClick$1(e) {
				e.stopPropagation();
				onRemoveTab(e);
			}
		}, closeIcon || editable.removeIcon || "×"));
		return renderWrapper ? renderWrapper(node) : node;
	};
	TabNode_default = TabNode;
}));
var import_classnames$15, import_react$43, import_react$44, getTabSize, getSize, getUnitValue, TabNavList, TabNavList_default;
var init_TabNavList = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_toConsumableArray();
	init_objectSpread2();
	init_slicedToArray();
	import_classnames$15 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$6();
	init_useEvent();
	init_ref();
	import_react$43 = /* @__PURE__ */ __toESM(require_react());
	import_react$44 = /* @__PURE__ */ __toESM(require_react());
	init_TabContext();
	init_useIndicator();
	init_useOffsets();
	init_useSyncState();
	init_useTouchMove();
	init_useUpdate();
	init_useVisibleRange();
	init_util();
	init_AddButton();
	init_ExtraContent();
	init_OperationNode();
	init_TabNode();
	getTabSize = function getTabSize$1(tab, containerRect) {
		var offsetWidth = tab.offsetWidth, offsetHeight = tab.offsetHeight, offsetTop = tab.offsetTop, offsetLeft = tab.offsetLeft;
		var _tab$getBoundingClien = tab.getBoundingClientRect(), width = _tab$getBoundingClien.width, height = _tab$getBoundingClien.height, left = _tab$getBoundingClien.left, top = _tab$getBoundingClien.top;
		if (Math.abs(width - offsetWidth) < 1) return [
			width,
			height,
			left - containerRect.left,
			top - containerRect.top
		];
		return [
			offsetWidth,
			offsetHeight,
			offsetLeft,
			offsetTop
		];
	};
	getSize = function getSize$1(refObj) {
		var _ref = refObj.current || {}, _ref$offsetWidth = _ref.offsetWidth, offsetWidth = _ref$offsetWidth === void 0 ? 0 : _ref$offsetWidth, _ref$offsetHeight = _ref.offsetHeight, offsetHeight = _ref$offsetHeight === void 0 ? 0 : _ref$offsetHeight;
		if (refObj.current) {
			var _refObj$current$getBo = refObj.current.getBoundingClientRect(), width = _refObj$current$getBo.width, height = _refObj$current$getBo.height;
			if (Math.abs(width - offsetWidth) < 1) return [width, height];
		}
		return [offsetWidth, offsetHeight];
	};
	getUnitValue = function getUnitValue$1(size, tabPositionTopOrBottom) {
		return size[tabPositionTopOrBottom ? 0 : 1];
	};
	TabNavList = /* @__PURE__ */ import_react$43.forwardRef(function(props, ref) {
		var className = props.className, style = props.style, id = props.id, animated = props.animated, activeKey = props.activeKey, rtl = props.rtl, extra = props.extra, editable = props.editable, locale = props.locale, tabPosition = props.tabPosition, tabBarGutter = props.tabBarGutter, children = props.children, onTabClick = props.onTabClick, onTabScroll = props.onTabScroll, indicator = props.indicator;
		var _React$useContext = import_react$43.useContext(TabContext_default), prefixCls = _React$useContext.prefixCls, tabs = _React$useContext.tabs;
		var containerRef = (0, import_react$44.useRef)(null);
		var extraLeftRef = (0, import_react$44.useRef)(null);
		var extraRightRef = (0, import_react$44.useRef)(null);
		var tabsWrapperRef = (0, import_react$44.useRef)(null);
		var tabListRef = (0, import_react$44.useRef)(null);
		var operationsRef = (0, import_react$44.useRef)(null);
		var innerAddButtonRef = (0, import_react$44.useRef)(null);
		var tabPositionTopOrBottom = tabPosition === "top" || tabPosition === "bottom";
		var _useSyncState2 = _slicedToArray(useSyncState(0, function(next, prev) {
			if (tabPositionTopOrBottom && onTabScroll) onTabScroll({ direction: next > prev ? "left" : "right" });
		}), 2), transformLeft = _useSyncState2[0], setTransformLeft = _useSyncState2[1];
		var _useSyncState4 = _slicedToArray(useSyncState(0, function(next, prev) {
			if (!tabPositionTopOrBottom && onTabScroll) onTabScroll({ direction: next > prev ? "top" : "bottom" });
		}), 2), transformTop = _useSyncState4[0], setTransformTop = _useSyncState4[1];
		var _useState2 = _slicedToArray((0, import_react$44.useState)([0, 0]), 2), containerExcludeExtraSize = _useState2[0], setContainerExcludeExtraSize = _useState2[1];
		var _useState4 = _slicedToArray((0, import_react$44.useState)([0, 0]), 2), tabContentSize = _useState4[0], setTabContentSize = _useState4[1];
		var _useState6 = _slicedToArray((0, import_react$44.useState)([0, 0]), 2), addSize = _useState6[0], setAddSize = _useState6[1];
		var _useState8 = _slicedToArray((0, import_react$44.useState)([0, 0]), 2), operationSize = _useState8[0], setOperationSize = _useState8[1];
		var _useUpdateState2 = _slicedToArray(useUpdateState(/* @__PURE__ */ new Map()), 2), tabSizes = _useUpdateState2[0], setTabSizes = _useUpdateState2[1];
		var tabOffsets = useOffsets(tabs, tabSizes, tabContentSize[0]);
		var containerExcludeExtraSizeValue = getUnitValue(containerExcludeExtraSize, tabPositionTopOrBottom);
		var tabContentSizeValue = getUnitValue(tabContentSize, tabPositionTopOrBottom);
		var addSizeValue = getUnitValue(addSize, tabPositionTopOrBottom);
		var operationSizeValue = getUnitValue(operationSize, tabPositionTopOrBottom);
		var needScroll = Math.floor(containerExcludeExtraSizeValue) < Math.floor(tabContentSizeValue + addSizeValue);
		var visibleTabContentValue = needScroll ? containerExcludeExtraSizeValue - operationSizeValue : containerExcludeExtraSizeValue - addSizeValue;
		var operationsHiddenClassName = "".concat(prefixCls, "-nav-operations-hidden");
		var transformMin = 0;
		var transformMax = 0;
		if (!tabPositionTopOrBottom) {
			transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
			transformMax = 0;
		} else if (rtl) {
			transformMin = 0;
			transformMax = Math.max(0, tabContentSizeValue - visibleTabContentValue);
		} else {
			transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
			transformMax = 0;
		}
		function alignInRange(value) {
			if (value < transformMin) return transformMin;
			if (value > transformMax) return transformMax;
			return value;
		}
		var touchMovingRef = (0, import_react$44.useRef)(null);
		var _useState10 = _slicedToArray((0, import_react$44.useState)(), 2), lockAnimation = _useState10[0], setLockAnimation = _useState10[1];
		function doLockAnimation() {
			setLockAnimation(Date.now());
		}
		function clearTouchMoving() {
			if (touchMovingRef.current) clearTimeout(touchMovingRef.current);
		}
		useTouchMove(tabsWrapperRef, function(offsetX, offsetY) {
			function doMove(setState, offset) {
				setState(function(value) {
					return alignInRange(value + offset);
				});
			}
			if (!needScroll) return false;
			if (tabPositionTopOrBottom) doMove(setTransformLeft, offsetX);
			else doMove(setTransformTop, offsetY);
			clearTouchMoving();
			doLockAnimation();
			return true;
		});
		(0, import_react$44.useEffect)(function() {
			clearTouchMoving();
			if (lockAnimation) touchMovingRef.current = setTimeout(function() {
				setLockAnimation(0);
			}, 100);
			return clearTouchMoving;
		}, [lockAnimation]);
		var _useVisibleRange2 = _slicedToArray(useVisibleRange(tabOffsets, visibleTabContentValue, tabPositionTopOrBottom ? transformLeft : transformTop, tabContentSizeValue, addSizeValue, operationSizeValue, _objectSpread2(_objectSpread2({}, props), {}, { tabs })), 2), visibleStart = _useVisibleRange2[0], visibleEnd = _useVisibleRange2[1];
		var scrollToTab = useEvent(function() {
			var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : activeKey;
			var tabOffset = tabOffsets.get(key) || {
				width: 0,
				height: 0,
				left: 0,
				right: 0,
				top: 0
			};
			if (tabPositionTopOrBottom) {
				var newTransform = transformLeft;
				if (rtl) {
					if (tabOffset.right < transformLeft) newTransform = tabOffset.right;
					else if (tabOffset.right + tabOffset.width > transformLeft + visibleTabContentValue) newTransform = tabOffset.right + tabOffset.width - visibleTabContentValue;
				} else if (tabOffset.left < -transformLeft) newTransform = -tabOffset.left;
				else if (tabOffset.left + tabOffset.width > -transformLeft + visibleTabContentValue) newTransform = -(tabOffset.left + tabOffset.width - visibleTabContentValue);
				setTransformTop(0);
				setTransformLeft(alignInRange(newTransform));
			} else {
				var _newTransform = transformTop;
				if (tabOffset.top < -transformTop) _newTransform = -tabOffset.top;
				else if (tabOffset.top + tabOffset.height > -transformTop + visibleTabContentValue) _newTransform = -(tabOffset.top + tabOffset.height - visibleTabContentValue);
				setTransformLeft(0);
				setTransformTop(alignInRange(_newTransform));
			}
		});
		var _useState12 = _slicedToArray((0, import_react$44.useState)(), 2), focusKey = _useState12[0], setFocusKey = _useState12[1];
		var _useState14 = _slicedToArray((0, import_react$44.useState)(false), 2), isMouse = _useState14[0], setIsMouse = _useState14[1];
		var enabledTabs = tabs.filter(function(tab) {
			return !tab.disabled;
		}).map(function(tab) {
			return tab.key;
		});
		var onOffset = function onOffset$1(offset) {
			var currentIndex = enabledTabs.indexOf(focusKey || activeKey);
			var len = enabledTabs.length;
			var newKey = enabledTabs[(currentIndex + offset + len) % len];
			setFocusKey(newKey);
		};
		var handleRemoveTab = function handleRemoveTab$1(removalTabKey, e) {
			var removeIndex = enabledTabs.indexOf(removalTabKey);
			var removeTab = tabs.find(function(tab) {
				return tab.key === removalTabKey;
			});
			if (getRemovable(removeTab === null || removeTab === void 0 ? void 0 : removeTab.closable, removeTab === null || removeTab === void 0 ? void 0 : removeTab.closeIcon, editable, removeTab === null || removeTab === void 0 ? void 0 : removeTab.disabled)) {
				e.preventDefault();
				e.stopPropagation();
				editable.onEdit("remove", {
					key: removalTabKey,
					event: e
				});
				if (removeIndex === enabledTabs.length - 1) onOffset(-1);
				else onOffset(1);
			}
		};
		var handleMouseDown = function handleMouseDown$1(key, e) {
			setIsMouse(true);
			if (e.button === 1) handleRemoveTab(key, e);
		};
		var handleKeyDown = function handleKeyDown$1(e) {
			var code = e.code;
			var isRTL = rtl && tabPositionTopOrBottom;
			var firstEnabledTab = enabledTabs[0];
			var lastEnabledTab = enabledTabs[enabledTabs.length - 1];
			switch (code) {
				case "ArrowLeft":
					if (tabPositionTopOrBottom) onOffset(isRTL ? 1 : -1);
					break;
				case "ArrowRight":
					if (tabPositionTopOrBottom) onOffset(isRTL ? -1 : 1);
					break;
				case "ArrowUp":
					e.preventDefault();
					if (!tabPositionTopOrBottom) onOffset(-1);
					break;
				case "ArrowDown":
					e.preventDefault();
					if (!tabPositionTopOrBottom) onOffset(1);
					break;
				case "Home":
					e.preventDefault();
					setFocusKey(firstEnabledTab);
					break;
				case "End":
					e.preventDefault();
					setFocusKey(lastEnabledTab);
					break;
				case "Enter":
				case "Space":
					e.preventDefault();
					onTabClick(focusKey !== null && focusKey !== void 0 ? focusKey : activeKey, e);
					break;
				case "Backspace":
				case "Delete":
					handleRemoveTab(focusKey, e);
					break;
			}
		};
		var tabNodeStyle = {};
		if (tabPositionTopOrBottom) tabNodeStyle[rtl ? "marginRight" : "marginLeft"] = tabBarGutter;
		else tabNodeStyle.marginTop = tabBarGutter;
		var tabNodes = tabs.map(function(tab, i) {
			var key = tab.key;
			return /* @__PURE__ */ import_react$43.createElement(TabNode_default, {
				id,
				prefixCls,
				key,
				tab,
				style: i === 0 ? void 0 : tabNodeStyle,
				closable: tab.closable,
				editable,
				active: key === activeKey,
				focus: key === focusKey,
				renderWrapper: children,
				removeAriaLabel: locale === null || locale === void 0 ? void 0 : locale.removeAriaLabel,
				tabCount: enabledTabs.length,
				currentPosition: i + 1,
				onClick: function onClick(e) {
					onTabClick(key, e);
				},
				onKeyDown: handleKeyDown,
				onFocus: function onFocus() {
					if (!isMouse) setFocusKey(key);
					scrollToTab(key);
					doLockAnimation();
					if (!tabsWrapperRef.current) return;
					if (!rtl) tabsWrapperRef.current.scrollLeft = 0;
					tabsWrapperRef.current.scrollTop = 0;
				},
				onBlur: function onBlur() {
					setFocusKey(void 0);
				},
				onMouseDown: function onMouseDown(e) {
					return handleMouseDown(key, e);
				},
				onMouseUp: function onMouseUp() {
					setIsMouse(false);
				}
			});
		});
		var updateTabSizes = function updateTabSizes$1() {
			return setTabSizes(function() {
				var _tabListRef$current;
				var newSizes = /* @__PURE__ */ new Map();
				var listRect = (_tabListRef$current = tabListRef.current) === null || _tabListRef$current === void 0 ? void 0 : _tabListRef$current.getBoundingClientRect();
				tabs.forEach(function(_ref2) {
					var _tabListRef$current2;
					var key = _ref2.key;
					var btnNode = (_tabListRef$current2 = tabListRef.current) === null || _tabListRef$current2 === void 0 ? void 0 : _tabListRef$current2.querySelector("[data-node-key=\"".concat(genDataNodeKey(key), "\"]"));
					if (btnNode) {
						var _getTabSize2 = _slicedToArray(getTabSize(btnNode, listRect), 4), width = _getTabSize2[0], height = _getTabSize2[1], left = _getTabSize2[2], top = _getTabSize2[3];
						newSizes.set(key, {
							width,
							height,
							left,
							top
						});
					}
				});
				return newSizes;
			});
		};
		(0, import_react$44.useEffect)(function() {
			updateTabSizes();
		}, [tabs.map(function(tab) {
			return tab.key;
		}).join("_")]);
		var onListHolderResize = useUpdate(function() {
			var containerSize = getSize(containerRef);
			var extraLeftSize = getSize(extraLeftRef);
			var extraRightSize = getSize(extraRightRef);
			setContainerExcludeExtraSize([containerSize[0] - extraLeftSize[0] - extraRightSize[0], containerSize[1] - extraLeftSize[1] - extraRightSize[1]]);
			var newAddSize = getSize(innerAddButtonRef);
			setAddSize(newAddSize);
			setOperationSize(getSize(operationsRef));
			var tabContentFullSize = getSize(tabListRef);
			setTabContentSize([tabContentFullSize[0] - newAddSize[0], tabContentFullSize[1] - newAddSize[1]]);
			updateTabSizes();
		});
		var startHiddenTabs = tabs.slice(0, visibleStart);
		var endHiddenTabs = tabs.slice(visibleEnd + 1);
		var hiddenTabs = [].concat(_toConsumableArray(startHiddenTabs), _toConsumableArray(endHiddenTabs));
		var activeTabOffset = tabOffsets.get(activeKey);
		var indicatorStyle = useIndicator_default({
			activeTabOffset,
			horizontal: tabPositionTopOrBottom,
			indicator,
			rtl
		}).style;
		(0, import_react$44.useEffect)(function() {
			scrollToTab();
		}, [
			activeKey,
			transformMin,
			transformMax,
			stringify(activeTabOffset),
			stringify(tabOffsets),
			tabPositionTopOrBottom
		]);
		(0, import_react$44.useEffect)(function() {
			onListHolderResize();
		}, [rtl]);
		var hasDropdown = !!hiddenTabs.length;
		var wrapPrefix = "".concat(prefixCls, "-nav-wrap");
		var pingLeft;
		var pingRight;
		var pingTop;
		var pingBottom;
		if (tabPositionTopOrBottom) if (rtl) {
			pingRight = transformLeft > 0;
			pingLeft = transformLeft !== transformMax;
		} else {
			pingLeft = transformLeft < 0;
			pingRight = transformLeft !== transformMin;
		}
		else {
			pingTop = transformTop < 0;
			pingBottom = transformTop !== transformMin;
		}
		return /* @__PURE__ */ import_react$43.createElement(es_default$2, { onResize: onListHolderResize }, /* @__PURE__ */ import_react$43.createElement("div", {
			ref: useComposeRef(ref, containerRef),
			role: "tablist",
			"aria-orientation": tabPositionTopOrBottom ? "horizontal" : "vertical",
			className: (0, import_classnames$15.default)("".concat(prefixCls, "-nav"), className),
			style,
			onKeyDown: function onKeyDown() {
				doLockAnimation();
			}
		}, /* @__PURE__ */ import_react$43.createElement(ExtraContent_default, {
			ref: extraLeftRef,
			position: "left",
			extra,
			prefixCls
		}), /* @__PURE__ */ import_react$43.createElement(es_default$2, { onResize: onListHolderResize }, /* @__PURE__ */ import_react$43.createElement("div", {
			className: (0, import_classnames$15.default)(wrapPrefix, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(wrapPrefix, "-ping-left"), pingLeft), "".concat(wrapPrefix, "-ping-right"), pingRight), "".concat(wrapPrefix, "-ping-top"), pingTop), "".concat(wrapPrefix, "-ping-bottom"), pingBottom)),
			ref: tabsWrapperRef
		}, /* @__PURE__ */ import_react$43.createElement(es_default$2, { onResize: onListHolderResize }, /* @__PURE__ */ import_react$43.createElement("div", {
			ref: tabListRef,
			className: "".concat(prefixCls, "-nav-list"),
			style: {
				transform: "translate(".concat(transformLeft, "px, ").concat(transformTop, "px)"),
				transition: lockAnimation ? "none" : void 0
			}
		}, tabNodes, /* @__PURE__ */ import_react$43.createElement(AddButton_default, {
			ref: innerAddButtonRef,
			prefixCls,
			locale,
			editable,
			style: _objectSpread2(_objectSpread2({}, tabNodes.length === 0 ? void 0 : tabNodeStyle), {}, { visibility: hasDropdown ? "hidden" : null })
		}), /* @__PURE__ */ import_react$43.createElement("div", {
			className: (0, import_classnames$15.default)("".concat(prefixCls, "-ink-bar"), _defineProperty({}, "".concat(prefixCls, "-ink-bar-animated"), animated.inkBar)),
			style: indicatorStyle
		}))))), /* @__PURE__ */ import_react$43.createElement(OperationNode_default, _extends({}, props, {
			removeAriaLabel: locale === null || locale === void 0 ? void 0 : locale.removeAriaLabel,
			ref: operationsRef,
			prefixCls,
			tabs: hiddenTabs,
			className: !hasDropdown && operationsHiddenClassName,
			tabMoving: !!lockAnimation
		})), /* @__PURE__ */ import_react$43.createElement(ExtraContent_default, {
			ref: extraRightRef,
			position: "right",
			extra,
			prefixCls
		})));
	});
	TabNavList_default = TabNavList;
}));
var import_classnames$14, import_react$42, TabPane, TabPane_default;
var init_TabPane = __esmMin((() => {
	import_classnames$14 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$42 = /* @__PURE__ */ __toESM(require_react());
	TabPane = /* @__PURE__ */ import_react$42.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, className = props.className, style = props.style, id = props.id, active = props.active, tabKey = props.tabKey, children = props.children;
		return /* @__PURE__ */ import_react$42.createElement("div", {
			id: id && "".concat(id, "-panel-").concat(tabKey),
			role: "tabpanel",
			tabIndex: active ? 0 : -1,
			"aria-labelledby": id && "".concat(id, "-tab-").concat(tabKey),
			"aria-hidden": !active,
			style,
			className: (0, import_classnames$14.default)(prefixCls, active && "".concat(prefixCls, "-active"), className),
			ref
		}, children);
	});
	TabPane_default = TabPane;
}));
var import_react$41, _excluded$10, _excluded2$1, TabNavListWrapper, Wrapper_default;
var init_Wrapper = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_objectWithoutProperties();
	import_react$41 = /* @__PURE__ */ __toESM(require_react());
	init_TabNavList();
	init_TabContext();
	init_TabPane();
	_excluded$10 = ["renderTabBar"], _excluded2$1 = ["label", "key"];
	TabNavListWrapper = function TabNavListWrapper$1(_ref) {
		var renderTabBar = _ref.renderTabBar, restProps = _objectWithoutProperties(_ref, _excluded$10);
		var tabs = import_react$41.useContext(TabContext_default).tabs;
		if (renderTabBar) return renderTabBar(_objectSpread2(_objectSpread2({}, restProps), {}, { panes: tabs.map(function(_ref2) {
			var label = _ref2.label, key = _ref2.key, restTabProps = _objectWithoutProperties(_ref2, _excluded2$1);
			return /* @__PURE__ */ import_react$41.createElement(TabPane_default, _extends({
				tab: label,
				key,
				tabKey: key
			}, restTabProps));
		}) }), TabNavList_default);
		return /* @__PURE__ */ import_react$41.createElement(TabNavList_default, restProps);
	};
	Wrapper_default = TabNavListWrapper;
}));
var import_classnames$13, import_react$40, _excluded$9, TabPanelList, TabPanelList_default;
var init_TabPanelList = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_objectWithoutProperties();
	init_defineProperty();
	import_classnames$13 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$7();
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
	init_TabContext();
	init_TabPane();
	_excluded$9 = [
		"key",
		"forceRender",
		"style",
		"className",
		"destroyInactiveTabPane"
	];
	TabPanelList = function TabPanelList$1(props) {
		var id = props.id, activeKey = props.activeKey, animated = props.animated, tabPosition = props.tabPosition, destroyInactiveTabPane = props.destroyInactiveTabPane;
		var _React$useContext = import_react$40.useContext(TabContext_default), prefixCls = _React$useContext.prefixCls, tabs = _React$useContext.tabs;
		var tabPaneAnimated = animated.tabPane;
		var tabPanePrefixCls = "".concat(prefixCls, "-tabpane");
		return /* @__PURE__ */ import_react$40.createElement("div", { className: (0, import_classnames$13.default)("".concat(prefixCls, "-content-holder")) }, /* @__PURE__ */ import_react$40.createElement("div", { className: (0, import_classnames$13.default)("".concat(prefixCls, "-content"), "".concat(prefixCls, "-content-").concat(tabPosition), _defineProperty({}, "".concat(prefixCls, "-content-animated"), tabPaneAnimated)) }, tabs.map(function(item) {
			var key = item.key, forceRender = item.forceRender, paneStyle = item.style, paneClassName = item.className, itemDestroyInactiveTabPane = item.destroyInactiveTabPane, restTabProps = _objectWithoutProperties(item, _excluded$9);
			var active = key === activeKey;
			return /* @__PURE__ */ import_react$40.createElement(es_default$5, _extends({
				key,
				visible: active,
				forceRender,
				removeOnLeave: !!(destroyInactiveTabPane || itemDestroyInactiveTabPane),
				leavedClassName: "".concat(tabPanePrefixCls, "-hidden")
			}, animated.tabPaneMotion), function(_ref, ref) {
				var motionStyle = _ref.style, motionClassName = _ref.className;
				return /* @__PURE__ */ import_react$40.createElement(TabPane_default, _extends({}, restTabProps, {
					prefixCls: tabPanePrefixCls,
					id,
					tabKey: key,
					animated: tabPaneAnimated,
					active,
					style: _objectSpread2(_objectSpread2({}, paneStyle), motionStyle),
					className: (0, import_classnames$13.default)(paneClassName, motionClassName),
					ref
				}));
			});
		})));
	};
	TabPanelList_default = TabPanelList;
}));
function useAnimateConfig() {
	var animated = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
		inkBar: true,
		tabPane: false
	};
	var mergedAnimated;
	if (animated === false) mergedAnimated = {
		inkBar: false,
		tabPane: false
	};
	else if (animated === true) mergedAnimated = {
		inkBar: true,
		tabPane: false
	};
	else mergedAnimated = _objectSpread2({ inkBar: true }, _typeof(animated) === "object" ? animated : {});
	if (mergedAnimated.tabPaneMotion && mergedAnimated.tabPane === void 0) mergedAnimated.tabPane = true;
	if (!mergedAnimated.tabPaneMotion && mergedAnimated.tabPane) mergedAnimated.tabPane = false;
	return mergedAnimated;
}
var init_useAnimateConfig = __esmMin((() => {
	init_typeof();
	init_objectSpread2();
	init_warning();
}));
var import_classnames$12, import_react$38, import_react$39, _excluded$8, uuid, Tabs, Tabs_default;
var init_Tabs = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_slicedToArray();
	init_typeof();
	init_objectWithoutProperties();
	import_classnames$12 = /* @__PURE__ */ __toESM(require_classnames());
	init_useMergedState();
	init_isMobile();
	import_react$38 = /* @__PURE__ */ __toESM(require_react());
	import_react$39 = /* @__PURE__ */ __toESM(require_react());
	init_TabContext();
	init_Wrapper();
	init_TabPanelList();
	init_useAnimateConfig();
	_excluded$8 = [
		"id",
		"prefixCls",
		"className",
		"items",
		"direction",
		"activeKey",
		"defaultActiveKey",
		"editable",
		"animated",
		"tabPosition",
		"tabBarGutter",
		"tabBarStyle",
		"tabBarExtraContent",
		"locale",
		"more",
		"destroyInactiveTabPane",
		"renderTabBar",
		"onChange",
		"onTabClick",
		"onTabScroll",
		"getPopupContainer",
		"popupClassName",
		"indicator"
	];
	uuid = 0;
	Tabs = /* @__PURE__ */ import_react$38.forwardRef(function(props, ref) {
		var id = props.id, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tabs" : _props$prefixCls, className = props.className, items = props.items, direction = props.direction, activeKey = props.activeKey, defaultActiveKey = props.defaultActiveKey, editable = props.editable, animated = props.animated, _props$tabPosition = props.tabPosition, tabPosition = _props$tabPosition === void 0 ? "top" : _props$tabPosition, tabBarGutter = props.tabBarGutter, tabBarStyle = props.tabBarStyle, tabBarExtraContent = props.tabBarExtraContent, locale = props.locale, more = props.more, destroyInactiveTabPane = props.destroyInactiveTabPane, renderTabBar = props.renderTabBar, onChange = props.onChange, onTabClick = props.onTabClick, onTabScroll = props.onTabScroll, getPopupContainer = props.getPopupContainer, popupClassName = props.popupClassName, indicator = props.indicator, restProps = _objectWithoutProperties(props, _excluded$8);
		var tabs = import_react$38.useMemo(function() {
			return (items || []).filter(function(item) {
				return item && _typeof(item) === "object" && "key" in item;
			});
		}, [items]);
		var rtl = direction === "rtl";
		var mergedAnimated = useAnimateConfig(animated);
		var _useState2 = _slicedToArray((0, import_react$39.useState)(false), 2), mobile = _useState2[0], setMobile = _useState2[1];
		(0, import_react$39.useEffect)(function() {
			setMobile(isMobile_default());
		}, []);
		var _useMergedState2 = _slicedToArray(useMergedState(function() {
			var _tabs$;
			return (_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key;
		}, {
			value: activeKey,
			defaultValue: defaultActiveKey
		}), 2), mergedActiveKey = _useMergedState2[0], setMergedActiveKey = _useMergedState2[1];
		var _useState4 = _slicedToArray((0, import_react$39.useState)(function() {
			return tabs.findIndex(function(tab) {
				return tab.key === mergedActiveKey;
			});
		}), 2), activeIndex = _useState4[0], setActiveIndex = _useState4[1];
		(0, import_react$39.useEffect)(function() {
			var newActiveIndex = tabs.findIndex(function(tab) {
				return tab.key === mergedActiveKey;
			});
			if (newActiveIndex === -1) {
				var _tabs$newActiveIndex;
				newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
				setMergedActiveKey((_tabs$newActiveIndex = tabs[newActiveIndex]) === null || _tabs$newActiveIndex === void 0 ? void 0 : _tabs$newActiveIndex.key);
			}
			setActiveIndex(newActiveIndex);
		}, [
			tabs.map(function(tab) {
				return tab.key;
			}).join("_"),
			mergedActiveKey,
			activeIndex
		]);
		var _useMergedState4 = _slicedToArray(useMergedState(null, { value: id }), 2), mergedId = _useMergedState4[0], setMergedId = _useMergedState4[1];
		(0, import_react$39.useEffect)(function() {
			if (!id) {
				setMergedId("rc-tabs-".concat(uuid));
				uuid += 1;
			}
		}, []);
		function onInternalTabClick(key, e) {
			onTabClick === null || onTabClick === void 0 || onTabClick(key, e);
			var isActiveChanged = key !== mergedActiveKey;
			setMergedActiveKey(key);
			if (isActiveChanged) onChange === null || onChange === void 0 || onChange(key);
		}
		var sharedProps = {
			id: mergedId,
			activeKey: mergedActiveKey,
			animated: mergedAnimated,
			tabPosition,
			rtl,
			mobile
		};
		var tabNavBarProps = _objectSpread2(_objectSpread2({}, sharedProps), {}, {
			editable,
			locale,
			more,
			tabBarGutter,
			onTabClick: onInternalTabClick,
			onTabScroll,
			extra: tabBarExtraContent,
			style: tabBarStyle,
			panes: null,
			getPopupContainer,
			popupClassName,
			indicator
		});
		return /* @__PURE__ */ import_react$38.createElement(TabContext_default.Provider, { value: {
			tabs,
			prefixCls
		} }, /* @__PURE__ */ import_react$38.createElement("div", _extends({
			ref,
			id,
			className: (0, import_classnames$12.default)(prefixCls, "".concat(prefixCls, "-").concat(tabPosition), _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-mobile"), mobile), "".concat(prefixCls, "-editable"), editable), "".concat(prefixCls, "-rtl"), rtl), className)
		}, restProps), /* @__PURE__ */ import_react$38.createElement(Wrapper_default, _extends({}, tabNavBarProps, { renderTabBar })), /* @__PURE__ */ import_react$38.createElement(TabPanelList_default, _extends({ destroyInactiveTabPane }, sharedProps, { animated: mergedAnimated }))));
	});
	Tabs_default = Tabs;
}));
var es_exports$2 = /* @__PURE__ */ __export({ default: () => es_default$4 }, 1);
var es_default$4;
var init_es$3 = __esmMin((() => {
	init_Tabs();
	es_default$4 = Tabs_default;
}));
function isString(str) {
	return typeof str === "string";
}
function Step(props) {
	var _classNames2, className = props.className, prefixCls = props.prefixCls, style = props.style, active = props.active, status = props.status, iconPrefix = props.iconPrefix, icon = props.icon;
	props.wrapperStyle;
	var stepNumber = props.stepNumber, disabled = props.disabled, description = props.description, title = props.title, subTitle = props.subTitle, progressDot = props.progressDot, stepIcon = props.stepIcon, tailContent = props.tailContent, icons = props.icons, stepIndex = props.stepIndex, onStepClick = props.onStepClick, onClick = props.onClick, render = props.render, restProps = _objectWithoutProperties(props, _excluded$7);
	var clickable = !!onStepClick && !disabled;
	var accessibilityProps = {};
	if (clickable) {
		accessibilityProps.role = "button";
		accessibilityProps.tabIndex = 0;
		accessibilityProps.onClick = function(e) {
			onClick === null || onClick === void 0 || onClick(e);
			onStepClick(stepIndex);
		};
		accessibilityProps.onKeyDown = function(e) {
			var which = e.which;
			if (which === KeyCode_default.ENTER || which === KeyCode_default.SPACE) onStepClick(stepIndex);
		};
	}
	var renderIconNode = function renderIconNode$1() {
		var _classNames;
		var iconNode;
		var iconClassName = (0, import_classnames$11.default)("".concat(prefixCls, "-icon"), "".concat(iconPrefix, "icon"), (_classNames = {}, _defineProperty(_classNames, "".concat(iconPrefix, "icon-").concat(icon), icon && isString(icon)), _defineProperty(_classNames, "".concat(iconPrefix, "icon-check"), !icon && status === "finish" && (icons && !icons.finish || !icons)), _defineProperty(_classNames, "".concat(iconPrefix, "icon-cross"), !icon && status === "error" && (icons && !icons.error || !icons)), _classNames));
		var iconDot = /* @__PURE__ */ import_react$37.createElement("span", { className: "".concat(prefixCls, "-icon-dot") });
		if (progressDot) if (typeof progressDot === "function") iconNode = /* @__PURE__ */ import_react$37.createElement("span", { className: "".concat(prefixCls, "-icon") }, progressDot(iconDot, {
			index: stepNumber - 1,
			status,
			title,
			description
		}));
		else iconNode = /* @__PURE__ */ import_react$37.createElement("span", { className: "".concat(prefixCls, "-icon") }, iconDot);
		else if (icon && !isString(icon)) iconNode = /* @__PURE__ */ import_react$37.createElement("span", { className: "".concat(prefixCls, "-icon") }, icon);
		else if (icons && icons.finish && status === "finish") iconNode = /* @__PURE__ */ import_react$37.createElement("span", { className: "".concat(prefixCls, "-icon") }, icons.finish);
		else if (icons && icons.error && status === "error") iconNode = /* @__PURE__ */ import_react$37.createElement("span", { className: "".concat(prefixCls, "-icon") }, icons.error);
		else if (icon || status === "finish" || status === "error") iconNode = /* @__PURE__ */ import_react$37.createElement("span", { className: iconClassName });
		else iconNode = /* @__PURE__ */ import_react$37.createElement("span", { className: "".concat(prefixCls, "-icon") }, stepNumber);
		if (stepIcon) iconNode = stepIcon({
			index: stepNumber - 1,
			status,
			title,
			description,
			node: iconNode
		});
		return iconNode;
	};
	var mergedStatus = status || "wait";
	var classString = (0, import_classnames$11.default)("".concat(prefixCls, "-item"), "".concat(prefixCls, "-item-").concat(mergedStatus), className, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-item-custom"), icon), _defineProperty(_classNames2, "".concat(prefixCls, "-item-active"), active), _defineProperty(_classNames2, "".concat(prefixCls, "-item-disabled"), disabled === true), _classNames2));
	var stepItemStyle = _objectSpread2({}, style);
	var stepNode = /* @__PURE__ */ import_react$37.createElement("div", _extends({}, restProps, {
		className: classString,
		style: stepItemStyle
	}), /* @__PURE__ */ import_react$37.createElement("div", _extends({ onClick }, accessibilityProps, { className: "".concat(prefixCls, "-item-container") }), /* @__PURE__ */ import_react$37.createElement("div", { className: "".concat(prefixCls, "-item-tail") }, tailContent), /* @__PURE__ */ import_react$37.createElement("div", { className: "".concat(prefixCls, "-item-icon") }, renderIconNode()), /* @__PURE__ */ import_react$37.createElement("div", { className: "".concat(prefixCls, "-item-content") }, /* @__PURE__ */ import_react$37.createElement("div", { className: "".concat(prefixCls, "-item-title") }, title, subTitle && /* @__PURE__ */ import_react$37.createElement("div", {
		title: typeof subTitle === "string" ? subTitle : void 0,
		className: "".concat(prefixCls, "-item-subtitle")
	}, subTitle)), description && /* @__PURE__ */ import_react$37.createElement("div", { className: "".concat(prefixCls, "-item-description") }, description))));
	if (render) stepNode = render(stepNode) || null;
	return stepNode;
}
var import_react$37, import_classnames$11, _excluded$7, Step_default;
var init_Step = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_defineProperty();
	init_objectWithoutProperties();
	import_react$37 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$11 = /* @__PURE__ */ __toESM(require_classnames());
	init_KeyCode();
	_excluded$7 = [
		"className",
		"prefixCls",
		"style",
		"active",
		"status",
		"iconPrefix",
		"icon",
		"wrapperStyle",
		"stepNumber",
		"disabled",
		"description",
		"title",
		"subTitle",
		"progressDot",
		"stepIcon",
		"tailContent",
		"icons",
		"stepIndex",
		"onStepClick",
		"onClick",
		"render"
	];
	Step_default = Step;
}));
function Steps(props) {
	var _classNames, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-steps" : _props$prefixCls, _props$style = props.style, style = _props$style === void 0 ? {} : _props$style, className = props.className;
	props.children;
	var _props$direction = props.direction, direction = _props$direction === void 0 ? "horizontal" : _props$direction, _props$type = props.type, type = _props$type === void 0 ? "default" : _props$type, _props$labelPlacement = props.labelPlacement, labelPlacement = _props$labelPlacement === void 0 ? "horizontal" : _props$labelPlacement, _props$iconPrefix = props.iconPrefix, iconPrefix = _props$iconPrefix === void 0 ? "rc" : _props$iconPrefix, _props$status = props.status, status = _props$status === void 0 ? "process" : _props$status, size = props.size, _props$current = props.current, current = _props$current === void 0 ? 0 : _props$current, _props$progressDot = props.progressDot, progressDot = _props$progressDot === void 0 ? false : _props$progressDot, stepIcon = props.stepIcon, _props$initial = props.initial, initial = _props$initial === void 0 ? 0 : _props$initial, icons = props.icons, onChange = props.onChange, itemRender = props.itemRender, _props$items = props.items, items = _props$items === void 0 ? [] : _props$items, restProps = _objectWithoutProperties(props, _excluded$6);
	var isNav = type === "navigation";
	var isInline = type === "inline";
	var mergedProgressDot = isInline || progressDot;
	var mergedDirection = isInline ? "horizontal" : direction;
	var mergedSize = isInline ? void 0 : size;
	var adjustedLabelPlacement = mergedProgressDot ? "vertical" : labelPlacement;
	var classString = (0, import_classnames$10.default)(prefixCls, "".concat(prefixCls, "-").concat(mergedDirection), className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(mergedSize), mergedSize), _defineProperty(_classNames, "".concat(prefixCls, "-label-").concat(adjustedLabelPlacement), mergedDirection === "horizontal"), _defineProperty(_classNames, "".concat(prefixCls, "-dot"), !!mergedProgressDot), _defineProperty(_classNames, "".concat(prefixCls, "-navigation"), isNav), _defineProperty(_classNames, "".concat(prefixCls, "-inline"), isInline), _classNames));
	var onStepClick = function onStepClick$1(next) {
		if (onChange && current !== next) onChange(next);
	};
	return /* @__PURE__ */ import_react$36.createElement("div", _extends({
		className: classString,
		style
	}, restProps), items.filter(function(item) {
		return item;
	}).map(function renderStep(item, index) {
		var mergedItem = _objectSpread2({}, item);
		var stepNumber = initial + index;
		if (status === "error" && index === current - 1) mergedItem.className = "".concat(prefixCls, "-next-error");
		if (!mergedItem.status) if (stepNumber === current) mergedItem.status = status;
		else if (stepNumber < current) mergedItem.status = "finish";
		else mergedItem.status = "wait";
		if (isInline) {
			mergedItem.icon = void 0;
			mergedItem.subTitle = void 0;
		}
		if (!mergedItem.render && itemRender) mergedItem.render = function(stepItem) {
			return itemRender(mergedItem, stepItem);
		};
		return /* @__PURE__ */ import_react$36.createElement(Step_default, _extends({}, mergedItem, {
			active: stepNumber === current,
			stepNumber: stepNumber + 1,
			stepIndex: stepNumber,
			key: stepNumber,
			prefixCls,
			iconPrefix,
			wrapperStyle: style,
			progressDot: mergedProgressDot,
			stepIcon,
			icons,
			onStepClick: onChange && onStepClick
		}));
	}));
}
var import_classnames$10, import_react$36, _excluded$6, Steps_default;
var init_Steps = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_defineProperty();
	init_objectWithoutProperties();
	import_classnames$10 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
	init_Step();
	_excluded$6 = [
		"prefixCls",
		"style",
		"className",
		"children",
		"direction",
		"type",
		"labelPlacement",
		"iconPrefix",
		"status",
		"size",
		"current",
		"progressDot",
		"stepIcon",
		"initial",
		"icons",
		"onChange",
		"itemRender",
		"items"
	];
	Steps.Step = Step_default;
	Steps_default = Steps;
}));
var es_exports$1 = /* @__PURE__ */ __export({
	Step: () => Step_default,
	default: () => es_default$3
}, 1);
var es_default$3;
var init_es$2 = __esmMin((() => {
	init_Steps();
	init_Step();
	es_default$3 = Steps_default;
}));
var EXPAND_COLUMN, INTERNAL_HOOKS;
var init_constant = __esmMin((() => {
	EXPAND_COLUMN = {};
	INTERNAL_HOOKS = "rc-table-internal-hook";
}));
function createContext(defaultValue) {
	var Context = /* @__PURE__ */ import_react$35.createContext(void 0);
	return {
		Context,
		Provider: function Provider(_ref) {
			var value = _ref.value, children = _ref.children;
			var valueRef = import_react$35.useRef(value);
			valueRef.current = value;
			var context = _slicedToArray(import_react$35.useState(function() {
				return {
					getValue: function getValue() {
						return valueRef.current;
					},
					listeners: /* @__PURE__ */ new Set()
				};
			}), 1)[0];
			useLayoutEffect_default(function() {
				(0, import_react_dom.unstable_batchedUpdates)(function() {
					context.listeners.forEach(function(listener) {
						listener(value);
					});
				});
			}, [value]);
			return /* @__PURE__ */ import_react$35.createElement(Context.Provider, { value: context }, children);
		},
		defaultValue
	};
}
function useContext(holder, selector) {
	var eventSelector = useEvent(typeof selector === "function" ? selector : function(ctx) {
		if (selector === void 0) return ctx;
		if (!Array.isArray(selector)) return ctx[selector];
		var obj = {};
		selector.forEach(function(key) {
			obj[key] = ctx[key];
		});
		return obj;
	});
	var context = import_react$35.useContext(holder === null || holder === void 0 ? void 0 : holder.Context);
	var _ref2 = context || {}, listeners = _ref2.listeners, getValue = _ref2.getValue;
	var valueRef = import_react$35.useRef();
	valueRef.current = eventSelector(context ? getValue() : holder === null || holder === void 0 ? void 0 : holder.defaultValue);
	var forceUpdate = _slicedToArray(import_react$35.useState({}), 2)[1];
	useLayoutEffect_default(function() {
		if (!context) return;
		function trigger(nextValue) {
			var nextSelectorValue = eventSelector(nextValue);
			if (!isEqual_default(valueRef.current, nextSelectorValue, true)) forceUpdate({});
		}
		listeners.add(trigger);
		return function() {
			listeners.delete(trigger);
		};
	}, [context]);
	return valueRef.current;
}
var import_react$35, import_react_dom;
var init_context$1 = __esmMin((() => {
	init_slicedToArray();
	init_useEvent();
	init_useLayoutEffect();
	init_isEqual();
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = require_react_dom();
}));
function createImmutable() {
	var ImmutableContext = /* @__PURE__ */ import_react$34.createContext(null);
	function useImmutableMark$2() {
		return import_react$34.useContext(ImmutableContext);
	}
	function makeImmutable$2(Component, shouldTriggerRender) {
		var refAble = supportRef(Component);
		var ImmutableComponent = function ImmutableComponent$1(props, ref) {
			var refProps = refAble ? { ref } : {};
			var renderTimesRef = import_react$34.useRef(0);
			var prevProps = import_react$34.useRef(props);
			if (useImmutableMark$2() !== null) return /* @__PURE__ */ import_react$34.createElement(Component, _extends({}, props, refProps));
			if (!shouldTriggerRender || shouldTriggerRender(prevProps.current, props)) renderTimesRef.current += 1;
			prevProps.current = props;
			return /* @__PURE__ */ import_react$34.createElement(ImmutableContext.Provider, { value: renderTimesRef.current }, /* @__PURE__ */ import_react$34.createElement(Component, _extends({}, props, refProps)));
		};
		return refAble ? /* @__PURE__ */ import_react$34.forwardRef(ImmutableComponent) : ImmutableComponent;
	}
	function responseImmutable$2(Component, propsAreEqual) {
		var refAble = supportRef(Component);
		var ImmutableComponent = function ImmutableComponent$1(props, ref) {
			var refProps = refAble ? { ref } : {};
			useImmutableMark$2();
			return /* @__PURE__ */ import_react$34.createElement(Component, _extends({}, props, refProps));
		};
		return refAble ? /* @__PURE__ */ import_react$34.memo(/* @__PURE__ */ import_react$34.forwardRef(ImmutableComponent), propsAreEqual) : /* @__PURE__ */ import_react$34.memo(ImmutableComponent, propsAreEqual);
	}
	return {
		makeImmutable: makeImmutable$2,
		responseImmutable: responseImmutable$2,
		useImmutableMark: useImmutableMark$2
	};
}
var import_react$34;
var init_Immutable = __esmMin((() => {
	init_extends();
	init_ref();
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
})), _createImmutable$1;
var init_es$1 = __esmMin((() => {
	init_context$1();
	init_Immutable();
	_createImmutable$1 = createImmutable(), _createImmutable$1.makeImmutable, _createImmutable$1.responseImmutable, _createImmutable$1.useImmutableMark;
}));
var _createImmutable, makeImmutable, responseImmutable, useImmutableMark, TableContext, TableContext_default;
var init_TableContext = __esmMin((() => {
	init_es$1();
	_createImmutable = createImmutable(), makeImmutable = _createImmutable.makeImmutable, responseImmutable = _createImmutable.responseImmutable, useImmutableMark = _createImmutable.useImmutableMark;
	TableContext = createContext();
	TableContext_default = TableContext;
}));
var init_useRenderTimes = __esmMin((() => {
	require_react();
}));
var import_react$32, PerfContext, PerfContext_default;
var init_PerfContext = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	PerfContext = /* @__PURE__ */ import_react$32.createContext({ renderWithProps: false });
	PerfContext_default = PerfContext;
}));
function toArray$1(arr) {
	if (arr === void 0 || arr === null) return [];
	return Array.isArray(arr) ? arr : [arr];
}
function getColumnsKey(columns) {
	var columnKeys = [];
	var keys = {};
	columns.forEach(function(column) {
		var _ref = column || {}, key = _ref.key, dataIndex = _ref.dataIndex;
		var mergedKey = key || toArray$1(dataIndex).join("-") || INTERNAL_KEY_PREFIX;
		while (keys[mergedKey]) mergedKey = "".concat(mergedKey, "_next");
		keys[mergedKey] = true;
		columnKeys.push(mergedKey);
	});
	return columnKeys;
}
function validateValue(val) {
	return val !== null && val !== void 0;
}
function validNumberValue(value) {
	return typeof value === "number" && !Number.isNaN(value);
}
var INTERNAL_KEY_PREFIX;
var init_valueUtil = __esmMin((() => {
	INTERNAL_KEY_PREFIX = "RC_TABLE_KEY";
}));
function isRenderCell(data) {
	return data && _typeof(data) === "object" && !Array.isArray(data) && !/* @__PURE__ */ import_react$31.isValidElement(data);
}
function useCellRender(record, dataIndex, renderIndex, children, render, shouldCellUpdate) {
	var perfRecord = import_react$31.useContext(PerfContext_default);
	return useMemo$1(function() {
		if (validateValue(children)) return [children];
		var value = get(record, dataIndex === null || dataIndex === void 0 || dataIndex === "" ? [] : Array.isArray(dataIndex) ? dataIndex : [dataIndex]);
		var returnChildNode = value;
		var returnCellProps = void 0;
		if (render) {
			var renderData = render(value, record, renderIndex);
			if (isRenderCell(renderData)) {
				returnChildNode = renderData.children;
				returnCellProps = renderData.props;
				perfRecord.renderWithProps = true;
			} else returnChildNode = renderData;
		}
		return [returnChildNode, returnCellProps];
	}, [
		useImmutableMark(),
		record,
		children,
		dataIndex,
		render,
		renderIndex
	], function(prev, next) {
		if (shouldCellUpdate) {
			var prevRecord = _slicedToArray(prev, 2)[1];
			var nextRecord = _slicedToArray(next, 2)[1];
			return shouldCellUpdate(nextRecord, prevRecord);
		}
		if (perfRecord.renderWithProps) return true;
		return !isEqual_default(prev, next, true);
	});
}
var import_react$31;
var init_useCellRender = __esmMin((() => {
	init_slicedToArray();
	init_typeof();
	init_useMemo();
	init_isEqual();
	init_get();
	init_warning();
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	init_PerfContext();
	init_valueUtil();
	init_TableContext();
}));
function inHoverRange(cellStartRow, cellRowSpan, startRow, endRow) {
	var cellEndRow = cellStartRow + cellRowSpan - 1;
	return cellStartRow <= endRow && cellEndRow >= startRow;
}
function useHoverState(rowIndex, rowSpan) {
	return useContext(TableContext_default, function(ctx) {
		return [inHoverRange(rowIndex, rowSpan || 1, ctx.hoverStartRow, ctx.hoverEndRow), ctx.onHover];
	});
}
var init_useHoverState = __esmMin((() => {
	init_es$1();
	init_TableContext();
}));
function Cell(props) {
	var _ref2, _ref3, _legacyCellProps$colS, _ref4, _ref5, _legacyCellProps$rowS, _additionalProps$titl, _classNames;
	var Component = props.component, children = props.children, ellipsis = props.ellipsis, scope = props.scope, prefixCls = props.prefixCls, className = props.className, align = props.align, record = props.record, render = props.render, dataIndex = props.dataIndex, renderIndex = props.renderIndex, shouldCellUpdate = props.shouldCellUpdate, index = props.index, rowType = props.rowType, colSpan = props.colSpan, rowSpan = props.rowSpan, fixLeft = props.fixLeft, fixRight = props.fixRight, firstFixLeft = props.firstFixLeft, lastFixLeft = props.lastFixLeft, firstFixRight = props.firstFixRight, lastFixRight = props.lastFixRight, appendNode = props.appendNode, _props$additionalProp = props.additionalProps, additionalProps = _props$additionalProp === void 0 ? {} : _props$additionalProp, isSticky = props.isSticky;
	var cellPrefixCls = "".concat(prefixCls, "-cell");
	var _useContext = useContext(TableContext_default, [
		"supportSticky",
		"allColumnsFixedLeft",
		"rowHoverable"
	]), supportSticky = _useContext.supportSticky, allColumnsFixedLeft = _useContext.allColumnsFixedLeft, rowHoverable = _useContext.rowHoverable;
	var _useCellRender2 = _slicedToArray(useCellRender(record, dataIndex, renderIndex, children, render, shouldCellUpdate), 2), childNode = _useCellRender2[0], legacyCellProps = _useCellRender2[1];
	var fixedStyle = {};
	var isFixLeft = typeof fixLeft === "number" && supportSticky;
	var isFixRight = typeof fixRight === "number" && supportSticky;
	if (isFixLeft) {
		fixedStyle.position = "sticky";
		fixedStyle.left = fixLeft;
	}
	if (isFixRight) {
		fixedStyle.position = "sticky";
		fixedStyle.right = fixRight;
	}
	var mergedColSpan = (_ref2 = (_ref3 = (_legacyCellProps$colS = legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.colSpan) !== null && _legacyCellProps$colS !== void 0 ? _legacyCellProps$colS : additionalProps.colSpan) !== null && _ref3 !== void 0 ? _ref3 : colSpan) !== null && _ref2 !== void 0 ? _ref2 : 1;
	var mergedRowSpan = (_ref4 = (_ref5 = (_legacyCellProps$rowS = legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.rowSpan) !== null && _legacyCellProps$rowS !== void 0 ? _legacyCellProps$rowS : additionalProps.rowSpan) !== null && _ref5 !== void 0 ? _ref5 : rowSpan) !== null && _ref4 !== void 0 ? _ref4 : 1;
	var _useHoverState2 = _slicedToArray(useHoverState(index, mergedRowSpan), 2), hovering = _useHoverState2[0], onHover = _useHoverState2[1];
	var onMouseEnter = useEvent(function(event) {
		var _additionalProps$onMo;
		if (record) onHover(index, index + mergedRowSpan - 1);
		additionalProps === null || additionalProps === void 0 || (_additionalProps$onMo = additionalProps.onMouseEnter) === null || _additionalProps$onMo === void 0 || _additionalProps$onMo.call(additionalProps, event);
	});
	var onMouseLeave = useEvent(function(event) {
		var _additionalProps$onMo2;
		if (record) onHover(-1, -1);
		additionalProps === null || additionalProps === void 0 || (_additionalProps$onMo2 = additionalProps.onMouseLeave) === null || _additionalProps$onMo2 === void 0 || _additionalProps$onMo2.call(additionalProps, event);
	});
	if (mergedColSpan === 0 || mergedRowSpan === 0) return null;
	var title = (_additionalProps$titl = additionalProps.title) !== null && _additionalProps$titl !== void 0 ? _additionalProps$titl : getTitleFromCellRenderChildren({
		rowType,
		ellipsis,
		children: childNode
	});
	var mergedClassName = (0, import_classnames$9.default)(cellPrefixCls, className, (_classNames = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left"), isFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-first"), firstFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-last"), lastFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-all"), lastFixLeft && allColumnsFixedLeft && supportSticky), "".concat(cellPrefixCls, "-fix-right"), isFixRight && supportSticky), "".concat(cellPrefixCls, "-fix-right-first"), firstFixRight && supportSticky), "".concat(cellPrefixCls, "-fix-right-last"), lastFixRight && supportSticky), "".concat(cellPrefixCls, "-ellipsis"), ellipsis), "".concat(cellPrefixCls, "-with-append"), appendNode), "".concat(cellPrefixCls, "-fix-sticky"), (isFixLeft || isFixRight) && isSticky && supportSticky), _defineProperty(_classNames, "".concat(cellPrefixCls, "-row-hover"), !legacyCellProps && hovering)), additionalProps.className, legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.className);
	var alignStyle = {};
	if (align) alignStyle.textAlign = align;
	var mergedStyle = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.style), fixedStyle), alignStyle), additionalProps.style);
	var mergedChildNode = childNode;
	if (_typeof(mergedChildNode) === "object" && !Array.isArray(mergedChildNode) && !/* @__PURE__ */ import_react$30.isValidElement(mergedChildNode)) mergedChildNode = null;
	if (ellipsis && (lastFixLeft || firstFixRight)) mergedChildNode = /* @__PURE__ */ import_react$30.createElement("span", { className: "".concat(cellPrefixCls, "-content") }, mergedChildNode);
	return /* @__PURE__ */ import_react$30.createElement(Component, _extends({}, legacyCellProps, additionalProps, {
		className: mergedClassName,
		style: mergedStyle,
		title,
		scope,
		onMouseEnter: rowHoverable ? onMouseEnter : void 0,
		onMouseLeave: rowHoverable ? onMouseLeave : void 0,
		colSpan: mergedColSpan !== 1 ? mergedColSpan : null,
		rowSpan: mergedRowSpan !== 1 ? mergedRowSpan : null
	}), appendNode, mergedChildNode);
}
var import_classnames$9, import_react$30, getTitleFromCellRenderChildren, Cell_default;
var init_Cell$1 = __esmMin((() => {
	init_extends();
	init_typeof();
	init_objectSpread2();
	init_defineProperty();
	init_slicedToArray();
	init_es$1();
	import_classnames$9 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_TableContext();
	init_useRenderTimes();
	init_useCellRender();
	init_useHoverState();
	init_es$8();
	getTitleFromCellRenderChildren = function getTitleFromCellRenderChildren$1(_ref) {
		var ellipsis = _ref.ellipsis, rowType = _ref.rowType, children = _ref.children;
		var title;
		var ellipsisConfig = ellipsis === true ? { showTitle: true } : ellipsis;
		if (ellipsisConfig && (ellipsisConfig.showTitle || rowType === "header")) {
			if (typeof children === "string" || typeof children === "number") title = children.toString();
			else if (/* @__PURE__ */ import_react$30.isValidElement(children) && typeof children.props.children === "string") title = children.props.children;
		}
		return title;
	};
	Cell_default = /* @__PURE__ */ import_react$30.memo(Cell);
}));
function getCellFixedInfo(colStart, colEnd, columns, stickyOffsets, direction) {
	var startColumn = columns[colStart] || {};
	var endColumn = columns[colEnd] || {};
	var fixLeft;
	var fixRight;
	if (startColumn.fixed === "left") fixLeft = stickyOffsets.left[direction === "rtl" ? colEnd : colStart];
	else if (endColumn.fixed === "right") fixRight = stickyOffsets.right[direction === "rtl" ? colStart : colEnd];
	var lastFixLeft = false;
	var firstFixRight = false;
	var lastFixRight = false;
	var firstFixLeft = false;
	var nextColumn = columns[colEnd + 1];
	var prevColumn = columns[colStart - 1];
	var canLastFix = nextColumn && !nextColumn.fixed || prevColumn && !prevColumn.fixed || columns.every(function(col) {
		return col.fixed === "left";
	});
	if (direction === "rtl") {
		if (fixLeft !== void 0) firstFixLeft = !(prevColumn && prevColumn.fixed === "left") && canLastFix;
		else if (fixRight !== void 0) lastFixRight = !(nextColumn && nextColumn.fixed === "right") && canLastFix;
	} else if (fixLeft !== void 0) lastFixLeft = !(nextColumn && nextColumn.fixed === "left") && canLastFix;
	else if (fixRight !== void 0) firstFixRight = !(prevColumn && prevColumn.fixed === "right") && canLastFix;
	return {
		fixLeft,
		fixRight,
		lastFixLeft,
		firstFixRight,
		lastFixRight,
		firstFixLeft,
		isSticky: stickyOffsets.isSticky
	};
}
var init_fixUtil = __esmMin((() => {}));
var import_react$29, SummaryContext, SummaryContext_default;
var init_SummaryContext = __esmMin((() => {
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	SummaryContext = /* @__PURE__ */ import_react$29.createContext({});
	SummaryContext_default = SummaryContext;
}));
function SummaryCell(_ref) {
	var className = _ref.className, index = _ref.index, children = _ref.children, _ref$colSpan = _ref.colSpan, colSpan = _ref$colSpan === void 0 ? 1 : _ref$colSpan, rowSpan = _ref.rowSpan, align = _ref.align;
	var _useContext = useContext(TableContext_default, ["prefixCls", "direction"]), prefixCls = _useContext.prefixCls, direction = _useContext.direction;
	var _React$useContext = import_react$28.useContext(SummaryContext_default), scrollColumnIndex = _React$useContext.scrollColumnIndex, stickyOffsets = _React$useContext.stickyOffsets, flattenColumns = _React$useContext.flattenColumns;
	var mergedColSpan = index + colSpan - 1 + 1 === scrollColumnIndex ? colSpan + 1 : colSpan;
	var fixedInfo = getCellFixedInfo(index, index + mergedColSpan - 1, flattenColumns, stickyOffsets, direction);
	return /* @__PURE__ */ import_react$28.createElement(Cell_default, _extends({
		className,
		index,
		component: "td",
		prefixCls,
		record: null,
		dataIndex: null,
		align,
		colSpan: mergedColSpan,
		rowSpan,
		render: function render() {
			return children;
		}
	}, fixedInfo));
}
var import_react$28;
var init_Cell = __esmMin((() => {
	init_extends();
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_Cell$1();
	init_TableContext();
	init_es$1();
	init_fixUtil();
	init_SummaryContext();
}));
function FooterRow(_ref) {
	var children = _ref.children, props = _objectWithoutProperties(_ref, _excluded$5);
	return /* @__PURE__ */ import_react$27.createElement("tr", props, children);
}
var import_react$27, _excluded$5;
var init_Row = __esmMin((() => {
	init_objectWithoutProperties();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	_excluded$5 = ["children"];
}));
function Summary(_ref) {
	return _ref.children;
}
var Summary_default;
var init_Summary = __esmMin((() => {
	init_Cell();
	init_Row();
	Summary.Row = FooterRow;
	Summary.Cell = SummaryCell;
	Summary_default = Summary;
}));
function Footer(props) {
	var children = props.children, stickyOffsets = props.stickyOffsets, flattenColumns = props.flattenColumns;
	var prefixCls = useContext(TableContext_default, "prefixCls");
	var lastColumnIndex = flattenColumns.length - 1;
	var scrollColumn = flattenColumns[lastColumnIndex];
	var summaryContext = import_react$26.useMemo(function() {
		return {
			stickyOffsets,
			flattenColumns,
			scrollColumnIndex: scrollColumn !== null && scrollColumn !== void 0 && scrollColumn.scrollbar ? lastColumnIndex : null
		};
	}, [
		scrollColumn,
		flattenColumns,
		lastColumnIndex,
		stickyOffsets
	]);
	return /* @__PURE__ */ import_react$26.createElement(SummaryContext_default.Provider, { value: summaryContext }, /* @__PURE__ */ import_react$26.createElement("tfoot", { className: "".concat(prefixCls, "-summary") }, children));
}
var import_react$26, Footer_default, FooterComponents;
var init_Footer = __esmMin((() => {
	init_es$1();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	init_TableContext();
	init_useRenderTimes();
	init_Summary();
	init_SummaryContext();
	Footer_default = responseImmutable(Footer);
	FooterComponents = Summary_default;
}));
/* istanbul ignore next */
function Column(_) {
	return null;
}
var Column_default;
var init_Column = __esmMin((() => {
	Column_default = Column;
}));
/* istanbul ignore next */
function ColumnGroup(_) {
	return null;
}
var ColumnGroup_default;
var init_ColumnGroup = __esmMin((() => {
	ColumnGroup_default = ColumnGroup;
}));
function fillRecords(list, record, indent, childrenColumnName, expandedKeys, getRowKey, index) {
	var key = getRowKey(record, index);
	list.push({
		record,
		indent,
		index,
		rowKey: key
	});
	var expanded = expandedKeys === null || expandedKeys === void 0 ? void 0 : expandedKeys.has(key);
	if (record && Array.isArray(record[childrenColumnName]) && expanded) for (var i = 0; i < record[childrenColumnName].length; i += 1) fillRecords(list, record[childrenColumnName][i], indent + 1, childrenColumnName, expandedKeys, getRowKey, i);
}
function useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey) {
	return import_react$25.useMemo(function() {
		if (expandedKeys !== null && expandedKeys !== void 0 && expandedKeys.size) {
			var list = [];
			for (var i = 0; i < (data === null || data === void 0 ? void 0 : data.length); i += 1) {
				var record = data[i];
				fillRecords(list, record, 0, childrenColumnName, expandedKeys, getRowKey, i);
			}
			return list;
		}
		return data === null || data === void 0 ? void 0 : data.map(function(item, index) {
			return {
				record: item,
				indent: 0,
				index,
				rowKey: getRowKey(item, index)
			};
		});
	}, [
		data,
		childrenColumnName,
		expandedKeys,
		getRowKey
	]);
}
var import_react$25;
var init_useFlattenRecords = __esmMin((() => {
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
}));
function useRowInfo(record, rowKey, recordIndex, indent) {
	var context = useContext(TableContext_default, [
		"prefixCls",
		"fixedInfoList",
		"flattenColumns",
		"expandableType",
		"expandRowByClick",
		"onTriggerExpand",
		"rowClassName",
		"expandedRowClassName",
		"indentSize",
		"expandIcon",
		"expandedRowRender",
		"expandIconColumnIndex",
		"expandedKeys",
		"childrenColumnName",
		"rowExpandable",
		"onRow"
	]);
	var flattenColumns = context.flattenColumns, expandableType = context.expandableType, expandedKeys = context.expandedKeys, childrenColumnName = context.childrenColumnName, onTriggerExpand = context.onTriggerExpand, rowExpandable = context.rowExpandable, onRow = context.onRow, expandRowByClick = context.expandRowByClick, rowClassName = context.rowClassName;
	var nestExpandable = expandableType === "nest";
	var rowSupportExpand = expandableType === "row" && (!rowExpandable || rowExpandable(record));
	var mergedExpandable = rowSupportExpand || nestExpandable;
	var expanded = expandedKeys && expandedKeys.has(rowKey);
	var hasNestChildren = childrenColumnName && record && record[childrenColumnName];
	var onInternalTriggerExpand = useEvent(onTriggerExpand);
	var rowProps = onRow === null || onRow === void 0 ? void 0 : onRow(record, recordIndex);
	var onRowClick = rowProps === null || rowProps === void 0 ? void 0 : rowProps.onClick;
	var onClick = function onClick$1(event) {
		if (expandRowByClick && mergedExpandable) onTriggerExpand(record, event);
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
		onRowClick === null || onRowClick === void 0 || onRowClick.apply(void 0, [event].concat(args));
	};
	var computeRowClassName;
	if (typeof rowClassName === "string") computeRowClassName = rowClassName;
	else if (typeof rowClassName === "function") computeRowClassName = rowClassName(record, recordIndex, indent);
	var columnsKey = getColumnsKey(flattenColumns);
	return _objectSpread2(_objectSpread2({}, context), {}, {
		columnsKey,
		nestExpandable,
		expanded,
		hasNestChildren,
		record,
		onTriggerExpand: onInternalTriggerExpand,
		rowSupportExpand,
		expandable: mergedExpandable,
		rowProps: _objectSpread2(_objectSpread2({}, rowProps), {}, {
			className: (0, import_classnames$8.default)(computeRowClassName, rowProps === null || rowProps === void 0 ? void 0 : rowProps.className),
			onClick
		})
	});
}
var import_classnames$8;
var init_useRowInfo = __esmMin((() => {
	init_objectSpread2();
	init_es$1();
	init_TableContext();
	init_valueUtil();
	init_es$8();
	import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
}));
function ExpandedRow(props) {
	var prefixCls = props.prefixCls, children = props.children, Component = props.component, cellComponent = props.cellComponent, className = props.className, expanded = props.expanded, colSpan = props.colSpan, isEmpty = props.isEmpty, _props$stickyOffset = props.stickyOffset, stickyOffset = _props$stickyOffset === void 0 ? 0 : _props$stickyOffset;
	var _useContext = useContext(TableContext_default, [
		"scrollbarSize",
		"fixHeader",
		"fixColumn",
		"componentWidth",
		"horizonScroll"
	]), scrollbarSize = _useContext.scrollbarSize, fixHeader = _useContext.fixHeader, fixColumn = _useContext.fixColumn, componentWidth = _useContext.componentWidth, horizonScroll = _useContext.horizonScroll;
	var contentNode = children;
	if (isEmpty ? horizonScroll && componentWidth : fixColumn) contentNode = /* @__PURE__ */ import_react$24.createElement("div", {
		style: {
			width: componentWidth - stickyOffset - (fixHeader && !isEmpty ? scrollbarSize : 0),
			position: "sticky",
			left: stickyOffset,
			overflow: "hidden"
		},
		className: "".concat(prefixCls, "-expanded-row-fixed")
	}, contentNode);
	return /* @__PURE__ */ import_react$24.createElement(Component, {
		className,
		style: { display: expanded ? null : "none" }
	}, /* @__PURE__ */ import_react$24.createElement(Cell_default, {
		component: cellComponent,
		prefixCls,
		colSpan
	}, contentNode));
}
var import_react$24, ExpandedRow_default;
var init_ExpandedRow = __esmMin((() => {
	init_es$1();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_Cell$1();
	init_TableContext();
	init_useRenderTimes();
	ExpandedRow_default = ExpandedRow;
}));
function renderExpandIcon(_ref) {
	var prefixCls = _ref.prefixCls, record = _ref.record, onExpand = _ref.onExpand, expanded = _ref.expanded, expandable = _ref.expandable;
	var expandClassName = "".concat(prefixCls, "-row-expand-icon");
	if (!expandable) return /* @__PURE__ */ import_react$23.createElement("span", { className: (0, import_classnames$7.default)(expandClassName, "".concat(prefixCls, "-row-spaced")) });
	return /* @__PURE__ */ import_react$23.createElement("span", {
		className: (0, import_classnames$7.default)(expandClassName, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-row-expanded"), expanded), "".concat(prefixCls, "-row-collapsed"), !expanded)),
		onClick: function onClick(event) {
			onExpand(record, event);
			event.stopPropagation();
		}
	});
}
function findAllChildrenKeys(data, getRowKey, childrenColumnName) {
	var keys = [];
	function dig(list) {
		(list || []).forEach(function(item, index) {
			keys.push(getRowKey(item, index));
			dig(item[childrenColumnName]);
		});
	}
	dig(data);
	return keys;
}
function computedExpandedClassName(cls, record, index, indent) {
	if (typeof cls === "string") return cls;
	if (typeof cls === "function") return cls(record, index, indent);
	return "";
}
var import_react$23, import_classnames$7;
var init_expandUtil = __esmMin((() => {
	init_defineProperty();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames());
}));
function getCellProps(rowInfo, column, colIndex, indent, index) {
	var _column$onCell;
	var rowKeys = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
	var expandedRowOffset = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0;
	var record = rowInfo.record, prefixCls = rowInfo.prefixCls, columnsKey = rowInfo.columnsKey, fixedInfoList = rowInfo.fixedInfoList, expandIconColumnIndex = rowInfo.expandIconColumnIndex, nestExpandable = rowInfo.nestExpandable, indentSize = rowInfo.indentSize, expandIcon = rowInfo.expandIcon, expanded = rowInfo.expanded, hasNestChildren = rowInfo.hasNestChildren, onTriggerExpand = rowInfo.onTriggerExpand, expandable = rowInfo.expandable, expandedKeys = rowInfo.expandedKeys;
	var key = columnsKey[colIndex];
	var fixedInfo = fixedInfoList[colIndex];
	var appendCellNode;
	if (colIndex === (expandIconColumnIndex || 0) && nestExpandable) appendCellNode = /* @__PURE__ */ import_react$22.createElement(import_react$22.Fragment, null, /* @__PURE__ */ import_react$22.createElement("span", {
		style: { paddingLeft: "".concat(indentSize * indent, "px") },
		className: "".concat(prefixCls, "-row-indent indent-level-").concat(indent)
	}), expandIcon({
		prefixCls,
		expanded,
		expandable: hasNestChildren,
		record,
		onExpand: onTriggerExpand
	}));
	var additionalCellProps = ((_column$onCell = column.onCell) === null || _column$onCell === void 0 ? void 0 : _column$onCell.call(column, record, index)) || {};
	if (expandedRowOffset) {
		var _additionalCellProps$ = additionalCellProps.rowSpan, rowSpan = _additionalCellProps$ === void 0 ? 1 : _additionalCellProps$;
		if (expandable && rowSpan && colIndex < expandedRowOffset) {
			var currentRowSpan = rowSpan;
			for (var i = index; i < index + rowSpan; i += 1) {
				var rowKey = rowKeys[i];
				if (expandedKeys.has(rowKey)) currentRowSpan += 1;
			}
			additionalCellProps.rowSpan = currentRowSpan;
		}
	}
	return {
		key,
		fixedInfo,
		appendCellNode,
		additionalCellProps
	};
}
function BodyRow(props) {
	var className = props.className, style = props.style, record = props.record, index = props.index, renderIndex = props.renderIndex, rowKey = props.rowKey, rowKeys = props.rowKeys, _props$indent = props.indent, indent = _props$indent === void 0 ? 0 : _props$indent, RowComponent = props.rowComponent, cellComponent = props.cellComponent, scopeCellComponent = props.scopeCellComponent, expandedRowInfo = props.expandedRowInfo;
	var rowInfo = useRowInfo(record, rowKey, index, indent);
	var prefixCls = rowInfo.prefixCls, flattenColumns = rowInfo.flattenColumns, expandedRowClassName = rowInfo.expandedRowClassName, expandedRowRender = rowInfo.expandedRowRender, rowProps = rowInfo.rowProps, expanded = rowInfo.expanded, rowSupportExpand = rowInfo.rowSupportExpand;
	var expandedRef = import_react$22.useRef(false);
	expandedRef.current || (expandedRef.current = expanded);
	var expandedClsName = computedExpandedClassName(expandedRowClassName, record, index, indent);
	var baseRowNode = /* @__PURE__ */ import_react$22.createElement(RowComponent, _extends({}, rowProps, {
		"data-row-key": rowKey,
		className: (0, import_classnames$6.default)(className, "".concat(prefixCls, "-row"), "".concat(prefixCls, "-row-level-").concat(indent), rowProps === null || rowProps === void 0 ? void 0 : rowProps.className, _defineProperty({}, expandedClsName, indent >= 1)),
		style: _objectSpread2(_objectSpread2({}, style), rowProps === null || rowProps === void 0 ? void 0 : rowProps.style)
	}), flattenColumns.map(function(column, colIndex) {
		var render = column.render, dataIndex = column.dataIndex, columnClassName = column.className;
		var _getCellProps = getCellProps(rowInfo, column, colIndex, indent, index, rowKeys, expandedRowInfo === null || expandedRowInfo === void 0 ? void 0 : expandedRowInfo.offset), key = _getCellProps.key, fixedInfo = _getCellProps.fixedInfo, appendCellNode = _getCellProps.appendCellNode, additionalCellProps = _getCellProps.additionalCellProps;
		return /* @__PURE__ */ import_react$22.createElement(Cell_default, _extends({
			className: columnClassName,
			ellipsis: column.ellipsis,
			align: column.align,
			scope: column.rowScope,
			component: column.rowScope ? scopeCellComponent : cellComponent,
			prefixCls,
			key,
			record,
			index,
			renderIndex,
			dataIndex,
			render,
			shouldCellUpdate: column.shouldCellUpdate
		}, fixedInfo, {
			appendNode: appendCellNode,
			additionalProps: additionalCellProps
		}));
	}));
	var expandRowNode;
	if (rowSupportExpand && (expandedRef.current || expanded)) {
		var expandContent = expandedRowRender(record, index, indent + 1, expanded);
		expandRowNode = /* @__PURE__ */ import_react$22.createElement(ExpandedRow_default, {
			expanded,
			className: (0, import_classnames$6.default)("".concat(prefixCls, "-expanded-row"), "".concat(prefixCls, "-expanded-row-level-").concat(indent + 1), expandedClsName),
			prefixCls,
			component: RowComponent,
			cellComponent,
			colSpan: expandedRowInfo ? expandedRowInfo.colSpan : flattenColumns.length,
			stickyOffset: expandedRowInfo === null || expandedRowInfo === void 0 ? void 0 : expandedRowInfo.sticky,
			isEmpty: false
		}, expandContent);
	}
	return /* @__PURE__ */ import_react$22.createElement(import_react$22.Fragment, null, baseRowNode, expandRowNode);
}
var import_classnames$6, import_react$22, BodyRow_default;
var init_BodyRow = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_defineProperty();
	import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	init_Cell$1();
	init_TableContext();
	init_useRenderTimes();
	init_useRowInfo();
	init_ExpandedRow();
	init_expandUtil();
	BodyRow_default = responseImmutable(BodyRow);
}));
function MeasureCell(_ref) {
	var columnKey = _ref.columnKey, onColumnResize = _ref.onColumnResize;
	var cellRef = import_react$21.useRef();
	useLayoutEffect_default(function() {
		if (cellRef.current) onColumnResize(columnKey, cellRef.current.offsetWidth);
	}, []);
	return /* @__PURE__ */ import_react$21.createElement(es_default$2, { data: columnKey }, /* @__PURE__ */ import_react$21.createElement("td", {
		ref: cellRef,
		style: {
			padding: 0,
			border: 0,
			height: 0
		}
	}, /* @__PURE__ */ import_react$21.createElement("div", { style: {
		height: 0,
		overflow: "hidden"
	} }, "\xA0")));
}
var import_react$21;
var init_MeasureCell = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_es$6();
	init_useLayoutEffect();
}));
function MeasureRow(_ref) {
	var prefixCls = _ref.prefixCls, columnsKey = _ref.columnsKey, onColumnResize = _ref.onColumnResize;
	var ref = import_react$20.useRef(null);
	return /* @__PURE__ */ import_react$20.createElement("tr", {
		"aria-hidden": "true",
		className: "".concat(prefixCls, "-measure-row"),
		style: {
			height: 0,
			fontSize: 0
		},
		ref
	}, /* @__PURE__ */ import_react$20.createElement(es_default$2.Collection, { onBatchResize: function onBatchResize(infoList) {
		if (isVisible_default(ref.current)) infoList.forEach(function(_ref2) {
			var columnKey = _ref2.data, size = _ref2.size;
			onColumnResize(columnKey, size.offsetWidth);
		});
	} }, columnsKey.map(function(columnKey) {
		return /* @__PURE__ */ import_react$20.createElement(MeasureCell, {
			key: columnKey,
			columnKey,
			onColumnResize
		});
	})));
}
var import_react$20;
var init_MeasureRow = __esmMin((() => {
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_es$6();
	init_MeasureCell();
	init_isVisible();
}));
function Body(props) {
	var data = props.data, measureColumnWidth = props.measureColumnWidth;
	var _useContext = useContext(TableContext_default, [
		"prefixCls",
		"getComponent",
		"onColumnResize",
		"flattenColumns",
		"getRowKey",
		"expandedKeys",
		"childrenColumnName",
		"emptyNode",
		"expandedRowOffset",
		"fixedInfoList",
		"colWidths"
	]), prefixCls = _useContext.prefixCls, getComponent = _useContext.getComponent, onColumnResize = _useContext.onColumnResize, flattenColumns = _useContext.flattenColumns, getRowKey = _useContext.getRowKey, expandedKeys = _useContext.expandedKeys, childrenColumnName = _useContext.childrenColumnName, emptyNode = _useContext.emptyNode, _useContext$expandedR = _useContext.expandedRowOffset, expandedRowOffset = _useContext$expandedR === void 0 ? 0 : _useContext$expandedR, colWidths = _useContext.colWidths;
	var flattenData = useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey);
	var rowKeys = import_react$19.useMemo(function() {
		return flattenData.map(function(item) {
			return item.rowKey;
		});
	}, [flattenData]);
	var perfRef = import_react$19.useRef({ renderWithProps: false });
	var expandedRowInfo = import_react$19.useMemo(function() {
		var expandedColSpan = flattenColumns.length - expandedRowOffset;
		var expandedStickyStart = 0;
		for (var i = 0; i < expandedRowOffset; i += 1) expandedStickyStart += colWidths[i] || 0;
		return {
			offset: expandedRowOffset,
			colSpan: expandedColSpan,
			sticky: expandedStickyStart
		};
	}, [
		flattenColumns.length,
		expandedRowOffset,
		colWidths
	]);
	var WrapperComponent = getComponent(["body", "wrapper"], "tbody");
	var trComponent = getComponent(["body", "row"], "tr");
	var tdComponent = getComponent(["body", "cell"], "td");
	var thComponent = getComponent(["body", "cell"], "th");
	var rows;
	if (data.length) rows = flattenData.map(function(item, idx) {
		var record = item.record, indent = item.indent, renderIndex = item.index, rowKey = item.rowKey;
		return /* @__PURE__ */ import_react$19.createElement(BodyRow_default, {
			key: rowKey,
			rowKey,
			rowKeys,
			record,
			index: idx,
			renderIndex,
			rowComponent: trComponent,
			cellComponent: tdComponent,
			scopeCellComponent: thComponent,
			indent,
			expandedRowInfo
		});
	});
	else rows = /* @__PURE__ */ import_react$19.createElement(ExpandedRow_default, {
		expanded: true,
		className: "".concat(prefixCls, "-placeholder"),
		prefixCls,
		component: trComponent,
		cellComponent: tdComponent,
		colSpan: flattenColumns.length,
		isEmpty: true
	}, emptyNode);
	var columnsKey = getColumnsKey(flattenColumns);
	return /* @__PURE__ */ import_react$19.createElement(PerfContext_default.Provider, { value: perfRef.current }, /* @__PURE__ */ import_react$19.createElement(WrapperComponent, { className: "".concat(prefixCls, "-tbody") }, measureColumnWidth && /* @__PURE__ */ import_react$19.createElement(MeasureRow, {
		prefixCls,
		columnsKey,
		onColumnResize
	}), rows));
}
var import_react$19, Body_default;
var init_Body = __esmMin((() => {
	init_es$1();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_PerfContext();
	init_TableContext();
	init_useFlattenRecords();
	init_useRenderTimes();
	init_valueUtil();
	init_BodyRow();
	init_ExpandedRow();
	init_MeasureRow();
	Body_default = responseImmutable(Body);
}));
function getExpandableProps(props) {
	var expandable = props.expandable, legacyExpandableConfig = _objectWithoutProperties(props, _excluded$4);
	var config;
	if ("expandable" in props) config = _objectSpread2(_objectSpread2({}, legacyExpandableConfig), expandable);
	else config = legacyExpandableConfig;
	if (config.showExpandColumn === false) config.expandIconColumnIndex = -1;
	return config;
}
var _excluded$4, INTERNAL_COL_DEFINE;
var init_legacyUtil = __esmMin((() => {
	init_objectSpread2();
	init_objectWithoutProperties();
	init_warning();
	_excluded$4 = ["expandable"];
	INTERNAL_COL_DEFINE = "RC_TABLE_INTERNAL_COL_DEFINE";
}));
function ColGroup(_ref) {
	var colWidths = _ref.colWidths, columns = _ref.columns, columCount = _ref.columCount;
	var tableLayout = useContext(TableContext_default, ["tableLayout"]).tableLayout;
	var cols = [];
	var len = columCount || columns.length;
	var mustInsert = false;
	for (var i = len - 1; i >= 0; i -= 1) {
		var width = colWidths[i];
		var column = columns && columns[i];
		var additionalProps = void 0;
		var minWidth = void 0;
		if (column) {
			additionalProps = column[INTERNAL_COL_DEFINE];
			if (tableLayout === "auto") minWidth = column.minWidth;
		}
		if (width || minWidth || additionalProps || mustInsert) {
			var _ref2 = additionalProps || {};
			_ref2.columnType;
			var restAdditionalProps = _objectWithoutProperties(_ref2, _excluded$3);
			cols.unshift(/* @__PURE__ */ import_react$18.createElement("col", _extends({
				key: i,
				style: {
					width,
					minWidth
				}
			}, restAdditionalProps)));
			mustInsert = true;
		}
	}
	return /* @__PURE__ */ import_react$18.createElement("colgroup", null, cols);
}
var import_react$18, _excluded$3, ColGroup_default;
var init_ColGroup = __esmMin((() => {
	init_extends();
	init_objectWithoutProperties();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_legacyUtil();
	init_es$1();
	init_TableContext();
	_excluded$3 = ["columnType"];
	ColGroup_default = ColGroup;
}));
function useColumnWidth(colWidths, columCount) {
	return (0, import_react$17.useMemo)(function() {
		var cloneColumns = [];
		for (var i = 0; i < columCount; i += 1) {
			var val = colWidths[i];
			if (val !== void 0) cloneColumns[i] = val;
			else return null;
		}
		return cloneColumns;
	}, [colWidths.join("_"), columCount]);
}
var import_classnames$5, import_react$16, import_react$17, _excluded$2, FixedHolder, FixedHolder_default;
var init_FixedHolder = __esmMin((() => {
	init_defineProperty();
	init_objectSpread2();
	init_toConsumableArray();
	init_objectWithoutProperties();
	init_es$1();
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
	init_ref();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	init_ColGroup();
	init_TableContext();
	init_useRenderTimes();
	_excluded$2 = [
		"className",
		"noData",
		"columns",
		"flattenColumns",
		"colWidths",
		"columCount",
		"stickyOffsets",
		"direction",
		"fixHeader",
		"stickyTopOffset",
		"stickyBottomOffset",
		"stickyClassName",
		"onScroll",
		"maxContentScroll",
		"children"
	];
	FixedHolder = /* @__PURE__ */ import_react$16.forwardRef(function(props, ref) {
		var className = props.className, noData = props.noData, columns = props.columns, flattenColumns = props.flattenColumns, colWidths = props.colWidths, columCount = props.columCount, stickyOffsets = props.stickyOffsets, direction = props.direction, fixHeader = props.fixHeader, stickyTopOffset = props.stickyTopOffset, stickyBottomOffset = props.stickyBottomOffset, stickyClassName = props.stickyClassName, onScroll = props.onScroll, maxContentScroll = props.maxContentScroll, children = props.children, restProps = _objectWithoutProperties(props, _excluded$2);
		var _useContext = useContext(TableContext_default, [
			"prefixCls",
			"scrollbarSize",
			"isSticky",
			"getComponent"
		]), prefixCls = _useContext.prefixCls, scrollbarSize = _useContext.scrollbarSize, isSticky = _useContext.isSticky, getComponent = _useContext.getComponent;
		var TableComponent = getComponent(["header", "table"], "table");
		var combinationScrollBarSize = isSticky && !fixHeader ? 0 : scrollbarSize;
		var scrollRef = import_react$16.useRef(null);
		var setScrollRef = import_react$16.useCallback(function(element) {
			fillRef(ref, element);
			fillRef(scrollRef, element);
		}, []);
		import_react$16.useEffect(function() {
			function onWheel(e) {
				var _ref = e, currentTarget = _ref.currentTarget, deltaX = _ref.deltaX;
				if (deltaX) {
					onScroll({
						currentTarget,
						scrollLeft: currentTarget.scrollLeft + deltaX
					});
					e.preventDefault();
				}
			}
			var scrollEle = scrollRef.current;
			scrollEle === null || scrollEle === void 0 || scrollEle.addEventListener("wheel", onWheel, { passive: false });
			return function() {
				scrollEle === null || scrollEle === void 0 || scrollEle.removeEventListener("wheel", onWheel);
			};
		}, []);
		var allFlattenColumnsWithWidth = import_react$16.useMemo(function() {
			return flattenColumns.every(function(column) {
				return column.width;
			});
		}, [flattenColumns]);
		var lastColumn = flattenColumns[flattenColumns.length - 1];
		var ScrollBarColumn = {
			fixed: lastColumn ? lastColumn.fixed : null,
			scrollbar: true,
			onHeaderCell: function onHeaderCell() {
				return { className: "".concat(prefixCls, "-cell-scrollbar") };
			}
		};
		var columnsWithScrollbar = (0, import_react$17.useMemo)(function() {
			return combinationScrollBarSize ? [].concat(_toConsumableArray(columns), [ScrollBarColumn]) : columns;
		}, [combinationScrollBarSize, columns]);
		var flattenColumnsWithScrollbar = (0, import_react$17.useMemo)(function() {
			return combinationScrollBarSize ? [].concat(_toConsumableArray(flattenColumns), [ScrollBarColumn]) : flattenColumns;
		}, [combinationScrollBarSize, flattenColumns]);
		var headerStickyOffsets = (0, import_react$17.useMemo)(function() {
			var right = stickyOffsets.right, left = stickyOffsets.left;
			return _objectSpread2(_objectSpread2({}, stickyOffsets), {}, {
				left: direction === "rtl" ? [].concat(_toConsumableArray(left.map(function(width) {
					return width + combinationScrollBarSize;
				})), [0]) : left,
				right: direction === "rtl" ? right : [].concat(_toConsumableArray(right.map(function(width) {
					return width + combinationScrollBarSize;
				})), [0]),
				isSticky
			});
		}, [
			combinationScrollBarSize,
			stickyOffsets,
			isSticky
		]);
		var mergedColumnWidth = useColumnWidth(colWidths, columCount);
		return /* @__PURE__ */ import_react$16.createElement("div", {
			style: _objectSpread2({ overflow: "hidden" }, isSticky ? {
				top: stickyTopOffset,
				bottom: stickyBottomOffset
			} : {}),
			ref: setScrollRef,
			className: (0, import_classnames$5.default)(className, _defineProperty({}, stickyClassName, !!stickyClassName))
		}, /* @__PURE__ */ import_react$16.createElement(TableComponent, { style: {
			tableLayout: "fixed",
			visibility: noData || mergedColumnWidth ? null : "hidden"
		} }, (!noData || !maxContentScroll || allFlattenColumnsWithWidth) && /* @__PURE__ */ import_react$16.createElement(ColGroup_default, {
			colWidths: mergedColumnWidth ? [].concat(_toConsumableArray(mergedColumnWidth), [combinationScrollBarSize]) : [],
			columCount: columCount + 1,
			columns: flattenColumnsWithScrollbar
		}), children(_objectSpread2(_objectSpread2({}, restProps), {}, {
			stickyOffsets: headerStickyOffsets,
			columns: columnsWithScrollbar,
			flattenColumns: flattenColumnsWithScrollbar
		}))));
	});
	FixedHolder_default = /* @__PURE__ */ import_react$16.memo(FixedHolder);
}));
var import_react$15, HeaderRow, HeaderRow_default;
var init_HeaderRow = __esmMin((() => {
	init_extends();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_Cell$1();
	init_TableContext();
	init_es$1();
	init_fixUtil();
	init_valueUtil();
	HeaderRow = function HeaderRow$1(props) {
		var cells = props.cells, stickyOffsets = props.stickyOffsets, flattenColumns = props.flattenColumns, RowComponent = props.rowComponent, CellComponent = props.cellComponent, onHeaderRow = props.onHeaderRow, index = props.index;
		var _useContext = useContext(TableContext_default, ["prefixCls", "direction"]), prefixCls = _useContext.prefixCls, direction = _useContext.direction;
		var rowProps;
		if (onHeaderRow) rowProps = onHeaderRow(cells.map(function(cell) {
			return cell.column;
		}), index);
		var columnsKey = getColumnsKey(cells.map(function(cell) {
			return cell.column;
		}));
		return /* @__PURE__ */ import_react$15.createElement(RowComponent, rowProps, cells.map(function(cell, cellIndex) {
			var column = cell.column;
			var fixedInfo = getCellFixedInfo(cell.colStart, cell.colEnd, flattenColumns, stickyOffsets, direction);
			var additionalProps;
			if (column && column.onHeaderCell) additionalProps = cell.column.onHeaderCell(column);
			return /* @__PURE__ */ import_react$15.createElement(Cell_default, _extends({}, cell, {
				scope: column.title ? cell.colSpan > 1 ? "colgroup" : "col" : null,
				ellipsis: column.ellipsis,
				align: column.align,
				component: CellComponent,
				prefixCls,
				key: columnsKey[cellIndex]
			}, fixedInfo, {
				additionalProps,
				rowType: "header"
			}));
		}));
	};
	HeaderRow_default = HeaderRow;
}));
function parseHeaderRows(rootColumns) {
	var rows = [];
	function fillRowCells(columns, colIndex) {
		var rowIndex$1 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
		rows[rowIndex$1] = rows[rowIndex$1] || [];
		var currentColIndex = colIndex;
		return columns.filter(Boolean).map(function(column) {
			var cell = {
				key: column.key,
				className: column.className || "",
				children: column.title,
				column,
				colStart: currentColIndex
			};
			var colSpan = 1;
			var subColumns = column.children;
			if (subColumns && subColumns.length > 0) {
				colSpan = fillRowCells(subColumns, currentColIndex, rowIndex$1 + 1).reduce(function(total, count) {
					return total + count;
				}, 0);
				cell.hasSubColumns = true;
			}
			if ("colSpan" in column) colSpan = column.colSpan;
			if ("rowSpan" in column) cell.rowSpan = column.rowSpan;
			cell.colSpan = colSpan;
			cell.colEnd = cell.colStart + colSpan - 1;
			rows[rowIndex$1].push(cell);
			currentColIndex += colSpan;
			return colSpan;
		});
	}
	fillRowCells(rootColumns, 0);
	var rowCount = rows.length;
	var _loop = function _loop$1(rowIndex$1) {
		rows[rowIndex$1].forEach(function(cell) {
			if (!("rowSpan" in cell) && !cell.hasSubColumns) cell.rowSpan = rowCount - rowIndex$1;
		});
	};
	for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) _loop(rowIndex);
	return rows;
}
var import_react$14, Header, Header_default;
var init_Header = __esmMin((() => {
	init_es$1();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_TableContext();
	init_useRenderTimes();
	init_HeaderRow();
	Header = function Header$1(props) {
		var stickyOffsets = props.stickyOffsets, columns = props.columns, flattenColumns = props.flattenColumns, onHeaderRow = props.onHeaderRow;
		var _useContext = useContext(TableContext_default, ["prefixCls", "getComponent"]), prefixCls = _useContext.prefixCls, getComponent = _useContext.getComponent;
		var rows = import_react$14.useMemo(function() {
			return parseHeaderRows(columns);
		}, [columns]);
		var WrapperComponent = getComponent(["header", "wrapper"], "thead");
		var trComponent = getComponent(["header", "row"], "tr");
		var thComponent = getComponent(["header", "cell"], "th");
		return /* @__PURE__ */ import_react$14.createElement(WrapperComponent, { className: "".concat(prefixCls, "-thead") }, rows.map(function(row, rowIndex) {
			return /* @__PURE__ */ import_react$14.createElement(HeaderRow_default, {
				key: rowIndex,
				flattenColumns,
				cells: row,
				stickyOffsets,
				rowComponent: trComponent,
				cellComponent: thComponent,
				onHeaderRow,
				index: rowIndex
			});
		}));
	};
	Header_default = responseImmutable(Header);
}));
function parseColWidth(totalWidth) {
	var width = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
	if (typeof width === "number") return width;
	if (width.endsWith("%")) return totalWidth * parseFloat(width) / 100;
	return null;
}
function useWidthColumns(flattenColumns, scrollWidth, clientWidth) {
	return import_react$13.useMemo(function() {
		if (scrollWidth && scrollWidth > 0) {
			var totalWidth = 0;
			var missWidthCount = 0;
			flattenColumns.forEach(function(col) {
				var colWidth = parseColWidth(scrollWidth, col.width);
				if (colWidth) totalWidth += colWidth;
				else missWidthCount += 1;
			});
			var maxFitWidth = Math.max(scrollWidth, clientWidth);
			var restWidth = Math.max(maxFitWidth - totalWidth, missWidthCount);
			var restCount = missWidthCount;
			var avgWidth = restWidth / missWidthCount;
			var realTotal = 0;
			var filledColumns = flattenColumns.map(function(col) {
				var clone = _objectSpread2({}, col);
				var colWidth = parseColWidth(scrollWidth, clone.width);
				if (colWidth) clone.width = colWidth;
				else {
					var colAvgWidth = Math.floor(avgWidth);
					clone.width = restCount === 1 ? restWidth : colAvgWidth;
					restWidth -= colAvgWidth;
					restCount -= 1;
				}
				realTotal += clone.width;
				return clone;
			});
			if (realTotal < maxFitWidth) {
				var scale = maxFitWidth / realTotal;
				restWidth = maxFitWidth;
				filledColumns.forEach(function(col, index) {
					var colWidth = Math.floor(col.width * scale);
					col.width = index === filledColumns.length - 1 ? restWidth : colWidth;
					restWidth -= colWidth;
				});
			}
			return [filledColumns, Math.max(realTotal, maxFitWidth)];
		}
		return [flattenColumns, scrollWidth];
	}, [
		flattenColumns,
		scrollWidth,
		clientWidth
	]);
}
var import_react$13;
var init_useWidthColumns = __esmMin((() => {
	init_objectSpread2();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
}));
function convertChildrenToColumns(children) {
	return toArray(children).filter(function(node) {
		return /* @__PURE__ */ import_react$12.isValidElement(node);
	}).map(function(_ref) {
		var key = _ref.key, props = _ref.props;
		var nodeChildren = props.children, restProps = _objectWithoutProperties(props, _excluded$1);
		var column = _objectSpread2({ key }, restProps);
		if (nodeChildren) column.children = convertChildrenToColumns(nodeChildren);
		return column;
	});
}
function filterHiddenColumns(columns) {
	return columns.filter(function(column) {
		return column && _typeof(column) === "object" && !column.hidden;
	}).map(function(column) {
		var subColumns = column.children;
		if (subColumns && subColumns.length > 0) return _objectSpread2(_objectSpread2({}, column), {}, { children: filterHiddenColumns(subColumns) });
		return column;
	});
}
function flatColumns(columns) {
	var parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key";
	return columns.filter(function(column) {
		return column && _typeof(column) === "object";
	}).reduce(function(list, column, index) {
		var fixed = column.fixed;
		var parsedFixed = fixed === true ? "left" : fixed;
		var mergedKey = "".concat(parentKey, "-").concat(index);
		var subColumns = column.children;
		if (subColumns && subColumns.length > 0) return [].concat(_toConsumableArray(list), _toConsumableArray(flatColumns(subColumns, mergedKey).map(function(subColum) {
			return _objectSpread2({ fixed: parsedFixed }, subColum);
		})));
		return [].concat(_toConsumableArray(list), [_objectSpread2(_objectSpread2({ key: mergedKey }, column), {}, { fixed: parsedFixed })]);
	}, []);
}
function revertForRtl(columns) {
	return columns.map(function(column) {
		var fixed = column.fixed, restProps = _objectWithoutProperties(column, _excluded2);
		var parsedFixed = fixed;
		if (fixed === "left") parsedFixed = "right";
		else if (fixed === "right") parsedFixed = "left";
		return _objectSpread2({ fixed: parsedFixed }, restProps);
	});
}
function useColumns(_ref2, transformColumns) {
	var prefixCls = _ref2.prefixCls, columns = _ref2.columns, children = _ref2.children, expandable = _ref2.expandable, expandedKeys = _ref2.expandedKeys, columnTitle = _ref2.columnTitle, getRowKey = _ref2.getRowKey, onTriggerExpand = _ref2.onTriggerExpand, expandIcon = _ref2.expandIcon, rowExpandable = _ref2.rowExpandable, expandIconColumnIndex = _ref2.expandIconColumnIndex, _ref2$expandedRowOffs = _ref2.expandedRowOffset, expandedRowOffset = _ref2$expandedRowOffs === void 0 ? 0 : _ref2$expandedRowOffs, direction = _ref2.direction, expandRowByClick = _ref2.expandRowByClick, columnWidth = _ref2.columnWidth, fixed = _ref2.fixed, scrollWidth = _ref2.scrollWidth, clientWidth = _ref2.clientWidth;
	var baseColumns = import_react$12.useMemo(function() {
		return filterHiddenColumns((columns || convertChildrenToColumns(children) || []).slice());
	}, [columns, children]);
	var withExpandColumns = import_react$12.useMemo(function() {
		if (expandable) {
			var cloneColumns = baseColumns.slice();
			if (!cloneColumns.includes(EXPAND_COLUMN)) {
				var expandColIndex = expandIconColumnIndex || 0;
				if (expandColIndex >= 0 && (expandColIndex || fixed === "left" || !fixed)) cloneColumns.splice(expandColIndex, 0, EXPAND_COLUMN);
				if (fixed === "right") cloneColumns.splice(baseColumns.length, 0, EXPAND_COLUMN);
			}
			var expandColumnIndex = cloneColumns.indexOf(EXPAND_COLUMN);
			cloneColumns = cloneColumns.filter(function(column, index) {
				return column !== EXPAND_COLUMN || index === expandColumnIndex;
			});
			var prevColumn = baseColumns[expandColumnIndex];
			var fixedColumn;
			if (fixed) fixedColumn = fixed;
			else fixedColumn = prevColumn ? prevColumn.fixed : null;
			var expandColumn = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, INTERNAL_COL_DEFINE, {
				className: "".concat(prefixCls, "-expand-icon-col"),
				columnType: "EXPAND_COLUMN"
			}), "title", columnTitle), "fixed", fixedColumn), "className", "".concat(prefixCls, "-row-expand-icon-cell")), "width", columnWidth), "render", function render(_, record, index) {
				var rowKey = getRowKey(record, index);
				var icon = expandIcon({
					prefixCls,
					expanded: expandedKeys.has(rowKey),
					expandable: rowExpandable ? rowExpandable(record) : true,
					record,
					onExpand: onTriggerExpand
				});
				if (expandRowByClick) return /* @__PURE__ */ import_react$12.createElement("span", { onClick: function onClick(e) {
					return e.stopPropagation();
				} }, icon);
				return icon;
			});
			return cloneColumns.map(function(col, index) {
				var column = col === EXPAND_COLUMN ? expandColumn : col;
				if (index < expandedRowOffset) return _objectSpread2(_objectSpread2({}, column), {}, { fixed: column.fixed || "left" });
				return column;
			});
		}
		return baseColumns.filter(function(col) {
			return col !== EXPAND_COLUMN;
		});
	}, [
		expandable,
		baseColumns,
		getRowKey,
		expandedKeys,
		expandIcon,
		direction,
		expandedRowOffset
	]);
	var mergedColumns = import_react$12.useMemo(function() {
		var finalColumns = withExpandColumns;
		if (transformColumns) finalColumns = transformColumns(finalColumns);
		if (!finalColumns.length) finalColumns = [{ render: function render() {
			return null;
		} }];
		return finalColumns;
	}, [
		transformColumns,
		withExpandColumns,
		direction
	]);
	var flattenColumns = import_react$12.useMemo(function() {
		if (direction === "rtl") return revertForRtl(flatColumns(mergedColumns));
		return flatColumns(mergedColumns);
	}, [
		mergedColumns,
		direction,
		scrollWidth
	]);
	var hasGapFixed = import_react$12.useMemo(function() {
		var lastLeftIndex = -1;
		for (var i = flattenColumns.length - 1; i >= 0; i -= 1) {
			var colFixed = flattenColumns[i].fixed;
			if (colFixed === "left" || colFixed === true) {
				lastLeftIndex = i;
				break;
			}
		}
		if (lastLeftIndex >= 0) for (var _i = 0; _i <= lastLeftIndex; _i += 1) {
			var _colFixed = flattenColumns[_i].fixed;
			if (_colFixed !== "left" && _colFixed !== true) return true;
		}
		var firstRightIndex = flattenColumns.findIndex(function(_ref3) {
			return _ref3.fixed === "right";
		});
		if (firstRightIndex >= 0) {
			for (var _i2 = firstRightIndex; _i2 < flattenColumns.length; _i2 += 1) if (flattenColumns[_i2].fixed !== "right") return true;
		}
		return false;
	}, [flattenColumns]);
	var _useWidthColumns2 = _slicedToArray(useWidthColumns(flattenColumns, scrollWidth, clientWidth), 2);
	return [
		mergedColumns,
		_useWidthColumns2[0],
		_useWidthColumns2[1],
		hasGapFixed
	];
}
var import_react$12, _excluded$1, _excluded2, useColumns_default;
var init_useColumns = __esmMin((() => {
	init_slicedToArray();
	init_defineProperty();
	init_toConsumableArray();
	init_typeof();
	init_objectSpread2();
	init_objectWithoutProperties();
	init_toArray();
	init_warning();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	init_constant();
	init_legacyUtil();
	init_useWidthColumns();
	_excluded$1 = ["children"], _excluded2 = ["fixed"];
	useColumns_default = useColumns;
}));
function useExpand(props, mergedData, getRowKey) {
	var expandableConfig = getExpandableProps(props);
	var expandIcon = expandableConfig.expandIcon, expandedRowKeys = expandableConfig.expandedRowKeys, defaultExpandedRowKeys = expandableConfig.defaultExpandedRowKeys, defaultExpandAllRows = expandableConfig.defaultExpandAllRows, expandedRowRender = expandableConfig.expandedRowRender, onExpand = expandableConfig.onExpand, onExpandedRowsChange = expandableConfig.onExpandedRowsChange, childrenColumnName = expandableConfig.childrenColumnName;
	var mergedExpandIcon = expandIcon || renderExpandIcon;
	var mergedChildrenColumnName = childrenColumnName || "children";
	var expandableType = import_react$11.useMemo(function() {
		if (expandedRowRender) return "row";
		if (props.expandable && props.internalHooks === "rc-table-internal-hook" && props.expandable.__PARENT_RENDER_ICON__ || mergedData.some(function(record) {
			return record && _typeof(record) === "object" && record[mergedChildrenColumnName];
		})) return "nest";
		return false;
	}, [!!expandedRowRender, mergedData]);
	var _React$useState2 = _slicedToArray(import_react$11.useState(function() {
		if (defaultExpandedRowKeys) return defaultExpandedRowKeys;
		if (defaultExpandAllRows) return findAllChildrenKeys(mergedData, getRowKey, mergedChildrenColumnName);
		return [];
	}), 2), innerExpandedKeys = _React$useState2[0], setInnerExpandedKeys = _React$useState2[1];
	var mergedExpandedKeys = import_react$11.useMemo(function() {
		return new Set(expandedRowKeys || innerExpandedKeys || []);
	}, [expandedRowKeys, innerExpandedKeys]);
	return [
		expandableConfig,
		expandableType,
		mergedExpandedKeys,
		mergedExpandIcon,
		mergedChildrenColumnName,
		import_react$11.useCallback(function(record) {
			var key = getRowKey(record, mergedData.indexOf(record));
			var newExpandedKeys;
			var hasKey = mergedExpandedKeys.has(key);
			if (hasKey) {
				mergedExpandedKeys.delete(key);
				newExpandedKeys = _toConsumableArray(mergedExpandedKeys);
			} else newExpandedKeys = [].concat(_toConsumableArray(mergedExpandedKeys), [key]);
			setInnerExpandedKeys(newExpandedKeys);
			if (onExpand) onExpand(!hasKey, record);
			if (onExpandedRowsChange) onExpandedRowsChange(newExpandedKeys);
		}, [
			getRowKey,
			mergedExpandedKeys,
			mergedData,
			onExpand,
			onExpandedRowsChange
		])
	];
}
var import_react$11;
var init_useExpand = __esmMin((() => {
	init_toConsumableArray();
	init_slicedToArray();
	init_typeof();
	init_warning();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_constant();
	init_expandUtil();
	init_legacyUtil();
}));
function useFixedInfo(flattenColumns, stickyOffsets, direction) {
	var fixedInfoList = flattenColumns.map(function(_, colIndex) {
		return getCellFixedInfo(colIndex, colIndex, flattenColumns, stickyOffsets, direction);
	});
	return useMemo$1(function() {
		return fixedInfoList;
	}, [fixedInfoList], function(prev, next) {
		return !isEqual_default(prev, next);
	});
}
var init_useFixedInfo = __esmMin((() => {
	init_useMemo();
	init_isEqual();
	init_fixUtil();
}));
function useLayoutState(defaultState) {
	var stateRef = (0, import_react$10.useRef)(defaultState);
	var forceUpdate = _slicedToArray((0, import_react$10.useState)({}), 2)[1];
	var lastPromiseRef = (0, import_react$10.useRef)(null);
	var updateBatchRef = (0, import_react$10.useRef)([]);
	function setFrameState(updater) {
		updateBatchRef.current.push(updater);
		var promise = Promise.resolve();
		lastPromiseRef.current = promise;
		promise.then(function() {
			if (lastPromiseRef.current === promise) {
				var prevBatch = updateBatchRef.current;
				var prevState = stateRef.current;
				updateBatchRef.current = [];
				prevBatch.forEach(function(batchUpdater) {
					stateRef.current = batchUpdater(stateRef.current);
				});
				lastPromiseRef.current = null;
				if (prevState !== stateRef.current) forceUpdate({});
			}
		});
	}
	(0, import_react$10.useEffect)(function() {
		return function() {
			lastPromiseRef.current = null;
		};
	}, []);
	return [stateRef.current, setFrameState];
}
function useTimeoutLock(defaultState) {
	var frameRef = (0, import_react$10.useRef)(defaultState || null);
	var timeoutRef = (0, import_react$10.useRef)();
	function cleanUp() {
		window.clearTimeout(timeoutRef.current);
	}
	function setState(newState) {
		frameRef.current = newState;
		cleanUp();
		timeoutRef.current = window.setTimeout(function() {
			frameRef.current = null;
			timeoutRef.current = void 0;
		}, 100);
	}
	function getState() {
		return frameRef.current;
	}
	(0, import_react$10.useEffect)(function() {
		return cleanUp;
	}, []);
	return [setState, getState];
}
var import_react$10;
var init_useFrame = __esmMin((() => {
	init_slicedToArray();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
}));
function useHover() {
	var _React$useState2 = _slicedToArray(import_react$9.useState(-1), 2), startRow = _React$useState2[0], setStartRow = _React$useState2[1];
	var _React$useState4 = _slicedToArray(import_react$9.useState(-1), 2), endRow = _React$useState4[0], setEndRow = _React$useState4[1];
	return [
		startRow,
		endRow,
		import_react$9.useCallback(function(start, end) {
			setStartRow(start);
			setEndRow(end);
		}, [])
	];
}
var import_react$9;
var init_useHover = __esmMin((() => {
	init_slicedToArray();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
}));
function useSticky(sticky, prefixCls) {
	var _ref = _typeof(sticky) === "object" ? sticky : {}, _ref$offsetHeader = _ref.offsetHeader, offsetHeader = _ref$offsetHeader === void 0 ? 0 : _ref$offsetHeader, _ref$offsetSummary = _ref.offsetSummary, offsetSummary = _ref$offsetSummary === void 0 ? 0 : _ref$offsetSummary, _ref$offsetScroll = _ref.offsetScroll, offsetScroll = _ref$offsetScroll === void 0 ? 0 : _ref$offsetScroll, _ref$getContainer = _ref.getContainer;
	var container = (_ref$getContainer === void 0 ? function() {
		return defaultContainer;
	} : _ref$getContainer)() || defaultContainer;
	var isSticky = !!sticky;
	return import_react$8.useMemo(function() {
		return {
			isSticky,
			stickyClassName: isSticky ? "".concat(prefixCls, "-sticky-holder") : "",
			offsetHeader,
			offsetSummary,
			offsetScroll,
			container
		};
	}, [
		isSticky,
		offsetScroll,
		offsetHeader,
		offsetSummary,
		prefixCls,
		container
	]);
}
var import_react$8, defaultContainer;
var init_useSticky = __esmMin((() => {
	init_typeof();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_canUseDom();
	defaultContainer = canUseDom() ? window : null;
}));
function useStickyOffsets(colWidths, flattenColumns, direction) {
	return (0, import_react$7.useMemo)(function() {
		var columnCount = flattenColumns.length;
		var getOffsets = function getOffsets$1(startIndex, endIndex, offset) {
			var offsets = [];
			var total = 0;
			for (var i = startIndex; i !== endIndex; i += offset) {
				offsets.push(total);
				if (flattenColumns[i].fixed) total += colWidths[i] || 0;
			}
			return offsets;
		};
		var startOffsets = getOffsets(0, columnCount, 1);
		var endOffsets = getOffsets(columnCount - 1, -1, -1).reverse();
		return direction === "rtl" ? {
			left: endOffsets,
			right: startOffsets
		} : {
			left: startOffsets,
			right: endOffsets
		};
	}, [
		colWidths,
		flattenColumns,
		direction
	]);
}
var import_react$7, useStickyOffsets_default;
var init_useStickyOffsets = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	useStickyOffsets_default = useStickyOffsets;
}));
function Panel(_ref) {
	var className = _ref.className, children = _ref.children;
	return /* @__PURE__ */ import_react$6.createElement("div", { className }, children);
}
var import_react$6, Panel_default;
var init_Panel = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	Panel_default = Panel;
}));
function getOffset(node) {
	var box = getDOM(node).getBoundingClientRect();
	var docElem = document.documentElement;
	return {
		left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
		top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
	};
}
var init_offsetUtil = __esmMin((() => {
	init_findDOMNode();
}));
var import_classnames$4, import_react$5, StickyScrollBar, stickyScrollBar_default;
var init_stickyScrollBar = __esmMin((() => {
	init_defineProperty();
	init_objectSpread2();
	init_slicedToArray();
	init_es$1();
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
	init_addEventListener();
	init_getScrollBarSize();
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_TableContext();
	init_useFrame();
	init_raf();
	init_offsetUtil();
	init_findDOMNode();
	StickyScrollBar = function StickyScrollBar$1(_ref, ref) {
		var _scrollBodyRef$curren, _scrollBodyRef$curren2;
		var scrollBodyRef = _ref.scrollBodyRef, onScroll = _ref.onScroll, offsetScroll = _ref.offsetScroll, container = _ref.container, direction = _ref.direction;
		var prefixCls = useContext(TableContext_default, "prefixCls");
		var bodyScrollWidth = ((_scrollBodyRef$curren = scrollBodyRef.current) === null || _scrollBodyRef$curren === void 0 ? void 0 : _scrollBodyRef$curren.scrollWidth) || 0;
		var bodyWidth = ((_scrollBodyRef$curren2 = scrollBodyRef.current) === null || _scrollBodyRef$curren2 === void 0 ? void 0 : _scrollBodyRef$curren2.clientWidth) || 0;
		var scrollBarWidth = bodyScrollWidth && bodyWidth * (bodyWidth / bodyScrollWidth);
		var scrollBarRef = import_react$5.useRef();
		var _useLayoutState2 = _slicedToArray(useLayoutState({
			scrollLeft: 0,
			isHiddenScrollBar: true
		}), 2), scrollState = _useLayoutState2[0], setScrollState = _useLayoutState2[1];
		var refState = import_react$5.useRef({
			delta: 0,
			x: 0
		});
		var _React$useState2 = _slicedToArray(import_react$5.useState(false), 2), isActive = _React$useState2[0], setActive = _React$useState2[1];
		var rafRef = import_react$5.useRef(null);
		import_react$5.useEffect(function() {
			return function() {
				raf_default.cancel(rafRef.current);
			};
		}, []);
		var onMouseUp = function onMouseUp$1() {
			setActive(false);
		};
		var onMouseDown = function onMouseDown$1(event) {
			event.persist();
			refState.current.delta = event.pageX - scrollState.scrollLeft;
			refState.current.x = 0;
			setActive(true);
			event.preventDefault();
		};
		var onMouseMove = function onMouseMove$1(event) {
			var _window;
			var buttons = (event || ((_window = window) === null || _window === void 0 ? void 0 : _window.event)).buttons;
			if (!isActive || buttons === 0) {
				if (isActive) setActive(false);
				return;
			}
			var left = refState.current.x + event.pageX - refState.current.x - refState.current.delta;
			var isRTL = direction === "rtl";
			left = Math.max(isRTL ? scrollBarWidth - bodyWidth : 0, Math.min(isRTL ? 0 : bodyWidth - scrollBarWidth, left));
			if (!isRTL || Math.abs(left) + Math.abs(scrollBarWidth) < bodyWidth) {
				onScroll({ scrollLeft: left / bodyWidth * (bodyScrollWidth + 2) });
				refState.current.x = event.pageX;
			}
		};
		var checkScrollBarVisible = function checkScrollBarVisible$1() {
			raf_default.cancel(rafRef.current);
			rafRef.current = raf_default(function() {
				if (!scrollBodyRef.current) return;
				var tableOffsetTop = getOffset(scrollBodyRef.current).top;
				var tableBottomOffset = tableOffsetTop + scrollBodyRef.current.offsetHeight;
				var currentClientOffset = container === window ? document.documentElement.scrollTop + window.innerHeight : getOffset(container).top + container.clientHeight;
				if (tableBottomOffset - getScrollBarSize() <= currentClientOffset || tableOffsetTop >= currentClientOffset - offsetScroll) setScrollState(function(state) {
					return _objectSpread2(_objectSpread2({}, state), {}, { isHiddenScrollBar: true });
				});
				else setScrollState(function(state) {
					return _objectSpread2(_objectSpread2({}, state), {}, { isHiddenScrollBar: false });
				});
			});
		};
		var setScrollLeft = function setScrollLeft$1(left) {
			setScrollState(function(state) {
				return _objectSpread2(_objectSpread2({}, state), {}, { scrollLeft: left / bodyScrollWidth * bodyWidth || 0 });
			});
		};
		import_react$5.useImperativeHandle(ref, function() {
			return {
				setScrollLeft,
				checkScrollBarVisible
			};
		});
		import_react$5.useEffect(function() {
			var onMouseUpListener = addEventListenerWrap(document.body, "mouseup", onMouseUp, false);
			var onMouseMoveListener = addEventListenerWrap(document.body, "mousemove", onMouseMove, false);
			checkScrollBarVisible();
			return function() {
				onMouseUpListener.remove();
				onMouseMoveListener.remove();
			};
		}, [scrollBarWidth, isActive]);
		import_react$5.useEffect(function() {
			if (!scrollBodyRef.current) return;
			var scrollParents = [];
			var parent = getDOM(scrollBodyRef.current);
			while (parent) {
				scrollParents.push(parent);
				parent = parent.parentElement;
			}
			scrollParents.forEach(function(p) {
				return p.addEventListener("scroll", checkScrollBarVisible, false);
			});
			window.addEventListener("resize", checkScrollBarVisible, false);
			window.addEventListener("scroll", checkScrollBarVisible, false);
			container.addEventListener("scroll", checkScrollBarVisible, false);
			return function() {
				scrollParents.forEach(function(p) {
					return p.removeEventListener("scroll", checkScrollBarVisible);
				});
				window.removeEventListener("resize", checkScrollBarVisible);
				window.removeEventListener("scroll", checkScrollBarVisible);
				container.removeEventListener("scroll", checkScrollBarVisible);
			};
		}, [container]);
		import_react$5.useEffect(function() {
			if (!scrollState.isHiddenScrollBar) setScrollState(function(state) {
				var bodyNode = scrollBodyRef.current;
				if (!bodyNode) return state;
				return _objectSpread2(_objectSpread2({}, state), {}, { scrollLeft: bodyNode.scrollLeft / bodyNode.scrollWidth * bodyNode.clientWidth });
			});
		}, [scrollState.isHiddenScrollBar]);
		if (bodyScrollWidth <= bodyWidth || !scrollBarWidth || scrollState.isHiddenScrollBar) return null;
		return /* @__PURE__ */ import_react$5.createElement("div", {
			style: {
				height: getScrollBarSize(),
				width: bodyWidth,
				bottom: offsetScroll
			},
			className: "".concat(prefixCls, "-sticky-scroll")
		}, /* @__PURE__ */ import_react$5.createElement("div", {
			onMouseDown,
			ref: scrollBarRef,
			className: (0, import_classnames$4.default)("".concat(prefixCls, "-sticky-scroll-bar"), _defineProperty({}, "".concat(prefixCls, "-sticky-scroll-bar-active"), isActive)),
			style: {
				width: "".concat(scrollBarWidth, "px"),
				transform: "translate3d(".concat(scrollState.scrollLeft, "px, 0, 0)")
			}
		}));
	};
	stickyScrollBar_default = /* @__PURE__ */ import_react$5.forwardRef(StickyScrollBar);
}));
function defaultEmpty() {
	return "No Data";
}
function Table(tableProps, ref) {
	var props = _objectSpread2({
		rowKey: "key",
		prefixCls: DEFAULT_PREFIX,
		emptyText: defaultEmpty
	}, tableProps);
	var prefixCls = props.prefixCls, className = props.className, rowClassName = props.rowClassName, style = props.style, data = props.data, rowKey = props.rowKey, scroll = props.scroll, tableLayout = props.tableLayout, direction = props.direction, title = props.title, footer = props.footer, summary = props.summary, caption = props.caption, id = props.id, showHeader = props.showHeader, components = props.components, emptyText = props.emptyText, onRow = props.onRow, onHeaderRow = props.onHeaderRow, onScroll = props.onScroll, internalHooks = props.internalHooks, transformColumns = props.transformColumns, internalRefs = props.internalRefs, tailor = props.tailor, getContainerWidth = props.getContainerWidth, sticky = props.sticky, _props$rowHoverable = props.rowHoverable, rowHoverable = _props$rowHoverable === void 0 ? true : _props$rowHoverable;
	var mergedData = data || EMPTY_DATA;
	var hasData = !!mergedData.length;
	var useInternalHooks = internalHooks === INTERNAL_HOOKS;
	var getComponent = import_react$4.useCallback(function(path, defaultComponent) {
		return get(components, path) || defaultComponent;
	}, [components]);
	var getRowKey = import_react$4.useMemo(function() {
		if (typeof rowKey === "function") return rowKey;
		return function(record) {
			return record && record[rowKey];
		};
	}, [rowKey]);
	var customizeScrollBody = getComponent(["body"]);
	var _useHover2 = _slicedToArray(useHover(), 3), startRow = _useHover2[0], endRow = _useHover2[1], onHover = _useHover2[2];
	var _useExpand2 = _slicedToArray(useExpand(props, mergedData, getRowKey), 6), expandableConfig = _useExpand2[0], expandableType = _useExpand2[1], mergedExpandedKeys = _useExpand2[2], mergedExpandIcon = _useExpand2[3], mergedChildrenColumnName = _useExpand2[4], onTriggerExpand = _useExpand2[5];
	var scrollX = scroll === null || scroll === void 0 ? void 0 : scroll.x;
	var _React$useState2 = _slicedToArray(import_react$4.useState(0), 2), componentWidth = _React$useState2[0], setComponentWidth = _React$useState2[1];
	var _useColumns2 = _slicedToArray(useColumns_default(_objectSpread2(_objectSpread2(_objectSpread2({}, props), expandableConfig), {}, {
		expandable: !!expandableConfig.expandedRowRender,
		columnTitle: expandableConfig.columnTitle,
		expandedKeys: mergedExpandedKeys,
		getRowKey,
		onTriggerExpand,
		expandIcon: mergedExpandIcon,
		expandIconColumnIndex: expandableConfig.expandIconColumnIndex,
		direction,
		scrollWidth: useInternalHooks && tailor && typeof scrollX === "number" ? scrollX : null,
		clientWidth: componentWidth
	}), useInternalHooks ? transformColumns : null), 4), columns = _useColumns2[0], flattenColumns = _useColumns2[1], flattenScrollX = _useColumns2[2], hasGapFixed = _useColumns2[3];
	var mergedScrollX = flattenScrollX !== null && flattenScrollX !== void 0 ? flattenScrollX : scrollX;
	var columnContext = import_react$4.useMemo(function() {
		return {
			columns,
			flattenColumns
		};
	}, [columns, flattenColumns]);
	var fullTableRef = import_react$4.useRef();
	var scrollHeaderRef = import_react$4.useRef();
	var scrollBodyRef = import_react$4.useRef();
	var scrollBodyContainerRef = import_react$4.useRef();
	import_react$4.useImperativeHandle(ref, function() {
		return {
			nativeElement: fullTableRef.current,
			scrollTo: function scrollTo(config) {
				var _scrollBodyRef$curren3;
				if (scrollBodyRef.current instanceof HTMLElement) {
					var index = config.index, top = config.top, key = config.key;
					if (validNumberValue(top)) {
						var _scrollBodyRef$curren;
						(_scrollBodyRef$curren = scrollBodyRef.current) === null || _scrollBodyRef$curren === void 0 || _scrollBodyRef$curren.scrollTo({ top });
					} else {
						var _scrollBodyRef$curren2;
						var mergedKey = key !== null && key !== void 0 ? key : getRowKey(mergedData[index]);
						(_scrollBodyRef$curren2 = scrollBodyRef.current.querySelector("[data-row-key=\"".concat(mergedKey, "\"]"))) === null || _scrollBodyRef$curren2 === void 0 || _scrollBodyRef$curren2.scrollIntoView();
					}
				} else if ((_scrollBodyRef$curren3 = scrollBodyRef.current) !== null && _scrollBodyRef$curren3 !== void 0 && _scrollBodyRef$curren3.scrollTo) scrollBodyRef.current.scrollTo(config);
			}
		};
	});
	var scrollSummaryRef = import_react$4.useRef();
	var _React$useState4 = _slicedToArray(import_react$4.useState(false), 2), pingedLeft = _React$useState4[0], setPingedLeft = _React$useState4[1];
	var _React$useState6 = _slicedToArray(import_react$4.useState(false), 2), pingedRight = _React$useState6[0], setPingedRight = _React$useState6[1];
	var _React$useState8 = _slicedToArray(import_react$4.useState(/* @__PURE__ */ new Map()), 2), colsWidths = _React$useState8[0], updateColsWidths = _React$useState8[1];
	var pureColWidths = getColumnsKey(flattenColumns).map(function(columnKey) {
		return colsWidths.get(columnKey);
	});
	var colWidths = import_react$4.useMemo(function() {
		return pureColWidths;
	}, [pureColWidths.join("_")]);
	var stickyOffsets = useStickyOffsets_default(colWidths, flattenColumns, direction);
	var fixHeader = scroll && validateValue(scroll.y);
	var horizonScroll = scroll && validateValue(mergedScrollX) || Boolean(expandableConfig.fixed);
	var fixColumn = horizonScroll && flattenColumns.some(function(_ref) {
		return _ref.fixed;
	});
	var stickyRef = import_react$4.useRef();
	var _useSticky = useSticky(sticky, prefixCls), isSticky = _useSticky.isSticky, offsetHeader = _useSticky.offsetHeader, offsetSummary = _useSticky.offsetSummary, offsetScroll = _useSticky.offsetScroll, stickyClassName = _useSticky.stickyClassName, container = _useSticky.container;
	var summaryNode = import_react$4.useMemo(function() {
		return summary === null || summary === void 0 ? void 0 : summary(mergedData);
	}, [summary, mergedData]);
	var fixFooter = (fixHeader || isSticky) && /* @__PURE__ */ import_react$4.isValidElement(summaryNode) && summaryNode.type === Summary_default && summaryNode.props.fixed;
	var scrollXStyle;
	var scrollYStyle;
	var scrollTableStyle;
	if (fixHeader) scrollYStyle = {
		overflowY: hasData ? "scroll" : "auto",
		maxHeight: scroll.y
	};
	if (horizonScroll) {
		scrollXStyle = { overflowX: "auto" };
		if (!fixHeader) scrollYStyle = { overflowY: "hidden" };
		scrollTableStyle = {
			width: mergedScrollX === true ? "auto" : mergedScrollX,
			minWidth: "100%"
		};
	}
	var onColumnResize = import_react$4.useCallback(function(columnKey, width) {
		updateColsWidths(function(widths) {
			if (widths.get(columnKey) !== width) {
				var newWidths = new Map(widths);
				newWidths.set(columnKey, width);
				return newWidths;
			}
			return widths;
		});
	}, []);
	var _useTimeoutLock2 = _slicedToArray(useTimeoutLock(null), 2), setScrollTarget = _useTimeoutLock2[0], getScrollTarget = _useTimeoutLock2[1];
	function forceScroll(scrollLeft, target) {
		if (!target) return;
		if (typeof target === "function") target(scrollLeft);
		else if (target.scrollLeft !== scrollLeft) {
			target.scrollLeft = scrollLeft;
			if (target.scrollLeft !== scrollLeft) setTimeout(function() {
				target.scrollLeft = scrollLeft;
			}, 0);
		}
	}
	var onInternalScroll = useEvent(function(_ref2) {
		var currentTarget = _ref2.currentTarget, scrollLeft = _ref2.scrollLeft;
		var isRTL = direction === "rtl";
		var mergedScrollLeft = typeof scrollLeft === "number" ? scrollLeft : currentTarget.scrollLeft;
		var compareTarget = currentTarget || EMPTY_SCROLL_TARGET;
		if (!getScrollTarget() || getScrollTarget() === compareTarget) {
			var _stickyRef$current;
			setScrollTarget(compareTarget);
			forceScroll(mergedScrollLeft, scrollHeaderRef.current);
			forceScroll(mergedScrollLeft, scrollBodyRef.current);
			forceScroll(mergedScrollLeft, scrollSummaryRef.current);
			forceScroll(mergedScrollLeft, (_stickyRef$current = stickyRef.current) === null || _stickyRef$current === void 0 ? void 0 : _stickyRef$current.setScrollLeft);
		}
		var measureTarget = currentTarget || scrollHeaderRef.current;
		if (measureTarget) {
			var scrollWidth = useInternalHooks && tailor && typeof mergedScrollX === "number" ? mergedScrollX : measureTarget.scrollWidth;
			var clientWidth = measureTarget.clientWidth;
			if (scrollWidth === clientWidth) {
				setPingedLeft(false);
				setPingedRight(false);
				return;
			}
			if (isRTL) {
				setPingedLeft(-mergedScrollLeft < scrollWidth - clientWidth);
				setPingedRight(-mergedScrollLeft > 0);
			} else {
				setPingedLeft(mergedScrollLeft > 0);
				setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
			}
		}
	});
	var onBodyScroll = useEvent(function(e) {
		onInternalScroll(e);
		onScroll === null || onScroll === void 0 || onScroll(e);
	});
	var triggerOnScroll = function triggerOnScroll$1() {
		if (horizonScroll && scrollBodyRef.current) {
			var _scrollBodyRef$curren4;
			onInternalScroll({
				currentTarget: getDOM(scrollBodyRef.current),
				scrollLeft: (_scrollBodyRef$curren4 = scrollBodyRef.current) === null || _scrollBodyRef$curren4 === void 0 ? void 0 : _scrollBodyRef$curren4.scrollLeft
			});
		} else {
			setPingedLeft(false);
			setPingedRight(false);
		}
	};
	var onFullTableResize = function onFullTableResize$1(_ref3) {
		var _stickyRef$current2;
		var width = _ref3.width;
		(_stickyRef$current2 = stickyRef.current) === null || _stickyRef$current2 === void 0 || _stickyRef$current2.checkScrollBarVisible();
		var mergedWidth = fullTableRef.current ? fullTableRef.current.offsetWidth : width;
		if (useInternalHooks && getContainerWidth && fullTableRef.current) mergedWidth = getContainerWidth(fullTableRef.current, mergedWidth) || mergedWidth;
		if (mergedWidth !== componentWidth) {
			triggerOnScroll();
			setComponentWidth(mergedWidth);
		}
	};
	var mounted = import_react$4.useRef(false);
	import_react$4.useEffect(function() {
		if (mounted.current) triggerOnScroll();
	}, [
		horizonScroll,
		data,
		columns.length
	]);
	import_react$4.useEffect(function() {
		mounted.current = true;
	}, []);
	var _React$useState10 = _slicedToArray(import_react$4.useState(0), 2), scrollbarSize = _React$useState10[0], setScrollbarSize = _React$useState10[1];
	var _React$useState12 = _slicedToArray(import_react$4.useState(true), 2), supportSticky = _React$useState12[0], setSupportSticky = _React$useState12[1];
	useLayoutEffect_default(function() {
		if (!tailor || !useInternalHooks) if (scrollBodyRef.current instanceof Element) setScrollbarSize(getTargetScrollBarSize(scrollBodyRef.current).width);
		else setScrollbarSize(getTargetScrollBarSize(scrollBodyContainerRef.current).width);
		setSupportSticky(isStyleSupport("position", "sticky"));
	}, []);
	import_react$4.useEffect(function() {
		if (useInternalHooks && internalRefs) internalRefs.body.current = scrollBodyRef.current;
	});
	var renderFixedHeaderTable = import_react$4.useCallback(function(fixedHolderPassProps) {
		return /* @__PURE__ */ import_react$4.createElement(import_react$4.Fragment, null, /* @__PURE__ */ import_react$4.createElement(Header_default, fixedHolderPassProps), fixFooter === "top" && /* @__PURE__ */ import_react$4.createElement(Footer_default, fixedHolderPassProps, summaryNode));
	}, [fixFooter, summaryNode]);
	var renderFixedFooterTable = import_react$4.useCallback(function(fixedHolderPassProps) {
		return /* @__PURE__ */ import_react$4.createElement(Footer_default, fixedHolderPassProps, summaryNode);
	}, [summaryNode]);
	var TableComponent = getComponent(["table"], "table");
	var mergedTableLayout = import_react$4.useMemo(function() {
		if (tableLayout) return tableLayout;
		if (fixColumn) return mergedScrollX === "max-content" ? "auto" : "fixed";
		if (fixHeader || isSticky || flattenColumns.some(function(_ref4) {
			return _ref4.ellipsis;
		})) return "fixed";
		return "auto";
	}, [
		fixHeader,
		fixColumn,
		flattenColumns,
		tableLayout,
		isSticky
	]);
	var groupTableNode;
	var headerProps = {
		colWidths,
		columCount: flattenColumns.length,
		stickyOffsets,
		onHeaderRow,
		fixHeader,
		scroll
	};
	var emptyNode = import_react$4.useMemo(function() {
		if (hasData) return null;
		if (typeof emptyText === "function") return emptyText();
		return emptyText;
	}, [hasData, emptyText]);
	var bodyTable = /* @__PURE__ */ import_react$4.createElement(Body_default, {
		data: mergedData,
		measureColumnWidth: fixHeader || horizonScroll || isSticky
	});
	var bodyColGroup = /* @__PURE__ */ import_react$4.createElement(ColGroup_default, {
		colWidths: flattenColumns.map(function(_ref5) {
			return _ref5.width;
		}),
		columns: flattenColumns
	});
	var captionElement = caption !== null && caption !== void 0 ? /* @__PURE__ */ import_react$4.createElement("caption", { className: "".concat(prefixCls, "-caption") }, caption) : void 0;
	var dataProps = pickAttrs(props, { data: true });
	var ariaProps = pickAttrs(props, { aria: true });
	if (fixHeader || isSticky) {
		var bodyContent;
		if (typeof customizeScrollBody === "function") {
			bodyContent = customizeScrollBody(mergedData, {
				scrollbarSize,
				ref: scrollBodyRef,
				onScroll: onInternalScroll
			});
			headerProps.colWidths = flattenColumns.map(function(_ref6, index) {
				var width = _ref6.width;
				var colWidth = index === flattenColumns.length - 1 ? width - scrollbarSize : width;
				if (typeof colWidth === "number" && !Number.isNaN(colWidth)) return colWidth;
				return 0;
			});
		} else bodyContent = /* @__PURE__ */ import_react$4.createElement("div", {
			style: _objectSpread2(_objectSpread2({}, scrollXStyle), scrollYStyle),
			onScroll: onBodyScroll,
			ref: scrollBodyRef,
			className: (0, import_classnames$3.default)("".concat(prefixCls, "-body"))
		}, /* @__PURE__ */ import_react$4.createElement(TableComponent, _extends({ style: _objectSpread2(_objectSpread2({}, scrollTableStyle), {}, { tableLayout: mergedTableLayout }) }, ariaProps), captionElement, bodyColGroup, bodyTable, !fixFooter && summaryNode && /* @__PURE__ */ import_react$4.createElement(Footer_default, {
			stickyOffsets,
			flattenColumns
		}, summaryNode)));
		var fixedHolderProps = _objectSpread2(_objectSpread2(_objectSpread2({
			noData: !mergedData.length,
			maxContentScroll: horizonScroll && mergedScrollX === "max-content"
		}, headerProps), columnContext), {}, {
			direction,
			stickyClassName,
			onScroll: onInternalScroll
		});
		groupTableNode = /* @__PURE__ */ import_react$4.createElement(import_react$4.Fragment, null, showHeader !== false && /* @__PURE__ */ import_react$4.createElement(FixedHolder_default, _extends({}, fixedHolderProps, {
			stickyTopOffset: offsetHeader,
			className: "".concat(prefixCls, "-header"),
			ref: scrollHeaderRef
		}), renderFixedHeaderTable), bodyContent, fixFooter && fixFooter !== "top" && /* @__PURE__ */ import_react$4.createElement(FixedHolder_default, _extends({}, fixedHolderProps, {
			stickyBottomOffset: offsetSummary,
			className: "".concat(prefixCls, "-summary"),
			ref: scrollSummaryRef
		}), renderFixedFooterTable), isSticky && scrollBodyRef.current && scrollBodyRef.current instanceof Element && /* @__PURE__ */ import_react$4.createElement(stickyScrollBar_default, {
			ref: stickyRef,
			offsetScroll,
			scrollBodyRef,
			onScroll: onInternalScroll,
			container,
			direction
		}));
	} else groupTableNode = /* @__PURE__ */ import_react$4.createElement("div", {
		style: _objectSpread2(_objectSpread2({}, scrollXStyle), scrollYStyle),
		className: (0, import_classnames$3.default)("".concat(prefixCls, "-content")),
		onScroll: onInternalScroll,
		ref: scrollBodyRef
	}, /* @__PURE__ */ import_react$4.createElement(TableComponent, _extends({ style: _objectSpread2(_objectSpread2({}, scrollTableStyle), {}, { tableLayout: mergedTableLayout }) }, ariaProps), captionElement, bodyColGroup, showHeader !== false && /* @__PURE__ */ import_react$4.createElement(Header_default, _extends({}, headerProps, columnContext)), bodyTable, summaryNode && /* @__PURE__ */ import_react$4.createElement(Footer_default, {
		stickyOffsets,
		flattenColumns
	}, summaryNode)));
	var fullTable = /* @__PURE__ */ import_react$4.createElement("div", _extends({
		className: (0, import_classnames$3.default)(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-rtl"), direction === "rtl"), "".concat(prefixCls, "-ping-left"), pingedLeft), "".concat(prefixCls, "-ping-right"), pingedRight), "".concat(prefixCls, "-layout-fixed"), tableLayout === "fixed"), "".concat(prefixCls, "-fixed-header"), fixHeader), "".concat(prefixCls, "-fixed-column"), fixColumn), "".concat(prefixCls, "-fixed-column-gapped"), fixColumn && hasGapFixed), "".concat(prefixCls, "-scroll-horizontal"), horizonScroll), "".concat(prefixCls, "-has-fix-left"), flattenColumns[0] && flattenColumns[0].fixed), "".concat(prefixCls, "-has-fix-right"), flattenColumns[flattenColumns.length - 1] && flattenColumns[flattenColumns.length - 1].fixed === "right")),
		style,
		id,
		ref: fullTableRef
	}, dataProps), title && /* @__PURE__ */ import_react$4.createElement(Panel_default, { className: "".concat(prefixCls, "-title") }, title(mergedData)), /* @__PURE__ */ import_react$4.createElement("div", {
		ref: scrollBodyContainerRef,
		className: "".concat(prefixCls, "-container")
	}, groupTableNode), footer && /* @__PURE__ */ import_react$4.createElement(Panel_default, { className: "".concat(prefixCls, "-footer") }, footer(mergedData)));
	if (horizonScroll) fullTable = /* @__PURE__ */ import_react$4.createElement(es_default$2, { onResize: onFullTableResize }, fullTable);
	var fixedInfoList = useFixedInfo(flattenColumns, stickyOffsets, direction);
	var TableContextValue = import_react$4.useMemo(function() {
		return {
			scrollX: mergedScrollX,
			prefixCls,
			getComponent,
			scrollbarSize,
			direction,
			fixedInfoList,
			isSticky,
			supportSticky,
			componentWidth,
			fixHeader,
			fixColumn,
			horizonScroll,
			tableLayout: mergedTableLayout,
			rowClassName,
			expandedRowClassName: expandableConfig.expandedRowClassName,
			expandIcon: mergedExpandIcon,
			expandableType,
			expandRowByClick: expandableConfig.expandRowByClick,
			expandedRowRender: expandableConfig.expandedRowRender,
			expandedRowOffset: expandableConfig.expandedRowOffset,
			onTriggerExpand,
			expandIconColumnIndex: expandableConfig.expandIconColumnIndex,
			indentSize: expandableConfig.indentSize,
			allColumnsFixedLeft: flattenColumns.every(function(col) {
				return col.fixed === "left";
			}),
			emptyNode,
			columns,
			flattenColumns,
			onColumnResize,
			colWidths,
			hoverStartRow: startRow,
			hoverEndRow: endRow,
			onHover,
			rowExpandable: expandableConfig.rowExpandable,
			onRow,
			getRowKey,
			expandedKeys: mergedExpandedKeys,
			childrenColumnName: mergedChildrenColumnName,
			rowHoverable
		};
	}, [
		mergedScrollX,
		prefixCls,
		getComponent,
		scrollbarSize,
		direction,
		fixedInfoList,
		isSticky,
		supportSticky,
		componentWidth,
		fixHeader,
		fixColumn,
		horizonScroll,
		mergedTableLayout,
		rowClassName,
		expandableConfig.expandedRowClassName,
		mergedExpandIcon,
		expandableType,
		expandableConfig.expandRowByClick,
		expandableConfig.expandedRowRender,
		expandableConfig.expandedRowOffset,
		onTriggerExpand,
		expandableConfig.expandIconColumnIndex,
		expandableConfig.indentSize,
		emptyNode,
		columns,
		flattenColumns,
		onColumnResize,
		colWidths,
		startRow,
		endRow,
		onHover,
		expandableConfig.rowExpandable,
		onRow,
		getRowKey,
		mergedExpandedKeys,
		mergedChildrenColumnName,
		rowHoverable
	]);
	return /* @__PURE__ */ import_react$4.createElement(TableContext_default.Provider, { value: TableContextValue }, fullTable);
}
function genTable(shouldTriggerRender) {
	return makeImmutable(RefTable, shouldTriggerRender);
}
var import_classnames$3, import_react$4, DEFAULT_PREFIX, EMPTY_DATA, EMPTY_SCROLL_TARGET, RefTable, ImmutableTable, Table_default;
var init_Table = __esmMin((() => {
	init_defineProperty();
	init_extends();
	init_slicedToArray();
	init_objectSpread2();
	import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$6();
	init_styleChecker();
	init_getScrollBarSize();
	init_useEvent();
	init_pickAttrs();
	init_get();
	init_warning();
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_Body();
	init_ColGroup();
	init_constant();
	init_TableContext();
	init_FixedHolder();
	init_Footer();
	init_Summary();
	init_Header();
	init_useColumns();
	init_useExpand();
	init_useFixedInfo();
	init_useFrame();
	init_useHover();
	init_useSticky();
	init_useStickyOffsets();
	init_Panel();
	init_stickyScrollBar();
	init_Column();
	init_ColumnGroup();
	init_valueUtil();
	init_findDOMNode();
	init_useLayoutEffect();
	DEFAULT_PREFIX = "rc-table";
	EMPTY_DATA = [];
	EMPTY_SCROLL_TARGET = {};
	RefTable = /* @__PURE__ */ import_react$4.forwardRef(Table);
	ImmutableTable = genTable();
	ImmutableTable.EXPAND_COLUMN = EXPAND_COLUMN;
	ImmutableTable.INTERNAL_HOOKS = INTERNAL_HOOKS;
	ImmutableTable.Column = Column_default;
	ImmutableTable.ColumnGroup = ColumnGroup_default;
	ImmutableTable.Summary = FooterComponents;
	Table_default = ImmutableTable;
}));
var StaticContext, GridContext;
var init_context = __esmMin((() => {
	init_es$1();
	StaticContext = createContext(null);
	GridContext = createContext(null);
}));
function getColumnWidth(colIndex, colSpan, columnsOffset) {
	return columnsOffset[colIndex + (colSpan || 1)] - (columnsOffset[colIndex] || 0);
}
function VirtualCell(props) {
	var rowInfo = props.rowInfo, column = props.column, colIndex = props.colIndex, indent = props.indent, index = props.index, component = props.component, renderIndex = props.renderIndex, record = props.record, style = props.style, className = props.className, inverse = props.inverse, getHeight = props.getHeight;
	var render = column.render, dataIndex = column.dataIndex, columnClassName = column.className, colWidth = column.width;
	var columnsOffset = useContext(GridContext, ["columnsOffset"]).columnsOffset;
	var _getCellProps = getCellProps(rowInfo, column, colIndex, indent, index), key = _getCellProps.key, fixedInfo = _getCellProps.fixedInfo, appendCellNode = _getCellProps.appendCellNode, additionalCellProps = _getCellProps.additionalCellProps;
	var cellStyle = additionalCellProps.style, _additionalCellProps$ = additionalCellProps.colSpan, colSpan = _additionalCellProps$ === void 0 ? 1 : _additionalCellProps$, _additionalCellProps$2 = additionalCellProps.rowSpan, rowSpan = _additionalCellProps$2 === void 0 ? 1 : _additionalCellProps$2;
	var concatColWidth = getColumnWidth(colIndex - 1, colSpan, columnsOffset);
	var marginOffset = colSpan > 1 ? colWidth - concatColWidth : 0;
	var mergedStyle = _objectSpread2(_objectSpread2(_objectSpread2({}, cellStyle), style), {}, {
		flex: "0 0 ".concat(concatColWidth, "px"),
		width: "".concat(concatColWidth, "px"),
		marginRight: marginOffset,
		pointerEvents: "auto"
	});
	var needHide = import_react$3.useMemo(function() {
		if (inverse) return rowSpan <= 1;
		else return colSpan === 0 || rowSpan === 0 || rowSpan > 1;
	}, [
		rowSpan,
		colSpan,
		inverse
	]);
	if (needHide) mergedStyle.visibility = "hidden";
	else if (inverse) mergedStyle.height = getHeight === null || getHeight === void 0 ? void 0 : getHeight(rowSpan);
	var mergedRender = needHide ? function() {
		return null;
	} : render;
	var cellSpan = {};
	if (rowSpan === 0 || colSpan === 0) {
		cellSpan.rowSpan = 1;
		cellSpan.colSpan = 1;
	}
	return /* @__PURE__ */ import_react$3.createElement(Cell_default, _extends({
		className: (0, import_classnames$2.default)(columnClassName, className),
		ellipsis: column.ellipsis,
		align: column.align,
		scope: column.rowScope,
		component,
		prefixCls: rowInfo.prefixCls,
		key,
		record,
		index,
		renderIndex,
		dataIndex,
		render: mergedRender,
		shouldCellUpdate: column.shouldCellUpdate
	}, fixedInfo, {
		appendNode: appendCellNode,
		additionalProps: _objectSpread2(_objectSpread2({}, additionalCellProps), {}, { style: mergedStyle }, cellSpan)
	}));
}
var import_classnames$2, import_react$3, VirtualCell_default;
var init_VirtualCell = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_es$1();
	import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_BodyRow();
	init_Cell$1();
	init_context();
	VirtualCell_default = VirtualCell;
}));
var import_classnames$1, import_react$2, _excluded, ResponseBodyLine, BodyLine_default;
var init_BodyLine = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_defineProperty();
	init_objectWithoutProperties();
	init_es$1();
	import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_Cell$1();
	init_TableContext();
	init_useRowInfo();
	init_VirtualCell();
	init_context();
	init_expandUtil();
	_excluded = [
		"data",
		"index",
		"className",
		"rowKey",
		"style",
		"extra",
		"getHeight"
	];
	ResponseBodyLine = responseImmutable(/* @__PURE__ */ import_react$2.forwardRef(function(props, ref) {
		var data = props.data, index = props.index, className = props.className, rowKey = props.rowKey, style = props.style, extra = props.extra, getHeight = props.getHeight, restProps = _objectWithoutProperties(props, _excluded);
		var record = data.record, indent = data.indent, renderIndex = data.index;
		var _useContext = useContext(TableContext_default, [
			"prefixCls",
			"flattenColumns",
			"fixColumn",
			"componentWidth",
			"scrollX"
		]), scrollX = _useContext.scrollX, flattenColumns = _useContext.flattenColumns, prefixCls = _useContext.prefixCls, fixColumn = _useContext.fixColumn, componentWidth = _useContext.componentWidth;
		var getComponent = useContext(StaticContext, ["getComponent"]).getComponent;
		var rowInfo = useRowInfo(record, rowKey, index, indent);
		var RowComponent = getComponent(["body", "row"], "div");
		var cellComponent = getComponent(["body", "cell"], "div");
		var rowSupportExpand = rowInfo.rowSupportExpand, expanded = rowInfo.expanded, rowProps = rowInfo.rowProps, expandedRowRender = rowInfo.expandedRowRender, expandedRowClassName = rowInfo.expandedRowClassName;
		var expandRowNode;
		if (rowSupportExpand && expanded) {
			var expandContent = expandedRowRender(record, index, indent + 1, expanded);
			var expandedClsName = computedExpandedClassName(expandedRowClassName, record, index, indent);
			var additionalProps = {};
			if (fixColumn) additionalProps = { style: _defineProperty({}, "--virtual-width", "".concat(componentWidth, "px")) };
			var rowCellCls = "".concat(prefixCls, "-expanded-row-cell");
			expandRowNode = /* @__PURE__ */ import_react$2.createElement(RowComponent, { className: (0, import_classnames$1.default)("".concat(prefixCls, "-expanded-row"), "".concat(prefixCls, "-expanded-row-level-").concat(indent + 1), expandedClsName) }, /* @__PURE__ */ import_react$2.createElement(Cell_default, {
				component: cellComponent,
				prefixCls,
				className: (0, import_classnames$1.default)(rowCellCls, _defineProperty({}, "".concat(rowCellCls, "-fixed"), fixColumn)),
				additionalProps
			}, expandContent));
		}
		var rowStyle = _objectSpread2(_objectSpread2({}, style), {}, { width: scrollX });
		if (extra) {
			rowStyle.position = "absolute";
			rowStyle.pointerEvents = "none";
		}
		var rowNode = /* @__PURE__ */ import_react$2.createElement(RowComponent, _extends({}, rowProps, restProps, {
			"data-row-key": rowKey,
			ref: rowSupportExpand ? null : ref,
			className: (0, import_classnames$1.default)(className, "".concat(prefixCls, "-row"), rowProps === null || rowProps === void 0 ? void 0 : rowProps.className, _defineProperty({}, "".concat(prefixCls, "-row-extra"), extra)),
			style: _objectSpread2(_objectSpread2({}, rowStyle), rowProps === null || rowProps === void 0 ? void 0 : rowProps.style)
		}), flattenColumns.map(function(column, colIndex) {
			return /* @__PURE__ */ import_react$2.createElement(VirtualCell_default, {
				key: colIndex,
				component: cellComponent,
				rowInfo,
				column,
				colIndex,
				indent,
				index,
				renderIndex,
				record,
				inverse: extra,
				getHeight
			});
		}));
		if (rowSupportExpand) return /* @__PURE__ */ import_react$2.createElement("div", { ref }, rowNode, expandRowNode);
		return rowNode;
	}));
	BodyLine_default = ResponseBodyLine;
}));
var import_react$1, ResponseGrid, BodyGrid_default;
var init_BodyGrid = __esmMin((() => {
	init_typeof();
	init_slicedToArray();
	init_es$1();
	init_es$9();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_TableContext();
	init_useFlattenRecords();
	init_BodyLine();
	init_context();
	ResponseGrid = responseImmutable(/* @__PURE__ */ import_react$1.forwardRef(function(props, ref) {
		var data = props.data, onScroll = props.onScroll;
		var _useContext = useContext(TableContext_default, [
			"flattenColumns",
			"onColumnResize",
			"getRowKey",
			"prefixCls",
			"expandedKeys",
			"childrenColumnName",
			"scrollX",
			"direction"
		]), flattenColumns = _useContext.flattenColumns, onColumnResize = _useContext.onColumnResize, getRowKey = _useContext.getRowKey, expandedKeys = _useContext.expandedKeys, prefixCls = _useContext.prefixCls, childrenColumnName = _useContext.childrenColumnName, scrollX = _useContext.scrollX, direction = _useContext.direction;
		var _useContext2 = useContext(StaticContext), sticky = _useContext2.sticky, scrollY = _useContext2.scrollY, listItemHeight = _useContext2.listItemHeight, getComponent = _useContext2.getComponent, onTablePropScroll = _useContext2.onScroll;
		var listRef = import_react$1.useRef();
		var flattenData = useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey);
		var columnsWidth = import_react$1.useMemo(function() {
			var total = 0;
			return flattenColumns.map(function(_ref) {
				var width = _ref.width, key = _ref.key;
				total += width;
				return [
					key,
					width,
					total
				];
			});
		}, [flattenColumns]);
		var columnsOffset = import_react$1.useMemo(function() {
			return columnsWidth.map(function(colWidth) {
				return colWidth[2];
			});
		}, [columnsWidth]);
		import_react$1.useEffect(function() {
			columnsWidth.forEach(function(_ref2) {
				var _ref3 = _slicedToArray(_ref2, 2), key = _ref3[0], width = _ref3[1];
				onColumnResize(key, width);
			});
		}, [columnsWidth]);
		import_react$1.useImperativeHandle(ref, function() {
			var _listRef$current2;
			var obj = {
				scrollTo: function scrollTo(config) {
					var _listRef$current;
					(_listRef$current = listRef.current) === null || _listRef$current === void 0 || _listRef$current.scrollTo(config);
				},
				nativeElement: (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 ? void 0 : _listRef$current2.nativeElement
			};
			Object.defineProperty(obj, "scrollLeft", {
				get: function get$1() {
					var _listRef$current3;
					return ((_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 ? void 0 : _listRef$current3.getScrollInfo().x) || 0;
				},
				set: function set(value) {
					var _listRef$current4;
					(_listRef$current4 = listRef.current) === null || _listRef$current4 === void 0 || _listRef$current4.scrollTo({ left: value });
				}
			});
			return obj;
		});
		var getRowSpan = function getRowSpan$1(column, index) {
			var _flattenData$index;
			var record = (_flattenData$index = flattenData[index]) === null || _flattenData$index === void 0 ? void 0 : _flattenData$index.record;
			var onCell = column.onCell;
			if (onCell) {
				var _cellProps$rowSpan;
				var cellProps = onCell(record, index);
				return (_cellProps$rowSpan = cellProps === null || cellProps === void 0 ? void 0 : cellProps.rowSpan) !== null && _cellProps$rowSpan !== void 0 ? _cellProps$rowSpan : 1;
			}
			return 1;
		};
		var extraRender = function extraRender$1(info) {
			var start = info.start, end = info.end, getSize$1 = info.getSize, offsetY = info.offsetY;
			if (end < 0) return null;
			var firstRowSpanColumns = flattenColumns.filter(function(column) {
				return getRowSpan(column, start) === 0;
			});
			var startIndex = start;
			var _loop = function _loop$1(i$1) {
				firstRowSpanColumns = firstRowSpanColumns.filter(function(column) {
					return getRowSpan(column, i$1) === 0;
				});
				if (!firstRowSpanColumns.length) {
					startIndex = i$1;
					return 1;
				}
			};
			for (var i = start; i >= 0; i -= 1) if (_loop(i)) break;
			var lastRowSpanColumns = flattenColumns.filter(function(column) {
				return getRowSpan(column, end) !== 1;
			});
			var endIndex = end;
			var _loop2 = function _loop2$1(_i$1) {
				lastRowSpanColumns = lastRowSpanColumns.filter(function(column) {
					return getRowSpan(column, _i$1) !== 1;
				});
				if (!lastRowSpanColumns.length) {
					endIndex = Math.max(_i$1 - 1, end);
					return 1;
				}
			};
			for (var _i = end; _i < flattenData.length; _i += 1) if (_loop2(_i)) break;
			var spanLines = [];
			var _loop3 = function _loop3$1(_i2$1) {
				if (!flattenData[_i2$1]) return 1;
				if (flattenColumns.some(function(column) {
					return getRowSpan(column, _i2$1) > 1;
				})) spanLines.push(_i2$1);
			};
			for (var _i2 = startIndex; _i2 <= endIndex; _i2 += 1) if (_loop3(_i2)) continue;
			return spanLines.map(function(index) {
				var item = flattenData[index];
				var rowKey = getRowKey(item.record, index);
				var getHeight = function getHeight$1(rowSpan) {
					var endItemIndex = index + rowSpan - 1;
					var sizeInfo$1 = getSize$1(rowKey, getRowKey(flattenData[endItemIndex].record, endItemIndex));
					return sizeInfo$1.bottom - sizeInfo$1.top;
				};
				var sizeInfo = getSize$1(rowKey);
				return /* @__PURE__ */ import_react$1.createElement(BodyLine_default, {
					key: index,
					data: item,
					rowKey,
					index,
					style: { top: -offsetY + sizeInfo.top },
					extra: true,
					getHeight
				});
			});
		};
		var gridContext = import_react$1.useMemo(function() {
			return { columnsOffset };
		}, [columnsOffset]);
		var tblPrefixCls = "".concat(prefixCls, "-tbody");
		var wrapperComponent = getComponent(["body", "wrapper"]);
		var horizontalScrollBarStyle = {};
		if (sticky) {
			horizontalScrollBarStyle.position = "sticky";
			horizontalScrollBarStyle.bottom = 0;
			if (_typeof(sticky) === "object" && sticky.offsetScroll) horizontalScrollBarStyle.bottom = sticky.offsetScroll;
		}
		return /* @__PURE__ */ import_react$1.createElement(GridContext.Provider, { value: gridContext }, /* @__PURE__ */ import_react$1.createElement(es_default$1, {
			fullHeight: false,
			ref: listRef,
			prefixCls: "".concat(tblPrefixCls, "-virtual"),
			styles: { horizontalScrollBar: horizontalScrollBarStyle },
			className: tblPrefixCls,
			height: scrollY,
			itemHeight: listItemHeight || 24,
			data: flattenData,
			itemKey: function itemKey(item) {
				return getRowKey(item.record);
			},
			component: wrapperComponent,
			scrollWidth: scrollX,
			direction,
			onVirtualScroll: function onVirtualScroll(_ref4) {
				var _listRef$current5;
				var x = _ref4.x;
				onScroll({
					currentTarget: (_listRef$current5 = listRef.current) === null || _listRef$current5 === void 0 ? void 0 : _listRef$current5.nativeElement,
					scrollLeft: x
				});
			},
			onScroll: onTablePropScroll,
			extraRender
		}, function(item, index, itemProps) {
			var rowKey = getRowKey(item.record, index);
			return /* @__PURE__ */ import_react$1.createElement(BodyLine_default, {
				data: item,
				rowKey,
				index,
				style: itemProps.style
			});
		}));
	}));
	BodyGrid_default = ResponseGrid;
}));
function VirtualTable(props, ref) {
	var data = props.data, columns = props.columns, scroll = props.scroll, sticky = props.sticky, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? DEFAULT_PREFIX : _props$prefixCls, className = props.className, listItemHeight = props.listItemHeight, components = props.components, onScroll = props.onScroll;
	var _ref = scroll || {}, scrollX = _ref.x, scrollY = _ref.y;
	if (typeof scrollX !== "number") scrollX = 1;
	if (typeof scrollY !== "number") scrollY = 500;
	var getComponent = useEvent(function(path, defaultComponent) {
		return get(components, path) || defaultComponent;
	});
	var onInternalScroll = useEvent(onScroll);
	var context = import_react.useMemo(function() {
		return {
			sticky,
			scrollY,
			listItemHeight,
			getComponent,
			onScroll: onInternalScroll
		};
	}, [
		sticky,
		scrollY,
		listItemHeight,
		getComponent,
		onInternalScroll
	]);
	return /* @__PURE__ */ import_react.createElement(StaticContext.Provider, { value: context }, /* @__PURE__ */ import_react.createElement(Table_default, _extends({}, props, {
		className: (0, import_classnames.default)(className, "".concat(prefixCls, "-virtual")),
		scroll: _objectSpread2(_objectSpread2({}, scroll), {}, { x: scrollX }),
		components: _objectSpread2(_objectSpread2({}, components), {}, { body: data !== null && data !== void 0 && data.length ? renderBody : void 0 }),
		columns,
		internalHooks: INTERNAL_HOOKS,
		tailor: true,
		ref
	})));
}
function genVirtualTable(shouldTriggerRender) {
	return makeImmutable(RefVirtualTable, shouldTriggerRender);
}
var import_classnames, import_react, renderBody, RefVirtualTable, VirtualTable_default;
var init_VirtualTable = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	init_es$8();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_constant();
	init_TableContext();
	init_Table();
	init_BodyGrid();
	init_context();
	init_get();
	renderBody = function renderBody$1(rawData, props) {
		var ref = props.ref, onScroll = props.onScroll;
		return /* @__PURE__ */ import_react.createElement(BodyGrid_default, {
			ref,
			data: rawData,
			onScroll
		});
	};
	RefVirtualTable = /* @__PURE__ */ import_react.forwardRef(VirtualTable);
	VirtualTable_default = genVirtualTable();
}));
var es_exports = /* @__PURE__ */ __export({
	Column: () => Column_default,
	ColumnGroup: () => ColumnGroup_default,
	EXPAND_COLUMN: () => EXPAND_COLUMN,
	INTERNAL_COL_DEFINE: () => INTERNAL_COL_DEFINE,
	INTERNAL_HOOKS: () => INTERNAL_HOOKS,
	Summary: () => FooterComponents,
	VirtualTable: () => VirtualTable_default,
	default: () => es_default,
	genTable: () => genTable,
	genVirtualTable: () => genVirtualTable
}, 1);
var es_default;
var init_es = __esmMin((() => {
	init_constant();
	init_Footer();
	init_Column();
	init_ColumnGroup();
	init_Table();
	init_legacyUtil();
	init_VirtualTable();
	es_default = Table_default;
}));
export { convertChildrenToColumns as a, FooterComponents as c, es_default$3 as d, es_exports$1 as f, init_es$3 as g, es_exports$2 as h, genTable as i, EXPAND_COLUMN as l, es_default$4 as m, init_es as n, init_useColumns as o, init_es$2 as p, genVirtualTable as r, INTERNAL_COL_DEFINE as s, es_exports as t, INTERNAL_HOOKS as u };
