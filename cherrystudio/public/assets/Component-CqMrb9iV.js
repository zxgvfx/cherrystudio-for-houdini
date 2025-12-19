import { b as __commonJSMin, c as __esmMin, d as __export, g as __toESM } from "./chunk-st2fFX3F.js";
import { aC as CaretRightOutlined_default, aD as CaretDownOutlined_default, b$ as init_useId$3, bC as es_default$13, bD as init_es$24, bJ as es_default$14, bK as init_es$19, bL as init_isMobile, bM as isMobile_default, bi as es_default$17, bk as init_es$23, bo as MenuItem_default, bq as es_default$16, bs as init_es$22, c as init_es$25, c0 as useId_default$1, c1 as es_default$10, c2 as init_es$21, cE as getShadowRoot, cF as init_shadow, cI as es_default$4, cK as init_es$17, cL as CSSMotionList_default, cS as init_es$18, cT as init_useMergedState, cU as useMergedState, cX as init_useEvent, cY as useEvent, cg as init_isVisible, ch as isVisible_default, ci as init_omit, cj as omit, ck as _asyncToGenerator, cl as init_asyncToGenerator, cm as _regeneratorRuntime, cn as init_regeneratorRuntime, cq as KeyCode_default, cr as init_KeyCode, cs as init_pickAttrs, ct as pickAttrs, d$ as init_createClass, dB as canUseDom, dC as init_canUseDom, dD as _slicedToArray, dE as init_slicedToArray, dF as init_raf, dG as raf_default, dH as _toConsumableArray, dI as init_toConsumableArray, dJ as _unsupportedIterableToArray, dK as init_unsupportedIterableToArray, dL as es_default$8, dN as init_es$20, dO as _createSuper, dP as init_createSuper, dS as _assertThisInitialized, dT as init_assertThisInitialized, dY as _inherits, dZ as init_inherits, d_ as _createClass, dc as _toArray, dd as init_toArray, dm as init_useLayoutEffect$2, dn as useLayoutEffect_default, do as useLayoutUpdateEffect, dv as _objectWithoutProperties, dw as init_objectWithoutProperties, e0 as _classCallCheck, e1 as init_classCallCheck, e4 as composeRef, e5 as fillRef, e6 as getNodeRef, e7 as init_ref, e9 as supportRef, ea as useComposeRef, eb as init_useMemo, ec as useMemo, eg as init_findDOMNode, eh as isDOM, ei as require_react_dom, ej as _objectSpread2, ek as init_objectSpread2, el as _defineProperty, em as init_defineProperty, en as init_warning, eo as warning, ep as warning_default, eq as init_toArray$1, er as toArray$1, es as _typeof, et as init_typeof, eu as _extends, ev as init_extends, ew as require_classnames, ex as require_jsx_runtime } from "./es-DSPzjfxW.js";
import { b as require_react } from "./react-nO8b1aHv.js";
var import_classnames$45, import_react$147, Notify, Notice_default;
var init_Notice = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_typeof();
	init_slicedToArray();
	import_classnames$45 = /* @__PURE__ */ __toESM(require_classnames());
	init_KeyCode();
	import_react$147 = /* @__PURE__ */ __toESM(require_react());
	init_pickAttrs();
	Notify = /* @__PURE__ */ import_react$147.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, style = props.style, className = props.className, _props$duration = props.duration, duration = _props$duration === void 0 ? 4.5 : _props$duration, showProgress = props.showProgress, _props$pauseOnHover = props.pauseOnHover, pauseOnHover = _props$pauseOnHover === void 0 ? true : _props$pauseOnHover, eventKey = props.eventKey, content = props.content, closable = props.closable, _props$closeIcon = props.closeIcon, closeIcon = _props$closeIcon === void 0 ? "x" : _props$closeIcon, divProps = props.props, onClick = props.onClick, onNoticeClose = props.onNoticeClose, times = props.times, forcedHovering = props.hovering;
		var _React$useState = import_react$147.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), hovering = _React$useState2[0], setHovering = _React$useState2[1];
		var _React$useState3 = import_react$147.useState(0), _React$useState4 = _slicedToArray(_React$useState3, 2), percent = _React$useState4[0], setPercent = _React$useState4[1];
		var _React$useState5 = import_react$147.useState(0), _React$useState6 = _slicedToArray(_React$useState5, 2), spentTime = _React$useState6[0], setSpentTime = _React$useState6[1];
		var mergedHovering = forcedHovering || hovering;
		var mergedShowProgress = duration > 0 && showProgress;
		var onInternalClose = function onInternalClose$1() {
			onNoticeClose(eventKey);
		};
		var onCloseKeyDown = function onCloseKeyDown$1(e) {
			if (e.key === "Enter" || e.code === "Enter" || e.keyCode === KeyCode_default.ENTER) onInternalClose();
		};
		import_react$147.useEffect(function() {
			if (!mergedHovering && duration > 0) {
				var start = Date.now() - spentTime;
				var timeout = setTimeout(function() {
					onInternalClose();
				}, duration * 1e3 - spentTime);
				return function() {
					if (pauseOnHover) clearTimeout(timeout);
					setSpentTime(Date.now() - start);
				};
			}
		}, [
			duration,
			mergedHovering,
			times
		]);
		import_react$147.useEffect(function() {
			if (!mergedHovering && mergedShowProgress && (pauseOnHover || spentTime === 0)) {
				var start = performance.now();
				var animationFrame;
				var calculate = function calculate$1() {
					cancelAnimationFrame(animationFrame);
					animationFrame = requestAnimationFrame(function(timestamp) {
						var runtime = timestamp + spentTime - start;
						var progress = Math.min(runtime / (duration * 1e3), 1);
						setPercent(progress * 100);
						if (progress < 1) calculate$1();
					});
				};
				calculate();
				return function() {
					if (pauseOnHover) cancelAnimationFrame(animationFrame);
				};
			}
		}, [
			duration,
			spentTime,
			mergedHovering,
			mergedShowProgress,
			times
		]);
		var closableObj = import_react$147.useMemo(function() {
			if (_typeof(closable) === "object" && closable !== null) return closable;
			if (closable) return { closeIcon };
			return {};
		}, [closable, closeIcon]);
		var ariaProps = pickAttrs(closableObj, true);
		var validPercent = 100 - (!percent || percent < 0 ? 0 : percent > 100 ? 100 : percent);
		var noticePrefixCls = "".concat(prefixCls, "-notice");
		return /* @__PURE__ */ import_react$147.createElement("div", _extends({}, divProps, {
			ref,
			className: (0, import_classnames$45.default)(noticePrefixCls, className, _defineProperty({}, "".concat(noticePrefixCls, "-closable"), closable)),
			style,
			onMouseEnter: function onMouseEnter(e) {
				var _divProps$onMouseEnte;
				setHovering(true);
				divProps === null || divProps === void 0 || (_divProps$onMouseEnte = divProps.onMouseEnter) === null || _divProps$onMouseEnte === void 0 || _divProps$onMouseEnte.call(divProps, e);
			},
			onMouseLeave: function onMouseLeave(e) {
				var _divProps$onMouseLeav;
				setHovering(false);
				divProps === null || divProps === void 0 || (_divProps$onMouseLeav = divProps.onMouseLeave) === null || _divProps$onMouseLeav === void 0 || _divProps$onMouseLeav.call(divProps, e);
			},
			onClick
		}), /* @__PURE__ */ import_react$147.createElement("div", { className: "".concat(noticePrefixCls, "-content") }, content), closable && /* @__PURE__ */ import_react$147.createElement("a", _extends({
			tabIndex: 0,
			className: "".concat(noticePrefixCls, "-close"),
			onKeyDown: onCloseKeyDown,
			"aria-label": "Close"
		}, ariaProps, { onClick: function onClick$1(e) {
			e.preventDefault();
			e.stopPropagation();
			onInternalClose();
		} }), closableObj.closeIcon), mergedShowProgress && /* @__PURE__ */ import_react$147.createElement("progress", {
			className: "".concat(noticePrefixCls, "-progress"),
			max: "100",
			value: validPercent
		}, validPercent + "%"));
	});
	Notice_default = Notify;
}));
var import_react$146, NotificationContext, NotificationProvider, NotificationProvider_default;
var init_NotificationProvider = __esmMin((() => {
	import_react$146 = /* @__PURE__ */ __toESM(require_react());
	NotificationContext = /* @__PURE__ */ import_react$146.createContext({});
	NotificationProvider = function NotificationProvider$1(_ref) {
		var children = _ref.children, classNames$41 = _ref.classNames;
		return /* @__PURE__ */ import_react$146.createElement(NotificationContext.Provider, { value: { classNames: classNames$41 } }, children);
	};
	NotificationProvider_default = NotificationProvider;
}));
var DEFAULT_OFFSET, DEFAULT_THRESHOLD, DEFAULT_GAP, useStack, useStack_default;
var init_useStack = __esmMin((() => {
	init_typeof();
	DEFAULT_OFFSET = 8;
	DEFAULT_THRESHOLD = 3;
	DEFAULT_GAP = 16;
	useStack = function useStack$1(config) {
		var result = {
			offset: DEFAULT_OFFSET,
			threshold: DEFAULT_THRESHOLD,
			gap: DEFAULT_GAP
		};
		if (config && _typeof(config) === "object") {
			var _config$offset, _config$threshold, _config$gap;
			result.offset = (_config$offset = config.offset) !== null && _config$offset !== void 0 ? _config$offset : DEFAULT_OFFSET;
			result.threshold = (_config$threshold = config.threshold) !== null && _config$threshold !== void 0 ? _config$threshold : DEFAULT_THRESHOLD;
			result.gap = (_config$gap = config.gap) !== null && _config$gap !== void 0 ? _config$gap : DEFAULT_GAP;
		}
		return [!!config, result];
	};
	useStack_default = useStack;
}));
var import_react$145, import_classnames$44, _excluded$34, NoticeList, NoticeList_default;
var init_NoticeList = __esmMin((() => {
	init_extends();
	init_toConsumableArray();
	init_objectSpread2();
	init_objectWithoutProperties();
	init_defineProperty();
	init_slicedToArray();
	import_react$145 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$44 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$17();
	init_Notice();
	init_NotificationProvider();
	init_useStack();
	_excluded$34 = [
		"className",
		"style",
		"classNames",
		"styles"
	];
	NoticeList = function NoticeList$1(props) {
		var configList = props.configList, placement = props.placement, prefixCls = props.prefixCls, className = props.className, style = props.style, motion = props.motion, onAllNoticeRemoved = props.onAllNoticeRemoved, onNoticeClose = props.onNoticeClose, stackConfig = props.stack;
		var _useContext = (0, import_react$145.useContext)(NotificationContext), ctxCls = _useContext.classNames;
		var dictRef = (0, import_react$145.useRef)({});
		var _useState = (0, import_react$145.useState)(null), _useState2 = _slicedToArray(_useState, 2), latestNotice = _useState2[0], setLatestNotice = _useState2[1];
		var _useState3 = (0, import_react$145.useState)([]), _useState4 = _slicedToArray(_useState3, 2), hoverKeys = _useState4[0], setHoverKeys = _useState4[1];
		var keys = configList.map(function(config) {
			return {
				config,
				key: String(config.key)
			};
		});
		var _useStack = useStack_default(stackConfig), _useStack2 = _slicedToArray(_useStack, 2), stack = _useStack2[0], _useStack2$ = _useStack2[1], offset = _useStack2$.offset, threshold = _useStack2$.threshold, gap = _useStack2$.gap;
		var expanded = stack && (hoverKeys.length > 0 || keys.length <= threshold);
		var placementMotion = typeof motion === "function" ? motion(placement) : motion;
		(0, import_react$145.useEffect)(function() {
			if (stack && hoverKeys.length > 1) setHoverKeys(function(prev) {
				return prev.filter(function(key) {
					return keys.some(function(_ref) {
						var dataKey = _ref.key;
						return key === dataKey;
					});
				});
			});
		}, [
			hoverKeys,
			keys,
			stack
		]);
		(0, import_react$145.useEffect)(function() {
			var _keys;
			if (stack && dictRef.current[(_keys = keys[keys.length - 1]) === null || _keys === void 0 ? void 0 : _keys.key]) {
				var _keys2;
				setLatestNotice(dictRef.current[(_keys2 = keys[keys.length - 1]) === null || _keys2 === void 0 ? void 0 : _keys2.key]);
			}
		}, [keys, stack]);
		return /* @__PURE__ */ import_react$145.createElement(CSSMotionList_default, _extends({
			key: placement,
			className: (0, import_classnames$44.default)(prefixCls, "".concat(prefixCls, "-").concat(placement), ctxCls === null || ctxCls === void 0 ? void 0 : ctxCls.list, className, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-stack"), !!stack), "".concat(prefixCls, "-stack-expanded"), expanded)),
			style,
			keys,
			motionAppear: true
		}, placementMotion, { onAllRemoved: function onAllRemoved() {
			onAllNoticeRemoved(placement);
		} }), function(_ref2, nodeRef) {
			var config = _ref2.config, motionClassName = _ref2.className, motionStyle = _ref2.style, motionIndex = _ref2.index;
			var _ref3 = config, key = _ref3.key, times = _ref3.times;
			var strKey = String(key);
			var _ref4 = config, configClassName = _ref4.className, configStyle = _ref4.style, configClassNames = _ref4.classNames, configStyles = _ref4.styles, restConfig = _objectWithoutProperties(_ref4, _excluded$34);
			var dataIndex = keys.findIndex(function(item) {
				return item.key === strKey;
			});
			var stackStyle = {};
			if (stack) {
				var index$1 = keys.length - 1 - (dataIndex > -1 ? dataIndex : motionIndex - 1);
				var transformX = placement === "top" || placement === "bottom" ? "-50%" : "0";
				if (index$1 > 0) {
					var _dictRef$current$strK, _dictRef$current$strK2, _dictRef$current$strK3;
					stackStyle.height = expanded ? (_dictRef$current$strK = dictRef.current[strKey]) === null || _dictRef$current$strK === void 0 ? void 0 : _dictRef$current$strK.offsetHeight : latestNotice === null || latestNotice === void 0 ? void 0 : latestNotice.offsetHeight;
					var verticalOffset = 0;
					for (var i = 0; i < index$1; i++) {
						var _dictRef$current$keys;
						verticalOffset += ((_dictRef$current$keys = dictRef.current[keys[keys.length - 1 - i].key]) === null || _dictRef$current$keys === void 0 ? void 0 : _dictRef$current$keys.offsetHeight) + gap;
					}
					var transformY = (expanded ? verticalOffset : index$1 * offset) * (placement.startsWith("top") ? 1 : -1);
					var scaleX = !expanded && latestNotice !== null && latestNotice !== void 0 && latestNotice.offsetWidth && (_dictRef$current$strK2 = dictRef.current[strKey]) !== null && _dictRef$current$strK2 !== void 0 && _dictRef$current$strK2.offsetWidth ? ((latestNotice === null || latestNotice === void 0 ? void 0 : latestNotice.offsetWidth) - offset * 2 * (index$1 < 3 ? index$1 : 3)) / ((_dictRef$current$strK3 = dictRef.current[strKey]) === null || _dictRef$current$strK3 === void 0 ? void 0 : _dictRef$current$strK3.offsetWidth) : 1;
					stackStyle.transform = "translate3d(".concat(transformX, ", ").concat(transformY, "px, 0) scaleX(").concat(scaleX, ")");
				} else stackStyle.transform = "translate3d(".concat(transformX, ", 0, 0)");
			}
			return /* @__PURE__ */ import_react$145.createElement("div", {
				ref: nodeRef,
				className: (0, import_classnames$44.default)("".concat(prefixCls, "-notice-wrapper"), motionClassName, configClassNames === null || configClassNames === void 0 ? void 0 : configClassNames.wrapper),
				style: _objectSpread2(_objectSpread2(_objectSpread2({}, motionStyle), stackStyle), configStyles === null || configStyles === void 0 ? void 0 : configStyles.wrapper),
				onMouseEnter: function onMouseEnter() {
					return setHoverKeys(function(prev) {
						return prev.includes(strKey) ? prev : [].concat(_toConsumableArray(prev), [strKey]);
					});
				},
				onMouseLeave: function onMouseLeave() {
					return setHoverKeys(function(prev) {
						return prev.filter(function(k) {
							return k !== strKey;
						});
					});
				}
			}, /* @__PURE__ */ import_react$145.createElement(Notice_default, _extends({}, restConfig, {
				ref: function ref(node) {
					if (dataIndex > -1) dictRef.current[strKey] = node;
					else delete dictRef.current[strKey];
				},
				prefixCls,
				classNames: configClassNames,
				styles: configStyles,
				className: (0, import_classnames$44.default)(configClassName, ctxCls === null || ctxCls === void 0 ? void 0 : ctxCls.notice),
				style: configStyle,
				times,
				key,
				eventKey: key,
				onNoticeClose,
				hovering: stack && hoverKeys.length > 0
			})));
		});
	};
	NoticeList_default = NoticeList;
}));
var import_react$144, import_react_dom$1, Notifications, Notifications_default;
var init_Notifications = __esmMin((() => {
	init_objectSpread2();
	init_toConsumableArray();
	init_slicedToArray();
	import_react$144 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom$1 = /* @__PURE__ */ __toESM(require_react_dom());
	init_NoticeList();
	Notifications = /* @__PURE__ */ import_react$144.forwardRef(function(props, ref) {
		var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-notification" : _props$prefixCls, container = props.container, motion = props.motion, maxCount = props.maxCount, className = props.className, style = props.style, onAllRemoved = props.onAllRemoved, stack = props.stack, renderNotifications = props.renderNotifications;
		var _React$useState = import_react$144.useState([]), _React$useState2 = _slicedToArray(_React$useState, 2), configList = _React$useState2[0], setConfigList = _React$useState2[1];
		var onNoticeClose = function onNoticeClose$1(key) {
			var _config$onClose;
			var config = configList.find(function(item) {
				return item.key === key;
			});
			config === null || config === void 0 || (_config$onClose = config.onClose) === null || _config$onClose === void 0 || _config$onClose.call(config);
			setConfigList(function(list) {
				return list.filter(function(item) {
					return item.key !== key;
				});
			});
		};
		import_react$144.useImperativeHandle(ref, function() {
			return {
				open: function open(config) {
					setConfigList(function(list) {
						var clone = _toConsumableArray(list);
						var index$1 = clone.findIndex(function(item) {
							return item.key === config.key;
						});
						var innerConfig = _objectSpread2({}, config);
						if (index$1 >= 0) {
							var _list$index;
							innerConfig.times = (((_list$index = list[index$1]) === null || _list$index === void 0 ? void 0 : _list$index.times) || 0) + 1;
							clone[index$1] = innerConfig;
						} else {
							innerConfig.times = 0;
							clone.push(innerConfig);
						}
						if (maxCount > 0 && clone.length > maxCount) clone = clone.slice(-maxCount);
						return clone;
					});
				},
				close: function close(key) {
					onNoticeClose(key);
				},
				destroy: function destroy() {
					setConfigList([]);
				}
			};
		});
		var _React$useState3 = import_react$144.useState({}), _React$useState4 = _slicedToArray(_React$useState3, 2), placements = _React$useState4[0], setPlacements = _React$useState4[1];
		import_react$144.useEffect(function() {
			var nextPlacements = {};
			configList.forEach(function(config) {
				var _config$placement = config.placement, placement = _config$placement === void 0 ? "topRight" : _config$placement;
				if (placement) {
					nextPlacements[placement] = nextPlacements[placement] || [];
					nextPlacements[placement].push(config);
				}
			});
			Object.keys(placements).forEach(function(placement) {
				nextPlacements[placement] = nextPlacements[placement] || [];
			});
			setPlacements(nextPlacements);
		}, [configList]);
		var onAllNoticeRemoved = function onAllNoticeRemoved$1(placement) {
			setPlacements(function(originPlacements) {
				var clone = _objectSpread2({}, originPlacements);
				var list = clone[placement] || [];
				if (!list.length) delete clone[placement];
				return clone;
			});
		};
		var emptyRef = import_react$144.useRef(false);
		import_react$144.useEffect(function() {
			if (Object.keys(placements).length > 0) emptyRef.current = true;
			else if (emptyRef.current) {
				onAllRemoved === null || onAllRemoved === void 0 || onAllRemoved();
				emptyRef.current = false;
			}
		}, [placements]);
		if (!container) return null;
		var placementList = Object.keys(placements);
		return /* @__PURE__ */ (0, import_react_dom$1.createPortal)(/* @__PURE__ */ import_react$144.createElement(import_react$144.Fragment, null, placementList.map(function(placement) {
			var placementConfigList = placements[placement];
			var list = /* @__PURE__ */ import_react$144.createElement(NoticeList_default, {
				key: placement,
				configList: placementConfigList,
				placement,
				prefixCls,
				className: className === null || className === void 0 ? void 0 : className(placement),
				style: style === null || style === void 0 ? void 0 : style(placement),
				motion,
				onNoticeClose,
				onAllNoticeRemoved,
				stack
			});
			return renderNotifications ? renderNotifications(list, {
				prefixCls,
				key: placement
			}) : list;
		})), container);
	});
	Notifications_default = Notifications;
}));
function mergeConfig() {
	var clone = {};
	for (var _len = arguments.length, objList = new Array(_len), _key = 0; _key < _len; _key++) objList[_key] = arguments[_key];
	objList.forEach(function(obj) {
		if (obj) Object.keys(obj).forEach(function(key) {
			var val = obj[key];
			if (val !== void 0) clone[key] = val;
		});
	});
	return clone;
}
function useNotification() {
	var rootConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	var _rootConfig$getContai = rootConfig.getContainer, getContainer = _rootConfig$getContai === void 0 ? defaultGetContainer : _rootConfig$getContai, motion = rootConfig.motion, prefixCls = rootConfig.prefixCls, maxCount = rootConfig.maxCount, className = rootConfig.className, style = rootConfig.style, onAllRemoved = rootConfig.onAllRemoved, stack = rootConfig.stack, renderNotifications = rootConfig.renderNotifications, shareConfig = _objectWithoutProperties(rootConfig, _excluded$33);
	var _React$useState = import_react$143.useState(), _React$useState2 = _slicedToArray(_React$useState, 2), container = _React$useState2[0], setContainer = _React$useState2[1];
	var notificationsRef = import_react$143.useRef();
	var contextHolder = /* @__PURE__ */ import_react$143.createElement(Notifications_default, {
		container,
		ref: notificationsRef,
		prefixCls,
		motion,
		maxCount,
		className,
		style,
		onAllRemoved,
		stack,
		renderNotifications
	});
	var _React$useState3 = import_react$143.useState([]), _React$useState4 = _slicedToArray(_React$useState3, 2), taskQueue = _React$useState4[0], setTaskQueue = _React$useState4[1];
	var open = useEvent(function(config) {
		var mergedConfig = mergeConfig(shareConfig, config);
		if (mergedConfig.key === null || mergedConfig.key === void 0) {
			mergedConfig.key = "rc-notification-".concat(uniqueKey);
			uniqueKey += 1;
		}
		setTaskQueue(function(queue) {
			return [].concat(_toConsumableArray(queue), [{
				type: "open",
				config: mergedConfig
			}]);
		});
	});
	var api = import_react$143.useMemo(function() {
		return {
			open,
			close: function close(key) {
				setTaskQueue(function(queue) {
					return [].concat(_toConsumableArray(queue), [{
						type: "close",
						key
					}]);
				});
			},
			destroy: function destroy() {
				setTaskQueue(function(queue) {
					return [].concat(_toConsumableArray(queue), [{ type: "destroy" }]);
				});
			}
		};
	}, []);
	import_react$143.useEffect(function() {
		setContainer(getContainer());
	});
	import_react$143.useEffect(function() {
		if (notificationsRef.current && taskQueue.length) {
			taskQueue.forEach(function(task) {
				switch (task.type) {
					case "open":
						notificationsRef.current.open(task.config);
						break;
					case "close":
						notificationsRef.current.close(task.key);
						break;
					case "destroy":
						notificationsRef.current.destroy();
						break;
				}
			});
			var oriTaskQueue;
			var tgtTaskQueue;
			setTaskQueue(function(oriQueue) {
				if (oriTaskQueue !== oriQueue || !tgtTaskQueue) {
					oriTaskQueue = oriQueue;
					tgtTaskQueue = oriQueue.filter(function(task) {
						return !taskQueue.includes(task);
					});
				}
				return tgtTaskQueue;
			});
		}
	}, [taskQueue]);
	return [api, contextHolder];
}
var import_react$143, _excluded$33, defaultGetContainer, uniqueKey;
var init_useNotification = __esmMin((() => {
	init_toConsumableArray();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_react$143 = /* @__PURE__ */ __toESM(require_react());
	init_Notifications();
	init_es$18();
	_excluded$33 = [
		"getContainer",
		"motion",
		"prefixCls",
		"maxCount",
		"className",
		"style",
		"onAllRemoved",
		"stack",
		"renderNotifications"
	];
	defaultGetContainer = function defaultGetContainer$1() {
		return document.body;
	};
	uniqueKey = 0;
}));
var es_exports$13 = {};
__export(es_exports$13, {
	Notice: () => Notice_default,
	NotificationProvider: () => NotificationProvider_default,
	useNotification: () => useNotification
});
var init_es$16 = __esmMin((() => {
	init_useNotification();
	init_Notice();
	init_NotificationProvider();
}));
function isStyleSupport(styleName, styleValue) {
	if (!Array.isArray(styleName) && styleValue !== void 0) return isStyleValueSupport(styleName, styleValue);
	return isStyleNameSupport(styleName);
}
var isStyleNameSupport, isStyleValueSupport;
var init_styleChecker = __esmMin((() => {
	init_canUseDom();
	isStyleNameSupport = function isStyleNameSupport$1(styleName) {
		if (canUseDom() && window.document.documentElement) {
			var styleNameList = Array.isArray(styleName) ? styleName : [styleName];
			var documentElement = window.document.documentElement;
			return styleNameList.some(function(name) {
				return name in documentElement.style;
			});
		}
		return false;
	};
	isStyleValueSupport = function isStyleValueSupport$1(styleName, value) {
		if (!isStyleNameSupport(styleName)) return false;
		var ele = document.createElement("div");
		var origin = ele.style[styleName];
		ele.style[styleName] = value;
		return ele.style[styleName] !== origin;
	};
}));
var import_react$142, import_classnames$43, TransBtn$1, TransBtn_default$1;
var init_TransBtn$1 = __esmMin((() => {
	import_react$142 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$43 = /* @__PURE__ */ __toESM(require_classnames());
	TransBtn$1 = function TransBtn$2(props) {
		var className = props.className, customizeIcon = props.customizeIcon, customizeIconProps = props.customizeIconProps, children = props.children, _onMouseDown = props.onMouseDown, onClick = props.onClick;
		var icon = typeof customizeIcon === "function" ? customizeIcon(customizeIconProps) : customizeIcon;
		return /* @__PURE__ */ import_react$142.createElement("span", {
			className,
			onMouseDown: function onMouseDown(event) {
				event.preventDefault();
				_onMouseDown === null || _onMouseDown === void 0 || _onMouseDown(event);
			},
			style: {
				userSelect: "none",
				WebkitUserSelect: "none"
			},
			unselectable: "on",
			onClick,
			"aria-hidden": true
		}, icon !== void 0 ? icon : /* @__PURE__ */ import_react$142.createElement("span", { className: (0, import_classnames$43.default)(className.split(/\s+/).map(function(cls) {
			return "".concat(cls, "-icon");
		})) }, children));
	};
	TransBtn_default$1 = TransBtn$1;
}));
var import_react$141, useAllowClear$1;
var init_useAllowClear$1 = __esmMin((() => {
	init_typeof();
	init_TransBtn$1();
	import_react$141 = /* @__PURE__ */ __toESM(require_react());
	useAllowClear$1 = function useAllowClear$2(prefixCls, onClearMouseDown, displayValues, allowClear, clearIcon) {
		var disabled = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
		var mergedSearchValue = arguments.length > 6 ? arguments[6] : void 0;
		var mode = arguments.length > 7 ? arguments[7] : void 0;
		var mergedClearIcon = import_react$141.useMemo(function() {
			if (_typeof(allowClear) === "object") return allowClear.clearIcon;
			if (clearIcon) return clearIcon;
		}, [allowClear, clearIcon]);
		var mergedAllowClear = import_react$141.useMemo(function() {
			if (!disabled && !!allowClear && (displayValues.length || mergedSearchValue) && !(mode === "combobox" && mergedSearchValue === "")) return true;
			return false;
		}, [
			allowClear,
			disabled,
			displayValues.length,
			mergedSearchValue,
			mode
		]);
		return {
			allowClear: mergedAllowClear,
			clearIcon: /* @__PURE__ */ import_react$141.createElement(TransBtn_default$1, {
				className: "".concat(prefixCls, "-clear"),
				onMouseDown: onClearMouseDown,
				customizeIcon: mergedClearIcon
			}, "×")
		};
	};
}));
function useBaseProps$1() {
	return import_react$140.useContext(BaseSelectContext$1);
}
var import_react$140, BaseSelectContext$1;
var init_useBaseProps$1 = __esmMin((() => {
	import_react$140 = /* @__PURE__ */ __toESM(require_react());
	BaseSelectContext$1 = /* @__PURE__ */ import_react$140.createContext(null);
}));
function useDelayReset$1() {
	var timeout = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
	var _React$useState = import_react$139.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), bool = _React$useState2[0], setBool = _React$useState2[1];
	var delayRef = import_react$139.useRef(null);
	var cancelLatest = function cancelLatest$1() {
		window.clearTimeout(delayRef.current);
	};
	import_react$139.useEffect(function() {
		return cancelLatest;
	}, []);
	var delaySetBool = function delaySetBool$1(value, callback) {
		cancelLatest();
		delayRef.current = window.setTimeout(function() {
			setBool(value);
			if (callback) callback();
		}, timeout);
	};
	return [
		bool,
		delaySetBool,
		cancelLatest
	];
}
var import_react$139;
var init_useDelayReset$1 = __esmMin((() => {
	init_slicedToArray();
	import_react$139 = /* @__PURE__ */ __toESM(require_react());
}));
function useLock$1() {
	var duration = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 250;
	var lockRef = import_react$138.useRef(null);
	var timeoutRef = import_react$138.useRef(null);
	import_react$138.useEffect(function() {
		return function() {
			window.clearTimeout(timeoutRef.current);
		};
	}, []);
	function doLock(locked) {
		if (locked || lockRef.current === null) lockRef.current = locked;
		window.clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(function() {
			lockRef.current = null;
		}, duration);
	}
	return [function() {
		return lockRef.current;
	}, doLock];
}
var import_react$138;
var init_useLock$1 = __esmMin((() => {
	import_react$138 = /* @__PURE__ */ __toESM(require_react());
}));
function useSelectTriggerControl$1(elements, open, triggerOpen, customizedTrigger) {
	var propsRef = import_react$137.useRef(null);
	propsRef.current = {
		open,
		triggerOpen,
		customizedTrigger
	};
	import_react$137.useEffect(function() {
		function onGlobalMouseDown(event) {
			var _propsRef$current;
			if ((_propsRef$current = propsRef.current) !== null && _propsRef$current !== void 0 && _propsRef$current.customizedTrigger) return;
			var target = event.target;
			if (target.shadowRoot && event.composed) target = event.composedPath()[0] || target;
			if (propsRef.current.open && elements().filter(function(element) {
				return element;
			}).every(function(element) {
				return !element.contains(target) && element !== target;
			})) propsRef.current.triggerOpen(false);
		}
		window.addEventListener("mousedown", onGlobalMouseDown);
		return function() {
			return window.removeEventListener("mousedown", onGlobalMouseDown);
		};
	}, []);
}
var import_react$137;
var init_useSelectTriggerControl$1 = __esmMin((() => {
	import_react$137 = /* @__PURE__ */ __toESM(require_react());
}));
function isValidateOpenKey$1(currentKeyCode) {
	return currentKeyCode && ![
		KeyCode_default.ESC,
		KeyCode_default.SHIFT,
		KeyCode_default.BACKSPACE,
		KeyCode_default.TAB,
		KeyCode_default.WIN_KEY,
		KeyCode_default.ALT,
		KeyCode_default.META,
		KeyCode_default.WIN_KEY_RIGHT,
		KeyCode_default.CTRL,
		KeyCode_default.SEMICOLON,
		KeyCode_default.EQUALS,
		KeyCode_default.CAPS_LOCK,
		KeyCode_default.CONTEXT_MENU,
		KeyCode_default.F1,
		KeyCode_default.F2,
		KeyCode_default.F3,
		KeyCode_default.F4,
		KeyCode_default.F5,
		KeyCode_default.F6,
		KeyCode_default.F7,
		KeyCode_default.F8,
		KeyCode_default.F9,
		KeyCode_default.F10,
		KeyCode_default.F11,
		KeyCode_default.F12
	].includes(currentKeyCode);
}
var init_keyUtil$2 = __esmMin((() => {
	init_KeyCode();
}));
function composeProps(originProps, patchProps, isAll) {
	var composedProps = _objectSpread2(_objectSpread2({}, originProps), isAll ? patchProps : {});
	Object.keys(patchProps).forEach(function(key) {
		var func = patchProps[key];
		if (typeof func === "function") composedProps[key] = function() {
			var _originProps$key;
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			func.apply(void 0, args);
			return (_originProps$key = originProps[key]) === null || _originProps$key === void 0 ? void 0 : _originProps$key.call.apply(_originProps$key, [originProps].concat(args));
		};
	});
	return composedProps;
}
var composeProps_default;
var init_composeProps = __esmMin((() => {
	init_objectSpread2();
	composeProps_default = composeProps;
}));
var import_react$136, import_classnames$42, _excluded$32, Input$2, RefInput$1, Input_default$2;
var init_Input$2 = __esmMin((() => {
	init_objectSpread2();
	init_objectWithoutProperties();
	import_react$136 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$42 = /* @__PURE__ */ __toESM(require_classnames());
	init_ref();
	init_warning();
	init_composeProps();
	_excluded$32 = [
		"prefixCls",
		"id",
		"inputElement",
		"autoFocus",
		"autoComplete",
		"editable",
		"activeDescendantId",
		"value",
		"open",
		"attrs"
	];
	Input$2 = function Input$3(props, ref) {
		var prefixCls = props.prefixCls, id = props.id, inputElement = props.inputElement, autoFocus = props.autoFocus, autoComplete = props.autoComplete, editable = props.editable, activeDescendantId = props.activeDescendantId, value = props.value, open = props.open, attrs = props.attrs, restProps = _objectWithoutProperties(props, _excluded$32);
		var inputNode = inputElement || /* @__PURE__ */ import_react$136.createElement("input", null);
		var _inputNode = inputNode, originRef = _inputNode.ref, originProps = _inputNode.props;
		warning(!("maxLength" in inputNode.props), "Passing 'maxLength' to input element directly may not work because input in BaseSelect is controlled.");
		inputNode = /* @__PURE__ */ import_react$136.cloneElement(inputNode, _objectSpread2(_objectSpread2(_objectSpread2({ type: "search" }, composeProps_default(restProps, originProps, true)), {}, {
			id,
			ref: composeRef(ref, originRef),
			autoComplete: autoComplete || "off",
			autoFocus,
			className: (0, import_classnames$42.default)("".concat(prefixCls, "-selection-search-input"), originProps === null || originProps === void 0 ? void 0 : originProps.className),
			role: "combobox",
			"aria-expanded": open || false,
			"aria-haspopup": "listbox",
			"aria-owns": "".concat(id, "_list"),
			"aria-autocomplete": "list",
			"aria-controls": "".concat(id, "_list"),
			"aria-activedescendant": open ? activeDescendantId : void 0
		}, attrs), {}, {
			value: editable ? value : "",
			readOnly: !editable,
			unselectable: !editable ? "on" : null,
			style: _objectSpread2(_objectSpread2({}, originProps.style), {}, { opacity: editable ? null : 0 })
		}));
		return inputNode;
	};
	RefInput$1 = /* @__PURE__ */ import_react$136.forwardRef(Input$2);
	Input_default$2 = RefInput$1;
}));
function toArray$4(value) {
	if (Array.isArray(value)) return value;
	return value !== void 0 ? [value] : [];
}
function hasValue$1(value) {
	return value !== void 0 && value !== null;
}
function isComboNoValue$1(value) {
	return !value && value !== 0;
}
function isTitleType$3(title) {
	return ["string", "number"].includes(_typeof(title));
}
function getTitle$1(item) {
	var title = void 0;
	if (item) {
		if (isTitleType$3(item.title)) title = item.title.toString();
		else if (isTitleType$3(item.label)) title = item.label.toString();
	}
	return title;
}
var isClient$1, isBrowserClient$4;
var init_commonUtil$1 = __esmMin((() => {
	init_typeof();
	isClient$1 = typeof window !== "undefined" && window.document && window.document.documentElement;
	isBrowserClient$4 = isClient$1;
}));
function useLayoutEffect$1(effect, deps) {
	if (isBrowserClient$4)
 /* istanbul ignore next */
	import_react$135.useLayoutEffect(effect, deps);
	else import_react$135.useEffect(effect, deps);
}
var import_react$135;
var init_useLayoutEffect$1 = __esmMin((() => {
	import_react$135 = /* @__PURE__ */ __toESM(require_react());
	init_commonUtil$1();
}));
function itemKey$2(value) {
	var _value$key;
	return (_value$key = value.key) !== null && _value$key !== void 0 ? _value$key : value.value;
}
var import_react$133, import_react$134, import_classnames$41, onPreventMouseDown$1, SelectSelector$1, MultipleSelector_default$1;
var init_MultipleSelector$1 = __esmMin((() => {
	init_defineProperty();
	init_slicedToArray();
	import_react$133 = /* @__PURE__ */ __toESM(require_react());
	import_react$134 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$41 = /* @__PURE__ */ __toESM(require_classnames());
	init_pickAttrs();
	init_es$19();
	init_TransBtn$1();
	init_Input$2();
	init_useLayoutEffect$1();
	init_commonUtil$1();
	onPreventMouseDown$1 = function onPreventMouseDown$2(event) {
		event.preventDefault();
		event.stopPropagation();
	};
	SelectSelector$1 = function SelectSelector$2(props) {
		var id = props.id, prefixCls = props.prefixCls, values = props.values, open = props.open, searchValue = props.searchValue, autoClearSearchValue = props.autoClearSearchValue, inputRef = props.inputRef, placeholder = props.placeholder, disabled = props.disabled, mode = props.mode, showSearch = props.showSearch, autoFocus = props.autoFocus, autoComplete = props.autoComplete, activeDescendantId = props.activeDescendantId, tabIndex = props.tabIndex, removeIcon = props.removeIcon, maxTagCount = props.maxTagCount, maxTagTextLength = props.maxTagTextLength, _props$maxTagPlacehol = props.maxTagPlaceholder, maxTagPlaceholder = _props$maxTagPlacehol === void 0 ? function(omittedValues) {
			return "+ ".concat(omittedValues.length, " ...");
		} : _props$maxTagPlacehol, tagRender = props.tagRender, onToggleOpen = props.onToggleOpen, onRemove = props.onRemove, onInputChange = props.onInputChange, onInputPaste = props.onInputPaste, onInputKeyDown = props.onInputKeyDown, onInputMouseDown = props.onInputMouseDown, onInputCompositionStart = props.onInputCompositionStart, onInputCompositionEnd = props.onInputCompositionEnd, onInputBlur = props.onInputBlur;
		var measureRef = import_react$133.useRef(null);
		var _useState = (0, import_react$134.useState)(0), _useState2 = _slicedToArray(_useState, 2), inputWidth = _useState2[0], setInputWidth = _useState2[1];
		var _useState3 = (0, import_react$134.useState)(false), _useState4 = _slicedToArray(_useState3, 2), focused = _useState4[0], setFocused = _useState4[1];
		var selectionPrefixCls = "".concat(prefixCls, "-selection");
		var inputValue = open || mode === "multiple" && autoClearSearchValue === false || mode === "tags" ? searchValue : "";
		var inputEditable = mode === "tags" || mode === "multiple" && autoClearSearchValue === false || showSearch && (open || focused);
		useLayoutEffect$1(function() {
			setInputWidth(measureRef.current.scrollWidth);
		}, [inputValue]);
		var defaultRenderSelector = function defaultRenderSelector$1(item, content, itemDisabled, closable, onClose) {
			return /* @__PURE__ */ import_react$133.createElement("span", {
				title: getTitle$1(item),
				className: (0, import_classnames$41.default)("".concat(selectionPrefixCls, "-item"), _defineProperty({}, "".concat(selectionPrefixCls, "-item-disabled"), itemDisabled))
			}, /* @__PURE__ */ import_react$133.createElement("span", { className: "".concat(selectionPrefixCls, "-item-content") }, content), closable && /* @__PURE__ */ import_react$133.createElement(TransBtn_default$1, {
				className: "".concat(selectionPrefixCls, "-item-remove"),
				onMouseDown: onPreventMouseDown$1,
				onClick: onClose,
				customizeIcon: removeIcon
			}, "×"));
		};
		var customizeRenderSelector = function customizeRenderSelector$1(value, content, itemDisabled, closable, onClose, isMaxTag) {
			var onMouseDown = function onMouseDown$1(e) {
				onPreventMouseDown$1(e);
				onToggleOpen(!open);
			};
			return /* @__PURE__ */ import_react$133.createElement("span", { onMouseDown }, tagRender({
				label: content,
				value,
				disabled: itemDisabled,
				closable,
				onClose,
				isMaxTag: !!isMaxTag
			}));
		};
		var renderItem = function renderItem$1(valueItem) {
			var itemDisabled = valueItem.disabled, label = valueItem.label, value = valueItem.value;
			var closable = !disabled && !itemDisabled;
			var displayLabel = label;
			if (typeof maxTagTextLength === "number") {
				if (typeof label === "string" || typeof label === "number") {
					var strLabel = String(displayLabel);
					if (strLabel.length > maxTagTextLength) displayLabel = "".concat(strLabel.slice(0, maxTagTextLength), "...");
				}
			}
			var onClose = function onClose$1(event) {
				if (event) event.stopPropagation();
				onRemove(valueItem);
			};
			return typeof tagRender === "function" ? customizeRenderSelector(value, displayLabel, itemDisabled, closable, onClose) : defaultRenderSelector(valueItem, displayLabel, itemDisabled, closable, onClose);
		};
		var renderRest = function renderRest$1(omittedValues) {
			if (!values.length) return null;
			var content = typeof maxTagPlaceholder === "function" ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
			return typeof tagRender === "function" ? customizeRenderSelector(void 0, content, false, false, void 0, true) : defaultRenderSelector({ title: content }, content, false);
		};
		var inputNode = /* @__PURE__ */ import_react$133.createElement("div", {
			className: "".concat(selectionPrefixCls, "-search"),
			style: { width: inputWidth },
			onFocus: function onFocus() {
				setFocused(true);
			},
			onBlur: function onBlur() {
				setFocused(false);
			}
		}, /* @__PURE__ */ import_react$133.createElement(Input_default$2, {
			ref: inputRef,
			open,
			prefixCls,
			id,
			inputElement: null,
			disabled,
			autoFocus,
			autoComplete,
			editable: inputEditable,
			activeDescendantId,
			value: inputValue,
			onKeyDown: onInputKeyDown,
			onMouseDown: onInputMouseDown,
			onChange: onInputChange,
			onPaste: onInputPaste,
			onCompositionStart: onInputCompositionStart,
			onCompositionEnd: onInputCompositionEnd,
			onBlur: onInputBlur,
			tabIndex,
			attrs: pickAttrs(props, true)
		}), /* @__PURE__ */ import_react$133.createElement("span", {
			ref: measureRef,
			className: "".concat(selectionPrefixCls, "-search-mirror"),
			"aria-hidden": true
		}, inputValue, "\xA0"));
		var selectionNode = /* @__PURE__ */ import_react$133.createElement(es_default$14, {
			prefixCls: "".concat(selectionPrefixCls, "-overflow"),
			data: values,
			renderItem,
			renderRest,
			suffix: inputNode,
			itemKey: itemKey$2,
			maxCount: maxTagCount
		});
		return /* @__PURE__ */ import_react$133.createElement("span", { className: "".concat(selectionPrefixCls, "-wrap") }, selectionNode, !values.length && !inputValue && /* @__PURE__ */ import_react$133.createElement("span", { className: "".concat(selectionPrefixCls, "-placeholder") }, placeholder));
	};
	MultipleSelector_default$1 = SelectSelector$1;
}));
var import_react$132, SingleSelector$1, SingleSelector_default$1;
var init_SingleSelector$1 = __esmMin((() => {
	init_slicedToArray();
	import_react$132 = /* @__PURE__ */ __toESM(require_react());
	init_pickAttrs();
	init_Input$2();
	init_commonUtil$1();
	SingleSelector$1 = function SingleSelector$2(props) {
		var inputElement = props.inputElement, prefixCls = props.prefixCls, id = props.id, inputRef = props.inputRef, disabled = props.disabled, autoFocus = props.autoFocus, autoComplete = props.autoComplete, activeDescendantId = props.activeDescendantId, mode = props.mode, open = props.open, values = props.values, placeholder = props.placeholder, tabIndex = props.tabIndex, showSearch = props.showSearch, searchValue = props.searchValue, activeValue = props.activeValue, maxLength = props.maxLength, onInputKeyDown = props.onInputKeyDown, onInputMouseDown = props.onInputMouseDown, onInputChange = props.onInputChange, onInputPaste = props.onInputPaste, onInputCompositionStart = props.onInputCompositionStart, onInputCompositionEnd = props.onInputCompositionEnd, onInputBlur = props.onInputBlur, title = props.title;
		var _React$useState = import_react$132.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), inputChanged = _React$useState2[0], setInputChanged = _React$useState2[1];
		var combobox = mode === "combobox";
		var inputEditable = combobox || showSearch;
		var item = values[0];
		var inputValue = searchValue || "";
		if (combobox && activeValue && !inputChanged) inputValue = activeValue;
		import_react$132.useEffect(function() {
			if (combobox) setInputChanged(false);
		}, [combobox, activeValue]);
		var hasTextInput = mode !== "combobox" && !open && !showSearch ? false : !!inputValue;
		var selectionTitle = title === void 0 ? getTitle$1(item) : title;
		var placeholderNode = import_react$132.useMemo(function() {
			if (item) return null;
			return /* @__PURE__ */ import_react$132.createElement("span", {
				className: "".concat(prefixCls, "-selection-placeholder"),
				style: hasTextInput ? { visibility: "hidden" } : void 0
			}, placeholder);
		}, [
			item,
			hasTextInput,
			placeholder,
			prefixCls
		]);
		return /* @__PURE__ */ import_react$132.createElement("span", { className: "".concat(prefixCls, "-selection-wrap") }, /* @__PURE__ */ import_react$132.createElement("span", { className: "".concat(prefixCls, "-selection-search") }, /* @__PURE__ */ import_react$132.createElement(Input_default$2, {
			ref: inputRef,
			prefixCls,
			id,
			open,
			inputElement,
			disabled,
			autoFocus,
			autoComplete,
			editable: inputEditable,
			activeDescendantId,
			value: inputValue,
			onKeyDown: onInputKeyDown,
			onMouseDown: onInputMouseDown,
			onChange: function onChange(e) {
				setInputChanged(true);
				onInputChange(e);
			},
			onPaste: onInputPaste,
			onCompositionStart: onInputCompositionStart,
			onCompositionEnd: onInputCompositionEnd,
			onBlur: onInputBlur,
			tabIndex,
			attrs: pickAttrs(props, true),
			maxLength: combobox ? maxLength : void 0
		})), !combobox && item ? /* @__PURE__ */ import_react$132.createElement("span", {
			className: "".concat(prefixCls, "-selection-item"),
			title: selectionTitle,
			style: hasTextInput ? { visibility: "hidden" } : void 0
		}, item.label) : null, placeholderNode);
	};
	SingleSelector_default$1 = SingleSelector$1;
}));
var import_react$130, import_react$131, Selector$1, ForwardSelector$1, Selector_default$1;
var init_Selector$1 = __esmMin((() => {
	init_extends();
	init_slicedToArray();
	init_KeyCode();
	import_react$130 = /* @__PURE__ */ __toESM(require_react());
	import_react$131 = /* @__PURE__ */ __toESM(require_react());
	init_useLock$1();
	init_keyUtil$2();
	init_MultipleSelector$1();
	init_SingleSelector$1();
	Selector$1 = function Selector$2(props, ref) {
		var inputRef = (0, import_react$131.useRef)(null);
		var compositionStatusRef = (0, import_react$131.useRef)(false);
		var prefixCls = props.prefixCls, open = props.open, mode = props.mode, showSearch = props.showSearch, tokenWithEnter = props.tokenWithEnter, disabled = props.disabled, prefix = props.prefix, autoClearSearchValue = props.autoClearSearchValue, onSearch = props.onSearch, onSearchSubmit = props.onSearchSubmit, onToggleOpen = props.onToggleOpen, onInputKeyDown = props.onInputKeyDown, onInputBlur = props.onInputBlur, domRef = props.domRef;
		import_react$130.useImperativeHandle(ref, function() {
			return {
				focus: function focus(options) {
					inputRef.current.focus(options);
				},
				blur: function blur() {
					inputRef.current.blur();
				}
			};
		});
		var _useLock = useLock$1(0), _useLock2 = _slicedToArray(_useLock, 2), getInputMouseDown = _useLock2[0], setInputMouseDown = _useLock2[1];
		var onInternalInputKeyDown = function onInternalInputKeyDown$1(event) {
			var which = event.which;
			var isTextAreaElement = inputRef.current instanceof HTMLTextAreaElement;
			if (!isTextAreaElement && open && (which === KeyCode_default.UP || which === KeyCode_default.DOWN)) event.preventDefault();
			if (onInputKeyDown) onInputKeyDown(event);
			if (which === KeyCode_default.ENTER && mode === "tags" && !compositionStatusRef.current && !open) onSearchSubmit === null || onSearchSubmit === void 0 || onSearchSubmit(event.target.value);
			if (isTextAreaElement && !open && ~[
				KeyCode_default.UP,
				KeyCode_default.DOWN,
				KeyCode_default.LEFT,
				KeyCode_default.RIGHT
			].indexOf(which)) return;
			if (isValidateOpenKey$1(which)) onToggleOpen(true);
		};
		var onInternalInputMouseDown = function onInternalInputMouseDown$1() {
			setInputMouseDown(true);
		};
		var pastedTextRef = (0, import_react$131.useRef)(null);
		var triggerOnSearch = function triggerOnSearch$1(value) {
			if (onSearch(value, true, compositionStatusRef.current) !== false) onToggleOpen(true);
		};
		var onInputCompositionStart = function onInputCompositionStart$1() {
			compositionStatusRef.current = true;
		};
		var onInputCompositionEnd = function onInputCompositionEnd$1(e) {
			compositionStatusRef.current = false;
			if (mode !== "combobox") triggerOnSearch(e.target.value);
		};
		var onInputChange = function onInputChange$1(event) {
			var value = event.target.value;
			if (tokenWithEnter && pastedTextRef.current && /[\r\n]/.test(pastedTextRef.current)) {
				var replacedText = pastedTextRef.current.replace(/[\r\n]+$/, "").replace(/\r\n/g, " ").replace(/[\r\n]/g, " ");
				value = value.replace(replacedText, pastedTextRef.current);
			}
			pastedTextRef.current = null;
			triggerOnSearch(value);
		};
		var onInputPaste = function onInputPaste$1(e) {
			var clipboardData = e.clipboardData;
			var value = clipboardData === null || clipboardData === void 0 ? void 0 : clipboardData.getData("text");
			pastedTextRef.current = value || "";
		};
		var onClick = function onClick$1(_ref) {
			var target = _ref.target;
			if (target !== inputRef.current) {
				var isIE = document.body.style.msTouchAction !== void 0;
				if (isIE) setTimeout(function() {
					inputRef.current.focus();
				});
				else inputRef.current.focus();
			}
		};
		var onMouseDown = function onMouseDown$1(event) {
			var inputMouseDown = getInputMouseDown();
			if (event.target !== inputRef.current && !inputMouseDown && !(mode === "combobox" && disabled)) event.preventDefault();
			if (mode !== "combobox" && (!showSearch || !inputMouseDown) || !open) {
				if (open && autoClearSearchValue !== false) onSearch("", true, false);
				onToggleOpen();
			}
		};
		var sharedProps = {
			inputRef,
			onInputKeyDown: onInternalInputKeyDown,
			onInputMouseDown: onInternalInputMouseDown,
			onInputChange,
			onInputPaste,
			onInputCompositionStart,
			onInputCompositionEnd,
			onInputBlur
		};
		var selectNode = mode === "multiple" || mode === "tags" ? /* @__PURE__ */ import_react$130.createElement(MultipleSelector_default$1, _extends({}, props, sharedProps)) : /* @__PURE__ */ import_react$130.createElement(SingleSelector_default$1, _extends({}, props, sharedProps));
		return /* @__PURE__ */ import_react$130.createElement("div", {
			ref: domRef,
			className: "".concat(prefixCls, "-selector"),
			onClick,
			onMouseDown
		}, prefix && /* @__PURE__ */ import_react$130.createElement("div", { className: "".concat(prefixCls, "-prefix") }, prefix), selectNode);
	};
	ForwardSelector$1 = /* @__PURE__ */ import_react$130.forwardRef(Selector$1);
	Selector_default$1 = ForwardSelector$1;
}));
function Arrow(props) {
	var prefixCls = props.prefixCls, align = props.align, arrow = props.arrow, arrowPos = props.arrowPos;
	var _ref = arrow || {}, className = _ref.className, content = _ref.content;
	var _arrowPos$x = arrowPos.x, x = _arrowPos$x === void 0 ? 0 : _arrowPos$x, _arrowPos$y = arrowPos.y, y = _arrowPos$y === void 0 ? 0 : _arrowPos$y;
	var arrowRef = import_react$129.useRef();
	if (!align || !align.points) return null;
	var alignStyle = { position: "absolute" };
	if (align.autoArrow !== false) {
		var popupPoints = align.points[0];
		var targetPoints = align.points[1];
		var popupTB = popupPoints[0];
		var popupLR = popupPoints[1];
		var targetTB = targetPoints[0];
		var targetLR = targetPoints[1];
		if (popupTB === targetTB || !["t", "b"].includes(popupTB)) alignStyle.top = y;
		else if (popupTB === "t") alignStyle.top = 0;
		else alignStyle.bottom = 0;
		if (popupLR === targetLR || !["l", "r"].includes(popupLR)) alignStyle.left = x;
		else if (popupLR === "l") alignStyle.left = 0;
		else alignStyle.right = 0;
	}
	return /* @__PURE__ */ import_react$129.createElement("div", {
		ref: arrowRef,
		className: (0, import_classnames$40.default)("".concat(prefixCls, "-arrow"), className),
		style: alignStyle
	}, content);
}
var import_classnames$40, import_react$129;
var init_Arrow = __esmMin((() => {
	import_classnames$40 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$129 = /* @__PURE__ */ __toESM(require_react());
}));
function Mask(props) {
	var prefixCls = props.prefixCls, open = props.open, zIndex = props.zIndex, mask = props.mask, motion = props.motion;
	if (!mask) return null;
	return /* @__PURE__ */ import_react$128.createElement(es_default$4, _extends({}, motion, {
		motionAppear: true,
		visible: open,
		removeOnLeave: true
	}), function(_ref) {
		var className = _ref.className;
		return /* @__PURE__ */ import_react$128.createElement("div", {
			style: { zIndex },
			className: (0, import_classnames$39.default)("".concat(prefixCls, "-mask"), className)
		});
	});
}
var import_classnames$39, import_react$128;
var init_Mask = __esmMin((() => {
	init_extends();
	import_classnames$39 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$17();
	import_react$128 = /* @__PURE__ */ __toESM(require_react());
}));
var import_react$127, PopupContent, PopupContent_default;
var init_PopupContent = __esmMin((() => {
	import_react$127 = /* @__PURE__ */ __toESM(require_react());
	PopupContent = /* @__PURE__ */ import_react$127.memo(function(_ref) {
		var children = _ref.children;
		return children;
	}, function(_, next) {
		return next.cache;
	});
	PopupContent_default = PopupContent;
}));
var import_classnames$38, import_react$126, Popup, Popup_default;
var init_Popup = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_slicedToArray();
	import_classnames$38 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$17();
	init_es$20();
	init_useLayoutEffect$2();
	init_ref();
	import_react$126 = /* @__PURE__ */ __toESM(require_react());
	init_Arrow();
	init_Mask();
	init_PopupContent();
	Popup = /* @__PURE__ */ import_react$126.forwardRef(function(props, ref) {
		var popup = props.popup, className = props.className, prefixCls = props.prefixCls, style = props.style, target = props.target, _onVisibleChanged = props.onVisibleChanged, open = props.open, keepDom = props.keepDom, fresh = props.fresh, onClick = props.onClick, mask = props.mask, arrow = props.arrow, arrowPos = props.arrowPos, align = props.align, motion = props.motion, maskMotion = props.maskMotion, forceRender = props.forceRender, getPopupContainer = props.getPopupContainer, autoDestroy = props.autoDestroy, Portal = props.portal, zIndex = props.zIndex, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave, onPointerEnter = props.onPointerEnter, onPointerDownCapture = props.onPointerDownCapture, ready = props.ready, offsetX = props.offsetX, offsetY = props.offsetY, offsetR = props.offsetR, offsetB = props.offsetB, onAlign = props.onAlign, onPrepare = props.onPrepare, stretch = props.stretch, targetWidth = props.targetWidth, targetHeight = props.targetHeight;
		var childNode = typeof popup === "function" ? popup() : popup;
		var isNodeVisible = open || keepDom;
		var getPopupContainerNeedParams = (getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.length) > 0;
		var _React$useState = import_react$126.useState(!getPopupContainer || !getPopupContainerNeedParams), _React$useState2 = _slicedToArray(_React$useState, 2), show = _React$useState2[0], setShow = _React$useState2[1];
		useLayoutEffect_default(function() {
			if (!show && getPopupContainerNeedParams && target) setShow(true);
		}, [
			show,
			getPopupContainerNeedParams,
			target
		]);
		if (!show) return null;
		var AUTO = "auto";
		var offsetStyle = {
			left: "-1000vw",
			top: "-1000vh",
			right: AUTO,
			bottom: AUTO
		};
		if (ready || !open) {
			var _experimental;
			var points = align.points;
			var dynamicInset = align.dynamicInset || ((_experimental = align._experimental) === null || _experimental === void 0 ? void 0 : _experimental.dynamicInset);
			var alignRight = dynamicInset && points[0][1] === "r";
			var alignBottom = dynamicInset && points[0][0] === "b";
			if (alignRight) {
				offsetStyle.right = offsetR;
				offsetStyle.left = AUTO;
			} else {
				offsetStyle.left = offsetX;
				offsetStyle.right = AUTO;
			}
			if (alignBottom) {
				offsetStyle.bottom = offsetB;
				offsetStyle.top = AUTO;
			} else {
				offsetStyle.top = offsetY;
				offsetStyle.bottom = AUTO;
			}
		}
		var miscStyle = {};
		if (stretch) {
			if (stretch.includes("height") && targetHeight) miscStyle.height = targetHeight;
			else if (stretch.includes("minHeight") && targetHeight) miscStyle.minHeight = targetHeight;
			if (stretch.includes("width") && targetWidth) miscStyle.width = targetWidth;
			else if (stretch.includes("minWidth") && targetWidth) miscStyle.minWidth = targetWidth;
		}
		if (!open) miscStyle.pointerEvents = "none";
		return /* @__PURE__ */ import_react$126.createElement(Portal, {
			open: forceRender || isNodeVisible,
			getContainer: getPopupContainer && function() {
				return getPopupContainer(target);
			},
			autoDestroy
		}, /* @__PURE__ */ import_react$126.createElement(Mask, {
			prefixCls,
			open,
			zIndex,
			mask,
			motion: maskMotion
		}), /* @__PURE__ */ import_react$126.createElement(es_default$8, {
			onResize: onAlign,
			disabled: !open
		}, function(resizeObserverRef) {
			return /* @__PURE__ */ import_react$126.createElement(es_default$4, _extends({
				motionAppear: true,
				motionEnter: true,
				motionLeave: true,
				removeOnLeave: false,
				forceRender,
				leavedClassName: "".concat(prefixCls, "-hidden")
			}, motion, {
				onAppearPrepare: onPrepare,
				onEnterPrepare: onPrepare,
				visible: open,
				onVisibleChanged: function onVisibleChanged(nextVisible) {
					var _motion$onVisibleChan;
					motion === null || motion === void 0 || (_motion$onVisibleChan = motion.onVisibleChanged) === null || _motion$onVisibleChan === void 0 || _motion$onVisibleChan.call(motion, nextVisible);
					_onVisibleChanged(nextVisible);
				}
			}), function(_ref, motionRef) {
				var motionClassName = _ref.className, motionStyle = _ref.style;
				var cls = (0, import_classnames$38.default)(prefixCls, motionClassName, className);
				return /* @__PURE__ */ import_react$126.createElement("div", {
					ref: composeRef(resizeObserverRef, ref, motionRef),
					className: cls,
					style: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
						"--arrow-x": "".concat(arrowPos.x || 0, "px"),
						"--arrow-y": "".concat(arrowPos.y || 0, "px")
					}, offsetStyle), miscStyle), motionStyle), {}, {
						boxSizing: "border-box",
						zIndex
					}, style),
					onMouseEnter,
					onMouseLeave,
					onPointerEnter,
					onClick,
					onPointerDownCapture
				}, arrow && /* @__PURE__ */ import_react$126.createElement(Arrow, {
					prefixCls,
					arrow,
					arrowPos,
					align
				}), /* @__PURE__ */ import_react$126.createElement(PopupContent_default, { cache: !open && !fresh }, childNode));
			});
		}));
	});
	Popup_default = Popup;
}));
var import_react$125, TriggerWrapper, TriggerWrapper_default;
var init_TriggerWrapper = __esmMin((() => {
	init_ref();
	import_react$125 = /* @__PURE__ */ __toESM(require_react());
	TriggerWrapper = /* @__PURE__ */ import_react$125.forwardRef(function(props, ref) {
		var children = props.children, getTriggerDOMNode = props.getTriggerDOMNode;
		var canUseRef = supportRef(children);
		var setRef = import_react$125.useCallback(function(node) {
			fillRef(ref, getTriggerDOMNode ? getTriggerDOMNode(node) : node);
		}, [getTriggerDOMNode]);
		var mergedRef = useComposeRef(setRef, getNodeRef(children));
		return canUseRef ? /* @__PURE__ */ import_react$125.cloneElement(children, { ref: mergedRef }) : children;
	});
	TriggerWrapper_default = TriggerWrapper;
}));
var import_react$124, TriggerContext, context_default$1;
var init_context$1 = __esmMin((() => {
	import_react$124 = /* @__PURE__ */ __toESM(require_react());
	TriggerContext = /* @__PURE__ */ import_react$124.createContext(null);
	context_default$1 = TriggerContext;
}));
function toArray$5(val) {
	return val ? Array.isArray(val) ? val : [val] : [];
}
function useAction(mobile, action, showAction, hideAction) {
	return import_react$123.useMemo(function() {
		var mergedShowAction = toArray$5(showAction !== null && showAction !== void 0 ? showAction : action);
		var mergedHideAction = toArray$5(hideAction !== null && hideAction !== void 0 ? hideAction : action);
		var showActionSet = new Set(mergedShowAction);
		var hideActionSet = new Set(mergedHideAction);
		if (mobile) {
			if (showActionSet.has("hover")) {
				showActionSet.delete("hover");
				showActionSet.add("click");
			}
			if (hideActionSet.has("hover")) {
				hideActionSet.delete("hover");
				hideActionSet.add("click");
			}
		}
		return [showActionSet, hideActionSet];
	}, [
		mobile,
		action,
		showAction,
		hideAction
	]);
}
var import_react$123;
var init_useAction = __esmMin((() => {
	import_react$123 = /* @__PURE__ */ __toESM(require_react());
}));
function isPointsEq() {
	var a1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	var a2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
	var isAlignPoint = arguments.length > 2 ? arguments[2] : void 0;
	if (isAlignPoint) return a1[0] === a2[0];
	return a1[0] === a2[0] && a1[1] === a2[1];
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
	var points = align.points;
	var placements = Object.keys(builtinPlacements);
	for (var i = 0; i < placements.length; i += 1) {
		var _builtinPlacements$pl;
		var placement = placements[i];
		if (isPointsEq((_builtinPlacements$pl = builtinPlacements[placement]) === null || _builtinPlacements$pl === void 0 ? void 0 : _builtinPlacements$pl.points, points, isAlignPoint)) return "".concat(prefixCls, "-placement-").concat(placement);
	}
	return "";
}
function getMotion(prefixCls, motion, animation, transitionName) {
	if (motion) return motion;
	if (animation) return { motionName: "".concat(prefixCls, "-").concat(animation) };
	if (transitionName) return { motionName: transitionName };
	return null;
}
function getWin(ele) {
	return ele.ownerDocument.defaultView;
}
function collectScroller(ele) {
	var scrollerList = [];
	var current = ele === null || ele === void 0 ? void 0 : ele.parentElement;
	var scrollStyle = [
		"hidden",
		"scroll",
		"clip",
		"auto"
	];
	while (current) {
		var _getWin$getComputedSt = getWin(current).getComputedStyle(current), overflowX = _getWin$getComputedSt.overflowX, overflowY = _getWin$getComputedSt.overflowY, overflow = _getWin$getComputedSt.overflow;
		if ([
			overflowX,
			overflowY,
			overflow
		].some(function(o) {
			return scrollStyle.includes(o);
		})) scrollerList.push(current);
		current = current.parentElement;
	}
	return scrollerList;
}
function toNum(num) {
	var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
	return Number.isNaN(num) ? defaultValue : num;
}
function getPxValue(val) {
	return toNum(parseFloat(val), 0);
}
function getVisibleArea(initArea, scrollerList) {
	var visibleArea = _objectSpread2({}, initArea);
	(scrollerList || []).forEach(function(ele) {
		if (ele instanceof HTMLBodyElement || ele instanceof HTMLHtmlElement) return;
		var _getWin$getComputedSt2 = getWin(ele).getComputedStyle(ele), overflow = _getWin$getComputedSt2.overflow, overflowClipMargin = _getWin$getComputedSt2.overflowClipMargin, borderTopWidth = _getWin$getComputedSt2.borderTopWidth, borderBottomWidth = _getWin$getComputedSt2.borderBottomWidth, borderLeftWidth = _getWin$getComputedSt2.borderLeftWidth, borderRightWidth = _getWin$getComputedSt2.borderRightWidth;
		var eleRect = ele.getBoundingClientRect();
		var eleOutHeight = ele.offsetHeight, eleInnerHeight = ele.clientHeight, eleOutWidth = ele.offsetWidth, eleInnerWidth = ele.clientWidth;
		var borderTopNum = getPxValue(borderTopWidth);
		var borderBottomNum = getPxValue(borderBottomWidth);
		var borderLeftNum = getPxValue(borderLeftWidth);
		var borderRightNum = getPxValue(borderRightWidth);
		var scaleX = toNum(Math.round(eleRect.width / eleOutWidth * 1e3) / 1e3);
		var scaleY = toNum(Math.round(eleRect.height / eleOutHeight * 1e3) / 1e3);
		var eleScrollWidth = (eleOutWidth - eleInnerWidth - borderLeftNum - borderRightNum) * scaleX;
		var eleScrollHeight = (eleOutHeight - eleInnerHeight - borderTopNum - borderBottomNum) * scaleY;
		var scaledBorderTopWidth = borderTopNum * scaleY;
		var scaledBorderBottomWidth = borderBottomNum * scaleY;
		var scaledBorderLeftWidth = borderLeftNum * scaleX;
		var scaledBorderRightWidth = borderRightNum * scaleX;
		var clipMarginWidth = 0;
		var clipMarginHeight = 0;
		if (overflow === "clip") {
			var clipNum = getPxValue(overflowClipMargin);
			clipMarginWidth = clipNum * scaleX;
			clipMarginHeight = clipNum * scaleY;
		}
		var eleLeft = eleRect.x + scaledBorderLeftWidth - clipMarginWidth;
		var eleTop = eleRect.y + scaledBorderTopWidth - clipMarginHeight;
		var eleRight = eleLeft + eleRect.width + 2 * clipMarginWidth - scaledBorderLeftWidth - scaledBorderRightWidth - eleScrollWidth;
		var eleBottom = eleTop + eleRect.height + 2 * clipMarginHeight - scaledBorderTopWidth - scaledBorderBottomWidth - eleScrollHeight;
		visibleArea.left = Math.max(visibleArea.left, eleLeft);
		visibleArea.top = Math.max(visibleArea.top, eleTop);
		visibleArea.right = Math.min(visibleArea.right, eleRight);
		visibleArea.bottom = Math.min(visibleArea.bottom, eleBottom);
	});
	return visibleArea;
}
var init_util$4 = __esmMin((() => {
	init_objectSpread2();
}));
function getUnitOffset(size) {
	var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	var offsetStr = "".concat(offset);
	var cells = offsetStr.match(/^(.*)\%$/);
	if (cells) return size * (parseFloat(cells[1]) / 100);
	return parseFloat(offsetStr);
}
function getNumberOffset(rect, offset) {
	var _ref = offset || [], _ref2 = _slicedToArray(_ref, 2), offsetX = _ref2[0], offsetY = _ref2[1];
	return [getUnitOffset(rect.width, offsetX), getUnitOffset(rect.height, offsetY)];
}
function splitPoints() {
	var points = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
	return [points[0], points[1]];
}
function getAlignPoint(rect, points) {
	var topBottom = points[0];
	var leftRight = points[1];
	var x;
	var y;
	if (topBottom === "t") y = rect.y;
	else if (topBottom === "b") y = rect.y + rect.height;
	else y = rect.y + rect.height / 2;
	if (leftRight === "l") x = rect.x;
	else if (leftRight === "r") x = rect.x + rect.width;
	else x = rect.x + rect.width / 2;
	return {
		x,
		y
	};
}
function reversePoints(points, index$1) {
	var reverseMap = {
		t: "b",
		b: "t",
		l: "r",
		r: "l"
	};
	return points.map(function(point, i) {
		if (i === index$1) return reverseMap[point] || "c";
		return point;
	}).join("");
}
function useAlign(open, popupEle, target, placement, builtinPlacements, popupAlign, onPopupAlign) {
	var _React$useState = import_react$122.useState({
		ready: false,
		offsetX: 0,
		offsetY: 0,
		offsetR: 0,
		offsetB: 0,
		arrowX: 0,
		arrowY: 0,
		scaleX: 1,
		scaleY: 1,
		align: builtinPlacements[placement] || {}
	}), _React$useState2 = _slicedToArray(_React$useState, 2), offsetInfo = _React$useState2[0], setOffsetInfo = _React$useState2[1];
	var alignCountRef = import_react$122.useRef(0);
	var scrollerList = import_react$122.useMemo(function() {
		if (!popupEle) return [];
		return collectScroller(popupEle);
	}, [popupEle]);
	var prevFlipRef = import_react$122.useRef({});
	var resetFlipCache = function resetFlipCache$1() {
		prevFlipRef.current = {};
	};
	if (!open) resetFlipCache();
	var onAlign = useEvent(function() {
		if (popupEle && target && open) {
			var _popupElement$parentE, _popupRect$x, _popupRect$y, _popupElement$parentE2;
			var popupElement = popupEle;
			var doc = popupElement.ownerDocument;
			var win = getWin(popupElement);
			var _win$getComputedStyle = win.getComputedStyle(popupElement), width = _win$getComputedStyle.width, height = _win$getComputedStyle.height, popupPosition = _win$getComputedStyle.position;
			var originLeft = popupElement.style.left;
			var originTop = popupElement.style.top;
			var originRight = popupElement.style.right;
			var originBottom = popupElement.style.bottom;
			var originOverflow = popupElement.style.overflow;
			var placementInfo = _objectSpread2(_objectSpread2({}, builtinPlacements[placement]), popupAlign);
			var placeholderElement = doc.createElement("div");
			(_popupElement$parentE = popupElement.parentElement) === null || _popupElement$parentE === void 0 || _popupElement$parentE.appendChild(placeholderElement);
			placeholderElement.style.left = "".concat(popupElement.offsetLeft, "px");
			placeholderElement.style.top = "".concat(popupElement.offsetTop, "px");
			placeholderElement.style.position = popupPosition;
			placeholderElement.style.height = "".concat(popupElement.offsetHeight, "px");
			placeholderElement.style.width = "".concat(popupElement.offsetWidth, "px");
			popupElement.style.left = "0";
			popupElement.style.top = "0";
			popupElement.style.right = "auto";
			popupElement.style.bottom = "auto";
			popupElement.style.overflow = "hidden";
			var targetRect;
			if (Array.isArray(target)) targetRect = {
				x: target[0],
				y: target[1],
				width: 0,
				height: 0
			};
			else {
				var _rect$x, _rect$y;
				var rect = target.getBoundingClientRect();
				rect.x = (_rect$x = rect.x) !== null && _rect$x !== void 0 ? _rect$x : rect.left;
				rect.y = (_rect$y = rect.y) !== null && _rect$y !== void 0 ? _rect$y : rect.top;
				targetRect = {
					x: rect.x,
					y: rect.y,
					width: rect.width,
					height: rect.height
				};
			}
			var popupRect = popupElement.getBoundingClientRect();
			popupRect.x = (_popupRect$x = popupRect.x) !== null && _popupRect$x !== void 0 ? _popupRect$x : popupRect.left;
			popupRect.y = (_popupRect$y = popupRect.y) !== null && _popupRect$y !== void 0 ? _popupRect$y : popupRect.top;
			var _doc$documentElement = doc.documentElement, clientWidth = _doc$documentElement.clientWidth, clientHeight = _doc$documentElement.clientHeight, scrollWidth = _doc$documentElement.scrollWidth, scrollHeight = _doc$documentElement.scrollHeight, scrollTop = _doc$documentElement.scrollTop, scrollLeft = _doc$documentElement.scrollLeft;
			var popupHeight = popupRect.height;
			var popupWidth = popupRect.width;
			var targetHeight = targetRect.height;
			var targetWidth = targetRect.width;
			var visibleRegion = {
				left: 0,
				top: 0,
				right: clientWidth,
				bottom: clientHeight
			};
			var scrollRegion = {
				left: -scrollLeft,
				top: -scrollTop,
				right: scrollWidth - scrollLeft,
				bottom: scrollHeight - scrollTop
			};
			var htmlRegion = placementInfo.htmlRegion;
			var VISIBLE = "visible";
			var VISIBLE_FIRST = "visibleFirst";
			if (htmlRegion !== "scroll" && htmlRegion !== VISIBLE_FIRST) htmlRegion = VISIBLE;
			var isVisibleFirst = htmlRegion === VISIBLE_FIRST;
			var scrollRegionArea = getVisibleArea(scrollRegion, scrollerList);
			var visibleRegionArea = getVisibleArea(visibleRegion, scrollerList);
			var visibleArea = htmlRegion === VISIBLE ? visibleRegionArea : scrollRegionArea;
			var adjustCheckVisibleArea = isVisibleFirst ? visibleRegionArea : visibleArea;
			popupElement.style.left = "auto";
			popupElement.style.top = "auto";
			popupElement.style.right = "0";
			popupElement.style.bottom = "0";
			var popupMirrorRect = popupElement.getBoundingClientRect();
			popupElement.style.left = originLeft;
			popupElement.style.top = originTop;
			popupElement.style.right = originRight;
			popupElement.style.bottom = originBottom;
			popupElement.style.overflow = originOverflow;
			(_popupElement$parentE2 = popupElement.parentElement) === null || _popupElement$parentE2 === void 0 || _popupElement$parentE2.removeChild(placeholderElement);
			var _scaleX = toNum(Math.round(popupWidth / parseFloat(width) * 1e3) / 1e3);
			var _scaleY = toNum(Math.round(popupHeight / parseFloat(height) * 1e3) / 1e3);
			if (_scaleX === 0 || _scaleY === 0 || isDOM(target) && !isVisible_default(target)) return;
			var offset = placementInfo.offset, targetOffset = placementInfo.targetOffset;
			var _getNumberOffset = getNumberOffset(popupRect, offset), _getNumberOffset2 = _slicedToArray(_getNumberOffset, 2), popupOffsetX = _getNumberOffset2[0], popupOffsetY = _getNumberOffset2[1];
			var _getNumberOffset3 = getNumberOffset(targetRect, targetOffset), _getNumberOffset4 = _slicedToArray(_getNumberOffset3, 2), targetOffsetX = _getNumberOffset4[0], targetOffsetY = _getNumberOffset4[1];
			targetRect.x -= targetOffsetX;
			targetRect.y -= targetOffsetY;
			var _ref3 = placementInfo.points || [], _ref4 = _slicedToArray(_ref3, 2), popupPoint = _ref4[0], targetPoint = _ref4[1];
			var targetPoints = splitPoints(targetPoint);
			var popupPoints = splitPoints(popupPoint);
			var targetAlignPoint = getAlignPoint(targetRect, targetPoints);
			var popupAlignPoint = getAlignPoint(popupRect, popupPoints);
			var nextAlignInfo = _objectSpread2({}, placementInfo);
			var nextOffsetX = targetAlignPoint.x - popupAlignPoint.x + popupOffsetX;
			var nextOffsetY = targetAlignPoint.y - popupAlignPoint.y + popupOffsetY;
			function getIntersectionVisibleArea(offsetX, offsetY) {
				var area = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : visibleArea;
				var l = popupRect.x + offsetX;
				var t = popupRect.y + offsetY;
				var r = l + popupWidth;
				var b = t + popupHeight;
				var visibleL = Math.max(l, area.left);
				var visibleT = Math.max(t, area.top);
				var visibleR = Math.min(r, area.right);
				var visibleB = Math.min(b, area.bottom);
				return Math.max(0, (visibleR - visibleL) * (visibleB - visibleT));
			}
			var originIntersectionVisibleArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY);
			var originIntersectionRecommendArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY, visibleRegionArea);
			var targetAlignPointTL = getAlignPoint(targetRect, ["t", "l"]);
			var popupAlignPointTL = getAlignPoint(popupRect, ["t", "l"]);
			var targetAlignPointBR = getAlignPoint(targetRect, ["b", "r"]);
			var popupAlignPointBR = getAlignPoint(popupRect, ["b", "r"]);
			var overflow = placementInfo.overflow || {};
			var adjustX = overflow.adjustX, adjustY = overflow.adjustY, shiftX = overflow.shiftX, shiftY = overflow.shiftY;
			var supportAdjust = function supportAdjust$1(val) {
				if (typeof val === "boolean") return val;
				return val >= 0;
			};
			var nextPopupY;
			var nextPopupBottom;
			var nextPopupX;
			var nextPopupRight;
			function syncNextPopupPosition() {
				nextPopupY = popupRect.y + nextOffsetY;
				nextPopupBottom = nextPopupY + popupHeight;
				nextPopupX = popupRect.x + nextOffsetX;
				nextPopupRight = nextPopupX + popupWidth;
			}
			syncNextPopupPosition();
			var needAdjustY = supportAdjust(adjustY);
			var sameTB = popupPoints[0] === targetPoints[0];
			if (needAdjustY && popupPoints[0] === "t" && (nextPopupBottom > adjustCheckVisibleArea.bottom || prevFlipRef.current.bt)) {
				var tmpNextOffsetY = nextOffsetY;
				if (sameTB) tmpNextOffsetY -= popupHeight - targetHeight;
				else tmpNextOffsetY = targetAlignPointTL.y - popupAlignPointBR.y - popupOffsetY;
				var newVisibleArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY);
				var newVisibleRecommendArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY, visibleRegionArea);
				if (newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || newVisibleRecommendArea >= originIntersectionRecommendArea)) {
					prevFlipRef.current.bt = true;
					nextOffsetY = tmpNextOffsetY;
					popupOffsetY = -popupOffsetY;
					nextAlignInfo.points = [reversePoints(popupPoints, 0), reversePoints(targetPoints, 0)];
				} else prevFlipRef.current.bt = false;
			}
			if (needAdjustY && popupPoints[0] === "b" && (nextPopupY < adjustCheckVisibleArea.top || prevFlipRef.current.tb)) {
				var _tmpNextOffsetY = nextOffsetY;
				if (sameTB) _tmpNextOffsetY += popupHeight - targetHeight;
				else _tmpNextOffsetY = targetAlignPointBR.y - popupAlignPointTL.y - popupOffsetY;
				var _newVisibleArea = getIntersectionVisibleArea(nextOffsetX, _tmpNextOffsetY);
				var _newVisibleRecommendArea = getIntersectionVisibleArea(nextOffsetX, _tmpNextOffsetY, visibleRegionArea);
				if (_newVisibleArea > originIntersectionVisibleArea || _newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || _newVisibleRecommendArea >= originIntersectionRecommendArea)) {
					prevFlipRef.current.tb = true;
					nextOffsetY = _tmpNextOffsetY;
					popupOffsetY = -popupOffsetY;
					nextAlignInfo.points = [reversePoints(popupPoints, 0), reversePoints(targetPoints, 0)];
				} else prevFlipRef.current.tb = false;
			}
			var needAdjustX = supportAdjust(adjustX);
			var sameLR = popupPoints[1] === targetPoints[1];
			if (needAdjustX && popupPoints[1] === "l" && (nextPopupRight > adjustCheckVisibleArea.right || prevFlipRef.current.rl)) {
				var tmpNextOffsetX = nextOffsetX;
				if (sameLR) tmpNextOffsetX -= popupWidth - targetWidth;
				else tmpNextOffsetX = targetAlignPointTL.x - popupAlignPointBR.x - popupOffsetX;
				var _newVisibleArea2 = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY);
				var _newVisibleRecommendArea2 = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY, visibleRegionArea);
				if (_newVisibleArea2 > originIntersectionVisibleArea || _newVisibleArea2 === originIntersectionVisibleArea && (!isVisibleFirst || _newVisibleRecommendArea2 >= originIntersectionRecommendArea)) {
					prevFlipRef.current.rl = true;
					nextOffsetX = tmpNextOffsetX;
					popupOffsetX = -popupOffsetX;
					nextAlignInfo.points = [reversePoints(popupPoints, 1), reversePoints(targetPoints, 1)];
				} else prevFlipRef.current.rl = false;
			}
			if (needAdjustX && popupPoints[1] === "r" && (nextPopupX < adjustCheckVisibleArea.left || prevFlipRef.current.lr)) {
				var _tmpNextOffsetX = nextOffsetX;
				if (sameLR) _tmpNextOffsetX += popupWidth - targetWidth;
				else _tmpNextOffsetX = targetAlignPointBR.x - popupAlignPointTL.x - popupOffsetX;
				var _newVisibleArea3 = getIntersectionVisibleArea(_tmpNextOffsetX, nextOffsetY);
				var _newVisibleRecommendArea3 = getIntersectionVisibleArea(_tmpNextOffsetX, nextOffsetY, visibleRegionArea);
				if (_newVisibleArea3 > originIntersectionVisibleArea || _newVisibleArea3 === originIntersectionVisibleArea && (!isVisibleFirst || _newVisibleRecommendArea3 >= originIntersectionRecommendArea)) {
					prevFlipRef.current.lr = true;
					nextOffsetX = _tmpNextOffsetX;
					popupOffsetX = -popupOffsetX;
					nextAlignInfo.points = [reversePoints(popupPoints, 1), reversePoints(targetPoints, 1)];
				} else prevFlipRef.current.lr = false;
			}
			syncNextPopupPosition();
			var numShiftX = shiftX === true ? 0 : shiftX;
			if (typeof numShiftX === "number") {
				if (nextPopupX < visibleRegionArea.left) {
					nextOffsetX -= nextPopupX - visibleRegionArea.left - popupOffsetX;
					if (targetRect.x + targetWidth < visibleRegionArea.left + numShiftX) nextOffsetX += targetRect.x - visibleRegionArea.left + targetWidth - numShiftX;
				}
				if (nextPopupRight > visibleRegionArea.right) {
					nextOffsetX -= nextPopupRight - visibleRegionArea.right - popupOffsetX;
					if (targetRect.x > visibleRegionArea.right - numShiftX) nextOffsetX += targetRect.x - visibleRegionArea.right + numShiftX;
				}
			}
			var numShiftY = shiftY === true ? 0 : shiftY;
			if (typeof numShiftY === "number") {
				if (nextPopupY < visibleRegionArea.top) {
					nextOffsetY -= nextPopupY - visibleRegionArea.top - popupOffsetY;
					if (targetRect.y + targetHeight < visibleRegionArea.top + numShiftY) nextOffsetY += targetRect.y - visibleRegionArea.top + targetHeight - numShiftY;
				}
				if (nextPopupBottom > visibleRegionArea.bottom) {
					nextOffsetY -= nextPopupBottom - visibleRegionArea.bottom - popupOffsetY;
					if (targetRect.y > visibleRegionArea.bottom - numShiftY) nextOffsetY += targetRect.y - visibleRegionArea.bottom + numShiftY;
				}
			}
			var popupLeft = popupRect.x + nextOffsetX;
			var popupRight = popupLeft + popupWidth;
			var popupTop = popupRect.y + nextOffsetY;
			var popupBottom = popupTop + popupHeight;
			var targetLeft = targetRect.x;
			var targetRight = targetLeft + targetWidth;
			var targetTop = targetRect.y;
			var targetBottom = targetTop + targetHeight;
			var maxLeft = Math.max(popupLeft, targetLeft);
			var minRight = Math.min(popupRight, targetRight);
			var xCenter = (maxLeft + minRight) / 2;
			var nextArrowX = xCenter - popupLeft;
			var maxTop = Math.max(popupTop, targetTop);
			var minBottom = Math.min(popupBottom, targetBottom);
			var yCenter = (maxTop + minBottom) / 2;
			var nextArrowY = yCenter - popupTop;
			onPopupAlign === null || onPopupAlign === void 0 || onPopupAlign(popupEle, nextAlignInfo);
			var offsetX4Right = popupMirrorRect.right - popupRect.x - (nextOffsetX + popupRect.width);
			var offsetY4Bottom = popupMirrorRect.bottom - popupRect.y - (nextOffsetY + popupRect.height);
			if (_scaleX === 1) {
				nextOffsetX = Math.round(nextOffsetX);
				offsetX4Right = Math.round(offsetX4Right);
			}
			if (_scaleY === 1) {
				nextOffsetY = Math.round(nextOffsetY);
				offsetY4Bottom = Math.round(offsetY4Bottom);
			}
			var nextOffsetInfo = {
				ready: true,
				offsetX: nextOffsetX / _scaleX,
				offsetY: nextOffsetY / _scaleY,
				offsetR: offsetX4Right / _scaleX,
				offsetB: offsetY4Bottom / _scaleY,
				arrowX: nextArrowX / _scaleX,
				arrowY: nextArrowY / _scaleY,
				scaleX: _scaleX,
				scaleY: _scaleY,
				align: nextAlignInfo
			};
			setOffsetInfo(nextOffsetInfo);
		}
	});
	var triggerAlign = function triggerAlign$1() {
		alignCountRef.current += 1;
		var id = alignCountRef.current;
		Promise.resolve().then(function() {
			if (alignCountRef.current === id) onAlign();
		});
	};
	var resetReady = function resetReady$1() {
		setOffsetInfo(function(ori) {
			return _objectSpread2(_objectSpread2({}, ori), {}, { ready: false });
		});
	};
	useLayoutEffect_default(resetReady, [placement]);
	useLayoutEffect_default(function() {
		if (!open) resetReady();
	}, [open]);
	return [
		offsetInfo.ready,
		offsetInfo.offsetX,
		offsetInfo.offsetY,
		offsetInfo.offsetR,
		offsetInfo.offsetB,
		offsetInfo.arrowX,
		offsetInfo.arrowY,
		offsetInfo.scaleX,
		offsetInfo.scaleY,
		offsetInfo.align,
		triggerAlign
	];
}
var import_react$122;
var init_useAlign = __esmMin((() => {
	init_objectSpread2();
	init_slicedToArray();
	init_findDOMNode();
	init_isVisible();
	init_useEvent();
	init_useLayoutEffect$2();
	import_react$122 = /* @__PURE__ */ __toESM(require_react());
	init_util$4();
}));
function useWatch(open, target, popup, onAlign, onScroll) {
	useLayoutEffect_default(function() {
		if (open && target && popup) {
			var targetElement = target;
			var popupElement = popup;
			var targetScrollList = collectScroller(targetElement);
			var popupScrollList = collectScroller(popupElement);
			var win = getWin(popupElement);
			var mergedList = new Set([win].concat(_toConsumableArray(targetScrollList), _toConsumableArray(popupScrollList)));
			function notifyScroll() {
				onAlign();
				onScroll();
			}
			mergedList.forEach(function(scroller) {
				scroller.addEventListener("scroll", notifyScroll, { passive: true });
			});
			win.addEventListener("resize", notifyScroll, { passive: true });
			onAlign();
			return function() {
				mergedList.forEach(function(scroller) {
					scroller.removeEventListener("scroll", notifyScroll);
					win.removeEventListener("resize", notifyScroll);
				});
			};
		}
	}, [
		open,
		target,
		popup
	]);
}
var init_useWatch = __esmMin((() => {
	init_toConsumableArray();
	init_useLayoutEffect$2();
	init_util$4();
}));
function useWinClick(open, clickToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen) {
	var openRef = import_react$121.useRef(open);
	openRef.current = open;
	var popupPointerDownRef = import_react$121.useRef(false);
	import_react$121.useEffect(function() {
		if (clickToHide && popupEle && (!mask || maskClosable)) {
			var onPointerDown = function onPointerDown$1() {
				popupPointerDownRef.current = false;
			};
			var onTriggerClose = function onTriggerClose$1(e) {
				var _e$composedPath;
				if (openRef.current && !inPopupOrChild(((_e$composedPath = e.composedPath) === null || _e$composedPath === void 0 || (_e$composedPath = _e$composedPath.call(e)) === null || _e$composedPath === void 0 ? void 0 : _e$composedPath[0]) || e.target) && !popupPointerDownRef.current) triggerOpen(false);
			};
			var win = getWin(popupEle);
			win.addEventListener("pointerdown", onPointerDown, true);
			win.addEventListener("mousedown", onTriggerClose, true);
			win.addEventListener("contextmenu", onTriggerClose, true);
			var targetShadowRoot = getShadowRoot(targetEle);
			if (targetShadowRoot) {
				targetShadowRoot.addEventListener("mousedown", onTriggerClose, true);
				targetShadowRoot.addEventListener("contextmenu", onTriggerClose, true);
			}
			if (0) var _targetEle$getRootNod, _popupEle$getRootNode, targetRoot, popupRoot;
			return function() {
				win.removeEventListener("pointerdown", onPointerDown, true);
				win.removeEventListener("mousedown", onTriggerClose, true);
				win.removeEventListener("contextmenu", onTriggerClose, true);
				if (targetShadowRoot) {
					targetShadowRoot.removeEventListener("mousedown", onTriggerClose, true);
					targetShadowRoot.removeEventListener("contextmenu", onTriggerClose, true);
				}
			};
		}
	}, [
		clickToHide,
		targetEle,
		popupEle,
		mask,
		maskClosable
	]);
	function onPopupPointerDown() {
		popupPointerDownRef.current = true;
	}
	return onPopupPointerDown;
}
var import_react$121;
var init_useWinClick = __esmMin((() => {
	init_shadow();
	init_warning();
	import_react$121 = /* @__PURE__ */ __toESM(require_react());
	init_util$4();
}));
function generateTrigger() {
	var PortalComponent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : es_default$10;
	var Trigger = /* @__PURE__ */ import_react$120.forwardRef(function(props, ref) {
		var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-trigger-popup" : _props$prefixCls, children = props.children, _props$action = props.action, action = _props$action === void 0 ? "hover" : _props$action, showAction = props.showAction, hideAction = props.hideAction, popupVisible = props.popupVisible, defaultPopupVisible = props.defaultPopupVisible, onPopupVisibleChange = props.onPopupVisibleChange, afterPopupVisibleChange = props.afterPopupVisibleChange, mouseEnterDelay = props.mouseEnterDelay, _props$mouseLeaveDela = props.mouseLeaveDelay, mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? .1 : _props$mouseLeaveDela, focusDelay = props.focusDelay, blurDelay = props.blurDelay, mask = props.mask, _props$maskClosable = props.maskClosable, maskClosable = _props$maskClosable === void 0 ? true : _props$maskClosable, getPopupContainer = props.getPopupContainer, forceRender = props.forceRender, autoDestroy = props.autoDestroy, destroyPopupOnHide = props.destroyPopupOnHide, popup = props.popup, popupClassName = props.popupClassName, popupStyle = props.popupStyle, popupPlacement = props.popupPlacement, _props$builtinPlaceme = props.builtinPlacements, builtinPlacements = _props$builtinPlaceme === void 0 ? {} : _props$builtinPlaceme, popupAlign = props.popupAlign, zIndex = props.zIndex, stretch = props.stretch, getPopupClassNameFromAlign = props.getPopupClassNameFromAlign, fresh = props.fresh, alignPoint = props.alignPoint, onPopupClick = props.onPopupClick, onPopupAlign = props.onPopupAlign, arrow = props.arrow, popupMotion = props.popupMotion, maskMotion = props.maskMotion, popupTransitionName = props.popupTransitionName, popupAnimation = props.popupAnimation, maskTransitionName = props.maskTransitionName, maskAnimation = props.maskAnimation, className = props.className, getTriggerDOMNode = props.getTriggerDOMNode, restProps = _objectWithoutProperties(props, _excluded$31);
		var mergedAutoDestroy = autoDestroy || destroyPopupOnHide || false;
		var _React$useState = import_react$120.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), mobile = _React$useState2[0], setMobile = _React$useState2[1];
		useLayoutEffect_default(function() {
			setMobile(isMobile_default());
		}, []);
		var subPopupElements = import_react$120.useRef({});
		var parentContext = import_react$120.useContext(context_default$1);
		var context = import_react$120.useMemo(function() {
			return { registerSubPopup: function registerSubPopup(id$1, subPopupEle) {
				subPopupElements.current[id$1] = subPopupEle;
				parentContext === null || parentContext === void 0 || parentContext.registerSubPopup(id$1, subPopupEle);
			} };
		}, [parentContext]);
		var id = useId_default$1();
		var _React$useState3 = import_react$120.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), popupEle = _React$useState4[0], setPopupEle = _React$useState4[1];
		var externalPopupRef = import_react$120.useRef(null);
		var setPopupRef = useEvent(function(node) {
			externalPopupRef.current = node;
			if (isDOM(node) && popupEle !== node) setPopupEle(node);
			parentContext === null || parentContext === void 0 || parentContext.registerSubPopup(id, node);
		});
		var _React$useState5 = import_react$120.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), targetEle = _React$useState6[0], setTargetEle = _React$useState6[1];
		var externalForwardRef = import_react$120.useRef(null);
		var setTargetRef = useEvent(function(node) {
			if (isDOM(node) && targetEle !== node) {
				setTargetEle(node);
				externalForwardRef.current = node;
			}
		});
		var child = import_react$120.Children.only(children);
		var originChildProps = (child === null || child === void 0 ? void 0 : child.props) || {};
		var cloneProps = {};
		var inPopupOrChild = useEvent(function(ele) {
			var _getShadowRoot, _getShadowRoot2;
			var childDOM = targetEle;
			return (childDOM === null || childDOM === void 0 ? void 0 : childDOM.contains(ele)) || ((_getShadowRoot = getShadowRoot(childDOM)) === null || _getShadowRoot === void 0 ? void 0 : _getShadowRoot.host) === ele || ele === childDOM || (popupEle === null || popupEle === void 0 ? void 0 : popupEle.contains(ele)) || ((_getShadowRoot2 = getShadowRoot(popupEle)) === null || _getShadowRoot2 === void 0 ? void 0 : _getShadowRoot2.host) === ele || ele === popupEle || Object.values(subPopupElements.current).some(function(subPopupEle) {
				return (subPopupEle === null || subPopupEle === void 0 ? void 0 : subPopupEle.contains(ele)) || ele === subPopupEle;
			});
		});
		var mergePopupMotion = getMotion(prefixCls, popupMotion, popupAnimation, popupTransitionName);
		var mergeMaskMotion = getMotion(prefixCls, maskMotion, maskAnimation, maskTransitionName);
		var _React$useState7 = import_react$120.useState(defaultPopupVisible || false), _React$useState8 = _slicedToArray(_React$useState7, 2), internalOpen = _React$useState8[0], setInternalOpen = _React$useState8[1];
		var mergedOpen = popupVisible !== null && popupVisible !== void 0 ? popupVisible : internalOpen;
		var setMergedOpen = useEvent(function(nextOpen) {
			if (popupVisible === void 0) setInternalOpen(nextOpen);
		});
		useLayoutEffect_default(function() {
			setInternalOpen(popupVisible || false);
		}, [popupVisible]);
		var openRef = import_react$120.useRef(mergedOpen);
		openRef.current = mergedOpen;
		var lastTriggerRef = import_react$120.useRef([]);
		lastTriggerRef.current = [];
		var internalTriggerOpen = useEvent(function(nextOpen) {
			var _lastTriggerRef$curre;
			setMergedOpen(nextOpen);
			if (((_lastTriggerRef$curre = lastTriggerRef.current[lastTriggerRef.current.length - 1]) !== null && _lastTriggerRef$curre !== void 0 ? _lastTriggerRef$curre : mergedOpen) !== nextOpen) {
				lastTriggerRef.current.push(nextOpen);
				onPopupVisibleChange === null || onPopupVisibleChange === void 0 || onPopupVisibleChange(nextOpen);
			}
		});
		var delayRef = import_react$120.useRef();
		var clearDelay = function clearDelay$1() {
			clearTimeout(delayRef.current);
		};
		var triggerOpen = function triggerOpen$1(nextOpen) {
			var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
			clearDelay();
			if (delay === 0) internalTriggerOpen(nextOpen);
			else delayRef.current = setTimeout(function() {
				internalTriggerOpen(nextOpen);
			}, delay * 1e3);
		};
		import_react$120.useEffect(function() {
			return clearDelay;
		}, []);
		var _React$useState9 = import_react$120.useState(false), _React$useState10 = _slicedToArray(_React$useState9, 2), inMotion = _React$useState10[0], setInMotion = _React$useState10[1];
		useLayoutEffect_default(function(firstMount) {
			if (!firstMount || mergedOpen) setInMotion(true);
		}, [mergedOpen]);
		var _React$useState11 = import_react$120.useState(null), _React$useState12 = _slicedToArray(_React$useState11, 2), motionPrepareResolve = _React$useState12[0], setMotionPrepareResolve = _React$useState12[1];
		var _React$useState13 = import_react$120.useState(null), _React$useState14 = _slicedToArray(_React$useState13, 2), mousePos = _React$useState14[0], setMousePos = _React$useState14[1];
		var setMousePosByEvent = function setMousePosByEvent$1(event) {
			setMousePos([event.clientX, event.clientY]);
		};
		var _useAlign = useAlign(mergedOpen, popupEle, alignPoint && mousePos !== null ? mousePos : targetEle, popupPlacement, builtinPlacements, popupAlign, onPopupAlign), _useAlign2 = _slicedToArray(_useAlign, 11), ready = _useAlign2[0], offsetX = _useAlign2[1], offsetY = _useAlign2[2], offsetR = _useAlign2[3], offsetB = _useAlign2[4], arrowX = _useAlign2[5], arrowY = _useAlign2[6], scaleX = _useAlign2[7], scaleY = _useAlign2[8], alignInfo = _useAlign2[9], onAlign = _useAlign2[10];
		var _useAction = useAction(mobile, action, showAction, hideAction), _useAction2 = _slicedToArray(_useAction, 2), showActions = _useAction2[0], hideActions = _useAction2[1];
		var clickToShow = showActions.has("click");
		var clickToHide = hideActions.has("click") || hideActions.has("contextMenu");
		var triggerAlign = useEvent(function() {
			if (!inMotion) onAlign();
		});
		var onScroll = function onScroll$1() {
			if (openRef.current && alignPoint && clickToHide) triggerOpen(false);
		};
		useWatch(mergedOpen, targetEle, popupEle, triggerAlign, onScroll);
		useLayoutEffect_default(function() {
			triggerAlign();
		}, [mousePos, popupPlacement]);
		useLayoutEffect_default(function() {
			if (mergedOpen && !(builtinPlacements !== null && builtinPlacements !== void 0 && builtinPlacements[popupPlacement])) triggerAlign();
		}, [JSON.stringify(popupAlign)]);
		var alignedClassName = import_react$120.useMemo(function() {
			var baseClassName = getAlignPopupClassName(builtinPlacements, prefixCls, alignInfo, alignPoint);
			return (0, import_classnames$37.default)(baseClassName, getPopupClassNameFromAlign === null || getPopupClassNameFromAlign === void 0 ? void 0 : getPopupClassNameFromAlign(alignInfo));
		}, [
			alignInfo,
			getPopupClassNameFromAlign,
			builtinPlacements,
			prefixCls,
			alignPoint
		]);
		import_react$120.useImperativeHandle(ref, function() {
			return {
				nativeElement: externalForwardRef.current,
				popupElement: externalPopupRef.current,
				forceAlign: triggerAlign
			};
		});
		var _React$useState15 = import_react$120.useState(0), _React$useState16 = _slicedToArray(_React$useState15, 2), targetWidth = _React$useState16[0], setTargetWidth = _React$useState16[1];
		var _React$useState17 = import_react$120.useState(0), _React$useState18 = _slicedToArray(_React$useState17, 2), targetHeight = _React$useState18[0], setTargetHeight = _React$useState18[1];
		var syncTargetSize = function syncTargetSize$1() {
			if (stretch && targetEle) {
				var rect = targetEle.getBoundingClientRect();
				setTargetWidth(rect.width);
				setTargetHeight(rect.height);
			}
		};
		var onTargetResize = function onTargetResize$1() {
			syncTargetSize();
			triggerAlign();
		};
		var onVisibleChanged = function onVisibleChanged$1(visible) {
			setInMotion(false);
			onAlign();
			afterPopupVisibleChange === null || afterPopupVisibleChange === void 0 || afterPopupVisibleChange(visible);
		};
		var onPrepare = function onPrepare$1() {
			return new Promise(function(resolve) {
				syncTargetSize();
				setMotionPrepareResolve(function() {
					return resolve;
				});
			});
		};
		useLayoutEffect_default(function() {
			if (motionPrepareResolve) {
				onAlign();
				motionPrepareResolve();
				setMotionPrepareResolve(null);
			}
		}, [motionPrepareResolve]);
		function wrapperAction(eventName, nextOpen, delay, preEvent) {
			cloneProps[eventName] = function(event) {
				var _originChildProps$eve;
				preEvent === null || preEvent === void 0 || preEvent(event);
				triggerOpen(nextOpen, delay);
				for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
				(_originChildProps$eve = originChildProps[eventName]) === null || _originChildProps$eve === void 0 || _originChildProps$eve.call.apply(_originChildProps$eve, [originChildProps, event].concat(args));
			};
		}
		if (clickToShow || clickToHide) cloneProps.onClick = function(event) {
			var _originChildProps$onC;
			if (openRef.current && clickToHide) triggerOpen(false);
			else if (!openRef.current && clickToShow) {
				setMousePosByEvent(event);
				triggerOpen(true);
			}
			for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
			(_originChildProps$onC = originChildProps.onClick) === null || _originChildProps$onC === void 0 || _originChildProps$onC.call.apply(_originChildProps$onC, [originChildProps, event].concat(args));
		};
		var onPopupPointerDown = useWinClick(mergedOpen, clickToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen);
		var hoverToShow = showActions.has("hover");
		var hoverToHide = hideActions.has("hover");
		var onPopupMouseEnter;
		var onPopupMouseLeave;
		if (hoverToShow) {
			wrapperAction("onMouseEnter", true, mouseEnterDelay, function(event) {
				setMousePosByEvent(event);
			});
			wrapperAction("onPointerEnter", true, mouseEnterDelay, function(event) {
				setMousePosByEvent(event);
			});
			onPopupMouseEnter = function onPopupMouseEnter$1(event) {
				if ((mergedOpen || inMotion) && popupEle !== null && popupEle !== void 0 && popupEle.contains(event.target)) triggerOpen(true, mouseEnterDelay);
			};
			if (alignPoint) cloneProps.onMouseMove = function(event) {
				var _originChildProps$onM;
				(_originChildProps$onM = originChildProps.onMouseMove) === null || _originChildProps$onM === void 0 || _originChildProps$onM.call(originChildProps, event);
			};
		}
		if (hoverToHide) {
			wrapperAction("onMouseLeave", false, mouseLeaveDelay);
			wrapperAction("onPointerLeave", false, mouseLeaveDelay);
			onPopupMouseLeave = function onPopupMouseLeave$1() {
				triggerOpen(false, mouseLeaveDelay);
			};
		}
		if (showActions.has("focus")) wrapperAction("onFocus", true, focusDelay);
		if (hideActions.has("focus")) wrapperAction("onBlur", false, blurDelay);
		if (showActions.has("contextMenu")) cloneProps.onContextMenu = function(event) {
			var _originChildProps$onC2;
			if (openRef.current && hideActions.has("contextMenu")) triggerOpen(false);
			else {
				setMousePosByEvent(event);
				triggerOpen(true);
			}
			event.preventDefault();
			for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
			(_originChildProps$onC2 = originChildProps.onContextMenu) === null || _originChildProps$onC2 === void 0 || _originChildProps$onC2.call.apply(_originChildProps$onC2, [originChildProps, event].concat(args));
		};
		if (className) cloneProps.className = (0, import_classnames$37.default)(originChildProps.className, className);
		var mergedChildrenProps = _objectSpread2(_objectSpread2({}, originChildProps), cloneProps);
		var passedProps = {};
		var passedEventList = [
			"onContextMenu",
			"onClick",
			"onMouseDown",
			"onTouchStart",
			"onMouseEnter",
			"onMouseLeave",
			"onFocus",
			"onBlur"
		];
		passedEventList.forEach(function(eventName) {
			if (restProps[eventName]) passedProps[eventName] = function() {
				var _mergedChildrenProps$;
				for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
				(_mergedChildrenProps$ = mergedChildrenProps[eventName]) === null || _mergedChildrenProps$ === void 0 || _mergedChildrenProps$.call.apply(_mergedChildrenProps$, [mergedChildrenProps].concat(args));
				restProps[eventName].apply(restProps, args);
			};
		});
		var triggerNode = /* @__PURE__ */ import_react$120.cloneElement(child, _objectSpread2(_objectSpread2({}, mergedChildrenProps), passedProps));
		var arrowPos = {
			x: arrowX,
			y: arrowY
		};
		var innerArrow = arrow ? _objectSpread2({}, arrow !== true ? arrow : {}) : null;
		return /* @__PURE__ */ import_react$120.createElement(import_react$120.Fragment, null, /* @__PURE__ */ import_react$120.createElement(es_default$8, {
			disabled: !mergedOpen,
			ref: setTargetRef,
			onResize: onTargetResize
		}, /* @__PURE__ */ import_react$120.createElement(TriggerWrapper_default, { getTriggerDOMNode }, triggerNode)), /* @__PURE__ */ import_react$120.createElement(context_default$1.Provider, { value: context }, /* @__PURE__ */ import_react$120.createElement(Popup_default, {
			portal: PortalComponent,
			ref: setPopupRef,
			prefixCls,
			popup,
			className: (0, import_classnames$37.default)(popupClassName, alignedClassName),
			style: popupStyle,
			target: targetEle,
			onMouseEnter: onPopupMouseEnter,
			onMouseLeave: onPopupMouseLeave,
			onPointerEnter: onPopupMouseEnter,
			zIndex,
			open: mergedOpen,
			keepDom: inMotion,
			fresh,
			onClick: onPopupClick,
			onPointerDownCapture: onPopupPointerDown,
			mask,
			motion: mergePopupMotion,
			maskMotion: mergeMaskMotion,
			onVisibleChanged,
			onPrepare,
			forceRender,
			autoDestroy: mergedAutoDestroy,
			getPopupContainer,
			align: alignInfo,
			arrow: innerArrow,
			arrowPos,
			ready,
			offsetX,
			offsetY,
			offsetR,
			offsetB,
			onAlign: triggerAlign,
			stretch,
			targetWidth: targetWidth / scaleX,
			targetHeight: targetHeight / scaleY
		})));
	});
	return Trigger;
}
var import_classnames$37, import_react$120, _excluded$31, es_default$20;
var init_es$15 = __esmMin((() => {
	init_objectSpread2();
	init_slicedToArray();
	init_objectWithoutProperties();
	init_es$21();
	import_classnames$37 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$20();
	init_findDOMNode();
	init_shadow();
	init_useEvent();
	init_useId$3();
	init_useLayoutEffect$2();
	init_isMobile();
	import_react$120 = /* @__PURE__ */ __toESM(require_react());
	init_Popup();
	init_TriggerWrapper();
	init_context$1();
	init_useAction();
	init_useAlign();
	init_useWatch();
	init_useWinClick();
	init_util$4();
	_excluded$31 = [
		"prefixCls",
		"children",
		"action",
		"showAction",
		"hideAction",
		"popupVisible",
		"defaultPopupVisible",
		"onPopupVisibleChange",
		"afterPopupVisibleChange",
		"mouseEnterDelay",
		"mouseLeaveDelay",
		"focusDelay",
		"blurDelay",
		"mask",
		"maskClosable",
		"getPopupContainer",
		"forceRender",
		"autoDestroy",
		"destroyPopupOnHide",
		"popup",
		"popupClassName",
		"popupStyle",
		"popupPlacement",
		"builtinPlacements",
		"popupAlign",
		"zIndex",
		"stretch",
		"getPopupClassNameFromAlign",
		"fresh",
		"alignPoint",
		"onPopupClick",
		"onPopupAlign",
		"arrow",
		"popupMotion",
		"maskMotion",
		"popupTransitionName",
		"popupAnimation",
		"maskTransitionName",
		"maskAnimation",
		"className",
		"getTriggerDOMNode"
	];
	es_default$20 = generateTrigger(es_default$10);
}));
var import_classnames$36, import_react$119, _excluded$30, getBuiltInPlacements$1, SelectTrigger$1, RefSelectTrigger$1, SelectTrigger_default$1;
var init_SelectTrigger$1 = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_objectWithoutProperties();
	init_es$15();
	import_classnames$36 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$119 = /* @__PURE__ */ __toESM(require_react());
	_excluded$30 = [
		"prefixCls",
		"disabled",
		"visible",
		"children",
		"popupElement",
		"animation",
		"transitionName",
		"dropdownStyle",
		"dropdownClassName",
		"direction",
		"placement",
		"builtinPlacements",
		"dropdownMatchSelectWidth",
		"dropdownRender",
		"dropdownAlign",
		"getPopupContainer",
		"empty",
		"getTriggerDOMNode",
		"onPopupVisibleChange",
		"onPopupMouseEnter"
	];
	getBuiltInPlacements$1 = function getBuiltInPlacements$2(dropdownMatchSelectWidth) {
		var adjustX = dropdownMatchSelectWidth === true ? 0 : 1;
		return {
			bottomLeft: {
				points: ["tl", "bl"],
				offset: [0, 4],
				overflow: {
					adjustX,
					adjustY: 1
				},
				htmlRegion: "scroll"
			},
			bottomRight: {
				points: ["tr", "br"],
				offset: [0, 4],
				overflow: {
					adjustX,
					adjustY: 1
				},
				htmlRegion: "scroll"
			},
			topLeft: {
				points: ["bl", "tl"],
				offset: [0, -4],
				overflow: {
					adjustX,
					adjustY: 1
				},
				htmlRegion: "scroll"
			},
			topRight: {
				points: ["br", "tr"],
				offset: [0, -4],
				overflow: {
					adjustX,
					adjustY: 1
				},
				htmlRegion: "scroll"
			}
		};
	};
	SelectTrigger$1 = function SelectTrigger$2(props, ref) {
		var prefixCls = props.prefixCls;
		props.disabled;
		var visible = props.visible, children = props.children, popupElement = props.popupElement, animation = props.animation, transitionName = props.transitionName, dropdownStyle = props.dropdownStyle, dropdownClassName = props.dropdownClassName, _props$direction = props.direction, direction = _props$direction === void 0 ? "ltr" : _props$direction, placement = props.placement, builtinPlacements = props.builtinPlacements, dropdownMatchSelectWidth = props.dropdownMatchSelectWidth, dropdownRender = props.dropdownRender, dropdownAlign = props.dropdownAlign, getPopupContainer = props.getPopupContainer, empty$1 = props.empty, getTriggerDOMNode = props.getTriggerDOMNode, onPopupVisibleChange = props.onPopupVisibleChange, onPopupMouseEnter = props.onPopupMouseEnter, restProps = _objectWithoutProperties(props, _excluded$30);
		var dropdownPrefixCls = "".concat(prefixCls, "-dropdown");
		var popupNode = popupElement;
		if (dropdownRender) popupNode = dropdownRender(popupElement);
		var mergedBuiltinPlacements = import_react$119.useMemo(function() {
			return builtinPlacements || getBuiltInPlacements$1(dropdownMatchSelectWidth);
		}, [builtinPlacements, dropdownMatchSelectWidth]);
		var mergedTransitionName = animation ? "".concat(dropdownPrefixCls, "-").concat(animation) : transitionName;
		var isNumberPopupWidth = typeof dropdownMatchSelectWidth === "number";
		var stretch = import_react$119.useMemo(function() {
			if (isNumberPopupWidth) return null;
			return dropdownMatchSelectWidth === false ? "minWidth" : "width";
		}, [dropdownMatchSelectWidth, isNumberPopupWidth]);
		var popupStyle = dropdownStyle;
		if (isNumberPopupWidth) popupStyle = _objectSpread2(_objectSpread2({}, popupStyle), {}, { width: dropdownMatchSelectWidth });
		var triggerPopupRef = import_react$119.useRef(null);
		import_react$119.useImperativeHandle(ref, function() {
			return { getPopupElement: function getPopupElement() {
				var _triggerPopupRef$curr;
				return (_triggerPopupRef$curr = triggerPopupRef.current) === null || _triggerPopupRef$curr === void 0 ? void 0 : _triggerPopupRef$curr.popupElement;
			} };
		});
		return /* @__PURE__ */ import_react$119.createElement(es_default$20, _extends({}, restProps, {
			showAction: onPopupVisibleChange ? ["click"] : [],
			hideAction: onPopupVisibleChange ? ["click"] : [],
			popupPlacement: placement || (direction === "rtl" ? "bottomRight" : "bottomLeft"),
			builtinPlacements: mergedBuiltinPlacements,
			prefixCls: dropdownPrefixCls,
			popupTransitionName: mergedTransitionName,
			popup: /* @__PURE__ */ import_react$119.createElement("div", { onMouseEnter: onPopupMouseEnter }, popupNode),
			ref: triggerPopupRef,
			stretch,
			popupAlign: dropdownAlign,
			popupVisible: visible,
			getPopupContainer,
			popupClassName: (0, import_classnames$36.default)(dropdownClassName, _defineProperty({}, "".concat(dropdownPrefixCls, "-empty"), empty$1)),
			popupStyle,
			getTriggerDOMNode,
			onPopupVisibleChange
		}), children);
	};
	RefSelectTrigger$1 = /* @__PURE__ */ import_react$119.forwardRef(SelectTrigger$1);
	SelectTrigger_default$1 = RefSelectTrigger$1;
}));
function getKey$2(data, index$1) {
	var key = data.key;
	var value;
	if ("value" in data) value = data.value;
	if (key !== null && key !== void 0) return key;
	if (value !== void 0) return value;
	return "rc-index-key-".concat(index$1);
}
function isValidCount$1(value) {
	return typeof value !== "undefined" && !Number.isNaN(value);
}
function fillFieldNames$3(fieldNames, childrenAsData) {
	var _ref = fieldNames || {}, label = _ref.label, value = _ref.value, options = _ref.options, groupLabel = _ref.groupLabel;
	var mergedLabel = label || (childrenAsData ? "children" : "label");
	return {
		label: mergedLabel,
		value: value || "value",
		options: options || "options",
		groupLabel: groupLabel || mergedLabel
	};
}
function flattenOptions$1(options) {
	var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, fieldNames = _ref2.fieldNames, childrenAsData = _ref2.childrenAsData;
	var flattenList = [];
	var _fillFieldNames = fillFieldNames$3(fieldNames, false), fieldLabel = _fillFieldNames.label, fieldValue = _fillFieldNames.value, fieldOptions = _fillFieldNames.options, groupLabel = _fillFieldNames.groupLabel;
	function dig(list, isGroupOption) {
		if (!Array.isArray(list)) return;
		list.forEach(function(data) {
			if (isGroupOption || !(fieldOptions in data)) {
				var value = data[fieldValue];
				flattenList.push({
					key: getKey$2(data, flattenList.length),
					groupOption: isGroupOption,
					data,
					label: data[fieldLabel],
					value
				});
			} else {
				var grpLabel = data[groupLabel];
				if (grpLabel === void 0 && childrenAsData) grpLabel = data.label;
				flattenList.push({
					key: getKey$2(data, flattenList.length),
					group: true,
					data,
					label: grpLabel
				});
				dig(data[fieldOptions], true);
			}
		});
	}
	dig(options, false);
	return flattenList;
}
function injectPropsWithOption$1(option) {
	var newOption = _objectSpread2({}, option);
	if (!("props" in newOption)) Object.defineProperty(newOption, "props", { get: function get() {
		warning_default(false, "Return type is option instead of Option instance. Please read value directly instead of reading from `props`.");
		return newOption;
	} });
	return newOption;
}
var getSeparatedContent$1;
var init_valueUtil$2 = __esmMin((() => {
	init_toConsumableArray();
	init_toArray();
	init_objectSpread2();
	init_warning();
	getSeparatedContent$1 = function getSeparatedContent$2(text, tokens, end) {
		if (!tokens || !tokens.length) return null;
		var match = false;
		var separate = function separate$1(str, _ref3) {
			var _ref4 = _toArray(_ref3), token = _ref4[0], restTokens = _ref4.slice(1);
			if (!token) return [str];
			var list$1 = str.split(token);
			match = match || list$1.length > 1;
			return list$1.reduce(function(prevList, unitStr) {
				return [].concat(_toConsumableArray(prevList), _toConsumableArray(separate$1(unitStr, restTokens)));
			}, []).filter(Boolean);
		};
		var list = separate(text, tokens);
		if (match) return typeof end !== "undefined" ? list.slice(0, end) : list;
		else return null;
	};
}));
var import_react$118, SelectContext$1, SelectContext_default$1;
var init_SelectContext$1 = __esmMin((() => {
	import_react$118 = /* @__PURE__ */ __toESM(require_react());
	SelectContext$1 = /* @__PURE__ */ import_react$118.createContext(null);
	SelectContext_default$1 = SelectContext$1;
}));
function Polite$1(props) {
	var visible = props.visible, values = props.values;
	if (!visible) return null;
	var MAX_COUNT = 50;
	return /* @__PURE__ */ import_react$117.createElement("span", {
		"aria-live": "polite",
		style: {
			width: 0,
			height: 0,
			position: "absolute",
			overflow: "hidden",
			opacity: 0
		}
	}, "".concat(values.slice(0, MAX_COUNT).map(function(_ref) {
		var label = _ref.label, value = _ref.value;
		return ["number", "string"].includes(_typeof(label)) ? label : value;
	}).join(", ")), values.length > MAX_COUNT ? ", ..." : null);
}
var import_react$117;
var init_Polite$1 = __esmMin((() => {
	init_typeof();
	import_react$117 = /* @__PURE__ */ __toESM(require_react());
}));
var import_classnames$35, import_react$116, _excluded$29, DEFAULT_OMIT_PROPS$1, isMultiple$1, BaseSelect$1, BaseSelect_default$1;
var init_BaseSelect$1 = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_toConsumableArray();
	init_slicedToArray();
	init_objectSpread2();
	init_objectWithoutProperties();
	import_classnames$35 = /* @__PURE__ */ __toESM(require_classnames());
	init_useLayoutEffect$2();
	init_useMergedState();
	init_isMobile();
	init_ref();
	import_react$116 = /* @__PURE__ */ __toESM(require_react());
	init_useAllowClear$1();
	init_useBaseProps$1();
	init_useDelayReset$1();
	init_useLock$1();
	init_useSelectTriggerControl$1();
	init_Selector$1();
	init_SelectTrigger$1();
	init_TransBtn$1();
	init_valueUtil$2();
	init_SelectContext$1();
	init_Polite$1();
	_excluded$29 = [
		"id",
		"prefixCls",
		"className",
		"showSearch",
		"tagRender",
		"direction",
		"omitDomProps",
		"displayValues",
		"onDisplayValuesChange",
		"emptyOptions",
		"notFoundContent",
		"onClear",
		"mode",
		"disabled",
		"loading",
		"getInputElement",
		"getRawInputElement",
		"open",
		"defaultOpen",
		"onDropdownVisibleChange",
		"activeValue",
		"onActiveValueChange",
		"activeDescendantId",
		"searchValue",
		"autoClearSearchValue",
		"onSearch",
		"onSearchSplit",
		"tokenSeparators",
		"allowClear",
		"prefix",
		"suffixIcon",
		"clearIcon",
		"OptionList",
		"animation",
		"transitionName",
		"dropdownStyle",
		"dropdownClassName",
		"dropdownMatchSelectWidth",
		"dropdownRender",
		"dropdownAlign",
		"placement",
		"builtinPlacements",
		"getPopupContainer",
		"showAction",
		"onFocus",
		"onBlur",
		"onKeyUp",
		"onKeyDown",
		"onMouseDown"
	];
	DEFAULT_OMIT_PROPS$1 = [
		"value",
		"onChange",
		"removeIcon",
		"placeholder",
		"autoFocus",
		"maxTagCount",
		"maxTagTextLength",
		"maxTagPlaceholder",
		"choiceTransitionName",
		"onInputKeyDown",
		"onPopupScroll",
		"tabIndex"
	];
	isMultiple$1 = function isMultiple$2(mode) {
		return mode === "tags" || mode === "multiple";
	};
	BaseSelect$1 = /* @__PURE__ */ import_react$116.forwardRef(function(props, ref) {
		var _customizeRawInputEle;
		var id = props.id, prefixCls = props.prefixCls, className = props.className, showSearch = props.showSearch, tagRender = props.tagRender, direction = props.direction, omitDomProps = props.omitDomProps, displayValues = props.displayValues, onDisplayValuesChange = props.onDisplayValuesChange, emptyOptions = props.emptyOptions, _props$notFoundConten = props.notFoundContent, notFoundContent = _props$notFoundConten === void 0 ? "Not Found" : _props$notFoundConten, onClear = props.onClear, mode = props.mode, disabled = props.disabled, loading = props.loading, getInputElement = props.getInputElement, getRawInputElement = props.getRawInputElement, open = props.open, defaultOpen = props.defaultOpen, onDropdownVisibleChange = props.onDropdownVisibleChange, activeValue = props.activeValue, onActiveValueChange = props.onActiveValueChange, activeDescendantId = props.activeDescendantId, searchValue = props.searchValue, autoClearSearchValue = props.autoClearSearchValue, onSearch = props.onSearch, onSearchSplit = props.onSearchSplit, tokenSeparators = props.tokenSeparators, allowClear = props.allowClear, prefix = props.prefix, suffixIcon = props.suffixIcon, clearIcon = props.clearIcon, OptionList$3 = props.OptionList, animation = props.animation, transitionName = props.transitionName, dropdownStyle = props.dropdownStyle, dropdownClassName = props.dropdownClassName, dropdownMatchSelectWidth = props.dropdownMatchSelectWidth, dropdownRender = props.dropdownRender, dropdownAlign = props.dropdownAlign, placement = props.placement, builtinPlacements = props.builtinPlacements, getPopupContainer = props.getPopupContainer, _props$showAction = props.showAction, showAction = _props$showAction === void 0 ? [] : _props$showAction, onFocus = props.onFocus, onBlur = props.onBlur, onKeyUp = props.onKeyUp, onKeyDown = props.onKeyDown, onMouseDown = props.onMouseDown, restProps = _objectWithoutProperties(props, _excluded$29);
		var multiple = isMultiple$1(mode);
		var mergedShowSearch = (showSearch !== void 0 ? showSearch : multiple) || mode === "combobox";
		var domProps = _objectSpread2({}, restProps);
		DEFAULT_OMIT_PROPS$1.forEach(function(propName) {
			delete domProps[propName];
		});
		omitDomProps === null || omitDomProps === void 0 || omitDomProps.forEach(function(propName) {
			delete domProps[propName];
		});
		var _React$useState = import_react$116.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), mobile = _React$useState2[0], setMobile = _React$useState2[1];
		import_react$116.useEffect(function() {
			setMobile(isMobile_default());
		}, []);
		var containerRef = import_react$116.useRef(null);
		var selectorDomRef = import_react$116.useRef(null);
		var triggerRef = import_react$116.useRef(null);
		var selectorRef = import_react$116.useRef(null);
		var listRef = import_react$116.useRef(null);
		var blurRef = import_react$116.useRef(false);
		var _useDelayReset = useDelayReset$1(), _useDelayReset2 = _slicedToArray(_useDelayReset, 3), mockFocused = _useDelayReset2[0], setMockFocused = _useDelayReset2[1], cancelSetMockFocused = _useDelayReset2[2];
		import_react$116.useImperativeHandle(ref, function() {
			var _selectorRef$current, _selectorRef$current2;
			return {
				focus: (_selectorRef$current = selectorRef.current) === null || _selectorRef$current === void 0 ? void 0 : _selectorRef$current.focus,
				blur: (_selectorRef$current2 = selectorRef.current) === null || _selectorRef$current2 === void 0 ? void 0 : _selectorRef$current2.blur,
				scrollTo: function scrollTo(arg) {
					var _listRef$current;
					return (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollTo(arg);
				},
				nativeElement: containerRef.current || selectorDomRef.current
			};
		});
		var mergedSearchValue = import_react$116.useMemo(function() {
			var _displayValues$;
			if (mode !== "combobox") return searchValue;
			var val = (_displayValues$ = displayValues[0]) === null || _displayValues$ === void 0 ? void 0 : _displayValues$.value;
			return typeof val === "string" || typeof val === "number" ? String(val) : "";
		}, [
			searchValue,
			mode,
			displayValues
		]);
		var customizeInputElement = mode === "combobox" && typeof getInputElement === "function" && getInputElement() || null;
		var customizeRawInputElement = typeof getRawInputElement === "function" && getRawInputElement();
		var customizeRawInputRef = useComposeRef(selectorDomRef, customizeRawInputElement === null || customizeRawInputElement === void 0 || (_customizeRawInputEle = customizeRawInputElement.props) === null || _customizeRawInputEle === void 0 ? void 0 : _customizeRawInputEle.ref);
		var _React$useState3 = import_react$116.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), rendered = _React$useState4[0], setRendered = _React$useState4[1];
		useLayoutEffect_default(function() {
			setRendered(true);
		}, []);
		var _useMergedState = useMergedState(false, {
			defaultValue: defaultOpen,
			value: open
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), innerOpen = _useMergedState2[0], setInnerOpen = _useMergedState2[1];
		var mergedOpen = rendered ? innerOpen : false;
		var emptyListContent = !notFoundContent && emptyOptions;
		if (disabled || emptyListContent && mergedOpen && mode === "combobox") mergedOpen = false;
		var triggerOpen = emptyListContent ? false : mergedOpen;
		var onToggleOpen = import_react$116.useCallback(function(newOpen) {
			var nextOpen = newOpen !== void 0 ? newOpen : !mergedOpen;
			if (!disabled) {
				setInnerOpen(nextOpen);
				if (mergedOpen !== nextOpen) onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 || onDropdownVisibleChange(nextOpen);
			}
		}, [
			disabled,
			mergedOpen,
			setInnerOpen,
			onDropdownVisibleChange
		]);
		var tokenWithEnter = import_react$116.useMemo(function() {
			return (tokenSeparators || []).some(function(tokenSeparator) {
				return ["\n", "\r\n"].includes(tokenSeparator);
			});
		}, [tokenSeparators]);
		var _ref = import_react$116.useContext(SelectContext_default$1) || {}, maxCount = _ref.maxCount, rawValues = _ref.rawValues;
		var onInternalSearch = function onInternalSearch$1(searchText, fromTyping, isCompositing) {
			if (multiple && isValidCount$1(maxCount) && (rawValues === null || rawValues === void 0 ? void 0 : rawValues.size) >= maxCount) return;
			var ret = true;
			var newSearchText = searchText;
			onActiveValueChange === null || onActiveValueChange === void 0 || onActiveValueChange(null);
			var separatedList = getSeparatedContent$1(searchText, tokenSeparators, isValidCount$1(maxCount) ? maxCount - rawValues.size : void 0);
			var patchLabels = isCompositing ? null : separatedList;
			if (mode !== "combobox" && patchLabels) {
				newSearchText = "";
				onSearchSplit === null || onSearchSplit === void 0 || onSearchSplit(patchLabels);
				onToggleOpen(false);
				ret = false;
			}
			if (onSearch && mergedSearchValue !== newSearchText) onSearch(newSearchText, { source: fromTyping ? "typing" : "effect" });
			return ret;
		};
		var onInternalSearchSubmit = function onInternalSearchSubmit$1(searchText) {
			if (!searchText || !searchText.trim()) return;
			onSearch(searchText, { source: "submit" });
		};
		import_react$116.useEffect(function() {
			if (!mergedOpen && !multiple && mode !== "combobox") onInternalSearch("", false, false);
		}, [mergedOpen]);
		import_react$116.useEffect(function() {
			if (innerOpen && disabled) setInnerOpen(false);
			if (disabled && !blurRef.current) setMockFocused(false);
		}, [disabled]);
		var _useLock = useLock$1(), _useLock2 = _slicedToArray(_useLock, 2), getClearLock = _useLock2[0], setClearLock = _useLock2[1];
		var keyLockRef = import_react$116.useRef(false);
		var onInternalKeyDown = function onInternalKeyDown$1(event) {
			var clearLock = getClearLock();
			var key = event.key;
			var isEnterKey = key === "Enter";
			if (isEnterKey) {
				if (mode !== "combobox") event.preventDefault();
				if (!mergedOpen) onToggleOpen(true);
			}
			setClearLock(!!mergedSearchValue);
			if (key === "Backspace" && !clearLock && multiple && !mergedSearchValue && displayValues.length) {
				var cloneDisplayValues = _toConsumableArray(displayValues);
				var removedDisplayValue = null;
				for (var i = cloneDisplayValues.length - 1; i >= 0; i -= 1) {
					var current = cloneDisplayValues[i];
					if (!current.disabled) {
						cloneDisplayValues.splice(i, 1);
						removedDisplayValue = current;
						break;
					}
				}
				if (removedDisplayValue) onDisplayValuesChange(cloneDisplayValues, {
					type: "remove",
					values: [removedDisplayValue]
				});
			}
			for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) rest[_key - 1] = arguments[_key];
			if (mergedOpen && (!isEnterKey || !keyLockRef.current)) {
				var _listRef$current2;
				if (isEnterKey) keyLockRef.current = true;
				(_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 || _listRef$current2.onKeyDown.apply(_listRef$current2, [event].concat(rest));
			}
			onKeyDown === null || onKeyDown === void 0 || onKeyDown.apply(void 0, [event].concat(rest));
		};
		var onInternalKeyUp = function onInternalKeyUp$1(event) {
			for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) rest[_key2 - 1] = arguments[_key2];
			if (mergedOpen) {
				var _listRef$current3;
				(_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 || _listRef$current3.onKeyUp.apply(_listRef$current3, [event].concat(rest));
			}
			if (event.key === "Enter") keyLockRef.current = false;
			onKeyUp === null || onKeyUp === void 0 || onKeyUp.apply(void 0, [event].concat(rest));
		};
		var onSelectorRemove = function onSelectorRemove$1(val) {
			var newValues = displayValues.filter(function(i) {
				return i !== val;
			});
			onDisplayValuesChange(newValues, {
				type: "remove",
				values: [val]
			});
		};
		var onInputBlur = function onInputBlur$1() {
			keyLockRef.current = false;
		};
		var focusRef = import_react$116.useRef(false);
		var onContainerFocus = function onContainerFocus$1() {
			setMockFocused(true);
			if (!disabled) {
				if (onFocus && !focusRef.current) onFocus.apply(void 0, arguments);
				if (showAction.includes("focus")) onToggleOpen(true);
			}
			focusRef.current = true;
		};
		var onContainerBlur = function onContainerBlur$1() {
			blurRef.current = true;
			setMockFocused(false, function() {
				focusRef.current = false;
				blurRef.current = false;
				onToggleOpen(false);
			});
			if (disabled) return;
			if (mergedSearchValue) {
				if (mode === "tags") onSearch(mergedSearchValue, { source: "submit" });
				else if (mode === "multiple") onSearch("", { source: "blur" });
			}
			if (onBlur) onBlur.apply(void 0, arguments);
		};
		var activeTimeoutIds = [];
		import_react$116.useEffect(function() {
			return function() {
				activeTimeoutIds.forEach(function(timeoutId) {
					return clearTimeout(timeoutId);
				});
				activeTimeoutIds.splice(0, activeTimeoutIds.length);
			};
		}, []);
		var onInternalMouseDown = function onInternalMouseDown$1(event) {
			var _triggerRef$current;
			var target = event.target;
			var popupElement = (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.getPopupElement();
			if (popupElement && popupElement.contains(target)) {
				var timeoutId = setTimeout(function() {
					var index$1 = activeTimeoutIds.indexOf(timeoutId);
					if (index$1 !== -1) activeTimeoutIds.splice(index$1, 1);
					cancelSetMockFocused();
					if (!mobile && !popupElement.contains(document.activeElement)) {
						var _selectorRef$current3;
						(_selectorRef$current3 = selectorRef.current) === null || _selectorRef$current3 === void 0 || _selectorRef$current3.focus();
					}
				});
				activeTimeoutIds.push(timeoutId);
			}
			for (var _len3 = arguments.length, restArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) restArgs[_key3 - 1] = arguments[_key3];
			onMouseDown === null || onMouseDown === void 0 || onMouseDown.apply(void 0, [event].concat(restArgs));
		};
		var _React$useState5 = import_react$116.useState({}), _React$useState6 = _slicedToArray(_React$useState5, 2), forceUpdate = _React$useState6[1];
		function onPopupMouseEnter() {
			forceUpdate({});
		}
		var onTriggerVisibleChange;
		if (customizeRawInputElement) onTriggerVisibleChange = function onTriggerVisibleChange$1(newOpen) {
			onToggleOpen(newOpen);
		};
		useSelectTriggerControl$1(function() {
			var _triggerRef$current2;
			return [containerRef.current, (_triggerRef$current2 = triggerRef.current) === null || _triggerRef$current2 === void 0 ? void 0 : _triggerRef$current2.getPopupElement()];
		}, triggerOpen, onToggleOpen, !!customizeRawInputElement);
		var baseSelectContext = import_react$116.useMemo(function() {
			return _objectSpread2(_objectSpread2({}, props), {}, {
				notFoundContent,
				open: mergedOpen,
				triggerOpen,
				id,
				showSearch: mergedShowSearch,
				multiple,
				toggleOpen: onToggleOpen
			});
		}, [
			props,
			notFoundContent,
			triggerOpen,
			mergedOpen,
			id,
			mergedShowSearch,
			multiple,
			onToggleOpen
		]);
		var showSuffixIcon = !!suffixIcon || loading;
		var arrowNode;
		if (showSuffixIcon) arrowNode = /* @__PURE__ */ import_react$116.createElement(TransBtn_default$1, {
			className: (0, import_classnames$35.default)("".concat(prefixCls, "-arrow"), _defineProperty({}, "".concat(prefixCls, "-arrow-loading"), loading)),
			customizeIcon: suffixIcon,
			customizeIconProps: {
				loading,
				searchValue: mergedSearchValue,
				open: mergedOpen,
				focused: mockFocused,
				showSearch: mergedShowSearch
			}
		});
		var onClearMouseDown = function onClearMouseDown$1() {
			var _selectorRef$current4;
			onClear === null || onClear === void 0 || onClear();
			(_selectorRef$current4 = selectorRef.current) === null || _selectorRef$current4 === void 0 || _selectorRef$current4.focus();
			onDisplayValuesChange([], {
				type: "clear",
				values: displayValues
			});
			onInternalSearch("", false, false);
		};
		var _useAllowClear = useAllowClear$1(prefixCls, onClearMouseDown, displayValues, allowClear, clearIcon, disabled, mergedSearchValue, mode), mergedAllowClear = _useAllowClear.allowClear, clearNode = _useAllowClear.clearIcon;
		var optionList = /* @__PURE__ */ import_react$116.createElement(OptionList$3, { ref: listRef });
		var mergedClassName = (0, import_classnames$35.default)(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-focused"), mockFocused), "".concat(prefixCls, "-multiple"), multiple), "".concat(prefixCls, "-single"), !multiple), "".concat(prefixCls, "-allow-clear"), allowClear), "".concat(prefixCls, "-show-arrow"), showSuffixIcon), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-loading"), loading), "".concat(prefixCls, "-open"), mergedOpen), "".concat(prefixCls, "-customize-input"), customizeInputElement), "".concat(prefixCls, "-show-search"), mergedShowSearch));
		var selectorNode = /* @__PURE__ */ import_react$116.createElement(SelectTrigger_default$1, {
			ref: triggerRef,
			disabled,
			prefixCls,
			visible: triggerOpen,
			popupElement: optionList,
			animation,
			transitionName,
			dropdownStyle,
			dropdownClassName,
			direction,
			dropdownMatchSelectWidth,
			dropdownRender,
			dropdownAlign,
			placement,
			builtinPlacements,
			getPopupContainer,
			empty: emptyOptions,
			getTriggerDOMNode: function getTriggerDOMNode(node) {
				return selectorDomRef.current || node;
			},
			onPopupVisibleChange: onTriggerVisibleChange,
			onPopupMouseEnter
		}, customizeRawInputElement ? /* @__PURE__ */ import_react$116.cloneElement(customizeRawInputElement, { ref: customizeRawInputRef }) : /* @__PURE__ */ import_react$116.createElement(Selector_default$1, _extends({}, props, {
			domRef: selectorDomRef,
			prefixCls,
			inputElement: customizeInputElement,
			ref: selectorRef,
			id,
			prefix,
			showSearch: mergedShowSearch,
			autoClearSearchValue,
			mode,
			activeDescendantId,
			tagRender,
			values: displayValues,
			open: mergedOpen,
			onToggleOpen,
			activeValue,
			searchValue: mergedSearchValue,
			onSearch: onInternalSearch,
			onSearchSubmit: onInternalSearchSubmit,
			onRemove: onSelectorRemove,
			tokenWithEnter,
			onInputBlur
		})));
		var renderNode;
		if (customizeRawInputElement) renderNode = selectorNode;
		else renderNode = /* @__PURE__ */ import_react$116.createElement("div", _extends({ className: mergedClassName }, domProps, {
			ref: containerRef,
			onMouseDown: onInternalMouseDown,
			onKeyDown: onInternalKeyDown,
			onKeyUp: onInternalKeyUp,
			onFocus: onContainerFocus,
			onBlur: onContainerBlur
		}), /* @__PURE__ */ import_react$116.createElement(Polite$1, {
			visible: mockFocused && !mergedOpen,
			values: displayValues
		}), selectorNode, arrowNode, mergedAllowClear && clearNode);
		return /* @__PURE__ */ import_react$116.createElement(BaseSelectContext$1.Provider, { value: baseSelectContext }, renderNode);
	});
	BaseSelect_default$1 = BaseSelect$1;
}));
var OptGroup$1, OptGroup_default$1;
var init_OptGroup$1 = __esmMin((() => {
	OptGroup$1 = function OptGroup$2() {
		return null;
	};
	OptGroup$1.isSelectOptGroup = true;
	OptGroup_default$1 = OptGroup$1;
}));
var Option$1, Option_default$1;
var init_Option$1 = __esmMin((() => {
	Option$1 = function Option$2() {
		return null;
	};
	Option$1.isSelectOption = true;
	Option_default$1 = Option$1;
}));
var import_react$115, import_classnames$34, Filler, Filler_default;
var init_Filler = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	import_react$115 = /* @__PURE__ */ __toESM(require_react());
	init_es$20();
	import_classnames$34 = /* @__PURE__ */ __toESM(require_classnames());
	Filler = /* @__PURE__ */ import_react$115.forwardRef(function(_ref, ref) {
		var height = _ref.height, offsetY = _ref.offsetY, offsetX = _ref.offsetX, children = _ref.children, prefixCls = _ref.prefixCls, onInnerResize = _ref.onInnerResize, innerProps = _ref.innerProps, rtl = _ref.rtl, extra = _ref.extra;
		var outerStyle = {};
		var innerStyle = {
			display: "flex",
			flexDirection: "column"
		};
		if (offsetY !== void 0) {
			outerStyle = {
				height,
				position: "relative",
				overflow: "hidden"
			};
			innerStyle = _objectSpread2(_objectSpread2({}, innerStyle), {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({ transform: "translateY(".concat(offsetY, "px)") }, rtl ? "marginRight" : "marginLeft", -offsetX), "position", "absolute"), "left", 0), "right", 0), "top", 0));
		}
		return /* @__PURE__ */ import_react$115.createElement("div", { style: outerStyle }, /* @__PURE__ */ import_react$115.createElement(es_default$8, { onResize: function onResize(_ref2) {
			var offsetHeight = _ref2.offsetHeight;
			if (offsetHeight && onInnerResize) onInnerResize();
		} }, /* @__PURE__ */ import_react$115.createElement("div", _extends({
			style: innerStyle,
			className: (0, import_classnames$34.default)(_defineProperty({}, "".concat(prefixCls, "-holder-inner"), prefixCls)),
			ref
		}, innerProps), children, extra)));
	});
	Filler.displayName = "Filler";
	Filler_default = Filler;
}));
function Item(_ref) {
	var children = _ref.children, setRef = _ref.setRef;
	var refFunc = import_react$114.useCallback(function(node) {
		setRef(node);
	}, []);
	return /* @__PURE__ */ import_react$114.cloneElement(children, { ref: refFunc });
}
var import_react$114;
var init_Item = __esmMin((() => {
	import_react$114 = /* @__PURE__ */ __toESM(require_react());
}));
function useChildren(list, startIndex, endIndex, scrollWidth, offsetX, setNodeRef, renderFunc, _ref) {
	var getKey$3 = _ref.getKey;
	return list.slice(startIndex, endIndex + 1).map(function(item, index$1) {
		var eleIndex = startIndex + index$1;
		var node = renderFunc(item, eleIndex, {
			style: { width: scrollWidth },
			offsetX
		});
		var key = getKey$3(item);
		return /* @__PURE__ */ import_react$113.createElement(Item, {
			key,
			setRef: function setRef(ele) {
				return setNodeRef(item, ele);
			}
		}, node);
	});
}
var import_react$113;
var init_useChildren = __esmMin((() => {
	import_react$113 = /* @__PURE__ */ __toESM(require_react());
	init_Item();
}));
function findListDiffIndex(originList, targetList, getKey$3) {
	var originLen = originList.length;
	var targetLen = targetList.length;
	var shortList;
	var longList;
	if (originLen === 0 && targetLen === 0) return null;
	if (originLen < targetLen) {
		shortList = originList;
		longList = targetList;
	} else {
		shortList = targetList;
		longList = originList;
	}
	var notExistKey = { __EMPTY_ITEM__: true };
	function getItemKey(item) {
		if (item !== void 0) return getKey$3(item);
		return notExistKey;
	}
	var diffIndex = null;
	var multiple = Math.abs(originLen - targetLen) !== 1;
	for (var i = 0; i < longList.length; i += 1) {
		var shortKey = getItemKey(shortList[i]);
		var longKey = getItemKey(longList[i]);
		if (shortKey !== longKey) {
			diffIndex = i;
			multiple = multiple || shortKey !== getItemKey(longList[i + 1]);
			break;
		}
	}
	return diffIndex === null ? null : {
		index: diffIndex,
		multiple
	};
}
var init_algorithmUtil = __esmMin((() => {}));
function useDiffItem(data, getKey$3, onDiff) {
	var _React$useState = import_react$112.useState(data), _React$useState2 = _slicedToArray(_React$useState, 2), prevData = _React$useState2[0], setPrevData = _React$useState2[1];
	var _React$useState3 = import_react$112.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), diffItem = _React$useState4[0], setDiffItem = _React$useState4[1];
	import_react$112.useEffect(function() {
		var diff = findListDiffIndex(prevData || [], data || [], getKey$3);
		if ((diff === null || diff === void 0 ? void 0 : diff.index) !== void 0) {
			onDiff === null || onDiff === void 0 || onDiff(diff.index);
			setDiffItem(data[diff.index]);
		}
		setPrevData(data);
	}, [data]);
	return [diffItem];
}
var import_react$112;
var init_useDiffItem = __esmMin((() => {
	init_slicedToArray();
	import_react$112 = /* @__PURE__ */ __toESM(require_react());
	init_algorithmUtil();
}));
var isFF, isFirefox_default;
var init_isFirefox = __esmMin((() => {
	init_typeof();
	isFF = (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === "object" && /Firefox/i.test(navigator.userAgent);
	isFirefox_default = isFF;
}));
var import_react$111, useOriginScroll_default;
var init_useOriginScroll = __esmMin((() => {
	import_react$111 = /* @__PURE__ */ __toESM(require_react());
	useOriginScroll_default = (function(isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight) {
		var lockRef = (0, import_react$111.useRef)(false);
		var lockTimeoutRef = (0, import_react$111.useRef)(null);
		function lockScroll() {
			clearTimeout(lockTimeoutRef.current);
			lockRef.current = true;
			lockTimeoutRef.current = setTimeout(function() {
				lockRef.current = false;
			}, 50);
		}
		var scrollPingRef = (0, import_react$111.useRef)({
			top: isScrollAtTop,
			bottom: isScrollAtBottom,
			left: isScrollAtLeft,
			right: isScrollAtRight
		});
		scrollPingRef.current.top = isScrollAtTop;
		scrollPingRef.current.bottom = isScrollAtBottom;
		scrollPingRef.current.left = isScrollAtLeft;
		scrollPingRef.current.right = isScrollAtRight;
		return function(isHorizontal, delta) {
			var smoothOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
			var originScroll = isHorizontal ? delta < 0 && scrollPingRef.current.left || delta > 0 && scrollPingRef.current.right : delta < 0 && scrollPingRef.current.top || delta > 0 && scrollPingRef.current.bottom;
			if (smoothOffset && originScroll) {
				clearTimeout(lockTimeoutRef.current);
				lockRef.current = false;
			} else if (!originScroll || lockRef.current) lockScroll();
			return !lockRef.current && originScroll;
		};
	});
}));
function useFrameWheel(inVirtual, isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight, horizontalScroll, onWheelDelta) {
	var offsetRef = (0, import_react$110.useRef)(0);
	var nextFrameRef = (0, import_react$110.useRef)(null);
	var wheelValueRef = (0, import_react$110.useRef)(null);
	var isMouseScrollRef = (0, import_react$110.useRef)(false);
	var originScroll = useOriginScroll_default(isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight);
	function onWheelY(e, deltaY) {
		raf_default.cancel(nextFrameRef.current);
		if (originScroll(false, deltaY)) return;
		var event = e;
		if (!event._virtualHandled) event._virtualHandled = true;
		else return;
		offsetRef.current += deltaY;
		wheelValueRef.current = deltaY;
		if (!isFirefox_default) event.preventDefault();
		nextFrameRef.current = raf_default(function() {
			var patchMultiple = isMouseScrollRef.current ? 10 : 1;
			onWheelDelta(offsetRef.current * patchMultiple, false);
			offsetRef.current = 0;
		});
	}
	function onWheelX(event, deltaX) {
		onWheelDelta(deltaX, true);
		if (!isFirefox_default) event.preventDefault();
	}
	var wheelDirectionRef = (0, import_react$110.useRef)(null);
	var wheelDirectionCleanRef = (0, import_react$110.useRef)(null);
	function onWheel(event) {
		if (!inVirtual) return;
		raf_default.cancel(wheelDirectionCleanRef.current);
		wheelDirectionCleanRef.current = raf_default(function() {
			wheelDirectionRef.current = null;
		}, 2);
		var deltaX = event.deltaX, deltaY = event.deltaY, shiftKey = event.shiftKey;
		var mergedDeltaX = deltaX;
		var mergedDeltaY = deltaY;
		if (wheelDirectionRef.current === "sx" || !wheelDirectionRef.current && (shiftKey || false) && deltaY && !deltaX) {
			mergedDeltaX = deltaY;
			mergedDeltaY = 0;
			wheelDirectionRef.current = "sx";
		}
		var absX = Math.abs(mergedDeltaX);
		var absY = Math.abs(mergedDeltaY);
		if (wheelDirectionRef.current === null) wheelDirectionRef.current = horizontalScroll && absX > absY ? "x" : "y";
		if (wheelDirectionRef.current === "y") onWheelY(event, mergedDeltaY);
		else onWheelX(event, mergedDeltaX);
	}
	function onFireFoxScroll(event) {
		if (!inVirtual) return;
		isMouseScrollRef.current = event.detail === wheelValueRef.current;
	}
	return [onWheel, onFireFoxScroll];
}
var import_react$110;
var init_useFrameWheel = __esmMin((() => {
	init_raf();
	import_react$110 = /* @__PURE__ */ __toESM(require_react());
	init_isFirefox();
	init_useOriginScroll();
}));
function useGetSize(mergedData, getKey$3, heights, itemHeight) {
	var _React$useMemo = import_react$109.useMemo(function() {
		return [/* @__PURE__ */ new Map(), []];
	}, [
		mergedData,
		heights.id,
		itemHeight
	]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), key2Index = _React$useMemo2[0], bottomList = _React$useMemo2[1];
	var getSize$1 = function getSize$2(startKey) {
		var endKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : startKey;
		var startIndex = key2Index.get(startKey);
		var endIndex = key2Index.get(endKey);
		if (startIndex === void 0 || endIndex === void 0) {
			var dataLen = mergedData.length;
			for (var i = bottomList.length; i < dataLen; i += 1) {
				var _heights$get;
				var item = mergedData[i];
				var key = getKey$3(item);
				key2Index.set(key, i);
				var cacheHeight = (_heights$get = heights.get(key)) !== null && _heights$get !== void 0 ? _heights$get : itemHeight;
				bottomList[i] = (bottomList[i - 1] || 0) + cacheHeight;
				if (key === startKey) startIndex = i;
				if (key === endKey) endIndex = i;
				if (startIndex !== void 0 && endIndex !== void 0) break;
			}
		}
		return {
			top: bottomList[startIndex - 1] || 0,
			bottom: bottomList[endIndex]
		};
	};
	return getSize$1;
}
var import_react$109;
var init_useGetSize = __esmMin((() => {
	init_slicedToArray();
	import_react$109 = /* @__PURE__ */ __toESM(require_react());
}));
var CacheMap, CacheMap_default;
var init_CacheMap = __esmMin((() => {
	init_classCallCheck();
	init_createClass();
	init_defineProperty();
	CacheMap = /* @__PURE__ */ function() {
		function CacheMap$1() {
			_classCallCheck(this, CacheMap$1);
			_defineProperty(this, "maps", void 0);
			_defineProperty(this, "id", 0);
			_defineProperty(this, "diffRecords", /* @__PURE__ */ new Map());
			this.maps = Object.create(null);
		}
		_createClass(CacheMap$1, [
			{
				key: "set",
				value: function set(key, value) {
					this.diffRecords.set(key, this.maps[key]);
					this.maps[key] = value;
					this.id += 1;
				}
			},
			{
				key: "get",
				value: function get(key) {
					return this.maps[key];
				}
			},
			{
				key: "resetRecord",
				value: function resetRecord() {
					this.diffRecords.clear();
				}
			},
			{
				key: "getRecord",
				value: function getRecord() {
					return this.diffRecords;
				}
			}
		]);
		return CacheMap$1;
	}();
	CacheMap_default = CacheMap;
}));
function parseNumber(value) {
	var num = parseFloat(value);
	return isNaN(num) ? 0 : num;
}
function useHeights(getKey$3, onItemAdd, onItemRemove) {
	var _React$useState = import_react$107.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), updatedMark = _React$useState2[0], setUpdatedMark = _React$useState2[1];
	var instanceRef = (0, import_react$108.useRef)(/* @__PURE__ */ new Map());
	var heightsRef = (0, import_react$108.useRef)(new CacheMap_default());
	var promiseIdRef = (0, import_react$108.useRef)(0);
	function cancelRaf() {
		promiseIdRef.current += 1;
	}
	function collectHeight() {
		var sync = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
		cancelRaf();
		var doCollect = function doCollect$1() {
			var changed = false;
			instanceRef.current.forEach(function(element, key) {
				if (element && element.offsetParent) {
					var offsetHeight = element.offsetHeight;
					var _getComputedStyle = getComputedStyle(element), marginTop = _getComputedStyle.marginTop, marginBottom = _getComputedStyle.marginBottom;
					var marginTopNum = parseNumber(marginTop);
					var marginBottomNum = parseNumber(marginBottom);
					var totalHeight = offsetHeight + marginTopNum + marginBottomNum;
					if (heightsRef.current.get(key) !== totalHeight) {
						heightsRef.current.set(key, totalHeight);
						changed = true;
					}
				}
			});
			if (changed) setUpdatedMark(function(c) {
				return c + 1;
			});
		};
		if (sync) doCollect();
		else {
			promiseIdRef.current += 1;
			var id = promiseIdRef.current;
			Promise.resolve().then(function() {
				if (id === promiseIdRef.current) doCollect();
			});
		}
	}
	function setInstanceRef(item, instance) {
		var key = getKey$3(item);
		var origin = instanceRef.current.get(key);
		if (instance) {
			instanceRef.current.set(key, instance);
			collectHeight();
		} else instanceRef.current.delete(key);
		if (!origin !== !instance) if (instance) onItemAdd === null || onItemAdd === void 0 || onItemAdd(item);
		else onItemRemove === null || onItemRemove === void 0 || onItemRemove(item);
	}
	(0, import_react$108.useEffect)(function() {
		return cancelRaf;
	}, []);
	return [
		setInstanceRef,
		collectHeight,
		heightsRef.current,
		updatedMark
	];
}
var import_react$107, import_react$108;
var init_useHeights = __esmMin((() => {
	init_slicedToArray();
	import_react$107 = /* @__PURE__ */ __toESM(require_react());
	import_react$108 = /* @__PURE__ */ __toESM(require_react());
	init_CacheMap();
}));
function useMobileTouchMove(inVirtual, listRef, callback) {
	var touchedRef = (0, import_react$106.useRef)(false);
	var touchXRef = (0, import_react$106.useRef)(0);
	var touchYRef = (0, import_react$106.useRef)(0);
	var elementRef = (0, import_react$106.useRef)(null);
	var intervalRef = (0, import_react$106.useRef)(null);
	var cleanUpEvents;
	var onTouchMove = function onTouchMove$1(e) {
		if (touchedRef.current) {
			var currentX = Math.ceil(e.touches[0].pageX);
			var currentY = Math.ceil(e.touches[0].pageY);
			var offsetX = touchXRef.current - currentX;
			var offsetY = touchYRef.current - currentY;
			var _isHorizontal = Math.abs(offsetX) > Math.abs(offsetY);
			if (_isHorizontal) touchXRef.current = currentX;
			else touchYRef.current = currentY;
			var scrollHandled = callback(_isHorizontal, _isHorizontal ? offsetX : offsetY, false, e);
			if (scrollHandled) e.preventDefault();
			clearInterval(intervalRef.current);
			if (scrollHandled) intervalRef.current = setInterval(function() {
				if (_isHorizontal) offsetX *= SMOOTH_PTG;
				else offsetY *= SMOOTH_PTG;
				var offset = Math.floor(_isHorizontal ? offsetX : offsetY);
				if (!callback(_isHorizontal, offset, true) || Math.abs(offset) <= .1) clearInterval(intervalRef.current);
			}, 16);
		}
	};
	var onTouchEnd = function onTouchEnd$1() {
		touchedRef.current = false;
		cleanUpEvents();
	};
	var onTouchStart = function onTouchStart$1(e) {
		cleanUpEvents();
		if (e.touches.length === 1 && !touchedRef.current) {
			touchedRef.current = true;
			touchXRef.current = Math.ceil(e.touches[0].pageX);
			touchYRef.current = Math.ceil(e.touches[0].pageY);
			elementRef.current = e.target;
			elementRef.current.addEventListener("touchmove", onTouchMove, { passive: false });
			elementRef.current.addEventListener("touchend", onTouchEnd, { passive: true });
		}
	};
	cleanUpEvents = function cleanUpEvents$1() {
		if (elementRef.current) {
			elementRef.current.removeEventListener("touchmove", onTouchMove);
			elementRef.current.removeEventListener("touchend", onTouchEnd);
		}
	};
	useLayoutEffect_default(function() {
		if (inVirtual) listRef.current.addEventListener("touchstart", onTouchStart, { passive: true });
		return function() {
			var _listRef$current;
			(_listRef$current = listRef.current) === null || _listRef$current === void 0 || _listRef$current.removeEventListener("touchstart", onTouchStart);
			cleanUpEvents();
			clearInterval(intervalRef.current);
		};
	}, [inVirtual]);
}
var import_react$106, SMOOTH_PTG;
var init_useMobileTouchMove = __esmMin((() => {
	init_useLayoutEffect$2();
	import_react$106 = /* @__PURE__ */ __toESM(require_react());
	SMOOTH_PTG = 14 / 15;
}));
function smoothScrollOffset(offset) {
	return Math.floor(Math.pow(offset, .5));
}
function getPageXY(e, horizontal) {
	var obj = "touches" in e ? e.touches[0] : e;
	return obj[horizontal ? "pageX" : "pageY"] - window[horizontal ? "scrollX" : "scrollY"];
}
function useScrollDrag(inVirtual, componentRef, onScrollOffset) {
	import_react$105.useEffect(function() {
		var ele = componentRef.current;
		if (inVirtual && ele) {
			var mouseDownLock = false;
			var rafId;
			var _offset;
			var stopScroll = function stopScroll$1() {
				raf_default.cancel(rafId);
			};
			var continueScroll = function continueScroll$1() {
				stopScroll();
				rafId = raf_default(function() {
					onScrollOffset(_offset);
					continueScroll$1();
				});
			};
			var onMouseDown = function onMouseDown$1(e) {
				if (e.target.draggable || e.button !== 0) return;
				var event = e;
				if (!event._virtualHandled) {
					event._virtualHandled = true;
					mouseDownLock = true;
				}
			};
			var onMouseUp = function onMouseUp$1() {
				mouseDownLock = false;
				stopScroll();
			};
			var onMouseMove = function onMouseMove$1(e) {
				if (mouseDownLock) {
					var mouseY = getPageXY(e, false);
					var _ele$getBoundingClien = ele.getBoundingClientRect(), top = _ele$getBoundingClien.top, bottom = _ele$getBoundingClien.bottom;
					if (mouseY <= top) {
						var diff = top - mouseY;
						_offset = -smoothScrollOffset(diff);
						continueScroll();
					} else if (mouseY >= bottom) {
						var _diff = mouseY - bottom;
						_offset = smoothScrollOffset(_diff);
						continueScroll();
					} else stopScroll();
				}
			};
			ele.addEventListener("mousedown", onMouseDown);
			ele.ownerDocument.addEventListener("mouseup", onMouseUp);
			ele.ownerDocument.addEventListener("mousemove", onMouseMove);
			return function() {
				ele.removeEventListener("mousedown", onMouseDown);
				ele.ownerDocument.removeEventListener("mouseup", onMouseUp);
				ele.ownerDocument.removeEventListener("mousemove", onMouseMove);
				stopScroll();
			};
		}
	}, [inVirtual]);
}
var import_react$105;
var init_useScrollDrag = __esmMin((() => {
	init_raf();
	import_react$105 = /* @__PURE__ */ __toESM(require_react());
}));
function useScrollTo(containerRef, data, heights, itemHeight, getKey$3, collectHeight, syncScrollTop, triggerFlash) {
	var scrollRef = import_react$104.useRef();
	var _React$useState = import_react$104.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), syncState = _React$useState2[0], setSyncState = _React$useState2[1];
	useLayoutEffect_default(function() {
		if (syncState && syncState.times < MAX_TIMES) {
			if (!containerRef.current) {
				setSyncState(function(ori) {
					return _objectSpread2({}, ori);
				});
				return;
			}
			collectHeight();
			var targetAlign = syncState.targetAlign, originAlign = syncState.originAlign, index$1 = syncState.index, offset = syncState.offset;
			var height = containerRef.current.clientHeight;
			var needCollectHeight = false;
			var newTargetAlign = targetAlign;
			var targetTop = null;
			if (height) {
				var mergedAlign = targetAlign || originAlign;
				var stackTop = 0;
				var itemTop = 0;
				var itemBottom = 0;
				var maxLen = Math.min(data.length - 1, index$1);
				for (var i = 0; i <= maxLen; i += 1) {
					var key = getKey$3(data[i]);
					itemTop = stackTop;
					var cacheHeight = heights.get(key);
					itemBottom = itemTop + (cacheHeight === void 0 ? itemHeight : cacheHeight);
					stackTop = itemBottom;
				}
				var leftHeight = mergedAlign === "top" ? offset : height - offset;
				for (var _i = maxLen; _i >= 0; _i -= 1) {
					var _key = getKey$3(data[_i]);
					var _cacheHeight = heights.get(_key);
					if (_cacheHeight === void 0) {
						needCollectHeight = true;
						break;
					}
					leftHeight -= _cacheHeight;
					if (leftHeight <= 0) break;
				}
				switch (mergedAlign) {
					case "top":
						targetTop = itemTop - offset;
						break;
					case "bottom":
						targetTop = itemBottom - height + offset;
						break;
					default:
						var scrollTop = containerRef.current.scrollTop;
						var scrollBottom = scrollTop + height;
						if (itemTop < scrollTop) newTargetAlign = "top";
						else if (itemBottom > scrollBottom) newTargetAlign = "bottom";
				}
				if (targetTop !== null) syncScrollTop(targetTop);
				if (targetTop !== syncState.lastTop) needCollectHeight = true;
			}
			if (needCollectHeight) setSyncState(_objectSpread2(_objectSpread2({}, syncState), {}, {
				times: syncState.times + 1,
				targetAlign: newTargetAlign,
				lastTop: targetTop
			}));
		}
	}, [syncState, containerRef.current]);
	return function(arg) {
		if (arg === null || arg === void 0) {
			triggerFlash();
			return;
		}
		raf_default.cancel(scrollRef.current);
		if (typeof arg === "number") syncScrollTop(arg);
		else if (arg && _typeof(arg) === "object") {
			var index$1;
			var align = arg.align;
			if ("index" in arg) index$1 = arg.index;
			else index$1 = data.findIndex(function(item) {
				return getKey$3(item) === arg.key;
			});
			var _arg$offset = arg.offset, offset = _arg$offset === void 0 ? 0 : _arg$offset;
			setSyncState({
				times: 0,
				index: index$1,
				offset,
				originAlign: align
			});
		}
	};
}
var import_react$104, MAX_TIMES;
var init_useScrollTo = __esmMin((() => {
	init_typeof();
	init_objectSpread2();
	init_slicedToArray();
	import_react$104 = /* @__PURE__ */ __toESM(require_react());
	init_raf();
	init_useLayoutEffect$2();
	init_es$18();
	MAX_TIMES = 10;
}));
var import_classnames$33, import_react$103, ScrollBar, ScrollBar_default;
var init_ScrollBar = __esmMin((() => {
	init_objectSpread2();
	init_defineProperty();
	init_slicedToArray();
	import_classnames$33 = /* @__PURE__ */ __toESM(require_classnames());
	init_raf();
	import_react$103 = /* @__PURE__ */ __toESM(require_react());
	init_useScrollDrag();
	ScrollBar = /* @__PURE__ */ import_react$103.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, rtl = props.rtl, scrollOffset = props.scrollOffset, scrollRange = props.scrollRange, onStartMove = props.onStartMove, onStopMove = props.onStopMove, onScroll = props.onScroll, horizontal = props.horizontal, spinSize = props.spinSize, containerSize = props.containerSize, style = props.style, propsThumbStyle = props.thumbStyle, showScrollBar = props.showScrollBar;
		var _React$useState = import_react$103.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), dragging = _React$useState2[0], setDragging = _React$useState2[1];
		var _React$useState3 = import_react$103.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), pageXY = _React$useState4[0], setPageXY = _React$useState4[1];
		var _React$useState5 = import_react$103.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), startTop = _React$useState6[0], setStartTop = _React$useState6[1];
		var isLTR = !rtl;
		var scrollbarRef = import_react$103.useRef();
		var thumbRef = import_react$103.useRef();
		var _React$useState7 = import_react$103.useState(showScrollBar), _React$useState8 = _slicedToArray(_React$useState7, 2), visible = _React$useState8[0], setVisible = _React$useState8[1];
		var visibleTimeoutRef = import_react$103.useRef();
		var delayHidden = function delayHidden$1() {
			if (showScrollBar === true || showScrollBar === false) return;
			clearTimeout(visibleTimeoutRef.current);
			setVisible(true);
			visibleTimeoutRef.current = setTimeout(function() {
				setVisible(false);
			}, 3e3);
		};
		var enableScrollRange = scrollRange - containerSize || 0;
		var enableOffsetRange = containerSize - spinSize || 0;
		var top = import_react$103.useMemo(function() {
			if (scrollOffset === 0 || enableScrollRange === 0) return 0;
			var ptg = scrollOffset / enableScrollRange;
			return ptg * enableOffsetRange;
		}, [
			scrollOffset,
			enableScrollRange,
			enableOffsetRange
		]);
		var onContainerMouseDown = function onContainerMouseDown$1(e) {
			e.stopPropagation();
			e.preventDefault();
		};
		var stateRef = import_react$103.useRef({
			top,
			dragging,
			pageY: pageXY,
			startTop
		});
		stateRef.current = {
			top,
			dragging,
			pageY: pageXY,
			startTop
		};
		var onThumbMouseDown = function onThumbMouseDown$1(e) {
			setDragging(true);
			setPageXY(getPageXY(e, horizontal));
			setStartTop(stateRef.current.top);
			onStartMove();
			e.stopPropagation();
			e.preventDefault();
		};
		import_react$103.useEffect(function() {
			var onScrollbarTouchStart = function onScrollbarTouchStart$1(e) {
				e.preventDefault();
			};
			var scrollbarEle = scrollbarRef.current;
			var thumbEle = thumbRef.current;
			scrollbarEle.addEventListener("touchstart", onScrollbarTouchStart, { passive: false });
			thumbEle.addEventListener("touchstart", onThumbMouseDown, { passive: false });
			return function() {
				scrollbarEle.removeEventListener("touchstart", onScrollbarTouchStart);
				thumbEle.removeEventListener("touchstart", onThumbMouseDown);
			};
		}, []);
		var enableScrollRangeRef = import_react$103.useRef();
		enableScrollRangeRef.current = enableScrollRange;
		var enableOffsetRangeRef = import_react$103.useRef();
		enableOffsetRangeRef.current = enableOffsetRange;
		import_react$103.useEffect(function() {
			if (dragging) {
				var moveRafId;
				var onMouseMove = function onMouseMove$1(e) {
					var _stateRef$current = stateRef.current, stateDragging = _stateRef$current.dragging, statePageY = _stateRef$current.pageY, stateStartTop = _stateRef$current.startTop;
					raf_default.cancel(moveRafId);
					var rect = scrollbarRef.current.getBoundingClientRect();
					var scale = containerSize / (horizontal ? rect.width : rect.height);
					if (stateDragging) {
						var offset = (getPageXY(e, horizontal) - statePageY) * scale;
						var newTop = stateStartTop;
						if (!isLTR && horizontal) newTop -= offset;
						else newTop += offset;
						var tmpEnableScrollRange = enableScrollRangeRef.current;
						var tmpEnableOffsetRange = enableOffsetRangeRef.current;
						var ptg = tmpEnableOffsetRange ? newTop / tmpEnableOffsetRange : 0;
						var newScrollTop = Math.ceil(ptg * tmpEnableScrollRange);
						newScrollTop = Math.max(newScrollTop, 0);
						newScrollTop = Math.min(newScrollTop, tmpEnableScrollRange);
						moveRafId = raf_default(function() {
							onScroll(newScrollTop, horizontal);
						});
					}
				};
				var onMouseUp = function onMouseUp$1() {
					setDragging(false);
					onStopMove();
				};
				window.addEventListener("mousemove", onMouseMove, { passive: true });
				window.addEventListener("touchmove", onMouseMove, { passive: true });
				window.addEventListener("mouseup", onMouseUp, { passive: true });
				window.addEventListener("touchend", onMouseUp, { passive: true });
				return function() {
					window.removeEventListener("mousemove", onMouseMove);
					window.removeEventListener("touchmove", onMouseMove);
					window.removeEventListener("mouseup", onMouseUp);
					window.removeEventListener("touchend", onMouseUp);
					raf_default.cancel(moveRafId);
				};
			}
		}, [dragging]);
		import_react$103.useEffect(function() {
			delayHidden();
			return function() {
				clearTimeout(visibleTimeoutRef.current);
			};
		}, [scrollOffset]);
		import_react$103.useImperativeHandle(ref, function() {
			return { delayHidden };
		});
		var scrollbarPrefixCls = "".concat(prefixCls, "-scrollbar");
		var containerStyle = {
			position: "absolute",
			visibility: visible ? null : "hidden"
		};
		var thumbStyle = {
			position: "absolute",
			background: "rgba(0, 0, 0, 0.5)",
			borderRadius: 99,
			cursor: "pointer",
			userSelect: "none"
		};
		if (horizontal) {
			containerStyle.height = 8;
			containerStyle.left = 0;
			containerStyle.right = 0;
			containerStyle.bottom = 0;
			thumbStyle.height = "100%";
			thumbStyle.width = spinSize;
			if (isLTR) thumbStyle.left = top;
			else thumbStyle.right = top;
		} else {
			containerStyle.width = 8;
			containerStyle.top = 0;
			containerStyle.bottom = 0;
			if (isLTR) containerStyle.right = 0;
			else containerStyle.left = 0;
			thumbStyle.width = "100%";
			thumbStyle.height = spinSize;
			thumbStyle.top = top;
		}
		return /* @__PURE__ */ import_react$103.createElement("div", {
			ref: scrollbarRef,
			className: (0, import_classnames$33.default)(scrollbarPrefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(scrollbarPrefixCls, "-horizontal"), horizontal), "".concat(scrollbarPrefixCls, "-vertical"), !horizontal), "".concat(scrollbarPrefixCls, "-visible"), visible)),
			style: _objectSpread2(_objectSpread2({}, containerStyle), style),
			onMouseDown: onContainerMouseDown,
			onMouseMove: delayHidden
		}, /* @__PURE__ */ import_react$103.createElement("div", {
			ref: thumbRef,
			className: (0, import_classnames$33.default)("".concat(scrollbarPrefixCls, "-thumb"), _defineProperty({}, "".concat(scrollbarPrefixCls, "-thumb-moving"), dragging)),
			style: _objectSpread2(_objectSpread2({}, thumbStyle), propsThumbStyle),
			onMouseDown: onThumbMouseDown
		}));
	});
	ScrollBar_default = ScrollBar;
}));
function getSpinSize() {
	var containerSize = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
	var scrollRange = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	var baseSize = containerSize / scrollRange * containerSize;
	if (isNaN(baseSize)) baseSize = 0;
	baseSize = Math.max(baseSize, MIN_SIZE);
	return Math.floor(baseSize);
}
var MIN_SIZE;
var init_scrollbarUtil = __esmMin((() => {
	MIN_SIZE = 20;
}));
function RawList(props, ref) {
	var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-virtual-list" : _props$prefixCls, className = props.className, height = props.height, itemHeight = props.itemHeight, _props$fullHeight = props.fullHeight, fullHeight = _props$fullHeight === void 0 ? true : _props$fullHeight, style = props.style, data = props.data, children = props.children, itemKey$3 = props.itemKey, virtual = props.virtual, direction = props.direction, scrollWidth = props.scrollWidth, _props$component = props.component, Component$2 = _props$component === void 0 ? "div" : _props$component, onScroll = props.onScroll, onVirtualScroll = props.onVirtualScroll, onVisibleChange = props.onVisibleChange, innerProps = props.innerProps, extraRender = props.extraRender, styles = props.styles, _props$showScrollBar = props.showScrollBar, showScrollBar = _props$showScrollBar === void 0 ? "optional" : _props$showScrollBar, restProps = _objectWithoutProperties(props, _excluded$28);
	var getKey$3 = import_react$101.useCallback(function(item) {
		if (typeof itemKey$3 === "function") return itemKey$3(item);
		return item === null || item === void 0 ? void 0 : item[itemKey$3];
	}, [itemKey$3]);
	var _useHeights = useHeights(getKey$3, null, null), _useHeights2 = _slicedToArray(_useHeights, 4), setInstanceRef = _useHeights2[0], collectHeight = _useHeights2[1], heights = _useHeights2[2], heightUpdatedMark = _useHeights2[3];
	var useVirtual = !!(virtual !== false && height && itemHeight);
	var containerHeight = import_react$101.useMemo(function() {
		return Object.values(heights.maps).reduce(function(total, curr) {
			return total + curr;
		}, 0);
	}, [heights.id, heights.maps]);
	var inVirtual = useVirtual && data && (Math.max(itemHeight * data.length, containerHeight) > height || !!scrollWidth);
	var isRTL = direction === "rtl";
	var mergedClassName = (0, import_classnames$32.default)(prefixCls, _defineProperty({}, "".concat(prefixCls, "-rtl"), isRTL), className);
	var mergedData = data || EMPTY_DATA;
	var componentRef = (0, import_react$102.useRef)();
	var fillerInnerRef = (0, import_react$102.useRef)();
	var containerRef = (0, import_react$102.useRef)();
	var _useState = (0, import_react$102.useState)(0), _useState2 = _slicedToArray(_useState, 2), offsetTop = _useState2[0], setOffsetTop = _useState2[1];
	var _useState3 = (0, import_react$102.useState)(0), _useState4 = _slicedToArray(_useState3, 2), offsetLeft = _useState4[0], setOffsetLeft = _useState4[1];
	var _useState5 = (0, import_react$102.useState)(false), _useState6 = _slicedToArray(_useState5, 2), scrollMoving = _useState6[0], setScrollMoving = _useState6[1];
	var onScrollbarStartMove = function onScrollbarStartMove$1() {
		setScrollMoving(true);
	};
	var onScrollbarStopMove = function onScrollbarStopMove$1() {
		setScrollMoving(false);
	};
	var sharedConfig = { getKey: getKey$3 };
	function syncScrollTop(newTop) {
		setOffsetTop(function(origin) {
			var value;
			if (typeof newTop === "function") value = newTop(origin);
			else value = newTop;
			var alignedTop = keepInRange(value);
			componentRef.current.scrollTop = alignedTop;
			return alignedTop;
		});
	}
	var rangeRef = (0, import_react$102.useRef)({
		start: 0,
		end: mergedData.length
	});
	var diffItemRef = (0, import_react$102.useRef)();
	var _useDiffItem = useDiffItem(mergedData, getKey$3), _useDiffItem2 = _slicedToArray(_useDiffItem, 1), diffItem = _useDiffItem2[0];
	diffItemRef.current = diffItem;
	var _React$useMemo = import_react$101.useMemo(function() {
		if (!useVirtual) return {
			scrollHeight: void 0,
			start: 0,
			end: mergedData.length - 1,
			offset: void 0
		};
		if (!inVirtual) {
			var _fillerInnerRef$curre;
			return {
				scrollHeight: ((_fillerInnerRef$curre = fillerInnerRef.current) === null || _fillerInnerRef$curre === void 0 ? void 0 : _fillerInnerRef$curre.offsetHeight) || 0,
				start: 0,
				end: mergedData.length - 1,
				offset: void 0
			};
		}
		var itemTop = 0;
		var startIndex;
		var startOffset;
		var endIndex;
		var dataLen = mergedData.length;
		for (var i = 0; i < dataLen; i += 1) {
			var _item = mergedData[i];
			var key = getKey$3(_item);
			var cacheHeight = heights.get(key);
			var currentItemBottom = itemTop + (cacheHeight === void 0 ? itemHeight : cacheHeight);
			if (currentItemBottom >= offsetTop && startIndex === void 0) {
				startIndex = i;
				startOffset = itemTop;
			}
			if (currentItemBottom > offsetTop + height && endIndex === void 0) endIndex = i;
			itemTop = currentItemBottom;
		}
		if (startIndex === void 0) {
			startIndex = 0;
			startOffset = 0;
			endIndex = Math.ceil(height / itemHeight);
		}
		if (endIndex === void 0) endIndex = mergedData.length - 1;
		endIndex = Math.min(endIndex + 1, mergedData.length - 1);
		return {
			scrollHeight: itemTop,
			start: startIndex,
			end: endIndex,
			offset: startOffset
		};
	}, [
		inVirtual,
		useVirtual,
		offsetTop,
		mergedData,
		heightUpdatedMark,
		height
	]), scrollHeight = _React$useMemo.scrollHeight, start = _React$useMemo.start, end = _React$useMemo.end, fillerOffset = _React$useMemo.offset;
	rangeRef.current.start = start;
	rangeRef.current.end = end;
	import_react$101.useLayoutEffect(function() {
		var changedRecord = heights.getRecord();
		if (changedRecord.size === 1) {
			var recordKey = Array.from(changedRecord.keys())[0];
			var prevCacheHeight = changedRecord.get(recordKey);
			var startItem = mergedData[start];
			if (startItem && prevCacheHeight === void 0) {
				var startIndexKey = getKey$3(startItem);
				if (startIndexKey === recordKey) {
					var realStartHeight = heights.get(recordKey);
					var diffHeight = realStartHeight - itemHeight;
					syncScrollTop(function(ori) {
						return ori + diffHeight;
					});
				}
			}
		}
		heights.resetRecord();
	}, [scrollHeight]);
	var _React$useState = import_react$101.useState({
		width: 0,
		height
	}), _React$useState2 = _slicedToArray(_React$useState, 2), size = _React$useState2[0], setSize = _React$useState2[1];
	var onHolderResize = function onHolderResize$1(sizeInfo) {
		setSize({
			width: sizeInfo.offsetWidth,
			height: sizeInfo.offsetHeight
		});
	};
	var verticalScrollBarRef = (0, import_react$102.useRef)();
	var horizontalScrollBarRef = (0, import_react$102.useRef)();
	var horizontalScrollBarSpinSize = import_react$101.useMemo(function() {
		return getSpinSize(size.width, scrollWidth);
	}, [size.width, scrollWidth]);
	var verticalScrollBarSpinSize = import_react$101.useMemo(function() {
		return getSpinSize(size.height, scrollHeight);
	}, [size.height, scrollHeight]);
	var maxScrollHeight = scrollHeight - height;
	var maxScrollHeightRef = (0, import_react$102.useRef)(maxScrollHeight);
	maxScrollHeightRef.current = maxScrollHeight;
	function keepInRange(newScrollTop) {
		var newTop = newScrollTop;
		if (!Number.isNaN(maxScrollHeightRef.current)) newTop = Math.min(newTop, maxScrollHeightRef.current);
		newTop = Math.max(newTop, 0);
		return newTop;
	}
	var isScrollAtTop = offsetTop <= 0;
	var isScrollAtBottom = offsetTop >= maxScrollHeight;
	var isScrollAtLeft = offsetLeft <= 0;
	var isScrollAtRight = offsetLeft >= scrollWidth;
	var originScroll = useOriginScroll_default(isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight);
	var getVirtualScrollInfo = function getVirtualScrollInfo$1() {
		return {
			x: isRTL ? -offsetLeft : offsetLeft,
			y: offsetTop
		};
	};
	var lastVirtualScrollInfoRef = (0, import_react$102.useRef)(getVirtualScrollInfo());
	var triggerScroll = useEvent(function(params) {
		if (onVirtualScroll) {
			var nextInfo = _objectSpread2(_objectSpread2({}, getVirtualScrollInfo()), params);
			if (lastVirtualScrollInfoRef.current.x !== nextInfo.x || lastVirtualScrollInfoRef.current.y !== nextInfo.y) {
				onVirtualScroll(nextInfo);
				lastVirtualScrollInfoRef.current = nextInfo;
			}
		}
	});
	function onScrollBar(newScrollOffset, horizontal) {
		var newOffset = newScrollOffset;
		if (horizontal) {
			(0, import_react_dom.flushSync)(function() {
				setOffsetLeft(newOffset);
			});
			triggerScroll();
		} else syncScrollTop(newOffset);
	}
	function onFallbackScroll(e) {
		var newScrollTop = e.currentTarget.scrollTop;
		if (newScrollTop !== offsetTop) syncScrollTop(newScrollTop);
		onScroll === null || onScroll === void 0 || onScroll(e);
		triggerScroll();
	}
	var keepInHorizontalRange = function keepInHorizontalRange$1(nextOffsetLeft) {
		var tmpOffsetLeft = nextOffsetLeft;
		var max = !!scrollWidth ? scrollWidth - size.width : 0;
		tmpOffsetLeft = Math.max(tmpOffsetLeft, 0);
		tmpOffsetLeft = Math.min(tmpOffsetLeft, max);
		return tmpOffsetLeft;
	};
	var onWheelDelta = useEvent(function(offsetXY, fromHorizontal) {
		if (fromHorizontal) {
			(0, import_react_dom.flushSync)(function() {
				setOffsetLeft(function(left) {
					var nextOffsetLeft = left + (isRTL ? -offsetXY : offsetXY);
					return keepInHorizontalRange(nextOffsetLeft);
				});
			});
			triggerScroll();
		} else syncScrollTop(function(top) {
			var newTop = top + offsetXY;
			return newTop;
		});
	});
	var _useFrameWheel = useFrameWheel(useVirtual, isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight, !!scrollWidth, onWheelDelta), _useFrameWheel2 = _slicedToArray(_useFrameWheel, 2), onRawWheel = _useFrameWheel2[0], onFireFoxScroll = _useFrameWheel2[1];
	useMobileTouchMove(useVirtual, componentRef, function(isHorizontal, delta, smoothOffset, e) {
		var event = e;
		if (originScroll(isHorizontal, delta, smoothOffset)) return false;
		if (!event || !event._virtualHandled) {
			if (event) event._virtualHandled = true;
			onRawWheel({
				preventDefault: function preventDefault() {},
				deltaX: isHorizontal ? delta : 0,
				deltaY: isHorizontal ? 0 : delta
			});
			return true;
		}
		return false;
	});
	useScrollDrag(inVirtual, componentRef, function(offset) {
		syncScrollTop(function(top) {
			return top + offset;
		});
	});
	useLayoutEffect_default(function() {
		function onMozMousePixelScroll(e) {
			var scrollingUpAtTop = isScrollAtTop && e.detail < 0;
			var scrollingDownAtBottom = isScrollAtBottom && e.detail > 0;
			if (useVirtual && !scrollingUpAtTop && !scrollingDownAtBottom) e.preventDefault();
		}
		var componentEle = componentRef.current;
		componentEle.addEventListener("wheel", onRawWheel, { passive: false });
		componentEle.addEventListener("DOMMouseScroll", onFireFoxScroll, { passive: true });
		componentEle.addEventListener("MozMousePixelScroll", onMozMousePixelScroll, { passive: false });
		return function() {
			componentEle.removeEventListener("wheel", onRawWheel);
			componentEle.removeEventListener("DOMMouseScroll", onFireFoxScroll);
			componentEle.removeEventListener("MozMousePixelScroll", onMozMousePixelScroll);
		};
	}, [
		useVirtual,
		isScrollAtTop,
		isScrollAtBottom
	]);
	useLayoutEffect_default(function() {
		if (scrollWidth) {
			var newOffsetLeft = keepInHorizontalRange(offsetLeft);
			setOffsetLeft(newOffsetLeft);
			triggerScroll({ x: newOffsetLeft });
		}
	}, [size.width, scrollWidth]);
	var delayHideScrollBar = function delayHideScrollBar$1() {
		var _verticalScrollBarRef, _horizontalScrollBarR;
		(_verticalScrollBarRef = verticalScrollBarRef.current) === null || _verticalScrollBarRef === void 0 || _verticalScrollBarRef.delayHidden();
		(_horizontalScrollBarR = horizontalScrollBarRef.current) === null || _horizontalScrollBarR === void 0 || _horizontalScrollBarR.delayHidden();
	};
	var _scrollTo = useScrollTo(componentRef, mergedData, heights, itemHeight, getKey$3, function() {
		return collectHeight(true);
	}, syncScrollTop, delayHideScrollBar);
	import_react$101.useImperativeHandle(ref, function() {
		return {
			nativeElement: containerRef.current,
			getScrollInfo: getVirtualScrollInfo,
			scrollTo: function scrollTo(config) {
				function isPosScroll(arg) {
					return arg && _typeof(arg) === "object" && ("left" in arg || "top" in arg);
				}
				if (isPosScroll(config)) {
					if (config.left !== void 0) setOffsetLeft(keepInHorizontalRange(config.left));
					_scrollTo(config.top);
				} else _scrollTo(config);
			}
		};
	});
	useLayoutEffect_default(function() {
		if (onVisibleChange) {
			var renderList = mergedData.slice(start, end + 1);
			onVisibleChange(renderList, mergedData);
		}
	}, [
		start,
		end,
		mergedData
	]);
	var getSize$1 = useGetSize(mergedData, getKey$3, heights, itemHeight);
	var extraContent = extraRender === null || extraRender === void 0 ? void 0 : extraRender({
		start,
		end,
		virtual: inVirtual,
		offsetX: offsetLeft,
		offsetY: fillerOffset,
		rtl: isRTL,
		getSize: getSize$1
	});
	var listChildren = useChildren(mergedData, start, end, scrollWidth, offsetLeft, setInstanceRef, children, sharedConfig);
	var componentStyle = null;
	if (height) {
		componentStyle = _objectSpread2(_defineProperty({}, fullHeight ? "height" : "maxHeight", height), ScrollStyle);
		if (useVirtual) {
			componentStyle.overflowY = "hidden";
			if (scrollWidth) componentStyle.overflowX = "hidden";
			if (scrollMoving) componentStyle.pointerEvents = "none";
		}
	}
	var containerProps = {};
	if (isRTL) containerProps.dir = "rtl";
	return /* @__PURE__ */ import_react$101.createElement("div", _extends({
		ref: containerRef,
		style: _objectSpread2(_objectSpread2({}, style), {}, { position: "relative" }),
		className: mergedClassName
	}, containerProps, restProps), /* @__PURE__ */ import_react$101.createElement(es_default$8, { onResize: onHolderResize }, /* @__PURE__ */ import_react$101.createElement(Component$2, {
		className: "".concat(prefixCls, "-holder"),
		style: componentStyle,
		ref: componentRef,
		onScroll: onFallbackScroll,
		onMouseEnter: delayHideScrollBar
	}, /* @__PURE__ */ import_react$101.createElement(Filler_default, {
		prefixCls,
		height: scrollHeight,
		offsetX: offsetLeft,
		offsetY: fillerOffset,
		scrollWidth,
		onInnerResize: collectHeight,
		ref: fillerInnerRef,
		innerProps,
		rtl: isRTL,
		extra: extraContent
	}, listChildren))), inVirtual && scrollHeight > height && /* @__PURE__ */ import_react$101.createElement(ScrollBar_default, {
		ref: verticalScrollBarRef,
		prefixCls,
		scrollOffset: offsetTop,
		scrollRange: scrollHeight,
		rtl: isRTL,
		onScroll: onScrollBar,
		onStartMove: onScrollbarStartMove,
		onStopMove: onScrollbarStopMove,
		spinSize: verticalScrollBarSpinSize,
		containerSize: size.height,
		style: styles === null || styles === void 0 ? void 0 : styles.verticalScrollBar,
		thumbStyle: styles === null || styles === void 0 ? void 0 : styles.verticalScrollBarThumb,
		showScrollBar
	}), inVirtual && scrollWidth > size.width && /* @__PURE__ */ import_react$101.createElement(ScrollBar_default, {
		ref: horizontalScrollBarRef,
		prefixCls,
		scrollOffset: offsetLeft,
		scrollRange: scrollWidth,
		rtl: isRTL,
		onScroll: onScrollBar,
		onStartMove: onScrollbarStartMove,
		onStopMove: onScrollbarStopMove,
		spinSize: horizontalScrollBarSpinSize,
		containerSize: size.width,
		horizontal: true,
		style: styles === null || styles === void 0 ? void 0 : styles.horizontalScrollBar,
		thumbStyle: styles === null || styles === void 0 ? void 0 : styles.horizontalScrollBarThumb,
		showScrollBar
	}));
}
var import_classnames$32, import_react$101, import_react$102, import_react_dom, _excluded$28, EMPTY_DATA, ScrollStyle, List, List_default;
var init_List = __esmMin((() => {
	init_extends();
	init_typeof();
	init_objectSpread2();
	init_defineProperty();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_classnames$32 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$20();
	init_es$18();
	init_useLayoutEffect$2();
	import_react$101 = /* @__PURE__ */ __toESM(require_react());
	import_react$102 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_Filler();
	init_useChildren();
	init_useDiffItem();
	init_useFrameWheel();
	init_useGetSize();
	init_useHeights();
	init_useMobileTouchMove();
	init_useOriginScroll();
	init_useScrollDrag();
	init_useScrollTo();
	init_ScrollBar();
	init_scrollbarUtil();
	_excluded$28 = [
		"prefixCls",
		"className",
		"height",
		"itemHeight",
		"fullHeight",
		"style",
		"data",
		"children",
		"itemKey",
		"virtual",
		"direction",
		"scrollWidth",
		"component",
		"onScroll",
		"onVirtualScroll",
		"onVisibleChange",
		"innerProps",
		"extraRender",
		"styles",
		"showScrollBar"
	];
	EMPTY_DATA = [];
	ScrollStyle = {
		overflowY: "auto",
		overflowAnchor: "none"
	};
	List = /* @__PURE__ */ import_react$101.forwardRef(RawList);
	List.displayName = "List";
	List_default = List;
}));
var es_default$3;
var init_es$14 = __esmMin((() => {
	init_List();
	es_default$3 = List_default;
}));
/* istanbul ignore file */
function isPlatformMac$1() {
	return /(mac\sos|macintosh)/i.test(navigator.appVersion);
}
var init_platformUtil$1 = __esmMin((() => {}));
function isTitleType$2(content) {
	return typeof content === "string" || typeof content === "number";
}
var import_classnames$31, import_react$99, import_react$100, _excluded$27, OptionList$2, RefOptionList$2, OptionList_default$2;
var init_OptionList$2 = __esmMin((() => {
	init_defineProperty();
	init_objectWithoutProperties();
	init_extends();
	init_slicedToArray();
	init_toConsumableArray();
	import_classnames$31 = /* @__PURE__ */ __toESM(require_classnames());
	init_KeyCode();
	init_useMemo();
	init_omit();
	init_pickAttrs();
	init_es$14();
	import_react$99 = /* @__PURE__ */ __toESM(require_react());
	import_react$100 = /* @__PURE__ */ __toESM(require_react());
	init_SelectContext$1();
	init_TransBtn$1();
	init_useBaseProps$1();
	init_platformUtil$1();
	init_valueUtil$2();
	_excluded$27 = [
		"disabled",
		"title",
		"children",
		"style",
		"className"
	];
	OptionList$2 = function OptionList$3(_, ref) {
		var _useBaseProps = useBaseProps$1(), prefixCls = _useBaseProps.prefixCls, id = _useBaseProps.id, open = _useBaseProps.open, multiple = _useBaseProps.multiple, mode = _useBaseProps.mode, searchValue = _useBaseProps.searchValue, toggleOpen = _useBaseProps.toggleOpen, notFoundContent = _useBaseProps.notFoundContent, onPopupScroll = _useBaseProps.onPopupScroll;
		var _React$useContext = import_react$99.useContext(SelectContext_default$1), maxCount = _React$useContext.maxCount, flattenOptions$2 = _React$useContext.flattenOptions, onActiveValue = _React$useContext.onActiveValue, defaultActiveFirstOption = _React$useContext.defaultActiveFirstOption, onSelect = _React$useContext.onSelect, menuItemSelectedIcon = _React$useContext.menuItemSelectedIcon, rawValues = _React$useContext.rawValues, fieldNames = _React$useContext.fieldNames, virtual = _React$useContext.virtual, direction = _React$useContext.direction, listHeight = _React$useContext.listHeight, listItemHeight = _React$useContext.listItemHeight, optionRender = _React$useContext.optionRender;
		var itemPrefixCls = "".concat(prefixCls, "-item");
		var memoFlattenOptions = useMemo(function() {
			return flattenOptions$2;
		}, [open, flattenOptions$2], function(prev, next) {
			return next[0] && prev[1] !== next[1];
		});
		var listRef = import_react$99.useRef(null);
		var overMaxCount = import_react$99.useMemo(function() {
			return multiple && isValidCount$1(maxCount) && (rawValues === null || rawValues === void 0 ? void 0 : rawValues.size) >= maxCount;
		}, [
			multiple,
			maxCount,
			rawValues === null || rawValues === void 0 ? void 0 : rawValues.size
		]);
		var onListMouseDown = function onListMouseDown$1(event) {
			event.preventDefault();
		};
		var scrollIntoView = function scrollIntoView$1(args) {
			var _listRef$current;
			(_listRef$current = listRef.current) === null || _listRef$current === void 0 || _listRef$current.scrollTo(typeof args === "number" ? { index: args } : args);
		};
		var isSelected = import_react$99.useCallback(function(value) {
			if (mode === "combobox") return false;
			return rawValues.has(value);
		}, [
			mode,
			_toConsumableArray(rawValues).toString(),
			rawValues.size
		]);
		var getEnabledActiveIndex = function getEnabledActiveIndex$1(index$1) {
			var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
			var len = memoFlattenOptions.length;
			for (var i = 0; i < len; i += 1) {
				var current = (index$1 + i * offset + len) % len;
				var _ref = memoFlattenOptions[current] || {}, group = _ref.group, data = _ref.data;
				if (!group && !(data !== null && data !== void 0 && data.disabled) && (isSelected(data.value) || !overMaxCount)) return current;
			}
			return -1;
		};
		var _React$useState = import_react$99.useState(function() {
			return getEnabledActiveIndex(0);
		}), _React$useState2 = _slicedToArray(_React$useState, 2), activeIndex = _React$useState2[0], setActiveIndex = _React$useState2[1];
		var setActive = function setActive$1(index$1) {
			var fromKeyboard = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
			setActiveIndex(index$1);
			var info = { source: fromKeyboard ? "keyboard" : "mouse" };
			var flattenItem = memoFlattenOptions[index$1];
			if (!flattenItem) {
				onActiveValue(null, -1, info);
				return;
			}
			onActiveValue(flattenItem.value, index$1, info);
		};
		(0, import_react$100.useEffect)(function() {
			setActive(defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1);
		}, [memoFlattenOptions.length, searchValue]);
		var isAriaSelected = import_react$99.useCallback(function(value) {
			if (mode === "combobox") return String(value).toLowerCase() === searchValue.toLowerCase();
			return rawValues.has(value);
		}, [
			mode,
			searchValue,
			_toConsumableArray(rawValues).toString(),
			rawValues.size
		]);
		(0, import_react$100.useEffect)(function() {
			var timeoutId = setTimeout(function() {
				if (!multiple && open && rawValues.size === 1) {
					var value = Array.from(rawValues)[0];
					var index$1 = memoFlattenOptions.findIndex(function(_ref2) {
						var data = _ref2.data;
						return searchValue ? String(data.value).startsWith(searchValue) : data.value === value;
					});
					if (index$1 !== -1) {
						setActive(index$1);
						scrollIntoView(index$1);
					}
				}
			});
			if (open) {
				var _listRef$current2;
				(_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 || _listRef$current2.scrollTo(void 0);
			}
			return function() {
				return clearTimeout(timeoutId);
			};
		}, [open, searchValue]);
		var onSelectValue = function onSelectValue$1(value) {
			if (value !== void 0) onSelect(value, { selected: !rawValues.has(value) });
			if (!multiple) toggleOpen(false);
		};
		import_react$99.useImperativeHandle(ref, function() {
			return {
				onKeyDown: function onKeyDown(event) {
					var which = event.which, ctrlKey = event.ctrlKey;
					switch (which) {
						case KeyCode_default.N:
						case KeyCode_default.P:
						case KeyCode_default.UP:
						case KeyCode_default.DOWN:
							var offset = 0;
							if (which === KeyCode_default.UP) offset = -1;
							else if (which === KeyCode_default.DOWN) offset = 1;
							else if (isPlatformMac$1() && ctrlKey) {
								if (which === KeyCode_default.N) offset = 1;
								else if (which === KeyCode_default.P) offset = -1;
							}
							if (offset !== 0) {
								var nextActiveIndex = getEnabledActiveIndex(activeIndex + offset, offset);
								scrollIntoView(nextActiveIndex);
								setActive(nextActiveIndex, true);
							}
							break;
						case KeyCode_default.TAB:
						case KeyCode_default.ENTER:
							var _item$data;
							var item = memoFlattenOptions[activeIndex];
							if (item && !(item !== null && item !== void 0 && (_item$data = item.data) !== null && _item$data !== void 0 && _item$data.disabled) && !overMaxCount) onSelectValue(item.value);
							else onSelectValue(void 0);
							if (open) event.preventDefault();
							break;
						case KeyCode_default.ESC:
							toggleOpen(false);
							if (open) event.stopPropagation();
					}
				},
				onKeyUp: function onKeyUp() {},
				scrollTo: function scrollTo(index$1) {
					scrollIntoView(index$1);
				}
			};
		});
		if (memoFlattenOptions.length === 0) return /* @__PURE__ */ import_react$99.createElement("div", {
			role: "listbox",
			id: "".concat(id, "_list"),
			className: "".concat(itemPrefixCls, "-empty"),
			onMouseDown: onListMouseDown
		}, notFoundContent);
		var omitFieldNameList = Object.keys(fieldNames).map(function(key) {
			return fieldNames[key];
		});
		var getLabel = function getLabel$1(item) {
			return item.label;
		};
		function getItemAriaProps(item, index$1) {
			var group = item.group;
			return {
				role: group ? "presentation" : "option",
				id: "".concat(id, "_list_").concat(index$1)
			};
		}
		var renderItem = function renderItem$1(index$1) {
			var item = memoFlattenOptions[index$1];
			if (!item) return null;
			var itemData = item.data || {};
			var value = itemData.value;
			var group = item.group;
			var attrs = pickAttrs(itemData, true);
			var mergedLabel = getLabel(item);
			return item ? /* @__PURE__ */ import_react$99.createElement("div", _extends({ "aria-label": typeof mergedLabel === "string" && !group ? mergedLabel : null }, attrs, { key: index$1 }, getItemAriaProps(item, index$1), { "aria-selected": isAriaSelected(value) }), value) : null;
		};
		var a11yProps = {
			role: "listbox",
			id: "".concat(id, "_list")
		};
		return /* @__PURE__ */ import_react$99.createElement(import_react$99.Fragment, null, virtual && /* @__PURE__ */ import_react$99.createElement("div", _extends({}, a11yProps, { style: {
			height: 0,
			width: 0,
			overflow: "hidden"
		} }), renderItem(activeIndex - 1), renderItem(activeIndex), renderItem(activeIndex + 1)), /* @__PURE__ */ import_react$99.createElement(es_default$3, {
			itemKey: "key",
			ref: listRef,
			data: memoFlattenOptions,
			height: listHeight,
			itemHeight: listItemHeight,
			fullHeight: false,
			onMouseDown: onListMouseDown,
			onScroll: onPopupScroll,
			virtual,
			direction,
			innerProps: virtual ? null : a11yProps
		}, function(item, itemIndex) {
			var group = item.group, groupOption = item.groupOption, data = item.data, label = item.label, value = item.value;
			var key = data.key;
			if (group) {
				var _data$title;
				var groupTitle = (_data$title = data.title) !== null && _data$title !== void 0 ? _data$title : isTitleType$2(label) ? label.toString() : void 0;
				return /* @__PURE__ */ import_react$99.createElement("div", {
					className: (0, import_classnames$31.default)(itemPrefixCls, "".concat(itemPrefixCls, "-group"), data.className),
					title: groupTitle
				}, label !== void 0 ? label : key);
			}
			var disabled = data.disabled, title = data.title;
			data.children;
			var style = data.style, className = data.className, otherProps = _objectWithoutProperties(data, _excluded$27);
			var passedProps = omit(otherProps, omitFieldNameList);
			var selected = isSelected(value);
			var mergedDisabled = disabled || !selected && overMaxCount;
			var optionPrefixCls = "".concat(itemPrefixCls, "-option");
			var optionClassName = (0, import_classnames$31.default)(itemPrefixCls, optionPrefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(optionPrefixCls, "-grouped"), groupOption), "".concat(optionPrefixCls, "-active"), activeIndex === itemIndex && !mergedDisabled), "".concat(optionPrefixCls, "-disabled"), mergedDisabled), "".concat(optionPrefixCls, "-selected"), selected));
			var mergedLabel = getLabel(item);
			var iconVisible = !menuItemSelectedIcon || typeof menuItemSelectedIcon === "function" || selected;
			var content = typeof mergedLabel === "number" ? mergedLabel : mergedLabel || value;
			var optionTitle = isTitleType$2(content) ? content.toString() : void 0;
			if (title !== void 0) optionTitle = title;
			return /* @__PURE__ */ import_react$99.createElement("div", _extends({}, pickAttrs(passedProps), !virtual ? getItemAriaProps(item, itemIndex) : {}, {
				"aria-selected": isAriaSelected(value),
				className: optionClassName,
				title: optionTitle,
				onMouseMove: function onMouseMove() {
					if (activeIndex === itemIndex || mergedDisabled) return;
					setActive(itemIndex);
				},
				onClick: function onClick() {
					if (!mergedDisabled) onSelectValue(value);
				},
				style
			}), /* @__PURE__ */ import_react$99.createElement("div", { className: "".concat(optionPrefixCls, "-content") }, typeof optionRender === "function" ? optionRender(item, { index: itemIndex }) : content), /* @__PURE__ */ import_react$99.isValidElement(menuItemSelectedIcon) || selected, iconVisible && /* @__PURE__ */ import_react$99.createElement(TransBtn_default$1, {
				className: "".concat(itemPrefixCls, "-option-state"),
				customizeIcon: menuItemSelectedIcon,
				customizeIconProps: {
					value,
					disabled: mergedDisabled,
					isSelected: selected
				}
			}, selected ? "✓" : null));
		}));
	};
	RefOptionList$2 = /* @__PURE__ */ import_react$99.forwardRef(OptionList$2);
	OptionList_default$2 = RefOptionList$2;
}));
var import_react$98, useCache_default$2;
var init_useCache$2 = __esmMin((() => {
	init_objectSpread2();
	import_react$98 = /* @__PURE__ */ __toESM(require_react());
	useCache_default$2 = (function(labeledValues, valueOptions) {
		var cacheRef = import_react$98.useRef({
			values: /* @__PURE__ */ new Map(),
			options: /* @__PURE__ */ new Map()
		});
		var filledLabeledValues = import_react$98.useMemo(function() {
			var _cacheRef$current = cacheRef.current, prevValueCache = _cacheRef$current.values, prevOptionCache = _cacheRef$current.options;
			var patchedValues = labeledValues.map(function(item) {
				if (item.label === void 0) {
					var _prevValueCache$get;
					return _objectSpread2(_objectSpread2({}, item), {}, { label: (_prevValueCache$get = prevValueCache.get(item.value)) === null || _prevValueCache$get === void 0 ? void 0 : _prevValueCache$get.label });
				}
				return item;
			});
			var valueCache = /* @__PURE__ */ new Map();
			var optionCache = /* @__PURE__ */ new Map();
			patchedValues.forEach(function(item) {
				valueCache.set(item.value, item);
				optionCache.set(item.value, valueOptions.get(item.value) || prevOptionCache.get(item.value));
			});
			cacheRef.current.values = valueCache;
			cacheRef.current.options = optionCache;
			return patchedValues;
		}, [labeledValues, valueOptions]);
		var getOption = import_react$98.useCallback(function(val) {
			return valueOptions.get(val) || cacheRef.current.options.get(val);
		}, [valueOptions]);
		return [filledLabeledValues, getOption];
	});
}));
function includes$1(test, search) {
	return toArray$4(test).join("").toUpperCase().includes(search);
}
var import_react$97, useFilterOptions_default$1;
var init_useFilterOptions$1 = __esmMin((() => {
	init_defineProperty();
	init_objectSpread2();
	import_react$97 = /* @__PURE__ */ __toESM(require_react());
	init_commonUtil$1();
	init_valueUtil$2();
	useFilterOptions_default$1 = (function(options, fieldNames, searchValue, filterOption, optionFilterProp) {
		return import_react$97.useMemo(function() {
			if (!searchValue || filterOption === false) return options;
			var fieldOptions = fieldNames.options, fieldLabel = fieldNames.label, fieldValue = fieldNames.value;
			var filteredOptions = [];
			var customizeFilter = typeof filterOption === "function";
			var upperSearch = searchValue.toUpperCase();
			var filterFunc = customizeFilter ? filterOption : function(_, option) {
				if (optionFilterProp) return includes$1(option[optionFilterProp], upperSearch);
				if (option[fieldOptions]) return includes$1(option[fieldLabel !== "children" ? fieldLabel : "label"], upperSearch);
				return includes$1(option[fieldValue], upperSearch);
			};
			var wrapOption = customizeFilter ? function(opt) {
				return injectPropsWithOption$1(opt);
			} : function(opt) {
				return opt;
			};
			options.forEach(function(item) {
				if (item[fieldOptions]) {
					var matchGroup = filterFunc(searchValue, wrapOption(item));
					if (matchGroup) filteredOptions.push(item);
					else {
						var subOptions = item[fieldOptions].filter(function(subItem) {
							return filterFunc(searchValue, wrapOption(subItem));
						});
						if (subOptions.length) filteredOptions.push(_objectSpread2(_objectSpread2({}, item), {}, _defineProperty({}, fieldOptions, subOptions)));
					}
					return;
				}
				if (filterFunc(searchValue, wrapOption(item))) filteredOptions.push(item);
			});
			return filteredOptions;
		}, [
			options,
			filterOption,
			optionFilterProp,
			searchValue,
			fieldNames
		]);
	});
}));
function getUUID$2() {
	var retId;
	/* istanbul ignore if */
	if (isBrowserClient$3) {
		retId = uuid$3;
		uuid$3 += 1;
	} else retId = "TEST_OR_SSR";
	return retId;
}
function useId$1(id) {
	var _React$useState = import_react$96.useState(), _React$useState2 = _slicedToArray(_React$useState, 2), innerId = _React$useState2[0], setInnerId = _React$useState2[1];
	import_react$96.useEffect(function() {
		setInnerId("rc_select_".concat(getUUID$2()));
	}, []);
	return id || innerId;
}
var import_react$96, uuid$3, isBrowserClient$3;
var init_useId$2 = __esmMin((() => {
	init_slicedToArray();
	import_react$96 = /* @__PURE__ */ __toESM(require_react());
	init_canUseDom();
	uuid$3 = 0;
	isBrowserClient$3 = canUseDom();
}));
function convertNodeToOption$1(node) {
	var _ref = node, key = _ref.key, _ref$props = _ref.props, children = _ref$props.children, value = _ref$props.value, restProps = _objectWithoutProperties(_ref$props, _excluded$26);
	return _objectSpread2({
		key,
		value: value !== void 0 ? value : key,
		children
	}, restProps);
}
function convertChildrenToData$2(nodes) {
	var optionOnly = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
	return toArray$1(nodes).map(function(node, index$1) {
		if (!/* @__PURE__ */ import_react$95.isValidElement(node) || !node.type) return null;
		var _ref2 = node, isSelectOptGroup = _ref2.type.isSelectOptGroup, key = _ref2.key, _ref2$props = _ref2.props, children = _ref2$props.children, restProps = _objectWithoutProperties(_ref2$props, _excluded2$2);
		if (optionOnly || !isSelectOptGroup) return convertNodeToOption$1(node);
		return _objectSpread2(_objectSpread2({
			key: "__RC_SELECT_GRP__".concat(key === null ? index$1 : key, "__"),
			label: key
		}, restProps), {}, { options: convertChildrenToData$2(children) });
	}).filter(function(data) {
		return data;
	});
}
var import_react$95, _excluded$26, _excluded2$2;
var init_legacyUtil$2 = __esmMin((() => {
	init_objectSpread2();
	init_objectWithoutProperties();
	import_react$95 = /* @__PURE__ */ __toESM(require_react());
	init_toArray$1();
	_excluded$26 = ["children", "value"], _excluded2$2 = ["children"];
}));
var import_react$94, useOptions$1, useOptions_default$1;
var init_useOptions$1 = __esmMin((() => {
	import_react$94 = /* @__PURE__ */ __toESM(require_react());
	init_legacyUtil$2();
	useOptions$1 = function useOptions$2(options, children, fieldNames, optionFilterProp, optionLabelProp) {
		return import_react$94.useMemo(function() {
			var mergedOptions = options;
			var childrenAsData = !options;
			if (childrenAsData) mergedOptions = convertChildrenToData$2(children);
			var valueOptions = /* @__PURE__ */ new Map();
			var labelOptions = /* @__PURE__ */ new Map();
			var setLabelOptions = function setLabelOptions$1(labelOptionsMap, option, key) {
				if (key && typeof key === "string") labelOptionsMap.set(option[key], option);
			};
			var dig = function dig$1(optionList) {
				var isChildren = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
				for (var i = 0; i < optionList.length; i += 1) {
					var option = optionList[i];
					if (!option[fieldNames.options] || isChildren) {
						valueOptions.set(option[fieldNames.value], option);
						setLabelOptions(labelOptions, option, fieldNames.label);
						setLabelOptions(labelOptions, option, optionFilterProp);
						setLabelOptions(labelOptions, option, optionLabelProp);
					} else dig$1(option[fieldNames.options], true);
				}
			};
			dig(mergedOptions);
			return {
				options: mergedOptions,
				valueOptions,
				labelOptions
			};
		}, [
			options,
			children,
			fieldNames,
			optionFilterProp,
			optionLabelProp
		]);
	};
	useOptions_default$1 = useOptions$1;
}));
function useRefFunc$2(callback) {
	var funcRef = import_react$93.useRef();
	funcRef.current = callback;
	var cacheFn = import_react$93.useCallback(function() {
		return funcRef.current.apply(funcRef, arguments);
	}, []);
	return cacheFn;
}
var import_react$93;
var init_useRefFunc$2 = __esmMin((() => {
	import_react$93 = /* @__PURE__ */ __toESM(require_react());
}));
var import_react$92;
var init_warningPropsUtil$2 = __esmMin((() => {
	init_toArray$1();
	init_warning();
	import_react$92 = /* @__PURE__ */ __toESM(require_react());
	init_BaseSelect$1();
	init_commonUtil$1();
	init_legacyUtil$2();
}));
function isRawValue$2(value) {
	return !value || _typeof(value) !== "object";
}
var import_react$91, _excluded$25, OMIT_DOM_PROPS$1, Select$1, TypedSelect$1, Select_default$1;
var init_Select$1 = __esmMin((() => {
	init_extends();
	init_toConsumableArray();
	init_defineProperty();
	init_objectSpread2();
	init_slicedToArray();
	init_objectWithoutProperties();
	init_typeof();
	init_useMergedState();
	init_warning();
	import_react$91 = /* @__PURE__ */ __toESM(require_react());
	init_BaseSelect$1();
	init_OptGroup$1();
	init_Option$1();
	init_OptionList$2();
	init_SelectContext$1();
	init_useCache$2();
	init_useFilterOptions$1();
	init_useId$2();
	init_useOptions$1();
	init_useRefFunc$2();
	init_commonUtil$1();
	init_valueUtil$2();
	init_warningPropsUtil$2();
	_excluded$25 = [
		"id",
		"mode",
		"prefixCls",
		"backfill",
		"fieldNames",
		"inputValue",
		"searchValue",
		"onSearch",
		"autoClearSearchValue",
		"onSelect",
		"onDeselect",
		"dropdownMatchSelectWidth",
		"filterOption",
		"filterSort",
		"optionFilterProp",
		"optionLabelProp",
		"options",
		"optionRender",
		"children",
		"defaultActiveFirstOption",
		"menuItemSelectedIcon",
		"virtual",
		"direction",
		"listHeight",
		"listItemHeight",
		"labelRender",
		"value",
		"defaultValue",
		"labelInValue",
		"onChange",
		"maxCount"
	];
	OMIT_DOM_PROPS$1 = ["inputValue"];
	Select$1 = /* @__PURE__ */ import_react$91.forwardRef(function(props, ref) {
		var id = props.id, mode = props.mode, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-select" : _props$prefixCls, backfill = props.backfill, fieldNames = props.fieldNames, inputValue = props.inputValue, searchValue = props.searchValue, onSearch = props.onSearch, _props$autoClearSearc = props.autoClearSearchValue, autoClearSearchValue = _props$autoClearSearc === void 0 ? true : _props$autoClearSearc, onSelect = props.onSelect, onDeselect = props.onDeselect, _props$dropdownMatchS = props.dropdownMatchSelectWidth, dropdownMatchSelectWidth = _props$dropdownMatchS === void 0 ? true : _props$dropdownMatchS, filterOption = props.filterOption, filterSort = props.filterSort, optionFilterProp = props.optionFilterProp, optionLabelProp = props.optionLabelProp, options = props.options, optionRender = props.optionRender, children = props.children, defaultActiveFirstOption = props.defaultActiveFirstOption, menuItemSelectedIcon = props.menuItemSelectedIcon, virtual = props.virtual, direction = props.direction, _props$listHeight = props.listHeight, listHeight = _props$listHeight === void 0 ? 200 : _props$listHeight, _props$listItemHeight = props.listItemHeight, listItemHeight = _props$listItemHeight === void 0 ? 20 : _props$listItemHeight, labelRender = props.labelRender, value = props.value, defaultValue = props.defaultValue, labelInValue = props.labelInValue, onChange = props.onChange, maxCount = props.maxCount, restProps = _objectWithoutProperties(props, _excluded$25);
		var mergedId = useId$1(id);
		var multiple = isMultiple$1(mode);
		var childrenAsData = !!(!options && children);
		var mergedFilterOption = import_react$91.useMemo(function() {
			if (filterOption === void 0 && mode === "combobox") return false;
			return filterOption;
		}, [filterOption, mode]);
		var mergedFieldNames = import_react$91.useMemo(function() {
			return fillFieldNames$3(fieldNames, childrenAsData);
		}, [JSON.stringify(fieldNames), childrenAsData]);
		var _useMergedState = useMergedState("", {
			value: searchValue !== void 0 ? searchValue : inputValue,
			postState: function postState(search) {
				return search || "";
			}
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedSearchValue = _useMergedState2[0], setSearchValue = _useMergedState2[1];
		var parsedOptions = useOptions_default$1(options, children, mergedFieldNames, optionFilterProp, optionLabelProp);
		var valueOptions = parsedOptions.valueOptions, labelOptions = parsedOptions.labelOptions, mergedOptions = parsedOptions.options;
		var convert2LabelValues = import_react$91.useCallback(function(draftValues) {
			var valueList = toArray$4(draftValues);
			return valueList.map(function(val) {
				var rawValue;
				var rawLabel;
				var rawKey;
				var rawDisabled;
				var rawTitle;
				if (isRawValue$2(val)) rawValue = val;
				else {
					var _val$value;
					rawKey = val.key;
					rawLabel = val.label;
					rawValue = (_val$value = val.value) !== null && _val$value !== void 0 ? _val$value : rawKey;
				}
				var option = valueOptions.get(rawValue);
				if (option) {
					var _option$key;
					if (rawLabel === void 0) rawLabel = option === null || option === void 0 ? void 0 : option[optionLabelProp || mergedFieldNames.label];
					if (rawKey === void 0) rawKey = (_option$key = option === null || option === void 0 ? void 0 : option.key) !== null && _option$key !== void 0 ? _option$key : rawValue;
					rawDisabled = option === null || option === void 0 ? void 0 : option.disabled;
					rawTitle = option === null || option === void 0 ? void 0 : option.title;
					if (0) var optionLabel;
				}
				return {
					label: rawLabel,
					value: rawValue,
					key: rawKey,
					disabled: rawDisabled,
					title: rawTitle
				};
			});
		}, [
			mergedFieldNames,
			optionLabelProp,
			valueOptions
		]);
		var _useMergedState3 = useMergedState(defaultValue, { value }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), internalValue = _useMergedState4[0], setInternalValue = _useMergedState4[1];
		var rawLabeledValues = import_react$91.useMemo(function() {
			var _values$;
			var newInternalValue = multiple && internalValue === null ? [] : internalValue;
			var values = convert2LabelValues(newInternalValue);
			if (mode === "combobox" && isComboNoValue$1((_values$ = values[0]) === null || _values$ === void 0 ? void 0 : _values$.value)) return [];
			return values;
		}, [
			internalValue,
			convert2LabelValues,
			mode,
			multiple
		]);
		var _useCache = useCache_default$2(rawLabeledValues, valueOptions), _useCache2 = _slicedToArray(_useCache, 2), mergedValues = _useCache2[0], getMixedOption = _useCache2[1];
		var displayValues = import_react$91.useMemo(function() {
			if (!mode && mergedValues.length === 1) {
				var firstValue = mergedValues[0];
				if (firstValue.value === null && (firstValue.label === null || firstValue.label === void 0)) return [];
			}
			return mergedValues.map(function(item) {
				var _ref;
				return _objectSpread2(_objectSpread2({}, item), {}, { label: (_ref = typeof labelRender === "function" ? labelRender(item) : item.label) !== null && _ref !== void 0 ? _ref : item.value });
			});
		}, [
			mode,
			mergedValues,
			labelRender
		]);
		var rawValues = import_react$91.useMemo(function() {
			return new Set(mergedValues.map(function(val) {
				return val.value;
			}));
		}, [mergedValues]);
		import_react$91.useEffect(function() {
			if (mode === "combobox") {
				var _mergedValues$;
				var strValue = (_mergedValues$ = mergedValues[0]) === null || _mergedValues$ === void 0 ? void 0 : _mergedValues$.value;
				setSearchValue(hasValue$1(strValue) ? String(strValue) : "");
			}
		}, [mergedValues]);
		var createTagOption = useRefFunc$2(function(val, label) {
			var mergedLabel = label !== null && label !== void 0 ? label : val;
			return _defineProperty(_defineProperty({}, mergedFieldNames.value, val), mergedFieldNames.label, mergedLabel);
		});
		var filledTagOptions = import_react$91.useMemo(function() {
			if (mode !== "tags") return mergedOptions;
			var cloneOptions = _toConsumableArray(mergedOptions);
			var existOptions = function existOptions$1(val) {
				return valueOptions.has(val);
			};
			_toConsumableArray(mergedValues).sort(function(a, b) {
				return a.value < b.value ? -1 : 1;
			}).forEach(function(item) {
				var val = item.value;
				if (!existOptions(val)) cloneOptions.push(createTagOption(val, item.label));
			});
			return cloneOptions;
		}, [
			createTagOption,
			mergedOptions,
			valueOptions,
			mergedValues,
			mode
		]);
		var filteredOptions = useFilterOptions_default$1(filledTagOptions, mergedFieldNames, mergedSearchValue, mergedFilterOption, optionFilterProp);
		var filledSearchOptions = import_react$91.useMemo(function() {
			if (mode !== "tags" || !mergedSearchValue || filteredOptions.some(function(item) {
				return item[optionFilterProp || "value"] === mergedSearchValue;
			})) return filteredOptions;
			if (filteredOptions.some(function(item) {
				return item[mergedFieldNames.value] === mergedSearchValue;
			})) return filteredOptions;
			return [createTagOption(mergedSearchValue)].concat(_toConsumableArray(filteredOptions));
		}, [
			createTagOption,
			optionFilterProp,
			mode,
			filteredOptions,
			mergedSearchValue,
			mergedFieldNames
		]);
		var sorter = function sorter$1(inputOptions) {
			var sortedOptions = _toConsumableArray(inputOptions).sort(function(a, b) {
				return filterSort(a, b, { searchValue: mergedSearchValue });
			});
			return sortedOptions.map(function(item) {
				if (Array.isArray(item.options)) return _objectSpread2(_objectSpread2({}, item), {}, { options: item.options.length > 0 ? sorter$1(item.options) : item.options });
				return item;
			});
		};
		var orderedFilteredOptions = import_react$91.useMemo(function() {
			if (!filterSort) return filledSearchOptions;
			return sorter(filledSearchOptions);
		}, [
			filledSearchOptions,
			filterSort,
			mergedSearchValue
		]);
		var displayOptions = import_react$91.useMemo(function() {
			return flattenOptions$1(orderedFilteredOptions, {
				fieldNames: mergedFieldNames,
				childrenAsData
			});
		}, [
			orderedFilteredOptions,
			mergedFieldNames,
			childrenAsData
		]);
		var triggerChange = function triggerChange$1(values) {
			var labeledValues = convert2LabelValues(values);
			setInternalValue(labeledValues);
			if (onChange && (labeledValues.length !== mergedValues.length || labeledValues.some(function(newVal, index$1) {
				var _mergedValues$index;
				return ((_mergedValues$index = mergedValues[index$1]) === null || _mergedValues$index === void 0 ? void 0 : _mergedValues$index.value) !== (newVal === null || newVal === void 0 ? void 0 : newVal.value);
			}))) {
				var returnValues = labelInValue ? labeledValues : labeledValues.map(function(v) {
					return v.value;
				});
				var returnOptions = labeledValues.map(function(v) {
					return injectPropsWithOption$1(getMixedOption(v.value));
				});
				onChange(multiple ? returnValues : returnValues[0], multiple ? returnOptions : returnOptions[0]);
			}
		};
		var _React$useState = import_react$91.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), activeValue = _React$useState2[0], setActiveValue = _React$useState2[1];
		var _React$useState3 = import_react$91.useState(0), _React$useState4 = _slicedToArray(_React$useState3, 2), accessibilityIndex = _React$useState4[0], setAccessibilityIndex = _React$useState4[1];
		var mergedDefaultActiveFirstOption = defaultActiveFirstOption !== void 0 ? defaultActiveFirstOption : mode !== "combobox";
		var onActiveValue = import_react$91.useCallback(function(active, index$1) {
			var _ref3 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref3$source = _ref3.source, source = _ref3$source === void 0 ? "keyboard" : _ref3$source;
			setAccessibilityIndex(index$1);
			if (backfill && mode === "combobox" && active !== null && source === "keyboard") setActiveValue(String(active));
		}, [backfill, mode]);
		var triggerSelect = function triggerSelect$1(val, selected, type) {
			var getSelectEnt = function getSelectEnt$1() {
				var _option$key2;
				var option = getMixedOption(val);
				return [labelInValue ? {
					label: option === null || option === void 0 ? void 0 : option[mergedFieldNames.label],
					value: val,
					key: (_option$key2 = option === null || option === void 0 ? void 0 : option.key) !== null && _option$key2 !== void 0 ? _option$key2 : val
				} : val, injectPropsWithOption$1(option)];
			};
			if (selected && onSelect) {
				var _getSelectEnt = getSelectEnt(), _getSelectEnt2 = _slicedToArray(_getSelectEnt, 2), wrappedValue = _getSelectEnt2[0], _option = _getSelectEnt2[1];
				onSelect(wrappedValue, _option);
			} else if (!selected && onDeselect && type !== "clear") {
				var _getSelectEnt3 = getSelectEnt(), _getSelectEnt4 = _slicedToArray(_getSelectEnt3, 2), _wrappedValue = _getSelectEnt4[0], _option2 = _getSelectEnt4[1];
				onDeselect(_wrappedValue, _option2);
			}
		};
		var onInternalSelect = useRefFunc$2(function(val, info) {
			var cloneValues;
			var mergedSelect = multiple ? info.selected : true;
			if (mergedSelect) cloneValues = multiple ? [].concat(_toConsumableArray(mergedValues), [val]) : [val];
			else cloneValues = mergedValues.filter(function(v) {
				return v.value !== val;
			});
			triggerChange(cloneValues);
			triggerSelect(val, mergedSelect);
			if (mode === "combobox") setActiveValue("");
			else if (!isMultiple$1 || autoClearSearchValue) {
				setSearchValue("");
				setActiveValue("");
			}
		});
		var onDisplayValuesChange = function onDisplayValuesChange$1(nextValues, info) {
			triggerChange(nextValues);
			var type = info.type, values = info.values;
			if (type === "remove" || type === "clear") values.forEach(function(item) {
				triggerSelect(item.value, false, type);
			});
		};
		var onInternalSearch = function onInternalSearch$1(searchText, info) {
			setSearchValue(searchText);
			setActiveValue(null);
			if (info.source === "submit") {
				var formatted = (searchText || "").trim();
				if (formatted) {
					var newRawValues = Array.from(new Set([].concat(_toConsumableArray(rawValues), [formatted])));
					triggerChange(newRawValues);
					triggerSelect(formatted, true);
					setSearchValue("");
				}
				return;
			}
			if (info.source !== "blur") {
				if (mode === "combobox") triggerChange(searchText);
				onSearch === null || onSearch === void 0 || onSearch(searchText);
			}
		};
		var onInternalSearchSplit = function onInternalSearchSplit$1(words) {
			var patchValues = words;
			if (mode !== "tags") patchValues = words.map(function(word) {
				var opt = labelOptions.get(word);
				return opt === null || opt === void 0 ? void 0 : opt.value;
			}).filter(function(val) {
				return val !== void 0;
			});
			var newRawValues = Array.from(new Set([].concat(_toConsumableArray(rawValues), _toConsumableArray(patchValues))));
			triggerChange(newRawValues);
			newRawValues.forEach(function(newRawValue) {
				triggerSelect(newRawValue, true);
			});
		};
		var selectContext = import_react$91.useMemo(function() {
			var realVirtual = virtual !== false && dropdownMatchSelectWidth !== false;
			return _objectSpread2(_objectSpread2({}, parsedOptions), {}, {
				flattenOptions: displayOptions,
				onActiveValue,
				defaultActiveFirstOption: mergedDefaultActiveFirstOption,
				onSelect: onInternalSelect,
				menuItemSelectedIcon,
				rawValues,
				fieldNames: mergedFieldNames,
				virtual: realVirtual,
				direction,
				listHeight,
				listItemHeight,
				childrenAsData,
				maxCount,
				optionRender
			});
		}, [
			maxCount,
			parsedOptions,
			displayOptions,
			onActiveValue,
			mergedDefaultActiveFirstOption,
			onInternalSelect,
			menuItemSelectedIcon,
			rawValues,
			mergedFieldNames,
			virtual,
			dropdownMatchSelectWidth,
			direction,
			listHeight,
			listItemHeight,
			childrenAsData,
			optionRender
		]);
		return /* @__PURE__ */ import_react$91.createElement(SelectContext_default$1.Provider, { value: selectContext }, /* @__PURE__ */ import_react$91.createElement(BaseSelect_default$1, _extends({}, restProps, {
			id: mergedId,
			prefixCls,
			ref,
			omitDomProps: OMIT_DOM_PROPS$1,
			mode,
			displayValues,
			onDisplayValuesChange,
			direction,
			searchValue: mergedSearchValue,
			onSearch: onInternalSearch,
			autoClearSearchValue,
			onSearchSplit: onInternalSearchSplit,
			dropdownMatchSelectWidth,
			OptionList: OptionList_default$2,
			emptyOptions: !displayOptions.length,
			activeValue,
			activeDescendantId: "".concat(mergedId, "_list_").concat(accessibilityIndex)
		})));
	});
	TypedSelect$1 = Select$1;
	TypedSelect$1.Option = Option_default$1;
	TypedSelect$1.OptGroup = OptGroup_default$1;
	Select_default$1 = TypedSelect$1;
}));
var es_exports$12 = {};
__export(es_exports$12, {
	BaseSelect: () => BaseSelect_default$1,
	OptGroup: () => OptGroup_default$1,
	Option: () => Option_default$1,
	default: () => es_default$19,
	useBaseProps: () => useBaseProps$1
});
var es_default$19;
var init_es$13 = __esmMin((() => {
	init_Select$1();
	init_Option$1();
	init_OptGroup$1();
	init_BaseSelect$1();
	init_useBaseProps$1();
	es_default$19 = Select_default$1;
}));
var es_exports$11 = {};
__export(es_exports$11, {
	Checkbox: () => Checkbox,
	default: () => es_default$18
});
var import_classnames$30, import_react$89, import_react$90, _excluded$24, Checkbox, es_default$18;
var init_es$12 = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_defineProperty();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_classnames$30 = /* @__PURE__ */ __toESM(require_classnames());
	init_useMergedState();
	import_react$89 = /* @__PURE__ */ __toESM(require_react());
	import_react$90 = /* @__PURE__ */ __toESM(require_react());
	_excluded$24 = [
		"prefixCls",
		"className",
		"style",
		"checked",
		"disabled",
		"defaultChecked",
		"type",
		"title",
		"onChange"
	];
	Checkbox = /* @__PURE__ */ (0, import_react$90.forwardRef)(function(props, ref) {
		var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-checkbox" : _props$prefixCls, className = props.className, style = props.style, checked = props.checked, disabled = props.disabled, _props$defaultChecked = props.defaultChecked, defaultChecked = _props$defaultChecked === void 0 ? false : _props$defaultChecked, _props$type = props.type, type = _props$type === void 0 ? "checkbox" : _props$type, title = props.title, onChange = props.onChange, inputProps = _objectWithoutProperties(props, _excluded$24);
		var inputRef = (0, import_react$90.useRef)(null);
		var holderRef = (0, import_react$90.useRef)(null);
		var _useMergedState = useMergedState(defaultChecked, { value: checked }), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValue = _useMergedState2[0], setRawValue = _useMergedState2[1];
		(0, import_react$90.useImperativeHandle)(ref, function() {
			return {
				focus: function focus(options) {
					var _inputRef$current;
					(_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus(options);
				},
				blur: function blur() {
					var _inputRef$current2;
					(_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.blur();
				},
				input: inputRef.current,
				nativeElement: holderRef.current
			};
		});
		var classString = (0, import_classnames$30.default)(prefixCls, className, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-checked"), rawValue), "".concat(prefixCls, "-disabled"), disabled));
		var handleChange = function handleChange$1(e) {
			if (disabled) return;
			if (!("checked" in props)) setRawValue(e.target.checked);
			onChange === null || onChange === void 0 || onChange({
				target: _objectSpread2(_objectSpread2({}, props), {}, {
					type,
					checked: e.target.checked
				}),
				stopPropagation: function stopPropagation() {
					e.stopPropagation();
				},
				preventDefault: function preventDefault() {
					e.preventDefault();
				},
				nativeEvent: e.nativeEvent
			});
		};
		return /* @__PURE__ */ import_react$89.createElement("span", {
			className: classString,
			title,
			style,
			ref: holderRef
		}, /* @__PURE__ */ import_react$89.createElement("input", _extends({}, inputProps, {
			className: "".concat(prefixCls, "-input"),
			ref: inputRef,
			onChange: handleChange,
			disabled,
			checked: !!rawValue,
			type
		})), /* @__PURE__ */ import_react$89.createElement("span", { className: "".concat(prefixCls, "-inner") }));
	});
	es_default$18 = Checkbox;
}));
var import_react$88, TabContext_default;
var init_TabContext = __esmMin((() => {
	import_react$88 = /* @__PURE__ */ __toESM(require_react());
	TabContext_default = /* @__PURE__ */ (0, import_react$88.createContext)(null);
}));
var import_react$87, useIndicator, useIndicator_default;
var init_useIndicator = __esmMin((() => {
	init_slicedToArray();
	init_raf();
	import_react$87 = /* @__PURE__ */ __toESM(require_react());
	useIndicator = function useIndicator$1(options) {
		var activeTabOffset = options.activeTabOffset, horizontal = options.horizontal, rtl = options.rtl, _options$indicator = options.indicator, indicator = _options$indicator === void 0 ? {} : _options$indicator;
		var size = indicator.size, _indicator$align = indicator.align, align = _indicator$align === void 0 ? "center" : _indicator$align;
		var _useState = (0, import_react$87.useState)(), _useState2 = _slicedToArray(_useState, 2), inkStyle = _useState2[0], setInkStyle = _useState2[1];
		var inkBarRafRef = (0, import_react$87.useRef)();
		var getLength = import_react$87.useCallback(function(origin) {
			if (typeof size === "function") return size(origin);
			if (typeof size === "number") return size;
			return origin;
		}, [size]);
		function cleanInkBarRaf() {
			raf_default.cancel(inkBarRafRef.current);
		}
		(0, import_react$87.useEffect)(function() {
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
				var isEqual = inkStyle && newInkStyle && Object.keys(newInkStyle).every(function(key$1) {
					var newValue = newInkStyle[key$1];
					var oldValue = inkStyle[key$1];
					return typeof newValue === "number" && typeof oldValue === "number" ? Math.round(newValue) === Math.round(oldValue) : newValue === oldValue;
				});
				if (!isEqual) setInkStyle(newInkStyle);
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
	return (0, import_react$86.useMemo)(function() {
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
var import_react$86, DEFAULT_SIZE$1;
var init_useOffsets = __esmMin((() => {
	init_objectSpread2();
	import_react$86 = /* @__PURE__ */ __toESM(require_react());
	DEFAULT_SIZE$1 = {
		width: 0,
		height: 0,
		left: 0,
		top: 0
	};
}));
function useSyncState(defaultState, onChange) {
	var stateRef = import_react$85.useRef(defaultState);
	var _React$useState = import_react$85.useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), forceUpdate = _React$useState2[1];
	function setState(updater) {
		var newValue = typeof updater === "function" ? updater(stateRef.current) : updater;
		if (newValue !== stateRef.current) onChange(newValue, stateRef.current);
		stateRef.current = newValue;
		forceUpdate({});
	}
	return [stateRef.current, setState];
}
var import_react$85;
var init_useSyncState = __esmMin((() => {
	init_slicedToArray();
	import_react$85 = /* @__PURE__ */ __toESM(require_react());
}));
function useTouchMove(ref, onOffset) {
	var _useState = (0, import_react$84.useState)(), _useState2 = _slicedToArray(_useState, 2), touchPosition = _useState2[0], setTouchPosition = _useState2[1];
	var _useState3 = (0, import_react$84.useState)(0), _useState4 = _slicedToArray(_useState3, 2), lastTimestamp = _useState4[0], setLastTimestamp = _useState4[1];
	var _useState5 = (0, import_react$84.useState)(0), _useState6 = _slicedToArray(_useState5, 2), lastTimeDiff = _useState6[0], setLastTimeDiff = _useState6[1];
	var _useState7 = (0, import_react$84.useState)(), _useState8 = _slicedToArray(_useState7, 2), lastOffset = _useState8[0], setLastOffset = _useState8[1];
	var motionRef = (0, import_react$84.useRef)();
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
		var now$1 = Date.now();
		setLastTimestamp(now$1);
		setLastTimeDiff(now$1 - lastTimestamp);
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
	var lastWheelDirectionRef = (0, import_react$84.useRef)();
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
	var touchEventsRef = (0, import_react$84.useRef)(null);
	touchEventsRef.current = {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onWheel
	};
	import_react$83.useEffect(function() {
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
var import_react$83, import_react$84, MIN_SWIPE_DISTANCE, STOP_SWIPE_DISTANCE, REFRESH_INTERVAL, SPEED_OFF_MULTIPLE;
var init_useTouchMove = __esmMin((() => {
	init_slicedToArray();
	import_react$83 = /* @__PURE__ */ __toESM(require_react());
	import_react$84 = /* @__PURE__ */ __toESM(require_react());
	MIN_SWIPE_DISTANCE = .1;
	STOP_SWIPE_DISTANCE = .01;
	REFRESH_INTERVAL = 20;
	SPEED_OFF_MULTIPLE = Math.pow(.995, REFRESH_INTERVAL);
}));
function useUpdate(callback) {
	var _useState = (0, import_react$82.useState)(0), _useState2 = _slicedToArray(_useState, 2), count = _useState2[0], setCount = _useState2[1];
	var effectRef = (0, import_react$82.useRef)(0);
	var callbackRef = (0, import_react$82.useRef)();
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
	var batchRef = (0, import_react$82.useRef)([]);
	var _useState3 = (0, import_react$82.useState)({}), _useState4 = _slicedToArray(_useState3, 2), forceUpdate = _useState4[1];
	var state = (0, import_react$82.useRef)(typeof defaultState === "function" ? defaultState() : defaultState);
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
var import_react$82;
var init_useUpdate = __esmMin((() => {
	init_slicedToArray();
	init_useLayoutEffect$2();
	import_react$82 = /* @__PURE__ */ __toESM(require_react());
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
	return (0, import_react$81.useMemo)(function() {
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
		for (var _i = len - 1; _i >= 0; _i -= 1) {
			var _offset = tabOffsets.get(tabs[_i].key) || DEFAULT_SIZE;
			if (_offset[position] < transformSize) {
				startIndex = _i + 1;
				break;
			}
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
var import_react$81, DEFAULT_SIZE;
var init_useVisibleRange = __esmMin((() => {
	import_react$81 = /* @__PURE__ */ __toESM(require_react());
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
var init_util$3 = __esmMin((() => {
	RC_TABS_DOUBLE_QUOTE = "TABS_DQ";
}));
var import_react$80, AddButton, AddButton_default;
var init_AddButton = __esmMin((() => {
	import_react$80 = /* @__PURE__ */ __toESM(require_react());
	AddButton = /* @__PURE__ */ import_react$80.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, editable = props.editable, locale$1 = props.locale, style = props.style;
		if (!editable || editable.showAdd === false) return null;
		return /* @__PURE__ */ import_react$80.createElement("button", {
			ref,
			type: "button",
			className: "".concat(prefixCls, "-nav-add"),
			style,
			"aria-label": (locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.addAriaLabel) || "Add tab",
			onClick: function onClick(event) {
				editable.onEdit("add", { event });
			}
		}, editable.addIcon || "+");
	});
	AddButton_default = AddButton;
}));
var import_react$79, ExtraContent, ExtraContent_default;
var init_ExtraContent = __esmMin((() => {
	init_typeof();
	import_react$79 = /* @__PURE__ */ __toESM(require_react());
	ExtraContent = /* @__PURE__ */ import_react$79.forwardRef(function(props, ref) {
		var position = props.position, prefixCls = props.prefixCls, extra = props.extra;
		if (!extra) return null;
		var content;
		var assertExtra = {};
		if (_typeof(extra) === "object" && !/* @__PURE__ */ import_react$79.isValidElement(extra)) assertExtra = extra;
		else assertExtra.right = extra;
		if (position === "right") content = assertExtra.right;
		if (position === "left") content = assertExtra.left;
		return content ? /* @__PURE__ */ import_react$79.createElement("div", {
			className: "".concat(prefixCls, "-extra-content"),
			ref
		}, content) : null;
	});
	ExtraContent_default = ExtraContent;
}));
var import_classnames$29, import_react$77, import_react$78, OperationNode, OperationNode_default;
var init_OperationNode = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	import_classnames$29 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$22();
	init_es$23();
	init_KeyCode();
	import_react$77 = /* @__PURE__ */ __toESM(require_react());
	import_react$78 = /* @__PURE__ */ __toESM(require_react());
	init_util$3();
	init_AddButton();
	OperationNode = /* @__PURE__ */ import_react$77.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, id = props.id, tabs = props.tabs, locale$1 = props.locale, mobile = props.mobile, _props$more = props.more, moreProps = _props$more === void 0 ? {} : _props$more, style = props.style, className = props.className, editable = props.editable, tabBarGutter = props.tabBarGutter, rtl = props.rtl, removeAriaLabel = props.removeAriaLabel, onTabClick = props.onTabClick, getPopupContainer = props.getPopupContainer, popupClassName = props.popupClassName;
		var _useState = (0, import_react$78.useState)(false), _useState2 = _slicedToArray(_useState, 2), open = _useState2[0], setOpen = _useState2[1];
		var _useState3 = (0, import_react$78.useState)(null), _useState4 = _slicedToArray(_useState3, 2), selectedKey = _useState4[0], setSelectedKey = _useState4[1];
		var _moreProps$icon = moreProps.icon, moreIcon = _moreProps$icon === void 0 ? "More" : _moreProps$icon;
		var popupId = "".concat(id, "-more-popup");
		var dropdownPrefix = "".concat(prefixCls, "-dropdown");
		var selectedItemId = selectedKey !== null ? "".concat(popupId, "-").concat(selectedKey) : null;
		var dropdownAriaLabel = locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.dropdownAriaLabel;
		function onRemoveTab(event, key) {
			event.preventDefault();
			event.stopPropagation();
			editable.onEdit("remove", {
				key,
				event
			});
		}
		var menu = /* @__PURE__ */ import_react$77.createElement(es_default$17, {
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
			return /* @__PURE__ */ import_react$77.createElement(MenuItem_default, {
				key,
				id: "".concat(popupId, "-").concat(key),
				role: "option",
				"aria-controls": id && "".concat(id, "-panel-").concat(key),
				disabled
			}, /* @__PURE__ */ import_react$77.createElement("span", null, label), removable && /* @__PURE__ */ import_react$77.createElement("button", {
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
		(0, import_react$78.useEffect)(function() {
			var ele = document.getElementById(selectedItemId);
			if (ele && ele.scrollIntoView) ele.scrollIntoView(false);
		}, [selectedKey]);
		(0, import_react$78.useEffect)(function() {
			if (!open) setSelectedKey(null);
		}, [open]);
		var moreStyle = _defineProperty({}, rtl ? "marginRight" : "marginLeft", tabBarGutter);
		if (!tabs.length) {
			moreStyle.visibility = "hidden";
			moreStyle.order = 1;
		}
		var overlayClassName = (0, import_classnames$29.default)(_defineProperty({}, "".concat(dropdownPrefix, "-rtl"), rtl));
		var moreNode = mobile ? null : /* @__PURE__ */ import_react$77.createElement(es_default$16, _extends({
			prefixCls: dropdownPrefix,
			overlay: menu,
			visible: tabs.length ? open : false,
			onVisibleChange: setOpen,
			overlayClassName: (0, import_classnames$29.default)(overlayClassName, popupClassName),
			mouseEnterDelay: .1,
			mouseLeaveDelay: .1,
			getPopupContainer
		}, moreProps), /* @__PURE__ */ import_react$77.createElement("button", {
			type: "button",
			className: "".concat(prefixCls, "-nav-more"),
			style: moreStyle,
			"aria-haspopup": "listbox",
			"aria-controls": popupId,
			id: "".concat(id, "-more"),
			"aria-expanded": open,
			onKeyDown
		}, moreIcon));
		return /* @__PURE__ */ import_react$77.createElement("div", {
			className: (0, import_classnames$29.default)("".concat(prefixCls, "-nav-operations"), className),
			style,
			ref
		}, moreNode, /* @__PURE__ */ import_react$77.createElement(AddButton_default, {
			prefixCls,
			locale: locale$1,
			editable
		}));
	});
	OperationNode_default = /* @__PURE__ */ import_react$77.memo(OperationNode, function(_, next) {
		return next.tabMoving;
	});
}));
var import_classnames$28, import_react$76, TabNode, TabNode_default;
var init_TabNode = __esmMin((() => {
	init_defineProperty();
	import_classnames$28 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$76 = /* @__PURE__ */ __toESM(require_react());
	init_util$3();
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
		var labelNode = import_react$76.useMemo(function() {
			return icon && typeof label === "string" ? /* @__PURE__ */ import_react$76.createElement("span", null, label) : label;
		}, [label, icon]);
		var btnRef = import_react$76.useRef(null);
		import_react$76.useEffect(function() {
			if (focus && btnRef.current) btnRef.current.focus();
		}, [focus]);
		var node = /* @__PURE__ */ import_react$76.createElement("div", {
			key,
			"data-node-key": genDataNodeKey(key),
			className: (0, import_classnames$28.default)(tabPrefix, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(tabPrefix, "-with-remove"), removable), "".concat(tabPrefix, "-active"), active), "".concat(tabPrefix, "-disabled"), disabled), "".concat(tabPrefix, "-focus"), focus)),
			style,
			onClick: onInternalClick
		}, /* @__PURE__ */ import_react$76.createElement("div", {
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
		}, focus && /* @__PURE__ */ import_react$76.createElement("div", {
			"aria-live": "polite",
			style: {
				width: 0,
				height: 0,
				position: "absolute",
				overflow: "hidden",
				opacity: 0
			}
		}, "Tab ".concat(currentPosition, " of ").concat(tabCount)), icon && /* @__PURE__ */ import_react$76.createElement("span", { className: "".concat(tabPrefix, "-icon") }, icon), label && labelNode), removable && /* @__PURE__ */ import_react$76.createElement("button", {
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
var import_classnames$27, import_react$74, import_react$75, getTabSize, getSize, getUnitValue, TabNavList, TabNavList_default;
var init_TabNavList = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_toConsumableArray();
	init_objectSpread2();
	init_slicedToArray();
	import_classnames$27 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$20();
	init_useEvent();
	init_ref();
	import_react$74 = /* @__PURE__ */ __toESM(require_react());
	import_react$75 = /* @__PURE__ */ __toESM(require_react());
	init_TabContext();
	init_useIndicator();
	init_useOffsets();
	init_useSyncState();
	init_useTouchMove();
	init_useUpdate();
	init_useVisibleRange();
	init_util$3();
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
	TabNavList = /* @__PURE__ */ import_react$74.forwardRef(function(props, ref) {
		var className = props.className, style = props.style, id = props.id, animated = props.animated, activeKey = props.activeKey, rtl = props.rtl, extra = props.extra, editable = props.editable, locale$1 = props.locale, tabPosition = props.tabPosition, tabBarGutter = props.tabBarGutter, children = props.children, onTabClick = props.onTabClick, onTabScroll = props.onTabScroll, indicator = props.indicator;
		var _React$useContext = import_react$74.useContext(TabContext_default), prefixCls = _React$useContext.prefixCls, tabs = _React$useContext.tabs;
		var containerRef = (0, import_react$75.useRef)(null);
		var extraLeftRef = (0, import_react$75.useRef)(null);
		var extraRightRef = (0, import_react$75.useRef)(null);
		var tabsWrapperRef = (0, import_react$75.useRef)(null);
		var tabListRef = (0, import_react$75.useRef)(null);
		var operationsRef = (0, import_react$75.useRef)(null);
		var innerAddButtonRef = (0, import_react$75.useRef)(null);
		var tabPositionTopOrBottom = tabPosition === "top" || tabPosition === "bottom";
		var _useSyncState = useSyncState(0, function(next, prev) {
			if (tabPositionTopOrBottom && onTabScroll) onTabScroll({ direction: next > prev ? "left" : "right" });
		}), _useSyncState2 = _slicedToArray(_useSyncState, 2), transformLeft = _useSyncState2[0], setTransformLeft = _useSyncState2[1];
		var _useSyncState3 = useSyncState(0, function(next, prev) {
			if (!tabPositionTopOrBottom && onTabScroll) onTabScroll({ direction: next > prev ? "top" : "bottom" });
		}), _useSyncState4 = _slicedToArray(_useSyncState3, 2), transformTop = _useSyncState4[0], setTransformTop = _useSyncState4[1];
		var _useState = (0, import_react$75.useState)([0, 0]), _useState2 = _slicedToArray(_useState, 2), containerExcludeExtraSize = _useState2[0], setContainerExcludeExtraSize = _useState2[1];
		var _useState3 = (0, import_react$75.useState)([0, 0]), _useState4 = _slicedToArray(_useState3, 2), tabContentSize = _useState4[0], setTabContentSize = _useState4[1];
		var _useState5 = (0, import_react$75.useState)([0, 0]), _useState6 = _slicedToArray(_useState5, 2), addSize = _useState6[0], setAddSize = _useState6[1];
		var _useState7 = (0, import_react$75.useState)([0, 0]), _useState8 = _slicedToArray(_useState7, 2), operationSize = _useState8[0], setOperationSize = _useState8[1];
		var _useUpdateState = useUpdateState(/* @__PURE__ */ new Map()), _useUpdateState2 = _slicedToArray(_useUpdateState, 2), tabSizes = _useUpdateState2[0], setTabSizes = _useUpdateState2[1];
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
		var touchMovingRef = (0, import_react$75.useRef)(null);
		var _useState9 = (0, import_react$75.useState)(), _useState10 = _slicedToArray(_useState9, 2), lockAnimation = _useState10[0], setLockAnimation = _useState10[1];
		function doLockAnimation() {
			setLockAnimation(Date.now());
		}
		function clearTouchMoving() {
			if (touchMovingRef.current) clearTimeout(touchMovingRef.current);
		}
		useTouchMove(tabsWrapperRef, function(offsetX, offsetY) {
			function doMove(setState, offset) {
				setState(function(value) {
					var newValue = alignInRange(value + offset);
					return newValue;
				});
			}
			if (!needScroll) return false;
			if (tabPositionTopOrBottom) doMove(setTransformLeft, offsetX);
			else doMove(setTransformTop, offsetY);
			clearTouchMoving();
			doLockAnimation();
			return true;
		});
		(0, import_react$75.useEffect)(function() {
			clearTouchMoving();
			if (lockAnimation) touchMovingRef.current = setTimeout(function() {
				setLockAnimation(0);
			}, 100);
			return clearTouchMoving;
		}, [lockAnimation]);
		var _useVisibleRange = useVisibleRange(tabOffsets, visibleTabContentValue, tabPositionTopOrBottom ? transformLeft : transformTop, tabContentSizeValue, addSizeValue, operationSizeValue, _objectSpread2(_objectSpread2({}, props), {}, { tabs })), _useVisibleRange2 = _slicedToArray(_useVisibleRange, 2), visibleStart = _useVisibleRange2[0], visibleEnd = _useVisibleRange2[1];
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
		var _useState11 = (0, import_react$75.useState)(), _useState12 = _slicedToArray(_useState11, 2), focusKey = _useState12[0], setFocusKey = _useState12[1];
		var _useState13 = (0, import_react$75.useState)(false), _useState14 = _slicedToArray(_useState13, 2), isMouse = _useState14[0], setIsMouse = _useState14[1];
		var enabledTabs = tabs.filter(function(tab) {
			return !tab.disabled;
		}).map(function(tab) {
			return tab.key;
		});
		var onOffset = function onOffset$1(offset) {
			var currentIndex = enabledTabs.indexOf(focusKey || activeKey);
			var len = enabledTabs.length;
			var nextIndex = (currentIndex + offset + len) % len;
			var newKey = enabledTabs[nextIndex];
			setFocusKey(newKey);
		};
		var handleRemoveTab = function handleRemoveTab$1(removalTabKey, e) {
			var removeIndex = enabledTabs.indexOf(removalTabKey);
			var removeTab = tabs.find(function(tab) {
				return tab.key === removalTabKey;
			});
			var removable = getRemovable(removeTab === null || removeTab === void 0 ? void 0 : removeTab.closable, removeTab === null || removeTab === void 0 ? void 0 : removeTab.closeIcon, editable, removeTab === null || removeTab === void 0 ? void 0 : removeTab.disabled);
			if (removable) {
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
			return /* @__PURE__ */ import_react$74.createElement(TabNode_default, {
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
				removeAriaLabel: locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.removeAriaLabel,
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
						var _getTabSize = getTabSize(btnNode, listRect), _getTabSize2 = _slicedToArray(_getTabSize, 4), width = _getTabSize2[0], height = _getTabSize2[1], left = _getTabSize2[2], top = _getTabSize2[3];
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
		(0, import_react$75.useEffect)(function() {
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
			var newOperationSize = getSize(operationsRef);
			setOperationSize(newOperationSize);
			var tabContentFullSize = getSize(tabListRef);
			setTabContentSize([tabContentFullSize[0] - newAddSize[0], tabContentFullSize[1] - newAddSize[1]]);
			updateTabSizes();
		});
		var startHiddenTabs = tabs.slice(0, visibleStart);
		var endHiddenTabs = tabs.slice(visibleEnd + 1);
		var hiddenTabs = [].concat(_toConsumableArray(startHiddenTabs), _toConsumableArray(endHiddenTabs));
		var activeTabOffset = tabOffsets.get(activeKey);
		var _useIndicator = useIndicator_default({
			activeTabOffset,
			horizontal: tabPositionTopOrBottom,
			indicator,
			rtl
		}), indicatorStyle = _useIndicator.style;
		(0, import_react$75.useEffect)(function() {
			scrollToTab();
		}, [
			activeKey,
			transformMin,
			transformMax,
			stringify(activeTabOffset),
			stringify(tabOffsets),
			tabPositionTopOrBottom
		]);
		(0, import_react$75.useEffect)(function() {
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
		return /* @__PURE__ */ import_react$74.createElement(es_default$8, { onResize: onListHolderResize }, /* @__PURE__ */ import_react$74.createElement("div", {
			ref: useComposeRef(ref, containerRef),
			role: "tablist",
			"aria-orientation": tabPositionTopOrBottom ? "horizontal" : "vertical",
			className: (0, import_classnames$27.default)("".concat(prefixCls, "-nav"), className),
			style,
			onKeyDown: function onKeyDown() {
				doLockAnimation();
			}
		}, /* @__PURE__ */ import_react$74.createElement(ExtraContent_default, {
			ref: extraLeftRef,
			position: "left",
			extra,
			prefixCls
		}), /* @__PURE__ */ import_react$74.createElement(es_default$8, { onResize: onListHolderResize }, /* @__PURE__ */ import_react$74.createElement("div", {
			className: (0, import_classnames$27.default)(wrapPrefix, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(wrapPrefix, "-ping-left"), pingLeft), "".concat(wrapPrefix, "-ping-right"), pingRight), "".concat(wrapPrefix, "-ping-top"), pingTop), "".concat(wrapPrefix, "-ping-bottom"), pingBottom)),
			ref: tabsWrapperRef
		}, /* @__PURE__ */ import_react$74.createElement(es_default$8, { onResize: onListHolderResize }, /* @__PURE__ */ import_react$74.createElement("div", {
			ref: tabListRef,
			className: "".concat(prefixCls, "-nav-list"),
			style: {
				transform: "translate(".concat(transformLeft, "px, ").concat(transformTop, "px)"),
				transition: lockAnimation ? "none" : void 0
			}
		}, tabNodes, /* @__PURE__ */ import_react$74.createElement(AddButton_default, {
			ref: innerAddButtonRef,
			prefixCls,
			locale: locale$1,
			editable,
			style: _objectSpread2(_objectSpread2({}, tabNodes.length === 0 ? void 0 : tabNodeStyle), {}, { visibility: hasDropdown ? "hidden" : null })
		}), /* @__PURE__ */ import_react$74.createElement("div", {
			className: (0, import_classnames$27.default)("".concat(prefixCls, "-ink-bar"), _defineProperty({}, "".concat(prefixCls, "-ink-bar-animated"), animated.inkBar)),
			style: indicatorStyle
		}))))), /* @__PURE__ */ import_react$74.createElement(OperationNode_default, _extends({}, props, {
			removeAriaLabel: locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.removeAriaLabel,
			ref: operationsRef,
			prefixCls,
			tabs: hiddenTabs,
			className: !hasDropdown && operationsHiddenClassName,
			tabMoving: !!lockAnimation
		})), /* @__PURE__ */ import_react$74.createElement(ExtraContent_default, {
			ref: extraRightRef,
			position: "right",
			extra,
			prefixCls
		})));
	});
	TabNavList_default = TabNavList;
}));
var import_classnames$26, import_react$73, TabPane, TabPane_default;
var init_TabPane = __esmMin((() => {
	import_classnames$26 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$73 = /* @__PURE__ */ __toESM(require_react());
	TabPane = /* @__PURE__ */ import_react$73.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, className = props.className, style = props.style, id = props.id, active = props.active, tabKey = props.tabKey, children = props.children;
		return /* @__PURE__ */ import_react$73.createElement("div", {
			id: id && "".concat(id, "-panel-").concat(tabKey),
			role: "tabpanel",
			tabIndex: active ? 0 : -1,
			"aria-labelledby": id && "".concat(id, "-tab-").concat(tabKey),
			"aria-hidden": !active,
			style,
			className: (0, import_classnames$26.default)(prefixCls, active && "".concat(prefixCls, "-active"), className),
			ref
		}, children);
	});
	TabPane_default = TabPane;
}));
var import_react$72, _excluded$23, _excluded2$1, TabNavListWrapper, Wrapper_default;
var init_Wrapper = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_objectWithoutProperties();
	import_react$72 = /* @__PURE__ */ __toESM(require_react());
	init_TabNavList();
	init_TabContext();
	init_TabPane();
	_excluded$23 = ["renderTabBar"], _excluded2$1 = ["label", "key"];
	TabNavListWrapper = function TabNavListWrapper$1(_ref) {
		var renderTabBar = _ref.renderTabBar, restProps = _objectWithoutProperties(_ref, _excluded$23);
		var _React$useContext = import_react$72.useContext(TabContext_default), tabs = _React$useContext.tabs;
		if (renderTabBar) {
			var tabNavBarProps = _objectSpread2(_objectSpread2({}, restProps), {}, { panes: tabs.map(function(_ref2) {
				var label = _ref2.label, key = _ref2.key, restTabProps = _objectWithoutProperties(_ref2, _excluded2$1);
				return /* @__PURE__ */ import_react$72.createElement(TabPane_default, _extends({
					tab: label,
					key,
					tabKey: key
				}, restTabProps));
			}) });
			return renderTabBar(tabNavBarProps, TabNavList_default);
		}
		return /* @__PURE__ */ import_react$72.createElement(TabNavList_default, restProps);
	};
	Wrapper_default = TabNavListWrapper;
}));
var import_classnames$25, import_react$71, _excluded$22, TabPanelList, TabPanelList_default;
var init_TabPanelList = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_objectWithoutProperties();
	init_defineProperty();
	import_classnames$25 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$17();
	import_react$71 = /* @__PURE__ */ __toESM(require_react());
	init_TabContext();
	init_TabPane();
	_excluded$22 = [
		"key",
		"forceRender",
		"style",
		"className",
		"destroyInactiveTabPane"
	];
	TabPanelList = function TabPanelList$1(props) {
		var id = props.id, activeKey = props.activeKey, animated = props.animated, tabPosition = props.tabPosition, destroyInactiveTabPane = props.destroyInactiveTabPane;
		var _React$useContext = import_react$71.useContext(TabContext_default), prefixCls = _React$useContext.prefixCls, tabs = _React$useContext.tabs;
		var tabPaneAnimated = animated.tabPane;
		var tabPanePrefixCls = "".concat(prefixCls, "-tabpane");
		return /* @__PURE__ */ import_react$71.createElement("div", { className: (0, import_classnames$25.default)("".concat(prefixCls, "-content-holder")) }, /* @__PURE__ */ import_react$71.createElement("div", { className: (0, import_classnames$25.default)("".concat(prefixCls, "-content"), "".concat(prefixCls, "-content-").concat(tabPosition), _defineProperty({}, "".concat(prefixCls, "-content-animated"), tabPaneAnimated)) }, tabs.map(function(item) {
			var key = item.key, forceRender = item.forceRender, paneStyle = item.style, paneClassName = item.className, itemDestroyInactiveTabPane = item.destroyInactiveTabPane, restTabProps = _objectWithoutProperties(item, _excluded$22);
			var active = key === activeKey;
			return /* @__PURE__ */ import_react$71.createElement(es_default$4, _extends({
				key,
				visible: active,
				forceRender,
				removeOnLeave: !!(destroyInactiveTabPane || itemDestroyInactiveTabPane),
				leavedClassName: "".concat(tabPanePrefixCls, "-hidden")
			}, animated.tabPaneMotion), function(_ref, ref) {
				var motionStyle = _ref.style, motionClassName = _ref.className;
				return /* @__PURE__ */ import_react$71.createElement(TabPane_default, _extends({}, restTabProps, {
					prefixCls: tabPanePrefixCls,
					id,
					tabKey: key,
					animated: tabPaneAnimated,
					active,
					style: _objectSpread2(_objectSpread2({}, paneStyle), motionStyle),
					className: (0, import_classnames$25.default)(paneClassName, motionClassName),
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
var import_classnames$24, import_react$69, import_react$70, _excluded$21, uuid$2, Tabs, Tabs_default;
var init_Tabs = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_slicedToArray();
	init_typeof();
	init_objectWithoutProperties();
	import_classnames$24 = /* @__PURE__ */ __toESM(require_classnames());
	init_useMergedState();
	init_isMobile();
	import_react$69 = /* @__PURE__ */ __toESM(require_react());
	import_react$70 = /* @__PURE__ */ __toESM(require_react());
	init_TabContext();
	init_Wrapper();
	init_TabPanelList();
	init_useAnimateConfig();
	_excluded$21 = [
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
	uuid$2 = 0;
	Tabs = /* @__PURE__ */ import_react$69.forwardRef(function(props, ref) {
		var id = props.id, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tabs" : _props$prefixCls, className = props.className, items = props.items, direction = props.direction, activeKey = props.activeKey, defaultActiveKey = props.defaultActiveKey, editable = props.editable, animated = props.animated, _props$tabPosition = props.tabPosition, tabPosition = _props$tabPosition === void 0 ? "top" : _props$tabPosition, tabBarGutter = props.tabBarGutter, tabBarStyle = props.tabBarStyle, tabBarExtraContent = props.tabBarExtraContent, locale$1 = props.locale, more = props.more, destroyInactiveTabPane = props.destroyInactiveTabPane, renderTabBar = props.renderTabBar, onChange = props.onChange, onTabClick = props.onTabClick, onTabScroll = props.onTabScroll, getPopupContainer = props.getPopupContainer, popupClassName = props.popupClassName, indicator = props.indicator, restProps = _objectWithoutProperties(props, _excluded$21);
		var tabs = import_react$69.useMemo(function() {
			return (items || []).filter(function(item) {
				return item && _typeof(item) === "object" && "key" in item;
			});
		}, [items]);
		var rtl = direction === "rtl";
		var mergedAnimated = useAnimateConfig(animated);
		var _useState = (0, import_react$70.useState)(false), _useState2 = _slicedToArray(_useState, 2), mobile = _useState2[0], setMobile = _useState2[1];
		(0, import_react$70.useEffect)(function() {
			setMobile(isMobile_default());
		}, []);
		var _useMergedState = useMergedState(function() {
			var _tabs$;
			return (_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.key;
		}, {
			value: activeKey,
			defaultValue: defaultActiveKey
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedActiveKey = _useMergedState2[0], setMergedActiveKey = _useMergedState2[1];
		var _useState3 = (0, import_react$70.useState)(function() {
			return tabs.findIndex(function(tab) {
				return tab.key === mergedActiveKey;
			});
		}), _useState4 = _slicedToArray(_useState3, 2), activeIndex = _useState4[0], setActiveIndex = _useState4[1];
		(0, import_react$70.useEffect)(function() {
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
		var _useMergedState3 = useMergedState(null, { value: id }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedId = _useMergedState4[0], setMergedId = _useMergedState4[1];
		(0, import_react$70.useEffect)(function() {
			if (!id) {
				setMergedId("rc-tabs-".concat(uuid$2));
				uuid$2 += 1;
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
			locale: locale$1,
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
		return /* @__PURE__ */ import_react$69.createElement(TabContext_default.Provider, { value: {
			tabs,
			prefixCls
		} }, /* @__PURE__ */ import_react$69.createElement("div", _extends({
			ref,
			id,
			className: (0, import_classnames$24.default)(prefixCls, "".concat(prefixCls, "-").concat(tabPosition), _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-mobile"), mobile), "".concat(prefixCls, "-editable"), editable), "".concat(prefixCls, "-rtl"), rtl), className)
		}, restProps), /* @__PURE__ */ import_react$69.createElement(Wrapper_default, _extends({}, tabNavBarProps, { renderTabBar })), /* @__PURE__ */ import_react$69.createElement(TabPanelList_default, _extends({ destroyInactiveTabPane }, sharedProps, { animated: mergedAnimated }))));
	});
	Tabs_default = Tabs;
}));
var es_exports$10 = {};
__export(es_exports$10, { default: () => es_default$15 });
var es_default$15;
var init_es$11 = __esmMin((() => {
	init_Tabs();
	es_default$15 = Tabs_default;
}));
function throttle(delay, callback, options) {
	var _ref = options || {}, _ref$noTrailing = _ref.noTrailing, noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing, _ref$noLeading = _ref.noLeading, noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading, _ref$debounceMode = _ref.debounceMode, debounceMode = _ref$debounceMode === void 0 ? void 0 : _ref$debounceMode;
	var timeoutID;
	var cancelled = false;
	var lastExec = 0;
	function clearExistingTimeout() {
		if (timeoutID) clearTimeout(timeoutID);
	}
	function cancel(options$1) {
		var _ref2 = options$1 || {}, _ref2$upcomingOnly = _ref2.upcomingOnly, upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
		clearExistingTimeout();
		cancelled = !upcomingOnly;
	}
	function wrapper() {
		for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) arguments_[_key] = arguments[_key];
		var self = this;
		var elapsed = Date.now() - lastExec;
		if (cancelled) return;
		function exec() {
			lastExec = Date.now();
			callback.apply(self, arguments_);
		}
		function clear() {
			timeoutID = void 0;
		}
		if (!noLeading && debounceMode && !timeoutID) exec();
		clearExistingTimeout();
		if (debounceMode === void 0 && elapsed > delay) if (noLeading) {
			lastExec = Date.now();
			if (!noTrailing) timeoutID = setTimeout(debounceMode ? clear : exec, delay);
		} else exec();
		else if (noTrailing !== true) timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
	}
	wrapper.cancel = cancel;
	return wrapper;
}
function debounce(delay, callback, options) {
	var _ref = options || {}, _ref$atBegin = _ref.atBegin, atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;
	return throttle(delay, callback, { debounceMode: atBegin !== false });
}
var init_esm = __esmMin((() => {}));
var import_react$68, import_classnames$23, TransBtn, TransBtn_default;
var init_TransBtn = __esmMin((() => {
	import_react$68 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$23 = /* @__PURE__ */ __toESM(require_classnames());
	TransBtn = function TransBtn$2(props) {
		var className = props.className, customizeIcon = props.customizeIcon, customizeIconProps = props.customizeIconProps, children = props.children, _onMouseDown = props.onMouseDown, onClick = props.onClick;
		var icon = typeof customizeIcon === "function" ? customizeIcon(customizeIconProps) : customizeIcon;
		return /* @__PURE__ */ import_react$68.createElement("span", {
			className,
			onMouseDown: function onMouseDown(event) {
				event.preventDefault();
				_onMouseDown === null || _onMouseDown === void 0 || _onMouseDown(event);
			},
			style: {
				userSelect: "none",
				WebkitUserSelect: "none"
			},
			unselectable: "on",
			onClick,
			"aria-hidden": true
		}, icon !== void 0 ? icon : /* @__PURE__ */ import_react$68.createElement("span", { className: (0, import_classnames$23.default)(className.split(/\s+/).map(function(cls) {
			return "".concat(cls, "-icon");
		})) }, children));
	};
	TransBtn_default = TransBtn;
}));
var import_react$67, useAllowClear;
var init_useAllowClear = __esmMin((() => {
	init_typeof();
	init_TransBtn();
	import_react$67 = /* @__PURE__ */ __toESM(require_react());
	useAllowClear = function useAllowClear$2(prefixCls, onClearMouseDown, displayValues, allowClear, clearIcon) {
		var disabled = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
		var mergedSearchValue = arguments.length > 6 ? arguments[6] : void 0;
		var mode = arguments.length > 7 ? arguments[7] : void 0;
		var mergedClearIcon = import_react$67.useMemo(function() {
			if (_typeof(allowClear) === "object") return allowClear.clearIcon;
			if (clearIcon) return clearIcon;
		}, [allowClear, clearIcon]);
		var mergedAllowClear = import_react$67.useMemo(function() {
			if (!disabled && !!allowClear && (displayValues.length || mergedSearchValue) && !(mode === "combobox" && mergedSearchValue === "")) return true;
			return false;
		}, [
			allowClear,
			disabled,
			displayValues.length,
			mergedSearchValue,
			mode
		]);
		return {
			allowClear: mergedAllowClear,
			clearIcon: /* @__PURE__ */ import_react$67.createElement(TransBtn_default, {
				className: "".concat(prefixCls, "-clear"),
				onMouseDown: onClearMouseDown,
				customizeIcon: mergedClearIcon
			}, "×")
		};
	};
}));
function useBaseProps() {
	return import_react$66.useContext(BaseSelectContext);
}
var import_react$66, BaseSelectContext;
var init_useBaseProps = __esmMin((() => {
	import_react$66 = /* @__PURE__ */ __toESM(require_react());
	BaseSelectContext = /* @__PURE__ */ import_react$66.createContext(null);
}));
function useDelayReset() {
	var timeout = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
	var _React$useState = import_react$65.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), bool = _React$useState2[0], setBool = _React$useState2[1];
	var delayRef = import_react$65.useRef(null);
	var cancelLatest = function cancelLatest$1() {
		window.clearTimeout(delayRef.current);
	};
	import_react$65.useEffect(function() {
		return cancelLatest;
	}, []);
	var delaySetBool = function delaySetBool$1(value, callback) {
		cancelLatest();
		delayRef.current = window.setTimeout(function() {
			setBool(value);
			if (callback) callback();
		}, timeout);
	};
	return [
		bool,
		delaySetBool,
		cancelLatest
	];
}
var import_react$65;
var init_useDelayReset = __esmMin((() => {
	init_slicedToArray();
	import_react$65 = /* @__PURE__ */ __toESM(require_react());
}));
function useLock() {
	var duration = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 250;
	var lockRef = import_react$64.useRef(null);
	var timeoutRef = import_react$64.useRef(null);
	import_react$64.useEffect(function() {
		return function() {
			window.clearTimeout(timeoutRef.current);
		};
	}, []);
	function doLock(locked) {
		if (locked || lockRef.current === null) lockRef.current = locked;
		window.clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(function() {
			lockRef.current = null;
		}, duration);
	}
	return [function() {
		return lockRef.current;
	}, doLock];
}
var import_react$64;
var init_useLock = __esmMin((() => {
	import_react$64 = /* @__PURE__ */ __toESM(require_react());
}));
function useSelectTriggerControl(elements, open, triggerOpen, customizedTrigger) {
	var propsRef = import_react$63.useRef(null);
	propsRef.current = {
		open,
		triggerOpen,
		customizedTrigger
	};
	import_react$63.useEffect(function() {
		function onGlobalMouseDown(event) {
			var _propsRef$current;
			if ((_propsRef$current = propsRef.current) !== null && _propsRef$current !== void 0 && _propsRef$current.customizedTrigger) return;
			var target = event.target;
			if (target.shadowRoot && event.composed) target = event.composedPath()[0] || target;
			if (propsRef.current.open && elements().filter(function(element) {
				return element;
			}).every(function(element) {
				return !element.contains(target) && element !== target;
			})) propsRef.current.triggerOpen(false);
		}
		window.addEventListener("mousedown", onGlobalMouseDown);
		return function() {
			return window.removeEventListener("mousedown", onGlobalMouseDown);
		};
	}, []);
}
var import_react$63;
var init_useSelectTriggerControl = __esmMin((() => {
	import_react$63 = /* @__PURE__ */ __toESM(require_react());
}));
function isValidateOpenKey(currentKeyCode) {
	return currentKeyCode && ![
		KeyCode_default.ESC,
		KeyCode_default.SHIFT,
		KeyCode_default.BACKSPACE,
		KeyCode_default.TAB,
		KeyCode_default.WIN_KEY,
		KeyCode_default.ALT,
		KeyCode_default.META,
		KeyCode_default.WIN_KEY_RIGHT,
		KeyCode_default.CTRL,
		KeyCode_default.SEMICOLON,
		KeyCode_default.EQUALS,
		KeyCode_default.CAPS_LOCK,
		KeyCode_default.CONTEXT_MENU,
		KeyCode_default.F1,
		KeyCode_default.F2,
		KeyCode_default.F3,
		KeyCode_default.F4,
		KeyCode_default.F5,
		KeyCode_default.F6,
		KeyCode_default.F7,
		KeyCode_default.F8,
		KeyCode_default.F9,
		KeyCode_default.F10,
		KeyCode_default.F11,
		KeyCode_default.F12
	].includes(currentKeyCode);
}
var init_keyUtil$1 = __esmMin((() => {
	init_KeyCode();
}));
var import_react$62, import_classnames$22, Input$1, RefInput, Input_default$1;
var init_Input$1 = __esmMin((() => {
	init_objectSpread2();
	import_react$62 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$22 = /* @__PURE__ */ __toESM(require_classnames());
	init_ref();
	init_warning();
	Input$1 = function Input$3(props, ref) {
		var _inputNode2;
		var prefixCls = props.prefixCls, id = props.id, inputElement = props.inputElement, disabled = props.disabled, tabIndex = props.tabIndex, autoFocus = props.autoFocus, autoComplete = props.autoComplete, editable = props.editable, activeDescendantId = props.activeDescendantId, value = props.value, maxLength = props.maxLength, _onKeyDown = props.onKeyDown, _onMouseDown = props.onMouseDown, _onChange = props.onChange, onPaste = props.onPaste, _onCompositionStart = props.onCompositionStart, _onCompositionEnd = props.onCompositionEnd, _onBlur = props.onBlur, open = props.open, attrs = props.attrs;
		var inputNode = inputElement || /* @__PURE__ */ import_react$62.createElement("input", null);
		var _inputNode = inputNode, originRef = _inputNode.ref, originProps = _inputNode.props;
		var onOriginKeyDown = originProps.onKeyDown, onOriginChange = originProps.onChange, onOriginMouseDown = originProps.onMouseDown, onOriginCompositionStart = originProps.onCompositionStart, onOriginCompositionEnd = originProps.onCompositionEnd, onOriginBlur = originProps.onBlur, style = originProps.style;
		warning(!("maxLength" in inputNode.props), "Passing 'maxLength' to input element directly may not work because input in BaseSelect is controlled.");
		inputNode = /* @__PURE__ */ import_react$62.cloneElement(inputNode, _objectSpread2(_objectSpread2(_objectSpread2({ type: "search" }, originProps), {}, {
			id,
			ref: composeRef(ref, originRef),
			disabled,
			tabIndex,
			autoComplete: autoComplete || "off",
			autoFocus,
			className: (0, import_classnames$22.default)("".concat(prefixCls, "-selection-search-input"), (_inputNode2 = inputNode) === null || _inputNode2 === void 0 || (_inputNode2 = _inputNode2.props) === null || _inputNode2 === void 0 ? void 0 : _inputNode2.className),
			role: "combobox",
			"aria-expanded": open || false,
			"aria-haspopup": "listbox",
			"aria-owns": "".concat(id, "_list"),
			"aria-autocomplete": "list",
			"aria-controls": "".concat(id, "_list"),
			"aria-activedescendant": open ? activeDescendantId : void 0
		}, attrs), {}, {
			value: editable ? value : "",
			maxLength,
			readOnly: !editable,
			unselectable: !editable ? "on" : null,
			style: _objectSpread2(_objectSpread2({}, style), {}, { opacity: editable ? null : 0 }),
			onKeyDown: function onKeyDown(event) {
				_onKeyDown(event);
				if (onOriginKeyDown) onOriginKeyDown(event);
			},
			onMouseDown: function onMouseDown(event) {
				_onMouseDown(event);
				if (onOriginMouseDown) onOriginMouseDown(event);
			},
			onChange: function onChange(event) {
				_onChange(event);
				if (onOriginChange) onOriginChange(event);
			},
			onCompositionStart: function onCompositionStart(event) {
				_onCompositionStart(event);
				if (onOriginCompositionStart) onOriginCompositionStart(event);
			},
			onCompositionEnd: function onCompositionEnd(event) {
				_onCompositionEnd(event);
				if (onOriginCompositionEnd) onOriginCompositionEnd(event);
			},
			onPaste,
			onBlur: function onBlur(event) {
				_onBlur(event);
				if (onOriginBlur) onOriginBlur(event);
			}
		}));
		return inputNode;
	};
	RefInput = /* @__PURE__ */ import_react$62.forwardRef(Input$1);
	Input_default$1 = RefInput;
}));
function toArray$3(value) {
	if (Array.isArray(value)) return value;
	return value !== void 0 ? [value] : [];
}
function hasValue(value) {
	return value !== void 0 && value !== null;
}
function isComboNoValue(value) {
	return !value && value !== 0;
}
function isTitleType$1(title) {
	return ["string", "number"].includes(_typeof(title));
}
function getTitle(item) {
	var title = void 0;
	if (item) {
		if (isTitleType$1(item.title)) title = item.title.toString();
		else if (isTitleType$1(item.label)) title = item.label.toString();
	}
	return title;
}
var isClient, isBrowserClient$2;
var init_commonUtil = __esmMin((() => {
	init_typeof();
	isClient = typeof window !== "undefined" && window.document && window.document.documentElement;
	isBrowserClient$2 = isClient;
}));
function useLayoutEffect(effect, deps) {
	if (isBrowserClient$2)
 /* istanbul ignore next */
	import_react$61.useLayoutEffect(effect, deps);
	else import_react$61.useEffect(effect, deps);
}
var import_react$61;
var init_useLayoutEffect = __esmMin((() => {
	import_react$61 = /* @__PURE__ */ __toESM(require_react());
	init_commonUtil();
}));
function itemKey$1(value) {
	var _value$key;
	return (_value$key = value.key) !== null && _value$key !== void 0 ? _value$key : value.value;
}
var import_react$59, import_react$60, import_classnames$21, onPreventMouseDown, SelectSelector, MultipleSelector_default;
var init_MultipleSelector = __esmMin((() => {
	init_defineProperty();
	init_slicedToArray();
	import_react$59 = /* @__PURE__ */ __toESM(require_react());
	import_react$60 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$21 = /* @__PURE__ */ __toESM(require_classnames());
	init_pickAttrs();
	init_es$19();
	init_TransBtn();
	init_Input$1();
	init_useLayoutEffect();
	init_commonUtil();
	onPreventMouseDown = function onPreventMouseDown$2(event) {
		event.preventDefault();
		event.stopPropagation();
	};
	SelectSelector = function SelectSelector$2(props) {
		var id = props.id, prefixCls = props.prefixCls, values = props.values, open = props.open, searchValue = props.searchValue, autoClearSearchValue = props.autoClearSearchValue, inputRef = props.inputRef, placeholder = props.placeholder, disabled = props.disabled, mode = props.mode, showSearch = props.showSearch, autoFocus = props.autoFocus, autoComplete = props.autoComplete, activeDescendantId = props.activeDescendantId, tabIndex = props.tabIndex, removeIcon = props.removeIcon, maxTagCount = props.maxTagCount, maxTagTextLength = props.maxTagTextLength, _props$maxTagPlacehol = props.maxTagPlaceholder, maxTagPlaceholder = _props$maxTagPlacehol === void 0 ? function(omittedValues) {
			return "+ ".concat(omittedValues.length, " ...");
		} : _props$maxTagPlacehol, tagRender = props.tagRender, onToggleOpen = props.onToggleOpen, onRemove = props.onRemove, onInputChange = props.onInputChange, onInputPaste = props.onInputPaste, onInputKeyDown = props.onInputKeyDown, onInputMouseDown = props.onInputMouseDown, onInputCompositionStart = props.onInputCompositionStart, onInputCompositionEnd = props.onInputCompositionEnd, onInputBlur = props.onInputBlur;
		var measureRef = import_react$59.useRef(null);
		var _useState = (0, import_react$60.useState)(0), _useState2 = _slicedToArray(_useState, 2), inputWidth = _useState2[0], setInputWidth = _useState2[1];
		var _useState3 = (0, import_react$60.useState)(false), _useState4 = _slicedToArray(_useState3, 2), focused = _useState4[0], setFocused = _useState4[1];
		var selectionPrefixCls = "".concat(prefixCls, "-selection");
		var inputValue = open || mode === "multiple" && autoClearSearchValue === false || mode === "tags" ? searchValue : "";
		var inputEditable = mode === "tags" || mode === "multiple" && autoClearSearchValue === false || showSearch && (open || focused);
		useLayoutEffect(function() {
			setInputWidth(measureRef.current.scrollWidth);
		}, [inputValue]);
		var defaultRenderSelector = function defaultRenderSelector$1(item, content, itemDisabled, closable, onClose) {
			return /* @__PURE__ */ import_react$59.createElement("span", {
				title: getTitle(item),
				className: (0, import_classnames$21.default)("".concat(selectionPrefixCls, "-item"), _defineProperty({}, "".concat(selectionPrefixCls, "-item-disabled"), itemDisabled))
			}, /* @__PURE__ */ import_react$59.createElement("span", { className: "".concat(selectionPrefixCls, "-item-content") }, content), closable && /* @__PURE__ */ import_react$59.createElement(TransBtn_default, {
				className: "".concat(selectionPrefixCls, "-item-remove"),
				onMouseDown: onPreventMouseDown,
				onClick: onClose,
				customizeIcon: removeIcon
			}, "×"));
		};
		var customizeRenderSelector = function customizeRenderSelector$1(value, content, itemDisabled, closable, onClose, isMaxTag) {
			var onMouseDown = function onMouseDown$1(e) {
				onPreventMouseDown(e);
				onToggleOpen(!open);
			};
			return /* @__PURE__ */ import_react$59.createElement("span", { onMouseDown }, tagRender({
				label: content,
				value,
				disabled: itemDisabled,
				closable,
				onClose,
				isMaxTag: !!isMaxTag
			}));
		};
		var renderItem = function renderItem$1(valueItem) {
			var itemDisabled = valueItem.disabled, label = valueItem.label, value = valueItem.value;
			var closable = !disabled && !itemDisabled;
			var displayLabel = label;
			if (typeof maxTagTextLength === "number") {
				if (typeof label === "string" || typeof label === "number") {
					var strLabel = String(displayLabel);
					if (strLabel.length > maxTagTextLength) displayLabel = "".concat(strLabel.slice(0, maxTagTextLength), "...");
				}
			}
			var onClose = function onClose$1(event) {
				if (event) event.stopPropagation();
				onRemove(valueItem);
			};
			return typeof tagRender === "function" ? customizeRenderSelector(value, displayLabel, itemDisabled, closable, onClose) : defaultRenderSelector(valueItem, displayLabel, itemDisabled, closable, onClose);
		};
		var renderRest = function renderRest$1(omittedValues) {
			if (!values.length) return null;
			var content = typeof maxTagPlaceholder === "function" ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
			return typeof tagRender === "function" ? customizeRenderSelector(void 0, content, false, false, void 0, true) : defaultRenderSelector({ title: content }, content, false);
		};
		var inputNode = /* @__PURE__ */ import_react$59.createElement("div", {
			className: "".concat(selectionPrefixCls, "-search"),
			style: { width: inputWidth },
			onFocus: function onFocus() {
				setFocused(true);
			},
			onBlur: function onBlur() {
				setFocused(false);
			}
		}, /* @__PURE__ */ import_react$59.createElement(Input_default$1, {
			ref: inputRef,
			open,
			prefixCls,
			id,
			inputElement: null,
			disabled,
			autoFocus,
			autoComplete,
			editable: inputEditable,
			activeDescendantId,
			value: inputValue,
			onKeyDown: onInputKeyDown,
			onMouseDown: onInputMouseDown,
			onChange: onInputChange,
			onPaste: onInputPaste,
			onCompositionStart: onInputCompositionStart,
			onCompositionEnd: onInputCompositionEnd,
			onBlur: onInputBlur,
			tabIndex,
			attrs: pickAttrs(props, true)
		}), /* @__PURE__ */ import_react$59.createElement("span", {
			ref: measureRef,
			className: "".concat(selectionPrefixCls, "-search-mirror"),
			"aria-hidden": true
		}, inputValue, "\xA0"));
		var selectionNode = /* @__PURE__ */ import_react$59.createElement(es_default$14, {
			prefixCls: "".concat(selectionPrefixCls, "-overflow"),
			data: values,
			renderItem,
			renderRest,
			suffix: inputNode,
			itemKey: itemKey$1,
			maxCount: maxTagCount
		});
		return /* @__PURE__ */ import_react$59.createElement("span", { className: "".concat(selectionPrefixCls, "-wrap") }, selectionNode, !values.length && !inputValue && /* @__PURE__ */ import_react$59.createElement("span", { className: "".concat(selectionPrefixCls, "-placeholder") }, placeholder));
	};
	MultipleSelector_default = SelectSelector;
}));
var import_react$58, SingleSelector, SingleSelector_default;
var init_SingleSelector = __esmMin((() => {
	init_slicedToArray();
	import_react$58 = /* @__PURE__ */ __toESM(require_react());
	init_pickAttrs();
	init_Input$1();
	init_commonUtil();
	SingleSelector = function SingleSelector$2(props) {
		var inputElement = props.inputElement, prefixCls = props.prefixCls, id = props.id, inputRef = props.inputRef, disabled = props.disabled, autoFocus = props.autoFocus, autoComplete = props.autoComplete, activeDescendantId = props.activeDescendantId, mode = props.mode, open = props.open, values = props.values, placeholder = props.placeholder, tabIndex = props.tabIndex, showSearch = props.showSearch, searchValue = props.searchValue, activeValue = props.activeValue, maxLength = props.maxLength, onInputKeyDown = props.onInputKeyDown, onInputMouseDown = props.onInputMouseDown, onInputChange = props.onInputChange, onInputPaste = props.onInputPaste, onInputCompositionStart = props.onInputCompositionStart, onInputCompositionEnd = props.onInputCompositionEnd, onInputBlur = props.onInputBlur, title = props.title;
		var _React$useState = import_react$58.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), inputChanged = _React$useState2[0], setInputChanged = _React$useState2[1];
		var combobox = mode === "combobox";
		var inputEditable = combobox || showSearch;
		var item = values[0];
		var inputValue = searchValue || "";
		if (combobox && activeValue && !inputChanged) inputValue = activeValue;
		import_react$58.useEffect(function() {
			if (combobox) setInputChanged(false);
		}, [combobox, activeValue]);
		var hasTextInput = mode !== "combobox" && !open && !showSearch ? false : !!inputValue;
		var selectionTitle = title === void 0 ? getTitle(item) : title;
		var placeholderNode = import_react$58.useMemo(function() {
			if (item) return null;
			return /* @__PURE__ */ import_react$58.createElement("span", {
				className: "".concat(prefixCls, "-selection-placeholder"),
				style: hasTextInput ? { visibility: "hidden" } : void 0
			}, placeholder);
		}, [
			item,
			hasTextInput,
			placeholder,
			prefixCls
		]);
		return /* @__PURE__ */ import_react$58.createElement("span", { className: "".concat(prefixCls, "-selection-wrap") }, /* @__PURE__ */ import_react$58.createElement("span", { className: "".concat(prefixCls, "-selection-search") }, /* @__PURE__ */ import_react$58.createElement(Input_default$1, {
			ref: inputRef,
			prefixCls,
			id,
			open,
			inputElement,
			disabled,
			autoFocus,
			autoComplete,
			editable: inputEditable,
			activeDescendantId,
			value: inputValue,
			onKeyDown: onInputKeyDown,
			onMouseDown: onInputMouseDown,
			onChange: function onChange(e) {
				setInputChanged(true);
				onInputChange(e);
			},
			onPaste: onInputPaste,
			onCompositionStart: onInputCompositionStart,
			onCompositionEnd: onInputCompositionEnd,
			onBlur: onInputBlur,
			tabIndex,
			attrs: pickAttrs(props, true),
			maxLength: combobox ? maxLength : void 0
		})), !combobox && item ? /* @__PURE__ */ import_react$58.createElement("span", {
			className: "".concat(prefixCls, "-selection-item"),
			title: selectionTitle,
			style: hasTextInput ? { visibility: "hidden" } : void 0
		}, item.label) : null, placeholderNode);
	};
	SingleSelector_default = SingleSelector;
}));
var import_react$56, import_react$57, Selector, ForwardSelector, Selector_default;
var init_Selector = __esmMin((() => {
	init_extends();
	init_slicedToArray();
	init_KeyCode();
	import_react$56 = /* @__PURE__ */ __toESM(require_react());
	import_react$57 = /* @__PURE__ */ __toESM(require_react());
	init_useLock();
	init_keyUtil$1();
	init_MultipleSelector();
	init_SingleSelector();
	Selector = function Selector$2(props, ref) {
		var inputRef = (0, import_react$57.useRef)(null);
		var compositionStatusRef = (0, import_react$57.useRef)(false);
		var prefixCls = props.prefixCls, open = props.open, mode = props.mode, showSearch = props.showSearch, tokenWithEnter = props.tokenWithEnter, disabled = props.disabled, prefix = props.prefix, autoClearSearchValue = props.autoClearSearchValue, onSearch = props.onSearch, onSearchSubmit = props.onSearchSubmit, onToggleOpen = props.onToggleOpen, onInputKeyDown = props.onInputKeyDown, onInputBlur = props.onInputBlur, domRef = props.domRef;
		import_react$56.useImperativeHandle(ref, function() {
			return {
				focus: function focus(options) {
					inputRef.current.focus(options);
				},
				blur: function blur() {
					inputRef.current.blur();
				}
			};
		});
		var _useLock = useLock(0), _useLock2 = _slicedToArray(_useLock, 2), getInputMouseDown = _useLock2[0], setInputMouseDown = _useLock2[1];
		var onInternalInputKeyDown = function onInternalInputKeyDown$1(event) {
			var which = event.which;
			var isTextAreaElement = inputRef.current instanceof HTMLTextAreaElement;
			if (!isTextAreaElement && open && (which === KeyCode_default.UP || which === KeyCode_default.DOWN)) event.preventDefault();
			if (onInputKeyDown) onInputKeyDown(event);
			if (which === KeyCode_default.ENTER && mode === "tags" && !compositionStatusRef.current && !open) onSearchSubmit === null || onSearchSubmit === void 0 || onSearchSubmit(event.target.value);
			if (isTextAreaElement && !open && ~[
				KeyCode_default.UP,
				KeyCode_default.DOWN,
				KeyCode_default.LEFT,
				KeyCode_default.RIGHT
			].indexOf(which)) return;
			if (isValidateOpenKey(which)) onToggleOpen(true);
		};
		var onInternalInputMouseDown = function onInternalInputMouseDown$1() {
			setInputMouseDown(true);
		};
		var pastedTextRef = (0, import_react$57.useRef)(null);
		var triggerOnSearch = function triggerOnSearch$1(value) {
			if (onSearch(value, true, compositionStatusRef.current) !== false) onToggleOpen(true);
		};
		var onInputCompositionStart = function onInputCompositionStart$1() {
			compositionStatusRef.current = true;
		};
		var onInputCompositionEnd = function onInputCompositionEnd$1(e) {
			compositionStatusRef.current = false;
			if (mode !== "combobox") triggerOnSearch(e.target.value);
		};
		var onInputChange = function onInputChange$1(event) {
			var value = event.target.value;
			if (tokenWithEnter && pastedTextRef.current && /[\r\n]/.test(pastedTextRef.current)) {
				var replacedText = pastedTextRef.current.replace(/[\r\n]+$/, "").replace(/\r\n/g, " ").replace(/[\r\n]/g, " ");
				value = value.replace(replacedText, pastedTextRef.current);
			}
			pastedTextRef.current = null;
			triggerOnSearch(value);
		};
		var onInputPaste = function onInputPaste$1(e) {
			var clipboardData = e.clipboardData;
			var value = clipboardData === null || clipboardData === void 0 ? void 0 : clipboardData.getData("text");
			pastedTextRef.current = value || "";
		};
		var onClick = function onClick$1(_ref) {
			var target = _ref.target;
			if (target !== inputRef.current) {
				var isIE = document.body.style.msTouchAction !== void 0;
				if (isIE) setTimeout(function() {
					inputRef.current.focus();
				});
				else inputRef.current.focus();
			}
		};
		var onMouseDown = function onMouseDown$1(event) {
			var inputMouseDown = getInputMouseDown();
			if (event.target !== inputRef.current && !inputMouseDown && !(mode === "combobox" && disabled)) event.preventDefault();
			if (mode !== "combobox" && (!showSearch || !inputMouseDown) || !open) {
				if (open && autoClearSearchValue !== false) onSearch("", true, false);
				onToggleOpen();
			}
		};
		var sharedProps = {
			inputRef,
			onInputKeyDown: onInternalInputKeyDown,
			onInputMouseDown: onInternalInputMouseDown,
			onInputChange,
			onInputPaste,
			onInputCompositionStart,
			onInputCompositionEnd,
			onInputBlur
		};
		var selectNode = mode === "multiple" || mode === "tags" ? /* @__PURE__ */ import_react$56.createElement(MultipleSelector_default, _extends({}, props, sharedProps)) : /* @__PURE__ */ import_react$56.createElement(SingleSelector_default, _extends({}, props, sharedProps));
		return /* @__PURE__ */ import_react$56.createElement("div", {
			ref: domRef,
			className: "".concat(prefixCls, "-selector"),
			onClick,
			onMouseDown
		}, prefix && /* @__PURE__ */ import_react$56.createElement("div", { className: "".concat(prefixCls, "-prefix") }, prefix), selectNode);
	};
	ForwardSelector = /* @__PURE__ */ import_react$56.forwardRef(Selector);
	Selector_default = ForwardSelector;
}));
var import_classnames$20, import_react$55, _excluded$20, getBuiltInPlacements, SelectTrigger, RefSelectTrigger, SelectTrigger_default;
var init_SelectTrigger = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_objectWithoutProperties();
	init_es$24();
	import_classnames$20 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$55 = /* @__PURE__ */ __toESM(require_react());
	_excluded$20 = [
		"prefixCls",
		"disabled",
		"visible",
		"children",
		"popupElement",
		"animation",
		"transitionName",
		"dropdownStyle",
		"dropdownClassName",
		"direction",
		"placement",
		"builtinPlacements",
		"dropdownMatchSelectWidth",
		"dropdownRender",
		"dropdownAlign",
		"getPopupContainer",
		"empty",
		"getTriggerDOMNode",
		"onPopupVisibleChange",
		"onPopupMouseEnter"
	];
	getBuiltInPlacements = function getBuiltInPlacements$2(dropdownMatchSelectWidth) {
		var adjustX = dropdownMatchSelectWidth === true ? 0 : 1;
		return {
			bottomLeft: {
				points: ["tl", "bl"],
				offset: [0, 4],
				overflow: {
					adjustX,
					adjustY: 1
				},
				htmlRegion: "scroll"
			},
			bottomRight: {
				points: ["tr", "br"],
				offset: [0, 4],
				overflow: {
					adjustX,
					adjustY: 1
				},
				htmlRegion: "scroll"
			},
			topLeft: {
				points: ["bl", "tl"],
				offset: [0, -4],
				overflow: {
					adjustX,
					adjustY: 1
				},
				htmlRegion: "scroll"
			},
			topRight: {
				points: ["br", "tr"],
				offset: [0, -4],
				overflow: {
					adjustX,
					adjustY: 1
				},
				htmlRegion: "scroll"
			}
		};
	};
	SelectTrigger = function SelectTrigger$2(props, ref) {
		var prefixCls = props.prefixCls;
		props.disabled;
		var visible = props.visible, children = props.children, popupElement = props.popupElement, animation = props.animation, transitionName = props.transitionName, dropdownStyle = props.dropdownStyle, dropdownClassName = props.dropdownClassName, _props$direction = props.direction, direction = _props$direction === void 0 ? "ltr" : _props$direction, placement = props.placement, builtinPlacements = props.builtinPlacements, dropdownMatchSelectWidth = props.dropdownMatchSelectWidth, dropdownRender = props.dropdownRender, dropdownAlign = props.dropdownAlign, getPopupContainer = props.getPopupContainer, empty$1 = props.empty, getTriggerDOMNode = props.getTriggerDOMNode, onPopupVisibleChange = props.onPopupVisibleChange, onPopupMouseEnter = props.onPopupMouseEnter, restProps = _objectWithoutProperties(props, _excluded$20);
		var dropdownPrefixCls = "".concat(prefixCls, "-dropdown");
		var popupNode = popupElement;
		if (dropdownRender) popupNode = dropdownRender(popupElement);
		var mergedBuiltinPlacements = import_react$55.useMemo(function() {
			return builtinPlacements || getBuiltInPlacements(dropdownMatchSelectWidth);
		}, [builtinPlacements, dropdownMatchSelectWidth]);
		var mergedTransitionName = animation ? "".concat(dropdownPrefixCls, "-").concat(animation) : transitionName;
		var isNumberPopupWidth = typeof dropdownMatchSelectWidth === "number";
		var stretch = import_react$55.useMemo(function() {
			if (isNumberPopupWidth) return null;
			return dropdownMatchSelectWidth === false ? "minWidth" : "width";
		}, [dropdownMatchSelectWidth, isNumberPopupWidth]);
		var popupStyle = dropdownStyle;
		if (isNumberPopupWidth) popupStyle = _objectSpread2(_objectSpread2({}, popupStyle), {}, { width: dropdownMatchSelectWidth });
		var triggerPopupRef = import_react$55.useRef(null);
		import_react$55.useImperativeHandle(ref, function() {
			return { getPopupElement: function getPopupElement() {
				var _triggerPopupRef$curr;
				return (_triggerPopupRef$curr = triggerPopupRef.current) === null || _triggerPopupRef$curr === void 0 ? void 0 : _triggerPopupRef$curr.popupElement;
			} };
		});
		return /* @__PURE__ */ import_react$55.createElement(es_default$13, _extends({}, restProps, {
			showAction: onPopupVisibleChange ? ["click"] : [],
			hideAction: onPopupVisibleChange ? ["click"] : [],
			popupPlacement: placement || (direction === "rtl" ? "bottomRight" : "bottomLeft"),
			builtinPlacements: mergedBuiltinPlacements,
			prefixCls: dropdownPrefixCls,
			popupTransitionName: mergedTransitionName,
			popup: /* @__PURE__ */ import_react$55.createElement("div", { onMouseEnter: onPopupMouseEnter }, popupNode),
			ref: triggerPopupRef,
			stretch,
			popupAlign: dropdownAlign,
			popupVisible: visible,
			getPopupContainer,
			popupClassName: (0, import_classnames$20.default)(dropdownClassName, _defineProperty({}, "".concat(dropdownPrefixCls, "-empty"), empty$1)),
			popupStyle,
			getTriggerDOMNode,
			onPopupVisibleChange
		}), children);
	};
	RefSelectTrigger = /* @__PURE__ */ import_react$55.forwardRef(SelectTrigger);
	SelectTrigger_default = RefSelectTrigger;
}));
function getKey$1(data, index$1) {
	var key = data.key;
	var value;
	if ("value" in data) value = data.value;
	if (key !== null && key !== void 0) return key;
	if (value !== void 0) return value;
	return "rc-index-key-".concat(index$1);
}
function isValidCount(value) {
	return typeof value !== "undefined" && !Number.isNaN(value);
}
function fillFieldNames$2(fieldNames, childrenAsData) {
	var _ref = fieldNames || {}, label = _ref.label, value = _ref.value, options = _ref.options, groupLabel = _ref.groupLabel;
	var mergedLabel = label || (childrenAsData ? "children" : "label");
	return {
		label: mergedLabel,
		value: value || "value",
		options: options || "options",
		groupLabel: groupLabel || mergedLabel
	};
}
function flattenOptions(options) {
	var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, fieldNames = _ref2.fieldNames, childrenAsData = _ref2.childrenAsData;
	var flattenList = [];
	var _fillFieldNames = fillFieldNames$2(fieldNames, false), fieldLabel = _fillFieldNames.label, fieldValue = _fillFieldNames.value, fieldOptions = _fillFieldNames.options, groupLabel = _fillFieldNames.groupLabel;
	function dig(list, isGroupOption) {
		if (!Array.isArray(list)) return;
		list.forEach(function(data) {
			if (isGroupOption || !(fieldOptions in data)) {
				var value = data[fieldValue];
				flattenList.push({
					key: getKey$1(data, flattenList.length),
					groupOption: isGroupOption,
					data,
					label: data[fieldLabel],
					value
				});
			} else {
				var grpLabel = data[groupLabel];
				if (grpLabel === void 0 && childrenAsData) grpLabel = data.label;
				flattenList.push({
					key: getKey$1(data, flattenList.length),
					group: true,
					data,
					label: grpLabel
				});
				dig(data[fieldOptions], true);
			}
		});
	}
	dig(options, false);
	return flattenList;
}
function injectPropsWithOption(option) {
	var newOption = _objectSpread2({}, option);
	if (!("props" in newOption)) Object.defineProperty(newOption, "props", { get: function get() {
		warning_default(false, "Return type is option instead of Option instance. Please read value directly instead of reading from `props`.");
		return newOption;
	} });
	return newOption;
}
var getSeparatedContent;
var init_valueUtil$1 = __esmMin((() => {
	init_toConsumableArray();
	init_toArray();
	init_objectSpread2();
	init_warning();
	getSeparatedContent = function getSeparatedContent$2(text, tokens, end) {
		if (!tokens || !tokens.length) return null;
		var match = false;
		var separate = function separate$1(str, _ref3) {
			var _ref4 = _toArray(_ref3), token = _ref4[0], restTokens = _ref4.slice(1);
			if (!token) return [str];
			var list$1 = str.split(token);
			match = match || list$1.length > 1;
			return list$1.reduce(function(prevList, unitStr) {
				return [].concat(_toConsumableArray(prevList), _toConsumableArray(separate$1(unitStr, restTokens)));
			}, []).filter(Boolean);
		};
		var list = separate(text, tokens);
		if (match) return typeof end !== "undefined" ? list.slice(0, end) : list;
		else return null;
	};
}));
var import_react$54, SelectContext, SelectContext_default;
var init_SelectContext = __esmMin((() => {
	import_react$54 = /* @__PURE__ */ __toESM(require_react());
	SelectContext = /* @__PURE__ */ import_react$54.createContext(null);
	SelectContext_default = SelectContext;
}));
function Polite(props) {
	var visible = props.visible, values = props.values;
	if (!visible) return null;
	var MAX_COUNT = 50;
	return /* @__PURE__ */ import_react$53.createElement("span", {
		"aria-live": "polite",
		style: {
			width: 0,
			height: 0,
			position: "absolute",
			overflow: "hidden",
			opacity: 0
		}
	}, "".concat(values.slice(0, MAX_COUNT).map(function(_ref) {
		var label = _ref.label, value = _ref.value;
		return ["number", "string"].includes(_typeof(label)) ? label : value;
	}).join(", ")), values.length > MAX_COUNT ? ", ..." : null);
}
var import_react$53;
var init_Polite = __esmMin((() => {
	init_typeof();
	import_react$53 = /* @__PURE__ */ __toESM(require_react());
}));
var import_classnames$19, import_react$52, _excluded$19, DEFAULT_OMIT_PROPS, isMultiple, BaseSelect, BaseSelect_default;
var init_BaseSelect = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_toConsumableArray();
	init_slicedToArray();
	init_objectSpread2();
	init_objectWithoutProperties();
	import_classnames$19 = /* @__PURE__ */ __toESM(require_classnames());
	init_useLayoutEffect$2();
	init_useMergedState();
	init_isMobile();
	init_ref();
	import_react$52 = /* @__PURE__ */ __toESM(require_react());
	init_useAllowClear();
	init_useBaseProps();
	init_useDelayReset();
	init_useLock();
	init_useSelectTriggerControl();
	init_Selector();
	init_SelectTrigger();
	init_TransBtn();
	init_valueUtil$1();
	init_SelectContext();
	init_Polite();
	_excluded$19 = [
		"id",
		"prefixCls",
		"className",
		"showSearch",
		"tagRender",
		"direction",
		"omitDomProps",
		"displayValues",
		"onDisplayValuesChange",
		"emptyOptions",
		"notFoundContent",
		"onClear",
		"mode",
		"disabled",
		"loading",
		"getInputElement",
		"getRawInputElement",
		"open",
		"defaultOpen",
		"onDropdownVisibleChange",
		"activeValue",
		"onActiveValueChange",
		"activeDescendantId",
		"searchValue",
		"autoClearSearchValue",
		"onSearch",
		"onSearchSplit",
		"tokenSeparators",
		"allowClear",
		"prefix",
		"suffixIcon",
		"clearIcon",
		"OptionList",
		"animation",
		"transitionName",
		"dropdownStyle",
		"dropdownClassName",
		"dropdownMatchSelectWidth",
		"dropdownRender",
		"dropdownAlign",
		"placement",
		"builtinPlacements",
		"getPopupContainer",
		"showAction",
		"onFocus",
		"onBlur",
		"onKeyUp",
		"onKeyDown",
		"onMouseDown"
	];
	DEFAULT_OMIT_PROPS = [
		"value",
		"onChange",
		"removeIcon",
		"placeholder",
		"autoFocus",
		"maxTagCount",
		"maxTagTextLength",
		"maxTagPlaceholder",
		"choiceTransitionName",
		"onInputKeyDown",
		"onPopupScroll",
		"tabIndex"
	];
	isMultiple = function isMultiple$2(mode) {
		return mode === "tags" || mode === "multiple";
	};
	BaseSelect = /* @__PURE__ */ import_react$52.forwardRef(function(props, ref) {
		var _customizeRawInputEle;
		var id = props.id, prefixCls = props.prefixCls, className = props.className, showSearch = props.showSearch, tagRender = props.tagRender, direction = props.direction, omitDomProps = props.omitDomProps, displayValues = props.displayValues, onDisplayValuesChange = props.onDisplayValuesChange, emptyOptions = props.emptyOptions, _props$notFoundConten = props.notFoundContent, notFoundContent = _props$notFoundConten === void 0 ? "Not Found" : _props$notFoundConten, onClear = props.onClear, mode = props.mode, disabled = props.disabled, loading = props.loading, getInputElement = props.getInputElement, getRawInputElement = props.getRawInputElement, open = props.open, defaultOpen = props.defaultOpen, onDropdownVisibleChange = props.onDropdownVisibleChange, activeValue = props.activeValue, onActiveValueChange = props.onActiveValueChange, activeDescendantId = props.activeDescendantId, searchValue = props.searchValue, autoClearSearchValue = props.autoClearSearchValue, onSearch = props.onSearch, onSearchSplit = props.onSearchSplit, tokenSeparators = props.tokenSeparators, allowClear = props.allowClear, prefix = props.prefix, suffixIcon = props.suffixIcon, clearIcon = props.clearIcon, OptionList$3 = props.OptionList, animation = props.animation, transitionName = props.transitionName, dropdownStyle = props.dropdownStyle, dropdownClassName = props.dropdownClassName, dropdownMatchSelectWidth = props.dropdownMatchSelectWidth, dropdownRender = props.dropdownRender, dropdownAlign = props.dropdownAlign, placement = props.placement, builtinPlacements = props.builtinPlacements, getPopupContainer = props.getPopupContainer, _props$showAction = props.showAction, showAction = _props$showAction === void 0 ? [] : _props$showAction, onFocus = props.onFocus, onBlur = props.onBlur, onKeyUp = props.onKeyUp, onKeyDown = props.onKeyDown, onMouseDown = props.onMouseDown, restProps = _objectWithoutProperties(props, _excluded$19);
		var multiple = isMultiple(mode);
		var mergedShowSearch = (showSearch !== void 0 ? showSearch : multiple) || mode === "combobox";
		var domProps = _objectSpread2({}, restProps);
		DEFAULT_OMIT_PROPS.forEach(function(propName) {
			delete domProps[propName];
		});
		omitDomProps === null || omitDomProps === void 0 || omitDomProps.forEach(function(propName) {
			delete domProps[propName];
		});
		var _React$useState = import_react$52.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), mobile = _React$useState2[0], setMobile = _React$useState2[1];
		import_react$52.useEffect(function() {
			setMobile(isMobile_default());
		}, []);
		var containerRef = import_react$52.useRef(null);
		var selectorDomRef = import_react$52.useRef(null);
		var triggerRef = import_react$52.useRef(null);
		var selectorRef = import_react$52.useRef(null);
		var listRef = import_react$52.useRef(null);
		var blurRef = import_react$52.useRef(false);
		var _useDelayReset = useDelayReset(), _useDelayReset2 = _slicedToArray(_useDelayReset, 3), mockFocused = _useDelayReset2[0], setMockFocused = _useDelayReset2[1], cancelSetMockFocused = _useDelayReset2[2];
		import_react$52.useImperativeHandle(ref, function() {
			var _selectorRef$current, _selectorRef$current2;
			return {
				focus: (_selectorRef$current = selectorRef.current) === null || _selectorRef$current === void 0 ? void 0 : _selectorRef$current.focus,
				blur: (_selectorRef$current2 = selectorRef.current) === null || _selectorRef$current2 === void 0 ? void 0 : _selectorRef$current2.blur,
				scrollTo: function scrollTo(arg) {
					var _listRef$current;
					return (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollTo(arg);
				},
				nativeElement: containerRef.current || selectorDomRef.current
			};
		});
		var mergedSearchValue = import_react$52.useMemo(function() {
			var _displayValues$;
			if (mode !== "combobox") return searchValue;
			var val = (_displayValues$ = displayValues[0]) === null || _displayValues$ === void 0 ? void 0 : _displayValues$.value;
			return typeof val === "string" || typeof val === "number" ? String(val) : "";
		}, [
			searchValue,
			mode,
			displayValues
		]);
		var customizeInputElement = mode === "combobox" && typeof getInputElement === "function" && getInputElement() || null;
		var customizeRawInputElement = typeof getRawInputElement === "function" && getRawInputElement();
		var customizeRawInputRef = useComposeRef(selectorDomRef, customizeRawInputElement === null || customizeRawInputElement === void 0 || (_customizeRawInputEle = customizeRawInputElement.props) === null || _customizeRawInputEle === void 0 ? void 0 : _customizeRawInputEle.ref);
		var _React$useState3 = import_react$52.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), rendered = _React$useState4[0], setRendered = _React$useState4[1];
		useLayoutEffect_default(function() {
			setRendered(true);
		}, []);
		var _useMergedState = useMergedState(false, {
			defaultValue: defaultOpen,
			value: open
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), innerOpen = _useMergedState2[0], setInnerOpen = _useMergedState2[1];
		var mergedOpen = rendered ? innerOpen : false;
		var emptyListContent = !notFoundContent && emptyOptions;
		if (disabled || emptyListContent && mergedOpen && mode === "combobox") mergedOpen = false;
		var triggerOpen = emptyListContent ? false : mergedOpen;
		var onToggleOpen = import_react$52.useCallback(function(newOpen) {
			var nextOpen = newOpen !== void 0 ? newOpen : !mergedOpen;
			if (!disabled) {
				setInnerOpen(nextOpen);
				if (mergedOpen !== nextOpen) onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 || onDropdownVisibleChange(nextOpen);
			}
		}, [
			disabled,
			mergedOpen,
			setInnerOpen,
			onDropdownVisibleChange
		]);
		var tokenWithEnter = import_react$52.useMemo(function() {
			return (tokenSeparators || []).some(function(tokenSeparator) {
				return ["\n", "\r\n"].includes(tokenSeparator);
			});
		}, [tokenSeparators]);
		var _ref = import_react$52.useContext(SelectContext_default) || {}, maxCount = _ref.maxCount, rawValues = _ref.rawValues;
		var onInternalSearch = function onInternalSearch$1(searchText, fromTyping, isCompositing) {
			if (multiple && isValidCount(maxCount) && (rawValues === null || rawValues === void 0 ? void 0 : rawValues.size) >= maxCount) return;
			var ret = true;
			var newSearchText = searchText;
			onActiveValueChange === null || onActiveValueChange === void 0 || onActiveValueChange(null);
			var separatedList = getSeparatedContent(searchText, tokenSeparators, isValidCount(maxCount) ? maxCount - rawValues.size : void 0);
			var patchLabels = isCompositing ? null : separatedList;
			if (mode !== "combobox" && patchLabels) {
				newSearchText = "";
				onSearchSplit === null || onSearchSplit === void 0 || onSearchSplit(patchLabels);
				onToggleOpen(false);
				ret = false;
			}
			if (onSearch && mergedSearchValue !== newSearchText) onSearch(newSearchText, { source: fromTyping ? "typing" : "effect" });
			return ret;
		};
		var onInternalSearchSubmit = function onInternalSearchSubmit$1(searchText) {
			if (!searchText || !searchText.trim()) return;
			onSearch(searchText, { source: "submit" });
		};
		import_react$52.useEffect(function() {
			if (!mergedOpen && !multiple && mode !== "combobox") onInternalSearch("", false, false);
		}, [mergedOpen]);
		import_react$52.useEffect(function() {
			if (innerOpen && disabled) setInnerOpen(false);
			if (disabled && !blurRef.current) setMockFocused(false);
		}, [disabled]);
		var _useLock = useLock(), _useLock2 = _slicedToArray(_useLock, 2), getClearLock = _useLock2[0], setClearLock = _useLock2[1];
		var keyLockRef = import_react$52.useRef(false);
		var onInternalKeyDown = function onInternalKeyDown$1(event) {
			var clearLock = getClearLock();
			var key = event.key;
			var isEnterKey = key === "Enter";
			if (isEnterKey) {
				if (mode !== "combobox") event.preventDefault();
				if (!mergedOpen) onToggleOpen(true);
			}
			setClearLock(!!mergedSearchValue);
			if (key === "Backspace" && !clearLock && multiple && !mergedSearchValue && displayValues.length) {
				var cloneDisplayValues = _toConsumableArray(displayValues);
				var removedDisplayValue = null;
				for (var i = cloneDisplayValues.length - 1; i >= 0; i -= 1) {
					var current = cloneDisplayValues[i];
					if (!current.disabled) {
						cloneDisplayValues.splice(i, 1);
						removedDisplayValue = current;
						break;
					}
				}
				if (removedDisplayValue) onDisplayValuesChange(cloneDisplayValues, {
					type: "remove",
					values: [removedDisplayValue]
				});
			}
			for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) rest[_key - 1] = arguments[_key];
			if (mergedOpen && (!isEnterKey || !keyLockRef.current)) {
				var _listRef$current2;
				if (isEnterKey) keyLockRef.current = true;
				(_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 || _listRef$current2.onKeyDown.apply(_listRef$current2, [event].concat(rest));
			}
			onKeyDown === null || onKeyDown === void 0 || onKeyDown.apply(void 0, [event].concat(rest));
		};
		var onInternalKeyUp = function onInternalKeyUp$1(event) {
			for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) rest[_key2 - 1] = arguments[_key2];
			if (mergedOpen) {
				var _listRef$current3;
				(_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 || _listRef$current3.onKeyUp.apply(_listRef$current3, [event].concat(rest));
			}
			if (event.key === "Enter") keyLockRef.current = false;
			onKeyUp === null || onKeyUp === void 0 || onKeyUp.apply(void 0, [event].concat(rest));
		};
		var onSelectorRemove = function onSelectorRemove$1(val) {
			var newValues = displayValues.filter(function(i) {
				return i !== val;
			});
			onDisplayValuesChange(newValues, {
				type: "remove",
				values: [val]
			});
		};
		var onInputBlur = function onInputBlur$1() {
			keyLockRef.current = false;
		};
		var focusRef = import_react$52.useRef(false);
		var onContainerFocus = function onContainerFocus$1() {
			setMockFocused(true);
			if (!disabled) {
				if (onFocus && !focusRef.current) onFocus.apply(void 0, arguments);
				if (showAction.includes("focus")) onToggleOpen(true);
			}
			focusRef.current = true;
		};
		var onContainerBlur = function onContainerBlur$1() {
			blurRef.current = true;
			setMockFocused(false, function() {
				focusRef.current = false;
				blurRef.current = false;
				onToggleOpen(false);
			});
			if (disabled) return;
			if (mergedSearchValue) {
				if (mode === "tags") onSearch(mergedSearchValue, { source: "submit" });
				else if (mode === "multiple") onSearch("", { source: "blur" });
			}
			if (onBlur) onBlur.apply(void 0, arguments);
		};
		var activeTimeoutIds = [];
		import_react$52.useEffect(function() {
			return function() {
				activeTimeoutIds.forEach(function(timeoutId) {
					return clearTimeout(timeoutId);
				});
				activeTimeoutIds.splice(0, activeTimeoutIds.length);
			};
		}, []);
		var onInternalMouseDown = function onInternalMouseDown$1(event) {
			var _triggerRef$current;
			var target = event.target;
			var popupElement = (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.getPopupElement();
			if (popupElement && popupElement.contains(target)) {
				var timeoutId = setTimeout(function() {
					var index$1 = activeTimeoutIds.indexOf(timeoutId);
					if (index$1 !== -1) activeTimeoutIds.splice(index$1, 1);
					cancelSetMockFocused();
					if (!mobile && !popupElement.contains(document.activeElement)) {
						var _selectorRef$current3;
						(_selectorRef$current3 = selectorRef.current) === null || _selectorRef$current3 === void 0 || _selectorRef$current3.focus();
					}
				});
				activeTimeoutIds.push(timeoutId);
			}
			for (var _len3 = arguments.length, restArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) restArgs[_key3 - 1] = arguments[_key3];
			onMouseDown === null || onMouseDown === void 0 || onMouseDown.apply(void 0, [event].concat(restArgs));
		};
		var _React$useState5 = import_react$52.useState({}), _React$useState6 = _slicedToArray(_React$useState5, 2), forceUpdate = _React$useState6[1];
		function onPopupMouseEnter() {
			forceUpdate({});
		}
		var onTriggerVisibleChange;
		if (customizeRawInputElement) onTriggerVisibleChange = function onTriggerVisibleChange$1(newOpen) {
			onToggleOpen(newOpen);
		};
		useSelectTriggerControl(function() {
			var _triggerRef$current2;
			return [containerRef.current, (_triggerRef$current2 = triggerRef.current) === null || _triggerRef$current2 === void 0 ? void 0 : _triggerRef$current2.getPopupElement()];
		}, triggerOpen, onToggleOpen, !!customizeRawInputElement);
		var baseSelectContext = import_react$52.useMemo(function() {
			return _objectSpread2(_objectSpread2({}, props), {}, {
				notFoundContent,
				open: mergedOpen,
				triggerOpen,
				id,
				showSearch: mergedShowSearch,
				multiple,
				toggleOpen: onToggleOpen
			});
		}, [
			props,
			notFoundContent,
			triggerOpen,
			mergedOpen,
			id,
			mergedShowSearch,
			multiple,
			onToggleOpen
		]);
		var showSuffixIcon = !!suffixIcon || loading;
		var arrowNode;
		if (showSuffixIcon) arrowNode = /* @__PURE__ */ import_react$52.createElement(TransBtn_default, {
			className: (0, import_classnames$19.default)("".concat(prefixCls, "-arrow"), _defineProperty({}, "".concat(prefixCls, "-arrow-loading"), loading)),
			customizeIcon: suffixIcon,
			customizeIconProps: {
				loading,
				searchValue: mergedSearchValue,
				open: mergedOpen,
				focused: mockFocused,
				showSearch: mergedShowSearch
			}
		});
		var onClearMouseDown = function onClearMouseDown$1() {
			var _selectorRef$current4;
			onClear === null || onClear === void 0 || onClear();
			(_selectorRef$current4 = selectorRef.current) === null || _selectorRef$current4 === void 0 || _selectorRef$current4.focus();
			onDisplayValuesChange([], {
				type: "clear",
				values: displayValues
			});
			onInternalSearch("", false, false);
		};
		var _useAllowClear = useAllowClear(prefixCls, onClearMouseDown, displayValues, allowClear, clearIcon, disabled, mergedSearchValue, mode), mergedAllowClear = _useAllowClear.allowClear, clearNode = _useAllowClear.clearIcon;
		var optionList = /* @__PURE__ */ import_react$52.createElement(OptionList$3, { ref: listRef });
		var mergedClassName = (0, import_classnames$19.default)(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-focused"), mockFocused), "".concat(prefixCls, "-multiple"), multiple), "".concat(prefixCls, "-single"), !multiple), "".concat(prefixCls, "-allow-clear"), allowClear), "".concat(prefixCls, "-show-arrow"), showSuffixIcon), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-loading"), loading), "".concat(prefixCls, "-open"), mergedOpen), "".concat(prefixCls, "-customize-input"), customizeInputElement), "".concat(prefixCls, "-show-search"), mergedShowSearch));
		var selectorNode = /* @__PURE__ */ import_react$52.createElement(SelectTrigger_default, {
			ref: triggerRef,
			disabled,
			prefixCls,
			visible: triggerOpen,
			popupElement: optionList,
			animation,
			transitionName,
			dropdownStyle,
			dropdownClassName,
			direction,
			dropdownMatchSelectWidth,
			dropdownRender,
			dropdownAlign,
			placement,
			builtinPlacements,
			getPopupContainer,
			empty: emptyOptions,
			getTriggerDOMNode: function getTriggerDOMNode(node) {
				return selectorDomRef.current || node;
			},
			onPopupVisibleChange: onTriggerVisibleChange,
			onPopupMouseEnter
		}, customizeRawInputElement ? /* @__PURE__ */ import_react$52.cloneElement(customizeRawInputElement, { ref: customizeRawInputRef }) : /* @__PURE__ */ import_react$52.createElement(Selector_default, _extends({}, props, {
			domRef: selectorDomRef,
			prefixCls,
			inputElement: customizeInputElement,
			ref: selectorRef,
			id,
			prefix,
			showSearch: mergedShowSearch,
			autoClearSearchValue,
			mode,
			activeDescendantId,
			tagRender,
			values: displayValues,
			open: mergedOpen,
			onToggleOpen,
			activeValue,
			searchValue: mergedSearchValue,
			onSearch: onInternalSearch,
			onSearchSubmit: onInternalSearchSubmit,
			onRemove: onSelectorRemove,
			tokenWithEnter,
			onInputBlur
		})));
		var renderNode;
		if (customizeRawInputElement) renderNode = selectorNode;
		else renderNode = /* @__PURE__ */ import_react$52.createElement("div", _extends({ className: mergedClassName }, domProps, {
			ref: containerRef,
			onMouseDown: onInternalMouseDown,
			onKeyDown: onInternalKeyDown,
			onKeyUp: onInternalKeyUp,
			onFocus: onContainerFocus,
			onBlur: onContainerBlur
		}), /* @__PURE__ */ import_react$52.createElement(Polite, {
			visible: mockFocused && !mergedOpen,
			values: displayValues
		}), selectorNode, arrowNode, mergedAllowClear && clearNode);
		return /* @__PURE__ */ import_react$52.createElement(BaseSelectContext.Provider, { value: baseSelectContext }, renderNode);
	});
	BaseSelect_default = BaseSelect;
}));
var OptGroup, OptGroup_default;
var init_OptGroup = __esmMin((() => {
	OptGroup = function OptGroup$2() {
		return null;
	};
	OptGroup.isSelectOptGroup = true;
	OptGroup_default = OptGroup;
}));
var Option, Option_default;
var init_Option = __esmMin((() => {
	Option = function Option$2() {
		return null;
	};
	Option.isSelectOption = true;
	Option_default = Option;
}));
/* istanbul ignore file */
function isPlatformMac() {
	return /(mac\sos|macintosh)/i.test(navigator.appVersion);
}
var init_platformUtil = __esmMin((() => {}));
function isTitleType(content) {
	return typeof content === "string" || typeof content === "number";
}
var import_classnames$18, import_react$50, import_react$51, _excluded$18, OptionList$1, RefOptionList$1, OptionList_default$1;
var init_OptionList$1 = __esmMin((() => {
	init_defineProperty();
	init_objectWithoutProperties();
	init_extends();
	init_slicedToArray();
	init_toConsumableArray();
	import_classnames$18 = /* @__PURE__ */ __toESM(require_classnames());
	init_KeyCode();
	init_useMemo();
	init_omit();
	init_pickAttrs();
	init_es$14();
	import_react$50 = /* @__PURE__ */ __toESM(require_react());
	import_react$51 = /* @__PURE__ */ __toESM(require_react());
	init_SelectContext();
	init_TransBtn();
	init_useBaseProps();
	init_platformUtil();
	init_valueUtil$1();
	_excluded$18 = [
		"disabled",
		"title",
		"children",
		"style",
		"className"
	];
	OptionList$1 = function OptionList$3(_, ref) {
		var _useBaseProps = useBaseProps(), prefixCls = _useBaseProps.prefixCls, id = _useBaseProps.id, open = _useBaseProps.open, multiple = _useBaseProps.multiple, mode = _useBaseProps.mode, searchValue = _useBaseProps.searchValue, toggleOpen = _useBaseProps.toggleOpen, notFoundContent = _useBaseProps.notFoundContent, onPopupScroll = _useBaseProps.onPopupScroll;
		var _React$useContext = import_react$50.useContext(SelectContext_default), maxCount = _React$useContext.maxCount, flattenOptions$2 = _React$useContext.flattenOptions, onActiveValue = _React$useContext.onActiveValue, defaultActiveFirstOption = _React$useContext.defaultActiveFirstOption, onSelect = _React$useContext.onSelect, menuItemSelectedIcon = _React$useContext.menuItemSelectedIcon, rawValues = _React$useContext.rawValues, fieldNames = _React$useContext.fieldNames, virtual = _React$useContext.virtual, direction = _React$useContext.direction, listHeight = _React$useContext.listHeight, listItemHeight = _React$useContext.listItemHeight, optionRender = _React$useContext.optionRender;
		var itemPrefixCls = "".concat(prefixCls, "-item");
		var memoFlattenOptions = useMemo(function() {
			return flattenOptions$2;
		}, [open, flattenOptions$2], function(prev, next) {
			return next[0] && prev[1] !== next[1];
		});
		var listRef = import_react$50.useRef(null);
		var overMaxCount = import_react$50.useMemo(function() {
			return multiple && isValidCount(maxCount) && (rawValues === null || rawValues === void 0 ? void 0 : rawValues.size) >= maxCount;
		}, [
			multiple,
			maxCount,
			rawValues === null || rawValues === void 0 ? void 0 : rawValues.size
		]);
		var onListMouseDown = function onListMouseDown$1(event) {
			event.preventDefault();
		};
		var scrollIntoView = function scrollIntoView$1(args) {
			var _listRef$current;
			(_listRef$current = listRef.current) === null || _listRef$current === void 0 || _listRef$current.scrollTo(typeof args === "number" ? { index: args } : args);
		};
		var isSelected = import_react$50.useCallback(function(value) {
			if (mode === "combobox") return false;
			return rawValues.has(value);
		}, [
			mode,
			_toConsumableArray(rawValues).toString(),
			rawValues.size
		]);
		var getEnabledActiveIndex = function getEnabledActiveIndex$1(index$1) {
			var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
			var len = memoFlattenOptions.length;
			for (var i = 0; i < len; i += 1) {
				var current = (index$1 + i * offset + len) % len;
				var _ref = memoFlattenOptions[current] || {}, group = _ref.group, data = _ref.data;
				if (!group && !(data !== null && data !== void 0 && data.disabled) && (isSelected(data.value) || !overMaxCount)) return current;
			}
			return -1;
		};
		var _React$useState = import_react$50.useState(function() {
			return getEnabledActiveIndex(0);
		}), _React$useState2 = _slicedToArray(_React$useState, 2), activeIndex = _React$useState2[0], setActiveIndex = _React$useState2[1];
		var setActive = function setActive$1(index$1) {
			var fromKeyboard = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
			setActiveIndex(index$1);
			var info = { source: fromKeyboard ? "keyboard" : "mouse" };
			var flattenItem = memoFlattenOptions[index$1];
			if (!flattenItem) {
				onActiveValue(null, -1, info);
				return;
			}
			onActiveValue(flattenItem.value, index$1, info);
		};
		(0, import_react$51.useEffect)(function() {
			setActive(defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1);
		}, [memoFlattenOptions.length, searchValue]);
		var isAriaSelected = import_react$50.useCallback(function(value) {
			if (mode === "combobox") return String(value).toLowerCase() === searchValue.toLowerCase();
			return rawValues.has(value);
		}, [
			mode,
			searchValue,
			_toConsumableArray(rawValues).toString(),
			rawValues.size
		]);
		(0, import_react$51.useEffect)(function() {
			var timeoutId = setTimeout(function() {
				if (!multiple && open && rawValues.size === 1) {
					var value = Array.from(rawValues)[0];
					var index$1 = memoFlattenOptions.findIndex(function(_ref2) {
						var data = _ref2.data;
						return data.value === value;
					});
					if (index$1 !== -1) {
						setActive(index$1);
						scrollIntoView(index$1);
					}
				}
			});
			if (open) {
				var _listRef$current2;
				(_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 || _listRef$current2.scrollTo(void 0);
			}
			return function() {
				return clearTimeout(timeoutId);
			};
		}, [open, searchValue]);
		var onSelectValue = function onSelectValue$1(value) {
			if (value !== void 0) onSelect(value, { selected: !rawValues.has(value) });
			if (!multiple) toggleOpen(false);
		};
		import_react$50.useImperativeHandle(ref, function() {
			return {
				onKeyDown: function onKeyDown(event) {
					var which = event.which, ctrlKey = event.ctrlKey;
					switch (which) {
						case KeyCode_default.N:
						case KeyCode_default.P:
						case KeyCode_default.UP:
						case KeyCode_default.DOWN:
							var offset = 0;
							if (which === KeyCode_default.UP) offset = -1;
							else if (which === KeyCode_default.DOWN) offset = 1;
							else if (isPlatformMac() && ctrlKey) {
								if (which === KeyCode_default.N) offset = 1;
								else if (which === KeyCode_default.P) offset = -1;
							}
							if (offset !== 0) {
								var nextActiveIndex = getEnabledActiveIndex(activeIndex + offset, offset);
								scrollIntoView(nextActiveIndex);
								setActive(nextActiveIndex, true);
							}
							break;
						case KeyCode_default.TAB:
						case KeyCode_default.ENTER:
							var _item$data;
							var item = memoFlattenOptions[activeIndex];
							if (item && !(item !== null && item !== void 0 && (_item$data = item.data) !== null && _item$data !== void 0 && _item$data.disabled) && !overMaxCount) onSelectValue(item.value);
							else onSelectValue(void 0);
							if (open) event.preventDefault();
							break;
						case KeyCode_default.ESC:
							toggleOpen(false);
							if (open) event.stopPropagation();
					}
				},
				onKeyUp: function onKeyUp() {},
				scrollTo: function scrollTo(index$1) {
					scrollIntoView(index$1);
				}
			};
		});
		if (memoFlattenOptions.length === 0) return /* @__PURE__ */ import_react$50.createElement("div", {
			role: "listbox",
			id: "".concat(id, "_list"),
			className: "".concat(itemPrefixCls, "-empty"),
			onMouseDown: onListMouseDown
		}, notFoundContent);
		var omitFieldNameList = Object.keys(fieldNames).map(function(key) {
			return fieldNames[key];
		});
		var getLabel = function getLabel$1(item) {
			return item.label;
		};
		function getItemAriaProps(item, index$1) {
			var group = item.group;
			return {
				role: group ? "presentation" : "option",
				id: "".concat(id, "_list_").concat(index$1)
			};
		}
		var renderItem = function renderItem$1(index$1) {
			var item = memoFlattenOptions[index$1];
			if (!item) return null;
			var itemData = item.data || {};
			var value = itemData.value;
			var group = item.group;
			var attrs = pickAttrs(itemData, true);
			var mergedLabel = getLabel(item);
			return item ? /* @__PURE__ */ import_react$50.createElement("div", _extends({ "aria-label": typeof mergedLabel === "string" && !group ? mergedLabel : null }, attrs, { key: index$1 }, getItemAriaProps(item, index$1), { "aria-selected": isAriaSelected(value) }), value) : null;
		};
		var a11yProps = {
			role: "listbox",
			id: "".concat(id, "_list")
		};
		return /* @__PURE__ */ import_react$50.createElement(import_react$50.Fragment, null, virtual && /* @__PURE__ */ import_react$50.createElement("div", _extends({}, a11yProps, { style: {
			height: 0,
			width: 0,
			overflow: "hidden"
		} }), renderItem(activeIndex - 1), renderItem(activeIndex), renderItem(activeIndex + 1)), /* @__PURE__ */ import_react$50.createElement(es_default$3, {
			itemKey: "key",
			ref: listRef,
			data: memoFlattenOptions,
			height: listHeight,
			itemHeight: listItemHeight,
			fullHeight: false,
			onMouseDown: onListMouseDown,
			onScroll: onPopupScroll,
			virtual,
			direction,
			innerProps: virtual ? null : a11yProps
		}, function(item, itemIndex) {
			var group = item.group, groupOption = item.groupOption, data = item.data, label = item.label, value = item.value;
			var key = data.key;
			if (group) {
				var _data$title;
				var groupTitle = (_data$title = data.title) !== null && _data$title !== void 0 ? _data$title : isTitleType(label) ? label.toString() : void 0;
				return /* @__PURE__ */ import_react$50.createElement("div", {
					className: (0, import_classnames$18.default)(itemPrefixCls, "".concat(itemPrefixCls, "-group"), data.className),
					title: groupTitle
				}, label !== void 0 ? label : key);
			}
			var disabled = data.disabled, title = data.title;
			data.children;
			var style = data.style, className = data.className, otherProps = _objectWithoutProperties(data, _excluded$18);
			var passedProps = omit(otherProps, omitFieldNameList);
			var selected = isSelected(value);
			var mergedDisabled = disabled || !selected && overMaxCount;
			var optionPrefixCls = "".concat(itemPrefixCls, "-option");
			var optionClassName = (0, import_classnames$18.default)(itemPrefixCls, optionPrefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(optionPrefixCls, "-grouped"), groupOption), "".concat(optionPrefixCls, "-active"), activeIndex === itemIndex && !mergedDisabled), "".concat(optionPrefixCls, "-disabled"), mergedDisabled), "".concat(optionPrefixCls, "-selected"), selected));
			var mergedLabel = getLabel(item);
			var iconVisible = !menuItemSelectedIcon || typeof menuItemSelectedIcon === "function" || selected;
			var content = typeof mergedLabel === "number" ? mergedLabel : mergedLabel || value;
			var optionTitle = isTitleType(content) ? content.toString() : void 0;
			if (title !== void 0) optionTitle = title;
			return /* @__PURE__ */ import_react$50.createElement("div", _extends({}, pickAttrs(passedProps), !virtual ? getItemAriaProps(item, itemIndex) : {}, {
				"aria-selected": isAriaSelected(value),
				className: optionClassName,
				title: optionTitle,
				onMouseMove: function onMouseMove() {
					if (activeIndex === itemIndex || mergedDisabled) return;
					setActive(itemIndex);
				},
				onClick: function onClick() {
					if (!mergedDisabled) onSelectValue(value);
				},
				style
			}), /* @__PURE__ */ import_react$50.createElement("div", { className: "".concat(optionPrefixCls, "-content") }, typeof optionRender === "function" ? optionRender(item, { index: itemIndex }) : content), /* @__PURE__ */ import_react$50.isValidElement(menuItemSelectedIcon) || selected, iconVisible && /* @__PURE__ */ import_react$50.createElement(TransBtn_default, {
				className: "".concat(itemPrefixCls, "-option-state"),
				customizeIcon: menuItemSelectedIcon,
				customizeIconProps: {
					value,
					disabled: mergedDisabled,
					isSelected: selected
				}
			}, selected ? "✓" : null));
		}));
	};
	RefOptionList$1 = /* @__PURE__ */ import_react$50.forwardRef(OptionList$1);
	OptionList_default$1 = RefOptionList$1;
}));
var import_react$49, useCache_default$1;
var init_useCache$1 = __esmMin((() => {
	init_objectSpread2();
	import_react$49 = /* @__PURE__ */ __toESM(require_react());
	useCache_default$1 = (function(labeledValues, valueOptions) {
		var cacheRef = import_react$49.useRef({
			values: /* @__PURE__ */ new Map(),
			options: /* @__PURE__ */ new Map()
		});
		var filledLabeledValues = import_react$49.useMemo(function() {
			var _cacheRef$current = cacheRef.current, prevValueCache = _cacheRef$current.values, prevOptionCache = _cacheRef$current.options;
			var patchedValues = labeledValues.map(function(item) {
				if (item.label === void 0) {
					var _prevValueCache$get;
					return _objectSpread2(_objectSpread2({}, item), {}, { label: (_prevValueCache$get = prevValueCache.get(item.value)) === null || _prevValueCache$get === void 0 ? void 0 : _prevValueCache$get.label });
				}
				return item;
			});
			var valueCache = /* @__PURE__ */ new Map();
			var optionCache = /* @__PURE__ */ new Map();
			patchedValues.forEach(function(item) {
				valueCache.set(item.value, item);
				optionCache.set(item.value, valueOptions.get(item.value) || prevOptionCache.get(item.value));
			});
			cacheRef.current.values = valueCache;
			cacheRef.current.options = optionCache;
			return patchedValues;
		}, [labeledValues, valueOptions]);
		var getOption = import_react$49.useCallback(function(val) {
			return valueOptions.get(val) || cacheRef.current.options.get(val);
		}, [valueOptions]);
		return [filledLabeledValues, getOption];
	});
}));
function includes(test, search) {
	return toArray$3(test).join("").toUpperCase().includes(search);
}
var import_react$48, useFilterOptions_default;
var init_useFilterOptions = __esmMin((() => {
	init_defineProperty();
	init_objectSpread2();
	import_react$48 = /* @__PURE__ */ __toESM(require_react());
	init_commonUtil();
	init_valueUtil$1();
	useFilterOptions_default = (function(options, fieldNames, searchValue, filterOption, optionFilterProp) {
		return import_react$48.useMemo(function() {
			if (!searchValue || filterOption === false) return options;
			var fieldOptions = fieldNames.options, fieldLabel = fieldNames.label, fieldValue = fieldNames.value;
			var filteredOptions = [];
			var customizeFilter = typeof filterOption === "function";
			var upperSearch = searchValue.toUpperCase();
			var filterFunc = customizeFilter ? filterOption : function(_, option) {
				if (optionFilterProp) return includes(option[optionFilterProp], upperSearch);
				if (option[fieldOptions]) return includes(option[fieldLabel !== "children" ? fieldLabel : "label"], upperSearch);
				return includes(option[fieldValue], upperSearch);
			};
			var wrapOption = customizeFilter ? function(opt) {
				return injectPropsWithOption(opt);
			} : function(opt) {
				return opt;
			};
			options.forEach(function(item) {
				if (item[fieldOptions]) {
					var matchGroup = filterFunc(searchValue, wrapOption(item));
					if (matchGroup) filteredOptions.push(item);
					else {
						var subOptions = item[fieldOptions].filter(function(subItem) {
							return filterFunc(searchValue, wrapOption(subItem));
						});
						if (subOptions.length) filteredOptions.push(_objectSpread2(_objectSpread2({}, item), {}, _defineProperty({}, fieldOptions, subOptions)));
					}
					return;
				}
				if (filterFunc(searchValue, wrapOption(item))) filteredOptions.push(item);
			});
			return filteredOptions;
		}, [
			options,
			filterOption,
			optionFilterProp,
			searchValue,
			fieldNames
		]);
	});
}));
function getUUID$1() {
	var retId;
	/* istanbul ignore if */
	if (isBrowserClient$1) {
		retId = uuid$1;
		uuid$1 += 1;
	} else retId = "TEST_OR_SSR";
	return retId;
}
function useId(id) {
	var _React$useState = import_react$47.useState(), _React$useState2 = _slicedToArray(_React$useState, 2), innerId = _React$useState2[0], setInnerId = _React$useState2[1];
	import_react$47.useEffect(function() {
		setInnerId("rc_select_".concat(getUUID$1()));
	}, []);
	return id || innerId;
}
var import_react$47, uuid$1, isBrowserClient$1;
var init_useId$1 = __esmMin((() => {
	init_slicedToArray();
	import_react$47 = /* @__PURE__ */ __toESM(require_react());
	init_canUseDom();
	uuid$1 = 0;
	isBrowserClient$1 = canUseDom();
}));
function convertNodeToOption(node) {
	var _ref = node, key = _ref.key, _ref$props = _ref.props, children = _ref$props.children, value = _ref$props.value, restProps = _objectWithoutProperties(_ref$props, _excluded$17);
	return _objectSpread2({
		key,
		value: value !== void 0 ? value : key,
		children
	}, restProps);
}
function convertChildrenToData$1(nodes) {
	var optionOnly = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
	return toArray$1(nodes).map(function(node, index$1) {
		if (!/* @__PURE__ */ import_react$46.isValidElement(node) || !node.type) return null;
		var _ref2 = node, isSelectOptGroup = _ref2.type.isSelectOptGroup, key = _ref2.key, _ref2$props = _ref2.props, children = _ref2$props.children, restProps = _objectWithoutProperties(_ref2$props, _excluded2);
		if (optionOnly || !isSelectOptGroup) return convertNodeToOption(node);
		return _objectSpread2(_objectSpread2({
			key: "__RC_SELECT_GRP__".concat(key === null ? index$1 : key, "__"),
			label: key
		}, restProps), {}, { options: convertChildrenToData$1(children) });
	}).filter(function(data) {
		return data;
	});
}
var import_react$46, _excluded$17, _excluded2;
var init_legacyUtil$1 = __esmMin((() => {
	init_objectSpread2();
	init_objectWithoutProperties();
	import_react$46 = /* @__PURE__ */ __toESM(require_react());
	init_toArray$1();
	_excluded$17 = ["children", "value"], _excluded2 = ["children"];
}));
var import_react$45, useOptions, useOptions_default;
var init_useOptions = __esmMin((() => {
	import_react$45 = /* @__PURE__ */ __toESM(require_react());
	init_legacyUtil$1();
	useOptions = function useOptions$2(options, children, fieldNames, optionFilterProp, optionLabelProp) {
		return import_react$45.useMemo(function() {
			var mergedOptions = options;
			var childrenAsData = !options;
			if (childrenAsData) mergedOptions = convertChildrenToData$1(children);
			var valueOptions = /* @__PURE__ */ new Map();
			var labelOptions = /* @__PURE__ */ new Map();
			var setLabelOptions = function setLabelOptions$1(labelOptionsMap, option, key) {
				if (key && typeof key === "string") labelOptionsMap.set(option[key], option);
			};
			var dig = function dig$1(optionList) {
				var isChildren = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
				for (var i = 0; i < optionList.length; i += 1) {
					var option = optionList[i];
					if (!option[fieldNames.options] || isChildren) {
						valueOptions.set(option[fieldNames.value], option);
						setLabelOptions(labelOptions, option, fieldNames.label);
						setLabelOptions(labelOptions, option, optionFilterProp);
						setLabelOptions(labelOptions, option, optionLabelProp);
					} else dig$1(option[fieldNames.options], true);
				}
			};
			dig(mergedOptions);
			return {
				options: mergedOptions,
				valueOptions,
				labelOptions
			};
		}, [
			options,
			children,
			fieldNames,
			optionFilterProp,
			optionLabelProp
		]);
	};
	useOptions_default = useOptions;
}));
function useRefFunc$1(callback) {
	var funcRef = import_react$44.useRef();
	funcRef.current = callback;
	var cacheFn = import_react$44.useCallback(function() {
		return funcRef.current.apply(funcRef, arguments);
	}, []);
	return cacheFn;
}
var import_react$44;
var init_useRefFunc$1 = __esmMin((() => {
	import_react$44 = /* @__PURE__ */ __toESM(require_react());
}));
var import_react$43;
var init_warningPropsUtil$1 = __esmMin((() => {
	init_toArray$1();
	init_warning();
	import_react$43 = /* @__PURE__ */ __toESM(require_react());
	init_BaseSelect();
	init_commonUtil();
	init_legacyUtil$1();
}));
function isRawValue$1(value) {
	return !value || _typeof(value) !== "object";
}
var import_react$42, _excluded$16, OMIT_DOM_PROPS, Select, TypedSelect;
var init_Select = __esmMin((() => {
	init_extends();
	init_toConsumableArray();
	init_defineProperty();
	init_objectSpread2();
	init_slicedToArray();
	init_objectWithoutProperties();
	init_typeof();
	init_useMergedState();
	init_warning();
	import_react$42 = /* @__PURE__ */ __toESM(require_react());
	init_BaseSelect();
	init_OptGroup();
	init_Option();
	init_OptionList$1();
	init_SelectContext();
	init_useCache$1();
	init_useFilterOptions();
	init_useId$1();
	init_useOptions();
	init_useRefFunc$1();
	init_commonUtil();
	init_valueUtil$1();
	init_warningPropsUtil$1();
	_excluded$16 = [
		"id",
		"mode",
		"prefixCls",
		"backfill",
		"fieldNames",
		"inputValue",
		"searchValue",
		"onSearch",
		"autoClearSearchValue",
		"onSelect",
		"onDeselect",
		"dropdownMatchSelectWidth",
		"filterOption",
		"filterSort",
		"optionFilterProp",
		"optionLabelProp",
		"options",
		"optionRender",
		"children",
		"defaultActiveFirstOption",
		"menuItemSelectedIcon",
		"virtual",
		"direction",
		"listHeight",
		"listItemHeight",
		"labelRender",
		"value",
		"defaultValue",
		"labelInValue",
		"onChange",
		"maxCount"
	];
	OMIT_DOM_PROPS = ["inputValue"];
	Select = /* @__PURE__ */ import_react$42.forwardRef(function(props, ref) {
		var id = props.id, mode = props.mode, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-select" : _props$prefixCls, backfill = props.backfill, fieldNames = props.fieldNames, inputValue = props.inputValue, searchValue = props.searchValue, onSearch = props.onSearch, _props$autoClearSearc = props.autoClearSearchValue, autoClearSearchValue = _props$autoClearSearc === void 0 ? true : _props$autoClearSearc, onSelect = props.onSelect, onDeselect = props.onDeselect, _props$dropdownMatchS = props.dropdownMatchSelectWidth, dropdownMatchSelectWidth = _props$dropdownMatchS === void 0 ? true : _props$dropdownMatchS, filterOption = props.filterOption, filterSort = props.filterSort, optionFilterProp = props.optionFilterProp, optionLabelProp = props.optionLabelProp, options = props.options, optionRender = props.optionRender, children = props.children, defaultActiveFirstOption = props.defaultActiveFirstOption, menuItemSelectedIcon = props.menuItemSelectedIcon, virtual = props.virtual, direction = props.direction, _props$listHeight = props.listHeight, listHeight = _props$listHeight === void 0 ? 200 : _props$listHeight, _props$listItemHeight = props.listItemHeight, listItemHeight = _props$listItemHeight === void 0 ? 20 : _props$listItemHeight, labelRender = props.labelRender, value = props.value, defaultValue = props.defaultValue, labelInValue = props.labelInValue, onChange = props.onChange, maxCount = props.maxCount, restProps = _objectWithoutProperties(props, _excluded$16);
		var mergedId = useId(id);
		var multiple = isMultiple(mode);
		var childrenAsData = !!(!options && children);
		var mergedFilterOption = import_react$42.useMemo(function() {
			if (filterOption === void 0 && mode === "combobox") return false;
			return filterOption;
		}, [filterOption, mode]);
		var mergedFieldNames = import_react$42.useMemo(function() {
			return fillFieldNames$2(fieldNames, childrenAsData);
		}, [JSON.stringify(fieldNames), childrenAsData]);
		var _useMergedState = useMergedState("", {
			value: searchValue !== void 0 ? searchValue : inputValue,
			postState: function postState(search) {
				return search || "";
			}
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedSearchValue = _useMergedState2[0], setSearchValue = _useMergedState2[1];
		var parsedOptions = useOptions_default(options, children, mergedFieldNames, optionFilterProp, optionLabelProp);
		var valueOptions = parsedOptions.valueOptions, labelOptions = parsedOptions.labelOptions, mergedOptions = parsedOptions.options;
		var convert2LabelValues = import_react$42.useCallback(function(draftValues) {
			var valueList = toArray$3(draftValues);
			return valueList.map(function(val) {
				var rawValue;
				var rawLabel;
				var rawKey;
				var rawDisabled;
				var rawTitle;
				if (isRawValue$1(val)) rawValue = val;
				else {
					var _val$value;
					rawKey = val.key;
					rawLabel = val.label;
					rawValue = (_val$value = val.value) !== null && _val$value !== void 0 ? _val$value : rawKey;
				}
				var option = valueOptions.get(rawValue);
				if (option) {
					var _option$key;
					if (rawLabel === void 0) rawLabel = option === null || option === void 0 ? void 0 : option[optionLabelProp || mergedFieldNames.label];
					if (rawKey === void 0) rawKey = (_option$key = option === null || option === void 0 ? void 0 : option.key) !== null && _option$key !== void 0 ? _option$key : rawValue;
					rawDisabled = option === null || option === void 0 ? void 0 : option.disabled;
					rawTitle = option === null || option === void 0 ? void 0 : option.title;
					if (0) var optionLabel;
				}
				return {
					label: rawLabel,
					value: rawValue,
					key: rawKey,
					disabled: rawDisabled,
					title: rawTitle
				};
			});
		}, [
			mergedFieldNames,
			optionLabelProp,
			valueOptions
		]);
		var _useMergedState3 = useMergedState(defaultValue, { value }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), internalValue = _useMergedState4[0], setInternalValue = _useMergedState4[1];
		var rawLabeledValues = import_react$42.useMemo(function() {
			var _values$;
			var newInternalValue = multiple && internalValue === null ? [] : internalValue;
			var values = convert2LabelValues(newInternalValue);
			if (mode === "combobox" && isComboNoValue((_values$ = values[0]) === null || _values$ === void 0 ? void 0 : _values$.value)) return [];
			return values;
		}, [
			internalValue,
			convert2LabelValues,
			mode,
			multiple
		]);
		var _useCache = useCache_default$1(rawLabeledValues, valueOptions), _useCache2 = _slicedToArray(_useCache, 2), mergedValues = _useCache2[0], getMixedOption = _useCache2[1];
		var displayValues = import_react$42.useMemo(function() {
			if (!mode && mergedValues.length === 1) {
				var firstValue = mergedValues[0];
				if (firstValue.value === null && (firstValue.label === null || firstValue.label === void 0)) return [];
			}
			return mergedValues.map(function(item) {
				var _ref;
				return _objectSpread2(_objectSpread2({}, item), {}, { label: (_ref = typeof labelRender === "function" ? labelRender(item) : item.label) !== null && _ref !== void 0 ? _ref : item.value });
			});
		}, [
			mode,
			mergedValues,
			labelRender
		]);
		var rawValues = import_react$42.useMemo(function() {
			return new Set(mergedValues.map(function(val) {
				return val.value;
			}));
		}, [mergedValues]);
		import_react$42.useEffect(function() {
			if (mode === "combobox") {
				var _mergedValues$;
				var strValue = (_mergedValues$ = mergedValues[0]) === null || _mergedValues$ === void 0 ? void 0 : _mergedValues$.value;
				setSearchValue(hasValue(strValue) ? String(strValue) : "");
			}
		}, [mergedValues]);
		var createTagOption = useRefFunc$1(function(val, label) {
			var mergedLabel = label !== null && label !== void 0 ? label : val;
			return _defineProperty(_defineProperty({}, mergedFieldNames.value, val), mergedFieldNames.label, mergedLabel);
		});
		var filledTagOptions = import_react$42.useMemo(function() {
			if (mode !== "tags") return mergedOptions;
			var cloneOptions = _toConsumableArray(mergedOptions);
			var existOptions = function existOptions$1(val) {
				return valueOptions.has(val);
			};
			_toConsumableArray(mergedValues).sort(function(a, b) {
				return a.value < b.value ? -1 : 1;
			}).forEach(function(item) {
				var val = item.value;
				if (!existOptions(val)) cloneOptions.push(createTagOption(val, item.label));
			});
			return cloneOptions;
		}, [
			createTagOption,
			mergedOptions,
			valueOptions,
			mergedValues,
			mode
		]);
		var filteredOptions = useFilterOptions_default(filledTagOptions, mergedFieldNames, mergedSearchValue, mergedFilterOption, optionFilterProp);
		var filledSearchOptions = import_react$42.useMemo(function() {
			if (mode !== "tags" || !mergedSearchValue || filteredOptions.some(function(item) {
				return item[optionFilterProp || "value"] === mergedSearchValue;
			})) return filteredOptions;
			if (filteredOptions.some(function(item) {
				return item[mergedFieldNames.value] === mergedSearchValue;
			})) return filteredOptions;
			return [createTagOption(mergedSearchValue)].concat(_toConsumableArray(filteredOptions));
		}, [
			createTagOption,
			optionFilterProp,
			mode,
			filteredOptions,
			mergedSearchValue,
			mergedFieldNames
		]);
		var sorter = function sorter$1(inputOptions) {
			var sortedOptions = _toConsumableArray(inputOptions).sort(function(a, b) {
				return filterSort(a, b, { searchValue: mergedSearchValue });
			});
			return sortedOptions.map(function(item) {
				if (Array.isArray(item.options)) return _objectSpread2(_objectSpread2({}, item), {}, { options: item.options.length > 0 ? sorter$1(item.options) : item.options });
				return item;
			});
		};
		var orderedFilteredOptions = import_react$42.useMemo(function() {
			if (!filterSort) return filledSearchOptions;
			return sorter(filledSearchOptions);
		}, [
			filledSearchOptions,
			filterSort,
			mergedSearchValue
		]);
		var displayOptions = import_react$42.useMemo(function() {
			return flattenOptions(orderedFilteredOptions, {
				fieldNames: mergedFieldNames,
				childrenAsData
			});
		}, [
			orderedFilteredOptions,
			mergedFieldNames,
			childrenAsData
		]);
		var triggerChange = function triggerChange$1(values) {
			var labeledValues = convert2LabelValues(values);
			setInternalValue(labeledValues);
			if (onChange && (labeledValues.length !== mergedValues.length || labeledValues.some(function(newVal, index$1) {
				var _mergedValues$index;
				return ((_mergedValues$index = mergedValues[index$1]) === null || _mergedValues$index === void 0 ? void 0 : _mergedValues$index.value) !== (newVal === null || newVal === void 0 ? void 0 : newVal.value);
			}))) {
				var returnValues = labelInValue ? labeledValues : labeledValues.map(function(v) {
					return v.value;
				});
				var returnOptions = labeledValues.map(function(v) {
					return injectPropsWithOption(getMixedOption(v.value));
				});
				onChange(multiple ? returnValues : returnValues[0], multiple ? returnOptions : returnOptions[0]);
			}
		};
		var _React$useState = import_react$42.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), activeValue = _React$useState2[0], setActiveValue = _React$useState2[1];
		var _React$useState3 = import_react$42.useState(0), _React$useState4 = _slicedToArray(_React$useState3, 2), accessibilityIndex = _React$useState4[0], setAccessibilityIndex = _React$useState4[1];
		var mergedDefaultActiveFirstOption = defaultActiveFirstOption !== void 0 ? defaultActiveFirstOption : mode !== "combobox";
		var onActiveValue = import_react$42.useCallback(function(active, index$1) {
			var _ref3 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref3$source = _ref3.source, source = _ref3$source === void 0 ? "keyboard" : _ref3$source;
			setAccessibilityIndex(index$1);
			if (backfill && mode === "combobox" && active !== null && source === "keyboard") setActiveValue(String(active));
		}, [backfill, mode]);
		var triggerSelect = function triggerSelect$1(val, selected, type) {
			var getSelectEnt = function getSelectEnt$1() {
				var _option$key2;
				var option = getMixedOption(val);
				return [labelInValue ? {
					label: option === null || option === void 0 ? void 0 : option[mergedFieldNames.label],
					value: val,
					key: (_option$key2 = option === null || option === void 0 ? void 0 : option.key) !== null && _option$key2 !== void 0 ? _option$key2 : val
				} : val, injectPropsWithOption(option)];
			};
			if (selected && onSelect) {
				var _getSelectEnt = getSelectEnt(), _getSelectEnt2 = _slicedToArray(_getSelectEnt, 2), wrappedValue = _getSelectEnt2[0], _option = _getSelectEnt2[1];
				onSelect(wrappedValue, _option);
			} else if (!selected && onDeselect && type !== "clear") {
				var _getSelectEnt3 = getSelectEnt(), _getSelectEnt4 = _slicedToArray(_getSelectEnt3, 2), _wrappedValue = _getSelectEnt4[0], _option2 = _getSelectEnt4[1];
				onDeselect(_wrappedValue, _option2);
			}
		};
		var onInternalSelect = useRefFunc$1(function(val, info) {
			var cloneValues;
			var mergedSelect = multiple ? info.selected : true;
			if (mergedSelect) cloneValues = multiple ? [].concat(_toConsumableArray(mergedValues), [val]) : [val];
			else cloneValues = mergedValues.filter(function(v) {
				return v.value !== val;
			});
			triggerChange(cloneValues);
			triggerSelect(val, mergedSelect);
			if (mode === "combobox") setActiveValue("");
			else if (!isMultiple || autoClearSearchValue) {
				setSearchValue("");
				setActiveValue("");
			}
		});
		var onDisplayValuesChange = function onDisplayValuesChange$1(nextValues, info) {
			triggerChange(nextValues);
			var type = info.type, values = info.values;
			if (type === "remove" || type === "clear") values.forEach(function(item) {
				triggerSelect(item.value, false, type);
			});
		};
		var onInternalSearch = function onInternalSearch$1(searchText, info) {
			setSearchValue(searchText);
			setActiveValue(null);
			if (info.source === "submit") {
				var formatted = (searchText || "").trim();
				if (formatted) {
					var newRawValues = Array.from(new Set([].concat(_toConsumableArray(rawValues), [formatted])));
					triggerChange(newRawValues);
					triggerSelect(formatted, true);
					setSearchValue("");
				}
				return;
			}
			if (info.source !== "blur") {
				if (mode === "combobox") triggerChange(searchText);
				onSearch === null || onSearch === void 0 || onSearch(searchText);
			}
		};
		var onInternalSearchSplit = function onInternalSearchSplit$1(words) {
			var patchValues = words;
			if (mode !== "tags") patchValues = words.map(function(word) {
				var opt = labelOptions.get(word);
				return opt === null || opt === void 0 ? void 0 : opt.value;
			}).filter(function(val) {
				return val !== void 0;
			});
			var newRawValues = Array.from(new Set([].concat(_toConsumableArray(rawValues), _toConsumableArray(patchValues))));
			triggerChange(newRawValues);
			newRawValues.forEach(function(newRawValue) {
				triggerSelect(newRawValue, true);
			});
		};
		var selectContext = import_react$42.useMemo(function() {
			var realVirtual = virtual !== false && dropdownMatchSelectWidth !== false;
			return _objectSpread2(_objectSpread2({}, parsedOptions), {}, {
				flattenOptions: displayOptions,
				onActiveValue,
				defaultActiveFirstOption: mergedDefaultActiveFirstOption,
				onSelect: onInternalSelect,
				menuItemSelectedIcon,
				rawValues,
				fieldNames: mergedFieldNames,
				virtual: realVirtual,
				direction,
				listHeight,
				listItemHeight,
				childrenAsData,
				maxCount,
				optionRender
			});
		}, [
			maxCount,
			parsedOptions,
			displayOptions,
			onActiveValue,
			mergedDefaultActiveFirstOption,
			onInternalSelect,
			menuItemSelectedIcon,
			rawValues,
			mergedFieldNames,
			virtual,
			dropdownMatchSelectWidth,
			direction,
			listHeight,
			listItemHeight,
			childrenAsData,
			optionRender
		]);
		return /* @__PURE__ */ import_react$42.createElement(SelectContext_default.Provider, { value: selectContext }, /* @__PURE__ */ import_react$42.createElement(BaseSelect_default, _extends({}, restProps, {
			id: mergedId,
			prefixCls,
			ref,
			omitDomProps: OMIT_DOM_PROPS,
			mode,
			displayValues,
			onDisplayValuesChange,
			direction,
			searchValue: mergedSearchValue,
			onSearch: onInternalSearch,
			autoClearSearchValue,
			onSearchSplit: onInternalSearchSplit,
			dropdownMatchSelectWidth,
			OptionList: OptionList_default$1,
			emptyOptions: !displayOptions.length,
			activeValue,
			activeDescendantId: "".concat(mergedId, "_list_").concat(accessibilityIndex)
		})));
	});
	TypedSelect = Select;
	TypedSelect.Option = Option_default;
	TypedSelect.OptGroup = OptGroup_default;
}));
var init_es$10 = __esmMin((() => {
	init_Select();
	init_Option();
	init_OptGroup();
	init_BaseSelect();
	init_useBaseProps();
}));
function getEntity(keyEntities, key) {
	return keyEntities[key];
}
var init_keyUtil = __esmMin((() => {}));
function getPosition(level, index$1) {
	return "".concat(level, "-").concat(index$1);
}
function isTreeNode(node) {
	return node && node.type && node.type.isTreeNode;
}
function getKey(key, pos) {
	if (key !== null && key !== void 0) return key;
	return pos;
}
function fillFieldNames$1(fieldNames) {
	var _ref = fieldNames || {}, title = _ref.title, _title = _ref._title, key = _ref.key, children = _ref.children;
	var mergedTitle = title || "title";
	return {
		title: mergedTitle,
		_title: _title || [mergedTitle],
		key: key || "key",
		children: children || "children"
	};
}
function convertTreeToData(rootNodes) {
	function dig(node) {
		var treeNodes = toArray$1(node);
		return treeNodes.map(function(treeNode) {
			if (!isTreeNode(treeNode)) {
				warning_default(!treeNode, "Tree/TreeNode can only accept TreeNode as children.");
				return null;
			}
			var key = treeNode.key;
			var _treeNode$props = treeNode.props, children = _treeNode$props.children, rest = _objectWithoutProperties(_treeNode$props, _excluded$15);
			var dataNode = _objectSpread2({ key }, rest);
			var parsedChildren = dig(children);
			if (parsedChildren.length) dataNode.children = parsedChildren;
			return dataNode;
		}).filter(function(dataNode) {
			return dataNode;
		});
	}
	return dig(rootNodes);
}
function flattenTreeData(treeNodeList, expandedKeys, fieldNames) {
	var _fillFieldNames = fillFieldNames$1(fieldNames), fieldTitles = _fillFieldNames._title, fieldKey = _fillFieldNames.key, fieldChildren = _fillFieldNames.children;
	var expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
	var flattenList = [];
	function dig(list) {
		var parent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
		return list.map(function(treeNode, index$1) {
			var pos = getPosition(parent ? parent.pos : "0", index$1);
			var mergedKey = getKey(treeNode[fieldKey], pos);
			var mergedTitle;
			for (var i = 0; i < fieldTitles.length; i += 1) {
				var fieldTitle = fieldTitles[i];
				if (treeNode[fieldTitle] !== void 0) {
					mergedTitle = treeNode[fieldTitle];
					break;
				}
			}
			var flattenNode = Object.assign(omit(treeNode, [].concat(_toConsumableArray(fieldTitles), [fieldKey, fieldChildren])), {
				title: mergedTitle,
				key: mergedKey,
				parent,
				pos,
				children: null,
				data: treeNode,
				isStart: [].concat(_toConsumableArray(parent ? parent.isStart : []), [index$1 === 0]),
				isEnd: [].concat(_toConsumableArray(parent ? parent.isEnd : []), [index$1 === list.length - 1])
			});
			flattenList.push(flattenNode);
			if (expandedKeys === true || expandedKeySet.has(mergedKey)) flattenNode.children = dig(treeNode[fieldChildren] || [], flattenNode);
			else flattenNode.children = [];
			return flattenNode;
		});
	}
	dig(treeNodeList);
	return flattenList;
}
function traverseDataNodes(dataNodes, callback, config) {
	var mergedConfig = {};
	if (_typeof(config) === "object") mergedConfig = config;
	else mergedConfig = { externalGetKey: config };
	mergedConfig = mergedConfig || {};
	var _mergedConfig = mergedConfig, childrenPropName = _mergedConfig.childrenPropName, externalGetKey = _mergedConfig.externalGetKey, fieldNames = _mergedConfig.fieldNames;
	var _fillFieldNames2 = fillFieldNames$1(fieldNames), fieldKey = _fillFieldNames2.key, fieldChildren = _fillFieldNames2.children;
	var mergeChildrenPropName = childrenPropName || fieldChildren;
	var syntheticGetKey;
	if (externalGetKey) {
		if (typeof externalGetKey === "string") syntheticGetKey = function syntheticGetKey$1(node) {
			return node[externalGetKey];
		};
		else if (typeof externalGetKey === "function") syntheticGetKey = function syntheticGetKey$1(node) {
			return externalGetKey(node);
		};
	} else syntheticGetKey = function syntheticGetKey$1(node, pos) {
		return getKey(node[fieldKey], pos);
	};
	function processNode(node, index$1, parent, pathNodes) {
		var children = node ? node[mergeChildrenPropName] : dataNodes;
		var pos = node ? getPosition(parent.pos, index$1) : "0";
		var connectNodes = node ? [].concat(_toConsumableArray(pathNodes), [node]) : [];
		if (node) {
			var key = syntheticGetKey(node, pos);
			var _data = {
				node,
				index: index$1,
				pos,
				key,
				parentPos: parent.node ? parent.pos : null,
				level: parent.level + 1,
				nodes: connectNodes
			};
			callback(_data);
		}
		if (children) children.forEach(function(subNode, subIndex) {
			processNode(subNode, subIndex, {
				node,
				pos,
				level: parent ? parent.level + 1 : -1
			}, connectNodes);
		});
	}
	processNode(null);
}
function convertDataToEntities(dataNodes) {
	var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, initWrapper = _ref2.initWrapper, processEntity = _ref2.processEntity, onProcessFinished = _ref2.onProcessFinished, externalGetKey = _ref2.externalGetKey, childrenPropName = _ref2.childrenPropName, fieldNames = _ref2.fieldNames;
	var legacyExternalGetKey = arguments.length > 2 ? arguments[2] : void 0;
	var mergedExternalGetKey = externalGetKey || legacyExternalGetKey;
	var posEntities = {};
	var keyEntities = {};
	var wrapper = {
		posEntities,
		keyEntities
	};
	if (initWrapper) wrapper = initWrapper(wrapper) || wrapper;
	traverseDataNodes(dataNodes, function(item) {
		var node = item.node, index$1 = item.index, pos = item.pos, key = item.key, parentPos = item.parentPos, level = item.level, nodes = item.nodes;
		var entity = {
			node,
			nodes,
			index: index$1,
			key,
			pos,
			level
		};
		var mergedKey = getKey(key, pos);
		posEntities[pos] = entity;
		keyEntities[mergedKey] = entity;
		entity.parent = posEntities[parentPos];
		if (entity.parent) {
			entity.parent.children = entity.parent.children || [];
			entity.parent.children.push(entity);
		}
		if (processEntity) processEntity(entity, wrapper);
	}, {
		externalGetKey: mergedExternalGetKey,
		childrenPropName,
		fieldNames
	});
	if (onProcessFinished) onProcessFinished(wrapper);
	return wrapper;
}
function getTreeNodeProps(key, _ref3) {
	var expandedKeys = _ref3.expandedKeys, selectedKeys = _ref3.selectedKeys, loadedKeys = _ref3.loadedKeys, loadingKeys = _ref3.loadingKeys, checkedKeys = _ref3.checkedKeys, halfCheckedKeys = _ref3.halfCheckedKeys, dragOverNodeKey = _ref3.dragOverNodeKey, dropPosition = _ref3.dropPosition, keyEntities = _ref3.keyEntities;
	var entity = getEntity(keyEntities, key);
	var treeNodeProps = {
		eventKey: key,
		expanded: expandedKeys.indexOf(key) !== -1,
		selected: selectedKeys.indexOf(key) !== -1,
		loaded: loadedKeys.indexOf(key) !== -1,
		loading: loadingKeys.indexOf(key) !== -1,
		checked: checkedKeys.indexOf(key) !== -1,
		halfChecked: halfCheckedKeys.indexOf(key) !== -1,
		pos: String(entity ? entity.pos : ""),
		dragOver: dragOverNodeKey === key && dropPosition === 0,
		dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
		dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
	};
	return treeNodeProps;
}
function convertNodePropsToEventData(props) {
	var data = props.data, expanded = props.expanded, selected = props.selected, checked = props.checked, loaded = props.loaded, loading = props.loading, halfChecked = props.halfChecked, dragOver = props.dragOver, dragOverGapTop = props.dragOverGapTop, dragOverGapBottom = props.dragOverGapBottom, pos = props.pos, active = props.active, eventKey = props.eventKey;
	var eventData = _objectSpread2(_objectSpread2({}, data), {}, {
		expanded,
		selected,
		checked,
		loaded,
		loading,
		halfChecked,
		dragOver,
		dragOverGapTop,
		dragOverGapBottom,
		pos,
		active,
		key: eventKey
	});
	if (!("props" in eventData)) Object.defineProperty(eventData, "props", { get: function get() {
		warning_default(false, "Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.");
		return props;
	} });
	return eventData;
}
var _excluded$15;
var init_treeUtil = __esmMin((() => {
	init_typeof();
	init_toConsumableArray();
	init_objectSpread2();
	init_objectWithoutProperties();
	init_toArray$1();
	init_omit();
	init_warning();
	init_keyUtil();
	_excluded$15 = ["children"];
}));
function removeFromCheckedKeys(halfCheckedKeys, checkedKeys) {
	var filteredKeys = /* @__PURE__ */ new Set();
	halfCheckedKeys.forEach(function(key) {
		if (!checkedKeys.has(key)) filteredKeys.add(key);
	});
	return filteredKeys;
}
function isCheckDisabled$1(node) {
	var _ref = node || {}, disabled = _ref.disabled, disableCheckbox = _ref.disableCheckbox, checkable = _ref.checkable;
	return !!(disabled || disableCheckbox) || checkable === false;
}
function fillConductCheck(keys, levelEntities, maxLevel, syntheticGetCheckDisabled) {
	var checkedKeys = new Set(keys);
	var halfCheckedKeys = /* @__PURE__ */ new Set();
	for (var level = 0; level <= maxLevel; level += 1) {
		var entities = levelEntities.get(level) || /* @__PURE__ */ new Set();
		entities.forEach(function(entity) {
			var key = entity.key, node = entity.node, _entity$children = entity.children, children = _entity$children === void 0 ? [] : _entity$children;
			if (checkedKeys.has(key) && !syntheticGetCheckDisabled(node)) children.filter(function(childEntity) {
				return !syntheticGetCheckDisabled(childEntity.node);
			}).forEach(function(childEntity) {
				checkedKeys.add(childEntity.key);
			});
		});
	}
	var visitedKeys = /* @__PURE__ */ new Set();
	for (var _level = maxLevel; _level >= 0; _level -= 1) {
		var _entities = levelEntities.get(_level) || /* @__PURE__ */ new Set();
		_entities.forEach(function(entity) {
			var parent = entity.parent, node = entity.node;
			if (syntheticGetCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) return;
			if (syntheticGetCheckDisabled(entity.parent.node)) {
				visitedKeys.add(parent.key);
				return;
			}
			var allChecked = true;
			var partialChecked = false;
			(parent.children || []).filter(function(childEntity) {
				return !syntheticGetCheckDisabled(childEntity.node);
			}).forEach(function(_ref2) {
				var key = _ref2.key;
				var checked = checkedKeys.has(key);
				if (allChecked && !checked) allChecked = false;
				if (!partialChecked && (checked || halfCheckedKeys.has(key))) partialChecked = true;
			});
			if (allChecked) checkedKeys.add(parent.key);
			if (partialChecked) halfCheckedKeys.add(parent.key);
			visitedKeys.add(parent.key);
		});
	}
	return {
		checkedKeys: Array.from(checkedKeys),
		halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys))
	};
}
function cleanConductCheck(keys, halfKeys, levelEntities, maxLevel, syntheticGetCheckDisabled) {
	var checkedKeys = new Set(keys);
	var halfCheckedKeys = new Set(halfKeys);
	for (var level = 0; level <= maxLevel; level += 1) {
		var entities = levelEntities.get(level) || /* @__PURE__ */ new Set();
		entities.forEach(function(entity) {
			var key = entity.key, node = entity.node, _entity$children2 = entity.children, children = _entity$children2 === void 0 ? [] : _entity$children2;
			if (!checkedKeys.has(key) && !halfCheckedKeys.has(key) && !syntheticGetCheckDisabled(node)) children.filter(function(childEntity) {
				return !syntheticGetCheckDisabled(childEntity.node);
			}).forEach(function(childEntity) {
				checkedKeys.delete(childEntity.key);
			});
		});
	}
	halfCheckedKeys = /* @__PURE__ */ new Set();
	var visitedKeys = /* @__PURE__ */ new Set();
	for (var _level2 = maxLevel; _level2 >= 0; _level2 -= 1) {
		var _entities2 = levelEntities.get(_level2) || /* @__PURE__ */ new Set();
		_entities2.forEach(function(entity) {
			var parent = entity.parent, node = entity.node;
			if (syntheticGetCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) return;
			if (syntheticGetCheckDisabled(entity.parent.node)) {
				visitedKeys.add(parent.key);
				return;
			}
			var allChecked = true;
			var partialChecked = false;
			(parent.children || []).filter(function(childEntity) {
				return !syntheticGetCheckDisabled(childEntity.node);
			}).forEach(function(_ref3) {
				var key = _ref3.key;
				var checked = checkedKeys.has(key);
				if (allChecked && !checked) allChecked = false;
				if (!partialChecked && (checked || halfCheckedKeys.has(key))) partialChecked = true;
			});
			if (!allChecked) checkedKeys.delete(parent.key);
			if (partialChecked) halfCheckedKeys.add(parent.key);
			visitedKeys.add(parent.key);
		});
	}
	return {
		checkedKeys: Array.from(checkedKeys),
		halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys))
	};
}
function conductCheck(keyList, checked, keyEntities, getCheckDisabled) {
	var warningMissKeys = [];
	var syntheticGetCheckDisabled;
	if (getCheckDisabled) syntheticGetCheckDisabled = getCheckDisabled;
	else syntheticGetCheckDisabled = isCheckDisabled$1;
	var keys = new Set(keyList.filter(function(key) {
		var hasEntity = !!getEntity(keyEntities, key);
		if (!hasEntity) warningMissKeys.push(key);
		return hasEntity;
	}));
	var levelEntities = /* @__PURE__ */ new Map();
	var maxLevel = 0;
	Object.keys(keyEntities).forEach(function(key) {
		var entity = keyEntities[key];
		var level = entity.level;
		var levelSet = levelEntities.get(level);
		if (!levelSet) {
			levelSet = /* @__PURE__ */ new Set();
			levelEntities.set(level, levelSet);
		}
		levelSet.add(entity);
		maxLevel = Math.max(maxLevel, level);
	});
	warning_default(!warningMissKeys.length, "Tree missing follow keys: ".concat(warningMissKeys.slice(0, 100).map(function(key) {
		return "'".concat(key, "'");
	}).join(", ")));
	var result;
	if (checked === true) result = fillConductCheck(keys, levelEntities, maxLevel, syntheticGetCheckDisabled);
	else result = cleanConductCheck(keys, checked.halfCheckedKeys, levelEntities, maxLevel, syntheticGetCheckDisabled);
	return result;
}
var init_conductUtil = __esmMin((() => {
	init_warning();
	init_keyUtil();
}));
function MotionThumb(props) {
	var prefixCls = props.prefixCls, containerRef = props.containerRef, value = props.value, getValueIndex = props.getValueIndex, motionName = props.motionName, onMotionStart = props.onMotionStart, onMotionEnd = props.onMotionEnd, direction = props.direction, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? false : _props$vertical;
	var thumbRef = import_react$41.useRef(null);
	var _React$useState = import_react$41.useState(value), _React$useState2 = _slicedToArray(_React$useState, 2), prevValue = _React$useState2[0], setPrevValue = _React$useState2[1];
	var findValueElement = function findValueElement$1(val) {
		var _containerRef$current;
		var index$1 = getValueIndex(val);
		var ele = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelectorAll(".".concat(prefixCls, "-item"))[index$1];
		return (ele === null || ele === void 0 ? void 0 : ele.offsetParent) && ele;
	};
	var _React$useState3 = import_react$41.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), prevStyle = _React$useState4[0], setPrevStyle = _React$useState4[1];
	var _React$useState5 = import_react$41.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), nextStyle = _React$useState6[0], setNextStyle = _React$useState6[1];
	useLayoutEffect_default(function() {
		if (prevValue !== value) {
			var prev = findValueElement(prevValue);
			var next = findValueElement(value);
			var calcPrevStyle = calcThumbStyle(prev, vertical);
			var calcNextStyle = calcThumbStyle(next, vertical);
			setPrevValue(value);
			setPrevStyle(calcPrevStyle);
			setNextStyle(calcNextStyle);
			if (prev && next) onMotionStart();
			else onMotionEnd();
		}
	}, [value]);
	var thumbStart = import_react$41.useMemo(function() {
		if (vertical) {
			var _prevStyle$top;
			return toPX((_prevStyle$top = prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.top) !== null && _prevStyle$top !== void 0 ? _prevStyle$top : 0);
		}
		if (direction === "rtl") return toPX(-(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.right));
		return toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.left);
	}, [
		vertical,
		direction,
		prevStyle
	]);
	var thumbActive = import_react$41.useMemo(function() {
		if (vertical) {
			var _nextStyle$top;
			return toPX((_nextStyle$top = nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.top) !== null && _nextStyle$top !== void 0 ? _nextStyle$top : 0);
		}
		if (direction === "rtl") return toPX(-(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.right));
		return toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.left);
	}, [
		vertical,
		direction,
		nextStyle
	]);
	var onAppearStart = function onAppearStart$1() {
		if (vertical) return {
			transform: "translateY(var(--thumb-start-top))",
			height: "var(--thumb-start-height)"
		};
		return {
			transform: "translateX(var(--thumb-start-left))",
			width: "var(--thumb-start-width)"
		};
	};
	var onAppearActive = function onAppearActive$1() {
		if (vertical) return {
			transform: "translateY(var(--thumb-active-top))",
			height: "var(--thumb-active-height)"
		};
		return {
			transform: "translateX(var(--thumb-active-left))",
			width: "var(--thumb-active-width)"
		};
	};
	var onVisibleChanged = function onVisibleChanged$1() {
		setPrevStyle(null);
		setNextStyle(null);
		onMotionEnd();
	};
	if (!prevStyle || !nextStyle) return null;
	return /* @__PURE__ */ import_react$41.createElement(es_default$4, {
		visible: true,
		motionName,
		motionAppear: true,
		onAppearStart,
		onAppearActive,
		onVisibleChanged
	}, function(_ref, ref) {
		var motionClassName = _ref.className, motionStyle = _ref.style;
		var mergedStyle = _objectSpread2(_objectSpread2({}, motionStyle), {}, {
			"--thumb-start-left": thumbStart,
			"--thumb-start-width": toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.width),
			"--thumb-active-left": thumbActive,
			"--thumb-active-width": toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.width),
			"--thumb-start-top": thumbStart,
			"--thumb-start-height": toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.height),
			"--thumb-active-top": thumbActive,
			"--thumb-active-height": toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.height)
		});
		var motionProps = {
			ref: composeRef(thumbRef, ref),
			style: mergedStyle,
			className: (0, import_classnames$17.default)("".concat(prefixCls, "-thumb"), motionClassName)
		};
		return /* @__PURE__ */ import_react$41.createElement("div", motionProps);
	});
}
var import_classnames$17, import_react$41, calcThumbStyle, toPX;
var init_MotionThumb = __esmMin((() => {
	init_objectSpread2();
	init_slicedToArray();
	import_classnames$17 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$17();
	init_useLayoutEffect$2();
	init_ref();
	import_react$41 = /* @__PURE__ */ __toESM(require_react());
	calcThumbStyle = function calcThumbStyle$1(targetElement, vertical) {
		if (!targetElement) return null;
		var style = {
			left: targetElement.offsetLeft,
			right: targetElement.parentElement.clientWidth - targetElement.clientWidth - targetElement.offsetLeft,
			width: targetElement.clientWidth,
			top: targetElement.offsetTop,
			bottom: targetElement.parentElement.clientHeight - targetElement.clientHeight - targetElement.offsetTop,
			height: targetElement.clientHeight
		};
		if (vertical) return {
			left: 0,
			right: 0,
			width: 0,
			top: style.top,
			bottom: style.bottom,
			height: style.height
		};
		return {
			left: style.left,
			right: style.right,
			width: style.width,
			top: 0,
			bottom: 0,
			height: 0
		};
	};
	toPX = function toPX$1(value) {
		return value !== void 0 ? "".concat(value, "px") : void 0;
	};
}));
var es_exports$9 = {};
__export(es_exports$9, { default: () => es_default$12 });
function getValidTitle(option) {
	if (typeof option.title !== "undefined") return option.title;
	if (_typeof(option.label) !== "object") {
		var _option$label;
		return (_option$label = option.label) === null || _option$label === void 0 ? void 0 : _option$label.toString();
	}
}
function normalizeOptions(options) {
	return options.map(function(option) {
		if (_typeof(option) === "object" && option !== null) {
			var validTitle = getValidTitle(option);
			return _objectSpread2(_objectSpread2({}, option), {}, { title: validTitle });
		}
		return {
			label: option === null || option === void 0 ? void 0 : option.toString(),
			title: option === null || option === void 0 ? void 0 : option.toString(),
			value: option
		};
	});
}
var import_classnames$16, import_react$40, _excluded$14, InternalSegmentedOption, Segmented, TypedSegmented, es_default$12;
var init_es$9 = __esmMin((() => {
	init_extends();
	init_slicedToArray();
	init_objectWithoutProperties();
	init_defineProperty();
	init_objectSpread2();
	init_typeof();
	import_classnames$16 = /* @__PURE__ */ __toESM(require_classnames());
	init_useMergedState();
	init_omit();
	init_ref();
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
	init_MotionThumb();
	_excluded$14 = [
		"prefixCls",
		"direction",
		"vertical",
		"options",
		"disabled",
		"defaultValue",
		"value",
		"name",
		"onChange",
		"className",
		"motionName"
	];
	InternalSegmentedOption = function InternalSegmentedOption$1(_ref) {
		var prefixCls = _ref.prefixCls, className = _ref.className, disabled = _ref.disabled, checked = _ref.checked, label = _ref.label, title = _ref.title, value = _ref.value, name = _ref.name, onChange = _ref.onChange, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onKeyDown = _ref.onKeyDown, onKeyUp = _ref.onKeyUp, onMouseDown = _ref.onMouseDown;
		var handleChange = function handleChange$1(event) {
			if (disabled) return;
			onChange(event, value);
		};
		return /* @__PURE__ */ import_react$40.createElement("label", {
			className: (0, import_classnames$16.default)(className, _defineProperty({}, "".concat(prefixCls, "-item-disabled"), disabled)),
			onMouseDown
		}, /* @__PURE__ */ import_react$40.createElement("input", {
			name,
			className: "".concat(prefixCls, "-item-input"),
			type: "radio",
			disabled,
			checked,
			onChange: handleChange,
			onFocus,
			onBlur,
			onKeyDown,
			onKeyUp
		}), /* @__PURE__ */ import_react$40.createElement("div", {
			className: "".concat(prefixCls, "-item-label"),
			title,
			"aria-selected": checked
		}, label));
	};
	Segmented = /* @__PURE__ */ import_react$40.forwardRef(function(props, ref) {
		var _segmentedOptions$, _classNames2;
		var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-segmented" : _props$prefixCls, direction = props.direction, vertical = props.vertical, _props$options = props.options, options = _props$options === void 0 ? [] : _props$options, disabled = props.disabled, defaultValue = props.defaultValue, value = props.value, name = props.name, onChange = props.onChange, _props$className = props.className, className = _props$className === void 0 ? "" : _props$className, _props$motionName = props.motionName, motionName = _props$motionName === void 0 ? "thumb-motion" : _props$motionName, restProps = _objectWithoutProperties(props, _excluded$14);
		var containerRef = import_react$40.useRef(null);
		var mergedRef = import_react$40.useMemo(function() {
			return composeRef(containerRef, ref);
		}, [containerRef, ref]);
		var segmentedOptions = import_react$40.useMemo(function() {
			return normalizeOptions(options);
		}, [options]);
		var _useMergedState = useMergedState((_segmentedOptions$ = segmentedOptions[0]) === null || _segmentedOptions$ === void 0 ? void 0 : _segmentedOptions$.value, {
			value,
			defaultValue
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValue = _useMergedState2[0], setRawValue = _useMergedState2[1];
		var _React$useState = import_react$40.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), thumbShow = _React$useState2[0], setThumbShow = _React$useState2[1];
		var handleChange = function handleChange$1(event, val) {
			setRawValue(val);
			onChange === null || onChange === void 0 || onChange(val);
		};
		var divProps = omit(restProps, ["children"]);
		var _React$useState3 = import_react$40.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), isKeyboard = _React$useState4[0], setIsKeyboard = _React$useState4[1];
		var _React$useState5 = import_react$40.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), isFocused = _React$useState6[0], setIsFocused = _React$useState6[1];
		var handleFocus = function handleFocus$1() {
			setIsFocused(true);
		};
		var handleBlur = function handleBlur$1() {
			setIsFocused(false);
		};
		var handleMouseDown = function handleMouseDown$1() {
			setIsKeyboard(false);
		};
		var handleKeyUp = function handleKeyUp$1(event) {
			if (event.key === "Tab") setIsKeyboard(true);
		};
		var onOffset = function onOffset$1(offset) {
			var currentIndex = segmentedOptions.findIndex(function(option) {
				return option.value === rawValue;
			});
			var total = segmentedOptions.length;
			var nextIndex = (currentIndex + offset + total) % total;
			var nextOption = segmentedOptions[nextIndex];
			if (nextOption) {
				setRawValue(nextOption.value);
				onChange === null || onChange === void 0 || onChange(nextOption.value);
			}
		};
		var handleKeyDown = function handleKeyDown$1(event) {
			switch (event.key) {
				case "ArrowLeft":
				case "ArrowUp":
					onOffset(-1);
					break;
				case "ArrowRight":
				case "ArrowDown":
					onOffset(1);
					break;
			}
		};
		return /* @__PURE__ */ import_react$40.createElement("div", _extends({
			role: "radiogroup",
			"aria-label": "segmented control",
			tabIndex: disabled ? void 0 : 0
		}, divProps, {
			className: (0, import_classnames$16.default)(prefixCls, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-rtl"), direction === "rtl"), _defineProperty(_classNames2, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames2, "".concat(prefixCls, "-vertical"), vertical), _classNames2), className),
			ref: mergedRef
		}), /* @__PURE__ */ import_react$40.createElement("div", { className: "".concat(prefixCls, "-group") }, /* @__PURE__ */ import_react$40.createElement(MotionThumb, {
			vertical,
			prefixCls,
			value: rawValue,
			containerRef,
			motionName: "".concat(prefixCls, "-").concat(motionName),
			direction,
			getValueIndex: function getValueIndex(val) {
				return segmentedOptions.findIndex(function(n) {
					return n.value === val;
				});
			},
			onMotionStart: function onMotionStart() {
				setThumbShow(true);
			},
			onMotionEnd: function onMotionEnd() {
				setThumbShow(false);
			}
		}), segmentedOptions.map(function(segmentedOption) {
			var _classNames3;
			return /* @__PURE__ */ import_react$40.createElement(InternalSegmentedOption, _extends({}, segmentedOption, {
				name,
				key: segmentedOption.value,
				prefixCls,
				className: (0, import_classnames$16.default)(segmentedOption.className, "".concat(prefixCls, "-item"), (_classNames3 = {}, _defineProperty(_classNames3, "".concat(prefixCls, "-item-selected"), segmentedOption.value === rawValue && !thumbShow), _defineProperty(_classNames3, "".concat(prefixCls, "-item-focused"), isFocused && isKeyboard && segmentedOption.value === rawValue), _classNames3)),
				checked: segmentedOption.value === rawValue,
				onChange: handleChange,
				onFocus: handleFocus,
				onBlur: handleBlur,
				onKeyDown: handleKeyDown,
				onKeyUp: handleKeyUp,
				onMouseDown: handleMouseDown,
				disabled: !!disabled || !!segmentedOption.disabled
			}));
		})));
	});
	TypedSegmented = Segmented;
	es_default$12 = TypedSegmented;
}));
function hasAddon(props) {
	return !!(props.addonBefore || props.addonAfter);
}
function hasPrefixSuffix(props) {
	return !!(props.prefix || props.suffix || props.allowClear);
}
function cloneEvent(event, target, value) {
	var currentTarget = target.cloneNode(true);
	var newEvent = Object.create(event, {
		target: { value: currentTarget },
		currentTarget: { value: currentTarget }
	});
	currentTarget.value = value;
	if (typeof target.selectionStart === "number" && typeof target.selectionEnd === "number") {
		currentTarget.selectionStart = target.selectionStart;
		currentTarget.selectionEnd = target.selectionEnd;
	}
	currentTarget.setSelectionRange = function() {
		target.setSelectionRange.apply(target, arguments);
	};
	return newEvent;
}
function resolveOnChange(target, e, onChange, targetValue) {
	if (!onChange) return;
	var event = e;
	if (e.type === "click") {
		event = cloneEvent(e, target, "");
		onChange(event);
		return;
	}
	if (target.type !== "file" && targetValue !== void 0) {
		event = cloneEvent(e, target, targetValue);
		onChange(event);
		return;
	}
	onChange(event);
}
function triggerFocus(element, option) {
	if (!element) return;
	element.focus(option);
	var _ref = option || {}, cursor = _ref.cursor;
	if (cursor) {
		var len = element.value.length;
		switch (cursor) {
			case "start":
				element.setSelectionRange(0, 0);
				break;
			case "end":
				element.setSelectionRange(len, len);
				break;
			default: element.setSelectionRange(0, len);
		}
	}
}
var init_commonUtils = __esmMin((() => {}));
var import_classnames$15, import_react$39, BaseInput, BaseInput_default;
var init_BaseInput = __esmMin((() => {
	init_objectSpread2();
	init_extends();
	init_defineProperty();
	init_typeof();
	import_classnames$15 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$39 = /* @__PURE__ */ __toESM(require_react());
	init_commonUtils();
	BaseInput = /* @__PURE__ */ import_react$39.forwardRef(function(props, ref) {
		var _props, _props2, _props3;
		var inputEl = props.inputElement, children = props.children, prefixCls = props.prefixCls, prefix = props.prefix, suffix = props.suffix, addonBefore = props.addonBefore, addonAfter = props.addonAfter, className = props.className, style = props.style, disabled = props.disabled, readOnly = props.readOnly, focused = props.focused, triggerFocus$1 = props.triggerFocus, allowClear = props.allowClear, value = props.value, handleReset = props.handleReset, hidden = props.hidden, classes = props.classes, classNames$41 = props.classNames, dataAttrs = props.dataAttrs, styles = props.styles, components = props.components, onClear = props.onClear;
		var inputElement = children !== null && children !== void 0 ? children : inputEl;
		var AffixWrapperComponent = (components === null || components === void 0 ? void 0 : components.affixWrapper) || "span";
		var GroupWrapperComponent = (components === null || components === void 0 ? void 0 : components.groupWrapper) || "span";
		var WrapperComponent = (components === null || components === void 0 ? void 0 : components.wrapper) || "span";
		var GroupAddonComponent = (components === null || components === void 0 ? void 0 : components.groupAddon) || "span";
		var containerRef = (0, import_react$39.useRef)(null);
		var onInputClick = function onInputClick$1(e) {
			var _containerRef$current;
			if ((_containerRef$current = containerRef.current) !== null && _containerRef$current !== void 0 && _containerRef$current.contains(e.target)) triggerFocus$1 === null || triggerFocus$1 === void 0 || triggerFocus$1();
		};
		var hasAffix = hasPrefixSuffix(props);
		var element = /* @__PURE__ */ (0, import_react$39.cloneElement)(inputElement, {
			value,
			className: (0, import_classnames$15.default)((_props = inputElement.props) === null || _props === void 0 ? void 0 : _props.className, !hasAffix && (classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.variant)) || null
		});
		var groupRef = (0, import_react$39.useRef)(null);
		import_react$39.useImperativeHandle(ref, function() {
			return { nativeElement: groupRef.current || containerRef.current };
		});
		if (hasAffix) {
			var clearIcon = null;
			if (allowClear) {
				var needClear = !disabled && !readOnly && value;
				var clearIconCls = "".concat(prefixCls, "-clear-icon");
				var iconNode = _typeof(allowClear) === "object" && allowClear !== null && allowClear !== void 0 && allowClear.clearIcon ? allowClear.clearIcon : "✖";
				clearIcon = /* @__PURE__ */ import_react$39.createElement("button", {
					type: "button",
					tabIndex: -1,
					onClick: function onClick(event) {
						handleReset === null || handleReset === void 0 || handleReset(event);
						onClear === null || onClear === void 0 || onClear();
					},
					onMouseDown: function onMouseDown(e) {
						return e.preventDefault();
					},
					className: (0, import_classnames$15.default)(clearIconCls, _defineProperty(_defineProperty({}, "".concat(clearIconCls, "-hidden"), !needClear), "".concat(clearIconCls, "-has-suffix"), !!suffix))
				}, iconNode);
			}
			var affixWrapperPrefixCls = "".concat(prefixCls, "-affix-wrapper");
			var affixWrapperCls = (0, import_classnames$15.default)(affixWrapperPrefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), "".concat(affixWrapperPrefixCls, "-disabled"), disabled), "".concat(affixWrapperPrefixCls, "-focused"), focused), "".concat(affixWrapperPrefixCls, "-readonly"), readOnly), "".concat(affixWrapperPrefixCls, "-input-with-clear-btn"), suffix && allowClear && value), classes === null || classes === void 0 ? void 0 : classes.affixWrapper, classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.affixWrapper, classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.variant);
			var suffixNode = (suffix || allowClear) && /* @__PURE__ */ import_react$39.createElement("span", {
				className: (0, import_classnames$15.default)("".concat(prefixCls, "-suffix"), classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.suffix),
				style: styles === null || styles === void 0 ? void 0 : styles.suffix
			}, clearIcon, suffix);
			element = /* @__PURE__ */ import_react$39.createElement(AffixWrapperComponent, _extends({
				className: affixWrapperCls,
				style: styles === null || styles === void 0 ? void 0 : styles.affixWrapper,
				onClick: onInputClick
			}, dataAttrs === null || dataAttrs === void 0 ? void 0 : dataAttrs.affixWrapper, { ref: containerRef }), prefix && /* @__PURE__ */ import_react$39.createElement("span", {
				className: (0, import_classnames$15.default)("".concat(prefixCls, "-prefix"), classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.prefix),
				style: styles === null || styles === void 0 ? void 0 : styles.prefix
			}, prefix), element, suffixNode);
		}
		if (hasAddon(props)) {
			var wrapperCls = "".concat(prefixCls, "-group");
			var addonCls = "".concat(wrapperCls, "-addon");
			var groupWrapperCls = "".concat(wrapperCls, "-wrapper");
			var mergedWrapperClassName = (0, import_classnames$15.default)("".concat(prefixCls, "-wrapper"), wrapperCls, classes === null || classes === void 0 ? void 0 : classes.wrapper, classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.wrapper);
			var mergedGroupClassName = (0, import_classnames$15.default)(groupWrapperCls, _defineProperty({}, "".concat(groupWrapperCls, "-disabled"), disabled), classes === null || classes === void 0 ? void 0 : classes.group, classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.groupWrapper);
			element = /* @__PURE__ */ import_react$39.createElement(GroupWrapperComponent, {
				className: mergedGroupClassName,
				ref: groupRef
			}, /* @__PURE__ */ import_react$39.createElement(WrapperComponent, { className: mergedWrapperClassName }, addonBefore && /* @__PURE__ */ import_react$39.createElement(GroupAddonComponent, { className: addonCls }, addonBefore), element, addonAfter && /* @__PURE__ */ import_react$39.createElement(GroupAddonComponent, { className: addonCls }, addonAfter)));
		}
		return /* @__PURE__ */ import_react$39.cloneElement(element, {
			className: (0, import_classnames$15.default)((_props2 = element.props) === null || _props2 === void 0 ? void 0 : _props2.className, className) || null,
			style: _objectSpread2(_objectSpread2({}, (_props3 = element.props) === null || _props3 === void 0 ? void 0 : _props3.style), style),
			hidden
		});
	});
	BaseInput_default = BaseInput;
}));
function useCount(count, showCount) {
	return import_react$38.useMemo(function() {
		var mergedConfig = {};
		if (showCount) mergedConfig.show = _typeof(showCount) === "object" && showCount.formatter ? showCount.formatter : !!showCount;
		mergedConfig = _objectSpread2(_objectSpread2({}, mergedConfig), count);
		var _ref = mergedConfig, show = _ref.show, rest = _objectWithoutProperties(_ref, _excluded$13);
		return _objectSpread2(_objectSpread2({}, rest), {}, {
			show: !!show,
			showFormatter: typeof show === "function" ? show : void 0,
			strategy: rest.strategy || function(value) {
				return value.length;
			}
		});
	}, [count, showCount]);
}
var import_react$38, _excluded$13;
var init_useCount = __esmMin((() => {
	init_objectWithoutProperties();
	init_objectSpread2();
	init_typeof();
	import_react$38 = /* @__PURE__ */ __toESM(require_react());
	_excluded$13 = ["show"];
}));
var import_classnames$14, import_react$37, _excluded$12, Input, Input_default;
var init_Input = __esmMin((() => {
	init_objectSpread2();
	init_extends();
	init_defineProperty();
	init_toConsumableArray();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_classnames$14 = /* @__PURE__ */ __toESM(require_classnames());
	init_useMergedState();
	init_omit();
	import_react$37 = /* @__PURE__ */ __toESM(require_react());
	init_BaseInput();
	init_useCount();
	init_commonUtils();
	_excluded$12 = [
		"autoComplete",
		"onChange",
		"onFocus",
		"onBlur",
		"onPressEnter",
		"onKeyDown",
		"onKeyUp",
		"prefixCls",
		"disabled",
		"htmlSize",
		"className",
		"maxLength",
		"suffix",
		"showCount",
		"count",
		"type",
		"classes",
		"classNames",
		"styles",
		"onCompositionStart",
		"onCompositionEnd"
	];
	Input = /* @__PURE__ */ (0, import_react$37.forwardRef)(function(props, ref) {
		var autoComplete = props.autoComplete, onChange = props.onChange, onFocus = props.onFocus, onBlur = props.onBlur, onPressEnter = props.onPressEnter, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-input" : _props$prefixCls, disabled = props.disabled, htmlSize = props.htmlSize, className = props.className, maxLength = props.maxLength, suffix = props.suffix, showCount = props.showCount, count = props.count, _props$type = props.type, type = _props$type === void 0 ? "text" : _props$type, classes = props.classes, classNames$41 = props.classNames, styles = props.styles, _onCompositionStart = props.onCompositionStart, onCompositionEnd = props.onCompositionEnd, rest = _objectWithoutProperties(props, _excluded$12);
		var _useState = (0, import_react$37.useState)(false), _useState2 = _slicedToArray(_useState, 2), focused = _useState2[0], setFocused = _useState2[1];
		var compositionRef = (0, import_react$37.useRef)(false);
		var keyLockRef = (0, import_react$37.useRef)(false);
		var inputRef = (0, import_react$37.useRef)(null);
		var holderRef = (0, import_react$37.useRef)(null);
		var focus = function focus$1(option) {
			if (inputRef.current) triggerFocus(inputRef.current, option);
		};
		var _useMergedState = useMergedState(props.defaultValue, { value: props.value }), _useMergedState2 = _slicedToArray(_useMergedState, 2), value = _useMergedState2[0], setValue = _useMergedState2[1];
		var formatValue = value === void 0 || value === null ? "" : String(value);
		var _useState3 = (0, import_react$37.useState)(null), _useState4 = _slicedToArray(_useState3, 2), selection = _useState4[0], setSelection = _useState4[1];
		var countConfig = useCount(count, showCount);
		var mergedMax = countConfig.max || maxLength;
		var valueLength = countConfig.strategy(formatValue);
		var isOutOfRange = !!mergedMax && valueLength > mergedMax;
		(0, import_react$37.useImperativeHandle)(ref, function() {
			var _holderRef$current;
			return {
				focus,
				blur: function blur() {
					var _inputRef$current;
					(_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.blur();
				},
				setSelectionRange: function setSelectionRange(start, end, direction) {
					var _inputRef$current2;
					(_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.setSelectionRange(start, end, direction);
				},
				select: function select() {
					var _inputRef$current3;
					(_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 || _inputRef$current3.select();
				},
				input: inputRef.current,
				nativeElement: ((_holderRef$current = holderRef.current) === null || _holderRef$current === void 0 ? void 0 : _holderRef$current.nativeElement) || inputRef.current
			};
		});
		(0, import_react$37.useEffect)(function() {
			if (keyLockRef.current) keyLockRef.current = false;
			setFocused(function(prev) {
				return prev && disabled ? false : prev;
			});
		}, [disabled]);
		var triggerChange = function triggerChange$1(e, currentValue, info) {
			var cutValue = currentValue;
			if (!compositionRef.current && countConfig.exceedFormatter && countConfig.max && countConfig.strategy(currentValue) > countConfig.max) {
				cutValue = countConfig.exceedFormatter(currentValue, { max: countConfig.max });
				if (currentValue !== cutValue) {
					var _inputRef$current4, _inputRef$current5;
					setSelection([((_inputRef$current4 = inputRef.current) === null || _inputRef$current4 === void 0 ? void 0 : _inputRef$current4.selectionStart) || 0, ((_inputRef$current5 = inputRef.current) === null || _inputRef$current5 === void 0 ? void 0 : _inputRef$current5.selectionEnd) || 0]);
				}
			} else if (info.source === "compositionEnd") return;
			setValue(cutValue);
			if (inputRef.current) resolveOnChange(inputRef.current, e, onChange, cutValue);
		};
		(0, import_react$37.useEffect)(function() {
			if (selection) {
				var _inputRef$current6;
				(_inputRef$current6 = inputRef.current) === null || _inputRef$current6 === void 0 || _inputRef$current6.setSelectionRange.apply(_inputRef$current6, _toConsumableArray(selection));
			}
		}, [selection]);
		var onInternalChange = function onInternalChange$1(e) {
			triggerChange(e, e.target.value, { source: "change" });
		};
		var onInternalCompositionEnd = function onInternalCompositionEnd$1(e) {
			compositionRef.current = false;
			triggerChange(e, e.currentTarget.value, { source: "compositionEnd" });
			onCompositionEnd === null || onCompositionEnd === void 0 || onCompositionEnd(e);
		};
		var handleKeyDown = function handleKeyDown$1(e) {
			if (onPressEnter && e.key === "Enter" && !keyLockRef.current) {
				keyLockRef.current = true;
				onPressEnter(e);
			}
			onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
		};
		var handleKeyUp = function handleKeyUp$1(e) {
			if (e.key === "Enter") keyLockRef.current = false;
			onKeyUp === null || onKeyUp === void 0 || onKeyUp(e);
		};
		var handleFocus = function handleFocus$1(e) {
			setFocused(true);
			onFocus === null || onFocus === void 0 || onFocus(e);
		};
		var handleBlur = function handleBlur$1(e) {
			if (keyLockRef.current) keyLockRef.current = false;
			setFocused(false);
			onBlur === null || onBlur === void 0 || onBlur(e);
		};
		var handleReset = function handleReset$1(e) {
			setValue("");
			focus();
			if (inputRef.current) resolveOnChange(inputRef.current, e, onChange);
		};
		var outOfRangeCls = isOutOfRange && "".concat(prefixCls, "-out-of-range");
		var getInputElement = function getInputElement$1() {
			var otherProps = omit(props, [
				"prefixCls",
				"onPressEnter",
				"addonBefore",
				"addonAfter",
				"prefix",
				"suffix",
				"allowClear",
				"defaultValue",
				"showCount",
				"count",
				"classes",
				"htmlSize",
				"styles",
				"classNames",
				"onClear"
			]);
			return /* @__PURE__ */ import_react$37.createElement("input", _extends({ autoComplete }, otherProps, {
				onChange: onInternalChange,
				onFocus: handleFocus,
				onBlur: handleBlur,
				onKeyDown: handleKeyDown,
				onKeyUp: handleKeyUp,
				className: (0, import_classnames$14.default)(prefixCls, _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.input),
				style: styles === null || styles === void 0 ? void 0 : styles.input,
				ref: inputRef,
				size: htmlSize,
				type,
				onCompositionStart: function onCompositionStart(e) {
					compositionRef.current = true;
					_onCompositionStart === null || _onCompositionStart === void 0 || _onCompositionStart(e);
				},
				onCompositionEnd: onInternalCompositionEnd
			}));
		};
		var getSuffix = function getSuffix$1() {
			var hasMaxLength = Number(mergedMax) > 0;
			if (suffix || countConfig.show) {
				var dataCount = countConfig.showFormatter ? countConfig.showFormatter({
					value: formatValue,
					count: valueLength,
					maxLength: mergedMax
				}) : "".concat(valueLength).concat(hasMaxLength ? " / ".concat(mergedMax) : "");
				return /* @__PURE__ */ import_react$37.createElement(import_react$37.Fragment, null, countConfig.show && /* @__PURE__ */ import_react$37.createElement("span", {
					className: (0, import_classnames$14.default)("".concat(prefixCls, "-show-count-suffix"), _defineProperty({}, "".concat(prefixCls, "-show-count-has-suffix"), !!suffix), classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.count),
					style: _objectSpread2({}, styles === null || styles === void 0 ? void 0 : styles.count)
				}, dataCount), suffix);
			}
			return null;
		};
		return /* @__PURE__ */ import_react$37.createElement(BaseInput_default, _extends({}, rest, {
			prefixCls,
			className: (0, import_classnames$14.default)(className, outOfRangeCls),
			handleReset,
			value: formatValue,
			focused,
			triggerFocus: focus,
			suffix: getSuffix(),
			disabled,
			classes,
			classNames: classNames$41,
			styles,
			ref: holderRef
		}), getInputElement());
	});
	Input_default = Input;
}));
var es_exports$8 = {};
__export(es_exports$8, {
	BaseInput: () => BaseInput_default,
	default: () => es_default$11
});
var es_default$11;
var init_es$8 = __esmMin((() => {
	init_BaseInput();
	init_Input();
	es_default$11 = Input_default;
}));
var import_react$36, DrawerContext, RefContext, context_default;
var init_context = __esmMin((() => {
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
	DrawerContext = /* @__PURE__ */ import_react$36.createContext(null);
	RefContext = /* @__PURE__ */ import_react$36.createContext({});
	context_default = DrawerContext;
}));
var import_classnames$13, import_react$35, _excluded$11, DrawerPanel, DrawerPanel_default;
var init_DrawerPanel = __esmMin((() => {
	init_extends();
	init_objectWithoutProperties();
	import_classnames$13 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_pickAttrs();
	init_ref();
	_excluded$11 = [
		"prefixCls",
		"className",
		"containerRef"
	];
	DrawerPanel = function DrawerPanel$1(props) {
		var prefixCls = props.prefixCls, className = props.className, containerRef = props.containerRef, restProps = _objectWithoutProperties(props, _excluded$11);
		var _React$useContext = import_react$35.useContext(RefContext), panelRef = _React$useContext.panel;
		var mergedRef = useComposeRef(panelRef, containerRef);
		return /* @__PURE__ */ import_react$35.createElement("div", _extends({
			className: (0, import_classnames$13.default)("".concat(prefixCls, "-content"), className),
			role: "dialog",
			ref: mergedRef
		}, pickAttrs(props, { aria: true }), { "aria-modal": "true" }, restProps));
	};
	DrawerPanel_default = DrawerPanel;
}));
function parseWidthHeight(value) {
	if (typeof value === "string" && String(Number(value)) === value) {
		warning_default(false, "Invalid value type of `width` or `height` which should be number type instead.");
		return Number(value);
	}
	return value;
}
var init_util$2 = __esmMin((() => {
	init_warning();
}));
function DrawerPopup(props, ref) {
	var _ref, _pushConfig$distance, _pushConfig;
	var prefixCls = props.prefixCls, open = props.open, placement = props.placement, inline = props.inline, push = props.push, forceRender = props.forceRender, autoFocus = props.autoFocus, keyboard = props.keyboard, drawerClassNames = props.classNames, rootClassName = props.rootClassName, rootStyle = props.rootStyle, zIndex = props.zIndex, className = props.className, id = props.id, style = props.style, motion = props.motion, width = props.width, height = props.height, children = props.children, mask = props.mask, maskClosable = props.maskClosable, maskMotion = props.maskMotion, maskClassName = props.maskClassName, maskStyle = props.maskStyle, afterOpenChange = props.afterOpenChange, onClose = props.onClose, onMouseEnter = props.onMouseEnter, onMouseOver = props.onMouseOver, onMouseLeave = props.onMouseLeave, onClick = props.onClick, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, styles = props.styles, drawerRender = props.drawerRender;
	var panelRef = import_react$34.useRef();
	var sentinelStartRef = import_react$34.useRef();
	var sentinelEndRef = import_react$34.useRef();
	import_react$34.useImperativeHandle(ref, function() {
		return panelRef.current;
	});
	var onPanelKeyDown = function onPanelKeyDown$1(event) {
		var keyCode = event.keyCode, shiftKey = event.shiftKey;
		switch (keyCode) {
			case KeyCode_default.TAB:
				if (keyCode === KeyCode_default.TAB) {
					if (!shiftKey && document.activeElement === sentinelEndRef.current) {
						var _sentinelStartRef$cur;
						(_sentinelStartRef$cur = sentinelStartRef.current) === null || _sentinelStartRef$cur === void 0 || _sentinelStartRef$cur.focus({ preventScroll: true });
					} else if (shiftKey && document.activeElement === sentinelStartRef.current) {
						var _sentinelEndRef$curre;
						(_sentinelEndRef$curre = sentinelEndRef.current) === null || _sentinelEndRef$curre === void 0 || _sentinelEndRef$curre.focus({ preventScroll: true });
					}
				}
				break;
			case KeyCode_default.ESC:
				if (onClose && keyboard) {
					event.stopPropagation();
					onClose(event);
				}
				break;
		}
	};
	import_react$34.useEffect(function() {
		if (open && autoFocus) {
			var _panelRef$current;
			(_panelRef$current = panelRef.current) === null || _panelRef$current === void 0 || _panelRef$current.focus({ preventScroll: true });
		}
	}, [open]);
	var _React$useState = import_react$34.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), pushed = _React$useState2[0], setPushed = _React$useState2[1];
	var parentContext = import_react$34.useContext(context_default);
	var pushConfig;
	if (typeof push === "boolean") pushConfig = push ? {} : { distance: 0 };
	else pushConfig = push || {};
	var pushDistance = (_ref = (_pushConfig$distance = (_pushConfig = pushConfig) === null || _pushConfig === void 0 ? void 0 : _pushConfig.distance) !== null && _pushConfig$distance !== void 0 ? _pushConfig$distance : parentContext === null || parentContext === void 0 ? void 0 : parentContext.pushDistance) !== null && _ref !== void 0 ? _ref : 180;
	var mergedContext = import_react$34.useMemo(function() {
		return {
			pushDistance,
			push: function push$1() {
				setPushed(true);
			},
			pull: function pull() {
				setPushed(false);
			}
		};
	}, [pushDistance]);
	import_react$34.useEffect(function() {
		if (open) {
			var _parentContext$push;
			parentContext === null || parentContext === void 0 || (_parentContext$push = parentContext.push) === null || _parentContext$push === void 0 || _parentContext$push.call(parentContext);
		} else {
			var _parentContext$pull;
			parentContext === null || parentContext === void 0 || (_parentContext$pull = parentContext.pull) === null || _parentContext$pull === void 0 || _parentContext$pull.call(parentContext);
		}
	}, [open]);
	import_react$34.useEffect(function() {
		return function() {
			var _parentContext$pull2;
			parentContext === null || parentContext === void 0 || (_parentContext$pull2 = parentContext.pull) === null || _parentContext$pull2 === void 0 || _parentContext$pull2.call(parentContext);
		};
	}, []);
	var maskNode = /* @__PURE__ */ import_react$34.createElement(es_default$4, _extends({ key: "mask" }, maskMotion, { visible: mask && open }), function(_ref2, maskRef) {
		var motionMaskClassName = _ref2.className, motionMaskStyle = _ref2.style;
		return /* @__PURE__ */ import_react$34.createElement("div", {
			className: (0, import_classnames$12.default)("".concat(prefixCls, "-mask"), motionMaskClassName, drawerClassNames === null || drawerClassNames === void 0 ? void 0 : drawerClassNames.mask, maskClassName),
			style: _objectSpread2(_objectSpread2(_objectSpread2({}, motionMaskStyle), maskStyle), styles === null || styles === void 0 ? void 0 : styles.mask),
			onClick: maskClosable && open ? onClose : void 0,
			ref: maskRef
		});
	});
	var motionProps = typeof motion === "function" ? motion(placement) : motion;
	var wrapperStyle = {};
	if (pushed && pushDistance) switch (placement) {
		case "top":
			wrapperStyle.transform = "translateY(".concat(pushDistance, "px)");
			break;
		case "bottom":
			wrapperStyle.transform = "translateY(".concat(-pushDistance, "px)");
			break;
		case "left":
			wrapperStyle.transform = "translateX(".concat(pushDistance, "px)");
			break;
		default:
			wrapperStyle.transform = "translateX(".concat(-pushDistance, "px)");
			break;
	}
	if (placement === "left" || placement === "right") wrapperStyle.width = parseWidthHeight(width);
	else wrapperStyle.height = parseWidthHeight(height);
	var eventHandlers = {
		onMouseEnter,
		onMouseOver,
		onMouseLeave,
		onClick,
		onKeyDown,
		onKeyUp
	};
	var panelNode = /* @__PURE__ */ import_react$34.createElement(es_default$4, _extends({ key: "panel" }, motionProps, {
		visible: open,
		forceRender,
		onVisibleChanged: function onVisibleChanged(nextVisible) {
			afterOpenChange === null || afterOpenChange === void 0 || afterOpenChange(nextVisible);
		},
		removeOnLeave: false,
		leavedClassName: "".concat(prefixCls, "-content-wrapper-hidden")
	}), function(_ref3, motionRef) {
		var motionClassName = _ref3.className, motionStyle = _ref3.style;
		var content = /* @__PURE__ */ import_react$34.createElement(DrawerPanel_default, _extends({
			id,
			containerRef: motionRef,
			prefixCls,
			className: (0, import_classnames$12.default)(className, drawerClassNames === null || drawerClassNames === void 0 ? void 0 : drawerClassNames.content),
			style: _objectSpread2(_objectSpread2({}, style), styles === null || styles === void 0 ? void 0 : styles.content)
		}, pickAttrs(props, { aria: true }), eventHandlers), children);
		return /* @__PURE__ */ import_react$34.createElement("div", _extends({
			className: (0, import_classnames$12.default)("".concat(prefixCls, "-content-wrapper"), drawerClassNames === null || drawerClassNames === void 0 ? void 0 : drawerClassNames.wrapper, motionClassName),
			style: _objectSpread2(_objectSpread2(_objectSpread2({}, wrapperStyle), motionStyle), styles === null || styles === void 0 ? void 0 : styles.wrapper)
		}, pickAttrs(props, { data: true })), drawerRender ? drawerRender(content) : content);
	});
	var containerStyle = _objectSpread2({}, rootStyle);
	if (zIndex) containerStyle.zIndex = zIndex;
	return /* @__PURE__ */ import_react$34.createElement(context_default.Provider, { value: mergedContext }, /* @__PURE__ */ import_react$34.createElement("div", {
		className: (0, import_classnames$12.default)(prefixCls, "".concat(prefixCls, "-").concat(placement), rootClassName, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-open"), open), "".concat(prefixCls, "-inline"), inline)),
		style: containerStyle,
		tabIndex: -1,
		ref: panelRef,
		onKeyDown: onPanelKeyDown
	}, maskNode, /* @__PURE__ */ import_react$34.createElement("div", {
		tabIndex: 0,
		ref: sentinelStartRef,
		style: sentinelStyle,
		"aria-hidden": "true",
		"data-sentinel": "start"
	}), panelNode, /* @__PURE__ */ import_react$34.createElement("div", {
		tabIndex: 0,
		ref: sentinelEndRef,
		style: sentinelStyle,
		"aria-hidden": "true",
		"data-sentinel": "end"
	})));
}
var import_classnames$12, import_react$34, sentinelStyle, RefDrawerPopup, DrawerPopup_default;
var init_DrawerPopup = __esmMin((() => {
	init_defineProperty();
	init_extends();
	init_objectSpread2();
	init_slicedToArray();
	import_classnames$12 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$17();
	init_KeyCode();
	init_pickAttrs();
	import_react$34 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_DrawerPanel();
	init_util$2();
	sentinelStyle = {
		width: 0,
		height: 0,
		overflow: "hidden",
		outline: "none",
		position: "absolute"
	};
	RefDrawerPopup = /* @__PURE__ */ import_react$34.forwardRef(DrawerPopup);
	DrawerPopup_default = RefDrawerPopup;
}));
var import_react$33, Drawer, Drawer_default;
var init_Drawer = __esmMin((() => {
	init_objectSpread2();
	init_slicedToArray();
	init_es$21();
	init_useLayoutEffect$2();
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_DrawerPopup();
	init_util$2();
	Drawer = function Drawer$1(props) {
		var _props$open = props.open, open = _props$open === void 0 ? false : _props$open, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-drawer" : _props$prefixCls, _props$placement = props.placement, placement = _props$placement === void 0 ? "right" : _props$placement, _props$autoFocus = props.autoFocus, autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus, _props$keyboard = props.keyboard, keyboard = _props$keyboard === void 0 ? true : _props$keyboard, _props$width = props.width, width = _props$width === void 0 ? 378 : _props$width, _props$mask = props.mask, mask = _props$mask === void 0 ? true : _props$mask, _props$maskClosable = props.maskClosable, maskClosable = _props$maskClosable === void 0 ? true : _props$maskClosable, getContainer = props.getContainer, forceRender = props.forceRender, afterOpenChange = props.afterOpenChange, destroyOnClose = props.destroyOnClose, onMouseEnter = props.onMouseEnter, onMouseOver = props.onMouseOver, onMouseLeave = props.onMouseLeave, onClick = props.onClick, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, panelRef = props.panelRef;
		var _React$useState = import_react$33.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), animatedVisible = _React$useState2[0], setAnimatedVisible = _React$useState2[1];
		var _React$useState3 = import_react$33.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), mounted = _React$useState4[0], setMounted = _React$useState4[1];
		useLayoutEffect_default(function() {
			setMounted(true);
		}, []);
		var mergedOpen = mounted ? open : false;
		var popupRef = import_react$33.useRef();
		var lastActiveRef = import_react$33.useRef();
		useLayoutEffect_default(function() {
			if (mergedOpen) lastActiveRef.current = document.activeElement;
		}, [mergedOpen]);
		var internalAfterOpenChange = function internalAfterOpenChange$1(nextVisible) {
			var _popupRef$current;
			setAnimatedVisible(nextVisible);
			afterOpenChange === null || afterOpenChange === void 0 || afterOpenChange(nextVisible);
			if (!nextVisible && lastActiveRef.current && !((_popupRef$current = popupRef.current) !== null && _popupRef$current !== void 0 && _popupRef$current.contains(lastActiveRef.current))) {
				var _lastActiveRef$curren;
				(_lastActiveRef$curren = lastActiveRef.current) === null || _lastActiveRef$curren === void 0 || _lastActiveRef$curren.focus({ preventScroll: true });
			}
		};
		var refContext = import_react$33.useMemo(function() {
			return { panel: panelRef };
		}, [panelRef]);
		if (!forceRender && !animatedVisible && !mergedOpen && destroyOnClose) return null;
		var eventHandlers = {
			onMouseEnter,
			onMouseOver,
			onMouseLeave,
			onClick,
			onKeyDown,
			onKeyUp
		};
		var drawerPopupProps = _objectSpread2(_objectSpread2({}, props), {}, {
			open: mergedOpen,
			prefixCls,
			placement,
			autoFocus,
			keyboard,
			width,
			mask,
			maskClosable,
			inline: getContainer === false,
			afterOpenChange: internalAfterOpenChange,
			ref: popupRef
		}, eventHandlers);
		return /* @__PURE__ */ import_react$33.createElement(RefContext.Provider, { value: refContext }, /* @__PURE__ */ import_react$33.createElement(es_default$10, {
			open: mergedOpen || forceRender || animatedVisible,
			autoDestroy: false,
			getContainer,
			autoLock: mask && (mergedOpen || animatedVisible)
		}, /* @__PURE__ */ import_react$33.createElement(DrawerPopup_default, drawerPopupProps)));
	};
	Drawer_default = Drawer;
}));
var es_exports$7 = {};
__export(es_exports$7, { default: () => es_default$9 });
var es_default$9;
var init_es$7 = __esmMin((() => {
	init_Drawer();
	es_default$9 = Drawer_default;
}));
function calculateNodeStyling(node) {
	var useCache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
	var nodeRef = node.getAttribute("id") || node.getAttribute("data-reactid") || node.getAttribute("name");
	if (useCache && computedStyleCache[nodeRef]) return computedStyleCache[nodeRef];
	var style = window.getComputedStyle(node);
	var boxSizing = style.getPropertyValue("box-sizing") || style.getPropertyValue("-moz-box-sizing") || style.getPropertyValue("-webkit-box-sizing");
	var paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
	var borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
	var sizingStyle = SIZING_STYLE.map(function(name) {
		return "".concat(name, ":").concat(style.getPropertyValue(name));
	}).join(";");
	var nodeInfo = {
		sizingStyle,
		paddingSize,
		borderSize,
		boxSizing
	};
	if (useCache && nodeRef) computedStyleCache[nodeRef] = nodeInfo;
	return nodeInfo;
}
function calculateAutoSizeStyle(uiTextNode) {
	var useCache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
	var minRows = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
	var maxRows = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
	if (!hiddenTextarea) {
		hiddenTextarea = document.createElement("textarea");
		hiddenTextarea.setAttribute("tab-index", "-1");
		hiddenTextarea.setAttribute("aria-hidden", "true");
		hiddenTextarea.setAttribute("name", "hiddenTextarea");
		document.body.appendChild(hiddenTextarea);
	}
	if (uiTextNode.getAttribute("wrap")) hiddenTextarea.setAttribute("wrap", uiTextNode.getAttribute("wrap"));
	else hiddenTextarea.removeAttribute("wrap");
	var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache), paddingSize = _calculateNodeStyling.paddingSize, borderSize = _calculateNodeStyling.borderSize, boxSizing = _calculateNodeStyling.boxSizing, sizingStyle = _calculateNodeStyling.sizingStyle;
	hiddenTextarea.setAttribute("style", "".concat(sizingStyle, ";").concat(HIDDEN_TEXTAREA_STYLE));
	hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "";
	var minHeight = void 0;
	var maxHeight = void 0;
	var overflowY;
	var height = hiddenTextarea.scrollHeight;
	if (boxSizing === "border-box") height += borderSize;
	else if (boxSizing === "content-box") height -= paddingSize;
	if (minRows !== null || maxRows !== null) {
		hiddenTextarea.value = " ";
		var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
		if (minRows !== null) {
			minHeight = singleRowHeight * minRows;
			if (boxSizing === "border-box") minHeight = minHeight + paddingSize + borderSize;
			height = Math.max(minHeight, height);
		}
		if (maxRows !== null) {
			maxHeight = singleRowHeight * maxRows;
			if (boxSizing === "border-box") maxHeight = maxHeight + paddingSize + borderSize;
			overflowY = height > maxHeight ? "" : "hidden";
			height = Math.min(maxHeight, height);
		}
	}
	var style = {
		height,
		overflowY,
		resize: "none"
	};
	if (minHeight) style.minHeight = minHeight;
	if (maxHeight) style.maxHeight = maxHeight;
	return style;
}
var HIDDEN_TEXTAREA_STYLE, SIZING_STYLE, computedStyleCache, hiddenTextarea;
var init_calculateNodeHeight = __esmMin((() => {
	HIDDEN_TEXTAREA_STYLE = "\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important;\n  pointer-events: none !important;\n";
	SIZING_STYLE = [
		"letter-spacing",
		"line-height",
		"padding-top",
		"padding-bottom",
		"font-family",
		"font-weight",
		"font-size",
		"font-variant",
		"text-rendering",
		"text-transform",
		"width",
		"text-indent",
		"padding-left",
		"padding-right",
		"border-width",
		"box-sizing",
		"word-break",
		"white-space"
	];
	computedStyleCache = {};
}));
var import_classnames$11, import_react$32, _excluded$10, RESIZE_START, RESIZE_MEASURING, RESIZE_STABLE, ResizableTextArea, ResizableTextArea_default;
var init_ResizableTextArea = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_typeof();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_classnames$11 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$20();
	init_useLayoutEffect$2();
	init_useMergedState();
	init_raf();
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	init_calculateNodeHeight();
	_excluded$10 = [
		"prefixCls",
		"defaultValue",
		"value",
		"autoSize",
		"onResize",
		"className",
		"style",
		"disabled",
		"onChange",
		"onInternalAutoSize"
	];
	RESIZE_START = 0;
	RESIZE_MEASURING = 1;
	RESIZE_STABLE = 2;
	ResizableTextArea = /* @__PURE__ */ import_react$32.forwardRef(function(props, ref) {
		var _ref = props, prefixCls = _ref.prefixCls, defaultValue = _ref.defaultValue, value = _ref.value, autoSize = _ref.autoSize, onResize = _ref.onResize, className = _ref.className, style = _ref.style, disabled = _ref.disabled, onChange = _ref.onChange;
		_ref.onInternalAutoSize;
		var restProps = _objectWithoutProperties(_ref, _excluded$10);
		var _useMergedState = useMergedState(defaultValue, {
			value,
			postState: function postState(val) {
				return val !== null && val !== void 0 ? val : "";
			}
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setMergedValue = _useMergedState2[1];
		var onInternalChange = function onInternalChange$1(event) {
			setMergedValue(event.target.value);
			onChange === null || onChange === void 0 || onChange(event);
		};
		var textareaRef = import_react$32.useRef();
		import_react$32.useImperativeHandle(ref, function() {
			return { textArea: textareaRef.current };
		});
		var _React$useMemo = import_react$32.useMemo(function() {
			if (autoSize && _typeof(autoSize) === "object") return [autoSize.minRows, autoSize.maxRows];
			return [];
		}, [autoSize]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), minRows = _React$useMemo2[0], maxRows = _React$useMemo2[1];
		var needAutoSize = !!autoSize;
		var _React$useState = import_react$32.useState(RESIZE_STABLE), _React$useState2 = _slicedToArray(_React$useState, 2), resizeState = _React$useState2[0], setResizeState = _React$useState2[1];
		var _React$useState3 = import_react$32.useState(), _React$useState4 = _slicedToArray(_React$useState3, 2), autoSizeStyle = _React$useState4[0], setAutoSizeStyle = _React$useState4[1];
		var startResize = function startResize$1() {
			setResizeState(RESIZE_START);
		};
		useLayoutEffect_default(function() {
			if (needAutoSize) startResize();
		}, [
			value,
			minRows,
			maxRows,
			needAutoSize
		]);
		useLayoutEffect_default(function() {
			if (resizeState === RESIZE_START) setResizeState(RESIZE_MEASURING);
			else if (resizeState === RESIZE_MEASURING) {
				var textareaStyles = calculateAutoSizeStyle(textareaRef.current, false, minRows, maxRows);
				setResizeState(RESIZE_STABLE);
				setAutoSizeStyle(textareaStyles);
			}
		}, [resizeState]);
		var resizeRafRef = import_react$32.useRef();
		var cleanRaf = function cleanRaf$1() {
			raf_default.cancel(resizeRafRef.current);
		};
		var onInternalResize = function onInternalResize$1(size) {
			if (resizeState === RESIZE_STABLE) {
				onResize === null || onResize === void 0 || onResize(size);
				if (autoSize) {
					cleanRaf();
					resizeRafRef.current = raf_default(function() {
						startResize();
					});
				}
			}
		};
		import_react$32.useEffect(function() {
			return cleanRaf;
		}, []);
		var mergedAutoSizeStyle = needAutoSize ? autoSizeStyle : null;
		var mergedStyle = _objectSpread2(_objectSpread2({}, style), mergedAutoSizeStyle);
		if (resizeState === RESIZE_START || resizeState === RESIZE_MEASURING) {
			mergedStyle.overflowY = "hidden";
			mergedStyle.overflowX = "hidden";
		}
		return /* @__PURE__ */ import_react$32.createElement(es_default$8, {
			onResize: onInternalResize,
			disabled: !(autoSize || onResize)
		}, /* @__PURE__ */ import_react$32.createElement("textarea", _extends({}, restProps, {
			ref: textareaRef,
			style: mergedStyle,
			className: (0, import_classnames$11.default)(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled)),
			disabled,
			value: mergedValue,
			onChange: onInternalChange
		})));
	});
	ResizableTextArea_default = ResizableTextArea;
}));
var import_classnames$10, import_react$31, _excluded$9, TextArea, TextArea_default;
var init_TextArea = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_toConsumableArray();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_classnames$10 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$8();
	init_useCount();
	init_commonUtils();
	init_useMergedState();
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	init_ResizableTextArea();
	_excluded$9 = [
		"defaultValue",
		"value",
		"onFocus",
		"onBlur",
		"onChange",
		"allowClear",
		"maxLength",
		"onCompositionStart",
		"onCompositionEnd",
		"suffix",
		"prefixCls",
		"showCount",
		"count",
		"className",
		"style",
		"disabled",
		"hidden",
		"classNames",
		"styles",
		"onResize",
		"onClear",
		"onPressEnter",
		"readOnly",
		"autoSize",
		"onKeyDown"
	];
	TextArea = /* @__PURE__ */ import_react$31.forwardRef(function(_ref, ref) {
		var _countConfig$max;
		var defaultValue = _ref.defaultValue, customValue = _ref.value, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onChange = _ref.onChange, allowClear = _ref.allowClear, maxLength = _ref.maxLength, onCompositionStart = _ref.onCompositionStart, onCompositionEnd = _ref.onCompositionEnd, suffix = _ref.suffix, _ref$prefixCls = _ref.prefixCls, prefixCls = _ref$prefixCls === void 0 ? "rc-textarea" : _ref$prefixCls, showCount = _ref.showCount, count = _ref.count, className = _ref.className, style = _ref.style, disabled = _ref.disabled, hidden = _ref.hidden, classNames$41 = _ref.classNames, styles = _ref.styles, onResize = _ref.onResize, onClear = _ref.onClear, onPressEnter = _ref.onPressEnter, readOnly = _ref.readOnly, autoSize = _ref.autoSize, onKeyDown = _ref.onKeyDown, rest = _objectWithoutProperties(_ref, _excluded$9);
		var _useMergedState = useMergedState(defaultValue, {
			value: customValue,
			defaultValue
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), value = _useMergedState2[0], setValue = _useMergedState2[1];
		var formatValue = value === void 0 || value === null ? "" : String(value);
		var _React$useState = import_react$31.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focused = _React$useState2[0], setFocused = _React$useState2[1];
		var compositionRef = import_react$31.useRef(false);
		var _React$useState3 = import_react$31.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), textareaResized = _React$useState4[0], setTextareaResized = _React$useState4[1];
		var holderRef = (0, import_react$31.useRef)(null);
		var resizableTextAreaRef = (0, import_react$31.useRef)(null);
		var getTextArea = function getTextArea$1() {
			var _resizableTextAreaRef;
			return (_resizableTextAreaRef = resizableTextAreaRef.current) === null || _resizableTextAreaRef === void 0 ? void 0 : _resizableTextAreaRef.textArea;
		};
		var focus = function focus$1() {
			getTextArea().focus();
		};
		(0, import_react$31.useImperativeHandle)(ref, function() {
			var _holderRef$current;
			return {
				resizableTextArea: resizableTextAreaRef.current,
				focus,
				blur: function blur() {
					getTextArea().blur();
				},
				nativeElement: ((_holderRef$current = holderRef.current) === null || _holderRef$current === void 0 ? void 0 : _holderRef$current.nativeElement) || getTextArea()
			};
		});
		(0, import_react$31.useEffect)(function() {
			setFocused(function(prev) {
				return !disabled && prev;
			});
		}, [disabled]);
		var _React$useState5 = import_react$31.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), selection = _React$useState6[0], setSelection = _React$useState6[1];
		import_react$31.useEffect(function() {
			if (selection) {
				var _getTextArea;
				(_getTextArea = getTextArea()).setSelectionRange.apply(_getTextArea, _toConsumableArray(selection));
			}
		}, [selection]);
		var countConfig = useCount(count, showCount);
		var mergedMax = (_countConfig$max = countConfig.max) !== null && _countConfig$max !== void 0 ? _countConfig$max : maxLength;
		var hasMaxLength = Number(mergedMax) > 0;
		var valueLength = countConfig.strategy(formatValue);
		var isOutOfRange = !!mergedMax && valueLength > mergedMax;
		var triggerChange = function triggerChange$1(e, currentValue) {
			var cutValue = currentValue;
			if (!compositionRef.current && countConfig.exceedFormatter && countConfig.max && countConfig.strategy(currentValue) > countConfig.max) {
				cutValue = countConfig.exceedFormatter(currentValue, { max: countConfig.max });
				if (currentValue !== cutValue) setSelection([getTextArea().selectionStart || 0, getTextArea().selectionEnd || 0]);
			}
			setValue(cutValue);
			resolveOnChange(e.currentTarget, e, onChange, cutValue);
		};
		var onInternalCompositionStart = function onInternalCompositionStart$1(e) {
			compositionRef.current = true;
			onCompositionStart === null || onCompositionStart === void 0 || onCompositionStart(e);
		};
		var onInternalCompositionEnd = function onInternalCompositionEnd$1(e) {
			compositionRef.current = false;
			triggerChange(e, e.currentTarget.value);
			onCompositionEnd === null || onCompositionEnd === void 0 || onCompositionEnd(e);
		};
		var onInternalChange = function onInternalChange$1(e) {
			triggerChange(e, e.target.value);
		};
		var handleKeyDown = function handleKeyDown$1(e) {
			if (e.key === "Enter" && onPressEnter) onPressEnter(e);
			onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
		};
		var handleFocus = function handleFocus$1(e) {
			setFocused(true);
			onFocus === null || onFocus === void 0 || onFocus(e);
		};
		var handleBlur = function handleBlur$1(e) {
			setFocused(false);
			onBlur === null || onBlur === void 0 || onBlur(e);
		};
		var handleReset = function handleReset$1(e) {
			setValue("");
			focus();
			resolveOnChange(getTextArea(), e, onChange);
		};
		var suffixNode = suffix;
		var dataCount;
		if (countConfig.show) {
			if (countConfig.showFormatter) dataCount = countConfig.showFormatter({
				value: formatValue,
				count: valueLength,
				maxLength: mergedMax
			});
			else dataCount = "".concat(valueLength).concat(hasMaxLength ? " / ".concat(mergedMax) : "");
			suffixNode = /* @__PURE__ */ import_react$31.createElement(import_react$31.Fragment, null, suffixNode, /* @__PURE__ */ import_react$31.createElement("span", {
				className: (0, import_classnames$10.default)("".concat(prefixCls, "-data-count"), classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.count),
				style: styles === null || styles === void 0 ? void 0 : styles.count
			}, dataCount));
		}
		var handleResize = function handleResize$1(size) {
			var _getTextArea2;
			onResize === null || onResize === void 0 || onResize(size);
			if ((_getTextArea2 = getTextArea()) !== null && _getTextArea2 !== void 0 && _getTextArea2.style.height) setTextareaResized(true);
		};
		var isPureTextArea = !autoSize && !showCount && !allowClear;
		return /* @__PURE__ */ import_react$31.createElement(BaseInput_default, {
			ref: holderRef,
			value: formatValue,
			allowClear,
			handleReset,
			suffix: suffixNode,
			prefixCls,
			classNames: _objectSpread2(_objectSpread2({}, classNames$41), {}, { affixWrapper: (0, import_classnames$10.default)(classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.affixWrapper, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-show-count"), showCount), "".concat(prefixCls, "-textarea-allow-clear"), allowClear)) }),
			disabled,
			focused,
			className: (0, import_classnames$10.default)(className, isOutOfRange && "".concat(prefixCls, "-out-of-range")),
			style: _objectSpread2(_objectSpread2({}, style), textareaResized && !isPureTextArea ? { height: "auto" } : {}),
			dataAttrs: { affixWrapper: { "data-count": typeof dataCount === "string" ? dataCount : void 0 } },
			hidden,
			readOnly,
			onClear
		}, /* @__PURE__ */ import_react$31.createElement(ResizableTextArea_default, _extends({}, rest, {
			autoSize,
			maxLength,
			onKeyDown: handleKeyDown,
			onChange: onInternalChange,
			onFocus: handleFocus,
			onBlur: handleBlur,
			onCompositionStart: onInternalCompositionStart,
			onCompositionEnd: onInternalCompositionEnd,
			className: (0, import_classnames$10.default)(classNames$41 === null || classNames$41 === void 0 ? void 0 : classNames$41.textarea),
			style: _objectSpread2(_objectSpread2({}, styles === null || styles === void 0 ? void 0 : styles.textarea), {}, { resize: style === null || style === void 0 ? void 0 : style.resize }),
			disabled,
			prefixCls,
			onResize: handleResize,
			ref: resizableTextAreaRef,
			readOnly
		})));
	});
	TextArea_default = TextArea;
}));
var es_exports$6 = {};
__export(es_exports$6, {
	ResizableTextArea: () => ResizableTextArea_default,
	default: () => es_default$7
});
var es_default$7;
var init_es$6 = __esmMin((() => {
	init_TextArea();
	init_ResizableTextArea();
	es_default$7 = TextArea_default;
}));
var locale, zh_CN_default;
var init_zh_CN = __esmMin((() => {
	locale = {
		items_per_page: "条/页",
		jump_to: "跳至",
		jump_to_confirm: "确定",
		page: "页",
		prev_page: "上一页",
		next_page: "下一页",
		prev_5: "向前 5 页",
		next_5: "向后 5 页",
		prev_3: "向前 3 页",
		next_3: "向后 3 页",
		page_size: "页码"
	};
	zh_CN_default = locale;
}));
var import_react$30, defaultPageSizeOptions, Options, Options_default;
var init_Options = __esmMin((() => {
	init_slicedToArray();
	init_KeyCode();
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	defaultPageSizeOptions = [
		10,
		20,
		50,
		100
	];
	Options = function Options$1(props) {
		var _props$pageSizeOption = props.pageSizeOptions, pageSizeOptions = _props$pageSizeOption === void 0 ? defaultPageSizeOptions : _props$pageSizeOption, locale$1 = props.locale, changeSize = props.changeSize, pageSize = props.pageSize, goButton = props.goButton, quickGo = props.quickGo, rootPrefixCls = props.rootPrefixCls, disabled = props.disabled, buildOptionText = props.buildOptionText, showSizeChanger = props.showSizeChanger, sizeChangerRender = props.sizeChangerRender;
		var _React$useState = import_react$30.useState(""), _React$useState2 = _slicedToArray(_React$useState, 2), goInputText = _React$useState2[0], setGoInputText = _React$useState2[1];
		var getValidValue = function getValidValue$1() {
			return !goInputText || Number.isNaN(goInputText) ? void 0 : Number(goInputText);
		};
		var mergeBuildOptionText = typeof buildOptionText === "function" ? buildOptionText : function(value) {
			return "".concat(value, " ").concat(locale$1.items_per_page);
		};
		var handleChange = function handleChange$1(e) {
			setGoInputText(e.target.value);
		};
		var handleBlur = function handleBlur$1(e) {
			if (goButton || goInputText === "") return;
			setGoInputText("");
			if (e.relatedTarget && (e.relatedTarget.className.indexOf("".concat(rootPrefixCls, "-item-link")) >= 0 || e.relatedTarget.className.indexOf("".concat(rootPrefixCls, "-item")) >= 0)) return;
			quickGo === null || quickGo === void 0 || quickGo(getValidValue());
		};
		var go = function go$1(e) {
			if (goInputText === "") return;
			if (e.keyCode === KeyCode_default.ENTER || e.type === "click") {
				setGoInputText("");
				quickGo === null || quickGo === void 0 || quickGo(getValidValue());
			}
		};
		var getPageSizeOptions = function getPageSizeOptions$1() {
			if (pageSizeOptions.some(function(option) {
				return option.toString() === pageSize.toString();
			})) return pageSizeOptions;
			return pageSizeOptions.concat([pageSize]).sort(function(a, b) {
				var numberA = Number.isNaN(Number(a)) ? 0 : Number(a);
				var numberB = Number.isNaN(Number(b)) ? 0 : Number(b);
				return numberA - numberB;
			});
		};
		var prefixCls = "".concat(rootPrefixCls, "-options");
		if (!showSizeChanger && !quickGo) return null;
		var changeSelect = null;
		var goInput = null;
		var gotoButton = null;
		if (showSizeChanger && sizeChangerRender) changeSelect = sizeChangerRender({
			disabled,
			size: pageSize,
			onSizeChange: function onSizeChange(nextValue) {
				changeSize === null || changeSize === void 0 || changeSize(Number(nextValue));
			},
			"aria-label": locale$1.page_size,
			className: "".concat(prefixCls, "-size-changer"),
			options: getPageSizeOptions().map(function(opt) {
				return {
					label: mergeBuildOptionText(opt),
					value: opt
				};
			})
		});
		if (quickGo) {
			if (goButton) gotoButton = typeof goButton === "boolean" ? /* @__PURE__ */ import_react$30.createElement("button", {
				type: "button",
				onClick: go,
				onKeyUp: go,
				disabled,
				className: "".concat(prefixCls, "-quick-jumper-button")
			}, locale$1.jump_to_confirm) : /* @__PURE__ */ import_react$30.createElement("span", {
				onClick: go,
				onKeyUp: go
			}, goButton);
			goInput = /* @__PURE__ */ import_react$30.createElement("div", { className: "".concat(prefixCls, "-quick-jumper") }, locale$1.jump_to, /* @__PURE__ */ import_react$30.createElement("input", {
				disabled,
				type: "text",
				value: goInputText,
				onChange: handleChange,
				onKeyUp: go,
				onBlur: handleBlur,
				"aria-label": locale$1.page
			}), locale$1.page, gotoButton);
		}
		return /* @__PURE__ */ import_react$30.createElement("li", { className: prefixCls }, changeSelect, goInput);
	};
	Options_default = Options;
}));
var import_classnames$9, import_react$29, Pager, Pager_default;
var init_Pager = __esmMin((() => {
	init_defineProperty();
	import_classnames$9 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	Pager = function Pager$1(props) {
		var rootPrefixCls = props.rootPrefixCls, page = props.page, active = props.active, className = props.className, showTitle = props.showTitle, onClick = props.onClick, onKeyPress = props.onKeyPress, itemRender = props.itemRender;
		var prefixCls = "".concat(rootPrefixCls, "-item");
		var cls = (0, import_classnames$9.default)(prefixCls, "".concat(prefixCls, "-").concat(page), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-active"), active), "".concat(prefixCls, "-disabled"), !page), className);
		var handleClick = function handleClick$1() {
			onClick(page);
		};
		var handleKeyPress = function handleKeyPress$1(e) {
			onKeyPress(e, onClick, page);
		};
		var pager = itemRender(page, "page", /* @__PURE__ */ import_react$29.createElement("a", { rel: "nofollow" }, page));
		return pager ? /* @__PURE__ */ import_react$29.createElement("li", {
			title: showTitle ? String(page) : null,
			className: cls,
			onClick: handleClick,
			onKeyDown: handleKeyPress,
			tabIndex: 0
		}, pager) : null;
	};
	Pager_default = Pager;
}));
function noop$1() {}
function isInteger(v) {
	var value = Number(v);
	return typeof value === "number" && !Number.isNaN(value) && isFinite(value) && Math.floor(value) === value;
}
function calculatePage(p, pageSize, total) {
	var _pageSize = typeof p === "undefined" ? pageSize : p;
	return Math.floor((total - 1) / _pageSize) + 1;
}
var import_classnames$8, import_react$28, defaultItemRender, Pagination, Pagination_default;
var init_Pagination = __esmMin((() => {
	init_defineProperty();
	init_extends();
	init_typeof();
	init_objectSpread2();
	init_slicedToArray();
	import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
	init_useMergedState();
	init_KeyCode();
	init_pickAttrs();
	init_warning();
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_zh_CN();
	init_Options();
	init_Pager();
	defaultItemRender = function defaultItemRender$1(page, type, element) {
		return element;
	};
	Pagination = function Pagination$1(props) {
		var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-pagination" : _props$prefixCls, _props$selectPrefixCl = props.selectPrefixCls, selectPrefixCls = _props$selectPrefixCl === void 0 ? "rc-select" : _props$selectPrefixCl, className = props.className, currentProp = props.current, _props$defaultCurrent = props.defaultCurrent, defaultCurrent = _props$defaultCurrent === void 0 ? 1 : _props$defaultCurrent, _props$total = props.total, total = _props$total === void 0 ? 0 : _props$total, pageSizeProp = props.pageSize, _props$defaultPageSiz = props.defaultPageSize, defaultPageSize = _props$defaultPageSiz === void 0 ? 10 : _props$defaultPageSiz, _props$onChange = props.onChange, onChange = _props$onChange === void 0 ? noop$1 : _props$onChange, hideOnSinglePage = props.hideOnSinglePage, align = props.align, _props$showPrevNextJu = props.showPrevNextJumpers, showPrevNextJumpers = _props$showPrevNextJu === void 0 ? true : _props$showPrevNextJu, showQuickJumper = props.showQuickJumper, showLessItems = props.showLessItems, _props$showTitle = props.showTitle, showTitle = _props$showTitle === void 0 ? true : _props$showTitle, _props$onShowSizeChan = props.onShowSizeChange, onShowSizeChange = _props$onShowSizeChan === void 0 ? noop$1 : _props$onShowSizeChan, _props$locale = props.locale, locale$1 = _props$locale === void 0 ? zh_CN_default : _props$locale, style = props.style, _props$totalBoundaryS = props.totalBoundaryShowSizeChanger, totalBoundaryShowSizeChanger = _props$totalBoundaryS === void 0 ? 50 : _props$totalBoundaryS, disabled = props.disabled, simple = props.simple, showTotal = props.showTotal, _props$showSizeChange = props.showSizeChanger, showSizeChanger = _props$showSizeChange === void 0 ? total > totalBoundaryShowSizeChanger : _props$showSizeChange, sizeChangerRender = props.sizeChangerRender, pageSizeOptions = props.pageSizeOptions, _props$itemRender = props.itemRender, itemRender = _props$itemRender === void 0 ? defaultItemRender : _props$itemRender, jumpPrevIcon = props.jumpPrevIcon, jumpNextIcon = props.jumpNextIcon, prevIcon = props.prevIcon, nextIcon = props.nextIcon;
		var paginationRef = import_react$28.useRef(null);
		var _useMergedState = useMergedState(10, {
			value: pageSizeProp,
			defaultValue: defaultPageSize
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), pageSize = _useMergedState2[0], setPageSize = _useMergedState2[1];
		var _useMergedState3 = useMergedState(1, {
			value: currentProp,
			defaultValue: defaultCurrent,
			postState: function postState(c) {
				return Math.max(1, Math.min(c, calculatePage(void 0, pageSize, total)));
			}
		}), _useMergedState4 = _slicedToArray(_useMergedState3, 2), current = _useMergedState4[0], setCurrent = _useMergedState4[1];
		var _React$useState = import_react$28.useState(current), _React$useState2 = _slicedToArray(_React$useState, 2), internalInputVal = _React$useState2[0], setInternalInputVal = _React$useState2[1];
		(0, import_react$28.useEffect)(function() {
			setInternalInputVal(current);
		}, [current]);
		"current" in props;
		var jumpPrevPage = Math.max(1, current - (showLessItems ? 3 : 5));
		var jumpNextPage = Math.min(calculatePage(void 0, pageSize, total), current + (showLessItems ? 3 : 5));
		function getItemIcon(icon, label) {
			var iconNode = icon || /* @__PURE__ */ import_react$28.createElement("button", {
				type: "button",
				"aria-label": label,
				className: "".concat(prefixCls, "-item-link")
			});
			if (typeof icon === "function") iconNode = /* @__PURE__ */ import_react$28.createElement(icon, _objectSpread2({}, props));
			return iconNode;
		}
		function getValidValue(e) {
			var inputValue = e.target.value;
			var allPages$1 = calculatePage(void 0, pageSize, total);
			var value;
			if (inputValue === "") value = inputValue;
			else if (Number.isNaN(Number(inputValue))) value = internalInputVal;
			else if (inputValue >= allPages$1) value = allPages$1;
			else value = Number(inputValue);
			return value;
		}
		function isValid(page) {
			return isInteger(page) && page !== current && isInteger(total) && total > 0;
		}
		var shouldDisplayQuickJumper = total > pageSize ? showQuickJumper : false;
		function handleKeyDown(event) {
			if (event.keyCode === KeyCode_default.UP || event.keyCode === KeyCode_default.DOWN) event.preventDefault();
		}
		function handleKeyUp(event) {
			var value = getValidValue(event);
			if (value !== internalInputVal) setInternalInputVal(value);
			switch (event.keyCode) {
				case KeyCode_default.ENTER:
					handleChange(value);
					break;
				case KeyCode_default.UP:
					handleChange(value - 1);
					break;
				case KeyCode_default.DOWN:
					handleChange(value + 1);
					break;
				default: break;
			}
		}
		function handleBlur(event) {
			handleChange(getValidValue(event));
		}
		function changePageSize(size) {
			var newCurrent = calculatePage(size, pageSize, total);
			var nextCurrent = current > newCurrent && newCurrent !== 0 ? newCurrent : current;
			setPageSize(size);
			setInternalInputVal(nextCurrent);
			onShowSizeChange === null || onShowSizeChange === void 0 || onShowSizeChange(current, size);
			setCurrent(nextCurrent);
			onChange === null || onChange === void 0 || onChange(nextCurrent, size);
		}
		function handleChange(page) {
			if (isValid(page) && !disabled) {
				var currentPage = calculatePage(void 0, pageSize, total);
				var newPage = page;
				if (page > currentPage) newPage = currentPage;
				else if (page < 1) newPage = 1;
				if (newPage !== internalInputVal) setInternalInputVal(newPage);
				setCurrent(newPage);
				onChange === null || onChange === void 0 || onChange(newPage, pageSize);
				return newPage;
			}
			return current;
		}
		var hasPrev = current > 1;
		var hasNext = current < calculatePage(void 0, pageSize, total);
		function prevHandle() {
			if (hasPrev) handleChange(current - 1);
		}
		function nextHandle() {
			if (hasNext) handleChange(current + 1);
		}
		function jumpPrevHandle() {
			handleChange(jumpPrevPage);
		}
		function jumpNextHandle() {
			handleChange(jumpNextPage);
		}
		function runIfEnter(event, callback) {
			if (event.key === "Enter" || event.charCode === KeyCode_default.ENTER || event.keyCode === KeyCode_default.ENTER) {
				for (var _len = arguments.length, restParams = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) restParams[_key - 2] = arguments[_key];
				callback.apply(void 0, restParams);
			}
		}
		function runIfEnterPrev(event) {
			runIfEnter(event, prevHandle);
		}
		function runIfEnterNext(event) {
			runIfEnter(event, nextHandle);
		}
		function runIfEnterJumpPrev(event) {
			runIfEnter(event, jumpPrevHandle);
		}
		function runIfEnterJumpNext(event) {
			runIfEnter(event, jumpNextHandle);
		}
		function renderPrev(prevPage$1) {
			var prevButton = itemRender(prevPage$1, "prev", getItemIcon(prevIcon, "prev page"));
			return /* @__PURE__ */ import_react$28.isValidElement(prevButton) ? /* @__PURE__ */ import_react$28.cloneElement(prevButton, { disabled: !hasPrev }) : prevButton;
		}
		function renderNext(nextPage$1) {
			var nextButton = itemRender(nextPage$1, "next", getItemIcon(nextIcon, "next page"));
			return /* @__PURE__ */ import_react$28.isValidElement(nextButton) ? /* @__PURE__ */ import_react$28.cloneElement(nextButton, { disabled: !hasNext }) : nextButton;
		}
		function handleGoTO(event) {
			if (event.type === "click" || event.keyCode === KeyCode_default.ENTER) handleChange(internalInputVal);
		}
		var jumpPrev = null;
		var dataOrAriaAttributeProps = pickAttrs(props, {
			aria: true,
			data: true
		});
		var totalText = showTotal && /* @__PURE__ */ import_react$28.createElement("li", { className: "".concat(prefixCls, "-total-text") }, showTotal(total, [total === 0 ? 0 : (current - 1) * pageSize + 1, current * pageSize > total ? total : current * pageSize]));
		var jumpNext = null;
		var allPages = calculatePage(void 0, pageSize, total);
		if (hideOnSinglePage && total <= pageSize) return null;
		var pagerList = [];
		var pagerProps = {
			rootPrefixCls: prefixCls,
			onClick: handleChange,
			onKeyPress: runIfEnter,
			showTitle,
			itemRender,
			page: -1
		};
		var prevPage = current - 1 > 0 ? current - 1 : 0;
		var nextPage = current + 1 < allPages ? current + 1 : allPages;
		var goButton = showQuickJumper && showQuickJumper.goButton;
		var isReadOnly = _typeof(simple) === "object" ? simple.readOnly : !simple;
		var gotoButton = goButton;
		var simplePager = null;
		if (simple) {
			if (goButton) {
				if (typeof goButton === "boolean") gotoButton = /* @__PURE__ */ import_react$28.createElement("button", {
					type: "button",
					onClick: handleGoTO,
					onKeyUp: handleGoTO
				}, locale$1.jump_to_confirm);
				else gotoButton = /* @__PURE__ */ import_react$28.createElement("span", {
					onClick: handleGoTO,
					onKeyUp: handleGoTO
				}, goButton);
				gotoButton = /* @__PURE__ */ import_react$28.createElement("li", {
					title: showTitle ? "".concat(locale$1.jump_to).concat(current, "/").concat(allPages) : null,
					className: "".concat(prefixCls, "-simple-pager")
				}, gotoButton);
			}
			simplePager = /* @__PURE__ */ import_react$28.createElement("li", {
				title: showTitle ? "".concat(current, "/").concat(allPages) : null,
				className: "".concat(prefixCls, "-simple-pager")
			}, isReadOnly ? internalInputVal : /* @__PURE__ */ import_react$28.createElement("input", {
				type: "text",
				"aria-label": locale$1.jump_to,
				value: internalInputVal,
				disabled,
				onKeyDown: handleKeyDown,
				onKeyUp: handleKeyUp,
				onChange: handleKeyUp,
				onBlur: handleBlur,
				size: 3
			}), /* @__PURE__ */ import_react$28.createElement("span", { className: "".concat(prefixCls, "-slash") }, "/"), allPages);
		}
		var pageBufferSize = showLessItems ? 1 : 2;
		if (allPages <= 3 + pageBufferSize * 2) {
			if (!allPages) pagerList.push(/* @__PURE__ */ import_react$28.createElement(Pager_default, _extends({}, pagerProps, {
				key: "noPager",
				page: 1,
				className: "".concat(prefixCls, "-item-disabled")
			})));
			for (var i = 1; i <= allPages; i += 1) pagerList.push(/* @__PURE__ */ import_react$28.createElement(Pager_default, _extends({}, pagerProps, {
				key: i,
				page: i,
				active: current === i
			})));
		} else {
			var prevItemTitle = showLessItems ? locale$1.prev_3 : locale$1.prev_5;
			var nextItemTitle = showLessItems ? locale$1.next_3 : locale$1.next_5;
			var jumpPrevContent = itemRender(jumpPrevPage, "jump-prev", getItemIcon(jumpPrevIcon, "prev page"));
			var jumpNextContent = itemRender(jumpNextPage, "jump-next", getItemIcon(jumpNextIcon, "next page"));
			if (showPrevNextJumpers) {
				jumpPrev = jumpPrevContent ? /* @__PURE__ */ import_react$28.createElement("li", {
					title: showTitle ? prevItemTitle : null,
					key: "prev",
					onClick: jumpPrevHandle,
					tabIndex: 0,
					onKeyDown: runIfEnterJumpPrev,
					className: (0, import_classnames$8.default)("".concat(prefixCls, "-jump-prev"), _defineProperty({}, "".concat(prefixCls, "-jump-prev-custom-icon"), !!jumpPrevIcon))
				}, jumpPrevContent) : null;
				jumpNext = jumpNextContent ? /* @__PURE__ */ import_react$28.createElement("li", {
					title: showTitle ? nextItemTitle : null,
					key: "next",
					onClick: jumpNextHandle,
					tabIndex: 0,
					onKeyDown: runIfEnterJumpNext,
					className: (0, import_classnames$8.default)("".concat(prefixCls, "-jump-next"), _defineProperty({}, "".concat(prefixCls, "-jump-next-custom-icon"), !!jumpNextIcon))
				}, jumpNextContent) : null;
			}
			var left = Math.max(1, current - pageBufferSize);
			var right = Math.min(current + pageBufferSize, allPages);
			if (current - 1 <= pageBufferSize) right = 1 + pageBufferSize * 2;
			if (allPages - current <= pageBufferSize) left = allPages - pageBufferSize * 2;
			for (var _i = left; _i <= right; _i += 1) pagerList.push(/* @__PURE__ */ import_react$28.createElement(Pager_default, _extends({}, pagerProps, {
				key: _i,
				page: _i,
				active: current === _i
			})));
			if (current - 1 >= pageBufferSize * 2 && current !== 3) {
				pagerList[0] = /* @__PURE__ */ import_react$28.cloneElement(pagerList[0], { className: (0, import_classnames$8.default)("".concat(prefixCls, "-item-after-jump-prev"), pagerList[0].props.className) });
				pagerList.unshift(jumpPrev);
			}
			if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
				var lastOne = pagerList[pagerList.length - 1];
				pagerList[pagerList.length - 1] = /* @__PURE__ */ import_react$28.cloneElement(lastOne, { className: (0, import_classnames$8.default)("".concat(prefixCls, "-item-before-jump-next"), lastOne.props.className) });
				pagerList.push(jumpNext);
			}
			if (left !== 1) pagerList.unshift(/* @__PURE__ */ import_react$28.createElement(Pager_default, _extends({}, pagerProps, {
				key: 1,
				page: 1
			})));
			if (right !== allPages) pagerList.push(/* @__PURE__ */ import_react$28.createElement(Pager_default, _extends({}, pagerProps, {
				key: allPages,
				page: allPages
			})));
		}
		var prev = renderPrev(prevPage);
		if (prev) {
			var prevDisabled = !hasPrev || !allPages;
			prev = /* @__PURE__ */ import_react$28.createElement("li", {
				title: showTitle ? locale$1.prev_page : null,
				onClick: prevHandle,
				tabIndex: prevDisabled ? null : 0,
				onKeyDown: runIfEnterPrev,
				className: (0, import_classnames$8.default)("".concat(prefixCls, "-prev"), _defineProperty({}, "".concat(prefixCls, "-disabled"), prevDisabled)),
				"aria-disabled": prevDisabled
			}, prev);
		}
		var next = renderNext(nextPage);
		if (next) {
			var nextDisabled, nextTabIndex;
			if (simple) {
				nextDisabled = !hasNext;
				nextTabIndex = hasPrev ? 0 : null;
			} else {
				nextDisabled = !hasNext || !allPages;
				nextTabIndex = nextDisabled ? null : 0;
			}
			next = /* @__PURE__ */ import_react$28.createElement("li", {
				title: showTitle ? locale$1.next_page : null,
				onClick: nextHandle,
				tabIndex: nextTabIndex,
				onKeyDown: runIfEnterNext,
				className: (0, import_classnames$8.default)("".concat(prefixCls, "-next"), _defineProperty({}, "".concat(prefixCls, "-disabled"), nextDisabled)),
				"aria-disabled": nextDisabled
			}, next);
		}
		var cls = (0, import_classnames$8.default)(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-start"), align === "start"), "".concat(prefixCls, "-center"), align === "center"), "".concat(prefixCls, "-end"), align === "end"), "".concat(prefixCls, "-simple"), simple), "".concat(prefixCls, "-disabled"), disabled));
		return /* @__PURE__ */ import_react$28.createElement("ul", _extends({
			className: cls,
			style,
			ref: paginationRef
		}, dataOrAriaAttributeProps), totalText, prev, simple ? simplePager : pagerList, next, /* @__PURE__ */ import_react$28.createElement(Options_default, {
			locale: locale$1,
			rootPrefixCls: prefixCls,
			disabled,
			selectPrefixCls,
			changeSize: changePageSize,
			pageSize,
			pageSizeOptions,
			quickGo: shouldDisplayQuickJumper ? handleChange : null,
			goButton: gotoButton,
			showSizeChanger,
			sizeChangerRender
		}));
	};
	Pagination_default = Pagination;
}));
var es_exports$5 = {};
__export(es_exports$5, { default: () => Pagination_default });
var init_es$5 = __esmMin((() => {
	init_Pagination();
}));
var import_react$27, defaultProps, useTransitionDuration;
var init_common = __esmMin((() => {
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	defaultProps = {
		percent: 0,
		prefixCls: "rc-progress",
		strokeColor: "#2db7f5",
		strokeLinecap: "round",
		strokeWidth: 1,
		trailColor: "#D9D9D9",
		trailWidth: 1,
		gapPosition: "bottom"
	};
	useTransitionDuration = function useTransitionDuration$1() {
		var pathsRef = (0, import_react$27.useRef)([]);
		var prevTimeStamp = (0, import_react$27.useRef)(null);
		(0, import_react$27.useEffect)(function() {
			var now$1 = Date.now();
			var updated = false;
			pathsRef.current.forEach(function(path) {
				if (!path) return;
				updated = true;
				var pathStyle = path.style;
				pathStyle.transitionDuration = ".3s, .3s, .3s, .06s";
				if (prevTimeStamp.current && now$1 - prevTimeStamp.current < 100) pathStyle.transitionDuration = "0s, 0s";
			});
			if (updated) prevTimeStamp.current = Date.now();
		});
		return pathsRef.current;
	};
}));
var import_react$26, import_classnames$7, _excluded$8, Line, Line_default;
var init_Line = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_objectWithoutProperties();
	import_react$26 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames());
	init_common();
	_excluded$8 = [
		"className",
		"percent",
		"prefixCls",
		"strokeColor",
		"strokeLinecap",
		"strokeWidth",
		"style",
		"trailColor",
		"trailWidth",
		"transition"
	];
	Line = function Line$1(props) {
		var _defaultProps$props = _objectSpread2(_objectSpread2({}, defaultProps), props), className = _defaultProps$props.className, percent = _defaultProps$props.percent, prefixCls = _defaultProps$props.prefixCls, strokeColor = _defaultProps$props.strokeColor, strokeLinecap = _defaultProps$props.strokeLinecap, strokeWidth = _defaultProps$props.strokeWidth, style = _defaultProps$props.style, trailColor = _defaultProps$props.trailColor, trailWidth = _defaultProps$props.trailWidth, transition = _defaultProps$props.transition, restProps = _objectWithoutProperties(_defaultProps$props, _excluded$8);
		delete restProps.gapPosition;
		var percentList = Array.isArray(percent) ? percent : [percent];
		var strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];
		var paths = useTransitionDuration();
		var center = strokeWidth / 2;
		var right = 100 - strokeWidth / 2;
		var pathString = "M ".concat(strokeLinecap === "round" ? center : 0, ",").concat(center, "\n         L ").concat(strokeLinecap === "round" ? right : 100, ",").concat(center);
		var viewBoxString = "0 0 100 ".concat(strokeWidth);
		var stackPtg = 0;
		return /* @__PURE__ */ import_react$26.createElement("svg", _extends({
			className: (0, import_classnames$7.default)("".concat(prefixCls, "-line"), className),
			viewBox: viewBoxString,
			preserveAspectRatio: "none",
			style
		}, restProps), /* @__PURE__ */ import_react$26.createElement("path", {
			className: "".concat(prefixCls, "-line-trail"),
			d: pathString,
			strokeLinecap,
			stroke: trailColor,
			strokeWidth: trailWidth || strokeWidth,
			fillOpacity: "0"
		}), percentList.map(function(ptg, index$1) {
			var dashPercent = 1;
			switch (strokeLinecap) {
				case "round":
					dashPercent = 1 - strokeWidth / 100;
					break;
				case "square":
					dashPercent = 1 - strokeWidth / 2 / 100;
					break;
				default:
					dashPercent = 1;
					break;
			}
			var pathStyle = {
				strokeDasharray: "".concat(ptg * dashPercent, "px, 100px"),
				strokeDashoffset: "-".concat(stackPtg, "px"),
				transition: transition || "stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear"
			};
			var color = strokeColorList[index$1] || strokeColorList[strokeColorList.length - 1];
			stackPtg += ptg;
			return /* @__PURE__ */ import_react$26.createElement("path", {
				key: index$1,
				className: "".concat(prefixCls, "-line-path"),
				d: pathString,
				strokeLinecap,
				stroke: color,
				strokeWidth,
				fillOpacity: "0",
				ref: function ref(elem) {
					paths[index$1] = elem;
				},
				style: pathStyle
			});
		}));
	};
	Line_default = Line;
}));
function getUUID() {
	var retId;
	/* istanbul ignore if */
	if (isBrowserClient) {
		retId = uuid;
		uuid += 1;
	} else retId = "TEST_OR_SSR";
	return retId;
}
var import_react$25, uuid, isBrowserClient, useId_default;
var init_useId = __esmMin((() => {
	init_slicedToArray();
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	init_canUseDom();
	uuid = 0;
	isBrowserClient = canUseDom();
	useId_default = (function(id) {
		var _React$useState = import_react$25.useState(), _React$useState2 = _slicedToArray(_React$useState, 2), innerId = _React$useState2[0], setInnerId = _React$useState2[1];
		import_react$25.useEffect(function() {
			setInnerId("rc_progress_".concat(getUUID()));
		}, []);
		return id || innerId;
	});
}));
function getPtgColors(color, scale) {
	return Object.keys(color).map(function(key) {
		var parsedKey = parseFloat(key);
		var ptgKey = "".concat(Math.floor(parsedKey * scale), "%");
		return "".concat(color[key], " ").concat(ptgKey);
	});
}
var import_react$24, Block, PtgCircle, PtgCircle_default;
var init_PtgCircle = __esmMin((() => {
	init_typeof();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	Block = function Block$1(_ref) {
		var bg = _ref.bg, children = _ref.children;
		return /* @__PURE__ */ import_react$24.createElement("div", { style: {
			width: "100%",
			height: "100%",
			background: bg
		} }, children);
	};
	PtgCircle = /* @__PURE__ */ import_react$24.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, color = props.color, gradientId = props.gradientId, radius = props.radius, circleStyleForStack = props.style, ptg = props.ptg, strokeLinecap = props.strokeLinecap, strokeWidth = props.strokeWidth, size = props.size, gapDegree = props.gapDegree;
		var isGradient = color && _typeof(color) === "object";
		var stroke = isGradient ? "#FFF" : void 0;
		var halfSize = size / 2;
		var circleNode = /* @__PURE__ */ import_react$24.createElement("circle", {
			className: "".concat(prefixCls, "-circle-path"),
			r: radius,
			cx: halfSize,
			cy: halfSize,
			stroke,
			strokeLinecap,
			strokeWidth,
			opacity: ptg === 0 ? 0 : 1,
			style: circleStyleForStack,
			ref
		});
		if (!isGradient) return circleNode;
		var maskId = "".concat(gradientId, "-conic");
		var fromDeg = gapDegree ? "".concat(180 + gapDegree / 2, "deg") : "0deg";
		var conicColors = getPtgColors(color, (360 - gapDegree) / 360);
		var linearColors = getPtgColors(color, 1);
		var conicColorBg = "conic-gradient(from ".concat(fromDeg, ", ").concat(conicColors.join(", "), ")");
		var linearColorBg = "linear-gradient(to ".concat(gapDegree ? "bottom" : "top", ", ").concat(linearColors.join(", "), ")");
		return /* @__PURE__ */ import_react$24.createElement(import_react$24.Fragment, null, /* @__PURE__ */ import_react$24.createElement("mask", { id: maskId }, circleNode), /* @__PURE__ */ import_react$24.createElement("foreignObject", {
			x: 0,
			y: 0,
			width: size,
			height: size,
			mask: "url(#".concat(maskId, ")")
		}, /* @__PURE__ */ import_react$24.createElement(Block, { bg: linearColorBg }, /* @__PURE__ */ import_react$24.createElement(Block, { bg: conicColorBg }))));
	});
	PtgCircle_default = PtgCircle;
}));
var VIEW_BOX_SIZE, getCircleStyle;
var init_util$1 = __esmMin((() => {
	VIEW_BOX_SIZE = 100;
	getCircleStyle = function getCircleStyle$1(perimeter, perimeterWithoutGap, offset, percent, rotateDeg, gapDegree, gapPosition, strokeColor, strokeLinecap, strokeWidth) {
		var stepSpace = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : 0;
		var offsetDeg = offset / 100 * 360 * ((360 - gapDegree) / 360);
		var positionDeg = gapDegree === 0 ? 0 : {
			bottom: 0,
			top: 180,
			left: 90,
			right: -90
		}[gapPosition];
		var strokeDashoffset = (100 - percent) / 100 * perimeterWithoutGap;
		if (strokeLinecap === "round" && percent !== 100) {
			strokeDashoffset += strokeWidth / 2;
			if (strokeDashoffset >= perimeterWithoutGap) strokeDashoffset = perimeterWithoutGap - .01;
		}
		var halfSize = VIEW_BOX_SIZE / 2;
		return {
			stroke: typeof strokeColor === "string" ? strokeColor : void 0,
			strokeDasharray: "".concat(perimeterWithoutGap, "px ").concat(perimeter),
			strokeDashoffset: strokeDashoffset + stepSpace,
			transform: "rotate(".concat(rotateDeg + offsetDeg + positionDeg, "deg)"),
			transformOrigin: "".concat(halfSize, "px ").concat(halfSize, "px"),
			transition: "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s",
			fillOpacity: 0
		};
	};
}));
function toArray$2(value) {
	var mergedValue = value !== null && value !== void 0 ? value : [];
	return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}
var import_react$23, import_classnames$6, _excluded$7, Circle, Circle_default;
var init_Circle = __esmMin((() => {
	init_extends();
	init_typeof();
	init_objectSpread2();
	init_objectWithoutProperties();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames());
	init_common();
	init_useId();
	init_PtgCircle();
	init_util$1();
	_excluded$7 = [
		"id",
		"prefixCls",
		"steps",
		"strokeWidth",
		"trailWidth",
		"gapDegree",
		"gapPosition",
		"trailColor",
		"strokeLinecap",
		"style",
		"className",
		"strokeColor",
		"percent"
	];
	Circle = function Circle$1(props) {
		var _defaultProps$props = _objectSpread2(_objectSpread2({}, defaultProps), props), id = _defaultProps$props.id, prefixCls = _defaultProps$props.prefixCls, steps = _defaultProps$props.steps, strokeWidth = _defaultProps$props.strokeWidth, trailWidth = _defaultProps$props.trailWidth, _defaultProps$props$g = _defaultProps$props.gapDegree, gapDegree = _defaultProps$props$g === void 0 ? 0 : _defaultProps$props$g, gapPosition = _defaultProps$props.gapPosition, trailColor = _defaultProps$props.trailColor, strokeLinecap = _defaultProps$props.strokeLinecap, style = _defaultProps$props.style, className = _defaultProps$props.className, strokeColor = _defaultProps$props.strokeColor, percent = _defaultProps$props.percent, restProps = _objectWithoutProperties(_defaultProps$props, _excluded$7);
		var halfSize = VIEW_BOX_SIZE / 2;
		var mergedId = useId_default(id);
		var gradientId = "".concat(mergedId, "-gradient");
		var radius = halfSize - strokeWidth / 2;
		var perimeter = Math.PI * 2 * radius;
		var rotateDeg = gapDegree > 0 ? 90 + gapDegree / 2 : -90;
		var perimeterWithoutGap = perimeter * ((360 - gapDegree) / 360);
		var _ref = _typeof(steps) === "object" ? steps : {
			count: steps,
			gap: 2
		}, stepCount = _ref.count, stepGap = _ref.gap;
		var percentList = toArray$2(percent);
		var strokeColorList = toArray$2(strokeColor);
		var gradient = strokeColorList.find(function(color) {
			return color && _typeof(color) === "object";
		});
		var isConicGradient = gradient && _typeof(gradient) === "object";
		var mergedStrokeLinecap = isConicGradient ? "butt" : strokeLinecap;
		var circleStyle = getCircleStyle(perimeter, perimeterWithoutGap, 0, 100, rotateDeg, gapDegree, gapPosition, trailColor, mergedStrokeLinecap, strokeWidth);
		var paths = useTransitionDuration();
		var getStokeList = function getStokeList$1() {
			var stackPtg = 0;
			return percentList.map(function(ptg, index$1) {
				var color = strokeColorList[index$1] || strokeColorList[strokeColorList.length - 1];
				var circleStyleForStack = getCircleStyle(perimeter, perimeterWithoutGap, stackPtg, ptg, rotateDeg, gapDegree, gapPosition, color, mergedStrokeLinecap, strokeWidth);
				stackPtg += ptg;
				return /* @__PURE__ */ import_react$23.createElement(PtgCircle_default, {
					key: index$1,
					color,
					ptg,
					radius,
					prefixCls,
					gradientId,
					style: circleStyleForStack,
					strokeLinecap: mergedStrokeLinecap,
					strokeWidth,
					gapDegree,
					ref: function ref(elem) {
						paths[index$1] = elem;
					},
					size: VIEW_BOX_SIZE
				});
			}).reverse();
		};
		var getStepStokeList = function getStepStokeList$1() {
			var current = Math.round(stepCount * (percentList[0] / 100));
			var stepPtg = 100 / stepCount;
			var stackPtg = 0;
			return new Array(stepCount).fill(null).map(function(_, index$1) {
				var color = index$1 <= current - 1 ? strokeColorList[0] : trailColor;
				var stroke = color && _typeof(color) === "object" ? "url(#".concat(gradientId, ")") : void 0;
				var circleStyleForStack = getCircleStyle(perimeter, perimeterWithoutGap, stackPtg, stepPtg, rotateDeg, gapDegree, gapPosition, color, "butt", strokeWidth, stepGap);
				stackPtg += (perimeterWithoutGap - circleStyleForStack.strokeDashoffset + stepGap) * 100 / perimeterWithoutGap;
				return /* @__PURE__ */ import_react$23.createElement("circle", {
					key: index$1,
					className: "".concat(prefixCls, "-circle-path"),
					r: radius,
					cx: halfSize,
					cy: halfSize,
					stroke,
					strokeWidth,
					opacity: 1,
					style: circleStyleForStack,
					ref: function ref(elem) {
						paths[index$1] = elem;
					}
				});
			});
		};
		return /* @__PURE__ */ import_react$23.createElement("svg", _extends({
			className: (0, import_classnames$6.default)("".concat(prefixCls, "-circle"), className),
			viewBox: "0 0 ".concat(VIEW_BOX_SIZE, " ").concat(VIEW_BOX_SIZE),
			style,
			id,
			role: "presentation"
		}, restProps), !stepCount && /* @__PURE__ */ import_react$23.createElement("circle", {
			className: "".concat(prefixCls, "-circle-trail"),
			r: radius,
			cx: halfSize,
			cy: halfSize,
			stroke: trailColor,
			strokeLinecap: mergedStrokeLinecap,
			strokeWidth: trailWidth || strokeWidth,
			style: circleStyle
		}), stepCount ? getStepStokeList() : getStokeList());
	};
	Circle_default = Circle;
}));
var es_exports$4 = {};
__export(es_exports$4, {
	Circle: () => Circle_default,
	Line: () => Line_default,
	default: () => es_default$6
});
var es_default$6;
var init_es$4 = __esmMin((() => {
	init_Line();
	init_Circle();
	es_default$6 = {
		Line: Line_default,
		Circle: Circle_default
	};
}));
function _createForOfIteratorHelper(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (!t) {
		if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
			t && (r = t);
			var _n = 0, F = function F$1() {};
			return {
				s: F,
				n: function n() {
					return _n >= r.length ? { done: !0 } : {
						done: !1,
						value: r[_n++]
					};
				},
				e: function e$1(r$1) {
					throw r$1;
				},
				f: F
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var o, a = !0, u = !1;
	return {
		s: function s() {
			t = t.call(r);
		},
		n: function n() {
			var r$1 = t.next();
			return a = r$1.done, r$1;
		},
		e: function e$1(r$1) {
			u = !0, o = r$1;
		},
		f: function f() {
			try {
				a || null == t["return"] || t["return"]();
			} finally {
				if (u) throw o;
			}
		}
	};
}
var init_createForOfIteratorHelper = __esmMin((() => {
	init_unsupportedIterableToArray();
}));
var es_exports$3 = {};
__export(es_exports$3, { default: () => es_default$5 });
var import_react$22, import_classnames$5, _excluded$6, Switch, es_default$5;
var init_es$3 = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
	init_useMergedState();
	init_KeyCode();
	_excluded$6 = [
		"prefixCls",
		"className",
		"checked",
		"defaultChecked",
		"disabled",
		"loadingIcon",
		"checkedChildren",
		"unCheckedChildren",
		"onClick",
		"onChange",
		"onKeyDown"
	];
	Switch = /* @__PURE__ */ import_react$22.forwardRef(function(_ref, ref) {
		var _classNames;
		var _ref$prefixCls = _ref.prefixCls, prefixCls = _ref$prefixCls === void 0 ? "rc-switch" : _ref$prefixCls, className = _ref.className, checked = _ref.checked, defaultChecked = _ref.defaultChecked, disabled = _ref.disabled, loadingIcon = _ref.loadingIcon, checkedChildren = _ref.checkedChildren, unCheckedChildren = _ref.unCheckedChildren, onClick = _ref.onClick, onChange = _ref.onChange, onKeyDown = _ref.onKeyDown, restProps = _objectWithoutProperties(_ref, _excluded$6);
		var _useMergedState = useMergedState(false, {
			value: checked,
			defaultValue: defaultChecked
		}), _useMergedState2 = _slicedToArray(_useMergedState, 2), innerChecked = _useMergedState2[0], setInnerChecked = _useMergedState2[1];
		function triggerChange(newChecked, event) {
			var mergedChecked = innerChecked;
			if (!disabled) {
				mergedChecked = newChecked;
				setInnerChecked(mergedChecked);
				onChange === null || onChange === void 0 || onChange(mergedChecked, event);
			}
			return mergedChecked;
		}
		function onInternalKeyDown(e) {
			if (e.which === KeyCode_default.LEFT) triggerChange(false, e);
			else if (e.which === KeyCode_default.RIGHT) triggerChange(true, e);
			onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
		}
		function onInternalClick(e) {
			var ret = triggerChange(!innerChecked, e);
			onClick === null || onClick === void 0 || onClick(ret, e);
		}
		var switchClassName = (0, import_classnames$5.default)(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-checked"), innerChecked), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
		return /* @__PURE__ */ import_react$22.createElement("button", _extends({}, restProps, {
			type: "button",
			role: "switch",
			"aria-checked": innerChecked,
			disabled,
			className: switchClassName,
			ref,
			onKeyDown: onInternalKeyDown,
			onClick: onInternalClick
		}), loadingIcon, /* @__PURE__ */ import_react$22.createElement("span", { className: "".concat(prefixCls, "-inner") }, /* @__PURE__ */ import_react$22.createElement("span", { className: "".concat(prefixCls, "-inner-checked") }, checkedChildren), /* @__PURE__ */ import_react$22.createElement("span", { className: "".concat(prefixCls, "-inner-unchecked") }, unCheckedChildren)));
	});
	Switch.displayName = "Switch";
	es_default$5 = Switch;
}));
var import_react$21, TreeContext, UnstableContext;
var init_contextTypes = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	TreeContext = /* @__PURE__ */ import_react$21.createContext(null);
	UnstableContext = /* @__PURE__ */ import_react$21.createContext({});
}));
var import_classnames$4, import_react$20, Indent, Indent_default;
var init_Indent = __esmMin((() => {
	init_defineProperty();
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	Indent = function Indent$1(_ref) {
		var prefixCls = _ref.prefixCls, level = _ref.level, isStart = _ref.isStart, isEnd = _ref.isEnd;
		var baseClassName = "".concat(prefixCls, "-indent-unit");
		var list = [];
		for (var i = 0; i < level; i += 1) list.push(/* @__PURE__ */ import_react$20.createElement("span", {
			key: i,
			className: (0, import_classnames$4.default)(baseClassName, _defineProperty(_defineProperty({}, "".concat(baseClassName, "-start"), isStart[i]), "".concat(baseClassName, "-end"), isEnd[i]))
		}));
		return /* @__PURE__ */ import_react$20.createElement("span", {
			"aria-hidden": "true",
			className: "".concat(prefixCls, "-indent")
		}, list);
	};
	Indent_default = /* @__PURE__ */ import_react$20.memo(Indent);
}));
var import_react$19, import_classnames$3, _excluded$5, ICON_OPEN, ICON_CLOSE, defaultTitle, TreeNode$1, TreeNode_default$1;
var init_TreeNode$1 = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames());
	init_pickAttrs();
	init_contextTypes();
	init_Indent();
	init_keyUtil();
	init_treeUtil();
	_excluded$5 = [
		"eventKey",
		"className",
		"style",
		"dragOver",
		"dragOverGapTop",
		"dragOverGapBottom",
		"isLeaf",
		"isStart",
		"isEnd",
		"expanded",
		"selected",
		"checked",
		"halfChecked",
		"loading",
		"domRef",
		"active",
		"data",
		"onMouseMove",
		"selectable"
	];
	ICON_OPEN = "open";
	ICON_CLOSE = "close";
	defaultTitle = "---";
	TreeNode$1 = function TreeNode$2(props) {
		var _unstableContext$node, _context$filterTreeNo, _classNames4;
		var eventKey = props.eventKey, className = props.className, style = props.style, dragOver = props.dragOver, dragOverGapTop = props.dragOverGapTop, dragOverGapBottom = props.dragOverGapBottom, isLeaf = props.isLeaf, isStart = props.isStart, isEnd = props.isEnd, expanded = props.expanded, selected = props.selected, checked = props.checked, halfChecked = props.halfChecked, loading = props.loading, domRef = props.domRef, active = props.active, data = props.data, onMouseMove = props.onMouseMove, selectable = props.selectable, otherProps = _objectWithoutProperties(props, _excluded$5);
		var context = import_react$19.useContext(TreeContext);
		var unstableContext = import_react$19.useContext(UnstableContext);
		var selectHandleRef = import_react$19.useRef(null);
		var _React$useState = import_react$19.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), dragNodeHighlight = _React$useState2[0], setDragNodeHighlight = _React$useState2[1];
		var isDisabled = !!(context.disabled || props.disabled || (_unstableContext$node = unstableContext.nodeDisabled) !== null && _unstableContext$node !== void 0 && _unstableContext$node.call(unstableContext, data));
		var isCheckable = import_react$19.useMemo(function() {
			if (!context.checkable || props.checkable === false) return false;
			return context.checkable;
		}, [context.checkable, props.checkable]);
		var onSelect = function onSelect$1(e) {
			if (isDisabled) return;
			context.onNodeSelect(e, convertNodePropsToEventData(props));
		};
		var onCheck = function onCheck$1(e) {
			if (isDisabled) return;
			if (!isCheckable || props.disableCheckbox) return;
			context.onNodeCheck(e, convertNodePropsToEventData(props), !checked);
		};
		var isSelectable = import_react$19.useMemo(function() {
			if (typeof selectable === "boolean") return selectable;
			return context.selectable;
		}, [selectable, context.selectable]);
		var onSelectorClick = function onSelectorClick$1(e) {
			context.onNodeClick(e, convertNodePropsToEventData(props));
			if (isSelectable) onSelect(e);
			else onCheck(e);
		};
		var onSelectorDoubleClick = function onSelectorDoubleClick$1(e) {
			context.onNodeDoubleClick(e, convertNodePropsToEventData(props));
		};
		var onMouseEnter = function onMouseEnter$1(e) {
			context.onNodeMouseEnter(e, convertNodePropsToEventData(props));
		};
		var onMouseLeave = function onMouseLeave$1(e) {
			context.onNodeMouseLeave(e, convertNodePropsToEventData(props));
		};
		var onContextMenu = function onContextMenu$1(e) {
			context.onNodeContextMenu(e, convertNodePropsToEventData(props));
		};
		var isDraggable = import_react$19.useMemo(function() {
			return !!(context.draggable && (!context.draggable.nodeDraggable || context.draggable.nodeDraggable(data)));
		}, [context.draggable, data]);
		var onDragStart = function onDragStart$1(e) {
			e.stopPropagation();
			setDragNodeHighlight(true);
			context.onNodeDragStart(e, props);
			try {
				e.dataTransfer.setData("text/plain", "");
			} catch (_unused) {}
		};
		var onDragEnter = function onDragEnter$1(e) {
			e.preventDefault();
			e.stopPropagation();
			context.onNodeDragEnter(e, props);
		};
		var onDragOver = function onDragOver$1(e) {
			e.preventDefault();
			e.stopPropagation();
			context.onNodeDragOver(e, props);
		};
		var onDragLeave = function onDragLeave$1(e) {
			e.stopPropagation();
			context.onNodeDragLeave(e, props);
		};
		var onDragEnd = function onDragEnd$1(e) {
			e.stopPropagation();
			setDragNodeHighlight(false);
			context.onNodeDragEnd(e, props);
		};
		var onDrop = function onDrop$1(e) {
			e.preventDefault();
			e.stopPropagation();
			setDragNodeHighlight(false);
			context.onNodeDrop(e, props);
		};
		var onExpand = function onExpand$1(e) {
			if (loading) return;
			context.onNodeExpand(e, convertNodePropsToEventData(props));
		};
		var hasChildren = import_react$19.useMemo(function() {
			var _ref = getEntity(context.keyEntities, eventKey) || {}, children = _ref.children;
			return Boolean((children || []).length);
		}, [context.keyEntities, eventKey]);
		var memoizedIsLeaf = import_react$19.useMemo(function() {
			if (isLeaf === false) return false;
			return isLeaf || !context.loadData && !hasChildren || context.loadData && props.loaded && !hasChildren;
		}, [
			isLeaf,
			context.loadData,
			hasChildren,
			props.loaded
		]);
		import_react$19.useEffect(function() {
			if (loading) return;
			if (typeof context.loadData === "function" && expanded && !memoizedIsLeaf && !props.loaded) context.onNodeLoad(convertNodePropsToEventData(props));
		}, [
			loading,
			context.loadData,
			context.onNodeLoad,
			expanded,
			memoizedIsLeaf,
			props
		]);
		var dragHandlerNode = import_react$19.useMemo(function() {
			var _context$draggable;
			if (!((_context$draggable = context.draggable) !== null && _context$draggable !== void 0 && _context$draggable.icon)) return null;
			return /* @__PURE__ */ import_react$19.createElement("span", { className: "".concat(context.prefixCls, "-draggable-icon") }, context.draggable.icon);
		}, [context.draggable]);
		var renderSwitcherIconDom = function renderSwitcherIconDom$1(isInternalLeaf) {
			var switcherIcon = props.switcherIcon || context.switcherIcon;
			if (typeof switcherIcon === "function") return switcherIcon(_objectSpread2(_objectSpread2({}, props), {}, { isLeaf: isInternalLeaf }));
			return switcherIcon;
		};
		var renderSwitcher = function renderSwitcher$1() {
			if (memoizedIsLeaf) {
				var _switcherIconDom = renderSwitcherIconDom(true);
				return _switcherIconDom !== false ? /* @__PURE__ */ import_react$19.createElement("span", { className: (0, import_classnames$3.default)("".concat(context.prefixCls, "-switcher"), "".concat(context.prefixCls, "-switcher-noop")) }, _switcherIconDom) : null;
			}
			var switcherIconDom = renderSwitcherIconDom(false);
			return switcherIconDom !== false ? /* @__PURE__ */ import_react$19.createElement("span", {
				onClick: onExpand,
				className: (0, import_classnames$3.default)("".concat(context.prefixCls, "-switcher"), "".concat(context.prefixCls, "-switcher_").concat(expanded ? ICON_OPEN : ICON_CLOSE))
			}, switcherIconDom) : null;
		};
		var checkboxNode = import_react$19.useMemo(function() {
			if (!isCheckable) return null;
			var $custom = typeof isCheckable !== "boolean" ? isCheckable : null;
			return /* @__PURE__ */ import_react$19.createElement("span", {
				className: (0, import_classnames$3.default)("".concat(context.prefixCls, "-checkbox"), _defineProperty(_defineProperty(_defineProperty({}, "".concat(context.prefixCls, "-checkbox-checked"), checked), "".concat(context.prefixCls, "-checkbox-indeterminate"), !checked && halfChecked), "".concat(context.prefixCls, "-checkbox-disabled"), isDisabled || props.disableCheckbox)),
				onClick: onCheck,
				role: "checkbox",
				"aria-checked": halfChecked ? "mixed" : checked,
				"aria-disabled": isDisabled || props.disableCheckbox,
				"aria-label": "Select ".concat(typeof props.title === "string" ? props.title : "tree node")
			}, $custom);
		}, [
			isCheckable,
			checked,
			halfChecked,
			isDisabled,
			props.disableCheckbox,
			props.title
		]);
		var nodeState = import_react$19.useMemo(function() {
			if (memoizedIsLeaf) return null;
			return expanded ? ICON_OPEN : ICON_CLOSE;
		}, [memoizedIsLeaf, expanded]);
		var iconNode = import_react$19.useMemo(function() {
			return /* @__PURE__ */ import_react$19.createElement("span", { className: (0, import_classnames$3.default)("".concat(context.prefixCls, "-iconEle"), "".concat(context.prefixCls, "-icon__").concat(nodeState || "docu"), _defineProperty({}, "".concat(context.prefixCls, "-icon_loading"), loading)) });
		}, [
			context.prefixCls,
			nodeState,
			loading
		]);
		var dropIndicatorNode = import_react$19.useMemo(function() {
			var rootDraggable = Boolean(context.draggable);
			var showIndicator = !props.disabled && rootDraggable && context.dragOverNodeKey === eventKey;
			if (!showIndicator) return null;
			return context.dropIndicatorRender({
				dropPosition: context.dropPosition,
				dropLevelOffset: context.dropLevelOffset,
				indent: context.indent,
				prefixCls: context.prefixCls,
				direction: context.direction
			});
		}, [
			context.dropPosition,
			context.dropLevelOffset,
			context.indent,
			context.prefixCls,
			context.direction,
			context.draggable,
			context.dragOverNodeKey,
			context.dropIndicatorRender
		]);
		var selectorNode = import_react$19.useMemo(function() {
			var _props$title = props.title, title = _props$title === void 0 ? defaultTitle : _props$title;
			var wrapClass = "".concat(context.prefixCls, "-node-content-wrapper");
			var $icon;
			if (context.showIcon) {
				var currentIcon = props.icon || context.icon;
				$icon = currentIcon ? /* @__PURE__ */ import_react$19.createElement("span", { className: (0, import_classnames$3.default)("".concat(context.prefixCls, "-iconEle"), "".concat(context.prefixCls, "-icon__customize")) }, typeof currentIcon === "function" ? currentIcon(props) : currentIcon) : iconNode;
			} else if (context.loadData && loading) $icon = iconNode;
			var titleNode;
			if (typeof title === "function") titleNode = title(data);
			else if (context.titleRender) titleNode = context.titleRender(data);
			else titleNode = title;
			return /* @__PURE__ */ import_react$19.createElement("span", {
				ref: selectHandleRef,
				title: typeof title === "string" ? title : "",
				className: (0, import_classnames$3.default)(wrapClass, "".concat(wrapClass, "-").concat(nodeState || "normal"), _defineProperty({}, "".concat(context.prefixCls, "-node-selected"), !isDisabled && (selected || dragNodeHighlight))),
				onMouseEnter,
				onMouseLeave,
				onContextMenu,
				onClick: onSelectorClick,
				onDoubleClick: onSelectorDoubleClick
			}, $icon, /* @__PURE__ */ import_react$19.createElement("span", { className: "".concat(context.prefixCls, "-title") }, titleNode), dropIndicatorNode);
		}, [
			context.prefixCls,
			context.showIcon,
			props,
			context.icon,
			iconNode,
			context.titleRender,
			data,
			nodeState,
			onMouseEnter,
			onMouseLeave,
			onContextMenu,
			onSelectorClick,
			onSelectorDoubleClick
		]);
		var dataOrAriaAttributeProps = pickAttrs(otherProps, {
			aria: true,
			data: true
		});
		var _ref2 = getEntity(context.keyEntities, eventKey) || {}, level = _ref2.level;
		var isEndNode = isEnd[isEnd.length - 1];
		var draggableWithoutDisabled = !isDisabled && isDraggable;
		var dragging = context.draggingNodeKey === eventKey;
		var ariaSelected = selectable !== void 0 ? { "aria-selected": !!selectable } : void 0;
		return /* @__PURE__ */ import_react$19.createElement("div", _extends({
			ref: domRef,
			role: "treeitem",
			"aria-expanded": isLeaf ? void 0 : expanded,
			className: (0, import_classnames$3.default)(className, "".concat(context.prefixCls, "-treenode"), (_classNames4 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames4, "".concat(context.prefixCls, "-treenode-disabled"), isDisabled), "".concat(context.prefixCls, "-treenode-switcher-").concat(expanded ? "open" : "close"), !isLeaf), "".concat(context.prefixCls, "-treenode-checkbox-checked"), checked), "".concat(context.prefixCls, "-treenode-checkbox-indeterminate"), halfChecked), "".concat(context.prefixCls, "-treenode-selected"), selected), "".concat(context.prefixCls, "-treenode-loading"), loading), "".concat(context.prefixCls, "-treenode-active"), active), "".concat(context.prefixCls, "-treenode-leaf-last"), isEndNode), "".concat(context.prefixCls, "-treenode-draggable"), isDraggable), "dragging", dragging), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames4, "drop-target", context.dropTargetKey === eventKey), "drop-container", context.dropContainerKey === eventKey), "drag-over", !isDisabled && dragOver), "drag-over-gap-top", !isDisabled && dragOverGapTop), "drag-over-gap-bottom", !isDisabled && dragOverGapBottom), "filter-node", (_context$filterTreeNo = context.filterTreeNode) === null || _context$filterTreeNo === void 0 ? void 0 : _context$filterTreeNo.call(context, convertNodePropsToEventData(props))), "".concat(context.prefixCls, "-treenode-leaf"), memoizedIsLeaf))),
			style,
			draggable: draggableWithoutDisabled,
			onDragStart: draggableWithoutDisabled ? onDragStart : void 0,
			onDragEnter: isDraggable ? onDragEnter : void 0,
			onDragOver: isDraggable ? onDragOver : void 0,
			onDragLeave: isDraggable ? onDragLeave : void 0,
			onDrop: isDraggable ? onDrop : void 0,
			onDragEnd: isDraggable ? onDragEnd : void 0,
			onMouseMove
		}, ariaSelected, dataOrAriaAttributeProps), /* @__PURE__ */ import_react$19.createElement(Indent_default, {
			prefixCls: context.prefixCls,
			level,
			isStart,
			isEnd
		}), dragHandlerNode, renderSwitcher(), checkboxNode, selectorNode);
	};
	TreeNode$1.isTreeNode = 1;
	TreeNode_default$1 = TreeNode$1;
}));
function arrDel(list, value) {
	if (!list) return [];
	var clone = list.slice();
	var index$1 = clone.indexOf(value);
	if (index$1 >= 0) clone.splice(index$1, 1);
	return clone;
}
function arrAdd(list, value) {
	var clone = (list || []).slice();
	if (clone.indexOf(value) === -1) clone.push(value);
	return clone;
}
function posToArr(pos) {
	return pos.split("-");
}
function getDragChildrenKeys(dragNodeKey, keyEntities) {
	var dragChildrenKeys = [];
	var entity = getEntity(keyEntities, dragNodeKey);
	function dig() {
		var list = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
		list.forEach(function(_ref) {
			var key = _ref.key, children = _ref.children;
			dragChildrenKeys.push(key);
			dig(children);
		});
	}
	dig(entity.children);
	return dragChildrenKeys;
}
function isLastChild(treeNodeEntity) {
	if (treeNodeEntity.parent) {
		var posArr = posToArr(treeNodeEntity.pos);
		return Number(posArr[posArr.length - 1]) === treeNodeEntity.parent.children.length - 1;
	}
	return false;
}
function isFirstChild(treeNodeEntity) {
	var posArr = posToArr(treeNodeEntity.pos);
	return Number(posArr[posArr.length - 1]) === 0;
}
function calcDropPosition(event, dragNodeProps, targetNodeProps, indent, startMousePosition, allowDrop, flattenedNodes, keyEntities, expandKeys, direction) {
	var _abstractDropNodeEnti;
	var clientX = event.clientX, clientY = event.clientY;
	var _getBoundingClientRec = event.target.getBoundingClientRect(), top = _getBoundingClientRec.top, height = _getBoundingClientRec.height;
	var horizontalMouseOffset = (direction === "rtl" ? -1 : 1) * (((startMousePosition === null || startMousePosition === void 0 ? void 0 : startMousePosition.x) || 0) - clientX);
	var rawDropLevelOffset = (horizontalMouseOffset - 12) / indent;
	var filteredExpandKeys = expandKeys.filter(function(key) {
		var _keyEntities$key;
		return (_keyEntities$key = keyEntities[key]) === null || _keyEntities$key === void 0 || (_keyEntities$key = _keyEntities$key.children) === null || _keyEntities$key === void 0 ? void 0 : _keyEntities$key.length;
	});
	var abstractDropNodeEntity = getEntity(keyEntities, targetNodeProps.eventKey);
	if (clientY < top + height / 2) {
		var nodeIndex = flattenedNodes.findIndex(function(flattenedNode) {
			return flattenedNode.key === abstractDropNodeEntity.key;
		});
		var prevNodeIndex = nodeIndex <= 0 ? 0 : nodeIndex - 1;
		var prevNodeKey = flattenedNodes[prevNodeIndex].key;
		abstractDropNodeEntity = getEntity(keyEntities, prevNodeKey);
	}
	var initialAbstractDropNodeKey = abstractDropNodeEntity.key;
	var abstractDragOverEntity = abstractDropNodeEntity;
	var dragOverNodeKey = abstractDropNodeEntity.key;
	var dropPosition = 0;
	var dropLevelOffset = 0;
	if (!filteredExpandKeys.includes(initialAbstractDropNodeKey)) for (var i = 0; i < rawDropLevelOffset; i += 1) if (isLastChild(abstractDropNodeEntity)) {
		abstractDropNodeEntity = abstractDropNodeEntity.parent;
		dropLevelOffset += 1;
	} else break;
	var abstractDragDataNode = dragNodeProps.data;
	var abstractDropDataNode = abstractDropNodeEntity.node;
	var dropAllowed = true;
	if (isFirstChild(abstractDropNodeEntity) && abstractDropNodeEntity.level === 0 && clientY < top + height / 2 && allowDrop({
		dragNode: abstractDragDataNode,
		dropNode: abstractDropDataNode,
		dropPosition: -1
	}) && abstractDropNodeEntity.key === targetNodeProps.eventKey) dropPosition = -1;
	else if ((abstractDragOverEntity.children || []).length && filteredExpandKeys.includes(dragOverNodeKey)) if (allowDrop({
		dragNode: abstractDragDataNode,
		dropNode: abstractDropDataNode,
		dropPosition: 0
	})) dropPosition = 0;
	else dropAllowed = false;
	else if (dropLevelOffset === 0) if (rawDropLevelOffset > -1.5) if (allowDrop({
		dragNode: abstractDragDataNode,
		dropNode: abstractDropDataNode,
		dropPosition: 1
	})) dropPosition = 1;
	else dropAllowed = false;
	else if (allowDrop({
		dragNode: abstractDragDataNode,
		dropNode: abstractDropDataNode,
		dropPosition: 0
	})) dropPosition = 0;
	else if (allowDrop({
		dragNode: abstractDragDataNode,
		dropNode: abstractDropDataNode,
		dropPosition: 1
	})) dropPosition = 1;
	else dropAllowed = false;
	else if (allowDrop({
		dragNode: abstractDragDataNode,
		dropNode: abstractDropDataNode,
		dropPosition: 1
	})) dropPosition = 1;
	else dropAllowed = false;
	return {
		dropPosition,
		dropLevelOffset,
		dropTargetKey: abstractDropNodeEntity.key,
		dropTargetPos: abstractDropNodeEntity.pos,
		dragOverNodeKey,
		dropContainerKey: dropPosition === 0 ? null : ((_abstractDropNodeEnti = abstractDropNodeEntity.parent) === null || _abstractDropNodeEnti === void 0 ? void 0 : _abstractDropNodeEnti.key) || null,
		dropAllowed
	};
}
function calcSelectedKeys(selectedKeys, props) {
	if (!selectedKeys) return void 0;
	var multiple = props.multiple;
	if (multiple) return selectedKeys.slice();
	if (selectedKeys.length) return [selectedKeys[0]];
	return selectedKeys;
}
function parseCheckedKeys(keys) {
	if (!keys) return null;
	var keyProps;
	if (Array.isArray(keys)) keyProps = {
		checkedKeys: keys,
		halfCheckedKeys: void 0
	};
	else if (_typeof(keys) === "object") keyProps = {
		checkedKeys: keys.checked || void 0,
		halfCheckedKeys: keys.halfChecked || void 0
	};
	else {
		warning_default(false, "`checkedKeys` is not an array or an object");
		return null;
	}
	return keyProps;
}
function conductExpandParent(keyList, keyEntities) {
	var expandedKeys = /* @__PURE__ */ new Set();
	function conductUp(key) {
		if (expandedKeys.has(key)) return;
		var entity = getEntity(keyEntities, key);
		if (!entity) return;
		expandedKeys.add(key);
		var parent = entity.parent, node = entity.node;
		if (node.disabled) return;
		if (parent) conductUp(parent.key);
	}
	(keyList || []).forEach(function(key) {
		conductUp(key);
	});
	return _toConsumableArray(expandedKeys);
}
var import_react$18;
var init_util = __esmMin((() => {
	init_toConsumableArray();
	init_typeof();
	init_warning();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_TreeNode$1();
	init_keyUtil();
	init_treeUtil();
}));
var import_react$17, DropIndicator, DropIndicator_default;
var init_DropIndicator = __esmMin((() => {
	import_react$17 = /* @__PURE__ */ __toESM(require_react());
	DropIndicator = function DropIndicator$1(props) {
		var dropPosition = props.dropPosition, dropLevelOffset = props.dropLevelOffset, indent = props.indent;
		var style = {
			pointerEvents: "none",
			position: "absolute",
			right: 0,
			backgroundColor: "red",
			height: 2
		};
		switch (dropPosition) {
			case -1:
				style.top = 0;
				style.left = -dropLevelOffset * indent;
				break;
			case 1:
				style.bottom = 0;
				style.left = -dropLevelOffset * indent;
				break;
			case 0:
				style.bottom = 0;
				style.left = indent;
				break;
		}
		return /* @__PURE__ */ import_react$17.createElement("div", { style });
	};
	DropIndicator_default = DropIndicator;
}));
function _objectDestructuringEmpty(t) {
	if (null == t) throw new TypeError("Cannot destructure " + t);
}
var init_objectDestructuringEmpty = __esmMin((() => {}));
function useUnmount(triggerStart, triggerEnd) {
	var _React$useState = import_react$16.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), firstMount = _React$useState2[0], setFirstMount = _React$useState2[1];
	useLayoutEffect_default(function() {
		if (firstMount) {
			triggerStart();
			return function() {
				triggerEnd();
			};
		}
	}, [firstMount]);
	useLayoutEffect_default(function() {
		setFirstMount(true);
		return function() {
			setFirstMount(false);
		};
	}, []);
}
var import_react$16, useUnmount_default;
var init_useUnmount = __esmMin((() => {
	init_slicedToArray();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	init_useLayoutEffect$2();
	useUnmount_default = useUnmount;
}));
var import_classnames$2, import_react$15, _excluded$4, MotionTreeNode, MotionTreeNode_default;
var init_MotionTreeNode = __esmMin((() => {
	init_extends();
	init_objectDestructuringEmpty();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$17();
	init_useLayoutEffect$2();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	init_contextTypes();
	init_TreeNode$1();
	init_useUnmount();
	init_treeUtil();
	_excluded$4 = [
		"className",
		"style",
		"motion",
		"motionNodes",
		"motionType",
		"onMotionStart",
		"onMotionEnd",
		"active",
		"treeNodeRequiredProps"
	];
	MotionTreeNode = /* @__PURE__ */ import_react$15.forwardRef(function(oriProps, ref) {
		var className = oriProps.className, style = oriProps.style, motion = oriProps.motion, motionNodes = oriProps.motionNodes, motionType = oriProps.motionType, onOriginMotionStart = oriProps.onMotionStart, onOriginMotionEnd = oriProps.onMotionEnd, active = oriProps.active, treeNodeRequiredProps = oriProps.treeNodeRequiredProps, props = _objectWithoutProperties(oriProps, _excluded$4);
		var _React$useState = import_react$15.useState(true), _React$useState2 = _slicedToArray(_React$useState, 2), visible = _React$useState2[0], setVisible = _React$useState2[1];
		var _React$useContext = import_react$15.useContext(TreeContext), prefixCls = _React$useContext.prefixCls;
		var targetVisible = motionNodes && motionType !== "hide";
		useLayoutEffect_default(function() {
			if (motionNodes) {
				if (targetVisible !== visible) setVisible(targetVisible);
			}
		}, [motionNodes]);
		var triggerMotionStart = function triggerMotionStart$1() {
			if (motionNodes) onOriginMotionStart();
		};
		var triggerMotionEndRef = import_react$15.useRef(false);
		var triggerMotionEnd = function triggerMotionEnd$1() {
			if (motionNodes && !triggerMotionEndRef.current) {
				triggerMotionEndRef.current = true;
				onOriginMotionEnd();
			}
		};
		useUnmount_default(triggerMotionStart, triggerMotionEnd);
		var onVisibleChanged = function onVisibleChanged$1(nextVisible) {
			if (targetVisible === nextVisible) triggerMotionEnd();
		};
		if (motionNodes) return /* @__PURE__ */ import_react$15.createElement(es_default$4, _extends({
			ref,
			visible
		}, motion, {
			motionAppear: motionType === "show",
			onVisibleChanged
		}), function(_ref, motionRef) {
			var motionClassName = _ref.className, motionStyle = _ref.style;
			return /* @__PURE__ */ import_react$15.createElement("div", {
				ref: motionRef,
				className: (0, import_classnames$2.default)("".concat(prefixCls, "-treenode-motion"), motionClassName),
				style: motionStyle
			}, motionNodes.map(function(treeNode) {
				var restProps = Object.assign({}, (_objectDestructuringEmpty(treeNode.data), treeNode.data)), title = treeNode.title, key = treeNode.key, isStart = treeNode.isStart, isEnd = treeNode.isEnd;
				delete restProps.children;
				var treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps);
				return /* @__PURE__ */ import_react$15.createElement(TreeNode_default$1, _extends({}, restProps, treeNodeProps, {
					title,
					active,
					data: treeNode.data,
					key,
					isStart,
					isEnd
				}));
			}));
		});
		return /* @__PURE__ */ import_react$15.createElement(TreeNode_default$1, _extends({
			domRef: ref,
			className,
			style
		}, props, { active }));
	});
	MotionTreeNode_default = MotionTreeNode;
}));
function findExpandedKeys() {
	var prev = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	var next = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
	var prevLen = prev.length;
	var nextLen = next.length;
	if (Math.abs(prevLen - nextLen) !== 1) return {
		add: false,
		key: null
	};
	function find(shorter, longer) {
		var cache = /* @__PURE__ */ new Map();
		shorter.forEach(function(key) {
			cache.set(key, true);
		});
		var keys = longer.filter(function(key) {
			return !cache.has(key);
		});
		return keys.length === 1 ? keys[0] : null;
	}
	if (prevLen < nextLen) return {
		add: true,
		key: find(prev, next)
	};
	return {
		add: false,
		key: find(next, prev)
	};
}
function getExpandRange(shorter, longer, key) {
	var shorterStartIndex = shorter.findIndex(function(data) {
		return data.key === key;
	});
	var shorterEndNode = shorter[shorterStartIndex + 1];
	var longerStartIndex = longer.findIndex(function(data) {
		return data.key === key;
	});
	if (shorterEndNode) {
		var longerEndIndex = longer.findIndex(function(data) {
			return data.key === shorterEndNode.key;
		});
		return longer.slice(longerStartIndex + 1, longerEndIndex);
	}
	return longer.slice(longerStartIndex + 1);
}
var init_diffUtil = __esmMin((() => {}));
function getMinimumRangeTransitionRange(list, virtual, height, itemHeight) {
	if (virtual === false || !height) return list;
	return list.slice(0, Math.ceil(height / itemHeight) + 1);
}
function itemKey(item) {
	var key = item.key, pos = item.pos;
	return getKey(key, pos);
}
function getAccessibilityPath(item) {
	var path = String(item.data.key);
	var current = item;
	while (current.parent) {
		current = current.parent;
		path = "".concat(current.data.key, " > ").concat(path);
	}
	return path;
}
var import_react$14, _excluded$3, HIDDEN_STYLE$1, noop, MOTION_KEY, MotionNode, MotionEntity, MotionFlattenData, NodeList, NodeList_default;
var init_NodeList = __esmMin((() => {
	init_extends();
	init_objectDestructuringEmpty();
	init_slicedToArray();
	init_objectWithoutProperties();
	init_useLayoutEffect$2();
	init_es$14();
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_MotionTreeNode();
	init_diffUtil();
	init_treeUtil();
	_excluded$3 = [
		"prefixCls",
		"data",
		"selectable",
		"checkable",
		"expandedKeys",
		"selectedKeys",
		"checkedKeys",
		"loadedKeys",
		"loadingKeys",
		"halfCheckedKeys",
		"keyEntities",
		"disabled",
		"dragging",
		"dragOverNodeKey",
		"dropPosition",
		"motion",
		"height",
		"itemHeight",
		"virtual",
		"scrollWidth",
		"focusable",
		"activeItem",
		"focused",
		"tabIndex",
		"onKeyDown",
		"onFocus",
		"onBlur",
		"onActiveChange",
		"onListChangeStart",
		"onListChangeEnd"
	];
	HIDDEN_STYLE$1 = {
		width: 0,
		height: 0,
		display: "flex",
		overflow: "hidden",
		opacity: 0,
		border: 0,
		padding: 0,
		margin: 0
	};
	noop = function noop$2() {};
	MOTION_KEY = "RC_TREE_MOTION_".concat(Math.random());
	MotionNode = { key: MOTION_KEY };
	MotionEntity = {
		key: MOTION_KEY,
		level: 0,
		index: 0,
		pos: "0",
		node: MotionNode,
		nodes: [MotionNode]
	};
	MotionFlattenData = {
		parent: null,
		children: [],
		pos: MotionEntity.pos,
		data: MotionNode,
		title: null,
		key: MOTION_KEY,
		isStart: [],
		isEnd: []
	};
	NodeList = /* @__PURE__ */ import_react$14.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, data = props.data;
		props.selectable;
		props.checkable;
		var expandedKeys = props.expandedKeys, selectedKeys = props.selectedKeys, checkedKeys = props.checkedKeys, loadedKeys = props.loadedKeys, loadingKeys = props.loadingKeys, halfCheckedKeys = props.halfCheckedKeys, keyEntities = props.keyEntities, disabled = props.disabled, dragging = props.dragging, dragOverNodeKey = props.dragOverNodeKey, dropPosition = props.dropPosition, motion = props.motion, height = props.height, itemHeight = props.itemHeight, virtual = props.virtual, scrollWidth = props.scrollWidth, focusable = props.focusable, activeItem = props.activeItem, focused = props.focused, tabIndex = props.tabIndex, onKeyDown = props.onKeyDown, onFocus = props.onFocus, onBlur = props.onBlur, onActiveChange = props.onActiveChange, onListChangeStart = props.onListChangeStart, onListChangeEnd = props.onListChangeEnd, domProps = _objectWithoutProperties(props, _excluded$3);
		var listRef = import_react$14.useRef(null);
		var indentMeasurerRef = import_react$14.useRef(null);
		import_react$14.useImperativeHandle(ref, function() {
			return {
				scrollTo: function scrollTo(scroll) {
					listRef.current.scrollTo(scroll);
				},
				getIndentWidth: function getIndentWidth() {
					return indentMeasurerRef.current.offsetWidth;
				}
			};
		});
		var _React$useState = import_react$14.useState(expandedKeys), _React$useState2 = _slicedToArray(_React$useState, 2), prevExpandedKeys = _React$useState2[0], setPrevExpandedKeys = _React$useState2[1];
		var _React$useState3 = import_react$14.useState(data), _React$useState4 = _slicedToArray(_React$useState3, 2), prevData = _React$useState4[0], setPrevData = _React$useState4[1];
		var _React$useState5 = import_react$14.useState(data), _React$useState6 = _slicedToArray(_React$useState5, 2), transitionData = _React$useState6[0], setTransitionData = _React$useState6[1];
		var _React$useState7 = import_react$14.useState([]), _React$useState8 = _slicedToArray(_React$useState7, 2), transitionRange = _React$useState8[0], setTransitionRange = _React$useState8[1];
		var _React$useState9 = import_react$14.useState(null), _React$useState10 = _slicedToArray(_React$useState9, 2), motionType = _React$useState10[0], setMotionType = _React$useState10[1];
		var dataRef = import_react$14.useRef(data);
		dataRef.current = data;
		function onMotionEnd() {
			var latestData = dataRef.current;
			setPrevData(latestData);
			setTransitionData(latestData);
			setTransitionRange([]);
			setMotionType(null);
			onListChangeEnd();
		}
		useLayoutEffect_default(function() {
			setPrevExpandedKeys(expandedKeys);
			var diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);
			if (diffExpanded.key !== null) if (diffExpanded.add) {
				var keyIndex = prevData.findIndex(function(_ref) {
					var key = _ref.key;
					return key === diffExpanded.key;
				});
				var rangeNodes = getMinimumRangeTransitionRange(getExpandRange(prevData, data, diffExpanded.key), virtual, height, itemHeight);
				var newTransitionData = prevData.slice();
				newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);
				setTransitionData(newTransitionData);
				setTransitionRange(rangeNodes);
				setMotionType("show");
			} else {
				var _keyIndex = data.findIndex(function(_ref2) {
					var key = _ref2.key;
					return key === diffExpanded.key;
				});
				var _rangeNodes = getMinimumRangeTransitionRange(getExpandRange(data, prevData, diffExpanded.key), virtual, height, itemHeight);
				var _newTransitionData = data.slice();
				_newTransitionData.splice(_keyIndex + 1, 0, MotionFlattenData);
				setTransitionData(_newTransitionData);
				setTransitionRange(_rangeNodes);
				setMotionType("hide");
			}
			else if (prevData !== data) {
				setPrevData(data);
				setTransitionData(data);
			}
		}, [expandedKeys, data]);
		import_react$14.useEffect(function() {
			if (!dragging) onMotionEnd();
		}, [dragging]);
		var mergedData = motion ? transitionData : data;
		var treeNodeRequiredProps = {
			expandedKeys,
			selectedKeys,
			loadedKeys,
			loadingKeys,
			checkedKeys,
			halfCheckedKeys,
			dragOverNodeKey,
			dropPosition,
			keyEntities
		};
		return /* @__PURE__ */ import_react$14.createElement(import_react$14.Fragment, null, focused && activeItem && /* @__PURE__ */ import_react$14.createElement("span", {
			style: HIDDEN_STYLE$1,
			"aria-live": "assertive"
		}, getAccessibilityPath(activeItem)), /* @__PURE__ */ import_react$14.createElement("div", null, /* @__PURE__ */ import_react$14.createElement("input", {
			style: HIDDEN_STYLE$1,
			disabled: focusable === false || disabled,
			tabIndex: focusable !== false ? tabIndex : null,
			onKeyDown,
			onFocus,
			onBlur,
			value: "",
			onChange: noop,
			"aria-label": "for screen reader"
		})), /* @__PURE__ */ import_react$14.createElement("div", {
			className: "".concat(prefixCls, "-treenode"),
			"aria-hidden": true,
			style: {
				position: "absolute",
				pointerEvents: "none",
				visibility: "hidden",
				height: 0,
				overflow: "hidden",
				border: 0,
				padding: 0
			}
		}, /* @__PURE__ */ import_react$14.createElement("div", { className: "".concat(prefixCls, "-indent") }, /* @__PURE__ */ import_react$14.createElement("div", {
			ref: indentMeasurerRef,
			className: "".concat(prefixCls, "-indent-unit")
		}))), /* @__PURE__ */ import_react$14.createElement(es_default$3, _extends({}, domProps, {
			data: mergedData,
			itemKey,
			height,
			fullHeight: false,
			virtual,
			itemHeight,
			scrollWidth,
			prefixCls: "".concat(prefixCls, "-list"),
			ref: listRef,
			role: "tree",
			onVisibleChange: function onVisibleChange(originList) {
				if (originList.every(function(item) {
					return itemKey(item) !== MOTION_KEY;
				})) onMotionEnd();
			}
		}), function(treeNode) {
			var pos = treeNode.pos, restProps = Object.assign({}, (_objectDestructuringEmpty(treeNode.data), treeNode.data)), title = treeNode.title, key = treeNode.key, isStart = treeNode.isStart, isEnd = treeNode.isEnd;
			var mergedKey = getKey(key, pos);
			delete restProps.key;
			delete restProps.children;
			var treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);
			return /* @__PURE__ */ import_react$14.createElement(MotionTreeNode_default, _extends({}, restProps, treeNodeProps, {
				title,
				active: !!activeItem && key === activeItem.key,
				pos,
				data: treeNode.data,
				isStart,
				isEnd,
				motion,
				motionNodes: key === MOTION_KEY ? transitionRange : null,
				motionType,
				onMotionStart: onListChangeStart,
				onMotionEnd,
				treeNodeRequiredProps,
				onMouseMove: function onMouseMove() {
					onActiveChange(null);
				}
			}));
		}));
	});
	NodeList_default = NodeList;
}));
var import_classnames$1, import_react$13, MAX_RETRY_TIMES, Tree, Tree_default;
var init_Tree = __esmMin((() => {
	init_extends();
	init_typeof();
	init_objectSpread2();
	init_toConsumableArray();
	init_classCallCheck();
	init_createClass();
	init_assertThisInitialized();
	init_inherits();
	init_createSuper();
	init_defineProperty();
	import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames());
	init_KeyCode();
	init_pickAttrs();
	init_warning();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	init_contextTypes();
	init_DropIndicator();
	init_NodeList();
	init_TreeNode$1();
	init_util();
	init_conductUtil();
	init_keyUtil();
	init_treeUtil();
	MAX_RETRY_TIMES = 10;
	Tree = /* @__PURE__ */ function(_React$Component) {
		_inherits(Tree$1, _React$Component);
		var _super = _createSuper(Tree$1);
		function Tree$1() {
			var _this;
			_classCallCheck(this, Tree$1);
			for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) _args[_key] = arguments[_key];
			_this = _super.call.apply(_super, [this].concat(_args));
			_defineProperty(_assertThisInitialized(_this), "destroyed", false);
			_defineProperty(_assertThisInitialized(_this), "delayedDragEnterLogic", void 0);
			_defineProperty(_assertThisInitialized(_this), "loadingRetryTimes", {});
			_defineProperty(_assertThisInitialized(_this), "state", {
				keyEntities: {},
				indent: null,
				selectedKeys: [],
				checkedKeys: [],
				halfCheckedKeys: [],
				loadedKeys: [],
				loadingKeys: [],
				expandedKeys: [],
				draggingNodeKey: null,
				dragChildrenKeys: [],
				dropTargetKey: null,
				dropPosition: null,
				dropContainerKey: null,
				dropLevelOffset: null,
				dropTargetPos: null,
				dropAllowed: true,
				dragOverNodeKey: null,
				treeData: [],
				flattenNodes: [],
				focused: false,
				activeKey: null,
				listChanging: false,
				prevProps: null,
				fieldNames: fillFieldNames$1()
			});
			_defineProperty(_assertThisInitialized(_this), "dragStartMousePosition", null);
			_defineProperty(_assertThisInitialized(_this), "dragNodeProps", null);
			_defineProperty(_assertThisInitialized(_this), "currentMouseOverDroppableNodeKey", null);
			_defineProperty(_assertThisInitialized(_this), "listRef", /* @__PURE__ */ import_react$13.createRef());
			_defineProperty(_assertThisInitialized(_this), "onNodeDragStart", function(event, nodeProps) {
				var _this$state = _this.state, expandedKeys = _this$state.expandedKeys, keyEntities = _this$state.keyEntities;
				var onDragStart = _this.props.onDragStart;
				var eventKey = nodeProps.eventKey;
				_this.dragNodeProps = nodeProps;
				_this.dragStartMousePosition = {
					x: event.clientX,
					y: event.clientY
				};
				var newExpandedKeys = arrDel(expandedKeys, eventKey);
				_this.setState({
					draggingNodeKey: eventKey,
					dragChildrenKeys: getDragChildrenKeys(eventKey, keyEntities),
					indent: _this.listRef.current.getIndentWidth()
				});
				_this.setExpandedKeys(newExpandedKeys);
				window.addEventListener("dragend", _this.onWindowDragEnd);
				onDragStart === null || onDragStart === void 0 || onDragStart({
					event,
					node: convertNodePropsToEventData(nodeProps)
				});
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeDragEnter", function(event, nodeProps) {
				var _this$state2 = _this.state, expandedKeys = _this$state2.expandedKeys, keyEntities = _this$state2.keyEntities, dragChildrenKeys = _this$state2.dragChildrenKeys, flattenNodes = _this$state2.flattenNodes, indent = _this$state2.indent;
				var _this$props = _this.props, onDragEnter = _this$props.onDragEnter, onExpand = _this$props.onExpand, allowDrop = _this$props.allowDrop, direction = _this$props.direction;
				var pos = nodeProps.pos, eventKey = nodeProps.eventKey;
				if (_this.currentMouseOverDroppableNodeKey !== eventKey) _this.currentMouseOverDroppableNodeKey = eventKey;
				if (!_this.dragNodeProps) {
					_this.resetDragState();
					return;
				}
				var _calcDropPosition = calcDropPosition(event, _this.dragNodeProps, nodeProps, indent, _this.dragStartMousePosition, allowDrop, flattenNodes, keyEntities, expandedKeys, direction), dropPosition = _calcDropPosition.dropPosition, dropLevelOffset = _calcDropPosition.dropLevelOffset, dropTargetKey = _calcDropPosition.dropTargetKey, dropContainerKey = _calcDropPosition.dropContainerKey, dropTargetPos = _calcDropPosition.dropTargetPos, dropAllowed = _calcDropPosition.dropAllowed, dragOverNodeKey = _calcDropPosition.dragOverNodeKey;
				if (dragChildrenKeys.includes(dropTargetKey) || !dropAllowed) {
					_this.resetDragState();
					return;
				}
				if (!_this.delayedDragEnterLogic) _this.delayedDragEnterLogic = {};
				Object.keys(_this.delayedDragEnterLogic).forEach(function(key) {
					clearTimeout(_this.delayedDragEnterLogic[key]);
				});
				if (_this.dragNodeProps.eventKey !== nodeProps.eventKey) {
					event.persist();
					_this.delayedDragEnterLogic[pos] = window.setTimeout(function() {
						if (_this.state.draggingNodeKey === null) return;
						var newExpandedKeys = _toConsumableArray(expandedKeys);
						var entity = getEntity(keyEntities, nodeProps.eventKey);
						if (entity && (entity.children || []).length) newExpandedKeys = arrAdd(expandedKeys, nodeProps.eventKey);
						if (!_this.props.hasOwnProperty("expandedKeys")) _this.setExpandedKeys(newExpandedKeys);
						onExpand === null || onExpand === void 0 || onExpand(newExpandedKeys, {
							node: convertNodePropsToEventData(nodeProps),
							expanded: true,
							nativeEvent: event.nativeEvent
						});
					}, 800);
				}
				if (_this.dragNodeProps.eventKey === dropTargetKey && dropLevelOffset === 0) {
					_this.resetDragState();
					return;
				}
				_this.setState({
					dragOverNodeKey,
					dropPosition,
					dropLevelOffset,
					dropTargetKey,
					dropContainerKey,
					dropTargetPos,
					dropAllowed
				});
				onDragEnter === null || onDragEnter === void 0 || onDragEnter({
					event,
					node: convertNodePropsToEventData(nodeProps),
					expandedKeys
				});
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeDragOver", function(event, nodeProps) {
				var _this$state3 = _this.state, dragChildrenKeys = _this$state3.dragChildrenKeys, flattenNodes = _this$state3.flattenNodes, keyEntities = _this$state3.keyEntities, expandedKeys = _this$state3.expandedKeys, indent = _this$state3.indent;
				var _this$props2 = _this.props, onDragOver = _this$props2.onDragOver, allowDrop = _this$props2.allowDrop, direction = _this$props2.direction;
				if (!_this.dragNodeProps) return;
				var _calcDropPosition2 = calcDropPosition(event, _this.dragNodeProps, nodeProps, indent, _this.dragStartMousePosition, allowDrop, flattenNodes, keyEntities, expandedKeys, direction), dropPosition = _calcDropPosition2.dropPosition, dropLevelOffset = _calcDropPosition2.dropLevelOffset, dropTargetKey = _calcDropPosition2.dropTargetKey, dropContainerKey = _calcDropPosition2.dropContainerKey, dropTargetPos = _calcDropPosition2.dropTargetPos, dropAllowed = _calcDropPosition2.dropAllowed, dragOverNodeKey = _calcDropPosition2.dragOverNodeKey;
				if (dragChildrenKeys.includes(dropTargetKey) || !dropAllowed) return;
				if (_this.dragNodeProps.eventKey === dropTargetKey && dropLevelOffset === 0) {
					if (!(_this.state.dropPosition === null && _this.state.dropLevelOffset === null && _this.state.dropTargetKey === null && _this.state.dropContainerKey === null && _this.state.dropTargetPos === null && _this.state.dropAllowed === false && _this.state.dragOverNodeKey === null)) _this.resetDragState();
				} else if (!(dropPosition === _this.state.dropPosition && dropLevelOffset === _this.state.dropLevelOffset && dropTargetKey === _this.state.dropTargetKey && dropContainerKey === _this.state.dropContainerKey && dropTargetPos === _this.state.dropTargetPos && dropAllowed === _this.state.dropAllowed && dragOverNodeKey === _this.state.dragOverNodeKey)) _this.setState({
					dropPosition,
					dropLevelOffset,
					dropTargetKey,
					dropContainerKey,
					dropTargetPos,
					dropAllowed,
					dragOverNodeKey
				});
				onDragOver === null || onDragOver === void 0 || onDragOver({
					event,
					node: convertNodePropsToEventData(nodeProps)
				});
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeDragLeave", function(event, nodeProps) {
				if (_this.currentMouseOverDroppableNodeKey === nodeProps.eventKey && !event.currentTarget.contains(event.relatedTarget)) {
					_this.resetDragState();
					_this.currentMouseOverDroppableNodeKey = null;
				}
				var onDragLeave = _this.props.onDragLeave;
				onDragLeave === null || onDragLeave === void 0 || onDragLeave({
					event,
					node: convertNodePropsToEventData(nodeProps)
				});
			});
			_defineProperty(_assertThisInitialized(_this), "onWindowDragEnd", function(event) {
				_this.onNodeDragEnd(event, null, true);
				window.removeEventListener("dragend", _this.onWindowDragEnd);
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeDragEnd", function(event, nodeProps) {
				var onDragEnd = _this.props.onDragEnd;
				_this.setState({ dragOverNodeKey: null });
				_this.cleanDragState();
				onDragEnd === null || onDragEnd === void 0 || onDragEnd({
					event,
					node: convertNodePropsToEventData(nodeProps)
				});
				_this.dragNodeProps = null;
				window.removeEventListener("dragend", _this.onWindowDragEnd);
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeDrop", function(event, _) {
				var _this$getActiveItem;
				var outsideTree = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
				var _this$state4 = _this.state, dragChildrenKeys = _this$state4.dragChildrenKeys, dropPosition = _this$state4.dropPosition, dropTargetKey = _this$state4.dropTargetKey, dropTargetPos = _this$state4.dropTargetPos, dropAllowed = _this$state4.dropAllowed;
				if (!dropAllowed) return;
				var onDrop = _this.props.onDrop;
				_this.setState({ dragOverNodeKey: null });
				_this.cleanDragState();
				if (dropTargetKey === null) return;
				var abstractDropNodeProps = _objectSpread2(_objectSpread2({}, getTreeNodeProps(dropTargetKey, _this.getTreeNodeRequiredProps())), {}, {
					active: ((_this$getActiveItem = _this.getActiveItem()) === null || _this$getActiveItem === void 0 ? void 0 : _this$getActiveItem.key) === dropTargetKey,
					data: getEntity(_this.state.keyEntities, dropTargetKey).node
				});
				var dropToChild = dragChildrenKeys.includes(dropTargetKey);
				warning_default(!dropToChild, "Can not drop to dragNode's children node. This is a bug of rc-tree. Please report an issue.");
				var posArr = posToArr(dropTargetPos);
				var dropResult = {
					event,
					node: convertNodePropsToEventData(abstractDropNodeProps),
					dragNode: _this.dragNodeProps ? convertNodePropsToEventData(_this.dragNodeProps) : null,
					dragNodesKeys: [_this.dragNodeProps.eventKey].concat(dragChildrenKeys),
					dropToGap: dropPosition !== 0,
					dropPosition: dropPosition + Number(posArr[posArr.length - 1])
				};
				if (!outsideTree) onDrop === null || onDrop === void 0 || onDrop(dropResult);
				_this.dragNodeProps = null;
			});
			_defineProperty(_assertThisInitialized(_this), "cleanDragState", function() {
				var draggingNodeKey = _this.state.draggingNodeKey;
				if (draggingNodeKey !== null) _this.setState({
					draggingNodeKey: null,
					dropPosition: null,
					dropContainerKey: null,
					dropTargetKey: null,
					dropLevelOffset: null,
					dropAllowed: true,
					dragOverNodeKey: null
				});
				_this.dragStartMousePosition = null;
				_this.currentMouseOverDroppableNodeKey = null;
			});
			_defineProperty(_assertThisInitialized(_this), "triggerExpandActionExpand", function(e, treeNode) {
				var _this$state5 = _this.state, expandedKeys = _this$state5.expandedKeys, flattenNodes = _this$state5.flattenNodes;
				var expanded = treeNode.expanded, key = treeNode.key, isLeaf = treeNode.isLeaf;
				if (isLeaf || e.shiftKey || e.metaKey || e.ctrlKey) return;
				var node = flattenNodes.filter(function(nodeItem) {
					return nodeItem.key === key;
				})[0];
				var eventNode = convertNodePropsToEventData(_objectSpread2(_objectSpread2({}, getTreeNodeProps(key, _this.getTreeNodeRequiredProps())), {}, { data: node.data }));
				_this.setExpandedKeys(expanded ? arrDel(expandedKeys, key) : arrAdd(expandedKeys, key));
				_this.onNodeExpand(e, eventNode);
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeClick", function(e, treeNode) {
				var _this$props3 = _this.props, onClick = _this$props3.onClick, expandAction = _this$props3.expandAction;
				if (expandAction === "click") _this.triggerExpandActionExpand(e, treeNode);
				onClick === null || onClick === void 0 || onClick(e, treeNode);
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeDoubleClick", function(e, treeNode) {
				var _this$props4 = _this.props, onDoubleClick = _this$props4.onDoubleClick, expandAction = _this$props4.expandAction;
				if (expandAction === "doubleClick") _this.triggerExpandActionExpand(e, treeNode);
				onDoubleClick === null || onDoubleClick === void 0 || onDoubleClick(e, treeNode);
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeSelect", function(e, treeNode) {
				var selectedKeys = _this.state.selectedKeys;
				var _this$state6 = _this.state, keyEntities = _this$state6.keyEntities, fieldNames = _this$state6.fieldNames;
				var _this$props5 = _this.props, onSelect = _this$props5.onSelect, multiple = _this$props5.multiple;
				var selected = treeNode.selected;
				var key = treeNode[fieldNames.key];
				var targetSelected = !selected;
				if (!targetSelected) selectedKeys = arrDel(selectedKeys, key);
				else if (!multiple) selectedKeys = [key];
				else selectedKeys = arrAdd(selectedKeys, key);
				var selectedNodes = selectedKeys.map(function(selectedKey) {
					var entity = getEntity(keyEntities, selectedKey);
					return entity ? entity.node : null;
				}).filter(Boolean);
				_this.setUncontrolledState({ selectedKeys });
				onSelect === null || onSelect === void 0 || onSelect(selectedKeys, {
					event: "select",
					selected: targetSelected,
					node: treeNode,
					selectedNodes,
					nativeEvent: e.nativeEvent
				});
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeCheck", function(e, treeNode, checked) {
				var _this$state7 = _this.state, keyEntities = _this$state7.keyEntities, oriCheckedKeys = _this$state7.checkedKeys, oriHalfCheckedKeys = _this$state7.halfCheckedKeys;
				var _this$props6 = _this.props, checkStrictly = _this$props6.checkStrictly, onCheck = _this$props6.onCheck;
				var key = treeNode.key;
				var checkedObj;
				var eventObj = {
					event: "check",
					node: treeNode,
					checked,
					nativeEvent: e.nativeEvent
				};
				if (checkStrictly) {
					var checkedKeys = checked ? arrAdd(oriCheckedKeys, key) : arrDel(oriCheckedKeys, key);
					var halfCheckedKeys = arrDel(oriHalfCheckedKeys, key);
					checkedObj = {
						checked: checkedKeys,
						halfChecked: halfCheckedKeys
					};
					eventObj.checkedNodes = checkedKeys.map(function(checkedKey) {
						return getEntity(keyEntities, checkedKey);
					}).filter(Boolean).map(function(entity) {
						return entity.node;
					});
					_this.setUncontrolledState({ checkedKeys });
				} else {
					var _conductCheck = conductCheck([].concat(_toConsumableArray(oriCheckedKeys), [key]), true, keyEntities), _checkedKeys = _conductCheck.checkedKeys, _halfCheckedKeys = _conductCheck.halfCheckedKeys;
					if (!checked) {
						var keySet = new Set(_checkedKeys);
						keySet.delete(key);
						var _conductCheck2 = conductCheck(Array.from(keySet), {
							checked: false,
							halfCheckedKeys: _halfCheckedKeys
						}, keyEntities);
						_checkedKeys = _conductCheck2.checkedKeys;
						_halfCheckedKeys = _conductCheck2.halfCheckedKeys;
					}
					checkedObj = _checkedKeys;
					eventObj.checkedNodes = [];
					eventObj.checkedNodesPositions = [];
					eventObj.halfCheckedKeys = _halfCheckedKeys;
					_checkedKeys.forEach(function(checkedKey) {
						var entity = getEntity(keyEntities, checkedKey);
						if (!entity) return;
						var node = entity.node, pos = entity.pos;
						eventObj.checkedNodes.push(node);
						eventObj.checkedNodesPositions.push({
							node,
							pos
						});
					});
					_this.setUncontrolledState({ checkedKeys: _checkedKeys }, false, { halfCheckedKeys: _halfCheckedKeys });
				}
				onCheck === null || onCheck === void 0 || onCheck(checkedObj, eventObj);
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeLoad", function(treeNode) {
				var _entity$children;
				var key = treeNode.key;
				var keyEntities = _this.state.keyEntities;
				var entity = getEntity(keyEntities, key);
				if (entity !== null && entity !== void 0 && (_entity$children = entity.children) !== null && _entity$children !== void 0 && _entity$children.length) return;
				var loadPromise = new Promise(function(resolve, reject) {
					_this.setState(function(_ref) {
						var _ref$loadedKeys = _ref.loadedKeys, loadedKeys = _ref$loadedKeys === void 0 ? [] : _ref$loadedKeys, _ref$loadingKeys = _ref.loadingKeys, loadingKeys = _ref$loadingKeys === void 0 ? [] : _ref$loadingKeys;
						var _this$props7 = _this.props, loadData = _this$props7.loadData, onLoad = _this$props7.onLoad;
						if (!loadData || loadedKeys.includes(key) || loadingKeys.includes(key)) return null;
						var promise = loadData(treeNode);
						promise.then(function() {
							var currentLoadedKeys = _this.state.loadedKeys;
							var newLoadedKeys = arrAdd(currentLoadedKeys, key);
							onLoad === null || onLoad === void 0 || onLoad(newLoadedKeys, {
								event: "load",
								node: treeNode
							});
							_this.setUncontrolledState({ loadedKeys: newLoadedKeys });
							_this.setState(function(prevState) {
								return { loadingKeys: arrDel(prevState.loadingKeys, key) };
							});
							resolve();
						}).catch(function(e) {
							_this.setState(function(prevState) {
								return { loadingKeys: arrDel(prevState.loadingKeys, key) };
							});
							_this.loadingRetryTimes[key] = (_this.loadingRetryTimes[key] || 0) + 1;
							if (_this.loadingRetryTimes[key] >= MAX_RETRY_TIMES) {
								var currentLoadedKeys = _this.state.loadedKeys;
								warning_default(false, "Retry for `loadData` many times but still failed. No more retry.");
								_this.setUncontrolledState({ loadedKeys: arrAdd(currentLoadedKeys, key) });
								resolve();
							}
							reject(e);
						});
						return { loadingKeys: arrAdd(loadingKeys, key) };
					});
				});
				loadPromise.catch(function() {});
				return loadPromise;
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeMouseEnter", function(event, node) {
				var onMouseEnter = _this.props.onMouseEnter;
				onMouseEnter === null || onMouseEnter === void 0 || onMouseEnter({
					event,
					node
				});
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeMouseLeave", function(event, node) {
				var onMouseLeave = _this.props.onMouseLeave;
				onMouseLeave === null || onMouseLeave === void 0 || onMouseLeave({
					event,
					node
				});
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeContextMenu", function(event, node) {
				var onRightClick = _this.props.onRightClick;
				if (onRightClick) {
					event.preventDefault();
					onRightClick({
						event,
						node
					});
				}
			});
			_defineProperty(_assertThisInitialized(_this), "onFocus", function() {
				var onFocus = _this.props.onFocus;
				_this.setState({ focused: true });
				for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
				onFocus === null || onFocus === void 0 || onFocus.apply(void 0, args);
			});
			_defineProperty(_assertThisInitialized(_this), "onBlur", function() {
				var onBlur = _this.props.onBlur;
				_this.setState({ focused: false });
				_this.onActiveChange(null);
				for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
				onBlur === null || onBlur === void 0 || onBlur.apply(void 0, args);
			});
			_defineProperty(_assertThisInitialized(_this), "getTreeNodeRequiredProps", function() {
				var _this$state8 = _this.state, expandedKeys = _this$state8.expandedKeys, selectedKeys = _this$state8.selectedKeys, loadedKeys = _this$state8.loadedKeys, loadingKeys = _this$state8.loadingKeys, checkedKeys = _this$state8.checkedKeys, halfCheckedKeys = _this$state8.halfCheckedKeys, dragOverNodeKey = _this$state8.dragOverNodeKey, dropPosition = _this$state8.dropPosition, keyEntities = _this$state8.keyEntities;
				return {
					expandedKeys: expandedKeys || [],
					selectedKeys: selectedKeys || [],
					loadedKeys: loadedKeys || [],
					loadingKeys: loadingKeys || [],
					checkedKeys: checkedKeys || [],
					halfCheckedKeys: halfCheckedKeys || [],
					dragOverNodeKey,
					dropPosition,
					keyEntities
				};
			});
			_defineProperty(_assertThisInitialized(_this), "setExpandedKeys", function(expandedKeys) {
				var _this$state9 = _this.state, treeData = _this$state9.treeData, fieldNames = _this$state9.fieldNames;
				var flattenNodes = flattenTreeData(treeData, expandedKeys, fieldNames);
				_this.setUncontrolledState({
					expandedKeys,
					flattenNodes
				}, true);
			});
			_defineProperty(_assertThisInitialized(_this), "onNodeExpand", function(e, treeNode) {
				var expandedKeys = _this.state.expandedKeys;
				var _this$state10 = _this.state, listChanging = _this$state10.listChanging, fieldNames = _this$state10.fieldNames;
				var _this$props8 = _this.props, onExpand = _this$props8.onExpand, loadData = _this$props8.loadData;
				var expanded = treeNode.expanded;
				var key = treeNode[fieldNames.key];
				if (listChanging) return;
				var certain = expandedKeys.includes(key);
				var targetExpanded = !expanded;
				warning_default(expanded && certain || !expanded && !certain, "Expand state not sync with index check");
				expandedKeys = targetExpanded ? arrAdd(expandedKeys, key) : arrDel(expandedKeys, key);
				_this.setExpandedKeys(expandedKeys);
				onExpand === null || onExpand === void 0 || onExpand(expandedKeys, {
					node: treeNode,
					expanded: targetExpanded,
					nativeEvent: e.nativeEvent
				});
				if (targetExpanded && loadData) {
					var loadPromise = _this.onNodeLoad(treeNode);
					if (loadPromise) loadPromise.then(function() {
						var newFlattenTreeData = flattenTreeData(_this.state.treeData, expandedKeys, fieldNames);
						_this.setUncontrolledState({ flattenNodes: newFlattenTreeData });
					}).catch(function() {
						var currentExpandedKeys = _this.state.expandedKeys;
						var expandedKeysToRestore = arrDel(currentExpandedKeys, key);
						_this.setExpandedKeys(expandedKeysToRestore);
					});
				}
			});
			_defineProperty(_assertThisInitialized(_this), "onListChangeStart", function() {
				_this.setUncontrolledState({ listChanging: true });
			});
			_defineProperty(_assertThisInitialized(_this), "onListChangeEnd", function() {
				setTimeout(function() {
					_this.setUncontrolledState({ listChanging: false });
				});
			});
			_defineProperty(_assertThisInitialized(_this), "onActiveChange", function(newActiveKey) {
				var activeKey = _this.state.activeKey;
				var _this$props9 = _this.props, onActiveChange = _this$props9.onActiveChange, _this$props9$itemScro = _this$props9.itemScrollOffset, itemScrollOffset = _this$props9$itemScro === void 0 ? 0 : _this$props9$itemScro;
				if (activeKey === newActiveKey) return;
				_this.setState({ activeKey: newActiveKey });
				if (newActiveKey !== null) _this.scrollTo({
					key: newActiveKey,
					offset: itemScrollOffset
				});
				onActiveChange === null || onActiveChange === void 0 || onActiveChange(newActiveKey);
			});
			_defineProperty(_assertThisInitialized(_this), "getActiveItem", function() {
				var _this$state11 = _this.state, activeKey = _this$state11.activeKey, flattenNodes = _this$state11.flattenNodes;
				if (activeKey === null) return null;
				return flattenNodes.find(function(_ref2) {
					var key = _ref2.key;
					return key === activeKey;
				}) || null;
			});
			_defineProperty(_assertThisInitialized(_this), "offsetActiveKey", function(offset) {
				var _this$state12 = _this.state, flattenNodes = _this$state12.flattenNodes, activeKey = _this$state12.activeKey;
				var index$1 = flattenNodes.findIndex(function(_ref3) {
					var key = _ref3.key;
					return key === activeKey;
				});
				if (index$1 === -1 && offset < 0) index$1 = flattenNodes.length;
				index$1 = (index$1 + offset + flattenNodes.length) % flattenNodes.length;
				var item = flattenNodes[index$1];
				if (item) {
					var _key4 = item.key;
					_this.onActiveChange(_key4);
				} else _this.onActiveChange(null);
			});
			_defineProperty(_assertThisInitialized(_this), "onKeyDown", function(event) {
				var _this$state13 = _this.state, activeKey = _this$state13.activeKey, expandedKeys = _this$state13.expandedKeys, checkedKeys = _this$state13.checkedKeys, fieldNames = _this$state13.fieldNames;
				var _this$props10 = _this.props, onKeyDown = _this$props10.onKeyDown, checkable = _this$props10.checkable, selectable = _this$props10.selectable;
				switch (event.which) {
					case KeyCode_default.UP:
						_this.offsetActiveKey(-1);
						event.preventDefault();
						break;
					case KeyCode_default.DOWN:
						_this.offsetActiveKey(1);
						event.preventDefault();
						break;
				}
				var activeItem = _this.getActiveItem();
				if (activeItem && activeItem.data) {
					var treeNodeRequiredProps = _this.getTreeNodeRequiredProps();
					var expandable = activeItem.data.isLeaf === false || !!(activeItem.data[fieldNames.children] || []).length;
					var eventNode = convertNodePropsToEventData(_objectSpread2(_objectSpread2({}, getTreeNodeProps(activeKey, treeNodeRequiredProps)), {}, {
						data: activeItem.data,
						active: true
					}));
					switch (event.which) {
						case KeyCode_default.LEFT:
							if (expandable && expandedKeys.includes(activeKey)) _this.onNodeExpand({}, eventNode);
							else if (activeItem.parent) _this.onActiveChange(activeItem.parent.key);
							event.preventDefault();
							break;
						case KeyCode_default.RIGHT:
							if (expandable && !expandedKeys.includes(activeKey)) _this.onNodeExpand({}, eventNode);
							else if (activeItem.children && activeItem.children.length) _this.onActiveChange(activeItem.children[0].key);
							event.preventDefault();
							break;
						case KeyCode_default.ENTER:
						case KeyCode_default.SPACE:
							if (checkable && !eventNode.disabled && eventNode.checkable !== false && !eventNode.disableCheckbox) _this.onNodeCheck({}, eventNode, !checkedKeys.includes(activeKey));
							else if (!checkable && selectable && !eventNode.disabled && eventNode.selectable !== false) _this.onNodeSelect({}, eventNode);
							break;
					}
				}
				onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
			});
			_defineProperty(_assertThisInitialized(_this), "setUncontrolledState", function(state) {
				var atomic = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
				var forceState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
				if (!_this.destroyed) {
					var needSync = false;
					var allPassed = true;
					var newState = {};
					Object.keys(state).forEach(function(name) {
						if (_this.props.hasOwnProperty(name)) {
							allPassed = false;
							return;
						}
						needSync = true;
						newState[name] = state[name];
					});
					if (needSync && (!atomic || allPassed)) _this.setState(_objectSpread2(_objectSpread2({}, newState), forceState));
				}
			});
			_defineProperty(_assertThisInitialized(_this), "scrollTo", function(scroll) {
				_this.listRef.current.scrollTo(scroll);
			});
			return _this;
		}
		_createClass(Tree$1, [
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					this.destroyed = false;
					this.onUpdated();
				}
			},
			{
				key: "componentDidUpdate",
				value: function componentDidUpdate() {
					this.onUpdated();
				}
			},
			{
				key: "onUpdated",
				value: function onUpdated() {
					var _this$props11 = this.props, activeKey = _this$props11.activeKey, _this$props11$itemScr = _this$props11.itemScrollOffset, itemScrollOffset = _this$props11$itemScr === void 0 ? 0 : _this$props11$itemScr;
					if (activeKey !== void 0 && activeKey !== this.state.activeKey) {
						this.setState({ activeKey });
						if (activeKey !== null) this.scrollTo({
							key: activeKey,
							offset: itemScrollOffset
						});
					}
				}
			},
			{
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					window.removeEventListener("dragend", this.onWindowDragEnd);
					this.destroyed = true;
				}
			},
			{
				key: "resetDragState",
				value: function resetDragState() {
					this.setState({
						dragOverNodeKey: null,
						dropPosition: null,
						dropLevelOffset: null,
						dropTargetKey: null,
						dropContainerKey: null,
						dropTargetPos: null,
						dropAllowed: false
					});
				}
			},
			{
				key: "render",
				value: function render() {
					var _this$state14 = this.state, focused = _this$state14.focused, flattenNodes = _this$state14.flattenNodes, keyEntities = _this$state14.keyEntities, draggingNodeKey = _this$state14.draggingNodeKey, activeKey = _this$state14.activeKey, dropLevelOffset = _this$state14.dropLevelOffset, dropContainerKey = _this$state14.dropContainerKey, dropTargetKey = _this$state14.dropTargetKey, dropPosition = _this$state14.dropPosition, dragOverNodeKey = _this$state14.dragOverNodeKey, indent = _this$state14.indent;
					var _this$props12 = this.props, prefixCls = _this$props12.prefixCls, className = _this$props12.className, style = _this$props12.style, showLine = _this$props12.showLine, focusable = _this$props12.focusable, _this$props12$tabInde = _this$props12.tabIndex, tabIndex = _this$props12$tabInde === void 0 ? 0 : _this$props12$tabInde, selectable = _this$props12.selectable, showIcon = _this$props12.showIcon, icon = _this$props12.icon, switcherIcon = _this$props12.switcherIcon, draggable = _this$props12.draggable, checkable = _this$props12.checkable, checkStrictly = _this$props12.checkStrictly, disabled = _this$props12.disabled, motion = _this$props12.motion, loadData = _this$props12.loadData, filterTreeNode = _this$props12.filterTreeNode, height = _this$props12.height, itemHeight = _this$props12.itemHeight, scrollWidth = _this$props12.scrollWidth, virtual = _this$props12.virtual, titleRender = _this$props12.titleRender, dropIndicatorRender = _this$props12.dropIndicatorRender, onContextMenu = _this$props12.onContextMenu, onScroll = _this$props12.onScroll, direction = _this$props12.direction, rootClassName = _this$props12.rootClassName, rootStyle = _this$props12.rootStyle;
					var domProps = pickAttrs(this.props, {
						aria: true,
						data: true
					});
					var draggableConfig;
					if (draggable) if (_typeof(draggable) === "object") draggableConfig = draggable;
					else if (typeof draggable === "function") draggableConfig = { nodeDraggable: draggable };
					else draggableConfig = {};
					var contextValue = {
						prefixCls,
						selectable,
						showIcon,
						icon,
						switcherIcon,
						draggable: draggableConfig,
						draggingNodeKey,
						checkable,
						checkStrictly,
						disabled,
						keyEntities,
						dropLevelOffset,
						dropContainerKey,
						dropTargetKey,
						dropPosition,
						dragOverNodeKey,
						indent,
						direction,
						dropIndicatorRender,
						loadData,
						filterTreeNode,
						titleRender,
						onNodeClick: this.onNodeClick,
						onNodeDoubleClick: this.onNodeDoubleClick,
						onNodeExpand: this.onNodeExpand,
						onNodeSelect: this.onNodeSelect,
						onNodeCheck: this.onNodeCheck,
						onNodeLoad: this.onNodeLoad,
						onNodeMouseEnter: this.onNodeMouseEnter,
						onNodeMouseLeave: this.onNodeMouseLeave,
						onNodeContextMenu: this.onNodeContextMenu,
						onNodeDragStart: this.onNodeDragStart,
						onNodeDragEnter: this.onNodeDragEnter,
						onNodeDragOver: this.onNodeDragOver,
						onNodeDragLeave: this.onNodeDragLeave,
						onNodeDragEnd: this.onNodeDragEnd,
						onNodeDrop: this.onNodeDrop
					};
					return /* @__PURE__ */ import_react$13.createElement(TreeContext.Provider, { value: contextValue }, /* @__PURE__ */ import_react$13.createElement("div", {
						className: (0, import_classnames$1.default)(prefixCls, className, rootClassName, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-show-line"), showLine), "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-active-focused"), activeKey !== null)),
						style: rootStyle
					}, /* @__PURE__ */ import_react$13.createElement(NodeList_default, _extends({
						ref: this.listRef,
						prefixCls,
						style,
						data: flattenNodes,
						disabled,
						selectable,
						checkable: !!checkable,
						motion,
						dragging: draggingNodeKey !== null,
						height,
						itemHeight,
						virtual,
						focusable,
						focused,
						tabIndex,
						activeItem: this.getActiveItem(),
						onFocus: this.onFocus,
						onBlur: this.onBlur,
						onKeyDown: this.onKeyDown,
						onActiveChange: this.onActiveChange,
						onListChangeStart: this.onListChangeStart,
						onListChangeEnd: this.onListChangeEnd,
						onContextMenu,
						onScroll,
						scrollWidth
					}, this.getTreeNodeRequiredProps(), domProps))));
				}
			}
		], [{
			key: "getDerivedStateFromProps",
			value: function getDerivedStateFromProps(props, prevState) {
				var prevProps = prevState.prevProps;
				var newState = { prevProps: props };
				function needSync(name) {
					return !prevProps && props.hasOwnProperty(name) || prevProps && prevProps[name] !== props[name];
				}
				var treeData;
				var fieldNames = prevState.fieldNames;
				if (needSync("fieldNames")) {
					fieldNames = fillFieldNames$1(props.fieldNames);
					newState.fieldNames = fieldNames;
				}
				if (needSync("treeData")) treeData = props.treeData;
				else if (needSync("children")) {
					warning_default(false, "`children` of Tree is deprecated. Please use `treeData` instead.");
					treeData = convertTreeToData(props.children);
				}
				if (treeData) {
					newState.treeData = treeData;
					var entitiesMap = convertDataToEntities(treeData, { fieldNames });
					newState.keyEntities = _objectSpread2(_defineProperty({}, MOTION_KEY, MotionEntity), entitiesMap.keyEntities);
				}
				var keyEntities = newState.keyEntities || prevState.keyEntities;
				if (needSync("expandedKeys") || prevProps && needSync("autoExpandParent")) newState.expandedKeys = props.autoExpandParent || !prevProps && props.defaultExpandParent ? conductExpandParent(props.expandedKeys, keyEntities) : props.expandedKeys;
				else if (!prevProps && props.defaultExpandAll) {
					var cloneKeyEntities = _objectSpread2({}, keyEntities);
					delete cloneKeyEntities[MOTION_KEY];
					var nextExpandedKeys = [];
					Object.keys(cloneKeyEntities).forEach(function(key) {
						var entity = cloneKeyEntities[key];
						if (entity.children && entity.children.length) nextExpandedKeys.push(entity.key);
					});
					newState.expandedKeys = nextExpandedKeys;
				} else if (!prevProps && props.defaultExpandedKeys) newState.expandedKeys = props.autoExpandParent || props.defaultExpandParent ? conductExpandParent(props.defaultExpandedKeys, keyEntities) : props.defaultExpandedKeys;
				if (!newState.expandedKeys) delete newState.expandedKeys;
				if (treeData || newState.expandedKeys) {
					var flattenNodes = flattenTreeData(treeData || prevState.treeData, newState.expandedKeys || prevState.expandedKeys, fieldNames);
					newState.flattenNodes = flattenNodes;
				}
				if (props.selectable) {
					if (needSync("selectedKeys")) newState.selectedKeys = calcSelectedKeys(props.selectedKeys, props);
					else if (!prevProps && props.defaultSelectedKeys) newState.selectedKeys = calcSelectedKeys(props.defaultSelectedKeys, props);
				}
				if (props.checkable) {
					var checkedKeyEntity;
					if (needSync("checkedKeys")) checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {};
					else if (!prevProps && props.defaultCheckedKeys) checkedKeyEntity = parseCheckedKeys(props.defaultCheckedKeys) || {};
					else if (treeData) checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {
						checkedKeys: prevState.checkedKeys,
						halfCheckedKeys: prevState.halfCheckedKeys
					};
					if (checkedKeyEntity) {
						var _checkedKeyEntity = checkedKeyEntity, _checkedKeyEntity$che = _checkedKeyEntity.checkedKeys, checkedKeys = _checkedKeyEntity$che === void 0 ? [] : _checkedKeyEntity$che, _checkedKeyEntity$hal = _checkedKeyEntity.halfCheckedKeys, halfCheckedKeys = _checkedKeyEntity$hal === void 0 ? [] : _checkedKeyEntity$hal;
						if (!props.checkStrictly) {
							var conductKeys = conductCheck(checkedKeys, true, keyEntities);
							checkedKeys = conductKeys.checkedKeys;
							halfCheckedKeys = conductKeys.halfCheckedKeys;
						}
						newState.checkedKeys = checkedKeys;
						newState.halfCheckedKeys = halfCheckedKeys;
					}
				}
				if (needSync("loadedKeys")) newState.loadedKeys = props.loadedKeys;
				return newState;
			}
		}]);
		return Tree$1;
	}(import_react$13.Component);
	_defineProperty(Tree, "defaultProps", {
		prefixCls: "rc-tree",
		showLine: false,
		showIcon: true,
		selectable: true,
		multiple: false,
		checkable: false,
		disabled: false,
		checkStrictly: false,
		draggable: false,
		defaultExpandParent: true,
		autoExpandParent: false,
		defaultExpandAll: false,
		defaultExpandedKeys: [],
		defaultCheckedKeys: [],
		defaultSelectedKeys: [],
		dropIndicatorRender: DropIndicator_default,
		allowDrop: function allowDrop() {
			return true;
		},
		expandAction: false
	});
	_defineProperty(Tree, "TreeNode", TreeNode_default$1);
	Tree_default = Tree;
}));
var es_exports$2 = {};
__export(es_exports$2, {
	TreeNode: () => TreeNode_default$1,
	UnstableContext: () => UnstableContext,
	default: () => es_default$2
});
var es_default$2;
var init_es$2 = __esmMin((() => {
	init_Tree();
	init_TreeNode$1();
	init_contextTypes();
	es_default$2 = Tree_default;
}));
var import_react$12, useCache_default;
var init_useCache = __esmMin((() => {
	init_objectSpread2();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	useCache_default = (function(values) {
		var cacheRef = import_react$12.useRef({ valueLabels: /* @__PURE__ */ new Map() });
		return import_react$12.useMemo(function() {
			var valueLabels = cacheRef.current.valueLabels;
			var valueLabelsCache = /* @__PURE__ */ new Map();
			var filledValues = values.map(function(item) {
				var value = item.value, label = item.label;
				var mergedLabel = label !== null && label !== void 0 ? label : valueLabels.get(value);
				valueLabelsCache.set(value, mergedLabel);
				return _objectSpread2(_objectSpread2({}, item), {}, { label: mergedLabel });
			});
			cacheRef.current.valueLabels = valueLabelsCache;
			return [filledValues];
		}, [values]);
	});
}));
var import_react$11, useCheckedKeys, useCheckedKeys_default;
var init_useCheckedKeys = __esmMin((() => {
	init_toConsumableArray();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_conductUtil();
	useCheckedKeys = function useCheckedKeys$1(rawLabeledValues, rawHalfCheckedValues, treeConduction, keyEntities) {
		return import_react$11.useMemo(function() {
			var extractValues = function extractValues$1(values) {
				return values.map(function(_ref) {
					var value = _ref.value;
					return value;
				});
			};
			var checkedKeys = extractValues(rawLabeledValues);
			var halfCheckedKeys = extractValues(rawHalfCheckedValues);
			var missingValues = checkedKeys.filter(function(key) {
				return !keyEntities[key];
			});
			var finalCheckedKeys = checkedKeys;
			var finalHalfCheckedKeys = halfCheckedKeys;
			if (treeConduction) {
				var conductResult = conductCheck(checkedKeys, true, keyEntities);
				finalCheckedKeys = conductResult.checkedKeys;
				finalHalfCheckedKeys = conductResult.halfCheckedKeys;
			}
			return [Array.from(new Set([].concat(_toConsumableArray(missingValues), _toConsumableArray(finalCheckedKeys)))), finalHalfCheckedKeys];
		}, [
			rawLabeledValues,
			rawHalfCheckedValues,
			treeConduction,
			keyEntities
		]);
	};
	useCheckedKeys_default = useCheckedKeys;
}));
var toArray, fillFieldNames, isCheckDisabled, getAllKeys, isNil;
var init_valueUtil = __esmMin((() => {
	toArray = function toArray$6(value) {
		return Array.isArray(value) ? value : value !== void 0 ? [value] : [];
	};
	fillFieldNames = function fillFieldNames$4(fieldNames) {
		var _ref = fieldNames || {}, label = _ref.label, value = _ref.value, children = _ref.children;
		return {
			_title: label ? [label] : ["title", "label"],
			value: value || "value",
			key: value || "value",
			children: children || "children"
		};
	};
	isCheckDisabled = function isCheckDisabled$2(node) {
		return !node || node.disabled || node.disableCheckbox || node.checkable === false;
	};
	getAllKeys = function getAllKeys$1(treeData, fieldNames) {
		var keys = [];
		var dig = function dig$1(list) {
			list.forEach(function(item) {
				var children = item[fieldNames.children];
				if (children) {
					keys.push(item[fieldNames.value]);
					dig$1(children);
				}
			});
		};
		dig(treeData);
		return keys;
	};
	isNil = function isNil$1(val) {
		return val === null || val === void 0;
	};
}));
var import_react$10, useDataEntities_default;
var init_useDataEntities = __esmMin((() => {
	init_objectSpread2();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	init_treeUtil();
	init_warning();
	useDataEntities_default = (function(treeData, fieldNames) {
		return import_react$10.useMemo(function() {
			var collection = convertDataToEntities(treeData, {
				fieldNames,
				initWrapper: function initWrapper(wrapper) {
					return _objectSpread2(_objectSpread2({}, wrapper), {}, { valueEntities: /* @__PURE__ */ new Map() });
				},
				processEntity: function processEntity(entity, wrapper) {
					var val = entity.node[fieldNames.value];
					if (0) var key;
					wrapper.valueEntities.set(val, entity);
				}
			});
			return collection;
		}, [treeData, fieldNames]);
	});
}));
var TreeNode, TreeNode_default;
var init_TreeNode = __esmMin((() => {
	TreeNode = function TreeNode$2() {
		return null;
	};
	TreeNode_default = TreeNode;
}));
function convertChildrenToData(nodes) {
	return toArray$1(nodes).map(function(node) {
		if (!/* @__PURE__ */ import_react$9.isValidElement(node) || !node.type) return null;
		var _ref = node, key = _ref.key, _ref$props = _ref.props, children = _ref$props.children, value = _ref$props.value, restProps = _objectWithoutProperties(_ref$props, _excluded$2);
		var data = _objectSpread2({
			key,
			value
		}, restProps);
		var childData = convertChildrenToData(children);
		if (childData.length) data.children = childData;
		return data;
	}).filter(function(data) {
		return data;
	});
}
function fillLegacyProps(dataNode) {
	if (!dataNode) return dataNode;
	var cloneNode = _objectSpread2({}, dataNode);
	if (!("props" in cloneNode)) Object.defineProperty(cloneNode, "props", { get: function get() {
		warning_default(false, "New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access.");
		return cloneNode;
	} });
	return cloneNode;
}
function fillAdditionalInfo(extra, triggerValue, checkedValues, treeData, showPosition, fieldNames) {
	var triggerNode = null;
	var nodeList = null;
	function generateMap() {
		function dig(list) {
			var level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "0";
			var parentIncluded = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
			return list.map(function(option, index$1) {
				var pos = "".concat(level, "-").concat(index$1);
				var value = option[fieldNames.value];
				var included = checkedValues.includes(value);
				var children = dig(option[fieldNames.children] || [], pos, included);
				var node = /* @__PURE__ */ import_react$9.createElement(TreeNode_default, option, children.map(function(child) {
					return child.node;
				}));
				if (triggerValue === value) triggerNode = node;
				if (included) {
					var checkedNode = {
						pos,
						node,
						children
					};
					if (!parentIncluded) nodeList.push(checkedNode);
					return checkedNode;
				}
				return null;
			}).filter(function(node) {
				return node;
			});
		}
		if (!nodeList) {
			nodeList = [];
			dig(treeData);
			nodeList.sort(function(_ref2, _ref3) {
				var val1 = _ref2.node.props.value;
				var val2 = _ref3.node.props.value;
				var index1 = checkedValues.indexOf(val1);
				var index2 = checkedValues.indexOf(val2);
				return index1 - index2;
			});
		}
	}
	Object.defineProperty(extra, "triggerNode", { get: function get() {
		warning_default(false, "`triggerNode` is deprecated. Please consider decoupling data with node.");
		generateMap();
		return triggerNode;
	} });
	Object.defineProperty(extra, "allCheckedNodes", { get: function get() {
		warning_default(false, "`allCheckedNodes` is deprecated. Please consider decoupling data with node.");
		generateMap();
		if (showPosition) return nodeList;
		return nodeList.map(function(_ref4) {
			var node = _ref4.node;
			return node;
		});
	} });
}
var import_react$9, _excluded$2;
var init_legacyUtil = __esmMin((() => {
	init_objectSpread2();
	init_objectWithoutProperties();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_toArray$1();
	init_warning();
	init_TreeNode();
	_excluded$2 = ["children", "value"];
}));
var import_react$8, useFilterTreeData, useFilterTreeData_default;
var init_useFilterTreeData = __esmMin((() => {
	init_defineProperty();
	init_objectSpread2();
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_legacyUtil();
	useFilterTreeData = function useFilterTreeData$1(treeData, searchValue, options) {
		var fieldNames = options.fieldNames, treeNodeFilterProp = options.treeNodeFilterProp, filterTreeNode = options.filterTreeNode;
		var fieldChildren = fieldNames.children;
		return import_react$8.useMemo(function() {
			if (!searchValue || filterTreeNode === false) return treeData;
			var filterOptionFunc = typeof filterTreeNode === "function" ? filterTreeNode : function(_, dataNode) {
				return String(dataNode[treeNodeFilterProp]).toUpperCase().includes(searchValue.toUpperCase());
			};
			var filterTreeNodes = function filterTreeNodes$1(nodes) {
				var keepAll = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
				return nodes.reduce(function(filtered, node) {
					var children = node[fieldChildren];
					var isMatch = keepAll || filterOptionFunc(searchValue, fillLegacyProps(node));
					var filteredChildren = filterTreeNodes$1(children || [], isMatch);
					if (isMatch || filteredChildren.length) filtered.push(_objectSpread2(_objectSpread2({}, node), {}, _defineProperty({ isLeaf: void 0 }, fieldChildren, filteredChildren)));
					return filtered;
				}, []);
			};
			return filterTreeNodes(treeData);
		}, [
			treeData,
			searchValue,
			fieldChildren,
			treeNodeFilterProp,
			filterTreeNode
		]);
	};
	useFilterTreeData_default = useFilterTreeData;
}));
function useRefFunc(callback) {
	var funcRef = import_react$7.useRef();
	funcRef.current = callback;
	var cacheFn = import_react$7.useCallback(function() {
		return funcRef.current.apply(funcRef, arguments);
	}, []);
	return cacheFn;
}
var import_react$7;
var init_useRefFunc = __esmMin((() => {
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
}));
function buildTreeStructure(nodes, config) {
	var id = config.id, pId = config.pId, rootPId = config.rootPId;
	var nodeMap = /* @__PURE__ */ new Map();
	var rootNodes = [];
	nodes.forEach(function(node) {
		var nodeKey = node[id];
		var clonedNode = _objectSpread2(_objectSpread2({}, node), {}, { key: node.key || nodeKey });
		nodeMap.set(nodeKey, clonedNode);
	});
	nodeMap.forEach(function(node) {
		var parentKey = node[pId];
		var parent = nodeMap.get(parentKey);
		if (parent) {
			parent.children = parent.children || [];
			parent.children.push(node);
		} else if (parentKey === rootPId || rootPId === null) rootNodes.push(node);
	});
	return rootNodes;
}
function useTreeData(treeData, children, simpleMode) {
	return import_react$6.useMemo(function() {
		if (treeData) {
			if (simpleMode) {
				var config = _objectSpread2({
					id: "id",
					pId: "pId",
					rootPId: null
				}, _typeof(simpleMode) === "object" ? simpleMode : {});
				return buildTreeStructure(treeData, config);
			}
			return treeData;
		}
		return convertChildrenToData(children);
	}, [
		children,
		simpleMode,
		treeData
	]);
}
var import_react$6;
var init_useTreeData = __esmMin((() => {
	init_typeof();
	init_objectSpread2();
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_legacyUtil();
}));
var import_react$5, LegacySelectContext, LegacyContext_default;
var init_LegacyContext = __esmMin((() => {
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	LegacySelectContext = /* @__PURE__ */ import_react$5.createContext(null);
	LegacyContext_default = LegacySelectContext;
}));
var import_react$4, TreeSelectContext, TreeSelectContext_default;
var init_TreeSelectContext = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	TreeSelectContext = /* @__PURE__ */ import_react$4.createContext(null);
	TreeSelectContext_default = TreeSelectContext;
}));
var import_react$3, HIDDEN_STYLE, OptionList, RefOptionList, OptionList_default;
var init_OptionList = __esmMin((() => {
	init_extends();
	init_createForOfIteratorHelper();
	init_toConsumableArray();
	init_slicedToArray();
	init_es$10();
	init_es$2();
	init_KeyCode();
	init_useMemo();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_LegacyContext();
	init_TreeSelectContext();
	init_valueUtil();
	init_es$18();
	HIDDEN_STYLE = {
		width: 0,
		height: 0,
		display: "flex",
		overflow: "hidden",
		opacity: 0,
		border: 0,
		padding: 0,
		margin: 0
	};
	OptionList = function OptionList$3(_, ref) {
		var _useBaseProps = useBaseProps(), prefixCls = _useBaseProps.prefixCls, multiple = _useBaseProps.multiple, searchValue = _useBaseProps.searchValue, toggleOpen = _useBaseProps.toggleOpen, open = _useBaseProps.open, notFoundContent = _useBaseProps.notFoundContent;
		var _React$useContext = import_react$3.useContext(TreeSelectContext_default), virtual = _React$useContext.virtual, listHeight = _React$useContext.listHeight, listItemHeight = _React$useContext.listItemHeight, listItemScrollOffset = _React$useContext.listItemScrollOffset, treeData = _React$useContext.treeData, fieldNames = _React$useContext.fieldNames, onSelect = _React$useContext.onSelect, dropdownMatchSelectWidth = _React$useContext.dropdownMatchSelectWidth, treeExpandAction = _React$useContext.treeExpandAction, treeTitleRender = _React$useContext.treeTitleRender, onPopupScroll = _React$useContext.onPopupScroll, leftMaxCount = _React$useContext.leftMaxCount, leafCountOnly = _React$useContext.leafCountOnly, valueEntities = _React$useContext.valueEntities;
		var _React$useContext2 = import_react$3.useContext(LegacyContext_default), checkable = _React$useContext2.checkable, checkedKeys = _React$useContext2.checkedKeys, halfCheckedKeys = _React$useContext2.halfCheckedKeys, treeExpandedKeys = _React$useContext2.treeExpandedKeys, treeDefaultExpandAll = _React$useContext2.treeDefaultExpandAll, treeDefaultExpandedKeys = _React$useContext2.treeDefaultExpandedKeys, onTreeExpand = _React$useContext2.onTreeExpand, treeIcon = _React$useContext2.treeIcon, showTreeIcon = _React$useContext2.showTreeIcon, switcherIcon = _React$useContext2.switcherIcon, treeLine = _React$useContext2.treeLine, treeNodeFilterProp = _React$useContext2.treeNodeFilterProp, loadData = _React$useContext2.loadData, treeLoadedKeys = _React$useContext2.treeLoadedKeys, treeMotion = _React$useContext2.treeMotion, onTreeLoad = _React$useContext2.onTreeLoad, keyEntities = _React$useContext2.keyEntities;
		var treeRef = import_react$3.useRef();
		var memoTreeData = useMemo(function() {
			return treeData;
		}, [open, treeData], function(prev, next) {
			return next[0] && prev[1] !== next[1];
		});
		var mergedCheckedKeys = import_react$3.useMemo(function() {
			if (!checkable) return null;
			return {
				checked: checkedKeys,
				halfChecked: halfCheckedKeys
			};
		}, [
			checkable,
			checkedKeys,
			halfCheckedKeys
		]);
		import_react$3.useEffect(function() {
			if (open && !multiple && checkedKeys.length) {
				var _treeRef$current;
				(_treeRef$current = treeRef.current) === null || _treeRef$current === void 0 || _treeRef$current.scrollTo({ key: checkedKeys[0] });
			}
		}, [open]);
		var onListMouseDown = function onListMouseDown$1(event) {
			event.preventDefault();
		};
		var onInternalSelect = function onInternalSelect$1(__, info) {
			var node = info.node;
			if (checkable && isCheckDisabled(node)) return;
			onSelect(node.key, { selected: !checkedKeys.includes(node.key) });
			if (!multiple) toggleOpen(false);
		};
		var _React$useState = import_react$3.useState(treeDefaultExpandedKeys), _React$useState2 = _slicedToArray(_React$useState, 2), expandedKeys = _React$useState2[0], setExpandedKeys = _React$useState2[1];
		var _React$useState3 = import_react$3.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), searchExpandedKeys = _React$useState4[0], setSearchExpandedKeys = _React$useState4[1];
		var mergedExpandedKeys = import_react$3.useMemo(function() {
			if (treeExpandedKeys) return _toConsumableArray(treeExpandedKeys);
			return searchValue ? searchExpandedKeys : expandedKeys;
		}, [
			expandedKeys,
			searchExpandedKeys,
			treeExpandedKeys,
			searchValue
		]);
		var onInternalExpand = function onInternalExpand$1(keys) {
			setExpandedKeys(keys);
			setSearchExpandedKeys(keys);
			if (onTreeExpand) onTreeExpand(keys);
		};
		var lowerSearchValue = String(searchValue).toLowerCase();
		var filterTreeNode = function filterTreeNode$1(treeNode) {
			if (!lowerSearchValue) return false;
			return String(treeNode[treeNodeFilterProp]).toLowerCase().includes(lowerSearchValue);
		};
		import_react$3.useEffect(function() {
			if (searchValue) setSearchExpandedKeys(getAllKeys(treeData, fieldNames));
		}, [searchValue]);
		var _React$useState5 = import_react$3.useState(function() {
			return /* @__PURE__ */ new Map();
		}), _React$useState6 = _slicedToArray(_React$useState5, 2), disabledCache = _React$useState6[0], setDisabledCache = _React$useState6[1];
		import_react$3.useEffect(function() {
			if (leftMaxCount) setDisabledCache(/* @__PURE__ */ new Map());
		}, [leftMaxCount]);
		function getDisabledWithCache(node) {
			var value = node[fieldNames.value];
			if (!disabledCache.has(value)) {
				var entity = valueEntities.get(value);
				var isLeaf = (entity.children || []).length === 0;
				if (!isLeaf) {
					var checkableChildren = entity.children.filter(function(childTreeNode) {
						return !childTreeNode.node.disabled && !childTreeNode.node.disableCheckbox && !checkedKeys.includes(childTreeNode.node[fieldNames.value]);
					});
					var checkableChildrenCount = checkableChildren.length;
					disabledCache.set(value, checkableChildrenCount > leftMaxCount);
				} else disabledCache.set(value, false);
			}
			return disabledCache.get(value);
		}
		var nodeDisabled = useEvent(function(node) {
			var nodeValue = node[fieldNames.value];
			if (checkedKeys.includes(nodeValue)) return false;
			if (leftMaxCount === null) return false;
			if (leftMaxCount <= 0) return true;
			if (leafCountOnly && leftMaxCount) return getDisabledWithCache(node);
			return false;
		});
		var getFirstMatchingNode = function getFirstMatchingNode$1(nodes) {
			var _iterator = _createForOfIteratorHelper(nodes), _step;
			try {
				for (_iterator.s(); !(_step = _iterator.n()).done;) {
					var node = _step.value;
					if (node.disabled || node.selectable === false) continue;
					if (searchValue) {
						if (filterTreeNode(node)) return node;
					} else return node;
					if (node[fieldNames.children]) {
						var matchInChildren = getFirstMatchingNode$1(node[fieldNames.children]);
						if (matchInChildren) return matchInChildren;
					}
				}
			} catch (err) {
				_iterator.e(err);
			} finally {
				_iterator.f();
			}
			return null;
		};
		var _React$useState7 = import_react$3.useState(null), _React$useState8 = _slicedToArray(_React$useState7, 2), activeKey = _React$useState8[0], setActiveKey = _React$useState8[1];
		var activeEntity = keyEntities[activeKey];
		import_react$3.useEffect(function() {
			if (!open) return;
			var nextActiveKey = null;
			var getFirstNode = function getFirstNode$1() {
				var firstNode = getFirstMatchingNode(memoTreeData);
				return firstNode ? firstNode[fieldNames.value] : null;
			};
			if (!multiple && checkedKeys.length && !searchValue) nextActiveKey = checkedKeys[0];
			else nextActiveKey = getFirstNode();
			setActiveKey(nextActiveKey);
		}, [open, searchValue]);
		import_react$3.useImperativeHandle(ref, function() {
			var _treeRef$current2;
			return {
				scrollTo: (_treeRef$current2 = treeRef.current) === null || _treeRef$current2 === void 0 ? void 0 : _treeRef$current2.scrollTo,
				onKeyDown: function onKeyDown(event) {
					var _treeRef$current3;
					var which = event.which;
					switch (which) {
						case KeyCode_default.UP:
						case KeyCode_default.DOWN:
						case KeyCode_default.LEFT:
						case KeyCode_default.RIGHT:
							(_treeRef$current3 = treeRef.current) === null || _treeRef$current3 === void 0 || _treeRef$current3.onKeyDown(event);
							break;
						case KeyCode_default.ENTER:
							if (activeEntity) {
								var isNodeDisabled = nodeDisabled(activeEntity.node);
								var _ref = (activeEntity === null || activeEntity === void 0 ? void 0 : activeEntity.node) || {}, selectable = _ref.selectable, value = _ref.value, disabled = _ref.disabled;
								if (selectable !== false && !disabled && !isNodeDisabled) onInternalSelect(null, {
									node: { key: activeKey },
									selected: !checkedKeys.includes(value)
								});
							}
							break;
						case KeyCode_default.ESC: toggleOpen(false);
					}
				},
				onKeyUp: function onKeyUp() {}
			};
		});
		var hasLoadDataFn = useMemo(function() {
			return searchValue ? false : true;
		}, [searchValue, treeExpandedKeys || expandedKeys], function(_ref2, _ref3) {
			var _ref4 = _slicedToArray(_ref2, 1), preSearchValue = _ref4[0];
			var _ref5 = _slicedToArray(_ref3, 2), nextSearchValue = _ref5[0], nextExcludeSearchExpandedKeys = _ref5[1];
			return preSearchValue !== nextSearchValue && !!(nextSearchValue || nextExcludeSearchExpandedKeys);
		});
		var syncLoadData = hasLoadDataFn ? loadData : null;
		if (memoTreeData.length === 0) return /* @__PURE__ */ import_react$3.createElement("div", {
			role: "listbox",
			className: "".concat(prefixCls, "-empty"),
			onMouseDown: onListMouseDown
		}, notFoundContent);
		var treeProps = { fieldNames };
		if (treeLoadedKeys) treeProps.loadedKeys = treeLoadedKeys;
		if (mergedExpandedKeys) treeProps.expandedKeys = mergedExpandedKeys;
		return /* @__PURE__ */ import_react$3.createElement("div", { onMouseDown: onListMouseDown }, activeEntity && open && /* @__PURE__ */ import_react$3.createElement("span", {
			style: HIDDEN_STYLE,
			"aria-live": "assertive"
		}, activeEntity.node.value), /* @__PURE__ */ import_react$3.createElement(UnstableContext.Provider, { value: { nodeDisabled } }, /* @__PURE__ */ import_react$3.createElement(es_default$2, _extends({
			ref: treeRef,
			focusable: false,
			prefixCls: "".concat(prefixCls, "-tree"),
			treeData: memoTreeData,
			height: listHeight,
			itemHeight: listItemHeight,
			itemScrollOffset: listItemScrollOffset,
			virtual: virtual !== false && dropdownMatchSelectWidth !== false,
			multiple,
			icon: treeIcon,
			showIcon: showTreeIcon,
			switcherIcon,
			showLine: treeLine,
			loadData: syncLoadData,
			motion: treeMotion,
			activeKey,
			checkable,
			checkStrictly: true,
			checkedKeys: mergedCheckedKeys,
			selectedKeys: !checkable ? checkedKeys : [],
			defaultExpandAll: treeDefaultExpandAll,
			titleRender: treeTitleRender
		}, treeProps, {
			onActiveChange: setActiveKey,
			onSelect: onInternalSelect,
			onCheck: onInternalSelect,
			onExpand: onInternalExpand,
			onLoad: onTreeLoad,
			filterTreeNode,
			expandAction: treeExpandAction,
			onScroll: onPopupScroll
		}))));
	};
	RefOptionList = /* @__PURE__ */ import_react$3.forwardRef(OptionList);
	OptionList_default = RefOptionList;
}));
function formatStrategyValues(values, strategy, keyEntities, fieldNames) {
	var valueSet = new Set(values);
	if (strategy === SHOW_CHILD) return values.filter(function(key) {
		var entity = keyEntities[key];
		return !entity || !entity.children || !entity.children.some(function(_ref) {
			var node = _ref.node;
			return valueSet.has(node[fieldNames.value]);
		}) || !entity.children.every(function(_ref2) {
			var node = _ref2.node;
			return isCheckDisabled(node) || valueSet.has(node[fieldNames.value]);
		});
	});
	if (strategy === SHOW_PARENT) return values.filter(function(key) {
		var entity = keyEntities[key];
		var parent = entity ? entity.parent : null;
		return !parent || isCheckDisabled(parent.node) || !valueSet.has(parent.key);
	});
	return values;
}
var SHOW_ALL, SHOW_PARENT, SHOW_CHILD;
var init_strategyUtil = __esmMin((() => {
	init_valueUtil();
	SHOW_ALL = "SHOW_ALL";
	SHOW_PARENT = "SHOW_PARENT";
	SHOW_CHILD = "SHOW_CHILD";
}));
var init_warningPropsUtil = __esmMin((() => {
	init_warning();
}));
function isRawValue(value) {
	return !value || _typeof(value) !== "object";
}
var import_react$2, _excluded$1, TreeSelect, GenericTreeSelect, TreeSelect_default;
var init_TreeSelect = __esmMin((() => {
	init_extends();
	init_toConsumableArray();
	init_objectSpread2();
	init_slicedToArray();
	init_objectWithoutProperties();
	init_typeof();
	init_es$10();
	init_useId$1();
	init_conductUtil();
	init_useMergedState();
	init_warning();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_useCache();
	init_useCheckedKeys();
	init_useDataEntities();
	init_useFilterTreeData();
	init_useRefFunc();
	init_useTreeData();
	init_LegacyContext();
	init_OptionList();
	init_TreeNode();
	init_TreeSelectContext();
	init_legacyUtil();
	init_strategyUtil();
	init_valueUtil();
	init_warningPropsUtil();
	_excluded$1 = [
		"id",
		"prefixCls",
		"value",
		"defaultValue",
		"onChange",
		"onSelect",
		"onDeselect",
		"searchValue",
		"inputValue",
		"onSearch",
		"autoClearSearchValue",
		"filterTreeNode",
		"treeNodeFilterProp",
		"showCheckedStrategy",
		"treeNodeLabelProp",
		"multiple",
		"treeCheckable",
		"treeCheckStrictly",
		"labelInValue",
		"maxCount",
		"fieldNames",
		"treeDataSimpleMode",
		"treeData",
		"children",
		"loadData",
		"treeLoadedKeys",
		"onTreeLoad",
		"treeDefaultExpandAll",
		"treeExpandedKeys",
		"treeDefaultExpandedKeys",
		"onTreeExpand",
		"treeExpandAction",
		"virtual",
		"listHeight",
		"listItemHeight",
		"listItemScrollOffset",
		"onDropdownVisibleChange",
		"dropdownMatchSelectWidth",
		"treeLine",
		"treeIcon",
		"showTreeIcon",
		"switcherIcon",
		"treeMotion",
		"treeTitleRender",
		"onPopupScroll"
	];
	TreeSelect = /* @__PURE__ */ import_react$2.forwardRef(function(props, ref) {
		var id = props.id, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tree-select" : _props$prefixCls, value = props.value, defaultValue = props.defaultValue, onChange = props.onChange, onSelect = props.onSelect, onDeselect = props.onDeselect, searchValue = props.searchValue, inputValue = props.inputValue, onSearch = props.onSearch, _props$autoClearSearc = props.autoClearSearchValue, autoClearSearchValue = _props$autoClearSearc === void 0 ? true : _props$autoClearSearc, filterTreeNode = props.filterTreeNode, _props$treeNodeFilter = props.treeNodeFilterProp, treeNodeFilterProp = _props$treeNodeFilter === void 0 ? "value" : _props$treeNodeFilter, showCheckedStrategy = props.showCheckedStrategy, treeNodeLabelProp = props.treeNodeLabelProp, multiple = props.multiple, treeCheckable = props.treeCheckable, treeCheckStrictly = props.treeCheckStrictly, labelInValue = props.labelInValue, maxCount = props.maxCount, fieldNames = props.fieldNames, treeDataSimpleMode = props.treeDataSimpleMode, treeData = props.treeData, children = props.children, loadData = props.loadData, treeLoadedKeys = props.treeLoadedKeys, onTreeLoad = props.onTreeLoad, treeDefaultExpandAll = props.treeDefaultExpandAll, treeExpandedKeys = props.treeExpandedKeys, treeDefaultExpandedKeys = props.treeDefaultExpandedKeys, onTreeExpand = props.onTreeExpand, treeExpandAction = props.treeExpandAction, virtual = props.virtual, _props$listHeight = props.listHeight, listHeight = _props$listHeight === void 0 ? 200 : _props$listHeight, _props$listItemHeight = props.listItemHeight, listItemHeight = _props$listItemHeight === void 0 ? 20 : _props$listItemHeight, _props$listItemScroll = props.listItemScrollOffset, listItemScrollOffset = _props$listItemScroll === void 0 ? 0 : _props$listItemScroll, onDropdownVisibleChange = props.onDropdownVisibleChange, _props$dropdownMatchS = props.dropdownMatchSelectWidth, dropdownMatchSelectWidth = _props$dropdownMatchS === void 0 ? true : _props$dropdownMatchS, treeLine = props.treeLine, treeIcon = props.treeIcon, showTreeIcon = props.showTreeIcon, switcherIcon = props.switcherIcon, treeMotion = props.treeMotion, treeTitleRender = props.treeTitleRender, onPopupScroll = props.onPopupScroll, restProps = _objectWithoutProperties(props, _excluded$1);
		var mergedId = useId(id);
		var treeConduction = treeCheckable && !treeCheckStrictly;
		var mergedCheckable = treeCheckable || treeCheckStrictly;
		var mergedLabelInValue = treeCheckStrictly || labelInValue;
		var mergedMultiple = mergedCheckable || multiple;
		var _useMergedState = useMergedState(defaultValue, { value }), _useMergedState2 = _slicedToArray(_useMergedState, 2), internalValue = _useMergedState2[0], setInternalValue = _useMergedState2[1];
		var mergedShowCheckedStrategy = import_react$2.useMemo(function() {
			if (!treeCheckable) return SHOW_ALL;
			return showCheckedStrategy || SHOW_CHILD;
		}, [showCheckedStrategy, treeCheckable]);
		var mergedFieldNames = import_react$2.useMemo(function() {
			return fillFieldNames(fieldNames);
		}, [JSON.stringify(fieldNames)]);
		var _useMergedState3 = useMergedState("", {
			value: searchValue !== void 0 ? searchValue : inputValue,
			postState: function postState(search) {
				return search || "";
			}
		}), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedSearchValue = _useMergedState4[0], setSearchValue = _useMergedState4[1];
		var onInternalSearch = function onInternalSearch$1(searchText) {
			setSearchValue(searchText);
			onSearch === null || onSearch === void 0 || onSearch(searchText);
		};
		var mergedTreeData = useTreeData(treeData, children, treeDataSimpleMode);
		var _useDataEntities = useDataEntities_default(mergedTreeData, mergedFieldNames), keyEntities = _useDataEntities.keyEntities, valueEntities = _useDataEntities.valueEntities;
		var splitRawValues = import_react$2.useCallback(function(newRawValues) {
			var missingRawValues = [];
			var existRawValues = [];
			newRawValues.forEach(function(val) {
				if (valueEntities.has(val)) existRawValues.push(val);
				else missingRawValues.push(val);
			});
			return {
				missingRawValues,
				existRawValues
			};
		}, [valueEntities]);
		var filteredTreeData = useFilterTreeData_default(mergedTreeData, mergedSearchValue, {
			fieldNames: mergedFieldNames,
			treeNodeFilterProp,
			filterTreeNode
		});
		var getLabel = import_react$2.useCallback(function(item) {
			if (item) {
				if (treeNodeLabelProp) return item[treeNodeLabelProp];
				var titleList = mergedFieldNames._title;
				for (var i = 0; i < titleList.length; i += 1) {
					var title = item[titleList[i]];
					if (title !== void 0) return title;
				}
			}
		}, [mergedFieldNames, treeNodeLabelProp]);
		var toLabeledValues = import_react$2.useCallback(function(draftValues) {
			var values = toArray(draftValues);
			return values.map(function(val) {
				if (isRawValue(val)) return { value: val };
				return val;
			});
		}, []);
		var convert2LabelValues = import_react$2.useCallback(function(draftValues) {
			var values = toLabeledValues(draftValues);
			return values.map(function(item) {
				var rawLabel = item.label;
				var rawValue = item.value, rawHalfChecked = item.halfChecked;
				var rawDisabled;
				var entity = valueEntities.get(rawValue);
				if (entity) {
					var _rawLabel;
					rawLabel = treeTitleRender ? treeTitleRender(entity.node) : (_rawLabel = rawLabel) !== null && _rawLabel !== void 0 ? _rawLabel : getLabel(entity.node);
					rawDisabled = entity.node.disabled;
				} else if (rawLabel === void 0) {
					var labelInValueItem = toLabeledValues(internalValue).find(function(labeledItem) {
						return labeledItem.value === rawValue;
					});
					rawLabel = labelInValueItem.label;
				}
				return {
					label: rawLabel,
					value: rawValue,
					halfChecked: rawHalfChecked,
					disabled: rawDisabled
				};
			});
		}, [
			valueEntities,
			getLabel,
			toLabeledValues,
			internalValue
		]);
		var rawMixedLabeledValues = import_react$2.useMemo(function() {
			return toLabeledValues(internalValue === null ? [] : internalValue);
		}, [toLabeledValues, internalValue]);
		var _React$useMemo = import_react$2.useMemo(function() {
			var fullCheckValues = [];
			var halfCheckValues = [];
			rawMixedLabeledValues.forEach(function(item) {
				if (item.halfChecked) halfCheckValues.push(item);
				else fullCheckValues.push(item);
			});
			return [fullCheckValues, halfCheckValues];
		}, [rawMixedLabeledValues]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), rawLabeledValues = _React$useMemo2[0], rawHalfLabeledValues = _React$useMemo2[1];
		var rawValues = import_react$2.useMemo(function() {
			return rawLabeledValues.map(function(item) {
				return item.value;
			});
		}, [rawLabeledValues]);
		var _useCheckedKeys = useCheckedKeys_default(rawLabeledValues, rawHalfLabeledValues, treeConduction, keyEntities), _useCheckedKeys2 = _slicedToArray(_useCheckedKeys, 2), rawCheckedValues = _useCheckedKeys2[0], rawHalfCheckedValues = _useCheckedKeys2[1];
		var displayValues = import_react$2.useMemo(function() {
			var displayKeys = formatStrategyValues(rawCheckedValues, mergedShowCheckedStrategy, keyEntities, mergedFieldNames);
			var values = displayKeys.map(function(key) {
				var _keyEntities$key$node, _keyEntities$key;
				return (_keyEntities$key$node = (_keyEntities$key = keyEntities[key]) === null || _keyEntities$key === void 0 || (_keyEntities$key = _keyEntities$key.node) === null || _keyEntities$key === void 0 ? void 0 : _keyEntities$key[mergedFieldNames.value]) !== null && _keyEntities$key$node !== void 0 ? _keyEntities$key$node : key;
			});
			var labeledValues = values.map(function(val) {
				var targetItem = rawLabeledValues.find(function(item) {
					return item.value === val;
				});
				var label = labelInValue ? targetItem === null || targetItem === void 0 ? void 0 : targetItem.label : treeTitleRender === null || treeTitleRender === void 0 ? void 0 : treeTitleRender(targetItem);
				return {
					value: val,
					label
				};
			});
			var rawDisplayValues = convert2LabelValues(labeledValues);
			var firstVal = rawDisplayValues[0];
			if (!mergedMultiple && firstVal && isNil(firstVal.value) && isNil(firstVal.label)) return [];
			return rawDisplayValues.map(function(item) {
				var _item$label;
				return _objectSpread2(_objectSpread2({}, item), {}, { label: (_item$label = item.label) !== null && _item$label !== void 0 ? _item$label : item.value });
			});
		}, [
			mergedFieldNames,
			mergedMultiple,
			rawCheckedValues,
			rawLabeledValues,
			convert2LabelValues,
			mergedShowCheckedStrategy,
			keyEntities
		]);
		var _useCache = useCache_default(displayValues), _useCache2 = _slicedToArray(_useCache, 1), cachedDisplayValues = _useCache2[0];
		var mergedMaxCount = import_react$2.useMemo(function() {
			if (mergedMultiple && (mergedShowCheckedStrategy === "SHOW_CHILD" || treeCheckStrictly || !treeCheckable)) return maxCount;
			return null;
		}, [
			maxCount,
			mergedMultiple,
			treeCheckStrictly,
			mergedShowCheckedStrategy,
			treeCheckable
		]);
		var triggerChange = useRefFunc(function(newRawValues, extra, source) {
			var formattedKeyList = formatStrategyValues(newRawValues, mergedShowCheckedStrategy, keyEntities, mergedFieldNames);
			if (mergedMaxCount && formattedKeyList.length > mergedMaxCount) return;
			var labeledValues = convert2LabelValues(newRawValues);
			setInternalValue(labeledValues);
			if (autoClearSearchValue) setSearchValue("");
			if (onChange) {
				var eventValues = newRawValues;
				if (treeConduction) eventValues = formattedKeyList.map(function(key) {
					var entity = valueEntities.get(key);
					return entity ? entity.node[mergedFieldNames.value] : key;
				});
				var _ref = extra || {
					triggerValue: void 0,
					selected: void 0
				}, triggerValue = _ref.triggerValue, selected = _ref.selected;
				var returnRawValues = eventValues;
				if (treeCheckStrictly) {
					var halfValues = rawHalfLabeledValues.filter(function(item) {
						return !eventValues.includes(item.value);
					});
					returnRawValues = [].concat(_toConsumableArray(returnRawValues), _toConsumableArray(halfValues));
				}
				var returnLabeledValues = convert2LabelValues(returnRawValues);
				var additionalInfo = {
					preValue: rawLabeledValues,
					triggerValue
				};
				var showPosition = true;
				if (treeCheckStrictly || source === "selection" && !selected) showPosition = false;
				fillAdditionalInfo(additionalInfo, triggerValue, newRawValues, mergedTreeData, showPosition, mergedFieldNames);
				if (mergedCheckable) additionalInfo.checked = selected;
				else additionalInfo.selected = selected;
				var returnValues = mergedLabelInValue ? returnLabeledValues : returnLabeledValues.map(function(item) {
					return item.value;
				});
				onChange(mergedMultiple ? returnValues : returnValues[0], mergedLabelInValue ? null : returnLabeledValues.map(function(item) {
					return item.label;
				}), additionalInfo);
			}
		});
		var onOptionSelect = import_react$2.useCallback(function(selectedKey, _ref2) {
			var _node$mergedFieldName;
			var selected = _ref2.selected, source = _ref2.source;
			var entity = keyEntities[selectedKey];
			var node = entity === null || entity === void 0 ? void 0 : entity.node;
			var selectedValue = (_node$mergedFieldName = node === null || node === void 0 ? void 0 : node[mergedFieldNames.value]) !== null && _node$mergedFieldName !== void 0 ? _node$mergedFieldName : selectedKey;
			if (!mergedMultiple) triggerChange([selectedValue], {
				selected: true,
				triggerValue: selectedValue
			}, "option");
			else {
				var newRawValues = selected ? [].concat(_toConsumableArray(rawValues), [selectedValue]) : rawCheckedValues.filter(function(v) {
					return v !== selectedValue;
				});
				if (treeConduction) {
					var _splitRawValues = splitRawValues(newRawValues), missingRawValues = _splitRawValues.missingRawValues, existRawValues = _splitRawValues.existRawValues;
					var keyList = existRawValues.map(function(val) {
						return valueEntities.get(val).key;
					});
					var checkedKeys;
					if (selected) {
						var _conductCheck = conductCheck(keyList, true, keyEntities);
						checkedKeys = _conductCheck.checkedKeys;
					} else {
						var _conductCheck2 = conductCheck(keyList, {
							checked: false,
							halfCheckedKeys: rawHalfCheckedValues
						}, keyEntities);
						checkedKeys = _conductCheck2.checkedKeys;
					}
					newRawValues = [].concat(_toConsumableArray(missingRawValues), _toConsumableArray(checkedKeys.map(function(key) {
						return keyEntities[key].node[mergedFieldNames.value];
					})));
				}
				triggerChange(newRawValues, {
					selected,
					triggerValue: selectedValue
				}, source || "option");
			}
			if (selected || !mergedMultiple) onSelect === null || onSelect === void 0 || onSelect(selectedValue, fillLegacyProps(node));
			else onDeselect === null || onDeselect === void 0 || onDeselect(selectedValue, fillLegacyProps(node));
		}, [
			splitRawValues,
			valueEntities,
			keyEntities,
			mergedFieldNames,
			mergedMultiple,
			rawValues,
			triggerChange,
			treeConduction,
			onSelect,
			onDeselect,
			rawCheckedValues,
			rawHalfCheckedValues,
			maxCount
		]);
		var onInternalDropdownVisibleChange = import_react$2.useCallback(function(open) {
			if (onDropdownVisibleChange) {
				var legacyParam = {};
				Object.defineProperty(legacyParam, "documentClickClose", { get: function get() {
					warning_default(false, "Second param of `onDropdownVisibleChange` has been removed.");
					return false;
				} });
				onDropdownVisibleChange(open, legacyParam);
			}
		}, [onDropdownVisibleChange]);
		var onDisplayValuesChange = useRefFunc(function(newValues, info) {
			var newRawValues = newValues.map(function(item) {
				return item.value;
			});
			if (info.type === "clear") {
				triggerChange(newRawValues, {}, "selection");
				return;
			}
			if (info.values.length) onOptionSelect(info.values[0].value, {
				selected: false,
				source: "selection"
			});
		});
		var treeSelectContext = import_react$2.useMemo(function() {
			return {
				virtual,
				dropdownMatchSelectWidth,
				listHeight,
				listItemHeight,
				listItemScrollOffset,
				treeData: filteredTreeData,
				fieldNames: mergedFieldNames,
				onSelect: onOptionSelect,
				treeExpandAction,
				treeTitleRender,
				onPopupScroll,
				leftMaxCount: maxCount === void 0 ? null : maxCount - cachedDisplayValues.length,
				leafCountOnly: mergedShowCheckedStrategy === "SHOW_CHILD" && !treeCheckStrictly && !!treeCheckable,
				valueEntities
			};
		}, [
			virtual,
			dropdownMatchSelectWidth,
			listHeight,
			listItemHeight,
			listItemScrollOffset,
			filteredTreeData,
			mergedFieldNames,
			onOptionSelect,
			treeExpandAction,
			treeTitleRender,
			onPopupScroll,
			maxCount,
			cachedDisplayValues.length,
			mergedShowCheckedStrategy,
			treeCheckStrictly,
			treeCheckable,
			valueEntities
		]);
		var legacyContext = import_react$2.useMemo(function() {
			return {
				checkable: mergedCheckable,
				loadData,
				treeLoadedKeys,
				onTreeLoad,
				checkedKeys: rawCheckedValues,
				halfCheckedKeys: rawHalfCheckedValues,
				treeDefaultExpandAll,
				treeExpandedKeys,
				treeDefaultExpandedKeys,
				onTreeExpand,
				treeIcon,
				treeMotion,
				showTreeIcon,
				switcherIcon,
				treeLine,
				treeNodeFilterProp,
				keyEntities
			};
		}, [
			mergedCheckable,
			loadData,
			treeLoadedKeys,
			onTreeLoad,
			rawCheckedValues,
			rawHalfCheckedValues,
			treeDefaultExpandAll,
			treeExpandedKeys,
			treeDefaultExpandedKeys,
			onTreeExpand,
			treeIcon,
			treeMotion,
			showTreeIcon,
			switcherIcon,
			treeLine,
			treeNodeFilterProp,
			keyEntities
		]);
		return /* @__PURE__ */ import_react$2.createElement(TreeSelectContext_default.Provider, { value: treeSelectContext }, /* @__PURE__ */ import_react$2.createElement(LegacyContext_default.Provider, { value: legacyContext }, /* @__PURE__ */ import_react$2.createElement(BaseSelect_default, _extends({ ref }, restProps, {
			id: mergedId,
			prefixCls,
			mode: mergedMultiple ? "multiple" : void 0,
			displayValues: cachedDisplayValues,
			onDisplayValuesChange,
			searchValue: mergedSearchValue,
			onSearch: onInternalSearch,
			OptionList: OptionList_default,
			emptyOptions: !mergedTreeData.length,
			onDropdownVisibleChange: onInternalDropdownVisibleChange,
			dropdownMatchSelectWidth
		}))));
	});
	GenericTreeSelect = TreeSelect;
	GenericTreeSelect.TreeNode = TreeNode_default;
	GenericTreeSelect.SHOW_ALL = SHOW_ALL;
	GenericTreeSelect.SHOW_PARENT = SHOW_PARENT;
	GenericTreeSelect.SHOW_CHILD = SHOW_CHILD;
	TreeSelect_default = GenericTreeSelect;
}));
var es_exports$1 = {};
__export(es_exports$1, {
	SHOW_ALL: () => SHOW_ALL,
	SHOW_CHILD: () => SHOW_CHILD,
	SHOW_PARENT: () => SHOW_PARENT,
	TreeNode: () => TreeNode_default,
	default: () => es_default$1
});
var es_default$1;
var init_es$1 = __esmMin((() => {
	init_TreeSelect();
	init_TreeNode();
	init_strategyUtil();
	es_default$1 = TreeSelect_default;
}));
var require_toggle_selection = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function() {
		var selection = document.getSelection();
		if (!selection.rangeCount) return function() {};
		var active = document.activeElement;
		var ranges = [];
		for (var i = 0; i < selection.rangeCount; i++) ranges.push(selection.getRangeAt(i));
		switch (active.tagName.toUpperCase()) {
			case "INPUT":
			case "TEXTAREA":
				active.blur();
				break;
			default:
				active = null;
				break;
		}
		selection.removeAllRanges();
		return function() {
			selection.type === "Caret" && selection.removeAllRanges();
			if (!selection.rangeCount) ranges.forEach(function(range) {
				selection.addRange(range);
			});
			active && active.focus();
		};
	};
}));
var require_copy_to_clipboard = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var deselectCurrent = require_toggle_selection();
	var clipboardToIE11Formatting = {
		"text/plain": "Text",
		"text/html": "Url",
		"default": "Text"
	};
	var defaultMessage = "Copy to clipboard: #{key}, Enter";
	function format(message) {
		var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
		return message.replace(/#{\s*key\s*}/g, copyKey);
	}
	function copy(text, options) {
		var debug, message, reselectPrevious, range, selection, mark, success = false;
		if (!options) options = {};
		debug = options.debug || false;
		try {
			reselectPrevious = deselectCurrent();
			range = document.createRange();
			selection = document.getSelection();
			mark = document.createElement("span");
			mark.textContent = text;
			mark.ariaHidden = "true";
			mark.style.all = "unset";
			mark.style.position = "fixed";
			mark.style.top = 0;
			mark.style.clip = "rect(0, 0, 0, 0)";
			mark.style.whiteSpace = "pre";
			mark.style.webkitUserSelect = "text";
			mark.style.MozUserSelect = "text";
			mark.style.msUserSelect = "text";
			mark.style.userSelect = "text";
			mark.addEventListener("copy", function(e) {
				e.stopPropagation();
				if (options.format) {
					e.preventDefault();
					if (typeof e.clipboardData === "undefined") {
						debug && console.warn("unable to use e.clipboardData");
						debug && console.warn("trying IE specific stuff");
						window.clipboardData.clearData();
						var format$1 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
						window.clipboardData.setData(format$1, text);
					} else {
						e.clipboardData.clearData();
						e.clipboardData.setData(options.format, text);
					}
				}
				if (options.onCopy) {
					e.preventDefault();
					options.onCopy(e.clipboardData);
				}
			});
			document.body.appendChild(mark);
			range.selectNodeContents(mark);
			selection.addRange(range);
			var successful = document.execCommand("copy");
			if (!successful) throw new Error("copy command was unsuccessful");
			success = true;
		} catch (err) {
			debug && console.error("unable to copy using execCommand: ", err);
			debug && console.warn("trying IE specific stuff");
			try {
				window.clipboardData.setData(options.format || "text", text);
				options.onCopy && options.onCopy(window.clipboardData);
				success = true;
			} catch (err$1) {
				debug && console.error("unable to copy using clipboardData: ", err$1);
				debug && console.error("falling back to prompt");
				message = format("message" in options ? options.message : defaultMessage);
				window.prompt(message, text);
			}
		} finally {
			if (selection) if (typeof selection.removeRange == "function") selection.removeRange(range);
			else selection.removeAllRanges();
			if (mark) document.body.removeChild(mark);
			reselectPrevious();
		}
		return success;
	}
	module.exports = copy;
}));
var attr_accept_default;
var init_attr_accept = __esmMin((() => {
	init_warning();
	attr_accept_default = (function(file, acceptedFiles) {
		if (file && acceptedFiles) {
			var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
			var fileName = file.name || "";
			var mimeType = file.type || "";
			var baseMimeType = mimeType.replace(/\/.*$/, "");
			return acceptedFilesArray.some(function(type) {
				var validType = type.trim();
				if (/^\*(\/\*)?$/.test(type)) return true;
				if (validType.charAt(0) === ".") {
					var lowerFileName = fileName.toLowerCase();
					var lowerType = validType.toLowerCase();
					var affixList = [lowerType];
					if (lowerType === ".jpg" || lowerType === ".jpeg") affixList = [".jpg", ".jpeg"];
					return affixList.some(function(affix) {
						return lowerFileName.endsWith(affix);
					});
				}
				if (/\/\*$/.test(validType)) return baseMimeType === validType.replace(/\/.*$/, "");
				if (mimeType === validType) return true;
				if (/^\w+$/.test(validType)) {
					warning_default(false, "Upload takes an invalidate 'accept' type '".concat(validType, "'.Skip for check."));
					return true;
				}
				return false;
			});
		}
		return true;
	});
}));
function getError(option, xhr) {
	var msg = "cannot ".concat(option.method, " ").concat(option.action, " ").concat(xhr.status, "'");
	var err = new Error(msg);
	err.status = xhr.status;
	err.method = option.method;
	err.url = option.action;
	return err;
}
function getBody(xhr) {
	var text = xhr.responseText || xhr.response;
	if (!text) return text;
	try {
		return JSON.parse(text);
	} catch (e) {
		return text;
	}
}
function upload(option) {
	var xhr = new XMLHttpRequest();
	if (option.onProgress && xhr.upload) xhr.upload.onprogress = function progress(e) {
		if (e.total > 0) e.percent = e.loaded / e.total * 100;
		option.onProgress(e);
	};
	var formData = new FormData();
	if (option.data) Object.keys(option.data).forEach(function(key) {
		var value = option.data[key];
		if (Array.isArray(value)) {
			value.forEach(function(item) {
				formData.append("".concat(key, "[]"), item);
			});
			return;
		}
		formData.append(key, value);
	});
	if (option.file instanceof Blob) formData.append(option.filename, option.file, option.file.name);
	else formData.append(option.filename, option.file);
	xhr.onerror = function error(e) {
		option.onError(e);
	};
	xhr.onload = function onload() {
		if (xhr.status < 200 || xhr.status >= 300) return option.onError(getError(option, xhr), getBody(xhr));
		return option.onSuccess(getBody(xhr), xhr);
	};
	xhr.open(option.method, option.action, true);
	if (option.withCredentials && "withCredentials" in xhr) xhr.withCredentials = true;
	var headers = option.headers || {};
	if (headers["X-Requested-With"] !== null) xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	Object.keys(headers).forEach(function(h) {
		if (headers[h] !== null) xhr.setRequestHeader(h, headers[h]);
	});
	xhr.send(formData);
	return { abort: function abort() {
		xhr.abort();
	} };
}
var init_request = __esmMin((() => {}));
var traverseFileTree, traverseFileTree_default;
var init_traverseFileTree = __esmMin((() => {
	init_regeneratorRuntime();
	init_toConsumableArray();
	init_asyncToGenerator();
	traverseFileTree = /* @__PURE__ */ function() {
		var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(files, isAccepted) {
			var flattenFileList, progressFileList, readDirectory, _readDirectory, readFile, _readFile, _traverseFileTree, wipIndex;
			return _regeneratorRuntime().wrap(function _callee4$(_context4) {
				while (1) switch (_context4.prev = _context4.next) {
					case 0:
						_readFile = function _readFile3() {
							_readFile = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(item) {
								return _regeneratorRuntime().wrap(function _callee3$(_context3) {
									while (1) switch (_context3.prev = _context3.next) {
										case 0: return _context3.abrupt("return", new Promise(function(reslove) {
											item.file(function(file) {
												if (isAccepted(file)) {
													if (item.fullPath && !file.webkitRelativePath) {
														Object.defineProperties(file, { webkitRelativePath: { writable: true } });
														file.webkitRelativePath = item.fullPath.replace(/^\//, "");
														Object.defineProperties(file, { webkitRelativePath: { writable: false } });
													}
													reslove(file);
												} else reslove(null);
											});
										}));
										case 1:
										case "end": return _context3.stop();
									}
								}, _callee3);
							}));
							return _readFile.apply(this, arguments);
						};
						readFile = function _readFile2(_x4) {
							return _readFile.apply(this, arguments);
						};
						_readDirectory = function _readDirectory3() {
							_readDirectory = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(directory) {
								var dirReader, entries, results, n, i;
								return _regeneratorRuntime().wrap(function _callee2$(_context2) {
									while (1) switch (_context2.prev = _context2.next) {
										case 0:
											dirReader = directory.createReader();
											entries = [];
										case 2:
											_context2.next = 5;
											return new Promise(function(resolve) {
												dirReader.readEntries(resolve, function() {
													return resolve([]);
												});
											});
										case 5:
											results = _context2.sent;
											n = results.length;
											if (n) {
												_context2.next = 9;
												break;
											}
											return _context2.abrupt("break", 12);
										case 9:
											for (i = 0; i < n; i++) entries.push(results[i]);
											_context2.next = 2;
											break;
										case 12: return _context2.abrupt("return", entries);
										case 13:
										case "end": return _context2.stop();
									}
								}, _callee2);
							}));
							return _readDirectory.apply(this, arguments);
						};
						readDirectory = function _readDirectory2(_x3) {
							return _readDirectory.apply(this, arguments);
						};
						flattenFileList = [];
						progressFileList = [];
						files.forEach(function(file) {
							return progressFileList.push(file.webkitGetAsEntry());
						});
						_traverseFileTree = /* @__PURE__ */ function() {
							var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(item, path) {
								var _file, entries;
								return _regeneratorRuntime().wrap(function _callee$(_context) {
									while (1) switch (_context.prev = _context.next) {
										case 0:
											if (item) {
												_context.next = 2;
												break;
											}
											return _context.abrupt("return");
										case 2:
											item.path = path || "";
											if (!item.isFile) {
												_context.next = 10;
												break;
											}
											_context.next = 6;
											return readFile(item);
										case 6:
											_file = _context.sent;
											if (_file) flattenFileList.push(_file);
											_context.next = 15;
											break;
										case 10:
											if (!item.isDirectory) {
												_context.next = 15;
												break;
											}
											_context.next = 13;
											return readDirectory(item);
										case 13:
											entries = _context.sent;
											progressFileList.push.apply(progressFileList, _toConsumableArray(entries));
										case 15:
										case "end": return _context.stop();
									}
								}, _callee);
							}));
							return function _traverseFileTree$1(_x5, _x6) {
								return _ref2.apply(this, arguments);
							};
						}();
						wipIndex = 0;
					case 9:
						if (!(wipIndex < progressFileList.length)) {
							_context4.next = 15;
							break;
						}
						_context4.next = 12;
						return _traverseFileTree(progressFileList[wipIndex]);
					case 12:
						wipIndex++;
						_context4.next = 9;
						break;
					case 15: return _context4.abrupt("return", flattenFileList);
					case 16:
					case "end": return _context4.stop();
				}
			}, _callee4);
		}));
		return function traverseFileTree$1(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();
	traverseFileTree_default = traverseFileTree;
}));
function uid() {
	return "rc-upload-".concat(now, "-").concat(++index);
}
var now, index;
var init_uid = __esmMin((() => {
	now = +/* @__PURE__ */ new Date();
	index = 0;
}));
var import_classnames, import_react$1, _excluded, AjaxUploader, AjaxUploader_default;
var init_AjaxUploader = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_objectWithoutProperties();
	init_typeof();
	init_regeneratorRuntime();
	init_asyncToGenerator();
	init_toConsumableArray();
	init_classCallCheck();
	init_createClass();
	init_assertThisInitialized();
	init_inherits();
	init_createSuper();
	init_defineProperty();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	init_pickAttrs();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_attr_accept();
	init_request();
	init_traverseFileTree();
	init_uid();
	_excluded = [
		"component",
		"prefixCls",
		"className",
		"classNames",
		"disabled",
		"id",
		"name",
		"style",
		"styles",
		"multiple",
		"accept",
		"capture",
		"children",
		"directory",
		"openFileDialogOnClick",
		"onMouseEnter",
		"onMouseLeave",
		"hasControlInside"
	];
	AjaxUploader = /* @__PURE__ */ function(_Component) {
		_inherits(AjaxUploader$1, _Component);
		var _super = _createSuper(AjaxUploader$1);
		function AjaxUploader$1() {
			var _this;
			_classCallCheck(this, AjaxUploader$1);
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _super.call.apply(_super, [this].concat(args));
			_defineProperty(_assertThisInitialized(_this), "state", { uid: uid() });
			_defineProperty(_assertThisInitialized(_this), "reqs", {});
			_defineProperty(_assertThisInitialized(_this), "fileInput", void 0);
			_defineProperty(_assertThisInitialized(_this), "_isMounted", void 0);
			_defineProperty(_assertThisInitialized(_this), "onChange", function(e) {
				var _this$props = _this.props, accept = _this$props.accept, directory = _this$props.directory;
				var files = e.target.files;
				var acceptedFiles = _toConsumableArray(files).filter(function(file) {
					return !directory || attr_accept_default(file, accept);
				});
				_this.uploadFiles(acceptedFiles);
				_this.reset();
			});
			_defineProperty(_assertThisInitialized(_this), "onClick", function(event) {
				var el = _this.fileInput;
				if (!el) return;
				var target = event.target;
				var onClick = _this.props.onClick;
				if (target && target.tagName === "BUTTON") {
					var parent = el.parentNode;
					parent.focus();
					target.blur();
				}
				el.click();
				if (onClick) onClick(event);
			});
			_defineProperty(_assertThisInitialized(_this), "onKeyDown", function(e) {
				if (e.key === "Enter") _this.onClick(e);
			});
			_defineProperty(_assertThisInitialized(_this), "onDataTransferFiles", /* @__PURE__ */ function() {
				var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(dataTransfer, existFileCallback) {
					var _this$props2, multiple, accept, directory, items, files, acceptFiles;
					return _regeneratorRuntime().wrap(function _callee$(_context) {
						while (1) switch (_context.prev = _context.next) {
							case 0:
								_this$props2 = _this.props, multiple = _this$props2.multiple, accept = _this$props2.accept, directory = _this$props2.directory;
								items = _toConsumableArray(dataTransfer.items || []);
								files = _toConsumableArray(dataTransfer.files || []);
								if (files.length > 0 || items.some(function(item) {
									return item.kind === "file";
								})) existFileCallback === null || existFileCallback === void 0 || existFileCallback();
								if (!directory) {
									_context.next = 11;
									break;
								}
								_context.next = 7;
								return traverseFileTree_default(Array.prototype.slice.call(items), function(_file) {
									return attr_accept_default(_file, _this.props.accept);
								});
							case 7:
								files = _context.sent;
								_this.uploadFiles(files);
								_context.next = 14;
								break;
							case 11:
								acceptFiles = _toConsumableArray(files).filter(function(file) {
									return attr_accept_default(file, accept);
								});
								if (multiple === false) acceptFiles = files.slice(0, 1);
								_this.uploadFiles(acceptFiles);
							case 14:
							case "end": return _context.stop();
						}
					}, _callee);
				}));
				return function(_x, _x2) {
					return _ref.apply(this, arguments);
				};
			}());
			_defineProperty(_assertThisInitialized(_this), "onFilePaste", /* @__PURE__ */ function() {
				var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(e) {
					var pastable, clipboardData;
					return _regeneratorRuntime().wrap(function _callee2$(_context2) {
						while (1) switch (_context2.prev = _context2.next) {
							case 0:
								pastable = _this.props.pastable;
								if (pastable) {
									_context2.next = 3;
									break;
								}
								return _context2.abrupt("return");
							case 3:
								if (!(e.type === "paste")) {
									_context2.next = 6;
									break;
								}
								clipboardData = e.clipboardData;
								return _context2.abrupt("return", _this.onDataTransferFiles(clipboardData, function() {
									e.preventDefault();
								}));
							case 6:
							case "end": return _context2.stop();
						}
					}, _callee2);
				}));
				return function(_x3) {
					return _ref2.apply(this, arguments);
				};
			}());
			_defineProperty(_assertThisInitialized(_this), "onFileDragOver", function(e) {
				e.preventDefault();
			});
			_defineProperty(_assertThisInitialized(_this), "onFileDrop", /* @__PURE__ */ function() {
				var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(e) {
					var dataTransfer;
					return _regeneratorRuntime().wrap(function _callee3$(_context3) {
						while (1) switch (_context3.prev = _context3.next) {
							case 0:
								e.preventDefault();
								if (!(e.type === "drop")) {
									_context3.next = 4;
									break;
								}
								dataTransfer = e.dataTransfer;
								return _context3.abrupt("return", _this.onDataTransferFiles(dataTransfer));
							case 4:
							case "end": return _context3.stop();
						}
					}, _callee3);
				}));
				return function(_x4) {
					return _ref3.apply(this, arguments);
				};
			}());
			_defineProperty(_assertThisInitialized(_this), "uploadFiles", function(files) {
				var originFiles = _toConsumableArray(files);
				var postFiles = originFiles.map(function(file) {
					file.uid = uid();
					return _this.processFile(file, originFiles);
				});
				Promise.all(postFiles).then(function(fileList) {
					var onBatchStart = _this.props.onBatchStart;
					onBatchStart === null || onBatchStart === void 0 || onBatchStart(fileList.map(function(_ref4) {
						var origin = _ref4.origin, parsedFile = _ref4.parsedFile;
						return {
							file: origin,
							parsedFile
						};
					}));
					fileList.filter(function(file) {
						return file.parsedFile !== null;
					}).forEach(function(file) {
						_this.post(file);
					});
				});
			});
			_defineProperty(_assertThisInitialized(_this), "processFile", /* @__PURE__ */ function() {
				var _ref5 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(file, fileList) {
					var beforeUpload, transformedFile, action, mergedAction, data, mergedData, parsedData, parsedFile, mergedParsedFile;
					return _regeneratorRuntime().wrap(function _callee4$(_context4) {
						while (1) switch (_context4.prev = _context4.next) {
							case 0:
								beforeUpload = _this.props.beforeUpload;
								transformedFile = file;
								if (!beforeUpload) {
									_context4.next = 14;
									break;
								}
								_context4.prev = 3;
								_context4.next = 6;
								return beforeUpload(file, fileList);
							case 6:
								transformedFile = _context4.sent;
								_context4.next = 12;
								break;
							case 9:
								_context4.prev = 9;
								_context4.t0 = _context4["catch"](3);
								transformedFile = false;
							case 12:
								if (!(transformedFile === false)) {
									_context4.next = 14;
									break;
								}
								return _context4.abrupt("return", {
									origin: file,
									parsedFile: null,
									action: null,
									data: null
								});
							case 14:
								action = _this.props.action;
								if (!(typeof action === "function")) {
									_context4.next = 21;
									break;
								}
								_context4.next = 18;
								return action(file);
							case 18:
								mergedAction = _context4.sent;
								_context4.next = 22;
								break;
							case 21: mergedAction = action;
							case 22:
								data = _this.props.data;
								if (!(typeof data === "function")) {
									_context4.next = 29;
									break;
								}
								_context4.next = 26;
								return data(file);
							case 26:
								mergedData = _context4.sent;
								_context4.next = 30;
								break;
							case 29: mergedData = data;
							case 30:
								parsedData = (_typeof(transformedFile) === "object" || typeof transformedFile === "string") && transformedFile ? transformedFile : file;
								if (parsedData instanceof File) parsedFile = parsedData;
								else parsedFile = new File([parsedData], file.name, { type: file.type });
								mergedParsedFile = parsedFile;
								mergedParsedFile.uid = file.uid;
								return _context4.abrupt("return", {
									origin: file,
									data: mergedData,
									parsedFile: mergedParsedFile,
									action: mergedAction
								});
							case 35:
							case "end": return _context4.stop();
						}
					}, _callee4, null, [[3, 9]]);
				}));
				return function(_x5, _x6) {
					return _ref5.apply(this, arguments);
				};
			}());
			_defineProperty(_assertThisInitialized(_this), "saveFileInput", function(node) {
				_this.fileInput = node;
			});
			return _this;
		}
		_createClass(AjaxUploader$1, [
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					this._isMounted = true;
					var pastable = this.props.pastable;
					if (pastable) document.addEventListener("paste", this.onFilePaste);
				}
			},
			{
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					this._isMounted = false;
					this.abort();
					document.removeEventListener("paste", this.onFilePaste);
				}
			},
			{
				key: "componentDidUpdate",
				value: function componentDidUpdate(prevProps) {
					var pastable = this.props.pastable;
					if (pastable && !prevProps.pastable) document.addEventListener("paste", this.onFilePaste);
					else if (!pastable && prevProps.pastable) document.removeEventListener("paste", this.onFilePaste);
				}
			},
			{
				key: "post",
				value: function post(_ref6) {
					var _this2 = this;
					var data = _ref6.data, origin = _ref6.origin, action = _ref6.action, parsedFile = _ref6.parsedFile;
					if (!this._isMounted) return;
					var _this$props3 = this.props, onStart = _this$props3.onStart, customRequest = _this$props3.customRequest, name = _this$props3.name, headers = _this$props3.headers, withCredentials = _this$props3.withCredentials, method = _this$props3.method;
					var uid$1 = origin.uid;
					var request = customRequest || upload;
					var requestOption = {
						action,
						filename: name,
						data,
						file: parsedFile,
						headers,
						withCredentials,
						method: method || "post",
						onProgress: function onProgress(e) {
							var onProgress$1 = _this2.props.onProgress;
							onProgress$1 === null || onProgress$1 === void 0 || onProgress$1(e, parsedFile);
						},
						onSuccess: function onSuccess(ret, xhr) {
							var onSuccess$1 = _this2.props.onSuccess;
							onSuccess$1 === null || onSuccess$1 === void 0 || onSuccess$1(ret, parsedFile, xhr);
							delete _this2.reqs[uid$1];
						},
						onError: function onError(err, ret) {
							var onError$1 = _this2.props.onError;
							onError$1 === null || onError$1 === void 0 || onError$1(err, ret, parsedFile);
							delete _this2.reqs[uid$1];
						}
					};
					onStart(origin);
					this.reqs[uid$1] = request(requestOption);
				}
			},
			{
				key: "reset",
				value: function reset() {
					this.setState({ uid: uid() });
				}
			},
			{
				key: "abort",
				value: function abort(file) {
					var reqs = this.reqs;
					if (file) {
						var uid$1 = file.uid ? file.uid : file;
						if (reqs[uid$1] && reqs[uid$1].abort) reqs[uid$1].abort();
						delete reqs[uid$1];
					} else Object.keys(reqs).forEach(function(uid$2) {
						if (reqs[uid$2] && reqs[uid$2].abort) reqs[uid$2].abort();
						delete reqs[uid$2];
					});
				}
			},
			{
				key: "render",
				value: function render() {
					var _this$props4 = this.props, Tag = _this$props4.component, prefixCls = _this$props4.prefixCls, className = _this$props4.className, _this$props4$classNam = _this$props4.classNames, classNames$41 = _this$props4$classNam === void 0 ? {} : _this$props4$classNam, disabled = _this$props4.disabled, id = _this$props4.id, name = _this$props4.name, style = _this$props4.style, _this$props4$styles = _this$props4.styles, styles = _this$props4$styles === void 0 ? {} : _this$props4$styles, multiple = _this$props4.multiple, accept = _this$props4.accept, capture = _this$props4.capture, children = _this$props4.children, directory = _this$props4.directory, openFileDialogOnClick = _this$props4.openFileDialogOnClick, onMouseEnter = _this$props4.onMouseEnter, onMouseLeave = _this$props4.onMouseLeave, hasControlInside = _this$props4.hasControlInside, otherProps = _objectWithoutProperties(_this$props4, _excluded);
					var cls = (0, import_classnames.default)(_defineProperty(_defineProperty(_defineProperty({}, prefixCls, true), "".concat(prefixCls, "-disabled"), disabled), className, className));
					var dirProps = directory ? {
						directory: "directory",
						webkitdirectory: "webkitdirectory"
					} : {};
					var events = disabled ? {} : {
						onClick: openFileDialogOnClick ? this.onClick : function() {},
						onKeyDown: openFileDialogOnClick ? this.onKeyDown : function() {},
						onMouseEnter,
						onMouseLeave,
						onDrop: this.onFileDrop,
						onDragOver: this.onFileDragOver,
						tabIndex: hasControlInside ? void 0 : "0"
					};
					return /* @__PURE__ */ import_react$1.createElement(Tag, _extends({}, events, {
						className: cls,
						role: hasControlInside ? void 0 : "button",
						style
					}), /* @__PURE__ */ import_react$1.createElement("input", _extends({}, pickAttrs(otherProps, {
						aria: true,
						data: true
					}), {
						id,
						name,
						disabled,
						type: "file",
						ref: this.saveFileInput,
						onClick: function onClick(e) {
							return e.stopPropagation();
						},
						key: this.state.uid,
						style: _objectSpread2({ display: "none" }, styles.input),
						className: classNames$41.input,
						accept
					}, dirProps, {
						multiple,
						onChange: this.onChange
					}, capture != null ? { capture } : {})), children);
				}
			}
		]);
		return AjaxUploader$1;
	}(import_react$1.Component);
	AjaxUploader_default = AjaxUploader;
}));
function empty() {}
var import_react, Upload, Upload_default;
var init_Upload = __esmMin((() => {
	init_extends();
	init_classCallCheck();
	init_createClass();
	init_assertThisInitialized();
	init_inherits();
	init_createSuper();
	init_defineProperty();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_AjaxUploader();
	Upload = /* @__PURE__ */ function(_Component) {
		_inherits(Upload$1, _Component);
		var _super = _createSuper(Upload$1);
		function Upload$1() {
			var _this;
			_classCallCheck(this, Upload$1);
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _super.call.apply(_super, [this].concat(args));
			_defineProperty(_assertThisInitialized(_this), "uploader", void 0);
			_defineProperty(_assertThisInitialized(_this), "saveUploader", function(node) {
				_this.uploader = node;
			});
			return _this;
		}
		_createClass(Upload$1, [{
			key: "abort",
			value: function abort(file) {
				this.uploader.abort(file);
			}
		}, {
			key: "render",
			value: function render() {
				return /* @__PURE__ */ import_react.createElement(AjaxUploader_default, _extends({}, this.props, { ref: this.saveUploader }));
			}
		}]);
		return Upload$1;
	}(import_react.Component);
	_defineProperty(Upload, "defaultProps", {
		component: "span",
		prefixCls: "rc-upload",
		data: {},
		headers: {},
		name: "file",
		multipart: false,
		onStart: empty,
		onError: empty,
		onSuccess: empty,
		multiple: false,
		beforeUpload: null,
		customRequest: null,
		withCredentials: false,
		openFileDialogOnClick: true,
		hasControlInside: false
	});
	Upload_default = Upload;
}));
var es_exports = {};
__export(es_exports, { default: () => es_default });
var es_default;
var init_es = __esmMin((() => {
	init_Upload();
	es_default = Upload_default;
}));
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
init_es$25();
const Box = ({ padding: p, border, borderStyle, className, style,...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className,
	style: {
		padding: p ? `${p}px` : void 0,
		border,
		borderStyle,
		...style
	},
	...props
});
const SimpleGrid = ({ columns, templateColumns, children, leftSpace = 0, style, className, onClick,...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className,
	style: {
		display: "grid",
		gridTemplateColumns: templateColumns || (columns ? `repeat(${columns}, 1fr)` : void 0),
		gap: "1px",
		paddingLeft: leftSpace,
		...style
	},
	onClick,
	...props,
	children
});
const Text = ({ style, className,...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	style: {
		fontSize: 12,
		...style,
		cursor: props.onClick ? "pointer" : void 0
	},
	className,
	...props,
	onClick: props.onClick ? props.onClick : void 0
});
const VStack = ({ gap = 5, align = "stretch", children,...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	style: {
		display: "flex",
		flexDirection: "column",
		alignItems: align,
		gap: `${gap}px`
	},
	...props,
	children
});
const GridItem = ({ colSpan, rowSpan, padding, style,...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	style: {
		gridColumn: colSpan ? `span ${colSpan}` : void 0,
		gridRow: rowSpan ? `span ${rowSpan}` : void 0,
		padding: padding ? `${padding}px` : void 0,
		textAlign: "center",
		...style
	},
	...props
});
const HStack = ({ gap, children, style,...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	style: {
		display: "inline-flex",
		flexDirection: "row",
		alignItems: "center",
		gap: gap ? `${gap}px` : "5px",
		...style
	},
	...props,
	children
});
const IconButton = ({ size = "md", fontSize = "12px", style, onClick,...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	type: "button",
	onClick,
	style: {
		width: size === "sm" ? 12 : 20,
		height: 24,
		border: "none",
		background: "transparent",
		cursor: "pointer",
		fontSize,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		...style
	},
	...props,
	children: props.children || (props["aria-label"] === "Toggle" ? props["aria-expanded"] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaretDownOutlined_default, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaretRightOutlined_default, {}) : "")
});
const Button = ({ style,...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	type: "button",
	style: {
		padding: "5px 10px",
		border: "none",
		cursor: "pointer",
		...style
	},
	...props
});
const TraceIcon = ({ size = 200, color = "currentColor", className = "icon" }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className,
		width: size,
		height: size,
		viewBox: "0 0 1024 1024",
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M919.296 515.072a93.3376 93.3376 0 0 0-31.6928 5.8368l-142.6944-214.1184a108.5952 108.5952 0 0 0 17.3056-58.7264 109.9776 109.9776 0 1 0-192.256 72.192l-143.8208 263.7312a151.5008 151.5008 0 0 0-40.96-6.0928 155.8528 155.8528 0 0 0-84.6848 25.1904l-115.2-138.24a93.2352 93.2352 0 0 0 11.4176-44.032 94.2592 94.2592 0 1 0-57.6 87.04l116.0704 139.264a157.3376 157.3376 0 1 0 226.9184-34.56l141.1072-258.7136a104.0384 104.0384 0 0 0 73.728-5.12l141.7728 212.6336a94.0032 94.0032 0 1 0 80.4864-46.08zM385.28 829.44a94.2592 94.2592 0 1 1 94.208-94.2592A94.3616 94.3616 0 0 1 385.28 829.44z m0 0",
			fill: color
		})
	});
};
export { resolveOnChange as $, conductExpandParent as A, init_util as B, TreeNode_default$1 as C, es_default$5 as D, es_exports$3 as E, init_es$3 as F, _createForOfIteratorHelper as G, init_createForOfIteratorHelper as H, es_exports$4 as I, init_es$4 as J, Circle_default as K, es_exports$5 as L, init_es$5 as M, Pagination_default as N, es_default$7 as O, es_exports$6 as P, init_es$6 as Q, es_default$9 as R, es_exports$7 as S, init_es$7 as T, es_default$11 as U, es_exports$8 as V, init_es$8 as W, init_useCount as X, useCount as Y, BaseInput_default as Z, init_commonUtils as _, triggerFocus as a1, es_default$12 as a2, es_exports$9 as a3, init_es$9 as a4, conductCheck as a5, init_conductUtil as a6, convertDataToEntities as a7, convertTreeToData as a8, fillFieldNames$1 as a9, NotificationProvider_default as aA, Notice_default as aB, init_treeUtil as aa, init_es$10 as ab, init_useId$1 as ac, useId as ad, BaseSelect_default as ae, useBaseProps as af, debounce as ag, init_esm as ah, es_default$15 as ai, es_exports$10 as aj, init_es$11 as ak, es_default$18 as al, es_exports$11 as am, init_es$12 as an, es_default$19 as ao, es_exports$12 as ap, init_es$13 as aq, es_default$3 as ar, init_es$14 as as, Option_default$1 as at, OptGroup_default$1 as au, init_styleChecker as av, isStyleSupport as aw, es_exports$13 as ax, init_es$16 as ay, useNotification as az, Box as b, Button as c, GridItem as d, HStack as e, IconButton as f, SimpleGrid as g, Text as h, TraceIcon as i, VStack as j, es_default as k, es_exports as l, init_es as m, require_copy_to_clipboard as n, es_default$1 as o, es_exports$1 as p, init_es$1 as q, SHOW_ALL as r, SHOW_CHILD as s, SHOW_PARENT as t, TreeNode_default as u, es_default$2 as v, es_exports$2 as w, init_es$2 as x, arrAdd as y, arrDel as z };
