import { c as __esmMin, d as __export, g as __toESM } from "./chunk-st2fFX3F.js";
import { cT as init_useMergedState, cU as useMergedState, cX as init_useEvent, cY as useEvent, cq as KeyCode_default, cr as init_KeyCode, dD as _slicedToArray, dE as init_slicedToArray, dH as _toConsumableArray, dI as init_toConsumableArray, dm as init_useLayoutEffect, dn as useLayoutEffect_default, dt as init_isEqual, du as isEqual_default, dv as _objectWithoutProperties, dw as init_objectWithoutProperties, ei as require_react_dom, ej as _objectSpread2, ek as init_objectSpread2, el as _defineProperty, em as init_defineProperty, en as init_warning, ep as warning_default, es as _typeof, et as init_typeof, eu as _extends, ev as init_extends, ew as require_classnames } from "./es-BVhN1ovY.js";
import { b as require_react } from "./react-Cs7_W7Sm.js";
function getOffset(value, min, max) {
	return (value - min) / (max - min);
}
function getDirectionStyle(direction, value, min, max) {
	var offset = getOffset(value, min, max);
	var positionStyle = {};
	switch (direction) {
		case "rtl":
			positionStyle.right = "".concat(offset * 100, "%");
			positionStyle.transform = "translateX(50%)";
			break;
		case "btt":
			positionStyle.bottom = "".concat(offset * 100, "%");
			positionStyle.transform = "translateY(50%)";
			break;
		case "ttb":
			positionStyle.top = "".concat(offset * 100, "%");
			positionStyle.transform = "translateY(-50%)";
			break;
		default:
			positionStyle.left = "".concat(offset * 100, "%");
			positionStyle.transform = "translateX(-50%)";
			break;
	}
	return positionStyle;
}
function getIndex(value, index) {
	return Array.isArray(value) ? value[index] : value;
}
var init_util = __esmMin((() => {}));
var import_react$12, SliderContext, context_default, UnstableContext;
var init_context = __esmMin((() => {
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	SliderContext = /* @__PURE__ */ import_react$12.createContext({
		min: 0,
		max: 0,
		direction: "ltr",
		step: 1,
		includedStart: 0,
		includedEnd: 0,
		tabIndex: 0,
		keyboard: true,
		styles: {},
		classNames: {}
	});
	context_default = SliderContext;
	UnstableContext = /* @__PURE__ */ import_react$12.createContext({});
}));
var import_classnames$5, import_react$11, _excluded$1, Handle, Handle_default;
var init_Handle = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_defineProperty();
	init_objectWithoutProperties();
	import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
	init_KeyCode();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_util();
	_excluded$1 = [
		"prefixCls",
		"value",
		"valueIndex",
		"onStartMove",
		"onDelete",
		"style",
		"render",
		"dragging",
		"draggingDelete",
		"onOffsetChange",
		"onChangeComplete",
		"onFocus",
		"onMouseEnter"
	];
	Handle = /* @__PURE__ */ import_react$11.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, value = props.value, valueIndex = props.valueIndex, onStartMove = props.onStartMove, onDelete = props.onDelete, style = props.style, render = props.render, dragging = props.dragging, draggingDelete = props.draggingDelete, onOffsetChange = props.onOffsetChange, onChangeComplete = props.onChangeComplete, onFocus = props.onFocus, onMouseEnter = props.onMouseEnter, restProps = _objectWithoutProperties(props, _excluded$1);
		var _React$useContext = import_react$11.useContext(context_default), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, disabled = _React$useContext.disabled, keyboard = _React$useContext.keyboard, range = _React$useContext.range, tabIndex = _React$useContext.tabIndex, ariaLabelForHandle = _React$useContext.ariaLabelForHandle, ariaLabelledByForHandle = _React$useContext.ariaLabelledByForHandle, ariaRequired = _React$useContext.ariaRequired, ariaValueTextFormatterForHandle = _React$useContext.ariaValueTextFormatterForHandle, styles = _React$useContext.styles, classNames$2 = _React$useContext.classNames;
		var handlePrefixCls = "".concat(prefixCls, "-handle");
		var onInternalStartMove = function onInternalStartMove$1(e) {
			if (!disabled) onStartMove(e, valueIndex);
		};
		var onInternalFocus = function onInternalFocus$1(e) {
			onFocus === null || onFocus === void 0 || onFocus(e, valueIndex);
		};
		var onInternalMouseEnter = function onInternalMouseEnter$1(e) {
			onMouseEnter(e, valueIndex);
		};
		var onKeyDown = function onKeyDown$1(e) {
			if (!disabled && keyboard) {
				var offset = null;
				switch (e.which || e.keyCode) {
					case KeyCode_default.LEFT:
						offset = direction === "ltr" || direction === "btt" ? -1 : 1;
						break;
					case KeyCode_default.RIGHT:
						offset = direction === "ltr" || direction === "btt" ? 1 : -1;
						break;
					case KeyCode_default.UP:
						offset = direction !== "ttb" ? 1 : -1;
						break;
					case KeyCode_default.DOWN:
						offset = direction !== "ttb" ? -1 : 1;
						break;
					case KeyCode_default.HOME:
						offset = "min";
						break;
					case KeyCode_default.END:
						offset = "max";
						break;
					case KeyCode_default.PAGE_UP:
						offset = 2;
						break;
					case KeyCode_default.PAGE_DOWN:
						offset = -2;
						break;
					case KeyCode_default.BACKSPACE:
					case KeyCode_default.DELETE:
						onDelete(valueIndex);
						break;
				}
				if (offset !== null) {
					e.preventDefault();
					onOffsetChange(offset, valueIndex);
				}
			}
		};
		var handleKeyUp = function handleKeyUp$1(e) {
			switch (e.which || e.keyCode) {
				case KeyCode_default.LEFT:
				case KeyCode_default.RIGHT:
				case KeyCode_default.UP:
				case KeyCode_default.DOWN:
				case KeyCode_default.HOME:
				case KeyCode_default.END:
				case KeyCode_default.PAGE_UP:
				case KeyCode_default.PAGE_DOWN:
					onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete();
					break;
			}
		};
		var positionStyle = getDirectionStyle(direction, value, min, max);
		var divProps = {};
		if (valueIndex !== null) {
			var _getIndex;
			divProps = {
				tabIndex: disabled ? null : getIndex(tabIndex, valueIndex),
				role: "slider",
				"aria-valuemin": min,
				"aria-valuemax": max,
				"aria-valuenow": value,
				"aria-disabled": disabled,
				"aria-label": getIndex(ariaLabelForHandle, valueIndex),
				"aria-labelledby": getIndex(ariaLabelledByForHandle, valueIndex),
				"aria-required": getIndex(ariaRequired, valueIndex),
				"aria-valuetext": (_getIndex = getIndex(ariaValueTextFormatterForHandle, valueIndex)) === null || _getIndex === void 0 ? void 0 : _getIndex(value),
				"aria-orientation": direction === "ltr" || direction === "rtl" ? "horizontal" : "vertical",
				onMouseDown: onInternalStartMove,
				onTouchStart: onInternalStartMove,
				onFocus: onInternalFocus,
				onMouseEnter: onInternalMouseEnter,
				onKeyDown,
				onKeyUp: handleKeyUp
			};
		}
		var handleNode = /* @__PURE__ */ import_react$11.createElement("div", _extends({
			ref,
			className: (0, import_classnames$5.default)(handlePrefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(handlePrefixCls, "-").concat(valueIndex + 1), valueIndex !== null && range), "".concat(handlePrefixCls, "-dragging"), dragging), "".concat(handlePrefixCls, "-dragging-delete"), draggingDelete), classNames$2.handle),
			style: _objectSpread2(_objectSpread2(_objectSpread2({}, positionStyle), style), styles.handle)
		}, divProps, restProps));
		if (render) handleNode = render(handleNode, {
			index: valueIndex,
			prefixCls,
			value,
			dragging,
			draggingDelete
		});
		return handleNode;
	});
	Handle_default = Handle;
}));
var import_react$10, import_react_dom, _excluded, Handles, Handles_default;
var init_Handles = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
	init_util();
	init_Handle();
	_excluded = [
		"prefixCls",
		"style",
		"onStartMove",
		"onOffsetChange",
		"values",
		"handleRender",
		"activeHandleRender",
		"draggingIndex",
		"draggingDelete",
		"onFocus"
	];
	Handles = /* @__PURE__ */ import_react$10.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, style = props.style, onStartMove = props.onStartMove, onOffsetChange = props.onOffsetChange, values = props.values, handleRender = props.handleRender, activeHandleRender = props.activeHandleRender, draggingIndex = props.draggingIndex, draggingDelete = props.draggingDelete, onFocus = props.onFocus, restProps = _objectWithoutProperties(props, _excluded);
		var handlesRef = import_react$10.useRef({});
		var _React$useState = import_react$10.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), activeVisible = _React$useState2[0], setActiveVisible = _React$useState2[1];
		var _React$useState3 = import_react$10.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), activeIndex = _React$useState4[0], setActiveIndex = _React$useState4[1];
		var onActive = function onActive$1(index) {
			setActiveIndex(index);
			setActiveVisible(true);
		};
		var onHandleFocus = function onHandleFocus$1(e, index) {
			onActive(index);
			onFocus === null || onFocus === void 0 || onFocus(e);
		};
		var onHandleMouseEnter = function onHandleMouseEnter$1(e, index) {
			onActive(index);
		};
		import_react$10.useImperativeHandle(ref, function() {
			return {
				focus: function focus(index) {
					var _handlesRef$current$i;
					(_handlesRef$current$i = handlesRef.current[index]) === null || _handlesRef$current$i === void 0 || _handlesRef$current$i.focus();
				},
				hideHelp: function hideHelp() {
					(0, import_react_dom.flushSync)(function() {
						setActiveVisible(false);
					});
				}
			};
		});
		var handleProps = _objectSpread2({
			prefixCls,
			onStartMove,
			onOffsetChange,
			render: handleRender,
			onFocus: onHandleFocus,
			onMouseEnter: onHandleMouseEnter
		}, restProps);
		return /* @__PURE__ */ import_react$10.createElement(import_react$10.Fragment, null, values.map(function(value, index) {
			var dragging = draggingIndex === index;
			return /* @__PURE__ */ import_react$10.createElement(Handle_default, _extends({
				ref: function ref$1(node) {
					if (!node) delete handlesRef.current[index];
					else handlesRef.current[index] = node;
				},
				dragging,
				draggingDelete: dragging && draggingDelete,
				style: getIndex(style, index),
				key: index,
				value,
				valueIndex: index
			}, handleProps));
		}), activeHandleRender && activeVisible && /* @__PURE__ */ import_react$10.createElement(Handle_default, _extends({ key: "a11y" }, handleProps, {
			value: values[activeIndex],
			valueIndex: null,
			dragging: draggingIndex !== -1,
			draggingDelete,
			render: activeHandleRender,
			style: { pointerEvents: "none" },
			tabIndex: null,
			"aria-hidden": true
		})));
	});
	Handles_default = Handles;
}));
var import_classnames$4, import_react$9, Mark, Mark_default;
var init_Mark = __esmMin((() => {
	init_objectSpread2();
	init_defineProperty();
	import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_util();
	Mark = function Mark$1(props) {
		var prefixCls = props.prefixCls, style = props.style, children = props.children, value = props.value, _onClick = props.onClick;
		var _React$useContext = import_react$9.useContext(context_default), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, includedStart = _React$useContext.includedStart, includedEnd = _React$useContext.includedEnd, included = _React$useContext.included;
		var textCls = "".concat(prefixCls, "-text");
		var positionStyle = getDirectionStyle(direction, value, min, max);
		return /* @__PURE__ */ import_react$9.createElement("span", {
			className: (0, import_classnames$4.default)(textCls, _defineProperty({}, "".concat(textCls, "-active"), included && includedStart <= value && value <= includedEnd)),
			style: _objectSpread2(_objectSpread2({}, positionStyle), style),
			onMouseDown: function onMouseDown(e) {
				e.stopPropagation();
			},
			onClick: function onClick() {
				_onClick(value);
			}
		}, children);
	};
	Mark_default = Mark;
}));
var import_react$8, Marks, Marks_default;
var init_Marks = __esmMin((() => {
	import_react$8 = /* @__PURE__ */ __toESM(require_react());
	init_Mark();
	Marks = function Marks$1(props) {
		var prefixCls = props.prefixCls, marks = props.marks, onClick = props.onClick;
		var markPrefixCls = "".concat(prefixCls, "-mark");
		if (!marks.length) return null;
		return /* @__PURE__ */ import_react$8.createElement("div", { className: markPrefixCls }, marks.map(function(_ref) {
			var value = _ref.value, style = _ref.style, label = _ref.label;
			return /* @__PURE__ */ import_react$8.createElement(Mark_default, {
				key: value,
				prefixCls: markPrefixCls,
				style,
				value,
				onClick
			}, label);
		}));
	};
	Marks_default = Marks;
}));
var import_classnames$3, import_react$7, Dot, Dot_default;
var init_Dot = __esmMin((() => {
	init_defineProperty();
	init_objectSpread2();
	import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_util();
	Dot = function Dot$1(props) {
		var prefixCls = props.prefixCls, value = props.value, style = props.style, activeStyle = props.activeStyle;
		var _React$useContext = import_react$7.useContext(context_default), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, included = _React$useContext.included, includedStart = _React$useContext.includedStart, includedEnd = _React$useContext.includedEnd;
		var dotClassName = "".concat(prefixCls, "-dot");
		var active = included && includedStart <= value && value <= includedEnd;
		var mergedStyle = _objectSpread2(_objectSpread2({}, getDirectionStyle(direction, value, min, max)), typeof style === "function" ? style(value) : style);
		if (active) mergedStyle = _objectSpread2(_objectSpread2({}, mergedStyle), typeof activeStyle === "function" ? activeStyle(value) : activeStyle);
		return /* @__PURE__ */ import_react$7.createElement("span", {
			className: (0, import_classnames$3.default)(dotClassName, _defineProperty({}, "".concat(dotClassName, "-active"), active)),
			style: mergedStyle
		});
	};
	Dot_default = Dot;
}));
var import_react$6, Steps, Steps_default;
var init_Steps = __esmMin((() => {
	import_react$6 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_Dot();
	Steps = function Steps$1(props) {
		var prefixCls = props.prefixCls, marks = props.marks, dots = props.dots, style = props.style, activeStyle = props.activeStyle;
		var _React$useContext = import_react$6.useContext(context_default), min = _React$useContext.min, max = _React$useContext.max, step = _React$useContext.step;
		var stepDots = import_react$6.useMemo(function() {
			var dotSet = /* @__PURE__ */ new Set();
			marks.forEach(function(mark) {
				dotSet.add(mark.value);
			});
			if (dots && step !== null) {
				var current = min;
				while (current <= max) {
					dotSet.add(current);
					current += step;
				}
			}
			return Array.from(dotSet);
		}, [
			min,
			max,
			step,
			dots,
			marks
		]);
		return /* @__PURE__ */ import_react$6.createElement("div", { className: "".concat(prefixCls, "-step") }, stepDots.map(function(dotValue) {
			return /* @__PURE__ */ import_react$6.createElement(Dot_default, {
				prefixCls,
				key: dotValue,
				value: dotValue,
				style,
				activeStyle
			});
		}));
	};
	Steps_default = Steps;
}));
var import_classnames$2, import_react$5, Track, Track_default;
var init_Track = __esmMin((() => {
	init_objectSpread2();
	init_defineProperty();
	import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$5 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_util();
	Track = function Track$1(props) {
		var prefixCls = props.prefixCls, style = props.style, start = props.start, end = props.end, index = props.index, onStartMove = props.onStartMove, replaceCls = props.replaceCls;
		var _React$useContext = import_react$5.useContext(context_default), direction = _React$useContext.direction, min = _React$useContext.min, max = _React$useContext.max, disabled = _React$useContext.disabled, range = _React$useContext.range, classNames$2 = _React$useContext.classNames;
		var trackPrefixCls = "".concat(prefixCls, "-track");
		var offsetStart = getOffset(start, min, max);
		var offsetEnd = getOffset(end, min, max);
		var onInternalStartMove = function onInternalStartMove$1(e) {
			if (!disabled && onStartMove) onStartMove(e, -1);
		};
		var positionStyle = {};
		switch (direction) {
			case "rtl":
				positionStyle.right = "".concat(offsetStart * 100, "%");
				positionStyle.width = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
				break;
			case "btt":
				positionStyle.bottom = "".concat(offsetStart * 100, "%");
				positionStyle.height = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
				break;
			case "ttb":
				positionStyle.top = "".concat(offsetStart * 100, "%");
				positionStyle.height = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
				break;
			default:
				positionStyle.left = "".concat(offsetStart * 100, "%");
				positionStyle.width = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
		}
		var className = replaceCls || (0, import_classnames$2.default)(trackPrefixCls, _defineProperty(_defineProperty({}, "".concat(trackPrefixCls, "-").concat(index + 1), index !== null && range), "".concat(prefixCls, "-track-draggable"), onStartMove), classNames$2.track);
		return /* @__PURE__ */ import_react$5.createElement("div", {
			className,
			style: _objectSpread2(_objectSpread2({}, positionStyle), style),
			onMouseDown: onInternalStartMove,
			onTouchStart: onInternalStartMove
		});
	};
	Track_default = Track;
}));
var import_classnames$1, import_react$4, Tracks, Tracks_default;
var init_Tracks = __esmMin((() => {
	init_objectSpread2();
	import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_context();
	init_util();
	init_Track();
	Tracks = function Tracks$1(props) {
		var prefixCls = props.prefixCls, style = props.style, values = props.values, startPoint = props.startPoint, onStartMove = props.onStartMove;
		var _React$useContext = import_react$4.useContext(context_default), included = _React$useContext.included, range = _React$useContext.range, min = _React$useContext.min, styles = _React$useContext.styles, classNames$2 = _React$useContext.classNames;
		var trackList = import_react$4.useMemo(function() {
			if (!range) {
				if (values.length === 0) return [];
				var startValue = startPoint !== null && startPoint !== void 0 ? startPoint : min;
				var endValue = values[0];
				return [{
					start: Math.min(startValue, endValue),
					end: Math.max(startValue, endValue)
				}];
			}
			var list = [];
			for (var i = 0; i < values.length - 1; i += 1) list.push({
				start: values[i],
				end: values[i + 1]
			});
			return list;
		}, [
			values,
			range,
			startPoint,
			min
		]);
		if (!included) return null;
		var tracksNode = trackList !== null && trackList !== void 0 && trackList.length && (classNames$2.tracks || styles.tracks) ? /* @__PURE__ */ import_react$4.createElement(Track_default, {
			index: null,
			prefixCls,
			start: trackList[0].start,
			end: trackList[trackList.length - 1].end,
			replaceCls: (0, import_classnames$1.default)(classNames$2.tracks, "".concat(prefixCls, "-tracks")),
			style: styles.tracks
		}) : null;
		return /* @__PURE__ */ import_react$4.createElement(import_react$4.Fragment, null, tracksNode, trackList.map(function(_ref, index) {
			var start = _ref.start, end = _ref.end;
			return /* @__PURE__ */ import_react$4.createElement(Track_default, {
				index,
				prefixCls,
				style: _objectSpread2(_objectSpread2({}, getIndex(style, index)), styles.track),
				start,
				end,
				key: index,
				onStartMove
			});
		}));
	};
	Tracks_default = Tracks;
}));
function getPosition(e) {
	var obj = "targetTouches" in e ? e.targetTouches[0] : e;
	return {
		pageX: obj.pageX,
		pageY: obj.pageY
	};
}
function useDrag(containerRef, direction, rawValues, min, max, formatValue, triggerChange, finishChange, offsetValues, editable, minCount) {
	var _React$useState = import_react$3.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), draggingValue = _React$useState2[0], setDraggingValue = _React$useState2[1];
	var _React$useState3 = import_react$3.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), draggingIndex = _React$useState4[0], setDraggingIndex = _React$useState4[1];
	var _React$useState5 = import_react$3.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), draggingDelete = _React$useState6[0], setDraggingDelete = _React$useState6[1];
	var _React$useState7 = import_react$3.useState(rawValues), _React$useState8 = _slicedToArray(_React$useState7, 2), cacheValues = _React$useState8[0], setCacheValues = _React$useState8[1];
	var _React$useState9 = import_react$3.useState(rawValues), _React$useState10 = _slicedToArray(_React$useState9, 2), originValues = _React$useState10[0], setOriginValues = _React$useState10[1];
	var mouseMoveEventRef = import_react$3.useRef(null);
	var mouseUpEventRef = import_react$3.useRef(null);
	var touchEventTargetRef = import_react$3.useRef(null);
	var _React$useContext = import_react$3.useContext(UnstableContext), onDragStart = _React$useContext.onDragStart, onDragChange = _React$useContext.onDragChange;
	useLayoutEffect_default(function() {
		if (draggingIndex === -1) setCacheValues(rawValues);
	}, [rawValues, draggingIndex]);
	import_react$3.useEffect(function() {
		return function() {
			document.removeEventListener("mousemove", mouseMoveEventRef.current);
			document.removeEventListener("mouseup", mouseUpEventRef.current);
			if (touchEventTargetRef.current) {
				touchEventTargetRef.current.removeEventListener("touchmove", mouseMoveEventRef.current);
				touchEventTargetRef.current.removeEventListener("touchend", mouseUpEventRef.current);
			}
		};
	}, []);
	var flushValues = function flushValues$1(nextValues, nextValue, deleteMark) {
		if (nextValue !== void 0) setDraggingValue(nextValue);
		setCacheValues(nextValues);
		var changeValues = nextValues;
		if (deleteMark) changeValues = nextValues.filter(function(_, i) {
			return i !== draggingIndex;
		});
		triggerChange(changeValues);
		if (onDragChange) onDragChange({
			rawValues: nextValues,
			deleteIndex: deleteMark ? draggingIndex : -1,
			draggingIndex,
			draggingValue: nextValue
		});
	};
	var updateCacheValue = useEvent(function(valueIndex, offsetPercent, deleteMark) {
		if (valueIndex === -1) {
			var startValue = originValues[0];
			var endValue = originValues[originValues.length - 1];
			var maxStartOffset = min - startValue;
			var maxEndOffset = max - endValue;
			var offset = offsetPercent * (max - min);
			offset = Math.max(offset, maxStartOffset);
			offset = Math.min(offset, maxEndOffset);
			var formatStartValue = formatValue(startValue + offset);
			offset = formatStartValue - startValue;
			var cloneCacheValues = originValues.map(function(val) {
				return val + offset;
			});
			flushValues(cloneCacheValues);
		} else {
			var offsetDist = (max - min) * offsetPercent;
			var cloneValues = _toConsumableArray(cacheValues);
			cloneValues[valueIndex] = originValues[valueIndex];
			var next = offsetValues(cloneValues, offsetDist, valueIndex, "dist");
			flushValues(next.values, next.value, deleteMark);
		}
	});
	var onStartMove = function onStartMove$1(e, valueIndex, startValues) {
		e.stopPropagation();
		var initialValues = startValues || rawValues;
		var originValue = initialValues[valueIndex];
		setDraggingIndex(valueIndex);
		setDraggingValue(originValue);
		setOriginValues(initialValues);
		setCacheValues(initialValues);
		setDraggingDelete(false);
		var _getPosition = getPosition(e), startX = _getPosition.pageX, startY = _getPosition.pageY;
		var deleteMark = false;
		if (onDragStart) onDragStart({
			rawValues: initialValues,
			draggingIndex: valueIndex,
			draggingValue: originValue
		});
		var onMouseMove = function onMouseMove$1(event) {
			event.preventDefault();
			var _getPosition2 = getPosition(event), moveX = _getPosition2.pageX, moveY = _getPosition2.pageY;
			var offsetX = moveX - startX;
			var offsetY = moveY - startY;
			var _containerRef$current = containerRef.current.getBoundingClientRect(), width = _containerRef$current.width, height = _containerRef$current.height;
			var offSetPercent;
			var removeDist;
			switch (direction) {
				case "btt":
					offSetPercent = -offsetY / height;
					removeDist = offsetX;
					break;
				case "ttb":
					offSetPercent = offsetY / height;
					removeDist = offsetX;
					break;
				case "rtl":
					offSetPercent = -offsetX / width;
					removeDist = offsetY;
					break;
				default:
					offSetPercent = offsetX / width;
					removeDist = offsetY;
			}
			deleteMark = editable ? Math.abs(removeDist) > REMOVE_DIST && minCount < cacheValues.length : false;
			setDraggingDelete(deleteMark);
			updateCacheValue(valueIndex, offSetPercent, deleteMark);
		};
		var onMouseUp = function onMouseUp$1(event) {
			event.preventDefault();
			document.removeEventListener("mouseup", onMouseUp$1);
			document.removeEventListener("mousemove", onMouseMove);
			if (touchEventTargetRef.current) {
				touchEventTargetRef.current.removeEventListener("touchmove", mouseMoveEventRef.current);
				touchEventTargetRef.current.removeEventListener("touchend", mouseUpEventRef.current);
			}
			mouseMoveEventRef.current = null;
			mouseUpEventRef.current = null;
			touchEventTargetRef.current = null;
			finishChange(deleteMark);
			setDraggingIndex(-1);
			setDraggingDelete(false);
		};
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mousemove", onMouseMove);
		e.currentTarget.addEventListener("touchend", onMouseUp);
		e.currentTarget.addEventListener("touchmove", onMouseMove);
		mouseMoveEventRef.current = onMouseMove;
		mouseUpEventRef.current = onMouseUp;
		touchEventTargetRef.current = e.currentTarget;
	};
	var returnValues = import_react$3.useMemo(function() {
		var sourceValues = _toConsumableArray(rawValues).sort(function(a, b) {
			return a - b;
		});
		var targetValues = _toConsumableArray(cacheValues).sort(function(a, b) {
			return a - b;
		});
		var counts = {};
		targetValues.forEach(function(val) {
			counts[val] = (counts[val] || 0) + 1;
		});
		sourceValues.forEach(function(val) {
			counts[val] = (counts[val] || 0) - 1;
		});
		var maxDiffCount = editable ? 1 : 0;
		var diffCount = Object.values(counts).reduce(function(prev, next) {
			return prev + Math.abs(next);
		}, 0);
		return diffCount <= maxDiffCount ? cacheValues : rawValues;
	}, [
		rawValues,
		cacheValues,
		editable
	]);
	return [
		draggingIndex,
		draggingValue,
		draggingDelete,
		returnValues,
		onStartMove
	];
}
var import_react$3, REMOVE_DIST, useDrag_default;
var init_useDrag = __esmMin((() => {
	init_toConsumableArray();
	init_slicedToArray();
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
	init_useEvent();
	init_useLayoutEffect();
	init_context();
	REMOVE_DIST = 130;
	useDrag_default = useDrag;
}));
function useOffset(min, max, step, markList, allowCross, pushable) {
	var formatRangeValue = import_react$2.useCallback(function(val) {
		return Math.max(min, Math.min(max, val));
	}, [min, max]);
	var formatStepValue = import_react$2.useCallback(function(val) {
		if (step !== null) {
			var stepValue = min + Math.round((formatRangeValue(val) - min) / step) * step;
			var getDecimal = function getDecimal$1(num) {
				return (String(num).split(".")[1] || "").length;
			};
			var maxDecimal = Math.max(getDecimal(step), getDecimal(max), getDecimal(min));
			var fixedValue = Number(stepValue.toFixed(maxDecimal));
			return min <= fixedValue && fixedValue <= max ? fixedValue : null;
		}
		return null;
	}, [
		step,
		min,
		max,
		formatRangeValue
	]);
	var formatValue = import_react$2.useCallback(function(val) {
		var formatNextValue = formatRangeValue(val);
		var alignValues = markList.map(function(mark) {
			return mark.value;
		});
		if (step !== null) alignValues.push(formatStepValue(val));
		alignValues.push(min, max);
		var closeValue = alignValues[0];
		var closeDist = max - min;
		alignValues.forEach(function(alignValue) {
			var dist = Math.abs(formatNextValue - alignValue);
			if (dist <= closeDist) {
				closeValue = alignValue;
				closeDist = dist;
			}
		});
		return closeValue;
	}, [
		min,
		max,
		markList,
		step,
		formatRangeValue,
		formatStepValue
	]);
	var offsetValue = function offsetValue$1(values, offset, valueIndex) {
		var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
		if (typeof offset === "number") {
			var nextValue;
			var originValue = values[valueIndex];
			var targetDistValue = originValue + offset;
			var potentialValues = [];
			markList.forEach(function(mark) {
				potentialValues.push(mark.value);
			});
			potentialValues.push(min, max);
			potentialValues.push(formatStepValue(originValue));
			var sign = offset > 0 ? 1 : -1;
			if (mode === "unit") potentialValues.push(formatStepValue(originValue + sign * step));
			else potentialValues.push(formatStepValue(targetDistValue));
			potentialValues = potentialValues.filter(function(val) {
				return val !== null;
			}).filter(function(val) {
				return offset < 0 ? val <= originValue : val >= originValue;
			});
			if (mode === "unit") potentialValues = potentialValues.filter(function(val) {
				return val !== originValue;
			});
			var compareValue = mode === "unit" ? originValue : targetDistValue;
			nextValue = potentialValues[0];
			var valueDist = Math.abs(nextValue - compareValue);
			potentialValues.forEach(function(potentialValue) {
				var dist = Math.abs(potentialValue - compareValue);
				if (dist < valueDist) {
					nextValue = potentialValue;
					valueDist = dist;
				}
			});
			if (nextValue === void 0) return offset < 0 ? min : max;
			if (mode === "dist") return nextValue;
			if (Math.abs(offset) > 1) {
				var cloneValues = _toConsumableArray(values);
				cloneValues[valueIndex] = nextValue;
				return offsetValue$1(cloneValues, offset - sign, valueIndex, mode);
			}
			return nextValue;
		} else if (offset === "min") return min;
		else if (offset === "max") return max;
	};
	var offsetChangedValue = function offsetChangedValue$1(values, offset, valueIndex) {
		var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
		var originValue = values[valueIndex];
		var nextValue = offsetValue(values, offset, valueIndex, mode);
		return {
			value: nextValue,
			changed: nextValue !== originValue
		};
	};
	var needPush = function needPush$1(dist) {
		return pushable === null && dist === 0 || typeof pushable === "number" && dist < pushable;
	};
	var offsetValues = function offsetValues$1(values, offset, valueIndex) {
		var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
		var nextValues = values.map(formatValue);
		var originValue = nextValues[valueIndex];
		var nextValue = offsetValue(nextValues, offset, valueIndex, mode);
		nextValues[valueIndex] = nextValue;
		if (allowCross === false) {
			var pushNum = pushable || 0;
			if (valueIndex > 0 && nextValues[valueIndex - 1] !== originValue) nextValues[valueIndex] = Math.max(nextValues[valueIndex], nextValues[valueIndex - 1] + pushNum);
			if (valueIndex < nextValues.length - 1 && nextValues[valueIndex + 1] !== originValue) nextValues[valueIndex] = Math.min(nextValues[valueIndex], nextValues[valueIndex + 1] - pushNum);
		} else if (typeof pushable === "number" || pushable === null) {
			for (var i = valueIndex + 1; i < nextValues.length; i += 1) {
				var changed = true;
				while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
					var _offsetChangedValue = offsetChangedValue(nextValues, 1, i);
					nextValues[i] = _offsetChangedValue.value;
					changed = _offsetChangedValue.changed;
				}
			}
			for (var _i = valueIndex; _i > 0; _i -= 1) {
				var _changed = true;
				while (needPush(nextValues[_i] - nextValues[_i - 1]) && _changed) {
					var _offsetChangedValue2 = offsetChangedValue(nextValues, -1, _i - 1);
					nextValues[_i - 1] = _offsetChangedValue2.value;
					_changed = _offsetChangedValue2.changed;
				}
			}
			for (var _i2 = nextValues.length - 1; _i2 > 0; _i2 -= 1) {
				var _changed2 = true;
				while (needPush(nextValues[_i2] - nextValues[_i2 - 1]) && _changed2) {
					var _offsetChangedValue3 = offsetChangedValue(nextValues, -1, _i2 - 1);
					nextValues[_i2 - 1] = _offsetChangedValue3.value;
					_changed2 = _offsetChangedValue3.changed;
				}
			}
			for (var _i3 = 0; _i3 < nextValues.length - 1; _i3 += 1) {
				var _changed3 = true;
				while (needPush(nextValues[_i3 + 1] - nextValues[_i3]) && _changed3) {
					var _offsetChangedValue4 = offsetChangedValue(nextValues, 1, _i3 + 1);
					nextValues[_i3 + 1] = _offsetChangedValue4.value;
					_changed3 = _offsetChangedValue4.changed;
				}
			}
		}
		return {
			value: nextValues[valueIndex],
			values: nextValues
		};
	};
	return [formatValue, offsetValues];
}
var import_react$2;
var init_useOffset = __esmMin((() => {
	init_toConsumableArray();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
}));
function useRange(range) {
	return (0, import_react$1.useMemo)(function() {
		if (range === true || !range) return [
			!!range,
			false,
			false,
			0
		];
		var editable = range.editable, draggableTrack = range.draggableTrack, minCount = range.minCount, maxCount = range.maxCount;
		return [
			true,
			editable,
			!editable && draggableTrack,
			minCount || 0,
			maxCount
		];
	}, [range]);
}
var import_react$1;
var init_useRange = __esmMin((() => {
	init_warning();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
}));
var import_classnames, import_react, Slider, Slider_default;
var init_Slider = __esmMin((() => {
	init_objectSpread2();
	init_defineProperty();
	init_toConsumableArray();
	init_typeof();
	init_slicedToArray();
	import_classnames = /* @__PURE__ */ __toESM(require_classnames());
	init_useEvent();
	init_useMergedState();
	init_isEqual();
	init_warning();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_Handles();
	init_Marks();
	init_Steps();
	init_Tracks();
	init_context();
	init_useDrag();
	init_useOffset();
	init_useRange();
	Slider = /* @__PURE__ */ import_react.forwardRef(function(props, ref) {
		var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-slider" : _props$prefixCls, className = props.className, style = props.style, classNames$2 = props.classNames, styles = props.styles, id = props.id, _props$disabled = props.disabled, disabled = _props$disabled === void 0 ? false : _props$disabled, _props$keyboard = props.keyboard, keyboard = _props$keyboard === void 0 ? true : _props$keyboard, autoFocus = props.autoFocus, onFocus = props.onFocus, onBlur = props.onBlur, _props$min = props.min, min = _props$min === void 0 ? 0 : _props$min, _props$max = props.max, max = _props$max === void 0 ? 100 : _props$max, _props$step = props.step, step = _props$step === void 0 ? 1 : _props$step, value = props.value, defaultValue = props.defaultValue, range = props.range, count = props.count, onChange = props.onChange, onBeforeChange = props.onBeforeChange, onAfterChange = props.onAfterChange, onChangeComplete = props.onChangeComplete, _props$allowCross = props.allowCross, allowCross = _props$allowCross === void 0 ? true : _props$allowCross, _props$pushable = props.pushable, pushable = _props$pushable === void 0 ? false : _props$pushable, reverse = props.reverse, vertical = props.vertical, _props$included = props.included, included = _props$included === void 0 ? true : _props$included, startPoint = props.startPoint, trackStyle = props.trackStyle, handleStyle = props.handleStyle, railStyle = props.railStyle, dotStyle = props.dotStyle, activeDotStyle = props.activeDotStyle, marks = props.marks, dots = props.dots, handleRender = props.handleRender, activeHandleRender = props.activeHandleRender, track = props.track, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, ariaLabelForHandle = props.ariaLabelForHandle, ariaLabelledByForHandle = props.ariaLabelledByForHandle, ariaRequired = props.ariaRequired, ariaValueTextFormatterForHandle = props.ariaValueTextFormatterForHandle;
		var handlesRef = import_react.useRef(null);
		var containerRef = import_react.useRef(null);
		var direction = import_react.useMemo(function() {
			if (vertical) return reverse ? "ttb" : "btt";
			return reverse ? "rtl" : "ltr";
		}, [reverse, vertical]);
		var _useRange = useRange(range), _useRange2 = _slicedToArray(_useRange, 5), rangeEnabled = _useRange2[0], rangeEditable = _useRange2[1], rangeDraggableTrack = _useRange2[2], minCount = _useRange2[3], maxCount = _useRange2[4];
		var mergedMin = import_react.useMemo(function() {
			return isFinite(min) ? min : 0;
		}, [min]);
		var mergedMax = import_react.useMemo(function() {
			return isFinite(max) ? max : 100;
		}, [max]);
		var mergedStep = import_react.useMemo(function() {
			return step !== null && step <= 0 ? 1 : step;
		}, [step]);
		var mergedPush = import_react.useMemo(function() {
			if (typeof pushable === "boolean") return pushable ? mergedStep : false;
			return pushable >= 0 ? pushable : false;
		}, [pushable, mergedStep]);
		var markList = import_react.useMemo(function() {
			return Object.keys(marks || {}).map(function(key) {
				var mark = marks[key];
				var markObj = { value: Number(key) };
				if (mark && _typeof(mark) === "object" && !/* @__PURE__ */ import_react.isValidElement(mark) && ("label" in mark || "style" in mark)) {
					markObj.style = mark.style;
					markObj.label = mark.label;
				} else markObj.label = mark;
				return markObj;
			}).filter(function(_ref) {
				var label = _ref.label;
				return label || typeof label === "number";
			}).sort(function(a, b) {
				return a.value - b.value;
			});
		}, [marks]);
		var _useOffset = useOffset(mergedMin, mergedMax, mergedStep, markList, allowCross, mergedPush), _useOffset2 = _slicedToArray(_useOffset, 2), formatValue = _useOffset2[0], offsetValues = _useOffset2[1];
		var _useMergedState = useMergedState(defaultValue, { value }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setValue = _useMergedState2[1];
		var rawValues = import_react.useMemo(function() {
			var valueList = mergedValue === null || mergedValue === void 0 ? [] : Array.isArray(mergedValue) ? mergedValue : [mergedValue];
			var _valueList = _slicedToArray(valueList, 1), _valueList$ = _valueList[0], val0 = _valueList$ === void 0 ? mergedMin : _valueList$;
			var returnValues = mergedValue === null ? [] : [val0];
			if (rangeEnabled) {
				returnValues = _toConsumableArray(valueList);
				if (count || mergedValue === void 0) {
					var pointCount = count >= 0 ? count + 1 : 2;
					returnValues = returnValues.slice(0, pointCount);
					while (returnValues.length < pointCount) {
						var _returnValues;
						returnValues.push((_returnValues = returnValues[returnValues.length - 1]) !== null && _returnValues !== void 0 ? _returnValues : mergedMin);
					}
				}
				returnValues.sort(function(a, b) {
					return a - b;
				});
			}
			returnValues.forEach(function(val, index) {
				returnValues[index] = formatValue(val);
			});
			return returnValues;
		}, [
			mergedValue,
			rangeEnabled,
			mergedMin,
			count,
			formatValue
		]);
		var getTriggerValue = function getTriggerValue$1(triggerValues) {
			return rangeEnabled ? triggerValues : triggerValues[0];
		};
		var triggerChange = useEvent(function(nextValues) {
			var cloneNextValues = _toConsumableArray(nextValues).sort(function(a, b) {
				return a - b;
			});
			if (onChange && !isEqual_default(cloneNextValues, rawValues, true)) onChange(getTriggerValue(cloneNextValues));
			setValue(cloneNextValues);
		});
		var finishChange = useEvent(function(draggingDelete$1) {
			if (draggingDelete$1) handlesRef.current.hideHelp();
			var finishValue = getTriggerValue(rawValues);
			onAfterChange === null || onAfterChange === void 0 || onAfterChange(finishValue);
			warning_default(!onAfterChange, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.");
			onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(finishValue);
		});
		var onDelete = function onDelete$1(index) {
			if (disabled || !rangeEditable || rawValues.length <= minCount) return;
			var cloneNextValues = _toConsumableArray(rawValues);
			cloneNextValues.splice(index, 1);
			onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(cloneNextValues));
			triggerChange(cloneNextValues);
			var nextFocusIndex = Math.max(0, index - 1);
			handlesRef.current.hideHelp();
			handlesRef.current.focus(nextFocusIndex);
		};
		var _useDrag = useDrag_default(containerRef, direction, rawValues, mergedMin, mergedMax, formatValue, triggerChange, finishChange, offsetValues, rangeEditable, minCount), _useDrag2 = _slicedToArray(_useDrag, 5), draggingIndex = _useDrag2[0], draggingValue = _useDrag2[1], draggingDelete = _useDrag2[2], cacheValues = _useDrag2[3], onStartDrag = _useDrag2[4];
		var changeToCloseValue = function changeToCloseValue$1(newValue, e) {
			if (!disabled) {
				var cloneNextValues = _toConsumableArray(rawValues);
				var valueIndex = 0;
				var valueBeforeIndex = 0;
				var valueDist = mergedMax - mergedMin;
				rawValues.forEach(function(val, index) {
					var dist = Math.abs(newValue - val);
					if (dist <= valueDist) {
						valueDist = dist;
						valueIndex = index;
					}
					if (val < newValue) valueBeforeIndex = index;
				});
				var focusIndex = valueIndex;
				if (rangeEditable && valueDist !== 0 && (!maxCount || rawValues.length < maxCount)) {
					cloneNextValues.splice(valueBeforeIndex + 1, 0, newValue);
					focusIndex = valueBeforeIndex + 1;
				} else cloneNextValues[valueIndex] = newValue;
				if (rangeEnabled && !rawValues.length && count === void 0) cloneNextValues.push(newValue);
				var nextValue = getTriggerValue(cloneNextValues);
				onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(nextValue);
				triggerChange(cloneNextValues);
				if (e) {
					var _document$activeEleme, _document$activeEleme2;
					(_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 || (_document$activeEleme2 = _document$activeEleme.blur) === null || _document$activeEleme2 === void 0 || _document$activeEleme2.call(_document$activeEleme);
					handlesRef.current.focus(focusIndex);
					onStartDrag(e, focusIndex, cloneNextValues);
				} else {
					onAfterChange === null || onAfterChange === void 0 || onAfterChange(nextValue);
					warning_default(!onAfterChange, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.");
					onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(nextValue);
				}
			}
		};
		var onSliderMouseDown = function onSliderMouseDown$1(e) {
			e.preventDefault();
			var _containerRef$current = containerRef.current.getBoundingClientRect(), width = _containerRef$current.width, height = _containerRef$current.height, left = _containerRef$current.left, top = _containerRef$current.top, bottom = _containerRef$current.bottom, right = _containerRef$current.right;
			var clientX = e.clientX, clientY = e.clientY;
			var percent;
			switch (direction) {
				case "btt":
					percent = (bottom - clientY) / height;
					break;
				case "ttb":
					percent = (clientY - top) / height;
					break;
				case "rtl":
					percent = (right - clientX) / width;
					break;
				default: percent = (clientX - left) / width;
			}
			var nextValue = mergedMin + percent * (mergedMax - mergedMin);
			changeToCloseValue(formatValue(nextValue), e);
		};
		var _React$useState = import_react.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), keyboardValue = _React$useState2[0], setKeyboardValue = _React$useState2[1];
		var onHandleOffsetChange = function onHandleOffsetChange$1(offset, valueIndex) {
			if (!disabled) {
				var next = offsetValues(rawValues, offset, valueIndex);
				onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(rawValues));
				triggerChange(next.values);
				setKeyboardValue(next.value);
			}
		};
		import_react.useEffect(function() {
			if (keyboardValue !== null) {
				var valueIndex = rawValues.indexOf(keyboardValue);
				if (valueIndex >= 0) handlesRef.current.focus(valueIndex);
			}
			setKeyboardValue(null);
		}, [keyboardValue]);
		var mergedDraggableTrack = import_react.useMemo(function() {
			if (rangeDraggableTrack && mergedStep === null) return false;
			return rangeDraggableTrack;
		}, [rangeDraggableTrack, mergedStep]);
		var onStartMove = useEvent(function(e, valueIndex) {
			onStartDrag(e, valueIndex);
			onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(rawValues));
		});
		var dragging = draggingIndex !== -1;
		import_react.useEffect(function() {
			if (!dragging) {
				var valueIndex = rawValues.lastIndexOf(draggingValue);
				handlesRef.current.focus(valueIndex);
			}
		}, [dragging]);
		var sortedCacheValues = import_react.useMemo(function() {
			return _toConsumableArray(cacheValues).sort(function(a, b) {
				return a - b;
			});
		}, [cacheValues]);
		var _React$useMemo = import_react.useMemo(function() {
			if (!rangeEnabled) return [mergedMin, sortedCacheValues[0]];
			return [sortedCacheValues[0], sortedCacheValues[sortedCacheValues.length - 1]];
		}, [
			sortedCacheValues,
			rangeEnabled,
			mergedMin
		]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), includedStart = _React$useMemo2[0], includedEnd = _React$useMemo2[1];
		import_react.useImperativeHandle(ref, function() {
			return {
				focus: function focus() {
					handlesRef.current.focus(0);
				},
				blur: function blur() {
					var _containerRef$current2;
					var _document = document, activeElement = _document.activeElement;
					if ((_containerRef$current2 = containerRef.current) !== null && _containerRef$current2 !== void 0 && _containerRef$current2.contains(activeElement)) activeElement === null || activeElement === void 0 || activeElement.blur();
				}
			};
		});
		import_react.useEffect(function() {
			if (autoFocus) handlesRef.current.focus(0);
		}, []);
		var context = import_react.useMemo(function() {
			return {
				min: mergedMin,
				max: mergedMax,
				direction,
				disabled,
				keyboard,
				step: mergedStep,
				included,
				includedStart,
				includedEnd,
				range: rangeEnabled,
				tabIndex,
				ariaLabelForHandle,
				ariaLabelledByForHandle,
				ariaRequired,
				ariaValueTextFormatterForHandle,
				styles: styles || {},
				classNames: classNames$2 || {}
			};
		}, [
			mergedMin,
			mergedMax,
			direction,
			disabled,
			keyboard,
			mergedStep,
			included,
			includedStart,
			includedEnd,
			rangeEnabled,
			tabIndex,
			ariaLabelForHandle,
			ariaLabelledByForHandle,
			ariaRequired,
			ariaValueTextFormatterForHandle,
			styles,
			classNames$2
		]);
		return /* @__PURE__ */ import_react.createElement(context_default.Provider, { value: context }, /* @__PURE__ */ import_react.createElement("div", {
			ref: containerRef,
			className: (0, import_classnames.default)(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-vertical"), vertical), "".concat(prefixCls, "-horizontal"), !vertical), "".concat(prefixCls, "-with-marks"), markList.length)),
			style,
			onMouseDown: onSliderMouseDown,
			id
		}, /* @__PURE__ */ import_react.createElement("div", {
			className: (0, import_classnames.default)("".concat(prefixCls, "-rail"), classNames$2 === null || classNames$2 === void 0 ? void 0 : classNames$2.rail),
			style: _objectSpread2(_objectSpread2({}, railStyle), styles === null || styles === void 0 ? void 0 : styles.rail)
		}), track !== false && /* @__PURE__ */ import_react.createElement(Tracks_default, {
			prefixCls,
			style: trackStyle,
			values: rawValues,
			startPoint,
			onStartMove: mergedDraggableTrack ? onStartMove : void 0
		}), /* @__PURE__ */ import_react.createElement(Steps_default, {
			prefixCls,
			marks: markList,
			dots,
			style: dotStyle,
			activeStyle: activeDotStyle
		}), /* @__PURE__ */ import_react.createElement(Handles_default, {
			ref: handlesRef,
			prefixCls,
			style: handleStyle,
			values: cacheValues,
			draggingIndex,
			draggingDelete,
			onStartMove,
			onOffsetChange: onHandleOffsetChange,
			onFocus,
			onBlur,
			handleRender,
			activeHandleRender,
			onChangeComplete: finishChange,
			onDelete: rangeEditable ? onDelete : void 0
		}), /* @__PURE__ */ import_react.createElement(Marks_default, {
			prefixCls,
			marks: markList,
			onClick: changeToCloseValue
		})));
	});
	Slider_default = Slider;
}));
var es_exports = {};
__export(es_exports, {
	UnstableContext: () => UnstableContext,
	default: () => es_default
});
var es_default;
var init_es = __esmMin((() => {
	init_Slider();
	init_context();
	es_default = Slider_default;
}));
export { es_default as b, es_exports as c, init_es as d, UnstableContext as e };
