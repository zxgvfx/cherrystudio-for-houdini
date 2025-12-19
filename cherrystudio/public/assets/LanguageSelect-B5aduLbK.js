import { b as __commonJSMin, g as __toESM } from "./chunk-st2fFX3F.js";
import { c_ as init_es$2, d3 as generate, d5 as init_es$1, d6 as FastColor, dh as init_es, dk as getComputedToken, dq as createTheme, ex as require_jsx_runtime } from "./es-DSPzjfxW.js";
import { cp as useTranslate, dE as useTheme, eV as select_default, fV as useSettings, l6 as UNKNOWN } from "./store-vnn7VtLk.js";
import { b as require_react } from "./react-nO8b1aHv.js";
import { X as space_default, aX as config_provider_default, b7 as useToken, b8 as formatToken, bg as DesignTokenContext, bh as defaultConfig, bi as theme_default$1, bj as derivative, bk as genFontMapToken_default, bl as genControlHeight_default, bm as genColorMapToken, bn as defaultPresetColors, bo as seed_default } from "./ImageViewer-CqC9mFia.js";
import { b as require_en_US$1, f as require_common, g as require_objectSpread2, k as require_interopRequireDefault } from "./en_US-CaGzDOwj.js";
var require_MemoryStorage = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var MemoryStorage = class {
		constructor() {
			this.data = /* @__PURE__ */ new Map();
		}
		init() {}
		get(key) {
			return this.data.get(key);
		}
		set(key, value) {
			if (!key) return handleError("set", "a key");
			this.data.set(key, value);
			return true;
		}
		remove(key) {
			if (!key) return handleError("remove", "a key");
			this.data.delete(key);
			return true;
		}
		getAllKeys() {
			return Array.from(this.data.keys());
		}
		clearAll() {
			this.data = /* @__PURE__ */ new Map();
		}
	};
	function handleError(func, param) {
		const message = param ? `${func}() requires at least ${param} as its first parameter.` : func;
		console.warn(message);
		return false;
	}
	exports.default = MemoryStorage;
}));
var require_lib = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const MemoryStorage_1 = __importDefault(require_MemoryStorage());
	var KeyvStorage = class {
		constructor(params = {}) {
			this.env = "";
			this.expiredSuffix = ":expired_time";
			this.keepSuffix = "{[keep]}";
			this.storage = params.driver || new MemoryStorage_1.default();
			this.env = params.env || "";
		}
		init() {
			return __awaiter(this, void 0, void 0, function* () {
				yield this.storage.init();
				this.removeExpiredKeys();
				console.log("[Storage]", "SyncStorage is ready!");
			});
		}
		removeExpiredKeys() {
			this.storage.getAllKeys().forEach((k) => this.removeExpiredKey(k));
		}
		removeExpiredKey(key) {
			if (key.indexOf(this.expiredSuffix) > -1) {
				const cacheValue = this.storage.get(key);
				if (!cacheValue) return;
				const expiredAtTimestamp = new Date(cacheValue.expired_at).getTime();
				const nowTimestamp = (/* @__PURE__ */ new Date()).getTime();
				const expired = expiredAtTimestamp < nowTimestamp;
				const systemTimeChanged = !expired && expiredAtTimestamp - nowTimestamp > cacheValue.ttl;
				if (expired || systemTimeChanged) {
					this.storage.remove(key);
					this.storage.remove(key.replace(this.expiredSuffix, ""));
				}
			}
		}
		getKey(key) {
			return `${key}${this.env}`;
		}
		getExpiredKey(key) {
			return `${key}${this.expiredSuffix}${this.env}`;
		}
		get(key) {
			const keyName = this.getKey(key);
			const expiredKeyName = this.getExpiredKey(key);
			this.removeExpiredKey(expiredKeyName);
			return this.storage.get(keyName);
		}
		set(key, data, { expires } = { expires: null }) {
			if (data === null || data === void 0) return;
			if (expires) {
				if (!(expires instanceof Date)) throw new Error("[Storage] expires params is not a Date type");
				const expiredKey = this.getExpiredKey(key);
				const expiredAt = expires.getTime();
				const nowTimestamp = (/* @__PURE__ */ new Date()).getTime();
				this.storage.set(expiredKey, {
					expired_at: expiredAt,
					ttl: expiredAt - nowTimestamp
				});
			}
			return this.storage.set(this.getKey(key), data);
		}
		exists(key) {
			return !!this.get(key);
		}
		remove(key) {
			return this.storage.remove(this.getExpiredKey(key)) && this.storage.remove(this.getKey(key));
		}
		keys() {
			this.removeExpiredKeys();
			return this.storage.getAllKeys().map((key) => key.replace(this.env, ""));
		}
		clear() {
			return __awaiter(this, void 0, void 0, function* () {
				const keysWillRemove = this.storage.getAllKeys().filter((e) => e.indexOf(this.keepSuffix) < 0);
				keysWillRemove.forEach((key) => this.storage.remove(key));
			});
		}
		clearAll() {
			return __awaiter(this, void 0, void 0, function* () {
				this.storage.clearAll();
			});
		}
	};
	exports.default = KeyvStorage;
}));
init_es();
const getDesignToken = (config) => {
	const theme = (config === null || config === void 0 ? void 0 : config.algorithm) ? createTheme(config.algorithm) : theme_default$1;
	const mergedToken = Object.assign(Object.assign({}, seed_default), config === null || config === void 0 ? void 0 : config.token);
	return getComputedToken(mergedToken, { override: config === null || config === void 0 ? void 0 : config.token }, theme, formatToken);
};
var getDesignToken_default = getDesignToken;
function genSizeMapToken(token) {
	const { sizeUnit, sizeStep } = token;
	const compactSizeStep = sizeStep - 2;
	return {
		sizeXXL: sizeUnit * (compactSizeStep + 10),
		sizeXL: sizeUnit * (compactSizeStep + 6),
		sizeLG: sizeUnit * (compactSizeStep + 2),
		sizeMD: sizeUnit * (compactSizeStep + 2),
		sizeMS: sizeUnit * (compactSizeStep + 1),
		size: sizeUnit * compactSizeStep,
		sizeSM: sizeUnit * compactSizeStep,
		sizeXS: sizeUnit * (compactSizeStep - 1),
		sizeXXS: sizeUnit * (compactSizeStep - 1)
	};
}
const derivative$2 = (token, mapToken) => {
	const mergedMapToken = mapToken !== null && mapToken !== void 0 ? mapToken : derivative(token);
	const fontSize = mergedMapToken.fontSizeSM;
	const controlHeight = mergedMapToken.controlHeight - 4;
	return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, mergedMapToken), genSizeMapToken(mapToken !== null && mapToken !== void 0 ? mapToken : token)), genFontMapToken_default(fontSize)), { controlHeight }), genControlHeight_default(Object.assign(Object.assign({}, mergedMapToken), { controlHeight })));
};
var compact_default = derivative$2;
init_es$1();
const getAlphaColor = (baseColor, alpha) => new FastColor(baseColor).setA(alpha).toRgbString();
const getSolidColor = (baseColor, brightness) => {
	const instance = new FastColor(baseColor);
	return instance.lighten(brightness).toHexString();
};
init_es$2();
const generateColorPalettes = (baseColor) => {
	const colors = generate(baseColor, { theme: "dark" });
	return {
		1: colors[0],
		2: colors[1],
		3: colors[2],
		4: colors[3],
		5: colors[6],
		6: colors[5],
		7: colors[4],
		8: colors[6],
		9: colors[5],
		10: colors[4]
	};
};
const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
	const colorBgBase = bgBaseColor || "#000";
	const colorTextBase = textBaseColor || "#fff";
	return {
		colorBgBase,
		colorTextBase,
		colorText: getAlphaColor(colorTextBase, .85),
		colorTextSecondary: getAlphaColor(colorTextBase, .65),
		colorTextTertiary: getAlphaColor(colorTextBase, .45),
		colorTextQuaternary: getAlphaColor(colorTextBase, .25),
		colorFill: getAlphaColor(colorTextBase, .18),
		colorFillSecondary: getAlphaColor(colorTextBase, .12),
		colorFillTertiary: getAlphaColor(colorTextBase, .08),
		colorFillQuaternary: getAlphaColor(colorTextBase, .04),
		colorBgSolid: getAlphaColor(colorTextBase, .95),
		colorBgSolidHover: getAlphaColor(colorTextBase, 1),
		colorBgSolidActive: getAlphaColor(colorTextBase, .9),
		colorBgElevated: getSolidColor(colorBgBase, 12),
		colorBgContainer: getSolidColor(colorBgBase, 8),
		colorBgLayout: getSolidColor(colorBgBase, 0),
		colorBgSpotlight: getSolidColor(colorBgBase, 26),
		colorBgBlur: getAlphaColor(colorTextBase, .04),
		colorBorder: getSolidColor(colorBgBase, 26),
		colorBorderSecondary: getSolidColor(colorBgBase, 19)
	};
};
init_es$2();
const derivative$1 = (token, mapToken) => {
	const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
		const colors = generate(token[colorKey], { theme: "dark" });
		return Array.from({ length: 10 }, () => 1).reduce((prev, _, i) => {
			prev[`${colorKey}-${i + 1}`] = colors[i];
			prev[`${colorKey}${i + 1}`] = colors[i];
			return prev;
		}, {});
	}).reduce((prev, cur) => {
		prev = Object.assign(Object.assign({}, prev), cur);
		return prev;
	}, {});
	const mergedMapToken = mapToken !== null && mapToken !== void 0 ? mapToken : derivative(token);
	const colorMapToken = genColorMapToken(token, {
		generateColorPalettes,
		generateNeutralColorPalettes
	});
	return Object.assign(Object.assign(Object.assign(Object.assign({}, mergedMapToken), colorPalettes), colorMapToken), {
		colorPrimaryBg: colorMapToken.colorPrimaryBorder,
		colorPrimaryBgHover: colorMapToken.colorPrimaryBorderHover
	});
};
var dark_default = derivative$1;
function useToken$1() {
	const [theme, token, hashId] = useToken();
	return {
		theme,
		token,
		hashId
	};
}
var theme_default = {
	defaultSeed: defaultConfig.token,
	useToken: useToken$1,
	defaultAlgorithm: derivative,
	darkAlgorithm: dark_default,
	compactAlgorithm: compact_default,
	getDesignToken: getDesignToken_default,
	defaultConfig,
	_internalContext: DesignTokenContext
};
var require_de_DE$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$35 = {
		items_per_page: "/ Seite",
		jump_to: "Gehe zu",
		jump_to_confirm: "bestätigen",
		page: "Seite",
		prev_page: "Vorherige Seite",
		next_page: "Nächste Seite",
		prev_5: "5 Seiten zurück",
		next_5: "5 Seiten vor",
		prev_3: "3 Seiten zurück",
		next_3: "3 Seiten vor",
		page_size: "Page Size"
	};
	exports.default = locale$35;
}));
var require_de_DE$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$35 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2$8 = _interopRequireDefault$35(require_objectSpread2());
	var _common$8 = require_common();
	var locale$34 = (0, _objectSpread2$8.default)((0, _objectSpread2$8.default)({}, _common$8.commonLocale), {}, {
		locale: "de_DE",
		today: "Heute",
		now: "Jetzt",
		backToToday: "Zurück zu Heute",
		ok: "OK",
		clear: "Zurücksetzen",
		week: "Woche",
		month: "Monat",
		year: "Jahr",
		timeSelect: "Zeit wählen",
		dateSelect: "Datum wählen",
		monthSelect: "Wähle einen Monat",
		yearSelect: "Wähle ein Jahr",
		decadeSelect: "Wähle ein Jahrzehnt",
		dateFormat: "D.M.YYYY",
		dateTimeFormat: "D.M.YYYY HH:mm:ss",
		previousMonth: "Vorheriger Monat (PageUp)",
		nextMonth: "Nächster Monat (PageDown)",
		previousYear: "Vorheriges Jahr (Ctrl + left)",
		nextYear: "Nächstes Jahr (Ctrl + right)",
		previousDecade: "Vorheriges Jahrzehnt",
		nextDecade: "Nächstes Jahrzehnt",
		previousCentury: "Vorheriges Jahrhundert",
		nextCentury: "Nächstes Jahrhundert"
	});
	exports.default = locale$34;
}));
var require_de_DE$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$33 = {
		placeholder: "Zeit auswählen",
		rangePlaceholder: ["Startzeit", "Endzeit"]
	};
	exports.default = locale$33;
}));
var require_de_DE$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$34 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _de_DE$2 = _interopRequireDefault$34(require_de_DE$5());
	var _de_DE2$1 = _interopRequireDefault$34(require_de_DE$4());
	const locale$32 = {
		lang: Object.assign({
			placeholder: "Datum auswählen",
			rangePlaceholder: ["Startdatum", "Enddatum"],
			shortWeekDays: [
				"So",
				"Mo",
				"Di",
				"Mi",
				"Do",
				"Fr",
				"Sa"
			],
			shortMonths: [
				"Jan",
				"Feb",
				"Mär",
				"Apr",
				"Mai",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Okt",
				"Nov",
				"Dez"
			]
		}, _de_DE$2.default),
		timePickerLocale: Object.assign({}, _de_DE2$1.default)
	};
	exports.default = locale$32;
}));
var require_de_DE$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$33 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _de_DE$1 = _interopRequireDefault$33(require_de_DE$3());
	exports.default = _de_DE$1.default;
}));
var require_de_DE$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$32 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _de_DE = _interopRequireDefault$32(require_de_DE$6());
	var _de_DE2 = _interopRequireDefault$32(require_de_DE$2());
	var _de_DE3 = _interopRequireDefault$32(require_de_DE$3());
	var _de_DE4 = _interopRequireDefault$32(require_de_DE$4());
	const typeTemplate$8 = "${label} ist nicht gültig. ${type} erwartet";
	const localeValues$8 = {
		locale: "de",
		Pagination: _de_DE.default,
		DatePicker: _de_DE3.default,
		TimePicker: _de_DE4.default,
		Calendar: _de_DE2.default,
		global: {
			placeholder: "Bitte auswählen",
			close: "Schließen"
		},
		Table: {
			filterTitle: "Filter-Menü",
			filterConfirm: "OK",
			filterReset: "Zurücksetzen",
			filterEmptyText: "Keine Filter",
			filterSearchPlaceholder: "Suche in Filtern",
			filterCheckAll: "Alle auswählen",
			selectAll: "Selektiere Alle",
			selectInvert: "Selektion Invertieren",
			selectionAll: "Wählen Sie alle Daten aus",
			sortTitle: "Sortieren",
			emptyText: "Keine Daten",
			expand: "Zeile erweitern",
			collapse: "Zeile reduzieren",
			triggerDesc: "Klicken zur absteigenden Sortierung",
			triggerAsc: "Klicken zur aufsteigenden Sortierung",
			cancelSort: "Klicken zum Abbrechen der Sortierung"
		},
		Tour: {
			Next: "Weiter",
			Previous: "Zurück",
			Finish: "Fertig"
		},
		Modal: {
			okText: "OK",
			cancelText: "Abbrechen",
			justOkText: "OK"
		},
		Popconfirm: {
			okText: "OK",
			cancelText: "Abbrechen"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "Suchen",
			itemUnit: "Eintrag",
			itemsUnit: "Einträge",
			remove: "Entfernen",
			selectCurrent: "Alle auf aktueller Seite auswählen",
			removeCurrent: "Auswahl auf aktueller Seite aufheben",
			selectAll: "Alle auswählen",
			deselectAll: "Alle abwählen",
			removeAll: "Auswahl aufheben",
			selectInvert: "Auswahl umkehren"
		},
		Upload: {
			uploading: "Hochladen...",
			removeFile: "Datei entfernen",
			uploadError: "Fehler beim Hochladen",
			previewFile: "Dateivorschau",
			downloadFile: "Download-Datei"
		},
		Empty: { description: "Keine Daten" },
		Text: {
			edit: "Bearbeiten",
			copy: "Kopieren",
			copied: "Kopiert",
			expand: "Erweitern"
		},
		Form: { defaultValidateMessages: {
			default: "Feld-Validierungsfehler: ${label}",
			required: "Bitte geben Sie ${label} an",
			enum: "${label} muss eines der folgenden sein [${enum}]",
			whitespace: "${label} darf kein Leerzeichen sein",
			date: {
				format: "${label} ist ein ungültiges Datumsformat",
				parse: "${label} kann nicht in ein Datum umgewandelt werden",
				invalid: "${label} ist ein ungültiges Datum"
			},
			types: {
				string: typeTemplate$8,
				method: typeTemplate$8,
				array: typeTemplate$8,
				object: typeTemplate$8,
				number: typeTemplate$8,
				date: typeTemplate$8,
				boolean: typeTemplate$8,
				integer: typeTemplate$8,
				float: typeTemplate$8,
				regexp: typeTemplate$8,
				email: typeTemplate$8,
				url: typeTemplate$8,
				hex: typeTemplate$8
			},
			string: {
				len: "${label} muss genau ${len} Zeichen lang sein",
				min: "${label} muss mindestens ${min} Zeichen lang sein",
				max: "${label} darf höchstens ${max} Zeichen lang sein",
				range: "${label} muss zwischen ${min} und ${max} Zeichen lang sein"
			},
			number: {
				len: "${label} muss gleich ${len} sein",
				min: "${label} muss mindestens ${min} sein",
				max: "${label} darf maximal ${max} sein",
				range: "${label} muss zwischen ${min} und ${max} liegen"
			},
			array: {
				len: "Es müssen ${len} ${label} sein",
				min: "Es müssen mindestens ${min} ${label} sein",
				max: "Es dürfen maximal ${max} ${label} sein",
				range: "Die Anzahl an ${label} muss zwischen ${min} und ${max} liegen"
			},
			pattern: { mismatch: "${label} entspricht nicht dem ${pattern} Muster" }
		} },
		Image: { preview: "Vorschau" },
		QRCode: {
			expired: "QR-Code abgelaufen",
			refresh: "Aktualisieren"
		}
	};
	exports.default = localeValues$8;
}));
var require_de_DE = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_de_DE$1();
}));
var require_el_GR$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$31 = {
		items_per_page: "/ σελίδα",
		jump_to: "Μετάβαση",
		jump_to_confirm: "επιβεβαιώνω",
		page: "",
		prev_page: "Προηγούμενη Σελίδα",
		next_page: "Επόμενη Σελίδα",
		prev_5: "Προηγούμενες 5 Σελίδες",
		next_5: "Επόμενες 5 σελίδες",
		prev_3: "Προηγούμενες 3 Σελίδες",
		next_3: "Επόμενες 3 Σελίδες",
		page_size: "Μέγεθος σελίδας"
	};
	exports.default = locale$31;
}));
var require_el_GR$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$31 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2$7 = _interopRequireDefault$31(require_objectSpread2());
	var _common$7 = require_common();
	var locale$30 = (0, _objectSpread2$7.default)((0, _objectSpread2$7.default)({}, _common$7.commonLocale), {}, {
		locale: "el_GR",
		today: "Σήμερα",
		now: "Τώρα",
		backToToday: "Πίσω στη σημερινή μέρα",
		ok: "OK",
		clear: "Καθαρισμός",
		week: "Εβδομάδα",
		month: "Μήνας",
		year: "Έτος",
		timeSelect: "Επιλογή ώρας",
		dateSelect: "Επιλογή ημερομηνίας",
		monthSelect: "Επιλογή μήνα",
		yearSelect: "Επιλογή έτους",
		decadeSelect: "Επιλογή δεκαετίας",
		dateFormat: "D/M/YYYY",
		dateTimeFormat: "D/M/YYYY HH:mm:ss",
		previousMonth: "Προηγούμενος μήνας (PageUp)",
		nextMonth: "Επόμενος μήνας (PageDown)",
		previousYear: "Προηγούμενο έτος (Control + αριστερά)",
		nextYear: "Επόμενο έτος (Control + δεξιά)",
		previousDecade: "Προηγούμενη δεκαετία",
		nextDecade: "Επόμενη δεκαετία",
		previousCentury: "Προηγούμενος αιώνας",
		nextCentury: "Επόμενος αιώνας"
	});
	exports.default = locale$30;
}));
var require_el_GR$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$29 = { placeholder: "Επιλέξτε ώρα" };
	exports.default = locale$29;
}));
var require_el_GR$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$30 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _el_GR$2 = _interopRequireDefault$30(require_el_GR$5());
	var _el_GR2$1 = _interopRequireDefault$30(require_el_GR$4());
	const locale$28 = {
		lang: Object.assign({
			placeholder: "Επιλέξτε ημερομηνία",
			yearPlaceholder: "Επιλέξτε έτος",
			quarterPlaceholder: "Επιλέξτε τρίμηνο",
			monthPlaceholder: "Επιλέξτε μήνα",
			weekPlaceholder: "Επιλέξτε εβδομάδα",
			rangePlaceholder: ["Αρχική ημερομηνία", "Τελική ημερομηνία"],
			rangeYearPlaceholder: ["Αρχικό έτος", "Τελικό έτος"],
			rangeMonthPlaceholder: ["Αρχικός μήνας", "Τελικός μήνας"],
			rangeQuarterPlaceholder: ["Αρχικό τρίμηνο", "Τελικό τρίμηνο"],
			rangeWeekPlaceholder: ["Αρχική εβδομάδα", "Τελική εβδομάδα"]
		}, _el_GR$2.default),
		timePickerLocale: Object.assign({}, _el_GR2$1.default)
	};
	exports.default = locale$28;
}));
var require_el_GR$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$29 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _el_GR$1 = _interopRequireDefault$29(require_el_GR$3());
	exports.default = _el_GR$1.default;
}));
var require_el_GR$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$28 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _el_GR = _interopRequireDefault$28(require_el_GR$6());
	var _el_GR2 = _interopRequireDefault$28(require_el_GR$2());
	var _el_GR3 = _interopRequireDefault$28(require_el_GR$3());
	var _el_GR4 = _interopRequireDefault$28(require_el_GR$4());
	const typeTemplate$7 = "Το ${label} δεν είναι έγκυρο ${type}";
	const localeValues$7 = {
		locale: "el",
		Pagination: _el_GR.default,
		DatePicker: _el_GR3.default,
		TimePicker: _el_GR4.default,
		Calendar: _el_GR2.default,
		global: {
			placeholder: "Παρακαλώ επιλέξτε",
			close: "Κλείσιμο"
		},
		Table: {
			filterTitle: "Μενού φίλτρων",
			filterConfirm: "ΟΚ",
			filterReset: "Επαναφορά",
			filterEmptyText: "Χωρίς φίλτρα",
			filterCheckAll: "Επιλογή όλων",
			filterSearchPlaceholder: "Αναζήτηση στα φίλτρα",
			emptyText: "Δεν υπάρχουν δεδομένα",
			selectAll: "Επιλογή τρέχουσας σελίδας",
			selectInvert: "Αντιστροφή τρέχουσας σελίδας",
			selectNone: "Εκκαθάριση όλων των δεδομένων",
			selectionAll: "Επιλογή όλων των δεδομένων",
			sortTitle: "Ταξινόμηση",
			expand: "Ανάπτυξη σειράς",
			collapse: "Σύμπτυξη σειράς",
			triggerDesc: "Κλικ για φθίνουσα ταξινόμηση",
			triggerAsc: "Κλικ για αύξουσα ταξινόμηση",
			cancelSort: "Κλικ για ακύρωση ταξινόμησης"
		},
		Modal: {
			okText: "ΟΚ",
			cancelText: "Άκυρο",
			justOkText: "Εντάξει"
		},
		Tour: {
			Next: "Επόμενο",
			Previous: "Προηγούμενο",
			Finish: "Τέλος"
		},
		Popconfirm: {
			okText: "ΟΚ",
			cancelText: "Άκυρο"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "Αναζήτηση",
			itemUnit: "αντικείμενο",
			itemsUnit: "αντικείμενα",
			remove: "Αφαίρεση",
			selectCurrent: "Επιλογή τρέχουσας σελίδας",
			removeCurrent: "Αφαίρεση τρέχουσας σελίδας",
			selectAll: "Επιλογή όλων των δεδομένων",
			removeAll: "Αφαίρεση όλων των δεδομένων",
			selectInvert: "Αντιστροφή τρέχουσας σελίδας"
		},
		Upload: {
			uploading: "Μεταφόρτωση...",
			removeFile: "Αφαίρεση αρχείου",
			uploadError: "Σφάλμα μεταφόρτωσης",
			previewFile: "Προεπισκόπηση αρχείου",
			downloadFile: "Λήψη αρχείου"
		},
		Empty: { description: "Δεν υπάρχουν δεδομένα" },
		Icon: { icon: "εικονίδιο" },
		Text: {
			edit: "Επεξεργασία",
			copy: "Αντιγραφή",
			copied: "Αντιγράφηκε",
			expand: "Ανάπτυξη",
			collapse: "Σύμπτυξη"
		},
		Form: {
			optional: "(προαιρετικό)",
			defaultValidateMessages: {
				default: "Σφάλμα επικύρωσης πεδίου για ${label}",
				required: "Παρακαλώ εισάγετε ${label}",
				enum: "Το ${label} πρέπει να είναι ένα από [${enum}]",
				whitespace: "Το ${label} δεν μπορεί να είναι κενός χαρακτήρας",
				date: {
					format: "Η μορφή ημερομηνίας του ${label} είναι άκυρη",
					parse: "Το ${label} δεν μπορεί να μετατραπεί σε ημερομηνία",
					invalid: "Το ${label} είναι μια άκυρη ημερομηνία"
				},
				types: {
					string: typeTemplate$7,
					method: typeTemplate$7,
					array: typeTemplate$7,
					object: typeTemplate$7,
					number: typeTemplate$7,
					date: typeTemplate$7,
					boolean: typeTemplate$7,
					integer: typeTemplate$7,
					float: typeTemplate$7,
					regexp: typeTemplate$7,
					email: typeTemplate$7,
					url: typeTemplate$7,
					hex: typeTemplate$7
				},
				string: {
					len: "Το ${label} πρέπει να είναι ${len} χαρακτήρες",
					min: "Το ${label} πρέπει να είναι τουλάχιστον ${min} χαρακτήρες",
					max: "Το ${label} πρέπει να είναι το πολύ ${max} χαρακτήρες",
					range: "Το ${label} πρέπει να είναι μεταξύ ${min}-${max} χαρακτήρων"
				},
				number: {
					len: "Το ${label} πρέπει να είναι ίσο με ${len}",
					min: "Το ${label} πρέπει να είναι τουλάχιστον ${min}",
					max: "Το ${label} πρέπει να είναι το πολύ ${max}",
					range: "Το ${label} πρέπει να είναι μεταξύ ${min}-${max}"
				},
				array: {
					len: "Πρέπει να είναι ${len} ${label}",
					min: "Τουλάχιστον ${min} ${label}",
					max: "Το πολύ ${max} ${label}",
					range: "Το ποσό του ${label} πρέπει να είναι μεταξύ ${min}-${max}"
				},
				pattern: { mismatch: "Το ${label} δεν ταιριάζει με το μοτίβο ${pattern}" }
			}
		},
		Image: { preview: "Προεπισκόπηση" },
		QRCode: {
			expired: "Ο κωδικός QR έληξε",
			refresh: "Ανανέωση",
			scanned: "Σαρώθηκε"
		},
		ColorPicker: {
			presetEmpty: "Κενό",
			transparent: "Διαφανές",
			singleColor: "Μονόχρωμο",
			gradientColor: "Διαβάθμιση χρώματος"
		}
	};
	exports.default = localeValues$7;
}));
var require_el_GR = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_el_GR$1();
}));
var require_en_US = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_en_US$1();
}));
var require_es_ES$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$27 = {
		items_per_page: "/ página",
		jump_to: "Ir a",
		jump_to_confirm: "confirmar",
		page: "Página",
		prev_page: "Página anterior",
		next_page: "Página siguiente",
		prev_5: "5 páginas previas",
		next_5: "5 páginas siguientes",
		prev_3: "3 páginas previas",
		next_3: "3 páginas siguientes",
		page_size: "tamaño de página"
	};
	exports.default = locale$27;
}));
var require_es_ES$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$27 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2$6 = _interopRequireDefault$27(require_objectSpread2());
	var _common$6 = require_common();
	var locale$26 = (0, _objectSpread2$6.default)((0, _objectSpread2$6.default)({}, _common$6.commonLocale), {}, {
		locale: "es_ES",
		today: "Hoy",
		now: "Ahora",
		backToToday: "Volver a hoy",
		ok: "Aceptar",
		clear: "Limpiar",
		week: "Semana",
		month: "Mes",
		year: "Año",
		timeSelect: "Seleccionar hora",
		dateSelect: "Seleccionar fecha",
		monthSelect: "Elegir un mes",
		yearSelect: "Elegir un año",
		decadeSelect: "Elegir una década",
		dateFormat: "D/M/YYYY",
		dateTimeFormat: "D/M/YYYY HH:mm:ss",
		previousMonth: "Mes anterior (PageUp)",
		nextMonth: "Mes siguiente (PageDown)",
		previousYear: "Año anterior (Control + left)",
		nextYear: "Año siguiente (Control + right)",
		previousDecade: "Década anterior",
		nextDecade: "Década siguiente",
		previousCentury: "Siglo anterior",
		nextCentury: "Siglo siguiente"
	});
	exports.default = locale$26;
}));
var require_es_ES$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$25 = { placeholder: "Seleccionar hora" };
	exports.default = locale$25;
}));
var require_es_ES$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$26 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _es_ES$2 = _interopRequireDefault$26(require_es_ES$5());
	var _es_ES2$1 = _interopRequireDefault$26(require_es_ES$4());
	const locale$24 = {
		lang: Object.assign({
			placeholder: "Seleccionar fecha",
			rangePlaceholder: ["Fecha inicial", "Fecha final"],
			shortWeekDays: [
				"Dom",
				"Lun",
				"Mar",
				"Mié",
				"Jue",
				"Vie",
				"Sáb"
			],
			shortMonths: [
				"Ene",
				"Feb",
				"Mar",
				"Abr",
				"May",
				"Jun",
				"Jul",
				"Ago",
				"Sep",
				"Oct",
				"Nov",
				"Dic"
			]
		}, _es_ES$2.default),
		timePickerLocale: Object.assign({}, _es_ES2$1.default)
	};
	exports.default = locale$24;
}));
var require_es_ES$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$25 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _es_ES$1 = _interopRequireDefault$25(require_es_ES$3());
	exports.default = _es_ES$1.default;
}));
var require_es_ES$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$24 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _es_ES = _interopRequireDefault$24(require_es_ES$6());
	var _es_ES2 = _interopRequireDefault$24(require_es_ES$2());
	var _es_ES3 = _interopRequireDefault$24(require_es_ES$3());
	var _es_ES4 = _interopRequireDefault$24(require_es_ES$4());
	const typeTemplate$6 = "${label} no es un ${type} válido";
	const localeValues$6 = {
		locale: "es",
		Pagination: _es_ES.default,
		DatePicker: _es_ES3.default,
		TimePicker: _es_ES4.default,
		Calendar: _es_ES2.default,
		global: {
			placeholder: "Seleccione",
			close: "Cerrar"
		},
		Table: {
			filterTitle: "Filtrar menú",
			filterConfirm: "Aceptar",
			filterReset: "Reiniciar",
			filterEmptyText: "Sin filtros",
			filterCheckAll: "Seleccionar todo",
			filterSearchPlaceholder: "Buscar en filtros",
			emptyText: "Sin datos",
			selectAll: "Seleccionar todo",
			selectInvert: "Invertir selección",
			selectNone: "Vacíe todo",
			selectionAll: "Seleccionar todos los datos",
			sortTitle: "Ordenar",
			expand: "Expandir fila",
			collapse: "Colapsar fila",
			triggerDesc: "Click para ordenar en orden descendente",
			triggerAsc: "Click para ordenar en orden ascendente",
			cancelSort: "Click para cancelar ordenamiento"
		},
		Tour: {
			Next: "Siguiente",
			Previous: "Anterior",
			Finish: "Finalizar"
		},
		Modal: {
			okText: "Aceptar",
			cancelText: "Cancelar",
			justOkText: "Aceptar"
		},
		Popconfirm: {
			okText: "Aceptar",
			cancelText: "Cancelar"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "Buscar aquí",
			itemUnit: "elemento",
			itemsUnit: "elementos",
			remove: "Eliminar",
			selectCurrent: "Seleccionar página actual",
			removeCurrent: "Eliminar página actual",
			selectAll: "Seleccionar todos los datos",
			removeAll: "Eliminar todos los datos",
			selectInvert: "Invertir página actual"
		},
		Upload: {
			uploading: "Subiendo...",
			removeFile: "Eliminar archivo",
			uploadError: "Error al subir el archivo",
			previewFile: "Vista previa",
			downloadFile: "Descargar archivo"
		},
		Empty: { description: "No hay datos" },
		Icon: { icon: "ícono" },
		Text: {
			edit: "Editar",
			copy: "Copiar",
			copied: "Copiado",
			expand: "Expandir"
		},
		Form: {
			optional: "(opcional)",
			defaultValidateMessages: {
				default: "Error de validación del campo ${label}",
				required: "Por favor, rellena ${label}",
				enum: "${label} debe ser uno de [${enum}]",
				whitespace: "${label} no puede ser un carácter en blanco",
				date: {
					format: "El formato de fecha de ${label} es inválido",
					parse: "${label} no se puede convertir a una fecha",
					invalid: "${label} es una fecha inválida"
				},
				types: {
					string: typeTemplate$6,
					method: typeTemplate$6,
					array: typeTemplate$6,
					object: typeTemplate$6,
					number: typeTemplate$6,
					date: typeTemplate$6,
					boolean: typeTemplate$6,
					integer: typeTemplate$6,
					float: typeTemplate$6,
					regexp: typeTemplate$6,
					email: typeTemplate$6,
					url: typeTemplate$6,
					hex: typeTemplate$6
				},
				string: {
					len: "${label} debe tener ${len} caracteres",
					min: "${label} debe tener al menos ${min} caracteres",
					max: "${label} debe tener hasta ${max} caracteres",
					range: "${label} debe tener entre ${min}-${max} caracteres"
				},
				number: {
					len: "${label} debe ser igual a ${len}",
					min: "${label} valor mínimo es ${min}",
					max: "${label} valor máximo es ${max}",
					range: "${label} debe ser entre ${min}-${max}"
				},
				array: {
					len: "Debe ser ${len} ${label}",
					min: "Al menos ${min} ${label}",
					max: "Como máximo ${max} ${label}",
					range: "El valor de ${label} debe estar entre ${min}-${max}"
				},
				pattern: { mismatch: "${label} no coincide con el patrón ${pattern}" }
			}
		},
		Image: { preview: "Previsualización" }
	};
	exports.default = localeValues$6;
}));
var require_es_ES = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_es_ES$1();
}));
var require_fr_FR$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$23 = {
		items_per_page: "/ page",
		jump_to: "Aller à",
		jump_to_confirm: "confirmer",
		page: "Page",
		prev_page: "Page précédente",
		next_page: "Page suivante",
		prev_5: "5 Pages précédentes",
		next_5: "5 Pages suivantes",
		prev_3: "3 Pages précédentes",
		next_3: "3 Pages suivantes",
		page_size: "taille de la page"
	};
	exports.default = locale$23;
}));
var require_fr_FR$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$23 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2$5 = _interopRequireDefault$23(require_objectSpread2());
	var _common$5 = require_common();
	var locale$22 = (0, _objectSpread2$5.default)((0, _objectSpread2$5.default)({}, _common$5.commonLocale), {}, {
		locale: "fr_FR",
		today: "Aujourd'hui",
		now: "Maintenant",
		backToToday: "Aujourd'hui",
		ok: "OK",
		clear: "Rétablir",
		week: "Semaine",
		month: "Mois",
		year: "Année",
		timeSelect: "Sélectionner l'heure",
		dateSelect: "Sélectionner la date",
		monthSelect: "Choisissez un mois",
		yearSelect: "Choisissez une année",
		decadeSelect: "Choisissez une décennie",
		dateFormat: "DD/MM/YYYY",
		dayFormat: "DD",
		dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
		previousMonth: "Mois précédent (PageUp)",
		nextMonth: "Mois suivant (PageDown)",
		previousYear: "Année précédente (Ctrl + gauche)",
		nextYear: "Année prochaine (Ctrl + droite)",
		previousDecade: "Décennie précédente",
		nextDecade: "Décennie suivante",
		previousCentury: "Siècle précédent",
		nextCentury: "Siècle suivant"
	});
	exports.default = locale$22;
}));
var require_fr_FR$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$21 = {
		placeholder: "Sélectionner l'heure",
		rangePlaceholder: ["Heure de début", "Heure de fin"]
	};
	exports.default = locale$21;
}));
var require_fr_FR$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$22 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _fr_FR$2 = _interopRequireDefault$22(require_fr_FR$5());
	var _fr_FR2$1 = _interopRequireDefault$22(require_fr_FR$4());
	const locale$20 = {
		lang: Object.assign({
			placeholder: "Sélectionner une date",
			yearPlaceholder: "Sélectionner une année",
			quarterPlaceholder: "Sélectionner un trimestre",
			monthPlaceholder: "Sélectionner un mois",
			weekPlaceholder: "Sélectionner une semaine",
			rangePlaceholder: ["Date de début", "Date de fin"],
			rangeYearPlaceholder: ["Année de début", "Année de fin"],
			rangeMonthPlaceholder: ["Mois de début", "Mois de fin"],
			rangeWeekPlaceholder: ["Semaine de début", "Semaine de fin"]
		}, _fr_FR$2.default),
		timePickerLocale: Object.assign({}, _fr_FR2$1.default)
	};
	exports.default = locale$20;
}));
var require_fr_FR$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$21 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _fr_FR$1 = _interopRequireDefault$21(require_fr_FR$3());
	exports.default = _fr_FR$1.default;
}));
var require_fr_FR$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$20 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _fr_FR = _interopRequireDefault$20(require_fr_FR$6());
	var _fr_FR2 = _interopRequireDefault$20(require_fr_FR$2());
	var _fr_FR3 = _interopRequireDefault$20(require_fr_FR$3());
	var _fr_FR4 = _interopRequireDefault$20(require_fr_FR$4());
	const typeTemplate$5 = "La valeur du champ ${label} n'est pas valide pour le type ${type}";
	const localeValues$5 = {
		locale: "fr",
		Pagination: _fr_FR.default,
		DatePicker: _fr_FR3.default,
		TimePicker: _fr_FR4.default,
		Calendar: _fr_FR2.default,
		global: { close: "Fermer" },
		Table: {
			filterTitle: "Filtrer",
			filterConfirm: "OK",
			filterReset: "Réinitialiser",
			filterEmptyText: "Aucun filtre",
			filterCheckAll: "Tout sélectionner",
			filterSearchPlaceholder: "Chercher dans les filtres",
			emptyText: "Aucune donnée",
			selectAll: "Sélectionner la page actuelle",
			selectInvert: "Inverser la sélection de la page actuelle",
			selectNone: "Désélectionner toutes les données",
			selectionAll: "Sélectionner toutes les données",
			sortTitle: "Trier",
			expand: "Développer la ligne",
			collapse: "Réduire la ligne",
			triggerDesc: "Trier par ordre décroissant",
			triggerAsc: "Trier par ordre croissant",
			cancelSort: "Annuler le tri"
		},
		Tour: {
			Next: "Étape suivante",
			Previous: "Étape précédente",
			Finish: "Fin de la visite guidée"
		},
		Modal: {
			okText: "OK",
			cancelText: "Annuler",
			justOkText: "OK"
		},
		Popconfirm: {
			okText: "OK",
			cancelText: "Annuler"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "Rechercher",
			itemUnit: "élément",
			itemsUnit: "éléments",
			remove: "Désélectionner",
			selectCurrent: "Sélectionner la page actuelle",
			removeCurrent: "Désélectionner la page actuelle",
			selectAll: "Sélectionner toutes les données",
			removeAll: "Désélectionner toutes les données",
			selectInvert: "Inverser la sélection de la page actuelle"
		},
		Upload: {
			uploading: "Téléchargement...",
			removeFile: "Effacer le fichier",
			uploadError: "Erreur de téléchargement",
			previewFile: "Fichier de prévisualisation",
			downloadFile: "Télécharger un fichier"
		},
		Empty: { description: "Aucune donnée" },
		Icon: { icon: "icône" },
		Text: {
			edit: "Éditer",
			copy: "Copier",
			copied: "Copie effectuée",
			expand: "Développer"
		},
		Form: {
			optional: "(optionnel)",
			defaultValidateMessages: {
				default: "Erreur de validation pour le champ ${label}",
				required: "Le champ ${label} est obligatoire",
				enum: "La valeur du champ ${label} doit être parmi [${enum}]",
				whitespace: "La valeur du champ ${label} ne peut pas être vide",
				date: {
					format: "La valeur du champ ${label} n'est pas au format date",
					parse: "La valeur du champ ${label} ne peut pas être convertie vers une date",
					invalid: "La valeur du champ ${label} n'est pas une date valide"
				},
				types: {
					string: typeTemplate$5,
					method: typeTemplate$5,
					array: typeTemplate$5,
					object: typeTemplate$5,
					number: typeTemplate$5,
					date: typeTemplate$5,
					boolean: typeTemplate$5,
					integer: typeTemplate$5,
					float: typeTemplate$5,
					regexp: typeTemplate$5,
					email: typeTemplate$5,
					url: typeTemplate$5,
					hex: typeTemplate$5
				},
				string: {
					len: "La taille du champ ${label} doit être de ${len} caractères",
					min: "La taille du champ ${label} doit être au minimum de ${min} caractères",
					max: "La taille du champ ${label} doit être au maximum de ${max} caractères",
					range: "La taille du champ ${label} doit être entre ${min} et ${max} caractères"
				},
				number: {
					len: "La valeur du champ ${label} doit être égale à ${len}",
					min: "La valeur du champ ${label} doit être plus grande que ${min}",
					max: "La valeur du champ ${label} doit être plus petit que ${max}",
					range: "La valeur du champ ${label} doit être entre ${min} et ${max}"
				},
				array: {
					len: "La taille du tableau ${label} doit être de ${len}",
					min: "La taille du tableau ${label} doit être au minimum de ${min}",
					max: "La taille du tableau ${label} doit être au maximum de ${max}",
					range: "La taille du tableau ${label} doit être entre ${min}-${max}"
				},
				pattern: { mismatch: "La valeur du champ ${label} ne correspond pas au modèle ${pattern}" }
			}
		},
		Image: { preview: "Aperçu" }
	};
	exports.default = localeValues$5;
}));
var require_fr_FR = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_fr_FR$1();
}));
var require_ja_JP$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$19 = {
		items_per_page: "件 / ページ",
		jump_to: "移動",
		jump_to_confirm: "確認する",
		page: "ページ",
		prev_page: "前のページ",
		next_page: "次のページ",
		prev_5: "前 5ページ",
		next_5: "次 5ページ",
		prev_3: "前 3ページ",
		next_3: "次 3ページ",
		page_size: "ページサイズ"
	};
	exports.default = locale$19;
}));
var require_ja_JP$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$19 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2$4 = _interopRequireDefault$19(require_objectSpread2());
	var _common$4 = require_common();
	var locale$18 = (0, _objectSpread2$4.default)((0, _objectSpread2$4.default)({}, _common$4.commonLocale), {}, {
		locale: "ja_JP",
		today: "今日",
		now: "現在時刻",
		backToToday: "今日に戻る",
		ok: "確定",
		timeSelect: "時間を選択",
		dateSelect: "日時を選択",
		weekSelect: "週を選択",
		clear: "クリア",
		week: "週",
		month: "月",
		year: "年",
		previousMonth: "前月 (ページアップキー)",
		nextMonth: "翌月 (ページダウンキー)",
		monthSelect: "月を選択",
		yearSelect: "年を選択",
		decadeSelect: "年代を選択",
		yearFormat: "YYYY年",
		dateFormat: "YYYY年M月D日",
		dateTimeFormat: "YYYY年M月D日 HH時mm分ss秒",
		previousYear: "前年 (Controlを押しながら左キー)",
		nextYear: "翌年 (Controlを押しながら右キー)",
		previousDecade: "前の年代",
		nextDecade: "次の年代",
		previousCentury: "前の世紀",
		nextCentury: "次の世紀",
		monthBeforeYear: false
	});
	exports.default = locale$18;
}));
var require_ja_JP$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$17 = {
		placeholder: "時間を選択",
		rangePlaceholder: ["開始時間", "終了時間"]
	};
	exports.default = locale$17;
}));
var require_ja_JP$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$18 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _ja_JP$2 = _interopRequireDefault$18(require_ja_JP$5());
	var _ja_JP2$1 = _interopRequireDefault$18(require_ja_JP$4());
	const locale$16 = {
		lang: Object.assign({
			placeholder: "日付を選択",
			yearPlaceholder: "年を選択",
			quarterPlaceholder: "四半期を選択",
			monthPlaceholder: "月を選択",
			weekPlaceholder: "週を選択",
			rangePlaceholder: ["開始日付", "終了日付"],
			rangeYearPlaceholder: ["開始年", "終了年"],
			rangeMonthPlaceholder: ["開始月", "終了月"],
			rangeQuarterPlaceholder: ["開始四半期", "終了四半期"],
			rangeWeekPlaceholder: ["開始週", "終了週"],
			shortWeekDays: [
				"日",
				"月",
				"火",
				"水",
				"木",
				"金",
				"土"
			],
			shortMonths: [
				"1月",
				"2月",
				"3月",
				"4月",
				"5月",
				"6月",
				"7月",
				"8月",
				"9月",
				"10月",
				"11月",
				"12月"
			]
		}, _ja_JP$2.default),
		timePickerLocale: Object.assign({}, _ja_JP2$1.default)
	};
	exports.default = locale$16;
}));
var require_ja_JP$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$17 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _ja_JP$1 = _interopRequireDefault$17(require_ja_JP$3());
	exports.default = _ja_JP$1.default;
}));
var require_ja_JP$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$16 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _ja_JP = _interopRequireDefault$16(require_ja_JP$6());
	var _ja_JP2 = _interopRequireDefault$16(require_ja_JP$2());
	var _ja_JP3 = _interopRequireDefault$16(require_ja_JP$3());
	var _ja_JP4 = _interopRequireDefault$16(require_ja_JP$4());
	const typeTemplate$4 = "${label}は有効な${type}ではありません";
	const localeValues$4 = {
		locale: "ja",
		Pagination: _ja_JP.default,
		DatePicker: _ja_JP3.default,
		TimePicker: _ja_JP4.default,
		Calendar: _ja_JP2.default,
		global: {
			placeholder: "選んでください",
			close: "閉じる"
		},
		Table: {
			filterTitle: "フィルター",
			filterConfirm: "OK",
			filterReset: "リセット",
			filterEmptyText: "フィルターなし",
			filterCheckAll: "すべてを選択",
			filterSearchPlaceholder: "フィルターで検索",
			emptyText: "データなし",
			selectAll: "ページ単位で選択",
			selectInvert: "ページ単位で反転",
			selectNone: "クリア",
			selectionAll: "すべてを選択",
			sortTitle: "ソート",
			expand: "展開する",
			collapse: "折り畳む",
			triggerDesc: "クリックで降順にソート",
			triggerAsc: "クリックで昇順にソート",
			cancelSort: "ソートをキャンセル"
		},
		Tour: {
			Next: "次",
			Previous: "前の",
			Finish: "仕上げる"
		},
		Modal: {
			okText: "OK",
			cancelText: "キャンセル",
			justOkText: "OK"
		},
		Popconfirm: {
			okText: "OK",
			cancelText: "キャンセル"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "ここを検索",
			itemUnit: "アイテム",
			itemsUnit: "アイテム",
			remove: "削除",
			selectCurrent: "現在のページを選択",
			removeCurrent: "現在のページを削除",
			selectAll: "ページ単位で選択",
			deselectAll: "すべてのデータの選択を解除する",
			removeAll: "ページ単位で削除",
			selectInvert: "ページ単位で反転"
		},
		Upload: {
			uploading: "アップロード中...",
			removeFile: "ファイルを削除",
			uploadError: "アップロードエラー",
			previewFile: "ファイルをプレビュー",
			downloadFile: "ダウンロードファイル"
		},
		Empty: { description: "データがありません" },
		Icon: { icon: "アイコン" },
		Text: {
			edit: "編集",
			copy: "コピー",
			copied: "コピーされました",
			expand: "拡大する",
			collapse: "崩壊"
		},
		Form: {
			optional: "(オプション)",
			defaultValidateMessages: {
				default: "${label}のフィールド検証エラー",
				required: "${label}を入力してください",
				enum: "${label}は[${enum}]のいずれかである必要があります",
				whitespace: "${label}は空白文字にすることはできません",
				date: {
					format: "${label}の日付形式は不正です",
					parse: "${label}は日付に変換できません",
					invalid: "${label}は不正な日付です"
				},
				types: {
					string: typeTemplate$4,
					method: typeTemplate$4,
					array: typeTemplate$4,
					object: typeTemplate$4,
					number: typeTemplate$4,
					date: typeTemplate$4,
					boolean: typeTemplate$4,
					integer: typeTemplate$4,
					float: typeTemplate$4,
					regexp: typeTemplate$4,
					email: typeTemplate$4,
					url: typeTemplate$4,
					hex: typeTemplate$4
				},
				string: {
					len: "${label}は${len}文字である必要があります",
					min: "${label}は${min}文字以上である必要があります",
					max: "${label}は${max}文字以下である必要があります",
					range: "${label}は${min}-${max}文字の範囲である必要があります"
				},
				number: {
					len: "${label}は${len}と等しい必要があります",
					min: "${label}の最小値は${min}です",
					max: "${label}の最大値は${max}です",
					range: "${label}は${min}-${max}の範囲である必要があります"
				},
				array: {
					len: "${label}は${len}である必要があります",
					min: "${label}の最小は${min}です",
					max: "${label}の最大は${max}です",
					range: "${label}の合計は${min}-${max}の範囲である必要があります"
				},
				pattern: { mismatch: "${label}はパターン${pattern}と一致しません" }
			}
		},
		Image: { preview: "プレビュー" },
		QRCode: {
			expired: "QRコードの有効期限が切れました",
			refresh: "リフレッシュ",
			scanned: "スキャン済み"
		},
		ColorPicker: {
			presetEmpty: "空の",
			transparent: "透明",
			singleColor: "単色",
			gradientColor: "グラデーション"
		}
	};
	exports.default = localeValues$4;
}));
var require_ja_JP = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_ja_JP$1();
}));
var require_pt_PT$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$15 = {
		items_per_page: "/ página",
		jump_to: "Saltar",
		jump_to_confirm: "confirmar",
		page: "Página",
		prev_page: "Página Anterior",
		next_page: "Página Seguinte",
		prev_5: "Recuar 5 Páginas",
		next_5: "Avançar 5 Páginas",
		prev_3: "Recuar 3 Páginas",
		next_3: "Avançar 3 Páginas",
		page_size: "mărimea paginii"
	};
	exports.default = locale$15;
}));
var require_pt_PT$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$15 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2$3 = _interopRequireDefault$15(require_objectSpread2());
	var _common$3 = require_common();
	var locale$14 = (0, _objectSpread2$3.default)((0, _objectSpread2$3.default)({}, _common$3.commonLocale), {}, {
		locale: "pt_PT",
		today: "Hoje",
		now: "Agora",
		backToToday: "Hoje",
		ok: "OK",
		clear: "Limpar",
		week: "Semana",
		month: "Mês",
		year: "Ano",
		timeSelect: "Selecionar hora",
		dateSelect: "Selecionar data",
		monthSelect: "Selecionar mês",
		yearSelect: "Selecionar ano",
		decadeSelect: "Selecionar década",
		dateFormat: "D/M/YYYY",
		dateTimeFormat: "D/M/YYYY HH:mm:ss",
		previousMonth: "Mês anterior (PageUp)",
		nextMonth: "Mês seguinte (PageDown)",
		previousYear: "Ano anterior (Control + left)",
		nextYear: "Ano seguinte (Control + right)",
		previousDecade: "Década anterior",
		nextDecade: "Década seguinte",
		previousCentury: "Século anterior",
		nextCentury: "Século seguinte",
		shortWeekDays: [
			"Dom",
			"Seg",
			"Ter",
			"Qua",
			"Qui",
			"Sex",
			"Sáb"
		],
		shortMonths: [
			"Jan",
			"Fev",
			"Mar",
			"Abr",
			"Mai",
			"Jun",
			"Jul",
			"Ago",
			"Set",
			"Out",
			"Nov",
			"Dez"
		]
	});
	exports.default = locale$14;
}));
var require_pt_PT$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$13 = { placeholder: "Hora" };
	exports.default = locale$13;
}));
var require_pt_PT$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$14 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _pt_PT$2 = _interopRequireDefault$14(require_pt_PT$5());
	var _pt_PT2$1 = _interopRequireDefault$14(require_pt_PT$4());
	const locale$12 = {
		lang: Object.assign(Object.assign({}, _pt_PT$2.default), {
			placeholder: "Data",
			rangePlaceholder: ["Data inicial", "Data final"],
			today: "Hoje",
			now: "Agora",
			backToToday: "Hoje",
			ok: "OK",
			clear: "Limpar",
			month: "Mês",
			year: "Ano",
			timeSelect: "Hora",
			dateSelect: "Selecionar data",
			monthSelect: "Selecionar mês",
			yearSelect: "Selecionar ano",
			decadeSelect: "Selecionar década",
			yearFormat: "YYYY",
			monthFormat: "MMMM",
			monthBeforeYear: false,
			previousMonth: "Mês anterior (PageUp)",
			nextMonth: "Mês seguinte (PageDown)",
			previousYear: "Ano anterior (Control + left)",
			nextYear: "Ano seguinte (Control + right)",
			previousDecade: "Última década",
			nextDecade: "Próxima década",
			previousCentury: "Último século",
			nextCentury: "Próximo século"
		}),
		timePickerLocale: Object.assign(Object.assign({}, _pt_PT2$1.default), { placeholder: "Hora" })
	};
	exports.default = locale$12;
}));
var require_pt_PT$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$13 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _pt_PT$1 = _interopRequireDefault$13(require_pt_PT$3());
	exports.default = _pt_PT$1.default;
}));
var require_pt_PT$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$12 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _pt_PT = _interopRequireDefault$12(require_pt_PT$6());
	var _pt_PT2 = _interopRequireDefault$12(require_pt_PT$2());
	var _pt_PT3 = _interopRequireDefault$12(require_pt_PT$3());
	var _pt_PT4 = _interopRequireDefault$12(require_pt_PT$4());
	const typeTemplate$3 = "${label} não é um(a) ${type} válido(a)";
	const localeValues$3 = {
		locale: "pt",
		Pagination: _pt_PT.default,
		DatePicker: _pt_PT3.default,
		TimePicker: _pt_PT4.default,
		Calendar: _pt_PT2.default,
		global: {
			placeholder: "Por favor, selecione",
			close: "Fechar"
		},
		Table: {
			filterTitle: "Filtro",
			filterConfirm: "Aplicar",
			filterReset: "Repor",
			filterEmptyText: "Sem filtros",
			filterCheckAll: "Selecionar todos os itens",
			filterSearchPlaceholder: "Pesquisar nos filtros",
			emptyText: "Sem dados",
			selectAll: "Selecionar página atual",
			selectInvert: "Inverter página atual",
			selectNone: "Limpar todos os dados",
			selectionAll: "Selecionar todos os dados",
			sortTitle: "Ordenar",
			expand: "Expandir linha",
			collapse: "Colapsar linha",
			triggerDesc: "Clique para ordenar decrescente",
			triggerAsc: "Clique para ordenar crescente",
			cancelSort: "Clique para cancelar ordenação"
		},
		Tour: {
			Next: "Próximo",
			Previous: "Anterior",
			Finish: "Terminar"
		},
		Modal: {
			okText: "OK",
			cancelText: "Cancelar",
			justOkText: "OK"
		},
		Popconfirm: {
			okText: "OK",
			cancelText: "Cancelar"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "Procurar...",
			itemUnit: "item",
			itemsUnit: "itens",
			remove: "Remover",
			selectCurrent: "Selecionar página atual",
			removeCurrent: "Remover página atual",
			selectAll: "Selecionar tudo",
			deselectAll: "Desmarcar tudo",
			removeAll: "Remover tudo",
			selectInvert: "Inverter página actual"
		},
		Upload: {
			uploading: "A carregar...",
			removeFile: "Remover",
			uploadError: "Erro ao carregar",
			previewFile: "Pré-visualizar",
			downloadFile: "Descarregar"
		},
		Empty: { description: "Sem dados" },
		Icon: { icon: "ícone" },
		Text: {
			edit: "Editar",
			copy: "Copiar",
			copied: "Copiado",
			expand: "Expandir",
			collapse: "Colapsar"
		},
		Form: {
			optional: "(opcional)",
			defaultValidateMessages: {
				default: "Erro de validação no campo ${label}",
				required: "Por favor, introduza ${label}",
				enum: "${label} deve ser um dos valores [${enum}]",
				whitespace: "${label} não pode ser um carácter em branco",
				date: {
					format: "Formato da data ${label} é inválido",
					parse: "${label} não pode ser convertido para data",
					invalid: "${label} é uma data inválida"
				},
				types: {
					string: typeTemplate$3,
					method: typeTemplate$3,
					array: typeTemplate$3,
					object: typeTemplate$3,
					number: typeTemplate$3,
					date: typeTemplate$3,
					boolean: typeTemplate$3,
					integer: typeTemplate$3,
					float: typeTemplate$3,
					regexp: typeTemplate$3,
					email: typeTemplate$3,
					url: typeTemplate$3,
					hex: typeTemplate$3
				},
				string: {
					len: "${label} deve ter ${len} caracteres",
					min: "${label} deve ter pelo menos ${min} caracteres",
					max: "${label} deve ter até ${max} caracteres",
					range: "${label} deve ter entre ${min}-${max} caracteres"
				},
				number: {
					len: "${label} deve ser igual a ${len}",
					min: "${label} deve ser no mínimo ${min}",
					max: "${label} deve ser no máximo ${max}",
					range: "${label} deve estar entre ${min}-${max}"
				},
				array: {
					len: "Deve ter ${len} ${label}",
					min: "Pelo menos ${min} ${label}",
					max: "No máximo ${max} ${label}",
					range: "A quantidade de ${label} deve estar entre ${min}-${max}"
				},
				pattern: { mismatch: "${label} não corresponde ao padrão ${pattern}" }
			}
		},
		Image: { preview: "Pré-visualizar" },
		QRCode: {
			expired: "Código QR expirou",
			refresh: "Atualizar",
			scanned: "Digitalizado"
		},
		ColorPicker: {
			presetEmpty: "Vazio",
			transparent: "Transparente",
			singleColor: "Simples",
			gradientColor: "Gradiente"
		}
	};
	exports.default = localeValues$3;
}));
var require_pt_PT = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_pt_PT$1();
}));
var require_ru_RU$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$11 = {
		items_per_page: "/ стр.",
		jump_to: "Перейти",
		jump_to_confirm: "подтвердить",
		page: "Страница",
		prev_page: "Назад",
		next_page: "Вперед",
		prev_5: "Предыдущие 5",
		next_5: "Следующие 5",
		prev_3: "Предыдущие 3",
		next_3: "Следующие 3",
		page_size: "размер страницы"
	};
	exports.default = locale$11;
}));
var require_ru_RU$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$11 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2$2 = _interopRequireDefault$11(require_objectSpread2());
	var _common$2 = require_common();
	var locale$10 = (0, _objectSpread2$2.default)((0, _objectSpread2$2.default)({}, _common$2.commonLocale), {}, {
		locale: "ru_RU",
		today: "Сегодня",
		now: "Сейчас",
		backToToday: "Текущая дата",
		ok: "ОК",
		clear: "Очистить",
		week: "Неделя",
		month: "Месяц",
		year: "Год",
		timeSelect: "Выбрать время",
		dateSelect: "Выбрать дату",
		monthSelect: "Выбрать месяц",
		yearSelect: "Выбрать год",
		decadeSelect: "Выбрать десятилетие",
		dateFormat: "D-M-YYYY",
		dateTimeFormat: "D-M-YYYY HH:mm:ss",
		previousMonth: "Предыдущий месяц (PageUp)",
		nextMonth: "Следующий месяц (PageDown)",
		previousYear: "Предыдущий год (Control + left)",
		nextYear: "Следующий год (Control + right)",
		previousDecade: "Предыдущее десятилетие",
		nextDecade: "Следущее десятилетие",
		previousCentury: "Предыдущий век",
		nextCentury: "Следующий век"
	});
	exports.default = locale$10;
}));
var require_ru_RU$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$9 = {
		placeholder: "Выберите время",
		rangePlaceholder: ["Время начала", "Время окончания"]
	};
	exports.default = locale$9;
}));
var require_ru_RU$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$10 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _ru_RU$2 = _interopRequireDefault$10(require_ru_RU$5());
	var _ru_RU2$1 = _interopRequireDefault$10(require_ru_RU$4());
	const locale$8 = {
		lang: Object.assign({
			placeholder: "Выберите дату",
			yearPlaceholder: "Выберите год",
			quarterPlaceholder: "Выберите квартал",
			monthPlaceholder: "Выберите месяц",
			weekPlaceholder: "Выберите неделю",
			rangePlaceholder: ["Начальная дата", "Конечная дата"],
			rangeYearPlaceholder: ["Начальный год", "Год окончания"],
			rangeMonthPlaceholder: ["Начальный месяц", "Конечный месяц"],
			rangeWeekPlaceholder: ["Начальная неделя", "Конечная неделя"],
			shortWeekDays: [
				"Вс",
				"Пн",
				"Вт",
				"Ср",
				"Чт",
				"Пт",
				"Сб"
			],
			shortMonths: [
				"Янв",
				"Фев",
				"Мар",
				"Апр",
				"Май",
				"Июн",
				"Июл",
				"Авг",
				"Сен",
				"Окт",
				"Ноя",
				"Дек"
			]
		}, _ru_RU$2.default),
		timePickerLocale: Object.assign({}, _ru_RU2$1.default)
	};
	exports.default = locale$8;
}));
var require_ru_RU$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$9 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _ru_RU$1 = _interopRequireDefault$9(require_ru_RU$3());
	exports.default = _ru_RU$1.default;
}));
var require_ru_RU$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$8 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _ru_RU = _interopRequireDefault$8(require_ru_RU$6());
	var _ru_RU2 = _interopRequireDefault$8(require_ru_RU$2());
	var _ru_RU3 = _interopRequireDefault$8(require_ru_RU$3());
	var _ru_RU4 = _interopRequireDefault$8(require_ru_RU$4());
	const typeTemplate$2 = "${label} не является типом ${type}";
	const localeValues$2 = {
		locale: "ru",
		Pagination: _ru_RU.default,
		DatePicker: _ru_RU3.default,
		TimePicker: _ru_RU4.default,
		Calendar: _ru_RU2.default,
		global: {
			placeholder: "Пожалуйста выберите",
			close: "Закрыть"
		},
		Table: {
			filterTitle: "Фильтр",
			filterConfirm: "OK",
			filterReset: "Сбросить",
			filterEmptyText: "Без фильтров",
			filterCheckAll: "Выбрать все элементы",
			filterSearchPlaceholder: "Поиск в фильтрах",
			emptyText: "Нет данных",
			selectAll: "Выбрать всё",
			selectInvert: "Инвертировать выбор",
			selectNone: "Очистить все данные",
			selectionAll: "Выбрать все данные",
			sortTitle: "Сортировка",
			expand: "Развернуть строку",
			collapse: "Свернуть строку",
			triggerDesc: "Нажмите для сортировки по убыванию",
			triggerAsc: "Нажмите для сортировки по возрастанию",
			cancelSort: "Нажмите, чтобы отменить сортировку"
		},
		Tour: {
			Next: "Далее",
			Previous: "Назад",
			Finish: "Завершить"
		},
		Modal: {
			okText: "OK",
			cancelText: "Отмена",
			justOkText: "OK"
		},
		Popconfirm: {
			okText: "OK",
			cancelText: "Отмена"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "Поиск",
			itemUnit: "элем.",
			itemsUnit: "элем.",
			remove: "Удалить",
			selectAll: "Выбрать все данные",
			deselectAll: "Очистить все данные",
			selectCurrent: "Выбрать текущую страницу",
			selectInvert: "Инвертировать выбор",
			removeAll: "Удалить все данные",
			removeCurrent: "Удалить текущую страницу"
		},
		Upload: {
			uploading: "Загрузка...",
			removeFile: "Удалить файл",
			uploadError: "При загрузке произошла ошибка",
			previewFile: "Предпросмотр файла",
			downloadFile: "Загрузить файл"
		},
		Empty: { description: "Нет данных" },
		Icon: { icon: "иконка" },
		Text: {
			edit: "Редактировать",
			copy: "Копировать",
			copied: "Скопировано",
			expand: "Раскрыть",
			collapse: "Свернуть"
		},
		Form: {
			optional: "(необязательно)",
			defaultValidateMessages: {
				default: "Ошибка проверки поля ${label}",
				required: "Пожалуйста, введите ${label}",
				enum: "${label} должен быть одним из [${enum}]",
				whitespace: "${label} не может быть пустым",
				date: {
					format: "${label} не правильный формат даты",
					parse: "${label} не может быть преобразовано в дату",
					invalid: "${label} не является корректной датой"
				},
				types: {
					string: typeTemplate$2,
					method: typeTemplate$2,
					array: typeTemplate$2,
					object: typeTemplate$2,
					number: typeTemplate$2,
					date: typeTemplate$2,
					boolean: typeTemplate$2,
					integer: typeTemplate$2,
					float: typeTemplate$2,
					regexp: typeTemplate$2,
					email: typeTemplate$2,
					url: typeTemplate$2,
					hex: typeTemplate$2
				},
				string: {
					len: "${label} должна быть ${len} символов",
					min: "${label} должна быть больше или равна ${min} символов",
					max: "${label} должна быть меньше или равна ${max} символов",
					range: "Длина ${label} должна быть между ${min}-${max} символами"
				},
				number: {
					len: "${label} должна быть равна ${len}",
					min: "${label} должна быть больше или равна ${min}",
					max: "${label} должна быть меньше или равна ${max}",
					range: "${label} должна быть между ${min}-${max}"
				},
				array: {
					len: "Количество элементов ${label} должно быть равно ${len}",
					min: "Количество элементов ${label} должно быть больше или равно ${min}",
					max: "Количество элементов ${label} должно быть меньше или равно ${max}",
					range: "Количество элементов ${label} должно быть между ${min} и ${max}"
				},
				pattern: { mismatch: "${label} не соответствует шаблону ${pattern}" }
			}
		},
		Image: { preview: "Предпросмотр" },
		QRCode: {
			expired: "QR-код устарел",
			refresh: "Обновить"
		},
		ColorPicker: {
			presetEmpty: "Пустой",
			transparent: "Прозрачный",
			singleColor: "Один цвет",
			gradientColor: "Градиент"
		}
	};
	exports.default = localeValues$2;
}));
var require_ru_RU = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_ru_RU$1();
}));
var require_zh_CN$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$7 = {
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
	exports.default = locale$7;
}));
var require_zh_CN$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$7 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2$1 = _interopRequireDefault$7(require_objectSpread2());
	var _common$1 = require_common();
	var locale$6 = (0, _objectSpread2$1.default)((0, _objectSpread2$1.default)({}, _common$1.commonLocale), {}, {
		locale: "zh_CN",
		today: "今天",
		now: "此刻",
		backToToday: "返回今天",
		ok: "确定",
		timeSelect: "选择时间",
		dateSelect: "选择日期",
		weekSelect: "选择周",
		clear: "清除",
		week: "周",
		month: "月",
		year: "年",
		previousMonth: "上个月 (翻页上键)",
		nextMonth: "下个月 (翻页下键)",
		monthSelect: "选择月份",
		yearSelect: "选择年份",
		decadeSelect: "选择年代",
		previousYear: "上一年 (Control键加左方向键)",
		nextYear: "下一年 (Control键加右方向键)",
		previousDecade: "上一年代",
		nextDecade: "下一年代",
		previousCentury: "上一世纪",
		nextCentury: "下一世纪",
		yearFormat: "YYYY年",
		cellDateFormat: "D",
		monthBeforeYear: false
	});
	exports.default = locale$6;
}));
var require_zh_CN$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$5 = {
		placeholder: "请选择时间",
		rangePlaceholder: ["开始时间", "结束时间"]
	};
	exports.default = locale$5;
}));
var require_zh_CN$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$6 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _zh_CN$2 = _interopRequireDefault$6(require_zh_CN$5());
	var _zh_CN2$1 = _interopRequireDefault$6(require_zh_CN$4());
	const locale$4 = {
		lang: Object.assign({
			placeholder: "请选择日期",
			yearPlaceholder: "请选择年份",
			quarterPlaceholder: "请选择季度",
			monthPlaceholder: "请选择月份",
			weekPlaceholder: "请选择周",
			rangePlaceholder: ["开始日期", "结束日期"],
			rangeYearPlaceholder: ["开始年份", "结束年份"],
			rangeMonthPlaceholder: ["开始月份", "结束月份"],
			rangeQuarterPlaceholder: ["开始季度", "结束季度"],
			rangeWeekPlaceholder: ["开始周", "结束周"]
		}, _zh_CN$2.default),
		timePickerLocale: Object.assign({}, _zh_CN2$1.default)
	};
	locale$4.lang.ok = "确定";
	exports.default = locale$4;
}));
var require_zh_CN$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$5 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _zh_CN$1 = _interopRequireDefault$5(require_zh_CN$3());
	exports.default = _zh_CN$1.default;
}));
var require_zh_CN$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$4 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _zh_CN = _interopRequireDefault$4(require_zh_CN$6());
	var _zh_CN2 = _interopRequireDefault$4(require_zh_CN$2());
	var _zh_CN3 = _interopRequireDefault$4(require_zh_CN$3());
	var _zh_CN4 = _interopRequireDefault$4(require_zh_CN$4());
	const typeTemplate$1 = "${label}不是一个有效的${type}";
	const localeValues$1 = {
		locale: "zh-cn",
		Pagination: _zh_CN.default,
		DatePicker: _zh_CN3.default,
		TimePicker: _zh_CN4.default,
		Calendar: _zh_CN2.default,
		global: {
			placeholder: "请选择",
			close: "关闭"
		},
		Table: {
			filterTitle: "筛选",
			filterConfirm: "确定",
			filterReset: "重置",
			filterEmptyText: "无筛选项",
			filterCheckAll: "全选",
			filterSearchPlaceholder: "在筛选项中搜索",
			emptyText: "暂无数据",
			selectAll: "全选当页",
			selectInvert: "反选当页",
			selectNone: "清空所有",
			selectionAll: "全选所有",
			sortTitle: "排序",
			expand: "展开行",
			collapse: "关闭行",
			triggerDesc: "点击降序",
			triggerAsc: "点击升序",
			cancelSort: "取消排序"
		},
		Modal: {
			okText: "确定",
			cancelText: "取消",
			justOkText: "知道了"
		},
		Tour: {
			Next: "下一步",
			Previous: "上一步",
			Finish: "结束导览"
		},
		Popconfirm: {
			cancelText: "取消",
			okText: "确定"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "请输入搜索内容",
			itemUnit: "项",
			itemsUnit: "项",
			remove: "删除",
			selectCurrent: "全选当页",
			removeCurrent: "删除当页",
			selectAll: "全选所有",
			deselectAll: "取消全选",
			removeAll: "删除全部",
			selectInvert: "反选当页"
		},
		Upload: {
			uploading: "文件上传中",
			removeFile: "删除文件",
			uploadError: "上传错误",
			previewFile: "预览文件",
			downloadFile: "下载文件"
		},
		Empty: { description: "暂无数据" },
		Icon: { icon: "图标" },
		Text: {
			edit: "编辑",
			copy: "复制",
			copied: "复制成功",
			expand: "展开",
			collapse: "收起"
		},
		Form: {
			optional: "（可选）",
			defaultValidateMessages: {
				default: "字段验证错误${label}",
				required: "请输入${label}",
				enum: "${label}必须是其中一个[${enum}]",
				whitespace: "${label}不能为空字符",
				date: {
					format: "${label}日期格式无效",
					parse: "${label}不能转换为日期",
					invalid: "${label}是一个无效日期"
				},
				types: {
					string: typeTemplate$1,
					method: typeTemplate$1,
					array: typeTemplate$1,
					object: typeTemplate$1,
					number: typeTemplate$1,
					date: typeTemplate$1,
					boolean: typeTemplate$1,
					integer: typeTemplate$1,
					float: typeTemplate$1,
					regexp: typeTemplate$1,
					email: typeTemplate$1,
					url: typeTemplate$1,
					hex: typeTemplate$1
				},
				string: {
					len: "${label}须为${len}个字符",
					min: "${label}最少${min}个字符",
					max: "${label}最多${max}个字符",
					range: "${label}须在${min}-${max}字符之间"
				},
				number: {
					len: "${label}必须等于${len}",
					min: "${label}最小值为${min}",
					max: "${label}最大值为${max}",
					range: "${label}须在${min}-${max}之间"
				},
				array: {
					len: "须为${len}个${label}",
					min: "最少${min}个${label}",
					max: "最多${max}个${label}",
					range: "${label}数量须在${min}-${max}之间"
				},
				pattern: { mismatch: "${label}与模式不匹配${pattern}" }
			}
		},
		Image: { preview: "预览" },
		QRCode: {
			expired: "二维码过期",
			refresh: "点击刷新",
			scanned: "已扫描"
		},
		ColorPicker: {
			presetEmpty: "暂无",
			transparent: "无色",
			singleColor: "单色",
			gradientColor: "渐变色"
		}
	};
	exports.default = localeValues$1;
}));
var require_zh_CN = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_zh_CN$1();
}));
var require_zh_TW$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var locale$3 = {
		items_per_page: "條/頁",
		jump_to: "跳至",
		jump_to_confirm: "確定",
		page: "頁",
		prev_page: "上一頁",
		next_page: "下一頁",
		prev_5: "向前 5 頁",
		next_5: "向後 5 頁",
		prev_3: "向前 3 頁",
		next_3: "向後 3 頁",
		page_size: "頁碼"
	};
	exports.default = locale$3;
}));
var require_zh_TW$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$3 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _objectSpread2 = _interopRequireDefault$3(require_objectSpread2());
	var _common = require_common();
	var locale$2 = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _common.commonLocale), {}, {
		locale: "zh_TW",
		today: "今天",
		now: "此刻",
		backToToday: "返回今天",
		ok: "確定",
		timeSelect: "選擇時間",
		dateSelect: "選擇日期",
		weekSelect: "選擇周",
		clear: "清除",
		week: "週",
		month: "月",
		year: "年",
		previousMonth: "上個月 (翻頁上鍵)",
		nextMonth: "下個月 (翻頁下鍵)",
		monthSelect: "選擇月份",
		yearSelect: "選擇年份",
		decadeSelect: "選擇年代",
		yearFormat: "YYYY年",
		dateFormat: "YYYY年M月D日",
		dateTimeFormat: "YYYY年M月D日 HH時mm分ss秒",
		previousYear: "上一年 (Control鍵加左方向鍵)",
		nextYear: "下一年 (Control鍵加右方向鍵)",
		previousDecade: "上一年代",
		nextDecade: "下一年代",
		previousCentury: "上一世紀",
		nextCentury: "下一世紀",
		cellDateFormat: "D",
		monthBeforeYear: false
	});
	exports.default = locale$2;
}));
var require_zh_TW$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const locale$1 = { placeholder: "請選擇時間" };
	exports.default = locale$1;
}));
var require_zh_TW$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$2 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _zh_TW$2 = _interopRequireDefault$2(require_zh_TW$5());
	var _zh_TW2$1 = _interopRequireDefault$2(require_zh_TW$4());
	const locale = {
		lang: Object.assign({
			placeholder: "請選擇日期",
			yearPlaceholder: "請選擇年份",
			quarterPlaceholder: "請選擇季度",
			monthPlaceholder: "請選擇月份",
			weekPlaceholder: "請選擇周",
			rangePlaceholder: ["開始日期", "結束日期"],
			rangeYearPlaceholder: ["開始年份", "結束年份"],
			rangeMonthPlaceholder: ["開始月份", "結束月份"],
			rangeQuarterPlaceholder: ["開始季度", "結束季度"],
			rangeWeekPlaceholder: ["開始周", "結束周"]
		}, _zh_TW$2.default),
		timePickerLocale: Object.assign({}, _zh_TW2$1.default)
	};
	locale.lang.ok = "確 定";
	exports.default = locale;
}));
var require_zh_TW$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault$1 = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _zh_TW$1 = _interopRequireDefault$1(require_zh_TW$3());
	exports.default = _zh_TW$1.default;
}));
var require_zh_TW$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault().default;
	Object.defineProperty(exports, "__esModule", { value: true });
	var _zh_TW = _interopRequireDefault(require_zh_TW$6());
	var _zh_TW2 = _interopRequireDefault(require_zh_TW$2());
	var _zh_TW3 = _interopRequireDefault(require_zh_TW$3());
	var _zh_TW4 = _interopRequireDefault(require_zh_TW$4());
	const typeTemplate = "${label}不是一個有效的${type}";
	const localeValues = {
		locale: "zh-tw",
		Pagination: _zh_TW.default,
		DatePicker: _zh_TW3.default,
		TimePicker: _zh_TW4.default,
		Calendar: _zh_TW2.default,
		global: {
			placeholder: "請選擇",
			close: "關閉"
		},
		Table: {
			filterTitle: "篩選器",
			filterConfirm: "確定",
			filterReset: "重置",
			filterEmptyText: "無篩選項",
			filterCheckAll: "全選",
			filterSearchPlaceholder: "在篩選項中搜尋",
			emptyText: "暫無數據",
			selectAll: "全部選取",
			selectInvert: "反向選取",
			selectNone: "清空所有",
			selectionAll: "全選所有",
			sortTitle: "排序",
			expand: "展開行",
			collapse: "關閉行",
			triggerDesc: "點擊降序",
			triggerAsc: "點擊升序",
			cancelSort: "取消排序"
		},
		Modal: {
			okText: "確定",
			cancelText: "取消",
			justOkText: "知道了"
		},
		Tour: {
			Next: "下一步",
			Previous: "上一步",
			Finish: "結束導覽"
		},
		Popconfirm: {
			okText: "確定",
			cancelText: "取消"
		},
		Transfer: {
			titles: ["", ""],
			searchPlaceholder: "搜尋資料",
			itemUnit: "項目",
			itemsUnit: "項目",
			remove: "删除",
			selectCurrent: "全選當頁",
			removeCurrent: "删除當頁",
			selectAll: "全選所有",
			removeAll: "删除全部",
			selectInvert: "反選當頁"
		},
		Upload: {
			uploading: "正在上傳...",
			removeFile: "刪除檔案",
			uploadError: "上傳失敗",
			previewFile: "檔案預覽",
			downloadFile: "下载文件"
		},
		Empty: { description: "無此資料" },
		Icon: { icon: "圖標" },
		Text: {
			edit: "編輯",
			copy: "複製",
			copied: "複製成功",
			expand: "展開",
			collapse: "收起"
		},
		Form: {
			optional: "（可選）",
			defaultValidateMessages: {
				default: "字段驗證錯誤${label}",
				required: "請輸入${label}",
				enum: "${label}必須是其中一個[${enum}]",
				whitespace: "${label}不能為空字符",
				date: {
					format: "${label}日期格式無效",
					parse: "${label}不能轉換為日期",
					invalid: "${label}是一個無效日期"
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
					len: "${label}須為${len}個字符",
					min: "${label}最少${min}個字符",
					max: "${label}最多${max}個字符",
					range: "${label}須在${min}-${max}字符之間"
				},
				number: {
					len: "${label}必須等於${len}",
					min: "${label}最小值為${min}",
					max: "${label}最大值為${max}",
					range: "${label}須在${min}-${max}之間"
				},
				array: {
					len: "須為${len}個${label}",
					min: "最少${min}個${label}",
					max: "最多${max}個${label}",
					range: "${label}數量須在${min}-${max}之間"
				},
				pattern: { mismatch: "${label}與模式不匹配${pattern}" }
			}
		},
		Image: { preview: "預覽" },
		QRCode: {
			expired: "二維碼過期",
			refresh: "點擊刷新",
			scanned: "已掃描"
		},
		ColorPicker: {
			presetEmpty: "暫無",
			transparent: "透明",
			singleColor: "單色",
			gradientColor: "漸變色"
		}
	};
	exports.default = localeValues;
}));
var require_zh_TW = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_zh_TW$1();
}));
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var import_de_DE = /* @__PURE__ */ __toESM(require_de_DE());
var import_el_GR = /* @__PURE__ */ __toESM(require_el_GR());
var import_en_US = /* @__PURE__ */ __toESM(require_en_US());
var import_es_ES = /* @__PURE__ */ __toESM(require_es_ES());
var import_fr_FR = /* @__PURE__ */ __toESM(require_fr_FR());
var import_ja_JP = /* @__PURE__ */ __toESM(require_ja_JP());
var import_pt_PT = /* @__PURE__ */ __toESM(require_pt_PT());
var import_ru_RU = /* @__PURE__ */ __toESM(require_ru_RU());
var import_zh_CN = /* @__PURE__ */ __toESM(require_zh_CN());
var import_zh_TW = /* @__PURE__ */ __toESM(require_zh_TW());
const AntdProvider = ({ children }) => {
	const { language, userTheme: { colorPrimary } } = useSettings();
	const { theme: _theme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(config_provider_default, {
		locale: getAntdLocale(language),
		theme: {
			cssVar: true,
			hashed: false,
			algorithm: [_theme === "dark" ? theme_default.darkAlgorithm : theme_default.defaultAlgorithm],
			components: {
				Menu: {
					activeBarBorderWidth: 0,
					darkItemBg: "transparent"
				},
				Button: {
					boxShadow: "none",
					boxShadowSecondary: "none",
					defaultShadow: "none",
					dangerShadow: "none",
					primaryShadow: "none",
					controlHeight: 30,
					paddingInline: 10
				},
				Input: {
					controlHeight: 30,
					colorBorder: "var(--color-border)"
				},
				InputNumber: {
					controlHeight: 30,
					colorBorder: "var(--color-border)"
				},
				Select: {
					controlHeight: 30,
					colorBorder: "var(--color-border)"
				},
				Collapse: { headerBg: "transparent" },
				Tooltip: { fontSize: 13 },
				ColorPicker: { fontFamily: "var(--code-font-family)" },
				Segmented: {
					itemActiveBg: "var(--color-background-soft)",
					itemHoverBg: "var(--color-background-soft)",
					trackBg: "rgba(153,153,153,0.15)"
				},
				Switch: {
					colorTextQuaternary: "rgba(153,153,153,0.20)",
					trackMinWidth: 40,
					handleSize: 19,
					trackMinWidthSM: 28,
					trackHeightSM: 17,
					handleSizeSM: 14,
					trackPadding: 1.5
				},
				Dropdown: {
					controlPaddingHorizontal: 8,
					borderRadiusLG: 10,
					borderRadiusSM: 8,
					paddingXS: 4
				},
				Popover: { borderRadiusLG: 10 },
				Slider: {
					handleLineWidth: 1.5,
					handleSize: 15,
					handleSizeHover: 15,
					dotSize: 7,
					railSize: 5,
					colorBgElevated: "#ffffff"
				},
				Modal: { colorBgElevated: "var(--modal-background)" },
				Divider: { colorSplit: "rgba(128,128,128,0.15)" },
				Splitter: {
					splitBarDraggableSize: 0,
					splitBarSize: .5,
					splitTriggerSize: 10
				}
			},
			token: {
				colorPrimary,
				fontFamily: "var(--font-family)",
				colorBgMask: _theme === "dark" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.8)",
				motionDurationMid: "100ms"
			}
		},
		children
	});
};
function getAntdLocale(language) {
	switch (language) {
		case "zh-CN": return import_zh_CN.default;
		case "zh-TW": return import_zh_TW.default;
		case "en-US": return import_en_US.default;
		case "de-DE": return import_de_DE.default;
		case "ru-RU": return import_ru_RU.default;
		case "ja-JP": return import_ja_JP.default;
		case "el-GR": return import_el_GR.default;
		case "es-ES": return import_es_ES.default;
		case "fr-FR": return import_fr_FR.default;
		case "pt-PT": return import_pt_PT.default;
		default: return import_zh_CN.default;
	}
}
var AntdProvider_default = AntdProvider;
var import_react = /* @__PURE__ */ __toESM(require_react());
const LanguageSelect = (props) => {
	const { translateLanguages } = useTranslate();
	const { extraOptionsAfter, extraOptionsBefore, languageRenderer,...restProps } = props;
	const defaultLanguageRenderer = (0, import_react.useCallback)((lang) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(space_default.Compact, {
			direction: "horizontal",
			block: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				role: "img",
				"aria-label": lang.emoji,
				style: { marginRight: 8 },
				children: lang.emoji
			}), lang.label()]
		});
	}, []);
	const labelRender = (props$1) => {
		const { label } = props$1;
		if (label) return label;
		else if (languageRenderer) return languageRenderer(UNKNOWN);
		else return defaultLanguageRenderer(UNKNOWN);
	};
	const displayedOptions = (0, import_react.useMemo)(() => {
		const before = extraOptionsBefore ?? [];
		const after = extraOptionsAfter ?? [];
		const options = translateLanguages.map((lang) => ({
			value: lang.langCode,
			label: languageRenderer ? languageRenderer(lang) : defaultLanguageRenderer(lang)
		}));
		return [
			...before,
			...options,
			...after
		];
	}, [
		defaultLanguageRenderer,
		extraOptionsAfter,
		extraOptionsBefore,
		languageRenderer,
		translateLanguages
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(select_default, {
		...restProps,
		labelRender,
		options: displayedOptions,
		style: {
			minWidth: 150,
			...props.style
		}
	});
};
var LanguageSelect_default = LanguageSelect;
export { LanguageSelect_default as b, AntdProvider_default as c, require_lib as d };
