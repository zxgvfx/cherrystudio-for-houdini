import { a as __toCommonJS, n as __esmMin, o as __toESM, r as __export } from "./chunk-0ogMdkZ1.js";
import { $i as unit, Ai as presetPrimaryColors, An as es_default$2, Ar as init_es$6, Bn as init_es$10, Br as init_omit, Ci as init_useEvent, Ei as init_es$1, Fi as init_set, Fn as SubMenu_default$1, Fr as init_es$5, Ga as init_ref, Gi as init_es$2, Gr as init_regeneratorRuntime, Ha as composeRef, Hi as Context_default, Hn as init_LeftOutlined, Hr as _asyncToGenerator, Ia as _createClass, Ii as merge$1, In as MenuItem_default$1, Ir as ColorBlock_default, Ja as useComposeRef, Ka as supportNodeRef, Ki as Keyframes_default, Kr as LoadingOutlined_default, La as init_createClass, Ln as useFullPath, Lr as Color, Mn as init_es$9, Mr as init_RightOutlined, Ni as init_es, Nn as MenuItemGroup_default, On as EllipsisOutlined_default, Or as es_default$4, Pi as FastColor, Pn as Divider, Ra as _classCallCheck, Rn as es_default$1, Rr as init_isVisible, Tt as DownloadOutlined_default, Ui as init_Context, Ur as init_asyncToGenerator, Vn as LeftOutlined_default, Vr as omit, Wa as getNodeRef, Wr as _regeneratorRuntime, Xa as useMemo$6, Xi as init_useLayoutEffect, Xn as Popup, Y as GlobalOutlined_default, Ya as init_useMemo, Yi as useCacheToken, Yn as init_es$8, Zi as useLayoutEffect_default, Zo as loggerService, _a as _toConsumableArray, _o as i18n_default, an as ZoomInOutlined_default, bi as useMergedState, ci as es_default$5, cn as init_SwapOutlined, da as canUseDom, dn as RotateLeftOutlined_default, do as _typeof, dr as FormProvider, ea as createTheme, f as ToolOutlined_default, fa as init_canUseDom, fi as MotionProvider, fn as init_RotateLeftOutlined, fo as init_typeof, ga as raf_default, gi as merge, ha as init_raf, hi as genStyleUtils_default, hn as init_es$11, ho as require_classnames, ia as isEqual_default, in as init_ZoomOutOutlined, ji as generate, jr as RightOutlined_default, ki as presetPalettes, kn as init_EllipsisOutlined, kt as CopyOutlined_default, la as init_dynamicCSS, ln as RotateRightOutlined_default, lo as init_toArray, lr as init_es$7, mi as init_es$3, n as init_es$12, ni as CloseOutlined_default, no as _objectSpread2, on as init_ZoomInOutlined, oo as init_warning, pn as es_default, qa as supportRef, qi as useStyleRegister, qn as es_default$3, qr as init_LoadingOutlined, ra as init_isEqual, ri as init_CloseOutlined, rn as ZoomOutOutlined_default, ro as init_objectSpread2, sn as SwapOutlined_default, ta as StyleContext_default, to as require_react_dom, u as UndoOutlined_default, ua as updateCSS, ui as init_es$4, un as init_RotateRightOutlined, uo as toArray$1, va as init_toConsumableArray, vn as EyeOutlined_default, wi as useEvent, yi as init_useMergedState, yn as init_EyeOutlined, yo as useTranslation, za as init_classCallCheck, zr as isVisible_default } from "./es-DkAVbmke.js";
import { t as require_react } from "./react-1FqkuScD.js";
import { t as ChevronRight } from "./chevron-right-CFXahaOF.js";
import { t as Copy } from "./copy-BfOh9mRD.js";
import { t as Download } from "./download-D_oOyMFr.js";
import { t as Image$1 } from "./image-D2P-hgnz.js";
import { t as Pencil } from "./pencil-W7SUSAI0.js";
import { t as RefreshCw } from "./refresh-cw-CNDxr_SX.js";
import { t as RotateCcw } from "./rotate-ccw-BcGS4Mo5.js";
import { t as Trash } from "./trash-CIHBz-ci.js";
import { n as dt } from "./styled-components.browser.esm-B07kmh63.js";
import { t as require_jsx_runtime } from "./jsx-runtime-T-fCGkSK.js";
var import_react = /* @__PURE__ */ __toESM(require_react());
init_warning();
function noop$1() {}
const WarningContext = /* @__PURE__ */ import_react.createContext({});
const devUseWarning = () => {
	const noopWarning = () => {};
	noopWarning.deprecated = noop$1;
	return noopWarning;
};
var validateMessagesContext_default = /* @__PURE__ */ (0, import_react.createContext)(void 0);
var en_US_default$1 = {
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
var commonLocale = {
	yearFormat: "YYYY",
	dayFormat: "D",
	cellMeridiemFormat: "A",
	monthBeforeYear: true
};
init_objectSpread2();
var en_US_default$5 = _objectSpread2(_objectSpread2({}, commonLocale), {}, {
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
var en_US_default$4 = {
	placeholder: "Select time",
	rangePlaceholder: ["Start time", "End time"]
};
var en_US_default$3 = {
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
	}, en_US_default$5),
	timePickerLocale: Object.assign({}, en_US_default$4)
};
var en_US_default$2 = en_US_default$3;
var typeTemplate = "${label} is not a valid ${type}";
var en_US_default = {
	locale: "en",
	Pagination: en_US_default$1,
	DatePicker: en_US_default$3,
	TimePicker: en_US_default$4,
	Calendar: en_US_default$2,
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
var runtimeLocale = Object.assign({}, en_US_default.Modal);
var localeList = [];
var generateLocale = () => localeList.reduce((merged, locale$4) => Object.assign(Object.assign({}, merged), locale$4), en_US_default.Modal);
function changeConfirmLocale(newLocale) {
	if (newLocale) {
		const cloneLocale = Object.assign({}, newLocale);
		localeList.push(cloneLocale);
		runtimeLocale = generateLocale();
		return () => {
			localeList = localeList.filter((locale$4) => locale$4 !== cloneLocale);
			runtimeLocale = generateLocale();
		};
	}
	runtimeLocale = Object.assign({}, en_US_default.Modal);
}
function getConfirmLocale() {
	return runtimeLocale;
}
var context_default = /* @__PURE__ */ (0, import_react.createContext)(void 0);
var useLocale = (componentName, defaultLocale) => {
	const fullLocale = import_react.useContext(context_default);
	return [import_react.useMemo(() => {
		var _a;
		const locale$4 = defaultLocale || en_US_default[componentName];
		const localeFromContext = (_a = fullLocale === null || fullLocale === void 0 ? void 0 : fullLocale[componentName]) !== null && _a !== void 0 ? _a : {};
		return Object.assign(Object.assign({}, typeof locale$4 === "function" ? locale$4() : locale$4), localeFromContext || {});
	}, [
		componentName,
		defaultLocale,
		fullLocale
	]), import_react.useMemo(() => {
		const localeCode = fullLocale === null || fullLocale === void 0 ? void 0 : fullLocale.locale;
		if ((fullLocale === null || fullLocale === void 0 ? void 0 : fullLocale.exist) && !localeCode) return en_US_default.locale;
		return localeCode;
	}, [fullLocale])];
};
var useLocale_default = useLocale;
const ANT_MARK = "internalMark";
var LocaleProvider = (props) => {
	const { locale: locale$4 = {}, children, _ANT_MARK__ } = props;
	import_react.useEffect(() => {
		return changeConfirmLocale(locale$4 === null || locale$4 === void 0 ? void 0 : locale$4.Modal);
	}, [locale$4]);
	const getMemoizedContextValue = import_react.useMemo(() => Object.assign(Object.assign({}, locale$4), { exist: true }), [locale$4]);
	return /* @__PURE__ */ import_react.createElement(context_default.Provider, { value: getMemoizedContextValue }, children);
};
var locale_default = LocaleProvider;
const defaultPresetColors = {
	blue: "#1677FF",
	purple: "#722ED1",
	cyan: "#13C2C2",
	green: "#52C41A",
	magenta: "#EB2F96",
	pink: "#EB2F96",
	red: "#F5222D",
	orange: "#FA8C16",
	yellow: "#FADB14",
	volcano: "#FA541C",
	geekblue: "#2F54EB",
	gold: "#FAAD14",
	lime: "#A0D911"
};
var seed_default = Object.assign(Object.assign({}, defaultPresetColors), {
	colorPrimary: "#1677ff",
	colorSuccess: "#52c41a",
	colorWarning: "#faad14",
	colorError: "#ff4d4f",
	colorInfo: "#1677ff",
	colorLink: "",
	colorTextBase: "",
	colorBgBase: "",
	fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
	fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
	fontSize: 14,
	lineWidth: 1,
	lineType: "solid",
	motionUnit: .1,
	motionBase: 0,
	motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
	motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
	motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
	motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
	motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
	motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
	motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
	motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
	borderRadius: 6,
	sizeUnit: 4,
	sizeStep: 4,
	sizePopupArrow: 16,
	controlHeight: 32,
	zIndexBase: 0,
	zIndexPopupBase: 1e3,
	opacityImage: 1,
	wireframe: false,
	motion: true
});
init_es();
function genColorMapToken(seed, { generateColorPalettes: generateColorPalettes$1, generateNeutralColorPalettes: generateNeutralColorPalettes$1 }) {
	const { colorSuccess: colorSuccessBase, colorWarning: colorWarningBase, colorError: colorErrorBase, colorInfo: colorInfoBase, colorPrimary: colorPrimaryBase, colorBgBase, colorTextBase } = seed;
	const primaryColors = generateColorPalettes$1(colorPrimaryBase);
	const successColors = generateColorPalettes$1(colorSuccessBase);
	const warningColors = generateColorPalettes$1(colorWarningBase);
	const errorColors = generateColorPalettes$1(colorErrorBase);
	const infoColors = generateColorPalettes$1(colorInfoBase);
	const neutralColors = generateNeutralColorPalettes$1(colorBgBase, colorTextBase);
	const linkColors = generateColorPalettes$1(seed.colorLink || seed.colorInfo);
	const colorErrorBgFilledHover = new FastColor(errorColors[1]).mix(new FastColor(errorColors[3]), 50).toHexString();
	return Object.assign(Object.assign({}, neutralColors), {
		colorPrimaryBg: primaryColors[1],
		colorPrimaryBgHover: primaryColors[2],
		colorPrimaryBorder: primaryColors[3],
		colorPrimaryBorderHover: primaryColors[4],
		colorPrimaryHover: primaryColors[5],
		colorPrimary: primaryColors[6],
		colorPrimaryActive: primaryColors[7],
		colorPrimaryTextHover: primaryColors[8],
		colorPrimaryText: primaryColors[9],
		colorPrimaryTextActive: primaryColors[10],
		colorSuccessBg: successColors[1],
		colorSuccessBgHover: successColors[2],
		colorSuccessBorder: successColors[3],
		colorSuccessBorderHover: successColors[4],
		colorSuccessHover: successColors[4],
		colorSuccess: successColors[6],
		colorSuccessActive: successColors[7],
		colorSuccessTextHover: successColors[8],
		colorSuccessText: successColors[9],
		colorSuccessTextActive: successColors[10],
		colorErrorBg: errorColors[1],
		colorErrorBgHover: errorColors[2],
		colorErrorBgFilledHover,
		colorErrorBgActive: errorColors[3],
		colorErrorBorder: errorColors[3],
		colorErrorBorderHover: errorColors[4],
		colorErrorHover: errorColors[5],
		colorError: errorColors[6],
		colorErrorActive: errorColors[7],
		colorErrorTextHover: errorColors[8],
		colorErrorText: errorColors[9],
		colorErrorTextActive: errorColors[10],
		colorWarningBg: warningColors[1],
		colorWarningBgHover: warningColors[2],
		colorWarningBorder: warningColors[3],
		colorWarningBorderHover: warningColors[4],
		colorWarningHover: warningColors[4],
		colorWarning: warningColors[6],
		colorWarningActive: warningColors[7],
		colorWarningTextHover: warningColors[8],
		colorWarningText: warningColors[9],
		colorWarningTextActive: warningColors[10],
		colorInfoBg: infoColors[1],
		colorInfoBgHover: infoColors[2],
		colorInfoBorder: infoColors[3],
		colorInfoBorderHover: infoColors[4],
		colorInfoHover: infoColors[4],
		colorInfo: infoColors[6],
		colorInfoActive: infoColors[7],
		colorInfoTextHover: infoColors[8],
		colorInfoText: infoColors[9],
		colorInfoTextActive: infoColors[10],
		colorLinkHover: linkColors[4],
		colorLink: linkColors[6],
		colorLinkActive: linkColors[7],
		colorBgMask: new FastColor("#000").setA(.45).toRgbString(),
		colorWhite: "#fff"
	});
}
var genRadius = (radiusBase) => {
	let radiusLG = radiusBase;
	let radiusSM = radiusBase;
	let radiusXS = radiusBase;
	let radiusOuter = radiusBase;
	if (radiusBase < 6 && radiusBase >= 5) radiusLG = radiusBase + 1;
	else if (radiusBase < 16 && radiusBase >= 6) radiusLG = radiusBase + 2;
	else if (radiusBase >= 16) radiusLG = 16;
	if (radiusBase < 7 && radiusBase >= 5) radiusSM = 4;
	else if (radiusBase < 8 && radiusBase >= 7) radiusSM = 5;
	else if (radiusBase < 14 && radiusBase >= 8) radiusSM = 6;
	else if (radiusBase < 16 && radiusBase >= 14) radiusSM = 7;
	else if (radiusBase >= 16) radiusSM = 8;
	if (radiusBase < 6 && radiusBase >= 2) radiusXS = 1;
	else if (radiusBase >= 6) radiusXS = 2;
	if (radiusBase > 4 && radiusBase < 8) radiusOuter = 4;
	else if (radiusBase >= 8) radiusOuter = 6;
	return {
		borderRadius: radiusBase,
		borderRadiusXS: radiusXS,
		borderRadiusSM: radiusSM,
		borderRadiusLG: radiusLG,
		borderRadiusOuter: radiusOuter
	};
};
var genRadius_default = genRadius;
function genCommonMapToken(token) {
	const { motionUnit, motionBase, borderRadius, lineWidth } = token;
	return Object.assign({
		motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
		motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
		motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
		lineWidthBold: lineWidth + 1
	}, genRadius_default(borderRadius));
}
var genControlHeight = (token) => {
	const { controlHeight } = token;
	return {
		controlHeightSM: controlHeight * .75,
		controlHeightXS: controlHeight * .5,
		controlHeightLG: controlHeight * 1.25
	};
};
var genControlHeight_default = genControlHeight;
function getLineHeight(fontSize) {
	return (fontSize + 8) / fontSize;
}
function getFontSizes(base) {
	const fontSizes = Array.from({ length: 10 }).map((_, index) => {
		const i$1 = index - 1;
		const baseSize = base * Math.pow(Math.E, i$1 / 5);
		const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
		return Math.floor(intSize / 2) * 2;
	});
	fontSizes[1] = base;
	return fontSizes.map((size) => ({
		size,
		lineHeight: getLineHeight(size)
	}));
}
var genFontMapToken = (fontSize) => {
	const fontSizePairs = getFontSizes(fontSize);
	const fontSizes = fontSizePairs.map((pair) => pair.size);
	const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
	const fontSizeMD = fontSizes[1];
	const fontSizeSM = fontSizes[0];
	const fontSizeLG = fontSizes[2];
	const lineHeight = lineHeights[1];
	const lineHeightSM = lineHeights[0];
	const lineHeightLG = lineHeights[2];
	return {
		fontSizeSM,
		fontSize: fontSizeMD,
		fontSizeLG,
		fontSizeXL: fontSizes[3],
		fontSizeHeading1: fontSizes[6],
		fontSizeHeading2: fontSizes[5],
		fontSizeHeading3: fontSizes[4],
		fontSizeHeading4: fontSizes[3],
		fontSizeHeading5: fontSizes[2],
		lineHeight,
		lineHeightLG,
		lineHeightSM,
		fontHeight: Math.round(lineHeight * fontSizeMD),
		fontHeightLG: Math.round(lineHeightLG * fontSizeLG),
		fontHeightSM: Math.round(lineHeightSM * fontSizeSM),
		lineHeightHeading1: lineHeights[6],
		lineHeightHeading2: lineHeights[5],
		lineHeightHeading3: lineHeights[4],
		lineHeightHeading4: lineHeights[3],
		lineHeightHeading5: lineHeights[2]
	};
};
var genFontMapToken_default = genFontMapToken;
function genSizeMapToken(token) {
	const { sizeUnit, sizeStep } = token;
	return {
		sizeXXL: sizeUnit * (sizeStep + 8),
		sizeXL: sizeUnit * (sizeStep + 4),
		sizeLG: sizeUnit * (sizeStep + 2),
		sizeMD: sizeUnit * (sizeStep + 1),
		sizeMS: sizeUnit * sizeStep,
		size: sizeUnit * sizeStep,
		sizeSM: sizeUnit * (sizeStep - 1),
		sizeXS: sizeUnit * (sizeStep - 2),
		sizeXXS: sizeUnit * (sizeStep - 3)
	};
}
init_es();
const getAlphaColor$1 = (baseColor, alpha$1) => new FastColor(baseColor).setA(alpha$1).toRgbString();
const getSolidColor = (baseColor, brightness) => {
	return new FastColor(baseColor).darken(brightness).toHexString();
};
init_es$1();
const generateColorPalettes = (baseColor) => {
	const colors = generate(baseColor);
	return {
		1: colors[0],
		2: colors[1],
		3: colors[2],
		4: colors[3],
		5: colors[4],
		6: colors[5],
		7: colors[6],
		8: colors[4],
		9: colors[5],
		10: colors[6]
	};
};
const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
	const colorBgBase = bgBaseColor || "#fff";
	const colorTextBase = textBaseColor || "#000";
	return {
		colorBgBase,
		colorTextBase,
		colorText: getAlphaColor$1(colorTextBase, .88),
		colorTextSecondary: getAlphaColor$1(colorTextBase, .65),
		colorTextTertiary: getAlphaColor$1(colorTextBase, .45),
		colorTextQuaternary: getAlphaColor$1(colorTextBase, .25),
		colorFill: getAlphaColor$1(colorTextBase, .15),
		colorFillSecondary: getAlphaColor$1(colorTextBase, .06),
		colorFillTertiary: getAlphaColor$1(colorTextBase, .04),
		colorFillQuaternary: getAlphaColor$1(colorTextBase, .02),
		colorBgSolid: getAlphaColor$1(colorTextBase, 1),
		colorBgSolidHover: getAlphaColor$1(colorTextBase, .75),
		colorBgSolidActive: getAlphaColor$1(colorTextBase, .95),
		colorBgLayout: getSolidColor(colorBgBase, 4),
		colorBgContainer: getSolidColor(colorBgBase, 0),
		colorBgElevated: getSolidColor(colorBgBase, 0),
		colorBgSpotlight: getAlphaColor$1(colorTextBase, .85),
		colorBgBlur: "transparent",
		colorBorder: getSolidColor(colorBgBase, 15),
		colorBorderSecondary: getSolidColor(colorBgBase, 6)
	};
};
init_es$1();
function derivative(token) {
	presetPrimaryColors.pink = presetPrimaryColors.magenta;
	presetPalettes.pink = presetPalettes.magenta;
	const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
		const colors = token[colorKey] === presetPrimaryColors[colorKey] ? presetPalettes[colorKey] : generate(token[colorKey]);
		return Array.from({ length: 10 }, () => 1).reduce((prev, _, i$1) => {
			prev[`${colorKey}-${i$1 + 1}`] = colors[i$1];
			prev[`${colorKey}${i$1 + 1}`] = colors[i$1];
			return prev;
		}, {});
	}).reduce((prev, cur) => {
		prev = Object.assign(Object.assign({}, prev), cur);
		return prev;
	}, {});
	return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, token), colorPalettes), genColorMapToken(token, {
		generateColorPalettes,
		generateNeutralColorPalettes
	})), genFontMapToken_default(token.fontSize)), genSizeMapToken(token)), genControlHeight_default(token)), genCommonMapToken(token));
}
init_es$2();
var theme_default$1 = createTheme(derivative);
const defaultConfig = {
	token: seed_default,
	override: { override: seed_default },
	hashed: true
};
const DesignTokenContext = /* @__PURE__ */ import_react.createContext(defaultConfig);
const defaultIconPrefixCls = "anticon";
const Variants = [
	"outlined",
	"borderless",
	"filled",
	"underlined"
];
var defaultGetPrefixCls = (suffixCls, customizePrefixCls) => {
	if (customizePrefixCls) return customizePrefixCls;
	return suffixCls ? `ant-${suffixCls}` : "ant";
};
const ConfigContext = /* @__PURE__ */ import_react.createContext({
	getPrefixCls: defaultGetPrefixCls,
	iconPrefixCls: defaultIconPrefixCls
});
const { Consumer: ConfigConsumer } = ConfigContext;
var EMPTY_OBJECT = {};
function useComponentConfig(propName) {
	const context = import_react.useContext(ConfigContext);
	const { getPrefixCls, direction, getPopupContainer } = context;
	const propValue = context[propName];
	return Object.assign(Object.assign({
		classNames: EMPTY_OBJECT,
		styles: EMPTY_OBJECT
	}, propValue), {
		getPrefixCls,
		direction,
		getPopupContainer
	});
}
init_es$1();
init_es();
init_canUseDom();
init_dynamicCSS();
var dynamicStyleMark = `-ant-${Date.now()}-${Math.random()}`;
function getStyle(globalPrefixCls$1, theme) {
	const variables = {};
	const formatColor = (color$1, updater) => {
		let clone = color$1.clone();
		clone = (updater === null || updater === void 0 ? void 0 : updater(clone)) || clone;
		return clone.toRgbString();
	};
	const fillColor = (colorVal, type) => {
		const baseColor = new FastColor(colorVal);
		const colorPalettes = generate(baseColor.toRgbString());
		variables[`${type}-color`] = formatColor(baseColor);
		variables[`${type}-color-disabled`] = colorPalettes[1];
		variables[`${type}-color-hover`] = colorPalettes[4];
		variables[`${type}-color-active`] = colorPalettes[6];
		variables[`${type}-color-outline`] = baseColor.clone().setA(.2).toRgbString();
		variables[`${type}-color-deprecated-bg`] = colorPalettes[0];
		variables[`${type}-color-deprecated-border`] = colorPalettes[2];
	};
	if (theme.primaryColor) {
		fillColor(theme.primaryColor, "primary");
		const primaryColor = new FastColor(theme.primaryColor);
		const primaryColors = generate(primaryColor.toRgbString());
		primaryColors.forEach((color$1, index) => {
			variables[`primary-${index + 1}`] = color$1;
		});
		variables["primary-color-deprecated-l-35"] = formatColor(primaryColor, (c$1) => c$1.lighten(35));
		variables["primary-color-deprecated-l-20"] = formatColor(primaryColor, (c$1) => c$1.lighten(20));
		variables["primary-color-deprecated-t-20"] = formatColor(primaryColor, (c$1) => c$1.tint(20));
		variables["primary-color-deprecated-t-50"] = formatColor(primaryColor, (c$1) => c$1.tint(50));
		variables["primary-color-deprecated-f-12"] = formatColor(primaryColor, (c$1) => c$1.setA(c$1.a * .12));
		const primaryActiveColor = new FastColor(primaryColors[0]);
		variables["primary-color-active-deprecated-f-30"] = formatColor(primaryActiveColor, (c$1) => c$1.setA(c$1.a * .3));
		variables["primary-color-active-deprecated-d-02"] = formatColor(primaryActiveColor, (c$1) => c$1.darken(2));
	}
	if (theme.successColor) fillColor(theme.successColor, "success");
	if (theme.warningColor) fillColor(theme.warningColor, "warning");
	if (theme.errorColor) fillColor(theme.errorColor, "error");
	if (theme.infoColor) fillColor(theme.infoColor, "info");
	return `
  :root {
    ${Object.keys(variables).map((key) => `--${globalPrefixCls$1}-${key}: ${variables[key]};`).join("\n")}
  }
  `.trim();
}
function registerTheme(globalPrefixCls$1, theme) {
	const style = getStyle(globalPrefixCls$1, theme);
	if (canUseDom()) updateCSS(style, `${dynamicStyleMark}-dynamic-theme`);
}
var DisabledContext = /* @__PURE__ */ import_react.createContext(false);
const DisabledContextProvider = ({ children, disabled }) => {
	const originDisabled = import_react.useContext(DisabledContext);
	return /* @__PURE__ */ import_react.createElement(DisabledContext.Provider, { value: disabled !== null && disabled !== void 0 ? disabled : originDisabled }, children);
};
var DisabledContext_default = DisabledContext;
var SizeContext = /* @__PURE__ */ import_react.createContext(void 0);
const SizeContextProvider = ({ children, size }) => {
	const originSize = import_react.useContext(SizeContext);
	return /* @__PURE__ */ import_react.createElement(SizeContext.Provider, { value: size || originSize }, children);
};
var SizeContext_default = SizeContext;
function useConfig() {
	return {
		componentDisabled: (0, import_react.useContext)(DisabledContext_default),
		componentSize: (0, import_react.useContext)(SizeContext_default)
	};
}
var useConfig_default = useConfig;
const PresetColors = [
	"blue",
	"purple",
	"cyan",
	"green",
	"magenta",
	"pink",
	"red",
	"orange",
	"yellow",
	"volcano",
	"geekblue",
	"lime",
	"gold"
];
var version_default = "5.27.0";
init_es();
function isStableColor(color$1) {
	return color$1 >= 0 && color$1 <= 255;
}
function getAlphaColor(frontColor, backgroundColor) {
	const { r: fR, g: fG, b: fB, a: originAlpha } = new FastColor(frontColor).toRgb();
	if (originAlpha < 1) return frontColor;
	const { r: bR, g: bG, b: bB } = new FastColor(backgroundColor).toRgb();
	for (let fA = .01; fA <= 1; fA += .01) {
		const r$1 = Math.round((fR - bR * (1 - fA)) / fA);
		const g = Math.round((fG - bG * (1 - fA)) / fA);
		const b = Math.round((fB - bB * (1 - fA)) / fA);
		if (isStableColor(r$1) && isStableColor(g) && isStableColor(b)) return new FastColor({
			r: r$1,
			g,
			b,
			a: Math.round(fA * 100) / 100
		}).toRgbString();
	}
	/* istanbul ignore next */
	return new FastColor({
		r: fR,
		g: fG,
		b: fB,
		a: 1
	}).toRgbString();
}
var getAlphaColor_default = getAlphaColor;
init_es();
var __rest$14 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
function formatToken(derivativeToken) {
	const { override } = derivativeToken, restToken = __rest$14(derivativeToken, ["override"]);
	const overrideTokens = Object.assign({}, override);
	Object.keys(seed_default).forEach((token) => {
		delete overrideTokens[token];
	});
	const mergedToken = Object.assign(Object.assign({}, restToken), overrideTokens);
	const screenXS = 480;
	const screenSM = 576;
	const screenMD = 768;
	const screenLG = 992;
	const screenXL = 1200;
	const screenXXL = 1600;
	if (mergedToken.motion === false) {
		const fastDuration = "0s";
		mergedToken.motionDurationFast = fastDuration;
		mergedToken.motionDurationMid = fastDuration;
		mergedToken.motionDurationSlow = fastDuration;
	}
	return Object.assign(Object.assign(Object.assign({}, mergedToken), {
		colorFillContent: mergedToken.colorFillSecondary,
		colorFillContentHover: mergedToken.colorFill,
		colorFillAlter: mergedToken.colorFillQuaternary,
		colorBgContainerDisabled: mergedToken.colorFillTertiary,
		colorBorderBg: mergedToken.colorBgContainer,
		colorSplit: getAlphaColor_default(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
		colorTextPlaceholder: mergedToken.colorTextQuaternary,
		colorTextDisabled: mergedToken.colorTextQuaternary,
		colorTextHeading: mergedToken.colorText,
		colorTextLabel: mergedToken.colorTextSecondary,
		colorTextDescription: mergedToken.colorTextTertiary,
		colorTextLightSolid: mergedToken.colorWhite,
		colorHighlight: mergedToken.colorError,
		colorBgTextHover: mergedToken.colorFillSecondary,
		colorBgTextActive: mergedToken.colorFill,
		colorIcon: mergedToken.colorTextTertiary,
		colorIconHover: mergedToken.colorText,
		colorErrorOutline: getAlphaColor_default(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
		colorWarningOutline: getAlphaColor_default(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
		fontSizeIcon: mergedToken.fontSizeSM,
		lineWidthFocus: mergedToken.lineWidth * 3,
		lineWidth: mergedToken.lineWidth,
		controlOutlineWidth: mergedToken.lineWidth * 2,
		controlInteractiveSize: mergedToken.controlHeight / 2,
		controlItemBgHover: mergedToken.colorFillTertiary,
		controlItemBgActive: mergedToken.colorPrimaryBg,
		controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
		controlItemBgActiveDisabled: mergedToken.colorFill,
		controlTmpOutline: mergedToken.colorFillQuaternary,
		controlOutline: getAlphaColor_default(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
		lineType: mergedToken.lineType,
		borderRadius: mergedToken.borderRadius,
		borderRadiusXS: mergedToken.borderRadiusXS,
		borderRadiusSM: mergedToken.borderRadiusSM,
		borderRadiusLG: mergedToken.borderRadiusLG,
		fontWeightStrong: 600,
		opacityLoading: .65,
		linkDecoration: "none",
		linkHoverDecoration: "none",
		linkFocusDecoration: "none",
		controlPaddingHorizontal: 12,
		controlPaddingHorizontalSM: 8,
		paddingXXS: mergedToken.sizeXXS,
		paddingXS: mergedToken.sizeXS,
		paddingSM: mergedToken.sizeSM,
		padding: mergedToken.size,
		paddingMD: mergedToken.sizeMD,
		paddingLG: mergedToken.sizeLG,
		paddingXL: mergedToken.sizeXL,
		paddingContentHorizontalLG: mergedToken.sizeLG,
		paddingContentVerticalLG: mergedToken.sizeMS,
		paddingContentHorizontal: mergedToken.sizeMS,
		paddingContentVertical: mergedToken.sizeSM,
		paddingContentHorizontalSM: mergedToken.size,
		paddingContentVerticalSM: mergedToken.sizeXS,
		marginXXS: mergedToken.sizeXXS,
		marginXS: mergedToken.sizeXS,
		marginSM: mergedToken.sizeSM,
		margin: mergedToken.size,
		marginMD: mergedToken.sizeMD,
		marginLG: mergedToken.sizeLG,
		marginXL: mergedToken.sizeXL,
		marginXXL: mergedToken.sizeXXL,
		boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
		screenXS,
		screenXSMin: screenXS,
		screenXSMax: screenSM - 1,
		screenSM,
		screenSMMin: screenSM,
		screenSMMax: screenMD - 1,
		screenMD,
		screenMDMin: screenMD,
		screenMDMax: screenLG - 1,
		screenLG,
		screenLGMin: screenLG,
		screenLGMax: screenXL - 1,
		screenXL,
		screenXLMin: screenXL,
		screenXLMax: screenXXL - 1,
		screenXXL,
		screenXXLMin: screenXXL,
		boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
		boxShadowCard: `
      0 1px 2px -2px ${new FastColor("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new FastColor("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new FastColor("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
		boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
		boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
		boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
		boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
		boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)"
	}), overrideTokens);
}
init_es$2();
var __rest$13 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
const unitless = {
	lineHeight: true,
	lineHeightSM: true,
	lineHeightLG: true,
	lineHeightHeading1: true,
	lineHeightHeading2: true,
	lineHeightHeading3: true,
	lineHeightHeading4: true,
	lineHeightHeading5: true,
	opacityLoading: true,
	fontWeightStrong: true,
	zIndexPopupBase: true,
	zIndexBase: true,
	opacityImage: true
};
const ignore = {
	motionBase: true,
	motionUnit: true
};
var preserve = {
	screenXS: true,
	screenXSMin: true,
	screenXSMax: true,
	screenSM: true,
	screenSMMin: true,
	screenSMMax: true,
	screenMD: true,
	screenMDMin: true,
	screenMDMax: true,
	screenLG: true,
	screenLGMin: true,
	screenLGMax: true,
	screenXL: true,
	screenXLMin: true,
	screenXLMax: true,
	screenXXL: true,
	screenXXLMin: true
};
const getComputedToken = (originToken, overrideToken, theme) => {
	const derivativeToken = theme.getDerivativeToken(originToken);
	const { override } = overrideToken, components = __rest$13(overrideToken, ["override"]);
	let mergedDerivativeToken = Object.assign(Object.assign({}, derivativeToken), { override });
	mergedDerivativeToken = formatToken(mergedDerivativeToken);
	if (components) Object.entries(components).forEach(([key, value]) => {
		const { theme: componentTheme } = value, componentTokens = __rest$13(value, ["theme"]);
		let mergedComponentToken = componentTokens;
		if (componentTheme) mergedComponentToken = getComputedToken(Object.assign(Object.assign({}, mergedDerivativeToken), componentTokens), { override: componentTokens }, componentTheme);
		mergedDerivativeToken[key] = mergedComponentToken;
	});
	return mergedDerivativeToken;
};
function useToken() {
	const { token: rootDesignToken, hashed, theme, override, cssVar } = import_react.useContext(DesignTokenContext);
	const salt = `${version_default}-${hashed || ""}`;
	const mergedTheme = theme || theme_default$1;
	const [token, hashId, realToken] = useCacheToken(mergedTheme, [seed_default, rootDesignToken], {
		salt,
		override,
		getComputedToken,
		formatToken,
		cssVar: cssVar && {
			prefix: cssVar.prefix,
			key: cssVar.key,
			unitless,
			ignore,
			preserve
		}
	});
	return [
		mergedTheme,
		realToken,
		hashed ? hashId : "",
		token,
		cssVar
	];
}
init_es$2();
const textEllipsis = {
	overflow: "hidden",
	whiteSpace: "nowrap",
	textOverflow: "ellipsis"
};
const resetComponent = (token, needInheritFontFamily = false) => ({
	boxSizing: "border-box",
	margin: 0,
	padding: 0,
	color: token.colorText,
	fontSize: token.fontSize,
	lineHeight: token.lineHeight,
	listStyle: "none",
	fontFamily: needInheritFontFamily ? "inherit" : token.fontFamily
});
const resetIcon = () => ({
	display: "inline-flex",
	alignItems: "center",
	color: "inherit",
	fontStyle: "normal",
	lineHeight: 0,
	textAlign: "center",
	textTransform: "none",
	verticalAlign: "-0.125em",
	textRendering: "optimizeLegibility",
	"-webkit-font-smoothing": "antialiased",
	"-moz-osx-font-smoothing": "grayscale",
	"> *": { lineHeight: 1 },
	svg: { display: "inline-block" }
});
const clearFix = () => ({
	"&::before": {
		display: "table",
		content: "\"\""
	},
	"&::after": {
		display: "table",
		clear: "both",
		content: "\"\""
	}
});
const genLinkStyle$1 = (token) => ({ a: {
	color: token.colorLink,
	textDecoration: token.linkDecoration,
	backgroundColor: "transparent",
	outline: "none",
	cursor: "pointer",
	transition: `color ${token.motionDurationSlow}`,
	"-webkit-text-decoration-skip": "objects",
	"&:hover": { color: token.colorLinkHover },
	"&:active": { color: token.colorLinkActive },
	"&:active, &:hover": {
		textDecoration: token.linkHoverDecoration,
		outline: 0
	},
	"&:focus": {
		textDecoration: token.linkFocusDecoration,
		outline: 0
	},
	"&[disabled]": {
		color: token.colorTextDisabled,
		cursor: "not-allowed"
	}
} });
const genCommonStyle = (token, componentPrefixCls, rootCls, resetFont) => {
	const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
	const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;
	const resetStyle = {
		boxSizing: "border-box",
		"&::before, &::after": { boxSizing: "border-box" }
	};
	let resetFontStyle = {};
	if (resetFont !== false) resetFontStyle = {
		fontFamily: token.fontFamily,
		fontSize: token.fontSize
	};
	return { [rootPrefixSelector]: Object.assign(Object.assign(Object.assign({}, resetFontStyle), resetStyle), { [prefixSelector]: resetStyle }) };
};
const genFocusOutline = (token, offset) => ({
	outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`,
	outlineOffset: offset !== null && offset !== void 0 ? offset : 1,
	transition: "outline-offset 0s, outline 0s"
});
const genFocusStyle = (token, offset) => ({ "&:focus-visible": genFocusOutline(token, offset) });
const genIconStyle = (iconPrefixCls) => ({ [`.${iconPrefixCls}`]: Object.assign(Object.assign({}, resetIcon()), { [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: { display: "block" } }) });
const operationUnit = (token) => Object.assign(Object.assign({
	color: token.colorLink,
	textDecoration: token.linkDecoration,
	outline: "none",
	cursor: "pointer",
	transition: `all ${token.motionDurationSlow}`,
	border: 0,
	padding: 0,
	background: "none",
	userSelect: "none"
}, genFocusStyle(token)), {
	"&:focus, &:hover": { color: token.colorLinkHover },
	"&:active": { color: token.colorLinkActive }
});
init_es$3();
const { genStyleHooks, genComponentStyleHook, genSubStyleComponent } = genStyleUtils_default({
	usePrefix: () => {
		const { getPrefixCls, iconPrefixCls } = (0, import_react.useContext)(ConfigContext);
		return {
			rootPrefixCls: getPrefixCls(),
			iconPrefixCls
		};
	},
	useToken: () => {
		const [theme, realToken, hashId, token, cssVar] = useToken();
		return {
			theme,
			realToken,
			hashId,
			token,
			cssVar
		};
	},
	useCSP: () => {
		const { csp } = (0, import_react.useContext)(ConfigContext);
		return csp !== null && csp !== void 0 ? csp : {};
	},
	getResetStyles: (token, config) => {
		var _a;
		const linkStyle = genLinkStyle$1(token);
		return [
			linkStyle,
			{ "&": linkStyle },
			genIconStyle((_a = config === null || config === void 0 ? void 0 : config.prefix.iconPrefixCls) !== null && _a !== void 0 ? _a : defaultIconPrefixCls)
		];
	},
	getCommonStyle: genCommonStyle,
	getCompUnitless: () => unitless
});
function genPresetColor(token, genCss) {
	return PresetColors.reduce((prev, colorKey) => {
		const lightColor = token[`${colorKey}1`];
		const lightBorderColor = token[`${colorKey}3`];
		const darkColor = token[`${colorKey}6`];
		const textColor = token[`${colorKey}7`];
		return Object.assign(Object.assign({}, prev), genCss(colorKey, {
			lightColor,
			lightBorderColor,
			darkColor,
			textColor
		}));
	}, {});
}
init_es$2();
var useResetIconStyle = (iconPrefixCls, csp) => {
	const [theme, token] = useToken();
	return useStyleRegister({
		theme,
		token,
		hashId: "",
		path: ["ant-design-icons", iconPrefixCls],
		nonce: () => csp === null || csp === void 0 ? void 0 : csp.nonce,
		layer: { name: "antd" }
	}, () => genIconStyle(iconPrefixCls));
};
var useResetIconStyle_default = useResetIconStyle;
var { useId: useId$2 } = Object.assign({}, import_react);
var useEmptyId = () => "";
var useThemeKey_default = typeof useId$2 === "undefined" ? useEmptyId : useId$2;
init_useMemo();
init_isEqual();
function useTheme(theme, parentTheme, config) {
	var _a;
	devUseWarning("ConfigProvider");
	const themeConfig = theme || {};
	const parentThemeConfig = themeConfig.inherit === false || !parentTheme ? Object.assign(Object.assign({}, defaultConfig), {
		hashed: (_a = parentTheme === null || parentTheme === void 0 ? void 0 : parentTheme.hashed) !== null && _a !== void 0 ? _a : defaultConfig.hashed,
		cssVar: parentTheme === null || parentTheme === void 0 ? void 0 : parentTheme.cssVar
	}) : parentTheme;
	const themeKey = useThemeKey_default();
	return useMemo$6(() => {
		var _a$1, _b;
		if (!theme) return parentTheme;
		const mergedComponents = Object.assign({}, parentThemeConfig.components);
		Object.keys(theme.components || {}).forEach((componentName) => {
			mergedComponents[componentName] = Object.assign(Object.assign({}, mergedComponents[componentName]), theme.components[componentName]);
		});
		const cssVarKey = `css-var-${themeKey.replace(/:/g, "")}`;
		const mergedCssVar = ((_a$1 = themeConfig.cssVar) !== null && _a$1 !== void 0 ? _a$1 : parentThemeConfig.cssVar) && Object.assign(Object.assign(Object.assign({ prefix: config === null || config === void 0 ? void 0 : config.prefixCls }, typeof parentThemeConfig.cssVar === "object" ? parentThemeConfig.cssVar : {}), typeof themeConfig.cssVar === "object" ? themeConfig.cssVar : {}), { key: typeof themeConfig.cssVar === "object" && ((_b = themeConfig.cssVar) === null || _b === void 0 ? void 0 : _b.key) || cssVarKey });
		return Object.assign(Object.assign(Object.assign({}, parentThemeConfig), themeConfig), {
			token: Object.assign(Object.assign({}, parentThemeConfig.token), themeConfig.token),
			components: mergedComponents,
			cssVar: mergedCssVar
		});
	}, [themeConfig, parentThemeConfig], (prev, next) => prev.some((prevTheme, index) => {
		const nextTheme = next[index];
		return !isEqual_default(prevTheme, nextTheme, true);
	}));
}
init_es$4();
var MotionCacheContext = /* @__PURE__ */ import_react.createContext(true);
function MotionWrapper(props) {
	const parentMotion = import_react.useContext(MotionCacheContext);
	const { children } = props;
	const [, token] = useToken();
	const { motion: motion$1 } = token;
	const needWrapMotionProviderRef = import_react.useRef(false);
	needWrapMotionProviderRef.current || (needWrapMotionProviderRef.current = parentMotion !== motion$1);
	if (needWrapMotionProviderRef.current) return /* @__PURE__ */ import_react.createElement(MotionCacheContext.Provider, { value: motion$1 }, /* @__PURE__ */ import_react.createElement(MotionProvider, { motion: motion$1 }, children));
	return children;
}
var PropWarning_default = () => null;
init_es$2();
init_Context();
init_useMemo();
init_set();
var __rest$12 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
var PASSED_PROPS = [
	"getTargetContainer",
	"getPopupContainer",
	"renderEmpty",
	"input",
	"pagination",
	"form",
	"select",
	"button"
];
var globalPrefixCls;
var globalIconPrefixCls;
var globalTheme;
var globalHolderRender;
function getGlobalPrefixCls() {
	return globalPrefixCls || "ant";
}
function getGlobalIconPrefixCls() {
	return globalIconPrefixCls || "anticon";
}
function isLegacyTheme(theme) {
	return Object.keys(theme).some((key) => key.endsWith("Color"));
}
var setGlobalConfig = (props) => {
	const { prefixCls, iconPrefixCls, theme, holderRender } = props;
	if (prefixCls !== void 0) globalPrefixCls = prefixCls;
	if (iconPrefixCls !== void 0) globalIconPrefixCls = iconPrefixCls;
	if ("holderRender" in props) globalHolderRender = holderRender;
	if (theme) if (isLegacyTheme(theme)) registerTheme(getGlobalPrefixCls(), theme);
	else globalTheme = theme;
};
const globalConfig = () => ({
	getPrefixCls: (suffixCls, customizePrefixCls) => {
		if (customizePrefixCls) return customizePrefixCls;
		return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
	},
	getIconPrefixCls: getGlobalIconPrefixCls,
	getRootPrefixCls: () => {
		if (globalPrefixCls) return globalPrefixCls;
		return getGlobalPrefixCls();
	},
	getTheme: () => globalTheme,
	holderRender: globalHolderRender
});
var ProviderChildren = (props) => {
	const { children, csp: customCsp, autoInsertSpaceInButton, alert, anchor, form, locale: locale$4, componentSize, direction, space, splitter, virtual, dropdownMatchSelectWidth, popupMatchSelectWidth, popupOverflow, legacyLocale, parentContext, iconPrefixCls: customIconPrefixCls, theme, componentDisabled, segmented, statistic, spin, calendar, carousel, cascader, collapse, typography, checkbox, descriptions, divider, drawer, skeleton, steps, image, layout: layout$1, list, mentions, modal, progress: progress$1, result, slider, breadcrumb, menu, pagination, input, textArea, empty, badge, radio, rate, switch: SWITCH, transfer, avatar, message, tag, table, card, tabs, timeline, timePicker, upload, notification, tree, colorPicker, datePicker, rangePicker, flex, wave, dropdown, warning: warningConfig, tour, tooltip, popover, popconfirm, floatButton, floatButtonGroup, variant, inputNumber, treeSelect } = props;
	const getPrefixCls = import_react.useCallback((suffixCls, customizePrefixCls) => {
		const { prefixCls } = props;
		if (customizePrefixCls) return customizePrefixCls;
		const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");
		return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
	}, [parentContext.getPrefixCls, props.prefixCls]);
	const iconPrefixCls = customIconPrefixCls || parentContext.iconPrefixCls || "anticon";
	const csp = customCsp || parentContext.csp;
	useResetIconStyle_default(iconPrefixCls, csp);
	const mergedTheme = useTheme(theme, parentContext.theme, { prefixCls: getPrefixCls("") });
	const baseConfig = {
		csp,
		autoInsertSpaceInButton,
		alert,
		anchor,
		locale: locale$4 || legacyLocale,
		direction,
		space,
		splitter,
		virtual,
		popupMatchSelectWidth: popupMatchSelectWidth !== null && popupMatchSelectWidth !== void 0 ? popupMatchSelectWidth : dropdownMatchSelectWidth,
		popupOverflow,
		getPrefixCls,
		iconPrefixCls,
		theme: mergedTheme,
		segmented,
		statistic,
		spin,
		calendar,
		carousel,
		cascader,
		collapse,
		typography,
		checkbox,
		descriptions,
		divider,
		drawer,
		skeleton,
		steps,
		image,
		input,
		textArea,
		layout: layout$1,
		list,
		mentions,
		modal,
		progress: progress$1,
		result,
		slider,
		breadcrumb,
		menu,
		pagination,
		empty,
		badge,
		radio,
		rate,
		switch: SWITCH,
		transfer,
		avatar,
		message,
		tag,
		table,
		card,
		tabs,
		timeline,
		timePicker,
		upload,
		notification,
		tree,
		colorPicker,
		datePicker,
		rangePicker,
		flex,
		wave,
		dropdown,
		warning: warningConfig,
		tour,
		tooltip,
		popover,
		popconfirm,
		floatButton,
		floatButtonGroup,
		variant,
		inputNumber,
		treeSelect
	};
	const config = Object.assign({}, parentContext);
	Object.keys(baseConfig).forEach((key) => {
		if (baseConfig[key] !== void 0) config[key] = baseConfig[key];
	});
	PASSED_PROPS.forEach((propName) => {
		const propValue = props[propName];
		if (propValue) config[propName] = propValue;
	});
	if (typeof autoInsertSpaceInButton !== "undefined") config.button = Object.assign({ autoInsertSpace: autoInsertSpaceInButton }, config.button);
	const memoedConfig = useMemo$6(() => config, config, (prevConfig, currentConfig) => {
		const prevKeys = Object.keys(prevConfig);
		const currentKeys = Object.keys(currentConfig);
		return prevKeys.length !== currentKeys.length || prevKeys.some((key) => prevConfig[key] !== currentConfig[key]);
	});
	const { layer } = import_react.useContext(StyleContext_default);
	const memoIconContextValue = import_react.useMemo(() => ({
		prefixCls: iconPrefixCls,
		csp,
		layer: layer ? "antd" : void 0
	}), [
		iconPrefixCls,
		csp,
		layer
	]);
	let childNode = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(PropWarning_default, { dropdownMatchSelectWidth }), children);
	const validateMessages = import_react.useMemo(() => {
		var _a, _b, _c, _d;
		return merge$1(((_a = en_US_default.Form) === null || _a === void 0 ? void 0 : _a.defaultValidateMessages) || {}, ((_c = (_b = memoedConfig.locale) === null || _b === void 0 ? void 0 : _b.Form) === null || _c === void 0 ? void 0 : _c.defaultValidateMessages) || {}, ((_d = memoedConfig.form) === null || _d === void 0 ? void 0 : _d.validateMessages) || {}, (form === null || form === void 0 ? void 0 : form.validateMessages) || {});
	}, [memoedConfig, form === null || form === void 0 ? void 0 : form.validateMessages]);
	if (Object.keys(validateMessages).length > 0) childNode = /* @__PURE__ */ import_react.createElement(validateMessagesContext_default.Provider, { value: validateMessages }, childNode);
	if (locale$4) childNode = /* @__PURE__ */ import_react.createElement(locale_default, {
		locale: locale$4,
		_ANT_MARK__: ANT_MARK
	}, childNode);
	if (iconPrefixCls || csp) childNode = /* @__PURE__ */ import_react.createElement(Context_default.Provider, { value: memoIconContextValue }, childNode);
	if (componentSize) childNode = /* @__PURE__ */ import_react.createElement(SizeContextProvider, { size: componentSize }, childNode);
	childNode = /* @__PURE__ */ import_react.createElement(MotionWrapper, null, childNode);
	const memoTheme = import_react.useMemo(() => {
		const _a = mergedTheme || {}, { algorithm, token, components, cssVar } = _a, rest = __rest$12(_a, [
			"algorithm",
			"token",
			"components",
			"cssVar"
		]);
		const themeObj = algorithm && (!Array.isArray(algorithm) || algorithm.length > 0) ? createTheme(algorithm) : theme_default$1;
		const parsedComponents = {};
		Object.entries(components || {}).forEach(([componentName, componentToken]) => {
			const parsedToken = Object.assign({}, componentToken);
			if ("algorithm" in parsedToken) {
				if (parsedToken.algorithm === true) parsedToken.theme = themeObj;
				else if (Array.isArray(parsedToken.algorithm) || typeof parsedToken.algorithm === "function") parsedToken.theme = createTheme(parsedToken.algorithm);
				delete parsedToken.algorithm;
			}
			parsedComponents[componentName] = parsedToken;
		});
		const mergedToken = Object.assign(Object.assign({}, seed_default), token);
		return Object.assign(Object.assign({}, rest), {
			theme: themeObj,
			token: mergedToken,
			components: parsedComponents,
			override: Object.assign({ override: mergedToken }, parsedComponents),
			cssVar
		});
	}, [mergedTheme]);
	if (theme) childNode = /* @__PURE__ */ import_react.createElement(DesignTokenContext.Provider, { value: memoTheme }, childNode);
	if (memoedConfig.warning) childNode = /* @__PURE__ */ import_react.createElement(WarningContext.Provider, { value: memoedConfig.warning }, childNode);
	if (componentDisabled !== void 0) childNode = /* @__PURE__ */ import_react.createElement(DisabledContextProvider, { disabled: componentDisabled }, childNode);
	return /* @__PURE__ */ import_react.createElement(ConfigContext.Provider, { value: memoedConfig }, childNode);
};
var ConfigProvider = (props) => {
	const context = import_react.useContext(ConfigContext);
	const antLocale = import_react.useContext(context_default);
	return /* @__PURE__ */ import_react.createElement(ProviderChildren, Object.assign({
		parentContext: context,
		legacyLocale: antLocale
	}, props));
};
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext_default;
ConfigProvider.config = setGlobalConfig;
ConfigProvider.useConfig = useConfig_default;
Object.defineProperty(ConfigProvider, "SizeContext", { get: () => {
	return SizeContext_default;
} });
var config_provider_default = ConfigProvider;
function isFragment(child) {
	return child && /* @__PURE__ */ import_react.isValidElement(child) && child.type === import_react.Fragment;
}
const replaceElement = (element, replacement, props) => {
	if (!/* @__PURE__ */ import_react.isValidElement(element)) return replacement;
	return /* @__PURE__ */ import_react.cloneElement(element, typeof props === "function" ? props(element.props || {}) : props);
};
function cloneElement(element, props) {
	return replaceElement(element, element, props);
}
var useCSSVarCls = (prefixCls) => {
	const [, , , , cssVar] = useToken();
	return cssVar ? `${prefixCls}-css-var` : "";
};
var useCSSVarCls_default = useCSSVarCls;
var zindexContext_default = /* @__PURE__ */ import_react.createContext(void 0);
var CONTAINER_OFFSET = 100;
const CONTAINER_MAX_OFFSET = CONTAINER_OFFSET * 10;
CONTAINER_MAX_OFFSET + CONTAINER_OFFSET;
const containerBaseZIndexOffset = {
	Modal: CONTAINER_OFFSET,
	Drawer: CONTAINER_OFFSET,
	Popover: CONTAINER_OFFSET,
	Popconfirm: CONTAINER_OFFSET,
	Tooltip: CONTAINER_OFFSET,
	Tour: CONTAINER_OFFSET,
	FloatButton: CONTAINER_OFFSET
};
const consumerBaseZIndexOffset = {
	SelectLike: 50,
	Dropdown: 50,
	DatePicker: 50,
	Menu: 50,
	ImagePreview: 1
};
function isContainerType(type) {
	return type in containerBaseZIndexOffset;
}
const useZIndex = (componentType, customZIndex) => {
	const [, token] = useToken();
	const parentZIndex = import_react.useContext(zindexContext_default);
	const isContainer = isContainerType(componentType);
	let result;
	if (customZIndex !== void 0) result = [customZIndex, customZIndex];
	else {
		let zIndex = parentZIndex !== null && parentZIndex !== void 0 ? parentZIndex : 0;
		if (isContainer) zIndex += (parentZIndex ? 0 : token.zIndexPopupBase) + containerBaseZIndexOffset[componentType];
		else zIndex += consumerBaseZIndexOffset[componentType];
		result = [parentZIndex === void 0 ? customZIndex : zIndex, zIndex];
	}
	return result;
};
init_regeneratorRuntime();
init_asyncToGenerator();
init_typeof();
init_objectSpread2();
var fullClone = _objectSpread2({}, /* @__PURE__ */ __toESM(require_react_dom()));
var version$1 = fullClone.version, reactRender = fullClone.render, unmountComponentAtNode = fullClone.unmountComponentAtNode;
var createRoot;
try {
	if (Number((version$1 || "").split(".")[0]) >= 18) createRoot = fullClone.createRoot;
} catch (e$1) {}
function toggleWarning(skip) {
	var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fullClone.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
	if (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && _typeof(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === "object") __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
}
var MARK = "__rc_react_root__";
function modernRender(node, container) {
	toggleWarning(true);
	var root = container[MARK] || createRoot(container);
	toggleWarning(false);
	root.render(node);
	container[MARK] = root;
}
function legacyRender(node, container) {
	reactRender === null || reactRender === void 0 || reactRender(node, container);
}
function render(node, container) {
	if (createRoot) {
		modernRender(node, container);
		return;
	}
	legacyRender(node, container);
}
function modernUnmount(_x) {
	return _modernUnmount.apply(this, arguments);
}
function _modernUnmount() {
	_modernUnmount = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(container) {
		return _regeneratorRuntime().wrap(function _callee$(_context) {
			while (1) switch (_context.prev = _context.next) {
				case 0: return _context.abrupt("return", Promise.resolve().then(function() {
					var _container$MARK;
					(_container$MARK = container[MARK]) === null || _container$MARK === void 0 || _container$MARK.unmount();
					delete container[MARK];
				}));
				case 1:
				case "end": return _context.stop();
			}
		}, _callee);
	}));
	return _modernUnmount.apply(this, arguments);
}
function legacyUnmount(container) {
	unmountComponentAtNode(container);
}
function unmount(_x2) {
	return _unmount.apply(this, arguments);
}
function _unmount() {
	_unmount = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(container) {
		return _regeneratorRuntime().wrap(function _callee2$(_context2) {
			while (1) switch (_context2.prev = _context2.next) {
				case 0:
					if (!(createRoot !== void 0)) {
						_context2.next = 2;
						break;
					}
					return _context2.abrupt("return", modernUnmount(container));
				case 2: legacyUnmount(container);
				case 3:
				case "end": return _context2.stop();
			}
		}, _callee2);
	}));
	return _unmount.apply(this, arguments);
}
require_react_dom();
var defaultReactRender = (node, container) => {
	render(node, container);
	return () => {
		return unmount(container);
	};
};
var unstableRender = defaultReactRender;
function unstableSetRender(render$1) {
	if (render$1) unstableRender = render$1;
	return unstableRender;
}
var getCollapsedHeight = () => ({
	height: 0,
	opacity: 0
});
var getRealHeight = (node) => {
	const { scrollHeight } = node;
	return {
		height: scrollHeight,
		opacity: 1
	};
};
var getCurrentHeight = (node) => ({ height: node ? node.offsetHeight : 0 });
var skipOpacityTransition = (_, event) => (event === null || event === void 0 ? void 0 : event.deadline) === true || event.propertyName === "height";
var initCollapseMotion = (rootCls = "ant") => ({
	motionName: `${rootCls}-motion-collapse`,
	onAppearStart: getCollapsedHeight,
	onEnterStart: getCollapsedHeight,
	onAppearActive: getRealHeight,
	onEnterActive: getRealHeight,
	onLeaveStart: getCurrentHeight,
	onLeaveActive: getCollapsedHeight,
	onAppearEnd: skipOpacityTransition,
	onEnterEnd: skipOpacityTransition,
	onLeaveEnd: skipOpacityTransition,
	motionDeadline: 500
});
var getTransitionName = (rootPrefixCls, motion$1, transitionName) => {
	if (transitionName !== void 0) return transitionName;
	return `${rootPrefixCls}-${motion$1}`;
};
var motion_default = initCollapseMotion;
var genWaveStyle = (token) => {
	const { componentCls, colorPrimary } = token;
	return { [componentCls]: {
		position: "absolute",
		background: "transparent",
		pointerEvents: "none",
		boxSizing: "border-box",
		color: `var(--wave-color, ${colorPrimary})`,
		boxShadow: `0 0 0 0 currentcolor`,
		opacity: .2,
		"&.wave-motion-appear": {
			transition: [`box-shadow 0.4s ${token.motionEaseOutCirc}`, `opacity 2s ${token.motionEaseOutCirc}`].join(","),
			"&-active": {
				boxShadow: `0 0 0 6px currentcolor`,
				opacity: 0
			},
			"&.wave-quick": { transition: [`box-shadow ${token.motionDurationSlow} ${token.motionEaseInOut}`, `opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`].join(",") }
		}
	} };
};
var style_default$9 = genComponentStyleHook("Wave", genWaveStyle);
const TARGET_CLS = `ant-wave-target`;
function isValidWaveColor(color$1) {
	return color$1 && color$1 !== "#fff" && color$1 !== "#ffffff" && color$1 !== "rgb(255, 255, 255)" && color$1 !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/.test(color$1) && color$1 !== "transparent" && color$1 !== "canvastext";
}
function getTargetWaveColor(node) {
	const { borderTopColor, borderColor, backgroundColor } = getComputedStyle(node);
	if (isValidWaveColor(borderTopColor)) return borderTopColor;
	if (isValidWaveColor(borderColor)) return borderColor;
	if (isValidWaveColor(backgroundColor)) return backgroundColor;
	return null;
}
var import_classnames$31 = /* @__PURE__ */ __toESM(require_classnames());
init_es$4();
init_raf();
init_ref();
function validateNum(value) {
	return Number.isNaN(value) ? 0 : value;
}
var WaveEffect = (props) => {
	const { className, target, component, registerUnmount } = props;
	const divRef = import_react.useRef(null);
	const unmountRef = import_react.useRef(null);
	import_react.useEffect(() => {
		unmountRef.current = registerUnmount();
	}, []);
	const [color$1, setWaveColor] = import_react.useState(null);
	const [borderRadius, setBorderRadius] = import_react.useState([]);
	const [left, setLeft] = import_react.useState(0);
	const [top, setTop] = import_react.useState(0);
	const [width, setWidth] = import_react.useState(0);
	const [height, setHeight] = import_react.useState(0);
	const [enabled, setEnabled] = import_react.useState(false);
	const waveStyle = {
		left,
		top,
		width,
		height,
		borderRadius: borderRadius.map((radius) => `${radius}px`).join(" ")
	};
	if (color$1) waveStyle["--wave-color"] = color$1;
	function syncPos() {
		const nodeStyle = getComputedStyle(target);
		setWaveColor(getTargetWaveColor(target));
		const isStatic = nodeStyle.position === "static";
		const { borderLeftWidth, borderTopWidth } = nodeStyle;
		setLeft(isStatic ? target.offsetLeft : validateNum(-parseFloat(borderLeftWidth)));
		setTop(isStatic ? target.offsetTop : validateNum(-parseFloat(borderTopWidth)));
		setWidth(target.offsetWidth);
		setHeight(target.offsetHeight);
		const { borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius } = nodeStyle;
		setBorderRadius([
			borderTopLeftRadius,
			borderTopRightRadius,
			borderBottomRightRadius,
			borderBottomLeftRadius
		].map((radius) => validateNum(parseFloat(radius))));
	}
	import_react.useEffect(() => {
		if (target) {
			const id$2 = raf_default(() => {
				syncPos();
				setEnabled(true);
			});
			let resizeObserver;
			if (typeof ResizeObserver !== "undefined") {
				resizeObserver = new ResizeObserver(syncPos);
				resizeObserver.observe(target);
			}
			return () => {
				raf_default.cancel(id$2);
				resizeObserver === null || resizeObserver === void 0 || resizeObserver.disconnect();
			};
		}
	}, []);
	if (!enabled) return null;
	const isSmallComponent = (component === "Checkbox" || component === "Radio") && (target === null || target === void 0 ? void 0 : target.classList.contains(TARGET_CLS));
	return /* @__PURE__ */ import_react.createElement(es_default$5, {
		visible: true,
		motionAppear: true,
		motionName: "wave-motion",
		motionDeadline: 5e3,
		onAppearEnd: (_, event) => {
			var _a, _b;
			if (event.deadline || event.propertyName === "opacity") {
				const holder = (_a = divRef.current) === null || _a === void 0 ? void 0 : _a.parentElement;
				(_b = unmountRef.current) === null || _b === void 0 || _b.call(unmountRef).then(() => {
					holder === null || holder === void 0 || holder.remove();
				});
			}
			return false;
		}
	}, ({ className: motionClassName }, ref) => /* @__PURE__ */ import_react.createElement("div", {
		ref: composeRef(divRef, ref),
		className: (0, import_classnames$31.default)(className, motionClassName, { "wave-quick": isSmallComponent }),
		style: waveStyle
	}));
};
var showWaveEffect = (target, info) => {
	var _a;
	const { component } = info;
	if (component === "Checkbox" && !((_a = target.querySelector("input")) === null || _a === void 0 ? void 0 : _a.checked)) return;
	const holder = document.createElement("div");
	holder.style.position = "absolute";
	holder.style.left = "0px";
	holder.style.top = "0px";
	target === null || target === void 0 || target.insertBefore(holder, target === null || target === void 0 ? void 0 : target.firstChild);
	const reactRender$1 = unstableSetRender();
	let unmountCallback = null;
	function registerUnmount() {
		return unmountCallback;
	}
	unmountCallback = reactRender$1(/* @__PURE__ */ import_react.createElement(WaveEffect, Object.assign({}, info, {
		target,
		registerUnmount
	})), holder);
};
var WaveEffect_default = showWaveEffect;
init_useEvent();
init_raf();
var useWave = (nodeRef, className, component) => {
	const { wave } = import_react.useContext(ConfigContext);
	const [, token, hashId] = useToken();
	const showWave = useEvent((event) => {
		const node = nodeRef.current;
		if ((wave === null || wave === void 0 ? void 0 : wave.disabled) || !node) return;
		const targetNode = node.querySelector(`.${TARGET_CLS}`) || node;
		const { showEffect } = wave || {};
		(showEffect || WaveEffect_default)(targetNode, {
			className,
			token,
			component,
			event,
			hashId
		});
	});
	const rafId = import_react.useRef(null);
	const showDebounceWave = (event) => {
		raf_default.cancel(rafId.current);
		rafId.current = raf_default(() => {
			showWave(event);
		});
	};
	return showDebounceWave;
};
var useWave_default = useWave;
var import_classnames$30 = /* @__PURE__ */ __toESM(require_classnames());
init_isVisible();
init_ref();
var Wave = (props) => {
	const { children, disabled, component } = props;
	const { getPrefixCls } = (0, import_react.useContext)(ConfigContext);
	const containerRef = (0, import_react.useRef)(null);
	const prefixCls = getPrefixCls("wave");
	const [, hashId] = style_default$9(prefixCls);
	const showWave = useWave_default(containerRef, (0, import_classnames$30.default)(prefixCls, hashId), component);
	import_react.useEffect(() => {
		const node = containerRef.current;
		if (!node || node.nodeType !== 1 || disabled) return;
		const onClick = (e$1) => {
			if (!isVisible_default(e$1.target) || !node.getAttribute || node.getAttribute("disabled") || node.disabled || node.className.includes("disabled") || node.className.includes("-leave")) return;
			showWave(e$1);
		};
		node.addEventListener("click", onClick, true);
		return () => {
			node.removeEventListener("click", onClick, true);
		};
	}, [disabled]);
	if (!/* @__PURE__ */ import_react.isValidElement(children)) return children !== null && children !== void 0 ? children : null;
	return cloneElement(children, { ref: supportRef(children) ? composeRef(getNodeRef(children), containerRef) : containerRef });
};
var wave_default = Wave;
var useSize = (customSize) => {
	const size = import_react.useContext(SizeContext_default);
	return import_react.useMemo(() => {
		if (!customSize) return size;
		if (typeof customSize === "string") return customSize !== null && customSize !== void 0 ? customSize : size;
		if (typeof customSize === "function") return customSize(size);
		return size;
	}, [customSize, size]);
};
var useSize_default = useSize;
var genSpaceCompactStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		"&-block": {
			display: "flex",
			width: "100%"
		},
		"&-vertical": { flexDirection: "column" }
	} };
};
var compact_default$1 = genSpaceCompactStyle;
var genSpaceStyle = (token) => {
	const { componentCls, antCls } = token;
	return { [componentCls]: {
		display: "inline-flex",
		"&-rtl": { direction: "rtl" },
		"&-vertical": { flexDirection: "column" },
		"&-align": {
			flexDirection: "column",
			"&-center": { alignItems: "center" },
			"&-start": { alignItems: "flex-start" },
			"&-end": { alignItems: "flex-end" },
			"&-baseline": { alignItems: "baseline" }
		},
		[`${componentCls}-item:empty`]: { display: "none" },
		[`${componentCls}-item > ${antCls}-badge-not-a-wrapper:only-child`]: { display: "block" }
	} };
};
var genSpaceGapStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		"&-gap-row-small": { rowGap: token.spaceGapSmallSize },
		"&-gap-row-middle": { rowGap: token.spaceGapMiddleSize },
		"&-gap-row-large": { rowGap: token.spaceGapLargeSize },
		"&-gap-col-small": { columnGap: token.spaceGapSmallSize },
		"&-gap-col-middle": { columnGap: token.spaceGapMiddleSize },
		"&-gap-col-large": { columnGap: token.spaceGapLargeSize }
	} };
};
var style_default$1 = genStyleHooks("Space", (token) => {
	const spaceToken = merge(token, {
		spaceGapSmallSize: token.paddingXS,
		spaceGapMiddleSize: token.padding,
		spaceGapLargeSize: token.paddingLG
	});
	return [
		genSpaceStyle(spaceToken),
		genSpaceGapStyle(spaceToken),
		compact_default$1(spaceToken)
	];
}, () => ({}), { resetStyle: false });
var import_classnames$29 = /* @__PURE__ */ __toESM(require_classnames());
init_toArray();
var __rest$11 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
const SpaceCompactItemContext = /* @__PURE__ */ import_react.createContext(null);
const useCompactItemContext = (prefixCls, direction) => {
	const compactItemContext = import_react.useContext(SpaceCompactItemContext);
	const compactItemClassnames = import_react.useMemo(() => {
		if (!compactItemContext) return "";
		const { compactDirection, isFirstItem, isLastItem } = compactItemContext;
		const separator = compactDirection === "vertical" ? "-vertical-" : "-";
		return (0, import_classnames$29.default)(`${prefixCls}-compact${separator}item`, {
			[`${prefixCls}-compact${separator}first-item`]: isFirstItem,
			[`${prefixCls}-compact${separator}last-item`]: isLastItem,
			[`${prefixCls}-compact${separator}item-rtl`]: direction === "rtl"
		});
	}, [
		prefixCls,
		direction,
		compactItemContext
	]);
	return {
		compactSize: compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactSize,
		compactDirection: compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactDirection,
		compactItemClassnames
	};
};
const NoCompactStyle = (props) => {
	const { children } = props;
	return /* @__PURE__ */ import_react.createElement(SpaceCompactItemContext.Provider, { value: null }, children);
};
var CompactItem = (props) => {
	const { children } = props, others = __rest$11(props, ["children"]);
	return /* @__PURE__ */ import_react.createElement(SpaceCompactItemContext.Provider, { value: import_react.useMemo(() => others, [others]) }, children);
};
var Compact = (props) => {
	const { getPrefixCls, direction: directionConfig } = import_react.useContext(ConfigContext);
	const { size, direction, block, prefixCls: customizePrefixCls, className, rootClassName, children } = props, restProps = __rest$11(props, [
		"size",
		"direction",
		"block",
		"prefixCls",
		"className",
		"rootClassName",
		"children"
	]);
	const mergedSize = useSize_default((ctx) => size !== null && size !== void 0 ? size : ctx);
	const prefixCls = getPrefixCls("space-compact", customizePrefixCls);
	const [wrapCSSVar, hashId] = style_default$1(prefixCls);
	const clx = (0, import_classnames$29.default)(prefixCls, hashId, {
		[`${prefixCls}-rtl`]: directionConfig === "rtl",
		[`${prefixCls}-block`]: block,
		[`${prefixCls}-vertical`]: direction === "vertical"
	}, className, rootClassName);
	const compactItemContext = import_react.useContext(SpaceCompactItemContext);
	const childNodes = toArray$1(children);
	const nodes = import_react.useMemo(() => childNodes.map((child, i$1) => {
		const key = (child === null || child === void 0 ? void 0 : child.key) || `${prefixCls}-item-${i$1}`;
		return /* @__PURE__ */ import_react.createElement(CompactItem, {
			key,
			compactSize: mergedSize,
			compactDirection: direction,
			isFirstItem: i$1 === 0 && (!compactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isFirstItem)),
			isLastItem: i$1 === childNodes.length - 1 && (!compactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isLastItem))
		}, child);
	}), [
		size,
		childNodes,
		compactItemContext
	]);
	if (childNodes.length === 0) return null;
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", Object.assign({ className: clx }, restProps), nodes));
};
var Compact_default = Compact;
var import_classnames$28 = /* @__PURE__ */ __toESM(require_classnames());
var __rest$10 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
const GroupSizeContext = /* @__PURE__ */ import_react.createContext(void 0);
var ButtonGroup = (props) => {
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const { prefixCls: customizePrefixCls, size, className } = props, others = __rest$10(props, [
		"prefixCls",
		"size",
		"className"
	]);
	const prefixCls = getPrefixCls("btn-group", customizePrefixCls);
	const [, , hashId] = useToken();
	const sizeCls = import_react.useMemo(() => {
		switch (size) {
			case "large": return "lg";
			case "small": return "sm";
			default: return "";
		}
	}, [size]);
	const classes = (0, import_classnames$28.default)(prefixCls, {
		[`${prefixCls}-${sizeCls}`]: sizeCls,
		[`${prefixCls}-rtl`]: direction === "rtl"
	}, className, hashId);
	return /* @__PURE__ */ import_react.createElement(GroupSizeContext.Provider, { value: size }, /* @__PURE__ */ import_react.createElement("div", Object.assign({}, others, { className: classes })));
};
var button_group_default = ButtonGroup;
init_toConsumableArray();
var rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function convertLegacyProps(type) {
	if (type === "danger") return { danger: true };
	return { type };
}
function isString(str) {
	return typeof str === "string";
}
function isUnBorderedButtonVariant(type) {
	return type === "text" || type === "link";
}
function splitCNCharsBySpace(child, needInserted) {
	if (child === null || child === void 0) return;
	const SPACE = needInserted ? " " : "";
	if (typeof child !== "string" && typeof child !== "number" && isString(child.type) && isTwoCNChar(child.props.children)) return cloneElement(child, { children: child.props.children.split("").join(SPACE) });
	if (isString(child)) return isTwoCNChar(child) ? /* @__PURE__ */ import_react.createElement("span", null, child.split("").join(SPACE)) : /* @__PURE__ */ import_react.createElement("span", null, child);
	if (isFragment(child)) return /* @__PURE__ */ import_react.createElement("span", null, child);
	return child;
}
function spaceChildren(children, needInserted) {
	let isPrevChildPure = false;
	const childList = [];
	import_react.Children.forEach(children, (child) => {
		const type = typeof child;
		const isCurrentChildPure = type === "string" || type === "number";
		if (isPrevChildPure && isCurrentChildPure) {
			const lastIndex = childList.length - 1;
			childList[lastIndex] = `${childList[lastIndex]}${child}`;
		} else childList.push(child);
		isPrevChildPure = isCurrentChildPure;
	});
	return import_react.Children.map(childList, (child) => splitCNCharsBySpace(child, needInserted));
}
[
	"default",
	"primary",
	"danger"
].concat(_toConsumableArray(PresetColors));
var import_classnames$27 = /* @__PURE__ */ __toESM(require_classnames());
var IconWrapper_default = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const { className, style, children, prefixCls } = props;
	const iconWrapperCls = (0, import_classnames$27.default)(`${prefixCls}-icon`, className);
	return /* @__PURE__ */ import_react.createElement("span", {
		ref,
		className: iconWrapperCls,
		style
	}, children);
});
init_LoadingOutlined();
var import_classnames$26 = /* @__PURE__ */ __toESM(require_classnames());
init_es$4();
var InnerLoadingIcon = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const { prefixCls, className, style, iconClassName } = props;
	const mergedIconCls = (0, import_classnames$26.default)(`${prefixCls}-loading-icon`, className);
	return /* @__PURE__ */ import_react.createElement(IconWrapper_default, {
		prefixCls,
		className: mergedIconCls,
		style,
		ref
	}, /* @__PURE__ */ import_react.createElement(LoadingOutlined_default, { className: iconClassName }));
});
var getCollapsedWidth = () => ({
	width: 0,
	opacity: 0,
	transform: "scale(0)"
});
var getRealWidth = (node) => ({
	width: node.scrollWidth,
	opacity: 1,
	transform: "scale(1)"
});
var DefaultLoadingIcon = (props) => {
	const { prefixCls, loading, existIcon, className, style, mount } = props;
	const visible = !!loading;
	if (existIcon) return /* @__PURE__ */ import_react.createElement(InnerLoadingIcon, {
		prefixCls,
		className,
		style
	});
	return /* @__PURE__ */ import_react.createElement(es_default$5, {
		visible,
		motionName: `${prefixCls}-loading-icon-motion`,
		motionAppear: !mount,
		motionEnter: !mount,
		motionLeave: !mount,
		removeOnLeave: true,
		onAppearStart: getCollapsedWidth,
		onAppearActive: getRealWidth,
		onEnterStart: getCollapsedWidth,
		onEnterActive: getRealWidth,
		onLeaveStart: getRealWidth,
		onLeaveActive: getCollapsedWidth
	}, ({ className: motionCls, style: motionStyle }, ref) => {
		const mergedStyle = Object.assign(Object.assign({}, style), motionStyle);
		return /* @__PURE__ */ import_react.createElement(InnerLoadingIcon, {
			prefixCls,
			className: (0, import_classnames$26.default)(className, motionCls),
			style: mergedStyle,
			ref
		});
	});
};
var DefaultLoadingIcon_default = DefaultLoadingIcon;
var genButtonBorderStyle = (buttonTypeCls, borderColor) => ({ [`> span, > ${buttonTypeCls}`]: {
	"&:not(:last-child)": { [`&, & > ${buttonTypeCls}`]: { "&:not(:disabled)": { borderInlineEndColor: borderColor } } },
	"&:not(:first-child)": { [`&, & > ${buttonTypeCls}`]: { "&:not(:disabled)": { borderInlineStartColor: borderColor } } }
} });
var genGroupStyle = (token) => {
	const { componentCls, fontSize, lineWidth, groupBorderColor, colorErrorHover } = token;
	return { [`${componentCls}-group`]: [
		{
			position: "relative",
			display: "inline-flex",
			[`> span, > ${componentCls}`]: {
				"&:not(:last-child)": { [`&, & > ${componentCls}`]: {
					borderStartEndRadius: 0,
					borderEndEndRadius: 0
				} },
				"&:not(:first-child)": {
					marginInlineStart: token.calc(lineWidth).mul(-1).equal(),
					[`&, & > ${componentCls}`]: {
						borderStartStartRadius: 0,
						borderEndStartRadius: 0
					}
				}
			},
			[componentCls]: {
				position: "relative",
				zIndex: 1,
				"&:hover, &:focus, &:active": { zIndex: 2 },
				"&[disabled]": { zIndex: 0 }
			},
			[`${componentCls}-icon-only`]: { fontSize }
		},
		genButtonBorderStyle(`${componentCls}-primary`, groupBorderColor),
		genButtonBorderStyle(`${componentCls}-danger`, colorErrorHover)
	] };
};
var group_default = genGroupStyle;
init_classCallCheck();
init_createClass();
init_es$5();
const toHexFormat = (value, alpha$1) => (value === null || value === void 0 ? void 0 : value.replace(/[^\w/]/g, "").slice(0, alpha$1 ? 8 : 6)) || "";
const getHex = (value, alpha$1) => value ? toHexFormat(value, alpha$1) : "";
let AggregationColor = /* @__PURE__ */ function() {
	function AggregationColor$1(color$1) {
		_classCallCheck(this, AggregationColor$1);
		var _a;
		this.cleared = false;
		if (color$1 instanceof AggregationColor$1) {
			this.metaColor = color$1.metaColor.clone();
			this.colors = (_a = color$1.colors) === null || _a === void 0 ? void 0 : _a.map((info) => ({
				color: new AggregationColor$1(info.color),
				percent: info.percent
			}));
			this.cleared = color$1.cleared;
			return;
		}
		const isArray = Array.isArray(color$1);
		if (isArray && color$1.length) {
			this.colors = color$1.map(({ color: c$1, percent: percent$1 }) => ({
				color: new AggregationColor$1(c$1),
				percent: percent$1
			}));
			this.metaColor = new Color(this.colors[0].color.metaColor);
		} else this.metaColor = new Color(isArray ? "" : color$1);
		if (!color$1 || isArray && !this.colors) {
			this.metaColor = this.metaColor.setA(0);
			this.cleared = true;
		}
	}
	return _createClass(AggregationColor$1, [
		{
			key: "toHsb",
			value: function toHsb() {
				return this.metaColor.toHsb();
			}
		},
		{
			key: "toHsbString",
			value: function toHsbString() {
				return this.metaColor.toHsbString();
			}
		},
		{
			key: "toHex",
			value: function toHex() {
				return getHex(this.toHexString(), this.metaColor.a < 1);
			}
		},
		{
			key: "toHexString",
			value: function toHexString() {
				return this.metaColor.toHexString();
			}
		},
		{
			key: "toRgb",
			value: function toRgb() {
				return this.metaColor.toRgb();
			}
		},
		{
			key: "toRgbString",
			value: function toRgbString() {
				return this.metaColor.toRgbString();
			}
		},
		{
			key: "isGradient",
			value: function isGradient() {
				return !!this.colors && !this.cleared;
			}
		},
		{
			key: "getColors",
			value: function getColors() {
				return this.colors || [{
					color: this,
					percent: 0
				}];
			}
		},
		{
			key: "toCssString",
			value: function toCssString() {
				const { colors } = this;
				if (colors) return `linear-gradient(90deg, ${colors.map((c$1) => `${c$1.color.toRgbString()} ${c$1.percent}%`).join(", ")})`;
				return this.metaColor.toRgbString();
			}
		},
		{
			key: "equals",
			value: function equals(color$1) {
				if (!color$1 || this.isGradient() !== color$1.isGradient()) return false;
				if (!this.isGradient()) return this.toHexString() === color$1.toHexString();
				return this.colors.length === color$1.colors.length && this.colors.every((c$1, i$1) => {
					const target = color$1.colors[i$1];
					return c$1.percent === target.percent && c$1.color.equals(target.color);
				});
			}
		}
	]);
}();
var import_classnames$25 = /* @__PURE__ */ __toESM(require_classnames());
init_es$6();
var CollapsePanel_default = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const { prefixCls: customizePrefixCls, className, showArrow = true } = props;
	const prefixCls = getPrefixCls("collapse", customizePrefixCls);
	const collapsePanelClassName = (0, import_classnames$25.default)({ [`${prefixCls}-no-arrow`]: !showArrow }, className);
	return /* @__PURE__ */ import_react.createElement(es_default$4.Panel, Object.assign({ ref }, props, {
		prefixCls,
		className: collapsePanelClassName
	}));
});
var genCollapseMotion = (token) => ({ [token.componentCls]: {
	[`${token.antCls}-motion-collapse-legacy`]: {
		overflow: "hidden",
		"&-active": { transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important` }
	},
	[`${token.antCls}-motion-collapse`]: {
		overflow: "hidden",
		transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
	}
} });
var collapse_default = genCollapseMotion;
var initMotionCommon = (duration) => ({
	animationDuration: duration,
	animationFillMode: "both"
});
var initMotionCommonLeave = (duration) => ({
	animationDuration: duration,
	animationFillMode: "both"
});
const initMotion = (motionCls, inKeyframes, outKeyframes, duration, sameLevel = false) => {
	const sameLevelPrefix = sameLevel ? "&" : "";
	return {
		[`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: Object.assign(Object.assign({}, initMotionCommon(duration)), { animationPlayState: "paused" }),
		[`${sameLevelPrefix}${motionCls}-leave`]: Object.assign(Object.assign({}, initMotionCommonLeave(duration)), { animationPlayState: "paused" }),
		[`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
			animationName: inKeyframes,
			animationPlayState: "running"
		},
		[`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
			animationName: outKeyframes,
			animationPlayState: "running",
			pointerEvents: "none"
		}
	};
};
init_es$2();
const fadeIn = new Keyframes_default("antFadeIn", {
	"0%": { opacity: 0 },
	"100%": { opacity: 1 }
});
const fadeOut = new Keyframes_default("antFadeOut", {
	"0%": { opacity: 1 },
	"100%": { opacity: 0 }
});
const initFadeMotion = (token, sameLevel = false) => {
	const { antCls } = token;
	const motionCls = `${antCls}-fade`;
	const sameLevelPrefix = sameLevel ? "&" : "";
	return [initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid, sameLevel), {
		[`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: "linear"
		},
		[`${sameLevelPrefix}${motionCls}-leave`]: { animationTimingFunction: "linear" }
	}];
};
init_es$2();
const moveDownIn = new Keyframes_default("antMoveDownIn", {
	"0%": {
		transform: "translate3d(0, 100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
const moveDownOut = new Keyframes_default("antMoveDownOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(0, 100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
const moveLeftIn = new Keyframes_default("antMoveLeftIn", {
	"0%": {
		transform: "translate3d(-100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
const moveLeftOut = new Keyframes_default("antMoveLeftOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(-100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
const moveRightIn = new Keyframes_default("antMoveRightIn", {
	"0%": {
		transform: "translate3d(100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
const moveRightOut = new Keyframes_default("antMoveRightOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(100%, 0, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
const moveUpIn = new Keyframes_default("antMoveUpIn", {
	"0%": {
		transform: "translate3d(0, -100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	},
	"100%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	}
});
const moveUpOut = new Keyframes_default("antMoveUpOut", {
	"0%": {
		transform: "translate3d(0, 0, 0)",
		transformOrigin: "0 0",
		opacity: 1
	},
	"100%": {
		transform: "translate3d(0, -100%, 0)",
		transformOrigin: "0 0",
		opacity: 0
	}
});
var moveMotion = {
	"move-up": {
		inKeyframes: moveUpIn,
		outKeyframes: moveUpOut
	},
	"move-down": {
		inKeyframes: moveDownIn,
		outKeyframes: moveDownOut
	},
	"move-left": {
		inKeyframes: moveLeftIn,
		outKeyframes: moveLeftOut
	},
	"move-right": {
		inKeyframes: moveRightIn,
		outKeyframes: moveRightOut
	}
};
const initMoveMotion = (token, motionName) => {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = moveMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			opacity: 0,
			animationTimingFunction: token.motionEaseOutCirc
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInOutCirc }
	}];
};
init_es$2();
const slideUpIn = new Keyframes_default("antSlideUpIn", {
	"0%": {
		transform: "scaleY(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleY(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	}
});
const slideUpOut = new Keyframes_default("antSlideUpOut", {
	"0%": {
		transform: "scaleY(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleY(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	}
});
const slideDownIn = new Keyframes_default("antSlideDownIn", {
	"0%": {
		transform: "scaleY(0.8)",
		transformOrigin: "100% 100%",
		opacity: 0
	},
	"100%": {
		transform: "scaleY(1)",
		transformOrigin: "100% 100%",
		opacity: 1
	}
});
const slideDownOut = new Keyframes_default("antSlideDownOut", {
	"0%": {
		transform: "scaleY(1)",
		transformOrigin: "100% 100%",
		opacity: 1
	},
	"100%": {
		transform: "scaleY(0.8)",
		transformOrigin: "100% 100%",
		opacity: 0
	}
});
const slideLeftIn = new Keyframes_default("antSlideLeftIn", {
	"0%": {
		transform: "scaleX(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleX(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	}
});
const slideLeftOut = new Keyframes_default("antSlideLeftOut", {
	"0%": {
		transform: "scaleX(1)",
		transformOrigin: "0% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleX(0.8)",
		transformOrigin: "0% 0%",
		opacity: 0
	}
});
const slideRightIn = new Keyframes_default("antSlideRightIn", {
	"0%": {
		transform: "scaleX(0.8)",
		transformOrigin: "100% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scaleX(1)",
		transformOrigin: "100% 0%",
		opacity: 1
	}
});
const slideRightOut = new Keyframes_default("antSlideRightOut", {
	"0%": {
		transform: "scaleX(1)",
		transformOrigin: "100% 0%",
		opacity: 1
	},
	"100%": {
		transform: "scaleX(0.8)",
		transformOrigin: "100% 0%",
		opacity: 0
	}
});
var slideMotion = {
	"slide-up": {
		inKeyframes: slideUpIn,
		outKeyframes: slideUpOut
	},
	"slide-down": {
		inKeyframes: slideDownIn,
		outKeyframes: slideDownOut
	},
	"slide-left": {
		inKeyframes: slideLeftIn,
		outKeyframes: slideLeftOut
	},
	"slide-right": {
		inKeyframes: slideRightIn,
		outKeyframes: slideRightOut
	}
};
const initSlideMotion = (token, motionName) => {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = slideMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
		[`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
			transform: "scale(0)",
			transformOrigin: "0% 0%",
			opacity: 0,
			animationTimingFunction: token.motionEaseOutQuint,
			"&-prepare": { transform: "scale(1)" }
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInQuint }
	}];
};
init_es$2();
const zoomIn = new Keyframes_default("antZoomIn", {
	"0%": {
		transform: "scale(0.2)",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		opacity: 1
	}
});
const zoomOut = new Keyframes_default("antZoomOut", {
	"0%": { transform: "scale(1)" },
	"100%": {
		transform: "scale(0.2)",
		opacity: 0
	}
});
const zoomBigIn = new Keyframes_default("antZoomBigIn", {
	"0%": {
		transform: "scale(0.8)",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		opacity: 1
	}
});
const zoomBigOut = new Keyframes_default("antZoomBigOut", {
	"0%": { transform: "scale(1)" },
	"100%": {
		transform: "scale(0.8)",
		opacity: 0
	}
});
const zoomUpIn = new Keyframes_default("antZoomUpIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 0%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "50% 0%"
	}
});
const zoomUpOut = new Keyframes_default("antZoomUpOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "50% 0%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 0%",
		opacity: 0
	}
});
const zoomLeftIn = new Keyframes_default("antZoomLeftIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "0% 50%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "0% 50%"
	}
});
const zoomLeftOut = new Keyframes_default("antZoomLeftOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "0% 50%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "0% 50%",
		opacity: 0
	}
});
const zoomRightIn = new Keyframes_default("antZoomRightIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "100% 50%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "100% 50%"
	}
});
const zoomRightOut = new Keyframes_default("antZoomRightOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "100% 50%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "100% 50%",
		opacity: 0
	}
});
const zoomDownIn = new Keyframes_default("antZoomDownIn", {
	"0%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 100%",
		opacity: 0
	},
	"100%": {
		transform: "scale(1)",
		transformOrigin: "50% 100%"
	}
});
const zoomDownOut = new Keyframes_default("antZoomDownOut", {
	"0%": {
		transform: "scale(1)",
		transformOrigin: "50% 100%"
	},
	"100%": {
		transform: "scale(0.8)",
		transformOrigin: "50% 100%",
		opacity: 0
	}
});
var zoomMotion = {
	zoom: {
		inKeyframes: zoomIn,
		outKeyframes: zoomOut
	},
	"zoom-big": {
		inKeyframes: zoomBigIn,
		outKeyframes: zoomBigOut
	},
	"zoom-big-fast": {
		inKeyframes: zoomBigIn,
		outKeyframes: zoomBigOut
	},
	"zoom-left": {
		inKeyframes: zoomLeftIn,
		outKeyframes: zoomLeftOut
	},
	"zoom-right": {
		inKeyframes: zoomRightIn,
		outKeyframes: zoomRightOut
	},
	"zoom-up": {
		inKeyframes: zoomUpIn,
		outKeyframes: zoomUpOut
	},
	"zoom-down": {
		inKeyframes: zoomDownIn,
		outKeyframes: zoomDownOut
	}
};
const initZoomMotion = (token, motionName) => {
	const { antCls } = token;
	const motionCls = `${antCls}-${motionName}`;
	const { inKeyframes, outKeyframes } = zoomMotion[motionName];
	return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
		[`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
			transform: "scale(0)",
			opacity: 0,
			animationTimingFunction: token.motionEaseOutCirc,
			"&-prepare": { transform: "none" }
		},
		[`${motionCls}-leave`]: { animationTimingFunction: token.motionEaseInOutCirc }
	}];
};
init_es$2();
const genBaseStyle$2 = (token) => {
	const { componentCls, contentBg, padding, headerBg, headerPadding, collapseHeaderPaddingSM, collapseHeaderPaddingLG, collapsePanelBorderRadius, lineWidth, lineType, colorBorder, colorText, colorTextHeading, colorTextDisabled, fontSizeLG, lineHeight, lineHeightLG, marginSM, paddingSM, paddingLG, paddingXS, motionDurationSlow, fontSizeIcon, contentPadding, fontHeight, fontHeightLG } = token;
	const borderBase = `${unit(lineWidth)} ${lineType} ${colorBorder}`;
	return { [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
		backgroundColor: headerBg,
		border: borderBase,
		borderRadius: collapsePanelBorderRadius,
		"&-rtl": { direction: "rtl" },
		[`& > ${componentCls}-item`]: {
			borderBottom: borderBase,
			"&:first-child": { [`
            &,
            & > ${componentCls}-header`]: { borderRadius: `${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)} 0 0` } },
			"&:last-child": { [`
            &,
            & > ${componentCls}-header`]: { borderRadius: `0 0 ${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)}` } },
			[`> ${componentCls}-header`]: Object.assign(Object.assign({
				position: "relative",
				display: "flex",
				flexWrap: "nowrap",
				alignItems: "flex-start",
				padding: headerPadding,
				color: colorTextHeading,
				lineHeight,
				cursor: "pointer",
				transition: `all ${motionDurationSlow}, visibility 0s`
			}, genFocusStyle(token)), {
				[`> ${componentCls}-header-text`]: { flex: "auto" },
				[`${componentCls}-expand-icon`]: {
					height: fontHeight,
					display: "flex",
					alignItems: "center",
					paddingInlineEnd: marginSM
				},
				[`${componentCls}-arrow`]: Object.assign(Object.assign({}, resetIcon()), {
					fontSize: fontSizeIcon,
					transition: `transform ${motionDurationSlow}`,
					svg: { transition: `transform ${motionDurationSlow}` }
				}),
				[`${componentCls}-header-text`]: { marginInlineEnd: "auto" }
			}),
			[`${componentCls}-collapsible-header`]: {
				cursor: "default",
				[`${componentCls}-header-text`]: {
					flex: "none",
					cursor: "pointer"
				}
			},
			[`${componentCls}-collapsible-icon`]: {
				cursor: "unset",
				[`${componentCls}-expand-icon`]: { cursor: "pointer" }
			}
		},
		[`${componentCls}-content`]: {
			color: colorText,
			backgroundColor: contentBg,
			borderTop: borderBase,
			[`& > ${componentCls}-content-box`]: { padding: contentPadding },
			"&-hidden": { display: "none" }
		},
		"&-small": { [`> ${componentCls}-item`]: {
			[`> ${componentCls}-header`]: {
				padding: collapseHeaderPaddingSM,
				paddingInlineStart: paddingXS,
				[`> ${componentCls}-expand-icon`]: { marginInlineStart: token.calc(paddingSM).sub(paddingXS).equal() }
			},
			[`> ${componentCls}-content > ${componentCls}-content-box`]: { padding: paddingSM }
		} },
		"&-large": { [`> ${componentCls}-item`]: {
			fontSize: fontSizeLG,
			lineHeight: lineHeightLG,
			[`> ${componentCls}-header`]: {
				padding: collapseHeaderPaddingLG,
				paddingInlineStart: padding,
				[`> ${componentCls}-expand-icon`]: {
					height: fontHeightLG,
					marginInlineStart: token.calc(paddingLG).sub(padding).equal()
				}
			},
			[`> ${componentCls}-content > ${componentCls}-content-box`]: { padding: paddingLG }
		} },
		[`${componentCls}-item:last-child`]: {
			borderBottom: 0,
			[`> ${componentCls}-content`]: { borderRadius: `0 0 ${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)}` }
		},
		[`& ${componentCls}-item-disabled > ${componentCls}-header`]: { [`
          &,
          & > .arrow
        `]: {
			color: colorTextDisabled,
			cursor: "not-allowed"
		} },
		[`&${componentCls}-icon-position-end`]: { [`& > ${componentCls}-item`]: { [`> ${componentCls}-header`]: { [`${componentCls}-expand-icon`]: {
			order: 1,
			paddingInlineEnd: 0,
			paddingInlineStart: marginSM
		} } } }
	}) };
};
var genArrowStyle = (token) => {
	const { componentCls } = token;
	const fixedSelector = `> ${componentCls}-item > ${componentCls}-header ${componentCls}-arrow`;
	return { [`${componentCls}-rtl`]: { [fixedSelector]: { transform: `rotate(180deg)` } } };
};
var genBorderlessStyle = (token) => {
	const { componentCls, headerBg, borderlessContentPadding, borderlessContentBg, colorBorder } = token;
	return { [`${componentCls}-borderless`]: {
		backgroundColor: headerBg,
		border: 0,
		[`> ${componentCls}-item`]: { borderBottom: `1px solid ${colorBorder}` },
		[`
        > ${componentCls}-item:last-child,
        > ${componentCls}-item:last-child ${componentCls}-header
      `]: { borderRadius: 0 },
		[`> ${componentCls}-item:last-child`]: { borderBottom: 0 },
		[`> ${componentCls}-item > ${componentCls}-content`]: {
			backgroundColor: borderlessContentBg,
			borderTop: 0
		},
		[`> ${componentCls}-item > ${componentCls}-content > ${componentCls}-content-box`]: { padding: borderlessContentPadding }
	} };
};
var genGhostStyle = (token) => {
	const { componentCls, paddingSM } = token;
	return { [`${componentCls}-ghost`]: {
		backgroundColor: "transparent",
		border: 0,
		[`> ${componentCls}-item`]: {
			borderBottom: 0,
			[`> ${componentCls}-content`]: {
				backgroundColor: "transparent",
				border: 0,
				[`> ${componentCls}-content-box`]: { paddingBlock: paddingSM }
			}
		}
	} };
};
const prepareComponentToken$7 = (token) => ({
	headerPadding: `${token.paddingSM}px ${token.padding}px`,
	headerBg: token.colorFillAlter,
	contentPadding: `${token.padding}px 16px`,
	contentBg: token.colorBgContainer,
	borderlessContentPadding: `${token.paddingXXS}px 16px ${token.padding}px`,
	borderlessContentBg: "transparent"
});
var style_default$8 = genStyleHooks("Collapse", (token) => {
	const collapseToken = merge(token, {
		collapseHeaderPaddingSM: `${unit(token.paddingXS)} ${unit(token.paddingSM)}`,
		collapseHeaderPaddingLG: `${unit(token.padding)} ${unit(token.paddingLG)}`,
		collapsePanelBorderRadius: token.borderRadiusLG
	});
	return [
		genBaseStyle$2(collapseToken),
		genBorderlessStyle(collapseToken),
		genGhostStyle(collapseToken),
		genArrowStyle(collapseToken),
		collapse_default(collapseToken)
	];
}, prepareComponentToken$7);
init_RightOutlined();
var import_classnames$24 = /* @__PURE__ */ __toESM(require_classnames());
init_es$6();
init_toArray();
init_omit();
var Collapse = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { getPrefixCls, direction, expandIcon: contextExpandIcon, className: contextClassName, style: contextStyle } = useComponentConfig("collapse");
	const { prefixCls: customizePrefixCls, className, rootClassName, style, bordered = true, ghost, size: customizeSize, expandIconPosition = "start", children, destroyInactivePanel, destroyOnHidden, expandIcon } = props;
	const mergedSize = useSize_default((ctx) => {
		var _a;
		return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : ctx) !== null && _a !== void 0 ? _a : "middle";
	});
	const prefixCls = getPrefixCls("collapse", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const [wrapCSSVar, hashId, cssVarCls] = style_default$8(prefixCls);
	const mergedExpandIconPosition = import_react.useMemo(() => {
		if (expandIconPosition === "left") return "start";
		return expandIconPosition === "right" ? "end" : expandIconPosition;
	}, [expandIconPosition]);
	const mergedExpandIcon = expandIcon !== null && expandIcon !== void 0 ? expandIcon : contextExpandIcon;
	const renderExpandIcon = import_react.useCallback((panelProps = {}) => {
		const icon = typeof mergedExpandIcon === "function" ? mergedExpandIcon(panelProps) : /* @__PURE__ */ import_react.createElement(RightOutlined_default, {
			rotate: panelProps.isActive ? direction === "rtl" ? -90 : 90 : void 0,
			"aria-label": panelProps.isActive ? "expanded" : "collapsed"
		});
		return cloneElement(icon, () => {
			var _a;
			return { className: (0, import_classnames$24.default)((_a = icon.props) === null || _a === void 0 ? void 0 : _a.className, `${prefixCls}-arrow`) };
		});
	}, [
		mergedExpandIcon,
		prefixCls,
		direction
	]);
	const collapseClassName = (0, import_classnames$24.default)(`${prefixCls}-icon-position-${mergedExpandIconPosition}`, {
		[`${prefixCls}-borderless`]: !bordered,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-ghost`]: !!ghost,
		[`${prefixCls}-${mergedSize}`]: mergedSize !== "middle"
	}, contextClassName, className, rootClassName, hashId, cssVarCls);
	const openMotion = import_react.useMemo(() => Object.assign(Object.assign({}, motion_default(rootPrefixCls)), {
		motionAppear: false,
		leavedClassName: `${prefixCls}-content-hidden`
	}), [rootPrefixCls, prefixCls]);
	const items = import_react.useMemo(() => {
		if (!children) return null;
		return toArray$1(children).map((child, index) => {
			var _a, _b;
			const childProps = child.props;
			if (childProps === null || childProps === void 0 ? void 0 : childProps.disabled) {
				const key = (_a = child.key) !== null && _a !== void 0 ? _a : String(index);
				return cloneElement(child, Object.assign(Object.assign({}, omit(child.props, ["disabled"])), {
					key,
					collapsible: (_b = childProps.collapsible) !== null && _b !== void 0 ? _b : "disabled"
				}));
			}
			return child;
		});
	}, [children]);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement(es_default$4, Object.assign({
		ref,
		openMotion
	}, omit(props, ["rootClassName"]), {
		expandIcon: renderExpandIcon,
		prefixCls,
		className: collapseClassName,
		style: Object.assign(Object.assign({}, contextStyle), style),
		destroyInactivePanel: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyInactivePanel
	}), items));
});
var collapse_default$1 = Object.assign(Collapse, { Panel: CollapsePanel_default });
init_toConsumableArray();
init_es$5();
const generateColor = (color$1) => {
	if (color$1 instanceof AggregationColor) return color$1;
	return new AggregationColor(color$1);
};
const getRoundNumber = (value) => Math.round(Number(value || 0));
const getColorAlpha = (color$1) => getRoundNumber(color$1.toHsb().a * 100);
const genAlphaColor = (color$1, alpha$1) => {
	const rgba$1 = color$1.toRgb();
	if (!rgba$1.r && !rgba$1.g && !rgba$1.b) {
		const hsba = color$1.toHsb();
		hsba.a = alpha$1 || 1;
		return generateColor(hsba);
	}
	rgba$1.a = alpha$1 || 1;
	return generateColor(rgba$1);
};
const getGradientPercentColor = (colors, percent$1) => {
	const filledColors = [{
		percent: 0,
		color: colors[0].color
	}].concat(_toConsumableArray(colors), [{
		percent: 100,
		color: colors[colors.length - 1].color
	}]);
	for (let i$1 = 0; i$1 < filledColors.length - 1; i$1 += 1) {
		const startPtg = filledColors[i$1].percent;
		const endPtg = filledColors[i$1 + 1].percent;
		const startColor = filledColors[i$1].color;
		const endColor = filledColors[i$1 + 1].color;
		if (startPtg <= percent$1 && percent$1 <= endPtg) {
			const dist = endPtg - startPtg;
			if (dist === 0) return startColor;
			const ratio = (percent$1 - startPtg) / dist * 100;
			const startRcColor = new Color(startColor);
			const endRcColor = new Color(endColor);
			return startRcColor.mix(endRcColor, ratio).toRgbString();
		}
	}
	/* istanbul ignore next */
	return "";
};
init_es$5();
var import_classnames$23 = /* @__PURE__ */ __toESM(require_classnames());
init_useMergedState();
var genPresetColor$1 = (list) => list.map((value) => {
	value.colors = value.colors.map(generateColor);
	return value;
});
const isBright = (value, bgColorToken) => {
	const { r: r$1, g, b, a: a$1 } = value.toRgb();
	const hsv = new Color(value.toRgbString()).onBackground(bgColorToken).toHsv();
	if (a$1 <= .5) return hsv.v > .5;
	return r$1 * .299 + g * .587 + b * .114 > 192;
};
var genCollapsePanelKey = (preset, index) => {
	var _a;
	return `panel-${(_a = preset.key) !== null && _a !== void 0 ? _a : index}`;
};
var ColorPresets = ({ prefixCls, presets, value: color$1, onChange }) => {
	const [locale$4] = useLocale_default("ColorPicker");
	const [, token] = useToken();
	const [presetsValue] = useMergedState(genPresetColor$1(presets), {
		value: genPresetColor$1(presets),
		postState: genPresetColor$1
	});
	const colorPresetsPrefixCls = `${prefixCls}-presets`;
	const activeKeys = (0, import_react.useMemo)(() => presetsValue.reduce((acc, preset, index) => {
		const { defaultOpen = true } = preset;
		if (defaultOpen) acc.push(genCollapsePanelKey(preset, index));
		return acc;
	}, []), [presetsValue]);
	const handleClick = (colorValue) => {
		onChange === null || onChange === void 0 || onChange(colorValue);
	};
	const items = presetsValue.map((preset, index) => {
		var _a;
		return {
			key: genCollapsePanelKey(preset, index),
			label: /* @__PURE__ */ import_react.createElement("div", { className: `${colorPresetsPrefixCls}-label` }, preset === null || preset === void 0 ? void 0 : preset.label),
			children: /* @__PURE__ */ import_react.createElement("div", { className: `${colorPresetsPrefixCls}-items` }, Array.isArray(preset === null || preset === void 0 ? void 0 : preset.colors) && ((_a = preset.colors) === null || _a === void 0 ? void 0 : _a.length) > 0 ? preset.colors.map((presetColor, index$1) => /* @__PURE__ */ import_react.createElement(ColorBlock_default, {
				key: `preset-${index$1}-${presetColor.toHexString()}`,
				color: generateColor(presetColor).toRgbString(),
				prefixCls,
				className: (0, import_classnames$23.default)(`${colorPresetsPrefixCls}-color`, {
					[`${colorPresetsPrefixCls}-color-checked`]: presetColor.toHexString() === (color$1 === null || color$1 === void 0 ? void 0 : color$1.toHexString()),
					[`${colorPresetsPrefixCls}-color-bright`]: isBright(presetColor, token.colorBgElevated)
				}),
				onClick: () => handleClick(presetColor)
			})) : /* @__PURE__ */ import_react.createElement("span", { className: `${colorPresetsPrefixCls}-empty` }, locale$4.presetEmpty))
		};
	});
	return /* @__PURE__ */ import_react.createElement("div", { className: colorPresetsPrefixCls }, /* @__PURE__ */ import_react.createElement(collapse_default$1, {
		defaultActiveKey: activeKeys,
		ghost: true,
		items
	}));
};
var ColorPresets_default = ColorPresets;
init_es$2();
const prepareToken$1 = (token) => {
	const { paddingInline, onlyIconSize } = token;
	return merge(token, {
		buttonPaddingHorizontal: paddingInline,
		buttonPaddingVertical: 0,
		buttonIconOnlyFontSize: onlyIconSize
	});
};
const prepareComponentToken$6 = (token) => {
	var _a, _b, _c, _d, _e, _f;
	const contentFontSize = (_a = token.contentFontSize) !== null && _a !== void 0 ? _a : token.fontSize;
	const contentFontSizeSM = (_b = token.contentFontSizeSM) !== null && _b !== void 0 ? _b : token.fontSize;
	const contentFontSizeLG = (_c = token.contentFontSizeLG) !== null && _c !== void 0 ? _c : token.fontSizeLG;
	const contentLineHeight = (_d = token.contentLineHeight) !== null && _d !== void 0 ? _d : getLineHeight(contentFontSize);
	const contentLineHeightSM = (_e = token.contentLineHeightSM) !== null && _e !== void 0 ? _e : getLineHeight(contentFontSizeSM);
	const contentLineHeightLG = (_f = token.contentLineHeightLG) !== null && _f !== void 0 ? _f : getLineHeight(contentFontSizeLG);
	const solidTextColor = isBright(new AggregationColor(token.colorBgSolid), "#fff") ? "#000" : "#fff";
	const shadowColorTokens = PresetColors.reduce((prev, colorKey) => Object.assign(Object.assign({}, prev), { [`${colorKey}ShadowColor`]: `0 ${unit(token.controlOutlineWidth)} 0 ${getAlphaColor_default(token[`${colorKey}1`], token.colorBgContainer)}` }), {});
	return Object.assign(Object.assign({}, shadowColorTokens), {
		fontWeight: 400,
		iconGap: token.marginXS,
		defaultShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`,
		primaryShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`,
		dangerShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`,
		primaryColor: token.colorTextLightSolid,
		dangerColor: token.colorTextLightSolid,
		borderColorDisabled: token.colorBorder,
		defaultGhostColor: token.colorBgContainer,
		ghostBg: "transparent",
		defaultGhostBorderColor: token.colorBgContainer,
		paddingInline: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineLG: token.paddingContentHorizontal - token.lineWidth,
		paddingInlineSM: 8 - token.lineWidth,
		onlyIconSize: "inherit",
		onlyIconSizeSM: "inherit",
		onlyIconSizeLG: "inherit",
		groupBorderColor: token.colorPrimaryHover,
		linkHoverBg: "transparent",
		textTextColor: token.colorText,
		textTextHoverColor: token.colorText,
		textTextActiveColor: token.colorText,
		textHoverBg: token.colorFillTertiary,
		defaultColor: token.colorText,
		defaultBg: token.colorBgContainer,
		defaultBorderColor: token.colorBorder,
		defaultBorderColorDisabled: token.colorBorder,
		defaultHoverBg: token.colorBgContainer,
		defaultHoverColor: token.colorPrimaryHover,
		defaultHoverBorderColor: token.colorPrimaryHover,
		defaultActiveBg: token.colorBgContainer,
		defaultActiveColor: token.colorPrimaryActive,
		defaultActiveBorderColor: token.colorPrimaryActive,
		solidTextColor,
		contentFontSize,
		contentFontSizeSM,
		contentFontSizeLG,
		contentLineHeight,
		contentLineHeightSM,
		contentLineHeightLG,
		paddingBlock: Math.max((token.controlHeight - contentFontSize * contentLineHeight) / 2 - token.lineWidth, 0),
		paddingBlockSM: Math.max((token.controlHeightSM - contentFontSizeSM * contentLineHeightSM) / 2 - token.lineWidth, 0),
		paddingBlockLG: Math.max((token.controlHeightLG - contentFontSizeLG * contentLineHeightLG) / 2 - token.lineWidth, 0)
	});
};
init_es$2();
var genSharedButtonStyle = (token) => {
	const { componentCls, iconCls, fontWeight, opacityLoading, motionDurationSlow, motionEaseInOut, iconGap, calc } = token;
	return { [componentCls]: {
		outline: "none",
		position: "relative",
		display: "inline-flex",
		gap: iconGap,
		alignItems: "center",
		justifyContent: "center",
		fontWeight,
		whiteSpace: "nowrap",
		textAlign: "center",
		backgroundImage: "none",
		background: "transparent",
		border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
		cursor: "pointer",
		transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
		userSelect: "none",
		touchAction: "manipulation",
		color: token.colorText,
		"&:disabled > *": { pointerEvents: "none" },
		[`${componentCls}-icon > svg`]: resetIcon(),
		"> a": { color: "currentColor" },
		"&:not(:disabled)": genFocusStyle(token),
		[`&${componentCls}-two-chinese-chars::first-letter`]: { letterSpacing: "0.34em" },
		[`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
			marginInlineEnd: "-0.34em",
			letterSpacing: "0.34em"
		},
		[`&${componentCls}-icon-only`]: {
			paddingInline: 0,
			[`&${componentCls}-compact-item`]: { flex: "none" },
			[`&${componentCls}-round`]: { width: "auto" }
		},
		[`&${componentCls}-loading`]: {
			opacity: opacityLoading,
			cursor: "default"
		},
		[`${componentCls}-loading-icon`]: { transition: [
			"width",
			"opacity",
			"margin"
		].map((transition) => `${transition} ${motionDurationSlow} ${motionEaseInOut}`).join(",") },
		[`&:not(${componentCls}-icon-end)`]: { [`${componentCls}-loading-icon-motion`]: {
			"&-appear-start, &-enter-start": { marginInlineEnd: calc(iconGap).mul(-1).equal() },
			"&-appear-active, &-enter-active": { marginInlineEnd: 0 },
			"&-leave-start": { marginInlineEnd: 0 },
			"&-leave-active": { marginInlineEnd: calc(iconGap).mul(-1).equal() }
		} },
		"&-icon-end": {
			flexDirection: "row-reverse",
			[`${componentCls}-loading-icon-motion`]: {
				"&-appear-start, &-enter-start": { marginInlineStart: calc(iconGap).mul(-1).equal() },
				"&-appear-active, &-enter-active": { marginInlineStart: 0 },
				"&-leave-start": { marginInlineStart: 0 },
				"&-leave-active": { marginInlineStart: calc(iconGap).mul(-1).equal() }
			}
		}
	} };
};
var genHoverActiveButtonStyle = (btnCls, hoverStyle, activeStyle) => ({ [`&:not(:disabled):not(${btnCls}-disabled)`]: {
	"&:hover": hoverStyle,
	"&:active": activeStyle
} });
var genCircleButtonStyle = (token) => ({
	minWidth: token.controlHeight,
	paddingInlineStart: 0,
	paddingInlineEnd: 0,
	borderRadius: "50%"
});
var genRoundButtonStyle = (token) => ({
	borderRadius: token.controlHeight,
	paddingInlineStart: token.calc(token.controlHeight).div(2).equal(),
	paddingInlineEnd: token.calc(token.controlHeight).div(2).equal()
});
var genDisabledStyle = (token) => ({
	cursor: "not-allowed",
	borderColor: token.borderColorDisabled,
	color: token.colorTextDisabled,
	background: token.colorBgContainerDisabled,
	boxShadow: "none"
});
var genGhostButtonStyle = (btnCls, background, textColor, borderColor, textColorDisabled, borderColorDisabled, hoverStyle, activeStyle) => ({ [`&${btnCls}-background-ghost`]: Object.assign(Object.assign({
	color: textColor || void 0,
	background,
	borderColor: borderColor || void 0,
	boxShadow: "none"
}, genHoverActiveButtonStyle(btnCls, Object.assign({ background }, hoverStyle), Object.assign({ background }, activeStyle))), { "&:disabled": {
	cursor: "not-allowed",
	color: textColorDisabled || void 0,
	borderColor: borderColorDisabled || void 0
} }) });
var genSolidDisabledButtonStyle = (token) => ({ [`&:disabled, &${token.componentCls}-disabled`]: Object.assign({}, genDisabledStyle(token)) });
var genPureDisabledButtonStyle = (token) => ({ [`&:disabled, &${token.componentCls}-disabled`]: {
	cursor: "not-allowed",
	color: token.colorTextDisabled
} });
var genVariantButtonStyle = (token, hoverStyle, activeStyle, variant) => {
	const genDisabledButtonStyle = variant && ["link", "text"].includes(variant) ? genPureDisabledButtonStyle : genSolidDisabledButtonStyle;
	return Object.assign(Object.assign({}, genDisabledButtonStyle(token)), genHoverActiveButtonStyle(token.componentCls, hoverStyle, activeStyle));
};
var genSolidButtonStyle = (token, textColor, background, hoverStyle, activeStyle) => ({ [`&${token.componentCls}-variant-solid`]: Object.assign({
	color: textColor,
	background
}, genVariantButtonStyle(token, hoverStyle, activeStyle)) });
var genOutlinedDashedButtonStyle = (token, borderColor, background, hoverStyle, activeStyle) => ({ [`&${token.componentCls}-variant-outlined, &${token.componentCls}-variant-dashed`]: Object.assign({
	borderColor,
	background
}, genVariantButtonStyle(token, hoverStyle, activeStyle)) });
var genDashedButtonStyle = (token) => ({ [`&${token.componentCls}-variant-dashed`]: { borderStyle: "dashed" } });
var genFilledButtonStyle = (token, background, hoverStyle, activeStyle) => ({ [`&${token.componentCls}-variant-filled`]: Object.assign({
	boxShadow: "none",
	background
}, genVariantButtonStyle(token, hoverStyle, activeStyle)) });
var genTextLinkButtonStyle = (token, textColor, variant, hoverStyle, activeStyle) => ({ [`&${token.componentCls}-variant-${variant}`]: Object.assign({
	color: textColor,
	boxShadow: "none"
}, genVariantButtonStyle(token, hoverStyle, activeStyle, variant)) });
var genPresetColorStyle = (token) => {
	const { componentCls } = token;
	return PresetColors.reduce((prev, colorKey) => {
		const darkColor = token[`${colorKey}6`];
		const lightColor = token[`${colorKey}1`];
		const hoverColor = token[`${colorKey}5`];
		const lightHoverColor = token[`${colorKey}2`];
		const lightBorderColor = token[`${colorKey}3`];
		const activeColor = token[`${colorKey}7`];
		return Object.assign(Object.assign({}, prev), { [`&${componentCls}-color-${colorKey}`]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
			color: darkColor,
			boxShadow: token[`${colorKey}ShadowColor`]
		}, genSolidButtonStyle(token, token.colorTextLightSolid, darkColor, { background: hoverColor }, { background: activeColor })), genOutlinedDashedButtonStyle(token, darkColor, token.colorBgContainer, {
			color: hoverColor,
			borderColor: hoverColor,
			background: token.colorBgContainer
		}, {
			color: activeColor,
			borderColor: activeColor,
			background: token.colorBgContainer
		})), genDashedButtonStyle(token)), genFilledButtonStyle(token, lightColor, {
			color: darkColor,
			background: lightHoverColor
		}, {
			color: darkColor,
			background: lightBorderColor
		})), genTextLinkButtonStyle(token, darkColor, "link", { color: hoverColor }, { color: activeColor })), genTextLinkButtonStyle(token, darkColor, "text", {
			color: hoverColor,
			background: lightColor
		}, {
			color: activeColor,
			background: lightBorderColor
		})) });
	}, {});
};
var genDefaultButtonStyle = (token) => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
	color: token.defaultColor,
	boxShadow: token.defaultShadow
}, genSolidButtonStyle(token, token.solidTextColor, token.colorBgSolid, {
	color: token.solidTextColor,
	background: token.colorBgSolidHover
}, {
	color: token.solidTextColor,
	background: token.colorBgSolidActive
})), genDashedButtonStyle(token)), genFilledButtonStyle(token, token.colorFillTertiary, {
	color: token.defaultColor,
	background: token.colorFillSecondary
}, {
	color: token.defaultColor,
	background: token.colorFill
})), genGhostButtonStyle(token.componentCls, token.ghostBg, token.defaultGhostColor, token.defaultGhostBorderColor, token.colorTextDisabled, token.colorBorder)), genTextLinkButtonStyle(token, token.textTextColor, "link", {
	color: token.colorLinkHover,
	background: token.linkHoverBg
}, { color: token.colorLinkActive }));
var genPrimaryButtonStyle = (token) => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
	color: token.colorPrimary,
	boxShadow: token.primaryShadow
}, genOutlinedDashedButtonStyle(token, token.colorPrimary, token.colorBgContainer, {
	color: token.colorPrimaryTextHover,
	borderColor: token.colorPrimaryHover,
	background: token.colorBgContainer
}, {
	color: token.colorPrimaryTextActive,
	borderColor: token.colorPrimaryActive,
	background: token.colorBgContainer
})), genDashedButtonStyle(token)), genFilledButtonStyle(token, token.colorPrimaryBg, {
	color: token.colorPrimary,
	background: token.colorPrimaryBgHover
}, {
	color: token.colorPrimary,
	background: token.colorPrimaryBorder
})), genTextLinkButtonStyle(token, token.colorPrimaryText, "text", {
	color: token.colorPrimaryTextHover,
	background: token.colorPrimaryBg
}, {
	color: token.colorPrimaryTextActive,
	background: token.colorPrimaryBorder
})), genTextLinkButtonStyle(token, token.colorPrimaryText, "link", {
	color: token.colorPrimaryTextHover,
	background: token.linkHoverBg
}, { color: token.colorPrimaryTextActive })), genGhostButtonStyle(token.componentCls, token.ghostBg, token.colorPrimary, token.colorPrimary, token.colorTextDisabled, token.colorBorder, {
	color: token.colorPrimaryHover,
	borderColor: token.colorPrimaryHover
}, {
	color: token.colorPrimaryActive,
	borderColor: token.colorPrimaryActive
}));
var genDangerousStyle = (token) => Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
	color: token.colorError,
	boxShadow: token.dangerShadow
}, genSolidButtonStyle(token, token.dangerColor, token.colorError, { background: token.colorErrorHover }, { background: token.colorErrorActive })), genOutlinedDashedButtonStyle(token, token.colorError, token.colorBgContainer, {
	color: token.colorErrorHover,
	borderColor: token.colorErrorBorderHover
}, {
	color: token.colorErrorActive,
	borderColor: token.colorErrorActive
})), genDashedButtonStyle(token)), genFilledButtonStyle(token, token.colorErrorBg, {
	color: token.colorError,
	background: token.colorErrorBgFilledHover
}, {
	color: token.colorError,
	background: token.colorErrorBgActive
})), genTextLinkButtonStyle(token, token.colorError, "text", {
	color: token.colorErrorHover,
	background: token.colorErrorBg
}, {
	color: token.colorErrorHover,
	background: token.colorErrorBgActive
})), genTextLinkButtonStyle(token, token.colorError, "link", { color: token.colorErrorHover }, { color: token.colorErrorActive })), genGhostButtonStyle(token.componentCls, token.ghostBg, token.colorError, token.colorError, token.colorTextDisabled, token.colorBorder, {
	color: token.colorErrorHover,
	borderColor: token.colorErrorHover
}, {
	color: token.colorErrorActive,
	borderColor: token.colorErrorActive
}));
var genLinkStyle = (token) => Object.assign(Object.assign({}, genTextLinkButtonStyle(token, token.colorLink, "link", { color: token.colorLinkHover }, { color: token.colorLinkActive })), genGhostButtonStyle(token.componentCls, token.ghostBg, token.colorInfo, token.colorInfo, token.colorTextDisabled, token.colorBorder, {
	color: token.colorInfoHover,
	borderColor: token.colorInfoHover
}, {
	color: token.colorInfoActive,
	borderColor: token.colorInfoActive
}));
var genColorButtonStyle = (token) => {
	const { componentCls } = token;
	return Object.assign({
		[`${componentCls}-color-default`]: genDefaultButtonStyle(token),
		[`${componentCls}-color-primary`]: genPrimaryButtonStyle(token),
		[`${componentCls}-color-dangerous`]: genDangerousStyle(token),
		[`${componentCls}-color-link`]: genLinkStyle(token)
	}, genPresetColorStyle(token));
};
var genCompatibleButtonStyle = (token) => Object.assign(Object.assign(Object.assign(Object.assign({}, genOutlinedDashedButtonStyle(token, token.defaultBorderColor, token.defaultBg, {
	color: token.defaultHoverColor,
	borderColor: token.defaultHoverBorderColor,
	background: token.defaultHoverBg
}, {
	color: token.defaultActiveColor,
	borderColor: token.defaultActiveBorderColor,
	background: token.defaultActiveBg
})), genTextLinkButtonStyle(token, token.textTextColor, "text", {
	color: token.textTextHoverColor,
	background: token.textHoverBg
}, {
	color: token.textTextActiveColor,
	background: token.colorBgTextActive
})), genSolidButtonStyle(token, token.primaryColor, token.colorPrimary, {
	background: token.colorPrimaryHover,
	color: token.primaryColor
}, {
	background: token.colorPrimaryActive,
	color: token.primaryColor
})), genTextLinkButtonStyle(token, token.colorLink, "link", {
	color: token.colorLinkHover,
	background: token.linkHoverBg
}, { color: token.colorLinkActive }));
var genButtonStyle = (token, prefixCls = "") => {
	const { componentCls, controlHeight, fontSize, borderRadius, buttonPaddingHorizontal, iconCls, buttonPaddingVertical, buttonIconOnlyFontSize } = token;
	return [
		{ [prefixCls]: {
			fontSize,
			height: controlHeight,
			padding: `${unit(buttonPaddingVertical)} ${unit(buttonPaddingHorizontal)}`,
			borderRadius,
			[`&${componentCls}-icon-only`]: {
				width: controlHeight,
				[iconCls]: { fontSize: buttonIconOnlyFontSize }
			}
		} },
		{ [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token) },
		{ [`${componentCls}${componentCls}-round${prefixCls}`]: genRoundButtonStyle(token) }
	];
};
var genSizeBaseButtonStyle = (token) => {
	return genButtonStyle(merge(token, { fontSize: token.contentFontSize }), token.componentCls);
};
var genSizeSmallButtonStyle = (token) => {
	return genButtonStyle(merge(token, {
		controlHeight: token.controlHeightSM,
		fontSize: token.contentFontSizeSM,
		padding: token.paddingXS,
		buttonPaddingHorizontal: token.paddingInlineSM,
		buttonPaddingVertical: 0,
		borderRadius: token.borderRadiusSM,
		buttonIconOnlyFontSize: token.onlyIconSizeSM
	}), `${token.componentCls}-sm`);
};
var genSizeLargeButtonStyle = (token) => {
	return genButtonStyle(merge(token, {
		controlHeight: token.controlHeightLG,
		fontSize: token.contentFontSizeLG,
		buttonPaddingHorizontal: token.paddingInlineLG,
		buttonPaddingVertical: 0,
		borderRadius: token.borderRadiusLG,
		buttonIconOnlyFontSize: token.onlyIconSizeLG
	}), `${token.componentCls}-lg`);
};
var genBlockButtonStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: { [`&${componentCls}-block`]: { width: "100%" } } };
};
var style_default$7 = genStyleHooks("Button", (token) => {
	const buttonToken = prepareToken$1(token);
	return [
		genSharedButtonStyle(buttonToken),
		genSizeBaseButtonStyle(buttonToken),
		genSizeSmallButtonStyle(buttonToken),
		genSizeLargeButtonStyle(buttonToken),
		genBlockButtonStyle(buttonToken),
		genColorButtonStyle(buttonToken),
		genCompatibleButtonStyle(buttonToken),
		group_default(buttonToken)
	];
}, prepareComponentToken$6, { unitless: {
	fontWeight: true,
	contentLineHeight: true,
	contentLineHeightSM: true,
	contentLineHeightLG: true
} });
function compactItemBorder(token, parentCls, options, prefixCls) {
	const { focusElCls, focus, borderElCls } = options;
	const childCombinator = borderElCls ? "> *" : "";
	const hoverEffects = [
		"hover",
		focus ? "focus" : null,
		"active"
	].filter(Boolean).map((n) => `&:${n} ${childCombinator}`).join(",");
	return {
		[`&-item:not(${parentCls}-last-item)`]: { marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal() },
		[`&-item:not(${prefixCls}-status-success)`]: { zIndex: 2 },
		"&-item": Object.assign(Object.assign({ [hoverEffects]: { zIndex: 3 } }, focusElCls ? { [`&${focusElCls}`]: { zIndex: 3 } } : {}), { [`&[disabled] ${childCombinator}`]: { zIndex: 0 } })
	};
}
function compactItemBorderRadius(prefixCls, parentCls, options) {
	const { borderElCls } = options;
	const childCombinator = borderElCls ? `> ${borderElCls}` : "";
	return {
		[`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: { borderRadius: 0 },
		[`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: { [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
			borderStartEndRadius: 0,
			borderEndEndRadius: 0
		} },
		[`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: { [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
			borderStartStartRadius: 0,
			borderEndStartRadius: 0
		} }
	};
}
function genCompactItemStyle(token, options = { focus: true }) {
	const { componentCls } = token;
	const compactCls = `${componentCls}-compact`;
	return { [compactCls]: Object.assign(Object.assign({}, compactItemBorder(token, compactCls, options, componentCls)), compactItemBorderRadius(componentCls, compactCls, options)) };
}
function compactItemVerticalBorder(token, parentCls, prefixCls) {
	return {
		[`&-item:not(${parentCls}-last-item)`]: { marginBottom: token.calc(token.lineWidth).mul(-1).equal() },
		[`&-item:not(${prefixCls}-status-success)`]: { zIndex: 2 },
		"&-item": {
			"&:hover,&:focus,&:active": { zIndex: 3 },
			"&[disabled]": { zIndex: 0 }
		}
	};
}
function compactItemBorderVerticalRadius(prefixCls, parentCls) {
	return {
		[`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: { borderRadius: 0 },
		[`&-item${parentCls}-first-item:not(${parentCls}-last-item)`]: { [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
			borderEndEndRadius: 0,
			borderEndStartRadius: 0
		} },
		[`&-item${parentCls}-last-item:not(${parentCls}-first-item)`]: { [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
			borderStartStartRadius: 0,
			borderStartEndRadius: 0
		} }
	};
}
function genCompactItemVerticalStyle(token) {
	const compactCls = `${token.componentCls}-compact-vertical`;
	return { [compactCls]: Object.assign(Object.assign({}, compactItemVerticalBorder(token, compactCls, token.componentCls)), compactItemBorderVerticalRadius(token.componentCls, compactCls)) };
}
var genButtonCompactStyle = (token) => {
	const { componentCls, colorPrimaryHover, lineWidth, calc } = token;
	const insetOffset = calc(lineWidth).mul(-1).equal();
	const getCompactBorderStyle = (vertical) => {
		const selector = `${componentCls}-compact${vertical ? "-vertical" : ""}-item${componentCls}-primary:not([disabled])`;
		return { [`${selector} + ${selector}::before`]: {
			position: "absolute",
			top: vertical ? insetOffset : 0,
			insetInlineStart: vertical ? 0 : insetOffset,
			backgroundColor: colorPrimaryHover,
			content: "\"\"",
			width: vertical ? "100%" : lineWidth,
			height: vertical ? lineWidth : "100%"
		} };
	};
	return Object.assign(Object.assign({}, getCompactBorderStyle()), getCompactBorderStyle(true));
};
var compact_default = genSubStyleComponent(["Button", "compact"], (token) => {
	const buttonToken = prepareToken$1(token);
	return [
		genCompactItemStyle(buttonToken),
		genCompactItemVerticalStyle(buttonToken),
		genButtonCompactStyle(buttonToken)
	];
}, prepareComponentToken$6);
var import_classnames$22 = /* @__PURE__ */ __toESM(require_classnames());
init_omit();
init_ref();
init_useLayoutEffect();
var __rest$9 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
function getLoadingConfig(loading) {
	if (typeof loading === "object" && loading) {
		let delay$1 = loading === null || loading === void 0 ? void 0 : loading.delay;
		delay$1 = !Number.isNaN(delay$1) && typeof delay$1 === "number" ? delay$1 : 0;
		return {
			loading: delay$1 <= 0,
			delay: delay$1
		};
	}
	return {
		loading: !!loading,
		delay: 0
	};
}
var ButtonTypeMap = {
	default: ["default", "outlined"],
	primary: ["primary", "solid"],
	dashed: ["default", "dashed"],
	link: ["link", "link"],
	text: ["default", "text"]
};
var Button = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var _a, _b;
	const { loading = false, prefixCls: customizePrefixCls, color: color$1, variant, type, danger = false, shape: customizeShape, size: customizeSize, styles, disabled: customDisabled, className, rootClassName, children, icon, iconPosition = "start", ghost = false, block = false, htmlType = "button", classNames: customClassNames, style: customStyle = {}, autoInsertSpace, autoFocus } = props, rest = __rest$9(props, [
		"loading",
		"prefixCls",
		"color",
		"variant",
		"type",
		"danger",
		"shape",
		"size",
		"styles",
		"disabled",
		"className",
		"rootClassName",
		"children",
		"icon",
		"iconPosition",
		"ghost",
		"block",
		"htmlType",
		"classNames",
		"style",
		"autoInsertSpace",
		"autoFocus"
	]);
	const mergedType = type || "default";
	const { button } = import_react.useContext(ConfigContext);
	const shape = customizeShape || (button === null || button === void 0 ? void 0 : button.shape) || "default";
	const [mergedColor, mergedVariant] = (0, import_react.useMemo)(() => {
		if (color$1 && variant) return [color$1, variant];
		if (type || danger) {
			const colorVariantPair = ButtonTypeMap[mergedType] || [];
			if (danger) return ["danger", colorVariantPair[1]];
			return colorVariantPair;
		}
		if ((button === null || button === void 0 ? void 0 : button.color) && (button === null || button === void 0 ? void 0 : button.variant)) return [button.color, button.variant];
		return ["default", "outlined"];
	}, [
		type,
		color$1,
		variant,
		danger,
		button === null || button === void 0 ? void 0 : button.variant,
		button === null || button === void 0 ? void 0 : button.color
	]);
	const mergedColorText = mergedColor === "danger" ? "dangerous" : mergedColor;
	const { getPrefixCls, direction, autoInsertSpace: contextAutoInsertSpace, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("button");
	const mergedInsertSpace = (_a = autoInsertSpace !== null && autoInsertSpace !== void 0 ? autoInsertSpace : contextAutoInsertSpace) !== null && _a !== void 0 ? _a : true;
	const prefixCls = getPrefixCls("btn", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$7(prefixCls);
	const disabled = (0, import_react.useContext)(DisabledContext_default);
	const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
	const groupSize = (0, import_react.useContext)(GroupSizeContext);
	const loadingOrDelay = (0, import_react.useMemo)(() => getLoadingConfig(loading), [loading]);
	const [innerLoading, setLoading] = (0, import_react.useState)(loadingOrDelay.loading);
	const [hasTwoCNChar, setHasTwoCNChar] = (0, import_react.useState)(false);
	const buttonRef = (0, import_react.useRef)(null);
	const mergedRef = useComposeRef(ref, buttonRef);
	const needInserted = import_react.Children.count(children) === 1 && !icon && !isUnBorderedButtonVariant(mergedVariant);
	const isMountRef = (0, import_react.useRef)(true);
	import_react.useEffect(() => {
		isMountRef.current = false;
		return () => {
			isMountRef.current = true;
		};
	}, []);
	useLayoutEffect_default(() => {
		let delayTimer = null;
		if (loadingOrDelay.delay > 0) delayTimer = setTimeout(() => {
			delayTimer = null;
			setLoading(true);
		}, loadingOrDelay.delay);
		else setLoading(loadingOrDelay.loading);
		function cleanupTimer() {
			if (delayTimer) {
				clearTimeout(delayTimer);
				delayTimer = null;
			}
		}
		return cleanupTimer;
	}, [loadingOrDelay.delay, loadingOrDelay.loading]);
	(0, import_react.useEffect)(() => {
		if (!buttonRef.current || !mergedInsertSpace) return;
		const buttonText = buttonRef.current.textContent || "";
		if (needInserted && isTwoCNChar(buttonText)) {
			if (!hasTwoCNChar) setHasTwoCNChar(true);
		} else if (hasTwoCNChar) setHasTwoCNChar(false);
	});
	(0, import_react.useEffect)(() => {
		if (autoFocus && buttonRef.current) buttonRef.current.focus();
	}, []);
	const handleClick = import_react.useCallback((e$1) => {
		var _a$1;
		if (innerLoading || mergedDisabled) {
			e$1.preventDefault();
			return;
		}
		(_a$1 = props.onClick) === null || _a$1 === void 0 || _a$1.call(props, "href" in props ? e$1 : e$1);
	}, [
		props.onClick,
		innerLoading,
		mergedDisabled
	]);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const sizeClassNameMap = {
		large: "lg",
		small: "sm",
		middle: void 0
	};
	const sizeFullName = useSize_default((ctxSize) => {
		var _a$1, _b$1;
		return (_b$1 = (_a$1 = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a$1 !== void 0 ? _a$1 : groupSize) !== null && _b$1 !== void 0 ? _b$1 : ctxSize;
	});
	const sizeCls = sizeFullName ? (_b = sizeClassNameMap[sizeFullName]) !== null && _b !== void 0 ? _b : "" : "";
	const iconType = innerLoading ? "loading" : icon;
	const linkButtonRestProps = omit(rest, ["navigate"]);
	const classes = (0, import_classnames$22.default)(prefixCls, hashId, cssVarCls, {
		[`${prefixCls}-${shape}`]: shape !== "default" && shape,
		[`${prefixCls}-${mergedType}`]: mergedType,
		[`${prefixCls}-dangerous`]: danger,
		[`${prefixCls}-color-${mergedColorText}`]: mergedColorText,
		[`${prefixCls}-variant-${mergedVariant}`]: mergedVariant,
		[`${prefixCls}-${sizeCls}`]: sizeCls,
		[`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
		[`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonVariant(mergedVariant),
		[`${prefixCls}-loading`]: innerLoading,
		[`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && mergedInsertSpace && !innerLoading,
		[`${prefixCls}-block`]: block,
		[`${prefixCls}-rtl`]: direction === "rtl",
		[`${prefixCls}-icon-end`]: iconPosition === "end"
	}, compactItemClassnames, className, rootClassName, contextClassName);
	const fullStyle = Object.assign(Object.assign({}, contextStyle), customStyle);
	const iconClasses = (0, import_classnames$22.default)(customClassNames === null || customClassNames === void 0 ? void 0 : customClassNames.icon, contextClassNames.icon);
	const iconStyle = Object.assign(Object.assign({}, (styles === null || styles === void 0 ? void 0 : styles.icon) || {}), contextStyles.icon || {});
	const iconNode = icon && !innerLoading ? /* @__PURE__ */ import_react.createElement(IconWrapper_default, {
		prefixCls,
		className: iconClasses,
		style: iconStyle
	}, icon) : loading && typeof loading === "object" && loading.icon ? /* @__PURE__ */ import_react.createElement(IconWrapper_default, {
		prefixCls,
		className: iconClasses,
		style: iconStyle
	}, loading.icon) : /* @__PURE__ */ import_react.createElement(DefaultLoadingIcon_default, {
		existIcon: !!icon,
		prefixCls,
		loading: innerLoading,
		mount: isMountRef.current
	});
	const kids = children || children === 0 ? spaceChildren(children, needInserted && mergedInsertSpace) : null;
	if (linkButtonRestProps.href !== void 0) return wrapCSSVar(/* @__PURE__ */ import_react.createElement("a", Object.assign({}, linkButtonRestProps, {
		className: (0, import_classnames$22.default)(classes, { [`${prefixCls}-disabled`]: mergedDisabled }),
		href: mergedDisabled ? void 0 : linkButtonRestProps.href,
		style: fullStyle,
		onClick: handleClick,
		ref: mergedRef,
		tabIndex: mergedDisabled ? -1 : 0
	}), iconNode, kids));
	let buttonNode = /* @__PURE__ */ import_react.createElement("button", Object.assign({}, rest, {
		type: htmlType,
		className: classes,
		style: fullStyle,
		onClick: handleClick,
		disabled: mergedDisabled,
		ref: mergedRef
	}), iconNode, kids, compactItemClassnames && /* @__PURE__ */ import_react.createElement(compact_default, { prefixCls }));
	if (!isUnBorderedButtonVariant(mergedVariant)) buttonNode = /* @__PURE__ */ import_react.createElement(wave_default, {
		component: "Button",
		disabled: innerLoading
	}, buttonNode);
	return wrapCSSVar(buttonNode);
});
Button.Group = button_group_default;
Button.__ANT_BUTTON = true;
var button_default = Button;
init_es$7();
init_omit();
const FormContext = /* @__PURE__ */ import_react.createContext({
	labelAlign: "right",
	layout: "horizontal",
	itemRef: () => {}
});
const NoStyleItemContext = /* @__PURE__ */ import_react.createContext(null);
const FormProvider$1 = (props) => {
	const providerProps = omit(props, ["prefixCls"]);
	return /* @__PURE__ */ import_react.createElement(FormProvider, Object.assign({}, providerProps));
};
const FormItemPrefixContext = /* @__PURE__ */ import_react.createContext({ prefixCls: "" });
const FormItemInputContext = /* @__PURE__ */ import_react.createContext({});
const NoFormStyle = ({ children, status, override }) => {
	const formItemInputContext = import_react.useContext(FormItemInputContext);
	const newFormItemInputContext = import_react.useMemo(() => {
		const newContext = Object.assign({}, formItemInputContext);
		if (override) delete newContext.isFormItemInput;
		if (status) {
			delete newContext.status;
			delete newContext.hasFeedback;
			delete newContext.feedbackIcon;
		}
		return newContext;
	}, [
		status,
		override,
		formItemInputContext
	]);
	return /* @__PURE__ */ import_react.createElement(FormItemInputContext.Provider, { value: newFormItemInputContext }, children);
};
const VariantContext = /* @__PURE__ */ import_react.createContext(void 0);
var ContextIsolator = (props) => {
	const { space, form, children } = props;
	if (children === void 0 || children === null) return null;
	let result = children;
	if (form) result = /* @__PURE__ */ import_react.createElement(NoFormStyle, {
		override: true,
		status: true
	}, result);
	if (space) result = /* @__PURE__ */ import_react.createElement(NoCompactStyle, null, result);
	return result;
};
var ContextIsolator_default = ContextIsolator;
var import_classnames$21 = /* @__PURE__ */ __toESM(require_classnames());
var Element$1 = (props) => {
	const { prefixCls, className, style, size, shape } = props;
	const sizeCls = (0, import_classnames$21.default)({
		[`${prefixCls}-lg`]: size === "large",
		[`${prefixCls}-sm`]: size === "small"
	});
	const shapeCls = (0, import_classnames$21.default)({
		[`${prefixCls}-circle`]: shape === "circle",
		[`${prefixCls}-square`]: shape === "square",
		[`${prefixCls}-round`]: shape === "round"
	});
	const sizeStyle = import_react.useMemo(() => typeof size === "number" ? {
		width: size,
		height: size,
		lineHeight: `${size}px`
	} : {}, [size]);
	return /* @__PURE__ */ import_react.createElement("span", {
		className: (0, import_classnames$21.default)(prefixCls, sizeCls, shapeCls, className),
		style: Object.assign(Object.assign({}, sizeStyle), style)
	});
};
var Element_default = Element$1;
init_es$2();
var skeletonClsLoading = new Keyframes_default(`ant-skeleton-loading`, {
	"0%": { backgroundPosition: "100% 50%" },
	"100%": { backgroundPosition: "0 50%" }
});
var genSkeletonElementCommonSize = (size) => ({
	height: size,
	lineHeight: unit(size)
});
var genSkeletonElementAvatarSize = (size) => Object.assign({ width: size }, genSkeletonElementCommonSize(size));
var genSkeletonColor = (token) => ({
	background: token.skeletonLoadingBackground,
	backgroundSize: "400% 100%",
	animationName: skeletonClsLoading,
	animationDuration: token.skeletonLoadingMotionDuration,
	animationTimingFunction: "ease",
	animationIterationCount: "infinite"
});
var genSkeletonElementInputSize = (size, calc) => Object.assign({
	width: calc(size).mul(5).equal(),
	minWidth: calc(size).mul(5).equal()
}, genSkeletonElementCommonSize(size));
var genSkeletonElementAvatar = (token) => {
	const { skeletonAvatarCls, gradientFromColor, controlHeight, controlHeightLG, controlHeightSM } = token;
	return {
		[skeletonAvatarCls]: Object.assign({
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor
		}, genSkeletonElementAvatarSize(controlHeight)),
		[`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: { borderRadius: "50%" },
		[`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightLG)),
		[`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightSM))
	};
};
var genSkeletonElementInput = (token) => {
	const { controlHeight, borderRadiusSM, skeletonInputCls, controlHeightLG, controlHeightSM, gradientFromColor, calc } = token;
	return {
		[skeletonInputCls]: Object.assign({
			display: "inline-block",
			verticalAlign: "top",
			background: gradientFromColor,
			borderRadius: borderRadiusSM
		}, genSkeletonElementInputSize(controlHeight, calc)),
		[`${skeletonInputCls}-lg`]: Object.assign({}, genSkeletonElementInputSize(controlHeightLG, calc)),
		[`${skeletonInputCls}-sm`]: Object.assign({}, genSkeletonElementInputSize(controlHeightSM, calc))
	};
};
var genSkeletonElementImageSize = (size) => Object.assign({ width: size }, genSkeletonElementCommonSize(size));
var genSkeletonElementImage = (token) => {
	const { skeletonImageCls, imageSizeBase, gradientFromColor, borderRadiusSM, calc } = token;
	return {
		[skeletonImageCls]: Object.assign(Object.assign({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			verticalAlign: "middle",
			background: gradientFromColor,
			borderRadius: borderRadiusSM
		}, genSkeletonElementImageSize(calc(imageSizeBase).mul(2).equal())), {
			[`${skeletonImageCls}-path`]: { fill: "#bfbfbf" },
			[`${skeletonImageCls}-svg`]: Object.assign(Object.assign({}, genSkeletonElementImageSize(imageSizeBase)), {
				maxWidth: calc(imageSizeBase).mul(4).equal(),
				maxHeight: calc(imageSizeBase).mul(4).equal()
			}),
			[`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: { borderRadius: "50%" }
		}),
		[`${skeletonImageCls}${skeletonImageCls}-circle`]: { borderRadius: "50%" }
	};
};
var genSkeletonElementButtonShape = (token, size, buttonCls) => {
	const { skeletonButtonCls } = token;
	return {
		[`${buttonCls}${skeletonButtonCls}-circle`]: {
			width: size,
			minWidth: size,
			borderRadius: "50%"
		},
		[`${buttonCls}${skeletonButtonCls}-round`]: { borderRadius: size }
	};
};
var genSkeletonElementButtonSize = (size, calc) => Object.assign({
	width: calc(size).mul(2).equal(),
	minWidth: calc(size).mul(2).equal()
}, genSkeletonElementCommonSize(size));
var genSkeletonElementButton = (token) => {
	const { borderRadiusSM, skeletonButtonCls, controlHeight, controlHeightLG, controlHeightSM, gradientFromColor, calc } = token;
	return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ [skeletonButtonCls]: Object.assign({
		display: "inline-block",
		verticalAlign: "top",
		background: gradientFromColor,
		borderRadius: borderRadiusSM,
		width: calc(controlHeight).mul(2).equal(),
		minWidth: calc(controlHeight).mul(2).equal()
	}, genSkeletonElementButtonSize(controlHeight, calc)) }, genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls)), { [`${skeletonButtonCls}-lg`]: Object.assign({}, genSkeletonElementButtonSize(controlHeightLG, calc)) }), genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`)), { [`${skeletonButtonCls}-sm`]: Object.assign({}, genSkeletonElementButtonSize(controlHeightSM, calc)) }), genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`));
};
var genBaseStyle$1 = (token) => {
	const { componentCls, skeletonAvatarCls, skeletonTitleCls, skeletonParagraphCls, skeletonButtonCls, skeletonInputCls, skeletonImageCls, controlHeight, controlHeightLG, controlHeightSM, gradientFromColor, padding, marginSM, borderRadius, titleHeight, blockRadius, paragraphLiHeight, controlHeightXS, paragraphMarginTop } = token;
	return {
		[componentCls]: {
			display: "table",
			width: "100%",
			[`${componentCls}-header`]: {
				display: "table-cell",
				paddingInlineEnd: padding,
				verticalAlign: "top",
				[skeletonAvatarCls]: Object.assign({
					display: "inline-block",
					verticalAlign: "top",
					background: gradientFromColor
				}, genSkeletonElementAvatarSize(controlHeight)),
				[`${skeletonAvatarCls}-circle`]: { borderRadius: "50%" },
				[`${skeletonAvatarCls}-lg`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightLG)),
				[`${skeletonAvatarCls}-sm`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightSM))
			},
			[`${componentCls}-content`]: {
				display: "table-cell",
				width: "100%",
				verticalAlign: "top",
				[skeletonTitleCls]: {
					width: "100%",
					height: titleHeight,
					background: gradientFromColor,
					borderRadius: blockRadius,
					[`+ ${skeletonParagraphCls}`]: { marginBlockStart: controlHeightSM }
				},
				[skeletonParagraphCls]: {
					padding: 0,
					"> li": {
						width: "100%",
						height: paragraphLiHeight,
						listStyle: "none",
						background: gradientFromColor,
						borderRadius: blockRadius,
						"+ li": { marginBlockStart: controlHeightXS }
					}
				},
				[`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: { width: "61%" }
			},
			[`&-round ${componentCls}-content`]: { [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: { borderRadius } }
		},
		[`${componentCls}-with-avatar ${componentCls}-content`]: { [skeletonTitleCls]: {
			marginBlockStart: marginSM,
			[`+ ${skeletonParagraphCls}`]: { marginBlockStart: paragraphMarginTop }
		} },
		[`${componentCls}${componentCls}-element`]: Object.assign(Object.assign(Object.assign(Object.assign({
			display: "inline-block",
			width: "auto"
		}, genSkeletonElementButton(token)), genSkeletonElementAvatar(token)), genSkeletonElementInput(token)), genSkeletonElementImage(token)),
		[`${componentCls}${componentCls}-block`]: {
			width: "100%",
			[skeletonButtonCls]: { width: "100%" },
			[skeletonInputCls]: { width: "100%" }
		},
		[`${componentCls}${componentCls}-active`]: { [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonImageCls}
      `]: Object.assign({}, genSkeletonColor(token)) }
	};
};
const prepareComponentToken$5 = (token) => {
	const { colorFillContent, colorFill } = token;
	const gradientFromColor = colorFillContent;
	const gradientToColor = colorFill;
	return {
		color: gradientFromColor,
		colorGradientEnd: gradientToColor,
		gradientFromColor,
		gradientToColor,
		titleHeight: token.controlHeight / 2,
		blockRadius: token.borderRadiusSM,
		paragraphMarginTop: token.marginLG + token.marginXXS,
		paragraphLiHeight: token.controlHeight / 2
	};
};
var style_default$6 = genStyleHooks("Skeleton", (token) => {
	const { componentCls, calc } = token;
	return genBaseStyle$1(merge(token, {
		skeletonAvatarCls: `${componentCls}-avatar`,
		skeletonTitleCls: `${componentCls}-title`,
		skeletonParagraphCls: `${componentCls}-paragraph`,
		skeletonButtonCls: `${componentCls}-button`,
		skeletonInputCls: `${componentCls}-input`,
		skeletonImageCls: `${componentCls}-image`,
		imageSizeBase: calc(token.controlHeight).mul(1.5).equal(),
		borderRadius: 100,
		skeletonLoadingBackground: `linear-gradient(90deg, ${token.gradientFromColor} 25%, ${token.gradientToColor} 37%, ${token.gradientFromColor} 63%)`,
		skeletonLoadingMotionDuration: "1.4s"
	}));
}, prepareComponentToken$5, { deprecatedTokens: [["color", "gradientFromColor"], ["colorGradientEnd", "gradientToColor"]] });
var import_classnames$20 = /* @__PURE__ */ __toESM(require_classnames());
init_omit();
var SkeletonAvatar = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, active, shape = "circle", size = "default" } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$6(prefixCls);
	const otherProps = omit(props, ["prefixCls", "className"]);
	const cls = (0, import_classnames$20.default)(prefixCls, `${prefixCls}-element`, { [`${prefixCls}-active`]: active }, className, rootClassName, hashId, cssVarCls);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", { className: cls }, /* @__PURE__ */ import_react.createElement(Element_default, Object.assign({
		prefixCls: `${prefixCls}-avatar`,
		shape,
		size
	}, otherProps))));
};
var Avatar_default = SkeletonAvatar;
var import_classnames$19 = /* @__PURE__ */ __toESM(require_classnames());
init_omit();
var SkeletonButton = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, active, block = false, size = "default" } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$6(prefixCls);
	const otherProps = omit(props, ["prefixCls"]);
	const cls = (0, import_classnames$19.default)(prefixCls, `${prefixCls}-element`, {
		[`${prefixCls}-active`]: active,
		[`${prefixCls}-block`]: block
	}, className, rootClassName, hashId, cssVarCls);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", { className: cls }, /* @__PURE__ */ import_react.createElement(Element_default, Object.assign({
		prefixCls: `${prefixCls}-button`,
		size
	}, otherProps))));
};
var Button_default = SkeletonButton;
var import_classnames$18 = /* @__PURE__ */ __toESM(require_classnames());
var path = "M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z";
var SkeletonImage = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, style, active } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$6(prefixCls);
	const cls = (0, import_classnames$18.default)(prefixCls, `${prefixCls}-element`, { [`${prefixCls}-active`]: active }, className, rootClassName, hashId, cssVarCls);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", { className: cls }, /* @__PURE__ */ import_react.createElement("div", {
		className: (0, import_classnames$18.default)(`${prefixCls}-image`, className),
		style
	}, /* @__PURE__ */ import_react.createElement("svg", {
		viewBox: "0 0 1098 1024",
		xmlns: "http://www.w3.org/2000/svg",
		className: `${prefixCls}-image-svg`
	}, /* @__PURE__ */ import_react.createElement("title", null, "Image placeholder"), /* @__PURE__ */ import_react.createElement("path", {
		d: path,
		className: `${prefixCls}-image-path`
	})))));
};
var Image_default = SkeletonImage;
var import_classnames$17 = /* @__PURE__ */ __toESM(require_classnames());
init_omit();
var SkeletonInput = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, active, block, size = "default" } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$6(prefixCls);
	const otherProps = omit(props, ["prefixCls"]);
	const cls = (0, import_classnames$17.default)(prefixCls, `${prefixCls}-element`, {
		[`${prefixCls}-active`]: active,
		[`${prefixCls}-block`]: block
	}, className, rootClassName, hashId, cssVarCls);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", { className: cls }, /* @__PURE__ */ import_react.createElement(Element_default, Object.assign({
		prefixCls: `${prefixCls}-input`,
		size
	}, otherProps))));
};
var Input_default = SkeletonInput;
var import_classnames$16 = /* @__PURE__ */ __toESM(require_classnames());
var SkeletonNode = (props) => {
	const { prefixCls: customizePrefixCls, className, rootClassName, style, active, children } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$6(prefixCls);
	const cls = (0, import_classnames$16.default)(prefixCls, `${prefixCls}-element`, { [`${prefixCls}-active`]: active }, hashId, className, rootClassName, cssVarCls);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", { className: cls }, /* @__PURE__ */ import_react.createElement("div", {
		className: (0, import_classnames$16.default)(`${prefixCls}-image`, className),
		style
	}, children)));
};
var Node_default = SkeletonNode;
var import_classnames$15 = /* @__PURE__ */ __toESM(require_classnames());
var getWidth = (index, props) => {
	const { width, rows = 2 } = props;
	if (Array.isArray(width)) return width[index];
	if (rows - 1 === index) return width;
};
var Paragraph = (props) => {
	const { prefixCls, className, style, rows = 0 } = props;
	const rowList = Array.from({ length: rows }).map((_, index) => /* @__PURE__ */ import_react.createElement("li", {
		key: index,
		style: { width: getWidth(index, props) }
	}));
	return /* @__PURE__ */ import_react.createElement("ul", {
		className: (0, import_classnames$15.default)(prefixCls, className),
		style
	}, rowList);
};
var Paragraph_default = Paragraph;
var import_classnames$14 = /* @__PURE__ */ __toESM(require_classnames());
var Title = ({ prefixCls, className, width, style }) => /* @__PURE__ */ import_react.createElement("h3", {
	className: (0, import_classnames$14.default)(prefixCls, className),
	style: Object.assign({ width }, style)
});
var Title_default = Title;
var import_classnames$13 = /* @__PURE__ */ __toESM(require_classnames());
function getComponentProps(prop) {
	if (prop && typeof prop === "object") return prop;
	return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
	if (hasTitle && !hasParagraph) return {
		size: "large",
		shape: "square"
	};
	return {
		size: "large",
		shape: "circle"
	};
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
	if (!hasAvatar && hasParagraph) return { width: "38%" };
	if (hasAvatar && hasParagraph) return { width: "50%" };
	return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
	const basicProps = {};
	if (!hasAvatar || !hasTitle) basicProps.width = "61%";
	if (!hasAvatar && hasTitle) basicProps.rows = 3;
	else basicProps.rows = 2;
	return basicProps;
}
var Skeleton = (props) => {
	const { prefixCls: customizePrefixCls, loading, className, rootClassName, style, children, avatar = false, title = true, paragraph = true, active, round } = props;
	const { getPrefixCls, direction, className: contextClassName, style: contextStyle } = useComponentConfig("skeleton");
	const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$6(prefixCls);
	if (loading || !("loading" in props)) {
		const hasAvatar = !!avatar;
		const hasTitle = !!title;
		const hasParagraph = !!paragraph;
		let avatarNode;
		if (hasAvatar) {
			const avatarProps = Object.assign(Object.assign({ prefixCls: `${prefixCls}-avatar` }, getAvatarBasicProps(hasTitle, hasParagraph)), getComponentProps(avatar));
			avatarNode = /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-header` }, /* @__PURE__ */ import_react.createElement(Element_default, Object.assign({}, avatarProps)));
		}
		let contentNode;
		if (hasTitle || hasParagraph) {
			let $title;
			if (hasTitle) {
				const titleProps = Object.assign(Object.assign({ prefixCls: `${prefixCls}-title` }, getTitleBasicProps(hasAvatar, hasParagraph)), getComponentProps(title));
				$title = /* @__PURE__ */ import_react.createElement(Title_default, Object.assign({}, titleProps));
			}
			let paragraphNode;
			if (hasParagraph) {
				const paragraphProps = Object.assign(Object.assign({ prefixCls: `${prefixCls}-paragraph` }, getParagraphBasicProps(hasAvatar, hasTitle)), getComponentProps(paragraph));
				paragraphNode = /* @__PURE__ */ import_react.createElement(Paragraph_default, Object.assign({}, paragraphProps));
			}
			contentNode = /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-content` }, $title, paragraphNode);
		}
		const cls = (0, import_classnames$13.default)(prefixCls, {
			[`${prefixCls}-with-avatar`]: hasAvatar,
			[`${prefixCls}-active`]: active,
			[`${prefixCls}-rtl`]: direction === "rtl",
			[`${prefixCls}-round`]: round
		}, contextClassName, className, rootClassName, hashId, cssVarCls);
		return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", {
			className: cls,
			style: Object.assign(Object.assign({}, contextStyle), style)
		}, avatarNode, contentNode));
	}
	return children !== null && children !== void 0 ? children : null;
};
Skeleton.Button = Button_default;
Skeleton.Avatar = Avatar_default;
Skeleton.Input = Input_default;
Skeleton.Image = Image_default;
Skeleton.Node = Node_default;
var skeleton_default = Skeleton;
init_es$2();
var genGridRowStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		display: "flex",
		flexFlow: "row wrap",
		minWidth: 0,
		"&::before, &::after": { display: "flex" },
		"&-no-wrap": { flexWrap: "nowrap" },
		"&-start": { justifyContent: "flex-start" },
		"&-center": { justifyContent: "center" },
		"&-end": { justifyContent: "flex-end" },
		"&-space-between": { justifyContent: "space-between" },
		"&-space-around": { justifyContent: "space-around" },
		"&-space-evenly": { justifyContent: "space-evenly" },
		"&-top": { alignItems: "flex-start" },
		"&-middle": { alignItems: "center" },
		"&-bottom": { alignItems: "flex-end" }
	} };
};
var genGridColStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		position: "relative",
		maxWidth: "100%",
		minHeight: 1
	} };
};
var genLoopGridColumnsStyle = (token, sizeCls) => {
	const { prefixCls, componentCls, gridColumns } = token;
	const gridColumnsStyle = {};
	for (let i$1 = gridColumns; i$1 >= 0; i$1--) if (i$1 === 0) {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i$1}`] = { display: "none" };
		gridColumnsStyle[`${componentCls}-push-${i$1}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}-pull-${i$1}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i$1}`] = { insetInlineStart: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i$1}`] = { insetInlineEnd: "auto" };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i$1}`] = { marginInlineStart: 0 };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i$1}`] = { order: 0 };
	} else {
		gridColumnsStyle[`${componentCls}${sizeCls}-${i$1}`] = [{
			["--ant-display"]: "block",
			display: "block"
		}, {
			display: "var(--ant-display)",
			flex: `0 0 ${i$1 / gridColumns * 100}%`,
			maxWidth: `${i$1 / gridColumns * 100}%`
		}];
		gridColumnsStyle[`${componentCls}${sizeCls}-push-${i$1}`] = { insetInlineStart: `${i$1 / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i$1}`] = { insetInlineEnd: `${i$1 / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i$1}`] = { marginInlineStart: `${i$1 / gridColumns * 100}%` };
		gridColumnsStyle[`${componentCls}${sizeCls}-order-${i$1}`] = { order: i$1 };
	}
	gridColumnsStyle[`${componentCls}${sizeCls}-flex`] = { flex: `var(--${prefixCls}${sizeCls}-flex)` };
	return gridColumnsStyle;
};
var genGridStyle = (token, sizeCls) => genLoopGridColumnsStyle(token, sizeCls);
var genGridMediaStyle = (token, screenSize, sizeCls) => ({ [`@media (min-width: ${unit(screenSize)})`]: Object.assign({}, genGridStyle(token, sizeCls)) });
const prepareRowComponentToken = () => ({});
const prepareColComponentToken = () => ({});
const useRowStyle = genStyleHooks("Grid", genGridRowStyle, prepareRowComponentToken);
const getMediaSize = (token) => {
	return {
		xs: token.screenXSMin,
		sm: token.screenSMMin,
		md: token.screenMDMin,
		lg: token.screenLGMin,
		xl: token.screenXLMin,
		xxl: token.screenXXLMin
	};
};
const useColStyle = genStyleHooks("Grid", (token) => {
	const gridToken = merge(token, { gridColumns: 24 });
	const gridMediaSizesMap = getMediaSize(gridToken);
	delete gridMediaSizesMap.xs;
	return [
		genGridColStyle(gridToken),
		genGridStyle(gridToken, ""),
		genGridStyle(gridToken, "-xs"),
		Object.keys(gridMediaSizesMap).map((key) => genGridMediaStyle(gridToken, gridMediaSizesMap[key], `-${key}`)).reduce((pre, cur) => Object.assign(Object.assign({}, pre), cur), {})
	];
}, prepareColComponentToken);
init_toConsumableArray();
init_es$2();
function box(position) {
	return {
		position,
		inset: 0
	};
}
const genModalMaskStyle = (token) => {
	const { componentCls, antCls } = token;
	return [{ [`${componentCls}-root`]: {
		[`${componentCls}${antCls}-zoom-enter, ${componentCls}${antCls}-zoom-appear`]: {
			transform: "none",
			opacity: 0,
			animationDuration: token.motionDurationSlow,
			userSelect: "none"
		},
		[`${componentCls}${antCls}-zoom-leave ${componentCls}-content`]: { pointerEvents: "none" },
		[`${componentCls}-mask`]: Object.assign(Object.assign({}, box("fixed")), {
			zIndex: token.zIndexPopupBase,
			height: "100%",
			backgroundColor: token.colorBgMask,
			pointerEvents: "none",
			[`${componentCls}-hidden`]: { display: "none" }
		}),
		[`${componentCls}-wrap`]: Object.assign(Object.assign({}, box("fixed")), {
			zIndex: token.zIndexPopupBase,
			overflow: "auto",
			outline: 0,
			WebkitOverflowScrolling: "touch"
		})
	} }, { [`${componentCls}-root`]: initFadeMotion(token) }];
};
var genModalStyle = (token) => {
	const { componentCls } = token;
	return [
		{ [`${componentCls}-root`]: {
			[`${componentCls}-wrap-rtl`]: { direction: "rtl" },
			[`${componentCls}-centered`]: {
				textAlign: "center",
				"&::before": {
					display: "inline-block",
					width: 0,
					height: "100%",
					verticalAlign: "middle",
					content: "\"\""
				},
				[componentCls]: {
					top: 0,
					display: "inline-block",
					paddingBottom: 0,
					textAlign: "start",
					verticalAlign: "middle"
				}
			},
			[`@media (max-width: ${token.screenSMMax}px)`]: {
				[componentCls]: {
					maxWidth: "calc(100vw - 16px)",
					margin: `${unit(token.marginXS)} auto`
				},
				[`${componentCls}-centered`]: { [componentCls]: { flex: 1 } }
			}
		} },
		{ [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
			pointerEvents: "none",
			position: "relative",
			top: 100,
			width: "auto",
			maxWidth: `calc(100vw - ${unit(token.calc(token.margin).mul(2).equal())})`,
			margin: "0 auto",
			paddingBottom: token.paddingLG,
			[`${componentCls}-title`]: {
				margin: 0,
				color: token.titleColor,
				fontWeight: token.fontWeightStrong,
				fontSize: token.titleFontSize,
				lineHeight: token.titleLineHeight,
				wordWrap: "break-word"
			},
			[`${componentCls}-content`]: {
				position: "relative",
				backgroundColor: token.contentBg,
				backgroundClip: "padding-box",
				border: 0,
				borderRadius: token.borderRadiusLG,
				boxShadow: token.boxShadow,
				pointerEvents: "auto",
				padding: token.contentPadding
			},
			[`${componentCls}-close`]: Object.assign({
				position: "absolute",
				top: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
				insetInlineEnd: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
				zIndex: token.calc(token.zIndexPopupBase).add(10).equal(),
				padding: 0,
				color: token.modalCloseIconColor,
				fontWeight: token.fontWeightStrong,
				lineHeight: 1,
				textDecoration: "none",
				background: "transparent",
				borderRadius: token.borderRadiusSM,
				width: token.modalCloseBtnSize,
				height: token.modalCloseBtnSize,
				border: 0,
				outline: 0,
				cursor: "pointer",
				transition: `color ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,
				"&-x": {
					display: "flex",
					fontSize: token.fontSizeLG,
					fontStyle: "normal",
					lineHeight: unit(token.modalCloseBtnSize),
					justifyContent: "center",
					textTransform: "none",
					textRendering: "auto"
				},
				"&:disabled": { pointerEvents: "none" },
				"&:hover": {
					color: token.modalCloseIconHoverColor,
					backgroundColor: token.colorBgTextHover,
					textDecoration: "none"
				},
				"&:active": { backgroundColor: token.colorBgTextActive }
			}, genFocusStyle(token)),
			[`${componentCls}-header`]: {
				color: token.colorText,
				background: token.headerBg,
				borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`,
				marginBottom: token.headerMarginBottom,
				padding: token.headerPadding,
				borderBottom: token.headerBorderBottom
			},
			[`${componentCls}-body`]: {
				fontSize: token.fontSize,
				lineHeight: token.lineHeight,
				wordWrap: "break-word",
				padding: token.bodyPadding,
				[`${componentCls}-body-skeleton`]: {
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: `${unit(token.margin)} auto`
				}
			},
			[`${componentCls}-footer`]: {
				textAlign: "end",
				background: token.footerBg,
				marginTop: token.footerMarginTop,
				padding: token.footerPadding,
				borderTop: token.footerBorderTop,
				borderRadius: token.footerBorderRadius,
				[`> ${token.antCls}-btn + ${token.antCls}-btn`]: { marginInlineStart: token.marginXS }
			},
			[`${componentCls}-open`]: { overflow: "hidden" }
		}) },
		{ [`${componentCls}-pure-panel`]: {
			top: "auto",
			padding: 0,
			display: "flex",
			flexDirection: "column",
			[`${componentCls}-content,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
				display: "flex",
				flexDirection: "column",
				flex: "auto"
			},
			[`${componentCls}-confirm-body`]: { marginBottom: "auto" }
		} }
	];
};
var genRTLStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}-root`]: { [`${componentCls}-wrap-rtl`]: {
		direction: "rtl",
		[`${componentCls}-confirm-body`]: { direction: "rtl" }
	} } };
};
var genResponsiveWidthStyle = (token) => {
	const { componentCls } = token;
	const oriGridMediaSizesMap = getMediaSize(token);
	const gridMediaSizesMap = Object.assign({}, oriGridMediaSizesMap);
	delete gridMediaSizesMap.xs;
	const cssVarPrefix = `--${componentCls.replace(".", "")}-`;
	const responsiveStyles = Object.keys(gridMediaSizesMap).map((key) => ({ [`@media (min-width: ${unit(gridMediaSizesMap[key])})`]: { width: `var(${cssVarPrefix}${key}-width)` } }));
	return { [`${componentCls}-root`]: { [componentCls]: [].concat(_toConsumableArray(Object.keys(oriGridMediaSizesMap).map((currentKey, index) => {
		const previousKey = Object.keys(oriGridMediaSizesMap)[index - 1];
		return previousKey ? { [`${cssVarPrefix}${currentKey}-width`]: `var(${cssVarPrefix}${previousKey}-width)` } : null;
	})), [{ width: `var(${cssVarPrefix}xs-width)` }], _toConsumableArray(responsiveStyles)) } };
};
const prepareToken = (token) => {
	const headerPaddingVertical = token.padding;
	const headerFontSize = token.fontSizeHeading5;
	const headerLineHeight = token.lineHeightHeading5;
	return merge(token, {
		modalHeaderHeight: token.calc(token.calc(headerLineHeight).mul(headerFontSize).equal()).add(token.calc(headerPaddingVertical).mul(2).equal()).equal(),
		modalFooterBorderColorSplit: token.colorSplit,
		modalFooterBorderStyle: token.lineType,
		modalFooterBorderWidth: token.lineWidth,
		modalCloseIconColor: token.colorIcon,
		modalCloseIconHoverColor: token.colorIconHover,
		modalCloseBtnSize: token.controlHeight,
		modalConfirmIconSize: token.fontHeight,
		modalTitleHeight: token.calc(token.titleFontSize).mul(token.titleLineHeight).equal()
	});
};
const prepareComponentToken$4 = (token) => ({
	footerBg: "transparent",
	headerBg: token.colorBgElevated,
	titleLineHeight: token.lineHeightHeading5,
	titleFontSize: token.fontSizeHeading5,
	contentBg: token.colorBgElevated,
	titleColor: token.colorTextHeading,
	contentPadding: token.wireframe ? 0 : `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
	headerPadding: token.wireframe ? `${unit(token.padding)} ${unit(token.paddingLG)}` : 0,
	headerBorderBottom: token.wireframe ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : "none",
	headerMarginBottom: token.wireframe ? 0 : token.marginXS,
	bodyPadding: token.wireframe ? token.paddingLG : 0,
	footerPadding: token.wireframe ? `${unit(token.paddingXS)} ${unit(token.padding)}` : 0,
	footerBorderTop: token.wireframe ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : "none",
	footerBorderRadius: token.wireframe ? `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}` : 0,
	footerMarginTop: token.wireframe ? 0 : token.marginSM,
	confirmBodyPadding: token.wireframe ? `${unit(token.padding * 2)} ${unit(token.padding * 2)} ${unit(token.paddingLG)}` : 0,
	confirmIconMarginInlineEnd: token.wireframe ? token.margin : token.marginSM,
	confirmBtnsMarginTop: token.wireframe ? token.marginLG : token.marginSM
});
var style_default$5 = genStyleHooks("Modal", (token) => {
	const modalToken = prepareToken(token);
	return [
		genModalStyle(modalToken),
		genRTLStyle(modalToken),
		genModalMaskStyle(modalToken),
		initZoomMotion(modalToken, "zoom"),
		genResponsiveWidthStyle(modalToken)
	];
}, prepareComponentToken$4, { unitless: { titleLineHeight: true } });
init_useMergedState();
function withPureRenderTheme(Component$1) {
	return (props) => /* @__PURE__ */ import_react.createElement(config_provider_default, { theme: { token: {
		motion: false,
		zIndexPopupBase: 0
	} } }, /* @__PURE__ */ import_react.createElement(Component$1, Object.assign({}, props)));
}
/* istanbul ignore next */
var genPurePanel = (Component$1, alignPropName, postProps, defaultPrefixCls$1, getDropdownCls) => {
	const PurePanel$2 = (props) => {
		const { prefixCls: customizePrefixCls, style } = props;
		const holderRef = import_react.useRef(null);
		const [popupHeight, setPopupHeight] = import_react.useState(0);
		const [popupWidth, setPopupWidth] = import_react.useState(0);
		const [open, setOpen] = useMergedState(false, { value: props.open });
		const { getPrefixCls } = import_react.useContext(ConfigContext);
		const prefixCls = getPrefixCls(defaultPrefixCls$1 || "select", customizePrefixCls);
		import_react.useEffect(() => {
			setOpen(true);
			if (typeof ResizeObserver !== "undefined") {
				const resizeObserver = new ResizeObserver((entries) => {
					const element = entries[0].target;
					setPopupHeight(element.offsetHeight + 8);
					setPopupWidth(element.offsetWidth);
				});
				const interval = setInterval(() => {
					var _a;
					const dropdownCls = getDropdownCls ? `.${getDropdownCls(prefixCls)}` : `.${prefixCls}-dropdown`;
					const popup = (_a = holderRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(dropdownCls);
					if (popup) {
						clearInterval(interval);
						resizeObserver.observe(popup);
					}
				}, 10);
				return () => {
					clearInterval(interval);
					resizeObserver.disconnect();
				};
			}
		}, []);
		let mergedProps = Object.assign(Object.assign({}, props), {
			style: Object.assign(Object.assign({}, style), { margin: 0 }),
			open,
			visible: open,
			getPopupContainer: () => holderRef.current
		});
		if (postProps) mergedProps = postProps(mergedProps);
		if (alignPropName) Object.assign(mergedProps, { [alignPropName]: { overflow: {
			adjustX: false,
			adjustY: false
		} } });
		const mergedStyle = {
			paddingBottom: popupHeight,
			position: "relative",
			minWidth: popupWidth
		};
		return /* @__PURE__ */ import_react.createElement("div", {
			ref: holderRef,
			style: mergedStyle
		}, /* @__PURE__ */ import_react.createElement(Component$1, Object.assign({}, mergedProps)));
	};
	return withPureRenderTheme(PurePanel$2);
};
var PurePanel_default = genPurePanel;
const addMediaQueryListener = (mql, handler) => {
	if (typeof (mql === null || mql === void 0 ? void 0 : mql.addEventListener) !== "undefined") mql.addEventListener("change", handler);
	else if (typeof (mql === null || mql === void 0 ? void 0 : mql.addListener) !== "undefined") mql.addListener(handler);
};
const removeMediaQueryListener = (mql, handler) => {
	if (typeof (mql === null || mql === void 0 ? void 0 : mql.removeEventListener) !== "undefined") mql.removeEventListener("change", handler);
	else if (typeof (mql === null || mql === void 0 ? void 0 : mql.removeListener) !== "undefined") mql.removeListener(handler);
};
init_es$2();
function getArrowToken(token) {
	const { sizePopupArrow, borderRadiusXS, borderRadiusOuter } = token;
	const unitWidth = sizePopupArrow / 2;
	const ax = 0;
	const ay = unitWidth;
	const bx = borderRadiusOuter * 1 / Math.sqrt(2);
	const by = unitWidth - borderRadiusOuter * (1 - 1 / Math.sqrt(2));
	const cx = unitWidth - borderRadiusXS * (1 / Math.sqrt(2));
	const cy = borderRadiusOuter * (Math.sqrt(2) - 1) + borderRadiusXS * (1 / Math.sqrt(2));
	const dx = 2 * unitWidth - cx;
	const dy = cy;
	const ex = 2 * unitWidth - bx;
	const ey = by;
	const fx = 2 * unitWidth - ax;
	const fy = ay;
	const shadowWidth = unitWidth * Math.sqrt(2) + borderRadiusOuter * (Math.sqrt(2) - 2);
	const polygonOffset = borderRadiusOuter * (Math.sqrt(2) - 1);
	const arrowPolygon = `polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`;
	return {
		arrowShadowWidth: shadowWidth,
		arrowPath: `path('M ${ax} ${ay} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${borderRadiusXS} ${borderRadiusXS} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${fx} ${fy} Z')`,
		arrowPolygon
	};
}
const genRoundedArrow = (token, bgColor, boxShadow) => {
	const { sizePopupArrow, arrowPolygon, arrowPath, arrowShadowWidth, borderRadiusXS, calc } = token;
	return {
		pointerEvents: "none",
		width: sizePopupArrow,
		height: sizePopupArrow,
		overflow: "hidden",
		"&::before": {
			position: "absolute",
			bottom: 0,
			insetInlineStart: 0,
			width: sizePopupArrow,
			height: calc(sizePopupArrow).div(2).equal(),
			background: bgColor,
			clipPath: {
				_multi_value_: true,
				value: [arrowPolygon, arrowPath]
			},
			content: "\"\""
		},
		"&::after": {
			content: "\"\"",
			position: "absolute",
			width: arrowShadowWidth,
			height: arrowShadowWidth,
			bottom: 0,
			insetInline: 0,
			margin: "auto",
			borderRadius: {
				_skip_check_: true,
				value: `0 0 ${unit(borderRadiusXS)} 0`
			},
			transform: "translateY(50%) rotate(-135deg)",
			boxShadow,
			zIndex: 0,
			background: "transparent"
		}
	};
};
init_es$2();
function getArrowOffsetToken(options) {
	const { contentRadius, limitVerticalRadius } = options;
	const arrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
	return {
		arrowOffsetHorizontal: arrowOffset,
		arrowOffsetVertical: limitVerticalRadius ? 8 : arrowOffset
	};
}
function isInject(valid, code) {
	if (!valid) return {};
	return code;
}
function getArrowStyle(token, colorBg, options) {
	const { componentCls, boxShadowPopoverArrow, arrowOffsetVertical, arrowOffsetHorizontal } = token;
	const { arrowDistance = 0, arrowPlacement = {
		left: true,
		right: true,
		top: true,
		bottom: true
	} } = options || {};
	return { [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({ [`${componentCls}-arrow`]: [Object.assign(Object.assign({
		position: "absolute",
		zIndex: 1,
		display: "block"
	}, genRoundedArrow(token, colorBg, boxShadowPopoverArrow)), { "&:before": { background: colorBg } })] }, isInject(!!arrowPlacement.top, {
		[[
			`&-placement-top > ${componentCls}-arrow`,
			`&-placement-topLeft > ${componentCls}-arrow`,
			`&-placement-topRight > ${componentCls}-arrow`
		].join(",")]: {
			bottom: arrowDistance,
			transform: "translateY(100%) rotate(180deg)"
		},
		[`&-placement-top > ${componentCls}-arrow`]: {
			left: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translateX(-50%) translateY(100%) rotate(180deg)"
		},
		"&-placement-topLeft": {
			"--arrow-offset-horizontal": arrowOffsetHorizontal,
			[`> ${componentCls}-arrow`]: { left: {
				_skip_check_: true,
				value: arrowOffsetHorizontal
			} }
		},
		"&-placement-topRight": {
			"--arrow-offset-horizontal": `calc(100% - ${unit(arrowOffsetHorizontal)})`,
			[`> ${componentCls}-arrow`]: { right: {
				_skip_check_: true,
				value: arrowOffsetHorizontal
			} }
		}
	})), isInject(!!arrowPlacement.bottom, {
		[[
			`&-placement-bottom > ${componentCls}-arrow`,
			`&-placement-bottomLeft > ${componentCls}-arrow`,
			`&-placement-bottomRight > ${componentCls}-arrow`
		].join(",")]: {
			top: arrowDistance,
			transform: `translateY(-100%)`
		},
		[`&-placement-bottom > ${componentCls}-arrow`]: {
			left: {
				_skip_check_: true,
				value: "50%"
			},
			transform: `translateX(-50%) translateY(-100%)`
		},
		"&-placement-bottomLeft": {
			"--arrow-offset-horizontal": arrowOffsetHorizontal,
			[`> ${componentCls}-arrow`]: { left: {
				_skip_check_: true,
				value: arrowOffsetHorizontal
			} }
		},
		"&-placement-bottomRight": {
			"--arrow-offset-horizontal": `calc(100% - ${unit(arrowOffsetHorizontal)})`,
			[`> ${componentCls}-arrow`]: { right: {
				_skip_check_: true,
				value: arrowOffsetHorizontal
			} }
		}
	})), isInject(!!arrowPlacement.left, {
		[[
			`&-placement-left > ${componentCls}-arrow`,
			`&-placement-leftTop > ${componentCls}-arrow`,
			`&-placement-leftBottom > ${componentCls}-arrow`
		].join(",")]: {
			right: {
				_skip_check_: true,
				value: arrowDistance
			},
			transform: "translateX(100%) rotate(90deg)"
		},
		[`&-placement-left > ${componentCls}-arrow`]: {
			top: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translateY(-50%) translateX(100%) rotate(90deg)"
		},
		[`&-placement-leftTop > ${componentCls}-arrow`]: { top: arrowOffsetVertical },
		[`&-placement-leftBottom > ${componentCls}-arrow`]: { bottom: arrowOffsetVertical }
	})), isInject(!!arrowPlacement.right, {
		[[
			`&-placement-right > ${componentCls}-arrow`,
			`&-placement-rightTop > ${componentCls}-arrow`,
			`&-placement-rightBottom > ${componentCls}-arrow`
		].join(",")]: {
			left: {
				_skip_check_: true,
				value: arrowDistance
			},
			transform: "translateX(-100%) rotate(-90deg)"
		},
		[`&-placement-right > ${componentCls}-arrow`]: {
			top: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
		},
		[`&-placement-rightTop > ${componentCls}-arrow`]: { top: arrowOffsetVertical },
		[`&-placement-rightBottom > ${componentCls}-arrow`]: { bottom: arrowOffsetVertical }
	})) };
}
function getOverflowOptions(placement, arrowOffset, arrowWidth, autoAdjustOverflow) {
	if (autoAdjustOverflow === false) return {
		adjustX: false,
		adjustY: false
	};
	const overflow = autoAdjustOverflow && typeof autoAdjustOverflow === "object" ? autoAdjustOverflow : {};
	const baseOverflow = {};
	switch (placement) {
		case "top":
		case "bottom":
			baseOverflow.shiftX = arrowOffset.arrowOffsetHorizontal * 2 + arrowWidth;
			baseOverflow.shiftY = true;
			baseOverflow.adjustY = true;
			break;
		case "left":
		case "right":
			baseOverflow.shiftY = arrowOffset.arrowOffsetVertical * 2 + arrowWidth;
			baseOverflow.shiftX = true;
			baseOverflow.adjustX = true;
			break;
	}
	const mergedOverflow = Object.assign(Object.assign({}, baseOverflow), overflow);
	if (!mergedOverflow.shiftX) mergedOverflow.adjustX = true;
	if (!mergedOverflow.shiftY) mergedOverflow.adjustY = true;
	return mergedOverflow;
}
var PlacementAlignMap = {
	left: { points: ["cr", "cl"] },
	right: { points: ["cl", "cr"] },
	top: { points: ["bc", "tc"] },
	bottom: { points: ["tc", "bc"] },
	topLeft: { points: ["bl", "tl"] },
	leftTop: { points: ["tr", "tl"] },
	topRight: { points: ["br", "tr"] },
	rightTop: { points: ["tl", "tr"] },
	bottomRight: { points: ["tr", "br"] },
	rightBottom: { points: ["bl", "br"] },
	bottomLeft: { points: ["tl", "bl"] },
	leftBottom: { points: ["br", "bl"] }
};
var ArrowCenterPlacementAlignMap = {
	topLeft: { points: ["bl", "tc"] },
	leftTop: { points: ["tr", "cl"] },
	topRight: { points: ["br", "tc"] },
	rightTop: { points: ["tl", "cr"] },
	bottomRight: { points: ["tr", "bc"] },
	rightBottom: { points: ["bl", "cr"] },
	bottomLeft: { points: ["tl", "bc"] },
	leftBottom: { points: ["br", "cl"] }
};
var DisableAutoArrowList = new Set([
	"topLeft",
	"topRight",
	"bottomLeft",
	"bottomRight",
	"leftTop",
	"leftBottom",
	"rightTop",
	"rightBottom"
]);
function getPlacements(config) {
	const { arrowWidth, autoAdjustOverflow, arrowPointAtCenter, offset, borderRadius, visibleFirst } = config;
	const halfArrowWidth = arrowWidth / 2;
	const placementMap = {};
	const arrowOffset = getArrowOffsetToken({
		contentRadius: borderRadius,
		limitVerticalRadius: true
	});
	Object.keys(PlacementAlignMap).forEach((key) => {
		const template = arrowPointAtCenter && ArrowCenterPlacementAlignMap[key] || PlacementAlignMap[key];
		const placementInfo = Object.assign(Object.assign({}, template), {
			offset: [0, 0],
			dynamicInset: true
		});
		placementMap[key] = placementInfo;
		if (DisableAutoArrowList.has(key)) placementInfo.autoArrow = false;
		switch (key) {
			case "top":
			case "topLeft":
			case "topRight":
				placementInfo.offset[1] = -halfArrowWidth - offset;
				break;
			case "bottom":
			case "bottomLeft":
			case "bottomRight":
				placementInfo.offset[1] = halfArrowWidth + offset;
				break;
			case "left":
			case "leftTop":
			case "leftBottom":
				placementInfo.offset[0] = -halfArrowWidth - offset;
				break;
			case "right":
			case "rightTop":
			case "rightBottom":
				placementInfo.offset[0] = halfArrowWidth + offset;
				break;
		}
		if (arrowPointAtCenter) switch (key) {
			case "topLeft":
			case "bottomLeft":
				placementInfo.offset[0] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
				break;
			case "topRight":
			case "bottomRight":
				placementInfo.offset[0] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
				break;
			case "leftTop":
			case "rightTop":
				placementInfo.offset[1] = -arrowOffset.arrowOffsetHorizontal * 2 + halfArrowWidth;
				break;
			case "leftBottom":
			case "rightBottom":
				placementInfo.offset[1] = arrowOffset.arrowOffsetHorizontal * 2 - halfArrowWidth;
				break;
		}
		placementInfo.overflow = getOverflowOptions(key, arrowOffset, arrowWidth, autoAdjustOverflow);
		if (visibleFirst) placementInfo.htmlRegion = "visibleFirst";
	});
	return placementMap;
}
init_es$2();
var genTooltipStyle = (token) => {
	const { calc, componentCls, tooltipMaxWidth, tooltipColor, tooltipBg, tooltipBorderRadius, zIndexPopup, controlHeight, boxShadowSecondary, paddingSM, paddingXS, arrowOffsetHorizontal, sizePopupArrow } = token;
	const edgeAlignMinWidth = calc(tooltipBorderRadius).add(sizePopupArrow).add(arrowOffsetHorizontal).equal();
	const centerAlignMinWidth = calc(tooltipBorderRadius).mul(2).add(sizePopupArrow).equal();
	return [
		{ [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
			position: "absolute",
			zIndex: zIndexPopup,
			display: "block",
			width: "max-content",
			maxWidth: tooltipMaxWidth,
			visibility: "visible",
			"--valid-offset-x": "var(--arrow-offset-horizontal, var(--arrow-x))",
			transformOrigin: [`var(--valid-offset-x, 50%)`, `var(--arrow-y, 50%)`].join(" "),
			"&-hidden": { display: "none" },
			"--antd-arrow-background-color": tooltipBg,
			[`${componentCls}-inner`]: {
				minWidth: centerAlignMinWidth,
				minHeight: controlHeight,
				padding: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
				color: `var(--ant-tooltip-color,${tooltipColor})`,
				textAlign: "start",
				textDecoration: "none",
				wordWrap: "break-word",
				backgroundColor: tooltipBg,
				borderRadius: tooltipBorderRadius,
				boxShadow: boxShadowSecondary,
				boxSizing: "border-box"
			},
			[[
				`&-placement-topLeft`,
				`&-placement-topRight`,
				`&-placement-bottomLeft`,
				`&-placement-bottomRight`
			].join(",")]: { minWidth: edgeAlignMinWidth },
			[[
				`&-placement-left`,
				`&-placement-leftTop`,
				`&-placement-leftBottom`,
				`&-placement-right`,
				`&-placement-rightTop`,
				`&-placement-rightBottom`
			].join(",")]: { [`${componentCls}-inner`]: { borderRadius: token.min(tooltipBorderRadius, 8) } },
			[`${componentCls}-content`]: { position: "relative" }
		}), genPresetColor(token, (colorKey, { darkColor }) => ({ [`&${componentCls}-${colorKey}`]: {
			[`${componentCls}-inner`]: { backgroundColor: darkColor },
			[`${componentCls}-arrow`]: { "--antd-arrow-background-color": darkColor }
		} }))), { "&-rtl": { direction: "rtl" } }) },
		getArrowStyle(token, "var(--antd-arrow-background-color)"),
		{ [`${componentCls}-pure`]: {
			position: "relative",
			maxWidth: "none",
			margin: token.sizePopupArrow
		} }
	];
};
const prepareComponentToken$3 = (token) => Object.assign(Object.assign({ zIndexPopup: token.zIndexPopupBase + 70 }, getArrowOffsetToken({
	contentRadius: token.borderRadius,
	limitVerticalRadius: true
})), getArrowToken(merge(token, { borderRadiusOuter: Math.min(token.borderRadiusOuter, 4) })));
var style_default$4 = (prefixCls, injectStyle = true) => {
	return genStyleHooks("Tooltip", (token) => {
		const { borderRadius, colorTextLightSolid, colorBgSpotlight } = token;
		return [genTooltipStyle(merge(token, {
			tooltipMaxWidth: 250,
			tooltipColor: colorTextLightSolid,
			tooltipBorderRadius: borderRadius,
			tooltipBg: colorBgSpotlight
		})), initZoomMotion(token, "zoom-big-fast")];
	}, prepareComponentToken$3, {
		resetStyle: false,
		injectStyle
	})(prefixCls);
};
init_toConsumableArray();
var inverseColors = PresetColors.map((color$1) => `${color$1}-inverse`);
const PresetStatusColorTypes = [
	"success",
	"processing",
	"error",
	"default",
	"warning"
];
function isPresetColor(color$1, includeInverse = true) {
	if (includeInverse) return [].concat(_toConsumableArray(inverseColors), _toConsumableArray(PresetColors)).includes(color$1);
	return PresetColors.includes(color$1);
}
function isPresetStatusColor(color$1) {
	return PresetStatusColorTypes.includes(color$1);
}
var import_classnames$12 = /* @__PURE__ */ __toESM(require_classnames());
function parseColor(prefixCls, color$1) {
	const isInternalColor = isPresetColor(color$1);
	const className = (0, import_classnames$12.default)({ [`${prefixCls}-${color$1}`]: color$1 && isInternalColor });
	const overlayStyle = {};
	const arrowStyle = {};
	const rgb = generateColor(color$1).toRgb();
	const textColor = (.299 * rgb.r + .587 * rgb.g + .114 * rgb.b) / 255 < .5 ? "#FFF" : "#000";
	if (color$1 && !isInternalColor) {
		overlayStyle.background = color$1;
		overlayStyle["--ant-tooltip-color"] = textColor;
		arrowStyle["--antd-arrow-background-color"] = color$1;
	}
	return {
		className,
		overlayStyle,
		arrowStyle
	};
}
var import_classnames$11 = /* @__PURE__ */ __toESM(require_classnames());
init_es$8();
var PurePanel$1 = (props) => {
	const { prefixCls: customizePrefixCls, className, placement = "top", title, color: color$1, overlayInnerStyle } = props;
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$4(prefixCls);
	const colorInfo = parseColor(prefixCls, color$1);
	const arrowContentStyle = colorInfo.arrowStyle;
	const formattedOverlayInnerStyle = Object.assign(Object.assign({}, overlayInnerStyle), colorInfo.overlayStyle);
	const cls = (0, import_classnames$11.default)(hashId, cssVarCls, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className, colorInfo.className);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", {
		className: cls,
		style: arrowContentStyle
	}, /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-arrow` }), /* @__PURE__ */ import_react.createElement(Popup, Object.assign({}, props, {
		className: hashId,
		prefixCls,
		overlayInnerStyle: formattedOverlayInnerStyle
	}), title)));
};
var PurePanel_default$1 = PurePanel$1;
var import_classnames$10 = /* @__PURE__ */ __toESM(require_classnames());
init_es$8();
init_useMergedState();
var __rest$8 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
var Tooltip = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var _a, _b;
	const { prefixCls: customizePrefixCls, openClassName, getTooltipContainer, color: color$1, overlayInnerStyle, children, afterOpenChange, afterVisibleChange, destroyTooltipOnHide, destroyOnHidden, arrow = true, title, overlay, builtinPlacements, arrowPointAtCenter = false, autoAdjustOverflow = true, motion: motion$1, getPopupContainer, placement = "top", mouseEnterDelay = .1, mouseLeaveDelay = .1, overlayStyle, rootClassName, overlayClassName, styles, classNames: tooltipClassNames } = props, restProps = __rest$8(props, [
		"prefixCls",
		"openClassName",
		"getTooltipContainer",
		"color",
		"overlayInnerStyle",
		"children",
		"afterOpenChange",
		"afterVisibleChange",
		"destroyTooltipOnHide",
		"destroyOnHidden",
		"arrow",
		"title",
		"overlay",
		"builtinPlacements",
		"arrowPointAtCenter",
		"autoAdjustOverflow",
		"motion",
		"getPopupContainer",
		"placement",
		"mouseEnterDelay",
		"mouseLeaveDelay",
		"overlayStyle",
		"rootClassName",
		"overlayClassName",
		"styles",
		"classNames"
	]);
	const mergedShowArrow = !!arrow;
	const [, token] = useToken();
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("tooltip");
	const warning$1 = devUseWarning("Tooltip");
	const tooltipRef = import_react.useRef(null);
	const forceAlign = () => {
		var _a$1;
		(_a$1 = tooltipRef.current) === null || _a$1 === void 0 || _a$1.forceAlign();
	};
	import_react.useImperativeHandle(ref, () => {
		var _a$1, _b$1;
		return {
			forceAlign,
			forcePopupAlign: () => {
				warning$1.deprecated(false, "forcePopupAlign", "forceAlign");
				forceAlign();
			},
			nativeElement: (_a$1 = tooltipRef.current) === null || _a$1 === void 0 ? void 0 : _a$1.nativeElement,
			popupElement: (_b$1 = tooltipRef.current) === null || _b$1 === void 0 ? void 0 : _b$1.popupElement
		};
	});
	const [open, setOpen] = useMergedState(false, {
		value: (_a = props.open) !== null && _a !== void 0 ? _a : props.visible,
		defaultValue: (_b = props.defaultOpen) !== null && _b !== void 0 ? _b : props.defaultVisible
	});
	const noTitle = !title && !overlay && title !== 0;
	const onOpenChange = (vis) => {
		var _a$1, _b$1;
		setOpen(noTitle ? false : vis);
		if (!noTitle) {
			(_a$1 = props.onOpenChange) === null || _a$1 === void 0 || _a$1.call(props, vis);
			(_b$1 = props.onVisibleChange) === null || _b$1 === void 0 || _b$1.call(props, vis);
		}
	};
	const tooltipPlacements = import_react.useMemo(() => {
		var _a$1, _b$1;
		let mergedArrowPointAtCenter = arrowPointAtCenter;
		if (typeof arrow === "object") mergedArrowPointAtCenter = (_b$1 = (_a$1 = arrow.pointAtCenter) !== null && _a$1 !== void 0 ? _a$1 : arrow.arrowPointAtCenter) !== null && _b$1 !== void 0 ? _b$1 : arrowPointAtCenter;
		return builtinPlacements || getPlacements({
			arrowPointAtCenter: mergedArrowPointAtCenter,
			autoAdjustOverflow,
			arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
			borderRadius: token.borderRadius,
			offset: token.marginXXS,
			visibleFirst: true
		});
	}, [
		arrowPointAtCenter,
		arrow,
		builtinPlacements,
		token
	]);
	const memoOverlay = import_react.useMemo(() => {
		if (title === 0) return title;
		return overlay || title || "";
	}, [overlay, title]);
	const memoOverlayWrapper = /* @__PURE__ */ import_react.createElement(ContextIsolator_default, { space: true }, typeof memoOverlay === "function" ? memoOverlay() : memoOverlay);
	const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const injectFromPopover = props["data-popover-inject"];
	let tempOpen = open;
	if (!("open" in props) && !("visible" in props) && noTitle) tempOpen = false;
	const child = /* @__PURE__ */ import_react.isValidElement(children) && !isFragment(children) ? children : /* @__PURE__ */ import_react.createElement("span", null, children);
	const childProps = child.props;
	const childCls = !childProps.className || typeof childProps.className === "string" ? (0, import_classnames$10.default)(childProps.className, openClassName || `${prefixCls}-open`) : childProps.className;
	const [wrapCSSVar, hashId, cssVarCls] = style_default$4(prefixCls, !injectFromPopover);
	const colorInfo = parseColor(prefixCls, color$1);
	const arrowContentStyle = colorInfo.arrowStyle;
	const rootClassNames = (0, import_classnames$10.default)(overlayClassName, { [`${prefixCls}-rtl`]: direction === "rtl" }, colorInfo.className, rootClassName, hashId, cssVarCls, contextClassName, contextClassNames.root, tooltipClassNames === null || tooltipClassNames === void 0 ? void 0 : tooltipClassNames.root);
	const bodyClassNames = (0, import_classnames$10.default)(contextClassNames.body, tooltipClassNames === null || tooltipClassNames === void 0 ? void 0 : tooltipClassNames.body);
	const [zIndex, contextZIndex] = useZIndex("Tooltip", restProps.zIndex);
	const content = /* @__PURE__ */ import_react.createElement(es_default$3, Object.assign({}, restProps, {
		zIndex,
		showArrow: mergedShowArrow,
		placement,
		mouseEnterDelay,
		mouseLeaveDelay,
		prefixCls,
		classNames: {
			root: rootClassNames,
			body: bodyClassNames
		},
		styles: {
			root: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, arrowContentStyle), contextStyles.root), contextStyle), overlayStyle), styles === null || styles === void 0 ? void 0 : styles.root),
			body: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.body), overlayInnerStyle), styles === null || styles === void 0 ? void 0 : styles.body), colorInfo.overlayStyle)
		},
		getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
		ref: tooltipRef,
		builtinPlacements: tooltipPlacements,
		overlay: memoOverlayWrapper,
		visible: tempOpen,
		onVisibleChange: onOpenChange,
		afterVisibleChange: afterOpenChange !== null && afterOpenChange !== void 0 ? afterOpenChange : afterVisibleChange,
		arrowContent: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-arrow-content` }),
		motion: {
			motionName: getTransitionName(rootPrefixCls, "zoom-big-fast", props.transitionName),
			motionDeadline: 1e3
		},
		destroyTooltipOnHide: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : !!destroyTooltipOnHide
	}), tempOpen ? cloneElement(child, { className: childCls }) : child);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement(zindexContext_default.Provider, { value: contextZIndex }, content));
});
Tooltip._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default$1;
var tooltip_default = Tooltip;
var isPrimitive = (value) => typeof value !== "object" && typeof value !== "function" || value === null;
var isPrimitive_default = isPrimitive;
require_classnames();
const SiderContext = /* @__PURE__ */ import_react.createContext({});
(() => {
	let i$1 = 0;
	return (prefix = "") => {
		i$1 += 1;
		return `${prefix}${i$1}`;
	};
})();
var MenuContext_default = /* @__PURE__ */ (0, import_react.createContext)({
	prefixCls: "",
	firstLevel: true,
	inlineCollapsed: false
});
var import_classnames$8 = /* @__PURE__ */ __toESM(require_classnames());
init_es$9();
var __rest$6 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
var MenuDivider = (props) => {
	const { prefixCls: customizePrefixCls, className, dashed } = props, restProps = __rest$6(props, [
		"prefixCls",
		"className",
		"dashed"
	]);
	const { getPrefixCls } = import_react.useContext(ConfigContext);
	const classString = (0, import_classnames$8.default)({ [`${getPrefixCls("menu", customizePrefixCls)}-item-divider-dashed`]: !!dashed }, className);
	return /* @__PURE__ */ import_react.createElement(Divider, Object.assign({ className: classString }, restProps));
};
var MenuDivider_default = MenuDivider;
var import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames());
init_es$9();
init_toArray();
init_omit();
var MenuItem = (props) => {
	var _a;
	const { className, children, icon, title, danger, extra } = props;
	const { prefixCls, firstLevel, direction, disableMenuItemTitleTooltip, inlineCollapsed: isInlineCollapsed } = import_react.useContext(MenuContext_default);
	const renderItemChildren = (inlineCollapsed) => {
		const label = children === null || children === void 0 ? void 0 : children[0];
		const wrapNode = /* @__PURE__ */ import_react.createElement("span", { className: (0, import_classnames$7.default)(`${prefixCls}-title-content`, { [`${prefixCls}-title-content-with-extra`]: !!extra || extra === 0 }) }, children);
		if (!icon || /* @__PURE__ */ import_react.isValidElement(children) && children.type === "span") {
			if (children && inlineCollapsed && firstLevel && typeof label === "string") return /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-inline-collapsed-noicon` }, label.charAt(0));
		}
		return wrapNode;
	};
	const { siderCollapsed } = import_react.useContext(SiderContext);
	let tooltipTitle = title;
	if (typeof title === "undefined") tooltipTitle = firstLevel ? children : "";
	else if (title === false) tooltipTitle = "";
	const tooltipProps = { title: tooltipTitle };
	if (!siderCollapsed && !isInlineCollapsed) {
		tooltipProps.title = null;
		tooltipProps.open = false;
	}
	const childrenLength = toArray$1(children).length;
	let returnNode = /* @__PURE__ */ import_react.createElement(MenuItem_default$1, Object.assign({}, omit(props, [
		"title",
		"icon",
		"danger"
	]), {
		className: (0, import_classnames$7.default)({
			[`${prefixCls}-item-danger`]: danger,
			[`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1
		}, className),
		title: typeof title === "string" ? title : void 0
	}), cloneElement(icon, { className: (0, import_classnames$7.default)(/* @__PURE__ */ import_react.isValidElement(icon) ? (_a = icon.props) === null || _a === void 0 ? void 0 : _a.className : void 0, `${prefixCls}-item-icon`) }), renderItemChildren(isInlineCollapsed));
	if (!disableMenuItemTitleTooltip) returnNode = /* @__PURE__ */ import_react.createElement(tooltip_default, Object.assign({}, tooltipProps, {
		placement: direction === "rtl" ? "left" : "right",
		classNames: { root: `${prefixCls}-inline-collapsed-tooltip` }
	}), returnNode);
	return returnNode;
};
var MenuItem_default = MenuItem;
init_ref();
var __rest$5 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
var OverrideContext = /* @__PURE__ */ import_react.createContext(null);
const OverrideProvider = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { children } = props, restProps = __rest$5(props, ["children"]);
	const override = import_react.useContext(OverrideContext);
	const context = import_react.useMemo(() => Object.assign(Object.assign({}, override), restProps), [
		override,
		restProps.prefixCls,
		restProps.mode,
		restProps.selectable,
		restProps.rootClassName
	]);
	const canRef = supportNodeRef(children);
	const mergedRef = useComposeRef(ref, canRef ? getNodeRef(children) : null);
	return /* @__PURE__ */ import_react.createElement(OverrideContext.Provider, { value: context }, /* @__PURE__ */ import_react.createElement(ContextIsolator_default, { space: true }, canRef ? /* @__PURE__ */ import_react.cloneElement(children, { ref: mergedRef }) : children));
});
var OverrideContext_default = OverrideContext;
init_es$2();
var getHorizontalStyle = (token) => {
	const { componentCls, motionDurationSlow, horizontalLineHeight, colorSplit, lineWidth, lineType, itemPaddingInline } = token;
	return { [`${componentCls}-horizontal`]: {
		lineHeight: horizontalLineHeight,
		border: 0,
		borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
		boxShadow: "none",
		"&::after": {
			display: "block",
			clear: "both",
			height: 0,
			content: "\"\\20\""
		},
		[`${componentCls}-item, ${componentCls}-submenu`]: {
			position: "relative",
			display: "inline-block",
			verticalAlign: "bottom",
			paddingInline: itemPaddingInline
		},
		[`> ${componentCls}-item:hover,
        > ${componentCls}-item-active,
        > ${componentCls}-submenu ${componentCls}-submenu-title:hover`]: { backgroundColor: "transparent" },
		[`${componentCls}-item, ${componentCls}-submenu-title`]: { transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`].join(",") },
		[`${componentCls}-submenu-arrow`]: { display: "none" }
	} };
};
var horizontal_default = getHorizontalStyle;
init_es$2();
var getRTLStyle = ({ componentCls, menuArrowOffset, calc }) => ({
	[`${componentCls}-rtl`]: { direction: "rtl" },
	[`${componentCls}-submenu-rtl`]: { transformOrigin: "100% 0" },
	[`${componentCls}-rtl${componentCls}-vertical,
    ${componentCls}-submenu-rtl ${componentCls}-vertical`]: { [`${componentCls}-submenu-arrow`]: {
		"&::before": { transform: `rotate(-45deg) translateY(${unit(calc(menuArrowOffset).mul(-1).equal())})` },
		"&::after": { transform: `rotate(45deg) translateY(${unit(menuArrowOffset)})` }
	} }
});
var rtl_default = getRTLStyle;
init_es$2();
var accessibilityFocus = (token) => genFocusOutline(token);
var getThemeStyle = (token, themeSuffix) => {
	const { componentCls, itemColor, itemSelectedColor, subMenuItemSelectedColor, groupTitleColor, itemBg, subMenuItemBg, itemSelectedBg, activeBarHeight, activeBarWidth, activeBarBorderWidth, motionDurationSlow, motionEaseInOut, motionEaseOut, itemPaddingInline, motionDurationMid, itemHoverColor, lineType, colorSplit, itemDisabledColor, dangerItemColor, dangerItemHoverColor, dangerItemSelectedColor, dangerItemActiveBg, dangerItemSelectedBg, popupBg, itemHoverBg, itemActiveBg, menuSubMenuBg, horizontalItemSelectedColor, horizontalItemSelectedBg, horizontalItemBorderRadius, horizontalItemHoverBg } = token;
	return { [`${componentCls}-${themeSuffix}, ${componentCls}-${themeSuffix} > ${componentCls}`]: {
		color: itemColor,
		background: itemBg,
		[`&${componentCls}-root:focus-visible`]: Object.assign({}, accessibilityFocus(token)),
		[`${componentCls}-item`]: { "&-group-title, &-extra": { color: groupTitleColor } },
		[`${componentCls}-submenu-selected > ${componentCls}-submenu-title`]: { color: subMenuItemSelectedColor },
		[`${componentCls}-item, ${componentCls}-submenu-title`]: {
			color: itemColor,
			[`&:not(${componentCls}-item-disabled):focus-visible`]: Object.assign({}, accessibilityFocus(token))
		},
		[`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: { color: `${itemDisabledColor} !important` },
		[`${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: { [`&:hover, > ${componentCls}-submenu-title:hover`]: { color: itemHoverColor } },
		[`&:not(${componentCls}-horizontal)`]: {
			[`${componentCls}-item:not(${componentCls}-item-selected)`]: {
				"&:hover": { backgroundColor: itemHoverBg },
				"&:active": { backgroundColor: itemActiveBg }
			},
			[`${componentCls}-submenu-title`]: {
				"&:hover": { backgroundColor: itemHoverBg },
				"&:active": { backgroundColor: itemActiveBg }
			}
		},
		[`${componentCls}-item-danger`]: {
			color: dangerItemColor,
			[`&${componentCls}-item:hover`]: { [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: { color: dangerItemHoverColor } },
			[`&${componentCls}-item:active`]: { background: dangerItemActiveBg }
		},
		[`${componentCls}-item a`]: { "&, &:hover": { color: "inherit" } },
		[`${componentCls}-item-selected`]: {
			color: itemSelectedColor,
			[`&${componentCls}-item-danger`]: { color: dangerItemSelectedColor },
			"a, a:hover": { color: "inherit" }
		},
		[`& ${componentCls}-item-selected`]: {
			backgroundColor: itemSelectedBg,
			[`&${componentCls}-item-danger`]: { backgroundColor: dangerItemSelectedBg }
		},
		[`&${componentCls}-submenu > ${componentCls}`]: { backgroundColor: menuSubMenuBg },
		[`&${componentCls}-popup > ${componentCls}`]: { backgroundColor: popupBg },
		[`&${componentCls}-submenu-popup > ${componentCls}`]: { backgroundColor: popupBg },
		[`&${componentCls}-horizontal`]: Object.assign(Object.assign({}, themeSuffix === "dark" ? { borderBottom: 0 } : {}), { [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
			top: activeBarBorderWidth,
			marginTop: token.calc(activeBarBorderWidth).mul(-1).equal(),
			marginBottom: 0,
			borderRadius: horizontalItemBorderRadius,
			"&::after": {
				position: "absolute",
				insetInline: itemPaddingInline,
				bottom: 0,
				borderBottom: `${unit(activeBarHeight)} solid transparent`,
				transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
				content: "\"\""
			},
			"&:hover, &-active, &-open": {
				background: horizontalItemHoverBg,
				"&::after": {
					borderBottomWidth: activeBarHeight,
					borderBottomColor: horizontalItemSelectedColor
				}
			},
			"&-selected": {
				color: horizontalItemSelectedColor,
				backgroundColor: horizontalItemSelectedBg,
				"&:hover": { backgroundColor: horizontalItemSelectedBg },
				"&::after": {
					borderBottomWidth: activeBarHeight,
					borderBottomColor: horizontalItemSelectedColor
				}
			}
		} }),
		[`&${componentCls}-root`]: { [`&${componentCls}-inline, &${componentCls}-vertical`]: { borderInlineEnd: `${unit(activeBarBorderWidth)} ${lineType} ${colorSplit}` } },
		[`&${componentCls}-inline`]: {
			[`${componentCls}-sub${componentCls}-inline`]: { background: subMenuItemBg },
			[`${componentCls}-item`]: {
				position: "relative",
				"&::after": {
					position: "absolute",
					insetBlock: 0,
					insetInlineEnd: 0,
					borderInlineEnd: `${unit(activeBarWidth)} solid ${itemSelectedColor}`,
					transform: "scaleY(0.0001)",
					opacity: 0,
					transition: [`transform ${motionDurationMid} ${motionEaseOut}`, `opacity ${motionDurationMid} ${motionEaseOut}`].join(","),
					content: "\"\""
				},
				[`&${componentCls}-item-danger`]: { "&::after": { borderInlineEndColor: dangerItemSelectedColor } }
			},
			[`${componentCls}-selected, ${componentCls}-item-selected`]: { "&::after": {
				transform: "scaleY(1)",
				opacity: 1,
				transition: [`transform ${motionDurationMid} ${motionEaseInOut}`, `opacity ${motionDurationMid} ${motionEaseInOut}`].join(",")
			} }
		}
	} };
};
var theme_default = getThemeStyle;
init_es$2();
var getVerticalInlineStyle = (token) => {
	const { componentCls, itemHeight, itemMarginInline, padding, menuArrowSize, marginXS, itemMarginBlock, itemWidth, itemPaddingInline } = token;
	const paddingWithArrow = token.calc(menuArrowSize).add(padding).add(marginXS).equal();
	return {
		[`${componentCls}-item`]: {
			position: "relative",
			overflow: "hidden"
		},
		[`${componentCls}-item, ${componentCls}-submenu-title`]: {
			height: itemHeight,
			lineHeight: unit(itemHeight),
			paddingInline: itemPaddingInline,
			overflow: "hidden",
			textOverflow: "ellipsis",
			marginInline: itemMarginInline,
			marginBlock: itemMarginBlock,
			width: itemWidth
		},
		[`> ${componentCls}-item,
            > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
			height: itemHeight,
			lineHeight: unit(itemHeight)
		},
		[`${componentCls}-item-group-list ${componentCls}-submenu-title,
            ${componentCls}-submenu-title`]: { paddingInlineEnd: paddingWithArrow }
	};
};
var getVerticalStyle = (token) => {
	const { componentCls, iconCls, itemHeight, colorTextLightSolid, dropdownWidth, controlHeightLG, motionEaseOut, paddingXL, itemMarginInline, fontSizeLG, motionDurationFast, motionDurationSlow, paddingXS, boxShadowSecondary, collapsedWidth, collapsedIconSize } = token;
	const inlineItemStyle = {
		height: itemHeight,
		lineHeight: unit(itemHeight),
		listStylePosition: "inside",
		listStyleType: "disc"
	};
	return [
		{
			[componentCls]: { "&-inline, &-vertical": Object.assign({ [`&${componentCls}-root`]: { boxShadow: "none" } }, getVerticalInlineStyle(token)) },
			[`${componentCls}-submenu-popup`]: { [`${componentCls}-vertical`]: Object.assign(Object.assign({}, getVerticalInlineStyle(token)), { boxShadow: boxShadowSecondary }) }
		},
		{ [`${componentCls}-submenu-popup ${componentCls}-vertical${componentCls}-sub`]: {
			minWidth: dropdownWidth,
			maxHeight: `calc(100vh - ${unit(token.calc(controlHeightLG).mul(2.5).equal())})`,
			padding: "0",
			overflow: "hidden",
			borderInlineEnd: 0,
			"&:not([class*='-active'])": {
				overflowX: "hidden",
				overflowY: "auto"
			}
		} },
		{ [`${componentCls}-inline`]: {
			width: "100%",
			[`&${componentCls}-root`]: { [`${componentCls}-item, ${componentCls}-submenu-title`]: {
				display: "flex",
				alignItems: "center",
				transition: [
					`border-color ${motionDurationSlow}`,
					`background ${motionDurationSlow}`,
					`padding ${motionDurationFast} ${motionEaseOut}`
				].join(","),
				[`> ${componentCls}-title-content`]: {
					flex: "auto",
					minWidth: 0,
					overflow: "hidden",
					textOverflow: "ellipsis"
				},
				"> *": { flex: "none" }
			} },
			[`${componentCls}-sub${componentCls}-inline`]: {
				padding: 0,
				border: 0,
				borderRadius: 0,
				boxShadow: "none",
				[`& > ${componentCls}-submenu > ${componentCls}-submenu-title`]: inlineItemStyle,
				[`& ${componentCls}-item-group-title`]: { paddingInlineStart: paddingXL }
			},
			[`${componentCls}-item`]: inlineItemStyle
		} },
		{ [`${componentCls}-inline-collapsed`]: {
			width: collapsedWidth,
			[`&${componentCls}-root`]: { [`${componentCls}-item, ${componentCls}-submenu ${componentCls}-submenu-title`]: { [`> ${componentCls}-inline-collapsed-noicon`]: {
				fontSize: fontSizeLG,
				textAlign: "center"
			} } },
			[`> ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-submenu > ${componentCls}-submenu-title,
          > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
				insetInlineStart: 0,
				paddingInline: `calc(50% - ${unit(token.calc(collapsedIconSize).div(2).equal())} - ${unit(itemMarginInline)})`,
				textOverflow: "clip",
				[`
            ${componentCls}-submenu-arrow,
            ${componentCls}-submenu-expand-icon
          `]: { opacity: 0 },
				[`${componentCls}-item-icon, ${iconCls}`]: {
					margin: 0,
					fontSize: collapsedIconSize,
					lineHeight: unit(itemHeight),
					"+ span": {
						display: "inline-block",
						opacity: 0
					}
				}
			},
			[`${componentCls}-item-icon, ${iconCls}`]: { display: "inline-block" },
			"&-tooltip": {
				pointerEvents: "none",
				[`${componentCls}-item-icon, ${iconCls}`]: { display: "none" },
				"a, a:hover": { color: colorTextLightSolid }
			},
			[`${componentCls}-item-group-title`]: Object.assign(Object.assign({}, textEllipsis), { paddingInline: paddingXS })
		} }
	];
};
var vertical_default = getVerticalStyle;
init_es$2();
init_es();
var genMenuItemStyle = (token) => {
	const { componentCls, motionDurationSlow, motionDurationMid, motionEaseInOut, motionEaseOut, iconCls, iconSize, iconMarginInlineEnd } = token;
	return {
		[`${componentCls}-item, ${componentCls}-submenu-title`]: {
			position: "relative",
			display: "block",
			margin: 0,
			whiteSpace: "nowrap",
			cursor: "pointer",
			transition: [
				`border-color ${motionDurationSlow}`,
				`background ${motionDurationSlow}`,
				`padding calc(${motionDurationSlow} + 0.1s) ${motionEaseInOut}`
			].join(","),
			[`${componentCls}-item-icon, ${iconCls}`]: {
				minWidth: iconSize,
				fontSize: iconSize,
				transition: [
					`font-size ${motionDurationMid} ${motionEaseOut}`,
					`margin ${motionDurationSlow} ${motionEaseInOut}`,
					`color ${motionDurationSlow}`
				].join(","),
				"+ span": {
					marginInlineStart: iconMarginInlineEnd,
					opacity: 1,
					transition: [
						`opacity ${motionDurationSlow} ${motionEaseInOut}`,
						`margin ${motionDurationSlow}`,
						`color ${motionDurationSlow}`
					].join(",")
				}
			},
			[`${componentCls}-item-icon`]: Object.assign({}, resetIcon()),
			[`&${componentCls}-item-only-child`]: { [`> ${iconCls}, > ${componentCls}-item-icon`]: { marginInlineEnd: 0 } }
		},
		[`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
			background: "none !important",
			cursor: "not-allowed",
			"&::after": { borderColor: "transparent !important" },
			a: {
				color: "inherit !important",
				cursor: "not-allowed",
				pointerEvents: "none"
			},
			[`> ${componentCls}-submenu-title`]: {
				color: "inherit !important",
				cursor: "not-allowed"
			}
		}
	};
};
var genSubMenuArrowStyle = (token) => {
	const { componentCls, motionDurationSlow, motionEaseInOut, borderRadius, menuArrowSize, menuArrowOffset } = token;
	return { [`${componentCls}-submenu`]: {
		"&-expand-icon, &-arrow": {
			position: "absolute",
			top: "50%",
			insetInlineEnd: token.margin,
			width: menuArrowSize,
			color: "currentcolor",
			transform: "translateY(-50%)",
			transition: `transform ${motionDurationSlow} ${motionEaseInOut}, opacity ${motionDurationSlow}`
		},
		"&-arrow": {
			"&::before, &::after": {
				position: "absolute",
				width: token.calc(menuArrowSize).mul(.6).equal(),
				height: token.calc(menuArrowSize).mul(.15).equal(),
				backgroundColor: "currentcolor",
				borderRadius,
				transition: [
					`background ${motionDurationSlow} ${motionEaseInOut}`,
					`transform ${motionDurationSlow} ${motionEaseInOut}`,
					`top ${motionDurationSlow} ${motionEaseInOut}`,
					`color ${motionDurationSlow} ${motionEaseInOut}`
				].join(","),
				content: "\"\""
			},
			"&::before": { transform: `rotate(45deg) translateY(${unit(token.calc(menuArrowOffset).mul(-1).equal())})` },
			"&::after": { transform: `rotate(-45deg) translateY(${unit(menuArrowOffset)})` }
		}
	} };
};
var getBaseStyle = (token) => {
	const { antCls, componentCls, fontSize, motionDurationSlow, motionDurationMid, motionEaseInOut, paddingXS, padding, colorSplit, lineWidth, zIndexPopup, borderRadiusLG, subMenuItemBorderRadius, menuArrowSize, menuArrowOffset, lineType, groupTitleLineHeight, groupTitleFontSize } = token;
	return [
		{
			"": { [componentCls]: Object.assign(Object.assign({}, clearFix()), { "&-hidden": { display: "none" } }) },
			[`${componentCls}-submenu-hidden`]: { display: "none" }
		},
		{ [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), clearFix()), {
			marginBottom: 0,
			paddingInlineStart: 0,
			fontSize,
			lineHeight: 0,
			listStyle: "none",
			outline: "none",
			transition: `width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
			"ul, ol": {
				margin: 0,
				padding: 0,
				listStyle: "none"
			},
			"&-overflow": {
				display: "flex",
				[`${componentCls}-item`]: { flex: "none" }
			},
			[`${componentCls}-item, ${componentCls}-submenu, ${componentCls}-submenu-title`]: { borderRadius: token.itemBorderRadius },
			[`${componentCls}-item-group-title`]: {
				padding: `${unit(paddingXS)} ${unit(padding)}`,
				fontSize: groupTitleFontSize,
				lineHeight: groupTitleLineHeight,
				transition: `all ${motionDurationSlow}`
			},
			[`&-horizontal ${componentCls}-submenu`]: { transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`].join(",") },
			[`${componentCls}-submenu, ${componentCls}-submenu-inline`]: { transition: [
				`border-color ${motionDurationSlow} ${motionEaseInOut}`,
				`background ${motionDurationSlow} ${motionEaseInOut}`,
				`padding ${motionDurationMid} ${motionEaseInOut}`
			].join(",") },
			[`${componentCls}-submenu ${componentCls}-sub`]: {
				cursor: "initial",
				transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationSlow} ${motionEaseInOut}`].join(",")
			},
			[`${componentCls}-title-content`]: {
				transition: `color ${motionDurationSlow}`,
				"&-with-extra": {
					display: "inline-flex",
					alignItems: "center",
					width: "100%"
				},
				[`> ${antCls}-typography-ellipsis-single-line`]: {
					display: "inline",
					verticalAlign: "unset"
				},
				[`${componentCls}-item-extra`]: {
					marginInlineStart: "auto",
					paddingInlineStart: token.padding
				}
			},
			[`${componentCls}-item a`]: { "&::before": {
				position: "absolute",
				inset: 0,
				backgroundColor: "transparent",
				content: "\"\""
			} },
			[`${componentCls}-item-divider`]: {
				overflow: "hidden",
				lineHeight: 0,
				borderColor: colorSplit,
				borderStyle: lineType,
				borderWidth: 0,
				borderTopWidth: lineWidth,
				marginBlock: lineWidth,
				padding: 0,
				"&-dashed": { borderStyle: "dashed" }
			}
		}), genMenuItemStyle(token)), {
			[`${componentCls}-item-group`]: { [`${componentCls}-item-group-list`]: {
				margin: 0,
				padding: 0,
				[`${componentCls}-item, ${componentCls}-submenu-title`]: { paddingInline: `${unit(token.calc(fontSize).mul(2).equal())} ${unit(padding)}` }
			} },
			"&-submenu": {
				"&-popup": {
					position: "absolute",
					zIndex: zIndexPopup,
					borderRadius: borderRadiusLG,
					boxShadow: "none",
					transformOrigin: "0 0",
					[`&${componentCls}-submenu`]: { background: "transparent" },
					"&::before": {
						position: "absolute",
						inset: 0,
						zIndex: -1,
						width: "100%",
						height: "100%",
						opacity: 0,
						content: "\"\""
					},
					[`> ${componentCls}`]: Object.assign(Object.assign(Object.assign({ borderRadius: borderRadiusLG }, genMenuItemStyle(token)), genSubMenuArrowStyle(token)), {
						[`${componentCls}-item, ${componentCls}-submenu > ${componentCls}-submenu-title`]: { borderRadius: subMenuItemBorderRadius },
						[`${componentCls}-submenu-title::after`]: { transition: `transform ${motionDurationSlow} ${motionEaseInOut}` }
					})
				},
				[`
          &-placement-leftTop,
          &-placement-bottomRight,
          `]: { transformOrigin: "100% 0" },
				[`
          &-placement-leftBottom,
          &-placement-topRight,
          `]: { transformOrigin: "100% 100%" },
				[`
          &-placement-rightBottom,
          &-placement-topLeft,
          `]: { transformOrigin: "0 100%" },
				[`
          &-placement-bottomLeft,
          &-placement-rightTop,
          `]: { transformOrigin: "0 0" },
				[`
          &-placement-leftTop,
          &-placement-leftBottom
          `]: { paddingInlineEnd: token.paddingXS },
				[`
          &-placement-rightTop,
          &-placement-rightBottom
          `]: { paddingInlineStart: token.paddingXS },
				[`
          &-placement-topRight,
          &-placement-topLeft
          `]: { paddingBottom: token.paddingXS },
				[`
          &-placement-bottomRight,
          &-placement-bottomLeft
          `]: { paddingTop: token.paddingXS }
			}
		}), genSubMenuArrowStyle(token)), {
			[`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
				"&::before": { transform: `rotate(-45deg) translateX(${unit(menuArrowOffset)})` },
				"&::after": { transform: `rotate(45deg) translateX(${unit(token.calc(menuArrowOffset).mul(-1).equal())})` }
			},
			[`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]: {
				transform: `translateY(${unit(token.calc(menuArrowSize).mul(.2).mul(-1).equal())})`,
				"&::after": { transform: `rotate(-45deg) translateX(${unit(token.calc(menuArrowOffset).mul(-1).equal())})` },
				"&::before": { transform: `rotate(45deg) translateX(${unit(menuArrowOffset)})` }
			}
		}) },
		{ [`${antCls}-layout-header`]: { [componentCls]: { lineHeight: "inherit" } } }
	];
};
const prepareComponentToken$2 = (token) => {
	var _a, _b, _c;
	const { colorPrimary, colorError, colorTextDisabled, colorErrorBg, colorText, colorTextDescription, colorBgContainer, colorFillAlter, colorFillContent, lineWidth, lineWidthBold, controlItemBgActive, colorBgTextHover, controlHeightLG, lineHeight, colorBgElevated, marginXXS, padding, fontSize, controlHeightSM, fontSizeLG, colorTextLightSolid, colorErrorHover } = token;
	const activeBarWidth = (_a = token.activeBarWidth) !== null && _a !== void 0 ? _a : 0;
	const activeBarBorderWidth = (_b = token.activeBarBorderWidth) !== null && _b !== void 0 ? _b : lineWidth;
	const itemMarginInline = (_c = token.itemMarginInline) !== null && _c !== void 0 ? _c : token.marginXXS;
	const colorTextDark = new FastColor(colorTextLightSolid).setA(.65).toRgbString();
	return {
		dropdownWidth: 160,
		zIndexPopup: token.zIndexPopupBase + 50,
		radiusItem: token.borderRadiusLG,
		itemBorderRadius: token.borderRadiusLG,
		radiusSubMenuItem: token.borderRadiusSM,
		subMenuItemBorderRadius: token.borderRadiusSM,
		colorItemText: colorText,
		itemColor: colorText,
		colorItemTextHover: colorText,
		itemHoverColor: colorText,
		colorItemTextHoverHorizontal: colorPrimary,
		horizontalItemHoverColor: colorPrimary,
		colorGroupTitle: colorTextDescription,
		groupTitleColor: colorTextDescription,
		colorItemTextSelected: colorPrimary,
		itemSelectedColor: colorPrimary,
		subMenuItemSelectedColor: colorPrimary,
		colorItemTextSelectedHorizontal: colorPrimary,
		horizontalItemSelectedColor: colorPrimary,
		colorItemBg: colorBgContainer,
		itemBg: colorBgContainer,
		colorItemBgHover: colorBgTextHover,
		itemHoverBg: colorBgTextHover,
		colorItemBgActive: colorFillContent,
		itemActiveBg: controlItemBgActive,
		colorSubItemBg: colorFillAlter,
		subMenuItemBg: colorFillAlter,
		colorItemBgSelected: controlItemBgActive,
		itemSelectedBg: controlItemBgActive,
		colorItemBgSelectedHorizontal: "transparent",
		horizontalItemSelectedBg: "transparent",
		colorActiveBarWidth: 0,
		activeBarWidth,
		colorActiveBarHeight: lineWidthBold,
		activeBarHeight: lineWidthBold,
		colorActiveBarBorderSize: lineWidth,
		activeBarBorderWidth,
		colorItemTextDisabled: colorTextDisabled,
		itemDisabledColor: colorTextDisabled,
		colorDangerItemText: colorError,
		dangerItemColor: colorError,
		colorDangerItemTextHover: colorError,
		dangerItemHoverColor: colorError,
		colorDangerItemTextSelected: colorError,
		dangerItemSelectedColor: colorError,
		colorDangerItemBgActive: colorErrorBg,
		dangerItemActiveBg: colorErrorBg,
		colorDangerItemBgSelected: colorErrorBg,
		dangerItemSelectedBg: colorErrorBg,
		itemMarginInline,
		horizontalItemBorderRadius: 0,
		horizontalItemHoverBg: "transparent",
		itemHeight: controlHeightLG,
		groupTitleLineHeight: lineHeight,
		collapsedWidth: controlHeightLG * 2,
		popupBg: colorBgElevated,
		itemMarginBlock: marginXXS,
		itemPaddingInline: padding,
		horizontalLineHeight: `${controlHeightLG * 1.15}px`,
		iconSize: fontSize,
		iconMarginInlineEnd: controlHeightSM - fontSize,
		collapsedIconSize: fontSizeLG,
		groupTitleFontSize: fontSize,
		darkItemDisabledColor: new FastColor(colorTextLightSolid).setA(.25).toRgbString(),
		darkItemColor: colorTextDark,
		darkDangerItemColor: colorError,
		darkItemBg: "#001529",
		darkPopupBg: "#001529",
		darkSubMenuItemBg: "#000c17",
		darkItemSelectedColor: colorTextLightSolid,
		darkItemSelectedBg: colorPrimary,
		darkDangerItemSelectedBg: colorError,
		darkItemHoverBg: "transparent",
		darkGroupTitleColor: colorTextDark,
		darkItemHoverColor: colorTextLightSolid,
		darkDangerItemHoverColor: colorErrorHover,
		darkDangerItemSelectedColor: colorTextLightSolid,
		darkDangerItemActiveBg: colorError,
		itemWidth: activeBarWidth ? `calc(100% + ${activeBarBorderWidth}px)` : `calc(100% - ${itemMarginInline * 2}px)`
	};
};
var style_default$3 = (prefixCls, rootCls = prefixCls, injectStyle = true) => {
	return genStyleHooks("Menu", (token) => {
		const { colorBgElevated, controlHeightLG, fontSize, darkItemColor, darkDangerItemColor, darkItemBg, darkSubMenuItemBg, darkItemSelectedColor, darkItemSelectedBg, darkDangerItemSelectedBg, darkItemHoverBg, darkGroupTitleColor, darkItemHoverColor, darkItemDisabledColor, darkDangerItemHoverColor, darkDangerItemSelectedColor, darkDangerItemActiveBg, popupBg, darkPopupBg } = token;
		const menuArrowSize = token.calc(fontSize).div(7).mul(5).equal();
		const menuToken = merge(token, {
			menuArrowSize,
			menuHorizontalHeight: token.calc(controlHeightLG).mul(1.15).equal(),
			menuArrowOffset: token.calc(menuArrowSize).mul(.25).equal(),
			menuSubMenuBg: colorBgElevated,
			calc: token.calc,
			popupBg
		});
		const menuDarkToken = merge(menuToken, {
			itemColor: darkItemColor,
			itemHoverColor: darkItemHoverColor,
			groupTitleColor: darkGroupTitleColor,
			itemSelectedColor: darkItemSelectedColor,
			subMenuItemSelectedColor: darkItemSelectedColor,
			itemBg: darkItemBg,
			popupBg: darkPopupBg,
			subMenuItemBg: darkSubMenuItemBg,
			itemActiveBg: "transparent",
			itemSelectedBg: darkItemSelectedBg,
			activeBarHeight: 0,
			activeBarBorderWidth: 0,
			itemHoverBg: darkItemHoverBg,
			itemDisabledColor: darkItemDisabledColor,
			dangerItemColor: darkDangerItemColor,
			dangerItemHoverColor: darkDangerItemHoverColor,
			dangerItemSelectedColor: darkDangerItemSelectedColor,
			dangerItemActiveBg: darkDangerItemActiveBg,
			dangerItemSelectedBg: darkDangerItemSelectedBg,
			menuSubMenuBg: darkSubMenuItemBg,
			horizontalItemSelectedColor: darkItemSelectedColor,
			horizontalItemSelectedBg: darkItemSelectedBg
		});
		return [
			getBaseStyle(menuToken),
			horizontal_default(menuToken),
			vertical_default(menuToken),
			theme_default(menuToken, "light"),
			theme_default(menuDarkToken, "dark"),
			rtl_default(menuToken),
			collapse_default(menuToken),
			initSlideMotion(menuToken, "slide-up"),
			initSlideMotion(menuToken, "slide-down"),
			initZoomMotion(menuToken, "zoom-big")
		];
	}, prepareComponentToken$2, {
		deprecatedTokens: [
			["colorGroupTitle", "groupTitleColor"],
			["radiusItem", "itemBorderRadius"],
			["radiusSubMenuItem", "subMenuItemBorderRadius"],
			["colorItemText", "itemColor"],
			["colorItemTextHover", "itemHoverColor"],
			["colorItemTextHoverHorizontal", "horizontalItemHoverColor"],
			["colorItemTextSelected", "itemSelectedColor"],
			["colorItemTextSelectedHorizontal", "horizontalItemSelectedColor"],
			["colorItemTextDisabled", "itemDisabledColor"],
			["colorDangerItemText", "dangerItemColor"],
			["colorDangerItemTextHover", "dangerItemHoverColor"],
			["colorDangerItemTextSelected", "dangerItemSelectedColor"],
			["colorDangerItemBgActive", "dangerItemActiveBg"],
			["colorDangerItemBgSelected", "dangerItemSelectedBg"],
			["colorItemBg", "itemBg"],
			["colorItemBgHover", "itemHoverBg"],
			["colorSubItemBg", "subMenuItemBg"],
			["colorItemBgActive", "itemActiveBg"],
			["colorItemBgSelectedHorizontal", "horizontalItemSelectedBg"],
			["colorActiveBarWidth", "activeBarWidth"],
			["colorActiveBarHeight", "activeBarHeight"],
			["colorActiveBarBorderSize", "activeBarBorderWidth"],
			["colorItemBgSelected", "itemSelectedBg"]
		],
		injectStyle,
		unitless: { groupTitleLineHeight: true }
	})(prefixCls, rootCls);
};
var import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames());
init_es$9();
init_omit();
var SubMenu = (props) => {
	var _a;
	const { popupClassName, icon, title, theme: customTheme } = props;
	const context = import_react.useContext(MenuContext_default);
	const { prefixCls, inlineCollapsed, theme: contextTheme } = context;
	const parentPath = useFullPath();
	let titleNode;
	if (!icon) titleNode = inlineCollapsed && !parentPath.length && title && typeof title === "string" ? /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-inline-collapsed-noicon` }, title.charAt(0)) : /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-title-content` }, title);
	else {
		const titleIsSpan = /* @__PURE__ */ import_react.isValidElement(title) && title.type === "span";
		titleNode = /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, cloneElement(icon, { className: (0, import_classnames$6.default)(/* @__PURE__ */ import_react.isValidElement(icon) ? (_a = icon.props) === null || _a === void 0 ? void 0 : _a.className : void 0, `${prefixCls}-item-icon`) }), titleIsSpan ? title : /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-title-content` }, title));
	}
	const contextValue = import_react.useMemo(() => Object.assign(Object.assign({}, context), { firstLevel: false }), [context]);
	const [zIndex] = useZIndex("Menu");
	return /* @__PURE__ */ import_react.createElement(MenuContext_default.Provider, { value: contextValue }, /* @__PURE__ */ import_react.createElement(SubMenu_default$1, Object.assign({}, omit(props, ["icon"]), {
		title: titleNode,
		popupClassName: (0, import_classnames$6.default)(prefixCls, popupClassName, `${prefixCls}-${customTheme || contextTheme}`),
		popupStyle: Object.assign({ zIndex }, props.popupStyle)
	})));
};
var SubMenu_default = SubMenu;
init_EllipsisOutlined();
var import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames());
init_es$9();
init_useEvent();
init_omit();
var __rest$4 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
function isEmptyIcon(icon) {
	return icon === null || icon === false;
}
var MENU_COMPONENTS = {
	item: MenuItem_default,
	submenu: SubMenu_default,
	divider: MenuDivider_default
};
var menu_default$1 = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	var _a;
	const override = import_react.useContext(OverrideContext_default);
	const overrideObj = override || {};
	const { getPrefixCls, getPopupContainer, direction, menu } = import_react.useContext(ConfigContext);
	const rootPrefixCls = getPrefixCls();
	const { prefixCls: customizePrefixCls, className, style, theme = "light", expandIcon, _internalDisableMenuItemTitleTooltip, inlineCollapsed, siderCollapsed, rootClassName, mode, selectable, onClick, overflowedIndicatorPopupClassName } = props;
	const passedProps = omit(__rest$4(props, [
		"prefixCls",
		"className",
		"style",
		"theme",
		"expandIcon",
		"_internalDisableMenuItemTitleTooltip",
		"inlineCollapsed",
		"siderCollapsed",
		"rootClassName",
		"mode",
		"selectable",
		"onClick",
		"overflowedIndicatorPopupClassName"
	]), ["collapsedWidth"]);
	(_a = overrideObj.validator) === null || _a === void 0 || _a.call(overrideObj, { mode });
	const onItemClick = useEvent((...args) => {
		var _a$1;
		onClick === null || onClick === void 0 || onClick.apply(void 0, args);
		(_a$1 = overrideObj.onClick) === null || _a$1 === void 0 || _a$1.call(overrideObj);
	});
	const mergedMode = overrideObj.mode || mode;
	const mergedSelectable = selectable !== null && selectable !== void 0 ? selectable : overrideObj.selectable;
	const mergedInlineCollapsed = inlineCollapsed !== null && inlineCollapsed !== void 0 ? inlineCollapsed : siderCollapsed;
	const defaultMotions = {
		horizontal: { motionName: `${rootPrefixCls}-slide-up` },
		inline: motion_default(rootPrefixCls),
		other: { motionName: `${rootPrefixCls}-zoom-big` }
	};
	const prefixCls = getPrefixCls("menu", customizePrefixCls || overrideObj.prefixCls);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$3(prefixCls, rootCls, !override);
	const menuClassName = (0, import_classnames$5.default)(`${prefixCls}-${theme}`, menu === null || menu === void 0 ? void 0 : menu.className, className);
	const mergedExpandIcon = import_react.useMemo(() => {
		var _a$1, _b;
		if (typeof expandIcon === "function" || isEmptyIcon(expandIcon)) return expandIcon || null;
		if (typeof overrideObj.expandIcon === "function" || isEmptyIcon(overrideObj.expandIcon)) return overrideObj.expandIcon || null;
		if (typeof (menu === null || menu === void 0 ? void 0 : menu.expandIcon) === "function" || isEmptyIcon(menu === null || menu === void 0 ? void 0 : menu.expandIcon)) return (menu === null || menu === void 0 ? void 0 : menu.expandIcon) || null;
		const mergedIcon = (_a$1 = expandIcon !== null && expandIcon !== void 0 ? expandIcon : overrideObj === null || overrideObj === void 0 ? void 0 : overrideObj.expandIcon) !== null && _a$1 !== void 0 ? _a$1 : menu === null || menu === void 0 ? void 0 : menu.expandIcon;
		return cloneElement(mergedIcon, { className: (0, import_classnames$5.default)(`${prefixCls}-submenu-expand-icon`, /* @__PURE__ */ import_react.isValidElement(mergedIcon) ? (_b = mergedIcon.props) === null || _b === void 0 ? void 0 : _b.className : void 0) });
	}, [
		expandIcon,
		overrideObj === null || overrideObj === void 0 ? void 0 : overrideObj.expandIcon,
		menu === null || menu === void 0 ? void 0 : menu.expandIcon,
		prefixCls
	]);
	const contextValue = import_react.useMemo(() => ({
		prefixCls,
		inlineCollapsed: mergedInlineCollapsed || false,
		direction,
		firstLevel: true,
		theme,
		mode: mergedMode,
		disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip
	}), [
		prefixCls,
		mergedInlineCollapsed,
		direction,
		_internalDisableMenuItemTitleTooltip,
		theme
	]);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement(OverrideContext_default.Provider, { value: null }, /* @__PURE__ */ import_react.createElement(MenuContext_default.Provider, { value: contextValue }, /* @__PURE__ */ import_react.createElement(es_default$2, Object.assign({
		getPopupContainer,
		overflowedIndicator: /* @__PURE__ */ import_react.createElement(EllipsisOutlined_default, null),
		overflowedIndicatorPopupClassName: (0, import_classnames$5.default)(prefixCls, `${prefixCls}-${theme}`, overflowedIndicatorPopupClassName),
		mode: mergedMode,
		selectable: mergedSelectable,
		onClick: onItemClick
	}, passedProps, {
		inlineCollapsed: mergedInlineCollapsed,
		style: Object.assign(Object.assign({}, menu === null || menu === void 0 ? void 0 : menu.style), style),
		className: menuClassName,
		prefixCls,
		direction,
		defaultMotions,
		expandIcon: mergedExpandIcon,
		ref,
		rootClassName: (0, import_classnames$5.default)(rootClassName, hashId, overrideObj.rootClassName, cssVarCls, rootCls),
		_internalComponents: MENU_COMPONENTS
	})))));
});
init_es$9();
var Menu = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	const menuRef = (0, import_react.useRef)(null);
	const context = import_react.useContext(SiderContext);
	(0, import_react.useImperativeHandle)(ref, () => ({
		menu: menuRef.current,
		focus: (options) => {
			var _a;
			(_a = menuRef.current) === null || _a === void 0 || _a.focus(options);
		}
	}));
	return /* @__PURE__ */ import_react.createElement(menu_default$1, Object.assign({ ref: menuRef }, props, context));
});
Menu.Item = MenuItem_default;
Menu.SubMenu = SubMenu_default;
Menu.Divider = MenuDivider_default;
Menu.ItemGroup = MenuItemGroup_default;
var menu_default = Menu;
var genStatusStyle = (token) => {
	const { componentCls, menuCls, colorError, colorTextLightSolid } = token;
	const itemCls = `${menuCls}-item`;
	return { [`${componentCls}, ${componentCls}-menu-submenu`]: { [`${menuCls} ${itemCls}`]: { [`&${itemCls}-danger:not(${itemCls}-disabled)`]: {
		color: colorError,
		"&:hover": {
			color: colorTextLightSolid,
			backgroundColor: colorError
		}
	} } } };
};
var status_default = genStatusStyle;
init_es$2();
var genBaseStyle = (token) => {
	const { componentCls, menuCls, zIndexPopup, dropdownArrowDistance, sizePopupArrow, antCls, iconCls, motionDurationMid, paddingBlock, fontSize, dropdownEdgeChildPadding, colorTextDisabled, fontSizeIcon, controlPaddingHorizontal, colorBgElevated } = token;
	return [
		{ [componentCls]: {
			position: "absolute",
			top: -9999,
			left: {
				_skip_check_: true,
				value: -9999
			},
			zIndex: zIndexPopup,
			display: "block",
			"&::before": {
				position: "absolute",
				insetBlock: token.calc(sizePopupArrow).div(2).sub(dropdownArrowDistance).equal(),
				zIndex: -9999,
				opacity: 1e-4,
				content: "\"\""
			},
			"&-menu-vertical": {
				maxHeight: "100vh",
				overflowY: "auto"
			},
			[`&-trigger${antCls}-btn`]: { [`& > ${iconCls}-down, & > ${antCls}-btn-icon > ${iconCls}-down`]: { fontSize: fontSizeIcon } },
			[`${componentCls}-wrap`]: {
				position: "relative",
				[`${antCls}-btn > ${iconCls}-down`]: { fontSize: fontSizeIcon },
				[`${iconCls}-down::before`]: { transition: `transform ${motionDurationMid}` }
			},
			[`${componentCls}-wrap-open`]: { [`${iconCls}-down::before`]: { transform: `rotate(180deg)` } },
			[`
        &-hidden,
        &-menu-hidden,
        &-menu-submenu-hidden
      `]: { display: "none" },
			[`&${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomRight,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomRight`]: { animationName: slideUpIn },
			[`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-top,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-top,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topRight`]: { animationName: slideDownIn },
			[`&${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomRight`]: { animationName: slideUpOut },
			[`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-top,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topRight`]: { animationName: slideDownOut }
		} },
		getArrowStyle(token, colorBgElevated, { arrowPlacement: {
			top: true,
			bottom: true
		} }),
		{
			[`${componentCls} ${menuCls}`]: {
				position: "relative",
				margin: 0
			},
			[`${menuCls}-submenu-popup`]: {
				position: "absolute",
				zIndex: zIndexPopup,
				background: "transparent",
				boxShadow: "none",
				transformOrigin: "0 0",
				"ul, li": {
					listStyle: "none",
					margin: 0
				}
			},
			[`${componentCls}, ${componentCls}-menu-submenu`]: Object.assign(Object.assign({}, resetComponent(token)), { [menuCls]: Object.assign(Object.assign({
				padding: dropdownEdgeChildPadding,
				listStyleType: "none",
				backgroundColor: colorBgElevated,
				backgroundClip: "padding-box",
				borderRadius: token.borderRadiusLG,
				outline: "none",
				boxShadow: token.boxShadowSecondary
			}, genFocusStyle(token)), {
				"&:empty": {
					padding: 0,
					boxShadow: "none"
				},
				[`${menuCls}-item-group-title`]: {
					padding: `${unit(paddingBlock)} ${unit(controlPaddingHorizontal)}`,
					color: token.colorTextDescription,
					transition: `all ${motionDurationMid}`
				},
				[`${menuCls}-item`]: {
					position: "relative",
					display: "flex",
					alignItems: "center"
				},
				[`${menuCls}-item-icon`]: {
					minWidth: fontSize,
					marginInlineEnd: token.marginXS,
					fontSize: token.fontSizeSM
				},
				[`${menuCls}-title-content`]: {
					flex: "auto",
					"&-with-extra": {
						display: "inline-flex",
						alignItems: "center",
						width: "100%"
					},
					"> a": {
						color: "inherit",
						transition: `all ${motionDurationMid}`,
						"&:hover": { color: "inherit" },
						"&::after": {
							position: "absolute",
							inset: 0,
							content: "\"\""
						}
					},
					[`${menuCls}-item-extra`]: {
						paddingInlineStart: token.padding,
						marginInlineStart: "auto",
						fontSize: token.fontSizeSM,
						color: token.colorTextDescription
					}
				},
				[`${menuCls}-item, ${menuCls}-submenu-title`]: Object.assign(Object.assign({
					display: "flex",
					margin: 0,
					padding: `${unit(paddingBlock)} ${unit(controlPaddingHorizontal)}`,
					color: token.colorText,
					fontWeight: "normal",
					fontSize,
					lineHeight: token.lineHeight,
					cursor: "pointer",
					transition: `all ${motionDurationMid}`,
					borderRadius: token.borderRadiusSM,
					"&:hover, &-active": { backgroundColor: token.controlItemBgHover }
				}, genFocusStyle(token)), {
					"&-selected": {
						color: token.colorPrimary,
						backgroundColor: token.controlItemBgActive,
						"&:hover, &-active": { backgroundColor: token.controlItemBgActiveHover }
					},
					"&-disabled": {
						color: colorTextDisabled,
						cursor: "not-allowed",
						"&:hover": {
							color: colorTextDisabled,
							backgroundColor: colorBgElevated,
							cursor: "not-allowed"
						},
						a: { pointerEvents: "none" }
					},
					"&-divider": {
						height: 1,
						margin: `${unit(token.marginXXS)} 0`,
						overflow: "hidden",
						lineHeight: 0,
						backgroundColor: token.colorSplit
					},
					[`${componentCls}-menu-submenu-expand-icon`]: {
						position: "absolute",
						insetInlineEnd: token.paddingXS,
						[`${componentCls}-menu-submenu-arrow-icon`]: {
							marginInlineEnd: "0 !important",
							color: token.colorIcon,
							fontSize: fontSizeIcon,
							fontStyle: "normal"
						}
					}
				}),
				[`${menuCls}-item-group-list`]: {
					margin: `0 ${unit(token.marginXS)}`,
					padding: 0,
					listStyle: "none"
				},
				[`${menuCls}-submenu-title`]: { paddingInlineEnd: token.calc(controlPaddingHorizontal).add(token.fontSizeSM).equal() },
				[`${menuCls}-submenu-vertical`]: { position: "relative" },
				[`${menuCls}-submenu${menuCls}-submenu-disabled ${componentCls}-menu-submenu-title`]: { [`&, ${componentCls}-menu-submenu-arrow-icon`]: {
					color: colorTextDisabled,
					backgroundColor: colorBgElevated,
					cursor: "not-allowed"
				} },
				[`${menuCls}-submenu-selected ${componentCls}-menu-submenu-title`]: { color: token.colorPrimary }
			}) })
		},
		[
			initSlideMotion(token, "slide-up"),
			initSlideMotion(token, "slide-down"),
			initMoveMotion(token, "move-up"),
			initMoveMotion(token, "move-down"),
			initZoomMotion(token, "zoom-big")
		]
	];
};
const prepareComponentToken$1 = (token) => Object.assign(Object.assign({
	zIndexPopup: token.zIndexPopupBase + 50,
	paddingBlock: (token.controlHeight - token.fontSize * token.lineHeight) / 2
}, getArrowOffsetToken({
	contentRadius: token.borderRadiusLG,
	limitVerticalRadius: true
})), getArrowToken(token));
var style_default$2 = genStyleHooks("Dropdown", (token) => {
	const { marginXXS, sizePopupArrow, paddingXXS, componentCls } = token;
	const dropdownToken = merge(token, {
		menuCls: `${componentCls}-menu`,
		dropdownArrowDistance: token.calc(sizePopupArrow).div(2).add(marginXXS).equal(),
		dropdownEdgeChildPadding: paddingXXS
	});
	return [genBaseStyle(dropdownToken), status_default(dropdownToken)];
}, prepareComponentToken$1, { resetStyle: false });
init_LeftOutlined();
var import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames());
init_es$10();
init_useEvent();
init_useMergedState();
init_omit();
var Dropdown$1 = (props) => {
	var _a;
	const { menu, arrow, prefixCls: customizePrefixCls, children, trigger, disabled, dropdownRender, popupRender, getPopupContainer, overlayClassName, rootClassName, overlayStyle, open, onOpenChange, visible, onVisibleChange, mouseEnterDelay = .15, mouseLeaveDelay = .1, autoAdjustOverflow = true, placement = "", overlay, transitionName, destroyOnHidden, destroyPopupOnHide } = props;
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction, dropdown } = import_react.useContext(ConfigContext);
	const mergedPopupRender = popupRender || dropdownRender;
	devUseWarning("Dropdown");
	const memoTransitionName = import_react.useMemo(() => {
		const rootPrefixCls = getPrefixCls();
		if (transitionName !== void 0) return transitionName;
		if (placement.includes("top")) return `${rootPrefixCls}-slide-down`;
		return `${rootPrefixCls}-slide-up`;
	}, [
		getPrefixCls,
		placement,
		transitionName
	]);
	const memoPlacement = import_react.useMemo(() => {
		if (!placement) return direction === "rtl" ? "bottomRight" : "bottomLeft";
		if (placement.includes("Center")) return placement.slice(0, placement.indexOf("Center"));
		return placement;
	}, [placement, direction]);
	const prefixCls = getPrefixCls("dropdown", customizePrefixCls);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$2(prefixCls, rootCls);
	const [, token] = useToken();
	const child = import_react.Children.only(isPrimitive_default(children) ? /* @__PURE__ */ import_react.createElement("span", null, children) : children);
	const popupTrigger = cloneElement(child, {
		className: (0, import_classnames$4.default)(`${prefixCls}-trigger`, { [`${prefixCls}-rtl`]: direction === "rtl" }, child.props.className),
		disabled: (_a = child.props.disabled) !== null && _a !== void 0 ? _a : disabled
	});
	const triggerActions = disabled ? [] : trigger;
	const alignPoint = !!(triggerActions === null || triggerActions === void 0 ? void 0 : triggerActions.includes("contextMenu"));
	const [mergedOpen, setOpen] = useMergedState(false, { value: open !== null && open !== void 0 ? open : visible });
	const onInnerOpenChange = useEvent((nextOpen) => {
		onOpenChange === null || onOpenChange === void 0 || onOpenChange(nextOpen, { source: "trigger" });
		onVisibleChange === null || onVisibleChange === void 0 || onVisibleChange(nextOpen);
		setOpen(nextOpen);
	});
	const overlayClassNameCustomized = (0, import_classnames$4.default)(overlayClassName, rootClassName, hashId, cssVarCls, rootCls, dropdown === null || dropdown === void 0 ? void 0 : dropdown.className, { [`${prefixCls}-rtl`]: direction === "rtl" });
	const builtinPlacements = getPlacements({
		arrowPointAtCenter: typeof arrow === "object" && arrow.pointAtCenter,
		autoAdjustOverflow,
		offset: token.marginXXS,
		arrowWidth: arrow ? token.sizePopupArrow : 0,
		borderRadius: token.borderRadius
	});
	const onMenuClick = import_react.useCallback(() => {
		if ((menu === null || menu === void 0 ? void 0 : menu.selectable) && (menu === null || menu === void 0 ? void 0 : menu.multiple)) return;
		onOpenChange === null || onOpenChange === void 0 || onOpenChange(false, { source: "menu" });
		setOpen(false);
	}, [menu === null || menu === void 0 ? void 0 : menu.selectable, menu === null || menu === void 0 ? void 0 : menu.multiple]);
	const renderOverlay = () => {
		let overlayNode;
		if (menu === null || menu === void 0 ? void 0 : menu.items) overlayNode = /* @__PURE__ */ import_react.createElement(menu_default, Object.assign({}, menu));
		else if (typeof overlay === "function") overlayNode = overlay();
		else overlayNode = overlay;
		if (mergedPopupRender) overlayNode = mergedPopupRender(overlayNode);
		overlayNode = import_react.Children.only(typeof overlayNode === "string" ? /* @__PURE__ */ import_react.createElement("span", null, overlayNode) : overlayNode);
		return /* @__PURE__ */ import_react.createElement(OverrideProvider, {
			prefixCls: `${prefixCls}-menu`,
			rootClassName: (0, import_classnames$4.default)(cssVarCls, rootCls),
			expandIcon: /* @__PURE__ */ import_react.createElement("span", { className: `${prefixCls}-menu-submenu-arrow` }, direction === "rtl" ? /* @__PURE__ */ import_react.createElement(LeftOutlined_default, { className: `${prefixCls}-menu-submenu-arrow-icon` }) : /* @__PURE__ */ import_react.createElement(ChevronRight, {
				size: 16,
				strokeWidth: 1.8,
				className: `${prefixCls}-menu-submenu-arrow-icon lucide-custom`
			})),
			mode: "vertical",
			selectable: false,
			onClick: onMenuClick,
			validator: ({ mode }) => {}
		}, overlayNode);
	};
	const [zIndex, contextZIndex] = useZIndex("Dropdown", overlayStyle === null || overlayStyle === void 0 ? void 0 : overlayStyle.zIndex);
	let renderNode = /* @__PURE__ */ import_react.createElement(es_default$1, Object.assign({ alignPoint }, omit(props, ["rootClassName"]), {
		mouseEnterDelay,
		mouseLeaveDelay,
		visible: mergedOpen,
		builtinPlacements,
		arrow: !!arrow,
		overlayClassName: overlayClassNameCustomized,
		prefixCls,
		getPopupContainer: getPopupContainer || getContextPopupContainer,
		transitionName: memoTransitionName,
		trigger: triggerActions,
		overlay: renderOverlay,
		placement: memoPlacement,
		onVisibleChange: onInnerOpenChange,
		overlayStyle: Object.assign(Object.assign(Object.assign({}, dropdown === null || dropdown === void 0 ? void 0 : dropdown.style), overlayStyle), { zIndex }),
		autoDestroy: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyPopupOnHide
	}), popupTrigger);
	if (zIndex) renderNode = /* @__PURE__ */ import_react.createElement(zindexContext_default.Provider, { value: contextZIndex }, renderNode);
	return wrapCSSVar(renderNode);
};
var PurePanel = PurePanel_default(Dropdown$1, "align", void 0, "dropdown", (prefixCls) => prefixCls);
/* istanbul ignore next */
var WrapPurePanel = (props) => /* @__PURE__ */ import_react.createElement(PurePanel, Object.assign({}, props), /* @__PURE__ */ import_react.createElement("span", null));
Dropdown$1._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;
var dropdown_default$1 = Dropdown$1;
function isPresetSize(size) {
	return [
		"small",
		"middle",
		"large"
	].includes(size);
}
function isValidGapNumber(size) {
	if (!size) return false;
	return typeof size === "number" && !Number.isNaN(size);
}
const SpaceContext = /* @__PURE__ */ import_react.createContext({ latestIndex: 0 });
const SpaceContextProvider = SpaceContext.Provider;
var Item = ({ className, index, children, split, style }) => {
	const { latestIndex } = import_react.useContext(SpaceContext);
	if (children === null || children === void 0) return null;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("div", {
		className,
		style
	}, children), index < latestIndex && split && /* @__PURE__ */ import_react.createElement("span", { className: `${className}-split` }, split));
};
var Item_default = Item;
var import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames());
init_toArray();
var __rest$3 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
var Space = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	var _a;
	const { getPrefixCls, direction: directionConfig, size: contextSize, className: contextClassName, style: contextStyle, classNames: contextClassNames, styles: contextStyles } = useComponentConfig("space");
	const { size = contextSize !== null && contextSize !== void 0 ? contextSize : "small", align, className, rootClassName, children, direction = "horizontal", prefixCls: customizePrefixCls, split, style, wrap = false, classNames: customClassNames, styles } = props, otherProps = __rest$3(props, [
		"size",
		"align",
		"className",
		"rootClassName",
		"children",
		"direction",
		"prefixCls",
		"split",
		"style",
		"wrap",
		"classNames",
		"styles"
	]);
	const [horizontalSize, verticalSize] = Array.isArray(size) ? size : [size, size];
	const isPresetVerticalSize = isPresetSize(verticalSize);
	const isPresetHorizontalSize = isPresetSize(horizontalSize);
	const isValidVerticalSize = isValidGapNumber(verticalSize);
	const isValidHorizontalSize = isValidGapNumber(horizontalSize);
	const childNodes = toArray$1(children, { keepEmpty: true });
	const mergedAlign = align === void 0 && direction === "horizontal" ? "center" : align;
	const prefixCls = getPrefixCls("space", customizePrefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default$1(prefixCls);
	const cls = (0, import_classnames$3.default)(prefixCls, contextClassName, hashId, `${prefixCls}-${direction}`, {
		[`${prefixCls}-rtl`]: directionConfig === "rtl",
		[`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
		[`${prefixCls}-gap-row-${verticalSize}`]: isPresetVerticalSize,
		[`${prefixCls}-gap-col-${horizontalSize}`]: isPresetHorizontalSize
	}, className, rootClassName, cssVarCls);
	const itemClassName = (0, import_classnames$3.default)(`${prefixCls}-item`, (_a = customClassNames === null || customClassNames === void 0 ? void 0 : customClassNames.item) !== null && _a !== void 0 ? _a : contextClassNames.item);
	let latestIndex = 0;
	const nodes = childNodes.map((child, i$1) => {
		var _a$1;
		if (child !== null && child !== void 0) latestIndex = i$1;
		const key = (child === null || child === void 0 ? void 0 : child.key) || `${itemClassName}-${i$1}`;
		return /* @__PURE__ */ import_react.createElement(Item_default, {
			className: itemClassName,
			key,
			index: i$1,
			split,
			style: (_a$1 = styles === null || styles === void 0 ? void 0 : styles.item) !== null && _a$1 !== void 0 ? _a$1 : contextStyles.item
		}, child);
	});
	const spaceContext = import_react.useMemo(() => ({ latestIndex }), [latestIndex]);
	if (childNodes.length === 0) return null;
	const gapStyle = {};
	if (wrap) gapStyle.flexWrap = "wrap";
	if (!isPresetHorizontalSize && isValidHorizontalSize) gapStyle.columnGap = horizontalSize;
	if (!isPresetVerticalSize && isValidVerticalSize) gapStyle.rowGap = verticalSize;
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement("div", Object.assign({
		ref,
		className: cls,
		style: Object.assign(Object.assign(Object.assign({}, gapStyle), contextStyle), style)
	}, otherProps), /* @__PURE__ */ import_react.createElement(SpaceContextProvider, { value: spaceContext }, nodes)));
});
Space.Compact = Compact_default;
var space_default = Space;
init_EllipsisOutlined();
var import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames());
var __rest$2 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
var DropdownButton = (props) => {
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const { prefixCls: customizePrefixCls, type = "default", danger, disabled, loading, onClick, htmlType, children, className, menu, arrow, autoFocus, overlay, trigger, align, open, onOpenChange, placement, getPopupContainer, href, icon = /* @__PURE__ */ import_react.createElement(EllipsisOutlined_default, null), title, buttonsRender = (buttons) => buttons, mouseEnterDelay, mouseLeaveDelay, overlayClassName, overlayStyle, destroyOnHidden, destroyPopupOnHide, dropdownRender, popupRender } = props, restProps = __rest$2(props, [
		"prefixCls",
		"type",
		"danger",
		"disabled",
		"loading",
		"onClick",
		"htmlType",
		"children",
		"className",
		"menu",
		"arrow",
		"autoFocus",
		"overlay",
		"trigger",
		"align",
		"open",
		"onOpenChange",
		"placement",
		"getPopupContainer",
		"href",
		"icon",
		"title",
		"buttonsRender",
		"mouseEnterDelay",
		"mouseLeaveDelay",
		"overlayClassName",
		"overlayStyle",
		"destroyOnHidden",
		"destroyPopupOnHide",
		"dropdownRender",
		"popupRender"
	]);
	const prefixCls = getPrefixCls("dropdown", customizePrefixCls);
	const buttonPrefixCls = `${prefixCls}-button`;
	const dropdownProps = {
		menu,
		arrow,
		autoFocus,
		align,
		disabled,
		trigger: disabled ? [] : trigger,
		onOpenChange,
		getPopupContainer: getPopupContainer || getContextPopupContainer,
		mouseEnterDelay,
		mouseLeaveDelay,
		overlayClassName,
		overlayStyle,
		destroyOnHidden,
		popupRender: popupRender || dropdownRender
	};
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const classes = (0, import_classnames$2.default)(buttonPrefixCls, compactItemClassnames, className);
	if ("destroyPopupOnHide" in props) dropdownProps.destroyPopupOnHide = destroyPopupOnHide;
	if ("overlay" in props) dropdownProps.overlay = overlay;
	if ("open" in props) dropdownProps.open = open;
	if ("placement" in props) dropdownProps.placement = placement;
	else dropdownProps.placement = direction === "rtl" ? "bottomLeft" : "bottomRight";
	const [leftButtonToRender, rightButtonToRender] = buttonsRender([/* @__PURE__ */ import_react.createElement(button_default, {
		type,
		danger,
		disabled,
		loading,
		onClick,
		htmlType,
		href,
		title
	}, children), /* @__PURE__ */ import_react.createElement(button_default, {
		type,
		danger,
		icon
	})]);
	return /* @__PURE__ */ import_react.createElement(space_default.Compact, Object.assign({
		className: classes,
		size: compactSize,
		block: true
	}, restProps), leftButtonToRender, /* @__PURE__ */ import_react.createElement(dropdown_default$1, Object.assign({}, dropdownProps), rightButtonToRender));
};
DropdownButton.__ANT_BUTTON = true;
var dropdown_button_default = DropdownButton;
var Dropdown = dropdown_default$1;
Dropdown.Button = dropdown_button_default;
var dropdown_default = Dropdown;
init_es$2();
init_es();
const genBoxStyle = (position) => ({
	position: position || "absolute",
	inset: 0
});
const genImageMaskStyle = (token) => {
	const { iconCls, motionDurationSlow, paddingXXS, marginXXS, prefixCls, colorTextLightSolid } = token;
	return {
		position: "absolute",
		inset: 0,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: colorTextLightSolid,
		background: new FastColor("#000").setA(.5).toRgbString(),
		cursor: "pointer",
		opacity: 0,
		transition: `opacity ${motionDurationSlow}`,
		[`.${prefixCls}-mask-info`]: Object.assign(Object.assign({}, textEllipsis), {
			padding: `0 ${unit(paddingXXS)}`,
			[iconCls]: {
				marginInlineEnd: marginXXS,
				svg: { verticalAlign: "baseline" }
			}
		})
	};
};
const genPreviewOperationsStyle = (token) => {
	const { previewCls, modalMaskBg, paddingSM, marginXL, margin, paddingLG, previewOperationColorDisabled, previewOperationHoverColor, motionDurationSlow, iconCls, colorTextLightSolid } = token;
	const operationBg = new FastColor(modalMaskBg).setA(.1);
	const operationBgHover = operationBg.clone().setA(.2);
	return {
		[`${previewCls}-footer`]: {
			position: "fixed",
			bottom: marginXL,
			left: {
				_skip_check_: true,
				value: "50%"
			},
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			color: token.previewOperationColor,
			transform: "translateX(-50%)"
		},
		[`${previewCls}-progress`]: { marginBottom: margin },
		[`${previewCls}-close`]: {
			position: "fixed",
			top: marginXL,
			right: {
				_skip_check_: true,
				value: marginXL
			},
			display: "flex",
			color: colorTextLightSolid,
			backgroundColor: operationBg.toRgbString(),
			borderRadius: "50%",
			padding: paddingSM,
			outline: 0,
			border: 0,
			cursor: "pointer",
			transition: `all ${motionDurationSlow}`,
			"&:hover": { backgroundColor: operationBgHover.toRgbString() },
			[`& > ${iconCls}`]: { fontSize: token.previewOperationSize }
		},
		[`${previewCls}-operations`]: {
			display: "flex",
			alignItems: "center",
			padding: `0 ${unit(paddingLG)}`,
			backgroundColor: operationBg.toRgbString(),
			borderRadius: 100,
			"&-operation": {
				marginInlineStart: paddingSM,
				padding: paddingSM,
				cursor: "pointer",
				transition: `all ${motionDurationSlow}`,
				userSelect: "none",
				[`&:not(${previewCls}-operations-operation-disabled):hover > ${iconCls}`]: { color: previewOperationHoverColor },
				"&-disabled": {
					color: previewOperationColorDisabled,
					cursor: "not-allowed"
				},
				"&:first-of-type": { marginInlineStart: 0 },
				[`& > ${iconCls}`]: { fontSize: token.previewOperationSize }
			}
		}
	};
};
const genPreviewSwitchStyle = (token) => {
	const { modalMaskBg, iconCls, previewOperationColorDisabled, previewCls, zIndexPopup, motionDurationSlow } = token;
	const operationBg = new FastColor(modalMaskBg).setA(.1);
	const operationBgHover = operationBg.clone().setA(.2);
	return {
		[`${previewCls}-switch-left, ${previewCls}-switch-right`]: {
			position: "fixed",
			insetBlockStart: "50%",
			zIndex: token.calc(zIndexPopup).add(1).equal(),
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: token.imagePreviewSwitchSize,
			height: token.imagePreviewSwitchSize,
			marginTop: token.calc(token.imagePreviewSwitchSize).mul(-1).div(2).equal(),
			color: token.previewOperationColor,
			background: operationBg.toRgbString(),
			borderRadius: "50%",
			transform: `translateY(-50%)`,
			cursor: "pointer",
			transition: `all ${motionDurationSlow}`,
			userSelect: "none",
			"&:hover": { background: operationBgHover.toRgbString() },
			"&-disabled": { "&, &:hover": {
				color: previewOperationColorDisabled,
				background: "transparent",
				cursor: "not-allowed",
				[`> ${iconCls}`]: { cursor: "not-allowed" }
			} },
			[`> ${iconCls}`]: { fontSize: token.previewOperationSize }
		},
		[`${previewCls}-switch-left`]: { insetInlineStart: token.marginSM },
		[`${previewCls}-switch-right`]: { insetInlineEnd: token.marginSM }
	};
};
const genImagePreviewStyle = (token) => {
	const { motionEaseOut, previewCls, motionDurationSlow, componentCls } = token;
	return [
		{ [`${componentCls}-preview-root`]: {
			[previewCls]: {
				height: "100%",
				textAlign: "center",
				pointerEvents: "none"
			},
			[`${previewCls}-body`]: Object.assign(Object.assign({}, genBoxStyle()), { overflow: "hidden" }),
			[`${previewCls}-img`]: {
				maxWidth: "100%",
				maxHeight: "70%",
				verticalAlign: "middle",
				transform: "scale3d(1, 1, 1)",
				cursor: "grab",
				transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
				userSelect: "none",
				"&-wrapper": Object.assign(Object.assign({}, genBoxStyle()), {
					transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					"& > *": { pointerEvents: "auto" },
					"&::before": {
						display: "inline-block",
						width: 1,
						height: "50%",
						marginInlineEnd: -1,
						content: "\"\""
					}
				})
			},
			[`${previewCls}-moving`]: { [`${previewCls}-preview-img`]: {
				cursor: "grabbing",
				"&-wrapper": { transitionDuration: "0s" }
			} }
		} },
		{ [`${componentCls}-preview-root`]: { [`${previewCls}-wrap`]: { zIndex: token.zIndexPopup } } },
		{
			[`${componentCls}-preview-operations-wrapper`]: {
				position: "fixed",
				zIndex: token.calc(token.zIndexPopup).add(1).equal()
			},
			"&": [genPreviewOperationsStyle(token), genPreviewSwitchStyle(token)]
		}
	];
};
var genImageStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		position: "relative",
		display: "inline-block",
		[`${componentCls}-img`]: {
			width: "100%",
			height: "auto",
			verticalAlign: "middle"
		},
		[`${componentCls}-img-placeholder`]: {
			backgroundColor: token.colorBgContainerDisabled,
			backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			backgroundSize: "30%"
		},
		[`${componentCls}-mask`]: Object.assign({}, genImageMaskStyle(token)),
		[`${componentCls}-mask:hover`]: { opacity: 1 },
		[`${componentCls}-placeholder`]: Object.assign({}, genBoxStyle())
	} };
};
var genPreviewMotion = (token) => {
	const { previewCls } = token;
	return {
		[`${previewCls}-root`]: initZoomMotion(token, "zoom"),
		"&": initFadeMotion(token, true)
	};
};
const prepareComponentToken = (token) => ({
	zIndexPopup: token.zIndexPopupBase + 80,
	previewOperationColor: new FastColor(token.colorTextLightSolid).setA(.65).toRgbString(),
	previewOperationHoverColor: new FastColor(token.colorTextLightSolid).setA(.85).toRgbString(),
	previewOperationColorDisabled: new FastColor(token.colorTextLightSolid).setA(.25).toRgbString(),
	previewOperationSize: token.fontSizeIcon * 1.5
});
var style_default = genStyleHooks("Image", (token) => {
	const previewCls = `${token.componentCls}-preview`;
	const imageToken = merge(token, {
		previewCls,
		modalMaskBg: new FastColor("#000").setA(.45).toRgbString(),
		imagePreviewSwitchSize: token.controlHeightLG
	});
	return [
		genImageStyle(imageToken),
		genImagePreviewStyle(imageToken),
		genModalMaskStyle(merge(imageToken, { componentCls: previewCls })),
		genPreviewMotion(imageToken)
	];
}, prepareComponentToken);
init_CloseOutlined();
init_LeftOutlined();
init_RightOutlined();
init_RotateLeftOutlined();
init_RotateRightOutlined();
init_SwapOutlined();
init_ZoomInOutlined();
init_ZoomOutOutlined();
var import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames());
init_es$11();
var __rest$1 = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
const icons = {
	rotateLeft: /* @__PURE__ */ import_react.createElement(RotateLeftOutlined_default, null),
	rotateRight: /* @__PURE__ */ import_react.createElement(RotateRightOutlined_default, null),
	zoomIn: /* @__PURE__ */ import_react.createElement(ZoomInOutlined_default, null),
	zoomOut: /* @__PURE__ */ import_react.createElement(ZoomOutOutlined_default, null),
	close: /* @__PURE__ */ import_react.createElement(CloseOutlined_default, null),
	left: /* @__PURE__ */ import_react.createElement(LeftOutlined_default, null),
	right: /* @__PURE__ */ import_react.createElement(RightOutlined_default, null),
	flipX: /* @__PURE__ */ import_react.createElement(SwapOutlined_default, null),
	flipY: /* @__PURE__ */ import_react.createElement(SwapOutlined_default, { rotate: 90 })
};
var InternalPreviewGroup = (_a) => {
	var { previewPrefixCls: customizePrefixCls, preview } = _a, otherProps = __rest$1(_a, ["previewPrefixCls", "preview"]);
	const { getPrefixCls, direction } = import_react.useContext(ConfigContext);
	const prefixCls = getPrefixCls("image", customizePrefixCls);
	const previewPrefixCls = `${prefixCls}-preview`;
	const rootPrefixCls = getPrefixCls();
	const rootCls = useCSSVarCls_default(prefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const [zIndex] = useZIndex("ImagePreview", typeof preview === "object" ? preview.zIndex : void 0);
	const memoizedIcons = import_react.useMemo(() => Object.assign(Object.assign({}, icons), {
		left: direction === "rtl" ? /* @__PURE__ */ import_react.createElement(RightOutlined_default, null) : /* @__PURE__ */ import_react.createElement(LeftOutlined_default, null),
		right: direction === "rtl" ? /* @__PURE__ */ import_react.createElement(LeftOutlined_default, null) : /* @__PURE__ */ import_react.createElement(RightOutlined_default, null)
	}), [direction]);
	const mergedPreview = import_react.useMemo(() => {
		var _a$1;
		if (preview === false) return preview;
		const _preview = typeof preview === "object" ? preview : {};
		const mergedRootClassName = (0, import_classnames$1.default)(hashId, cssVarCls, rootCls, (_a$1 = _preview.rootClassName) !== null && _a$1 !== void 0 ? _a$1 : "");
		return Object.assign(Object.assign({}, _preview), {
			transitionName: getTransitionName(rootPrefixCls, "zoom", _preview.transitionName),
			maskTransitionName: getTransitionName(rootPrefixCls, "fade", _preview.maskTransitionName),
			rootClassName: mergedRootClassName,
			zIndex
		});
	}, [preview]);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement(es_default.PreviewGroup, Object.assign({
		preview: mergedPreview,
		previewPrefixCls,
		icons: memoizedIcons
	}, otherProps)));
};
var PreviewGroup_default = InternalPreviewGroup;
init_EyeOutlined();
var import_classnames = /* @__PURE__ */ __toESM(require_classnames());
init_es$11();
var __rest = function(s$1, e$1) {
	var t$1 = {};
	for (var p in s$1) if (Object.prototype.hasOwnProperty.call(s$1, p) && e$1.indexOf(p) < 0) t$1[p] = s$1[p];
	if (s$1 != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i$1 = 0, p = Object.getOwnPropertySymbols(s$1); i$1 < p.length; i$1++) if (e$1.indexOf(p[i$1]) < 0 && Object.prototype.propertyIsEnumerable.call(s$1, p[i$1])) t$1[p[i$1]] = s$1[p[i$1]];
	}
	return t$1;
};
var Image$2 = (props) => {
	const { prefixCls: customizePrefixCls, preview, className, rootClassName, style } = props, otherProps = __rest(props, [
		"prefixCls",
		"preview",
		"className",
		"rootClassName",
		"style"
	]);
	const { getPrefixCls, getPopupContainer: getContextPopupContainer, className: contextClassName, style: contextStyle, preview: contextPreview } = useComponentConfig("image");
	const [imageLocale] = useLocale_default("Image");
	const prefixCls = getPrefixCls("image", customizePrefixCls);
	const rootPrefixCls = getPrefixCls();
	const rootCls = useCSSVarCls_default(prefixCls);
	const [wrapCSSVar, hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const mergedRootClassName = (0, import_classnames.default)(rootClassName, hashId, cssVarCls, rootCls);
	const mergedClassName = (0, import_classnames.default)(className, hashId, contextClassName);
	const [zIndex] = useZIndex("ImagePreview", typeof preview === "object" ? preview.zIndex : void 0);
	const mergedPreview = import_react.useMemo(() => {
		if (preview === false) return preview;
		const _preview = typeof preview === "object" ? preview : {};
		const { getContainer, closeIcon, rootClassName: rootClassName$1, destroyOnClose, destroyOnHidden } = _preview, restPreviewProps = __rest(_preview, [
			"getContainer",
			"closeIcon",
			"rootClassName",
			"destroyOnClose",
			"destroyOnHidden"
		]);
		return Object.assign(Object.assign({
			mask: /* @__PURE__ */ import_react.createElement("div", { className: `${prefixCls}-mask-info` }, /* @__PURE__ */ import_react.createElement(EyeOutlined_default, null), imageLocale === null || imageLocale === void 0 ? void 0 : imageLocale.preview),
			icons
		}, restPreviewProps), {
			destroyOnClose: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyOnClose,
			rootClassName: (0, import_classnames.default)(mergedRootClassName, rootClassName$1),
			getContainer: getContainer !== null && getContainer !== void 0 ? getContainer : getContextPopupContainer,
			transitionName: getTransitionName(rootPrefixCls, "zoom", _preview.transitionName),
			maskTransitionName: getTransitionName(rootPrefixCls, "fade", _preview.maskTransitionName),
			zIndex,
			closeIcon: closeIcon !== null && closeIcon !== void 0 ? closeIcon : contextPreview === null || contextPreview === void 0 ? void 0 : contextPreview.closeIcon
		});
	}, [
		preview,
		imageLocale,
		contextPreview === null || contextPreview === void 0 ? void 0 : contextPreview.closeIcon
	]);
	const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
	return wrapCSSVar(/* @__PURE__ */ import_react.createElement(es_default, Object.assign({
		prefixCls,
		preview: mergedPreview,
		rootClassName: mergedRootClassName,
		className: mergedClassName,
		style: mergedStyle
	}, otherProps)));
};
Image$2.PreviewGroup = PreviewGroup_default;
var image_default = Image$2;
function _mergeNamespaces(e$1, t$1) {
	return t$1.forEach((function(t$2) {
		t$2 && "string" != typeof t$2 && !Array.isArray(t$2) && Object.keys(t$2).forEach((function(r$1) {
			if ("default" !== r$1 && !(r$1 in e$1)) {
				var i$1 = Object.getOwnPropertyDescriptor(t$2, r$1);
				Object.defineProperty(e$1, r$1, i$1.get ? i$1 : {
					enumerable: !0,
					get: function() {
						return t$2[r$1];
					}
				});
			}
		}));
	})), Object.freeze(e$1);
}
function copyExifWithoutOrientation(e$1, t$1) {
	return new Promise((function(r$1, i$1) {
		let o$1;
		return getApp1Segment(e$1).then((function(e$2) {
			try {
				return o$1 = e$2, r$1(new Blob([
					t$1.slice(0, 2),
					o$1,
					t$1.slice(2)
				], { type: "image/jpeg" }));
			} catch (e$3) {
				return i$1(e$3);
			}
		}), i$1);
	}));
}
var getApp1Segment = (e$1) => new Promise(((t$1, r$1) => {
	const i$1 = new FileReader();
	i$1.addEventListener("load", (({ target: { result: e$2 } }) => {
		const i$2 = new DataView(e$2);
		let o$1 = 0;
		if (65496 !== i$2.getUint16(o$1)) return r$1("not a valid JPEG");
		for (o$1 += 2;;) {
			const a$1 = i$2.getUint16(o$1);
			if (65498 === a$1) break;
			const s$1 = i$2.getUint16(o$1 + 2);
			if (65505 === a$1 && 1165519206 === i$2.getUint32(o$1 + 4)) {
				const a$2 = o$1 + 10;
				let f$1;
				switch (i$2.getUint16(a$2)) {
					case 18761:
						f$1 = !0;
						break;
					case 19789:
						f$1 = !1;
						break;
					default: return r$1("TIFF header contains invalid endian");
				}
				if (42 !== i$2.getUint16(a$2 + 2, f$1)) return r$1("TIFF header contains invalid version");
				const l$1 = i$2.getUint32(a$2 + 4, f$1), c$1 = a$2 + l$1 + 2 + 12 * i$2.getUint16(a$2 + l$1, f$1);
				for (let e$3 = a$2 + l$1 + 2; e$3 < c$1; e$3 += 12) if (274 == i$2.getUint16(e$3, f$1)) {
					if (3 !== i$2.getUint16(e$3 + 2, f$1)) return r$1("Orientation data type is invalid");
					if (1 !== i$2.getUint32(e$3 + 4, f$1)) return r$1("Orientation data count is invalid");
					i$2.setUint16(e$3 + 8, 1, f$1);
					break;
				}
				return t$1(e$2.slice(o$1, o$1 + 2 + s$1));
			}
			o$1 += 2 + s$1;
		}
		return t$1(new Blob());
	})), i$1.readAsArrayBuffer(e$1);
}));
var e = {}, t = {
	get exports() {
		return e;
	},
	set exports(t$1) {
		e = t$1;
	}
};
(function(e$1) {
	var r$1, i$1, UZIP$1 = {};
	t.exports = UZIP$1, UZIP$1.parse = function(e$2, t$1) {
		for (var r$2 = UZIP$1.bin.readUshort, i$2 = UZIP$1.bin.readUint, o$1 = 0, a$1 = {}, s$1 = new Uint8Array(e$2), f$1 = s$1.length - 4; 101010256 != i$2(s$1, f$1);) f$1--;
		o$1 = f$1;
		o$1 += 4;
		var l$1 = r$2(s$1, o$1 += 4);
		r$2(s$1, o$1 += 2);
		var c$1 = i$2(s$1, o$1 += 2), u = i$2(s$1, o$1 += 4);
		o$1 += 4, o$1 = u;
		for (var h = 0; h < l$1; h++) {
			i$2(s$1, o$1), o$1 += 4, o$1 += 4, o$1 += 4, i$2(s$1, o$1 += 4);
			c$1 = i$2(s$1, o$1 += 4);
			var d = i$2(s$1, o$1 += 4), A = r$2(s$1, o$1 += 4), g = r$2(s$1, o$1 + 2), p = r$2(s$1, o$1 + 4);
			o$1 += 6;
			var m = i$2(s$1, o$1 += 8);
			o$1 += 4, o$1 += A + g + p, UZIP$1._readLocal(s$1, m, a$1, c$1, d, t$1);
		}
		return a$1;
	}, UZIP$1._readLocal = function(e$2, t$1, r$2, i$2, o$1, a$1) {
		var s$1 = UZIP$1.bin.readUshort, f$1 = UZIP$1.bin.readUint;
		f$1(e$2, t$1), s$1(e$2, t$1 += 4), s$1(e$2, t$1 += 2);
		var l$1 = s$1(e$2, t$1 += 2);
		f$1(e$2, t$1 += 2), f$1(e$2, t$1 += 4), t$1 += 4;
		var c$1 = s$1(e$2, t$1 += 8), u = s$1(e$2, t$1 += 2);
		t$1 += 2;
		var h = UZIP$1.bin.readUTF8(e$2, t$1, c$1);
		if (t$1 += c$1, t$1 += u, a$1) r$2[h] = {
			size: o$1,
			csize: i$2
		};
		else {
			var d = new Uint8Array(e$2.buffer, t$1);
			if (0 == l$1) r$2[h] = new Uint8Array(d.buffer.slice(t$1, t$1 + i$2));
			else {
				if (8 != l$1) throw "unknown compression method: " + l$1;
				var A = new Uint8Array(o$1);
				UZIP$1.inflateRaw(d, A), r$2[h] = A;
			}
		}
	}, UZIP$1.inflateRaw = function(e$2, t$1) {
		return UZIP$1.F.inflate(e$2, t$1);
	}, UZIP$1.inflate = function(e$2, t$1) {
		return e$2[0], e$2[1], UZIP$1.inflateRaw(new Uint8Array(e$2.buffer, e$2.byteOffset + 2, e$2.length - 6), t$1);
	}, UZIP$1.deflate = function(e$2, t$1) {
		t$1 ??= { level: 6 };
		var r$2 = 0, i$2 = new Uint8Array(50 + Math.floor(1.1 * e$2.length));
		i$2[r$2] = 120, i$2[r$2 + 1] = 156, r$2 += 2, r$2 = UZIP$1.F.deflateRaw(e$2, i$2, r$2, t$1.level);
		var o$1 = UZIP$1.adler(e$2, 0, e$2.length);
		return i$2[r$2 + 0] = o$1 >>> 24 & 255, i$2[r$2 + 1] = o$1 >>> 16 & 255, i$2[r$2 + 2] = o$1 >>> 8 & 255, i$2[r$2 + 3] = o$1 >>> 0 & 255, new Uint8Array(i$2.buffer, 0, r$2 + 4);
	}, UZIP$1.deflateRaw = function(e$2, t$1) {
		t$1 ??= { level: 6 };
		var r$2 = new Uint8Array(50 + Math.floor(1.1 * e$2.length)), i$2 = UZIP$1.F.deflateRaw(e$2, r$2, i$2, t$1.level);
		return new Uint8Array(r$2.buffer, 0, i$2);
	}, UZIP$1.encode = function(e$2, t$1) {
		t$1 ??= !1;
		var r$2 = 0, i$2 = UZIP$1.bin.writeUint, o$1 = UZIP$1.bin.writeUshort, a$1 = {};
		for (var s$1 in e$2) {
			var f$1 = !UZIP$1._noNeed(s$1) && !t$1, l$1 = e$2[s$1], c$1 = UZIP$1.crc.crc(l$1, 0, l$1.length);
			a$1[s$1] = {
				cpr: f$1,
				usize: l$1.length,
				crc: c$1,
				file: f$1 ? UZIP$1.deflateRaw(l$1) : l$1
			};
		}
		for (var s$1 in a$1) r$2 += a$1[s$1].file.length + 30 + 46 + 2 * UZIP$1.bin.sizeUTF8(s$1);
		r$2 += 22;
		var u = new Uint8Array(r$2), h = 0, d = [];
		for (var s$1 in a$1) {
			var A = a$1[s$1];
			d.push(h), h = UZIP$1._writeHeader(u, h, s$1, A, 0);
		}
		var g = 0, p = h;
		for (var s$1 in a$1) {
			A = a$1[s$1];
			d.push(h), h = UZIP$1._writeHeader(u, h, s$1, A, 1, d[g++]);
		}
		var m = h - p;
		return i$2(u, h, 101010256), h += 4, o$1(u, h += 4, g), o$1(u, h += 2, g), i$2(u, h += 2, m), i$2(u, h += 4, p), h += 4, h += 2, u.buffer;
	}, UZIP$1._noNeed = function(e$2) {
		var t$1 = e$2.split(".").pop().toLowerCase();
		return -1 != "png,jpg,jpeg,zip".indexOf(t$1);
	}, UZIP$1._writeHeader = function(e$2, t$1, r$2, i$2, o$1, a$1) {
		var s$1 = UZIP$1.bin.writeUint, f$1 = UZIP$1.bin.writeUshort, l$1 = i$2.file;
		return s$1(e$2, t$1, 0 == o$1 ? 67324752 : 33639248), t$1 += 4, 1 == o$1 && (t$1 += 2), f$1(e$2, t$1, 20), f$1(e$2, t$1 += 2, 0), f$1(e$2, t$1 += 2, i$2.cpr ? 8 : 0), s$1(e$2, t$1 += 2, 0), s$1(e$2, t$1 += 4, i$2.crc), s$1(e$2, t$1 += 4, l$1.length), s$1(e$2, t$1 += 4, i$2.usize), f$1(e$2, t$1 += 4, UZIP$1.bin.sizeUTF8(r$2)), f$1(e$2, t$1 += 2, 0), t$1 += 2, 1 == o$1 && (t$1 += 2, t$1 += 2, s$1(e$2, t$1 += 6, a$1), t$1 += 4), t$1 += UZIP$1.bin.writeUTF8(e$2, t$1, r$2), 0 == o$1 && (e$2.set(l$1, t$1), t$1 += l$1.length), t$1;
	}, UZIP$1.crc = {
		table: function() {
			for (var e$2 = new Uint32Array(256), t$1 = 0; t$1 < 256; t$1++) {
				for (var r$2 = t$1, i$2 = 0; i$2 < 8; i$2++) 1 & r$2 ? r$2 = 3988292384 ^ r$2 >>> 1 : r$2 >>>= 1;
				e$2[t$1] = r$2;
			}
			return e$2;
		}(),
		update: function(e$2, t$1, r$2, i$2) {
			for (var o$1 = 0; o$1 < i$2; o$1++) e$2 = UZIP$1.crc.table[255 & (e$2 ^ t$1[r$2 + o$1])] ^ e$2 >>> 8;
			return e$2;
		},
		crc: function(e$2, t$1, r$2) {
			return 4294967295 ^ UZIP$1.crc.update(4294967295, e$2, t$1, r$2);
		}
	}, UZIP$1.adler = function(e$2, t$1, r$2) {
		for (var i$2 = 1, o$1 = 0, a$1 = t$1, s$1 = t$1 + r$2; a$1 < s$1;) {
			for (var f$1 = Math.min(a$1 + 5552, s$1); a$1 < f$1;) o$1 += i$2 += e$2[a$1++];
			i$2 %= 65521, o$1 %= 65521;
		}
		return o$1 << 16 | i$2;
	}, UZIP$1.bin = {
		readUshort: function(e$2, t$1) {
			return e$2[t$1] | e$2[t$1 + 1] << 8;
		},
		writeUshort: function(e$2, t$1, r$2) {
			e$2[t$1] = 255 & r$2, e$2[t$1 + 1] = r$2 >> 8 & 255;
		},
		readUint: function(e$2, t$1) {
			return 16777216 * e$2[t$1 + 3] + (e$2[t$1 + 2] << 16 | e$2[t$1 + 1] << 8 | e$2[t$1]);
		},
		writeUint: function(e$2, t$1, r$2) {
			e$2[t$1] = 255 & r$2, e$2[t$1 + 1] = r$2 >> 8 & 255, e$2[t$1 + 2] = r$2 >> 16 & 255, e$2[t$1 + 3] = r$2 >> 24 & 255;
		},
		readASCII: function(e$2, t$1, r$2) {
			for (var i$2 = "", o$1 = 0; o$1 < r$2; o$1++) i$2 += String.fromCharCode(e$2[t$1 + o$1]);
			return i$2;
		},
		writeASCII: function(e$2, t$1, r$2) {
			for (var i$2 = 0; i$2 < r$2.length; i$2++) e$2[t$1 + i$2] = r$2.charCodeAt(i$2);
		},
		pad: function(e$2) {
			return e$2.length < 2 ? "0" + e$2 : e$2;
		},
		readUTF8: function(e$2, t$1, r$2) {
			for (var i$2, o$1 = "", a$1 = 0; a$1 < r$2; a$1++) o$1 += "%" + UZIP$1.bin.pad(e$2[t$1 + a$1].toString(16));
			try {
				i$2 = decodeURIComponent(o$1);
			} catch (i$3) {
				return UZIP$1.bin.readASCII(e$2, t$1, r$2);
			}
			return i$2;
		},
		writeUTF8: function(e$2, t$1, r$2) {
			for (var i$2 = r$2.length, o$1 = 0, a$1 = 0; a$1 < i$2; a$1++) {
				var s$1 = r$2.charCodeAt(a$1);
				if (0 == (4294967168 & s$1)) e$2[t$1 + o$1] = s$1, o$1++;
				else if (0 == (4294965248 & s$1)) e$2[t$1 + o$1] = 192 | s$1 >> 6, e$2[t$1 + o$1 + 1] = 128 | s$1 >> 0 & 63, o$1 += 2;
				else if (0 == (4294901760 & s$1)) e$2[t$1 + o$1] = 224 | s$1 >> 12, e$2[t$1 + o$1 + 1] = 128 | s$1 >> 6 & 63, e$2[t$1 + o$1 + 2] = 128 | s$1 >> 0 & 63, o$1 += 3;
				else {
					if (0 != (4292870144 & s$1)) throw "e";
					e$2[t$1 + o$1] = 240 | s$1 >> 18, e$2[t$1 + o$1 + 1] = 128 | s$1 >> 12 & 63, e$2[t$1 + o$1 + 2] = 128 | s$1 >> 6 & 63, e$2[t$1 + o$1 + 3] = 128 | s$1 >> 0 & 63, o$1 += 4;
				}
			}
			return o$1;
		},
		sizeUTF8: function(e$2) {
			for (var t$1 = e$2.length, r$2 = 0, i$2 = 0; i$2 < t$1; i$2++) {
				var o$1 = e$2.charCodeAt(i$2);
				if (0 == (4294967168 & o$1)) r$2++;
				else if (0 == (4294965248 & o$1)) r$2 += 2;
				else if (0 == (4294901760 & o$1)) r$2 += 3;
				else {
					if (0 != (4292870144 & o$1)) throw "e";
					r$2 += 4;
				}
			}
			return r$2;
		}
	}, UZIP$1.F = {}, UZIP$1.F.deflateRaw = function(e$2, t$1, r$2, i$2) {
		var o$1 = [
			[
				0,
				0,
				0,
				0,
				0
			],
			[
				4,
				4,
				8,
				4,
				0
			],
			[
				4,
				5,
				16,
				8,
				0
			],
			[
				4,
				6,
				16,
				16,
				0
			],
			[
				4,
				10,
				16,
				32,
				0
			],
			[
				8,
				16,
				32,
				32,
				0
			],
			[
				8,
				16,
				128,
				128,
				0
			],
			[
				8,
				32,
				128,
				256,
				0
			],
			[
				32,
				128,
				258,
				1024,
				1
			],
			[
				32,
				258,
				258,
				4096,
				1
			]
		][i$2], a$1 = UZIP$1.F.U, s$1 = UZIP$1.F._goodIndex;
		UZIP$1.F._hash;
		var f$1 = UZIP$1.F._putsE, l$1 = 0, c$1 = r$2 << 3, u = 0, h = e$2.length;
		if (0 == i$2) {
			for (; l$1 < h;) f$1(t$1, c$1, l$1 + (_ = Math.min(65535, h - l$1)) == h ? 1 : 0), c$1 = UZIP$1.F._copyExact(e$2, l$1, _, t$1, c$1 + 8), l$1 += _;
			return c$1 >>> 3;
		}
		var d = a$1.lits, A = a$1.strt, g = a$1.prev, p = 0, m = 0, w = 0, v = 0, b = 0, y = 0;
		for (h > 2 && (A[y = UZIP$1.F._hash(e$2, 0)] = 0), l$1 = 0; l$1 < h; l$1++) {
			if (b = y, l$1 + 1 < h - 2) {
				y = UZIP$1.F._hash(e$2, l$1 + 1);
				var E = l$1 + 1 & 32767;
				g[E] = A[y], A[y] = E;
			}
			if (u <= l$1) {
				(p > 14e3 || m > 26697) && h - l$1 > 100 && (u < l$1 && (d[p] = l$1 - u, p += 2, u = l$1), c$1 = UZIP$1.F._writeBlock(l$1 == h - 1 || u == h ? 1 : 0, d, p, v, e$2, w, l$1 - w, t$1, c$1), p = m = v = 0, w = l$1);
				var F = 0;
				l$1 < h - 2 && (F = UZIP$1.F._bestMatch(e$2, l$1, g, b, Math.min(o$1[2], h - l$1), o$1[3]));
				var _ = F >>> 16, B = 65535 & F;
				if (0 != F) {
					B = 65535 & F;
					var U = s$1(_ = F >>> 16, a$1.of0);
					a$1.lhst[257 + U]++;
					var C = s$1(B, a$1.df0);
					a$1.dhst[C]++, v += a$1.exb[U] + a$1.dxb[C], d[p] = _ << 23 | l$1 - u, d[p + 1] = B << 16 | U << 8 | C, p += 2, u = l$1 + _;
				} else a$1.lhst[e$2[l$1]]++;
				m++;
			}
		}
		for (w == l$1 && 0 != e$2.length || (u < l$1 && (d[p] = l$1 - u, p += 2, u = l$1), c$1 = UZIP$1.F._writeBlock(1, d, p, v, e$2, w, l$1 - w, t$1, c$1), p = 0, m = 0, p = m = v = 0, w = l$1); 0 != (7 & c$1);) c$1++;
		return c$1 >>> 3;
	}, UZIP$1.F._bestMatch = function(e$2, t$1, r$2, i$2, o$1, a$1) {
		var s$1 = 32767 & t$1, f$1 = r$2[s$1], l$1 = s$1 - f$1 + 32768 & 32767;
		if (f$1 == s$1 || i$2 != UZIP$1.F._hash(e$2, t$1 - l$1)) return 0;
		for (var c$1 = 0, u = 0, h = Math.min(32767, t$1); l$1 <= h && 0 != --a$1 && f$1 != s$1;) {
			if (0 == c$1 || e$2[t$1 + c$1] == e$2[t$1 + c$1 - l$1]) {
				var d = UZIP$1.F._howLong(e$2, t$1, l$1);
				if (d > c$1) {
					if (u = l$1, (c$1 = d) >= o$1) break;
					l$1 + 2 < d && (d = l$1 + 2);
					for (var A = 0, g = 0; g < d - 2; g++) {
						var p = t$1 - l$1 + g + 32768 & 32767, m = p - r$2[p] + 32768 & 32767;
						m > A && (A = m, f$1 = p);
					}
				}
			}
			l$1 += (s$1 = f$1) - (f$1 = r$2[s$1]) + 32768 & 32767;
		}
		return c$1 << 16 | u;
	}, UZIP$1.F._howLong = function(e$2, t$1, r$2) {
		if (e$2[t$1] != e$2[t$1 - r$2] || e$2[t$1 + 1] != e$2[t$1 + 1 - r$2] || e$2[t$1 + 2] != e$2[t$1 + 2 - r$2]) return 0;
		var i$2 = t$1, o$1 = Math.min(e$2.length, t$1 + 258);
		for (t$1 += 3; t$1 < o$1 && e$2[t$1] == e$2[t$1 - r$2];) t$1++;
		return t$1 - i$2;
	}, UZIP$1.F._hash = function(e$2, t$1) {
		return (e$2[t$1] << 8 | e$2[t$1 + 1]) + (e$2[t$1 + 2] << 4) & 65535;
	}, UZIP$1.saved = 0, UZIP$1.F._writeBlock = function(e$2, t$1, r$2, i$2, o$1, a$1, s$1, f$1, l$1) {
		var c$1, u, h, d, A, g, p, m, w, v = UZIP$1.F.U, b = UZIP$1.F._putsF, y = UZIP$1.F._putsE;
		v.lhst[256]++, u = (c$1 = UZIP$1.F.getTrees())[0], h = c$1[1], d = c$1[2], A = c$1[3], g = c$1[4], p = c$1[5], m = c$1[6], w = c$1[7];
		var E = 32 + (0 == (l$1 + 3 & 7) ? 0 : 8 - (l$1 + 3 & 7)) + (s$1 << 3), F = i$2 + UZIP$1.F.contSize(v.fltree, v.lhst) + UZIP$1.F.contSize(v.fdtree, v.dhst), _ = i$2 + UZIP$1.F.contSize(v.ltree, v.lhst) + UZIP$1.F.contSize(v.dtree, v.dhst);
		_ += 14 + 3 * p + UZIP$1.F.contSize(v.itree, v.ihst) + (2 * v.ihst[16] + 3 * v.ihst[17] + 7 * v.ihst[18]);
		for (var B = 0; B < 286; B++) v.lhst[B] = 0;
		for (B = 0; B < 30; B++) v.dhst[B] = 0;
		for (B = 0; B < 19; B++) v.ihst[B] = 0;
		var U = E < F && E < _ ? 0 : F < _ ? 1 : 2;
		if (b(f$1, l$1, e$2), b(f$1, l$1 + 1, U), l$1 += 3, 0 == U) {
			for (; 0 != (7 & l$1);) l$1++;
			l$1 = UZIP$1.F._copyExact(o$1, a$1, s$1, f$1, l$1);
		} else {
			var C, I;
			if (1 == U && (C = v.fltree, I = v.fdtree), 2 == U) {
				UZIP$1.F.makeCodes(v.ltree, u), UZIP$1.F.revCodes(v.ltree, u), UZIP$1.F.makeCodes(v.dtree, h), UZIP$1.F.revCodes(v.dtree, h), UZIP$1.F.makeCodes(v.itree, d), UZIP$1.F.revCodes(v.itree, d), C = v.ltree, I = v.dtree, y(f$1, l$1, A - 257), y(f$1, l$1 += 5, g - 1), y(f$1, l$1 += 5, p - 4), l$1 += 4;
				for (var Q = 0; Q < p; Q++) y(f$1, l$1 + 3 * Q, v.itree[1 + (v.ordr[Q] << 1)]);
				l$1 += 3 * p, l$1 = UZIP$1.F._codeTiny(m, v.itree, f$1, l$1), l$1 = UZIP$1.F._codeTiny(w, v.itree, f$1, l$1);
			}
			for (var M = a$1, x = 0; x < r$2; x += 2) {
				for (var S = t$1[x], R = S >>> 23, T = M + (8388607 & S); M < T;) l$1 = UZIP$1.F._writeLit(o$1[M++], C, f$1, l$1);
				if (0 != R) {
					var O = t$1[x + 1], P = O >> 16, H = O >> 8 & 255, L = 255 & O;
					y(f$1, l$1 = UZIP$1.F._writeLit(257 + H, C, f$1, l$1), R - v.of0[H]), l$1 += v.exb[H], b(f$1, l$1 = UZIP$1.F._writeLit(L, I, f$1, l$1), P - v.df0[L]), l$1 += v.dxb[L], M += R;
				}
			}
			l$1 = UZIP$1.F._writeLit(256, C, f$1, l$1);
		}
		return l$1;
	}, UZIP$1.F._copyExact = function(e$2, t$1, r$2, i$2, o$1) {
		var a$1 = o$1 >>> 3;
		return i$2[a$1] = r$2, i$2[a$1 + 1] = r$2 >>> 8, i$2[a$1 + 2] = 255 - i$2[a$1], i$2[a$1 + 3] = 255 - i$2[a$1 + 1], a$1 += 4, i$2.set(new Uint8Array(e$2.buffer, t$1, r$2), a$1), o$1 + (r$2 + 4 << 3);
	}, UZIP$1.F.getTrees = function() {
		for (var e$2 = UZIP$1.F.U, t$1 = UZIP$1.F._hufTree(e$2.lhst, e$2.ltree, 15), r$2 = UZIP$1.F._hufTree(e$2.dhst, e$2.dtree, 15), i$2 = [], o$1 = UZIP$1.F._lenCodes(e$2.ltree, i$2), a$1 = [], s$1 = UZIP$1.F._lenCodes(e$2.dtree, a$1), f$1 = 0; f$1 < i$2.length; f$1 += 2) e$2.ihst[i$2[f$1]]++;
		for (f$1 = 0; f$1 < a$1.length; f$1 += 2) e$2.ihst[a$1[f$1]]++;
		for (var l$1 = UZIP$1.F._hufTree(e$2.ihst, e$2.itree, 7), c$1 = 19; c$1 > 4 && 0 == e$2.itree[1 + (e$2.ordr[c$1 - 1] << 1)];) c$1--;
		return [
			t$1,
			r$2,
			l$1,
			o$1,
			s$1,
			c$1,
			i$2,
			a$1
		];
	}, UZIP$1.F.getSecond = function(e$2) {
		for (var t$1 = [], r$2 = 0; r$2 < e$2.length; r$2 += 2) t$1.push(e$2[r$2 + 1]);
		return t$1;
	}, UZIP$1.F.nonZero = function(e$2) {
		for (var t$1 = "", r$2 = 0; r$2 < e$2.length; r$2 += 2) 0 != e$2[r$2 + 1] && (t$1 += (r$2 >> 1) + ",");
		return t$1;
	}, UZIP$1.F.contSize = function(e$2, t$1) {
		for (var r$2 = 0, i$2 = 0; i$2 < t$1.length; i$2++) r$2 += t$1[i$2] * e$2[1 + (i$2 << 1)];
		return r$2;
	}, UZIP$1.F._codeTiny = function(e$2, t$1, r$2, i$2) {
		for (var o$1 = 0; o$1 < e$2.length; o$1 += 2) {
			var a$1 = e$2[o$1], s$1 = e$2[o$1 + 1];
			i$2 = UZIP$1.F._writeLit(a$1, t$1, r$2, i$2);
			var f$1 = 16 == a$1 ? 2 : 17 == a$1 ? 3 : 7;
			a$1 > 15 && (UZIP$1.F._putsE(r$2, i$2, s$1, f$1), i$2 += f$1);
		}
		return i$2;
	}, UZIP$1.F._lenCodes = function(e$2, t$1) {
		for (var r$2 = e$2.length; 2 != r$2 && 0 == e$2[r$2 - 1];) r$2 -= 2;
		for (var i$2 = 0; i$2 < r$2; i$2 += 2) {
			var o$1 = e$2[i$2 + 1], a$1 = i$2 + 3 < r$2 ? e$2[i$2 + 3] : -1, s$1 = i$2 + 5 < r$2 ? e$2[i$2 + 5] : -1, f$1 = 0 == i$2 ? -1 : e$2[i$2 - 1];
			if (0 == o$1 && a$1 == o$1 && s$1 == o$1) {
				for (var l$1 = i$2 + 5; l$1 + 2 < r$2 && e$2[l$1 + 2] == o$1;) l$1 += 2;
				(c$1 = Math.min(l$1 + 1 - i$2 >>> 1, 138)) < 11 ? t$1.push(17, c$1 - 3) : t$1.push(18, c$1 - 11), i$2 += 2 * c$1 - 2;
			} else if (o$1 == f$1 && a$1 == o$1 && s$1 == o$1) {
				for (l$1 = i$2 + 5; l$1 + 2 < r$2 && e$2[l$1 + 2] == o$1;) l$1 += 2;
				var c$1 = Math.min(l$1 + 1 - i$2 >>> 1, 6);
				t$1.push(16, c$1 - 3), i$2 += 2 * c$1 - 2;
			} else t$1.push(o$1, 0);
		}
		return r$2 >>> 1;
	}, UZIP$1.F._hufTree = function(e$2, t$1, r$2) {
		var i$2 = [], o$1 = e$2.length, a$1 = t$1.length, s$1 = 0;
		for (s$1 = 0; s$1 < a$1; s$1 += 2) t$1[s$1] = 0, t$1[s$1 + 1] = 0;
		for (s$1 = 0; s$1 < o$1; s$1++) 0 != e$2[s$1] && i$2.push({
			lit: s$1,
			f: e$2[s$1]
		});
		var f$1 = i$2.length, l$1 = i$2.slice(0);
		if (0 == f$1) return 0;
		if (1 == f$1) {
			var c$1 = i$2[0].lit;
			l$1 = 0 == c$1 ? 1 : 0;
			return t$1[1 + (c$1 << 1)] = 1, t$1[1 + (l$1 << 1)] = 1, 1;
		}
		i$2.sort((function(e$3, t$2) {
			return e$3.f - t$2.f;
		}));
		var u = i$2[0], h = i$2[1], d = 0, A = 1, g = 2;
		for (i$2[0] = {
			lit: -1,
			f: u.f + h.f,
			l: u,
			r: h,
			d: 0
		}; A != f$1 - 1;) u = d != A && (g == f$1 || i$2[d].f < i$2[g].f) ? i$2[d++] : i$2[g++], h = d != A && (g == f$1 || i$2[d].f < i$2[g].f) ? i$2[d++] : i$2[g++], i$2[A++] = {
			lit: -1,
			f: u.f + h.f,
			l: u,
			r: h
		};
		var p = UZIP$1.F.setDepth(i$2[A - 1], 0);
		for (p > r$2 && (UZIP$1.F.restrictDepth(l$1, r$2, p), p = r$2), s$1 = 0; s$1 < f$1; s$1++) t$1[1 + (l$1[s$1].lit << 1)] = l$1[s$1].d;
		return p;
	}, UZIP$1.F.setDepth = function(e$2, t$1) {
		return -1 != e$2.lit ? (e$2.d = t$1, t$1) : Math.max(UZIP$1.F.setDepth(e$2.l, t$1 + 1), UZIP$1.F.setDepth(e$2.r, t$1 + 1));
	}, UZIP$1.F.restrictDepth = function(e$2, t$1, r$2) {
		var i$2 = 0, o$1 = 1 << r$2 - t$1, a$1 = 0;
		for (e$2.sort((function(e$3, t$2) {
			return t$2.d == e$3.d ? e$3.f - t$2.f : t$2.d - e$3.d;
		})), i$2 = 0; i$2 < e$2.length && e$2[i$2].d > t$1; i$2++) {
			var s$1 = e$2[i$2].d;
			e$2[i$2].d = t$1, a$1 += o$1 - (1 << r$2 - s$1);
		}
		for (a$1 >>>= r$2 - t$1; a$1 > 0;) (s$1 = e$2[i$2].d) < t$1 ? (e$2[i$2].d++, a$1 -= 1 << t$1 - s$1 - 1) : i$2++;
		for (; i$2 >= 0; i$2--) e$2[i$2].d == t$1 && a$1 < 0 && (e$2[i$2].d--, a$1++);
		0 != a$1 && console.log("debt left");
	}, UZIP$1.F._goodIndex = function(e$2, t$1) {
		var r$2 = 0;
		return t$1[16 | r$2] <= e$2 && (r$2 |= 16), t$1[8 | r$2] <= e$2 && (r$2 |= 8), t$1[4 | r$2] <= e$2 && (r$2 |= 4), t$1[2 | r$2] <= e$2 && (r$2 |= 2), t$1[1 | r$2] <= e$2 && (r$2 |= 1), r$2;
	}, UZIP$1.F._writeLit = function(e$2, t$1, r$2, i$2) {
		return UZIP$1.F._putsF(r$2, i$2, t$1[e$2 << 1]), i$2 + t$1[1 + (e$2 << 1)];
	}, UZIP$1.F.inflate = function(e$2, t$1) {
		var r$2 = Uint8Array;
		if (3 == e$2[0] && 0 == e$2[1]) return t$1 || new r$2(0);
		var i$2 = UZIP$1.F, o$1 = i$2._bitsF, a$1 = i$2._bitsE, s$1 = i$2._decodeTiny, f$1 = i$2.makeCodes, l$1 = i$2.codes2map, c$1 = i$2._get17, u = i$2.U, h = null == t$1;
		h && (t$1 = new r$2(e$2.length >>> 2 << 3));
		for (var d, A, g = 0, p = 0, m = 0, w = 0, v = 0, b = 0, y = 0, E = 0, F = 0; 0 == g;) if (g = o$1(e$2, F, 1), p = o$1(e$2, F + 1, 2), F += 3, 0 != p) {
			if (h && (t$1 = UZIP$1.F._check(t$1, E + (1 << 17))), 1 == p && (d = u.flmap, A = u.fdmap, b = 511, y = 31), 2 == p) {
				m = a$1(e$2, F, 5) + 257, w = a$1(e$2, F + 5, 5) + 1, v = a$1(e$2, F + 10, 4) + 4, F += 14;
				for (var _ = 0; _ < 38; _ += 2) u.itree[_] = 0, u.itree[_ + 1] = 0;
				var B = 1;
				for (_ = 0; _ < v; _++) {
					var U = a$1(e$2, F + 3 * _, 3);
					u.itree[1 + (u.ordr[_] << 1)] = U, U > B && (B = U);
				}
				F += 3 * v, f$1(u.itree, B), l$1(u.itree, B, u.imap), d = u.lmap, A = u.dmap, F = s$1(u.imap, (1 << B) - 1, m + w, e$2, F, u.ttree);
				var C = i$2._copyOut(u.ttree, 0, m, u.ltree);
				b = (1 << C) - 1;
				var I = i$2._copyOut(u.ttree, m, w, u.dtree);
				y = (1 << I) - 1, f$1(u.ltree, C), l$1(u.ltree, C, d), f$1(u.dtree, I), l$1(u.dtree, I, A);
			}
			for (;;) {
				var Q = d[c$1(e$2, F) & b];
				F += 15 & Q;
				var M = Q >>> 4;
				if (M >>> 8 == 0) t$1[E++] = M;
				else {
					if (256 == M) break;
					var x = E + M - 254;
					if (M > 264) {
						var S = u.ldef[M - 257];
						x = E + (S >>> 3) + a$1(e$2, F, 7 & S), F += 7 & S;
					}
					var R = A[c$1(e$2, F) & y];
					F += 15 & R;
					var T = R >>> 4, O = u.ddef[T], P = (O >>> 4) + o$1(e$2, F, 15 & O);
					for (F += 15 & O, h && (t$1 = UZIP$1.F._check(t$1, E + (1 << 17))); E < x;) t$1[E] = t$1[E++ - P], t$1[E] = t$1[E++ - P], t$1[E] = t$1[E++ - P], t$1[E] = t$1[E++ - P];
					E = x;
				}
			}
		} else {
			0 != (7 & F) && (F += 8 - (7 & F));
			var H = 4 + (F >>> 3), L = e$2[H - 4] | e$2[H - 3] << 8;
			h && (t$1 = UZIP$1.F._check(t$1, E + L)), t$1.set(new r$2(e$2.buffer, e$2.byteOffset + H, L), E), F = H + L << 3, E += L;
		}
		return t$1.length == E ? t$1 : t$1.slice(0, E);
	}, UZIP$1.F._check = function(e$2, t$1) {
		var r$2 = e$2.length;
		if (t$1 <= r$2) return e$2;
		var i$2 = new Uint8Array(Math.max(r$2 << 1, t$1));
		return i$2.set(e$2, 0), i$2;
	}, UZIP$1.F._decodeTiny = function(e$2, t$1, r$2, i$2, o$1, a$1) {
		for (var s$1 = UZIP$1.F._bitsE, f$1 = UZIP$1.F._get17, l$1 = 0; l$1 < r$2;) {
			var c$1 = e$2[f$1(i$2, o$1) & t$1];
			o$1 += 15 & c$1;
			var u = c$1 >>> 4;
			if (u <= 15) a$1[l$1] = u, l$1++;
			else {
				var h = 0, d = 0;
				16 == u ? (d = 3 + s$1(i$2, o$1, 2), o$1 += 2, h = a$1[l$1 - 1]) : 17 == u ? (d = 3 + s$1(i$2, o$1, 3), o$1 += 3) : 18 == u && (d = 11 + s$1(i$2, o$1, 7), o$1 += 7);
				for (var A = l$1 + d; l$1 < A;) a$1[l$1] = h, l$1++;
			}
		}
		return o$1;
	}, UZIP$1.F._copyOut = function(e$2, t$1, r$2, i$2) {
		for (var o$1 = 0, a$1 = 0, s$1 = i$2.length >>> 1; a$1 < r$2;) {
			var f$1 = e$2[a$1 + t$1];
			i$2[a$1 << 1] = 0, i$2[1 + (a$1 << 1)] = f$1, f$1 > o$1 && (o$1 = f$1), a$1++;
		}
		for (; a$1 < s$1;) i$2[a$1 << 1] = 0, i$2[1 + (a$1 << 1)] = 0, a$1++;
		return o$1;
	}, UZIP$1.F.makeCodes = function(e$2, t$1) {
		for (var r$2, i$2, o$1, a$1, s$1 = UZIP$1.F.U, f$1 = e$2.length, l$1 = s$1.bl_count, c$1 = 0; c$1 <= t$1; c$1++) l$1[c$1] = 0;
		for (c$1 = 1; c$1 < f$1; c$1 += 2) l$1[e$2[c$1]]++;
		var u = s$1.next_code;
		for (r$2 = 0, l$1[0] = 0, i$2 = 1; i$2 <= t$1; i$2++) r$2 = r$2 + l$1[i$2 - 1] << 1, u[i$2] = r$2;
		for (o$1 = 0; o$1 < f$1; o$1 += 2) 0 != (a$1 = e$2[o$1 + 1]) && (e$2[o$1] = u[a$1], u[a$1]++);
	}, UZIP$1.F.codes2map = function(e$2, t$1, r$2) {
		for (var i$2 = e$2.length, o$1 = UZIP$1.F.U.rev15, a$1 = 0; a$1 < i$2; a$1 += 2) if (0 != e$2[a$1 + 1]) for (var s$1 = a$1 >> 1, f$1 = e$2[a$1 + 1], l$1 = s$1 << 4 | f$1, c$1 = t$1 - f$1, u = e$2[a$1] << c$1, h = u + (1 << c$1); u != h;) r$2[o$1[u] >>> 15 - t$1] = l$1, u++;
	}, UZIP$1.F.revCodes = function(e$2, t$1) {
		for (var r$2 = UZIP$1.F.U.rev15, i$2 = 15 - t$1, o$1 = 0; o$1 < e$2.length; o$1 += 2) e$2[o$1] = r$2[e$2[o$1] << t$1 - e$2[o$1 + 1]] >>> i$2;
	}, UZIP$1.F._putsE = function(e$2, t$1, r$2) {
		r$2 <<= 7 & t$1;
		var i$2 = t$1 >>> 3;
		e$2[i$2] |= r$2, e$2[i$2 + 1] |= r$2 >>> 8;
	}, UZIP$1.F._putsF = function(e$2, t$1, r$2) {
		r$2 <<= 7 & t$1;
		var i$2 = t$1 >>> 3;
		e$2[i$2] |= r$2, e$2[i$2 + 1] |= r$2 >>> 8, e$2[i$2 + 2] |= r$2 >>> 16;
	}, UZIP$1.F._bitsE = function(e$2, t$1, r$2) {
		return (e$2[t$1 >>> 3] | e$2[1 + (t$1 >>> 3)] << 8) >>> (7 & t$1) & (1 << r$2) - 1;
	}, UZIP$1.F._bitsF = function(e$2, t$1, r$2) {
		return (e$2[t$1 >>> 3] | e$2[1 + (t$1 >>> 3)] << 8 | e$2[2 + (t$1 >>> 3)] << 16) >>> (7 & t$1) & (1 << r$2) - 1;
	}, UZIP$1.F._get17 = function(e$2, t$1) {
		return (e$2[t$1 >>> 3] | e$2[1 + (t$1 >>> 3)] << 8 | e$2[2 + (t$1 >>> 3)] << 16) >>> (7 & t$1);
	}, UZIP$1.F._get25 = function(e$2, t$1) {
		return (e$2[t$1 >>> 3] | e$2[1 + (t$1 >>> 3)] << 8 | e$2[2 + (t$1 >>> 3)] << 16 | e$2[3 + (t$1 >>> 3)] << 24) >>> (7 & t$1);
	}, UZIP$1.F.U = (r$1 = Uint16Array, i$1 = Uint32Array, {
		next_code: new r$1(16),
		bl_count: new r$1(16),
		ordr: [
			16,
			17,
			18,
			0,
			8,
			7,
			9,
			6,
			10,
			5,
			11,
			4,
			12,
			3,
			13,
			2,
			14,
			1,
			15
		],
		of0: [
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			13,
			15,
			17,
			19,
			23,
			27,
			31,
			35,
			43,
			51,
			59,
			67,
			83,
			99,
			115,
			131,
			163,
			195,
			227,
			258,
			999,
			999,
			999
		],
		exb: [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			1,
			1,
			1,
			2,
			2,
			2,
			2,
			3,
			3,
			3,
			3,
			4,
			4,
			4,
			4,
			5,
			5,
			5,
			5,
			0,
			0,
			0,
			0
		],
		ldef: new r$1(32),
		df0: [
			1,
			2,
			3,
			4,
			5,
			7,
			9,
			13,
			17,
			25,
			33,
			49,
			65,
			97,
			129,
			193,
			257,
			385,
			513,
			769,
			1025,
			1537,
			2049,
			3073,
			4097,
			6145,
			8193,
			12289,
			16385,
			24577,
			65535,
			65535
		],
		dxb: [
			0,
			0,
			0,
			0,
			1,
			1,
			2,
			2,
			3,
			3,
			4,
			4,
			5,
			5,
			6,
			6,
			7,
			7,
			8,
			8,
			9,
			9,
			10,
			10,
			11,
			11,
			12,
			12,
			13,
			13,
			0,
			0
		],
		ddef: new i$1(32),
		flmap: new r$1(512),
		fltree: [],
		fdmap: new r$1(32),
		fdtree: [],
		lmap: new r$1(32768),
		ltree: [],
		ttree: [],
		dmap: new r$1(32768),
		dtree: [],
		imap: new r$1(512),
		itree: [],
		rev15: new r$1(32768),
		lhst: new i$1(286),
		dhst: new i$1(30),
		ihst: new i$1(19),
		lits: new i$1(15e3),
		strt: new r$1(65536),
		prev: new r$1(32768)
	}), function() {
		for (var e$2 = UZIP$1.F.U, t$1 = 0; t$1 < 32768; t$1++) {
			var r$2 = t$1;
			r$2 = (4278255360 & (r$2 = (4042322160 & (r$2 = (3435973836 & (r$2 = (2863311530 & r$2) >>> 1 | (1431655765 & r$2) << 1)) >>> 2 | (858993459 & r$2) << 2)) >>> 4 | (252645135 & r$2) << 4)) >>> 8 | (16711935 & r$2) << 8, e$2.rev15[t$1] = (r$2 >>> 16 | r$2 << 16) >>> 17;
		}
		function pushV(e$3, t$2, r$3) {
			for (; 0 != t$2--;) e$3.push(0, r$3);
		}
		for (t$1 = 0; t$1 < 32; t$1++) e$2.ldef[t$1] = e$2.of0[t$1] << 3 | e$2.exb[t$1], e$2.ddef[t$1] = e$2.df0[t$1] << 4 | e$2.dxb[t$1];
		pushV(e$2.fltree, 144, 8), pushV(e$2.fltree, 112, 9), pushV(e$2.fltree, 24, 7), pushV(e$2.fltree, 8, 8), UZIP$1.F.makeCodes(e$2.fltree, 9), UZIP$1.F.codes2map(e$2.fltree, 9, e$2.flmap), UZIP$1.F.revCodes(e$2.fltree, 9), pushV(e$2.fdtree, 32, 5), UZIP$1.F.makeCodes(e$2.fdtree, 5), UZIP$1.F.codes2map(e$2.fdtree, 5, e$2.fdmap), UZIP$1.F.revCodes(e$2.fdtree, 5), pushV(e$2.itree, 19, 0), pushV(e$2.ltree, 286, 0), pushV(e$2.dtree, 30, 0), pushV(e$2.ttree, 320, 0);
	}();
})();
var UZIP = _mergeNamespaces({
	__proto__: null,
	default: e
}, [e]);
var UPNG = function() {
	var e$1 = {
		nextZero(e$2, t$2) {
			for (; 0 != e$2[t$2];) t$2++;
			return t$2;
		},
		readUshort: (e$2, t$2) => e$2[t$2] << 8 | e$2[t$2 + 1],
		writeUshort(e$2, t$2, r$1) {
			e$2[t$2] = r$1 >> 8 & 255, e$2[t$2 + 1] = 255 & r$1;
		},
		readUint: (e$2, t$2) => 16777216 * e$2[t$2] + (e$2[t$2 + 1] << 16 | e$2[t$2 + 2] << 8 | e$2[t$2 + 3]),
		writeUint(e$2, t$2, r$1) {
			e$2[t$2] = r$1 >> 24 & 255, e$2[t$2 + 1] = r$1 >> 16 & 255, e$2[t$2 + 2] = r$1 >> 8 & 255, e$2[t$2 + 3] = 255 & r$1;
		},
		readASCII(e$2, t$2, r$1) {
			let i$1 = "";
			for (let o$1 = 0; o$1 < r$1; o$1++) i$1 += String.fromCharCode(e$2[t$2 + o$1]);
			return i$1;
		},
		writeASCII(e$2, t$2, r$1) {
			for (let i$1 = 0; i$1 < r$1.length; i$1++) e$2[t$2 + i$1] = r$1.charCodeAt(i$1);
		},
		readBytes(e$2, t$2, r$1) {
			const i$1 = [];
			for (let o$1 = 0; o$1 < r$1; o$1++) i$1.push(e$2[t$2 + o$1]);
			return i$1;
		},
		pad: (e$2) => e$2.length < 2 ? `0${e$2}` : e$2,
		readUTF8(t$2, r$1, i$1) {
			let o$1, a$1 = "";
			for (let o$2 = 0; o$2 < i$1; o$2++) a$1 += `%${e$1.pad(t$2[r$1 + o$2].toString(16))}`;
			try {
				o$1 = decodeURIComponent(a$1);
			} catch (o$2) {
				return e$1.readASCII(t$2, r$1, i$1);
			}
			return o$1;
		}
	};
	function decodeImage(t$2, r$1, i$1, o$1) {
		const a$1 = r$1 * i$1, s$1 = _getBPP(o$1), f$1 = Math.ceil(r$1 * s$1 / 8), l$1 = new Uint8Array(4 * a$1), c$1 = new Uint32Array(l$1.buffer), { ctype: u } = o$1, { depth: h } = o$1, d = e$1.readUshort;
		if (6 == u) {
			const e$2 = a$1 << 2;
			if (8 == h) for (var A = 0; A < e$2; A += 4) l$1[A] = t$2[A], l$1[A + 1] = t$2[A + 1], l$1[A + 2] = t$2[A + 2], l$1[A + 3] = t$2[A + 3];
			if (16 == h) for (A = 0; A < e$2; A++) l$1[A] = t$2[A << 1];
		} else if (2 == u) {
			const e$2 = o$1.tabs.tRNS;
			if (null == e$2) {
				if (8 == h) for (A = 0; A < a$1; A++) {
					var g = 3 * A;
					c$1[A] = 255 << 24 | t$2[g + 2] << 16 | t$2[g + 1] << 8 | t$2[g];
				}
				if (16 == h) for (A = 0; A < a$1; A++) {
					g = 6 * A;
					c$1[A] = 255 << 24 | t$2[g + 4] << 16 | t$2[g + 2] << 8 | t$2[g];
				}
			} else {
				var p = e$2[0];
				const r$2 = e$2[1], i$2 = e$2[2];
				if (8 == h) for (A = 0; A < a$1; A++) {
					var m = A << 2;
					g = 3 * A;
					c$1[A] = 255 << 24 | t$2[g + 2] << 16 | t$2[g + 1] << 8 | t$2[g], t$2[g] == p && t$2[g + 1] == r$2 && t$2[g + 2] == i$2 && (l$1[m + 3] = 0);
				}
				if (16 == h) for (A = 0; A < a$1; A++) {
					m = A << 2, g = 6 * A;
					c$1[A] = 255 << 24 | t$2[g + 4] << 16 | t$2[g + 2] << 8 | t$2[g], d(t$2, g) == p && d(t$2, g + 2) == r$2 && d(t$2, g + 4) == i$2 && (l$1[m + 3] = 0);
				}
			}
		} else if (3 == u) {
			const e$2 = o$1.tabs.PLTE, s$2 = o$1.tabs.tRNS, c$2 = s$2 ? s$2.length : 0;
			if (1 == h) for (var w = 0; w < i$1; w++) {
				var v = w * f$1, b = w * r$1;
				for (A = 0; A < r$1; A++) {
					m = b + A << 2;
					var y = 3 * (E = t$2[v + (A >> 3)] >> 7 - ((7 & A) << 0) & 1);
					l$1[m] = e$2[y], l$1[m + 1] = e$2[y + 1], l$1[m + 2] = e$2[y + 2], l$1[m + 3] = E < c$2 ? s$2[E] : 255;
				}
			}
			if (2 == h) for (w = 0; w < i$1; w++) for (v = w * f$1, b = w * r$1, A = 0; A < r$1; A++) {
				m = b + A << 2, y = 3 * (E = t$2[v + (A >> 2)] >> 6 - ((3 & A) << 1) & 3);
				l$1[m] = e$2[y], l$1[m + 1] = e$2[y + 1], l$1[m + 2] = e$2[y + 2], l$1[m + 3] = E < c$2 ? s$2[E] : 255;
			}
			if (4 == h) for (w = 0; w < i$1; w++) for (v = w * f$1, b = w * r$1, A = 0; A < r$1; A++) {
				m = b + A << 2, y = 3 * (E = t$2[v + (A >> 1)] >> 4 - ((1 & A) << 2) & 15);
				l$1[m] = e$2[y], l$1[m + 1] = e$2[y + 1], l$1[m + 2] = e$2[y + 2], l$1[m + 3] = E < c$2 ? s$2[E] : 255;
			}
			if (8 == h) for (A = 0; A < a$1; A++) {
				var E;
				m = A << 2, y = 3 * (E = t$2[A]);
				l$1[m] = e$2[y], l$1[m + 1] = e$2[y + 1], l$1[m + 2] = e$2[y + 2], l$1[m + 3] = E < c$2 ? s$2[E] : 255;
			}
		} else if (4 == u) {
			if (8 == h) for (A = 0; A < a$1; A++) {
				m = A << 2;
				var F = t$2[_ = A << 1];
				l$1[m] = F, l$1[m + 1] = F, l$1[m + 2] = F, l$1[m + 3] = t$2[_ + 1];
			}
			if (16 == h) for (A = 0; A < a$1; A++) {
				var _;
				m = A << 2, F = t$2[_ = A << 2];
				l$1[m] = F, l$1[m + 1] = F, l$1[m + 2] = F, l$1[m + 3] = t$2[_ + 2];
			}
		} else if (0 == u) for (p = o$1.tabs.tRNS ? o$1.tabs.tRNS : -1, w = 0; w < i$1; w++) {
			const e$2 = w * f$1, i$2 = w * r$1;
			if (1 == h) for (var B = 0; B < r$1; B++) {
				var U = (F = 255 * (t$2[e$2 + (B >>> 3)] >>> 7 - (7 & B) & 1)) == 255 * p ? 0 : 255;
				c$1[i$2 + B] = U << 24 | F << 16 | F << 8 | F;
			}
			else if (2 == h) for (B = 0; B < r$1; B++) {
				U = (F = 85 * (t$2[e$2 + (B >>> 2)] >>> 6 - ((3 & B) << 1) & 3)) == 85 * p ? 0 : 255;
				c$1[i$2 + B] = U << 24 | F << 16 | F << 8 | F;
			}
			else if (4 == h) for (B = 0; B < r$1; B++) {
				U = (F = 17 * (t$2[e$2 + (B >>> 1)] >>> 4 - ((1 & B) << 2) & 15)) == 17 * p ? 0 : 255;
				c$1[i$2 + B] = U << 24 | F << 16 | F << 8 | F;
			}
			else if (8 == h) for (B = 0; B < r$1; B++) {
				U = (F = t$2[e$2 + B]) == p ? 0 : 255;
				c$1[i$2 + B] = U << 24 | F << 16 | F << 8 | F;
			}
			else if (16 == h) for (B = 0; B < r$1; B++) {
				F = t$2[e$2 + (B << 1)], U = d(t$2, e$2 + (B << 1)) == p ? 0 : 255;
				c$1[i$2 + B] = U << 24 | F << 16 | F << 8 | F;
			}
		}
		return l$1;
	}
	function _decompress(e$2, r$1, i$1, o$1) {
		const a$1 = _getBPP(e$2), s$1 = Math.ceil(i$1 * a$1 / 8), f$1 = new Uint8Array((s$1 + 1 + e$2.interlace) * o$1);
		return r$1 = e$2.tabs.CgBI ? t$1(r$1, f$1) : _inflate(r$1, f$1), 0 == e$2.interlace ? r$1 = _filterZero(r$1, e$2, 0, i$1, o$1) : 1 == e$2.interlace && (r$1 = function _readInterlace(e$3, t$2) {
			const r$2 = t$2.width, i$2 = t$2.height, o$2 = _getBPP(t$2), a$2 = o$2 >> 3, s$2 = Math.ceil(r$2 * o$2 / 8), f$2 = new Uint8Array(i$2 * s$2);
			let l$1 = 0;
			const c$1 = [
				0,
				0,
				4,
				0,
				2,
				0,
				1
			], u = [
				0,
				4,
				0,
				2,
				0,
				1,
				0
			], h = [
				8,
				8,
				8,
				4,
				4,
				2,
				2
			], d = [
				8,
				8,
				4,
				4,
				2,
				2,
				1
			];
			let A = 0;
			for (; A < 7;) {
				const p = h[A], m = d[A];
				let w = 0, v = 0, b = c$1[A];
				for (; b < i$2;) b += p, v++;
				let y = u[A];
				for (; y < r$2;) y += m, w++;
				const E = Math.ceil(w * o$2 / 8);
				_filterZero(e$3, t$2, l$1, w, v);
				let F = 0, _ = c$1[A];
				for (; _ < i$2;) {
					let t$3 = u[A], i$3 = l$1 + F * E << 3;
					for (; t$3 < r$2;) {
						var g;
						if (1 == o$2) g = (g = e$3[i$3 >> 3]) >> 7 - (7 & i$3) & 1, f$2[_ * s$2 + (t$3 >> 3)] |= g << 7 - ((7 & t$3) << 0);
						if (2 == o$2) g = (g = e$3[i$3 >> 3]) >> 6 - (7 & i$3) & 3, f$2[_ * s$2 + (t$3 >> 2)] |= g << 6 - ((3 & t$3) << 1);
						if (4 == o$2) g = (g = e$3[i$3 >> 3]) >> 4 - (7 & i$3) & 15, f$2[_ * s$2 + (t$3 >> 1)] |= g << 4 - ((1 & t$3) << 2);
						if (o$2 >= 8) {
							const r$3 = _ * s$2 + t$3 * a$2;
							for (let t$4 = 0; t$4 < a$2; t$4++) f$2[r$3 + t$4] = e$3[(i$3 >> 3) + t$4];
						}
						i$3 += o$2, t$3 += m;
					}
					F++, _ += p;
				}
				w * v != 0 && (l$1 += v * (1 + E)), A += 1;
			}
			return f$2;
		}(r$1, e$2)), r$1;
	}
	function _inflate(e$2, r$1) {
		return t$1(new Uint8Array(e$2.buffer, 2, e$2.length - 6), r$1);
	}
	var t$1 = function() {
		const e$2 = { H: {} };
		return e$2.H.N = function(t$2, r$1) {
			const i$1 = Uint8Array;
			let o$1, a$1, s$1 = 0, f$1 = 0, l$1 = 0, c$1 = 0, u = 0, h = 0, d = 0, A = 0, g = 0;
			if (3 == t$2[0] && 0 == t$2[1]) return r$1 || new i$1(0);
			const p = e$2.H, m = p.b, w = p.e, v = p.R, b = p.n, y = p.A, E = p.Z, F = p.m, _ = null == r$1;
			for (_ && (r$1 = new i$1(t$2.length >>> 2 << 5)); 0 == s$1;) if (s$1 = m(t$2, g, 1), f$1 = m(t$2, g + 1, 2), g += 3, 0 != f$1) {
				if (_ && (r$1 = e$2.H.W(r$1, A + (1 << 17))), 1 == f$1 && (o$1 = F.J, a$1 = F.h, h = 511, d = 31), 2 == f$1) {
					l$1 = w(t$2, g, 5) + 257, c$1 = w(t$2, g + 5, 5) + 1, u = w(t$2, g + 10, 4) + 4, g += 14;
					let e$3 = 1;
					for (var B = 0; B < 38; B += 2) F.Q[B] = 0, F.Q[B + 1] = 0;
					for (B = 0; B < u; B++) {
						const r$3 = w(t$2, g + 3 * B, 3);
						F.Q[1 + (F.X[B] << 1)] = r$3, r$3 > e$3 && (e$3 = r$3);
					}
					g += 3 * u, b(F.Q, e$3), y(F.Q, e$3, F.u), o$1 = F.w, a$1 = F.d, g = v(F.u, (1 << e$3) - 1, l$1 + c$1, t$2, g, F.v);
					const r$2 = p.V(F.v, 0, l$1, F.C);
					h = (1 << r$2) - 1;
					const i$2 = p.V(F.v, l$1, c$1, F.D);
					d = (1 << i$2) - 1, b(F.C, r$2), y(F.C, r$2, o$1), b(F.D, i$2), y(F.D, i$2, a$1);
				}
				for (;;) {
					const e$3 = o$1[E(t$2, g) & h];
					g += 15 & e$3;
					const i$2 = e$3 >>> 4;
					if (i$2 >>> 8 == 0) r$1[A++] = i$2;
					else {
						if (256 == i$2) break;
						{
							let e$4 = A + i$2 - 254;
							if (i$2 > 264) {
								const r$2 = F.q[i$2 - 257];
								e$4 = A + (r$2 >>> 3) + w(t$2, g, 7 & r$2), g += 7 & r$2;
							}
							const o$2 = a$1[E(t$2, g) & d];
							g += 15 & o$2;
							const s$2 = o$2 >>> 4, f$2 = F.c[s$2], l$2 = (f$2 >>> 4) + m(t$2, g, 15 & f$2);
							for (g += 15 & f$2; A < e$4;) r$1[A] = r$1[A++ - l$2], r$1[A] = r$1[A++ - l$2], r$1[A] = r$1[A++ - l$2], r$1[A] = r$1[A++ - l$2];
							A = e$4;
						}
					}
				}
			} else {
				0 != (7 & g) && (g += 8 - (7 & g));
				const o$2 = 4 + (g >>> 3), a$2 = t$2[o$2 - 4] | t$2[o$2 - 3] << 8;
				_ && (r$1 = e$2.H.W(r$1, A + a$2)), r$1.set(new i$1(t$2.buffer, t$2.byteOffset + o$2, a$2), A), g = o$2 + a$2 << 3, A += a$2;
			}
			return r$1.length == A ? r$1 : r$1.slice(0, A);
		}, e$2.H.W = function(e$3, t$2) {
			const r$1 = e$3.length;
			if (t$2 <= r$1) return e$3;
			const i$1 = new Uint8Array(r$1 << 1);
			return i$1.set(e$3, 0), i$1;
		}, e$2.H.R = function(t$2, r$1, i$1, o$1, a$1, s$1) {
			const f$1 = e$2.H.e, l$1 = e$2.H.Z;
			let c$1 = 0;
			for (; c$1 < i$1;) {
				const e$3 = t$2[l$1(o$1, a$1) & r$1];
				a$1 += 15 & e$3;
				const i$2 = e$3 >>> 4;
				if (i$2 <= 15) s$1[c$1] = i$2, c$1++;
				else {
					let e$4 = 0, t$3 = 0;
					16 == i$2 ? (t$3 = 3 + f$1(o$1, a$1, 2), a$1 += 2, e$4 = s$1[c$1 - 1]) : 17 == i$2 ? (t$3 = 3 + f$1(o$1, a$1, 3), a$1 += 3) : 18 == i$2 && (t$3 = 11 + f$1(o$1, a$1, 7), a$1 += 7);
					const r$2 = c$1 + t$3;
					for (; c$1 < r$2;) s$1[c$1] = e$4, c$1++;
				}
			}
			return a$1;
		}, e$2.H.V = function(e$3, t$2, r$1, i$1) {
			let o$1 = 0, a$1 = 0;
			const s$1 = i$1.length >>> 1;
			for (; a$1 < r$1;) {
				const r$2 = e$3[a$1 + t$2];
				i$1[a$1 << 1] = 0, i$1[1 + (a$1 << 1)] = r$2, r$2 > o$1 && (o$1 = r$2), a$1++;
			}
			for (; a$1 < s$1;) i$1[a$1 << 1] = 0, i$1[1 + (a$1 << 1)] = 0, a$1++;
			return o$1;
		}, e$2.H.n = function(t$2, r$1) {
			const i$1 = e$2.H.m, o$1 = t$2.length;
			let a$1, s$1, f$1;
			let l$1;
			const c$1 = i$1.j;
			for (var u = 0; u <= r$1; u++) c$1[u] = 0;
			for (u = 1; u < o$1; u += 2) c$1[t$2[u]]++;
			const h = i$1.K;
			for (a$1 = 0, c$1[0] = 0, s$1 = 1; s$1 <= r$1; s$1++) a$1 = a$1 + c$1[s$1 - 1] << 1, h[s$1] = a$1;
			for (f$1 = 0; f$1 < o$1; f$1 += 2) l$1 = t$2[f$1 + 1], 0 != l$1 && (t$2[f$1] = h[l$1], h[l$1]++);
		}, e$2.H.A = function(t$2, r$1, i$1) {
			const o$1 = t$2.length, a$1 = e$2.H.m.r;
			for (let e$3 = 0; e$3 < o$1; e$3 += 2) if (0 != t$2[e$3 + 1]) {
				const o$2 = e$3 >> 1, s$1 = t$2[e$3 + 1], f$1 = o$2 << 4 | s$1, l$1 = r$1 - s$1;
				let c$1 = t$2[e$3] << l$1;
				const u = c$1 + (1 << l$1);
				for (; c$1 != u;) i$1[a$1[c$1] >>> 15 - r$1] = f$1, c$1++;
			}
		}, e$2.H.l = function(t$2, r$1) {
			const i$1 = e$2.H.m.r, o$1 = 15 - r$1;
			for (let e$3 = 0; e$3 < t$2.length; e$3 += 2) t$2[e$3] = i$1[t$2[e$3] << r$1 - t$2[e$3 + 1]] >>> o$1;
		}, e$2.H.M = function(e$3, t$2, r$1) {
			r$1 <<= 7 & t$2;
			const i$1 = t$2 >>> 3;
			e$3[i$1] |= r$1, e$3[i$1 + 1] |= r$1 >>> 8;
		}, e$2.H.I = function(e$3, t$2, r$1) {
			r$1 <<= 7 & t$2;
			const i$1 = t$2 >>> 3;
			e$3[i$1] |= r$1, e$3[i$1 + 1] |= r$1 >>> 8, e$3[i$1 + 2] |= r$1 >>> 16;
		}, e$2.H.e = function(e$3, t$2, r$1) {
			return (e$3[t$2 >>> 3] | e$3[1 + (t$2 >>> 3)] << 8) >>> (7 & t$2) & (1 << r$1) - 1;
		}, e$2.H.b = function(e$3, t$2, r$1) {
			return (e$3[t$2 >>> 3] | e$3[1 + (t$2 >>> 3)] << 8 | e$3[2 + (t$2 >>> 3)] << 16) >>> (7 & t$2) & (1 << r$1) - 1;
		}, e$2.H.Z = function(e$3, t$2) {
			return (e$3[t$2 >>> 3] | e$3[1 + (t$2 >>> 3)] << 8 | e$3[2 + (t$2 >>> 3)] << 16) >>> (7 & t$2);
		}, e$2.H.i = function(e$3, t$2) {
			return (e$3[t$2 >>> 3] | e$3[1 + (t$2 >>> 3)] << 8 | e$3[2 + (t$2 >>> 3)] << 16 | e$3[3 + (t$2 >>> 3)] << 24) >>> (7 & t$2);
		}, e$2.H.m = function() {
			const e$3 = Uint16Array, t$2 = Uint32Array;
			return {
				K: new e$3(16),
				j: new e$3(16),
				X: [
					16,
					17,
					18,
					0,
					8,
					7,
					9,
					6,
					10,
					5,
					11,
					4,
					12,
					3,
					13,
					2,
					14,
					1,
					15
				],
				S: [
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					13,
					15,
					17,
					19,
					23,
					27,
					31,
					35,
					43,
					51,
					59,
					67,
					83,
					99,
					115,
					131,
					163,
					195,
					227,
					258,
					999,
					999,
					999
				],
				T: [
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					2,
					2,
					2,
					2,
					3,
					3,
					3,
					3,
					4,
					4,
					4,
					4,
					5,
					5,
					5,
					5,
					0,
					0,
					0,
					0
				],
				q: new e$3(32),
				p: [
					1,
					2,
					3,
					4,
					5,
					7,
					9,
					13,
					17,
					25,
					33,
					49,
					65,
					97,
					129,
					193,
					257,
					385,
					513,
					769,
					1025,
					1537,
					2049,
					3073,
					4097,
					6145,
					8193,
					12289,
					16385,
					24577,
					65535,
					65535
				],
				z: [
					0,
					0,
					0,
					0,
					1,
					1,
					2,
					2,
					3,
					3,
					4,
					4,
					5,
					5,
					6,
					6,
					7,
					7,
					8,
					8,
					9,
					9,
					10,
					10,
					11,
					11,
					12,
					12,
					13,
					13,
					0,
					0
				],
				c: new t$2(32),
				J: new e$3(512),
				_: [],
				h: new e$3(32),
				$: [],
				w: new e$3(32768),
				C: [],
				v: [],
				d: new e$3(32768),
				D: [],
				u: new e$3(512),
				Q: [],
				r: new e$3(32768),
				s: new t$2(286),
				Y: new t$2(30),
				a: new t$2(19),
				t: new t$2(15e3),
				k: new e$3(65536),
				g: new e$3(32768)
			};
		}(), function() {
			const t$2 = e$2.H.m;
			for (var r$1 = 0; r$1 < 32768; r$1++) {
				let e$3 = r$1;
				e$3 = (2863311530 & e$3) >>> 1 | (1431655765 & e$3) << 1, e$3 = (3435973836 & e$3) >>> 2 | (858993459 & e$3) << 2, e$3 = (4042322160 & e$3) >>> 4 | (252645135 & e$3) << 4, e$3 = (4278255360 & e$3) >>> 8 | (16711935 & e$3) << 8, t$2.r[r$1] = (e$3 >>> 16 | e$3 << 16) >>> 17;
			}
			function n(e$3, t$3, r$2) {
				for (; 0 != t$3--;) e$3.push(0, r$2);
			}
			for (r$1 = 0; r$1 < 32; r$1++) t$2.q[r$1] = t$2.S[r$1] << 3 | t$2.T[r$1], t$2.c[r$1] = t$2.p[r$1] << 4 | t$2.z[r$1];
			n(t$2._, 144, 8), n(t$2._, 112, 9), n(t$2._, 24, 7), n(t$2._, 8, 8), e$2.H.n(t$2._, 9), e$2.H.A(t$2._, 9, t$2.J), e$2.H.l(t$2._, 9), n(t$2.$, 32, 5), e$2.H.n(t$2.$, 5), e$2.H.A(t$2.$, 5, t$2.h), e$2.H.l(t$2.$, 5), n(t$2.Q, 19, 0), n(t$2.C, 286, 0), n(t$2.D, 30, 0), n(t$2.v, 320, 0);
		}(), e$2.H.N;
	}();
	function _getBPP(e$2) {
		return [
			1,
			null,
			3,
			1,
			2,
			null,
			4
		][e$2.ctype] * e$2.depth;
	}
	function _filterZero(e$2, t$2, r$1, i$1, o$1) {
		let a$1 = _getBPP(t$2);
		const s$1 = Math.ceil(i$1 * a$1 / 8);
		let f$1, l$1;
		a$1 = Math.ceil(a$1 / 8);
		let c$1 = e$2[r$1], u = 0;
		if (c$1 > 1 && (e$2[r$1] = [
			0,
			0,
			1
		][c$1 - 2]), 3 == c$1) for (u = a$1; u < s$1; u++) e$2[u + 1] = e$2[u + 1] + (e$2[u + 1 - a$1] >>> 1) & 255;
		for (let t$3 = 0; t$3 < o$1; t$3++) if (f$1 = r$1 + t$3 * s$1, l$1 = f$1 + t$3 + 1, c$1 = e$2[l$1 - 1], u = 0, 0 == c$1) for (; u < s$1; u++) e$2[f$1 + u] = e$2[l$1 + u];
		else if (1 == c$1) {
			for (; u < a$1; u++) e$2[f$1 + u] = e$2[l$1 + u];
			for (; u < s$1; u++) e$2[f$1 + u] = e$2[l$1 + u] + e$2[f$1 + u - a$1];
		} else if (2 == c$1) for (; u < s$1; u++) e$2[f$1 + u] = e$2[l$1 + u] + e$2[f$1 + u - s$1];
		else if (3 == c$1) {
			for (; u < a$1; u++) e$2[f$1 + u] = e$2[l$1 + u] + (e$2[f$1 + u - s$1] >>> 1);
			for (; u < s$1; u++) e$2[f$1 + u] = e$2[l$1 + u] + (e$2[f$1 + u - s$1] + e$2[f$1 + u - a$1] >>> 1);
		} else {
			for (; u < a$1; u++) e$2[f$1 + u] = e$2[l$1 + u] + _paeth(0, e$2[f$1 + u - s$1], 0);
			for (; u < s$1; u++) e$2[f$1 + u] = e$2[l$1 + u] + _paeth(e$2[f$1 + u - a$1], e$2[f$1 + u - s$1], e$2[f$1 + u - a$1 - s$1]);
		}
		return e$2;
	}
	function _paeth(e$2, t$2, r$1) {
		const i$1 = e$2 + t$2 - r$1, o$1 = i$1 - e$2, a$1 = i$1 - t$2, s$1 = i$1 - r$1;
		return o$1 * o$1 <= a$1 * a$1 && o$1 * o$1 <= s$1 * s$1 ? e$2 : a$1 * a$1 <= s$1 * s$1 ? t$2 : r$1;
	}
	function _IHDR(t$2, r$1, i$1) {
		i$1.width = e$1.readUint(t$2, r$1), r$1 += 4, i$1.height = e$1.readUint(t$2, r$1), r$1 += 4, i$1.depth = t$2[r$1], r$1++, i$1.ctype = t$2[r$1], r$1++, i$1.compress = t$2[r$1], r$1++, i$1.filter = t$2[r$1], r$1++, i$1.interlace = t$2[r$1], r$1++;
	}
	function _copyTile(e$2, t$2, r$1, i$1, o$1, a$1, s$1, f$1, l$1) {
		const c$1 = Math.min(t$2, o$1), u = Math.min(r$1, a$1);
		let h = 0, d = 0;
		for (let r$2 = 0; r$2 < u; r$2++) for (let a$2 = 0; a$2 < c$1; a$2++) if (s$1 >= 0 && f$1 >= 0 ? (h = r$2 * t$2 + a$2 << 2, d = (f$1 + r$2) * o$1 + s$1 + a$2 << 2) : (h = (-f$1 + r$2) * t$2 - s$1 + a$2 << 2, d = r$2 * o$1 + a$2 << 2), 0 == l$1) i$1[d] = e$2[h], i$1[d + 1] = e$2[h + 1], i$1[d + 2] = e$2[h + 2], i$1[d + 3] = e$2[h + 3];
		else if (1 == l$1) {
			var A = e$2[h + 3] * (1 / 255), g = e$2[h] * A, p = e$2[h + 1] * A, m = e$2[h + 2] * A, w = i$1[d + 3] * (1 / 255), v = i$1[d] * w, b = i$1[d + 1] * w, y = i$1[d + 2] * w;
			const t$3 = 1 - A, r$3 = A + w * t$3, o$2 = 0 == r$3 ? 0 : 1 / r$3;
			i$1[d + 3] = 255 * r$3, i$1[d + 0] = (g + v * t$3) * o$2, i$1[d + 1] = (p + b * t$3) * o$2, i$1[d + 2] = (m + y * t$3) * o$2;
		} else if (2 == l$1) {
			A = e$2[h + 3], g = e$2[h], p = e$2[h + 1], m = e$2[h + 2], w = i$1[d + 3], v = i$1[d], b = i$1[d + 1], y = i$1[d + 2];
			A == w && g == v && p == b && m == y ? (i$1[d] = 0, i$1[d + 1] = 0, i$1[d + 2] = 0, i$1[d + 3] = 0) : (i$1[d] = g, i$1[d + 1] = p, i$1[d + 2] = m, i$1[d + 3] = A);
		} else if (3 == l$1) {
			A = e$2[h + 3], g = e$2[h], p = e$2[h + 1], m = e$2[h + 2], w = i$1[d + 3], v = i$1[d], b = i$1[d + 1], y = i$1[d + 2];
			if (A == w && g == v && p == b && m == y) continue;
			if (A < 220 && w > 20) return !1;
		}
		return !0;
	}
	return {
		decode: function decode$1(r$1) {
			const i$1 = new Uint8Array(r$1);
			let o$1 = 8;
			const a$1 = e$1, s$1 = a$1.readUshort, f$1 = a$1.readUint, l$1 = {
				tabs: {},
				frames: []
			}, c$1 = new Uint8Array(i$1.length);
			let u, h = 0, d = 0;
			const A = [
				137,
				80,
				78,
				71,
				13,
				10,
				26,
				10
			];
			for (var g = 0; g < 8; g++) if (i$1[g] != A[g]) throw "The input is not a PNG file!";
			for (; o$1 < i$1.length;) {
				const e$2 = a$1.readUint(i$1, o$1);
				o$1 += 4;
				const r$2 = a$1.readASCII(i$1, o$1, 4);
				if (o$1 += 4, "IHDR" == r$2) _IHDR(i$1, o$1, l$1);
				else if ("iCCP" == r$2) {
					for (var p = o$1; 0 != i$1[p];) p++;
					a$1.readASCII(i$1, o$1, p - o$1), i$1[p + 1];
					const s$2 = i$1.slice(p + 2, o$1 + e$2);
					let f$2 = null;
					try {
						f$2 = _inflate(s$2);
					} catch (e$3) {
						f$2 = t$1(s$2);
					}
					l$1.tabs[r$2] = f$2;
				} else if ("CgBI" == r$2) l$1.tabs[r$2] = i$1.slice(o$1, o$1 + 4);
				else if ("IDAT" == r$2) {
					for (g = 0; g < e$2; g++) c$1[h + g] = i$1[o$1 + g];
					h += e$2;
				} else if ("acTL" == r$2) l$1.tabs[r$2] = {
					num_frames: f$1(i$1, o$1),
					num_plays: f$1(i$1, o$1 + 4)
				}, u = new Uint8Array(i$1.length);
				else if ("fcTL" == r$2) {
					if (0 != d) (E = l$1.frames[l$1.frames.length - 1]).data = _decompress(l$1, u.slice(0, d), E.rect.width, E.rect.height), d = 0;
					const e$3 = {
						x: f$1(i$1, o$1 + 12),
						y: f$1(i$1, o$1 + 16),
						width: f$1(i$1, o$1 + 4),
						height: f$1(i$1, o$1 + 8)
					};
					let t$2 = s$1(i$1, o$1 + 22);
					t$2 = s$1(i$1, o$1 + 20) / (0 == t$2 ? 100 : t$2);
					const r$3 = {
						rect: e$3,
						delay: Math.round(1e3 * t$2),
						dispose: i$1[o$1 + 24],
						blend: i$1[o$1 + 25]
					};
					l$1.frames.push(r$3);
				} else if ("fdAT" == r$2) {
					for (g = 0; g < e$2 - 4; g++) u[d + g] = i$1[o$1 + g + 4];
					d += e$2 - 4;
				} else if ("pHYs" == r$2) l$1.tabs[r$2] = [
					a$1.readUint(i$1, o$1),
					a$1.readUint(i$1, o$1 + 4),
					i$1[o$1 + 8]
				];
				else if ("cHRM" == r$2) {
					l$1.tabs[r$2] = [];
					for (g = 0; g < 8; g++) l$1.tabs[r$2].push(a$1.readUint(i$1, o$1 + 4 * g));
				} else if ("tEXt" == r$2 || "zTXt" == r$2) {
					l$1.tabs[r$2] ?? (l$1.tabs[r$2] = {});
					var m = a$1.nextZero(i$1, o$1), w = a$1.readASCII(i$1, o$1, m - o$1), v = o$1 + e$2 - m - 1;
					if ("tEXt" == r$2) y = a$1.readASCII(i$1, m + 1, v);
					else {
						var b = _inflate(i$1.slice(m + 2, m + 2 + v));
						y = a$1.readUTF8(b, 0, b.length);
					}
					l$1.tabs[r$2][w] = y;
				} else if ("iTXt" == r$2) {
					l$1.tabs[r$2] ?? (l$1.tabs[r$2] = {});
					m = 0, p = o$1;
					m = a$1.nextZero(i$1, p);
					w = a$1.readASCII(i$1, p, m - p);
					const t$2 = i$1[p = m + 1];
					var y;
					i$1[p + 1], p += 2, m = a$1.nextZero(i$1, p), a$1.readASCII(i$1, p, m - p), p = m + 1, m = a$1.nextZero(i$1, p), a$1.readUTF8(i$1, p, m - p);
					v = e$2 - ((p = m + 1) - o$1);
					if (0 == t$2) y = a$1.readUTF8(i$1, p, v);
					else {
						b = _inflate(i$1.slice(p, p + v));
						y = a$1.readUTF8(b, 0, b.length);
					}
					l$1.tabs[r$2][w] = y;
				} else if ("PLTE" == r$2) l$1.tabs[r$2] = a$1.readBytes(i$1, o$1, e$2);
				else if ("hIST" == r$2) {
					const e$3 = l$1.tabs.PLTE.length / 3;
					l$1.tabs[r$2] = [];
					for (g = 0; g < e$3; g++) l$1.tabs[r$2].push(s$1(i$1, o$1 + 2 * g));
				} else if ("tRNS" == r$2) 3 == l$1.ctype ? l$1.tabs[r$2] = a$1.readBytes(i$1, o$1, e$2) : 0 == l$1.ctype ? l$1.tabs[r$2] = s$1(i$1, o$1) : 2 == l$1.ctype && (l$1.tabs[r$2] = [
					s$1(i$1, o$1),
					s$1(i$1, o$1 + 2),
					s$1(i$1, o$1 + 4)
				]);
				else if ("gAMA" == r$2) l$1.tabs[r$2] = a$1.readUint(i$1, o$1) / 1e5;
				else if ("sRGB" == r$2) l$1.tabs[r$2] = i$1[o$1];
				else if ("bKGD" == r$2) 0 == l$1.ctype || 4 == l$1.ctype ? l$1.tabs[r$2] = [s$1(i$1, o$1)] : 2 == l$1.ctype || 6 == l$1.ctype ? l$1.tabs[r$2] = [
					s$1(i$1, o$1),
					s$1(i$1, o$1 + 2),
					s$1(i$1, o$1 + 4)
				] : 3 == l$1.ctype && (l$1.tabs[r$2] = i$1[o$1]);
				else if ("IEND" == r$2) break;
				o$1 += e$2, a$1.readUint(i$1, o$1), o$1 += 4;
			}
			var E;
			return 0 != d && ((E = l$1.frames[l$1.frames.length - 1]).data = _decompress(l$1, u.slice(0, d), E.rect.width, E.rect.height)), l$1.data = _decompress(l$1, c$1, l$1.width, l$1.height), delete l$1.compress, delete l$1.interlace, delete l$1.filter, l$1;
		},
		toRGBA8: function toRGBA8(e$2) {
			const t$2 = e$2.width, r$1 = e$2.height;
			if (null == e$2.tabs.acTL) return [decodeImage(e$2.data, t$2, r$1, e$2).buffer];
			const i$1 = [];
			e$2.frames[0].data ?? (e$2.frames[0].data = e$2.data);
			const o$1 = t$2 * r$1 * 4, a$1 = new Uint8Array(o$1), s$1 = new Uint8Array(o$1), f$1 = new Uint8Array(o$1);
			for (let c$1 = 0; c$1 < e$2.frames.length; c$1++) {
				const u = e$2.frames[c$1], h = u.rect.x, d = u.rect.y, A = u.rect.width, g = u.rect.height, p = decodeImage(u.data, A, g, e$2);
				if (0 != c$1) for (var l$1 = 0; l$1 < o$1; l$1++) f$1[l$1] = a$1[l$1];
				if (0 == u.blend ? _copyTile(p, A, g, a$1, t$2, r$1, h, d, 0) : 1 == u.blend && _copyTile(p, A, g, a$1, t$2, r$1, h, d, 1), i$1.push(a$1.buffer.slice(0)), 0 == u.dispose);
				else if (1 == u.dispose) _copyTile(s$1, A, g, a$1, t$2, r$1, h, d, 0);
				else if (2 == u.dispose) for (l$1 = 0; l$1 < o$1; l$1++) a$1[l$1] = f$1[l$1];
			}
			return i$1;
		},
		_paeth,
		_copyTile,
		_bin: e$1
	};
}();
(function() {
	const { _copyTile: e$1 } = UPNG, { _bin: t$1 } = UPNG, r$1 = UPNG._paeth;
	var i$1 = {
		table: function() {
			const e$2 = new Uint32Array(256);
			for (let t$2 = 0; t$2 < 256; t$2++) {
				let r$2 = t$2;
				for (let e$3 = 0; e$3 < 8; e$3++) 1 & r$2 ? r$2 = 3988292384 ^ r$2 >>> 1 : r$2 >>>= 1;
				e$2[t$2] = r$2;
			}
			return e$2;
		}(),
		update(e$2, t$2, r$2, o$2) {
			for (let a$1 = 0; a$1 < o$2; a$1++) e$2 = i$1.table[255 & (e$2 ^ t$2[r$2 + a$1])] ^ e$2 >>> 8;
			return e$2;
		},
		crc: (e$2, t$2, r$2) => 4294967295 ^ i$1.update(4294967295, e$2, t$2, r$2)
	};
	function addErr(e$2, t$2, r$2, i$2) {
		t$2[r$2] += e$2[0] * i$2 >> 4, t$2[r$2 + 1] += e$2[1] * i$2 >> 4, t$2[r$2 + 2] += e$2[2] * i$2 >> 4, t$2[r$2 + 3] += e$2[3] * i$2 >> 4;
	}
	function N(e$2) {
		return Math.max(0, Math.min(255, e$2));
	}
	function D(e$2, t$2) {
		const r$2 = e$2[0] - t$2[0], i$2 = e$2[1] - t$2[1], o$2 = e$2[2] - t$2[2], a$1 = e$2[3] - t$2[3];
		return r$2 * r$2 + i$2 * i$2 + o$2 * o$2 + a$1 * a$1;
	}
	function dither(e$2, t$2, r$2, i$2, o$2, a$1, s$1) {
		s$1 ??= 1;
		const f$1 = i$2.length, l$1 = [];
		for (var c$1 = 0; c$1 < f$1; c$1++) {
			const e$3 = i$2[c$1];
			l$1.push([
				e$3 >>> 0 & 255,
				e$3 >>> 8 & 255,
				e$3 >>> 16 & 255,
				e$3 >>> 24 & 255
			]);
		}
		for (c$1 = 0; c$1 < f$1; c$1++) {
			let e$3 = 4294967295;
			for (var u = 0, h = 0; h < f$1; h++) {
				var d = D(l$1[c$1], l$1[h]);
				h != c$1 && d < e$3 && (e$3 = d, u = h);
			}
		}
		const A = new Uint32Array(o$2.buffer), g = new Int16Array(t$2 * r$2 * 4), p = [
			0,
			8,
			2,
			10,
			12,
			4,
			14,
			6,
			3,
			11,
			1,
			9,
			15,
			7,
			13,
			5
		];
		for (c$1 = 0; c$1 < p.length; c$1++) p[c$1] = 255 * ((p[c$1] + .5) / 16 - .5);
		for (let o$3 = 0; o$3 < r$2; o$3++) for (let w = 0; w < t$2; w++) {
			var m;
			c$1 = 4 * (o$3 * t$2 + w);
			if (2 != s$1) m = [
				N(e$2[c$1] + g[c$1]),
				N(e$2[c$1 + 1] + g[c$1 + 1]),
				N(e$2[c$1 + 2] + g[c$1 + 2]),
				N(e$2[c$1 + 3] + g[c$1 + 3])
			];
			else {
				d = p[4 * (3 & o$3) + (3 & w)];
				m = [
					N(e$2[c$1] + d),
					N(e$2[c$1 + 1] + d),
					N(e$2[c$1 + 2] + d),
					N(e$2[c$1 + 3] + d)
				];
			}
			u = 0;
			let v = 16777215;
			for (h = 0; h < f$1; h++) {
				const e$3 = D(m, l$1[h]);
				e$3 < v && (v = e$3, u = h);
			}
			const b = l$1[u], y = [
				m[0] - b[0],
				m[1] - b[1],
				m[2] - b[2],
				m[3] - b[3]
			];
			1 == s$1 && (w != t$2 - 1 && addErr(y, g, c$1 + 4, 7), o$3 != r$2 - 1 && (0 != w && addErr(y, g, c$1 + 4 * t$2 - 4, 3), addErr(y, g, c$1 + 4 * t$2, 5), w != t$2 - 1 && addErr(y, g, c$1 + 4 * t$2 + 4, 1))), a$1[c$1 >> 2] = u, A[c$1 >> 2] = i$2[u];
		}
	}
	function _main(e$2, r$2, o$2, a$1, s$1) {
		s$1 ??= {};
		const { crc: f$1 } = i$1, l$1 = t$1.writeUint, c$1 = t$1.writeUshort, u = t$1.writeASCII;
		let h = 8;
		const d = e$2.frames.length > 1;
		let A, g = !1, p = 33 + (d ? 20 : 0);
		if (null != s$1.sRGB && (p += 13), null != s$1.pHYs && (p += 21), null != s$1.iCCP && (A = pako.deflate(s$1.iCCP), p += 21 + A.length + 4), 3 == e$2.ctype) {
			for (var m = e$2.plte.length, w = 0; w < m; w++) e$2.plte[w] >>> 24 != 255 && (g = !0);
			p += 8 + 3 * m + 4 + (g ? 8 + 1 * m + 4 : 0);
		}
		for (var v = 0; v < e$2.frames.length; v++) d && (p += 38), p += (F = e$2.frames[v]).cimg.length + 12, 0 != v && (p += 4);
		p += 12;
		const b = new Uint8Array(p), y = [
			137,
			80,
			78,
			71,
			13,
			10,
			26,
			10
		];
		for (w = 0; w < 8; w++) b[w] = y[w];
		if (l$1(b, h, 13), h += 4, u(b, h, "IHDR"), h += 4, l$1(b, h, r$2), h += 4, l$1(b, h, o$2), h += 4, b[h] = e$2.depth, h++, b[h] = e$2.ctype, h++, b[h] = 0, h++, b[h] = 0, h++, b[h] = 0, h++, l$1(b, h, f$1(b, h - 17, 17)), h += 4, null != s$1.sRGB && (l$1(b, h, 1), h += 4, u(b, h, "sRGB"), h += 4, b[h] = s$1.sRGB, h++, l$1(b, h, f$1(b, h - 5, 5)), h += 4), null != s$1.iCCP) {
			const e$3 = 13 + A.length;
			l$1(b, h, e$3), h += 4, u(b, h, "iCCP"), h += 4, u(b, h, "ICC profile"), h += 11, h += 2, b.set(A, h), h += A.length, l$1(b, h, f$1(b, h - (e$3 + 4), e$3 + 4)), h += 4;
		}
		if (null != s$1.pHYs && (l$1(b, h, 9), h += 4, u(b, h, "pHYs"), h += 4, l$1(b, h, s$1.pHYs[0]), h += 4, l$1(b, h, s$1.pHYs[1]), h += 4, b[h] = s$1.pHYs[2], h++, l$1(b, h, f$1(b, h - 13, 13)), h += 4), d && (l$1(b, h, 8), h += 4, u(b, h, "acTL"), h += 4, l$1(b, h, e$2.frames.length), h += 4, l$1(b, h, null != s$1.loop ? s$1.loop : 0), h += 4, l$1(b, h, f$1(b, h - 12, 12)), h += 4), 3 == e$2.ctype) {
			l$1(b, h, 3 * (m = e$2.plte.length)), h += 4, u(b, h, "PLTE"), h += 4;
			for (w = 0; w < m; w++) {
				const t$2 = 3 * w, r$3 = e$2.plte[w], i$2 = 255 & r$3, o$3 = r$3 >>> 8 & 255, a$2 = r$3 >>> 16 & 255;
				b[h + t$2 + 0] = i$2, b[h + t$2 + 1] = o$3, b[h + t$2 + 2] = a$2;
			}
			if (h += 3 * m, l$1(b, h, f$1(b, h - 3 * m - 4, 3 * m + 4)), h += 4, g) {
				l$1(b, h, m), h += 4, u(b, h, "tRNS"), h += 4;
				for (w = 0; w < m; w++) b[h + w] = e$2.plte[w] >>> 24 & 255;
				h += m, l$1(b, h, f$1(b, h - m - 4, m + 4)), h += 4;
			}
		}
		let E = 0;
		for (v = 0; v < e$2.frames.length; v++) {
			var F = e$2.frames[v];
			d && (l$1(b, h, 26), h += 4, u(b, h, "fcTL"), h += 4, l$1(b, h, E++), h += 4, l$1(b, h, F.rect.width), h += 4, l$1(b, h, F.rect.height), h += 4, l$1(b, h, F.rect.x), h += 4, l$1(b, h, F.rect.y), h += 4, c$1(b, h, a$1[v]), h += 2, c$1(b, h, 1e3), h += 2, b[h] = F.dispose, h++, b[h] = F.blend, h++, l$1(b, h, f$1(b, h - 30, 30)), h += 4);
			const t$2 = F.cimg;
			l$1(b, h, (m = t$2.length) + (0 == v ? 0 : 4)), h += 4;
			const r$3 = h;
			u(b, h, 0 == v ? "IDAT" : "fdAT"), h += 4, 0 != v && (l$1(b, h, E++), h += 4), b.set(t$2, h), h += m, l$1(b, h, f$1(b, r$3, h - r$3)), h += 4;
		}
		return l$1(b, h, 0), h += 4, u(b, h, "IEND"), h += 4, l$1(b, h, f$1(b, h - 4, 4)), h += 4, b.buffer;
	}
	function compressPNG(e$2, t$2, r$2) {
		for (let i$2 = 0; i$2 < e$2.frames.length; i$2++) {
			const o$2 = e$2.frames[i$2];
			o$2.rect.width;
			const a$1 = o$2.rect.height, s$1 = new Uint8Array(a$1 * o$2.bpl + a$1);
			o$2.cimg = _filterZero(o$2.img, a$1, o$2.bpp, o$2.bpl, s$1, t$2, r$2);
		}
	}
	function compress$2(t$2, r$2, i$2, o$2, a$1) {
		const s$1 = a$1[0], f$1 = a$1[1], l$1 = a$1[2], c$1 = a$1[3], u = a$1[4], h = a$1[5];
		let d = 6, A = 8, g = 255;
		for (var p = 0; p < t$2.length; p++) {
			const e$2 = new Uint8Array(t$2[p]);
			for (var m = e$2.length, w = 0; w < m; w += 4) g &= e$2[w + 3];
		}
		const v = 255 != g, b = function framize(t$3, r$3, i$3, o$3, a$2, s$2) {
			const f$2 = [];
			for (var l$2 = 0; l$2 < t$3.length; l$2++) {
				const h$2 = new Uint8Array(t$3[l$2]), A$2 = new Uint32Array(h$2.buffer);
				var c$2;
				let g$1 = 0, p$1 = 0, m$1 = r$3, w$1 = i$3, v$1 = o$3 ? 1 : 0;
				if (0 != l$2) {
					const b$1 = s$2 || o$3 || 1 == l$2 || 0 != f$2[l$2 - 2].dispose ? 1 : 2;
					let y$1 = 0, E$1 = 1e9;
					for (let e$2 = 0; e$2 < b$1; e$2++) {
						var u$1 = new Uint8Array(t$3[l$2 - 1 - e$2]);
						const o$4 = new Uint32Array(t$3[l$2 - 1 - e$2]);
						let s$3 = r$3, f$3 = i$3, c$3 = -1, h$3 = -1;
						for (let e$3 = 0; e$3 < i$3; e$3++) for (let t$4 = 0; t$4 < r$3; t$4++) A$2[d$1 = e$3 * r$3 + t$4] != o$4[d$1] && (t$4 < s$3 && (s$3 = t$4), t$4 > c$3 && (c$3 = t$4), e$3 < f$3 && (f$3 = e$3), e$3 > h$3 && (h$3 = e$3));
						-1 == c$3 && (s$3 = f$3 = c$3 = h$3 = 0), a$2 && (1 == (1 & s$3) && s$3--, 1 == (1 & f$3) && f$3--);
						const v$2 = (c$3 - s$3 + 1) * (h$3 - f$3 + 1);
						v$2 < E$1 && (E$1 = v$2, y$1 = e$2, g$1 = s$3, p$1 = f$3, m$1 = c$3 - s$3 + 1, w$1 = h$3 - f$3 + 1);
					}
					u$1 = new Uint8Array(t$3[l$2 - 1 - y$1]);
					1 == y$1 && (f$2[l$2 - 1].dispose = 2), c$2 = new Uint8Array(m$1 * w$1 * 4), e$1(u$1, r$3, i$3, c$2, m$1, w$1, -g$1, -p$1, 0), v$1 = e$1(h$2, r$3, i$3, c$2, m$1, w$1, -g$1, -p$1, 3) ? 1 : 0, 1 == v$1 ? _prepareDiff(h$2, r$3, i$3, c$2, {
						x: g$1,
						y: p$1,
						width: m$1,
						height: w$1
					}) : e$1(h$2, r$3, i$3, c$2, m$1, w$1, -g$1, -p$1, 0);
				} else c$2 = h$2.slice(0);
				f$2.push({
					rect: {
						x: g$1,
						y: p$1,
						width: m$1,
						height: w$1
					},
					img: c$2,
					blend: v$1,
					dispose: 0
				});
			}
			if (o$3) for (l$2 = 0; l$2 < f$2.length; l$2++) {
				if (1 == (A$1 = f$2[l$2]).blend) continue;
				const e$2 = A$1.rect, o$4 = f$2[l$2 - 1].rect, s$3 = Math.min(e$2.x, o$4.x), c$3 = Math.min(e$2.y, o$4.y), u$2 = {
					x: s$3,
					y: c$3,
					width: Math.max(e$2.x + e$2.width, o$4.x + o$4.width) - s$3,
					height: Math.max(e$2.y + e$2.height, o$4.y + o$4.height) - c$3
				};
				f$2[l$2 - 1].dispose = 1, l$2 - 1 != 0 && _updateFrame(t$3, r$3, i$3, f$2, l$2 - 1, u$2, a$2), _updateFrame(t$3, r$3, i$3, f$2, l$2, u$2, a$2);
			}
			let h$1 = 0;
			if (1 != t$3.length) for (var d$1 = 0; d$1 < f$2.length; d$1++) {
				var A$1;
				h$1 += (A$1 = f$2[d$1]).rect.width * A$1.rect.height;
			}
			return f$2;
		}(t$2, r$2, i$2, s$1, f$1, l$1), y = {}, E = [], F = [];
		if (0 != o$2) {
			const e$2 = [];
			for (w = 0; w < b.length; w++) e$2.push(b[w].img.buffer);
			const r$3 = quantize(function concatRGBA(e$3) {
				let t$3 = 0;
				for (var r$4 = 0; r$4 < e$3.length; r$4++) t$3 += e$3[r$4].byteLength;
				const i$4 = new Uint8Array(t$3);
				let o$3 = 0;
				for (r$4 = 0; r$4 < e$3.length; r$4++) {
					const t$4 = new Uint8Array(e$3[r$4]), a$2 = t$4.length;
					for (let e$4 = 0; e$4 < a$2; e$4 += 4) {
						let r$5 = t$4[e$4], a$3 = t$4[e$4 + 1], s$2 = t$4[e$4 + 2];
						const f$2 = t$4[e$4 + 3];
						0 == f$2 && (r$5 = a$3 = s$2 = 0), i$4[o$3 + e$4] = r$5, i$4[o$3 + e$4 + 1] = a$3, i$4[o$3 + e$4 + 2] = s$2, i$4[o$3 + e$4 + 3] = f$2;
					}
					o$3 += a$2;
				}
				return i$4.buffer;
			}(e$2), o$2);
			for (w = 0; w < r$3.plte.length; w++) E.push(r$3.plte[w].est.rgba);
			let i$3 = 0;
			for (w = 0; w < b.length; w++) {
				const e$3 = (B = b[w]).img.length;
				var _ = new Uint8Array(r$3.inds.buffer, i$3 >> 2, e$3 >> 2);
				F.push(_);
				const t$3 = new Uint8Array(r$3.abuf, i$3, e$3);
				h && dither(B.img, B.rect.width, B.rect.height, E, t$3, _), B.img.set(t$3), i$3 += e$3;
			}
		} else for (p = 0; p < b.length; p++) {
			var B = b[p];
			const e$2 = new Uint32Array(B.img.buffer);
			var U = B.rect.width;
			m = e$2.length, _ = new Uint8Array(m);
			F.push(_);
			for (w = 0; w < m; w++) {
				const t$3 = e$2[w];
				if (0 != w && t$3 == e$2[w - 1]) _[w] = _[w - 1];
				else if (w > U && t$3 == e$2[w - U]) _[w] = _[w - U];
				else {
					let e$3 = y[t$3];
					if (null == e$3 && (y[t$3] = e$3 = E.length, E.push(t$3), E.length >= 300)) break;
					_[w] = e$3;
				}
			}
		}
		const C = E.length;
		C <= 256 && 0 == u && (A = C <= 2 ? 1 : C <= 4 ? 2 : C <= 16 ? 4 : 8, A = Math.max(A, c$1));
		for (p = 0; p < b.length; p++) {
			(B = b[p]).rect.x, B.rect.y;
			U = B.rect.width;
			const e$2 = B.rect.height;
			let t$3 = B.img;
			new Uint32Array(t$3.buffer);
			let r$3 = 4 * U, i$3 = 4;
			if (C <= 256 && 0 == u) {
				r$3 = Math.ceil(A * U / 8);
				var I = new Uint8Array(r$3 * e$2);
				const o$3 = F[p];
				for (let t$4 = 0; t$4 < e$2; t$4++) {
					w = t$4 * r$3;
					const e$3 = t$4 * U;
					if (8 == A) for (var Q = 0; Q < U; Q++) I[w + Q] = o$3[e$3 + Q];
					else if (4 == A) for (Q = 0; Q < U; Q++) I[w + (Q >> 1)] |= o$3[e$3 + Q] << 4 - 4 * (1 & Q);
					else if (2 == A) for (Q = 0; Q < U; Q++) I[w + (Q >> 2)] |= o$3[e$3 + Q] << 6 - 2 * (3 & Q);
					else if (1 == A) for (Q = 0; Q < U; Q++) I[w + (Q >> 3)] |= o$3[e$3 + Q] << 7 - 1 * (7 & Q);
				}
				t$3 = I, d = 3, i$3 = 1;
			} else if (0 == v && 1 == b.length) {
				I = new Uint8Array(U * e$2 * 3);
				const o$3 = U * e$2;
				for (w = 0; w < o$3; w++) {
					const e$3 = 3 * w, r$4 = 4 * w;
					I[e$3] = t$3[r$4], I[e$3 + 1] = t$3[r$4 + 1], I[e$3 + 2] = t$3[r$4 + 2];
				}
				t$3 = I, d = 2, i$3 = 3, r$3 = 3 * U;
			}
			B.img = t$3, B.bpl = r$3, B.bpp = i$3;
		}
		return {
			ctype: d,
			depth: A,
			plte: E,
			frames: b
		};
	}
	function _updateFrame(t$2, r$2, i$2, o$2, a$1, s$1, f$1) {
		const l$1 = Uint8Array, c$1 = Uint32Array, u = new l$1(t$2[a$1 - 1]), h = new c$1(t$2[a$1 - 1]), d = a$1 + 1 < t$2.length ? new l$1(t$2[a$1 + 1]) : null, A = new l$1(t$2[a$1]), g = new c$1(A.buffer);
		let p = r$2, m = i$2, w = -1, v = -1;
		for (let e$2 = 0; e$2 < s$1.height; e$2++) for (let t$3 = 0; t$3 < s$1.width; t$3++) {
			const i$3 = s$1.x + t$3, f$2 = s$1.y + e$2, l$2 = f$2 * r$2 + i$3, c$2 = g[l$2];
			0 == c$2 || 0 == o$2[a$1 - 1].dispose && h[l$2] == c$2 && (null == d || 0 != d[4 * l$2 + 3]) || (i$3 < p && (p = i$3), i$3 > w && (w = i$3), f$2 < m && (m = f$2), f$2 > v && (v = f$2));
		}
		-1 == w && (p = m = w = v = 0), f$1 && (1 == (1 & p) && p--, 1 == (1 & m) && m--), s$1 = {
			x: p,
			y: m,
			width: w - p + 1,
			height: v - m + 1
		};
		const b = o$2[a$1];
		b.rect = s$1, b.blend = 1, b.img = new Uint8Array(s$1.width * s$1.height * 4), 0 == o$2[a$1 - 1].dispose ? (e$1(u, r$2, i$2, b.img, s$1.width, s$1.height, -s$1.x, -s$1.y, 0), _prepareDiff(A, r$2, i$2, b.img, s$1)) : e$1(A, r$2, i$2, b.img, s$1.width, s$1.height, -s$1.x, -s$1.y, 0);
	}
	function _prepareDiff(t$2, r$2, i$2, o$2, a$1) {
		e$1(t$2, r$2, i$2, o$2, a$1.width, a$1.height, -a$1.x, -a$1.y, 2);
	}
	function _filterZero(e$2, t$2, r$2, i$2, o$2, a$1, s$1) {
		const f$1 = [];
		let l$1, c$1 = [
			0,
			1,
			2,
			3,
			4
		];
		-1 != a$1 ? c$1 = [a$1] : (t$2 * i$2 > 5e5 || 1 == r$2) && (c$1 = [0]), s$1 && (l$1 = { level: 0 });
		const u = UZIP;
		for (var h = 0; h < c$1.length; h++) {
			for (let a$2 = 0; a$2 < t$2; a$2++) _filterLine(o$2, e$2, a$2, i$2, r$2, c$1[h]);
			f$1.push(u.deflate(o$2, l$1));
		}
		let d, A = 1e9;
		for (h = 0; h < f$1.length; h++) f$1[h].length < A && (d = h, A = f$1[h].length);
		return f$1[d];
	}
	function _filterLine(e$2, t$2, i$2, o$2, a$1, s$1) {
		const f$1 = i$2 * o$2;
		let l$1 = f$1 + i$2;
		if (e$2[l$1] = s$1, l$1++, 0 == s$1) if (o$2 < 500) for (var c$1 = 0; c$1 < o$2; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1];
		else e$2.set(new Uint8Array(t$2.buffer, f$1, o$2), l$1);
		else if (1 == s$1) {
			for (c$1 = 0; c$1 < a$1; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1];
			for (c$1 = a$1; c$1 < o$2; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1] - t$2[f$1 + c$1 - a$1] + 256 & 255;
		} else if (0 == i$2) {
			for (c$1 = 0; c$1 < a$1; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1];
			if (2 == s$1) for (c$1 = a$1; c$1 < o$2; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1];
			if (3 == s$1) for (c$1 = a$1; c$1 < o$2; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1] - (t$2[f$1 + c$1 - a$1] >> 1) + 256 & 255;
			if (4 == s$1) for (c$1 = a$1; c$1 < o$2; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1] - r$1(t$2[f$1 + c$1 - a$1], 0, 0) + 256 & 255;
		} else {
			if (2 == s$1) for (c$1 = 0; c$1 < o$2; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1] + 256 - t$2[f$1 + c$1 - o$2] & 255;
			if (3 == s$1) {
				for (c$1 = 0; c$1 < a$1; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1] + 256 - (t$2[f$1 + c$1 - o$2] >> 1) & 255;
				for (c$1 = a$1; c$1 < o$2; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1] + 256 - (t$2[f$1 + c$1 - o$2] + t$2[f$1 + c$1 - a$1] >> 1) & 255;
			}
			if (4 == s$1) {
				for (c$1 = 0; c$1 < a$1; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1] + 256 - r$1(0, t$2[f$1 + c$1 - o$2], 0) & 255;
				for (c$1 = a$1; c$1 < o$2; c$1++) e$2[l$1 + c$1] = t$2[f$1 + c$1] + 256 - r$1(t$2[f$1 + c$1 - a$1], t$2[f$1 + c$1 - o$2], t$2[f$1 + c$1 - a$1 - o$2]) & 255;
			}
		}
	}
	function quantize(e$2, t$2) {
		const r$2 = new Uint8Array(e$2), i$2 = r$2.slice(0), o$2 = new Uint32Array(i$2.buffer), a$1 = getKDtree(i$2, t$2), s$1 = a$1[0], f$1 = a$1[1], l$1 = r$2.length, c$1 = new Uint8Array(l$1 >> 2);
		let u;
		if (r$2.length < 2e7) for (var h = 0; h < l$1; h += 4) u = getNearest(s$1, d = r$2[h] * (1 / 255), A = r$2[h + 1] * (1 / 255), g = r$2[h + 2] * (1 / 255), p = r$2[h + 3] * (1 / 255)), c$1[h >> 2] = u.ind, o$2[h >> 2] = u.est.rgba;
		else for (h = 0; h < l$1; h += 4) {
			var d = r$2[h] * (1 / 255), A = r$2[h + 1] * (1 / 255), g = r$2[h + 2] * (1 / 255), p = r$2[h + 3] * (1 / 255);
			for (u = s$1; u.left;) u = planeDst(u.est, d, A, g, p) <= 0 ? u.left : u.right;
			c$1[h >> 2] = u.ind, o$2[h >> 2] = u.est.rgba;
		}
		return {
			abuf: i$2.buffer,
			inds: c$1,
			plte: f$1
		};
	}
	function getKDtree(e$2, t$2, r$2) {
		r$2 ??= 1e-4;
		const i$2 = new Uint32Array(e$2.buffer), o$2 = {
			i0: 0,
			i1: e$2.length,
			bst: null,
			est: null,
			tdst: 0,
			left: null,
			right: null
		};
		o$2.bst = stats(e$2, o$2.i0, o$2.i1), o$2.est = estats(o$2.bst);
		const a$1 = [o$2];
		for (; a$1.length < t$2;) {
			let t$3 = 0, o$3 = 0;
			for (var s$1 = 0; s$1 < a$1.length; s$1++) a$1[s$1].est.L > t$3 && (t$3 = a$1[s$1].est.L, o$3 = s$1);
			if (t$3 < r$2) break;
			const f$1 = a$1[o$3], l$1 = splitPixels(e$2, i$2, f$1.i0, f$1.i1, f$1.est.e, f$1.est.eMq255);
			if (f$1.i0 >= l$1 || f$1.i1 <= l$1) {
				f$1.est.L = 0;
				continue;
			}
			const c$1 = {
				i0: f$1.i0,
				i1: l$1,
				bst: null,
				est: null,
				tdst: 0,
				left: null,
				right: null
			};
			c$1.bst = stats(e$2, c$1.i0, c$1.i1), c$1.est = estats(c$1.bst);
			const u = {
				i0: l$1,
				i1: f$1.i1,
				bst: null,
				est: null,
				tdst: 0,
				left: null,
				right: null
			};
			u.bst = {
				R: [],
				m: [],
				N: f$1.bst.N - c$1.bst.N
			};
			for (s$1 = 0; s$1 < 16; s$1++) u.bst.R[s$1] = f$1.bst.R[s$1] - c$1.bst.R[s$1];
			for (s$1 = 0; s$1 < 4; s$1++) u.bst.m[s$1] = f$1.bst.m[s$1] - c$1.bst.m[s$1];
			u.est = estats(u.bst), f$1.left = c$1, f$1.right = u, a$1[o$3] = c$1, a$1.push(u);
		}
		a$1.sort(((e$3, t$3) => t$3.bst.N - e$3.bst.N));
		for (s$1 = 0; s$1 < a$1.length; s$1++) a$1[s$1].ind = s$1;
		return [o$2, a$1];
	}
	function getNearest(e$2, t$2, r$2, i$2, o$2) {
		if (null == e$2.left) return e$2.tdst = function dist(e$3, t$3, r$3, i$3, o$3) {
			const a$2 = t$3 - e$3[0], s$2 = r$3 - e$3[1], f$2 = i$3 - e$3[2], l$2 = o$3 - e$3[3];
			return a$2 * a$2 + s$2 * s$2 + f$2 * f$2 + l$2 * l$2;
		}(e$2.est.q, t$2, r$2, i$2, o$2), e$2;
		const a$1 = planeDst(e$2.est, t$2, r$2, i$2, o$2);
		let s$1 = e$2.left, f$1 = e$2.right;
		a$1 > 0 && (s$1 = e$2.right, f$1 = e$2.left);
		const l$1 = getNearest(s$1, t$2, r$2, i$2, o$2);
		if (l$1.tdst <= a$1 * a$1) return l$1;
		const c$1 = getNearest(f$1, t$2, r$2, i$2, o$2);
		return c$1.tdst < l$1.tdst ? c$1 : l$1;
	}
	function planeDst(e$2, t$2, r$2, i$2, o$2) {
		const { e: a$1 } = e$2;
		return a$1[0] * t$2 + a$1[1] * r$2 + a$1[2] * i$2 + a$1[3] * o$2 - e$2.eMq;
	}
	function splitPixels(e$2, t$2, r$2, i$2, o$2, a$1) {
		for (i$2 -= 4; r$2 < i$2;) {
			for (; vecDot(e$2, r$2, o$2) <= a$1;) r$2 += 4;
			for (; vecDot(e$2, i$2, o$2) > a$1;) i$2 -= 4;
			if (r$2 >= i$2) break;
			const s$1 = t$2[r$2 >> 2];
			t$2[r$2 >> 2] = t$2[i$2 >> 2], t$2[i$2 >> 2] = s$1, r$2 += 4, i$2 -= 4;
		}
		for (; vecDot(e$2, r$2, o$2) > a$1;) r$2 -= 4;
		return r$2 + 4;
	}
	function vecDot(e$2, t$2, r$2) {
		return e$2[t$2] * r$2[0] + e$2[t$2 + 1] * r$2[1] + e$2[t$2 + 2] * r$2[2] + e$2[t$2 + 3] * r$2[3];
	}
	function stats(e$2, t$2, r$2) {
		const i$2 = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		], o$2 = [
			0,
			0,
			0,
			0
		], a$1 = r$2 - t$2 >> 2;
		for (let a$2 = t$2; a$2 < r$2; a$2 += 4) {
			const t$3 = e$2[a$2] * (1 / 255), r$3 = e$2[a$2 + 1] * (1 / 255), s$1 = e$2[a$2 + 2] * (1 / 255), f$1 = e$2[a$2 + 3] * (1 / 255);
			o$2[0] += t$3, o$2[1] += r$3, o$2[2] += s$1, o$2[3] += f$1, i$2[0] += t$3 * t$3, i$2[1] += t$3 * r$3, i$2[2] += t$3 * s$1, i$2[3] += t$3 * f$1, i$2[5] += r$3 * r$3, i$2[6] += r$3 * s$1, i$2[7] += r$3 * f$1, i$2[10] += s$1 * s$1, i$2[11] += s$1 * f$1, i$2[15] += f$1 * f$1;
		}
		return i$2[4] = i$2[1], i$2[8] = i$2[2], i$2[9] = i$2[6], i$2[12] = i$2[3], i$2[13] = i$2[7], i$2[14] = i$2[11], {
			R: i$2,
			m: o$2,
			N: a$1
		};
	}
	function estats(e$2) {
		const { R: t$2 } = e$2, { m: r$2 } = e$2, { N: i$2 } = e$2, a$1 = r$2[0], s$1 = r$2[1], f$1 = r$2[2], l$1 = r$2[3], c$1 = 0 == i$2 ? 0 : 1 / i$2, u = [
			t$2[0] - a$1 * a$1 * c$1,
			t$2[1] - a$1 * s$1 * c$1,
			t$2[2] - a$1 * f$1 * c$1,
			t$2[3] - a$1 * l$1 * c$1,
			t$2[4] - s$1 * a$1 * c$1,
			t$2[5] - s$1 * s$1 * c$1,
			t$2[6] - s$1 * f$1 * c$1,
			t$2[7] - s$1 * l$1 * c$1,
			t$2[8] - f$1 * a$1 * c$1,
			t$2[9] - f$1 * s$1 * c$1,
			t$2[10] - f$1 * f$1 * c$1,
			t$2[11] - f$1 * l$1 * c$1,
			t$2[12] - l$1 * a$1 * c$1,
			t$2[13] - l$1 * s$1 * c$1,
			t$2[14] - l$1 * f$1 * c$1,
			t$2[15] - l$1 * l$1 * c$1
		], h = u, d = o$1;
		let A = [
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random()
		], g = 0, p = 0;
		if (0 != i$2) for (let e$3 = 0; e$3 < 16 && (A = d.multVec(h, A), p = Math.sqrt(d.dot(A, A)), A = d.sml(1 / p, A), !(0 != e$3 && Math.abs(p - g) < 1e-9)); e$3++) g = p;
		const m = [
			a$1 * c$1,
			s$1 * c$1,
			f$1 * c$1,
			l$1 * c$1
		];
		return {
			Cov: u,
			q: m,
			e: A,
			L: g,
			eMq255: d.dot(d.sml(255, m), A),
			eMq: d.dot(A, m),
			rgba: (Math.round(255 * m[3]) << 24 | Math.round(255 * m[2]) << 16 | Math.round(255 * m[1]) << 8 | Math.round(255 * m[0]) << 0) >>> 0
		};
	}
	var o$1 = {
		multVec: (e$2, t$2) => [
			e$2[0] * t$2[0] + e$2[1] * t$2[1] + e$2[2] * t$2[2] + e$2[3] * t$2[3],
			e$2[4] * t$2[0] + e$2[5] * t$2[1] + e$2[6] * t$2[2] + e$2[7] * t$2[3],
			e$2[8] * t$2[0] + e$2[9] * t$2[1] + e$2[10] * t$2[2] + e$2[11] * t$2[3],
			e$2[12] * t$2[0] + e$2[13] * t$2[1] + e$2[14] * t$2[2] + e$2[15] * t$2[3]
		],
		dot: (e$2, t$2) => e$2[0] * t$2[0] + e$2[1] * t$2[1] + e$2[2] * t$2[2] + e$2[3] * t$2[3],
		sml: (e$2, t$2) => [
			e$2 * t$2[0],
			e$2 * t$2[1],
			e$2 * t$2[2],
			e$2 * t$2[3]
		]
	};
	UPNG.encode = function encode$1(e$2, t$2, r$2, i$2, o$2, a$1, s$1) {
		i$2 ??= 0, s$1 ??= !1;
		const f$1 = compress$2(e$2, t$2, r$2, i$2, [
			!1,
			!1,
			!1,
			0,
			s$1,
			!1
		]);
		return compressPNG(f$1, -1), _main(f$1, t$2, r$2, o$2, a$1);
	}, UPNG.encodeLL = function encodeLL(e$2, t$2, r$2, i$2, o$2, a$1, s$1, f$1) {
		const l$1 = {
			ctype: 0 + (1 == i$2 ? 0 : 2) + (0 == o$2 ? 0 : 4),
			depth: a$1,
			frames: []
		}, c$1 = (i$2 + o$2) * a$1, u = c$1 * t$2;
		for (let i$3 = 0; i$3 < e$2.length; i$3++) l$1.frames.push({
			rect: {
				x: 0,
				y: 0,
				width: t$2,
				height: r$2
			},
			img: new Uint8Array(e$2[i$3]),
			blend: 0,
			dispose: 1,
			bpp: Math.ceil(c$1 / 8),
			bpl: Math.ceil(u / 8)
		});
		return compressPNG(l$1, 0, !0), _main(l$1, t$2, r$2, s$1, f$1);
	}, UPNG.encode.compress = compress$2, UPNG.encode.dither = dither, UPNG.quantize = quantize, UPNG.quantize.getKDtree = getKDtree, UPNG.quantize.getNearest = getNearest;
})();
var r = {
	toArrayBuffer(e$1, t$1) {
		const i$1 = e$1.width, o$1 = e$1.height, a$1 = i$1 << 2, s$1 = e$1.getContext("2d").getImageData(0, 0, i$1, o$1), f$1 = new Uint32Array(s$1.data.buffer), l$1 = (32 * i$1 + 31) / 32 << 2, c$1 = l$1 * o$1, u = 122 + c$1, h = new ArrayBuffer(u), d = new DataView(h), A = 1 << 20;
		let g, p, m, w, v = A, b = 0, y = 0, E = 0;
		function set16(e$2) {
			d.setUint16(y, e$2, !0), y += 2;
		}
		function set32(e$2) {
			d.setUint32(y, e$2, !0), y += 4;
		}
		function seek(e$2) {
			y += e$2;
		}
		set16(19778), set32(u), seek(4), set32(122), set32(108), set32(i$1), set32(-o$1 >>> 0), set16(1), set16(32), set32(3), set32(c$1), set32(2835), set32(2835), seek(8), set32(16711680), set32(65280), set32(255), set32(4278190080), set32(1466527264), function convert() {
			for (; b < o$1 && v > 0;) {
				for (w = 122 + b * l$1, g = 0; g < a$1;) v--, p = f$1[E++], m = p >>> 24, d.setUint32(w + g, p << 8 | m), g += 4;
				b++;
			}
			E < f$1.length ? (v = A, setTimeout(convert, r._dly)) : t$1(h);
		}();
	},
	toBlob(e$1, t$1) {
		this.toArrayBuffer(e$1, ((e$2) => {
			t$1(new Blob([e$2], { type: "image/bmp" }));
		}));
	},
	_dly: 9
};
var i = {
	CHROME: "CHROME",
	FIREFOX: "FIREFOX",
	DESKTOP_SAFARI: "DESKTOP_SAFARI",
	IE: "IE",
	IOS: "IOS",
	ETC: "ETC"
}, o = {
	[i.CHROME]: 16384,
	[i.FIREFOX]: 11180,
	[i.DESKTOP_SAFARI]: 16384,
	[i.IE]: 8192,
	[i.IOS]: 4096,
	[i.ETC]: 8192
};
var a = "undefined" != typeof window, s = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope, f = a && window.cordova && window.cordova.require && window.cordova.require("cordova/modulemapper"), CustomFile = (a || s) && (f && f.getOriginalSymbol(window, "File") || "undefined" != typeof File && File), CustomFileReader = (a || s) && (f && f.getOriginalSymbol(window, "FileReader") || "undefined" != typeof FileReader && FileReader);
function getFilefromDataUrl(e$1, t$1, r$1 = Date.now()) {
	return new Promise(((i$1) => {
		const o$1 = e$1.split(","), a$1 = o$1[0].match(/:(.*?);/)[1], s$1 = globalThis.atob(o$1[1]);
		let f$1 = s$1.length;
		const l$1 = new Uint8Array(f$1);
		for (; f$1--;) l$1[f$1] = s$1.charCodeAt(f$1);
		const c$1 = new Blob([l$1], { type: a$1 });
		c$1.name = t$1, c$1.lastModified = r$1, i$1(c$1);
	}));
}
function getDataUrlFromFile(e$1) {
	return new Promise(((t$1, r$1) => {
		const i$1 = new CustomFileReader();
		i$1.onload = () => t$1(i$1.result), i$1.onerror = (e$2) => r$1(e$2), i$1.readAsDataURL(e$1);
	}));
}
function loadImage(e$1) {
	return new Promise(((t$1, r$1) => {
		const i$1 = new Image();
		i$1.onload = () => t$1(i$1), i$1.onerror = (e$2) => r$1(e$2), i$1.src = e$1;
	}));
}
function getBrowserName() {
	if (void 0 !== getBrowserName.cachedResult) return getBrowserName.cachedResult;
	let e$1 = i.ETC;
	const { userAgent: t$1 } = navigator;
	return /Chrom(e|ium)/i.test(t$1) ? e$1 = i.CHROME : /iP(ad|od|hone)/i.test(t$1) && /WebKit/i.test(t$1) ? e$1 = i.IOS : /Safari/i.test(t$1) ? e$1 = i.DESKTOP_SAFARI : /Firefox/i.test(t$1) ? e$1 = i.FIREFOX : (/MSIE/i.test(t$1) || !0 == !!document.documentMode) && (e$1 = i.IE), getBrowserName.cachedResult = e$1, getBrowserName.cachedResult;
}
function approximateBelowMaximumCanvasSizeOfBrowser(e$1, t$1) {
	const i$1 = o[getBrowserName()];
	let a$1 = e$1, s$1 = t$1, f$1 = a$1 * s$1;
	const l$1 = a$1 > s$1 ? s$1 / a$1 : a$1 / s$1;
	for (; f$1 > i$1 * i$1;) {
		const e$2 = (i$1 + a$1) / 2, t$2 = (i$1 + s$1) / 2;
		e$2 < t$2 ? (s$1 = t$2, a$1 = t$2 * l$1) : (s$1 = e$2 * l$1, a$1 = e$2), f$1 = a$1 * s$1;
	}
	return {
		width: a$1,
		height: s$1
	};
}
function getNewCanvasAndCtx(e$1, t$1) {
	let r$1, i$1;
	try {
		if (r$1 = new OffscreenCanvas(e$1, t$1), i$1 = r$1.getContext("2d"), null === i$1) throw new Error("getContext of OffscreenCanvas returns null");
	} catch (e$2) {
		r$1 = document.createElement("canvas"), i$1 = r$1.getContext("2d");
	}
	return r$1.width = e$1, r$1.height = t$1, [r$1, i$1];
}
function drawImageInCanvas(e$1, t$1) {
	const { width: r$1, height: i$1 } = approximateBelowMaximumCanvasSizeOfBrowser(e$1.width, e$1.height), [o$1, a$1] = getNewCanvasAndCtx(r$1, i$1);
	return t$1 && /jpe?g/.test(t$1) && (a$1.fillStyle = "white", a$1.fillRect(0, 0, o$1.width, o$1.height)), a$1.drawImage(e$1, 0, 0, o$1.width, o$1.height), o$1;
}
function isIOS() {
	return void 0 !== isIOS.cachedResult || (isIOS.cachedResult = [
		"iPad Simulator",
		"iPhone Simulator",
		"iPod Simulator",
		"iPad",
		"iPhone",
		"iPod"
	].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "undefined" != typeof document && "ontouchend" in document), isIOS.cachedResult;
}
function drawFileInCanvas(e$1, t$1 = {}) {
	return new Promise((function(r$1, o$1) {
		let a$1, s$1;
		var $Try_2_Post = function() {
			try {
				return s$1 = drawImageInCanvas(a$1, t$1.fileType || e$1.type), r$1([a$1, s$1]);
			} catch (e$2) {
				return o$1(e$2);
			}
		}, $Try_2_Catch = function(t$2) {
			try {
				var $Try_3_Catch = function(e$2) {
					try {
						throw e$2;
					} catch (e$3) {
						return o$1(e$3);
					}
				};
				try {
					let t$3;
					return getDataUrlFromFile(e$1).then((function(e$2) {
						try {
							return t$3 = e$2, loadImage(t$3).then((function(e$3) {
								try {
									return a$1 = e$3, function() {
										try {
											return $Try_2_Post();
										} catch (e$4) {
											return o$1(e$4);
										}
									}();
								} catch (e$4) {
									return $Try_3_Catch(e$4);
								}
							}), $Try_3_Catch);
						} catch (e$3) {
							return $Try_3_Catch(e$3);
						}
					}), $Try_3_Catch);
				} catch (e$2) {
					$Try_3_Catch(e$2);
				}
			} catch (e$2) {
				return o$1(e$2);
			}
		};
		try {
			if (isIOS() || [i.DESKTOP_SAFARI, i.MOBILE_SAFARI].includes(getBrowserName())) throw new Error("Skip createImageBitmap on IOS and Safari");
			return createImageBitmap(e$1).then((function(e$2) {
				try {
					return a$1 = e$2, $Try_2_Post();
				} catch (e$3) {
					return $Try_2_Catch();
				}
			}), $Try_2_Catch);
		} catch (e$2) {
			$Try_2_Catch();
		}
	}));
}
function canvasToFile(e$1, t$1, i$1, o$1, a$1 = 1) {
	return new Promise((function(s$1, f$1) {
		let l$1;
		if ("image/png" === t$1) {
			let c$1, u, h;
			return c$1 = e$1.getContext("2d"), {data: u} = c$1.getImageData(0, 0, e$1.width, e$1.height), h = UPNG.encode([u.buffer], e$1.width, e$1.height, 4096 * a$1), l$1 = new Blob([h], { type: t$1 }), l$1.name = i$1, l$1.lastModified = o$1, $If_4.call(this);
		}
		{
			if ("image/bmp" === t$1) return new Promise(((t$2) => r.toBlob(e$1, t$2))).then(function(e$2) {
				try {
					return l$1 = e$2, l$1.name = i$1, l$1.lastModified = o$1, $If_5.call(this);
				} catch (e$3) {
					return f$1(e$3);
				}
			}.bind(this), f$1);
			{
				if ("function" == typeof OffscreenCanvas && e$1 instanceof OffscreenCanvas) return e$1.convertToBlob({
					type: t$1,
					quality: a$1
				}).then(function(e$2) {
					try {
						return l$1 = e$2, l$1.name = i$1, l$1.lastModified = o$1, $If_6.call(this);
					} catch (e$3) {
						return f$1(e$3);
					}
				}.bind(this), f$1);
				{
					let d;
					return d = e$1.toDataURL(t$1, a$1), getFilefromDataUrl(d, i$1, o$1).then(function(e$2) {
						try {
							return l$1 = e$2, $If_6.call(this);
						} catch (e$3) {
							return f$1(e$3);
						}
					}.bind(this), f$1);
				}
				function $If_6() {
					return $If_5.call(this);
				}
			}
			function $If_5() {
				return $If_4.call(this);
			}
		}
		function $If_4() {
			return s$1(l$1);
		}
	}));
}
function cleanupCanvasMemory(e$1) {
	e$1.width = 0, e$1.height = 0;
}
function isAutoOrientationInBrowser() {
	return new Promise((function(e$1, t$1) {
		let i$1, o$1, a$1, s$1;
		return void 0 !== isAutoOrientationInBrowser.cachedResult ? e$1(isAutoOrientationInBrowser.cachedResult) : getFilefromDataUrl("data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==", "test.jpg", Date.now()).then((function(r$1) {
			try {
				return i$1 = r$1, drawFileInCanvas(i$1).then((function(r$2) {
					try {
						return o$1 = r$2[1], canvasToFile(o$1, i$1.type, i$1.name, i$1.lastModified).then((function(r$3) {
							try {
								return a$1 = r$3, cleanupCanvasMemory(o$1), drawFileInCanvas(a$1).then((function(r$4) {
									try {
										return s$1 = r$4[0], isAutoOrientationInBrowser.cachedResult = 1 === s$1.width && 2 === s$1.height, e$1(isAutoOrientationInBrowser.cachedResult);
									} catch (e$2) {
										return t$1(e$2);
									}
								}), t$1);
							} catch (e$2) {
								return t$1(e$2);
							}
						}), t$1);
					} catch (e$2) {
						return t$1(e$2);
					}
				}), t$1);
			} catch (e$2) {
				return t$1(e$2);
			}
		}), t$1);
	}));
}
function getExifOrientation(e$1) {
	return new Promise(((t$1, r$1) => {
		const i$1 = new CustomFileReader();
		i$1.onload = (e$2) => {
			const r$2 = new DataView(e$2.target.result);
			if (65496 != r$2.getUint16(0, !1)) return t$1(-2);
			const i$2 = r$2.byteLength;
			let o$1 = 2;
			for (; o$1 < i$2;) {
				if (r$2.getUint16(o$1 + 2, !1) <= 8) return t$1(-1);
				const e$3 = r$2.getUint16(o$1, !1);
				if (o$1 += 2, 65505 == e$3) {
					if (1165519206 != r$2.getUint32(o$1 += 2, !1)) return t$1(-1);
					const e$4 = 18761 == r$2.getUint16(o$1 += 6, !1);
					o$1 += r$2.getUint32(o$1 + 4, e$4);
					const i$3 = r$2.getUint16(o$1, e$4);
					o$1 += 2;
					for (let a$1 = 0; a$1 < i$3; a$1++) if (274 == r$2.getUint16(o$1 + 12 * a$1, e$4)) return t$1(r$2.getUint16(o$1 + 12 * a$1 + 8, e$4));
				} else {
					if (65280 != (65280 & e$3)) break;
					o$1 += r$2.getUint16(o$1, !1);
				}
			}
			return t$1(-1);
		}, i$1.onerror = (e$2) => r$1(e$2), i$1.readAsArrayBuffer(e$1);
	}));
}
function handleMaxWidthOrHeight(e$1, t$1) {
	const { width: r$1 } = e$1, { height: i$1 } = e$1, { maxWidthOrHeight: o$1 } = t$1;
	let a$1, s$1 = e$1;
	return isFinite(o$1) && (r$1 > o$1 || i$1 > o$1) && ([s$1, a$1] = getNewCanvasAndCtx(r$1, i$1), r$1 > i$1 ? (s$1.width = o$1, s$1.height = i$1 / r$1 * o$1) : (s$1.width = r$1 / i$1 * o$1, s$1.height = o$1), a$1.drawImage(e$1, 0, 0, s$1.width, s$1.height), cleanupCanvasMemory(e$1)), s$1;
}
function followExifOrientation(e$1, t$1) {
	const { width: r$1 } = e$1, { height: i$1 } = e$1, [o$1, a$1] = getNewCanvasAndCtx(r$1, i$1);
	switch (t$1 > 4 && t$1 < 9 ? (o$1.width = i$1, o$1.height = r$1) : (o$1.width = r$1, o$1.height = i$1), t$1) {
		case 2:
			a$1.transform(-1, 0, 0, 1, r$1, 0);
			break;
		case 3:
			a$1.transform(-1, 0, 0, -1, r$1, i$1);
			break;
		case 4:
			a$1.transform(1, 0, 0, -1, 0, i$1);
			break;
		case 5:
			a$1.transform(0, 1, 1, 0, 0, 0);
			break;
		case 6:
			a$1.transform(0, 1, -1, 0, i$1, 0);
			break;
		case 7:
			a$1.transform(0, -1, -1, 0, i$1, r$1);
			break;
		case 8: a$1.transform(0, -1, 1, 0, 0, r$1);
	}
	return a$1.drawImage(e$1, 0, 0, r$1, i$1), cleanupCanvasMemory(e$1), o$1;
}
function compress$1(e$1, t$1, r$1 = 0) {
	return new Promise((function(i$1, o$1) {
		let a$1, s$1, f$1, l$1, c$1, u, h, d, A, g, p, m, w, v, b, y, E, F, _, B;
		function incProgress(e$2 = 5) {
			if (t$1.signal && t$1.signal.aborted) throw t$1.signal.reason;
			a$1 += e$2, t$1.onProgress(Math.min(a$1, 100));
		}
		function setProgress(e$2) {
			if (t$1.signal && t$1.signal.aborted) throw t$1.signal.reason;
			a$1 = Math.min(Math.max(e$2, a$1), 100), t$1.onProgress(a$1);
		}
		return a$1 = r$1, s$1 = t$1.maxIteration || 10, f$1 = 1024 * t$1.maxSizeMB * 1024, incProgress(), drawFileInCanvas(e$1, t$1).then(function(r$2) {
			try {
				return [, l$1] = r$2, incProgress(), c$1 = handleMaxWidthOrHeight(l$1, t$1), incProgress(), new Promise((function(r$3, i$2) {
					var o$2;
					if (!(o$2 = t$1.exifOrientation)) return getExifOrientation(e$1).then(function(e$2) {
						try {
							return o$2 = e$2, $If_2.call(this);
						} catch (e$3) {
							return i$2(e$3);
						}
					}.bind(this), i$2);
					function $If_2() {
						return r$3(o$2);
					}
					return $If_2.call(this);
				})).then(function(r$3) {
					try {
						return u = r$3, incProgress(), isAutoOrientationInBrowser().then(function(r$4) {
							try {
								return h = r$4 ? c$1 : followExifOrientation(c$1, u), incProgress(), d = t$1.initialQuality || 1, A = t$1.fileType || e$1.type, canvasToFile(h, A, e$1.name, e$1.lastModified, d).then(function(r$5) {
									try {
										{
											if (g = r$5, incProgress(), p = g.size > f$1, m = g.size > e$1.size, !p && !m) return setProgress(100), i$1(g);
											var a$2;
											function $Loop_3() {
												if (s$1-- && (b > f$1 || b > w)) {
													let t$2, r$6;
													return t$2 = B ? .95 * _.width : _.width, r$6 = B ? .95 * _.height : _.height, [E, F] = getNewCanvasAndCtx(t$2, r$6), F.drawImage(_, 0, 0, t$2, r$6), d *= "image/png" === A ? .85 : .95, canvasToFile(E, A, e$1.name, e$1.lastModified, d).then((function(e$2) {
														try {
															return y = e$2, cleanupCanvasMemory(_), _ = E, b = y.size, setProgress(Math.min(99, Math.floor((v - b) / (v - f$1) * 100))), $Loop_3;
														} catch (e$3) {
															return o$1(e$3);
														}
													}), o$1);
												}
												return [1];
											}
											return w = e$1.size, v = g.size, b = v, _ = h, B = !t$1.alwaysKeepResolution && p, (a$2 = function(e$2) {
												for (; e$2;) {
													if (e$2.then) return void e$2.then(a$2, o$1);
													try {
														if (e$2.pop) {
															if (e$2.length) return e$2.pop() ? $Loop_3_exit.call(this) : e$2;
															e$2 = $Loop_3;
														} else e$2 = e$2.call(this);
													} catch (e$3) {
														return o$1(e$3);
													}
												}
											}.bind(this))($Loop_3);
											function $Loop_3_exit() {
												return cleanupCanvasMemory(_), cleanupCanvasMemory(E), cleanupCanvasMemory(c$1), cleanupCanvasMemory(h), cleanupCanvasMemory(l$1), setProgress(100), i$1(y);
											}
										}
									} catch (u$1) {
										return o$1(u$1);
									}
								}.bind(this), o$1);
							} catch (e$2) {
								return o$1(e$2);
							}
						}.bind(this), o$1);
					} catch (e$2) {
						return o$1(e$2);
					}
				}.bind(this), o$1);
			} catch (e$2) {
				return o$1(e$2);
			}
		}.bind(this), o$1);
	}));
}
var l = "\nlet scriptImported = false\nself.addEventListener('message', async (e) => {\n  const { file, id, imageCompressionLibUrl, options } = e.data\n  options.onProgress = (progress) => self.postMessage({ progress, id })\n  try {\n    if (!scriptImported) {\n      // console.log('[worker] importScripts', imageCompressionLibUrl)\n      self.importScripts(imageCompressionLibUrl)\n      scriptImported = true\n    }\n    // console.log('[worker] self', self)\n    const compressedFile = await imageCompression(file, options)\n    self.postMessage({ file: compressedFile, id })\n  } catch (e) {\n    // console.error('[worker] error', e)\n    self.postMessage({ error: e.message + '\\n' + e.stack, id })\n  }\n})\n";
var c;
function compressOnWebWorker(e$1, t$1) {
	return new Promise(((r$1, i$1) => {
		c || (c = function createWorkerScriptURL(e$2) {
			const t$2 = [];
			return "function" == typeof e$2 ? t$2.push(`(${e$2})()`) : t$2.push(e$2), URL.createObjectURL(new Blob(t$2));
		}(l));
		const o$1 = new Worker(c);
		o$1.addEventListener("message", (function handler(e$2) {
			if (t$1.signal && t$1.signal.aborted) o$1.terminate();
			else if (void 0 === e$2.data.progress) {
				if (e$2.data.error) return i$1(new Error(e$2.data.error)), void o$1.terminate();
				r$1(e$2.data.file), o$1.terminate();
			} else t$1.onProgress(e$2.data.progress);
		})), o$1.addEventListener("error", i$1), t$1.signal && t$1.signal.addEventListener("abort", (() => {
			i$1(t$1.signal.reason), o$1.terminate();
		})), o$1.postMessage({
			file: e$1,
			imageCompressionLibUrl: t$1.libURL,
			options: {
				...t$1,
				onProgress: void 0,
				signal: void 0
			}
		});
	}));
}
function imageCompression(e$1, t$1) {
	return new Promise((function(r$1, i$1) {
		let o$1, a$1, s$1, f$1, l$1, c$1;
		if (o$1 = { ...t$1 }, s$1 = 0, {onProgress: f$1} = o$1, o$1.maxSizeMB = o$1.maxSizeMB || Number.POSITIVE_INFINITY, l$1 = "boolean" != typeof o$1.useWebWorker || o$1.useWebWorker, delete o$1.useWebWorker, o$1.onProgress = (e$2) => {
			s$1 = e$2, "function" == typeof f$1 && f$1(s$1);
		}, !(e$1 instanceof Blob || e$1 instanceof CustomFile)) return i$1(/* @__PURE__ */ new Error("The file given is not an instance of Blob or File"));
		if (!/^image/.test(e$1.type)) return i$1(/* @__PURE__ */ new Error("The file given is not an image"));
		if (c$1 = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope, !l$1 || "function" != typeof Worker || c$1) return compress$1(e$1, o$1).then(function(e$2) {
			try {
				return a$1 = e$2, $If_4.call(this);
			} catch (e$3) {
				return i$1(e$3);
			}
		}.bind(this), i$1);
		var u = function() {
			try {
				return $If_4.call(this);
			} catch (e$2) {
				return i$1(e$2);
			}
		}.bind(this), $Try_1_Catch = function(t$2) {
			try {
				return compress$1(e$1, o$1).then((function(e$2) {
					try {
						return a$1 = e$2, u();
					} catch (e$3) {
						return i$1(e$3);
					}
				}), i$1);
			} catch (e$2) {
				return i$1(e$2);
			}
		};
		try {
			return o$1.libURL = o$1.libURL || "https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js", compressOnWebWorker(e$1, o$1).then((function(e$2) {
				try {
					return a$1 = e$2, u();
				} catch (e$3) {
					return $Try_1_Catch();
				}
			}), $Try_1_Catch);
		} catch (e$2) {
			$Try_1_Catch();
		}
		function $If_4() {
			try {
				a$1.name = e$1.name, a$1.lastModified = e$1.lastModified;
			} catch (e$2) {}
			try {
				o$1.preserveExif && "image/jpeg" === e$1.type && (!o$1.fileType || o$1.fileType && o$1.fileType === e$1.type) && (a$1 = copyExifWithoutOrientation(e$1, a$1));
			} catch (e$2) {}
			return r$1(a$1);
		}
	}));
}
imageCompression.getDataUrlFromFile = getDataUrlFromFile, imageCompression.getFilefromDataUrl = getFilefromDataUrl, imageCompression.loadImage = loadImage, imageCompression.drawImageInCanvas = drawImageInCanvas, imageCompression.drawFileInCanvas = drawFileInCanvas, imageCompression.canvasToFile = canvasToFile, imageCompression.getExifOrientation = getExifOrientation, imageCompression.handleMaxWidthOrHeight = handleMaxWidthOrHeight, imageCompression.followExifOrientation = followExifOrientation, imageCompression.cleanupCanvasMemory = cleanupCanvasMemory, imageCompression.isAutoOrientationInBrowser = isAutoOrientationInBrowser, imageCompression.approximateBelowMaximumCanvasSizeOfBrowser = approximateBelowMaximumCanvasSizeOfBrowser, imageCompression.copyExifWithoutOrientation = copyExifWithoutOrientation, imageCompression.getBrowserName = getBrowserName, imageCompression.version = "2.0.2";
function resolveUrl(url, baseUrl) {
	if (url.match(/^[a-z]+:\/\//i)) return url;
	if (url.match(/^\/\//)) return window.location.protocol + url;
	if (url.match(/^[a-z]+:/i)) return url;
	const doc = document.implementation.createHTMLDocument();
	const base = doc.createElement("base");
	const a$1 = doc.createElement("a");
	doc.head.appendChild(base);
	doc.body.appendChild(a$1);
	if (baseUrl) base.href = baseUrl;
	a$1.href = url;
	return a$1.href;
}
const uuid = (() => {
	let counter = 0;
	const random = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
	return () => {
		counter += 1;
		return `u${random()}${counter}`;
	};
})();
function toArray(arrayLike) {
	const arr = [];
	for (let i$1 = 0, l$1 = arrayLike.length; i$1 < l$1; i$1++) arr.push(arrayLike[i$1]);
	return arr;
}
var styleProps = null;
function getStyleProperties(options = {}) {
	if (styleProps) return styleProps;
	if (options.includeStyleProperties) {
		styleProps = options.includeStyleProperties;
		return styleProps;
	}
	styleProps = toArray(window.getComputedStyle(document.documentElement));
	return styleProps;
}
function px$1(node, styleProperty) {
	const val = (node.ownerDocument.defaultView || window).getComputedStyle(node).getPropertyValue(styleProperty);
	return val ? parseFloat(val.replace("px", "")) : 0;
}
function getNodeWidth(node) {
	const leftBorder = px$1(node, "border-left-width");
	const rightBorder = px$1(node, "border-right-width");
	return node.clientWidth + leftBorder + rightBorder;
}
function getNodeHeight(node) {
	const topBorder = px$1(node, "border-top-width");
	const bottomBorder = px$1(node, "border-bottom-width");
	return node.clientHeight + topBorder + bottomBorder;
}
function getImageSize(targetNode, options = {}) {
	return {
		width: options.width || getNodeWidth(targetNode),
		height: options.height || getNodeHeight(targetNode)
	};
}
function getPixelRatio() {
	let ratio;
	let FINAL_PROCESS;
	try {
		FINAL_PROCESS = process;
	} catch (e$1) {}
	const val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
	if (val) {
		ratio = parseInt(val, 10);
		if (Number.isNaN(ratio)) ratio = 1;
	}
	return ratio || window.devicePixelRatio || 1;
}
var canvasDimensionLimit = 16384;
function checkCanvasDimensions(canvas) {
	if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) if (canvas.width > canvas.height) {
		canvas.height *= canvasDimensionLimit / canvas.width;
		canvas.width = canvasDimensionLimit;
	} else {
		canvas.width *= canvasDimensionLimit / canvas.height;
		canvas.height = canvasDimensionLimit;
	}
	else if (canvas.width > canvasDimensionLimit) {
		canvas.height *= canvasDimensionLimit / canvas.width;
		canvas.width = canvasDimensionLimit;
	} else {
		canvas.width *= canvasDimensionLimit / canvas.height;
		canvas.height = canvasDimensionLimit;
	}
}
function createImage(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			img.decode().then(() => {
				requestAnimationFrame(() => resolve(img));
			});
		};
		img.onerror = reject;
		img.crossOrigin = "anonymous";
		img.decoding = "async";
		img.src = url;
	});
}
async function svgToDataURL(svg) {
	return Promise.resolve().then(() => new XMLSerializer().serializeToString(svg)).then(encodeURIComponent).then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
}
async function nodeToDataURL(node, width, height) {
	const xmlns = "http://www.w3.org/2000/svg";
	const svg = document.createElementNS(xmlns, "svg");
	const foreignObject = document.createElementNS(xmlns, "foreignObject");
	svg.setAttribute("width", `${width}`);
	svg.setAttribute("height", `${height}`);
	svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
	foreignObject.setAttribute("width", "100%");
	foreignObject.setAttribute("height", "100%");
	foreignObject.setAttribute("x", "0");
	foreignObject.setAttribute("y", "0");
	foreignObject.setAttribute("externalResourcesRequired", "true");
	svg.appendChild(foreignObject);
	foreignObject.appendChild(node);
	return svgToDataURL(svg);
}
const isInstanceOfElement = (node, instance) => {
	if (node instanceof instance) return true;
	const nodePrototype = Object.getPrototypeOf(node);
	if (nodePrototype === null) return false;
	return nodePrototype.constructor.name === instance.name || isInstanceOfElement(nodePrototype, instance);
};
function formatCSSText(style) {
	const content = style.getPropertyValue("content");
	return `${style.cssText} content: '${content.replace(/'|"/g, "")}';`;
}
function formatCSSProperties(style, options) {
	return getStyleProperties(options).map((name) => {
		return `${name}: ${style.getPropertyValue(name)}${style.getPropertyPriority(name) ? " !important" : ""};`;
	}).join(" ");
}
function getPseudoElementStyle(className, pseudo, style, options) {
	const selector = `.${className}:${pseudo}`;
	const cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style, options);
	return document.createTextNode(`${selector}{${cssText}}`);
}
function clonePseudoElement(nativeNode, clonedNode, pseudo, options) {
	const style = window.getComputedStyle(nativeNode, pseudo);
	const content = style.getPropertyValue("content");
	if (content === "" || content === "none") return;
	const className = uuid();
	try {
		clonedNode.className = `${clonedNode.className} ${className}`;
	} catch (err) {
		return;
	}
	const styleElement = document.createElement("style");
	styleElement.appendChild(getPseudoElementStyle(className, pseudo, style, options));
	clonedNode.appendChild(styleElement);
}
function clonePseudoElements(nativeNode, clonedNode, options) {
	clonePseudoElement(nativeNode, clonedNode, ":before", options);
	clonePseudoElement(nativeNode, clonedNode, ":after", options);
}
var WOFF = "application/font-woff";
var JPEG = "image/jpeg";
var mimes = {
	woff: WOFF,
	woff2: WOFF,
	ttf: "application/font-truetype",
	eot: "application/vnd.ms-fontobject",
	png: "image/png",
	jpg: JPEG,
	jpeg: JPEG,
	gif: "image/gif",
	tiff: "image/tiff",
	svg: "image/svg+xml",
	webp: "image/webp"
};
function getExtension(url) {
	const match = /\.([^./]*?)$/g.exec(url);
	return match ? match[1] : "";
}
function getMimeType(url) {
	return mimes[getExtension(url).toLowerCase()] || "";
}
function getContentFromDataUrl(dataURL) {
	return dataURL.split(/,/)[1];
}
function isDataUrl(url) {
	return url.search(/^(data:)/) !== -1;
}
function makeDataUrl(content, mimeType) {
	return `data:${mimeType};base64,${content}`;
}
async function fetchAsDataURL(url, init, process$1) {
	const res = await fetch(url, init);
	if (res.status === 404) throw new Error(`Resource "${res.url}" not found`);
	const blob = await res.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = reject;
		reader.onloadend = () => {
			try {
				resolve(process$1({
					res,
					result: reader.result
				}));
			} catch (error) {
				reject(error);
			}
		};
		reader.readAsDataURL(blob);
	});
}
var cache = {};
function getCacheKey(url, contentType, includeQueryParams) {
	let key = url.replace(/\?.*/, "");
	if (includeQueryParams) key = url;
	if (/ttf|otf|eot|woff2?/i.test(key)) key = key.replace(/.*\//, "");
	return contentType ? `[${contentType}]${key}` : key;
}
async function resourceToDataURL(resourceUrl, contentType, options) {
	const cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
	if (cache[cacheKey] != null) return cache[cacheKey];
	if (options.cacheBust) resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
	let dataURL;
	try {
		dataURL = makeDataUrl(await fetchAsDataURL(resourceUrl, options.fetchRequestInit, ({ res, result }) => {
			if (!contentType) contentType = res.headers.get("Content-Type") || "";
			return getContentFromDataUrl(result);
		}), contentType);
	} catch (error) {
		dataURL = options.imagePlaceholder || "";
		let msg = `Failed to fetch resource: ${resourceUrl}`;
		if (error) msg = typeof error === "string" ? error : error.message;
		if (msg) console.warn(msg);
	}
	cache[cacheKey] = dataURL;
	return dataURL;
}
async function cloneCanvasElement(canvas) {
	const dataURL = canvas.toDataURL();
	if (dataURL === "data:,") return canvas.cloneNode(false);
	return createImage(dataURL);
}
async function cloneVideoElement(video, options) {
	if (video.currentSrc) {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		canvas.width = video.clientWidth;
		canvas.height = video.clientHeight;
		ctx === null || ctx === void 0 || ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		return createImage(canvas.toDataURL());
	}
	const poster = video.poster;
	return createImage(await resourceToDataURL(poster, getMimeType(poster), options));
}
async function cloneIFrameElement(iframe, options) {
	var _a;
	try {
		if ((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) return await cloneNode(iframe.contentDocument.body, options, true);
	} catch (_b) {}
	return iframe.cloneNode(false);
}
async function cloneSingleNode(node, options) {
	if (isInstanceOfElement(node, HTMLCanvasElement)) return cloneCanvasElement(node);
	if (isInstanceOfElement(node, HTMLVideoElement)) return cloneVideoElement(node, options);
	if (isInstanceOfElement(node, HTMLIFrameElement)) return cloneIFrameElement(node, options);
	return node.cloneNode(isSVGElement$1(node));
}
var isSlotElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SLOT";
var isSVGElement$1 = (node) => node.tagName != null && node.tagName.toUpperCase() === "SVG";
async function cloneChildren(nativeNode, clonedNode, options) {
	var _a, _b;
	if (isSVGElement$1(clonedNode)) return clonedNode;
	let children = [];
	if (isSlotElement(nativeNode) && nativeNode.assignedNodes) children = toArray(nativeNode.assignedNodes());
	else if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) children = toArray(nativeNode.contentDocument.body.childNodes);
	else children = toArray(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
	if (children.length === 0 || isInstanceOfElement(nativeNode, HTMLVideoElement)) return clonedNode;
	await children.reduce((deferred, child) => deferred.then(() => cloneNode(child, options)).then((clonedChild) => {
		if (clonedChild) clonedNode.appendChild(clonedChild);
	}), Promise.resolve());
	return clonedNode;
}
function cloneCSSStyle(nativeNode, clonedNode, options) {
	const targetStyle = clonedNode.style;
	if (!targetStyle) return;
	const sourceStyle = window.getComputedStyle(nativeNode);
	if (sourceStyle.cssText) {
		targetStyle.cssText = sourceStyle.cssText;
		targetStyle.transformOrigin = sourceStyle.transformOrigin;
	} else getStyleProperties(options).forEach((name) => {
		let value = sourceStyle.getPropertyValue(name);
		if (name === "font-size" && value.endsWith("px")) value = `${Math.floor(parseFloat(value.substring(0, value.length - 2))) - .1}px`;
		if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && name === "display" && value === "inline") value = "block";
		if (name === "d" && clonedNode.getAttribute("d")) value = `path(${clonedNode.getAttribute("d")})`;
		targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
	});
}
function cloneInputValue(nativeNode, clonedNode) {
	if (isInstanceOfElement(nativeNode, HTMLTextAreaElement)) clonedNode.innerHTML = nativeNode.value;
	if (isInstanceOfElement(nativeNode, HTMLInputElement)) clonedNode.setAttribute("value", nativeNode.value);
}
function cloneSelectValue(nativeNode, clonedNode) {
	if (isInstanceOfElement(nativeNode, HTMLSelectElement)) {
		const clonedSelect = clonedNode;
		const selectedOption = Array.from(clonedSelect.children).find((child) => nativeNode.value === child.getAttribute("value"));
		if (selectedOption) selectedOption.setAttribute("selected", "");
	}
}
function decorate(nativeNode, clonedNode, options) {
	if (isInstanceOfElement(clonedNode, Element)) {
		cloneCSSStyle(nativeNode, clonedNode, options);
		clonePseudoElements(nativeNode, clonedNode, options);
		cloneInputValue(nativeNode, clonedNode);
		cloneSelectValue(nativeNode, clonedNode);
	}
	return clonedNode;
}
async function ensureSVGSymbols(clone, options) {
	const uses = clone.querySelectorAll ? clone.querySelectorAll("use") : [];
	if (uses.length === 0) return clone;
	const processedDefs = {};
	for (let i$1 = 0; i$1 < uses.length; i$1++) {
		const id$2 = uses[i$1].getAttribute("xlink:href");
		if (id$2) {
			const exist = clone.querySelector(id$2);
			const definition = document.querySelector(id$2);
			if (!exist && definition && !processedDefs[id$2]) processedDefs[id$2] = await cloneNode(definition, options, true);
		}
	}
	const nodes = Object.values(processedDefs);
	if (nodes.length) {
		const ns = "http://www.w3.org/1999/xhtml";
		const svg = document.createElementNS(ns, "svg");
		svg.setAttribute("xmlns", ns);
		svg.style.position = "absolute";
		svg.style.width = "0";
		svg.style.height = "0";
		svg.style.overflow = "hidden";
		svg.style.display = "none";
		const defs = document.createElementNS(ns, "defs");
		svg.appendChild(defs);
		for (let i$1 = 0; i$1 < nodes.length; i$1++) defs.appendChild(nodes[i$1]);
		clone.appendChild(svg);
	}
	return clone;
}
async function cloneNode(node, options, isRoot) {
	if (!isRoot && options.filter && !options.filter(node)) return null;
	return Promise.resolve(node).then((clonedNode) => cloneSingleNode(clonedNode, options)).then((clonedNode) => cloneChildren(node, clonedNode, options)).then((clonedNode) => decorate(node, clonedNode, options)).then((clonedNode) => ensureSVGSymbols(clonedNode, options));
}
var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function toRegex(url) {
	const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
	return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
}
function parseURLs(cssText) {
	const urls = [];
	cssText.replace(URL_REGEX, (raw, quotation, url) => {
		urls.push(url);
		return raw;
	});
	return urls.filter((url) => !isDataUrl(url));
}
async function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
	try {
		const resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
		const contentType = getMimeType(resourceURL);
		let dataURL;
		if (getContentFromUrl) dataURL = makeDataUrl(await getContentFromUrl(resolvedURL), contentType);
		else dataURL = await resourceToDataURL(resolvedURL, contentType, options);
		return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
	} catch (error) {}
	return cssText;
}
function filterPreferredFontFormat(str, { preferredFontFormat }) {
	return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, (match) => {
		while (true) {
			const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
			if (!format) return "";
			if (format === preferredFontFormat) return `src: ${src};`;
		}
	});
}
function shouldEmbed(url) {
	return url.search(URL_REGEX) !== -1;
}
async function embedResources(cssText, baseUrl, options) {
	if (!shouldEmbed(cssText)) return cssText;
	const filteredCSSText = filterPreferredFontFormat(cssText, options);
	return parseURLs(filteredCSSText).reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText));
}
async function embedProp(propName, node, options) {
	var _a;
	const propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
	if (propValue) {
		const cssString = await embedResources(propValue, null, options);
		node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
		return true;
	}
	return false;
}
async function embedBackground(clonedNode, options) {
	await embedProp("background", clonedNode, options) || await embedProp("background-image", clonedNode, options);
	await embedProp("mask", clonedNode, options) || await embedProp("-webkit-mask", clonedNode, options) || await embedProp("mask-image", clonedNode, options) || await embedProp("-webkit-mask-image", clonedNode, options);
}
async function embedImageNode(clonedNode, options) {
	const isImageElement = isInstanceOfElement(clonedNode, HTMLImageElement);
	if (!(isImageElement && !isDataUrl(clonedNode.src)) && !(isInstanceOfElement(clonedNode, SVGImageElement) && !isDataUrl(clonedNode.href.baseVal))) return;
	const url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
	const dataURL = await resourceToDataURL(url, getMimeType(url), options);
	await new Promise((resolve, reject) => {
		clonedNode.onload = resolve;
		clonedNode.onerror = options.onImageErrorHandler ? (...attributes) => {
			try {
				resolve(options.onImageErrorHandler(...attributes));
			} catch (error) {
				reject(error);
			}
		} : reject;
		const image = clonedNode;
		if (image.decode) image.decode = resolve;
		if (image.loading === "lazy") image.loading = "eager";
		if (isImageElement) {
			clonedNode.srcset = "";
			clonedNode.src = dataURL;
		} else clonedNode.href.baseVal = dataURL;
	});
}
async function embedChildren(clonedNode, options) {
	const deferreds = toArray(clonedNode.childNodes).map((child) => embedImages(child, options));
	await Promise.all(deferreds).then(() => clonedNode);
}
async function embedImages(clonedNode, options) {
	if (isInstanceOfElement(clonedNode, Element)) {
		await embedBackground(clonedNode, options);
		await embedImageNode(clonedNode, options);
		await embedChildren(clonedNode, options);
	}
}
function applyStyle(node, options) {
	const { style } = node;
	if (options.backgroundColor) style.backgroundColor = options.backgroundColor;
	if (options.width) style.width = `${options.width}px`;
	if (options.height) style.height = `${options.height}px`;
	const manual = options.style;
	if (manual != null) Object.keys(manual).forEach((key) => {
		style[key] = manual[key];
	});
	return node;
}
var cssFetchCache = {};
async function fetchCSS(url) {
	let cache$1 = cssFetchCache[url];
	if (cache$1 != null) return cache$1;
	cache$1 = {
		url,
		cssText: await (await fetch(url)).text()
	};
	cssFetchCache[url] = cache$1;
	return cache$1;
}
async function embedFonts(data, options) {
	let cssText = data.cssText;
	const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
	const loadFonts = (cssText.match(/url\([^)]+\)/g) || []).map(async (loc) => {
		let url = loc.replace(regexUrl, "$1");
		if (!url.startsWith("https://")) url = new URL(url, data.url).href;
		return fetchAsDataURL(url, options.fetchRequestInit, ({ result }) => {
			cssText = cssText.replace(loc, `url(${result})`);
			return [loc, result];
		});
	});
	return Promise.all(loadFonts).then(() => cssText);
}
function parseCSS(source) {
	if (source == null) return [];
	const result = [];
	let cssText = source.replace(/(\/\*[\s\S]*?\*\/)/gi, "");
	const keyframesRegex = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
	while (true) {
		const matches = keyframesRegex.exec(cssText);
		if (matches === null) break;
		result.push(matches[0]);
	}
	cssText = cssText.replace(keyframesRegex, "");
	const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
	const unifiedRegex = new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
	while (true) {
		let matches = importRegex.exec(cssText);
		if (matches === null) {
			matches = unifiedRegex.exec(cssText);
			if (matches === null) break;
			else importRegex.lastIndex = unifiedRegex.lastIndex;
		} else unifiedRegex.lastIndex = importRegex.lastIndex;
		result.push(matches[0]);
	}
	return result;
}
async function getCSSRules(styleSheets, options) {
	const ret = [];
	const deferreds = [];
	styleSheets.forEach((sheet) => {
		if ("cssRules" in sheet) try {
			toArray(sheet.cssRules || []).forEach((item, index) => {
				if (item.type === CSSRule.IMPORT_RULE) {
					let importIndex = index + 1;
					const url = item.href;
					const deferred = fetchCSS(url).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
						try {
							sheet.insertRule(rule, rule.startsWith("@import") ? importIndex += 1 : sheet.cssRules.length);
						} catch (error) {
							console.error("Error inserting rule from remote css", {
								rule,
								error
							});
						}
					})).catch((e$1) => {
						console.error("Error loading remote css", e$1.toString());
					});
					deferreds.push(deferred);
				}
			});
		} catch (e$1) {
			const inline = styleSheets.find((a$1) => a$1.href == null) || document.styleSheets[0];
			if (sheet.href != null) deferreds.push(fetchCSS(sheet.href).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
				inline.insertRule(rule, inline.cssRules.length);
			})).catch((err) => {
				console.error("Error loading remote stylesheet", err);
			}));
			console.error("Error inlining remote css file", e$1);
		}
	});
	return Promise.all(deferreds).then(() => {
		styleSheets.forEach((sheet) => {
			if ("cssRules" in sheet) try {
				toArray(sheet.cssRules || []).forEach((item) => {
					ret.push(item);
				});
			} catch (e$1) {
				console.error(`Error while reading CSS rules from ${sheet.href}`, e$1);
			}
		});
		return ret;
	});
}
function getWebFontRules(cssRules) {
	return cssRules.filter((rule) => rule.type === CSSRule.FONT_FACE_RULE).filter((rule) => shouldEmbed(rule.style.getPropertyValue("src")));
}
async function parseWebFontRules(node, options) {
	if (node.ownerDocument == null) throw new Error("Provided element is not within a Document");
	return getWebFontRules(await getCSSRules(toArray(node.ownerDocument.styleSheets), options));
}
function normalizeFontFamily(font) {
	return font.trim().replace(/["']/g, "");
}
function getUsedFonts(node) {
	const fonts = /* @__PURE__ */ new Set();
	function traverse(node$1) {
		(node$1.style.fontFamily || getComputedStyle(node$1).fontFamily).split(",").forEach((font) => {
			fonts.add(normalizeFontFamily(font));
		});
		Array.from(node$1.children).forEach((child) => {
			if (child instanceof HTMLElement) traverse(child);
		});
	}
	traverse(node);
	return fonts;
}
async function getWebFontCSS(node, options) {
	const rules = await parseWebFontRules(node, options);
	const usedFonts = getUsedFonts(node);
	return (await Promise.all(rules.filter((rule) => usedFonts.has(normalizeFontFamily(rule.style.fontFamily))).map((rule) => {
		const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
		return embedResources(rule.cssText, baseUrl, options);
	}))).join("\n");
}
async function embedWebFonts(clonedNode, options) {
	const cssText = options.fontEmbedCSS != null ? options.fontEmbedCSS : options.skipFonts ? null : await getWebFontCSS(clonedNode, options);
	if (cssText) {
		const styleNode = document.createElement("style");
		const sytleContent = document.createTextNode(cssText);
		styleNode.appendChild(sytleContent);
		if (clonedNode.firstChild) clonedNode.insertBefore(styleNode, clonedNode.firstChild);
		else clonedNode.appendChild(styleNode);
	}
}
async function toSvg(node, options = {}) {
	const { width, height } = getImageSize(node, options);
	const clonedNode = await cloneNode(node, options, true);
	await embedWebFonts(clonedNode, options);
	await embedImages(clonedNode, options);
	applyStyle(clonedNode, options);
	return await nodeToDataURL(clonedNode, width, height);
}
async function toCanvas(node, options = {}) {
	const { width, height } = getImageSize(node, options);
	const img = await createImage(await toSvg(node, options));
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	const ratio = options.pixelRatio || getPixelRatio();
	const canvasWidth = options.canvasWidth || width;
	const canvasHeight = options.canvasHeight || height;
	canvas.width = canvasWidth * ratio;
	canvas.height = canvasHeight * ratio;
	if (!options.skipAutoScale) checkCanvasDimensions(canvas);
	canvas.style.width = `${canvasWidth}`;
	canvas.style.height = `${canvasHeight}`;
	if (options.backgroundColor) {
		context.fillStyle = options.backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
	context.drawImage(img, 0, 0, canvas.width, canvas.height);
	return canvas;
}
var logger$3 = loggerService.withContext("Utils:image");
const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};
const compressImage = async (file) => {
	return await imageCompression(file, {
		maxSizeMB: 1,
		maxWidthOrHeight: 300,
		useWebWorker: false
	});
};
const captureScrollable = async (elRef) => {
	if (elRef.current) try {
		const el = elRef.current;
		const originalStyle = {
			height: el.style.height,
			maxHeight: el.style.maxHeight,
			overflow: el.style.overflow,
			position: el.style.position
		};
		const originalScrollTop = el.scrollTop;
		el.classList.add("hide-scrollbar");
		el.style.height = "auto";
		el.style.maxHeight = "none";
		el.style.overflow = "visible";
		el.style.position = "static";
		const totalWidth = el.scrollWidth;
		const totalHeight = el.scrollHeight;
		const MAX_ALLOWED_DIMENSION = 32767;
		if (totalHeight > MAX_ALLOWED_DIMENSION || totalWidth > MAX_ALLOWED_DIMENSION) {
			el.style.height = originalStyle.height;
			el.style.maxHeight = originalStyle.maxHeight;
			el.style.overflow = originalStyle.overflow;
			el.style.position = originalStyle.position;
			setTimeout(() => {
				el.scrollTop = originalScrollTop;
			}, 0);
			window.toast.error(i18n_default.t("message.error.dimension_too_large"));
			return Promise.reject();
		}
		const filterHiddenElements = (node) => {
			if (node instanceof HTMLElement) {
				if (node.style.display === "none") return false;
				if (window.getComputedStyle(node).display === "none") return false;
			}
			return true;
		};
		const canvas = await new Promise((resolve, reject) => {
			toCanvas(el, {
				filter: filterHiddenElements,
				backgroundColor: getComputedStyle(el).getPropertyValue("--color-background"),
				cacheBust: true,
				pixelRatio: window.devicePixelRatio,
				skipAutoScale: true,
				canvasWidth: el.scrollWidth,
				canvasHeight: el.scrollHeight,
				style: {
					backgroundColor: getComputedStyle(el).backgroundColor,
					color: getComputedStyle(el).color
				}
			}).then((canvas$1) => resolve(canvas$1)).catch((error) => reject(error));
		});
		el.style.height = originalStyle.height;
		el.style.maxHeight = originalStyle.maxHeight;
		el.style.overflow = originalStyle.overflow;
		el.style.position = originalStyle.position;
		const imageData = canvas;
		setTimeout(() => {
			el.scrollTop = originalScrollTop;
		}, 0);
		return imageData;
	} catch (error) {
		logger$3.error("Error capturing scrollable element:", error);
		throw error;
	} finally {
		elRef.current?.classList.remove("hide-scrollbar");
	}
	return Promise.resolve(void 0);
};
const captureScrollableAsDataURL = async (elRef) => {
	return captureScrollable(elRef).then((canvas) => {
		if (canvas) return canvas.toDataURL("image/png");
		return Promise.resolve(void 0);
	});
};
const captureScrollableAsBlob = async (elRef, func) => {
	await captureScrollable(elRef).then((canvas) => {
		canvas?.toBlob(func, "image/png");
	});
};
async function captureScrollableIframe(iframeRef) {
	const iframe = iframeRef.current;
	if (!iframe?.contentDocument?.defaultView) return void 0;
	const doc = iframe.contentDocument;
	const win = iframe.contentWindow;
	const disableAnimations = () => {
		const style = doc.createElement("style");
		style.textContent = `*, *::before, *::after {
      animation: none !important;
      transition: none !important;
      // transform: none !important;
    }`;
		doc.head.appendChild(style);
		return style;
	};
	const inlineFonts = async () => {
		const fontFaceRegex = /@font-face[\s\S]*?\}/g;
		const fontUrlRegex = /url\((['"]?)([^)"']+)\1\)/g;
		const fontExtRegex = /\.(woff2?|ttf|otf)(\?|#|$)/i;
		const fetchAsDataUrl = async (url) => {
			try {
				const res = await fetch(url, {
					mode: "cors",
					credentials: "omit"
				});
				if (!res.ok) return url;
				const blob = await res.blob();
				return new Promise((resolve) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.onerror = () => resolve(url);
					reader.readAsDataURL(blob);
				});
			} catch {
				return url;
			}
		};
		const processCss = async (cssText, baseUrl) => {
			const fontBlocks = [];
			let match;
			while ((match = fontFaceRegex.exec(cssText)) !== null) {
				let block = match[0];
				const fontUrls = [];
				let urlMatch;
				fontUrlRegex.lastIndex = 0;
				while ((urlMatch = fontUrlRegex.exec(block)) !== null) {
					const url = urlMatch[2];
					if (!url.startsWith("data:") && fontExtRegex.test(url)) try {
						const absoluteUrl = new URL(url, baseUrl).href;
						fontUrls.push([urlMatch[0], absoluteUrl]);
					} catch {}
				}
				(await Promise.all(fontUrls.map(async ([original, url]) => {
					return [original, `url(${await fetchAsDataUrl(url)})`];
				}))).forEach(([original, replacement]) => {
					block = block.replace(original, replacement);
				});
				fontBlocks.push(block);
			}
			return fontBlocks;
		};
		const allFontBlocks = [];
		const externalSheets = doc.querySelectorAll("link[rel=\"stylesheet\"]");
		await Promise.all(Array.from(externalSheets).map(async (link) => {
			if (!link.href) return;
			try {
				const res = await fetch(link.href, {
					mode: "cors",
					credentials: "omit"
				});
				if (res.ok) {
					const blocks = await processCss(await res.text(), link.href);
					allFontBlocks.push(...blocks);
				}
			} catch {}
		}));
		const inlineStyles = doc.querySelectorAll("style");
		await Promise.all(Array.from(inlineStyles).map(async (style) => {
			const blocks = await processCss(style.textContent || "", doc.baseURI);
			allFontBlocks.push(...blocks);
		}));
		return allFontBlocks.join("\n");
	};
	const animationStyle = disableAnimations();
	let injectedFontStyle = null;
	const ensureFontStyle = (css) => {
		const EXISTING = doc.head.querySelector("style[data-cs-inline-fonts=\"true\"]");
		if (EXISTING) {
			if (css && css.trim()) EXISTING.textContent = `${EXISTING.textContent || ""}\n${css}`;
			return EXISTING;
		}
		const style = doc.createElement("style");
		style.setAttribute("data-cs-inline-fonts", "true");
		style.textContent = css;
		doc.head.appendChild(style);
		return style;
	};
	try {
		await new Promise((r$1) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => r$1(null))));
		doc.querySelectorAll("img[loading=\"lazy\"]").forEach((img) => img.setAttribute("loading", "eager"));
		const fontEmbedCSS = await inlineFonts();
		if (fontEmbedCSS && fontEmbedCSS.trim().length > 0) {
			injectedFontStyle = ensureFontStyle(fontEmbedCSS);
			if (injectedFontStyle.parentNode == null) doc.head.appendChild(injectedFontStyle);
		}
		await Promise.race([doc.fonts?.ready ?? Promise.resolve(), new Promise((resolve) => setTimeout(resolve, 1e3))]);
		const { documentElement: de, body: b } = doc;
		const totalWidth = Math.max(b.scrollWidth, de.scrollWidth, b.clientWidth, de.clientWidth);
		const totalHeight = Math.max(b.scrollHeight, de.scrollHeight, b.clientHeight, de.clientHeight);
		logger$3.verbose("Capturing iframe:", {
			totalWidth,
			totalHeight
		});
		const scale$1 = Math.min(1, 32767 / Math.max(totalWidth, totalHeight));
		const pixelRatio = (win.devicePixelRatio || 1) * scale$1;
		const styles = win.getComputedStyle(b);
		const backgroundColor = styles.backgroundColor || "#ffffff";
		const color$1 = styles.color || "#000000";
		return await toCanvas(de, {
			fontEmbedCSS,
			backgroundColor,
			cacheBust: true,
			pixelRatio,
			skipAutoScale: true,
			width: Math.floor(totalWidth),
			height: Math.floor(totalHeight),
			style: {
				backgroundColor,
				color: color$1,
				width: `${totalWidth}px`,
				height: `${totalHeight}px`,
				overflow: "visible",
				display: "block"
			}
		});
	} catch (error) {
		logger$3.error("Error capturing iframe:", error);
		return;
	} finally {
		animationStyle.remove();
	}
}
const captureScrollableIframeAsDataURL = async (iframeRef) => {
	return captureScrollableIframe(iframeRef).then((canvas) => {
		if (canvas) return canvas.toDataURL("image/png");
		return Promise.resolve(void 0);
	});
};
const captureScrollableIframeAsBlob = async (iframeRef, func) => {
	await captureScrollableIframe(iframeRef).then((canvas) => {
		canvas?.toBlob(func, "image/png");
	});
};
const svgToCanvas = (svgElement, scale$1 = 3) => {
	const viewBox = svgElement.getAttribute("viewBox")?.split(" ").map(Number) || [];
	const rect = svgElement.getBoundingClientRect();
	const width = viewBox[2] || svgElement.clientWidth || rect.width;
	const height = viewBox[3] || svgElement.clientHeight || rect.height;
	const svgData = new XMLSerializer().serializeToString(svgElement);
	let svgBase64;
	try {
		const encodedData = new TextEncoder().encode(svgData);
		const binaryString = Array.from(encodedData, (byte) => String.fromCodePoint(byte)).join("");
		svgBase64 = `data:image/svg+xml;base64,${btoa(binaryString)}`;
	} catch (error) {
		logger$3.warn("TextEncoder method failed, falling back to legacy method", error);
		svgBase64 = `data:image/svg+xml;base64,${btoa(decodeURIComponent(encodeURIComponent(svgData)))}`;
	}
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (!ctx) return Promise.reject(/* @__PURE__ */ new Error("Failed to get canvas context"));
	canvas.width = width * scale$1;
	canvas.height = height * scale$1;
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			try {
				ctx.scale(scale$1, scale$1);
				ctx.drawImage(img, 0, 0, width, height);
				resolve(canvas);
			} catch (error) {
				reject(/* @__PURE__ */ new Error(`Failed to draw image on canvas: ${error}`));
			}
		};
		img.onerror = () => {
			reject(/* @__PURE__ */ new Error("Failed to load SVG image"));
		};
		img.src = svgBase64;
	});
};
const svgToPngBlob = (svgElement, scale$1 = 3) => {
	return new Promise((resolve, reject) => {
		svgToCanvas(svgElement, scale$1).then((canvas) => {
			canvas.toBlob((blob) => {
				if (blob) resolve(blob);
				else reject(/* @__PURE__ */ new Error("Failed to create blob from canvas"));
			}, "image/png");
		}).catch(reject);
	});
};
const svgToSvgBlob = (svgElement) => {
	const svgData = new XMLSerializer().serializeToString(svgElement);
	return new Blob([svgData], { type: "image/svg+xml" });
};
function measureElementSize(element) {
	const clone = element.cloneNode(true);
	if (clone instanceof HTMLElement || clone instanceof SVGElement) {
		clone.style.width = "";
		clone.style.height = "";
		clone.style.position = "";
		clone.style.visibility = "";
	}
	const container = document.createElement("div");
	container.style.position = "absolute";
	container.style.top = "-9999px";
	container.style.left = "-9999px";
	container.style.visibility = "hidden";
	container.appendChild(clone);
	document.body.appendChild(container);
	const rect = clone.getBoundingClientRect();
	document.body.removeChild(container);
	return {
		width: rect.width,
		height: rect.height
	};
}
const makeSvgSizeAdaptive = (element) => {
	if (!(element instanceof SVGElement)) return element;
	const hasViewBox = element.hasAttribute("viewBox");
	const widthStr = element.getAttribute("width");
	let measuredWidth;
	if (!hasViewBox) {
		const renderedSize = measureElementSize(element);
		if (renderedSize.width > 0 && renderedSize.height > 0) {
			measuredWidth = renderedSize.width;
			element.setAttribute("viewBox", `0 0 ${renderedSize.width} ${renderedSize.height}`);
		}
	}
	if (!element.style.getPropertyValue("max-width")) {
		if (measuredWidth !== void 0) element.style.setProperty("max-width", `${measuredWidth}px`);
		else if (widthStr) element.style.setProperty("max-width", widthStr);
	}
	element.setAttribute("width", "100%");
	element.removeAttribute("height");
	element.removeAttribute("preserveAspectRatio");
	return element;
};
const convertImageToPng = async (blob) => {
	if (blob.type === "image/png") return blob;
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(blob);
		img.onload = () => {
			try {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					URL.revokeObjectURL(url);
					reject(/* @__PURE__ */ new Error("Failed to get canvas context"));
					return;
				}
				ctx.drawImage(img, 0, 0);
				canvas.toBlob((pngBlob) => {
					URL.revokeObjectURL(url);
					if (pngBlob) resolve(pngBlob);
					else reject(/* @__PURE__ */ new Error("Failed to convert image to png"));
				}, "image/png");
			} catch (error) {
				URL.revokeObjectURL(url);
				reject(error);
			}
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Failed to load image for conversion"));
		};
		img.src = url;
	});
};
var CharacterCodes;
(function(CharacterCodes$1) {
	CharacterCodes$1[CharacterCodes$1["lineFeed"] = 10] = "lineFeed";
	CharacterCodes$1[CharacterCodes$1["carriageReturn"] = 13] = "carriageReturn";
	CharacterCodes$1[CharacterCodes$1["space"] = 32] = "space";
	CharacterCodes$1[CharacterCodes$1["_0"] = 48] = "_0";
	CharacterCodes$1[CharacterCodes$1["_1"] = 49] = "_1";
	CharacterCodes$1[CharacterCodes$1["_2"] = 50] = "_2";
	CharacterCodes$1[CharacterCodes$1["_3"] = 51] = "_3";
	CharacterCodes$1[CharacterCodes$1["_4"] = 52] = "_4";
	CharacterCodes$1[CharacterCodes$1["_5"] = 53] = "_5";
	CharacterCodes$1[CharacterCodes$1["_6"] = 54] = "_6";
	CharacterCodes$1[CharacterCodes$1["_7"] = 55] = "_7";
	CharacterCodes$1[CharacterCodes$1["_8"] = 56] = "_8";
	CharacterCodes$1[CharacterCodes$1["_9"] = 57] = "_9";
	CharacterCodes$1[CharacterCodes$1["a"] = 97] = "a";
	CharacterCodes$1[CharacterCodes$1["b"] = 98] = "b";
	CharacterCodes$1[CharacterCodes$1["c"] = 99] = "c";
	CharacterCodes$1[CharacterCodes$1["d"] = 100] = "d";
	CharacterCodes$1[CharacterCodes$1["e"] = 101] = "e";
	CharacterCodes$1[CharacterCodes$1["f"] = 102] = "f";
	CharacterCodes$1[CharacterCodes$1["g"] = 103] = "g";
	CharacterCodes$1[CharacterCodes$1["h"] = 104] = "h";
	CharacterCodes$1[CharacterCodes$1["i"] = 105] = "i";
	CharacterCodes$1[CharacterCodes$1["j"] = 106] = "j";
	CharacterCodes$1[CharacterCodes$1["k"] = 107] = "k";
	CharacterCodes$1[CharacterCodes$1["l"] = 108] = "l";
	CharacterCodes$1[CharacterCodes$1["m"] = 109] = "m";
	CharacterCodes$1[CharacterCodes$1["n"] = 110] = "n";
	CharacterCodes$1[CharacterCodes$1["o"] = 111] = "o";
	CharacterCodes$1[CharacterCodes$1["p"] = 112] = "p";
	CharacterCodes$1[CharacterCodes$1["q"] = 113] = "q";
	CharacterCodes$1[CharacterCodes$1["r"] = 114] = "r";
	CharacterCodes$1[CharacterCodes$1["s"] = 115] = "s";
	CharacterCodes$1[CharacterCodes$1["t"] = 116] = "t";
	CharacterCodes$1[CharacterCodes$1["u"] = 117] = "u";
	CharacterCodes$1[CharacterCodes$1["v"] = 118] = "v";
	CharacterCodes$1[CharacterCodes$1["w"] = 119] = "w";
	CharacterCodes$1[CharacterCodes$1["x"] = 120] = "x";
	CharacterCodes$1[CharacterCodes$1["y"] = 121] = "y";
	CharacterCodes$1[CharacterCodes$1["z"] = 122] = "z";
	CharacterCodes$1[CharacterCodes$1["A"] = 65] = "A";
	CharacterCodes$1[CharacterCodes$1["B"] = 66] = "B";
	CharacterCodes$1[CharacterCodes$1["C"] = 67] = "C";
	CharacterCodes$1[CharacterCodes$1["D"] = 68] = "D";
	CharacterCodes$1[CharacterCodes$1["E"] = 69] = "E";
	CharacterCodes$1[CharacterCodes$1["F"] = 70] = "F";
	CharacterCodes$1[CharacterCodes$1["G"] = 71] = "G";
	CharacterCodes$1[CharacterCodes$1["H"] = 72] = "H";
	CharacterCodes$1[CharacterCodes$1["I"] = 73] = "I";
	CharacterCodes$1[CharacterCodes$1["J"] = 74] = "J";
	CharacterCodes$1[CharacterCodes$1["K"] = 75] = "K";
	CharacterCodes$1[CharacterCodes$1["L"] = 76] = "L";
	CharacterCodes$1[CharacterCodes$1["M"] = 77] = "M";
	CharacterCodes$1[CharacterCodes$1["N"] = 78] = "N";
	CharacterCodes$1[CharacterCodes$1["O"] = 79] = "O";
	CharacterCodes$1[CharacterCodes$1["P"] = 80] = "P";
	CharacterCodes$1[CharacterCodes$1["Q"] = 81] = "Q";
	CharacterCodes$1[CharacterCodes$1["R"] = 82] = "R";
	CharacterCodes$1[CharacterCodes$1["S"] = 83] = "S";
	CharacterCodes$1[CharacterCodes$1["T"] = 84] = "T";
	CharacterCodes$1[CharacterCodes$1["U"] = 85] = "U";
	CharacterCodes$1[CharacterCodes$1["V"] = 86] = "V";
	CharacterCodes$1[CharacterCodes$1["W"] = 87] = "W";
	CharacterCodes$1[CharacterCodes$1["X"] = 88] = "X";
	CharacterCodes$1[CharacterCodes$1["Y"] = 89] = "Y";
	CharacterCodes$1[CharacterCodes$1["Z"] = 90] = "Z";
	CharacterCodes$1[CharacterCodes$1["asterisk"] = 42] = "asterisk";
	CharacterCodes$1[CharacterCodes$1["backslash"] = 92] = "backslash";
	CharacterCodes$1[CharacterCodes$1["closeBrace"] = 125] = "closeBrace";
	CharacterCodes$1[CharacterCodes$1["closeBracket"] = 93] = "closeBracket";
	CharacterCodes$1[CharacterCodes$1["colon"] = 58] = "colon";
	CharacterCodes$1[CharacterCodes$1["comma"] = 44] = "comma";
	CharacterCodes$1[CharacterCodes$1["dot"] = 46] = "dot";
	CharacterCodes$1[CharacterCodes$1["doubleQuote"] = 34] = "doubleQuote";
	CharacterCodes$1[CharacterCodes$1["minus"] = 45] = "minus";
	CharacterCodes$1[CharacterCodes$1["openBrace"] = 123] = "openBrace";
	CharacterCodes$1[CharacterCodes$1["openBracket"] = 91] = "openBracket";
	CharacterCodes$1[CharacterCodes$1["plus"] = 43] = "plus";
	CharacterCodes$1[CharacterCodes$1["slash"] = 47] = "slash";
	CharacterCodes$1[CharacterCodes$1["formFeed"] = 12] = "formFeed";
	CharacterCodes$1[CharacterCodes$1["tab"] = 9] = "tab";
})(CharacterCodes || (CharacterCodes = {}));
new Array(20).fill(0).map((_, index) => {
	return " ".repeat(index);
});
var maxCachedValues = 200;
new Array(maxCachedValues).fill(0).map((_, index) => {
	return "\n" + " ".repeat(index);
}), new Array(maxCachedValues).fill(0).map((_, index) => {
	return "\r" + " ".repeat(index);
}), new Array(maxCachedValues).fill(0).map((_, index) => {
	return "\r\n" + " ".repeat(index);
}), new Array(maxCachedValues).fill(0).map((_, index) => {
	return "\n" + "	".repeat(index);
}), new Array(maxCachedValues).fill(0).map((_, index) => {
	return "\r" + "	".repeat(index);
}), new Array(maxCachedValues).fill(0).map((_, index) => {
	return "\r\n" + "	".repeat(index);
});
var ParseOptions;
(function(ParseOptions$1) {
	ParseOptions$1.DEFAULT = { allowTrailingComma: false };
})(ParseOptions || (ParseOptions = {}));
function getNodePath$1(node) {
	if (!node.parent || !node.parent.children) return [];
	const path$1 = getNodePath$1(node.parent);
	if (node.parent.type === "property") {
		const key = node.parent.children[0].value;
		path$1.push(key);
	} else if (node.parent.type === "array") {
		const index = node.parent.children.indexOf(node);
		if (index !== -1) path$1.push(index);
	}
	return path$1;
}
function getNodeValue$1(node) {
	switch (node.type) {
		case "array": return node.children.map(getNodeValue$1);
		case "object":
			const obj = Object.create(null);
			for (let prop of node.children) {
				const valueNode = prop.children[1];
				if (valueNode) obj[prop.children[0].value] = getNodeValue$1(valueNode);
			}
			return obj;
		case "null":
		case "string":
		case "number":
		case "boolean": return node.value;
		default: return;
	}
}
function contains(node, offset, includeRightBound = false) {
	return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
}
function findNodeAtOffset$1(node, offset, includeRightBound = false) {
	if (contains(node, offset, includeRightBound)) {
		const children = node.children;
		if (Array.isArray(children)) for (let i$1 = 0; i$1 < children.length && children[i$1].offset <= offset; i$1++) {
			const item = findNodeAtOffset$1(children[i$1], offset, includeRightBound);
			if (item) return item;
		}
		return node;
	}
}
var ScanError;
(function(ScanError$1) {
	ScanError$1[ScanError$1["None"] = 0] = "None";
	ScanError$1[ScanError$1["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
	ScanError$1[ScanError$1["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
	ScanError$1[ScanError$1["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
	ScanError$1[ScanError$1["InvalidUnicode"] = 4] = "InvalidUnicode";
	ScanError$1[ScanError$1["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
	ScanError$1[ScanError$1["InvalidCharacter"] = 6] = "InvalidCharacter";
})(ScanError || (ScanError = {}));
var SyntaxKind;
(function(SyntaxKind$1) {
	SyntaxKind$1[SyntaxKind$1["OpenBraceToken"] = 1] = "OpenBraceToken";
	SyntaxKind$1[SyntaxKind$1["CloseBraceToken"] = 2] = "CloseBraceToken";
	SyntaxKind$1[SyntaxKind$1["OpenBracketToken"] = 3] = "OpenBracketToken";
	SyntaxKind$1[SyntaxKind$1["CloseBracketToken"] = 4] = "CloseBracketToken";
	SyntaxKind$1[SyntaxKind$1["CommaToken"] = 5] = "CommaToken";
	SyntaxKind$1[SyntaxKind$1["ColonToken"] = 6] = "ColonToken";
	SyntaxKind$1[SyntaxKind$1["NullKeyword"] = 7] = "NullKeyword";
	SyntaxKind$1[SyntaxKind$1["TrueKeyword"] = 8] = "TrueKeyword";
	SyntaxKind$1[SyntaxKind$1["FalseKeyword"] = 9] = "FalseKeyword";
	SyntaxKind$1[SyntaxKind$1["StringLiteral"] = 10] = "StringLiteral";
	SyntaxKind$1[SyntaxKind$1["NumericLiteral"] = 11] = "NumericLiteral";
	SyntaxKind$1[SyntaxKind$1["LineCommentTrivia"] = 12] = "LineCommentTrivia";
	SyntaxKind$1[SyntaxKind$1["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
	SyntaxKind$1[SyntaxKind$1["LineBreakTrivia"] = 14] = "LineBreakTrivia";
	SyntaxKind$1[SyntaxKind$1["Trivia"] = 15] = "Trivia";
	SyntaxKind$1[SyntaxKind$1["Unknown"] = 16] = "Unknown";
	SyntaxKind$1[SyntaxKind$1["EOF"] = 17] = "EOF";
})(SyntaxKind || (SyntaxKind = {}));
var ParseErrorCode;
(function(ParseErrorCode$1) {
	ParseErrorCode$1[ParseErrorCode$1["InvalidSymbol"] = 1] = "InvalidSymbol";
	ParseErrorCode$1[ParseErrorCode$1["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
	ParseErrorCode$1[ParseErrorCode$1["PropertyNameExpected"] = 3] = "PropertyNameExpected";
	ParseErrorCode$1[ParseErrorCode$1["ValueExpected"] = 4] = "ValueExpected";
	ParseErrorCode$1[ParseErrorCode$1["ColonExpected"] = 5] = "ColonExpected";
	ParseErrorCode$1[ParseErrorCode$1["CommaExpected"] = 6] = "CommaExpected";
	ParseErrorCode$1[ParseErrorCode$1["CloseBraceExpected"] = 7] = "CloseBraceExpected";
	ParseErrorCode$1[ParseErrorCode$1["CloseBracketExpected"] = 8] = "CloseBracketExpected";
	ParseErrorCode$1[ParseErrorCode$1["EndOfFileExpected"] = 9] = "EndOfFileExpected";
	ParseErrorCode$1[ParseErrorCode$1["InvalidCommentToken"] = 10] = "InvalidCommentToken";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
	ParseErrorCode$1[ParseErrorCode$1["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
	ParseErrorCode$1[ParseErrorCode$1["InvalidUnicode"] = 14] = "InvalidUnicode";
	ParseErrorCode$1[ParseErrorCode$1["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
	ParseErrorCode$1[ParseErrorCode$1["InvalidCharacter"] = 16] = "InvalidCharacter";
})(ParseErrorCode || (ParseErrorCode = {}));
const defaultAppHeaders = () => {
	return {
		"HTTP-Referer": "https://cherry-ai.com",
		"X-Title": "Cherry Studio"
	};
};
function getTrailingApiVersion(url) {
	const match = url.match(TRAILING_VERSION_REGEX);
	if (match) return match[0].replace(/^\//, "").replace(/\/$/, "");
}
var TRAILING_VERSION_REGEX = /\/v\d+(?:alpha|beta)?\/?$/i;
function withoutTrailingApiVersion(url) {
	return url.replace(TRAILING_VERSION_REGEX, "");
}
function parseDataUrl(url) {
	if (!url.startsWith("data:")) return null;
	const commaIndex = url.indexOf(",");
	if (commaIndex === -1) return null;
	const header = url.slice(5, commaIndex);
	const isBase64 = header.includes(";base64");
	const semicolonIndex = header.indexOf(";");
	return {
		mediaType: (semicolonIndex === -1 ? header : header.slice(0, semicolonIndex)).trim() || void 0,
		isBase64,
		data: url.slice(commaIndex + 1)
	};
}
var _memCache = /* @__PURE__ */ new Map();
var _pending = /* @__PURE__ */ new Map();
var IDB_NAME = "cherry-image-cache";
var IDB_STORE = "images";
var IDB_VERSION = 1;
var IDB_MAX_AGE_MS = 168 * 3600 * 1e3;
var _db = null;
var _dbReady = null;
function _openDB() {
	if (_dbReady) return _dbReady;
	_dbReady = new Promise((resolve) => {
		try {
			const req = indexedDB.open(IDB_NAME, IDB_VERSION);
			req.onupgradeneeded = () => {
				const db = req.result;
				if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
			};
			req.onsuccess = () => {
				_db = req.result;
				resolve(_db);
			};
			req.onerror = () => resolve(null);
		} catch {
			resolve(null);
		}
	});
	return _dbReady;
}
function _idbGet(key) {
	return new Promise(async (resolve) => {
		try {
			const db = await _openDB();
			if (!db) return resolve(null);
			const req = db.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).get(key);
			req.onsuccess = () => {
				const val = req.result;
				if (val && Date.now() - val.ts < IDB_MAX_AGE_MS) resolve(val);
				else resolve(null);
			};
			req.onerror = () => resolve(null);
		} catch {
			resolve(null);
		}
	});
}
function _idbPut(key, dataUrl) {
	_openDB().then((db) => {
		if (!db) return;
		try {
			db.transaction(IDB_STORE, "readwrite").objectStore(IDB_STORE).put({
				dataUrl,
				ts: Date.now()
			}, key);
		} catch {}
	});
}
function isExternalUrl(url) {
	if (!url) return false;
	if (url.startsWith("data:") || url.startsWith("blob:") || url.startsWith("file://")) return false;
	if (url.startsWith("http://") || url.startsWith("https://")) {
		try {
			const hostname = new URL(url).hostname;
			if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0") return false;
		} catch {}
		return true;
	}
	return false;
}
function isLocalFileUrl(url) {
	return !!url && url.startsWith("file://");
}
async function proxyImageUrl(url) {
	if (!url || !isExternalUrl(url)) return url || null;
	return _cachedProxy(url, _doProxy);
}
async function proxyLocalFileUrl(url) {
	if (!url || !isLocalFileUrl(url)) return url || null;
	return _cachedProxy(url, _doLocalFileProxy);
}
async function _cachedProxy(url, fetchFn) {
	const memHit = _memCache.get(url);
	if (memHit) return memHit;
	const inflight = _pending.get(url);
	if (inflight) return inflight;
	const promise = (async () => {
		const idbHit = await _idbGet(url);
		if (idbHit) {
			_memCache.set(url, idbHit.dataUrl);
			return idbHit.dataUrl;
		}
		const result = await fetchFn(url);
		if (result) {
			_memCache.set(url, result);
			_idbPut(url, result);
		}
		return result;
	})();
	_pending.set(url, promise);
	try {
		return await promise;
	} finally {
		_pending.delete(url);
	}
}
async function _doProxy(url) {
	try {
		const api = window.api;
		if (api?.proxyImage) {
			const dataUrl = await api.proxyImage(url);
			if (dataUrl) return dataUrl;
		}
		const resp = await fetch(url);
		if (!resp.ok) return null;
		return await blobToDataUrl$1(await resp.blob());
	} catch (e$1) {
		console.error("[proxyImage] failed for", url, e$1);
		return null;
	}
}
async function _doLocalFileProxy(fileUrl) {
	try {
		let filePath = fileUrl;
		if (fileUrl.startsWith("file:///")) filePath = decodeURIComponent(fileUrl.slice(8));
		else if (fileUrl.startsWith("file://")) filePath = decodeURIComponent(fileUrl.slice(7));
		const normalized = filePath.replace(/\\/g, "/");
		const api = window.api;
		if (api?.file?.binaryImage) {
			const baseName = normalized.split("/").pop();
			if (baseName && baseName.includes(".")) {
				const byName = await api.file.binaryImage(baseName);
				if (byName?.data) return byName.data;
			}
			const result = await api.file.binaryImage(normalized);
			if (result?.data) return result.data;
		}
		const backendUrl = window.__CHERRY_BACKEND_URL || "";
		if (backendUrl) {
			const resp = await fetch(backendUrl + "/api/v1/files/binary-image", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ path: normalized })
			});
			if (!resp.ok) return null;
			const data = await resp.json();
			if (data?.data) return data.data;
		}
		return null;
	} catch (e$1) {
		console.error("[proxyImage] local file proxy failed:", fileUrl, e$1);
		return null;
	}
}
function blobToDataUrl$1(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error || /* @__PURE__ */ new Error("blob read failed"));
		reader.readAsDataURL(blob);
	});
}
async function ensureLocalImageUrl(url) {
	if (!isExternalUrl(url)) return url;
	return await proxyImageUrl(url) || url;
}
var LayoutGroupContext = (0, import_react.createContext)({});
function useConstant(init) {
	const ref = (0, import_react.useRef)(null);
	if (ref.current === null) ref.current = init();
	return ref.current;
}
var isBrowser = typeof window !== "undefined";
var useIsomorphicLayoutEffect = isBrowser ? import_react.useLayoutEffect : import_react.useEffect;
var PresenceContext = /* @__PURE__ */ (0, import_react.createContext)(null);
function addUniqueItem(arr, item) {
	if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
	const index = arr.indexOf(item);
	if (index > -1) arr.splice(index, 1);
}
var clamp = (min, max, v) => {
	if (v > max) return max;
	if (v < min) return min;
	return v;
};
var warning = () => {};
var invariant = () => {};
var MotionGlobalConfig = {};
var isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
function isObject(value) {
	return typeof value === "object" && value !== null;
}
var isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);
/* @__NO_SIDE_EFFECTS__ */
function memo(callback) {
	let result;
	return () => {
		if (result === void 0) result = callback();
		return result;
	};
}
var noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;
var combineFunctions = (a$1, b) => (v) => b(a$1(v));
var pipe = (...transformers) => transformers.reduce(combineFunctions);
var progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
	const toFromDifference = to - from;
	return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
var SubscriptionManager = class {
	constructor() {
		this.subscriptions = [];
	}
	add(handler) {
		addUniqueItem(this.subscriptions, handler);
		return () => removeItem(this.subscriptions, handler);
	}
	notify(a$1, b, c$1) {
		const numSubscriptions = this.subscriptions.length;
		if (!numSubscriptions) return;
		if (numSubscriptions === 1) this.subscriptions[0](a$1, b, c$1);
		else for (let i$1 = 0; i$1 < numSubscriptions; i$1++) {
			const handler = this.subscriptions[i$1];
			handler && handler(a$1, b, c$1);
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
};
var secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
var millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;
function velocityPerSecond(velocity, frameDuration) {
	return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
var calcBezier = (t$1, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t$1 + (3 * a2 - 6 * a1)) * t$1 + 3 * a1) * t$1;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
	let currentX;
	let currentT;
	let i$1 = 0;
	do {
		currentT = lowerBound + (upperBound - lowerBound) / 2;
		currentX = calcBezier(currentT, mX1, mX2) - x;
		if (currentX > 0) upperBound = currentT;
		else lowerBound = currentT;
	} while (Math.abs(currentX) > subdivisionPrecision && ++i$1 < subdivisionMaxIterations);
	return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
	if (mX1 === mY1 && mX2 === mY2) return noop;
	const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
	return (t$1) => t$1 === 0 || t$1 === 1 ? t$1 : calcBezier(getTForX(t$1), mY1, mY2);
}
var mirrorEasing = (easing) => (p) => p <= .5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
var reverseEasing = (easing) => (p) => 1 - easing(1 - p);
var backOut = /* @__PURE__ */ cubicBezier(.33, 1.53, .69, .99);
var backIn = /* @__PURE__ */ reverseEasing(backOut);
var backInOut = /* @__PURE__ */ mirrorEasing(backIn);
var anticipate = (p) => (p *= 2) < 1 ? .5 * backIn(p) : .5 * (2 - Math.pow(2, -10 * (p - 1)));
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circIn);
var easeIn = /* @__PURE__ */ cubicBezier(.42, 0, 1, 1);
var easeOut = /* @__PURE__ */ cubicBezier(0, 0, .58, 1);
var easeInOut = /* @__PURE__ */ cubicBezier(.42, 0, .58, 1);
var isEasingArray = (ease$1) => {
	return Array.isArray(ease$1) && typeof ease$1[0] !== "number";
};
var isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";
var easingLookup = {
	linear: noop,
	easeIn,
	easeInOut,
	easeOut,
	circIn,
	circInOut,
	circOut,
	backIn,
	backInOut,
	backOut,
	anticipate
};
var isValidEasing = (easing) => {
	return typeof easing === "string";
};
var easingDefinitionToFunction = (definition) => {
	if (isBezierDefinition(definition)) {
		invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
		const [x1, y1, x2, y2] = definition;
		return cubicBezier(x1, y1, x2, y2);
	} else if (isValidEasing(definition)) {
		invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`, "invalid-easing-type");
		return easingLookup[definition];
	}
	return definition;
};
var stepsOrder = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
var statsBuffer = {
	value: null,
	addProjectionMetrics: null
};
function createRenderStep(runNextFrame, stepName) {
	let thisFrame = /* @__PURE__ */ new Set();
	let nextFrame = /* @__PURE__ */ new Set();
	let isProcessing = false;
	let flushNextFrame = false;
	const toKeepAlive = /* @__PURE__ */ new WeakSet();
	let latestFrameData = {
		delta: 0,
		timestamp: 0,
		isProcessing: false
	};
	let numCalls = 0;
	function triggerCallback(callback) {
		if (toKeepAlive.has(callback)) {
			step.schedule(callback);
			runNextFrame();
		}
		numCalls++;
		callback(latestFrameData);
	}
	const step = {
		schedule: (callback, keepAlive = false, immediate = false) => {
			const queue = immediate && isProcessing ? thisFrame : nextFrame;
			if (keepAlive) toKeepAlive.add(callback);
			if (!queue.has(callback)) queue.add(callback);
			return callback;
		},
		cancel: (callback) => {
			nextFrame.delete(callback);
			toKeepAlive.delete(callback);
		},
		process: (frameData$1) => {
			latestFrameData = frameData$1;
			if (isProcessing) {
				flushNextFrame = true;
				return;
			}
			isProcessing = true;
			[thisFrame, nextFrame] = [nextFrame, thisFrame];
			thisFrame.forEach(triggerCallback);
			if (stepName && statsBuffer.value) statsBuffer.value.frameloop[stepName].push(numCalls);
			numCalls = 0;
			thisFrame.clear();
			isProcessing = false;
			if (flushNextFrame) {
				flushNextFrame = false;
				step.process(frameData$1);
			}
		}
	};
	return step;
}
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
	let runNextFrame = false;
	let useDefaultElapsed = true;
	const state = {
		delta: 0,
		timestamp: 0,
		isProcessing: false
	};
	const flagRunNextFrame = () => runNextFrame = true;
	const steps = stepsOrder.reduce((acc, key) => {
		acc[key] = createRenderStep(flagRunNextFrame, allowKeepAlive ? key : void 0);
		return acc;
	}, {});
	const { setup, read, resolveKeyframes, preUpdate, update, preRender, render: render$1, postRender } = steps;
	const processBatch = () => {
		const timestamp = MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
		runNextFrame = false;
		if (!MotionGlobalConfig.useManualTiming) state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
		state.timestamp = timestamp;
		state.isProcessing = true;
		setup.process(state);
		read.process(state);
		resolveKeyframes.process(state);
		preUpdate.process(state);
		update.process(state);
		preRender.process(state);
		render$1.process(state);
		postRender.process(state);
		state.isProcessing = false;
		if (runNextFrame && allowKeepAlive) {
			useDefaultElapsed = false;
			scheduleNextBatch(processBatch);
		}
	};
	const wake = () => {
		runNextFrame = true;
		useDefaultElapsed = true;
		if (!state.isProcessing) scheduleNextBatch(processBatch);
	};
	const schedule = stepsOrder.reduce((acc, key) => {
		const step = steps[key];
		acc[key] = (process$1, keepAlive = false, immediate = false) => {
			if (!runNextFrame) wake();
			return step.schedule(process$1, keepAlive, immediate);
		};
		return acc;
	}, {});
	const cancel = (process$1) => {
		for (let i$1 = 0; i$1 < stepsOrder.length; i$1++) steps[stepsOrder[i$1]].cancel(process$1);
	};
	return {
		schedule,
		cancel,
		state,
		steps
	};
}
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
var now;
function clearTime() {
	now = void 0;
}
var time = {
	now: () => {
		if (now === void 0) time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
		return now;
	},
	set: (newTime) => {
		now = newTime;
		queueMicrotask(clearTime);
	}
};
var activeAnimations = {
	layout: 0,
	mainThread: 0,
	waapi: 0
};
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
var startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
	if (!startsAsVariableToken(value)) return false;
	return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
var number = {
	test: (v) => typeof v === "number",
	parse: parseFloat,
	transform: (v) => v
};
var alpha = {
	...number,
	transform: (v) => clamp(0, 1, v)
};
var scale = {
	...number,
	default: 1
};
var sanitize = (v) => Math.round(v * 1e5) / 1e5;
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function isNullish(v) {
	return v == null;
}
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
var isColorString = (type, testProp) => (v) => {
	return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
	if (typeof v !== "string") return v;
	const [a$1, b, c$1, alpha$1] = v.match(floatRegex);
	return {
		[aName]: parseFloat(a$1),
		[bName]: parseFloat(b),
		[cName]: parseFloat(c$1),
		alpha: alpha$1 !== void 0 ? parseFloat(alpha$1) : 1
	};
};
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
	...number,
	transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba = {
	test: /* @__PURE__ */ isColorString("rgb", "red"),
	parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
	transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v) {
	let r$1 = "";
	let g = "";
	let b = "";
	let a$1 = "";
	if (v.length > 5) {
		r$1 = v.substring(1, 3);
		g = v.substring(3, 5);
		b = v.substring(5, 7);
		a$1 = v.substring(7, 9);
	} else {
		r$1 = v.substring(1, 2);
		g = v.substring(2, 3);
		b = v.substring(3, 4);
		a$1 = v.substring(4, 5);
		r$1 += r$1;
		g += g;
		b += b;
		a$1 += a$1;
	}
	return {
		red: parseInt(r$1, 16),
		green: parseInt(g, 16),
		blue: parseInt(b, 16),
		alpha: a$1 ? parseInt(a$1, 16) / 255 : 1
	};
}
var hex = {
	test: /* @__PURE__ */ isColorString("#"),
	parse: parseHex,
	transform: rgba.transform
};
var createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit$1) => ({
	test: (v) => typeof v === "string" && v.endsWith(unit$1) && v.split(" ").length === 1,
	parse: parseFloat,
	transform: (v) => `${v}${unit$1}`
});
var degrees = /* @__PURE__ */ createUnitType("deg");
var percent = /* @__PURE__ */ createUnitType("%");
var px = /* @__PURE__ */ createUnitType("px");
var vh = /* @__PURE__ */ createUnitType("vh");
var vw = /* @__PURE__ */ createUnitType("vw");
var progressPercentage = /* @__PURE__ */ (() => ({
	...percent,
	parse: (v) => percent.parse(v) / 100,
	transform: (v) => percent.transform(v * 100)
}))();
var hsla = {
	test: /* @__PURE__ */ isColorString("hsl", "hue"),
	parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
	transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
		return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
	}
};
var color = {
	test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
	parse: (v) => {
		if (rgba.test(v)) return rgba.parse(v);
		else if (hsla.test(v)) return hsla.parse(v);
		else return hex.parse(v);
	},
	transform: (v) => {
		return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
	},
	getAnimatableNone: (v) => {
		const parsed = color.parse(v);
		parsed.alpha = 0;
		return color.transform(parsed);
	}
};
var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function test(v) {
	return isNaN(v) && typeof v === "string" && (v.match(floatRegex)?.length || 0) + (v.match(colorRegex)?.length || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
	const originalValue = value.toString();
	const values = [];
	const indexes = {
		color: [],
		number: [],
		var: []
	};
	const types$2 = [];
	let i$1 = 0;
	return {
		values,
		split: originalValue.replace(complexRegex, (parsedValue) => {
			if (color.test(parsedValue)) {
				indexes.color.push(i$1);
				types$2.push(COLOR_TOKEN);
				values.push(color.parse(parsedValue));
			} else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
				indexes.var.push(i$1);
				types$2.push(VAR_TOKEN);
				values.push(parsedValue);
			} else {
				indexes.number.push(i$1);
				types$2.push(NUMBER_TOKEN);
				values.push(parseFloat(parsedValue));
			}
			++i$1;
			return SPLIT_TOKEN;
		}).split(SPLIT_TOKEN),
		indexes,
		types: types$2
	};
}
function parseComplexValue(v) {
	return analyseComplexValue(v).values;
}
function createTransformer(source) {
	const { split, types: types$2 } = analyseComplexValue(source);
	const numSections = split.length;
	return (v) => {
		let output = "";
		for (let i$1 = 0; i$1 < numSections; i$1++) {
			output += split[i$1];
			if (v[i$1] !== void 0) {
				const type = types$2[i$1];
				if (type === NUMBER_TOKEN) output += sanitize(v[i$1]);
				else if (type === COLOR_TOKEN) output += color.transform(v[i$1]);
				else output += v[i$1];
			}
		}
		return output;
	};
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : color.test(v) ? color.getAnimatableNone(v) : v;
function getAnimatableNone$1(v) {
	const parsed = parseComplexValue(v);
	return createTransformer(v)(parsed.map(convertNumbersToZero));
}
var complex = {
	test,
	parse: parseComplexValue,
	createTransformer,
	getAnimatableNone: getAnimatableNone$1
};
function hueToRgb(p, q, t$1) {
	if (t$1 < 0) t$1 += 1;
	if (t$1 > 1) t$1 -= 1;
	if (t$1 < 1 / 6) return p + (q - p) * 6 * t$1;
	if (t$1 < 1 / 2) return q;
	if (t$1 < 2 / 3) return p + (q - p) * (2 / 3 - t$1) * 6;
	return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha$1 }) {
	hue /= 360;
	saturation /= 100;
	lightness /= 100;
	let red = 0;
	let green = 0;
	let blue = 0;
	if (!saturation) red = green = blue = lightness;
	else {
		const q = lightness < .5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
		const p = 2 * lightness - q;
		red = hueToRgb(p, q, hue + 1 / 3);
		green = hueToRgb(p, q, hue);
		blue = hueToRgb(p, q, hue - 1 / 3);
	}
	return {
		red: Math.round(red * 255),
		green: Math.round(green * 255),
		blue: Math.round(blue * 255),
		alpha: alpha$1
	};
}
function mixImmediate(a$1, b) {
	return (p) => p > 0 ? b : a$1;
}
var mixNumber = (from, to, progress$1) => {
	return from + (to - from) * progress$1;
};
var mixLinearColor = (from, to, v) => {
	const fromExpo = from * from;
	const expo = v * (to * to - fromExpo) + fromExpo;
	return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [
	hex,
	rgba,
	hsla
];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color$1) {
	const type = getColorType(color$1);
	warning(Boolean(type), `'${color$1}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
	if (!Boolean(type)) return false;
	let model = type.parse(color$1);
	if (type === hsla) model = hslaToRgba(model);
	return model;
}
var mixColor = (from, to) => {
	const fromRGBA = asRGBA(from);
	const toRGBA = asRGBA(to);
	if (!fromRGBA || !toRGBA) return mixImmediate(from, to);
	const blended = { ...fromRGBA };
	return (v) => {
		blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
		blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
		blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
		blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v);
		return rgba.transform(blended);
	};
};
var invisibleValues = new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
	if (invisibleValues.has(origin)) return (p) => p <= 0 ? origin : target;
	else return (p) => p >= 1 ? target : origin;
}
function mixNumber$1(a$1, b) {
	return (p) => mixNumber(a$1, b, p);
}
function getMixer(a$1) {
	if (typeof a$1 === "number") return mixNumber$1;
	else if (typeof a$1 === "string") return isCSSVariableToken(a$1) ? mixImmediate : color.test(a$1) ? mixColor : mixComplex;
	else if (Array.isArray(a$1)) return mixArray;
	else if (typeof a$1 === "object") return color.test(a$1) ? mixColor : mixObject;
	return mixImmediate;
}
function mixArray(a$1, b) {
	const output = [...a$1];
	const numValues = output.length;
	const blendValue = a$1.map((v, i$1) => getMixer(v)(v, b[i$1]));
	return (p) => {
		for (let i$1 = 0; i$1 < numValues; i$1++) output[i$1] = blendValue[i$1](p);
		return output;
	};
}
function mixObject(a$1, b) {
	const output = {
		...a$1,
		...b
	};
	const blendValue = {};
	for (const key in output) if (a$1[key] !== void 0 && b[key] !== void 0) blendValue[key] = getMixer(a$1[key])(a$1[key], b[key]);
	return (v) => {
		for (const key in blendValue) output[key] = blendValue[key](v);
		return output;
	};
}
function matchOrder(origin, target) {
	const orderedOrigin = [];
	const pointers = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i$1 = 0; i$1 < target.values.length; i$1++) {
		const type = target.types[i$1];
		const originIndex = origin.indexes[type][pointers[type]];
		orderedOrigin[i$1] = origin.values[originIndex] ?? 0;
		pointers[type]++;
	}
	return orderedOrigin;
}
var mixComplex = (origin, target) => {
	const template = complex.createTransformer(target);
	const originStats = analyseComplexValue(origin);
	const targetStats = analyseComplexValue(target);
	if (originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length) {
		if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) return mixVisibility(origin, target);
		return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
	} else {
		warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
		return mixImmediate(origin, target);
	}
};
function mix(from, to, p) {
	if (typeof from === "number" && typeof to === "number" && typeof p === "number") return mixNumber(from, to, p);
	return getMixer(from)(from, to);
}
var frameloopDriver = (update) => {
	const passTimestamp = ({ timestamp }) => update(timestamp);
	return {
		start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
		stop: () => cancelFrame(passTimestamp),
		now: () => frameData.isProcessing ? frameData.timestamp : time.now()
	};
};
var generateLinearEasing = (easing, duration, resolution = 10) => {
	let points = "";
	const numPoints = Math.max(Math.round(duration / resolution), 2);
	for (let i$1 = 0; i$1 < numPoints; i$1++) points += Math.round(easing(i$1 / (numPoints - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${points.substring(0, points.length - 2)})`;
};
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
	let duration = 0;
	const timeStep = 50;
	let state = generator.next(duration);
	while (!state.done && duration < 2e4) {
		duration += timeStep;
		state = generator.next(duration);
	}
	return duration >= 2e4 ? Infinity : duration;
}
function createGeneratorEasing(options, scale$1 = 100, createGenerator) {
	const generator = createGenerator({
		...options,
		keyframes: [0, scale$1]
	});
	const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
	return {
		type: "keyframes",
		ease: (progress$1) => {
			return generator.next(duration * progress$1).value / scale$1;
		},
		duration: /* @__PURE__ */ millisecondsToSeconds(duration)
	};
}
var velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t$1, current) {
	const prevT = Math.max(t$1 - velocitySampleDuration, 0);
	return velocityPerSecond(current - resolveValue(prevT), t$1 - prevT);
}
var springDefaults = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	velocity: 0,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05,
	maxDamping: 1
};
var safeMin = .001;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
	let envelope;
	let derivative$1;
	warning(duration <= /* @__PURE__ */ secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let dampingRatio = 1 - bounce;
	dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
	duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, /* @__PURE__ */ millisecondsToSeconds(duration));
	if (dampingRatio < 1) {
		envelope = (undampedFreq$1) => {
			const exponentialDecay = undampedFreq$1 * dampingRatio;
			const delta = exponentialDecay * duration;
			const a$1 = exponentialDecay - velocity;
			const b = calcAngularFreq(undampedFreq$1, dampingRatio);
			const c$1 = Math.exp(-delta);
			return safeMin - a$1 / b * c$1;
		};
		derivative$1 = (undampedFreq$1) => {
			const delta = undampedFreq$1 * dampingRatio * duration;
			const d = delta * velocity + velocity;
			const e$1 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq$1, 2) * duration;
			const f$1 = Math.exp(-delta);
			const g = calcAngularFreq(Math.pow(undampedFreq$1, 2), dampingRatio);
			return (-envelope(undampedFreq$1) + safeMin > 0 ? -1 : 1) * ((d - e$1) * f$1) / g;
		};
	} else {
		envelope = (undampedFreq$1) => {
			const a$1 = Math.exp(-undampedFreq$1 * duration);
			const b = (undampedFreq$1 - velocity) * duration + 1;
			return -safeMin + a$1 * b;
		};
		derivative$1 = (undampedFreq$1) => {
			return Math.exp(-undampedFreq$1 * duration) * ((velocity - undampedFreq$1) * (duration * duration));
		};
	}
	const initialGuess = 5 / duration;
	const undampedFreq = approximateRoot(envelope, derivative$1, initialGuess);
	duration = /* @__PURE__ */ secondsToMilliseconds(duration);
	if (isNaN(undampedFreq)) return {
		stiffness: springDefaults.stiffness,
		damping: springDefaults.damping,
		duration
	};
	else {
		const stiffness = Math.pow(undampedFreq, 2) * mass;
		return {
			stiffness,
			damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
			duration
		};
	}
}
var rootIterations = 12;
function approximateRoot(envelope, derivative$1, initialGuess) {
	let result = initialGuess;
	for (let i$1 = 1; i$1 < rootIterations; i$1++) result = result - envelope(result) / derivative$1(result);
	return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
	return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var durationKeys = ["duration", "bounce"];
var physicsKeys = [
	"stiffness",
	"damping",
	"mass"
];
function isSpringType(options, keys) {
	return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
	let springOptions = {
		velocity: springDefaults.velocity,
		stiffness: springDefaults.stiffness,
		damping: springDefaults.damping,
		mass: springDefaults.mass,
		isResolvedFromDuration: false,
		...options
	};
	if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) if (options.visualDuration) {
		const visualDuration = options.visualDuration;
		const root = 2 * Math.PI / (visualDuration * 1.2);
		const stiffness = root * root;
		const damping = 2 * clamp(.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
		springOptions = {
			...springOptions,
			mass: springDefaults.mass,
			stiffness,
			damping
		};
	} else {
		const derived = findSpring(options);
		springOptions = {
			...springOptions,
			...derived,
			mass: springDefaults.mass
		};
		springOptions.isResolvedFromDuration = true;
	}
	return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
	const options = typeof optionsOrVisualDuration !== "object" ? {
		visualDuration: optionsOrVisualDuration,
		keyframes: [0, 1],
		bounce
	} : optionsOrVisualDuration;
	let { restSpeed, restDelta } = options;
	const origin = options.keyframes[0];
	const target = options.keyframes[options.keyframes.length - 1];
	const state = {
		done: false,
		value: origin
	};
	const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
		...options,
		velocity: -/* @__PURE__ */ millisecondsToSeconds(options.velocity || 0)
	});
	const initialVelocity = velocity || 0;
	const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
	const initialDelta = target - origin;
	const undampedAngularFreq = /* @__PURE__ */ millisecondsToSeconds(Math.sqrt(stiffness / mass));
	const isGranularScale = Math.abs(initialDelta) < 5;
	restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
	restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
	let resolveSpring;
	if (dampingRatio < 1) {
		const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
		resolveSpring = (t$1) => {
			return target - Math.exp(-dampingRatio * undampedAngularFreq * t$1) * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t$1) + initialDelta * Math.cos(angularFreq * t$1));
		};
	} else if (dampingRatio === 1) resolveSpring = (t$1) => target - Math.exp(-undampedAngularFreq * t$1) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t$1);
	else {
		const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
		resolveSpring = (t$1) => {
			const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t$1);
			const freqForT = Math.min(dampedAngularFreq * t$1, 300);
			return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
		};
	}
	const generator = {
		calculatedDuration: isResolvedFromDuration ? duration || null : null,
		next: (t$1) => {
			const current = resolveSpring(t$1);
			if (!isResolvedFromDuration) {
				let currentVelocity = t$1 === 0 ? initialVelocity : 0;
				if (dampingRatio < 1) currentVelocity = t$1 === 0 ? /* @__PURE__ */ secondsToMilliseconds(initialVelocity) : calcGeneratorVelocity(resolveSpring, t$1, current);
				const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
				const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
				state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
			} else state.done = t$1 >= duration;
			state.value = state.done ? target : current;
			return state;
		},
		toString: () => {
			const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
			const easing = generateLinearEasing((progress$1) => generator.next(calculatedDuration * progress$1).value, calculatedDuration, 30);
			return calculatedDuration + "ms " + easing;
		},
		toTransition: () => {}
	};
	return generator;
}
spring.applyToOptions = (options) => {
	const generatorOptions = createGeneratorEasing(options, 100, spring);
	options.ease = generatorOptions.ease;
	options.duration = /* @__PURE__ */ secondsToMilliseconds(generatorOptions.duration);
	options.type = "keyframes";
	return options;
};
function inertia({ keyframes: keyframes$1, velocity = 0, power = .8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = .5, restSpeed }) {
	const origin = keyframes$1[0];
	const state = {
		done: false,
		value: origin
	};
	const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
	const nearestBoundary = (v) => {
		if (min === void 0) return max;
		if (max === void 0) return min;
		return Math.abs(min - v) < Math.abs(max - v) ? min : max;
	};
	let amplitude = power * velocity;
	const ideal = origin + amplitude;
	const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
	if (target !== ideal) amplitude = target - origin;
	const calcDelta = (t$1) => -amplitude * Math.exp(-t$1 / timeConstant);
	const calcLatest = (t$1) => target + calcDelta(t$1);
	const applyFriction = (t$1) => {
		const delta = calcDelta(t$1);
		const latest = calcLatest(t$1);
		state.done = Math.abs(delta) <= restDelta;
		state.value = state.done ? target : latest;
	};
	let timeReachedBoundary;
	let spring$1;
	const checkCatchBoundary = (t$1) => {
		if (!isOutOfBounds(state.value)) return;
		timeReachedBoundary = t$1;
		spring$1 = spring({
			keyframes: [state.value, nearestBoundary(state.value)],
			velocity: calcGeneratorVelocity(calcLatest, t$1, state.value),
			damping: bounceDamping,
			stiffness: bounceStiffness,
			restDelta,
			restSpeed
		});
	};
	checkCatchBoundary(0);
	return {
		calculatedDuration: null,
		next: (t$1) => {
			let hasUpdatedFrame = false;
			if (!spring$1 && timeReachedBoundary === void 0) {
				hasUpdatedFrame = true;
				applyFriction(t$1);
				checkCatchBoundary(t$1);
			}
			if (timeReachedBoundary !== void 0 && t$1 >= timeReachedBoundary) return spring$1.next(t$1 - timeReachedBoundary);
			else {
				!hasUpdatedFrame && applyFriction(t$1);
				return state;
			}
		}
	};
}
function createMixers(output, ease$1, customMixer) {
	const mixers = [];
	const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
	const numMixers = output.length - 1;
	for (let i$1 = 0; i$1 < numMixers; i$1++) {
		let mixer = mixerFactory(output[i$1], output[i$1 + 1]);
		if (ease$1) mixer = pipe(Array.isArray(ease$1) ? ease$1[i$1] || noop : ease$1, mixer);
		mixers.push(mixer);
	}
	return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease$1, mixer } = {}) {
	const inputLength = input.length;
	invariant(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
	if (inputLength === 1) return () => output[0];
	if (inputLength === 2 && output[0] === output[1]) return () => output[1];
	const isZeroDeltaRange = input[0] === input[1];
	if (input[0] > input[inputLength - 1]) {
		input = [...input].reverse();
		output = [...output].reverse();
	}
	const mixers = createMixers(output, ease$1, mixer);
	const numMixers = mixers.length;
	const interpolator = (v) => {
		if (isZeroDeltaRange && v < input[0]) return output[0];
		let i$1 = 0;
		if (numMixers > 1) {
			for (; i$1 < input.length - 2; i$1++) if (v < input[i$1 + 1]) break;
		}
		const progressInRange = /* @__PURE__ */ progress(input[i$1], input[i$1 + 1], v);
		return mixers[i$1](progressInRange);
	};
	return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
function fillOffset(offset, remaining) {
	const min = offset[offset.length - 1];
	for (let i$1 = 1; i$1 <= remaining; i$1++) {
		const offsetProgress = /* @__PURE__ */ progress(0, remaining, i$1);
		offset.push(mixNumber(min, 1, offsetProgress));
	}
}
function defaultOffset(arr) {
	const offset = [0];
	fillOffset(offset, arr.length - 1);
	return offset;
}
function convertOffsetToTimes(offset, duration) {
	return offset.map((o$1) => o$1 * duration);
}
function defaultEasing(values, easing) {
	return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease$1 = "easeInOut" }) {
	const easingFunctions = isEasingArray(ease$1) ? ease$1.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease$1);
	const state = {
		done: false,
		value: keyframeValues[0]
	};
	const mapTimeToKeyframe = interpolate(convertOffsetToTimes(times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues), duration), keyframeValues, { ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions) });
	return {
		calculatedDuration: duration,
		next: (t$1) => {
			state.value = mapTimeToKeyframe(t$1);
			state.done = t$1 >= duration;
			return state;
		}
	};
}
var isNotNull$1 = (value) => value !== null;
function getFinalKeyframe$1(keyframes$1, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
	const resolvedKeyframes = keyframes$1.filter(isNotNull$1);
	const index = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
	return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
var transitionTypeMap = {
	decay: inertia,
	inertia,
	tween: keyframes,
	keyframes,
	spring
};
function replaceTransitionType(transition) {
	if (typeof transition.type === "string") transition.type = transitionTypeMap[transition.type];
}
var WithPromise = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((resolve) => {
			this.resolve = resolve;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(onResolve, onReject) {
		return this.finished.then(onResolve, onReject);
	}
};
var percentToProgress = (percent$1) => percent$1 / 100;
var JSAnimation = class extends WithPromise {
	constructor(options) {
		super();
		this.state = "idle";
		this.startTime = null;
		this.isStopped = false;
		this.currentTime = 0;
		this.holdTime = null;
		this.playbackSpeed = 1;
		this.stop = () => {
			const { motionValue: motionValue$1 } = this.options;
			if (motionValue$1 && motionValue$1.updatedAt !== time.now()) this.tick(time.now());
			this.isStopped = true;
			if (this.state === "idle") return;
			this.teardown();
			this.options.onStop?.();
		};
		activeAnimations.mainThread++;
		this.options = options;
		this.initAnimation();
		this.play();
		if (options.autoplay === false) this.pause();
	}
	initAnimation() {
		const { options } = this;
		replaceTransitionType(options);
		const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
		let { keyframes: keyframes$1 } = options;
		const generatorFactory = type || keyframes;
		if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
			this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
			keyframes$1 = [0, 100];
		}
		const generator = generatorFactory({
			...options,
			keyframes: keyframes$1
		});
		if (repeatType === "mirror") this.mirroredGenerator = generatorFactory({
			...options,
			keyframes: [...keyframes$1].reverse(),
			velocity: -velocity
		});
		if (generator.calculatedDuration === null) generator.calculatedDuration = calcGeneratorDuration(generator);
		const { calculatedDuration } = generator;
		this.calculatedDuration = calculatedDuration;
		this.resolvedDuration = calculatedDuration + repeatDelay;
		this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
		this.generator = generator;
	}
	updateTime(timestamp) {
		const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
		if (this.holdTime !== null) this.currentTime = this.holdTime;
		else this.currentTime = animationTime;
	}
	tick(timestamp, sample = false) {
		const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
		if (this.startTime === null) return generator.next(0);
		const { delay: delay$1 = 0, keyframes: keyframes$1, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
		if (this.speed > 0) this.startTime = Math.min(this.startTime, timestamp);
		else if (this.speed < 0) this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
		if (sample) this.currentTime = timestamp;
		else this.updateTime(timestamp);
		const timeWithoutDelay = this.currentTime - delay$1 * (this.playbackSpeed >= 0 ? 1 : -1);
		const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
		this.currentTime = Math.max(timeWithoutDelay, 0);
		if (this.state === "finished" && this.holdTime === null) this.currentTime = totalDuration;
		let elapsed = this.currentTime;
		let frameGenerator = generator;
		if (repeat) {
			const progress$1 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
			let currentIteration = Math.floor(progress$1);
			let iterationProgress = progress$1 % 1;
			if (!iterationProgress && progress$1 >= 1) iterationProgress = 1;
			iterationProgress === 1 && currentIteration--;
			currentIteration = Math.min(currentIteration, repeat + 1);
			if (Boolean(currentIteration % 2)) {
				if (repeatType === "reverse") {
					iterationProgress = 1 - iterationProgress;
					if (repeatDelay) iterationProgress -= repeatDelay / resolvedDuration;
				} else if (repeatType === "mirror") frameGenerator = mirroredGenerator;
			}
			elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
		}
		const state = isInDelayPhase ? {
			done: false,
			value: keyframes$1[0]
		} : frameGenerator.next(elapsed);
		if (mixKeyframes) state.value = mixKeyframes(state.value);
		let { done } = state;
		if (!isInDelayPhase && calculatedDuration !== null) done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
		const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
		if (isAnimationFinished && type !== inertia) state.value = getFinalKeyframe$1(keyframes$1, this.options, finalKeyframe, this.speed);
		if (onUpdate) onUpdate(state.value);
		if (isAnimationFinished) this.finish();
		return state;
	}
	then(resolve, reject) {
		return this.finished.then(resolve, reject);
	}
	get duration() {
		return /* @__PURE__ */ millisecondsToSeconds(this.calculatedDuration);
	}
	get iterationDuration() {
		const { delay: delay$1 = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ millisecondsToSeconds(delay$1);
	}
	get time() {
		return /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
	}
	set time(newTime) {
		newTime = /* @__PURE__ */ secondsToMilliseconds(newTime);
		this.currentTime = newTime;
		if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) this.holdTime = newTime;
		else if (this.driver) this.startTime = this.driver.now() - newTime / this.playbackSpeed;
		this.driver?.start(false);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(newSpeed) {
		this.updateTime(time.now());
		const hasChanged = this.playbackSpeed !== newSpeed;
		this.playbackSpeed = newSpeed;
		if (hasChanged) this.time = /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
	}
	play() {
		if (this.isStopped) return;
		const { driver = frameloopDriver, startTime } = this.options;
		if (!this.driver) this.driver = driver((timestamp) => this.tick(timestamp));
		this.options.onPlay?.();
		const now$1 = this.driver.now();
		if (this.state === "finished") {
			this.updateFinished();
			this.startTime = now$1;
		} else if (this.holdTime !== null) this.startTime = now$1 - this.holdTime;
		else if (!this.startTime) this.startTime = startTime ?? now$1;
		if (this.state === "finished" && this.speed < 0) this.startTime += this.calculatedDuration;
		this.holdTime = null;
		this.state = "running";
		this.driver.start();
	}
	pause() {
		this.state = "paused";
		this.updateTime(time.now());
		this.holdTime = this.currentTime;
	}
	complete() {
		if (this.state !== "running") this.play();
		this.state = "finished";
		this.holdTime = null;
	}
	finish() {
		this.notifyFinished();
		this.teardown();
		this.state = "finished";
		this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null;
		this.startTime = 0;
		this.tick(0);
		this.teardown();
		this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle";
		this.stopDriver();
		this.startTime = this.holdTime = null;
		activeAnimations.mainThread--;
	}
	stopDriver() {
		if (!this.driver) return;
		this.driver.stop();
		this.driver = void 0;
	}
	sample(sampleTime) {
		this.startTime = 0;
		return this.tick(sampleTime, true);
	}
	attachTimeline(timeline) {
		if (this.options.allowFlatten) {
			this.options.type = "keyframes";
			this.options.ease = "linear";
			this.initAnimation();
		}
		this.driver?.stop();
		return timeline.observe(this);
	}
};
function fillWildcards(keyframes$1) {
	for (let i$1 = 1; i$1 < keyframes$1.length; i$1++) keyframes$1[i$1] ?? (keyframes$1[i$1] = keyframes$1[i$1 - 1]);
}
var radToDeg = (rad) => rad * 180 / Math.PI;
var rotate = (v) => {
	return rebaseAngle(radToDeg(Math.atan2(v[1], v[0])));
};
var matrix2dParsers = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (v) => (Math.abs(v[0]) + Math.abs(v[3])) / 2,
	rotate,
	rotateZ: rotate,
	skewX: (v) => radToDeg(Math.atan(v[1])),
	skewY: (v) => radToDeg(Math.atan(v[2])),
	skew: (v) => (Math.abs(v[1]) + Math.abs(v[2])) / 2
};
var rebaseAngle = (angle) => {
	angle = angle % 360;
	if (angle < 0) angle += 360;
	return angle;
};
var rotateZ = rotate;
var scaleX = (v) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
var scaleY = (v) => Math.sqrt(v[4] * v[4] + v[5] * v[5]);
var matrix3dParsers = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX,
	scaleY,
	scale: (v) => (scaleX(v) + scaleY(v)) / 2,
	rotateX: (v) => rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
	rotateY: (v) => rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
	rotateZ,
	rotate: rotateZ,
	skewX: (v) => radToDeg(Math.atan(v[4])),
	skewY: (v) => radToDeg(Math.atan(v[1])),
	skew: (v) => (Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
	return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
	if (!transform || transform === "none") return defaultTransformValue(name);
	const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
	let parsers;
	let match;
	if (matrix3dMatch) {
		parsers = matrix3dParsers;
		match = matrix3dMatch;
	} else {
		const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		parsers = matrix2dParsers;
		match = matrix2dMatch;
	}
	if (!match) return defaultTransformValue(name);
	const valueParser = parsers[name];
	const values = match[1].split(",").map(convertTransformToNumber);
	return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
var readTransformValue = (instance, name) => {
	const { transform = "none" } = getComputedStyle(instance);
	return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
	return parseFloat(value.trim());
}
var transformPropOrder = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
];
var transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))();
var isNumOrPxType = (v) => v === number || v === px;
var transformKeys = new Set([
	"x",
	"y",
	"z"
]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
	const removedTransforms = [];
	nonTranslationalTransformKeys.forEach((key) => {
		const value = visualElement.getValue(key);
		if (value !== void 0) {
			removedTransforms.push([key, value.get()]);
			value.set(key.startsWith("scale") ? 1 : 0);
		}
	});
	return removedTransforms;
}
var positionalValues = {
	width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
	height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
	top: (_bbox, { top }) => parseFloat(top),
	left: (_bbox, { left }) => parseFloat(left),
	bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
	right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
	x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
	y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
var toResolve = /* @__PURE__ */ new Set();
var isScheduled = false;
var anyNeedsMeasurement = false;
var isForced = false;
function measureAllKeyframes() {
	if (anyNeedsMeasurement) {
		const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
		const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
		const transformsToRestore = /* @__PURE__ */ new Map();
		elementsToMeasure.forEach((element) => {
			const removedTransforms = removeNonTranslationalTransform(element);
			if (!removedTransforms.length) return;
			transformsToRestore.set(element, removedTransforms);
			element.render();
		});
		resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
		elementsToMeasure.forEach((element) => {
			element.render();
			const restore = transformsToRestore.get(element);
			if (restore) restore.forEach(([key, value]) => {
				element.getValue(key)?.set(value);
			});
		});
		resolversToMeasure.forEach((resolver) => resolver.measureEndState());
		resolversToMeasure.forEach((resolver) => {
			if (resolver.suspendedScrollY !== void 0) window.scrollTo(0, resolver.suspendedScrollY);
		});
	}
	anyNeedsMeasurement = false;
	isScheduled = false;
	toResolve.forEach((resolver) => resolver.complete(isForced));
	toResolve.clear();
}
function readAllKeyframes() {
	toResolve.forEach((resolver) => {
		resolver.readKeyframes();
		if (resolver.needsMeasurement) anyNeedsMeasurement = true;
	});
}
function flushKeyframeResolvers() {
	isForced = true;
	readAllKeyframes();
	measureAllKeyframes();
	isForced = false;
}
var KeyframeResolver = class {
	constructor(unresolvedKeyframes, onComplete, name, motionValue$1, element, isAsync = false) {
		this.state = "pending";
		this.isAsync = false;
		this.needsMeasurement = false;
		this.unresolvedKeyframes = [...unresolvedKeyframes];
		this.onComplete = onComplete;
		this.name = name;
		this.motionValue = motionValue$1;
		this.element = element;
		this.isAsync = isAsync;
	}
	scheduleResolve() {
		this.state = "scheduled";
		if (this.isAsync) {
			toResolve.add(this);
			if (!isScheduled) {
				isScheduled = true;
				frame.read(readAllKeyframes);
				frame.resolveKeyframes(measureAllKeyframes);
			}
		} else {
			this.readKeyframes();
			this.complete();
		}
	}
	readKeyframes() {
		const { unresolvedKeyframes, name, element, motionValue: motionValue$1 } = this;
		if (unresolvedKeyframes[0] === null) {
			const currentValue = motionValue$1?.get();
			const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
			if (currentValue !== void 0) unresolvedKeyframes[0] = currentValue;
			else if (element && name) {
				const valueAsRead = element.readValue(name, finalKeyframe);
				if (valueAsRead !== void 0 && valueAsRead !== null) unresolvedKeyframes[0] = valueAsRead;
			}
			if (unresolvedKeyframes[0] === void 0) unresolvedKeyframes[0] = finalKeyframe;
			if (motionValue$1 && currentValue === void 0) motionValue$1.set(unresolvedKeyframes[0]);
		}
		fillWildcards(unresolvedKeyframes);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(isForcedComplete = false) {
		this.state = "complete";
		this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
		toResolve.delete(this);
	}
	cancel() {
		if (this.state === "scheduled") {
			toResolve.delete(this);
			this.state = "pending";
		}
	}
	resume() {
		if (this.state === "pending") this.scheduleResolve();
	}
};
var isCSSVar = (name) => name.startsWith("--");
function setStyle(element, name, value) {
	isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}
var supportsScrollTimeline = /* @__PURE__ */ memo(() => window.ScrollTimeline !== void 0);
var supportsFlags = {};
function memoSupports(callback, supportsFlag) {
	const memoized = /* @__PURE__ */ memo(callback);
	return () => supportsFlags[supportsFlag] ?? memoized();
}
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch (e$1) {
		return false;
	}
	return true;
}, "linearEasing");
var cubicBezierAsString = ([a$1, b, c$1, d]) => `cubic-bezier(${a$1}, ${b}, ${c$1}, ${d})`;
var supportedWaapiEasing = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /* @__PURE__ */ cubicBezierAsString([
		0,
		.65,
		.55,
		1
	]),
	circOut: /* @__PURE__ */ cubicBezierAsString([
		.55,
		0,
		1,
		.45
	]),
	backIn: /* @__PURE__ */ cubicBezierAsString([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /* @__PURE__ */ cubicBezierAsString([
		.33,
		1.53,
		.69,
		.99
	])
};
function mapEasingToNativeEasing(easing, duration) {
	if (!easing) return;
	else if (typeof easing === "function") return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
	else if (isBezierDefinition(easing)) return cubicBezierAsString(easing);
	else if (Array.isArray(easing)) return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
	else return supportedWaapiEasing[easing];
}
function startWaapiAnimation(element, valueName, keyframes$1, { delay: delay$1 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease$1 = "easeOut", times } = {}, pseudoElement = void 0) {
	const keyframeOptions = { [valueName]: keyframes$1 };
	if (times) keyframeOptions.offset = times;
	const easing = mapEasingToNativeEasing(ease$1, duration);
	if (Array.isArray(easing)) keyframeOptions.easing = easing;
	if (statsBuffer.value) activeAnimations.waapi++;
	const options = {
		delay: delay$1,
		duration,
		easing: !Array.isArray(easing) ? easing : "linear",
		fill: "both",
		iterations: repeat + 1,
		direction: repeatType === "reverse" ? "alternate" : "normal"
	};
	if (pseudoElement) options.pseudoElement = pseudoElement;
	const animation = element.animate(keyframeOptions, options);
	if (statsBuffer.value) animation.finished.finally(() => {
		activeAnimations.waapi--;
	});
	return animation;
}
function isGenerator(type) {
	return typeof type === "function" && "applyToOptions" in type;
}
function applyGeneratorOptions({ type, ...options }) {
	if (isGenerator(type) && supportsLinearEasing()) return type.applyToOptions(options);
	else {
		options.duration ?? (options.duration = 300);
		options.ease ?? (options.ease = "easeOut");
	}
	return options;
}
var NativeAnimation = class extends WithPromise {
	constructor(options) {
		super();
		this.finishedTime = null;
		this.isStopped = false;
		if (!options) return;
		const { element, name, keyframes: keyframes$1, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
		this.isPseudoElement = Boolean(pseudoElement);
		this.allowFlatten = allowFlatten;
		this.options = options;
		invariant(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
		const transition = applyGeneratorOptions(options);
		this.animation = startWaapiAnimation(element, name, keyframes$1, transition, pseudoElement);
		if (transition.autoplay === false) this.animation.pause();
		this.animation.onfinish = () => {
			this.finishedTime = this.time;
			if (!pseudoElement) {
				const keyframe = getFinalKeyframe$1(keyframes$1, this.options, finalKeyframe, this.speed);
				if (this.updateMotionValue) this.updateMotionValue(keyframe);
				else setStyle(element, name, keyframe);
				this.animation.cancel();
			}
			onComplete?.();
			this.notifyFinished();
		};
	}
	play() {
		if (this.isStopped) return;
		this.animation.play();
		if (this.state === "finished") this.updateFinished();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch (e$1) {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = true;
		const { state } = this;
		if (state === "idle" || state === "finished") return;
		if (this.updateMotionValue) this.updateMotionValue();
		else this.commitStyles();
		if (!this.isPseudoElement) this.cancel();
	}
	commitStyles() {
		if (!this.isPseudoElement) this.animation.commitStyles?.();
	}
	get duration() {
		const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ millisecondsToSeconds(Number(duration));
	}
	get iterationDuration() {
		const { delay: delay$1 = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ millisecondsToSeconds(delay$1);
	}
	get time() {
		return /* @__PURE__ */ millisecondsToSeconds(Number(this.animation.currentTime) || 0);
	}
	set time(newTime) {
		this.finishedTime = null;
		this.animation.currentTime = /* @__PURE__ */ secondsToMilliseconds(newTime);
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(newSpeed) {
		if (newSpeed < 0) this.finishedTime = null;
		this.animation.playbackRate = newSpeed;
	}
	get state() {
		return this.finishedTime !== null ? "finished" : this.animation.playState;
	}
	get startTime() {
		return Number(this.animation.startTime);
	}
	set startTime(newStartTime) {
		this.animation.startTime = newStartTime;
	}
	attachTimeline({ timeline, observe }) {
		if (this.allowFlatten) this.animation.effect?.updateTiming({ easing: "linear" });
		this.animation.onfinish = null;
		if (timeline && supportsScrollTimeline()) {
			this.animation.timeline = timeline;
			return noop;
		} else return observe(this);
	}
};
var unsupportedEasingFunctions = {
	anticipate,
	backInOut,
	circInOut
};
function isUnsupportedEase(key) {
	return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
	if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) transition.ease = unsupportedEasingFunctions[transition.ease];
}
var sampleDelta = 10;
var NativeAnimationExtended = class extends NativeAnimation {
	constructor(options) {
		replaceStringEasing(options);
		replaceTransitionType(options);
		super(options);
		if (options.startTime) this.startTime = options.startTime;
		this.options = options;
	}
	updateMotionValue(value) {
		const { motionValue: motionValue$1, onUpdate, onComplete, element, ...options } = this.options;
		if (!motionValue$1) return;
		if (value !== void 0) {
			motionValue$1.set(value);
			return;
		}
		const sampleAnimation = new JSAnimation({
			...options,
			autoplay: false
		});
		const sampleTime = /* @__PURE__ */ secondsToMilliseconds(this.finishedTime ?? this.time);
		motionValue$1.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
		sampleAnimation.stop();
	}
};
var isAnimatable = (value, name) => {
	if (name === "zIndex") return false;
	if (typeof value === "number" || Array.isArray(value)) return true;
	if (typeof value === "string" && (complex.test(value) || value === "0") && !value.startsWith("url(")) return true;
	return false;
};
function hasKeyframesChanged(keyframes$1) {
	const current = keyframes$1[0];
	if (keyframes$1.length === 1) return true;
	for (let i$1 = 0; i$1 < keyframes$1.length; i$1++) if (keyframes$1[i$1] !== current) return true;
}
function canAnimate(keyframes$1, name, type, velocity) {
	const originKeyframe = keyframes$1[0];
	if (originKeyframe === null) return false;
	if (name === "display" || name === "visibility") return true;
	const targetKeyframe = keyframes$1[keyframes$1.length - 1];
	const isOriginAnimatable = isAnimatable(originKeyframe, name);
	const isTargetAnimatable = isAnimatable(targetKeyframe, name);
	warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
	if (!isOriginAnimatable || !isTargetAnimatable) return false;
	return hasKeyframesChanged(keyframes$1) || (type === "spring" || isGenerator(type)) && velocity;
}
function makeAnimationInstant(options) {
	options.duration = 0;
	options.type = "keyframes";
}
var acceleratedValues = new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]);
var supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
	const { motionValue: motionValue$1, name, repeatDelay, repeatType, damping, type } = options;
	if (!(motionValue$1?.owner?.current instanceof HTMLElement)) return false;
	const { onUpdate, transformTemplate } = motionValue$1.owner.getProps();
	return supportsWaapi() && name && acceleratedValues.has(name) && (name !== "transform" || !transformTemplate) && !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}
var MAX_RESOLVE_DELAY = 40;
var AsyncMotionValueAnimation = class extends WithPromise {
	constructor({ autoplay = true, delay: delay$1 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes$1, name, motionValue: motionValue$1, element, ...options }) {
		super();
		this.stop = () => {
			if (this._animation) {
				this._animation.stop();
				this.stopTimeline?.();
			}
			this.keyframeResolver?.cancel();
		};
		this.createdAt = time.now();
		const optionsWithDefaults = {
			autoplay,
			delay: delay$1,
			type,
			repeat,
			repeatDelay,
			repeatType,
			name,
			motionValue: motionValue$1,
			element,
			...options
		};
		this.keyframeResolver = new (element?.KeyframeResolver || KeyframeResolver)(keyframes$1, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue$1, element);
		this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(keyframes$1, finalKeyframe, options, sync) {
		this.keyframeResolver = void 0;
		const { name, type, velocity, delay: delay$1, isHandoff, onUpdate } = options;
		this.resolvedAt = time.now();
		if (!canAnimate(keyframes$1, name, type, velocity)) {
			if (MotionGlobalConfig.instantAnimations || !delay$1) onUpdate?.(getFinalKeyframe$1(keyframes$1, options, finalKeyframe));
			keyframes$1[0] = keyframes$1[keyframes$1.length - 1];
			makeAnimationInstant(options);
			options.repeat = 0;
		}
		const resolvedOptions = {
			startTime: sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe,
			...options,
			keyframes: keyframes$1
		};
		const animation = !isHandoff && supportsBrowserAnimation(resolvedOptions) ? new NativeAnimationExtended({
			...resolvedOptions,
			element: resolvedOptions.motionValue.owner.current
		}) : new JSAnimation(resolvedOptions);
		animation.finished.then(() => this.notifyFinished()).catch(noop);
		if (this.pendingTimeline) {
			this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
			this.pendingTimeline = void 0;
		}
		this._animation = animation;
	}
	get finished() {
		if (!this._animation) return this._finished;
		else return this.animation.finished;
	}
	then(onResolve, _onReject) {
		return this.finished.finally(onResolve).then(() => {});
	}
	get animation() {
		if (!this._animation) {
			this.keyframeResolver?.resume();
			flushKeyframeResolvers();
		}
		return this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(newTime) {
		this.animation.time = newTime;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(newSpeed) {
		this.animation.speed = newSpeed;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(timeline) {
		if (this._animation) this.stopTimeline = this.animation.attachTimeline(timeline);
		else this.pendingTimeline = timeline;
		return () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		if (this._animation) this.animation.cancel();
		this.keyframeResolver?.cancel();
	}
};
var splitCSSVariableRegex = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
	const match = splitCSSVariableRegex.exec(current);
	if (!match) return [,];
	const [, token1, token2, fallback] = match;
	return [`--${token1 ?? token2}`, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
	invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	const [token, fallback] = parseCSSVariable(current);
	if (!token) return;
	const resolved = window.getComputedStyle(element).getPropertyValue(token);
	if (resolved) {
		const trimmed = resolved.trim();
		return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
	}
	return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
function getValueTransition(transition, key) {
	return transition?.[key] ?? transition?.["default"] ?? transition;
}
var positionalKeys = new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...transformPropOrder
]);
var auto = {
	test: (v) => v === "auto",
	parse: (v) => v
};
var testValueType = (v) => (type) => type.test(v);
var dimensionValueTypes = [
	number,
	px,
	percent,
	degrees,
	vw,
	vh,
	auto
];
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
function isNone(value) {
	if (typeof value === "number") return value === 0;
	else if (value !== null) return value === "none" || value === "0" || isZeroValueString(value);
	else return true;
}
var maxDefaults = new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function applyDefaultFilter(v) {
	const [name, value] = v.slice(0, -1).split("(");
	if (name === "drop-shadow") return v;
	const [number$1] = value.match(floatRegex) || [];
	if (!number$1) return v;
	const unit$1 = value.replace(number$1, "");
	let defaultValue = maxDefaults.has(name) ? 1 : 0;
	if (number$1 !== value) defaultValue *= 100;
	return name + "(" + defaultValue + unit$1 + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
var filter = {
	...complex,
	getAnimatableNone: (v) => {
		const functions = v.match(functionRegex);
		return functions ? functions.map(applyDefaultFilter).join(" ") : v;
	}
};
var int = {
	...number,
	transform: Math.round
};
var numberValueTypes = {
	borderWidth: px,
	borderTopWidth: px,
	borderRightWidth: px,
	borderBottomWidth: px,
	borderLeftWidth: px,
	borderRadius: px,
	radius: px,
	borderTopLeftRadius: px,
	borderTopRightRadius: px,
	borderBottomRightRadius: px,
	borderBottomLeftRadius: px,
	width: px,
	maxWidth: px,
	height: px,
	maxHeight: px,
	top: px,
	right: px,
	bottom: px,
	left: px,
	padding: px,
	paddingTop: px,
	paddingRight: px,
	paddingBottom: px,
	paddingLeft: px,
	margin: px,
	marginTop: px,
	marginRight: px,
	marginBottom: px,
	marginLeft: px,
	backgroundPositionX: px,
	backgroundPositionY: px,
	rotate: degrees,
	rotateX: degrees,
	rotateY: degrees,
	rotateZ: degrees,
	scale,
	scaleX: scale,
	scaleY: scale,
	scaleZ: scale,
	skew: degrees,
	skewX: degrees,
	skewY: degrees,
	distance: px,
	translateX: px,
	translateY: px,
	translateZ: px,
	x: px,
	y: px,
	z: px,
	perspective: px,
	transformPerspective: px,
	opacity: alpha,
	originX: progressPercentage,
	originY: progressPercentage,
	originZ: px,
	zIndex: int,
	fillOpacity: alpha,
	strokeOpacity: alpha,
	numOctaves: int
};
var defaultValueTypes = {
	...numberValueTypes,
	color,
	backgroundColor: color,
	outlineColor: color,
	fill: color,
	stroke: color,
	borderColor: color,
	borderTopColor: color,
	borderRightColor: color,
	borderBottomColor: color,
	borderLeftColor: color,
	filter,
	WebkitFilter: filter
};
var getDefaultValueType = (key) => defaultValueTypes[key];
function getAnimatableNone(key, value) {
	let defaultValueType = getDefaultValueType(key);
	if (defaultValueType !== filter) defaultValueType = complex;
	return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}
var invalidTemplates = new Set([
	"auto",
	"none",
	"0"
]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
	let i$1 = 0;
	let animatableTemplate = void 0;
	while (i$1 < unresolvedKeyframes.length && !animatableTemplate) {
		const keyframe = unresolvedKeyframes[i$1];
		if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) animatableTemplate = unresolvedKeyframes[i$1];
		i$1++;
	}
	if (animatableTemplate && name) for (const noneIndex of noneKeyframeIndexes) unresolvedKeyframes[noneIndex] = getAnimatableNone(name, animatableTemplate);
}
var DOMKeyframesResolver = class extends KeyframeResolver {
	constructor(unresolvedKeyframes, onComplete, name, motionValue$1, element) {
		super(unresolvedKeyframes, onComplete, name, motionValue$1, element, true);
	}
	readKeyframes() {
		const { unresolvedKeyframes, element, name } = this;
		if (!element || !element.current) return;
		super.readKeyframes();
		for (let i$1 = 0; i$1 < unresolvedKeyframes.length; i$1++) {
			let keyframe = unresolvedKeyframes[i$1];
			if (typeof keyframe === "string") {
				keyframe = keyframe.trim();
				if (isCSSVariableToken(keyframe)) {
					const resolved = getVariableValue(keyframe, element.current);
					if (resolved !== void 0) unresolvedKeyframes[i$1] = resolved;
					if (i$1 === unresolvedKeyframes.length - 1) this.finalKeyframe = keyframe;
				}
			}
		}
		this.resolveNoneKeyframes();
		if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) return;
		const [origin, target] = unresolvedKeyframes;
		const originType = findDimensionValueType(origin);
		const targetType = findDimensionValueType(target);
		if (originType === targetType) return;
		if (isNumOrPxType(originType) && isNumOrPxType(targetType)) for (let i$1 = 0; i$1 < unresolvedKeyframes.length; i$1++) {
			const value = unresolvedKeyframes[i$1];
			if (typeof value === "string") unresolvedKeyframes[i$1] = parseFloat(value);
		}
		else if (positionalValues[name]) this.needsMeasurement = true;
	}
	resolveNoneKeyframes() {
		const { unresolvedKeyframes, name } = this;
		const noneKeyframeIndexes = [];
		for (let i$1 = 0; i$1 < unresolvedKeyframes.length; i$1++) if (unresolvedKeyframes[i$1] === null || isNone(unresolvedKeyframes[i$1])) noneKeyframeIndexes.push(i$1);
		if (noneKeyframeIndexes.length) makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
	}
	measureInitialState() {
		const { element, unresolvedKeyframes, name } = this;
		if (!element || !element.current) return;
		if (name === "height") this.suspendedScrollY = window.pageYOffset;
		this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
		unresolvedKeyframes[0] = this.measuredOrigin;
		const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
		if (measureKeyframe !== void 0) element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
	}
	measureEndState() {
		const { element, name, unresolvedKeyframes } = this;
		if (!element || !element.current) return;
		const value = element.getValue(name);
		value && value.jump(this.measuredOrigin, false);
		const finalKeyframeIndex = unresolvedKeyframes.length - 1;
		const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
		unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
		if (finalKeyframe !== null && this.finalKeyframe === void 0) this.finalKeyframe = finalKeyframe;
		if (this.removedTransforms?.length) this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
			element.getValue(unsetTransformName).set(unsetTransformValue);
		});
		this.resolveNoneKeyframes();
	}
};
function resolveElements(elementOrSelector, scope, selectorCache) {
	if (elementOrSelector instanceof EventTarget) return [elementOrSelector];
	else if (typeof elementOrSelector === "string") {
		let root = document;
		if (scope) root = scope.current;
		const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
		return elements ? Array.from(elements) : [];
	}
	return Array.from(elementOrSelector);
}
var getValueAsType = (value, type) => {
	return type && typeof value === "number" ? type.transform(value) : value;
};
function isHTMLElement(element) {
	return isObject(element) && "offsetHeight" in element;
}
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
	return !isNaN(parseFloat(value));
};
var collectMotionValues = { current: void 0 };
var MotionValue = class {
	constructor(init, options = {}) {
		this.canTrackVelocity = null;
		this.events = {};
		this.updateAndNotify = (v) => {
			const currentTime = time.now();
			if (this.updatedAt !== currentTime) this.setPrevFrameValue();
			this.prev = this.current;
			this.setCurrent(v);
			if (this.current !== this.prev) {
				this.events.change?.notify(this.current);
				if (this.dependents) for (const dependent of this.dependents) dependent.dirty();
			}
		};
		this.hasAnimated = false;
		this.setCurrent(init);
		this.owner = options.owner;
	}
	setCurrent(current) {
		this.current = current;
		this.updatedAt = time.now();
		if (this.canTrackVelocity === null && current !== void 0) this.canTrackVelocity = isFloat(this.current);
	}
	setPrevFrameValue(prevFrameValue = this.current) {
		this.prevFrameValue = prevFrameValue;
		this.prevUpdatedAt = this.updatedAt;
	}
	onChange(subscription) {
		return this.on("change", subscription);
	}
	on(eventName, callback) {
		if (!this.events[eventName]) this.events[eventName] = new SubscriptionManager();
		const unsubscribe = this.events[eventName].add(callback);
		if (eventName === "change") return () => {
			unsubscribe();
			frame.read(() => {
				if (!this.events.change.getSize()) this.stop();
			});
		};
		return unsubscribe;
	}
	clearListeners() {
		for (const eventManagers in this.events) this.events[eventManagers].clear();
	}
	attach(passiveEffect, stopPassiveEffect) {
		this.passiveEffect = passiveEffect;
		this.stopPassiveEffect = stopPassiveEffect;
	}
	set(v) {
		if (!this.passiveEffect) this.updateAndNotify(v);
		else this.passiveEffect(v, this.updateAndNotify);
	}
	setWithVelocity(prev, current, delta) {
		this.set(current);
		this.prev = void 0;
		this.prevFrameValue = prev;
		this.prevUpdatedAt = this.updatedAt - delta;
	}
	jump(v, endAnimation = true) {
		this.updateAndNotify(v);
		this.prev = v;
		this.prevUpdatedAt = this.prevFrameValue = void 0;
		endAnimation && this.stop();
		if (this.stopPassiveEffect) this.stopPassiveEffect();
	}
	dirty() {
		this.events.change?.notify(this.current);
	}
	addDependent(dependent) {
		if (!this.dependents) this.dependents = /* @__PURE__ */ new Set();
		this.dependents.add(dependent);
	}
	removeDependent(dependent) {
		if (this.dependents) this.dependents.delete(dependent);
	}
	get() {
		if (collectMotionValues.current) collectMotionValues.current.push(this);
		return this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		const currentTime = time.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) return 0;
		const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
		return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
	}
	start(startAnimation) {
		this.stop();
		return new Promise((resolve) => {
			this.hasAnimated = true;
			this.animation = startAnimation(resolve);
			if (this.events.animationStart) this.events.animationStart.notify();
		}).then(() => {
			if (this.events.animationComplete) this.events.animationComplete.notify();
			this.clearAnimation();
		});
	}
	stop() {
		if (this.animation) {
			this.animation.stop();
			if (this.events.animationCancel) this.events.animationCancel.notify();
		}
		this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.dependents?.clear();
		this.events.destroy?.notify();
		this.clearListeners();
		this.stop();
		if (this.stopPassiveEffect) this.stopPassiveEffect();
	}
};
function motionValue(init, options) {
	return new MotionValue(init, options);
}
var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);
var isDragging = {
	x: false,
	y: false
};
function isDragActive() {
	return isDragging.x || isDragging.y;
}
function setDragLock(axis) {
	if (axis === "x" || axis === "y") if (isDragging[axis]) return null;
	else {
		isDragging[axis] = true;
		return () => {
			isDragging[axis] = false;
		};
	}
	else if (isDragging.x || isDragging.y) return null;
	else {
		isDragging.x = isDragging.y = true;
		return () => {
			isDragging.x = isDragging.y = false;
		};
	}
}
function setupGesture(elementOrSelector, options) {
	const elements = resolveElements(elementOrSelector);
	const gestureAbortController = new AbortController();
	const eventOptions = {
		passive: true,
		...options,
		signal: gestureAbortController.signal
	};
	const cancel = () => gestureAbortController.abort();
	return [
		elements,
		eventOptions,
		cancel
	];
}
function isValidHover(event) {
	return !(event.pointerType === "touch" || isDragActive());
}
function hover(elementOrSelector, onHoverStart, options = {}) {
	const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
	const onPointerEnter = (enterEvent) => {
		if (!isValidHover(enterEvent)) return;
		const { target } = enterEvent;
		const onHoverEnd = onHoverStart(target, enterEvent);
		if (typeof onHoverEnd !== "function" || !target) return;
		const onPointerLeave = (leaveEvent) => {
			if (!isValidHover(leaveEvent)) return;
			onHoverEnd(leaveEvent);
			target.removeEventListener("pointerleave", onPointerLeave);
		};
		target.addEventListener("pointerleave", onPointerLeave, eventOptions);
	};
	elements.forEach((element) => {
		element.addEventListener("pointerenter", onPointerEnter, eventOptions);
	});
	return cancel;
}
var isNodeOrChild = (parent, child) => {
	if (!child) return false;
	else if (parent === child) return true;
	else return isNodeOrChild(parent, child.parentElement);
};
var isPrimaryPointer = (event) => {
	if (event.pointerType === "mouse") return typeof event.button !== "number" || event.button <= 0;
	else return event.isPrimary !== false;
};
var focusableElements = new Set([
	"BUTTON",
	"INPUT",
	"SELECT",
	"TEXTAREA",
	"A"
]);
function isElementKeyboardAccessible(element) {
	return focusableElements.has(element.tagName) || element.tabIndex !== -1;
}
var isPressing = /* @__PURE__ */ new WeakSet();
function filterEvents(callback) {
	return (event) => {
		if (event.key !== "Enter") return;
		callback(event);
	};
}
function firePointerEvent(target, type) {
	target.dispatchEvent(new PointerEvent("pointer" + type, {
		isPrimary: true,
		bubbles: true
	}));
}
var enableKeyboardPress = (focusEvent, eventOptions) => {
	const element = focusEvent.currentTarget;
	if (!element) return;
	const handleKeydown = filterEvents(() => {
		if (isPressing.has(element)) return;
		firePointerEvent(element, "down");
		const handleKeyup = filterEvents(() => {
			firePointerEvent(element, "up");
		});
		const handleBlur = () => firePointerEvent(element, "cancel");
		element.addEventListener("keyup", handleKeyup, eventOptions);
		element.addEventListener("blur", handleBlur, eventOptions);
	});
	element.addEventListener("keydown", handleKeydown, eventOptions);
	element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};
function isValidPressEvent(event) {
	return isPrimaryPointer(event) && !isDragActive();
}
function press(targetOrSelector, onPressStart, options = {}) {
	const [targets, eventOptions, cancelEvents] = setupGesture(targetOrSelector, options);
	const startPress = (startEvent) => {
		const target = startEvent.currentTarget;
		if (!isValidPressEvent(startEvent)) return;
		isPressing.add(target);
		const onPressEnd = onPressStart(target, startEvent);
		const onPointerEnd = (endEvent, success) => {
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerCancel);
			if (isPressing.has(target)) isPressing.delete(target);
			if (!isValidPressEvent(endEvent)) return;
			if (typeof onPressEnd === "function") onPressEnd(endEvent, { success });
		};
		const onPointerUp = (upEvent) => {
			onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || isNodeOrChild(target, upEvent.target));
		};
		const onPointerCancel = (cancelEvent) => {
			onPointerEnd(cancelEvent, false);
		};
		window.addEventListener("pointerup", onPointerUp, eventOptions);
		window.addEventListener("pointercancel", onPointerCancel, eventOptions);
	};
	targets.forEach((target) => {
		(options.useGlobalTarget ? window : target).addEventListener("pointerdown", startPress, eventOptions);
		if (isHTMLElement(target)) {
			target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions));
			if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) target.tabIndex = 0;
		}
	});
	return cancelEvents;
}
function isSVGElement(element) {
	return isObject(element) && "ownerSVGElement" in element;
}
function isSVGSVGElement(element) {
	return isSVGElement(element) && element.tagName === "svg";
}
var isMotionValue = (value) => Boolean(value && value.getVelocity);
var valueTypes = [
	...dimensionValueTypes,
	color,
	complex
];
var findValueType = (v) => valueTypes.find(testValueType(v));
var MotionConfigContext = (0, import_react.createContext)({
	transformPagePoint: (p) => p,
	isStatic: false,
	reducedMotion: "never"
});
function usePresence(subscribe = true) {
	const context = (0, import_react.useContext)(PresenceContext);
	if (context === null) return [true, null];
	const { isPresent, onExitComplete, register } = context;
	const id$2 = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		if (subscribe) return register(id$2);
	}, [subscribe]);
	const safeToRemove = (0, import_react.useCallback)(() => subscribe && onExitComplete && onExitComplete(id$2), [
		id$2,
		onExitComplete,
		subscribe
	]);
	return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
var LazyContext = (0, import_react.createContext)({ strict: false });
var featureProps = {
	animation: [
		"animate",
		"variants",
		"whileHover",
		"whileTap",
		"exit",
		"whileInView",
		"whileFocus",
		"whileDrag"
	],
	exit: ["exit"],
	drag: ["drag", "dragControls"],
	focus: ["whileFocus"],
	hover: [
		"whileHover",
		"onHoverStart",
		"onHoverEnd"
	],
	tap: [
		"whileTap",
		"onTap",
		"onTapStart",
		"onTapCancel"
	],
	pan: [
		"onPan",
		"onPanStart",
		"onPanSessionStart",
		"onPanEnd"
	],
	inView: [
		"whileInView",
		"onViewportEnter",
		"onViewportLeave"
	],
	layout: ["layout", "layoutId"]
};
var featureDefinitions = {};
for (const key in featureProps) featureDefinitions[key] = { isEnabled: (props) => featureProps[key].some((name) => !!props[name]) };
function loadFeatures(features) {
	for (const key in features) featureDefinitions[key] = {
		...featureDefinitions[key],
		...features[key]
	};
}
var validMotionProps = new Set([
	"animate",
	"exit",
	"variants",
	"initial",
	"style",
	"values",
	"variants",
	"transition",
	"transformTemplate",
	"custom",
	"inherit",
	"onBeforeLayoutMeasure",
	"onAnimationStart",
	"onAnimationComplete",
	"onUpdate",
	"onDragStart",
	"onDrag",
	"onDragEnd",
	"onMeasureDragConstraints",
	"onDirectionLock",
	"onDragTransitionEnd",
	"_dragX",
	"_dragY",
	"onHoverStart",
	"onHoverEnd",
	"onViewportEnter",
	"onViewportLeave",
	"globalTapTarget",
	"ignoreStrict",
	"viewport"
]);
function isValidMotionProp(key) {
	return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
function memoize(fn) {
	var cache$1 = Object.create(null);
	return function(arg) {
		if (cache$1[arg] === void 0) cache$1[arg] = fn(arg);
		return cache$1[arg];
	};
}
var init_emotion_memoize_esm = __esmMin((() => {}));
var emotion_is_prop_valid_esm_exports = /* @__PURE__ */ __export({ default: () => isPropValid }, 1);
var reactPropsRegex, isPropValid;
var init_emotion_is_prop_valid_esm = __esmMin((() => {
	init_emotion_memoize_esm();
	reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
	isPropValid = /* @__PURE__ */ memoize(function(prop) {
		return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
	});
}));
var shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
	if (typeof isValidProp !== "function") return;
	shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
	loadExternalIsValidProp((init_emotion_is_prop_valid_esm(), __toCommonJS(emotion_is_prop_valid_esm_exports)).default);
} catch {}
function filterProps(props, isDom, forwardMotionProps) {
	const filteredProps = {};
	for (const key in props) {
		if (key === "values" && typeof props.values === "object") continue;
		if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) filteredProps[key] = props[key];
	}
	return filteredProps;
}
var MotionContext = /* @__PURE__ */ (0, import_react.createContext)({});
function isAnimationControls(v) {
	return v !== null && typeof v === "object" && typeof v.start === "function";
}
function isVariantLabel(v) {
	return typeof v === "string" || Array.isArray(v);
}
var variantPriorityOrder = [
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
var variantProps = ["initial", ...variantPriorityOrder];
function isControllingVariants(props) {
	return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
	return Boolean(isControllingVariants(props) || props.variants);
}
function getCurrentTreeVariants(props, context) {
	if (isControllingVariants(props)) {
		const { initial, animate } = props;
		return {
			initial: initial === false || isVariantLabel(initial) ? initial : void 0,
			animate: isVariantLabel(animate) ? animate : void 0
		};
	}
	return props.inherit !== false ? context : {};
}
function useCreateMotionContext(props) {
	const { initial, animate } = getCurrentTreeVariants(props, (0, import_react.useContext)(MotionContext));
	return (0, import_react.useMemo)(() => ({
		initial,
		animate
	}), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
	return Array.isArray(prop) ? prop.join(" ") : prop;
}
function pixelsToPercent(pixels, axis) {
	if (axis.max === axis.min) return 0;
	return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = { correct: (latest, node) => {
	if (!node.target) return latest;
	if (typeof latest === "string") if (px.test(latest)) latest = parseFloat(latest);
	else return latest;
	return `${pixelsToPercent(latest, node.target.x)}% ${pixelsToPercent(latest, node.target.y)}%`;
} };
var correctBoxShadow = { correct: (latest, { treeScale, projectionDelta }) => {
	const original = latest;
	const shadow = complex.parse(latest);
	if (shadow.length > 5) return original;
	const template = complex.createTransformer(latest);
	const offset = typeof shadow[0] !== "number" ? 1 : 0;
	const xScale = projectionDelta.x.scale * treeScale.x;
	const yScale = projectionDelta.y.scale * treeScale.y;
	shadow[0 + offset] /= xScale;
	shadow[1 + offset] /= yScale;
	const averageScale = mixNumber(xScale, yScale, .5);
	if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
	if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
	return template(shadow);
} };
var scaleCorrectors = {
	borderRadius: {
		...correctBorderRadius,
		applyTo: [
			"borderTopLeftRadius",
			"borderTopRightRadius",
			"borderBottomLeftRadius",
			"borderBottomRightRadius"
		]
	},
	borderTopLeftRadius: correctBorderRadius,
	borderTopRightRadius: correctBorderRadius,
	borderBottomLeftRadius: correctBorderRadius,
	borderBottomRightRadius: correctBorderRadius,
	boxShadow: correctBoxShadow
};
function isForcedMotionValue(key, { layout: layout$1, layoutId }) {
	return transformProps.has(key) || key.startsWith("origin") || (layout$1 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
var translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform, transformTemplate) {
	let transformString = "";
	let transformIsDefault = true;
	for (let i$1 = 0; i$1 < numTransforms; i$1++) {
		const key = transformPropOrder[i$1];
		const value = latestValues[key];
		if (value === void 0) continue;
		let valueIsDefault = true;
		if (typeof value === "number") valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
		else valueIsDefault = parseFloat(value) === 0;
		if (!valueIsDefault || transformTemplate) {
			const valueAsType = getValueAsType(value, numberValueTypes[key]);
			if (!valueIsDefault) {
				transformIsDefault = false;
				const transformName = translateAlias[key] || key;
				transformString += `${transformName}(${valueAsType}) `;
			}
			if (transformTemplate) transform[key] = valueAsType;
		}
	}
	transformString = transformString.trim();
	if (transformTemplate) transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
	else if (transformIsDefault) transformString = "none";
	return transformString;
}
function buildHTMLStyles(state, latestValues, transformTemplate) {
	const { style, vars, transformOrigin } = state;
	let hasTransform$1 = false;
	let hasTransformOrigin = false;
	for (const key in latestValues) {
		const value = latestValues[key];
		if (transformProps.has(key)) {
			hasTransform$1 = true;
			continue;
		} else if (isCSSVariableName(key)) {
			vars[key] = value;
			continue;
		} else {
			const valueAsType = getValueAsType(value, numberValueTypes[key]);
			if (key.startsWith("origin")) {
				hasTransformOrigin = true;
				transformOrigin[key] = valueAsType;
			} else style[key] = valueAsType;
		}
	}
	if (!latestValues.transform) {
		if (hasTransform$1 || transformTemplate) style.transform = buildTransform(latestValues, state.transform, transformTemplate);
		else if (style.transform) style.transform = "none";
	}
	if (hasTransformOrigin) {
		const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
		style.transformOrigin = `${originX} ${originY} ${originZ}`;
	}
}
var createHtmlRenderState = () => ({
	style: {},
	transform: {},
	transformOrigin: {},
	vars: {}
});
function copyRawValuesOnly(target, source, props) {
	for (const key in source) if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) target[key] = source[key];
}
function useInitialMotionValues({ transformTemplate }, visualState) {
	return (0, import_react.useMemo)(() => {
		const state = createHtmlRenderState();
		buildHTMLStyles(state, visualState, transformTemplate);
		return Object.assign({}, state.vars, state.style);
	}, [visualState]);
}
function useStyle(props, visualState) {
	const styleProp = props.style || {};
	const style = {};
	copyRawValuesOnly(style, styleProp, props);
	Object.assign(style, useInitialMotionValues(props, visualState));
	return style;
}
function useHTMLProps(props, visualState) {
	const htmlProps = {};
	const style = useStyle(props, visualState);
	if (props.drag && props.dragListener !== false) {
		htmlProps.draggable = false;
		style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
		style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
	}
	if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) htmlProps.tabIndex = 0;
	htmlProps.style = style;
	return htmlProps;
}
var dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
};
var camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
	attrs.pathLength = 1;
	const keys = useDashCase ? dashKeys : camelKeys;
	attrs[keys.offset] = px.transform(-offset);
	const pathLength = px.transform(length);
	const pathSpacing = px.transform(spacing);
	attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, ...latest }, isSVGTag$1, transformTemplate, styleProp) {
	buildHTMLStyles(state, latest, transformTemplate);
	if (isSVGTag$1) {
		if (state.style.viewBox) state.attrs.viewBox = state.style.viewBox;
		return;
	}
	state.attrs = state.style;
	state.style = {};
	const { attrs, style } = state;
	if (attrs.transform) {
		style.transform = attrs.transform;
		delete attrs.transform;
	}
	if (style.transform || attrs.transformOrigin) {
		style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
		delete attrs.transformOrigin;
	}
	if (style.transform) {
		style.transformBox = styleProp?.transformBox ?? "fill-box";
		delete attrs.transformBox;
	}
	if (attrX !== void 0) attrs.x = attrX;
	if (attrY !== void 0) attrs.y = attrY;
	if (attrScale !== void 0) attrs.scale = attrScale;
	if (pathLength !== void 0) buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
}
var createSvgRenderState = () => ({
	...createHtmlRenderState(),
	attrs: {}
});
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
function useSVGProps(props, visualState, _isStatic, Component$1) {
	const visualProps = (0, import_react.useMemo)(() => {
		const state = createSvgRenderState();
		buildSVGAttrs(state, visualState, isSVGTag(Component$1), props.transformTemplate, props.style);
		return {
			...state.attrs,
			style: { ...state.style }
		};
	}, [visualState]);
	if (props.style) {
		const rawStyles = {};
		copyRawValuesOnly(rawStyles, props.style, props);
		visualProps.style = {
			...rawStyles,
			...visualProps.style
		};
	}
	return visualProps;
}
var lowercaseSVGElements = [
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"switch",
	"symbol",
	"svg",
	"text",
	"tspan",
	"use",
	"view"
];
function isSVGComponent(Component$1) {
	if (typeof Component$1 !== "string" || Component$1.includes("-")) return false;
	else if (lowercaseSVGElements.indexOf(Component$1) > -1 || /[A-Z]/u.test(Component$1)) return true;
	return false;
}
function useRender(Component$1, props, ref, { latestValues }, isStatic, forwardMotionProps = false) {
	const visualProps = (isSVGComponent(Component$1) ? useSVGProps : useHTMLProps)(props, latestValues, isStatic, Component$1);
	const filteredProps = filterProps(props, typeof Component$1 === "string", forwardMotionProps);
	const elementProps = Component$1 !== import_react.Fragment ? {
		...filteredProps,
		...visualProps,
		ref
	} : {};
	const { children } = props;
	const renderedChildren = (0, import_react.useMemo)(() => isMotionValue(children) ? children.get() : children, [children]);
	return (0, import_react.createElement)(Component$1, {
		...elementProps,
		children: renderedChildren
	});
}
function getValueState(visualElement) {
	const state = [{}, {}];
	visualElement?.values.forEach((value, key) => {
		state[0][key] = value.get();
		state[1][key] = value.getVelocity();
	});
	return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
	if (typeof definition === "function") {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
	}
	if (typeof definition === "string") definition = props.variants && props.variants[definition];
	if (typeof definition === "function") {
		const [current, velocity] = getValueState(visualElement);
		definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
	}
	return definition;
}
function resolveMotionValue(value) {
	return isMotionValue(value) ? value.get() : value;
}
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$2, createRenderState }, props, context, presenceContext) {
	return {
		latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps$2),
		renderState: createRenderState()
	};
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
	const values = {};
	const motionValues = scrapeMotionValues(props, {});
	for (const key in motionValues) values[key] = resolveMotionValue(motionValues[key]);
	let { initial, animate } = props;
	const isControllingVariants$1 = isControllingVariants(props);
	const isVariantNode$1 = isVariantNode(props);
	if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
		if (initial === void 0) initial = context.initial;
		if (animate === void 0) animate = context.animate;
	}
	let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
	isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
	const variantToSet = isInitialAnimationBlocked ? animate : initial;
	if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
		const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
		for (let i$1 = 0; i$1 < list.length; i$1++) {
			const resolved = resolveVariantFromProps(props, list[i$1]);
			if (resolved) {
				const { transitionEnd, transition, ...target } = resolved;
				for (const key in target) {
					let valueTarget = target[key];
					if (Array.isArray(valueTarget)) {
						const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
						valueTarget = valueTarget[index];
					}
					if (valueTarget !== null) values[key] = valueTarget;
				}
				for (const key in transitionEnd) values[key] = transitionEnd[key];
			}
		}
	}
	return values;
}
var makeUseVisualState = (config) => (props, isStatic) => {
	const context = (0, import_react.useContext)(MotionContext);
	const presenceContext = (0, import_react.useContext)(PresenceContext);
	const make = () => makeState(config, props, context, presenceContext);
	return isStatic ? make() : useConstant(make);
};
function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
	const { style } = props;
	const newValues = {};
	for (const key in style) if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) newValues[key] = style[key];
	return newValues;
}
var useHTMLVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
	createRenderState: createHtmlRenderState
});
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
	const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
	for (const key in props) if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
		const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
		newValues[targetKey] = props[key];
	}
	return newValues;
}
var useSVGVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps,
	createRenderState: createSvgRenderState
});
var motionComponentSymbol = Symbol.for("motionComponentSymbol");
function isRefObject(ref) {
	return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement, externalRef) {
	return (0, import_react.useCallback)((instance) => {
		if (instance) visualState.onMount && visualState.onMount(instance);
		if (visualElement) if (instance) visualElement.mount(instance);
		else visualElement.unmount();
		if (externalRef) {
			if (typeof externalRef === "function") externalRef(instance);
			else if (isRefObject(externalRef)) externalRef.current = instance;
		}
	}, [visualElement]);
}
var camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
var optimizedAppearDataAttribute = "data-" + camelToDash("framerAppearId");
var SwitchLayoutGroupContext = (0, import_react.createContext)({});
function useVisualElement(Component$1, visualState, props, createVisualElement, ProjectionNodeConstructor) {
	const { visualElement: parent } = (0, import_react.useContext)(MotionContext);
	const lazyContext = (0, import_react.useContext)(LazyContext);
	const presenceContext = (0, import_react.useContext)(PresenceContext);
	const reducedMotionConfig = (0, import_react.useContext)(MotionConfigContext).reducedMotion;
	const visualElementRef = (0, import_react.useRef)(null);
	createVisualElement = createVisualElement || lazyContext.renderer;
	if (!visualElementRef.current && createVisualElement) visualElementRef.current = createVisualElement(Component$1, {
		visualState,
		parent,
		props,
		presenceContext,
		blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
		reducedMotionConfig
	});
	const visualElement = visualElementRef.current;
	const initialLayoutGroupConfig = (0, import_react.useContext)(SwitchLayoutGroupContext);
	if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) createProjectionNode$1(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
	const isMounted = (0, import_react.useRef)(false);
	(0, import_react.useInsertionEffect)(() => {
		if (visualElement && isMounted.current) visualElement.update(props, presenceContext);
	});
	const optimisedAppearId = props[optimizedAppearDataAttribute];
	const wantsHandoff = (0, import_react.useRef)(Boolean(optimisedAppearId) && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
	useIsomorphicLayoutEffect(() => {
		if (!visualElement) return;
		isMounted.current = true;
		window.MotionIsMounted = true;
		visualElement.updateFeatures();
		visualElement.scheduleRenderMicrotask();
		if (wantsHandoff.current && visualElement.animationState) visualElement.animationState.animateChanges();
	});
	(0, import_react.useEffect)(() => {
		if (!visualElement) return;
		if (!wantsHandoff.current && visualElement.animationState) visualElement.animationState.animateChanges();
		if (wantsHandoff.current) {
			queueMicrotask(() => {
				window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
			});
			wantsHandoff.current = false;
		}
		visualElement.enteringChildren = void 0;
	});
	return visualElement;
}
function createProjectionNode$1(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
	const { layoutId, layout: layout$1, drag: drag$1, dragConstraints, layoutScroll, layoutRoot, layoutCrossfade } = props;
	visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
	visualElement.projection.setOptions({
		layoutId,
		layout: layout$1,
		alwaysMeasureLayout: Boolean(drag$1) || dragConstraints && isRefObject(dragConstraints),
		visualElement,
		animationType: typeof layout$1 === "string" ? layout$1 : "both",
		initialPromotionConfig,
		crossfade: layoutCrossfade,
		layoutScroll,
		layoutRoot
	});
}
function getClosestProjectingNode(visualElement) {
	if (!visualElement) return void 0;
	return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function createMotionComponent(Component$1, { forwardMotionProps = false } = {}, preloadedFeatures, createVisualElement) {
	preloadedFeatures && loadFeatures(preloadedFeatures);
	const useVisualState = isSVGComponent(Component$1) ? useSVGVisualState : useHTMLVisualState;
	function MotionDOMComponent(props, externalRef) {
		let MeasureLayout$1;
		const configAndProps = {
			...(0, import_react.useContext)(MotionConfigContext),
			...props,
			layoutId: useLayoutId(props)
		};
		const { isStatic } = configAndProps;
		const context = useCreateMotionContext(props);
		const visualState = useVisualState(props, isStatic);
		if (!isStatic && isBrowser) {
			useStrictMode(configAndProps, preloadedFeatures);
			const layoutProjection = getProjectionFunctionality(configAndProps);
			MeasureLayout$1 = layoutProjection.MeasureLayout;
			context.visualElement = useVisualElement(Component$1, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
		}
		return (0, import_jsx_runtime.jsxs)(MotionContext.Provider, {
			value: context,
			children: [MeasureLayout$1 && context.visualElement ? (0, import_jsx_runtime.jsx)(MeasureLayout$1, {
				visualElement: context.visualElement,
				...configAndProps
			}) : null, useRender(Component$1, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps)]
		});
	}
	MotionDOMComponent.displayName = `motion.${typeof Component$1 === "string" ? Component$1 : `create(${Component$1.displayName ?? Component$1.name ?? ""})`}`;
	const ForwardRefMotionComponent = (0, import_react.forwardRef)(MotionDOMComponent);
	ForwardRefMotionComponent[motionComponentSymbol] = Component$1;
	return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
	const layoutGroupId = (0, import_react.useContext)(LayoutGroupContext).id;
	return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
	(0, import_react.useContext)(LazyContext).strict;
}
function getProjectionFunctionality(props) {
	const { drag: drag$1, layout: layout$1 } = featureDefinitions;
	if (!drag$1 && !layout$1) return {};
	const combined = {
		...drag$1,
		...layout$1
	};
	return {
		MeasureLayout: drag$1?.isEnabled(props) || layout$1?.isEnabled(props) ? combined.MeasureLayout : void 0,
		ProjectionNode: combined.ProjectionNode
	};
}
function createMotionProxy(preloadedFeatures, createVisualElement) {
	if (typeof Proxy === "undefined") return createMotionComponent;
	const componentCache = /* @__PURE__ */ new Map();
	const factory = (Component$1, options) => {
		return createMotionComponent(Component$1, options, preloadedFeatures, createVisualElement);
	};
	const deprecatedFactoryFunction = (Component$1, options) => {
		return factory(Component$1, options);
	};
	return new Proxy(deprecatedFactoryFunction, { get: (_target, key) => {
		if (key === "create") return factory;
		if (!componentCache.has(key)) componentCache.set(key, createMotionComponent(key, void 0, preloadedFeatures, createVisualElement));
		return componentCache.get(key);
	} });
}
function convertBoundingBoxToBox({ top, left, right, bottom }) {
	return {
		x: {
			min: left,
			max: right
		},
		y: {
			min: top,
			max: bottom
		}
	};
}
function convertBoxToBoundingBox({ x, y }) {
	return {
		top: y.min,
		right: x.max,
		bottom: y.max,
		left: x.min
	};
}
function transformBoxPoints(point, transformPoint$1) {
	if (!transformPoint$1) return point;
	const topLeft = transformPoint$1({
		x: point.left,
		y: point.top
	});
	const bottomRight = transformPoint$1({
		x: point.right,
		y: point.bottom
	});
	return {
		top: topLeft.y,
		left: topLeft.x,
		bottom: bottomRight.y,
		right: bottomRight.x
	};
}
function isIdentityScale(scale$1) {
	return scale$1 === void 0 || scale$1 === 1;
}
function hasScale({ scale: scale$1, scaleX: scaleX$1, scaleY: scaleY$1 }) {
	return !isIdentityScale(scale$1) || !isIdentityScale(scaleX$1) || !isIdentityScale(scaleY$1);
}
function hasTransform(values) {
	return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
	return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
	return value && value !== "0%";
}
function scalePoint(point, scale$1, originPoint) {
	return originPoint + scale$1 * (point - originPoint);
}
function applyPointDelta(point, translate, scale$1, originPoint, boxScale) {
	if (boxScale !== void 0) point = scalePoint(point, boxScale, originPoint);
	return scalePoint(point, scale$1, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale$1 = 1, originPoint, boxScale) {
	axis.min = applyPointDelta(axis.min, translate, scale$1, originPoint, boxScale);
	axis.max = applyPointDelta(axis.max, translate, scale$1, originPoint, boxScale);
}
function applyBoxDelta(box$1, { x, y }) {
	applyAxisDelta(box$1.x, x.translate, x.scale, x.originPoint);
	applyAxisDelta(box$1.y, y.translate, y.scale, y.originPoint);
}
var TREE_SCALE_SNAP_MIN = .999999999999;
var TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box$1, treeScale, treePath, isSharedTransition = false) {
	const treeLength = treePath.length;
	if (!treeLength) return;
	treeScale.x = treeScale.y = 1;
	let node;
	let delta;
	for (let i$1 = 0; i$1 < treeLength; i$1++) {
		node = treePath[i$1];
		delta = node.projectionDelta;
		const { visualElement } = node.options;
		if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") continue;
		if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) transformBox(box$1, {
			x: -node.scroll.offset.x,
			y: -node.scroll.offset.y
		});
		if (delta) {
			treeScale.x *= delta.x.scale;
			treeScale.y *= delta.y.scale;
			applyBoxDelta(box$1, delta);
		}
		if (isSharedTransition && hasTransform(node.latestValues)) transformBox(box$1, node.latestValues);
	}
	if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) treeScale.x = 1;
	if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) treeScale.y = 1;
}
function translateAxis(axis, distance$1) {
	axis.min = axis.min + distance$1;
	axis.max = axis.max + distance$1;
}
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = .5) {
	applyAxisDelta(axis, axisTranslate, axisScale, mixNumber(axis.min, axis.max, axisOrigin), boxScale);
}
function transformBox(box$1, transform) {
	transformAxis(box$1.x, transform.x, transform.scaleX, transform.scale, transform.originX);
	transformAxis(box$1.y, transform.y, transform.scaleY, transform.scale, transform.originY);
}
function measureViewportBox(instance, transformPoint$1) {
	return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint$1));
}
function measurePageBox(element, rootProjectionNode$1, transformPagePoint) {
	const viewportBox = measureViewportBox(element, transformPagePoint);
	const { scroll } = rootProjectionNode$1;
	if (scroll) {
		translateAxis(viewportBox.x, scroll.offset.x);
		translateAxis(viewportBox.y, scroll.offset.y);
	}
	return viewportBox;
}
var createAxisDelta = () => ({
	translate: 0,
	scale: 1,
	origin: 0,
	originPoint: 0
});
var createDelta = () => ({
	x: createAxisDelta(),
	y: createAxisDelta()
});
var createAxis = () => ({
	min: 0,
	max: 0
});
var createBox = () => ({
	x: createAxis(),
	y: createAxis()
});
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };
function initPrefersReducedMotion() {
	hasReducedMotionListener.current = true;
	if (!isBrowser) return;
	if (window.matchMedia) {
		const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
		const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
		motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
		setReducedMotionPreferences();
	} else prefersReducedMotion.current = false;
}
var visualElementStore = /* @__PURE__ */ new WeakMap();
function updateMotionValuesFromProps(element, next, prev) {
	for (const key in next) {
		const nextValue = next[key];
		const prevValue = prev[key];
		if (isMotionValue(nextValue)) element.addValue(key, nextValue);
		else if (isMotionValue(prevValue)) element.addValue(key, motionValue(nextValue, { owner: element }));
		else if (prevValue !== nextValue) if (element.hasValue(key)) {
			const existingValue = element.getValue(key);
			if (existingValue.liveStyle === true) existingValue.jump(nextValue);
			else if (!existingValue.hasAnimated) existingValue.set(nextValue);
		} else {
			const latestValue = element.getStaticValue(key);
			element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
		}
	}
	for (const key in prev) if (next[key] === void 0) element.removeValue(key);
	return next;
}
var propEventHandlers = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
];
var VisualElement = class {
	scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
		return {};
	}
	constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}) {
		this.current = null;
		this.children = /* @__PURE__ */ new Set();
		this.isVariantNode = false;
		this.isControllingVariants = false;
		this.shouldReduceMotion = null;
		this.values = /* @__PURE__ */ new Map();
		this.KeyframeResolver = KeyframeResolver;
		this.features = {};
		this.valueSubscriptions = /* @__PURE__ */ new Map();
		this.prevMotionValues = {};
		this.events = {};
		this.propEventSubscriptions = {};
		this.notifyUpdate = () => this.notify("Update", this.latestValues);
		this.render = () => {
			if (!this.current) return;
			this.triggerBuild();
			this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
		};
		this.renderScheduledAt = 0;
		this.scheduleRender = () => {
			const now$1 = time.now();
			if (this.renderScheduledAt < now$1) {
				this.renderScheduledAt = now$1;
				frame.render(this.render, false, true);
			}
		};
		const { latestValues, renderState } = visualState;
		this.latestValues = latestValues;
		this.baseTarget = { ...latestValues };
		this.initialValues = props.initial ? { ...latestValues } : {};
		this.renderState = renderState;
		this.parent = parent;
		this.props = props;
		this.presenceContext = presenceContext;
		this.depth = parent ? parent.depth + 1 : 0;
		this.reducedMotionConfig = reducedMotionConfig;
		this.options = options;
		this.blockInitialAnimation = Boolean(blockInitialAnimation);
		this.isControllingVariants = isControllingVariants(props);
		this.isVariantNode = isVariantNode(props);
		if (this.isVariantNode) this.variantChildren = /* @__PURE__ */ new Set();
		this.manuallyAnimateOnMount = Boolean(parent && parent.current);
		const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
		for (const key in initialMotionValues) {
			const value = initialMotionValues[key];
			if (latestValues[key] !== void 0 && isMotionValue(value)) value.set(latestValues[key]);
		}
	}
	mount(instance) {
		this.current = instance;
		visualElementStore.set(instance, this);
		if (this.projection && !this.projection.instance) this.projection.mount(instance);
		if (this.parent && this.isVariantNode && !this.isControllingVariants) this.removeFromVariantTree = this.parent.addVariantChild(this);
		this.values.forEach((value, key) => this.bindToMotionValue(key, value));
		if (!hasReducedMotionListener.current) initPrefersReducedMotion();
		this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
		this.parent?.addChild(this);
		this.update(this.props, this.presenceContext);
	}
	unmount() {
		this.projection && this.projection.unmount();
		cancelFrame(this.notifyUpdate);
		cancelFrame(this.render);
		this.valueSubscriptions.forEach((remove) => remove());
		this.valueSubscriptions.clear();
		this.removeFromVariantTree && this.removeFromVariantTree();
		this.parent?.removeChild(this);
		for (const key in this.events) this.events[key].clear();
		for (const key in this.features) {
			const feature = this.features[key];
			if (feature) {
				feature.unmount();
				feature.isMounted = false;
			}
		}
		this.current = null;
	}
	addChild(child) {
		this.children.add(child);
		this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set());
		this.enteringChildren.add(child);
	}
	removeChild(child) {
		this.children.delete(child);
		this.enteringChildren && this.enteringChildren.delete(child);
	}
	bindToMotionValue(key, value) {
		if (this.valueSubscriptions.has(key)) this.valueSubscriptions.get(key)();
		const valueIsTransform = transformProps.has(key);
		if (valueIsTransform && this.onBindTransform) this.onBindTransform();
		const removeOnChange = value.on("change", (latestValue) => {
			this.latestValues[key] = latestValue;
			this.props.onUpdate && frame.preRender(this.notifyUpdate);
			if (valueIsTransform && this.projection) this.projection.isTransformDirty = true;
			this.scheduleRender();
		});
		let removeSyncCheck;
		if (window.MotionCheckAppearSync) removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
		this.valueSubscriptions.set(key, () => {
			removeOnChange();
			if (removeSyncCheck) removeSyncCheck();
			if (value.owner) value.stop();
		});
	}
	sortNodePosition(other) {
		if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) return 0;
		return this.sortInstanceNodePosition(this.current, other.current);
	}
	updateFeatures() {
		let key = "animation";
		for (key in featureDefinitions) {
			const featureDefinition = featureDefinitions[key];
			if (!featureDefinition) continue;
			const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
			if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) this.features[key] = new FeatureConstructor(this);
			if (this.features[key]) {
				const feature = this.features[key];
				if (feature.isMounted) feature.update();
				else {
					feature.mount();
					feature.isMounted = true;
				}
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
	}
	getStaticValue(key) {
		return this.latestValues[key];
	}
	setStaticValue(key, value) {
		this.latestValues[key] = value;
	}
	update(props, presenceContext) {
		if (props.transformTemplate || this.props.transformTemplate) this.scheduleRender();
		this.prevProps = this.props;
		this.props = props;
		this.prevPresenceContext = this.presenceContext;
		this.presenceContext = presenceContext;
		for (let i$1 = 0; i$1 < propEventHandlers.length; i$1++) {
			const key = propEventHandlers[i$1];
			if (this.propEventSubscriptions[key]) {
				this.propEventSubscriptions[key]();
				delete this.propEventSubscriptions[key];
			}
			const listener = props["on" + key];
			if (listener) this.propEventSubscriptions[key] = this.on(key, listener);
		}
		this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
		if (this.handleChildMotionValue) this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(name) {
		return this.props.variants ? this.props.variants[name] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	addVariantChild(child) {
		const closestVariantNode = this.getClosestVariantNode();
		if (closestVariantNode) {
			closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
			return () => closestVariantNode.variantChildren.delete(child);
		}
	}
	addValue(key, value) {
		const existingValue = this.values.get(key);
		if (value !== existingValue) {
			if (existingValue) this.removeValue(key);
			this.bindToMotionValue(key, value);
			this.values.set(key, value);
			this.latestValues[key] = value.get();
		}
	}
	removeValue(key) {
		this.values.delete(key);
		const unsubscribe = this.valueSubscriptions.get(key);
		if (unsubscribe) {
			unsubscribe();
			this.valueSubscriptions.delete(key);
		}
		delete this.latestValues[key];
		this.removeValueFromRenderState(key, this.renderState);
	}
	hasValue(key) {
		return this.values.has(key);
	}
	getValue(key, defaultValue) {
		if (this.props.values && this.props.values[key]) return this.props.values[key];
		let value = this.values.get(key);
		if (value === void 0 && defaultValue !== void 0) {
			value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
			this.addValue(key, value);
		}
		return value;
	}
	readValue(key, target) {
		let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
		if (value !== void 0 && value !== null) {
			if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) value = parseFloat(value);
			else if (!findValueType(value) && complex.test(target)) value = getAnimatableNone(key, target);
			this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
		}
		return isMotionValue(value) ? value.get() : value;
	}
	setBaseTarget(key, value) {
		this.baseTarget[key] = value;
	}
	getBaseTarget(key) {
		const { initial } = this.props;
		let valueFromInitial;
		if (typeof initial === "string" || typeof initial === "object") {
			const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
			if (variant) valueFromInitial = variant[key];
		}
		if (initial && valueFromInitial !== void 0) return valueFromInitial;
		const target = this.getBaseTargetFromProps(this.props, key);
		if (target !== void 0 && !isMotionValue(target)) return target;
		return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
	}
	on(eventName, callback) {
		if (!this.events[eventName]) this.events[eventName] = new SubscriptionManager();
		return this.events[eventName].add(callback);
	}
	notify(eventName, ...args) {
		if (this.events[eventName]) this.events[eventName].notify(...args);
	}
	scheduleRenderMicrotask() {
		microtask.render(this.render);
	}
};
var DOMVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments);
		this.KeyframeResolver = DOMKeyframesResolver;
	}
	sortInstanceNodePosition(a$1, b) {
		return a$1.compareDocumentPosition(b) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(props, key) {
		return props.style ? props.style[key] : void 0;
	}
	removeValueFromRenderState(key, { vars, style }) {
		delete vars[key];
		delete style[key];
	}
	handleChildMotionValue() {
		if (this.childSubscription) {
			this.childSubscription();
			delete this.childSubscription;
		}
		const { children } = this.props;
		if (isMotionValue(children)) this.childSubscription = children.on("change", (latest) => {
			if (this.current) this.current.textContent = `${latest}`;
		});
	}
};
function renderHTML(element, { style, vars }, styleProp, projection) {
	const elementStyle = element.style;
	let key;
	for (key in style) elementStyle[key] = style[key];
	projection?.applyProjectionStyles(elementStyle, styleProp);
	for (key in vars) elementStyle.setProperty(key, vars[key]);
}
function getComputedStyle$1(element) {
	return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments);
		this.type = "html";
		this.renderInstance = renderHTML;
	}
	readValueFromInstance(instance, key) {
		if (transformProps.has(key)) return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
		else {
			const computedStyle = getComputedStyle$1(instance);
			const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
			return typeof value === "string" ? value.trim() : value;
		}
	}
	measureInstanceViewportBox(instance, { transformPagePoint }) {
		return measureViewportBox(instance, transformPagePoint);
	}
	build(renderState, latestValues, props) {
		buildHTMLStyles(renderState, latestValues, props.transformTemplate);
	}
	scrapeMotionValuesFromProps(props, prevProps, visualElement) {
		return scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
	}
};
var camelCaseAttributes = new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]);
function renderSVG(element, renderState, _styleProp, projection) {
	renderHTML(element, renderState, void 0, projection);
	for (const key in renderState.attrs) element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
}
var SVGVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments);
		this.type = "svg";
		this.isSVGTag = false;
		this.measureInstanceViewportBox = createBox;
	}
	getBaseTargetFromProps(props, key) {
		return props[key];
	}
	readValueFromInstance(instance, key) {
		if (transformProps.has(key)) {
			const defaultType = getDefaultValueType(key);
			return defaultType ? defaultType.default || 0 : 0;
		}
		key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
		return instance.getAttribute(key);
	}
	scrapeMotionValuesFromProps(props, prevProps, visualElement) {
		return scrapeMotionValuesFromProps(props, prevProps, visualElement);
	}
	build(renderState, latestValues, props) {
		buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
	}
	renderInstance(instance, renderState, styleProp, projection) {
		renderSVG(instance, renderState, styleProp, projection);
	}
	mount(instance) {
		this.isSVGTag = isSVGTag(instance.tagName);
		super.mount(instance);
	}
};
var createDomVisualElement = (Component$1, options) => {
	return isSVGComponent(Component$1) ? new SVGVisualElement(options) : new HTMLVisualElement(options, { allowProjection: Component$1 !== import_react.Fragment });
};
function resolveVariant(visualElement, definition, custom) {
	const props = visualElement.getProps();
	return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}
var isKeyframesTarget = (v) => {
	return Array.isArray(v);
};
function setMotionValue(visualElement, key, value) {
	if (visualElement.hasValue(key)) visualElement.getValue(key).set(value);
	else visualElement.addValue(key, motionValue(value));
}
function resolveFinalValueInKeyframes(v) {
	return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
	let { transitionEnd = {}, transition = {}, ...target } = resolveVariant(visualElement, definition) || {};
	target = {
		...target,
		...transitionEnd
	};
	for (const key in target) setMotionValue(visualElement, key, resolveFinalValueInKeyframes(target[key]));
}
function isWillChangeMotionValue(value) {
	return Boolean(isMotionValue(value) && value.add);
}
function addValueToWillChange(visualElement, key) {
	const willChange = visualElement.getValue("willChange");
	if (isWillChangeMotionValue(willChange)) return willChange.add(key);
	else if (!willChange && MotionGlobalConfig.WillChange) {
		const newWillChange = new MotionGlobalConfig.WillChange("auto");
		visualElement.addValue("willChange", newWillChange);
		newWillChange.add(key);
	}
}
function getOptimisedAppearId(visualElement) {
	return visualElement.props[optimizedAppearDataAttribute];
}
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes$1, { repeat, repeatType = "loop" }, finalKeyframe) {
	const resolvedKeyframes = keyframes$1.filter(isNotNull);
	const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
	return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}
var underDampedSpring = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
	type: "spring",
	stiffness: 550,
	damping: target === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
});
var keyframesTransition = {
	type: "keyframes",
	duration: .8
};
var ease = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes$1 }) => {
	if (keyframes$1.length > 2) return keyframesTransition;
	else if (transformProps.has(valueKey)) return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes$1[1]) : underDampedSpring;
	return ease;
};
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
	return !!Object.keys(transition).length;
}
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
	const valueTransition = getValueTransition(transition, name) || {};
	const delay$1 = valueTransition.delay || transition.delay || 0;
	let { elapsed = 0 } = transition;
	elapsed = elapsed - /* @__PURE__ */ secondsToMilliseconds(delay$1);
	const options = {
		keyframes: Array.isArray(target) ? target : [null, target],
		ease: "easeOut",
		velocity: value.getVelocity(),
		...valueTransition,
		delay: -elapsed,
		onUpdate: (v) => {
			value.set(v);
			valueTransition.onUpdate && valueTransition.onUpdate(v);
		},
		onComplete: () => {
			onComplete();
			valueTransition.onComplete && valueTransition.onComplete();
		},
		name,
		motionValue: value,
		element: isHandoff ? void 0 : element
	};
	if (!isTransitionDefined(valueTransition)) Object.assign(options, getDefaultTransition(name, options));
	options.duration && (options.duration = /* @__PURE__ */ secondsToMilliseconds(options.duration));
	options.repeatDelay && (options.repeatDelay = /* @__PURE__ */ secondsToMilliseconds(options.repeatDelay));
	if (options.from !== void 0) options.keyframes[0] = options.from;
	let shouldSkip = false;
	if (options.type === false || options.duration === 0 && !options.repeatDelay) {
		makeAnimationInstant(options);
		if (options.delay === 0) shouldSkip = true;
	}
	if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations) {
		shouldSkip = true;
		makeAnimationInstant(options);
		options.delay = 0;
	}
	options.allowFlatten = !valueTransition.type && !valueTransition.ease;
	if (shouldSkip && !isHandoff && value.get() !== void 0) {
		const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
		if (finalKeyframe !== void 0) {
			frame.update(() => {
				options.onUpdate(finalKeyframe);
				options.onComplete();
			});
			return;
		}
	}
	return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
};
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
	const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
	needsAnimating[key] = false;
	return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay: delay$1 = 0, transitionOverride, type } = {}) {
	let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
	if (transitionOverride) transition = transitionOverride;
	const animations$1 = [];
	const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
	for (const key in target) {
		const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
		const valueTarget = target[key];
		if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) continue;
		const valueTransition = {
			delay: delay$1,
			...getValueTransition(transition || {}, key)
		};
		const currentValue = value.get();
		if (currentValue !== void 0 && !value.isAnimating && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) continue;
		let isHandoff = false;
		if (window.MotionHandoffAnimation) {
			const appearId = getOptimisedAppearId(visualElement);
			if (appearId) {
				const startTime = window.MotionHandoffAnimation(appearId, key, frame);
				if (startTime !== null) {
					valueTransition.startTime = startTime;
					isHandoff = true;
				}
			}
		}
		addValueToWillChange(visualElement, key);
		value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
		const animation = value.animation;
		if (animation) animations$1.push(animation);
	}
	if (transitionEnd) Promise.all(animations$1).then(() => {
		frame.update(() => {
			transitionEnd && setTarget(visualElement, transitionEnd);
		});
	});
	return animations$1;
}
function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
	const index = Array.from(children).sort((a$1, b) => a$1.sortNodePosition(b)).indexOf(child);
	const numChildren = children.size;
	const maxStaggerDuration = (numChildren - 1) * staggerChildren;
	return typeof delayChildren === "function" ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
}
function animateVariant(visualElement, variant, options = {}) {
	const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : void 0);
	let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
	if (options.transitionOverride) transition = options.transitionOverride;
	const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
	const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
		const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
		return animateChildren(visualElement, variant, forwardDelay, delayChildren, staggerChildren, staggerDirection, options);
	} : () => Promise.resolve();
	const { when } = transition;
	if (when) {
		const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
		return first().then(() => last());
	} else return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
}
function animateChildren(visualElement, variant, delay$1 = 0, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
	const animations$1 = [];
	for (const child of visualElement.variantChildren) {
		child.notify("AnimationStart", variant);
		animations$1.push(animateVariant(child, variant, {
			...options,
			delay: delay$1 + (typeof delayChildren === "function" ? 0 : delayChildren) + calcChildStagger(visualElement.variantChildren, child, delayChildren, staggerChildren, staggerDirection)
		}).then(() => child.notify("AnimationComplete", variant)));
	}
	return Promise.all(animations$1);
}
function animateVisualElement(visualElement, definition, options = {}) {
	visualElement.notify("AnimationStart", definition);
	let animation;
	if (Array.isArray(definition)) {
		const animations$1 = definition.map((variant) => animateVariant(visualElement, variant, options));
		animation = Promise.all(animations$1);
	} else if (typeof definition === "string") animation = animateVariant(visualElement, definition, options);
	else {
		const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
		animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
	}
	return animation.then(() => {
		visualElement.notify("AnimationComplete", definition);
	});
}
function shallowCompare(next, prev) {
	if (!Array.isArray(prev)) return false;
	const prevLength = prev.length;
	if (prevLength !== next.length) return false;
	for (let i$1 = 0; i$1 < prevLength; i$1++) if (prev[i$1] !== next[i$1]) return false;
	return true;
}
var numVariantProps = variantProps.length;
function getVariantContext(visualElement) {
	if (!visualElement) return void 0;
	if (!visualElement.isControllingVariants) {
		const context$1 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
		if (visualElement.props.initial !== void 0) context$1.initial = visualElement.props.initial;
		return context$1;
	}
	const context = {};
	for (let i$1 = 0; i$1 < numVariantProps; i$1++) {
		const name = variantProps[i$1];
		const prop = visualElement.props[name];
		if (isVariantLabel(prop) || prop === false) context[name] = prop;
	}
	return context;
}
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
	return (animations$1) => Promise.all(animations$1.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
	let animate = animateList(visualElement);
	let state = createState();
	let isInitialRender = true;
	const buildResolvedTypeValues = (type) => (acc, definition) => {
		const resolved = resolveVariant(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : void 0);
		if (resolved) {
			const { transition, transitionEnd, ...target } = resolved;
			acc = {
				...acc,
				...target,
				...transitionEnd
			};
		}
		return acc;
	};
	function setAnimateFunction(makeAnimator) {
		animate = makeAnimator(visualElement);
	}
	function animateChanges(changedActiveType) {
		const { props } = visualElement;
		const context = getVariantContext(visualElement.parent) || {};
		const animations$1 = [];
		const removedKeys = /* @__PURE__ */ new Set();
		let encounteredKeys = {};
		let removedVariantIndex = Infinity;
		for (let i$1 = 0; i$1 < numAnimationTypes; i$1++) {
			const type = reversePriorityOrder[i$1];
			const typeState = state[type];
			const prop = props[type] !== void 0 ? props[type] : context[type];
			const propIsVariant = isVariantLabel(prop);
			const activeDelta = type === changedActiveType ? typeState.isActive : null;
			if (activeDelta === false) removedVariantIndex = i$1;
			let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
			if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) isInherited = false;
			typeState.protectedKeys = { ...encounteredKeys };
			if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") continue;
			const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
			let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i$1 > removedVariantIndex && propIsVariant;
			let handledRemovedValues = false;
			const definitionList = Array.isArray(prop) ? prop : [prop];
			let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
			if (activeDelta === false) resolvedValues = {};
			const { prevResolvedValues = {} } = typeState;
			const allKeys = {
				...prevResolvedValues,
				...resolvedValues
			};
			const markToAnimate = (key) => {
				shouldAnimateType = true;
				if (removedKeys.has(key)) {
					handledRemovedValues = true;
					removedKeys.delete(key);
				}
				typeState.needsAnimating[key] = true;
				const motionValue$1 = visualElement.getValue(key);
				if (motionValue$1) motionValue$1.liveStyle = false;
			};
			for (const key in allKeys) {
				const next = resolvedValues[key];
				const prev = prevResolvedValues[key];
				if (encounteredKeys.hasOwnProperty(key)) continue;
				let valueHasChanged = false;
				if (isKeyframesTarget(next) && isKeyframesTarget(prev)) valueHasChanged = !shallowCompare(next, prev);
				else valueHasChanged = next !== prev;
				if (valueHasChanged) if (next !== void 0 && next !== null) markToAnimate(key);
				else removedKeys.add(key);
				else if (next !== void 0 && removedKeys.has(key)) markToAnimate(key);
				else typeState.protectedKeys[key] = true;
			}
			typeState.prevProp = prop;
			typeState.prevResolvedValues = resolvedValues;
			if (typeState.isActive) encounteredKeys = {
				...encounteredKeys,
				...resolvedValues
			};
			if (isInitialRender && visualElement.blockInitialAnimation) shouldAnimateType = false;
			const willAnimateViaParent = isInherited && variantDidChange;
			if (shouldAnimateType && (!willAnimateViaParent || handledRemovedValues)) animations$1.push(...definitionList.map((animation) => {
				const options = { type };
				if (typeof animation === "string" && isInitialRender && !willAnimateViaParent && visualElement.manuallyAnimateOnMount && visualElement.parent) {
					const { parent } = visualElement;
					const parentVariant = resolveVariant(parent, animation);
					if (parent.enteringChildren && parentVariant) {
						const { delayChildren } = parentVariant.transition || {};
						options.delay = calcChildStagger(parent.enteringChildren, visualElement, delayChildren);
					}
				}
				return {
					animation,
					options
				};
			}));
		}
		if (removedKeys.size) {
			const fallbackAnimation = {};
			if (typeof props.initial !== "boolean") {
				const initialTransition = resolveVariant(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
				if (initialTransition && initialTransition.transition) fallbackAnimation.transition = initialTransition.transition;
			}
			removedKeys.forEach((key) => {
				const fallbackTarget = visualElement.getBaseTarget(key);
				const motionValue$1 = visualElement.getValue(key);
				if (motionValue$1) motionValue$1.liveStyle = true;
				fallbackAnimation[key] = fallbackTarget ?? null;
			});
			animations$1.push({ animation: fallbackAnimation });
		}
		let shouldAnimate = Boolean(animations$1.length);
		if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) shouldAnimate = false;
		isInitialRender = false;
		return shouldAnimate ? animate(animations$1) : Promise.resolve();
	}
	function setActive(type, isActive) {
		if (state[type].isActive === isActive) return Promise.resolve();
		visualElement.variantChildren?.forEach((child) => child.animationState?.setActive(type, isActive));
		state[type].isActive = isActive;
		const animations$1 = animateChanges(type);
		for (const key in state) state[key].protectedKeys = {};
		return animations$1;
	}
	return {
		animateChanges,
		setActive,
		setAnimateFunction,
		getState: () => state,
		reset: () => {
			state = createState();
		}
	};
}
function checkVariantsDidChange(prev, next) {
	if (typeof next === "string") return next !== prev;
	else if (Array.isArray(next)) return !shallowCompare(next, prev);
	return false;
}
function createTypeState(isActive = false) {
	return {
		isActive,
		protectedKeys: {},
		needsAnimating: {},
		prevResolvedValues: {}
	};
}
function createState() {
	return {
		animate: createTypeState(true),
		whileInView: createTypeState(),
		whileHover: createTypeState(),
		whileTap: createTypeState(),
		whileDrag: createTypeState(),
		whileFocus: createTypeState(),
		exit: createTypeState()
	};
}
var Feature = class {
	constructor(node) {
		this.isMounted = false;
		this.node = node;
	}
	update() {}
};
var AnimationFeature = class extends Feature {
	constructor(node) {
		super(node);
		node.animationState || (node.animationState = createAnimationState(node));
	}
	updateAnimationControlsSubscription() {
		const { animate } = this.node.getProps();
		if (isAnimationControls(animate)) this.unmountControls = animate.subscribe(this.node);
	}
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		const { animate } = this.node.getProps();
		const { animate: prevAnimate } = this.node.prevProps || {};
		if (animate !== prevAnimate) this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.node.animationState.reset();
		this.unmountControls?.();
	}
};
var id$1 = 0;
var ExitAnimationFeature = class extends Feature {
	constructor() {
		super(...arguments);
		this.id = id$1++;
	}
	update() {
		if (!this.node.presenceContext) return;
		const { isPresent, onExitComplete } = this.node.presenceContext;
		const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
		if (!this.node.animationState || isPresent === prevIsPresent) return;
		const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
		if (onExitComplete && !isPresent) exitAnimation.then(() => {
			onExitComplete(this.id);
		});
	}
	mount() {
		const { register, onExitComplete } = this.node.presenceContext || {};
		if (onExitComplete) onExitComplete(this.id);
		if (register) this.unmount = register(this.id);
	}
	unmount() {}
};
var animations = {
	animation: { Feature: AnimationFeature },
	exit: { Feature: ExitAnimationFeature }
};
function addDomEvent(target, eventName, handler, options = { passive: true }) {
	target.addEventListener(eventName, handler, options);
	return () => target.removeEventListener(eventName, handler);
}
function extractEventInfo(event) {
	return { point: {
		x: event.pageX,
		y: event.pageY
	} };
}
var addPointerInfo = (handler) => {
	return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};
function addPointerEvent(target, eventName, handler, options) {
	return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
var SCALE_PRECISION = 1e-4;
var SCALE_MIN = 1 - SCALE_PRECISION;
var SCALE_MAX = 1 + SCALE_PRECISION;
var TRANSLATE_PRECISION = .01;
var TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
var TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
	return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
	return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = .5) {
	delta.origin = origin;
	delta.originPoint = mixNumber(source.min, source.max, delta.origin);
	delta.scale = calcLength(target) / calcLength(source);
	delta.translate = mixNumber(target.min, target.max, delta.origin) - delta.originPoint;
	if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) delta.scale = 1;
	if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
	calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
	calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
	target.min = parent.min + relative.min;
	target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
	calcRelativeAxis(target.x, relative.x, parent.x);
	calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout$1, parent) {
	target.min = layout$1.min - parent.min;
	target.max = target.min + calcLength(layout$1);
}
function calcRelativePosition(target, layout$1, parent) {
	calcRelativeAxisPosition(target.x, layout$1.x, parent.x);
	calcRelativeAxisPosition(target.y, layout$1.y, parent.y);
}
function eachAxis(callback) {
	return [callback("x"), callback("y")];
}
var getContextWindow = ({ current }) => {
	return current ? current.ownerDocument.defaultView : null;
};
var distance = (a$1, b) => Math.abs(a$1 - b);
function distance2D(a$1, b) {
	const xDelta = distance(a$1.x, b.x);
	const yDelta = distance(a$1.y, b.y);
	return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
var PanSession = class {
	constructor(event, handlers, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3 } = {}) {
		this.startEvent = null;
		this.lastMoveEvent = null;
		this.lastMoveEventInfo = null;
		this.handlers = {};
		this.contextWindow = window;
		this.updatePoint = () => {
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			const info = getPanInfo(this.lastMoveEventInfo, this.history);
			const isPanStarted = this.startEvent !== null;
			const isDistancePastThreshold = distance2D(info.offset, {
				x: 0,
				y: 0
			}) >= this.distanceThreshold;
			if (!isPanStarted && !isDistancePastThreshold) return;
			const { point: point$1 } = info;
			const { timestamp: timestamp$1 } = frameData;
			this.history.push({
				...point$1,
				timestamp: timestamp$1
			});
			const { onStart, onMove } = this.handlers;
			if (!isPanStarted) {
				onStart && onStart(this.lastMoveEvent, info);
				this.startEvent = this.lastMoveEvent;
			}
			onMove && onMove(this.lastMoveEvent, info);
		};
		this.handlePointerMove = (event$1, info) => {
			this.lastMoveEvent = event$1;
			this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
			frame.update(this.updatePoint, true);
		};
		this.handlePointerUp = (event$1, info) => {
			this.end();
			const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
			if (this.dragSnapToOrigin) resumeAnimation && resumeAnimation();
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			const panInfo = getPanInfo(event$1.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info, this.transformPagePoint), this.history);
			if (this.startEvent && onEnd) onEnd(event$1, panInfo);
			onSessionEnd && onSessionEnd(event$1, panInfo);
		};
		if (!isPrimaryPointer(event)) return;
		this.dragSnapToOrigin = dragSnapToOrigin;
		this.handlers = handlers;
		this.transformPagePoint = transformPagePoint;
		this.distanceThreshold = distanceThreshold;
		this.contextWindow = contextWindow || window;
		const initialInfo = transformPoint(extractEventInfo(event), this.transformPagePoint);
		const { point } = initialInfo;
		const { timestamp } = frameData;
		this.history = [{
			...point,
			timestamp
		}];
		const { onSessionStart } = handlers;
		onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
		this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
	}
	updateHandlers(handlers) {
		this.handlers = handlers;
	}
	end() {
		this.removeListeners && this.removeListeners();
		cancelFrame(this.updatePoint);
	}
};
function transformPoint(info, transformPagePoint) {
	return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a$1, b) {
	return {
		x: a$1.x - b.x,
		y: a$1.y - b.y
	};
}
function getPanInfo({ point }, history) {
	return {
		point,
		delta: subtractPoint(point, lastDevicePoint(history)),
		offset: subtractPoint(point, startDevicePoint(history)),
		velocity: getVelocity(history, .1)
	};
}
function startDevicePoint(history) {
	return history[0];
}
function lastDevicePoint(history) {
	return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
	if (history.length < 2) return {
		x: 0,
		y: 0
	};
	let i$1 = history.length - 1;
	let timestampedPoint = null;
	const lastPoint = lastDevicePoint(history);
	while (i$1 >= 0) {
		timestampedPoint = history[i$1];
		if (lastPoint.timestamp - timestampedPoint.timestamp > /* @__PURE__ */ secondsToMilliseconds(timeDelta)) break;
		i$1--;
	}
	if (!timestampedPoint) return {
		x: 0,
		y: 0
	};
	const time$1 = /* @__PURE__ */ millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
	if (time$1 === 0) return {
		x: 0,
		y: 0
	};
	const currentVelocity = {
		x: (lastPoint.x - timestampedPoint.x) / time$1,
		y: (lastPoint.y - timestampedPoint.y) / time$1
	};
	if (currentVelocity.x === Infinity) currentVelocity.x = 0;
	if (currentVelocity.y === Infinity) currentVelocity.y = 0;
	return currentVelocity;
}
function applyConstraints(point, { min, max }, elastic) {
	if (min !== void 0 && point < min) point = elastic ? mixNumber(min, point, elastic.min) : Math.max(point, min);
	else if (max !== void 0 && point > max) point = elastic ? mixNumber(max, point, elastic.max) : Math.min(point, max);
	return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
	return {
		min: min !== void 0 ? axis.min + min : void 0,
		max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
	};
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
	return {
		x: calcRelativeAxisConstraints(layoutBox.x, left, right),
		y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
	};
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
	let min = constraintsAxis.min - layoutAxis.min;
	let max = constraintsAxis.max - layoutAxis.max;
	if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) [min, max] = [max, min];
	return {
		min,
		max
	};
}
function calcViewportConstraints(layoutBox, constraintsBox) {
	return {
		x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
		y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
	};
}
function calcOrigin(source, target) {
	let origin = .5;
	const sourceLength = calcLength(source);
	const targetLength = calcLength(target);
	if (targetLength > sourceLength) origin = /* @__PURE__ */ progress(target.min, target.max - sourceLength, source.min);
	else if (sourceLength > targetLength) origin = /* @__PURE__ */ progress(source.min, source.max - targetLength, target.min);
	return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout$1, constraints) {
	const relativeConstraints = {};
	if (constraints.min !== void 0) relativeConstraints.min = constraints.min - layout$1.min;
	if (constraints.max !== void 0) relativeConstraints.max = constraints.max - layout$1.min;
	return relativeConstraints;
}
var defaultElastic = .35;
function resolveDragElastic(dragElastic = defaultElastic) {
	if (dragElastic === false) dragElastic = 0;
	else if (dragElastic === true) dragElastic = defaultElastic;
	return {
		x: resolveAxisElastic(dragElastic, "left", "right"),
		y: resolveAxisElastic(dragElastic, "top", "bottom")
	};
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
	return {
		min: resolvePointElastic(dragElastic, minLabel),
		max: resolvePointElastic(dragElastic, maxLabel)
	};
}
function resolvePointElastic(dragElastic, label) {
	return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
	constructor(visualElement) {
		this.openDragLock = null;
		this.isDragging = false;
		this.currentDirection = null;
		this.originPoint = {
			x: 0,
			y: 0
		};
		this.constraints = false;
		this.hasMutatedConstraints = false;
		this.elastic = createBox();
		this.latestPointerEvent = null;
		this.latestPanInfo = null;
		this.visualElement = visualElement;
	}
	start(originEvent, { snapToCursor = false, distanceThreshold } = {}) {
		const { presenceContext } = this.visualElement;
		if (presenceContext && presenceContext.isPresent === false) return;
		const onSessionStart = (event) => {
			const { dragSnapToOrigin: dragSnapToOrigin$1 } = this.getProps();
			dragSnapToOrigin$1 ? this.pauseAnimation() : this.stopAnimation();
			if (snapToCursor) this.snapToCursor(extractEventInfo(event).point);
		};
		const onStart = (event, info) => {
			const { drag: drag$1, dragPropagation, onDragStart } = this.getProps();
			if (drag$1 && !dragPropagation) {
				if (this.openDragLock) this.openDragLock();
				this.openDragLock = setDragLock(drag$1);
				if (!this.openDragLock) return;
			}
			this.latestPointerEvent = event;
			this.latestPanInfo = info;
			this.isDragging = true;
			this.currentDirection = null;
			this.resolveConstraints();
			if (this.visualElement.projection) {
				this.visualElement.projection.isAnimationBlocked = true;
				this.visualElement.projection.target = void 0;
			}
			eachAxis((axis) => {
				let current = this.getAxisMotionValue(axis).get() || 0;
				if (percent.test(current)) {
					const { projection } = this.visualElement;
					if (projection && projection.layout) {
						const measuredAxis = projection.layout.layoutBox[axis];
						if (measuredAxis) current = calcLength(measuredAxis) * (parseFloat(current) / 100);
					}
				}
				this.originPoint[axis] = current;
			});
			if (onDragStart) frame.postRender(() => onDragStart(event, info));
			addValueToWillChange(this.visualElement, "transform");
			const { animationState } = this.visualElement;
			animationState && animationState.setActive("whileDrag", true);
		};
		const onMove = (event, info) => {
			this.latestPointerEvent = event;
			this.latestPanInfo = info;
			const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
			if (!dragPropagation && !this.openDragLock) return;
			const { offset } = info;
			if (dragDirectionLock && this.currentDirection === null) {
				this.currentDirection = getCurrentDirection(offset);
				if (this.currentDirection !== null) onDirectionLock && onDirectionLock(this.currentDirection);
				return;
			}
			this.updateAxis("x", info.point, offset);
			this.updateAxis("y", info.point, offset);
			this.visualElement.render();
			onDrag && onDrag(event, info);
		};
		const onSessionEnd = (event, info) => {
			this.latestPointerEvent = event;
			this.latestPanInfo = info;
			this.stop(event, info);
			this.latestPointerEvent = null;
			this.latestPanInfo = null;
		};
		const resumeAnimation = () => eachAxis((axis) => this.getAnimationState(axis) === "paused" && this.getAxisMotionValue(axis).animation?.play());
		const { dragSnapToOrigin } = this.getProps();
		this.panSession = new PanSession(originEvent, {
			onSessionStart,
			onStart,
			onMove,
			onSessionEnd,
			resumeAnimation
		}, {
			transformPagePoint: this.visualElement.getTransformPagePoint(),
			dragSnapToOrigin,
			distanceThreshold,
			contextWindow: getContextWindow(this.visualElement)
		});
	}
	stop(event, panInfo) {
		const finalEvent = event || this.latestPointerEvent;
		const finalPanInfo = panInfo || this.latestPanInfo;
		const isDragging$1 = this.isDragging;
		this.cancel();
		if (!isDragging$1 || !finalPanInfo || !finalEvent) return;
		const { velocity } = finalPanInfo;
		this.startAnimation(velocity);
		const { onDragEnd } = this.getProps();
		if (onDragEnd) frame.postRender(() => onDragEnd(finalEvent, finalPanInfo));
	}
	cancel() {
		this.isDragging = false;
		const { projection, animationState } = this.visualElement;
		if (projection) projection.isAnimationBlocked = false;
		this.panSession && this.panSession.end();
		this.panSession = void 0;
		const { dragPropagation } = this.getProps();
		if (!dragPropagation && this.openDragLock) {
			this.openDragLock();
			this.openDragLock = null;
		}
		animationState && animationState.setActive("whileDrag", false);
	}
	updateAxis(axis, _point, offset) {
		const { drag: drag$1 } = this.getProps();
		if (!offset || !shouldDrag(axis, drag$1, this.currentDirection)) return;
		const axisValue = this.getAxisMotionValue(axis);
		let next = this.originPoint[axis] + offset[axis];
		if (this.constraints && this.constraints[axis]) next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
		axisValue.set(next);
	}
	resolveConstraints() {
		const { dragConstraints, dragElastic } = this.getProps();
		const layout$1 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
		const prevConstraints = this.constraints;
		if (dragConstraints && isRefObject(dragConstraints)) {
			if (!this.constraints) this.constraints = this.resolveRefConstraints();
		} else if (dragConstraints && layout$1) this.constraints = calcRelativeConstraints(layout$1.layoutBox, dragConstraints);
		else this.constraints = false;
		this.elastic = resolveDragElastic(dragElastic);
		if (prevConstraints !== this.constraints && layout$1 && this.constraints && !this.hasMutatedConstraints) eachAxis((axis) => {
			if (this.constraints !== false && this.getAxisMotionValue(axis)) this.constraints[axis] = rebaseAxisConstraints(layout$1.layoutBox[axis], this.constraints[axis]);
		});
	}
	resolveRefConstraints() {
		const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
		if (!constraints || !isRefObject(constraints)) return false;
		const constraintsElement = constraints.current;
		invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
		const { projection } = this.visualElement;
		if (!projection || !projection.layout) return false;
		const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
		let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
		if (onMeasureDragConstraints) {
			const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
			this.hasMutatedConstraints = !!userConstraints;
			if (userConstraints) measuredConstraints = convertBoundingBoxToBox(userConstraints);
		}
		return measuredConstraints;
	}
	startAnimation(velocity) {
		const { drag: drag$1, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
		const constraints = this.constraints || {};
		const momentumAnimations = eachAxis((axis) => {
			if (!shouldDrag(axis, drag$1, this.currentDirection)) return;
			let transition = constraints && constraints[axis] || {};
			if (dragSnapToOrigin) transition = {
				min: 0,
				max: 0
			};
			const bounceStiffness = dragElastic ? 200 : 1e6;
			const bounceDamping = dragElastic ? 40 : 1e7;
			const inertia$1 = {
				type: "inertia",
				velocity: dragMomentum ? velocity[axis] : 0,
				bounceStiffness,
				bounceDamping,
				timeConstant: 750,
				restDelta: 1,
				restSpeed: 10,
				...dragTransition,
				...transition
			};
			return this.startAxisValueAnimation(axis, inertia$1);
		});
		return Promise.all(momentumAnimations).then(onDragTransitionEnd);
	}
	startAxisValueAnimation(axis, transition) {
		const axisValue = this.getAxisMotionValue(axis);
		addValueToWillChange(this.visualElement, axis);
		return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
	}
	stopAnimation() {
		eachAxis((axis) => this.getAxisMotionValue(axis).stop());
	}
	pauseAnimation() {
		eachAxis((axis) => this.getAxisMotionValue(axis).animation?.pause());
	}
	getAnimationState(axis) {
		return this.getAxisMotionValue(axis).animation?.state;
	}
	getAxisMotionValue(axis) {
		const dragKey = `_drag${axis.toUpperCase()}`;
		const props = this.visualElement.getProps();
		const externalMotionValue = props[dragKey];
		return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
	}
	snapToCursor(point) {
		eachAxis((axis) => {
			const { drag: drag$1 } = this.getProps();
			if (!shouldDrag(axis, drag$1, this.currentDirection)) return;
			const { projection } = this.visualElement;
			const axisValue = this.getAxisMotionValue(axis);
			if (projection && projection.layout) {
				const { min, max } = projection.layout.layoutBox[axis];
				axisValue.set(point[axis] - mixNumber(min, max, .5));
			}
		});
	}
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		const { drag: drag$1, dragConstraints } = this.getProps();
		const { projection } = this.visualElement;
		if (!isRefObject(dragConstraints) || !projection || !this.constraints) return;
		this.stopAnimation();
		const boxProgress = {
			x: 0,
			y: 0
		};
		eachAxis((axis) => {
			const axisValue = this.getAxisMotionValue(axis);
			if (axisValue && this.constraints !== false) {
				const latest = axisValue.get();
				boxProgress[axis] = calcOrigin({
					min: latest,
					max: latest
				}, this.constraints[axis]);
			}
		});
		const { transformTemplate } = this.visualElement.getProps();
		this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
		projection.root && projection.root.updateScroll();
		projection.updateLayout();
		this.resolveConstraints();
		eachAxis((axis) => {
			if (!shouldDrag(axis, drag$1, null)) return;
			const axisValue = this.getAxisMotionValue(axis);
			const { min, max } = this.constraints[axis];
			axisValue.set(mixNumber(min, max, boxProgress[axis]));
		});
	}
	addListeners() {
		if (!this.visualElement.current) return;
		elementDragControls.set(this.visualElement, this);
		const element = this.visualElement.current;
		const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
			const { drag: drag$1, dragListener = true } = this.getProps();
			drag$1 && dragListener && this.start(event);
		});
		const measureDragConstraints = () => {
			const { dragConstraints } = this.getProps();
			if (isRefObject(dragConstraints) && dragConstraints.current) this.constraints = this.resolveRefConstraints();
		};
		const { projection } = this.visualElement;
		const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
		if (projection && !projection.layout) {
			projection.root && projection.root.updateScroll();
			projection.updateLayout();
		}
		frame.read(measureDragConstraints);
		const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
		const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
			if (this.isDragging && hasLayoutChanged) {
				eachAxis((axis) => {
					const motionValue$1 = this.getAxisMotionValue(axis);
					if (!motionValue$1) return;
					this.originPoint[axis] += delta[axis].translate;
					motionValue$1.set(motionValue$1.get() + delta[axis].translate);
				});
				this.visualElement.render();
			}
		}));
		return () => {
			stopResizeListener();
			stopPointerListener();
			stopMeasureLayoutListener();
			stopLayoutUpdateListener && stopLayoutUpdateListener();
		};
	}
	getProps() {
		const props = this.visualElement.getProps();
		const { drag: drag$1 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
		return {
			...props,
			drag: drag$1,
			dragDirectionLock,
			dragPropagation,
			dragConstraints,
			dragElastic,
			dragMomentum
		};
	}
};
function shouldDrag(direction, drag$1, currentDirection) {
	return (drag$1 === true || drag$1 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
	let direction = null;
	if (Math.abs(offset.y) > lockThreshold) direction = "y";
	else if (Math.abs(offset.x) > lockThreshold) direction = "x";
	return direction;
}
var DragGesture = class extends Feature {
	constructor(node) {
		super(node);
		this.removeGroupControls = noop;
		this.removeListeners = noop;
		this.controls = new VisualElementDragControls(node);
	}
	mount() {
		const { dragControls } = this.node.getProps();
		if (dragControls) this.removeGroupControls = dragControls.subscribe(this.controls);
		this.removeListeners = this.controls.addListeners() || noop;
	}
	unmount() {
		this.removeGroupControls();
		this.removeListeners();
	}
};
var asyncHandler = (handler) => (event, info) => {
	if (handler) frame.postRender(() => handler(event, info));
};
var PanGesture = class extends Feature {
	constructor() {
		super(...arguments);
		this.removePointerDownListener = noop;
	}
	onPointerDown(pointerDownEvent) {
		this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
			transformPagePoint: this.node.getTransformPagePoint(),
			contextWindow: getContextWindow(this.node)
		});
	}
	createPanHandlers() {
		const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
		return {
			onSessionStart: asyncHandler(onPanSessionStart),
			onStart: asyncHandler(onPanStart),
			onMove: onPan,
			onEnd: (event, info) => {
				delete this.session;
				if (onPanEnd) frame.postRender(() => onPanEnd(event, info));
			}
		};
	}
	mount() {
		this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
	}
	update() {
		this.session && this.session.updateHandlers(this.createPanHandlers());
	}
	unmount() {
		this.removePointerDownListener();
		this.session && this.session.end();
	}
};
var globalProjectionState = {
	hasAnimatedSinceResize: true,
	hasEverUpdated: false
};
var hasTakenAnySnapshot = false;
var MeasureLayoutWithContext = class extends import_react.Component {
	componentDidMount() {
		const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
		const { projection } = visualElement;
		if (projection) {
			if (layoutGroup.group) layoutGroup.group.add(projection);
			if (switchLayoutGroup && switchLayoutGroup.register && layoutId) switchLayoutGroup.register(projection);
			if (hasTakenAnySnapshot) projection.root.didUpdate();
			projection.addEventListener("animationComplete", () => {
				this.safeToRemove();
			});
			projection.setOptions({
				...projection.options,
				onExitComplete: () => this.safeToRemove()
			});
		}
		globalProjectionState.hasEverUpdated = true;
	}
	getSnapshotBeforeUpdate(prevProps) {
		const { layoutDependency, visualElement, drag: drag$1, isPresent } = this.props;
		const { projection } = visualElement;
		if (!projection) return null;
		projection.isPresent = isPresent;
		hasTakenAnySnapshot = true;
		if (drag$1 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || prevProps.isPresent !== isPresent) projection.willUpdate();
		else this.safeToRemove();
		if (prevProps.isPresent !== isPresent) {
			if (isPresent) projection.promote();
			else if (!projection.relegate()) frame.postRender(() => {
				const stack = projection.getStack();
				if (!stack || !stack.members.length) this.safeToRemove();
			});
		}
		return null;
	}
	componentDidUpdate() {
		const { projection } = this.props.visualElement;
		if (projection) {
			projection.root.didUpdate();
			microtask.postRender(() => {
				if (!projection.currentAnimation && projection.isLead()) this.safeToRemove();
			});
		}
	}
	componentWillUnmount() {
		const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
		const { projection } = visualElement;
		hasTakenAnySnapshot = true;
		if (projection) {
			projection.scheduleCheckAfterUnmount();
			if (layoutGroup && layoutGroup.group) layoutGroup.group.remove(projection);
			if (promoteContext && promoteContext.deregister) promoteContext.deregister(projection);
		}
	}
	safeToRemove() {
		const { safeToRemove } = this.props;
		safeToRemove && safeToRemove();
	}
	render() {
		return null;
	}
};
function MeasureLayout(props) {
	const [isPresent, safeToRemove] = usePresence();
	const layoutGroup = (0, import_react.useContext)(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(MeasureLayoutWithContext, {
		...props,
		layoutGroup,
		switchLayoutGroup: (0, import_react.useContext)(SwitchLayoutGroupContext),
		isPresent,
		safeToRemove
	});
}
function animateSingleValue(value, keyframes$1, options) {
	const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
	motionValue$1.start(animateMotionValue("", motionValue$1, keyframes$1, options));
	return motionValue$1.animation;
}
var compareByDepth = (a$1, b) => a$1.depth - b.depth;
var FlatTree = class {
	constructor() {
		this.children = [];
		this.isDirty = false;
	}
	add(child) {
		addUniqueItem(this.children, child);
		this.isDirty = true;
	}
	remove(child) {
		removeItem(this.children, child);
		this.isDirty = true;
	}
	forEach(callback) {
		this.isDirty && this.children.sort(compareByDepth);
		this.isDirty = false;
		this.children.forEach(callback);
	}
};
function delay(callback, timeout) {
	const start = time.now();
	const checkElapsed = ({ timestamp }) => {
		const elapsed = timestamp - start;
		if (elapsed >= timeout) {
			cancelFrame(checkElapsed);
			callback(elapsed - timeout);
		}
	};
	frame.setup(checkElapsed, true);
	return () => cancelFrame(checkElapsed);
}
var borders = [
	"TopLeft",
	"TopRight",
	"BottomLeft",
	"BottomRight"
];
var numBorders = borders.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress$1, shouldCrossfadeOpacity, isOnlyMember) {
	if (shouldCrossfadeOpacity) {
		target.opacity = mixNumber(0, lead.opacity ?? 1, easeCrossfadeIn(progress$1));
		target.opacityExit = mixNumber(follow.opacity ?? 1, 0, easeCrossfadeOut(progress$1));
	} else if (isOnlyMember) target.opacity = mixNumber(follow.opacity ?? 1, lead.opacity ?? 1, progress$1);
	for (let i$1 = 0; i$1 < numBorders; i$1++) {
		const borderLabel = `border${borders[i$1]}Radius`;
		let followRadius = getRadius(follow, borderLabel);
		let leadRadius = getRadius(lead, borderLabel);
		if (followRadius === void 0 && leadRadius === void 0) continue;
		followRadius || (followRadius = 0);
		leadRadius || (leadRadius = 0);
		if (followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius)) {
			target[borderLabel] = Math.max(mixNumber(asNumber(followRadius), asNumber(leadRadius), progress$1), 0);
			if (percent.test(leadRadius) || percent.test(followRadius)) target[borderLabel] += "%";
		} else target[borderLabel] = leadRadius;
	}
	if (follow.rotate || lead.rotate) target.rotate = mixNumber(follow.rotate || 0, lead.rotate || 0, progress$1);
}
function getRadius(values, radiusName) {
	return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, .5, circOut);
var easeCrossfadeOut = /* @__PURE__ */ compress(.5, .95, noop);
function compress(min, max, easing) {
	return (p) => {
		if (p < min) return 0;
		if (p > max) return 1;
		return easing(/* @__PURE__ */ progress(min, max, p));
	};
}
function copyAxisInto(axis, originAxis) {
	axis.min = originAxis.min;
	axis.max = originAxis.max;
}
function copyBoxInto(box$1, originBox) {
	copyAxisInto(box$1.x, originBox.x);
	copyAxisInto(box$1.y, originBox.y);
}
function copyAxisDeltaInto(delta, originDelta) {
	delta.translate = originDelta.translate;
	delta.scale = originDelta.scale;
	delta.originPoint = originDelta.originPoint;
	delta.origin = originDelta.origin;
}
function removePointDelta(point, translate, scale$1, originPoint, boxScale) {
	point -= translate;
	point = scalePoint(point, 1 / scale$1, originPoint);
	if (boxScale !== void 0) point = scalePoint(point, 1 / boxScale, originPoint);
	return point;
}
function removeAxisDelta(axis, translate = 0, scale$1 = 1, origin = .5, boxScale, originAxis = axis, sourceAxis = axis) {
	if (percent.test(translate)) {
		translate = parseFloat(translate);
		translate = mixNumber(sourceAxis.min, sourceAxis.max, translate / 100) - sourceAxis.min;
	}
	if (typeof translate !== "number") return;
	let originPoint = mixNumber(originAxis.min, originAxis.max, origin);
	if (axis === originAxis) originPoint -= translate;
	axis.min = removePointDelta(axis.min, translate, scale$1, originPoint, boxScale);
	axis.max = removePointDelta(axis.max, translate, scale$1, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
	removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys = [
	"x",
	"scaleX",
	"originX"
];
var yKeys = [
	"y",
	"scaleY",
	"originY"
];
function removeBoxTransforms(box$1, transforms, originBox, sourceBox) {
	removeAxisTransforms(box$1.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
	removeAxisTransforms(box$1.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}
function isAxisDeltaZero(delta) {
	return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
	return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a$1, b) {
	return a$1.min === b.min && a$1.max === b.max;
}
function boxEquals(a$1, b) {
	return axisEquals(a$1.x, b.x) && axisEquals(a$1.y, b.y);
}
function axisEqualsRounded(a$1, b) {
	return Math.round(a$1.min) === Math.round(b.min) && Math.round(a$1.max) === Math.round(b.max);
}
function boxEqualsRounded(a$1, b) {
	return axisEqualsRounded(a$1.x, b.x) && axisEqualsRounded(a$1.y, b.y);
}
function aspectRatio(box$1) {
	return calcLength(box$1.x) / calcLength(box$1.y);
}
function axisDeltaEquals(a$1, b) {
	return a$1.translate === b.translate && a$1.scale === b.scale && a$1.originPoint === b.originPoint;
}
var NodeStack = class {
	constructor() {
		this.members = [];
	}
	add(node) {
		addUniqueItem(this.members, node);
		node.scheduleRender();
	}
	remove(node) {
		removeItem(this.members, node);
		if (node === this.prevLead) this.prevLead = void 0;
		if (node === this.lead) {
			const prevLead = this.members[this.members.length - 1];
			if (prevLead) this.promote(prevLead);
		}
	}
	relegate(node) {
		const indexOfNode = this.members.findIndex((member) => node === member);
		if (indexOfNode === 0) return false;
		let prevLead;
		for (let i$1 = indexOfNode; i$1 >= 0; i$1--) {
			const member = this.members[i$1];
			if (member.isPresent !== false) {
				prevLead = member;
				break;
			}
		}
		if (prevLead) {
			this.promote(prevLead);
			return true;
		} else return false;
	}
	promote(node, preserveFollowOpacity) {
		const prevLead = this.lead;
		if (node === prevLead) return;
		this.prevLead = prevLead;
		this.lead = node;
		node.show();
		if (prevLead) {
			prevLead.instance && prevLead.scheduleRender();
			node.scheduleRender();
			node.resumeFrom = prevLead;
			if (preserveFollowOpacity) node.resumeFrom.preserveOpacity = true;
			if (prevLead.snapshot) {
				node.snapshot = prevLead.snapshot;
				node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
			}
			if (node.root && node.root.isUpdating) node.isLayoutDirty = true;
			const { crossfade } = node.options;
			if (crossfade === false) prevLead.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((node) => {
			const { options, resumingFrom } = node;
			options.onExitComplete && options.onExitComplete();
			if (resumingFrom) resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
		});
	}
	scheduleRender() {
		this.members.forEach((node) => {
			node.instance && node.scheduleRender(false);
		});
	}
	removeLeadSnapshot() {
		if (this.lead && this.lead.snapshot) this.lead.snapshot = void 0;
	}
};
function buildProjectionTransform(delta, treeScale, latestTransform) {
	let transform = "";
	const xTranslate = delta.x.translate / treeScale.x;
	const yTranslate = delta.y.translate / treeScale.y;
	const zTranslate = latestTransform?.z || 0;
	if (xTranslate || yTranslate || zTranslate) transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
	if (treeScale.x !== 1 || treeScale.y !== 1) transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
	if (latestTransform) {
		const { transformPerspective, rotate: rotate$1, rotateX, rotateY, skewX, skewY } = latestTransform;
		if (transformPerspective) transform = `perspective(${transformPerspective}px) ${transform}`;
		if (rotate$1) transform += `rotate(${rotate$1}deg) `;
		if (rotateX) transform += `rotateX(${rotateX}deg) `;
		if (rotateY) transform += `rotateY(${rotateY}deg) `;
		if (skewX) transform += `skewX(${skewX}deg) `;
		if (skewY) transform += `skewY(${skewY}deg) `;
	}
	const elementScaleX = delta.x.scale * treeScale.x;
	const elementScaleY = delta.y.scale * treeScale.y;
	if (elementScaleX !== 1 || elementScaleY !== 1) transform += `scale(${elementScaleX}, ${elementScaleY})`;
	return transform || "none";
}
var metrics = {
	nodes: 0,
	calculatedTargetDeltas: 0,
	calculatedProjections: 0
};
var transformAxes = [
	"",
	"X",
	"Y",
	"Z"
];
var animationTarget = 1e3;
var id = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
	const { latestValues } = visualElement;
	if (latestValues[key]) {
		values[key] = latestValues[key];
		visualElement.setStaticValue(key, 0);
		if (sharedAnimationValues) sharedAnimationValues[key] = 0;
	}
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
	projectionNode.hasCheckedOptimisedAppear = true;
	if (projectionNode.root === projectionNode) return;
	const { visualElement } = projectionNode.options;
	if (!visualElement) return;
	const appearId = getOptimisedAppearId(visualElement);
	if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
		const { layout: layout$1, layoutId } = projectionNode.options;
		window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout$1 || layoutId));
	}
	const { parent } = projectionNode;
	if (parent && !parent.hasCheckedOptimisedAppear) cancelTreeOptimisedTransformAnimations(parent);
}
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
	return class ProjectionNode {
		constructor(latestValues = {}, parent = defaultParent?.()) {
			this.id = id++;
			this.animationId = 0;
			this.animationCommitId = 0;
			this.children = /* @__PURE__ */ new Set();
			this.options = {};
			this.isTreeAnimating = false;
			this.isAnimationBlocked = false;
			this.isLayoutDirty = false;
			this.isProjectionDirty = false;
			this.isSharedProjectionDirty = false;
			this.isTransformDirty = false;
			this.updateManuallyBlocked = false;
			this.updateBlockedByResize = false;
			this.isUpdating = false;
			this.isSVG = false;
			this.needsReset = false;
			this.shouldResetTransform = false;
			this.hasCheckedOptimisedAppear = false;
			this.treeScale = {
				x: 1,
				y: 1
			};
			this.eventHandlers = /* @__PURE__ */ new Map();
			this.hasTreeAnimated = false;
			this.layoutVersion = 0;
			this.updateScheduled = false;
			this.scheduleUpdate = () => this.update();
			this.projectionUpdateScheduled = false;
			this.checkUpdateFailed = () => {
				if (this.isUpdating) {
					this.isUpdating = false;
					this.clearAllSnapshots();
				}
			};
			this.updateProjection = () => {
				this.projectionUpdateScheduled = false;
				if (statsBuffer.value) metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0;
				this.nodes.forEach(propagateDirtyNodes);
				this.nodes.forEach(resolveTargetDelta);
				this.nodes.forEach(calcProjection);
				this.nodes.forEach(cleanDirtyNodes);
				if (statsBuffer.addProjectionMetrics) statsBuffer.addProjectionMetrics(metrics);
			};
			this.resolvedRelativeTargetAt = 0;
			this.linkedParentVersion = 0;
			this.hasProjected = false;
			this.isVisible = true;
			this.animationProgress = 0;
			this.sharedNodes = /* @__PURE__ */ new Map();
			this.latestValues = latestValues;
			this.root = parent ? parent.root || parent : this;
			this.path = parent ? [...parent.path, parent] : [];
			this.parent = parent;
			this.depth = parent ? parent.depth + 1 : 0;
			for (let i$1 = 0; i$1 < this.path.length; i$1++) this.path[i$1].shouldResetTransform = true;
			if (this.root === this) this.nodes = new FlatTree();
		}
		addEventListener(name, handler) {
			if (!this.eventHandlers.has(name)) this.eventHandlers.set(name, new SubscriptionManager());
			return this.eventHandlers.get(name).add(handler);
		}
		notifyListeners(name, ...args) {
			const subscriptionManager = this.eventHandlers.get(name);
			subscriptionManager && subscriptionManager.notify(...args);
		}
		hasListeners(name) {
			return this.eventHandlers.has(name);
		}
		mount(instance) {
			if (this.instance) return;
			this.isSVG = isSVGElement(instance) && !isSVGSVGElement(instance);
			this.instance = instance;
			const { layoutId, layout: layout$1, visualElement } = this.options;
			if (visualElement && !visualElement.current) visualElement.mount(instance);
			this.root.nodes.add(this);
			this.parent && this.parent.children.add(this);
			if (this.root.hasTreeAnimated && (layout$1 || layoutId)) this.isLayoutDirty = true;
			if (attachResizeListener) {
				let cancelDelay;
				let innerWidth = 0;
				const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
				frame.read(() => {
					innerWidth = window.innerWidth;
				});
				attachResizeListener(instance, () => {
					const newInnerWidth = window.innerWidth;
					if (newInnerWidth === innerWidth) return;
					innerWidth = newInnerWidth;
					this.root.updateBlockedByResize = true;
					cancelDelay && cancelDelay();
					cancelDelay = delay(resizeUnblockUpdate, 250);
					if (globalProjectionState.hasAnimatedSinceResize) {
						globalProjectionState.hasAnimatedSinceResize = false;
						this.nodes.forEach(finishAnimation);
					}
				});
			}
			if (layoutId) this.root.registerSharedNode(layoutId, this);
			if (this.options.animate !== false && visualElement && (layoutId || layout$1)) this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
				if (this.isTreeAnimationBlocked()) {
					this.target = void 0;
					this.relativeTarget = void 0;
					return;
				}
				const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
				const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
				const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
				const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
				if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
					if (this.resumeFrom) {
						this.resumingFrom = this.resumeFrom;
						this.resumingFrom.resumingFrom = void 0;
					}
					const animationOptions = {
						...getValueTransition(layoutTransition, "layout"),
						onPlay: onLayoutAnimationStart,
						onComplete: onLayoutAnimationComplete
					};
					if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
						animationOptions.delay = 0;
						animationOptions.type = false;
					}
					this.startAnimation(animationOptions);
					this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
				} else {
					if (!hasLayoutChanged) finishAnimation(this);
					if (this.isLead() && this.options.onExitComplete) this.options.onExitComplete();
				}
				this.targetLayout = newLayout;
			});
		}
		unmount() {
			this.options.layoutId && this.willUpdate();
			this.root.nodes.remove(this);
			const stack = this.getStack();
			stack && stack.remove(this);
			this.parent && this.parent.children.delete(this);
			this.instance = void 0;
			this.eventHandlers.clear();
			cancelFrame(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = true;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = false;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		isTreeAnimationBlocked() {
			return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
		}
		startUpdate() {
			if (this.isUpdateBlocked()) return;
			this.isUpdating = true;
			this.nodes && this.nodes.forEach(resetSkewAndRotation);
			this.animationId++;
		}
		getTransformTemplate() {
			const { visualElement } = this.options;
			return visualElement && visualElement.getProps().transformTemplate;
		}
		willUpdate(shouldNotifyListeners = true) {
			this.root.hasTreeAnimated = true;
			if (this.root.isUpdateBlocked()) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) cancelTreeOptimisedTransformAnimations(this);
			!this.root.isUpdating && this.root.startUpdate();
			if (this.isLayoutDirty) return;
			this.isLayoutDirty = true;
			for (let i$1 = 0; i$1 < this.path.length; i$1++) {
				const node = this.path[i$1];
				node.shouldResetTransform = true;
				node.updateScroll("snapshot");
				if (node.options.layoutRoot) node.willUpdate(false);
			}
			const { layoutId, layout: layout$1 } = this.options;
			if (layoutId === void 0 && !layout$1) return;
			const transformTemplate = this.getTransformTemplate();
			this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
			this.updateSnapshot();
			shouldNotifyListeners && this.notifyListeners("willUpdate");
		}
		update() {
			this.updateScheduled = false;
			if (this.isUpdateBlocked()) {
				this.unblockUpdate();
				this.clearAllSnapshots();
				this.nodes.forEach(clearMeasurements);
				return;
			}
			if (this.animationId <= this.animationCommitId) {
				this.nodes.forEach(clearIsLayoutDirty);
				return;
			}
			this.animationCommitId = this.animationId;
			if (!this.isUpdating) this.nodes.forEach(clearIsLayoutDirty);
			else {
				this.isUpdating = false;
				this.nodes.forEach(resetTransformStyle);
				this.nodes.forEach(updateLayout);
				this.nodes.forEach(notifyLayoutUpdate);
			}
			this.clearAllSnapshots();
			const now$1 = time.now();
			frameData.delta = clamp(0, 1e3 / 60, now$1 - frameData.timestamp);
			frameData.timestamp = now$1;
			frameData.isProcessing = true;
			frameSteps.update.process(frameData);
			frameSteps.preRender.process(frameData);
			frameSteps.render.process(frameData);
			frameData.isProcessing = false;
		}
		didUpdate() {
			if (!this.updateScheduled) {
				this.updateScheduled = true;
				microtask.read(this.scheduleUpdate);
			}
		}
		clearAllSnapshots() {
			this.nodes.forEach(clearSnapshot);
			this.sharedNodes.forEach(removeLeadSnapshots);
		}
		scheduleUpdateProjection() {
			if (!this.projectionUpdateScheduled) {
				this.projectionUpdateScheduled = true;
				frame.preRender(this.updateProjection, false, true);
			}
		}
		scheduleCheckAfterUnmount() {
			frame.postRender(() => {
				if (this.isLayoutDirty) this.root.didUpdate();
				else this.root.checkUpdateFailed();
			});
		}
		updateSnapshot() {
			if (this.snapshot || !this.instance) return;
			this.snapshot = this.measure();
			if (this.snapshot && !calcLength(this.snapshot.measuredBox.x) && !calcLength(this.snapshot.measuredBox.y)) this.snapshot = void 0;
		}
		updateLayout() {
			if (!this.instance) return;
			this.updateScroll();
			if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) return;
			if (this.resumeFrom && !this.resumeFrom.instance) for (let i$1 = 0; i$1 < this.path.length; i$1++) this.path[i$1].updateScroll();
			const prevLayout = this.layout;
			this.layout = this.measure(false);
			this.layoutVersion++;
			this.layoutCorrected = createBox();
			this.isLayoutDirty = false;
			this.projectionDelta = void 0;
			this.notifyListeners("measure", this.layout.layoutBox);
			const { visualElement } = this.options;
			visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
		}
		updateScroll(phase = "measure") {
			let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
			if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) needsMeasurement = false;
			if (needsMeasurement && this.instance) {
				const isRoot = checkIsScrollRoot(this.instance);
				this.scroll = {
					animationId: this.root.animationId,
					phase,
					isRoot,
					offset: measureScroll(this.instance),
					wasRoot: this.scroll ? this.scroll.isRoot : isRoot
				};
			}
		}
		resetTransform() {
			if (!resetTransform) return;
			const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
			const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
			const transformTemplate = this.getTransformTemplate();
			const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
			const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
			if (isResetRequested && this.instance && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
				resetTransform(this.instance, transformTemplateValue);
				this.shouldResetTransform = false;
				this.scheduleRender();
			}
		}
		measure(removeTransform = true) {
			const pageBox = this.measurePageBox();
			let layoutBox = this.removeElementScroll(pageBox);
			if (removeTransform) layoutBox = this.removeTransform(layoutBox);
			roundBox(layoutBox);
			return {
				animationId: this.root.animationId,
				measuredBox: pageBox,
				layoutBox,
				latestValues: {},
				source: this.id
			};
		}
		measurePageBox() {
			const { visualElement } = this.options;
			if (!visualElement) return createBox();
			const box$1 = visualElement.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot))) {
				const { scroll } = this.root;
				if (scroll) {
					translateAxis(box$1.x, scroll.offset.x);
					translateAxis(box$1.y, scroll.offset.y);
				}
			}
			return box$1;
		}
		removeElementScroll(box$1) {
			const boxWithoutScroll = createBox();
			copyBoxInto(boxWithoutScroll, box$1);
			if (this.scroll?.wasRoot) return boxWithoutScroll;
			for (let i$1 = 0; i$1 < this.path.length; i$1++) {
				const node = this.path[i$1];
				const { scroll, options } = node;
				if (node !== this.root && scroll && options.layoutScroll) {
					if (scroll.wasRoot) copyBoxInto(boxWithoutScroll, box$1);
					translateAxis(boxWithoutScroll.x, scroll.offset.x);
					translateAxis(boxWithoutScroll.y, scroll.offset.y);
				}
			}
			return boxWithoutScroll;
		}
		applyTransform(box$1, transformOnly = false) {
			const withTransforms = createBox();
			copyBoxInto(withTransforms, box$1);
			for (let i$1 = 0; i$1 < this.path.length; i$1++) {
				const node = this.path[i$1];
				if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) transformBox(withTransforms, {
					x: -node.scroll.offset.x,
					y: -node.scroll.offset.y
				});
				if (!hasTransform(node.latestValues)) continue;
				transformBox(withTransforms, node.latestValues);
			}
			if (hasTransform(this.latestValues)) transformBox(withTransforms, this.latestValues);
			return withTransforms;
		}
		removeTransform(box$1) {
			const boxWithoutTransform = createBox();
			copyBoxInto(boxWithoutTransform, box$1);
			for (let i$1 = 0; i$1 < this.path.length; i$1++) {
				const node = this.path[i$1];
				if (!node.instance) continue;
				if (!hasTransform(node.latestValues)) continue;
				hasScale(node.latestValues) && node.updateSnapshot();
				const sourceBox = createBox();
				copyBoxInto(sourceBox, node.measurePageBox());
				removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
			}
			if (hasTransform(this.latestValues)) removeBoxTransforms(boxWithoutTransform, this.latestValues);
			return boxWithoutTransform;
		}
		setTargetDelta(delta) {
			this.targetDelta = delta;
			this.root.scheduleUpdateProjection();
			this.isProjectionDirty = true;
		}
		setOptions(options) {
			this.options = {
				...this.options,
				...options,
				crossfade: options.crossfade !== void 0 ? options.crossfade : true
			};
		}
		clearMeasurements() {
			this.scroll = void 0;
			this.layout = void 0;
			this.snapshot = void 0;
			this.prevTransformTemplateValue = void 0;
			this.targetDelta = void 0;
			this.target = void 0;
			this.isLayoutDirty = false;
		}
		forceRelativeParentToResolveTarget() {
			if (!this.relativeParent) return;
			if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) this.relativeParent.resolveTargetDelta(true);
		}
		resolveTargetDelta(forceRecalculation = false) {
			const lead = this.getLead();
			this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
			this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
			this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
			const isShared = Boolean(this.resumingFrom) || this !== lead;
			if (!(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
			const { layout: layout$1, layoutId } = this.options;
			if (!this.layout || !(layout$1 || layoutId)) return;
			this.resolvedRelativeTargetAt = frameData.timestamp;
			const relativeParent = this.getClosestProjectingParent();
			if (relativeParent && this.linkedParentVersion !== relativeParent.layoutVersion && !relativeParent.options.layoutRoot) this.removeRelativeTarget();
			if (!this.targetDelta && !this.relativeTarget) if (relativeParent && relativeParent.layout) this.createRelativeTarget(relativeParent, this.layout.layoutBox, relativeParent.layout.layoutBox);
			else this.removeRelativeTarget();
			if (!this.relativeTarget && !this.targetDelta) return;
			if (!this.target) {
				this.target = createBox();
				this.targetWithTransforms = createBox();
			}
			if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
				this.forceRelativeParentToResolveTarget();
				calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
			} else if (this.targetDelta) {
				if (Boolean(this.resumingFrom)) this.target = this.applyTransform(this.layout.layoutBox);
				else copyBoxInto(this.target, this.layout.layoutBox);
				applyBoxDelta(this.target, this.targetDelta);
			} else copyBoxInto(this.target, this.layout.layoutBox);
			if (this.attemptToResolveRelativeTarget) {
				this.attemptToResolveRelativeTarget = false;
				if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) this.createRelativeTarget(relativeParent, this.target, relativeParent.target);
				else this.relativeParent = this.relativeTarget = void 0;
			}
			if (statsBuffer.value) metrics.calculatedTargetDeltas++;
		}
		getClosestProjectingParent() {
			if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) return;
			if (this.parent.isProjecting()) return this.parent;
			else return this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		createRelativeTarget(relativeParent, layout$1, parentLayout) {
			this.relativeParent = relativeParent;
			this.linkedParentVersion = relativeParent.layoutVersion;
			this.forceRelativeParentToResolveTarget();
			this.relativeTarget = createBox();
			this.relativeTargetOrigin = createBox();
			calcRelativePosition(this.relativeTargetOrigin, layout$1, parentLayout);
			copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
		}
		removeRelativeTarget() {
			this.relativeParent = this.relativeTarget = void 0;
		}
		calcProjection() {
			const lead = this.getLead();
			const isShared = Boolean(this.resumingFrom) || this !== lead;
			let canSkip = true;
			if (this.isProjectionDirty || this.parent?.isProjectionDirty) canSkip = false;
			if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) canSkip = false;
			if (this.resolvedRelativeTargetAt === frameData.timestamp) canSkip = false;
			if (canSkip) return;
			const { layout: layout$1, layoutId } = this.options;
			this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
			if (!this.isTreeAnimating) this.targetDelta = this.relativeTarget = void 0;
			if (!this.layout || !(layout$1 || layoutId)) return;
			copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
			const prevTreeScaleX = this.treeScale.x;
			const prevTreeScaleY = this.treeScale.y;
			applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
			if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
				lead.target = lead.layout.layoutBox;
				lead.targetWithTransforms = createBox();
			}
			const { target } = lead;
			if (!target) {
				if (this.prevProjectionDelta) {
					this.createProjectionDeltas();
					this.scheduleRender();
				}
				return;
			}
			if (!this.projectionDelta || !this.prevProjectionDelta) this.createProjectionDeltas();
			else {
				copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
				copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
			}
			calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
			if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
				this.hasProjected = true;
				this.scheduleRender();
				this.notifyListeners("projectionUpdate", target);
			}
			if (statsBuffer.value) metrics.calculatedProjections++;
		}
		hide() {
			this.isVisible = false;
		}
		show() {
			this.isVisible = true;
		}
		scheduleRender(notifyAll = true) {
			this.options.visualElement?.scheduleRender();
			if (notifyAll) {
				const stack = this.getStack();
				stack && stack.scheduleRender();
			}
			if (this.resumingFrom && !this.resumingFrom.instance) this.resumingFrom = void 0;
		}
		createProjectionDeltas() {
			this.prevProjectionDelta = createDelta();
			this.projectionDelta = createDelta();
			this.projectionDeltaWithTransform = createDelta();
		}
		setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
			const snapshot = this.snapshot;
			const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
			const mixedValues = { ...this.latestValues };
			const targetDelta = createDelta();
			if (!this.relativeParent || !this.relativeParent.options.layoutRoot) this.relativeTarget = this.relativeTargetOrigin = void 0;
			this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
			const relativeLayout = createBox();
			const isSharedLayoutAnimation = (snapshot ? snapshot.source : void 0) !== (this.layout ? this.layout.source : void 0);
			const stack = this.getStack();
			const isOnlyMember = !stack || stack.members.length <= 1;
			const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
			this.animationProgress = 0;
			let prevRelativeTarget;
			this.mixTargetDelta = (latest) => {
				const progress$1 = latest / 1e3;
				mixAxisDelta(targetDelta.x, delta.x, progress$1);
				mixAxisDelta(targetDelta.y, delta.y, progress$1);
				this.setTargetDelta(targetDelta);
				if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
					calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
					mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress$1);
					if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) this.isProjectionDirty = false;
					if (!prevRelativeTarget) prevRelativeTarget = createBox();
					copyBoxInto(prevRelativeTarget, this.relativeTarget);
				}
				if (isSharedLayoutAnimation) {
					this.animationValues = mixedValues;
					mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress$1, shouldCrossfadeOpacity, isOnlyMember);
				}
				this.root.scheduleUpdateProjection();
				this.scheduleRender();
				this.animationProgress = progress$1;
			};
			this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(options) {
			this.notifyListeners("animationStart");
			this.currentAnimation?.stop();
			this.resumingFrom?.currentAnimation?.stop();
			if (this.pendingAnimation) {
				cancelFrame(this.pendingAnimation);
				this.pendingAnimation = void 0;
			}
			this.pendingAnimation = frame.update(() => {
				globalProjectionState.hasAnimatedSinceResize = true;
				activeAnimations.layout++;
				this.motionValue || (this.motionValue = motionValue(0));
				this.currentAnimation = animateSingleValue(this.motionValue, [0, 1e3], {
					...options,
					velocity: 0,
					isSync: true,
					onUpdate: (latest) => {
						this.mixTargetDelta(latest);
						options.onUpdate && options.onUpdate(latest);
					},
					onStop: () => {
						activeAnimations.layout--;
					},
					onComplete: () => {
						activeAnimations.layout--;
						options.onComplete && options.onComplete();
						this.completeAnimation();
					}
				});
				if (this.resumingFrom) this.resumingFrom.currentAnimation = this.currentAnimation;
				this.pendingAnimation = void 0;
			});
		}
		completeAnimation() {
			if (this.resumingFrom) {
				this.resumingFrom.currentAnimation = void 0;
				this.resumingFrom.preserveOpacity = void 0;
			}
			const stack = this.getStack();
			stack && stack.exitAnimationComplete();
			this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
			this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			if (this.currentAnimation) {
				this.mixTargetDelta && this.mixTargetDelta(animationTarget);
				this.currentAnimation.stop();
			}
			this.completeAnimation();
		}
		applyTransformsToTarget() {
			const lead = this.getLead();
			let { targetWithTransforms, target, layout: layout$1, latestValues } = lead;
			if (!targetWithTransforms || !target || !layout$1) return;
			if (this !== lead && this.layout && layout$1 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout$1.layoutBox)) {
				target = this.target || createBox();
				const xLength = calcLength(this.layout.layoutBox.x);
				target.x.min = lead.target.x.min;
				target.x.max = target.x.min + xLength;
				const yLength = calcLength(this.layout.layoutBox.y);
				target.y.min = lead.target.y.min;
				target.y.max = target.y.min + yLength;
			}
			copyBoxInto(targetWithTransforms, target);
			transformBox(targetWithTransforms, latestValues);
			calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
		}
		registerSharedNode(layoutId, node) {
			if (!this.sharedNodes.has(layoutId)) this.sharedNodes.set(layoutId, new NodeStack());
			this.sharedNodes.get(layoutId).add(node);
			const config = node.options.initialPromotionConfig;
			node.promote({
				transition: config ? config.transition : void 0,
				preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
			});
		}
		isLead() {
			const stack = this.getStack();
			return stack ? stack.lead === this : true;
		}
		getLead() {
			const { layoutId } = this.options;
			return layoutId ? this.getStack()?.lead || this : this;
		}
		getPrevLead() {
			const { layoutId } = this.options;
			return layoutId ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			const { layoutId } = this.options;
			if (layoutId) return this.root.sharedNodes.get(layoutId);
		}
		promote({ needsReset, transition, preserveFollowOpacity } = {}) {
			const stack = this.getStack();
			if (stack) stack.promote(this, preserveFollowOpacity);
			if (needsReset) {
				this.projectionDelta = void 0;
				this.needsReset = true;
			}
			if (transition) this.setOptions({ transition });
		}
		relegate() {
			const stack = this.getStack();
			if (stack) return stack.relegate(this);
			else return false;
		}
		resetSkewAndRotation() {
			const { visualElement } = this.options;
			if (!visualElement) return;
			let hasDistortingTransform = false;
			const { latestValues } = visualElement;
			if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) hasDistortingTransform = true;
			if (!hasDistortingTransform) return;
			const resetValues = {};
			if (latestValues.z) resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
			for (let i$1 = 0; i$1 < transformAxes.length; i$1++) {
				resetDistortingTransform(`rotate${transformAxes[i$1]}`, visualElement, resetValues, this.animationValues);
				resetDistortingTransform(`skew${transformAxes[i$1]}`, visualElement, resetValues, this.animationValues);
			}
			visualElement.render();
			for (const key in resetValues) {
				visualElement.setStaticValue(key, resetValues[key]);
				if (this.animationValues) this.animationValues[key] = resetValues[key];
			}
			visualElement.scheduleRender();
		}
		applyProjectionStyles(targetStyle, styleProp) {
			if (!this.instance || this.isSVG) return;
			if (!this.isVisible) {
				targetStyle.visibility = "hidden";
				return;
			}
			const transformTemplate = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = false;
				targetStyle.visibility = "";
				targetStyle.opacity = "";
				targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
				targetStyle.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
				return;
			}
			const lead = this.getLead();
			if (!this.projectionDelta || !this.layout || !lead.target) {
				if (this.options.layoutId) {
					targetStyle.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
					targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
				}
				if (this.hasProjected && !hasTransform(this.latestValues)) {
					targetStyle.transform = transformTemplate ? transformTemplate({}, "") : "none";
					this.hasProjected = false;
				}
				return;
			}
			targetStyle.visibility = "";
			const valuesToRender = lead.animationValues || lead.latestValues;
			this.applyTransformsToTarget();
			let transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
			if (transformTemplate) transform = transformTemplate(valuesToRender, transform);
			targetStyle.transform = transform;
			const { x, y } = this.projectionDelta;
			targetStyle.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
			if (lead.animationValues) targetStyle.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
			else targetStyle.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
			for (const key in scaleCorrectors) {
				if (valuesToRender[key] === void 0) continue;
				const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
				const corrected = transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
				if (applyTo) {
					const num = applyTo.length;
					for (let i$1 = 0; i$1 < num; i$1++) targetStyle[applyTo[i$1]] = corrected;
				} else if (isCSSVariable) this.options.visualElement.renderState.vars[key] = corrected;
				else targetStyle[key] = corrected;
			}
			if (this.options.layoutId) targetStyle.pointerEvents = lead === this ? resolveMotionValue(styleProp?.pointerEvents) || "" : "none";
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((node) => node.currentAnimation?.stop());
			this.root.nodes.forEach(clearMeasurements);
			this.root.sharedNodes.clear();
		}
	};
}
function updateLayout(node) {
	node.updateLayout();
}
function notifyLayoutUpdate(node) {
	const snapshot = node.resumeFrom?.snapshot || node.snapshot;
	if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
		const { layoutBox: layout$1, measuredBox: measuredLayout } = node.layout;
		const { animationType } = node.options;
		const isShared = snapshot.source !== node.layout.source;
		if (animationType === "size") eachAxis((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length = calcLength(axisSnapshot);
			axisSnapshot.min = layout$1[axis].min;
			axisSnapshot.max = axisSnapshot.min + length;
		});
		else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout$1)) eachAxis((axis) => {
			const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
			const length = calcLength(layout$1[axis]);
			axisSnapshot.max = axisSnapshot.min + length;
			if (node.relativeTarget && !node.currentAnimation) {
				node.isProjectionDirty = true;
				node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
			}
		});
		const layoutDelta = createDelta();
		calcBoxDelta(layoutDelta, layout$1, snapshot.layoutBox);
		const visualDelta = createDelta();
		if (isShared) calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
		else calcBoxDelta(visualDelta, layout$1, snapshot.layoutBox);
		const hasLayoutChanged = !isDeltaZero(layoutDelta);
		let hasRelativeLayoutChanged = false;
		if (!node.resumeFrom) {
			const relativeParent = node.getClosestProjectingParent();
			if (relativeParent && !relativeParent.resumeFrom) {
				const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
				if (parentSnapshot && parentLayout) {
					const relativeSnapshot = createBox();
					calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
					const relativeLayout = createBox();
					calcRelativePosition(relativeLayout, layout$1, parentLayout.layoutBox);
					if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) hasRelativeLayoutChanged = true;
					if (relativeParent.options.layoutRoot) {
						node.relativeTarget = relativeLayout;
						node.relativeTargetOrigin = relativeSnapshot;
						node.relativeParent = relativeParent;
					}
				}
			}
		}
		node.notifyListeners("didUpdate", {
			layout: layout$1,
			snapshot,
			delta: visualDelta,
			layoutDelta,
			hasLayoutChanged,
			hasRelativeLayoutChanged
		});
	} else if (node.isLead()) {
		const { onExitComplete } = node.options;
		onExitComplete && onExitComplete();
	}
	node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
	if (statsBuffer.value) metrics.nodes++;
	if (!node.parent) return;
	if (!node.isProjecting()) node.isProjectionDirty = node.parent.isProjectionDirty;
	node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
	node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
	node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
	node.clearSnapshot();
}
function clearMeasurements(node) {
	node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
	node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
	const { visualElement } = node.options;
	if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) visualElement.notify("BeforeLayoutMeasure");
	node.resetTransform();
}
function finishAnimation(node) {
	node.finishAnimation();
	node.targetDelta = node.relativeTarget = node.target = void 0;
	node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
	node.resolveTargetDelta();
}
function calcProjection(node) {
	node.calcProjection();
}
function resetSkewAndRotation(node) {
	node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
	stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
	output.translate = mixNumber(delta.translate, 0, p);
	output.scale = mixNumber(delta.scale, 1, p);
	output.origin = delta.origin;
	output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
	output.min = mixNumber(from.min, to.min, p);
	output.max = mixNumber(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
	mixAxis(output.x, from.x, to.x, p);
	mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
	return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
	axis.min = roundPoint(axis.min);
	axis.max = roundPoint(axis.max);
}
function roundBox(box$1) {
	roundAxis(box$1.x);
	roundAxis(box$1.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout$1) {
	return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout$1), .2);
}
function checkNodeWasScrollRoot(node) {
	return node !== node.root && node.scroll?.wasRoot;
}
var DocumentProjectionNode = createProjectionNode({
	attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
	measureScroll: () => ({
		x: document.documentElement.scrollLeft || document.body.scrollLeft,
		y: document.documentElement.scrollTop || document.body.scrollTop
	}),
	checkIsScrollRoot: () => true
});
var rootProjectionNode = { current: void 0 };
var HTMLProjectionNode = createProjectionNode({
	measureScroll: (instance) => ({
		x: instance.scrollLeft,
		y: instance.scrollTop
	}),
	defaultParent: () => {
		if (!rootProjectionNode.current) {
			const documentNode = new DocumentProjectionNode({});
			documentNode.mount(window);
			documentNode.setOptions({ layoutScroll: true });
			rootProjectionNode.current = documentNode;
		}
		return rootProjectionNode.current;
	},
	resetTransform: (instance, value) => {
		instance.style.transform = value !== void 0 ? value : "none";
	},
	checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
var drag = {
	pan: { Feature: PanGesture },
	drag: {
		Feature: DragGesture,
		ProjectionNode: HTMLProjectionNode,
		MeasureLayout
	}
};
function handleHoverEvent(node, event, lifecycle) {
	const { props } = node;
	if (node.animationState && props.whileHover) node.animationState.setActive("whileHover", lifecycle === "Start");
	const callback = props["onHover" + lifecycle];
	if (callback) frame.postRender(() => callback(event, extractEventInfo(event)));
}
var HoverGesture = class extends Feature {
	mount() {
		const { current } = this.node;
		if (!current) return;
		this.unmount = hover(current, (_element, startEvent) => {
			handleHoverEvent(this.node, startEvent, "Start");
			return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
		});
	}
	unmount() {}
};
var FocusGesture = class extends Feature {
	constructor() {
		super(...arguments);
		this.isActive = false;
	}
	onFocus() {
		let isFocusVisible = false;
		try {
			isFocusVisible = this.node.current.matches(":focus-visible");
		} catch (e$1) {
			isFocusVisible = true;
		}
		if (!isFocusVisible || !this.node.animationState) return;
		this.node.animationState.setActive("whileFocus", true);
		this.isActive = true;
	}
	onBlur() {
		if (!this.isActive || !this.node.animationState) return;
		this.node.animationState.setActive("whileFocus", false);
		this.isActive = false;
	}
	mount() {
		this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
	}
	unmount() {}
};
function handlePressEvent(node, event, lifecycle) {
	const { props } = node;
	if (node.current instanceof HTMLButtonElement && node.current.disabled) return;
	if (node.animationState && props.whileTap) node.animationState.setActive("whileTap", lifecycle === "Start");
	const callback = props["onTap" + (lifecycle === "End" ? "" : lifecycle)];
	if (callback) frame.postRender(() => callback(event, extractEventInfo(event)));
}
var PressGesture = class extends Feature {
	mount() {
		const { current } = this.node;
		if (!current) return;
		this.unmount = press(current, (_element, startEvent) => {
			handlePressEvent(this.node, startEvent, "Start");
			return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
		}, { useGlobalTarget: this.node.props.globalTapTarget });
	}
	unmount() {}
};
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
	const callback = observerCallbacks.get(entry.target);
	callback && callback(entry);
};
var fireAllObserverCallbacks = (entries) => {
	entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
	const lookupRoot = root || document;
	if (!observers.has(lookupRoot)) observers.set(lookupRoot, {});
	const rootObservers = observers.get(lookupRoot);
	const key = JSON.stringify(options);
	if (!rootObservers[key]) rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, {
		root,
		...options
	});
	return rootObservers[key];
}
function observeIntersection(element, options, callback) {
	const rootInteresectionObserver = initIntersectionObserver(options);
	observerCallbacks.set(element, callback);
	rootInteresectionObserver.observe(element);
	return () => {
		observerCallbacks.delete(element);
		rootInteresectionObserver.unobserve(element);
	};
}
var thresholdNames = {
	some: 0,
	all: 1
};
var InViewFeature = class extends Feature {
	constructor() {
		super(...arguments);
		this.hasEnteredView = false;
		this.isInView = false;
	}
	startObserver() {
		this.unmount();
		const { viewport = {} } = this.node.getProps();
		const { root, margin: rootMargin, amount = "some", once } = viewport;
		const options = {
			root: root ? root.current : void 0,
			rootMargin,
			threshold: typeof amount === "number" ? amount : thresholdNames[amount]
		};
		const onIntersectionUpdate = (entry) => {
			const { isIntersecting } = entry;
			if (this.isInView === isIntersecting) return;
			this.isInView = isIntersecting;
			if (once && !isIntersecting && this.hasEnteredView) return;
			else if (isIntersecting) this.hasEnteredView = true;
			if (this.node.animationState) this.node.animationState.setActive("whileInView", isIntersecting);
			const { onViewportEnter, onViewportLeave } = this.node.getProps();
			const callback = isIntersecting ? onViewportEnter : onViewportLeave;
			callback && callback(entry);
		};
		return observeIntersection(this.node.current, options, onIntersectionUpdate);
	}
	mount() {
		this.startObserver();
	}
	update() {
		if (typeof IntersectionObserver === "undefined") return;
		const { props, prevProps } = this.node;
		if ([
			"amount",
			"margin",
			"root"
		].some(hasViewportOptionChanged(props, prevProps))) this.startObserver();
	}
	unmount() {}
};
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
	return (name) => viewport[name] !== prevViewport[name];
}
var gestureAnimations = {
	inView: { Feature: InViewFeature },
	tap: { Feature: PressGesture },
	focus: { Feature: FocusGesture },
	hover: { Feature: HoverGesture }
};
var layout = { layout: {
	ProjectionNode: HTMLProjectionNode,
	MeasureLayout
} };
var motion = /* @__PURE__ */ createMotionProxy({
	...animations,
	...gestureAnimations,
	...drag,
	...layout
}, createDomVisualElement);
var FAVICON_SOURCES = [
	(h) => `https://icon.horse/icon/${h}`,
	(h) => `https://favicon.splitbee.io/?url=${h}`,
	(h) => `https://favicon.im/${h}`,
	(h) => `https://${h}/favicon.ico`
];
var FallbackFavicon = ({ hostname, alt }) => {
	const [src, setSrc] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setSrc(null);
		setFailed(false);
		(async () => {
			for (const buildUrl of FAVICON_SOURCES) {
				if (cancelled) return;
				const url = buildUrl(hostname);
				try {
					const proxied = await proxyImageUrl(url);
					if (cancelled) return;
					if (proxied) {
						setSrc(proxied);
						return;
					}
				} catch {}
			}
			if (!cancelled) setFailed(true);
		})();
		return () => {
			cancelled = true;
		};
	}, [hostname]);
	if (failed || !src && failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaviconPlaceholder, { children: hostname.charAt(0).toUpperCase() });
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaviconLoading, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Favicon, {
		src,
		alt,
		onError: () => setFailed(true)
	});
};
var FaviconLoading = dt.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: var(--color-background-mute);
`;
var FaviconPlaceholder = dt.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: var(--color-primary-1);
  color: var(--color-primary-6);
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
var Favicon = dt.img`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: var(--color-background-mute);
`;
var FallbackFavicon_default = FallbackFavicon;
function useProxiedImage(originalSrc) {
	const needsProxy = isExternalUrl(originalSrc) || isLocalFileUrl(originalSrc);
	const [proxiedSrc, setProxiedSrc] = (0, import_react.useState)(needsProxy ? "" : originalSrc);
	const [loading, setLoading] = (0, import_react.useState)(needsProxy);
	(0, import_react.useEffect)(() => {
		if (!(isExternalUrl(originalSrc) || isLocalFileUrl(originalSrc))) {
			setProxiedSrc(originalSrc);
			setLoading(false);
			return;
		}
		let cancelled = false;
		setLoading(true);
		setProxiedSrc("");
		(isLocalFileUrl(originalSrc) ? proxyLocalFileUrl : proxyImageUrl)(originalSrc).then((result) => {
			if (cancelled) return;
			setProxiedSrc(result || "");
			setLoading(false);
			if (!result) console.warn("[useProxiedImage] proxy failed for", originalSrc.slice(0, 120));
		});
		return () => {
			cancelled = true;
		};
	}, [originalSrc]);
	return {
		src: proxiedSrc,
		loading
	};
}
var logger$2 = loggerService.withContext("Utils:download");
const download = (url, filename) => {
	if (canSaveImageByDialog() && isImageUrl(url, filename)) {
		saveImageByDialog(url, filename).catch((error) => {
			handleDownloadError(error);
		});
		return;
	}
	if ([
		"file://",
		"blob:",
		"data:image/png",
		"data:image/jpeg"
	].some((prefix) => url.startsWith(prefix))) {
		const link = document.createElement("a");
		link.href = url;
		let resolvedFilename = filename;
		if (!resolvedFilename) if (url.startsWith("file://")) {
			const pathname = new URL(url).pathname;
			resolvedFilename = decodeURIComponent(pathname.substring(pathname.lastIndexOf("/") + 1));
		} else if (url.startsWith("blob:")) resolvedFilename = `${Date.now()}_diagram.svg`;
		else if (url.startsWith("data:")) {
			const mimeMatch = url.match(/^data:([^;,]+)[;,]/);
			const extension = getExtensionFromMimeType(mimeMatch && mimeMatch[1]);
			resolvedFilename = `${Date.now()}_download${extension}`;
		} else resolvedFilename = "download";
		link.download = resolvedFilename;
		document.body.appendChild(link);
		link.click();
		link.remove();
		return;
	}
	fetch(url).then((response) => {
		let finalFilename = filename || "download";
		if (!filename) {
			const contentDisposition = response.headers.get("Content-Disposition");
			if (contentDisposition) {
				const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
				if (filenameMatch) finalFilename = filenameMatch[1];
			}
			const urlFilename = url.split("/").pop();
			if (urlFilename && urlFilename.includes(".")) finalFilename = urlFilename;
			if (!finalFilename.includes(".")) {
				const extension = getExtensionFromMimeType(response.headers.get("Content-Type"));
				finalFilename += extension;
			}
			finalFilename = `${Date.now()}_${finalFilename}`;
		}
		return response.blob().then((blob) => ({
			blob,
			finalFilename
		}));
	}).then(({ blob, finalFilename }) => {
		const blobUrl = URL.createObjectURL(new Blob([blob]));
		const link = document.createElement("a");
		link.href = blobUrl;
		link.download = finalFilename;
		document.body.appendChild(link);
		link.click();
		URL.revokeObjectURL(blobUrl);
		link.remove();
	}).catch(handleDownloadError);
};
function getExtensionFromMimeType(mimeType) {
	if (!mimeType) return ".bin";
	return {
		"image/jpeg": ".jpg",
		"image/png": ".png",
		"image/gif": ".gif",
		"image/svg+xml": ".svg",
		"application/pdf": ".pdf",
		"text/plain": ".txt",
		"application/msword": ".doc",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx"
	}[mimeType] || ".bin";
}
function canSaveImageByDialog() {
	return typeof window !== "undefined" && typeof window.api?.file?.saveImage === "function";
}
function isImageUrl(url, filename) {
	if (url.startsWith("data:image/")) return true;
	const candidate = (filename || url.split("?")[0]).toLowerCase();
	return /\.(png|jpe?g|gif|webp|bmp|svg)$/.test(candidate);
}
async function saveImageByDialog(url, filename) {
	const { dataUrl, mimeType } = await resolveImageData(url);
	const baseName = removeExtension(resolveImageFilename(url, filename, mimeType));
	await window.api.file.saveImage(baseName, dataUrl);
}
async function resolveImageData(url) {
	if (url.startsWith("data:image/")) return {
		dataUrl: url,
		mimeType: url.match(/^data:([^;,]+)[;,]/)?.[1] ?? null
	};
	const response = await fetch(url);
	const blob = await response.blob();
	return {
		dataUrl: await blobToDataUrl(blob),
		mimeType: blob.type || response.headers.get("Content-Type")
	};
}
function resolveImageFilename(url, filename, mimeType) {
	if (filename) return filename;
	const fromUrl = url.split("/").pop()?.split("?")[0];
	if (fromUrl && fromUrl.includes(".")) return fromUrl;
	const ext = getExtensionFromMimeType(mimeType || "image/png");
	return `${Date.now()}_download${ext}`;
}
function removeExtension(name) {
	const index = name.lastIndexOf(".");
	return index > 0 ? name.slice(0, index) : name;
}
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error || /* @__PURE__ */ new Error("Failed to read blob"));
		reader.readAsDataURL(blob);
	});
}
function handleDownloadError(error) {
	logger$2.error("Download failed:", error);
	if (error?.message) window.toast?.error(`${i18n_default.t("message.download.failed")}：${error.message}`);
	else window.toast?.error(i18n_default.t("message.download.failed"));
}
var version = "3.7.7";
var VERSION = version;
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64chs = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
var b64tab = ((a$1) => {
	let tab = {};
	a$1.forEach((c$1, i$1) => tab[c$1] = i$1);
	return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s$1) => s$1.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
	let u32, c0, c1, c2, asc = "";
	const pad = bin.length % 3;
	for (let i$1 = 0; i$1 < bin.length;) {
		if ((c0 = bin.charCodeAt(i$1++)) > 255 || (c1 = bin.charCodeAt(i$1++)) > 255 || (c2 = bin.charCodeAt(i$1++)) > 255) throw new TypeError("invalid character found");
		u32 = c0 << 16 | c1 << 8 | c2;
		asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
	}
	return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
	const maxargs = 4096;
	let strs = [];
	for (let i$1 = 0, l$1 = u8a.length; i$1 < l$1; i$1 += maxargs) strs.push(_fromCC.apply(null, u8a.subarray(i$1, i$1 + maxargs)));
	return _btoa(strs.join(""));
};
var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
var cb_utob = (c$1) => {
	if (c$1.length < 2) {
		var cc = c$1.charCodeAt(0);
		return cc < 128 ? c$1 : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
	} else {
		var cc = 65536 + (c$1.charCodeAt(0) - 55296) * 1024 + (c$1.charCodeAt(1) - 56320);
		return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
	}
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s$1) => Buffer.from(s$1, "utf8").toString("base64") : _TE ? (s$1) => _fromUint8Array(_TE.encode(s$1)) : (s$1) => _btoa(utob(s$1));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var encodeURI = (src) => encode(src, true);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
	switch (cccc.length) {
		case 4:
			var offset = ((7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3)) - 65536;
			return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
		case 3: return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
		default: return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
	}
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
	asc = asc.replace(/\s+/g, "");
	if (!b64re.test(asc)) throw new TypeError("malformed base64.");
	asc += "==".slice(2 - (asc.length & 3));
	let u24, bin = "", r1, r2;
	for (let i$1 = 0; i$1 < asc.length;) {
		u24 = b64tab[asc.charAt(i$1++)] << 18 | b64tab[asc.charAt(i$1++)] << 12 | (r1 = b64tab[asc.charAt(i$1++)]) << 6 | (r2 = b64tab[asc.charAt(i$1++)]);
		bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
	}
	return bin;
};
var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a$1) => _U8Afrom(Buffer.from(a$1, "base64")) : (a$1) => _U8Afrom(_atob(a$1).split("").map((c$1) => c$1.charCodeAt(0)));
var toUint8Array = (a$1) => _toUint8Array(_unURI(a$1));
var _decode = _hasBuffer ? (a$1) => Buffer.from(a$1, "base64").toString("utf8") : _TD ? (a$1) => _TD.decode(_toUint8Array(a$1)) : (a$1) => btou(_atob(a$1));
var _unURI = (a$1) => _tidyB64(a$1.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));
var isValid = (src) => {
	if (typeof src !== "string") return false;
	const s$1 = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
	return !/[^\s0-9a-zA-Z\+/]/.test(s$1) || !/[^\s0-9a-zA-Z\-_]/.test(s$1);
};
var _noEnum = (v) => {
	return {
		value: v,
		enumerable: false,
		writable: true,
		configurable: true
	};
};
var extendString = function() {
	const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
	_add("fromBase64", function() {
		return decode(this);
	});
	_add("toBase64", function(urlsafe) {
		return encode(this, urlsafe);
	});
	_add("toBase64URI", function() {
		return encode(this, true);
	});
	_add("toBase64URL", function() {
		return encode(this, true);
	});
	_add("toUint8Array", function() {
		return toUint8Array(this);
	});
};
var extendUint8Array = function() {
	const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
	_add("toBase64", function(urlsafe) {
		return fromUint8Array(this, urlsafe);
	});
	_add("toBase64URI", function() {
		return fromUint8Array(this, true);
	});
	_add("toBase64URL", function() {
		return fromUint8Array(this, true);
	});
};
var extendBuiltins = () => {
	extendString();
	extendUint8Array();
};
var gBase64 = {
	version,
	VERSION,
	atob: _atob,
	atobPolyfill,
	btoa: _btoa,
	btoaPolyfill,
	fromBase64: decode,
	toBase64: encode,
	encode,
	encodeURI,
	encodeURL: encodeURI,
	utob,
	btou,
	decode,
	isValid,
	fromUint8Array,
	toUint8Array,
	extendString,
	extendUint8Array,
	extendBuiltins
};
var types$1 = {
	"application/prs.cww": ["cww"],
	"application/prs.xsf+xml": ["xsf"],
	"application/vnd.1000minds.decision-model+xml": ["1km"],
	"application/vnd.3gpp.pic-bw-large": ["plb"],
	"application/vnd.3gpp.pic-bw-small": ["psb"],
	"application/vnd.3gpp.pic-bw-var": ["pvb"],
	"application/vnd.3gpp2.tcap": ["tcap"],
	"application/vnd.3m.post-it-notes": ["pwn"],
	"application/vnd.accpac.simply.aso": ["aso"],
	"application/vnd.accpac.simply.imp": ["imp"],
	"application/vnd.acucobol": ["acu"],
	"application/vnd.acucorp": ["atc", "acutc"],
	"application/vnd.adobe.air-application-installer-package+zip": ["air"],
	"application/vnd.adobe.formscentral.fcdt": ["fcdt"],
	"application/vnd.adobe.fxp": ["fxp", "fxpl"],
	"application/vnd.adobe.xdp+xml": ["xdp"],
	"application/vnd.adobe.xfdf": ["*xfdf"],
	"application/vnd.age": ["age"],
	"application/vnd.ahead.space": ["ahead"],
	"application/vnd.airzip.filesecure.azf": ["azf"],
	"application/vnd.airzip.filesecure.azs": ["azs"],
	"application/vnd.amazon.ebook": ["azw"],
	"application/vnd.americandynamics.acc": ["acc"],
	"application/vnd.amiga.ami": ["ami"],
	"application/vnd.android.package-archive": ["apk"],
	"application/vnd.anser-web-certificate-issue-initiation": ["cii"],
	"application/vnd.anser-web-funds-transfer-initiation": ["fti"],
	"application/vnd.antix.game-component": ["atx"],
	"application/vnd.apple.installer+xml": ["mpkg"],
	"application/vnd.apple.keynote": ["key"],
	"application/vnd.apple.mpegurl": ["m3u8"],
	"application/vnd.apple.numbers": ["numbers"],
	"application/vnd.apple.pages": ["pages"],
	"application/vnd.apple.pkpass": ["pkpass"],
	"application/vnd.aristanetworks.swi": ["swi"],
	"application/vnd.astraea-software.iota": ["iota"],
	"application/vnd.audiograph": ["aep"],
	"application/vnd.autodesk.fbx": ["fbx"],
	"application/vnd.balsamiq.bmml+xml": ["bmml"],
	"application/vnd.blueice.multipass": ["mpm"],
	"application/vnd.bmi": ["bmi"],
	"application/vnd.businessobjects": ["rep"],
	"application/vnd.chemdraw+xml": ["cdxml"],
	"application/vnd.chipnuts.karaoke-mmd": ["mmd"],
	"application/vnd.cinderella": ["cdy"],
	"application/vnd.citationstyles.style+xml": ["csl"],
	"application/vnd.claymore": ["cla"],
	"application/vnd.cloanto.rp9": ["rp9"],
	"application/vnd.clonk.c4group": [
		"c4g",
		"c4d",
		"c4f",
		"c4p",
		"c4u"
	],
	"application/vnd.cluetrust.cartomobile-config": ["c11amc"],
	"application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
	"application/vnd.commonspace": ["csp"],
	"application/vnd.contact.cmsg": ["cdbcmsg"],
	"application/vnd.cosmocaller": ["cmc"],
	"application/vnd.crick.clicker": ["clkx"],
	"application/vnd.crick.clicker.keyboard": ["clkk"],
	"application/vnd.crick.clicker.palette": ["clkp"],
	"application/vnd.crick.clicker.template": ["clkt"],
	"application/vnd.crick.clicker.wordbank": ["clkw"],
	"application/vnd.criticaltools.wbs+xml": ["wbs"],
	"application/vnd.ctc-posml": ["pml"],
	"application/vnd.cups-ppd": ["ppd"],
	"application/vnd.curl.car": ["car"],
	"application/vnd.curl.pcurl": ["pcurl"],
	"application/vnd.dart": ["dart"],
	"application/vnd.data-vision.rdz": ["rdz"],
	"application/vnd.dbf": ["dbf"],
	"application/vnd.dcmp+xml": ["dcmp"],
	"application/vnd.dece.data": [
		"uvf",
		"uvvf",
		"uvd",
		"uvvd"
	],
	"application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
	"application/vnd.dece.unspecified": ["uvx", "uvvx"],
	"application/vnd.dece.zip": ["uvz", "uvvz"],
	"application/vnd.denovo.fcselayout-link": ["fe_launch"],
	"application/vnd.dna": ["dna"],
	"application/vnd.dolby.mlp": ["mlp"],
	"application/vnd.dpgraph": ["dpg"],
	"application/vnd.dreamfactory": ["dfac"],
	"application/vnd.ds-keypoint": ["kpxx"],
	"application/vnd.dvb.ait": ["ait"],
	"application/vnd.dvb.service": ["svc"],
	"application/vnd.dynageo": ["geo"],
	"application/vnd.ecowin.chart": ["mag"],
	"application/vnd.enliven": ["nml"],
	"application/vnd.epson.esf": ["esf"],
	"application/vnd.epson.msf": ["msf"],
	"application/vnd.epson.quickanime": ["qam"],
	"application/vnd.epson.salt": ["slt"],
	"application/vnd.epson.ssf": ["ssf"],
	"application/vnd.eszigno3+xml": ["es3", "et3"],
	"application/vnd.ezpix-album": ["ez2"],
	"application/vnd.ezpix-package": ["ez3"],
	"application/vnd.fdf": ["*fdf"],
	"application/vnd.fdsn.mseed": ["mseed"],
	"application/vnd.fdsn.seed": ["seed", "dataless"],
	"application/vnd.flographit": ["gph"],
	"application/vnd.fluxtime.clip": ["ftc"],
	"application/vnd.framemaker": [
		"fm",
		"frame",
		"maker",
		"book"
	],
	"application/vnd.frogans.fnc": ["fnc"],
	"application/vnd.frogans.ltf": ["ltf"],
	"application/vnd.fsc.weblaunch": ["fsc"],
	"application/vnd.fujitsu.oasys": ["oas"],
	"application/vnd.fujitsu.oasys2": ["oa2"],
	"application/vnd.fujitsu.oasys3": ["oa3"],
	"application/vnd.fujitsu.oasysgp": ["fg5"],
	"application/vnd.fujitsu.oasysprs": ["bh2"],
	"application/vnd.fujixerox.ddd": ["ddd"],
	"application/vnd.fujixerox.docuworks": ["xdw"],
	"application/vnd.fujixerox.docuworks.binder": ["xbd"],
	"application/vnd.fuzzysheet": ["fzs"],
	"application/vnd.genomatix.tuxedo": ["txd"],
	"application/vnd.geogebra.file": ["ggb"],
	"application/vnd.geogebra.slides": ["ggs"],
	"application/vnd.geogebra.tool": ["ggt"],
	"application/vnd.geometry-explorer": ["gex", "gre"],
	"application/vnd.geonext": ["gxt"],
	"application/vnd.geoplan": ["g2w"],
	"application/vnd.geospace": ["g3w"],
	"application/vnd.gmx": ["gmx"],
	"application/vnd.google-apps.document": ["gdoc"],
	"application/vnd.google-apps.drawing": ["gdraw"],
	"application/vnd.google-apps.form": ["gform"],
	"application/vnd.google-apps.jam": ["gjam"],
	"application/vnd.google-apps.map": ["gmap"],
	"application/vnd.google-apps.presentation": ["gslides"],
	"application/vnd.google-apps.script": ["gscript"],
	"application/vnd.google-apps.site": ["gsite"],
	"application/vnd.google-apps.spreadsheet": ["gsheet"],
	"application/vnd.google-earth.kml+xml": ["kml"],
	"application/vnd.google-earth.kmz": ["kmz"],
	"application/vnd.gov.sk.xmldatacontainer+xml": ["xdcf"],
	"application/vnd.grafeq": ["gqf", "gqs"],
	"application/vnd.groove-account": ["gac"],
	"application/vnd.groove-help": ["ghf"],
	"application/vnd.groove-identity-message": ["gim"],
	"application/vnd.groove-injector": ["grv"],
	"application/vnd.groove-tool-message": ["gtm"],
	"application/vnd.groove-tool-template": ["tpl"],
	"application/vnd.groove-vcard": ["vcg"],
	"application/vnd.hal+xml": ["hal"],
	"application/vnd.handheld-entertainment+xml": ["zmm"],
	"application/vnd.hbci": ["hbci"],
	"application/vnd.hhe.lesson-player": ["les"],
	"application/vnd.hp-hpgl": ["hpgl"],
	"application/vnd.hp-hpid": ["hpid"],
	"application/vnd.hp-hps": ["hps"],
	"application/vnd.hp-jlyt": ["jlt"],
	"application/vnd.hp-pcl": ["pcl"],
	"application/vnd.hp-pclxl": ["pclxl"],
	"application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
	"application/vnd.ibm.minipay": ["mpy"],
	"application/vnd.ibm.modcap": [
		"afp",
		"listafp",
		"list3820"
	],
	"application/vnd.ibm.rights-management": ["irm"],
	"application/vnd.ibm.secure-container": ["sc"],
	"application/vnd.iccprofile": ["icc", "icm"],
	"application/vnd.igloader": ["igl"],
	"application/vnd.immervision-ivp": ["ivp"],
	"application/vnd.immervision-ivu": ["ivu"],
	"application/vnd.insors.igm": ["igm"],
	"application/vnd.intercon.formnet": ["xpw", "xpx"],
	"application/vnd.intergeo": ["i2g"],
	"application/vnd.intu.qbo": ["qbo"],
	"application/vnd.intu.qfx": ["qfx"],
	"application/vnd.ipunplugged.rcprofile": ["rcprofile"],
	"application/vnd.irepository.package+xml": ["irp"],
	"application/vnd.is-xpr": ["xpr"],
	"application/vnd.isac.fcs": ["fcs"],
	"application/vnd.jam": ["jam"],
	"application/vnd.jcp.javame.midlet-rms": ["rms"],
	"application/vnd.jisp": ["jisp"],
	"application/vnd.joost.joda-archive": ["joda"],
	"application/vnd.kahootz": ["ktz", "ktr"],
	"application/vnd.kde.karbon": ["karbon"],
	"application/vnd.kde.kchart": ["chrt"],
	"application/vnd.kde.kformula": ["kfo"],
	"application/vnd.kde.kivio": ["flw"],
	"application/vnd.kde.kontour": ["kon"],
	"application/vnd.kde.kpresenter": ["kpr", "kpt"],
	"application/vnd.kde.kspread": ["ksp"],
	"application/vnd.kde.kword": ["kwd", "kwt"],
	"application/vnd.kenameaapp": ["htke"],
	"application/vnd.kidspiration": ["kia"],
	"application/vnd.kinar": ["kne", "knp"],
	"application/vnd.koan": [
		"skp",
		"skd",
		"skt",
		"skm"
	],
	"application/vnd.kodak-descriptor": ["sse"],
	"application/vnd.las.las+xml": ["lasxml"],
	"application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
	"application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
	"application/vnd.lotus-1-2-3": ["123"],
	"application/vnd.lotus-approach": ["apr"],
	"application/vnd.lotus-freelance": ["pre"],
	"application/vnd.lotus-notes": ["nsf"],
	"application/vnd.lotus-organizer": ["org"],
	"application/vnd.lotus-screencam": ["scm"],
	"application/vnd.lotus-wordpro": ["lwp"],
	"application/vnd.macports.portpkg": ["portpkg"],
	"application/vnd.mapbox-vector-tile": ["mvt"],
	"application/vnd.mcd": ["mcd"],
	"application/vnd.medcalcdata": ["mc1"],
	"application/vnd.mediastation.cdkey": ["cdkey"],
	"application/vnd.mfer": ["mwf"],
	"application/vnd.mfmp": ["mfm"],
	"application/vnd.micrografx.flo": ["flo"],
	"application/vnd.micrografx.igx": ["igx"],
	"application/vnd.mif": ["mif"],
	"application/vnd.mobius.daf": ["daf"],
	"application/vnd.mobius.dis": ["dis"],
	"application/vnd.mobius.mbk": ["mbk"],
	"application/vnd.mobius.mqy": ["mqy"],
	"application/vnd.mobius.msl": ["msl"],
	"application/vnd.mobius.plc": ["plc"],
	"application/vnd.mobius.txf": ["txf"],
	"application/vnd.mophun.application": ["mpn"],
	"application/vnd.mophun.certificate": ["mpc"],
	"application/vnd.mozilla.xul+xml": ["xul"],
	"application/vnd.ms-artgalry": ["cil"],
	"application/vnd.ms-cab-compressed": ["cab"],
	"application/vnd.ms-excel": [
		"xls",
		"xlm",
		"xla",
		"xlc",
		"xlt",
		"xlw"
	],
	"application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
	"application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
	"application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
	"application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
	"application/vnd.ms-fontobject": ["eot"],
	"application/vnd.ms-htmlhelp": ["chm"],
	"application/vnd.ms-ims": ["ims"],
	"application/vnd.ms-lrm": ["lrm"],
	"application/vnd.ms-officetheme": ["thmx"],
	"application/vnd.ms-outlook": ["msg"],
	"application/vnd.ms-pki.seccat": ["cat"],
	"application/vnd.ms-pki.stl": ["*stl"],
	"application/vnd.ms-powerpoint": [
		"ppt",
		"pps",
		"pot"
	],
	"application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
	"application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
	"application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
	"application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
	"application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
	"application/vnd.ms-project": ["*mpp", "mpt"],
	"application/vnd.ms-visio.viewer": ["vdx"],
	"application/vnd.ms-word.document.macroenabled.12": ["docm"],
	"application/vnd.ms-word.template.macroenabled.12": ["dotm"],
	"application/vnd.ms-works": [
		"wps",
		"wks",
		"wcm",
		"wdb"
	],
	"application/vnd.ms-wpl": ["wpl"],
	"application/vnd.ms-xpsdocument": ["xps"],
	"application/vnd.mseq": ["mseq"],
	"application/vnd.musician": ["mus"],
	"application/vnd.muvee.style": ["msty"],
	"application/vnd.mynfc": ["taglet"],
	"application/vnd.nato.bindingdataobject+xml": ["bdo"],
	"application/vnd.neurolanguage.nlu": ["nlu"],
	"application/vnd.nitf": ["ntf", "nitf"],
	"application/vnd.noblenet-directory": ["nnd"],
	"application/vnd.noblenet-sealer": ["nns"],
	"application/vnd.noblenet-web": ["nnw"],
	"application/vnd.nokia.n-gage.ac+xml": ["*ac"],
	"application/vnd.nokia.n-gage.data": ["ngdat"],
	"application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
	"application/vnd.nokia.radio-preset": ["rpst"],
	"application/vnd.nokia.radio-presets": ["rpss"],
	"application/vnd.novadigm.edm": ["edm"],
	"application/vnd.novadigm.edx": ["edx"],
	"application/vnd.novadigm.ext": ["ext"],
	"application/vnd.oasis.opendocument.chart": ["odc"],
	"application/vnd.oasis.opendocument.chart-template": ["otc"],
	"application/vnd.oasis.opendocument.database": ["odb"],
	"application/vnd.oasis.opendocument.formula": ["odf"],
	"application/vnd.oasis.opendocument.formula-template": ["odft"],
	"application/vnd.oasis.opendocument.graphics": ["odg"],
	"application/vnd.oasis.opendocument.graphics-template": ["otg"],
	"application/vnd.oasis.opendocument.image": ["odi"],
	"application/vnd.oasis.opendocument.image-template": ["oti"],
	"application/vnd.oasis.opendocument.presentation": ["odp"],
	"application/vnd.oasis.opendocument.presentation-template": ["otp"],
	"application/vnd.oasis.opendocument.spreadsheet": ["ods"],
	"application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
	"application/vnd.oasis.opendocument.text": ["odt"],
	"application/vnd.oasis.opendocument.text-master": ["odm"],
	"application/vnd.oasis.opendocument.text-template": ["ott"],
	"application/vnd.oasis.opendocument.text-web": ["oth"],
	"application/vnd.olpc-sugar": ["xo"],
	"application/vnd.oma.dd2+xml": ["dd2"],
	"application/vnd.openblox.game+xml": ["obgx"],
	"application/vnd.openofficeorg.extension": ["oxt"],
	"application/vnd.openstreetmap.data+xml": ["osm"],
	"application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"],
	"application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"],
	"application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"],
	"application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"],
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"],
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"],
	"application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"],
	"application/vnd.osgeo.mapguide.package": ["mgp"],
	"application/vnd.osgi.dp": ["dp"],
	"application/vnd.osgi.subsystem": ["esa"],
	"application/vnd.palm": [
		"pdb",
		"pqa",
		"oprc"
	],
	"application/vnd.pawaafile": ["paw"],
	"application/vnd.pg.format": ["str"],
	"application/vnd.pg.osasli": ["ei6"],
	"application/vnd.picsel": ["efif"],
	"application/vnd.pmi.widget": ["wg"],
	"application/vnd.pocketlearn": ["plf"],
	"application/vnd.powerbuilder6": ["pbd"],
	"application/vnd.previewsystems.box": ["box"],
	"application/vnd.procrate.brushset": ["brushset"],
	"application/vnd.procreate.brush": ["brush"],
	"application/vnd.procreate.dream": ["drm"],
	"application/vnd.proteus.magazine": ["mgz"],
	"application/vnd.publishare-delta-tree": ["qps"],
	"application/vnd.pvi.ptid1": ["ptid"],
	"application/vnd.pwg-xhtml-print+xml": ["xhtm"],
	"application/vnd.quark.quarkxpress": [
		"qxd",
		"qxt",
		"qwd",
		"qwt",
		"qxl",
		"qxb"
	],
	"application/vnd.rar": ["rar"],
	"application/vnd.realvnc.bed": ["bed"],
	"application/vnd.recordare.musicxml": ["mxl"],
	"application/vnd.recordare.musicxml+xml": ["musicxml"],
	"application/vnd.rig.cryptonote": ["cryptonote"],
	"application/vnd.rim.cod": ["cod"],
	"application/vnd.rn-realmedia": ["rm"],
	"application/vnd.rn-realmedia-vbr": ["rmvb"],
	"application/vnd.route66.link66+xml": ["link66"],
	"application/vnd.sailingtracker.track": ["st"],
	"application/vnd.seemail": ["see"],
	"application/vnd.sema": ["sema"],
	"application/vnd.semd": ["semd"],
	"application/vnd.semf": ["semf"],
	"application/vnd.shana.informed.formdata": ["ifm"],
	"application/vnd.shana.informed.formtemplate": ["itp"],
	"application/vnd.shana.informed.interchange": ["iif"],
	"application/vnd.shana.informed.package": ["ipk"],
	"application/vnd.simtech-mindmapper": ["twd", "twds"],
	"application/vnd.smaf": ["mmf"],
	"application/vnd.smart.teacher": ["teacher"],
	"application/vnd.software602.filler.form+xml": ["fo"],
	"application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
	"application/vnd.spotfire.dxp": ["dxp"],
	"application/vnd.spotfire.sfs": ["sfs"],
	"application/vnd.stardivision.calc": ["sdc"],
	"application/vnd.stardivision.draw": ["sda"],
	"application/vnd.stardivision.impress": ["sdd"],
	"application/vnd.stardivision.math": ["smf"],
	"application/vnd.stardivision.writer": ["sdw", "vor"],
	"application/vnd.stardivision.writer-global": ["sgl"],
	"application/vnd.stepmania.package": ["smzip"],
	"application/vnd.stepmania.stepchart": ["sm"],
	"application/vnd.sun.wadl+xml": ["wadl"],
	"application/vnd.sun.xml.calc": ["sxc"],
	"application/vnd.sun.xml.calc.template": ["stc"],
	"application/vnd.sun.xml.draw": ["sxd"],
	"application/vnd.sun.xml.draw.template": ["std"],
	"application/vnd.sun.xml.impress": ["sxi"],
	"application/vnd.sun.xml.impress.template": ["sti"],
	"application/vnd.sun.xml.math": ["sxm"],
	"application/vnd.sun.xml.writer": ["sxw"],
	"application/vnd.sun.xml.writer.global": ["sxg"],
	"application/vnd.sun.xml.writer.template": ["stw"],
	"application/vnd.sus-calendar": ["sus", "susp"],
	"application/vnd.svd": ["svd"],
	"application/vnd.symbian.install": ["sis", "sisx"],
	"application/vnd.syncml+xml": ["xsm"],
	"application/vnd.syncml.dm+wbxml": ["bdm"],
	"application/vnd.syncml.dm+xml": ["xdm"],
	"application/vnd.syncml.dmddf+xml": ["ddf"],
	"application/vnd.tao.intent-module-archive": ["tao"],
	"application/vnd.tcpdump.pcap": [
		"pcap",
		"cap",
		"dmp"
	],
	"application/vnd.tmobile-livetv": ["tmo"],
	"application/vnd.trid.tpt": ["tpt"],
	"application/vnd.triscape.mxs": ["mxs"],
	"application/vnd.trueapp": ["tra"],
	"application/vnd.ufdl": ["ufd", "ufdl"],
	"application/vnd.uiq.theme": ["utz"],
	"application/vnd.umajin": ["umj"],
	"application/vnd.unity": ["unityweb"],
	"application/vnd.uoml+xml": ["uoml", "uo"],
	"application/vnd.vcx": ["vcx"],
	"application/vnd.visio": [
		"vsd",
		"vst",
		"vss",
		"vsw",
		"vsdx",
		"vtx"
	],
	"application/vnd.visionary": ["vis"],
	"application/vnd.vsf": ["vsf"],
	"application/vnd.wap.wbxml": ["wbxml"],
	"application/vnd.wap.wmlc": ["wmlc"],
	"application/vnd.wap.wmlscriptc": ["wmlsc"],
	"application/vnd.webturbo": ["wtb"],
	"application/vnd.wolfram.player": ["nbp"],
	"application/vnd.wordperfect": ["wpd"],
	"application/vnd.wqd": ["wqd"],
	"application/vnd.wt.stf": ["stf"],
	"application/vnd.xara": ["xar"],
	"application/vnd.xfdl": ["xfdl"],
	"application/vnd.yamaha.hv-dic": ["hvd"],
	"application/vnd.yamaha.hv-script": ["hvs"],
	"application/vnd.yamaha.hv-voice": ["hvp"],
	"application/vnd.yamaha.openscoreformat": ["osf"],
	"application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
	"application/vnd.yamaha.smaf-audio": ["saf"],
	"application/vnd.yamaha.smaf-phrase": ["spf"],
	"application/vnd.yellowriver-custom-menu": ["cmp"],
	"application/vnd.zul": ["zir", "zirz"],
	"application/vnd.zzazz.deck+xml": ["zaz"],
	"application/x-7z-compressed": ["7z"],
	"application/x-abiword": ["abw"],
	"application/x-ace-compressed": ["ace"],
	"application/x-apple-diskimage": ["*dmg"],
	"application/x-arj": ["arj"],
	"application/x-authorware-bin": [
		"aab",
		"x32",
		"u32",
		"vox"
	],
	"application/x-authorware-map": ["aam"],
	"application/x-authorware-seg": ["aas"],
	"application/x-bcpio": ["bcpio"],
	"application/x-bdoc": ["*bdoc"],
	"application/x-bittorrent": ["torrent"],
	"application/x-blender": ["blend"],
	"application/x-blorb": ["blb", "blorb"],
	"application/x-bzip": ["bz"],
	"application/x-bzip2": ["bz2", "boz"],
	"application/x-cbr": [
		"cbr",
		"cba",
		"cbt",
		"cbz",
		"cb7"
	],
	"application/x-cdlink": ["vcd"],
	"application/x-cfs-compressed": ["cfs"],
	"application/x-chat": ["chat"],
	"application/x-chess-pgn": ["pgn"],
	"application/x-chrome-extension": ["crx"],
	"application/x-cocoa": ["cco"],
	"application/x-compressed": ["*rar"],
	"application/x-conference": ["nsc"],
	"application/x-cpio": ["cpio"],
	"application/x-csh": ["csh"],
	"application/x-debian-package": ["*deb", "udeb"],
	"application/x-dgc-compressed": ["dgc"],
	"application/x-director": [
		"dir",
		"dcr",
		"dxr",
		"cst",
		"cct",
		"cxt",
		"w3d",
		"fgd",
		"swa"
	],
	"application/x-doom": ["wad"],
	"application/x-dtbncx+xml": ["ncx"],
	"application/x-dtbook+xml": ["dtb"],
	"application/x-dtbresource+xml": ["res"],
	"application/x-dvi": ["dvi"],
	"application/x-envoy": ["evy"],
	"application/x-eva": ["eva"],
	"application/x-font-bdf": ["bdf"],
	"application/x-font-ghostscript": ["gsf"],
	"application/x-font-linux-psf": ["psf"],
	"application/x-font-pcf": ["pcf"],
	"application/x-font-snf": ["snf"],
	"application/x-font-type1": [
		"pfa",
		"pfb",
		"pfm",
		"afm"
	],
	"application/x-freearc": ["arc"],
	"application/x-futuresplash": ["spl"],
	"application/x-gca-compressed": ["gca"],
	"application/x-glulx": ["ulx"],
	"application/x-gnumeric": ["gnumeric"],
	"application/x-gramps-xml": ["gramps"],
	"application/x-gtar": ["gtar"],
	"application/x-hdf": ["hdf"],
	"application/x-httpd-php": ["php"],
	"application/x-install-instructions": ["install"],
	"application/x-ipynb+json": ["ipynb"],
	"application/x-iso9660-image": ["*iso"],
	"application/x-iwork-keynote-sffkey": ["*key"],
	"application/x-iwork-numbers-sffnumbers": ["*numbers"],
	"application/x-iwork-pages-sffpages": ["*pages"],
	"application/x-java-archive-diff": ["jardiff"],
	"application/x-java-jnlp-file": ["jnlp"],
	"application/x-keepass2": ["kdbx"],
	"application/x-latex": ["latex"],
	"application/x-lua-bytecode": ["luac"],
	"application/x-lzh-compressed": ["lzh", "lha"],
	"application/x-makeself": ["run"],
	"application/x-mie": ["mie"],
	"application/x-mobipocket-ebook": ["*prc", "mobi"],
	"application/x-ms-application": ["application"],
	"application/x-ms-shortcut": ["lnk"],
	"application/x-ms-wmd": ["wmd"],
	"application/x-ms-wmz": ["wmz"],
	"application/x-ms-xbap": ["xbap"],
	"application/x-msaccess": ["mdb"],
	"application/x-msbinder": ["obd"],
	"application/x-mscardfile": ["crd"],
	"application/x-msclip": ["clp"],
	"application/x-msdos-program": ["*exe"],
	"application/x-msdownload": [
		"*exe",
		"*dll",
		"com",
		"bat",
		"*msi"
	],
	"application/x-msmediaview": [
		"mvb",
		"m13",
		"m14"
	],
	"application/x-msmetafile": [
		"*wmf",
		"*wmz",
		"*emf",
		"emz"
	],
	"application/x-msmoney": ["mny"],
	"application/x-mspublisher": ["pub"],
	"application/x-msschedule": ["scd"],
	"application/x-msterminal": ["trm"],
	"application/x-mswrite": ["wri"],
	"application/x-netcdf": ["nc", "cdf"],
	"application/x-ns-proxy-autoconfig": ["pac"],
	"application/x-nzb": ["nzb"],
	"application/x-perl": ["pl", "pm"],
	"application/x-pilot": ["*prc", "*pdb"],
	"application/x-pkcs12": ["p12", "pfx"],
	"application/x-pkcs7-certificates": ["p7b", "spc"],
	"application/x-pkcs7-certreqresp": ["p7r"],
	"application/x-rar-compressed": ["*rar"],
	"application/x-redhat-package-manager": ["rpm"],
	"application/x-research-info-systems": ["ris"],
	"application/x-sea": ["sea"],
	"application/x-sh": ["sh"],
	"application/x-shar": ["shar"],
	"application/x-shockwave-flash": ["swf"],
	"application/x-silverlight-app": ["xap"],
	"application/x-sql": ["*sql"],
	"application/x-stuffit": ["sit"],
	"application/x-stuffitx": ["sitx"],
	"application/x-subrip": ["srt"],
	"application/x-sv4cpio": ["sv4cpio"],
	"application/x-sv4crc": ["sv4crc"],
	"application/x-t3vm-image": ["t3"],
	"application/x-tads": ["gam"],
	"application/x-tar": ["tar"],
	"application/x-tcl": ["tcl", "tk"],
	"application/x-tex": ["tex"],
	"application/x-tex-tfm": ["tfm"],
	"application/x-texinfo": ["texinfo", "texi"],
	"application/x-tgif": ["*obj"],
	"application/x-ustar": ["ustar"],
	"application/x-virtualbox-hdd": ["hdd"],
	"application/x-virtualbox-ova": ["ova"],
	"application/x-virtualbox-ovf": ["ovf"],
	"application/x-virtualbox-vbox": ["vbox"],
	"application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
	"application/x-virtualbox-vdi": ["vdi"],
	"application/x-virtualbox-vhd": ["vhd"],
	"application/x-virtualbox-vmdk": ["vmdk"],
	"application/x-wais-source": ["src"],
	"application/x-web-app-manifest+json": ["webapp"],
	"application/x-x509-ca-cert": [
		"der",
		"crt",
		"pem"
	],
	"application/x-xfig": ["fig"],
	"application/x-xliff+xml": ["*xlf"],
	"application/x-xpinstall": ["xpi"],
	"application/x-xz": ["xz"],
	"application/x-zip-compressed": ["*zip"],
	"application/x-zmachine": [
		"z1",
		"z2",
		"z3",
		"z4",
		"z5",
		"z6",
		"z7",
		"z8"
	],
	"audio/vnd.dece.audio": ["uva", "uvva"],
	"audio/vnd.digital-winds": ["eol"],
	"audio/vnd.dra": ["dra"],
	"audio/vnd.dts": ["dts"],
	"audio/vnd.dts.hd": ["dtshd"],
	"audio/vnd.lucent.voice": ["lvp"],
	"audio/vnd.ms-playready.media.pya": ["pya"],
	"audio/vnd.nuera.ecelp4800": ["ecelp4800"],
	"audio/vnd.nuera.ecelp7470": ["ecelp7470"],
	"audio/vnd.nuera.ecelp9600": ["ecelp9600"],
	"audio/vnd.rip": ["rip"],
	"audio/x-aac": ["*aac"],
	"audio/x-aiff": [
		"aif",
		"aiff",
		"aifc"
	],
	"audio/x-caf": ["caf"],
	"audio/x-flac": ["flac"],
	"audio/x-m4a": ["*m4a"],
	"audio/x-matroska": ["mka"],
	"audio/x-mpegurl": ["m3u"],
	"audio/x-ms-wax": ["wax"],
	"audio/x-ms-wma": ["wma"],
	"audio/x-pn-realaudio": ["ram", "ra"],
	"audio/x-pn-realaudio-plugin": ["rmp"],
	"audio/x-realaudio": ["*ra"],
	"audio/x-wav": ["*wav"],
	"chemical/x-cdx": ["cdx"],
	"chemical/x-cif": ["cif"],
	"chemical/x-cmdf": ["cmdf"],
	"chemical/x-cml": ["cml"],
	"chemical/x-csml": ["csml"],
	"chemical/x-xyz": ["xyz"],
	"image/prs.btif": ["btif", "btf"],
	"image/prs.pti": ["pti"],
	"image/vnd.adobe.photoshop": ["psd"],
	"image/vnd.airzip.accelerator.azv": ["azv"],
	"image/vnd.blockfact.facti": ["facti"],
	"image/vnd.dece.graphic": [
		"uvi",
		"uvvi",
		"uvg",
		"uvvg"
	],
	"image/vnd.djvu": ["djvu", "djv"],
	"image/vnd.dvb.subtitle": ["*sub"],
	"image/vnd.dwg": ["dwg"],
	"image/vnd.dxf": ["dxf"],
	"image/vnd.fastbidsheet": ["fbs"],
	"image/vnd.fpx": ["fpx"],
	"image/vnd.fst": ["fst"],
	"image/vnd.fujixerox.edmics-mmr": ["mmr"],
	"image/vnd.fujixerox.edmics-rlc": ["rlc"],
	"image/vnd.microsoft.icon": ["ico"],
	"image/vnd.ms-dds": ["dds"],
	"image/vnd.ms-modi": ["mdi"],
	"image/vnd.ms-photo": ["wdp"],
	"image/vnd.net-fpx": ["npx"],
	"image/vnd.pco.b16": ["b16"],
	"image/vnd.tencent.tap": ["tap"],
	"image/vnd.valve.source.texture": ["vtf"],
	"image/vnd.wap.wbmp": ["wbmp"],
	"image/vnd.xiff": ["xif"],
	"image/vnd.zbrush.pcx": ["pcx"],
	"image/x-3ds": ["3ds"],
	"image/x-adobe-dng": ["dng"],
	"image/x-cmu-raster": ["ras"],
	"image/x-cmx": ["cmx"],
	"image/x-freehand": [
		"fh",
		"fhc",
		"fh4",
		"fh5",
		"fh7"
	],
	"image/x-icon": ["*ico"],
	"image/x-jng": ["jng"],
	"image/x-mrsid-image": ["sid"],
	"image/x-ms-bmp": ["*bmp"],
	"image/x-pcx": ["*pcx"],
	"image/x-pict": ["pic", "pct"],
	"image/x-portable-anymap": ["pnm"],
	"image/x-portable-bitmap": ["pbm"],
	"image/x-portable-graymap": ["pgm"],
	"image/x-portable-pixmap": ["ppm"],
	"image/x-rgb": ["rgb"],
	"image/x-tga": ["tga"],
	"image/x-xbitmap": ["xbm"],
	"image/x-xpixmap": ["xpm"],
	"image/x-xwindowdump": ["xwd"],
	"message/vnd.wfa.wsc": ["wsc"],
	"model/vnd.bary": ["bary"],
	"model/vnd.cld": ["cld"],
	"model/vnd.collada+xml": ["dae"],
	"model/vnd.dwf": ["dwf"],
	"model/vnd.gdl": ["gdl"],
	"model/vnd.gtw": ["gtw"],
	"model/vnd.mts": ["*mts"],
	"model/vnd.opengex": ["ogex"],
	"model/vnd.parasolid.transmit.binary": ["x_b"],
	"model/vnd.parasolid.transmit.text": ["x_t"],
	"model/vnd.pytha.pyox": ["pyo", "pyox"],
	"model/vnd.sap.vds": ["vds"],
	"model/vnd.usda": ["usda"],
	"model/vnd.usdz+zip": ["usdz"],
	"model/vnd.valve.source.compiled-map": ["bsp"],
	"model/vnd.vtu": ["vtu"],
	"text/prs.lines.tag": ["dsc"],
	"text/vnd.curl": ["curl"],
	"text/vnd.curl.dcurl": ["dcurl"],
	"text/vnd.curl.mcurl": ["mcurl"],
	"text/vnd.curl.scurl": ["scurl"],
	"text/vnd.dvb.subtitle": ["sub"],
	"text/vnd.familysearch.gedcom": ["ged"],
	"text/vnd.fly": ["fly"],
	"text/vnd.fmi.flexstor": ["flx"],
	"text/vnd.graphviz": ["gv"],
	"text/vnd.in3d.3dml": ["3dml"],
	"text/vnd.in3d.spot": ["spot"],
	"text/vnd.sun.j2me.app-descriptor": ["jad"],
	"text/vnd.wap.wml": ["wml"],
	"text/vnd.wap.wmlscript": ["wmls"],
	"text/x-asm": ["s", "asm"],
	"text/x-c": [
		"c",
		"cc",
		"cxx",
		"cpp",
		"h",
		"hh",
		"dic"
	],
	"text/x-component": ["htc"],
	"text/x-fortran": [
		"f",
		"for",
		"f77",
		"f90"
	],
	"text/x-handlebars-template": ["hbs"],
	"text/x-java-source": ["java"],
	"text/x-lua": ["lua"],
	"text/x-markdown": ["mkd"],
	"text/x-nfo": ["nfo"],
	"text/x-opml": ["opml"],
	"text/x-org": ["*org"],
	"text/x-pascal": ["p", "pas"],
	"text/x-processing": ["pde"],
	"text/x-sass": ["sass"],
	"text/x-scss": ["scss"],
	"text/x-setext": ["etx"],
	"text/x-sfv": ["sfv"],
	"text/x-suse-ymp": ["ymp"],
	"text/x-uuencode": ["uu"],
	"text/x-vcalendar": ["vcs"],
	"text/x-vcard": ["vcf"],
	"video/vnd.dece.hd": ["uvh", "uvvh"],
	"video/vnd.dece.mobile": ["uvm", "uvvm"],
	"video/vnd.dece.pd": ["uvp", "uvvp"],
	"video/vnd.dece.sd": ["uvs", "uvvs"],
	"video/vnd.dece.video": ["uvv", "uvvv"],
	"video/vnd.dvb.file": ["dvb"],
	"video/vnd.fvt": ["fvt"],
	"video/vnd.mpegurl": ["mxu", "m4u"],
	"video/vnd.ms-playready.media.pyv": ["pyv"],
	"video/vnd.uvvu.mp4": ["uvu", "uvvu"],
	"video/vnd.vivo": ["viv"],
	"video/x-f4v": ["f4v"],
	"video/x-fli": ["fli"],
	"video/x-flv": ["flv"],
	"video/x-m4v": ["m4v"],
	"video/x-matroska": [
		"mkv",
		"mk3d",
		"mks"
	],
	"video/x-mng": ["mng"],
	"video/x-ms-asf": ["asf", "asx"],
	"video/x-ms-vob": ["vob"],
	"video/x-ms-wm": ["wm"],
	"video/x-ms-wmv": ["wmv"],
	"video/x-ms-wmx": ["wmx"],
	"video/x-ms-wvx": ["wvx"],
	"video/x-msvideo": ["avi"],
	"video/x-sgi-movie": ["movie"],
	"video/x-smv": ["smv"],
	"x-conference/x-cooltalk": ["ice"]
};
Object.freeze(types$1);
var other_default = types$1;
var types = {
	"application/andrew-inset": ["ez"],
	"application/appinstaller": ["appinstaller"],
	"application/applixware": ["aw"],
	"application/appx": ["appx"],
	"application/appxbundle": ["appxbundle"],
	"application/atom+xml": ["atom"],
	"application/atomcat+xml": ["atomcat"],
	"application/atomdeleted+xml": ["atomdeleted"],
	"application/atomsvc+xml": ["atomsvc"],
	"application/atsc-dwd+xml": ["dwd"],
	"application/atsc-held+xml": ["held"],
	"application/atsc-rsat+xml": ["rsat"],
	"application/automationml-aml+xml": ["aml"],
	"application/automationml-amlx+zip": ["amlx"],
	"application/bdoc": ["bdoc"],
	"application/calendar+xml": ["xcs"],
	"application/ccxml+xml": ["ccxml"],
	"application/cdfx+xml": ["cdfx"],
	"application/cdmi-capability": ["cdmia"],
	"application/cdmi-container": ["cdmic"],
	"application/cdmi-domain": ["cdmid"],
	"application/cdmi-object": ["cdmio"],
	"application/cdmi-queue": ["cdmiq"],
	"application/cpl+xml": ["cpl"],
	"application/cu-seeme": ["cu"],
	"application/cwl": ["cwl"],
	"application/dash+xml": ["mpd"],
	"application/dash-patch+xml": ["mpp"],
	"application/davmount+xml": ["davmount"],
	"application/dicom": ["dcm"],
	"application/docbook+xml": ["dbk"],
	"application/dssc+der": ["dssc"],
	"application/dssc+xml": ["xdssc"],
	"application/ecmascript": ["ecma"],
	"application/emma+xml": ["emma"],
	"application/emotionml+xml": ["emotionml"],
	"application/epub+zip": ["epub"],
	"application/exi": ["exi"],
	"application/express": ["exp"],
	"application/fdf": ["fdf"],
	"application/fdt+xml": ["fdt"],
	"application/font-tdpfr": ["pfr"],
	"application/geo+json": ["geojson"],
	"application/gml+xml": ["gml"],
	"application/gpx+xml": ["gpx"],
	"application/gxf": ["gxf"],
	"application/gzip": ["gz"],
	"application/hjson": ["hjson"],
	"application/hyperstudio": ["stk"],
	"application/inkml+xml": ["ink", "inkml"],
	"application/ipfix": ["ipfix"],
	"application/its+xml": ["its"],
	"application/java-archive": [
		"jar",
		"war",
		"ear"
	],
	"application/java-serialized-object": ["ser"],
	"application/java-vm": ["class"],
	"application/javascript": ["*js"],
	"application/json": ["json", "map"],
	"application/json5": ["json5"],
	"application/jsonml+json": ["jsonml"],
	"application/ld+json": ["jsonld"],
	"application/lgr+xml": ["lgr"],
	"application/lost+xml": ["lostxml"],
	"application/mac-binhex40": ["hqx"],
	"application/mac-compactpro": ["cpt"],
	"application/mads+xml": ["mads"],
	"application/manifest+json": ["webmanifest"],
	"application/marc": ["mrc"],
	"application/marcxml+xml": ["mrcx"],
	"application/mathematica": [
		"ma",
		"nb",
		"mb"
	],
	"application/mathml+xml": ["mathml"],
	"application/mbox": ["mbox"],
	"application/media-policy-dataset+xml": ["mpf"],
	"application/mediaservercontrol+xml": ["mscml"],
	"application/metalink+xml": ["metalink"],
	"application/metalink4+xml": ["meta4"],
	"application/mets+xml": ["mets"],
	"application/mmt-aei+xml": ["maei"],
	"application/mmt-usd+xml": ["musd"],
	"application/mods+xml": ["mods"],
	"application/mp21": ["m21", "mp21"],
	"application/mp4": [
		"*mp4",
		"*mpg4",
		"mp4s",
		"m4p"
	],
	"application/msix": ["msix"],
	"application/msixbundle": ["msixbundle"],
	"application/msword": ["doc", "dot"],
	"application/mxf": ["mxf"],
	"application/n-quads": ["nq"],
	"application/n-triples": ["nt"],
	"application/node": ["cjs"],
	"application/octet-stream": [
		"bin",
		"dms",
		"lrf",
		"mar",
		"so",
		"dist",
		"distz",
		"pkg",
		"bpk",
		"dump",
		"elc",
		"deploy",
		"exe",
		"dll",
		"deb",
		"dmg",
		"iso",
		"img",
		"msi",
		"msp",
		"msm",
		"buffer"
	],
	"application/oda": ["oda"],
	"application/oebps-package+xml": ["opf"],
	"application/ogg": ["ogx"],
	"application/omdoc+xml": ["omdoc"],
	"application/onenote": [
		"onetoc",
		"onetoc2",
		"onetmp",
		"onepkg",
		"one",
		"onea"
	],
	"application/oxps": ["oxps"],
	"application/p2p-overlay+xml": ["relo"],
	"application/patch-ops-error+xml": ["xer"],
	"application/pdf": ["pdf"],
	"application/pgp-encrypted": ["pgp"],
	"application/pgp-keys": ["asc"],
	"application/pgp-signature": ["sig", "*asc"],
	"application/pics-rules": ["prf"],
	"application/pkcs10": ["p10"],
	"application/pkcs7-mime": ["p7m", "p7c"],
	"application/pkcs7-signature": ["p7s"],
	"application/pkcs8": ["p8"],
	"application/pkix-attr-cert": ["ac"],
	"application/pkix-cert": ["cer"],
	"application/pkix-crl": ["crl"],
	"application/pkix-pkipath": ["pkipath"],
	"application/pkixcmp": ["pki"],
	"application/pls+xml": ["pls"],
	"application/postscript": [
		"ai",
		"eps",
		"ps"
	],
	"application/provenance+xml": ["provx"],
	"application/pskc+xml": ["pskcxml"],
	"application/raml+yaml": ["raml"],
	"application/rdf+xml": ["rdf", "owl"],
	"application/reginfo+xml": ["rif"],
	"application/relax-ng-compact-syntax": ["rnc"],
	"application/resource-lists+xml": ["rl"],
	"application/resource-lists-diff+xml": ["rld"],
	"application/rls-services+xml": ["rs"],
	"application/route-apd+xml": ["rapd"],
	"application/route-s-tsid+xml": ["sls"],
	"application/route-usd+xml": ["rusd"],
	"application/rpki-ghostbusters": ["gbr"],
	"application/rpki-manifest": ["mft"],
	"application/rpki-roa": ["roa"],
	"application/rsd+xml": ["rsd"],
	"application/rss+xml": ["rss"],
	"application/rtf": ["rtf"],
	"application/sbml+xml": ["sbml"],
	"application/scvp-cv-request": ["scq"],
	"application/scvp-cv-response": ["scs"],
	"application/scvp-vp-request": ["spq"],
	"application/scvp-vp-response": ["spp"],
	"application/sdp": ["sdp"],
	"application/senml+xml": ["senmlx"],
	"application/sensml+xml": ["sensmlx"],
	"application/set-payment-initiation": ["setpay"],
	"application/set-registration-initiation": ["setreg"],
	"application/shf+xml": ["shf"],
	"application/sieve": ["siv", "sieve"],
	"application/smil+xml": ["smi", "smil"],
	"application/sparql-query": ["rq"],
	"application/sparql-results+xml": ["srx"],
	"application/sql": ["sql"],
	"application/srgs": ["gram"],
	"application/srgs+xml": ["grxml"],
	"application/sru+xml": ["sru"],
	"application/ssdl+xml": ["ssdl"],
	"application/ssml+xml": ["ssml"],
	"application/swid+xml": ["swidtag"],
	"application/tei+xml": ["tei", "teicorpus"],
	"application/thraud+xml": ["tfi"],
	"application/timestamped-data": ["tsd"],
	"application/toml": ["toml"],
	"application/trig": ["trig"],
	"application/ttml+xml": ["ttml"],
	"application/ubjson": ["ubj"],
	"application/urc-ressheet+xml": ["rsheet"],
	"application/urc-targetdesc+xml": ["td"],
	"application/voicexml+xml": ["vxml"],
	"application/wasm": ["wasm"],
	"application/watcherinfo+xml": ["wif"],
	"application/widget": ["wgt"],
	"application/winhlp": ["hlp"],
	"application/wsdl+xml": ["wsdl"],
	"application/wspolicy+xml": ["wspolicy"],
	"application/xaml+xml": ["xaml"],
	"application/xcap-att+xml": ["xav"],
	"application/xcap-caps+xml": ["xca"],
	"application/xcap-diff+xml": ["xdf"],
	"application/xcap-el+xml": ["xel"],
	"application/xcap-ns+xml": ["xns"],
	"application/xenc+xml": ["xenc"],
	"application/xfdf": ["xfdf"],
	"application/xhtml+xml": ["xhtml", "xht"],
	"application/xliff+xml": ["xlf"],
	"application/xml": [
		"xml",
		"xsl",
		"xsd",
		"rng"
	],
	"application/xml-dtd": ["dtd"],
	"application/xop+xml": ["xop"],
	"application/xproc+xml": ["xpl"],
	"application/xslt+xml": ["*xsl", "xslt"],
	"application/xspf+xml": ["xspf"],
	"application/xv+xml": [
		"mxml",
		"xhvml",
		"xvml",
		"xvm"
	],
	"application/yang": ["yang"],
	"application/yin+xml": ["yin"],
	"application/zip": ["zip"],
	"application/zip+dotlottie": ["lottie"],
	"audio/3gpp": ["*3gpp"],
	"audio/aac": ["adts", "aac"],
	"audio/adpcm": ["adp"],
	"audio/amr": ["amr"],
	"audio/basic": ["au", "snd"],
	"audio/midi": [
		"mid",
		"midi",
		"kar",
		"rmi"
	],
	"audio/mobile-xmf": ["mxmf"],
	"audio/mp3": ["*mp3"],
	"audio/mp4": [
		"m4a",
		"mp4a",
		"m4b"
	],
	"audio/mpeg": [
		"mpga",
		"mp2",
		"mp2a",
		"mp3",
		"m2a",
		"m3a"
	],
	"audio/ogg": [
		"oga",
		"ogg",
		"spx",
		"opus"
	],
	"audio/s3m": ["s3m"],
	"audio/silk": ["sil"],
	"audio/wav": ["wav"],
	"audio/wave": ["*wav"],
	"audio/webm": ["weba"],
	"audio/xm": ["xm"],
	"font/collection": ["ttc"],
	"font/otf": ["otf"],
	"font/ttf": ["ttf"],
	"font/woff": ["woff"],
	"font/woff2": ["woff2"],
	"image/aces": ["exr"],
	"image/apng": ["apng"],
	"image/avci": ["avci"],
	"image/avcs": ["avcs"],
	"image/avif": ["avif"],
	"image/bmp": ["bmp", "dib"],
	"image/cgm": ["cgm"],
	"image/dicom-rle": ["drle"],
	"image/dpx": ["dpx"],
	"image/emf": ["emf"],
	"image/fits": ["fits"],
	"image/g3fax": ["g3"],
	"image/gif": ["gif"],
	"image/heic": ["heic"],
	"image/heic-sequence": ["heics"],
	"image/heif": ["heif"],
	"image/heif-sequence": ["heifs"],
	"image/hej2k": ["hej2"],
	"image/ief": ["ief"],
	"image/jaii": ["jaii"],
	"image/jais": ["jais"],
	"image/jls": ["jls"],
	"image/jp2": ["jp2", "jpg2"],
	"image/jpeg": [
		"jpg",
		"jpeg",
		"jpe"
	],
	"image/jph": ["jph"],
	"image/jphc": ["jhc"],
	"image/jpm": ["jpm", "jpgm"],
	"image/jpx": ["jpx", "jpf"],
	"image/jxl": ["jxl"],
	"image/jxr": ["jxr"],
	"image/jxra": ["jxra"],
	"image/jxrs": ["jxrs"],
	"image/jxs": ["jxs"],
	"image/jxsc": ["jxsc"],
	"image/jxsi": ["jxsi"],
	"image/jxss": ["jxss"],
	"image/ktx": ["ktx"],
	"image/ktx2": ["ktx2"],
	"image/pjpeg": ["jfif"],
	"image/png": ["png"],
	"image/sgi": ["sgi"],
	"image/svg+xml": ["svg", "svgz"],
	"image/t38": ["t38"],
	"image/tiff": ["tif", "tiff"],
	"image/tiff-fx": ["tfx"],
	"image/webp": ["webp"],
	"image/wmf": ["wmf"],
	"message/disposition-notification": ["disposition-notification"],
	"message/global": ["u8msg"],
	"message/global-delivery-status": ["u8dsn"],
	"message/global-disposition-notification": ["u8mdn"],
	"message/global-headers": ["u8hdr"],
	"message/rfc822": [
		"eml",
		"mime",
		"mht",
		"mhtml"
	],
	"model/3mf": ["3mf"],
	"model/gltf+json": ["gltf"],
	"model/gltf-binary": ["glb"],
	"model/iges": ["igs", "iges"],
	"model/jt": ["jt"],
	"model/mesh": [
		"msh",
		"mesh",
		"silo"
	],
	"model/mtl": ["mtl"],
	"model/obj": ["obj"],
	"model/prc": ["prc"],
	"model/step": [
		"step",
		"stp",
		"stpnc",
		"p21",
		"210"
	],
	"model/step+xml": ["stpx"],
	"model/step+zip": ["stpz"],
	"model/step-xml+zip": ["stpxz"],
	"model/stl": ["stl"],
	"model/u3d": ["u3d"],
	"model/vrml": ["wrl", "vrml"],
	"model/x3d+binary": ["*x3db", "x3dbz"],
	"model/x3d+fastinfoset": ["x3db"],
	"model/x3d+vrml": ["*x3dv", "x3dvz"],
	"model/x3d+xml": ["x3d", "x3dz"],
	"model/x3d-vrml": ["x3dv"],
	"text/cache-manifest": ["appcache", "manifest"],
	"text/calendar": ["ics", "ifb"],
	"text/coffeescript": ["coffee", "litcoffee"],
	"text/css": ["css"],
	"text/csv": ["csv"],
	"text/html": [
		"html",
		"htm",
		"shtml"
	],
	"text/jade": ["jade"],
	"text/javascript": ["js", "mjs"],
	"text/jsx": ["jsx"],
	"text/less": ["less"],
	"text/markdown": ["md", "markdown"],
	"text/mathml": ["mml"],
	"text/mdx": ["mdx"],
	"text/n3": ["n3"],
	"text/plain": [
		"txt",
		"text",
		"conf",
		"def",
		"list",
		"log",
		"in",
		"ini"
	],
	"text/richtext": ["rtx"],
	"text/rtf": ["*rtf"],
	"text/sgml": ["sgml", "sgm"],
	"text/shex": ["shex"],
	"text/slim": ["slim", "slm"],
	"text/spdx": ["spdx"],
	"text/stylus": ["stylus", "styl"],
	"text/tab-separated-values": ["tsv"],
	"text/troff": [
		"t",
		"tr",
		"roff",
		"man",
		"me",
		"ms"
	],
	"text/turtle": ["ttl"],
	"text/uri-list": [
		"uri",
		"uris",
		"urls"
	],
	"text/vcard": ["vcard"],
	"text/vtt": ["vtt"],
	"text/wgsl": ["wgsl"],
	"text/xml": ["*xml"],
	"text/yaml": ["yaml", "yml"],
	"video/3gpp": ["3gp", "3gpp"],
	"video/3gpp2": ["3g2"],
	"video/h261": ["h261"],
	"video/h263": ["h263"],
	"video/h264": ["h264"],
	"video/iso.segment": ["m4s"],
	"video/jpeg": ["jpgv"],
	"video/jpm": ["*jpm", "*jpgm"],
	"video/mj2": ["mj2", "mjp2"],
	"video/mp2t": [
		"ts",
		"m2t",
		"m2ts",
		"mts"
	],
	"video/mp4": [
		"mp4",
		"mp4v",
		"mpg4"
	],
	"video/mpeg": [
		"mpeg",
		"mpg",
		"mpe",
		"m1v",
		"m2v"
	],
	"video/ogg": ["ogv"],
	"video/quicktime": ["qt", "mov"],
	"video/webm": ["webm"]
};
Object.freeze(types);
var standard_default = types;
var __classPrivateFieldGet = function(receiver, state, kind, f$1) {
	if (kind === "a" && !f$1) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f$1 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f$1 : kind === "a" ? f$1.call(receiver) : f$1 ? f$1.value : state.get(receiver);
};
var _Mime_extensionToType, _Mime_typeToExtension, _Mime_typeToExtensions;
var Mime = class {
	constructor(...args) {
		_Mime_extensionToType.set(this, /* @__PURE__ */ new Map());
		_Mime_typeToExtension.set(this, /* @__PURE__ */ new Map());
		_Mime_typeToExtensions.set(this, /* @__PURE__ */ new Map());
		for (const arg of args) this.define(arg);
	}
	define(typeMap, force = false) {
		for (let [type, extensions] of Object.entries(typeMap)) {
			type = type.toLowerCase();
			extensions = extensions.map((ext) => ext.toLowerCase());
			if (!__classPrivateFieldGet(this, _Mime_typeToExtensions, "f").has(type)) __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").set(type, /* @__PURE__ */ new Set());
			const allExtensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type);
			let first = true;
			for (let extension of extensions) {
				const starred = extension.startsWith("*");
				extension = starred ? extension.slice(1) : extension;
				allExtensions?.add(extension);
				if (first) __classPrivateFieldGet(this, _Mime_typeToExtension, "f").set(type, extension);
				first = false;
				if (starred) continue;
				const currentType = __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(extension);
				if (currentType && currentType != type && !force) throw new Error(`"${type} -> ${extension}" conflicts with "${currentType} -> ${extension}". Pass \`force=true\` to override this definition.`);
				__classPrivateFieldGet(this, _Mime_extensionToType, "f").set(extension, type);
			}
		}
		return this;
	}
	getType(path$1) {
		if (typeof path$1 !== "string") return null;
		const last = path$1.replace(/^.*[/\\]/s, "").toLowerCase();
		const ext = last.replace(/^.*\./s, "").toLowerCase();
		const hasPath = last.length < path$1.length;
		if (!(ext.length < last.length - 1) && hasPath) return null;
		return __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(ext) ?? null;
	}
	getExtension(type) {
		if (typeof type !== "string") return null;
		type = type?.split?.(";")[0];
		return (type && __classPrivateFieldGet(this, _Mime_typeToExtension, "f").get(type.trim().toLowerCase())) ?? null;
	}
	getAllExtensions(type) {
		if (typeof type !== "string") return null;
		return __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type.toLowerCase()) ?? null;
	}
	_freeze() {
		this.define = () => {
			throw new Error("define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances");
		};
		Object.freeze(this);
		for (const extensions of __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").values()) Object.freeze(extensions);
		return this;
	}
	_getTestState() {
		return {
			types: __classPrivateFieldGet(this, _Mime_extensionToType, "f"),
			extensions: __classPrivateFieldGet(this, _Mime_typeToExtension, "f")
		};
	}
};
_Mime_extensionToType = /* @__PURE__ */ new WeakMap(), _Mime_typeToExtension = /* @__PURE__ */ new WeakMap(), _Mime_typeToExtensions = /* @__PURE__ */ new WeakMap();
var src_default = new Mime(standard_default, other_default)._freeze();
var CopyIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
	size: "1rem",
	...props
});
var CopyIcon_default = CopyIcon;
var DeleteIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {
	size: "1rem",
	...props
});
var DeleteIcon_default = DeleteIcon;
var EditIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
	size: "1rem",
	...props
});
var EditIcon_default = EditIcon;
var textStyle = {
	fontStyle: "italic",
	fontSize: "7.70985px",
	lineHeight: .8,
	fontFamily: "'Times New Roman'",
	textAlign: "center",
	writingMode: "horizontal-tb",
	direction: "ltr",
	textAnchor: "middle",
	fill: "none",
	stroke: "#000000",
	strokeWidth: "0.289119",
	strokeLinejoin: "round",
	strokeDasharray: "none"
};
var tspanStyle = {
	fontStyle: "normal",
	fontVariant: "normal",
	fontWeight: "normal",
	fontStretch: "condensed",
	fontSize: "7.70985px",
	lineHeight: .8,
	fontFamily: "Arial",
	fill: "#000000",
	fillOpacity: 1,
	strokeWidth: "0.289119",
	strokeDasharray: "none"
};
var BaseFileIcon = ({ size = "1.1em", text = "SVG", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	version: "1.1",
	id: "svg4",
	xmlns: "http://www.w3.org/2000/svg",
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { id: "defs4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "m 14,2 v 4 a 2,2 0 0 0 2,2 h 4",
			id: "path3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M 15,2 H 6 A 2,2 0 0 0 4,4 v 16 a 2,2 0 0 0 2,2 h 12 a 2,2 0 0 0 2,-2 V 7 Z",
			id: "path4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			xmlSpace: "preserve",
			style: textStyle,
			x: "12.478625",
			y: "17.170216",
			id: "text4",
			transform: "scale(0.96196394,1.03954)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tspan", {
				id: "tspan4",
				x: "12.478625",
				y: "17.170216",
				style: tspanStyle,
				children: text
			})
		})
	]
});
const FileSvgIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseFileIcon, {
	text: "SVG",
	...props
});
const FilePngIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseFileIcon, {
	text: "PNG",
	...props
});
var _3mintop_default = "" + new URL("3mintop-C1fCUA7I.png", import.meta.url).href;
var abacus_default = "data:image/webp;base64,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";
var aistudio_default = "" + new URL("aistudio-D5ZRykJU.png", import.meta.url).href;
var application_default = "" + new URL("application-D27DKxis.png", import.meta.url).href;
var baidu_ai_default = "" + new URL("baidu-ai-ClFE_v7N.png", import.meta.url).href;
var baidu_ai_search_default = "" + new URL("baidu-ai-search-CHTvGVQ0.webp", import.meta.url).href;
var baixiaoying_default = "" + new URL("baixiaoying-BvEr2bgX.webp", import.meta.url).href;
var bolt_default = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='16'%20height='16'%20rx='4'%20fill='black'/%3e%3cg%20filter='url(%23filter0_i_2119_154)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.64368%2011.7731C7.91976%2011.7731%207.20901%2011.5147%206.80099%2010.9591L6.65707%2011.6143L4%2013L4.28684%2011.6143L6.22186%203H8.59103L7.9066%206.03634C8.45941%205.44199%208.97273%205.22234%209.63083%205.22234C11.0523%205.22234%2012%206.1397%2012%207.81938C12%209.55074%2010.9076%2011.7731%208.64368%2011.7731ZM9.55186%208.31036C9.55186%209.11144%208.97273%209.71871%208.22249%209.71871C7.8013%209.71871%207.4196%209.56366%207.16952%209.29233L7.53806%207.70309C7.81447%207.43176%208.13036%207.27671%208.49889%207.27671C9.06486%207.27671%209.55186%207.69017%209.55186%208.31036Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_i_2119_154'%20x='4'%20y='3'%20width='8'%20height='10'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset/%3e%3cfeGaussianBlur%20stdDeviation='0.0192413'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='arithmetic'%20k2='-1'%20k3='1'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%200.95%200'/%3e%3cfeBlend%20mode='normal'%20in2='shape'%20result='effect1_innerShadow_2119_154'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e";
var cici_default = "" + new URL("cici-BWax0i0M.webp", import.meta.url).href;
var coze_default = "" + new URL("coze-DYlX4xIp.webp", import.meta.url).href;
var dangbei_default = "" + new URL("dangbei-D7rGNj_W.jpg", import.meta.url).href;
var devv_default = "data:image/png;base64,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";
var dify_default = "data:image/svg+xml,%3csvg%20width='22'%20height='22'%20viewBox='13%20-2%2025%2022'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='White=False'%3e%3cg%20id='if'%3e%3cpath%20d='M21.2002%203.73454C22.5633%203.73454%2023.0666%202.89917%2023.0666%201.86812C23.0666%200.837081%2022.5623%200.00170898%2021.2002%200.00170898C19.838%200.00170898%2019.3337%200.837081%2019.3337%201.86812C19.3337%202.89917%2019.838%203.73454%2021.2002%203.73454Z'%20fill='%230033FF'/%3e%3cpath%20d='M27.7336%204.13435V5.33473H24.6668V8.00171H27.7336V14.6687H22.6668V5.33567H15.9998V8.00265H19.7336V14.6696H15.3337V17.3366H35.3337V14.6696H30.6668V8.00265H35.3337V5.33567H30.6668V2.66869H35.3337V0.00170898H31.8671C29.5877%200.00170898%2027.7336%201.8559%2027.7336%204.13529V4.13435Z'%20fill='%230033FF'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
var doubao_default = "" + new URL("doubao-BPwltGKt.png", import.meta.url).href;
var duckduckgo_default = "" + new URL("duckduckgo-DdW9vOGy.webp", import.meta.url).href;
var felo_default = "" + new URL("felo-CBKY1NXJ.png", import.meta.url).href;
var flowith_default = "data:image/svg+xml,%3csvg%20width='464'%20height='464'%20viewBox='0%200%20464%20464'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='464'%20height='464'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M243%20127C235.268%20127%20229%20133.268%20229%20141V322C229%20329.732%20235.268%20336%20243%20336H283C290.732%20336%20297%20329.732%20297%20322V141C297%20133.268%20290.732%20127%20283%20127H243ZM167.562%20128C163.762%20128%20160.317%20129.518%20157.805%20131.978C157.787%20131.995%20157.759%20131.977%20157.767%20131.954C157.775%20131.93%20157.743%20131.913%20157.727%20131.933L157.311%20132.486C156.679%20133.171%20156.115%20133.92%20155.629%20134.722C154.303%20136.486%20153.139%20138.365%20152.152%20140.338L88.8745%20266.857L85.2894%20274.899C85.2249%20275.037%2085.1626%20275.177%2085.1027%20275.318L84.7141%20276.189C84.7086%20276.201%2084.7223%20276.213%2084.7339%20276.206C84.745%20276.2%2084.7583%20276.211%2084.7541%20276.223C84.2654%20277.639%2084%20279.16%2084%20280.742L84%20322.399C84%20330.067%2090.2354%20336.284%2097.9271%20336.284H139.708C147.4%20336.284%20153.635%20330.067%20153.635%20322.399V266.857L153.636%20252.97C153.636%20222.295%20178.577%20197.428%20209.344%20197.428C217.035%20197.428%20223.271%20191.211%20223.271%20183.542V141.886C223.271%20134.217%20217.035%20128%20209.344%20128H167.562ZM304.5%20301.57C304.5%20282.398%20320.088%20266.856%20339.318%20266.856C358.547%20266.856%20374.135%20282.398%20374.135%20301.57C374.135%20320.742%20358.547%20336.284%20339.318%20336.284C320.088%20336.284%20304.5%20320.742%20304.5%20301.57Z'%20fill='black'/%3e%3c/svg%3e";
var gemini_default = "" + new URL("gemini-COTfc6Xd.png", import.meta.url).href;
var genspark_default = "data:image/jpeg;base64,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";
var github_copilot_default = "" + new URL("github-copilot-DOKbpYa6.webp", import.meta.url).href;
var google_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2048%2048'%3e%3cdefs%3e%3cpath%20id='a'%20d='M44.5%2020H24v8.5h11.8C34.7%2033.9%2030.1%2037%2024%2037c-7.2%200-13-5.8-13-13s5.8-13%2013-13c3.1%200%205.9%201.1%208.1%202.9l6.4-6.4C34.6%204.1%2029.6%202%2024%202%2011.8%202%202%2011.8%202%2024s9.8%2022%2022%2022c11%200%2021-8%2021-22%200-1.3-.2-2.7-.5-4z'/%3e%3c/defs%3e%3cclipPath%20id='b'%3e%3cuse%20xlink:href='%23a'%20overflow='visible'/%3e%3c/clipPath%3e%3cpath%20clip-path='url(%23b)'%20fill='%23FBBC05'%20d='M0%2037V11l17%2013z'/%3e%3cpath%20clip-path='url(%23b)'%20fill='%23EA4335'%20d='M0%2011l17%2013%207-6.1L48%2014V0H0z'/%3e%3cpath%20clip-path='url(%23b)'%20fill='%2334A853'%20d='M0%2037l30-23%207.9%201L48%200v48H0z'/%3e%3cpath%20clip-path='url(%23b)'%20fill='%234285F4'%20d='M48%2048L17%2024l-4-3%2035-10z'/%3e%3c/svg%3e";
var grok_default = "" + new URL("grok-BeYyfS5U.png", import.meta.url).href;
var grok_x_default = "" + new URL("grok-x-CKu0pW0Y.png", import.meta.url).href;
var huggingchat_default = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16.0006%2025.9992C13.8266%2025.999%2011.7118%2025.2901%209.97686%2023.9799C8.2419%2022.6698%206.98127%2020.8298%206.38599%2018.7388C5.79071%2016.6478%205.89323%2014.4198%206.678%2012.3923C7.46278%2010.3648%208.88705%208.64837%2010.735%207.50308C12.5829%206.35779%2014.7538%205.84606%2016.9187%206.04544C19.0837%206.24481%2021.1246%207.14442%2022.7323%208.60795C24.34%2010.0715%2025.4268%2012.0192%2025.8281%2014.1559C26.2293%2016.2926%2025.9232%2018.5019%2024.9561%2020.449C24.7703%2020.8042%2024.7223%2021.2155%2024.8211%2021.604L25.4211%2023.8316C25.4803%2024.0518%2025.4805%2024.2837%2025.4216%2024.5039C25.3627%2024.7242%2025.2468%2024.925%2025.0856%2025.0862C24.9244%2025.2474%2024.7235%2025.3633%2024.5033%2025.4222C24.283%2025.4811%2024.0512%2025.4809%2023.831%2025.4217L21.6034%2024.8217C21.2172%2024.7248%2020.809%2024.7729%2020.4558%2024.9567C19.0683%2025.6467%2017.5457%2026.0068%2016.0006%2026.0068V25.9992Z'%20fill='black'/%3e%3cpath%20d='M9.62598%2016.0013C9.62598%2015.3799%2010.1294%2014.8765%2010.7508%2014.8765C11.3721%2014.8765%2011.8756%2015.3799%2011.8756%2016.0013C11.8756%2017.0953%2012.3102%2018.1448%2013.0838%2018.9184C13.8574%2019.692%2014.9069%2020.1266%2016.001%2020.1267C17.095%2020.1267%2018.1445%2019.692%2018.9181%2018.9184C19.6918%2018.1448%2020.1264%2017.0953%2020.1264%2016.0013C20.1264%2015.3799%2020.6299%2014.8765%2021.2512%2014.8765C21.8725%2014.8765%2022.3759%2015.3799%2022.3759%2016.0013C22.3759%2017.6921%2021.7046%2019.3137%2020.509%2020.5093C19.3134%2021.7049%2017.6918%2022.3762%2016.001%2022.3762C14.3102%2022.3762%2012.6885%2021.7049%2011.4929%2020.5093C10.2974%2019.3137%209.62598%2017.6921%209.62598%2016.0013Z'%20fill='white'/%3e%3c/svg%3e";
var ima_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='20'%20height='20'%20viewBox='2%202%2020%2020'%20fill='none'%3e%3cdefs%3e%3cclipPath%20id='rounded-clip'%3e%3crect%20x='2'%20y='2'%20width='20'%20height='20'%20rx='3.33'/%3e%3c/clipPath%3e%3c/defs%3e%3c!--%20White%20background%20with%20rounded%20corners%20--%3e%3crect%20x='2'%20y='2'%20width='20'%20height='20'%20rx='3.33'%20fill='white'%20stroke='white'%20stroke-opacity='0.08'%20stroke-width='1.5'/%3e%3cg%20clip-path='url(%23rounded-clip)'%3e%3c!--%20Green%20circle%20(top-left)%20--%3e%3ccircle%20cx='7.06'%20cy='19.64'%20r='5'%20fill='%234DEE9E'/%3e%3c!--%20Light%20gray%20circle%20(top-right)%20--%3e%3ccircle%20cx='2.18'%20cy='9.75'%20r='6'%20fill='%23F6F7FA'/%3e%3c!--%20Yellow%20circle%20(bottom-right)%20--%3e%3ccircle%20cx='15.24'%20cy='26.22'%20r='5.5'%20fill='%23D6E807'/%3e%3c!--%20M%20character%20in%20center%20--%3e%3cpath%20d='M20.8734%207.51383C21.721%206.79517%2021.553%205.18794%2020.5028%203.92051C19.4525%202.65309%2017.9133%202.21173%2017.0701%202.93079C16.2268%203.64984%2016.3905%205.25668%2017.4407%206.52411C18.491%207.79153%2020.0255%208.23445%2020.8734%207.51383Z'%20fill='black'/%3e%3cpath%20d='M3.12632%207.51383C2.27919%206.79517%202.44682%205.18794%203.49753%203.92051C4.54825%202.65309%206.08622%202.21173%206.92984%202.93079C7.77346%203.64984%207.60934%205.25668%206.55863%206.52411C5.50792%207.79153%203.97385%208.23445%203.12632%207.51383Z'%20fill='black'/%3e%3cpath%20d='M5.89959%2014.7215C5.05272%2014.0024%205.2203%2012.395%206.27069%2011.1278C7.32108%209.86061%208.85858%209.41764%209.70194%2010.1364C10.5453%2010.8551%2010.3812%2012.4626%209.33123%2013.7301C8.28123%2014.9977%206.74686%2015.4403%205.89959%2014.7215Z'%20fill='black'/%3e%3cpath%20d='M14.6671%2013.7301C13.6171%2012.4622%2013.4495%2010.8547%2014.2964%2010.1364C15.1432%209.41803%2016.6792%209.85982%2017.7276%2011.1278C18.776%2012.3958%2018.9456%2014.0028%2018.0987%2014.7215C17.2518%2015.4403%2015.7135%2014.9938%2014.6671%2013.7301Z'%20fill='black'/%3e%3cpath%20d='M11.9983%2015.1095C12.7327%2015.1095%2013.3264%2014.7416%2013.3264%2014.2892C13.3264%2013.8369%2012.7327%2013.4689%2011.9983%2013.4689C11.2639%2013.4689%2010.6702%2013.8369%2010.6702%2014.2892C10.6702%2014.7416%2011.2639%2015.1095%2011.9983%2015.1095Z'%20fill='black'/%3e%3c/g%3e%3c/svg%3e";
var kimi_default = "" + new URL("moonshot-DRX5773U.webp", import.meta.url).href;
var lambdachat_default = "data:image/webp;base64,UklGRswCAABXRUJQVlA4IMACAADQGgCdASrIAMgAPpFIoUslpKOholgJuLASCWlu4XExG5ayOUv5+AHFf3gxd/sA9vv0r0wHsAF14CLcwDwEW5gHgItzAPARbmAeAgrFaTcdZjYeKagOcooZV3BqiR/Cyp4cTJN+mxFrddlLQItrZR3nZU2LZ6es+BT32M9+5XDBkJBl3WD1xNes9cfc1ugITWQK/CkzPlXWYwVqB3OFOHFsy4vKiQKHUx5qOXfQNEcHTsq51kaHKOpIICNlTpvcspwVqyCaNK8Pg4zw0kMPboCLcwDwEW5gHgItzAPARbkgAP7+1SwHh3mdvxj4Y+DlybMLFLf+8x94n+0LrTU5v+G2IIXZV69DVrvwZTLlX5tUvxe6s8jfv4YD5M0fkMAmMXTBOGRIxzou8vV6v/t+zbDR4p4mZAcBzB5jkXXEfaeEqi+2juOagHqzUnhn4B0CpcB9vGzhcJTcxg9VgNGP4/or4CWXMRyz8VfXTlZ63q31gmyWcQiG4/qL2y8oOpYg6Bquu5sjuQjSWpTISrFaiGulfqezop7r5r/ejiPJqz3/IUuJRzv5QWYgtisvCQP5F0+4kUQ6Y5cGe5CCkFCej6zduAz3OqzCQKkEEsE0lvVsuRB+FuXJrxiK3/SV/3pp3nLajs1wDmgVBHlvfzViec2qEN/P8Xa8uf22Yza1iV8zoI5caGY/CGE9QRrjVt1eKAJ6HFBPfvbYXBxUfqq4KSkmlNeBM9FFzuTMlOuMGo/OvYyBioEipdXoEjgQSRKze5TU8SRBrSv+Nh27i4JS1TNj+yl+Jw5Crrj/FR/Lnc2Dl3BNJtg9bCpljZQu5ANX+wi8gN6+gWwhx7BS/VmOKbvsvIpkOQk4rlnpXTtYMsOMNmXiUnMb1joAisXrTziNpz8FPi5KG7/09w0flfg5vaSdMLHYyaLmQ0JanUAAAAAAAA==";
var lechat_default = "data:image/png;base64,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";
var ling_default = "" + new URL("ling-CfgVSDNN.png", import.meta.url).href;
var longcat_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20fill='none'%20version='1.1'%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%3e%3cg%3e%3cg%3e%3crect%20x='0'%20y='0'%20width='40'%20height='40'%20rx='10'%20fill='%23FFFFFF'%20fill-opacity='1'/%3e%3c/g%3e%3cg%3e%3cg%3e%3cpath%20d='M3.7180590000000002,31.9163C3.24403,31.9163,2.9002264,31.4649,3.0262264,31.0079L9.07884,9.056280000000001C9.337579999999999,8.117891,10.43555,7.703758,11.24956,8.237532L19.2136,13.459869999999999C19.6909,13.77281,20.3081,13.77329,20.7859,13.46111L28.7837,8.234667C29.5984,7.702255,30.6956,8.11792,30.953,9.056519999999999L36.974,31.0089C37.0993,31.4656,36.7556,31.9163,36.2819,31.9163L28.5948,31.9163C29.9941,30.2961,30.7641,28.2266,30.7641,26.0857L30.7641,25.8358C30.7641,23.7417,30.0023,21.719,28.6209,20.1451L27.6344,15.19322C27.5764,14.90227,27.321,14.69275,27.0243,14.69275C26.8898,14.69275,26.7588,14.7364,26.6511,14.81715L22.9316,17.60681C22.6667,17.80548,22.3241,17.868740000000003,22.0057,17.77777C20.6944,17.403100000000002,19.3043,17.403100000000002,17.9929,17.77777C17.674599999999998,17.868740000000003,17.332,17.80548,17.0671,17.60681L13.3459,14.815909999999999C13.2393,14.73596,13.1096,14.69275,12.97639,14.69275C12.67948,14.69275,12.42483,14.90461,12.37083,15.196570000000001L11.41369,20.371000000000002C10.01719,21.7911,9.2346,23.703,9.2346,25.6947L9.2346,26.168C9.2346,28.2566,9.98171,30.2762,11.3409,31.8619L11.38755,31.9163L3.7180590000000002,31.9163Z'%20fill-rule='evenodd'%20fill='%2329E154'%20fill-opacity='1'/%3e%3c/g%3e%3cg%3e%3cpath%20d='M16.05224895477295,27.610614743041992L18.20519895477295,27.610614743041992L18.20519895477295,22.587064743041992L16.37845295477295,22.587064743041992L16.05224895477295,27.610614743041992ZM23.94638895477295,27.610614743041992L21.79344895477295,27.610614743041992L21.79344895477295,22.587064743041992L23.62018895477295,22.587064743041992L23.94638895477295,27.610614743041992Z'%20fill='%23000000'%20fill-opacity='1'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
var metaso_default = "data:image/webp;base64,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";
var minimax_agent_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3c!--%20Light%20blue%20background%20--%3e%3crect%20width='24'%20height='24'%20rx='4'%20fill='%237ec7ff'/%3e%3c!--%20M%20logo%20skeleton%20--%3e%3cpath%20d='M20.2615%204.35303C20.9%204.35303%2021.4177%204.87072%2021.4177%205.50928V15.561C21.4177%2015.9313%2021.2513%2016.2819%2020.9646%2016.5161L17.5574%2019.2983C17.3372%2019.4781%2017.0614%2019.5767%2016.7771%2019.5767H3.84351C3.20502%2019.5767%202.68737%2019.0589%202.68726%2018.4204V8.66943C2.68726%208.29831%202.85445%207.9466%203.14233%207.7124L6.93335%204.62939C7.15324%204.45059%207.42826%204.35303%207.71167%204.35303H20.2615ZM8.2937%206.66064C8.15265%206.66069%208.0157%206.70867%207.90601%206.79736L5.24683%208.94873C5.10205%209.0658%205.01733%209.24204%205.01733%209.42822V16.8735C5.01737%2017.0864%205.19025%2017.2593%205.40308%2017.2593H7.31226V13.2554C7.3125%2012.9151%207.58816%2012.6393%207.92847%2012.6392H9.39331C9.73369%2012.6392%2010.0093%2012.915%2010.0095%2013.2554V17.2593H11.3972V13.2554C11.3975%2012.915%2011.674%2012.6392%2012.0144%2012.6392H13.4783C13.8187%2012.6392%2014.0952%2012.915%2014.0955%2013.2554V17.2593H16.1687C16.3105%2017.2593%2016.4484%2017.2101%2016.5583%2017.1206L18.8777%2015.2329C19.0216%2015.1158%2019.1052%2014.9399%2019.1052%2014.7544V7.05029C19.105%206.83785%2018.9329%206.66589%2018.7205%206.66553L8.2937%206.66064Z'%20fill='black'/%3e%3c!--%20White%20fill%20for%20the%20inner%20area%20--%3e%3cpath%20d='M8.2937%206.66064%20L18.7205%206.66553%20C18.9329%206.66589%2019.105%206.83785%2019.1052%207.05029%20V14.7544%20C19.1052%2014.9399%2019.0216%2015.1158%2018.8777%2015.2329%20L16.5583%2017.1206%20C16.4484%2017.2101%2016.3105%2017.2593%2016.1687%2017.2593%20H14.0955%20V13.2554%20C14.0952%2012.915%2013.8187%2012.6392%2013.4783%2012.6392%20H12.0144%20C11.674%2012.6392%2011.3975%2012.915%2011.3972%2013.2554%20V17.2593%20H10.0095%20V13.2554%20C10.0093%2012.915%209.73369%2012.6392%209.39331%2012.6392%20H7.92847%20C7.58816%2012.6393%207.3125%2012.9151%207.31226%2013.2554%20V17.2593%20H5.40308%20C5.19025%2017.2593%205.01737%2017.0864%205.01733%2016.8735%20V9.42822%20C5.01733%209.24204%205.10205%209.0658%205.24683%208.94873%20L7.90601%206.79736%20C8.0157%206.70867%208.15265%206.66069%208.2937%206.66064%20Z'%20fill='white'/%3e%3c/svg%3e";
var monica_default = "" + new URL("monica-Dh3VTqHn.webp", import.meta.url).href;
var n8n_default = "data:image/svg+xml,%3csvg%20height='1em'%20style='flex:none;line-height:1'%20viewBox='0%200%2024%2024'%20width='1em'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3en8n%3c/title%3e%3cpath%20clip-rule='evenodd'%20d='M24%208.4c0%201.325-1.102%202.4-2.462%202.4-1.146%200-2.11-.765-2.384-1.8h-3.436c-.602%200-1.115.424-1.214%201.003l-.101.592a2.38%202.38%200%2001-.8%201.405c.412.354.704.844.8%201.405l.1.592A1.222%201.222%200%200015.719%2015h.975c.273-1.035%201.237-1.8%202.384-1.8%201.36%200%202.461%201.075%202.461%202.4S20.436%2018%2019.078%2018c-1.147%200-2.11-.765-2.384-1.8h-.975c-1.204%200-2.23-.848-2.428-2.005l-.101-.592a1.222%201.222%200%2000-1.214-1.003H10.97c-.308.984-1.246%201.7-2.356%201.7-1.11%200-2.048-.716-2.355-1.7H4.817c-.308.984-1.246%201.7-2.355%201.7C1.102%2014.3%200%2013.225%200%2011.9s1.102-2.4%202.462-2.4c1.183%200%202.172.815%202.408%201.9h1.337c.236-1.085%201.225-1.9%202.408-1.9%201.184%200%202.172.815%202.408%201.9h.952c.601%200%201.115-.424%201.213-1.003l.102-.592c.198-1.157%201.225-2.005%202.428-2.005h3.436c.274-1.035%201.238-1.8%202.384-1.8C22.898%206%2024%207.075%2024%208.4zm-1.23%200c0%20.663-.552%201.2-1.232%201.2-.68%200-1.23-.537-1.23-1.2%200-.663.55-1.2%201.23-1.2.68%200%201.231.537%201.231%201.2zM2.461%2013.1c.68%200%201.23-.537%201.23-1.2%200-.663-.55-1.2-1.23-1.2-.68%200-1.231.537-1.231%201.2%200%20.663.55%201.2%201.23%201.2zm6.153%200c.68%200%201.231-.537%201.231-1.2%200-.663-.55-1.2-1.23-1.2-.68%200-1.231.537-1.231%201.2%200%20.663.55%201.2%201.23%201.2zm10.462%203.7c.68%200%201.23-.537%201.23-1.2%200-.663-.55-1.2-1.23-1.2-.68%200-1.23.537-1.23%201.2%200%20.663.55%201.2%201.23%201.2z'%20fill='%23EA4B71'%20fill-rule='evenodd'%3e%3c/path%3e%3c/svg%3e";
var nm_default = "data:image/png;base64,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";
var notebooklm_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='512px'%20height='512px'%20viewBox='0%200%20512%20512'%20version='1.1'%3e%3cg%20id='surface1'%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(85.09804%25,85.09804%25,85.09804%25);fill-opacity:1;'%20d='M%20512%20256%20C%20512%20114.613281%20397.386719%200%20256%200%20C%20114.613281%200%200%20114.613281%200%20256%20C%200%20397.386719%20114.613281%20512%20256%20512%20C%20397.386719%20512%20512%20397.386719%20512%20256%20Z%20M%20512%20256%20'/%3e%3cpath%20style='%20stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;'%20d='M%20256.011719%20114.753906%20C%20167.050781%20114.753906%2094.945312%20186.261719%2094.945312%20274.507812%20L%2094.945312%20350.988281%20L%20124.628906%20350.988281%20L%20124.628906%20343.359375%20C%20124.628906%20307.574219%20153.867188%20278.558594%20189.941406%20278.558594%20C%20226.015625%20278.558594%20255.253906%20307.585938%20255.253906%20343.359375%20L%20255.253906%20350.988281%20L%20284.9375%20350.988281%20L%20284.9375%20343.359375%20C%20284.9375%20291.308594%20242.390625%20249.140625%20189.929688%20249.140625%20C%20169.503906%20249.140625%20150.582031%20255.53125%20135.082031%20266.433594%20C%20151.296875%20234.464844%20184.691406%20212.535156%20223.242188%20212.535156%20C%20277.707031%20212.535156%20321.867188%20256.339844%20321.867188%20310.355469%20L%20321.867188%20350.996094%20L%20351.5625%20350.996094%20L%20351.5625%20310.355469%20C%20351.5625%20240.074219%20294.113281%20183.082031%20223.242188%20183.082031%20C%20191.382812%20183.082031%20162.230469%20194.601562%20139.785156%20213.683594%20C%20161.824219%20172.375%20205.578125%20144.214844%20256%20144.214844%20C%20328.566406%20144.214844%20387.382812%20202.550781%20387.382812%20274.515625%20L%20387.382812%20350.996094%20L%20417.066406%20350.996094%20L%20417.066406%20274.515625%20C%20417.066406%20186.28125%20344.960938%20114.761719%20256%20114.761719%20Z%20M%20256.011719%20114.753906%20'/%3e%3c/g%3e%3c/svg%3e";
var perplexity_default = "data:image/webp;base64,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";
var poe_default = "data:image/webp;base64,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";
var qwenlm_default = "data:image/webp;base64,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";
var sensetime_default = "" + new URL("sensetime-DwP1Jke8.png", import.meta.url).href;
var sparkdesk_default = "data:image/webp;base64,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";
var stepfun_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAENklEQVR4nOzdP4tcZRvH8Wue5IkYUUkhQopgEREjKSTR1xAbG7uAbYKlSaPYxML4GpJaQURiEYQUwSKFQshURjaEiO4qCnEZ2eAsWd2wokFwsvpj/8zsPXPy+cA2NzNzrmK+zH3O7p75XwH/SSAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAh2tx6Ah8DxtRtV9dzI2tWTr9Wt8xeazbRBPkEgEAgEAoHAOQhbt+/Ini0/d++B3euevzz/e60sro1hsrHptR6AGfXnm/uVaytjfc0pPHG3xYJAIBAIBAKBQNCdk/SXzr1VB08cH1n7pX+5Lh091WymLtu1t1dPPv/Chh577NrFqnpmZO36e2/WD59eHlkbzi/UyuKdsc65Td25zNur/dWrww+s3mw0TffdW16rQf/6Bh+9/mrX8sLCJp7fjC0WBAKBQCAQCIRW/t96gI0QCK3MxHuvO1extuuxA3vqkae2/sd3D7vV4WrduXG39RjjJpC/HXrnTD174u3WY8ysQf9iXTr6ausxxm0mPuagFZ8gTN7Vk6er6omRtdtXvmg2zyYIhMm7df6z1iNslS0WBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCN23YSUtzn9eXr7/ReoyJWB3+2nqESRDITrq3PKxB33eWzBBbLAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQdOe2P7evfFJrNXpLneH8N83moRO6E8h3H1756wfGyBYLAoFA0J0tVpe9fO5UHTxxuvUYE3fp6Is16N9uPcY/CWQ2PF5V+1sPsQN2tR7gQbZYEAgEAoFA4ByE+76/cLa+Pvt+0xmW5oZNj/8vBMJ9K4u/1aDfyW+J2g5bLAgEAoFAIBAIBAKBQCAQCASC6fs9yL4jh+rYtY8aHPnpBsdkyk1fIL16tHp1uPUYULZYkAkEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCCYvtv+3P35x7p1/kzrMSZiOH+z9QhszvQFsrzwU109+W7rMaBssSATCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBALB9P3DFOt9+8HHNeh/NdFjLM3NTfT1ge6xxYJAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBII/AgAA///g54VAB+LI5wAAAABJRU5ErkJggg==";
var thinkany_default = "" + new URL("thinkany-CGfFbadF.webp", import.meta.url).href;
var tiangong_default = "data:image/png;base64,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";
var wanzhi_default = "data:image/jpeg;base64,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";
var wpslingxi_default = "" + new URL("wpslingxi-Dq6P0WKB.webp", import.meta.url).href;
var xiaoyi_default = "" + new URL("xiaoyi-Bz9WCnRp.webp", import.meta.url).href;
var you_default = "" + new URL("you-DVHYPSHI.jpg", import.meta.url).href;
var yuanbao_default = "data:image/webp;base64,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";
var zai_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2030%2030'%3e%3cstyle%3e%20.bg%20{%20fill:%20%232D2D2D;%20}%20.fg%20{%20fill:%20%23FFFFFF;%20}%20%3c/style%3e%3cpath%20class='bg'%20d='M30,30H0V0h30V30z'/%3e%3cpath%20class='fg'%20d='M15.47,7.1l-1.3,1.85c-0.2,0.29-0.54,0.47-0.9,0.47h-7.1V7.09C6.16,7.1,15.47,7.1,15.47,7.1z'/%3e%3cpolygon%20class='fg'%20points='24.3,7.1%2013.14,22.91%205.7,22.91%2016.86,7.1'/%3e%3cpath%20class='fg'%20d='M14.53,22.91l1.31-1.86c0.2-0.29,0.54-0.47,0.9-0.47h7.09v2.33H14.53z'/%3e%3c/svg%3e";
var zhihu_default = "" + new URL("zhihu-DB2As3_m.png", import.meta.url).href;
var claude_default = "" + new URL("claude-DinCUo5s.png", import.meta.url).href;
var hailuo_default = "" + new URL("hailuo-BIMNDGOY.png", import.meta.url).href;
var qwen_default = "" + new URL("qwen-Bqu9tU27.png", import.meta.url).href;
var deepseek_default = "" + new URL("deepseek-BfIKgrKz.png", import.meta.url).href;
var groq_default = "" + new URL("groq-DxjL3oyr.png", import.meta.url).href;
var openai_default = "" + new URL("openai--2_yMGcs.png", import.meta.url).href;
var silicon_default = "data:image/png;base64,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";
var zhipu_default = "" + new URL("zhipu-CFgqzqwQ.png", import.meta.url).href;
var logger$1 = loggerService.withContext("Config:minapps");
var loadCustomMiniApp = async () => {
	try {
		let content;
		try {
			content = await window.api.file.read("custom-minapps.json");
		} catch (error) {
			content = "[]";
			await window.api.file.writeWithId("custom-minapps.json", content);
		}
		const customApps = JSON.parse(content);
		const now$1 = (/* @__PURE__ */ new Date()).toISOString();
		return customApps.map((app) => ({
			...app,
			type: "Custom",
			logo: app.logo && app.logo !== "" ? app.logo : application_default,
			addTime: app.addTime || now$1,
			supportedRegions: ["CN", "Global"]
		}));
	} catch (error) {
		logger$1.error("Failed to load custom mini apps:", error);
		return [];
	}
};
var ORIGIN_DEFAULT_MIN_APPS = [
	{
		id: "openai",
		name: "ChatGPT",
		url: "https://chatgpt.com/",
		logo: openai_default,
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "gemini",
		name: "Gemini",
		url: "https://gemini.google.com/",
		logo: gemini_default,
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "silicon",
		name: "SiliconFlow",
		url: "https://cloud.siliconflow.cn/playground/chat",
		logo: silicon_default,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		url: "https://chat.deepseek.com/",
		logo: deepseek_default,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "yi",
		name: "Wanzhi",
		nameKey: "minapps.wanzhi",
		url: "https://www.wanzhi.com/",
		logo: wanzhi_default,
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "zhipu",
		name: "ChatGLM",
		nameKey: "minapps.chatglm",
		url: "https://chatglm.cn/main/alltoolsdetail",
		logo: zhipu_default,
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "moonshot",
		name: "Kimi",
		url: "https://kimi.moonshot.cn/",
		logo: kimi_default,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "baichuan",
		name: "Baichuan",
		nameKey: "minapps.baichuan",
		url: "https://ying.baichuan-ai.com/chat",
		logo: baixiaoying_default,
		supportedRegions: ["CN"]
	},
	{
		id: "dashscope",
		name: "Qwen",
		nameKey: "minapps.qwen",
		url: "https://www.qianwen.com",
		logo: qwen_default,
		supportedRegions: ["CN"]
	},
	{
		id: "stepfun",
		name: "Stepfun",
		nameKey: "minapps.stepfun",
		url: "https://stepfun.com",
		logo: stepfun_default,
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "doubao",
		name: "Doubao",
		nameKey: "minapps.doubao",
		url: "https://www.doubao.com/chat/",
		logo: doubao_default,
		supportedRegions: ["CN"]
	},
	{
		id: "cici",
		name: "Cici",
		url: "https://www.cici.com/chat/",
		logo: cici_default,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "hailuo",
		name: "Hailuo",
		nameKey: "minapps.hailuo",
		url: "https://hailuoai.com/",
		logo: hailuo_default,
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "minimax-agent",
		name: "Minimax Agent",
		nameKey: "minapps.minimax-agent",
		url: "https://agent.minimaxi.com/",
		logo: minimax_agent_default,
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "minimax-agent-global",
		name: "Minimax Agent",
		nameKey: "minapps.minimax-global",
		url: "https://agent.minimax.io/",
		logo: minimax_agent_default,
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "ima",
		name: "ima",
		nameKey: "minapps.ima",
		url: "https://ima.qq.com/",
		logo: ima_default,
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "groq",
		name: "Groq",
		url: "https://chat.groq.com/",
		logo: groq_default,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "anthropic",
		name: "Claude",
		url: "https://claude.ai/",
		logo: claude_default,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "google",
		name: "Google",
		url: "https://google.com/",
		logo: google_default,
		bodered: true,
		style: { padding: 5 },
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "baidu-ai-chat",
		name: "Wenxin",
		nameKey: "minapps.wenxin",
		logo: baidu_ai_default,
		url: "https://yiyan.baidu.com/",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "baidu-ai-search",
		name: "Baidu AI Search",
		nameKey: "minapps.baidu-ai-search",
		logo: baidu_ai_search_default,
		url: "https://chat.baidu.com/",
		bodered: true,
		style: { padding: 5 },
		supportedRegions: ["CN"]
	},
	{
		id: "tencent-yuanbao",
		name: "Tencent Yuanbao",
		nameKey: "minapps.tencent-yuanbao",
		logo: yuanbao_default,
		url: "https://yuanbao.tencent.com/chat",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "sensetime-chat",
		name: "Sensechat",
		nameKey: "minapps.sensechat",
		logo: sensetime_default,
		url: "https://chat.sensetime.com/wb/chat",
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "spark-desk",
		name: "SparkDesk",
		logo: sparkdesk_default,
		url: "https://xinghuo.xfyun.cn/desk",
		supportedRegions: ["CN"]
	},
	{
		id: "metaso",
		name: "Metaso",
		nameKey: "minapps.metaso",
		logo: metaso_default,
		url: "https://metaso.cn/",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "poe",
		name: "Poe",
		logo: poe_default,
		url: "https://poe.com",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "perplexity",
		name: "Perplexity",
		logo: perplexity_default,
		url: "https://www.perplexity.ai/",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "devv",
		name: "DEVV_",
		logo: devv_default,
		url: "https://devv.ai/",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "tiangong-ai",
		name: "Tiangong AI",
		nameKey: "minapps.tiangong-ai",
		logo: tiangong_default,
		url: "https://www.tiangong.cn/",
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "Felo",
		name: "Felo",
		logo: felo_default,
		url: "https://felo.ai/",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "duckduckgo",
		name: "DuckDuckGo",
		logo: duckduckgo_default,
		url: "https://duck.ai",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "bolt",
		name: "bolt",
		logo: bolt_default,
		url: "https://bolt.new/",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "nm",
		name: "Nami AI",
		nameKey: "minapps.nami-ai",
		logo: nm_default,
		url: "https://bot.n.cn/",
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "thinkany",
		name: "ThinkAny",
		logo: thinkany_default,
		url: "https://thinkany.ai/",
		bodered: true,
		style: { padding: 5 },
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "github-copilot",
		name: "GitHub Copilot",
		logo: github_copilot_default,
		url: "https://github.com/copilot",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "genspark",
		name: "Genspark",
		logo: genspark_default,
		url: "https://www.genspark.ai/",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "grok",
		name: "Grok",
		logo: grok_default,
		url: "https://grok.com",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "grok-x",
		name: "Grok / X",
		logo: grok_x_default,
		url: "https://x.com/i/grok",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "qwenlm",
		name: "QwenChat",
		logo: qwenlm_default,
		url: "https://chat.qwen.ai",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "flowith",
		name: "Flowith",
		logo: flowith_default,
		url: "https://www.flowith.io/",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "3mintop",
		name: "3MinTop",
		logo: _3mintop_default,
		url: "https://3min.top",
		bodered: false,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "aistudio",
		name: "AI Studio",
		logo: aistudio_default,
		url: "https://aistudio.google.com/",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "xiaoyi",
		name: "Xiaoyi",
		nameKey: "minapps.xiaoyi",
		logo: xiaoyi_default,
		url: "https://xiaoyi.huawei.com/chat/",
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "notebooklm",
		name: "NotebookLM",
		logo: notebooklm_default,
		url: "https://notebooklm.google.com/",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "coze",
		name: "Coze",
		logo: coze_default,
		url: "https://www.coze.com/space",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "dify",
		name: "Dify",
		logo: dify_default,
		url: "https://cloud.dify.ai/apps",
		bodered: true,
		style: { padding: 5 },
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "wpslingxi",
		name: "WPS AI",
		nameKey: "minapps.wps-copilot",
		logo: wpslingxi_default,
		url: "https://copilot.wps.cn/",
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "lechat",
		name: "LeChat",
		logo: lechat_default,
		url: "https://chat.mistral.ai/chat",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "abacus",
		name: "Abacus",
		logo: abacus_default,
		url: "https://apps.abacus.ai/chatllm",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "lambdachat",
		name: "Lambda Chat",
		logo: lambdachat_default,
		url: "https://lambda.chat/",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "monica",
		name: "Monica",
		logo: monica_default,
		url: "https://monica.im/home/",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "you",
		name: "You",
		logo: you_default,
		url: "https://you.com/",
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "zhihu",
		name: "Zhihu Zhida",
		nameKey: "minapps.zhihu",
		logo: zhihu_default,
		url: "https://zhida.zhihu.com/",
		bodered: true,
		supportedRegions: ["CN"]
	},
	{
		id: "dangbei",
		name: "Dangbei AI",
		nameKey: "minapps.dangbei",
		logo: dangbei_default,
		url: "https://ai.dangbei.com/",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: `zai`,
		name: `Z.ai`,
		logo: zai_default,
		url: `https://chat.z.ai/`,
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "n8n",
		name: "n8n",
		logo: n8n_default,
		url: "https://app.n8n.cloud/",
		bodered: true,
		style: { padding: 5 },
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "longcat",
		name: "LongCat",
		logo: longcat_default,
		url: "https://longcat.chat/",
		bodered: true,
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "ling",
		name: "Ant Ling",
		nameKey: "minapps.ant-ling",
		url: "https://ling.tbox.cn/chat",
		logo: ling_default,
		bodered: true,
		style: { padding: 6 },
		supportedRegions: ["CN", "Global"]
	},
	{
		id: "huggingchat",
		name: "HuggingChat",
		url: "https://huggingface.co/chat/",
		logo: huggingchat_default,
		bodered: true,
		style: { padding: 6 },
		supportedRegions: ["CN", "Global"]
	}
];
var allMinApps = [...ORIGIN_DEFAULT_MIN_APPS, ...await loadCustomMiniApp()];
function updateAllMinApps(apps) {
	allMinApps = apps;
}
var MinAppIcon = ({ app, size = 48, style, sidebar = false }) => {
	const _app = allMinApps.find((item) => item.id === app.id);
	if (_app) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: _app.logo,
		className: "select-none rounded-2xl",
		style: {
			border: _app.bodered ? "0.5px solid var(--color-border)" : "none",
			width: `${size}px`,
			height: `${size}px`,
			backgroundColor: _app.background,
			userSelect: "none",
			...sidebar ? {} : app.style,
			...style
		},
		draggable: false,
		alt: app.name || "MinApp Icon"
	});
	if (app.logo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: app.logo,
		className: "select-none rounded-2xl",
		style: {
			border: "none",
			width: `${size}px`,
			height: `${size}px`,
			backgroundColor: "transparent",
			userSelect: "none",
			...sidebar ? {} : app.style,
			...style
		},
		draggable: false,
		alt: app.name || "MinApp Icon"
	});
	return null;
};
var MinAppIcon_default = MinAppIcon;
dt.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
dt.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
dt.i`
  color: var(--color-link);
  font-size: 16px;
  margin-right: 6px;
`;
var RefreshIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
	size: "1rem",
	...props
});
var RefreshIcon_default = RefreshIcon;
var ResetIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
	size: "1rem",
	...props
});
var ResetIcon_default = ResetIcon;
const lightbulbVariants = {
	active: {
		opacity: [
			1,
			.2,
			1
		],
		transition: {
			duration: 1.2,
			ease: "easeInOut",
			times: [
				0,
				.5,
				1
			],
			repeat: Infinity
		}
	},
	idle: {
		opacity: 1,
		transition: {
			duration: .3,
			ease: "easeInOut"
		}
	}
};
const lightbulbSoftVariants = {
	active: {
		opacity: [
			1,
			.5,
			1
		],
		transition: {
			duration: 2,
			ease: "easeInOut",
			times: [
				0,
				.5,
				1
			],
			repeat: Infinity
		}
	},
	idle: {
		opacity: 1,
		transition: {
			duration: .3,
			ease: "easeInOut"
		}
	}
};
const StreamlineGoodHealthAndWellBeing = (props) => {
	const { size = "1em", isActive, ...svgProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		variants: lightbulbVariants,
		animate: isActive ? "active" : "idle",
		initial: "idle",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			width: size,
			height: size,
			viewBox: "0 -2 14 16",
			...svgProps,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "none",
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: 1.2,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m10.097 12.468l-2.773-2.52c-1.53-1.522.717-4.423 2.773-2.045c2.104-2.33 4.303.57 2.773 2.045z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M.621 6.088h1.367l1.823 3.19l4.101-7.747l1.823 3.646" })]
			})
		})
	});
};
function MdiLightbulbOffOutline(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12 2C9.76 2 7.78 3.05 6.5 4.68l1.43 1.43C8.84 4.84 10.32 4 12 4a5 5 0 0 1 5 5c0 1.68-.84 3.16-2.11 4.06l1.42 1.44C17.94 13.21 19 11.24 19 9a7 7 0 0 0-7-7M3.28 4L2 5.27L5.04 8.3C5 8.53 5 8.76 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h5.73l4 4L20 20.72zm3.95 6.5l5.5 5.5H10v-2.42a5 5 0 0 1-2.77-3.08M9 20v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1z"
		})
	});
}
function MdiLightbulbAutoOutline(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M9 2c3.87 0 7 3.13 7 7c0 2.38-1.19 4.47-3 5.74V17c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-2.26C3.19 13.47 2 11.38 2 9c0-3.87 3.13-7 7-7M6 21v-1h6v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1M9 4C6.24 4 4 6.24 4 9c0 2.05 1.23 3.81 3 4.58V16h4v-2.42c1.77-.77 3-2.53 3-4.58c0-2.76-2.24-5-5-5m10 9h-2l-3.2 9h1.9l.7-2h3.2l.7 2h1.9zm-2.15 5.65L18 15l1.15 3.65z"
		})
	});
}
function MdiLightbulbOn30(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M7 5.6L5.6 7L3.5 4.9L4.9 3.5L7 5.6M1 13H4V11H1V13M13 1H11V4H13V1M18 12C18 14.2 16.8 16.2 15 17.2V19C15 19.6 14.6 20 14 20H10C9.4 20 9 19.6 9 19V17.2C7.2 16.2 6 14.2 6 12C6 8.7 8.7 6 12 6S18 8.7 18 12M16 12C16 9.79 14.21 8 12 8S8 9.79 8 12C8 13.2 8.54 14.27 9.38 15H14.62C15.46 14.27 16 13.2 16 12M10 22C10 22.6 10.4 23 11 23H13C13.6 23 14 22.6 14 22V21H10V22M20 11V13H23V11H20M19.1 3.5L17 5.6L18.4 7L20.5 4.9L19.1 3.5Z"
		})
	});
}
function MdiLightbulbOn50(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M1 11h3v2H1zm9 11c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1h-4zm3-21h-2v3h2zM4.9 3.5L3.5 4.9L5.6 7L7 5.6zM20 11v2h3v-2zm-.9-7.5L17 5.6L18.4 7l2.1-2.1zM18 12c0 2.2-1.2 4.2-3 5.2V19c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-1.8c-1.8-1-3-3-3-5.2c0-3.3 2.7-6 6-6s6 2.7 6 6M8 12c0 .35.05.68.14 1h7.72c.09-.32.14-.65.14-1c0-2.21-1.79-4-4-4s-4 1.79-4 4"
		})
	});
}
function MdiLightbulbOn80(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M7 5.6L5.6 7L3.5 4.9L4.9 3.5L7 5.6M1 13H4V11H1V13M13 1H11V4H13V1M10 22C10 22.6 10.4 23 11 23H13C13.6 23 14 22.6 14 22V21H10V22M20 11V13H23V11H20M19.1 3.5L17 5.6L18.4 7L20.5 4.9L19.1 3.5M18 12C18 14.2 16.8 16.2 15 17.2V19C15 19.6 14.6 20 14 20H10C9.4 20 9 19.6 9 19V17.2C7.2 16.2 6 14.2 6 12C6 8.7 8.7 6 12 6S18 8.7 18 12M8.56 10H15.44C14.75 8.81 13.5 8 12 8S9.25 8.81 8.56 10Z"
		})
	});
}
function MdiLightbulbOn90(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M7 5.6L5.6 7L3.5 4.9l1.4-1.4zM10 22c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-1h-4zm-9-9h3v-2H1zM13 1h-2v3h2zm7 10v2h3v-2zm-.9-7.5L17 5.6L18.4 7l2.1-2.1zM18 12c0 2.2-1.2 4.2-3 5.2V19c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-1.8c-1.8-1-3-3-3-5.2c0-3.3 2.7-6 6-6s6 2.7 6 6m-6-4c-1 0-1.91.38-2.61 1h5.22C13.91 8.38 13 8 12 8"
		})
	});
}
function MdiLightbulbOn(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z"
		})
	});
}
function MdiLightbulbQuestion(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M8 2C11.9 2 15 5.1 15 9C15 11.4 13.8 13.5 12 14.7V17C12 17.6 11.6 18 11 18H5C4.4 18 4 17.6 4 17V14.7C2.2 13.5 1 11.4 1 9C1 5.1 4.1 2 8 2M5 21V20H11V21C11 21.6 10.6 22 10 22H6C5.4 22 5 21.6 5 21M8 4C5.2 4 3 6.2 3 9C3 11.1 4.2 12.8 6 13.6V16H10V13.6C11.8 12.8 13 11.1 13 9C13 6.2 10.8 4 8 4M20.5 14.5V16H19V14.5H20.5M18.5 9.5H17V9C17 7.3 18.3 6 20 6S23 7.3 23 9C23 10 22.5 10.9 21.7 11.4L21.4 11.6C20.8 12 20.5 12.6 20.5 13.3V13.5H19V13.3C19 12.1 19.6 11 20.6 10.4L20.9 10.2C21.3 9.9 21.5 9.5 21.5 9C21.5 8.2 20.8 7.5 20 7.5S18.5 8.2 18.5 9V9.5Z"
		})
	});
}
function BingLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		fill: "currentColor",
		fillRule: "evenodd",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4.842.005a.966.966 0 01.604.142l2.62 1.813c.369.256.492.352.637.496.471.47.752 1.09.797 1.765l.008.847.003 1.441.004 13.002.144-.094 7.015-4.353.015.003.029.01c-.398-.17-.893-.339-1.655-.566l-.484-.146c-.584-.18-.71-.238-.921-.38a2.009 2.009 0 01-.37-.312 2.172 2.172 0 01-.41-.592L11.32 9.063c-.166-.444-.166-.49-.156-.63a.92.92 0 01.806-.864l.094-.01c.044-.005.22.023.29.044l.052.021c.06.026.16.075.313.154l3.63 1.908a6.626 6.626 0 013.292 4.531c.194.99.159 2.037-.102 3.012-.216.805-.639 1.694-1.054 2.213l-.08.099-.047.05c-.01.01-.013.01-.01.002l.043-.074-.072.114c-.011.031-.233.28-.38.425l-.17.161c-.22.202-.431.36-.832.62L13.544 23c-.941.6-1.86.912-2.913.992-.23.018-.854.008-1.074-.017a6.31 6.31 0 01-1.658-.412c-1.854-.738-3.223-2.288-3.705-4.195a8.077 8.077 0 01-.121-.57l-.046-.325a1.123 1.123 0 01-.014-.168l-.006-.029L4 11.617 4.01.866a.981.981 0 01.007-.111.943.943 0 01.825-.75z" })
	});
}
function SearXNGLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 265 265",
		style: { display: "block" },
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: "translate(-40.921 -17.417)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "142.2",
					cy: "122.9",
					r: "85",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "28.3465",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeMiterlimit: "11.3386"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M118.4 77.6c19.8-10.2 44-6.4 59.7 9.4s19.3 40 8.9 59.7",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "14.1732",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeMiterlimit: "11.3386"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "m184.2 202 37-38.6 81.8 78.3-37 38.6z",
					fill: "currentColor"
				})
			]
		})
	});
}
function TavilyLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "42",
		height: "42",
		viewBox: "0 0 42 42",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "m16.44.964 4.921 7.79c.79 1.252-.108 2.883-1.588 2.883H17.76V23.3h-2.91V.088c.61 0 1.22.292 1.59.876z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8.342 8.755 13.263.964a1.864 1.864 0 0 1 1.59-.876V23.3a4.87 4.87 0 0 0-.252-.006c-.99 0-1.907.311-2.658.842V11.637H9.93c-1.48 0-2.38-1.631-1.589-2.882z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M30.278 31H18.031a4.596 4.596 0 0 0 1.219-2.91h22.577c0 .61-.292 1.22-.875 1.59L33.16 34.6c-1.251.791-2.883-.108-2.883-1.588V31z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "m33.16 21.581 7.79 4.921c.585.369.876.979.876 1.589H19.25a4.619 4.619 0 0 0-.858-2.91h11.887V23.17c0-1.48 1.631-2.38 2.882-1.589z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "m8.24 34.25-7.107 7.108a1.864 1.864 0 0 0 1.742.504l8.989-2.03c1.443-.325 1.961-2.114.915-3.16l-1.423-1.423 5.356-5.356a2.805 2.805 0 0 0 0-3.966l-.074-.075L8.24 34.25z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "m7.243 31.135 5.355-5.356a2.805 2.805 0 0 1 3.967 0l.074.074-8.397 8.397-7.108 7.108a1.864 1.864 0 0 1-.504-1.742l2.029-8.989c.325-1.444 2.115-1.961 3.161-.915l1.423 1.423z",
				fill: "currentColor"
			})
		]
	});
}
function ExaLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		fill: "currentColor",
		fillRule: "evenodd",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Exa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			"clip-rule": "evenodd",
			d: "M3 0h19v1.791L13.892 12 22 22.209V24H3V0zm9.62 10.348l6.589-8.557H6.03l6.59 8.557zM5.138 3.935v7.17h5.52l-5.52-7.17zm5.52 8.96h-5.52v7.17l5.52-7.17zM6.03 22.21l6.59-8.557 6.589 8.557H6.03z"
		})]
	});
}
function BochaLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "1em",
		height: "1em",
		viewBox: "0 0 135 116",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M12.5754 13.8123C24.6109 7.94459 39.1223 12.9435 44.9955 24.9805L57.5355 50.6805C60.4695 56.6936 57.9756 63.9478 51.9652 66.8832C51.9627 66.8844 51.9602 66.8856 51.9577 66.8868C45.94 69.8206 38.6843 67.3212 35.7477 61.3027L12.5754 13.8123Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				opacity: "0.64774",
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M0 38.3013C9.46916 28.836 24.813 28.836 34.2822 38.3013L55.2526 59.2631C59.9819 63.9904 59.9852 71.6582 55.2601 76.3896C55.2576 76.3921 55.2551 76.3946 55.2526 76.397C50.5181 81.1297 42.8461 81.1297 38.1116 76.397L0 38.3013Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M86.8777 18.0444C113.939 18.0444 135.876 39.9725 135.876 67.0222C135.876 80.2286 129.086 93.6477 120.585 102.457L117.065 98.2367C111.026 90.9998 108.882 81.2777 111.314 72.1702C111.755 70.5198 111.976 69.0033 111.976 67.6209C111.976 53.6689 100.661 42.3586 86.7029 42.3586C72.7452 42.3586 61.4303 53.6689 61.4303 67.6209C61.4303 81.5728 72.7452 92.8831 86.7029 92.8831C89.3159 92.8831 91.8363 92.4867 94.2071 91.7508C101.312 89.5455 109.054 91.3768 114.419 96.5322L120.585 102.457C111.83 110.626 99.7992 116 86.8777 116C59.8168 116 37.8796 94.0719 37.8796 67.0222C37.8796 39.9725 59.8168 18.0444 86.8777 18.0444Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M37.8796 0C51.2677 0 62.1208 10.8581 62.1208 24.2522V41.7389C62.1208 55.133 51.2677 65.9911 37.8796 65.9911V0Z",
				fill: "currentColor"
			})
		]
	});
}
function ZhipuLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "24px",
		height: "24px",
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M 11.699219 1.800781 C 12.300781 1.984375 12.832031 2.203125 13.375 2.515625 C 13.523438 2.597656 13.671875 2.679688 13.820312 2.765625 C 14.058594 2.902344 14.058594 2.902344 14.296875 3.039062 C 14.632812 3.226562 14.96875 3.417969 15.304688 3.605469 C 15.476562 3.707031 15.652344 3.804688 15.824219 3.902344 C 16.671875 4.382812 17.523438 4.859375 18.375 5.335938 C 18.804688 5.574219 19.234375 5.816406 19.660156 6.054688 C 20.257812 6.386719 20.855469 6.71875 21.449219 7.050781 C 21.460938 8.449219 21.46875 9.851562 21.472656 11.25 C 21.476562 11.902344 21.480469 12.550781 21.484375 13.203125 C 21.488281 13.828125 21.492188 14.457031 21.492188 15.082031 C 21.492188 15.324219 21.496094 15.5625 21.496094 15.800781 C 21.5 16.136719 21.5 16.472656 21.5 16.808594 C 21.503906 17.09375 21.503906 17.09375 21.503906 17.386719 C 21.449219 17.851562 21.449219 17.851562 21.242188 18.125 C 20.917969 18.359375 20.585938 18.558594 20.238281 18.757812 C 20.085938 18.84375 19.929688 18.933594 19.769531 19.027344 C 19.605469 19.121094 19.4375 19.214844 19.265625 19.3125 C 19.003906 19.460938 18.742188 19.613281 18.480469 19.761719 C 18.203125 19.917969 17.929688 20.074219 17.65625 20.234375 C 16.929688 20.648438 16.203125 21.066406 15.476562 21.484375 C 15.140625 21.675781 14.804688 21.867188 14.46875 22.0625 C 14.238281 22.195312 14.238281 22.195312 14.003906 22.328125 C 13.863281 22.410156 13.71875 22.492188 13.574219 22.574219 C 13.265625 22.761719 12.984375 22.957031 12.695312 23.171875 C 12.179688 23.46875 11.972656 23.390625 11.398438 23.25 C 10.996094 23.058594 10.996094 23.058594 10.585938 22.816406 C 10.429688 22.726562 10.277344 22.636719 10.117188 22.542969 C 9.871094 22.398438 9.871094 22.398438 9.617188 22.246094 C 9.445312 22.144531 9.273438 22.042969 9.101562 21.945312 C 8.746094 21.734375 8.386719 21.523438 8.03125 21.316406 C 7.359375 20.917969 6.683594 20.523438 6.007812 20.128906 C 5.703125 19.953125 5.402344 19.773438 5.101562 19.597656 C 4.34375 19.15625 3.578125 18.722656 2.800781 18.308594 C 2.550781 18.148438 2.550781 18.148438 2.398438 17.851562 C 2.378906 17.519531 2.367188 17.183594 2.363281 16.851562 C 2.359375 16.75 2.355469 16.648438 2.355469 16.542969 C 2.335938 15.597656 2.324219 14.652344 2.316406 13.707031 C 2.3125 13.070312 2.304688 12.4375 2.289062 11.800781 C 2.277344 11.1875 2.269531 10.574219 2.265625 9.960938 C 2.265625 9.726562 2.257812 9.492188 2.253906 9.257812 C 2.203125 7.4375 2.203125 7.4375 2.675781 6.871094 C 3.023438 6.632812 3.363281 6.464844 3.75 6.300781 C 3.914062 6.203125 4.078125 6.109375 4.246094 6.007812 C 4.402344 5.925781 4.554688 5.839844 4.710938 5.753906 C 4.839844 5.683594 4.839844 5.683594 4.972656 5.613281 C 5.152344 5.515625 5.332031 5.417969 5.515625 5.316406 C 5.992188 5.058594 6.472656 4.792969 6.949219 4.53125 C 7.046875 4.480469 7.144531 4.425781 7.242188 4.371094 C 8.195312 3.847656 9.140625 3.320312 10.085938 2.785156 C 10.234375 2.703125 10.378906 2.621094 10.53125 2.535156 C 10.664062 2.460938 10.796875 2.382812 10.933594 2.308594 C 11.109375 2.207031 11.109375 2.207031 11.285156 2.109375 C 11.542969 1.96875 11.542969 1.96875 11.699219 1.800781 Z M 11.851562 4.5 C 11.820312 4.652344 11.789062 4.800781 11.753906 4.957031 C 11.207031 7.453125 10.085938 9.570312 7.941406 11.066406 C 6.816406 11.78125 5.628906 12.113281 4.351562 12.449219 C 4.351562 12.5 4.351562 12.550781 4.351562 12.601562 C 4.582031 12.648438 4.582031 12.648438 4.824219 12.699219 C 6.101562 12.984375 7.183594 13.300781 8.25 14.101562 C 8.363281 14.183594 8.476562 14.265625 8.59375 14.351562 C 10.558594 15.933594 11.488281 18.261719 11.851562 20.699219 C 11.898438 20.699219 11.949219 20.699219 12 20.699219 C 12.03125 20.554688 12.058594 20.410156 12.089844 20.257812 C 12.6875 17.503906 13.816406 15.222656 16.242188 13.65625 C 17.253906 13.054688 18.351562 12.8125 19.5 12.601562 C 19.035156 12.289062 18.695312 12.191406 18.160156 12.046875 C 15.792969 11.332031 14.222656 9.945312 13.050781 7.800781 C 12.527344 6.726562 12.175781 5.679688 12 4.5 C 11.949219 4.5 11.902344 4.5 11.851562 4.5 Z M 11.851562 4.5 ",
			fill: "currentColor"
		})
	});
}
function QueritLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "24px",
		height: "24px",
		viewBox: "0 0 350 350",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M170.138 33C248.449 33.0001 312.154 96.7045 312.154 175.016C312.154 202.402 304.341 227.986 290.854 249.697L319.193 272.297L319.18 272.283H319.206C329.617 281.022 330.982 296.542 322.244 306.967C313.505 317.378 297.971 318.742 287.56 310.004L258.037 286.44C233.829 305.564 203.315 317.019 170.151 317.019C111.569 317.019 61.172 281.369 39.4868 230.638C39.268 230.123 38.8295 229.08 38.8295 229.08L105.391 215.323C105.398 215.335 105.882 216.098 106.124 216.481C119.74 237.433 143.344 251.307 170.138 251.307C212.209 251.307 246.442 217.073 246.442 175.003C246.442 132.932 212.209 98.6993 170.138 98.6992C130.049 98.6992 97.0902 129.779 94.0659 169.108L94.0493 169.107C93.4631 177.768 94.0916 180.708 94.143 182.493C94.6704 201.257 79.5104 215.323 61.2358 215.323C42.9611 215.323 28.9973 200.484 28.1479 182.235C27.7816 174.268 28.1591 168.132 28.5922 163.493C34.3864 90.5567 93.3048 33 170.138 33ZM61.725 144.45C61.2875 144.45 60.9781 144.657 60.8237 144.772C60.6567 144.888 60.5154 145.042 60.4125 145.171C60.1938 145.428 59.9874 145.75 59.7944 146.098C59.3954 146.805 58.9453 147.758 58.4692 148.813C57.5297 150.937 56.4483 153.626 55.5346 155.917C55.4703 156.071 55.4064 156.213 55.3549 156.354C54.4026 158.722 52.5229 160.602 50.142 161.541C49.8976 161.631 49.6531 161.734 49.4086 161.837H49.3959C47.1438 162.725 44.5312 163.767 42.4721 164.668C41.4427 165.118 40.5163 165.557 39.8471 165.93C39.5125 166.123 39.1903 166.316 38.9457 166.509C38.8172 166.612 38.6759 166.74 38.5473 166.895C38.4444 167.023 38.2255 167.319 38.1996 167.757C38.1996 167.821 38.225 167.925 38.225 167.925L38.1733 167.923C38.1961 168.279 38.3557 168.552 38.4565 168.709C38.5723 168.902 38.7399 169.057 38.8686 169.173C39.1388 169.417 39.4866 169.649 39.8598 169.868C40.6062 170.319 41.623 170.833 42.7553 171.36C45.0203 172.429 47.8773 173.613 50.1938 174.578H50.2065C50.2322 174.591 50.2454 174.604 50.2582 174.604C52.5489 175.556 54.3636 177.37 55.3032 179.674C55.3289 179.751 55.3673 179.829 55.393 179.919C56.3324 182.235 57.4779 185.028 58.4946 187.241C58.9965 188.348 59.4986 189.34 59.9233 190.073C60.142 190.433 60.3607 190.768 60.5922 191.038C60.708 191.167 60.8623 191.322 61.0424 191.45C61.2097 191.566 61.5445 191.759 61.9819 191.746C62.4194 191.733 62.729 191.527 62.8705 191.411C63.0376 191.283 63.1661 191.141 63.269 191.013C63.4749 190.755 63.6814 190.433 63.8744 190.086C64.2605 189.391 64.7108 188.438 65.1869 187.383C66.1264 185.272 67.2078 182.583 68.1215 180.292C68.1987 180.099 68.2758 179.906 68.353 179.726C69.2924 177.396 71.1196 175.543 73.436 174.591C73.4746 174.578 73.5522 174.539 73.5522 174.539C75.8429 173.587 78.6356 172.442 80.8491 171.412C81.9557 170.897 82.9466 170.408 83.6801 169.971C84.0405 169.752 84.3757 169.533 84.6459 169.302C84.7588 169.2 84.8895 169.067 85.0073 168.915H85.0063C85.0081 168.913 85.0094 168.911 85.0112 168.909C85.0262 168.89 85.0426 168.871 85.0571 168.851C85.1729 168.683 85.353 168.349 85.353 167.911C85.34 167.474 85.1348 167.165 85.019 167.023C84.8903 166.856 84.7482 166.728 84.6196 166.625C84.3622 166.419 84.0403 166.213 83.6928 166.02C82.9979 165.621 82.0585 165.17 81.0034 164.694C78.8929 163.742 76.2292 162.674 73.9643 161.747C73.797 161.683 73.616 161.605 73.4487 161.541C72.4673 161.148 71.5855 160.583 70.8149 159.891C69.7573 158.96 68.9137 157.791 68.3657 156.458C68.3399 156.407 68.3142 156.342 68.2885 156.265C67.3362 153.961 66.1909 151.181 65.1743 148.968C64.6595 147.861 64.1702 146.869 63.7455 146.136C63.5397 145.776 63.308 145.441 63.0893 145.171C62.9735 145.042 62.832 144.887 62.6518 144.759C62.4974 144.643 62.1625 144.45 61.725 144.45Z",
			fill: "currentColor"
		})
	});
}
function McpLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		fill: "currentColor",
		fillRule: "evenodd",
		height: "1em",
		width: "1em",
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "ModelContextProtocol" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z" })
		]
	});
}
function OpenClawIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 120 118",
		fill: "currentColor",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M45.002 45.5449C48.3157 45.5449 51.002 42.8586 51.002 39.5449C51.002 36.2312 48.3157 33.5449 45.002 33.5449C41.6882 33.5449 39.002 36.2312 39.002 39.5449C39.002 42.8586 41.6882 45.5449 45.002 45.5449Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M75.002 45.5449C78.3157 45.5449 81.002 42.8586 81.002 39.5449C81.002 36.2312 78.3157 33.5449 75.002 33.5449C71.6882 33.5449 69.002 36.2312 69.002 39.5449C69.002 42.8586 71.6882 45.5449 75.002 45.5449Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M71.2842 15.5488L70.5815 18.4654L72.3245 18.8853L73.52 17.5491L71.2842 15.5488ZM99.7451 4.34082L100.866 1.55813L100.866 1.5581L99.7451 4.34082ZM102.515 10.8467L105.297 11.9679L105.297 11.9676L102.515 10.8467ZM96.0088 13.6162L94.8879 16.3989L94.8879 16.399L96.0088 13.6162ZM81.4336 19.3965L79.344 17.2439L76.3978 20.1039L80.018 22.0415L81.4336 19.3965ZM103.457 48.2842L100.55 49.0271L101.251 51.767L104.027 51.2295L103.457 48.2842ZM114.877 64.2363L117.56 65.578L117.56 65.5779L114.877 64.2363ZM103.779 68.7988L105.037 66.0753L101.669 64.5199L100.853 68.1384L103.779 68.7988ZM74.877 104.236L73.9283 101.39L71.877 102.074V104.236H74.877ZM74.877 114.236V117.236H77.877V114.236H74.877ZM64.877 114.236H61.877V117.236H64.877V114.236ZM64.877 104.236H67.877V99.8052L63.7628 101.451L64.877 104.236ZM54.877 104.236L55.9911 101.451L51.877 99.8052V104.236H54.877ZM54.877 114.236V117.236H57.877V114.236H54.877ZM44.877 114.236H41.877V117.236H44.877V114.236ZM44.877 104.236H47.877V102.074L45.8256 101.39L44.877 104.236ZM15.9736 68.7988L18.9 68.1384L18.0835 64.52L14.7158 66.0752L15.9736 68.7988ZM4.87695 64.2363L2.19367 65.578L2.19367 65.578L4.87695 64.2363ZM16.2959 48.2842L15.7257 51.2295L18.5021 51.767L19.2025 49.0271L16.2959 48.2842ZM35.9072 20.7939L37.4971 23.338L40.3658 21.5453L38.243 18.9114L35.9072 20.7939ZM27.7021 13.6953L28.8772 10.935L28.8771 10.935L27.7021 13.6953ZM21.5957 13.6201L22.6269 16.4373L22.6272 16.4372L21.5957 13.6201ZM15.1816 10.6436L12.3645 11.6749L12.3646 11.6752L15.1816 10.6436ZM18.1582 4.22949L17.1267 1.41238L17.1266 1.41243L18.1582 4.22949ZM31.6191 4.49414L32.7942 1.73384L32.7942 1.73383L31.6191 4.49414ZM44.8604 16.0088L47.2506 14.1959L47.2505 14.1957L44.8604 16.0088ZM45.1748 16.4785L42.5971 18.0132L43.8233 20.0728L46.1027 19.3314L45.1748 16.4785ZM59.877 14.2363L59.877 11.2363H59.877V14.2363ZM71.2842 15.5488L73.52 17.5491C82.8613 7.10815 91.2071 4.13583 98.6242 7.12354L99.7451 4.34082L100.866 1.5581C89.8639 -2.87373 78.9615 2.46847 69.0484 13.5485L71.2842 15.5488ZM99.7451 4.34082L98.6241 7.12351C99.6487 7.53627 100.145 8.70128 99.7319 9.72576L102.515 10.8467L105.297 11.9676C106.948 7.86933 104.964 3.20904 100.866 1.55813L99.7451 4.34082ZM102.515 10.8467L99.732 9.72551C99.3192 10.7502 98.1539 11.246 97.1297 10.8335L96.0088 13.6162L94.8879 16.399C98.9862 18.0497 103.646 16.0654 105.297 11.9679L102.515 10.8467ZM96.0088 13.6162L97.1297 10.8335C95.0688 10.0033 92.4861 9.67734 89.3977 10.6242C86.3958 11.5445 83.083 13.6144 79.344 17.2439L81.4336 19.3965L83.5232 21.5491C86.8524 18.3173 89.3675 16.9091 91.1564 16.3607C92.8588 15.8387 94.0296 16.0532 94.8879 16.3989L96.0088 13.6162ZM81.4336 19.3965L80.018 22.0415C90.9394 27.8867 97.8236 38.3589 100.55 49.0271L103.457 48.2842L106.364 47.5413C103.295 35.534 95.4996 23.5221 82.8492 16.7515L81.4336 19.3965ZM103.457 48.2842L104.027 51.2295C109.37 50.195 111.86 51.7976 112.891 53.4969C114.071 55.4431 114.212 58.8576 112.194 62.8947L114.877 64.2363L117.56 65.5779C120.12 60.4581 120.647 54.7163 118.021 50.3856C115.245 45.808 109.735 44.013 102.887 45.3389L103.457 48.2842ZM114.877 64.2363L112.194 62.8947C111.065 65.153 109.825 66.102 108.821 66.4641C107.816 66.8263 106.558 66.7775 105.037 66.0753L103.779 68.7988L102.521 71.5224C105.104 72.7152 108.023 73.1294 110.855 72.1087C113.687 71.0879 115.945 68.8081 117.56 65.578L114.877 64.2363ZM103.779 68.7988L100.853 68.1384C99.1081 75.8702 95.2608 83.259 90.3447 89.2076C85.4107 95.1778 79.5544 99.5149 73.9283 101.39L74.877 104.236L75.8257 107.082C82.7933 104.76 89.5301 99.6119 94.9697 93.0298C100.427 86.4261 104.734 78.1952 106.706 69.4592L103.779 68.7988ZM74.877 104.236H71.877V114.236H74.877H77.877V104.236H74.877ZM74.877 114.236V111.236H64.877V114.236V117.236H74.877V114.236ZM64.877 114.236H67.877V104.236H64.877H61.877V114.236H64.877ZM64.877 104.236L63.7628 101.451C61.897 102.197 59.9582 102.221 58.3984 102.013C57.631 101.91 56.9943 101.757 56.5605 101.633C56.3448 101.571 56.183 101.518 56.0842 101.484C56.0349 101.467 56.0017 101.455 55.9857 101.449C55.9777 101.446 55.9741 101.444 55.9749 101.444C55.9754 101.445 55.9769 101.445 55.9796 101.446C55.9809 101.447 55.9826 101.447 55.9845 101.448C55.9855 101.449 55.9865 101.449 55.9876 101.449C55.9881 101.45 55.989 101.45 55.9893 101.45C55.9902 101.451 55.9911 101.451 54.877 104.236C53.7628 107.022 53.7637 107.022 53.7647 107.023C53.7651 107.023 53.7661 107.023 53.7668 107.023C53.7682 107.024 53.7697 107.025 53.7712 107.025C53.7744 107.026 53.7778 107.028 53.7816 107.029C53.7891 107.032 53.7979 107.036 53.808 107.04C53.828 107.047 53.8531 107.057 53.8829 107.068C53.9426 107.09 54.0217 107.119 54.1189 107.153C54.3131 107.22 54.5809 107.308 54.9122 107.402C55.5721 107.591 56.498 107.812 57.6055 107.96C59.7957 108.252 62.8569 108.275 65.9911 107.022L64.877 104.236ZM54.877 104.236H51.877V114.236H54.877H57.877V104.236H54.877ZM54.877 114.236V111.236H44.877V114.236V117.236H54.877V114.236ZM44.877 114.236H47.877V104.236H44.877H41.877V114.236H44.877ZM44.877 104.236L45.8256 101.39C40.1994 99.5149 34.3428 95.1778 29.4086 89.2076C24.4923 83.259 20.6448 75.8703 18.9 68.1384L15.9736 68.7988L13.0472 69.4592C15.0186 78.1953 19.3259 86.4262 24.7837 93.03C30.2236 99.612 36.9606 104.76 43.9283 107.082L44.877 104.236ZM15.9736 68.7988L14.7158 66.0752C13.1954 66.7774 11.9376 66.8261 10.933 66.464C9.92844 66.1019 8.68938 65.153 7.56023 62.8947L4.87695 64.2363L2.19367 65.578C3.80862 68.8079 6.06638 71.0877 8.89838 72.1085C11.7303 73.1292 14.6488 72.7151 17.2314 71.5224L15.9736 68.7988ZM4.87695 64.2363L7.56024 62.8947C5.5417 58.8576 5.68287 55.4431 6.86302 53.4969C7.89337 51.7978 10.3827 50.1952 15.7257 51.2295L16.2959 48.2842L16.8661 45.3389C10.0178 44.0132 4.50848 45.8082 1.73258 50.3859C-0.89352 54.7166 -0.366175 60.4582 2.19367 65.578L4.87695 64.2363ZM16.2959 48.2842L19.2025 49.0271C21.7371 39.1106 27.8693 29.3545 37.4971 23.338L35.9072 20.7939L34.3174 18.2498C23.1842 25.2071 16.2443 36.3716 13.3893 47.5413L16.2959 48.2842ZM35.9072 20.7939L38.243 18.9114C34.7199 14.5399 31.6241 12.1044 28.8772 10.935L27.7021 13.6953L26.5271 16.4556C28.0352 17.0976 30.3907 18.7299 33.5714 22.6765L35.9072 20.7939ZM27.7021 13.6953L28.8771 10.935C25.9594 9.69301 23.2776 9.80948 20.5642 10.803L21.5957 13.6201L22.6272 16.4372C24.108 15.895 25.1964 15.8892 26.5272 16.4556L27.7021 13.6953ZM21.5957 13.6201L20.5646 10.8029C19.5278 11.1824 18.3786 10.6494 17.9987 9.61189L15.1816 10.6436L12.3646 11.6752C13.8837 15.8231 18.4779 17.9559 22.6269 16.4373L21.5957 13.6201ZM15.1816 10.6436L17.9988 9.61222C17.6193 8.5756 18.1521 7.42655 19.1898 7.04655L18.1582 4.22949L17.1266 1.41243C12.9786 2.93142 10.8455 7.52563 12.3645 11.6749L15.1816 10.6436ZM18.1582 4.22949L19.1897 7.0466C22.7176 5.75487 26.4622 5.55941 30.4441 7.25445L31.6191 4.49414L32.7942 1.73383C27.2162 -0.640623 21.8768 -0.326806 17.1267 1.41238L18.1582 4.22949ZM31.6191 4.49414L30.4441 7.25444C34.3444 8.9148 38.2908 12.3123 42.4702 17.8219L44.8604 16.0088L47.2505 14.1957C42.7511 8.26429 38.0388 3.96647 32.7942 1.73384L31.6191 4.49414ZM44.8604 16.0088L42.4701 17.8217C42.5065 17.8697 42.5485 17.9317 42.5971 18.0132L45.1748 16.4785L47.7526 14.9438C47.6103 14.7049 47.4448 14.452 47.2506 14.1959L44.8604 16.0088ZM45.1748 16.4785L46.1027 19.3314C50.2092 17.9957 54.796 17.2363 59.877 17.2363V14.2363V11.2363C54.1904 11.2363 48.9756 12.0875 44.2469 13.6256L45.1748 16.4785ZM59.877 14.2363L59.8769 17.2363C63.7282 17.2363 67.2943 17.6734 70.5815 18.4654L71.2842 15.5488L71.9869 12.6323C68.224 11.7257 64.1854 11.2363 59.877 11.2363L59.877 14.2363Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M74.877 45.2363C78.1907 45.2363 80.877 42.55 80.877 39.2363C80.877 35.9226 78.1907 33.2363 74.877 33.2363C71.5632 33.2363 68.877 35.9226 68.877 39.2363C68.877 42.55 71.5632 45.2363 74.877 45.2363Z" })
		]
	});
}
function OpenClawSidebarIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "1em",
		height: "1em",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 4Q6 1 4 2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 4q2-3 4-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "9",
				cy: "10",
				r: "1.5",
				fill: "currentColor",
				stroke: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "15",
				cy: "10",
				r: "1.5",
				fill: "currentColor",
				stroke: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 21v2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 21v2" })
		]
	});
}
function PoeLogo(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		fill: "currentColor",
		fillRule: "evenodd",
		height: "1em",
		width: "1em",
		viewBox: "0 0 24 24",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Poe" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.708 6.876a1.412 1.412 0 00-1.029-.415h-.006a2.019 2.019 0 01-2.02-2.023A1.415 1.415 0 0016.254 3H4.871A1.412 1.412 0 003.47 4.434a2.026 2.026 0 01-2.025 2.025v.002A1.414 1.414 0 000 7.883v3.642a1.414 1.414 0 001.444 1.42 2.025 2.025 0 012.025 2.02v3.693a.5.5 0 00.89.313l2.051-2.567h9.843a1.412 1.412 0 001.4-1.434v-.002c0-1.12.904-2.025 2.026-2.025a1.412 1.412 0 001.446-1.42V7.88c0-.363-.14-.727-.417-1.005zm-2.42 4.687a2.025 2.025 0 01-2.025 2.005H4.861a2.025 2.025 0 01-2.025-2.005v-3.72A2.026 2.026 0 014.86 5.838h11.4a2.026 2.026 0 012.026 2.005v3.72h.002z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7.413 7.57A1.422 1.422 0 005.99 8.99v1.422a1.422 1.422 0 102.844 0V8.99c0-.784-.636-1.422-1.422-1.422zm6.297 0a1.422 1.422 0 00-1.422 1.421v1.422a1.422 1.422 0 102.844 0V8.99c0-.784-.636-1.422-1.422-1.422z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7.292 22.643l1.993-2.492h9.844a1.413 1.413 0 001.4-1.434 2.025 2.025 0 012.017-2.027h.01A1.409 1.409 0 0024 15.27v-3.594c0-.344-.113-.68-.324-.951l-.397-.519v4.127a1.415 1.415 0 01-1.444 1.42h-.007a2.026 2.026 0 00-2.018 2.025 1.415 1.415 0 01-1.402 1.436H8.565l-2.169 2.712a.574.574 0 00.896.715v.002z",
				fill: "url(#lobe-icons-poe-fill-0)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5.004 19.992l2.12-2.65h9.844a1.414 1.414 0 001.402-1.437c0-1.116.9-2.021 2.014-2.025h.012a1.413 1.413 0 001.443-1.422v-4.13l.52.68c.21.273.324.607.324.95v3.594a1.416 1.416 0 01-1.443 1.42h-.01a2.026 2.026 0 00-2.016 2.026 1.414 1.414 0 01-1.402 1.435H7.97l-1.916 2.4a.671.671 0 01-1.049-.839v-.002z",
				fill: "url(#lobe-icons-poe-fill-1)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: "lobe-icons-poe-fill-0",
				x1: "34.01",
				x2: "1.086",
				y1: "7.303",
				y2: "27.715",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#46A6F7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#8364FF"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				gradientUnits: "userSpaceOnUse",
				id: "lobe-icons-poe-fill-1",
				x1: "4.915",
				x2: "24.34",
				y1: "23.511",
				y2: "9.464",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#FF44D3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#CF4BFF"
				})]
			})] })
		]
	});
}
const VSCodeIcon = (props) => {
	const uid = (0, import_react.useId)();
	const maskId = `mask0${uid}`;
	const filter0Id = `filter0_d${uid}`;
	const filter1Id = `filter1_d${uid}`;
	const gradientId = `paint0_linear${uid}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "100",
		height: "100",
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
				id: maskId,
				style: { maskType: "alpha" },
				maskUnits: "userSpaceOnUse",
				x: "0",
				y: "0",
				width: "100",
				height: "100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z",
					fill: "white"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				mask: `url(#${maskId})`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.29858 63.5832C-0.515693 65.2373 -0.513607 68.0937 1.30308 69.7452L6.81272 74.754C8.29793 76.1042 10.5347 76.2036 12.1338 74.9905L93.3609 13.3699C96.086 11.3026 100 13.2462 100 16.6667V16.4275C100 14.0265 98.6246 11.8378 96.4614 10.7962Z",
						fill: "#0065A9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						filter: `url(#${filter0Id})`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.29858 36.4169C-0.515693 34.7627 -0.513607 31.9063 1.30308 30.2548L6.81272 25.246C8.29793 23.8958 10.5347 23.7964 12.1338 25.0095L93.3609 86.6301C96.086 88.6974 100 86.7538 100 83.3334V83.5726C100 85.9735 98.6246 88.1622 96.4614 89.2038Z",
							fill: "#007ACC"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						filter: `url(#${filter1Id})`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.873633L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.5871C100 85.9891 98.6234 88.1786 96.4586 89.2196L75.8578 99.1263Z",
							fill: "#1F9CF0"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						style: { mixBlendMode: "overlay" },
						opacity: "0.25",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fillRule: "evenodd",
							clipRule: "evenodd",
							d: "M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171ZM74.9544 27.2989L45.0483 50L74.9544 72.7012V27.2989Z",
							fill: `url(#${gradientId})`
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
					id: filter0Id,
					x: "-8.39411",
					y: "15.8291",
					width: "116.727",
					height: "92.2456",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feFlood", {
							floodOpacity: "0",
							result: "BackgroundImageFix"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", {
							in: "SourceAlpha",
							type: "matrix",
							values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feOffset", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "4.16667" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", {
							type: "matrix",
							values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", {
							mode: "overlay",
							in2: "BackgroundImageFix",
							result: "effect1_dropShadow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", {
							mode: "normal",
							in: "SourceGraphic",
							in2: "effect1_dropShadow",
							result: "shape"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
					id: filter1Id,
					x: "60.4167",
					y: "-8.07558",
					width: "47.9167",
					height: "116.151",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feFlood", {
							floodOpacity: "0",
							result: "BackgroundImageFix"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", {
							in: "SourceAlpha",
							type: "matrix",
							values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feOffset", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "4.16667" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", {
							type: "matrix",
							values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", {
							mode: "overlay",
							in2: "BackgroundImageFix",
							result: "effect1_dropShadow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feBlend", {
							mode: "normal",
							in: "SourceGraphic",
							in2: "effect1_dropShadow",
							result: "shape"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: gradientId,
					x1: "49.9392",
					y1: "0.257812",
					x2: "49.9392",
					y2: "99.7423",
					gradientUnits: "userSpaceOnUse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "white",
						stopOpacity: "0"
					})]
				})
			] })
		]
	});
};
const CursorIcon = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		fill: "currentColor",
		fillRule: "evenodd",
		height: "56",
		viewBox: "0 0 24 24",
		width: "56",
		xmlns: "http://www.w3.org/2000/svg",
		style: {
			flex: "0 0 auto",
			lineHeight: 1
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Cursor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z" })]
	});
};
const ZedIcon = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "90",
		viewBox: "0 0 90 90",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M8.4375 5.625C6.8842 5.625 5.625 6.8842 5.625 8.4375V70.3125H0V8.4375C0 3.7776 3.7776 0 8.4375 0H83.7925C87.551 0 89.4333 4.5442 86.7756 7.20186L40.3642 53.6133H53.4375V47.8125H59.0625V55.0195C59.0625 57.3495 57.1737 59.2383 54.8438 59.2383H34.7392L25.0712 68.9062H68.9062V33.75H74.5312V68.9062C74.5312 72.0128 72.0128 74.5312 68.9062 74.5312H19.4462L9.60248 84.375H81.5625C83.1158 84.375 84.375 83.1158 84.375 81.5625V19.6875H90V81.5625C90 86.2224 86.2224 90 81.5625 90H6.20749C2.44898 90 0.566723 85.4558 3.22438 82.7981L49.46 36.5625H36.5625V42.1875H30.9375V35.1562C30.9375 32.8263 32.8263 30.9375 35.1562 30.9375H55.085L64.9288 21.0938H21.0938V56.25H15.4688V21.0938C15.4688 17.9871 17.9871 15.4688 21.0938 15.4688H70.5538L80.3975 5.625H8.4375Z",
			fill: "currentColor"
		})
	});
};
function SvgSpinners180Ring(props) {
	const { size = "1em", ...svgProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		...svgProps,
		className: `animation-rotate ${svgProps.className || ""}`.trim(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
		})
	});
}
var SvgSpinners180Ring_default = SvgSpinners180Ring;
init_es$12();
dt.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
dt(ToolOutlined_default)`
  color: var(--color-primary);
  font-size: 15px;
  margin-right: 6px;
`;
dt.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
dt(Image$1)`
  color: var(--color-primary);
  margin-right: 6px;
`;
init_es$12();
dt.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
dt(GlobalOutlined_default)`
  color: var(--color-link);
  font-size: 15px;
  margin-right: 6px;
`;
await init_es$12();
var logger = loggerService.withContext("ImageViewer");
var ImageViewer = ({ src: rawSrc, style, ...props }) => {
	const { t: t$1 } = useTranslation();
	const { src, loading } = useProxiedImage(rawSrc);
	const handleCopyImage = async (src$1) => {
		try {
			let blob;
			if (src$1.startsWith("data:")) {
				const parseResult = parseDataUrl(src$1);
				if (!parseResult || !parseResult.mediaType || !parseResult.isBase64) throw new Error("Invalid base64 image format");
				const byteArray = gBase64.toUint8Array(parseResult.data);
				blob = new Blob([byteArray.slice()], { type: parseResult.mediaType });
			} else if (src$1.startsWith("file://")) {
				const bytes = await window.api.fs.read(src$1);
				const mimeType = src_default.getType(src$1) || "application/octet-stream";
				blob = new Blob([bytes], { type: mimeType });
			} else blob = await (await fetch(src$1)).blob();
			const pngBlob = await convertImageToPng(blob);
			const item = new ClipboardItem({ "image/png": pngBlob });
			await navigator.clipboard.write([item]);
			window.toast.success(t$1("message.copy.success"));
		} catch (error) {
			const err = error;
			logger.error(`Failed to copy image: ${err.message}`, { stack: err.stack });
			window.toast.error(t$1("message.copy.failed"));
		}
	};
	const getContextMenuItems = (src$1, size = 14) => {
		return [
			{
				key: "copy-image",
				label: t$1("common.copy"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon_default, { size }),
				onClick: () => handleCopyImage(src$1)
			},
			{
				key: "copy-url",
				label: t$1("preview.copy.src"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyIcon_default, { size }),
				onClick: () => {
					navigator.clipboard.writeText(src$1);
					window.toast.success(t$1("message.copy.success"));
				}
			},
			{
				key: "download",
				label: t$1("common.download"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size }),
				onClick: () => download(src$1)
			}
		];
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(skeleton_default.Image, {
		active: true,
		style: style ?? {
			width: 200,
			height: 200
		}
	});
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(skeleton_default.Image, {
		active: false,
		style: style ?? {
			width: 200,
			height: 200
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(dropdown_default, {
		menu: { items: getContextMenuItems(src) },
		trigger: ["contextMenu"],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(image_default, {
			src,
			style,
			onContextMenu: (e$1) => e$1.stopPropagation(),
			...props,
			preview: {
				mask: typeof props.preview === "object" ? props.preview.mask : false,
				...typeof props.preview === "object" ? props.preview : {},
				toolbarRender: (_, { transform: { scale: scale$1 }, actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset } }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarWrapper, {
					size: 12,
					className: "toolbar-wrapper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapOutlined_default, {
							rotate: 90,
							onClick: onFlipY
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapOutlined_default, { onClick: onFlipX }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateLeftOutlined_default, { onClick: onRotateLeft }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateRightOutlined_default, { onClick: onRotateRight }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOutOutlined_default, {
							disabled: scale$1 === 1,
							onClick: onZoomOut
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomInOutlined_default, {
							disabled: scale$1 === 50,
							onClick: onZoomIn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UndoOutlined_default, { onClick: onReset }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyOutlined_default, { onClick: () => handleCopyImage(src) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadOutlined_default, { onClick: () => download(src) })
					]
				})
			}
		})
	});
};
var ToolbarWrapper = dt(space_default)`
  padding: 0px 24px;
  color: #fff;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  .anticon {
    padding: 12px;
    cursor: pointer;
  }
  .anticon:hover {
    opacity: 0.3;
  }
`;
var ImageViewer_default = ImageViewer;
export { ensureLocalImageUrl as $, genColorMapToken as $n, initZoomMotion as $t, MinAppIcon_default as A, genSubStyleComponent as An, withPureRenderTheme as At, download as B, PresetColors as Bn, FormItemPrefixContext as Bt, VSCodeIcon as C, useCSSVarCls_default as Cn, isPresetStatusColor as Ct, lightbulbVariants as D, globalConfig as Dn, addMediaQueryListener as Dt, lightbulbSoftVariants as E, config_provider_default as En, getArrowToken as Et, FilePngIcon as F, resetComponent as Fn, useRowStyle as Ft, isPropValid as G, Variants as Gn, genCompactItemStyle as Gt, FallbackFavicon_default as H, DisabledContextProvider as Hn, NoStyleItemContext as Ht, FileSvgIcon as I, resetIcon as In, skeleton_default as It, isHTMLElement as J, defaultConfig as Jn, generateColor as Jt, usePresence as K, useComponentConfig as Kn, ColorPresets_default as Kt, EditIcon_default as L, textEllipsis as Ln, ContextIsolator_default as Lt, allMinApps as M, genFocusOutline as Mn, prepareToken as Mt, loadCustomMiniApp as N, genFocusStyle as Nn, style_default$5 as Nt, ResetIcon_default as O, genPresetColor as On, removeMediaQueryListener as Ot, updateAllMinApps as P, operationUnit as Pn, useColStyle as Pt, LayoutGroupContext as Q, genControlHeight_default as Qn, collapse_default$1 as Qt, DeleteIcon_default as R, useToken as Rn, FormContext as Rt, TavilyLogo as S, zindexContext_default as Sn, isPresetColor as St, ZhipuLogo as T, replaceElement as Tn, getArrowStyle as Tt, motion as U, DisabledContext_default as Un, VariantContext as Ut, useProxiedImage as V, SizeContext_default as Vn, FormProvider$1 as Vt, init_emotion_is_prop_valid_esm as W, ConfigContext as Wn, button_default as Wt, useIsomorphicLayoutEffect as X, derivative as Xn, getGradientPercentColor as Xt, PresenceContext as Y, theme_default$1 as Yn, getColorAlpha as Yt, useConstant as Z, genFontMapToken_default as Zn, getRoundNumber as Zt, OpenClawSidebarIcon as _, getTransitionName as _n, isPresetSize as _t, CursorIcon as a, slideUpOut as an, en_US_default$1 as ar, captureScrollableAsBlob as at, SearXNGLogo as b, CONTAINER_MAX_OFFSET as bn, OverrideProvider as bt, MdiLightbulbAutoOutline as c, initMotion as cn, captureScrollableIframeAsDataURL as ct, MdiLightbulbOn30 as d, toHexFormat as dn, makeSvgSizeAdaptive as dt, zoomIn as en, defaultPresetColors as er, isExternalUrl as et, MdiLightbulbOn50 as f, convertLegacyProps as fn, svgToPngBlob as ft, OpenClawIcon as g, TARGET_CLS as gn, space_default as gt, MdiLightbulbQuestion as h, wave_default as hn, dropdown_default as ht, BochaLogo as i, slideUpIn as in, en_US_default as ir, withoutTrailingApiVersion as it, ORIGIN_DEFAULT_MIN_APPS as j, clearFix as jn, prepareComponentToken$4 as jt, RefreshIcon_default as k, genStyleHooks as kn, PurePanel_default as kt, MdiLightbulbOffOutline as l, collapse_default as ln, compressImage as lt, MdiLightbulbOn90 as m, useSize_default as mn, image_default as mt, SvgSpinners180Ring_default as n, slideDownIn as nn, useLocale_default as nr, getTrailingApiVersion as nt, ExaLogo as o, initMoveMotion as on, validateMessagesContext_default as or, captureScrollableAsDataURL as ot, MdiLightbulbOn80 as p, useCompactItemContext as pn, svgToSvgBlob as pt, MotionConfigContext as q, DesignTokenContext as qn, genAlphaColor as qt, BingLogo as r, slideDownOut as rn, getConfirmLocale as rr, parseDataUrl as rt, McpLogo as s, initFadeMotion as sn, devUseWarning as sr, captureScrollableIframeAsBlob as st, ImageViewer_default as t, initSlideMotion as tn, seed_default as tr, defaultAppHeaders as tt, MdiLightbulbOn as u, AggregationColor as un, convertToBase64 as ut, PoeLogo as v, motion_default as vn, dropdown_default$1 as vt, ZedIcon as w, cloneElement as wn, getArrowOffsetToken as wt, StreamlineGoodHealthAndWellBeing as x, useZIndex as xn, tooltip_default as xt, QueritLogo as y, unstableSetRender as yn, menu_default as yt, CopyIcon_default as z, formatToken as zn, FormItemInputContext as zt };
