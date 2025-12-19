import { c as __esmMin, d as __export, g as __toESM } from "./chunk-st2fFX3F.js";
import { b4 as addEventListenerWrap, b5 as init_addEventListener, bL as init_isMobile, bM as isMobile_default, c3 as getScrollBarSize, c4 as getTargetScrollBarSize, c5 as init_getScrollBarSize, cS as init_es$5, cX as init_useEvent, cY as useEvent, cg as init_isVisible, ch as isVisible_default, cq as KeyCode_default, cr as init_KeyCode, cs as init_pickAttrs, ct as pickAttrs, d$ as init_createClass, dB as canUseDom, dC as init_canUseDom, dD as _slicedToArray, dE as init_slicedToArray, dF as init_raf, dG as raf_default, dH as _toConsumableArray, dI as init_toConsumableArray, dL as es_default$2, dN as init_es$6, d_ as _createClass, da as get, db as init_get, dm as init_useLayoutEffect, dn as useLayoutEffect_default, do as useLayoutUpdateEffect, dt as init_isEqual, du as isEqual_default, dv as _objectWithoutProperties, dw as init_objectWithoutProperties, e0 as _classCallCheck, e1 as init_classCallCheck, e4 as composeRef, e5 as fillRef, e7 as init_ref, e9 as supportRef, eb as init_useMemo, ec as useMemo$1, ef as getDOM, eg as init_findDOMNode, ei as require_react_dom, ej as _objectSpread2, ek as init_objectSpread2, el as _defineProperty, em as init_defineProperty, en as init_warning, ep as warning_default, eq as init_toArray, er as toArray, es as _typeof, et as init_typeof, eu as _extends, ev as init_extends, ew as require_classnames } from "./es-gm3Yu9dM.js";
import { b as require_react } from "./react-nO8b1aHv.js";
import { W as init_es$7, Z as BaseInput_default, _ as init_commonUtils, a1 as triggerFocus, ar as es_default$1, as as init_es$8, av as init_styleChecker, aw as isStyleSupport } from "./Component-BeyEzbnS.js";
function supportBigInt() {
	return typeof BigInt === "function";
}
var init_supportUtil = __esmMin((() => {}));
function isEmpty(value) {
	return !value && value !== 0 && !Number.isNaN(value) || !String(value).trim();
}
function trimNumber(numStr) {
	var str = numStr.trim();
	var negative = str.startsWith("-");
	if (negative) str = str.slice(1);
	str = str.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, "");
	if (str.startsWith(".")) str = "0".concat(str);
	var trimStr = str || "0";
	var splitNumber = trimStr.split(".");
	var integerStr = splitNumber[0] || "0";
	var decimalStr = splitNumber[1] || "0";
	if (integerStr === "0" && decimalStr === "0") negative = false;
	var negativeStr = negative ? "-" : "";
	return {
		negative,
		negativeStr,
		trimStr,
		integerStr,
		decimalStr,
		fullStr: "".concat(negativeStr).concat(trimStr)
	};
}
function isE(number) {
	var str = String(number);
	return !Number.isNaN(Number(str)) && str.includes("e");
}
function getNumberPrecision(number) {
	var numStr = String(number);
	if (isE(number)) {
		var precision = Number(numStr.slice(numStr.indexOf("e-") + 2));
		var decimalMatch = numStr.match(/\.(\d+)/);
		if (decimalMatch !== null && decimalMatch !== void 0 && decimalMatch[1]) precision += decimalMatch[1].length;
		return precision;
	}
	return numStr.includes(".") && validateNumber(numStr) ? numStr.length - numStr.indexOf(".") - 1 : 0;
}
function num2str(number) {
	var numStr = String(number);
	if (isE(number)) {
		if (number > Number.MAX_SAFE_INTEGER) return String(supportBigInt() ? BigInt(number).toString() : Number.MAX_SAFE_INTEGER);
		if (number < Number.MIN_SAFE_INTEGER) return String(supportBigInt() ? BigInt(number).toString() : Number.MIN_SAFE_INTEGER);
		numStr = number.toFixed(getNumberPrecision(numStr));
	}
	return trimNumber(numStr).fullStr;
}
function validateNumber(num) {
	if (typeof num === "number") return !Number.isNaN(num);
	if (!num) return false;
	return /^\s*-?\d+(\.\d+)?\s*$/.test(num) || /^\s*-?\d+\.\s*$/.test(num) || /^\s*-?\.\d+\s*$/.test(num);
}
var init_numberUtil$1 = __esmMin((() => {
	init_supportUtil();
}));
var BigIntDecimal;
var init_BigIntDecimal = __esmMin((() => {
	init_classCallCheck();
	init_createClass();
	init_defineProperty();
	init_numberUtil$1();
	BigIntDecimal = /* @__PURE__ */ function() {
		function BigIntDecimal$1(value) {
			_classCallCheck(this, BigIntDecimal$1);
			_defineProperty(this, "origin", "");
			_defineProperty(this, "negative", void 0);
			_defineProperty(this, "integer", void 0);
			_defineProperty(this, "decimal", void 0);
			_defineProperty(this, "decimalLen", void 0);
			_defineProperty(this, "empty", void 0);
			_defineProperty(this, "nan", void 0);
			if (isEmpty(value)) {
				this.empty = true;
				return;
			}
			this.origin = String(value);
			if (value === "-" || Number.isNaN(value)) {
				this.nan = true;
				return;
			}
			var mergedValue = value;
			if (isE(mergedValue)) mergedValue = Number(mergedValue);
			mergedValue = typeof mergedValue === "string" ? mergedValue : num2str(mergedValue);
			if (validateNumber(mergedValue)) {
				var trimRet = trimNumber(mergedValue);
				this.negative = trimRet.negative;
				var numbers = trimRet.trimStr.split(".");
				this.integer = BigInt(numbers[0]);
				var decimalStr = numbers[1] || "0";
				this.decimal = BigInt(decimalStr);
				this.decimalLen = decimalStr.length;
			} else this.nan = true;
		}
		_createClass(BigIntDecimal$1, [
			{
				key: "getMark",
				value: function getMark() {
					return this.negative ? "-" : "";
				}
			},
			{
				key: "getIntegerStr",
				value: function getIntegerStr() {
					return this.integer.toString();
				}
			},
			{
				key: "getDecimalStr",
				value: function getDecimalStr() {
					return this.decimal.toString().padStart(this.decimalLen, "0");
				}
			},
			{
				key: "alignDecimal",
				value: function alignDecimal(decimalLength) {
					var str = "".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(decimalLength, "0"));
					return BigInt(str);
				}
			},
			{
				key: "negate",
				value: function negate() {
					var clone = new BigIntDecimal$1(this.toString());
					clone.negative = !clone.negative;
					return clone;
				}
			},
			{
				key: "cal",
				value: function cal(offset, calculator, calDecimalLen) {
					var maxDecimalLength = Math.max(this.getDecimalStr().length, offset.getDecimalStr().length);
					var myAlignedDecimal = this.alignDecimal(maxDecimalLength);
					var offsetAlignedDecimal = offset.alignDecimal(maxDecimalLength);
					var valueStr = calculator(myAlignedDecimal, offsetAlignedDecimal).toString();
					var nextDecimalLength = calDecimalLen(maxDecimalLength);
					var _trimNumber = trimNumber(valueStr), negativeStr = _trimNumber.negativeStr, trimStr = _trimNumber.trimStr;
					var hydrateValueStr = "".concat(negativeStr).concat(trimStr.padStart(nextDecimalLength + 1, "0"));
					return new BigIntDecimal$1("".concat(hydrateValueStr.slice(0, -nextDecimalLength), ".").concat(hydrateValueStr.slice(-nextDecimalLength)));
				}
			},
			{
				key: "add",
				value: function add(value) {
					if (this.isInvalidate()) return new BigIntDecimal$1(value);
					var offset = new BigIntDecimal$1(value);
					if (offset.isInvalidate()) return this;
					return this.cal(offset, function(num1, num2) {
						return num1 + num2;
					}, function(len) {
						return len;
					});
				}
			},
			{
				key: "multi",
				value: function multi(value) {
					var target = new BigIntDecimal$1(value);
					if (this.isInvalidate() || target.isInvalidate()) return new BigIntDecimal$1(NaN);
					return this.cal(target, function(num1, num2) {
						return num1 * num2;
					}, function(len) {
						return len * 2;
					});
				}
			},
			{
				key: "isEmpty",
				value: function isEmpty$1() {
					return this.empty;
				}
			},
			{
				key: "isNaN",
				value: function isNaN() {
					return this.nan;
				}
			},
			{
				key: "isInvalidate",
				value: function isInvalidate() {
					return this.isEmpty() || this.isNaN();
				}
			},
			{
				key: "equals",
				value: function equals(target) {
					return this.toString() === (target === null || target === void 0 ? void 0 : target.toString());
				}
			},
			{
				key: "lessEquals",
				value: function lessEquals(target) {
					return this.add(target.negate().toString()).toNumber() <= 0;
				}
			},
			{
				key: "toNumber",
				value: function toNumber() {
					if (this.isNaN()) return NaN;
					return Number(this.toString());
				}
			},
			{
				key: "toString",
				value: function toString() {
					var safe = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
					if (!safe) return this.origin;
					if (this.isInvalidate()) return "";
					return trimNumber("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr;
				}
			}
		]);
		return BigIntDecimal$1;
	}();
}));
var NumberDecimal;
var init_NumberDecimal = __esmMin((() => {
	init_classCallCheck();
	init_createClass();
	init_defineProperty();
	init_numberUtil$1();
	NumberDecimal = /* @__PURE__ */ function() {
		function NumberDecimal$1(value) {
			_classCallCheck(this, NumberDecimal$1);
			_defineProperty(this, "origin", "");
			_defineProperty(this, "number", void 0);
			_defineProperty(this, "empty", void 0);
			if (isEmpty(value)) {
				this.empty = true;
				return;
			}
			this.origin = String(value);
			this.number = Number(value);
		}
		_createClass(NumberDecimal$1, [
			{
				key: "negate",
				value: function negate() {
					return new NumberDecimal$1(-this.toNumber());
				}
			},
			{
				key: "add",
				value: function add(value) {
					if (this.isInvalidate()) return new NumberDecimal$1(value);
					var target = Number(value);
					if (Number.isNaN(target)) return this;
					var number = this.number + target;
					if (number > Number.MAX_SAFE_INTEGER) return new NumberDecimal$1(Number.MAX_SAFE_INTEGER);
					if (number < Number.MIN_SAFE_INTEGER) return new NumberDecimal$1(Number.MIN_SAFE_INTEGER);
					var maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(target));
					return new NumberDecimal$1(number.toFixed(maxPrecision));
				}
			},
			{
				key: "multi",
				value: function multi(value) {
					var target = Number(value);
					if (this.isInvalidate() || Number.isNaN(target)) return new NumberDecimal$1(NaN);
					var number = this.number * target;
					if (number > Number.MAX_SAFE_INTEGER) return new NumberDecimal$1(Number.MAX_SAFE_INTEGER);
					if (number < Number.MIN_SAFE_INTEGER) return new NumberDecimal$1(Number.MIN_SAFE_INTEGER);
					var maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(target));
					return new NumberDecimal$1(number.toFixed(maxPrecision));
				}
			},
			{
				key: "isEmpty",
				value: function isEmpty$1() {
					return this.empty;
				}
			},
			{
				key: "isNaN",
				value: function isNaN() {
					return Number.isNaN(this.number);
				}
			},
			{
				key: "isInvalidate",
				value: function isInvalidate() {
					return this.isEmpty() || this.isNaN();
				}
			},
			{
				key: "equals",
				value: function equals(target) {
					return this.toNumber() === (target === null || target === void 0 ? void 0 : target.toNumber());
				}
			},
			{
				key: "lessEquals",
				value: function lessEquals(target) {
					return this.add(target.negate().toString()).toNumber() <= 0;
				}
			},
			{
				key: "toNumber",
				value: function toNumber() {
					return this.number;
				}
			},
			{
				key: "toString",
				value: function toString() {
					var safe = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
					if (!safe) return this.origin;
					if (this.isInvalidate()) return "";
					return num2str(this.number);
				}
			}
		]);
		return NumberDecimal$1;
	}();
}));
function getMiniDecimal(value) {
	if (supportBigInt()) return new BigIntDecimal(value);
	return new NumberDecimal(value);
}
function toFixed(numStr, separatorStr, precision) {
	var cutOnly = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
	if (numStr === "") return "";
	var _trimNumber = trimNumber(numStr), negativeStr = _trimNumber.negativeStr, integerStr = _trimNumber.integerStr, decimalStr = _trimNumber.decimalStr;
	var precisionDecimalStr = "".concat(separatorStr).concat(decimalStr);
	var numberWithoutDecimal = "".concat(negativeStr).concat(integerStr);
	if (precision >= 0) {
		var advancedNum = Number(decimalStr[precision]);
		if (advancedNum >= 5 && !cutOnly) {
			var advancedDecimal = getMiniDecimal(numStr).add("".concat(negativeStr, "0.").concat("0".repeat(precision)).concat(10 - advancedNum));
			return toFixed(advancedDecimal.toString(), separatorStr, precision, cutOnly);
		}
		if (precision === 0) return numberWithoutDecimal;
		return "".concat(numberWithoutDecimal).concat(separatorStr).concat(decimalStr.padEnd(precision, "0").slice(0, precision));
	}
	if (precisionDecimalStr === ".0") return numberWithoutDecimal;
	return "".concat(numberWithoutDecimal).concat(precisionDecimalStr);
}
var init_MiniDecimal = __esmMin((() => {
	init_BigIntDecimal();
	init_NumberDecimal();
	init_numberUtil$1();
	init_supportUtil();
}));
var es_default$5;
var init_es$4 = __esmMin((() => {
	init_MiniDecimal();
	init_MiniDecimal();
	init_numberUtil$1();
	es_default$5 = getMiniDecimal;
}));
function proxyObject(obj, extendProps) {
	if (typeof Proxy !== "undefined" && obj) return new Proxy(obj, { get: function get$1(target, prop) {
		if (extendProps[prop]) return extendProps[prop];
		var originProp = target[prop];
		return typeof originProp === "function" ? originProp.bind(target) : originProp;
	} });
	return obj;
}
var init_proxyObject = __esmMin((() => {}));
function useCursor(input, focused) {
	var selectionRef = (0, import_react$42.useRef)(null);
	function recordCursor() {
		try {
			var start = input.selectionStart, end = input.selectionEnd, value = input.value;
			var beforeTxt = value.substring(0, start);
			var afterTxt = value.substring(end);
			selectionRef.current = {
				start,
				end,
				value,
				beforeTxt,
				afterTxt
			};
		} catch (e) {}
	}
	function restoreCursor() {
		if (input && selectionRef.current && focused) try {
			var value = input.value;
			var _selectionRef$current = selectionRef.current, beforeTxt = _selectionRef$current.beforeTxt, afterTxt = _selectionRef$current.afterTxt, start = _selectionRef$current.start;
			var startPos = value.length;
			if (value.startsWith(beforeTxt)) startPos = beforeTxt.length;
			else if (value.endsWith(afterTxt)) startPos = value.length - selectionRef.current.afterTxt.length;
			else {
				var beforeLastChar = beforeTxt[start - 1];
				var newIndex = value.indexOf(beforeLastChar, start - 1);
				if (newIndex !== -1) startPos = newIndex + 1;
			}
			input.setSelectionRange(startPos, startPos);
		} catch (e) {
			warning_default(false, "Something warning of cursor restore. Please fire issue about this: ".concat(e.message));
		}
	}
	return [recordCursor, restoreCursor];
}
var import_react$42;
var init_useCursor = __esmMin((() => {
	import_react$42 = /* @__PURE__ */ __toESM(require_react());
	init_warning();
}));
var import_react$41, useMobile, useMobile_default;
var init_useMobile = __esmMin((() => {
	init_slicedToArray();
	import_react$41 = /* @__PURE__ */ __toESM(require_react());
	init_isMobile();
	init_useLayoutEffect();
	useMobile = function useMobile$1() {
		var _useState = (0, import_react$41.useState)(false), _useState2 = _slicedToArray(_useState, 2), mobile = _useState2[0], setMobile = _useState2[1];
		useLayoutEffect_default(function() {
			setMobile(isMobile_default());
		}, []);
		return mobile;
	};
	useMobile_default = useMobile;
}));
function StepHandler(_ref) {
	var prefixCls = _ref.prefixCls, upNode = _ref.upNode, downNode = _ref.downNode, upDisabled = _ref.upDisabled, downDisabled = _ref.downDisabled, onStep = _ref.onStep;
	var stepTimeoutRef = import_react$40.useRef();
	var frameIds = import_react$40.useRef([]);
	var onStepRef = import_react$40.useRef();
	onStepRef.current = onStep;
	var onStopStep = function onStopStep$1() {
		clearTimeout(stepTimeoutRef.current);
	};
	var onStepMouseDown = function onStepMouseDown$1(e, up) {
		e.preventDefault();
		onStopStep();
		onStepRef.current(up);
		function loopStep() {
			onStepRef.current(up);
			stepTimeoutRef.current = setTimeout(loopStep, STEP_INTERVAL);
		}
		stepTimeoutRef.current = setTimeout(loopStep, STEP_DELAY);
	};
	import_react$40.useEffect(function() {
		return function() {
			onStopStep();
			frameIds.current.forEach(function(id) {
				return raf_default.cancel(id);
			});
		};
	}, []);
	var isMobile = useMobile_default();
	if (isMobile) return null;
	var handlerClassName = "".concat(prefixCls, "-handler");
	var upClassName = (0, import_classnames$13.default)(handlerClassName, "".concat(handlerClassName, "-up"), _defineProperty({}, "".concat(handlerClassName, "-up-disabled"), upDisabled));
	var downClassName = (0, import_classnames$13.default)(handlerClassName, "".concat(handlerClassName, "-down"), _defineProperty({}, "".concat(handlerClassName, "-down-disabled"), downDisabled));
	var safeOnStopStep = function safeOnStopStep$1() {
		return frameIds.current.push(raf_default(onStopStep));
	};
	var sharedHandlerProps = {
		unselectable: "on",
		role: "button",
		onMouseUp: safeOnStopStep,
		onMouseLeave: safeOnStopStep
	};
	return /* @__PURE__ */ import_react$40.createElement("div", { className: "".concat(handlerClassName, "-wrap") }, /* @__PURE__ */ import_react$40.createElement("span", _extends({}, sharedHandlerProps, {
		onMouseDown: function onMouseDown(e) {
			onStepMouseDown(e, true);
		},
		"aria-label": "Increase Value",
		"aria-disabled": upDisabled,
		className: upClassName
	}), upNode || /* @__PURE__ */ import_react$40.createElement("span", {
		unselectable: "on",
		className: "".concat(prefixCls, "-handler-up-inner")
	})), /* @__PURE__ */ import_react$40.createElement("span", _extends({}, sharedHandlerProps, {
		onMouseDown: function onMouseDown(e) {
			onStepMouseDown(e, false);
		},
		"aria-label": "Decrease Value",
		"aria-disabled": downDisabled,
		className: downClassName
	}), downNode || /* @__PURE__ */ import_react$40.createElement("span", {
		unselectable: "on",
		className: "".concat(prefixCls, "-handler-down-inner")
	})));
}
var import_react$40, import_classnames$13, STEP_INTERVAL, STEP_DELAY;
var init_StepHandler = __esmMin((() => {
	init_extends();
	init_defineProperty();
	import_react$40 = /* @__PURE__ */ __toESM(require_react());
	import_classnames$13 = /* @__PURE__ */ __toESM(require_classnames());
	init_useMobile();
	init_raf();
	STEP_INTERVAL = 200;
	STEP_DELAY = 600;
}));
function getDecupleSteps(step) {
	var stepStr = typeof step === "number" ? num2str(step) : trimNumber(step).fullStr;
	var hasPoint = stepStr.includes(".");
	if (!hasPoint) return step + "0";
	return trimNumber(stepStr.replace(/(\d)\.(\d)/g, "$1$2.")).fullStr;
}
var init_numberUtil = __esmMin((() => {
	init_es$4();
}));
var import_react$39, useFrame_default;
var init_useFrame$1 = __esmMin((() => {
	import_react$39 = /* @__PURE__ */ __toESM(require_react());
	init_raf();
	useFrame_default = (function() {
		var idRef = (0, import_react$39.useRef)(0);
		var cleanUp = function cleanUp$1() {
			raf_default.cancel(idRef.current);
		};
		(0, import_react$39.useEffect)(function() {
			return cleanUp;
		}, []);
		return function(callback) {
			cleanUp();
			idRef.current = raf_default(function() {
				callback();
			});
		};
	});
}));
var import_classnames$12, import_react$38, _excluded$8, _excluded2$1, getDecimalValue, getDecimalIfValidate, InternalInputNumber, InputNumber, InputNumber_default;
var init_InputNumber = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_typeof();
	init_slicedToArray();
	init_objectWithoutProperties();
	init_es$4();
	import_classnames$12 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$7();
	init_useLayoutEffect();
	init_proxyObject();
	init_ref();
	import_react$38 = /* @__PURE__ */ __toESM(require_react());
	init_useCursor();
	init_StepHandler();
	init_numberUtil();
	init_commonUtils();
	init_useFrame$1();
	_excluded$8 = [
		"prefixCls",
		"className",
		"style",
		"min",
		"max",
		"step",
		"defaultValue",
		"value",
		"disabled",
		"readOnly",
		"upHandler",
		"downHandler",
		"keyboard",
		"changeOnWheel",
		"controls",
		"classNames",
		"stringMode",
		"parser",
		"formatter",
		"precision",
		"decimalSeparator",
		"onChange",
		"onInput",
		"onPressEnter",
		"onStep",
		"changeOnBlur",
		"domRef"
	], _excluded2$1 = [
		"disabled",
		"style",
		"prefixCls",
		"value",
		"prefix",
		"suffix",
		"addonBefore",
		"addonAfter",
		"className",
		"classNames"
	];
	getDecimalValue = function getDecimalValue$1(stringMode, decimalValue) {
		if (stringMode || decimalValue.isEmpty()) return decimalValue.toString();
		return decimalValue.toNumber();
	};
	getDecimalIfValidate = function getDecimalIfValidate$1(value) {
		var decimal = es_default$5(value);
		return decimal.isInvalidate() ? null : decimal;
	};
	InternalInputNumber = /* @__PURE__ */ import_react$38.forwardRef(function(props, ref) {
		var prefixCls = props.prefixCls, className = props.className, style = props.style, min = props.min, max = props.max, _props$step = props.step, step = _props$step === void 0 ? 1 : _props$step, defaultValue = props.defaultValue, value = props.value, disabled = props.disabled, readOnly = props.readOnly, upHandler = props.upHandler, downHandler = props.downHandler, keyboard = props.keyboard, _props$changeOnWheel = props.changeOnWheel, changeOnWheel = _props$changeOnWheel === void 0 ? false : _props$changeOnWheel, _props$controls = props.controls, controls = _props$controls === void 0 ? true : _props$controls;
		props.classNames;
		var stringMode = props.stringMode, parser = props.parser, formatter = props.formatter, precision = props.precision, decimalSeparator = props.decimalSeparator, onChange = props.onChange, onInput = props.onInput, onPressEnter = props.onPressEnter, onStep = props.onStep, _props$changeOnBlur = props.changeOnBlur, changeOnBlur = _props$changeOnBlur === void 0 ? true : _props$changeOnBlur, domRef = props.domRef, inputProps = _objectWithoutProperties(props, _excluded$8);
		var inputClassName = "".concat(prefixCls, "-input");
		var inputRef = import_react$38.useRef(null);
		var _React$useState = import_react$38.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focus = _React$useState2[0], setFocus = _React$useState2[1];
		var userTypingRef = import_react$38.useRef(false);
		var compositionRef = import_react$38.useRef(false);
		var shiftKeyRef = import_react$38.useRef(false);
		var _React$useState3 = import_react$38.useState(function() {
			return es_default$5(value !== null && value !== void 0 ? value : defaultValue);
		}), _React$useState4 = _slicedToArray(_React$useState3, 2), decimalValue = _React$useState4[0], setDecimalValue = _React$useState4[1];
		function setUncontrolledDecimalValue(newDecimal) {
			if (value === void 0) setDecimalValue(newDecimal);
		}
		var getPrecision = import_react$38.useCallback(function(numStr, userTyping) {
			if (userTyping) return void 0;
			if (precision >= 0) return precision;
			return Math.max(getNumberPrecision(numStr), getNumberPrecision(step));
		}, [precision, step]);
		var mergedParser = import_react$38.useCallback(function(num) {
			var numStr = String(num);
			if (parser) return parser(numStr);
			var parsedStr = numStr;
			if (decimalSeparator) parsedStr = parsedStr.replace(decimalSeparator, ".");
			return parsedStr.replace(/[^\w.-]+/g, "");
		}, [parser, decimalSeparator]);
		var inputValueRef = import_react$38.useRef("");
		var mergedFormatter = import_react$38.useCallback(function(number, userTyping) {
			if (formatter) return formatter(number, {
				userTyping,
				input: String(inputValueRef.current)
			});
			var str = typeof number === "number" ? num2str(number) : number;
			if (!userTyping) {
				var mergedPrecision = getPrecision(str, userTyping);
				if (validateNumber(str) && (decimalSeparator || mergedPrecision >= 0)) {
					var separatorStr = decimalSeparator || ".";
					str = toFixed(str, separatorStr, mergedPrecision);
				}
			}
			return str;
		}, [
			formatter,
			getPrecision,
			decimalSeparator
		]);
		var _React$useState5 = import_react$38.useState(function() {
			var initValue = defaultValue !== null && defaultValue !== void 0 ? defaultValue : value;
			if (decimalValue.isInvalidate() && ["string", "number"].includes(_typeof(initValue))) return Number.isNaN(initValue) ? "" : initValue;
			return mergedFormatter(decimalValue.toString(), false);
		}), _React$useState6 = _slicedToArray(_React$useState5, 2), inputValue = _React$useState6[0], setInternalInputValue = _React$useState6[1];
		inputValueRef.current = inputValue;
		function setInputValue(newValue, userTyping) {
			setInternalInputValue(mergedFormatter(newValue.isInvalidate() ? newValue.toString(false) : newValue.toString(!userTyping), userTyping));
		}
		var maxDecimal = import_react$38.useMemo(function() {
			return getDecimalIfValidate(max);
		}, [max, precision]);
		var minDecimal = import_react$38.useMemo(function() {
			return getDecimalIfValidate(min);
		}, [min, precision]);
		var upDisabled = import_react$38.useMemo(function() {
			if (!maxDecimal || !decimalValue || decimalValue.isInvalidate()) return false;
			return maxDecimal.lessEquals(decimalValue);
		}, [maxDecimal, decimalValue]);
		var downDisabled = import_react$38.useMemo(function() {
			if (!minDecimal || !decimalValue || decimalValue.isInvalidate()) return false;
			return decimalValue.lessEquals(minDecimal);
		}, [minDecimal, decimalValue]);
		var _useCursor = useCursor(inputRef.current, focus), _useCursor2 = _slicedToArray(_useCursor, 2), recordCursor = _useCursor2[0], restoreCursor = _useCursor2[1];
		var getRangeValue = function getRangeValue$1(target) {
			if (maxDecimal && !target.lessEquals(maxDecimal)) return maxDecimal;
			if (minDecimal && !minDecimal.lessEquals(target)) return minDecimal;
			return null;
		};
		var isInRange = function isInRange$1(target) {
			return !getRangeValue(target);
		};
		var triggerValueUpdate = function triggerValueUpdate$1(newValue, userTyping) {
			var updateValue = newValue;
			var isRangeValidate = isInRange(updateValue) || updateValue.isEmpty();
			if (!updateValue.isEmpty() && !userTyping) {
				updateValue = getRangeValue(updateValue) || updateValue;
				isRangeValidate = true;
			}
			if (!readOnly && !disabled && isRangeValidate) {
				var numStr = updateValue.toString();
				var mergedPrecision = getPrecision(numStr, userTyping);
				if (mergedPrecision >= 0) {
					updateValue = es_default$5(toFixed(numStr, ".", mergedPrecision));
					if (!isInRange(updateValue)) updateValue = es_default$5(toFixed(numStr, ".", mergedPrecision, true));
				}
				if (!updateValue.equals(decimalValue)) {
					setUncontrolledDecimalValue(updateValue);
					onChange === null || onChange === void 0 || onChange(updateValue.isEmpty() ? null : getDecimalValue(stringMode, updateValue));
					if (value === void 0) setInputValue(updateValue, userTyping);
				}
				return updateValue;
			}
			return decimalValue;
		};
		var onNextPromise = useFrame_default();
		var collectInputValue = function collectInputValue$1(inputStr) {
			recordCursor();
			inputValueRef.current = inputStr;
			setInternalInputValue(inputStr);
			if (!compositionRef.current) {
				var finalValue = mergedParser(inputStr);
				var finalDecimal = es_default$5(finalValue);
				if (!finalDecimal.isNaN()) triggerValueUpdate(finalDecimal, true);
			}
			onInput === null || onInput === void 0 || onInput(inputStr);
			onNextPromise(function() {
				var nextInputStr = inputStr;
				if (!parser) nextInputStr = inputStr.replace(/。/g, ".");
				if (nextInputStr !== inputStr) collectInputValue$1(nextInputStr);
			});
		};
		var onCompositionStart = function onCompositionStart$1() {
			compositionRef.current = true;
		};
		var onCompositionEnd = function onCompositionEnd$1() {
			compositionRef.current = false;
			collectInputValue(inputRef.current.value);
		};
		var onInternalInput = function onInternalInput$1(e) {
			collectInputValue(e.target.value);
		};
		var onInternalStep = function onInternalStep$1(up) {
			var _inputRef$current;
			if (up && upDisabled || !up && downDisabled) return;
			userTypingRef.current = false;
			var stepDecimal = es_default$5(shiftKeyRef.current ? getDecupleSteps(step) : step);
			if (!up) stepDecimal = stepDecimal.negate();
			var target = (decimalValue || es_default$5(0)).add(stepDecimal.toString());
			var updatedValue = triggerValueUpdate(target, false);
			onStep === null || onStep === void 0 || onStep(getDecimalValue(stringMode, updatedValue), {
				offset: shiftKeyRef.current ? getDecupleSteps(step) : step,
				type: up ? "up" : "down"
			});
			(_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
		};
		var flushInputValue = function flushInputValue$1(userTyping) {
			var parsedValue = es_default$5(mergedParser(inputValue));
			var formatValue;
			if (!parsedValue.isNaN()) formatValue = triggerValueUpdate(parsedValue, userTyping);
			else formatValue = triggerValueUpdate(decimalValue, userTyping);
			if (value !== void 0) setInputValue(decimalValue, false);
			else if (!formatValue.isNaN()) setInputValue(formatValue, false);
		};
		var onBeforeInput = function onBeforeInput$1() {
			userTypingRef.current = true;
		};
		var onKeyDown = function onKeyDown$1(event) {
			var key = event.key, shiftKey = event.shiftKey;
			userTypingRef.current = true;
			shiftKeyRef.current = shiftKey;
			if (key === "Enter") {
				if (!compositionRef.current) userTypingRef.current = false;
				flushInputValue(false);
				onPressEnter === null || onPressEnter === void 0 || onPressEnter(event);
			}
			if (keyboard === false) return;
			if (!compositionRef.current && [
				"Up",
				"ArrowUp",
				"Down",
				"ArrowDown"
			].includes(key)) {
				onInternalStep(key === "Up" || key === "ArrowUp");
				event.preventDefault();
			}
		};
		var onKeyUp = function onKeyUp$1() {
			userTypingRef.current = false;
			shiftKeyRef.current = false;
		};
		import_react$38.useEffect(function() {
			if (changeOnWheel && focus) {
				var onWheel = function onWheel$1(event) {
					onInternalStep(event.deltaY < 0);
					event.preventDefault();
				};
				var input = inputRef.current;
				if (input) {
					input.addEventListener("wheel", onWheel, { passive: false });
					return function() {
						return input.removeEventListener("wheel", onWheel);
					};
				}
			}
		});
		var onBlur = function onBlur$1() {
			if (changeOnBlur) flushInputValue(false);
			setFocus(false);
			userTypingRef.current = false;
		};
		useLayoutUpdateEffect(function() {
			if (!decimalValue.isInvalidate()) setInputValue(decimalValue, false);
		}, [precision, formatter]);
		useLayoutUpdateEffect(function() {
			var newValue = es_default$5(value);
			setDecimalValue(newValue);
			var currentParsedValue = es_default$5(mergedParser(inputValue));
			if (!newValue.equals(currentParsedValue) || !userTypingRef.current || formatter) setInputValue(newValue, userTypingRef.current);
		}, [value]);
		useLayoutUpdateEffect(function() {
			if (formatter) restoreCursor();
		}, [inputValue]);
		return /* @__PURE__ */ import_react$38.createElement("div", {
			ref: domRef,
			className: (0, import_classnames$12.default)(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-focused"), focus), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-readonly"), readOnly), "".concat(prefixCls, "-not-a-number"), decimalValue.isNaN()), "".concat(prefixCls, "-out-of-range"), !decimalValue.isInvalidate() && !isInRange(decimalValue))),
			style,
			onFocus: function onFocus() {
				setFocus(true);
			},
			onBlur,
			onKeyDown,
			onKeyUp,
			onCompositionStart,
			onCompositionEnd,
			onBeforeInput
		}, controls && /* @__PURE__ */ import_react$38.createElement(StepHandler, {
			prefixCls,
			upNode: upHandler,
			downNode: downHandler,
			upDisabled,
			downDisabled,
			onStep: onInternalStep
		}), /* @__PURE__ */ import_react$38.createElement("div", { className: "".concat(inputClassName, "-wrap") }, /* @__PURE__ */ import_react$38.createElement("input", _extends({
			autoComplete: "off",
			role: "spinbutton",
			"aria-valuemin": min,
			"aria-valuemax": max,
			"aria-valuenow": decimalValue.isInvalidate() ? null : decimalValue.toString(),
			step
		}, inputProps, {
			ref: composeRef(inputRef, ref),
			className: inputClassName,
			value: inputValue,
			onChange: onInternalInput,
			disabled,
			readOnly
		}))));
	});
	InputNumber = /* @__PURE__ */ import_react$38.forwardRef(function(props, ref) {
		var disabled = props.disabled, style = props.style, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-input-number" : _props$prefixCls, value = props.value, prefix = props.prefix, suffix = props.suffix, addonBefore = props.addonBefore, addonAfter = props.addonAfter, className = props.className, classNames$13 = props.classNames, rest = _objectWithoutProperties(props, _excluded2$1);
		var holderRef = import_react$38.useRef(null);
		var inputNumberDomRef = import_react$38.useRef(null);
		var inputFocusRef = import_react$38.useRef(null);
		var focus = function focus$1(option) {
			if (inputFocusRef.current) triggerFocus(inputFocusRef.current, option);
		};
		import_react$38.useImperativeHandle(ref, function() {
			return proxyObject(inputFocusRef.current, {
				focus,
				nativeElement: holderRef.current.nativeElement || inputNumberDomRef.current
			});
		});
		return /* @__PURE__ */ import_react$38.createElement(BaseInput_default, {
			className,
			triggerFocus: focus,
			prefixCls,
			value,
			disabled,
			style,
			prefix,
			suffix,
			addonAfter,
			addonBefore,
			classNames: classNames$13,
			components: {
				affixWrapper: "div",
				groupWrapper: "div",
				wrapper: "div",
				groupAddon: "div"
			},
			ref: holderRef
		}, /* @__PURE__ */ import_react$38.createElement(InternalInputNumber, _extends({
			prefixCls,
			disabled,
			ref: inputFocusRef,
			domRef: inputNumberDomRef,
			className: classNames$13 === null || classNames$13 === void 0 ? void 0 : classNames$13.input
		}, rest)));
	});
	InputNumber_default = InputNumber;
}));
var es_exports$2 = {};
__export(es_exports$2, { default: () => es_default$4 });
var es_default$4;
var init_es$3 = __esmMin((() => {
	init_InputNumber();
	es_default$4 = InputNumber_default;
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
	var renderStep = function renderStep$1(item, index) {
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
	};
	return /* @__PURE__ */ import_react$36.createElement("div", _extends({
		className: classString,
		style
	}, restProps), items.filter(function(item) {
		return item;
	}).map(renderStep));
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
var es_exports$1 = {};
__export(es_exports$1, {
	Step: () => Step_default,
	default: () => es_default$3
});
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
	var Provider = function Provider$1(_ref) {
		var value = _ref.value, children = _ref.children;
		var valueRef = import_react$35.useRef(value);
		valueRef.current = value;
		var _React$useState = import_react$35.useState(function() {
			return {
				getValue: function getValue() {
					return valueRef.current;
				},
				listeners: /* @__PURE__ */ new Set()
			};
		}), _React$useState2 = _slicedToArray(_React$useState, 1), context = _React$useState2[0];
		useLayoutEffect_default(function() {
			(0, import_react_dom.unstable_batchedUpdates)(function() {
				context.listeners.forEach(function(listener) {
					listener(value);
				});
			});
		}, [value]);
		return /* @__PURE__ */ import_react$35.createElement(Context.Provider, { value: context }, children);
	};
	return {
		Context,
		Provider,
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
	var _React$useState3 = import_react$35.useState({}), _React$useState4 = _slicedToArray(_React$useState3, 2), forceUpdate = _React$useState4[1];
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
	import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
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
			var mark = useImmutableMark$2();
			if (mark !== null) return /* @__PURE__ */ import_react$34.createElement(Component, _extends({}, props, refProps));
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
}));
var _createImmutable$1, makeImmutable$1, responseImmutable$1, useImmutableMark$1;
var init_es$1 = __esmMin((() => {
	init_context$1();
	init_Immutable();
	_createImmutable$1 = createImmutable(), makeImmutable$1 = _createImmutable$1.makeImmutable, responseImmutable$1 = _createImmutable$1.responseImmutable, useImmutableMark$1 = _createImmutable$1.useImmutableMark;
}));
var _createImmutable, makeImmutable, responseImmutable, useImmutableMark, TableContext, TableContext_default;
var init_TableContext = __esmMin((() => {
	init_es$1();
	_createImmutable = createImmutable(), makeImmutable = _createImmutable.makeImmutable, responseImmutable = _createImmutable.responseImmutable, useImmutableMark = _createImmutable.useImmutableMark;
	TableContext = createContext();
	TableContext_default = TableContext;
}));
var import_react$33;
var init_useRenderTimes = __esmMin((() => {
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
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
	var mark = useImmutableMark();
	var retData = useMemo$1(function() {
		if (validateValue(children)) return [children];
		var path = dataIndex === null || dataIndex === void 0 || dataIndex === "" ? [] : Array.isArray(dataIndex) ? dataIndex : [dataIndex];
		var value = get(record, path);
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
		mark,
		record,
		children,
		dataIndex,
		render,
		renderIndex
	], function(prev, next) {
		if (shouldCellUpdate) {
			var _prev = _slicedToArray(prev, 2), prevRecord = _prev[1];
			var _next = _slicedToArray(next, 2), nextRecord = _next[1];
			return shouldCellUpdate(nextRecord, prevRecord);
		}
		if (perfRecord.renderWithProps) return true;
		return !isEqual_default(prev, next, true);
	});
	return retData;
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
		var hovering = inHoverRange(rowIndex, rowSpan || 1, ctx.hoverStartRow, ctx.hoverEndRow);
		return [hovering, ctx.onHover];
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
	var _useCellRender = useCellRender(record, dataIndex, renderIndex, children, render, shouldCellUpdate), _useCellRender2 = _slicedToArray(_useCellRender, 2), childNode = _useCellRender2[0], legacyCellProps = _useCellRender2[1];
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
	var _useHoverState = useHoverState(index, mergedRowSpan), _useHoverState2 = _slicedToArray(_useHoverState, 2), hovering = _useHoverState2[0], onHover = _useHoverState2[1];
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
	init_es$5();
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
		if (fixLeft !== void 0) {
			var prevFixLeft = prevColumn && prevColumn.fixed === "left";
			firstFixLeft = !prevFixLeft && canLastFix;
		} else if (fixRight !== void 0) {
			var nextFixRight = nextColumn && nextColumn.fixed === "right";
			lastFixRight = !nextFixRight && canLastFix;
		}
	} else if (fixLeft !== void 0) {
		var nextFixLeft = nextColumn && nextColumn.fixed === "left";
		lastFixLeft = !nextFixLeft && canLastFix;
	} else if (fixRight !== void 0) {
		var prevFixRight = prevColumn && prevColumn.fixed === "right";
		firstFixRight = !prevFixRight && canLastFix;
	}
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
	var lastIndex = index + colSpan - 1;
	var mergedColSpan = lastIndex + 1 === scrollColumnIndex ? colSpan + 1 : colSpan;
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
	var children = _ref.children;
	return children;
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
	var arr = import_react$25.useMemo(function() {
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
	return arr;
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
	init_es$5();
	import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
}));
function ExpandedRow(props) {
	var prefixCls = props.prefixCls, children = props.children, Component = props.component, cellComponent = props.cellComponent, className = props.className, expanded = props.expanded, colSpan = props.colSpan, isEmpty$1 = props.isEmpty, _props$stickyOffset = props.stickyOffset, stickyOffset = _props$stickyOffset === void 0 ? 0 : _props$stickyOffset;
	var _useContext = useContext(TableContext_default, [
		"scrollbarSize",
		"fixHeader",
		"fixColumn",
		"componentWidth",
		"horizonScroll"
	]), scrollbarSize = _useContext.scrollbarSize, fixHeader = _useContext.fixHeader, fixColumn = _useContext.fixColumn, componentWidth = _useContext.componentWidth, horizonScroll = _useContext.horizonScroll;
	var contentNode = children;
	if (isEmpty$1 ? horizonScroll && componentWidth : fixColumn) contentNode = /* @__PURE__ */ import_react$24.createElement("div", {
		style: {
			width: componentWidth - stickyOffset - (fixHeader && !isEmpty$1 ? scrollbarSize : 0),
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
	var onClick = function onClick$1(event) {
		onExpand(record, event);
		event.stopPropagation();
	};
	return /* @__PURE__ */ import_react$23.createElement("span", {
		className: (0, import_classnames$7.default)(expandClassName, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-row-expanded"), expanded), "".concat(prefixCls, "-row-collapsed"), !expanded)),
		onClick
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
	var _useContext = useContext(TableContext_default, ["tableLayout"]), tableLayout = _useContext.tableLayout;
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
		var colSpans = columns.filter(Boolean).map(function(column) {
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
		return colSpans;
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
			var rowNode = /* @__PURE__ */ import_react$14.createElement(HeaderRow_default, {
				key: rowIndex,
				flattenColumns,
				cells: row,
				stickyOffsets,
				rowComponent: trComponent,
				cellComponent: thComponent,
				onHeaderRow,
				index: rowIndex
			});
			return rowNode;
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
		var newColumns = columns || convertChildrenToColumns(children) || [];
		return filterHiddenColumns(newColumns.slice());
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
				var expanded = expandedKeys.has(rowKey);
				var recordExpandable = rowExpandable ? rowExpandable(record) : true;
				var icon = expandIcon({
					prefixCls,
					expanded,
					expandable: recordExpandable,
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
			var colFixed$1 = _ref3.fixed;
			return colFixed$1 === "right";
		});
		if (firstRightIndex >= 0) for (var _i2 = firstRightIndex; _i2 < flattenColumns.length; _i2 += 1) {
			var _colFixed2 = flattenColumns[_i2].fixed;
			if (_colFixed2 !== "right") return true;
		}
		return false;
	}, [flattenColumns]);
	var _useWidthColumns = useWidthColumns(flattenColumns, scrollWidth, clientWidth), _useWidthColumns2 = _slicedToArray(_useWidthColumns, 2), filledColumns = _useWidthColumns2[0], realScrollWidth = _useWidthColumns2[1];
	return [
		mergedColumns,
		filledColumns,
		realScrollWidth,
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
		if (props.expandable && props.internalHooks === INTERNAL_HOOKS && props.expandable.__PARENT_RENDER_ICON__ || mergedData.some(function(record) {
			return record && _typeof(record) === "object" && record[mergedChildrenColumnName];
		})) return "nest";
		return false;
	}, [!!expandedRowRender, mergedData]);
	var _React$useState = import_react$11.useState(function() {
		if (defaultExpandedRowKeys) return defaultExpandedRowKeys;
		if (defaultExpandAllRows) return findAllChildrenKeys(mergedData, getRowKey, mergedChildrenColumnName);
		return [];
	}), _React$useState2 = _slicedToArray(_React$useState, 2), innerExpandedKeys = _React$useState2[0], setInnerExpandedKeys = _React$useState2[1];
	var mergedExpandedKeys = import_react$11.useMemo(function() {
		return new Set(expandedRowKeys || innerExpandedKeys || []);
	}, [expandedRowKeys, innerExpandedKeys]);
	var onTriggerExpand = import_react$11.useCallback(function(record) {
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
	]);
	return [
		expandableConfig,
		expandableType,
		mergedExpandedKeys,
		mergedExpandIcon,
		mergedChildrenColumnName,
		onTriggerExpand
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
	var _useState = (0, import_react$10.useState)({}), _useState2 = _slicedToArray(_useState, 2), forceUpdate = _useState2[1];
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
	var _React$useState = import_react$9.useState(-1), _React$useState2 = _slicedToArray(_React$useState, 2), startRow = _React$useState2[0], setStartRow = _React$useState2[1];
	var _React$useState3 = import_react$9.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), endRow = _React$useState4[0], setEndRow = _React$useState4[1];
	var onHover = import_react$9.useCallback(function(start, end) {
		setStartRow(start);
		setEndRow(end);
	}, []);
	return [
		startRow,
		endRow,
		onHover
	];
}
var import_react$9;
var init_useHover = __esmMin((() => {
	init_slicedToArray();
	import_react$9 = /* @__PURE__ */ __toESM(require_react());
}));
function useSticky(sticky, prefixCls) {
	var _ref = _typeof(sticky) === "object" ? sticky : {}, _ref$offsetHeader = _ref.offsetHeader, offsetHeader = _ref$offsetHeader === void 0 ? 0 : _ref$offsetHeader, _ref$offsetSummary = _ref.offsetSummary, offsetSummary = _ref$offsetSummary === void 0 ? 0 : _ref$offsetSummary, _ref$offsetScroll = _ref.offsetScroll, offsetScroll = _ref$offsetScroll === void 0 ? 0 : _ref$offsetScroll, _ref$getContainer = _ref.getContainer, getContainer = _ref$getContainer === void 0 ? function() {
		return defaultContainer;
	} : _ref$getContainer;
	var container = getContainer() || defaultContainer;
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
	var stickyOffsets = (0, import_react$7.useMemo)(function() {
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
	return stickyOffsets;
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
	var element = getDOM(node);
	var box = element.getBoundingClientRect();
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
		var _useLayoutState = useLayoutState({
			scrollLeft: 0,
			isHiddenScrollBar: true
		}), _useLayoutState2 = _slicedToArray(_useLayoutState, 2), scrollState = _useLayoutState2[0], setScrollState = _useLayoutState2[1];
		var refState = import_react$5.useRef({
			delta: 0,
			x: 0
		});
		var _React$useState = import_react$5.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), isActive = _React$useState2[0], setActive = _React$useState2[1];
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
			var _ref2 = event || ((_window = window) === null || _window === void 0 ? void 0 : _window.event), buttons = _ref2.buttons;
			if (!isActive || buttons === 0) {
				if (isActive) setActive(false);
				return;
			}
			var left = refState.current.x + event.pageX - refState.current.x - refState.current.delta;
			var isRTL = direction === "rtl";
			left = Math.max(isRTL ? scrollBarWidth - bodyWidth : 0, Math.min(isRTL ? 0 : bodyWidth - scrollBarWidth, left));
			var shouldScroll = !isRTL || Math.abs(left) + Math.abs(scrollBarWidth) < bodyWidth;
			if (shouldScroll) {
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
			var key = record && record[rowKey];
			return key;
		};
	}, [rowKey]);
	var customizeScrollBody = getComponent(["body"]);
	var _useHover = useHover(), _useHover2 = _slicedToArray(_useHover, 3), startRow = _useHover2[0], endRow = _useHover2[1], onHover = _useHover2[2];
	var _useExpand = useExpand(props, mergedData, getRowKey), _useExpand2 = _slicedToArray(_useExpand, 6), expandableConfig = _useExpand2[0], expandableType = _useExpand2[1], mergedExpandedKeys = _useExpand2[2], mergedExpandIcon = _useExpand2[3], mergedChildrenColumnName = _useExpand2[4], onTriggerExpand = _useExpand2[5];
	var scrollX = scroll === null || scroll === void 0 ? void 0 : scroll.x;
	var _React$useState = import_react$4.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), componentWidth = _React$useState2[0], setComponentWidth = _React$useState2[1];
	var _useColumns = useColumns_default(_objectSpread2(_objectSpread2(_objectSpread2({}, props), expandableConfig), {}, {
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
	}), useInternalHooks ? transformColumns : null), _useColumns2 = _slicedToArray(_useColumns, 4), columns = _useColumns2[0], flattenColumns = _useColumns2[1], flattenScrollX = _useColumns2[2], hasGapFixed = _useColumns2[3];
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
	var _React$useState3 = import_react$4.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), pingedLeft = _React$useState4[0], setPingedLeft = _React$useState4[1];
	var _React$useState5 = import_react$4.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), pingedRight = _React$useState6[0], setPingedRight = _React$useState6[1];
	var _React$useState7 = import_react$4.useState(/* @__PURE__ */ new Map()), _React$useState8 = _slicedToArray(_React$useState7, 2), colsWidths = _React$useState8[0], updateColsWidths = _React$useState8[1];
	var colsKeys = getColumnsKey(flattenColumns);
	var pureColWidths = colsKeys.map(function(columnKey) {
		return colsWidths.get(columnKey);
	});
	var colWidths = import_react$4.useMemo(function() {
		return pureColWidths;
	}, [pureColWidths.join("_")]);
	var stickyOffsets = useStickyOffsets_default(colWidths, flattenColumns, direction);
	var fixHeader = scroll && validateValue(scroll.y);
	var horizonScroll = scroll && validateValue(mergedScrollX) || Boolean(expandableConfig.fixed);
	var fixColumn = horizonScroll && flattenColumns.some(function(_ref) {
		var fixed = _ref.fixed;
		return fixed;
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
	var _useTimeoutLock = useTimeoutLock(null), _useTimeoutLock2 = _slicedToArray(_useTimeoutLock, 2), setScrollTarget = _useTimeoutLock2[0], getScrollTarget = _useTimeoutLock2[1];
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
	var _React$useState9 = import_react$4.useState(0), _React$useState10 = _slicedToArray(_React$useState9, 2), scrollbarSize = _React$useState10[0], setScrollbarSize = _React$useState10[1];
	var _React$useState11 = import_react$4.useState(true), _React$useState12 = _slicedToArray(_React$useState11, 2), supportSticky = _React$useState12[0], setSupportSticky = _React$useState12[1];
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
			var ellipsis = _ref4.ellipsis;
			return ellipsis;
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
			var width = _ref5.width;
			return width;
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
	var mergedColSpan = colSpan || 1;
	return columnsOffset[colIndex + mergedColSpan] - (columnsOffset[colIndex] || 0);
}
function VirtualCell(props) {
	var rowInfo = props.rowInfo, column = props.column, colIndex = props.colIndex, indent = props.indent, index = props.index, component = props.component, renderIndex = props.renderIndex, record = props.record, style = props.style, className = props.className, inverse = props.inverse, getHeight = props.getHeight;
	var render = column.render, dataIndex = column.dataIndex, columnClassName = column.className, colWidth = column.width;
	var _useContext = useContext(GridContext, ["columnsOffset"]), columnsOffset = _useContext.columnsOffset;
	var _getCellProps = getCellProps(rowInfo, column, colIndex, indent, index), key = _getCellProps.key, fixedInfo = _getCellProps.fixedInfo, appendCellNode = _getCellProps.appendCellNode, additionalCellProps = _getCellProps.additionalCellProps;
	var cellStyle = additionalCellProps.style, _additionalCellProps$ = additionalCellProps.colSpan, colSpan = _additionalCellProps$ === void 0 ? 1 : _additionalCellProps$, _additionalCellProps$2 = additionalCellProps.rowSpan, rowSpan = _additionalCellProps$2 === void 0 ? 1 : _additionalCellProps$2;
	var startColIndex = colIndex - 1;
	var concatColWidth = getColumnWidth(startColIndex, colSpan, columnsOffset);
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
var import_classnames$1, import_react$2, _excluded, BodyLine, ResponseBodyLine, BodyLine_default;
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
	BodyLine = /* @__PURE__ */ import_react$2.forwardRef(function(props, ref) {
		var data = props.data, index = props.index, className = props.className, rowKey = props.rowKey, style = props.style, extra = props.extra, getHeight = props.getHeight, restProps = _objectWithoutProperties(props, _excluded);
		var record = data.record, indent = data.indent, renderIndex = data.index;
		var _useContext = useContext(TableContext_default, [
			"prefixCls",
			"flattenColumns",
			"fixColumn",
			"componentWidth",
			"scrollX"
		]), scrollX = _useContext.scrollX, flattenColumns = _useContext.flattenColumns, prefixCls = _useContext.prefixCls, fixColumn = _useContext.fixColumn, componentWidth = _useContext.componentWidth;
		var _useContext2 = useContext(StaticContext, ["getComponent"]), getComponent = _useContext2.getComponent;
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
	});
	ResponseBodyLine = responseImmutable(BodyLine);
	BodyLine_default = ResponseBodyLine;
}));
var import_react$1, Grid, ResponseGrid, BodyGrid_default;
var init_BodyGrid = __esmMin((() => {
	init_typeof();
	init_slicedToArray();
	init_es$1();
	init_es$8();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_TableContext();
	init_useFlattenRecords();
	init_BodyLine();
	init_context();
	Grid = /* @__PURE__ */ import_react$1.forwardRef(function(props, ref) {
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
			var start = info.start, end = info.end, getSize = info.getSize, offsetY = info.offsetY;
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
				var item = flattenData[_i2$1];
				if (!item) return 1;
				if (flattenColumns.some(function(column) {
					return getRowSpan(column, _i2$1) > 1;
				})) spanLines.push(_i2$1);
			};
			for (var _i2 = startIndex; _i2 <= endIndex; _i2 += 1) if (_loop3(_i2)) continue;
			var nodes = spanLines.map(function(index) {
				var item = flattenData[index];
				var rowKey = getRowKey(item.record, index);
				var getHeight = function getHeight$1(rowSpan) {
					var endItemIndex = index + rowSpan - 1;
					var endItemKey = getRowKey(flattenData[endItemIndex].record, endItemIndex);
					var sizeInfo$1 = getSize(rowKey, endItemKey);
					return sizeInfo$1.bottom - sizeInfo$1.top;
				};
				var sizeInfo = getSize(rowKey);
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
			return nodes;
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
	});
	ResponseGrid = responseImmutable(Grid);
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
	init_es$5();
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
var es_exports = {};
__export(es_exports, {
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
});
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
export { es_exports as b, init_es as c, genVirtualTable as d, genTable as e, convertChildrenToColumns as f, init_useColumns as g, INTERNAL_COL_DEFINE as h, FooterComponents as i, EXPAND_COLUMN as j, INTERNAL_HOOKS as k, es_default$3 as l, es_exports$1 as m, init_es$2 as n, es_default$4 as o, es_exports$2 as p, init_es$3 as q };
