import { s as __toESM, t as __commonJSMin } from "./chunk-DiqNceaa.js";
import { t as loggerService } from "./LoggerService-oVV4iwe6.js";
import { t as preferenceService } from "./PreferenceService-uLlqCRc6.js";
import { t as require_dayjs_min } from "./dayjs.min-CNu3tPBh.js";
import { t as instance } from "./i18next-DBAWv9hQ.js";
import { r as initReactI18next } from "./useTranslation-DnuRkr5k.js";
import { t as __vitePreload } from "./preload-helper-BAxOQgJR.js";
var require_de = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, n) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = n(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_de = n(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function n(e$1) {
			return e$1 && "object" == typeof e$1 && "default" in e$1 ? e$1 : { default: e$1 };
		}
		var t = n(e), a = {
			s: "ein paar Sekunden",
			m: ["eine Minute", "einer Minute"],
			mm: "%d Minuten",
			h: ["eine Stunde", "einer Stunde"],
			hh: "%d Stunden",
			d: ["ein Tag", "einem Tag"],
			dd: ["%d Tage", "%d Tagen"],
			M: ["ein Monat", "einem Monat"],
			MM: ["%d Monate", "%d Monaten"],
			y: ["ein Jahr", "einem Jahr"],
			yy: ["%d Jahre", "%d Jahren"]
		};
		function i(e$1, n$1, t$1) {
			var i$1 = a[t$1];
			return Array.isArray(i$1) && (i$1 = i$1[n$1 ? 0 : 1]), i$1.replace("%d", e$1);
		}
		var r = {
			name: "de",
			weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
			weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
			weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
			months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
			monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.".split("_"),
			ordinal: function(e$1) {
				return e$1 + ".";
			},
			weekStart: 1,
			yearStart: 4,
			formats: {
				LTS: "HH:mm:ss",
				LT: "HH:mm",
				L: "DD.MM.YYYY",
				LL: "D. MMMM YYYY",
				LLL: "D. MMMM YYYY HH:mm",
				LLLL: "dddd, D. MMMM YYYY HH:mm"
			},
			relativeTime: {
				future: "in %s",
				past: "vor %s",
				s: i,
				m: i,
				mm: i,
				h: i,
				hh: i,
				d: i,
				dd: i,
				M: i,
				MM: i,
				y: i,
				yy: i
			}
		};
		return t.default.locale(r, null, !0), r;
	}));
}));
var require_el = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, _) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = _(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], _) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_el = _(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function _(e$1) {
			return e$1 && "object" == typeof e$1 && "default" in e$1 ? e$1 : { default: e$1 };
		}
		var t = _(e), d = {
			name: "el",
			weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
			weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
			weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
			months: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
			monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαι_Ιουν_Ιουλ_Αυγ_Σεπτ_Οκτ_Νοε_Δεκ".split("_"),
			ordinal: function(e$1) {
				return e$1;
			},
			weekStart: 1,
			relativeTime: {
				future: "σε %s",
				past: "πριν %s",
				s: "μερικά δευτερόλεπτα",
				m: "ένα λεπτό",
				mm: "%d λεπτά",
				h: "μία ώρα",
				hh: "%d ώρες",
				d: "μία μέρα",
				dd: "%d μέρες",
				M: "ένα μήνα",
				MM: "%d μήνες",
				y: "ένα χρόνο",
				yy: "%d χρόνια"
			},
			formats: {
				LT: "h:mm A",
				LTS: "h:mm:ss A",
				L: "DD/MM/YYYY",
				LL: "D MMMM YYYY",
				LLL: "D MMMM YYYY h:mm A",
				LLLL: "dddd, D MMMM YYYY h:mm A"
			}
		};
		return t.default.locale(d, null, !0), d;
	}));
}));
var require_es = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, o) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = o(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], o) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_es = o(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function o(e$1) {
			return e$1 && "object" == typeof e$1 && "default" in e$1 ? e$1 : { default: e$1 };
		}
		var s = o(e), d = {
			name: "es",
			monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
			weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
			weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
			weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
			months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
			weekStart: 1,
			formats: {
				LT: "H:mm",
				LTS: "H:mm:ss",
				L: "DD/MM/YYYY",
				LL: "D [de] MMMM [de] YYYY",
				LLL: "D [de] MMMM [de] YYYY H:mm",
				LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
			},
			relativeTime: {
				future: "en %s",
				past: "hace %s",
				s: "unos segundos",
				m: "un minuto",
				mm: "%d minutos",
				h: "una hora",
				hh: "%d horas",
				d: "un día",
				dd: "%d días",
				M: "un mes",
				MM: "%d meses",
				y: "un año",
				yy: "%d años"
			},
			ordinal: function(e$1) {
				return e$1 + "º";
			}
		};
		return s.default.locale(d, null, !0), d;
	}));
}));
var require_fr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, n) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = n(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_fr = n(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function n(e$1) {
			return e$1 && "object" == typeof e$1 && "default" in e$1 ? e$1 : { default: e$1 };
		}
		var t = n(e), i = {
			name: "fr",
			weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
			weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
			weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
			months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
			monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
			weekStart: 1,
			yearStart: 4,
			formats: {
				LT: "HH:mm",
				LTS: "HH:mm:ss",
				L: "DD/MM/YYYY",
				LL: "D MMMM YYYY",
				LLL: "D MMMM YYYY HH:mm",
				LLLL: "dddd D MMMM YYYY HH:mm"
			},
			relativeTime: {
				future: "dans %s",
				past: "il y a %s",
				s: "quelques secondes",
				m: "une minute",
				mm: "%d minutes",
				h: "une heure",
				hh: "%d heures",
				d: "un jour",
				dd: "%d jours",
				M: "un mois",
				MM: "%d mois",
				y: "un an",
				yy: "%d ans"
			},
			ordinal: function(e$1) {
				return "" + e$1 + (1 === e$1 ? "er" : "");
			}
		};
		return t.default.locale(i, null, !0), i;
	}));
}));
var require_ja = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, _) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = _(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], _) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_ja = _(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function _(e$1) {
			return e$1 && "object" == typeof e$1 && "default" in e$1 ? e$1 : { default: e$1 };
		}
		var t = _(e), d = {
			name: "ja",
			weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
			weekdaysShort: "日_月_火_水_木_金_土".split("_"),
			weekdaysMin: "日_月_火_水_木_金_土".split("_"),
			months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
			monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
			ordinal: function(e$1) {
				return e$1 + "日";
			},
			formats: {
				LT: "HH:mm",
				LTS: "HH:mm:ss",
				L: "YYYY/MM/DD",
				LL: "YYYY年M月D日",
				LLL: "YYYY年M月D日 HH:mm",
				LLLL: "YYYY年M月D日 dddd HH:mm",
				l: "YYYY/MM/DD",
				ll: "YYYY年M月D日",
				lll: "YYYY年M月D日 HH:mm",
				llll: "YYYY年M月D日(ddd) HH:mm"
			},
			meridiem: function(e$1) {
				return e$1 < 12 ? "午前" : "午後";
			},
			relativeTime: {
				future: "%s後",
				past: "%s前",
				s: "数秒",
				m: "1分",
				mm: "%d分",
				h: "1時間",
				hh: "%d時間",
				d: "1日",
				dd: "%d日",
				M: "1ヶ月",
				MM: "%dヶ月",
				y: "1年",
				yy: "%d年"
			}
		};
		return t.default.locale(d, null, !0), d;
	}));
}));
var require_pt = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, a) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = a(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], a) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_pt = a(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function a(e$1) {
			return e$1 && "object" == typeof e$1 && "default" in e$1 ? e$1 : { default: e$1 };
		}
		var o = a(e), t = {
			name: "pt",
			weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
			weekdaysShort: "dom_seg_ter_qua_qui_sex_sab".split("_"),
			weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sa".split("_"),
			months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
			monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
			ordinal: function(e$1) {
				return e$1 + "º";
			},
			weekStart: 1,
			yearStart: 4,
			formats: {
				LT: "HH:mm",
				LTS: "HH:mm:ss",
				L: "DD/MM/YYYY",
				LL: "D [de] MMMM [de] YYYY",
				LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
				LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
			},
			relativeTime: {
				future: "em %s",
				past: "há %s",
				s: "alguns segundos",
				m: "um minuto",
				mm: "%d minutos",
				h: "uma hora",
				hh: "%d horas",
				d: "um dia",
				dd: "%d dias",
				M: "um mês",
				MM: "%d meses",
				y: "um ano",
				yy: "%d anos"
			}
		};
		return o.default.locale(t, null, !0), t;
	}));
}));
var require_ro = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, i) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = i(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_ro = i(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function i(e$1) {
			return e$1 && "object" == typeof e$1 && "default" in e$1 ? e$1 : { default: e$1 };
		}
		var t = i(e), _ = {
			name: "ro",
			weekdays: "Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă".split("_"),
			weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
			weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
			months: "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),
			monthsShort: "Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.".split("_"),
			weekStart: 1,
			formats: {
				LT: "H:mm",
				LTS: "H:mm:ss",
				L: "DD.MM.YYYY",
				LL: "D MMMM YYYY",
				LLL: "D MMMM YYYY H:mm",
				LLLL: "dddd, D MMMM YYYY H:mm"
			},
			relativeTime: {
				future: "peste %s",
				past: "acum %s",
				s: "câteva secunde",
				m: "un minut",
				mm: "%d minute",
				h: "o oră",
				hh: "%d ore",
				d: "o zi",
				dd: "%d zile",
				M: "o lună",
				MM: "%d luni",
				y: "un an",
				yy: "%d ani"
			},
			ordinal: function(e$1) {
				return e$1;
			}
		};
		return t.default.locale(_, null, !0), _;
	}));
}));
var require_ru = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(_, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], t) : (_ = "undefined" != typeof globalThis ? globalThis : _ || self).dayjs_locale_ru = t(_.dayjs);
	})(exports, (function(_) {
		"use strict";
		function t(_$1) {
			return _$1 && "object" == typeof _$1 && "default" in _$1 ? _$1 : { default: _$1 };
		}
		var e = t(_), n = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"), s = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"), r = "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"), o = "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"), i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
		function d(_$1, t$1, e$1) {
			var n$1, s$1;
			return "m" === e$1 ? t$1 ? "минута" : "минуту" : _$1 + " " + (n$1 = +_$1, s$1 = {
				mm: t$1 ? "минута_минуты_минут" : "минуту_минуты_минут",
				hh: "час_часа_часов",
				dd: "день_дня_дней",
				MM: "месяц_месяца_месяцев",
				yy: "год_года_лет"
			}[e$1].split("_"), n$1 % 10 == 1 && n$1 % 100 != 11 ? s$1[0] : n$1 % 10 >= 2 && n$1 % 10 <= 4 && (n$1 % 100 < 10 || n$1 % 100 >= 20) ? s$1[1] : s$1[2]);
		}
		var u = function(_$1, t$1) {
			return i.test(t$1) ? n[_$1.month()] : s[_$1.month()];
		};
		u.s = s, u.f = n;
		var a = function(_$1, t$1) {
			return i.test(t$1) ? r[_$1.month()] : o[_$1.month()];
		};
		a.s = o, a.f = r;
		var m = {
			name: "ru",
			weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
			weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
			weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
			months: u,
			monthsShort: a,
			weekStart: 1,
			yearStart: 4,
			formats: {
				LT: "H:mm",
				LTS: "H:mm:ss",
				L: "DD.MM.YYYY",
				LL: "D MMMM YYYY г.",
				LLL: "D MMMM YYYY г., H:mm",
				LLLL: "dddd, D MMMM YYYY г., H:mm"
			},
			relativeTime: {
				future: "через %s",
				past: "%s назад",
				s: "несколько секунд",
				m: d,
				mm: d,
				h: "час",
				hh: d,
				d: "день",
				dd: d,
				M: "месяц",
				MM: d,
				y: "год",
				yy: d
			},
			ordinal: function(_$1) {
				return _$1;
			},
			meridiem: function(_$1) {
				return _$1 < 4 ? "ночи" : _$1 < 12 ? "утра" : _$1 < 17 ? "дня" : "вечера";
			}
		};
		return e.default.locale(m, null, !0), m;
	}));
}));
var require_vi = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(t, n) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = n(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], n) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_locale_vi = n(t.dayjs);
	})(exports, (function(t) {
		"use strict";
		function n(t$1) {
			return t$1 && "object" == typeof t$1 && "default" in t$1 ? t$1 : { default: t$1 };
		}
		var h = n(t), _ = {
			name: "vi",
			weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
			months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
			weekStart: 1,
			weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
			monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
			weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
			ordinal: function(t$1) {
				return t$1;
			},
			formats: {
				LT: "HH:mm",
				LTS: "HH:mm:ss",
				L: "DD/MM/YYYY",
				LL: "D MMMM [năm] YYYY",
				LLL: "D MMMM [năm] YYYY HH:mm",
				LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
				l: "DD/M/YYYY",
				ll: "D MMM YYYY",
				lll: "D MMM YYYY HH:mm",
				llll: "ddd, D MMM YYYY HH:mm"
			},
			relativeTime: {
				future: "%s tới",
				past: "%s trước",
				s: "vài giây",
				m: "một phút",
				mm: "%d phút",
				h: "một giờ",
				hh: "%d giờ",
				d: "một ngày",
				dd: "%d ngày",
				M: "một tháng",
				MM: "%d tháng",
				y: "một năm",
				yy: "%d năm"
			}
		};
		return h.default.locale(_, null, !0), _;
	}));
}));
var require_zh_cn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, _) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = _(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], _) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_zh_cn = _(e.dayjs);
	})(exports, (function(e) {
		"use strict";
		function _(e$1) {
			return e$1 && "object" == typeof e$1 && "default" in e$1 ? e$1 : { default: e$1 };
		}
		var t = _(e), d = {
			name: "zh-cn",
			weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
			weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
			weekdaysMin: "日_一_二_三_四_五_六".split("_"),
			months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
			monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
			ordinal: function(e$1, _$1) {
				return "W" === _$1 ? e$1 + "周" : e$1 + "日";
			},
			weekStart: 1,
			yearStart: 4,
			formats: {
				LT: "HH:mm",
				LTS: "HH:mm:ss",
				L: "YYYY/MM/DD",
				LL: "YYYY年M月D日",
				LLL: "YYYY年M月D日Ah点mm分",
				LLLL: "YYYY年M月D日ddddAh点mm分",
				l: "YYYY/M/D",
				ll: "YYYY年M月D日",
				lll: "YYYY年M月D日 HH:mm",
				llll: "YYYY年M月D日dddd HH:mm"
			},
			relativeTime: {
				future: "%s内",
				past: "%s前",
				s: "几秒",
				m: "1 分钟",
				mm: "%d 分钟",
				h: "1 小时",
				hh: "%d 小时",
				d: "1 天",
				dd: "%d 天",
				M: "1 个月",
				MM: "%d 个月",
				y: "1 年",
				yy: "%d 年"
			},
			meridiem: function(e$1, _$1) {
				var t$1 = 100 * e$1 + _$1;
				return t$1 < 600 ? "凌晨" : t$1 < 900 ? "早上" : t$1 < 1100 ? "上午" : t$1 < 1300 ? "中午" : t$1 < 1800 ? "下午" : "晚上";
			}
		};
		return t.default.locale(d, null, !0), d;
	}));
}));
var require_zh_tw = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(_, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], e) : (_ = "undefined" != typeof globalThis ? globalThis : _ || self).dayjs_locale_zh_tw = e(_.dayjs);
	})(exports, (function(_) {
		"use strict";
		function e(_$1) {
			return _$1 && "object" == typeof _$1 && "default" in _$1 ? _$1 : { default: _$1 };
		}
		var t = e(_), d = {
			name: "zh-tw",
			weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
			weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
			weekdaysMin: "日_一_二_三_四_五_六".split("_"),
			months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
			monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
			ordinal: function(_$1, e$1) {
				return "W" === e$1 ? _$1 + "週" : _$1 + "日";
			},
			formats: {
				LT: "HH:mm",
				LTS: "HH:mm:ss",
				L: "YYYY/MM/DD",
				LL: "YYYY年M月D日",
				LLL: "YYYY年M月D日 HH:mm",
				LLLL: "YYYY年M月D日dddd HH:mm",
				l: "YYYY/M/D",
				ll: "YYYY年M月D日",
				lll: "YYYY年M月D日 HH:mm",
				llll: "YYYY年M月D日dddd HH:mm"
			},
			relativeTime: {
				future: "%s內",
				past: "%s前",
				s: "幾秒",
				m: "1 分鐘",
				mm: "%d 分鐘",
				h: "1 小時",
				hh: "%d 小時",
				d: "1 天",
				dd: "%d 天",
				M: "1 個月",
				MM: "%d 個月",
				y: "1 年",
				yy: "%d 年"
			},
			meridiem: function(_$1, e$1) {
				var t$1 = 100 * _$1 + e$1;
				return t$1 < 600 ? "凌晨" : t$1 < 900 ? "早上" : t$1 < 1100 ? "上午" : t$1 < 1300 ? "中午" : t$1 < 1800 ? "下午" : "晚上";
			}
		};
		return t.default.locale(d, null, !0), d;
	}));
}));
const languageNativeNameMap = {
	"zh-CN": "中文",
	"zh-TW": "中文（繁体）",
	"en-US": "English",
	"de-DE": "Deutsch",
	"ja-JP": "日本語",
	"ru-RU": "Русский",
	"el-GR": "Ελληνικά",
	"es-ES": "Español",
	"fr-FR": "Français",
	"pt-PT": "Português",
	"ro-RO": "Română",
	"vi-VN": "Tiếng Việt"
};
const defaultLanguage = "en-US";
var resourcesToBackend = function resourcesToBackend$1(res) {
	return {
		type: "backend",
		init: function init(services, backendOptions, i18nextOptions) {},
		read: function read(language, namespace, callback) {
			if (typeof res === "function") {
				if (res.length < 3) {
					try {
						var r = res(language, namespace);
						if (r && typeof r.then === "function") r.then(function(data) {
							return callback(null, data && data.default || data);
						}).catch(callback);
						else callback(null, r);
					} catch (err) {
						callback(err);
					}
					return;
				}
				res(language, namespace, callback);
				return;
			}
			callback(null, res && res[language] && res[language][namespace]);
		}
	};
};
require_de();
require_el();
require_es();
require_fr();
require_ja();
require_pt();
require_ro();
require_ru();
require_vi();
require_zh_cn();
require_zh_tw();
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min());
var logger = loggerService.withContext("I18N");
var localeLoaders = {
	"en-US": () => __vitePreload(() => import("./en-us-Bl2fjWNr.js"), [], import.meta.url),
	"zh-CN": () => __vitePreload(() => import("./zh-cn-BvA4-7ZV.js"), [], import.meta.url),
	"zh-TW": () => __vitePreload(() => import("./zh-tw-BlX6dtqZ.js"), [], import.meta.url),
	"de-DE": () => __vitePreload(() => import("./de-de-CWjOR8nk.js"), [], import.meta.url),
	"el-GR": () => __vitePreload(() => import("./el-gr-DGFhDhMQ.js"), [], import.meta.url),
	"es-ES": () => __vitePreload(() => import("./es-es-Cmh-7gmV.js"), [], import.meta.url),
	"fr-FR": () => __vitePreload(() => import("./fr-fr-DVvlfXcb.js"), [], import.meta.url),
	"ja-JP": () => __vitePreload(() => import("./ja-jp-BU-_Is_k.js"), [], import.meta.url),
	"pt-PT": () => __vitePreload(() => import("./pt-pt-rV8G2dRR.js"), [], import.meta.url),
	"ro-RO": () => __vitePreload(() => import("./ro-ro-DmHK7P0K.js"), [], import.meta.url),
	"ru-RU": () => __vitePreload(() => import("./ru-ru-BLifvGlV.js"), [], import.meta.url),
	"vi-VN": () => __vitePreload(() => import("./vi-vn-hBq9hitE.js"), [], import.meta.url)
};
const getLanguage = async () => {
	return await preferenceService.get("app.language") || navigator.language || "en-US";
};
const getLanguageCode = async () => {
	return (await getLanguage()).split("-")[0];
};
var dayjsLocaleMap = {
	"en-US": "en",
	"ja-JP": "ja",
	"ru-RU": "ru",
	"zh-CN": "zh-cn",
	"zh-TW": "zh-tw",
	"de-DE": "de",
	"el-GR": "el",
	"es-ES": "es",
	"fr-FR": "fr",
	"pt-PT": "pt",
	"ro-RO": "ro",
	"vi-VN": "vi"
};
const setDayjsLocale = (language) => {
	const dayjsLocale = dayjsLocaleMap[language] || "en";
	import_dayjs_min.default.locale(dayjsLocale);
};
var initPromise = null;
var doInit = async () => {
	const lng = await getLanguage().catch(() => defaultLanguage);
	await instance.use(resourcesToBackend((language) => {
		const loader = localeLoaders[language];
		return loader ? loader() : Promise.reject(/* @__PURE__ */ new Error(`No locale pack for "${language}"`));
	})).use(initReactI18next).init({
		lng,
		fallbackLng: defaultLanguage,
		load: "currentOnly",
		initImmediate: false,
		interpolation: { escapeValue: false },
		saveMissing: true,
		missingKeyHandler: (_1, _2, key) => {
			logger.error(`Missing key: ${key}`);
		}
	});
};
const initI18n = () => initPromise ??= doInit();
var resolver_default = instance;
export { defaultLanguage as a, setDayjsLocale as i, initI18n as n, languageNativeNameMap as o, resolver_default as r, getLanguageCode as t };
