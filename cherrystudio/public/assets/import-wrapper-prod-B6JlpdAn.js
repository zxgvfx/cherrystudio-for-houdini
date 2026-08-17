import { c as __toESM, t as __commonJSMin } from "./rolldown-runtime-BeJLVFtF.js";
var import_dexie_min = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Dexie = t();
	})(exports, function() {
		"use strict";
		var s = function(e$1, t$1) {
			return (s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e$2, t$2) {
				e$2.__proto__ = t$2;
			} || function(e$2, t$2) {
				for (var n$1 in t$2) Object.prototype.hasOwnProperty.call(t$2, n$1) && (e$2[n$1] = t$2[n$1]);
			})(e$1, t$1);
		};
		var _ = function() {
			return (_ = Object.assign || function(e$1) {
				for (var t$1, n$1 = 1, r$1 = arguments.length; n$1 < r$1; n$1++) for (var i$1 in t$1 = arguments[n$1]) Object.prototype.hasOwnProperty.call(t$1, i$1) && (e$1[i$1] = t$1[i$1]);
				return e$1;
			}).apply(this, arguments);
		};
		function i(e$1, t$1, n$1) {
			if (n$1 || 2 === arguments.length) for (var r$1, i$1 = 0, o$1 = t$1.length; i$1 < o$1; i$1++) !r$1 && i$1 in t$1 || ((r$1 = r$1 || Array.prototype.slice.call(t$1, 0, i$1))[i$1] = t$1[i$1]);
			return e$1.concat(r$1 || Array.prototype.slice.call(t$1));
		}
		var f = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global, O = Object.keys, x = Array.isArray;
		function a(t$1, n$1) {
			return "object" != typeof n$1 || O(n$1).forEach(function(e$1) {
				t$1[e$1] = n$1[e$1];
			}), t$1;
		}
		"undefined" == typeof Promise || f.Promise || (f.Promise = Promise);
		var c = Object.getPrototypeOf, n = {}.hasOwnProperty;
		function m(e$1, t$1) {
			return n.call(e$1, t$1);
		}
		function r(t$1, n$1) {
			"function" == typeof n$1 && (n$1 = n$1(c(t$1))), ("undefined" == typeof Reflect ? O : Reflect.ownKeys)(n$1).forEach(function(e$1) {
				l(t$1, e$1, n$1[e$1]);
			});
		}
		var u = Object.defineProperty;
		function l(e$1, t$1, n$1, r$1) {
			u(e$1, t$1, a(n$1 && m(n$1, "get") && "function" == typeof n$1.get ? {
				get: n$1.get,
				set: n$1.set,
				configurable: !0
			} : {
				value: n$1,
				configurable: !0,
				writable: !0
			}, r$1));
		}
		function o(t$1) {
			return { from: function(e$1) {
				return t$1.prototype = Object.create(e$1.prototype), l(t$1.prototype, "constructor", t$1), { extend: r.bind(null, t$1.prototype) };
			} };
		}
		var h = Object.getOwnPropertyDescriptor;
		var d = [].slice;
		function b(e$1, t$1, n$1) {
			return d.call(e$1, t$1, n$1);
		}
		function p(e$1, t$1) {
			return t$1(e$1);
		}
		function y(e$1) {
			if (!e$1) throw new Error("Assertion Failed");
		}
		function v(e$1) {
			f.setImmediate ? setImmediate(e$1) : setTimeout(e$1, 0);
		}
		function g(e$1, t$1) {
			if ("string" == typeof t$1 && m(e$1, t$1)) return e$1[t$1];
			if (!t$1) return e$1;
			if ("string" != typeof t$1) {
				for (var n$1 = [], r$1 = 0, i$1 = t$1.length; r$1 < i$1; ++r$1) {
					var o$1 = g(e$1, t$1[r$1]);
					n$1.push(o$1);
				}
				return n$1;
			}
			var a$1 = t$1.indexOf(".");
			if (-1 !== a$1) {
				var u$1 = e$1[t$1.substr(0, a$1)];
				return null == u$1 ? void 0 : g(u$1, t$1.substr(a$1 + 1));
			}
		}
		function w(e$1, t$1, n$1) {
			if (e$1 && void 0 !== t$1 && !("isFrozen" in Object && Object.isFrozen(e$1))) if ("string" != typeof t$1 && "length" in t$1) {
				y("string" != typeof n$1 && "length" in n$1);
				for (var r$1 = 0, i$1 = t$1.length; r$1 < i$1; ++r$1) w(e$1, t$1[r$1], n$1[r$1]);
			} else {
				var o$1, a$1, u$1 = t$1.indexOf(".");
				-1 !== u$1 ? (o$1 = t$1.substr(0, u$1), "" === (a$1 = t$1.substr(u$1 + 1)) ? void 0 === n$1 ? x(e$1) && !isNaN(parseInt(o$1)) ? e$1.splice(o$1, 1) : delete e$1[o$1] : e$1[o$1] = n$1 : w(u$1 = !(u$1 = e$1[o$1]) || !m(e$1, o$1) ? e$1[o$1] = {} : u$1, a$1, n$1)) : void 0 === n$1 ? x(e$1) && !isNaN(parseInt(t$1)) ? e$1.splice(t$1, 1) : delete e$1[t$1] : e$1[t$1] = n$1;
			}
		}
		function k(e$1) {
			var t$1, n$1 = {};
			for (t$1 in e$1) m(e$1, t$1) && (n$1[t$1] = e$1[t$1]);
			return n$1;
		}
		var t = [].concat;
		function P(e$1) {
			return t.apply([], e$1);
		}
		var e = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(P([
			8,
			16,
			32,
			64
		].map(function(t$1) {
			return [
				"Int",
				"Uint",
				"Float"
			].map(function(e$1) {
				return e$1 + t$1 + "Array";
			});
		}))).filter(function(e$1) {
			return f[e$1];
		}), K = new Set(e.map(function(e$1) {
			return f[e$1];
		}));
		var E = null;
		function S(e$1) {
			E = /* @__PURE__ */ new WeakMap();
			e$1 = function e$2(t$1) {
				if (!t$1 || "object" != typeof t$1) return t$1;
				var n$1 = E.get(t$1);
				if (n$1) return n$1;
				if (x(t$1)) {
					n$1 = [], E.set(t$1, n$1);
					for (var r$1 = 0, i$1 = t$1.length; r$1 < i$1; ++r$1) n$1.push(e$2(t$1[r$1]));
				} else if (K.has(t$1.constructor)) n$1 = t$1;
				else {
					var o$1, a$1 = c(t$1);
					for (o$1 in n$1 = a$1 === Object.prototype ? {} : Object.create(a$1), E.set(t$1, n$1), t$1) m(t$1, o$1) && (n$1[o$1] = e$2(t$1[o$1]));
				}
				return n$1;
			}(e$1);
			return E = null, e$1;
		}
		var j = {}.toString;
		function A(e$1) {
			return j.call(e$1).slice(8, -1);
		}
		var C = "undefined" != typeof Symbol ? Symbol.iterator : "@@iterator", T = "symbol" == typeof C ? function(e$1) {
			var t$1;
			return null != e$1 && (t$1 = e$1[C]) && t$1.apply(e$1);
		} : function() {
			return null;
		};
		function I(e$1, t$1) {
			t$1 = e$1.indexOf(t$1);
			return 0 <= t$1 && e$1.splice(t$1, 1), 0 <= t$1;
		}
		var q = {};
		function D(e$1) {
			var t$1, n$1, r$1, i$1;
			if (1 === arguments.length) {
				if (x(e$1)) return e$1.slice();
				if (this === q && "string" == typeof e$1) return [e$1];
				if (i$1 = T(e$1)) {
					for (n$1 = []; !(r$1 = i$1.next()).done;) n$1.push(r$1.value);
					return n$1;
				}
				if (null == e$1) return [e$1];
				if ("number" != typeof (t$1 = e$1.length)) return [e$1];
				for (n$1 = new Array(t$1); t$1--;) n$1[t$1] = e$1[t$1];
				return n$1;
			}
			for (t$1 = arguments.length, n$1 = new Array(t$1); t$1--;) n$1[t$1] = arguments[t$1];
			return n$1;
		}
		var B = "undefined" != typeof Symbol ? function(e$1) {
			return "AsyncFunction" === e$1[Symbol.toStringTag];
		} : function() {
			return !1;
		}, R = [
			"Unknown",
			"Constraint",
			"Data",
			"TransactionInactive",
			"ReadOnly",
			"Version",
			"NotFound",
			"InvalidState",
			"InvalidAccess",
			"Abort",
			"Timeout",
			"QuotaExceeded",
			"Syntax",
			"DataClone"
		], F = [
			"Modify",
			"Bulk",
			"OpenFailed",
			"VersionChange",
			"Schema",
			"Upgrade",
			"InvalidTable",
			"MissingAPI",
			"NoSuchDatabase",
			"InvalidArgument",
			"SubTransaction",
			"Unsupported",
			"Internal",
			"DatabaseClosed",
			"PrematureCommit",
			"ForeignAwait"
		].concat(R), M = {
			VersionChanged: "Database version changed by other database connection",
			DatabaseClosed: "Database has been closed",
			Abort: "Transaction aborted",
			TransactionInactive: "Transaction has already completed or failed",
			MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
		};
		function N(e$1, t$1) {
			this.name = e$1, this.message = t$1;
		}
		function L(e$1, t$1) {
			return e$1 + ". Errors: " + Object.keys(t$1).map(function(e$2) {
				return t$1[e$2].toString();
			}).filter(function(e$2, t$2, n$1) {
				return n$1.indexOf(e$2) === t$2;
			}).join("\n");
		}
		function U(e$1, t$1, n$1, r$1) {
			this.failures = t$1, this.failedKeys = r$1, this.successCount = n$1, this.message = L(e$1, t$1);
		}
		function V(e$1, t$1) {
			this.name = "BulkError", this.failures = Object.keys(t$1).map(function(e$2) {
				return t$1[e$2];
			}), this.failuresByPos = t$1, this.message = L(e$1, this.failures);
		}
		o(N).from(Error).extend({ toString: function() {
			return this.name + ": " + this.message;
		} }), o(U).from(N), o(V).from(N);
		var z = F.reduce(function(e$1, t$1) {
			return e$1[t$1] = t$1 + "Error", e$1;
		}, {}), W = N, Y = F.reduce(function(e$1, n$1) {
			var r$1 = n$1 + "Error";
			function t$1(e$2, t$2) {
				this.name = r$1, e$2 ? "string" == typeof e$2 ? (this.message = "".concat(e$2).concat(t$2 ? "\n " + t$2 : ""), this.inner = t$2 || null) : "object" == typeof e$2 && (this.message = "".concat(e$2.name, " ").concat(e$2.message), this.inner = e$2) : (this.message = M[n$1] || r$1, this.inner = null);
			}
			return o(t$1).from(W), e$1[n$1] = t$1, e$1;
		}, {});
		Y.Syntax = SyntaxError, Y.Type = TypeError, Y.Range = RangeError;
		var $ = R.reduce(function(e$1, t$1) {
			return e$1[t$1 + "Error"] = Y[t$1], e$1;
		}, {});
		var Q = F.reduce(function(e$1, t$1) {
			return -1 === [
				"Syntax",
				"Type",
				"Range"
			].indexOf(t$1) && (e$1[t$1 + "Error"] = Y[t$1]), e$1;
		}, {});
		function G() {}
		function X(e$1) {
			return e$1;
		}
		function H(t$1, n$1) {
			return null == t$1 || t$1 === X ? n$1 : function(e$1) {
				return n$1(t$1(e$1));
			};
		}
		function J(e$1, t$1) {
			return function() {
				e$1.apply(this, arguments), t$1.apply(this, arguments);
			};
		}
		function Z(i$1, o$1) {
			return i$1 === G ? o$1 : function() {
				var e$1 = i$1.apply(this, arguments);
				void 0 !== e$1 && (arguments[0] = e$1);
				var t$1 = this.onsuccess, n$1 = this.onerror;
				this.onsuccess = null, this.onerror = null;
				var r$1 = o$1.apply(this, arguments);
				return t$1 && (this.onsuccess = this.onsuccess ? J(t$1, this.onsuccess) : t$1), n$1 && (this.onerror = this.onerror ? J(n$1, this.onerror) : n$1), void 0 !== r$1 ? r$1 : e$1;
			};
		}
		function ee(n$1, r$1) {
			return n$1 === G ? r$1 : function() {
				n$1.apply(this, arguments);
				var e$1 = this.onsuccess, t$1 = this.onerror;
				this.onsuccess = this.onerror = null, r$1.apply(this, arguments), e$1 && (this.onsuccess = this.onsuccess ? J(e$1, this.onsuccess) : e$1), t$1 && (this.onerror = this.onerror ? J(t$1, this.onerror) : t$1);
			};
		}
		function te(i$1, o$1) {
			return i$1 === G ? o$1 : function(e$1) {
				var t$1 = i$1.apply(this, arguments);
				a(e$1, t$1);
				var n$1 = this.onsuccess, r$1 = this.onerror;
				this.onsuccess = null, this.onerror = null;
				e$1 = o$1.apply(this, arguments);
				return n$1 && (this.onsuccess = this.onsuccess ? J(n$1, this.onsuccess) : n$1), r$1 && (this.onerror = this.onerror ? J(r$1, this.onerror) : r$1), void 0 === t$1 ? void 0 === e$1 ? void 0 : e$1 : a(t$1, e$1);
			};
		}
		function ne(e$1, t$1) {
			return e$1 === G ? t$1 : function() {
				return !1 !== t$1.apply(this, arguments) && e$1.apply(this, arguments);
			};
		}
		function re(i$1, o$1) {
			return i$1 === G ? o$1 : function() {
				var e$1 = i$1.apply(this, arguments);
				if (e$1 && "function" == typeof e$1.then) {
					for (var t$1 = this, n$1 = arguments.length, r$1 = new Array(n$1); n$1--;) r$1[n$1] = arguments[n$1];
					return e$1.then(function() {
						return o$1.apply(t$1, r$1);
					});
				}
				return o$1.apply(this, arguments);
			};
		}
		Q.ModifyError = U, Q.DexieError = N, Q.BulkError = V;
		var ie = "undefined" != typeof location && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
		function oe(e$1) {
			ie = e$1;
		}
		var ae = {}, ue = 100, e = "undefined" == typeof Promise ? [] : function() {
			var e$1 = Promise.resolve();
			if ("undefined" == typeof crypto || !crypto.subtle) return [
				e$1,
				c(e$1),
				e$1
			];
			var t$1 = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
			return [
				t$1,
				c(t$1),
				e$1
			];
		}(), R = e[0], F = e[1], e = e[2], F = F && F.then, se = R && R.constructor, ce = !!e;
		var le = function(e$1, t$1) {
			be.push([e$1, t$1]), he && (queueMicrotask(Se), he = !1);
		}, fe = !0, he = !0, de = [], pe = [], ye = X, ve = {
			id: "global",
			global: !0,
			ref: 0,
			unhandleds: [],
			onunhandled: G,
			pgp: !1,
			env: {},
			finalize: G
		}, me = ve, be = [], ge = 0, we = [];
		function _e(e$1) {
			if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
			this._listeners = [], this._lib = !1;
			var t$1 = this._PSD = me;
			if ("function" != typeof e$1) {
				if (e$1 !== ae) throw new TypeError("Not a function");
				this._state = arguments[1], this._value = arguments[2], !1 === this._state && Oe(this, this._value);
				return;
			}
			this._state = null, this._value = null, ++t$1.ref, function t$2(r$1, e$2) {
				try {
					e$2(function(n$1) {
						if (null === r$1._state) {
							if (n$1 === r$1) throw new TypeError("A promise cannot be resolved with itself.");
							var e$3 = r$1._lib && je();
							n$1 && "function" == typeof n$1.then ? t$2(r$1, function(e$4, t$3) {
								n$1 instanceof _e ? n$1._then(e$4, t$3) : n$1.then(e$4, t$3);
							}) : (r$1._state = !0, r$1._value = n$1, Pe(r$1)), e$3 && Ae();
						}
					}, Oe.bind(null, r$1));
				} catch (e$3) {
					Oe(r$1, e$3);
				}
			}(this, e$1);
		}
		var xe = {
			get: function() {
				var u$1 = me, t$1 = Fe;
				function e$1(n$1, r$1) {
					var i$1 = this, o$1 = !u$1.global && (u$1 !== me || t$1 !== Fe), a$1 = o$1 && !Ue(), e$2 = new _e(function(e$3, t$2) {
						Ke(i$1, new ke(Qe(n$1, u$1, o$1, a$1), Qe(r$1, u$1, o$1, a$1), e$3, t$2, u$1));
					});
					return this._consoleTask && (e$2._consoleTask = this._consoleTask), e$2;
				}
				return e$1.prototype = ae, e$1;
			},
			set: function(e$1) {
				l(this, "then", e$1 && e$1.prototype === ae ? xe : {
					get: function() {
						return e$1;
					},
					set: xe.set
				});
			}
		};
		function ke(e$1, t$1, n$1, r$1, i$1) {
			this.onFulfilled = "function" == typeof e$1 ? e$1 : null, this.onRejected = "function" == typeof t$1 ? t$1 : null, this.resolve = n$1, this.reject = r$1, this.psd = i$1;
		}
		function Oe(e$1, t$1) {
			var n$1, r$1;
			pe.push(t$1), null === e$1._state && (n$1 = e$1._lib && je(), t$1 = ye(t$1), e$1._state = !1, e$1._value = t$1, r$1 = e$1, de.some(function(e$2) {
				return e$2._value === r$1._value;
			}) || de.push(r$1), Pe(e$1), n$1 && Ae());
		}
		function Pe(e$1) {
			var t$1 = e$1._listeners;
			e$1._listeners = [];
			for (var n$1 = 0, r$1 = t$1.length; n$1 < r$1; ++n$1) Ke(e$1, t$1[n$1]);
			var i$1 = e$1._PSD;
			--i$1.ref || i$1.finalize(), 0 === ge && (++ge, le(function() {
				0 == --ge && Ce();
			}, []));
		}
		function Ke(e$1, t$1) {
			if (null !== e$1._state) {
				var n$1 = e$1._state ? t$1.onFulfilled : t$1.onRejected;
				if (null === n$1) return (e$1._state ? t$1.resolve : t$1.reject)(e$1._value);
				++t$1.psd.ref, ++ge, le(Ee, [
					n$1,
					e$1,
					t$1
				]);
			} else e$1._listeners.push(t$1);
		}
		function Ee(e$1, t$1, n$1) {
			try {
				var r$1, i$1 = t$1._value;
				!t$1._state && pe.length && (pe = []), r$1 = ie && t$1._consoleTask ? t$1._consoleTask.run(function() {
					return e$1(i$1);
				}) : e$1(i$1), t$1._state || -1 !== pe.indexOf(i$1) || function(e$2) {
					var t$2 = de.length;
					for (; t$2;) if (de[--t$2]._value === e$2._value) return de.splice(t$2, 1);
				}(t$1), n$1.resolve(r$1);
			} catch (e$2) {
				n$1.reject(e$2);
			} finally {
				0 == --ge && Ce(), --n$1.psd.ref || n$1.psd.finalize();
			}
		}
		function Se() {
			$e(ve, function() {
				je() && Ae();
			});
		}
		function je() {
			var e$1 = fe;
			return he = fe = !1, e$1;
		}
		function Ae() {
			var e$1, t$1, n$1;
			do
				for (; 0 < be.length;) for (e$1 = be, be = [], n$1 = e$1.length, t$1 = 0; t$1 < n$1; ++t$1) {
					var r$1 = e$1[t$1];
					r$1[0].apply(null, r$1[1]);
				}
			while (0 < be.length);
			he = fe = !0;
		}
		function Ce() {
			var e$1 = de;
			de = [], e$1.forEach(function(e$2) {
				e$2._PSD.onunhandled.call(null, e$2._value, e$2);
			});
			for (var t$1 = we.slice(0), n$1 = t$1.length; n$1;) t$1[--n$1]();
		}
		function Te(e$1) {
			return new _e(ae, !1, e$1);
		}
		function Ie(n$1, r$1) {
			var i$1 = me;
			return function() {
				var e$1 = je(), t$1 = me;
				try {
					return We(i$1, !0), n$1.apply(this, arguments);
				} catch (e$2) {
					r$1 && r$1(e$2);
				} finally {
					We(t$1, !1), e$1 && Ae();
				}
			};
		}
		r(_e.prototype, {
			then: xe,
			_then: function(e$1, t$1) {
				Ke(this, new ke(null, null, e$1, t$1, me));
			},
			catch: function(e$1) {
				if (1 === arguments.length) return this.then(null, e$1);
				var t$1 = e$1, n$1 = arguments[1];
				return "function" == typeof t$1 ? this.then(null, function(e$2) {
					return (e$2 instanceof t$1 ? n$1 : Te)(e$2);
				}) : this.then(null, function(e$2) {
					return (e$2 && e$2.name === t$1 ? n$1 : Te)(e$2);
				});
			},
			finally: function(t$1) {
				return this.then(function(e$1) {
					return _e.resolve(t$1()).then(function() {
						return e$1;
					});
				}, function(e$1) {
					return _e.resolve(t$1()).then(function() {
						return Te(e$1);
					});
				});
			},
			timeout: function(r$1, i$1) {
				var o$1 = this;
				return r$1 < Infinity ? new _e(function(e$1, t$1) {
					var n$1 = setTimeout(function() {
						return t$1(new Y.Timeout(i$1));
					}, r$1);
					o$1.then(e$1, t$1).finally(clearTimeout.bind(null, n$1));
				}) : this;
			}
		}), "undefined" != typeof Symbol && Symbol.toStringTag && l(_e.prototype, Symbol.toStringTag, "Dexie.Promise"), ve.env = Ye(), r(_e, {
			all: function() {
				var o$1 = D.apply(null, arguments).map(Ve);
				return new _e(function(n$1, r$1) {
					0 === o$1.length && n$1([]);
					var i$1 = o$1.length;
					o$1.forEach(function(e$1, t$1) {
						return _e.resolve(e$1).then(function(e$2) {
							o$1[t$1] = e$2, --i$1 || n$1(o$1);
						}, r$1);
					});
				});
			},
			resolve: function(n$1) {
				return n$1 instanceof _e ? n$1 : n$1 && "function" == typeof n$1.then ? new _e(function(e$1, t$1) {
					n$1.then(e$1, t$1);
				}) : new _e(ae, !0, n$1);
			},
			reject: Te,
			race: function() {
				var e$1 = D.apply(null, arguments).map(Ve);
				return new _e(function(t$1, n$1) {
					e$1.map(function(e$2) {
						return _e.resolve(e$2).then(t$1, n$1);
					});
				});
			},
			PSD: {
				get: function() {
					return me;
				},
				set: function(e$1) {
					return me = e$1;
				}
			},
			totalEchoes: { get: function() {
				return Fe;
			} },
			newPSD: Ne,
			usePSD: $e,
			scheduler: {
				get: function() {
					return le;
				},
				set: function(e$1) {
					le = e$1;
				}
			},
			rejectionMapper: {
				get: function() {
					return ye;
				},
				set: function(e$1) {
					ye = e$1;
				}
			},
			follow: function(i$1, n$1) {
				return new _e(function(e$1, t$1) {
					return Ne(function(n$2, r$1) {
						var e$2 = me;
						e$2.unhandleds = [], e$2.onunhandled = r$1, e$2.finalize = J(function() {
							var t$2, e$3 = this;
							t$2 = function() {
								0 === e$3.unhandleds.length ? n$2() : r$1(e$3.unhandleds[0]);
							}, we.push(function e$4() {
								t$2(), we.splice(we.indexOf(e$4), 1);
							}), ++ge, le(function() {
								0 == --ge && Ce();
							}, []);
						}, e$2.finalize), i$1();
					}, n$1, e$1, t$1);
				});
			}
		}), se && (se.allSettled && l(_e, "allSettled", function() {
			var e$1 = D.apply(null, arguments).map(Ve);
			return new _e(function(n$1) {
				0 === e$1.length && n$1([]);
				var r$1 = e$1.length, i$1 = new Array(r$1);
				e$1.forEach(function(e$2, t$1) {
					return _e.resolve(e$2).then(function(e$3) {
						return i$1[t$1] = {
							status: "fulfilled",
							value: e$3
						};
					}, function(e$3) {
						return i$1[t$1] = {
							status: "rejected",
							reason: e$3
						};
					}).then(function() {
						return --r$1 || n$1(i$1);
					});
				});
			});
		}), se.any && "undefined" != typeof AggregateError && l(_e, "any", function() {
			var e$1 = D.apply(null, arguments).map(Ve);
			return new _e(function(n$1, r$1) {
				0 === e$1.length && r$1(/* @__PURE__ */ new AggregateError([]));
				var i$1 = e$1.length, o$1 = new Array(i$1);
				e$1.forEach(function(e$2, t$1) {
					return _e.resolve(e$2).then(function(e$3) {
						return n$1(e$3);
					}, function(e$3) {
						o$1[t$1] = e$3, --i$1 || r$1(new AggregateError(o$1));
					});
				});
			});
		}), se.withResolvers && (_e.withResolvers = se.withResolvers));
		var qe = {
			awaits: 0,
			echoes: 0,
			id: 0
		}, De = 0, Be = [], Re = 0, Fe = 0, Me = 0;
		function Ne(e$1, t$1, n$1, r$1) {
			var i$1 = me, o$1 = Object.create(i$1);
			o$1.parent = i$1, o$1.ref = 0, o$1.global = !1, o$1.id = ++Me, ve.env, o$1.env = ce ? {
				Promise: _e,
				PromiseProp: {
					value: _e,
					configurable: !0,
					writable: !0
				},
				all: _e.all,
				race: _e.race,
				allSettled: _e.allSettled,
				any: _e.any,
				resolve: _e.resolve,
				reject: _e.reject
			} : {}, t$1 && a(o$1, t$1), ++i$1.ref, o$1.finalize = function() {
				--this.parent.ref || this.parent.finalize();
			};
			r$1 = $e(o$1, e$1, n$1, r$1);
			return 0 === o$1.ref && o$1.finalize(), r$1;
		}
		function Le() {
			return qe.id || (qe.id = ++De), ++qe.awaits, qe.echoes += ue, qe.id;
		}
		function Ue() {
			return !!qe.awaits && (0 == --qe.awaits && (qe.id = 0), qe.echoes = qe.awaits * ue, !0);
		}
		function Ve(e$1) {
			return qe.echoes && e$1 && e$1.constructor === se ? (Le(), e$1.then(function(e$2) {
				return Ue(), e$2;
			}, function(e$2) {
				return Ue(), Xe(e$2);
			})) : e$1;
		}
		function ze() {
			var e$1 = Be[Be.length - 1];
			Be.pop(), We(e$1, !1);
		}
		function We(e$1, t$1) {
			var n$1, r$1 = me;
			(t$1 ? !qe.echoes || Re++ && e$1 === me : !Re || --Re && e$1 === me) || queueMicrotask(t$1 ? function(e$2) {
				++Fe, qe.echoes && 0 != --qe.echoes || (qe.echoes = qe.awaits = qe.id = 0), Be.push(me), We(e$2, !0);
			}.bind(null, e$1) : ze), e$1 !== me && (me = e$1, r$1 === ve && (ve.env = Ye()), ce && (n$1 = ve.env.Promise, t$1 = e$1.env, (r$1.global || e$1.global) && (Object.defineProperty(f, "Promise", t$1.PromiseProp), n$1.all = t$1.all, n$1.race = t$1.race, n$1.resolve = t$1.resolve, n$1.reject = t$1.reject, t$1.allSettled && (n$1.allSettled = t$1.allSettled), t$1.any && (n$1.any = t$1.any))));
		}
		function Ye() {
			var e$1 = f.Promise;
			return ce ? {
				Promise: e$1,
				PromiseProp: Object.getOwnPropertyDescriptor(f, "Promise"),
				all: e$1.all,
				race: e$1.race,
				allSettled: e$1.allSettled,
				any: e$1.any,
				resolve: e$1.resolve,
				reject: e$1.reject
			} : {};
		}
		function $e(e$1, t$1, n$1, r$1, i$1) {
			var o$1 = me;
			try {
				return We(e$1, !0), t$1(n$1, r$1, i$1);
			} finally {
				We(o$1, !1);
			}
		}
		function Qe(t$1, n$1, r$1, i$1) {
			return "function" != typeof t$1 ? t$1 : function() {
				var e$1 = me;
				r$1 && Le(), We(n$1, !0);
				try {
					return t$1.apply(this, arguments);
				} finally {
					We(e$1, !1), i$1 && queueMicrotask(Ue);
				}
			};
		}
		function Ge(e$1) {
			Promise === se && 0 === qe.echoes ? 0 === Re ? e$1() : enqueueNativeMicroTask(e$1) : setTimeout(e$1, 0);
		}
		-1 === ("" + F).indexOf("[native code]") && (Le = Ue = G);
		var Xe = _e.reject;
		var He = String.fromCharCode(65535), Je = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", Ze = "String expected.", et = [], tt = "__dbnames", nt = "readonly", rt = "readwrite";
		function it(e$1, t$1) {
			return e$1 ? t$1 ? function() {
				return e$1.apply(this, arguments) && t$1.apply(this, arguments);
			} : e$1 : t$1;
		}
		var ot = {
			type: 3,
			lower: -Infinity,
			lowerOpen: !1,
			upper: [[]],
			upperOpen: !1
		};
		function at(t$1) {
			return "string" != typeof t$1 || /\./.test(t$1) ? function(e$1) {
				return e$1;
			} : function(e$1) {
				return void 0 === e$1[t$1] && t$1 in e$1 && delete (e$1 = S(e$1))[t$1], e$1;
			};
		}
		function ut() {
			throw Y.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.");
		}
		function st(e$1, t$1) {
			try {
				var n$1 = ct(e$1), r$1 = ct(t$1);
				if (n$1 !== r$1) return "Array" === n$1 ? 1 : "Array" === r$1 ? -1 : "binary" === n$1 ? 1 : "binary" === r$1 ? -1 : "string" === n$1 ? 1 : "string" === r$1 ? -1 : "Date" === n$1 ? 1 : "Date" !== r$1 ? NaN : -1;
				switch (n$1) {
					case "number":
					case "Date":
					case "string": return t$1 < e$1 ? 1 : e$1 < t$1 ? -1 : 0;
					case "binary": return function(e$2, t$2) {
						for (var n$2 = e$2.length, r$2 = t$2.length, i$1 = n$2 < r$2 ? n$2 : r$2, o$1 = 0; o$1 < i$1; ++o$1) if (e$2[o$1] !== t$2[o$1]) return e$2[o$1] < t$2[o$1] ? -1 : 1;
						return n$2 === r$2 ? 0 : n$2 < r$2 ? -1 : 1;
					}(lt(e$1), lt(t$1));
					case "Array": return function(e$2, t$2) {
						for (var n$2 = e$2.length, r$2 = t$2.length, i$1 = n$2 < r$2 ? n$2 : r$2, o$1 = 0; o$1 < i$1; ++o$1) {
							var a$1 = st(e$2[o$1], t$2[o$1]);
							if (0 !== a$1) return a$1;
						}
						return n$2 === r$2 ? 0 : n$2 < r$2 ? -1 : 1;
					}(e$1, t$1);
				}
			} catch (e$2) {}
			return NaN;
		}
		function ct(e$1) {
			var t$1 = typeof e$1;
			if ("object" != t$1) return t$1;
			if (ArrayBuffer.isView(e$1)) return "binary";
			e$1 = A(e$1);
			return "ArrayBuffer" === e$1 ? "binary" : e$1;
		}
		function lt(e$1) {
			return e$1 instanceof Uint8Array ? e$1 : ArrayBuffer.isView(e$1) ? new Uint8Array(e$1.buffer, e$1.byteOffset, e$1.byteLength) : new Uint8Array(e$1);
		}
		function ft(t$1, n$1, r$1) {
			var e$1 = t$1.schema.yProps;
			return e$1 ? (n$1 && 0 < r$1.numFailures && (n$1 = n$1.filter(function(e$2, t$2) {
				return !r$1.failures[t$2];
			})), Promise.all(e$1.map(function(e$2) {
				e$2 = e$2.updatesTable;
				return n$1 ? t$1.db.table(e$2).where("k").anyOf(n$1).delete() : t$1.db.table(e$2).clear();
			})).then(function() {
				return r$1;
			})) : r$1;
		}
		var ht = (dt.prototype.execute = function(e$1) {
			var t$1 = this["@@propmod"];
			if (void 0 !== t$1.add) {
				var n$1 = t$1.add;
				if (x(n$1)) return i(i([], x(e$1) ? e$1 : [], !0), n$1, !0).sort();
				if ("number" == typeof n$1) return (Number(e$1) || 0) + n$1;
				if ("bigint" == typeof n$1) try {
					return BigInt(e$1) + n$1;
				} catch (e$2) {
					return BigInt(0) + n$1;
				}
				throw new TypeError("Invalid term ".concat(n$1));
			}
			if (void 0 !== t$1.remove) {
				var r$1 = t$1.remove;
				if (x(r$1)) return x(e$1) ? e$1.filter(function(e$2) {
					return !r$1.includes(e$2);
				}).sort() : [];
				if ("number" == typeof r$1) return Number(e$1) - r$1;
				if ("bigint" == typeof r$1) try {
					return BigInt(e$1) - r$1;
				} catch (e$2) {
					return BigInt(0) - r$1;
				}
				throw new TypeError("Invalid subtrahend ".concat(r$1));
			}
			n$1 = null === (n$1 = t$1.replacePrefix) || void 0 === n$1 ? void 0 : n$1[0];
			return n$1 && "string" == typeof e$1 && e$1.startsWith(n$1) ? t$1.replacePrefix[1] + e$1.substring(n$1.length) : e$1;
		}, dt);
		function dt(e$1) {
			this["@@propmod"] = e$1;
		}
		function pt(e$1, t$1) {
			for (var n$1 = O(t$1), r$1 = n$1.length, i$1 = !1, o$1 = 0; o$1 < r$1; ++o$1) {
				var a$1 = n$1[o$1], u$1 = t$1[a$1], s$1 = g(e$1, a$1);
				u$1 instanceof ht ? (w(e$1, a$1, u$1.execute(s$1)), i$1 = !0) : s$1 !== u$1 && (w(e$1, a$1, u$1), i$1 = !0);
			}
			return i$1;
		}
		var yt = (vt.prototype._trans = function(e$1, r$1, t$1) {
			var n$1 = this._tx || me.trans, i$1 = this.name, o$1 = ie && "undefined" != typeof console && console.createTask && console.createTask("Dexie: ".concat("readonly" === e$1 ? "read" : "write", " ").concat(this.name));
			function a$1(e$2, t$2, n$2) {
				if (!n$2.schema[i$1]) throw new Y.NotFound("Table " + i$1 + " not part of transaction");
				return r$1(n$2.idbtrans, n$2);
			}
			var u$1 = je();
			try {
				var s$1 = n$1 && n$1.db._novip === this.db._novip ? n$1 === me.trans ? n$1._promise(e$1, a$1, t$1) : Ne(function() {
					return n$1._promise(e$1, a$1, t$1);
				}, {
					trans: n$1,
					transless: me.transless || me
				}) : function t$2(n$2, r$2, i$2, o$2) {
					if (n$2.idbdb && (n$2._state.openComplete || me.letThrough || n$2._vip)) {
						var a$2 = n$2._createTransaction(r$2, i$2, n$2._dbSchema);
						try {
							a$2.create(), n$2._state.PR1398_maxLoop = 3;
						} catch (e$2) {
							return e$2.name === z.InvalidState && n$2.isOpen() && 0 < --n$2._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), n$2.close({ disableAutoOpen: !1 }), n$2.open().then(function() {
								return t$2(n$2, r$2, i$2, o$2);
							})) : Xe(e$2);
						}
						return a$2._promise(r$2, function(e$2, t$3) {
							return Ne(function() {
								return me.trans = a$2, o$2(e$2, t$3, a$2);
							});
						}).then(function(e$2) {
							if ("readwrite" === r$2) try {
								a$2.idbtrans.commit();
							} catch (e$3) {}
							return "readonly" === r$2 ? e$2 : a$2._completion.then(function() {
								return e$2;
							});
						});
					}
					if (n$2._state.openComplete) return Xe(new Y.DatabaseClosed(n$2._state.dbOpenError));
					if (!n$2._state.isBeingOpened) {
						if (!n$2._state.autoOpen) return Xe(new Y.DatabaseClosed());
						n$2.open().catch(G);
					}
					return n$2._state.dbReadyPromise.then(function() {
						return t$2(n$2, r$2, i$2, o$2);
					});
				}(this.db, e$1, [this.name], a$1);
				return o$1 && (s$1._consoleTask = o$1, s$1 = s$1.catch(function(e$2) {
					return console.trace(e$2), Xe(e$2);
				})), s$1;
			} finally {
				u$1 && Ae();
			}
		}, vt.prototype.get = function(t$1, e$1) {
			var n$1 = this;
			return t$1 && t$1.constructor === Object ? this.where(t$1).first(e$1) : null == t$1 ? Xe(new Y.Type("Invalid argument to Table.get()")) : this._trans("readonly", function(e$2) {
				return n$1.core.get({
					trans: e$2,
					key: t$1
				}).then(function(e$3) {
					return n$1.hook.reading.fire(e$3);
				});
			}).then(e$1);
		}, vt.prototype.where = function(o$1) {
			if ("string" == typeof o$1) return new this.db.WhereClause(this, o$1);
			if (x(o$1)) return new this.db.WhereClause(this, "[".concat(o$1.join("+"), "]"));
			var n$1 = O(o$1);
			if (1 === n$1.length) return this.where(n$1[0]).equals(o$1[n$1[0]]);
			var e$1 = this.schema.indexes.concat(this.schema.primKey).filter(function(t$2) {
				if (t$2.compound && n$1.every(function(e$3) {
					return 0 <= t$2.keyPath.indexOf(e$3);
				})) {
					for (var e$2 = 0; e$2 < n$1.length; ++e$2) if (-1 === n$1.indexOf(t$2.keyPath[e$2])) return !1;
					return !0;
				}
				return !1;
			}).sort(function(e$2, t$2) {
				return e$2.keyPath.length - t$2.keyPath.length;
			})[0];
			if (e$1 && this.db._maxKey !== He) {
				var t$1 = e$1.keyPath.slice(0, n$1.length);
				return this.where(t$1).equals(t$1.map(function(e$2) {
					return o$1[e$2];
				}));
			}
			!e$1 && ie && console.warn("The query ".concat(JSON.stringify(o$1), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(n$1.join("+"), "]"));
			var a$1 = this.schema.idxByName;
			function u$1(e$2, t$2) {
				return 0 === st(e$2, t$2);
			}
			var r$1 = n$1.reduce(function(e$2, t$2) {
				var n$2 = e$2[0], r$2 = e$2[1], e$2 = a$1[t$2], i$1 = o$1[t$2];
				return [n$2 || e$2, n$2 || !e$2 ? it(r$2, e$2 && e$2.multi ? function(e$3) {
					e$3 = g(e$3, t$2);
					return x(e$3) && e$3.some(function(e$4) {
						return u$1(i$1, e$4);
					});
				} : function(e$3) {
					return u$1(i$1, g(e$3, t$2));
				}) : r$2];
			}, [null, null]), t$1 = r$1[0], r$1 = r$1[1];
			return t$1 ? this.where(t$1.name).equals(o$1[t$1.keyPath]).filter(r$1) : e$1 ? this.filter(r$1) : this.where(n$1).equals("");
		}, vt.prototype.filter = function(e$1) {
			return this.toCollection().and(e$1);
		}, vt.prototype.count = function(e$1) {
			return this.toCollection().count(e$1);
		}, vt.prototype.offset = function(e$1) {
			return this.toCollection().offset(e$1);
		}, vt.prototype.limit = function(e$1) {
			return this.toCollection().limit(e$1);
		}, vt.prototype.each = function(e$1) {
			return this.toCollection().each(e$1);
		}, vt.prototype.toArray = function(e$1) {
			return this.toCollection().toArray(e$1);
		}, vt.prototype.toCollection = function() {
			return new this.db.Collection(new this.db.WhereClause(this));
		}, vt.prototype.orderBy = function(e$1) {
			return new this.db.Collection(new this.db.WhereClause(this, x(e$1) ? "[".concat(e$1.join("+"), "]") : e$1));
		}, vt.prototype.reverse = function() {
			return this.toCollection().reverse();
		}, vt.prototype.mapToClass = function(r$1) {
			var e$1, t$1 = this.db, n$1 = this.name;
			function i$1() {
				return null !== e$1 && e$1.apply(this, arguments) || this;
			}
			(this.schema.mappedClass = r$1).prototype instanceof ut && (function(e$2, t$2) {
				if ("function" != typeof t$2 && null !== t$2) throw new TypeError("Class extends value " + String(t$2) + " is not a constructor or null");
				function n$2() {
					this.constructor = e$2;
				}
				s(e$2, t$2), e$2.prototype = null === t$2 ? Object.create(t$2) : (n$2.prototype = t$2.prototype, new n$2());
			}(i$1, e$1 = r$1), Object.defineProperty(i$1.prototype, "db", {
				get: function() {
					return t$1;
				},
				enumerable: !1,
				configurable: !0
			}), i$1.prototype.table = function() {
				return n$1;
			}, r$1 = i$1);
			for (var o$1 = /* @__PURE__ */ new Set(), a$1 = r$1.prototype; a$1; a$1 = c(a$1)) Object.getOwnPropertyNames(a$1).forEach(function(e$2) {
				return o$1.add(e$2);
			});
			function u$1(e$2) {
				if (!e$2) return e$2;
				var t$2, n$2 = Object.create(r$1.prototype);
				for (t$2 in e$2) if (!o$1.has(t$2)) try {
					n$2[t$2] = e$2[t$2];
				} catch (e$3) {}
				return n$2;
			}
			return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = u$1, this.hook("reading", u$1), r$1;
		}, vt.prototype.defineClass = function() {
			return this.mapToClass(function(e$1) {
				a(this, e$1);
			});
		}, vt.prototype.add = function(t$1, n$1) {
			var r$1 = this, e$1 = this.schema.primKey, i$1 = e$1.auto, o$1 = e$1.keyPath, a$1 = t$1;
			return o$1 && i$1 && (a$1 = at(o$1)(t$1)), this._trans("readwrite", function(e$2) {
				return r$1.core.mutate({
					trans: e$2,
					type: "add",
					keys: null != n$1 ? [n$1] : null,
					values: [a$1]
				});
			}).then(function(e$2) {
				return e$2.numFailures ? _e.reject(e$2.failures[0]) : e$2.lastResult;
			}).then(function(e$2) {
				if (o$1) try {
					w(t$1, o$1, e$2);
				} catch (e$3) {}
				return e$2;
			});
		}, vt.prototype.upsert = function(r$1, i$1) {
			var o$1 = this, a$1 = this.schema.primKey.keyPath;
			return this._trans("readwrite", function(n$1) {
				return o$1.core.get({
					trans: n$1,
					key: r$1
				}).then(function(t$1) {
					var e$1 = null != t$1 ? t$1 : {};
					return pt(e$1, i$1), a$1 && w(e$1, a$1, r$1), o$1.core.mutate({
						trans: n$1,
						type: "put",
						values: [e$1],
						keys: [r$1],
						upsert: !0,
						updates: {
							keys: [r$1],
							changeSpecs: [i$1]
						}
					}).then(function(e$2) {
						return e$2.numFailures ? _e.reject(e$2.failures[0]) : !!t$1;
					});
				});
			});
		}, vt.prototype.update = function(e$1, t$1) {
			if ("object" != typeof e$1 || x(e$1)) return this.where(":id").equals(e$1).modify(t$1);
			e$1 = g(e$1, this.schema.primKey.keyPath);
			return void 0 === e$1 ? Xe(new Y.InvalidArgument("Given object does not contain its primary key")) : this.where(":id").equals(e$1).modify(t$1);
		}, vt.prototype.put = function(t$1, n$1) {
			var r$1 = this, e$1 = this.schema.primKey, i$1 = e$1.auto, o$1 = e$1.keyPath, a$1 = t$1;
			return o$1 && i$1 && (a$1 = at(o$1)(t$1)), this._trans("readwrite", function(e$2) {
				return r$1.core.mutate({
					trans: e$2,
					type: "put",
					values: [a$1],
					keys: null != n$1 ? [n$1] : null
				});
			}).then(function(e$2) {
				return e$2.numFailures ? _e.reject(e$2.failures[0]) : e$2.lastResult;
			}).then(function(e$2) {
				if (o$1) try {
					w(t$1, o$1, e$2);
				} catch (e$3) {}
				return e$2;
			});
		}, vt.prototype.delete = function(t$1) {
			var n$1 = this;
			return this._trans("readwrite", function(e$1) {
				return n$1.core.mutate({
					trans: e$1,
					type: "delete",
					keys: [t$1]
				}).then(function(e$2) {
					return ft(n$1, [t$1], e$2);
				}).then(function(e$2) {
					return e$2.numFailures ? _e.reject(e$2.failures[0]) : void 0;
				});
			});
		}, vt.prototype.clear = function() {
			var t$1 = this;
			return this._trans("readwrite", function(e$1) {
				return t$1.core.mutate({
					trans: e$1,
					type: "deleteRange",
					range: ot
				}).then(function(e$2) {
					return ft(t$1, null, e$2);
				});
			}).then(function(e$1) {
				return e$1.numFailures ? _e.reject(e$1.failures[0]) : void 0;
			});
		}, vt.prototype.bulkGet = function(t$1) {
			var n$1 = this;
			return this._trans("readonly", function(e$1) {
				return n$1.core.getMany({
					keys: t$1,
					trans: e$1
				}).then(function(e$2) {
					return e$2.map(function(e$3) {
						return n$1.hook.reading.fire(e$3);
					});
				});
			});
		}, vt.prototype.bulkAdd = function(r$1, e$1, t$1) {
			var o$1 = this, a$1 = Array.isArray(e$1) ? e$1 : void 0, u$1 = (t$1 = t$1 || (a$1 ? void 0 : e$1)) ? t$1.allKeys : void 0;
			return this._trans("readwrite", function(e$2) {
				var t$2 = o$1.schema.primKey, n$1 = t$2.auto, t$2 = t$2.keyPath;
				if (t$2 && a$1) throw new Y.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
				if (a$1 && a$1.length !== r$1.length) throw new Y.InvalidArgument("Arguments objects and keys must have the same length");
				var i$1 = r$1.length, t$2 = t$2 && n$1 ? r$1.map(at(t$2)) : r$1;
				return o$1.core.mutate({
					trans: e$2,
					type: "add",
					keys: a$1,
					values: t$2,
					wantResults: u$1
				}).then(function(e$3) {
					var t$3 = e$3.numFailures, n$2 = e$3.results, r$2 = e$3.lastResult, e$3 = e$3.failures;
					if (0 === t$3) return u$1 ? n$2 : r$2;
					throw new V("".concat(o$1.name, ".bulkAdd(): ").concat(t$3, " of ").concat(i$1, " operations failed"), e$3);
				});
			});
		}, vt.prototype.bulkPut = function(r$1, e$1, t$1) {
			var o$1 = this, a$1 = Array.isArray(e$1) ? e$1 : void 0, u$1 = (t$1 = t$1 || (a$1 ? void 0 : e$1)) ? t$1.allKeys : void 0;
			return this._trans("readwrite", function(e$2) {
				var t$2 = o$1.schema.primKey, n$1 = t$2.auto, t$2 = t$2.keyPath;
				if (t$2 && a$1) throw new Y.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
				if (a$1 && a$1.length !== r$1.length) throw new Y.InvalidArgument("Arguments objects and keys must have the same length");
				var i$1 = r$1.length, t$2 = t$2 && n$1 ? r$1.map(at(t$2)) : r$1;
				return o$1.core.mutate({
					trans: e$2,
					type: "put",
					keys: a$1,
					values: t$2,
					wantResults: u$1
				}).then(function(e$3) {
					var t$3 = e$3.numFailures, n$2 = e$3.results, r$2 = e$3.lastResult, e$3 = e$3.failures;
					if (0 === t$3) return u$1 ? n$2 : r$2;
					throw new V("".concat(o$1.name, ".bulkPut(): ").concat(t$3, " of ").concat(i$1, " operations failed"), e$3);
				});
			});
		}, vt.prototype.bulkUpdate = function(t$1) {
			var h$1 = this, n$1 = this.core, r$1 = t$1.map(function(e$1) {
				return e$1.key;
			}), i$1 = t$1.map(function(e$1) {
				return e$1.changes;
			}), d$1 = [];
			return this._trans("readwrite", function(e$1) {
				return n$1.getMany({
					trans: e$1,
					keys: r$1,
					cache: "clone"
				}).then(function(c$1) {
					var l$1 = [], f$1 = [];
					t$1.forEach(function(e$2, t$2) {
						var n$2 = e$2.key, r$2 = e$2.changes, i$2 = c$1[t$2];
						if (i$2) {
							for (var o$1 = 0, a$1 = Object.keys(r$2); o$1 < a$1.length; o$1++) {
								var u$1 = a$1[o$1], s$2 = r$2[u$1];
								if (u$1 === h$1.schema.primKey.keyPath) {
									if (0 !== st(s$2, n$2)) throw new Y.Constraint("Cannot update primary key in bulkUpdate()");
								} else w(i$2, u$1, s$2);
							}
							d$1.push(t$2), l$1.push(n$2), f$1.push(i$2);
						}
					});
					var s$1 = l$1.length;
					return n$1.mutate({
						trans: e$1,
						type: "put",
						keys: l$1,
						values: f$1,
						updates: {
							keys: r$1,
							changeSpecs: i$1
						}
					}).then(function(e$2) {
						var t$2 = e$2.numFailures, n$2 = e$2.failures;
						if (0 === t$2) return s$1;
						for (var r$2 = 0, i$2 = Object.keys(n$2); r$2 < i$2.length; r$2++) {
							var o$1, a$1 = i$2[r$2], u$1 = d$1[Number(a$1)];
							null != u$1 && (o$1 = n$2[a$1], delete n$2[a$1], n$2[u$1] = o$1);
						}
						throw new V("".concat(h$1.name, ".bulkUpdate(): ").concat(t$2, " of ").concat(s$1, " operations failed"), n$2);
					});
				});
			});
		}, vt.prototype.bulkDelete = function(t$1) {
			var r$1 = this, i$1 = t$1.length;
			return this._trans("readwrite", function(e$1) {
				return r$1.core.mutate({
					trans: e$1,
					type: "delete",
					keys: t$1
				}).then(function(e$2) {
					return ft(r$1, t$1, e$2);
				});
			}).then(function(e$1) {
				var t$2 = e$1.numFailures, n$1 = e$1.lastResult, e$1 = e$1.failures;
				if (0 === t$2) return n$1;
				throw new V("".concat(r$1.name, ".bulkDelete(): ").concat(t$2, " of ").concat(i$1, " operations failed"), e$1);
			});
		}, vt);
		function vt() {}
		function mt(i$1) {
			function t$1(e$2, t$2) {
				if (t$2) {
					for (var n$2 = arguments.length, r$1 = new Array(n$2 - 1); --n$2;) r$1[n$2 - 1] = arguments[n$2];
					return a$1[e$2].subscribe.apply(null, r$1), i$1;
				}
				if ("string" == typeof e$2) return a$1[e$2];
			}
			var a$1 = {};
			t$1.addEventType = u$1;
			for (var e$1 = 1, n$1 = arguments.length; e$1 < n$1; ++e$1) u$1(arguments[e$1]);
			return t$1;
			function u$1(e$2, n$2, r$1) {
				if ("object" != typeof e$2) {
					var i$2;
					n$2 = n$2 || ne;
					var o$1 = {
						subscribers: [],
						fire: r$1 = r$1 || G,
						subscribe: function(e$3) {
							-1 === o$1.subscribers.indexOf(e$3) && (o$1.subscribers.push(e$3), o$1.fire = n$2(o$1.fire, e$3));
						},
						unsubscribe: function(t$2) {
							o$1.subscribers = o$1.subscribers.filter(function(e$3) {
								return e$3 !== t$2;
							}), o$1.fire = o$1.subscribers.reduce(n$2, r$1);
						}
					};
					return a$1[e$2] = t$1[e$2] = o$1;
				}
				O(i$2 = e$2).forEach(function(e$3) {
					var t$2 = i$2[e$3];
					if (x(t$2)) u$1(e$3, i$2[e$3][0], i$2[e$3][1]);
					else {
						if ("asap" !== t$2) throw new Y.InvalidArgument("Invalid event config");
						var n$3 = u$1(e$3, X, function() {
							for (var e$4 = arguments.length, t$3 = new Array(e$4); e$4--;) t$3[e$4] = arguments[e$4];
							n$3.subscribers.forEach(function(e$5) {
								v(function() {
									e$5.apply(null, t$3);
								});
							});
						});
					}
				});
			}
		}
		function bt(e$1, t$1) {
			return o(t$1).from({ prototype: e$1 }), t$1;
		}
		function gt(e$1, t$1) {
			return !(e$1.filter || e$1.algorithm || e$1.or) && (t$1 ? e$1.justLimit : !e$1.replayFilter);
		}
		function wt(e$1, t$1) {
			e$1.filter = it(e$1.filter, t$1);
		}
		function _t(e$1, t$1, n$1) {
			var r$1 = e$1.replayFilter;
			e$1.replayFilter = r$1 ? function() {
				return it(r$1(), t$1());
			} : t$1, e$1.justLimit = n$1 && !r$1;
		}
		function xt(e$1, t$1) {
			if (e$1.isPrimKey) return t$1.primaryKey;
			var n$1 = t$1.getIndexByKeyPath(e$1.index);
			if (!n$1) throw new Y.Schema("KeyPath " + e$1.index + " on object store " + t$1.name + " is not indexed");
			return n$1;
		}
		function kt(e$1, t$1, n$1) {
			var r$1 = xt(e$1, t$1.schema);
			return t$1.openCursor({
				trans: n$1,
				values: !e$1.keysOnly,
				reverse: "prev" === e$1.dir,
				unique: !!e$1.unique,
				query: {
					index: r$1,
					range: e$1.range
				}
			});
		}
		function Ot(e$1, o$1, t$1, n$1) {
			var a$1 = e$1.replayFilter ? it(e$1.filter, e$1.replayFilter()) : e$1.filter;
			if (e$1.or) {
				var u$1 = {}, r$1 = function(e$2, t$2, n$2) {
					var r$2, i$1;
					a$1 && !a$1(t$2, n$2, function(e$3) {
						return t$2.stop(e$3);
					}, function(e$3) {
						return t$2.fail(e$3);
					}) || ("[object ArrayBuffer]" === (i$1 = "" + (r$2 = t$2.primaryKey)) && (i$1 = "" + new Uint8Array(r$2)), m(u$1, i$1) || (u$1[i$1] = !0, o$1(e$2, t$2, n$2)));
				};
				return Promise.all([e$1.or._iterate(r$1, t$1), Pt(kt(e$1, n$1, t$1), e$1.algorithm, r$1, !e$1.keysOnly && e$1.valueMapper)]);
			}
			return Pt(kt(e$1, n$1, t$1), it(e$1.algorithm, a$1), o$1, !e$1.keysOnly && e$1.valueMapper);
		}
		function Pt(e$1, r$1, i$1, o$1) {
			var a$1 = Ie(o$1 ? function(e$2, t$1, n$1) {
				return i$1(o$1(e$2), t$1, n$1);
			} : i$1);
			return e$1.then(function(n$1) {
				if (n$1) return n$1.start(function() {
					var t$1 = function() {
						return n$1.continue();
					};
					r$1 && !r$1(n$1, function(e$2) {
						return t$1 = e$2;
					}, function(e$2) {
						n$1.stop(e$2), t$1 = G;
					}, function(e$2) {
						n$1.fail(e$2), t$1 = G;
					}) || a$1(n$1.value, n$1, function(e$2) {
						return t$1 = e$2;
					}), t$1();
				});
			});
		}
		var Kt = (Et.prototype._read = function(e$1, t$1) {
			var n$1 = this._ctx;
			return n$1.error ? n$1.table._trans(null, Xe.bind(null, n$1.error)) : n$1.table._trans("readonly", e$1).then(t$1);
		}, Et.prototype._write = function(e$1) {
			var t$1 = this._ctx;
			return t$1.error ? t$1.table._trans(null, Xe.bind(null, t$1.error)) : t$1.table._trans("readwrite", e$1, "locked");
		}, Et.prototype._addAlgorithm = function(e$1) {
			var t$1 = this._ctx;
			t$1.algorithm = it(t$1.algorithm, e$1);
		}, Et.prototype._iterate = function(e$1, t$1) {
			return Ot(this._ctx, e$1, t$1, this._ctx.table.core);
		}, Et.prototype.clone = function(e$1) {
			var t$1 = Object.create(this.constructor.prototype), n$1 = Object.create(this._ctx);
			return e$1 && a(n$1, e$1), t$1._ctx = n$1, t$1;
		}, Et.prototype.raw = function() {
			return this._ctx.valueMapper = null, this;
		}, Et.prototype.each = function(t$1) {
			var n$1 = this._ctx;
			return this._read(function(e$1) {
				return Ot(n$1, t$1, e$1, n$1.table.core);
			});
		}, Et.prototype.count = function(e$1) {
			var i$1 = this;
			return this._read(function(e$2) {
				var t$1 = i$1._ctx, n$1 = t$1.table.core;
				if (gt(t$1, !0)) return n$1.count({
					trans: e$2,
					query: {
						index: xt(t$1, n$1.schema),
						range: t$1.range
					}
				}).then(function(e$3) {
					return Math.min(e$3, t$1.limit);
				});
				var r$1 = 0;
				return Ot(t$1, function() {
					return ++r$1, !1;
				}, e$2, n$1).then(function() {
					return r$1;
				});
			}).then(e$1);
		}, Et.prototype.sortBy = function(e$1, t$1) {
			var n$1 = e$1.split(".").reverse(), r$1 = n$1[0], i$1 = n$1.length - 1;
			function o$1(e$2, t$2) {
				return t$2 ? o$1(e$2[n$1[t$2]], t$2 - 1) : e$2[r$1];
			}
			var a$1 = "next" === this._ctx.dir ? 1 : -1;
			function u$1(e$2, t$2) {
				return st(o$1(e$2, i$1), o$1(t$2, i$1)) * a$1;
			}
			return this.toArray(function(e$2) {
				return e$2.sort(u$1);
			}).then(t$1);
		}, Et.prototype.toArray = function(e$1) {
			var o$1 = this;
			return this._read(function(e$2) {
				var t$1 = o$1._ctx;
				if ("next" === t$1.dir && gt(t$1, !0) && 0 < t$1.limit) {
					var n$1 = t$1.valueMapper, r$1 = xt(t$1, t$1.table.core.schema);
					return t$1.table.core.query({
						trans: e$2,
						limit: t$1.limit,
						values: !0,
						query: {
							index: r$1,
							range: t$1.range
						}
					}).then(function(e$3) {
						e$3 = e$3.result;
						return n$1 ? e$3.map(n$1) : e$3;
					});
				}
				var i$1 = [];
				return Ot(t$1, function(e$3) {
					return i$1.push(e$3);
				}, e$2, t$1.table.core).then(function() {
					return i$1;
				});
			}, e$1);
		}, Et.prototype.offset = function(t$1) {
			var e$1 = this._ctx;
			return t$1 <= 0 || (e$1.offset += t$1, gt(e$1) ? _t(e$1, function() {
				var n$1 = t$1;
				return function(e$2, t$2) {
					return 0 === n$1 || (1 === n$1 ? --n$1 : t$2(function() {
						e$2.advance(n$1), n$1 = 0;
					}), !1);
				};
			}) : _t(e$1, function() {
				var e$2 = t$1;
				return function() {
					return --e$2 < 0;
				};
			})), this;
		}, Et.prototype.limit = function(e$1) {
			return this._ctx.limit = Math.min(this._ctx.limit, e$1), _t(this._ctx, function() {
				var r$1 = e$1;
				return function(e$2, t$1, n$1) {
					return --r$1 <= 0 && t$1(n$1), 0 <= r$1;
				};
			}, !0), this;
		}, Et.prototype.until = function(r$1, i$1) {
			return wt(this._ctx, function(e$1, t$1, n$1) {
				return !r$1(e$1.value) || (t$1(n$1), i$1);
			}), this;
		}, Et.prototype.first = function(e$1) {
			return this.limit(1).toArray(function(e$2) {
				return e$2[0];
			}).then(e$1);
		}, Et.prototype.last = function(e$1) {
			return this.reverse().first(e$1);
		}, Et.prototype.filter = function(t$1) {
			var e$1;
			return wt(this._ctx, function(e$2) {
				return t$1(e$2.value);
			}), (e$1 = this._ctx).isMatch = it(e$1.isMatch, t$1), this;
		}, Et.prototype.and = function(e$1) {
			return this.filter(e$1);
		}, Et.prototype.or = function(e$1) {
			return new this.db.WhereClause(this._ctx.table, e$1, this);
		}, Et.prototype.reverse = function() {
			return this._ctx.dir = "prev" === this._ctx.dir ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
		}, Et.prototype.desc = function() {
			return this.reverse();
		}, Et.prototype.eachKey = function(n$1) {
			var e$1 = this._ctx;
			return e$1.keysOnly = !e$1.isMatch, this.each(function(e$2, t$1) {
				n$1(t$1.key, t$1);
			});
		}, Et.prototype.eachUniqueKey = function(e$1) {
			return this._ctx.unique = "unique", this.eachKey(e$1);
		}, Et.prototype.eachPrimaryKey = function(n$1) {
			var e$1 = this._ctx;
			return e$1.keysOnly = !e$1.isMatch, this.each(function(e$2, t$1) {
				n$1(t$1.primaryKey, t$1);
			});
		}, Et.prototype.keys = function(e$1) {
			var t$1 = this._ctx;
			t$1.keysOnly = !t$1.isMatch;
			var n$1 = [];
			return this.each(function(e$2, t$2) {
				n$1.push(t$2.key);
			}).then(function() {
				return n$1;
			}).then(e$1);
		}, Et.prototype.primaryKeys = function(e$1) {
			var n$1 = this._ctx;
			if ("next" === n$1.dir && gt(n$1, !0) && 0 < n$1.limit) return this._read(function(e$2) {
				var t$1 = xt(n$1, n$1.table.core.schema);
				return n$1.table.core.query({
					trans: e$2,
					values: !1,
					limit: n$1.limit,
					query: {
						index: t$1,
						range: n$1.range
					}
				});
			}).then(function(e$2) {
				return e$2.result;
			}).then(e$1);
			n$1.keysOnly = !n$1.isMatch;
			var r$1 = [];
			return this.each(function(e$2, t$1) {
				r$1.push(t$1.primaryKey);
			}).then(function() {
				return r$1;
			}).then(e$1);
		}, Et.prototype.uniqueKeys = function(e$1) {
			return this._ctx.unique = "unique", this.keys(e$1);
		}, Et.prototype.firstKey = function(e$1) {
			return this.limit(1).keys(function(e$2) {
				return e$2[0];
			}).then(e$1);
		}, Et.prototype.lastKey = function(e$1) {
			return this.reverse().firstKey(e$1);
		}, Et.prototype.distinct = function() {
			var e$1 = this._ctx, e$1 = e$1.index && e$1.table.schema.idxByName[e$1.index];
			if (!e$1 || !e$1.multi) return this;
			var n$1 = {};
			return wt(this._ctx, function(e$2) {
				var t$1 = e$2.primaryKey.toString(), e$2 = m(n$1, t$1);
				return n$1[t$1] = !0, !e$2;
			}), this;
		}, Et.prototype.modify = function(x$1) {
			var n$1 = this, k$1 = this._ctx;
			return this._write(function(p$1) {
				var y$1 = "function" == typeof x$1 ? x$1 : function(e$2) {
					return pt(e$2, x$1);
				}, v$1 = k$1.table.core, e$1 = v$1.schema.primaryKey, m$1 = e$1.outbound, b$1 = e$1.extractKey, g$1 = 200, e$1 = n$1.db._options.modifyChunkSize;
				e$1 && (g$1 = "object" == typeof e$1 ? e$1[v$1.name] || e$1["*"] || 200 : e$1);
				function w$1(e$2, t$2) {
					var n$2 = t$2.failures, t$2 = t$2.numFailures;
					u$1 += e$2 - t$2;
					for (var r$1 = 0, i$1 = O(n$2); r$1 < i$1.length; r$1++) {
						var o$1 = i$1[r$1];
						a$1.push(n$2[o$1]);
					}
				}
				var a$1 = [], u$1 = 0, t$1 = [], _$1 = x$1 === St;
				return n$1.clone().primaryKeys().then(function(f$1) {
					function h$1(s$1) {
						var c$1 = Math.min(g$1, f$1.length - s$1), l$1 = f$1.slice(s$1, s$1 + c$1);
						return (_$1 ? Promise.resolve([]) : v$1.getMany({
							trans: p$1,
							keys: l$1,
							cache: "immutable"
						})).then(function(e$2) {
							var n$2 = [], t$2 = [], r$1 = m$1 ? [] : null, i$1 = _$1 ? l$1 : [];
							if (!_$1) for (var o$1 = 0; o$1 < c$1; ++o$1) {
								var a$2 = e$2[o$1], u$2 = {
									value: S(a$2),
									primKey: f$1[s$1 + o$1]
								};
								!1 !== y$1.call(u$2, u$2.value, u$2) && (null == u$2.value ? i$1.push(f$1[s$1 + o$1]) : m$1 || 0 === st(b$1(a$2), b$1(u$2.value)) ? (t$2.push(u$2.value), m$1 && r$1.push(f$1[s$1 + o$1])) : (i$1.push(f$1[s$1 + o$1]), n$2.push(u$2.value)));
							}
							return Promise.resolve(0 < n$2.length && v$1.mutate({
								trans: p$1,
								type: "add",
								values: n$2
							}).then(function(e$3) {
								for (var t$3 in e$3.failures) i$1.splice(parseInt(t$3), 1);
								w$1(n$2.length, e$3);
							})).then(function() {
								return (0 < t$2.length || d$1 && "object" == typeof x$1) && v$1.mutate({
									trans: p$1,
									type: "put",
									keys: r$1,
									values: t$2,
									criteria: d$1,
									changeSpec: "function" != typeof x$1 && x$1,
									isAdditionalChunk: 0 < s$1
								}).then(function(e$3) {
									return w$1(t$2.length, e$3);
								});
							}).then(function() {
								return (0 < i$1.length || d$1 && _$1) && v$1.mutate({
									trans: p$1,
									type: "delete",
									keys: i$1,
									criteria: d$1,
									isAdditionalChunk: 0 < s$1
								}).then(function(e$3) {
									return ft(k$1.table, i$1, e$3);
								}).then(function(e$3) {
									return w$1(i$1.length, e$3);
								});
							}).then(function() {
								return f$1.length > s$1 + c$1 && h$1(s$1 + g$1);
							});
						});
					}
					var d$1 = gt(k$1) && k$1.limit === Infinity && ("function" != typeof x$1 || _$1) && {
						index: k$1.index,
						range: k$1.range
					};
					return h$1(0).then(function() {
						if (0 < a$1.length) throw new U("Error modifying one or more objects", a$1, u$1, t$1);
						return f$1.length;
					});
				});
			});
		}, Et.prototype.delete = function() {
			var i$1 = this._ctx, n$1 = i$1.range;
			return !gt(i$1) || i$1.table.schema.yProps || !i$1.isPrimKey && 3 !== n$1.type ? this.modify(St) : this._write(function(e$1) {
				var t$1 = i$1.table.core.schema.primaryKey, r$1 = n$1;
				return i$1.table.core.count({
					trans: e$1,
					query: {
						index: t$1,
						range: r$1
					}
				}).then(function(n$2) {
					return i$1.table.core.mutate({
						trans: e$1,
						type: "deleteRange",
						range: r$1
					}).then(function(e$2) {
						var t$2 = e$2.failures, e$2 = e$2.numFailures;
						if (e$2) throw new U("Could not delete some values", Object.keys(t$2).map(function(e$3) {
							return t$2[e$3];
						}), n$2 - e$2);
						return n$2 - e$2;
					});
				});
			});
		}, Et);
		function Et() {}
		var St = function(e$1, t$1) {
			return t$1.value = null;
		};
		function jt(e$1, t$1) {
			return e$1 < t$1 ? -1 : e$1 === t$1 ? 0 : 1;
		}
		function At(e$1, t$1) {
			return t$1 < e$1 ? -1 : e$1 === t$1 ? 0 : 1;
		}
		function Ct(e$1, t$1, n$1) {
			e$1 = e$1 instanceof Bt ? new e$1.Collection(e$1) : e$1;
			return e$1._ctx.error = new (n$1 || TypeError)(t$1), e$1;
		}
		function Tt(e$1) {
			return new e$1.Collection(e$1, function() {
				return Dt("");
			}).limit(0);
		}
		function It(e$1, s$1, n$1, r$1) {
			var i$1, c$1, l$1, f$1, h$1, d$1, p$1, y$1 = n$1.length;
			if (!n$1.every(function(e$2) {
				return "string" == typeof e$2;
			})) return Ct(e$1, Ze);
			function t$1(e$2) {
				i$1 = "next" === e$2 ? function(e$3) {
					return e$3.toUpperCase();
				} : function(e$3) {
					return e$3.toLowerCase();
				}, c$1 = "next" === e$2 ? function(e$3) {
					return e$3.toLowerCase();
				} : function(e$3) {
					return e$3.toUpperCase();
				}, l$1 = "next" === e$2 ? jt : At;
				var t$2 = n$1.map(function(e$3) {
					return {
						lower: c$1(e$3),
						upper: i$1(e$3)
					};
				}).sort(function(e$3, t$3) {
					return l$1(e$3.lower, t$3.lower);
				});
				f$1 = t$2.map(function(e$3) {
					return e$3.upper;
				}), h$1 = t$2.map(function(e$3) {
					return e$3.lower;
				}), p$1 = "next" === (d$1 = e$2) ? "" : r$1;
			}
			t$1("next");
			e$1 = new e$1.Collection(e$1, function() {
				return qt(f$1[0], h$1[y$1 - 1] + r$1);
			});
			e$1._ondirectionchange = function(e$2) {
				t$1(e$2);
			};
			var v$1 = 0;
			return e$1._addAlgorithm(function(e$2, t$2, n$2) {
				var r$2 = e$2.key;
				if ("string" != typeof r$2) return !1;
				var i$2 = c$1(r$2);
				if (s$1(i$2, h$1, v$1)) return !0;
				for (var o$1 = null, a$1 = v$1; a$1 < y$1; ++a$1) {
					var u$1 = function(e$3, t$3, n$3, r$3, i$3, o$2) {
						for (var a$2 = Math.min(e$3.length, r$3.length), u$2 = -1, s$2 = 0; s$2 < a$2; ++s$2) {
							var c$2 = t$3[s$2];
							if (c$2 !== r$3[s$2]) return i$3(e$3[s$2], n$3[s$2]) < 0 ? e$3.substr(0, s$2) + n$3[s$2] + n$3.substr(s$2 + 1) : i$3(e$3[s$2], r$3[s$2]) < 0 ? e$3.substr(0, s$2) + r$3[s$2] + n$3.substr(s$2 + 1) : 0 <= u$2 ? e$3.substr(0, u$2) + t$3[u$2] + n$3.substr(u$2 + 1) : null;
							i$3(e$3[s$2], c$2) < 0 && (u$2 = s$2);
						}
						return a$2 < r$3.length && "next" === o$2 ? e$3 + n$3.substr(e$3.length) : a$2 < e$3.length && "prev" === o$2 ? e$3.substr(0, n$3.length) : u$2 < 0 ? null : e$3.substr(0, u$2) + r$3[u$2] + n$3.substr(u$2 + 1);
					}(r$2, i$2, f$1[a$1], h$1[a$1], l$1, d$1);
					null === u$1 && null === o$1 ? v$1 = a$1 + 1 : (null === o$1 || 0 < l$1(o$1, u$1)) && (o$1 = u$1);
				}
				return t$2(null !== o$1 ? function() {
					e$2.continue(o$1 + p$1);
				} : n$2), !1;
			}), e$1;
		}
		function qt(e$1, t$1, n$1, r$1) {
			return {
				type: 2,
				lower: e$1,
				upper: t$1,
				lowerOpen: n$1,
				upperOpen: r$1
			};
		}
		function Dt(e$1) {
			return {
				type: 1,
				lower: e$1,
				upper: e$1
			};
		}
		var Bt = (Object.defineProperty(Rt.prototype, "Collection", {
			get: function() {
				return this._ctx.table.db.Collection;
			},
			enumerable: !1,
			configurable: !0
		}), Rt.prototype.between = function(e$1, t$1, n$1, r$1) {
			n$1 = !1 !== n$1, r$1 = !0 === r$1;
			try {
				return 0 < this._cmp(e$1, t$1) || 0 === this._cmp(e$1, t$1) && (n$1 || r$1) && (!n$1 || !r$1) ? Tt(this) : new this.Collection(this, function() {
					return qt(e$1, t$1, !n$1, !r$1);
				});
			} catch (e$2) {
				return Ct(this, Je);
			}
		}, Rt.prototype.equals = function(e$1) {
			return null == e$1 ? Ct(this, Je) : new this.Collection(this, function() {
				return Dt(e$1);
			});
		}, Rt.prototype.above = function(e$1) {
			return null == e$1 ? Ct(this, Je) : new this.Collection(this, function() {
				return qt(e$1, void 0, !0);
			});
		}, Rt.prototype.aboveOrEqual = function(e$1) {
			return null == e$1 ? Ct(this, Je) : new this.Collection(this, function() {
				return qt(e$1, void 0, !1);
			});
		}, Rt.prototype.below = function(e$1) {
			return null == e$1 ? Ct(this, Je) : new this.Collection(this, function() {
				return qt(void 0, e$1, !1, !0);
			});
		}, Rt.prototype.belowOrEqual = function(e$1) {
			return null == e$1 ? Ct(this, Je) : new this.Collection(this, function() {
				return qt(void 0, e$1);
			});
		}, Rt.prototype.startsWith = function(e$1) {
			return "string" != typeof e$1 ? Ct(this, Ze) : this.between(e$1, e$1 + He, !0, !0);
		}, Rt.prototype.startsWithIgnoreCase = function(e$1) {
			return "" === e$1 ? this.startsWith(e$1) : It(this, function(e$2, t$1) {
				return 0 === e$2.indexOf(t$1[0]);
			}, [e$1], He);
		}, Rt.prototype.equalsIgnoreCase = function(e$1) {
			return It(this, function(e$2, t$1) {
				return e$2 === t$1[0];
			}, [e$1], "");
		}, Rt.prototype.anyOfIgnoreCase = function() {
			var e$1 = D.apply(q, arguments);
			return 0 === e$1.length ? Tt(this) : It(this, function(e$2, t$1) {
				return -1 !== t$1.indexOf(e$2);
			}, e$1, "");
		}, Rt.prototype.startsWithAnyOfIgnoreCase = function() {
			var e$1 = D.apply(q, arguments);
			return 0 === e$1.length ? Tt(this) : It(this, function(t$1, e$2) {
				return e$2.some(function(e$3) {
					return 0 === t$1.indexOf(e$3);
				});
			}, e$1, He);
		}, Rt.prototype.anyOf = function() {
			var t$1 = this, i$1 = D.apply(q, arguments), o$1 = this._cmp;
			try {
				i$1.sort(o$1);
			} catch (e$2) {
				return Ct(this, Je);
			}
			if (0 === i$1.length) return Tt(this);
			var e$1 = new this.Collection(this, function() {
				return qt(i$1[0], i$1[i$1.length - 1]);
			});
			e$1._ondirectionchange = function(e$2) {
				o$1 = "next" === e$2 ? t$1._ascending : t$1._descending, i$1.sort(o$1);
			};
			var a$1 = 0;
			return e$1._addAlgorithm(function(e$2, t$2, n$1) {
				for (var r$1 = e$2.key; 0 < o$1(r$1, i$1[a$1]);) if (++a$1 === i$1.length) return t$2(n$1), !1;
				return 0 === o$1(r$1, i$1[a$1]) || (t$2(function() {
					e$2.continue(i$1[a$1]);
				}), !1);
			}), e$1;
		}, Rt.prototype.notEqual = function(e$1) {
			return this.inAnyRange([[-Infinity, e$1], [e$1, this.db._maxKey]], {
				includeLowers: !1,
				includeUppers: !1
			});
		}, Rt.prototype.noneOf = function() {
			var e$1 = D.apply(q, arguments);
			if (0 === e$1.length) return new this.Collection(this);
			try {
				e$1.sort(this._ascending);
			} catch (e$2) {
				return Ct(this, Je);
			}
			var t$1 = e$1.reduce(function(e$2, t$2) {
				return e$2 ? e$2.concat([[e$2[e$2.length - 1][1], t$2]]) : [[-Infinity, t$2]];
			}, null);
			return t$1.push([e$1[e$1.length - 1], this.db._maxKey]), this.inAnyRange(t$1, {
				includeLowers: !1,
				includeUppers: !1
			});
		}, Rt.prototype.inAnyRange = function(e$1, t$1) {
			var o$1 = this, a$1 = this._cmp, u$1 = this._ascending, n$1 = this._descending, s$1 = this._min, c$1 = this._max;
			if (0 === e$1.length) return Tt(this);
			if (!e$1.every(function(e$2) {
				return void 0 !== e$2[0] && void 0 !== e$2[1] && u$1(e$2[0], e$2[1]) <= 0;
			})) return Ct(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", Y.InvalidArgument);
			var r$1 = !t$1 || !1 !== t$1.includeLowers, i$1 = t$1 && !0 === t$1.includeUppers;
			var l$1, f$1 = u$1;
			function h$1(e$2, t$2) {
				return f$1(e$2[0], t$2[0]);
			}
			try {
				(l$1 = e$1.reduce(function(e$2, t$2) {
					for (var n$2 = 0, r$2 = e$2.length; n$2 < r$2; ++n$2) {
						var i$2 = e$2[n$2];
						if (a$1(t$2[0], i$2[1]) < 0 && 0 < a$1(t$2[1], i$2[0])) {
							i$2[0] = s$1(i$2[0], t$2[0]), i$2[1] = c$1(i$2[1], t$2[1]);
							break;
						}
					}
					return n$2 === r$2 && e$2.push(t$2), e$2;
				}, [])).sort(h$1);
			} catch (e$2) {
				return Ct(this, Je);
			}
			var d$1 = 0, p$1 = i$1 ? function(e$2) {
				return 0 < u$1(e$2, l$1[d$1][1]);
			} : function(e$2) {
				return 0 <= u$1(e$2, l$1[d$1][1]);
			}, y$1 = r$1 ? function(e$2) {
				return 0 < n$1(e$2, l$1[d$1][0]);
			} : function(e$2) {
				return 0 <= n$1(e$2, l$1[d$1][0]);
			};
			var v$1 = p$1, e$1 = new this.Collection(this, function() {
				return qt(l$1[0][0], l$1[l$1.length - 1][1], !r$1, !i$1);
			});
			return e$1._ondirectionchange = function(e$2) {
				f$1 = "next" === e$2 ? (v$1 = p$1, u$1) : (v$1 = y$1, n$1), l$1.sort(h$1);
			}, e$1._addAlgorithm(function(e$2, t$2, n$2) {
				for (var r$2, i$2 = e$2.key; v$1(i$2);) if (++d$1 === l$1.length) return t$2(n$2), !1;
				return !p$1(r$2 = i$2) && !y$1(r$2) || (0 === o$1._cmp(i$2, l$1[d$1][1]) || 0 === o$1._cmp(i$2, l$1[d$1][0]) || t$2(function() {
					f$1 === u$1 ? e$2.continue(l$1[d$1][0]) : e$2.continue(l$1[d$1][1]);
				}), !1);
			}), e$1;
		}, Rt.prototype.startsWithAnyOf = function() {
			var e$1 = D.apply(q, arguments);
			return e$1.every(function(e$2) {
				return "string" == typeof e$2;
			}) ? 0 === e$1.length ? Tt(this) : this.inAnyRange(e$1.map(function(e$2) {
				return [e$2, e$2 + He];
			})) : Ct(this, "startsWithAnyOf() only works with strings");
		}, Rt);
		function Rt() {}
		function Ft(t$1) {
			return Ie(function(e$1) {
				return Mt(e$1), t$1(e$1.target.error), !1;
			});
		}
		function Mt(e$1) {
			e$1.stopPropagation && e$1.stopPropagation(), e$1.preventDefault && e$1.preventDefault();
		}
		var Nt = "storagemutated", Lt = "x-storagemutated-1", Ut = mt(null, Nt), Vt = (zt.prototype._lock = function() {
			return y(!me.global), ++this._reculock, 1 !== this._reculock || me.global || (me.lockOwnerFor = this), this;
		}, zt.prototype._unlock = function() {
			if (y(!me.global), 0 == --this._reculock) for (me.global || (me.lockOwnerFor = null); 0 < this._blockedFuncs.length && !this._locked();) {
				var e$1 = this._blockedFuncs.shift();
				try {
					$e(e$1[1], e$1[0]);
				} catch (e$2) {}
			}
			return this;
		}, zt.prototype._locked = function() {
			return this._reculock && me.lockOwnerFor !== this;
		}, zt.prototype.create = function(t$1) {
			var n$1 = this;
			if (!this.mode) return this;
			var e$1 = this.db.idbdb, r$1 = this.db._state.dbOpenError;
			if (y(!this.idbtrans), !t$1 && !e$1) switch (r$1 && r$1.name) {
				case "DatabaseClosedError": throw new Y.DatabaseClosed(r$1);
				case "MissingAPIError": throw new Y.MissingAPI(r$1.message, r$1);
				default: throw new Y.OpenFailed(r$1);
			}
			if (!this.active) throw new Y.TransactionInactive();
			return y(null === this._completion._state), (t$1 = this.idbtrans = t$1 || (this.db.core || e$1).transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability })).onerror = Ie(function(e$2) {
				Mt(e$2), n$1._reject(t$1.error);
			}), t$1.onabort = Ie(function(e$2) {
				Mt(e$2), n$1.active && n$1._reject(new Y.Abort(t$1.error)), n$1.active = !1, n$1.on("abort").fire(e$2);
			}), t$1.oncomplete = Ie(function() {
				n$1.active = !1, n$1._resolve(), "mutatedParts" in t$1 && Ut.storagemutated.fire(t$1.mutatedParts);
			}), this;
		}, zt.prototype._promise = function(n$1, r$1, i$1) {
			var o$1 = this;
			if ("readwrite" === n$1 && "readwrite" !== this.mode) return Xe(new Y.ReadOnly("Transaction is readonly"));
			if (!this.active) return Xe(new Y.TransactionInactive());
			if (this._locked()) return new _e(function(e$2, t$1) {
				o$1._blockedFuncs.push([function() {
					o$1._promise(n$1, r$1, i$1).then(e$2, t$1);
				}, me]);
			});
			if (i$1) return Ne(function() {
				var e$2 = new _e(function(e$3, t$1) {
					o$1._lock();
					var n$2 = r$1(e$3, t$1, o$1);
					n$2 && n$2.then && n$2.then(e$3, t$1);
				});
				return e$2.finally(function() {
					return o$1._unlock();
				}), e$2._lib = !0, e$2;
			});
			var e$1 = new _e(function(e$2, t$1) {
				var n$2 = r$1(e$2, t$1, o$1);
				n$2 && n$2.then && n$2.then(e$2, t$1);
			});
			return e$1._lib = !0, e$1;
		}, zt.prototype._root = function() {
			return this.parent ? this.parent._root() : this;
		}, zt.prototype.waitFor = function(e$1) {
			var t$1, r$1 = this._root(), i$1 = _e.resolve(e$1);
			r$1._waitingFor ? r$1._waitingFor = r$1._waitingFor.then(function() {
				return i$1;
			}) : (r$1._waitingFor = i$1, r$1._waitingQueue = [], t$1 = r$1.idbtrans.objectStore(r$1.storeNames[0]), function e$2() {
				for (++r$1._spinCount; r$1._waitingQueue.length;) r$1._waitingQueue.shift()();
				r$1._waitingFor && (t$1.get(-Infinity).onsuccess = e$2);
			}());
			var o$1 = r$1._waitingFor;
			return new _e(function(t$2, n$1) {
				i$1.then(function(e$2) {
					return r$1._waitingQueue.push(Ie(t$2.bind(null, e$2)));
				}, function(e$2) {
					return r$1._waitingQueue.push(Ie(n$1.bind(null, e$2)));
				}).finally(function() {
					r$1._waitingFor === o$1 && (r$1._waitingFor = null);
				});
			});
		}, zt.prototype.abort = function() {
			this.active && (this.active = !1, this.idbtrans && this.idbtrans.abort(), this._reject(new Y.Abort()));
		}, zt.prototype.table = function(e$1) {
			var t$1 = this._memoizedTables || (this._memoizedTables = {});
			if (m(t$1, e$1)) return t$1[e$1];
			var n$1 = this.schema[e$1];
			if (!n$1) throw new Y.NotFound("Table " + e$1 + " not part of transaction");
			n$1 = new this.db.Table(e$1, n$1, this);
			return n$1.core = this.db.core.table(e$1), t$1[e$1] = n$1;
		}, zt);
		function zt() {}
		function Wt(e$1, t$1, n$1, r$1, i$1, o$1, a$1, u$1) {
			return {
				name: e$1,
				keyPath: t$1,
				unique: n$1,
				multi: r$1,
				auto: i$1,
				compound: o$1,
				src: (n$1 && !a$1 ? "&" : "") + (r$1 ? "*" : "") + (i$1 ? "++" : "") + Yt(t$1),
				type: u$1
			};
		}
		function Yt(e$1) {
			return "string" == typeof e$1 ? e$1 : e$1 ? "[" + [].join.call(e$1, "+") + "]" : "";
		}
		function $t(e$1, t$1, n$1) {
			return {
				name: e$1,
				primKey: t$1,
				indexes: n$1,
				mappedClass: null,
				idxByName: (r$1 = function(e$2) {
					return [e$2.name, e$2];
				}, n$1.reduce(function(e$2, t$2, n$2) {
					n$2 = r$1(t$2, n$2);
					return n$2 && (e$2[n$2[0]] = n$2[1]), e$2;
				}, {}))
			};
			var r$1;
		}
		var Qt = function(e$1) {
			try {
				return e$1.only([[]]), Qt = function() {
					return [[]];
				}, [[]];
			} catch (e$2) {
				return Qt = function() {
					return He;
				}, He;
			}
		};
		function Gt(t$1) {
			return null == t$1 ? function() {} : "string" == typeof t$1 ? 1 === (n$1 = t$1).split(".").length ? function(e$1) {
				return e$1[n$1];
			} : function(e$1) {
				return g(e$1, n$1);
			} : function(e$1) {
				return g(e$1, t$1);
			};
			var n$1;
		}
		function Xt(e$1) {
			return [].slice.call(e$1);
		}
		var Ht = 0;
		function Jt(e$1) {
			return null == e$1 ? ":id" : "string" == typeof e$1 ? e$1 : "[".concat(e$1.join("+"), "]");
		}
		function Zt(e$1, i$1, t$1) {
			function _$1(e$2) {
				if (3 === e$2.type) return null;
				if (4 === e$2.type) throw new Error("Cannot convert never type to IDBKeyRange");
				var t$2 = e$2.lower, n$2 = e$2.upper, r$2 = e$2.lowerOpen, e$2 = e$2.upperOpen;
				return void 0 === t$2 ? void 0 === n$2 ? null : i$1.upperBound(n$2, !!e$2) : void 0 === n$2 ? i$1.lowerBound(t$2, !!r$2) : i$1.bound(t$2, n$2, !!r$2, !!e$2);
			}
			function n$1(e$2) {
				var h$1, w$1 = e$2.name;
				return {
					name: w$1,
					schema: e$2,
					mutate: function(e$3) {
						var y$1 = e$3.trans, v$1 = e$3.type, m$1 = e$3.keys, b$1 = e$3.values, g$1 = e$3.range;
						return new Promise(function(t$2, e$4) {
							t$2 = Ie(t$2);
							var n$2 = y$1.objectStore(w$1), r$2 = null == n$2.keyPath, i$2 = "put" === v$1 || "add" === v$1;
							if (!i$2 && "delete" !== v$1 && "deleteRange" !== v$1) throw new Error("Invalid operation type: " + v$1);
							var o$2, a$2 = (m$1 || b$1 || { length: 1 }).length;
							if (m$1 && b$1 && m$1.length !== b$1.length) throw new Error("Given keys array must have same length as given values array.");
							if (0 === a$2) return t$2({
								numFailures: 0,
								failures: {},
								results: [],
								lastResult: void 0
							});
							function u$2(e$5) {
								++l$1, Mt(e$5);
							}
							var s$2 = [], c$2 = [], l$1 = 0;
							if ("deleteRange" === v$1) {
								if (4 === g$1.type) return t$2({
									numFailures: l$1,
									failures: c$2,
									results: [],
									lastResult: void 0
								});
								3 === g$1.type ? s$2.push(o$2 = n$2.clear()) : s$2.push(o$2 = n$2.delete(_$1(g$1)));
							} else {
								var r$2 = i$2 ? r$2 ? [b$1, m$1] : [b$1, null] : [m$1, null], f$1 = r$2[0], h$2 = r$2[1];
								if (i$2) for (var d$1 = 0; d$1 < a$2; ++d$1) s$2.push(o$2 = h$2 && void 0 !== h$2[d$1] ? n$2[v$1](f$1[d$1], h$2[d$1]) : n$2[v$1](f$1[d$1])), o$2.onerror = u$2;
								else for (d$1 = 0; d$1 < a$2; ++d$1) s$2.push(o$2 = n$2[v$1](f$1[d$1])), o$2.onerror = u$2;
							}
							function p$1(e$5) {
								e$5 = e$5.target.result, s$2.forEach(function(e$6, t$3) {
									return null != e$6.error && (c$2[t$3] = e$6.error);
								}), t$2({
									numFailures: l$1,
									failures: c$2,
									results: "delete" === v$1 ? m$1 : s$2.map(function(e$6) {
										return e$6.result;
									}),
									lastResult: e$5
								});
							}
							o$2.onerror = function(e$5) {
								u$2(e$5), p$1(e$5);
							}, o$2.onsuccess = p$1;
						});
					},
					getMany: function(e$3) {
						var f$1 = e$3.trans, h$2 = e$3.keys;
						return new Promise(function(t$2, e$4) {
							t$2 = Ie(t$2);
							for (var n$2, r$2 = f$1.objectStore(w$1), i$2 = h$2.length, o$2 = new Array(i$2), a$2 = 0, u$2 = 0, s$2 = function(e$5) {
								e$5 = e$5.target;
								o$2[e$5._pos] = e$5.result, ++u$2 === a$2 && t$2(o$2);
							}, c$2 = Ft(e$4), l$1 = 0; l$1 < i$2; ++l$1) null != h$2[l$1] && ((n$2 = r$2.get(h$2[l$1]))._pos = l$1, n$2.onsuccess = s$2, n$2.onerror = c$2, ++a$2);
							0 === a$2 && t$2(o$2);
						});
					},
					get: function(e$3) {
						var r$2 = e$3.trans, i$2 = e$3.key;
						return new Promise(function(t$2, e$4) {
							t$2 = Ie(t$2);
							var n$2 = r$2.objectStore(w$1).get(i$2);
							n$2.onsuccess = function(e$5) {
								return t$2(e$5.target.result);
							}, n$2.onerror = Ft(e$4);
						});
					},
					query: (h$1 = s$1, function(f$1) {
						return new Promise(function(n$2, e$3) {
							n$2 = Ie(n$2);
							var r$2, i$2, o$2, t$2 = f$1.trans, a$2 = f$1.values, u$2 = f$1.limit, s$2 = f$1.query, c$2 = u$2 === Infinity ? void 0 : u$2, l$1 = s$2.index, s$2 = s$2.range, t$2 = t$2.objectStore(w$1), l$1 = l$1.isPrimaryKey ? t$2 : t$2.index(l$1.name), s$2 = _$1(s$2);
							if (0 === u$2) return n$2({ result: [] });
							h$1 ? ((c$2 = a$2 ? l$1.getAll(s$2, c$2) : l$1.getAllKeys(s$2, c$2)).onsuccess = function(e$4) {
								return n$2({ result: e$4.target.result });
							}, c$2.onerror = Ft(e$3)) : (r$2 = 0, i$2 = !a$2 && "openKeyCursor" in l$1 ? l$1.openKeyCursor(s$2) : l$1.openCursor(s$2), o$2 = [], i$2.onsuccess = function(e$4) {
								var t$3 = i$2.result;
								return t$3 ? (o$2.push(a$2 ? t$3.value : t$3.primaryKey), ++r$2 === u$2 ? n$2({ result: o$2 }) : void t$3.continue()) : n$2({ result: o$2 });
							}, i$2.onerror = Ft(e$3));
						});
					}),
					openCursor: function(e$3) {
						var c$2 = e$3.trans, o$2 = e$3.values, a$2 = e$3.query, u$2 = e$3.reverse, l$1 = e$3.unique;
						return new Promise(function(t$2, n$2) {
							t$2 = Ie(t$2);
							var e$4 = a$2.index, r$2 = a$2.range, i$2 = c$2.objectStore(w$1), i$2 = e$4.isPrimaryKey ? i$2 : i$2.index(e$4.name), e$4 = u$2 ? l$1 ? "prevunique" : "prev" : l$1 ? "nextunique" : "next", s$2 = !o$2 && "openKeyCursor" in i$2 ? i$2.openKeyCursor(_$1(r$2), e$4) : i$2.openCursor(_$1(r$2), e$4);
							s$2.onerror = Ft(n$2), s$2.onsuccess = Ie(function(e$5) {
								var r$3, i$3, o$3, a$3, u$3 = s$2.result;
								u$3 ? (u$3.___id = ++Ht, u$3.done = !1, r$3 = u$3.continue.bind(u$3), i$3 = (i$3 = u$3.continuePrimaryKey) && i$3.bind(u$3), o$3 = u$3.advance.bind(u$3), a$3 = function() {
									throw new Error("Cursor not stopped");
								}, u$3.trans = c$2, u$3.stop = u$3.continue = u$3.continuePrimaryKey = u$3.advance = function() {
									throw new Error("Cursor not started");
								}, u$3.fail = Ie(n$2), u$3.next = function() {
									var e$6 = this, t$3 = 1;
									return this.start(function() {
										return t$3-- ? e$6.continue() : e$6.stop();
									}).then(function() {
										return e$6;
									});
								}, u$3.start = function(e$6) {
									function t$3() {
										if (s$2.result) try {
											e$6();
										} catch (e$7) {
											u$3.fail(e$7);
										}
										else u$3.done = !0, u$3.start = function() {
											throw new Error("Cursor behind last entry");
										}, u$3.stop();
									}
									var n$3 = new Promise(function(t$4, e$7) {
										t$4 = Ie(t$4), s$2.onerror = Ft(e$7), u$3.fail = e$7, u$3.stop = function(e$8) {
											u$3.stop = u$3.continue = u$3.continuePrimaryKey = u$3.advance = a$3, t$4(e$8);
										};
									});
									return s$2.onsuccess = Ie(function(e$7) {
										s$2.onsuccess = t$3, t$3();
									}), u$3.continue = r$3, u$3.continuePrimaryKey = i$3, u$3.advance = o$3, t$3(), n$3;
								}, t$2(u$3)) : t$2(null);
							}, n$2);
						});
					},
					count: function(e$3) {
						var t$2 = e$3.query, i$2 = e$3.trans, o$2 = t$2.index, a$2 = t$2.range;
						return new Promise(function(t$3, e$4) {
							var n$2 = i$2.objectStore(w$1), r$2 = o$2.isPrimaryKey ? n$2 : n$2.index(o$2.name), n$2 = _$1(a$2), r$2 = n$2 ? r$2.count(n$2) : r$2.count();
							r$2.onsuccess = Ie(function(e$5) {
								return t$3(e$5.target.result);
							}), r$2.onerror = Ft(e$4);
						});
					}
				};
			}
			var r$1, o$1, a$1, u$1 = (o$1 = t$1, a$1 = Xt((r$1 = e$1).objectStoreNames), {
				schema: {
					name: r$1.name,
					tables: a$1.map(function(e$2) {
						return o$1.objectStore(e$2);
					}).map(function(t$2) {
						var e$2 = t$2.keyPath, n$2 = t$2.autoIncrement, r$2 = x(e$2), i$2 = {}, n$2 = {
							name: t$2.name,
							primaryKey: {
								name: null,
								isPrimaryKey: !0,
								outbound: null == e$2,
								compound: r$2,
								keyPath: e$2,
								autoIncrement: n$2,
								unique: !0,
								extractKey: Gt(e$2)
							},
							indexes: Xt(t$2.indexNames).map(function(e$3) {
								return t$2.index(e$3);
							}).map(function(e$3) {
								var t$3 = e$3.name, n$3 = e$3.unique, r$3 = e$3.multiEntry, e$3 = e$3.keyPath, r$3 = {
									name: t$3,
									compound: x(e$3),
									keyPath: e$3,
									unique: n$3,
									multiEntry: r$3,
									extractKey: Gt(e$3)
								};
								return i$2[Jt(e$3)] = r$3;
							}),
							getIndexByKeyPath: function(e$3) {
								return i$2[Jt(e$3)];
							}
						};
						return i$2[":id"] = n$2.primaryKey, null != e$2 && (i$2[Jt(e$2)] = n$2.primaryKey), n$2;
					})
				},
				hasGetAll: 0 < a$1.length && "getAll" in o$1.objectStore(a$1[0]) && !("undefined" != typeof navigator && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
			}), t$1 = u$1.schema, s$1 = u$1.hasGetAll, u$1 = t$1.tables.map(n$1), c$1 = {};
			return u$1.forEach(function(e$2) {
				return c$1[e$2.name] = e$2;
			}), {
				stack: "dbcore",
				transaction: e$1.transaction.bind(e$1),
				table: function(e$2) {
					if (!c$1[e$2]) throw new Error("Table '".concat(e$2, "' not found"));
					return c$1[e$2];
				},
				MIN_KEY: -Infinity,
				MAX_KEY: Qt(i$1),
				schema: t$1
			};
		}
		function en(e$1, t$1, n$1, r$1) {
			var i$1 = n$1.IDBKeyRange;
			return n$1.indexedDB, { dbcore: (r$1 = Zt(t$1, i$1, r$1), e$1.dbcore.reduce(function(e$2, t$2) {
				t$2 = t$2.create;
				return _(_({}, e$2), t$2(e$2));
			}, r$1)) };
		}
		function tn(n$1, e$1) {
			var t$1 = e$1.db, e$1 = en(n$1._middlewares, t$1, n$1._deps, e$1);
			n$1.core = e$1.dbcore, n$1.tables.forEach(function(e$2) {
				var t$2 = e$2.name;
				n$1.core.schema.tables.some(function(e$3) {
					return e$3.name === t$2;
				}) && (e$2.core = n$1.core.table(t$2), n$1[t$2] instanceof n$1.Table && (n$1[t$2].core = e$2.core));
			});
		}
		function nn(i$1, e$1, t$1, o$1) {
			t$1.forEach(function(n$1) {
				var r$1 = o$1[n$1];
				e$1.forEach(function(e$2) {
					var t$2 = function e$3(t$3, n$2) {
						return h(t$3, n$2) || (t$3 = c(t$3)) && e$3(t$3, n$2);
					}(e$2, n$1);
					(!t$2 || "value" in t$2 && void 0 === t$2.value) && (e$2 === i$1.Transaction.prototype || e$2 instanceof i$1.Transaction ? l(e$2, n$1, {
						get: function() {
							return this.table(n$1);
						},
						set: function(e$3) {
							u(this, n$1, {
								value: e$3,
								writable: !0,
								configurable: !0,
								enumerable: !0
							});
						}
					}) : e$2[n$1] = new i$1.Table(n$1, r$1));
				});
			});
		}
		function rn(n$1, e$1) {
			e$1.forEach(function(e$2) {
				for (var t$1 in e$2) e$2[t$1] instanceof n$1.Table && delete e$2[t$1];
			});
		}
		function on(e$1, t$1) {
			return e$1._cfg.version - t$1._cfg.version;
		}
		function an(n$1, r$1, i$1, e$1) {
			var o$1 = n$1._dbSchema;
			i$1.objectStoreNames.contains("$meta") && !o$1.$meta && (o$1.$meta = $t("$meta", pn("")[0], []), n$1._storeNames.push("$meta"));
			var a$1 = n$1._createTransaction("readwrite", n$1._storeNames, o$1);
			a$1.create(i$1), a$1._completion.catch(e$1);
			var u$1 = a$1._reject.bind(a$1), s$1 = me.transless || me;
			Ne(function() {
				return me.trans = a$1, me.transless = s$1, 0 !== r$1 ? (tn(n$1, i$1), t$1 = r$1, ((e$2 = a$1).storeNames.includes("$meta") ? e$2.table("$meta").get("version").then(function(e$3) {
					return null != e$3 ? e$3 : t$1;
				}) : _e.resolve(t$1)).then(function(e$3) {
					return c$1 = e$3, l$1 = a$1, f$1 = i$1, t$2 = [], e$3 = (s$2 = n$1)._versions, h$1 = s$2._dbSchema = hn(0, s$2.idbdb, f$1), 0 !== (e$3 = e$3.filter(function(e$4) {
						return e$4._cfg.version >= c$1;
					})).length ? (e$3.forEach(function(u$2) {
						t$2.push(function() {
							var t$3 = h$1, e$4 = u$2._cfg.dbschema;
							dn(s$2, t$3, f$1), dn(s$2, e$4, f$1), h$1 = s$2._dbSchema = e$4;
							var n$2 = sn(t$3, e$4);
							n$2.add.forEach(function(e$5) {
								cn(f$1, e$5[0], e$5[1].primKey, e$5[1].indexes);
							}), n$2.change.forEach(function(e$5) {
								if (e$5.recreate) throw new Y.Upgrade("Not yet support for changing primary key");
								var t$4 = f$1.objectStore(e$5.name);
								e$5.add.forEach(function(e$6) {
									return fn(t$4, e$6);
								}), e$5.change.forEach(function(e$6) {
									t$4.deleteIndex(e$6.name), fn(t$4, e$6);
								}), e$5.del.forEach(function(e$6) {
									return t$4.deleteIndex(e$6);
								});
							});
							var r$2 = u$2._cfg.contentUpgrade;
							if (r$2 && u$2._cfg.version > c$1) {
								tn(s$2, f$1), l$1._memoizedTables = {};
								var i$2 = k(e$4);
								n$2.del.forEach(function(e$5) {
									i$2[e$5] = t$3[e$5];
								}), rn(s$2, [s$2.Transaction.prototype]), nn(s$2, [s$2.Transaction.prototype], O(i$2), i$2), l$1.schema = i$2;
								var o$2, a$2 = B(r$2);
								a$2 && Le();
								n$2 = _e.follow(function() {
									var e$5;
									(o$2 = r$2(l$1)) && a$2 && (e$5 = Ue.bind(null, null), o$2.then(e$5, e$5));
								});
								return o$2 && "function" == typeof o$2.then ? _e.resolve(o$2) : n$2.then(function() {
									return o$2;
								});
							}
						}), t$2.push(function(e$4) {
							var t$3 = u$2._cfg.dbschema, n$2 = e$4;
							[].slice.call(n$2.db.objectStoreNames).forEach(function(e$5) {
								return null == t$3[e$5] && n$2.db.deleteObjectStore(e$5);
							}), rn(s$2, [s$2.Transaction.prototype]), nn(s$2, [s$2.Transaction.prototype], s$2._storeNames, s$2._dbSchema), l$1.schema = s$2._dbSchema;
						}), t$2.push(function(e$4) {
							s$2.idbdb.objectStoreNames.contains("$meta") && (Math.ceil(s$2.idbdb.version / 10) === u$2._cfg.version ? (s$2.idbdb.deleteObjectStore("$meta"), delete s$2._dbSchema.$meta, s$2._storeNames = s$2._storeNames.filter(function(e$5) {
								return "$meta" !== e$5;
							})) : e$4.objectStore("$meta").put(u$2._cfg.version, "version"));
						});
					}), function e$4() {
						return t$2.length ? _e.resolve(t$2.shift()(l$1.idbtrans)).then(e$4) : _e.resolve();
					}().then(function() {
						ln(h$1, f$1);
					})) : _e.resolve();
					var s$2, c$1, l$1, f$1, t$2, h$1;
				}).catch(u$1)) : (O(o$1).forEach(function(e$3) {
					cn(i$1, e$3, o$1[e$3].primKey, o$1[e$3].indexes);
				}), tn(n$1, i$1), void _e.follow(function() {
					return n$1.on.populate.fire(a$1);
				}).catch(u$1));
				var e$2, t$1;
			});
		}
		function un(e$1, r$1) {
			ln(e$1._dbSchema, r$1), r$1.db.version % 10 != 0 || r$1.objectStoreNames.contains("$meta") || r$1.db.createObjectStore("$meta").add(Math.ceil(r$1.db.version / 10 - 1), "version");
			var t$1 = hn(0, e$1.idbdb, r$1);
			dn(e$1, e$1._dbSchema, r$1);
			for (var n$1 = 0, i$1 = sn(t$1, e$1._dbSchema).change; n$1 < i$1.length; n$1++) {
				var o$1 = function(t$2) {
					if (t$2.change.length || t$2.recreate) return console.warn("Unable to patch indexes of table ".concat(t$2.name, " because it has changes on the type of index or primary key.")), { value: void 0 };
					var n$2 = r$1.objectStore(t$2.name);
					t$2.add.forEach(function(e$2) {
						ie && console.debug("Dexie upgrade patch: Creating missing index ".concat(t$2.name, ".").concat(e$2.src)), fn(n$2, e$2);
					});
				}(i$1[n$1]);
				if ("object" == typeof o$1) return o$1.value;
			}
		}
		function sn(e$1, t$1) {
			var n$1, r$1 = {
				del: [],
				add: [],
				change: []
			};
			for (n$1 in e$1) t$1[n$1] || r$1.del.push(n$1);
			for (n$1 in t$1) {
				var i$1 = e$1[n$1], o$1 = t$1[n$1];
				if (i$1) {
					var a$1 = {
						name: n$1,
						def: o$1,
						recreate: !1,
						del: [],
						add: [],
						change: []
					};
					if ("" + (i$1.primKey.keyPath || "") != "" + (o$1.primKey.keyPath || "") || i$1.primKey.auto !== o$1.primKey.auto) a$1.recreate = !0, r$1.change.push(a$1);
					else {
						var u$1 = i$1.idxByName, s$1 = o$1.idxByName, c$1 = void 0;
						for (c$1 in u$1) s$1[c$1] || a$1.del.push(c$1);
						for (c$1 in s$1) {
							var l$1 = u$1[c$1], f$1 = s$1[c$1];
							l$1 ? l$1.src !== f$1.src && a$1.change.push(f$1) : a$1.add.push(f$1);
						}
						(0 < a$1.del.length || 0 < a$1.add.length || 0 < a$1.change.length) && r$1.change.push(a$1);
					}
				} else r$1.add.push([n$1, o$1]);
			}
			return r$1;
		}
		function cn(e$1, t$1, n$1, r$1) {
			var i$1 = e$1.db.createObjectStore(t$1, n$1.keyPath ? {
				keyPath: n$1.keyPath,
				autoIncrement: n$1.auto
			} : { autoIncrement: n$1.auto });
			return r$1.forEach(function(e$2) {
				return fn(i$1, e$2);
			}), i$1;
		}
		function ln(t$1, n$1) {
			O(t$1).forEach(function(e$1) {
				n$1.db.objectStoreNames.contains(e$1) || (ie && console.debug("Dexie: Creating missing table", e$1), cn(n$1, e$1, t$1[e$1].primKey, t$1[e$1].indexes));
			});
		}
		function fn(e$1, t$1) {
			e$1.createIndex(t$1.name, t$1.keyPath, {
				unique: t$1.unique,
				multiEntry: t$1.multi
			});
		}
		function hn(e$1, t$1, u$1) {
			var s$1 = {};
			return b(t$1.objectStoreNames, 0).forEach(function(e$2) {
				for (var t$2 = u$1.objectStore(e$2), n$1 = Wt(Yt(a$1 = t$2.keyPath), a$1 || "", !0, !1, !!t$2.autoIncrement, a$1 && "string" != typeof a$1, !0), r$1 = [], i$1 = 0; i$1 < t$2.indexNames.length; ++i$1) {
					var o$1 = t$2.index(t$2.indexNames[i$1]), a$1 = o$1.keyPath, o$1 = Wt(o$1.name, a$1, !!o$1.unique, !!o$1.multiEntry, !1, a$1 && "string" != typeof a$1, !1);
					r$1.push(o$1);
				}
				s$1[e$2] = $t(e$2, n$1, r$1);
			}), s$1;
		}
		function dn(e$1, t$1, n$1) {
			for (var r$1 = n$1.db.objectStoreNames, i$1 = 0; i$1 < r$1.length; ++i$1) {
				var o$1 = r$1[i$1], a$1 = n$1.objectStore(o$1);
				e$1._hasGetAll = "getAll" in a$1;
				for (var u$1 = 0; u$1 < a$1.indexNames.length; ++u$1) {
					var s$1 = a$1.indexNames[u$1], c$1 = a$1.index(s$1).keyPath, l$1 = "string" == typeof c$1 ? c$1 : "[" + b(c$1).join("+") + "]";
					!t$1[o$1] || (c$1 = t$1[o$1].idxByName[l$1]) && (c$1.name = s$1, delete t$1[o$1].idxByName[l$1], t$1[o$1].idxByName[s$1] = c$1);
				}
			}
			"undefined" != typeof navigator && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && f.WorkerGlobalScope && f instanceof f.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (e$1._hasGetAll = !1);
		}
		function pn(e$1) {
			return e$1.split(",").map(function(e$2, t$1) {
				var n$1 = e$2.split(":"), r$1 = null === (i$1 = n$1[1]) || void 0 === i$1 ? void 0 : i$1.trim(), i$1 = (e$2 = n$1[0].trim()).replace(/([&*]|\+\+)/g, ""), n$1 = /^\[/.test(i$1) ? i$1.match(/^\[(.*)\]$/)[1].split("+") : i$1;
				return Wt(i$1, n$1 || null, /\&/.test(e$2), /\*/.test(e$2), /\+\+/.test(e$2), x(n$1), 0 === t$1, r$1);
			});
		}
		var yn = (vn.prototype._createTableSchema = $t, vn.prototype._parseIndexSyntax = pn, vn.prototype._parseStoresSpec = function(r$1, i$1) {
			var o$1 = this;
			O(r$1).forEach(function(e$1) {
				if (null !== r$1[e$1]) {
					var t$1 = o$1._parseIndexSyntax(r$1[e$1]), n$1 = t$1.shift();
					if (!n$1) throw new Y.Schema("Invalid schema for table " + e$1 + ": " + r$1[e$1]);
					if (n$1.unique = !0, n$1.multi) throw new Y.Schema("Primary key cannot be multiEntry*");
					t$1.forEach(function(e$2) {
						if (e$2.auto) throw new Y.Schema("Only primary key can be marked as autoIncrement (++)");
						if (!e$2.keyPath) throw new Y.Schema("Index must have a name and cannot be an empty string");
					});
					t$1 = o$1._createTableSchema(e$1, n$1, t$1);
					i$1[e$1] = t$1;
				}
			});
		}, vn.prototype.stores = function(e$1) {
			var t$1 = this.db;
			this._cfg.storesSource = this._cfg.storesSource ? a(this._cfg.storesSource, e$1) : e$1;
			var e$1 = t$1._versions, n$1 = {}, r$1 = {};
			return e$1.forEach(function(e$2) {
				a(n$1, e$2._cfg.storesSource), r$1 = e$2._cfg.dbschema = {}, e$2._parseStoresSpec(n$1, r$1);
			}), t$1._dbSchema = r$1, rn(t$1, [
				t$1._allTables,
				t$1,
				t$1.Transaction.prototype
			]), nn(t$1, [
				t$1._allTables,
				t$1,
				t$1.Transaction.prototype,
				this._cfg.tables
			], O(r$1), r$1), t$1._storeNames = O(r$1), this;
		}, vn.prototype.upgrade = function(e$1) {
			return this._cfg.contentUpgrade = re(this._cfg.contentUpgrade || G, e$1), this;
		}, vn);
		function vn() {}
		function mn(e$1, t$1) {
			var n$1 = e$1._dbNamesDB;
			return n$1 || (n$1 = e$1._dbNamesDB = new nr(tt, {
				addons: [],
				indexedDB: e$1,
				IDBKeyRange: t$1
			})).version(1).stores({ dbnames: "name" }), n$1.table("dbnames");
		}
		function bn(e$1) {
			return e$1 && "function" == typeof e$1.databases;
		}
		function gn(e$1) {
			return Ne(function() {
				return me.letThrough = !0, e$1();
			});
		}
		function wn(e$1) {
			return !("from" in e$1);
		}
		var _n = function(e$1, t$1) {
			if (!this) {
				var n$1 = new _n();
				return e$1 && "d" in e$1 && a(n$1, e$1), n$1;
			}
			a(this, arguments.length ? {
				d: 1,
				from: e$1,
				to: 1 < arguments.length ? t$1 : e$1
			} : { d: 0 });
		};
		function xn(e$1, t$1, n$1) {
			var r$1 = st(t$1, n$1);
			if (!isNaN(r$1)) {
				if (0 < r$1) throw RangeError();
				if (wn(e$1)) return a(e$1, {
					from: t$1,
					to: n$1,
					d: 1
				});
				var i$1 = e$1.l, r$1 = e$1.r;
				if (st(n$1, e$1.from) < 0) return i$1 ? xn(i$1, t$1, n$1) : e$1.l = {
					from: t$1,
					to: n$1,
					d: 1,
					l: null,
					r: null
				}, Kn(e$1);
				if (0 < st(t$1, e$1.to)) return r$1 ? xn(r$1, t$1, n$1) : e$1.r = {
					from: t$1,
					to: n$1,
					d: 1,
					l: null,
					r: null
				}, Kn(e$1);
				st(t$1, e$1.from) < 0 && (e$1.from = t$1, e$1.l = null, e$1.d = r$1 ? r$1.d + 1 : 1), 0 < st(n$1, e$1.to) && (e$1.to = n$1, e$1.r = null, e$1.d = e$1.l ? e$1.l.d + 1 : 1);
				n$1 = !e$1.r;
				i$1 && !e$1.l && kn(e$1, i$1), r$1 && n$1 && kn(e$1, r$1);
			}
		}
		function kn(e$1, t$1) {
			wn(t$1) || function e$2(t$2, n$1) {
				var r$1 = n$1.from, i$1 = n$1.to, o$1 = n$1.l, n$1 = n$1.r;
				xn(t$2, r$1, i$1), o$1 && e$2(t$2, o$1), n$1 && e$2(t$2, n$1);
			}(e$1, t$1);
		}
		function On(e$1, t$1) {
			var n$1 = Pn(t$1), r$1 = n$1.next();
			if (r$1.done) return !1;
			for (var i$1 = r$1.value, o$1 = Pn(e$1), a$1 = o$1.next(i$1.from), u$1 = a$1.value; !r$1.done && !a$1.done;) {
				if (st(u$1.from, i$1.to) <= 0 && 0 <= st(u$1.to, i$1.from)) return !0;
				st(i$1.from, u$1.from) < 0 ? i$1 = (r$1 = n$1.next(u$1.from)).value : u$1 = (a$1 = o$1.next(i$1.from)).value;
			}
			return !1;
		}
		function Pn(e$1) {
			var n$1 = wn(e$1) ? null : {
				s: 0,
				n: e$1
			};
			return { next: function(e$2) {
				for (var t$1 = 0 < arguments.length; n$1;) switch (n$1.s) {
					case 0: if (n$1.s = 1, t$1) for (; n$1.n.l && st(e$2, n$1.n.from) < 0;) n$1 = {
						up: n$1,
						n: n$1.n.l,
						s: 1
					};
					else for (; n$1.n.l;) n$1 = {
						up: n$1,
						n: n$1.n.l,
						s: 1
					};
					case 1: if (n$1.s = 2, !t$1 || st(e$2, n$1.n.to) <= 0) return {
						value: n$1.n,
						done: !1
					};
					case 2: if (n$1.n.r) {
						n$1.s = 3, n$1 = {
							up: n$1,
							n: n$1.n.r,
							s: 0
						};
						continue;
					}
					case 3: n$1 = n$1.up;
				}
				return { done: !0 };
			} };
		}
		function Kn(e$1) {
			var t$1, n$1, r$1 = ((null === (t$1 = e$1.r) || void 0 === t$1 ? void 0 : t$1.d) || 0) - ((null === (n$1 = e$1.l) || void 0 === n$1 ? void 0 : n$1.d) || 0), i$1 = 1 < r$1 ? "r" : r$1 < -1 ? "l" : "";
			i$1 && (t$1 = "r" == i$1 ? "l" : "r", n$1 = _({}, e$1), r$1 = e$1[i$1], e$1.from = r$1.from, e$1.to = r$1.to, e$1[i$1] = r$1[i$1], n$1[i$1] = r$1[t$1], (e$1[t$1] = n$1).d = En(n$1)), e$1.d = En(e$1);
		}
		function En(e$1) {
			var t$1 = e$1.r, e$1 = e$1.l;
			return (t$1 ? e$1 ? Math.max(t$1.d, e$1.d) : t$1.d : e$1 ? e$1.d : 0) + 1;
		}
		function Sn(t$1, n$1) {
			return O(n$1).forEach(function(e$1) {
				t$1[e$1] ? kn(t$1[e$1], n$1[e$1]) : t$1[e$1] = function e$2(t$2) {
					var n$2, r$1, i$1 = {};
					for (n$2 in t$2) m(t$2, n$2) && (r$1 = t$2[n$2], i$1[n$2] = !r$1 || "object" != typeof r$1 || K.has(r$1.constructor) ? r$1 : e$2(r$1));
					return i$1;
				}(n$1[e$1]);
			}), t$1;
		}
		function jn(t$1, n$1) {
			return t$1.all || n$1.all || Object.keys(t$1).some(function(e$1) {
				return n$1[e$1] && On(n$1[e$1], t$1[e$1]);
			});
		}
		r(_n.prototype, ((F = {
			add: function(e$1) {
				return kn(this, e$1), this;
			},
			addKey: function(e$1) {
				return xn(this, e$1, e$1), this;
			},
			addKeys: function(e$1) {
				var t$1 = this;
				return e$1.forEach(function(e$2) {
					return xn(t$1, e$2, e$2);
				}), this;
			},
			hasKey: function(e$1) {
				var t$1 = Pn(this).next(e$1).value;
				return t$1 && st(t$1.from, e$1) <= 0 && 0 <= st(t$1.to, e$1);
			}
		})[C] = function() {
			return Pn(this);
		}, F));
		var An = {}, Cn = {}, Tn = !1;
		function In(e$1) {
			Sn(Cn, e$1), Tn || (Tn = !0, setTimeout(function() {
				Tn = !1, qn(Cn, !(Cn = {}));
			}, 0));
		}
		function qn(e$1, t$1) {
			void 0 === t$1 && (t$1 = !1);
			var n$1 = /* @__PURE__ */ new Set();
			if (e$1.all) for (var r$1 = 0, i$1 = Object.values(An); r$1 < i$1.length; r$1++) Dn(a$1 = i$1[r$1], e$1, n$1, t$1);
			else for (var o$1 in e$1) {
				var a$1, u$1 = /^idb\:\/\/(.*)\/(.*)\//.exec(o$1);
				u$1 && (o$1 = u$1[1], u$1 = u$1[2], (a$1 = An["idb://".concat(o$1, "/").concat(u$1)]) && Dn(a$1, e$1, n$1, t$1));
			}
			n$1.forEach(function(e$2) {
				return e$2();
			});
		}
		function Dn(e$1, t$1, n$1, r$1) {
			for (var i$1 = [], o$1 = 0, a$1 = Object.entries(e$1.queries.query); o$1 < a$1.length; o$1++) {
				for (var u$1 = a$1[o$1], s$1 = u$1[0], c$1 = [], l$1 = 0, f$1 = u$1[1]; l$1 < f$1.length; l$1++) {
					var h$1 = f$1[l$1];
					jn(t$1, h$1.obsSet) ? h$1.subscribers.forEach(function(e$2) {
						return n$1.add(e$2);
					}) : r$1 && c$1.push(h$1);
				}
				r$1 && i$1.push([s$1, c$1]);
			}
			if (r$1) for (var d$1 = 0, p$1 = i$1; d$1 < p$1.length; d$1++) {
				var y$1 = p$1[d$1], s$1 = y$1[0], c$1 = y$1[1];
				e$1.queries.query[s$1] = c$1;
			}
		}
		function Bn(f$1) {
			var h$1 = f$1._state, r$1 = f$1._deps.indexedDB;
			if (h$1.isBeingOpened || f$1.idbdb) return h$1.dbReadyPromise.then(function() {
				return h$1.dbOpenError ? Xe(h$1.dbOpenError) : f$1;
			});
			h$1.isBeingOpened = !0, h$1.dbOpenError = null, h$1.openComplete = !1;
			var t$1 = h$1.openCanceller, d$1 = Math.round(10 * f$1.verno), p$1 = !1;
			function e$1() {
				if (h$1.openCanceller !== t$1) throw new Y.DatabaseClosed("db.open() was cancelled");
			}
			function y$1() {
				return new _e(function(s$1, n$2) {
					if (e$1(), !r$1) throw new Y.MissingAPI();
					var c$1 = f$1.name, l$1 = h$1.autoSchema || !d$1 ? r$1.open(c$1) : r$1.open(c$1, d$1);
					if (!l$1) throw new Y.MissingAPI();
					l$1.onerror = Ft(n$2), l$1.onblocked = Ie(f$1._fireOnBlocked), l$1.onupgradeneeded = Ie(function(e$2) {
						var t$2;
						v$1 = l$1.transaction, h$1.autoSchema && !f$1._options.allowEmptyDB ? (l$1.onerror = Mt, v$1.abort(), l$1.result.close(), (t$2 = r$1.deleteDatabase(c$1)).onsuccess = t$2.onerror = Ie(function() {
							n$2(new Y.NoSuchDatabase("Database ".concat(c$1, " doesnt exist")));
						})) : (v$1.onerror = Ft(n$2), e$2 = e$2.oldVersion > Math.pow(2, 62) ? 0 : e$2.oldVersion, m$1 = e$2 < 1, f$1.idbdb = l$1.result, p$1 && un(f$1, v$1), an(f$1, e$2 / 10, v$1, n$2));
					}, n$2), l$1.onsuccess = Ie(function() {
						v$1 = null;
						var e$2, t$2, n$3, r$2, i$2, o$1 = f$1.idbdb = l$1.result, a$1 = b(o$1.objectStoreNames);
						if (0 < a$1.length) try {
							var u$1 = o$1.transaction(1 === (r$2 = a$1).length ? r$2[0] : r$2, "readonly");
							if (h$1.autoSchema) t$2 = o$1, n$3 = u$1, (e$2 = f$1).verno = t$2.version / 10, n$3 = e$2._dbSchema = hn(0, t$2, n$3), e$2._storeNames = b(t$2.objectStoreNames, 0), nn(e$2, [e$2._allTables], O(n$3), n$3);
							else if (dn(f$1, f$1._dbSchema, u$1), ((i$2 = sn(hn(0, (i$2 = f$1).idbdb, u$1), i$2._dbSchema)).add.length || i$2.change.some(function(e$3) {
								return e$3.add.length || e$3.change.length;
							})) && !p$1) return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."), o$1.close(), d$1 = o$1.version + 1, p$1 = !0, s$1(y$1());
							tn(f$1, u$1);
						} catch (e$3) {}
						et.push(f$1), o$1.onversionchange = Ie(function(e$3) {
							h$1.vcFired = !0, f$1.on("versionchange").fire(e$3);
						}), o$1.onclose = Ie(function() {
							f$1.close({ disableAutoOpen: !1 });
						}), m$1 && (i$2 = f$1._deps, u$1 = c$1, o$1 = i$2.indexedDB, i$2 = i$2.IDBKeyRange, bn(o$1) || u$1 === tt || mn(o$1, i$2).put({ name: u$1 }).catch(G)), s$1();
					}, n$2);
				}).catch(function(e$2) {
					switch (null == e$2 ? void 0 : e$2.name) {
						case "UnknownError":
							if (0 < h$1.PR1398_maxLoop) return h$1.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), y$1();
							break;
						case "VersionError": if (0 < d$1) return d$1 = 0, y$1();
					}
					return _e.reject(e$2);
				});
			}
			var n$1, i$1 = h$1.dbReadyResolve, v$1 = null, m$1 = !1;
			return _e.race([t$1, ("undefined" == typeof navigator ? _e.resolve() : !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(e$2) {
				function t$2() {
					return indexedDB.databases().finally(e$2);
				}
				n$1 = setInterval(t$2, 100), t$2();
			}).finally(function() {
				return clearInterval(n$1);
			}) : Promise.resolve()).then(y$1)]).then(function() {
				return e$1(), h$1.onReadyBeingFired = [], _e.resolve(gn(function() {
					return f$1.on.ready.fire(f$1.vip);
				})).then(function e$2() {
					if (0 < h$1.onReadyBeingFired.length) {
						var t$2 = h$1.onReadyBeingFired.reduce(re, G);
						return h$1.onReadyBeingFired = [], _e.resolve(gn(function() {
							return t$2(f$1.vip);
						})).then(e$2);
					}
				});
			}).finally(function() {
				h$1.openCanceller === t$1 && (h$1.onReadyBeingFired = null, h$1.isBeingOpened = !1);
			}).catch(function(e$2) {
				h$1.dbOpenError = e$2;
				try {
					v$1 && v$1.abort();
				} catch (e$3) {}
				return t$1 === h$1.openCanceller && f$1._close(), Xe(e$2);
			}).finally(function() {
				h$1.openComplete = !0, i$1();
			}).then(function() {
				var n$2;
				return m$1 && (n$2 = {}, f$1.tables.forEach(function(t$2) {
					t$2.schema.indexes.forEach(function(e$2) {
						e$2.name && (n$2["idb://".concat(f$1.name, "/").concat(t$2.name, "/").concat(e$2.name)] = new _n(-Infinity, [[[]]]));
					}), n$2["idb://".concat(f$1.name, "/").concat(t$2.name, "/")] = n$2["idb://".concat(f$1.name, "/").concat(t$2.name, "/:dels")] = new _n(-Infinity, [[[]]]);
				}), Ut(Nt).fire(n$2), qn(n$2, !0)), f$1;
			});
		}
		function Rn(t$1) {
			function e$1(e$2) {
				return t$1.next(e$2);
			}
			var r$1 = n$1(e$1), i$1 = n$1(function(e$2) {
				return t$1.throw(e$2);
			});
			function n$1(n$2) {
				return function(e$2) {
					var t$2 = n$2(e$2), e$2 = t$2.value;
					return t$2.done ? e$2 : e$2 && "function" == typeof e$2.then ? e$2.then(r$1, i$1) : x(e$2) ? Promise.all(e$2).then(r$1, i$1) : r$1(e$2);
				};
			}
			return n$1(e$1)();
		}
		function Fn(e$1, t$1, n$1) {
			for (var r$1 = x(e$1) ? e$1.slice() : [e$1], i$1 = 0; i$1 < n$1; ++i$1) r$1.push(t$1);
			return r$1;
		}
		var Mn = {
			stack: "dbcore",
			name: "VirtualIndexMiddleware",
			level: 1,
			create: function(f$1) {
				return _(_({}, f$1), { table: function(e$1) {
					var a$1 = f$1.table(e$1), t$1 = a$1.schema, u$1 = {}, s$1 = [];
					function c$1(e$2, t$2, n$2) {
						var r$2 = Jt(e$2), i$2 = u$1[r$2] = u$1[r$2] || [], o$1 = null == e$2 ? 0 : "string" == typeof e$2 ? 1 : e$2.length, a$2 = 0 < t$2, a$2 = _(_({}, n$2), {
							name: a$2 ? "".concat(r$2, "(virtual-from:").concat(n$2.name, ")") : n$2.name,
							lowLevelIndex: n$2,
							isVirtual: a$2,
							keyTail: t$2,
							keyLength: o$1,
							extractKey: Gt(e$2),
							unique: !a$2 && n$2.unique
						});
						return i$2.push(a$2), a$2.isPrimaryKey || s$1.push(a$2), 1 < o$1 && c$1(2 === o$1 ? e$2[0] : e$2.slice(0, o$1 - 1), t$2 + 1, n$2), i$2.sort(function(e$3, t$3) {
							return e$3.keyTail - t$3.keyTail;
						}), a$2;
					}
					e$1 = c$1(t$1.primaryKey.keyPath, 0, t$1.primaryKey);
					u$1[":id"] = [e$1];
					for (var n$1 = 0, r$1 = t$1.indexes; n$1 < r$1.length; n$1++) {
						var i$1 = r$1[n$1];
						c$1(i$1.keyPath, 0, i$1);
					}
					function l$1(e$2) {
						var t$2, n$2 = e$2.query.index;
						return n$2.isVirtual ? _(_({}, e$2), { query: {
							index: n$2.lowLevelIndex,
							range: (t$2 = e$2.query.range, n$2 = n$2.keyTail, {
								type: 1 === t$2.type ? 2 : t$2.type,
								lower: Fn(t$2.lower, t$2.lowerOpen ? f$1.MAX_KEY : f$1.MIN_KEY, n$2),
								lowerOpen: !0,
								upper: Fn(t$2.upper, t$2.upperOpen ? f$1.MIN_KEY : f$1.MAX_KEY, n$2),
								upperOpen: !0
							})
						} }) : e$2;
					}
					return _(_({}, a$1), {
						schema: _(_({}, t$1), {
							primaryKey: e$1,
							indexes: s$1,
							getIndexByKeyPath: function(e$2) {
								return (e$2 = u$1[Jt(e$2)]) && e$2[0];
							}
						}),
						count: function(e$2) {
							return a$1.count(l$1(e$2));
						},
						query: function(e$2) {
							return a$1.query(l$1(e$2));
						},
						openCursor: function(t$2) {
							var e$2 = t$2.query.index, r$2 = e$2.keyTail, n$2 = e$2.isVirtual, i$2 = e$2.keyLength;
							return n$2 ? a$1.openCursor(l$1(t$2)).then(function(e$3) {
								return e$3 && o$1(e$3);
							}) : a$1.openCursor(t$2);
							function o$1(n$3) {
								return Object.create(n$3, {
									continue: { value: function(e$3) {
										null != e$3 ? n$3.continue(Fn(e$3, t$2.reverse ? f$1.MAX_KEY : f$1.MIN_KEY, r$2)) : t$2.unique ? n$3.continue(n$3.key.slice(0, i$2).concat(t$2.reverse ? f$1.MIN_KEY : f$1.MAX_KEY, r$2)) : n$3.continue();
									} },
									continuePrimaryKey: { value: function(e$3, t$3) {
										n$3.continuePrimaryKey(Fn(e$3, f$1.MAX_KEY, r$2), t$3);
									} },
									primaryKey: { get: function() {
										return n$3.primaryKey;
									} },
									key: { get: function() {
										var e$3 = n$3.key;
										return 1 === i$2 ? e$3[0] : e$3.slice(0, i$2);
									} },
									value: { get: function() {
										return n$3.value;
									} }
								});
							}
						}
					});
				} });
			}
		};
		function Nn(i$1, o$1, a$1, u$1) {
			return a$1 = a$1 || {}, u$1 = u$1 || "", O(i$1).forEach(function(e$1) {
				var t$1, n$1, r$1;
				m(o$1, e$1) ? (t$1 = i$1[e$1], n$1 = o$1[e$1], "object" == typeof t$1 && "object" == typeof n$1 && t$1 && n$1 ? (r$1 = A(t$1)) !== A(n$1) ? a$1[u$1 + e$1] = o$1[e$1] : "Object" === r$1 ? Nn(t$1, n$1, a$1, u$1 + e$1 + ".") : t$1 !== n$1 && (a$1[u$1 + e$1] = o$1[e$1]) : t$1 !== n$1 && (a$1[u$1 + e$1] = o$1[e$1])) : a$1[u$1 + e$1] = void 0;
			}), O(o$1).forEach(function(e$1) {
				m(i$1, e$1) || (a$1[u$1 + e$1] = o$1[e$1]);
			}), a$1;
		}
		function Ln(e$1, t$1) {
			return "delete" === t$1.type ? t$1.keys : t$1.keys || t$1.values.map(e$1.extractKey);
		}
		var Un = {
			stack: "dbcore",
			name: "HooksMiddleware",
			level: 2,
			create: function(e$1) {
				return _(_({}, e$1), { table: function(r$1) {
					var y$1 = e$1.table(r$1), v$1 = y$1.schema.primaryKey;
					return _(_({}, y$1), { mutate: function(e$2) {
						var t$1 = me.trans, n$1 = t$1.table(r$1).hook, h$1 = n$1.deleting, d$1 = n$1.creating, p$1 = n$1.updating;
						switch (e$2.type) {
							case "add":
								if (d$1.fire === G) break;
								return t$1._promise("readwrite", function() {
									return a$1(e$2);
								}, !0);
							case "put":
								if (d$1.fire === G && p$1.fire === G) break;
								return t$1._promise("readwrite", function() {
									return a$1(e$2);
								}, !0);
							case "delete":
								if (h$1.fire === G) break;
								return t$1._promise("readwrite", function() {
									return a$1(e$2);
								}, !0);
							case "deleteRange":
								if (h$1.fire === G) break;
								return t$1._promise("readwrite", function() {
									return function n$2(r$2, i$1, o$1) {
										return y$1.query({
											trans: r$2,
											values: !1,
											query: {
												index: v$1,
												range: i$1
											},
											limit: o$1
										}).then(function(e$3) {
											var t$2 = e$3.result;
											return a$1({
												type: "delete",
												keys: t$2,
												trans: r$2
											}).then(function(e$4) {
												return 0 < e$4.numFailures ? Promise.reject(e$4.failures[0]) : t$2.length < o$1 ? {
													failures: [],
													numFailures: 0,
													lastResult: void 0
												} : n$2(r$2, _(_({}, i$1), {
													lower: t$2[t$2.length - 1],
													lowerOpen: !0
												}), o$1);
											});
										});
									}(e$2.trans, e$2.range, 1e4);
								}, !0);
						}
						return y$1.mutate(e$2);
						function a$1(c$1) {
							var e$3, t$2, n$2, l$1 = me.trans, f$1 = c$1.keys || Ln(v$1, c$1);
							if (!f$1) throw new Error("Keys missing");
							return "delete" !== (c$1 = "add" === c$1.type || "put" === c$1.type ? _(_({}, c$1), { keys: f$1 }) : _({}, c$1)).type && (c$1.values = i([], c$1.values, !0)), c$1.keys && (c$1.keys = i([], c$1.keys, !0)), e$3 = y$1, n$2 = f$1, ("add" === (t$2 = c$1).type ? Promise.resolve([]) : e$3.getMany({
								trans: t$2.trans,
								keys: n$2,
								cache: "immutable"
							})).then(function(u$1) {
								var s$1 = f$1.map(function(e$4, t$3) {
									var n$3, r$2, i$1, o$1 = u$1[t$3], a$2 = {
										onerror: null,
										onsuccess: null
									};
									return "delete" === c$1.type ? h$1.fire.call(a$2, e$4, o$1, l$1) : "add" === c$1.type || void 0 === o$1 ? (n$3 = d$1.fire.call(a$2, e$4, c$1.values[t$3], l$1), null == e$4 && null != n$3 && (c$1.keys[t$3] = e$4 = n$3, v$1.outbound || w(c$1.values[t$3], v$1.keyPath, e$4))) : (n$3 = Nn(o$1, c$1.values[t$3]), (r$2 = p$1.fire.call(a$2, n$3, e$4, o$1, l$1)) && (i$1 = c$1.values[t$3], Object.keys(r$2).forEach(function(e$5) {
										m(i$1, e$5) ? i$1[e$5] = r$2[e$5] : w(i$1, e$5, r$2[e$5]);
									}))), a$2;
								});
								return y$1.mutate(c$1).then(function(e$4) {
									for (var t$3 = e$4.failures, n$3 = e$4.results, r$2 = e$4.numFailures, e$4 = e$4.lastResult, i$1 = 0; i$1 < f$1.length; ++i$1) {
										var o$1 = (n$3 || f$1)[i$1], a$2 = s$1[i$1];
										null == o$1 ? a$2.onerror && a$2.onerror(t$3[i$1]) : a$2.onsuccess && a$2.onsuccess("put" === c$1.type && u$1[i$1] ? c$1.values[i$1] : o$1);
									}
									return {
										failures: t$3,
										results: n$3,
										numFailures: r$2,
										lastResult: e$4
									};
								}).catch(function(t$3) {
									return s$1.forEach(function(e$4) {
										return e$4.onerror && e$4.onerror(t$3);
									}), Promise.reject(t$3);
								});
							});
						}
					} });
				} });
			}
		};
		function Vn(e$1, t$1, n$1) {
			try {
				if (!t$1) return null;
				if (t$1.keys.length < e$1.length) return null;
				for (var r$1 = [], i$1 = 0, o$1 = 0; i$1 < t$1.keys.length && o$1 < e$1.length; ++i$1) 0 === st(t$1.keys[i$1], e$1[o$1]) && (r$1.push(n$1 ? S(t$1.values[i$1]) : t$1.values[i$1]), ++o$1);
				return r$1.length === e$1.length ? r$1 : null;
			} catch (e$2) {
				return null;
			}
		}
		var zn = {
			stack: "dbcore",
			level: -1,
			create: function(t$1) {
				return { table: function(e$1) {
					var n$1 = t$1.table(e$1);
					return _(_({}, n$1), {
						getMany: function(t$2) {
							if (!t$2.cache) return n$1.getMany(t$2);
							var e$2 = Vn(t$2.keys, t$2.trans._cache, "clone" === t$2.cache);
							return e$2 ? _e.resolve(e$2) : n$1.getMany(t$2).then(function(e$3) {
								return t$2.trans._cache = {
									keys: t$2.keys,
									values: "clone" === t$2.cache ? S(e$3) : e$3
								}, e$3;
							});
						},
						mutate: function(e$2) {
							return "add" !== e$2.type && (e$2.trans._cache = null), n$1.mutate(e$2);
						}
					});
				} };
			}
		};
		function Wn(e$1, t$1) {
			return "readonly" === e$1.trans.mode && !!e$1.subscr && !e$1.trans.explicit && "disabled" !== e$1.trans.db._options.cache && !t$1.schema.primaryKey.outbound;
		}
		function Yn(e$1, t$1) {
			switch (e$1) {
				case "query": return t$1.values && !t$1.unique;
				case "get":
				case "getMany":
				case "count":
				case "openCursor": return !1;
			}
		}
		var $n = {
			stack: "dbcore",
			level: 0,
			name: "Observability",
			create: function(b$1) {
				var g$1 = b$1.schema.name, w$1 = new _n(b$1.MIN_KEY, b$1.MAX_KEY);
				return _(_({}, b$1), {
					transaction: function(e$1, t$1, n$1) {
						if (me.subscr && "readonly" !== t$1) throw new Y.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(me.querier));
						return b$1.transaction(e$1, t$1, n$1);
					},
					table: function(d$1) {
						var p$1 = b$1.table(d$1), y$1 = p$1.schema, v$1 = y$1.primaryKey, e$1 = y$1.indexes, c$1 = v$1.extractKey, l$1 = v$1.outbound, m$1 = v$1.autoIncrement && e$1.filter(function(e$2) {
							return e$2.compound && e$2.keyPath.includes(v$1.keyPath);
						}), t$1 = _(_({}, p$1), { mutate: function(a$1) {
							function u$1(e$3) {
								return e$3 = "idb://".concat(g$1, "/").concat(d$1, "/").concat(e$3), n$1[e$3] || (n$1[e$3] = new _n());
							}
							var e$2, o$1, s$1, t$2 = a$1.trans, n$1 = a$1.mutatedParts || (a$1.mutatedParts = {}), r$1 = u$1(""), i$1 = u$1(":dels"), c$2 = a$1.type, l$2 = "deleteRange" === a$1.type ? [a$1.range] : "delete" === a$1.type ? [a$1.keys] : a$1.values.length < 50 ? [Ln(v$1, a$1).filter(function(e$3) {
								return e$3;
							}), a$1.values] : [], f$2 = l$2[0], h$1 = l$2[1], l$2 = a$1.trans._cache;
							return x(f$2) ? (r$1.addKeys(f$2), (l$2 = "delete" === c$2 || f$2.length === h$1.length ? Vn(f$2, l$2) : null) || i$1.addKeys(f$2), (l$2 || h$1) && (e$2 = u$1, o$1 = l$2, s$1 = h$1, y$1.indexes.forEach(function(t$3) {
								var n$2 = e$2(t$3.name || "");
								function r$2(e$3) {
									return null != e$3 ? t$3.extractKey(e$3) : null;
								}
								function i$2(e$3) {
									return t$3.multiEntry && x(e$3) ? e$3.forEach(function(e$4) {
										return n$2.addKey(e$4);
									}) : n$2.addKey(e$3);
								}
								(o$1 || s$1).forEach(function(e$3, t$4) {
									var n$3 = o$1 && r$2(o$1[t$4]), t$4 = s$1 && r$2(s$1[t$4]);
									0 !== st(n$3, t$4) && (null != n$3 && i$2(n$3), null != t$4 && i$2(t$4));
								});
							}))) : f$2 ? (h$1 = {
								from: null !== (h$1 = f$2.lower) && void 0 !== h$1 ? h$1 : b$1.MIN_KEY,
								to: null !== (h$1 = f$2.upper) && void 0 !== h$1 ? h$1 : b$1.MAX_KEY
							}, i$1.add(h$1), r$1.add(h$1)) : (r$1.add(w$1), i$1.add(w$1), y$1.indexes.forEach(function(e$3) {
								return u$1(e$3.name).add(w$1);
							})), p$1.mutate(a$1).then(function(o$2) {
								return !f$2 || "add" !== a$1.type && "put" !== a$1.type || (r$1.addKeys(o$2.results), m$1 && m$1.forEach(function(t$3) {
									for (var e$3 = a$1.values.map(function(e$4) {
										return t$3.extractKey(e$4);
									}), n$2 = t$3.keyPath.findIndex(function(e$4) {
										return e$4 === v$1.keyPath;
									}), r$2 = 0, i$2 = o$2.results.length; r$2 < i$2; ++r$2) e$3[r$2][n$2] = o$2.results[r$2];
									u$1(t$3.name).addKeys(e$3);
								})), t$2.mutatedParts = Sn(t$2.mutatedParts || {}, n$1), o$2;
							});
						} }), e$1 = function(e$2) {
							var t$2 = e$2.query, e$2 = t$2.index, t$2 = t$2.range;
							return [e$2, new _n(null !== (e$2 = t$2.lower) && void 0 !== e$2 ? e$2 : b$1.MIN_KEY, null !== (t$2 = t$2.upper) && void 0 !== t$2 ? t$2 : b$1.MAX_KEY)];
						}, f$1 = {
							get: function(e$2) {
								return [v$1, new _n(e$2.key)];
							},
							getMany: function(e$2) {
								return [v$1, new _n().addKeys(e$2.keys)];
							},
							count: e$1,
							query: e$1,
							openCursor: e$1
						};
						return O(f$1).forEach(function(s$1) {
							t$1[s$1] = function(i$1) {
								var e$2 = me.subscr, t$2 = !!e$2, n$1 = Wn(me, p$1) && Yn(s$1, i$1) ? i$1.obsSet = {} : e$2;
								if (t$2) {
									var r$1 = function(e$3) {
										e$3 = "idb://".concat(g$1, "/").concat(d$1, "/").concat(e$3);
										return n$1[e$3] || (n$1[e$3] = new _n());
									}, o$1 = r$1(""), a$1 = r$1(":dels"), e$2 = f$1[s$1](i$1), t$2 = e$2[0], e$2 = e$2[1];
									if (("query" === s$1 && t$2.isPrimaryKey && !i$1.values ? a$1 : r$1(t$2.name || "")).add(e$2), !t$2.isPrimaryKey) {
										if ("count" !== s$1) {
											var u$1 = "query" === s$1 && l$1 && i$1.values && p$1.query(_(_({}, i$1), { values: !1 }));
											return p$1[s$1].apply(this, arguments).then(function(t$3) {
												if ("query" === s$1) {
													if (l$1 && i$1.values) return u$1.then(function(e$4) {
														e$4 = e$4.result;
														return o$1.addKeys(e$4), t$3;
													});
													var e$3 = i$1.values ? t$3.result.map(c$1) : t$3.result;
													(i$1.values ? o$1 : a$1).addKeys(e$3);
												} else if ("openCursor" === s$1) {
													var n$2 = t$3, r$2 = i$1.values;
													return n$2 && Object.create(n$2, {
														key: { get: function() {
															return a$1.addKey(n$2.primaryKey), n$2.key;
														} },
														primaryKey: { get: function() {
															var e$4 = n$2.primaryKey;
															return a$1.addKey(e$4), e$4;
														} },
														value: { get: function() {
															return r$2 && o$1.addKey(n$2.primaryKey), n$2.value;
														} }
													});
												}
												return t$3;
											});
										}
										a$1.add(w$1);
									}
								}
								return p$1[s$1].apply(this, arguments);
							};
						}), t$1;
					}
				});
			}
		};
		function Qn(e$1, t$1, n$1) {
			if (0 === n$1.numFailures) return t$1;
			if ("deleteRange" === t$1.type) return null;
			var r$1 = t$1.keys ? t$1.keys.length : "values" in t$1 && t$1.values ? t$1.values.length : 1;
			if (n$1.numFailures === r$1) return null;
			t$1 = _({}, t$1);
			return x(t$1.keys) && (t$1.keys = t$1.keys.filter(function(e$2, t$2) {
				return !(t$2 in n$1.failures);
			})), "values" in t$1 && x(t$1.values) && (t$1.values = t$1.values.filter(function(e$2, t$2) {
				return !(t$2 in n$1.failures);
			})), t$1;
		}
		function Gn(e$1, t$1) {
			return n$1 = e$1, (void 0 === (r$1 = t$1).lower || (r$1.lowerOpen ? 0 < st(n$1, r$1.lower) : 0 <= st(n$1, r$1.lower))) && (e$1 = e$1, void 0 === (t$1 = t$1).upper || (t$1.upperOpen ? st(e$1, t$1.upper) < 0 : st(e$1, t$1.upper) <= 0));
			var n$1, r$1;
		}
		function Xn(e$1, d$1, t$1, n$1, r$1, i$1) {
			if (!t$1 || 0 === t$1.length) return e$1;
			var o$1 = d$1.query.index, p$1 = o$1.multiEntry, y$1 = d$1.query.range, v$1 = n$1.schema.primaryKey.extractKey, m$1 = o$1.extractKey, a$1 = (o$1.lowLevelIndex || o$1).extractKey, t$1 = t$1.reduce(function(e$2, t$2) {
				var n$2 = e$2, r$2 = [];
				if ("add" === t$2.type || "put" === t$2.type) for (var i$2 = new _n(), o$2 = t$2.values.length - 1; 0 <= o$2; --o$2) {
					var a$2, u$1 = t$2.values[o$2], s$1 = v$1(u$1);
					i$2.hasKey(s$1) || (a$2 = m$1(u$1), (p$1 && x(a$2) ? a$2.some(function(e$3) {
						return Gn(e$3, y$1);
					}) : Gn(a$2, y$1)) && (i$2.addKey(s$1), r$2.push(u$1)));
				}
				switch (t$2.type) {
					case "add":
						var c$1 = new _n().addKeys(d$1.values ? e$2.map(function(e$3) {
							return v$1(e$3);
						}) : e$2), n$2 = e$2.concat(d$1.values ? r$2.filter(function(e$3) {
							e$3 = v$1(e$3);
							return !c$1.hasKey(e$3) && (c$1.addKey(e$3), !0);
						}) : r$2.map(function(e$3) {
							return v$1(e$3);
						}).filter(function(e$3) {
							return !c$1.hasKey(e$3) && (c$1.addKey(e$3), !0);
						}));
						break;
					case "put":
						var l$1 = new _n().addKeys(t$2.values.map(function(e$3) {
							return v$1(e$3);
						}));
						n$2 = e$2.filter(function(e$3) {
							return !l$1.hasKey(d$1.values ? v$1(e$3) : e$3);
						}).concat(d$1.values ? r$2 : r$2.map(function(e$3) {
							return v$1(e$3);
						}));
						break;
					case "delete":
						var f$1 = new _n().addKeys(t$2.keys);
						n$2 = e$2.filter(function(e$3) {
							return !f$1.hasKey(d$1.values ? v$1(e$3) : e$3);
						});
						break;
					case "deleteRange":
						var h$1 = t$2.range;
						n$2 = e$2.filter(function(e$3) {
							return !Gn(v$1(e$3), h$1);
						});
				}
				return n$2;
			}, e$1);
			return t$1 === e$1 ? e$1 : (t$1.sort(function(e$2, t$2) {
				return st(a$1(e$2), a$1(t$2)) || st(v$1(e$2), v$1(t$2));
			}), d$1.limit && d$1.limit < Infinity && (t$1.length > d$1.limit ? t$1.length = d$1.limit : e$1.length === d$1.limit && t$1.length < d$1.limit && (r$1.dirty = !0)), i$1 ? Object.freeze(t$1) : t$1);
		}
		function Hn(e$1, t$1) {
			return 0 === st(e$1.lower, t$1.lower) && 0 === st(e$1.upper, t$1.upper) && !!e$1.lowerOpen == !!t$1.lowerOpen && !!e$1.upperOpen == !!t$1.upperOpen;
		}
		function Jn(e$1, t$1) {
			return function(e$2, t$2, n$1, r$1) {
				if (void 0 === e$2) return void 0 !== t$2 ? -1 : 0;
				if (void 0 === t$2) return 1;
				if (0 === (t$2 = st(e$2, t$2))) {
					if (n$1 && r$1) return 0;
					if (n$1) return 1;
					if (r$1) return -1;
				}
				return t$2;
			}(e$1.lower, t$1.lower, e$1.lowerOpen, t$1.lowerOpen) <= 0 && 0 <= function(e$2, t$2, n$1, r$1) {
				if (void 0 === e$2) return void 0 !== t$2 ? 1 : 0;
				if (void 0 === t$2) return -1;
				if (0 === (t$2 = st(e$2, t$2))) {
					if (n$1 && r$1) return 0;
					if (n$1) return -1;
					if (r$1) return 1;
				}
				return t$2;
			}(e$1.upper, t$1.upper, e$1.upperOpen, t$1.upperOpen);
		}
		function Zn(n$1, r$1, i$1, e$1) {
			n$1.subscribers.add(i$1), e$1.addEventListener("abort", function() {
				var e$2, t$1;
				n$1.subscribers.delete(i$1), 0 === n$1.subscribers.size && (e$2 = n$1, t$1 = r$1, setTimeout(function() {
					0 === e$2.subscribers.size && I(t$1, e$2);
				}, 3e3));
			});
		}
		var er = {
			stack: "dbcore",
			level: 0,
			name: "Cache",
			create: function(k$1) {
				var O$1 = k$1.schema.name;
				return _(_({}, k$1), {
					transaction: function(g$1, w$1, e$1) {
						var _$1, t$1, x$1 = k$1.transaction(g$1, w$1, e$1);
						return "readwrite" === w$1 && (t$1 = (_$1 = new AbortController()).signal, e$1 = function(b$1) {
							return function() {
								if (_$1.abort(), "readwrite" === w$1) {
									for (var t$2 = /* @__PURE__ */ new Set(), e$2 = 0, n$1 = g$1; e$2 < n$1.length; e$2++) {
										var r$1 = n$1[e$2], i$1 = An["idb://".concat(O$1, "/").concat(r$1)];
										if (i$1) {
											var o$1 = k$1.table(r$1), a$1 = i$1.optimisticOps.filter(function(e$3) {
												return e$3.trans === x$1;
											});
											if (x$1._explicit && b$1 && x$1.mutatedParts) for (var u$1 = 0, s$1 = Object.values(i$1.queries.query); u$1 < s$1.length; u$1++) for (var c$1 = 0, l$1 = (d$1 = s$1[u$1]).slice(); c$1 < l$1.length; c$1++) jn((p$1 = l$1[c$1]).obsSet, x$1.mutatedParts) && (I(d$1, p$1), p$1.subscribers.forEach(function(e$3) {
												return t$2.add(e$3);
											}));
											else if (0 < a$1.length) {
												i$1.optimisticOps = i$1.optimisticOps.filter(function(e$3) {
													return e$3.trans !== x$1;
												});
												for (var f$1 = 0, h$1 = Object.values(i$1.queries.query); f$1 < h$1.length; f$1++) for (var d$1, p$1, y$1, v$1 = 0, m$1 = (d$1 = h$1[f$1]).slice(); v$1 < m$1.length; v$1++) null != (p$1 = m$1[v$1]).res && x$1.mutatedParts && (b$1 && !p$1.dirty ? (y$1 = Object.isFrozen(p$1.res), y$1 = Xn(p$1.res, p$1.req, a$1, o$1, p$1, y$1), p$1.dirty ? (I(d$1, p$1), p$1.subscribers.forEach(function(e$3) {
													return t$2.add(e$3);
												})) : y$1 !== p$1.res && (p$1.res = y$1, p$1.promise = _e.resolve({ result: y$1 }))) : (p$1.dirty && I(d$1, p$1), p$1.subscribers.forEach(function(e$3) {
													return t$2.add(e$3);
												})));
											}
										}
									}
									t$2.forEach(function(e$3) {
										return e$3();
									});
								}
							};
						}, x$1.addEventListener("abort", e$1(!1), { signal: t$1 }), x$1.addEventListener("error", e$1(!1), { signal: t$1 }), x$1.addEventListener("complete", e$1(!0), { signal: t$1 })), x$1;
					},
					table: function(c$1) {
						var l$1 = k$1.table(c$1), i$1 = l$1.schema.primaryKey;
						return _(_({}, l$1), {
							mutate: function(t$1) {
								var e$1 = me.trans;
								if (i$1.outbound || "disabled" === e$1.db._options.cache || e$1.explicit || "readwrite" !== e$1.idbtrans.mode) return l$1.mutate(t$1);
								var n$1 = An["idb://".concat(O$1, "/").concat(c$1)];
								if (!n$1) return l$1.mutate(t$1);
								e$1 = l$1.mutate(t$1);
								return "add" !== t$1.type && "put" !== t$1.type || !(50 <= t$1.values.length || Ln(i$1, t$1).some(function(e$2) {
									return null == e$2;
								})) ? (n$1.optimisticOps.push(t$1), t$1.mutatedParts && In(t$1.mutatedParts), e$1.then(function(e$2) {
									0 < e$2.numFailures && (I(n$1.optimisticOps, t$1), (e$2 = Qn(0, t$1, e$2)) && n$1.optimisticOps.push(e$2), t$1.mutatedParts && In(t$1.mutatedParts));
								}), e$1.catch(function() {
									I(n$1.optimisticOps, t$1), t$1.mutatedParts && In(t$1.mutatedParts);
								})) : e$1.then(function(r$1) {
									var e$2 = Qn(0, _(_({}, t$1), { values: t$1.values.map(function(e$3, t$2) {
										var n$2;
										if (r$1.failures[t$2]) return e$3;
										e$3 = null !== (n$2 = i$1.keyPath) && void 0 !== n$2 && n$2.includes(".") ? S(e$3) : _({}, e$3);
										return w(e$3, i$1.keyPath, r$1.results[t$2]), e$3;
									}) }), r$1);
									n$1.optimisticOps.push(e$2), queueMicrotask(function() {
										return t$1.mutatedParts && In(t$1.mutatedParts);
									});
								}), e$1;
							},
							query: function(t$1) {
								if (!Wn(me, l$1) || !Yn("query", t$1)) return l$1.query(t$1);
								var i$2 = "immutable" === (null === (o$1 = me.trans) || void 0 === o$1 ? void 0 : o$1.db._options.cache), e$1 = me, n$1 = e$1.requery, r$1 = e$1.signal, o$1 = function(e$2, t$2, n$2, r$2) {
									var i$3 = An["idb://".concat(e$2, "/").concat(t$2)];
									if (!i$3) return [];
									if (!(t$2 = i$3.queries[n$2])) return [
										null,
										!1,
										i$3,
										null
									];
									var o$2 = t$2[(r$2.query ? r$2.query.index.name : null) || ""];
									if (!o$2) return [
										null,
										!1,
										i$3,
										null
									];
									switch (n$2) {
										case "query":
											var a$2 = o$2.find(function(e$3) {
												return e$3.req.limit === r$2.limit && e$3.req.values === r$2.values && Hn(e$3.req.query.range, r$2.query.range);
											});
											return a$2 ? [
												a$2,
												!0,
												i$3,
												o$2
											] : [
												o$2.find(function(e$3) {
													return ("limit" in e$3.req ? e$3.req.limit : Infinity) >= r$2.limit && (!r$2.values || e$3.req.values) && Jn(e$3.req.query.range, r$2.query.range);
												}),
												!1,
												i$3,
												o$2
											];
										case "count":
											a$2 = o$2.find(function(e$3) {
												return Hn(e$3.req.query.range, r$2.query.range);
											});
											return [
												a$2,
												!!a$2,
												i$3,
												o$2
											];
									}
								}(O$1, c$1, "query", t$1), a$1 = o$1[0], e$1 = o$1[1], u$1 = o$1[2], s$1 = o$1[3];
								return a$1 && e$1 ? a$1.obsSet = t$1.obsSet : (e$1 = l$1.query(t$1).then(function(e$2) {
									var t$2 = e$2.result;
									if (a$1 && (a$1.res = t$2), i$2) {
										for (var n$2 = 0, r$2 = t$2.length; n$2 < r$2; ++n$2) Object.freeze(t$2[n$2]);
										Object.freeze(t$2);
									} else e$2.result = S(t$2);
									return e$2;
								}).catch(function(e$2) {
									return s$1 && a$1 && I(s$1, a$1), Promise.reject(e$2);
								}), a$1 = {
									obsSet: t$1.obsSet,
									promise: e$1,
									subscribers: /* @__PURE__ */ new Set(),
									type: "query",
									req: t$1,
									dirty: !1
								}, s$1 ? s$1.push(a$1) : (s$1 = [a$1], (u$1 = u$1 || (An["idb://".concat(O$1, "/").concat(c$1)] = {
									queries: {
										query: {},
										count: {}
									},
									objs: /* @__PURE__ */ new Map(),
									optimisticOps: [],
									unsignaledParts: {}
								})).queries.query[t$1.query.index.name || ""] = s$1)), Zn(a$1, s$1, n$1, r$1), a$1.promise.then(function(e$2) {
									return { result: Xn(e$2.result, t$1, null == u$1 ? void 0 : u$1.optimisticOps, l$1, a$1, i$2) };
								});
							}
						});
					}
				});
			}
		};
		function tr(e$1, r$1) {
			return new Proxy(e$1, { get: function(e$2, t$1, n$1) {
				return "db" === t$1 ? r$1 : Reflect.get(e$2, t$1, n$1);
			} });
		}
		var nr = (rr.prototype.version = function(t$1) {
			if (isNaN(t$1) || t$1 < .1) throw new Y.Type("Given version is not a positive number");
			if (t$1 = Math.round(10 * t$1) / 10, this.idbdb || this._state.isBeingOpened) throw new Y.Schema("Cannot add version when database is open");
			this.verno = Math.max(this.verno, t$1);
			var e$1 = this._versions, n$1 = e$1.filter(function(e$2) {
				return e$2._cfg.version === t$1;
			})[0];
			return n$1 || (n$1 = new this.Version(t$1), e$1.push(n$1), e$1.sort(on), n$1.stores({}), this._state.autoSchema = !1, n$1);
		}, rr.prototype._whenReady = function(e$1) {
			var n$1 = this;
			return this.idbdb && (this._state.openComplete || me.letThrough || this._vip) ? e$1() : new _e(function(e$2, t$1) {
				if (n$1._state.openComplete) return t$1(new Y.DatabaseClosed(n$1._state.dbOpenError));
				if (!n$1._state.isBeingOpened) {
					if (!n$1._state.autoOpen) return void t$1(new Y.DatabaseClosed());
					n$1.open().catch(G);
				}
				n$1._state.dbReadyPromise.then(e$2, t$1);
			}).then(e$1);
		}, rr.prototype.use = function(e$1) {
			var t$1 = e$1.stack, n$1 = e$1.create, r$1 = e$1.level, i$1 = e$1.name;
			i$1 && this.unuse({
				stack: t$1,
				name: i$1
			});
			e$1 = this._middlewares[t$1] || (this._middlewares[t$1] = []);
			return e$1.push({
				stack: t$1,
				create: n$1,
				level: null == r$1 ? 10 : r$1,
				name: i$1
			}), e$1.sort(function(e$2, t$2) {
				return e$2.level - t$2.level;
			}), this;
		}, rr.prototype.unuse = function(e$1) {
			var t$1 = e$1.stack, n$1 = e$1.name, r$1 = e$1.create;
			return t$1 && this._middlewares[t$1] && (this._middlewares[t$1] = this._middlewares[t$1].filter(function(e$2) {
				return r$1 ? e$2.create !== r$1 : !!n$1 && e$2.name !== n$1;
			})), this;
		}, rr.prototype.open = function() {
			var e$1 = this;
			return $e(ve, function() {
				return Bn(e$1);
			});
		}, rr.prototype._close = function() {
			this.on.close.fire(new CustomEvent("close"));
			var n$1 = this._state, e$1 = et.indexOf(this);
			if (0 <= e$1 && et.splice(e$1, 1), this.idbdb) {
				try {
					this.idbdb.close();
				} catch (e$2) {}
				this.idbdb = null;
			}
			n$1.isBeingOpened || (n$1.dbReadyPromise = new _e(function(e$2) {
				n$1.dbReadyResolve = e$2;
			}), n$1.openCanceller = new _e(function(e$2, t$1) {
				n$1.cancelOpen = t$1;
			}));
		}, rr.prototype.close = function(e$1) {
			var t$1 = (void 0 === e$1 ? { disableAutoOpen: !0 } : e$1).disableAutoOpen, e$1 = this._state;
			t$1 ? (e$1.isBeingOpened && e$1.cancelOpen(new Y.DatabaseClosed()), this._close(), e$1.autoOpen = !1, e$1.dbOpenError = new Y.DatabaseClosed()) : (this._close(), e$1.autoOpen = this._options.autoOpen || e$1.isBeingOpened, e$1.openComplete = !1, e$1.dbOpenError = null);
		}, rr.prototype.delete = function(n$1) {
			var i$1 = this;
			void 0 === n$1 && (n$1 = { disableAutoOpen: !0 });
			var o$1 = 0 < arguments.length && "object" != typeof arguments[0], a$1 = this._state;
			return new _e(function(r$1, t$1) {
				function e$1() {
					i$1.close(n$1);
					var e$2 = i$1._deps.indexedDB.deleteDatabase(i$1.name);
					e$2.onsuccess = Ie(function() {
						var e$3 = i$1._deps, t$2 = i$1.name, n$2 = e$3.indexedDB;
						e$3 = e$3.IDBKeyRange, bn(n$2) || t$2 === tt || mn(n$2, e$3).delete(t$2).catch(G), r$1();
					}), e$2.onerror = Ft(t$1), e$2.onblocked = i$1._fireOnBlocked;
				}
				if (o$1) throw new Y.InvalidArgument("Invalid closeOptions argument to db.delete()");
				a$1.isBeingOpened ? a$1.dbReadyPromise.then(e$1) : e$1();
			});
		}, rr.prototype.backendDB = function() {
			return this.idbdb;
		}, rr.prototype.isOpen = function() {
			return null !== this.idbdb;
		}, rr.prototype.hasBeenClosed = function() {
			var e$1 = this._state.dbOpenError;
			return e$1 && "DatabaseClosed" === e$1.name;
		}, rr.prototype.hasFailed = function() {
			return null !== this._state.dbOpenError;
		}, rr.prototype.dynamicallyOpened = function() {
			return this._state.autoSchema;
		}, Object.defineProperty(rr.prototype, "tables", {
			get: function() {
				var t$1 = this;
				return O(this._allTables).map(function(e$1) {
					return t$1._allTables[e$1];
				});
			},
			enumerable: !1,
			configurable: !0
		}), rr.prototype.transaction = function() {
			var e$1 = function(e$2, t$1, n$1) {
				var r$1 = arguments.length;
				if (r$1 < 2) throw new Y.InvalidArgument("Too few arguments");
				for (var i$1 = new Array(r$1 - 1); --r$1;) i$1[r$1 - 1] = arguments[r$1];
				return n$1 = i$1.pop(), [
					e$2,
					P(i$1),
					n$1
				];
			}.apply(this, arguments);
			return this._transaction.apply(this, e$1);
		}, rr.prototype._transaction = function(e$1, t$1, n$1) {
			var r$1 = this, i$1 = me.trans;
			i$1 && i$1.db === this && -1 === e$1.indexOf("!") || (i$1 = null);
			var o$1, a$1, u$1 = -1 !== e$1.indexOf("?");
			e$1 = e$1.replace("!", "").replace("?", "");
			try {
				if (a$1 = t$1.map(function(e$2) {
					e$2 = e$2 instanceof r$1.Table ? e$2.name : e$2;
					if ("string" != typeof e$2) throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
					return e$2;
				}), "r" == e$1 || e$1 === nt) o$1 = nt;
				else {
					if ("rw" != e$1 && e$1 != rt) throw new Y.InvalidArgument("Invalid transaction mode: " + e$1);
					o$1 = rt;
				}
				if (i$1) {
					if (i$1.mode === nt && o$1 === rt) {
						if (!u$1) throw new Y.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
						i$1 = null;
					}
					i$1 && a$1.forEach(function(e$2) {
						if (i$1 && -1 === i$1.storeNames.indexOf(e$2)) {
							if (!u$1) throw new Y.SubTransaction("Table " + e$2 + " not included in parent transaction.");
							i$1 = null;
						}
					}), u$1 && i$1 && !i$1.active && (i$1 = null);
				}
			} catch (n$2) {
				return i$1 ? i$1._promise(null, function(e$2, t$2) {
					t$2(n$2);
				}) : Xe(n$2);
			}
			var s$1 = function i$2(o$2, a$2, u$2, s$2, c$1) {
				return _e.resolve().then(function() {
					var e$2 = me.transless || me, t$2 = o$2._createTransaction(a$2, u$2, o$2._dbSchema, s$2);
					if (t$2.explicit = !0, e$2 = {
						trans: t$2,
						transless: e$2
					}, s$2) t$2.idbtrans = s$2.idbtrans;
					else try {
						t$2.create(), t$2.idbtrans._explicit = !0, o$2._state.PR1398_maxLoop = 3;
					} catch (e$3) {
						return e$3.name === z.InvalidState && o$2.isOpen() && 0 < --o$2._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), o$2.close({ disableAutoOpen: !1 }), o$2.open().then(function() {
							return i$2(o$2, a$2, u$2, null, c$1);
						})) : Xe(e$3);
					}
					var n$2, r$2 = B(c$1);
					return r$2 && Le(), e$2 = _e.follow(function() {
						var e$3;
						(n$2 = c$1.call(t$2, t$2)) && (r$2 ? (e$3 = Ue.bind(null, null), n$2.then(e$3, e$3)) : "function" == typeof n$2.next && "function" == typeof n$2.throw && (n$2 = Rn(n$2)));
					}, e$2), (n$2 && "function" == typeof n$2.then ? _e.resolve(n$2).then(function(e$3) {
						return t$2.active ? e$3 : Xe(new Y.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
					}) : e$2.then(function() {
						return n$2;
					})).then(function(e$3) {
						return s$2 && t$2._resolve(), t$2._completion.then(function() {
							return e$3;
						});
					}).catch(function(e$3) {
						return t$2._reject(e$3), Xe(e$3);
					});
				});
			}.bind(null, this, o$1, a$1, i$1, n$1);
			return i$1 ? i$1._promise(o$1, s$1, "lock") : me.trans ? $e(me.transless, function() {
				return r$1._whenReady(s$1);
			}) : this._whenReady(s$1);
		}, rr.prototype.table = function(e$1) {
			if (!m(this._allTables, e$1)) throw new Y.InvalidTable("Table ".concat(e$1, " does not exist"));
			return this._allTables[e$1];
		}, rr);
		function rr(e$1, t$1) {
			var o$1 = this;
			this._middlewares = {}, this.verno = 0;
			var n$1 = rr.dependencies;
			this._options = t$1 = _({
				addons: rr.addons,
				autoOpen: !0,
				indexedDB: n$1.indexedDB,
				IDBKeyRange: n$1.IDBKeyRange,
				cache: "cloned"
			}, t$1), this._deps = {
				indexedDB: t$1.indexedDB,
				IDBKeyRange: t$1.IDBKeyRange
			};
			n$1 = t$1.addons;
			this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
			var a$1, r$1, u$1, i$1, s$1, c$1 = {
				dbOpenError: null,
				isBeingOpened: !1,
				onReadyBeingFired: null,
				openComplete: !1,
				dbReadyResolve: G,
				dbReadyPromise: null,
				cancelOpen: G,
				openCanceller: null,
				autoSchema: !0,
				PR1398_maxLoop: 3,
				autoOpen: t$1.autoOpen
			};
			c$1.dbReadyPromise = new _e(function(e$2) {
				c$1.dbReadyResolve = e$2;
			}), c$1.openCanceller = new _e(function(e$2, t$2) {
				c$1.cancelOpen = t$2;
			}), this._state = c$1, this.name = e$1, this.on = mt(this, "populate", "blocked", "versionchange", "close", { ready: [re, G] }), this.once = function(n$2, r$2) {
				var i$2 = function() {
					for (var e$2 = [], t$2 = 0; t$2 < arguments.length; t$2++) e$2[t$2] = arguments[t$2];
					o$1.on(n$2).unsubscribe(i$2), r$2.apply(o$1, e$2);
				};
				return o$1.on(n$2, i$2);
			}, this.on.ready.subscribe = p(this.on.ready.subscribe, function(i$2) {
				return function(n$2, r$2) {
					rr.vip(function() {
						var t$2, e$2 = o$1._state;
						e$2.openComplete ? (e$2.dbOpenError || _e.resolve().then(n$2), r$2 && i$2(n$2)) : e$2.onReadyBeingFired ? (e$2.onReadyBeingFired.push(n$2), r$2 && i$2(n$2)) : (i$2(n$2), t$2 = o$1, r$2 || i$2(function e$3() {
							t$2.on.ready.unsubscribe(n$2), t$2.on.ready.unsubscribe(e$3);
						}));
					});
				};
			}), this.Collection = (a$1 = this, bt(Kt.prototype, function(e$2, t$2) {
				this.db = a$1;
				var n$2 = ot, r$2 = null;
				if (t$2) try {
					n$2 = t$2();
				} catch (e$3) {
					r$2 = e$3;
				}
				var i$2 = e$2._ctx, t$2 = i$2.table, e$2 = t$2.hook.reading.fire;
				this._ctx = {
					table: t$2,
					index: i$2.index,
					isPrimKey: !i$2.index || t$2.schema.primKey.keyPath && i$2.index === t$2.schema.primKey.name,
					range: n$2,
					keysOnly: !1,
					dir: "next",
					unique: "",
					algorithm: null,
					filter: null,
					replayFilter: null,
					justLimit: !0,
					isMatch: null,
					offset: 0,
					limit: Infinity,
					error: r$2,
					or: i$2.or,
					valueMapper: e$2 !== X ? e$2 : null
				};
			})), this.Table = (r$1 = this, bt(yt.prototype, function(e$2, t$2, n$2) {
				this.db = r$1, this._tx = n$2, this.name = e$2, this.schema = t$2, this.hook = r$1._allTables[e$2] ? r$1._allTables[e$2].hook : mt(null, {
					creating: [Z, G],
					reading: [H, X],
					updating: [te, G],
					deleting: [ee, G]
				});
			})), this.Transaction = (u$1 = this, bt(Vt.prototype, function(e$2, t$2, n$2, r$2, i$2) {
				var o$2 = this;
				"readonly" !== e$2 && t$2.forEach(function(e$3) {
					e$3 = null === (e$3 = n$2[e$3]) || void 0 === e$3 ? void 0 : e$3.yProps;
					e$3 && (t$2 = t$2.concat(e$3.map(function(e$4) {
						return e$4.updatesTable;
					})));
				}), this.db = u$1, this.mode = e$2, this.storeNames = t$2, this.schema = n$2, this.chromeTransactionDurability = r$2, this.idbtrans = null, this.on = mt(this, "complete", "error", "abort"), this.parent = i$2 || null, this.active = !0, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new _e(function(e$3, t$3) {
					o$2._resolve = e$3, o$2._reject = t$3;
				}), this._completion.then(function() {
					o$2.active = !1, o$2.on.complete.fire();
				}, function(e$3) {
					var t$3 = o$2.active;
					return o$2.active = !1, o$2.on.error.fire(e$3), o$2.parent ? o$2.parent._reject(e$3) : t$3 && o$2.idbtrans && o$2.idbtrans.abort(), Xe(e$3);
				});
			})), this.Version = (i$1 = this, bt(yn.prototype, function(e$2) {
				this.db = i$1, this._cfg = {
					version: e$2,
					storesSource: null,
					dbschema: {},
					tables: {},
					contentUpgrade: null
				};
			})), this.WhereClause = (s$1 = this, bt(Bt.prototype, function(e$2, t$2, n$2) {
				if (this.db = s$1, this._ctx = {
					table: e$2,
					index: ":id" === t$2 ? null : t$2,
					or: n$2
				}, this._cmp = this._ascending = st, this._descending = function(e$3, t$3) {
					return st(t$3, e$3);
				}, this._max = function(e$3, t$3) {
					return 0 < st(e$3, t$3) ? e$3 : t$3;
				}, this._min = function(e$3, t$3) {
					return st(e$3, t$3) < 0 ? e$3 : t$3;
				}, this._IDBKeyRange = s$1._deps.IDBKeyRange, !this._IDBKeyRange) throw new Y.MissingAPI();
			})), this.on("versionchange", function(e$2) {
				0 < e$2.newVersion ? console.warn("Another connection wants to upgrade database '".concat(o$1.name, "'. Closing db now to resume the upgrade.")) : console.warn("Another connection wants to delete database '".concat(o$1.name, "'. Closing db now to resume the delete request.")), o$1.close({ disableAutoOpen: !1 });
			}), this.on("blocked", function(e$2) {
				!e$2.newVersion || e$2.newVersion < e$2.oldVersion ? console.warn("Dexie.delete('".concat(o$1.name, "') was blocked")) : console.warn("Upgrade '".concat(o$1.name, "' blocked by other connection holding version ").concat(e$2.oldVersion / 10));
			}), this._maxKey = Qt(t$1.IDBKeyRange), this._createTransaction = function(e$2, t$2, n$2, r$2) {
				return new o$1.Transaction(e$2, t$2, n$2, o$1._options.chromeTransactionDurability, r$2);
			}, this._fireOnBlocked = function(t$2) {
				o$1.on("blocked").fire(t$2), et.filter(function(e$2) {
					return e$2.name === o$1.name && e$2 !== o$1 && !e$2._state.vcFired;
				}).map(function(e$2) {
					return e$2.on("versionchange").fire(t$2);
				});
			}, this.use(zn), this.use(er), this.use($n), this.use(Mn), this.use(Un);
			var l$1 = new Proxy(this, { get: function(e$2, t$2, n$2) {
				if ("_vip" === t$2) return !0;
				if ("table" === t$2) return function(e$3) {
					return tr(o$1.table(e$3), l$1);
				};
				var r$2 = Reflect.get(e$2, t$2, n$2);
				return r$2 instanceof yt ? tr(r$2, l$1) : "tables" === t$2 ? r$2.map(function(e$3) {
					return tr(e$3, l$1);
				}) : "_createTransaction" === t$2 ? function() {
					return tr(r$2.apply(this, arguments), l$1);
				} : r$2;
			} });
			this.vip = l$1, n$1.forEach(function(e$2) {
				return e$2(o$1);
			});
		}
		var ir, F = "undefined" != typeof Symbol && "observable" in Symbol ? Symbol.observable : "@@observable", or = (ar.prototype.subscribe = function(e$1, t$1, n$1) {
			return this._subscribe(e$1 && "function" != typeof e$1 ? e$1 : {
				next: e$1,
				error: t$1,
				complete: n$1
			});
		}, ar.prototype[F] = function() {
			return this;
		}, ar);
		function ar(e$1) {
			this._subscribe = e$1;
		}
		try {
			ir = {
				indexedDB: f.indexedDB || f.mozIndexedDB || f.webkitIndexedDB || f.msIndexedDB,
				IDBKeyRange: f.IDBKeyRange || f.webkitIDBKeyRange
			};
		} catch (e$1) {
			ir = {
				indexedDB: null,
				IDBKeyRange: null
			};
		}
		function ur(h$1) {
			var d$1, p$1 = !1, e$1 = new or(function(r$1) {
				var i$1 = B(h$1);
				var o$1, a$1 = !1, u$1 = {}, s$1 = {}, e$2 = {
					get closed() {
						return a$1;
					},
					unsubscribe: function() {
						a$1 || (a$1 = !0, o$1 && o$1.abort(), c$1 && Ut.storagemutated.unsubscribe(f$1));
					}
				};
				r$1.start && r$1.start(e$2);
				var c$1 = !1, l$1 = function() {
					return Ge(t$1);
				};
				var f$1 = function(e$3) {
					Sn(u$1, e$3), jn(s$1, u$1) && l$1();
				}, t$1 = function() {
					var t$2, n$1, e$3;
					!a$1 && ir.indexedDB && (u$1 = {}, t$2 = {}, o$1 && o$1.abort(), o$1 = new AbortController(), e$3 = function(e$4) {
						var t$3 = je();
						try {
							i$1 && Le();
							var n$2 = Ne(h$1, e$4);
							return n$2 = i$1 ? n$2.finally(Ue) : n$2;
						} finally {
							t$3 && Ae();
						}
					}(n$1 = {
						subscr: t$2,
						signal: o$1.signal,
						requery: l$1,
						querier: h$1,
						trans: null
					}), Promise.resolve(e$3).then(function(e$4) {
						p$1 = !0, d$1 = e$4, a$1 || n$1.signal.aborted || (u$1 = {}, function(e$5) {
							for (var t$3 in e$5) if (m(e$5, t$3)) return;
							return 1;
						}(s$1 = t$2) || c$1 || (Ut(Nt, f$1), c$1 = !0), Ge(function() {
							return !a$1 && r$1.next && r$1.next(e$4);
						}));
					}, function(e$4) {
						p$1 = !1, ["DatabaseClosedError", "AbortError"].includes(null == e$4 ? void 0 : e$4.name) || a$1 || Ge(function() {
							a$1 || r$1.error && r$1.error(e$4);
						});
					}));
				};
				return setTimeout(l$1, 0), e$2;
			});
			return e$1.hasValue = function() {
				return p$1;
			}, e$1.getValue = function() {
				return d$1;
			}, e$1;
		}
		var sr = nr;
		function cr(e$1) {
			var t$1 = fr;
			try {
				fr = !0, Ut.storagemutated.fire(e$1), qn(e$1, !0);
			} finally {
				fr = t$1;
			}
		}
		r(sr, _(_({}, Q), {
			delete: function(e$1) {
				return new sr(e$1, { addons: [] }).delete();
			},
			exists: function(e$1) {
				return new sr(e$1, { addons: [] }).open().then(function(e$2) {
					return e$2.close(), !0;
				}).catch("NoSuchDatabaseError", function() {
					return !1;
				});
			},
			getDatabaseNames: function(e$1) {
				try {
					return t$1 = sr.dependencies, n$1 = t$1.indexedDB, t$1 = t$1.IDBKeyRange, (bn(n$1) ? Promise.resolve(n$1.databases()).then(function(e$2) {
						return e$2.map(function(e$3) {
							return e$3.name;
						}).filter(function(e$3) {
							return e$3 !== tt;
						});
					}) : mn(n$1, t$1).toCollection().primaryKeys()).then(e$1);
				} catch (e$2) {
					return Xe(new Y.MissingAPI());
				}
				var t$1, n$1;
			},
			defineClass: function() {
				return function(e$1) {
					a(this, e$1);
				};
			},
			ignoreTransaction: function(e$1) {
				return me.trans ? $e(me.transless, e$1) : e$1();
			},
			vip: gn,
			async: function(t$1) {
				return function() {
					try {
						var e$1 = Rn(t$1.apply(this, arguments));
						return e$1 && "function" == typeof e$1.then ? e$1 : _e.resolve(e$1);
					} catch (e$2) {
						return Xe(e$2);
					}
				};
			},
			spawn: function(e$1, t$1, n$1) {
				try {
					var r$1 = Rn(e$1.apply(n$1, t$1 || []));
					return r$1 && "function" == typeof r$1.then ? r$1 : _e.resolve(r$1);
				} catch (e$2) {
					return Xe(e$2);
				}
			},
			currentTransaction: { get: function() {
				return me.trans || null;
			} },
			waitFor: function(e$1, t$1) {
				t$1 = _e.resolve("function" == typeof e$1 ? sr.ignoreTransaction(e$1) : e$1).timeout(t$1 || 6e4);
				return me.trans ? me.trans.waitFor(t$1) : t$1;
			},
			Promise: _e,
			debug: {
				get: function() {
					return ie;
				},
				set: function(e$1) {
					oe(e$1);
				}
			},
			derive: o,
			extend: a,
			props: r,
			override: p,
			Events: mt,
			on: Ut,
			liveQuery: ur,
			extendObservabilitySet: Sn,
			getByKeyPath: g,
			setByKeyPath: w,
			delByKeyPath: function(t$1, e$1) {
				"string" == typeof e$1 ? w(t$1, e$1, void 0) : "length" in e$1 && [].map.call(e$1, function(e$2) {
					w(t$1, e$2, void 0);
				});
			},
			shallowClone: k,
			deepClone: S,
			getObjectDiff: Nn,
			cmp: st,
			asap: v,
			minKey: -Infinity,
			addons: [],
			connections: et,
			errnames: z,
			dependencies: ir,
			cache: An,
			semVer: "4.2.1",
			version: "4.2.1".split(".").map(function(e$1) {
				return parseInt(e$1);
			}).reduce(function(e$1, t$1, n$1) {
				return e$1 + t$1 / Math.pow(10, 2 * n$1);
			})
		})), sr.maxKey = Qt(sr.dependencies.IDBKeyRange), "undefined" != typeof dispatchEvent && "undefined" != typeof addEventListener && (Ut(Nt, function(e$1) {
			fr || (e$1 = new CustomEvent(Lt, { detail: e$1 }), fr = !0, dispatchEvent(e$1), fr = !1);
		}), addEventListener(Lt, function(e$1) {
			e$1 = e$1.detail;
			fr || cr(e$1);
		}));
		var lr, fr = !1, hr = function() {};
		return "undefined" != typeof BroadcastChannel && ((hr = function() {
			(lr = new BroadcastChannel(Lt)).onmessage = function(e$1) {
				return e$1.data && cr(e$1.data);
			};
		})(), "function" == typeof lr.unref && lr.unref(), Ut(Nt, function(e$1) {
			fr || lr.postMessage(e$1);
		})), "undefined" != typeof addEventListener && (addEventListener("pagehide", function(e$1) {
			if (!nr.disableBfCache && e$1.persisted) {
				ie && console.debug("Dexie: handling persisted pagehide"), lr?.close();
				for (var t$1 = 0, n$1 = et; t$1 < n$1.length; t$1++) n$1[t$1].close({ disableAutoOpen: !1 });
			}
		}), addEventListener("pageshow", function(e$1) {
			!nr.disableBfCache && e$1.persisted && (ie && console.debug("Dexie: handling persisted pageshow"), hr(), cr({ all: new _n(-Infinity, [[]]) }));
		})), _e.rejectionMapper = function(e$1, t$1) {
			return !e$1 || e$1 instanceof N || e$1 instanceof TypeError || e$1 instanceof SyntaxError || !e$1.name || !$[e$1.name] ? e$1 : (t$1 = new $[e$1.name](t$1 || e$1.message, e$1), "stack" in e$1 && l(t$1, "stack", { get: function() {
				return this.inner.stack;
			} }), t$1);
		}, oe(ie), _(nr, Object.freeze({
			__proto__: null,
			Dexie: nr,
			liveQuery: ur,
			Entity: ut,
			cmp: st,
			PropModification: ht,
			replacePrefix: function(e$1, t$1) {
				return new ht({ replacePrefix: [e$1, t$1] });
			},
			add: function(e$1) {
				return new ht({ add: e$1 });
			},
			remove: function(e$1) {
				return new ht({ remove: e$1 });
			},
			default: nr,
			RangeSet: _n,
			mergeRanges: kn,
			rangesOverlap: On
		}), { default: nr }), nr;
	});
})))(), 1);
var DexieSymbol = Symbol.for("Dexie");
var Dexie = globalThis[DexieSymbol] || (globalThis[DexieSymbol] = import_dexie_min.default);
if (import_dexie_min.default.semVer !== Dexie.semVer) throw new Error(`Two different versions of Dexie loaded in the same app: ${import_dexie_min.default.semVer} and ${Dexie.semVer}`);
var { liveQuery, mergeRanges, rangesOverlap, RangeSet, cmp, Entity, PropModification, replacePrefix, add, remove, DexieYProvider } = Dexie;
export { Dexie as t };
