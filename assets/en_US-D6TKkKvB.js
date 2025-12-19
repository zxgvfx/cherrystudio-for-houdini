import { b as __commonJSMin } from "./chunk-st2fFX3F.js";
var require_interopRequireDefault = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _interopRequireDefault$4(e) {
		return e && e.__esModule ? e : { "default": e };
	}
	module.exports = _interopRequireDefault$4, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
var require_typeof = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof$2(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o$1) {
			return typeof o$1;
		} : function(o$1) {
			return o$1 && "function" == typeof Symbol && o$1.constructor === Symbol && o$1 !== Symbol.prototype ? "symbol" : typeof o$1;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof$2(o);
	}
	module.exports = _typeof$2, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
var require_toPrimitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof$1 = require_typeof()["default"];
	function toPrimitive$1(t, r) {
		if ("object" != _typeof$1(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof$1(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
var require_toPropertyKey = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof = require_typeof()["default"];
	var toPrimitive = require_toPrimitive();
	function toPropertyKey$1(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
var require_defineProperty = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
var require_objectSpread2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var defineProperty = require_defineProperty();
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r$1) {
				return Object.getOwnPropertyDescriptor(e, r$1).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread2$1(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r$1) {
				defineProperty(e, r$1, t[r$1]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r$1) {
				Object.defineProperty(e, r$1, Object.getOwnPropertyDescriptor(t, r$1));
			});
		}
		return e;
	}
	module.exports = _objectSpread2$1, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
var require_common = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.commonLocale = {
		yearFormat: "YYYY",
		dayFormat: "D",
		cellMeridiemFormat: "A",
		monthBeforeYear: true
	};
}));
var require_en_US$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$3 = {
		items_per_page: "/ page",
		jump_to: "Go to",
		jump_to_confirm: "confirm",
		page: "Page",
		prev_page: "Previous Page",
		next_page: "Next Page",
		prev_5: "Previous 5 Pages",
		next_5: "Next 5 Pages",
		prev_3: "Previous 3 Pages",
		next_3: "Next 3 Pages",
		page_size: "Page Size"
	};
	exports.default = locale$3;
}));
var require_en_US$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$3 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2 = _interopRequireDefault$3(require_objectSpread2());
	var _common = require_common();
	var locale$2 = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _common.commonLocale), {}, {
		locale: "en_US",
		today: "Today",
		now: "Now",
		backToToday: "Back to today",
		ok: "OK",
		clear: "Clear",
		week: "Week",
		month: "Month",
		year: "Year",
		timeSelect: "select time",
		dateSelect: "select date",
		weekSelect: "Choose a week",
		monthSelect: "Choose a month",
		yearSelect: "Choose a year",
		decadeSelect: "Choose a decade",
		dateFormat: "M/D/YYYY",
		dateTimeFormat: "M/D/YYYY HH:mm:ss",
		previousMonth: "Previous month (PageUp)",
		nextMonth: "Next month (PageDown)",
		previousYear: "Last year (Control + left)",
		nextYear: "Next year (Control + right)",
		previousDecade: "Last decade",
		nextDecade: "Next decade",
		previousCentury: "Last century",
		nextCentury: "Next century"
	});
	exports.default = locale$2;
}));
var require_en_US$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$1 = {
		placeholder: "Select time",
		rangePlaceholder: ["Start time", "End time"]
	};
	exports.default = locale$1;
}));
var require_en_US$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$2 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _en_US$2 = _interopRequireDefault$2(require_en_US$4());
	var _en_US2$1 = _interopRequireDefault$2(require_en_US$3());
	const locale = {
		lang: Object.assign({
			placeholder: "Select date",
			yearPlaceholder: "Select year",
			quarterPlaceholder: "Select quarter",
			monthPlaceholder: "Select month",
			weekPlaceholder: "Select week",
			rangePlaceholder: ["Start date", "End date"],
			rangeYearPlaceholder: ["Start year", "End year"],
			rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
			rangeMonthPlaceholder: ["Start month", "End month"],
			rangeWeekPlaceholder: ["Start week", "End week"]
		}, _en_US$2.default),
		timePickerLocale: Object.assign({}, _en_US2$1.default)
	};
	exports.default = locale;
}));
var require_en_US$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$1 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _en_US$1 = _interopRequireDefault$1(require_en_US$2());
	exports.default = _en_US$1.default;
}));
var require_en_US = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _en_US = _interopRequireDefault(require_en_US$5());
	var _en_US2 = _interopRequireDefault(require_en_US$1());
	var _en_US3 = _interopRequireDefault(require_en_US$2());
	var _en_US4 = _interopRequireDefault(require_en_US$3());
	const typeTemplate = "${label} is not a valid ${type}";
	const localeValues = {
		locale: "en",
		Pagination: _en_US.default,
		DatePicker: _en_US3.default,
		TimePicker: _en_US4.default,
		Calendar: _en_US2.default,
		global: {
			placeholder: "Please select",
			close: "Close"
		},
		Table: {
			filterTitle: "Filter menu",
			filterConfirm: "OK",
			filterReset: "Reset",
			filterEmptyText: "No filters",
			filterCheckAll: "Select all items",
			filterSearchPlaceholder: "Search in filters",
			emptyText: "No data",
			selectAll: "Select current page",
			selectInvert: "Invert current page",
			selectNone: "Clear all data",
			selectionAll: "Select all data",
			sortTitle: "Sort",
			expand: "Expand row",
			collapse: "Collapse row",
			triggerDesc: "Click to sort descending",
			triggerAsc: "Click to sort ascending",
			cancelSort: "Click to cancel sorting"
		},
		Tour: {
			Next: "Next",
			Previous: "Previous",
			Finish: "Finish"
		},
		Modal: {
			okText: "OK",
			cancelText: "Cancel",
			justOkText: "OK"
		},
		Popconfirm: {
			okText: "OK",
			cancelText: "Cancel"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "Search here",
			itemUnit: "item",
			itemsUnit: "items",
			remove: "Remove",
			selectCurrent: "Select current page",
			removeCurrent: "Remove current page",
			selectAll: "Select all data",
			deselectAll: "Deselect all data",
			removeAll: "Remove all data",
			selectInvert: "Invert current page"
		},
		Upload: {
			uploading: "Uploading...",
			removeFile: "Remove file",
			uploadError: "Upload error",
			previewFile: "Preview file",
			downloadFile: "Download file"
		},
		Empty: { description: "No data" },
		Icon: { icon: "icon" },
		Text: {
			edit: "Edit",
			copy: "Copy",
			copied: "Copied",
			expand: "Expand",
			collapse: "Collapse"
		},
		Form: {
			optional: "(optional)",
			defaultValidateMessages: {
				default: "Field validation error for ${label}",
				required: "Please enter ${label}",
				enum: "${label} must be one of [${enum}]",
				whitespace: "${label} cannot be a blank character",
				date: {
					format: "${label} date format is invalid",
					parse: "${label} cannot be converted to a date",
					invalid: "${label} is an invalid date"
				},
				types: {
					string: typeTemplate,
					method: typeTemplate,
					array: typeTemplate,
					object: typeTemplate,
					number: typeTemplate,
					date: typeTemplate,
					boolean: typeTemplate,
					integer: typeTemplate,
					float: typeTemplate,
					regexp: typeTemplate,
					email: typeTemplate,
					url: typeTemplate,
					hex: typeTemplate
				},
				string: {
					len: "${label} must be ${len} characters",
					min: "${label} must be at least ${min} characters",
					max: "${label} must be up to ${max} characters",
					range: "${label} must be between ${min}-${max} characters"
				},
				number: {
					len: "${label} must be equal to ${len}",
					min: "${label} must be minimum ${min}",
					max: "${label} must be maximum ${max}",
					range: "${label} must be between ${min}-${max}"
				},
				array: {
					len: "Must be ${len} ${label}",
					min: "At least ${min} ${label}",
					max: "At most ${max} ${label}",
					range: "The amount of ${label} must be between ${min}-${max}"
				},
				pattern: { mismatch: "${label} does not match the pattern ${pattern}" }
			}
		},
		Image: { preview: "Preview" },
		QRCode: {
			expired: "QR code expired",
			refresh: "Refresh",
			scanned: "Scanned"
		},
		ColorPicker: {
			presetEmpty: "Empty",
			transparent: "Transparent",
			singleColor: "Single",
			gradientColor: "Gradient"
		}
	};
	exports.default = localeValues;
}));
export { require_en_US as b, require_en_US$1 as c, require_en_US$2 as d, require_en_US$5 as e, require_common as f, require_objectSpread2 as g, require_defineProperty as h, require_toPropertyKey as i, require_typeof as j, require_interopRequireDefault as k };
