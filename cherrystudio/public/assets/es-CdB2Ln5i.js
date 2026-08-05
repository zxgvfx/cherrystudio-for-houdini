import { a as __toESM, n as __esmMin, r as __export, t as __commonJSMin } from "./chunk-BilcBJ05.js";
import { Ai as init_useMergedState, Ca as init_canUseDom, Co as init_typeof, Da as raf_default, Ea as init_raf, Eo as require_classnames, Fi as useEvent, Ir as getScrollBarSize, Ja as init_createClass, Lr as getTargetScrollBarSize, Ma as es_default$2, Oa as _toConsumableArray, Pa as init_es$7, Pi as init_useEvent, Qr as omit, Rr as init_getScrollBarSize, Sa as canUseDom, Sn as init_addEventListener, So as _typeof, Ta as init_slicedToArray, To as init_extends, Un as init_es$10, Vn as es_default$7, Xa as init_classCallCheck, Xi as init_get, Xr as isVisible_default, Ya as _classCallCheck, Yi as get, Yn as es_default$6, Yr as init_isVisible, Zn as init_es$9, Zr as init_omit, _a as init_objectWithoutProperties, _o as init_warning, _r as isMobile_default, ai as KeyCode_default, ao as useComposeRef, bo as init_toArray, ca as useLayoutEffect_default, ci as pickAttrs, do as init_findDOMNode, eo as fillRef, fo as require_react_dom, fr as es_default$10, ga as _objectWithoutProperties, go as init_defineProperty, gr as init_isMobile, ha as isEqual_default, ho as _defineProperty, hr as init_es$8, io as supportRef, ji as useMergedState, ka as init_toConsumableArray, ki as init_es$6, la as useLayoutUpdateEffect, ma as init_isEqual, mo as init_objectSpread2, mr as es_default$9, no as init_ref, oi as init_KeyCode, oo as init_useMemo, po as _objectSpread2, pr as init_es$5, qa as _createClass, qn as MenuItem_default, sa as init_useLayoutEffect, si as init_pickAttrs, so as useMemo$1, uo as getDOM, wa as _slicedToArray, wo as _extends, xi as init_es$11, xn as addEventListenerWrap, xo as toArray, yi as es_default$5, yo as warning_default } from "./es-CLFTGHaZ.js";
import { t as require_react } from "./react-CySG9LcS.js";
import { Ct as es_default$1, Dt as init_styleChecker, Ot as isStyleSupport, wt as init_es$12 } from "./Component-BRH6-HJR.js";
var require_weekday = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekday = t();
	})(exports, (function() {
		"use strict";
		return function(e, t) {
			t.prototype.weekday = function(e$1) {
				var t$1 = this.$locale().weekStart || 0, i = this.$W, n = (i < t$1 ? i + 7 : i) - t$1;
				return this.$utils().u(e$1) ? n : this.subtract(n, "day").add(e$1, "day");
			};
		};
	}));
}));
var require_localeData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(n, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (n = "undefined" != typeof globalThis ? globalThis : n || self).dayjs_plugin_localeData = e();
	})(exports, (function() {
		"use strict";
		return function(n, e, t) {
			var r = e.prototype, o = function(n$1) {
				return n$1 && (n$1.indexOf ? n$1 : n$1.s);
			}, u = function(n$1, e$1, t$1, r$1, u$1) {
				var i$1 = n$1.name ? n$1 : n$1.$locale(), a$1 = o(i$1[e$1]), s$1 = o(i$1[t$1]), f = a$1 || s$1.map((function(n$2) {
					return n$2.slice(0, r$1);
				}));
				if (!u$1) return f;
				var d = i$1.weekStart;
				return f.map((function(n$2, e$2) {
					return f[(e$2 + (d || 0)) % 7];
				}));
			}, i = function() {
				return t.Ls[t.locale()];
			}, a = function(n$1, e$1) {
				return n$1.formats[e$1] || function(n$2) {
					return n$2.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(n$3, e$2, t$1) {
						return e$2 || t$1.slice(1);
					}));
				}(n$1.formats[e$1.toUpperCase()]);
			}, s = function() {
				var n$1 = this;
				return {
					months: function(e$1) {
						return e$1 ? e$1.format("MMMM") : u(n$1, "months");
					},
					monthsShort: function(e$1) {
						return e$1 ? e$1.format("MMM") : u(n$1, "monthsShort", "months", 3);
					},
					firstDayOfWeek: function() {
						return n$1.$locale().weekStart || 0;
					},
					weekdays: function(e$1) {
						return e$1 ? e$1.format("dddd") : u(n$1, "weekdays");
					},
					weekdaysMin: function(e$1) {
						return e$1 ? e$1.format("dd") : u(n$1, "weekdaysMin", "weekdays", 2);
					},
					weekdaysShort: function(e$1) {
						return e$1 ? e$1.format("ddd") : u(n$1, "weekdaysShort", "weekdays", 3);
					},
					longDateFormat: function(e$1) {
						return a(n$1.$locale(), e$1);
					},
					meridiem: this.$locale().meridiem,
					ordinal: this.$locale().ordinal
				};
			};
			r.localeData = function() {
				return s.bind(this)();
			}, t.localeData = function() {
				var n$1 = i();
				return {
					firstDayOfWeek: function() {
						return n$1.weekStart || 0;
					},
					weekdays: function() {
						return t.weekdays();
					},
					weekdaysShort: function() {
						return t.weekdaysShort();
					},
					weekdaysMin: function() {
						return t.weekdaysMin();
					},
					months: function() {
						return t.months();
					},
					monthsShort: function() {
						return t.monthsShort();
					},
					longDateFormat: function(e$1) {
						return a(n$1, e$1);
					},
					meridiem: n$1.meridiem,
					ordinal: n$1.ordinal
				};
			}, t.months = function() {
				return u(i(), "months");
			}, t.monthsShort = function() {
				return u(i(), "monthsShort", "months", 3);
			}, t.weekdays = function(n$1) {
				return u(i(), "weekdays", null, null, n$1);
			}, t.weekdaysShort = function(n$1) {
				return u(i(), "weekdaysShort", "weekdays", 3, n$1);
			}, t.weekdaysMin = function(n$1) {
				return u(i(), "weekdaysMin", "weekdays", 2, n$1);
			};
		};
	}));
}));
var require_weekOfYear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekOfYear = t();
	})(exports, (function() {
		"use strict";
		var e = "week", t = "year";
		return function(i, n, r) {
			var f = n.prototype;
			f.week = function(i$1) {
				if (void 0 === i$1 && (i$1 = null), null !== i$1) return this.add(7 * (i$1 - this.week()), "day");
				var n$1 = this.$locale().yearStart || 1;
				if (11 === this.month() && this.date() > 25) {
					var f$1 = r(this).startOf(t).add(1, t).date(n$1), s = r(this).endOf(e);
					if (f$1.isBefore(s)) return 1;
				}
				var a = r(this).startOf(t).date(n$1).startOf(e).subtract(1, "millisecond"), o = this.diff(a, e, !0);
				return o < 0 ? r(this).startOf("week").week() : Math.ceil(o);
			}, f.weeks = function(e$1) {
				return void 0 === e$1 && (e$1 = null), this.week(e$1);
			};
		};
	}));
}));
var require_weekYear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_weekYear = t();
	})(exports, (function() {
		"use strict";
		return function(e, t) {
			t.prototype.weekYear = function() {
				var e$1 = this.month(), t$1 = this.week(), n = this.year();
				return 1 === t$1 && 11 === e$1 ? n + 1 : 0 === e$1 && t$1 >= 52 ? n - 1 : n;
			};
		};
	}));
}));
function getRealPlacement(placement, rtl) {
	if (placement !== void 0) return placement;
	return rtl ? "bottomRight" : "bottomLeft";
}
var init_uiUtil = __esmMin((() => {}));
var import_react$102, PickerContext, context_default;
var init_context$3 = __esmMin((() => {
	import_react$102 = /* @__PURE__ */ __toESM(require_react());
	PickerContext = /* @__PURE__ */ import_react$102.createContext(null);
	context_default = PickerContext;
}));
function PickerTrigger(_ref) {
	var popupElement = _ref.popupElement, popupStyle = _ref.popupStyle, popupClassName = _ref.popupClassName, popupAlign = _ref.popupAlign, transitionName = _ref.transitionName, getPopupContainer = _ref.getPopupContainer, children = _ref.children, range = _ref.range, placement = _ref.placement, _ref$builtinPlacement = _ref.builtinPlacements, builtinPlacements = _ref$builtinPlacement === void 0 ? BUILT_IN_PLACEMENTS : _ref$builtinPlacement, direction = _ref.direction, visible = _ref.visible, onClose = _ref.onClose;
	var prefixCls = import_react$101.useContext(context_default).prefixCls;
	var dropdownPrefixCls = "".concat(prefixCls, "-dropdown");
	var realPlacement = getRealPlacement(placement, direction === "rtl");
	return /* @__PURE__ */ import_react$101.createElement(es_default$10, {
		showAction: [],
		hideAction: ["click"],
		popupPlacement: realPlacement,
		builtinPlacements,
		prefixCls: dropdownPrefixCls,
		popupTransitionName: transitionName,
		popup: popupElement,
		popupAlign,
		popupVisible: visible,
		popupClassName: (0, import_classnames$31.default)(popupClassName, _defineProperty(_defineProperty({}, "".concat(dropdownPrefixCls, "-range"), range), "".concat(dropdownPrefixCls, "-rtl"), direction === "rtl")),
		popupStyle,
		stretch: "minWidth",
		getPopupContainer,
		onPopupVisibleChange: function onPopupVisibleChange(nextVisible) {
			if (!nextVisible) onClose();
		}
	}, children);
}
var import_classnames$31, import_react$101, BUILT_IN_PLACEMENTS, PickerTrigger_default;
var init_PickerTrigger = __esmMin((() => {
	init_defineProperty();
	init_es$5();
	import_classnames$31 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$101 = /* @__PURE__ */ __toESM(require_react());
	init_uiUtil();
	init_context$3();
	BUILT_IN_PLACEMENTS = {
		bottomLeft: {
			points: ["tl", "bl"],
			offset: [0, 4],
			overflow: {
				adjustX: 1,
				adjustY: 1
			}
		},
		bottomRight: {
			points: ["tr", "br"],
			offset: [0, 4],
			overflow: {
				adjustX: 1,
				adjustY: 1
			}
		},
		topLeft: {
			points: ["bl", "tl"],
			offset: [0, -4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		},
		topRight: {
			points: ["br", "tr"],
			offset: [0, -4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		}
	};
	PickerTrigger_default = PickerTrigger;
}));
function leftPad(str, length) {
	var fill = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
	var current = String(str);
	while (current.length < length) current = "".concat(fill).concat(current);
	return current;
}
function toArray$2(val) {
	if (val === null || val === void 0) return [];
	return Array.isArray(val) ? val : [val];
}
function fillIndex(ori, index, value) {
	var clone = _toConsumableArray(ori);
	clone[index] = value;
	return clone;
}
function pickProps(props, keys) {
	var clone = {};
	(keys || Object.keys(props)).forEach(function(key) {
		if (props[key] !== void 0) clone[key] = props[key];
	});
	return clone;
}
function getRowFormat(picker, locale, format) {
	if (format) return format;
	switch (picker) {
		case "time": return locale.fieldTimeFormat;
		case "datetime": return locale.fieldDateTimeFormat;
		case "month": return locale.fieldMonthFormat;
		case "year": return locale.fieldYearFormat;
		case "quarter": return locale.fieldQuarterFormat;
		case "week": return locale.fieldWeekFormat;
		default: return locale.fieldDateFormat;
	}
}
function getFromDate(calendarValues, activeIndexList, activeIndex) {
	var mergedActiveIndex = activeIndex !== void 0 ? activeIndex : activeIndexList[activeIndexList.length - 1];
	var firstValuedIndex = activeIndexList.find(function(index) {
		return calendarValues[index];
	});
	return mergedActiveIndex !== firstValuedIndex ? calendarValues[firstValuedIndex] : void 0;
}
var init_miscUtil = __esmMin((() => {
	init_toConsumableArray();
}));
function pickTriggerProps(props) {
	return pickProps(props, [
		"placement",
		"builtinPlacements",
		"popupAlign",
		"getPopupContainer",
		"transitionName",
		"direction"
	]);
}
var init_util$3 = __esmMin((() => {
	init_miscUtil();
}));
function useCellRender$1(cellRender, dateRender, monthCellRender, range) {
	var mergedCellRender = import_react$100.useMemo(function() {
		if (cellRender) return cellRender;
		return function(current, info) {
			var date = current;
			if (dateRender && info.type === "date") return dateRender(date, info.today);
			if (monthCellRender && info.type === "month") return monthCellRender(date, info.locale);
			return info.originNode;
		};
	}, [
		cellRender,
		monthCellRender,
		dateRender
	]);
	return import_react$100.useCallback(function(date, info) {
		return mergedCellRender(date, _objectSpread2(_objectSpread2({}, info), {}, { range }));
	}, [mergedCellRender, range]);
}
var import_react$100;
var init_useCellRender$1 = __esmMin((() => {
	init_objectSpread2();
	init_es$6();
	import_react$100 = /* @__PURE__ */ __toESM(require_react());
}));
function useFieldsInvalidate(calendarValue, isInvalidateDate) {
	var allowEmpty = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
	var _React$useState2 = _slicedToArray(import_react$99.useState([false, false]), 2), fieldsInvalidates = _React$useState2[0], setFieldsInvalidates = _React$useState2[1];
	return [import_react$99.useMemo(function() {
		return fieldsInvalidates.map(function(invalid, index) {
			if (invalid) return true;
			var current = calendarValue[index];
			if (!current) return false;
			if (!allowEmpty[index] && !current) return true;
			if (current && isInvalidateDate(current, { activeIndex: index })) return true;
			return false;
		});
	}, [
		calendarValue,
		fieldsInvalidates,
		isInvalidateDate,
		allowEmpty
	]), function onSelectorInvalid(invalid, index) {
		setFieldsInvalidates(function(ori) {
			return fillIndex(ori, index, invalid);
		});
	}];
}
var import_react$99;
var init_useFieldsInvalidate = __esmMin((() => {
	init_slicedToArray();
	init_miscUtil();
	import_react$99 = /* @__PURE__ */ __toESM(require_react());
}));
function fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem) {
	var timeFormat = "";
	var cells = [];
	if (showHour) cells.push(showMeridiem ? "hh" : "HH");
	if (showMinute) cells.push("mm");
	if (showSecond) cells.push("ss");
	timeFormat = cells.join(":");
	if (showMillisecond) timeFormat += ".SSS";
	if (showMeridiem) timeFormat += " A";
	return timeFormat;
}
function fillLocale(locale, showHour, showMinute, showSecond, showMillisecond, use12Hours) {
	var fieldDateTimeFormat = locale.fieldDateTimeFormat, fieldDateFormat = locale.fieldDateFormat, fieldTimeFormat = locale.fieldTimeFormat, fieldMonthFormat = locale.fieldMonthFormat, fieldYearFormat = locale.fieldYearFormat, fieldWeekFormat = locale.fieldWeekFormat, fieldQuarterFormat = locale.fieldQuarterFormat, yearFormat = locale.yearFormat, cellYearFormat = locale.cellYearFormat, cellQuarterFormat = locale.cellQuarterFormat, dayFormat = locale.dayFormat, cellDateFormat = locale.cellDateFormat;
	var timeFormat = fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, use12Hours);
	return _objectSpread2(_objectSpread2({}, locale), {}, {
		fieldDateTimeFormat: fieldDateTimeFormat || "YYYY-MM-DD ".concat(timeFormat),
		fieldDateFormat: fieldDateFormat || "YYYY-MM-DD",
		fieldTimeFormat: fieldTimeFormat || timeFormat,
		fieldMonthFormat: fieldMonthFormat || "YYYY-MM",
		fieldYearFormat: fieldYearFormat || "YYYY",
		fieldWeekFormat: fieldWeekFormat || "gggg-wo",
		fieldQuarterFormat: fieldQuarterFormat || "YYYY-[Q]Q",
		yearFormat: yearFormat || "YYYY",
		cellYearFormat: cellYearFormat || "YYYY",
		cellQuarterFormat: cellQuarterFormat || "[Q]Q",
		cellDateFormat: cellDateFormat || dayFormat || "D"
	});
}
function useLocale(locale, showProps) {
	var showHour = showProps.showHour, showMinute = showProps.showMinute, showSecond = showProps.showSecond, showMillisecond = showProps.showMillisecond, use12Hours = showProps.use12Hours;
	return import_react$98.useMemo(function() {
		return fillLocale(locale, showHour, showMinute, showSecond, showMillisecond, use12Hours);
	}, [
		locale,
		showHour,
		showMinute,
		showSecond,
		showMillisecond,
		use12Hours
	]);
}
var import_react$98;
var init_useLocale = __esmMin((() => {
	init_objectSpread2();
	import_react$98 = /* @__PURE__ */ __toESM(require_react());
}));
function checkShow(format, keywords, show) {
	return show !== null && show !== void 0 ? show : keywords.some(function(keyword) {
		return format.includes(keyword);
	});
}
function pickTimeProps(props) {
	var timeProps = pickProps(props, showTimeKeys);
	var format = props.format, picker = props.picker;
	var propFormat = null;
	if (format) {
		propFormat = format;
		if (Array.isArray(propFormat)) propFormat = propFormat[0];
		propFormat = _typeof(propFormat) === "object" ? propFormat.format : propFormat;
	}
	if (picker === "time") timeProps.format = propFormat;
	return [timeProps, propFormat];
}
function isStringFormat(format) {
	return format && typeof format === "string";
}
function existShowConfig(showHour, showMinute, showSecond, showMillisecond) {
	return [
		showHour,
		showMinute,
		showSecond,
		showMillisecond
	].some(function(show) {
		return show !== void 0;
	});
}
function fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond) {
	var parsedShowHour = showHour;
	var parsedShowMinute = showMinute;
	var parsedShowSecond = showSecond;
	if (!hasShowConfig && !parsedShowHour && !parsedShowMinute && !parsedShowSecond && !showMillisecond) {
		parsedShowHour = true;
		parsedShowMinute = true;
		parsedShowSecond = true;
	} else if (hasShowConfig) {
		var _parsedShowHour, _parsedShowMinute, _parsedShowSecond;
		var existFalse = [
			parsedShowHour,
			parsedShowMinute,
			parsedShowSecond
		].some(function(show) {
			return show === false;
		});
		var existTrue = [
			parsedShowHour,
			parsedShowMinute,
			parsedShowSecond
		].some(function(show) {
			return show === true;
		});
		var defaultShow = existFalse ? true : !existTrue;
		parsedShowHour = (_parsedShowHour = parsedShowHour) !== null && _parsedShowHour !== void 0 ? _parsedShowHour : defaultShow;
		parsedShowMinute = (_parsedShowMinute = parsedShowMinute) !== null && _parsedShowMinute !== void 0 ? _parsedShowMinute : defaultShow;
		parsedShowSecond = (_parsedShowSecond = parsedShowSecond) !== null && _parsedShowSecond !== void 0 ? _parsedShowSecond : defaultShow;
	}
	return [
		parsedShowHour,
		parsedShowMinute,
		parsedShowSecond,
		showMillisecond
	];
}
function getTimeProps(componentProps) {
	var showTime = componentProps.showTime;
	var _pickTimeProps2 = _slicedToArray(pickTimeProps(componentProps), 2), pickedProps = _pickTimeProps2[0], propFormat = _pickTimeProps2[1];
	var showTimeConfig = showTime && _typeof(showTime) === "object" ? showTime : {};
	var timeConfig = _objectSpread2(_objectSpread2({ defaultOpenValue: showTimeConfig.defaultOpenValue || showTimeConfig.defaultValue }, pickedProps), showTimeConfig);
	var showMillisecond = timeConfig.showMillisecond;
	var showHour = timeConfig.showHour, showMinute = timeConfig.showMinute, showSecond = timeConfig.showSecond;
	var _fillShowConfig2 = _slicedToArray(fillShowConfig(existShowConfig(showHour, showMinute, showSecond, showMillisecond), showHour, showMinute, showSecond, showMillisecond), 3);
	showHour = _fillShowConfig2[0];
	showMinute = _fillShowConfig2[1];
	showSecond = _fillShowConfig2[2];
	return [
		timeConfig,
		_objectSpread2(_objectSpread2({}, timeConfig), {}, {
			showHour,
			showMinute,
			showSecond,
			showMillisecond
		}),
		timeConfig.format,
		propFormat
	];
}
function fillShowTimeConfig(picker, showTimeFormat, propFormat, timeConfig, locale) {
	if (picker === "datetime" || picker === "time") {
		var pickedProps = timeConfig;
		var baselineFormat = getRowFormat(picker, locale, null);
		var formatList = [showTimeFormat, propFormat];
		for (var i = 0; i < formatList.length; i += 1) {
			var format = toArray$2(formatList[i])[0];
			if (isStringFormat(format)) {
				baselineFormat = format;
				break;
			}
		}
		var showHour = pickedProps.showHour, showMinute = pickedProps.showMinute, showSecond = pickedProps.showSecond, showMillisecond = pickedProps.showMillisecond;
		var use12Hours = pickedProps.use12Hours;
		var showMeridiem = checkShow(baselineFormat, [
			"a",
			"A",
			"LT",
			"LLL",
			"LTS"
		], use12Hours);
		var hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
		if (!hasShowConfig) {
			showHour = checkShow(baselineFormat, [
				"H",
				"h",
				"k",
				"LT",
				"LLL"
			]);
			showMinute = checkShow(baselineFormat, [
				"m",
				"LT",
				"LLL"
			]);
			showSecond = checkShow(baselineFormat, ["s", "LTS"]);
			showMillisecond = checkShow(baselineFormat, ["SSS"]);
		}
		var _fillShowConfig4 = _slicedToArray(fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond), 3);
		showHour = _fillShowConfig4[0];
		showMinute = _fillShowConfig4[1];
		showSecond = _fillShowConfig4[2];
		var timeFormat = showTimeFormat || fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem);
		return _objectSpread2(_objectSpread2({}, pickedProps), {}, {
			format: timeFormat,
			showHour,
			showMinute,
			showSecond,
			showMillisecond,
			use12Hours: showMeridiem
		});
	}
	return null;
}
var showTimeKeys;
var init_useTimeConfig = __esmMin((() => {
	init_objectSpread2();
	init_slicedToArray();
	init_typeof();
	init_miscUtil();
	init_useLocale();
	showTimeKeys = [
		"showNow",
		"showHour",
		"showMinute",
		"showSecond",
		"showMillisecond",
		"use12Hours",
		"hourStep",
		"minuteStep",
		"secondStep",
		"millisecondStep",
		"hideDisabledOptions",
		"defaultValue",
		"disabledHours",
		"disabledMinutes",
		"disabledSeconds",
		"disabledMilliseconds",
		"disabledTime",
		"changeOnScroll",
		"defaultOpenValue"
	];
}));
function fillClearIcon(prefixCls, allowClear, clearIcon) {
	if (allowClear === false) return null;
	return (allowClear && _typeof(allowClear) === "object" ? allowClear : {}).clearIcon || clearIcon || /* @__PURE__ */ import_react$97.createElement("span", { className: "".concat(prefixCls, "-clear-btn") });
}
var import_react$97;
var init_useClearIcon = __esmMin((() => {
	init_typeof();
	init_warning();
	import_react$97 = /* @__PURE__ */ __toESM(require_react());
}));
function nullableCompare(value1, value2, oriCompareFn) {
	if (!value1 && !value2 || value1 === value2) return true;
	if (!value1 || !value2) return false;
	return oriCompareFn();
}
function isSameDecade(generateConfig, decade1, decade2) {
	return nullableCompare(decade1, decade2, function() {
		return Math.floor(generateConfig.getYear(decade1) / 10) === Math.floor(generateConfig.getYear(decade2) / 10);
	});
}
function isSameYear(generateConfig, year1, year2) {
	return nullableCompare(year1, year2, function() {
		return generateConfig.getYear(year1) === generateConfig.getYear(year2);
	});
}
function getQuarter(generateConfig, date) {
	return Math.floor(generateConfig.getMonth(date) / 3) + 1;
}
function isSameQuarter(generateConfig, quarter1, quarter2) {
	return nullableCompare(quarter1, quarter2, function() {
		return isSameYear(generateConfig, quarter1, quarter2) && getQuarter(generateConfig, quarter1) === getQuarter(generateConfig, quarter2);
	});
}
function isSameMonth(generateConfig, month1, month2) {
	return nullableCompare(month1, month2, function() {
		return isSameYear(generateConfig, month1, month2) && generateConfig.getMonth(month1) === generateConfig.getMonth(month2);
	});
}
function isSameDate(generateConfig, date1, date2) {
	return nullableCompare(date1, date2, function() {
		return isSameYear(generateConfig, date1, date2) && isSameMonth(generateConfig, date1, date2) && generateConfig.getDate(date1) === generateConfig.getDate(date2);
	});
}
function isSameTime(generateConfig, time1, time2) {
	return nullableCompare(time1, time2, function() {
		return generateConfig.getHour(time1) === generateConfig.getHour(time2) && generateConfig.getMinute(time1) === generateConfig.getMinute(time2) && generateConfig.getSecond(time1) === generateConfig.getSecond(time2);
	});
}
function isSameTimestamp(generateConfig, time1, time2) {
	return nullableCompare(time1, time2, function() {
		return isSameDate(generateConfig, time1, time2) && isSameTime(generateConfig, time1, time2) && generateConfig.getMillisecond(time1) === generateConfig.getMillisecond(time2);
	});
}
function isSameWeek(generateConfig, locale, date1, date2) {
	return nullableCompare(date1, date2, function() {
		return isSameYear(generateConfig, generateConfig.locale.getWeekFirstDate(locale, date1), generateConfig.locale.getWeekFirstDate(locale, date2)) && generateConfig.locale.getWeek(locale, date1) === generateConfig.locale.getWeek(locale, date2);
	});
}
function isSame(generateConfig, locale, source, target, type) {
	switch (type) {
		case "date": return isSameDate(generateConfig, source, target);
		case "week": return isSameWeek(generateConfig, locale.locale, source, target);
		case "month": return isSameMonth(generateConfig, source, target);
		case "quarter": return isSameQuarter(generateConfig, source, target);
		case "year": return isSameYear(generateConfig, source, target);
		case "decade": return isSameDecade(generateConfig, source, target);
		case "time": return isSameTime(generateConfig, source, target);
		default: return isSameTimestamp(generateConfig, source, target);
	}
}
function isInRange(generateConfig, startDate, endDate, current) {
	if (!startDate || !endDate || !current) return false;
	return generateConfig.isAfter(current, startDate) && generateConfig.isAfter(endDate, current);
}
function isSameOrAfter(generateConfig, locale, date1, date2, type) {
	if (isSame(generateConfig, locale, date1, date2, type)) return true;
	return generateConfig.isAfter(date1, date2);
}
function getWeekStartDate(locale, generateConfig, value) {
	var weekFirstDay = generateConfig.locale.getWeekFirstDay(locale);
	var monthStartDate = generateConfig.setDate(value, 1);
	var startDateWeekDay = generateConfig.getWeekDay(monthStartDate);
	var alignStartDate = generateConfig.addDate(monthStartDate, weekFirstDay - startDateWeekDay);
	if (generateConfig.getMonth(alignStartDate) === generateConfig.getMonth(value) && generateConfig.getDate(alignStartDate) > 1) alignStartDate = generateConfig.addDate(alignStartDate, -7);
	return alignStartDate;
}
function formatValue(value, _ref) {
	var generateConfig = _ref.generateConfig, locale = _ref.locale, format = _ref.format;
	if (!value) return "";
	return typeof format === "function" ? format(value) : generateConfig.locale.format(locale.locale, value, format);
}
function fillTime(generateConfig, date, time) {
	var tmpDate = date;
	var getFn = [
		"getHour",
		"getMinute",
		"getSecond",
		"getMillisecond"
	];
	[
		"setHour",
		"setMinute",
		"setSecond",
		"setMillisecond"
	].forEach(function(fn, index) {
		if (time) tmpDate = generateConfig[fn](tmpDate, generateConfig[getFn[index]](time));
		else tmpDate = generateConfig[fn](tmpDate, 0);
	});
	return tmpDate;
}
var init_dateUtil = __esmMin((() => {}));
function useDisabledBoundary(generateConfig, locale, disabledDate, minDate, maxDate) {
	return useEvent(function(date, info) {
		if (disabledDate && disabledDate(date, info)) return true;
		if (minDate && generateConfig.isAfter(minDate, date) && !isSame(generateConfig, locale, minDate, date, info.type)) return true;
		if (maxDate && generateConfig.isAfter(date, maxDate) && !isSame(generateConfig, locale, maxDate, date, info.type)) return true;
		return false;
	});
}
var init_useDisabledBoundary = __esmMin((() => {
	init_es$6();
	init_dateUtil();
}));
function useFieldFormat(picker, locale, format) {
	return import_react$96.useMemo(function() {
		var formatList = toArray$2(getRowFormat(picker, locale, format));
		var firstFormat = formatList[0];
		var maskFormat = _typeof(firstFormat) === "object" && firstFormat.type === "mask" ? firstFormat.format : null;
		return [formatList.map(function(config) {
			return typeof config === "string" || typeof config === "function" ? config : config.format;
		}), maskFormat];
	}, [
		picker,
		locale,
		format
	]);
}
var import_react$96;
var init_useFieldFormat = __esmMin((() => {
	init_typeof();
	import_react$96 = /* @__PURE__ */ __toESM(require_react());
	init_miscUtil();
}));
function useInputReadOnly(formatList, inputReadOnly, multiple) {
	if (typeof formatList[0] === "function" || multiple) return true;
	return inputReadOnly;
}
var init_useInputReadOnly = __esmMin((() => {}));
function useInvalidate(generateConfig, picker, disabledDate, showTime) {
	return useEvent(function(date, info) {
		var outsideInfo = _objectSpread2({ type: picker }, info);
		delete outsideInfo.activeIndex;
		if (!generateConfig.isValidate(date) || disabledDate && disabledDate(date, outsideInfo)) return true;
		if ((picker === "date" || picker === "time") && showTime) {
			var _showTime$disabledTim;
			var range = info && info.activeIndex === 1 ? "end" : "start";
			var _ref = ((_showTime$disabledTim = showTime.disabledTime) === null || _showTime$disabledTim === void 0 ? void 0 : _showTime$disabledTim.call(showTime, date, range, { from: outsideInfo.from })) || {}, disabledHours = _ref.disabledHours, disabledMinutes = _ref.disabledMinutes, disabledSeconds = _ref.disabledSeconds, disabledMilliseconds = _ref.disabledMilliseconds;
			var legacyDisabledHours = showTime.disabledHours, legacyDisabledMinutes = showTime.disabledMinutes, legacyDisabledSeconds = showTime.disabledSeconds;
			var mergedDisabledHours = disabledHours || legacyDisabledHours;
			var mergedDisabledMinutes = disabledMinutes || legacyDisabledMinutes;
			var mergedDisabledSeconds = disabledSeconds || legacyDisabledSeconds;
			var hour = generateConfig.getHour(date);
			var minute = generateConfig.getMinute(date);
			var second = generateConfig.getSecond(date);
			var millisecond = generateConfig.getMillisecond(date);
			if (mergedDisabledHours && mergedDisabledHours().includes(hour)) return true;
			if (mergedDisabledMinutes && mergedDisabledMinutes(hour).includes(minute)) return true;
			if (mergedDisabledSeconds && mergedDisabledSeconds(hour, minute).includes(second)) return true;
			if (disabledMilliseconds && disabledMilliseconds(hour, minute, second).includes(millisecond)) return true;
		}
		return false;
	});
}
var init_useInvalidate = __esmMin((() => {
	init_objectSpread2();
	init_es$6();
}));
function useList(value) {
	var fillMode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
	return import_react$95.useMemo(function() {
		var list = value ? toArray$2(value) : value;
		if (fillMode && list) list[1] = list[1] || list[0];
		return list;
	}, [value, fillMode]);
}
function useFilledProps(props, updater) {
	var generateConfig = props.generateConfig, locale = props.locale, _props$picker = props.picker, picker = _props$picker === void 0 ? "date" : _props$picker, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-picker" : _props$prefixCls, _props$styles = props.styles, styles = _props$styles === void 0 ? {} : _props$styles, _props$classNames = props.classNames, classNames$32 = _props$classNames === void 0 ? {} : _props$classNames, _props$order = props.order, order = _props$order === void 0 ? true : _props$order, _props$components = props.components, components = _props$components === void 0 ? {} : _props$components, inputRender = props.inputRender, allowClear = props.allowClear, clearIcon = props.clearIcon, needConfirm = props.needConfirm, multiple = props.multiple, format = props.format, inputReadOnly = props.inputReadOnly, disabledDate = props.disabledDate, minDate = props.minDate, maxDate = props.maxDate, showTime = props.showTime, value = props.value, defaultValue = props.defaultValue, pickerValue = props.pickerValue, defaultPickerValue = props.defaultPickerValue;
	var values = useList(value);
	var defaultValues = useList(defaultValue);
	var pickerValues = useList(pickerValue);
	var defaultPickerValues = useList(defaultPickerValue);
	var internalPicker = picker === "date" && showTime ? "datetime" : picker;
	var multipleInteractivePicker = internalPicker === "time" || internalPicker === "datetime";
	var complexPicker = multipleInteractivePicker || multiple;
	var mergedNeedConfirm = needConfirm !== null && needConfirm !== void 0 ? needConfirm : multipleInteractivePicker;
	var _getTimeProps2 = _slicedToArray(getTimeProps(props), 4), timeProps = _getTimeProps2[0], localeTimeProps = _getTimeProps2[1], showTimeFormat = _getTimeProps2[2], propFormat = _getTimeProps2[3];
	var mergedLocale = useLocale(locale, localeTimeProps);
	var mergedShowTime = import_react$95.useMemo(function() {
		return fillShowTimeConfig(internalPicker, showTimeFormat, propFormat, timeProps, mergedLocale);
	}, [
		internalPicker,
		showTimeFormat,
		propFormat,
		timeProps,
		mergedLocale
	]);
	var filledProps = import_react$95.useMemo(function() {
		return _objectSpread2(_objectSpread2({}, props), {}, {
			prefixCls,
			locale: mergedLocale,
			picker,
			styles,
			classNames: classNames$32,
			order,
			components: _objectSpread2({ input: inputRender }, components),
			clearIcon: fillClearIcon(prefixCls, allowClear, clearIcon),
			showTime: mergedShowTime,
			value: values,
			defaultValue: defaultValues,
			pickerValue: pickerValues,
			defaultPickerValue: defaultPickerValues
		}, updater === null || updater === void 0 ? void 0 : updater());
	}, [props]);
	var _useFieldFormat2 = _slicedToArray(useFieldFormat(internalPicker, mergedLocale, format), 2), formatList = _useFieldFormat2[0], maskFormat = _useFieldFormat2[1];
	var mergedInputReadOnly = useInputReadOnly(formatList, inputReadOnly, multiple);
	var disabledBoundaryDate = useDisabledBoundary(generateConfig, locale, disabledDate, minDate, maxDate);
	var isInvalidateDate = useInvalidate(generateConfig, picker, disabledBoundaryDate, mergedShowTime);
	return [
		import_react$95.useMemo(function() {
			return _objectSpread2(_objectSpread2({}, filledProps), {}, {
				needConfirm: mergedNeedConfirm,
				inputReadOnly: mergedInputReadOnly,
				disabledDate: disabledBoundaryDate
			});
		}, [
			filledProps,
			mergedNeedConfirm,
			mergedInputReadOnly,
			disabledBoundaryDate
		]),
		internalPicker,
		complexPicker,
		formatList,
		maskFormat,
		isInvalidateDate
	];
}
var import_react$95;
var init_useFilledProps = __esmMin((() => {
	init_objectSpread2();
	init_slicedToArray();
	init_es$6();
	import_react$95 = /* @__PURE__ */ __toESM(require_react());
	init_useLocale();
	init_useTimeConfig();
	init_miscUtil();
	init_useClearIcon();
	init_useDisabledBoundary();
	init_useFieldFormat();
	init_useInputReadOnly();
	init_useInvalidate();
}));
function useDelayState(value, defaultValue, onChange) {
	var _useMergedState2 = _slicedToArray(useMergedState(defaultValue, { value }), 2), state = _useMergedState2[0], setState = _useMergedState2[1];
	var nextValueRef = import_react$94.useRef(value);
	var rafRef = import_react$94.useRef();
	var cancelRaf = function cancelRaf$1() {
		raf_default.cancel(rafRef.current);
	};
	var doUpdate = useEvent(function() {
		setState(nextValueRef.current);
		if (onChange && state !== nextValueRef.current) onChange(nextValueRef.current);
	});
	var updateValue = useEvent(function(next, immediately) {
		cancelRaf();
		nextValueRef.current = next;
		if (next || immediately) doUpdate();
		else rafRef.current = raf_default(doUpdate);
	});
	import_react$94.useEffect(function() {
		return cancelRaf;
	}, []);
	return [state, updateValue];
}
var import_react$94;
var init_useDelayState = __esmMin((() => {
	init_slicedToArray();
	init_es$6();
	init_raf();
	import_react$94 = /* @__PURE__ */ __toESM(require_react());
}));
function useOpen(open, defaultOpen) {
	var disabledList = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
	var onOpenChange = arguments.length > 3 ? arguments[3] : void 0;
	var _useDelayState2 = _slicedToArray(useDelayState(disabledList.every(function(disabled) {
		return disabled;
	}) ? false : open, defaultOpen || false, onOpenChange), 2), rafOpen = _useDelayState2[0], setRafOpen = _useDelayState2[1];
	function setOpen(next) {
		var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		if (!config.inherit || rafOpen) setRafOpen(next, config.force);
	}
	return [rafOpen, setOpen];
}
var init_useOpen = __esmMin((() => {
	init_slicedToArray();
	init_useDelayState();
}));
function usePickerRef(ref) {
	var selectorRef = import_react$93.useRef();
	import_react$93.useImperativeHandle(ref, function() {
		var _selectorRef$current;
		return {
			nativeElement: (_selectorRef$current = selectorRef.current) === null || _selectorRef$current === void 0 ? void 0 : _selectorRef$current.nativeElement,
			focus: function focus(options) {
				var _selectorRef$current2;
				(_selectorRef$current2 = selectorRef.current) === null || _selectorRef$current2 === void 0 || _selectorRef$current2.focus(options);
			},
			blur: function blur() {
				var _selectorRef$current3;
				(_selectorRef$current3 = selectorRef.current) === null || _selectorRef$current3 === void 0 || _selectorRef$current3.blur();
			}
		};
	});
	return selectorRef;
}
var import_react$93;
var init_usePickerRef = __esmMin((() => {
	import_react$93 = /* @__PURE__ */ __toESM(require_react());
}));
function usePresets(presets, legacyRanges) {
	return import_react$92.useMemo(function() {
		if (presets) return presets;
		if (legacyRanges) {
			warning_default(false, "`ranges` is deprecated. Please use `presets` instead.");
			return Object.entries(legacyRanges).map(function(_ref) {
				var _ref2 = _slicedToArray(_ref, 2);
				return {
					label: _ref2[0],
					value: _ref2[1]
				};
			});
		}
		return [];
	}, [presets, legacyRanges]);
}
var import_react$92;
var init_usePresets = __esmMin((() => {
	init_slicedToArray();
	import_react$92 = /* @__PURE__ */ __toESM(require_react());
	init_warning();
}));
function useLockEffect(condition, callback) {
	var delayFrames = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
	var callbackRef = import_react$91.useRef(callback);
	callbackRef.current = callback;
	useLayoutUpdateEffect(function() {
		if (condition) callbackRef.current(condition);
		else {
			var id = raf_default(function() {
				callbackRef.current(condition);
			}, delayFrames);
			return function() {
				raf_default.cancel(id);
			};
		}
	}, [condition]);
}
var import_react$91;
var init_useLockEffect = __esmMin((() => {
	init_useLayoutEffect();
	init_raf();
	import_react$91 = /* @__PURE__ */ __toESM(require_react());
}));
function useRangeActive(disabled) {
	var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
	var mergedOpen = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
	var _React$useState2 = _slicedToArray(import_react$90.useState(0), 2), activeIndex = _React$useState2[0], setActiveIndex = _React$useState2[1];
	var _React$useState4 = _slicedToArray(import_react$90.useState(false), 2), focused = _React$useState4[0], setFocused = _React$useState4[1];
	var activeListRef = import_react$90.useRef([]);
	var submitIndexRef = import_react$90.useRef(null);
	var lastOperationRef = import_react$90.useRef(null);
	var updateSubmitIndex = function updateSubmitIndex$1(index) {
		submitIndexRef.current = index;
	};
	var hasActiveSubmitValue = function hasActiveSubmitValue$1(index) {
		return submitIndexRef.current === index;
	};
	var triggerFocus = function triggerFocus$1(nextFocus) {
		setFocused(nextFocus);
	};
	var lastOperation = function lastOperation$1(type) {
		if (type) lastOperationRef.current = type;
		return lastOperationRef.current;
	};
	var nextActiveIndex = function nextActiveIndex$1(nextValue) {
		var list = activeListRef.current;
		var filledActiveSet = new Set(list.filter(function(index) {
			return nextValue[index] || empty[index];
		}));
		var nextIndex = list[list.length - 1] === 0 ? 1 : 0;
		if (filledActiveSet.size >= 2 || disabled[nextIndex]) return null;
		return nextIndex;
	};
	useLockEffect(focused || mergedOpen, function() {
		if (!focused) {
			activeListRef.current = [];
			updateSubmitIndex(null);
		}
	});
	import_react$90.useEffect(function() {
		if (focused) activeListRef.current.push(activeIndex);
	}, [focused, activeIndex]);
	return [
		focused,
		triggerFocus,
		lastOperation,
		activeIndex,
		setActiveIndex,
		nextActiveIndex,
		activeListRef.current,
		updateSubmitIndex,
		hasActiveSubmitValue
	];
}
var import_react$90;
var init_useRangeActive = __esmMin((() => {
	init_slicedToArray();
	import_react$90 = /* @__PURE__ */ __toESM(require_react());
	init_useLockEffect();
}));
function useRangeDisabledDate(values, disabled, activeIndexList, generateConfig, locale, disabledDate) {
	var activeIndex = activeIndexList[activeIndexList.length - 1];
	return function rangeDisabledDate(date, info) {
		var _values = _slicedToArray(values, 2), start = _values[0], end = _values[1];
		var mergedInfo = _objectSpread2(_objectSpread2({}, info), {}, { from: getFromDate(values, activeIndexList) });
		if (activeIndex === 1 && disabled[0] && start && !isSame(generateConfig, locale, start, date, mergedInfo.type) && generateConfig.isAfter(start, date)) return true;
		if (activeIndex === 0 && disabled[1] && end && !isSame(generateConfig, locale, end, date, mergedInfo.type) && generateConfig.isAfter(date, end)) return true;
		return disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, mergedInfo);
	};
}
var init_useRangeDisabledDate = __esmMin((() => {
	init_objectSpread2();
	init_slicedToArray();
	init_dateUtil();
	init_miscUtil();
}));
function offsetPanelDate(generateConfig, picker, date, offset) {
	switch (picker) {
		case "date":
		case "week": return generateConfig.addMonth(date, offset);
		case "month":
		case "quarter": return generateConfig.addYear(date, offset);
		case "year": return generateConfig.addYear(date, offset * 10);
		case "decade": return generateConfig.addYear(date, offset * 100);
		default: return date;
	}
}
function useRangePickerValue(generateConfig, locale, calendarValue, modes, open, activeIndex, pickerMode, multiplePanel) {
	var defaultPickerValue = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : EMPTY_LIST;
	var pickerValue = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : EMPTY_LIST;
	var timeDefaultValue = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : EMPTY_LIST;
	var onPickerValueChange = arguments.length > 11 ? arguments[11] : void 0;
	var minDate = arguments.length > 12 ? arguments[12] : void 0;
	var maxDate = arguments.length > 13 ? arguments[13] : void 0;
	var isTimePicker = pickerMode === "time";
	var mergedActiveIndex = activeIndex || 0;
	var getDefaultPickerValue = function getDefaultPickerValue$1(index) {
		var now = generateConfig.getNow();
		if (isTimePicker) now = fillTime(generateConfig, now);
		return defaultPickerValue[index] || calendarValue[index] || now;
	};
	var _pickerValue = _slicedToArray(pickerValue, 2), startPickerValue = _pickerValue[0], endPickerValue = _pickerValue[1];
	var _useMergedState2 = _slicedToArray(useMergedState(function() {
		return getDefaultPickerValue(0);
	}, { value: startPickerValue }), 2), mergedStartPickerValue = _useMergedState2[0], setStartPickerValue = _useMergedState2[1];
	var _useMergedState4 = _slicedToArray(useMergedState(function() {
		return getDefaultPickerValue(1);
	}, { value: endPickerValue }), 2), mergedEndPickerValue = _useMergedState4[0], setEndPickerValue = _useMergedState4[1];
	var currentPickerValue = import_react$89.useMemo(function() {
		var current = [mergedStartPickerValue, mergedEndPickerValue][mergedActiveIndex];
		return isTimePicker ? current : fillTime(generateConfig, current, timeDefaultValue[mergedActiveIndex]);
	}, [
		isTimePicker,
		mergedStartPickerValue,
		mergedEndPickerValue,
		mergedActiveIndex,
		generateConfig,
		timeDefaultValue
	]);
	var setCurrentPickerValue = function setCurrentPickerValue$1(nextPickerValue) {
		var source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "panel";
		var updater = [setStartPickerValue, setEndPickerValue][mergedActiveIndex];
		updater(nextPickerValue);
		var clone = [mergedStartPickerValue, mergedEndPickerValue];
		clone[mergedActiveIndex] = nextPickerValue;
		if (onPickerValueChange && (!isSame(generateConfig, locale, mergedStartPickerValue, clone[0], pickerMode) || !isSame(generateConfig, locale, mergedEndPickerValue, clone[1], pickerMode))) onPickerValueChange(clone, {
			source,
			range: mergedActiveIndex === 1 ? "end" : "start",
			mode: modes
		});
	};
	var getEndDatePickerValue = function getEndDatePickerValue$1(startDate, endDate) {
		if (multiplePanel) {
			var mode = {
				date: "month",
				week: "month",
				month: "year",
				quarter: "year"
			}[pickerMode];
			if (mode && !isSame(generateConfig, locale, startDate, endDate, mode)) return offsetPanelDate(generateConfig, pickerMode, endDate, -1);
			if (pickerMode === "year" && startDate) {
				if (Math.floor(generateConfig.getYear(startDate) / 10) !== Math.floor(generateConfig.getYear(endDate) / 10)) return offsetPanelDate(generateConfig, pickerMode, endDate, -1);
			}
		}
		return endDate;
	};
	var prevActiveIndexRef = import_react$89.useRef(null);
	useLayoutEffect_default(function() {
		if (open) {
			if (!defaultPickerValue[mergedActiveIndex]) {
				var nextPickerValue = isTimePicker ? null : generateConfig.getNow();
				if (prevActiveIndexRef.current !== null && prevActiveIndexRef.current !== mergedActiveIndex) nextPickerValue = [mergedStartPickerValue, mergedEndPickerValue][mergedActiveIndex ^ 1];
				else if (calendarValue[mergedActiveIndex]) nextPickerValue = mergedActiveIndex === 0 ? calendarValue[0] : getEndDatePickerValue(calendarValue[0], calendarValue[1]);
				else if (calendarValue[mergedActiveIndex ^ 1]) nextPickerValue = calendarValue[mergedActiveIndex ^ 1];
				if (nextPickerValue) {
					if (minDate && generateConfig.isAfter(minDate, nextPickerValue)) nextPickerValue = minDate;
					var offsetPickerValue = multiplePanel ? offsetPanelDate(generateConfig, pickerMode, nextPickerValue, 1) : nextPickerValue;
					if (maxDate && generateConfig.isAfter(offsetPickerValue, maxDate)) nextPickerValue = multiplePanel ? offsetPanelDate(generateConfig, pickerMode, maxDate, -1) : maxDate;
					setCurrentPickerValue(nextPickerValue, "reset");
				}
			}
		}
	}, [
		open,
		mergedActiveIndex,
		calendarValue[mergedActiveIndex]
	]);
	import_react$89.useEffect(function() {
		if (open) prevActiveIndexRef.current = mergedActiveIndex;
		else prevActiveIndexRef.current = null;
	}, [open, mergedActiveIndex]);
	useLayoutEffect_default(function() {
		if (open && defaultPickerValue) {
			if (defaultPickerValue[mergedActiveIndex]) setCurrentPickerValue(defaultPickerValue[mergedActiveIndex], "reset");
		}
	}, [open, mergedActiveIndex]);
	return [currentPickerValue, setCurrentPickerValue];
}
var import_react$89, EMPTY_LIST;
var init_useRangePickerValue = __esmMin((() => {
	init_slicedToArray();
	init_es$6();
	init_useLayoutEffect();
	import_react$89 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	EMPTY_LIST = [];
}));
function useSyncState$1(defaultValue, controlledValue) {
	var valueRef = import_react$88.useRef(defaultValue);
	var forceUpdate = _slicedToArray(import_react$88.useState({}), 2)[1];
	var getter = function getter$1(useControlledValueFirst) {
		return useControlledValueFirst && controlledValue !== void 0 ? controlledValue : valueRef.current;
	};
	return [
		getter,
		function setter(nextValue) {
			valueRef.current = nextValue;
			forceUpdate({});
		},
		getter(true)
	];
}
var import_react$88;
var init_useSyncState$1 = __esmMin((() => {
	init_slicedToArray();
	import_react$88 = /* @__PURE__ */ __toESM(require_react());
}));
function useUtil(generateConfig, locale, formatList) {
	return [function getDateTexts(dates) {
		return dates.map(function(date) {
			return formatValue(date, {
				generateConfig,
				locale,
				format: formatList[0]
			});
		});
	}, function isSameDates(source, target) {
		var maxLen = Math.max(source.length, target.length);
		var diffIndex = -1;
		for (var i = 0; i < maxLen; i += 1) {
			var prev = source[i] || null;
			var next = target[i] || null;
			if (prev !== next && !isSameTimestamp(generateConfig, prev, next)) {
				diffIndex = i;
				break;
			}
		}
		return [diffIndex < 0, diffIndex !== 0];
	}];
}
function orderDates(dates, generateConfig) {
	return _toConsumableArray(dates).sort(function(a, b) {
		return generateConfig.isAfter(a, b) ? 1 : -1;
	});
}
function useCalendarValue(mergedValue) {
	var _useSyncState2 = _slicedToArray(useSyncState$1(mergedValue), 2), calendarValue = _useSyncState2[0], setCalendarValue = _useSyncState2[1];
	var syncWithValue = useEvent(function() {
		setCalendarValue(mergedValue);
	});
	import_react$87.useEffect(function() {
		syncWithValue();
	}, [mergedValue]);
	return [calendarValue, setCalendarValue];
}
function useInnerValue(generateConfig, locale, formatList, rangeValue, order, defaultValue, value, onCalendarChange, onOk) {
	var _useMergedState2 = _slicedToArray(useMergedState(defaultValue, { value }), 2), innerValue = _useMergedState2[0], setInnerValue = _useMergedState2[1];
	var mergedValue = innerValue || EMPTY_VALUE;
	var _useCalendarValue2 = _slicedToArray(useCalendarValue(mergedValue), 2), calendarValue = _useCalendarValue2[0], setCalendarValue = _useCalendarValue2[1];
	var _useUtil2 = _slicedToArray(useUtil(generateConfig, locale, formatList), 2), getDateTexts = _useUtil2[0], isSameDates = _useUtil2[1];
	return [
		mergedValue,
		setInnerValue,
		calendarValue,
		useEvent(function(nextCalendarValues) {
			var clone = _toConsumableArray(nextCalendarValues);
			if (rangeValue) for (var i = 0; i < 2; i += 1) clone[i] = clone[i] || null;
			else if (order) clone = orderDates(clone.filter(function(date) {
				return date;
			}), generateConfig);
			var _isSameDates2 = _slicedToArray(isSameDates(calendarValue(), clone), 2), isSameMergedDates = _isSameDates2[0], isSameStart = _isSameDates2[1];
			if (!isSameMergedDates) {
				setCalendarValue(clone);
				if (onCalendarChange) {
					var cellTexts = getDateTexts(clone);
					onCalendarChange(clone, cellTexts, { range: isSameStart ? "end" : "start" });
				}
			}
		}),
		function triggerOk() {
			if (onOk) onOk(calendarValue());
		}
	];
}
function useRangeValue(info, mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, disabled, formatList, focused, open, isInvalidateDate) {
	var generateConfig = info.generateConfig, locale = info.locale, picker = info.picker, onChange = info.onChange, allowEmpty = info.allowEmpty, order = info.order;
	var orderOnChange = disabled.some(function(d) {
		return d;
	}) ? false : order;
	var _useUtil4 = _slicedToArray(useUtil(generateConfig, locale, formatList), 2), getDateTexts = _useUtil4[0], isSameDates = _useUtil4[1];
	var _useSyncState4 = _slicedToArray(useSyncState$1(mergedValue), 2), submitValue = _useSyncState4[0], setSubmitValue = _useSyncState4[1];
	var syncWithValue = useEvent(function() {
		setSubmitValue(mergedValue);
	});
	import_react$87.useEffect(function() {
		syncWithValue();
	}, [mergedValue]);
	var triggerSubmit = useEvent(function(nextValue) {
		var isNullValue = nextValue === null;
		var clone = _toConsumableArray(nextValue || submitValue());
		if (isNullValue) {
			var maxLen = Math.max(disabled.length, clone.length);
			for (var i = 0; i < maxLen; i += 1) if (!disabled[i]) clone[i] = null;
		}
		if (orderOnChange && clone[0] && clone[1]) clone = orderDates(clone, generateConfig);
		triggerCalendarChange(clone);
		var _clone2 = _slicedToArray(clone, 2), start = _clone2[0], end = _clone2[1];
		var startEmpty = !start;
		var endEmpty = !end;
		var validateEmptyDateRange = allowEmpty ? (!startEmpty || allowEmpty[0]) && (!endEmpty || allowEmpty[1]) : true;
		var validateOrder = !order || startEmpty || endEmpty || isSame(generateConfig, locale, start, end, picker) || generateConfig.isAfter(end, start);
		var validateDates = (disabled[0] || !start || !isInvalidateDate(start, { activeIndex: 0 })) && (disabled[1] || !end || !isInvalidateDate(end, {
			from: start,
			activeIndex: 1
		}));
		var allPassed = isNullValue || validateEmptyDateRange && validateOrder && validateDates;
		if (allPassed) {
			setInnerValue(clone);
			var isSameMergedDates = _slicedToArray(isSameDates(clone, mergedValue), 1)[0];
			if (onChange && !isSameMergedDates) onChange(isNullValue && clone.every(function(val) {
				return !val;
			}) ? null : clone, getDateTexts(clone));
		}
		return allPassed;
	});
	var flushSubmit = useEvent(function(index, needTriggerChange) {
		setSubmitValue(fillIndex(submitValue(), index, getCalendarValue()[index]));
		if (needTriggerChange) triggerSubmit();
	});
	var interactiveFinished = !focused && !open;
	useLockEffect(!interactiveFinished, function() {
		if (interactiveFinished) {
			triggerSubmit();
			triggerCalendarChange(mergedValue);
			syncWithValue();
		}
	}, 2);
	return [flushSubmit, triggerSubmit];
}
var import_react$87, EMPTY_VALUE;
var init_useRangeValue = __esmMin((() => {
	init_slicedToArray();
	init_toConsumableArray();
	init_es$6();
	import_react$87 = /* @__PURE__ */ __toESM(require_react());
	init_useSyncState$1();
	init_dateUtil();
	init_miscUtil();
	init_useLockEffect();
	EMPTY_VALUE = [];
}));
function useShowNow(picker, mode, showNow, showToday, rangePicker) {
	if (mode !== "date" && mode !== "time") return false;
	if (showNow !== void 0) return showNow;
	if (showToday !== void 0) return showToday;
	return !rangePicker && (picker === "date" || picker === "time");
}
var init_useShowNow = __esmMin((() => {}));
function findValidateTime(date, getHourUnits, getMinuteUnits, getSecondUnits, getMillisecondUnits, generateConfig) {
	var nextDate = date;
	function alignValidate(getUnitValue$1, setUnitValue, units) {
		var nextValue = generateConfig[getUnitValue$1](nextDate);
		var nextUnit = units.find(function(unit) {
			return unit.value === nextValue;
		});
		if (!nextUnit || nextUnit.disabled) {
			var validateUnits = units.filter(function(unit) {
				return !unit.disabled;
			});
			var validateUnit = _toConsumableArray(validateUnits).reverse().find(function(unit) {
				return unit.value <= nextValue;
			}) || validateUnits[0];
			if (validateUnit) {
				nextValue = validateUnit.value;
				nextDate = generateConfig[setUnitValue](nextDate, nextValue);
			}
		}
		return nextValue;
	}
	var nextHour = alignValidate("getHour", "setHour", getHourUnits());
	var nextMinute = alignValidate("getMinute", "setMinute", getMinuteUnits(nextHour));
	alignValidate("getMillisecond", "setMillisecond", getMillisecondUnits(nextHour, nextMinute, alignValidate("getSecond", "setSecond", getSecondUnits(nextHour, nextMinute))));
	return nextDate;
}
var init_util$2 = __esmMin((() => {
	init_toConsumableArray();
}));
function emptyDisabled() {
	return [];
}
function generateUnits(start, end) {
	var step = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
	var hideDisabledOptions = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
	var disabledUnits = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
	var pad = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 2;
	var units = [];
	var integerStep = step >= 1 ? step | 0 : 1;
	for (var i = start; i <= end; i += integerStep) {
		var disabled = disabledUnits.includes(i);
		if (!disabled || !hideDisabledOptions) units.push({
			label: leftPad(i, pad),
			value: i,
			disabled
		});
	}
	return units;
}
function useTimeInfo(generateConfig) {
	var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	var date = arguments.length > 2 ? arguments[2] : void 0;
	var _ref = props || {}, use12Hours = _ref.use12Hours, _ref$hourStep = _ref.hourStep, hourStep = _ref$hourStep === void 0 ? 1 : _ref$hourStep, _ref$minuteStep = _ref.minuteStep, minuteStep = _ref$minuteStep === void 0 ? 1 : _ref$minuteStep, _ref$secondStep = _ref.secondStep, secondStep = _ref$secondStep === void 0 ? 1 : _ref$secondStep, _ref$millisecondStep = _ref.millisecondStep, millisecondStep = _ref$millisecondStep === void 0 ? 100 : _ref$millisecondStep, hideDisabledOptions = _ref.hideDisabledOptions, disabledTime = _ref.disabledTime, disabledHours = _ref.disabledHours, disabledMinutes = _ref.disabledMinutes, disabledSeconds = _ref.disabledSeconds;
	var mergedDate = import_react$86.useMemo(function() {
		return date || generateConfig.getNow();
	}, [date, generateConfig]);
	var getDisabledTimes = import_react$86.useCallback(function(targetDate) {
		var disabledConfig = (disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(targetDate)) || {};
		return [
			disabledConfig.disabledHours || disabledHours || emptyDisabled,
			disabledConfig.disabledMinutes || disabledMinutes || emptyDisabled,
			disabledConfig.disabledSeconds || disabledSeconds || emptyDisabled,
			disabledConfig.disabledMilliseconds || emptyDisabled
		];
	}, [
		disabledTime,
		disabledHours,
		disabledMinutes,
		disabledSeconds
	]);
	var _React$useMemo2 = _slicedToArray(import_react$86.useMemo(function() {
		return getDisabledTimes(mergedDate);
	}, [mergedDate, getDisabledTimes]), 4), mergedDisabledHours = _React$useMemo2[0], mergedDisabledMinutes = _React$useMemo2[1], mergedDisabledSeconds = _React$useMemo2[2], mergedDisabledMilliseconds = _React$useMemo2[3];
	var getAllUnits = import_react$86.useCallback(function(getDisabledHours, getDisabledMinutes, getDisabledSeconds, getDisabledMilliseconds) {
		var hours = generateUnits(0, 23, hourStep, hideDisabledOptions, getDisabledHours());
		return [
			use12Hours ? hours.map(function(unit) {
				return _objectSpread2(_objectSpread2({}, unit), {}, { label: leftPad(unit.value % 12 || 12, 2) });
			}) : hours,
			function getMinuteUnits$1(nextHour) {
				return generateUnits(0, 59, minuteStep, hideDisabledOptions, getDisabledMinutes(nextHour));
			},
			function getSecondUnits$1(nextHour, nextMinute) {
				return generateUnits(0, 59, secondStep, hideDisabledOptions, getDisabledSeconds(nextHour, nextMinute));
			},
			function getMillisecondUnits$1(nextHour, nextMinute, nextSecond) {
				return generateUnits(0, 999, millisecondStep, hideDisabledOptions, getDisabledMilliseconds(nextHour, nextMinute, nextSecond), 3);
			}
		];
	}, [
		hideDisabledOptions,
		hourStep,
		use12Hours,
		millisecondStep,
		minuteStep,
		secondStep
	]);
	var _React$useMemo4 = _slicedToArray(import_react$86.useMemo(function() {
		return getAllUnits(mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds);
	}, [
		getAllUnits,
		mergedDisabledHours,
		mergedDisabledMinutes,
		mergedDisabledSeconds,
		mergedDisabledMilliseconds
	]), 4), rowHourUnits = _React$useMemo4[0], getMinuteUnits = _React$useMemo4[1], getSecondUnits = _React$useMemo4[2], getMillisecondUnits = _React$useMemo4[3];
	return [
		function getValidTime(nextTime, certainDate) {
			var getCheckHourUnits = function getCheckHourUnits$1() {
				return rowHourUnits;
			};
			var getCheckMinuteUnits = getMinuteUnits;
			var getCheckSecondUnits = getSecondUnits;
			var getCheckMillisecondUnits = getMillisecondUnits;
			if (certainDate) {
				var _getDisabledTimes2 = _slicedToArray(getDisabledTimes(certainDate), 4), targetDisabledHours = _getDisabledTimes2[0], targetDisabledMinutes = _getDisabledTimes2[1], targetDisabledSeconds = _getDisabledTimes2[2], targetDisabledMilliseconds = _getDisabledTimes2[3];
				var _getAllUnits2 = _slicedToArray(getAllUnits(targetDisabledHours, targetDisabledMinutes, targetDisabledSeconds, targetDisabledMilliseconds), 4), targetRowHourUnits = _getAllUnits2[0], targetGetMinuteUnits = _getAllUnits2[1], targetGetSecondUnits = _getAllUnits2[2], targetGetMillisecondUnits = _getAllUnits2[3];
				getCheckHourUnits = function getCheckHourUnits$1() {
					return targetRowHourUnits;
				};
				getCheckMinuteUnits = targetGetMinuteUnits;
				getCheckSecondUnits = targetGetSecondUnits;
				getCheckMillisecondUnits = targetGetMillisecondUnits;
			}
			return findValidateTime(nextTime, getCheckHourUnits, getCheckMinuteUnits, getCheckSecondUnits, getCheckMillisecondUnits, generateConfig);
		},
		rowHourUnits,
		getMinuteUnits,
		getSecondUnits,
		getMillisecondUnits
	];
}
var import_react$86;
var init_useTimeInfo = __esmMin((() => {
	init_objectSpread2();
	init_slicedToArray();
	init_es$6();
	import_react$86 = /* @__PURE__ */ __toESM(require_react());
	init_util$2();
	init_miscUtil();
}));
function Footer$1(props) {
	var mode = props.mode, internalMode = props.internalMode, renderExtraFooter = props.renderExtraFooter, showNow = props.showNow, showTime = props.showTime, onSubmit = props.onSubmit, onNow = props.onNow, invalid = props.invalid, needConfirm = props.needConfirm, generateConfig = props.generateConfig, disabledDate = props.disabledDate;
	var _React$useContext = import_react$85.useContext(context_default), prefixCls = _React$useContext.prefixCls, locale = _React$useContext.locale, _React$useContext$but = _React$useContext.button, Button = _React$useContext$but === void 0 ? "button" : _React$useContext$but;
	var now = generateConfig.getNow();
	var getValidTime = _slicedToArray(useTimeInfo(generateConfig, showTime, now), 1)[0];
	var extraNode = renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter(mode);
	var nowDisabled = disabledDate(now, { type: mode });
	var onInternalNow = function onInternalNow$1() {
		if (!nowDisabled) onNow(getValidTime(now));
	};
	var nowPrefixCls = "".concat(prefixCls, "-now");
	var nowBtnPrefixCls = "".concat(nowPrefixCls, "-btn");
	var presetNode = showNow && /* @__PURE__ */ import_react$85.createElement("li", { className: nowPrefixCls }, /* @__PURE__ */ import_react$85.createElement("a", {
		className: (0, import_classnames$30.default)(nowBtnPrefixCls, nowDisabled && "".concat(nowBtnPrefixCls, "-disabled")),
		"aria-disabled": nowDisabled,
		onClick: onInternalNow
	}, internalMode === "date" ? locale.today : locale.now));
	var okNode = needConfirm && /* @__PURE__ */ import_react$85.createElement("li", { className: "".concat(prefixCls, "-ok") }, /* @__PURE__ */ import_react$85.createElement(Button, {
		disabled: invalid,
		onClick: onSubmit
	}, locale.ok));
	var rangeNode = (presetNode || okNode) && /* @__PURE__ */ import_react$85.createElement("ul", { className: "".concat(prefixCls, "-ranges") }, presetNode, okNode);
	if (!extraNode && !rangeNode) return null;
	return /* @__PURE__ */ import_react$85.createElement("div", { className: "".concat(prefixCls, "-footer") }, extraNode && /* @__PURE__ */ import_react$85.createElement("div", { className: "".concat(prefixCls, "-footer-extra") }, extraNode), rangeNode);
}
var import_classnames$30, import_react$85;
var init_Footer$1 = __esmMin((() => {
	init_slicedToArray();
	import_classnames$30 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$85 = /* @__PURE__ */ __toESM(require_react());
	init_useTimeInfo();
	init_context$3();
}));
function useToggleDates(generateConfig, locale, panelMode) {
	function toggleDates(list, target) {
		var index = list.findIndex(function(date) {
			return isSame(generateConfig, locale, date, target, panelMode);
		});
		if (index === -1) return [].concat(_toConsumableArray(list), [target]);
		var sliceList = _toConsumableArray(list);
		sliceList.splice(index, 1);
		return sliceList;
	}
	return toggleDates;
}
var init_useToggleDates = __esmMin((() => {
	init_toConsumableArray();
	init_dateUtil();
}));
function usePanelContext() {
	return import_react$84.useContext(PanelContext);
}
function useInfo(props, panelType) {
	var prefixCls = props.prefixCls, generateConfig = props.generateConfig, locale = props.locale, disabledDate = props.disabledDate, minDate = props.minDate, maxDate = props.maxDate, cellRender = props.cellRender, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue, onHover = props.onHover, values = props.values, pickerValue = props.pickerValue, onSelect = props.onSelect, prevIcon = props.prevIcon, nextIcon = props.nextIcon, superPrevIcon = props.superPrevIcon, superNextIcon = props.superNextIcon;
	var now = generateConfig.getNow();
	return [{
		now,
		values,
		pickerValue,
		prefixCls,
		disabledDate,
		minDate,
		maxDate,
		cellRender,
		hoverValue,
		hoverRangeValue,
		onHover,
		locale,
		generateConfig,
		onSelect,
		panelType,
		prevIcon,
		nextIcon,
		superPrevIcon,
		superNextIcon
	}, now];
}
var import_react$84, PanelContext, PickerHackContext;
var init_context$2 = __esmMin((() => {
	import_react$84 = /* @__PURE__ */ __toESM(require_react());
	PanelContext = /* @__PURE__ */ import_react$84.createContext(null);
	PickerHackContext = /* @__PURE__ */ import_react$84.createContext({});
}));
function PanelBody(props) {
	var rowNum = props.rowNum, colNum = props.colNum, baseDate = props.baseDate, getCellDate = props.getCellDate, prefixColumn = props.prefixColumn, rowClassName = props.rowClassName, titleFormat = props.titleFormat, getCellText = props.getCellText, getCellClassName = props.getCellClassName, headerCells = props.headerCells, _props$cellSelection = props.cellSelection, cellSelection = _props$cellSelection === void 0 ? true : _props$cellSelection, disabledDate = props.disabledDate;
	var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, type = _usePanelContext.panelType, now = _usePanelContext.now, contextDisabledDate = _usePanelContext.disabledDate, cellRender = _usePanelContext.cellRender, onHover = _usePanelContext.onHover, hoverValue = _usePanelContext.hoverValue, hoverRangeValue = _usePanelContext.hoverRangeValue, generateConfig = _usePanelContext.generateConfig, values = _usePanelContext.values, locale = _usePanelContext.locale, onSelect = _usePanelContext.onSelect;
	var mergedDisabledDate = disabledDate || contextDisabledDate;
	var cellPrefixCls = "".concat(prefixCls, "-cell");
	var onCellDblClick = import_react$83.useContext(PickerHackContext).onCellDblClick;
	var matchValues = function matchValues$1(date) {
		return values.some(function(singleValue) {
			return singleValue && isSame(generateConfig, locale, date, singleValue, type);
		});
	};
	var rows = [];
	for (var row = 0; row < rowNum; row += 1) {
		var rowNode = [];
		var rowStartDate = void 0;
		var _loop = function _loop$1() {
			var currentDate = getCellDate(baseDate, row * colNum + col);
			var disabled = mergedDisabledDate === null || mergedDisabledDate === void 0 ? void 0 : mergedDisabledDate(currentDate, { type });
			if (col === 0) {
				rowStartDate = currentDate;
				if (prefixColumn) rowNode.push(prefixColumn(rowStartDate));
			}
			var inRange = false;
			var rangeStart = false;
			var rangeEnd = false;
			if (cellSelection && hoverRangeValue) {
				var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2), hoverStart = _hoverRangeValue[0], hoverEnd = _hoverRangeValue[1];
				inRange = isInRange(generateConfig, hoverStart, hoverEnd, currentDate);
				rangeStart = isSame(generateConfig, locale, currentDate, hoverStart, type);
				rangeEnd = isSame(generateConfig, locale, currentDate, hoverEnd, type);
			}
			var title = titleFormat ? formatValue(currentDate, {
				locale,
				format: titleFormat,
				generateConfig
			}) : void 0;
			var inner = /* @__PURE__ */ import_react$83.createElement("div", { className: "".concat(cellPrefixCls, "-inner") }, getCellText(currentDate));
			rowNode.push(/* @__PURE__ */ import_react$83.createElement("td", {
				key: col,
				title,
				className: (0, import_classnames$29.default)(cellPrefixCls, _objectSpread2(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(cellPrefixCls, "-disabled"), disabled), "".concat(cellPrefixCls, "-hover"), (hoverValue || []).some(function(date) {
					return isSame(generateConfig, locale, currentDate, date, type);
				})), "".concat(cellPrefixCls, "-in-range"), inRange && !rangeStart && !rangeEnd), "".concat(cellPrefixCls, "-range-start"), rangeStart), "".concat(cellPrefixCls, "-range-end"), rangeEnd), "".concat(prefixCls, "-cell-selected"), !hoverRangeValue && type !== "week" && matchValues(currentDate)), getCellClassName(currentDate))),
				onClick: function onClick() {
					if (!disabled) onSelect(currentDate);
				},
				onDoubleClick: function onDoubleClick() {
					if (!disabled && onCellDblClick) onCellDblClick();
				},
				onMouseEnter: function onMouseEnter() {
					if (!disabled) onHover === null || onHover === void 0 || onHover(currentDate);
				},
				onMouseLeave: function onMouseLeave() {
					if (!disabled) onHover === null || onHover === void 0 || onHover(null);
				}
			}, cellRender ? cellRender(currentDate, {
				prefixCls,
				originNode: inner,
				today: now,
				type,
				locale
			}) : inner));
		};
		for (var col = 0; col < colNum; col += 1) _loop();
		rows.push(/* @__PURE__ */ import_react$83.createElement("tr", {
			key: row,
			className: rowClassName === null || rowClassName === void 0 ? void 0 : rowClassName(rowStartDate)
		}, rowNode));
	}
	return /* @__PURE__ */ import_react$83.createElement("div", { className: "".concat(prefixCls, "-body") }, /* @__PURE__ */ import_react$83.createElement("table", { className: "".concat(prefixCls, "-content") }, headerCells && /* @__PURE__ */ import_react$83.createElement("thead", null, /* @__PURE__ */ import_react$83.createElement("tr", null, headerCells)), /* @__PURE__ */ import_react$83.createElement("tbody", null, rows)));
}
var import_classnames$29, import_react$83;
var init_PanelBody = __esmMin((() => {
	init_defineProperty();
	init_objectSpread2();
	init_slicedToArray();
	import_classnames$29 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$83 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$2();
}));
function PanelHeader(props) {
	var offset = props.offset, superOffset = props.superOffset, onChange = props.onChange, getStart = props.getStart, getEnd = props.getEnd, children = props.children;
	var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, _usePanelContext$prev = _usePanelContext.prevIcon, prevIcon = _usePanelContext$prev === void 0 ? "‹" : _usePanelContext$prev, _usePanelContext$next = _usePanelContext.nextIcon, nextIcon = _usePanelContext$next === void 0 ? "›" : _usePanelContext$next, _usePanelContext$supe = _usePanelContext.superPrevIcon, superPrevIcon = _usePanelContext$supe === void 0 ? "«" : _usePanelContext$supe, _usePanelContext$supe2 = _usePanelContext.superNextIcon, superNextIcon = _usePanelContext$supe2 === void 0 ? "»" : _usePanelContext$supe2, minDate = _usePanelContext.minDate, maxDate = _usePanelContext.maxDate, generateConfig = _usePanelContext.generateConfig, locale = _usePanelContext.locale, pickerValue = _usePanelContext.pickerValue, type = _usePanelContext.panelType;
	var headerPrefixCls = "".concat(prefixCls, "-header");
	var _React$useContext = import_react$82.useContext(PickerHackContext), hidePrev = _React$useContext.hidePrev, hideNext = _React$useContext.hideNext, hideHeader = _React$useContext.hideHeader;
	var disabledOffsetPrev = import_react$82.useMemo(function() {
		if (!minDate || !offset || !getEnd) return false;
		return !isSameOrAfter(generateConfig, locale, getEnd(offset(-1, pickerValue)), minDate, type);
	}, [
		minDate,
		offset,
		pickerValue,
		getEnd,
		generateConfig,
		locale,
		type
	]);
	var disabledSuperOffsetPrev = import_react$82.useMemo(function() {
		if (!minDate || !superOffset || !getEnd) return false;
		return !isSameOrAfter(generateConfig, locale, getEnd(superOffset(-1, pickerValue)), minDate, type);
	}, [
		minDate,
		superOffset,
		pickerValue,
		getEnd,
		generateConfig,
		locale,
		type
	]);
	var disabledOffsetNext = import_react$82.useMemo(function() {
		if (!maxDate || !offset || !getStart) return false;
		return !isSameOrAfter(generateConfig, locale, maxDate, getStart(offset(1, pickerValue)), type);
	}, [
		maxDate,
		offset,
		pickerValue,
		getStart,
		generateConfig,
		locale,
		type
	]);
	var disabledSuperOffsetNext = import_react$82.useMemo(function() {
		if (!maxDate || !superOffset || !getStart) return false;
		return !isSameOrAfter(generateConfig, locale, maxDate, getStart(superOffset(1, pickerValue)), type);
	}, [
		maxDate,
		superOffset,
		pickerValue,
		getStart,
		generateConfig,
		locale,
		type
	]);
	var onOffset = function onOffset$1(distance) {
		if (offset) onChange(offset(distance, pickerValue));
	};
	var onSuperOffset = function onSuperOffset$1(distance) {
		if (superOffset) onChange(superOffset(distance, pickerValue));
	};
	if (hideHeader) return null;
	var prevBtnCls = "".concat(headerPrefixCls, "-prev-btn");
	var nextBtnCls = "".concat(headerPrefixCls, "-next-btn");
	var superPrevBtnCls = "".concat(headerPrefixCls, "-super-prev-btn");
	var superNextBtnCls = "".concat(headerPrefixCls, "-super-next-btn");
	return /* @__PURE__ */ import_react$82.createElement("div", { className: headerPrefixCls }, superOffset && /* @__PURE__ */ import_react$82.createElement("button", {
		type: "button",
		"aria-label": locale.previousYear,
		onClick: function onClick() {
			return onSuperOffset(-1);
		},
		tabIndex: -1,
		className: (0, import_classnames$28.default)(superPrevBtnCls, disabledSuperOffsetPrev && "".concat(superPrevBtnCls, "-disabled")),
		disabled: disabledSuperOffsetPrev,
		style: hidePrev ? HIDDEN_STYLE : {}
	}, superPrevIcon), offset && /* @__PURE__ */ import_react$82.createElement("button", {
		type: "button",
		"aria-label": locale.previousMonth,
		onClick: function onClick() {
			return onOffset(-1);
		},
		tabIndex: -1,
		className: (0, import_classnames$28.default)(prevBtnCls, disabledOffsetPrev && "".concat(prevBtnCls, "-disabled")),
		disabled: disabledOffsetPrev,
		style: hidePrev ? HIDDEN_STYLE : {}
	}, prevIcon), /* @__PURE__ */ import_react$82.createElement("div", { className: "".concat(headerPrefixCls, "-view") }, children), offset && /* @__PURE__ */ import_react$82.createElement("button", {
		type: "button",
		"aria-label": locale.nextMonth,
		onClick: function onClick() {
			return onOffset(1);
		},
		tabIndex: -1,
		className: (0, import_classnames$28.default)(nextBtnCls, disabledOffsetNext && "".concat(nextBtnCls, "-disabled")),
		disabled: disabledOffsetNext,
		style: hideNext ? HIDDEN_STYLE : {}
	}, nextIcon), superOffset && /* @__PURE__ */ import_react$82.createElement("button", {
		type: "button",
		"aria-label": locale.nextYear,
		onClick: function onClick() {
			return onSuperOffset(1);
		},
		tabIndex: -1,
		className: (0, import_classnames$28.default)(superNextBtnCls, disabledSuperOffsetNext && "".concat(superNextBtnCls, "-disabled")),
		disabled: disabledSuperOffsetNext,
		style: hideNext ? HIDDEN_STYLE : {}
	}, superNextIcon));
}
var import_classnames$28, import_react$82, HIDDEN_STYLE, PanelHeader_default;
var init_PanelHeader = __esmMin((() => {
	import_classnames$28 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$82 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$2();
	HIDDEN_STYLE = { visibility: "hidden" };
	PanelHeader_default = PanelHeader;
}));
function DatePanel(props) {
	var prefixCls = props.prefixCls, _props$panelName = props.panelName, panelName = _props$panelName === void 0 ? "date" : _props$panelName, locale = props.locale, generateConfig = props.generateConfig, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange, _props$mode = props.mode, mode = _props$mode === void 0 ? "date" : _props$mode, disabledDate = props.disabledDate, onSelect = props.onSelect, onHover = props.onHover, showWeek = props.showWeek;
	var panelPrefixCls = "".concat(prefixCls, "-").concat(panelName, "-panel");
	var cellPrefixCls = "".concat(prefixCls, "-cell");
	var isWeek = mode === "week";
	var _useInfo2 = _slicedToArray(useInfo(props, mode), 2), info = _useInfo2[0], now = _useInfo2[1];
	var weekFirstDay = generateConfig.locale.getWeekFirstDay(locale.locale);
	var monthStartDate = generateConfig.setDate(pickerValue, 1);
	var baseDate = getWeekStartDate(locale.locale, generateConfig, monthStartDate);
	var month = generateConfig.getMonth(pickerValue);
	var prefixColumn = (showWeek === void 0 ? isWeek : showWeek) ? function(date) {
		var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, { type: "week" });
		return /* @__PURE__ */ import_react$81.createElement("td", {
			key: "week",
			className: (0, import_classnames$27.default)(cellPrefixCls, "".concat(cellPrefixCls, "-week"), _defineProperty({}, "".concat(cellPrefixCls, "-disabled"), disabled)),
			onClick: function onClick() {
				if (!disabled) onSelect(date);
			},
			onMouseEnter: function onMouseEnter() {
				if (!disabled) onHover === null || onHover === void 0 || onHover(date);
			},
			onMouseLeave: function onMouseLeave() {
				if (!disabled) onHover === null || onHover === void 0 || onHover(null);
			}
		}, /* @__PURE__ */ import_react$81.createElement("div", { className: "".concat(cellPrefixCls, "-inner") }, generateConfig.locale.getWeek(locale.locale, date)));
	} : null;
	var headerCells = [];
	var weekDaysLocale = locale.shortWeekDays || (generateConfig.locale.getShortWeekDays ? generateConfig.locale.getShortWeekDays(locale.locale) : []);
	if (prefixColumn) headerCells.push(/* @__PURE__ */ import_react$81.createElement("th", { key: "empty" }, /* @__PURE__ */ import_react$81.createElement("span", { style: {
		width: 0,
		height: 0,
		position: "absolute",
		overflow: "hidden",
		opacity: 0
	} }, locale.week)));
	for (var i = 0; i < 7; i += 1) headerCells.push(/* @__PURE__ */ import_react$81.createElement("th", { key: i }, weekDaysLocale[(i + weekFirstDay) % 7]));
	var getCellDate = function getCellDate$1(date, offset) {
		return generateConfig.addDate(date, offset);
	};
	var getCellText = function getCellText$1(date) {
		return formatValue(date, {
			locale,
			format: locale.cellDateFormat,
			generateConfig
		});
	};
	var getCellClassName = function getCellClassName$1(date) {
		return _defineProperty(_defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameMonth(generateConfig, date, pickerValue)), "".concat(prefixCls, "-cell-today"), isSameDate(generateConfig, date, now));
	};
	var monthsLocale = locale.shortMonths || (generateConfig.locale.getShortMonths ? generateConfig.locale.getShortMonths(locale.locale) : []);
	var yearNode = /* @__PURE__ */ import_react$81.createElement("button", {
		type: "button",
		"aria-label": locale.yearSelect,
		key: "year",
		onClick: function onClick() {
			onModeChange("year", pickerValue);
		},
		tabIndex: -1,
		className: "".concat(prefixCls, "-year-btn")
	}, formatValue(pickerValue, {
		locale,
		format: locale.yearFormat,
		generateConfig
	}));
	var monthNode = /* @__PURE__ */ import_react$81.createElement("button", {
		type: "button",
		"aria-label": locale.monthSelect,
		key: "month",
		onClick: function onClick() {
			onModeChange("month", pickerValue);
		},
		tabIndex: -1,
		className: "".concat(prefixCls, "-month-btn")
	}, locale.monthFormat ? formatValue(pickerValue, {
		locale,
		format: locale.monthFormat,
		generateConfig
	}) : monthsLocale[month]);
	var monthYearNodes = locale.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
	return /* @__PURE__ */ import_react$81.createElement(PanelContext.Provider, { value: info }, /* @__PURE__ */ import_react$81.createElement("div", { className: (0, import_classnames$27.default)(panelPrefixCls, showWeek && "".concat(panelPrefixCls, "-show-week")) }, /* @__PURE__ */ import_react$81.createElement(PanelHeader_default, {
		offset: function offset(distance) {
			return generateConfig.addMonth(pickerValue, distance);
		},
		superOffset: function superOffset(distance) {
			return generateConfig.addYear(pickerValue, distance);
		},
		onChange: onPickerValueChange,
		getStart: function getStart(date) {
			return generateConfig.setDate(date, 1);
		},
		getEnd: function getEnd(date) {
			var clone = generateConfig.setDate(date, 1);
			clone = generateConfig.addMonth(clone, 1);
			return generateConfig.addDate(clone, -1);
		}
	}, monthYearNodes), /* @__PURE__ */ import_react$81.createElement(PanelBody, _extends({ titleFormat: locale.fieldDateFormat }, props, {
		colNum: 7,
		rowNum: 6,
		baseDate,
		headerCells,
		getCellDate,
		getCellText,
		getCellClassName,
		prefixColumn,
		cellSelection: !isWeek
	}))));
}
var import_classnames$27, import_react$81;
var init_DatePanel = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	import_classnames$27 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$81 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$2();
	init_PanelBody();
	init_PanelHeader();
}));
function useScrollTo(ulRef, value) {
	var scrollingRef = import_react$80.useRef(false);
	var scrollRafRef = import_react$80.useRef(null);
	var scrollDistRef = import_react$80.useRef(null);
	var isScrolling = function isScrolling$1() {
		return scrollingRef.current;
	};
	var stopScroll = function stopScroll$1() {
		raf_default.cancel(scrollRafRef.current);
		scrollingRef.current = false;
	};
	var scrollRafTimesRef = import_react$80.useRef();
	return [
		useEvent(function startScroll() {
			var ul = ulRef.current;
			scrollDistRef.current = null;
			scrollRafTimesRef.current = 0;
			if (ul) {
				var targetLi = ul.querySelector("[data-value=\"".concat(value, "\"]"));
				var firstLi = ul.querySelector("li");
				var doScroll = function doScroll$1() {
					stopScroll();
					scrollingRef.current = true;
					scrollRafTimesRef.current += 1;
					var currentTop = ul.scrollTop;
					var firstLiTop = firstLi.offsetTop;
					var targetLiTop = targetLi.offsetTop;
					var targetTop = targetLiTop - firstLiTop;
					if (targetLiTop === 0 && targetLi !== firstLi || !isVisible_default(ul)) {
						if (scrollRafTimesRef.current <= 5) scrollRafRef.current = raf_default(doScroll$1);
						return;
					}
					var nextTop = currentTop + (targetTop - currentTop) * SPEED_PTG;
					var dist = Math.abs(targetTop - nextTop);
					if (scrollDistRef.current !== null && scrollDistRef.current < dist) {
						stopScroll();
						return;
					}
					scrollDistRef.current = dist;
					if (dist <= 1) {
						ul.scrollTop = targetTop;
						stopScroll();
						return;
					}
					ul.scrollTop = nextTop;
					scrollRafRef.current = raf_default(doScroll$1);
				};
				if (targetLi && firstLi) doScroll();
			}
		}),
		stopScroll,
		isScrolling
	];
}
var import_react$80, SPEED_PTG;
var init_useScrollTo = __esmMin((() => {
	init_es$6();
	init_raf();
	init_isVisible();
	import_react$80 = /* @__PURE__ */ __toESM(require_react());
	SPEED_PTG = 1 / 3;
}));
function flattenUnits(units) {
	return units.map(function(_ref) {
		return [
			_ref.value,
			_ref.label,
			_ref.disabled
		].join(",");
	}).join(";");
}
function TimeColumn(props) {
	var units = props.units, value = props.value, optionalValue = props.optionalValue, type = props.type, onChange = props.onChange, onHover = props.onHover, onDblClick = props.onDblClick, changeOnScroll = props.changeOnScroll;
	var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, cellRender = _usePanelContext.cellRender, now = _usePanelContext.now, locale = _usePanelContext.locale;
	var panelPrefixCls = "".concat(prefixCls, "-time-panel");
	var cellPrefixCls = "".concat(prefixCls, "-time-panel-cell");
	var ulRef = import_react$79.useRef(null);
	var checkDelayRef = import_react$79.useRef();
	var clearDelayCheck = function clearDelayCheck$1() {
		clearTimeout(checkDelayRef.current);
	};
	var _useScrollTo2 = _slicedToArray(useScrollTo(ulRef, value !== null && value !== void 0 ? value : optionalValue), 3), syncScroll = _useScrollTo2[0], stopScroll = _useScrollTo2[1], isScrolling = _useScrollTo2[2];
	useLayoutEffect_default(function() {
		syncScroll();
		clearDelayCheck();
		return function() {
			stopScroll();
			clearDelayCheck();
		};
	}, [
		value,
		optionalValue,
		flattenUnits(units)
	]);
	var onInternalScroll = function onInternalScroll$1(event) {
		clearDelayCheck();
		var target = event.target;
		if (!isScrolling() && changeOnScroll) checkDelayRef.current = setTimeout(function() {
			var ul = ulRef.current;
			var firstLiTop = ul.querySelector("li").offsetTop;
			var liDistList = Array.from(ul.querySelectorAll("li")).map(function(li) {
				return li.offsetTop - firstLiTop;
			}).map(function(top, index) {
				if (units[index].disabled) return Number.MAX_SAFE_INTEGER;
				return Math.abs(top - target.scrollTop);
			});
			var minDist = Math.min.apply(Math, _toConsumableArray(liDistList));
			var targetUnit = units[liDistList.findIndex(function(dist) {
				return dist === minDist;
			})];
			if (targetUnit && !targetUnit.disabled) onChange(targetUnit.value);
		}, SCROLL_DELAY);
	};
	var columnPrefixCls = "".concat(panelPrefixCls, "-column");
	return /* @__PURE__ */ import_react$79.createElement("ul", {
		className: columnPrefixCls,
		ref: ulRef,
		"data-type": type,
		onScroll: onInternalScroll
	}, units.map(function(_ref2) {
		var label = _ref2.label, unitValue = _ref2.value, disabled = _ref2.disabled;
		var inner = /* @__PURE__ */ import_react$79.createElement("div", { className: "".concat(cellPrefixCls, "-inner") }, label);
		return /* @__PURE__ */ import_react$79.createElement("li", {
			key: unitValue,
			className: (0, import_classnames$26.default)(cellPrefixCls, _defineProperty(_defineProperty({}, "".concat(cellPrefixCls, "-selected"), value === unitValue), "".concat(cellPrefixCls, "-disabled"), disabled)),
			onClick: function onClick() {
				if (!disabled) onChange(unitValue);
			},
			onDoubleClick: function onDoubleClick() {
				if (!disabled && onDblClick) onDblClick();
			},
			onMouseEnter: function onMouseEnter() {
				onHover(unitValue);
			},
			onMouseLeave: function onMouseLeave() {
				onHover(null);
			},
			"data-value": unitValue
		}, cellRender ? cellRender(unitValue, {
			prefixCls,
			originNode: inner,
			today: now,
			type: "time",
			subType: type,
			locale
		}) : inner);
	}));
}
var import_classnames$26, import_react$79, SCROLL_DELAY;
var init_TimeColumn = __esmMin((() => {
	init_defineProperty();
	init_toConsumableArray();
	init_slicedToArray();
	import_classnames$26 = /* @__PURE__ */ __toESM(require_classnames());
	init_useLayoutEffect();
	import_react$79 = /* @__PURE__ */ __toESM(require_react());
	init_context$2();
	init_useScrollTo();
	SCROLL_DELAY = 300;
}));
function isAM(hour) {
	return hour < 12;
}
function TimePanelBody(props) {
	var showHour = props.showHour, showMinute = props.showMinute, showSecond = props.showSecond, showMillisecond = props.showMillisecond, showMeridiem = props.use12Hours, changeOnScroll = props.changeOnScroll;
	var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, values = _usePanelContext.values, generateConfig = _usePanelContext.generateConfig, locale = _usePanelContext.locale, onSelect = _usePanelContext.onSelect, _usePanelContext$onHo = _usePanelContext.onHover, onHover = _usePanelContext$onHo === void 0 ? function() {} : _usePanelContext$onHo, pickerValue = _usePanelContext.pickerValue;
	var value = (values === null || values === void 0 ? void 0 : values[0]) || null;
	var onCellDblClick = import_react$78.useContext(PickerHackContext).onCellDblClick;
	var _useTimeInfo2 = _slicedToArray(useTimeInfo(generateConfig, props, value), 5), getValidTime = _useTimeInfo2[0], rowHourUnits = _useTimeInfo2[1], getMinuteUnits = _useTimeInfo2[2], getSecondUnits = _useTimeInfo2[3], getMillisecondUnits = _useTimeInfo2[4];
	var getUnitValue$1 = function getUnitValue$2(func) {
		return [value && generateConfig[func](value), pickerValue && generateConfig[func](pickerValue)];
	};
	var _getUnitValue2 = _slicedToArray(getUnitValue$1("getHour"), 2), hour = _getUnitValue2[0], pickerHour = _getUnitValue2[1];
	var _getUnitValue4 = _slicedToArray(getUnitValue$1("getMinute"), 2), minute = _getUnitValue4[0], pickerMinute = _getUnitValue4[1];
	var _getUnitValue6 = _slicedToArray(getUnitValue$1("getSecond"), 2), second = _getUnitValue6[0], pickerSecond = _getUnitValue6[1];
	var _getUnitValue8 = _slicedToArray(getUnitValue$1("getMillisecond"), 2), millisecond = _getUnitValue8[0], pickerMillisecond = _getUnitValue8[1];
	var meridiem = hour === null ? null : isAM(hour) ? "am" : "pm";
	var hourUnits = import_react$78.useMemo(function() {
		if (!showMeridiem) return rowHourUnits;
		return isAM(hour) ? rowHourUnits.filter(function(h) {
			return isAM(h.value);
		}) : rowHourUnits.filter(function(h) {
			return !isAM(h.value);
		});
	}, [
		hour,
		rowHourUnits,
		showMeridiem
	]);
	var getEnabled = function getEnabled$1(units, val) {
		var _enabledUnits$;
		var enabledUnits = units.filter(function(unit) {
			return !unit.disabled;
		});
		return val !== null && val !== void 0 ? val : enabledUnits === null || enabledUnits === void 0 || (_enabledUnits$ = enabledUnits[0]) === null || _enabledUnits$ === void 0 ? void 0 : _enabledUnits$.value;
	};
	var validHour = getEnabled(rowHourUnits, hour);
	var minuteUnits = import_react$78.useMemo(function() {
		return getMinuteUnits(validHour);
	}, [getMinuteUnits, validHour]);
	var validMinute = getEnabled(minuteUnits, minute);
	var secondUnits = import_react$78.useMemo(function() {
		return getSecondUnits(validHour, validMinute);
	}, [
		getSecondUnits,
		validHour,
		validMinute
	]);
	var validSecond = getEnabled(secondUnits, second);
	var millisecondUnits = import_react$78.useMemo(function() {
		return getMillisecondUnits(validHour, validMinute, validSecond);
	}, [
		getMillisecondUnits,
		validHour,
		validMinute,
		validSecond
	]);
	var validMillisecond = getEnabled(millisecondUnits, millisecond);
	var meridiemUnits = import_react$78.useMemo(function() {
		if (!showMeridiem) return [];
		var base = generateConfig.getNow();
		var amDate = generateConfig.setHour(base, 6);
		var pmDate = generateConfig.setHour(base, 18);
		var formatMeridiem = function formatMeridiem$1(date, defaultLabel) {
			var cellMeridiemFormat = locale.cellMeridiemFormat;
			return cellMeridiemFormat ? formatValue(date, {
				generateConfig,
				locale,
				format: cellMeridiemFormat
			}) : defaultLabel;
		};
		return [{
			label: formatMeridiem(amDate, "AM"),
			value: "am",
			disabled: rowHourUnits.every(function(h) {
				return h.disabled || !isAM(h.value);
			})
		}, {
			label: formatMeridiem(pmDate, "PM"),
			value: "pm",
			disabled: rowHourUnits.every(function(h) {
				return h.disabled || isAM(h.value);
			})
		}];
	}, [
		rowHourUnits,
		showMeridiem,
		generateConfig,
		locale
	]);
	var triggerChange = function triggerChange$1(nextDate) {
		onSelect(getValidTime(nextDate));
	};
	var triggerDateTmpl = import_react$78.useMemo(function() {
		var tmpl = value || pickerValue || generateConfig.getNow();
		var isNotNull = function isNotNull$1(num) {
			return num !== null && num !== void 0;
		};
		if (isNotNull(hour)) {
			tmpl = generateConfig.setHour(tmpl, hour);
			tmpl = generateConfig.setMinute(tmpl, minute);
			tmpl = generateConfig.setSecond(tmpl, second);
			tmpl = generateConfig.setMillisecond(tmpl, millisecond);
		} else if (isNotNull(pickerHour)) {
			tmpl = generateConfig.setHour(tmpl, pickerHour);
			tmpl = generateConfig.setMinute(tmpl, pickerMinute);
			tmpl = generateConfig.setSecond(tmpl, pickerSecond);
			tmpl = generateConfig.setMillisecond(tmpl, pickerMillisecond);
		} else if (isNotNull(validHour)) {
			tmpl = generateConfig.setHour(tmpl, validHour);
			tmpl = generateConfig.setMinute(tmpl, validMinute);
			tmpl = generateConfig.setSecond(tmpl, validSecond);
			tmpl = generateConfig.setMillisecond(tmpl, validMillisecond);
		}
		return tmpl;
	}, [
		value,
		pickerValue,
		hour,
		minute,
		second,
		millisecond,
		validHour,
		validMinute,
		validSecond,
		validMillisecond,
		pickerHour,
		pickerMinute,
		pickerSecond,
		pickerMillisecond,
		generateConfig
	]);
	var fillColumnValue = function fillColumnValue$1(val, func) {
		if (val === null) return null;
		return generateConfig[func](triggerDateTmpl, val);
	};
	var getNextHourTime = function getNextHourTime$1(val) {
		return fillColumnValue(val, "setHour");
	};
	var getNextMinuteTime = function getNextMinuteTime$1(val) {
		return fillColumnValue(val, "setMinute");
	};
	var getNextSecondTime = function getNextSecondTime$1(val) {
		return fillColumnValue(val, "setSecond");
	};
	var getNextMillisecondTime = function getNextMillisecondTime$1(val) {
		return fillColumnValue(val, "setMillisecond");
	};
	var getMeridiemTime = function getMeridiemTime$1(val) {
		if (val === null) return null;
		if (val === "am" && !isAM(hour)) return generateConfig.setHour(triggerDateTmpl, hour - 12);
		else if (val === "pm" && isAM(hour)) return generateConfig.setHour(triggerDateTmpl, hour + 12);
		return triggerDateTmpl;
	};
	var onHourChange = function onHourChange$1(val) {
		triggerChange(getNextHourTime(val));
	};
	var onMinuteChange = function onMinuteChange$1(val) {
		triggerChange(getNextMinuteTime(val));
	};
	var onSecondChange = function onSecondChange$1(val) {
		triggerChange(getNextSecondTime(val));
	};
	var onMillisecondChange = function onMillisecondChange$1(val) {
		triggerChange(getNextMillisecondTime(val));
	};
	var onMeridiemChange = function onMeridiemChange$1(val) {
		triggerChange(getMeridiemTime(val));
	};
	var onHourHover = function onHourHover$1(val) {
		onHover(getNextHourTime(val));
	};
	var onMinuteHover = function onMinuteHover$1(val) {
		onHover(getNextMinuteTime(val));
	};
	var onSecondHover = function onSecondHover$1(val) {
		onHover(getNextSecondTime(val));
	};
	var onMillisecondHover = function onMillisecondHover$1(val) {
		onHover(getNextMillisecondTime(val));
	};
	var onMeridiemHover = function onMeridiemHover$1(val) {
		onHover(getMeridiemTime(val));
	};
	var sharedColumnProps = {
		onDblClick: onCellDblClick,
		changeOnScroll
	};
	return /* @__PURE__ */ import_react$78.createElement("div", { className: "".concat(prefixCls, "-content") }, showHour && /* @__PURE__ */ import_react$78.createElement(TimeColumn, _extends({
		units: hourUnits,
		value: hour,
		optionalValue: pickerHour,
		type: "hour",
		onChange: onHourChange,
		onHover: onHourHover
	}, sharedColumnProps)), showMinute && /* @__PURE__ */ import_react$78.createElement(TimeColumn, _extends({
		units: minuteUnits,
		value: minute,
		optionalValue: pickerMinute,
		type: "minute",
		onChange: onMinuteChange,
		onHover: onMinuteHover
	}, sharedColumnProps)), showSecond && /* @__PURE__ */ import_react$78.createElement(TimeColumn, _extends({
		units: secondUnits,
		value: second,
		optionalValue: pickerSecond,
		type: "second",
		onChange: onSecondChange,
		onHover: onSecondHover
	}, sharedColumnProps)), showMillisecond && /* @__PURE__ */ import_react$78.createElement(TimeColumn, _extends({
		units: millisecondUnits,
		value: millisecond,
		optionalValue: pickerMillisecond,
		type: "millisecond",
		onChange: onMillisecondChange,
		onHover: onMillisecondHover
	}, sharedColumnProps)), showMeridiem && /* @__PURE__ */ import_react$78.createElement(TimeColumn, _extends({
		units: meridiemUnits,
		value: meridiem,
		type: "meridiem",
		onChange: onMeridiemChange,
		onHover: onMeridiemHover
	}, sharedColumnProps)));
}
var import_react$78;
var init_TimePanelBody = __esmMin((() => {
	init_extends();
	init_slicedToArray();
	import_react$78 = /* @__PURE__ */ __toESM(require_react());
	init_useTimeInfo();
	init_dateUtil();
	init_context$2();
	init_TimeColumn();
}));
function TimePanel(props) {
	var prefixCls = props.prefixCls, value = props.value, locale = props.locale, generateConfig = props.generateConfig, showTime = props.showTime;
	var format = (showTime || {}).format;
	var panelPrefixCls = "".concat(prefixCls, "-time-panel");
	var info = _slicedToArray(useInfo(props, "time"), 1)[0];
	return /* @__PURE__ */ import_react$77.createElement(PanelContext.Provider, { value: info }, /* @__PURE__ */ import_react$77.createElement("div", { className: (0, import_classnames$25.default)(panelPrefixCls) }, /* @__PURE__ */ import_react$77.createElement(PanelHeader_default, null, value ? formatValue(value, {
		locale,
		format,
		generateConfig
	}) : "\xA0"), /* @__PURE__ */ import_react$77.createElement(TimePanelBody, showTime)));
}
var import_classnames$25, import_react$77;
var init_TimePanel = __esmMin((() => {
	init_slicedToArray();
	import_classnames$25 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$77 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$2();
	init_PanelHeader();
	init_TimePanelBody();
}));
function DateTimePanel(props) {
	var prefixCls = props.prefixCls, generateConfig = props.generateConfig, showTime = props.showTime, onSelect = props.onSelect, value = props.value, pickerValue = props.pickerValue, onHover = props.onHover;
	var panelPrefixCls = "".concat(prefixCls, "-datetime-panel");
	var getValidTime = _slicedToArray(useTimeInfo(generateConfig, showTime), 1)[0];
	var mergeTime = function mergeTime$1(date) {
		if (value) return fillTime(generateConfig, date, value);
		return fillTime(generateConfig, date, pickerValue);
	};
	return /* @__PURE__ */ import_react$76.createElement("div", { className: panelPrefixCls }, /* @__PURE__ */ import_react$76.createElement(DatePanel, _extends({}, props, {
		onSelect: function onDateSelect(date) {
			var cloneDate = mergeTime(date);
			onSelect(getValidTime(cloneDate, cloneDate));
		},
		onHover: function onDateHover(date) {
			onHover === null || onHover === void 0 || onHover(date ? mergeTime(date) : date);
		}
	})), /* @__PURE__ */ import_react$76.createElement(TimePanel, props));
}
var import_react$76;
var init_DateTimePanel = __esmMin((() => {
	init_extends();
	init_slicedToArray();
	import_react$76 = /* @__PURE__ */ __toESM(require_react());
	init_useTimeInfo();
	init_dateUtil();
	init_DatePanel();
	init_TimePanel();
}));
function DecadePanel(props) {
	var prefixCls = props.prefixCls, locale = props.locale, generateConfig = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange;
	var panelPrefixCls = "".concat(prefixCls, "-decade-panel");
	var info = _slicedToArray(useInfo(props, "decade"), 1)[0];
	var getStartYear = function getStartYear$1(date) {
		var startYear = Math.floor(generateConfig.getYear(date) / 100) * 100;
		return generateConfig.setYear(date, startYear);
	};
	var getEndYear = function getEndYear$1(date) {
		var startYear = getStartYear(date);
		return generateConfig.addYear(startYear, 99);
	};
	var startYearDate = getStartYear(pickerValue);
	var endYearDate = getEndYear(pickerValue);
	var baseDate = generateConfig.addYear(startYearDate, -10);
	var getCellDate = function getCellDate$1(date, offset) {
		return generateConfig.addYear(date, offset * 10);
	};
	var getCellText = function getCellText$1(date) {
		var cellYearFormat = locale.cellYearFormat;
		var startYearStr = formatValue(date, {
			locale,
			format: cellYearFormat,
			generateConfig
		});
		var endYearStr = formatValue(generateConfig.addYear(date, 9), {
			locale,
			format: cellYearFormat,
			generateConfig
		});
		return "".concat(startYearStr, "-").concat(endYearStr);
	};
	var getCellClassName = function getCellClassName$1(date) {
		return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameDecade(generateConfig, date, startYearDate) || isSameDecade(generateConfig, date, endYearDate) || isInRange(generateConfig, startYearDate, endYearDate, date));
	};
	var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
		var baseStartDate = generateConfig.setDate(currentDate, 1);
		var baseStartMonth = generateConfig.setMonth(baseStartDate, 0);
		var baseStartYear = generateConfig.setYear(baseStartMonth, Math.floor(generateConfig.getYear(baseStartMonth) / 10) * 10);
		var baseEndYear = generateConfig.addYear(baseStartYear, 10);
		var baseEndDate = generateConfig.addDate(baseEndYear, -1);
		return disabledDate(baseStartYear, disabledInfo) && disabledDate(baseEndDate, disabledInfo);
	} : null;
	var yearNode = "".concat(formatValue(startYearDate, {
		locale,
		format: locale.yearFormat,
		generateConfig
	}), "-").concat(formatValue(endYearDate, {
		locale,
		format: locale.yearFormat,
		generateConfig
	}));
	return /* @__PURE__ */ import_react$75.createElement(PanelContext.Provider, { value: info }, /* @__PURE__ */ import_react$75.createElement("div", { className: panelPrefixCls }, /* @__PURE__ */ import_react$75.createElement(PanelHeader_default, {
		superOffset: function superOffset(distance) {
			return generateConfig.addYear(pickerValue, distance * 100);
		},
		onChange: onPickerValueChange,
		getStart: getStartYear,
		getEnd: getEndYear
	}, yearNode), /* @__PURE__ */ import_react$75.createElement(PanelBody, _extends({}, props, {
		disabledDate: mergedDisabledDate,
		colNum: 3,
		rowNum: 4,
		baseDate,
		getCellDate,
		getCellText,
		getCellClassName
	}))));
}
var import_react$75;
var init_DecadePanel = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	import_react$75 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$2();
	init_PanelBody();
	init_PanelHeader();
}));
function MonthPanel(props) {
	var prefixCls = props.prefixCls, locale = props.locale, generateConfig = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
	var panelPrefixCls = "".concat(prefixCls, "-month-panel");
	var info = _slicedToArray(useInfo(props, "month"), 1)[0];
	var baseDate = generateConfig.setMonth(pickerValue, 0);
	var monthsLocale = locale.shortMonths || (generateConfig.locale.getShortMonths ? generateConfig.locale.getShortMonths(locale.locale) : []);
	var getCellDate = function getCellDate$1(date, offset) {
		return generateConfig.addMonth(date, offset);
	};
	var getCellText = function getCellText$1(date) {
		var month = generateConfig.getMonth(date);
		return locale.monthFormat ? formatValue(date, {
			locale,
			format: locale.monthFormat,
			generateConfig
		}) : monthsLocale[month];
	};
	var getCellClassName = function getCellClassName$1() {
		return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), true);
	};
	var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
		var startDate = generateConfig.setDate(currentDate, 1);
		var nextMonthStartDate = generateConfig.setMonth(startDate, generateConfig.getMonth(startDate) + 1);
		var endDate = generateConfig.addDate(nextMonthStartDate, -1);
		return disabledDate(startDate, disabledInfo) && disabledDate(endDate, disabledInfo);
	} : null;
	var yearNode = /* @__PURE__ */ import_react$74.createElement("button", {
		type: "button",
		key: "year",
		"aria-label": locale.yearSelect,
		onClick: function onClick() {
			onModeChange("year");
		},
		tabIndex: -1,
		className: "".concat(prefixCls, "-year-btn")
	}, formatValue(pickerValue, {
		locale,
		format: locale.yearFormat,
		generateConfig
	}));
	return /* @__PURE__ */ import_react$74.createElement(PanelContext.Provider, { value: info }, /* @__PURE__ */ import_react$74.createElement("div", { className: panelPrefixCls }, /* @__PURE__ */ import_react$74.createElement(PanelHeader_default, {
		superOffset: function superOffset(distance) {
			return generateConfig.addYear(pickerValue, distance);
		},
		onChange: onPickerValueChange,
		getStart: function getStart(date) {
			return generateConfig.setMonth(date, 0);
		},
		getEnd: function getEnd(date) {
			return generateConfig.setMonth(date, 11);
		}
	}, yearNode), /* @__PURE__ */ import_react$74.createElement(PanelBody, _extends({}, props, {
		disabledDate: mergedDisabledDate,
		titleFormat: locale.fieldMonthFormat,
		colNum: 3,
		rowNum: 4,
		baseDate,
		getCellDate,
		getCellText,
		getCellClassName
	}))));
}
var import_react$74;
var init_MonthPanel = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	import_react$74 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$2();
	init_PanelBody();
	init_PanelHeader();
}));
function QuarterPanel(props) {
	var prefixCls = props.prefixCls, locale = props.locale, generateConfig = props.generateConfig, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
	var panelPrefixCls = "".concat(prefixCls, "-quarter-panel");
	var info = _slicedToArray(useInfo(props, "quarter"), 1)[0];
	var baseDate = generateConfig.setMonth(pickerValue, 0);
	var getCellDate = function getCellDate$1(date, offset) {
		return generateConfig.addMonth(date, offset * 3);
	};
	var getCellText = function getCellText$1(date) {
		return formatValue(date, {
			locale,
			format: locale.cellQuarterFormat,
			generateConfig
		});
	};
	var getCellClassName = function getCellClassName$1() {
		return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), true);
	};
	var yearNode = /* @__PURE__ */ import_react$73.createElement("button", {
		type: "button",
		key: "year",
		"aria-label": locale.yearSelect,
		onClick: function onClick() {
			onModeChange("year");
		},
		tabIndex: -1,
		className: "".concat(prefixCls, "-year-btn")
	}, formatValue(pickerValue, {
		locale,
		format: locale.yearFormat,
		generateConfig
	}));
	return /* @__PURE__ */ import_react$73.createElement(PanelContext.Provider, { value: info }, /* @__PURE__ */ import_react$73.createElement("div", { className: panelPrefixCls }, /* @__PURE__ */ import_react$73.createElement(PanelHeader_default, {
		superOffset: function superOffset(distance) {
			return generateConfig.addYear(pickerValue, distance);
		},
		onChange: onPickerValueChange,
		getStart: function getStart(date) {
			return generateConfig.setMonth(date, 0);
		},
		getEnd: function getEnd(date) {
			return generateConfig.setMonth(date, 11);
		}
	}, yearNode), /* @__PURE__ */ import_react$73.createElement(PanelBody, _extends({}, props, {
		titleFormat: locale.fieldQuarterFormat,
		colNum: 4,
		rowNum: 1,
		baseDate,
		getCellDate,
		getCellText,
		getCellClassName
	}))));
}
var import_react$73;
var init_QuarterPanel = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	import_react$73 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$2();
	init_PanelBody();
	init_PanelHeader();
}));
function WeekPanel(props) {
	var prefixCls = props.prefixCls, generateConfig = props.generateConfig, locale = props.locale, value = props.value, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue;
	var localeName = locale.locale;
	var rowPrefixCls = "".concat(prefixCls, "-week-panel-row");
	return /* @__PURE__ */ import_react$72.createElement(DatePanel, _extends({}, props, {
		mode: "week",
		panelName: "week",
		rowClassName: function rowClassName(currentDate) {
			var rangeCls = {};
			if (hoverRangeValue) {
				var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2), rangeStart = _hoverRangeValue[0], rangeEnd = _hoverRangeValue[1];
				var isRangeStart = isSameWeek(generateConfig, localeName, rangeStart, currentDate);
				var isRangeEnd = isSameWeek(generateConfig, localeName, rangeEnd, currentDate);
				rangeCls["".concat(rowPrefixCls, "-range-start")] = isRangeStart;
				rangeCls["".concat(rowPrefixCls, "-range-end")] = isRangeEnd;
				rangeCls["".concat(rowPrefixCls, "-range-hover")] = !isRangeStart && !isRangeEnd && isInRange(generateConfig, rangeStart, rangeEnd, currentDate);
			}
			if (hoverValue) rangeCls["".concat(rowPrefixCls, "-hover")] = hoverValue.some(function(date) {
				return isSameWeek(generateConfig, localeName, currentDate, date);
			});
			return (0, import_classnames$24.default)(rowPrefixCls, _defineProperty({}, "".concat(rowPrefixCls, "-selected"), !hoverRangeValue && isSameWeek(generateConfig, localeName, value, currentDate)), rangeCls);
		}
	}));
}
var import_classnames$24, import_react$72;
var init_WeekPanel = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	import_classnames$24 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$72 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_DatePanel();
}));
function YearPanel(props) {
	var prefixCls = props.prefixCls, locale = props.locale, generateConfig = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
	var panelPrefixCls = "".concat(prefixCls, "-year-panel");
	var info = _slicedToArray(useInfo(props, "year"), 1)[0];
	var getStartYear = function getStartYear$1(date) {
		var startYear = Math.floor(generateConfig.getYear(date) / 10) * 10;
		return generateConfig.setYear(date, startYear);
	};
	var getEndYear = function getEndYear$1(date) {
		var startYear = getStartYear(date);
		return generateConfig.addYear(startYear, 9);
	};
	var startYearDate = getStartYear(pickerValue);
	var endYearDate = getEndYear(pickerValue);
	var baseDate = generateConfig.addYear(startYearDate, -1);
	var getCellDate = function getCellDate$1(date, offset) {
		return generateConfig.addYear(date, offset);
	};
	var getCellText = function getCellText$1(date) {
		return formatValue(date, {
			locale,
			format: locale.cellYearFormat,
			generateConfig
		});
	};
	var getCellClassName = function getCellClassName$1(date) {
		return _defineProperty({}, "".concat(prefixCls, "-cell-in-view"), isSameYear(generateConfig, date, startYearDate) || isSameYear(generateConfig, date, endYearDate) || isInRange(generateConfig, startYearDate, endYearDate, date));
	};
	var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
		var startMonth = generateConfig.setMonth(currentDate, 0);
		var startDate = generateConfig.setDate(startMonth, 1);
		var endMonth = generateConfig.addYear(startDate, 1);
		var endDate = generateConfig.addDate(endMonth, -1);
		return disabledDate(startDate, disabledInfo) && disabledDate(endDate, disabledInfo);
	} : null;
	var yearNode = /* @__PURE__ */ import_react$71.createElement("button", {
		type: "button",
		key: "decade",
		"aria-label": locale.decadeSelect,
		onClick: function onClick() {
			onModeChange("decade");
		},
		tabIndex: -1,
		className: "".concat(prefixCls, "-decade-btn")
	}, formatValue(startYearDate, {
		locale,
		format: locale.yearFormat,
		generateConfig
	}), "-", formatValue(endYearDate, {
		locale,
		format: locale.yearFormat,
		generateConfig
	}));
	return /* @__PURE__ */ import_react$71.createElement(PanelContext.Provider, { value: info }, /* @__PURE__ */ import_react$71.createElement("div", { className: panelPrefixCls }, /* @__PURE__ */ import_react$71.createElement(PanelHeader_default, {
		superOffset: function superOffset(distance) {
			return generateConfig.addYear(pickerValue, distance * 10);
		},
		onChange: onPickerValueChange,
		getStart: getStartYear,
		getEnd: getEndYear
	}, yearNode), /* @__PURE__ */ import_react$71.createElement(PanelBody, _extends({}, props, {
		disabledDate: mergedDisabledDate,
		titleFormat: locale.fieldYearFormat,
		colNum: 3,
		rowNum: 4,
		baseDate,
		getCellDate,
		getCellText,
		getCellClassName
	}))));
}
var import_react$71;
var init_YearPanel = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	import_react$71 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$2();
	init_PanelBody();
	init_PanelHeader();
}));
function PickerPanel(props, ref) {
	var _React$useContext;
	var locale = props.locale, generateConfig = props.generateConfig, direction = props.direction, prefixCls = props.prefixCls, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, multiple = props.multiple, defaultValue = props.defaultValue, value = props.value, onChange = props.onChange, onSelect = props.onSelect, defaultPickerValue = props.defaultPickerValue, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, mode = props.mode, onPanelChange = props.onPanelChange, _props$picker = props.picker, picker = _props$picker === void 0 ? "date" : _props$picker, showTime = props.showTime, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue, cellRender = props.cellRender, dateRender = props.dateRender, monthCellRender = props.monthCellRender, _props$components = props.components, components = _props$components === void 0 ? {} : _props$components, hideHeader = props.hideHeader;
	var mergedPrefixCls = ((_React$useContext = import_react$70.useContext(context_default)) === null || _React$useContext === void 0 ? void 0 : _React$useContext.prefixCls) || prefixCls || "rc-picker";
	var rootRef = import_react$70.useRef();
	import_react$70.useImperativeHandle(ref, function() {
		return { nativeElement: rootRef.current };
	});
	var _getTimeProps2 = _slicedToArray(getTimeProps(props), 4), timeProps = _getTimeProps2[0], localeTimeProps = _getTimeProps2[1], showTimeFormat = _getTimeProps2[2], propFormat = _getTimeProps2[3];
	var filledLocale = useLocale(locale, localeTimeProps);
	var internalPicker = picker === "date" && showTime ? "datetime" : picker;
	var mergedShowTime = import_react$70.useMemo(function() {
		return fillShowTimeConfig(internalPicker, showTimeFormat, propFormat, timeProps, filledLocale);
	}, [
		internalPicker,
		showTimeFormat,
		propFormat,
		timeProps,
		filledLocale
	]);
	var now = generateConfig.getNow();
	var _useMergedState2 = _slicedToArray(useMergedState(picker, {
		value: mode,
		postState: function postState(val) {
			return val || "date";
		}
	}), 2), mergedMode = _useMergedState2[0], setMergedMode = _useMergedState2[1];
	var internalMode = mergedMode === "date" && mergedShowTime ? "datetime" : mergedMode;
	var toggleDates = useToggleDates(generateConfig, locale, internalPicker);
	var _useMergedState4 = _slicedToArray(useMergedState(defaultValue, { value }), 2), innerValue = _useMergedState4[0], setMergedValue = _useMergedState4[1];
	var mergedValue = import_react$70.useMemo(function() {
		var values = toArray$2(innerValue).filter(function(val) {
			return val;
		});
		return multiple ? values : values.slice(0, 1);
	}, [innerValue, multiple]);
	var triggerChange = useEvent(function(nextValue) {
		setMergedValue(nextValue);
		if (onChange && (nextValue === null || mergedValue.length !== nextValue.length || mergedValue.some(function(ori, index) {
			return !isSame(generateConfig, locale, ori, nextValue[index], internalPicker);
		}))) onChange === null || onChange === void 0 || onChange(multiple ? nextValue : nextValue[0]);
	});
	var onInternalSelect = useEvent(function(newDate) {
		onSelect === null || onSelect === void 0 || onSelect(newDate);
		if (mergedMode === picker) triggerChange(multiple ? toggleDates(mergedValue, newDate) : [newDate]);
	});
	var _useMergedState6 = _slicedToArray(useMergedState(defaultPickerValue || mergedValue[0] || now, { value: pickerValue }), 2), mergedPickerValue = _useMergedState6[0], setInternalPickerValue = _useMergedState6[1];
	import_react$70.useEffect(function() {
		if (mergedValue[0] && !pickerValue) setInternalPickerValue(mergedValue[0]);
	}, [mergedValue[0]]);
	var triggerPanelChange = function triggerPanelChange$1(viewDate, nextMode) {
		onPanelChange === null || onPanelChange === void 0 || onPanelChange(viewDate || pickerValue, nextMode || mergedMode);
	};
	var setPickerValue = function setPickerValue$1(nextPickerValue) {
		var triggerPanelEvent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
		setInternalPickerValue(nextPickerValue);
		onPickerValueChange === null || onPickerValueChange === void 0 || onPickerValueChange(nextPickerValue);
		if (triggerPanelEvent) triggerPanelChange(nextPickerValue);
	};
	var triggerModeChange = function triggerModeChange$1(nextMode, viewDate) {
		setMergedMode(nextMode);
		if (viewDate) setPickerValue(viewDate);
		triggerPanelChange(viewDate, nextMode);
	};
	var onPanelValueSelect = function onPanelValueSelect$1(nextValue) {
		onInternalSelect(nextValue);
		setPickerValue(nextValue);
		if (mergedMode !== picker) {
			var decadeYearQueue = ["decade", "year"];
			var decadeYearMonthQueue = [].concat(decadeYearQueue, ["month"]);
			var queue = {
				quarter: [].concat(decadeYearQueue, ["quarter"]),
				week: [].concat(_toConsumableArray(decadeYearMonthQueue), ["week"]),
				date: [].concat(_toConsumableArray(decadeYearMonthQueue), ["date"])
			}[picker] || decadeYearMonthQueue;
			var nextMode = queue[queue.indexOf(mergedMode) + 1];
			if (nextMode) triggerModeChange(nextMode, nextValue);
		}
	};
	var hoverRangeDate = import_react$70.useMemo(function() {
		var start;
		var end;
		if (Array.isArray(hoverRangeValue)) {
			var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2);
			start = _hoverRangeValue[0];
			end = _hoverRangeValue[1];
		} else start = hoverRangeValue;
		if (!start && !end) return null;
		start = start || end;
		end = end || start;
		return generateConfig.isAfter(start, end) ? [end, start] : [start, end];
	}, [hoverRangeValue, generateConfig]);
	var onInternalCellRender = useCellRender$1(cellRender, dateRender, monthCellRender);
	var PanelComponent = components[internalMode] || DefaultComponents[internalMode] || DatePanel;
	var parentHackContext = import_react$70.useContext(PickerHackContext);
	var pickerPanelContext = import_react$70.useMemo(function() {
		return _objectSpread2(_objectSpread2({}, parentHackContext), {}, { hideHeader });
	}, [parentHackContext, hideHeader]);
	var panelCls = "".concat(mergedPrefixCls, "-panel");
	var panelProps = pickProps(props, [
		"showWeek",
		"prevIcon",
		"nextIcon",
		"superPrevIcon",
		"superNextIcon",
		"disabledDate",
		"minDate",
		"maxDate",
		"onHover"
	]);
	return /* @__PURE__ */ import_react$70.createElement(PickerHackContext.Provider, { value: pickerPanelContext }, /* @__PURE__ */ import_react$70.createElement("div", {
		ref: rootRef,
		tabIndex,
		className: (0, import_classnames$23.default)(panelCls, _defineProperty({}, "".concat(panelCls, "-rtl"), direction === "rtl"))
	}, /* @__PURE__ */ import_react$70.createElement(PanelComponent, _extends({}, panelProps, {
		showTime: mergedShowTime,
		prefixCls: mergedPrefixCls,
		locale: filledLocale,
		generateConfig,
		onModeChange: triggerModeChange,
		pickerValue: mergedPickerValue,
		onPickerValueChange: function onPickerValueChange$1(nextPickerValue) {
			setPickerValue(nextPickerValue, true);
		},
		value: mergedValue[0],
		onSelect: onPanelValueSelect,
		values: mergedValue,
		cellRender: onInternalCellRender,
		hoverRangeValue: hoverRangeDate,
		hoverValue
	}))));
}
var import_classnames$23, import_react$70, DefaultComponents, RefPanelPicker, PickerPanel_default;
var init_PickerPanel = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_toConsumableArray();
	init_slicedToArray();
	import_classnames$23 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$6();
	import_react$70 = /* @__PURE__ */ __toESM(require_react());
	init_useLocale();
	init_useTimeConfig();
	init_useToggleDates();
	init_context$3();
	init_useCellRender$1();
	init_dateUtil();
	init_miscUtil();
	init_context$2();
	init_DatePanel();
	init_DateTimePanel();
	init_DecadePanel();
	init_MonthPanel();
	init_QuarterPanel();
	init_TimePanel();
	init_WeekPanel();
	init_YearPanel();
	DefaultComponents = {
		date: DatePanel,
		datetime: DateTimePanel,
		week: WeekPanel,
		month: MonthPanel,
		quarter: QuarterPanel,
		year: YearPanel,
		decade: DecadePanel,
		time: TimePanel
	};
	RefPanelPicker = /* @__PURE__ */ import_react$70.memo(/* @__PURE__ */ import_react$70.forwardRef(PickerPanel));
	PickerPanel_default = RefPanelPicker;
}));
function PopupPanel(props) {
	var picker = props.picker, multiplePanel = props.multiplePanel, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, needConfirm = props.needConfirm, onSubmit = props.onSubmit, range = props.range, hoverValue = props.hoverValue;
	var _React$useContext = import_react$69.useContext(context_default), prefixCls = _React$useContext.prefixCls, generateConfig = _React$useContext.generateConfig;
	var internalOffsetDate = import_react$69.useCallback(function(date, offset) {
		return offsetPanelDate(generateConfig, picker, date, offset);
	}, [generateConfig, picker]);
	var nextPickerValue = import_react$69.useMemo(function() {
		return internalOffsetDate(pickerValue, 1);
	}, [pickerValue, internalOffsetDate]);
	var onSecondPickerValueChange = function onSecondPickerValueChange$1(nextDate) {
		onPickerValueChange(internalOffsetDate(nextDate, -1));
	};
	var sharedContext = { onCellDblClick: function onCellDblClick() {
		if (needConfirm) onSubmit();
	} };
	var hideHeader = picker === "time";
	var pickerProps = _objectSpread2(_objectSpread2({}, props), {}, {
		hoverValue: null,
		hoverRangeValue: null,
		hideHeader
	});
	if (range) pickerProps.hoverRangeValue = hoverValue;
	else pickerProps.hoverValue = hoverValue;
	if (multiplePanel) return /* @__PURE__ */ import_react$69.createElement("div", { className: "".concat(prefixCls, "-panels") }, /* @__PURE__ */ import_react$69.createElement(PickerHackContext.Provider, { value: _objectSpread2(_objectSpread2({}, sharedContext), {}, { hideNext: true }) }, /* @__PURE__ */ import_react$69.createElement(PickerPanel_default, pickerProps)), /* @__PURE__ */ import_react$69.createElement(PickerHackContext.Provider, { value: _objectSpread2(_objectSpread2({}, sharedContext), {}, { hidePrev: true }) }, /* @__PURE__ */ import_react$69.createElement(PickerPanel_default, _extends({}, pickerProps, {
		pickerValue: nextPickerValue,
		onPickerValueChange: onSecondPickerValueChange
	}))));
	return /* @__PURE__ */ import_react$69.createElement(PickerHackContext.Provider, { value: _objectSpread2({}, sharedContext) }, /* @__PURE__ */ import_react$69.createElement(PickerPanel_default, pickerProps));
}
var import_react$69;
var init_PopupPanel = __esmMin((() => {
	init_extends();
	init_objectSpread2();
	import_react$69 = /* @__PURE__ */ __toESM(require_react());
	init_PickerPanel();
	init_context$2();
	init_context$3();
	init_useRangePickerValue();
}));
function executeValue(value) {
	return typeof value === "function" ? value() : value;
}
function PresetPanel(props) {
	var prefixCls = props.prefixCls, presets = props.presets, _onClick = props.onClick, onHover = props.onHover;
	if (!presets.length) return null;
	return /* @__PURE__ */ import_react$68.createElement("div", { className: "".concat(prefixCls, "-presets") }, /* @__PURE__ */ import_react$68.createElement("ul", null, presets.map(function(_ref, index) {
		var label = _ref.label, value = _ref.value;
		return /* @__PURE__ */ import_react$68.createElement("li", {
			key: index,
			onClick: function onClick() {
				_onClick(executeValue(value));
			},
			onMouseEnter: function onMouseEnter() {
				onHover(executeValue(value));
			},
			onMouseLeave: function onMouseLeave() {
				onHover(null);
			}
		}, label);
	})));
}
var import_react$68;
var init_PresetPanel = __esmMin((() => {
	import_react$68 = /* @__PURE__ */ __toESM(require_react());
}));
function Popup(props) {
	var panelRender = props.panelRender, internalMode = props.internalMode, picker = props.picker, showNow = props.showNow, range = props.range, multiple = props.multiple, _props$activeInfo = props.activeInfo, activeInfo = _props$activeInfo === void 0 ? [
		0,
		0,
		0
	] : _props$activeInfo, presets = props.presets, onPresetHover = props.onPresetHover, onPresetSubmit = props.onPresetSubmit, onFocus = props.onFocus, onBlur = props.onBlur, onPanelMouseDown = props.onPanelMouseDown, direction = props.direction, value = props.value, onSelect = props.onSelect, isInvalid = props.isInvalid, defaultOpenValue = props.defaultOpenValue, onOk = props.onOk, onSubmit = props.onSubmit;
	var prefixCls = import_react$67.useContext(context_default).prefixCls;
	var panelPrefixCls = "".concat(prefixCls, "-panel");
	var rtl = direction === "rtl";
	var arrowRef = import_react$67.useRef(null);
	var wrapperRef = import_react$67.useRef(null);
	var _React$useState2 = _slicedToArray(import_react$67.useState(0), 2), containerWidth = _React$useState2[0], setContainerWidth = _React$useState2[1];
	var _React$useState4 = _slicedToArray(import_react$67.useState(0), 2), containerOffset = _React$useState4[0], setContainerOffset = _React$useState4[1];
	var _React$useState6 = _slicedToArray(import_react$67.useState(0), 2), arrowOffset = _React$useState6[0], setArrowOffset = _React$useState6[1];
	var onResize = function onResize$1(info) {
		if (info.width) setContainerWidth(info.width);
	};
	var _activeInfo = _slicedToArray(activeInfo, 3), activeInputLeft = _activeInfo[0], activeInputRight = _activeInfo[1], selectorWidth = _activeInfo[2];
	var _React$useState8 = _slicedToArray(import_react$67.useState(0), 2), retryTimes = _React$useState8[0], setRetryTimes = _React$useState8[1];
	import_react$67.useEffect(function() {
		setRetryTimes(10);
	}, [activeInputLeft]);
	import_react$67.useEffect(function() {
		if (range && wrapperRef.current) {
			var _arrowRef$current;
			var arrowWidth = ((_arrowRef$current = arrowRef.current) === null || _arrowRef$current === void 0 ? void 0 : _arrowRef$current.offsetWidth) || 0;
			var wrapperRect = wrapperRef.current.getBoundingClientRect();
			if (!wrapperRect.height || wrapperRect.right < 0) {
				setRetryTimes(function(times) {
					return Math.max(0, times - 1);
				});
				return;
			}
			setArrowOffset((rtl ? activeInputRight - arrowWidth : activeInputLeft) - wrapperRect.left);
			if (containerWidth && containerWidth < selectorWidth) {
				var offset = rtl ? wrapperRect.right - (activeInputRight - arrowWidth + containerWidth) : activeInputLeft + arrowWidth - wrapperRect.left - containerWidth;
				setContainerOffset(Math.max(0, offset));
			} else setContainerOffset(0);
		}
	}, [
		retryTimes,
		rtl,
		containerWidth,
		activeInputLeft,
		activeInputRight,
		selectorWidth,
		range
	]);
	function filterEmpty(list) {
		return list.filter(function(item) {
			return item;
		});
	}
	var valueList = import_react$67.useMemo(function() {
		return filterEmpty(toArray$2(value));
	}, [value]);
	var isTimePickerEmptyValue = picker === "time" && !valueList.length;
	var footerSubmitValue = import_react$67.useMemo(function() {
		if (isTimePickerEmptyValue) return filterEmpty([defaultOpenValue]);
		return valueList;
	}, [
		isTimePickerEmptyValue,
		valueList,
		defaultOpenValue
	]);
	var popupPanelValue = isTimePickerEmptyValue ? defaultOpenValue : valueList;
	var disableSubmit = import_react$67.useMemo(function() {
		if (!footerSubmitValue.length) return true;
		return footerSubmitValue.some(function(val) {
			return isInvalid(val);
		});
	}, [footerSubmitValue, isInvalid]);
	var mergedNodes = /* @__PURE__ */ import_react$67.createElement("div", { className: "".concat(prefixCls, "-panel-layout") }, /* @__PURE__ */ import_react$67.createElement(PresetPanel, {
		prefixCls,
		presets,
		onClick: onPresetSubmit,
		onHover: onPresetHover
	}), /* @__PURE__ */ import_react$67.createElement("div", null, /* @__PURE__ */ import_react$67.createElement(PopupPanel, _extends({}, props, { value: popupPanelValue })), /* @__PURE__ */ import_react$67.createElement(Footer$1, _extends({}, props, {
		showNow: multiple ? false : showNow,
		invalid: disableSubmit,
		onSubmit: function onFooterSubmit() {
			if (isTimePickerEmptyValue) onSelect(defaultOpenValue);
			onOk();
			onSubmit();
		}
	}))));
	if (panelRender) mergedNodes = panelRender(mergedNodes);
	var containerPrefixCls = "".concat(panelPrefixCls, "-container");
	var marginLeft = "marginLeft";
	var marginRight = "marginRight";
	var renderNode = /* @__PURE__ */ import_react$67.createElement("div", {
		onMouseDown: onPanelMouseDown,
		tabIndex: -1,
		className: (0, import_classnames$22.default)(containerPrefixCls, "".concat(prefixCls, "-").concat(internalMode, "-panel-container")),
		style: _defineProperty(_defineProperty({}, rtl ? marginRight : marginLeft, containerOffset), rtl ? marginLeft : marginRight, "auto"),
		onFocus,
		onBlur
	}, mergedNodes);
	if (range) renderNode = /* @__PURE__ */ import_react$67.createElement("div", {
		onMouseDown: onPanelMouseDown,
		ref: wrapperRef,
		className: (0, import_classnames$22.default)("".concat(prefixCls, "-range-wrapper"), "".concat(prefixCls, "-").concat(picker, "-range-wrapper"))
	}, /* @__PURE__ */ import_react$67.createElement("div", {
		ref: arrowRef,
		className: "".concat(prefixCls, "-range-arrow"),
		style: { left: arrowOffset }
	}), /* @__PURE__ */ import_react$67.createElement(es_default$2, { onResize }, renderNode));
	return renderNode;
}
var import_classnames$22, import_react$67;
var init_Popup = __esmMin((() => {
	init_defineProperty();
	init_extends();
	init_slicedToArray();
	import_classnames$22 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$7();
	import_react$67 = /* @__PURE__ */ __toESM(require_react());
	init_miscUtil();
	init_context$3();
	init_Footer$1();
	init_PopupPanel();
	init_PresetPanel();
}));
function useInputProps(props, postProps) {
	var format = props.format, maskFormat = props.maskFormat, generateConfig = props.generateConfig, locale = props.locale, preserveInvalidOnBlur = props.preserveInvalidOnBlur, inputReadOnly = props.inputReadOnly, required = props.required, ariaRequired = props["aria-required"], onSubmit = props.onSubmit, _onFocus = props.onFocus, _onBlur = props.onBlur, onInputChange = props.onInputChange, onInvalid = props.onInvalid, open = props.open, onOpenChange = props.onOpenChange, _onKeyDown = props.onKeyDown, _onChange = props.onChange, activeHelp = props.activeHelp, name = props.name, autoComplete = props.autoComplete, id = props.id, value = props.value, invalid = props.invalid, placeholder = props.placeholder, disabled = props.disabled, activeIndex = props.activeIndex, allHelp = props.allHelp, picker = props.picker;
	var parseDate = function parseDate$1(str, formatStr) {
		var parsed = generateConfig.locale.parse(locale.locale, str, [formatStr]);
		return parsed && generateConfig.isValidate(parsed) ? parsed : null;
	};
	var firstFormat = format[0];
	var getText = import_react$66.useCallback(function(date) {
		return formatValue(date, {
			locale,
			format: firstFormat,
			generateConfig
		});
	}, [
		locale,
		generateConfig,
		firstFormat
	]);
	var valueTexts = import_react$66.useMemo(function() {
		return value.map(getText);
	}, [value, getText]);
	var size = import_react$66.useMemo(function() {
		var defaultSize = picker === "time" ? 8 : 10;
		var length = typeof firstFormat === "function" ? firstFormat(generateConfig.getNow()).length : firstFormat.length;
		return Math.max(defaultSize, length) + 2;
	}, [
		firstFormat,
		picker,
		generateConfig
	]);
	var _validateFormat = function validateFormat(text) {
		for (var i = 0; i < format.length; i += 1) {
			var singleFormat = format[i];
			if (typeof singleFormat === "string") {
				var parsed = parseDate(text, singleFormat);
				if (parsed) return parsed;
			}
		}
		return false;
	};
	return [function getInputProps(index) {
		function getProp(propValue) {
			return index !== void 0 ? propValue[index] : propValue;
		}
		var inputProps = _objectSpread2(_objectSpread2({}, pickAttrs(props, {
			aria: true,
			data: true
		})), {}, {
			format: maskFormat,
			validateFormat: function validateFormat(text) {
				return !!_validateFormat(text);
			},
			preserveInvalidOnBlur,
			readOnly: inputReadOnly,
			required,
			"aria-required": ariaRequired,
			name,
			autoComplete,
			size,
			id: getProp(id),
			value: getProp(valueTexts) || "",
			invalid: getProp(invalid),
			placeholder: getProp(placeholder),
			active: activeIndex === index,
			helped: allHelp || activeHelp && activeIndex === index,
			disabled: getProp(disabled),
			onFocus: function onFocus(event) {
				_onFocus(event, index);
			},
			onBlur: function onBlur(event) {
				_onBlur(event, index);
			},
			onSubmit,
			onChange: function onChange(text) {
				onInputChange();
				var parsed = _validateFormat(text);
				if (parsed) {
					onInvalid(false, index);
					_onChange(parsed, index);
					return;
				}
				onInvalid(!!text, index);
			},
			onHelp: function onHelp() {
				onOpenChange(true, { index });
			},
			onKeyDown: function onKeyDown(event) {
				var prevented = false;
				_onKeyDown === null || _onKeyDown === void 0 || _onKeyDown(event, function() {
					prevented = true;
				});
				if (!event.defaultPrevented && !prevented) switch (event.key) {
					case "Escape":
						onOpenChange(false, { index });
						break;
					case "Enter":
						if (!open) onOpenChange(true);
						break;
				}
			}
		}, postProps === null || postProps === void 0 ? void 0 : postProps({ valueTexts }));
		Object.keys(inputProps).forEach(function(key) {
			if (inputProps[key] === void 0) delete inputProps[key];
		});
		return inputProps;
	}, getText];
}
var import_react$66;
var init_useInputProps = __esmMin((() => {
	init_objectSpread2();
	init_es$6();
	init_pickAttrs();
	import_react$66 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
}));
function useRootProps(props) {
	return import_react$65.useMemo(function() {
		return pickProps(props, propNames);
	}, [props]);
}
var import_react$65, propNames;
var init_useRootProps = __esmMin((() => {
	import_react$65 = /* @__PURE__ */ __toESM(require_react());
	init_miscUtil();
	propNames = ["onMouseEnter", "onMouseLeave"];
}));
function Icon(props) {
	var icon = props.icon, type = props.type, restProps = _objectWithoutProperties(props, _excluded$14);
	var prefixCls = import_react$64.useContext(context_default).prefixCls;
	return icon ? /* @__PURE__ */ import_react$64.createElement("span", _extends({ className: "".concat(prefixCls, "-").concat(type) }, restProps), icon) : null;
}
function ClearIcon(_ref) {
	var onClear = _ref.onClear, restProps = _objectWithoutProperties(_ref, _excluded2$3);
	return /* @__PURE__ */ import_react$64.createElement(Icon, _extends({}, restProps, {
		type: "clear",
		role: "button",
		onMouseDown: function onMouseDown(e) {
			e.preventDefault();
		},
		onClick: function onClick(e) {
			e.stopPropagation();
			onClear();
		}
	}));
}
var import_react$64, _excluded$14, _excluded2$3;
var init_Icon = __esmMin((() => {
	init_extends();
	init_objectWithoutProperties();
	import_react$64 = /* @__PURE__ */ __toESM(require_react());
	init_context$3();
	_excluded$14 = ["icon", "type"], _excluded2$3 = ["onClear"];
}));
var FORMAT_KEYS, REPLACE_KEY, MaskFormat;
var init_MaskFormat = __esmMin((() => {
	init_classCallCheck();
	init_createClass();
	init_defineProperty();
	FORMAT_KEYS = [
		"YYYY",
		"MM",
		"DD",
		"HH",
		"mm",
		"ss",
		"SSS"
	];
	REPLACE_KEY = "顧";
	MaskFormat = /* @__PURE__ */ function() {
		function MaskFormat$1(format) {
			_classCallCheck(this, MaskFormat$1);
			_defineProperty(this, "format", void 0);
			_defineProperty(this, "maskFormat", void 0);
			_defineProperty(this, "cells", void 0);
			_defineProperty(this, "maskCells", void 0);
			this.format = format;
			var replaceKeys = FORMAT_KEYS.map(function(key) {
				return "(".concat(key, ")");
			}).join("|");
			var replaceReg = new RegExp(replaceKeys, "g");
			this.maskFormat = format.replace(replaceReg, function(key) {
				return REPLACE_KEY.repeat(key.length);
			});
			var cellReg = new RegExp("(".concat(FORMAT_KEYS.join("|"), ")"));
			var strCells = (format.split(cellReg) || []).filter(function(str) {
				return str;
			});
			var offset = 0;
			this.cells = strCells.map(function(text) {
				var mask = FORMAT_KEYS.includes(text);
				var start = offset;
				var end = offset + text.length;
				offset = end;
				return {
					text,
					mask,
					start,
					end
				};
			});
			this.maskCells = this.cells.filter(function(cell) {
				return cell.mask;
			});
		}
		_createClass(MaskFormat$1, [
			{
				key: "getSelection",
				value: function getSelection(maskCellIndex) {
					var _ref = this.maskCells[maskCellIndex] || {}, start = _ref.start, end = _ref.end;
					return [start || 0, end || 0];
				}
			},
			{
				key: "match",
				value: function match(text) {
					for (var i = 0; i < this.maskFormat.length; i += 1) {
						var maskChar = this.maskFormat[i];
						var textChar = text[i];
						if (!textChar || maskChar !== REPLACE_KEY && maskChar !== textChar) return false;
					}
					return true;
				}
			},
			{
				key: "size",
				value: function size() {
					return this.maskCells.length;
				}
			},
			{
				key: "getMaskCellIndex",
				value: function getMaskCellIndex(anchorIndex) {
					var closetDist = Number.MAX_SAFE_INTEGER;
					var closetIndex = 0;
					for (var i = 0; i < this.maskCells.length; i += 1) {
						var _this$maskCells$i = this.maskCells[i], start = _this$maskCells$i.start, end = _this$maskCells$i.end;
						if (anchorIndex >= start && anchorIndex <= end) return i;
						var dist = Math.min(Math.abs(anchorIndex - start), Math.abs(anchorIndex - end));
						if (dist < closetDist) {
							closetDist = dist;
							closetIndex = i;
						}
					}
					return closetIndex;
				}
			}
		]);
		return MaskFormat$1;
	}();
}));
function getMaskRange(key) {
	return {
		YYYY: [
			0,
			9999,
			(/* @__PURE__ */ new Date()).getFullYear()
		],
		MM: [1, 12],
		DD: [1, 31],
		HH: [0, 23],
		mm: [0, 59],
		ss: [0, 59],
		SSS: [0, 999]
	}[key];
}
var init_util$1 = __esmMin((() => {}));
var import_classnames$21, import_react$63, _excluded$13, Input, Input_default;
var init_Input = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_classnames$21 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$6();
	init_useLayoutEffect();
	init_raf();
	import_react$63 = /* @__PURE__ */ __toESM(require_react());
	init_miscUtil();
	init_context$3();
	init_useLockEffect();
	init_Icon();
	init_MaskFormat();
	init_util$1();
	_excluded$13 = [
		"active",
		"showActiveCls",
		"suffixIcon",
		"format",
		"validateFormat",
		"onChange",
		"onInput",
		"helped",
		"onHelp",
		"onSubmit",
		"onKeyDown",
		"preserveInvalidOnBlur",
		"invalid",
		"clearIcon"
	];
	Input = /* @__PURE__ */ import_react$63.forwardRef(function(props, ref) {
		var active = props.active, _props$showActiveCls = props.showActiveCls, showActiveCls = _props$showActiveCls === void 0 ? true : _props$showActiveCls, suffixIcon = props.suffixIcon, format = props.format, validateFormat = props.validateFormat, onChange = props.onChange;
		props.onInput;
		var helped = props.helped, onHelp = props.onHelp, onSubmit = props.onSubmit, onKeyDown = props.onKeyDown, _props$preserveInvali = props.preserveInvalidOnBlur, preserveInvalidOnBlur = _props$preserveInvali === void 0 ? false : _props$preserveInvali, invalid = props.invalid, clearIcon = props.clearIcon, restProps = _objectWithoutProperties(props, _excluded$13);
		var value = props.value, onFocus = props.onFocus, onBlur = props.onBlur, onMouseUp = props.onMouseUp;
		var _React$useContext = import_react$63.useContext(context_default), prefixCls = _React$useContext.prefixCls, _React$useContext$inp = _React$useContext.input, Component = _React$useContext$inp === void 0 ? "input" : _React$useContext$inp;
		var inputPrefixCls = "".concat(prefixCls, "-input");
		var _React$useState2 = _slicedToArray(import_react$63.useState(false), 2), focused = _React$useState2[0], setFocused = _React$useState2[1];
		var _React$useState4 = _slicedToArray(import_react$63.useState(value), 2), internalInputValue = _React$useState4[0], setInputValue = _React$useState4[1];
		var _React$useState6 = _slicedToArray(import_react$63.useState(""), 2), focusCellText = _React$useState6[0], setFocusCellText = _React$useState6[1];
		var _React$useState8 = _slicedToArray(import_react$63.useState(null), 2), focusCellIndex = _React$useState8[0], setFocusCellIndex = _React$useState8[1];
		var _React$useState10 = _slicedToArray(import_react$63.useState(null), 2), forceSelectionSyncMark = _React$useState10[0], forceSelectionSync = _React$useState10[1];
		var inputValue = internalInputValue || "";
		import_react$63.useEffect(function() {
			setInputValue(value);
		}, [value]);
		var holderRef = import_react$63.useRef();
		var inputRef = import_react$63.useRef();
		import_react$63.useImperativeHandle(ref, function() {
			return {
				nativeElement: holderRef.current,
				inputElement: inputRef.current,
				focus: function focus(options) {
					inputRef.current.focus(options);
				},
				blur: function blur() {
					inputRef.current.blur();
				}
			};
		});
		var maskFormat = import_react$63.useMemo(function() {
			return new MaskFormat(format || "");
		}, [format]);
		var _React$useMemo2 = _slicedToArray(import_react$63.useMemo(function() {
			if (helped) return [0, 0];
			return maskFormat.getSelection(focusCellIndex);
		}, [
			maskFormat,
			focusCellIndex,
			helped
		]), 2), selectionStart = _React$useMemo2[0], selectionEnd = _React$useMemo2[1];
		var onModify = function onModify$1(text) {
			if (text && text !== format && text !== value) onHelp();
		};
		var triggerInputChange = useEvent(function(text) {
			if (validateFormat(text)) onChange(text);
			setInputValue(text);
			onModify(text);
		});
		var onInternalChange = function onInternalChange$1(event) {
			if (!format) {
				var text = event.target.value;
				onModify(text);
				setInputValue(text);
				onChange(text);
			}
		};
		var onFormatPaste = function onFormatPaste$1(event) {
			var pasteText = event.clipboardData.getData("text");
			if (validateFormat(pasteText)) triggerInputChange(pasteText);
		};
		var mouseDownRef = import_react$63.useRef(false);
		var onFormatMouseDown = function onFormatMouseDown$1() {
			mouseDownRef.current = true;
		};
		var onFormatMouseUp = function onFormatMouseUp$1(event) {
			var start = event.target.selectionStart;
			setFocusCellIndex(maskFormat.getMaskCellIndex(start));
			forceSelectionSync({});
			onMouseUp === null || onMouseUp === void 0 || onMouseUp(event);
			mouseDownRef.current = false;
		};
		var onFormatFocus = function onFormatFocus$1(event) {
			setFocused(true);
			setFocusCellIndex(0);
			setFocusCellText("");
			onFocus(event);
		};
		var onSharedBlur = function onSharedBlur$1(event) {
			onBlur(event);
		};
		var onFormatBlur = function onFormatBlur$1(event) {
			setFocused(false);
			onSharedBlur(event);
		};
		useLockEffect(active, function() {
			if (!active && !preserveInvalidOnBlur) setInputValue(value);
		});
		var onSharedKeyDown = function onSharedKeyDown$1(event) {
			if (event.key === "Enter" && validateFormat(inputValue)) onSubmit();
			onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
		};
		var onFormatKeyDown = function onFormatKeyDown$1(event) {
			onSharedKeyDown(event);
			var key = event.key;
			var nextCellText = null;
			var nextFillText = null;
			var maskCellLen = selectionEnd - selectionStart;
			var cellFormat = format.slice(selectionStart, selectionEnd);
			var offsetCellIndex = function offsetCellIndex$1(offset) {
				setFocusCellIndex(function(idx) {
					var nextIndex = idx + offset;
					nextIndex = Math.max(nextIndex, 0);
					nextIndex = Math.min(nextIndex, maskFormat.size() - 1);
					return nextIndex;
				});
			};
			var offsetCellValue = function offsetCellValue$1(offset) {
				var _getMaskRange2 = _slicedToArray(getMaskRange(cellFormat), 3), rangeStart = _getMaskRange2[0], rangeEnd = _getMaskRange2[1], rangeDefault = _getMaskRange2[2];
				var currentText = inputValue.slice(selectionStart, selectionEnd);
				var currentTextNum = Number(currentText);
				if (isNaN(currentTextNum)) return String(rangeDefault ? rangeDefault : offset > 0 ? rangeStart : rangeEnd);
				var num = currentTextNum + offset;
				var range = rangeEnd - rangeStart + 1;
				return String(rangeStart + (range + num - rangeStart) % range);
			};
			switch (key) {
				case "Backspace":
				case "Delete":
					nextCellText = "";
					nextFillText = cellFormat;
					break;
				case "ArrowLeft":
					nextCellText = "";
					offsetCellIndex(-1);
					break;
				case "ArrowRight":
					nextCellText = "";
					offsetCellIndex(1);
					break;
				case "ArrowUp":
					nextCellText = "";
					nextFillText = offsetCellValue(1);
					break;
				case "ArrowDown":
					nextCellText = "";
					nextFillText = offsetCellValue(-1);
					break;
				default:
					if (!isNaN(Number(key))) {
						nextCellText = focusCellText + key;
						nextFillText = nextCellText;
					}
					break;
			}
			if (nextCellText !== null) {
				setFocusCellText(nextCellText);
				if (nextCellText.length >= maskCellLen) {
					offsetCellIndex(1);
					setFocusCellText("");
				}
			}
			if (nextFillText !== null) triggerInputChange((inputValue.slice(0, selectionStart) + leftPad(nextFillText, maskCellLen) + inputValue.slice(selectionEnd)).slice(0, format.length));
			forceSelectionSync({});
		};
		var rafRef = import_react$63.useRef();
		useLayoutEffect_default(function() {
			if (!focused || !format || mouseDownRef.current) return;
			if (!maskFormat.match(inputValue)) {
				triggerInputChange(format);
				return;
			}
			inputRef.current.setSelectionRange(selectionStart, selectionEnd);
			rafRef.current = raf_default(function() {
				inputRef.current.setSelectionRange(selectionStart, selectionEnd);
			});
			return function() {
				raf_default.cancel(rafRef.current);
			};
		}, [
			maskFormat,
			format,
			focused,
			inputValue,
			focusCellIndex,
			selectionStart,
			selectionEnd,
			forceSelectionSyncMark,
			triggerInputChange
		]);
		var inputProps = format ? {
			onFocus: onFormatFocus,
			onBlur: onFormatBlur,
			onKeyDown: onFormatKeyDown,
			onMouseDown: onFormatMouseDown,
			onMouseUp: onFormatMouseUp,
			onPaste: onFormatPaste
		} : {};
		return /* @__PURE__ */ import_react$63.createElement("div", {
			ref: holderRef,
			className: (0, import_classnames$21.default)(inputPrefixCls, _defineProperty(_defineProperty({}, "".concat(inputPrefixCls, "-active"), active && showActiveCls), "".concat(inputPrefixCls, "-placeholder"), helped))
		}, /* @__PURE__ */ import_react$63.createElement(Component, _extends({
			ref: inputRef,
			"aria-invalid": invalid,
			autoComplete: "off"
		}, restProps, {
			onKeyDown: onSharedKeyDown,
			onBlur: onSharedBlur
		}, inputProps, {
			value: inputValue,
			onChange: onInternalChange
		})), /* @__PURE__ */ import_react$63.createElement(Icon, {
			type: "suffix",
			icon: suffixIcon
		}), clearIcon);
	});
	Input_default = Input;
}));
function RangeSelector(props, ref) {
	var id = props.id, prefix = props.prefix, clearIcon = props.clearIcon, suffixIcon = props.suffixIcon, _props$separator = props.separator, separator = _props$separator === void 0 ? "~" : _props$separator, activeIndex = props.activeIndex;
	props.activeHelp;
	props.allHelp;
	var focused = props.focused;
	props.onFocus;
	props.onBlur;
	props.onKeyDown;
	props.locale;
	props.generateConfig;
	var placeholder = props.placeholder, className = props.className, style = props.style, onClick = props.onClick, onClear = props.onClear, value = props.value;
	props.onChange;
	props.onSubmit;
	props.onInputChange;
	props.format;
	props.maskFormat;
	props.preserveInvalidOnBlur;
	props.onInvalid;
	var disabled = props.disabled, invalid = props.invalid;
	props.inputReadOnly;
	var direction = props.direction;
	props.onOpenChange;
	var onActiveInfo = props.onActiveInfo;
	props.placement;
	var _onMouseDown = props.onMouseDown;
	props.required;
	props["aria-required"];
	var autoFocus = props.autoFocus, tabIndex = props.tabIndex, restProps = _objectWithoutProperties(props, _excluded$12);
	var rtl = direction === "rtl";
	var prefixCls = import_react$62.useContext(context_default).prefixCls;
	var ids = import_react$62.useMemo(function() {
		if (typeof id === "string") return [id];
		var mergedId = id || {};
		return [mergedId.start, mergedId.end];
	}, [id]);
	var rootRef = import_react$62.useRef();
	var inputStartRef = import_react$62.useRef();
	var inputEndRef = import_react$62.useRef();
	var getInput = function getInput$1(index) {
		var _index;
		return (_index = [inputStartRef, inputEndRef][index]) === null || _index === void 0 ? void 0 : _index.current;
	};
	import_react$62.useImperativeHandle(ref, function() {
		return {
			nativeElement: rootRef.current,
			focus: function focus(options) {
				if (_typeof(options) === "object") {
					var _getInput;
					var _ref = options || {}, _ref$index = _ref.index, _index2 = _ref$index === void 0 ? 0 : _ref$index, rest = _objectWithoutProperties(_ref, _excluded2$2);
					(_getInput = getInput(_index2)) === null || _getInput === void 0 || _getInput.focus(rest);
				} else {
					var _getInput2;
					(_getInput2 = getInput(options !== null && options !== void 0 ? options : 0)) === null || _getInput2 === void 0 || _getInput2.focus();
				}
			},
			blur: function blur() {
				var _getInput3, _getInput4;
				(_getInput3 = getInput(0)) === null || _getInput3 === void 0 || _getInput3.blur();
				(_getInput4 = getInput(1)) === null || _getInput4 === void 0 || _getInput4.blur();
			}
		};
	});
	var rootProps = useRootProps(restProps);
	var mergedPlaceholder = import_react$62.useMemo(function() {
		return Array.isArray(placeholder) ? placeholder : [placeholder, placeholder];
	}, [placeholder]);
	var getInputProps = _slicedToArray(useInputProps(_objectSpread2(_objectSpread2({}, props), {}, {
		id: ids,
		placeholder: mergedPlaceholder
	})), 1)[0];
	var _React$useState2 = _slicedToArray(import_react$62.useState({
		position: "absolute",
		width: 0
	}), 2), activeBarStyle = _React$useState2[0], setActiveBarStyle = _React$useState2[1];
	var syncActiveOffset = useEvent(function() {
		var input = getInput(activeIndex);
		if (input) {
			var inputRect = input.nativeElement.getBoundingClientRect();
			var parentRect = rootRef.current.getBoundingClientRect();
			var rectOffset = inputRect.left - parentRect.left;
			setActiveBarStyle(function(ori) {
				return _objectSpread2(_objectSpread2({}, ori), {}, {
					width: inputRect.width,
					left: rectOffset
				});
			});
			onActiveInfo([
				inputRect.left,
				inputRect.right,
				parentRect.width
			]);
		}
	});
	import_react$62.useEffect(function() {
		syncActiveOffset();
	}, [activeIndex]);
	var showClear = clearIcon && (value[0] && !disabled[0] || value[1] && !disabled[1]);
	var startAutoFocus = autoFocus && !disabled[0];
	var endAutoFocus = autoFocus && !startAutoFocus && !disabled[1];
	return /* @__PURE__ */ import_react$62.createElement(es_default$2, { onResize: syncActiveOffset }, /* @__PURE__ */ import_react$62.createElement("div", _extends({}, rootProps, {
		className: (0, import_classnames$20.default)(prefixCls, "".concat(prefixCls, "-range"), _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-disabled"), disabled.every(function(i) {
			return i;
		})), "".concat(prefixCls, "-invalid"), invalid.some(function(i) {
			return i;
		})), "".concat(prefixCls, "-rtl"), rtl), className),
		style,
		ref: rootRef,
		onClick,
		onMouseDown: function onMouseDown(e) {
			var target = e.target;
			if (target !== inputStartRef.current.inputElement && target !== inputEndRef.current.inputElement) e.preventDefault();
			_onMouseDown === null || _onMouseDown === void 0 || _onMouseDown(e);
		}
	}), prefix && /* @__PURE__ */ import_react$62.createElement("div", { className: "".concat(prefixCls, "-prefix") }, prefix), /* @__PURE__ */ import_react$62.createElement(Input_default, _extends({ ref: inputStartRef }, getInputProps(0), {
		autoFocus: startAutoFocus,
		tabIndex,
		"date-range": "start"
	})), /* @__PURE__ */ import_react$62.createElement("div", { className: "".concat(prefixCls, "-range-separator") }, separator), /* @__PURE__ */ import_react$62.createElement(Input_default, _extends({ ref: inputEndRef }, getInputProps(1), {
		autoFocus: endAutoFocus,
		tabIndex,
		"date-range": "end"
	})), /* @__PURE__ */ import_react$62.createElement("div", {
		className: "".concat(prefixCls, "-active-bar"),
		style: activeBarStyle
	}), /* @__PURE__ */ import_react$62.createElement(Icon, {
		type: "suffix",
		icon: suffixIcon
	}), showClear && /* @__PURE__ */ import_react$62.createElement(ClearIcon, {
		icon: clearIcon,
		onClear
	})));
}
var import_classnames$20, import_react$62, _excluded$12, _excluded2$2, RefRangeSelector, RangeSelector_default;
var init_RangeSelector = __esmMin((() => {
	init_extends();
	init_defineProperty();
	init_objectSpread2();
	init_slicedToArray();
	init_typeof();
	init_objectWithoutProperties();
	import_classnames$20 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$7();
	init_es$6();
	import_react$62 = /* @__PURE__ */ __toESM(require_react());
	init_context$3();
	init_useInputProps();
	init_useRootProps();
	init_Icon();
	init_Input();
	_excluded$12 = [
		"id",
		"prefix",
		"clearIcon",
		"suffixIcon",
		"separator",
		"activeIndex",
		"activeHelp",
		"allHelp",
		"focused",
		"onFocus",
		"onBlur",
		"onKeyDown",
		"locale",
		"generateConfig",
		"placeholder",
		"className",
		"style",
		"onClick",
		"onClear",
		"value",
		"onChange",
		"onSubmit",
		"onInputChange",
		"format",
		"maskFormat",
		"preserveInvalidOnBlur",
		"onInvalid",
		"disabled",
		"invalid",
		"inputReadOnly",
		"direction",
		"onOpenChange",
		"onActiveInfo",
		"placement",
		"onMouseDown",
		"required",
		"aria-required",
		"autoFocus",
		"tabIndex"
	], _excluded2$2 = ["index"];
	RefRangeSelector = /* @__PURE__ */ import_react$62.forwardRef(RangeSelector);
	RangeSelector_default = RefRangeSelector;
}));
function separateConfig(config, defaultConfig) {
	var singleConfig = config !== null && config !== void 0 ? config : defaultConfig;
	if (Array.isArray(singleConfig)) return singleConfig;
	return [singleConfig, singleConfig];
}
function getActiveRange(activeIndex) {
	return activeIndex === 1 ? "end" : "start";
}
function RangePicker(props, ref) {
	var _useFilledProps2 = _slicedToArray(useFilledProps(props, function() {
		var disabled$1 = props.disabled, allowEmpty$1 = props.allowEmpty;
		return {
			disabled: separateConfig(disabled$1, false),
			allowEmpty: separateConfig(allowEmpty$1, false)
		};
	}), 6), filledProps = _useFilledProps2[0], internalPicker = _useFilledProps2[1], complexPicker = _useFilledProps2[2], formatList = _useFilledProps2[3], maskFormat = _useFilledProps2[4], isInvalidateDate = _useFilledProps2[5];
	var prefixCls = filledProps.prefixCls, styles = filledProps.styles, classNames$32 = filledProps.classNames, defaultValue = filledProps.defaultValue, value = filledProps.value, needConfirm = filledProps.needConfirm, onKeyDown = filledProps.onKeyDown, disabled = filledProps.disabled, allowEmpty = filledProps.allowEmpty, disabledDate = filledProps.disabledDate, minDate = filledProps.minDate, maxDate = filledProps.maxDate, defaultOpen = filledProps.defaultOpen, open = filledProps.open, onOpenChange = filledProps.onOpenChange, locale = filledProps.locale, generateConfig = filledProps.generateConfig, picker = filledProps.picker, showNow = filledProps.showNow, showToday = filledProps.showToday, showTime = filledProps.showTime, mode = filledProps.mode, onPanelChange = filledProps.onPanelChange, onCalendarChange = filledProps.onCalendarChange, onOk = filledProps.onOk, defaultPickerValue = filledProps.defaultPickerValue, pickerValue = filledProps.pickerValue, onPickerValueChange = filledProps.onPickerValueChange, inputReadOnly = filledProps.inputReadOnly, suffixIcon = filledProps.suffixIcon, onFocus = filledProps.onFocus, onBlur = filledProps.onBlur, presets = filledProps.presets, ranges = filledProps.ranges, components = filledProps.components, cellRender = filledProps.cellRender, dateRender = filledProps.dateRender, monthCellRender = filledProps.monthCellRender, onClick = filledProps.onClick;
	var selectorRef = usePickerRef(ref);
	var _useOpen2 = _slicedToArray(useOpen(open, defaultOpen, disabled, onOpenChange), 2), mergedOpen = _useOpen2[0], setMergeOpen = _useOpen2[1];
	var triggerOpen = function triggerOpen$1(nextOpen, config) {
		if (disabled.some(function(fieldDisabled) {
			return !fieldDisabled;
		}) || !nextOpen) setMergeOpen(nextOpen, config);
	};
	var _useInnerValue2 = _slicedToArray(useInnerValue(generateConfig, locale, formatList, true, false, defaultValue, value, onCalendarChange, onOk), 5), mergedValue = _useInnerValue2[0], setInnerValue = _useInnerValue2[1], getCalendarValue = _useInnerValue2[2], triggerCalendarChange = _useInnerValue2[3], triggerOk = _useInnerValue2[4];
	var calendarValue = getCalendarValue();
	var _useRangeActive2 = _slicedToArray(useRangeActive(disabled, allowEmpty, mergedOpen), 9), focused = _useRangeActive2[0], triggerFocus = _useRangeActive2[1], lastOperation = _useRangeActive2[2], activeIndex = _useRangeActive2[3], setActiveIndex = _useRangeActive2[4], nextActiveIndex = _useRangeActive2[5], activeIndexList = _useRangeActive2[6], updateSubmitIndex = _useRangeActive2[7], hasActiveSubmitValue = _useRangeActive2[8];
	var onSharedFocus = function onSharedFocus$1(event, index) {
		triggerFocus(true);
		onFocus === null || onFocus === void 0 || onFocus(event, { range: getActiveRange(index !== null && index !== void 0 ? index : activeIndex) });
	};
	var onSharedBlur = function onSharedBlur$1(event, index) {
		triggerFocus(false);
		onBlur === null || onBlur === void 0 || onBlur(event, { range: getActiveRange(index !== null && index !== void 0 ? index : activeIndex) });
	};
	var mergedShowTime = import_react$61.useMemo(function() {
		if (!showTime) return null;
		var disabledTime = showTime.disabledTime;
		var proxyDisabledTime = disabledTime ? function(date) {
			return disabledTime(date, getActiveRange(activeIndex), { from: getFromDate(calendarValue, activeIndexList, activeIndex) });
		} : void 0;
		return _objectSpread2(_objectSpread2({}, showTime), {}, { disabledTime: proxyDisabledTime });
	}, [
		showTime,
		activeIndex,
		calendarValue,
		activeIndexList
	]);
	var _useMergedState2 = _slicedToArray(useMergedState([picker, picker], { value: mode }), 2), modes = _useMergedState2[0], setModes = _useMergedState2[1];
	var mergedMode = modes[activeIndex] || picker;
	var internalMode = mergedMode === "date" && mergedShowTime ? "datetime" : mergedMode;
	var multiplePanel = internalMode === picker && internalMode !== "time";
	var mergedShowNow = useShowNow(picker, mergedMode, showNow, showToday, true);
	var _useRangeValue2 = _slicedToArray(useRangeValue(filledProps, mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, disabled, formatList, focused, mergedOpen, isInvalidateDate), 2), flushSubmit = _useRangeValue2[0], triggerSubmitChange = _useRangeValue2[1];
	var mergedDisabledDate = useRangeDisabledDate(calendarValue, disabled, activeIndexList, generateConfig, locale, disabledDate);
	var _useFieldsInvalidate2 = _slicedToArray(useFieldsInvalidate(calendarValue, isInvalidateDate, allowEmpty), 2), submitInvalidates = _useFieldsInvalidate2[0], onSelectorInvalid = _useFieldsInvalidate2[1];
	var _useRangePickerValue2 = _slicedToArray(useRangePickerValue(generateConfig, locale, calendarValue, modes, mergedOpen, activeIndex, internalPicker, multiplePanel, defaultPickerValue, pickerValue, mergedShowTime === null || mergedShowTime === void 0 ? void 0 : mergedShowTime.defaultOpenValue, onPickerValueChange, minDate, maxDate), 2), currentPickerValue = _useRangePickerValue2[0], setCurrentPickerValue = _useRangePickerValue2[1];
	var triggerModeChange = useEvent(function(nextPickerValue, nextMode, triggerEvent) {
		var clone = fillIndex(modes, activeIndex, nextMode);
		if (clone[0] !== modes[0] || clone[1] !== modes[1]) setModes(clone);
		if (onPanelChange && triggerEvent !== false) {
			var clonePickerValue = _toConsumableArray(calendarValue);
			if (nextPickerValue) clonePickerValue[activeIndex] = nextPickerValue;
			onPanelChange(clonePickerValue, clone);
		}
	});
	var fillCalendarValue = function fillCalendarValue$1(date, index) {
		return fillIndex(calendarValue, index, date);
	};
	var triggerPartConfirm = function triggerPartConfirm$1(date, skipFocus) {
		var nextValue = calendarValue;
		if (date) nextValue = fillCalendarValue(date, activeIndex);
		updateSubmitIndex(activeIndex);
		var nextIndex = nextActiveIndex(nextValue);
		triggerCalendarChange(nextValue);
		flushSubmit(activeIndex, nextIndex === null);
		if (nextIndex === null) triggerOpen(false, { force: true });
		else if (!skipFocus) selectorRef.current.focus({ index: nextIndex });
	};
	var onSelectorClick = function onSelectorClick$1(event) {
		var _activeElement;
		var rootNode = event.target.getRootNode();
		if (!selectorRef.current.nativeElement.contains((_activeElement = rootNode.activeElement) !== null && _activeElement !== void 0 ? _activeElement : document.activeElement)) {
			var enabledIndex = disabled.findIndex(function(d) {
				return !d;
			});
			if (enabledIndex >= 0) selectorRef.current.focus({ index: enabledIndex });
		}
		triggerOpen(true);
		onClick === null || onClick === void 0 || onClick(event);
	};
	var onSelectorClear = function onSelectorClear$1() {
		triggerSubmitChange(null);
		triggerOpen(false, { force: true });
	};
	var _React$useState2 = _slicedToArray(import_react$61.useState(null), 2), hoverSource = _React$useState2[0], setHoverSource = _React$useState2[1];
	var _React$useState4 = _slicedToArray(import_react$61.useState(null), 2), internalHoverValues = _React$useState4[0], setInternalHoverValues = _React$useState4[1];
	var hoverValues = import_react$61.useMemo(function() {
		return internalHoverValues || calendarValue;
	}, [calendarValue, internalHoverValues]);
	import_react$61.useEffect(function() {
		if (!mergedOpen) setInternalHoverValues(null);
	}, [mergedOpen]);
	var _React$useState6 = _slicedToArray(import_react$61.useState([
		0,
		0,
		0
	]), 2), activeInfo = _React$useState6[0], setActiveInfo = _React$useState6[1];
	var presetList = usePresets(presets, ranges);
	var onPresetHover = function onPresetHover$1(nextValues) {
		setInternalHoverValues(nextValues);
		setHoverSource("preset");
	};
	var onPresetSubmit = function onPresetSubmit$1(nextValues) {
		if (triggerSubmitChange(nextValues)) triggerOpen(false, { force: true });
	};
	var onNow = function onNow$1(now) {
		triggerPartConfirm(now);
	};
	var onPanelHover = function onPanelHover$1(date) {
		setInternalHoverValues(date ? fillCalendarValue(date, activeIndex) : null);
		setHoverSource("cell");
	};
	var onPanelFocus = function onPanelFocus$1(event) {
		triggerOpen(true);
		onSharedFocus(event);
	};
	var onPanelMouseDown = function onPanelMouseDown$1() {
		lastOperation("panel");
	};
	var onPanelSelect = function onPanelSelect$1(date) {
		triggerCalendarChange(fillIndex(calendarValue, activeIndex, date));
		if (!needConfirm && !complexPicker && internalPicker === internalMode) triggerPartConfirm(date);
	};
	var onPopupClose = function onPopupClose$1() {
		triggerOpen(false);
	};
	var onInternalCellRender = useCellRender$1(cellRender, dateRender, monthCellRender, getActiveRange(activeIndex));
	var panelValue = calendarValue[activeIndex] || null;
	var isPopupInvalidateDate = useEvent(function(date) {
		return isInvalidateDate(date, { activeIndex });
	});
	var panelProps = import_react$61.useMemo(function() {
		var domProps = pickAttrs(filledProps, false);
		return omit(filledProps, [].concat(_toConsumableArray(Object.keys(domProps)), [
			"onChange",
			"onCalendarChange",
			"style",
			"className",
			"onPanelChange",
			"disabledTime"
		]));
	}, [filledProps]);
	var panel = /* @__PURE__ */ import_react$61.createElement(Popup, _extends({}, panelProps, {
		showNow: mergedShowNow,
		showTime: mergedShowTime,
		range: true,
		multiplePanel,
		activeInfo,
		disabledDate: mergedDisabledDate,
		onFocus: onPanelFocus,
		onBlur: onSharedBlur,
		onPanelMouseDown,
		picker,
		mode: mergedMode,
		internalMode,
		onPanelChange: triggerModeChange,
		format: maskFormat,
		value: panelValue,
		isInvalid: isPopupInvalidateDate,
		onChange: null,
		onSelect: onPanelSelect,
		pickerValue: currentPickerValue,
		defaultOpenValue: toArray$2(showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue)[activeIndex],
		onPickerValueChange: setCurrentPickerValue,
		hoverValue: hoverValues,
		onHover: onPanelHover,
		needConfirm,
		onSubmit: triggerPartConfirm,
		onOk: triggerOk,
		presets: presetList,
		onPresetHover,
		onPresetSubmit,
		onNow,
		cellRender: onInternalCellRender
	}));
	var onSelectorChange = function onSelectorChange$1(date, index) {
		triggerCalendarChange(fillCalendarValue(date, index));
	};
	var onSelectorInputChange = function onSelectorInputChange$1() {
		lastOperation("input");
	};
	var onSelectorFocus = function onSelectorFocus$1(event, index) {
		var activeListLen = activeIndexList.length;
		var lastActiveIndex = activeIndexList[activeListLen - 1];
		if (activeListLen && lastActiveIndex !== index && needConfirm && !allowEmpty[lastActiveIndex] && !hasActiveSubmitValue(lastActiveIndex) && calendarValue[lastActiveIndex]) {
			selectorRef.current.focus({ index: lastActiveIndex });
			return;
		}
		lastOperation("input");
		triggerOpen(true, { inherit: true });
		if (activeIndex !== index && mergedOpen && !needConfirm && complexPicker) triggerPartConfirm(null, true);
		setActiveIndex(index);
		onSharedFocus(event, index);
	};
	var onSelectorBlur = function onSelectorBlur$1(event, index) {
		triggerOpen(false);
		if (!needConfirm && lastOperation() === "input") flushSubmit(activeIndex, nextActiveIndex(calendarValue) === null);
		onSharedBlur(event, index);
	};
	var onSelectorKeyDown = function onSelectorKeyDown$1(event, preventDefault) {
		if (event.key === "Tab") triggerPartConfirm(null, true);
		onKeyDown === null || onKeyDown === void 0 || onKeyDown(event, preventDefault);
	};
	var context = import_react$61.useMemo(function() {
		return {
			prefixCls,
			locale,
			generateConfig,
			button: components.button,
			input: components.input
		};
	}, [
		prefixCls,
		locale,
		generateConfig,
		components.button,
		components.input
	]);
	useLayoutEffect_default(function() {
		if (mergedOpen && activeIndex !== void 0) triggerModeChange(null, picker, false);
	}, [
		mergedOpen,
		activeIndex,
		picker
	]);
	useLayoutEffect_default(function() {
		var lastOp = lastOperation();
		if (!mergedOpen && lastOp === "input") {
			triggerOpen(false);
			triggerPartConfirm(null, true);
		}
		if (!mergedOpen && complexPicker && !needConfirm && lastOp === "panel") {
			triggerOpen(true);
			triggerPartConfirm();
		}
	}, [mergedOpen]);
	return /* @__PURE__ */ import_react$61.createElement(context_default.Provider, { value: context }, /* @__PURE__ */ import_react$61.createElement(PickerTrigger_default, _extends({}, pickTriggerProps(filledProps), {
		popupElement: panel,
		popupStyle: styles.popup,
		popupClassName: classNames$32.popup,
		visible: mergedOpen,
		onClose: onPopupClose,
		range: true
	}), /* @__PURE__ */ import_react$61.createElement(RangeSelector_default, _extends({}, filledProps, {
		ref: selectorRef,
		suffixIcon,
		activeIndex: focused || mergedOpen ? activeIndex : null,
		activeHelp: !!internalHoverValues,
		allHelp: !!internalHoverValues && hoverSource === "preset",
		focused,
		onFocus: onSelectorFocus,
		onBlur: onSelectorBlur,
		onKeyDown: onSelectorKeyDown,
		onSubmit: triggerPartConfirm,
		value: hoverValues,
		maskFormat,
		onChange: onSelectorChange,
		onInputChange: onSelectorInputChange,
		format: formatList,
		inputReadOnly,
		disabled,
		open: mergedOpen,
		onOpenChange: triggerOpen,
		onClick: onSelectorClick,
		onClear: onSelectorClear,
		invalid: submitInvalidates,
		onInvalid: onSelectorInvalid,
		onActiveInfo: setActiveInfo
	}))));
}
var import_react$61, RefRangePicker, RangePicker_default;
var init_RangePicker = __esmMin((() => {
	init_extends();
	init_toConsumableArray();
	init_objectSpread2();
	init_slicedToArray();
	init_es$6();
	init_useLayoutEffect();
	init_omit();
	init_pickAttrs();
	init_warning();
	import_react$61 = /* @__PURE__ */ __toESM(require_react());
	init_PickerTrigger();
	init_util$3();
	init_miscUtil();
	init_context$3();
	init_useCellRender$1();
	init_useFieldsInvalidate();
	init_useFilledProps();
	init_useOpen();
	init_usePickerRef();
	init_usePresets();
	init_useRangeActive();
	init_useRangeDisabledDate();
	init_useRangePickerValue();
	init_useRangeValue();
	init_useShowNow();
	init_Popup();
	init_RangeSelector();
	RefRangePicker = /* @__PURE__ */ import_react$61.forwardRef(RangePicker);
	RangePicker_default = RefRangePicker;
}));
function MultipleDates(props) {
	var prefixCls = props.prefixCls, value = props.value, onRemove = props.onRemove, _props$removeIcon = props.removeIcon, removeIcon = _props$removeIcon === void 0 ? "×" : _props$removeIcon, formatDate = props.formatDate, disabled = props.disabled, maxTagCount = props.maxTagCount, placeholder = props.placeholder;
	var selectorCls = "".concat(prefixCls, "-selector");
	var selectionCls = "".concat(prefixCls, "-selection");
	var overflowCls = "".concat(selectionCls, "-overflow");
	function renderSelector(content, onClose) {
		return /* @__PURE__ */ import_react$60.createElement("span", {
			className: (0, import_classnames$19.default)("".concat(selectionCls, "-item")),
			title: typeof content === "string" ? content : null
		}, /* @__PURE__ */ import_react$60.createElement("span", { className: "".concat(selectionCls, "-item-content") }, content), !disabled && onClose && /* @__PURE__ */ import_react$60.createElement("span", {
			onMouseDown: function onMouseDown(e) {
				e.preventDefault();
			},
			onClick: onClose,
			className: "".concat(selectionCls, "-item-remove")
		}, removeIcon));
	}
	function renderItem(date) {
		return renderSelector(formatDate(date), function onClose(event) {
			if (event) event.stopPropagation();
			onRemove(date);
		});
	}
	function renderRest(omittedValues) {
		return renderSelector("+ ".concat(omittedValues.length, " ..."));
	}
	return /* @__PURE__ */ import_react$60.createElement("div", { className: selectorCls }, /* @__PURE__ */ import_react$60.createElement(es_default$9, {
		prefixCls: overflowCls,
		data: value,
		renderItem,
		renderRest,
		itemKey: function itemKey(date) {
			return formatDate(date);
		},
		maxCount: maxTagCount
	}), !value.length && /* @__PURE__ */ import_react$60.createElement("span", { className: "".concat(prefixCls, "-selection-placeholder") }, placeholder));
}
var import_classnames$19, import_react$60;
var init_MultipleDates = __esmMin((() => {
	import_classnames$19 = /* @__PURE__ */ __toESM(require_classnames());
	init_es$8();
	import_react$60 = /* @__PURE__ */ __toESM(require_react());
}));
function SingleSelector(props, ref) {
	props.id;
	var open = props.open, prefix = props.prefix, clearIcon = props.clearIcon, suffixIcon = props.suffixIcon;
	props.activeHelp;
	props.allHelp;
	var focused = props.focused;
	props.onFocus;
	props.onBlur;
	props.onKeyDown;
	var locale = props.locale, generateConfig = props.generateConfig, placeholder = props.placeholder, className = props.className, style = props.style, onClick = props.onClick, onClear = props.onClear, internalPicker = props.internalPicker, value = props.value, onChange = props.onChange, onSubmit = props.onSubmit;
	props.onInputChange;
	var multiple = props.multiple, maxTagCount = props.maxTagCount;
	props.format;
	props.maskFormat;
	props.preserveInvalidOnBlur;
	props.onInvalid;
	var disabled = props.disabled, invalid = props.invalid;
	props.inputReadOnly;
	var direction = props.direction;
	props.onOpenChange;
	var _onMouseDown = props.onMouseDown;
	props.required;
	props["aria-required"];
	var autoFocus = props.autoFocus, tabIndex = props.tabIndex, removeIcon = props.removeIcon, restProps = _objectWithoutProperties(props, _excluded$11);
	var rtl = direction === "rtl";
	var prefixCls = import_react$59.useContext(context_default).prefixCls;
	var rootRef = import_react$59.useRef();
	var inputRef = import_react$59.useRef();
	import_react$59.useImperativeHandle(ref, function() {
		return {
			nativeElement: rootRef.current,
			focus: function focus(options) {
				var _inputRef$current;
				(_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus(options);
			},
			blur: function blur() {
				var _inputRef$current2;
				(_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.blur();
			}
		};
	});
	var rootProps = useRootProps(restProps);
	var onSingleChange = function onSingleChange$1(date) {
		onChange([date]);
	};
	var onMultipleRemove = function onMultipleRemove$1(date) {
		onChange(value.filter(function(oriDate) {
			return oriDate && !isSame(generateConfig, locale, oriDate, date, internalPicker);
		}));
		if (!open) onSubmit();
	};
	var _useInputProps2 = _slicedToArray(useInputProps(_objectSpread2(_objectSpread2({}, props), {}, { onChange: onSingleChange }), function(_ref) {
		return {
			value: _ref.valueTexts[0] || "",
			active: focused
		};
	}), 2), getInputProps = _useInputProps2[0], getText = _useInputProps2[1];
	var showClear = !!(clearIcon && value.length && !disabled);
	var selectorNode = multiple ? /* @__PURE__ */ import_react$59.createElement(import_react$59.Fragment, null, /* @__PURE__ */ import_react$59.createElement(MultipleDates, {
		prefixCls,
		value,
		onRemove: onMultipleRemove,
		formatDate: getText,
		maxTagCount,
		disabled,
		removeIcon,
		placeholder
	}), /* @__PURE__ */ import_react$59.createElement("input", {
		className: "".concat(prefixCls, "-multiple-input"),
		value: value.map(getText).join(","),
		ref: inputRef,
		readOnly: true,
		autoFocus,
		tabIndex
	}), /* @__PURE__ */ import_react$59.createElement(Icon, {
		type: "suffix",
		icon: suffixIcon
	}), showClear && /* @__PURE__ */ import_react$59.createElement(ClearIcon, {
		icon: clearIcon,
		onClear
	})) : /* @__PURE__ */ import_react$59.createElement(Input_default, _extends({ ref: inputRef }, getInputProps(), {
		autoFocus,
		tabIndex,
		suffixIcon,
		clearIcon: showClear && /* @__PURE__ */ import_react$59.createElement(ClearIcon, {
			icon: clearIcon,
			onClear
		}),
		showActiveCls: false
	}));
	return /* @__PURE__ */ import_react$59.createElement("div", _extends({}, rootProps, {
		className: (0, import_classnames$18.default)(prefixCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-multiple"), multiple), "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-invalid"), invalid), "".concat(prefixCls, "-rtl"), rtl), className),
		style,
		ref: rootRef,
		onClick,
		onMouseDown: function onMouseDown(e) {
			var _inputRef$current3;
			if (e.target !== ((_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.inputElement)) e.preventDefault();
			_onMouseDown === null || _onMouseDown === void 0 || _onMouseDown(e);
		}
	}), prefix && /* @__PURE__ */ import_react$59.createElement("div", { className: "".concat(prefixCls, "-prefix") }, prefix), selectorNode);
}
var import_classnames$18, import_react$59, _excluded$11, RefSingleSelector, SingleSelector_default;
var init_SingleSelector = __esmMin((() => {
	init_defineProperty();
	init_extends();
	init_objectSpread2();
	init_slicedToArray();
	init_objectWithoutProperties();
	import_classnames$18 = /* @__PURE__ */ __toESM(require_classnames());
	import_react$59 = /* @__PURE__ */ __toESM(require_react());
	init_dateUtil();
	init_context$3();
	init_Icon();
	init_Input();
	init_useInputProps();
	init_useRootProps();
	init_MultipleDates();
	_excluded$11 = [
		"id",
		"open",
		"prefix",
		"clearIcon",
		"suffixIcon",
		"activeHelp",
		"allHelp",
		"focused",
		"onFocus",
		"onBlur",
		"onKeyDown",
		"locale",
		"generateConfig",
		"placeholder",
		"className",
		"style",
		"onClick",
		"onClear",
		"internalPicker",
		"value",
		"onChange",
		"onSubmit",
		"onInputChange",
		"multiple",
		"maxTagCount",
		"format",
		"maskFormat",
		"preserveInvalidOnBlur",
		"onInvalid",
		"disabled",
		"invalid",
		"inputReadOnly",
		"direction",
		"onOpenChange",
		"onMouseDown",
		"required",
		"aria-required",
		"autoFocus",
		"tabIndex",
		"removeIcon"
	];
	RefSingleSelector = /* @__PURE__ */ import_react$59.forwardRef(SingleSelector);
	SingleSelector_default = RefSingleSelector;
}));
function Picker(props, ref) {
	var _useFilledProps2 = _slicedToArray(useFilledProps(props), 6), filledProps = _useFilledProps2[0], internalPicker = _useFilledProps2[1], complexPicker = _useFilledProps2[2], formatList = _useFilledProps2[3], maskFormat = _useFilledProps2[4], isInvalidateDate = _useFilledProps2[5];
	var _ref = filledProps, prefixCls = _ref.prefixCls, styles = _ref.styles, classNames$32 = _ref.classNames, order = _ref.order, defaultValue = _ref.defaultValue, value = _ref.value, needConfirm = _ref.needConfirm, onChange = _ref.onChange, onKeyDown = _ref.onKeyDown, disabled = _ref.disabled, disabledDate = _ref.disabledDate, minDate = _ref.minDate, maxDate = _ref.maxDate, defaultOpen = _ref.defaultOpen, open = _ref.open, onOpenChange = _ref.onOpenChange, locale = _ref.locale, generateConfig = _ref.generateConfig, picker = _ref.picker, showNow = _ref.showNow, showToday = _ref.showToday, showTime = _ref.showTime, mode = _ref.mode, onPanelChange = _ref.onPanelChange, onCalendarChange = _ref.onCalendarChange, onOk = _ref.onOk, multiple = _ref.multiple, defaultPickerValue = _ref.defaultPickerValue, pickerValue = _ref.pickerValue, onPickerValueChange = _ref.onPickerValueChange, inputReadOnly = _ref.inputReadOnly, suffixIcon = _ref.suffixIcon, removeIcon = _ref.removeIcon, onFocus = _ref.onFocus, onBlur = _ref.onBlur, presets = _ref.presets, components = _ref.components, cellRender = _ref.cellRender, dateRender = _ref.dateRender, monthCellRender = _ref.monthCellRender, onClick = _ref.onClick;
	var selectorRef = usePickerRef(ref);
	function pickerParam(values) {
		if (values === null) return null;
		return multiple ? values : values[0];
	}
	var toggleDates = useToggleDates(generateConfig, locale, internalPicker);
	var _useOpen2 = _slicedToArray(useOpen(open, defaultOpen, [disabled], onOpenChange), 2), mergedOpen = _useOpen2[0], triggerOpen = _useOpen2[1];
	var _useInnerValue2 = _slicedToArray(useInnerValue(generateConfig, locale, formatList, false, order, defaultValue, value, function onInternalCalendarChange(dates, dateStrings, info) {
		if (onCalendarChange) {
			var filteredInfo = _objectSpread2({}, info);
			delete filteredInfo.range;
			onCalendarChange(pickerParam(dates), pickerParam(dateStrings), filteredInfo);
		}
	}, function onInternalOk(dates) {
		onOk === null || onOk === void 0 || onOk(pickerParam(dates));
	}), 5), mergedValue = _useInnerValue2[0], setInnerValue = _useInnerValue2[1], getCalendarValue = _useInnerValue2[2], triggerCalendarChange = _useInnerValue2[3], triggerOk = _useInnerValue2[4];
	var calendarValue = getCalendarValue();
	var _useRangeActive2 = _slicedToArray(useRangeActive([disabled]), 4), focused = _useRangeActive2[0], triggerFocus = _useRangeActive2[1], lastOperation = _useRangeActive2[2], activeIndex = _useRangeActive2[3];
	var onSharedFocus = function onSharedFocus$1(event) {
		triggerFocus(true);
		onFocus === null || onFocus === void 0 || onFocus(event, {});
	};
	var onSharedBlur = function onSharedBlur$1(event) {
		triggerFocus(false);
		onBlur === null || onBlur === void 0 || onBlur(event, {});
	};
	var _useMergedState2 = _slicedToArray(useMergedState(picker, { value: mode }), 2), mergedMode = _useMergedState2[0], setMode = _useMergedState2[1];
	var internalMode = mergedMode === "date" && showTime ? "datetime" : mergedMode;
	var mergedShowNow = useShowNow(picker, mergedMode, showNow, showToday);
	var onInternalChange = onChange && function(dates, dateStrings) {
		onChange(pickerParam(dates), pickerParam(dateStrings));
	};
	var triggerSubmitChange = _slicedToArray(useRangeValue(_objectSpread2(_objectSpread2({}, filledProps), {}, { onChange: onInternalChange }), mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, [], formatList, focused, mergedOpen, isInvalidateDate), 2)[1];
	var _useFieldsInvalidate2 = _slicedToArray(useFieldsInvalidate(calendarValue, isInvalidateDate), 2), submitInvalidates = _useFieldsInvalidate2[0], onSelectorInvalid = _useFieldsInvalidate2[1];
	var submitInvalidate = import_react$58.useMemo(function() {
		return submitInvalidates.some(function(invalidated) {
			return invalidated;
		});
	}, [submitInvalidates]);
	var _useRangePickerValue2 = _slicedToArray(useRangePickerValue(generateConfig, locale, calendarValue, [mergedMode], mergedOpen, activeIndex, internalPicker, false, defaultPickerValue, pickerValue, toArray$2(showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue), function onInternalPickerValueChange(dates, info) {
		if (onPickerValueChange) {
			var cleanInfo = _objectSpread2(_objectSpread2({}, info), {}, { mode: info.mode[0] });
			delete cleanInfo.range;
			onPickerValueChange(dates[0], cleanInfo);
		}
	}, minDate, maxDate), 2), currentPickerValue = _useRangePickerValue2[0], setCurrentPickerValue = _useRangePickerValue2[1];
	var triggerModeChange = useEvent(function(nextPickerValue, nextMode, triggerEvent) {
		setMode(nextMode);
		if (onPanelChange && triggerEvent !== false) onPanelChange(nextPickerValue || calendarValue[calendarValue.length - 1], nextMode);
	});
	var triggerConfirm = function triggerConfirm$1() {
		triggerSubmitChange(getCalendarValue());
		triggerOpen(false, { force: true });
	};
	var onSelectorClick = function onSelectorClick$1(event) {
		if (!disabled && !selectorRef.current.nativeElement.contains(document.activeElement)) selectorRef.current.focus();
		triggerOpen(true);
		onClick === null || onClick === void 0 || onClick(event);
	};
	var onSelectorClear = function onSelectorClear$1() {
		triggerSubmitChange(null);
		triggerOpen(false, { force: true });
	};
	var _React$useState2 = _slicedToArray(import_react$58.useState(null), 2), hoverSource = _React$useState2[0], setHoverSource = _React$useState2[1];
	var _React$useState4 = _slicedToArray(import_react$58.useState(null), 2), internalHoverValue = _React$useState4[0], setInternalHoverValue = _React$useState4[1];
	var hoverValues = import_react$58.useMemo(function() {
		var values = [internalHoverValue].concat(_toConsumableArray(calendarValue)).filter(function(date) {
			return date;
		});
		return multiple ? values : values.slice(0, 1);
	}, [
		calendarValue,
		internalHoverValue,
		multiple
	]);
	var selectorValues = import_react$58.useMemo(function() {
		if (!multiple && internalHoverValue) return [internalHoverValue];
		return calendarValue.filter(function(date) {
			return date;
		});
	}, [
		calendarValue,
		internalHoverValue,
		multiple
	]);
	import_react$58.useEffect(function() {
		if (!mergedOpen) setInternalHoverValue(null);
	}, [mergedOpen]);
	var presetList = usePresets(presets);
	var onPresetHover = function onPresetHover$1(nextValue) {
		setInternalHoverValue(nextValue);
		setHoverSource("preset");
	};
	var onPresetSubmit = function onPresetSubmit$1(nextValue) {
		if (triggerSubmitChange(multiple ? toggleDates(getCalendarValue(), nextValue) : [nextValue]) && !multiple) triggerOpen(false, { force: true });
	};
	var onNow = function onNow$1(now) {
		onPresetSubmit(now);
	};
	var onPanelHover = function onPanelHover$1(date) {
		setInternalHoverValue(date);
		setHoverSource("cell");
	};
	var onPanelFocus = function onPanelFocus$1(event) {
		triggerOpen(true);
		onSharedFocus(event);
	};
	var onPanelSelect = function onPanelSelect$1(date) {
		lastOperation("panel");
		if (multiple && internalMode !== picker) return;
		triggerCalendarChange(multiple ? toggleDates(getCalendarValue(), date) : [date]);
		if (!needConfirm && !complexPicker && internalPicker === internalMode) triggerConfirm();
	};
	var onPopupClose = function onPopupClose$1() {
		triggerOpen(false);
	};
	var onInternalCellRender = useCellRender$1(cellRender, dateRender, monthCellRender);
	var panelProps = import_react$58.useMemo(function() {
		var domProps = pickAttrs(filledProps, false);
		return _objectSpread2(_objectSpread2({}, omit(filledProps, [].concat(_toConsumableArray(Object.keys(domProps)), [
			"onChange",
			"onCalendarChange",
			"style",
			"className",
			"onPanelChange"
		]))), {}, { multiple: filledProps.multiple });
	}, [filledProps]);
	var panel = /* @__PURE__ */ import_react$58.createElement(Popup, _extends({}, panelProps, {
		showNow: mergedShowNow,
		showTime,
		disabledDate,
		onFocus: onPanelFocus,
		onBlur: onSharedBlur,
		picker,
		mode: mergedMode,
		internalMode,
		onPanelChange: triggerModeChange,
		format: maskFormat,
		value: calendarValue,
		isInvalid: isInvalidateDate,
		onChange: null,
		onSelect: onPanelSelect,
		pickerValue: currentPickerValue,
		defaultOpenValue: showTime === null || showTime === void 0 ? void 0 : showTime.defaultOpenValue,
		onPickerValueChange: setCurrentPickerValue,
		hoverValue: hoverValues,
		onHover: onPanelHover,
		needConfirm,
		onSubmit: triggerConfirm,
		onOk: triggerOk,
		presets: presetList,
		onPresetHover,
		onPresetSubmit,
		onNow,
		cellRender: onInternalCellRender
	}));
	var onSelectorChange = function onSelectorChange$1(date) {
		triggerCalendarChange(date);
	};
	var onSelectorInputChange = function onSelectorInputChange$1() {
		lastOperation("input");
	};
	var onSelectorFocus = function onSelectorFocus$1(event) {
		lastOperation("input");
		triggerOpen(true, { inherit: true });
		onSharedFocus(event);
	};
	var onSelectorBlur = function onSelectorBlur$1(event) {
		triggerOpen(false);
		onSharedBlur(event);
	};
	var onSelectorKeyDown = function onSelectorKeyDown$1(event, preventDefault) {
		if (event.key === "Tab") triggerConfirm();
		onKeyDown === null || onKeyDown === void 0 || onKeyDown(event, preventDefault);
	};
	var context = import_react$58.useMemo(function() {
		return {
			prefixCls,
			locale,
			generateConfig,
			button: components.button,
			input: components.input
		};
	}, [
		prefixCls,
		locale,
		generateConfig,
		components.button,
		components.input
	]);
	useLayoutEffect_default(function() {
		if (mergedOpen && activeIndex !== void 0) triggerModeChange(null, picker, false);
	}, [
		mergedOpen,
		activeIndex,
		picker
	]);
	useLayoutEffect_default(function() {
		var lastOp = lastOperation();
		if (!mergedOpen && lastOp === "input") {
			triggerOpen(false);
			triggerConfirm();
		}
		if (!mergedOpen && complexPicker && !needConfirm && lastOp === "panel") triggerConfirm();
	}, [mergedOpen]);
	return /* @__PURE__ */ import_react$58.createElement(context_default.Provider, { value: context }, /* @__PURE__ */ import_react$58.createElement(PickerTrigger_default, _extends({}, pickTriggerProps(filledProps), {
		popupElement: panel,
		popupStyle: styles.popup,
		popupClassName: classNames$32.popup,
		visible: mergedOpen,
		onClose: onPopupClose
	}), /* @__PURE__ */ import_react$58.createElement(SingleSelector_default, _extends({}, filledProps, {
		ref: selectorRef,
		suffixIcon,
		removeIcon,
		activeHelp: !!internalHoverValue,
		allHelp: !!internalHoverValue && hoverSource === "preset",
		focused,
		onFocus: onSelectorFocus,
		onBlur: onSelectorBlur,
		onKeyDown: onSelectorKeyDown,
		onSubmit: triggerConfirm,
		value: selectorValues,
		maskFormat,
		onChange: onSelectorChange,
		onInputChange: onSelectorInputChange,
		internalPicker,
		format: formatList,
		inputReadOnly,
		disabled,
		open: mergedOpen,
		onOpenChange: triggerOpen,
		onClick: onSelectorClick,
		onClear: onSelectorClear,
		invalid: submitInvalidate,
		onInvalid: function onInvalid(invalid) {
			onSelectorInvalid(invalid, 0);
		}
	}))));
}
var import_react$58, RefPicker, SinglePicker_default;
var init_SinglePicker = __esmMin((() => {
	init_extends();
	init_toConsumableArray();
	init_objectSpread2();
	init_slicedToArray();
	init_es$6();
	init_useLayoutEffect();
	init_omit();
	init_pickAttrs();
	import_react$58 = /* @__PURE__ */ __toESM(require_react());
	init_useToggleDates();
	init_PickerTrigger();
	init_util$3();
	init_miscUtil();
	init_context$3();
	init_useCellRender$1();
	init_useFieldsInvalidate();
	init_useFilledProps();
	init_useOpen();
	init_usePickerRef();
	init_usePresets();
	init_useRangeActive();
	init_useRangePickerValue();
	init_useRangeValue();
	init_useShowNow();
	init_Popup();
	init_SingleSelector();
	RefPicker = /* @__PURE__ */ import_react$58.forwardRef(Picker);
	SinglePicker_default = RefPicker;
}));
var es_exports$3 = /* @__PURE__ */ __export({
	Picker: () => SinglePicker_default,
	PickerPanel: () => PickerPanel_default,
	RangePicker: () => RangePicker_default,
	default: () => es_default$8
}, 1);
var es_default$8;
var init_es$4 = __esmMin((() => {
	init_RangePicker();
	init_SinglePicker();
	init_PickerPanel();
	es_default$8 = SinglePicker_default;
}));
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
	init_es$9();
	init_es$10();
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
	init_es$7();
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
	init_es$11();
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
	init_es$6();
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
	init_es$6();
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
	init_es$7();
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
	init_es$7();
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
	init_es$7();
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
	init_es$12();
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
	init_es$6();
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
export { require_localeData as C, require_weekOfYear as S, es_default$8 as _, convertChildrenToColumns as a, RangePicker_default as b, FooterComponents as c, es_default$3 as d, es_exports$1 as f, init_es$3 as g, es_exports$2 as h, genTable as i, EXPAND_COLUMN as l, es_default$4 as m, init_es as n, init_useColumns as o, init_es$2 as p, genVirtualTable as r, INTERNAL_COL_DEFINE as s, es_exports as t, INTERNAL_HOOKS as u, es_exports$3 as v, require_weekday as w, require_weekYear as x, init_es$4 as y };
