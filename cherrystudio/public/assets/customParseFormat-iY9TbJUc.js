import { b as __commonJSMin } from "./chunk-st2fFX3F.js";
var require_advancedFormat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_advancedFormat = t();
	})(exports, (function() {
		return function(e, t) {
			var r = t.prototype, n = r.format;
			r.format = function(e$1) {
				var t$1 = this, r$1 = this.$locale();
				if (!this.isValid()) return n.bind(this)(e$1);
				var s = this.$utils(), a = (e$1 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, (function(e$2) {
					switch (e$2) {
						case "Q": return Math.ceil((t$1.$M + 1) / 3);
						case "Do": return r$1.ordinal(t$1.$D);
						case "gggg": return t$1.weekYear();
						case "GGGG": return t$1.isoWeekYear();
						case "wo": return r$1.ordinal(t$1.week(), "W");
						case "w":
						case "ww": return s.s(t$1.week(), "w" === e$2 ? 1 : 2, "0");
						case "W":
						case "WW": return s.s(t$1.isoWeek(), "W" === e$2 ? 1 : 2, "0");
						case "k":
						case "kk": return s.s(String(0 === t$1.$H ? 24 : t$1.$H), "k" === e$2 ? 1 : 2, "0");
						case "X": return Math.floor(t$1.$d.getTime() / 1e3);
						case "x": return t$1.$d.getTime();
						case "z": return "[" + t$1.offsetName() + "]";
						case "zzz": return "[" + t$1.offsetName("long") + "]";
						default: return e$2;
					}
				}));
				return n.bind(this)(a);
			};
		};
	}));
}));
var require_customParseFormat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_customParseFormat = t();
	})(exports, (function() {
		var e = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		}, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, o = /\d*[^-_:/,()\s\d]+/, s = {}, a = function(e$1) {
			return (e$1 = +e$1) + (e$1 > 68 ? 1900 : 2e3);
		};
		var f = function(e$1) {
			return function(t$1) {
				this[e$1] = +t$1;
			};
		}, h = [/[+-]\d\d:?(\d\d)?|Z/, function(e$1) {
			(this.zone || (this.zone = {})).offset = function(e$2) {
				if (!e$2) return 0;
				if ("Z" === e$2) return 0;
				var t$1 = e$2.match(/([+-]|\d\d)/g), n$1 = 60 * t$1[1] + (+t$1[2] || 0);
				return 0 === n$1 ? 0 : "+" === t$1[0] ? -n$1 : n$1;
			}(e$1);
		}], u = function(e$1) {
			var t$1 = s[e$1];
			return t$1 && (t$1.indexOf ? t$1 : t$1.s.concat(t$1.f));
		}, d = function(e$1, t$1) {
			var n$1, r$1 = s.meridiem;
			if (r$1) {
				for (var i$1 = 1; i$1 <= 24; i$1 += 1) if (e$1.indexOf(r$1(i$1, 0, t$1)) > -1) {
					n$1 = i$1 > 12;
					break;
				}
			} else n$1 = e$1 === (t$1 ? "pm" : "PM");
			return n$1;
		}, c = {
			A: [o, function(e$1) {
				this.afternoon = d(e$1, !1);
			}],
			a: [o, function(e$1) {
				this.afternoon = d(e$1, !0);
			}],
			Q: [n, function(e$1) {
				this.month = 3 * (e$1 - 1) + 1;
			}],
			S: [n, function(e$1) {
				this.milliseconds = 100 * +e$1;
			}],
			SS: [r, function(e$1) {
				this.milliseconds = 10 * +e$1;
			}],
			SSS: [/\d{3}/, function(e$1) {
				this.milliseconds = +e$1;
			}],
			s: [i, f("seconds")],
			ss: [i, f("seconds")],
			m: [i, f("minutes")],
			mm: [i, f("minutes")],
			H: [i, f("hours")],
			h: [i, f("hours")],
			HH: [i, f("hours")],
			hh: [i, f("hours")],
			D: [i, f("day")],
			DD: [r, f("day")],
			Do: [o, function(e$1) {
				var t$1 = s.ordinal, n$1 = e$1.match(/\d+/);
				if (this.day = n$1[0], t$1) for (var r$1 = 1; r$1 <= 31; r$1 += 1) t$1(r$1).replace(/\[|\]/g, "") === e$1 && (this.day = r$1);
			}],
			w: [i, f("week")],
			ww: [r, f("week")],
			M: [i, f("month")],
			MM: [r, f("month")],
			MMM: [o, function(e$1) {
				var t$1 = u("months"), n$1 = (u("monthsShort") || t$1.map((function(e$2) {
					return e$2.slice(0, 3);
				}))).indexOf(e$1) + 1;
				if (n$1 < 1) throw new Error();
				this.month = n$1 % 12 || n$1;
			}],
			MMMM: [o, function(e$1) {
				var t$1 = u("months").indexOf(e$1) + 1;
				if (t$1 < 1) throw new Error();
				this.month = t$1 % 12 || t$1;
			}],
			Y: [/[+-]?\d+/, f("year")],
			YY: [r, function(e$1) {
				this.year = a(e$1);
			}],
			YYYY: [/\d{4}/, f("year")],
			Z: h,
			ZZ: h
		};
		function l(n$1) {
			var r$1, i$1;
			r$1 = n$1, i$1 = s && s.formats;
			for (var o$1 = (n$1 = r$1.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t$1, n$2, r$2) {
				var o$2 = r$2 && r$2.toUpperCase();
				return n$2 || i$1[r$2] || e[r$2] || i$1[o$2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e$1, t$2, n$3) {
					return t$2 || n$3.slice(1);
				}));
			}))).match(t), a$1 = o$1.length, f$1 = 0; f$1 < a$1; f$1 += 1) {
				var h$1 = o$1[f$1], u$1 = c[h$1], d$1 = u$1 && u$1[0], l$1 = u$1 && u$1[1];
				o$1[f$1] = l$1 ? {
					regex: d$1,
					parser: l$1
				} : h$1.replace(/^\[|\]$/g, "");
			}
			return function(e$1) {
				for (var t$1 = {}, n$2 = 0, r$2 = 0; n$2 < a$1; n$2 += 1) {
					var i$2 = o$1[n$2];
					if ("string" == typeof i$2) r$2 += i$2.length;
					else {
						var s$1 = i$2.regex, f$2 = i$2.parser, h$2 = e$1.slice(r$2), u$2 = s$1.exec(h$2)[0];
						f$2.call(t$1, u$2), e$1 = e$1.replace(u$2, "");
					}
				}
				return function(e$2) {
					var t$2 = e$2.afternoon;
					if (void 0 !== t$2) {
						var n$3 = e$2.hours;
						t$2 ? n$3 < 12 && (e$2.hours += 12) : 12 === n$3 && (e$2.hours = 0), delete e$2.afternoon;
					}
				}(t$1), t$1;
			};
		}
		return function(e$1, t$1, n$1) {
			n$1.p.customParseFormat = !0, e$1 && e$1.parseTwoDigitYear && (a = e$1.parseTwoDigitYear);
			var r$1 = t$1.prototype, i$1 = r$1.parse;
			r$1.parse = function(e$2) {
				var t$2 = e$2.date, r$2 = e$2.utc, o$1 = e$2.args;
				this.$u = r$2;
				var a$1 = o$1[1];
				if ("string" == typeof a$1) {
					var f$1 = !0 === o$1[2], h$1 = !0 === o$1[3], u$1 = f$1 || h$1, d$1 = o$1[2];
					h$1 && (d$1 = o$1[2]), s = this.$locale(), !f$1 && d$1 && (s = n$1.Ls[d$1]), this.$d = function(e$3, t$3, n$2, r$3) {
						try {
							if (["x", "X"].indexOf(t$3) > -1) return /* @__PURE__ */ new Date(("X" === t$3 ? 1e3 : 1) * e$3);
							var i$2 = l(t$3)(e$3), o$2 = i$2.year, s$1 = i$2.month, a$2 = i$2.day, f$2 = i$2.hours, h$2 = i$2.minutes, u$2 = i$2.seconds, d$2 = i$2.milliseconds, c$2 = i$2.zone, m$1 = i$2.week, M$1 = /* @__PURE__ */ new Date(), Y = a$2 || (o$2 || s$1 ? 1 : M$1.getDate()), p = o$2 || M$1.getFullYear(), v = 0;
							o$2 && !s$1 || (v = s$1 > 0 ? s$1 - 1 : M$1.getMonth());
							var D, w = f$2 || 0, g = h$2 || 0, y = u$2 || 0, L = d$2 || 0;
							return c$2 ? new Date(Date.UTC(p, v, Y, w, g, y, L + 60 * c$2.offset * 1e3)) : n$2 ? new Date(Date.UTC(p, v, Y, w, g, y, L)) : (D = new Date(p, v, Y, w, g, y, L), m$1 && (D = r$3(D).week(m$1).toDate()), D);
						} catch (e$4) {
							return /* @__PURE__ */ new Date("");
						}
					}(t$2, a$1, r$2, n$1), this.init(), d$1 && !0 !== d$1 && (this.$L = this.locale(d$1).$L), u$1 && t$2 != this.format(a$1) && (this.$d = /* @__PURE__ */ new Date("")), s = {};
				} else if (a$1 instanceof Array) for (var c$1 = a$1.length, m = 1; m <= c$1; m += 1) {
					o$1[1] = a$1[m - 1];
					var M = n$1.apply(this, o$1);
					if (M.isValid()) {
						this.$d = M.$d, this.$L = M.$L, this.init();
						break;
					}
					m === c$1 && (this.$d = /* @__PURE__ */ new Date(""));
				}
				else i$1.call(this, e$2);
			};
		};
	}));
}));
export { require_customParseFormat as b, require_advancedFormat as c };
